/*! OvenPlayerv0.6.5 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
/******/ 		return __webpack_require__.p + "" + ({"ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.html5":"ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.html5","ovenplayer.provider.DashProvider":"ovenplayer.provider.DashProvider","ovenplayer.provider.HlsProvider":"ovenplayer.provider.HlsProvider","ovenplayer.provider.html5":"ovenplayer.provider.html5"}[chunkId]||chunkId) + ".js"
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

var _Configurator = __webpack_require__(/*! api/Configurator */ "./src/js/api/Configurator.js");

var _Configurator2 = _interopRequireDefault(_Configurator);

var _EventEmitter = __webpack_require__(/*! api/EventEmitter */ "./src/js/api/EventEmitter.js");

var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

var _LazyCommandExecutor = __webpack_require__(/*! api/LazyCommandExecutor */ "./src/js/api/LazyCommandExecutor.js");

var _LazyCommandExecutor2 = _interopRequireDefault(_LazyCommandExecutor);

var _logger = __webpack_require__(/*! utils/logger */ "./src/js/utils/logger.js");

var _logger2 = _interopRequireDefault(_logger);

var _Manager = __webpack_require__(/*! api/media/Manager */ "./src/js/api/media/Manager.js");

var _Manager2 = _interopRequireDefault(_Manager);

var _Manager3 = __webpack_require__(/*! api/playlist/Manager */ "./src/js/api/playlist/Manager.js");

var _Manager4 = _interopRequireDefault(_Manager3);

var _Controller = __webpack_require__(/*! api/provider/Controller */ "./src/js/api/provider/Controller.js");

var _Controller2 = _interopRequireDefault(_Controller);

var _promise = __webpack_require__(/*! api/shims/promise */ "./src/js/api/shims/promise.js");

var _promise2 = _interopRequireDefault(_promise);

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

var _version = __webpack_require__(/*! version */ "./src/js/version.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @brief   This object connects UI to the provider.
 * @param   {object}    container  dom element
 *
 * */

//import CaptionManager from "api/caption/Manager";
var Api = function Api(container) {
    var logManager = (0, _logger2.default)();
    var that = {};
    (0, _EventEmitter2.default)(that);

    OvenPlayerConsole.log("[[OvenPlayer]] v." + _version.version);
    OvenPlayerConsole.log("API loaded.");
    //let captionManager = CaptionManager(that);
    var mediaManager = (0, _Manager2.default)(container);
    var playlistManager = (0, _Manager4.default)();
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
            var videoElement = mediaManager.createElement();
            var currentSourceIndex = pickQualityFromSource(playlistManager.getCurrentSources());

            OvenPlayerConsole.log("current source index : " + currentSourceIndex);

            currentProvider = Providers[currentSourceIndex](videoElement, playerConfig);

            //This passes the event created by the Provider to API.
            currentProvider.on("all", function (name, data) {
                that.trigger(name, data);

                //Auto next source when player load was fail by amiss source.
                if (name === _constants.ERROR && (data.code === _constants.PLAYER_FILE_ERROR || parseInt(data.code / 100) === 5) || name === _constants.NETWORK_UNSTABLED) {
                    var currentQuality = that.getCurrentQuality();
                    if (currentQuality + 1 < that.getQualityLevels().length) {
                        //this sequential has available source.
                        that.pause();
                        that.setCurrentQuality(currentQuality + 1);
                    }
                }
            });
        }).then(function () {
            currentProvider.preload(playlistManager.getCurrentSources(), lastPlayPosition);

            lazyQueue.flush();
            //This is no reason to exist anymore.
            lazyQueue.destroy();

            that.trigger(_constants.READY);
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
    that.getConfig = function () {
        OvenPlayerConsole.log("API : getConfig()", playerConfig.getConfig());
        return playerConfig.getConfig();
    };

    that.getDuration = function () {
        OvenPlayerConsole.log("API : getDuration()", currentProvider.getDuration());
        return currentProvider.getDuration();
    };
    that.getPosition = function () {
        OvenPlayerConsole.log("API : getPosition()", currentProvider.getPosition());
        return currentProvider.getPosition();
    };
    that.getVolume = function () {
        OvenPlayerConsole.log("API : getVolume()", currentProvider.getVolume());
        return currentProvider.getVolume();
    };
    that.setVolume = function (volume) {
        OvenPlayerConsole.log("API : setVolume() " + volume);
        currentProvider.setVolume(volume);
    };
    that.setMute = function (state) {
        OvenPlayerConsole.log("API : setMute() " + state);
        return currentProvider.setMute(state);
    };
    that.getMute = function () {
        OvenPlayerConsole.log("API : getMute() " + currentProvider.getMute());
        return currentProvider.getMute();
    };
    that.load = function (playlist) {
        OvenPlayerConsole.log("API : load() ", playlist);
        lazyQueue = (0, _LazyCommandExecutor2.default)(that, ['play', 'seek', 'stop']);

        if (playlist) {
            currentProvider.setCurrentQuality(0);
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
        var currentSource = sources[that.getCurrentQuality()];
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

/***/ "./src/js/api/media/Manager.js":
/*!*************************************!*\
  !*** ./src/js/api/media/Manager.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @brief   미디어 엘리먼트를 관리하는 객체. 현재는 하는 일이 많지 않다.
 * @param   {element}   container   dom element
 *
 * */

var Manager = function Manager(container) {
    var that = {};
    var mediaElement = "";
    OvenPlayerConsole.log("MediaManager loaded.");
    var createMediaElement = function createMediaElement() {

        mediaElement = document.createElement('video');
        mediaElement.setAttribute('disableRemotePlayback', '');
        mediaElement.setAttribute('webkit-playsinline', '');
        mediaElement.setAttribute('playsinline', '');
        container.appendChild(mediaElement);

        return mediaElement;
    };

    that.createElement = function () {
        OvenPlayerConsole.log("MediaManager createElement()");
        if (!mediaElement) {
            return createMediaElement();
        } else {
            container.removeChild(mediaElement);
            return createMediaElement();
        }
    };

    return that;
};

exports.default = Manager;

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
            return Promise.all(/*! require.ensure | ovenplayer.provider.html5 */[__webpack_require__.e("ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.html5"), __webpack_require__.e("ovenplayer.provider.html5")]).then((function (require) {
                var provider = __webpack_require__(/*! api/provider/html5/Html5 */ "./src/js/api/provider/html5/Html5.js").default;
                registeProvider("html5", provider);
                return provider;
            }).bind(null, __webpack_require__)).catch(function (err) {
                throw new Error('Network error');
            });
        },
        webrtc: function webrtc() {
            return Promise.all(/*! require.ensure | ovenplayer.provider.HlsProvider */[__webpack_require__.e("ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.html5"), __webpack_require__.e("ovenplayer.provider.HlsProvider")]).then((function (require) {
                var provider = __webpack_require__(/*! api/provider/webrtc/WebRTC */ "./src/js/api/provider/webrtc/WebRTC.js").default;
                registeProvider("webrtc", provider);
                return provider;
            }).bind(null, __webpack_require__)).catch(function (err) {
                throw new Error('Network error');
            });
        },
        dash: function dash() {
            return Promise.all(/*! require.ensure | ovenplayer.provider.DashProvider */[__webpack_require__.e("ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.html5"), __webpack_require__.e("ovenplayer.provider.DashProvider")]).then((function (require) {
                var provider = __webpack_require__(/*! api/provider/dash/Dash */ "./src/js/api/provider/dash/Dash.js").default;
                Providers["dash"] = provider;
                registeProvider("dash", provider);
                return provider;
            }).bind(null, __webpack_require__)).catch(function (err) {
                throw new Error('Network error');
            });
        },
        hls: function hls() {
            return Promise.all(/*! require.ensure | ovenplayer.provider.HlsProvider */[__webpack_require__.e("ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.html5"), __webpack_require__.e("ovenplayer.provider.HlsProvider")]).then((function (require) {
                var provider = __webpack_require__(/*! api/provider/hls/Hls */ "./src/js/api/provider/hls/Hls.js").default;
                registeProvider("hls", provider);
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
        return supportChacker.findProviderNameBySource(currentSource) == supportChacker.findProviderNameBySource(newSource);
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

    for (var i = 0; i < playerList.length - 1; i++) {

        if (playerList[i].containerId === containerId) {

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
var version = exports.version = '0.6.5-localbuild';

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2FtZC1vcHRpb25zLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0FwaS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0NvbmZpZ3VyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0V2ZW50RW1pdHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0xhenlDb21tYW5kRXhlY3V0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9TdXBwb3J0Q2hlY2tlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL21lZGlhL01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wbGF5bGlzdC9NYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3NoaW1zL3Byb21pc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL292ZW5wbGF5ZXIuc2RrLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9sb2dnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3N0cmluZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3VuZGVyc2NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3ZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvd2VicGFjay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmVyc2lvbi5qcyJdLCJuYW1lcyI6WyJBcGkiLCJjb250YWluZXIiLCJsb2dNYW5hZ2VyIiwidGhhdCIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwidmVyc2lvbiIsIm1lZGlhTWFuYWdlciIsInBsYXlsaXN0TWFuYWdlciIsInByb3ZpZGVyQ29udHJvbGxlciIsImN1cnJlbnRQcm92aWRlciIsInBsYXllckNvbmZpZyIsImxhenlRdWV1ZSIsImluaXRQcm92aWRlciIsImxhc3RQbGF5UG9zaXRpb24iLCJwaWNrUXVhbGl0eUZyb21Tb3VyY2UiLCJzb3VyY2VzIiwicXVhbGl0eSIsImkiLCJsZW5ndGgiLCJkZWZhdWx0IiwiZ2V0UXVhbGl0eUxhYmVsIiwibGFiZWwiLCJsb2FkUHJvdmlkZXJzIiwiZ2V0UGxheWxpc3QiLCJ0aGVuIiwiZGVzdHJveSIsInZpZGVvRWxlbWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjdXJyZW50U291cmNlSW5kZXgiLCJnZXRDdXJyZW50U291cmNlcyIsIlByb3ZpZGVycyIsIm9uIiwibmFtZSIsImRhdGEiLCJ0cmlnZ2VyIiwiRVJST1IiLCJjb2RlIiwiUExBWUVSX0ZJTEVfRVJST1IiLCJwYXJzZUludCIsIk5FVFdPUktfVU5TVEFCTEVEIiwiY3VycmVudFF1YWxpdHkiLCJnZXRDdXJyZW50UXVhbGl0eSIsImdldFF1YWxpdHlMZXZlbHMiLCJwYXVzZSIsInNldEN1cnJlbnRRdWFsaXR5IiwicHJlbG9hZCIsImZsdXNoIiwiUkVBRFkiLCJjYXRjaCIsImVycm9yIiwiZXJyb3JPYmplY3QiLCJJTklUX0VSUk9SIiwicmVhc29uIiwibWVzc2FnZSIsInJlbW92ZUFuZEV4Y3V0ZU9uY2UiLCJpbml0Iiwib3B0aW9ucyIsImlzRGVidWciLCJkaXNhYmxlIiwic2V0UGxheWxpc3QiLCJnZXRDb25maWciLCJnZXREdXJhdGlvbiIsImdldFBvc2l0aW9uIiwiZ2V0Vm9sdW1lIiwic2V0Vm9sdW1lIiwidm9sdW1lIiwic2V0TXV0ZSIsInN0YXRlIiwiZ2V0TXV0ZSIsImxvYWQiLCJwbGF5bGlzdCIsInBsYXkiLCJzZWVrIiwicG9zaXRpb24iLCJzZXRQbGF5YmFja1JhdGUiLCJwbGF5YmFja1JhdGUiLCJzZXREZWZhdWx0UGxheWJhY2tSYXRlIiwiZ2V0UGxheWJhY2tSYXRlIiwicXVhbGl0eUluZGV4IiwiY3VycmVudFNvdXJjZSIsIm5ld1NvdXJjZSIsImlzU2FtZVByb3ZpZGVyIiwicmVzUXVhbGl0eUluZGV4IiwiZ2V0QnVmZmVyIiwiZ2V0U3RhdGUiLCJzdG9wIiwicmVtb3ZlIiwiREVTVFJPWSIsIm9mZiIsIkNvbmZpZ3VyYXRvciIsImNvbXBvc2VTb3VyY2VPcHRpb25zIiwiRGVmYXVsdHMiLCJkZWZhdWx0UGxheWJhY2tSYXRlIiwicGxheWJhY2tSYXRlQ29udHJvbHMiLCJwbGF5YmFja1JhdGVzIiwibXV0ZSIsIndpZHRoIiwiaGVpZ2h0Iiwic2VyaWFsaXplIiwidmFsIiwidW5kZWZpbmVkIiwibG93ZXJjYXNlVmFsIiwidG9Mb3dlckNhc2UiLCJpc05hTiIsIk51bWJlciIsInBhcnNlRmxvYXQiLCJkZXNlcmlhbGl6ZSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5Iiwibm9ybWFsaXplU2l6ZSIsInNsaWNlIiwiZXZhbHVhdGVBc3BlY3RSYXRpbyIsImFyIiwidG9TdHJpbmciLCJpbmRleE9mIiwidGVzdCIsImluZGV4IiwidyIsInN1YnN0ciIsImgiLCJjb25maWciLCJhc3BlY3RyYXRpbyIsInJhdGVDb250cm9scyIsInJhdGVzIiwiQXJyYXkiLCJpc0FycmF5IiwiZmlsdGVyIiwiXyIsImlzTnVtYmVyIiwicmF0ZSIsIm1hcCIsIk1hdGgiLCJyb3VuZCIsInB1c2giLCJzb3J0IiwiY29uZmlnUGxheWxpc3QiLCJvYmoiLCJwaWNrIiwiZmVlZERhdGEiLCJkdXJhdGlvbiIsImRlYnVnIiwiaW1hZ2UiLCJxdWFsaXR5TGFiZWwiLCJyZXBlYXQiLCJzdHJldGNoaW5nIiwiZ2V0QXNwZWN0cmF0aW8iLCJzZXRBc3BlY3RyYXRpbyIsImFzcGVjdHJhdGlvXyIsImdldERlZmF1bHRQbGF5YmFja1JhdGUiLCJzZXRRdWFsaXR5TGFiZWwiLCJuZXdMYWJlbCIsImdldFBsYXliYWNrUmF0ZXMiLCJpc1BsYXliYWNrUmF0ZUNvbnRyb2xzIiwicGxheWxpc3RfIiwiaXNSZXBlYXQiLCJnZXRTdHJldGNoaW5nIiwiRXZlbnRFbWl0dGVyIiwib2JqZWN0IiwiX2V2ZW50cyIsInRyaWdnZXJFdmVudHMiLCJldmVudHMiLCJhcmdzIiwiY29udGV4dCIsImV2ZW50IiwibGlzdGVuZXIiLCJhcHBseSIsImNhbGwiLCJhcmd1bWVudHMiLCJhbGxFdmVudHMiLCJhbGwiLCJuYW1lcyIsImwiLCJyZXRhaW4iLCJqIiwiayIsIl9jYWxsYmFjayIsIm9uY2UiLCJjb3VudCIsIm9uY2VDYWxsYmFjayIsIl9saXN0ZW5lciIsIkxhenlDb21tYW5kRXhlY3V0b3IiLCJpbnN0YW5jZSIsInF1ZXVlZENvbW1hbmRzIiwiY29tbWFuZFF1ZXVlIiwidW5kZWNvcmF0ZWRNZXRob2RzIiwiZXhlY3V0ZU1vZGUiLCJjb21tYW5kIiwibWV0aG9kIiwicHJvdG90eXBlIiwiYWRkUXVldWUiLCJleGVjdXRlUXVldWVkQ29tbWFuZHMiLCJzaGlmdCIsInNldEV4ZWN1dGVNb2RlIiwibW9kZSIsImdldFVuZGVjb3JhdGVkTWV0aG9kcyIsImdldFF1ZXVlIiwiZW1wdHkiLCJjb21tYW5kXyIsImNvbW1hbmRRdWV1ZUl0ZW0iLCJmaW5kV2hlcmUiLCJzcGxpY2UiLCJmaW5kSW5kZXgiLCJTdXBwb3J0Q2hlY2tlciIsInN1cHBvcnRMaXN0IiwiY2hlY2tTdXBwb3J0Iiwic291cmNlIiwiTWltZVR5cGVzIiwiYWFjIiwibXA0IiwiZjR2IiwibTR2IiwibW92IiwibXAzIiwibXBlZyIsIm9ndiIsIm9nZyIsIm9nYSIsInZvcmJpcyIsIndlYm0iLCJmNGEiLCJtM3U4IiwibTN1IiwiaGxzIiwidmlkZW8iLCJkb2N1bWVudCIsImNhblBsYXlUeXBlIiwiZmlsZSIsInR5cGUiLCJtaW1lVHlwZSIsImlzSGxzU3VwcG9ydCIsImdldE1lZGlhU291cmNlIiwid2luZG93IiwiTWVkaWFTb3VyY2UiLCJXZWJLaXRNZWRpYVNvdXJjZSIsIm1lZGlhU291cmNlIiwic291cmNlQnVmZmVyIiwiU291cmNlQnVmZmVyIiwiV2ViS2l0U291cmNlQnVmZmVyIiwiaXNUeXBlU3VwcG9ydGVkIiwic291cmNlQnVmZmVyVmFsaWRBUEkiLCJhcHBlbmRCdWZmZXIiLCJmaW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UiLCJzb3J1Y2VfIiwiZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0Iiwic3VwcG9ydE5hbWVzIiwiaXRlbSIsInN1cHBvcnRlZCIsIlNUQVRFX0JVRkZFUklORyIsIlNUQVRFX0lETEUiLCJTVEFURV9DT01QTEVURSIsIlNUQVRFX1BBVVNFRCIsIlNUQVRFX1BMQVlJTkciLCJTVEFURV9FUlJPUiIsIlNUQVRFX0xPQURJTkciLCJTVEFURV9TVEFMTEVEIiwiUFJPVklERVJfSFRNTDUiLCJQUk9WSURFUl9XRUJSVEMiLCJQUk9WSURFUl9EQVNIIiwiUFJPVklERVJfSExTIiwiQ09OVEVOVF9DT01QTEVURSIsIkNPTlRFTlRfU0VFSyIsIkNPTlRFTlRfQlVGRkVSX0ZVTEwiLCJESVNQTEFZX0NMSUNLIiwiQ09OVEVOVF9MT0FERUQiLCJDT05URU5UX1NFRUtFRCIsIlBMQVlFUl9TVEFURSIsIlBMQVlFUl9DT01QTEVURSIsIlBMQVlFUl9QQVVTRSIsIlBMQVlFUl9QTEFZIiwiQ09OVEVOVF9CVUZGRVIiLCJDT05URU5UX1RJTUUiLCJDT05URU5UX1JBVEVfQ0hBTkdFIiwiQ09OVEVOVF9WT0xVTUUiLCJDT05URU5UX01VVEUiLCJDT05URU5UX01FVEEiLCJDT05URU5UX0xFVkVMUyIsIkNPTlRFTlRfTEVWRUxfQ0hBTkdFRCIsIlBMQVlCQUNLX1JBVEVfQ0hBTkdFRCIsIkNPTlRFTlRfQ0FQVElPTl9DVUVfQ0hBTkdFRCIsIkNPTlRFTlRfQ0FQVElPTl9DSEFOR0VEIiwiUExBWUVSX1VOS05XT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SIiwiUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SIiwiUExBWUVSX0NBUFRJT05fRVJST1IiLCJQTEFZRVJfV0VCUlRDX1dTX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19XU19DTE9TRUQiLCJQTEFZRVJfV0VCUlRDX0FERF9JQ0VDQU5ESURBVEVfRVJST1IiLCJQTEFZRVJfV0VCUlRDX1NFVF9SRU1PVEVfREVTQ19FUlJPUiIsIlBMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUiIsIlBMQVlFUl9XRUJSVENfU0VUX0xPQ0FMX0RFU0NfRVJST1IiLCJQTEFZRVJfV0VCUlRDX05FVFdPUktfU0xPVyIsIk1hbmFnZXIiLCJtZWRpYUVsZW1lbnQiLCJjcmVhdGVNZWRpYUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsInJlbW92ZUNoaWxkIiwiY3VycmVudFBsYXlsaXN0Iiwic3VwcG9ydENoZWNrZXIiLCJtYWtlUHJldHR5U291cmNlIiwic291cmNlXyIsImhvc3QiLCJhcHBsaWNhdGlvbiIsInN0cmVhbSIsIm1pbWV0eXBlUmVnRXgiLCJyZXBsYWNlIiwicHJldHRpZWRQbGF5bGlzdCIsInRyYWNrcyIsInBsYXlsaXN0SXRlbSIsImxldmVscyIsInByZXR0eVNvdXJjZSIsImRlZmF1bHRTb3VyY2UiLCJjYXB0aW9ucyIsImNvbmNhdCIsInRyYWNrIiwiQ29udHJvbGxlciIsInN1cHBvcnRDaGFja2VyIiwicmVnaXN0ZVByb3ZpZGVyIiwicHJvdmlkZXIiLCJQcm92aWRlckxvYWRlciIsImh0bWw1IiwicmVxdWlyZSIsImVyciIsIkVycm9yIiwid2VicnRjIiwiZGFzaCIsInN1cHBvcnRlZFByb3ZpZGVyTmFtZXMiLCJQcm9taXNlIiwicHJvdmlkZXJOYW1lIiwiZmluZEJ5TmFtZSIsImdldFByb3ZpZGVyQnlTb3VyY2UiLCJzdXBwb3J0ZWRQcm92aWRlck5hbWUiLCJwcm9taXNlRmluYWxseSIsImNhbGxiYWNrIiwiY29uc3RydWN0b3IiLCJ2YWx1ZSIsInJlc29sdmUiLCJyZWplY3QiLCJzZXRUaW1lb3V0RnVuYyIsInNldFRpbWVvdXQiLCJzZXRJbW1lZGlhdGVGdW5jIiwic2V0SW1tZWRpYXRlIiwibm9vcCIsImJpbmQiLCJmbiIsInRoaXNBcmciLCJQcm9taXNlU2hpbSIsIlR5cGVFcnJvciIsIl9zdGF0ZSIsIl9oYW5kbGVkIiwiX3ZhbHVlIiwiX2RlZmVycmVkcyIsImRvUmVzb2x2ZSIsImhhbmRsZSIsInNlbGYiLCJkZWZlcnJlZCIsIl9pbW1lZGlhdGVGbiIsImNiIiwib25GdWxmaWxsZWQiLCJvblJlamVjdGVkIiwicHJvbWlzZSIsInJldCIsImUiLCJuZXdWYWx1ZSIsImZpbmFsZSIsIl91bmhhbmRsZWRSZWplY3Rpb25GbiIsImxlbiIsIkhhbmRsZXIiLCJkb25lIiwiZXgiLCJwcm9tIiwiYXJyIiwicmVtYWluaW5nIiwicmVzIiwicmFjZSIsInZhbHVlcyIsImNvbnNvbGUiLCJ3YXJuIiwicmVzb2x2ZWQiLCJfX3dlYnBhY2tfcHVibGljX3BhdGhfXyIsIk92ZW5QbGF5ZXJTREsiLCJwbGF5ZXJMaXN0IiwiY2hlY2tBbmRHZXRDb250YWluZXJFbGVtZW50IiwiY29udGFpbmVyRWxlbWVudCIsImdldEVsZW1lbnRCeUlkIiwibm9kZVR5cGUiLCJjcmVhdGUiLCJwbGF5ZXJJbnN0YW5jZSIsImdldFBsYXllckxpc3QiLCJnZXRQbGF5ZXJCeUNvbnRhaW5lcklkIiwiY29udGFpbmVySWQiLCJnZXRQbGF5ZXJCeUluZGV4IiwiZ2VuZXJhdGVXZWJydGNVcmxzIiwibG9nZ2VyIiwicHJldkNvbnNvbGVMb2ciLCJlbmFibGUiLCJ0cmltIiwibmF0dXJhbEhtcyIsInN0cmluZyIsImV4dHJhY3RFeHRlbnNpb24iLCJwYXRoIiwiZ2V0QXp1cmVGaWxlRm9ybWF0IiwiZXh0ZW5zaW9uIiwiYXp1cmVkRm9ybWF0Iiwic3BsaXQiLCJsYXN0SW5kZXhPZiIsInNlY29uZCIsInNlY051bSIsImhvdXJzIiwiZmxvb3IiLCJtaW51dGVzIiwic2Vjb25kcyIsIm4iLCJnbG9iYWwiLCJyIiwibyIsInMiLCJTeW1ib2wiLCJ1IiwiYyIsInAiLCJoYXNPd25Qcm9wZXJ0eSIsInQiLCJhIiwiZiIsIl93cmFwcGVkIiwiZXhwb3J0cyIsIm1vZHVsZSIsIlZFUlNJT04iLCJ2IiwieSIsImQiLCJpdGVyYXRlZSIsImlkZW50aXR5IiwiaXNGdW5jdGlvbiIsImlzT2JqZWN0IiwibWF0Y2hlciIsInByb3BlcnR5IiwiZyIsIm1heCIsIm0iLCJiIiwieCIsInBvdyIsIkEiLCJlYWNoIiwiY29sbGVjdCIsIk8iLCJyZWR1Y2UiLCJmb2xkbCIsImluamVjdCIsInJlZHVjZVJpZ2h0IiwiZm9sZHIiLCJmaW5kIiwiZGV0ZWN0IiwiZmluZEtleSIsInNlbGVjdCIsIm5lZ2F0ZSIsImV2ZXJ5Iiwic29tZSIsImFueSIsImNvbnRhaW5zIiwiaW5jbHVkZXMiLCJpbmNsdWRlIiwiaW52b2tlIiwicGx1Y2siLCJ3aGVyZSIsIm1pbiIsInNodWZmbGUiLCJzYW1wbGUiLCJyYW5kb20iLCJjbG9uZSIsInNvcnRCeSIsImNyaXRlcmlhIiwiZ3JvdXBCeSIsImluZGV4QnkiLCJjb3VudEJ5IiwiUyIsInRvQXJyYXkiLCJpc1N0cmluZyIsIm1hdGNoIiwic2l6ZSIsInBhcnRpdGlvbiIsImZpcnN0IiwiaGVhZCIsInRha2UiLCJpbml0aWFsIiwibGFzdCIsInJlc3QiLCJ0YWlsIiwiZHJvcCIsImNvbXBhY3QiLCJCb29sZWFuIiwiTSIsImlzQXJndW1lbnRzIiwiZmxhdHRlbiIsIndpdGhvdXQiLCJkaWZmZXJlbmNlIiwidW5pcSIsInVuaXF1ZSIsImlzQm9vbGVhbiIsInVuaW9uIiwiaW50ZXJzZWN0aW9uIiwidW56aXAiLCJ6aXAiLCJGIiwiZmluZExhc3RJbmRleCIsInNvcnRlZEluZGV4IiwiRSIsInJhbmdlIiwiY2VpbCIsImNodW5rIiwiTiIsInBhcnRpYWwiLCJwbGFjZWhvbGRlciIsImJpbmRBbGwiLCJtZW1vaXplIiwiY2FjaGUiLCJkZWxheSIsImRlZmVyIiwidGhyb3R0bGUiLCJsZWFkaW5nIiwibm93IiwiY2xlYXJUaW1lb3V0IiwidHJhaWxpbmciLCJjYW5jZWwiLCJkZWJvdW5jZSIsIndyYXAiLCJjb21wb3NlIiwiYWZ0ZXIiLCJiZWZvcmUiLCJyZXN0QXJndW1lbnRzIiwiSSIsInByb3BlcnR5SXNFbnVtZXJhYmxlIiwiVCIsIkIiLCJhbGxLZXlzIiwibWFwT2JqZWN0IiwicGFpcnMiLCJpbnZlcnQiLCJmdW5jdGlvbnMiLCJtZXRob2RzIiwiUiIsImV4dGVuZCIsImV4dGVuZE93biIsImFzc2lnbiIsInEiLCJLIiwieiIsIm9taXQiLCJTdHJpbmciLCJkZWZhdWx0cyIsInRhcCIsImlzTWF0Y2giLCJ2YWx1ZU9mIiwicG9wIiwiaXNFcXVhbCIsImlzRW1wdHkiLCJpc0VsZW1lbnQiLCJEIiwiY2hpbGROb2RlcyIsIkludDhBcnJheSIsImlzRmluaXRlIiwiaXNTeW1ib2wiLCJpc051bGwiLCJpc1VuZGVmaW5lZCIsImhhcyIsIm5vQ29uZmxpY3QiLCJjb25zdGFudCIsInByb3BlcnR5T2YiLCJtYXRjaGVzIiwidGltZXMiLCJEYXRlIiwiZ2V0VGltZSIsIkwiLCJQIiwiVyIsImpvaW4iLCJSZWdFeHAiLCJlc2NhcGUiLCJ1bmVzY2FwZSIsInJlc3VsdCIsIkMiLCJ1bmlxdWVJZCIsInRlbXBsYXRlU2V0dGluZ3MiLCJldmFsdWF0ZSIsImludGVycG9sYXRlIiwiSiIsIlUiLCJWIiwiJCIsInRlbXBsYXRlIiwidmFyaWFibGUiLCJGdW5jdGlvbiIsImNoYWluIiwiX2NoYWluIiwiRyIsIm1peGluIiwidG9KU09OIiwiaXNSdG1wIiwiaXNXZWJSVEMiLCJpc0Rhc2giLCJnZXRTY3JpcHRQYXRoIiwic2NyaXB0TmFtZSIsInNjcmlwdHMiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInNyYyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQVEsb0JBQW9CO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBLGlEQUF5Qyw0WEFBNFg7QUFDcmE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBLHlDQUFpQzs7QUFFakM7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQXdCLGtDQUFrQztBQUMxRCxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0Esa0RBQTBDLG9CQUFvQixXQUFXOztBQUV6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUFnQix1QkFBdUI7QUFDdkM7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ25NQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDREE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEM7O0FBRTVDOzs7Ozs7Ozs7Ozs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEJBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUVBOzs7Ozs7QUFaQTtBQWtCQSxJQUFNQSxNQUFNLFNBQU5BLEdBQU0sQ0FBU0MsU0FBVCxFQUFtQjtBQUMzQixRQUFJQyxhQUFhLHVCQUFqQjtBQUNBLFFBQU1DLE9BQU8sRUFBYjtBQUNBLGdDQUFhQSxJQUFiOztBQUVBQyxzQkFBa0JDLEdBQWxCLENBQXNCLHNCQUFxQkMsZ0JBQTNDO0FBQ0FGLHNCQUFrQkMsR0FBbEIsQ0FBc0IsYUFBdEI7QUFDQTtBQUNBLFFBQUlFLGVBQWUsdUJBQWFOLFNBQWIsQ0FBbkI7QUFDQSxRQUFJTyxrQkFBa0Isd0JBQXRCO0FBQ0EsUUFBSUMscUJBQXFCLDJCQUF6QjtBQUNBLFFBQUlDLGtCQUFrQixFQUF0QjtBQUNBLFFBQUlDLGVBQWUsRUFBbkI7QUFDQSxRQUFJQyxZQUFZLEVBQWhCOztBQUVBLFFBQU1DLGVBQWUsU0FBZkEsWUFBZSxDQUFTQyxnQkFBVCxFQUEwQjtBQUMzQyxZQUFNQyx3QkFBd0IsU0FBeEJBLHFCQUF3QixDQUFDQyxPQUFELEVBQVk7QUFDdEMsZ0JBQUlDLFVBQVUsQ0FBZDtBQUNBLGdCQUFJRCxPQUFKLEVBQWE7QUFDVCxxQkFBSyxJQUFJRSxJQUFJLENBQWIsRUFBZ0JBLElBQUlGLFFBQVFHLE1BQTVCLEVBQW9DRCxHQUFwQyxFQUF5QztBQUNyQyx3QkFBSUYsUUFBUUUsQ0FBUixFQUFXRSxPQUFmLEVBQXdCO0FBQ3BCSCxrQ0FBVUMsQ0FBVjtBQUNIO0FBQ0Qsd0JBQUlQLGFBQWFVLGVBQWIsTUFBa0NMLFFBQVFFLENBQVIsRUFBV0ksS0FBWCxLQUFxQlgsYUFBYVUsZUFBYixFQUEzRCxFQUE0RjtBQUN4RiwrQkFBT0gsQ0FBUDtBQUNIO0FBQ0o7QUFDSjtBQUNELG1CQUFPRCxPQUFQO0FBQ0gsU0FiRDs7QUFlQSxlQUFPUixtQkFBbUJjLGFBQW5CLENBQWlDZixnQkFBZ0JnQixXQUFoQixFQUFqQyxFQUFnRUMsSUFBaEUsQ0FBcUUscUJBQWE7QUFDckYsZ0JBQUdmLGVBQUgsRUFBbUI7QUFDZkEsZ0NBQWdCZ0IsT0FBaEI7QUFDQWhCLGtDQUFrQixJQUFsQjtBQUNIO0FBQ0QsZ0JBQU1pQixlQUFlcEIsYUFBYXFCLGFBQWIsRUFBckI7QUFDQSxnQkFBSUMscUJBQXFCZCxzQkFBc0JQLGdCQUFnQnNCLGlCQUFoQixFQUF0QixDQUF6Qjs7QUFFQTFCLDhCQUFrQkMsR0FBbEIsQ0FBc0IsNEJBQTJCd0Isa0JBQWpEOztBQUVBbkIsOEJBQWtCcUIsVUFBVUYsa0JBQVYsRUFBOEJGLFlBQTlCLEVBQTRDaEIsWUFBNUMsQ0FBbEI7O0FBRUE7QUFDQUQsNEJBQWdCc0IsRUFBaEIsQ0FBbUIsS0FBbkIsRUFBMEIsVUFBU0MsSUFBVCxFQUFlQyxJQUFmLEVBQW9CO0FBQzFDL0IscUJBQUtnQyxPQUFMLENBQWFGLElBQWIsRUFBbUJDLElBQW5COztBQUVBO0FBQ0Esb0JBQUtELFNBQVNHLGdCQUFULEtBQW1CRixLQUFLRyxJQUFMLEtBQWNDLDRCQUFkLElBQW1DQyxTQUFTTCxLQUFLRyxJQUFMLEdBQVUsR0FBbkIsTUFBNEIsQ0FBbEYsQ0FBRCxJQUNHSixTQUFTTyw0QkFEaEIsRUFDbUM7QUFDL0Isd0JBQUlDLGlCQUFpQnRDLEtBQUt1QyxpQkFBTCxFQUFyQjtBQUNBLHdCQUFHRCxpQkFBZSxDQUFmLEdBQW1CdEMsS0FBS3dDLGdCQUFMLEdBQXdCeEIsTUFBOUMsRUFBcUQ7QUFDakQ7QUFDQWhCLDZCQUFLeUMsS0FBTDtBQUNBekMsNkJBQUswQyxpQkFBTCxDQUF1QkosaUJBQWUsQ0FBdEM7QUFDSDtBQUVKO0FBRUosYUFmRDtBQWlCSCxTQTlCTSxFQThCSmhCLElBOUJJLENBOEJDLFlBQUk7QUFDUmYsNEJBQWdCb0MsT0FBaEIsQ0FBd0J0QyxnQkFBZ0JzQixpQkFBaEIsRUFBeEIsRUFBNkRoQixnQkFBN0Q7O0FBRUFGLHNCQUFVbUMsS0FBVjtBQUNBO0FBQ0FuQyxzQkFBVWMsT0FBVjs7QUFFQXZCLGlCQUFLZ0MsT0FBTCxDQUFhYSxnQkFBYjtBQUNILFNBdENNLEVBc0NKQyxLQXRDSSxDQXNDRSxVQUFDQyxLQUFELEVBQVc7QUFDaEIsZ0JBQU1DLGNBQWMsRUFBQ2QsTUFBT2UscUJBQVIsRUFBb0JDLFFBQVMsYUFBN0IsRUFBNENDLFNBQVUsb0JBQXRELEVBQTRFSixPQUFRQSxLQUFwRixFQUFwQjtBQUNBL0MsaUJBQUtnQyxPQUFMLENBQWFDLGdCQUFiLEVBQW9CZSxXQUFwQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBdkMsc0JBQVUyQyxtQkFBVixDQUE4QixNQUE5QjtBQUNILFNBL0NNLENBQVA7QUFnREgsS0FoRUQ7O0FBbUVBOzs7Ozs7QUFNQXBELFNBQUtxRCxJQUFMLEdBQVksVUFBQ0MsT0FBRCxFQUFZO0FBQ3BCO0FBQ0E3QyxvQkFBWSxtQ0FBb0JULElBQXBCLEVBQTBCLENBQUMsTUFBRCxFQUFRLE1BQVIsRUFBZSxPQUFmLEVBQXVCLE1BQXZCLEVBQThCLE1BQTlCLEVBQXNDLGFBQXRDLEVBQXFELGFBQXJELEVBQW9FLFdBQXBFLEVBQWlGLFNBQWpGLEVBQTRGLFdBQTVGLEVBQXlHLFVBQXpHLENBQTFCLENBQVo7QUFDQVEsdUJBQWUsNEJBQWE4QyxPQUFiLENBQWY7QUFDQSxZQUFHLENBQUM5QyxhQUFhK0MsT0FBYixFQUFKLEVBQTJCO0FBQ3ZCeEQsdUJBQVd5RCxPQUFYO0FBQ0g7QUFDRHZELDBCQUFrQkMsR0FBbEIsQ0FBc0IsY0FBdEI7QUFDQUQsMEJBQWtCQyxHQUFsQixDQUFzQix3QkFBdEIsRUFBZ0RNLFlBQWhEOztBQUVBSCx3QkFBZ0JvRCxXQUFoQixDQUE0QmpELGFBQWFhLFdBQWIsRUFBNUI7QUFDQXBCLDBCQUFrQkMsR0FBbEIsQ0FBc0IseUJBQXRCLEVBQWtERyxnQkFBZ0JzQixpQkFBaEIsRUFBbEQ7QUFDQWpCO0FBQ0gsS0FiRDtBQWNBVixTQUFLMEQsU0FBTCxHQUFpQixZQUFNO0FBQ25CekQsMEJBQWtCQyxHQUFsQixDQUFzQixtQkFBdEIsRUFBMkNNLGFBQWFrRCxTQUFiLEVBQTNDO0FBQ0EsZUFBT2xELGFBQWFrRCxTQUFiLEVBQVA7QUFDSCxLQUhEOztBQUtBMUQsU0FBSzJELFdBQUwsR0FBbUIsWUFBTTtBQUNyQjFELDBCQUFrQkMsR0FBbEIsQ0FBc0IscUJBQXRCLEVBQTZDSyxnQkFBZ0JvRCxXQUFoQixFQUE3QztBQUNBLGVBQU9wRCxnQkFBZ0JvRCxXQUFoQixFQUFQO0FBQ0gsS0FIRDtBQUlBM0QsU0FBSzRELFdBQUwsR0FBbUIsWUFBTTtBQUNyQjNELDBCQUFrQkMsR0FBbEIsQ0FBc0IscUJBQXRCLEVBQTZDSyxnQkFBZ0JxRCxXQUFoQixFQUE3QztBQUNBLGVBQU9yRCxnQkFBZ0JxRCxXQUFoQixFQUFQO0FBQ0gsS0FIRDtBQUlBNUQsU0FBSzZELFNBQUwsR0FBaUIsWUFBTTtBQUNuQjVELDBCQUFrQkMsR0FBbEIsQ0FBc0IsbUJBQXRCLEVBQTJDSyxnQkFBZ0JzRCxTQUFoQixFQUEzQztBQUNBLGVBQU90RCxnQkFBZ0JzRCxTQUFoQixFQUFQO0FBQ0gsS0FIRDtBQUlBN0QsU0FBSzhELFNBQUwsR0FBaUIsVUFBQ0MsTUFBRCxFQUFZO0FBQ3pCOUQsMEJBQWtCQyxHQUFsQixDQUFzQix1QkFBdUI2RCxNQUE3QztBQUNBeEQsd0JBQWdCdUQsU0FBaEIsQ0FBMEJDLE1BQTFCO0FBQ0gsS0FIRDtBQUlBL0QsU0FBS2dFLE9BQUwsR0FBZSxVQUFDQyxLQUFELEVBQVc7QUFDdEJoRSwwQkFBa0JDLEdBQWxCLENBQXNCLHFCQUFxQitELEtBQTNDO0FBQ0EsZUFBTzFELGdCQUFnQnlELE9BQWhCLENBQXdCQyxLQUF4QixDQUFQO0FBQ0gsS0FIRDtBQUlBakUsU0FBS2tFLE9BQUwsR0FBZSxZQUFNO0FBQ2pCakUsMEJBQWtCQyxHQUFsQixDQUFzQixxQkFBcUJLLGdCQUFnQjJELE9BQWhCLEVBQTNDO0FBQ0EsZUFBTzNELGdCQUFnQjJELE9BQWhCLEVBQVA7QUFDSCxLQUhEO0FBSUFsRSxTQUFLbUUsSUFBTCxHQUFZLFVBQUNDLFFBQUQsRUFBYztBQUN0Qm5FLDBCQUFrQkMsR0FBbEIsQ0FBc0IsZUFBdEIsRUFBdUNrRSxRQUF2QztBQUNBM0Qsb0JBQVksbUNBQW9CVCxJQUFwQixFQUEwQixDQUFDLE1BQUQsRUFBUSxNQUFSLEVBQWUsTUFBZixDQUExQixDQUFaOztBQUVBLFlBQUdvRSxRQUFILEVBQVk7QUFDUjdELDRCQUFnQm1DLGlCQUFoQixDQUFrQyxDQUFsQztBQUNBckMsNEJBQWdCb0QsV0FBaEIsQ0FBNEJXLFFBQTVCO0FBQ0g7QUFDRCxlQUFPMUQsY0FBUDtBQUVILEtBVkQ7QUFXQVYsU0FBS3FFLElBQUwsR0FBWSxZQUFNO0FBQ2RwRSwwQkFBa0JDLEdBQWxCLENBQXNCLGVBQXRCO0FBQ0FLLHdCQUFnQjhELElBQWhCO0FBQ0gsS0FIRDtBQUlBckUsU0FBS3lDLEtBQUwsR0FBYSxZQUFNO0FBQ2Z4QywwQkFBa0JDLEdBQWxCLENBQXNCLGdCQUF0QjtBQUNBSyx3QkFBZ0JrQyxLQUFoQjtBQUNILEtBSEQ7QUFJQXpDLFNBQUtzRSxJQUFMLEdBQVksVUFBQ0MsUUFBRCxFQUFjO0FBQ3RCdEUsMEJBQWtCQyxHQUFsQixDQUFzQixrQkFBaUJxRSxRQUF2QztBQUNBaEUsd0JBQWdCK0QsSUFBaEIsQ0FBcUJDLFFBQXJCO0FBQ0gsS0FIRDtBQUlBdkUsU0FBS3dFLGVBQUwsR0FBdUIsVUFBQ0MsWUFBRCxFQUFpQjtBQUNwQ3hFLDBCQUFrQkMsR0FBbEIsQ0FBc0IsMEJBQXRCLEVBQWtEdUUsWUFBbEQ7QUFDQSxlQUFPbEUsZ0JBQWdCaUUsZUFBaEIsQ0FBZ0NoRSxhQUFha0Usc0JBQWIsQ0FBb0NELFlBQXBDLENBQWhDLENBQVA7QUFDSCxLQUhEO0FBSUF6RSxTQUFLMkUsZUFBTCxHQUF1QixZQUFLO0FBQ3hCMUUsMEJBQWtCQyxHQUFsQixDQUFzQiwwQkFBdEIsRUFBa0RLLGdCQUFnQm9FLGVBQWhCLEVBQWxEO0FBQ0EsZUFBT3BFLGdCQUFnQm9FLGVBQWhCLEVBQVA7QUFDSCxLQUhEO0FBSUEzRSxTQUFLd0MsZ0JBQUwsR0FBd0IsWUFBSztBQUN6QnZDLDBCQUFrQkMsR0FBbEIsQ0FBc0IsMkJBQXRCLEVBQW1ESyxnQkFBZ0JpQyxnQkFBaEIsRUFBbkQ7QUFDQSxlQUFPakMsZ0JBQWdCaUMsZ0JBQWhCLEVBQVA7QUFDSCxLQUhEO0FBSUF4QyxTQUFLdUMsaUJBQUwsR0FBeUIsWUFBSztBQUMxQnRDLDBCQUFrQkMsR0FBbEIsQ0FBc0IsNEJBQXRCLEVBQW9ESyxnQkFBZ0JnQyxpQkFBaEIsRUFBcEQ7QUFDQSxlQUFPaEMsZ0JBQWdCZ0MsaUJBQWhCLEVBQVA7QUFDSCxLQUhEO0FBSUF2QyxTQUFLMEMsaUJBQUwsR0FBeUIsVUFBQ2tDLFlBQUQsRUFBaUI7QUFDdEMzRSwwQkFBa0JDLEdBQWxCLENBQXNCLDRCQUF0QixFQUFvRDBFLFlBQXBEOztBQUVBLFlBQUkvRCxVQUFVUixnQkFBZ0JzQixpQkFBaEIsRUFBZDtBQUNBLFlBQUlrRCxnQkFBZ0JoRSxRQUFRYixLQUFLdUMsaUJBQUwsRUFBUixDQUFwQjtBQUNBLFlBQUl1QyxZQUFZakUsUUFBUStELFlBQVIsQ0FBaEI7QUFDQSxZQUFJakUsbUJBQW1CWCxLQUFLNEQsV0FBTCxFQUF2QjtBQUNBLFlBQUltQixpQkFBaUJ6RSxtQkFBbUJ5RSxjQUFuQixDQUFrQ0YsYUFBbEMsRUFBaURDLFNBQWpELENBQXJCO0FBQ0E7QUFDQSxZQUFJRSxrQkFBa0J6RSxnQkFBZ0JtQyxpQkFBaEIsQ0FBa0NrQyxZQUFsQyxFQUFnREcsY0FBaEQsQ0FBdEI7O0FBRUEsWUFBRyxDQUFDRCxTQUFKLEVBQWM7QUFDVixtQkFBTyxJQUFQO0FBQ0g7O0FBRUQ3RSwwQkFBa0JDLEdBQWxCLENBQXNCLDBDQUF0QixFQUFrRTZFLGNBQWxFOztBQUVBLFlBQUcsQ0FBQ0EsY0FBSixFQUFtQjtBQUNmdEUsd0JBQVksbUNBQW9CVCxJQUFwQixFQUEwQixDQUFDLE1BQUQsQ0FBMUIsQ0FBWjtBQUNBVSx5QkFBYUMsZ0JBQWI7QUFDSDs7QUFFRCxlQUFPcUUsZUFBUDtBQUNILEtBdkJEOztBQXlCQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBaEYsU0FBS2lGLFNBQUwsR0FBaUIsWUFBTTtBQUNuQmhGLDBCQUFrQkMsR0FBbEIsQ0FBc0Isb0JBQXRCLEVBQTRDSyxnQkFBZ0IwRSxTQUFoQixFQUE1QztBQUNBMUUsd0JBQWdCMEUsU0FBaEI7QUFDSCxLQUhEO0FBSUFqRixTQUFLa0YsUUFBTCxHQUFnQixZQUFNO0FBQ2xCakYsMEJBQWtCQyxHQUFsQixDQUFzQixtQkFBdEIsRUFBMkNLLGdCQUFnQjJFLFFBQWhCLEVBQTNDO0FBQ0EsZUFBTzNFLGdCQUFnQjJFLFFBQWhCLEVBQVA7QUFDSCxLQUhEO0FBSUFsRixTQUFLbUYsSUFBTCxHQUFZLFlBQU07QUFDZGxGLDBCQUFrQkMsR0FBbEIsQ0FBc0IsZUFBdEI7QUFDQUssd0JBQWdCNEUsSUFBaEI7QUFDSCxLQUhEO0FBSUFuRixTQUFLb0YsTUFBTCxHQUFjLFlBQU07QUFDaEJuRiwwQkFBa0JDLEdBQWxCLENBQXNCLGlCQUF0QjtBQUNBTyxrQkFBVWMsT0FBVjtBQUNBaEIsd0JBQWdCZ0IsT0FBaEI7QUFDQWhCLDBCQUFrQixJQUFsQjtBQUNBRCw2QkFBcUIsSUFBckI7QUFDQUQsMEJBQWtCLElBQWxCO0FBQ0FHLHVCQUFlLElBQWY7O0FBRUFSLGFBQUtnQyxPQUFMLENBQWFxRCxrQkFBYjtBQUNBckYsYUFBS3NGLEdBQUw7O0FBRUFyRiwwQkFBa0JDLEdBQWxCLENBQXNCLHNIQUF0QjtBQUNBSCxtQkFBV3dCLE9BQVg7QUFDSCxLQWREOztBQWdCQSxXQUFPdkIsSUFBUDtBQUNILENBalBEOztrQkFxUGVILEc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdlFmOzs7Ozs7QUFFQTs7Ozs7QUFLQSxJQUFNMEYsZUFBZSxTQUFmQSxZQUFlLENBQVNqQyxPQUFULEVBQWlCOztBQUVsQyxRQUFNa0MsdUJBQXVCLFNBQXZCQSxvQkFBdUIsQ0FBU2xDLE9BQVQsRUFBaUI7QUFDMUMsWUFBTW1DLFdBQVc7QUFDYkMsaUNBQXFCLENBRFI7QUFFYkMsa0NBQXNCLEtBRlQ7QUFHYkMsMkJBQWUsQ0FBQyxJQUFELEVBQU8sR0FBUCxFQUFZLENBQVosRUFBZSxHQUFmLEVBQW9CLENBQXBCLENBSEY7QUFJYkMsa0JBQU0sS0FKTztBQUtiOUIsb0JBQVEsRUFMSztBQU1iK0IsbUJBQU8sR0FOTTtBQU9iQyxvQkFBUTtBQVBLLFNBQWpCO0FBU0EsWUFBTUMsWUFBWSxTQUFaQSxTQUFZLENBQVVDLEdBQVYsRUFBZTtBQUM3QixnQkFBSUEsUUFBUUMsU0FBWixFQUF1QjtBQUNuQix1QkFBTyxJQUFQO0FBQ0g7QUFDRCxnQkFBSSxPQUFPRCxHQUFQLEtBQWUsUUFBZixJQUEyQkEsSUFBSWpGLE1BQUosR0FBYSxDQUE1QyxFQUErQztBQUMzQyxvQkFBTW1GLGVBQWVGLElBQUlHLFdBQUosRUFBckI7QUFDQSxvQkFBSUQsaUJBQWlCLE1BQXJCLEVBQTZCO0FBQ3pCLDJCQUFPLElBQVA7QUFDSDtBQUNELG9CQUFJQSxpQkFBaUIsT0FBckIsRUFBOEI7QUFDMUIsMkJBQU8sS0FBUDtBQUNIO0FBQ0Qsb0JBQUksQ0FBQ0UsTUFBTUMsT0FBT0wsR0FBUCxDQUFOLENBQUQsSUFBdUIsQ0FBQ0ksTUFBTUUsV0FBV04sR0FBWCxDQUFOLENBQTVCLEVBQW9EO0FBQ2hELDJCQUFPSyxPQUFPTCxHQUFQLENBQVA7QUFDSDtBQUNKO0FBQ0QsbUJBQU9BLEdBQVA7QUFDSCxTQWpCRDtBQWtCQSxZQUFNTyxjQUFjLFNBQWRBLFdBQWMsQ0FBVWxELE9BQVYsRUFBbUI7QUFDbkNtRCxtQkFBT0MsSUFBUCxDQUFZcEQsT0FBWixFQUFxQnFELE9BQXJCLENBQTZCLFVBQUNDLEdBQUQsRUFBUztBQUNsQyxvQkFBSUEsUUFBUSxJQUFaLEVBQWtCO0FBQ2Q7QUFDSDtBQUNEdEQsd0JBQVFzRCxHQUFSLElBQWVaLFVBQVUxQyxRQUFRc0QsR0FBUixDQUFWLENBQWY7QUFDSCxhQUxEO0FBTUgsU0FQRDtBQVFBLFlBQU1DLGdCQUFnQixTQUFoQkEsYUFBZ0IsQ0FBVVosR0FBVixFQUFlO0FBQ2pDLGdCQUFJQSxJQUFJYSxLQUFKLElBQWFiLElBQUlhLEtBQUosQ0FBVSxDQUFDLENBQVgsTUFBa0IsSUFBbkMsRUFBeUM7QUFDckNiLHNCQUFNQSxJQUFJYSxLQUFKLENBQVUsQ0FBVixFQUFhLENBQUMsQ0FBZCxDQUFOO0FBQ0g7QUFDRCxtQkFBT2IsR0FBUDtBQUNILFNBTEQ7QUFNQSxZQUFNYyxzQkFBc0IsU0FBdEJBLG1CQUFzQixDQUFVQyxFQUFWLEVBQWNsQixLQUFkLEVBQXFCO0FBQzdDLGdCQUFJQSxNQUFNbUIsUUFBTixHQUFpQkMsT0FBakIsQ0FBeUIsR0FBekIsTUFBa0MsQ0FBQyxDQUF2QyxFQUEwQztBQUN0Qyx1QkFBTyxDQUFQO0FBQ0g7QUFDRCxnQkFBSSxPQUFPRixFQUFQLEtBQWMsUUFBZCxJQUEwQixDQUFDQSxFQUEvQixFQUFtQztBQUMvQix1QkFBTyxDQUFQO0FBQ0g7QUFDRCxnQkFBSSxlQUFlRyxJQUFmLENBQW9CSCxFQUFwQixDQUFKLEVBQTZCO0FBQ3pCLHVCQUFPQSxFQUFQO0FBQ0g7QUFDRCxnQkFBTUksUUFBUUosR0FBR0UsT0FBSCxDQUFXLEdBQVgsQ0FBZDtBQUNBLGdCQUFJRSxVQUFVLENBQUMsQ0FBZixFQUFrQjtBQUNkLHVCQUFPLENBQVA7QUFDSDtBQUNELGdCQUFNQyxJQUFJZCxXQUFXUyxHQUFHTSxNQUFILENBQVUsQ0FBVixFQUFhRixLQUFiLENBQVgsQ0FBVjtBQUNBLGdCQUFNRyxJQUFJaEIsV0FBV1MsR0FBR00sTUFBSCxDQUFVRixRQUFRLENBQWxCLENBQVgsQ0FBVjtBQUNBLGdCQUFJQyxLQUFLLENBQUwsSUFBVUUsS0FBSyxDQUFuQixFQUFzQjtBQUNsQix1QkFBTyxDQUFQO0FBQ0g7QUFDRCxtQkFBUUEsSUFBSUYsQ0FBSixHQUFRLEdBQVQsR0FBZ0IsR0FBdkI7QUFDSCxTQXBCRDtBQXFCQWIsb0JBQVlsRCxPQUFaO0FBQ0EsWUFBSWtFLFNBQVMsU0FBYyxFQUFkLEVBQWtCL0IsUUFBbEIsRUFBNEJuQyxPQUE1QixDQUFiO0FBQ0FrRSxlQUFPMUIsS0FBUCxHQUFlZSxjQUFjVyxPQUFPMUIsS0FBckIsQ0FBZjtBQUNBMEIsZUFBT3pCLE1BQVAsR0FBZ0JjLGNBQWNXLE9BQU96QixNQUFyQixDQUFoQjtBQUNBeUIsZUFBT0MsV0FBUCxHQUFxQlYsb0JBQW9CUyxPQUFPQyxXQUEzQixFQUF3Q0QsT0FBTzFCLEtBQS9DLENBQXJCOztBQUVBLFlBQUk0QixlQUFlRixPQUFPN0Isb0JBQTFCO0FBQ0EsWUFBSStCLFlBQUosRUFBa0I7QUFDZCxnQkFBSUMsUUFBUUgsT0FBTzVCLGFBQW5COztBQUVBLGdCQUFJZ0MsTUFBTUMsT0FBTixDQUFjSCxZQUFkLENBQUosRUFBaUM7QUFDN0JDLHdCQUFRRCxZQUFSO0FBQ0g7QUFDREMsb0JBQVFBLE1BQU1HLE1BQU4sQ0FBYTtBQUFBLHVCQUFRQyxxQkFBRUMsUUFBRixDQUFXQyxJQUFYLEtBQW9CQSxRQUFRLElBQTVCLElBQW9DQSxRQUFRLENBQXBEO0FBQUEsYUFBYixFQUNIQyxHQURHLENBQ0M7QUFBQSx1QkFBUUMsS0FBS0MsS0FBTCxDQUFXSCxPQUFPLENBQWxCLElBQXVCLENBQS9CO0FBQUEsYUFERCxDQUFSOztBQUdBLGdCQUFJTixNQUFNVCxPQUFOLENBQWMsQ0FBZCxJQUFtQixDQUF2QixFQUEwQjtBQUN0QlMsc0JBQU1VLElBQU4sQ0FBVyxDQUFYO0FBQ0g7QUFDRFYsa0JBQU1XLElBQU47O0FBRUFkLG1CQUFPN0Isb0JBQVAsR0FBOEIsSUFBOUI7QUFDQTZCLG1CQUFPNUIsYUFBUCxHQUF1QitCLEtBQXZCO0FBQ0g7O0FBR0QsWUFBSSxDQUFDSCxPQUFPN0Isb0JBQVIsSUFBZ0M2QixPQUFPNUIsYUFBUCxDQUFxQnNCLE9BQXJCLENBQTZCTSxPQUFPOUIsbUJBQXBDLElBQTJELENBQS9GLEVBQWtHO0FBQzlGOEIsbUJBQU85QixtQkFBUCxHQUE2QixDQUE3QjtBQUNIOztBQUVEOEIsZUFBTy9DLFlBQVAsR0FBc0IrQyxPQUFPOUIsbUJBQTdCOztBQUVBLFlBQUksQ0FBQzhCLE9BQU9DLFdBQVosRUFBeUI7QUFDckIsbUJBQU9ELE9BQU9DLFdBQWQ7QUFDSDs7QUFFRCxZQUFNYyxpQkFBaUJmLE9BQU9wRCxRQUE5QjtBQUNBLFlBQUksQ0FBQ21FLGNBQUwsRUFBcUI7QUFDakIsZ0JBQU1DLE1BQU1ULHFCQUFFVSxJQUFGLENBQU9qQixNQUFQLEVBQWUsQ0FDdkIsT0FEdUIsRUFFdkIsYUFGdUIsRUFHdkIsTUFIdUIsRUFJdkIsU0FKdUIsRUFLdkIsT0FMdUIsRUFNdkIsTUFOdUIsRUFPdkIsU0FQdUIsRUFRdkIsUUFSdUIsRUFTdkIsU0FUdUIsRUFVdkIsVUFWdUIsRUFXdkIsTUFYdUIsRUFZdkIsYUFadUIsRUFhdkIsUUFidUIsQ0FBZixDQUFaOztBQWdCQUEsbUJBQU9wRCxRQUFQLEdBQWtCLENBQUVvRSxHQUFGLENBQWxCO0FBQ0gsU0FsQkQsTUFrQk8sSUFBSVQscUJBQUVGLE9BQUYsQ0FBVVUsZUFBZW5FLFFBQXpCLENBQUosRUFBd0M7QUFDM0NvRCxtQkFBT2tCLFFBQVAsR0FBa0JILGNBQWxCO0FBQ0FmLG1CQUFPcEQsUUFBUCxHQUFrQm1FLGVBQWVuRSxRQUFqQztBQUNIOztBQUVELGVBQU9vRCxPQUFPbUIsUUFBZDtBQUNBLGVBQU9uQixNQUFQO0FBQ0gsS0E3SEQ7QUE4SEF2SCxzQkFBa0JDLEdBQWxCLENBQXNCLHNCQUF0QixFQUE4Q29ELE9BQTlDO0FBQ0EsUUFBSWtFLFNBQVNoQyxxQkFBcUJsQyxPQUFyQixDQUFiOztBQUVBLFFBQUltRSxjQUFjRCxPQUFPQyxXQUFQLElBQXNCLE1BQXhDO0FBQ0EsUUFBSW1CLFFBQVFwQixPQUFPb0IsS0FBbkI7QUFDQSxRQUFJbEQsc0JBQXNCOEIsT0FBTzlCLG1CQUFQLElBQThCLENBQXhEO0FBQ0EsUUFBSW1ELFFBQVFyQixPQUFPcUIsS0FBbkI7QUFDQSxRQUFJbEQsdUJBQXVCNkIsT0FBTzdCLG9CQUFQLElBQStCLElBQTFEO0FBQ0EsUUFBSUMsZ0JBQWdCNEIsT0FBTzVCLGFBQVAsSUFBd0IsQ0FBQyxHQUFELEVBQU0sQ0FBTixFQUFTLElBQVQsRUFBZSxHQUFmLEVBQW9CLENBQXBCLENBQTVDO0FBQ0EsUUFBSXhCLFdBQVdvRCxPQUFPcEQsUUFBUCxJQUFtQixFQUFsQztBQUNBLFFBQUkwRSxlQUFldEIsT0FBT3NCLFlBQVAsSUFBdUIsRUFBMUM7QUFDQSxRQUFJQyxTQUFTdkIsT0FBT3VCLE1BQVAsSUFBaUIsS0FBOUI7QUFDQSxRQUFJQyxhQUFheEIsT0FBT3dCLFVBQVAsSUFBcUIsU0FBdEM7O0FBSUEsUUFBTWhKLE9BQU8sRUFBYjtBQUNBQSxTQUFLMEQsU0FBTCxHQUFpQixZQUFNO0FBQUMsZUFBTzhELE1BQVA7QUFBZSxLQUF2Qzs7QUFFQXhILFNBQUtpSixjQUFMLEdBQXFCLFlBQUk7QUFBQyxlQUFPeEIsV0FBUDtBQUFvQixLQUE5QztBQUNBekgsU0FBS2tKLGNBQUwsR0FBcUIsVUFBQ0MsWUFBRCxFQUFnQjtBQUFDMUIsc0JBQWMwQixZQUFkO0FBQTRCLEtBQWxFOztBQUVBbkosU0FBS3VELE9BQUwsR0FBYyxZQUFJO0FBQUMsZUFBT3FGLEtBQVA7QUFBYyxLQUFqQzs7QUFFQTVJLFNBQUtvSixzQkFBTCxHQUE2QixZQUFJO0FBQUMsZUFBTzFELG1CQUFQO0FBQTRCLEtBQTlEO0FBQ0ExRixTQUFLMEUsc0JBQUwsR0FBNkIsVUFBQ0QsWUFBRCxFQUFnQjtBQUFDaUIsOEJBQXNCakIsWUFBdEIsQ0FBb0MsT0FBT0EsWUFBUDtBQUFxQixLQUF2Rzs7QUFFQXpFLFNBQUtrQixlQUFMLEdBQXVCLFlBQU07QUFBQyxlQUFPNEgsWUFBUDtBQUFxQixLQUFuRDtBQUNBOUksU0FBS3FKLGVBQUwsR0FBdUIsVUFBQ0MsUUFBRCxFQUFjO0FBQUNSLHVCQUFlUSxRQUFmO0FBQXlCLEtBQS9EOztBQUVBdEosU0FBS3VKLGdCQUFMLEdBQXVCLFlBQUk7QUFBQyxlQUFPM0QsYUFBUDtBQUFzQixLQUFsRDtBQUNBNUYsU0FBS3dKLHNCQUFMLEdBQTZCLFlBQUk7QUFBQyxlQUFPN0Qsb0JBQVA7QUFBNkIsS0FBL0Q7O0FBRUEzRixTQUFLcUIsV0FBTCxHQUFrQixZQUFJO0FBQUMsZUFBTytDLFFBQVA7QUFBaUIsS0FBeEM7QUFDQXBFLFNBQUt5RCxXQUFMLEdBQWtCLFVBQUNnRyxTQUFELEVBQWM7QUFDNUIsWUFBRzFCLHFCQUFFRixPQUFGLENBQVU0QixTQUFWLENBQUgsRUFBd0I7QUFDcEJyRix1QkFBV3FGLFNBQVg7QUFDSCxTQUZELE1BRUs7QUFDRHJGLHVCQUFXLENBQUNxRixTQUFELENBQVg7QUFDSDtBQUNELGVBQU9yRixRQUFQO0FBQ0gsS0FQRDs7QUFTQXBFLFNBQUswSixRQUFMLEdBQWUsWUFBSTtBQUFDLGVBQU9YLE1BQVA7QUFBZSxLQUFuQzs7QUFFQS9JLFNBQUsySixhQUFMLEdBQW9CLFlBQUk7QUFBQyxlQUFPWCxVQUFQO0FBQW1CLEtBQTVDOztBQUVBLFdBQU9oSixJQUFQO0FBQ0gsQ0FoTEQ7O2tCQWtMZXVGLFk7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekxmOzs7O0FBSUE7Ozs7OztBQU1BLElBQU1xRSxlQUFlLFNBQWZBLFlBQWUsQ0FBU0MsTUFBVCxFQUFnQjtBQUNqQyxRQUFJN0osT0FBTzZKLE1BQVg7QUFDQSxRQUFJQyxVQUFTLEVBQWI7O0FBRUEsUUFBTUMsZ0JBQWdCLFNBQWhCQSxhQUFnQixDQUFTQyxNQUFULEVBQWlCQyxJQUFqQixFQUF1QkMsT0FBdkIsRUFBK0I7QUFDakQsWUFBSW5KLElBQUksQ0FBUjtBQUNBLFlBQUlDLFNBQVNnSixPQUFPaEosTUFBcEI7QUFDQSxhQUFJRCxJQUFJLENBQVIsRUFBV0EsSUFBSUMsTUFBZixFQUF1QkQsR0FBdkIsRUFBNEI7QUFDeEIsZ0JBQUlvSixRQUFRSCxPQUFPakosQ0FBUCxDQUFaO0FBQ0FvSixrQkFBTUMsUUFBTixDQUFlQyxLQUFmLENBQXdCRixNQUFNRCxPQUFOLElBQWlCQSxPQUF6QyxFQUFvREQsSUFBcEQ7QUFDSDtBQUNKLEtBUEQ7O0FBU0FqSyxTQUFLNkIsRUFBTCxHQUFVLFVBQVNDLElBQVQsRUFBZXNJLFFBQWYsRUFBeUJGLE9BQXpCLEVBQWlDO0FBQ3ZDLFNBQUNKLFFBQVFoSSxJQUFSLE1BQWtCZ0ksUUFBUWhJLElBQVIsSUFBYyxFQUFoQyxDQUFELEVBQXVDdUcsSUFBdkMsQ0FBNEMsRUFBRStCLFVBQVVBLFFBQVosRUFBd0JGLFNBQVVBLE9BQWxDLEVBQTVDO0FBQ0EsZUFBT2xLLElBQVA7QUFDSCxLQUhEO0FBSUFBLFNBQUtnQyxPQUFMLEdBQWUsVUFBU0YsSUFBVCxFQUFjO0FBQ3pCLFlBQUcsQ0FBQ2dJLE9BQUosRUFBWTtBQUNSLG1CQUFPLEtBQVA7QUFDSDtBQUNELFlBQU1HLE9BQU8sR0FBR25ELEtBQUgsQ0FBU3dELElBQVQsQ0FBY0MsU0FBZCxFQUF5QixDQUF6QixDQUFiO0FBQ0EsWUFBTVAsU0FBU0YsUUFBUWhJLElBQVIsQ0FBZjtBQUNBLFlBQU0wSSxZQUFZVixRQUFRVyxHQUExQjs7QUFFQSxZQUFHVCxNQUFILEVBQVU7QUFDTkQsMEJBQWNDLE1BQWQsRUFBc0JDLElBQXRCLEVBQTRCakssSUFBNUI7QUFDSDtBQUNELFlBQUd3SyxTQUFILEVBQWE7QUFDVFQsMEJBQWNTLFNBQWQsRUFBeUJELFNBQXpCLEVBQW9DdkssSUFBcEM7QUFDSDtBQUNKLEtBZEQ7QUFlQUEsU0FBS3NGLEdBQUwsR0FBVyxVQUFTeEQsSUFBVCxFQUFlc0ksUUFBZixFQUF5QkYsT0FBekIsRUFBaUM7QUFDeEMsWUFBRyxDQUFDSixPQUFKLEVBQVk7QUFDUixtQkFBTyxLQUFQO0FBQ0g7O0FBRUQsWUFBSSxDQUFDaEksSUFBRCxJQUFTLENBQUNzSSxRQUFWLElBQXNCLENBQUNGLE9BQTNCLEVBQXFDO0FBQ2pDSixzQkFBVSxFQUFWO0FBQ0EsbUJBQU85SixJQUFQO0FBQ0g7O0FBRUQsWUFBTTBLLFFBQVE1SSxPQUFPLENBQUNBLElBQUQsQ0FBUCxHQUFnQjJFLE9BQU9DLElBQVAsQ0FBWW9ELE9BQVosQ0FBOUI7QUFDQSxhQUFLLElBQUkvSSxJQUFJLENBQVIsRUFBVzRKLElBQUlELE1BQU0xSixNQUExQixFQUFrQ0QsSUFBSTRKLENBQXRDLEVBQXlDNUosR0FBekMsRUFBOEM7QUFDMUNlLG1CQUFPNEksTUFBTTNKLENBQU4sQ0FBUDtBQUNBLGdCQUFNaUosU0FBU0YsUUFBUWhJLElBQVIsQ0FBZjtBQUNBLGdCQUFJa0ksTUFBSixFQUFZO0FBQ1Isb0JBQU1ZLFNBQVNkLFFBQVFoSSxJQUFSLElBQWdCLEVBQS9CO0FBQ0Esb0JBQUlzSSxZQUFhRixPQUFqQixFQUEwQjtBQUN0Qix5QkFBSyxJQUFJVyxJQUFJLENBQVIsRUFBV0MsSUFBSWQsT0FBT2hKLE1BQTNCLEVBQW1DNkosSUFBSUMsQ0FBdkMsRUFBMENELEdBQTFDLEVBQStDO0FBQzNDLDRCQUFNVixRQUFRSCxPQUFPYSxDQUFQLENBQWQ7QUFDQSw0QkFBS1QsWUFBWUEsYUFBYUQsTUFBTUMsUUFBL0IsSUFBMkNBLGFBQWFELE1BQU1DLFFBQU4sQ0FBZUEsUUFBdkUsSUFBb0ZBLGFBQWFELE1BQU1DLFFBQU4sQ0FBZVcsU0FBakgsSUFDR2IsV0FBV0EsWUFBWUMsTUFBTUQsT0FEcEMsRUFFRTtBQUNFVSxtQ0FBT3ZDLElBQVAsQ0FBWThCLEtBQVo7QUFDSDtBQUNKO0FBQ0o7QUFDRCxvQkFBSSxDQUFDUyxPQUFPNUosTUFBWixFQUFvQjtBQUNoQiwyQkFBTzhJLFFBQVFoSSxJQUFSLENBQVA7QUFDSDtBQUNKO0FBQ0o7QUFDRCxlQUFPOUIsSUFBUDtBQUNILEtBaENEO0FBaUNBQSxTQUFLZ0wsSUFBTCxHQUFZLFVBQVNsSixJQUFULEVBQWVzSSxRQUFmLEVBQXlCRixPQUF6QixFQUFpQztBQUN6QyxZQUFJZSxRQUFRLENBQVo7QUFDQSxZQUFNQyxlQUFlLFNBQWZBLFlBQWUsR0FBVztBQUM1QixnQkFBSUQsT0FBSixFQUFhO0FBQ1Q7QUFDSDtBQUNEakwsaUJBQUtzRixHQUFMLENBQVN4RCxJQUFULEVBQWVvSixZQUFmO0FBQ0FkLHFCQUFTQyxLQUFULENBQWVySyxJQUFmLEVBQXFCdUssU0FBckI7QUFDSCxTQU5EO0FBT0FXLHFCQUFhQyxTQUFiLEdBQXlCZixRQUF6QjtBQUNBLGVBQU9wSyxLQUFLNkIsRUFBTCxDQUFRQyxJQUFSLEVBQWNvSixZQUFkLEVBQTRCaEIsT0FBNUIsQ0FBUDtBQUNILEtBWEQ7O0FBYUEsV0FBT2xLLElBQVA7QUFDSCxDQS9FRDs7a0JBaUZlNEosWTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0ZmOzs7Ozs7QUFFQTs7Ozs7QUFLQSxJQUFNd0Isc0JBQXNCLFNBQXRCQSxtQkFBc0IsQ0FBVUMsUUFBVixFQUFvQkMsY0FBcEIsRUFBb0M7QUFDNUQsUUFBSUMsZUFBZSxFQUFuQjtBQUNBLFFBQUlDLHFCQUFxQixFQUF6QjtBQUNBLFFBQUlDLGNBQWMsS0FBbEI7QUFDQSxRQUFJekwsT0FBTyxFQUFYO0FBQ0FDLHNCQUFrQkMsR0FBbEIsQ0FBc0IsNkJBQXRCO0FBQ0FvTCxtQkFBZTNFLE9BQWYsQ0FBdUIsVUFBQytFLE9BQUQsRUFBYTtBQUNoQyxZQUFNQyxTQUFTTixTQUFTSyxPQUFULENBQWY7QUFDQUYsMkJBQW1CRSxPQUFuQixJQUE4QkMsVUFBVSxZQUFVLENBQUUsQ0FBcEQ7O0FBRUFOLGlCQUFTSyxPQUFULElBQW9CLFlBQVc7QUFDM0IsZ0JBQU16QixPQUFPckMsTUFBTWdFLFNBQU4sQ0FBZ0I5RSxLQUFoQixDQUFzQndELElBQXRCLENBQTJCQyxTQUEzQixFQUFzQyxDQUF0QyxDQUFiO0FBQ0UsZ0JBQUksQ0FBQ2tCLFdBQUwsRUFBa0I7QUFDaEI7QUFDQXpMLHFCQUFLNkwsUUFBTCxDQUFjSCxPQUFkLEVBQXVCekIsSUFBdkI7QUFDSCxhQUhDLE1BR0s7QUFDSDZCO0FBQ0Esb0JBQUlILE1BQUosRUFBWTtBQUNSQSwyQkFBT3RCLEtBQVAsQ0FBYXJLLElBQWIsRUFBbUJpSyxJQUFuQjtBQUNIO0FBQ0o7QUFDSixTQVhEO0FBWUgsS0FoQkQ7QUFpQkEsUUFBSTZCLHdCQUF3QixTQUF4QkEscUJBQXdCLEdBQVk7QUFDcEMsZUFBT1AsYUFBYXZLLE1BQWIsR0FBc0IsQ0FBN0IsRUFBZ0M7QUFBQSxzQ0FDRnVLLGFBQWFRLEtBQWIsRUFERTtBQUFBLGdCQUNwQkwsT0FEb0IsdUJBQ3BCQSxPQURvQjtBQUFBLGdCQUNYekIsSUFEVyx1QkFDWEEsSUFEVzs7QUFFNUIsYUFBQ3VCLG1CQUFtQkUsT0FBbkIsS0FBK0JMLFNBQVNLLE9BQVQsQ0FBaEMsRUFBbURyQixLQUFuRCxDQUF5RGdCLFFBQXpELEVBQW1FcEIsSUFBbkU7QUFDSDtBQUNKLEtBTEQ7O0FBT0FqSyxTQUFLZ00sY0FBTCxHQUFzQixVQUFDQyxJQUFELEVBQVU7QUFDNUJSLHNCQUFjUSxJQUFkO0FBQ0FoTSwwQkFBa0JDLEdBQWxCLENBQXNCLHdDQUF0QixFQUFnRStMLElBQWhFO0FBQ0gsS0FIRDtBQUlBak0sU0FBS2tNLHFCQUFMLEdBQTZCLFlBQVU7QUFDbkNqTSwwQkFBa0JDLEdBQWxCLENBQXNCLCtDQUF0QixFQUF1RXNMLGtCQUF2RTtBQUNBLGVBQU9BLGtCQUFQO0FBQ0gsS0FIRDtBQUlBeEwsU0FBS21NLFFBQUwsR0FBZ0IsWUFBVTtBQUN0QmxNLDBCQUFrQkMsR0FBbEIsQ0FBc0Isa0NBQXRCLEVBQTBEaU0sUUFBMUQ7QUFDQSxlQUFPWixZQUFQO0FBQ0gsS0FIRDtBQUlBdkwsU0FBSzZMLFFBQUwsR0FBZ0IsVUFBU0gsT0FBVCxFQUFrQnpCLElBQWxCLEVBQXVCO0FBQ25DaEssMEJBQWtCQyxHQUFsQixDQUFzQixrQ0FBdEIsRUFBMER3TCxPQUExRCxFQUFtRXpCLElBQW5FO0FBQ0FzQixxQkFBYWxELElBQWIsQ0FBa0IsRUFBRXFELGdCQUFGLEVBQVd6QixVQUFYLEVBQWxCO0FBQ0gsS0FIRDs7QUFLQWpLLFNBQUs0QyxLQUFMLEdBQWEsWUFBVTtBQUNuQjNDLDBCQUFrQkMsR0FBbEIsQ0FBc0IsK0JBQXRCO0FBQ0E0TDtBQUNILEtBSEQ7QUFJQTlMLFNBQUtvTSxLQUFMLEdBQWEsWUFBVztBQUNwQm5NLDBCQUFrQkMsR0FBbEIsQ0FBc0IsK0JBQXRCO0FBQ0FxTCxxQkFBYXZLLE1BQWIsR0FBc0IsQ0FBdEI7QUFDSCxLQUhEO0FBSUFoQixTQUFLc0YsR0FBTCxHQUFXLFlBQVc7QUFDbEJyRiwwQkFBa0JDLEdBQWxCLENBQXNCLDZCQUF0QjtBQUNBb0wsdUJBQWUzRSxPQUFmLENBQXVCLFVBQUMrRSxPQUFELEVBQWE7QUFDaEMsZ0JBQU1DLFNBQVNILG1CQUFtQkUsT0FBbkIsQ0FBZjtBQUNBLGdCQUFJQyxNQUFKLEVBQVk7QUFDUk4seUJBQVNLLE9BQVQsSUFBb0JDLE1BQXBCO0FBQ0EsdUJBQU9ILG1CQUFtQkUsT0FBbkIsQ0FBUDtBQUNIO0FBQ0osU0FORDtBQU9ILEtBVEQ7O0FBWUE7QUFDQTFMLFNBQUtvRCxtQkFBTCxHQUEyQixVQUFTaUosUUFBVCxFQUFrQjtBQUN6QyxZQUFJQyxtQkFBbUJ2RSxxQkFBRXdFLFNBQUYsQ0FBWWhCLFlBQVosRUFBMEIsRUFBQ0csU0FBVVcsUUFBWCxFQUExQixDQUF2QjtBQUNBcE0sMEJBQWtCQyxHQUFsQixDQUFzQiw2Q0FBdEIsRUFBcUVtTSxRQUFyRTtBQUNBZCxxQkFBYWlCLE1BQWIsQ0FBb0J6RSxxQkFBRTBFLFNBQUYsQ0FBWWxCLFlBQVosRUFBMEIsRUFBQ0csU0FBVVcsUUFBWCxFQUExQixDQUFwQixFQUFxRSxDQUFyRTs7QUFFQSxZQUFNVixTQUFTSCxtQkFBbUJhLFFBQW5CLENBQWY7QUFDQSxZQUFJVixNQUFKLEVBQVk7QUFDUjFMLDhCQUFrQkMsR0FBbEIsQ0FBc0IsaUJBQXRCO0FBQ0EsZ0JBQUdvTSxnQkFBSCxFQUFvQjtBQUNoQixpQkFBQ1gsVUFBU04sU0FBU2dCLFFBQVQsQ0FBVixFQUE4QmhDLEtBQTlCLENBQW9DZ0IsUUFBcEMsRUFBOENpQixpQkFBaUJyQyxJQUEvRDtBQUNIO0FBQ0RvQixxQkFBU2dCLFFBQVQsSUFBcUJWLE1BQXJCO0FBQ0EsbUJBQU9ILG1CQUFtQmEsUUFBbkIsQ0FBUDtBQUNIO0FBQ0osS0FkRDs7QUFnQkFyTSxTQUFLdUIsT0FBTCxHQUFlLFlBQVc7QUFDdEJ0QiwwQkFBa0JDLEdBQWxCLENBQXNCLGlDQUF0QjtBQUNBRixhQUFLc0YsR0FBTDtBQUNBdEYsYUFBS29NLEtBQUw7QUFDSCxLQUpEO0FBS0EsV0FBT3BNLElBQVA7QUFDSCxDQTFGRDs7a0JBNEZlb0wsbUI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25HZjs7QUFFQTs7Ozs7QUFLQSxJQUFNc0IsaUJBQWlCLFNBQWpCQSxjQUFpQixHQUFVO0FBQzdCLFFBQU0xTSxPQUFPLEVBQWI7QUFDQUMsc0JBQWtCQyxHQUFsQixDQUFzQix3QkFBdEI7QUFDQSxRQUFNeU0sY0FBYyxDQUNoQjtBQUNJN0ssY0FBTSxPQURWO0FBRUk4SyxzQkFBYyxzQkFBVUMsTUFBVixFQUFrQjtBQUM1QixnQkFBTUMsWUFBWTtBQUNkQyxxQkFBSyxXQURTO0FBRWRDLHFCQUFLLFdBRlM7QUFHZEMscUJBQUssV0FIUztBQUlkQyxxQkFBSyxXQUpTO0FBS2RDLHFCQUFLLFdBTFM7QUFNZEMscUJBQUssWUFOUztBQU9kQyxzQkFBTSxZQVBRO0FBUWRDLHFCQUFLLFdBUlM7QUFTZEMscUJBQUssV0FUUztBQVVkQyxxQkFBSyxXQVZTO0FBV2RDLHdCQUFRLFdBWE07QUFZZEMsc0JBQU0sWUFaUTtBQWFkQyxxQkFBSyxXQWJTO0FBY2RDLHNCQUFNLCtCQWRRO0FBZWRDLHFCQUFLLCtCQWZTO0FBZ0JkQyxxQkFBSztBQWhCUyxhQUFsQjs7QUFtQkEsZ0JBQU1DLFFBQVEsWUFBVTtBQUNwQix1QkFBT0MsU0FBU3ZNLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBUDtBQUNILGFBRmEsRUFBZDtBQUdBLGdCQUFJLENBQUNzTSxNQUFNRSxXQUFYLEVBQXdCO0FBQ3BCLHVCQUFPLEtBQVA7QUFDSDs7QUFFRCxnQkFBTUMsT0FBT3JCLE9BQU9xQixJQUFwQjtBQUNBLGdCQUFNQyxPQUFPdEIsT0FBT3NCLElBQXBCO0FBQ0EsZ0JBQUcsQ0FBQ0EsSUFBSixFQUFTO0FBQUMsdUJBQU8sS0FBUDtBQUFjO0FBQ3hCLGdCQUFNQyxXQUFXdkIsT0FBT3VCLFFBQVAsSUFBbUJ0QixVQUFVcUIsSUFBVixDQUFwQzs7QUFFQSxnQkFBSSx1QkFBT0QsSUFBUCxFQUFhQyxJQUFiLENBQUosRUFBd0I7QUFDcEIsdUJBQU8sS0FBUDtBQUNIOztBQUVELGdCQUFHLHlCQUFTRCxJQUFULEVBQWVDLElBQWYsQ0FBSCxFQUF3QjtBQUNwQix1QkFBTyxLQUFQO0FBQ0g7O0FBRUQsZ0JBQUksQ0FBQ0MsUUFBTCxFQUFlO0FBQ1gsdUJBQU8sS0FBUDtBQUNIOztBQUVELG1CQUFPLENBQUMsQ0FBQ0wsTUFBTUUsV0FBTixDQUFrQkcsUUFBbEIsQ0FBVDtBQUNIO0FBL0NMLEtBRGdCLEVBa0RoQjtBQUNJdE0sY0FBTSxRQURWO0FBRUk4SyxzQkFBYyxzQkFBVUMsTUFBVixFQUFrQjtBQUM1QixnQkFBTWtCLFFBQVEsWUFBVTtBQUNwQix1QkFBT0MsU0FBU3ZNLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBUDtBQUNILGFBRmEsRUFBZDtBQUdBLGdCQUFJLENBQUNzTSxNQUFNRSxXQUFYLEVBQXdCO0FBQ3BCLHVCQUFPLEtBQVA7QUFDSDs7QUFFRCxnQkFBTUMsT0FBT3JCLE9BQU9xQixJQUFwQjtBQUNBLGdCQUFNQyxPQUFPdEIsT0FBT3NCLElBQXBCOztBQUVBLGdCQUFHLHlCQUFTRCxJQUFULEVBQWVDLElBQWYsQ0FBSCxFQUF3QjtBQUNwQix1QkFBTyxJQUFQO0FBQ0gsYUFGRCxNQUVLO0FBQ0QsdUJBQU8sS0FBUDtBQUNIO0FBQ0o7QUFsQkwsS0FsRGdCLEVBc0VoQjtBQUNJck0sY0FBTSxNQURWO0FBRUk4SyxzQkFBYyxzQkFBVUMsTUFBVixFQUFrQjtBQUM1QixnQkFBTXFCLE9BQU9yQixPQUFPcUIsSUFBcEI7O0FBRUE7QUFDQSxnQkFBTUMsT0FBT3RCLE9BQU9zQixJQUFwQjtBQUNBLGdCQUFJLHVCQUFPRCxJQUFQLEVBQWFDLElBQWIsQ0FBSixFQUF3QjtBQUNwQix1QkFBTyxJQUFQO0FBQ0gsYUFGRCxNQUVLO0FBQ0QsdUJBQU8sS0FBUDtBQUNIO0FBQ0o7QUFaTCxLQXRFZ0IsRUFvRmhCO0FBQ0lyTSxjQUFNLEtBRFY7QUFFSThLLHNCQUFjLHNCQUFVQyxNQUFWLEVBQWtCO0FBQzVCLGdCQUFNa0IsUUFBUSxZQUFVO0FBQ3BCLHVCQUFPQyxTQUFTdk0sYUFBVCxDQUF1QixPQUF2QixDQUFQO0FBQ0gsYUFGYSxFQUFkOztBQUlBO0FBQ0EsZ0JBQU00TSxlQUFlLFNBQWZBLFlBQWUsR0FBSztBQUNyQix5QkFBU0MsY0FBVCxHQUEwQjtBQUN2Qix3QkFBSSxPQUFPQyxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO0FBQy9CLCtCQUFPQSxPQUFPQyxXQUFQLElBQXNCRCxPQUFPRSxpQkFBcEM7QUFDSDtBQUNKO0FBQ0Qsb0JBQUlDLGNBQWNKLGdCQUFsQjtBQUNBLG9CQUFJSyxlQUFlSixPQUFPSyxZQUFQLElBQXVCTCxPQUFPTSxrQkFBakQ7QUFDQSxvQkFBSUMsa0JBQWtCSixlQUFlLE9BQU9BLFlBQVlJLGVBQW5CLEtBQXVDLFVBQXRELElBQW9FSixZQUFZSSxlQUFaLENBQTRCLDJDQUE1QixDQUExRjs7QUFFQTtBQUNBO0FBQ0Esb0JBQUlDLHVCQUF1QixDQUFDSixZQUFELElBQWlCQSxhQUFhL0MsU0FBYixJQUEwQixPQUFPK0MsYUFBYS9DLFNBQWIsQ0FBdUJvRCxZQUE5QixLQUErQyxVQUF6RSxJQUF1RixPQUFPTCxhQUFhL0MsU0FBYixDQUF1QnhHLE1BQTlCLEtBQXlDLFVBQTVLO0FBQ0EsdUJBQU8sQ0FBQyxDQUFDMEosZUFBRixJQUFxQixDQUFDLENBQUNDLG9CQUE5QjtBQUNILGFBZEQ7QUFlQTtBQUNBLG1CQUFPVixrQkFBa0IsQ0FBQyxDQUFDTixNQUFNRSxXQUFOLENBQWtCLCtCQUFsQixDQUEzQjtBQUNIO0FBekJMLEtBcEZnQixDQUFwQjs7QUFpSEFqTyxTQUFLaVAsd0JBQUwsR0FBZ0MsVUFBQ0MsT0FBRCxFQUFhO0FBQ3pDalAsMEJBQWtCQyxHQUFsQixDQUFzQiw2Q0FBdEIsRUFBcUVnUCxPQUFyRTtBQUNBLFlBQU1yQyxTQUFVcUMsWUFBWXpJLE9BQU95SSxPQUFQLENBQWIsR0FBZ0NBLE9BQWhDLEdBQTBDLEVBQXpEO0FBQ0EsYUFBSSxJQUFJbk8sSUFBSSxDQUFaLEVBQWVBLElBQUk0TCxZQUFZM0wsTUFBL0IsRUFBdUNELEdBQXZDLEVBQTRDO0FBQ3hDLGdCQUFHNEwsWUFBWTVMLENBQVosRUFBZTZMLFlBQWYsQ0FBNEJDLE1BQTVCLENBQUgsRUFBdUM7QUFDbkMsdUJBQU9GLFlBQVk1TCxDQUFaLEVBQWVlLElBQXRCO0FBQ0g7QUFDSjtBQUNKLEtBUkQ7QUFTQTlCLFNBQUttUCwyQkFBTCxHQUFtQyxVQUFDMUYsU0FBRCxFQUFlO0FBQzlDeEosMEJBQWtCQyxHQUFsQixDQUFzQixnREFBdEIsRUFBd0V1SixTQUF4RTtBQUNBLFlBQUkyRixlQUFlLEVBQW5CO0FBQ0EsYUFBSyxJQUFJck8sSUFBSTBJLFVBQVV6SSxNQUF2QixFQUErQkQsR0FBL0IsR0FBcUM7QUFDakMsZ0JBQU1zTyxPQUFPNUYsVUFBVTFJLENBQVYsQ0FBYjtBQUNBLGdCQUFJOEwsU0FBUyxFQUFiO0FBQ0EsaUJBQUksSUFBSWhDLElBQUksQ0FBWixFQUFlQSxJQUFJd0UsS0FBS3hPLE9BQUwsQ0FBYUcsTUFBaEMsRUFBd0M2SixHQUF4QyxFQUE2QztBQUN6Q2dDLHlCQUFTd0MsS0FBS3hPLE9BQUwsQ0FBYWdLLENBQWIsQ0FBVDtBQUNBLG9CQUFJZ0MsTUFBSixFQUFZO0FBQ1Isd0JBQU15QyxZQUFZdFAsS0FBS2lQLHdCQUFMLENBQThCcEMsTUFBOUIsQ0FBbEI7QUFDQSx3QkFBSXlDLFNBQUosRUFBZTtBQUNYRixxQ0FBYS9HLElBQWIsQ0FBa0JpSCxTQUFsQjtBQUNIO0FBQ0o7QUFDSjtBQUdKOztBQUVELGVBQU9GLFlBQVA7QUFDSCxLQXBCRDtBQXFCQSxXQUFPcFAsSUFBUDtBQUNILENBbkpEOztrQkFxSmUwTSxjOzs7Ozs7Ozs7Ozs7Ozs7OztBQzVKZjtBQUNPLElBQU02Qyw0Q0FBa0IsV0FBeEI7QUFDQSxJQUFNQyxrQ0FBYSxNQUFuQjtBQUNBLElBQU1DLDBDQUFpQixVQUF2QjtBQUNBLElBQU1DLHNDQUFlLFFBQXJCO0FBQ0EsSUFBTUMsd0NBQWdCLFNBQXRCO0FBQ0EsSUFBTUMsb0NBQWMsT0FBcEI7QUFDQSxJQUFNQyx3Q0FBZ0IsU0FBdEI7QUFDQSxJQUFNQyx3Q0FBZ0IsU0FBdEI7O0FBRVA7QUFDTyxJQUFNQywwQ0FBaUIsT0FBdkI7QUFDQSxJQUFNQyw0Q0FBa0IsUUFBeEI7QUFDQSxJQUFNQyx3Q0FBZ0IsTUFBdEI7QUFDQSxJQUFNQyxzQ0FBZSxLQUFyQjs7QUFFUDtBQUNPLElBQU1DLDhDQUFtQlYsY0FBekI7QUFDQSxJQUFNNU0sd0JBQVEsT0FBZDtBQUNBLElBQU13Qyw0QkFBVSxTQUFoQjtBQUNBLElBQU0rSyxzQ0FBZSxNQUFyQjtBQUNBLElBQU1DLG9EQUFzQixZQUE1QjtBQUNBLElBQU1DLHdDQUFnQixjQUF0QjtBQUNBLElBQU1DLDBDQUFpQixRQUF2QjtBQUNBLElBQU1DLDBDQUFpQixRQUF2QjtBQUNBLElBQU1uTyxnREFBb0IsaUJBQTFCO0FBQ0EsSUFBTUosd0JBQVEsT0FBZDs7QUFFUDtBQUNPLElBQU13TyxzQ0FBZSxjQUFyQjtBQUNBLElBQU1DLDRDQUFrQmpCLGNBQXhCO0FBQ0EsSUFBTWtCLHNDQUFlLE9BQXJCO0FBQ0EsSUFBTUMsb0NBQWMsTUFBcEI7O0FBRUEsSUFBTUMsMENBQWlCLGVBQXZCO0FBQ0EsSUFBTUMsc0NBQWUsTUFBckI7QUFDQSxJQUFNQyxvREFBc0IsWUFBNUI7QUFDQSxJQUFNQywwQ0FBaUIsZUFBdkI7QUFDQSxJQUFNQyxzQ0FBZSxNQUFyQjtBQUNBLElBQU1DLHNDQUFlLGFBQXJCO0FBQ0EsSUFBTUMsMENBQWlCLHFCQUF2QjtBQUNBLElBQU1DLHdEQUF3Qiw0QkFBOUI7QUFDQSxJQUFNQyx3REFBd0IscUJBQTlCO0FBQ0EsSUFBTUMsb0VBQThCLFlBQXBDO0FBQ0EsSUFBTUMsNERBQTBCLGdCQUFoQzs7QUFHQSxJQUFNdE8sa0NBQWEsR0FBbkI7QUFDQSxJQUFNdU8sc0RBQXVCLEdBQTdCO0FBQ0EsSUFBTUMsMEVBQWlDLEdBQXZDO0FBQ0EsSUFBTUMsc0VBQStCLEdBQXJDO0FBQ0EsSUFBTUMsb0VBQThCLEdBQXBDO0FBQ0EsSUFBTXhQLGdEQUFvQixHQUExQjtBQUNBLElBQU15UCxzREFBdUIsR0FBN0I7QUFDQSxJQUFNQywwREFBeUIsR0FBL0I7QUFDQSxJQUFNQyw0REFBMEIsR0FBaEM7QUFDQSxJQUFNQyxzRkFBdUMsR0FBN0M7QUFDQSxJQUFNQyxvRkFBc0MsR0FBNUM7QUFDQSxJQUFNQyxnRkFBb0MsR0FBMUM7QUFDQSxJQUFNQyxrRkFBcUMsR0FBM0M7QUFDQSxJQUFNQyxrRUFBNkIsR0FBbkMsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1RFA7Ozs7OztBQU1BLElBQU1DLFVBQVUsU0FBVkEsT0FBVSxDQUFTdFMsU0FBVCxFQUFtQjtBQUMvQixRQUFNRSxPQUFPLEVBQWI7QUFDQSxRQUFJcVMsZUFBZSxFQUFuQjtBQUNBcFMsc0JBQWtCQyxHQUFsQixDQUFzQixzQkFBdEI7QUFDQSxRQUFNb1MscUJBQXFCLFNBQXJCQSxrQkFBcUIsR0FBVTs7QUFFakNELHVCQUFlckUsU0FBU3ZNLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBZjtBQUNBNFEscUJBQWFFLFlBQWIsQ0FBMEIsdUJBQTFCLEVBQW1ELEVBQW5EO0FBQ0FGLHFCQUFhRSxZQUFiLENBQTBCLG9CQUExQixFQUFnRCxFQUFoRDtBQUNBRixxQkFBYUUsWUFBYixDQUEwQixhQUExQixFQUF5QyxFQUF6QztBQUNBelMsa0JBQVUwUyxXQUFWLENBQXNCSCxZQUF0Qjs7QUFFQSxlQUFPQSxZQUFQO0FBQ0gsS0FURDs7QUFXQXJTLFNBQUt5QixhQUFMLEdBQXFCLFlBQUs7QUFDdEJ4QiwwQkFBa0JDLEdBQWxCLENBQXNCLDhCQUF0QjtBQUNBLFlBQUcsQ0FBQ21TLFlBQUosRUFBaUI7QUFDYixtQkFBT0Msb0JBQVA7QUFDSCxTQUZELE1BRUs7QUFDRHhTLHNCQUFVMlMsV0FBVixDQUFzQkosWUFBdEI7QUFDQSxtQkFBT0Msb0JBQVA7QUFDSDtBQUNKLEtBUkQ7O0FBVUEsV0FBT3RTLElBQVA7QUFDSCxDQTFCRDs7a0JBNEJlb1MsTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQ2Y7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUE7Ozs7O0FBS0EsSUFBTUEsVUFBVSxTQUFWQSxPQUFVLEdBQVU7QUFDdEIsUUFBTXBTLE9BQU8sRUFBYjtBQUNBLFFBQUkwUyxrQkFBa0IsRUFBdEI7QUFDQSxRQUFJQyxpQkFBaUIsK0JBQXJCOztBQUVBMVMsc0JBQWtCQyxHQUFsQixDQUFzQix5QkFBdEI7O0FBRUEsUUFBTTBTLG1CQUFtQixTQUFuQkEsZ0JBQW1CLENBQVNDLE9BQVQsRUFBaUI7QUFDdEMsWUFBSSxDQUFDQSxPQUFELElBQVksQ0FBQ0EsUUFBUTNFLElBQVQsSUFBaUIsRUFBRTJFLFFBQVFDLElBQVIsSUFBZ0JELFFBQVFFLFdBQXhCLElBQXVDRixRQUFRRyxNQUFqRCxDQUFqQyxFQUEyRjtBQUN2RjtBQUNIOztBQUVELFlBQUluRyxTQUFTLFNBQWMsRUFBZCxFQUFrQixFQUFFLFdBQVcsS0FBYixFQUFsQixFQUF3Q2dHLE9BQXhDLENBQWI7QUFDQWhHLGVBQU9xQixJQUFQLEdBQWMsbUJBQUssS0FBS3JCLE9BQU9xQixJQUFqQixDQUFkOztBQUVBLFlBQUdyQixPQUFPaUcsSUFBUCxJQUFlakcsT0FBT2tHLFdBQXRCLElBQXFDbEcsT0FBT21HLE1BQS9DLEVBQXNEO0FBQ2xEbkcsbUJBQU9xQixJQUFQLEdBQWNyQixPQUFPaUcsSUFBUCxHQUFjLEdBQWQsR0FBb0JqRyxPQUFPa0csV0FBM0IsR0FBeUMsVUFBekMsR0FBc0RsRyxPQUFPbUcsTUFBM0U7QUFDQSxtQkFBT25HLE9BQU9pRyxJQUFkO0FBQ0EsbUJBQU9qRyxPQUFPa0csV0FBZDtBQUNBLG1CQUFPbEcsT0FBT21HLE1BQWQ7QUFDSDs7QUFFRCxZQUFNQyxnQkFBZ0IseUJBQXRCOztBQUVBLFlBQUlBLGNBQWM5TCxJQUFkLENBQW1CMEYsT0FBT3NCLElBQTFCLENBQUosRUFBcUM7QUFDakM7QUFDQXRCLG1CQUFPdUIsUUFBUCxHQUFrQnZCLE9BQU9zQixJQUF6QjtBQUNBdEIsbUJBQU9zQixJQUFQLEdBQWN0QixPQUFPc0IsSUFBUCxDQUFZK0UsT0FBWixDQUFvQkQsYUFBcEIsRUFBbUMsSUFBbkMsQ0FBZDtBQUNIOztBQUVELFlBQUcsdUJBQU9wRyxPQUFPcUIsSUFBZCxDQUFILEVBQXVCO0FBQ25CckIsbUJBQU9zQixJQUFQLEdBQWMsTUFBZDtBQUNILFNBRkQsTUFFTSxJQUFHLHlCQUFTdEIsT0FBT3FCLElBQWhCLENBQUgsRUFBeUI7QUFDM0JyQixtQkFBT3NCLElBQVAsR0FBYyxRQUFkO0FBQ0gsU0FGSyxNQUVBLElBQUcsdUJBQU90QixPQUFPcUIsSUFBZCxFQUFvQnJCLE9BQU9zQixJQUEzQixDQUFILEVBQW9DO0FBQ3RDdEIsbUJBQU9zQixJQUFQLEdBQWMsTUFBZDtBQUNILFNBRkssTUFFQSxJQUFJLENBQUN0QixPQUFPc0IsSUFBWixFQUFrQjtBQUNwQnRCLG1CQUFPc0IsSUFBUCxHQUFjLCtCQUFpQnRCLE9BQU9xQixJQUF4QixDQUFkO0FBQ0g7O0FBRUQsWUFBSSxDQUFDckIsT0FBT3NCLElBQVosRUFBa0I7QUFDZDtBQUNIOztBQUVEO0FBQ0EsZ0JBQVF0QixPQUFPc0IsSUFBZjtBQUNJLGlCQUFLLE1BQUw7QUFDQSxpQkFBSyxtQkFBTDtBQUNJdEIsdUJBQU9zQixJQUFQLEdBQWMsS0FBZDtBQUNBO0FBQ0osaUJBQUssS0FBTDtBQUNJdEIsdUJBQU9zQixJQUFQLEdBQWMsS0FBZDtBQUNBO0FBQ0osaUJBQUssTUFBTDtBQUNJdEIsdUJBQU9zQixJQUFQLEdBQWMsTUFBZDtBQUNBO0FBQ0o7QUFDSTtBQVpSO0FBY0ExSCxlQUFPQyxJQUFQLENBQVltRyxNQUFaLEVBQW9CbEcsT0FBcEIsQ0FBNEIsVUFBU0MsR0FBVCxFQUFjO0FBQ3RDLGdCQUFJaUcsT0FBT2pHLEdBQVAsTUFBZ0IsRUFBcEIsRUFBd0I7QUFDcEIsdUJBQU9pRyxPQUFPakcsR0FBUCxDQUFQO0FBQ0g7QUFDSixTQUpEOztBQU1BLGVBQU9pRyxNQUFQO0FBRUgsS0E1REQ7O0FBOERBN00sU0FBS3lELFdBQUwsR0FBa0IsVUFBQ1csUUFBRCxFQUFhO0FBQzNCbkUsMEJBQWtCQyxHQUFsQixDQUFzQixnQ0FBdEIsRUFBd0RrRSxRQUF4RDtBQUNBLFlBQU0rTyxtQkFBbUIsQ0FBQ3BMLHFCQUFFRixPQUFGLENBQVV6RCxRQUFWLElBQXNCQSxRQUF0QixHQUFpQyxDQUFDQSxRQUFELENBQWxDLEVBQThDOEQsR0FBOUMsQ0FBa0QsVUFBU21ILElBQVQsRUFBYztBQUNyRixnQkFBRyxDQUFDdEgscUJBQUVGLE9BQUYsQ0FBVXdILEtBQUsrRCxNQUFmLENBQUosRUFBNEI7QUFDeEIsdUJBQU8vRCxLQUFLK0QsTUFBWjtBQUNIO0FBQ0QsZ0JBQUlDLGVBQWUsU0FBYyxFQUFkLEVBQWlCO0FBQ2hDeFMseUJBQVMsRUFEdUI7QUFFaEN1Uyx3QkFBUTtBQUZ3QixhQUFqQixFQUdoQi9ELElBSGdCLENBQW5COztBQUtBLGdCQUFJZ0UsYUFBYXhTLE9BQWIsS0FBeUI0RixPQUFPNE0sYUFBYXhTLE9BQXBCLENBQTFCLElBQTJELENBQUNrSCxxQkFBRUYsT0FBRixDQUFVd0wsYUFBYXhTLE9BQXZCLENBQS9ELEVBQWdHO0FBQzVGd1MsNkJBQWF4UyxPQUFiLEdBQXVCLENBQUMrUixpQkFBaUJTLGFBQWF4UyxPQUE5QixDQUFELENBQXZCO0FBQ0g7O0FBRUQsZ0JBQUcsQ0FBQ2tILHFCQUFFRixPQUFGLENBQVV3TCxhQUFheFMsT0FBdkIsQ0FBRCxJQUFvQ3dTLGFBQWF4UyxPQUFiLENBQXFCRyxNQUFyQixLQUFnQyxDQUF2RSxFQUEwRTtBQUN0RSxvQkFBSXFPLEtBQUtpRSxNQUFULEVBQWlCO0FBQ2JELGlDQUFheFMsT0FBYixHQUF1QndPLEtBQUtpRSxNQUE1QjtBQUNILGlCQUZELE1BRU87QUFDSEQsaUNBQWF4UyxPQUFiLEdBQXVCLENBQUMrUixpQkFBaUJ2RCxJQUFqQixDQUFELENBQXZCO0FBQ0g7QUFDSjs7QUFHRCxpQkFBSSxJQUFJdE8sSUFBSSxDQUFaLEVBQWVBLElBQUlzUyxhQUFheFMsT0FBYixDQUFxQkcsTUFBeEMsRUFBZ0RELEdBQWhELEVBQXFEO0FBQ2pELG9CQUFJOEwsU0FBU3dHLGFBQWF4UyxPQUFiLENBQXFCRSxDQUFyQixDQUFiO0FBQ0Esb0JBQUl3UyxlQUFlLEVBQW5CO0FBQ0Esb0JBQUksQ0FBQzFHLE1BQUwsRUFBYTtBQUNUO0FBQ0g7O0FBRUQsb0JBQUkyRyxnQkFBZ0IzRyxPQUFPNUwsT0FBM0I7QUFDQSxvQkFBSXVTLGFBQUosRUFBbUI7QUFDZjNHLDJCQUFPNUwsT0FBUCxHQUFrQnVTLGNBQWN2TSxRQUFkLE9BQTZCLE1BQS9DO0FBQ0gsaUJBRkQsTUFFTztBQUNINEYsMkJBQU81TCxPQUFQLEdBQWlCLEtBQWpCO0FBQ0g7O0FBRUQ7QUFDQSxvQkFBSSxDQUFDb1MsYUFBYXhTLE9BQWIsQ0FBcUJFLENBQXJCLEVBQXdCSSxLQUE3QixFQUFvQztBQUNoQ2tTLGlDQUFheFMsT0FBYixDQUFxQkUsQ0FBckIsRUFBd0JJLEtBQXhCLEdBQWdDa1MsYUFBYXhTLE9BQWIsQ0FBcUJFLENBQXJCLEVBQXdCb04sSUFBeEIsR0FBNkIsR0FBN0IsR0FBaUNwTixFQUFFa0csUUFBRixFQUFqRTtBQUNIOztBQUVEc00sK0JBQWVYLGlCQUFpQlMsYUFBYXhTLE9BQWIsQ0FBcUJFLENBQXJCLENBQWpCLENBQWY7QUFDQSxvQkFBRzRSLGVBQWUxRCx3QkFBZixDQUF3Q3NFLFlBQXhDLENBQUgsRUFBeUQ7QUFDckRGLGlDQUFheFMsT0FBYixDQUFxQkUsQ0FBckIsSUFBMEJ3UyxZQUExQjtBQUNILGlCQUZELE1BRUs7QUFDREYsaUNBQWF4UyxPQUFiLENBQXFCRSxDQUFyQixJQUEwQixJQUExQjtBQUNIO0FBQ0o7O0FBRURzUyx5QkFBYXhTLE9BQWIsR0FBdUJ3UyxhQUFheFMsT0FBYixDQUFxQmlILE1BQXJCLENBQTRCO0FBQUEsdUJBQVUsQ0FBQyxDQUFDK0UsTUFBWjtBQUFBLGFBQTVCLENBQXZCOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQVdBLGdCQUFHLENBQUM5RSxxQkFBRUYsT0FBRixDQUFVd0wsYUFBYUQsTUFBdkIsQ0FBSixFQUFtQztBQUMvQkMsNkJBQWFELE1BQWIsR0FBc0IsRUFBdEI7QUFDSDtBQUNELGdCQUFHckwscUJBQUVGLE9BQUYsQ0FBVXdMLGFBQWFJLFFBQXZCLENBQUgsRUFBb0M7QUFDaENKLDZCQUFhRCxNQUFiLEdBQXNCQyxhQUFhRCxNQUFiLENBQW9CTSxNQUFwQixDQUEyQkwsYUFBYUksUUFBeEMsQ0FBdEI7QUFDQSx1QkFBT0osYUFBYUksUUFBcEI7QUFDSDs7QUFFREoseUJBQWFELE1BQWIsR0FBc0JDLGFBQWFELE1BQWIsQ0FBb0JsTCxHQUFwQixDQUF3QixVQUFTeUwsS0FBVCxFQUFlO0FBQ3pELG9CQUFHLENBQUNBLEtBQUQsSUFBVSxDQUFDQSxNQUFNekYsSUFBcEIsRUFBeUI7QUFDckIsMkJBQU8sS0FBUDtBQUNIO0FBQ0QsdUJBQU8sU0FBYyxFQUFkLEVBQWtCO0FBQ3JCLDRCQUFRLFVBRGE7QUFFckIsK0JBQVc7QUFGVSxpQkFBbEIsRUFHSnlGLEtBSEksQ0FBUDtBQUlILGFBUnFCLEVBUW5CN0wsTUFSbUIsQ0FRWjtBQUFBLHVCQUFTLENBQUMsQ0FBQzZMLEtBQVg7QUFBQSxhQVJZLENBQXRCOztBQVVBLG1CQUFPTixZQUFQO0FBQ0gsU0FsRndCLENBQXpCO0FBbUZBWCwwQkFBa0JTLGdCQUFsQjtBQUNBLGVBQU9BLGdCQUFQO0FBQ0gsS0F2RkQ7QUF3RkFuVCxTQUFLcUIsV0FBTCxHQUFtQixZQUFNO0FBQ3JCcEIsMEJBQWtCQyxHQUFsQixDQUFzQixnQ0FBdEIsRUFBd0R3UyxlQUF4RDtBQUNBLGVBQU9BLGVBQVA7QUFDSCxLQUhEO0FBSUExUyxTQUFLMkIsaUJBQUwsR0FBeUIsWUFBTTtBQUMzQjtBQUNBMUIsMEJBQWtCQyxHQUFsQixDQUFzQixzQ0FBdEIsRUFBOER3UyxnQkFBZ0IsQ0FBaEIsRUFBbUI3UixPQUFqRjtBQUNBLGVBQU82UixnQkFBZ0IsQ0FBaEIsRUFBbUI3UixPQUExQjtBQUNILEtBSkQ7O0FBTUEsV0FBT2IsSUFBUDtBQUNILENBeEtEOztrQkEyS2VvUyxPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyTGY7Ozs7QUFDQTs7Ozs7O0FBRUE7Ozs7QUFJQSxJQUFNd0IsYUFBYSxTQUFiQSxVQUFhLEdBQVU7QUFDekIsUUFBSUMsaUJBQWlCLCtCQUFyQjtBQUNBLFFBQU1qUyxZQUFZLEVBQWxCOztBQUVBLFFBQU01QixPQUFPLEVBQWI7QUFDQUMsc0JBQWtCQyxHQUFsQixDQUFzQiw0QkFBdEI7O0FBRUEsUUFBTTRULGtCQUFrQixTQUFsQkEsZUFBa0IsQ0FBQ2hTLElBQUQsRUFBT2lTLFFBQVAsRUFBbUI7QUFDdkMsWUFBR25TLFVBQVVFLElBQVYsQ0FBSCxFQUFtQjtBQUNmO0FBQ0g7QUFDRDdCLDBCQUFrQkMsR0FBbEIsQ0FBc0IseUNBQXRCLEVBQWlFNEIsSUFBakU7QUFDQUYsa0JBQVVFLElBQVYsSUFBa0JpUyxRQUFsQjtBQUNILEtBTkQ7O0FBUUEsUUFBTUMsaUJBQWdCO0FBQ2xCQyxlQUFPLGlCQUFXO0FBQ2QsbUJBQU8sOE9BQTZDLFVBQVNDLE9BQVQsRUFBa0I7QUFDOUQsb0JBQU1ILFdBQVcsbUJBQUFHLENBQVEsc0VBQVIsRUFBb0NqVCxPQUFyRDtBQUNBNlMsZ0NBQWdCLE9BQWhCLEVBQXlCQyxRQUF6QjtBQUNBLHVCQUFPQSxRQUFQO0FBQ0gsYUFKRSx5Q0FJQSxVQUFTSSxHQUFULEVBQWE7QUFDWixzQkFBTSxJQUFJQyxLQUFKLENBQVUsZUFBVixDQUFOO0FBQ0gsYUFORSxDQUFQO0FBUUgsU0FWaUI7QUFXbEJDLGdCQUFTLGtCQUFVO0FBQ2YsbUJBQU8sMFBBQStDLFVBQVNILE9BQVQsRUFBa0I7QUFDaEUsb0JBQU1ILFdBQVcsbUJBQUFHLENBQVEsMEVBQVIsRUFBc0NqVCxPQUF2RDtBQUNBNlMsZ0NBQWdCLFFBQWhCLEVBQTBCQyxRQUExQjtBQUNBLHVCQUFPQSxRQUFQO0FBQ0gsYUFKRSx5Q0FJQSxVQUFTSSxHQUFULEVBQWE7QUFDWixzQkFBTSxJQUFJQyxLQUFKLENBQVUsZUFBVixDQUFOO0FBQ0gsYUFORSxDQUFQO0FBUUgsU0FwQmlCO0FBcUJsQkUsY0FBTyxnQkFBVTtBQUNiLG1CQUFPLDRQQUEyQyxVQUFTSixPQUFULEVBQWtCO0FBQzVELG9CQUFNSCxXQUFXLG1CQUFBRyxDQUFRLGtFQUFSLEVBQWtDalQsT0FBbkQ7QUFDQVcsMEJBQVUsTUFBVixJQUFvQm1TLFFBQXBCO0FBQ0FELGdDQUFnQixNQUFoQixFQUF3QkMsUUFBeEI7QUFDQSx1QkFBT0EsUUFBUDtBQUNILGFBTEUseUNBS0EsVUFBU0ksR0FBVCxFQUFhO0FBQ1osc0JBQU0sSUFBSUMsS0FBSixDQUFVLGVBQVYsQ0FBTjtBQUNILGFBUEUsQ0FBUDtBQVNILFNBL0JpQjtBQWdDbEJ0RyxhQUFNLGVBQVU7QUFDWixtQkFBTywwUEFBeUMsVUFBU29HLE9BQVQsRUFBa0I7QUFDMUQsb0JBQU1ILFdBQVcsbUJBQUFHLENBQVEsOERBQVIsRUFBZ0NqVCxPQUFqRDtBQUNBNlMsZ0NBQWdCLEtBQWhCLEVBQXVCQyxRQUF2QjtBQUNBLHVCQUFPQSxRQUFQO0FBQ0gsYUFKRSx5Q0FJQSxVQUFTSSxHQUFULEVBQWE7QUFDWixzQkFBTSxJQUFJQyxLQUFKLENBQVUsZUFBVixDQUFOO0FBQ0gsYUFORSxDQUFQO0FBUUg7QUF6Q2lCLEtBQXRCO0FBMkNBcFUsU0FBS29CLGFBQUwsR0FBcUIsVUFBQ2dELFFBQUQsRUFBYTtBQUM5QixZQUFNbVEseUJBQXlCVixlQUFlMUUsMkJBQWYsQ0FBMkMvSyxRQUEzQyxDQUEvQjtBQUNBbkUsMEJBQWtCQyxHQUFsQixDQUFzQixxQ0FBdEIsRUFBNkRxVSxzQkFBN0Q7QUFDQSxlQUFPQyxrQkFBUS9KLEdBQVIsQ0FDSDhKLHVCQUF1QnpNLE1BQXZCLENBQThCLFVBQVMyTSxZQUFULEVBQXNCO0FBQ2hELG1CQUFPLENBQUMsQ0FBQ1QsZUFBZVMsWUFBZixDQUFUO0FBQ0gsU0FGRCxFQUVHdk0sR0FGSCxDQUVPLFVBQVN1TSxZQUFULEVBQXNCO0FBQ3pCLGdCQUFNVixXQUFXQyxlQUFlUyxZQUFmLEdBQWpCO0FBQ0EsbUJBQU9WLFFBQVA7QUFDSCxTQUxELENBREcsQ0FBUDtBQVFILEtBWEQ7O0FBYUEvVCxTQUFLMFUsVUFBTCxHQUFrQixVQUFDNVMsSUFBRCxFQUFVO0FBQ3hCN0IsMEJBQWtCQyxHQUFsQixDQUFzQixrQ0FBdEIsRUFBMEQ0QixJQUExRDtBQUNBLGVBQU9GLFVBQVVFLElBQVYsQ0FBUDtBQUNILEtBSEQ7O0FBS0E5QixTQUFLMlUsbUJBQUwsR0FBMkIsVUFBQzlILE1BQUQsRUFBWTtBQUNuQyxZQUFNK0gsd0JBQXdCZixlQUFlNUUsd0JBQWYsQ0FBd0NwQyxNQUF4QyxDQUE5QjtBQUNBNU0sMEJBQWtCQyxHQUFsQixDQUFzQiwyQ0FBdEIsRUFBbUUwVSxxQkFBbkU7QUFDQSxlQUFPNVUsS0FBSzBVLFVBQUwsQ0FBZ0JFLHFCQUFoQixDQUFQO0FBQ0gsS0FKRDs7QUFNQTVVLFNBQUsrRSxjQUFMLEdBQXNCLFVBQUNGLGFBQUQsRUFBZ0JDLFNBQWhCLEVBQThCO0FBQ2hEN0UsMEJBQWtCQyxHQUFsQixDQUFzQixzQ0FBdEIsRUFBOEQyVCxlQUFlNUUsd0JBQWYsQ0FBd0NwSyxhQUF4QyxDQUE5RCxFQUF1SGdQLGVBQWU1RSx3QkFBZixDQUF3Q25LLFNBQXhDLENBQXZIO0FBQ0EsZUFBTytPLGVBQWU1RSx3QkFBZixDQUF3Q3BLLGFBQXhDLEtBQTBEZ1AsZUFBZTVFLHdCQUFmLENBQXdDbkssU0FBeEMsQ0FBakU7QUFFSCxLQUpEOztBQU1BLFdBQU85RSxJQUFQO0FBQ0gsQ0F6RkQ7O2tCQTJGZTRULFU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEdmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBTWlCLGlCQUFpQixTQUFqQkEsY0FBaUIsQ0FBU0MsUUFBVCxFQUFtQjtBQUN0QyxRQUFJQyxjQUFjLEtBQUtBLFdBQXZCO0FBQ0EsV0FBTyxLQUFLelQsSUFBTCxDQUNILFVBQVMwVCxLQUFULEVBQWdCO0FBQ1osZUFBT0QsWUFBWUUsT0FBWixDQUFvQkgsVUFBcEIsRUFBZ0N4VCxJQUFoQyxDQUFxQyxZQUFXO0FBQ25ELG1CQUFPMFQsS0FBUDtBQUNILFNBRk0sQ0FBUDtBQUdILEtBTEUsRUFNSCxVQUFTOVIsTUFBVCxFQUFpQjtBQUNiLGVBQU82UixZQUFZRSxPQUFaLENBQW9CSCxVQUFwQixFQUFnQ3hULElBQWhDLENBQXFDLFlBQVc7QUFDbkQsbUJBQU95VCxZQUFZRyxNQUFaLENBQW1CaFMsTUFBbkIsQ0FBUDtBQUNILFNBRk0sQ0FBUDtBQUdILEtBVkUsQ0FBUDtBQVlILENBZEQ7O0FBZ0JBO0FBQ0E7QUFDQSxJQUFNaVMsaUJBQWlCNUcsT0FBTzZHLFVBQTlCO0FBQ0EsSUFBTUMsbUJBQW1COUcsT0FBTytHLFlBQWhDOztBQUVBLFNBQVNDLElBQVQsR0FBZ0IsQ0FBRTs7QUFFbEI7QUFDQSxTQUFTQyxJQUFULENBQWNDLEVBQWQsRUFBa0JDLE9BQWxCLEVBQTJCO0FBQ3ZCLFdBQU8sWUFBVztBQUNkRCxXQUFHcEwsS0FBSCxDQUFTcUwsT0FBVCxFQUFrQm5MLFNBQWxCO0FBQ0gsS0FGRDtBQUdIOztBQUVELElBQU1vTCxjQUFjLFNBQWRBLFdBQWMsQ0FBVUYsRUFBVixFQUFjO0FBQzlCLFFBQUksRUFBRSxnQkFBZ0JqQixPQUFsQixDQUFKLEVBQ0ksTUFBTSxJQUFJb0IsU0FBSixDQUFjLHNDQUFkLENBQU47QUFDSixRQUFJLE9BQU9ILEVBQVAsS0FBYyxVQUFsQixFQUE4QixNQUFNLElBQUlHLFNBQUosQ0FBYyxnQkFBZCxDQUFOO0FBQzlCLFNBQUtDLE1BQUwsR0FBYyxDQUFkO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQixLQUFoQjtBQUNBLFNBQUtDLE1BQUwsR0FBYzdQLFNBQWQ7QUFDQSxTQUFLOFAsVUFBTCxHQUFrQixFQUFsQjs7QUFFQUMsY0FBVVIsRUFBVixFQUFjLElBQWQ7QUFDSCxDQVZEOztBQVlBLElBQU1TLFNBQVMsU0FBVEEsTUFBUyxDQUFVQyxJQUFWLEVBQWdCQyxRQUFoQixFQUEwQjtBQUNyQyxXQUFPRCxLQUFLTixNQUFMLEtBQWdCLENBQXZCLEVBQTBCO0FBQ3RCTSxlQUFPQSxLQUFLSixNQUFaO0FBQ0g7QUFDRCxRQUFJSSxLQUFLTixNQUFMLEtBQWdCLENBQXBCLEVBQXVCO0FBQ25CTSxhQUFLSCxVQUFMLENBQWdCM04sSUFBaEIsQ0FBcUIrTixRQUFyQjtBQUNBO0FBQ0g7QUFDREQsU0FBS0wsUUFBTCxHQUFnQixJQUFoQjtBQUNBdEIsWUFBUTZCLFlBQVIsQ0FBcUIsWUFBVztBQUM1QixZQUFJQyxLQUFLSCxLQUFLTixNQUFMLEtBQWdCLENBQWhCLEdBQW9CTyxTQUFTRyxXQUE3QixHQUEyQ0gsU0FBU0ksVUFBN0Q7QUFDQSxZQUFJRixPQUFPLElBQVgsRUFBaUI7QUFDYixhQUFDSCxLQUFLTixNQUFMLEtBQWdCLENBQWhCLEdBQW9CWixPQUFwQixHQUE4QkMsTUFBL0IsRUFBdUNrQixTQUFTSyxPQUFoRCxFQUF5RE4sS0FBS0osTUFBOUQ7QUFDQTtBQUNIO0FBQ0QsWUFBSVcsR0FBSjtBQUNBLFlBQUk7QUFDQUEsa0JBQU1KLEdBQUdILEtBQUtKLE1BQVIsQ0FBTjtBQUNILFNBRkQsQ0FFRSxPQUFPWSxDQUFQLEVBQVU7QUFDUnpCLG1CQUFPa0IsU0FBU0ssT0FBaEIsRUFBeUJFLENBQXpCO0FBQ0E7QUFDSDtBQUNEMUIsZ0JBQVFtQixTQUFTSyxPQUFqQixFQUEwQkMsR0FBMUI7QUFDSCxLQWREO0FBZUgsQ0F4QkQ7O0FBMEJBLElBQU16QixVQUFVLFNBQVZBLE9BQVUsQ0FBVWtCLElBQVYsRUFBZ0JTLFFBQWhCLEVBQTBCO0FBQ3RDLFFBQUk7QUFDQTtBQUNBLFlBQUlBLGFBQWFULElBQWpCLEVBQ0ksTUFBTSxJQUFJUCxTQUFKLENBQWMsMkNBQWQsQ0FBTjtBQUNKLFlBQ0lnQixhQUNDLFFBQU9BLFFBQVAseUNBQU9BLFFBQVAsT0FBb0IsUUFBcEIsSUFBZ0MsT0FBT0EsUUFBUCxLQUFvQixVQURyRCxDQURKLEVBR0U7QUFDRSxnQkFBSXRWLE9BQU9zVixTQUFTdFYsSUFBcEI7QUFDQSxnQkFBSXNWLG9CQUFvQnBDLE9BQXhCLEVBQWlDO0FBQzdCMkIscUJBQUtOLE1BQUwsR0FBYyxDQUFkO0FBQ0FNLHFCQUFLSixNQUFMLEdBQWNhLFFBQWQ7QUFDQUMsdUJBQU9WLElBQVA7QUFDQTtBQUNILGFBTEQsTUFLTyxJQUFJLE9BQU83VSxJQUFQLEtBQWdCLFVBQXBCLEVBQWdDO0FBQ25DMlUsMEJBQVVULEtBQUtsVSxJQUFMLEVBQVdzVixRQUFYLENBQVYsRUFBZ0NULElBQWhDO0FBQ0E7QUFDSDtBQUNKO0FBQ0RBLGFBQUtOLE1BQUwsR0FBYyxDQUFkO0FBQ0FNLGFBQUtKLE1BQUwsR0FBY2EsUUFBZDtBQUNBQyxlQUFPVixJQUFQO0FBQ0gsS0F0QkQsQ0FzQkUsT0FBT1EsQ0FBUCxFQUFVO0FBQ1J6QixlQUFPaUIsSUFBUCxFQUFhUSxDQUFiO0FBQ0g7QUFDSixDQTFCRDs7QUE0QkEsSUFBTXpCLFNBQVEsU0FBUkEsTUFBUSxDQUFVaUIsSUFBVixFQUFnQlMsUUFBaEIsRUFBMEI7QUFDcENULFNBQUtOLE1BQUwsR0FBYyxDQUFkO0FBQ0FNLFNBQUtKLE1BQUwsR0FBY2EsUUFBZDtBQUNBQyxXQUFPVixJQUFQO0FBQ0gsQ0FKRDs7QUFNQSxJQUFNVSxTQUFTLFNBQVRBLE1BQVMsQ0FBVVYsSUFBVixFQUFnQjtBQUMzQixRQUFJQSxLQUFLTixNQUFMLEtBQWdCLENBQWhCLElBQXFCTSxLQUFLSCxVQUFMLENBQWdCaFYsTUFBaEIsS0FBMkIsQ0FBcEQsRUFBdUQ7QUFDbkR3VCxnQkFBUTZCLFlBQVIsQ0FBcUIsWUFBVztBQUM1QixnQkFBSSxDQUFDRixLQUFLTCxRQUFWLEVBQW9CO0FBQ2hCdEIsd0JBQVFzQyxxQkFBUixDQUE4QlgsS0FBS0osTUFBbkM7QUFDSDtBQUNKLFNBSkQ7QUFLSDs7QUFFRCxTQUFLLElBQUloVixJQUFJLENBQVIsRUFBV2dXLE1BQU1aLEtBQUtILFVBQUwsQ0FBZ0JoVixNQUF0QyxFQUE4Q0QsSUFBSWdXLEdBQWxELEVBQXVEaFcsR0FBdkQsRUFBNEQ7QUFDeERtVixlQUFPQyxJQUFQLEVBQWFBLEtBQUtILFVBQUwsQ0FBZ0JqVixDQUFoQixDQUFiO0FBQ0g7QUFDRG9WLFNBQUtILFVBQUwsR0FBa0IsSUFBbEI7QUFDSCxDQWJEOztBQWVBLElBQU1nQixVQUFVLFNBQVZBLE9BQVUsQ0FBVVQsV0FBVixFQUF1QkMsVUFBdkIsRUFBbUNDLE9BQW5DLEVBQTRDO0FBQ3hELFNBQUtGLFdBQUwsR0FBbUIsT0FBT0EsV0FBUCxLQUF1QixVQUF2QixHQUFvQ0EsV0FBcEMsR0FBa0QsSUFBckU7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLE9BQU9BLFVBQVAsS0FBc0IsVUFBdEIsR0FBbUNBLFVBQW5DLEdBQWdELElBQWxFO0FBQ0EsU0FBS0MsT0FBTCxHQUFlQSxPQUFmO0FBQ0gsQ0FKRDs7QUFNQTs7Ozs7O0FBTUEsSUFBTVIsWUFBWSxTQUFaQSxTQUFZLENBQVVSLEVBQVYsRUFBY1UsSUFBZCxFQUFvQjtBQUNsQyxRQUFJYyxPQUFPLEtBQVg7QUFDQSxRQUFJO0FBQ0F4QixXQUNJLFVBQVNULEtBQVQsRUFBZ0I7QUFDWixnQkFBSWlDLElBQUosRUFBVTtBQUNWQSxtQkFBTyxJQUFQO0FBQ0FoQyxvQkFBUWtCLElBQVIsRUFBY25CLEtBQWQ7QUFDSCxTQUxMLEVBTUksVUFBUzlSLE1BQVQsRUFBaUI7QUFDYixnQkFBSStULElBQUosRUFBVTtBQUNWQSxtQkFBTyxJQUFQO0FBQ0EvQixtQkFBT2lCLElBQVAsRUFBYWpULE1BQWI7QUFDSCxTQVZMO0FBWUgsS0FiRCxDQWFFLE9BQU9nVSxFQUFQLEVBQVc7QUFDVCxZQUFJRCxJQUFKLEVBQVU7QUFDVkEsZUFBTyxJQUFQO0FBQ0EvQixlQUFPaUIsSUFBUCxFQUFhZSxFQUFiO0FBQ0g7QUFDSixDQXBCRDs7QUFzQkF2QixZQUFZL0osU0FBWixDQUFzQixPQUF0QixJQUFpQyxVQUFTNEssVUFBVCxFQUFxQjtBQUNsRCxXQUFPLEtBQUtsVixJQUFMLENBQVUsSUFBVixFQUFnQmtWLFVBQWhCLENBQVA7QUFDSCxDQUZEOztBQUlBYixZQUFZL0osU0FBWixDQUFzQnRLLElBQXRCLEdBQTZCLFVBQVNpVixXQUFULEVBQXNCQyxVQUF0QixFQUFrQztBQUMzRCxRQUFJVyxPQUFPLElBQUksS0FBS3BDLFdBQVQsQ0FBcUJRLElBQXJCLENBQVg7O0FBRUFXLFdBQU8sSUFBUCxFQUFhLElBQUljLE9BQUosQ0FBWVQsV0FBWixFQUF5QkMsVUFBekIsRUFBcUNXLElBQXJDLENBQWI7QUFDQSxXQUFPQSxJQUFQO0FBQ0gsQ0FMRDs7QUFPQXhCLFlBQVkvSixTQUFaLENBQXNCLFNBQXRCLElBQW1DaUosY0FBbkM7O0FBRUFjLFlBQVlsTCxHQUFaLEdBQWtCLFVBQVMyTSxHQUFULEVBQWM7QUFDNUIsV0FBTyxJQUFJNUMsT0FBSixDQUFZLFVBQVNTLE9BQVQsRUFBa0JDLE1BQWxCLEVBQTBCO0FBQ3pDLFlBQUksQ0FBQ2tDLEdBQUQsSUFBUSxPQUFPQSxJQUFJcFcsTUFBWCxLQUFzQixXQUFsQyxFQUNJLE1BQU0sSUFBSTRVLFNBQUosQ0FBYyw4QkFBZCxDQUFOO0FBQ0osWUFBSTNMLE9BQU9yQyxNQUFNZ0UsU0FBTixDQUFnQjlFLEtBQWhCLENBQXNCd0QsSUFBdEIsQ0FBMkI4TSxHQUEzQixDQUFYO0FBQ0EsWUFBSW5OLEtBQUtqSixNQUFMLEtBQWdCLENBQXBCLEVBQXVCLE9BQU9pVSxRQUFRLEVBQVIsQ0FBUDtBQUN2QixZQUFJb0MsWUFBWXBOLEtBQUtqSixNQUFyQjs7QUFFQSxpQkFBU3NXLEdBQVQsQ0FBYXZXLENBQWIsRUFBZ0JrRixHQUFoQixFQUFxQjtBQUNqQixnQkFBSTtBQUNBLG9CQUFJQSxRQUFRLFFBQU9BLEdBQVAseUNBQU9BLEdBQVAsT0FBZSxRQUFmLElBQTJCLE9BQU9BLEdBQVAsS0FBZSxVQUFsRCxDQUFKLEVBQW1FO0FBQy9ELHdCQUFJM0UsT0FBTzJFLElBQUkzRSxJQUFmO0FBQ0Esd0JBQUksT0FBT0EsSUFBUCxLQUFnQixVQUFwQixFQUFnQztBQUM1QkEsNkJBQUtnSixJQUFMLENBQ0lyRSxHQURKLEVBRUksVUFBU0EsR0FBVCxFQUFjO0FBQ1ZxUixnQ0FBSXZXLENBQUosRUFBT2tGLEdBQVA7QUFDSCx5QkFKTCxFQUtJaVAsTUFMSjtBQU9BO0FBQ0g7QUFDSjtBQUNEakwscUJBQUtsSixDQUFMLElBQVVrRixHQUFWO0FBQ0Esb0JBQUksRUFBRW9SLFNBQUYsS0FBZ0IsQ0FBcEIsRUFBdUI7QUFDbkJwQyw0QkFBUWhMLElBQVI7QUFDSDtBQUNKLGFBbEJELENBa0JFLE9BQU9pTixFQUFQLEVBQVc7QUFDVGhDLHVCQUFPZ0MsRUFBUDtBQUNIO0FBQ0o7O0FBRUQsYUFBSyxJQUFJblcsSUFBSSxDQUFiLEVBQWdCQSxJQUFJa0osS0FBS2pKLE1BQXpCLEVBQWlDRCxHQUFqQyxFQUFzQztBQUNsQ3VXLGdCQUFJdlcsQ0FBSixFQUFPa0osS0FBS2xKLENBQUwsQ0FBUDtBQUNIO0FBQ0osS0FsQ00sQ0FBUDtBQW1DSCxDQXBDRDs7QUFzQ0E0VSxZQUFZVixPQUFaLEdBQXNCLFVBQVNELEtBQVQsRUFBZ0I7QUFDbEMsUUFBSUEsU0FBUyxRQUFPQSxLQUFQLHlDQUFPQSxLQUFQLE9BQWlCLFFBQTFCLElBQXNDQSxNQUFNRCxXQUFOLEtBQXNCUCxPQUFoRSxFQUF5RTtBQUNyRSxlQUFPUSxLQUFQO0FBQ0g7O0FBRUQsV0FBTyxJQUFJUixPQUFKLENBQVksVUFBU1MsT0FBVCxFQUFrQjtBQUNqQ0EsZ0JBQVFELEtBQVI7QUFDSCxLQUZNLENBQVA7QUFHSCxDQVJEOztBQVVBVyxZQUFZVCxNQUFaLEdBQXFCLFVBQVNGLEtBQVQsRUFBZ0I7QUFDakMsV0FBTyxJQUFJUixPQUFKLENBQVksVUFBU1MsT0FBVCxFQUFrQkMsTUFBbEIsRUFBMEI7QUFDekNBLGVBQU9GLEtBQVA7QUFDSCxLQUZNLENBQVA7QUFHSCxDQUpEOztBQU1BVyxZQUFZNEIsSUFBWixHQUFtQixVQUFTQyxNQUFULEVBQWlCO0FBQ2hDLFdBQU8sSUFBSWhELE9BQUosQ0FBWSxVQUFTUyxPQUFULEVBQWtCQyxNQUFsQixFQUEwQjtBQUN6QyxhQUFLLElBQUluVSxJQUFJLENBQVIsRUFBV2dXLE1BQU1TLE9BQU94VyxNQUE3QixFQUFxQ0QsSUFBSWdXLEdBQXpDLEVBQThDaFcsR0FBOUMsRUFBbUQ7QUFDL0N5VyxtQkFBT3pXLENBQVAsRUFBVU8sSUFBVixDQUFlMlQsT0FBZixFQUF3QkMsTUFBeEI7QUFDSDtBQUNKLEtBSk0sQ0FBUDtBQUtILENBTkQ7O0FBUUE7QUFDQVMsWUFBWVUsWUFBWixHQUNLLE9BQU9oQixnQkFBUCxLQUE0QixVQUE1QixJQUNELFVBQVNJLEVBQVQsRUFBYTtBQUNUSixxQkFBaUJJLEVBQWpCO0FBQ0gsQ0FIRCxJQUlBLFVBQVNBLEVBQVQsRUFBYTtBQUNUSixxQkFBaUJJLEVBQWpCLEVBQXFCLENBQXJCO0FBQ0gsQ0FQTDs7QUFTQUUsWUFBWW1CLHFCQUFaLEdBQW9DLFNBQVNBLHFCQUFULENBQStCM0MsR0FBL0IsRUFBb0M7QUFDcEUsUUFBSSxPQUFPc0QsT0FBUCxLQUFtQixXQUFuQixJQUFrQ0EsT0FBdEMsRUFBK0M7QUFDM0NBLGdCQUFRQyxJQUFSLENBQWEsdUNBQWIsRUFBc0R2RCxHQUF0RCxFQUQyQyxDQUNpQjtBQUMvRDtBQUNKLENBSkQ7O0FBTUEsSUFBTUssVUFBVWpHLE9BQU9pRyxPQUFQLEtBQW1CakcsT0FBT2lHLE9BQVAsR0FBaUJtQixXQUFwQyxDQUFoQjs7QUFFTyxJQUFNZ0MsOEJBQVduRCxRQUFRUyxPQUFSLEVBQWpCOztrQkFFUVQsTzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVQZjs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFHQSxxQkFBQW9ELEdBQTBCLDRCQUFjLG1CQUFkLENBQTFCOztBQUVBOzs7QUFHQSxJQUFNQyxnQkFBZ0J0SixPQUFPc0osYUFBUCxHQUF1QixFQUE3Qzs7QUFFQSxJQUFNMVgsVUFBVSxPQUFoQjs7QUFFQSxJQUFNMlgsYUFBYUQsY0FBY0MsVUFBZCxHQUEyQixFQUE5Qzs7QUFFTyxJQUFNQyxvRUFBOEIsU0FBOUJBLDJCQUE4QixDQUFTalksU0FBVCxFQUFvQjs7QUFFM0QsUUFBSSxDQUFDQSxTQUFMLEVBQWdCOztBQUVaO0FBQ0EsZUFBTyxJQUFQO0FBQ0g7O0FBRUQsUUFBSWtZLG1CQUFtQixJQUF2Qjs7QUFFQSxRQUFJLE9BQU9sWSxTQUFQLEtBQXFCLFFBQXpCLEVBQW1DOztBQUUvQmtZLDJCQUFtQmhLLFNBQVNpSyxjQUFULENBQXdCblksU0FBeEIsQ0FBbkI7QUFDSCxLQUhELE1BR08sSUFBSUEsVUFBVW9ZLFFBQWQsRUFBd0I7O0FBRTNCRiwyQkFBbUJsWSxTQUFuQjtBQUNILEtBSE0sTUFHQTtBQUNIO0FBQ0EsZUFBTyxJQUFQO0FBQ0g7O0FBRUQsV0FBT2tZLGdCQUFQO0FBQ0gsQ0F0Qk07O0FBd0JQOzs7Ozs7QUFNQUgsY0FBY00sTUFBZCxHQUF1QixVQUFTclksU0FBVCxFQUFvQndELE9BQXBCLEVBQTZCOztBQUVoRCxRQUFJMFUsbUJBQW1CRCw0QkFBNEJqWSxTQUE1QixDQUF2Qjs7QUFFQSxRQUFNc1ksaUJBQWlCLG1CQUFJSixnQkFBSixDQUF2QjtBQUNBSSxtQkFBZS9VLElBQWYsQ0FBb0JDLE9BQXBCOztBQUVBd1UsZUFBV3pQLElBQVgsQ0FBZ0IrUCxjQUFoQjs7QUFFQSxXQUFPQSxjQUFQO0FBQ0gsQ0FWRDs7QUFZQTs7Ozs7QUFLQVAsY0FBY1EsYUFBZCxHQUE4QixZQUFXOztBQUVyQyxXQUFPUCxVQUFQO0FBQ0gsQ0FIRDs7QUFLQTs7Ozs7O0FBTUFELGNBQWNTLHNCQUFkLEdBQXVDLFVBQVNDLFdBQVQsRUFBc0I7O0FBRXpELFNBQUssSUFBSXhYLElBQUksQ0FBYixFQUFnQkEsSUFBSStXLFdBQVc5VyxNQUFYLEdBQW1CLENBQXZDLEVBQTBDRCxHQUExQyxFQUFnRDs7QUFFNUMsWUFBSStXLFdBQVcvVyxDQUFYLEVBQWN3WCxXQUFkLEtBQThCQSxXQUFsQyxFQUErQzs7QUFFM0MsbUJBQU9ULFdBQVcvVyxDQUFYLENBQVA7QUFDSDtBQUNKOztBQUVELFdBQU8sSUFBUDtBQUNILENBWEQ7O0FBYUE7Ozs7OztBQU1BOFcsY0FBY1csZ0JBQWQsR0FBaUMsVUFBU3BSLEtBQVQsRUFBZ0I7O0FBRTdDLFFBQU1nUixpQkFBaUJOLFdBQVcxUSxLQUFYLENBQXZCOztBQUVBLFFBQUlnUixjQUFKLEVBQW9COztBQUVoQixlQUFPQSxjQUFQO0FBQ0gsS0FIRCxNQUdPOztBQUVILGVBQU8sSUFBUDtBQUNIO0FBQ0osQ0FYRDs7QUFhQTs7Ozs7O0FBTUFQLGNBQWNZLGtCQUFkLEdBQW1DLFVBQVM1WCxPQUFULEVBQWtCO0FBQ2pELFdBQU8sQ0FBQ2tILHFCQUFFRixPQUFGLENBQVVoSCxPQUFWLElBQXFCQSxPQUFyQixHQUErQixDQUFDQSxPQUFELENBQWhDLEVBQTJDcUgsR0FBM0MsQ0FBK0MsVUFBUzJFLE1BQVQsRUFBaUJ6RixLQUFqQixFQUF1QjtBQUN6RSxZQUFHeUYsT0FBT2lHLElBQVAsSUFBZSx5QkFBU2pHLE9BQU9pRyxJQUFoQixDQUFmLElBQXdDakcsT0FBT2tHLFdBQS9DLElBQThEbEcsT0FBT21HLE1BQXhFLEVBQStFO0FBQzNFLG1CQUFPLEVBQUM5RSxNQUFPckIsT0FBT2lHLElBQVAsR0FBYyxHQUFkLEdBQW9CakcsT0FBT2tHLFdBQTNCLEdBQXlDLEdBQXpDLEdBQStDbEcsT0FBT21HLE1BQTlELEVBQXNFN0UsTUFBTyxRQUE3RSxFQUF1RmhOLE9BQVEwTCxPQUFPMUwsS0FBUCxHQUFlMEwsT0FBTzFMLEtBQXRCLEdBQThCLGFBQVdpRyxRQUFNLENBQWpCLENBQTdILEVBQVA7QUFDSDtBQUNKLEtBSk0sQ0FBUDtBQUtILENBTkQ7O2tCQVFleVEsYTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6SGY7Ozs7QUFJQSxJQUFNYSxTQUFTLFNBQVRBLE1BQVMsR0FBVTtBQUNyQixRQUFNMVksT0FBTyxFQUFiO0FBQ0EsUUFBSTJZLGlCQUFpQixJQUFyQjs7QUFFQXBLLFdBQU90TyxpQkFBUCxHQUEyQixFQUFDQyxLQUFNcU8sT0FBTyxTQUFQLEVBQWtCLEtBQWxCLENBQVAsRUFBM0I7O0FBRUF2TyxTQUFLNFksTUFBTCxHQUFjLFlBQUs7QUFDZixZQUFHRCxrQkFBa0IsSUFBckIsRUFBMEI7QUFDdEI7QUFDSDtBQUNEMVksMEJBQWtCLEtBQWxCLElBQTJCMFksY0FBM0I7QUFDSCxLQUxEO0FBTUEzWSxTQUFLd0QsT0FBTCxHQUFlLFlBQUs7QUFDaEJtVix5QkFBaUJsQixRQUFRdlgsR0FBekI7QUFDQUQsMEJBQWtCLEtBQWxCLElBQTJCLFlBQVUsQ0FBRSxDQUF2QztBQUNILEtBSEQ7QUFJQUQsU0FBS3VCLE9BQUwsR0FBZSxZQUFLO0FBQ2hCZ04sZUFBT3RPLGlCQUFQLEdBQTJCLElBQTNCO0FBQ0gsS0FGRDs7QUFJQSxXQUFPRCxJQUFQO0FBQ0gsQ0FyQkQ7O2tCQXdCZTBZLE07Ozs7Ozs7Ozs7Ozs7Ozs7OztRQzFCQ0csSSxHQUFBQSxJO1FBMkNBQyxVLEdBQUFBLFU7O0FBN0NoQjs7Ozs7O0FBRU8sU0FBU0QsSUFBVCxDQUFjRSxNQUFkLEVBQXNCO0FBQ3pCLFdBQU9BLE9BQU83RixPQUFQLENBQWUsWUFBZixFQUE2QixFQUE3QixDQUFQO0FBQ0g7O0FBRUQ7Ozs7OztBQU1PLElBQU04Riw4Q0FBbUIsU0FBbkJBLGdCQUFtQixDQUFTQyxJQUFULEVBQWU7QUFDM0MsUUFBRyxDQUFDQSxJQUFELElBQVNBLEtBQUszUixNQUFMLENBQVksQ0FBWixFQUFjLENBQWQsS0FBa0IsTUFBOUIsRUFBc0M7QUFDbEMsZUFBTyxFQUFQO0FBQ0g7QUFDRCxhQUFTNFIsa0JBQVQsQ0FBNEJELElBQTVCLEVBQWtDO0FBQzlCLFlBQUlFLFlBQVksRUFBaEI7QUFDQSxZQUFLLGtCQUFELENBQXFCaFMsSUFBckIsQ0FBMEI4UixJQUExQixDQUFKLEVBQXFDO0FBQ2pDRSx3QkFBWSxLQUFaO0FBQ0gsU0FGRCxNQUVNLElBQUssbUJBQUQsQ0FBc0JoUyxJQUF0QixDQUEyQjhSLElBQTNCLENBQUosRUFBc0M7QUFDeENFLHdCQUFZLE1BQVo7QUFDSDtBQUNELGVBQU9BLFNBQVA7QUFDSDs7QUFFRCxRQUFJQyxlQUFlRixtQkFBbUJELElBQW5CLENBQW5CO0FBQ0EsUUFBR0csWUFBSCxFQUFpQjtBQUNiLGVBQU9BLFlBQVA7QUFDSDtBQUNESCxXQUFPQSxLQUFLSSxLQUFMLENBQVcsR0FBWCxFQUFnQixDQUFoQixFQUFtQkEsS0FBbkIsQ0FBeUIsR0FBekIsRUFBOEIsQ0FBOUIsQ0FBUDtBQUNBLFFBQUdKLEtBQUtLLFdBQUwsQ0FBaUIsR0FBakIsSUFBd0IsQ0FBQyxDQUE1QixFQUErQjtBQUMzQixlQUFPTCxLQUFLM1IsTUFBTCxDQUFZMlIsS0FBS0ssV0FBTCxDQUFpQixHQUFqQixJQUF3QixDQUFwQyxFQUF1Q0wsS0FBS2pZLE1BQTVDLEVBQW9Eb0YsV0FBcEQsRUFBUDtBQUNILEtBRkQsTUFFSztBQUNELGVBQU8sRUFBUDtBQUNIO0FBQ0osQ0F4Qk07O0FBMkJQOzs7Ozs7QUFNTyxTQUFTMFMsVUFBVCxDQUFvQlMsTUFBcEIsRUFBNEI7QUFDL0IsUUFBSUMsU0FBU3BYLFNBQVNtWCxNQUFULEVBQWlCLEVBQWpCLENBQWI7QUFDQSxRQUFJRSxRQUFVdFIsS0FBS3VSLEtBQUwsQ0FBV0YsU0FBUyxJQUFwQixDQUFkO0FBQ0EsUUFBSUcsVUFBVXhSLEtBQUt1UixLQUFMLENBQVcsQ0FBQ0YsU0FBVUMsUUFBUSxJQUFuQixJQUE0QixFQUF2QyxDQUFkO0FBQ0EsUUFBSUcsVUFBVUosU0FBVUMsUUFBUSxJQUFsQixHQUEyQkUsVUFBVSxFQUFuRDs7QUFFQSxRQUFJRixRQUFRLENBQVosRUFBZTtBQUFDRSxrQkFBVSxNQUFJQSxPQUFkO0FBQXVCO0FBQ3ZDLFFBQUlDLFVBQVUsRUFBZCxFQUFrQjtBQUFDQSxrQkFBVSxNQUFJQSxPQUFkO0FBQXVCOztBQUUxQyxRQUFJSCxRQUFRLENBQVosRUFBZTtBQUNYLGVBQU9BLFFBQU0sR0FBTixHQUFVRSxPQUFWLEdBQWtCLEdBQWxCLEdBQXNCQyxPQUE3QjtBQUNILEtBRkQsTUFFTztBQUNILGVBQU9ELFVBQVEsR0FBUixHQUFZQyxPQUFuQjtBQUNIO0FBQ0osQzs7Ozs7Ozs7Ozs7Ozs7OztBQzNERDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsWUFBVTtBQUFDLE1BQUlDLElBQUUsb0JBQWlCMUQsSUFBakIseUNBQWlCQSxJQUFqQixNQUF1QkEsS0FBS0EsSUFBTCxLQUFZQSxJQUFuQyxJQUF5Q0EsSUFBekMsSUFBK0Msb0JBQWlCMkQsTUFBakIseUNBQWlCQSxNQUFqQixNQUF5QkEsT0FBT0EsTUFBUCxLQUFnQkEsTUFBekMsSUFBaURBLE1BQWhHLElBQXdHLElBQXhHLElBQThHLEVBQXBIO0FBQUEsTUFBdUhDLElBQUVGLEVBQUU5UixDQUEzSDtBQUFBLE1BQTZINE8sSUFBRS9PLE1BQU1nRSxTQUFySTtBQUFBLE1BQStJb08sSUFBRXZULE9BQU9tRixTQUF4SjtBQUFBLE1BQWtLcU8sSUFBRSxlQUFhLE9BQU9DLE1BQXBCLEdBQTJCQSxPQUFPdE8sU0FBbEMsR0FBNEMsSUFBaE47QUFBQSxNQUFxTnVPLElBQUV4RCxFQUFFdE8sSUFBek47QUFBQSxNQUE4TitSLElBQUV6RCxFQUFFN1AsS0FBbE87QUFBQSxNQUF3T3VULElBQUVMLEVBQUUvUyxRQUE1TztBQUFBLE1BQXFQbEcsSUFBRWlaLEVBQUVNLGNBQXpQO0FBQUEsTUFBd1FDLElBQUUzUyxNQUFNQyxPQUFoUjtBQUFBLE1BQXdSMlMsSUFBRS9ULE9BQU9DLElBQWpTO0FBQUEsTUFBc1NpRSxJQUFFbEUsT0FBTzBSLE1BQS9TO0FBQUEsTUFBc1RzQyxJQUFFLFNBQUZBLENBQUUsR0FBVSxDQUFFLENBQXBVO0FBQUEsTUFBcVVsVCxJQUFFLFNBQUZBLENBQUUsQ0FBU3NTLENBQVQsRUFBVztBQUFDLFdBQU9BLGFBQWF0UyxDQUFiLEdBQWVzUyxDQUFmLEdBQWlCLGdCQUFnQnRTLENBQWhCLEdBQWtCLE1BQUssS0FBS21ULFFBQUwsR0FBY2IsQ0FBbkIsQ0FBbEIsR0FBd0MsSUFBSXRTLENBQUosQ0FBTXNTLENBQU4sQ0FBaEU7QUFBeUUsR0FBNVosQ0FBNlosZUFBYSxPQUFPYyxPQUFwQixJQUE2QkEsUUFBUXpDLFFBQXJDLEdBQThDMkIsRUFBRTlSLENBQUYsR0FBSVIsQ0FBbEQsSUFBcUQsZUFBYSxPQUFPcVQsTUFBcEIsSUFBNEIsQ0FBQ0EsT0FBTzFDLFFBQXBDLElBQThDMEMsT0FBT0QsT0FBckQsS0FBK0RBLFVBQVFDLE9BQU9ELE9BQVAsR0FBZXBULENBQXRGLEdBQXlGb1QsUUFBUTVTLENBQVIsR0FBVVIsQ0FBeEosR0FBMkpBLEVBQUVzVCxPQUFGLEdBQVUsT0FBckssQ0FBNkssSUFBSUMsQ0FBSjtBQUFBLE1BQU1DLElBQUUsU0FBRkEsQ0FBRSxDQUFTWixDQUFULEVBQVdwWixDQUFYLEVBQWE4WSxDQUFiLEVBQWU7QUFBQyxRQUFHLEtBQUssQ0FBTCxLQUFTOVksQ0FBWixFQUFjLE9BQU9vWixDQUFQLENBQVMsUUFBTyxRQUFNTixDQUFOLEdBQVEsQ0FBUixHQUFVQSxDQUFqQixHQUFvQixLQUFLLENBQUw7QUFBTyxlQUFPLFVBQVNBLENBQVQsRUFBVztBQUFDLGlCQUFPTSxFQUFFN1AsSUFBRixDQUFPdkosQ0FBUCxFQUFTOFksQ0FBVCxDQUFQO0FBQW1CLFNBQXRDLENBQXVDLEtBQUssQ0FBTDtBQUFPLGVBQU8sVUFBU0EsQ0FBVCxFQUFXRSxDQUFYLEVBQWFRLENBQWIsRUFBZTtBQUFDLGlCQUFPSixFQUFFN1AsSUFBRixDQUFPdkosQ0FBUCxFQUFTOFksQ0FBVCxFQUFXRSxDQUFYLEVBQWFRLENBQWIsQ0FBUDtBQUF1QixTQUE5QyxDQUErQyxLQUFLLENBQUw7QUFBTyxlQUFPLFVBQVNWLENBQVQsRUFBV0UsQ0FBWCxFQUFhUSxDQUFiLEVBQWU1RCxDQUFmLEVBQWlCO0FBQUMsaUJBQU93RCxFQUFFN1AsSUFBRixDQUFPdkosQ0FBUCxFQUFTOFksQ0FBVCxFQUFXRSxDQUFYLEVBQWFRLENBQWIsRUFBZTVELENBQWYsQ0FBUDtBQUF5QixTQUFsRCxDQUEvSCxDQUFrTCxPQUFPLFlBQVU7QUFBQyxhQUFPd0QsRUFBRTlQLEtBQUYsQ0FBUXRKLENBQVIsRUFBVXdKLFNBQVYsQ0FBUDtBQUE0QixLQUE5QztBQUErQyxHQUFoUjtBQUFBLE1BQWlSeVEsSUFBRSxTQUFGQSxDQUFFLENBQVNuQixDQUFULEVBQVdFLENBQVgsRUFBYVEsQ0FBYixFQUFlO0FBQUMsV0FBT2hULEVBQUUwVCxRQUFGLEtBQWFILENBQWIsR0FBZXZULEVBQUUwVCxRQUFGLENBQVdwQixDQUFYLEVBQWFFLENBQWIsQ0FBZixHQUErQixRQUFNRixDQUFOLEdBQVF0UyxFQUFFMlQsUUFBVixHQUFtQjNULEVBQUU0VCxVQUFGLENBQWF0QixDQUFiLElBQWdCa0IsRUFBRWxCLENBQUYsRUFBSUUsQ0FBSixFQUFNUSxDQUFOLENBQWhCLEdBQXlCaFQsRUFBRTZULFFBQUYsQ0FBV3ZCLENBQVgsS0FBZSxDQUFDdFMsRUFBRU0sT0FBRixDQUFVZ1MsQ0FBVixDQUFoQixHQUE2QnRTLEVBQUU4VCxPQUFGLENBQVV4QixDQUFWLENBQTdCLEdBQTBDdFMsRUFBRStULFFBQUYsQ0FBV3pCLENBQVgsQ0FBNUg7QUFBMEksR0FBN2EsQ0FBOGF0UyxFQUFFMFQsUUFBRixHQUFXSCxJQUFFLFdBQVNqQixDQUFULEVBQVdFLENBQVgsRUFBYTtBQUFDLFdBQU9pQixFQUFFbkIsQ0FBRixFQUFJRSxDQUFKLEVBQU0sSUFBRSxDQUFSLENBQVA7QUFBa0IsR0FBN0MsQ0FBOEMsSUFBSXdCLElBQUUsU0FBRkEsQ0FBRSxDQUFTcEIsQ0FBVCxFQUFXcFosQ0FBWCxFQUFhO0FBQUMsV0FBT0EsSUFBRSxRQUFNQSxDQUFOLEdBQVFvWixFQUFFblosTUFBRixHQUFTLENBQWpCLEdBQW1CLENBQUNELENBQXRCLEVBQXdCLFlBQVU7QUFBQyxXQUFJLElBQUk4WSxJQUFFMVIsS0FBS3FULEdBQUwsQ0FBU2pSLFVBQVV2SixNQUFWLEdBQWlCRCxDQUExQixFQUE0QixDQUE1QixDQUFOLEVBQXFDZ1osSUFBRW5TLE1BQU1pUyxDQUFOLENBQXZDLEVBQWdEVSxJQUFFLENBQXRELEVBQXdEQSxJQUFFVixDQUExRCxFQUE0RFUsR0FBNUQ7QUFBZ0VSLFVBQUVRLENBQUYsSUFBS2hRLFVBQVVnUSxJQUFFeFosQ0FBWixDQUFMO0FBQWhFLE9BQW9GLFFBQU9BLENBQVAsR0FBVSxLQUFLLENBQUw7QUFBTyxpQkFBT29aLEVBQUU3UCxJQUFGLENBQU8sSUFBUCxFQUFZeVAsQ0FBWixDQUFQLENBQXNCLEtBQUssQ0FBTDtBQUFPLGlCQUFPSSxFQUFFN1AsSUFBRixDQUFPLElBQVAsRUFBWUMsVUFBVSxDQUFWLENBQVosRUFBeUJ3UCxDQUF6QixDQUFQLENBQW1DLEtBQUssQ0FBTDtBQUFPLGlCQUFPSSxFQUFFN1AsSUFBRixDQUFPLElBQVAsRUFBWUMsVUFBVSxDQUFWLENBQVosRUFBeUJBLFVBQVUsQ0FBVixDQUF6QixFQUFzQ3dQLENBQXRDLENBQVAsQ0FBeEYsQ0FBd0ksSUFBSXBELElBQUUvTyxNQUFNN0csSUFBRSxDQUFSLENBQU4sQ0FBaUIsS0FBSXdaLElBQUUsQ0FBTixFQUFRQSxJQUFFeFosQ0FBVixFQUFZd1osR0FBWjtBQUFnQjVELFVBQUU0RCxDQUFGLElBQUtoUSxVQUFVZ1EsQ0FBVixDQUFMO0FBQWhCLE9BQWtDLE9BQU81RCxFQUFFNVYsQ0FBRixJQUFLZ1osQ0FBTCxFQUFPSSxFQUFFOVAsS0FBRixDQUFRLElBQVIsRUFBYXNNLENBQWIsQ0FBZDtBQUE4QixLQUF2VjtBQUF3VixHQUE1VztBQUFBLE1BQTZXOEUsSUFBRSxTQUFGQSxDQUFFLENBQVM1QixDQUFULEVBQVc7QUFBQyxRQUFHLENBQUN0UyxFQUFFNlQsUUFBRixDQUFXdkIsQ0FBWCxDQUFKLEVBQWtCLE9BQU0sRUFBTixDQUFTLElBQUdsUCxDQUFILEVBQUssT0FBT0EsRUFBRWtQLENBQUYsQ0FBUCxDQUFZWSxFQUFFN08sU0FBRixHQUFZaU8sQ0FBWixDQUFjLElBQUlFLElBQUUsSUFBSVUsQ0FBSixFQUFOLENBQVksT0FBT0EsRUFBRTdPLFNBQUYsR0FBWSxJQUFaLEVBQWlCbU8sQ0FBeEI7QUFBMEIsR0FBM2Q7QUFBQSxNQUE0ZDJCLElBQUUsU0FBRkEsQ0FBRSxDQUFTM0IsQ0FBVCxFQUFXO0FBQUMsV0FBTyxVQUFTRixDQUFULEVBQVc7QUFBQyxhQUFPLFFBQU1BLENBQU4sR0FBUSxLQUFLLENBQWIsR0FBZUEsRUFBRUUsQ0FBRixDQUF0QjtBQUEyQixLQUE5QztBQUErQyxHQUF6aEI7QUFBQSxNQUEwaEJsUCxJQUFFLFNBQUZBLENBQUUsQ0FBU2dQLENBQVQsRUFBV0UsQ0FBWCxFQUFhO0FBQUMsV0FBTyxRQUFNRixDQUFOLElBQVM5WSxFQUFFdUosSUFBRixDQUFPdVAsQ0FBUCxFQUFTRSxDQUFULENBQWhCO0FBQTRCLEdBQXRrQjtBQUFBLE1BQXVrQjRCLElBQUUsU0FBRkEsQ0FBRSxDQUFTOUIsQ0FBVCxFQUFXRSxDQUFYLEVBQWE7QUFBQyxTQUFJLElBQUlRLElBQUVSLEVBQUUvWSxNQUFSLEVBQWUyVixJQUFFLENBQXJCLEVBQXVCQSxJQUFFNEQsQ0FBekIsRUFBMkI1RCxHQUEzQixFQUErQjtBQUFDLFVBQUcsUUFBTWtELENBQVQsRUFBVyxPQUFPQSxJQUFFQSxFQUFFRSxFQUFFcEQsQ0FBRixDQUFGLENBQUY7QUFBVSxZQUFPNEQsSUFBRVYsQ0FBRixHQUFJLEtBQUssQ0FBaEI7QUFBa0IsR0FBcnFCO0FBQUEsTUFBc3FCOVIsSUFBRUksS0FBS3lULEdBQUwsQ0FBUyxDQUFULEVBQVcsRUFBWCxJQUFlLENBQXZyQjtBQUFBLE1BQXlyQkMsSUFBRUgsRUFBRSxRQUFGLENBQTNyQjtBQUFBLE1BQXVzQnJVLElBQUUsU0FBRkEsQ0FBRSxDQUFTd1MsQ0FBVCxFQUFXO0FBQUMsUUFBSUUsSUFBRThCLEVBQUVoQyxDQUFGLENBQU4sQ0FBVyxPQUFNLFlBQVUsT0FBT0UsQ0FBakIsSUFBb0IsS0FBR0EsQ0FBdkIsSUFBMEJBLEtBQUdoUyxDQUFuQztBQUFxQyxHQUFyd0IsQ0FBc3dCUixFQUFFdVUsSUFBRixHQUFPdlUsRUFBRVosT0FBRixHQUFVLFVBQVNrVCxDQUFULEVBQVdFLENBQVgsRUFBYVEsQ0FBYixFQUFlO0FBQUMsUUFBSTVELENBQUosRUFBTXdELENBQU4sQ0FBUSxJQUFHSixJQUFFZ0IsRUFBRWhCLENBQUYsRUFBSVEsQ0FBSixDQUFGLEVBQVNsVCxFQUFFd1MsQ0FBRixDQUFaLEVBQWlCLEtBQUlsRCxJQUFFLENBQUYsRUFBSXdELElBQUVOLEVBQUU3WSxNQUFaLEVBQW1CMlYsSUFBRXdELENBQXJCLEVBQXVCeEQsR0FBdkI7QUFBMkJvRCxRQUFFRixFQUFFbEQsQ0FBRixDQUFGLEVBQU9BLENBQVAsRUFBU2tELENBQVQ7QUFBM0IsS0FBakIsTUFBNEQ7QUFBQyxVQUFJOVksSUFBRXdHLEVBQUViLElBQUYsQ0FBT21ULENBQVAsQ0FBTixDQUFnQixLQUFJbEQsSUFBRSxDQUFGLEVBQUl3RCxJQUFFcFosRUFBRUMsTUFBWixFQUFtQjJWLElBQUV3RCxDQUFyQixFQUF1QnhELEdBQXZCO0FBQTJCb0QsVUFBRUYsRUFBRTlZLEVBQUU0VixDQUFGLENBQUYsQ0FBRixFQUFVNVYsRUFBRTRWLENBQUYsQ0FBVixFQUFla0QsQ0FBZjtBQUEzQjtBQUE2QyxZQUFPQSxDQUFQO0FBQVMsR0FBNUssRUFBNkt0UyxFQUFFVyxHQUFGLEdBQU1YLEVBQUV3VSxPQUFGLEdBQVUsVUFBU2xDLENBQVQsRUFBV0UsQ0FBWCxFQUFhUSxDQUFiLEVBQWU7QUFBQ1IsUUFBRWlCLEVBQUVqQixDQUFGLEVBQUlRLENBQUosQ0FBRixDQUFTLEtBQUksSUFBSTVELElBQUUsQ0FBQ3RQLEVBQUV3UyxDQUFGLENBQUQsSUFBT3RTLEVBQUViLElBQUYsQ0FBT21ULENBQVAsQ0FBYixFQUF1Qk0sSUFBRSxDQUFDeEQsS0FBR2tELENBQUosRUFBTzdZLE1BQWhDLEVBQXVDRCxJQUFFNkcsTUFBTXVTLENBQU4sQ0FBekMsRUFBa0RILElBQUUsQ0FBeEQsRUFBMERBLElBQUVHLENBQTVELEVBQThESCxHQUE5RCxFQUFrRTtBQUFDLFVBQUlRLElBQUU3RCxJQUFFQSxFQUFFcUQsQ0FBRixDQUFGLEdBQU9BLENBQWIsQ0FBZWpaLEVBQUVpWixDQUFGLElBQUtELEVBQUVGLEVBQUVXLENBQUYsQ0FBRixFQUFPQSxDQUFQLEVBQVNYLENBQVQsQ0FBTDtBQUFpQixZQUFPOVksQ0FBUDtBQUFTLEdBQWxVLENBQW1VLElBQUlpYixJQUFFLFNBQUZBLENBQUUsQ0FBUzVCLENBQVQsRUFBVztBQUFDLFdBQU8sVUFBU1AsQ0FBVCxFQUFXRSxDQUFYLEVBQWFRLENBQWIsRUFBZTVELENBQWYsRUFBaUI7QUFBQyxVQUFJd0QsSUFBRSxLQUFHNVAsVUFBVXZKLE1BQW5CLENBQTBCLE9BQU8sVUFBUzZZLENBQVQsRUFBV0UsQ0FBWCxFQUFhUSxDQUFiLEVBQWU1RCxDQUFmLEVBQWlCO0FBQUMsWUFBSXdELElBQUUsQ0FBQzlTLEVBQUV3UyxDQUFGLENBQUQsSUFBT3RTLEVBQUViLElBQUYsQ0FBT21ULENBQVAsQ0FBYjtBQUFBLFlBQXVCOVksSUFBRSxDQUFDb1osS0FBR04sQ0FBSixFQUFPN1ksTUFBaEM7QUFBQSxZQUF1Q2daLElBQUUsSUFBRUksQ0FBRixHQUFJLENBQUosR0FBTXJaLElBQUUsQ0FBakQsQ0FBbUQsS0FBSTRWLE1BQUk0RCxJQUFFVixFQUFFTSxJQUFFQSxFQUFFSCxDQUFGLENBQUYsR0FBT0EsQ0FBVCxDQUFGLEVBQWNBLEtBQUdJLENBQXJCLENBQUosRUFBNEIsS0FBR0osQ0FBSCxJQUFNQSxJQUFFalosQ0FBcEMsRUFBc0NpWixLQUFHSSxDQUF6QyxFQUEyQztBQUFDLGNBQUlJLElBQUVMLElBQUVBLEVBQUVILENBQUYsQ0FBRixHQUFPQSxDQUFiLENBQWVPLElBQUVSLEVBQUVRLENBQUYsRUFBSVYsRUFBRVcsQ0FBRixDQUFKLEVBQVNBLENBQVQsRUFBV1gsQ0FBWCxDQUFGO0FBQWdCLGdCQUFPVSxDQUFQO0FBQVMsT0FBekosQ0FBMEpWLENBQTFKLEVBQTRKa0IsRUFBRWhCLENBQUYsRUFBSXBELENBQUosRUFBTSxDQUFOLENBQTVKLEVBQXFLNEQsQ0FBckssRUFBdUtKLENBQXZLLENBQVA7QUFBaUwsS0FBcE87QUFBcU8sR0FBdlAsQ0FBd1A1UyxFQUFFMFUsTUFBRixHQUFTMVUsRUFBRTJVLEtBQUYsR0FBUTNVLEVBQUU0VSxNQUFGLEdBQVNILEVBQUUsQ0FBRixDQUExQixFQUErQnpVLEVBQUU2VSxXQUFGLEdBQWM3VSxFQUFFOFUsS0FBRixHQUFRTCxFQUFFLENBQUMsQ0FBSCxDQUFyRCxFQUEyRHpVLEVBQUUrVSxJQUFGLEdBQU8vVSxFQUFFZ1YsTUFBRixHQUFTLFVBQVMxQyxDQUFULEVBQVdFLENBQVgsRUFBYVEsQ0FBYixFQUFlO0FBQUMsUUFBSTVELElBQUUsQ0FBQ3RQLEVBQUV3UyxDQUFGLElBQUt0UyxFQUFFa0YsU0FBUCxHQUFpQmxGLEVBQUVpVixPQUFwQixFQUE2QjNDLENBQTdCLEVBQStCRSxDQUEvQixFQUFpQ1EsQ0FBakMsQ0FBTixDQUEwQyxJQUFHLEtBQUssQ0FBTCxLQUFTNUQsQ0FBVCxJQUFZLENBQUMsQ0FBRCxLQUFLQSxDQUFwQixFQUFzQixPQUFPa0QsRUFBRWxELENBQUYsQ0FBUDtBQUFZLEdBQXZLLEVBQXdLcFAsRUFBRU8sTUFBRixHQUFTUCxFQUFFa1YsTUFBRixHQUFTLFVBQVM1QyxDQUFULEVBQVdsRCxDQUFYLEVBQWFvRCxDQUFiLEVBQWU7QUFBQyxRQUFJSSxJQUFFLEVBQU4sQ0FBUyxPQUFPeEQsSUFBRXFFLEVBQUVyRSxDQUFGLEVBQUlvRCxDQUFKLENBQUYsRUFBU3hTLEVBQUV1VSxJQUFGLENBQU9qQyxDQUFQLEVBQVMsVUFBU0EsQ0FBVCxFQUFXRSxDQUFYLEVBQWFRLENBQWIsRUFBZTtBQUFDNUQsUUFBRWtELENBQUYsRUFBSUUsQ0FBSixFQUFNUSxDQUFOLEtBQVVKLEVBQUU5UixJQUFGLENBQU93UixDQUFQLENBQVY7QUFBb0IsS0FBN0MsQ0FBVCxFQUF3RE0sQ0FBL0Q7QUFBaUUsR0FBcFIsRUFBcVI1UyxFQUFFMk4sTUFBRixHQUFTLFVBQVMyRSxDQUFULEVBQVdFLENBQVgsRUFBYVEsQ0FBYixFQUFlO0FBQUMsV0FBT2hULEVBQUVPLE1BQUYsQ0FBUytSLENBQVQsRUFBV3RTLEVBQUVtVixNQUFGLENBQVMxQixFQUFFakIsQ0FBRixDQUFULENBQVgsRUFBMEJRLENBQTFCLENBQVA7QUFBb0MsR0FBbFYsRUFBbVZoVCxFQUFFb1YsS0FBRixHQUFRcFYsRUFBRWtELEdBQUYsR0FBTSxVQUFTb1AsQ0FBVCxFQUFXRSxDQUFYLEVBQWFRLENBQWIsRUFBZTtBQUFDUixRQUFFaUIsRUFBRWpCLENBQUYsRUFBSVEsQ0FBSixDQUFGLENBQVMsS0FBSSxJQUFJNUQsSUFBRSxDQUFDdFAsRUFBRXdTLENBQUYsQ0FBRCxJQUFPdFMsRUFBRWIsSUFBRixDQUFPbVQsQ0FBUCxDQUFiLEVBQXVCTSxJQUFFLENBQUN4RCxLQUFHa0QsQ0FBSixFQUFPN1ksTUFBaEMsRUFBdUNELElBQUUsQ0FBN0MsRUFBK0NBLElBQUVvWixDQUFqRCxFQUFtRHBaLEdBQW5ELEVBQXVEO0FBQUMsVUFBSWlaLElBQUVyRCxJQUFFQSxFQUFFNVYsQ0FBRixDQUFGLEdBQU9BLENBQWIsQ0FBZSxJQUFHLENBQUNnWixFQUFFRixFQUFFRyxDQUFGLENBQUYsRUFBT0EsQ0FBUCxFQUFTSCxDQUFULENBQUosRUFBZ0IsT0FBTSxDQUFDLENBQVA7QUFBUyxZQUFNLENBQUMsQ0FBUDtBQUFTLEdBQW5lLEVBQW9ldFMsRUFBRXFWLElBQUYsR0FBT3JWLEVBQUVzVixHQUFGLEdBQU0sVUFBU2hELENBQVQsRUFBV0UsQ0FBWCxFQUFhUSxDQUFiLEVBQWU7QUFBQ1IsUUFBRWlCLEVBQUVqQixDQUFGLEVBQUlRLENBQUosQ0FBRixDQUFTLEtBQUksSUFBSTVELElBQUUsQ0FBQ3RQLEVBQUV3UyxDQUFGLENBQUQsSUFBT3RTLEVBQUViLElBQUYsQ0FBT21ULENBQVAsQ0FBYixFQUF1Qk0sSUFBRSxDQUFDeEQsS0FBR2tELENBQUosRUFBTzdZLE1BQWhDLEVBQXVDRCxJQUFFLENBQTdDLEVBQStDQSxJQUFFb1osQ0FBakQsRUFBbURwWixHQUFuRCxFQUF1RDtBQUFDLFVBQUlpWixJQUFFckQsSUFBRUEsRUFBRTVWLENBQUYsQ0FBRixHQUFPQSxDQUFiLENBQWUsSUFBR2daLEVBQUVGLEVBQUVHLENBQUYsQ0FBRixFQUFPQSxDQUFQLEVBQVNILENBQVQsQ0FBSCxFQUFlLE9BQU0sQ0FBQyxDQUFQO0FBQVMsWUFBTSxDQUFDLENBQVA7QUFBUyxHQUFsbkIsRUFBbW5CdFMsRUFBRXVWLFFBQUYsR0FBV3ZWLEVBQUV3VixRQUFGLEdBQVd4VixFQUFFeVYsT0FBRixHQUFVLFVBQVNuRCxDQUFULEVBQVdFLENBQVgsRUFBYVEsQ0FBYixFQUFlNUQsQ0FBZixFQUFpQjtBQUFDLFdBQU90UCxFQUFFd1MsQ0FBRixNQUFPQSxJQUFFdFMsRUFBRWlRLE1BQUYsQ0FBU3FDLENBQVQsQ0FBVCxHQUFzQixDQUFDLFlBQVUsT0FBT1UsQ0FBakIsSUFBb0I1RCxDQUFyQixNQUEwQjRELElBQUUsQ0FBNUIsQ0FBdEIsRUFBcUQsS0FBR2hULEVBQUVMLE9BQUYsQ0FBVTJTLENBQVYsRUFBWUUsQ0FBWixFQUFjUSxDQUFkLENBQS9EO0FBQWdGLEdBQXJ2QixFQUFzdkJoVCxFQUFFMFYsTUFBRixHQUFTMUIsRUFBRSxVQUFTMUIsQ0FBVCxFQUFXVSxDQUFYLEVBQWE1RCxDQUFiLEVBQWU7QUFBQyxRQUFJd0QsQ0FBSixFQUFNcFosQ0FBTixDQUFRLE9BQU93RyxFQUFFNFQsVUFBRixDQUFhWixDQUFiLElBQWdCeFosSUFBRXdaLENBQWxCLEdBQW9CaFQsRUFBRU0sT0FBRixDQUFVMFMsQ0FBVixNQUFlSixJQUFFSSxFQUFFelQsS0FBRixDQUFRLENBQVIsRUFBVSxDQUFDLENBQVgsQ0FBRixFQUFnQnlULElBQUVBLEVBQUVBLEVBQUV2WixNQUFGLEdBQVMsQ0FBWCxDQUFqQyxDQUFwQixFQUFvRXVHLEVBQUVXLEdBQUYsQ0FBTTJSLENBQU4sRUFBUSxVQUFTQSxDQUFULEVBQVc7QUFBQyxVQUFJRSxJQUFFaFosQ0FBTixDQUFRLElBQUcsQ0FBQ2daLENBQUosRUFBTTtBQUFDLFlBQUdJLEtBQUdBLEVBQUVuWixNQUFMLEtBQWM2WSxJQUFFOEIsRUFBRTlCLENBQUYsRUFBSU0sQ0FBSixDQUFoQixHQUF3QixRQUFNTixDQUFqQyxFQUFtQyxPQUFPRSxJQUFFRixFQUFFVSxDQUFGLENBQUY7QUFBTyxjQUFPLFFBQU1SLENBQU4sR0FBUUEsQ0FBUixHQUFVQSxFQUFFMVAsS0FBRixDQUFRd1AsQ0FBUixFQUFVbEQsQ0FBVixDQUFqQjtBQUE4QixLQUFsSCxDQUEzRTtBQUErTCxHQUF6TixDQUEvdkIsRUFBMDlCcFAsRUFBRTJWLEtBQUYsR0FBUSxVQUFTckQsQ0FBVCxFQUFXRSxDQUFYLEVBQWE7QUFBQyxXQUFPeFMsRUFBRVcsR0FBRixDQUFNMlIsQ0FBTixFQUFRdFMsRUFBRStULFFBQUYsQ0FBV3ZCLENBQVgsQ0FBUixDQUFQO0FBQThCLEdBQTlnQyxFQUErZ0N4UyxFQUFFNFYsS0FBRixHQUFRLFVBQVN0RCxDQUFULEVBQVdFLENBQVgsRUFBYTtBQUFDLFdBQU94UyxFQUFFTyxNQUFGLENBQVMrUixDQUFULEVBQVd0UyxFQUFFOFQsT0FBRixDQUFVdEIsQ0FBVixDQUFYLENBQVA7QUFBZ0MsR0FBcmtDLEVBQXNrQ3hTLEVBQUVnRixTQUFGLEdBQVksVUFBU3NOLENBQVQsRUFBV0UsQ0FBWCxFQUFhO0FBQUMsV0FBT3hTLEVBQUUrVSxJQUFGLENBQU96QyxDQUFQLEVBQVN0UyxFQUFFOFQsT0FBRixDQUFVdEIsQ0FBVixDQUFULENBQVA7QUFBOEIsR0FBOW5DLEVBQStuQ3hTLEVBQUVpVSxHQUFGLEdBQU0sVUFBUzNCLENBQVQsRUFBV2xELENBQVgsRUFBYW9ELENBQWIsRUFBZTtBQUFDLFFBQUlRLENBQUo7QUFBQSxRQUFNSixDQUFOO0FBQUEsUUFBUXBaLElBQUUsQ0FBQyxDQUFELEdBQUcsQ0FBYjtBQUFBLFFBQWVpWixJQUFFLENBQUMsQ0FBRCxHQUFHLENBQXBCLENBQXNCLElBQUcsUUFBTXJELENBQU4sSUFBUyxZQUFVLE9BQU9BLENBQWpCLElBQW9CLG9CQUFpQmtELEVBQUUsQ0FBRixDQUFqQixDQUFwQixJQUEyQyxRQUFNQSxDQUE3RCxFQUErRCxLQUFJLElBQUlXLElBQUUsQ0FBTixFQUFRSixJQUFFLENBQUNQLElBQUV4UyxFQUFFd1MsQ0FBRixJQUFLQSxDQUFMLEdBQU90UyxFQUFFaVEsTUFBRixDQUFTcUMsQ0FBVCxDQUFWLEVBQXVCN1ksTUFBckMsRUFBNEN3WixJQUFFSixDQUE5QyxFQUFnREksR0FBaEQ7QUFBb0QsZUFBT0QsSUFBRVYsRUFBRVcsQ0FBRixDQUFULEtBQWdCelosSUFBRXdaLENBQWxCLEtBQXNCeFosSUFBRXdaLENBQXhCO0FBQXBELEtBQS9ELE1BQW1KNUQsSUFBRXFFLEVBQUVyRSxDQUFGLEVBQUlvRCxDQUFKLENBQUYsRUFBU3hTLEVBQUV1VSxJQUFGLENBQU9qQyxDQUFQLEVBQVMsVUFBU0EsQ0FBVCxFQUFXRSxDQUFYLEVBQWFRLENBQWIsRUFBZTtBQUFDSixVQUFFeEQsRUFBRWtELENBQUYsRUFBSUUsQ0FBSixFQUFNUSxDQUFOLENBQUYsRUFBVyxDQUFDUCxJQUFFRyxDQUFGLElBQUtBLE1BQUksQ0FBQyxDQUFELEdBQUcsQ0FBUCxJQUFVcFosTUFBSSxDQUFDLENBQUQsR0FBRyxDQUF2QixNQUE0QkEsSUFBRThZLENBQUYsRUFBSUcsSUFBRUcsQ0FBbEMsQ0FBWDtBQUFnRCxLQUF6RSxDQUFULENBQW9GLE9BQU9wWixDQUFQO0FBQVMsR0FBMzVDLEVBQTQ1Q3dHLEVBQUU2VixHQUFGLEdBQU0sVUFBU3ZELENBQVQsRUFBV2xELENBQVgsRUFBYW9ELENBQWIsRUFBZTtBQUFDLFFBQUlRLENBQUo7QUFBQSxRQUFNSixDQUFOO0FBQUEsUUFBUXBaLElBQUUsSUFBRSxDQUFaO0FBQUEsUUFBY2laLElBQUUsSUFBRSxDQUFsQixDQUFvQixJQUFHLFFBQU1yRCxDQUFOLElBQVMsWUFBVSxPQUFPQSxDQUFqQixJQUFvQixvQkFBaUJrRCxFQUFFLENBQUYsQ0FBakIsQ0FBcEIsSUFBMkMsUUFBTUEsQ0FBN0QsRUFBK0QsS0FBSSxJQUFJVyxJQUFFLENBQU4sRUFBUUosSUFBRSxDQUFDUCxJQUFFeFMsRUFBRXdTLENBQUYsSUFBS0EsQ0FBTCxHQUFPdFMsRUFBRWlRLE1BQUYsQ0FBU3FDLENBQVQsQ0FBVixFQUF1QjdZLE1BQXJDLEVBQTRDd1osSUFBRUosQ0FBOUMsRUFBZ0RJLEdBQWhEO0FBQW9ELGVBQU9ELElBQUVWLEVBQUVXLENBQUYsQ0FBVCxLQUFnQkQsSUFBRXhaLENBQWxCLEtBQXNCQSxJQUFFd1osQ0FBeEI7QUFBcEQsS0FBL0QsTUFBbUo1RCxJQUFFcUUsRUFBRXJFLENBQUYsRUFBSW9ELENBQUosQ0FBRixFQUFTeFMsRUFBRXVVLElBQUYsQ0FBT2pDLENBQVAsRUFBUyxVQUFTQSxDQUFULEVBQVdFLENBQVgsRUFBYVEsQ0FBYixFQUFlO0FBQUMsT0FBQyxDQUFDSixJQUFFeEQsRUFBRWtELENBQUYsRUFBSUUsQ0FBSixFQUFNUSxDQUFOLENBQUgsSUFBYVAsQ0FBYixJQUFnQkcsTUFBSSxJQUFFLENBQU4sSUFBU3BaLE1BQUksSUFBRSxDQUFoQyxNQUFxQ0EsSUFBRThZLENBQUYsRUFBSUcsSUFBRUcsQ0FBM0M7QUFBOEMsS0FBdkUsQ0FBVCxDQUFrRixPQUFPcFosQ0FBUDtBQUFTLEdBQXByRCxFQUFxckR3RyxFQUFFOFYsT0FBRixHQUFVLFVBQVN4RCxDQUFULEVBQVc7QUFBQyxXQUFPdFMsRUFBRStWLE1BQUYsQ0FBU3pELENBQVQsRUFBVyxJQUFFLENBQWIsQ0FBUDtBQUF1QixHQUFsdUQsRUFBbXVEdFMsRUFBRStWLE1BQUYsR0FBUyxVQUFTekQsQ0FBVCxFQUFXRSxDQUFYLEVBQWFRLENBQWIsRUFBZTtBQUFDLFFBQUcsUUFBTVIsQ0FBTixJQUFTUSxDQUFaLEVBQWMsT0FBT2xULEVBQUV3UyxDQUFGLE1BQU9BLElBQUV0UyxFQUFFaVEsTUFBRixDQUFTcUMsQ0FBVCxDQUFULEdBQXNCQSxFQUFFdFMsRUFBRWdXLE1BQUYsQ0FBUzFELEVBQUU3WSxNQUFGLEdBQVMsQ0FBbEIsQ0FBRixDQUE3QixDQUFxRCxJQUFJMlYsSUFBRXRQLEVBQUV3UyxDQUFGLElBQUt0UyxFQUFFaVcsS0FBRixDQUFRM0QsQ0FBUixDQUFMLEdBQWdCdFMsRUFBRWlRLE1BQUYsQ0FBU3FDLENBQVQsQ0FBdEI7QUFBQSxRQUFrQ00sSUFBRTBCLEVBQUVsRixDQUFGLENBQXBDLENBQXlDb0QsSUFBRTVSLEtBQUtxVCxHQUFMLENBQVNyVCxLQUFLaVYsR0FBTCxDQUFTckQsQ0FBVCxFQUFXSSxDQUFYLENBQVQsRUFBdUIsQ0FBdkIsQ0FBRixDQUE0QixLQUFJLElBQUlwWixJQUFFb1osSUFBRSxDQUFSLEVBQVVILElBQUUsQ0FBaEIsRUFBa0JBLElBQUVELENBQXBCLEVBQXNCQyxHQUF0QixFQUEwQjtBQUFDLFVBQUlRLElBQUVqVCxFQUFFZ1csTUFBRixDQUFTdkQsQ0FBVCxFQUFXalosQ0FBWCxDQUFOO0FBQUEsVUFBb0JxWixJQUFFekQsRUFBRXFELENBQUYsQ0FBdEIsQ0FBMkJyRCxFQUFFcUQsQ0FBRixJQUFLckQsRUFBRTZELENBQUYsQ0FBTCxFQUFVN0QsRUFBRTZELENBQUYsSUFBS0osQ0FBZjtBQUFpQixZQUFPekQsRUFBRTdQLEtBQUYsQ0FBUSxDQUFSLEVBQVVpVCxDQUFWLENBQVA7QUFBb0IsR0FBLzlELEVBQWcrRHhTLEVBQUVrVyxNQUFGLEdBQVMsVUFBUzVELENBQVQsRUFBV2xELENBQVgsRUFBYW9ELENBQWIsRUFBZTtBQUFDLFFBQUlJLElBQUUsQ0FBTixDQUFRLE9BQU94RCxJQUFFcUUsRUFBRXJFLENBQUYsRUFBSW9ELENBQUosQ0FBRixFQUFTeFMsRUFBRTJWLEtBQUYsQ0FBUTNWLEVBQUVXLEdBQUYsQ0FBTTJSLENBQU4sRUFBUSxVQUFTQSxDQUFULEVBQVdFLENBQVgsRUFBYVEsQ0FBYixFQUFlO0FBQUMsYUFBTSxFQUFDdkYsT0FBTTZFLENBQVAsRUFBU3pTLE9BQU0rUyxHQUFmLEVBQW1CdUQsVUFBUy9HLEVBQUVrRCxDQUFGLEVBQUlFLENBQUosRUFBTVEsQ0FBTixDQUE1QixFQUFOO0FBQTRDLEtBQXBFLEVBQXNFalMsSUFBdEUsQ0FBMkUsVUFBU3VSLENBQVQsRUFBV0UsQ0FBWCxFQUFhO0FBQUMsVUFBSVEsSUFBRVYsRUFBRTZELFFBQVI7QUFBQSxVQUFpQi9HLElBQUVvRCxFQUFFMkQsUUFBckIsQ0FBOEIsSUFBR25ELE1BQUk1RCxDQUFQLEVBQVM7QUFBQyxZQUFHQSxJQUFFNEQsQ0FBRixJQUFLLEtBQUssQ0FBTCxLQUFTQSxDQUFqQixFQUFtQixPQUFPLENBQVAsQ0FBUyxJQUFHQSxJQUFFNUQsQ0FBRixJQUFLLEtBQUssQ0FBTCxLQUFTQSxDQUFqQixFQUFtQixPQUFNLENBQUMsQ0FBUDtBQUFTLGNBQU9rRCxFQUFFelMsS0FBRixHQUFRMlMsRUFBRTNTLEtBQWpCO0FBQXVCLEtBQWhOLENBQVIsRUFBME4sT0FBMU4sQ0FBaEI7QUFBbVAsR0FBcHZFLENBQXF2RSxJQUFJMEQsSUFBRSxTQUFGQSxDQUFFLENBQVNrUCxDQUFULEVBQVdELENBQVgsRUFBYTtBQUFDLFdBQU8sVUFBU3BELENBQVQsRUFBV3dELENBQVgsRUFBYU4sQ0FBYixFQUFlO0FBQUMsVUFBSTlZLElBQUVnWixJQUFFLENBQUMsRUFBRCxFQUFJLEVBQUosQ0FBRixHQUFVLEVBQWhCLENBQW1CLE9BQU9JLElBQUVhLEVBQUViLENBQUYsRUFBSU4sQ0FBSixDQUFGLEVBQVN0UyxFQUFFdVUsSUFBRixDQUFPbkYsQ0FBUCxFQUFTLFVBQVNrRCxDQUFULEVBQVdFLENBQVgsRUFBYTtBQUFDLFlBQUlRLElBQUVKLEVBQUVOLENBQUYsRUFBSUUsQ0FBSixFQUFNcEQsQ0FBTixDQUFOLENBQWVxRCxFQUFFalosQ0FBRixFQUFJOFksQ0FBSixFQUFNVSxDQUFOO0FBQVMsT0FBL0MsQ0FBVCxFQUEwRHhaLENBQWpFO0FBQW1FLEtBQTdHO0FBQThHLEdBQWxJLENBQW1Jd0csRUFBRW9XLE9BQUYsR0FBVTdTLEVBQUUsVUFBUytPLENBQVQsRUFBV0UsQ0FBWCxFQUFhUSxDQUFiLEVBQWU7QUFBQzFQLE1BQUVnUCxDQUFGLEVBQUlVLENBQUosSUFBT1YsRUFBRVUsQ0FBRixFQUFLbFMsSUFBTCxDQUFVMFIsQ0FBVixDQUFQLEdBQW9CRixFQUFFVSxDQUFGLElBQUssQ0FBQ1IsQ0FBRCxDQUF6QjtBQUE2QixHQUEvQyxDQUFWLEVBQTJEeFMsRUFBRXFXLE9BQUYsR0FBVTlTLEVBQUUsVUFBUytPLENBQVQsRUFBV0UsQ0FBWCxFQUFhUSxDQUFiLEVBQWU7QUFBQ1YsTUFBRVUsQ0FBRixJQUFLUixDQUFMO0FBQU8sR0FBekIsQ0FBckUsRUFBZ0d4UyxFQUFFc1csT0FBRixHQUFVL1MsRUFBRSxVQUFTK08sQ0FBVCxFQUFXRSxDQUFYLEVBQWFRLENBQWIsRUFBZTtBQUFDMVAsTUFBRWdQLENBQUYsRUFBSVUsQ0FBSixJQUFPVixFQUFFVSxDQUFGLEdBQVAsR0FBY1YsRUFBRVUsQ0FBRixJQUFLLENBQW5CO0FBQXFCLEdBQXZDLENBQTFHLENBQW1KLElBQUl1RCxJQUFFLGtFQUFOLENBQXlFdlcsRUFBRXdXLE9BQUYsR0FBVSxVQUFTbEUsQ0FBVCxFQUFXO0FBQUMsV0FBT0EsSUFBRXRTLEVBQUVNLE9BQUYsQ0FBVWdTLENBQVYsSUFBYU8sRUFBRTlQLElBQUYsQ0FBT3VQLENBQVAsQ0FBYixHQUF1QnRTLEVBQUV5VyxRQUFGLENBQVduRSxDQUFYLElBQWNBLEVBQUVvRSxLQUFGLENBQVFILENBQVIsQ0FBZCxHQUF5QnpXLEVBQUV3UyxDQUFGLElBQUt0UyxFQUFFVyxHQUFGLENBQU0yUixDQUFOLEVBQVF0UyxFQUFFMlQsUUFBVixDQUFMLEdBQXlCM1QsRUFBRWlRLE1BQUYsQ0FBU3FDLENBQVQsQ0FBM0UsR0FBdUYsRUFBOUY7QUFBaUcsR0FBdkgsRUFBd0h0UyxFQUFFMlcsSUFBRixHQUFPLFVBQVNyRSxDQUFULEVBQVc7QUFBQyxXQUFPLFFBQU1BLENBQU4sR0FBUSxDQUFSLEdBQVV4UyxFQUFFd1MsQ0FBRixJQUFLQSxFQUFFN1ksTUFBUCxHQUFjdUcsRUFBRWIsSUFBRixDQUFPbVQsQ0FBUCxFQUFVN1ksTUFBekM7QUFBZ0QsR0FBM0wsRUFBNEx1RyxFQUFFNFcsU0FBRixHQUFZclQsRUFBRSxVQUFTK08sQ0FBVCxFQUFXRSxDQUFYLEVBQWFRLENBQWIsRUFBZTtBQUFDVixNQUFFVSxJQUFFLENBQUYsR0FBSSxDQUFOLEVBQVNsUyxJQUFULENBQWMwUixDQUFkO0FBQWlCLEdBQW5DLEVBQW9DLENBQUMsQ0FBckMsQ0FBeE0sRUFBZ1B4UyxFQUFFNlcsS0FBRixHQUFRN1csRUFBRThXLElBQUYsR0FBTzlXLEVBQUUrVyxJQUFGLEdBQU8sVUFBU3pFLENBQVQsRUFBV0UsQ0FBWCxFQUFhUSxDQUFiLEVBQWU7QUFBQyxXQUFPLFFBQU1WLENBQU4sSUFBU0EsRUFBRTdZLE1BQUYsR0FBUyxDQUFsQixHQUFvQixRQUFNK1ksQ0FBTixHQUFRLEtBQUssQ0FBYixHQUFlLEVBQW5DLEdBQXNDLFFBQU1BLENBQU4sSUFBU1EsQ0FBVCxHQUFXVixFQUFFLENBQUYsQ0FBWCxHQUFnQnRTLEVBQUVnWCxPQUFGLENBQVUxRSxDQUFWLEVBQVlBLEVBQUU3WSxNQUFGLEdBQVMrWSxDQUFyQixDQUE3RDtBQUFxRixHQUEzVyxFQUE0V3hTLEVBQUVnWCxPQUFGLEdBQVUsVUFBUzFFLENBQVQsRUFBV0UsQ0FBWCxFQUFhUSxDQUFiLEVBQWU7QUFBQyxXQUFPSCxFQUFFOVAsSUFBRixDQUFPdVAsQ0FBUCxFQUFTLENBQVQsRUFBVzFSLEtBQUtxVCxHQUFMLENBQVMsQ0FBVCxFQUFXM0IsRUFBRTdZLE1BQUYsSUFBVSxRQUFNK1ksQ0FBTixJQUFTUSxDQUFULEdBQVcsQ0FBWCxHQUFhUixDQUF2QixDQUFYLENBQVgsQ0FBUDtBQUF5RCxHQUEvYixFQUFnY3hTLEVBQUVpWCxJQUFGLEdBQU8sVUFBUzNFLENBQVQsRUFBV0UsQ0FBWCxFQUFhUSxDQUFiLEVBQWU7QUFBQyxXQUFPLFFBQU1WLENBQU4sSUFBU0EsRUFBRTdZLE1BQUYsR0FBUyxDQUFsQixHQUFvQixRQUFNK1ksQ0FBTixHQUFRLEtBQUssQ0FBYixHQUFlLEVBQW5DLEdBQXNDLFFBQU1BLENBQU4sSUFBU1EsQ0FBVCxHQUFXVixFQUFFQSxFQUFFN1ksTUFBRixHQUFTLENBQVgsQ0FBWCxHQUF5QnVHLEVBQUVrWCxJQUFGLENBQU81RSxDQUFQLEVBQVMxUixLQUFLcVQsR0FBTCxDQUFTLENBQVQsRUFBVzNCLEVBQUU3WSxNQUFGLEdBQVMrWSxDQUFwQixDQUFULENBQXRFO0FBQXVHLEdBQTlqQixFQUErakJ4UyxFQUFFa1gsSUFBRixHQUFPbFgsRUFBRW1YLElBQUYsR0FBT25YLEVBQUVvWCxJQUFGLEdBQU8sVUFBUzlFLENBQVQsRUFBV0UsQ0FBWCxFQUFhUSxDQUFiLEVBQWU7QUFBQyxXQUFPSCxFQUFFOVAsSUFBRixDQUFPdVAsQ0FBUCxFQUFTLFFBQU1FLENBQU4sSUFBU1EsQ0FBVCxHQUFXLENBQVgsR0FBYVIsQ0FBdEIsQ0FBUDtBQUFnQyxHQUFwb0IsRUFBcW9CeFMsRUFBRXFYLE9BQUYsR0FBVSxVQUFTL0UsQ0FBVCxFQUFXO0FBQUMsV0FBT3RTLEVBQUVPLE1BQUYsQ0FBUytSLENBQVQsRUFBV2dGLE9BQVgsQ0FBUDtBQUEyQixHQUF0ckIsQ0FBdXJCLElBQUlDLElBQUUsU0FBRkEsQ0FBRSxDQUFTakYsQ0FBVCxFQUFXRSxDQUFYLEVBQWFRLENBQWIsRUFBZTVELENBQWYsRUFBaUI7QUFBQyxTQUFJLElBQUl3RCxJQUFFLENBQUN4RCxJQUFFQSxLQUFHLEVBQU4sRUFBVTNWLE1BQWhCLEVBQXVCRCxJQUFFLENBQXpCLEVBQTJCaVosSUFBRTZCLEVBQUVoQyxDQUFGLENBQWpDLEVBQXNDOVksSUFBRWlaLENBQXhDLEVBQTBDalosR0FBMUMsRUFBOEM7QUFBQyxVQUFJeVosSUFBRVgsRUFBRTlZLENBQUYsQ0FBTixDQUFXLElBQUdzRyxFQUFFbVQsQ0FBRixNQUFPalQsRUFBRU0sT0FBRixDQUFVMlMsQ0FBVixLQUFjalQsRUFBRXdYLFdBQUYsQ0FBY3ZFLENBQWQsQ0FBckIsQ0FBSDtBQUEwQyxZQUFHVCxDQUFILEVBQUssS0FBSSxJQUFJSyxJQUFFLENBQU4sRUFBUXpQLElBQUU2UCxFQUFFeFosTUFBaEIsRUFBdUJvWixJQUFFelAsQ0FBekI7QUFBNEJnTSxZQUFFd0QsR0FBRixJQUFPSyxFQUFFSixHQUFGLENBQVA7QUFBNUIsU0FBTCxNQUFvRDBFLEVBQUV0RSxDQUFGLEVBQUlULENBQUosRUFBTVEsQ0FBTixFQUFRNUQsQ0FBUixHQUFXd0QsSUFBRXhELEVBQUUzVixNQUFmO0FBQTlGLGFBQXlIdVosTUFBSTVELEVBQUV3RCxHQUFGLElBQU9LLENBQVg7QUFBYyxZQUFPN0QsQ0FBUDtBQUFTLEdBQWxPLENBQW1PcFAsRUFBRXlYLE9BQUYsR0FBVSxVQUFTbkYsQ0FBVCxFQUFXRSxDQUFYLEVBQWE7QUFBQyxXQUFPK0UsRUFBRWpGLENBQUYsRUFBSUUsQ0FBSixFQUFNLENBQUMsQ0FBUCxDQUFQO0FBQWlCLEdBQXpDLEVBQTBDeFMsRUFBRTBYLE9BQUYsR0FBVTFELEVBQUUsVUFBUzFCLENBQVQsRUFBV0UsQ0FBWCxFQUFhO0FBQUMsV0FBT3hTLEVBQUUyWCxVQUFGLENBQWFyRixDQUFiLEVBQWVFLENBQWYsQ0FBUDtBQUF5QixHQUF6QyxDQUFwRCxFQUErRnhTLEVBQUU0WCxJQUFGLEdBQU81WCxFQUFFNlgsTUFBRixHQUFTLFVBQVN2RixDQUFULEVBQVdFLENBQVgsRUFBYVEsQ0FBYixFQUFlNUQsQ0FBZixFQUFpQjtBQUFDcFAsTUFBRThYLFNBQUYsQ0FBWXRGLENBQVosTUFBaUJwRCxJQUFFNEQsQ0FBRixFQUFJQSxJQUFFUixDQUFOLEVBQVFBLElBQUUsQ0FBQyxDQUE1QixHQUErQixRQUFNUSxDQUFOLEtBQVVBLElBQUVTLEVBQUVULENBQUYsRUFBSTVELENBQUosQ0FBWixDQUEvQixDQUFtRCxLQUFJLElBQUl3RCxJQUFFLEVBQU4sRUFBU3BaLElBQUUsRUFBWCxFQUFjaVosSUFBRSxDQUFoQixFQUFrQlEsSUFBRXFCLEVBQUVoQyxDQUFGLENBQXhCLEVBQTZCRyxJQUFFUSxDQUEvQixFQUFpQ1IsR0FBakMsRUFBcUM7QUFBQyxVQUFJSSxJQUFFUCxFQUFFRyxDQUFGLENBQU47QUFBQSxVQUFXclAsSUFBRTRQLElBQUVBLEVBQUVILENBQUYsRUFBSUosQ0FBSixFQUFNSCxDQUFOLENBQUYsR0FBV08sQ0FBeEIsQ0FBMEJMLEtBQUcsQ0FBQ1EsQ0FBSixJQUFPUCxLQUFHalosTUFBSTRKLENBQVAsSUFBVXdQLEVBQUU5UixJQUFGLENBQU8rUixDQUFQLENBQVYsRUFBb0JyWixJQUFFNEosQ0FBN0IsSUFBZ0M0UCxJQUFFaFQsRUFBRXVWLFFBQUYsQ0FBVy9iLENBQVgsRUFBYTRKLENBQWIsTUFBa0I1SixFQUFFc0gsSUFBRixDQUFPc0MsQ0FBUCxHQUFVd1AsRUFBRTlSLElBQUYsQ0FBTytSLENBQVAsQ0FBNUIsQ0FBRixHQUF5QzdTLEVBQUV1VixRQUFGLENBQVczQyxDQUFYLEVBQWFDLENBQWIsS0FBaUJELEVBQUU5UixJQUFGLENBQU8rUixDQUFQLENBQTFGO0FBQW9HLFlBQU9ELENBQVA7QUFBUyxHQUFqVyxFQUFrVzVTLEVBQUUrWCxLQUFGLEdBQVEvRCxFQUFFLFVBQVMxQixDQUFULEVBQVc7QUFBQyxXQUFPdFMsRUFBRTRYLElBQUYsQ0FBT0wsRUFBRWpGLENBQUYsRUFBSSxDQUFDLENBQUwsRUFBTyxDQUFDLENBQVIsQ0FBUCxDQUFQO0FBQTBCLEdBQXhDLENBQTFXLEVBQW9adFMsRUFBRWdZLFlBQUYsR0FBZSxVQUFTMUYsQ0FBVCxFQUFXO0FBQUMsU0FBSSxJQUFJRSxJQUFFLEVBQU4sRUFBU1EsSUFBRWhRLFVBQVV2SixNQUFyQixFQUE0QjJWLElBQUUsQ0FBOUIsRUFBZ0N3RCxJQUFFMEIsRUFBRWhDLENBQUYsQ0FBdEMsRUFBMkNsRCxJQUFFd0QsQ0FBN0MsRUFBK0N4RCxHQUEvQyxFQUFtRDtBQUFDLFVBQUk1VixJQUFFOFksRUFBRWxELENBQUYsQ0FBTixDQUFXLElBQUcsQ0FBQ3BQLEVBQUV1VixRQUFGLENBQVcvQyxDQUFYLEVBQWFoWixDQUFiLENBQUosRUFBb0I7QUFBQyxZQUFJaVosQ0FBSixDQUFNLEtBQUlBLElBQUUsQ0FBTixFQUFRQSxJQUFFTyxDQUFGLElBQUtoVCxFQUFFdVYsUUFBRixDQUFXdlMsVUFBVXlQLENBQVYsQ0FBWCxFQUF3QmpaLENBQXhCLENBQWIsRUFBd0NpWixHQUF4QyxJQUE2Q0EsTUFBSU8sQ0FBSixJQUFPUixFQUFFMVIsSUFBRixDQUFPdEgsQ0FBUCxDQUFQO0FBQWlCO0FBQUMsWUFBT2daLENBQVA7QUFBUyxHQUFqbEIsRUFBa2xCeFMsRUFBRTJYLFVBQUYsR0FBYTNELEVBQUUsVUFBUzFCLENBQVQsRUFBV0UsQ0FBWCxFQUFhO0FBQUMsV0FBT0EsSUFBRStFLEVBQUUvRSxDQUFGLEVBQUksQ0FBQyxDQUFMLEVBQU8sQ0FBQyxDQUFSLENBQUYsRUFBYXhTLEVBQUVPLE1BQUYsQ0FBUytSLENBQVQsRUFBVyxVQUFTQSxDQUFULEVBQVc7QUFBQyxhQUFNLENBQUN0UyxFQUFFdVYsUUFBRixDQUFXL0MsQ0FBWCxFQUFhRixDQUFiLENBQVA7QUFBdUIsS0FBOUMsQ0FBcEI7QUFBb0UsR0FBcEYsQ0FBL2xCLEVBQXFyQnRTLEVBQUVpWSxLQUFGLEdBQVEsVUFBUzNGLENBQVQsRUFBVztBQUFDLFNBQUksSUFBSUUsSUFBRUYsS0FBR3RTLEVBQUVpVSxHQUFGLENBQU0zQixDQUFOLEVBQVFnQyxDQUFSLEVBQVc3YSxNQUFkLElBQXNCLENBQTVCLEVBQThCdVosSUFBRTNTLE1BQU1tUyxDQUFOLENBQWhDLEVBQXlDcEQsSUFBRSxDQUEvQyxFQUFpREEsSUFBRW9ELENBQW5ELEVBQXFEcEQsR0FBckQ7QUFBeUQ0RCxRQUFFNUQsQ0FBRixJQUFLcFAsRUFBRTJWLEtBQUYsQ0FBUXJELENBQVIsRUFBVWxELENBQVYsQ0FBTDtBQUF6RCxLQUEyRSxPQUFPNEQsQ0FBUDtBQUFTLEdBQTd4QixFQUE4eEJoVCxFQUFFa1ksR0FBRixHQUFNbEUsRUFBRWhVLEVBQUVpWSxLQUFKLENBQXB5QixFQUEreUJqWSxFQUFFc0MsTUFBRixHQUFTLFVBQVNnUSxDQUFULEVBQVdFLENBQVgsRUFBYTtBQUFDLFNBQUksSUFBSVEsSUFBRSxFQUFOLEVBQVM1RCxJQUFFLENBQVgsRUFBYXdELElBQUUwQixFQUFFaEMsQ0FBRixDQUFuQixFQUF3QmxELElBQUV3RCxDQUExQixFQUE0QnhELEdBQTVCO0FBQWdDb0QsVUFBRVEsRUFBRVYsRUFBRWxELENBQUYsQ0FBRixJQUFRb0QsRUFBRXBELENBQUYsQ0FBVixHQUFlNEQsRUFBRVYsRUFBRWxELENBQUYsRUFBSyxDQUFMLENBQUYsSUFBV2tELEVBQUVsRCxDQUFGLEVBQUssQ0FBTCxDQUExQjtBQUFoQyxLQUFrRSxPQUFPNEQsQ0FBUDtBQUFTLEdBQWo1QixDQUFrNUIsSUFBSW1GLElBQUUsU0FBRkEsQ0FBRSxDQUFTM2UsQ0FBVCxFQUFXO0FBQUMsV0FBTyxVQUFTOFksQ0FBVCxFQUFXRSxDQUFYLEVBQWFRLENBQWIsRUFBZTtBQUFDUixVQUFFaUIsRUFBRWpCLENBQUYsRUFBSVEsQ0FBSixDQUFGLENBQVMsS0FBSSxJQUFJNUQsSUFBRWtGLEVBQUVoQyxDQUFGLENBQU4sRUFBV00sSUFBRSxJQUFFcFosQ0FBRixHQUFJLENBQUosR0FBTTRWLElBQUUsQ0FBekIsRUFBMkIsS0FBR3dELENBQUgsSUFBTUEsSUFBRXhELENBQW5DLEVBQXFDd0QsS0FBR3BaLENBQXhDO0FBQTBDLFlBQUdnWixFQUFFRixFQUFFTSxDQUFGLENBQUYsRUFBT0EsQ0FBUCxFQUFTTixDQUFULENBQUgsRUFBZSxPQUFPTSxDQUFQO0FBQXpELE9BQWtFLE9BQU0sQ0FBQyxDQUFQO0FBQVMsS0FBM0c7QUFBNEcsR0FBOUgsQ0FBK0g1UyxFQUFFa0YsU0FBRixHQUFZaVQsRUFBRSxDQUFGLENBQVosRUFBaUJuWSxFQUFFb1ksYUFBRixHQUFnQkQsRUFBRSxDQUFDLENBQUgsQ0FBakMsRUFBdUNuWSxFQUFFcVksV0FBRixHQUFjLFVBQVMvRixDQUFULEVBQVdFLENBQVgsRUFBYVEsQ0FBYixFQUFlNUQsQ0FBZixFQUFpQjtBQUFDLFNBQUksSUFBSXdELElBQUUsQ0FBQ0ksSUFBRVMsRUFBRVQsQ0FBRixFQUFJNUQsQ0FBSixFQUFNLENBQU4sQ0FBSCxFQUFhb0QsQ0FBYixDQUFOLEVBQXNCaFosSUFBRSxDQUF4QixFQUEwQmlaLElBQUU2QixFQUFFaEMsQ0FBRixDQUFoQyxFQUFxQzlZLElBQUVpWixDQUF2QyxHQUEwQztBQUFDLFVBQUlRLElBQUVyUyxLQUFLdVIsS0FBTCxDQUFXLENBQUMzWSxJQUFFaVosQ0FBSCxJQUFNLENBQWpCLENBQU4sQ0FBMEJPLEVBQUVWLEVBQUVXLENBQUYsQ0FBRixJQUFRTCxDQUFSLEdBQVVwWixJQUFFeVosSUFBRSxDQUFkLEdBQWdCUixJQUFFUSxDQUFsQjtBQUFvQixZQUFPelosQ0FBUDtBQUFTLEdBQXpLLENBQTBLLElBQUk4ZSxJQUFFLFNBQUZBLENBQUUsQ0FBUzllLENBQVQsRUFBV2laLENBQVgsRUFBYVEsQ0FBYixFQUFlO0FBQUMsV0FBTyxVQUFTWCxDQUFULEVBQVdFLENBQVgsRUFBYVEsQ0FBYixFQUFlO0FBQUMsVUFBSTVELElBQUUsQ0FBTjtBQUFBLFVBQVF3RCxJQUFFMEIsRUFBRWhDLENBQUYsQ0FBVixDQUFlLElBQUcsWUFBVSxPQUFPVSxDQUFwQixFQUFzQixJQUFFeFosQ0FBRixHQUFJNFYsSUFBRSxLQUFHNEQsQ0FBSCxHQUFLQSxDQUFMLEdBQU9wUyxLQUFLcVQsR0FBTCxDQUFTakIsSUFBRUosQ0FBWCxFQUFheEQsQ0FBYixDQUFiLEdBQTZCd0QsSUFBRSxLQUFHSSxDQUFILEdBQUtwUyxLQUFLaVYsR0FBTCxDQUFTN0MsSUFBRSxDQUFYLEVBQWFKLENBQWIsQ0FBTCxHQUFxQkksSUFBRUosQ0FBRixHQUFJLENBQXhELENBQXRCLEtBQXFGLElBQUdLLEtBQUdELENBQUgsSUFBTUosQ0FBVCxFQUFXLE9BQU9OLEVBQUVVLElBQUVDLEVBQUVYLENBQUYsRUFBSUUsQ0FBSixDQUFKLE1BQWNBLENBQWQsR0FBZ0JRLENBQWhCLEdBQWtCLENBQUMsQ0FBMUIsQ0FBNEIsSUFBR1IsS0FBR0EsQ0FBTixFQUFRLE9BQU8sTUFBSVEsSUFBRVAsRUFBRUksRUFBRTlQLElBQUYsQ0FBT3VQLENBQVAsRUFBU2xELENBQVQsRUFBV3dELENBQVgsQ0FBRixFQUFnQjVTLEVBQUVsQixLQUFsQixDQUFOLElBQWdDa1UsSUFBRTVELENBQWxDLEdBQW9DLENBQUMsQ0FBNUMsQ0FBOEMsS0FBSTRELElBQUUsSUFBRXhaLENBQUYsR0FBSTRWLENBQUosR0FBTXdELElBQUUsQ0FBZCxFQUFnQixLQUFHSSxDQUFILElBQU1BLElBQUVKLENBQXhCLEVBQTBCSSxLQUFHeFosQ0FBN0I7QUFBK0IsWUFBRzhZLEVBQUVVLENBQUYsTUFBT1IsQ0FBVixFQUFZLE9BQU9RLENBQVA7QUFBM0MsT0FBb0QsT0FBTSxDQUFDLENBQVA7QUFBUyxLQUFyUjtBQUFzUixHQUE1UyxDQUE2U2hULEVBQUVMLE9BQUYsR0FBVTJZLEVBQUUsQ0FBRixFQUFJdFksRUFBRWtGLFNBQU4sRUFBZ0JsRixFQUFFcVksV0FBbEIsQ0FBVixFQUF5Q3JZLEVBQUUrUixXQUFGLEdBQWN1RyxFQUFFLENBQUMsQ0FBSCxFQUFLdFksRUFBRW9ZLGFBQVAsQ0FBdkQsRUFBNkVwWSxFQUFFdVksS0FBRixHQUFRLFVBQVNqRyxDQUFULEVBQVdFLENBQVgsRUFBYVEsQ0FBYixFQUFlO0FBQUMsWUFBTVIsQ0FBTixLQUFVQSxJQUFFRixLQUFHLENBQUwsRUFBT0EsSUFBRSxDQUFuQixHQUFzQlUsTUFBSUEsSUFBRVIsSUFBRUYsQ0FBRixHQUFJLENBQUMsQ0FBTCxHQUFPLENBQWIsQ0FBdEIsQ0FBc0MsS0FBSSxJQUFJbEQsSUFBRXhPLEtBQUtxVCxHQUFMLENBQVNyVCxLQUFLNFgsSUFBTCxDQUFVLENBQUNoRyxJQUFFRixDQUFILElBQU1VLENBQWhCLENBQVQsRUFBNEIsQ0FBNUIsQ0FBTixFQUFxQ0osSUFBRXZTLE1BQU0rTyxDQUFOLENBQXZDLEVBQWdENVYsSUFBRSxDQUF0RCxFQUF3REEsSUFBRTRWLENBQTFELEVBQTRENVYsS0FBSThZLEtBQUdVLENBQW5FO0FBQXFFSixRQUFFcFosQ0FBRixJQUFLOFksQ0FBTDtBQUFyRSxLQUE0RSxPQUFPTSxDQUFQO0FBQVMsR0FBaE8sRUFBaU81UyxFQUFFeVksS0FBRixHQUFRLFVBQVNuRyxDQUFULEVBQVdFLENBQVgsRUFBYTtBQUFDLFFBQUcsUUFBTUEsQ0FBTixJQUFTQSxJQUFFLENBQWQsRUFBZ0IsT0FBTSxFQUFOLENBQVMsS0FBSSxJQUFJUSxJQUFFLEVBQU4sRUFBUzVELElBQUUsQ0FBWCxFQUFhd0QsSUFBRU4sRUFBRTdZLE1BQXJCLEVBQTRCMlYsSUFBRXdELENBQTlCO0FBQWlDSSxRQUFFbFMsSUFBRixDQUFPK1IsRUFBRTlQLElBQUYsQ0FBT3VQLENBQVAsRUFBU2xELENBQVQsRUFBV0EsS0FBR29ELENBQWQsQ0FBUDtBQUFqQyxLQUEwRCxPQUFPUSxDQUFQO0FBQVMsR0FBblYsQ0FBb1YsSUFBSTBGLElBQUUsU0FBRkEsQ0FBRSxDQUFTcEcsQ0FBVCxFQUFXRSxDQUFYLEVBQWFRLENBQWIsRUFBZTVELENBQWYsRUFBaUJ3RCxDQUFqQixFQUFtQjtBQUFDLFFBQUcsRUFBRXhELGFBQWFvRCxDQUFmLENBQUgsRUFBcUIsT0FBT0YsRUFBRXhQLEtBQUYsQ0FBUWtRLENBQVIsRUFBVUosQ0FBVixDQUFQLENBQW9CLElBQUlwWixJQUFFMGEsRUFBRTVCLEVBQUVqTyxTQUFKLENBQU47QUFBQSxRQUFxQm9PLElBQUVILEVBQUV4UCxLQUFGLENBQVF0SixDQUFSLEVBQVVvWixDQUFWLENBQXZCLENBQW9DLE9BQU81UyxFQUFFNlQsUUFBRixDQUFXcEIsQ0FBWCxJQUFjQSxDQUFkLEdBQWdCalosQ0FBdkI7QUFBeUIsR0FBaEksQ0FBaUl3RyxFQUFFaU8sSUFBRixHQUFPK0YsRUFBRSxVQUFTeEIsQ0FBVCxFQUFXUSxDQUFYLEVBQWE1RCxDQUFiLEVBQWU7QUFBQyxRQUFHLENBQUNwUCxFQUFFNFQsVUFBRixDQUFhcEIsQ0FBYixDQUFKLEVBQW9CLE1BQU0sSUFBSW5FLFNBQUosQ0FBYyxtQ0FBZCxDQUFOLENBQXlELElBQUl1RSxJQUFFb0IsRUFBRSxVQUFTMUIsQ0FBVCxFQUFXO0FBQUMsYUFBT29HLEVBQUVsRyxDQUFGLEVBQUlJLENBQUosRUFBTUksQ0FBTixFQUFRLElBQVIsRUFBYTVELEVBQUVqRCxNQUFGLENBQVNtRyxDQUFULENBQWIsQ0FBUDtBQUFpQyxLQUEvQyxDQUFOLENBQXVELE9BQU9NLENBQVA7QUFBUyxHQUEvSixDQUFQLEVBQXdLNVMsRUFBRTJZLE9BQUYsR0FBVTNFLEVBQUUsVUFBU3BCLENBQVQsRUFBV3BaLENBQVgsRUFBYTtBQUFDLFFBQUlpWixJQUFFelMsRUFBRTJZLE9BQUYsQ0FBVUMsV0FBaEI7QUFBQSxRQUE0QjNGLElBQUUsU0FBRkEsQ0FBRSxHQUFVO0FBQUMsV0FBSSxJQUFJWCxJQUFFLENBQU4sRUFBUUUsSUFBRWhaLEVBQUVDLE1BQVosRUFBbUJ1WixJQUFFM1MsTUFBTW1TLENBQU4sQ0FBckIsRUFBOEJwRCxJQUFFLENBQXBDLEVBQXNDQSxJQUFFb0QsQ0FBeEMsRUFBMENwRCxHQUExQztBQUE4QzRELFVBQUU1RCxDQUFGLElBQUs1VixFQUFFNFYsQ0FBRixNQUFPcUQsQ0FBUCxHQUFTelAsVUFBVXNQLEdBQVYsQ0FBVCxHQUF3QjlZLEVBQUU0VixDQUFGLENBQTdCO0FBQTlDLE9BQWdGLE9BQUtrRCxJQUFFdFAsVUFBVXZKLE1BQWpCO0FBQXlCdVosVUFBRWxTLElBQUYsQ0FBT2tDLFVBQVVzUCxHQUFWLENBQVA7QUFBekIsT0FBZ0QsT0FBT29HLEVBQUU5RixDQUFGLEVBQUlLLENBQUosRUFBTSxJQUFOLEVBQVcsSUFBWCxFQUFnQkQsQ0FBaEIsQ0FBUDtBQUEwQixLQUFuTSxDQUFvTSxPQUFPQyxDQUFQO0FBQVMsR0FBN04sQ0FBbEwsRUFBaVosQ0FBQ2pULEVBQUUyWSxPQUFGLENBQVVDLFdBQVYsR0FBc0I1WSxDQUF2QixFQUEwQjZZLE9BQTFCLEdBQWtDN0UsRUFBRSxVQUFTMUIsQ0FBVCxFQUFXRSxDQUFYLEVBQWE7QUFBQyxRQUFJUSxJQUFFLENBQUNSLElBQUUrRSxFQUFFL0UsQ0FBRixFQUFJLENBQUMsQ0FBTCxFQUFPLENBQUMsQ0FBUixDQUFILEVBQWUvWSxNQUFyQixDQUE0QixJQUFHdVosSUFBRSxDQUFMLEVBQU8sTUFBTSxJQUFJbkcsS0FBSixDQUFVLHVDQUFWLENBQU4sQ0FBeUQsT0FBS21HLEdBQUwsR0FBVTtBQUFDLFVBQUk1RCxJQUFFb0QsRUFBRVEsQ0FBRixDQUFOLENBQVdWLEVBQUVsRCxDQUFGLElBQUtwUCxFQUFFaU8sSUFBRixDQUFPcUUsRUFBRWxELENBQUYsQ0FBUCxFQUFZa0QsQ0FBWixDQUFMO0FBQW9CO0FBQUMsR0FBdkosQ0FBbmIsRUFBNGtCdFMsRUFBRThZLE9BQUYsR0FBVSxVQUFTMUosQ0FBVCxFQUFXd0QsQ0FBWCxFQUFhO0FBQUMsUUFBSXBaLElBQUUsU0FBRkEsQ0FBRSxDQUFTOFksQ0FBVCxFQUFXO0FBQUMsVUFBSUUsSUFBRWhaLEVBQUV1ZixLQUFSO0FBQUEsVUFBYy9GLElBQUUsTUFBSUosSUFBRUEsRUFBRTlQLEtBQUYsQ0FBUSxJQUFSLEVBQWFFLFNBQWIsQ0FBRixHQUEwQnNQLENBQTlCLENBQWhCLENBQWlELE9BQU9oUCxFQUFFa1AsQ0FBRixFQUFJUSxDQUFKLE1BQVNSLEVBQUVRLENBQUYsSUFBSzVELEVBQUV0TSxLQUFGLENBQVEsSUFBUixFQUFhRSxTQUFiLENBQWQsR0FBdUN3UCxFQUFFUSxDQUFGLENBQTlDO0FBQW1ELEtBQXRILENBQXVILE9BQU94WixFQUFFdWYsS0FBRixHQUFRLEVBQVIsRUFBV3ZmLENBQWxCO0FBQW9CLEdBQS91QixFQUFndkJ3RyxFQUFFZ1osS0FBRixHQUFRaEYsRUFBRSxVQUFTMUIsQ0FBVCxFQUFXRSxDQUFYLEVBQWFRLENBQWIsRUFBZTtBQUFDLFdBQU9uRixXQUFXLFlBQVU7QUFBQyxhQUFPeUUsRUFBRXhQLEtBQUYsQ0FBUSxJQUFSLEVBQWFrUSxDQUFiLENBQVA7QUFBdUIsS0FBN0MsRUFBOENSLENBQTlDLENBQVA7QUFBd0QsR0FBMUUsQ0FBeHZCLEVBQW8wQnhTLEVBQUVpWixLQUFGLEdBQVFqWixFQUFFMlksT0FBRixDQUFVM1ksRUFBRWdaLEtBQVosRUFBa0JoWixDQUFsQixFQUFvQixDQUFwQixDQUE1MEIsRUFBbTJCQSxFQUFFa1osUUFBRixHQUFXLFVBQVNsRyxDQUFULEVBQVc1RCxDQUFYLEVBQWF3RCxDQUFiLEVBQWU7QUFBQyxRQUFJcFosQ0FBSjtBQUFBLFFBQU1pWixDQUFOO0FBQUEsUUFBUVEsQ0FBUjtBQUFBLFFBQVVKLENBQVY7QUFBQSxRQUFZelAsSUFBRSxDQUFkLENBQWdCd1AsTUFBSUEsSUFBRSxFQUFOLEVBQVUsSUFBSU0sSUFBRSxTQUFGQSxDQUFFLEdBQVU7QUFBQzlQLFVBQUUsQ0FBQyxDQUFELEtBQUt3UCxFQUFFdUcsT0FBUCxHQUFlLENBQWYsR0FBaUJuWixFQUFFb1osR0FBRixFQUFuQixFQUEyQjVmLElBQUUsSUFBN0IsRUFBa0NxWixJQUFFRyxFQUFFbFEsS0FBRixDQUFRMlAsQ0FBUixFQUFVUSxDQUFWLENBQXBDLEVBQWlEelosTUFBSWlaLElBQUVRLElBQUUsSUFBUixDQUFqRDtBQUErRCxLQUFoRjtBQUFBLFFBQWlGWCxJQUFFLGFBQVU7QUFBQyxVQUFJQSxJQUFFdFMsRUFBRW9aLEdBQUYsRUFBTixDQUFjaFcsS0FBRyxDQUFDLENBQUQsS0FBS3dQLEVBQUV1RyxPQUFWLEtBQW9CL1YsSUFBRWtQLENBQXRCLEVBQXlCLElBQUlFLElBQUVwRCxLQUFHa0QsSUFBRWxQLENBQUwsQ0FBTixDQUFjLE9BQU9xUCxJQUFFLElBQUYsRUFBT1EsSUFBRWpRLFNBQVQsRUFBbUJ3UCxLQUFHLENBQUgsSUFBTXBELElBQUVvRCxDQUFSLElBQVdoWixNQUFJNmYsYUFBYTdmLENBQWIsR0FBZ0JBLElBQUUsSUFBdEIsR0FBNEI0SixJQUFFa1AsQ0FBOUIsRUFBZ0NPLElBQUVHLEVBQUVsUSxLQUFGLENBQVEyUCxDQUFSLEVBQVVRLENBQVYsQ0FBbEMsRUFBK0N6WixNQUFJaVosSUFBRVEsSUFBRSxJQUFSLENBQTFELElBQXlFelosS0FBRyxDQUFDLENBQUQsS0FBS29aLEVBQUUwRyxRQUFWLEtBQXFCOWYsSUFBRXFVLFdBQVdxRixDQUFYLEVBQWFWLENBQWIsQ0FBdkIsQ0FBNUYsRUFBb0lLLENBQTNJO0FBQTZJLEtBQWhTLENBQWlTLE9BQU9QLEVBQUVpSCxNQUFGLEdBQVMsWUFBVTtBQUFDRixtQkFBYTdmLENBQWIsR0FBZ0I0SixJQUFFLENBQWxCLEVBQW9CNUosSUFBRWlaLElBQUVRLElBQUUsSUFBMUI7QUFBK0IsS0FBbkQsRUFBb0RYLENBQTNEO0FBQTZELEdBQXR2QyxFQUF1dkN0UyxFQUFFd1osUUFBRixHQUFXLFVBQVN4RyxDQUFULEVBQVc1RCxDQUFYLEVBQWF3RCxDQUFiLEVBQWU7QUFBQyxRQUFJcFosQ0FBSjtBQUFBLFFBQU1pWixDQUFOO0FBQUEsUUFBUVEsSUFBRSxTQUFGQSxDQUFFLENBQVNYLENBQVQsRUFBV0UsQ0FBWCxFQUFhO0FBQUNoWixVQUFFLElBQUYsRUFBT2daLE1BQUlDLElBQUVPLEVBQUVsUSxLQUFGLENBQVF3UCxDQUFSLEVBQVVFLENBQVYsQ0FBTixDQUFQO0FBQTJCLEtBQW5EO0FBQUEsUUFBb0RGLElBQUUwQixFQUFFLFVBQVMxQixDQUFULEVBQVc7QUFBQyxVQUFHOVksS0FBRzZmLGFBQWE3ZixDQUFiLENBQUgsRUFBbUJvWixDQUF0QixFQUF3QjtBQUFDLFlBQUlKLElBQUUsQ0FBQ2haLENBQVAsQ0FBU0EsSUFBRXFVLFdBQVdvRixDQUFYLEVBQWE3RCxDQUFiLENBQUYsRUFBa0JvRCxNQUFJQyxJQUFFTyxFQUFFbFEsS0FBRixDQUFRLElBQVIsRUFBYXdQLENBQWIsQ0FBTixDQUFsQjtBQUF5QyxPQUEzRSxNQUFnRjlZLElBQUV3RyxFQUFFZ1osS0FBRixDQUFRL0YsQ0FBUixFQUFVN0QsQ0FBVixFQUFZLElBQVosRUFBaUJrRCxDQUFqQixDQUFGLENBQXNCLE9BQU9HLENBQVA7QUFBUyxLQUE3SCxDQUF0RCxDQUFxTCxPQUFPSCxFQUFFaUgsTUFBRixHQUFTLFlBQVU7QUFBQ0YsbUJBQWE3ZixDQUFiLEdBQWdCQSxJQUFFLElBQWxCO0FBQXVCLEtBQTNDLEVBQTRDOFksQ0FBbkQ7QUFBcUQsR0FBNS9DLEVBQTYvQ3RTLEVBQUV5WixJQUFGLEdBQU8sVUFBU25ILENBQVQsRUFBV0UsQ0FBWCxFQUFhO0FBQUMsV0FBT3hTLEVBQUUyWSxPQUFGLENBQVVuRyxDQUFWLEVBQVlGLENBQVosQ0FBUDtBQUFzQixHQUF4aUQsRUFBeWlEdFMsRUFBRW1WLE1BQUYsR0FBUyxVQUFTN0MsQ0FBVCxFQUFXO0FBQUMsV0FBTyxZQUFVO0FBQUMsYUFBTSxDQUFDQSxFQUFFeFAsS0FBRixDQUFRLElBQVIsRUFBYUUsU0FBYixDQUFQO0FBQStCLEtBQWpEO0FBQWtELEdBQWhuRCxFQUFpbkRoRCxFQUFFMFosT0FBRixHQUFVLFlBQVU7QUFBQyxRQUFJMUcsSUFBRWhRLFNBQU47QUFBQSxRQUFnQm9NLElBQUU0RCxFQUFFdlosTUFBRixHQUFTLENBQTNCLENBQTZCLE9BQU8sWUFBVTtBQUFDLFdBQUksSUFBSTZZLElBQUVsRCxDQUFOLEVBQVFvRCxJQUFFUSxFQUFFNUQsQ0FBRixFQUFLdE0sS0FBTCxDQUFXLElBQVgsRUFBZ0JFLFNBQWhCLENBQWQsRUFBeUNzUCxHQUF6QztBQUE4Q0UsWUFBRVEsRUFBRVYsQ0FBRixFQUFLdlAsSUFBTCxDQUFVLElBQVYsRUFBZXlQLENBQWYsQ0FBRjtBQUE5QyxPQUFrRSxPQUFPQSxDQUFQO0FBQVMsS0FBN0Y7QUFBOEYsR0FBandELEVBQWt3RHhTLEVBQUUyWixLQUFGLEdBQVEsVUFBU3JILENBQVQsRUFBV0UsQ0FBWCxFQUFhO0FBQUMsV0FBTyxZQUFVO0FBQUMsVUFBRyxFQUFFRixDQUFGLEdBQUksQ0FBUCxFQUFTLE9BQU9FLEVBQUUxUCxLQUFGLENBQVEsSUFBUixFQUFhRSxTQUFiLENBQVA7QUFBK0IsS0FBMUQ7QUFBMkQsR0FBbjFELEVBQW8xRGhELEVBQUU0WixNQUFGLEdBQVMsVUFBU3RILENBQVQsRUFBV0UsQ0FBWCxFQUFhO0FBQUMsUUFBSVEsQ0FBSixDQUFNLE9BQU8sWUFBVTtBQUFDLGFBQU8sSUFBRSxFQUFFVixDQUFKLEtBQVFVLElBQUVSLEVBQUUxUCxLQUFGLENBQVEsSUFBUixFQUFhRSxTQUFiLENBQVYsR0FBbUNzUCxLQUFHLENBQUgsS0FBT0UsSUFBRSxJQUFULENBQW5DLEVBQWtEUSxDQUF6RDtBQUEyRCxLQUE3RTtBQUE4RSxHQUEvN0QsRUFBZzhEaFQsRUFBRXlELElBQUYsR0FBT3pELEVBQUUyWSxPQUFGLENBQVUzWSxFQUFFNFosTUFBWixFQUFtQixDQUFuQixDQUF2OEQsRUFBNjlENVosRUFBRTZaLGFBQUYsR0FBZ0I3RixDQUE3K0QsQ0FBKytELElBQUk4RixJQUFFLENBQUMsRUFBQ3BhLFVBQVMsSUFBVixHQUFnQnFhLG9CQUFoQixDQUFxQyxVQUFyQyxDQUFQO0FBQUEsTUFBd0RDLElBQUUsQ0FBQyxTQUFELEVBQVcsZUFBWCxFQUEyQixVQUEzQixFQUFzQyxzQkFBdEMsRUFBNkQsZ0JBQTdELEVBQThFLGdCQUE5RSxDQUExRDtBQUFBLE1BQTBKQyxJQUFFLFNBQUZBLENBQUUsQ0FBUzNILENBQVQsRUFBV0UsQ0FBWCxFQUFhO0FBQUMsUUFBSVEsSUFBRWdILEVBQUV2Z0IsTUFBUjtBQUFBLFFBQWUyVixJQUFFa0QsRUFBRTlFLFdBQW5CO0FBQUEsUUFBK0JvRixJQUFFNVMsRUFBRTRULFVBQUYsQ0FBYXhFLENBQWIsS0FBaUJBLEVBQUUvSyxTQUFuQixJQUE4Qm9PLENBQS9EO0FBQUEsUUFBaUVqWixJQUFFLGFBQW5FLENBQWlGLEtBQUk4SixFQUFFZ1AsQ0FBRixFQUFJOVksQ0FBSixLQUFRLENBQUN3RyxFQUFFdVYsUUFBRixDQUFXL0MsQ0FBWCxFQUFhaFosQ0FBYixDQUFULElBQTBCZ1osRUFBRTFSLElBQUYsQ0FBT3RILENBQVAsQ0FBOUIsRUFBd0N3WixHQUF4QztBQUE2QyxPQUFDeFosSUFBRXdnQixFQUFFaEgsQ0FBRixDQUFILEtBQVdWLENBQVgsSUFBY0EsRUFBRTlZLENBQUYsTUFBT29aLEVBQUVwWixDQUFGLENBQXJCLElBQTJCLENBQUN3RyxFQUFFdVYsUUFBRixDQUFXL0MsQ0FBWCxFQUFhaFosQ0FBYixDQUE1QixJQUE2Q2daLEVBQUUxUixJQUFGLENBQU90SCxDQUFQLENBQTdDO0FBQTdDO0FBQW9HLEdBQS9WLENBQWdXd0csRUFBRWIsSUFBRixHQUFPLFVBQVNtVCxDQUFULEVBQVc7QUFBQyxRQUFHLENBQUN0UyxFQUFFNlQsUUFBRixDQUFXdkIsQ0FBWCxDQUFKLEVBQWtCLE9BQU0sRUFBTixDQUFTLElBQUdXLENBQUgsRUFBSyxPQUFPQSxFQUFFWCxDQUFGLENBQVAsQ0FBWSxJQUFJRSxJQUFFLEVBQU4sQ0FBUyxLQUFJLElBQUlRLENBQVIsSUFBYVYsQ0FBYjtBQUFlaFAsUUFBRWdQLENBQUYsRUFBSVUsQ0FBSixLQUFRUixFQUFFMVIsSUFBRixDQUFPa1MsQ0FBUCxDQUFSO0FBQWYsS0FBaUMsT0FBTzhHLEtBQUdHLEVBQUUzSCxDQUFGLEVBQUlFLENBQUosQ0FBSCxFQUFVQSxDQUFqQjtBQUFtQixHQUE1SCxFQUE2SHhTLEVBQUVrYSxPQUFGLEdBQVUsVUFBUzVILENBQVQsRUFBVztBQUFDLFFBQUcsQ0FBQ3RTLEVBQUU2VCxRQUFGLENBQVd2QixDQUFYLENBQUosRUFBa0IsT0FBTSxFQUFOLENBQVMsSUFBSUUsSUFBRSxFQUFOLENBQVMsS0FBSSxJQUFJUSxDQUFSLElBQWFWLENBQWI7QUFBZUUsUUFBRTFSLElBQUYsQ0FBT2tTLENBQVA7QUFBZixLQUF5QixPQUFPOEcsS0FBR0csRUFBRTNILENBQUYsRUFBSUUsQ0FBSixDQUFILEVBQVVBLENBQWpCO0FBQW1CLEdBQW5PLEVBQW9PeFMsRUFBRWlRLE1BQUYsR0FBUyxVQUFTcUMsQ0FBVCxFQUFXO0FBQUMsU0FBSSxJQUFJRSxJQUFFeFMsRUFBRWIsSUFBRixDQUFPbVQsQ0FBUCxDQUFOLEVBQWdCVSxJQUFFUixFQUFFL1ksTUFBcEIsRUFBMkIyVixJQUFFL08sTUFBTTJTLENBQU4sQ0FBN0IsRUFBc0NKLElBQUUsQ0FBNUMsRUFBOENBLElBQUVJLENBQWhELEVBQWtESixHQUFsRDtBQUFzRHhELFFBQUV3RCxDQUFGLElBQUtOLEVBQUVFLEVBQUVJLENBQUYsQ0FBRixDQUFMO0FBQXRELEtBQW1FLE9BQU94RCxDQUFQO0FBQVMsR0FBclUsRUFBc1VwUCxFQUFFbWEsU0FBRixHQUFZLFVBQVM3SCxDQUFULEVBQVdFLENBQVgsRUFBYVEsQ0FBYixFQUFlO0FBQUNSLFFBQUVpQixFQUFFakIsQ0FBRixFQUFJUSxDQUFKLENBQUYsQ0FBUyxLQUFJLElBQUk1RCxJQUFFcFAsRUFBRWIsSUFBRixDQUFPbVQsQ0FBUCxDQUFOLEVBQWdCTSxJQUFFeEQsRUFBRTNWLE1BQXBCLEVBQTJCRCxJQUFFLEVBQTdCLEVBQWdDaVosSUFBRSxDQUF0QyxFQUF3Q0EsSUFBRUcsQ0FBMUMsRUFBNENILEdBQTVDLEVBQWdEO0FBQUMsVUFBSVEsSUFBRTdELEVBQUVxRCxDQUFGLENBQU4sQ0FBV2paLEVBQUV5WixDQUFGLElBQUtULEVBQUVGLEVBQUVXLENBQUYsQ0FBRixFQUFPQSxDQUFQLEVBQVNYLENBQVQsQ0FBTDtBQUFpQixZQUFPOVksQ0FBUDtBQUFTLEdBQWpjLEVBQWtjd0csRUFBRW9hLEtBQUYsR0FBUSxVQUFTOUgsQ0FBVCxFQUFXO0FBQUMsU0FBSSxJQUFJRSxJQUFFeFMsRUFBRWIsSUFBRixDQUFPbVQsQ0FBUCxDQUFOLEVBQWdCVSxJQUFFUixFQUFFL1ksTUFBcEIsRUFBMkIyVixJQUFFL08sTUFBTTJTLENBQU4sQ0FBN0IsRUFBc0NKLElBQUUsQ0FBNUMsRUFBOENBLElBQUVJLENBQWhELEVBQWtESixHQUFsRDtBQUFzRHhELFFBQUV3RCxDQUFGLElBQUssQ0FBQ0osRUFBRUksQ0FBRixDQUFELEVBQU1OLEVBQUVFLEVBQUVJLENBQUYsQ0FBRixDQUFOLENBQUw7QUFBdEQsS0FBMEUsT0FBT3hELENBQVA7QUFBUyxHQUF6aUIsRUFBMGlCcFAsRUFBRXFhLE1BQUYsR0FBUyxVQUFTL0gsQ0FBVCxFQUFXO0FBQUMsU0FBSSxJQUFJRSxJQUFFLEVBQU4sRUFBU1EsSUFBRWhULEVBQUViLElBQUYsQ0FBT21ULENBQVAsQ0FBWCxFQUFxQmxELElBQUUsQ0FBdkIsRUFBeUJ3RCxJQUFFSSxFQUFFdlosTUFBakMsRUFBd0MyVixJQUFFd0QsQ0FBMUMsRUFBNEN4RCxHQUE1QztBQUFnRG9ELFFBQUVGLEVBQUVVLEVBQUU1RCxDQUFGLENBQUYsQ0FBRixJQUFXNEQsRUFBRTVELENBQUYsQ0FBWDtBQUFoRCxLQUFnRSxPQUFPb0QsQ0FBUDtBQUFTLEdBQXhvQixFQUF5b0J4UyxFQUFFc2EsU0FBRixHQUFZdGEsRUFBRXVhLE9BQUYsR0FBVSxVQUFTakksQ0FBVCxFQUFXO0FBQUMsUUFBSUUsSUFBRSxFQUFOLENBQVMsS0FBSSxJQUFJUSxDQUFSLElBQWFWLENBQWI7QUFBZXRTLFFBQUU0VCxVQUFGLENBQWF0QixFQUFFVSxDQUFGLENBQWIsS0FBb0JSLEVBQUUxUixJQUFGLENBQU9rUyxDQUFQLENBQXBCO0FBQWYsS0FBNkMsT0FBT1IsRUFBRXpSLElBQUYsRUFBUDtBQUFnQixHQUFqdkIsQ0FBa3ZCLElBQUl5WixJQUFFLFNBQUZBLENBQUUsQ0FBUzNILENBQVQsRUFBV3pQLENBQVgsRUFBYTtBQUFDLFdBQU8sVUFBU2tQLENBQVQsRUFBVztBQUFDLFVBQUlFLElBQUV4UCxVQUFVdkosTUFBaEIsQ0FBdUIsSUFBRzJKLE1BQUlrUCxJQUFFcFQsT0FBT29ULENBQVAsQ0FBTixHQUFpQkUsSUFBRSxDQUFGLElBQUssUUFBTUYsQ0FBL0IsRUFBaUMsT0FBT0EsQ0FBUCxDQUFTLEtBQUksSUFBSVUsSUFBRSxDQUFWLEVBQVlBLElBQUVSLENBQWQsRUFBZ0JRLEdBQWhCO0FBQW9CLGFBQUksSUFBSTVELElBQUVwTSxVQUFVZ1EsQ0FBVixDQUFOLEVBQW1CSixJQUFFQyxFQUFFekQsQ0FBRixDQUFyQixFQUEwQjVWLElBQUVvWixFQUFFblosTUFBOUIsRUFBcUNnWixJQUFFLENBQTNDLEVBQTZDQSxJQUFFalosQ0FBL0MsRUFBaURpWixHQUFqRCxFQUFxRDtBQUFDLGNBQUlRLElBQUVMLEVBQUVILENBQUYsQ0FBTixDQUFXclAsS0FBRyxLQUFLLENBQUwsS0FBU2tQLEVBQUVXLENBQUYsQ0FBWixLQUFtQlgsRUFBRVcsQ0FBRixJQUFLN0QsRUFBRTZELENBQUYsQ0FBeEI7QUFBOEI7QUFBbkgsT0FBbUgsT0FBT1gsQ0FBUDtBQUFTLEtBQWhOO0FBQWlOLEdBQXJPLENBQXNPdFMsRUFBRXlhLE1BQUYsR0FBU0QsRUFBRXhhLEVBQUVrYSxPQUFKLENBQVQsRUFBc0JsYSxFQUFFMGEsU0FBRixHQUFZMWEsRUFBRTJhLE1BQUYsR0FBU0gsRUFBRXhhLEVBQUViLElBQUosQ0FBM0MsRUFBcURhLEVBQUVpVixPQUFGLEdBQVUsVUFBUzNDLENBQVQsRUFBV0UsQ0FBWCxFQUFhUSxDQUFiLEVBQWU7QUFBQ1IsUUFBRWlCLEVBQUVqQixDQUFGLEVBQUlRLENBQUosQ0FBRixDQUFTLEtBQUksSUFBSTVELENBQUosRUFBTXdELElBQUU1UyxFQUFFYixJQUFGLENBQU9tVCxDQUFQLENBQVIsRUFBa0I5WSxJQUFFLENBQXBCLEVBQXNCaVosSUFBRUcsRUFBRW5aLE1BQTlCLEVBQXFDRCxJQUFFaVosQ0FBdkMsRUFBeUNqWixHQUF6QztBQUE2QyxVQUFHZ1osRUFBRUYsRUFBRWxELElBQUV3RCxFQUFFcFosQ0FBRixDQUFKLENBQUYsRUFBWTRWLENBQVosRUFBY2tELENBQWQsQ0FBSCxFQUFvQixPQUFPbEQsQ0FBUDtBQUFqRTtBQUEwRSxHQUFsSyxDQUFtSyxJQUFJd0wsQ0FBSjtBQUFBLE1BQU1DLENBQU47QUFBQSxNQUFRQyxJQUFFLFNBQUZBLENBQUUsQ0FBU3hJLENBQVQsRUFBV0UsQ0FBWCxFQUFhUSxDQUFiLEVBQWU7QUFBQyxXQUFPUixLQUFLUSxDQUFaO0FBQWMsR0FBeEMsQ0FBeUNoVCxFQUFFa0IsSUFBRixHQUFPOFMsRUFBRSxVQUFTMUIsQ0FBVCxFQUFXRSxDQUFYLEVBQWE7QUFBQyxRQUFJUSxJQUFFLEVBQU47QUFBQSxRQUFTNUQsSUFBRW9ELEVBQUUsQ0FBRixDQUFYLENBQWdCLElBQUcsUUFBTUYsQ0FBVCxFQUFXLE9BQU9VLENBQVAsQ0FBU2hULEVBQUU0VCxVQUFGLENBQWF4RSxDQUFiLEtBQWlCLElBQUVvRCxFQUFFL1ksTUFBSixLQUFhMlYsSUFBRW9FLEVBQUVwRSxDQUFGLEVBQUlvRCxFQUFFLENBQUYsQ0FBSixDQUFmLEdBQTBCQSxJQUFFeFMsRUFBRWthLE9BQUYsQ0FBVTVILENBQVYsQ0FBN0MsS0FBNERsRCxJQUFFMEwsQ0FBRixFQUFJdEksSUFBRStFLEVBQUUvRSxDQUFGLEVBQUksQ0FBQyxDQUFMLEVBQU8sQ0FBQyxDQUFSLENBQU4sRUFBaUJGLElBQUVwVCxPQUFPb1QsQ0FBUCxDQUEvRSxFQUEwRixLQUFJLElBQUlNLElBQUUsQ0FBTixFQUFRcFosSUFBRWdaLEVBQUUvWSxNQUFoQixFQUF1Qm1aLElBQUVwWixDQUF6QixFQUEyQm9aLEdBQTNCLEVBQStCO0FBQUMsVUFBSUgsSUFBRUQsRUFBRUksQ0FBRixDQUFOO0FBQUEsVUFBV0ssSUFBRVgsRUFBRUcsQ0FBRixDQUFiLENBQWtCckQsRUFBRTZELENBQUYsRUFBSVIsQ0FBSixFQUFNSCxDQUFOLE1BQVdVLEVBQUVQLENBQUYsSUFBS1EsQ0FBaEI7QUFBbUIsWUFBT0QsQ0FBUDtBQUFTLEdBQTVOLENBQVAsRUFBcU9oVCxFQUFFK2EsSUFBRixHQUFPL0csRUFBRSxVQUFTMUIsQ0FBVCxFQUFXVSxDQUFYLEVBQWE7QUFBQyxRQUFJUixDQUFKO0FBQUEsUUFBTXBELElBQUU0RCxFQUFFLENBQUYsQ0FBUixDQUFhLE9BQU9oVCxFQUFFNFQsVUFBRixDQUFheEUsQ0FBYixLQUFpQkEsSUFBRXBQLEVBQUVtVixNQUFGLENBQVMvRixDQUFULENBQUYsRUFBYyxJQUFFNEQsRUFBRXZaLE1BQUosS0FBYStZLElBQUVRLEVBQUUsQ0FBRixDQUFmLENBQS9CLEtBQXNEQSxJQUFFaFQsRUFBRVcsR0FBRixDQUFNNFcsRUFBRXZFLENBQUYsRUFBSSxDQUFDLENBQUwsRUFBTyxDQUFDLENBQVIsQ0FBTixFQUFpQmdJLE1BQWpCLENBQUYsRUFBMkI1TCxJQUFFLFdBQVNrRCxDQUFULEVBQVdFLENBQVgsRUFBYTtBQUFDLGFBQU0sQ0FBQ3hTLEVBQUV1VixRQUFGLENBQVd2QyxDQUFYLEVBQWFSLENBQWIsQ0FBUDtBQUF1QixLQUF4SCxHQUEwSHhTLEVBQUVrQixJQUFGLENBQU9vUixDQUFQLEVBQVNsRCxDQUFULEVBQVdvRCxDQUFYLENBQWpJO0FBQStJLEdBQTVLLENBQTVPLEVBQTBaeFMsRUFBRWliLFFBQUYsR0FBV1QsRUFBRXhhLEVBQUVrYSxPQUFKLEVBQVksQ0FBQyxDQUFiLENBQXJhLEVBQXFibGEsRUFBRTRRLE1BQUYsR0FBUyxVQUFTMEIsQ0FBVCxFQUFXRSxDQUFYLEVBQWE7QUFBQyxRQUFJUSxJQUFFa0IsRUFBRTVCLENBQUYsQ0FBTixDQUFXLE9BQU9FLEtBQUd4UyxFQUFFMGEsU0FBRixDQUFZMUgsQ0FBWixFQUFjUixDQUFkLENBQUgsRUFBb0JRLENBQTNCO0FBQTZCLEdBQXBmLEVBQXFmaFQsRUFBRWlXLEtBQUYsR0FBUSxVQUFTM0QsQ0FBVCxFQUFXO0FBQUMsV0FBT3RTLEVBQUU2VCxRQUFGLENBQVd2QixDQUFYLElBQWN0UyxFQUFFTSxPQUFGLENBQVVnUyxDQUFWLElBQWFBLEVBQUUvUyxLQUFGLEVBQWIsR0FBdUJTLEVBQUV5YSxNQUFGLENBQVMsRUFBVCxFQUFZbkksQ0FBWixDQUFyQyxHQUFvREEsQ0FBM0Q7QUFBNkQsR0FBdGtCLEVBQXVrQnRTLEVBQUVrYixHQUFGLEdBQU0sVUFBUzVJLENBQVQsRUFBV0UsQ0FBWCxFQUFhO0FBQUMsV0FBT0EsRUFBRUYsQ0FBRixHQUFLQSxDQUFaO0FBQWMsR0FBem1CLEVBQTBtQnRTLEVBQUVtYixPQUFGLEdBQVUsVUFBUzdJLENBQVQsRUFBV0UsQ0FBWCxFQUFhO0FBQUMsUUFBSVEsSUFBRWhULEVBQUViLElBQUYsQ0FBT3FULENBQVAsQ0FBTjtBQUFBLFFBQWdCcEQsSUFBRTRELEVBQUV2WixNQUFwQixDQUEyQixJQUFHLFFBQU02WSxDQUFULEVBQVcsT0FBTSxDQUFDbEQsQ0FBUCxDQUFTLEtBQUksSUFBSXdELElBQUUxVCxPQUFPb1QsQ0FBUCxDQUFOLEVBQWdCOVksSUFBRSxDQUF0QixFQUF3QkEsSUFBRTRWLENBQTFCLEVBQTRCNVYsR0FBNUIsRUFBZ0M7QUFBQyxVQUFJaVosSUFBRU8sRUFBRXhaLENBQUYsQ0FBTixDQUFXLElBQUdnWixFQUFFQyxDQUFGLE1BQU9HLEVBQUVILENBQUYsQ0FBUCxJQUFhLEVBQUVBLEtBQUtHLENBQVAsQ0FBaEIsRUFBMEIsT0FBTSxDQUFDLENBQVA7QUFBUyxZQUFNLENBQUMsQ0FBUDtBQUFTLEdBQXp3QixFQUEwd0JnSSxJQUFFLFdBQVN0SSxDQUFULEVBQVdFLENBQVgsRUFBYVEsQ0FBYixFQUFlNUQsQ0FBZixFQUFpQjtBQUFDLFFBQUdrRCxNQUFJRSxDQUFQLEVBQVMsT0FBTyxNQUFJRixDQUFKLElBQU8sSUFBRUEsQ0FBRixJQUFLLElBQUVFLENBQXJCLENBQXVCLElBQUcsUUFBTUYsQ0FBTixJQUFTLFFBQU1FLENBQWxCLEVBQW9CLE9BQU0sQ0FBQyxDQUFQLENBQVMsSUFBR0YsS0FBR0EsQ0FBTixFQUFRLE9BQU9FLEtBQUdBLENBQVYsQ0FBWSxJQUFJSSxXQUFTTixDQUFULHlDQUFTQSxDQUFULENBQUosQ0FBZSxPQUFNLENBQUMsZUFBYU0sQ0FBYixJQUFnQixhQUFXQSxDQUEzQixJQUE4QixvQkFBaUJKLENBQWpCLHlDQUFpQkEsQ0FBakIsRUFBL0IsS0FBb0RxSSxFQUFFdkksQ0FBRixFQUFJRSxDQUFKLEVBQU1RLENBQU4sRUFBUTVELENBQVIsQ0FBMUQ7QUFBcUUsR0FBbjhCLEVBQW84QnlMLElBQUUsV0FBU3ZJLENBQVQsRUFBV0UsQ0FBWCxFQUFhUSxDQUFiLEVBQWU1RCxDQUFmLEVBQWlCO0FBQUNrRCxpQkFBYXRTLENBQWIsS0FBaUJzUyxJQUFFQSxFQUFFYSxRQUFyQixHQUErQlgsYUFBYXhTLENBQWIsS0FBaUJ3UyxJQUFFQSxFQUFFVyxRQUFyQixDQUEvQixDQUE4RCxJQUFJUCxJQUFFRSxFQUFFL1AsSUFBRixDQUFPdVAsQ0FBUCxDQUFOLENBQWdCLElBQUdNLE1BQUlFLEVBQUUvUCxJQUFGLENBQU95UCxDQUFQLENBQVAsRUFBaUIsT0FBTSxDQUFDLENBQVAsQ0FBUyxRQUFPSSxDQUFQLEdBQVUsS0FBSSxpQkFBSixDQUFzQixLQUFJLGlCQUFKO0FBQXNCLGVBQU0sS0FBR04sQ0FBSCxJQUFNLEtBQUdFLENBQWYsQ0FBaUIsS0FBSSxpQkFBSjtBQUFzQixlQUFNLENBQUNGLENBQUQsSUFBSSxDQUFDQSxDQUFMLEdBQU8sQ0FBQ0UsQ0FBRCxJQUFJLENBQUNBLENBQVosR0FBYyxLQUFHLENBQUNGLENBQUosR0FBTSxJQUFFLENBQUNBLENBQUgsSUFBTSxJQUFFRSxDQUFkLEdBQWdCLENBQUNGLENBQUQsSUFBSSxDQUFDRSxDQUF6QyxDQUEyQyxLQUFJLGVBQUosQ0FBb0IsS0FBSSxrQkFBSjtBQUF1QixlQUFNLENBQUNGLENBQUQsSUFBSSxDQUFDRSxDQUFYLENBQWEsS0FBSSxpQkFBSjtBQUFzQixlQUFPRSxFQUFFMEksT0FBRixDQUFVclksSUFBVixDQUFldVAsQ0FBZixNQUFvQkksRUFBRTBJLE9BQUYsQ0FBVXJZLElBQVYsQ0FBZXlQLENBQWYsQ0FBM0IsQ0FBdE4sQ0FBbVEsSUFBSWhaLElBQUUscUJBQW1Cb1osQ0FBekIsQ0FBMkIsSUFBRyxDQUFDcFosQ0FBSixFQUFNO0FBQUMsVUFBRyxvQkFBaUI4WSxDQUFqQix5Q0FBaUJBLENBQWpCLE1BQW9CLG9CQUFpQkUsQ0FBakIseUNBQWlCQSxDQUFqQixFQUF2QixFQUEwQyxPQUFNLENBQUMsQ0FBUCxDQUFTLElBQUlDLElBQUVILEVBQUU5RSxXQUFSO0FBQUEsVUFBb0J5RixJQUFFVCxFQUFFaEYsV0FBeEIsQ0FBb0MsSUFBR2lGLE1BQUlRLENBQUosSUFBTyxFQUFFalQsRUFBRTRULFVBQUYsQ0FBYW5CLENBQWIsS0FBaUJBLGFBQWFBLENBQTlCLElBQWlDelMsRUFBRTRULFVBQUYsQ0FBYVgsQ0FBYixDQUFqQyxJQUFrREEsYUFBYUEsQ0FBakUsQ0FBUCxJQUE0RSxpQkFBZ0JYLENBQTVGLElBQStGLGlCQUFnQkUsQ0FBbEgsRUFBb0gsT0FBTSxDQUFDLENBQVA7QUFBUyxTQUFFcEQsS0FBRyxFQUFMLENBQVEsS0FBSSxJQUFJeUQsSUFBRSxDQUFDRyxJQUFFQSxLQUFHLEVBQU4sRUFBVXZaLE1BQXBCLEVBQTJCb1osR0FBM0I7QUFBZ0MsVUFBR0csRUFBRUgsQ0FBRixNQUFPUCxDQUFWLEVBQVksT0FBT2xELEVBQUV5RCxDQUFGLE1BQU9MLENBQWQ7QUFBNUMsS0FBNEQsSUFBR1EsRUFBRWxTLElBQUYsQ0FBT3dSLENBQVAsR0FBVWxELEVBQUV0TyxJQUFGLENBQU8wUixDQUFQLENBQVYsRUFBb0JoWixDQUF2QixFQUF5QjtBQUFDLFVBQUcsQ0FBQ3FaLElBQUVQLEVBQUU3WSxNQUFMLE1BQWUrWSxFQUFFL1ksTUFBcEIsRUFBMkIsT0FBTSxDQUFDLENBQVAsQ0FBUyxPQUFLb1osR0FBTDtBQUFVLFlBQUcsQ0FBQytILEVBQUV0SSxFQUFFTyxDQUFGLENBQUYsRUFBT0wsRUFBRUssQ0FBRixDQUFQLEVBQVlHLENBQVosRUFBYzVELENBQWQsQ0FBSixFQUFxQixPQUFNLENBQUMsQ0FBUDtBQUEvQjtBQUF3QyxLQUF0RyxNQUEwRztBQUFDLFVBQUloTSxDQUFKO0FBQUEsVUFBTThQLElBQUVsVCxFQUFFYixJQUFGLENBQU9tVCxDQUFQLENBQVIsQ0FBa0IsSUFBR08sSUFBRUssRUFBRXpaLE1BQUosRUFBV3VHLEVBQUViLElBQUYsQ0FBT3FULENBQVAsRUFBVS9ZLE1BQVYsS0FBbUJvWixDQUFqQyxFQUFtQyxPQUFNLENBQUMsQ0FBUCxDQUFTLE9BQUtBLEdBQUw7QUFBVSxZQUFHelAsSUFBRThQLEVBQUVMLENBQUYsQ0FBRixFQUFPLENBQUN2UCxFQUFFa1AsQ0FBRixFQUFJcFAsQ0FBSixDQUFELElBQVMsQ0FBQ3dYLEVBQUV0SSxFQUFFbFAsQ0FBRixDQUFGLEVBQU9vUCxFQUFFcFAsQ0FBRixDQUFQLEVBQVk0UCxDQUFaLEVBQWM1RCxDQUFkLENBQXBCLEVBQXFDLE9BQU0sQ0FBQyxDQUFQO0FBQS9DO0FBQXdELFlBQU80RCxFQUFFcUksR0FBRixJQUFRak0sRUFBRWlNLEdBQUYsRUFBUixFQUFnQixDQUFDLENBQXhCO0FBQTBCLEdBQXgzRCxFQUF5M0RyYixFQUFFc2IsT0FBRixHQUFVLFVBQVNoSixDQUFULEVBQVdFLENBQVgsRUFBYTtBQUFDLFdBQU9vSSxFQUFFdEksQ0FBRixFQUFJRSxDQUFKLENBQVA7QUFBYyxHQUEvNUQsRUFBZzZEeFMsRUFBRXViLE9BQUYsR0FBVSxVQUFTakosQ0FBVCxFQUFXO0FBQUMsV0FBTyxRQUFNQSxDQUFOLEtBQVV4UyxFQUFFd1MsQ0FBRixNQUFPdFMsRUFBRU0sT0FBRixDQUFVZ1MsQ0FBVixLQUFjdFMsRUFBRXlXLFFBQUYsQ0FBV25FLENBQVgsQ0FBZCxJQUE2QnRTLEVBQUV3WCxXQUFGLENBQWNsRixDQUFkLENBQXBDLElBQXNELE1BQUlBLEVBQUU3WSxNQUE1RCxHQUFtRSxNQUFJdUcsRUFBRWIsSUFBRixDQUFPbVQsQ0FBUCxFQUFVN1ksTUFBM0YsQ0FBUDtBQUEwRyxHQUFoaUUsRUFBaWlFdUcsRUFBRXdiLFNBQUYsR0FBWSxVQUFTbEosQ0FBVCxFQUFXO0FBQUMsV0FBTSxFQUFFLENBQUNBLENBQUQsSUFBSSxNQUFJQSxFQUFFM0IsUUFBWixDQUFOO0FBQTRCLEdBQXJsRSxFQUFzbEUzUSxFQUFFTSxPQUFGLEdBQVUwUyxLQUFHLFVBQVNWLENBQVQsRUFBVztBQUFDLFdBQU0scUJBQW1CUSxFQUFFL1AsSUFBRixDQUFPdVAsQ0FBUCxDQUF6QjtBQUFtQyxHQUFscEUsRUFBbXBFdFMsRUFBRTZULFFBQUYsR0FBVyxVQUFTdkIsQ0FBVCxFQUFXO0FBQUMsUUFBSUUsV0FBU0YsQ0FBVCx5Q0FBU0EsQ0FBVCxDQUFKLENBQWUsT0FBTSxlQUFhRSxDQUFiLElBQWdCLGFBQVdBLENBQVgsSUFBYyxDQUFDLENBQUNGLENBQXRDO0FBQXdDLEdBQWp1RSxFQUFrdUV0UyxFQUFFdVUsSUFBRixDQUFPLENBQUMsV0FBRCxFQUFhLFVBQWIsRUFBd0IsUUFBeEIsRUFBaUMsUUFBakMsRUFBMEMsTUFBMUMsRUFBaUQsUUFBakQsRUFBMEQsT0FBMUQsRUFBa0UsUUFBbEUsRUFBMkUsS0FBM0UsRUFBaUYsU0FBakYsRUFBMkYsS0FBM0YsRUFBaUcsU0FBakcsQ0FBUCxFQUFtSCxVQUFTL0IsQ0FBVCxFQUFXO0FBQUN4UyxNQUFFLE9BQUt3UyxDQUFQLElBQVUsVUFBU0YsQ0FBVCxFQUFXO0FBQUMsYUFBT1EsRUFBRS9QLElBQUYsQ0FBT3VQLENBQVAsTUFBWSxhQUFXRSxDQUFYLEdBQWEsR0FBaEM7QUFBb0MsS0FBMUQ7QUFBMkQsR0FBMUwsQ0FBbHVFLEVBQTg1RXhTLEVBQUV3WCxXQUFGLENBQWN4VSxTQUFkLE1BQTJCaEQsRUFBRXdYLFdBQUYsR0FBYyxVQUFTbEYsQ0FBVCxFQUFXO0FBQUMsV0FBT2hQLEVBQUVnUCxDQUFGLEVBQUksUUFBSixDQUFQO0FBQXFCLEdBQTFFLENBQTk1RSxDQUEwK0UsSUFBSW1KLElBQUVuSixFQUFFN0wsUUFBRixJQUFZNkwsRUFBRTdMLFFBQUYsQ0FBV2lWLFVBQTdCLENBQXdDLGNBQVksT0FBTSxHQUFsQixJQUF1QixvQkFBaUJDLFNBQWpCLHlDQUFpQkEsU0FBakIsRUFBdkIsSUFBbUQsY0FBWSxPQUFPRixDQUF0RSxLQUEwRXpiLEVBQUU0VCxVQUFGLEdBQWEsVUFBU3RCLENBQVQsRUFBVztBQUFDLFdBQU0sY0FBWSxPQUFPQSxDQUFuQixJQUFzQixDQUFDLENBQTdCO0FBQStCLEdBQWxJLEdBQW9JdFMsRUFBRTRiLFFBQUYsR0FBVyxVQUFTdEosQ0FBVCxFQUFXO0FBQUMsV0FBTSxDQUFDdFMsRUFBRTZiLFFBQUYsQ0FBV3ZKLENBQVgsQ0FBRCxJQUFnQnNKLFNBQVN0SixDQUFULENBQWhCLElBQTZCLENBQUN4VCxNQUFNRSxXQUFXc1QsQ0FBWCxDQUFOLENBQXBDO0FBQXlELEdBQXBOLEVBQXFOdFMsRUFBRWxCLEtBQUYsR0FBUSxVQUFTd1QsQ0FBVCxFQUFXO0FBQUMsV0FBT3RTLEVBQUVTLFFBQUYsQ0FBVzZSLENBQVgsS0FBZXhULE1BQU13VCxDQUFOLENBQXRCO0FBQStCLEdBQXhRLEVBQXlRdFMsRUFBRThYLFNBQUYsR0FBWSxVQUFTeEYsQ0FBVCxFQUFXO0FBQUMsV0FBTSxDQUFDLENBQUQsS0FBS0EsQ0FBTCxJQUFRLENBQUMsQ0FBRCxLQUFLQSxDQUFiLElBQWdCLHVCQUFxQlEsRUFBRS9QLElBQUYsQ0FBT3VQLENBQVAsQ0FBM0M7QUFBcUQsR0FBdFYsRUFBdVZ0UyxFQUFFOGIsTUFBRixHQUFTLFVBQVN4SixDQUFULEVBQVc7QUFBQyxXQUFPLFNBQU9BLENBQWQ7QUFBZ0IsR0FBNVgsRUFBNlh0UyxFQUFFK2IsV0FBRixHQUFjLFVBQVN6SixDQUFULEVBQVc7QUFBQyxXQUFPLEtBQUssQ0FBTCxLQUFTQSxDQUFoQjtBQUFrQixHQUF6YSxFQUEwYXRTLEVBQUVnYyxHQUFGLEdBQU0sVUFBUzFKLENBQVQsRUFBV0UsQ0FBWCxFQUFhO0FBQUMsUUFBRyxDQUFDeFMsRUFBRU0sT0FBRixDQUFVa1MsQ0FBVixDQUFKLEVBQWlCLE9BQU9sUCxFQUFFZ1AsQ0FBRixFQUFJRSxDQUFKLENBQVAsQ0FBYyxLQUFJLElBQUlRLElBQUVSLEVBQUUvWSxNQUFSLEVBQWUyVixJQUFFLENBQXJCLEVBQXVCQSxJQUFFNEQsQ0FBekIsRUFBMkI1RCxHQUEzQixFQUErQjtBQUFDLFVBQUl3RCxJQUFFSixFQUFFcEQsQ0FBRixDQUFOLENBQVcsSUFBRyxRQUFNa0QsQ0FBTixJQUFTLENBQUM5WSxFQUFFdUosSUFBRixDQUFPdVAsQ0FBUCxFQUFTTSxDQUFULENBQWIsRUFBeUIsT0FBTSxDQUFDLENBQVAsQ0FBU04sSUFBRUEsRUFBRU0sQ0FBRixDQUFGO0FBQU8sWUFBTSxDQUFDLENBQUNJLENBQVI7QUFBVSxHQUEzakIsRUFBNGpCaFQsRUFBRWljLFVBQUYsR0FBYSxZQUFVO0FBQUMsV0FBTzNKLEVBQUU5UixDQUFGLEdBQUlnUyxDQUFKLEVBQU0sSUFBYjtBQUFrQixHQUF0bUIsRUFBdW1CeFMsRUFBRTJULFFBQUYsR0FBVyxVQUFTckIsQ0FBVCxFQUFXO0FBQUMsV0FBT0EsQ0FBUDtBQUFTLEdBQXZvQixFQUF3b0J0UyxFQUFFa2MsUUFBRixHQUFXLFVBQVM1SixDQUFULEVBQVc7QUFBQyxXQUFPLFlBQVU7QUFBQyxhQUFPQSxDQUFQO0FBQVMsS0FBM0I7QUFBNEIsR0FBM3JCLEVBQTRyQnRTLEVBQUVnTyxJQUFGLEdBQU8sWUFBVSxDQUFFLENBQS9zQixFQUFndEJoTyxFQUFFK1QsUUFBRixHQUFXLFVBQVN2QixDQUFULEVBQVc7QUFBQyxXQUFPeFMsRUFBRU0sT0FBRixDQUFVa1MsQ0FBVixJQUFhLFVBQVNGLENBQVQsRUFBVztBQUFDLGFBQU84QixFQUFFOUIsQ0FBRixFQUFJRSxDQUFKLENBQVA7QUFBYyxLQUF2QyxHQUF3QzJCLEVBQUUzQixDQUFGLENBQS9DO0FBQW9ELEdBQTN4QixFQUE0eEJ4UyxFQUFFbWMsVUFBRixHQUFhLFVBQVMzSixDQUFULEVBQVc7QUFBQyxXQUFPLFFBQU1BLENBQU4sR0FBUSxZQUFVLENBQUUsQ0FBcEIsR0FBcUIsVUFBU0YsQ0FBVCxFQUFXO0FBQUMsYUFBT3RTLEVBQUVNLE9BQUYsQ0FBVWdTLENBQVYsSUFBYThCLEVBQUU1QixDQUFGLEVBQUlGLENBQUosQ0FBYixHQUFvQkUsRUFBRUYsQ0FBRixDQUEzQjtBQUFnQyxLQUF4RTtBQUF5RSxHQUE5M0IsRUFBKzNCdFMsRUFBRThULE9BQUYsR0FBVTlULEVBQUVvYyxPQUFGLEdBQVUsVUFBUzVKLENBQVQsRUFBVztBQUFDLFdBQU9BLElBQUV4UyxFQUFFMGEsU0FBRixDQUFZLEVBQVosRUFBZWxJLENBQWYsQ0FBRixFQUFvQixVQUFTRixDQUFULEVBQVc7QUFBQyxhQUFPdFMsRUFBRW1iLE9BQUYsQ0FBVTdJLENBQVYsRUFBWUUsQ0FBWixDQUFQO0FBQXNCLEtBQTdEO0FBQThELEdBQTc5QixFQUE4OUJ4UyxFQUFFcWMsS0FBRixHQUFRLFVBQVMvSixDQUFULEVBQVdFLENBQVgsRUFBYVEsQ0FBYixFQUFlO0FBQUMsUUFBSTVELElBQUUvTyxNQUFNTyxLQUFLcVQsR0FBTCxDQUFTLENBQVQsRUFBVzNCLENBQVgsQ0FBTixDQUFOLENBQTJCRSxJQUFFZ0IsRUFBRWhCLENBQUYsRUFBSVEsQ0FBSixFQUFNLENBQU4sQ0FBRixDQUFXLEtBQUksSUFBSUosSUFBRSxDQUFWLEVBQVlBLElBQUVOLENBQWQsRUFBZ0JNLEdBQWhCO0FBQW9CeEQsUUFBRXdELENBQUYsSUFBS0osRUFBRUksQ0FBRixDQUFMO0FBQXBCLEtBQThCLE9BQU94RCxDQUFQO0FBQVMsR0FBbmtDLEVBQW9rQ3BQLEVBQUVnVyxNQUFGLEdBQVMsVUFBUzFELENBQVQsRUFBV0UsQ0FBWCxFQUFhO0FBQUMsV0FBTyxRQUFNQSxDQUFOLEtBQVVBLElBQUVGLENBQUYsRUFBSUEsSUFBRSxDQUFoQixHQUFtQkEsSUFBRTFSLEtBQUt1UixLQUFMLENBQVd2UixLQUFLb1YsTUFBTCxNQUFleEQsSUFBRUYsQ0FBRixHQUFJLENBQW5CLENBQVgsQ0FBNUI7QUFBOEQsR0FBenBDLEVBQTBwQ3RTLEVBQUVvWixHQUFGLEdBQU1rRCxLQUFLbEQsR0FBTCxJQUFVLFlBQVU7QUFBQyxXQUFPLElBQUlrRCxJQUFKLEVBQUQsQ0FBV0MsT0FBWCxFQUFOO0FBQTJCLEdBQWh0QyxDQUFpdEMsSUFBSUMsSUFBRSxFQUFDLEtBQUksT0FBTCxFQUFhLEtBQUksTUFBakIsRUFBd0IsS0FBSSxNQUE1QixFQUFtQyxLQUFJLFFBQXZDLEVBQWdELEtBQUksUUFBcEQsRUFBNkQsS0FBSSxRQUFqRSxFQUFOO0FBQUEsTUFBaUZDLElBQUV6YyxFQUFFcWEsTUFBRixDQUFTbUMsQ0FBVCxDQUFuRjtBQUFBLE1BQStGRSxJQUFFLFNBQUZBLENBQUUsQ0FBU2xLLENBQVQsRUFBVztBQUFDLFFBQUlRLElBQUUsU0FBRkEsQ0FBRSxDQUFTVixDQUFULEVBQVc7QUFBQyxhQUFPRSxFQUFFRixDQUFGLENBQVA7QUFBWSxLQUE5QjtBQUFBLFFBQStCQSxJQUFFLFFBQU10UyxFQUFFYixJQUFGLENBQU9xVCxDQUFQLEVBQVVtSyxJQUFWLENBQWUsR0FBZixDQUFOLEdBQTBCLEdBQTNEO0FBQUEsUUFBK0R2TixJQUFFd04sT0FBT3RLLENBQVAsQ0FBakU7QUFBQSxRQUEyRU0sSUFBRWdLLE9BQU90SyxDQUFQLEVBQVMsR0FBVCxDQUE3RSxDQUEyRixPQUFPLFVBQVNBLENBQVQsRUFBVztBQUFDLGFBQU9BLElBQUUsUUFBTUEsQ0FBTixHQUFRLEVBQVIsR0FBVyxLQUFHQSxDQUFoQixFQUFrQmxELEVBQUV4UCxJQUFGLENBQU8wUyxDQUFQLElBQVVBLEVBQUUzRyxPQUFGLENBQVVpSCxDQUFWLEVBQVlJLENBQVosQ0FBVixHQUF5QlYsQ0FBbEQ7QUFBb0QsS0FBdkU7QUFBd0UsR0FBaFIsQ0FBaVJ0UyxFQUFFNmMsTUFBRixHQUFTSCxFQUFFRixDQUFGLENBQVQsRUFBY3hjLEVBQUU4YyxRQUFGLEdBQVdKLEVBQUVELENBQUYsQ0FBekIsRUFBOEJ6YyxFQUFFK2MsTUFBRixHQUFTLFVBQVN6SyxDQUFULEVBQVdFLENBQVgsRUFBYVEsQ0FBYixFQUFlO0FBQUNoVCxNQUFFTSxPQUFGLENBQVVrUyxDQUFWLE1BQWVBLElBQUUsQ0FBQ0EsQ0FBRCxDQUFqQixFQUFzQixJQUFJcEQsSUFBRW9ELEVBQUUvWSxNQUFSLENBQWUsSUFBRyxDQUFDMlYsQ0FBSixFQUFNLE9BQU9wUCxFQUFFNFQsVUFBRixDQUFhWixDQUFiLElBQWdCQSxFQUFFalEsSUFBRixDQUFPdVAsQ0FBUCxDQUFoQixHQUEwQlUsQ0FBakMsQ0FBbUMsS0FBSSxJQUFJSixJQUFFLENBQVYsRUFBWUEsSUFBRXhELENBQWQsRUFBZ0J3RCxHQUFoQixFQUFvQjtBQUFDLFVBQUlwWixJQUFFLFFBQU04WSxDQUFOLEdBQVEsS0FBSyxDQUFiLEdBQWVBLEVBQUVFLEVBQUVJLENBQUYsQ0FBRixDQUFyQixDQUE2QixLQUFLLENBQUwsS0FBU3BaLENBQVQsS0FBYUEsSUFBRXdaLENBQUYsRUFBSUosSUFBRXhELENBQW5CLEdBQXNCa0QsSUFBRXRTLEVBQUU0VCxVQUFGLENBQWFwYSxDQUFiLElBQWdCQSxFQUFFdUosSUFBRixDQUFPdVAsQ0FBUCxDQUFoQixHQUEwQjlZLENBQWxEO0FBQW9ELFlBQU84WSxDQUFQO0FBQVMsR0FBcFAsQ0FBcVAsSUFBSTBLLElBQUUsQ0FBTixDQUFRaGQsRUFBRWlkLFFBQUYsR0FBVyxVQUFTM0ssQ0FBVCxFQUFXO0FBQUMsUUFBSUUsSUFBRSxFQUFFd0ssQ0FBRixHQUFJLEVBQVYsQ0FBYSxPQUFPMUssSUFBRUEsSUFBRUUsQ0FBSixHQUFNQSxDQUFiO0FBQWUsR0FBbkQsRUFBb0R4UyxFQUFFa2QsZ0JBQUYsR0FBbUIsRUFBQ0MsVUFBUyxpQkFBVixFQUE0QkMsYUFBWSxrQkFBeEMsRUFBMkRQLFFBQU8sa0JBQWxFLEVBQXZFLENBQTZKLElBQUlRLElBQUUsTUFBTjtBQUFBLE1BQWFDLElBQUUsRUFBQyxLQUFJLEdBQUwsRUFBUyxNQUFLLElBQWQsRUFBbUIsTUFBSyxHQUF4QixFQUE0QixNQUFLLEdBQWpDLEVBQXFDLFVBQVMsT0FBOUMsRUFBc0QsVUFBUyxPQUEvRCxFQUFmO0FBQUEsTUFBdUZDLElBQUUsMkJBQXpGO0FBQUEsTUFBcUhDLElBQUUsU0FBRkEsQ0FBRSxDQUFTbEwsQ0FBVCxFQUFXO0FBQUMsV0FBTSxPQUFLZ0wsRUFBRWhMLENBQUYsQ0FBWDtBQUFnQixHQUFuSixDQUFvSnRTLEVBQUV5ZCxRQUFGLEdBQVcsVUFBU2prQixDQUFULEVBQVc4WSxDQUFYLEVBQWFFLENBQWIsRUFBZTtBQUFDLEtBQUNGLENBQUQsSUFBSUUsQ0FBSixLQUFRRixJQUFFRSxDQUFWLEdBQWFGLElBQUV0UyxFQUFFaWIsUUFBRixDQUFXLEVBQVgsRUFBYzNJLENBQWQsRUFBZ0J0UyxFQUFFa2QsZ0JBQWxCLENBQWYsQ0FBbUQsSUFBSWxLLENBQUo7QUFBQSxRQUFNNUQsSUFBRXdOLE9BQU8sQ0FBQyxDQUFDdEssRUFBRXVLLE1BQUYsSUFBVVEsQ0FBWCxFQUFjL1gsTUFBZixFQUFzQixDQUFDZ04sRUFBRThLLFdBQUYsSUFBZUMsQ0FBaEIsRUFBbUIvWCxNQUF6QyxFQUFnRCxDQUFDZ04sRUFBRTZLLFFBQUYsSUFBWUUsQ0FBYixFQUFnQi9YLE1BQWhFLEVBQXdFcVgsSUFBeEUsQ0FBNkUsR0FBN0UsSUFBa0YsSUFBekYsRUFBOEYsR0FBOUYsQ0FBUjtBQUFBLFFBQTJHbEssSUFBRSxDQUE3RztBQUFBLFFBQStHUSxJQUFFLFFBQWpILENBQTBIelosRUFBRW1TLE9BQUYsQ0FBVXlELENBQVYsRUFBWSxVQUFTa0QsQ0FBVCxFQUFXRSxDQUFYLEVBQWFRLENBQWIsRUFBZTVELENBQWYsRUFBaUJ3RCxDQUFqQixFQUFtQjtBQUFDLGFBQU9LLEtBQUd6WixFQUFFK0YsS0FBRixDQUFRa1QsQ0FBUixFQUFVRyxDQUFWLEVBQWFqSCxPQUFiLENBQXFCNFIsQ0FBckIsRUFBdUJDLENBQXZCLENBQUgsRUFBNkIvSyxJQUFFRyxJQUFFTixFQUFFN1ksTUFBbkMsRUFBMEMrWSxJQUFFUyxLQUFHLGdCQUFjVCxDQUFkLEdBQWdCLGdDQUFyQixHQUFzRFEsSUFBRUMsS0FBRyxnQkFBY0QsQ0FBZCxHQUFnQixzQkFBckIsR0FBNEM1RCxNQUFJNkQsS0FBRyxTQUFPN0QsQ0FBUCxHQUFTLFVBQWhCLENBQTVJLEVBQXdLa0QsQ0FBL0s7QUFBaUwsS0FBak4sR0FBbU5XLEtBQUcsTUFBdE4sRUFBNk5YLEVBQUVvTCxRQUFGLEtBQWF6SyxJQUFFLHFCQUFtQkEsQ0FBbkIsR0FBcUIsS0FBcEMsQ0FBN04sRUFBd1FBLElBQUUsNkNBQTJDLG1EQUEzQyxHQUErRkEsQ0FBL0YsR0FBaUcsZUFBM1csQ0FBMlgsSUFBRztBQUFDRCxVQUFFLElBQUkySyxRQUFKLENBQWFyTCxFQUFFb0wsUUFBRixJQUFZLEtBQXpCLEVBQStCLEdBQS9CLEVBQW1DekssQ0FBbkMsQ0FBRjtBQUF3QyxLQUE1QyxDQUE0QyxPQUFNWCxDQUFOLEVBQVE7QUFBQyxZQUFNQSxFQUFFaE4sTUFBRixHQUFTMk4sQ0FBVCxFQUFXWCxDQUFqQjtBQUFtQixTQUFJTSxJQUFFLFNBQUZBLENBQUUsQ0FBU04sQ0FBVCxFQUFXO0FBQUMsYUFBT1UsRUFBRWpRLElBQUYsQ0FBTyxJQUFQLEVBQVl1UCxDQUFaLEVBQWN0UyxDQUFkLENBQVA7QUFBd0IsS0FBMUM7QUFBQSxRQUEyQzZTLElBQUVQLEVBQUVvTCxRQUFGLElBQVksS0FBekQsQ0FBK0QsT0FBTzlLLEVBQUV0TixNQUFGLEdBQVMsY0FBWXVOLENBQVosR0FBYyxNQUFkLEdBQXFCSSxDQUFyQixHQUF1QixHQUFoQyxFQUFvQ0wsQ0FBM0M7QUFBNkMsR0FBdnZCLEVBQXd2QjVTLEVBQUU0ZCxLQUFGLEdBQVEsVUFBU3RMLENBQVQsRUFBVztBQUFDLFFBQUlFLElBQUV4UyxFQUFFc1MsQ0FBRixDQUFOLENBQVcsT0FBT0UsRUFBRXFMLE1BQUYsR0FBUyxDQUFDLENBQVYsRUFBWXJMLENBQW5CO0FBQXFCLEdBQTV5QixDQUE2eUIsSUFBSXNMLElBQUUsU0FBRkEsQ0FBRSxDQUFTeEwsQ0FBVCxFQUFXRSxDQUFYLEVBQWE7QUFBQyxXQUFPRixFQUFFdUwsTUFBRixHQUFTN2QsRUFBRXdTLENBQUYsRUFBS29MLEtBQUwsRUFBVCxHQUFzQnBMLENBQTdCO0FBQStCLEdBQW5ELENBQW9EeFMsRUFBRStkLEtBQUYsR0FBUSxVQUFTL0ssQ0FBVCxFQUFXO0FBQUMsV0FBT2hULEVBQUV1VSxJQUFGLENBQU92VSxFQUFFc2EsU0FBRixDQUFZdEgsQ0FBWixDQUFQLEVBQXNCLFVBQVNWLENBQVQsRUFBVztBQUFDLFVBQUlFLElBQUV4UyxFQUFFc1MsQ0FBRixJQUFLVSxFQUFFVixDQUFGLENBQVgsQ0FBZ0J0UyxFQUFFcUUsU0FBRixDQUFZaU8sQ0FBWixJQUFlLFlBQVU7QUFBQyxZQUFJQSxJQUFFLENBQUMsS0FBS2EsUUFBTixDQUFOLENBQXNCLE9BQU9QLEVBQUU5UCxLQUFGLENBQVF3UCxDQUFSLEVBQVV0UCxTQUFWLEdBQXFCOGEsRUFBRSxJQUFGLEVBQU90TCxFQUFFMVAsS0FBRixDQUFROUMsQ0FBUixFQUFVc1MsQ0FBVixDQUFQLENBQTVCO0FBQWlELE9BQWpHO0FBQWtHLEtBQXBKLEdBQXNKdFMsQ0FBN0o7QUFBK0osR0FBbkwsRUFBb0xBLEVBQUUrZCxLQUFGLENBQVEvZCxDQUFSLENBQXBMLEVBQStMQSxFQUFFdVUsSUFBRixDQUFPLENBQUMsS0FBRCxFQUFPLE1BQVAsRUFBYyxTQUFkLEVBQXdCLE9BQXhCLEVBQWdDLE1BQWhDLEVBQXVDLFFBQXZDLEVBQWdELFNBQWhELENBQVAsRUFBa0UsVUFBUy9CLENBQVQsRUFBVztBQUFDLFFBQUlRLElBQUU1RCxFQUFFb0QsQ0FBRixDQUFOLENBQVd4UyxFQUFFcUUsU0FBRixDQUFZbU8sQ0FBWixJQUFlLFlBQVU7QUFBQyxVQUFJRixJQUFFLEtBQUthLFFBQVgsQ0FBb0IsT0FBT0gsRUFBRWxRLEtBQUYsQ0FBUXdQLENBQVIsRUFBVXRQLFNBQVYsR0FBcUIsWUFBVXdQLENBQVYsSUFBYSxhQUFXQSxDQUF4QixJQUEyQixNQUFJRixFQUFFN1ksTUFBakMsSUFBeUMsT0FBTzZZLEVBQUUsQ0FBRixDQUFyRSxFQUEwRXdMLEVBQUUsSUFBRixFQUFPeEwsQ0FBUCxDQUFqRjtBQUEyRixLQUF6STtBQUEwSSxHQUFuTyxDQUEvTCxFQUFvYXRTLEVBQUV1VSxJQUFGLENBQU8sQ0FBQyxRQUFELEVBQVUsTUFBVixFQUFpQixPQUFqQixDQUFQLEVBQWlDLFVBQVNqQyxDQUFULEVBQVc7QUFBQyxRQUFJRSxJQUFFcEQsRUFBRWtELENBQUYsQ0FBTixDQUFXdFMsRUFBRXFFLFNBQUYsQ0FBWWlPLENBQVosSUFBZSxZQUFVO0FBQUMsYUFBT3dMLEVBQUUsSUFBRixFQUFPdEwsRUFBRTFQLEtBQUYsQ0FBUSxLQUFLcVEsUUFBYixFQUFzQm5RLFNBQXRCLENBQVAsQ0FBUDtBQUFnRCxLQUExRTtBQUEyRSxHQUFuSSxDQUFwYSxFQUF5aUJoRCxFQUFFcUUsU0FBRixDQUFZb0osS0FBWixHQUFrQixZQUFVO0FBQUMsV0FBTyxLQUFLMEYsUUFBWjtBQUFxQixHQUEzbEIsRUFBNGxCblQsRUFBRXFFLFNBQUYsQ0FBWStXLE9BQVosR0FBb0JwYixFQUFFcUUsU0FBRixDQUFZMlosTUFBWixHQUFtQmhlLEVBQUVxRSxTQUFGLENBQVlvSixLQUEvb0IsRUFBcXBCek4sRUFBRXFFLFNBQUYsQ0FBWTNFLFFBQVosR0FBcUIsWUFBVTtBQUFDLFdBQU9zYixPQUFPLEtBQUs3SCxRQUFaLENBQVA7QUFBNkIsR0FBbHRCLEVBQW10QixjQUFZLFVBQVosSUFBMkIsZ0dBQTNCLElBQXVDLGlDQUFvQixFQUFwQixtQ0FBdUIsWUFBVTtBQUFDLFdBQU9uVCxDQUFQO0FBQVMsR0FBM0M7QUFBQSxvR0FBMXZCO0FBQXV5QixDQUExN2lCLEVBQUQsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKQTs7QUFFTyxJQUFNaWUsMEJBQVMsU0FBVEEsTUFBUyxDQUFVdFgsSUFBVixFQUFnQkMsSUFBaEIsRUFBc0I7QUFDeEMsV0FBUUQsS0FBS2hILE9BQUwsQ0FBYSxPQUFiLEtBQXlCLENBQXpCLElBQThCaUgsUUFBUSxNQUE5QztBQUNILENBRk07QUFHQSxJQUFNc1gsOEJBQVcsU0FBWEEsUUFBVyxDQUFVdlgsSUFBVixFQUFnQkMsSUFBaEIsRUFBc0I7QUFDMUMsUUFBR0QsSUFBSCxFQUFRO0FBQ0osZUFBUUEsS0FBS2hILE9BQUwsQ0FBYSxLQUFiLE1BQXdCLENBQXhCLElBQTZCZ0gsS0FBS2hILE9BQUwsQ0FBYSxNQUFiLE1BQXlCLENBQXRELElBQTJEaUgsU0FBUyxRQUE1RTtBQUNIO0FBQ0QsV0FBTyxLQUFQO0FBQ0gsQ0FMTTtBQU1BLElBQU11WCwwQkFBUyxTQUFUQSxNQUFTLENBQVV4WCxJQUFWLEVBQWdCQyxJQUFoQixFQUFzQjtBQUN4QyxXQUFTQSxTQUFTLEtBQVQsSUFBbUJBLFNBQVMsTUFBNUIsSUFBc0NBLFNBQVMsc0JBQS9DLElBQXlFLCtCQUFpQkQsSUFBakIsS0FBMEIsS0FBNUc7QUFDSCxDQUZNLEM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWFA7Ozs7QUFJTyxJQUFNeVgsd0NBQWdCLFNBQWhCQSxhQUFnQixDQUFTQyxVQUFULEVBQXFCO0FBQzlDLFFBQU1DLFVBQVU3WCxTQUFTOFgsb0JBQVQsQ0FBOEIsUUFBOUIsQ0FBaEI7QUFDQSxTQUFLLElBQUkva0IsSUFBSSxDQUFiLEVBQWdCQSxJQUFJOGtCLFFBQVE3a0IsTUFBNUIsRUFBb0NELEdBQXBDLEVBQXlDO0FBQ3JDLFlBQU1nbEIsTUFBTUYsUUFBUTlrQixDQUFSLEVBQVdnbEIsR0FBdkI7QUFDQSxZQUFJQSxHQUFKLEVBQVM7QUFDTCxnQkFBTTNlLFFBQVEyZSxJQUFJek0sV0FBSixDQUFnQixNQUFNc00sVUFBdEIsQ0FBZDtBQUNBLGdCQUFJeGUsU0FBUyxDQUFiLEVBQWdCO0FBQ1osdUJBQU8yZSxJQUFJemUsTUFBSixDQUFXLENBQVgsRUFBY0YsUUFBUSxDQUF0QixDQUFQO0FBQ0g7QUFDSjtBQUNKO0FBQ0QsV0FBTyxFQUFQO0FBQ0gsQ0FaTSxDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0pQOzs7QUFHTyxJQUFNakgsNEJBQVUsa0JBQWhCLEMiLCJmaWxlIjoib3ZlbnBsYXllci5zZGsuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcblxuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHR9O1xuXG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcIm92ZW5wbGF5ZXIuc2RrXCI6IDBcbiBcdH07XG5cblxuXG4gXHQvLyBzY3JpcHQgcGF0aCBmdW5jdGlvblxuIFx0ZnVuY3Rpb24ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCkge1xuIFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArICh7XCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuaHRtbDVcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5odG1sNVwiLFwib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLmh0bWw1XCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLmh0bWw1XCJ9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLmpzXCJcbiBcdH1cblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCkge1xuIFx0XHR2YXIgcHJvbWlzZXMgPSBbXTtcblxuXG4gXHRcdC8vIEpTT05QIGNodW5rIGxvYWRpbmcgZm9yIGphdmFzY3JpcHRcblxuIFx0XHR2YXIgaW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIHsgLy8gMCBtZWFucyBcImFscmVhZHkgaW5zdGFsbGVkXCIuXG5cbiBcdFx0XHQvLyBhIFByb21pc2UgbWVhbnMgXCJjdXJyZW50bHkgbG9hZGluZ1wiLlxuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0pO1xuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHQvLyBzZXR1cCBQcm9taXNlIGluIGNodW5rIGNhY2hlXG4gXHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XTtcbiBcdFx0XHRcdH0pO1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0gPSBwcm9taXNlKTtcblxuIFx0XHRcdFx0Ly8gc3RhcnQgY2h1bmsgbG9hZGluZ1xuIFx0XHRcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuIFx0XHRcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuIFx0XHRcdFx0dmFyIG9uU2NyaXB0Q29tcGxldGU7XG5cbiBcdFx0XHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04JztcbiBcdFx0XHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuIFx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcbiBcdFx0XHRcdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c2NyaXB0LnNyYyA9IGpzb25wU2NyaXB0U3JjKGNodW5rSWQpO1xuXG4gXHRcdFx0XHRvblNjcmlwdENvbXBsZXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gXHRcdFx0XHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cbiBcdFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gbnVsbDtcbiBcdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuIFx0XHRcdFx0XHR2YXIgY2h1bmsgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdFx0XHRcdGlmKGNodW5rICE9PSAwKSB7XG4gXHRcdFx0XHRcdFx0aWYoY2h1bmspIHtcbiBcdFx0XHRcdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG4gXHRcdFx0XHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuIFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCdMb2FkaW5nIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJyk7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci50eXBlID0gZXJyb3JUeXBlO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG4gXHRcdFx0XHRcdFx0XHRjaHVua1sxXShlcnJvcik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fTtcbiBcdFx0XHRcdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuIFx0XHRcdFx0XHRvblNjcmlwdENvbXBsZXRlKHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KTtcbiBcdFx0XHRcdH0sIDEyMDAwMCk7XG4gXHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlO1xuIFx0XHRcdFx0aGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBvbiBlcnJvciBmdW5jdGlvbiBmb3IgYXN5bmMgbG9hZGluZ1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikgeyBjb25zb2xlLmVycm9yKGVycik7IHRocm93IGVycjsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9qcy9vdmVucGxheWVyLnNkay5qc1wiKTtcbiIsIi8qIGdsb2JhbHMgX193ZWJwYWNrX2FtZF9vcHRpb25zX18gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfYW1kX29wdGlvbnNfXztcclxuIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsIGV2YWwpKFwidGhpc1wiKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdGlmICghbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxuXHRcdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcblx0fVxuXHRyZXR1cm4gbW9kdWxlO1xufTtcbiIsIi8vaW1wb3J0IENhcHRpb25NYW5hZ2VyIGZyb20gXCJhcGkvY2FwdGlvbi9NYW5hZ2VyXCI7XG5pbXBvcnQgQ29uZmlndXJhdG9yIGZyb20gXCJhcGkvQ29uZmlndXJhdG9yXCI7XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJhcGkvRXZlbnRFbWl0dGVyXCI7XG5pbXBvcnQgTGF6eUNvbW1hbmRFeGVjdXRvciBmcm9tIFwiYXBpL0xhenlDb21tYW5kRXhlY3V0b3JcIjtcbmltcG9ydCBMb2dNYW5hZ2VyIGZyb20gXCJ1dGlscy9sb2dnZXJcIjtcbmltcG9ydCBNZWRpYU1hbmFnZXIgZnJvbSBcImFwaS9tZWRpYS9NYW5hZ2VyXCI7XG5pbXBvcnQgUGxheWxpc3RNYW5hZ2VyIGZyb20gXCJhcGkvcGxheWxpc3QvTWFuYWdlclwiO1xuaW1wb3J0IFByb3ZpZGVyQ29udHJvbGxlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL0NvbnRyb2xsZXJcIjtcbmltcG9ydCBQcm9taXNlLCB7cmVzb2x2ZWR9IGZyb20gXCJhcGkvc2hpbXMvcHJvbWlzZVwiO1xuaW1wb3J0IHtSRUFEWSwgRVJST1IsIElOSVRfRVJST1IsIERFU1RST1ksIE5FVFdPUktfVU5TVEFCTEVELCBQTEFZRVJfRklMRV9FUlJPUn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcbmltcG9ydCB7dmVyc2lvbn0gZnJvbSAndmVyc2lvbic7XG5cbi8qKlxuICogQGJyaWVmICAgVGhpcyBvYmplY3QgY29ubmVjdHMgVUkgdG8gdGhlIHByb3ZpZGVyLlxuICogQHBhcmFtICAge29iamVjdH0gICAgY29udGFpbmVyICBkb20gZWxlbWVudFxuICpcbiAqICovXG5cbmNvbnN0IEFwaSA9IGZ1bmN0aW9uKGNvbnRhaW5lcil7XG4gICAgbGV0IGxvZ01hbmFnZXIgPSBMb2dNYW5hZ2VyKCk7XG4gICAgY29uc3QgdGhhdCA9IHt9O1xuICAgIEV2ZW50RW1pdHRlcih0aGF0KTtcblxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIltbT3ZlblBsYXllcl1dIHYuXCIrIHZlcnNpb24pO1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSBsb2FkZWQuXCIpO1xuICAgIC8vbGV0IGNhcHRpb25NYW5hZ2VyID0gQ2FwdGlvbk1hbmFnZXIodGhhdCk7XG4gICAgbGV0IG1lZGlhTWFuYWdlciA9IE1lZGlhTWFuYWdlcihjb250YWluZXIpO1xuICAgIGxldCBwbGF5bGlzdE1hbmFnZXIgPSBQbGF5bGlzdE1hbmFnZXIoKTtcbiAgICBsZXQgcHJvdmlkZXJDb250cm9sbGVyID0gUHJvdmlkZXJDb250cm9sbGVyKCk7XG4gICAgbGV0IGN1cnJlbnRQcm92aWRlciA9IFwiXCI7XG4gICAgbGV0IHBsYXllckNvbmZpZyA9IFwiXCI7XG4gICAgbGV0IGxhenlRdWV1ZSA9IFwiXCI7XG5cbiAgICBjb25zdCBpbml0UHJvdmlkZXIgPSBmdW5jdGlvbihsYXN0UGxheVBvc2l0aW9uKXtcbiAgICAgICAgY29uc3QgcGlja1F1YWxpdHlGcm9tU291cmNlID0gKHNvdXJjZXMpID0+e1xuICAgICAgICAgICAgdmFyIHF1YWxpdHkgPSAwO1xuICAgICAgICAgICAgaWYgKHNvdXJjZXMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZXNbaV0uZGVmYXVsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVhbGl0eSA9IGk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRRdWFsaXR5TGFiZWwoKSAmJiBzb3VyY2VzW2ldLmxhYmVsID09PSBwbGF5ZXJDb25maWcuZ2V0UXVhbGl0eUxhYmVsKCkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBxdWFsaXR5O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBwcm92aWRlckNvbnRyb2xsZXIubG9hZFByb3ZpZGVycyhwbGF5bGlzdE1hbmFnZXIuZ2V0UGxheWxpc3QoKSkudGhlbihQcm92aWRlcnMgPT4ge1xuICAgICAgICAgICAgaWYoY3VycmVudFByb3ZpZGVyKXtcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlciA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB2aWRlb0VsZW1lbnQgPSBtZWRpYU1hbmFnZXIuY3JlYXRlRWxlbWVudCgpO1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRTb3VyY2VJbmRleCA9IHBpY2tRdWFsaXR5RnJvbVNvdXJjZShwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKSk7XG5cbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcImN1cnJlbnQgc291cmNlIGluZGV4IDogXCIrIGN1cnJlbnRTb3VyY2VJbmRleCk7XG5cbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlciA9IFByb3ZpZGVyc1tjdXJyZW50U291cmNlSW5kZXhdKHZpZGVvRWxlbWVudCwgcGxheWVyQ29uZmlnKTtcblxuICAgICAgICAgICAgLy9UaGlzIHBhc3NlcyB0aGUgZXZlbnQgY3JlYXRlZCBieSB0aGUgUHJvdmlkZXIgdG8gQVBJLlxuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLm9uKFwiYWxsXCIsIGZ1bmN0aW9uKG5hbWUsIGRhdGEpe1xuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihuYW1lLCBkYXRhKTtcblxuICAgICAgICAgICAgICAgIC8vQXV0byBuZXh0IHNvdXJjZSB3aGVuIHBsYXllciBsb2FkIHdhcyBmYWlsIGJ5IGFtaXNzIHNvdXJjZS5cbiAgICAgICAgICAgICAgICBpZiggKG5hbWUgPT09IEVSUk9SICYmIChkYXRhLmNvZGUgPT09IFBMQVlFUl9GSUxFX0VSUk9SIHx8IHBhcnNlSW50KGRhdGEuY29kZS8xMDApID09PSA1KSlcbiAgICAgICAgICAgICAgICAgICAgfHwgbmFtZSA9PT0gTkVUV09SS19VTlNUQUJMRUQgKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRRdWFsaXR5ID0gdGhhdC5nZXRDdXJyZW50UXVhbGl0eSgpO1xuICAgICAgICAgICAgICAgICAgICBpZihjdXJyZW50UXVhbGl0eSsxIDwgdGhhdC5nZXRRdWFsaXR5TGV2ZWxzKCkubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcyBzZXF1ZW50aWFsIGhhcyBhdmFpbGFibGUgc291cmNlLlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wYXVzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRDdXJyZW50UXVhbGl0eShjdXJyZW50UXVhbGl0eSsxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KS50aGVuKCgpPT57XG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIucHJlbG9hZChwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKSwgbGFzdFBsYXlQb3NpdGlvbiApO1xuXG4gICAgICAgICAgICBsYXp5UXVldWUuZmx1c2goKTtcbiAgICAgICAgICAgIC8vVGhpcyBpcyBubyByZWFzb24gdG8gZXhpc3QgYW55bW9yZS5cbiAgICAgICAgICAgIGxhenlRdWV1ZS5kZXN0cm95KCk7XG5cbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihSRUFEWSk7XG4gICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc3QgZXJyb3JPYmplY3QgPSB7Y29kZSA6IElOSVRfRVJST1IsIHJlYXNvbiA6IFwiaW5pdCBlcnJvci5cIiwgbWVzc2FnZSA6IFwiUGxheWVyIGluaXQgZXJyb3IuXCIsIGVycm9yIDogZXJyb3J9O1xuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKEVSUk9SLCBlcnJvck9iamVjdCk7XG5cbiAgICAgICAgICAgIC8veHh4IDogSWYgeW91IGluaXQgZW1wdHkgc291cmNlcy4gKEkgdGhpbmsgdGhpcyBpcyBzdHJhbmdlIGNhc2UuKVxuICAgICAgICAgICAgLy9UaGlzIHdvcmtzIGZvciB0aGlzIGNhc2UuXG4gICAgICAgICAgICAvL3BsYXllciA9IE92ZW5QbGF5ZXIuY3JlYXRlKFwiZWxJZFwiLCB7fSk7XG4gICAgICAgICAgICAvL3BsYXllci5sb2FkKHNvcnVjZXMpO1xuICAgICAgICAgICAgbGF6eVF1ZXVlLnJlbW92ZUFuZEV4Y3V0ZU9uY2UoXCJsb2FkXCIpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBBUEkg7LSI6riw7ZmUIO2VqOyImFxuICAgICAqIGluaXRcbiAgICAgKiBAcGFyYW0gICAgICB7b2JqZWN0fSBvcHRpb25zIHBsYXllciBpbml0aWFsIG9wdGlvbiB2YWx1ZS5cbiAgICAgKiBAcmV0dXJuc1xuICAgICAqKi9cbiAgICB0aGF0LmluaXQgPSAob3B0aW9ucykgPT57XG4gICAgICAgIC8vSXQgY29sbGVjdHMgdGhlIGNvbW1hbmRzIGFuZCBleGVjdXRlcyB0aGVtIGF0IHRoZSB0aW1lIHdoZW4gdGhleSBhcmUgZXhlY3V0YWJsZS5cbiAgICAgICAgbGF6eVF1ZXVlID0gTGF6eUNvbW1hbmRFeGVjdXRvcih0aGF0LCBbJ2xvYWQnLCdwbGF5JywncGF1c2UnLCdzZWVrJywnc3RvcCcsICdnZXREdXJhdGlvbicsICdnZXRQb3NpdGlvbicsICdnZXRWb2x1bWUnLCAnZ2V0TXV0ZScsICdnZXRCdWZmZXInLCAnZ2V0U3RhdGUnXSk7XG4gICAgICAgIHBsYXllckNvbmZpZyA9IENvbmZpZ3VyYXRvcihvcHRpb25zKTtcbiAgICAgICAgaWYoIXBsYXllckNvbmZpZy5pc0RlYnVnKCkpe1xuICAgICAgICAgICAgbG9nTWFuYWdlci5kaXNhYmxlKCk7XG4gICAgICAgIH1cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaW5pdCgpXCIpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpbml0KCkgY29uZmlnIDogXCIsIHBsYXllckNvbmZpZyk7XG5cbiAgICAgICAgcGxheWxpc3RNYW5hZ2VyLnNldFBsYXlsaXN0KHBsYXllckNvbmZpZy5nZXRQbGF5bGlzdCgpKTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaW5pdCgpIHNvdXJjZXMgOiBcIiAsIHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50U291cmNlcygpKTtcbiAgICAgICAgaW5pdFByb3ZpZGVyKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldENvbmZpZyA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Q29uZmlnKClcIiwgcGxheWVyQ29uZmlnLmdldENvbmZpZygpKTtcbiAgICAgICAgcmV0dXJuIHBsYXllckNvbmZpZy5nZXRDb25maWcoKTtcbiAgICB9O1xuXG4gICAgdGhhdC5nZXREdXJhdGlvbiA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0RHVyYXRpb24oKVwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0RHVyYXRpb24oKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0RHVyYXRpb24oKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0UG9zaXRpb24gPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFBvc2l0aW9uKClcIiwgY3VycmVudFByb3ZpZGVyLmdldFBvc2l0aW9uKCkpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFBvc2l0aW9uKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldFZvbHVtZSA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Vm9sdW1lKClcIiwgY3VycmVudFByb3ZpZGVyLmdldFZvbHVtZSgpKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRWb2x1bWUoKTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Vm9sdW1lID0gKHZvbHVtZSkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRWb2x1bWUoKSBcIiArIHZvbHVtZSk7XG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5zZXRWb2x1bWUodm9sdW1lKTtcbiAgICB9O1xuICAgIHRoYXQuc2V0TXV0ZSA9IChzdGF0ZSkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRNdXRlKCkgXCIgKyBzdGF0ZSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2V0TXV0ZShzdGF0ZSk7XG4gICAgfTtcbiAgICB0aGF0LmdldE11dGUgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldE11dGUoKSBcIiArIGN1cnJlbnRQcm92aWRlci5nZXRNdXRlKCkpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldE11dGUoKTtcbiAgICB9O1xuICAgIHRoYXQubG9hZCA9IChwbGF5bGlzdCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBsb2FkKCkgXCIsIHBsYXlsaXN0KTtcbiAgICAgICAgbGF6eVF1ZXVlID0gTGF6eUNvbW1hbmRFeGVjdXRvcih0aGF0LCBbJ3BsYXknLCdzZWVrJywnc3RvcCddKTtcblxuICAgICAgICBpZihwbGF5bGlzdCl7XG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIuc2V0Q3VycmVudFF1YWxpdHkoMCk7XG4gICAgICAgICAgICBwbGF5bGlzdE1hbmFnZXIuc2V0UGxheWxpc3QocGxheWxpc3QpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbml0UHJvdmlkZXIoKTtcblxuICAgIH07XG4gICAgdGhhdC5wbGF5ID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBwbGF5KCkgXCIpO1xuICAgICAgICBjdXJyZW50UHJvdmlkZXIucGxheSgpO1xuICAgIH1cbiAgICB0aGF0LnBhdXNlID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBwYXVzZSgpIFwiKTtcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnBhdXNlKCk7XG4gICAgfTtcbiAgICB0aGF0LnNlZWsgPSAocG9zaXRpb24pID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2VlaygpIFwiKyBwb3NpdGlvbik7XG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5zZWVrKHBvc2l0aW9uKTtcbiAgICB9O1xuICAgIHRoYXQuc2V0UGxheWJhY2tSYXRlID0gKHBsYXliYWNrUmF0ZSkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldFBsYXliYWNrUmF0ZSgpIFwiLCBwbGF5YmFja1JhdGUpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLnNldFBsYXliYWNrUmF0ZShwbGF5ZXJDb25maWcuc2V0RGVmYXVsdFBsYXliYWNrUmF0ZShwbGF5YmFja1JhdGUpKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0UGxheWJhY2tSYXRlID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFBsYXliYWNrUmF0ZSgpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0UGxheWJhY2tSYXRlKCkpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFBsYXliYWNrUmF0ZSgpO1xuICAgIH07XG4gICAgdGhhdC5nZXRRdWFsaXR5TGV2ZWxzID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFF1YWxpdHlMZXZlbHMoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldFF1YWxpdHlMZXZlbHMoKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0UXVhbGl0eUxldmVscygpO1xuICAgIH07XG4gICAgdGhhdC5nZXRDdXJyZW50UXVhbGl0eSA9ICgpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRDdXJyZW50UXVhbGl0eSgpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFF1YWxpdHkoKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFF1YWxpdHkoKTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Q3VycmVudFF1YWxpdHkgPSAocXVhbGl0eUluZGV4KSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Q3VycmVudFF1YWxpdHkoKSBcIiwgcXVhbGl0eUluZGV4KTtcblxuICAgICAgICBsZXQgc291cmNlcyA9IHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50U291cmNlcygpO1xuICAgICAgICBsZXQgY3VycmVudFNvdXJjZSA9IHNvdXJjZXNbdGhhdC5nZXRDdXJyZW50UXVhbGl0eSgpXTtcbiAgICAgICAgbGV0IG5ld1NvdXJjZSA9IHNvdXJjZXNbcXVhbGl0eUluZGV4XTtcbiAgICAgICAgbGV0IGxhc3RQbGF5UG9zaXRpb24gPSB0aGF0LmdldFBvc2l0aW9uKCk7XG4gICAgICAgIGxldCBpc1NhbWVQcm92aWRlciA9IHByb3ZpZGVyQ29udHJvbGxlci5pc1NhbWVQcm92aWRlcihjdXJyZW50U291cmNlLCBuZXdTb3VyY2UpO1xuICAgICAgICAvLyBwcm92aWRlci5zZXJDdXJyZW50UXVhbGl0eSAtPiBwbGF5ZXJDb25maWcgc2V0dGluZyAtPiBsb2FkXG4gICAgICAgIGxldCByZXNRdWFsaXR5SW5kZXggPSBjdXJyZW50UHJvdmlkZXIuc2V0Q3VycmVudFF1YWxpdHkocXVhbGl0eUluZGV4LCBpc1NhbWVQcm92aWRlcik7XG5cbiAgICAgICAgaWYoIW5ld1NvdXJjZSl7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEN1cnJlbnRRdWFsaXR5KCkgaXNTYW1lUHJvdmlkZXJcIiwgaXNTYW1lUHJvdmlkZXIpO1xuXG4gICAgICAgIGlmKCFpc1NhbWVQcm92aWRlcil7XG4gICAgICAgICAgICBsYXp5UXVldWUgPSBMYXp5Q29tbWFuZEV4ZWN1dG9yKHRoYXQsIFsncGxheSddKTtcbiAgICAgICAgICAgIGluaXRQcm92aWRlcihsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXNRdWFsaXR5SW5kZXg7XG4gICAgfTtcblxuICAgIC8qIENhcHRpb25zIDogVGhpcyBpcyBub3Qgc3VwcG9ydGVkIGluIHRoZSBjdXJyZW50IHZlcnNpb24uKi9cbiAgICAvKnRoYXQuc2V0Q3VycmVudENhcHRpb24gPSAoaW5kZXgpID0+e1xuICAgICAgICByZXR1cm4gY2FwdGlvbk1hbmFnZXIuc2V0Q3VycmVudENhcHRpb24oaW5kZXgpO1xuICAgIH1cbiAgICB0aGF0LmdldEN1cnJlbnRDYXB0aW9uID0gKCkgPT57XG4gICAgICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5nZXRDdXJyZW50Q2FwdGlvbigpO1xuICAgIH1cbiAgICB0aGF0LmdldENhcHRpb25MaXN0ID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gY2FwdGlvbk1hbmFnZXIuZ2V0Q2FwdGlvbkxpc3QoKTtcbiAgICB9XG4gICAgdGhhdC5hZGRDYXB0aW9uID0gKHRyYWNrKSA9PiB7XG4gICAgICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5hZGRDYXB0aW9uKCk7XG4gICAgfVxuICAgIHRoYXQuZ2V0Q2FwdGlvbkxpc3QgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5nZXRDYXB0aW9uTGlzdCgpO1xuICAgIH0qL1xuXG4gICAgdGhhdC5nZXRCdWZmZXIgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEJ1ZmZlcigpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0QnVmZmVyKCkpO1xuICAgICAgICBjdXJyZW50UHJvdmlkZXIuZ2V0QnVmZmVyKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldFN0YXRlID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRTdGF0ZSgpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0U3RhdGUoKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0U3RhdGUoKTtcbiAgICB9O1xuICAgIHRoYXQuc3RvcCA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc3RvcCgpIFwiKTtcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnN0b3AoKTtcbiAgICB9O1xuICAgIHRoYXQucmVtb3ZlID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiByZW1vdmUoKSBcIik7XG4gICAgICAgIGxhenlRdWV1ZS5kZXN0cm95KCk7XG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5kZXN0cm95KCk7XG4gICAgICAgIGN1cnJlbnRQcm92aWRlciA9IG51bGw7XG4gICAgICAgIHByb3ZpZGVyQ29udHJvbGxlciA9IG51bGw7XG4gICAgICAgIHBsYXlsaXN0TWFuYWdlciA9IG51bGw7XG4gICAgICAgIHBsYXllckNvbmZpZyA9IG51bGw7XG5cbiAgICAgICAgdGhhdC50cmlnZ2VyKERFU1RST1kpO1xuICAgICAgICB0aGF0Lm9mZigpO1xuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHJlbW92ZSgpIC0gbGF6eVF1ZXVlLCBjdXJyZW50UHJvdmlkZXIsIHByb3ZpZGVyQ29udHJvbGxlciwgcGxheWxpc3RNYW5hZ2VyLCBwbGF5ZXJDb25maWcsIGFwaSBldmVudCBkZXN0cm9lZC4gXCIpO1xuICAgICAgICBsb2dNYW5hZ2VyLmRlc3Ryb3koKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgQXBpO1xuXG5cbiIsImltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XG5cbi8qKlxuICogQGJyaWVmICAgVGhpcyBpbml0aWFsaXplcyB0aGUgaW5wdXQgb3B0aW9ucy5cbiAqIEBwYXJhbSAgIG9wdGlvbnNcbiAqXG4gKiAqL1xuY29uc3QgQ29uZmlndXJhdG9yID0gZnVuY3Rpb24ob3B0aW9ucyl7XG5cbiAgICBjb25zdCBjb21wb3NlU291cmNlT3B0aW9ucyA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xuICAgICAgICBjb25zdCBEZWZhdWx0cyA9IHtcbiAgICAgICAgICAgIGRlZmF1bHRQbGF5YmFja1JhdGU6IDEsXG4gICAgICAgICAgICBwbGF5YmFja1JhdGVDb250cm9sczogZmFsc2UsXG4gICAgICAgICAgICBwbGF5YmFja1JhdGVzOiBbMC4yNSwgMC41LCAxLCAxLjUsIDJdLFxuICAgICAgICAgICAgbXV0ZTogZmFsc2UsXG4gICAgICAgICAgICB2b2x1bWU6IDkwLFxuICAgICAgICAgICAgd2lkdGg6IDY0MCxcbiAgICAgICAgICAgIGhlaWdodDogMzYwXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHNlcmlhbGl6ZSA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnICYmIHZhbC5sZW5ndGggPCA2KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbG93ZXJjYXNlVmFsID0gdmFsLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgaWYgKGxvd2VyY2FzZVZhbCA9PT0gJ3RydWUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobG93ZXJjYXNlVmFsID09PSAnZmFsc2UnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFpc05hTihOdW1iZXIodmFsKSkgJiYgIWlzTmFOKHBhcnNlRmxvYXQodmFsKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE51bWJlcih2YWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGVzZXJpYWxpemUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gJ2lkJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9wdGlvbnNba2V5XSA9IHNlcmlhbGl6ZShvcHRpb25zW2tleV0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgbm9ybWFsaXplU2l6ZSA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwuc2xpY2UgJiYgdmFsLnNsaWNlKC0yKSA9PT0gJ3B4Jykge1xuICAgICAgICAgICAgICAgIHZhbCA9IHZhbC5zbGljZSgwLCAtMik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGV2YWx1YXRlQXNwZWN0UmF0aW8gPSBmdW5jdGlvbiAoYXIsIHdpZHRoKSB7XG4gICAgICAgICAgICBpZiAod2lkdGgudG9TdHJpbmcoKS5pbmRleE9mKCclJykgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIGFyICE9PSAnc3RyaW5nJyB8fCAhYXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgvXlxcZCpcXC4/XFxkKyUkLy50ZXN0KGFyKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gYXIuaW5kZXhPZignOicpO1xuICAgICAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdyA9IHBhcnNlRmxvYXQoYXIuc3Vic3RyKDAsIGluZGV4KSk7XG4gICAgICAgICAgICBjb25zdCBoID0gcGFyc2VGbG9hdChhci5zdWJzdHIoaW5kZXggKyAxKSk7XG4gICAgICAgICAgICBpZiAodyA8PSAwIHx8IGggPD0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIChoIC8gdyAqIDEwMCkgKyAnJSc7XG4gICAgICAgIH1cbiAgICAgICAgZGVzZXJpYWxpemUob3B0aW9ucyk7XG4gICAgICAgIGxldCBjb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBEZWZhdWx0cywgb3B0aW9ucyk7XG4gICAgICAgIGNvbmZpZy53aWR0aCA9IG5vcm1hbGl6ZVNpemUoY29uZmlnLndpZHRoKTtcbiAgICAgICAgY29uZmlnLmhlaWdodCA9IG5vcm1hbGl6ZVNpemUoY29uZmlnLmhlaWdodCk7XG4gICAgICAgIGNvbmZpZy5hc3BlY3RyYXRpbyA9IGV2YWx1YXRlQXNwZWN0UmF0aW8oY29uZmlnLmFzcGVjdHJhdGlvLCBjb25maWcud2lkdGgpO1xuXG4gICAgICAgIGxldCByYXRlQ29udHJvbHMgPSBjb25maWcucGxheWJhY2tSYXRlQ29udHJvbHM7XG4gICAgICAgIGlmIChyYXRlQ29udHJvbHMpIHtcbiAgICAgICAgICAgIGxldCByYXRlcyA9IGNvbmZpZy5wbGF5YmFja1JhdGVzO1xuXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyYXRlQ29udHJvbHMpKSB7XG4gICAgICAgICAgICAgICAgcmF0ZXMgPSByYXRlQ29udHJvbHM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByYXRlcyA9IHJhdGVzLmZpbHRlcihyYXRlID0+IF8uaXNOdW1iZXIocmF0ZSkgJiYgcmF0ZSA+PSAwLjI1ICYmIHJhdGUgPD0gNClcbiAgICAgICAgICAgICAgICAubWFwKHJhdGUgPT4gTWF0aC5yb3VuZChyYXRlICogNCkgLyA0KTtcblxuICAgICAgICAgICAgaWYgKHJhdGVzLmluZGV4T2YoMSkgPCAwKSB7XG4gICAgICAgICAgICAgICAgcmF0ZXMucHVzaCgxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJhdGVzLnNvcnQoKTtcblxuICAgICAgICAgICAgY29uZmlnLnBsYXliYWNrUmF0ZUNvbnRyb2xzID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbmZpZy5wbGF5YmFja1JhdGVzID0gcmF0ZXM7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmICghY29uZmlnLnBsYXliYWNrUmF0ZUNvbnRyb2xzIHx8IGNvbmZpZy5wbGF5YmFja1JhdGVzLmluZGV4T2YoY29uZmlnLmRlZmF1bHRQbGF5YmFja1JhdGUpIDwgMCkge1xuICAgICAgICAgICAgY29uZmlnLmRlZmF1bHRQbGF5YmFja1JhdGUgPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uZmlnLnBsYXliYWNrUmF0ZSA9IGNvbmZpZy5kZWZhdWx0UGxheWJhY2tSYXRlO1xuXG4gICAgICAgIGlmICghY29uZmlnLmFzcGVjdHJhdGlvKSB7XG4gICAgICAgICAgICBkZWxldGUgY29uZmlnLmFzcGVjdHJhdGlvO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29uZmlnUGxheWxpc3QgPSBjb25maWcucGxheWxpc3Q7XG4gICAgICAgIGlmICghY29uZmlnUGxheWxpc3QpIHtcbiAgICAgICAgICAgIGNvbnN0IG9iaiA9IF8ucGljayhjb25maWcsIFtcbiAgICAgICAgICAgICAgICAndGl0bGUnLFxuICAgICAgICAgICAgICAgICdkZXNjcmlwdGlvbicsXG4gICAgICAgICAgICAgICAgJ3R5cGUnLFxuICAgICAgICAgICAgICAgICdtZWRpYWlkJyxcbiAgICAgICAgICAgICAgICAnaW1hZ2UnLFxuICAgICAgICAgICAgICAgICdmaWxlJyxcbiAgICAgICAgICAgICAgICAnc291cmNlcycsXG4gICAgICAgICAgICAgICAgJ3RyYWNrcycsXG4gICAgICAgICAgICAgICAgJ3ByZWxvYWQnLFxuICAgICAgICAgICAgICAgICdkdXJhdGlvbicsXG4gICAgICAgICAgICAgICAgJ2hvc3QnLFxuICAgICAgICAgICAgICAgICdhcHBsaWNhdGlvbicsXG4gICAgICAgICAgICAgICAgJ3N0cmVhbSdcbiAgICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgICBjb25maWcucGxheWxpc3QgPSBbIG9iaiBdO1xuICAgICAgICB9IGVsc2UgaWYgKF8uaXNBcnJheShjb25maWdQbGF5bGlzdC5wbGF5bGlzdCkpIHtcbiAgICAgICAgICAgIGNvbmZpZy5mZWVkRGF0YSA9IGNvbmZpZ1BsYXlsaXN0O1xuICAgICAgICAgICAgY29uZmlnLnBsYXlsaXN0ID0gY29uZmlnUGxheWxpc3QucGxheWxpc3Q7XG4gICAgICAgIH1cblxuICAgICAgICBkZWxldGUgY29uZmlnLmR1cmF0aW9uO1xuICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgIH07XG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ29uZmlndXJhdG9yIGxvYWRlZC5cIiwgb3B0aW9ucyk7XG4gICAgbGV0IGNvbmZpZyA9IGNvbXBvc2VTb3VyY2VPcHRpb25zKG9wdGlvbnMpO1xuXG4gICAgbGV0IGFzcGVjdHJhdGlvID0gY29uZmlnLmFzcGVjdHJhdGlvIHx8IFwiMTY6OVwiO1xuICAgIGxldCBkZWJ1ZyA9IGNvbmZpZy5kZWJ1ZztcbiAgICBsZXQgZGVmYXVsdFBsYXliYWNrUmF0ZSA9IGNvbmZpZy5kZWZhdWx0UGxheWJhY2tSYXRlIHx8IDE7XG4gICAgbGV0IGltYWdlID0gY29uZmlnLmltYWdlO1xuICAgIGxldCBwbGF5YmFja1JhdGVDb250cm9scyA9IGNvbmZpZy5wbGF5YmFja1JhdGVDb250cm9scyB8fCB0cnVlO1xuICAgIGxldCBwbGF5YmFja1JhdGVzID0gY29uZmlnLnBsYXliYWNrUmF0ZXMgfHwgWzAuNSwgMSwgMS4yNSwgMS41LCAyXTtcbiAgICBsZXQgcGxheWxpc3QgPSBjb25maWcucGxheWxpc3QgfHwgW107XG4gICAgbGV0IHF1YWxpdHlMYWJlbCA9IGNvbmZpZy5xdWFsaXR5TGFiZWwgfHwgXCJcIjtcbiAgICBsZXQgcmVwZWF0ID0gY29uZmlnLnJlcGVhdCB8fCBmYWxzZTtcbiAgICBsZXQgc3RyZXRjaGluZyA9IGNvbmZpZy5zdHJldGNoaW5nIHx8ICd1bmlmb3JtJztcblxuXG5cbiAgICBjb25zdCB0aGF0ID0ge307XG4gICAgdGhhdC5nZXRDb25maWcgPSAoKSA9PiB7cmV0dXJuIGNvbmZpZzt9O1xuXG4gICAgdGhhdC5nZXRBc3BlY3RyYXRpbyA9KCk9PntyZXR1cm4gYXNwZWN0cmF0aW87fTtcbiAgICB0aGF0LnNldEFzcGVjdHJhdGlvID0oYXNwZWN0cmF0aW9fKT0+e2FzcGVjdHJhdGlvID0gYXNwZWN0cmF0aW9fO307XG5cbiAgICB0aGF0LmlzRGVidWcgPSgpPT57cmV0dXJuIGRlYnVnO307XG5cbiAgICB0aGF0LmdldERlZmF1bHRQbGF5YmFja1JhdGUgPSgpPT57cmV0dXJuIGRlZmF1bHRQbGF5YmFja1JhdGU7fTtcbiAgICB0aGF0LnNldERlZmF1bHRQbGF5YmFja1JhdGUgPShwbGF5YmFja1JhdGUpPT57ZGVmYXVsdFBsYXliYWNrUmF0ZSA9IHBsYXliYWNrUmF0ZTsgcmV0dXJuIHBsYXliYWNrUmF0ZTt9O1xuXG4gICAgdGhhdC5nZXRRdWFsaXR5TGFiZWwgPSAoKSA9PiB7cmV0dXJuIHF1YWxpdHlMYWJlbDt9O1xuICAgIHRoYXQuc2V0UXVhbGl0eUxhYmVsID0gKG5ld0xhYmVsKSA9PiB7cXVhbGl0eUxhYmVsID0gbmV3TGFiZWw7fTtcblxuICAgIHRoYXQuZ2V0UGxheWJhY2tSYXRlcyA9KCk9PntyZXR1cm4gcGxheWJhY2tSYXRlczt9O1xuICAgIHRoYXQuaXNQbGF5YmFja1JhdGVDb250cm9scyA9KCk9PntyZXR1cm4gcGxheWJhY2tSYXRlQ29udHJvbHM7fTtcblxuICAgIHRoYXQuZ2V0UGxheWxpc3QgPSgpPT57cmV0dXJuIHBsYXlsaXN0O307XG4gICAgdGhhdC5zZXRQbGF5bGlzdCA9KHBsYXlsaXN0XyApPT57XG4gICAgICAgIGlmKF8uaXNBcnJheShwbGF5bGlzdF8pKXtcbiAgICAgICAgICAgIHBsYXlsaXN0ID0gcGxheWxpc3RfO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHBsYXlsaXN0ID0gW3BsYXlsaXN0X107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBsYXlsaXN0O1xuICAgIH07XG5cbiAgICB0aGF0LmlzUmVwZWF0ID0oKT0+e3JldHVybiByZXBlYXQ7fTtcblxuICAgIHRoYXQuZ2V0U3RyZXRjaGluZyA9KCk9PntyZXR1cm4gc3RyZXRjaGluZzt9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb25maWd1cmF0b3I7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAzLi5cbiAqL1xuXG4vKipcbiAqIEBicmllZiAgIFRoaXMgbW9kdWxlIHByb3ZpZGUgY3VzdG9tIGV2ZW50cy5cbiAqIEBwYXJhbSAgIG9iamVjdCAgICBBbiBvYmplY3QgdGhhdCByZXF1aXJlcyBjdXN0b20gZXZlbnRzLlxuICpcbiAqICovXG5cbmNvbnN0IEV2ZW50RW1pdHRlciA9IGZ1bmN0aW9uKG9iamVjdCl7XG4gICAgbGV0IHRoYXQgPSBvYmplY3Q7XG4gICAgbGV0IF9ldmVudHMgPVtdO1xuXG4gICAgY29uc3QgdHJpZ2dlckV2ZW50cyA9IGZ1bmN0aW9uKGV2ZW50cywgYXJncywgY29udGV4dCl7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgbGV0IGxlbmd0aCA9IGV2ZW50cy5sZW5ndGg7XG4gICAgICAgIGZvcihpID0gMDsgaSA8IGxlbmd0aDsgaSArKyl7XG4gICAgICAgICAgICBsZXQgZXZlbnQgPSBldmVudHNbaV07XG4gICAgICAgICAgICBldmVudC5saXN0ZW5lci5hcHBseSggKCBldmVudC5jb250ZXh0IHx8IGNvbnRleHQgKSwgYXJncyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhhdC5vbiA9IGZ1bmN0aW9uKG5hbWUsIGxpc3RlbmVyLCBjb250ZXh0KXtcbiAgICAgICAgKF9ldmVudHNbbmFtZV0gfHwgKF9ldmVudHNbbmFtZV09W10pICkucHVzaCh7IGxpc3RlbmVyOiBsaXN0ZW5lciAgLCBjb250ZXh0IDogY29udGV4dH0pO1xuICAgICAgICByZXR1cm4gdGhhdDtcbiAgICB9O1xuICAgIHRoYXQudHJpZ2dlciA9IGZ1bmN0aW9uKG5hbWUpe1xuICAgICAgICBpZighX2V2ZW50cyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgY29uc3QgZXZlbnRzID0gX2V2ZW50c1tuYW1lXTtcbiAgICAgICAgY29uc3QgYWxsRXZlbnRzID0gX2V2ZW50cy5hbGw7XG5cbiAgICAgICAgaWYoZXZlbnRzKXtcbiAgICAgICAgICAgIHRyaWdnZXJFdmVudHMoZXZlbnRzLCBhcmdzLCB0aGF0KTtcbiAgICAgICAgfVxuICAgICAgICBpZihhbGxFdmVudHMpe1xuICAgICAgICAgICAgdHJpZ2dlckV2ZW50cyhhbGxFdmVudHMsIGFyZ3VtZW50cywgdGhhdCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQub2ZmID0gZnVuY3Rpb24obmFtZSwgbGlzdGVuZXIsIGNvbnRleHQpe1xuICAgICAgICBpZighX2V2ZW50cyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW5hbWUgJiYgIWxpc3RlbmVyICYmICFjb250ZXh0KSAge1xuICAgICAgICAgICAgX2V2ZW50cyA9IFtdO1xuICAgICAgICAgICAgcmV0dXJuIHRoYXQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuYW1lcyA9IG5hbWUgPyBbbmFtZV0gOiBPYmplY3Qua2V5cyhfZXZlbnRzKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBuYW1lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lc1tpXTtcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50cyA9IF9ldmVudHNbbmFtZV07XG4gICAgICAgICAgICBpZiAoZXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmV0YWluID0gX2V2ZW50c1tuYW1lXSA9IFtdO1xuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lciAgfHwgY29udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMCwgayA9IGV2ZW50cy5sZW5ndGg7IGogPCBrOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gZXZlbnRzW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChsaXN0ZW5lciAmJiBsaXN0ZW5lciAhPT0gZXZlbnQubGlzdGVuZXIgJiYgbGlzdGVuZXIgIT09IGV2ZW50Lmxpc3RlbmVyLmxpc3RlbmVyICAmJiBsaXN0ZW5lciAhPT0gZXZlbnQubGlzdGVuZXIuX2NhbGxiYWNrKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8KGNvbnRleHQgJiYgY29udGV4dCAhPT0gZXZlbnQuY29udGV4dClcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldGFpbi5wdXNoKGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXJldGFpbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIF9ldmVudHNbbmFtZV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGF0O1xuICAgIH07XG4gICAgdGhhdC5vbmNlID0gZnVuY3Rpb24obmFtZSwgbGlzdGVuZXIsIGNvbnRleHQpe1xuICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICBjb25zdCBvbmNlQ2FsbGJhY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChjb3VudCsrKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhhdC5vZmYobmFtZSwgb25jZUNhbGxiYWNrKTtcbiAgICAgICAgICAgIGxpc3RlbmVyLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgICAgIG9uY2VDYWxsYmFjay5fbGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgICAgICAgcmV0dXJuIHRoYXQub24obmFtZSwgb25jZUNhbGxiYWNrLCBjb250ZXh0KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IEV2ZW50RW1pdHRlcjsiLCJpbXBvcnQgXyBmcm9tICd1dGlscy91bmRlcnNjb3JlJztcblxuLyoqXG4gKiBAYnJpZWYgICBUaGlzIGV4ZWN1dGVzIHRoZSBpbnB1dCBjb21tYW5kcyBhdCBhIHNwZWNpZmljIHBvaW50IGluIHRpbWUuXG4gKiBAcGFyYW0gICBpbnN0YW5jZVxuICogQHBhcmFtICAgcXVldWVkQ29tbWFuZHNcbiAqICovXG5jb25zdCBMYXp5Q29tbWFuZEV4ZWN1dG9yID0gZnVuY3Rpb24gKGluc3RhbmNlLCBxdWV1ZWRDb21tYW5kcykge1xuICAgIGxldCBjb21tYW5kUXVldWUgPSBbXTtcbiAgICBsZXQgdW5kZWNvcmF0ZWRNZXRob2RzID0ge307XG4gICAgbGV0IGV4ZWN1dGVNb2RlID0gZmFsc2U7XG4gICAgbGV0IHRoYXQgPSB7fTtcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIGxvYWRlZC5cIik7XG4gICAgcXVldWVkQ29tbWFuZHMuZm9yRWFjaCgoY29tbWFuZCkgPT4ge1xuICAgICAgICBjb25zdCBtZXRob2QgPSBpbnN0YW5jZVtjb21tYW5kXTtcbiAgICAgICAgdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdID0gbWV0aG9kIHx8IGZ1bmN0aW9uKCl7fTtcblxuICAgICAgICBpbnN0YW5jZVtjb21tYW5kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc3QgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgICAgICAgICAgIGlmICghZXhlY3V0ZU1vZGUpIHtcbiAgICAgICAgICAgICAgICAvL2NvbW1hbmRRdWV1ZS5wdXNoKHsgY29tbWFuZCwgYXJncyB9KTtcbiAgICAgICAgICAgICAgICB0aGF0LmFkZFF1ZXVlKGNvbW1hbmQsIGFyZ3MpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGV4ZWN1dGVRdWV1ZWRDb21tYW5kcygpO1xuICAgICAgICAgICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kLmFwcGx5KHRoYXQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KTtcbiAgICB2YXIgZXhlY3V0ZVF1ZXVlZENvbW1hbmRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB3aGlsZSAoY29tbWFuZFF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHsgY29tbWFuZCwgYXJncyB9ID0gY29tbWFuZFF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICAodW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdIHx8IGluc3RhbmNlW2NvbW1hbmRdKS5hcHBseShpbnN0YW5jZSwgYXJncyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGF0LnNldEV4ZWN1dGVNb2RlID0gKG1vZGUpID0+IHtcbiAgICAgICAgZXhlY3V0ZU1vZGUgPSBtb2RlO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogc2V0RXhlY3V0ZU1vZGUoKVwiLCBtb2RlKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0VW5kZWNvcmF0ZWRNZXRob2RzID0gZnVuY3Rpb24oKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGdldFVuZGVjb3JhdGVkTWV0aG9kcygpXCIsIHVuZGVjb3JhdGVkTWV0aG9kcyk7XG4gICAgICAgIHJldHVybiB1bmRlY29yYXRlZE1ldGhvZHM7XG4gICAgfVxuICAgIHRoYXQuZ2V0UXVldWUgPSBmdW5jdGlvbigpe1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZ2V0UXVldWUoKVwiLCBnZXRRdWV1ZSk7XG4gICAgICAgIHJldHVybiBjb21tYW5kUXVldWU7XG4gICAgfVxuICAgIHRoYXQuYWRkUXVldWUgPSBmdW5jdGlvbihjb21tYW5kLCBhcmdzKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGFkZFF1ZXVlKClcIiwgY29tbWFuZCwgYXJncyk7XG4gICAgICAgIGNvbW1hbmRRdWV1ZS5wdXNoKHsgY29tbWFuZCwgYXJncyB9KTtcbiAgICB9XG5cbiAgICB0aGF0LmZsdXNoID0gZnVuY3Rpb24oKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGZsdXNoKClcIik7XG4gICAgICAgIGV4ZWN1dGVRdWV1ZWRDb21tYW5kcygpO1xuICAgIH07XG4gICAgdGhhdC5lbXB0eSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZW1wdHkoKVwiKTtcbiAgICAgICAgY29tbWFuZFF1ZXVlLmxlbmd0aCA9IDA7XG4gICAgfTtcbiAgICB0aGF0Lm9mZiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogb2ZmKClcIik7XG4gICAgICAgIHF1ZXVlZENvbW1hbmRzLmZvckVhY2goKGNvbW1hbmQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1ldGhvZCA9IHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXTtcbiAgICAgICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVtjb21tYW5kXSA9IG1ldGhvZDtcbiAgICAgICAgICAgICAgICBkZWxldGUgdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG5cbiAgICAvL1J1biBvbmNlIGF0IHRoZSBlbmRcbiAgICB0aGF0LnJlbW92ZUFuZEV4Y3V0ZU9uY2UgPSBmdW5jdGlvbihjb21tYW5kXyl7XG4gICAgICAgIGxldCBjb21tYW5kUXVldWVJdGVtID0gXy5maW5kV2hlcmUoY29tbWFuZFF1ZXVlLCB7Y29tbWFuZCA6IGNvbW1hbmRffSk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiByZW1vdmVBbmRFeGN1dGVPbmNlKClcIiwgY29tbWFuZF8pO1xuICAgICAgICBjb21tYW5kUXVldWUuc3BsaWNlKF8uZmluZEluZGV4KGNvbW1hbmRRdWV1ZSwge2NvbW1hbmQgOiBjb21tYW5kX30pLCAxKTtcblxuICAgICAgICBjb25zdCBtZXRob2QgPSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF9dO1xuICAgICAgICBpZiAobWV0aG9kKSB7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJyZW1vdmVDb21tYW5kKClcIik7XG4gICAgICAgICAgICBpZihjb21tYW5kUXVldWVJdGVtKXtcbiAgICAgICAgICAgICAgICAobWV0aG9kfHwgaW5zdGFuY2VbY29tbWFuZF9dKS5hcHBseShpbnN0YW5jZSwgY29tbWFuZFF1ZXVlSXRlbS5hcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluc3RhbmNlW2NvbW1hbmRfXSA9IG1ldGhvZDtcbiAgICAgICAgICAgIGRlbGV0ZSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF9dO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoYXQuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZGVzdHJveSgpXCIpO1xuICAgICAgICB0aGF0Lm9mZigpO1xuICAgICAgICB0aGF0LmVtcHR5KCk7XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTGF6eUNvbW1hbmRFeGVjdXRvcjsiLCJpbXBvcnQge2lzUnRtcCwgaXNXZWJSVEMsIGlzRGFzaH0gZnJvbSBcInV0aWxzL3ZhbGlkYXRvclwiO1xuXG4vKipcbiAqIEBicmllZiAgIFRoaXMgZmluZHMgdGhlIHByb3ZpZGVyIHRoYXQgbWF0Y2hlcyB0aGUgaW5wdXQgc291cmNlLlxuICogQHBhcmFtXG4gKiAqL1xuXG5jb25zdCBTdXBwb3J0Q2hlY2tlciA9IGZ1bmN0aW9uKCl7XG4gICAgY29uc3QgdGhhdCA9IHt9O1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlN1cHBvcnRDaGVja2VyIGxvYWRlZC5cIik7XG4gICAgY29uc3Qgc3VwcG9ydExpc3QgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdodG1sNScsXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBNaW1lVHlwZXMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGFhYzogJ2F1ZGlvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIG1wNDogJ3ZpZGVvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIGY0djogJ3ZpZGVvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIG00djogJ3ZpZGVvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIG1vdjogJ3ZpZGVvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIG1wMzogJ2F1ZGlvL21wZWcnLFxuICAgICAgICAgICAgICAgICAgICBtcGVnOiAnYXVkaW8vbXBlZycsXG4gICAgICAgICAgICAgICAgICAgIG9ndjogJ3ZpZGVvL29nZycsXG4gICAgICAgICAgICAgICAgICAgIG9nZzogJ3ZpZGVvL29nZycsXG4gICAgICAgICAgICAgICAgICAgIG9nYTogJ3ZpZGVvL29nZycsXG4gICAgICAgICAgICAgICAgICAgIHZvcmJpczogJ3ZpZGVvL29nZycsXG4gICAgICAgICAgICAgICAgICAgIHdlYm06ICd2aWRlby93ZWJtJyxcbiAgICAgICAgICAgICAgICAgICAgZjRhOiAndmlkZW8vYWFjJyxcbiAgICAgICAgICAgICAgICAgICAgbTN1ODogJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyxcbiAgICAgICAgICAgICAgICAgICAgbTN1OiAnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnLFxuICAgICAgICAgICAgICAgICAgICBobHM6ICdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCdcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgY29uc3QgdmlkZW8gPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKVxuICAgICAgICAgICAgICAgIH0oKTtcbiAgICAgICAgICAgICAgICBpZiAoIXZpZGVvLmNhblBsYXlUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gc291cmNlLmZpbGU7XG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNvdXJjZS50eXBlO1xuICAgICAgICAgICAgICAgIGlmKCF0eXBlKXtyZXR1cm4gZmFsc2U7fVxuICAgICAgICAgICAgICAgIGNvbnN0IG1pbWVUeXBlID0gc291cmNlLm1pbWVUeXBlIHx8IE1pbWVUeXBlc1t0eXBlXTtcblxuICAgICAgICAgICAgICAgIGlmIChpc1J0bXAoZmlsZSwgdHlwZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKGlzV2ViUlRDKGZpbGUsIHR5cGUpKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghbWltZVR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAhIXZpZGVvLmNhblBsYXlUeXBlKG1pbWVUeXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ3dlYnJ0YycsXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2aWRlbyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpXG4gICAgICAgICAgICAgICAgfSgpO1xuICAgICAgICAgICAgICAgIGlmICghdmlkZW8uY2FuUGxheVR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc291cmNlLnR5cGU7XG5cbiAgICAgICAgICAgICAgICBpZihpc1dlYlJUQyhmaWxlLCB0eXBlKSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnZGFzaCcsXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gc291cmNlLmZpbGU7XG5cbiAgICAgICAgICAgICAgICAvL21wZCBhcHBsaWNhdGlvbi9kYXNoK3htbFxuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcbiAgICAgICAgICAgICAgICBpZiAoaXNEYXNoKGZpbGUsIHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnaGxzJyxcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZpZGVvID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJylcbiAgICAgICAgICAgICAgICB9KCk7XG5cbiAgICAgICAgICAgICAgICAvL3RoaXMgbWV0aG9kIGZyb20gaGxzLmpzXG4gICAgICAgICAgICAgICAgY29uc3QgaXNIbHNTdXBwb3J0ID0gKCkgPT57XG4gICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBnZXRNZWRpYVNvdXJjZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuTWVkaWFTb3VyY2UgfHwgd2luZG93LldlYktpdE1lZGlhU291cmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciBtZWRpYVNvdXJjZSA9IGdldE1lZGlhU291cmNlKCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzb3VyY2VCdWZmZXIgPSB3aW5kb3cuU291cmNlQnVmZmVyIHx8IHdpbmRvdy5XZWJLaXRTb3VyY2VCdWZmZXI7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpc1R5cGVTdXBwb3J0ZWQgPSBtZWRpYVNvdXJjZSAmJiB0eXBlb2YgbWVkaWFTb3VyY2UuaXNUeXBlU3VwcG9ydGVkID09PSAnZnVuY3Rpb24nICYmIG1lZGlhU291cmNlLmlzVHlwZVN1cHBvcnRlZCgndmlkZW8vbXA0OyBjb2RlY3M9XCJhdmMxLjQyRTAxRSxtcDRhLjQwLjJcIicpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIFNvdXJjZUJ1ZmZlciBpcyBleHBvc2VkIGVuc3VyZSBpdHMgQVBJIGlzIHZhbGlkXG4gICAgICAgICAgICAgICAgICAgIC8vIHNhZmFyaSBhbmQgb2xkIHZlcnNpb24gb2YgQ2hyb21lIGRvZSBub3QgZXhwb3NlIFNvdXJjZUJ1ZmZlciBnbG9iYWxseSBzbyBjaGVja2luZyBTb3VyY2VCdWZmZXIucHJvdG90eXBlIGlzIGltcG9zc2libGVcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNvdXJjZUJ1ZmZlclZhbGlkQVBJID0gIXNvdXJjZUJ1ZmZlciB8fCBzb3VyY2VCdWZmZXIucHJvdG90eXBlICYmIHR5cGVvZiBzb3VyY2VCdWZmZXIucHJvdG90eXBlLmFwcGVuZEJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygc291cmNlQnVmZmVyLnByb3RvdHlwZS5yZW1vdmUgPT09ICdmdW5jdGlvbic7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhIWlzVHlwZVN1cHBvcnRlZCAmJiAhIXNvdXJjZUJ1ZmZlclZhbGlkQVBJO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLy9SZW1vdmUgdGhpcyAnISF2aWRlby5jYW5QbGF5VHlwZSgnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnKScgaWYgeW91IHdhbnQgdG8gdXNlIGhsc2pzLlxuICAgICAgICAgICAgICAgIHJldHVybiBpc0hsc1N1cHBvcnQoKSAmJiAhIXZpZGVvLmNhblBsYXlUeXBlKCdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgXTtcblxuICAgIHRoYXQuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlID0gKHNvcnVjZV8pID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU3VwcG9ydENoZWNrZXIgOiBmaW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UoKVwiLCBzb3J1Y2VfKTtcbiAgICAgICAgY29uc3Qgc291cmNlID0gKHNvcnVjZV8gPT09IE9iamVjdChzb3J1Y2VfKSkgPyBzb3J1Y2VfIDoge307XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBzdXBwb3J0TGlzdC5sZW5ndGg7IGkgKyspe1xuICAgICAgICAgICAgaWYoc3VwcG9ydExpc3RbaV0uY2hlY2tTdXBwb3J0KHNvdXJjZSkpe1xuICAgICAgICAgICAgICAgIHJldHVybiBzdXBwb3J0TGlzdFtpXS5uYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LmZpbmRQcm92aWRlck5hbWVzQnlQbGF5bGlzdCA9IChwbGF5bGlzdF8pID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU3VwcG9ydENoZWNrZXIgOiBmaW5kUHJvdmlkZXJOYW1lc0J5UGxheWxpc3QoKVwiLCBwbGF5bGlzdF8pO1xuICAgICAgICBsZXQgc3VwcG9ydE5hbWVzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSBwbGF5bGlzdF8ubGVuZ3RoOyBpLS07KSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gcGxheWxpc3RfW2ldO1xuICAgICAgICAgICAgbGV0IHNvdXJjZSA9IFwiXCI7XG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgaXRlbS5zb3VyY2VzLmxlbmd0aDsgaiArKyl7XG4gICAgICAgICAgICAgICAgc291cmNlID0gaXRlbS5zb3VyY2VzW2pdO1xuICAgICAgICAgICAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3VwcG9ydGVkID0gdGhhdC5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2Uoc291cmNlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1cHBvcnRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VwcG9ydE5hbWVzLnB1c2goc3VwcG9ydGVkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3VwcG9ydE5hbWVzO1xuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTdXBwb3J0Q2hlY2tlcjsiLCIvLyBTVEFURVxuZXhwb3J0IGNvbnN0IFNUQVRFX0JVRkZFUklORyA9ICdidWZmZXJpbmcnO1xuZXhwb3J0IGNvbnN0IFNUQVRFX0lETEUgPSAnaWRsZSc7XG5leHBvcnQgY29uc3QgU1RBVEVfQ09NUExFVEUgPSAnY29tcGxldGUnO1xuZXhwb3J0IGNvbnN0IFNUQVRFX1BBVVNFRCA9ICdwYXVzZWQnO1xuZXhwb3J0IGNvbnN0IFNUQVRFX1BMQVlJTkcgPSAncGxheWluZyc7XG5leHBvcnQgY29uc3QgU1RBVEVfRVJST1IgPSAnZXJyb3InO1xuZXhwb3J0IGNvbnN0IFNUQVRFX0xPQURJTkcgPSAnbG9hZGluZyc7XG5leHBvcnQgY29uc3QgU1RBVEVfU1RBTExFRCA9ICdzdGFsbGVkJztcblxuLy8gUFJPVklERVJcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9IVE1MNSA9ICdodG1sNSc7XG5leHBvcnQgY29uc3QgUFJPVklERVJfV0VCUlRDID0gJ3dlYnJ0Yyc7XG5leHBvcnQgY29uc3QgUFJPVklERVJfREFTSCA9ICdkYXNoJztcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9ITFMgPSAnaGxzJztcblxuLy8gRVZFTlRTXG5leHBvcnQgY29uc3QgQ09OVEVOVF9DT01QTEVURSA9IFNUQVRFX0NPTVBMRVRFO1xuZXhwb3J0IGNvbnN0IFJFQURZID0gJ3JlYWR5JztcbmV4cG9ydCBjb25zdCBERVNUUk9ZID0gJ2Rlc3Ryb3knO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfU0VFSyA9ICdzZWVrJztcbmV4cG9ydCBjb25zdCBDT05URU5UX0JVRkZFUl9GVUxMID0gJ2J1ZmZlckZ1bGwnO1xuZXhwb3J0IGNvbnN0IERJU1BMQVlfQ0xJQ0sgPSAnZGlzcGxheUNsaWNrJztcbmV4cG9ydCBjb25zdCBDT05URU5UX0xPQURFRCA9ICdsb2FkZWQnO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfU0VFS0VEID0gJ3NlZWtlZCc7XG5leHBvcnQgY29uc3QgTkVUV09SS19VTlNUQUJMRUQgPSAndW5zdGFibGVOZXR3b3JrJztcbmV4cG9ydCBjb25zdCBFUlJPUiA9ICdlcnJvcic7XG5cbi8vIFNUQVRFIE9GIFBMQVlFUlxuZXhwb3J0IGNvbnN0IFBMQVlFUl9TVEFURSA9ICdzdGF0ZUNoYW5nZWQnO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9DT01QTEVURSA9IFNUQVRFX0NPTVBMRVRFO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9QQVVTRSA9ICdwYXVzZSc7XG5leHBvcnQgY29uc3QgUExBWUVSX1BMQVkgPSAncGxheSc7XG5cbmV4cG9ydCBjb25zdCBDT05URU5UX0JVRkZFUiA9ICdidWZmZXJDaGFuZ2VkJztcbmV4cG9ydCBjb25zdCBDT05URU5UX1RJTUUgPSAndGltZSc7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9SQVRFX0NIQU5HRSA9ICdyYXRlY2hhbmdlJztcbmV4cG9ydCBjb25zdCBDT05URU5UX1ZPTFVNRSA9ICd2b2x1bWVDaGFuZ2VkJztcbmV4cG9ydCBjb25zdCBDT05URU5UX01VVEUgPSAnbXV0ZSc7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9NRVRBID0gJ21ldGFDaGFuZ2VkJztcbmV4cG9ydCBjb25zdCBDT05URU5UX0xFVkVMUyA9ICdxdWFsaXR5TGV2ZWxDaGFuZ2VkJztcbmV4cG9ydCBjb25zdCBDT05URU5UX0xFVkVMX0NIQU5HRUQgPSAnY3VycmVudFF1YWxpdHlMZXZlbENoYW5nZWQnO1xuZXhwb3J0IGNvbnN0IFBMQVlCQUNLX1JBVEVfQ0hBTkdFRCA9ICdwbGF5YmFja1JhdGVDaGFuZ2VkJztcbmV4cG9ydCBjb25zdCBDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQgPSAnY3VlQ2hhbmdlZCc7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9DQVBUSU9OX0NIQU5HRUQgPSAnY2FwdGlvbkNoYW5nZWQnO1xuXG5cbmV4cG9ydCBjb25zdCBJTklUX0VSUk9SID0gMTAwO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX0VSUk9SID0gMzAwO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUiA9IDMwMTtcbmV4cG9ydCBjb25zdCBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SID0gMzAyO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUiA9IDMwMztcbmV4cG9ydCBjb25zdCBQTEFZRVJfRklMRV9FUlJPUiA9IDMwNDtcbmV4cG9ydCBjb25zdCBQTEFZRVJfQ0FQVElPTl9FUlJPUiA9IDMwNTtcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1dTX0VSUk9SID0gNTAxO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfV1NfQ0xPU0VEID0gNTAyO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUiA9IDUwMztcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1NFVF9SRU1PVEVfREVTQ19FUlJPUiA9IDUwNDtcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX0NSRUFURV9BTlNXRVJfRVJST1IgPSA1MDU7XG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUiA9IDUwNjtcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX05FVFdPUktfU0xPVyA9IDUxMDtcbiIsIi8qKlxuICogQGJyaWVmICAg66+465SU7Ja0IOyXmOumrOuovO2KuOulvCDqtIDrpqztlZjripQg6rCd7LK0LiDtmITsnqzripQg7ZWY64qUIOydvOydtCDrp47sp4Ag7JWK64ukLlxuICogQHBhcmFtICAge2VsZW1lbnR9ICAgY29udGFpbmVyICAgZG9tIGVsZW1lbnRcbiAqXG4gKiAqL1xuXG5jb25zdCBNYW5hZ2VyID0gZnVuY3Rpb24oY29udGFpbmVyKXtcbiAgICBjb25zdCB0aGF0ID0ge307XG4gICAgbGV0IG1lZGlhRWxlbWVudCA9IFwiXCI7XG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTWVkaWFNYW5hZ2VyIGxvYWRlZC5cIik7XG4gICAgY29uc3QgY3JlYXRlTWVkaWFFbGVtZW50ID0gZnVuY3Rpb24oKXtcblxuICAgICAgICBtZWRpYUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCdkaXNhYmxlUmVtb3RlUGxheWJhY2snLCAnJyk7XG4gICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3dlYmtpdC1wbGF5c2lubGluZScsICcnKTtcbiAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgncGxheXNpbmxpbmUnLCAnJyk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChtZWRpYUVsZW1lbnQpO1xuXG4gICAgICAgIHJldHVybiBtZWRpYUVsZW1lbnQ7XG4gICAgfTtcblxuICAgIHRoYXQuY3JlYXRlRWxlbWVudCA9ICgpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJNZWRpYU1hbmFnZXIgY3JlYXRlRWxlbWVudCgpXCIpO1xuICAgICAgICBpZighbWVkaWFFbGVtZW50KXtcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVNZWRpYUVsZW1lbnQoKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjb250YWluZXIucmVtb3ZlQ2hpbGQobWVkaWFFbGVtZW50KTtcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVNZWRpYUVsZW1lbnQoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE1hbmFnZXI7IiwiaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcbmltcG9ydCB7aXNSdG1wLCBpc1dlYlJUQywgaXNEYXNoIH0gZnJvbSBcInV0aWxzL3ZhbGlkYXRvclwiO1xuaW1wb3J0IHtleHRyYWN0RXh0ZW5zaW9uICx0cmltfSBmcm9tIFwiLi4vLi4vdXRpbHMvc3RyaW5nc1wiO1xuaW1wb3J0IFN1cHBvcnRDaGVja2VyIGZyb20gXCIuLi9TdXBwb3J0Q2hlY2tlclwiO1xuXG4vKipcbiAqIEBicmllZiAgIFRoaXMgbWFuYWdlcyBQbGF5bGlzdCBvciBTb3VyY2VzLlxuICogQHBhcmFtXG4gKlxuICogKi9cbmNvbnN0IE1hbmFnZXIgPSBmdW5jdGlvbigpe1xuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICBsZXQgY3VycmVudFBsYXlsaXN0ID0gW107XG4gICAgbGV0IHN1cHBvcnRDaGVja2VyID0gU3VwcG9ydENoZWNrZXIoKTtcblxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBsb2FkZWQuXCIpO1xuXG4gICAgY29uc3QgbWFrZVByZXR0eVNvdXJjZSA9IGZ1bmN0aW9uKHNvdXJjZV8pe1xuICAgICAgICBpZiAoIXNvdXJjZV8gfHwgIXNvdXJjZV8uZmlsZSAmJiAhKHNvdXJjZV8uaG9zdCB8fCBzb3VyY2VfLmFwcGxpY2F0aW9uIHx8IHNvdXJjZV8uc3RyZWFtKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNvdXJjZSA9IE9iamVjdC5hc3NpZ24oe30sIHsgJ2RlZmF1bHQnOiBmYWxzZSB9LCBzb3VyY2VfKTtcbiAgICAgICAgc291cmNlLmZpbGUgPSB0cmltKCcnICsgc291cmNlLmZpbGUpO1xuXG4gICAgICAgIGlmKHNvdXJjZS5ob3N0ICYmIHNvdXJjZS5hcHBsaWNhdGlvbiAmJiBzb3VyY2Uuc3RyZWFtKXtcbiAgICAgICAgICAgIHNvdXJjZS5maWxlID0gc291cmNlLmhvc3QgKyBcIi9cIiArIHNvdXJjZS5hcHBsaWNhdGlvbiArIFwiL3N0cmVhbS9cIiArIHNvdXJjZS5zdHJlYW07XG4gICAgICAgICAgICBkZWxldGUgc291cmNlLmhvc3Q7XG4gICAgICAgICAgICBkZWxldGUgc291cmNlLmFwcGxpY2F0aW9uO1xuICAgICAgICAgICAgZGVsZXRlIHNvdXJjZS5zdHJlYW07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtaW1ldHlwZVJlZ0V4ID0gL15bXi9dK1xcLyg/OngtKT8oW14vXSspJC87XG5cbiAgICAgICAgaWYgKG1pbWV0eXBlUmVnRXgudGVzdChzb3VyY2UudHlwZSkpIHtcbiAgICAgICAgICAgIC8vIGlmIHR5cGUgaXMgZ2l2ZW4gYXMgYSBtaW1ldHlwZVxuICAgICAgICAgICAgc291cmNlLm1pbWVUeXBlID0gc291cmNlLnR5cGU7XG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9IHNvdXJjZS50eXBlLnJlcGxhY2UobWltZXR5cGVSZWdFeCwgJyQxJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihpc1J0bXAoc291cmNlLmZpbGUpKXtcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ3J0bXAnO1xuICAgICAgICB9ZWxzZSBpZihpc1dlYlJUQyhzb3VyY2UuZmlsZSkpe1xuICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnd2VicnRjJztcbiAgICAgICAgfWVsc2UgaWYoaXNEYXNoKHNvdXJjZS5maWxlLCBzb3VyY2UudHlwZSkpe1xuICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnZGFzaCc7XG4gICAgICAgIH1lbHNlIGlmICghc291cmNlLnR5cGUpIHtcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gZXh0cmFjdEV4dGVuc2lvbihzb3VyY2UuZmlsZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXNvdXJjZS50eXBlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBub3JtYWxpemUgdHlwZXNcbiAgICAgICAgc3dpdGNoIChzb3VyY2UudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnbTN1OCc6XG4gICAgICAgICAgICBjYXNlICd2bmQuYXBwbGUubXBlZ3VybCc6XG4gICAgICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnaGxzJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ200YSc6XG4gICAgICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnYWFjJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3NtaWwnOlxuICAgICAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ3J0bXAnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICBpZiAoc291cmNlW2tleV0gPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHNvdXJjZVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc291cmNlO1xuXG4gICAgfVxuXG4gICAgdGhhdC5zZXRQbGF5bGlzdCA9KHBsYXlsaXN0KSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIHNldFBsYXlsaXN0KCkgXCIsIHBsYXlsaXN0KTtcbiAgICAgICAgY29uc3QgcHJldHRpZWRQbGF5bGlzdCA9IChfLmlzQXJyYXkocGxheWxpc3QpID8gcGxheWxpc3QgOiBbcGxheWxpc3RdKS5tYXAoZnVuY3Rpb24oaXRlbSl7XG4gICAgICAgICAgICBpZighXy5pc0FycmF5KGl0ZW0udHJhY2tzKSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBpdGVtLnRyYWNrcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBwbGF5bGlzdEl0ZW0gPSBPYmplY3QuYXNzaWduKHt9LHtcbiAgICAgICAgICAgICAgICBzb3VyY2VzOiBbXSxcbiAgICAgICAgICAgICAgICB0cmFja3M6IFtdXG4gICAgICAgICAgICB9LCBpdGVtICk7XG5cbiAgICAgICAgICAgIGlmKChwbGF5bGlzdEl0ZW0uc291cmNlcyA9PT0gT2JqZWN0KHBsYXlsaXN0SXRlbS5zb3VyY2VzKSkgJiYgIV8uaXNBcnJheShwbGF5bGlzdEl0ZW0uc291cmNlcykpIHtcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IFttYWtlUHJldHR5U291cmNlKHBsYXlsaXN0SXRlbS5zb3VyY2VzKV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKCFfLmlzQXJyYXkocGxheWxpc3RJdGVtLnNvdXJjZXMpIHx8IHBsYXlsaXN0SXRlbS5zb3VyY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmxldmVscykge1xuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IGl0ZW0ubGV2ZWxzO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gW21ha2VQcmV0dHlTb3VyY2UoaXRlbSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcGxheWxpc3RJdGVtLnNvdXJjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgc291cmNlID0gcGxheWxpc3RJdGVtLnNvdXJjZXNbaV07XG4gICAgICAgICAgICAgICAgbGV0IHByZXR0eVNvdXJjZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgaWYgKCFzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGRlZmF1bHRTb3VyY2UgPSBzb3VyY2UuZGVmYXVsdDtcbiAgICAgICAgICAgICAgICBpZiAoZGVmYXVsdFNvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2UuZGVmYXVsdCA9IChkZWZhdWx0U291cmNlLnRvU3RyaW5nKCkgPT09ICd0cnVlJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlLmRlZmF1bHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgc291cmNlIGRvZXNuJ3QgaGF2ZSBhIGxhYmVsLCBudW1iZXIgaXRcbiAgICAgICAgICAgICAgICBpZiAoIXBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldLmxhYmVsID0gcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0udHlwZStcIi1cIitpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcHJldHR5U291cmNlID0gbWFrZVByZXR0eVNvdXJjZShwbGF5bGlzdEl0ZW0uc291cmNlc1tpXSk7XG4gICAgICAgICAgICAgICAgaWYoc3VwcG9ydENoZWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKHByZXR0eVNvdXJjZSkpe1xuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXSA9IHByZXR0eVNvdXJjZTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0gPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBwbGF5bGlzdEl0ZW0uc291cmNlcy5maWx0ZXIoc291cmNlID0+ICEhc291cmNlKTtcblxuICAgICAgICAgICAgLy8gZGVmYXVsdCDqsIAg7JeG7J2E65WMIHdlYnJ0Y+qwgCDsnojri6TrqbQgd2VicnRjIGRlZmF1bHQgOiB0cnVl66GcIOyekOuPmSDshKTsoJVcbiAgICAgICAgICAgIC8qbGV0IGhhdmVEZWZhdWx0ID0gXy5maW5kKHBsYXlsaXN0SXRlbS5zb3VyY2VzLCBmdW5jdGlvbihzb3VyY2Upe3JldHVybiBzb3VyY2UuZGVmYXVsdCA9PSB0cnVlO30pO1xuICAgICAgICAgICAgbGV0IHdlYnJ0Y1NvdXJjZSA9IFtdO1xuICAgICAgICAgICAgaWYoIWhhdmVEZWZhdWx0KXtcbiAgICAgICAgICAgICAgICB3ZWJydGNTb3VyY2UgPSBfLmZpbmQocGxheWxpc3RJdGVtLnNvdXJjZXMsIGZ1bmN0aW9uKHNvdXJjZSl7cmV0dXJuIHNvdXJjZS50eXBlID09IFwid2VicnRjXCI7fSk7XG4gICAgICAgICAgICAgICAgaWYod2VicnRjU291cmNlKXtcbiAgICAgICAgICAgICAgICAgICAgd2VicnRjU291cmNlLmRlZmF1bHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0qL1xuXG5cblxuICAgICAgICAgICAgaWYoIV8uaXNBcnJheShwbGF5bGlzdEl0ZW0udHJhY2tzKSl7XG4gICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnRyYWNrcyA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoXy5pc0FycmF5KHBsYXlsaXN0SXRlbS5jYXB0aW9ucykpe1xuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS50cmFja3MgPSBwbGF5bGlzdEl0ZW0udHJhY2tzLmNvbmNhdChwbGF5bGlzdEl0ZW0uY2FwdGlvbnMpO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBwbGF5bGlzdEl0ZW0uY2FwdGlvbnM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBsYXlsaXN0SXRlbS50cmFja3MgPSBwbGF5bGlzdEl0ZW0udHJhY2tzLm1hcChmdW5jdGlvbih0cmFjayl7XG4gICAgICAgICAgICAgICAgaWYoIXRyYWNrIHx8ICF0cmFjay5maWxlKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwge1xuICAgICAgICAgICAgICAgICAgICAna2luZCc6ICdjYXB0aW9ucycsXG4gICAgICAgICAgICAgICAgICAgICdkZWZhdWx0JzogZmFsc2VcbiAgICAgICAgICAgICAgICB9LCB0cmFjayk7XG4gICAgICAgICAgICB9KS5maWx0ZXIodHJhY2sgPT4gISF0cmFjayk7XG5cbiAgICAgICAgICAgIHJldHVybiBwbGF5bGlzdEl0ZW07XG4gICAgICAgIH0pO1xuICAgICAgICBjdXJyZW50UGxheWxpc3QgPSBwcmV0dGllZFBsYXlsaXN0O1xuICAgICAgICByZXR1cm4gcHJldHRpZWRQbGF5bGlzdDtcbiAgICB9O1xuICAgIHRoYXQuZ2V0UGxheWxpc3QgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBnZXRQbGF5bGlzdCgpIFwiLCBjdXJyZW50UGxheWxpc3QpO1xuICAgICAgICByZXR1cm4gY3VycmVudFBsYXlsaXN0O1xuICAgIH07XG4gICAgdGhhdC5nZXRDdXJyZW50U291cmNlcyA9ICgpID0+IHtcbiAgICAgICAgLy9XZSBkbyBub3Qgc3VwcG9ydCBcIlBMQVlMSVNUXCIgbm90IHlldC4gU28gdGhpcyByZXR1cm5zIHBsYXlsaXN0IG9mIDAuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBnZXRDdXJyZW50U291cmNlcygpIFwiLCBjdXJyZW50UGxheWxpc3RbMF0uc291cmNlcyk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UGxheWxpc3RbMF0uc291cmNlcztcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IE1hbmFnZXI7XG4iLCJpbXBvcnQgU3VwcG9ydENoZWNrZXIgZnJvbSBcImFwaS9TdXBwb3J0Q2hlY2tlclwiO1xuaW1wb3J0IFByb21pc2UsIHtyZXNvbHZlZH0gZnJvbSBcImFwaS9zaGltcy9wcm9taXNlXCI7XG5cbi8qKlxuICogQGJyaWVmICAgVGhpcyBtYW5hZ2VzIHByb3ZpZGVyLlxuICogQHBhcmFtXG4gKiAqL1xuY29uc3QgQ29udHJvbGxlciA9IGZ1bmN0aW9uKCl7XG4gICAgbGV0IHN1cHBvcnRDaGFja2VyID0gU3VwcG9ydENoZWNrZXIoKTtcbiAgICBjb25zdCBQcm92aWRlcnMgPSB7fTtcblxuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgbG9hZGVkLlwiKTtcblxuICAgIGNvbnN0IHJlZ2lzdGVQcm92aWRlciA9IChuYW1lLCBwcm92aWRlcikgPT57XG4gICAgICAgIGlmKFByb3ZpZGVyc1tuYW1lXSl7XG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICB9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBfcmVnaXN0ZXJQcm92aWRlcigpIFwiLCBuYW1lKTtcbiAgICAgICAgUHJvdmlkZXJzW25hbWVdID0gcHJvdmlkZXI7XG4gICAgfTtcblxuICAgIGNvbnN0IFByb3ZpZGVyTG9hZGVyID17XG4gICAgICAgIGh0bWw1OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci9odG1sNS9IdG1sNSddLCBmdW5jdGlvbihyZXF1aXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2h0bWw1L0h0bWw1JykuZGVmYXVsdDtcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFwiaHRtbDVcIiwgcHJvdmlkZXIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvdmlkZXI7XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XG4gICAgICAgICAgICAgICAgfSwnb3ZlbnBsYXllci5wcm92aWRlci5odG1sNSdcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIHdlYnJ0YyA6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvd2VicnRjL1dlYlJUQyddLCBmdW5jdGlvbihyZXF1aXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL3dlYnJ0Yy9XZWJSVEMnKS5kZWZhdWx0O1xuICAgICAgICAgICAgICAgICAgICByZWdpc3RlUHJvdmlkZXIoXCJ3ZWJydGNcIiwgcHJvdmlkZXIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvdmlkZXI7XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XG4gICAgICAgICAgICAgICAgfSwnb3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcidcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIGRhc2ggOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2Rhc2gvRGFzaCddLCBmdW5jdGlvbihyZXF1aXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2Rhc2gvRGFzaCcpLmRlZmF1bHQ7XG4gICAgICAgICAgICAgICAgICAgIFByb3ZpZGVyc1tcImRhc2hcIl0gPSBwcm92aWRlcjtcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFwiZGFzaFwiLCBwcm92aWRlcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm92aWRlcjtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcbiAgICAgICAgICAgICAgICB9LCdvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcidcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIGhscyA6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvaGxzL0hscyddLCBmdW5jdGlvbihyZXF1aXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2hscy9IbHMnKS5kZWZhdWx0O1xuICAgICAgICAgICAgICAgICAgICByZWdpc3RlUHJvdmlkZXIoXCJobHNcIiwgcHJvdmlkZXIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvdmlkZXI7XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XG4gICAgICAgICAgICAgICAgfSwnb3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcidcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQubG9hZFByb3ZpZGVycyA9IChwbGF5bGlzdCkgPT57XG4gICAgICAgIGNvbnN0IHN1cHBvcnRlZFByb3ZpZGVyTmFtZXMgPSBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lc0J5UGxheWxpc3QocGxheWxpc3QpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgbG9hZFByb3ZpZGVycygpIFwiLCBzdXBwb3J0ZWRQcm92aWRlck5hbWVzKTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFxuICAgICAgICAgICAgc3VwcG9ydGVkUHJvdmlkZXJOYW1lcy5maWx0ZXIoZnVuY3Rpb24ocHJvdmlkZXJOYW1lKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gISFQcm92aWRlckxvYWRlcltwcm92aWRlck5hbWVdO1xuICAgICAgICAgICAgfSkubWFwKGZ1bmN0aW9uKHByb3ZpZGVyTmFtZSl7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSBQcm92aWRlckxvYWRlcltwcm92aWRlck5hbWVdKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9O1xuXG4gICAgdGhhdC5maW5kQnlOYW1lID0gKG5hbWUpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGZpbmRCeU5hbWUoKSBcIiwgbmFtZSk7XG4gICAgICAgIHJldHVybiBQcm92aWRlcnNbbmFtZV07XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0UHJvdmlkZXJCeVNvdXJjZSA9IChzb3VyY2UpID0+IHtcbiAgICAgICAgY29uc3Qgc3VwcG9ydGVkUHJvdmlkZXJOYW1lID0gc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKHNvdXJjZSk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBnZXRQcm92aWRlckJ5U291cmNlKCkgXCIsIHN1cHBvcnRlZFByb3ZpZGVyTmFtZSk7XG4gICAgICAgIHJldHVybiB0aGF0LmZpbmRCeU5hbWUoc3VwcG9ydGVkUHJvdmlkZXJOYW1lKTtcbiAgICB9O1xuXG4gICAgdGhhdC5pc1NhbWVQcm92aWRlciA9IChjdXJyZW50U291cmNlLCBuZXdTb3VyY2UpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGlzU2FtZVByb3ZpZGVyKCkgXCIsIHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShjdXJyZW50U291cmNlKSAsIHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShuZXdTb3VyY2UpICk7XG4gICAgICAgIHJldHVybiBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UoY3VycmVudFNvdXJjZSkgPT0gc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKG5ld1NvdXJjZSk7XG5cbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb250cm9sbGVyO1xuIiwiLy8gICAgICBQcm9taXNlIFBvbHlmaWxsXG4vLyAgICAgIGh0dHBzOi8vZ2l0aHViLmNvbS90YXlsb3JoYWtlcy9wcm9taXNlLXBvbHlmaWxsXG4vLyAgICAgIENvcHlyaWdodCAoYykgMjAxNCBUYXlsb3IgSGFrZXNcbi8vICAgICAgQ29weXJpZ2h0IChjKSAyMDE0IEZvcmJlcyBMaW5kZXNheVxuLy8gICAgICB0YXlsb3JoYWtlcy9wcm9taXNlLXBvbHlmaWxsIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZVxuXG5jb25zdCBwcm9taXNlRmluYWxseSA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgdmFyIGNvbnN0cnVjdG9yID0gdGhpcy5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gdGhpcy50aGVuKFxuICAgICAgICBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnN0cnVjdG9yLnJlc29sdmUoY2FsbGJhY2soKSkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICAgICAgICByZXR1cm4gY29uc3RydWN0b3IucmVzb2x2ZShjYWxsYmFjaygpKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb25zdHJ1Y3Rvci5yZWplY3QocmVhc29uKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgKTtcbn07XG5cbi8vIFN0b3JlIHNldFRpbWVvdXQgcmVmZXJlbmNlIHNvIHByb21pc2UtcG9seWZpbGwgd2lsbCBiZSB1bmFmZmVjdGVkIGJ5XG4vLyBvdGhlciBjb2RlIG1vZGlmeWluZyBzZXRUaW1lb3V0IChsaWtlIHNpbm9uLnVzZUZha2VUaW1lcnMoKSlcbmNvbnN0IHNldFRpbWVvdXRGdW5jID0gd2luZG93LnNldFRpbWVvdXQ7XG5jb25zdCBzZXRJbW1lZGlhdGVGdW5jID0gd2luZG93LnNldEltbWVkaWF0ZTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbi8vIFBvbHlmaWxsIGZvciBGdW5jdGlvbi5wcm90b3R5cGUuYmluZFxuZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgZm4uYXBwbHkodGhpc0FyZywgYXJndW1lbnRzKTtcbiAgICB9O1xufVxuXG5jb25zdCBQcm9taXNlU2hpbSA9IGZ1bmN0aW9uIChmbikge1xuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBQcm9taXNlKSlcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUHJvbWlzZXMgbXVzdCBiZSBjb25zdHJ1Y3RlZCB2aWEgbmV3Jyk7XG4gICAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykgdGhyb3cgbmV3IFR5cGVFcnJvcignbm90IGEgZnVuY3Rpb24nKTtcbiAgICB0aGlzLl9zdGF0ZSA9IDA7XG4gICAgdGhpcy5faGFuZGxlZCA9IGZhbHNlO1xuICAgIHRoaXMuX3ZhbHVlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2RlZmVycmVkcyA9IFtdO1xuXG4gICAgZG9SZXNvbHZlKGZuLCB0aGlzKTtcbn1cblxuY29uc3QgaGFuZGxlID0gZnVuY3Rpb24gKHNlbGYsIGRlZmVycmVkKSB7XG4gICAgd2hpbGUgKHNlbGYuX3N0YXRlID09PSAzKSB7XG4gICAgICAgIHNlbGYgPSBzZWxmLl92YWx1ZTtcbiAgICB9XG4gICAgaWYgKHNlbGYuX3N0YXRlID09PSAwKSB7XG4gICAgICAgIHNlbGYuX2RlZmVycmVkcy5wdXNoKGRlZmVycmVkKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZWxmLl9oYW5kbGVkID0gdHJ1ZTtcbiAgICBQcm9taXNlLl9pbW1lZGlhdGVGbihmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNiID0gc2VsZi5fc3RhdGUgPT09IDEgPyBkZWZlcnJlZC5vbkZ1bGZpbGxlZCA6IGRlZmVycmVkLm9uUmVqZWN0ZWQ7XG4gICAgICAgIGlmIChjYiA9PT0gbnVsbCkge1xuICAgICAgICAgICAgKHNlbGYuX3N0YXRlID09PSAxID8gcmVzb2x2ZSA6IHJlamVjdCkoZGVmZXJyZWQucHJvbWlzZSwgc2VsZi5fdmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXQgPSBjYihzZWxmLl92YWx1ZSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJlamVjdChkZWZlcnJlZC5wcm9taXNlLCBlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKGRlZmVycmVkLnByb21pc2UsIHJldCk7XG4gICAgfSk7XG59XG5cbmNvbnN0IHJlc29sdmUgPSBmdW5jdGlvbiAoc2VsZiwgbmV3VmFsdWUpIHtcbiAgICB0cnkge1xuICAgICAgICAvLyBQcm9taXNlIFJlc29sdXRpb24gUHJvY2VkdXJlOiBodHRwczovL2dpdGh1Yi5jb20vcHJvbWlzZXMtYXBsdXMvcHJvbWlzZXMtc3BlYyN0aGUtcHJvbWlzZS1yZXNvbHV0aW9uLXByb2NlZHVyZVxuICAgICAgICBpZiAobmV3VmFsdWUgPT09IHNlbGYpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBIHByb21pc2UgY2Fubm90IGJlIHJlc29sdmVkIHdpdGggaXRzZWxmLicpO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICBuZXdWYWx1ZSAmJlxuICAgICAgICAgICAgKHR5cGVvZiBuZXdWYWx1ZSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIG5ld1ZhbHVlID09PSAnZnVuY3Rpb24nKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHZhciB0aGVuID0gbmV3VmFsdWUudGhlbjtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgICAgICBzZWxmLl9zdGF0ZSA9IDM7XG4gICAgICAgICAgICAgICAgc2VsZi5fdmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgICAgICBmaW5hbGUoc2VsZik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGRvUmVzb2x2ZShiaW5kKHRoZW4sIG5ld1ZhbHVlKSwgc2VsZik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHNlbGYuX3N0YXRlID0gMTtcbiAgICAgICAgc2VsZi5fdmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgZmluYWxlKHNlbGYpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmVqZWN0KHNlbGYsIGUpO1xuICAgIH1cbn1cblxuY29uc3QgcmVqZWN0ID1mdW5jdGlvbiAoc2VsZiwgbmV3VmFsdWUpIHtcbiAgICBzZWxmLl9zdGF0ZSA9IDI7XG4gICAgc2VsZi5fdmFsdWUgPSBuZXdWYWx1ZTtcbiAgICBmaW5hbGUoc2VsZik7XG59XG5cbmNvbnN0IGZpbmFsZSA9IGZ1bmN0aW9uIChzZWxmKSB7XG4gICAgaWYgKHNlbGYuX3N0YXRlID09PSAyICYmIHNlbGYuX2RlZmVycmVkcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgUHJvbWlzZS5faW1tZWRpYXRlRm4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoIXNlbGYuX2hhbmRsZWQpIHtcbiAgICAgICAgICAgICAgICBQcm9taXNlLl91bmhhbmRsZWRSZWplY3Rpb25GbihzZWxmLl92YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBzZWxmLl9kZWZlcnJlZHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaGFuZGxlKHNlbGYsIHNlbGYuX2RlZmVycmVkc1tpXSk7XG4gICAgfVxuICAgIHNlbGYuX2RlZmVycmVkcyA9IG51bGw7XG59XG5cbmNvbnN0IEhhbmRsZXIgPSBmdW5jdGlvbiAob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQsIHByb21pc2UpIHtcbiAgICB0aGlzLm9uRnVsZmlsbGVkID0gdHlwZW9mIG9uRnVsZmlsbGVkID09PSAnZnVuY3Rpb24nID8gb25GdWxmaWxsZWQgOiBudWxsO1xuICAgIHRoaXMub25SZWplY3RlZCA9IHR5cGVvZiBvblJlamVjdGVkID09PSAnZnVuY3Rpb24nID8gb25SZWplY3RlZCA6IG51bGw7XG4gICAgdGhpcy5wcm9taXNlID0gcHJvbWlzZTtcbn1cblxuLyoqXG4gKiBUYWtlIGEgcG90ZW50aWFsbHkgbWlzYmVoYXZpbmcgcmVzb2x2ZXIgZnVuY3Rpb24gYW5kIG1ha2Ugc3VyZVxuICogb25GdWxmaWxsZWQgYW5kIG9uUmVqZWN0ZWQgYXJlIG9ubHkgY2FsbGVkIG9uY2UuXG4gKlxuICogTWFrZXMgbm8gZ3VhcmFudGVlcyBhYm91dCBhc3luY2hyb255LlxuICovXG5jb25zdCBkb1Jlc29sdmUgPSBmdW5jdGlvbiAoZm4sIHNlbGYpIHtcbiAgICB2YXIgZG9uZSA9IGZhbHNlO1xuICAgIHRyeSB7XG4gICAgICAgIGZuKFxuICAgICAgICAgICAgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZG9uZSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoc2VsZiwgdmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uKHJlYXNvbikge1xuICAgICAgICAgICAgICAgIGlmIChkb25lKSByZXR1cm47XG4gICAgICAgICAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmVqZWN0KHNlbGYsIHJlYXNvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgaWYgKGRvbmUpIHJldHVybjtcbiAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgICAgIHJlamVjdChzZWxmLCBleCk7XG4gICAgfVxufVxuXG5Qcm9taXNlU2hpbS5wcm90b3R5cGVbJ2NhdGNoJ10gPSBmdW5jdGlvbihvblJlamVjdGVkKSB7XG4gICAgcmV0dXJuIHRoaXMudGhlbihudWxsLCBvblJlamVjdGVkKTtcbn07XG5cblByb21pc2VTaGltLnByb3RvdHlwZS50aGVuID0gZnVuY3Rpb24ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpIHtcbiAgICB2YXIgcHJvbSA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKG5vb3ApO1xuXG4gICAgaGFuZGxlKHRoaXMsIG5ldyBIYW5kbGVyKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkLCBwcm9tKSk7XG4gICAgcmV0dXJuIHByb207XG59O1xuXG5Qcm9taXNlU2hpbS5wcm90b3R5cGVbJ2ZpbmFsbHknXSA9IHByb21pc2VGaW5hbGx5O1xuXG5Qcm9taXNlU2hpbS5hbGwgPSBmdW5jdGlvbihhcnIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGlmICghYXJyIHx8IHR5cGVvZiBhcnIubGVuZ3RoID09PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Byb21pc2UuYWxsIGFjY2VwdHMgYW4gYXJyYXknKTtcbiAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcnIpO1xuICAgICAgICBpZiAoYXJncy5sZW5ndGggPT09IDApIHJldHVybiByZXNvbHZlKFtdKTtcbiAgICAgICAgdmFyIHJlbWFpbmluZyA9IGFyZ3MubGVuZ3RoO1xuXG4gICAgICAgIGZ1bmN0aW9uIHJlcyhpLCB2YWwpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbCAmJiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoZW4gPSB2YWwudGhlbjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGVuLmNhbGwoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMoaSwgdmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhcmdzW2ldID0gdmFsO1xuICAgICAgICAgICAgICAgIGlmICgtLXJlbWFpbmluZyA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGFyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmVzKGksIGFyZ3NbaV0pO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5Qcm9taXNlU2hpbS5yZXNvbHZlID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gUHJvbWlzZSkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG4gICAgfSk7XG59O1xuXG5Qcm9taXNlU2hpbS5yZWplY3QgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgcmVqZWN0KHZhbHVlKTtcbiAgICB9KTtcbn07XG5cblByb21pc2VTaGltLnJhY2UgPSBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB2YWx1ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIHZhbHVlc1tpXS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbi8vIFVzZSBwb2x5ZmlsbCBmb3Igc2V0SW1tZWRpYXRlIGZvciBwZXJmb3JtYW5jZSBnYWluc1xuUHJvbWlzZVNoaW0uX2ltbWVkaWF0ZUZuID1cbiAgICAodHlwZW9mIHNldEltbWVkaWF0ZUZ1bmMgPT09ICdmdW5jdGlvbicgJiZcbiAgICBmdW5jdGlvbihmbikge1xuICAgICAgICBzZXRJbW1lZGlhdGVGdW5jKGZuKTtcbiAgICB9KSB8fFxuICAgIGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgIHNldEltbWVkaWF0ZUZ1bmMoZm4sIDApO1xuICAgIH07XG5cblByb21pc2VTaGltLl91bmhhbmRsZWRSZWplY3Rpb25GbiA9IGZ1bmN0aW9uIF91bmhhbmRsZWRSZWplY3Rpb25GbihlcnIpIHtcbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIGNvbnNvbGUpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdQb3NzaWJsZSBVbmhhbmRsZWQgUHJvbWlzZSBSZWplY3Rpb246JywgZXJyKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgfVxufTtcblxuY29uc3QgUHJvbWlzZSA9IHdpbmRvdy5Qcm9taXNlIHx8ICh3aW5kb3cuUHJvbWlzZSA9IFByb21pc2VTaGltKTtcblxuZXhwb3J0IGNvbnN0IHJlc29sdmVkID0gUHJvbWlzZS5yZXNvbHZlKCk7XG5cbmV4cG9ydCBkZWZhdWx0IFByb21pc2U7IiwiaW1wb3J0IEFQSSBmcm9tICdhcGkvQXBpJztcbmltcG9ydCB7aXNXZWJSVEN9IGZyb20gJ3V0aWxzL3ZhbGlkYXRvcic7XG5pbXBvcnQgXyBmcm9tICd1dGlscy91bmRlcnNjb3JlJztcbmltcG9ydCB7Z2V0U2NyaXB0UGF0aH0gZnJvbSAndXRpbHMvd2VicGFjayc7XG5cblxuX193ZWJwYWNrX3B1YmxpY19wYXRoX18gPSBnZXRTY3JpcHRQYXRoKCdvdmVucGxheWVyLnNkay5qcycpO1xuXG4vKipcbiAqIE1haW4gT3ZlblBsYXllclNESyBvYmplY3RcbiAqL1xuY29uc3QgT3ZlblBsYXllclNESyA9IHdpbmRvdy5PdmVuUGxheWVyU0RLID0ge307XG5cbmNvbnN0IHZlcnNpb24gPSAnMC4wLjEnO1xuXG5jb25zdCBwbGF5ZXJMaXN0ID0gT3ZlblBsYXllclNESy5wbGF5ZXJMaXN0ID0gW107XG5cbmV4cG9ydCBjb25zdCBjaGVja0FuZEdldENvbnRhaW5lckVsZW1lbnQgPSBmdW5jdGlvbihjb250YWluZXIpIHtcblxuICAgIGlmICghY29udGFpbmVyKSB7XG5cbiAgICAgICAgLy8gVE9ETyhyb2NrKTogU2hvdWxkIGNhdXNlIGFuIGVycm9yLlxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBsZXQgY29udGFpbmVyRWxlbWVudCA9IG51bGw7XG5cbiAgICBpZiAodHlwZW9mIGNvbnRhaW5lciA9PT0gJ3N0cmluZycpIHtcblxuICAgICAgICBjb250YWluZXJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29udGFpbmVyKTtcbiAgICB9IGVsc2UgaWYgKGNvbnRhaW5lci5ub2RlVHlwZSkge1xuXG4gICAgICAgIGNvbnRhaW5lckVsZW1lbnQgPSBjb250YWluZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVE9ETyhyb2NrKTogU2hvdWxkIGNhdXNlIGFuIGVycm9yLlxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gY29udGFpbmVyRWxlbWVudDtcbn1cblxuLyoqXG4gKiBDcmVhdGUgcGxheWVyIGluc3RhbmNlIGFuZCByZXR1cm4gaXQuXG4gKlxuICogQHBhcmFtICAgICAge3N0cmluZyB8IGRvbSBlbGVtZW50fSBjb250YWluZXIgIElkIG9mIGNvbnRhaW5lciBlbGVtZW50IG9yIGNvbnRhaW5lciBlbGVtZW50XG4gKiBAcGFyYW0gICAgICB7b2JqZWN0fSBvcHRpb25zICBUaGUgb3B0aW9uc1xuICovXG5PdmVuUGxheWVyU0RLLmNyZWF0ZSA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgb3B0aW9ucykge1xuXG4gICAgbGV0IGNvbnRhaW5lckVsZW1lbnQgPSBjaGVja0FuZEdldENvbnRhaW5lckVsZW1lbnQoY29udGFpbmVyKTtcblxuICAgIGNvbnN0IHBsYXllckluc3RhbmNlID0gQVBJKGNvbnRhaW5lckVsZW1lbnQpO1xuICAgIHBsYXllckluc3RhbmNlLmluaXQob3B0aW9ucyk7XG5cbiAgICBwbGF5ZXJMaXN0LnB1c2gocGxheWVySW5zdGFuY2UpO1xuXG4gICAgcmV0dXJuIHBsYXllckluc3RhbmNlO1xufTtcblxuLyoqXG4gKiBHZXRzIHRoZSBwbGF5ZXIgaW5zdGFuY2UgbGlzdC5cbiAqXG4gKiBAcmV0dXJuICAgICB7YXJyYXl9ICBUaGUgcGxheWVyIGxpc3QuXG4gKi9cbk92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyTGlzdCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgcmV0dXJuIHBsYXllckxpc3Q7XG59O1xuXG4vKipcbiAqIEdldHMgdGhlIHBsYXllciBpbnN0YW5jZSBieSBjb250YWluZXIgaWQuXG4gKlxuICogQHBhcmFtICAgICAge3N0cmluZ30gIGNvbnRhaW5lcklkICBUaGUgY29udGFpbmVyIGlkZW50aWZpZXJcbiAqIEByZXR1cm4gICAgIHtvYmVqZWN0IHwgbnVsbH0gIFRoZSBwbGF5ZXIgaW5zdGFuY2UuXG4gKi9cbk92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyQnlDb250YWluZXJJZCA9IGZ1bmN0aW9uKGNvbnRhaW5lcklkKSB7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXllckxpc3QubGVuZ3RoIC0xOyBpICsrKSB7XG5cbiAgICAgICAgaWYgKHBsYXllckxpc3RbaV0uY29udGFpbmVySWQgPT09IGNvbnRhaW5lcklkKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBwbGF5ZXJMaXN0W2ldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG59O1xuXG4vKipcbiAqIEdldHMgdGhlIHBsYXllciBpbnN0YW5jZSBieSBpbmRleC5cbiAqXG4gKiBAcGFyYW0gICAgICB7bnVtYmVyfSAgaW5kZXggICBUaGUgaW5kZXhcbiAqIEByZXR1cm4gICAgIHtvYmplY3QgfCBudWxsfSAgVGhlIHBsYXllciBpbnN0YW5jZS5cbiAqL1xuT3ZlblBsYXllclNESy5nZXRQbGF5ZXJCeUluZGV4ID0gZnVuY3Rpb24oaW5kZXgpIHtcblxuICAgIGNvbnN0IHBsYXllckluc3RhbmNlID0gcGxheWVyTGlzdFtpbmRleF07XG5cbiAgICBpZiAocGxheWVySW5zdGFuY2UpIHtcblxuICAgICAgICByZXR1cm4gcGxheWVySW5zdGFuY2U7XG4gICAgfSBlbHNlIHtcblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlIHdlYnJ0YyBzb3VyY2UgZm9yIHBsYXllciBzb3VyY2UgdHlwZS5cbiAqXG4gKiBAcGFyYW0gICAgICB7T2JqZWN0IHwgQXJyYXl9ICBzb3VyY2UgICB3ZWJydGMgc291cmNlXG4gKiBAcmV0dXJuICAgICB7QXJyYXl9ICBQbGF5ZXIgc291cmNlIE9iZWpjdC5cbiAqL1xuT3ZlblBsYXllclNESy5nZW5lcmF0ZVdlYnJ0Y1VybHMgPSBmdW5jdGlvbihzb3VyY2VzKSB7XG4gICAgcmV0dXJuIChfLmlzQXJyYXkoc291cmNlcykgPyBzb3VyY2VzIDogW3NvdXJjZXNdKS5tYXAoZnVuY3Rpb24oc291cmNlLCBpbmRleCl7XG4gICAgICAgIGlmKHNvdXJjZS5ob3N0ICYmIGlzV2ViUlRDKHNvdXJjZS5ob3N0KSAmJiBzb3VyY2UuYXBwbGljYXRpb24gJiYgc291cmNlLnN0cmVhbSl7XG4gICAgICAgICAgICByZXR1cm4ge2ZpbGUgOiBzb3VyY2UuaG9zdCArIFwiL1wiICsgc291cmNlLmFwcGxpY2F0aW9uICsgXCIvXCIgKyBzb3VyY2Uuc3RyZWFtLCB0eXBlIDogXCJ3ZWJydGNcIiwgbGFiZWwgOiBzb3VyY2UubGFiZWwgPyBzb3VyY2UubGFiZWwgOiBcIndlYnJ0Yy1cIisoaW5kZXgrMSkgfTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgT3ZlblBsYXllclNESzsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA1LiAyNC4uXG4gKi9cblxuY29uc3QgbG9nZ2VyID0gZnVuY3Rpb24oKXtcbiAgICBjb25zdCB0aGF0ID0ge307XG4gICAgbGV0IHByZXZDb25zb2xlTG9nID0gbnVsbDtcblxuICAgIHdpbmRvdy5PdmVuUGxheWVyQ29uc29sZSA9IHtsb2cgOiB3aW5kb3dbJ2NvbnNvbGUnXVsnbG9nJ119O1xuXG4gICAgdGhhdC5lbmFibGUgPSAoKSA9PntcbiAgICAgICAgaWYocHJldkNvbnNvbGVMb2cgPT0gbnVsbCl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGVbJ2xvZyddID0gcHJldkNvbnNvbGVMb2c7XG4gICAgfTtcbiAgICB0aGF0LmRpc2FibGUgPSAoKSA9PntcbiAgICAgICAgcHJldkNvbnNvbGVMb2cgPSBjb25zb2xlLmxvZztcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGVbJ2xvZyddID0gZnVuY3Rpb24oKXt9O1xuICAgIH07XG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XG4gICAgICAgIHdpbmRvdy5PdmVuUGxheWVyQ29uc29sZSA9IG51bGw7XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCBsb2dnZXI7IiwiaW1wb3J0IF8gZnJvbSAnLi91bmRlcnNjb3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIHRyaW0oc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG59XG5cbi8qKlxuICogZXh0cmFjdEV4dGVuc2lvblxuICpcbiAqIEBwYXJhbSAgICAgIHtzdHJpbmd9IHBhdGggZm9yIHVybFxuICogQHJldHVybiAgICAge3N0cmluZ30gIEV4dGVuc2lvblxuICovXG5leHBvcnQgY29uc3QgZXh0cmFjdEV4dGVuc2lvbiA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgICBpZighcGF0aCB8fCBwYXRoLnN1YnN0cigwLDQpPT0ncnRtcCcpIHtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldEF6dXJlRmlsZUZvcm1hdChwYXRoKSB7XG4gICAgICAgIGxldCBleHRlbnNpb24gPSBcIlwiO1xuICAgICAgICBpZiAoKC9bKCxdZm9ybWF0PW1wZC0vaSkudGVzdChwYXRoKSkge1xuICAgICAgICAgICAgZXh0ZW5zaW9uID0gJ21wZCc7XG4gICAgICAgIH1lbHNlIGlmICgoL1soLF1mb3JtYXQ9bTN1OC0vaSkudGVzdChwYXRoKSkge1xuICAgICAgICAgICAgZXh0ZW5zaW9uID0gJ20zdTgnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBleHRlbnNpb247XG4gICAgfVxuXG4gICAgbGV0IGF6dXJlZEZvcm1hdCA9IGdldEF6dXJlRmlsZUZvcm1hdChwYXRoKTtcbiAgICBpZihhenVyZWRGb3JtYXQpIHtcbiAgICAgICAgcmV0dXJuIGF6dXJlZEZvcm1hdDtcbiAgICB9XG4gICAgcGF0aCA9IHBhdGguc3BsaXQoJz8nKVswXS5zcGxpdCgnIycpWzBdO1xuICAgIGlmKHBhdGgubGFzdEluZGV4T2YoJy4nKSA+IC0xKSB7XG4gICAgICAgIHJldHVybiBwYXRoLnN1YnN0cihwYXRoLmxhc3RJbmRleE9mKCcuJykgKyAxLCBwYXRoLmxlbmd0aCkudG9Mb3dlckNhc2UoKTtcbiAgICB9ZWxzZXtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxufTtcblxuXG4vKipcbiAqIG5hdHVyYWxIbXNcbiAqXG4gKiBAcGFyYW0gICAgICB7bnVtYmVyIHwgc3RyaW5nfSAgc2Vjb25kICBUaGUgc2Vjb25kXG4gKiBAcmV0dXJuICAgICB7c3RyaW5nfSAgZm9ybWF0dGVkIFN0cmluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gbmF0dXJhbEhtcyhzZWNvbmQpIHtcbiAgICBsZXQgc2VjTnVtID0gcGFyc2VJbnQoc2Vjb25kLCAxMCk7XG4gICAgbGV0IGhvdXJzICAgPSBNYXRoLmZsb29yKHNlY051bSAvIDM2MDApO1xuICAgIGxldCBtaW51dGVzID0gTWF0aC5mbG9vcigoc2VjTnVtIC0gKGhvdXJzICogMzYwMCkpIC8gNjApO1xuICAgIGxldCBzZWNvbmRzID0gc2VjTnVtIC0gKGhvdXJzICogMzYwMCkgLSAobWludXRlcyAqIDYwKTtcblxuICAgIGlmIChob3VycyA+IDApIHttaW51dGVzID0gXCIwXCIrbWludXRlczt9XG4gICAgaWYgKHNlY29uZHMgPCAxMCkge3NlY29uZHMgPSBcIjBcIitzZWNvbmRzO31cblxuICAgIGlmIChob3VycyA+IDApIHtcbiAgICAgICAgcmV0dXJuIGhvdXJzKyc6JyttaW51dGVzKyc6JytzZWNvbmRzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBtaW51dGVzKyc6JytzZWNvbmRzO1xuICAgIH1cbn0iLCIvLyAgICAgVW5kZXJzY29yZS5qcyAxLjkuMVxuLy8gICAgIGh0dHA6Ly91bmRlcnNjb3JlanMub3JnXG4vLyAgICAgKGMpIDIwMDktMjAxOCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuLy8gICAgIFVuZGVyc2NvcmUgbWF5IGJlIGZyZWVseSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4hZnVuY3Rpb24oKXt2YXIgbj1cIm9iamVjdFwiPT10eXBlb2Ygc2VsZiYmc2VsZi5zZWxmPT09c2VsZiYmc2VsZnx8XCJvYmplY3RcIj09dHlwZW9mIGdsb2JhbCYmZ2xvYmFsLmdsb2JhbD09PWdsb2JhbCYmZ2xvYmFsfHx0aGlzfHx7fSxyPW4uXyxlPUFycmF5LnByb3RvdHlwZSxvPU9iamVjdC5wcm90b3R5cGUscz1cInVuZGVmaW5lZFwiIT10eXBlb2YgU3ltYm9sP1N5bWJvbC5wcm90b3R5cGU6bnVsbCx1PWUucHVzaCxjPWUuc2xpY2UscD1vLnRvU3RyaW5nLGk9by5oYXNPd25Qcm9wZXJ0eSx0PUFycmF5LmlzQXJyYXksYT1PYmplY3Qua2V5cyxsPU9iamVjdC5jcmVhdGUsZj1mdW5jdGlvbigpe30saD1mdW5jdGlvbihuKXtyZXR1cm4gbiBpbnN0YW5jZW9mIGg/bjp0aGlzIGluc3RhbmNlb2YgaD92b2lkKHRoaXMuX3dyYXBwZWQ9bik6bmV3IGgobil9O1widW5kZWZpbmVkXCI9PXR5cGVvZiBleHBvcnRzfHxleHBvcnRzLm5vZGVUeXBlP24uXz1oOihcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlJiYhbW9kdWxlLm5vZGVUeXBlJiZtb2R1bGUuZXhwb3J0cyYmKGV4cG9ydHM9bW9kdWxlLmV4cG9ydHM9aCksZXhwb3J0cy5fPWgpLGguVkVSU0lPTj1cIjEuOS4xXCI7dmFyIHYseT1mdW5jdGlvbih1LGksbil7aWYodm9pZCAwPT09aSlyZXR1cm4gdTtzd2l0Y2gobnVsbD09bj8zOm4pe2Nhc2UgMTpyZXR1cm4gZnVuY3Rpb24obil7cmV0dXJuIHUuY2FsbChpLG4pfTtjYXNlIDM6cmV0dXJuIGZ1bmN0aW9uKG4scix0KXtyZXR1cm4gdS5jYWxsKGksbixyLHQpfTtjYXNlIDQ6cmV0dXJuIGZ1bmN0aW9uKG4scix0LGUpe3JldHVybiB1LmNhbGwoaSxuLHIsdCxlKX19cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIHUuYXBwbHkoaSxhcmd1bWVudHMpfX0sZD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGguaXRlcmF0ZWUhPT12P2guaXRlcmF0ZWUobixyKTpudWxsPT1uP2guaWRlbnRpdHk6aC5pc0Z1bmN0aW9uKG4pP3kobixyLHQpOmguaXNPYmplY3QobikmJiFoLmlzQXJyYXkobik/aC5tYXRjaGVyKG4pOmgucHJvcGVydHkobil9O2guaXRlcmF0ZWU9dj1mdW5jdGlvbihuLHIpe3JldHVybiBkKG4sciwxLzApfTt2YXIgZz1mdW5jdGlvbih1LGkpe3JldHVybiBpPW51bGw9PWk/dS5sZW5ndGgtMToraSxmdW5jdGlvbigpe2Zvcih2YXIgbj1NYXRoLm1heChhcmd1bWVudHMubGVuZ3RoLWksMCkscj1BcnJheShuKSx0PTA7dDxuO3QrKylyW3RdPWFyZ3VtZW50c1t0K2ldO3N3aXRjaChpKXtjYXNlIDA6cmV0dXJuIHUuY2FsbCh0aGlzLHIpO2Nhc2UgMTpyZXR1cm4gdS5jYWxsKHRoaXMsYXJndW1lbnRzWzBdLHIpO2Nhc2UgMjpyZXR1cm4gdS5jYWxsKHRoaXMsYXJndW1lbnRzWzBdLGFyZ3VtZW50c1sxXSxyKX12YXIgZT1BcnJheShpKzEpO2Zvcih0PTA7dDxpO3QrKyllW3RdPWFyZ3VtZW50c1t0XTtyZXR1cm4gZVtpXT1yLHUuYXBwbHkodGhpcyxlKX19LG09ZnVuY3Rpb24obil7aWYoIWguaXNPYmplY3QobikpcmV0dXJue307aWYobClyZXR1cm4gbChuKTtmLnByb3RvdHlwZT1uO3ZhciByPW5ldyBmO3JldHVybiBmLnByb3RvdHlwZT1udWxsLHJ9LGI9ZnVuY3Rpb24ocil7cmV0dXJuIGZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT1uP3ZvaWQgMDpuW3JdfX0saj1mdW5jdGlvbihuLHIpe3JldHVybiBudWxsIT1uJiZpLmNhbGwobixyKX0seD1mdW5jdGlvbihuLHIpe2Zvcih2YXIgdD1yLmxlbmd0aCxlPTA7ZTx0O2UrKyl7aWYobnVsbD09bilyZXR1cm47bj1uW3JbZV1dfXJldHVybiB0P246dm9pZCAwfSxfPU1hdGgucG93KDIsNTMpLTEsQT1iKFwibGVuZ3RoXCIpLHc9ZnVuY3Rpb24obil7dmFyIHI9QShuKTtyZXR1cm5cIm51bWJlclwiPT10eXBlb2YgciYmMDw9ciYmcjw9X307aC5lYWNoPWguZm9yRWFjaD1mdW5jdGlvbihuLHIsdCl7dmFyIGUsdTtpZihyPXkocix0KSx3KG4pKWZvcihlPTAsdT1uLmxlbmd0aDtlPHU7ZSsrKXIobltlXSxlLG4pO2Vsc2V7dmFyIGk9aC5rZXlzKG4pO2ZvcihlPTAsdT1pLmxlbmd0aDtlPHU7ZSsrKXIobltpW2VdXSxpW2VdLG4pfXJldHVybiBufSxoLm1hcD1oLmNvbGxlY3Q9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT0hdyhuKSYmaC5rZXlzKG4pLHU9KGV8fG4pLmxlbmd0aCxpPUFycmF5KHUpLG89MDtvPHU7bysrKXt2YXIgYT1lP2Vbb106bztpW29dPXIoblthXSxhLG4pfXJldHVybiBpfTt2YXIgTz1mdW5jdGlvbihjKXtyZXR1cm4gZnVuY3Rpb24obixyLHQsZSl7dmFyIHU9Mzw9YXJndW1lbnRzLmxlbmd0aDtyZXR1cm4gZnVuY3Rpb24obixyLHQsZSl7dmFyIHU9IXcobikmJmgua2V5cyhuKSxpPSh1fHxuKS5sZW5ndGgsbz0wPGM/MDppLTE7Zm9yKGV8fCh0PW5bdT91W29dOm9dLG8rPWMpOzA8PW8mJm88aTtvKz1jKXt2YXIgYT11P3Vbb106bzt0PXIodCxuW2FdLGEsbil9cmV0dXJuIHR9KG4seShyLGUsNCksdCx1KX19O2gucmVkdWNlPWguZm9sZGw9aC5pbmplY3Q9TygxKSxoLnJlZHVjZVJpZ2h0PWguZm9sZHI9TygtMSksaC5maW5kPWguZGV0ZWN0PWZ1bmN0aW9uKG4scix0KXt2YXIgZT0odyhuKT9oLmZpbmRJbmRleDpoLmZpbmRLZXkpKG4scix0KTtpZih2b2lkIDAhPT1lJiYtMSE9PWUpcmV0dXJuIG5bZV19LGguZmlsdGVyPWguc2VsZWN0PWZ1bmN0aW9uKG4sZSxyKXt2YXIgdT1bXTtyZXR1cm4gZT1kKGUsciksaC5lYWNoKG4sZnVuY3Rpb24obixyLHQpe2UobixyLHQpJiZ1LnB1c2gobil9KSx1fSxoLnJlamVjdD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGguZmlsdGVyKG4saC5uZWdhdGUoZChyKSksdCl9LGguZXZlcnk9aC5hbGw9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT0hdyhuKSYmaC5rZXlzKG4pLHU9KGV8fG4pLmxlbmd0aCxpPTA7aTx1O2krKyl7dmFyIG89ZT9lW2ldOmk7aWYoIXIobltvXSxvLG4pKXJldHVybiExfXJldHVybiEwfSxoLnNvbWU9aC5hbnk9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT0hdyhuKSYmaC5rZXlzKG4pLHU9KGV8fG4pLmxlbmd0aCxpPTA7aTx1O2krKyl7dmFyIG89ZT9lW2ldOmk7aWYocihuW29dLG8sbikpcmV0dXJuITB9cmV0dXJuITF9LGguY29udGFpbnM9aC5pbmNsdWRlcz1oLmluY2x1ZGU9ZnVuY3Rpb24obixyLHQsZSl7cmV0dXJuIHcobil8fChuPWgudmFsdWVzKG4pKSwoXCJudW1iZXJcIiE9dHlwZW9mIHR8fGUpJiYodD0wKSwwPD1oLmluZGV4T2YobixyLHQpfSxoLmludm9rZT1nKGZ1bmN0aW9uKG4sdCxlKXt2YXIgdSxpO3JldHVybiBoLmlzRnVuY3Rpb24odCk/aT10OmguaXNBcnJheSh0KSYmKHU9dC5zbGljZSgwLC0xKSx0PXRbdC5sZW5ndGgtMV0pLGgubWFwKG4sZnVuY3Rpb24obil7dmFyIHI9aTtpZighcil7aWYodSYmdS5sZW5ndGgmJihuPXgobix1KSksbnVsbD09bilyZXR1cm47cj1uW3RdfXJldHVybiBudWxsPT1yP3I6ci5hcHBseShuLGUpfSl9KSxoLnBsdWNrPWZ1bmN0aW9uKG4scil7cmV0dXJuIGgubWFwKG4saC5wcm9wZXJ0eShyKSl9LGgud2hlcmU9ZnVuY3Rpb24obixyKXtyZXR1cm4gaC5maWx0ZXIobixoLm1hdGNoZXIocikpfSxoLmZpbmRXaGVyZT1mdW5jdGlvbihuLHIpe3JldHVybiBoLmZpbmQobixoLm1hdGNoZXIocikpfSxoLm1heD1mdW5jdGlvbihuLGUscil7dmFyIHQsdSxpPS0xLzAsbz0tMS8wO2lmKG51bGw9PWV8fFwibnVtYmVyXCI9PXR5cGVvZiBlJiZcIm9iamVjdFwiIT10eXBlb2YgblswXSYmbnVsbCE9bilmb3IodmFyIGE9MCxjPShuPXcobik/bjpoLnZhbHVlcyhuKSkubGVuZ3RoO2E8YzthKyspbnVsbCE9KHQ9blthXSkmJmk8dCYmKGk9dCk7ZWxzZSBlPWQoZSxyKSxoLmVhY2gobixmdW5jdGlvbihuLHIsdCl7dT1lKG4scix0KSwobzx1fHx1PT09LTEvMCYmaT09PS0xLzApJiYoaT1uLG89dSl9KTtyZXR1cm4gaX0saC5taW49ZnVuY3Rpb24obixlLHIpe3ZhciB0LHUsaT0xLzAsbz0xLzA7aWYobnVsbD09ZXx8XCJudW1iZXJcIj09dHlwZW9mIGUmJlwib2JqZWN0XCIhPXR5cGVvZiBuWzBdJiZudWxsIT1uKWZvcih2YXIgYT0wLGM9KG49dyhuKT9uOmgudmFsdWVzKG4pKS5sZW5ndGg7YTxjO2ErKyludWxsIT0odD1uW2FdKSYmdDxpJiYoaT10KTtlbHNlIGU9ZChlLHIpLGguZWFjaChuLGZ1bmN0aW9uKG4scix0KXsoKHU9ZShuLHIsdCkpPG98fHU9PT0xLzAmJmk9PT0xLzApJiYoaT1uLG89dSl9KTtyZXR1cm4gaX0saC5zaHVmZmxlPWZ1bmN0aW9uKG4pe3JldHVybiBoLnNhbXBsZShuLDEvMCl9LGguc2FtcGxlPWZ1bmN0aW9uKG4scix0KXtpZihudWxsPT1yfHx0KXJldHVybiB3KG4pfHwobj1oLnZhbHVlcyhuKSksbltoLnJhbmRvbShuLmxlbmd0aC0xKV07dmFyIGU9dyhuKT9oLmNsb25lKG4pOmgudmFsdWVzKG4pLHU9QShlKTtyPU1hdGgubWF4KE1hdGgubWluKHIsdSksMCk7Zm9yKHZhciBpPXUtMSxvPTA7bzxyO28rKyl7dmFyIGE9aC5yYW5kb20obyxpKSxjPWVbb107ZVtvXT1lW2FdLGVbYV09Y31yZXR1cm4gZS5zbGljZSgwLHIpfSxoLnNvcnRCeT1mdW5jdGlvbihuLGUscil7dmFyIHU9MDtyZXR1cm4gZT1kKGUsciksaC5wbHVjayhoLm1hcChuLGZ1bmN0aW9uKG4scix0KXtyZXR1cm57dmFsdWU6bixpbmRleDp1KyssY3JpdGVyaWE6ZShuLHIsdCl9fSkuc29ydChmdW5jdGlvbihuLHIpe3ZhciB0PW4uY3JpdGVyaWEsZT1yLmNyaXRlcmlhO2lmKHQhPT1lKXtpZihlPHR8fHZvaWQgMD09PXQpcmV0dXJuIDE7aWYodDxlfHx2b2lkIDA9PT1lKXJldHVybi0xfXJldHVybiBuLmluZGV4LXIuaW5kZXh9KSxcInZhbHVlXCIpfTt2YXIgaz1mdW5jdGlvbihvLHIpe3JldHVybiBmdW5jdGlvbihlLHUsbil7dmFyIGk9cj9bW10sW11dOnt9O3JldHVybiB1PWQodSxuKSxoLmVhY2goZSxmdW5jdGlvbihuLHIpe3ZhciB0PXUobixyLGUpO28oaSxuLHQpfSksaX19O2guZ3JvdXBCeT1rKGZ1bmN0aW9uKG4scix0KXtqKG4sdCk/blt0XS5wdXNoKHIpOm5bdF09W3JdfSksaC5pbmRleEJ5PWsoZnVuY3Rpb24obixyLHQpe25bdF09cn0pLGguY291bnRCeT1rKGZ1bmN0aW9uKG4scix0KXtqKG4sdCk/blt0XSsrOm5bdF09MX0pO3ZhciBTPS9bXlxcdWQ4MDAtXFx1ZGZmZl18W1xcdWQ4MDAtXFx1ZGJmZl1bXFx1ZGMwMC1cXHVkZmZmXXxbXFx1ZDgwMC1cXHVkZmZmXS9nO2gudG9BcnJheT1mdW5jdGlvbihuKXtyZXR1cm4gbj9oLmlzQXJyYXkobik/Yy5jYWxsKG4pOmguaXNTdHJpbmcobik/bi5tYXRjaChTKTp3KG4pP2gubWFwKG4saC5pZGVudGl0eSk6aC52YWx1ZXMobik6W119LGguc2l6ZT1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09bj8wOncobik/bi5sZW5ndGg6aC5rZXlzKG4pLmxlbmd0aH0saC5wYXJ0aXRpb249ayhmdW5jdGlvbihuLHIsdCl7blt0PzA6MV0ucHVzaChyKX0sITApLGguZmlyc3Q9aC5oZWFkPWgudGFrZT1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIG51bGw9PW58fG4ubGVuZ3RoPDE/bnVsbD09cj92b2lkIDA6W106bnVsbD09cnx8dD9uWzBdOmguaW5pdGlhbChuLG4ubGVuZ3RoLXIpfSxoLmluaXRpYWw9ZnVuY3Rpb24obixyLHQpe3JldHVybiBjLmNhbGwobiwwLE1hdGgubWF4KDAsbi5sZW5ndGgtKG51bGw9PXJ8fHQ/MTpyKSkpfSxoLmxhc3Q9ZnVuY3Rpb24obixyLHQpe3JldHVybiBudWxsPT1ufHxuLmxlbmd0aDwxP251bGw9PXI/dm9pZCAwOltdOm51bGw9PXJ8fHQ/bltuLmxlbmd0aC0xXTpoLnJlc3QobixNYXRoLm1heCgwLG4ubGVuZ3RoLXIpKX0saC5yZXN0PWgudGFpbD1oLmRyb3A9ZnVuY3Rpb24obixyLHQpe3JldHVybiBjLmNhbGwobixudWxsPT1yfHx0PzE6cil9LGguY29tcGFjdD1mdW5jdGlvbihuKXtyZXR1cm4gaC5maWx0ZXIobixCb29sZWFuKX07dmFyIE09ZnVuY3Rpb24obixyLHQsZSl7Zm9yKHZhciB1PShlPWV8fFtdKS5sZW5ndGgsaT0wLG89QShuKTtpPG87aSsrKXt2YXIgYT1uW2ldO2lmKHcoYSkmJihoLmlzQXJyYXkoYSl8fGguaXNBcmd1bWVudHMoYSkpKWlmKHIpZm9yKHZhciBjPTAsbD1hLmxlbmd0aDtjPGw7KWVbdSsrXT1hW2MrK107ZWxzZSBNKGEscix0LGUpLHU9ZS5sZW5ndGg7ZWxzZSB0fHwoZVt1KytdPWEpfXJldHVybiBlfTtoLmZsYXR0ZW49ZnVuY3Rpb24obixyKXtyZXR1cm4gTShuLHIsITEpfSxoLndpdGhvdXQ9ZyhmdW5jdGlvbihuLHIpe3JldHVybiBoLmRpZmZlcmVuY2UobixyKX0pLGgudW5pcT1oLnVuaXF1ZT1mdW5jdGlvbihuLHIsdCxlKXtoLmlzQm9vbGVhbihyKXx8KGU9dCx0PXIscj0hMSksbnVsbCE9dCYmKHQ9ZCh0LGUpKTtmb3IodmFyIHU9W10saT1bXSxvPTAsYT1BKG4pO288YTtvKyspe3ZhciBjPW5bb10sbD10P3QoYyxvLG4pOmM7ciYmIXQ/KG8mJmk9PT1sfHx1LnB1c2goYyksaT1sKTp0P2guY29udGFpbnMoaSxsKXx8KGkucHVzaChsKSx1LnB1c2goYykpOmguY29udGFpbnModSxjKXx8dS5wdXNoKGMpfXJldHVybiB1fSxoLnVuaW9uPWcoZnVuY3Rpb24obil7cmV0dXJuIGgudW5pcShNKG4sITAsITApKX0pLGguaW50ZXJzZWN0aW9uPWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj1bXSx0PWFyZ3VtZW50cy5sZW5ndGgsZT0wLHU9QShuKTtlPHU7ZSsrKXt2YXIgaT1uW2VdO2lmKCFoLmNvbnRhaW5zKHIsaSkpe3ZhciBvO2ZvcihvPTE7bzx0JiZoLmNvbnRhaW5zKGFyZ3VtZW50c1tvXSxpKTtvKyspO289PT10JiZyLnB1c2goaSl9fXJldHVybiByfSxoLmRpZmZlcmVuY2U9ZyhmdW5jdGlvbihuLHIpe3JldHVybiByPU0ociwhMCwhMCksaC5maWx0ZXIobixmdW5jdGlvbihuKXtyZXR1cm4haC5jb250YWlucyhyLG4pfSl9KSxoLnVuemlwPWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj1uJiZoLm1heChuLEEpLmxlbmd0aHx8MCx0PUFycmF5KHIpLGU9MDtlPHI7ZSsrKXRbZV09aC5wbHVjayhuLGUpO3JldHVybiB0fSxoLnppcD1nKGgudW56aXApLGgub2JqZWN0PWZ1bmN0aW9uKG4scil7Zm9yKHZhciB0PXt9LGU9MCx1PUEobik7ZTx1O2UrKylyP3RbbltlXV09cltlXTp0W25bZV1bMF1dPW5bZV1bMV07cmV0dXJuIHR9O3ZhciBGPWZ1bmN0aW9uKGkpe3JldHVybiBmdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPUEobiksdT0wPGk/MDplLTE7MDw9dSYmdTxlO3UrPWkpaWYocihuW3VdLHUsbikpcmV0dXJuIHU7cmV0dXJuLTF9fTtoLmZpbmRJbmRleD1GKDEpLGguZmluZExhc3RJbmRleD1GKC0xKSxoLnNvcnRlZEluZGV4PWZ1bmN0aW9uKG4scix0LGUpe2Zvcih2YXIgdT0odD1kKHQsZSwxKSkociksaT0wLG89QShuKTtpPG87KXt2YXIgYT1NYXRoLmZsb29yKChpK28pLzIpO3QoblthXSk8dT9pPWErMTpvPWF9cmV0dXJuIGl9O3ZhciBFPWZ1bmN0aW9uKGksbyxhKXtyZXR1cm4gZnVuY3Rpb24obixyLHQpe3ZhciBlPTAsdT1BKG4pO2lmKFwibnVtYmVyXCI9PXR5cGVvZiB0KTA8aT9lPTA8PXQ/dDpNYXRoLm1heCh0K3UsZSk6dT0wPD10P01hdGgubWluKHQrMSx1KTp0K3UrMTtlbHNlIGlmKGEmJnQmJnUpcmV0dXJuIG5bdD1hKG4scildPT09cj90Oi0xO2lmKHIhPXIpcmV0dXJuIDA8PSh0PW8oYy5jYWxsKG4sZSx1KSxoLmlzTmFOKSk/dCtlOi0xO2Zvcih0PTA8aT9lOnUtMTswPD10JiZ0PHU7dCs9aSlpZihuW3RdPT09cilyZXR1cm4gdDtyZXR1cm4tMX19O2guaW5kZXhPZj1FKDEsaC5maW5kSW5kZXgsaC5zb3J0ZWRJbmRleCksaC5sYXN0SW5kZXhPZj1FKC0xLGguZmluZExhc3RJbmRleCksaC5yYW5nZT1mdW5jdGlvbihuLHIsdCl7bnVsbD09ciYmKHI9bnx8MCxuPTApLHR8fCh0PXI8bj8tMToxKTtmb3IodmFyIGU9TWF0aC5tYXgoTWF0aC5jZWlsKChyLW4pL3QpLDApLHU9QXJyYXkoZSksaT0wO2k8ZTtpKyssbis9dCl1W2ldPW47cmV0dXJuIHV9LGguY2h1bms9ZnVuY3Rpb24obixyKXtpZihudWxsPT1yfHxyPDEpcmV0dXJuW107Zm9yKHZhciB0PVtdLGU9MCx1PW4ubGVuZ3RoO2U8dTspdC5wdXNoKGMuY2FsbChuLGUsZSs9cikpO3JldHVybiB0fTt2YXIgTj1mdW5jdGlvbihuLHIsdCxlLHUpe2lmKCEoZSBpbnN0YW5jZW9mIHIpKXJldHVybiBuLmFwcGx5KHQsdSk7dmFyIGk9bShuLnByb3RvdHlwZSksbz1uLmFwcGx5KGksdSk7cmV0dXJuIGguaXNPYmplY3Qobyk/bzppfTtoLmJpbmQ9ZyhmdW5jdGlvbihyLHQsZSl7aWYoIWguaXNGdW5jdGlvbihyKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiQmluZCBtdXN0IGJlIGNhbGxlZCBvbiBhIGZ1bmN0aW9uXCIpO3ZhciB1PWcoZnVuY3Rpb24obil7cmV0dXJuIE4ocix1LHQsdGhpcyxlLmNvbmNhdChuKSl9KTtyZXR1cm4gdX0pLGgucGFydGlhbD1nKGZ1bmN0aW9uKHUsaSl7dmFyIG89aC5wYXJ0aWFsLnBsYWNlaG9sZGVyLGE9ZnVuY3Rpb24oKXtmb3IodmFyIG49MCxyPWkubGVuZ3RoLHQ9QXJyYXkociksZT0wO2U8cjtlKyspdFtlXT1pW2VdPT09bz9hcmd1bWVudHNbbisrXTppW2VdO2Zvcig7bjxhcmd1bWVudHMubGVuZ3RoOyl0LnB1c2goYXJndW1lbnRzW24rK10pO3JldHVybiBOKHUsYSx0aGlzLHRoaXMsdCl9O3JldHVybiBhfSksKGgucGFydGlhbC5wbGFjZWhvbGRlcj1oKS5iaW5kQWxsPWcoZnVuY3Rpb24obixyKXt2YXIgdD0ocj1NKHIsITEsITEpKS5sZW5ndGg7aWYodDwxKXRocm93IG5ldyBFcnJvcihcImJpbmRBbGwgbXVzdCBiZSBwYXNzZWQgZnVuY3Rpb24gbmFtZXNcIik7Zm9yKDt0LS07KXt2YXIgZT1yW3RdO25bZV09aC5iaW5kKG5bZV0sbil9fSksaC5tZW1vaXplPWZ1bmN0aW9uKGUsdSl7dmFyIGk9ZnVuY3Rpb24obil7dmFyIHI9aS5jYWNoZSx0PVwiXCIrKHU/dS5hcHBseSh0aGlzLGFyZ3VtZW50cyk6bik7cmV0dXJuIGoocix0KXx8KHJbdF09ZS5hcHBseSh0aGlzLGFyZ3VtZW50cykpLHJbdF19O3JldHVybiBpLmNhY2hlPXt9LGl9LGguZGVsYXk9ZyhmdW5jdGlvbihuLHIsdCl7cmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtyZXR1cm4gbi5hcHBseShudWxsLHQpfSxyKX0pLGguZGVmZXI9aC5wYXJ0aWFsKGguZGVsYXksaCwxKSxoLnRocm90dGxlPWZ1bmN0aW9uKHQsZSx1KXt2YXIgaSxvLGEsYyxsPTA7dXx8KHU9e30pO3ZhciBmPWZ1bmN0aW9uKCl7bD0hMT09PXUubGVhZGluZz8wOmgubm93KCksaT1udWxsLGM9dC5hcHBseShvLGEpLGl8fChvPWE9bnVsbCl9LG49ZnVuY3Rpb24oKXt2YXIgbj1oLm5vdygpO2x8fCExIT09dS5sZWFkaW5nfHwobD1uKTt2YXIgcj1lLShuLWwpO3JldHVybiBvPXRoaXMsYT1hcmd1bWVudHMscjw9MHx8ZTxyPyhpJiYoY2xlYXJUaW1lb3V0KGkpLGk9bnVsbCksbD1uLGM9dC5hcHBseShvLGEpLGl8fChvPWE9bnVsbCkpOml8fCExPT09dS50cmFpbGluZ3x8KGk9c2V0VGltZW91dChmLHIpKSxjfTtyZXR1cm4gbi5jYW5jZWw9ZnVuY3Rpb24oKXtjbGVhclRpbWVvdXQoaSksbD0wLGk9bz1hPW51bGx9LG59LGguZGVib3VuY2U9ZnVuY3Rpb24odCxlLHUpe3ZhciBpLG8sYT1mdW5jdGlvbihuLHIpe2k9bnVsbCxyJiYobz10LmFwcGx5KG4scikpfSxuPWcoZnVuY3Rpb24obil7aWYoaSYmY2xlYXJUaW1lb3V0KGkpLHUpe3ZhciByPSFpO2k9c2V0VGltZW91dChhLGUpLHImJihvPXQuYXBwbHkodGhpcyxuKSl9ZWxzZSBpPWguZGVsYXkoYSxlLHRoaXMsbik7cmV0dXJuIG99KTtyZXR1cm4gbi5jYW5jZWw9ZnVuY3Rpb24oKXtjbGVhclRpbWVvdXQoaSksaT1udWxsfSxufSxoLndyYXA9ZnVuY3Rpb24obixyKXtyZXR1cm4gaC5wYXJ0aWFsKHIsbil9LGgubmVnYXRlPWZ1bmN0aW9uKG4pe3JldHVybiBmdW5jdGlvbigpe3JldHVybiFuLmFwcGx5KHRoaXMsYXJndW1lbnRzKX19LGguY29tcG9zZT1mdW5jdGlvbigpe3ZhciB0PWFyZ3VtZW50cyxlPXQubGVuZ3RoLTE7cmV0dXJuIGZ1bmN0aW9uKCl7Zm9yKHZhciBuPWUscj10W2VdLmFwcGx5KHRoaXMsYXJndW1lbnRzKTtuLS07KXI9dFtuXS5jYWxsKHRoaXMscik7cmV0dXJuIHJ9fSxoLmFmdGVyPWZ1bmN0aW9uKG4scil7cmV0dXJuIGZ1bmN0aW9uKCl7aWYoLS1uPDEpcmV0dXJuIHIuYXBwbHkodGhpcyxhcmd1bWVudHMpfX0saC5iZWZvcmU9ZnVuY3Rpb24obixyKXt2YXIgdDtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gMDwtLW4mJih0PXIuYXBwbHkodGhpcyxhcmd1bWVudHMpKSxuPD0xJiYocj1udWxsKSx0fX0saC5vbmNlPWgucGFydGlhbChoLmJlZm9yZSwyKSxoLnJlc3RBcmd1bWVudHM9Zzt2YXIgST0he3RvU3RyaW5nOm51bGx9LnByb3BlcnR5SXNFbnVtZXJhYmxlKFwidG9TdHJpbmdcIiksVD1bXCJ2YWx1ZU9mXCIsXCJpc1Byb3RvdHlwZU9mXCIsXCJ0b1N0cmluZ1wiLFwicHJvcGVydHlJc0VudW1lcmFibGVcIixcImhhc093blByb3BlcnR5XCIsXCJ0b0xvY2FsZVN0cmluZ1wiXSxCPWZ1bmN0aW9uKG4scil7dmFyIHQ9VC5sZW5ndGgsZT1uLmNvbnN0cnVjdG9yLHU9aC5pc0Z1bmN0aW9uKGUpJiZlLnByb3RvdHlwZXx8byxpPVwiY29uc3RydWN0b3JcIjtmb3IoaihuLGkpJiYhaC5jb250YWlucyhyLGkpJiZyLnB1c2goaSk7dC0tOykoaT1UW3RdKWluIG4mJm5baV0hPT11W2ldJiYhaC5jb250YWlucyhyLGkpJiZyLnB1c2goaSl9O2gua2V5cz1mdW5jdGlvbihuKXtpZighaC5pc09iamVjdChuKSlyZXR1cm5bXTtpZihhKXJldHVybiBhKG4pO3ZhciByPVtdO2Zvcih2YXIgdCBpbiBuKWoobix0KSYmci5wdXNoKHQpO3JldHVybiBJJiZCKG4scikscn0saC5hbGxLZXlzPWZ1bmN0aW9uKG4pe2lmKCFoLmlzT2JqZWN0KG4pKXJldHVybltdO3ZhciByPVtdO2Zvcih2YXIgdCBpbiBuKXIucHVzaCh0KTtyZXR1cm4gSSYmQihuLHIpLHJ9LGgudmFsdWVzPWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj1oLmtleXMobiksdD1yLmxlbmd0aCxlPUFycmF5KHQpLHU9MDt1PHQ7dSsrKWVbdV09bltyW3VdXTtyZXR1cm4gZX0saC5tYXBPYmplY3Q9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT1oLmtleXMobiksdT1lLmxlbmd0aCxpPXt9LG89MDtvPHU7bysrKXt2YXIgYT1lW29dO2lbYV09cihuW2FdLGEsbil9cmV0dXJuIGl9LGgucGFpcnM9ZnVuY3Rpb24obil7Zm9yKHZhciByPWgua2V5cyhuKSx0PXIubGVuZ3RoLGU9QXJyYXkodCksdT0wO3U8dDt1KyspZVt1XT1bclt1XSxuW3JbdV1dXTtyZXR1cm4gZX0saC5pbnZlcnQ9ZnVuY3Rpb24obil7Zm9yKHZhciByPXt9LHQ9aC5rZXlzKG4pLGU9MCx1PXQubGVuZ3RoO2U8dTtlKyspcltuW3RbZV1dXT10W2VdO3JldHVybiByfSxoLmZ1bmN0aW9ucz1oLm1ldGhvZHM9ZnVuY3Rpb24obil7dmFyIHI9W107Zm9yKHZhciB0IGluIG4paC5pc0Z1bmN0aW9uKG5bdF0pJiZyLnB1c2godCk7cmV0dXJuIHIuc29ydCgpfTt2YXIgUj1mdW5jdGlvbihjLGwpe3JldHVybiBmdW5jdGlvbihuKXt2YXIgcj1hcmd1bWVudHMubGVuZ3RoO2lmKGwmJihuPU9iamVjdChuKSkscjwyfHxudWxsPT1uKXJldHVybiBuO2Zvcih2YXIgdD0xO3Q8cjt0KyspZm9yKHZhciBlPWFyZ3VtZW50c1t0XSx1PWMoZSksaT11Lmxlbmd0aCxvPTA7bzxpO28rKyl7dmFyIGE9dVtvXTtsJiZ2b2lkIDAhPT1uW2FdfHwoblthXT1lW2FdKX1yZXR1cm4gbn19O2guZXh0ZW5kPVIoaC5hbGxLZXlzKSxoLmV4dGVuZE93bj1oLmFzc2lnbj1SKGgua2V5cyksaC5maW5kS2V5PWZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGUsdT1oLmtleXMobiksaT0wLG89dS5sZW5ndGg7aTxvO2krKylpZihyKG5bZT11W2ldXSxlLG4pKXJldHVybiBlfTt2YXIgcSxLLHo9ZnVuY3Rpb24obixyLHQpe3JldHVybiByIGluIHR9O2gucGljaz1nKGZ1bmN0aW9uKG4scil7dmFyIHQ9e30sZT1yWzBdO2lmKG51bGw9PW4pcmV0dXJuIHQ7aC5pc0Z1bmN0aW9uKGUpPygxPHIubGVuZ3RoJiYoZT15KGUsclsxXSkpLHI9aC5hbGxLZXlzKG4pKTooZT16LHI9TShyLCExLCExKSxuPU9iamVjdChuKSk7Zm9yKHZhciB1PTAsaT1yLmxlbmd0aDt1PGk7dSsrKXt2YXIgbz1yW3VdLGE9bltvXTtlKGEsbyxuKSYmKHRbb109YSl9cmV0dXJuIHR9KSxoLm9taXQ9ZyhmdW5jdGlvbihuLHQpe3ZhciByLGU9dFswXTtyZXR1cm4gaC5pc0Z1bmN0aW9uKGUpPyhlPWgubmVnYXRlKGUpLDE8dC5sZW5ndGgmJihyPXRbMV0pKToodD1oLm1hcChNKHQsITEsITEpLFN0cmluZyksZT1mdW5jdGlvbihuLHIpe3JldHVybiFoLmNvbnRhaW5zKHQscil9KSxoLnBpY2sobixlLHIpfSksaC5kZWZhdWx0cz1SKGguYWxsS2V5cywhMCksaC5jcmVhdGU9ZnVuY3Rpb24obixyKXt2YXIgdD1tKG4pO3JldHVybiByJiZoLmV4dGVuZE93bih0LHIpLHR9LGguY2xvbmU9ZnVuY3Rpb24obil7cmV0dXJuIGguaXNPYmplY3Qobik/aC5pc0FycmF5KG4pP24uc2xpY2UoKTpoLmV4dGVuZCh7fSxuKTpufSxoLnRhcD1mdW5jdGlvbihuLHIpe3JldHVybiByKG4pLG59LGguaXNNYXRjaD1mdW5jdGlvbihuLHIpe3ZhciB0PWgua2V5cyhyKSxlPXQubGVuZ3RoO2lmKG51bGw9PW4pcmV0dXJuIWU7Zm9yKHZhciB1PU9iamVjdChuKSxpPTA7aTxlO2krKyl7dmFyIG89dFtpXTtpZihyW29dIT09dVtvXXx8IShvIGluIHUpKXJldHVybiExfXJldHVybiEwfSxxPWZ1bmN0aW9uKG4scix0LGUpe2lmKG49PT1yKXJldHVybiAwIT09bnx8MS9uPT0xL3I7aWYobnVsbD09bnx8bnVsbD09cilyZXR1cm4hMTtpZihuIT1uKXJldHVybiByIT1yO3ZhciB1PXR5cGVvZiBuO3JldHVybihcImZ1bmN0aW9uXCI9PT11fHxcIm9iamVjdFwiPT09dXx8XCJvYmplY3RcIj09dHlwZW9mIHIpJiZLKG4scix0LGUpfSxLPWZ1bmN0aW9uKG4scix0LGUpe24gaW5zdGFuY2VvZiBoJiYobj1uLl93cmFwcGVkKSxyIGluc3RhbmNlb2YgaCYmKHI9ci5fd3JhcHBlZCk7dmFyIHU9cC5jYWxsKG4pO2lmKHUhPT1wLmNhbGwocikpcmV0dXJuITE7c3dpdGNoKHUpe2Nhc2VcIltvYmplY3QgUmVnRXhwXVwiOmNhc2VcIltvYmplY3QgU3RyaW5nXVwiOnJldHVyblwiXCIrbj09XCJcIityO2Nhc2VcIltvYmplY3QgTnVtYmVyXVwiOnJldHVybituIT0rbj8rciE9K3I6MD09K24/MS8rbj09MS9yOituPT0rcjtjYXNlXCJbb2JqZWN0IERhdGVdXCI6Y2FzZVwiW29iamVjdCBCb29sZWFuXVwiOnJldHVybituPT0rcjtjYXNlXCJbb2JqZWN0IFN5bWJvbF1cIjpyZXR1cm4gcy52YWx1ZU9mLmNhbGwobik9PT1zLnZhbHVlT2YuY2FsbChyKX12YXIgaT1cIltvYmplY3QgQXJyYXldXCI9PT11O2lmKCFpKXtpZihcIm9iamVjdFwiIT10eXBlb2Ygbnx8XCJvYmplY3RcIiE9dHlwZW9mIHIpcmV0dXJuITE7dmFyIG89bi5jb25zdHJ1Y3RvcixhPXIuY29uc3RydWN0b3I7aWYobyE9PWEmJiEoaC5pc0Z1bmN0aW9uKG8pJiZvIGluc3RhbmNlb2YgbyYmaC5pc0Z1bmN0aW9uKGEpJiZhIGluc3RhbmNlb2YgYSkmJlwiY29uc3RydWN0b3JcImluIG4mJlwiY29uc3RydWN0b3JcImluIHIpcmV0dXJuITF9ZT1lfHxbXTtmb3IodmFyIGM9KHQ9dHx8W10pLmxlbmd0aDtjLS07KWlmKHRbY109PT1uKXJldHVybiBlW2NdPT09cjtpZih0LnB1c2gobiksZS5wdXNoKHIpLGkpe2lmKChjPW4ubGVuZ3RoKSE9PXIubGVuZ3RoKXJldHVybiExO2Zvcig7Yy0tOylpZighcShuW2NdLHJbY10sdCxlKSlyZXR1cm4hMX1lbHNle3ZhciBsLGY9aC5rZXlzKG4pO2lmKGM9Zi5sZW5ndGgsaC5rZXlzKHIpLmxlbmd0aCE9PWMpcmV0dXJuITE7Zm9yKDtjLS07KWlmKGw9ZltjXSwhaihyLGwpfHwhcShuW2xdLHJbbF0sdCxlKSlyZXR1cm4hMX1yZXR1cm4gdC5wb3AoKSxlLnBvcCgpLCEwfSxoLmlzRXF1YWw9ZnVuY3Rpb24obixyKXtyZXR1cm4gcShuLHIpfSxoLmlzRW1wdHk9ZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PW58fCh3KG4pJiYoaC5pc0FycmF5KG4pfHxoLmlzU3RyaW5nKG4pfHxoLmlzQXJndW1lbnRzKG4pKT8wPT09bi5sZW5ndGg6MD09PWgua2V5cyhuKS5sZW5ndGgpfSxoLmlzRWxlbWVudD1mdW5jdGlvbihuKXtyZXR1cm4hKCFufHwxIT09bi5ub2RlVHlwZSl9LGguaXNBcnJheT10fHxmdW5jdGlvbihuKXtyZXR1cm5cIltvYmplY3QgQXJyYXldXCI9PT1wLmNhbGwobil9LGguaXNPYmplY3Q9ZnVuY3Rpb24obil7dmFyIHI9dHlwZW9mIG47cmV0dXJuXCJmdW5jdGlvblwiPT09cnx8XCJvYmplY3RcIj09PXImJiEhbn0saC5lYWNoKFtcIkFyZ3VtZW50c1wiLFwiRnVuY3Rpb25cIixcIlN0cmluZ1wiLFwiTnVtYmVyXCIsXCJEYXRlXCIsXCJSZWdFeHBcIixcIkVycm9yXCIsXCJTeW1ib2xcIixcIk1hcFwiLFwiV2Vha01hcFwiLFwiU2V0XCIsXCJXZWFrU2V0XCJdLGZ1bmN0aW9uKHIpe2hbXCJpc1wiK3JdPWZ1bmN0aW9uKG4pe3JldHVybiBwLmNhbGwobik9PT1cIltvYmplY3QgXCIrcitcIl1cIn19KSxoLmlzQXJndW1lbnRzKGFyZ3VtZW50cyl8fChoLmlzQXJndW1lbnRzPWZ1bmN0aW9uKG4pe3JldHVybiBqKG4sXCJjYWxsZWVcIil9KTt2YXIgRD1uLmRvY3VtZW50JiZuLmRvY3VtZW50LmNoaWxkTm9kZXM7XCJmdW5jdGlvblwiIT10eXBlb2YvLi8mJlwib2JqZWN0XCIhPXR5cGVvZiBJbnQ4QXJyYXkmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIEQmJihoLmlzRnVuY3Rpb249ZnVuY3Rpb24obil7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2Ygbnx8ITF9KSxoLmlzRmluaXRlPWZ1bmN0aW9uKG4pe3JldHVybiFoLmlzU3ltYm9sKG4pJiZpc0Zpbml0ZShuKSYmIWlzTmFOKHBhcnNlRmxvYXQobikpfSxoLmlzTmFOPWZ1bmN0aW9uKG4pe3JldHVybiBoLmlzTnVtYmVyKG4pJiZpc05hTihuKX0saC5pc0Jvb2xlYW49ZnVuY3Rpb24obil7cmV0dXJuITA9PT1ufHwhMT09PW58fFwiW29iamVjdCBCb29sZWFuXVwiPT09cC5jYWxsKG4pfSxoLmlzTnVsbD1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09PW59LGguaXNVbmRlZmluZWQ9ZnVuY3Rpb24obil7cmV0dXJuIHZvaWQgMD09PW59LGguaGFzPWZ1bmN0aW9uKG4scil7aWYoIWguaXNBcnJheShyKSlyZXR1cm4gaihuLHIpO2Zvcih2YXIgdD1yLmxlbmd0aCxlPTA7ZTx0O2UrKyl7dmFyIHU9cltlXTtpZihudWxsPT1ufHwhaS5jYWxsKG4sdSkpcmV0dXJuITE7bj1uW3VdfXJldHVybiEhdH0saC5ub0NvbmZsaWN0PWZ1bmN0aW9uKCl7cmV0dXJuIG4uXz1yLHRoaXN9LGguaWRlbnRpdHk9ZnVuY3Rpb24obil7cmV0dXJuIG59LGguY29uc3RhbnQ9ZnVuY3Rpb24obil7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIG59fSxoLm5vb3A9ZnVuY3Rpb24oKXt9LGgucHJvcGVydHk9ZnVuY3Rpb24ocil7cmV0dXJuIGguaXNBcnJheShyKT9mdW5jdGlvbihuKXtyZXR1cm4geChuLHIpfTpiKHIpfSxoLnByb3BlcnR5T2Y9ZnVuY3Rpb24ocil7cmV0dXJuIG51bGw9PXI/ZnVuY3Rpb24oKXt9OmZ1bmN0aW9uKG4pe3JldHVybiBoLmlzQXJyYXkobik/eChyLG4pOnJbbl19fSxoLm1hdGNoZXI9aC5tYXRjaGVzPWZ1bmN0aW9uKHIpe3JldHVybiByPWguZXh0ZW5kT3duKHt9LHIpLGZ1bmN0aW9uKG4pe3JldHVybiBoLmlzTWF0Y2gobixyKX19LGgudGltZXM9ZnVuY3Rpb24obixyLHQpe3ZhciBlPUFycmF5KE1hdGgubWF4KDAsbikpO3I9eShyLHQsMSk7Zm9yKHZhciB1PTA7dTxuO3UrKyllW3VdPXIodSk7cmV0dXJuIGV9LGgucmFuZG9tPWZ1bmN0aW9uKG4scil7cmV0dXJuIG51bGw9PXImJihyPW4sbj0wKSxuK01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSooci1uKzEpKX0saC5ub3c9RGF0ZS5ub3d8fGZ1bmN0aW9uKCl7cmV0dXJuKG5ldyBEYXRlKS5nZXRUaW1lKCl9O3ZhciBMPXtcIiZcIjpcIiZhbXA7XCIsXCI8XCI6XCImbHQ7XCIsXCI+XCI6XCImZ3Q7XCIsJ1wiJzpcIiZxdW90O1wiLFwiJ1wiOlwiJiN4Mjc7XCIsXCJgXCI6XCImI3g2MDtcIn0sUD1oLmludmVydChMKSxXPWZ1bmN0aW9uKHIpe3ZhciB0PWZ1bmN0aW9uKG4pe3JldHVybiByW25dfSxuPVwiKD86XCIraC5rZXlzKHIpLmpvaW4oXCJ8XCIpK1wiKVwiLGU9UmVnRXhwKG4pLHU9UmVnRXhwKG4sXCJnXCIpO3JldHVybiBmdW5jdGlvbihuKXtyZXR1cm4gbj1udWxsPT1uP1wiXCI6XCJcIituLGUudGVzdChuKT9uLnJlcGxhY2UodSx0KTpufX07aC5lc2NhcGU9VyhMKSxoLnVuZXNjYXBlPVcoUCksaC5yZXN1bHQ9ZnVuY3Rpb24obixyLHQpe2guaXNBcnJheShyKXx8KHI9W3JdKTt2YXIgZT1yLmxlbmd0aDtpZighZSlyZXR1cm4gaC5pc0Z1bmN0aW9uKHQpP3QuY2FsbChuKTp0O2Zvcih2YXIgdT0wO3U8ZTt1Kyspe3ZhciBpPW51bGw9PW4/dm9pZCAwOm5bclt1XV07dm9pZCAwPT09aSYmKGk9dCx1PWUpLG49aC5pc0Z1bmN0aW9uKGkpP2kuY2FsbChuKTppfXJldHVybiBufTt2YXIgQz0wO2gudW5pcXVlSWQ9ZnVuY3Rpb24obil7dmFyIHI9KytDK1wiXCI7cmV0dXJuIG4/bityOnJ9LGgudGVtcGxhdGVTZXR0aW5ncz17ZXZhbHVhdGU6LzwlKFtcXHNcXFNdKz8pJT4vZyxpbnRlcnBvbGF0ZTovPCU9KFtcXHNcXFNdKz8pJT4vZyxlc2NhcGU6LzwlLShbXFxzXFxTXSs/KSU+L2d9O3ZhciBKPS8oLileLyxVPXtcIidcIjpcIidcIixcIlxcXFxcIjpcIlxcXFxcIixcIlxcclwiOlwiclwiLFwiXFxuXCI6XCJuXCIsXCJcXHUyMDI4XCI6XCJ1MjAyOFwiLFwiXFx1MjAyOVwiOlwidTIwMjlcIn0sVj0vXFxcXHwnfFxccnxcXG58XFx1MjAyOHxcXHUyMDI5L2csJD1mdW5jdGlvbihuKXtyZXR1cm5cIlxcXFxcIitVW25dfTtoLnRlbXBsYXRlPWZ1bmN0aW9uKGksbixyKXshbiYmciYmKG49ciksbj1oLmRlZmF1bHRzKHt9LG4saC50ZW1wbGF0ZVNldHRpbmdzKTt2YXIgdCxlPVJlZ0V4cChbKG4uZXNjYXBlfHxKKS5zb3VyY2UsKG4uaW50ZXJwb2xhdGV8fEopLnNvdXJjZSwobi5ldmFsdWF0ZXx8Sikuc291cmNlXS5qb2luKFwifFwiKStcInwkXCIsXCJnXCIpLG89MCxhPVwiX19wKz0nXCI7aS5yZXBsYWNlKGUsZnVuY3Rpb24obixyLHQsZSx1KXtyZXR1cm4gYSs9aS5zbGljZShvLHUpLnJlcGxhY2UoViwkKSxvPXUrbi5sZW5ndGgscj9hKz1cIicrXFxuKChfX3Q9KFwiK3IrXCIpKT09bnVsbD8nJzpfLmVzY2FwZShfX3QpKStcXG4nXCI6dD9hKz1cIicrXFxuKChfX3Q9KFwiK3QrXCIpKT09bnVsbD8nJzpfX3QpK1xcbidcIjplJiYoYSs9XCInO1xcblwiK2UrXCJcXG5fX3ArPSdcIiksbn0pLGErPVwiJztcXG5cIixuLnZhcmlhYmxlfHwoYT1cIndpdGgob2JqfHx7fSl7XFxuXCIrYStcIn1cXG5cIiksYT1cInZhciBfX3QsX19wPScnLF9faj1BcnJheS5wcm90b3R5cGUuam9pbixcIitcInByaW50PWZ1bmN0aW9uKCl7X19wKz1fX2ouY2FsbChhcmd1bWVudHMsJycpO307XFxuXCIrYStcInJldHVybiBfX3A7XFxuXCI7dHJ5e3Q9bmV3IEZ1bmN0aW9uKG4udmFyaWFibGV8fFwib2JqXCIsXCJfXCIsYSl9Y2F0Y2gobil7dGhyb3cgbi5zb3VyY2U9YSxufXZhciB1PWZ1bmN0aW9uKG4pe3JldHVybiB0LmNhbGwodGhpcyxuLGgpfSxjPW4udmFyaWFibGV8fFwib2JqXCI7cmV0dXJuIHUuc291cmNlPVwiZnVuY3Rpb24oXCIrYytcIil7XFxuXCIrYStcIn1cIix1fSxoLmNoYWluPWZ1bmN0aW9uKG4pe3ZhciByPWgobik7cmV0dXJuIHIuX2NoYWluPSEwLHJ9O3ZhciBHPWZ1bmN0aW9uKG4scil7cmV0dXJuIG4uX2NoYWluP2gocikuY2hhaW4oKTpyfTtoLm1peGluPWZ1bmN0aW9uKHQpe3JldHVybiBoLmVhY2goaC5mdW5jdGlvbnModCksZnVuY3Rpb24obil7dmFyIHI9aFtuXT10W25dO2gucHJvdG90eXBlW25dPWZ1bmN0aW9uKCl7dmFyIG49W3RoaXMuX3dyYXBwZWRdO3JldHVybiB1LmFwcGx5KG4sYXJndW1lbnRzKSxHKHRoaXMsci5hcHBseShoLG4pKX19KSxofSxoLm1peGluKGgpLGguZWFjaChbXCJwb3BcIixcInB1c2hcIixcInJldmVyc2VcIixcInNoaWZ0XCIsXCJzb3J0XCIsXCJzcGxpY2VcIixcInVuc2hpZnRcIl0sZnVuY3Rpb24ocil7dmFyIHQ9ZVtyXTtoLnByb3RvdHlwZVtyXT1mdW5jdGlvbigpe3ZhciBuPXRoaXMuX3dyYXBwZWQ7cmV0dXJuIHQuYXBwbHkobixhcmd1bWVudHMpLFwic2hpZnRcIiE9PXImJlwic3BsaWNlXCIhPT1yfHwwIT09bi5sZW5ndGh8fGRlbGV0ZSBuWzBdLEcodGhpcyxuKX19KSxoLmVhY2goW1wiY29uY2F0XCIsXCJqb2luXCIsXCJzbGljZVwiXSxmdW5jdGlvbihuKXt2YXIgcj1lW25dO2gucHJvdG90eXBlW25dPWZ1bmN0aW9uKCl7cmV0dXJuIEcodGhpcyxyLmFwcGx5KHRoaXMuX3dyYXBwZWQsYXJndW1lbnRzKSl9fSksaC5wcm90b3R5cGUudmFsdWU9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fd3JhcHBlZH0saC5wcm90b3R5cGUudmFsdWVPZj1oLnByb3RvdHlwZS50b0pTT049aC5wcm90b3R5cGUudmFsdWUsaC5wcm90b3R5cGUudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gU3RyaW5nKHRoaXMuX3dyYXBwZWQpfSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQmJmRlZmluZShcInVuZGVyc2NvcmVcIixbXSxmdW5jdGlvbigpe3JldHVybiBofSl9KCk7XG4iLCJpbXBvcnQge2V4dHJhY3RFeHRlbnNpb259IGZyb20gXCJ1dGlscy9zdHJpbmdzXCI7XG5cbmV4cG9ydCBjb25zdCBpc1J0bXAgPSBmdW5jdGlvbiAoZmlsZSwgdHlwZSkge1xuICAgIHJldHVybiAoZmlsZS5pbmRleE9mKCdydG1wOicpID09IDAgfHwgdHlwZSA9PSAncnRtcCcpO1xufTtcbmV4cG9ydCBjb25zdCBpc1dlYlJUQyA9IGZ1bmN0aW9uIChmaWxlLCB0eXBlKSB7XG4gICAgaWYoZmlsZSl7XG4gICAgICAgIHJldHVybiAoZmlsZS5pbmRleE9mKCd3czonKSA9PT0gMCB8fCBmaWxlLmluZGV4T2YoJ3dzczonKSA9PT0gMCB8fCB0eXBlID09PSAnd2VicnRjJyk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG5leHBvcnQgY29uc3QgaXNEYXNoID0gZnVuY3Rpb24gKGZpbGUsIHR5cGUpIHtcbiAgICByZXR1cm4gKCB0eXBlID09PSAnbXBkJyB8fCAgdHlwZSA9PT0gJ2Rhc2gnIHx8IHR5cGUgPT09ICdhcHBsaWNhdGlvbi9kYXNoK3htbCcgfHwgZXh0cmFjdEV4dGVuc2lvbihmaWxlKSA9PSAnbXBkJyk7XG59O1xuIiwiLyoqXG4gKiB1dGlscyBmb3Igd2VicGFja1xuICovXG5cbmV4cG9ydCBjb25zdCBnZXRTY3JpcHRQYXRoID0gZnVuY3Rpb24oc2NyaXB0TmFtZSkge1xuICAgIGNvbnN0IHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0Jyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY3JpcHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHNyYyA9IHNjcmlwdHNbaV0uc3JjO1xuICAgICAgICBpZiAoc3JjKSB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHNyYy5sYXN0SW5kZXhPZignLycgKyBzY3JpcHROYW1lKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNyYy5zdWJzdHIoMCwgaW5kZXggKyAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gJyc7XG59O1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gMjkuLlxuICovXG5leHBvcnQgY29uc3QgdmVyc2lvbiA9IF9fVkVSU0lPTl9fO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==