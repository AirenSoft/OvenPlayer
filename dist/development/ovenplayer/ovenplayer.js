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
/******/ 		"ovenplayer": 0
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/ovenplayer.js");
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

var _webpack = __webpack_require__(/*! utils/webpack */ "./src/js/utils/webpack.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__.p = (0, _webpack.getScriptPath)('ovenplayer.js');

var OvenPlayer = {};
window.OvenPlayer = OvenPlayer;

/**
 * Copy properties from OvenPlayerSDK object to OvenPlayer object
 */
_extends(OvenPlayer, _ovenplayer2.default);

OvenPlayer.create = function (container, options) {

    var containerElement = (0, _ovenplayer.checkAndGetContainerElement)(container);

    /*const view = new View();
     view.appendPlayerMarkup(containerElement);
     const playerInstance = OvenPlayerSDK.create(view.getMediaElementContainer(), options);
      view.addComponentsAndFunctions(playerInstance, options);*/

    var player = (0, _view2.default)(containerElement);

    var playerInstance = _ovenplayer2.default.create(player.getMediaElementContainer(), options);

    _extends(playerInstance, {
        getId: function getId() {
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

var _ui = __webpack_require__(/*! utils/polyfills/ui */ "./src/js/utils/polyfills/ui.js");

var _ui2 = _interopRequireDefault(_ui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @brief   It was replace jquery's selector. It Often used by OvenTemplate. (/view/engine/OvenTemplate.js)
 * @param   selectorOrElement  string or element
 *
 * */

/**
 * Created by hoho on 2018. 7. 23..
 */
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
};

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

/***/ "./src/js/utils/polyfills/ui.js":
/*!**************************************!*\
  !*** ./src/js/utils/polyfills/ui.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by hoho on 2018. 8. 1..
 */
var closest = function closest() {
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
};

exports.default = closest;

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
    var $root = (0, _likeA$2.default)("#" + api.getId());
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
        } else {
            $root.removeClass("ovp-fullscreen");
            isFullScreen = false;
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
        if (api.getDuration() !== Infinity) {
            var body = {
                title: "Speed",
                value: api.getPlaybackRate() === 1 ? "Normal" : api.getPlaybackRate(),
                type: "playbackrate"
            };
            panel.body.push(body);
        }

        if (api.getQualityLevels().length > 0) {
            var qualityLevels = api.getQualityLevels();
            var currentQuality = api.getCurrentQuality();

            var _body = {
                title: "Source",
                value: qualityLevels[currentQuality] ? qualityLevels[currentQuality].label : "Default",
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
        "mouseleave .ovp-controls-container": function mouseleaveOvpControlsContainer(event, $current, template) {
            event.preventDefault();

            volumeButton.setMouseDown(false);
            $current.find(".ovp-volume-slider-container").removeClass("ovp-volume-slider-container-active");
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
     return '<div class="ovp-controls">' + '<div class="ovp-gradient-bottom"></div>' + '<div class="ovp-bottom-panel">' + '    <div class="ovp-progressbar-container">' + '    </div>' + '    <div class="ovp-controls-container">' + '        <div class="ovp-left-controls">' + '        </div>' + '        <div class="ovp-right-controls">' + '               <button class="ovp-button ovp-setting-button"><i class="ovp-setting-button-icon"></i></button>' + '        </div>' + '    </div>' + '</div>';
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
    var $root = (0, _likeA$2.default)("#" + api.getId());
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

        $time.css('left', calculateMagnetic() + "px");
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
            $root.addClass("ovp-progressbar-hover");
            $time.show();
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
    var $root = (0, _likeA$2.default)("#" + api.getId());

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
                    isCheck: currentQuality === _i,
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

        if (percentage >= 50) {
            $volumeIconBig.show();
        } else if (percentage < 50 && percentage > 0) {
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
            $sliderContainer.addClass("ovp-volume-slider-container-active");
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
            if ($target.get().forEach) {
                $target.get().forEach(function ($item) {
                    $item.addEventListener(eventName, wrappedFunc);
                });
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
            if ($target.get().forEach) {
                $target.get().forEach(function ($item) {
                    $item.removeEventListener(event.name, event.callback);
                });
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
    var $root = (0, _likeA$2.default)("#" + api.getId());

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

            if (api.getCurrentQuality() + 1 === api.getQualityLevels().length) {
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
  return '<div class="ovp-helper"></div>';
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
            if (!(0, _likeA$2.default)(event.target).closest(".ovp-controls") && !(0, _likeA$2.default)(event.target).closest(".ovp-setting-panel")) {
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
            helper = (0, _main2.default)($playerRoot, playerInstance);
            controls = (0, _main4.default)($playerRoot, playerInstance);

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
    return '<div class="ovenplayer ovp-wrapper" tabindex="-1" aria-label="" id="' + id + '">' + '<div class="ovp-ratio"></div>' + '<div class="ovp-player">' + '<div class="ovp-media-element-container">' + '</div>' + '<div class="ovp-ui">' + '</div>' + '</div>' + '</div>';
};
exports.default = ViewTemplate;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2FtZC1vcHRpb25zLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0FwaS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0NvbmZpZ3VyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0V2ZW50RW1pdHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0xhenlDb21tYW5kRXhlY3V0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9TdXBwb3J0Q2hlY2tlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL21lZGlhL01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wbGF5bGlzdC9NYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3NoaW1zL3Byb21pc2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL292ZW5wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL292ZW5wbGF5ZXIuc2RrLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9saWtlQSQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL2xvZ2dlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvcG9seWZpbGxzL3VpLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9zdHJpbmdzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy91bmRlcnNjb3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy92YWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3dlYnBhY2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvZnVsbFNjcmVlbkJ1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9jb250cm9scy9mdWxsU2NyZWVuQnV0dG9uVGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9jb250cm9scy9tYWluVGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvcGxheUJ1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9jb250cm9scy9wbGF5QnV0dG9uVGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvcHJvZ3Jlc3NCYXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvcHJvZ3Jlc3NCYXJUZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9jb250cm9scy9zZXR0aW5nUGFuZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvc2V0dGluZ1BhbmVsVGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvdGltZURpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvdGltZURpc3BsYXlUZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9jb250cm9scy92b2x1bWVCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvY29udHJvbHMvdm9sdW1lQnV0dG9uVGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvZW5naW5lL092ZW5UZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9lbmdpbmUvVGVtcGxhdGVzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3L2V4YW1wbGUvbWFpblRlbXBsYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3L2dsb2JhbC9TZXR0aW5nUGFuZWxMaXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3L2hlbHBlci9iaWdCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvaGVscGVyL2JpZ0J1dHRvblRlbXBsYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3L2hlbHBlci9jb250ZXh0UGFuZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvaGVscGVyL2NvbnRleHRQYW5lbFRlbXBsYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3L2hlbHBlci9tYWluLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3L2hlbHBlci9tYWluVGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvaGVscGVyL21lc3NhZ2VCb3guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvaGVscGVyL21lc3NhZ2VCb3hUZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9oZWxwZXIvc3Bpbm5lci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmlldy9oZWxwZXIvc3Bpbm5lclRlbXBsYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92aWV3L3ZpZXcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZpZXcvdmlld1RlbXBsYXRlLmpzIl0sIm5hbWVzIjpbIkFwaSIsImNvbnRhaW5lciIsImxvZ01hbmFnZXIiLCJ0aGF0IiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJ2ZXJzaW9uIiwibWVkaWFNYW5hZ2VyIiwicGxheWxpc3RNYW5hZ2VyIiwicHJvdmlkZXJDb250cm9sbGVyIiwiY3VycmVudFByb3ZpZGVyIiwicGxheWVyQ29uZmlnIiwibGF6eVF1ZXVlIiwiaW5pdFByb3ZpZGVyIiwibGFzdFBsYXlQb3NpdGlvbiIsInBpY2tRdWFsaXR5RnJvbVNvdXJjZSIsInNvdXJjZXMiLCJxdWFsaXR5IiwiaSIsImxlbmd0aCIsImRlZmF1bHQiLCJnZXRRdWFsaXR5TGFiZWwiLCJsYWJlbCIsImxvYWRQcm92aWRlcnMiLCJnZXRQbGF5bGlzdCIsInRoZW4iLCJkZXN0cm95IiwidmlkZW9FbGVtZW50IiwiY3JlYXRlRWxlbWVudCIsImN1cnJlbnRTb3VyY2VJbmRleCIsImdldEN1cnJlbnRTb3VyY2VzIiwiUHJvdmlkZXJzIiwib24iLCJuYW1lIiwiZGF0YSIsInRyaWdnZXIiLCJFUlJPUiIsImNvZGUiLCJQTEFZRVJfRklMRV9FUlJPUiIsInBhcnNlSW50IiwiTkVUV09SS19VTlNUQUJMRUQiLCJjdXJyZW50UXVhbGl0eSIsImdldEN1cnJlbnRRdWFsaXR5IiwiZ2V0UXVhbGl0eUxldmVscyIsInBhdXNlIiwic2V0Q3VycmVudFF1YWxpdHkiLCJwcmVsb2FkIiwiZmx1c2giLCJSRUFEWSIsImNhdGNoIiwiZXJyb3IiLCJlcnJvck9iamVjdCIsIklOSVRfRVJST1IiLCJyZWFzb24iLCJtZXNzYWdlIiwicmVtb3ZlQW5kRXhjdXRlT25jZSIsImluaXQiLCJvcHRpb25zIiwiaXNEZWJ1ZyIsImRpc2FibGUiLCJzZXRQbGF5bGlzdCIsImdldENvbmZpZyIsImdldER1cmF0aW9uIiwiZ2V0UG9zaXRpb24iLCJnZXRWb2x1bWUiLCJzZXRWb2x1bWUiLCJ2b2x1bWUiLCJzZXRNdXRlIiwic3RhdGUiLCJnZXRNdXRlIiwibG9hZCIsInBsYXlsaXN0IiwicGxheSIsInNlZWsiLCJwb3NpdGlvbiIsInNldFBsYXliYWNrUmF0ZSIsInBsYXliYWNrUmF0ZSIsInNldERlZmF1bHRQbGF5YmFja1JhdGUiLCJnZXRQbGF5YmFja1JhdGUiLCJxdWFsaXR5SW5kZXgiLCJjdXJyZW50U291cmNlIiwibmV3U291cmNlIiwiaXNTYW1lUHJvdmlkZXIiLCJyZXNRdWFsaXR5SW5kZXgiLCJnZXRCdWZmZXIiLCJnZXRTdGF0ZSIsInN0b3AiLCJyZW1vdmUiLCJERVNUUk9ZIiwib2ZmIiwiQ29uZmlndXJhdG9yIiwiY29tcG9zZVNvdXJjZU9wdGlvbnMiLCJEZWZhdWx0cyIsImRlZmF1bHRQbGF5YmFja1JhdGUiLCJwbGF5YmFja1JhdGVDb250cm9scyIsInBsYXliYWNrUmF0ZXMiLCJtdXRlIiwid2lkdGgiLCJoZWlnaHQiLCJzZXJpYWxpemUiLCJ2YWwiLCJ1bmRlZmluZWQiLCJsb3dlcmNhc2VWYWwiLCJ0b0xvd2VyQ2FzZSIsImlzTmFOIiwiTnVtYmVyIiwicGFyc2VGbG9hdCIsImRlc2VyaWFsaXplIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJub3JtYWxpemVTaXplIiwic2xpY2UiLCJldmFsdWF0ZUFzcGVjdFJhdGlvIiwiYXIiLCJ0b1N0cmluZyIsImluZGV4T2YiLCJ0ZXN0IiwiaW5kZXgiLCJ3Iiwic3Vic3RyIiwiaCIsImNvbmZpZyIsImFzcGVjdHJhdGlvIiwicmF0ZUNvbnRyb2xzIiwicmF0ZXMiLCJBcnJheSIsImlzQXJyYXkiLCJmaWx0ZXIiLCJfIiwiaXNOdW1iZXIiLCJyYXRlIiwibWFwIiwiTWF0aCIsInJvdW5kIiwicHVzaCIsInNvcnQiLCJjb25maWdQbGF5bGlzdCIsIm9iaiIsInBpY2siLCJmZWVkRGF0YSIsImR1cmF0aW9uIiwiZGVidWciLCJpbWFnZSIsInF1YWxpdHlMYWJlbCIsInJlcGVhdCIsInN0cmV0Y2hpbmciLCJnZXRBc3BlY3RyYXRpbyIsInNldEFzcGVjdHJhdGlvIiwiYXNwZWN0cmF0aW9fIiwiZ2V0RGVmYXVsdFBsYXliYWNrUmF0ZSIsInNldFF1YWxpdHlMYWJlbCIsIm5ld0xhYmVsIiwiZ2V0UGxheWJhY2tSYXRlcyIsImlzUGxheWJhY2tSYXRlQ29udHJvbHMiLCJwbGF5bGlzdF8iLCJpc1JlcGVhdCIsImdldFN0cmV0Y2hpbmciLCJFdmVudEVtaXR0ZXIiLCJvYmplY3QiLCJfZXZlbnRzIiwidHJpZ2dlckV2ZW50cyIsImV2ZW50cyIsImFyZ3MiLCJjb250ZXh0IiwiZXZlbnQiLCJsaXN0ZW5lciIsImFwcGx5IiwiY2FsbCIsImFyZ3VtZW50cyIsImFsbEV2ZW50cyIsImFsbCIsIm5hbWVzIiwibCIsInJldGFpbiIsImoiLCJrIiwiX2NhbGxiYWNrIiwib25jZSIsImNvdW50Iiwib25jZUNhbGxiYWNrIiwiX2xpc3RlbmVyIiwiTGF6eUNvbW1hbmRFeGVjdXRvciIsImluc3RhbmNlIiwicXVldWVkQ29tbWFuZHMiLCJjb21tYW5kUXVldWUiLCJ1bmRlY29yYXRlZE1ldGhvZHMiLCJleGVjdXRlTW9kZSIsImNvbW1hbmQiLCJtZXRob2QiLCJwcm90b3R5cGUiLCJhZGRRdWV1ZSIsImV4ZWN1dGVRdWV1ZWRDb21tYW5kcyIsInNoaWZ0Iiwic2V0RXhlY3V0ZU1vZGUiLCJtb2RlIiwiZ2V0VW5kZWNvcmF0ZWRNZXRob2RzIiwiZ2V0UXVldWUiLCJlbXB0eSIsImNvbW1hbmRfIiwiY29tbWFuZFF1ZXVlSXRlbSIsImZpbmRXaGVyZSIsInNwbGljZSIsImZpbmRJbmRleCIsIlN1cHBvcnRDaGVja2VyIiwic3VwcG9ydExpc3QiLCJjaGVja1N1cHBvcnQiLCJzb3VyY2UiLCJNaW1lVHlwZXMiLCJhYWMiLCJtcDQiLCJmNHYiLCJtNHYiLCJtb3YiLCJtcDMiLCJtcGVnIiwib2d2Iiwib2dnIiwib2dhIiwidm9yYmlzIiwid2VibSIsImY0YSIsIm0zdTgiLCJtM3UiLCJobHMiLCJ2aWRlbyIsImRvY3VtZW50IiwiY2FuUGxheVR5cGUiLCJmaWxlIiwidHlwZSIsIm1pbWVUeXBlIiwiaXNIbHNTdXBwb3J0IiwiZ2V0TWVkaWFTb3VyY2UiLCJ3aW5kb3ciLCJNZWRpYVNvdXJjZSIsIldlYktpdE1lZGlhU291cmNlIiwibWVkaWFTb3VyY2UiLCJzb3VyY2VCdWZmZXIiLCJTb3VyY2VCdWZmZXIiLCJXZWJLaXRTb3VyY2VCdWZmZXIiLCJpc1R5cGVTdXBwb3J0ZWQiLCJzb3VyY2VCdWZmZXJWYWxpZEFQSSIsImFwcGVuZEJ1ZmZlciIsImZpbmRQcm92aWRlck5hbWVCeVNvdXJjZSIsInNvcnVjZV8iLCJmaW5kUHJvdmlkZXJOYW1lc0J5UGxheWxpc3QiLCJzdXBwb3J0TmFtZXMiLCJpdGVtIiwic3VwcG9ydGVkIiwiU1RBVEVfQlVGRkVSSU5HIiwiU1RBVEVfSURMRSIsIlNUQVRFX0NPTVBMRVRFIiwiU1RBVEVfUEFVU0VEIiwiU1RBVEVfUExBWUlORyIsIlNUQVRFX0VSUk9SIiwiU1RBVEVfTE9BRElORyIsIlNUQVRFX1NUQUxMRUQiLCJQUk9WSURFUl9IVE1MNSIsIlBST1ZJREVSX1dFQlJUQyIsIlBST1ZJREVSX0RBU0giLCJQUk9WSURFUl9ITFMiLCJDT05URU5UX0NPTVBMRVRFIiwiQ09OVEVOVF9TRUVLIiwiQ09OVEVOVF9CVUZGRVJfRlVMTCIsIkRJU1BMQVlfQ0xJQ0siLCJDT05URU5UX0xPQURFRCIsIkNPTlRFTlRfU0VFS0VEIiwiUExBWUVSX1NUQVRFIiwiUExBWUVSX0NPTVBMRVRFIiwiUExBWUVSX1BBVVNFIiwiUExBWUVSX1BMQVkiLCJDT05URU5UX0JVRkZFUiIsIkNPTlRFTlRfVElNRSIsIkNPTlRFTlRfUkFURV9DSEFOR0UiLCJDT05URU5UX1ZPTFVNRSIsIkNPTlRFTlRfTVVURSIsIkNPTlRFTlRfTUVUQSIsIkNPTlRFTlRfTEVWRUxTIiwiQ09OVEVOVF9MRVZFTF9DSEFOR0VEIiwiUExBWUJBQ0tfUkFURV9DSEFOR0VEIiwiQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VEIiwiQ09OVEVOVF9DQVBUSU9OX0NIQU5HRUQiLCJQTEFZRVJfVU5LTldPTl9FUlJPUiIsIlBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUiIsIlBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IiLCJQTEFZRVJfQ0FQVElPTl9FUlJPUiIsIlBMQVlFUl9XRUJSVENfV1NfRVJST1IiLCJQTEFZRVJfV0VCUlRDX1dTX0NMT1NFRCIsIlBMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUiIsIlBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19DUkVBVEVfQU5TV0VSX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUiIsIlBMQVlFUl9XRUJSVENfTkVUV09SS19TTE9XIiwiTWFuYWdlciIsIm1lZGlhRWxlbWVudCIsImNyZWF0ZU1lZGlhRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJjdXJyZW50UGxheWxpc3QiLCJzdXBwb3J0Q2hlY2tlciIsIm1ha2VQcmV0dHlTb3VyY2UiLCJzb3VyY2VfIiwiaG9zdCIsImFwcGxpY2F0aW9uIiwic3RyZWFtIiwibWltZXR5cGVSZWdFeCIsInJlcGxhY2UiLCJwcmV0dGllZFBsYXlsaXN0IiwidHJhY2tzIiwicGxheWxpc3RJdGVtIiwibGV2ZWxzIiwicHJldHR5U291cmNlIiwiZGVmYXVsdFNvdXJjZSIsImNhcHRpb25zIiwiY29uY2F0IiwidHJhY2siLCJDb250cm9sbGVyIiwic3VwcG9ydENoYWNrZXIiLCJyZWdpc3RlUHJvdmlkZXIiLCJwcm92aWRlciIsIlByb3ZpZGVyTG9hZGVyIiwiaHRtbDUiLCJyZXF1aXJlIiwiZXJyIiwiRXJyb3IiLCJ3ZWJydGMiLCJkYXNoIiwic3VwcG9ydGVkUHJvdmlkZXJOYW1lcyIsIlByb21pc2UiLCJwcm92aWRlck5hbWUiLCJmaW5kQnlOYW1lIiwiZ2V0UHJvdmlkZXJCeVNvdXJjZSIsInN1cHBvcnRlZFByb3ZpZGVyTmFtZSIsInByb21pc2VGaW5hbGx5IiwiY2FsbGJhY2siLCJjb25zdHJ1Y3RvciIsInZhbHVlIiwicmVzb2x2ZSIsInJlamVjdCIsInNldFRpbWVvdXRGdW5jIiwic2V0VGltZW91dCIsInNldEltbWVkaWF0ZUZ1bmMiLCJzZXRJbW1lZGlhdGUiLCJub29wIiwiYmluZCIsImZuIiwidGhpc0FyZyIsIlByb21pc2VTaGltIiwiVHlwZUVycm9yIiwiX3N0YXRlIiwiX2hhbmRsZWQiLCJfdmFsdWUiLCJfZGVmZXJyZWRzIiwiZG9SZXNvbHZlIiwiaGFuZGxlIiwic2VsZiIsImRlZmVycmVkIiwiX2ltbWVkaWF0ZUZuIiwiY2IiLCJvbkZ1bGZpbGxlZCIsIm9uUmVqZWN0ZWQiLCJwcm9taXNlIiwicmV0IiwiZSIsIm5ld1ZhbHVlIiwiZmluYWxlIiwiX3VuaGFuZGxlZFJlamVjdGlvbkZuIiwibGVuIiwiSGFuZGxlciIsImRvbmUiLCJleCIsInByb20iLCJhcnIiLCJyZW1haW5pbmciLCJyZXMiLCJyYWNlIiwidmFsdWVzIiwiY29uc29sZSIsIndhcm4iLCJyZXNvbHZlZCIsIl9fd2VicGFja19wdWJsaWNfcGF0aF9fIiwiT3ZlblBsYXllciIsIk92ZW5QbGF5ZXJTREsiLCJjcmVhdGUiLCJjb250YWluZXJFbGVtZW50IiwicGxheWVyIiwicGxheWVySW5zdGFuY2UiLCJnZXRNZWRpYUVsZW1lbnRDb250YWluZXIiLCJnZXRJZCIsImlkIiwic2V0QXBpIiwicGxheWVyTGlzdCIsImNoZWNrQW5kR2V0Q29udGFpbmVyRWxlbWVudCIsImdldEVsZW1lbnRCeUlkIiwibm9kZVR5cGUiLCJnZXRQbGF5ZXJMaXN0IiwiZ2V0UGxheWVyQnlDb250YWluZXJJZCIsImNvbnRhaW5lcklkIiwiZ2V0UGxheWVyQnlJbmRleCIsImdlbmVyYXRlV2VicnRjVXJscyIsIkxhJCIsInNlbGVjdG9yT3JFbGVtZW50IiwicmV0dXJuTm9kZSIsIiRlbGVtZW50Iiwic2VsZWN0b3IiLCJub2RlTGlzdCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJldmVyeSIsImlzRWxlbWVudCIsImZpbmQiLCJjc3MiLCJlbGVtZW50Iiwic3R5bGUiLCJhZGRDbGFzcyIsImNsYXNzTGlzdCIsImFkZCIsImNsYXNzTmFtZXMiLCJjbGFzc05hbWUiLCJzcGxpdCIsInJlbW92ZUNsYXNzIiwiUmVnRXhwIiwiam9pbiIsInNob3ciLCJkaXNwbGF5IiwiaGlkZSIsImFwcGVuZCIsImh0bWxDb2RlIiwiaW5uZXJIVE1MIiwidGV4dCIsInRleHRDb250ZW50IiwiaGFzQ2xhc3MiLCJjb250YWlucyIsImlzIiwiJHRhcmdldEVsZW1lbnQiLCJvZmZzZXQiLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwidG9wIiwiYm9keSIsInNjcm9sbFRvcCIsImxlZnQiLCJzY3JvbGxMZWZ0IiwiY2xpZW50V2lkdGgiLCJjbGllbnRIZWlnaHQiLCJhdHRyIiwiZ2V0QXR0cmlidXRlIiwicGFyZW50Tm9kZSIsImh0bWwiLCJyZXBsYWNlV2l0aCIsImdldCIsImNsb3Nlc3QiLCJzZWxlY3RvclN0cmluZyIsImxvZ2dlciIsInByZXZDb25zb2xlTG9nIiwiZW5hYmxlIiwiRWxlbWVudCIsInMiLCJtYXRjaGVzIiwib3duZXJEb2N1bWVudCIsImVsIiwicGFyZW50RWxlbWVudCIsInRyaW0iLCJuYXR1cmFsSG1zIiwic3RyaW5nIiwiZXh0cmFjdEV4dGVuc2lvbiIsInBhdGgiLCJnZXRBenVyZUZpbGVGb3JtYXQiLCJleHRlbnNpb24iLCJhenVyZWRGb3JtYXQiLCJsYXN0SW5kZXhPZiIsInNlY29uZCIsInNlY051bSIsImhvdXJzIiwiZmxvb3IiLCJtaW51dGVzIiwic2Vjb25kcyIsIm4iLCJnbG9iYWwiLCJyIiwibyIsIlN5bWJvbCIsInUiLCJjIiwicCIsImhhc093blByb3BlcnR5IiwidCIsImEiLCJmIiwiX3dyYXBwZWQiLCJleHBvcnRzIiwibW9kdWxlIiwiVkVSU0lPTiIsInYiLCJ5IiwiZCIsIml0ZXJhdGVlIiwiaWRlbnRpdHkiLCJpc0Z1bmN0aW9uIiwiaXNPYmplY3QiLCJtYXRjaGVyIiwicHJvcGVydHkiLCJnIiwibWF4IiwibSIsImIiLCJ4IiwicG93IiwiQSIsImVhY2giLCJjb2xsZWN0IiwiTyIsInJlZHVjZSIsImZvbGRsIiwiaW5qZWN0IiwicmVkdWNlUmlnaHQiLCJmb2xkciIsImRldGVjdCIsImZpbmRLZXkiLCJzZWxlY3QiLCJuZWdhdGUiLCJzb21lIiwiYW55IiwiaW5jbHVkZXMiLCJpbmNsdWRlIiwiaW52b2tlIiwicGx1Y2siLCJ3aGVyZSIsIm1pbiIsInNodWZmbGUiLCJzYW1wbGUiLCJyYW5kb20iLCJjbG9uZSIsInNvcnRCeSIsImNyaXRlcmlhIiwiZ3JvdXBCeSIsImluZGV4QnkiLCJjb3VudEJ5IiwiUyIsInRvQXJyYXkiLCJpc1N0cmluZyIsIm1hdGNoIiwic2l6ZSIsInBhcnRpdGlvbiIsImZpcnN0IiwiaGVhZCIsInRha2UiLCJpbml0aWFsIiwibGFzdCIsInJlc3QiLCJ0YWlsIiwiZHJvcCIsImNvbXBhY3QiLCJCb29sZWFuIiwiTSIsImlzQXJndW1lbnRzIiwiZmxhdHRlbiIsIndpdGhvdXQiLCJkaWZmZXJlbmNlIiwidW5pcSIsInVuaXF1ZSIsImlzQm9vbGVhbiIsInVuaW9uIiwiaW50ZXJzZWN0aW9uIiwidW56aXAiLCJ6aXAiLCJGIiwiZmluZExhc3RJbmRleCIsInNvcnRlZEluZGV4IiwiRSIsInJhbmdlIiwiY2VpbCIsImNodW5rIiwiTiIsInBhcnRpYWwiLCJwbGFjZWhvbGRlciIsImJpbmRBbGwiLCJtZW1vaXplIiwiY2FjaGUiLCJkZWxheSIsImRlZmVyIiwidGhyb3R0bGUiLCJsZWFkaW5nIiwibm93IiwiY2xlYXJUaW1lb3V0IiwidHJhaWxpbmciLCJjYW5jZWwiLCJkZWJvdW5jZSIsIndyYXAiLCJjb21wb3NlIiwiYWZ0ZXIiLCJiZWZvcmUiLCJyZXN0QXJndW1lbnRzIiwiSSIsInByb3BlcnR5SXNFbnVtZXJhYmxlIiwiVCIsIkIiLCJhbGxLZXlzIiwibWFwT2JqZWN0IiwicGFpcnMiLCJpbnZlcnQiLCJmdW5jdGlvbnMiLCJtZXRob2RzIiwiUiIsImV4dGVuZCIsImV4dGVuZE93biIsImFzc2lnbiIsInEiLCJLIiwieiIsIm9taXQiLCJTdHJpbmciLCJkZWZhdWx0cyIsInRhcCIsImlzTWF0Y2giLCJ2YWx1ZU9mIiwicG9wIiwiaXNFcXVhbCIsImlzRW1wdHkiLCJEIiwiY2hpbGROb2RlcyIsIkludDhBcnJheSIsImlzRmluaXRlIiwiaXNTeW1ib2wiLCJpc051bGwiLCJpc1VuZGVmaW5lZCIsImhhcyIsIm5vQ29uZmxpY3QiLCJjb25zdGFudCIsInByb3BlcnR5T2YiLCJ0aW1lcyIsIkRhdGUiLCJnZXRUaW1lIiwiTCIsIlAiLCJXIiwiZXNjYXBlIiwidW5lc2NhcGUiLCJyZXN1bHQiLCJDIiwidW5pcXVlSWQiLCJ0ZW1wbGF0ZVNldHRpbmdzIiwiZXZhbHVhdGUiLCJpbnRlcnBvbGF0ZSIsIkoiLCJVIiwiViIsIiQiLCJ0ZW1wbGF0ZSIsInZhcmlhYmxlIiwiRnVuY3Rpb24iLCJjaGFpbiIsIl9jaGFpbiIsIkciLCJtaXhpbiIsInRvSlNPTiIsImlzUnRtcCIsImlzV2ViUlRDIiwiaXNEYXNoIiwiZ2V0U2NyaXB0UGF0aCIsInNjcmlwdE5hbWUiLCJzY3JpcHRzIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJzcmMiLCJGdWxsU2NyZWVuQnV0dG9uIiwiJGNvbnRhaW5lciIsImFwaSIsIiRyb290IiwiJGljb25FeHBhbmQiLCIkaWNvbkNvbXByZXNzIiwiaXNGdWxsU2NyZWVuIiwiZnVsbFNjcmVlbkV2ZW50VHlwZXMiLCJvbmZ1bGxzY3JlZW5jaGFuZ2UiLCJvbm1vemZ1bGxzY3JlZW5jaGFuZ2UiLCJvbndlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UiLCJNU0Z1bGxzY3JlZW5DaGFuZ2UiLCJmdWxsU2NyZWVuQ2hhbmdlZENhbGxiYWNrIiwiY2hlY2tGdWxsU2NyZWVuIiwiZnVsbHNjcmVlbkVsZW1lbnQiLCJ3ZWJraXRGdWxsc2NyZWVuRWxlbWVudCIsIm1vekZ1bGxTY3JlZW5FbGVtZW50IiwibXNGdWxsc2NyZWVuRWxlbWVudCIsInJlcXVlc3RGdWxsU2NyZWVuIiwicmVxdWVzdEZ1bGxzY3JlZW4iLCJ3ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbiIsIm1velJlcXVlc3RGdWxsU2NyZWVuIiwibXNSZXF1ZXN0RnVsbHNjcmVlbiIsImV4aXRGdWxsU2NyZWVuIiwiZXhpdEZ1bGxzY3JlZW4iLCJ3ZWJraXRFeGl0RnVsbHNjcmVlbiIsIm1vekNhbmNlbEZ1bGxTY3JlZW4iLCJtc0V4aXRGdWxsc2NyZWVuIiwidG9nZ2xlRnVsbFNjcmVlbiIsIm9uUmVuZGVyZWQiLCIkY3VycmVudCIsImV2ZW50TmFtZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJvbkRlc3Ryb3llZCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJwcmV2ZW50RGVmYXVsdCIsIkNvbnRyb2xzIiwidm9sdW1lQnV0dG9uIiwicGxheUJ1dHRvbiIsInByb2dyZXNzQmFyIiwidGltZURpc3BsYXkiLCJmdWxsU2NyZWVuQnV0dG9uIiwiZ2VuZXJhdGVNYWluUGFuZWxEYXRhIiwicGFuZWwiLCJ0aXRsZSIsImlzTWFpbiIsIkluZmluaXR5IiwicXVhbGl0eUxldmVscyIsImluaXRUaW1lRGlzcGxheSIsImluaXRQcm9ncmVzc0JhciIsInNldE1vdXNlRG93biIsIlNldHRpbmdQYW5lbExpc3QiLCJzZXR0aW5nUGFuZWwiLCJQbGF5QnV0dG9uIiwiJGljb25QbGF5IiwiJGljb25QYXVzZSIsIiRpY29uUmVwbGF5Iiwic2V0QnV0dG9uU3RhdGUiLCJuZXdzdGF0ZSIsImN1cnJlbnRTdGF0ZSIsIlByb2dyZXNzQmFyIiwiY3VycmVudFBsYXlpbmdQb3NpdGlvbiIsImN1cnJlbnRQbGF5aW5nUGVyY2VudGFnZSIsImN1cnJlbnRMb2FkZWRQZXJjZW50YWdlIiwibW91c2VJbnNpZGUiLCJtb3VzZURvd24iLCIkcHJvZ3Jlc3NCYXIiLCIkcHJvZ3Jlc3NMb2FkIiwiJHByb2dyZXNzUGxheSIsIiRwcm9ncmVzc0hvdmVyIiwiJGtub2JDb250YWluZXIiLCIka25vYiIsImtub2JXaWR0aCIsIiR0aW1lIiwicG9zaXRpb25FbGVtZW50cyIsInBlcmNlbnRhZ2UiLCJwcm9ncmVzc0JhcldpZHRoIiwia25vYlBvc3Rpb24iLCJkcmF3SG92ZXJQcm9ncmVzcyIsImhvdmVyUG9zaXRpb24iLCJkcmF3TG9hZFByb2dyZXNzIiwibG9hZFBvc2l0aW9uIiwiY2FsY3VsYXRlUGVyY2VudGFnZSIsInByb2dyZXNzQmFyT2Zmc2V0WCIsInBvaW50ZXJPZmZzZXRYIiwicGFnZVgiLCJkcmF3VGltZUluZGljYXRvciIsImhtcyIsInRpbWVFbGVtV2lkdGgiLCJwb3NpdGlvbk9mUGl4ZWwiLCJjYWxjdWxhdGVNYWduZXRpYyIsImJ1ZmZlclBlcmNlbnQiLCJQTEFZRVJfTUlOX0hFSUdIVCIsIlNldHRpbmdQYW5lbCIsImV4dHJhY3RQYW5lbERhdGEiLCJwYW5lbFR5cGUiLCJwbGF5QmFja1JhdGVzIiwiY3VycmVudFBsYXliYWNrUmF0ZSIsImlzQ2hlY2siLCJjdXJyZW50VGFyZ2V0IiwiZWxlbWVudHMiLCJzZXR0aW5nSXRlbVRlbXBsYXRlIiwic2V0dGluZ1ZhbHVlVGVtcGxhdGUiLCJUaW1lRGlzcGxheSIsIiRwb3NpdGlvbiIsIiRkdXJhdGlvbiIsImNvbnZlcnRIdW1hbml6ZVRpbWUiLCJ0aW1lIiwiVm9sdW1lQnV0dG9uIiwiJHNsaWRlckNvbnRhaW5lciIsIiRzbGlkZXIiLCIkc2xpZGVySGFuZGxlIiwiJHNsaWRlclZhbHVlIiwiJHZvbHVtZUljb25CaWciLCIkdm9sdW1lSWNvblNtYWxsIiwiJHZvbHVtZUljb25NdXRlIiwic2xpZGVyV2lkdGgiLCJoYW5kbGVXaWR0aCIsIm1pblJhbmdlIiwibWF4UmFuZ2UiLCJzZXRWb2x1bWVJY29uIiwic2V0Vm9sdW1lVUkiLCJoYW5kbGVQb3NpdGlvbiIsInJlbGF0aXZlWCIsIk92ZW5UZW1wbGF0ZSIsInRlbXBsYXRlTmFtZSIsImlzUm9vdCIsIiR0ZW1wbGF0ZSIsInZpZXdFdmVudHMiLCJjcmVhdGVBbmRTZWxlY3RFbGVtZW50IiwibmV3RWxlbWVudCIsImZpcnN0Q2hpbGQiLCJUZW1wbGF0ZXMiLCJleHBsb2RlZFRleHQiLCJldmVudFN0cmluZyIsInRhcmdldCIsIiR0YXJnZXQiLCJ3cmFwcGVkRnVuYyIsIiRpdGVtIiwiVGV4dFZpZXdUZW1wbGF0ZSIsIlZpZXdUZW1wbGF0ZSIsIkhlbHBlclRlbXBsYXRlIiwiQmlnQnV0dG9uVGVtcGxhdGUiLCJNZXNzYWdlQm94VGVtcGxhdGUiLCJTcGlubmVyVGVtcGxhdGUiLCJDb250ZXh0UGFuZWxUZW1wbGF0ZSIsIkNvbnRyb2xzVGVtcGxhdGUiLCJWb2x1bWVCdXR0b25UZW1wbGF0ZSIsIlByb2dyZXNzQmFyVGVtcGxhdGUiLCJQbGF5QnV0dG9uVGVtcGxhdGUiLCJUaW1lRGlzcGxheVRlbXBsYXRlIiwiRnVsbFNjcmVlbkJ1dHRvblRlbXBsYXRlIiwiU2V0dGluZ1BhbmVsVGVtcGxhdGUiLCJCaWdCdXR0b24iLCJwbGF5ZXJTdGF0ZSIsIkNvbnRleHRQYW5lbCIsInBhbmVsV2lkdGgiLCJwYW5lbEhlaWdodCIsInBhZ2VZIiwib3BlbiIsIkhlbHBlciIsImJpZ0J1dHRvbiIsIm1lc3NhZ2VCb3giLCJzcGlubmVyIiwiY3JlYXRlQmlnQnV0dG9uIiwiY3JlYXRlTWVzc2FnZSIsIndpdGhUaW1lciIsIk1lc3NhZ2VCb3giLCJhdXRvRGVzdHJveVRpbWVyIiwiU3Bpbm5lciIsIiRzcGlubmVyIiwiaXNTaG93IiwiVmlldyIsImNvbnRyb2xzIiwiaGVscGVyIiwiJHBsYXllclJvb3QiLCJjb250ZXh0UGFuZWwiLCJhdXRvSGlkZVRpbWVyIiwic2V0SGlkZSIsImF1dG9IaWRlIiwidG9nZ2xlUGxheVBhdXNlIiwiaXNSZXdpbmQiLCJjdXJyZW50UG9zaXRpb24iLCJpc1VwIiwiY3VycmVudFZvbHVtbiIsIm5ld1ZvbHVtZSIsImNyZWF0ZUNvbnRleHRQYW5lbCIsImtleUNvZGUiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGdCQUFRLG9CQUFvQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQSxpREFBeUMsNFhBQTRYO0FBQ3Jh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LGdDQUFRLEtBQVIsRUFBZSxJQUFmO0FBQ0gscUJBRkQsTUFFSztBQUNEQSxnQ0FBUSxLQUFSO0FBQ0g7QUFDSjtBQUNKLGFBUkQ7QUFTSDtBQW5Cd0csS0FBdEcsQ0FBUDtBQXFCSCxDQS9LRDs7a0JBbUxlTixJOzs7Ozs7Ozs7Ozs7Ozs7OztBQzVNZjs7OztBQUlBLElBQU1oQyxlQUFlLFNBQWZBLFlBQWUsQ0FBUzlaLEVBQVQsRUFBWTtBQUM3QixXQUFPLHlFQUF1RUEsRUFBdkUsR0FBMEUsSUFBMUUsR0FDSywrQkFETCxHQUVLLDBCQUZMLEdBR1MsMkNBSFQsR0FJUyxRQUpULEdBS1Msc0JBTFQsR0FNUyxRQU5ULEdBT0ssUUFQTCxHQVFDLFFBUlI7QUFTSCxDQVZEO2tCQVdlOFosWSIsImZpbGUiOiJvdmVucGxheWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG5cblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0fTtcblxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJvdmVucGxheWVyXCI6IDBcbiBcdH07XG5cblxuXG4gXHQvLyBzY3JpcHQgcGF0aCBmdW5jdGlvblxuIFx0ZnVuY3Rpb24ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCkge1xuIFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArICh7XCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuaHRtbDVcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5odG1sNVwiLFwib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLmh0bWw1XCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLmh0bWw1XCJ9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLmpzXCJcbiBcdH1cblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCkge1xuIFx0XHR2YXIgcHJvbWlzZXMgPSBbXTtcblxuXG4gXHRcdC8vIEpTT05QIGNodW5rIGxvYWRpbmcgZm9yIGphdmFzY3JpcHRcblxuIFx0XHR2YXIgaW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIHsgLy8gMCBtZWFucyBcImFscmVhZHkgaW5zdGFsbGVkXCIuXG5cbiBcdFx0XHQvLyBhIFByb21pc2UgbWVhbnMgXCJjdXJyZW50bHkgbG9hZGluZ1wiLlxuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0pO1xuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHQvLyBzZXR1cCBQcm9taXNlIGluIGNodW5rIGNhY2hlXG4gXHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XTtcbiBcdFx0XHRcdH0pO1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0gPSBwcm9taXNlKTtcblxuIFx0XHRcdFx0Ly8gc3RhcnQgY2h1bmsgbG9hZGluZ1xuIFx0XHRcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuIFx0XHRcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuIFx0XHRcdFx0dmFyIG9uU2NyaXB0Q29tcGxldGU7XG5cbiBcdFx0XHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04JztcbiBcdFx0XHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuIFx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcbiBcdFx0XHRcdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c2NyaXB0LnNyYyA9IGpzb25wU2NyaXB0U3JjKGNodW5rSWQpO1xuXG4gXHRcdFx0XHRvblNjcmlwdENvbXBsZXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gXHRcdFx0XHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cbiBcdFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gbnVsbDtcbiBcdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuIFx0XHRcdFx0XHR2YXIgY2h1bmsgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdFx0XHRcdGlmKGNodW5rICE9PSAwKSB7XG4gXHRcdFx0XHRcdFx0aWYoY2h1bmspIHtcbiBcdFx0XHRcdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG4gXHRcdFx0XHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuIFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCdMb2FkaW5nIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJyk7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci50eXBlID0gZXJyb3JUeXBlO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG4gXHRcdFx0XHRcdFx0XHRjaHVua1sxXShlcnJvcik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fTtcbiBcdFx0XHRcdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuIFx0XHRcdFx0XHRvblNjcmlwdENvbXBsZXRlKHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KTtcbiBcdFx0XHRcdH0sIDEyMDAwMCk7XG4gXHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlO1xuIFx0XHRcdFx0aGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBvbiBlcnJvciBmdW5jdGlvbiBmb3IgYXN5bmMgbG9hZGluZ1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikgeyBjb25zb2xlLmVycm9yKGVycik7IHRocm93IGVycjsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9qcy9vdmVucGxheWVyLmpzXCIpO1xuIiwiLyogZ2xvYmFscyBfX3dlYnBhY2tfYW1kX29wdGlvbnNfXyAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19hbWRfb3B0aW9uc19fO1xyXG4iLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSwgZXZhbCkoXCJ0aGlzXCIpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0aWYgKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XG5cdFx0bW9kdWxlLnBhdGhzID0gW107XG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XG5cdFx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xuXHR9XG5cdHJldHVybiBtb2R1bGU7XG59O1xuIiwiLy9pbXBvcnQgQ2FwdGlvbk1hbmFnZXIgZnJvbSBcImFwaS9jYXB0aW9uL01hbmFnZXJcIjtcbmltcG9ydCBDb25maWd1cmF0b3IgZnJvbSBcImFwaS9Db25maWd1cmF0b3JcIjtcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImFwaS9FdmVudEVtaXR0ZXJcIjtcbmltcG9ydCBMYXp5Q29tbWFuZEV4ZWN1dG9yIGZyb20gXCJhcGkvTGF6eUNvbW1hbmRFeGVjdXRvclwiO1xuaW1wb3J0IExvZ01hbmFnZXIgZnJvbSBcInV0aWxzL2xvZ2dlclwiO1xuaW1wb3J0IE1lZGlhTWFuYWdlciBmcm9tIFwiYXBpL21lZGlhL01hbmFnZXJcIjtcbmltcG9ydCBQbGF5bGlzdE1hbmFnZXIgZnJvbSBcImFwaS9wbGF5bGlzdC9NYW5hZ2VyXCI7XG5pbXBvcnQgUHJvdmlkZXJDb250cm9sbGVyIGZyb20gXCJhcGkvcHJvdmlkZXIvQ29udHJvbGxlclwiO1xuaW1wb3J0IFByb21pc2UsIHtyZXNvbHZlZH0gZnJvbSBcImFwaS9zaGltcy9wcm9taXNlXCI7XG5pbXBvcnQge1JFQURZLCBFUlJPUiwgSU5JVF9FUlJPUiwgREVTVFJPWSwgTkVUV09SS19VTlNUQUJMRUQsIFBMQVlFUl9GSUxFX0VSUk9SfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuaW1wb3J0IHt2ZXJzaW9ufSBmcm9tICd2ZXJzaW9uJztcblxuLyoqXG4gKiBAYnJpZWYgICBUaGlzIG9iamVjdCBjb25uZWN0cyBVSSB0byB0aGUgcHJvdmlkZXIuXG4gKiBAcGFyYW0gICB7b2JqZWN0fSAgICBjb250YWluZXIgIGRvbSBlbGVtZW50XG4gKlxuICogKi9cblxuY29uc3QgQXBpID0gZnVuY3Rpb24oY29udGFpbmVyKXtcbiAgICBsZXQgbG9nTWFuYWdlciA9IExvZ01hbmFnZXIoKTtcbiAgICBjb25zdCB0aGF0ID0ge307XG4gICAgRXZlbnRFbWl0dGVyKHRoYXQpO1xuXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiW1tPdmVuUGxheWVyXV0gdi5cIisgdmVyc2lvbik7XG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIGxvYWRlZC5cIik7XG4gICAgLy9sZXQgY2FwdGlvbk1hbmFnZXIgPSBDYXB0aW9uTWFuYWdlcih0aGF0KTtcbiAgICBsZXQgbWVkaWFNYW5hZ2VyID0gTWVkaWFNYW5hZ2VyKGNvbnRhaW5lcik7XG4gICAgbGV0IHBsYXlsaXN0TWFuYWdlciA9IFBsYXlsaXN0TWFuYWdlcigpO1xuICAgIGxldCBwcm92aWRlckNvbnRyb2xsZXIgPSBQcm92aWRlckNvbnRyb2xsZXIoKTtcbiAgICBsZXQgY3VycmVudFByb3ZpZGVyID0gXCJcIjtcbiAgICBsZXQgcGxheWVyQ29uZmlnID0gXCJcIjtcbiAgICBsZXQgbGF6eVF1ZXVlID0gXCJcIjtcblxuICAgIGNvbnN0IGluaXRQcm92aWRlciA9IGZ1bmN0aW9uKGxhc3RQbGF5UG9zaXRpb24pe1xuICAgICAgICBjb25zdCBwaWNrUXVhbGl0eUZyb21Tb3VyY2UgPSAoc291cmNlcykgPT57XG4gICAgICAgICAgICB2YXIgcXVhbGl0eSA9IDA7XG4gICAgICAgICAgICBpZiAoc291cmNlcykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc291cmNlc1tpXS5kZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWFsaXR5ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyQ29uZmlnLmdldFF1YWxpdHlMYWJlbCgpICYmIHNvdXJjZXNbaV0ubGFiZWwgPT09IHBsYXllckNvbmZpZy5nZXRRdWFsaXR5TGFiZWwoKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHF1YWxpdHk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHByb3ZpZGVyQ29udHJvbGxlci5sb2FkUHJvdmlkZXJzKHBsYXlsaXN0TWFuYWdlci5nZXRQbGF5bGlzdCgpKS50aGVuKFByb3ZpZGVycyA9PiB7XG4gICAgICAgICAgICBpZihjdXJyZW50UHJvdmlkZXIpe1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHZpZGVvRWxlbWVudCA9IG1lZGlhTWFuYWdlci5jcmVhdGVFbGVtZW50KCk7XG4gICAgICAgICAgICBsZXQgY3VycmVudFNvdXJjZUluZGV4ID0gcGlja1F1YWxpdHlGcm9tU291cmNlKHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50U291cmNlcygpKTtcblxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiY3VycmVudCBzb3VyY2UgaW5kZXggOiBcIisgY3VycmVudFNvdXJjZUluZGV4KTtcblxuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyID0gUHJvdmlkZXJzW2N1cnJlbnRTb3VyY2VJbmRleF0odmlkZW9FbGVtZW50LCBwbGF5ZXJDb25maWcpO1xuXG4gICAgICAgICAgICAvL1RoaXMgcGFzc2VzIHRoZSBldmVudCBjcmVhdGVkIGJ5IHRoZSBQcm92aWRlciB0byBBUEkuXG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIub24oXCJhbGxcIiwgZnVuY3Rpb24obmFtZSwgZGF0YSl7XG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKG5hbWUsIGRhdGEpO1xuXG4gICAgICAgICAgICAgICAgLy9BdXRvIG5leHQgc291cmNlIHdoZW4gcGxheWVyIGxvYWQgd2FzIGZhaWwgYnkgYW1pc3Mgc291cmNlLlxuICAgICAgICAgICAgICAgIGlmKCAobmFtZSA9PT0gRVJST1IgJiYgKGRhdGEuY29kZSA9PT0gUExBWUVSX0ZJTEVfRVJST1IgfHwgcGFyc2VJbnQoZGF0YS5jb2RlLzEwMCkgPT09IDUpKVxuICAgICAgICAgICAgICAgICAgICB8fCBuYW1lID09PSBORVRXT1JLX1VOU1RBQkxFRCApe1xuICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudFF1YWxpdHkgPSB0aGF0LmdldEN1cnJlbnRRdWFsaXR5KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmKGN1cnJlbnRRdWFsaXR5KzEgPCB0aGF0LmdldFF1YWxpdHlMZXZlbHMoKS5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzIHNlcXVlbnRpYWwgaGFzIGF2YWlsYWJsZSBzb3VyY2UuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBhdXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldEN1cnJlbnRRdWFsaXR5KGN1cnJlbnRRdWFsaXR5KzEpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pLnRoZW4oKCk9PntcbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5wcmVsb2FkKHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50U291cmNlcygpLCBsYXN0UGxheVBvc2l0aW9uICk7XG5cbiAgICAgICAgICAgIGxhenlRdWV1ZS5mbHVzaCgpO1xuICAgICAgICAgICAgLy9UaGlzIGlzIG5vIHJlYXNvbiB0byBleGlzdCBhbnltb3JlLlxuICAgICAgICAgICAgbGF6eVF1ZXVlLmRlc3Ryb3koKTtcblxuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFJFQURZKTtcbiAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlcnJvck9iamVjdCA9IHtjb2RlIDogSU5JVF9FUlJPUiwgcmVhc29uIDogXCJpbml0IGVycm9yLlwiLCBtZXNzYWdlIDogXCJQbGF5ZXIgaW5pdCBlcnJvci5cIiwgZXJyb3IgOiBlcnJvcn07XG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoRVJST1IsIGVycm9yT2JqZWN0KTtcblxuICAgICAgICAgICAgLy94eHggOiBJZiB5b3UgaW5pdCBlbXB0eSBzb3VyY2VzLiAoSSB0aGluayB0aGlzIGlzIHN0cmFuZ2UgY2FzZS4pXG4gICAgICAgICAgICAvL1RoaXMgd29ya3MgZm9yIHRoaXMgY2FzZS5cbiAgICAgICAgICAgIC8vcGxheWVyID0gT3ZlblBsYXllci5jcmVhdGUoXCJlbElkXCIsIHt9KTtcbiAgICAgICAgICAgIC8vcGxheWVyLmxvYWQoc29ydWNlcyk7XG4gICAgICAgICAgICBsYXp5UXVldWUucmVtb3ZlQW5kRXhjdXRlT25jZShcImxvYWRcIik7XG4gICAgICAgIH0pO1xuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIEFQSSDstIjquLDtmZQg7ZWo7IiYXG4gICAgICogaW5pdFxuICAgICAqIEBwYXJhbSAgICAgIHtvYmplY3R9IG9wdGlvbnMgcGxheWVyIGluaXRpYWwgb3B0aW9uIHZhbHVlLlxuICAgICAqIEByZXR1cm5zXG4gICAgICoqL1xuICAgIHRoYXQuaW5pdCA9IChvcHRpb25zKSA9PntcbiAgICAgICAgLy9JdCBjb2xsZWN0cyB0aGUgY29tbWFuZHMgYW5kIGV4ZWN1dGVzIHRoZW0gYXQgdGhlIHRpbWUgd2hlbiB0aGV5IGFyZSBleGVjdXRhYmxlLlxuICAgICAgICBsYXp5UXVldWUgPSBMYXp5Q29tbWFuZEV4ZWN1dG9yKHRoYXQsIFsnbG9hZCcsJ3BsYXknLCdwYXVzZScsJ3NlZWsnLCdzdG9wJywgJ2dldER1cmF0aW9uJywgJ2dldFBvc2l0aW9uJywgJ2dldFZvbHVtZScsICdnZXRNdXRlJywgJ2dldEJ1ZmZlcicsICdnZXRTdGF0ZSddKTtcbiAgICAgICAgcGxheWVyQ29uZmlnID0gQ29uZmlndXJhdG9yKG9wdGlvbnMpO1xuICAgICAgICBpZighcGxheWVyQ29uZmlnLmlzRGVidWcoKSl7XG4gICAgICAgICAgICBsb2dNYW5hZ2VyLmRpc2FibGUoKTtcbiAgICAgICAgfVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpbml0KClcIik7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGluaXQoKSBjb25maWcgOiBcIiwgcGxheWVyQ29uZmlnKTtcblxuICAgICAgICBwbGF5bGlzdE1hbmFnZXIuc2V0UGxheWxpc3QocGxheWVyQ29uZmlnLmdldFBsYXlsaXN0KCkpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpbml0KCkgc291cmNlcyA6IFwiICwgcGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRTb3VyY2VzKCkpO1xuICAgICAgICBpbml0UHJvdmlkZXIoKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Q29uZmlnID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRDb25maWcoKVwiLCBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkpO1xuICAgICAgICByZXR1cm4gcGxheWVyQ29uZmlnLmdldENvbmZpZygpO1xuICAgIH07XG5cbiAgICB0aGF0LmdldER1cmF0aW9uID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXREdXJhdGlvbigpXCIsIGN1cnJlbnRQcm92aWRlci5nZXREdXJhdGlvbigpKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXREdXJhdGlvbigpO1xuICAgIH07XG4gICAgdGhhdC5nZXRQb3NpdGlvbiA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0UG9zaXRpb24oKVwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0UG9zaXRpb24oKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0UG9zaXRpb24oKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Vm9sdW1lID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRWb2x1bWUoKVwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0Vm9sdW1lKCkpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFZvbHVtZSgpO1xuICAgIH07XG4gICAgdGhhdC5zZXRWb2x1bWUgPSAodm9sdW1lKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldFZvbHVtZSgpIFwiICsgdm9sdW1lKTtcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnNldFZvbHVtZSh2b2x1bWUpO1xuICAgIH07XG4gICAgdGhhdC5zZXRNdXRlID0gKHN0YXRlKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldE11dGUoKSBcIiArIHN0YXRlKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5zZXRNdXRlKHN0YXRlKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0TXV0ZSA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0TXV0ZSgpIFwiICsgY3VycmVudFByb3ZpZGVyLmdldE11dGUoKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0TXV0ZSgpO1xuICAgIH07XG4gICAgdGhhdC5sb2FkID0gKHBsYXlsaXN0KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGxvYWQoKSBcIiwgcGxheWxpc3QpO1xuICAgICAgICBsYXp5UXVldWUgPSBMYXp5Q29tbWFuZEV4ZWN1dG9yKHRoYXQsIFsncGxheScsJ3NlZWsnLCdzdG9wJ10pO1xuXG4gICAgICAgIGlmKHBsYXlsaXN0KXtcbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5zZXRDdXJyZW50UXVhbGl0eSgwKTtcbiAgICAgICAgICAgIHBsYXlsaXN0TWFuYWdlci5zZXRQbGF5bGlzdChwbGF5bGlzdCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGluaXRQcm92aWRlcigpO1xuXG4gICAgfTtcbiAgICB0aGF0LnBsYXkgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHBsYXkoKSBcIik7XG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5wbGF5KCk7XG4gICAgfVxuICAgIHRoYXQucGF1c2UgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHBhdXNlKCkgXCIpO1xuICAgICAgICBjdXJyZW50UHJvdmlkZXIucGF1c2UoKTtcbiAgICB9O1xuICAgIHRoYXQuc2VlayA9IChwb3NpdGlvbikgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZWVrKCkgXCIrIHBvc2l0aW9uKTtcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnNlZWsocG9zaXRpb24pO1xuICAgIH07XG4gICAgdGhhdC5zZXRQbGF5YmFja1JhdGUgPSAocGxheWJhY2tSYXRlKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0UGxheWJhY2tSYXRlKCkgXCIsIHBsYXliYWNrUmF0ZSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2V0UGxheWJhY2tSYXRlKHBsYXllckNvbmZpZy5zZXREZWZhdWx0UGxheWJhY2tSYXRlKHBsYXliYWNrUmF0ZSkpO1xuICAgIH07XG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGUgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0UGxheWJhY2tSYXRlKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRQbGF5YmFja1JhdGUoKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0UGxheWJhY2tSYXRlKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldFF1YWxpdHlMZXZlbHMgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0UXVhbGl0eUxldmVscygpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0UXVhbGl0eUxldmVscygpKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRRdWFsaXR5TGV2ZWxzKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldEN1cnJlbnRRdWFsaXR5ID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEN1cnJlbnRRdWFsaXR5KCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRDdXJyZW50UXVhbGl0eSgpKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRDdXJyZW50UXVhbGl0eSgpO1xuICAgIH07XG4gICAgdGhhdC5zZXRDdXJyZW50UXVhbGl0eSA9IChxdWFsaXR5SW5kZXgpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRDdXJyZW50UXVhbGl0eSgpIFwiLCBxdWFsaXR5SW5kZXgpO1xuXG4gICAgICAgIGxldCBzb3VyY2VzID0gcGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRTb3VyY2VzKCk7XG4gICAgICAgIGxldCBjdXJyZW50U291cmNlID0gc291cmNlc1t0aGF0LmdldEN1cnJlbnRRdWFsaXR5KCldO1xuICAgICAgICBsZXQgbmV3U291cmNlID0gc291cmNlc1txdWFsaXR5SW5kZXhdO1xuICAgICAgICBsZXQgbGFzdFBsYXlQb3NpdGlvbiA9IHRoYXQuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgbGV0IGlzU2FtZVByb3ZpZGVyID0gcHJvdmlkZXJDb250cm9sbGVyLmlzU2FtZVByb3ZpZGVyKGN1cnJlbnRTb3VyY2UsIG5ld1NvdXJjZSk7XG4gICAgICAgIC8vIHByb3ZpZGVyLnNlckN1cnJlbnRRdWFsaXR5IC0+IHBsYXllckNvbmZpZyBzZXR0aW5nIC0+IGxvYWRcbiAgICAgICAgbGV0IHJlc1F1YWxpdHlJbmRleCA9IGN1cnJlbnRQcm92aWRlci5zZXRDdXJyZW50UXVhbGl0eShxdWFsaXR5SW5kZXgsIGlzU2FtZVByb3ZpZGVyKTtcblxuICAgICAgICBpZighbmV3U291cmNlKXtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Q3VycmVudFF1YWxpdHkoKSBpc1NhbWVQcm92aWRlclwiLCBpc1NhbWVQcm92aWRlcik7XG5cbiAgICAgICAgaWYoIWlzU2FtZVByb3ZpZGVyKXtcbiAgICAgICAgICAgIGxhenlRdWV1ZSA9IExhenlDb21tYW5kRXhlY3V0b3IodGhhdCwgWydwbGF5J10pO1xuICAgICAgICAgICAgaW5pdFByb3ZpZGVyKGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc1F1YWxpdHlJbmRleDtcbiAgICB9O1xuXG4gICAgLyogQ2FwdGlvbnMgOiBUaGlzIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhlIGN1cnJlbnQgdmVyc2lvbi4qL1xuICAgIC8qdGhhdC5zZXRDdXJyZW50Q2FwdGlvbiA9IChpbmRleCkgPT57XG4gICAgICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5zZXRDdXJyZW50Q2FwdGlvbihpbmRleCk7XG4gICAgfVxuICAgIHRoYXQuZ2V0Q3VycmVudENhcHRpb24gPSAoKSA9PntcbiAgICAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLmdldEN1cnJlbnRDYXB0aW9uKCk7XG4gICAgfVxuICAgIHRoYXQuZ2V0Q2FwdGlvbkxpc3QgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5nZXRDYXB0aW9uTGlzdCgpO1xuICAgIH1cbiAgICB0aGF0LmFkZENhcHRpb24gPSAodHJhY2spID0+IHtcbiAgICAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLmFkZENhcHRpb24oKTtcbiAgICB9XG4gICAgdGhhdC5nZXRDYXB0aW9uTGlzdCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLmdldENhcHRpb25MaXN0KCk7XG4gICAgfSovXG5cbiAgICB0aGF0LmdldEJ1ZmZlciA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0QnVmZmVyKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRCdWZmZXIoKSk7XG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5nZXRCdWZmZXIoKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0U3RhdGUgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFN0YXRlKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRTdGF0ZSgpKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRTdGF0ZSgpO1xuICAgIH07XG4gICAgdGhhdC5zdG9wID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzdG9wKCkgXCIpO1xuICAgICAgICBjdXJyZW50UHJvdmlkZXIuc3RvcCgpO1xuICAgIH07XG4gICAgdGhhdC5yZW1vdmUgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHJlbW92ZSgpIFwiKTtcbiAgICAgICAgbGF6eVF1ZXVlLmRlc3Ryb3koKTtcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLmRlc3Ryb3koKTtcbiAgICAgICAgY3VycmVudFByb3ZpZGVyID0gbnVsbDtcbiAgICAgICAgcHJvdmlkZXJDb250cm9sbGVyID0gbnVsbDtcbiAgICAgICAgcGxheWxpc3RNYW5hZ2VyID0gbnVsbDtcbiAgICAgICAgcGxheWVyQ29uZmlnID0gbnVsbDtcblxuICAgICAgICB0aGF0LnRyaWdnZXIoREVTVFJPWSk7XG4gICAgICAgIHRoYXQub2ZmKCk7XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcmVtb3ZlKCkgLSBsYXp5UXVldWUsIGN1cnJlbnRQcm92aWRlciwgcHJvdmlkZXJDb250cm9sbGVyLCBwbGF5bGlzdE1hbmFnZXIsIHBsYXllckNvbmZpZywgYXBpIGV2ZW50IGRlc3Ryb2VkLiBcIik7XG4gICAgICAgIGxvZ01hbmFnZXIuZGVzdHJveSgpO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cblxuXG5leHBvcnQgZGVmYXVsdCBBcGk7XG5cblxuIiwiaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBUaGlzIGluaXRpYWxpemVzIHRoZSBpbnB1dCBvcHRpb25zLlxuICogQHBhcmFtICAgb3B0aW9uc1xuICpcbiAqICovXG5jb25zdCBDb25maWd1cmF0b3IgPSBmdW5jdGlvbihvcHRpb25zKXtcblxuICAgIGNvbnN0IGNvbXBvc2VTb3VyY2VPcHRpb25zID0gZnVuY3Rpb24ob3B0aW9ucyl7XG4gICAgICAgIGNvbnN0IERlZmF1bHRzID0ge1xuICAgICAgICAgICAgZGVmYXVsdFBsYXliYWNrUmF0ZTogMSxcbiAgICAgICAgICAgIHBsYXliYWNrUmF0ZUNvbnRyb2xzOiBmYWxzZSxcbiAgICAgICAgICAgIHBsYXliYWNrUmF0ZXM6IFswLjI1LCAwLjUsIDEsIDEuNSwgMl0sXG4gICAgICAgICAgICBtdXRlOiBmYWxzZSxcbiAgICAgICAgICAgIHZvbHVtZTogOTAsXG4gICAgICAgICAgICB3aWR0aDogNjQwLFxuICAgICAgICAgICAgaGVpZ2h0OiAzNjBcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgc2VyaWFsaXplID0gZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycgJiYgdmFsLmxlbmd0aCA8IDYpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsb3dlcmNhc2VWYWwgPSB2YWwudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICBpZiAobG93ZXJjYXNlVmFsID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChsb3dlcmNhc2VWYWwgPT09ICdmYWxzZScpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKE51bWJlcih2YWwpKSAmJiAhaXNOYU4ocGFyc2VGbG9hdCh2YWwpKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gTnVtYmVyKHZhbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkZXNlcmlhbGl6ZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSAnaWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3B0aW9uc1trZXldID0gc2VyaWFsaXplKG9wdGlvbnNba2V5XSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBub3JtYWxpemVTaXplID0gZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbC5zbGljZSAmJiB2YWwuc2xpY2UoLTIpID09PSAncHgnKSB7XG4gICAgICAgICAgICAgICAgdmFsID0gdmFsLnNsaWNlKDAsIC0yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZXZhbHVhdGVBc3BlY3RSYXRpbyA9IGZ1bmN0aW9uIChhciwgd2lkdGgpIHtcbiAgICAgICAgICAgIGlmICh3aWR0aC50b1N0cmluZygpLmluZGV4T2YoJyUnKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXIgIT09ICdzdHJpbmcnIHx8ICFhcikge1xuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKC9eXFxkKlxcLj9cXGQrJSQvLnRlc3QoYXIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBhci5pbmRleE9mKCc6Jyk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB3ID0gcGFyc2VGbG9hdChhci5zdWJzdHIoMCwgaW5kZXgpKTtcbiAgICAgICAgICAgIGNvbnN0IGggPSBwYXJzZUZsb2F0KGFyLnN1YnN0cihpbmRleCArIDEpKTtcbiAgICAgICAgICAgIGlmICh3IDw9IDAgfHwgaCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gKGggLyB3ICogMTAwKSArICclJztcbiAgICAgICAgfVxuICAgICAgICBkZXNlcmlhbGl6ZShvcHRpb25zKTtcbiAgICAgICAgbGV0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIERlZmF1bHRzLCBvcHRpb25zKTtcbiAgICAgICAgY29uZmlnLndpZHRoID0gbm9ybWFsaXplU2l6ZShjb25maWcud2lkdGgpO1xuICAgICAgICBjb25maWcuaGVpZ2h0ID0gbm9ybWFsaXplU2l6ZShjb25maWcuaGVpZ2h0KTtcbiAgICAgICAgY29uZmlnLmFzcGVjdHJhdGlvID0gZXZhbHVhdGVBc3BlY3RSYXRpbyhjb25maWcuYXNwZWN0cmF0aW8sIGNvbmZpZy53aWR0aCk7XG5cbiAgICAgICAgbGV0IHJhdGVDb250cm9scyA9IGNvbmZpZy5wbGF5YmFja1JhdGVDb250cm9scztcbiAgICAgICAgaWYgKHJhdGVDb250cm9scykge1xuICAgICAgICAgICAgbGV0IHJhdGVzID0gY29uZmlnLnBsYXliYWNrUmF0ZXM7XG5cbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJhdGVDb250cm9scykpIHtcbiAgICAgICAgICAgICAgICByYXRlcyA9IHJhdGVDb250cm9scztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJhdGVzID0gcmF0ZXMuZmlsdGVyKHJhdGUgPT4gXy5pc051bWJlcihyYXRlKSAmJiByYXRlID49IDAuMjUgJiYgcmF0ZSA8PSA0KVxuICAgICAgICAgICAgICAgIC5tYXAocmF0ZSA9PiBNYXRoLnJvdW5kKHJhdGUgKiA0KSAvIDQpO1xuXG4gICAgICAgICAgICBpZiAocmF0ZXMuaW5kZXhPZigxKSA8IDApIHtcbiAgICAgICAgICAgICAgICByYXRlcy5wdXNoKDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmF0ZXMuc29ydCgpO1xuXG4gICAgICAgICAgICBjb25maWcucGxheWJhY2tSYXRlQ29udHJvbHMgPSB0cnVlO1xuICAgICAgICAgICAgY29uZmlnLnBsYXliYWNrUmF0ZXMgPSByYXRlcztcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKCFjb25maWcucGxheWJhY2tSYXRlQ29udHJvbHMgfHwgY29uZmlnLnBsYXliYWNrUmF0ZXMuaW5kZXhPZihjb25maWcuZGVmYXVsdFBsYXliYWNrUmF0ZSkgPCAwKSB7XG4gICAgICAgICAgICBjb25maWcuZGVmYXVsdFBsYXliYWNrUmF0ZSA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBjb25maWcucGxheWJhY2tSYXRlID0gY29uZmlnLmRlZmF1bHRQbGF5YmFja1JhdGU7XG5cbiAgICAgICAgaWYgKCFjb25maWcuYXNwZWN0cmF0aW8pIHtcbiAgICAgICAgICAgIGRlbGV0ZSBjb25maWcuYXNwZWN0cmF0aW87XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb25maWdQbGF5bGlzdCA9IGNvbmZpZy5wbGF5bGlzdDtcbiAgICAgICAgaWYgKCFjb25maWdQbGF5bGlzdCkge1xuICAgICAgICAgICAgY29uc3Qgb2JqID0gXy5waWNrKGNvbmZpZywgW1xuICAgICAgICAgICAgICAgICd0aXRsZScsXG4gICAgICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJyxcbiAgICAgICAgICAgICAgICAndHlwZScsXG4gICAgICAgICAgICAgICAgJ21lZGlhaWQnLFxuICAgICAgICAgICAgICAgICdpbWFnZScsXG4gICAgICAgICAgICAgICAgJ2ZpbGUnLFxuICAgICAgICAgICAgICAgICdzb3VyY2VzJyxcbiAgICAgICAgICAgICAgICAndHJhY2tzJyxcbiAgICAgICAgICAgICAgICAncHJlbG9hZCcsXG4gICAgICAgICAgICAgICAgJ2R1cmF0aW9uJyxcbiAgICAgICAgICAgICAgICAnaG9zdCcsXG4gICAgICAgICAgICAgICAgJ2FwcGxpY2F0aW9uJyxcbiAgICAgICAgICAgICAgICAnc3RyZWFtJ1xuICAgICAgICAgICAgXSk7XG5cbiAgICAgICAgICAgIGNvbmZpZy5wbGF5bGlzdCA9IFsgb2JqIF07XG4gICAgICAgIH0gZWxzZSBpZiAoXy5pc0FycmF5KGNvbmZpZ1BsYXlsaXN0LnBsYXlsaXN0KSkge1xuICAgICAgICAgICAgY29uZmlnLmZlZWREYXRhID0gY29uZmlnUGxheWxpc3Q7XG4gICAgICAgICAgICBjb25maWcucGxheWxpc3QgPSBjb25maWdQbGF5bGlzdC5wbGF5bGlzdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGRlbGV0ZSBjb25maWcuZHVyYXRpb247XG4gICAgICAgIHJldHVybiBjb25maWc7XG4gICAgfTtcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDb25maWd1cmF0b3IgbG9hZGVkLlwiLCBvcHRpb25zKTtcbiAgICBsZXQgY29uZmlnID0gY29tcG9zZVNvdXJjZU9wdGlvbnMob3B0aW9ucyk7XG5cbiAgICBsZXQgYXNwZWN0cmF0aW8gPSBjb25maWcuYXNwZWN0cmF0aW8gfHwgXCIxNjo5XCI7XG4gICAgbGV0IGRlYnVnID0gY29uZmlnLmRlYnVnO1xuICAgIGxldCBkZWZhdWx0UGxheWJhY2tSYXRlID0gY29uZmlnLmRlZmF1bHRQbGF5YmFja1JhdGUgfHwgMTtcbiAgICBsZXQgaW1hZ2UgPSBjb25maWcuaW1hZ2U7XG4gICAgbGV0IHBsYXliYWNrUmF0ZUNvbnRyb2xzID0gY29uZmlnLnBsYXliYWNrUmF0ZUNvbnRyb2xzIHx8IHRydWU7XG4gICAgbGV0IHBsYXliYWNrUmF0ZXMgPSBjb25maWcucGxheWJhY2tSYXRlcyB8fCBbMC41LCAxLCAxLjI1LCAxLjUsIDJdO1xuICAgIGxldCBwbGF5bGlzdCA9IGNvbmZpZy5wbGF5bGlzdCB8fCBbXTtcbiAgICBsZXQgcXVhbGl0eUxhYmVsID0gY29uZmlnLnF1YWxpdHlMYWJlbCB8fCBcIlwiO1xuICAgIGxldCByZXBlYXQgPSBjb25maWcucmVwZWF0IHx8IGZhbHNlO1xuICAgIGxldCBzdHJldGNoaW5nID0gY29uZmlnLnN0cmV0Y2hpbmcgfHwgJ3VuaWZvcm0nO1xuXG5cblxuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICB0aGF0LmdldENvbmZpZyA9ICgpID0+IHtyZXR1cm4gY29uZmlnO307XG5cbiAgICB0aGF0LmdldEFzcGVjdHJhdGlvID0oKT0+e3JldHVybiBhc3BlY3RyYXRpbzt9O1xuICAgIHRoYXQuc2V0QXNwZWN0cmF0aW8gPShhc3BlY3RyYXRpb18pPT57YXNwZWN0cmF0aW8gPSBhc3BlY3RyYXRpb187fTtcblxuICAgIHRoYXQuaXNEZWJ1ZyA9KCk9PntyZXR1cm4gZGVidWc7fTtcblxuICAgIHRoYXQuZ2V0RGVmYXVsdFBsYXliYWNrUmF0ZSA9KCk9PntyZXR1cm4gZGVmYXVsdFBsYXliYWNrUmF0ZTt9O1xuICAgIHRoYXQuc2V0RGVmYXVsdFBsYXliYWNrUmF0ZSA9KHBsYXliYWNrUmF0ZSk9PntkZWZhdWx0UGxheWJhY2tSYXRlID0gcGxheWJhY2tSYXRlOyByZXR1cm4gcGxheWJhY2tSYXRlO307XG5cbiAgICB0aGF0LmdldFF1YWxpdHlMYWJlbCA9ICgpID0+IHtyZXR1cm4gcXVhbGl0eUxhYmVsO307XG4gICAgdGhhdC5zZXRRdWFsaXR5TGFiZWwgPSAobmV3TGFiZWwpID0+IHtxdWFsaXR5TGFiZWwgPSBuZXdMYWJlbDt9O1xuXG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGVzID0oKT0+e3JldHVybiBwbGF5YmFja1JhdGVzO307XG4gICAgdGhhdC5pc1BsYXliYWNrUmF0ZUNvbnRyb2xzID0oKT0+e3JldHVybiBwbGF5YmFja1JhdGVDb250cm9sczt9O1xuXG4gICAgdGhhdC5nZXRQbGF5bGlzdCA9KCk9PntyZXR1cm4gcGxheWxpc3Q7fTtcbiAgICB0aGF0LnNldFBsYXlsaXN0ID0ocGxheWxpc3RfICk9PntcbiAgICAgICAgaWYoXy5pc0FycmF5KHBsYXlsaXN0Xykpe1xuICAgICAgICAgICAgcGxheWxpc3QgPSBwbGF5bGlzdF87XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcGxheWxpc3QgPSBbcGxheWxpc3RfXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGxheWxpc3Q7XG4gICAgfTtcblxuICAgIHRoYXQuaXNSZXBlYXQgPSgpPT57cmV0dXJuIHJlcGVhdDt9O1xuXG4gICAgdGhhdC5nZXRTdHJldGNoaW5nID0oKT0+e3JldHVybiBzdHJldGNoaW5nO307XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbmZpZ3VyYXRvcjtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDMuLlxuICovXG5cbi8qKlxuICogQGJyaWVmICAgVGhpcyBtb2R1bGUgcHJvdmlkZSBjdXN0b20gZXZlbnRzLlxuICogQHBhcmFtICAgb2JqZWN0ICAgIEFuIG9iamVjdCB0aGF0IHJlcXVpcmVzIGN1c3RvbSBldmVudHMuXG4gKlxuICogKi9cblxuY29uc3QgRXZlbnRFbWl0dGVyID0gZnVuY3Rpb24ob2JqZWN0KXtcbiAgICBsZXQgdGhhdCA9IG9iamVjdDtcbiAgICBsZXQgX2V2ZW50cyA9W107XG5cbiAgICBjb25zdCB0cmlnZ2VyRXZlbnRzID0gZnVuY3Rpb24oZXZlbnRzLCBhcmdzLCBjb250ZXh0KXtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBsZXQgbGVuZ3RoID0gZXZlbnRzLmxlbmd0aDtcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgbGVuZ3RoOyBpICsrKXtcbiAgICAgICAgICAgIGxldCBldmVudCA9IGV2ZW50c1tpXTtcbiAgICAgICAgICAgIGV2ZW50Lmxpc3RlbmVyLmFwcGx5KCAoIGV2ZW50LmNvbnRleHQgfHwgY29udGV4dCApLCBhcmdzKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0Lm9uID0gZnVuY3Rpb24obmFtZSwgbGlzdGVuZXIsIGNvbnRleHQpe1xuICAgICAgICAoX2V2ZW50c1tuYW1lXSB8fCAoX2V2ZW50c1tuYW1lXT1bXSkgKS5wdXNoKHsgbGlzdGVuZXI6IGxpc3RlbmVyICAsIGNvbnRleHQgOiBjb250ZXh0fSk7XG4gICAgICAgIHJldHVybiB0aGF0O1xuICAgIH07XG4gICAgdGhhdC50cmlnZ2VyID0gZnVuY3Rpb24obmFtZSl7XG4gICAgICAgIGlmKCFfZXZlbnRzKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICBjb25zdCBldmVudHMgPSBfZXZlbnRzW25hbWVdO1xuICAgICAgICBjb25zdCBhbGxFdmVudHMgPSBfZXZlbnRzLmFsbDtcblxuICAgICAgICBpZihldmVudHMpe1xuICAgICAgICAgICAgdHJpZ2dlckV2ZW50cyhldmVudHMsIGFyZ3MsIHRoYXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmKGFsbEV2ZW50cyl7XG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnRzKGFsbEV2ZW50cywgYXJndW1lbnRzLCB0aGF0KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhhdC5vZmYgPSBmdW5jdGlvbihuYW1lLCBsaXN0ZW5lciwgY29udGV4dCl7XG4gICAgICAgIGlmKCFfZXZlbnRzKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghbmFtZSAmJiAhbGlzdGVuZXIgJiYgIWNvbnRleHQpICB7XG4gICAgICAgICAgICBfZXZlbnRzID0gW107XG4gICAgICAgICAgICByZXR1cm4gdGhhdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5hbWVzID0gbmFtZSA/IFtuYW1lXSA6IE9iamVjdC5rZXlzKF9ldmVudHMpO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IG5hbWVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgbmFtZSA9IG5hbWVzW2ldO1xuICAgICAgICAgICAgY29uc3QgZXZlbnRzID0gX2V2ZW50c1tuYW1lXTtcbiAgICAgICAgICAgIGlmIChldmVudHMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXRhaW4gPSBfZXZlbnRzW25hbWVdID0gW107XG4gICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyICB8fCBjb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwLCBrID0gZXZlbnRzLmxlbmd0aDsgaiA8IGs7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXZlbnQgPSBldmVudHNbal07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGxpc3RlbmVyICYmIGxpc3RlbmVyICE9PSBldmVudC5saXN0ZW5lciAmJiBsaXN0ZW5lciAhPT0gZXZlbnQubGlzdGVuZXIubGlzdGVuZXIgICYmIGxpc3RlbmVyICE9PSBldmVudC5saXN0ZW5lci5fY2FsbGJhY2spXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwoY29udGV4dCAmJiBjb250ZXh0ICE9PSBldmVudC5jb250ZXh0KVxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0YWluLnB1c2goZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghcmV0YWluLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgX2V2ZW50c1tuYW1lXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoYXQ7XG4gICAgfTtcbiAgICB0aGF0Lm9uY2UgPSBmdW5jdGlvbihuYW1lLCBsaXN0ZW5lciwgY29udGV4dCl7XG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgIGNvbnN0IG9uY2VDYWxsYmFjayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKGNvdW50KyspIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGF0Lm9mZihuYW1lLCBvbmNlQ2FsbGJhY2spO1xuICAgICAgICAgICAgbGlzdGVuZXIuYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICAgICAgb25jZUNhbGxiYWNrLl9saXN0ZW5lciA9IGxpc3RlbmVyO1xuICAgICAgICByZXR1cm4gdGhhdC5vbihuYW1lLCBvbmNlQ2FsbGJhY2ssIGNvbnRleHQpO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgRXZlbnRFbWl0dGVyOyIsImltcG9ydCBfIGZyb20gJ3V0aWxzL3VuZGVyc2NvcmUnO1xuXG4vKipcbiAqIEBicmllZiAgIFRoaXMgZXhlY3V0ZXMgdGhlIGlucHV0IGNvbW1hbmRzIGF0IGEgc3BlY2lmaWMgcG9pbnQgaW4gdGltZS5cbiAqIEBwYXJhbSAgIGluc3RhbmNlXG4gKiBAcGFyYW0gICBxdWV1ZWRDb21tYW5kc1xuICogKi9cbmNvbnN0IExhenlDb21tYW5kRXhlY3V0b3IgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIHF1ZXVlZENvbW1hbmRzKSB7XG4gICAgbGV0IGNvbW1hbmRRdWV1ZSA9IFtdO1xuICAgIGxldCB1bmRlY29yYXRlZE1ldGhvZHMgPSB7fTtcbiAgICBsZXQgZXhlY3V0ZU1vZGUgPSBmYWxzZTtcbiAgICBsZXQgdGhhdCA9IHt9O1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgbG9hZGVkLlwiKTtcbiAgICBxdWV1ZWRDb21tYW5kcy5mb3JFYWNoKChjb21tYW5kKSA9PiB7XG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IGluc3RhbmNlW2NvbW1hbmRdO1xuICAgICAgICB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF0gPSBtZXRob2QgfHwgZnVuY3Rpb24oKXt9O1xuXG4gICAgICAgIGluc3RhbmNlW2NvbW1hbmRdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICAgICAgICAgICAgaWYgKCFleGVjdXRlTW9kZSkge1xuICAgICAgICAgICAgICAgIC8vY29tbWFuZFF1ZXVlLnB1c2goeyBjb21tYW5kLCBhcmdzIH0pO1xuICAgICAgICAgICAgICAgIHRoYXQuYWRkUXVldWUoY29tbWFuZCwgYXJncylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZXhlY3V0ZVF1ZXVlZENvbW1hbmRzKCk7XG4gICAgICAgICAgICAgICAgaWYgKG1ldGhvZCkge1xuICAgICAgICAgICAgICAgICAgICBtZXRob2QuYXBwbHkodGhhdCwgYXJncyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0pO1xuICAgIHZhciBleGVjdXRlUXVldWVkQ29tbWFuZHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHdoaWxlIChjb21tYW5kUXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgeyBjb21tYW5kLCBhcmdzIH0gPSBjb21tYW5kUXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgICh1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF0gfHwgaW5zdGFuY2VbY29tbWFuZF0pLmFwcGx5KGluc3RhbmNlLCBhcmdzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRoYXQuc2V0RXhlY3V0ZU1vZGUgPSAobW9kZSkgPT4ge1xuICAgICAgICBleGVjdXRlTW9kZSA9IG1vZGU7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBzZXRFeGVjdXRlTW9kZSgpXCIsIG1vZGUpO1xuICAgIH07XG4gICAgdGhhdC5nZXRVbmRlY29yYXRlZE1ldGhvZHMgPSBmdW5jdGlvbigpe1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZ2V0VW5kZWNvcmF0ZWRNZXRob2RzKClcIiwgdW5kZWNvcmF0ZWRNZXRob2RzKTtcbiAgICAgICAgcmV0dXJuIHVuZGVjb3JhdGVkTWV0aG9kcztcbiAgICB9XG4gICAgdGhhdC5nZXRRdWV1ZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBnZXRRdWV1ZSgpXCIsIGdldFF1ZXVlKTtcbiAgICAgICAgcmV0dXJuIGNvbW1hbmRRdWV1ZTtcbiAgICB9XG4gICAgdGhhdC5hZGRRdWV1ZSA9IGZ1bmN0aW9uKGNvbW1hbmQsIGFyZ3Mpe1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogYWRkUXVldWUoKVwiLCBjb21tYW5kLCBhcmdzKTtcbiAgICAgICAgY29tbWFuZFF1ZXVlLnB1c2goeyBjb21tYW5kLCBhcmdzIH0pO1xuICAgIH1cblxuICAgIHRoYXQuZmx1c2ggPSBmdW5jdGlvbigpe1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZmx1c2goKVwiKTtcbiAgICAgICAgZXhlY3V0ZVF1ZXVlZENvbW1hbmRzKCk7XG4gICAgfTtcbiAgICB0aGF0LmVtcHR5ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBlbXB0eSgpXCIpO1xuICAgICAgICBjb21tYW5kUXVldWUubGVuZ3RoID0gMDtcbiAgICB9O1xuICAgIHRoYXQub2ZmID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBvZmYoKVwiKTtcbiAgICAgICAgcXVldWVkQ29tbWFuZHMuZm9yRWFjaCgoY29tbWFuZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWV0aG9kID0gdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdO1xuICAgICAgICAgICAgaWYgKG1ldGhvZCkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlW2NvbW1hbmRdID0gbWV0aG9kO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cblxuICAgIC8vUnVuIG9uY2UgYXQgdGhlIGVuZFxuICAgIHRoYXQucmVtb3ZlQW5kRXhjdXRlT25jZSA9IGZ1bmN0aW9uKGNvbW1hbmRfKXtcbiAgICAgICAgbGV0IGNvbW1hbmRRdWV1ZUl0ZW0gPSBfLmZpbmRXaGVyZShjb21tYW5kUXVldWUsIHtjb21tYW5kIDogY29tbWFuZF99KTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IHJlbW92ZUFuZEV4Y3V0ZU9uY2UoKVwiLCBjb21tYW5kXyk7XG4gICAgICAgIGNvbW1hbmRRdWV1ZS5zcGxpY2UoXy5maW5kSW5kZXgoY29tbWFuZFF1ZXVlLCB7Y29tbWFuZCA6IGNvbW1hbmRffSksIDEpO1xuXG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kX107XG4gICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcInJlbW92ZUNvbW1hbmQoKVwiKTtcbiAgICAgICAgICAgIGlmKGNvbW1hbmRRdWV1ZUl0ZW0pe1xuICAgICAgICAgICAgICAgIChtZXRob2R8fCBpbnN0YW5jZVtjb21tYW5kX10pLmFwcGx5KGluc3RhbmNlLCBjb21tYW5kUXVldWVJdGVtLmFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5zdGFuY2VbY29tbWFuZF9dID0gbWV0aG9kO1xuICAgICAgICAgICAgZGVsZXRlIHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kX107XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhhdC5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBkZXN0cm95KClcIik7XG4gICAgICAgIHRoYXQub2ZmKCk7XG4gICAgICAgIHRoYXQuZW1wdHkoKTtcbiAgICB9O1xuICAgIHJldHVybiB0aGF0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBMYXp5Q29tbWFuZEV4ZWN1dG9yOyIsImltcG9ydCB7aXNSdG1wLCBpc1dlYlJUQywgaXNEYXNofSBmcm9tIFwidXRpbHMvdmFsaWRhdG9yXCI7XG5cbi8qKlxuICogQGJyaWVmICAgVGhpcyBmaW5kcyB0aGUgcHJvdmlkZXIgdGhhdCBtYXRjaGVzIHRoZSBpbnB1dCBzb3VyY2UuXG4gKiBAcGFyYW1cbiAqICovXG5cbmNvbnN0IFN1cHBvcnRDaGVja2VyID0gZnVuY3Rpb24oKXtcbiAgICBjb25zdCB0aGF0ID0ge307XG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU3VwcG9ydENoZWNrZXIgbG9hZGVkLlwiKTtcbiAgICBjb25zdCBzdXBwb3J0TGlzdCA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ2h0bWw1JyxcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IE1pbWVUeXBlcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgYWFjOiAnYXVkaW8vbXA0JyxcbiAgICAgICAgICAgICAgICAgICAgbXA0OiAndmlkZW8vbXA0JyxcbiAgICAgICAgICAgICAgICAgICAgZjR2OiAndmlkZW8vbXA0JyxcbiAgICAgICAgICAgICAgICAgICAgbTR2OiAndmlkZW8vbXA0JyxcbiAgICAgICAgICAgICAgICAgICAgbW92OiAndmlkZW8vbXA0JyxcbiAgICAgICAgICAgICAgICAgICAgbXAzOiAnYXVkaW8vbXBlZycsXG4gICAgICAgICAgICAgICAgICAgIG1wZWc6ICdhdWRpby9tcGVnJyxcbiAgICAgICAgICAgICAgICAgICAgb2d2OiAndmlkZW8vb2dnJyxcbiAgICAgICAgICAgICAgICAgICAgb2dnOiAndmlkZW8vb2dnJyxcbiAgICAgICAgICAgICAgICAgICAgb2dhOiAndmlkZW8vb2dnJyxcbiAgICAgICAgICAgICAgICAgICAgdm9yYmlzOiAndmlkZW8vb2dnJyxcbiAgICAgICAgICAgICAgICAgICAgd2VibTogJ3ZpZGVvL3dlYm0nLFxuICAgICAgICAgICAgICAgICAgICBmNGE6ICd2aWRlby9hYWMnLFxuICAgICAgICAgICAgICAgICAgICBtM3U4OiAnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnLFxuICAgICAgICAgICAgICAgICAgICBtM3U6ICdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcsXG4gICAgICAgICAgICAgICAgICAgIGhsczogJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJ1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBjb25zdCB2aWRlbyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpXG4gICAgICAgICAgICAgICAgfSgpO1xuICAgICAgICAgICAgICAgIGlmICghdmlkZW8uY2FuUGxheVR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc291cmNlLnR5cGU7XG4gICAgICAgICAgICAgICAgaWYoIXR5cGUpe3JldHVybiBmYWxzZTt9XG4gICAgICAgICAgICAgICAgY29uc3QgbWltZVR5cGUgPSBzb3VyY2UubWltZVR5cGUgfHwgTWltZVR5cGVzW3R5cGVdO1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzUnRtcChmaWxlLCB0eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoaXNXZWJSVEMoZmlsZSwgdHlwZSkpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFtaW1lVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuICEhdmlkZW8uY2FuUGxheVR5cGUobWltZVR5cGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnd2VicnRjJyxcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZpZGVvID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJylcbiAgICAgICAgICAgICAgICB9KCk7XG4gICAgICAgICAgICAgICAgaWYgKCF2aWRlby5jYW5QbGF5VHlwZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IHNvdXJjZS5maWxlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcblxuICAgICAgICAgICAgICAgIGlmKGlzV2ViUlRDKGZpbGUsIHR5cGUpKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdkYXNoJyxcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcblxuICAgICAgICAgICAgICAgIC8vbXBkIGFwcGxpY2F0aW9uL2Rhc2greG1sXG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNvdXJjZS50eXBlO1xuICAgICAgICAgICAgICAgIGlmIChpc0Rhc2goZmlsZSwgdHlwZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdobHMnLFxuICAgICAgICAgICAgY2hlY2tTdXBwb3J0OiBmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmlkZW8gPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKVxuICAgICAgICAgICAgICAgIH0oKTtcblxuICAgICAgICAgICAgICAgIC8vdGhpcyBtZXRob2QgZnJvbSBobHMuanNcbiAgICAgICAgICAgICAgICBjb25zdCBpc0hsc1N1cHBvcnQgPSAoKSA9PntcbiAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGdldE1lZGlhU291cmNlKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5NZWRpYVNvdXJjZSB8fCB3aW5kb3cuV2ViS2l0TWVkaWFTb3VyY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIG1lZGlhU291cmNlID0gZ2V0TWVkaWFTb3VyY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNvdXJjZUJ1ZmZlciA9IHdpbmRvdy5Tb3VyY2VCdWZmZXIgfHwgd2luZG93LldlYktpdFNvdXJjZUJ1ZmZlcjtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlzVHlwZVN1cHBvcnRlZCA9IG1lZGlhU291cmNlICYmIHR5cGVvZiBtZWRpYVNvdXJjZS5pc1R5cGVTdXBwb3J0ZWQgPT09ICdmdW5jdGlvbicgJiYgbWVkaWFTb3VyY2UuaXNUeXBlU3VwcG9ydGVkKCd2aWRlby9tcDQ7IGNvZGVjcz1cImF2YzEuNDJFMDFFLG1wNGEuNDAuMlwiJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgU291cmNlQnVmZmVyIGlzIGV4cG9zZWQgZW5zdXJlIGl0cyBBUEkgaXMgdmFsaWRcbiAgICAgICAgICAgICAgICAgICAgLy8gc2FmYXJpIGFuZCBvbGQgdmVyc2lvbiBvZiBDaHJvbWUgZG9lIG5vdCBleHBvc2UgU291cmNlQnVmZmVyIGdsb2JhbGx5IHNvIGNoZWNraW5nIFNvdXJjZUJ1ZmZlci5wcm90b3R5cGUgaXMgaW1wb3NzaWJsZVxuICAgICAgICAgICAgICAgICAgICB2YXIgc291cmNlQnVmZmVyVmFsaWRBUEkgPSAhc291cmNlQnVmZmVyIHx8IHNvdXJjZUJ1ZmZlci5wcm90b3R5cGUgJiYgdHlwZW9mIHNvdXJjZUJ1ZmZlci5wcm90b3R5cGUuYXBwZW5kQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBzb3VyY2VCdWZmZXIucHJvdG90eXBlLnJlbW92ZSA9PT0gJ2Z1bmN0aW9uJztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEhaXNUeXBlU3VwcG9ydGVkICYmICEhc291cmNlQnVmZmVyVmFsaWRBUEk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvL1JlbW92ZSB0aGlzICchIXZpZGVvLmNhblBsYXlUeXBlKCdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcpJyBpZiB5b3Ugd2FudCB0byB1c2UgaGxzanMuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzSGxzU3VwcG9ydCgpICYmICEhdmlkZW8uY2FuUGxheVR5cGUoJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICBdO1xuXG4gICAgdGhhdC5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UgPSAoc29ydWNlXykgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJTdXBwb3J0Q2hlY2tlciA6IGZpbmRQcm92aWRlck5hbWVCeVNvdXJjZSgpXCIsIHNvcnVjZV8pO1xuICAgICAgICBjb25zdCBzb3VyY2UgPSAoc29ydWNlXyA9PT0gT2JqZWN0KHNvcnVjZV8pKSA/IHNvcnVjZV8gOiB7fTtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHN1cHBvcnRMaXN0Lmxlbmd0aDsgaSArKyl7XG4gICAgICAgICAgICBpZihzdXBwb3J0TGlzdFtpXS5jaGVja1N1cHBvcnQoc291cmNlKSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1cHBvcnRMaXN0W2ldLm5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQuZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0ID0gKHBsYXlsaXN0XykgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJTdXBwb3J0Q2hlY2tlciA6IGZpbmRQcm92aWRlck5hbWVzQnlQbGF5bGlzdCgpXCIsIHBsYXlsaXN0Xyk7XG4gICAgICAgIGxldCBzdXBwb3J0TmFtZXMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IHBsYXlsaXN0Xy5sZW5ndGg7IGktLTspIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBwbGF5bGlzdF9baV07XG4gICAgICAgICAgICBsZXQgc291cmNlID0gXCJcIjtcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBpdGVtLnNvdXJjZXMubGVuZ3RoOyBqICsrKXtcbiAgICAgICAgICAgICAgICBzb3VyY2UgPSBpdGVtLnNvdXJjZXNbal07XG4gICAgICAgICAgICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdXBwb3J0ZWQgPSB0aGF0LmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShzb3VyY2UpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3VwcG9ydGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdXBwb3J0TmFtZXMucHVzaChzdXBwb3J0ZWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdXBwb3J0TmFtZXM7XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFN1cHBvcnRDaGVja2VyOyIsIi8vIFNUQVRFXG5leHBvcnQgY29uc3QgU1RBVEVfQlVGRkVSSU5HID0gJ2J1ZmZlcmluZyc7XG5leHBvcnQgY29uc3QgU1RBVEVfSURMRSA9ICdpZGxlJztcbmV4cG9ydCBjb25zdCBTVEFURV9DT01QTEVURSA9ICdjb21wbGV0ZSc7XG5leHBvcnQgY29uc3QgU1RBVEVfUEFVU0VEID0gJ3BhdXNlZCc7XG5leHBvcnQgY29uc3QgU1RBVEVfUExBWUlORyA9ICdwbGF5aW5nJztcbmV4cG9ydCBjb25zdCBTVEFURV9FUlJPUiA9ICdlcnJvcic7XG5leHBvcnQgY29uc3QgU1RBVEVfTE9BRElORyA9ICdsb2FkaW5nJztcbmV4cG9ydCBjb25zdCBTVEFURV9TVEFMTEVEID0gJ3N0YWxsZWQnO1xuXG4vLyBQUk9WSURFUlxuZXhwb3J0IGNvbnN0IFBST1ZJREVSX0hUTUw1ID0gJ2h0bWw1JztcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9XRUJSVEMgPSAnd2VicnRjJztcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9EQVNIID0gJ2Rhc2gnO1xuZXhwb3J0IGNvbnN0IFBST1ZJREVSX0hMUyA9ICdobHMnO1xuXG4vLyBFVkVOVFNcbmV4cG9ydCBjb25zdCBDT05URU5UX0NPTVBMRVRFID0gU1RBVEVfQ09NUExFVEU7XG5leHBvcnQgY29uc3QgUkVBRFkgPSAncmVhZHknO1xuZXhwb3J0IGNvbnN0IERFU1RST1kgPSAnZGVzdHJveSc7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9TRUVLID0gJ3NlZWsnO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfQlVGRkVSX0ZVTEwgPSAnYnVmZmVyRnVsbCc7XG5leHBvcnQgY29uc3QgRElTUExBWV9DTElDSyA9ICdkaXNwbGF5Q2xpY2snO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfTE9BREVEID0gJ2xvYWRlZCc7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9TRUVLRUQgPSAnc2Vla2VkJztcbmV4cG9ydCBjb25zdCBORVRXT1JLX1VOU1RBQkxFRCA9ICd1bnN0YWJsZU5ldHdvcmsnO1xuZXhwb3J0IGNvbnN0IEVSUk9SID0gJ2Vycm9yJztcblxuLy8gU1RBVEUgT0YgUExBWUVSXG5leHBvcnQgY29uc3QgUExBWUVSX1NUQVRFID0gJ3N0YXRlQ2hhbmdlZCc7XG5leHBvcnQgY29uc3QgUExBWUVSX0NPTVBMRVRFID0gU1RBVEVfQ09NUExFVEU7XG5leHBvcnQgY29uc3QgUExBWUVSX1BBVVNFID0gJ3BhdXNlJztcbmV4cG9ydCBjb25zdCBQTEFZRVJfUExBWSA9ICdwbGF5JztcblxuZXhwb3J0IGNvbnN0IENPTlRFTlRfQlVGRkVSID0gJ2J1ZmZlckNoYW5nZWQnO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfVElNRSA9ICd0aW1lJztcbmV4cG9ydCBjb25zdCBDT05URU5UX1JBVEVfQ0hBTkdFID0gJ3JhdGVjaGFuZ2UnO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfVk9MVU1FID0gJ3ZvbHVtZUNoYW5nZWQnO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfTVVURSA9ICdtdXRlJztcbmV4cG9ydCBjb25zdCBDT05URU5UX01FVEEgPSAnbWV0YUNoYW5nZWQnO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfTEVWRUxTID0gJ3F1YWxpdHlMZXZlbENoYW5nZWQnO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfTEVWRUxfQ0hBTkdFRCA9ICdjdXJyZW50UXVhbGl0eUxldmVsQ2hhbmdlZCc7XG5leHBvcnQgY29uc3QgUExBWUJBQ0tfUkFURV9DSEFOR0VEID0gJ3BsYXliYWNrUmF0ZUNoYW5nZWQnO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfQ0FQVElPTl9DVUVfQ0hBTkdFRCA9ICdjdWVDaGFuZ2VkJztcbmV4cG9ydCBjb25zdCBDT05URU5UX0NBUFRJT05fQ0hBTkdFRCA9ICdjYXB0aW9uQ2hhbmdlZCc7XG5cblxuZXhwb3J0IGNvbnN0IElOSVRfRVJST1IgPSAxMDA7XG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fRVJST1IgPSAzMDA7XG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SID0gMzAxO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IgPSAzMDI7XG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SID0gMzAzO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9GSUxFX0VSUk9SID0gMzA0O1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9DQVBUSU9OX0VSUk9SID0gMzA1O1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfV1NfRVJST1IgPSA1MDE7XG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19XU19DTE9TRUQgPSA1MDI7XG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SID0gNTAzO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SID0gNTA0O1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUiA9IDUwNTtcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SID0gNTA2O1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfTkVUV09SS19TTE9XID0gNTEwO1xuIiwiLyoqXG4gKiBAYnJpZWYgICDrr7jrlJTslrQg7JeY66as66i87Yq466W8IOq0gOumrO2VmOuKlCDqsJ3ssrQuIO2YhOyerOuKlCDtlZjripQg7J287J20IOunjuyngCDslYrri6QuXG4gKiBAcGFyYW0gICB7ZWxlbWVudH0gICBjb250YWluZXIgICBkb20gZWxlbWVudFxuICpcbiAqICovXG5cbmNvbnN0IE1hbmFnZXIgPSBmdW5jdGlvbihjb250YWluZXIpe1xuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICBsZXQgbWVkaWFFbGVtZW50ID0gXCJcIjtcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJNZWRpYU1hbmFnZXIgbG9hZGVkLlwiKTtcbiAgICBjb25zdCBjcmVhdGVNZWRpYUVsZW1lbnQgPSBmdW5jdGlvbigpe1xuXG4gICAgICAgIG1lZGlhRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG4gICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVSZW1vdGVQbGF5YmFjaycsICcnKTtcbiAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnd2Via2l0LXBsYXlzaW5saW5lJywgJycpO1xuICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCdwbGF5c2lubGluZScsICcnKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG1lZGlhRWxlbWVudCk7XG5cbiAgICAgICAgcmV0dXJuIG1lZGlhRWxlbWVudDtcbiAgICB9O1xuXG4gICAgdGhhdC5jcmVhdGVFbGVtZW50ID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIk1lZGlhTWFuYWdlciBjcmVhdGVFbGVtZW50KClcIik7XG4gICAgICAgIGlmKCFtZWRpYUVsZW1lbnQpe1xuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZU1lZGlhRWxlbWVudCgpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGNvbnRhaW5lci5yZW1vdmVDaGlsZChtZWRpYUVsZW1lbnQpO1xuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZU1lZGlhRWxlbWVudCgpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTWFuYWdlcjsiLCJpbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xuaW1wb3J0IHtpc1J0bXAsIGlzV2ViUlRDLCBpc0Rhc2ggfSBmcm9tIFwidXRpbHMvdmFsaWRhdG9yXCI7XG5pbXBvcnQge2V4dHJhY3RFeHRlbnNpb24gLHRyaW19IGZyb20gXCIuLi8uLi91dGlscy9zdHJpbmdzXCI7XG5pbXBvcnQgU3VwcG9ydENoZWNrZXIgZnJvbSBcIi4uL1N1cHBvcnRDaGVja2VyXCI7XG5cbi8qKlxuICogQGJyaWVmICAgVGhpcyBtYW5hZ2VzIFBsYXlsaXN0IG9yIFNvdXJjZXMuXG4gKiBAcGFyYW1cbiAqXG4gKiAqL1xuY29uc3QgTWFuYWdlciA9IGZ1bmN0aW9uKCl7XG4gICAgY29uc3QgdGhhdCA9IHt9O1xuICAgIGxldCBjdXJyZW50UGxheWxpc3QgPSBbXTtcbiAgICBsZXQgc3VwcG9ydENoZWNrZXIgPSBTdXBwb3J0Q2hlY2tlcigpO1xuXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIGxvYWRlZC5cIik7XG5cbiAgICBjb25zdCBtYWtlUHJldHR5U291cmNlID0gZnVuY3Rpb24oc291cmNlXyl7XG4gICAgICAgIGlmICghc291cmNlXyB8fCAhc291cmNlXy5maWxlICYmICEoc291cmNlXy5ob3N0IHx8IHNvdXJjZV8uYXBwbGljYXRpb24gfHwgc291cmNlXy5zdHJlYW0pKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc291cmNlID0gT2JqZWN0LmFzc2lnbih7fSwgeyAnZGVmYXVsdCc6IGZhbHNlIH0sIHNvdXJjZV8pO1xuICAgICAgICBzb3VyY2UuZmlsZSA9IHRyaW0oJycgKyBzb3VyY2UuZmlsZSk7XG5cbiAgICAgICAgaWYoc291cmNlLmhvc3QgJiYgc291cmNlLmFwcGxpY2F0aW9uICYmIHNvdXJjZS5zdHJlYW0pe1xuICAgICAgICAgICAgc291cmNlLmZpbGUgPSBzb3VyY2UuaG9zdCArIFwiL1wiICsgc291cmNlLmFwcGxpY2F0aW9uICsgXCIvc3RyZWFtL1wiICsgc291cmNlLnN0cmVhbTtcbiAgICAgICAgICAgIGRlbGV0ZSBzb3VyY2UuaG9zdDtcbiAgICAgICAgICAgIGRlbGV0ZSBzb3VyY2UuYXBwbGljYXRpb247XG4gICAgICAgICAgICBkZWxldGUgc291cmNlLnN0cmVhbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1pbWV0eXBlUmVnRXggPSAvXlteL10rXFwvKD86eC0pPyhbXi9dKykkLztcblxuICAgICAgICBpZiAobWltZXR5cGVSZWdFeC50ZXN0KHNvdXJjZS50eXBlKSkge1xuICAgICAgICAgICAgLy8gaWYgdHlwZSBpcyBnaXZlbiBhcyBhIG1pbWV0eXBlXG4gICAgICAgICAgICBzb3VyY2UubWltZVR5cGUgPSBzb3VyY2UudHlwZTtcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gc291cmNlLnR5cGUucmVwbGFjZShtaW1ldHlwZVJlZ0V4LCAnJDEnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGlzUnRtcChzb3VyY2UuZmlsZSkpe1xuICAgICAgICAgICAgc291cmNlLnR5cGUgPSAncnRtcCc7XG4gICAgICAgIH1lbHNlIGlmKGlzV2ViUlRDKHNvdXJjZS5maWxlKSl7XG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9ICd3ZWJydGMnO1xuICAgICAgICB9ZWxzZSBpZihpc0Rhc2goc291cmNlLmZpbGUsIHNvdXJjZS50eXBlKSl7XG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdkYXNoJztcbiAgICAgICAgfWVsc2UgaWYgKCFzb3VyY2UudHlwZSkge1xuICAgICAgICAgICAgc291cmNlLnR5cGUgPSBleHRyYWN0RXh0ZW5zaW9uKHNvdXJjZS5maWxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc291cmNlLnR5cGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG5vcm1hbGl6ZSB0eXBlc1xuICAgICAgICBzd2l0Y2ggKHNvdXJjZS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdtM3U4JzpcbiAgICAgICAgICAgIGNhc2UgJ3ZuZC5hcHBsZS5tcGVndXJsJzpcbiAgICAgICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdobHMnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbTRhJzpcbiAgICAgICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdhYWMnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnc21pbCc6XG4gICAgICAgICAgICAgICAgc291cmNlLnR5cGUgPSAncnRtcCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgIGlmIChzb3VyY2Vba2V5XSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgc291cmNlW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzb3VyY2U7XG5cbiAgICB9XG5cbiAgICB0aGF0LnNldFBsYXlsaXN0ID0ocGxheWxpc3QpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQbGF5bGlzdE1hbmFnZXIgc2V0UGxheWxpc3QoKSBcIiwgcGxheWxpc3QpO1xuICAgICAgICBjb25zdCBwcmV0dGllZFBsYXlsaXN0ID0gKF8uaXNBcnJheShwbGF5bGlzdCkgPyBwbGF5bGlzdCA6IFtwbGF5bGlzdF0pLm1hcChmdW5jdGlvbihpdGVtKXtcbiAgICAgICAgICAgIGlmKCFfLmlzQXJyYXkoaXRlbS50cmFja3MpKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGl0ZW0udHJhY2tzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHBsYXlsaXN0SXRlbSA9IE9iamVjdC5hc3NpZ24oe30se1xuICAgICAgICAgICAgICAgIHNvdXJjZXM6IFtdLFxuICAgICAgICAgICAgICAgIHRyYWNrczogW11cbiAgICAgICAgICAgIH0sIGl0ZW0gKTtcblxuICAgICAgICAgICAgaWYoKHBsYXlsaXN0SXRlbS5zb3VyY2VzID09PSBPYmplY3QocGxheWxpc3RJdGVtLnNvdXJjZXMpKSAmJiAhXy5pc0FycmF5KHBsYXlsaXN0SXRlbS5zb3VyY2VzKSkge1xuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gW21ha2VQcmV0dHlTb3VyY2UocGxheWxpc3RJdGVtLnNvdXJjZXMpXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoIV8uaXNBcnJheShwbGF5bGlzdEl0ZW0uc291cmNlcykgfHwgcGxheWxpc3RJdGVtLnNvdXJjZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ubGV2ZWxzKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gaXRlbS5sZXZlbHM7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBbbWFrZVByZXR0eVNvdXJjZShpdGVtKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBwbGF5bGlzdEl0ZW0uc291cmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBzb3VyY2UgPSBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgcHJldHR5U291cmNlID0gXCJcIjtcbiAgICAgICAgICAgICAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgZGVmYXVsdFNvdXJjZSA9IHNvdXJjZS5kZWZhdWx0O1xuICAgICAgICAgICAgICAgIGlmIChkZWZhdWx0U291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZS5kZWZhdWx0ID0gKGRlZmF1bHRTb3VyY2UudG9TdHJpbmcoKSA9PT0gJ3RydWUnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2UuZGVmYXVsdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBzb3VyY2UgZG9lc24ndCBoYXZlIGEgbGFiZWwsIG51bWJlciBpdFxuICAgICAgICAgICAgICAgIGlmICghcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0ubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0ubGFiZWwgPSBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXS50eXBlK1wiLVwiK2kudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBwcmV0dHlTb3VyY2UgPSBtYWtlUHJldHR5U291cmNlKHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldKTtcbiAgICAgICAgICAgICAgICBpZihzdXBwb3J0Q2hlY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UocHJldHR5U291cmNlKSl7XG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldID0gcHJldHR5U291cmNlO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXSA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IHBsYXlsaXN0SXRlbS5zb3VyY2VzLmZpbHRlcihzb3VyY2UgPT4gISFzb3VyY2UpO1xuXG4gICAgICAgICAgICAvLyBkZWZhdWx0IOqwgCDsl4bsnYTrlYwgd2VicnRj6rCAIOyeiOuLpOuptCB3ZWJydGMgZGVmYXVsdCA6IHRydWXroZwg7J6Q64+ZIOyEpOyglVxuICAgICAgICAgICAgLypsZXQgaGF2ZURlZmF1bHQgPSBfLmZpbmQocGxheWxpc3RJdGVtLnNvdXJjZXMsIGZ1bmN0aW9uKHNvdXJjZSl7cmV0dXJuIHNvdXJjZS5kZWZhdWx0ID09IHRydWU7fSk7XG4gICAgICAgICAgICBsZXQgd2VicnRjU291cmNlID0gW107XG4gICAgICAgICAgICBpZighaGF2ZURlZmF1bHQpe1xuICAgICAgICAgICAgICAgIHdlYnJ0Y1NvdXJjZSA9IF8uZmluZChwbGF5bGlzdEl0ZW0uc291cmNlcywgZnVuY3Rpb24oc291cmNlKXtyZXR1cm4gc291cmNlLnR5cGUgPT0gXCJ3ZWJydGNcIjt9KTtcbiAgICAgICAgICAgICAgICBpZih3ZWJydGNTb3VyY2Upe1xuICAgICAgICAgICAgICAgICAgICB3ZWJydGNTb3VyY2UuZGVmYXVsdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSovXG5cblxuXG4gICAgICAgICAgICBpZighXy5pc0FycmF5KHBsYXlsaXN0SXRlbS50cmFja3MpKXtcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0udHJhY2tzID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihfLmlzQXJyYXkocGxheWxpc3RJdGVtLmNhcHRpb25zKSl7XG4gICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnRyYWNrcyA9IHBsYXlsaXN0SXRlbS50cmFja3MuY29uY2F0KHBsYXlsaXN0SXRlbS5jYXB0aW9ucyk7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHBsYXlsaXN0SXRlbS5jYXB0aW9ucztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcGxheWxpc3RJdGVtLnRyYWNrcyA9IHBsYXlsaXN0SXRlbS50cmFja3MubWFwKGZ1bmN0aW9uKHRyYWNrKXtcbiAgICAgICAgICAgICAgICBpZighdHJhY2sgfHwgIXRyYWNrLmZpbGUpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB7XG4gICAgICAgICAgICAgICAgICAgICdraW5kJzogJ2NhcHRpb25zJyxcbiAgICAgICAgICAgICAgICAgICAgJ2RlZmF1bHQnOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sIHRyYWNrKTtcbiAgICAgICAgICAgIH0pLmZpbHRlcih0cmFjayA9PiAhIXRyYWNrKTtcblxuICAgICAgICAgICAgcmV0dXJuIHBsYXlsaXN0SXRlbTtcbiAgICAgICAgfSk7XG4gICAgICAgIGN1cnJlbnRQbGF5bGlzdCA9IHByZXR0aWVkUGxheWxpc3Q7XG4gICAgICAgIHJldHVybiBwcmV0dGllZFBsYXlsaXN0O1xuICAgIH07XG4gICAgdGhhdC5nZXRQbGF5bGlzdCA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIGdldFBsYXlsaXN0KCkgXCIsIGN1cnJlbnRQbGF5bGlzdCk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UGxheWxpc3Q7XG4gICAgfTtcbiAgICB0aGF0LmdldEN1cnJlbnRTb3VyY2VzID0gKCkgPT4ge1xuICAgICAgICAvL1dlIGRvIG5vdCBzdXBwb3J0IFwiUExBWUxJU1RcIiBub3QgeWV0LiBTbyB0aGlzIHJldHVybnMgcGxheWxpc3Qgb2YgMC5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIGdldEN1cnJlbnRTb3VyY2VzKCkgXCIsIGN1cnJlbnRQbGF5bGlzdFswXS5zb3VyY2VzKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQbGF5bGlzdFswXS5zb3VyY2VzO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgTWFuYWdlcjtcbiIsImltcG9ydCBTdXBwb3J0Q2hlY2tlciBmcm9tIFwiYXBpL1N1cHBvcnRDaGVja2VyXCI7XG5pbXBvcnQgUHJvbWlzZSwge3Jlc29sdmVkfSBmcm9tIFwiYXBpL3NoaW1zL3Byb21pc2VcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBUaGlzIG1hbmFnZXMgcHJvdmlkZXIuXG4gKiBAcGFyYW1cbiAqICovXG5jb25zdCBDb250cm9sbGVyID0gZnVuY3Rpb24oKXtcbiAgICBsZXQgc3VwcG9ydENoYWNrZXIgPSBTdXBwb3J0Q2hlY2tlcigpO1xuICAgIGNvbnN0IFByb3ZpZGVycyA9IHt9O1xuXG4gICAgY29uc3QgdGhhdCA9IHt9O1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBsb2FkZWQuXCIpO1xuXG4gICAgY29uc3QgcmVnaXN0ZVByb3ZpZGVyID0gKG5hbWUsIHByb3ZpZGVyKSA9PntcbiAgICAgICAgaWYoUHJvdmlkZXJzW25hbWVdKXtcbiAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgIH1cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIF9yZWdpc3RlclByb3ZpZGVyKCkgXCIsIG5hbWUpO1xuICAgICAgICBQcm92aWRlcnNbbmFtZV0gPSBwcm92aWRlcjtcbiAgICB9O1xuXG4gICAgY29uc3QgUHJvdmlkZXJMb2FkZXIgPXtcbiAgICAgICAgaHRtbDU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2h0bWw1L0h0bWw1J10sIGZ1bmN0aW9uKHJlcXVpcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvaHRtbDUvSHRtbDUnKS5kZWZhdWx0O1xuICAgICAgICAgICAgICAgICAgICByZWdpc3RlUHJvdmlkZXIoXCJodG1sNVwiLCBwcm92aWRlcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm92aWRlcjtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcbiAgICAgICAgICAgICAgICB9LCdvdmVucGxheWVyLnByb3ZpZGVyLmh0bWw1J1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgd2VicnRjIDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci93ZWJydGMvV2ViUlRDJ10sIGZ1bmN0aW9uKHJlcXVpcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvd2VicnRjL1dlYlJUQycpLmRlZmF1bHQ7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVQcm92aWRlcihcIndlYnJ0Y1wiLCBwcm92aWRlcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm92aWRlcjtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcbiAgICAgICAgICAgICAgICB9LCdvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgZGFzaCA6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvZGFzaC9EYXNoJ10sIGZ1bmN0aW9uKHJlcXVpcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvZGFzaC9EYXNoJykuZGVmYXVsdDtcbiAgICAgICAgICAgICAgICAgICAgUHJvdmlkZXJzW1wiZGFzaFwiXSA9IHByb3ZpZGVyO1xuICAgICAgICAgICAgICAgICAgICByZWdpc3RlUHJvdmlkZXIoXCJkYXNoXCIsIHByb3ZpZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyO1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xuICAgICAgICAgICAgICAgIH0sJ292ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgaGxzIDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci9obHMvSGxzJ10sIGZ1bmN0aW9uKHJlcXVpcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvaGxzL0hscycpLmRlZmF1bHQ7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVQcm92aWRlcihcImhsc1wiLCBwcm92aWRlcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm92aWRlcjtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcbiAgICAgICAgICAgICAgICB9LCdvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhhdC5sb2FkUHJvdmlkZXJzID0gKHBsYXlsaXN0KSA9PntcbiAgICAgICAgY29uc3Qgc3VwcG9ydGVkUHJvdmlkZXJOYW1lcyA9IHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVzQnlQbGF5bGlzdChwbGF5bGlzdCk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBsb2FkUHJvdmlkZXJzKCkgXCIsIHN1cHBvcnRlZFByb3ZpZGVyTmFtZXMpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoXG4gICAgICAgICAgICBzdXBwb3J0ZWRQcm92aWRlck5hbWVzLmZpbHRlcihmdW5jdGlvbihwcm92aWRlck5hbWUpe1xuICAgICAgICAgICAgICAgIHJldHVybiAhIVByb3ZpZGVyTG9hZGVyW3Byb3ZpZGVyTmFtZV07XG4gICAgICAgICAgICB9KS5tYXAoZnVuY3Rpb24ocHJvdmlkZXJOYW1lKXtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IFByb3ZpZGVyTG9hZGVyW3Byb3ZpZGVyTmFtZV0oKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvdmlkZXI7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH07XG5cbiAgICB0aGF0LmZpbmRCeU5hbWUgPSAobmFtZSkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgZmluZEJ5TmFtZSgpIFwiLCBuYW1lKTtcbiAgICAgICAgcmV0dXJuIFByb3ZpZGVyc1tuYW1lXTtcbiAgICB9O1xuXG4gICAgdGhhdC5nZXRQcm92aWRlckJ5U291cmNlID0gKHNvdXJjZSkgPT4ge1xuICAgICAgICBjb25zdCBzdXBwb3J0ZWRQcm92aWRlck5hbWUgPSBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2Uoc291cmNlKTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGdldFByb3ZpZGVyQnlTb3VyY2UoKSBcIiwgc3VwcG9ydGVkUHJvdmlkZXJOYW1lKTtcbiAgICAgICAgcmV0dXJuIHRoYXQuZmluZEJ5TmFtZShzdXBwb3J0ZWRQcm92aWRlck5hbWUpO1xuICAgIH07XG5cbiAgICB0aGF0LmlzU2FtZVByb3ZpZGVyID0gKGN1cnJlbnRTb3VyY2UsIG5ld1NvdXJjZSkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgaXNTYW1lUHJvdmlkZXIoKSBcIiwgc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKGN1cnJlbnRTb3VyY2UpICwgc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKG5ld1NvdXJjZSkgKTtcbiAgICAgICAgcmV0dXJuIHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShjdXJyZW50U291cmNlKSA9PSBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UobmV3U291cmNlKTtcblxuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbnRyb2xsZXI7XG4iLCIvLyAgICAgIFByb21pc2UgUG9seWZpbGxcbi8vICAgICAgaHR0cHM6Ly9naXRodWIuY29tL3RheWxvcmhha2VzL3Byb21pc2UtcG9seWZpbGxcbi8vICAgICAgQ29weXJpZ2h0IChjKSAyMDE0IFRheWxvciBIYWtlc1xuLy8gICAgICBDb3B5cmlnaHQgKGMpIDIwMTQgRm9yYmVzIExpbmRlc2F5XG4vLyAgICAgIHRheWxvcmhha2VzL3Byb21pc2UtcG9seWZpbGwgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXG5cbmNvbnN0IHByb21pc2VGaW5hbGx5ID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICB2YXIgY29uc3RydWN0b3IgPSB0aGlzLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiB0aGlzLnRoZW4oXG4gICAgICAgIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gY29uc3RydWN0b3IucmVzb2x2ZShjYWxsYmFjaygpKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAgICAgICAgIHJldHVybiBjb25zdHJ1Y3Rvci5yZXNvbHZlKGNhbGxiYWNrKCkpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnN0cnVjdG9yLnJlamVjdChyZWFzb24pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICApO1xufTtcblxuLy8gU3RvcmUgc2V0VGltZW91dCByZWZlcmVuY2Ugc28gcHJvbWlzZS1wb2x5ZmlsbCB3aWxsIGJlIHVuYWZmZWN0ZWQgYnlcbi8vIG90aGVyIGNvZGUgbW9kaWZ5aW5nIHNldFRpbWVvdXQgKGxpa2Ugc2lub24udXNlRmFrZVRpbWVycygpKVxuY29uc3Qgc2V0VGltZW91dEZ1bmMgPSB3aW5kb3cuc2V0VGltZW91dDtcbmNvbnN0IHNldEltbWVkaWF0ZUZ1bmMgPSB3aW5kb3cuc2V0SW1tZWRpYXRlO1xuXG5mdW5jdGlvbiBub29wKCkge31cblxuLy8gUG9seWZpbGwgZm9yIEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kXG5mdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBmbi5hcHBseSh0aGlzQXJnLCBhcmd1bWVudHMpO1xuICAgIH07XG59XG5cbmNvbnN0IFByb21pc2VTaGltID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFByb21pc2UpKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdQcm9taXNlcyBtdXN0IGJlIGNvbnN0cnVjdGVkIHZpYSBuZXcnKTtcbiAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdub3QgYSBmdW5jdGlvbicpO1xuICAgIHRoaXMuX3N0YXRlID0gMDtcbiAgICB0aGlzLl9oYW5kbGVkID0gZmFsc2U7XG4gICAgdGhpcy5fdmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fZGVmZXJyZWRzID0gW107XG5cbiAgICBkb1Jlc29sdmUoZm4sIHRoaXMpO1xufVxuXG5jb25zdCBoYW5kbGUgPSBmdW5jdGlvbiAoc2VsZiwgZGVmZXJyZWQpIHtcbiAgICB3aGlsZSAoc2VsZi5fc3RhdGUgPT09IDMpIHtcbiAgICAgICAgc2VsZiA9IHNlbGYuX3ZhbHVlO1xuICAgIH1cbiAgICBpZiAoc2VsZi5fc3RhdGUgPT09IDApIHtcbiAgICAgICAgc2VsZi5fZGVmZXJyZWRzLnB1c2goZGVmZXJyZWQpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHNlbGYuX2hhbmRsZWQgPSB0cnVlO1xuICAgIFByb21pc2UuX2ltbWVkaWF0ZUZuKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY2IgPSBzZWxmLl9zdGF0ZSA9PT0gMSA/IGRlZmVycmVkLm9uRnVsZmlsbGVkIDogZGVmZXJyZWQub25SZWplY3RlZDtcbiAgICAgICAgaWYgKGNiID09PSBudWxsKSB7XG4gICAgICAgICAgICAoc2VsZi5fc3RhdGUgPT09IDEgPyByZXNvbHZlIDogcmVqZWN0KShkZWZlcnJlZC5wcm9taXNlLCBzZWxmLl92YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJldDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldCA9IGNiKHNlbGYuX3ZhbHVlKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmVqZWN0KGRlZmVycmVkLnByb21pc2UsIGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUoZGVmZXJyZWQucHJvbWlzZSwgcmV0KTtcbiAgICB9KTtcbn1cblxuY29uc3QgcmVzb2x2ZSA9IGZ1bmN0aW9uIChzZWxmLCBuZXdWYWx1ZSkge1xuICAgIHRyeSB7XG4gICAgICAgIC8vIFByb21pc2UgUmVzb2x1dGlvbiBQcm9jZWR1cmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9wcm9taXNlcy1hcGx1cy9wcm9taXNlcy1zcGVjI3RoZS1wcm9taXNlLXJlc29sdXRpb24tcHJvY2VkdXJlXG4gICAgICAgIGlmIChuZXdWYWx1ZSA9PT0gc2VsZilcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0EgcHJvbWlzZSBjYW5ub3QgYmUgcmVzb2x2ZWQgd2l0aCBpdHNlbGYuJyk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIG5ld1ZhbHVlICYmXG4gICAgICAgICAgICAodHlwZW9mIG5ld1ZhbHVlID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgbmV3VmFsdWUgPT09ICdmdW5jdGlvbicpXG4gICAgICAgICkge1xuICAgICAgICAgICAgdmFyIHRoZW4gPSBuZXdWYWx1ZS50aGVuO1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgIHNlbGYuX3N0YXRlID0gMztcbiAgICAgICAgICAgICAgICBzZWxmLl92YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgICAgIGZpbmFsZShzZWxmKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgZG9SZXNvbHZlKGJpbmQodGhlbiwgbmV3VmFsdWUpLCBzZWxmKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5fc3RhdGUgPSAxO1xuICAgICAgICBzZWxmLl92YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICBmaW5hbGUoc2VsZik7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZWplY3Qoc2VsZiwgZSk7XG4gICAgfVxufVxuXG5jb25zdCByZWplY3QgPWZ1bmN0aW9uIChzZWxmLCBuZXdWYWx1ZSkge1xuICAgIHNlbGYuX3N0YXRlID0gMjtcbiAgICBzZWxmLl92YWx1ZSA9IG5ld1ZhbHVlO1xuICAgIGZpbmFsZShzZWxmKTtcbn1cblxuY29uc3QgZmluYWxlID0gZnVuY3Rpb24gKHNlbGYpIHtcbiAgICBpZiAoc2VsZi5fc3RhdGUgPT09IDIgJiYgc2VsZi5fZGVmZXJyZWRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBQcm9taXNlLl9pbW1lZGlhdGVGbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghc2VsZi5faGFuZGxlZCkge1xuICAgICAgICAgICAgICAgIFByb21pc2UuX3VuaGFuZGxlZFJlamVjdGlvbkZuKHNlbGYuX3ZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHNlbGYuX2RlZmVycmVkcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBoYW5kbGUoc2VsZiwgc2VsZi5fZGVmZXJyZWRzW2ldKTtcbiAgICB9XG4gICAgc2VsZi5fZGVmZXJyZWRzID0gbnVsbDtcbn1cblxuY29uc3QgSGFuZGxlciA9IGZ1bmN0aW9uIChvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCwgcHJvbWlzZSkge1xuICAgIHRoaXMub25GdWxmaWxsZWQgPSB0eXBlb2Ygb25GdWxmaWxsZWQgPT09ICdmdW5jdGlvbicgPyBvbkZ1bGZpbGxlZCA6IG51bGw7XG4gICAgdGhpcy5vblJlamVjdGVkID0gdHlwZW9mIG9uUmVqZWN0ZWQgPT09ICdmdW5jdGlvbicgPyBvblJlamVjdGVkIDogbnVsbDtcbiAgICB0aGlzLnByb21pc2UgPSBwcm9taXNlO1xufVxuXG4vKipcbiAqIFRha2UgYSBwb3RlbnRpYWxseSBtaXNiZWhhdmluZyByZXNvbHZlciBmdW5jdGlvbiBhbmQgbWFrZSBzdXJlXG4gKiBvbkZ1bGZpbGxlZCBhbmQgb25SZWplY3RlZCBhcmUgb25seSBjYWxsZWQgb25jZS5cbiAqXG4gKiBNYWtlcyBubyBndWFyYW50ZWVzIGFib3V0IGFzeW5jaHJvbnkuXG4gKi9cbmNvbnN0IGRvUmVzb2x2ZSA9IGZ1bmN0aW9uIChmbiwgc2VsZikge1xuICAgIHZhciBkb25lID0gZmFsc2U7XG4gICAgdHJ5IHtcbiAgICAgICAgZm4oXG4gICAgICAgICAgICBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChkb25lKSByZXR1cm47XG4gICAgICAgICAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShzZWxmLCB2YWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRvbmUpIHJldHVybjtcbiAgICAgICAgICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZWplY3Qoc2VsZiwgcmVhc29uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9IGNhdGNoIChleCkge1xuICAgICAgICBpZiAoZG9uZSkgcmV0dXJuO1xuICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgcmVqZWN0KHNlbGYsIGV4KTtcbiAgICB9XG59XG5cblByb21pc2VTaGltLnByb3RvdHlwZVsnY2F0Y2gnXSA9IGZ1bmN0aW9uKG9uUmVqZWN0ZWQpIHtcbiAgICByZXR1cm4gdGhpcy50aGVuKG51bGwsIG9uUmVqZWN0ZWQpO1xufTtcblxuUHJvbWlzZVNoaW0ucHJvdG90eXBlLnRoZW4gPSBmdW5jdGlvbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuICAgIHZhciBwcm9tID0gbmV3IHRoaXMuY29uc3RydWN0b3Iobm9vcCk7XG5cbiAgICBoYW5kbGUodGhpcywgbmV3IEhhbmRsZXIob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQsIHByb20pKTtcbiAgICByZXR1cm4gcHJvbTtcbn07XG5cblByb21pc2VTaGltLnByb3RvdHlwZVsnZmluYWxseSddID0gcHJvbWlzZUZpbmFsbHk7XG5cblByb21pc2VTaGltLmFsbCA9IGZ1bmN0aW9uKGFycikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgaWYgKCFhcnIgfHwgdHlwZW9mIGFyci5sZW5ndGggPT09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUHJvbWlzZS5hbGwgYWNjZXB0cyBhbiBhcnJheScpO1xuICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFycik7XG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHJlc29sdmUoW10pO1xuICAgICAgICB2YXIgcmVtYWluaW5nID0gYXJncy5sZW5ndGg7XG5cbiAgICAgICAgZnVuY3Rpb24gcmVzKGksIHZhbCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAodmFsICYmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGhlbiA9IHZhbC50aGVuO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoZW4uY2FsbChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24odmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcyhpLCB2YWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFyZ3NbaV0gPSB2YWw7XG4gICAgICAgICAgICAgICAgaWYgKC0tcmVtYWluaW5nID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoYXJncyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICByZXMoaSwgYXJnc1tpXSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cblByb21pc2VTaGltLnJlc29sdmUgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlLmNvbnN0cnVjdG9yID09PSBQcm9taXNlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICB9KTtcbn07XG5cblByb21pc2VTaGltLnJlamVjdCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICByZWplY3QodmFsdWUpO1xuICAgIH0pO1xufTtcblxuUHJvbWlzZVNoaW0ucmFjZSA9IGZ1bmN0aW9uKHZhbHVlcykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHZhbHVlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgdmFsdWVzW2ldLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuLy8gVXNlIHBvbHlmaWxsIGZvciBzZXRJbW1lZGlhdGUgZm9yIHBlcmZvcm1hbmNlIGdhaW5zXG5Qcm9taXNlU2hpbS5faW1tZWRpYXRlRm4gPVxuICAgICh0eXBlb2Ygc2V0SW1tZWRpYXRlRnVuYyA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgIGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgIHNldEltbWVkaWF0ZUZ1bmMoZm4pO1xuICAgIH0pIHx8XG4gICAgZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgc2V0SW1tZWRpYXRlRnVuYyhmbiwgMCk7XG4gICAgfTtcblxuUHJvbWlzZVNoaW0uX3VuaGFuZGxlZFJlamVjdGlvbkZuID0gZnVuY3Rpb24gX3VuaGFuZGxlZFJlamVjdGlvbkZuKGVycikge1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgY29uc29sZSkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ1Bvc3NpYmxlIFVuaGFuZGxlZCBQcm9taXNlIFJlamVjdGlvbjonLCBlcnIpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICB9XG59O1xuXG5jb25zdCBQcm9taXNlID0gd2luZG93LlByb21pc2UgfHwgKHdpbmRvdy5Qcm9taXNlID0gUHJvbWlzZVNoaW0pO1xuXG5leHBvcnQgY29uc3QgcmVzb2x2ZWQgPSBQcm9taXNlLnJlc29sdmUoKTtcblxuZXhwb3J0IGRlZmF1bHQgUHJvbWlzZTsiLCJpbXBvcnQgT3ZlblBsYXllclNESywge2NoZWNrQW5kR2V0Q29udGFpbmVyRWxlbWVudH0gZnJvbSAnLi9vdmVucGxheWVyLnNkaydcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlldy92aWV3JztcbmltcG9ydCB7Z2V0U2NyaXB0UGF0aH0gZnJvbSAndXRpbHMvd2VicGFjayc7XG5cblxuX193ZWJwYWNrX3B1YmxpY19wYXRoX18gPSBnZXRTY3JpcHRQYXRoKCdvdmVucGxheWVyLmpzJyk7XG5cbmNvbnN0IE92ZW5QbGF5ZXIgPSB7fTtcbndpbmRvdy5PdmVuUGxheWVyID0gT3ZlblBsYXllcjtcblxuXG4vKipcbiAqIENvcHkgcHJvcGVydGllcyBmcm9tIE92ZW5QbGF5ZXJTREsgb2JqZWN0IHRvIE92ZW5QbGF5ZXIgb2JqZWN0XG4gKi9cbk9iamVjdC5hc3NpZ24oT3ZlblBsYXllciwgT3ZlblBsYXllclNESyk7XG5cbk92ZW5QbGF5ZXIuY3JlYXRlID0gZnVuY3Rpb24gKGNvbnRhaW5lciwgb3B0aW9ucykge1xuXG4gICAgbGV0IGNvbnRhaW5lckVsZW1lbnQgPSBjaGVja0FuZEdldENvbnRhaW5lckVsZW1lbnQoY29udGFpbmVyKTtcblxuICAgIC8qY29uc3QgdmlldyA9IG5ldyBWaWV3KCk7XG5cbiAgICB2aWV3LmFwcGVuZFBsYXllck1hcmt1cChjb250YWluZXJFbGVtZW50KTtcblxuICAgIGNvbnN0IHBsYXllckluc3RhbmNlID0gT3ZlblBsYXllclNESy5jcmVhdGUodmlldy5nZXRNZWRpYUVsZW1lbnRDb250YWluZXIoKSwgb3B0aW9ucyk7XG5cblxuICAgIHZpZXcuYWRkQ29tcG9uZW50c0FuZEZ1bmN0aW9ucyhwbGF5ZXJJbnN0YW5jZSwgb3B0aW9ucyk7Ki9cblxuXG4gICAgdmFyIHBsYXllciA9IFZpZXcoY29udGFpbmVyRWxlbWVudCk7XG5cblxuICAgIGNvbnN0IHBsYXllckluc3RhbmNlID0gT3ZlblBsYXllclNESy5jcmVhdGUocGxheWVyLmdldE1lZGlhRWxlbWVudENvbnRhaW5lcigpLCBvcHRpb25zKTtcblxuICAgIE9iamVjdC5hc3NpZ24ocGxheWVySW5zdGFuY2UsIHtcbiAgICAgICBnZXRJZCA6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgIHJldHVybiBjb250YWluZXJFbGVtZW50LmlkO1xuICAgICAgIH1cbiAgICB9KTtcblxuICAgIHBsYXllci5zZXRBcGkocGxheWVySW5zdGFuY2UpO1xuXG5cblxuICAgIC8vY29uc29sZS5sb2coY29udGFpbmVyRWxlbWVudCk7XG5cblxuICAgIHJldHVybiBwbGF5ZXJJbnN0YW5jZTtcbn1cblxuIiwiaW1wb3J0IEFQSSBmcm9tICdhcGkvQXBpJztcbmltcG9ydCB7aXNXZWJSVEN9IGZyb20gJ3V0aWxzL3ZhbGlkYXRvcic7XG5pbXBvcnQgXyBmcm9tICd1dGlscy91bmRlcnNjb3JlJztcbmltcG9ydCB7Z2V0U2NyaXB0UGF0aH0gZnJvbSAndXRpbHMvd2VicGFjayc7XG5cblxuX193ZWJwYWNrX3B1YmxpY19wYXRoX18gPSBnZXRTY3JpcHRQYXRoKCdvdmVucGxheWVyLnNkay5qcycpO1xuXG4vKipcbiAqIE1haW4gT3ZlblBsYXllclNESyBvYmplY3RcbiAqL1xuY29uc3QgT3ZlblBsYXllclNESyA9IHdpbmRvdy5PdmVuUGxheWVyU0RLID0ge307XG5cbmNvbnN0IHZlcnNpb24gPSAnMC4wLjEnO1xuXG5jb25zdCBwbGF5ZXJMaXN0ID0gT3ZlblBsYXllclNESy5wbGF5ZXJMaXN0ID0gW107XG5cbmV4cG9ydCBjb25zdCBjaGVja0FuZEdldENvbnRhaW5lckVsZW1lbnQgPSBmdW5jdGlvbihjb250YWluZXIpIHtcblxuICAgIGlmICghY29udGFpbmVyKSB7XG5cbiAgICAgICAgLy8gVE9ETyhyb2NrKTogU2hvdWxkIGNhdXNlIGFuIGVycm9yLlxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBsZXQgY29udGFpbmVyRWxlbWVudCA9IG51bGw7XG5cbiAgICBpZiAodHlwZW9mIGNvbnRhaW5lciA9PT0gJ3N0cmluZycpIHtcblxuICAgICAgICBjb250YWluZXJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29udGFpbmVyKTtcbiAgICB9IGVsc2UgaWYgKGNvbnRhaW5lci5ub2RlVHlwZSkge1xuXG4gICAgICAgIGNvbnRhaW5lckVsZW1lbnQgPSBjb250YWluZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVE9ETyhyb2NrKTogU2hvdWxkIGNhdXNlIGFuIGVycm9yLlxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gY29udGFpbmVyRWxlbWVudDtcbn1cblxuLyoqXG4gKiBDcmVhdGUgcGxheWVyIGluc3RhbmNlIGFuZCByZXR1cm4gaXQuXG4gKlxuICogQHBhcmFtICAgICAge3N0cmluZyB8IGRvbSBlbGVtZW50fSBjb250YWluZXIgIElkIG9mIGNvbnRhaW5lciBlbGVtZW50IG9yIGNvbnRhaW5lciBlbGVtZW50XG4gKiBAcGFyYW0gICAgICB7b2JqZWN0fSBvcHRpb25zICBUaGUgb3B0aW9uc1xuICovXG5PdmVuUGxheWVyU0RLLmNyZWF0ZSA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgb3B0aW9ucykge1xuXG4gICAgbGV0IGNvbnRhaW5lckVsZW1lbnQgPSBjaGVja0FuZEdldENvbnRhaW5lckVsZW1lbnQoY29udGFpbmVyKTtcblxuICAgIGNvbnN0IHBsYXllckluc3RhbmNlID0gQVBJKGNvbnRhaW5lckVsZW1lbnQpO1xuICAgIHBsYXllckluc3RhbmNlLmluaXQob3B0aW9ucyk7XG5cbiAgICBwbGF5ZXJMaXN0LnB1c2gocGxheWVySW5zdGFuY2UpO1xuXG4gICAgcmV0dXJuIHBsYXllckluc3RhbmNlO1xufTtcblxuLyoqXG4gKiBHZXRzIHRoZSBwbGF5ZXIgaW5zdGFuY2UgbGlzdC5cbiAqXG4gKiBAcmV0dXJuICAgICB7YXJyYXl9ICBUaGUgcGxheWVyIGxpc3QuXG4gKi9cbk92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyTGlzdCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgcmV0dXJuIHBsYXllckxpc3Q7XG59O1xuXG4vKipcbiAqIEdldHMgdGhlIHBsYXllciBpbnN0YW5jZSBieSBjb250YWluZXIgaWQuXG4gKlxuICogQHBhcmFtICAgICAge3N0cmluZ30gIGNvbnRhaW5lcklkICBUaGUgY29udGFpbmVyIGlkZW50aWZpZXJcbiAqIEByZXR1cm4gICAgIHtvYmVqZWN0IHwgbnVsbH0gIFRoZSBwbGF5ZXIgaW5zdGFuY2UuXG4gKi9cbk92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyQnlDb250YWluZXJJZCA9IGZ1bmN0aW9uKGNvbnRhaW5lcklkKSB7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXllckxpc3QubGVuZ3RoIC0xOyBpICsrKSB7XG5cbiAgICAgICAgaWYgKHBsYXllckxpc3RbaV0uY29udGFpbmVySWQgPT09IGNvbnRhaW5lcklkKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBwbGF5ZXJMaXN0W2ldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG59O1xuXG4vKipcbiAqIEdldHMgdGhlIHBsYXllciBpbnN0YW5jZSBieSBpbmRleC5cbiAqXG4gKiBAcGFyYW0gICAgICB7bnVtYmVyfSAgaW5kZXggICBUaGUgaW5kZXhcbiAqIEByZXR1cm4gICAgIHtvYmplY3QgfCBudWxsfSAgVGhlIHBsYXllciBpbnN0YW5jZS5cbiAqL1xuT3ZlblBsYXllclNESy5nZXRQbGF5ZXJCeUluZGV4ID0gZnVuY3Rpb24oaW5kZXgpIHtcblxuICAgIGNvbnN0IHBsYXllckluc3RhbmNlID0gcGxheWVyTGlzdFtpbmRleF07XG5cbiAgICBpZiAocGxheWVySW5zdGFuY2UpIHtcblxuICAgICAgICByZXR1cm4gcGxheWVySW5zdGFuY2U7XG4gICAgfSBlbHNlIHtcblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlIHdlYnJ0YyBzb3VyY2UgZm9yIHBsYXllciBzb3VyY2UgdHlwZS5cbiAqXG4gKiBAcGFyYW0gICAgICB7T2JqZWN0IHwgQXJyYXl9ICBzb3VyY2UgICB3ZWJydGMgc291cmNlXG4gKiBAcmV0dXJuICAgICB7QXJyYXl9ICBQbGF5ZXIgc291cmNlIE9iZWpjdC5cbiAqL1xuT3ZlblBsYXllclNESy5nZW5lcmF0ZVdlYnJ0Y1VybHMgPSBmdW5jdGlvbihzb3VyY2VzKSB7XG4gICAgcmV0dXJuIChfLmlzQXJyYXkoc291cmNlcykgPyBzb3VyY2VzIDogW3NvdXJjZXNdKS5tYXAoZnVuY3Rpb24oc291cmNlLCBpbmRleCl7XG4gICAgICAgIGlmKHNvdXJjZS5ob3N0ICYmIGlzV2ViUlRDKHNvdXJjZS5ob3N0KSAmJiBzb3VyY2UuYXBwbGljYXRpb24gJiYgc291cmNlLnN0cmVhbSl7XG4gICAgICAgICAgICByZXR1cm4ge2ZpbGUgOiBzb3VyY2UuaG9zdCArIFwiL1wiICsgc291cmNlLmFwcGxpY2F0aW9uICsgXCIvXCIgKyBzb3VyY2Uuc3RyZWFtLCB0eXBlIDogXCJ3ZWJydGNcIiwgbGFiZWwgOiBzb3VyY2UubGFiZWwgPyBzb3VyY2UubGFiZWwgOiBcIndlYnJ0Yy1cIisoaW5kZXgrMSkgfTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgT3ZlblBsYXllclNESzsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAyMy4uXG4gKi9cbmltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XG5pbXBvcnQgY2xvc2VzdCBmcm9tICd1dGlscy9wb2x5ZmlsbHMvdWknO1xuXG4vKipcbiAqIEBicmllZiAgIEl0IHdhcyByZXBsYWNlIGpxdWVyeSdzIHNlbGVjdG9yLiBJdCBPZnRlbiB1c2VkIGJ5IE92ZW5UZW1wbGF0ZS4gKC92aWV3L2VuZ2luZS9PdmVuVGVtcGxhdGUuanMpXG4gKiBAcGFyYW0gICBzZWxlY3Rvck9yRWxlbWVudCAgc3RyaW5nIG9yIGVsZW1lbnRcbiAqXG4gKiAqL1xuXG5jb25zdCBMYSQgPSBmdW5jdGlvbihzZWxlY3Rvck9yRWxlbWVudCl7XG4gICAgY29uc3QgdGhhdCA9IHt9O1xuICAgIGNvbnN0IHJldHVybk5vZGUgPSBmdW5jdGlvbigkZWxlbWVudCAsIHNlbGVjdG9yKXtcbiAgICAgICAgbGV0IG5vZGVMaXN0ID0gICRlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgICAgICBpZihub2RlTGlzdC5sZW5ndGggPiAxKXtcbiAgICAgICAgICAgIHJldHVybiBub2RlTGlzdDtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gbm9kZUxpc3RbMF07XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBsZXQgJGVsZW1lbnQgPSBcIlwiO1xuXG4gICAgaWYoIF8uZXZlcnkoc2VsZWN0b3JPckVsZW1lbnQsIGZ1bmN0aW9uKGl0ZW0pe3JldHVybiBfLmlzRWxlbWVudChpdGVtKX0pKXtcbiAgICAgICAgJGVsZW1lbnQgPSBzZWxlY3Rvck9yRWxlbWVudDtcbiAgICB9ZWxzZSBpZihzZWxlY3Rvck9yRWxlbWVudCA9PT0gXCJkb2N1bWVudFwiKXtcbiAgICAgICAgJGVsZW1lbnQgPSBkb2N1bWVudDtcbiAgICB9ZWxzZSBpZihzZWxlY3Rvck9yRWxlbWVudCA9PT0gXCJ3aW5kb3dcIil7XG4gICAgICAgICRlbGVtZW50ID0gd2luZG93O1xuICAgIH1lbHNle1xuICAgICAgICAkZWxlbWVudCA9IHJldHVybk5vZGUoZG9jdW1lbnQsIHNlbGVjdG9yT3JFbGVtZW50KTtcbiAgICB9XG5cblxuICAgIGlmKCEkZWxlbWVudCl7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHRoYXQuZmluZCA9IChzZWxlY3RvcikgPT57XG4gICAgICAgIHJldHVybiBMYSQocmV0dXJuTm9kZSgkZWxlbWVudCwgc2VsZWN0b3IpKTtcbiAgICB9O1xuXG4gICAgdGhhdC5jc3MgPSAobmFtZSwgdmFsdWUpID0+IHtcbiAgICAgICAgaWYoJGVsZW1lbnQubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAkZWxlbWVudC5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpe1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGVbbmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgJGVsZW1lbnQuc3R5bGVbbmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0LmFkZENsYXNzID0gKG5hbWUpID0+e1xuICAgICAgICBpZigkZWxlbWVudC5jbGFzc0xpc3Qpe1xuICAgICAgICAgICAgJGVsZW1lbnQuY2xhc3NMaXN0LmFkZChuYW1lKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBsZXQgY2xhc3NOYW1lcyA9ICRlbGVtZW50LmNsYXNzTmFtZS5zcGxpdChcIiBcIik7XG4gICAgICAgICAgICBpZihjbGFzc05hbWVzLmluZGV4T2YobmFtZSkgPT09IC0xKXtcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5jbGFzc05hbWUgKz0gXCIgXCIgKyBuYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgdGhhdC5yZW1vdmVDbGFzcyA9IChuYW1lKSA9PntcbiAgICAgICAgaWYgKCRlbGVtZW50LmNsYXNzTGlzdCl7XG4gICAgICAgICAgICAkZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKG5hbWUpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTmFtZSA9ICRlbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAoJyhefFxcXFxiKScgKyBuYW1lLnNwbGl0KCcgJykuam9pbignfCcpICsgJyhcXFxcYnwkKScsICdnaScpLCAnICcpO1xuXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhhdC5zaG93ID0gKCkgPT57XG4gICAgICAgICRlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH07XG5cbiAgICB0aGF0LmhpZGUgPSAoKSA9PntcbiAgICAgICAgJGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9O1xuXG4gICAgdGhhdC5hcHBlbmQgPSAoaHRtbENvZGUpID0+e1xuICAgICAgICAkZWxlbWVudC5pbm5lckhUTUwgKz0gaHRtbENvZGU7XG4gICAgfTtcblxuICAgIHRoYXQudGV4dCA9ICh0ZXh0KSA9PiB7IC8vSUU4K1xuICAgICAgICBpZih0ZXh0KXtcbiAgICAgICAgICAgICRlbGVtZW50LnRleHRDb250ZW50ID0gdGV4dDtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gJGVsZW1lbnQudGV4dENvbnRlbnQ7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhhdC5oYXNDbGFzcyA9IChuYW1lKSA9PiB7IC8vSUU4K1xuICAgICAgICBpZigkZWxlbWVudC5jbGFzc0xpc3Qpe1xuICAgICAgICAgICAgcmV0dXJuICRlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhuYW1lKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cCgnKF58ICknICsgbmFtZSArICcoIHwkKScsICdnaScpLnRlc3QoJGVsZW1lbnQubmFtZSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhhdC5pcyA9ICgkdGFyZ2V0RWxlbWVudCkgPT4ge1xuICAgICAgICByZXR1cm4gJGVsZW1lbnQgPT09ICR0YXJnZXRFbGVtZW50O1xuICAgIH07XG5cbiAgICB0aGF0Lm9mZnNldCA9ICgpID0+eyAgICAvL0lFOCtcbiAgICAgICAgdmFyIHJlY3QgPSAkZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdG9wOiByZWN0LnRvcCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wLFxuICAgICAgICAgICAgbGVmdDogcmVjdC5sZWZ0ICsgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhhdC53aWR0aCA9ICgpID0+IHsgICAgLy9JRTgrXG4gICAgICAgIHJldHVybiAkZWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICB9O1xuXG4gICAgdGhhdC5oZWlnaHQgPSAoKSA9PiB7ICAgLy9JRTgrXG4gICAgICAgIHJldHVybiAkZWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgfTtcblxuICAgIHRoYXQuYXR0ciA9IChhdHRyKSA9PiB7XG4gICAgICAgIHJldHVybiAkZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cik7XG4gICAgfTtcblxuICAgIHRoYXQucmVtb3ZlID0gKCkgPT4geyAgIC8vSUU4K1xuICAgICAgICAkZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCRlbGVtZW50KTtcbiAgICB9O1xuXG4gICAgdGhhdC5yZXBsYWNlID0gKGh0bWwpID0+IHtcbiAgICAgICAgJGVsZW1lbnQucmVwbGFjZVdpdGgoaHRtbCk7XG4gICAgfTtcblxuICAgIHRoYXQuYXBwZW5kID0gKGh0bWwpID0+IHtcbiAgICAgICAgJGVsZW1lbnQuYXBwZW5kQ2hpbGQoaHRtbCk7XG4gICAgfTtcblxuICAgIHRoYXQucmVtb3ZlID0gKCkgPT4ge1xuICAgICAgICAkZWxlbWVudC5yZW1vdmUoKTtcbiAgICB9O1xuXG4gICAgdGhhdC5nZXQgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiAkZWxlbWVudDtcbiAgICB9O1xuXG4gICAgdGhhdC5jbG9zZXN0ID0gKHNlbGVjdG9yU3RyaW5nKSA9PiB7XG4gICAgICAgIHJldHVybiAkZWxlbWVudC5jbG9zZXN0KHNlbGVjdG9yU3RyaW5nKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBMYSQ7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNS4gMjQuLlxuICovXG5cbmNvbnN0IGxvZ2dlciA9IGZ1bmN0aW9uKCl7XG4gICAgY29uc3QgdGhhdCA9IHt9O1xuICAgIGxldCBwcmV2Q29uc29sZUxvZyA9IG51bGw7XG5cbiAgICB3aW5kb3cuT3ZlblBsYXllckNvbnNvbGUgPSB7bG9nIDogd2luZG93Wydjb25zb2xlJ11bJ2xvZyddfTtcblxuICAgIHRoYXQuZW5hYmxlID0gKCkgPT57XG4gICAgICAgIGlmKHByZXZDb25zb2xlTG9nID09IG51bGwpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlWydsb2cnXSA9IHByZXZDb25zb2xlTG9nO1xuICAgIH07XG4gICAgdGhhdC5kaXNhYmxlID0gKCkgPT57XG4gICAgICAgIHByZXZDb25zb2xlTG9nID0gY29uc29sZS5sb2c7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlWydsb2cnXSA9IGZ1bmN0aW9uKCl7fTtcbiAgICB9O1xuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xuICAgICAgICB3aW5kb3cuT3ZlblBsYXllckNvbnNvbGUgPSBudWxsO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgbG9nZ2VyOyIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDguIDEuLlxuICovXG5jb25zdCBjbG9zZXN0ID0gZnVuY3Rpb24oKXtcbiAgICBpZiAod2luZG93LkVsZW1lbnQgJiYgIUVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3QpIHtcbiAgICAgICAgRWxlbWVudC5wcm90b3R5cGUuY2xvc2VzdCA9XG4gICAgICAgICAgICBmdW5jdGlvbihzKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1hdGNoZXMgPSAodGhpcy5kb2N1bWVudCB8fCB0aGlzLm93bmVyRG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3JBbGwocyksXG4gICAgICAgICAgICAgICAgICAgIGksXG4gICAgICAgICAgICAgICAgICAgIGVsID0gdGhpcztcbiAgICAgICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgICAgIGkgPSBtYXRjaGVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKC0taSA+PSAwICYmIG1hdGNoZXMuaXRlbShpKSAhPT0gZWwpIHt9O1xuICAgICAgICAgICAgICAgIH0gd2hpbGUgKChpIDwgMCkgJiYgKGVsID0gZWwucGFyZW50RWxlbWVudCkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBlbDtcbiAgICAgICAgICAgIH07XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xvc2VzdDsiLCJpbXBvcnQgXyBmcm9tICcuL3VuZGVyc2NvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gdHJpbShzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcbn1cblxuLyoqXG4gKiBleHRyYWN0RXh0ZW5zaW9uXG4gKlxuICogQHBhcmFtICAgICAge3N0cmluZ30gcGF0aCBmb3IgdXJsXG4gKiBAcmV0dXJuICAgICB7c3RyaW5nfSAgRXh0ZW5zaW9uXG4gKi9cbmV4cG9ydCBjb25zdCBleHRyYWN0RXh0ZW5zaW9uID0gZnVuY3Rpb24ocGF0aCkge1xuICAgIGlmKCFwYXRoIHx8IHBhdGguc3Vic3RyKDAsNCk9PSdydG1wJykge1xuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0QXp1cmVGaWxlRm9ybWF0KHBhdGgpIHtcbiAgICAgICAgbGV0IGV4dGVuc2lvbiA9IFwiXCI7XG4gICAgICAgIGlmICgoL1soLF1mb3JtYXQ9bXBkLS9pKS50ZXN0KHBhdGgpKSB7XG4gICAgICAgICAgICBleHRlbnNpb24gPSAnbXBkJztcbiAgICAgICAgfWVsc2UgaWYgKCgvWygsXWZvcm1hdD1tM3U4LS9pKS50ZXN0KHBhdGgpKSB7XG4gICAgICAgICAgICBleHRlbnNpb24gPSAnbTN1OCc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV4dGVuc2lvbjtcbiAgICB9XG5cbiAgICBsZXQgYXp1cmVkRm9ybWF0ID0gZ2V0QXp1cmVGaWxlRm9ybWF0KHBhdGgpO1xuICAgIGlmKGF6dXJlZEZvcm1hdCkge1xuICAgICAgICByZXR1cm4gYXp1cmVkRm9ybWF0O1xuICAgIH1cbiAgICBwYXRoID0gcGF0aC5zcGxpdCgnPycpWzBdLnNwbGl0KCcjJylbMF07XG4gICAgaWYocGF0aC5sYXN0SW5kZXhPZignLicpID4gLTEpIHtcbiAgICAgICAgcmV0dXJuIHBhdGguc3Vic3RyKHBhdGgubGFzdEluZGV4T2YoJy4nKSArIDEsIHBhdGgubGVuZ3RoKS50b0xvd2VyQ2FzZSgpO1xuICAgIH1lbHNle1xuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG59O1xuXG5cbi8qKlxuICogbmF0dXJhbEhtc1xuICpcbiAqIEBwYXJhbSAgICAgIHtudW1iZXIgfCBzdHJpbmd9ICBzZWNvbmQgIFRoZSBzZWNvbmRcbiAqIEByZXR1cm4gICAgIHtzdHJpbmd9ICBmb3JtYXR0ZWQgU3RyaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBuYXR1cmFsSG1zKHNlY29uZCkge1xuICAgIGxldCBzZWNOdW0gPSBwYXJzZUludChzZWNvbmQsIDEwKTtcbiAgICBsZXQgaG91cnMgICA9IE1hdGguZmxvb3Ioc2VjTnVtIC8gMzYwMCk7XG4gICAgbGV0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKChzZWNOdW0gLSAoaG91cnMgKiAzNjAwKSkgLyA2MCk7XG4gICAgbGV0IHNlY29uZHMgPSBzZWNOdW0gLSAoaG91cnMgKiAzNjAwKSAtIChtaW51dGVzICogNjApO1xuXG4gICAgaWYgKGhvdXJzID4gMCkge21pbnV0ZXMgPSBcIjBcIittaW51dGVzO31cbiAgICBpZiAoc2Vjb25kcyA8IDEwKSB7c2Vjb25kcyA9IFwiMFwiK3NlY29uZHM7fVxuXG4gICAgaWYgKGhvdXJzID4gMCkge1xuICAgICAgICByZXR1cm4gaG91cnMrJzonK21pbnV0ZXMrJzonK3NlY29uZHM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG1pbnV0ZXMrJzonK3NlY29uZHM7XG4gICAgfVxufSIsIi8vICAgICBVbmRlcnNjb3JlLmpzIDEuOS4xXG4vLyAgICAgaHR0cDovL3VuZGVyc2NvcmVqcy5vcmdcbi8vICAgICAoYykgMjAwOS0yMDE4IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4vLyAgICAgVW5kZXJzY29yZSBtYXkgYmUgZnJlZWx5IGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiFmdW5jdGlvbigpe3ZhciBuPVwib2JqZWN0XCI9PXR5cGVvZiBzZWxmJiZzZWxmLnNlbGY9PT1zZWxmJiZzZWxmfHxcIm9iamVjdFwiPT10eXBlb2YgZ2xvYmFsJiZnbG9iYWwuZ2xvYmFsPT09Z2xvYmFsJiZnbG9iYWx8fHRoaXN8fHt9LHI9bi5fLGU9QXJyYXkucHJvdG90eXBlLG89T2JqZWN0LnByb3RvdHlwZSxzPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBTeW1ib2w/U3ltYm9sLnByb3RvdHlwZTpudWxsLHU9ZS5wdXNoLGM9ZS5zbGljZSxwPW8udG9TdHJpbmcsaT1vLmhhc093blByb3BlcnR5LHQ9QXJyYXkuaXNBcnJheSxhPU9iamVjdC5rZXlzLGw9T2JqZWN0LmNyZWF0ZSxmPWZ1bmN0aW9uKCl7fSxoPWZ1bmN0aW9uKG4pe3JldHVybiBuIGluc3RhbmNlb2YgaD9uOnRoaXMgaW5zdGFuY2VvZiBoP3ZvaWQodGhpcy5fd3JhcHBlZD1uKTpuZXcgaChuKX07XCJ1bmRlZmluZWRcIj09dHlwZW9mIGV4cG9ydHN8fGV4cG9ydHMubm9kZVR5cGU/bi5fPWg6KFwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGUmJiFtb2R1bGUubm9kZVR5cGUmJm1vZHVsZS5leHBvcnRzJiYoZXhwb3J0cz1tb2R1bGUuZXhwb3J0cz1oKSxleHBvcnRzLl89aCksaC5WRVJTSU9OPVwiMS45LjFcIjt2YXIgdix5PWZ1bmN0aW9uKHUsaSxuKXtpZih2b2lkIDA9PT1pKXJldHVybiB1O3N3aXRjaChudWxsPT1uPzM6bil7Y2FzZSAxOnJldHVybiBmdW5jdGlvbihuKXtyZXR1cm4gdS5jYWxsKGksbil9O2Nhc2UgMzpyZXR1cm4gZnVuY3Rpb24obixyLHQpe3JldHVybiB1LmNhbGwoaSxuLHIsdCl9O2Nhc2UgNDpyZXR1cm4gZnVuY3Rpb24obixyLHQsZSl7cmV0dXJuIHUuY2FsbChpLG4scix0LGUpfX1yZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gdS5hcHBseShpLGFyZ3VtZW50cyl9fSxkPWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gaC5pdGVyYXRlZSE9PXY/aC5pdGVyYXRlZShuLHIpOm51bGw9PW4/aC5pZGVudGl0eTpoLmlzRnVuY3Rpb24obik/eShuLHIsdCk6aC5pc09iamVjdChuKSYmIWguaXNBcnJheShuKT9oLm1hdGNoZXIobik6aC5wcm9wZXJ0eShuKX07aC5pdGVyYXRlZT12PWZ1bmN0aW9uKG4scil7cmV0dXJuIGQobixyLDEvMCl9O3ZhciBnPWZ1bmN0aW9uKHUsaSl7cmV0dXJuIGk9bnVsbD09aT91Lmxlbmd0aC0xOitpLGZ1bmN0aW9uKCl7Zm9yKHZhciBuPU1hdGgubWF4KGFyZ3VtZW50cy5sZW5ndGgtaSwwKSxyPUFycmF5KG4pLHQ9MDt0PG47dCsrKXJbdF09YXJndW1lbnRzW3QraV07c3dpdGNoKGkpe2Nhc2UgMDpyZXR1cm4gdS5jYWxsKHRoaXMscik7Y2FzZSAxOnJldHVybiB1LmNhbGwodGhpcyxhcmd1bWVudHNbMF0scik7Y2FzZSAyOnJldHVybiB1LmNhbGwodGhpcyxhcmd1bWVudHNbMF0sYXJndW1lbnRzWzFdLHIpfXZhciBlPUFycmF5KGkrMSk7Zm9yKHQ9MDt0PGk7dCsrKWVbdF09YXJndW1lbnRzW3RdO3JldHVybiBlW2ldPXIsdS5hcHBseSh0aGlzLGUpfX0sbT1mdW5jdGlvbihuKXtpZighaC5pc09iamVjdChuKSlyZXR1cm57fTtpZihsKXJldHVybiBsKG4pO2YucHJvdG90eXBlPW47dmFyIHI9bmV3IGY7cmV0dXJuIGYucHJvdG90eXBlPW51bGwscn0sYj1mdW5jdGlvbihyKXtyZXR1cm4gZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PW4/dm9pZCAwOm5bcl19fSxqPWZ1bmN0aW9uKG4scil7cmV0dXJuIG51bGwhPW4mJmkuY2FsbChuLHIpfSx4PWZ1bmN0aW9uKG4scil7Zm9yKHZhciB0PXIubGVuZ3RoLGU9MDtlPHQ7ZSsrKXtpZihudWxsPT1uKXJldHVybjtuPW5bcltlXV19cmV0dXJuIHQ/bjp2b2lkIDB9LF89TWF0aC5wb3coMiw1MyktMSxBPWIoXCJsZW5ndGhcIiksdz1mdW5jdGlvbihuKXt2YXIgcj1BKG4pO3JldHVyblwibnVtYmVyXCI9PXR5cGVvZiByJiYwPD1yJiZyPD1ffTtoLmVhY2g9aC5mb3JFYWNoPWZ1bmN0aW9uKG4scix0KXt2YXIgZSx1O2lmKHI9eShyLHQpLHcobikpZm9yKGU9MCx1PW4ubGVuZ3RoO2U8dTtlKyspcihuW2VdLGUsbik7ZWxzZXt2YXIgaT1oLmtleXMobik7Zm9yKGU9MCx1PWkubGVuZ3RoO2U8dTtlKyspcihuW2lbZV1dLGlbZV0sbil9cmV0dXJuIG59LGgubWFwPWguY29sbGVjdD1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPSF3KG4pJiZoLmtleXMobiksdT0oZXx8bikubGVuZ3RoLGk9QXJyYXkodSksbz0wO288dTtvKyspe3ZhciBhPWU/ZVtvXTpvO2lbb109cihuW2FdLGEsbil9cmV0dXJuIGl9O3ZhciBPPWZ1bmN0aW9uKGMpe3JldHVybiBmdW5jdGlvbihuLHIsdCxlKXt2YXIgdT0zPD1hcmd1bWVudHMubGVuZ3RoO3JldHVybiBmdW5jdGlvbihuLHIsdCxlKXt2YXIgdT0hdyhuKSYmaC5rZXlzKG4pLGk9KHV8fG4pLmxlbmd0aCxvPTA8Yz8wOmktMTtmb3IoZXx8KHQ9blt1P3Vbb106b10sbys9Yyk7MDw9byYmbzxpO28rPWMpe3ZhciBhPXU/dVtvXTpvO3Q9cih0LG5bYV0sYSxuKX1yZXR1cm4gdH0obix5KHIsZSw0KSx0LHUpfX07aC5yZWR1Y2U9aC5mb2xkbD1oLmluamVjdD1PKDEpLGgucmVkdWNlUmlnaHQ9aC5mb2xkcj1PKC0xKSxoLmZpbmQ9aC5kZXRlY3Q9ZnVuY3Rpb24obixyLHQpe3ZhciBlPSh3KG4pP2guZmluZEluZGV4OmguZmluZEtleSkobixyLHQpO2lmKHZvaWQgMCE9PWUmJi0xIT09ZSlyZXR1cm4gbltlXX0saC5maWx0ZXI9aC5zZWxlY3Q9ZnVuY3Rpb24obixlLHIpe3ZhciB1PVtdO3JldHVybiBlPWQoZSxyKSxoLmVhY2gobixmdW5jdGlvbihuLHIsdCl7ZShuLHIsdCkmJnUucHVzaChuKX0pLHV9LGgucmVqZWN0PWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gaC5maWx0ZXIobixoLm5lZ2F0ZShkKHIpKSx0KX0saC5ldmVyeT1oLmFsbD1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPSF3KG4pJiZoLmtleXMobiksdT0oZXx8bikubGVuZ3RoLGk9MDtpPHU7aSsrKXt2YXIgbz1lP2VbaV06aTtpZighcihuW29dLG8sbikpcmV0dXJuITF9cmV0dXJuITB9LGguc29tZT1oLmFueT1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPSF3KG4pJiZoLmtleXMobiksdT0oZXx8bikubGVuZ3RoLGk9MDtpPHU7aSsrKXt2YXIgbz1lP2VbaV06aTtpZihyKG5bb10sbyxuKSlyZXR1cm4hMH1yZXR1cm4hMX0saC5jb250YWlucz1oLmluY2x1ZGVzPWguaW5jbHVkZT1mdW5jdGlvbihuLHIsdCxlKXtyZXR1cm4gdyhuKXx8KG49aC52YWx1ZXMobikpLChcIm51bWJlclwiIT10eXBlb2YgdHx8ZSkmJih0PTApLDA8PWguaW5kZXhPZihuLHIsdCl9LGguaW52b2tlPWcoZnVuY3Rpb24obix0LGUpe3ZhciB1LGk7cmV0dXJuIGguaXNGdW5jdGlvbih0KT9pPXQ6aC5pc0FycmF5KHQpJiYodT10LnNsaWNlKDAsLTEpLHQ9dFt0Lmxlbmd0aC0xXSksaC5tYXAobixmdW5jdGlvbihuKXt2YXIgcj1pO2lmKCFyKXtpZih1JiZ1Lmxlbmd0aCYmKG49eChuLHUpKSxudWxsPT1uKXJldHVybjtyPW5bdF19cmV0dXJuIG51bGw9PXI/cjpyLmFwcGx5KG4sZSl9KX0pLGgucGx1Y2s9ZnVuY3Rpb24obixyKXtyZXR1cm4gaC5tYXAobixoLnByb3BlcnR5KHIpKX0saC53aGVyZT1mdW5jdGlvbihuLHIpe3JldHVybiBoLmZpbHRlcihuLGgubWF0Y2hlcihyKSl9LGguZmluZFdoZXJlPWZ1bmN0aW9uKG4scil7cmV0dXJuIGguZmluZChuLGgubWF0Y2hlcihyKSl9LGgubWF4PWZ1bmN0aW9uKG4sZSxyKXt2YXIgdCx1LGk9LTEvMCxvPS0xLzA7aWYobnVsbD09ZXx8XCJudW1iZXJcIj09dHlwZW9mIGUmJlwib2JqZWN0XCIhPXR5cGVvZiBuWzBdJiZudWxsIT1uKWZvcih2YXIgYT0wLGM9KG49dyhuKT9uOmgudmFsdWVzKG4pKS5sZW5ndGg7YTxjO2ErKyludWxsIT0odD1uW2FdKSYmaTx0JiYoaT10KTtlbHNlIGU9ZChlLHIpLGguZWFjaChuLGZ1bmN0aW9uKG4scix0KXt1PWUobixyLHQpLChvPHV8fHU9PT0tMS8wJiZpPT09LTEvMCkmJihpPW4sbz11KX0pO3JldHVybiBpfSxoLm1pbj1mdW5jdGlvbihuLGUscil7dmFyIHQsdSxpPTEvMCxvPTEvMDtpZihudWxsPT1lfHxcIm51bWJlclwiPT10eXBlb2YgZSYmXCJvYmplY3RcIiE9dHlwZW9mIG5bMF0mJm51bGwhPW4pZm9yKHZhciBhPTAsYz0obj13KG4pP246aC52YWx1ZXMobikpLmxlbmd0aDthPGM7YSsrKW51bGwhPSh0PW5bYV0pJiZ0PGkmJihpPXQpO2Vsc2UgZT1kKGUsciksaC5lYWNoKG4sZnVuY3Rpb24obixyLHQpeygodT1lKG4scix0KSk8b3x8dT09PTEvMCYmaT09PTEvMCkmJihpPW4sbz11KX0pO3JldHVybiBpfSxoLnNodWZmbGU9ZnVuY3Rpb24obil7cmV0dXJuIGguc2FtcGxlKG4sMS8wKX0saC5zYW1wbGU9ZnVuY3Rpb24obixyLHQpe2lmKG51bGw9PXJ8fHQpcmV0dXJuIHcobil8fChuPWgudmFsdWVzKG4pKSxuW2gucmFuZG9tKG4ubGVuZ3RoLTEpXTt2YXIgZT13KG4pP2guY2xvbmUobik6aC52YWx1ZXMobiksdT1BKGUpO3I9TWF0aC5tYXgoTWF0aC5taW4ocix1KSwwKTtmb3IodmFyIGk9dS0xLG89MDtvPHI7bysrKXt2YXIgYT1oLnJhbmRvbShvLGkpLGM9ZVtvXTtlW29dPWVbYV0sZVthXT1jfXJldHVybiBlLnNsaWNlKDAscil9LGguc29ydEJ5PWZ1bmN0aW9uKG4sZSxyKXt2YXIgdT0wO3JldHVybiBlPWQoZSxyKSxoLnBsdWNrKGgubWFwKG4sZnVuY3Rpb24obixyLHQpe3JldHVybnt2YWx1ZTpuLGluZGV4OnUrKyxjcml0ZXJpYTplKG4scix0KX19KS5zb3J0KGZ1bmN0aW9uKG4scil7dmFyIHQ9bi5jcml0ZXJpYSxlPXIuY3JpdGVyaWE7aWYodCE9PWUpe2lmKGU8dHx8dm9pZCAwPT09dClyZXR1cm4gMTtpZih0PGV8fHZvaWQgMD09PWUpcmV0dXJuLTF9cmV0dXJuIG4uaW5kZXgtci5pbmRleH0pLFwidmFsdWVcIil9O3ZhciBrPWZ1bmN0aW9uKG8scil7cmV0dXJuIGZ1bmN0aW9uKGUsdSxuKXt2YXIgaT1yP1tbXSxbXV06e307cmV0dXJuIHU9ZCh1LG4pLGguZWFjaChlLGZ1bmN0aW9uKG4scil7dmFyIHQ9dShuLHIsZSk7byhpLG4sdCl9KSxpfX07aC5ncm91cEJ5PWsoZnVuY3Rpb24obixyLHQpe2oobix0KT9uW3RdLnB1c2gocik6blt0XT1bcl19KSxoLmluZGV4Qnk9ayhmdW5jdGlvbihuLHIsdCl7blt0XT1yfSksaC5jb3VudEJ5PWsoZnVuY3Rpb24obixyLHQpe2oobix0KT9uW3RdKys6blt0XT0xfSk7dmFyIFM9L1teXFx1ZDgwMC1cXHVkZmZmXXxbXFx1ZDgwMC1cXHVkYmZmXVtcXHVkYzAwLVxcdWRmZmZdfFtcXHVkODAwLVxcdWRmZmZdL2c7aC50b0FycmF5PWZ1bmN0aW9uKG4pe3JldHVybiBuP2guaXNBcnJheShuKT9jLmNhbGwobik6aC5pc1N0cmluZyhuKT9uLm1hdGNoKFMpOncobik/aC5tYXAobixoLmlkZW50aXR5KTpoLnZhbHVlcyhuKTpbXX0saC5zaXplPWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT1uPzA6dyhuKT9uLmxlbmd0aDpoLmtleXMobikubGVuZ3RofSxoLnBhcnRpdGlvbj1rKGZ1bmN0aW9uKG4scix0KXtuW3Q/MDoxXS5wdXNoKHIpfSwhMCksaC5maXJzdD1oLmhlYWQ9aC50YWtlPWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gbnVsbD09bnx8bi5sZW5ndGg8MT9udWxsPT1yP3ZvaWQgMDpbXTpudWxsPT1yfHx0P25bMF06aC5pbml0aWFsKG4sbi5sZW5ndGgtcil9LGguaW5pdGlhbD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGMuY2FsbChuLDAsTWF0aC5tYXgoMCxuLmxlbmd0aC0obnVsbD09cnx8dD8xOnIpKSl9LGgubGFzdD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIG51bGw9PW58fG4ubGVuZ3RoPDE/bnVsbD09cj92b2lkIDA6W106bnVsbD09cnx8dD9uW24ubGVuZ3RoLTFdOmgucmVzdChuLE1hdGgubWF4KDAsbi5sZW5ndGgtcikpfSxoLnJlc3Q9aC50YWlsPWguZHJvcD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGMuY2FsbChuLG51bGw9PXJ8fHQ/MTpyKX0saC5jb21wYWN0PWZ1bmN0aW9uKG4pe3JldHVybiBoLmZpbHRlcihuLEJvb2xlYW4pfTt2YXIgTT1mdW5jdGlvbihuLHIsdCxlKXtmb3IodmFyIHU9KGU9ZXx8W10pLmxlbmd0aCxpPTAsbz1BKG4pO2k8bztpKyspe3ZhciBhPW5baV07aWYodyhhKSYmKGguaXNBcnJheShhKXx8aC5pc0FyZ3VtZW50cyhhKSkpaWYocilmb3IodmFyIGM9MCxsPWEubGVuZ3RoO2M8bDspZVt1KytdPWFbYysrXTtlbHNlIE0oYSxyLHQsZSksdT1lLmxlbmd0aDtlbHNlIHR8fChlW3UrK109YSl9cmV0dXJuIGV9O2guZmxhdHRlbj1mdW5jdGlvbihuLHIpe3JldHVybiBNKG4sciwhMSl9LGgud2l0aG91dD1nKGZ1bmN0aW9uKG4scil7cmV0dXJuIGguZGlmZmVyZW5jZShuLHIpfSksaC51bmlxPWgudW5pcXVlPWZ1bmN0aW9uKG4scix0LGUpe2guaXNCb29sZWFuKHIpfHwoZT10LHQ9cixyPSExKSxudWxsIT10JiYodD1kKHQsZSkpO2Zvcih2YXIgdT1bXSxpPVtdLG89MCxhPUEobik7bzxhO28rKyl7dmFyIGM9bltvXSxsPXQ/dChjLG8sbik6YztyJiYhdD8obyYmaT09PWx8fHUucHVzaChjKSxpPWwpOnQ/aC5jb250YWlucyhpLGwpfHwoaS5wdXNoKGwpLHUucHVzaChjKSk6aC5jb250YWlucyh1LGMpfHx1LnB1c2goYyl9cmV0dXJuIHV9LGgudW5pb249ZyhmdW5jdGlvbihuKXtyZXR1cm4gaC51bmlxKE0obiwhMCwhMCkpfSksaC5pbnRlcnNlY3Rpb249ZnVuY3Rpb24obil7Zm9yKHZhciByPVtdLHQ9YXJndW1lbnRzLmxlbmd0aCxlPTAsdT1BKG4pO2U8dTtlKyspe3ZhciBpPW5bZV07aWYoIWguY29udGFpbnMocixpKSl7dmFyIG87Zm9yKG89MTtvPHQmJmguY29udGFpbnMoYXJndW1lbnRzW29dLGkpO28rKyk7bz09PXQmJnIucHVzaChpKX19cmV0dXJuIHJ9LGguZGlmZmVyZW5jZT1nKGZ1bmN0aW9uKG4scil7cmV0dXJuIHI9TShyLCEwLCEwKSxoLmZpbHRlcihuLGZ1bmN0aW9uKG4pe3JldHVybiFoLmNvbnRhaW5zKHIsbil9KX0pLGgudW56aXA9ZnVuY3Rpb24obil7Zm9yKHZhciByPW4mJmgubWF4KG4sQSkubGVuZ3RofHwwLHQ9QXJyYXkociksZT0wO2U8cjtlKyspdFtlXT1oLnBsdWNrKG4sZSk7cmV0dXJuIHR9LGguemlwPWcoaC51bnppcCksaC5vYmplY3Q9ZnVuY3Rpb24obixyKXtmb3IodmFyIHQ9e30sZT0wLHU9QShuKTtlPHU7ZSsrKXI/dFtuW2VdXT1yW2VdOnRbbltlXVswXV09bltlXVsxXTtyZXR1cm4gdH07dmFyIEY9ZnVuY3Rpb24oaSl7cmV0dXJuIGZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGU9QShuKSx1PTA8aT8wOmUtMTswPD11JiZ1PGU7dSs9aSlpZihyKG5bdV0sdSxuKSlyZXR1cm4gdTtyZXR1cm4tMX19O2guZmluZEluZGV4PUYoMSksaC5maW5kTGFzdEluZGV4PUYoLTEpLGguc29ydGVkSW5kZXg9ZnVuY3Rpb24obixyLHQsZSl7Zm9yKHZhciB1PSh0PWQodCxlLDEpKShyKSxpPTAsbz1BKG4pO2k8bzspe3ZhciBhPU1hdGguZmxvb3IoKGkrbykvMik7dChuW2FdKTx1P2k9YSsxOm89YX1yZXR1cm4gaX07dmFyIEU9ZnVuY3Rpb24oaSxvLGEpe3JldHVybiBmdW5jdGlvbihuLHIsdCl7dmFyIGU9MCx1PUEobik7aWYoXCJudW1iZXJcIj09dHlwZW9mIHQpMDxpP2U9MDw9dD90Ok1hdGgubWF4KHQrdSxlKTp1PTA8PXQ/TWF0aC5taW4odCsxLHUpOnQrdSsxO2Vsc2UgaWYoYSYmdCYmdSlyZXR1cm4gblt0PWEobixyKV09PT1yP3Q6LTE7aWYociE9cilyZXR1cm4gMDw9KHQ9byhjLmNhbGwobixlLHUpLGguaXNOYU4pKT90K2U6LTE7Zm9yKHQ9MDxpP2U6dS0xOzA8PXQmJnQ8dTt0Kz1pKWlmKG5bdF09PT1yKXJldHVybiB0O3JldHVybi0xfX07aC5pbmRleE9mPUUoMSxoLmZpbmRJbmRleCxoLnNvcnRlZEluZGV4KSxoLmxhc3RJbmRleE9mPUUoLTEsaC5maW5kTGFzdEluZGV4KSxoLnJhbmdlPWZ1bmN0aW9uKG4scix0KXtudWxsPT1yJiYocj1ufHwwLG49MCksdHx8KHQ9cjxuPy0xOjEpO2Zvcih2YXIgZT1NYXRoLm1heChNYXRoLmNlaWwoKHItbikvdCksMCksdT1BcnJheShlKSxpPTA7aTxlO2krKyxuKz10KXVbaV09bjtyZXR1cm4gdX0saC5jaHVuaz1mdW5jdGlvbihuLHIpe2lmKG51bGw9PXJ8fHI8MSlyZXR1cm5bXTtmb3IodmFyIHQ9W10sZT0wLHU9bi5sZW5ndGg7ZTx1Oyl0LnB1c2goYy5jYWxsKG4sZSxlKz1yKSk7cmV0dXJuIHR9O3ZhciBOPWZ1bmN0aW9uKG4scix0LGUsdSl7aWYoIShlIGluc3RhbmNlb2YgcikpcmV0dXJuIG4uYXBwbHkodCx1KTt2YXIgaT1tKG4ucHJvdG90eXBlKSxvPW4uYXBwbHkoaSx1KTtyZXR1cm4gaC5pc09iamVjdChvKT9vOml9O2guYmluZD1nKGZ1bmN0aW9uKHIsdCxlKXtpZighaC5pc0Z1bmN0aW9uKHIpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJCaW5kIG11c3QgYmUgY2FsbGVkIG9uIGEgZnVuY3Rpb25cIik7dmFyIHU9ZyhmdW5jdGlvbihuKXtyZXR1cm4gTihyLHUsdCx0aGlzLGUuY29uY2F0KG4pKX0pO3JldHVybiB1fSksaC5wYXJ0aWFsPWcoZnVuY3Rpb24odSxpKXt2YXIgbz1oLnBhcnRpYWwucGxhY2Vob2xkZXIsYT1mdW5jdGlvbigpe2Zvcih2YXIgbj0wLHI9aS5sZW5ndGgsdD1BcnJheShyKSxlPTA7ZTxyO2UrKyl0W2VdPWlbZV09PT1vP2FyZ3VtZW50c1tuKytdOmlbZV07Zm9yKDtuPGFyZ3VtZW50cy5sZW5ndGg7KXQucHVzaChhcmd1bWVudHNbbisrXSk7cmV0dXJuIE4odSxhLHRoaXMsdGhpcyx0KX07cmV0dXJuIGF9KSwoaC5wYXJ0aWFsLnBsYWNlaG9sZGVyPWgpLmJpbmRBbGw9ZyhmdW5jdGlvbihuLHIpe3ZhciB0PShyPU0ociwhMSwhMSkpLmxlbmd0aDtpZih0PDEpdGhyb3cgbmV3IEVycm9yKFwiYmluZEFsbCBtdXN0IGJlIHBhc3NlZCBmdW5jdGlvbiBuYW1lc1wiKTtmb3IoO3QtLTspe3ZhciBlPXJbdF07bltlXT1oLmJpbmQobltlXSxuKX19KSxoLm1lbW9pemU9ZnVuY3Rpb24oZSx1KXt2YXIgaT1mdW5jdGlvbihuKXt2YXIgcj1pLmNhY2hlLHQ9XCJcIisodT91LmFwcGx5KHRoaXMsYXJndW1lbnRzKTpuKTtyZXR1cm4gaihyLHQpfHwoclt0XT1lLmFwcGx5KHRoaXMsYXJndW1lbnRzKSksclt0XX07cmV0dXJuIGkuY2FjaGU9e30saX0saC5kZWxheT1nKGZ1bmN0aW9uKG4scix0KXtyZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpe3JldHVybiBuLmFwcGx5KG51bGwsdCl9LHIpfSksaC5kZWZlcj1oLnBhcnRpYWwoaC5kZWxheSxoLDEpLGgudGhyb3R0bGU9ZnVuY3Rpb24odCxlLHUpe3ZhciBpLG8sYSxjLGw9MDt1fHwodT17fSk7dmFyIGY9ZnVuY3Rpb24oKXtsPSExPT09dS5sZWFkaW5nPzA6aC5ub3coKSxpPW51bGwsYz10LmFwcGx5KG8sYSksaXx8KG89YT1udWxsKX0sbj1mdW5jdGlvbigpe3ZhciBuPWgubm93KCk7bHx8ITEhPT11LmxlYWRpbmd8fChsPW4pO3ZhciByPWUtKG4tbCk7cmV0dXJuIG89dGhpcyxhPWFyZ3VtZW50cyxyPD0wfHxlPHI/KGkmJihjbGVhclRpbWVvdXQoaSksaT1udWxsKSxsPW4sYz10LmFwcGx5KG8sYSksaXx8KG89YT1udWxsKSk6aXx8ITE9PT11LnRyYWlsaW5nfHwoaT1zZXRUaW1lb3V0KGYscikpLGN9O3JldHVybiBuLmNhbmNlbD1mdW5jdGlvbigpe2NsZWFyVGltZW91dChpKSxsPTAsaT1vPWE9bnVsbH0sbn0saC5kZWJvdW5jZT1mdW5jdGlvbih0LGUsdSl7dmFyIGksbyxhPWZ1bmN0aW9uKG4scil7aT1udWxsLHImJihvPXQuYXBwbHkobixyKSl9LG49ZyhmdW5jdGlvbihuKXtpZihpJiZjbGVhclRpbWVvdXQoaSksdSl7dmFyIHI9IWk7aT1zZXRUaW1lb3V0KGEsZSksciYmKG89dC5hcHBseSh0aGlzLG4pKX1lbHNlIGk9aC5kZWxheShhLGUsdGhpcyxuKTtyZXR1cm4gb30pO3JldHVybiBuLmNhbmNlbD1mdW5jdGlvbigpe2NsZWFyVGltZW91dChpKSxpPW51bGx9LG59LGgud3JhcD1mdW5jdGlvbihuLHIpe3JldHVybiBoLnBhcnRpYWwocixuKX0saC5uZWdhdGU9ZnVuY3Rpb24obil7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIW4uYXBwbHkodGhpcyxhcmd1bWVudHMpfX0saC5jb21wb3NlPWZ1bmN0aW9uKCl7dmFyIHQ9YXJndW1lbnRzLGU9dC5sZW5ndGgtMTtyZXR1cm4gZnVuY3Rpb24oKXtmb3IodmFyIG49ZSxyPXRbZV0uYXBwbHkodGhpcyxhcmd1bWVudHMpO24tLTspcj10W25dLmNhbGwodGhpcyxyKTtyZXR1cm4gcn19LGguYWZ0ZXI9ZnVuY3Rpb24obixyKXtyZXR1cm4gZnVuY3Rpb24oKXtpZigtLW48MSlyZXR1cm4gci5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fSxoLmJlZm9yZT1mdW5jdGlvbihuLHIpe3ZhciB0O3JldHVybiBmdW5jdGlvbigpe3JldHVybiAwPC0tbiYmKHQ9ci5hcHBseSh0aGlzLGFyZ3VtZW50cykpLG48PTEmJihyPW51bGwpLHR9fSxoLm9uY2U9aC5wYXJ0aWFsKGguYmVmb3JlLDIpLGgucmVzdEFyZ3VtZW50cz1nO3ZhciBJPSF7dG9TdHJpbmc6bnVsbH0ucHJvcGVydHlJc0VudW1lcmFibGUoXCJ0b1N0cmluZ1wiKSxUPVtcInZhbHVlT2ZcIixcImlzUHJvdG90eXBlT2ZcIixcInRvU3RyaW5nXCIsXCJwcm9wZXJ0eUlzRW51bWVyYWJsZVwiLFwiaGFzT3duUHJvcGVydHlcIixcInRvTG9jYWxlU3RyaW5nXCJdLEI9ZnVuY3Rpb24obixyKXt2YXIgdD1ULmxlbmd0aCxlPW4uY29uc3RydWN0b3IsdT1oLmlzRnVuY3Rpb24oZSkmJmUucHJvdG90eXBlfHxvLGk9XCJjb25zdHJ1Y3RvclwiO2ZvcihqKG4saSkmJiFoLmNvbnRhaW5zKHIsaSkmJnIucHVzaChpKTt0LS07KShpPVRbdF0paW4gbiYmbltpXSE9PXVbaV0mJiFoLmNvbnRhaW5zKHIsaSkmJnIucHVzaChpKX07aC5rZXlzPWZ1bmN0aW9uKG4pe2lmKCFoLmlzT2JqZWN0KG4pKXJldHVybltdO2lmKGEpcmV0dXJuIGEobik7dmFyIHI9W107Zm9yKHZhciB0IGluIG4paihuLHQpJiZyLnB1c2godCk7cmV0dXJuIEkmJkIobixyKSxyfSxoLmFsbEtleXM9ZnVuY3Rpb24obil7aWYoIWguaXNPYmplY3QobikpcmV0dXJuW107dmFyIHI9W107Zm9yKHZhciB0IGluIG4pci5wdXNoKHQpO3JldHVybiBJJiZCKG4scikscn0saC52YWx1ZXM9ZnVuY3Rpb24obil7Zm9yKHZhciByPWgua2V5cyhuKSx0PXIubGVuZ3RoLGU9QXJyYXkodCksdT0wO3U8dDt1KyspZVt1XT1uW3JbdV1dO3JldHVybiBlfSxoLm1hcE9iamVjdD1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPWgua2V5cyhuKSx1PWUubGVuZ3RoLGk9e30sbz0wO288dTtvKyspe3ZhciBhPWVbb107aVthXT1yKG5bYV0sYSxuKX1yZXR1cm4gaX0saC5wYWlycz1mdW5jdGlvbihuKXtmb3IodmFyIHI9aC5rZXlzKG4pLHQ9ci5sZW5ndGgsZT1BcnJheSh0KSx1PTA7dTx0O3UrKyllW3VdPVtyW3VdLG5bclt1XV1dO3JldHVybiBlfSxoLmludmVydD1mdW5jdGlvbihuKXtmb3IodmFyIHI9e30sdD1oLmtleXMobiksZT0wLHU9dC5sZW5ndGg7ZTx1O2UrKylyW25bdFtlXV1dPXRbZV07cmV0dXJuIHJ9LGguZnVuY3Rpb25zPWgubWV0aG9kcz1mdW5jdGlvbihuKXt2YXIgcj1bXTtmb3IodmFyIHQgaW4gbiloLmlzRnVuY3Rpb24oblt0XSkmJnIucHVzaCh0KTtyZXR1cm4gci5zb3J0KCl9O3ZhciBSPWZ1bmN0aW9uKGMsbCl7cmV0dXJuIGZ1bmN0aW9uKG4pe3ZhciByPWFyZ3VtZW50cy5sZW5ndGg7aWYobCYmKG49T2JqZWN0KG4pKSxyPDJ8fG51bGw9PW4pcmV0dXJuIG47Zm9yKHZhciB0PTE7dDxyO3QrKylmb3IodmFyIGU9YXJndW1lbnRzW3RdLHU9YyhlKSxpPXUubGVuZ3RoLG89MDtvPGk7bysrKXt2YXIgYT11W29dO2wmJnZvaWQgMCE9PW5bYV18fChuW2FdPWVbYV0pfXJldHVybiBufX07aC5leHRlbmQ9UihoLmFsbEtleXMpLGguZXh0ZW5kT3duPWguYXNzaWduPVIoaC5rZXlzKSxoLmZpbmRLZXk9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZSx1PWgua2V5cyhuKSxpPTAsbz11Lmxlbmd0aDtpPG87aSsrKWlmKHIobltlPXVbaV1dLGUsbikpcmV0dXJuIGV9O3ZhciBxLEssej1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIHIgaW4gdH07aC5waWNrPWcoZnVuY3Rpb24obixyKXt2YXIgdD17fSxlPXJbMF07aWYobnVsbD09bilyZXR1cm4gdDtoLmlzRnVuY3Rpb24oZSk/KDE8ci5sZW5ndGgmJihlPXkoZSxyWzFdKSkscj1oLmFsbEtleXMobikpOihlPXoscj1NKHIsITEsITEpLG49T2JqZWN0KG4pKTtmb3IodmFyIHU9MCxpPXIubGVuZ3RoO3U8aTt1Kyspe3ZhciBvPXJbdV0sYT1uW29dO2UoYSxvLG4pJiYodFtvXT1hKX1yZXR1cm4gdH0pLGgub21pdD1nKGZ1bmN0aW9uKG4sdCl7dmFyIHIsZT10WzBdO3JldHVybiBoLmlzRnVuY3Rpb24oZSk/KGU9aC5uZWdhdGUoZSksMTx0Lmxlbmd0aCYmKHI9dFsxXSkpOih0PWgubWFwKE0odCwhMSwhMSksU3RyaW5nKSxlPWZ1bmN0aW9uKG4scil7cmV0dXJuIWguY29udGFpbnModCxyKX0pLGgucGljayhuLGUscil9KSxoLmRlZmF1bHRzPVIoaC5hbGxLZXlzLCEwKSxoLmNyZWF0ZT1mdW5jdGlvbihuLHIpe3ZhciB0PW0obik7cmV0dXJuIHImJmguZXh0ZW5kT3duKHQsciksdH0saC5jbG9uZT1mdW5jdGlvbihuKXtyZXR1cm4gaC5pc09iamVjdChuKT9oLmlzQXJyYXkobik/bi5zbGljZSgpOmguZXh0ZW5kKHt9LG4pOm59LGgudGFwPWZ1bmN0aW9uKG4scil7cmV0dXJuIHIobiksbn0saC5pc01hdGNoPWZ1bmN0aW9uKG4scil7dmFyIHQ9aC5rZXlzKHIpLGU9dC5sZW5ndGg7aWYobnVsbD09bilyZXR1cm4hZTtmb3IodmFyIHU9T2JqZWN0KG4pLGk9MDtpPGU7aSsrKXt2YXIgbz10W2ldO2lmKHJbb10hPT11W29dfHwhKG8gaW4gdSkpcmV0dXJuITF9cmV0dXJuITB9LHE9ZnVuY3Rpb24obixyLHQsZSl7aWYobj09PXIpcmV0dXJuIDAhPT1ufHwxL249PTEvcjtpZihudWxsPT1ufHxudWxsPT1yKXJldHVybiExO2lmKG4hPW4pcmV0dXJuIHIhPXI7dmFyIHU9dHlwZW9mIG47cmV0dXJuKFwiZnVuY3Rpb25cIj09PXV8fFwib2JqZWN0XCI9PT11fHxcIm9iamVjdFwiPT10eXBlb2YgcikmJksobixyLHQsZSl9LEs9ZnVuY3Rpb24obixyLHQsZSl7biBpbnN0YW5jZW9mIGgmJihuPW4uX3dyYXBwZWQpLHIgaW5zdGFuY2VvZiBoJiYocj1yLl93cmFwcGVkKTt2YXIgdT1wLmNhbGwobik7aWYodSE9PXAuY2FsbChyKSlyZXR1cm4hMTtzd2l0Y2godSl7Y2FzZVwiW29iamVjdCBSZWdFeHBdXCI6Y2FzZVwiW29iamVjdCBTdHJpbmddXCI6cmV0dXJuXCJcIituPT1cIlwiK3I7Y2FzZVwiW29iamVjdCBOdW1iZXJdXCI6cmV0dXJuK24hPStuPytyIT0rcjowPT0rbj8xLytuPT0xL3I6K249PStyO2Nhc2VcIltvYmplY3QgRGF0ZV1cIjpjYXNlXCJbb2JqZWN0IEJvb2xlYW5dXCI6cmV0dXJuK249PStyO2Nhc2VcIltvYmplY3QgU3ltYm9sXVwiOnJldHVybiBzLnZhbHVlT2YuY2FsbChuKT09PXMudmFsdWVPZi5jYWxsKHIpfXZhciBpPVwiW29iamVjdCBBcnJheV1cIj09PXU7aWYoIWkpe2lmKFwib2JqZWN0XCIhPXR5cGVvZiBufHxcIm9iamVjdFwiIT10eXBlb2YgcilyZXR1cm4hMTt2YXIgbz1uLmNvbnN0cnVjdG9yLGE9ci5jb25zdHJ1Y3RvcjtpZihvIT09YSYmIShoLmlzRnVuY3Rpb24obykmJm8gaW5zdGFuY2VvZiBvJiZoLmlzRnVuY3Rpb24oYSkmJmEgaW5zdGFuY2VvZiBhKSYmXCJjb25zdHJ1Y3RvclwiaW4gbiYmXCJjb25zdHJ1Y3RvclwiaW4gcilyZXR1cm4hMX1lPWV8fFtdO2Zvcih2YXIgYz0odD10fHxbXSkubGVuZ3RoO2MtLTspaWYodFtjXT09PW4pcmV0dXJuIGVbY109PT1yO2lmKHQucHVzaChuKSxlLnB1c2gociksaSl7aWYoKGM9bi5sZW5ndGgpIT09ci5sZW5ndGgpcmV0dXJuITE7Zm9yKDtjLS07KWlmKCFxKG5bY10scltjXSx0LGUpKXJldHVybiExfWVsc2V7dmFyIGwsZj1oLmtleXMobik7aWYoYz1mLmxlbmd0aCxoLmtleXMocikubGVuZ3RoIT09YylyZXR1cm4hMTtmb3IoO2MtLTspaWYobD1mW2NdLCFqKHIsbCl8fCFxKG5bbF0scltsXSx0LGUpKXJldHVybiExfXJldHVybiB0LnBvcCgpLGUucG9wKCksITB9LGguaXNFcXVhbD1mdW5jdGlvbihuLHIpe3JldHVybiBxKG4scil9LGguaXNFbXB0eT1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09bnx8KHcobikmJihoLmlzQXJyYXkobil8fGguaXNTdHJpbmcobil8fGguaXNBcmd1bWVudHMobikpPzA9PT1uLmxlbmd0aDowPT09aC5rZXlzKG4pLmxlbmd0aCl9LGguaXNFbGVtZW50PWZ1bmN0aW9uKG4pe3JldHVybiEoIW58fDEhPT1uLm5vZGVUeXBlKX0saC5pc0FycmF5PXR8fGZ1bmN0aW9uKG4pe3JldHVyblwiW29iamVjdCBBcnJheV1cIj09PXAuY2FsbChuKX0saC5pc09iamVjdD1mdW5jdGlvbihuKXt2YXIgcj10eXBlb2YgbjtyZXR1cm5cImZ1bmN0aW9uXCI9PT1yfHxcIm9iamVjdFwiPT09ciYmISFufSxoLmVhY2goW1wiQXJndW1lbnRzXCIsXCJGdW5jdGlvblwiLFwiU3RyaW5nXCIsXCJOdW1iZXJcIixcIkRhdGVcIixcIlJlZ0V4cFwiLFwiRXJyb3JcIixcIlN5bWJvbFwiLFwiTWFwXCIsXCJXZWFrTWFwXCIsXCJTZXRcIixcIldlYWtTZXRcIl0sZnVuY3Rpb24ocil7aFtcImlzXCIrcl09ZnVuY3Rpb24obil7cmV0dXJuIHAuY2FsbChuKT09PVwiW29iamVjdCBcIityK1wiXVwifX0pLGguaXNBcmd1bWVudHMoYXJndW1lbnRzKXx8KGguaXNBcmd1bWVudHM9ZnVuY3Rpb24obil7cmV0dXJuIGoobixcImNhbGxlZVwiKX0pO3ZhciBEPW4uZG9jdW1lbnQmJm4uZG9jdW1lbnQuY2hpbGROb2RlcztcImZ1bmN0aW9uXCIhPXR5cGVvZi8uLyYmXCJvYmplY3RcIiE9dHlwZW9mIEludDhBcnJheSYmXCJmdW5jdGlvblwiIT10eXBlb2YgRCYmKGguaXNGdW5jdGlvbj1mdW5jdGlvbihuKXtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBufHwhMX0pLGguaXNGaW5pdGU9ZnVuY3Rpb24obil7cmV0dXJuIWguaXNTeW1ib2wobikmJmlzRmluaXRlKG4pJiYhaXNOYU4ocGFyc2VGbG9hdChuKSl9LGguaXNOYU49ZnVuY3Rpb24obil7cmV0dXJuIGguaXNOdW1iZXIobikmJmlzTmFOKG4pfSxoLmlzQm9vbGVhbj1mdW5jdGlvbihuKXtyZXR1cm4hMD09PW58fCExPT09bnx8XCJbb2JqZWN0IEJvb2xlYW5dXCI9PT1wLmNhbGwobil9LGguaXNOdWxsPWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT09bn0saC5pc1VuZGVmaW5lZD1mdW5jdGlvbihuKXtyZXR1cm4gdm9pZCAwPT09bn0saC5oYXM9ZnVuY3Rpb24obixyKXtpZighaC5pc0FycmF5KHIpKXJldHVybiBqKG4scik7Zm9yKHZhciB0PXIubGVuZ3RoLGU9MDtlPHQ7ZSsrKXt2YXIgdT1yW2VdO2lmKG51bGw9PW58fCFpLmNhbGwobix1KSlyZXR1cm4hMTtuPW5bdV19cmV0dXJuISF0fSxoLm5vQ29uZmxpY3Q9ZnVuY3Rpb24oKXtyZXR1cm4gbi5fPXIsdGhpc30saC5pZGVudGl0eT1mdW5jdGlvbihuKXtyZXR1cm4gbn0saC5jb25zdGFudD1mdW5jdGlvbihuKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gbn19LGgubm9vcD1mdW5jdGlvbigpe30saC5wcm9wZXJ0eT1mdW5jdGlvbihyKXtyZXR1cm4gaC5pc0FycmF5KHIpP2Z1bmN0aW9uKG4pe3JldHVybiB4KG4scil9OmIocil9LGgucHJvcGVydHlPZj1mdW5jdGlvbihyKXtyZXR1cm4gbnVsbD09cj9mdW5jdGlvbigpe306ZnVuY3Rpb24obil7cmV0dXJuIGguaXNBcnJheShuKT94KHIsbik6cltuXX19LGgubWF0Y2hlcj1oLm1hdGNoZXM9ZnVuY3Rpb24ocil7cmV0dXJuIHI9aC5leHRlbmRPd24oe30sciksZnVuY3Rpb24obil7cmV0dXJuIGguaXNNYXRjaChuLHIpfX0saC50aW1lcz1mdW5jdGlvbihuLHIsdCl7dmFyIGU9QXJyYXkoTWF0aC5tYXgoMCxuKSk7cj15KHIsdCwxKTtmb3IodmFyIHU9MDt1PG47dSsrKWVbdV09cih1KTtyZXR1cm4gZX0saC5yYW5kb209ZnVuY3Rpb24obixyKXtyZXR1cm4gbnVsbD09ciYmKHI9bixuPTApLG4rTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKihyLW4rMSkpfSxoLm5vdz1EYXRlLm5vd3x8ZnVuY3Rpb24oKXtyZXR1cm4obmV3IERhdGUpLmdldFRpbWUoKX07dmFyIEw9e1wiJlwiOlwiJmFtcDtcIixcIjxcIjpcIiZsdDtcIixcIj5cIjpcIiZndDtcIiwnXCInOlwiJnF1b3Q7XCIsXCInXCI6XCImI3gyNztcIixcImBcIjpcIiYjeDYwO1wifSxQPWguaW52ZXJ0KEwpLFc9ZnVuY3Rpb24ocil7dmFyIHQ9ZnVuY3Rpb24obil7cmV0dXJuIHJbbl19LG49XCIoPzpcIitoLmtleXMocikuam9pbihcInxcIikrXCIpXCIsZT1SZWdFeHAobiksdT1SZWdFeHAobixcImdcIik7cmV0dXJuIGZ1bmN0aW9uKG4pe3JldHVybiBuPW51bGw9PW4/XCJcIjpcIlwiK24sZS50ZXN0KG4pP24ucmVwbGFjZSh1LHQpOm59fTtoLmVzY2FwZT1XKEwpLGgudW5lc2NhcGU9VyhQKSxoLnJlc3VsdD1mdW5jdGlvbihuLHIsdCl7aC5pc0FycmF5KHIpfHwocj1bcl0pO3ZhciBlPXIubGVuZ3RoO2lmKCFlKXJldHVybiBoLmlzRnVuY3Rpb24odCk/dC5jYWxsKG4pOnQ7Zm9yKHZhciB1PTA7dTxlO3UrKyl7dmFyIGk9bnVsbD09bj92b2lkIDA6bltyW3VdXTt2b2lkIDA9PT1pJiYoaT10LHU9ZSksbj1oLmlzRnVuY3Rpb24oaSk/aS5jYWxsKG4pOml9cmV0dXJuIG59O3ZhciBDPTA7aC51bmlxdWVJZD1mdW5jdGlvbihuKXt2YXIgcj0rK0MrXCJcIjtyZXR1cm4gbj9uK3I6cn0saC50ZW1wbGF0ZVNldHRpbmdzPXtldmFsdWF0ZTovPCUoW1xcc1xcU10rPyklPi9nLGludGVycG9sYXRlOi88JT0oW1xcc1xcU10rPyklPi9nLGVzY2FwZTovPCUtKFtcXHNcXFNdKz8pJT4vZ307dmFyIEo9LyguKV4vLFU9e1wiJ1wiOlwiJ1wiLFwiXFxcXFwiOlwiXFxcXFwiLFwiXFxyXCI6XCJyXCIsXCJcXG5cIjpcIm5cIixcIlxcdTIwMjhcIjpcInUyMDI4XCIsXCJcXHUyMDI5XCI6XCJ1MjAyOVwifSxWPS9cXFxcfCd8XFxyfFxcbnxcXHUyMDI4fFxcdTIwMjkvZywkPWZ1bmN0aW9uKG4pe3JldHVyblwiXFxcXFwiK1Vbbl19O2gudGVtcGxhdGU9ZnVuY3Rpb24oaSxuLHIpeyFuJiZyJiYobj1yKSxuPWguZGVmYXVsdHMoe30sbixoLnRlbXBsYXRlU2V0dGluZ3MpO3ZhciB0LGU9UmVnRXhwKFsobi5lc2NhcGV8fEopLnNvdXJjZSwobi5pbnRlcnBvbGF0ZXx8Sikuc291cmNlLChuLmV2YWx1YXRlfHxKKS5zb3VyY2VdLmpvaW4oXCJ8XCIpK1wifCRcIixcImdcIiksbz0wLGE9XCJfX3ArPSdcIjtpLnJlcGxhY2UoZSxmdW5jdGlvbihuLHIsdCxlLHUpe3JldHVybiBhKz1pLnNsaWNlKG8sdSkucmVwbGFjZShWLCQpLG89dStuLmxlbmd0aCxyP2ErPVwiJytcXG4oKF9fdD0oXCIrcitcIikpPT1udWxsPycnOl8uZXNjYXBlKF9fdCkpK1xcbidcIjp0P2ErPVwiJytcXG4oKF9fdD0oXCIrdCtcIikpPT1udWxsPycnOl9fdCkrXFxuJ1wiOmUmJihhKz1cIic7XFxuXCIrZStcIlxcbl9fcCs9J1wiKSxufSksYSs9XCInO1xcblwiLG4udmFyaWFibGV8fChhPVwid2l0aChvYmp8fHt9KXtcXG5cIithK1wifVxcblwiKSxhPVwidmFyIF9fdCxfX3A9JycsX19qPUFycmF5LnByb3RvdHlwZS5qb2luLFwiK1wicHJpbnQ9ZnVuY3Rpb24oKXtfX3ArPV9fai5jYWxsKGFyZ3VtZW50cywnJyk7fTtcXG5cIithK1wicmV0dXJuIF9fcDtcXG5cIjt0cnl7dD1uZXcgRnVuY3Rpb24obi52YXJpYWJsZXx8XCJvYmpcIixcIl9cIixhKX1jYXRjaChuKXt0aHJvdyBuLnNvdXJjZT1hLG59dmFyIHU9ZnVuY3Rpb24obil7cmV0dXJuIHQuY2FsbCh0aGlzLG4saCl9LGM9bi52YXJpYWJsZXx8XCJvYmpcIjtyZXR1cm4gdS5zb3VyY2U9XCJmdW5jdGlvbihcIitjK1wiKXtcXG5cIithK1wifVwiLHV9LGguY2hhaW49ZnVuY3Rpb24obil7dmFyIHI9aChuKTtyZXR1cm4gci5fY2hhaW49ITAscn07dmFyIEc9ZnVuY3Rpb24obixyKXtyZXR1cm4gbi5fY2hhaW4/aChyKS5jaGFpbigpOnJ9O2gubWl4aW49ZnVuY3Rpb24odCl7cmV0dXJuIGguZWFjaChoLmZ1bmN0aW9ucyh0KSxmdW5jdGlvbihuKXt2YXIgcj1oW25dPXRbbl07aC5wcm90b3R5cGVbbl09ZnVuY3Rpb24oKXt2YXIgbj1bdGhpcy5fd3JhcHBlZF07cmV0dXJuIHUuYXBwbHkobixhcmd1bWVudHMpLEcodGhpcyxyLmFwcGx5KGgsbikpfX0pLGh9LGgubWl4aW4oaCksaC5lYWNoKFtcInBvcFwiLFwicHVzaFwiLFwicmV2ZXJzZVwiLFwic2hpZnRcIixcInNvcnRcIixcInNwbGljZVwiLFwidW5zaGlmdFwiXSxmdW5jdGlvbihyKXt2YXIgdD1lW3JdO2gucHJvdG90eXBlW3JdPWZ1bmN0aW9uKCl7dmFyIG49dGhpcy5fd3JhcHBlZDtyZXR1cm4gdC5hcHBseShuLGFyZ3VtZW50cyksXCJzaGlmdFwiIT09ciYmXCJzcGxpY2VcIiE9PXJ8fDAhPT1uLmxlbmd0aHx8ZGVsZXRlIG5bMF0sRyh0aGlzLG4pfX0pLGguZWFjaChbXCJjb25jYXRcIixcImpvaW5cIixcInNsaWNlXCJdLGZ1bmN0aW9uKG4pe3ZhciByPWVbbl07aC5wcm90b3R5cGVbbl09ZnVuY3Rpb24oKXtyZXR1cm4gRyh0aGlzLHIuYXBwbHkodGhpcy5fd3JhcHBlZCxhcmd1bWVudHMpKX19KSxoLnByb3RvdHlwZS52YWx1ZT1mdW5jdGlvbigpe3JldHVybiB0aGlzLl93cmFwcGVkfSxoLnByb3RvdHlwZS52YWx1ZU9mPWgucHJvdG90eXBlLnRvSlNPTj1oLnByb3RvdHlwZS52YWx1ZSxoLnByb3RvdHlwZS50b1N0cmluZz1mdW5jdGlvbigpe3JldHVybiBTdHJpbmcodGhpcy5fd3JhcHBlZCl9LFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZCYmZGVmaW5lKFwidW5kZXJzY29yZVwiLFtdLGZ1bmN0aW9uKCl7cmV0dXJuIGh9KX0oKTtcbiIsImltcG9ydCB7ZXh0cmFjdEV4dGVuc2lvbn0gZnJvbSBcInV0aWxzL3N0cmluZ3NcIjtcblxuZXhwb3J0IGNvbnN0IGlzUnRtcCA9IGZ1bmN0aW9uIChmaWxlLCB0eXBlKSB7XG4gICAgcmV0dXJuIChmaWxlLmluZGV4T2YoJ3J0bXA6JykgPT0gMCB8fCB0eXBlID09ICdydG1wJyk7XG59O1xuZXhwb3J0IGNvbnN0IGlzV2ViUlRDID0gZnVuY3Rpb24gKGZpbGUsIHR5cGUpIHtcbiAgICBpZihmaWxlKXtcbiAgICAgICAgcmV0dXJuIChmaWxlLmluZGV4T2YoJ3dzOicpID09PSAwIHx8IGZpbGUuaW5kZXhPZignd3NzOicpID09PSAwIHx8IHR5cGUgPT09ICd3ZWJydGMnKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcbmV4cG9ydCBjb25zdCBpc0Rhc2ggPSBmdW5jdGlvbiAoZmlsZSwgdHlwZSkge1xuICAgIHJldHVybiAoIHR5cGUgPT09ICdtcGQnIHx8ICB0eXBlID09PSAnZGFzaCcgfHwgdHlwZSA9PT0gJ2FwcGxpY2F0aW9uL2Rhc2greG1sJyB8fCBleHRyYWN0RXh0ZW5zaW9uKGZpbGUpID09ICdtcGQnKTtcbn07XG4iLCIvKipcbiAqIHV0aWxzIGZvciB3ZWJwYWNrXG4gKi9cblxuZXhwb3J0IGNvbnN0IGdldFNjcmlwdFBhdGggPSBmdW5jdGlvbihzY3JpcHROYW1lKSB7XG4gICAgY29uc3Qgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNjcmlwdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3JjID0gc2NyaXB0c1tpXS5zcmM7XG4gICAgICAgIGlmIChzcmMpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gc3JjLmxhc3RJbmRleE9mKCcvJyArIHNjcmlwdE5hbWUpO1xuICAgICAgICAgICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3JjLnN1YnN0cigwLCBpbmRleCArIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAnJztcbn07XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiAyOS4uXG4gKi9cbmV4cG9ydCBjb25zdCB2ZXJzaW9uID0gX19WRVJTSU9OX187XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAyNi4uXG4gKi9cbmltcG9ydCBPdmVuVGVtcGxhdGUgZnJvbSAndmlldy9lbmdpbmUvT3ZlblRlbXBsYXRlJztcbmltcG9ydCBMQSQgZnJvbSAndXRpbHMvbGlrZUEkJztcblxuY29uc3QgRnVsbFNjcmVlbkJ1dHRvbiA9IGZ1bmN0aW9uKCRjb250YWluZXIsIGFwaSl7XG4gICAgY29uc3QgJHJvb3QgPSBMQSQoXCIjXCIrYXBpLmdldElkKCkpO1xuICAgIGxldCAkaWNvbkV4cGFuZCA9IFwiXCIsICRpY29uQ29tcHJlc3MgPSBcIlwiLCBpc0Z1bGxTY3JlZW4gPSBmYWxzZTtcblxuICAgIGxldCBmdWxsU2NyZWVuRXZlbnRUeXBlcyA9IHtcbiAgICAgICAgb25mdWxsc2NyZWVuY2hhbmdlIDogXCJmdWxsc2NyZWVuY2hhbmdlXCIsXG4gICAgICAgIG9ubW96ZnVsbHNjcmVlbmNoYW5nZSA6IFwibW96ZnVsbHNjcmVlbmNoYW5nZVwiLFxuICAgICAgICBvbndlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UgOiBcIndlYmtpdGZ1bGxzY3JlZW5jaGFuZ2VcIixcbiAgICAgICAgTVNGdWxsc2NyZWVuQ2hhbmdlIDogXCJNU0Z1bGxzY3JlZW5DaGFuZ2VcIlxuICAgIH07XG5cbiAgICBsZXQgZnVsbFNjcmVlbkNoYW5nZWRDYWxsYmFjayA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgbGV0IGNoZWNrRnVsbFNjcmVlbiA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuZnVsbHNjcmVlbkVsZW1lbnQgfHwgZG9jdW1lbnQud2Via2l0RnVsbHNjcmVlbkVsZW1lbnQgfHwgZG9jdW1lbnQubW96RnVsbFNjcmVlbkVsZW1lbnQgfHwgZG9jdW1lbnQubXNGdWxsc2NyZWVuRWxlbWVudDtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoY2hlY2tGdWxsU2NyZWVuKCkpIHtcbiAgICAgICAgICAgICRyb290LmFkZENsYXNzKFwib3ZwLWZ1bGxzY3JlZW5cIik7XG4gICAgICAgICAgICBpc0Z1bGxTY3JlZW4gPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHJvb3QucmVtb3ZlQ2xhc3MoXCJvdnAtZnVsbHNjcmVlblwiKTtcbiAgICAgICAgICAgIGlzRnVsbFNjcmVlbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGxldCByZXF1ZXN0RnVsbFNjcmVlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCRyb290LmdldCgpLnJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICAkcm9vdC5nZXQoKS5yZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKCRyb290LmdldCgpLndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICAkcm9vdC5nZXQoKS53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKCRyb290LmdldCgpLm1velJlcXVlc3RGdWxsU2NyZWVuKSB7XG4gICAgICAgICAgICAkcm9vdC5nZXQoKS5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKCRyb290LmdldCgpLm1zUmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgICRyb290LmdldCgpLm1zUmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFRPRE8ocm9jayk6IHdhcm4gbm90IHN1cHBvcnRlZFxuICAgICAgICB9XG4gICAgfTtcbiAgICBsZXQgZXhpdEZ1bGxTY3JlZW4gPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5leGl0RnVsbHNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICBkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgICAgIGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5tc0V4aXRGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5tc0V4aXRGdWxsc2NyZWVuKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBUT0RPKHJvY2spOiB3YXJuIG5vdCBzdXBwb3J0ZWRcbiAgICAgICAgfVxuICAgIH1cbiAgICBsZXQgdG9nZ2xlRnVsbFNjcmVlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFpc0Z1bGxTY3JlZW4pIHtcbiAgICAgICAgICAgIHJlcXVlc3RGdWxsU2NyZWVuKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBleGl0RnVsbFNjcmVlbigpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IG9uUmVuZGVyZWQgPSBmdW5jdGlvbigkY3VycmVudCwgdGVtcGxhdGUpe1xuICAgICAgICAkaWNvbkV4cGFuZCA9ICRjdXJyZW50LmZpbmQoJy5vdnAtZnVsbHNjcmVlbi1idXR0b24tZXhwYW5kaWNvbicpO1xuICAgICAgICAkaWNvbkNvbXByZXNzID0gJGN1cnJlbnQuZmluZCgnLm92cC1mdWxsc2NyZWVuLWJ1dHRvbi1jb21wcmVzc2ljb24nKTtcblxuICAgICAgICAvL0JpbmQgR2xvYmFsKGRvY3VtZW50KSBFdmVudFxuICAgICAgICBPYmplY3Qua2V5cyhmdWxsU2NyZWVuRXZlbnRUeXBlcykuZm9yRWFjaChldmVudE5hbWUgPT4ge1xuICAgICAgICAgICAgLy9EaWZmZXJlbmNlIGJldHdlZW4gdW5kZWZpbmVkIGFuZCBudWxsLlxuICAgICAgICAgICAgLy91bmRlZmluZWQgaXMgbm90IHN1cHBvcnQuIG51bGwgaXMgc3VwcG9ydCBidXQgbm90IGluaXRlZC5cbiAgICAgICAgICAgIGlmKGRvY3VtZW50W2V2ZW50TmFtZV0gPT09IG51bGwpe1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoZnVsbFNjcmVlbkV2ZW50VHlwZXNbZXZlbnROYW1lXSwgZnVsbFNjcmVlbkNoYW5nZWRDYWxsYmFjayk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICB9O1xuICAgIGNvbnN0IG9uRGVzdHJveWVkID0gZnVuY3Rpb24oKXtcbiAgICAgICAgLy9VbmJpbmQgR2xvYmFsKGRvY3VtZW50KSBFdmVudFxuICAgICAgICBPYmplY3Qua2V5cyhmdWxsU2NyZWVuRXZlbnRUeXBlcykuZm9yRWFjaChldmVudE5hbWUgPT4ge1xuICAgICAgICAgICAgaWYoZG9jdW1lbnRbZXZlbnROYW1lXSA9PT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihmdWxsU2NyZWVuRXZlbnRUeXBlc1tldmVudE5hbWVdLCBmdWxsU2NyZWVuQ2hhbmdlZENhbGxiYWNrKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIGNvbnN0IGV2ZW50cyA9IHtcbiAgICAgICAgXCJjbGljayAub3ZwLWZ1bGxzY3JlZW4tYnV0dG9uXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0b2dnbGVGdWxsU2NyZWVuKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIE92ZW5UZW1wbGF0ZSgkY29udGFpbmVyLCBcIkZ1bGxTY3JlZW5CdXR0b25cIiwgbnVsbCwgZXZlbnRzLCBvblJlbmRlcmVkLCBvbkRlc3Ryb3llZCApO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBGdWxsU2NyZWVuQnV0dG9uOyIsImV4cG9ydCBkZWZhdWx0ICgpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgICAnPGJ1dHRvbiBjbGFzcz1cIm92cC1idXR0b24gb3ZwLWZ1bGxzY3JlZW4tYnV0dG9uXCI+JyArXG4gICAgICAgICAgICAnPGkgY2xhc3M9XCJvdnAtZnVsbHNjcmVlbi1idXR0b24tZXhwYW5kaWNvblwiPjwvaT4nICtcbiAgICAgICAgICAgICc8aSBjbGFzcz1cIm92cC1mdWxsc2NyZWVuLWJ1dHRvbi1jb21wcmVzc2ljb25cIj48L2k+JyArXG4gICAgICAgICc8L2J1dHRvbj4nXG4gICAgKTtcbn07XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAyMC4uXG4gKi9cbmltcG9ydCBPdmVuVGVtcGxhdGUgZnJvbSAndmlldy9lbmdpbmUvT3ZlblRlbXBsYXRlJztcbmltcG9ydCBQbGF5QnV0dG9uIGZyb20gJ3ZpZXcvY29udHJvbHMvcGxheUJ1dHRvbic7XG5pbXBvcnQgVm9sdW1lQnV0dG9uIGZyb20gJ3ZpZXcvY29udHJvbHMvdm9sdW1lQnV0dG9uJztcbmltcG9ydCBQcm9ncmVzc0JhciBmcm9tICd2aWV3L2NvbnRyb2xzL3Byb2dyZXNzQmFyJztcbmltcG9ydCBUaW1lRGlzcGxheSBmcm9tICd2aWV3L2NvbnRyb2xzL3RpbWVEaXNwbGF5JztcbmltcG9ydCBGdWxsU2NyZWVuQnV0dG9uIGZyb20gJ3ZpZXcvY29udHJvbHMvZnVsbFNjcmVlbkJ1dHRvbic7XG5pbXBvcnQgU2V0dGluZ1BhbmVsIGZyb20gJ3ZpZXcvY29udHJvbHMvc2V0dGluZ1BhbmVsJztcbmltcG9ydCBTZXR0aW5nUGFuZWxMaXN0IGZyb20gJ3ZpZXcvZ2xvYmFsL1NldHRpbmdQYW5lbExpc3QnO1xuaW1wb3J0IF8gZnJvbSAndXRpbHMvdW5kZXJzY29yZSc7XG5pbXBvcnQge1xuICAgIFJFQURZLFxuICAgIENPTlRFTlRfTUVUQSxcbiAgICBFUlJPUlxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG5jb25zdCBDb250cm9scyA9IGZ1bmN0aW9uKCRjb250YWluZXIsIGFwaSl7XG4gICAgbGV0IHZvbHVtZUJ1dHRvbiA9IFwiXCIsIHBsYXlCdXR0b249IFwiXCIsIHByb2dyZXNzQmFyID0gXCJcIiwgdGltZURpc3BsYXkgPSBcIlwiLCBmdWxsU2NyZWVuQnV0dG9uID0gXCJcIjtcblxuICAgIGxldCBnZW5lcmF0ZU1haW5QYW5lbERhdGEgPSBmdW5jdGlvbigpe1xuICAgICAgICBsZXQgcGFuZWwgPSB7dGl0bGUgOiBcIlNldHRpbmdzXCIsIGlzTWFpbiA6IHRydWUsIGJvZHkgOiBbXX07XG4gICAgICAgIGlmKGFwaS5nZXREdXJhdGlvbigpICE9PSBJbmZpbml0eSl7XG4gICAgICAgICAgICBsZXQgYm9keSA9IHtcbiAgICAgICAgICAgICAgICB0aXRsZSA6IFwiU3BlZWRcIixcbiAgICAgICAgICAgICAgICB2YWx1ZSA6ICBhcGkuZ2V0UGxheWJhY2tSYXRlKCkgPT09IDEgPyBcIk5vcm1hbFwiIDogYXBpLmdldFBsYXliYWNrUmF0ZSgpLFxuICAgICAgICAgICAgICAgIHR5cGUgOiBcInBsYXliYWNrcmF0ZVwiXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcGFuZWwuYm9keS5wdXNoKGJvZHkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFwaS5nZXRRdWFsaXR5TGV2ZWxzKCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IHF1YWxpdHlMZXZlbHMgPSBhcGkuZ2V0UXVhbGl0eUxldmVscygpO1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRRdWFsaXR5ID0gYXBpLmdldEN1cnJlbnRRdWFsaXR5KCk7XG5cbiAgICAgICAgICAgIGxldCBib2R5ID0ge1xuICAgICAgICAgICAgICAgIHRpdGxlIDogXCJTb3VyY2VcIixcbiAgICAgICAgICAgICAgICB2YWx1ZSA6IHF1YWxpdHlMZXZlbHNbY3VycmVudFF1YWxpdHldID8gcXVhbGl0eUxldmVsc1tjdXJyZW50UXVhbGl0eV0ubGFiZWwgOiBcIkRlZmF1bHRcIixcbiAgICAgICAgICAgICAgICB0eXBlIDogXCJxdWFsaXR5bGV2ZWxcIlxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcGFuZWwuYm9keS5wdXNoKGJvZHkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYW5lbDtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25SZW5kZXJlZCA9IGZ1bmN0aW9uKCRjdXJyZW50LCB0ZW1wbGF0ZSl7XG5cbiAgICAgICAgbGV0IGluaXRUaW1lRGlzcGxheSA9IGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgICAgaWYodGltZURpc3BsYXkpe1xuICAgICAgICAgICAgICAgIHRpbWVEaXNwbGF5LmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRpbWVEaXNwbGF5ID0gVGltZURpc3BsYXkoJGN1cnJlbnQuZmluZChcIi5vdnAtbGVmdC1jb250cm9sc1wiKSwgYXBpLCBkYXRhKTtcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IGluaXRQcm9ncmVzc0JhciA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpZihwcm9ncmVzc0Jhcil7XG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NCYXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJvZ3Jlc3NCYXIgPSBQcm9ncmVzc0JhcigkY3VycmVudC5maW5kKFwiLm92cC1wcm9ncmVzc2Jhci1jb250YWluZXJcIiksIGFwaSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcGxheUJ1dHRvbiA9IFBsYXlCdXR0b24oJGN1cnJlbnQuZmluZChcIi5vdnAtbGVmdC1jb250cm9sc1wiKSwgYXBpKTtcbiAgICAgICAgdm9sdW1lQnV0dG9uID0gVm9sdW1lQnV0dG9uKCRjdXJyZW50LmZpbmQoXCIub3ZwLWxlZnQtY29udHJvbHNcIiksIGFwaSk7XG4gICAgICAgIGZ1bGxTY3JlZW5CdXR0b24gPSBGdWxsU2NyZWVuQnV0dG9uKCRjdXJyZW50LmZpbmQoXCIub3ZwLXJpZ2h0LWNvbnRyb2xzXCIpLCBhcGkpO1xuXG5cbiAgICAgICAgYXBpLm9uKENPTlRFTlRfTUVUQSwgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgaW5pdFRpbWVEaXNwbGF5KGRhdGEpO1xuICAgICAgICAgICAgaWYoZGF0YS5kdXJhdGlvbiA9PT0gSW5maW5pdHkpe1xuICAgICAgICAgICAgICAgIC8vbGl2ZVxuICAgICAgICAgICAgICAgIGlmKHByb2dyZXNzQmFyKXtcbiAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3NCYXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIC8vdm9kXG4gICAgICAgICAgICAgICAgaW5pdFByb2dyZXNzQmFyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBhcGkub24oRVJST1IsIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZS5kZXN0cm95KCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgY29uc3Qgb25EZXN0cm95ZWQgPSBmdW5jdGlvbigpe1xuICAgICAgICAvL0RvIG5vdGhpbmcuXG4gICAgfTtcbiAgICBjb25zdCBldmVudHMgPSB7XG4gICAgICAgIFwibW91c2VsZWF2ZSAub3ZwLWNvbnRyb2xzLWNvbnRhaW5lclwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB2b2x1bWVCdXR0b24uc2V0TW91c2VEb3duKGZhbHNlKTtcbiAgICAgICAgICAgICRjdXJyZW50LmZpbmQoXCIub3ZwLXZvbHVtZS1zbGlkZXItY29udGFpbmVyXCIpLnJlbW92ZUNsYXNzKFwib3ZwLXZvbHVtZS1zbGlkZXItY29udGFpbmVyLWFjdGl2ZVwiKTtcbiAgICAgICAgfSxcbiAgICAgICAgXCJjbGljayAub3ZwLXNldHRpbmctYnV0dG9uXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIC8vdG9nZ2xlXG4gICAgICAgICAgICBpZihTZXR0aW5nUGFuZWxMaXN0Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIC8vY2xlYXIgYWxsIFNldHRpbmdQYW5lbFRlbXBsYXRlXG4gICAgICAgICAgICAgICAgXy5lYWNoKFNldHRpbmdQYW5lbExpc3QsIGZ1bmN0aW9uKHNldHRpbmdQYW5lbCl7XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdQYW5lbC5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgU2V0dGluZ1BhbmVsTGlzdC5zcGxpY2UoMCwgU2V0dGluZ1BhbmVsTGlzdC5sZW5ndGgpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgU2V0dGluZ1BhbmVsTGlzdC5wdXNoKFNldHRpbmdQYW5lbCgkY3VycmVudCwgYXBpLCBnZW5lcmF0ZU1haW5QYW5lbERhdGEoKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuXG5cblxuICAgIHJldHVybiBPdmVuVGVtcGxhdGUoJGNvbnRhaW5lciwgXCJDb250cm9sc1wiLCAgbnVsbCAsIGV2ZW50cywgb25SZW5kZXJlZCwgb25EZXN0cm95ZWQpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29udHJvbHM7IiwiXG5jb25zdCBDb250cm9scyA9IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwib3ZwLWNvbnRyb2xzXCI+JytcbiAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLWdyYWRpZW50LWJvdHRvbVwiPjwvZGl2PicgK1xuICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtYm90dG9tLXBhbmVsXCI+JyArXG4gICAgICAgICAnICAgIDxkaXYgY2xhc3M9XCJvdnAtcHJvZ3Jlc3NiYXItY29udGFpbmVyXCI+JyArXG4gICAgICAgICAnICAgIDwvZGl2PicgK1xuICAgICAgICAgJyAgICA8ZGl2IGNsYXNzPVwib3ZwLWNvbnRyb2xzLWNvbnRhaW5lclwiPicgK1xuICAgICAgICAgJyAgICAgICAgPGRpdiBjbGFzcz1cIm92cC1sZWZ0LWNvbnRyb2xzXCI+JyArXG4gICAgICAgICAnICAgICAgICA8L2Rpdj4nICtcbiAgICAgICAgICcgICAgICAgIDxkaXYgY2xhc3M9XCJvdnAtcmlnaHQtY29udHJvbHNcIj4nICtcbiAgICAgICAgICcgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwib3ZwLWJ1dHRvbiBvdnAtc2V0dGluZy1idXR0b25cIj48aSBjbGFzcz1cIm92cC1zZXR0aW5nLWJ1dHRvbi1pY29uXCI+PC9pPjwvYnV0dG9uPicgK1xuICAgICAgICAgJyAgICAgICAgPC9kaXY+JyArXG4gICAgICAgICAnICAgIDwvZGl2PicgK1xuICAgICAgICAgJzwvZGl2Pic7XG4gICAgJzwvZGl2Pic7XG5cbn07XG5cblxuXG5leHBvcnQgZGVmYXVsdCBDb250cm9scztcblxuXG5cblxuXG5cblxuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMjQuLlxuICovXG5pbXBvcnQgT3ZlblRlbXBsYXRlIGZyb20gJ3ZpZXcvZW5naW5lL092ZW5UZW1wbGF0ZSc7XG5pbXBvcnQge1xuICAgIEVSUk9SLFxuICAgIFNUQVRFX0lETEUsXG4gICAgU1RBVEVfUExBWUlORyxcbiAgICBTVEFURV9TVEFMTEVELFxuICAgIFNUQVRFX0xPQURJTkcsXG4gICAgU1RBVEVfQ09NUExFVEUsXG4gICAgU1RBVEVfUEFVU0VELFxuICAgIFNUQVRFX0VSUk9SLFxuICAgIFBMQVlFUl9TVEFURVxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG5jb25zdCBQbGF5QnV0dG9uID0gZnVuY3Rpb24gKCRjb250YWluZXIsIGFwaSkge1xuICAgIGxldCAkaWNvblBsYXkgPSBcIlwiLFxuICAgICAgICAkaWNvblBhdXNlID0gXCJcIixcbiAgICAgICAgJGljb25SZXBsYXkgPSBcIlwiO1xuXG5cbiAgICBsZXQgc2V0QnV0dG9uU3RhdGUgPSBmdW5jdGlvbihzdGF0ZSl7XG4gICAgICAgICRpY29uUGxheS5oaWRlKCk7XG4gICAgICAgICRpY29uUGF1c2UuaGlkZSgpO1xuICAgICAgICAkaWNvblJlcGxheS5oaWRlKCk7XG5cbiAgICAgICAgaWYoc3RhdGUgPT09IFNUQVRFX1BMQVlJTkcpe1xuICAgICAgICAgICAgJGljb25QYXVzZS5zaG93KCk7XG4gICAgICAgIH1lbHNlIGlmKHN0YXRlID09PSBTVEFURV9QQVVTRUQpe1xuICAgICAgICAgICAgJGljb25QbGF5LnNob3coKTtcbiAgICAgICAgfWVsc2UgaWYoc3RhdGUgPT09IFNUQVRFX0NPTVBMRVRFKXtcbiAgICAgICAgICAgICRpY29uUGxheS5zaG93KCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgJGljb25QbGF5LnNob3coKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuXG5cbiAgICBjb25zdCBvblJlbmRlcmVkID0gZnVuY3Rpb24oJGN1cnJlbnQsIHRlbXBsYXRlKXtcbiAgICAgICAgJGljb25QbGF5ID0gJGN1cnJlbnQuZmluZCggXCIub3ZwLXBsYXktYnV0dG9uLXBsYXlpY29uXCIpO1xuICAgICAgICAkaWNvblBhdXNlID0gJGN1cnJlbnQuZmluZChcIi5vdnAtcGxheS1idXR0b24tcGF1c2VpY29uXCIpO1xuICAgICAgICAkaWNvblJlcGxheSA9ICRjdXJyZW50LmZpbmQoXCIub3ZwLXBsYXktYnV0dG9uLXJlcGxheWljb25cIik7XG5cbiAgICAgICAgYXBpLm9uKFBMQVlFUl9TVEFURSwgZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgICAgICBpZihkYXRhICYmIGRhdGEubmV3c3RhdGUpe1xuICAgICAgICAgICAgICAgIHNldEJ1dHRvblN0YXRlKGRhdGEubmV3c3RhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIGNvbnN0IG9uRGVzdHJveWVkID0gZnVuY3Rpb24oKXtcbiAgICAgICAgLy9EbyBub3RoaW5nLlxuICAgIH07XG4gICAgY29uc3QgZXZlbnRzID0ge1xuICAgICAgICBcImNsaWNrIC5vdnAtcGxheS1idXR0b25cIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRTdGF0ZSA9IGFwaS5nZXRTdGF0ZSgpO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRTdGF0ZSA9PT0gU1RBVEVfSURMRSkge1xuICAgICAgICAgICAgICAgIGFwaS5wbGF5KCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRTdGF0ZSA9PT0gU1RBVEVfUExBWUlORykge1xuICAgICAgICAgICAgICAgIGFwaS5wYXVzZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50U3RhdGUgPT09IFNUQVRFX1BBVVNFRCkge1xuICAgICAgICAgICAgICAgIGFwaS5wbGF5KCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRTdGF0ZSA9PT0gU1RBVEVfQ09NUExFVEUpIHtcbiAgICAgICAgICAgICAgICBhcGkucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBPdmVuVGVtcGxhdGUoJGNvbnRhaW5lciwgXCJQbGF5QnV0dG9uXCIsIG51bGwsIGV2ZW50cywgb25SZW5kZXJlZCwgb25EZXN0cm95ZWQgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXlCdXR0b247IiwiZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICAgICc8YnV0dG9uIGNsYXNzPVwib3ZwLWJ1dHRvbiBvdnAtcGxheS1idXR0b25cIiB0eXBlPVwiYnV0dG9uXCI+JyArXG4gICAgICAgICAgICAnPGkgY2xhc3M9XCJvdnAtcGxheS1idXR0b24tcGxheWljb25cIj48L2k+JyArXG4gICAgICAgICAgICAnPGkgY2xhc3M9XCJvdnAtcGxheS1idXR0b24tcGF1c2VpY29uXCI+PC9pPicgK1xuICAgICAgICAgICAgJzxpIGNsYXNzPVwib3ZwLXBsYXktYnV0dG9uLXJlcGxheWljb25cIj48L2k+JyArXG4gICAgICAgICc8L2J1dHRvbj4nXG4gICAgKTtcbn07XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAyNC4uXG4gKi9cbmltcG9ydCBPdmVuVGVtcGxhdGUgZnJvbSAndmlldy9lbmdpbmUvT3ZlblRlbXBsYXRlJztcbmltcG9ydCBTZXR0aW5nUGFuZWxMaXN0IGZyb20gJ3ZpZXcvZ2xvYmFsL1NldHRpbmdQYW5lbExpc3QnO1xuaW1wb3J0IHtuYXR1cmFsSG1zfSBmcm9tICd1dGlscy9zdHJpbmdzJ1xuaW1wb3J0IExBJCBmcm9tICd1dGlscy9saWtlQSQnO1xuaW1wb3J0IHtcbiAgICBTVEFURV9JRExFLFxuICAgIFNUQVRFX1BMQVlJTkcsXG4gICAgU1RBVEVfQ09NUExFVEUsXG4gICAgU1RBVEVfUEFVU0VEXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5cbmNvbnN0IFByb2dyZXNzQmFyID0gZnVuY3Rpb24oJGNvbnRhaW5lciwgYXBpKXtcbiAgICBjb25zdCAkcm9vdCA9IExBJChcIiNcIithcGkuZ2V0SWQoKSk7XG4gICAgbGV0IGN1cnJlbnRQbGF5aW5nUG9zaXRpb24gPSAwO1xuICAgIGxldCBjdXJyZW50UGxheWluZ1BlcmNlbnRhZ2UgPSAwO1xuICAgIGxldCBjdXJyZW50TG9hZGVkUGVyY2VudGFnZSA9IDA7XG5cbiAgICBsZXQgbW91c2VJbnNpZGUgPSBmYWxzZSwgbW91c2VEb3duID0gZmFsc2U7XG5cbiAgICBsZXQgJHByb2dyZXNzQmFyID0gXCJcIixcbiAgICAgICAgJHByb2dyZXNzTG9hZCA9IFwiXCIsXG4gICAgICAgICRwcm9ncmVzc1BsYXkgPSBcIlwiLFxuICAgICAgICAkcHJvZ3Jlc3NIb3ZlciA9IFwiXCIsXG4gICAgICAgICRrbm9iQ29udGFpbmVyID0gXCJcIixcbiAgICAgICAgJGtub2IgPSBcIlwiLFxuICAgICAgICBrbm9iV2lkdGggPSAwLFxuICAgICAgICAkdGltZSA9IFwiXCI7XG5cblxuICAgIGxldCBwb3NpdGlvbkVsZW1lbnRzID0gZnVuY3Rpb24gKHBlcmNlbnRhZ2UpIHtcbiAgICAgICAgY29uc3QgcHJvZ3Jlc3NCYXJXaWR0aCA9ICRwcm9ncmVzc0Jhci53aWR0aCgpO1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHByb2dyZXNzQmFyV2lkdGggKiBwZXJjZW50YWdlO1xuXG4gICAgICAgICRwcm9ncmVzc1BsYXkuY3NzKCd3aWR0aCcsIHBvc2l0aW9uKyAncHgnKTtcbiAgICAgICAgJHByb2dyZXNzSG92ZXIuY3NzKCdsZWZ0JywgcG9zaXRpb24rICdweCcpO1xuXG4gICAgICAgIGNvbnN0IGtub2JQb3N0aW9uID0gKHByb2dyZXNzQmFyV2lkdGggLSBrbm9iV2lkdGgpICogcGVyY2VudGFnZTtcbiAgICAgICAgJGtub2JDb250YWluZXIuY3NzKCdsZWZ0Jywga25vYlBvc3Rpb24rICdweCcpO1xuXG4gICAgICAgIGN1cnJlbnRQbGF5aW5nUG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICAgICAgY3VycmVudFBsYXlpbmdQZXJjZW50YWdlID0gcGVyY2VudGFnZTtcbiAgICB9O1xuXG4gICAgbGV0IGRyYXdIb3ZlclByb2dyZXNzID0gZnVuY3Rpb24gKHBlcmNlbnRhZ2UpIHtcbiAgICAgICAgY29uc3QgcHJvZ3Jlc3NCYXJXaWR0aCA9ICRwcm9ncmVzc0Jhci53aWR0aCgpO1xuICAgICAgICBjb25zdCBob3ZlclBvc2l0aW9uID0gcHJvZ3Jlc3NCYXJXaWR0aCAqIHBlcmNlbnRhZ2U7XG5cbiAgICAgICAgJHByb2dyZXNzSG92ZXIuY3NzKCd3aWR0aCcsIHBlcmNlbnRhZ2UgPT0gMD8gcGVyY2VudGFnZSA6IChob3ZlclBvc2l0aW9uIC0gY3VycmVudFBsYXlpbmdQb3NpdGlvbikrICdweCcpO1xuICAgIH07XG5cbiAgICBsZXQgZHJhd0xvYWRQcm9ncmVzcyA9IGZ1bmN0aW9uKHBlcmNlbnRhZ2UpIHtcbiAgICAgICAgY29uc3QgcHJvZ3Jlc3NCYXJXaWR0aCA9ICRwcm9ncmVzc0Jhci53aWR0aCgpO1xuICAgICAgICBjb25zdCBsb2FkUG9zaXRpb24gPSBwcm9ncmVzc0JhcldpZHRoICogcGVyY2VudGFnZTtcblxuICAgICAgICAkcHJvZ3Jlc3NMb2FkLmNzcygnd2lkdGgnLCBsb2FkUG9zaXRpb24rICdweCcpO1xuICAgICAgICBjdXJyZW50TG9hZGVkUGVyY2VudGFnZSA9IHBlcmNlbnRhZ2U7XG4gICAgfTtcblxuICAgIGxldCBjYWxjdWxhdGVQZXJjZW50YWdlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHByb2dyZXNzQmFyV2lkdGggPSAkcHJvZ3Jlc3NCYXIud2lkdGgoKTtcbiAgICAgICAgY29uc3QgcHJvZ3Jlc3NCYXJPZmZzZXRYID0gJHByb2dyZXNzQmFyLm9mZnNldCgpLmxlZnQ7XG4gICAgICAgIGNvbnN0IHBvaW50ZXJPZmZzZXRYID0gZXZlbnQucGFnZVg7XG5cbiAgICAgICAgY29uc3QgcGVyY2VudGFnZSA9IChwb2ludGVyT2Zmc2V0WCAtIHByb2dyZXNzQmFyT2Zmc2V0WCkgLyBwcm9ncmVzc0JhcldpZHRoO1xuXG4gICAgICAgIGlmIChwZXJjZW50YWdlIDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGVyY2VudGFnZSA+IDEpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBlcmNlbnRhZ2U7XG4gICAgfTtcblxuICAgIGxldCBkcmF3VGltZUluZGljYXRvciA9IGZ1bmN0aW9uIChwZXJjZW50YWdlLCBldmVudCkge1xuICAgICAgIGlmKFNldHRpbmdQYW5lbExpc3QubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICR0aW1lLmhpZGUoKTtcbiAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZHVyYXRpb24gPSBhcGkuZ2V0RHVyYXRpb24oKTtcbiAgICAgICAgY29uc3Qgc2Vjb25kID0gZHVyYXRpb24gKiBwZXJjZW50YWdlO1xuXG4gICAgICAgIGNvbnN0IGhtcyA9IG5hdHVyYWxIbXMoc2Vjb25kKTtcblxuICAgICAgICAkdGltZS50ZXh0KGhtcyk7XG5cbiAgICAgICAgY29uc3QgdGltZUVsZW1XaWR0aCA9ICR0aW1lLndpZHRoKCk7XG4gICAgICAgIGNvbnN0IHByb2dyZXNzQmFyV2lkdGggPSAkcHJvZ3Jlc3NCYXIud2lkdGgoKTtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBwcm9ncmVzc0JhcldpZHRoICogcGVyY2VudGFnZTtcbiAgICAgICAgY29uc3QgcG9zaXRpb25PZlBpeGVsID0gZXZlbnQucGFnZVggLSAkcHJvZ3Jlc3NCYXIub2Zmc2V0KCkubGVmdDtcblxuICAgICAgICBjb25zdCBjYWxjdWxhdGVNYWduZXRpYyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpZihwb3NpdGlvbk9mUGl4ZWwgPCB0aW1lRWxlbVdpZHRoIC8gMil7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9ZWxzZSBpZihwcm9ncmVzc0JhcldpZHRoLXBvc2l0aW9uT2ZQaXhlbCAgPCB0aW1lRWxlbVdpZHRoIC8gMil7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb2dyZXNzQmFyV2lkdGggLSB0aW1lRWxlbVdpZHRoO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvc2l0aW9uIC0gdGltZUVsZW1XaWR0aCAvIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgJHRpbWUuY3NzKCdsZWZ0JywgY2FsY3VsYXRlTWFnbmV0aWMoKSsgXCJweFwiKTtcbiAgICB9O1xuXG4gICAgbGV0IHNlZWsgPSBmdW5jdGlvbiAocGVyY2VudGFnZSkge1xuICAgICAgICBhcGkuc2VlayggKGFwaS5nZXREdXJhdGlvbigpfHwwKSAqIHBlcmNlbnRhZ2UpO1xuICAgIH07XG4gICAgY29uc3Qgb25SZW5kZXJlZCA9IGZ1bmN0aW9uKCRjdXJyZW50LCB0ZW1wbGF0ZSl7XG4gICAgICAgICRwcm9ncmVzc0JhciA9ICRjdXJyZW50O1xuICAgICAgICAkcHJvZ3Jlc3NMb2FkID0gJGN1cnJlbnQuZmluZChcIi5vdnAtbG9hZC1wcm9ncmVzc1wiKTtcbiAgICAgICAgJHByb2dyZXNzUGxheSA9ICRjdXJyZW50LmZpbmQoXCIub3ZwLXBsYXktcHJvZ3Jlc3NcIik7XG4gICAgICAgICRwcm9ncmVzc0hvdmVyID0gJGN1cnJlbnQuZmluZChcIi5vdnAtaG92ZXItcHJvZ3Jlc3NcIik7XG4gICAgICAgICRrbm9iQ29udGFpbmVyID0gJGN1cnJlbnQuZmluZChcIi5vdnAtcHJvZ3Jlc3NiYXIta25vYi1jb250YWluZXJcIik7XG4gICAgICAgICRrbm9iID0gJGN1cnJlbnQuZmluZChcIi5vdnAtcHJvZ3Jlc3NiYXIta25vYlwiKTtcbiAgICAgICAga25vYldpZHRoID0gJGtub2Iud2lkdGgoKTtcbiAgICAgICAgJHRpbWUgPSAkY3VycmVudC5maW5kKFwiLm92cC1wcm9ncmVzc2Jhci10aW1lXCIpO1xuXG4gICAgICAgIGFwaS5vbigndGltZScsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGlmKGRhdGEgJiYgZGF0YS5kdXJhdGlvbiAmJiBkYXRhLnBvc2l0aW9uKXtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbkVsZW1lbnRzKGRhdGEucG9zaXRpb24gLyBkYXRhLmR1cmF0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgYXBpLm9uKCdidWZmZXJDaGFuZ2VkJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgaWYoZGF0YSAmJiBkYXRhLmJ1ZmZlclBlcmNlbnQpe1xuICAgICAgICAgICAgICAgIGRyYXdMb2FkUHJvZ3Jlc3MoZGF0YS5idWZmZXJQZXJjZW50IC8gMTAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9O1xuICAgIGNvbnN0IG9uRGVzdHJveWVkID0gZnVuY3Rpb24oKXtcblxuICAgIH07XG4gICAgY29uc3QgZXZlbnRzID0ge1xuICAgICAgICBcInJlc2l6ZSB3aW5kb3dcIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgcG9zaXRpb25FbGVtZW50cyhjdXJyZW50UGxheWluZ1BlcmNlbnRhZ2UpO1xuICAgICAgICAgICAgZHJhd0xvYWRQcm9ncmVzcyhjdXJyZW50TG9hZGVkUGVyY2VudGFnZSk7XG4gICAgICAgIH0sXG4gICAgICAgIFwibW91c2VlbnRlciAub3ZwLXByb2dyZXNzYmFyXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIG1vdXNlSW5zaWRlID0gdHJ1ZTtcbiAgICAgICAgICAgICRyb290LmFkZENsYXNzKFwib3ZwLXByb2dyZXNzYmFyLWhvdmVyXCIpO1xuICAgICAgICAgICAgJHRpbWUuc2hvdygpO1xuICAgICAgICB9LFxuICAgICAgICBcIm1vdXNlbGVhdmUgLm92cC1wcm9ncmVzc2JhclwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBtb3VzZUluc2lkZSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKCFtb3VzZUluc2lkZSkge1xuICAgICAgICAgICAgICAgICRyb290LnJlbW92ZUNsYXNzKFwib3ZwLXByb2dyZXNzYmFyLWhvdmVyXCIpO1xuICAgICAgICAgICAgICAgICR0aW1lLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRyYXdIb3ZlclByb2dyZXNzKDApO1xuICAgICAgICB9LFxuICAgICAgICBcIm1vdXNlZG93biAub3ZwLXByb2dyZXNzYmFyXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBtb3VzZURvd24gPSB0cnVlO1xuICAgICAgICAgICAgY29uc3QgcGVyY2VudGFnZSA9IGNhbGN1bGF0ZVBlcmNlbnRhZ2UoZXZlbnQpO1xuICAgICAgICAgICAgcG9zaXRpb25FbGVtZW50cyhwZXJjZW50YWdlKTtcbiAgICAgICAgICAgIGRyYXdIb3ZlclByb2dyZXNzKDApO1xuICAgICAgICAgICAgc2VlayhwZXJjZW50YWdlKTtcbiAgICAgICAgfSxcbiAgICAgICAgXCJtb3VzZW1vdmUgLm92cC1wcm9ncmVzc2JhclwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBpZiAoIW1vdXNlRG93bikge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBlcmNlbnRhZ2UgPSBjYWxjdWxhdGVQZXJjZW50YWdlKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBkcmF3SG92ZXJQcm9ncmVzcyhwZXJjZW50YWdlKTtcbiAgICAgICAgICAgICAgICBkcmF3VGltZUluZGljYXRvcihwZXJjZW50YWdlLCBldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwibW91c2Vtb3ZlIGRvY3VtZW50XCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAobW91c2VEb3duKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGVyY2VudGFnZSA9IGNhbGN1bGF0ZVBlcmNlbnRhZ2UoZXZlbnQpO1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uRWxlbWVudHMocGVyY2VudGFnZSk7XG4gICAgICAgICAgICAgICAgZHJhd0hvdmVyUHJvZ3Jlc3MoMCk7XG4gICAgICAgICAgICAgICAgc2VlayhwZXJjZW50YWdlKTtcbiAgICAgICAgICAgICAgICBkcmF3VGltZUluZGljYXRvcihwZXJjZW50YWdlLCBldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwibW91c2V1cCBkb2N1bWVudFwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBpZihtb3VzZURvd24pe1xuICAgICAgICAgICAgICAgIG1vdXNlRG93biA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICRyb290LnJlbW92ZUNsYXNzKFwib3ZwLXByb2dyZXNzYmFyLWhvdmVyXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIE92ZW5UZW1wbGF0ZSgkY29udGFpbmVyLCBcIlByb2dyZXNzQmFyXCIsIG51bGwsIGV2ZW50cywgb25SZW5kZXJlZCwgb25EZXN0cm95ZWQgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFByb2dyZXNzQmFyOyIsImV4cG9ydCBkZWZhdWx0ICgpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1wcm9ncmVzc2JhclwiIHRhYmluZGV4PVwiMFwiPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtcHJvZ3Jlc3NiYXItcGFkZGluZ1wiPjwvZGl2PicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtcHJvZ3Jlc3MtbGlzdFwiPicgK1xuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLWxvYWQtcHJvZ3Jlc3NcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1wbGF5LXByb2dyZXNzIG92cC1wbGF5LWJhY2tncm91bmQtY29sb3JcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1ob3Zlci1wcm9ncmVzc1wiPjwvZGl2PicgK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtcHJvZ3Jlc3NiYXIta25vYi1jb250YWluZXJcIj4nICtcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1wcm9ncmVzc2Jhci1rbm9iIG92cC1wbGF5LWJhY2tncm91bmQtY29sb3JcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm92cC1wcm9ncmVzc2Jhci10aW1lXCI+MDowMDwvc3Bhbj4nICtcbiAgICAgICAgJzwvZGl2PidcbiAgICApO1xufTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDI2Li5cbiAqL1xuaW1wb3J0IE92ZW5UZW1wbGF0ZSBmcm9tICd2aWV3L2VuZ2luZS9PdmVuVGVtcGxhdGUnO1xuaW1wb3J0IFNldHRpbmdQYW5lbExpc3QgZnJvbSAndmlldy9nbG9iYWwvU2V0dGluZ1BhbmVsTGlzdCc7XG5pbXBvcnQgTEEkIGZyb20gJ3V0aWxzL2xpa2VBJCc7XG5pbXBvcnQgXyBmcm9tICd1dGlscy91bmRlcnNjb3JlJztcbmNvbnN0IFBMQVlFUl9NSU5fSEVJR0hUID0gMjIwO1xuY29uc3QgU2V0dGluZ1BhbmVsID0gZnVuY3Rpb24oJGNvbnRhaW5lciwgYXBpLCBkYXRhKXtcbiAgICBjb25zdCAkcm9vdCA9IExBJChcIiNcIithcGkuZ2V0SWQoKSk7XG5cbiAgICBsZXQgZXh0cmFjdFBhbmVsRGF0YSA9IGZ1bmN0aW9uKHBhbmVsVHlwZSl7XG4gICAgICAgIGxldCBwYW5lbCA9IHt0aXRsZSA6IFwiXCIsIGJvZHkgOiBbXSwgdHlwZSA6IHBhbmVsVHlwZX07XG5cbiAgICAgICAgaWYocGFuZWxUeXBlID09PSBcInBsYXliYWNrcmF0ZVwiKXtcbiAgICAgICAgICAgIHBhbmVsLnRpdGxlID0gXCJTcGVlZFwiO1xuICAgICAgICAgICAgbGV0IHBsYXlCYWNrUmF0ZXMgPSBhcGkuZ2V0Q29uZmlnKCkucGxheWJhY2tSYXRlcztcbiAgICAgICAgICAgIGxldCBjdXJyZW50UGxheWJhY2tSYXRlID0gYXBpLmdldFBsYXliYWNrUmF0ZSgpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5QmFja1JhdGVzLmxlbmd0aDsgaSArKykge1xuICAgICAgICAgICAgICAgIGxldCBib2R5ID0ge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZSA6IChwbGF5QmFja1JhdGVzW2ldID09PSAxPyBcIk5vcm1hbFwiIDogcGxheUJhY2tSYXRlc1tpXSksXG4gICAgICAgICAgICAgICAgICAgIGlzQ2hlY2sgOiBjdXJyZW50UGxheWJhY2tSYXRlID09PSBwbGF5QmFja1JhdGVzW2ldLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA6IHBsYXlCYWNrUmF0ZXNbaV1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHBhbmVsLmJvZHkucHVzaChib2R5KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9ZWxzZSBpZihwYW5lbFR5cGUgPT09IFwicXVhbGl0eWxldmVsXCIpe1xuICAgICAgICAgICAgcGFuZWwudGl0bGUgPSBcIlNvdXJjZVwiO1xuXG4gICAgICAgICAgICBsZXQgcXVhbGl0eUxldmVscyA9IGFwaS5nZXRRdWFsaXR5TGV2ZWxzKCk7XG4gICAgICAgICAgICBsZXQgY3VycmVudFF1YWxpdHkgPSBhcGkuZ2V0Q3VycmVudFF1YWxpdHkoKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdWFsaXR5TGV2ZWxzLmxlbmd0aDsgaSArKykge1xuICAgICAgICAgICAgICAgIGxldCBib2R5ID0ge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZSA6IHF1YWxpdHlMZXZlbHNbaV0ubGFiZWwsXG4gICAgICAgICAgICAgICAgICAgIGlzQ2hlY2sgOiBjdXJyZW50UXVhbGl0eSA9PT0gaSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgOiBpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBwYW5lbC5ib2R5LnB1c2goYm9keSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGFuZWw7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uUmVuZGVyZWQgPSBmdW5jdGlvbigkY3VycmVudCwgdGVtcGxhdGUpe1xuICAgICAgICBpZihQTEFZRVJfTUlOX0hFSUdIVCA+ICRyb290LmhlaWdodCgpKXtcbiAgICAgICAgICAgICRyb290LmZpbmQoXCIub3ZwLXNldHRpbmctcGFuZWxcIikuY3NzKFwibWF4SGVpZ2h0XCIsIFwiMTE0cHhcIik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IG9uRGVzdHJveWVkID0gZnVuY3Rpb24oKXtcbiAgICAgICAgLy9EbyBub3RoaW5nLlxuICAgIH07XG4gICAgY29uc3QgZXZlbnRzID0ge1xuICAgICAgICBcImNsaWNrIC5vdnAtc2V0dGluZy1tYWluLWl0ZW1cIjogZnVuY3Rpb24gKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBsZXQgcGFuZWxUeXBlID0gTEEkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmF0dHIoXCJvdnAtcGFuZWwtdHlwZVwiKTtcblxuICAgICAgICAgICAgLy9wYXJlbnQgbXVzdCBiZSBub3QgJGN1cnJlbnQhXG4gICAgICAgICAgICBTZXR0aW5nUGFuZWxMaXN0LnB1c2goU2V0dGluZ1BhbmVsKCRjb250YWluZXIsIGFwaSwgZXh0cmFjdFBhbmVsRGF0YShwYW5lbFR5cGUpKSk7XG4gICAgICAgIH0sXG4gICAgICAgIFwiY2xpY2sgLm92cC1zZXR0aW5nLXRpdGxlXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIC8vUmVtb3ZlIEN1cnJlbnQgUGFuZWxcbiAgICAgICAgICAgIGxldCBsYXN0ID0gU2V0dGluZ1BhbmVsTGlzdC5wb3AoKTtcbiAgICAgICAgICAgIGxhc3QuZGVzdHJveSgpO1xuICAgICAgICB9LFxuICAgICAgICBcImNsaWNrIC5vdnAtc2V0dGluZy1pdGVtLXZhbHVlXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGxldCBwYW5lbFR5cGUgPSBMQSQoZXZlbnQuY3VycmVudFRhcmdldCkuYXR0cihcIm92cC1wYW5lbC10eXBlXCIpO1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gTEEkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmF0dHIoXCJvdnAtZGF0YS12YWx1ZVwiKTtcblxuICAgICAgICAgICAgaWYocGFuZWxUeXBlICYmIHZhbHVlKXtcbiAgICAgICAgICAgICAgICBpZihwYW5lbFR5cGUgPT09IFwicGxheWJhY2tyYXRlXCIpe1xuICAgICAgICAgICAgICAgICAgICBhcGkuc2V0UGxheWJhY2tSYXRlKHBhcnNlRmxvYXQodmFsdWUpKTtcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihwYW5lbFR5cGUgPT09IFwicXVhbGl0eWxldmVsXCIpe1xuICAgICAgICAgICAgICAgICAgICBhcGkuc2V0Q3VycmVudFF1YWxpdHkocGFyc2VJbnQodmFsdWUpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvL2NsZWFyIGFsbCBTZXR0aW5nUGFuZWxUZW1wbGF0ZVxuICAgICAgICAgICAgICAgIF8uZWFjaChTZXR0aW5nUGFuZWxMaXN0LCBmdW5jdGlvbihzZXR0aW5nUGFuZWwpe1xuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nUGFuZWwuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIFNldHRpbmdQYW5lbExpc3Quc3BsaWNlKDAsIFNldHRpbmdQYW5lbExpc3QubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBPdmVuVGVtcGxhdGUoJGNvbnRhaW5lciwgXCJTZXR0aW5nUGFuZWxcIiwgZGF0YSwgZXZlbnRzLCBvblJlbmRlcmVkLCBvbkRlc3Ryb3llZCApO1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBTZXR0aW5nUGFuZWw7IiwiaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcblxuZXhwb3J0IGRlZmF1bHQgKGRhdGEpID0+IHtcbiAgICBsZXQgZWxlbWVudHMgPSAnPGRpdiBjbGFzcz1cIm92cC1zZXR0aW5nLXBhbmVsICcrKGRhdGEuaXNNYWluID8gJ2FuaW1hdGVkIGZhZGVJbic6ICcnKSsnXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1zZXR0aW5nLXRpdGxlLWNvbnRhaW5lclwiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLXNldHRpbmctdGl0bGVcIiB0YWJpbmRleD1cIjBcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGRhdGEuaXNNYWluID8gJycgOiAnPHNwYW4gY2xhc3M9XCJvdnAtc2V0dGluZy10aXRsZS1wcmV2aWNvblwiPiZsdDs8L3NwYW4+JykgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJvdnAtc2V0dGluZy10aXRsZS10aXRsZVwiPicrZGF0YS50aXRsZSsnPC9zcGFuPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtc2V0dGluZy1pdGVtLWNvbnRhaW5lclwiPic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXy5mb3JFYWNoKGRhdGEuYm9keSwgZnVuY3Rpb24oYm9keSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRhdGEuaXNNYWluKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzICs9IHNldHRpbmdJdGVtVGVtcGxhdGUoYm9keS50aXRsZSwgYm9keS52YWx1ZSwgYm9keS50eXBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50cyArPSBzZXR0aW5nVmFsdWVUZW1wbGF0ZShib2R5LnRpdGxlLCBib2R5LnZhbHVlLCBkYXRhLnR5cGUsIGJvZHkuaXNDaGVjayk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICBlbGVtZW50cys9ICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgcmV0dXJuIGVsZW1lbnRzO1xufTtcblxuZXhwb3J0IGNvbnN0IHNldHRpbmdJdGVtVGVtcGxhdGUgPSAodGl0bGUsIHZhbHVlLCB0eXBlKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtc2V0dGluZy1pdGVtIG92cC1zZXR0aW5nLW1haW4taXRlbVwiIG92cC1wYW5lbC10eXBlPVwiJyt0eXBlKydcIj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm92cC1zZXR0aW5nLWl0ZW0tdGl0bGVcIj4nK3RpdGxlKyc8L3NwYW4+JyArXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJvdnAtc2V0dGluZy1pdGVtLW5leHRpY29uXCI+Jmd0Ozwvc3Bhbj4nICtcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm92cC1zZXR0aW5nLWl0ZW0tdmFsdWVcIj4nK3ZhbHVlKyc8L3NwYW4+JyArXG4gICAgICAgICc8L2Rpdj4nXG4gICAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXR0aW5nVmFsdWVUZW1wbGF0ZSA9ICh0aXRsZSwgdmFsdWUsIHR5cGUsIGlzQ2hlY2spID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1zZXR0aW5nLWl0ZW0gb3ZwLXNldHRpbmctaXRlbS12YWx1ZVwiIG92cC1wYW5lbC10eXBlPVwiJyt0eXBlKydcIiBvdnAtZGF0YS12YWx1ZT1cIicrdmFsdWUrJ1wiPicgK1xuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwib3ZwLXNldHRpbmctaXRlbS1jaGVja2VkICcrKGlzQ2hlY2s/J292cC1zaG93JzonJykrJ1wiPiYjeDI3MTM7PC9zcGFuPicgK1xuICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwib3ZwLXNldHRpbmctaXRlbS10aXRsZVwiPicrdGl0bGUrJzwvc3Bhbj4nICtcbiAgICAgICAgJzwvZGl2PidcbiAgICApO1xufTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDI1Li5cbiAqL1xuaW1wb3J0IE92ZW5UZW1wbGF0ZSBmcm9tICd2aWV3L2VuZ2luZS9PdmVuVGVtcGxhdGUnO1xuaW1wb3J0IHtuYXR1cmFsSG1zfSBmcm9tICd1dGlscy9zdHJpbmdzJztcblxuY29uc3QgVGltZURpc3BsYXkgPSBmdW5jdGlvbigkY29udGFpbmVyLCBhcGksIGRhdGEpe1xuXG4gICAgbGV0ICRwb3NpdGlvbiA9IFwiXCIsICRkdXJhdGlvbiA9IFwiXCI7XG4gICAgbGV0IGNvbnZlcnRIdW1hbml6ZVRpbWUgPSBmdW5jdGlvbih0aW1lKXtcbiAgICAgICAgcmV0dXJuIG5hdHVyYWxIbXModGltZSk7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uUmVuZGVyZWQgPSBmdW5jdGlvbigkY3VycmVudCwgdGVtcGxhdGUpe1xuICAgICAgICAkcG9zaXRpb24gPSAkY3VycmVudC5maW5kKCcub3ZwLXRpbWUtY3VycmVudCcpO1xuICAgICAgICAkZHVyYXRpb24gPSAkY3VycmVudC5maW5kKCcub3ZwLXRpbWUtZHVyYXRpb24nKTtcblxuICAgICAgICBpZihkYXRhLmR1cmF0aW9uICE9PSBJbmZpbml0eSl7XG5cbiAgICAgICAgICAgICRkdXJhdGlvbi50ZXh0KGNvbnZlcnRIdW1hbml6ZVRpbWUoZGF0YS5kdXJhdGlvbikpO1xuICAgICAgICAgICAgYXBpLm9uKCd0aW1lJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICRwb3NpdGlvbi50ZXh0KGNvbnZlcnRIdW1hbml6ZVRpbWUoZGF0YS5wb3NpdGlvbikpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH07XG4gICAgY29uc3Qgb25EZXN0cm95ZWQgPSBmdW5jdGlvbigpe1xuICAgICAgICAvL0RvIG5vdGhpbmcuXG4gICAgfTtcbiAgICBjb25zdCBldmVudHMgPSB7XG5cbiAgICB9O1xuXG4gICAgcmV0dXJuIE92ZW5UZW1wbGF0ZSgkY29udGFpbmVyLCBcIlRpbWVEaXNwbGF5XCIsIGRhdGEsIGV2ZW50cywgb25SZW5kZXJlZCwgb25EZXN0cm95ZWQgKTtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgVGltZURpc3BsYXk7IiwiZXhwb3J0IGRlZmF1bHQgKGRhdGEpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC10aW1lLWRpc3BsYXlcIj4nK1xuICAgICAgICAgICAgKGRhdGEuZHVyYXRpb24gPT09IEluZmluaXR5XG4gICAgICAgICAgICAgICAgP1xuICAgICAgICAgICAgICAgICgnPGJ1dHRvbiBjbGFzcz1cIm92cC1saXZlLWJhZGdlIG92cC1idXR0b25cIiBkaXNhYmxlZD1cImRpc2FibGVkXCI+JyArXG4gICAgICAgICAgICAgICAgICAgIChkYXRhLnR5cGUgPT0nd2VicnRjJ1xuICAgICAgICAgICAgICAgICAgICAgICAgP1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwib3ZwLWxpdmUtYmFkZ2UtbG93bGF0ZW5jeVwiPmxvdyBsYXRlbmN5IGxpdmU8L3NwYW4+J1xuICAgICAgICAgICAgICAgICAgICAgICAgOlxuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuPmxpdmU8L3NwYW4+JykgK1xuICAgICAgICAgICAgICAgICc8L2J1dHRvbj4nKVxuICAgICAgICAgICAgICAgIDpcbiAgICAgICAgICAgICAgICAoJzxzcGFuIGNsYXNzPVwib3ZwLXRpbWUtY3VycmVudFwiPjA6MDA8L3NwYW4+JyArXG4gICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIm92cC10aW1lLXNlcGFyYXRvclwiPiAvIDwvc3Bhbj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwib3ZwLXRpbWUtZHVyYXRpb25cIj4wOjAwPC9zcGFuPicpXG4gICAgICAgICAgICApICtcbiAgICAgICAgJzwvZGl2PidcbiAgICApO1xufTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDIwLi5cbiAqL1xuaW1wb3J0IE92ZW5UZW1wbGF0ZSBmcm9tICd2aWV3L2VuZ2luZS9PdmVuVGVtcGxhdGUnO1xuXG5jb25zdCBWb2x1bWVCdXR0b24gPSBmdW5jdGlvbigkY29udGFpbmVyLCBhcGkpe1xuXG4gICAgbGV0ICRzbGlkZXJDb250YWluZXIgPSBcIlwiLFxuICAgICAgICAkc2xpZGVyID0gXCJcIixcbiAgICAgICAgJHNsaWRlckhhbmRsZSA9IFwiXCIsXG4gICAgICAgICRzbGlkZXJWYWx1ZSA9IFwiXCIsXG4gICAgICAgICR2b2x1bWVJY29uQmlnID0gXCJcIixcbiAgICAgICAgJHZvbHVtZUljb25TbWFsbCA9IFwiXCIsXG4gICAgICAgICR2b2x1bWVJY29uTXV0ZSA9IFwiXCI7XG4gICAgbGV0IG1vdXNlRG93biA9IGZhbHNlO1xuICAgIGxldCBzbGlkZXJXaWR0aCA9IDcwLCAgaGFuZGxlV2lkdGggPSAwLCBtaW5SYW5nZSA9IDAsIG1heFJhbmdlID0gMDtcblxuXG4gICAgLypwcml2YXRlIGZ1bmN0aW9ucyovXG4gICAgbGV0IHNldFZvbHVtZUljb24gPSBmdW5jdGlvbihwZXJjZW50YWdlKSB7XG4gICAgICAgICR2b2x1bWVJY29uQmlnLmhpZGUoKTtcbiAgICAgICAgJHZvbHVtZUljb25TbWFsbC5oaWRlKCk7XG4gICAgICAgICR2b2x1bWVJY29uTXV0ZS5oaWRlKCk7XG5cbiAgICAgICAgaWYgKHBlcmNlbnRhZ2UgPj0gNTApIHtcbiAgICAgICAgICAgICR2b2x1bWVJY29uQmlnLnNob3coKTtcbiAgICAgICAgfSBlbHNlIGlmIChwZXJjZW50YWdlIDwgNTAgJiYgcGVyY2VudGFnZSA+IDApIHtcbiAgICAgICAgICAgICR2b2x1bWVJY29uU21hbGwuc2hvdygpO1xuICAgICAgICB9IGVsc2UgaWYgKHBlcmNlbnRhZ2UgPT0gMCkge1xuICAgICAgICAgICAgJHZvbHVtZUljb25NdXRlLnNob3coKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxldCBzZXRWb2x1bWVVSSA9IGZ1bmN0aW9uKHBlcmNlbnRhZ2UpIHtcbiAgICAgICAgaWYgKGFwaS5nZXRNdXRlKCkpIHtcbiAgICAgICAgICAgIHBlcmNlbnRhZ2UgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0Vm9sdW1lSWNvbihwZXJjZW50YWdlKTtcblxuICAgICAgICBjb25zdCBoYW5kbGVQb3NpdGlvbiA9IG1heFJhbmdlICogcGVyY2VudGFnZSAvIDEwMDtcblxuICAgICAgICAkc2xpZGVySGFuZGxlLmNzcygnbGVmdCcsIGhhbmRsZVBvc2l0aW9uKyAncHgnKTtcbiAgICAgICAgJHNsaWRlclZhbHVlLmNzcygnd2lkdGgnLCBoYW5kbGVQb3NpdGlvbisgJ3B4Jyk7XG4gICAgfVxuXG4gICAgbGV0IGNhbGN1bGF0ZVBlcmNlbnRhZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgcmVsYXRpdmVYID0gZXZlbnQucGFnZVggLSAkc2xpZGVyLm9mZnNldCgpLmxlZnQ7XG4gICAgICAgIGxldCBwZXJjZW50YWdlID0gcmVsYXRpdmVYIC8gc2xpZGVyV2lkdGggKiAxMDA7XG5cbiAgICAgICAgaWYgKHBlcmNlbnRhZ2UgPCAwKSB7XG4gICAgICAgICAgICBwZXJjZW50YWdlID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwZXJjZW50YWdlID4gMTAwKSB7XG4gICAgICAgICAgICBwZXJjZW50YWdlID0gMTAwO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBlcmNlbnRhZ2U7XG4gICAgfVxuXG5cbiAgICBjb25zdCBvblJlbmRlcmVkID0gZnVuY3Rpb24oJGN1cnJlbnQsIHRlbXBsYXRlKXtcbiAgICAgICAgJHNsaWRlckNvbnRhaW5lciA9ICRjdXJyZW50LmZpbmQoXCIub3ZwLXZvbHVtZS1zbGlkZXItY29udGFpbmVyXCIpO1xuICAgICAgICAkc2xpZGVyID0gJGN1cnJlbnQuZmluZChcIi5vdnAtdm9sdW1lLXNpbGRlclwiKTtcbiAgICAgICAgJHNsaWRlckhhbmRsZSA9ICRjdXJyZW50LmZpbmQoXCIub3ZwLXZvbHVtZS1zbGlkZXItaGFuZGxlXCIpO1xuICAgICAgICAkc2xpZGVyVmFsdWUgPSAkY3VycmVudC5maW5kKFwiLm92cC12b2x1bWUtc2xpZGVyLXZhbHVlXCIpO1xuXG4gICAgICAgICR2b2x1bWVJY29uQmlnID0gJGN1cnJlbnQuZmluZCggXCIub3ZwLXZvbHVtZS1idXR0b24tYmlnaWNvblwiKTtcbiAgICAgICAgJHZvbHVtZUljb25TbWFsbCA9ICRjdXJyZW50LmZpbmQoXCIub3ZwLXZvbHVtZS1idXR0b24tc21hbGxpY29uXCIpO1xuICAgICAgICAkdm9sdW1lSWNvbk11dGUgPSAkY3VycmVudC5maW5kKFwiLm92cC12b2x1bWUtYnV0dG9uLW11dGVpY29uXCIpO1xuXG4gICAgICAgIGhhbmRsZVdpZHRoID0gJHNsaWRlckhhbmRsZS53aWR0aCgpO1xuICAgICAgICBtYXhSYW5nZSA9IHNsaWRlcldpZHRoIC0gaGFuZGxlV2lkdGg7XG5cbiAgICAgICAgYXBpLm9uKCdyZWFkeScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2V0Vm9sdW1lVUkoYXBpLmdldFZvbHVtZSgpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGFwaS5vbigndm9sdW1lQ2hhbmdlZCcsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIHNldFZvbHVtZVVJKGRhdGEudm9sdW1lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGFwaS5vbignbXV0ZScsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLm11dGUpIHtcbiAgICAgICAgICAgICAgICBzZXRWb2x1bWVVSSgwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2V0Vm9sdW1lVUkoYXBpLmdldFZvbHVtZSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9O1xuICAgIGNvbnN0IG9uRGVzdHJveWVkID0gZnVuY3Rpb24oKXtcblxuICAgIH07XG4gICAgY29uc3QgZXZlbnRzID0ge1xuICAgICAgICBcImNsaWNrIC5vdnAtdm9sdW1lLWJ1dHRvblwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBpZiAoYXBpLmdldFZvbHVtZSgpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgYXBpLnNldE11dGUoZmFsc2UpO1xuICAgICAgICAgICAgICAgIGFwaS5zZXRWb2x1bWUoMTAwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYXBpLnNldE11dGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJtb3VzZWVudGVyIC5vdnAtdm9sdW1lLWJ1dHRvblwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJHNsaWRlckNvbnRhaW5lci5hZGRDbGFzcyhcIm92cC12b2x1bWUtc2xpZGVyLWNvbnRhaW5lci1hY3RpdmVcIik7XG4gICAgICAgIH0sXG4gICAgICAgIFwibW91c2VsZWF2ZSAub3ZwLXZvbHVtZS1zaWxkZXJcIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgbW91c2VEb3duID0gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIFwibW91c2Vkb3duIC5vdnAtdm9sdW1lLXNpbGRlclwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgbW91c2VEb3duID0gdHJ1ZTtcbiAgICAgICAgICAgIGFwaS5zZXRNdXRlKGZhbHNlKTtcbiAgICAgICAgICAgIGFwaS5zZXRWb2x1bWUoY2FsY3VsYXRlUGVyY2VudGFnZShldmVudCkpO1xuICAgICAgICB9LFxuICAgICAgICBcIm1vdXNldXAgLm92cC12b2x1bWUtc2lsZGVyXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBtb3VzZURvd24gPSBmYWxzZTtcbiAgICAgICAgfSxcbiAgICAgICAgXCJtb3VzZW1vdmUgLm92cC12b2x1bWUtc2lsZGVyXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAoIW1vdXNlRG93bikge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYXBpLnNldFZvbHVtZShjYWxjdWxhdGVQZXJjZW50YWdlKGV2ZW50KSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oT3ZlblRlbXBsYXRlKCRjb250YWluZXIsIFwiVm9sdW1lQnV0dG9uXCIsIG51bGwsIGV2ZW50cywgb25SZW5kZXJlZCwgb25EZXN0cm95ZWQpLCB7XG4gICAgICAgIHNldE1vdXNlRG93bjogZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICAgICAgICBtb3VzZURvd24gPSBzdGF0ZTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVm9sdW1lQnV0dG9uOyIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDIwLi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLXZvbHVtZS1jb250cm9sbGVyXCI+JytcbiAgICAgICAgICAgICc8YnV0dG9uIGNsYXNzPVwib3ZwLWJ1dHRvbiBvdnAtdm9sdW1lLWJ1dHRvblwiPicgK1xuICAgICAgICAgICAgICAgICc8aSBjbGFzcz1cIm92cC12b2x1bWUtYnV0dG9uLWJpZ2ljb25cIj48L2k+JyArXG4gICAgICAgICAgICAgICAgJzxpIGNsYXNzPVwib3ZwLXZvbHVtZS1idXR0b24tc21hbGxpY29uXCI+PC9pPicgK1xuICAgICAgICAgICAgICAgICc8aSBjbGFzcz1cIm92cC12b2x1bWUtYnV0dG9uLW11dGVpY29uXCI+PC9pPicgK1xuICAgICAgICAgICAgJzwvYnV0dG9uPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtdm9sdW1lLXNsaWRlci1jb250YWluZXJcIj4nICtcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC12b2x1bWUtc2lsZGVyXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLXZvbHVtZS1zbGlkZXItYmdcIj48L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtdm9sdW1lLXNsaWRlci12YWx1ZVwiPjwvZGl2PicgK1xuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC12b2x1bWUtc2xpZGVyLWhhbmRsZVwiPjwvZGl2PicgK1xuICAgICAgICAgICAgICAgICc8L2Rpdj4nK1xuICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAnPC9kaXY+J1xuICAgICk7XG59O1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMTkuLlxuICovXG5cbmltcG9ydCBUZW1wbGF0ZXMgZnJvbSBcInZpZXcvZW5naW5lL1RlbXBsYXRlc1wiO1xuaW1wb3J0IExBJCBmcm9tICd1dGlscy9saWtlQSQnO1xuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBUaGlzIGlzIHNpbXBsZSB1aSByZW5kZXJlci4gVGhpcyByZXR1cm5zIG9uUmVuZGVyZWQgY2FsbGJhY2ssIG9uRGVzdHJveWVkIGNhbGxiYWNrIG9uIFRlbXBsYXRlLiBBbmQgdGhpcyBiaW5kIGV2ZW50cyBmb3IgVGVtcGxhdGVzLlxuICogQHBhcmFtICAgY29udGFpbmVyICBkb20gZWxlbWVudCBvciBMQSQgb2JqZWN0XG4gKiBAcGFyYW0gICB0ZW1wbGF0ZU5hbWUgICAgdGVtcGxhdGVOYW1lXG4gKiBAcGFyYW0gICBkYXRhICAgIHByZWxvYWQgZGF0YVxuICogQHBhcmFtICAgZXZlbnRzICAgIFRlbXBsYXRlJ3MgZXZlbnRzLlxuICogQHBhcmFtICAgb25SZW5kZXJlZCAgICBUaGlzIGNhbGxiYWNrIG9jY3VycyBhZnRlciBhcHBlbmQgdGVtcGxhdGUuXG4gKiBAcGFyYW0gICBvbkRlc3Ryb3llZCAgICBUaGlzIGNhbGxiYWNrIG9jY3VycyBhZnRlciBkZXN0cm95ZWQgdGVtcGxhdGUuXG4gKiBAcGFyYW0gICBpc1Jvb3RcbiAqXG4gKiAqL1xuY29uc3QgT3ZlblRlbXBsYXRlID0gZnVuY3Rpb24gKGNvbnRhaW5lciwgdGVtcGxhdGVOYW1lLCBkYXRhLCBldmVudHMsIG9uUmVuZGVyZWQsIG9uRGVzdHJveWVkLCBpc1Jvb3QpIHtcbiAgICBsZXQgJGNvbnRhaW5lciA9IF8uaXNFbGVtZW50KGNvbnRhaW5lcikgPyBMQSQoY29udGFpbmVyKSA6IGNvbnRhaW5lcjtcbiAgICBsZXQgJHRlbXBsYXRlO1xuICAgIGxldCB2aWV3RXZlbnRzID0ge307XG4gICAgbGV0IHRoYXQgPSB7fTtcblxuICAgIGxldCBjcmVhdGVBbmRTZWxlY3RFbGVtZW50ID0gZnVuY3Rpb24gKGh0bWwpIHtcbiAgICAgICAgY29uc3QgbmV3RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBuZXdFbGVtZW50LmlubmVySFRNTCA9IGh0bWw7XG5cbiAgICAgICAgJHRlbXBsYXRlID0gTEEkKG5ld0VsZW1lbnQuZmlyc3RDaGlsZCk7XG5cbiAgICAgICAgcmV0dXJuIG5ld0VsZW1lbnQuZmlyc3RDaGlsZDtcbiAgICB9XG5cbiAgICBpZiAoaXNSb290KSB7XG4gICAgICAgICRjb250YWluZXIucmVwbGFjZShjcmVhdGVBbmRTZWxlY3RFbGVtZW50KFRlbXBsYXRlc1t0ZW1wbGF0ZU5hbWUgKyBcIlRlbXBsYXRlXCJdKGRhdGEpKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJGNvbnRhaW5lci5hcHBlbmQoY3JlYXRlQW5kU2VsZWN0RWxlbWVudChUZW1wbGF0ZXNbdGVtcGxhdGVOYW1lICsgXCJUZW1wbGF0ZVwiXShkYXRhKSkpO1xuICAgIH1cblxuICAgIGlmIChvblJlbmRlcmVkKSB7XG4gICAgICAgIG9uUmVuZGVyZWQoJHRlbXBsYXRlLCB0aGF0KTtcbiAgICB9XG5cbiAgICBPYmplY3Qua2V5cyhldmVudHMpLmZvckVhY2goZXZlbnRTdHJpbmcgPT4ge1xuICAgICAgICBsZXQgZXhwbG9kZWRUZXh0ID0gZXZlbnRTdHJpbmcuc3BsaXQoXCIgXCIpO1xuICAgICAgICBsZXQgZXZlbnROYW1lID0gZXhwbG9kZWRUZXh0WzBdLnJlcGxhY2UoLyAvZ2ksIFwiXCIpO1xuICAgICAgICBsZXQgdGFyZ2V0ID0gZXhwbG9kZWRUZXh0WzFdLnJlcGxhY2UoLyAvZ2ksIFwiXCIpO1xuXG4gICAgICAgIGxldCAkdGFyZ2V0ID0gXCJcIjtcblxuICAgICAgICBpZih0YXJnZXQgPT09IFwiZG9jdW1lbnRcIiB8fCB0YXJnZXQgPT09IFwid2luZG93XCIpe1xuICAgICAgICAgICAgJHRhcmdldCA9IExBJCh0YXJnZXQpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICR0YXJnZXQgPSAkdGVtcGxhdGUuZmluZCh0YXJnZXQpIHx8ICgkdGVtcGxhdGUuaGFzQ2xhc3ModGFyZ2V0LnJlcGxhY2UoXCIuXCIsXCJcIikpID8gJHRlbXBsYXRlIDogbnVsbCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmIChldmVudE5hbWUgJiYgdGFyZ2V0ICYmICR0YXJnZXQpIHtcbiAgICAgICAgICAgIGxldCBpZCA9IE9iamVjdC5rZXlzKHZpZXdFdmVudHMpLmxlbmd0aCsrO1xuXG4gICAgICAgICAgICAvL2JlY2F1c2UgSXQgcmV0dW5zIGFub3RoZXIgZGF0YS5cbiAgICAgICAgICAgIGxldCB3cmFwcGVkRnVuYyA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBldmVudHNbZXZlbnRTdHJpbmddKGV2ZW50LCAkdGVtcGxhdGUsIHRoYXQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZpZXdFdmVudHNbaWRdID0ge25hbWU6IGV2ZW50TmFtZSwgdGFyZ2V0OiB0YXJnZXQsIGNhbGxiYWNrOiB3cmFwcGVkRnVuY307XG5cbiAgICAgICAgICAgIC8vc29tZXRpbWVzIHRhcmdldCBpcyBOb2RlTGlzdFxuICAgICAgICAgICAgaWYoJHRhcmdldC5nZXQoKS5mb3JFYWNoKXtcbiAgICAgICAgICAgICAgICAkdGFyZ2V0LmdldCgpLmZvckVhY2goZnVuY3Rpb24oJGl0ZW0pe1xuICAgICAgICAgICAgICAgICAgICAkaXRlbS5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgd3JhcHBlZEZ1bmMpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgJHRhcmdldC5nZXQoKS5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgd3JhcHBlZEZ1bmMpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhhdC5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBPYmplY3Qua2V5cyh2aWV3RXZlbnRzKS5mb3JFYWNoKGlkID0+IHtcbiAgICAgICAgICAgIGxldCBldmVudCA9IHZpZXdFdmVudHNbaWRdO1xuICAgICAgICAgICAgbGV0ICR0YXJnZXQgPSBcIlwiO1xuXG4gICAgICAgICAgICBpZihldmVudC50YXJnZXQgPT09IFwiZG9jdW1lbnRcIiB8fCBldmVudC50YXJnZXQgPT09IFwid2luZG93XCIpe1xuICAgICAgICAgICAgICAgICR0YXJnZXQgPSBMQSQoZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICR0YXJnZXQgPSAkdGVtcGxhdGUuZmluZChldmVudC50YXJnZXQpIHx8ICgkdGVtcGxhdGUuaGFzQ2xhc3MoZXZlbnQudGFyZ2V0LnJlcGxhY2UoXCIuXCIsXCJcIikpID8gJHRlbXBsYXRlIDogbnVsbCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vc29tZXRpbWVzIHRhcmdldCBpcyBOb2RlTGlzdFxuICAgICAgICAgICAgaWYoJHRhcmdldC5nZXQoKS5mb3JFYWNoKXtcbiAgICAgICAgICAgICAgICAkdGFyZ2V0LmdldCgpLmZvckVhY2goZnVuY3Rpb24oJGl0ZW0pe1xuICAgICAgICAgICAgICAgICAgICAkaXRlbS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50Lm5hbWUsIGV2ZW50LmNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICR0YXJnZXQuZ2V0KCkucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudC5uYW1lLCBldmVudC5jYWxsYmFjayk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRlbGV0ZSB2aWV3RXZlbnRzW2lkXTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYoJHRlbXBsYXRlKXtcbiAgICAgICAgICAgICR0ZW1wbGF0ZS5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvbkRlc3Ryb3llZCkge1xuICAgICAgICAgICAgb25EZXN0cm95ZWQoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG5cbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgT3ZlblRlbXBsYXRlOyIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDIwLi5cbiAqL1xuaW1wb3J0IFRleHRWaWV3VGVtcGxhdGUgZnJvbSAndmlldy9leGFtcGxlL21haW5UZW1wbGF0ZSc7XG5pbXBvcnQgVmlld1RlbXBsYXRlIGZyb20gJ3ZpZXcvdmlld1RlbXBsYXRlJztcbmltcG9ydCBIZWxwZXJUZW1wbGF0ZSBmcm9tICd2aWV3L2hlbHBlci9tYWluVGVtcGxhdGUnO1xuaW1wb3J0IEJpZ0J1dHRvblRlbXBsYXRlIGZyb20gJ3ZpZXcvaGVscGVyL2JpZ0J1dHRvblRlbXBsYXRlJztcbmltcG9ydCBNZXNzYWdlQm94VGVtcGxhdGUgZnJvbSAndmlldy9oZWxwZXIvbWVzc2FnZUJveFRlbXBsYXRlJztcbmltcG9ydCBTcGlubmVyVGVtcGxhdGUgZnJvbSAndmlldy9oZWxwZXIvc3Bpbm5lclRlbXBsYXRlJztcbmltcG9ydCBDb250ZXh0UGFuZWxUZW1wbGF0ZSBmcm9tICd2aWV3L2hlbHBlci9jb250ZXh0UGFuZWxUZW1wbGF0ZSc7XG5cbmltcG9ydCBDb250cm9sc1RlbXBsYXRlIGZyb20gJ3ZpZXcvY29udHJvbHMvbWFpblRlbXBsYXRlJztcbmltcG9ydCBWb2x1bWVCdXR0b25UZW1wbGF0ZSBmcm9tICd2aWV3L2NvbnRyb2xzL3ZvbHVtZUJ1dHRvblRlbXBsYXRlJztcbmltcG9ydCBQcm9ncmVzc0JhclRlbXBsYXRlIGZyb20gJ3ZpZXcvY29udHJvbHMvcHJvZ3Jlc3NCYXJUZW1wbGF0ZSc7XG5pbXBvcnQgUGxheUJ1dHRvblRlbXBsYXRlIGZyb20gJ3ZpZXcvY29udHJvbHMvcGxheUJ1dHRvblRlbXBsYXRlJztcbmltcG9ydCBUaW1lRGlzcGxheVRlbXBsYXRlIGZyb20gJ3ZpZXcvY29udHJvbHMvdGltZURpc3BsYXlUZW1wbGF0ZSc7XG5pbXBvcnQgRnVsbFNjcmVlbkJ1dHRvblRlbXBsYXRlIGZyb20gJ3ZpZXcvY29udHJvbHMvZnVsbFNjcmVlbkJ1dHRvblRlbXBsYXRlJztcbmltcG9ydCBTZXR0aW5nUGFuZWxUZW1wbGF0ZSBmcm9tICd2aWV3L2NvbnRyb2xzL3NldHRpbmdQYW5lbFRlbXBsYXRlJztcblxuY29uc3QgVGVtcGxhdGVzID0ge1xuICAgIFRleHRWaWV3VGVtcGxhdGUsXG4gICAgVmlld1RlbXBsYXRlLFxuICAgIEhlbHBlclRlbXBsYXRlLFxuICAgIEJpZ0J1dHRvblRlbXBsYXRlLFxuICAgIE1lc3NhZ2VCb3hUZW1wbGF0ZSxcbiAgICBTcGlubmVyVGVtcGxhdGUsXG4gICAgQ29udGV4dFBhbmVsVGVtcGxhdGUsXG5cbiAgICBDb250cm9sc1RlbXBsYXRlLFxuICAgIFZvbHVtZUJ1dHRvblRlbXBsYXRlLFxuICAgIFByb2dyZXNzQmFyVGVtcGxhdGUsXG4gICAgUGxheUJ1dHRvblRlbXBsYXRlLFxuICAgIFRpbWVEaXNwbGF5VGVtcGxhdGUsXG4gICAgRnVsbFNjcmVlbkJ1dHRvblRlbXBsYXRlLFxuICAgIFNldHRpbmdQYW5lbFRlbXBsYXRlXG59O1xuXG5leHBvcnQgZGVmYXVsdCBUZW1wbGF0ZXM7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMTkuLlxuICovXG5cbmNvbnN0IFRleHRWaWV3VGVtcGxhdGUgPSBmdW5jdGlvbih0ZXh0KXtcbiAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJ0ZXh0Vmlld1wiIHN0eWxlPVwicGFkZGluZyA6IDVweDsgYmFja2dyb3VuZDogcmVkXCI+JyArXG4gICAgICAgICAgICAgICAgJzxoMz4nK3RleHQrJzwvaDM+JyArXG4gICAgICAgICAgICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuXCI+64ur6riwPC9idXR0b24+JyArXG4gICAgICAgICAgICAnPC9kaXY+Jztcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRleHRWaWV3VGVtcGxhdGU7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMjYuLlxuICovXG5jb25zdCBTZXR0aW5nUGFuZWxMaXN0ID0gW107XG5cbmV4cG9ydCBkZWZhdWx0IFNldHRpbmdQYW5lbExpc3Q7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMjQuLlxuICovXG5pbXBvcnQgT3ZlblRlbXBsYXRlIGZyb20gJ3ZpZXcvZW5naW5lL092ZW5UZW1wbGF0ZSc7XG5pbXBvcnQge1xuICAgIFNUQVRFX0lETEUsXG4gICAgU1RBVEVfUExBWUlORyxcbiAgICBTVEFURV9DT01QTEVURSxcbiAgICBTVEFURV9QQVVTRURcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuY29uc3QgQmlnQnV0dG9uID0gZnVuY3Rpb24oJGNvbnRhaW5lciwgYXBpLCBwbGF5ZXJTdGF0ZSl7XG5cbiAgICBjb25zdCBvblJlbmRlcmVkID0gZnVuY3Rpb24oJGNvbnRhaW5lciwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcbiAgICAgICAgLy9EbyBub3RoaW5nIVxuICAgIH07XG4gICAgY29uc3Qgb25EZXN0cm95ZWQgPSBmdW5jdGlvbigpe1xuICAgICAgICAvL0RvIG5vdGhpbmchXG4gICAgfTtcbiAgICBjb25zdCBldmVudHMgPSB7XG4gICAgICAgIC8qXCJjbGljayAub3ZwLWJpZ2J1dHRvbi1jb250YWluZXJcIiA6IGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRTdGF0ZSA9IGFwaS5nZXRTdGF0ZSgpO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRTdGF0ZSA9PT0gU1RBVEVfSURMRSB8fCBjdXJyZW50U3RhdGUgPT09IFNUQVRFX1BBVVNFRCB8fCBjdXJyZW50U3RhdGUgPT09IFNUQVRFX0NPTVBMRVRFKSB7XG4gICAgICAgICAgICAgICAgYXBpLnBsYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSovXG4gICAgfTtcblxuICAgIHJldHVybiBPdmVuVGVtcGxhdGUoJGNvbnRhaW5lciwgXCJCaWdCdXR0b25cIiwgcGxheWVyU3RhdGUsIGV2ZW50cywgb25SZW5kZXJlZCwgb25EZXN0cm95ZWQgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEJpZ0J1dHRvbjsiLCJpbXBvcnQge1xuICAgIFNUQVRFX0lETEUsXG4gICAgU1RBVEVfUExBWUlORyxcbiAgICBTVEFURV9TVEFMTEVELFxuICAgIFNUQVRFX0xPQURJTkcsXG4gICAgU1RBVEVfQ09NUExFVEUsXG4gICAgU1RBVEVfUEFVU0VELFxuICAgIFNUQVRFX0VSUk9SXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5cblxuZXhwb3J0IGRlZmF1bHQgKHBsYXllclN0YXRlKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtYmlnYnV0dG9uLWNvbnRhaW5lciBcIj4nICsgICAgICAvL2FuaW1hdGVkIGJvdW5jZUluXG4gICAgICAgICAgICAocGxheWVyU3RhdGUgPT09IFNUQVRFX1BMQVlJTkcgPyAnPGkgY2xhc3M9XCJvdnAtYmlnYnV0dG9uIG92cC1iaWdidXR0b24tcGF1c2VcIj48L2k+JyA6ICcnKSArXG4gICAgICAgICAgICAocGxheWVyU3RhdGUgPT09IFNUQVRFX1BBVVNFRCAgPyAnPGkgY2xhc3M9XCJvdnAtYmlnYnV0dG9uIG92cC1iaWdidXR0b24tcGxheVwiPjwvaT4nIDogJycpICtcbiAgICAgICAgICAgIChwbGF5ZXJTdGF0ZSA9PT0gU1RBVEVfQ09NUExFVEUgPyAnPGkgY2xhc3M9XCJvdnAtYmlnYnV0dG9uIG92cC1iaWdidXR0b24tcmVwbGF5XCI+PC9pPicgOiAnJykgK1xuICAgICAgICAnPC9kaXY+J1xuICAgICk7XG59OyIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDguIDEuLlxuICovXG5pbXBvcnQgT3ZlblRlbXBsYXRlIGZyb20gJ3ZpZXcvZW5naW5lL092ZW5UZW1wbGF0ZSc7XG5pbXBvcnQgTEEkIGZyb20gJ3V0aWxzL2xpa2VBJCc7XG5cbmNvbnN0IENvbnRleHRQYW5lbCA9IGZ1bmN0aW9uKCRjb250YWluZXIsIGFwaSwgcG9zaXRpb24pe1xuICAgIGNvbnN0ICRyb290ID0gTEEkKFwiI1wiK2FwaS5nZXRJZCgpKTtcblxuICAgIGNvbnN0IG9uUmVuZGVyZWQgPSBmdW5jdGlvbigkY3VycmVudCwgdGVtcGxhdGUpe1xuICAgICAgICBjb25zdCBwYW5lbFdpZHRoID0gJGN1cnJlbnQud2lkdGgoKTtcbiAgICAgICAgY29uc3QgcGFuZWxIZWlnaHQgPSAkY3VycmVudC5oZWlnaHQoKTtcblxuICAgICAgICBjb25zdCB4ID0gTWF0aC5taW4ocG9zaXRpb24ucGFnZVggLSAkcm9vdC5vZmZzZXQoKS5sZWZ0LCAkcm9vdC53aWR0aCgpIC0gcGFuZWxXaWR0aCk7XG4gICAgICAgIGNvbnN0IHkgPSBNYXRoLm1pbihwb3NpdGlvbi5wYWdlWSAtICRyb290Lm9mZnNldCgpLnRvcCwgJHJvb3QuaGVpZ2h0KCkgLSBwYW5lbEhlaWdodCk7XG5cbiAgICAgICAgJGN1cnJlbnQuY3NzKFwibGVmdFwiICwgeCArIFwicHhcIik7XG4gICAgICAgICRjdXJyZW50LmNzcyhcInRvcFwiICwgeSArIFwicHhcIik7XG4gICAgfTtcbiAgICBjb25zdCBvbkRlc3Ryb3llZCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vRG8gbm90aGluZy5cbiAgICB9O1xuICAgIGNvbnN0IGV2ZW50cyA9IHtcbiAgICAgICAgXCJjbGljayAub3ZwLWNvbnRleHQtaXRlbVwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB3aW5kb3cub3BlbihcbiAgICAgICAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL0FpcmVuU29mdC9PdmVuUGxheWVyJyxcbiAgICAgICAgICAgICAgICAnX2JsYW5rJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gT3ZlblRlbXBsYXRlKCRjb250YWluZXIsIFwiQ29udGV4dFBhbmVsXCIsIHBvc2l0aW9uLCBldmVudHMsIG9uUmVuZGVyZWQsIG9uRGVzdHJveWVkICk7XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbnRleHRQYW5lbDsiLCJpbXBvcnQge3ZlcnNpb259IGZyb20gJ3ZlcnNpb24nO1xuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLWNvbnRleHQtcGFuZWwgYW5pbWF0ZWQgZmFkZUluXCI+JyArXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1jb250ZXh0LWl0ZW1cIiB0YWJpbmRleD1cIjBcIj4nICtcbiAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJvdnAtY29udGV4dC1pdGVtLXRleHRcIj5IZWxwPC9zcGFuPicgK1xuICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1jb250ZXh0LWl0ZW1cIiB0YWJpbmRleD1cIjFcIj4nICtcbiAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJvdnAtY29udGV4dC1pdGVtLXRleHRcIj5BYm91dCBPdmVuUGxheWVyICcrdmVyc2lvbisnPC9zcGFuPicgK1xuICAgICAgICAgICAgJzwvZGl2PicrXG4gICAgICAgICc8L2Rpdj4nXG4gICAgKTtcbn07IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMjQuLlxuICovXG5pbXBvcnQgT3ZlblRlbXBsYXRlIGZyb20gJ3ZpZXcvZW5naW5lL092ZW5UZW1wbGF0ZSc7XG5pbXBvcnQgQmlnQnV0dG9uIGZyb20gJ3ZpZXcvaGVscGVyL2JpZ0J1dHRvbic7XG5pbXBvcnQgTWVzc2FnZUJveCBmcm9tICd2aWV3L2hlbHBlci9tZXNzYWdlQm94JztcbmltcG9ydCBTcGlubmVyIGZyb20gJ3ZpZXcvaGVscGVyL3NwaW5uZXInO1xuXG5pbXBvcnQge1xuICAgIFJFQURZLFxuICAgIEVSUk9SLFxuICAgIFNUQVRFX0lETEUsXG4gICAgU1RBVEVfUExBWUlORyxcbiAgICBTVEFURV9TVEFMTEVELFxuICAgIFNUQVRFX0xPQURJTkcsXG4gICAgU1RBVEVfQ09NUExFVEUsXG4gICAgU1RBVEVfUEFVU0VELFxuICAgIFNUQVRFX0VSUk9SLFxuICAgIFBMQVlFUl9TVEFURSxcbiAgICBORVRXT1JLX1VOU1RBQkxFRFxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG5jb25zdCBIZWxwZXIgPSBmdW5jdGlvbigkY29udGFpbmVyLCBhcGkpe1xuICAgIGxldCBiaWdCdXR0b24gPSBcIlwiLCBtZXNzYWdlQm94ID0gXCJcIiwgc3Bpbm5lciA9IFwiXCI7XG5cblxuXG4gICAgY29uc3Qgb25SZW5kZXJlZCA9IGZ1bmN0aW9uKCRjdXJyZW50LCB0ZW1wbGF0ZSl7XG4gICAgICAgIGxldCBjcmVhdGVCaWdCdXR0b24gPSBmdW5jdGlvbihzdGF0ZSl7XG4gICAgICAgICAgICBpZihiaWdCdXR0b24pe1xuICAgICAgICAgICAgICAgIGJpZ0J1dHRvbi5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBiaWdCdXR0b24gPSBCaWdCdXR0b24oJGN1cnJlbnQsIGFwaSwgc3RhdGUpO1xuICAgICAgICB9O1xuICAgICAgICBsZXQgY3JlYXRlTWVzc2FnZSA9IGZ1bmN0aW9uKG1lc3NhZ2UsIHdpdGhUaW1lcil7XG4gICAgICAgICAgICBpZihtZXNzYWdlQm94KXtcbiAgICAgICAgICAgICAgICBtZXNzYWdlQm94LmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1lc3NhZ2VCb3ggPSBNZXNzYWdlQm94KCRjdXJyZW50LCBhcGksIG1lc3NhZ2UsIHdpdGhUaW1lcik7XG4gICAgICAgIH07XG4gICAgICAgIHNwaW5uZXIgPSBTcGlubmVyKCRjdXJyZW50LCBhcGkpO1xuXG4gICAgICAgIGFwaS5vbihSRUFEWSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjcmVhdGVCaWdCdXR0b24oU1RBVEVfUEFVU0VEKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGFwaS5vbihQTEFZRVJfU1RBVEUsIGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgICAgaWYoZGF0YSAmJiBkYXRhLm5ld3N0YXRlKXtcbiAgICAgICAgICAgICAgICBpZihkYXRhLm5ld3N0YXRlID09PSBTVEFURV9QTEFZSU5HKXtcbiAgICAgICAgICAgICAgICAgICAgYmlnQnV0dG9uLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICAgICAgc3Bpbm5lci5zaG93KGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlQmlnQnV0dG9uKGRhdGEubmV3c3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICBpZihkYXRhLm5ld3N0YXRlID09PSBTVEFURV9TVEFMTEVEIHx8IGRhdGEubmV3c3RhdGUgPT09IFNUQVRFX0xPQURJTkcgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwaW5uZXIuc2hvdyh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcGlubmVyLnNob3coZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgYXBpLm9uKEVSUk9SLCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSAnJztcblxuICAgICAgICAgICAgaWYgKGVycm9yLmNvZGUgPT09IDEwMCkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnSW5pdGlhbGl6YXRpb24gZmFpbGVkLic7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVycm9yLmNvZGUgPT09IDMwMSkge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnTWVkaWEgcGxheWJhY2sgd2FzIGNhbmNlbGVkLic7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVycm9yLmNvZGUgPT09IDMwMikge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnU29tZSBvZiB0aGUgbWVkaWEgY291bGQgbm90IGJlIGRvd25sb2FkZWQgZHVlIHRvIGEgbmV0d29yayBlcnJvci4nO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChlcnJvci5jb2RlID09PSAzMDMpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ1VuYWJsZSB0byBsb2FkIG1lZGlhLiBUaGlzIG1heSBiZSBkdWUgdG8gYSBzZXJ2ZXIgb3IgbmV0d29yayBlcnJvciwgb3IgZHVlIHRvIGFuIHVuc3VwcG9ydGVkIGZvcm1hdC4nO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChlcnJvci5jb2RlID09PSAzMDQpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ01lZGlhIHBsYXliYWNrIGhhcyBiZWVuIGNhbmNlbGVkLiBJdCBsb29rcyBsaWtlIHlvdXIgbWVkaWEgaXMgY29ycnVwdGVkIG9yIHlvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSBmZWF0dXJlcyB5b3VyIG1lZGlhIHVzZXMuJztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyc2VJbnQoZXJyb3IuY29kZS8xMDApID09PSA1KSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdDb25uZWN0aW9uIHdpdGggbG93LWxhdGVuY3kgc2VydmVyIGZhaWxlZC4nO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ0NhbiBub3QgcGxheSBkdWUgdG8gdW5rbm93biByZWFzb25zLic7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNyZWF0ZU1lc3NhZ2UobWVzc2FnZSwgbnVsbCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGFwaS5vbihORVRXT1JLX1VOU1RBQkxFRCwgZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSAnQmVjYXVzZSB0aGUgbmV0d29yayBjb25uZWN0aW9uIGlzIHVuc3RhYmxlLCB0aGUgZm9sbG93aW5nIG1lZGlhIHNvdXJjZSB3aWxsIGJlIHBsYXllZC4nO1xuXG4gICAgICAgICAgICBpZihhcGkuZ2V0Q3VycmVudFF1YWxpdHkoKSsxID09PSAgYXBpLmdldFF1YWxpdHlMZXZlbHMoKS5sZW5ndGgpe1xuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnTmV0d29yayBjb25uZWN0aW9uIGlzIHVuc3RhYmxlLiBDaGVjayB0aGUgbmV0d29yayBjb25uZWN0aW9uLic7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNyZWF0ZU1lc3NhZ2UobWVzc2FnZSwgNTAwMCk7XG4gICAgICAgIH0pO1xuXG4gICAgfTtcbiAgICBjb25zdCBvbkRlc3Ryb3llZCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vRG8gbm90aGluZy5cbiAgICB9O1xuICAgIGNvbnN0IGV2ZW50cyA9IHtcblxuICAgIH07XG5cbiAgICByZXR1cm4gT3ZlblRlbXBsYXRlKCRjb250YWluZXIsIFwiSGVscGVyXCIsIG51bGwsIGV2ZW50cywgb25SZW5kZXJlZCwgb25EZXN0cm95ZWQgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEhlbHBlcjsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAxOS4uXG4gKi9cblxuY29uc3QgSGVscGVyVGVtcGxhdGUgPSBmdW5jdGlvbih0ZXh0KXtcbiAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJvdnAtaGVscGVyXCI+PC9kaXY+Jztcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEhlbHBlclRlbXBsYXRlOyIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDI0Li5cbiAqL1xuaW1wb3J0IE92ZW5UZW1wbGF0ZSBmcm9tICd2aWV3L2VuZ2luZS9PdmVuVGVtcGxhdGUnO1xuaW1wb3J0IHtcbiAgICBTVEFURV9JRExFLFxuICAgIFNUQVRFX1BMQVlJTkcsXG4gICAgU1RBVEVfQ09NUExFVEUsXG4gICAgU1RBVEVfUEFVU0VEXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5cbmNvbnN0IE1lc3NhZ2VCb3ggPSBmdW5jdGlvbigkY29udGFpbmVyLCBhcGksIG1lc3NhZ2UsIHdpdGhUaW1lcil7XG5cbiAgICBsZXQgYXV0b0Rlc3Ryb3lUaW1lciA9IFwiXCI7XG5cbiAgICBjb25zdCBvblJlbmRlcmVkID0gZnVuY3Rpb24oJGN1cnJlbnQsIHRlbXBsYXRlKXtcbiAgICAgICAgaWYod2l0aFRpbWVyKXtcbiAgICAgICAgICAgIGF1dG9EZXN0cm95VGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGUuZGVzdHJveSgpO1xuICAgICAgICAgICAgfSwgd2l0aFRpbWVyfHw1MDAwKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3Qgb25EZXN0cm95ZWQgPSBmdW5jdGlvbigpe1xuICAgIH07XG4gICAgY29uc3QgZXZlbnRzID0ge1xuICAgICAgICBcImNsaWNrIC5vdnAtbWVzc2FnZS10ZXh0XCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGlmKGF1dG9EZXN0cm95VGltZXIpe1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChhdXRvRGVzdHJveVRpbWVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRlbXBsYXRlLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gT3ZlblRlbXBsYXRlKCRjb250YWluZXIsIFwiTWVzc2FnZUJveFwiLCBtZXNzYWdlLCBldmVudHMsIG9uUmVuZGVyZWQsIG9uRGVzdHJveWVkICk7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IE1lc3NhZ2VCb3g7IiwiZXhwb3J0IGRlZmF1bHQgKG1lc3NhZ2UpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgICAnPGRpdiBjbGFzcz1cIm92cC1tZXNzYWdlLWJveCBhbmltYXRlZCBzaGFrZVwiPicgK1xuICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtbWVzc2FnZS1jb250YWluZXJcIj4nICtcbiAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJvdnAtbWVzc2FnZS10ZXh0XCI+JyttZXNzYWdlKyc8L3NwYW4+JyArXG4gICAgICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICc8L2Rpdj4nXG4gICAgKTtcbn07IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMjUuLlxuICovXG5pbXBvcnQgT3ZlblRlbXBsYXRlIGZyb20gJ3ZpZXcvZW5naW5lL092ZW5UZW1wbGF0ZSc7XG5cbmNvbnN0IFNwaW5uZXIgPSBmdW5jdGlvbigkY29udGFpbmVyLCBhcGkpe1xuICAgIGxldCAkc3Bpbm5lciA9IFwiXCI7XG5cbiAgICBjb25zdCBvblJlbmRlcmVkID0gZnVuY3Rpb24oJGN1cnJlbnQsIHRlbXBsYXRlKXtcbiAgICAgICAgJHNwaW5uZXIgPSAkY3VycmVudDtcbiAgICB9O1xuICAgIGNvbnN0IG9uRGVzdHJveWVkID0gZnVuY3Rpb24oKXtcbiAgICAgICAgLy9EbyBub3RoaW5nLlxuICAgIH07XG4gICAgY29uc3QgZXZlbnRzID0ge307XG5cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPdmVuVGVtcGxhdGUoJGNvbnRhaW5lciwgXCJTcGlubmVyXCIsIG51bGwsIGV2ZW50cywgb25SZW5kZXJlZCwgb25EZXN0cm95ZWQgKSwge1xuICAgICAgICBzaG93OiBmdW5jdGlvbiAoaXNTaG93KSB7XG4gICAgICAgICAgICBpZihpc1Nob3cpe1xuICAgICAgICAgICAgICAgICRzcGlubmVyLnNob3coKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICRzcGlubmVyLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCBTcGlubmVyOyIsImV4cG9ydCBkZWZhdWx0ICgpID0+IHtcbiAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJvdnAtc3Bpbm5lci1jb250YWluZXJcIj48ZGl2IGNsYXNzPVwib3ZwLXNwaW5uZXJcIj48ZGl2IGNsYXNzPVwiYm91bmNlMVwiPjwvZGl2PjxkaXYgY2xhc3M9XCJib3VuY2UyXCI+PC9kaXY+PGRpdiBjbGFzcz1cImJvdW5jZTNcIj48L2Rpdj48L2Rpdj48L2Rpdj4nO1xufTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDIwLi5cbiAqL1xuaW1wb3J0IE92ZW5UZW1wbGF0ZSBmcm9tICd2aWV3L2VuZ2luZS9PdmVuVGVtcGxhdGUnO1xuaW1wb3J0IEhlbHBlciBmcm9tICd2aWV3L2hlbHBlci9tYWluJztcbmltcG9ydCBDb250cm9scyBmcm9tICd2aWV3L2NvbnRyb2xzL21haW4nO1xuaW1wb3J0IFNldHRpbmdQYW5lbExpc3QgZnJvbSAndmlldy9nbG9iYWwvU2V0dGluZ1BhbmVsTGlzdCc7XG5pbXBvcnQgQ29udGV4dFBhbmVsIGZyb20gJ3ZpZXcvaGVscGVyL2NvbnRleHRQYW5lbCc7XG5pbXBvcnQgTEEkIGZyb20gJ3V0aWxzL2xpa2VBJCc7XG5pbXBvcnQgXyBmcm9tICd1dGlscy91bmRlcnNjb3JlJztcbmltcG9ydCB7XG4gICAgUkVBRFksXG4gICAgU1RBVEVfSURMRSxcbiAgICBTVEFURV9QTEFZSU5HLFxuICAgIFNUQVRFX1NUQUxMRUQsXG4gICAgU1RBVEVfTE9BRElORyxcbiAgICBTVEFURV9DT01QTEVURSxcbiAgICBTVEFURV9QQVVTRUQsXG4gICAgU1RBVEVfRVJST1IsXG4gICAgQ09OVEVOVF9NRVRBLFxuICAgIFBMQVlFUl9TVEFURSxcbiAgICBFUlJPUlxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG5cbmNvbnN0IFZpZXcgPSBmdW5jdGlvbigkY29udGFpbmVyKXtcbiAgICBsZXQgY29udHJvbHMgPSBcIlwiLCBoZWxwZXIgPSBcIlwiLCAkcGxheWVyUm9vdCwgY29udGV4dFBhbmVsID0gXCJcIiwgYXBpID0gXCJcIiwgYXV0b0hpZGVUaW1lciA9IFwiXCI7XG5cbiAgICBsZXQgc2V0SGlkZSA9IGZ1bmN0aW9uIChoaWRlLCBhdXRvSGlkZSkge1xuXG4gICAgICAgIGlmIChhdXRvSGlkZVRpbWVyKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoYXV0b0hpZGVUaW1lcik7XG4gICAgICAgICAgICBhdXRvSGlkZVRpbWVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoaWRlKSB7XG4gICAgICAgICAgICBpZihTZXR0aW5nUGFuZWxMaXN0Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICRwbGF5ZXJSb290LmFkZENsYXNzKFwib3ZwLWF1dG9oaWRlXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHBsYXllclJvb3QucmVtb3ZlQ2xhc3MoXCJvdnAtYXV0b2hpZGVcIik7XG5cbiAgICAgICAgICAgIGlmIChhdXRvSGlkZSkge1xuICAgICAgICAgICAgICAgIGF1dG9IaWRlVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpZihTZXR0aW5nUGFuZWxMaXN0Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICRwbGF5ZXJSb290LmFkZENsYXNzKFwib3ZwLWF1dG9oaWRlXCIpO1xuICAgICAgICAgICAgICAgIH0sIDE4MDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBsZXQgdG9nZ2xlUGxheVBhdXNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBjdXJyZW50U3RhdGUgPSBhcGkuZ2V0U3RhdGUoKTtcblxuICAgICAgICBpZiAoY3VycmVudFN0YXRlID09PSBTVEFURV9JRExFIHx8IGN1cnJlbnRTdGF0ZSA9PT0gU1RBVEVfUEFVU0VEIHx8IGN1cnJlbnRTdGF0ZSA9PT0gU1RBVEVfQ09NUExFVEUpIHtcbiAgICAgICAgICAgIGFwaS5wbGF5KCk7XG4gICAgICAgIH1lbHNlIGlmKGN1cnJlbnRTdGF0ZSA9PT0gU1RBVEVfUExBWUlORyl7XG4gICAgICAgICAgICBhcGkucGF1c2UoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgbGV0IHNlZWsgPSBmdW5jdGlvbiAoc2Vjb25kcywgaXNSZXdpbmQpIHtcblxuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IGFwaS5nZXREdXJhdGlvbigpO1xuICAgICAgICBjb25zdCBjdXJyZW50UG9zaXRpb24gPSBhcGkuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gMDtcblxuICAgICAgICBpZihpc1Jld2luZCl7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IE1hdGgubWF4KGN1cnJlbnRQb3NpdGlvbiAtIHNlY29uZHMsIDApO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gTWF0aC5taW4oY3VycmVudFBvc2l0aW9uICsgc2Vjb25kcywgZHVyYXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgYXBpLnNlZWsocG9zaXRpb24pO1xuICAgIH07XG4gICAgbGV0IHZvbHVtZSA9IGZ1bmN0aW9uKGlzVXApe1xuICAgICAgICBjb25zdCBjdXJyZW50Vm9sdW1uID0gYXBpLmdldFZvbHVtZSgpO1xuICAgICAgICBsZXQgbmV3Vm9sdW1lID0gMDtcbiAgICAgICAgaWYoaXNVcCl7XG4gICAgICAgICAgICBuZXdWb2x1bWUgPSAgTWF0aC5taW4oY3VycmVudFZvbHVtbiArIDUsIDEwMCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgbmV3Vm9sdW1lID0gTWF0aC5tYXgoY3VycmVudFZvbHVtbiAtIDUsIDApO1xuICAgICAgICB9XG4gICAgICAgIGFwaS5zZXRWb2x1bWUobmV3Vm9sdW1lKTtcbiAgICB9O1xuICAgIGxldCBjcmVhdGVDb250ZXh0UGFuZWwgPSBmdW5jdGlvbihwYWdlWCwgcGFnZVkpe1xuICAgICAgICBpZihjb250ZXh0UGFuZWwpe1xuICAgICAgICAgICAgY29udGV4dFBhbmVsLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIGNvbnRleHRQYW5lbCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dFBhbmVsID0gQ29udGV4dFBhbmVsKCRwbGF5ZXJSb290LCBhcGksIHtwYWdlWCA6IHBhZ2VYLCBwYWdlWSA6IHBhZ2VZfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uUmVuZGVyZWQgPSBmdW5jdGlvbigkY3VycmVudCwgdGVtcGxhdGUpe1xuICAgICAgICAkcGxheWVyUm9vdCA9ICRjdXJyZW50O1xuICAgIH07XG4gICAgY29uc3Qgb25EZXN0cm95ZWQgPSBmdW5jdGlvbigpe1xuICAgICAgICAvL0RvIG5vdGhpbmcuXG4gICAgfTtcbiAgICBjb25zdCBldmVudHMgPSB7XG4gICAgICAgIFwiY2xpY2sgLm92ZW5wbGF5ZXJcIiA6IGZ1bmN0aW9uKGV2ZW50LCAkY3VycmVudCwgdGVtcGxhdGUpe1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgaWYoY29udGV4dFBhbmVsKXtcbiAgICAgICAgICAgICAgICBjb250ZXh0UGFuZWwuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIGNvbnRleHRQYW5lbCA9IG51bGw7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoIUxBJChldmVudC50YXJnZXQpLmNsb3Nlc3QoXCIub3ZwLWNvbnRyb2xzXCIpICYmXG4gICAgICAgICAgICAgICAgIUxBJChldmVudC50YXJnZXQpLmNsb3Nlc3QoXCIub3ZwLXNldHRpbmctcGFuZWxcIikpe1xuICAgICAgICAgICAgICAgIHRvZ2dsZVBsYXlQYXVzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoIUxBJChldmVudC50YXJnZXQpLmNsb3Nlc3QoXCIub3ZwLXNldHRpbmctcGFuZWxcIikgJiYgIUxBJChldmVudC50YXJnZXQpLmNsb3Nlc3QoXCIub3ZwLXNldHRpbmctYnV0dG9uXCIpICYmIFNldHRpbmdQYW5lbExpc3QubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgLy9jbGVhciBhbGwgU2V0dGluZ1BhbmVsVGVtcGxhdGVcbiAgICAgICAgICAgICAgICBfLmVhY2goU2V0dGluZ1BhbmVsTGlzdCwgZnVuY3Rpb24oc2V0dGluZ1BhbmVsKXtcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ1BhbmVsLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBTZXR0aW5nUGFuZWxMaXN0LnNwbGljZSgwLCBTZXR0aW5nUGFuZWxMaXN0Lmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwibW91c2VlbnRlciAub3ZlbnBsYXllclwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBpZiAoYXBpLmdldFN0YXRlKCkgPT09IFNUQVRFX1BMQVlJTkcpIHtcbiAgICAgICAgICAgICAgICBzZXRIaWRlKGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2V0SGlkZShmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwibW91c2Vtb3ZlIC5vdmVucGxheWVyXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGlmIChhcGkuZ2V0U3RhdGUoKSA9PT0gU1RBVEVfUExBWUlORykge1xuICAgICAgICAgICAgICAgIHNldEhpZGUoZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZXRIaWRlKGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJtb3VzZWxlYXZlIC5vdmVucGxheWVyXCIgOiBmdW5jdGlvbihldmVudCwgJGN1cnJlbnQsIHRlbXBsYXRlKXtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGlmKGFwaS5nZXRTdGF0ZSgpID09PSBTVEFURV9QTEFZSU5HKXtcbiAgICAgICAgICAgICAgICBzZXRIaWRlKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIFwia2V5ZG93biAub3ZlbnBsYXllclwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XG4gICAgICAgICAgICBzd2l0Y2goZXZlbnQua2V5Q29kZSl7XG4gICAgICAgICAgICAgICAgY2FzZSAzMiA6ICAgLy9zYXBjZVxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0b2dnbGVQbGF5UGF1c2UoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAzNyA6IC8vYXJyb3cgbGVmdFxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBzZWVrKDUsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDM5IDogLy9hcnJvdyByaWdodFxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBzZWVrKDUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAzOCA6IC8vYXJyb3cgdXBcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdm9sdW1lKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQwIDogLy9hcnJvdyB1cFxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB2b2x1bWUoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJjb250ZXh0bWVudSAub3ZlbnBsYXllclwiIDogZnVuY3Rpb24oZXZlbnQsICRjdXJyZW50LCB0ZW1wbGF0ZSl7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY3JlYXRlQ29udGV4dFBhbmVsKGV2ZW50LnBhZ2VYLCBldmVudC5wYWdlWSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPdmVuVGVtcGxhdGUoJGNvbnRhaW5lciwgXCJWaWV3XCIsICRjb250YWluZXIuaWQsIGV2ZW50cywgb25SZW5kZXJlZCwgb25EZXN0cm95ZWQsIHRydWUpLCB7XG4gICAgICAgIGdldE1lZGlhRWxlbWVudENvbnRhaW5lcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICRwbGF5ZXJSb290LmZpbmQoXCIub3ZwLW1lZGlhLWVsZW1lbnQtY29udGFpbmVyXCIpLmdldCgpO1xuICAgICAgICB9LFxuICAgICAgICBzZXRBcGk6IGZ1bmN0aW9uIChwbGF5ZXJJbnN0YW5jZSkge1xuICAgICAgICAgICAgYXBpID0gcGxheWVySW5zdGFuY2U7XG4gICAgICAgICAgICBoZWxwZXIgPSBIZWxwZXIoJHBsYXllclJvb3QsIHBsYXllckluc3RhbmNlKTtcbiAgICAgICAgICAgIGNvbnRyb2xzID0gQ29udHJvbHMoJHBsYXllclJvb3QsIHBsYXllckluc3RhbmNlKTtcblxuXG4gICAgICAgICAgICBhcGkub24oUExBWUVSX1NUQVRFLCBmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgICAgICAgICBpZihkYXRhICYmIGRhdGEubmV3c3RhdGUpe1xuICAgICAgICAgICAgICAgICAgICBpZihkYXRhLm5ld3N0YXRlID09PSBTVEFURV9QTEFZSU5HKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEhpZGUoZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEhpZGUoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cblxuXG5leHBvcnQgZGVmYXVsdCBWaWV3O1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMjAuLlxuICovXG5cbmNvbnN0IFZpZXdUZW1wbGF0ZSA9IGZ1bmN0aW9uKGlkKXtcbiAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJvdmVucGxheWVyIG92cC13cmFwcGVyXCIgdGFiaW5kZXg9XCItMVwiIGFyaWEtbGFiZWw9XCJcIiBpZD1cIicraWQrJ1wiPicgK1xuICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLXJhdGlvXCI+PC9kaXY+JyArXG4gICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtcGxheWVyXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwib3ZwLW1lZGlhLWVsZW1lbnQtY29udGFpbmVyXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJvdnAtdWlcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICc8L2Rpdj4nXG59O1xuZXhwb3J0IGRlZmF1bHQgVmlld1RlbXBsYXRlOyJdLCJzb3VyY2VSb290IjoiIn0=