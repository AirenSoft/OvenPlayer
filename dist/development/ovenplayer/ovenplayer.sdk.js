/*! OvenPlayerv0.6.2 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

                //Auto next source when player load was fail by amiss source.
                if (name === _constants.ERROR && (data.code === _constants.PLAYER_FILE_ERROR || parseInt(data.code / 100) === 5) || name === _constants.NETWORK_UNSTABLE) {
                    var _lastPlayPosition = that.getCurrentQuality();
                    that.setCurrentQuality(_lastPlayPosition + 1);
                }
                that.trigger(name, data);
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
            playbackRates: [0.5, 1, 1.25, 1.5, 2],
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
var NETWORK_UNSTABLE = exports.NETWORK_UNSTABLE = 'unstable';
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
    var sc = (0, _SupportChecker2.default)();

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
                    playlistItem.sources[i].label = i.toString();
                }

                prettySource = makePrettySource(playlistItem.sources[i]);
                if (sc.findProviderNameBySource(prettySource)) {
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
    var sc = (0, _SupportChecker2.default)();
    var Providers = {};

    var that = {};
    OvenPlayerConsole.log("ProviderController loaded.");

    var registerProvider = function registerProvider(name, provider) {
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
                registerProvider("html5", provider);
                return provider;
            }).bind(null, __webpack_require__)).catch(function (err) {
                throw new Error('Network error');
            });
        },
        webrtc: function webrtc() {
            return Promise.all(/*! require.ensure | ovenplayer.provider.HlsProvider */[__webpack_require__.e("ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.html5"), __webpack_require__.e("ovenplayer.provider.HlsProvider")]).then((function (require) {
                var provider = __webpack_require__(/*! api/provider/webrtc/WebRTC */ "./src/js/api/provider/webrtc/WebRTC.js").default;
                registerProvider("webrtc", provider);
                return provider;
            }).bind(null, __webpack_require__)).catch(function (err) {
                throw new Error('Network error');
            });
        },
        dash: function dash() {
            return Promise.all(/*! require.ensure | ovenplayer.provider.DashProvider */[__webpack_require__.e("ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.html5"), __webpack_require__.e("ovenplayer.provider.DashProvider")]).then((function (require) {
                var provider = __webpack_require__(/*! api/provider/dash/Dash */ "./src/js/api/provider/dash/Dash.js").default;
                Providers["dash"] = provider;
                registerProvider("dash", provider);
                return provider;
            }).bind(null, __webpack_require__)).catch(function (err) {
                throw new Error('Network error');
            });
        },
        hls: function hls() {
            return Promise.all(/*! require.ensure | ovenplayer.provider.HlsProvider */[__webpack_require__.e("ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.html5"), __webpack_require__.e("ovenplayer.provider.HlsProvider")]).then((function (require) {
                var provider = __webpack_require__(/*! api/provider/hls/Hls */ "./src/js/api/provider/hls/Hls.js").default;
                registerProvider("hls", provider);
                return provider;
            }).bind(null, __webpack_require__)).catch(function (err) {
                throw new Error('Network error');
            });
        }
    };
    that.loadProviders = function (playlist) {
        var supportedProviderNames = sc.findProviderNamesByPlaylist(playlist);
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
        var supportedProviderName = sc.findProviderNameBySource(source);
        OvenPlayerConsole.log("ProviderController getProviderBySource() ", supportedProviderName);
        return that.findByName(supportedProviderName);
    };

    that.isSameProvider = function (currentSource, newSource) {
        OvenPlayerConsole.log("ProviderController isSameProvider() ", sc.findProviderNameBySource(currentSource), sc.findProviderNameBySource(newSource));
        return sc.findProviderNameBySource(currentSource) == sc.findProviderNameBySource(newSource);
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
/* WEBPACK VAR INJECTION */(function(global, module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//     Underscore.js 1.9.0
//     http://underscorejs.org
//     (c) 2009-2018 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.


// Baseline setup
// --------------

// Establish the root object, `window` (`self`) in the browser, `global`
// on the server, or `this` in some virtual machines. We use `self`
// instead of `window` for `WebWorker` support.
var root = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self.self === self && self || (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global.global === global && global || undefined || {};

// Save the previous value of the `_` variable.
var previousUnderscore = root._;

// Save bytes in the minified (but not gzipped) version:
var ArrayProto = Array.prototype,
    ObjProto = Object.prototype;
var SymbolProto = typeof Symbol !== 'undefined' ? Symbol.prototype : null;

// Create quick reference variables for speed access to core prototypes.
var push = ArrayProto.push,
    slice = ArrayProto.slice,
    toString = ObjProto.toString,
    hasOwnProperty = ObjProto.hasOwnProperty;

// All **ECMAScript 5** native function implementations that we hope to use
// are declared here.
var nativeIsArray = Array.isArray,
    nativeKeys = Object.keys,
    nativeCreate = Object.create;

// Naked function reference for surrogate-prototype-swapping.
var Ctor = function Ctor() {};

// Create a safe reference to the Underscore object for use below.
var _ = function _(obj) {
  if (obj instanceof _) return obj;
  if (!(this instanceof _)) return new _(obj);
  this._wrapped = obj;
};

// Export the Underscore object for **Node.js**, with
// backwards-compatibility for their old module API. If we're in
// the browser, add `_` as a global object.
// (`nodeType` is checked to ensure that `module`
// and `exports` are not HTML elements.)
if (typeof exports != 'undefined' && !exports.nodeType) {
  if (typeof module != 'undefined' && !module.nodeType && module.exports) {
    exports = module.exports = _;
  }
  exports._ = _;
} else {
  root._ = _;
}

// Current version.
_.VERSION = '1.9.0';

// Internal function that returns an efficient (for current engines) version
// of the passed-in callback, to be repeatedly applied in other Underscore
// functions.
var optimizeCb = function optimizeCb(func, context, argCount) {
  if (context === void 0) return func;
  switch (argCount == null ? 3 : argCount) {
    case 1:
      return function (value) {
        return func.call(context, value);
      };
    // The 2-argument case is omitted because we’re not using it.
    case 3:
      return function (value, index, collection) {
        return func.call(context, value, index, collection);
      };
    case 4:
      return function (accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
  }
  return function () {
    return func.apply(context, arguments);
  };
};

var builtinIteratee;

// An internal function to generate callbacks that can be applied to each
// element in a collection, returning the desired result — either `identity`,
// an arbitrary callback, a property matcher, or a property accessor.
var cb = function cb(value, context, argCount) {
  if (_.iteratee !== builtinIteratee) return _.iteratee(value, context);
  if (value == null) return _.identity;
  if (_.isFunction(value)) return optimizeCb(value, context, argCount);
  if (_.isObject(value) && !_.isArray(value)) return _.matcher(value);
  return _.property(value);
};

// External wrapper for our callback generator. Users may customize
// `_.iteratee` if they want additional predicate/iteratee shorthand styles.
// This abstraction hides the internal-only argCount argument.
_.iteratee = builtinIteratee = function builtinIteratee(value, context) {
  return cb(value, context, Infinity);
};

// Some functions take a variable number of arguments, or a few expected
// arguments at the beginning and then a variable number of values to operate
// on. This helper accumulates all remaining arguments past the function’s
// argument length (or an explicit `startIndex`), into an array that becomes
// the last argument. Similar to ES6’s "rest parameter".
var restArguments = function restArguments(func, startIndex) {
  startIndex = startIndex == null ? func.length - 1 : +startIndex;
  return function () {
    var length = Math.max(arguments.length - startIndex, 0),
        rest = Array(length),
        index = 0;
    for (; index < length; index++) {
      rest[index] = arguments[index + startIndex];
    }
    switch (startIndex) {
      case 0:
        return func.call(this, rest);
      case 1:
        return func.call(this, arguments[0], rest);
      case 2:
        return func.call(this, arguments[0], arguments[1], rest);
    }
    var args = Array(startIndex + 1);
    for (index = 0; index < startIndex; index++) {
      args[index] = arguments[index];
    }
    args[startIndex] = rest;
    return func.apply(this, args);
  };
};

// An internal function for creating a new object that inherits from another.
var baseCreate = function baseCreate(prototype) {
  if (!_.isObject(prototype)) return {};
  if (nativeCreate) return nativeCreate(prototype);
  Ctor.prototype = prototype;
  var result = new Ctor();
  Ctor.prototype = null;
  return result;
};

var shallowProperty = function shallowProperty(key) {
  return function (obj) {
    return obj == null ? void 0 : obj[key];
  };
};

var deepGet = function deepGet(obj, path) {
  var length = path.length;
  for (var i = 0; i < length; i++) {
    if (obj == null) return void 0;
    obj = obj[path[i]];
  }
  return length ? obj : void 0;
};

// Helper for collection methods to determine whether a collection
// should be iterated as an array or as an object.
// Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
// Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
var getLength = shallowProperty('length');
var isArrayLike = function isArrayLike(collection) {
  var length = getLength(collection);
  return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
};

// Collection Functions
// --------------------

// The cornerstone, an `each` implementation, aka `forEach`.
// Handles raw objects in addition to array-likes. Treats all
// sparse array-likes as if they were dense.
_.each = _.forEach = function (obj, iteratee, context) {
  iteratee = optimizeCb(iteratee, context);
  var i, length;
  if (isArrayLike(obj)) {
    for (i = 0, length = obj.length; i < length; i++) {
      iteratee(obj[i], i, obj);
    }
  } else {
    var keys = _.keys(obj);
    for (i = 0, length = keys.length; i < length; i++) {
      iteratee(obj[keys[i]], keys[i], obj);
    }
  }
  return obj;
};

// Return the results of applying the iteratee to each element.
_.map = _.collect = function (obj, iteratee, context) {
  iteratee = cb(iteratee, context);
  var keys = !isArrayLike(obj) && _.keys(obj),
      length = (keys || obj).length,
      results = Array(length);
  for (var index = 0; index < length; index++) {
    var currentKey = keys ? keys[index] : index;
    results[index] = iteratee(obj[currentKey], currentKey, obj);
  }
  return results;
};

// Create a reducing function iterating left or right.
var createReduce = function createReduce(dir) {
  // Wrap code that reassigns argument variables in a separate function than
  // the one that accesses `arguments.length` to avoid a perf hit. (#1991)
  var reducer = function reducer(obj, iteratee, memo, initial) {
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        index = dir > 0 ? 0 : length - 1;
    if (!initial) {
      memo = obj[keys ? keys[index] : index];
      index += dir;
    }
    for (; index >= 0 && index < length; index += dir) {
      var currentKey = keys ? keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  };

  return function (obj, iteratee, memo, context) {
    var initial = arguments.length >= 3;
    return reducer(obj, optimizeCb(iteratee, context, 4), memo, initial);
  };
};

// **Reduce** builds up a single result from a list of values, aka `inject`,
// or `foldl`.
_.reduce = _.foldl = _.inject = createReduce(1);

// The right-associative version of reduce, also known as `foldr`.
_.reduceRight = _.foldr = createReduce(-1);

// Return the first value which passes a truth test. Aliased as `detect`.
_.find = _.detect = function (obj, predicate, context) {
  var keyFinder = isArrayLike(obj) ? _.findIndex : _.findKey;
  var key = keyFinder(obj, predicate, context);
  if (key !== void 0 && key !== -1) return obj[key];
};

// Return all the elements that pass a truth test.
// Aliased as `select`.
_.filter = _.select = function (obj, predicate, context) {
  var results = [];
  predicate = cb(predicate, context);
  _.each(obj, function (value, index, list) {
    if (predicate(value, index, list)) results.push(value);
  });
  return results;
};

// Return all the elements for which a truth test fails.
_.reject = function (obj, predicate, context) {
  return _.filter(obj, _.negate(cb(predicate)), context);
};

// Determine whether all of the elements match a truth test.
// Aliased as `all`.
_.every = _.all = function (obj, predicate, context) {
  predicate = cb(predicate, context);
  var keys = !isArrayLike(obj) && _.keys(obj),
      length = (keys || obj).length;
  for (var index = 0; index < length; index++) {
    var currentKey = keys ? keys[index] : index;
    if (!predicate(obj[currentKey], currentKey, obj)) return false;
  }
  return true;
};

// Determine if at least one element in the object matches a truth test.
// Aliased as `any`.
_.some = _.any = function (obj, predicate, context) {
  predicate = cb(predicate, context);
  var keys = !isArrayLike(obj) && _.keys(obj),
      length = (keys || obj).length;
  for (var index = 0; index < length; index++) {
    var currentKey = keys ? keys[index] : index;
    if (predicate(obj[currentKey], currentKey, obj)) return true;
  }
  return false;
};

// Determine if the array or object contains a given item (using `===`).
// Aliased as `includes` and `include`.
_.contains = _.includes = _.include = function (obj, item, fromIndex, guard) {
  if (!isArrayLike(obj)) obj = _.values(obj);
  if (typeof fromIndex != 'number' || guard) fromIndex = 0;
  return _.indexOf(obj, item, fromIndex) >= 0;
};

// Invoke a method (with arguments) on every item in a collection.
_.invoke = restArguments(function (obj, path, args) {
  var contextPath, func;
  if (_.isFunction(path)) {
    func = path;
  } else if (_.isArray(path)) {
    contextPath = path.slice(0, -1);
    path = path[path.length - 1];
  }
  return _.map(obj, function (context) {
    var method = func;
    if (!method) {
      if (contextPath && contextPath.length) {
        context = deepGet(context, contextPath);
      }
      if (context == null) return void 0;
      method = context[path];
    }
    return method == null ? method : method.apply(context, args);
  });
});

// Convenience version of a common use case of `map`: fetching a property.
_.pluck = function (obj, key) {
  return _.map(obj, _.property(key));
};

// Convenience version of a common use case of `filter`: selecting only objects
// containing specific `key:value` pairs.
_.where = function (obj, attrs) {
  return _.filter(obj, _.matcher(attrs));
};

// Convenience version of a common use case of `find`: getting the first object
// containing specific `key:value` pairs.
_.findWhere = function (obj, attrs) {
  return _.find(obj, _.matcher(attrs));
};

// Return the maximum element (or element-based computation).
_.max = function (obj, iteratee, context) {
  var result = -Infinity,
      lastComputed = -Infinity,
      value,
      computed;
  if (iteratee == null || typeof iteratee == 'number' && _typeof(obj[0]) != 'object' && obj != null) {
    obj = isArrayLike(obj) ? obj : _.values(obj);
    for (var i = 0, length = obj.length; i < length; i++) {
      value = obj[i];
      if (value != null && value > result) {
        result = value;
      }
    }
  } else {
    iteratee = cb(iteratee, context);
    _.each(obj, function (v, index, list) {
      computed = iteratee(v, index, list);
      if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
        result = v;
        lastComputed = computed;
      }
    });
  }
  return result;
};

// Return the minimum element (or element-based computation).
_.min = function (obj, iteratee, context) {
  var result = Infinity,
      lastComputed = Infinity,
      value,
      computed;
  if (iteratee == null || typeof iteratee == 'number' && _typeof(obj[0]) != 'object' && obj != null) {
    obj = isArrayLike(obj) ? obj : _.values(obj);
    for (var i = 0, length = obj.length; i < length; i++) {
      value = obj[i];
      if (value != null && value < result) {
        result = value;
      }
    }
  } else {
    iteratee = cb(iteratee, context);
    _.each(obj, function (v, index, list) {
      computed = iteratee(v, index, list);
      if (computed < lastComputed || computed === Infinity && result === Infinity) {
        result = v;
        lastComputed = computed;
      }
    });
  }
  return result;
};

// Shuffle a collection.
_.shuffle = function (obj) {
  return _.sample(obj, Infinity);
};

// Sample **n** random values from a collection using the modern version of the
// [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
// If **n** is not specified, returns a single random element.
// The internal `guard` argument allows it to work with `map`.
_.sample = function (obj, n, guard) {
  if (n == null || guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    return obj[_.random(obj.length - 1)];
  }
  var sample = isArrayLike(obj) ? _.clone(obj) : _.values(obj);
  var length = getLength(sample);
  n = Math.max(Math.min(n, length), 0);
  var last = length - 1;
  for (var index = 0; index < n; index++) {
    var rand = _.random(index, last);
    var temp = sample[index];
    sample[index] = sample[rand];
    sample[rand] = temp;
  }
  return sample.slice(0, n);
};

// Sort the object's values by a criterion produced by an iteratee.
_.sortBy = function (obj, iteratee, context) {
  var index = 0;
  iteratee = cb(iteratee, context);
  return _.pluck(_.map(obj, function (value, key, list) {
    return {
      value: value,
      index: index++,
      criteria: iteratee(value, key, list)
    };
  }).sort(function (left, right) {
    var a = left.criteria;
    var b = right.criteria;
    if (a !== b) {
      if (a > b || a === void 0) return 1;
      if (a < b || b === void 0) return -1;
    }
    return left.index - right.index;
  }), 'value');
};

// An internal function used for aggregate "group by" operations.
var group = function group(behavior, partition) {
  return function (obj, iteratee, context) {
    var result = partition ? [[], []] : {};
    iteratee = cb(iteratee, context);
    _.each(obj, function (value, index) {
      var key = iteratee(value, index, obj);
      behavior(result, value, key);
    });
    return result;
  };
};

// Groups the object's values by a criterion. Pass either a string attribute
// to group by, or a function that returns the criterion.
_.groupBy = group(function (result, value, key) {
  if (_.has(result, key)) result[key].push(value);else result[key] = [value];
});

// Indexes the object's values by a criterion, similar to `groupBy`, but for
// when you know that your index values will be unique.
_.indexBy = group(function (result, value, key) {
  result[key] = value;
});

// Counts instances of an object that group by a certain criterion. Pass
// either a string attribute to count by, or a function that returns the
// criterion.
_.countBy = group(function (result, value, key) {
  if (_.has(result, key)) result[key]++;else result[key] = 1;
});

var reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
// Safely create a real, live array from anything iterable.
_.toArray = function (obj) {
  if (!obj) return [];
  if (_.isArray(obj)) return slice.call(obj);
  if (_.isString(obj)) {
    // Keep surrogate pair characters together
    return obj.match(reStrSymbol);
  }
  if (isArrayLike(obj)) return _.map(obj, _.identity);
  return _.values(obj);
};

// Return the number of elements in an object.
_.size = function (obj) {
  if (obj == null) return 0;
  return isArrayLike(obj) ? obj.length : _.keys(obj).length;
};

// Split a collection into two arrays: one whose elements all satisfy the given
// predicate, and one whose elements all do not satisfy the predicate.
_.partition = group(function (result, value, pass) {
  result[pass ? 0 : 1].push(value);
}, true);

// Array Functions
// ---------------

// Get the first element of an array. Passing **n** will return the first N
// values in the array. Aliased as `head` and `take`. The **guard** check
// allows it to work with `_.map`.
_.first = _.head = _.take = function (array, n, guard) {
  if (array == null || array.length < 1) return void 0;
  if (n == null || guard) return array[0];
  return _.initial(array, array.length - n);
};

// Returns everything but the last entry of the array. Especially useful on
// the arguments object. Passing **n** will return all the values in
// the array, excluding the last N.
_.initial = function (array, n, guard) {
  return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
};

// Get the last element of an array. Passing **n** will return the last N
// values in the array.
_.last = function (array, n, guard) {
  if (array == null || array.length < 1) return void 0;
  if (n == null || guard) return array[array.length - 1];
  return _.rest(array, Math.max(0, array.length - n));
};

// Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
// Especially useful on the arguments object. Passing an **n** will return
// the rest N values in the array.
_.rest = _.tail = _.drop = function (array, n, guard) {
  return slice.call(array, n == null || guard ? 1 : n);
};

// Trim out all falsy values from an array.
_.compact = function (array) {
  return _.filter(array, Boolean);
};

// Internal implementation of a recursive `flatten` function.
var flatten = function flatten(input, shallow, strict, output) {
  output = output || [];
  var idx = output.length;
  for (var i = 0, length = getLength(input); i < length; i++) {
    var value = input[i];
    if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
      // Flatten current level of array or arguments object.
      if (shallow) {
        var j = 0,
            len = value.length;
        while (j < len) {
          output[idx++] = value[j++];
        }
      } else {
        flatten(value, shallow, strict, output);
        idx = output.length;
      }
    } else if (!strict) {
      output[idx++] = value;
    }
  }
  return output;
};

// Flatten out an array, either recursively (by default), or just one level.
_.flatten = function (array, shallow) {
  return flatten(array, shallow, false);
};

// Return a version of the array that does not contain the specified value(s).
_.without = restArguments(function (array, otherArrays) {
  return _.difference(array, otherArrays);
});

// Produce a duplicate-free version of the array. If the array has already
// been sorted, you have the option of using a faster algorithm.
// The faster algorithm will not work with an iteratee if the iteratee
// is not a one-to-one function, so providing an iteratee will disable
// the faster algorithm.
// Aliased as `unique`.
_.uniq = _.unique = function (array, isSorted, iteratee, context) {
  if (!_.isBoolean(isSorted)) {
    context = iteratee;
    iteratee = isSorted;
    isSorted = false;
  }
  if (iteratee != null) iteratee = cb(iteratee, context);
  var result = [];
  var seen = [];
  for (var i = 0, length = getLength(array); i < length; i++) {
    var value = array[i],
        computed = iteratee ? iteratee(value, i, array) : value;
    if (isSorted && !iteratee) {
      if (!i || seen !== computed) result.push(value);
      seen = computed;
    } else if (iteratee) {
      if (!_.contains(seen, computed)) {
        seen.push(computed);
        result.push(value);
      }
    } else if (!_.contains(result, value)) {
      result.push(value);
    }
  }
  return result;
};

// Produce an array that contains the union: each distinct element from all of
// the passed-in arrays.
_.union = restArguments(function (arrays) {
  return _.uniq(flatten(arrays, true, true));
});

// Produce an array that contains every item shared between all the
// passed-in arrays.
_.intersection = function (array) {
  var result = [];
  var argsLength = arguments.length;
  for (var i = 0, length = getLength(array); i < length; i++) {
    var item = array[i];
    if (_.contains(result, item)) continue;
    var j;
    for (j = 1; j < argsLength; j++) {
      if (!_.contains(arguments[j], item)) break;
    }
    if (j === argsLength) result.push(item);
  }
  return result;
};

// Take the difference between one array and a number of other arrays.
// Only the elements present in just the first array will remain.
_.difference = restArguments(function (array, rest) {
  rest = flatten(rest, true, true);
  return _.filter(array, function (value) {
    return !_.contains(rest, value);
  });
});

// Complement of _.zip. Unzip accepts an array of arrays and groups
// each array's elements on shared indices.
_.unzip = function (array) {
  var length = array && _.max(array, getLength).length || 0;
  var result = Array(length);

  for (var index = 0; index < length; index++) {
    result[index] = _.pluck(array, index);
  }
  return result;
};

// Zip together multiple lists into a single array -- elements that share
// an index go together.
_.zip = restArguments(_.unzip);

// Converts lists into objects. Pass either a single array of `[key, value]`
// pairs, or two parallel arrays of the same length -- one of keys, and one of
// the corresponding values. Passing by pairs is the reverse of _.pairs.
_.object = function (list, values) {
  var result = {};
  for (var i = 0, length = getLength(list); i < length; i++) {
    if (values) {
      result[list[i]] = values[i];
    } else {
      result[list[i][0]] = list[i][1];
    }
  }
  return result;
};

// Generator function to create the findIndex and findLastIndex functions.
var createPredicateIndexFinder = function createPredicateIndexFinder(dir) {
  return function (array, predicate, context) {
    predicate = cb(predicate, context);
    var length = getLength(array);
    var index = dir > 0 ? 0 : length - 1;
    for (; index >= 0 && index < length; index += dir) {
      if (predicate(array[index], index, array)) return index;
    }
    return -1;
  };
};

// Returns the first index on an array-like that passes a predicate test.
_.findIndex = createPredicateIndexFinder(1);
_.findLastIndex = createPredicateIndexFinder(-1);

// Use a comparator function to figure out the smallest index at which
// an object should be inserted so as to maintain order. Uses binary search.
_.sortedIndex = function (array, obj, iteratee, context) {
  iteratee = cb(iteratee, context, 1);
  var value = iteratee(obj);
  var low = 0,
      high = getLength(array);
  while (low < high) {
    var mid = Math.floor((low + high) / 2);
    if (iteratee(array[mid]) < value) low = mid + 1;else high = mid;
  }
  return low;
};

// Generator function to create the indexOf and lastIndexOf functions.
var createIndexFinder = function createIndexFinder(dir, predicateFind, sortedIndex) {
  return function (array, item, idx) {
    var i = 0,
        length = getLength(array);
    if (typeof idx == 'number') {
      if (dir > 0) {
        i = idx >= 0 ? idx : Math.max(idx + length, i);
      } else {
        length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
      }
    } else if (sortedIndex && idx && length) {
      idx = sortedIndex(array, item);
      return array[idx] === item ? idx : -1;
    }
    if (item !== item) {
      idx = predicateFind(slice.call(array, i, length), _.isNaN);
      return idx >= 0 ? idx + i : -1;
    }
    for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
      if (array[idx] === item) return idx;
    }
    return -1;
  };
};

// Return the position of the first occurrence of an item in an array,
// or -1 if the item is not included in the array.
// If the array is large and already in sort order, pass `true`
// for **isSorted** to use binary search.
_.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
_.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

// Generate an integer Array containing an arithmetic progression. A port of
// the native Python `range()` function. See
// [the Python documentation](http://docs.python.org/library/functions.html#range).
_.range = function (start, stop, step) {
  if (stop == null) {
    stop = start || 0;
    start = 0;
  }
  if (!step) {
    step = stop < start ? -1 : 1;
  }

  var length = Math.max(Math.ceil((stop - start) / step), 0);
  var range = Array(length);

  for (var idx = 0; idx < length; idx++, start += step) {
    range[idx] = start;
  }

  return range;
};

// Chunk a single array into multiple arrays, each containing `count` or fewer
// items.
_.chunk = function (array, count) {
  if (count == null || count < 1) return [];
  var result = [];
  var i = 0,
      length = array.length;
  while (i < length) {
    result.push(slice.call(array, i, i += count));
  }
  return result;
};

// Function (ahem) Functions
// ------------------

// Determines whether to execute a function as a constructor
// or a normal function with the provided arguments.
var executeBound = function executeBound(sourceFunc, boundFunc, context, callingContext, args) {
  if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
  var self = baseCreate(sourceFunc.prototype);
  var result = sourceFunc.apply(self, args);
  if (_.isObject(result)) return result;
  return self;
};

// Create a function bound to a given object (assigning `this`, and arguments,
// optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
// available.
_.bind = restArguments(function (func, context, args) {
  if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
  var bound = restArguments(function (callArgs) {
    return executeBound(func, bound, context, this, args.concat(callArgs));
  });
  return bound;
});

// Partially apply a function by creating a version that has had some of its
// arguments pre-filled, without changing its dynamic `this` context. _ acts
// as a placeholder by default, allowing any combination of arguments to be
// pre-filled. Set `_.partial.placeholder` for a custom placeholder argument.
_.partial = restArguments(function (func, boundArgs) {
  var placeholder = _.partial.placeholder;
  var bound = function bound() {
    var position = 0,
        length = boundArgs.length;
    var args = Array(length);
    for (var i = 0; i < length; i++) {
      args[i] = boundArgs[i] === placeholder ? arguments[position++] : boundArgs[i];
    }
    while (position < arguments.length) {
      args.push(arguments[position++]);
    }return executeBound(func, bound, this, this, args);
  };
  return bound;
});

_.partial.placeholder = _;

// Bind a number of an object's methods to that object. Remaining arguments
// are the method names to be bound. Useful for ensuring that all callbacks
// defined on an object belong to it.
_.bindAll = restArguments(function (obj, keys) {
  keys = flatten(keys, false, false);
  var index = keys.length;
  if (index < 1) throw new Error('bindAll must be passed function names');
  while (index--) {
    var key = keys[index];
    obj[key] = _.bind(obj[key], obj);
  }
});

// Memoize an expensive function by storing its results.
_.memoize = function (func, hasher) {
  var memoize = function memoize(key) {
    var cache = memoize.cache;
    var address = '' + (hasher ? hasher.apply(this, arguments) : key);
    if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
    return cache[address];
  };
  memoize.cache = {};
  return memoize;
};

// Delays a function for the given number of milliseconds, and then calls
// it with the arguments supplied.
_.delay = restArguments(function (func, wait, args) {
  return setTimeout(function () {
    return func.apply(null, args);
  }, wait);
});

// Defers a function, scheduling it to run after the current call stack has
// cleared.
_.defer = _.partial(_.delay, _, 1);

// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.
_.throttle = function (func, wait, options) {
  var timeout, context, args, result;
  var previous = 0;
  if (!options) options = {};

  var later = function later() {
    previous = options.leading === false ? 0 : _.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  var throttled = function throttled() {
    var now = _.now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };

  throttled.cancel = function () {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
};

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
_.debounce = function (func, wait, immediate) {
  var timeout, result;

  var later = function later(context, args) {
    timeout = null;
    if (args) result = func.apply(context, args);
  };

  var debounced = restArguments(function (args) {
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(this, args);
    } else {
      timeout = _.delay(later, wait, this, args);
    }

    return result;
  });

  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
};

// Returns the first function passed as an argument to the second,
// allowing you to adjust arguments, run code before and after, and
// conditionally execute the original function.
_.wrap = function (func, wrapper) {
  return _.partial(wrapper, func);
};

// Returns a negated version of the passed-in predicate.
_.negate = function (predicate) {
  return function () {
    return !predicate.apply(this, arguments);
  };
};

// Returns a function that is the composition of a list of functions, each
// consuming the return value of the function that follows.
_.compose = function () {
  var args = arguments;
  var start = args.length - 1;
  return function () {
    var i = start;
    var result = args[start].apply(this, arguments);
    while (i--) {
      result = args[i].call(this, result);
    }return result;
  };
};

// Returns a function that will only be executed on and after the Nth call.
_.after = function (times, func) {
  return function () {
    if (--times < 1) {
      return func.apply(this, arguments);
    }
  };
};

// Returns a function that will only be executed up to (but not including) the Nth call.
_.before = function (times, func) {
  var memo;
  return function () {
    if (--times > 0) {
      memo = func.apply(this, arguments);
    }
    if (times <= 1) func = null;
    return memo;
  };
};

// Returns a function that will be executed at most one time, no matter how
// often you call it. Useful for lazy initialization.
_.once = _.partial(_.before, 2);

_.restArguments = restArguments;

// Object Functions
// ----------------

// Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
var hasEnumBug = !{ toString: null }.propertyIsEnumerable('toString');
var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

var collectNonEnumProps = function collectNonEnumProps(obj, keys) {
  var nonEnumIdx = nonEnumerableProps.length;
  var constructor = obj.constructor;
  var proto = _.isFunction(constructor) && constructor.prototype || ObjProto;

  // Constructor is a special case.
  var prop = 'constructor';
  if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

  while (nonEnumIdx--) {
    prop = nonEnumerableProps[nonEnumIdx];
    if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
      keys.push(prop);
    }
  }
};

// Retrieve the names of an object's own properties.
// Delegates to **ECMAScript 5**'s native `Object.keys`.
_.keys = function (obj) {
  if (!_.isObject(obj)) return [];
  if (nativeKeys) return nativeKeys(obj);
  var keys = [];
  for (var key in obj) {
    if (_.has(obj, key)) keys.push(key);
  } // Ahem, IE < 9.
  if (hasEnumBug) collectNonEnumProps(obj, keys);
  return keys;
};

// Retrieve all the property names of an object.
_.allKeys = function (obj) {
  if (!_.isObject(obj)) return [];
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  } // Ahem, IE < 9.
  if (hasEnumBug) collectNonEnumProps(obj, keys);
  return keys;
};

// Retrieve the values of an object's properties.
_.values = function (obj) {
  var keys = _.keys(obj);
  var length = keys.length;
  var values = Array(length);
  for (var i = 0; i < length; i++) {
    values[i] = obj[keys[i]];
  }
  return values;
};

// Returns the results of applying the iteratee to each element of the object.
// In contrast to _.map it returns an object.
_.mapObject = function (obj, iteratee, context) {
  iteratee = cb(iteratee, context);
  var keys = _.keys(obj),
      length = keys.length,
      results = {};
  for (var index = 0; index < length; index++) {
    var currentKey = keys[index];
    results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
  }
  return results;
};

// Convert an object into a list of `[key, value]` pairs.
// The opposite of _.object.
_.pairs = function (obj) {
  var keys = _.keys(obj);
  var length = keys.length;
  var pairs = Array(length);
  for (var i = 0; i < length; i++) {
    pairs[i] = [keys[i], obj[keys[i]]];
  }
  return pairs;
};

// Invert the keys and values of an object. The values must be serializable.
_.invert = function (obj) {
  var result = {};
  var keys = _.keys(obj);
  for (var i = 0, length = keys.length; i < length; i++) {
    result[obj[keys[i]]] = keys[i];
  }
  return result;
};

// Return a sorted list of the function names available on the object.
// Aliased as `methods`.
_.functions = _.methods = function (obj) {
  var names = [];
  for (var key in obj) {
    if (_.isFunction(obj[key])) names.push(key);
  }
  return names.sort();
};

// An internal function for creating assigner functions.
var createAssigner = function createAssigner(keysFunc, defaults) {
  return function (obj) {
    var length = arguments.length;
    if (defaults) obj = Object(obj);
    if (length < 2 || obj == null) return obj;
    for (var index = 1; index < length; index++) {
      var source = arguments[index],
          keys = keysFunc(source),
          l = keys.length;
      for (var i = 0; i < l; i++) {
        var key = keys[i];
        if (!defaults || obj[key] === void 0) obj[key] = source[key];
      }
    }
    return obj;
  };
};

// Extend a given object with all the properties in passed-in object(s).
_.extend = createAssigner(_.allKeys);

// Assigns a given object with all the own properties in the passed-in object(s).
// (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
_.extendOwn = _.assign = createAssigner(_.keys);

// Returns the first key on an object that passes a predicate test.
_.findKey = function (obj, predicate, context) {
  predicate = cb(predicate, context);
  var keys = _.keys(obj),
      key;
  for (var i = 0, length = keys.length; i < length; i++) {
    key = keys[i];
    if (predicate(obj[key], key, obj)) return key;
  }
};

// Internal pick helper function to determine if `obj` has key `key`.
var keyInObj = function keyInObj(value, key, obj) {
  return key in obj;
};

// Return a copy of the object only containing the whitelisted properties.
_.pick = restArguments(function (obj, keys) {
  var result = {},
      iteratee = keys[0];
  if (obj == null) return result;
  if (_.isFunction(iteratee)) {
    if (keys.length > 1) iteratee = optimizeCb(iteratee, keys[1]);
    keys = _.allKeys(obj);
  } else {
    iteratee = keyInObj;
    keys = flatten(keys, false, false);
    obj = Object(obj);
  }
  for (var i = 0, length = keys.length; i < length; i++) {
    var key = keys[i];
    var value = obj[key];
    if (iteratee(value, key, obj)) result[key] = value;
  }
  return result;
});

// Return a copy of the object without the blacklisted properties.
_.omit = restArguments(function (obj, keys) {
  var iteratee = keys[0],
      context;
  if (_.isFunction(iteratee)) {
    iteratee = _.negate(iteratee);
    if (keys.length > 1) context = keys[1];
  } else {
    keys = _.map(flatten(keys, false, false), String);
    iteratee = function iteratee(value, key) {
      return !_.contains(keys, key);
    };
  }
  return _.pick(obj, iteratee, context);
});

// Fill in a given object with default properties.
_.defaults = createAssigner(_.allKeys, true);

// Creates an object that inherits from the given prototype object.
// If additional properties are provided then they will be added to the
// created object.
_.create = function (prototype, props) {
  var result = baseCreate(prototype);
  if (props) _.extendOwn(result, props);
  return result;
};

// Create a (shallow-cloned) duplicate of an object.
_.clone = function (obj) {
  if (!_.isObject(obj)) return obj;
  return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
};

// Invokes interceptor with the obj, and then returns obj.
// The primary purpose of this method is to "tap into" a method chain, in
// order to perform operations on intermediate results within the chain.
_.tap = function (obj, interceptor) {
  interceptor(obj);
  return obj;
};

// Returns whether an object has a given set of `key:value` pairs.
_.isMatch = function (object, attrs) {
  var keys = _.keys(attrs),
      length = keys.length;
  if (object == null) return !length;
  var obj = Object(object);
  for (var i = 0; i < length; i++) {
    var key = keys[i];
    if (attrs[key] !== obj[key] || !(key in obj)) return false;
  }
  return true;
};

// Internal recursive comparison function for `isEqual`.
var eq, deepEq;
eq = function eq(a, b, aStack, bStack) {
  // Identical objects are equal. `0 === -0`, but they aren't identical.
  // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
  if (a === b) return a !== 0 || 1 / a === 1 / b;
  // `null` or `undefined` only equal to itself (strict comparison).
  if (a == null || b == null) return false;
  // `NaN`s are equivalent, but non-reflexive.
  if (a !== a) return b !== b;
  // Exhaust primitive checks
  var type = typeof a === 'undefined' ? 'undefined' : _typeof(a);
  if (type !== 'function' && type !== 'object' && (typeof b === 'undefined' ? 'undefined' : _typeof(b)) != 'object') return false;
  return deepEq(a, b, aStack, bStack);
};

// Internal recursive comparison function for `isEqual`.
deepEq = function deepEq(a, b, aStack, bStack) {
  // Unwrap any wrapped objects.
  if (a instanceof _) a = a._wrapped;
  if (b instanceof _) b = b._wrapped;
  // Compare `[[Class]]` names.
  var className = toString.call(a);
  if (className !== toString.call(b)) return false;
  switch (className) {
    // Strings, numbers, regular expressions, dates, and booleans are compared by value.
    case '[object RegExp]':
    // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
    case '[object String]':
      // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
      // equivalent to `new String("5")`.
      return '' + a === '' + b;
    case '[object Number]':
      // `NaN`s are equivalent, but non-reflexive.
      // Object(NaN) is equivalent to NaN.
      if (+a !== +a) return +b !== +b;
      // An `egal` comparison is performed for other numeric values.
      return +a === 0 ? 1 / +a === 1 / b : +a === +b;
    case '[object Date]':
    case '[object Boolean]':
      // Coerce dates and booleans to numeric primitive values. Dates are compared by their
      // millisecond representations. Note that invalid dates with millisecond representations
      // of `NaN` are not equivalent.
      return +a === +b;
    case '[object Symbol]':
      return SymbolProto.valueOf.call(a) === SymbolProto.valueOf.call(b);
  }

  var areArrays = className === '[object Array]';
  if (!areArrays) {
    if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) != 'object' || (typeof b === 'undefined' ? 'undefined' : _typeof(b)) != 'object') return false;

    // Objects with different constructors are not equivalent, but `Object`s or `Array`s
    // from different frames are.
    var aCtor = a.constructor,
        bCtor = b.constructor;
    if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor && _.isFunction(bCtor) && bCtor instanceof bCtor) && 'constructor' in a && 'constructor' in b) {
      return false;
    }
  }
  // Assume equality for cyclic structures. The algorithm for detecting cyclic
  // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

  // Initializing stack of traversed objects.
  // It's done here since we only need them for objects and arrays comparison.
  aStack = aStack || [];
  bStack = bStack || [];
  var length = aStack.length;
  while (length--) {
    // Linear search. Performance is inversely proportional to the number of
    // unique nested structures.
    if (aStack[length] === a) return bStack[length] === b;
  }

  // Add the first object to the stack of traversed objects.
  aStack.push(a);
  bStack.push(b);

  // Recursively compare objects and arrays.
  if (areArrays) {
    // Compare array lengths to determine if a deep comparison is necessary.
    length = a.length;
    if (length !== b.length) return false;
    // Deep compare the contents, ignoring non-numeric properties.
    while (length--) {
      if (!eq(a[length], b[length], aStack, bStack)) return false;
    }
  } else {
    // Deep compare objects.
    var keys = _.keys(a),
        key;
    length = keys.length;
    // Ensure that both objects contain the same number of properties before comparing deep equality.
    if (_.keys(b).length !== length) return false;
    while (length--) {
      // Deep compare each member
      key = keys[length];
      if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
    }
  }
  // Remove the first object from the stack of traversed objects.
  aStack.pop();
  bStack.pop();
  return true;
};

// Perform a deep comparison to check if two objects are equal.
_.isEqual = function (a, b) {
  return eq(a, b);
};

// Is a given array, string, or object empty?
// An "empty" object has no enumerable own-properties.
_.isEmpty = function (obj) {
  if (obj == null) return true;
  if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
  return _.keys(obj).length === 0;
};

// Is a given value a DOM element?
_.isElement = function (obj) {
  return !!(obj && obj.nodeType === 1);
};

// Is a given value an array?
// Delegates to ECMA5's native Array.isArray
_.isArray = nativeIsArray || function (obj) {
  return toString.call(obj) === '[object Array]';
};

// Is a given variable an object?
_.isObject = function (obj) {
  var type = typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
  return type === 'function' || type === 'object' && !!obj;
};

// Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError, isMap, isWeakMap, isSet, isWeakSet.
_.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error', 'Symbol', 'Map', 'WeakMap', 'Set', 'WeakSet'], function (name) {
  _['is' + name] = function (obj) {
    return toString.call(obj) === '[object ' + name + ']';
  };
});

// Define a fallback version of the method in browsers (ahem, IE < 9), where
// there isn't any inspectable "Arguments" type.
if (!_.isArguments(arguments)) {
  _.isArguments = function (obj) {
    return _.has(obj, 'callee');
  };
}

// Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
// IE 11 (#1621), Safari 8 (#1929), and PhantomJS (#2236).
var nodelist = root.document && root.document.childNodes;
if (typeof /./ != 'function' && (typeof Int8Array === 'undefined' ? 'undefined' : _typeof(Int8Array)) != 'object' && typeof nodelist != 'function') {
  _.isFunction = function (obj) {
    return typeof obj == 'function' || false;
  };
}

// Is a given object a finite number?
_.isFinite = function (obj) {
  return !_.isSymbol(obj) && isFinite(obj) && !isNaN(parseFloat(obj));
};

// Is the given value `NaN`?
_.isNaN = function (obj) {
  return _.isNumber(obj) && isNaN(obj);
};

// Is a given value a boolean?
_.isBoolean = function (obj) {
  return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
};

// Is a given value equal to null?
_.isNull = function (obj) {
  return obj === null;
};

// Is a given variable undefined?
_.isUndefined = function (obj) {
  return obj === void 0;
};

// Shortcut function for checking if an object has a given property directly
// on itself (in other words, not on a prototype).
_.has = function (obj, path) {
  if (!_.isArray(path)) {
    return obj != null && hasOwnProperty.call(obj, path);
  }
  var length = path.length;
  for (var i = 0; i < length; i++) {
    var key = path[i];
    if (obj == null || !hasOwnProperty.call(obj, key)) {
      return false;
    }
    obj = obj[key];
  }
  return !!length;
};

// Utility Functions
// -----------------

// Run Underscore.js in *noConflict* mode, returning the `_` variable to its
// previous owner. Returns a reference to the Underscore object.
_.noConflict = function () {
  root._ = previousUnderscore;
  return this;
};

// Keep the identity function around for default iteratees.
_.identity = function (value) {
  return value;
};

// Predicate-generating functions. Often useful outside of Underscore.
_.constant = function (value) {
  return function () {
    return value;
  };
};

_.noop = function () {};

// Creates a function that, when passed an object, will traverse that object’s
// properties down the given `path`, specified as an array of keys or indexes.
_.property = function (path) {
  if (!_.isArray(path)) {
    return shallowProperty(path);
  }
  return function (obj) {
    return deepGet(obj, path);
  };
};

// Generates a function for a given object that returns a given property.
_.propertyOf = function (obj) {
  if (obj == null) {
    return function () {};
  }
  return function (path) {
    return !_.isArray(path) ? obj[path] : deepGet(obj, path);
  };
};

// Returns a predicate for checking whether an object has a given set of
// `key:value` pairs.
_.matcher = _.matches = function (attrs) {
  attrs = _.extendOwn({}, attrs);
  return function (obj) {
    return _.isMatch(obj, attrs);
  };
};

// Run a function **n** times.
_.times = function (n, iteratee, context) {
  var accum = Array(Math.max(0, n));
  iteratee = optimizeCb(iteratee, context, 1);
  for (var i = 0; i < n; i++) {
    accum[i] = iteratee(i);
  }return accum;
};

// Return a random integer between min and max (inclusive).
_.random = function (min, max) {
  if (max == null) {
    max = min;
    min = 0;
  }
  return min + Math.floor(Math.random() * (max - min + 1));
};

// A (possibly faster) way to get the current timestamp as an integer.
_.now = Date.now || function () {
  return new Date().getTime();
};

// List of HTML entities for escaping.
var escapeMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;'
};
var unescapeMap = _.invert(escapeMap);

// Functions for escaping and unescaping strings to/from HTML interpolation.
var createEscaper = function createEscaper(map) {
  var escaper = function escaper(match) {
    return map[match];
  };
  // Regexes for identifying a key that needs to be escaped.
  var source = '(?:' + _.keys(map).join('|') + ')';
  var testRegexp = RegExp(source);
  var replaceRegexp = RegExp(source, 'g');
  return function (string) {
    string = string == null ? '' : '' + string;
    return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
  };
};
_.escape = createEscaper(escapeMap);
_.unescape = createEscaper(unescapeMap);

// Traverses the children of `obj` along `path`. If a child is a function, it
// is invoked with its parent as context. Returns the value of the final
// child, or `fallback` if any child is undefined.
_.result = function (obj, path, fallback) {
  if (!_.isArray(path)) path = [path];
  var length = path.length;
  if (!length) {
    return _.isFunction(fallback) ? fallback.call(obj) : fallback;
  }
  for (var i = 0; i < length; i++) {
    var prop = obj == null ? void 0 : obj[path[i]];
    if (prop === void 0) {
      prop = fallback;
      i = length; // Ensure we don't continue iterating.
    }
    obj = _.isFunction(prop) ? prop.call(obj) : prop;
  }
  return obj;
};

// Generate a unique integer id (unique within the entire client session).
// Useful for temporary DOM ids.
var idCounter = 0;
_.uniqueId = function (prefix) {
  var id = ++idCounter + '';
  return prefix ? prefix + id : id;
};

// By default, Underscore uses ERB-style template delimiters, change the
// following template settings to use alternative delimiters.
_.templateSettings = {
  evaluate: /<%([\s\S]+?)%>/g,
  interpolate: /<%=([\s\S]+?)%>/g,
  escape: /<%-([\s\S]+?)%>/g
};

// When customizing `templateSettings`, if you don't want to define an
// interpolation, evaluation or escaping regex, we need one that is
// guaranteed not to match.
var noMatch = /(.)^/;

// Certain characters need to be escaped so that they can be put into a
// string literal.
var escapes = {
  "'": "'",
  '\\': '\\',
  '\r': 'r',
  '\n': 'n',
  '\u2028': 'u2028',
  '\u2029': 'u2029'
};

var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;

var escapeChar = function escapeChar(match) {
  return '\\' + escapes[match];
};

// JavaScript micro-templating, similar to John Resig's implementation.
// Underscore templating handles arbitrary delimiters, preserves whitespace,
// and correctly escapes quotes within interpolated code.
// NB: `oldSettings` only exists for backwards compatibility.
_.template = function (text, settings, oldSettings) {
  if (!settings && oldSettings) settings = oldSettings;
  settings = _.defaults({}, settings, _.templateSettings);

  // Combine delimiters into one regular expression via alternation.
  var matcher = RegExp([(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source].join('|') + '|$', 'g');

  // Compile the template source, escaping string literals appropriately.
  var index = 0;
  var source = "__p+='";
  text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
    source += text.slice(index, offset).replace(escapeRegExp, escapeChar);
    index = offset + match.length;

    if (escape) {
      source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
    } else if (interpolate) {
      source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
    } else if (evaluate) {
      source += "';\n" + evaluate + "\n__p+='";
    }

    // Adobe VMs need the match returned to produce the correct offset.
    return match;
  });
  source += "';\n";

  // If a variable is not specified, place data values in local scope.
  if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

  source = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + source + 'return __p;\n';

  var render;
  try {
    render = new Function(settings.variable || 'obj', '_', source);
  } catch (e) {
    e.source = source;
    throw e;
  }

  var template = function template(data) {
    return render.call(this, data, _);
  };

  // Provide the compiled source as a convenience for precompilation.
  var argument = settings.variable || 'obj';
  template.source = 'function(' + argument + '){\n' + source + '}';

  return template;
};

// Add a "chain" function. Start chaining a wrapped Underscore object.
_.chain = function (obj) {
  var instance = _(obj);
  instance._chain = true;
  return instance;
};

// OOP
// ---------------
// If Underscore is called as a function, it returns a wrapped object that
// can be used OO-style. This wrapper holds altered versions of all the
// underscore functions. Wrapped objects may be chained.

// Helper function to continue chaining intermediate results.
var chainResult = function chainResult(instance, obj) {
  return instance._chain ? _(obj).chain() : obj;
};

// Add your own custom functions to the Underscore object.
_.mixin = function (obj) {
  _.each(_.functions(obj), function (name) {
    var func = _[name] = obj[name];
    _.prototype[name] = function () {
      var args = [this._wrapped];
      push.apply(args, arguments);
      return chainResult(this, func.apply(_, args));
    };
  });
  return _;
};

// Add all of the Underscore functions to the wrapper object.
_.mixin(_);

// Add all mutator Array functions to the wrapper.
_.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function (name) {
  var method = ArrayProto[name];
  _.prototype[name] = function () {
    var obj = this._wrapped;
    method.apply(obj, arguments);
    if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
    return chainResult(this, obj);
  };
});

// Add all accessor Array functions to the wrapper.
_.each(['concat', 'join', 'slice'], function (name) {
  var method = ArrayProto[name];
  _.prototype[name] = function () {
    return chainResult(this, method.apply(this._wrapped, arguments));
  };
});

// Extracts the result from a wrapped and chained object.
_.prototype.value = function () {
  return this._wrapped;
};

// Provide unwrapping proxy for some methods used in engine operations
// such as arithmetic and JSON stringification.
_.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

_.prototype.toString = function () {
  return String(this._wrapped);
};

exports.default = _;
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
    return file.indexOf('ws:') === 0 || file.indexOf('wss:') === 0 || type === 'webrtc';
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
var version = exports.version = '0.6.2-localbuild';

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvQXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvQ29uZmlndXJhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvRXZlbnRFbWl0dGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvTGF6eUNvbW1hbmRFeGVjdXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL1N1cHBvcnRDaGVja2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvY29uc3RhbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvbWVkaWEvTWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3BsYXlsaXN0L01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9Db250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvc2hpbXMvcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvb3ZlbnBsYXllci5zZGsuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL2xvZ2dlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvc3RyaW5ncy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvdW5kZXJzY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvdmFsaWRhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy93ZWJwYWNrLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92ZXJzaW9uLmpzIl0sIm5hbWVzIjpbIkFwaSIsImNvbnRhaW5lciIsImxvZ01hbmFnZXIiLCJ0aGF0IiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJ2ZXJzaW9uIiwibWVkaWFNYW5hZ2VyIiwicGxheWxpc3RNYW5hZ2VyIiwicHJvdmlkZXJDb250cm9sbGVyIiwiY3VycmVudFByb3ZpZGVyIiwicGxheWVyQ29uZmlnIiwibGF6eVF1ZXVlIiwiaW5pdFByb3ZpZGVyIiwibGFzdFBsYXlQb3NpdGlvbiIsInBpY2tRdWFsaXR5RnJvbVNvdXJjZSIsInNvdXJjZXMiLCJxdWFsaXR5IiwiaSIsImxlbmd0aCIsImRlZmF1bHQiLCJnZXRRdWFsaXR5TGFiZWwiLCJsYWJlbCIsImxvYWRQcm92aWRlcnMiLCJnZXRQbGF5bGlzdCIsInRoZW4iLCJkZXN0cm95IiwidmlkZW9FbGVtZW50IiwiY3JlYXRlRWxlbWVudCIsImN1cnJlbnRTb3VyY2VJbmRleCIsImdldEN1cnJlbnRTb3VyY2VzIiwiUHJvdmlkZXJzIiwib24iLCJuYW1lIiwiZGF0YSIsIkVSUk9SIiwiY29kZSIsIlBMQVlFUl9GSUxFX0VSUk9SIiwicGFyc2VJbnQiLCJORVRXT1JLX1VOU1RBQkxFIiwiZ2V0Q3VycmVudFF1YWxpdHkiLCJzZXRDdXJyZW50UXVhbGl0eSIsInRyaWdnZXIiLCJwcmVsb2FkIiwiZmx1c2giLCJSRUFEWSIsImNhdGNoIiwiZXJyb3IiLCJlcnJvck9iamVjdCIsIklOSVRfRVJST1IiLCJyZWFzb24iLCJtZXNzYWdlIiwicmVtb3ZlQW5kRXhjdXRlT25jZSIsImluaXQiLCJvcHRpb25zIiwiaXNEZWJ1ZyIsImRpc2FibGUiLCJzZXRQbGF5bGlzdCIsImdldENvbmZpZyIsImdldER1cmF0aW9uIiwiZ2V0UG9zaXRpb24iLCJnZXRWb2x1bWUiLCJzZXRWb2x1bWUiLCJ2b2x1bWUiLCJzZXRNdXRlIiwic3RhdGUiLCJnZXRNdXRlIiwibG9hZCIsInBsYXlsaXN0IiwicGxheSIsInBhdXNlIiwic2VlayIsInBvc2l0aW9uIiwic2V0UGxheWJhY2tSYXRlIiwicGxheWJhY2tSYXRlIiwic2V0RGVmYXVsdFBsYXliYWNrUmF0ZSIsImdldFBsYXliYWNrUmF0ZSIsImdldFF1YWxpdHlMZXZlbHMiLCJxdWFsaXR5SW5kZXgiLCJjdXJyZW50U291cmNlIiwibmV3U291cmNlIiwiaXNTYW1lUHJvdmlkZXIiLCJyZXNRdWFsaXR5SW5kZXgiLCJnZXRCdWZmZXIiLCJnZXRTdGF0ZSIsInN0b3AiLCJyZW1vdmUiLCJERVNUUk9ZIiwib2ZmIiwiQ29uZmlndXJhdG9yIiwiY29tcG9zZVNvdXJjZU9wdGlvbnMiLCJEZWZhdWx0cyIsImRlZmF1bHRQbGF5YmFja1JhdGUiLCJwbGF5YmFja1JhdGVDb250cm9scyIsInBsYXliYWNrUmF0ZXMiLCJtdXRlIiwid2lkdGgiLCJoZWlnaHQiLCJzZXJpYWxpemUiLCJ2YWwiLCJ1bmRlZmluZWQiLCJsb3dlcmNhc2VWYWwiLCJ0b0xvd2VyQ2FzZSIsImlzTmFOIiwiTnVtYmVyIiwicGFyc2VGbG9hdCIsImRlc2VyaWFsaXplIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJub3JtYWxpemVTaXplIiwic2xpY2UiLCJldmFsdWF0ZUFzcGVjdFJhdGlvIiwiYXIiLCJ0b1N0cmluZyIsImluZGV4T2YiLCJ0ZXN0IiwiaW5kZXgiLCJ3Iiwic3Vic3RyIiwiaCIsImNvbmZpZyIsImFzcGVjdHJhdGlvIiwicmF0ZUNvbnRyb2xzIiwicmF0ZXMiLCJBcnJheSIsImlzQXJyYXkiLCJmaWx0ZXIiLCJfIiwiaXNOdW1iZXIiLCJyYXRlIiwibWFwIiwiTWF0aCIsInJvdW5kIiwicHVzaCIsInNvcnQiLCJjb25maWdQbGF5bGlzdCIsIm9iaiIsInBpY2siLCJmZWVkRGF0YSIsImR1cmF0aW9uIiwiZGVidWciLCJpbWFnZSIsInF1YWxpdHlMYWJlbCIsInJlcGVhdCIsInN0cmV0Y2hpbmciLCJnZXRBc3BlY3RyYXRpbyIsInNldEFzcGVjdHJhdGlvIiwiYXNwZWN0cmF0aW9fIiwiZ2V0RGVmYXVsdFBsYXliYWNrUmF0ZSIsInNldFF1YWxpdHlMYWJlbCIsIm5ld0xhYmVsIiwiZ2V0UGxheWJhY2tSYXRlcyIsImlzUGxheWJhY2tSYXRlQ29udHJvbHMiLCJwbGF5bGlzdF8iLCJpc1JlcGVhdCIsImdldFN0cmV0Y2hpbmciLCJFdmVudEVtaXR0ZXIiLCJvYmplY3QiLCJfZXZlbnRzIiwidHJpZ2dlckV2ZW50cyIsImV2ZW50cyIsImFyZ3MiLCJjb250ZXh0IiwiZXZlbnQiLCJsaXN0ZW5lciIsImFwcGx5IiwiY2FsbCIsImFyZ3VtZW50cyIsImFsbEV2ZW50cyIsImFsbCIsIm5hbWVzIiwibCIsInJldGFpbiIsImoiLCJrIiwiX2NhbGxiYWNrIiwib25jZSIsImNvdW50Iiwib25jZUNhbGxiYWNrIiwiX2xpc3RlbmVyIiwiTGF6eUNvbW1hbmRFeGVjdXRvciIsImluc3RhbmNlIiwicXVldWVkQ29tbWFuZHMiLCJjb21tYW5kUXVldWUiLCJ1bmRlY29yYXRlZE1ldGhvZHMiLCJleGVjdXRlTW9kZSIsImNvbW1hbmQiLCJtZXRob2QiLCJwcm90b3R5cGUiLCJhZGRRdWV1ZSIsImV4ZWN1dGVRdWV1ZWRDb21tYW5kcyIsInNoaWZ0Iiwic2V0RXhlY3V0ZU1vZGUiLCJtb2RlIiwiZ2V0VW5kZWNvcmF0ZWRNZXRob2RzIiwiZ2V0UXVldWUiLCJlbXB0eSIsImNvbW1hbmRfIiwiY29tbWFuZFF1ZXVlSXRlbSIsImZpbmRXaGVyZSIsInNwbGljZSIsImZpbmRJbmRleCIsIlN1cHBvcnRDaGVja2VyIiwic3VwcG9ydExpc3QiLCJjaGVja1N1cHBvcnQiLCJzb3VyY2UiLCJNaW1lVHlwZXMiLCJhYWMiLCJtcDQiLCJmNHYiLCJtNHYiLCJtb3YiLCJtcDMiLCJtcGVnIiwib2d2Iiwib2dnIiwib2dhIiwidm9yYmlzIiwid2VibSIsImY0YSIsIm0zdTgiLCJtM3UiLCJobHMiLCJ2aWRlbyIsImRvY3VtZW50IiwiY2FuUGxheVR5cGUiLCJmaWxlIiwidHlwZSIsIm1pbWVUeXBlIiwiaXNIbHNTdXBwb3J0IiwiZ2V0TWVkaWFTb3VyY2UiLCJ3aW5kb3ciLCJNZWRpYVNvdXJjZSIsIldlYktpdE1lZGlhU291cmNlIiwibWVkaWFTb3VyY2UiLCJzb3VyY2VCdWZmZXIiLCJTb3VyY2VCdWZmZXIiLCJXZWJLaXRTb3VyY2VCdWZmZXIiLCJpc1R5cGVTdXBwb3J0ZWQiLCJzb3VyY2VCdWZmZXJWYWxpZEFQSSIsImFwcGVuZEJ1ZmZlciIsImZpbmRQcm92aWRlck5hbWVCeVNvdXJjZSIsInNvcnVjZV8iLCJmaW5kUHJvdmlkZXJOYW1lc0J5UGxheWxpc3QiLCJzdXBwb3J0TmFtZXMiLCJpdGVtIiwic3VwcG9ydGVkIiwiU1RBVEVfQlVGRkVSSU5HIiwiU1RBVEVfSURMRSIsIlNUQVRFX0NPTVBMRVRFIiwiU1RBVEVfUEFVU0VEIiwiU1RBVEVfUExBWUlORyIsIlNUQVRFX0VSUk9SIiwiU1RBVEVfTE9BRElORyIsIlNUQVRFX1NUQUxMRUQiLCJQUk9WSURFUl9IVE1MNSIsIlBST1ZJREVSX1dFQlJUQyIsIlBST1ZJREVSX0RBU0giLCJQUk9WSURFUl9ITFMiLCJDT05URU5UX0NPTVBMRVRFIiwiQ09OVEVOVF9TRUVLIiwiQ09OVEVOVF9CVUZGRVJfRlVMTCIsIkRJU1BMQVlfQ0xJQ0siLCJDT05URU5UX0xPQURFRCIsIkNPTlRFTlRfU0VFS0VEIiwiUExBWUVSX1NUQVRFIiwiUExBWUVSX0NPTVBMRVRFIiwiUExBWUVSX1BBVVNFIiwiUExBWUVSX1BMQVkiLCJDT05URU5UX0JVRkZFUiIsIkNPTlRFTlRfVElNRSIsIkNPTlRFTlRfUkFURV9DSEFOR0UiLCJDT05URU5UX1ZPTFVNRSIsIkNPTlRFTlRfTVVURSIsIkNPTlRFTlRfTUVUQSIsIkNPTlRFTlRfTEVWRUxTIiwiQ09OVEVOVF9MRVZFTF9DSEFOR0VEIiwiUExBWUJBQ0tfUkFURV9DSEFOR0VEIiwiQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VEIiwiQ09OVEVOVF9DQVBUSU9OX0NIQU5HRUQiLCJQTEFZRVJfVU5LTldPTl9FUlJPUiIsIlBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUiIsIlBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IiLCJQTEFZRVJfQ0FQVElPTl9FUlJPUiIsIlBMQVlFUl9XRUJSVENfV1NfRVJST1IiLCJQTEFZRVJfV0VCUlRDX1dTX0NMT1NFRCIsIlBMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUiIsIlBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19DUkVBVEVfQU5TV0VSX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUiIsIk1hbmFnZXIiLCJtZWRpYUVsZW1lbnQiLCJjcmVhdGVNZWRpYUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsInJlbW92ZUNoaWxkIiwiY3VycmVudFBsYXlsaXN0Iiwic2MiLCJtYWtlUHJldHR5U291cmNlIiwic291cmNlXyIsImhvc3QiLCJhcHBsaWNhdGlvbiIsInN0cmVhbSIsIm1pbWV0eXBlUmVnRXgiLCJyZXBsYWNlIiwicHJldHRpZWRQbGF5bGlzdCIsInRyYWNrcyIsInBsYXlsaXN0SXRlbSIsImxldmVscyIsInByZXR0eVNvdXJjZSIsImRlZmF1bHRTb3VyY2UiLCJjYXB0aW9ucyIsImNvbmNhdCIsInRyYWNrIiwiQ29udHJvbGxlciIsInJlZ2lzdGVyUHJvdmlkZXIiLCJwcm92aWRlciIsIlByb3ZpZGVyTG9hZGVyIiwiaHRtbDUiLCJyZXF1aXJlIiwiZXJyIiwiRXJyb3IiLCJ3ZWJydGMiLCJkYXNoIiwic3VwcG9ydGVkUHJvdmlkZXJOYW1lcyIsIlByb21pc2UiLCJwcm92aWRlck5hbWUiLCJmaW5kQnlOYW1lIiwiZ2V0UHJvdmlkZXJCeVNvdXJjZSIsInN1cHBvcnRlZFByb3ZpZGVyTmFtZSIsInByb21pc2VGaW5hbGx5IiwiY2FsbGJhY2siLCJjb25zdHJ1Y3RvciIsInZhbHVlIiwicmVzb2x2ZSIsInJlamVjdCIsInNldFRpbWVvdXRGdW5jIiwic2V0VGltZW91dCIsInNldEltbWVkaWF0ZUZ1bmMiLCJzZXRJbW1lZGlhdGUiLCJub29wIiwiYmluZCIsImZuIiwidGhpc0FyZyIsIlByb21pc2VTaGltIiwiVHlwZUVycm9yIiwiX3N0YXRlIiwiX2hhbmRsZWQiLCJfdmFsdWUiLCJfZGVmZXJyZWRzIiwiZG9SZXNvbHZlIiwiaGFuZGxlIiwic2VsZiIsImRlZmVycmVkIiwiX2ltbWVkaWF0ZUZuIiwiY2IiLCJvbkZ1bGZpbGxlZCIsIm9uUmVqZWN0ZWQiLCJwcm9taXNlIiwicmV0IiwiZSIsIm5ld1ZhbHVlIiwiZmluYWxlIiwiX3VuaGFuZGxlZFJlamVjdGlvbkZuIiwibGVuIiwiSGFuZGxlciIsImRvbmUiLCJleCIsInByb20iLCJhcnIiLCJyZW1haW5pbmciLCJyZXMiLCJyYWNlIiwidmFsdWVzIiwiY29uc29sZSIsIndhcm4iLCJyZXNvbHZlZCIsIl9fd2VicGFja19wdWJsaWNfcGF0aF9fIiwiT3ZlblBsYXllclNESyIsInBsYXllckxpc3QiLCJjaGVja0FuZEdldENvbnRhaW5lckVsZW1lbnQiLCJjb250YWluZXJFbGVtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJub2RlVHlwZSIsImNyZWF0ZSIsInBsYXllckluc3RhbmNlIiwiZ2V0UGxheWVyTGlzdCIsImdldFBsYXllckJ5Q29udGFpbmVySWQiLCJjb250YWluZXJJZCIsImdldFBsYXllckJ5SW5kZXgiLCJnZW5lcmF0ZVdlYnJ0Y1VybHMiLCJsb2dnZXIiLCJwcmV2Q29uc29sZUxvZyIsImVuYWJsZSIsInRyaW0iLCJuYXR1cmFsSG1zIiwic3RyaW5nIiwiZXh0cmFjdEV4dGVuc2lvbiIsInBhdGgiLCJnZXRBenVyZUZpbGVGb3JtYXQiLCJleHRlbnNpb24iLCJhenVyZWRGb3JtYXQiLCJzcGxpdCIsImxhc3RJbmRleE9mIiwic2Vjb25kIiwic2VjTnVtIiwiaG91cnMiLCJmbG9vciIsIm1pbnV0ZXMiLCJzZWNvbmRzIiwicm9vdCIsImdsb2JhbCIsInByZXZpb3VzVW5kZXJzY29yZSIsIkFycmF5UHJvdG8iLCJPYmpQcm90byIsIlN5bWJvbFByb3RvIiwiU3ltYm9sIiwiaGFzT3duUHJvcGVydHkiLCJuYXRpdmVJc0FycmF5IiwibmF0aXZlS2V5cyIsIm5hdGl2ZUNyZWF0ZSIsIkN0b3IiLCJfd3JhcHBlZCIsImV4cG9ydHMiLCJtb2R1bGUiLCJWRVJTSU9OIiwib3B0aW1pemVDYiIsImZ1bmMiLCJhcmdDb3VudCIsImNvbGxlY3Rpb24iLCJhY2N1bXVsYXRvciIsImJ1aWx0aW5JdGVyYXRlZSIsIml0ZXJhdGVlIiwiaWRlbnRpdHkiLCJpc0Z1bmN0aW9uIiwiaXNPYmplY3QiLCJtYXRjaGVyIiwicHJvcGVydHkiLCJJbmZpbml0eSIsInJlc3RBcmd1bWVudHMiLCJzdGFydEluZGV4IiwibWF4IiwicmVzdCIsImJhc2VDcmVhdGUiLCJyZXN1bHQiLCJzaGFsbG93UHJvcGVydHkiLCJkZWVwR2V0IiwiTUFYX0FSUkFZX0lOREVYIiwicG93IiwiZ2V0TGVuZ3RoIiwiaXNBcnJheUxpa2UiLCJlYWNoIiwiY29sbGVjdCIsInJlc3VsdHMiLCJjdXJyZW50S2V5IiwiY3JlYXRlUmVkdWNlIiwiZGlyIiwicmVkdWNlciIsIm1lbW8iLCJpbml0aWFsIiwicmVkdWNlIiwiZm9sZGwiLCJpbmplY3QiLCJyZWR1Y2VSaWdodCIsImZvbGRyIiwiZmluZCIsImRldGVjdCIsInByZWRpY2F0ZSIsImtleUZpbmRlciIsImZpbmRLZXkiLCJzZWxlY3QiLCJsaXN0IiwibmVnYXRlIiwiZXZlcnkiLCJzb21lIiwiYW55IiwiY29udGFpbnMiLCJpbmNsdWRlcyIsImluY2x1ZGUiLCJmcm9tSW5kZXgiLCJndWFyZCIsImludm9rZSIsImNvbnRleHRQYXRoIiwicGx1Y2siLCJ3aGVyZSIsImF0dHJzIiwibGFzdENvbXB1dGVkIiwiY29tcHV0ZWQiLCJ2IiwibWluIiwic2h1ZmZsZSIsInNhbXBsZSIsIm4iLCJyYW5kb20iLCJjbG9uZSIsImxhc3QiLCJyYW5kIiwidGVtcCIsInNvcnRCeSIsImNyaXRlcmlhIiwibGVmdCIsInJpZ2h0IiwiYSIsImIiLCJncm91cCIsImJlaGF2aW9yIiwicGFydGl0aW9uIiwiZ3JvdXBCeSIsImhhcyIsImluZGV4QnkiLCJjb3VudEJ5IiwicmVTdHJTeW1ib2wiLCJ0b0FycmF5IiwiaXNTdHJpbmciLCJtYXRjaCIsInNpemUiLCJwYXNzIiwiZmlyc3QiLCJoZWFkIiwidGFrZSIsImFycmF5IiwidGFpbCIsImRyb3AiLCJjb21wYWN0IiwiQm9vbGVhbiIsImZsYXR0ZW4iLCJpbnB1dCIsInNoYWxsb3ciLCJzdHJpY3QiLCJvdXRwdXQiLCJpZHgiLCJpc0FyZ3VtZW50cyIsIndpdGhvdXQiLCJvdGhlckFycmF5cyIsImRpZmZlcmVuY2UiLCJ1bmlxIiwidW5pcXVlIiwiaXNTb3J0ZWQiLCJpc0Jvb2xlYW4iLCJzZWVuIiwidW5pb24iLCJhcnJheXMiLCJpbnRlcnNlY3Rpb24iLCJhcmdzTGVuZ3RoIiwidW56aXAiLCJ6aXAiLCJjcmVhdGVQcmVkaWNhdGVJbmRleEZpbmRlciIsImZpbmRMYXN0SW5kZXgiLCJzb3J0ZWRJbmRleCIsImxvdyIsImhpZ2giLCJtaWQiLCJjcmVhdGVJbmRleEZpbmRlciIsInByZWRpY2F0ZUZpbmQiLCJyYW5nZSIsInN0YXJ0Iiwic3RlcCIsImNlaWwiLCJjaHVuayIsImV4ZWN1dGVCb3VuZCIsInNvdXJjZUZ1bmMiLCJib3VuZEZ1bmMiLCJjYWxsaW5nQ29udGV4dCIsImJvdW5kIiwiY2FsbEFyZ3MiLCJwYXJ0aWFsIiwiYm91bmRBcmdzIiwicGxhY2Vob2xkZXIiLCJiaW5kQWxsIiwibWVtb2l6ZSIsImhhc2hlciIsImNhY2hlIiwiYWRkcmVzcyIsImRlbGF5Iiwid2FpdCIsImRlZmVyIiwidGhyb3R0bGUiLCJ0aW1lb3V0IiwicHJldmlvdXMiLCJsYXRlciIsImxlYWRpbmciLCJub3ciLCJ0aHJvdHRsZWQiLCJjbGVhclRpbWVvdXQiLCJ0cmFpbGluZyIsImNhbmNlbCIsImRlYm91bmNlIiwiaW1tZWRpYXRlIiwiZGVib3VuY2VkIiwiY2FsbE5vdyIsIndyYXAiLCJ3cmFwcGVyIiwiY29tcG9zZSIsImFmdGVyIiwidGltZXMiLCJiZWZvcmUiLCJoYXNFbnVtQnVnIiwicHJvcGVydHlJc0VudW1lcmFibGUiLCJub25FbnVtZXJhYmxlUHJvcHMiLCJjb2xsZWN0Tm9uRW51bVByb3BzIiwibm9uRW51bUlkeCIsInByb3RvIiwicHJvcCIsImFsbEtleXMiLCJtYXBPYmplY3QiLCJwYWlycyIsImludmVydCIsImZ1bmN0aW9ucyIsIm1ldGhvZHMiLCJjcmVhdGVBc3NpZ25lciIsImtleXNGdW5jIiwiZGVmYXVsdHMiLCJleHRlbmQiLCJleHRlbmRPd24iLCJhc3NpZ24iLCJrZXlJbk9iaiIsIm9taXQiLCJTdHJpbmciLCJwcm9wcyIsInRhcCIsImludGVyY2VwdG9yIiwiaXNNYXRjaCIsImVxIiwiZGVlcEVxIiwiYVN0YWNrIiwiYlN0YWNrIiwiY2xhc3NOYW1lIiwidmFsdWVPZiIsImFyZUFycmF5cyIsImFDdG9yIiwiYkN0b3IiLCJwb3AiLCJpc0VxdWFsIiwiaXNFbXB0eSIsImlzRWxlbWVudCIsIm5vZGVsaXN0IiwiY2hpbGROb2RlcyIsIkludDhBcnJheSIsImlzRmluaXRlIiwiaXNTeW1ib2wiLCJpc051bGwiLCJpc1VuZGVmaW5lZCIsIm5vQ29uZmxpY3QiLCJjb25zdGFudCIsInByb3BlcnR5T2YiLCJtYXRjaGVzIiwiYWNjdW0iLCJEYXRlIiwiZ2V0VGltZSIsImVzY2FwZU1hcCIsInVuZXNjYXBlTWFwIiwiY3JlYXRlRXNjYXBlciIsImVzY2FwZXIiLCJqb2luIiwidGVzdFJlZ2V4cCIsIlJlZ0V4cCIsInJlcGxhY2VSZWdleHAiLCJlc2NhcGUiLCJ1bmVzY2FwZSIsImZhbGxiYWNrIiwiaWRDb3VudGVyIiwidW5pcXVlSWQiLCJwcmVmaXgiLCJpZCIsInRlbXBsYXRlU2V0dGluZ3MiLCJldmFsdWF0ZSIsImludGVycG9sYXRlIiwibm9NYXRjaCIsImVzY2FwZXMiLCJlc2NhcGVSZWdFeHAiLCJlc2NhcGVDaGFyIiwidGVtcGxhdGUiLCJ0ZXh0Iiwic2V0dGluZ3MiLCJvbGRTZXR0aW5ncyIsIm9mZnNldCIsInZhcmlhYmxlIiwicmVuZGVyIiwiRnVuY3Rpb24iLCJhcmd1bWVudCIsImNoYWluIiwiX2NoYWluIiwiY2hhaW5SZXN1bHQiLCJtaXhpbiIsInRvSlNPTiIsImlzUnRtcCIsImlzV2ViUlRDIiwiaXNEYXNoIiwiZ2V0U2NyaXB0UGF0aCIsInNjcmlwdE5hbWUiLCJzY3JpcHRzIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJzcmMiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGdCQUFRLG9CQUFvQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQSxpREFBeUMsNFhBQTRYO0FBQ3JhOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQSx5Q0FBaUM7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUF3QixrQ0FBa0M7QUFDMUQsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7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T2lrQixJQUFJL2pCLE1BQUosQ0FBVyxDQUFYLEVBQWNGLFFBQVEsQ0FBdEIsQ0FBUDtBQUNIO0FBQ0o7QUFDSjtBQUNELFdBQU8sRUFBUDtBQUNILENBWk0sQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKUDs7O0FBR08sSUFBTWhILDRCQUFVLGtCQUFoQixDIiwiZmlsZSI6Im92ZW5wbGF5ZXIuc2RrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG5cblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0fTtcblxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJvdmVucGxheWVyLnNka1wiOiAwXG4gXHR9O1xuXG5cblxuIFx0Ly8gc2NyaXB0IHBhdGggZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIGpzb25wU2NyaXB0U3JjKGNodW5rSWQpIHtcbiBcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyAoe1wib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLmh0bWw1XCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuaHRtbDVcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlclwiLFwib3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlclwiOlwib3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlclwiLFwib3ZlbnBsYXllci5wcm92aWRlci5odG1sNVwiOlwib3ZlbnBsYXllci5wcm92aWRlci5odG1sNVwifVtjaHVua0lkXXx8Y2h1bmtJZCkgKyBcIi5qc1wiXG4gXHR9XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuIFx0Ly8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuIFx0Ly8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSBmdW5jdGlvbiByZXF1aXJlRW5zdXJlKGNodW5rSWQpIHtcbiBcdFx0dmFyIHByb21pc2VzID0gW107XG5cblxuIFx0XHQvLyBKU09OUCBjaHVuayBsb2FkaW5nIGZvciBqYXZhc2NyaXB0XG5cbiBcdFx0dmFyIGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhICE9PSAwKSB7IC8vIDAgbWVhbnMgXCJhbHJlYWR5IGluc3RhbGxlZFwiLlxuXG4gXHRcdFx0Ly8gYSBQcm9taXNlIG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEpIHtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdKTtcbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Ly8gc2V0dXAgUHJvbWlzZSBpbiBjaHVuayBjYWNoZVxuIFx0XHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gW3Jlc29sdmUsIHJlamVjdF07XG4gXHRcdFx0XHR9KTtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdID0gcHJvbWlzZSk7XG5cbiBcdFx0XHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcbiBcdFx0XHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiBcdFx0XHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiBcdFx0XHRcdHZhciBvblNjcmlwdENvbXBsZXRlO1xuXG4gXHRcdFx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG4gXHRcdFx0XHRzY3JpcHQudGltZW91dCA9IDEyMDtcbiBcdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG4gXHRcdFx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHNjcmlwdC5zcmMgPSBqc29ucFNjcmlwdFNyYyhjaHVua0lkKTtcblxuIFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuIFx0XHRcdFx0XHQvLyBhdm9pZCBtZW0gbGVha3MgaW4gSUUuXG4gXHRcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG4gXHRcdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiBcdFx0XHRcdFx0dmFyIGNodW5rID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRcdFx0XHRpZihjaHVuayAhPT0gMCkge1xuIFx0XHRcdFx0XHRcdGlmKGNodW5rKSB7XG4gXHRcdFx0XHRcdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJyA/ICdtaXNzaW5nJyA6IGV2ZW50LnR5cGUpO1xuIFx0XHRcdFx0XHRcdFx0dmFyIHJlYWxTcmMgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYztcbiBcdFx0XHRcdFx0XHRcdHZhciBlcnJvciA9IG5ldyBFcnJvcignTG9hZGluZyBjaHVuayAnICsgY2h1bmtJZCArICcgZmFpbGVkLlxcbignICsgZXJyb3JUeXBlICsgJzogJyArIHJlYWxTcmMgKyAnKScpO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnJlcXVlc3QgPSByZWFsU3JjO1xuIFx0XHRcdFx0XHRcdFx0Y2h1bmtbMV0oZXJyb3IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSB1bmRlZmluZWQ7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH07XG4gXHRcdFx0XHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiBcdFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSh7IHR5cGU6ICd0aW1lb3V0JywgdGFyZ2V0OiBzY3JpcHQgfSk7XG4gXHRcdFx0XHR9LCAxMjAwMDApO1xuIFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gb25TY3JpcHRDb21wbGV0ZTtcbiBcdFx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0cmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gb24gZXJyb3IgZnVuY3Rpb24gZm9yIGFzeW5jIGxvYWRpbmdcbiBcdF9fd2VicGFja19yZXF1aXJlX18ub2UgPSBmdW5jdGlvbihlcnIpIHsgY29uc29sZS5lcnJvcihlcnIpOyB0aHJvdyBlcnI7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvanMvb3ZlbnBsYXllci5zZGsuanNcIik7XG4iLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSwgZXZhbCkoXCJ0aGlzXCIpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0aWYgKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XG5cdFx0bW9kdWxlLnBhdGhzID0gW107XG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XG5cdFx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xuXHR9XG5cdHJldHVybiBtb2R1bGU7XG59O1xuIiwiLy9pbXBvcnQgQ2FwdGlvbk1hbmFnZXIgZnJvbSBcImFwaS9jYXB0aW9uL01hbmFnZXJcIjtcbmltcG9ydCBDb25maWd1cmF0b3IgZnJvbSBcImFwaS9Db25maWd1cmF0b3JcIjtcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImFwaS9FdmVudEVtaXR0ZXJcIjtcbmltcG9ydCBMYXp5Q29tbWFuZEV4ZWN1dG9yIGZyb20gXCJhcGkvTGF6eUNvbW1hbmRFeGVjdXRvclwiO1xuaW1wb3J0IExvZ01hbmFnZXIgZnJvbSBcInV0aWxzL2xvZ2dlclwiO1xuaW1wb3J0IE1lZGlhTWFuYWdlciBmcm9tIFwiYXBpL21lZGlhL01hbmFnZXJcIjtcbmltcG9ydCBQbGF5bGlzdE1hbmFnZXIgZnJvbSBcImFwaS9wbGF5bGlzdC9NYW5hZ2VyXCI7XG5pbXBvcnQgUHJvdmlkZXJDb250cm9sbGVyIGZyb20gXCJhcGkvcHJvdmlkZXIvQ29udHJvbGxlclwiO1xuaW1wb3J0IFByb21pc2UsIHtyZXNvbHZlZH0gZnJvbSBcImFwaS9zaGltcy9wcm9taXNlXCI7XG5pbXBvcnQge1JFQURZLCBFUlJPUiwgSU5JVF9FUlJPUiwgREVTVFJPWSwgTkVUV09SS19VTlNUQUJMRSwgUExBWUVSX0ZJTEVfRVJST1J9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5pbXBvcnQge3ZlcnNpb259IGZyb20gJ3ZlcnNpb24nO1xuXG4vKipcbiAqIEBicmllZiAgIFRoaXMgb2JqZWN0IGNvbm5lY3RzIFVJIHRvIHRoZSBwcm92aWRlci5cbiAqIEBwYXJhbSAgIHtvYmplY3R9ICAgIGNvbnRhaW5lciAgZG9tIGVsZW1lbnRcbiAqXG4gKiAqL1xuXG5jb25zdCBBcGkgPSBmdW5jdGlvbihjb250YWluZXIpe1xuICAgIGxldCBsb2dNYW5hZ2VyID0gTG9nTWFuYWdlcigpO1xuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICBFdmVudEVtaXR0ZXIodGhhdCk7XG5cbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJbW092ZW5QbGF5ZXJdXSB2LlwiKyB2ZXJzaW9uKTtcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgbG9hZGVkLlwiKTtcbiAgICAvL2xldCBjYXB0aW9uTWFuYWdlciA9IENhcHRpb25NYW5hZ2VyKHRoYXQpO1xuICAgIGxldCBtZWRpYU1hbmFnZXIgPSBNZWRpYU1hbmFnZXIoY29udGFpbmVyKTtcbiAgICBsZXQgcGxheWxpc3RNYW5hZ2VyID0gUGxheWxpc3RNYW5hZ2VyKCk7XG4gICAgbGV0IHByb3ZpZGVyQ29udHJvbGxlciA9IFByb3ZpZGVyQ29udHJvbGxlcigpO1xuICAgIGxldCBjdXJyZW50UHJvdmlkZXIgPSBcIlwiO1xuICAgIGxldCBwbGF5ZXJDb25maWcgPSBcIlwiO1xuICAgIGxldCBsYXp5UXVldWUgPSBcIlwiO1xuXG4gICAgY29uc3QgaW5pdFByb3ZpZGVyID0gZnVuY3Rpb24obGFzdFBsYXlQb3NpdGlvbil7XG4gICAgICAgIGNvbnN0IHBpY2tRdWFsaXR5RnJvbVNvdXJjZSA9IChzb3VyY2VzKSA9PntcbiAgICAgICAgICAgIHZhciBxdWFsaXR5ID0gMDtcbiAgICAgICAgICAgIGlmIChzb3VyY2VzKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3VyY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzb3VyY2VzW2ldLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1YWxpdHkgPSBpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0UXVhbGl0eUxhYmVsKCkgJiYgc291cmNlc1tpXS5sYWJlbCA9PT0gcGxheWVyQ29uZmlnLmdldFF1YWxpdHlMYWJlbCgpICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcXVhbGl0eTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gcHJvdmlkZXJDb250cm9sbGVyLmxvYWRQcm92aWRlcnMocGxheWxpc3RNYW5hZ2VyLmdldFBsYXlsaXN0KCkpLnRoZW4oUHJvdmlkZXJzID0+IHtcbiAgICAgICAgICAgIGlmKGN1cnJlbnRQcm92aWRlcil7XG4gICAgICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgdmlkZW9FbGVtZW50ID0gbWVkaWFNYW5hZ2VyLmNyZWF0ZUVsZW1lbnQoKTtcbiAgICAgICAgICAgIGxldCBjdXJyZW50U291cmNlSW5kZXggPSBwaWNrUXVhbGl0eUZyb21Tb3VyY2UocGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRTb3VyY2VzKCkpO1xuXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJjdXJyZW50IHNvdXJjZSBpbmRleCA6IFwiKyBjdXJyZW50U291cmNlSW5kZXgpO1xuXG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIgPSBQcm92aWRlcnNbY3VycmVudFNvdXJjZUluZGV4XSh2aWRlb0VsZW1lbnQsIHBsYXllckNvbmZpZyk7XG5cbiAgICAgICAgICAgIC8vVGhpcyBwYXNzZXMgdGhlIGV2ZW50IGNyZWF0ZWQgYnkgdGhlIFByb3ZpZGVyIHRvIEFQSS5cbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5vbihcImFsbFwiLCBmdW5jdGlvbihuYW1lLCBkYXRhKXtcblxuICAgICAgICAgICAgICAgIC8vQXV0byBuZXh0IHNvdXJjZSB3aGVuIHBsYXllciBsb2FkIHdhcyBmYWlsIGJ5IGFtaXNzIHNvdXJjZS5cbiAgICAgICAgICAgICAgICBpZiggKG5hbWUgPT09IEVSUk9SICYmIChkYXRhLmNvZGUgPT09IFBMQVlFUl9GSUxFX0VSUk9SIHx8IHBhcnNlSW50KGRhdGEuY29kZS8xMDApID09PSA1KSl8fCBuYW1lID09PSBORVRXT1JLX1VOU1RBQkxFICl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBsYXN0UGxheVBvc2l0aW9uID0gdGhhdC5nZXRDdXJyZW50UXVhbGl0eSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGF0LnNldEN1cnJlbnRRdWFsaXR5KGxhc3RQbGF5UG9zaXRpb24rMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihuYW1lLCBkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pLnRoZW4oKCk9PntcbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5wcmVsb2FkKHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50U291cmNlcygpLCBsYXN0UGxheVBvc2l0aW9uICk7XG5cbiAgICAgICAgICAgIGxhenlRdWV1ZS5mbHVzaCgpO1xuICAgICAgICAgICAgLy9UaGlzIGlzIG5vIHJlYXNvbiB0byBleGlzdCBhbnltb3JlLlxuICAgICAgICAgICAgbGF6eVF1ZXVlLmRlc3Ryb3koKTtcblxuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFJFQURZKTtcbiAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlcnJvck9iamVjdCA9IHtjb2RlIDogSU5JVF9FUlJPUiwgcmVhc29uIDogXCJpbml0IGVycm9yLlwiLCBtZXNzYWdlIDogXCJQbGF5ZXIgaW5pdCBlcnJvci5cIiwgZXJyb3IgOiBlcnJvcn07XG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoRVJST1IsIGVycm9yT2JqZWN0KTtcblxuICAgICAgICAgICAgLy94eHggOiBJZiB5b3UgaW5pdCBlbXB0eSBzb3VyY2VzLiAoSSB0aGluayB0aGlzIGlzIHN0cmFuZ2UgY2FzZS4pXG4gICAgICAgICAgICAvL1RoaXMgd29ya3MgZm9yIHRoaXMgY2FzZS5cbiAgICAgICAgICAgIC8vcGxheWVyID0gT3ZlblBsYXllci5jcmVhdGUoXCJlbElkXCIsIHt9KTtcbiAgICAgICAgICAgIC8vcGxheWVyLmxvYWQoc29ydWNlcyk7XG4gICAgICAgICAgICBsYXp5UXVldWUucmVtb3ZlQW5kRXhjdXRlT25jZShcImxvYWRcIik7XG4gICAgICAgIH0pO1xuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIEFQSSDstIjquLDtmZQg7ZWo7IiYXG4gICAgICogaW5pdFxuICAgICAqIEBwYXJhbSAgICAgIHtvYmplY3R9IG9wdGlvbnMgcGxheWVyIGluaXRpYWwgb3B0aW9uIHZhbHVlLlxuICAgICAqIEByZXR1cm5zXG4gICAgICoqL1xuICAgIHRoYXQuaW5pdCA9IChvcHRpb25zKSA9PntcbiAgICAgICAgLy9JdCBjb2xsZWN0cyB0aGUgY29tbWFuZHMgYW5kIGV4ZWN1dGVzIHRoZW0gYXQgdGhlIHRpbWUgd2hlbiB0aGV5IGFyZSBleGVjdXRhYmxlLlxuICAgICAgICBsYXp5UXVldWUgPSBMYXp5Q29tbWFuZEV4ZWN1dG9yKHRoYXQsIFsnbG9hZCcsJ3BsYXknLCdwYXVzZScsJ3NlZWsnLCdzdG9wJywgJ2dldER1cmF0aW9uJywgJ2dldFBvc2l0aW9uJywgJ2dldFZvbHVtZScsICdnZXRNdXRlJywgJ2dldEJ1ZmZlcicsICdnZXRTdGF0ZSddKTtcbiAgICAgICAgcGxheWVyQ29uZmlnID0gQ29uZmlndXJhdG9yKG9wdGlvbnMpO1xuICAgICAgICBpZighcGxheWVyQ29uZmlnLmlzRGVidWcoKSl7XG4gICAgICAgICAgICBsb2dNYW5hZ2VyLmRpc2FibGUoKTtcbiAgICAgICAgfVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpbml0KClcIik7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGluaXQoKSBjb25maWcgOiBcIiwgcGxheWVyQ29uZmlnKTtcblxuICAgICAgICBwbGF5bGlzdE1hbmFnZXIuc2V0UGxheWxpc3QocGxheWVyQ29uZmlnLmdldFBsYXlsaXN0KCkpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpbml0KCkgc291cmNlcyA6IFwiICwgcGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRTb3VyY2VzKCkpO1xuICAgICAgICBpbml0UHJvdmlkZXIoKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Q29uZmlnID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRDb25maWcoKVwiLCBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkpO1xuICAgICAgICByZXR1cm4gcGxheWVyQ29uZmlnLmdldENvbmZpZygpO1xuICAgIH07XG5cbiAgICB0aGF0LmdldER1cmF0aW9uID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXREdXJhdGlvbigpXCIsIGN1cnJlbnRQcm92aWRlci5nZXREdXJhdGlvbigpKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXREdXJhdGlvbigpO1xuICAgIH07XG4gICAgdGhhdC5nZXRQb3NpdGlvbiA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0UG9zaXRpb24oKVwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0UG9zaXRpb24oKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0UG9zaXRpb24oKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Vm9sdW1lID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRWb2x1bWUoKVwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0Vm9sdW1lKCkpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFZvbHVtZSgpO1xuICAgIH07XG4gICAgdGhhdC5zZXRWb2x1bWUgPSAodm9sdW1lKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldFZvbHVtZSgpIFwiICsgdm9sdW1lKTtcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnNldFZvbHVtZSh2b2x1bWUpO1xuICAgIH07XG4gICAgdGhhdC5zZXRNdXRlID0gKHN0YXRlKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldE11dGUoKSBcIiArIHN0YXRlKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5zZXRNdXRlKHN0YXRlKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0TXV0ZSA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0TXV0ZSgpIFwiICsgY3VycmVudFByb3ZpZGVyLmdldE11dGUoKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0TXV0ZSgpO1xuICAgIH07XG4gICAgdGhhdC5sb2FkID0gKHBsYXlsaXN0KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGxvYWQoKSBcIiwgcGxheWxpc3QpO1xuICAgICAgICBsYXp5UXVldWUgPSBMYXp5Q29tbWFuZEV4ZWN1dG9yKHRoYXQsIFsncGxheScsJ3NlZWsnLCdzdG9wJ10pO1xuXG4gICAgICAgIGlmKHBsYXlsaXN0KXtcbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5zZXRDdXJyZW50UXVhbGl0eSgwKTtcbiAgICAgICAgICAgIHBsYXlsaXN0TWFuYWdlci5zZXRQbGF5bGlzdChwbGF5bGlzdCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGluaXRQcm92aWRlcigpO1xuXG4gICAgfTtcbiAgICB0aGF0LnBsYXkgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHBsYXkoKSBcIik7XG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5wbGF5KCk7XG4gICAgfVxuICAgIHRoYXQucGF1c2UgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHBhdXNlKCkgXCIpO1xuICAgICAgICBjdXJyZW50UHJvdmlkZXIucGF1c2UoKTtcbiAgICB9O1xuICAgIHRoYXQuc2VlayA9IChwb3NpdGlvbikgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZWVrKCkgXCIrIHBvc2l0aW9uKTtcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnNlZWsocG9zaXRpb24pO1xuICAgIH07XG4gICAgdGhhdC5zZXRQbGF5YmFja1JhdGUgPSAocGxheWJhY2tSYXRlKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0UGxheWJhY2tSYXRlKCkgXCIsIHBsYXliYWNrUmF0ZSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2V0UGxheWJhY2tSYXRlKHBsYXllckNvbmZpZy5zZXREZWZhdWx0UGxheWJhY2tSYXRlKHBsYXliYWNrUmF0ZSkpO1xuICAgIH07XG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGUgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0UGxheWJhY2tSYXRlKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRQbGF5YmFja1JhdGUoKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0UGxheWJhY2tSYXRlKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldFF1YWxpdHlMZXZlbHMgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0UXVhbGl0eUxldmVscygpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0UXVhbGl0eUxldmVscygpKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRRdWFsaXR5TGV2ZWxzKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldEN1cnJlbnRRdWFsaXR5ID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEN1cnJlbnRRdWFsaXR5KCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRDdXJyZW50UXVhbGl0eSgpKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRDdXJyZW50UXVhbGl0eSgpO1xuICAgIH07XG4gICAgdGhhdC5zZXRDdXJyZW50UXVhbGl0eSA9IChxdWFsaXR5SW5kZXgpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRDdXJyZW50UXVhbGl0eSgpIFwiLCBxdWFsaXR5SW5kZXgpO1xuXG4gICAgICAgIGxldCBzb3VyY2VzID0gcGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRTb3VyY2VzKCk7XG4gICAgICAgIGxldCBjdXJyZW50U291cmNlID0gc291cmNlc1t0aGF0LmdldEN1cnJlbnRRdWFsaXR5KCldO1xuICAgICAgICBsZXQgbmV3U291cmNlID0gc291cmNlc1txdWFsaXR5SW5kZXhdO1xuICAgICAgICBsZXQgbGFzdFBsYXlQb3NpdGlvbiA9IHRoYXQuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgbGV0IGlzU2FtZVByb3ZpZGVyID0gcHJvdmlkZXJDb250cm9sbGVyLmlzU2FtZVByb3ZpZGVyKGN1cnJlbnRTb3VyY2UsIG5ld1NvdXJjZSk7XG4gICAgICAgIC8vIHByb3ZpZGVyLnNlckN1cnJlbnRRdWFsaXR5IC0+IHBsYXllckNvbmZpZyBzZXR0aW5nIC0+IGxvYWRcbiAgICAgICAgbGV0IHJlc1F1YWxpdHlJbmRleCA9IGN1cnJlbnRQcm92aWRlci5zZXRDdXJyZW50UXVhbGl0eShxdWFsaXR5SW5kZXgsIGlzU2FtZVByb3ZpZGVyKTtcblxuICAgICAgICBpZighbmV3U291cmNlKXtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Q3VycmVudFF1YWxpdHkoKSBpc1NhbWVQcm92aWRlclwiLCBpc1NhbWVQcm92aWRlcik7XG5cbiAgICAgICAgaWYoIWlzU2FtZVByb3ZpZGVyKXtcbiAgICAgICAgICAgIGxhenlRdWV1ZSA9IExhenlDb21tYW5kRXhlY3V0b3IodGhhdCwgWydwbGF5J10pO1xuICAgICAgICAgICAgaW5pdFByb3ZpZGVyKGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc1F1YWxpdHlJbmRleDtcbiAgICB9O1xuXG4gICAgLyogQ2FwdGlvbnMgOiBUaGlzIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhlIGN1cnJlbnQgdmVyc2lvbi4qL1xuICAgIC8qdGhhdC5zZXRDdXJyZW50Q2FwdGlvbiA9IChpbmRleCkgPT57XG4gICAgICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5zZXRDdXJyZW50Q2FwdGlvbihpbmRleCk7XG4gICAgfVxuICAgIHRoYXQuZ2V0Q3VycmVudENhcHRpb24gPSAoKSA9PntcbiAgICAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLmdldEN1cnJlbnRDYXB0aW9uKCk7XG4gICAgfVxuICAgIHRoYXQuZ2V0Q2FwdGlvbkxpc3QgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5nZXRDYXB0aW9uTGlzdCgpO1xuICAgIH1cbiAgICB0aGF0LmFkZENhcHRpb24gPSAodHJhY2spID0+IHtcbiAgICAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLmFkZENhcHRpb24oKTtcbiAgICB9XG4gICAgdGhhdC5nZXRDYXB0aW9uTGlzdCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLmdldENhcHRpb25MaXN0KCk7XG4gICAgfSovXG5cbiAgICB0aGF0LmdldEJ1ZmZlciA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0QnVmZmVyKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRCdWZmZXIoKSk7XG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5nZXRCdWZmZXIoKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0U3RhdGUgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFN0YXRlKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRTdGF0ZSgpKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRTdGF0ZSgpO1xuICAgIH07XG4gICAgdGhhdC5zdG9wID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzdG9wKCkgXCIpO1xuICAgICAgICBjdXJyZW50UHJvdmlkZXIuc3RvcCgpO1xuICAgIH07XG4gICAgdGhhdC5yZW1vdmUgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHJlbW92ZSgpIFwiKTtcbiAgICAgICAgbGF6eVF1ZXVlLmRlc3Ryb3koKTtcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLmRlc3Ryb3koKTtcbiAgICAgICAgY3VycmVudFByb3ZpZGVyID0gbnVsbDtcbiAgICAgICAgcHJvdmlkZXJDb250cm9sbGVyID0gbnVsbDtcbiAgICAgICAgcGxheWxpc3RNYW5hZ2VyID0gbnVsbDtcbiAgICAgICAgcGxheWVyQ29uZmlnID0gbnVsbDtcblxuICAgICAgICB0aGF0LnRyaWdnZXIoREVTVFJPWSk7XG4gICAgICAgIHRoYXQub2ZmKCk7XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcmVtb3ZlKCkgLSBsYXp5UXVldWUsIGN1cnJlbnRQcm92aWRlciwgcHJvdmlkZXJDb250cm9sbGVyLCBwbGF5bGlzdE1hbmFnZXIsIHBsYXllckNvbmZpZywgYXBpIGV2ZW50IGRlc3Ryb2VkLiBcIik7XG4gICAgICAgIGxvZ01hbmFnZXIuZGVzdHJveSgpO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cblxuXG5leHBvcnQgZGVmYXVsdCBBcGk7XG5cblxuIiwiaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBUaGlzIGluaXRpYWxpemVzIHRoZSBpbnB1dCBvcHRpb25zLlxuICogQHBhcmFtICAgb3B0aW9uc1xuICpcbiAqICovXG5jb25zdCBDb25maWd1cmF0b3IgPSBmdW5jdGlvbihvcHRpb25zKXtcblxuICAgIGNvbnN0IGNvbXBvc2VTb3VyY2VPcHRpb25zID0gZnVuY3Rpb24ob3B0aW9ucyl7XG4gICAgICAgIGNvbnN0IERlZmF1bHRzID0ge1xuICAgICAgICAgICAgZGVmYXVsdFBsYXliYWNrUmF0ZTogMSxcbiAgICAgICAgICAgIHBsYXliYWNrUmF0ZUNvbnRyb2xzOiBmYWxzZSxcbiAgICAgICAgICAgIHBsYXliYWNrUmF0ZXM6IFswLjUsIDEsIDEuMjUsIDEuNSwgMl0sXG4gICAgICAgICAgICBtdXRlOiBmYWxzZSxcbiAgICAgICAgICAgIHZvbHVtZTogOTAsXG4gICAgICAgICAgICB3aWR0aDogNjQwLFxuICAgICAgICAgICAgaGVpZ2h0OiAzNjBcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgc2VyaWFsaXplID0gZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycgJiYgdmFsLmxlbmd0aCA8IDYpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsb3dlcmNhc2VWYWwgPSB2YWwudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICBpZiAobG93ZXJjYXNlVmFsID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChsb3dlcmNhc2VWYWwgPT09ICdmYWxzZScpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKE51bWJlcih2YWwpKSAmJiAhaXNOYU4ocGFyc2VGbG9hdCh2YWwpKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gTnVtYmVyKHZhbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkZXNlcmlhbGl6ZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSAnaWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3B0aW9uc1trZXldID0gc2VyaWFsaXplKG9wdGlvbnNba2V5XSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBub3JtYWxpemVTaXplID0gZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbC5zbGljZSAmJiB2YWwuc2xpY2UoLTIpID09PSAncHgnKSB7XG4gICAgICAgICAgICAgICAgdmFsID0gdmFsLnNsaWNlKDAsIC0yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZXZhbHVhdGVBc3BlY3RSYXRpbyA9IGZ1bmN0aW9uIChhciwgd2lkdGgpIHtcbiAgICAgICAgICAgIGlmICh3aWR0aC50b1N0cmluZygpLmluZGV4T2YoJyUnKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXIgIT09ICdzdHJpbmcnIHx8ICFhcikge1xuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKC9eXFxkKlxcLj9cXGQrJSQvLnRlc3QoYXIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBhci5pbmRleE9mKCc6Jyk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB3ID0gcGFyc2VGbG9hdChhci5zdWJzdHIoMCwgaW5kZXgpKTtcbiAgICAgICAgICAgIGNvbnN0IGggPSBwYXJzZUZsb2F0KGFyLnN1YnN0cihpbmRleCArIDEpKTtcbiAgICAgICAgICAgIGlmICh3IDw9IDAgfHwgaCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gKGggLyB3ICogMTAwKSArICclJztcbiAgICAgICAgfVxuICAgICAgICBkZXNlcmlhbGl6ZShvcHRpb25zKTtcbiAgICAgICAgbGV0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIERlZmF1bHRzLCBvcHRpb25zKTtcbiAgICAgICAgY29uZmlnLndpZHRoID0gbm9ybWFsaXplU2l6ZShjb25maWcud2lkdGgpO1xuICAgICAgICBjb25maWcuaGVpZ2h0ID0gbm9ybWFsaXplU2l6ZShjb25maWcuaGVpZ2h0KTtcbiAgICAgICAgY29uZmlnLmFzcGVjdHJhdGlvID0gZXZhbHVhdGVBc3BlY3RSYXRpbyhjb25maWcuYXNwZWN0cmF0aW8sIGNvbmZpZy53aWR0aCk7XG5cbiAgICAgICAgbGV0IHJhdGVDb250cm9scyA9IGNvbmZpZy5wbGF5YmFja1JhdGVDb250cm9scztcbiAgICAgICAgaWYgKHJhdGVDb250cm9scykge1xuICAgICAgICAgICAgbGV0IHJhdGVzID0gY29uZmlnLnBsYXliYWNrUmF0ZXM7XG5cbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJhdGVDb250cm9scykpIHtcbiAgICAgICAgICAgICAgICByYXRlcyA9IHJhdGVDb250cm9scztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJhdGVzID0gcmF0ZXMuZmlsdGVyKHJhdGUgPT4gXy5pc051bWJlcihyYXRlKSAmJiByYXRlID49IDAuMjUgJiYgcmF0ZSA8PSA0KVxuICAgICAgICAgICAgICAgIC5tYXAocmF0ZSA9PiBNYXRoLnJvdW5kKHJhdGUgKiA0KSAvIDQpO1xuXG4gICAgICAgICAgICBpZiAocmF0ZXMuaW5kZXhPZigxKSA8IDApIHtcbiAgICAgICAgICAgICAgICByYXRlcy5wdXNoKDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmF0ZXMuc29ydCgpO1xuXG4gICAgICAgICAgICBjb25maWcucGxheWJhY2tSYXRlQ29udHJvbHMgPSB0cnVlO1xuICAgICAgICAgICAgY29uZmlnLnBsYXliYWNrUmF0ZXMgPSByYXRlcztcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKCFjb25maWcucGxheWJhY2tSYXRlQ29udHJvbHMgfHwgY29uZmlnLnBsYXliYWNrUmF0ZXMuaW5kZXhPZihjb25maWcuZGVmYXVsdFBsYXliYWNrUmF0ZSkgPCAwKSB7XG4gICAgICAgICAgICBjb25maWcuZGVmYXVsdFBsYXliYWNrUmF0ZSA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBjb25maWcucGxheWJhY2tSYXRlID0gY29uZmlnLmRlZmF1bHRQbGF5YmFja1JhdGU7XG5cbiAgICAgICAgaWYgKCFjb25maWcuYXNwZWN0cmF0aW8pIHtcbiAgICAgICAgICAgIGRlbGV0ZSBjb25maWcuYXNwZWN0cmF0aW87XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb25maWdQbGF5bGlzdCA9IGNvbmZpZy5wbGF5bGlzdDtcbiAgICAgICAgaWYgKCFjb25maWdQbGF5bGlzdCkge1xuICAgICAgICAgICAgY29uc3Qgb2JqID0gXy5waWNrKGNvbmZpZywgW1xuICAgICAgICAgICAgICAgICd0aXRsZScsXG4gICAgICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJyxcbiAgICAgICAgICAgICAgICAndHlwZScsXG4gICAgICAgICAgICAgICAgJ21lZGlhaWQnLFxuICAgICAgICAgICAgICAgICdpbWFnZScsXG4gICAgICAgICAgICAgICAgJ2ZpbGUnLFxuICAgICAgICAgICAgICAgICdzb3VyY2VzJyxcbiAgICAgICAgICAgICAgICAndHJhY2tzJyxcbiAgICAgICAgICAgICAgICAncHJlbG9hZCcsXG4gICAgICAgICAgICAgICAgJ2R1cmF0aW9uJyxcbiAgICAgICAgICAgICAgICAnaG9zdCcsXG4gICAgICAgICAgICAgICAgJ2FwcGxpY2F0aW9uJyxcbiAgICAgICAgICAgICAgICAnc3RyZWFtJ1xuICAgICAgICAgICAgXSk7XG5cbiAgICAgICAgICAgIGNvbmZpZy5wbGF5bGlzdCA9IFsgb2JqIF07XG4gICAgICAgIH0gZWxzZSBpZiAoXy5pc0FycmF5KGNvbmZpZ1BsYXlsaXN0LnBsYXlsaXN0KSkge1xuICAgICAgICAgICAgY29uZmlnLmZlZWREYXRhID0gY29uZmlnUGxheWxpc3Q7XG4gICAgICAgICAgICBjb25maWcucGxheWxpc3QgPSBjb25maWdQbGF5bGlzdC5wbGF5bGlzdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGRlbGV0ZSBjb25maWcuZHVyYXRpb247XG4gICAgICAgIHJldHVybiBjb25maWc7XG4gICAgfTtcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDb25maWd1cmF0b3IgbG9hZGVkLlwiLCBvcHRpb25zKTtcbiAgICBsZXQgY29uZmlnID0gY29tcG9zZVNvdXJjZU9wdGlvbnMob3B0aW9ucyk7XG5cbiAgICBsZXQgYXNwZWN0cmF0aW8gPSBjb25maWcuYXNwZWN0cmF0aW8gfHwgXCIxNjo5XCI7XG4gICAgbGV0IGRlYnVnID0gY29uZmlnLmRlYnVnO1xuICAgIGxldCBkZWZhdWx0UGxheWJhY2tSYXRlID0gY29uZmlnLmRlZmF1bHRQbGF5YmFja1JhdGUgfHwgMTtcbiAgICBsZXQgaW1hZ2UgPSBjb25maWcuaW1hZ2U7XG4gICAgbGV0IHBsYXliYWNrUmF0ZUNvbnRyb2xzID0gY29uZmlnLnBsYXliYWNrUmF0ZUNvbnRyb2xzIHx8IHRydWU7XG4gICAgbGV0IHBsYXliYWNrUmF0ZXMgPSBjb25maWcucGxheWJhY2tSYXRlcyB8fCBbMC41LCAxLCAxLjI1LCAxLjUsIDJdO1xuICAgIGxldCBwbGF5bGlzdCA9IGNvbmZpZy5wbGF5bGlzdCB8fCBbXTtcbiAgICBsZXQgcXVhbGl0eUxhYmVsID0gY29uZmlnLnF1YWxpdHlMYWJlbCB8fCBcIlwiO1xuICAgIGxldCByZXBlYXQgPSBjb25maWcucmVwZWF0IHx8IGZhbHNlO1xuICAgIGxldCBzdHJldGNoaW5nID0gY29uZmlnLnN0cmV0Y2hpbmcgfHwgJ3VuaWZvcm0nO1xuXG5cblxuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICB0aGF0LmdldENvbmZpZyA9ICgpID0+IHtyZXR1cm4gY29uZmlnO307XG5cbiAgICB0aGF0LmdldEFzcGVjdHJhdGlvID0oKT0+e3JldHVybiBhc3BlY3RyYXRpbzt9O1xuICAgIHRoYXQuc2V0QXNwZWN0cmF0aW8gPShhc3BlY3RyYXRpb18pPT57YXNwZWN0cmF0aW8gPSBhc3BlY3RyYXRpb187fTtcblxuICAgIHRoYXQuaXNEZWJ1ZyA9KCk9PntyZXR1cm4gZGVidWc7fTtcblxuICAgIHRoYXQuZ2V0RGVmYXVsdFBsYXliYWNrUmF0ZSA9KCk9PntyZXR1cm4gZGVmYXVsdFBsYXliYWNrUmF0ZTt9O1xuICAgIHRoYXQuc2V0RGVmYXVsdFBsYXliYWNrUmF0ZSA9KHBsYXliYWNrUmF0ZSk9PntkZWZhdWx0UGxheWJhY2tSYXRlID0gcGxheWJhY2tSYXRlOyByZXR1cm4gcGxheWJhY2tSYXRlO307XG5cbiAgICB0aGF0LmdldFF1YWxpdHlMYWJlbCA9ICgpID0+IHtyZXR1cm4gcXVhbGl0eUxhYmVsO307XG4gICAgdGhhdC5zZXRRdWFsaXR5TGFiZWwgPSAobmV3TGFiZWwpID0+IHtxdWFsaXR5TGFiZWwgPSBuZXdMYWJlbDt9O1xuXG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGVzID0oKT0+e3JldHVybiBwbGF5YmFja1JhdGVzO307XG4gICAgdGhhdC5pc1BsYXliYWNrUmF0ZUNvbnRyb2xzID0oKT0+e3JldHVybiBwbGF5YmFja1JhdGVDb250cm9sczt9O1xuXG4gICAgdGhhdC5nZXRQbGF5bGlzdCA9KCk9PntyZXR1cm4gcGxheWxpc3Q7fTtcbiAgICB0aGF0LnNldFBsYXlsaXN0ID0ocGxheWxpc3RfICk9PntcbiAgICAgICAgaWYoXy5pc0FycmF5KHBsYXlsaXN0Xykpe1xuICAgICAgICAgICAgcGxheWxpc3QgPSBwbGF5bGlzdF87XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcGxheWxpc3QgPSBbcGxheWxpc3RfXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGxheWxpc3Q7XG4gICAgfTtcblxuICAgIHRoYXQuaXNSZXBlYXQgPSgpPT57cmV0dXJuIHJlcGVhdDt9O1xuXG4gICAgdGhhdC5nZXRTdHJldGNoaW5nID0oKT0+e3JldHVybiBzdHJldGNoaW5nO307XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbmZpZ3VyYXRvcjsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAzLi5cbiAqL1xuXG4vKipcbiAqIEBicmllZiAgIFRoaXMgbW9kdWxlIHByb3ZpZGUgY3VzdG9tIGV2ZW50cy5cbiAqIEBwYXJhbSAgIG9iamVjdCAgICBBbiBvYmplY3QgdGhhdCByZXF1aXJlcyBjdXN0b20gZXZlbnRzLlxuICpcbiAqICovXG5cbmNvbnN0IEV2ZW50RW1pdHRlciA9IGZ1bmN0aW9uKG9iamVjdCl7XG4gICAgbGV0IHRoYXQgPSBvYmplY3Q7XG4gICAgbGV0IF9ldmVudHMgPVtdO1xuXG4gICAgY29uc3QgdHJpZ2dlckV2ZW50cyA9IGZ1bmN0aW9uKGV2ZW50cywgYXJncywgY29udGV4dCl7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgbGV0IGxlbmd0aCA9IGV2ZW50cy5sZW5ndGg7XG4gICAgICAgIGZvcihpID0gMDsgaSA8IGxlbmd0aDsgaSArKyl7XG4gICAgICAgICAgICBsZXQgZXZlbnQgPSBldmVudHNbaV07XG4gICAgICAgICAgICBldmVudC5saXN0ZW5lci5hcHBseSggKCBldmVudC5jb250ZXh0IHx8IGNvbnRleHQgKSwgYXJncyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhhdC5vbiA9IGZ1bmN0aW9uKG5hbWUsIGxpc3RlbmVyLCBjb250ZXh0KXtcbiAgICAgICAgKF9ldmVudHNbbmFtZV0gfHwgKF9ldmVudHNbbmFtZV09W10pICkucHVzaCh7IGxpc3RlbmVyOiBsaXN0ZW5lciAgLCBjb250ZXh0IDogY29udGV4dH0pO1xuICAgICAgICByZXR1cm4gdGhhdDtcbiAgICB9O1xuICAgIHRoYXQudHJpZ2dlciA9IGZ1bmN0aW9uKG5hbWUpe1xuICAgICAgICBpZighX2V2ZW50cyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgY29uc3QgZXZlbnRzID0gX2V2ZW50c1tuYW1lXTtcbiAgICAgICAgY29uc3QgYWxsRXZlbnRzID0gX2V2ZW50cy5hbGw7XG5cbiAgICAgICAgaWYoZXZlbnRzKXtcbiAgICAgICAgICAgIHRyaWdnZXJFdmVudHMoZXZlbnRzLCBhcmdzLCB0aGF0KTtcbiAgICAgICAgfVxuICAgICAgICBpZihhbGxFdmVudHMpe1xuICAgICAgICAgICAgdHJpZ2dlckV2ZW50cyhhbGxFdmVudHMsIGFyZ3VtZW50cywgdGhhdCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQub2ZmID0gZnVuY3Rpb24obmFtZSwgbGlzdGVuZXIsIGNvbnRleHQpe1xuICAgICAgICBpZighX2V2ZW50cyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW5hbWUgJiYgIWxpc3RlbmVyICYmICFjb250ZXh0KSAge1xuICAgICAgICAgICAgX2V2ZW50cyA9IFtdO1xuICAgICAgICAgICAgcmV0dXJuIHRoYXQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuYW1lcyA9IG5hbWUgPyBbbmFtZV0gOiBPYmplY3Qua2V5cyhfZXZlbnRzKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBuYW1lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lc1tpXTtcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50cyA9IF9ldmVudHNbbmFtZV07XG4gICAgICAgICAgICBpZiAoZXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmV0YWluID0gX2V2ZW50c1tuYW1lXSA9IFtdO1xuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lciAgfHwgY29udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMCwgayA9IGV2ZW50cy5sZW5ndGg7IGogPCBrOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gZXZlbnRzW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChsaXN0ZW5lciAmJiBsaXN0ZW5lciAhPT0gZXZlbnQubGlzdGVuZXIgJiYgbGlzdGVuZXIgIT09IGV2ZW50Lmxpc3RlbmVyLmxpc3RlbmVyICAmJiBsaXN0ZW5lciAhPT0gZXZlbnQubGlzdGVuZXIuX2NhbGxiYWNrKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8KGNvbnRleHQgJiYgY29udGV4dCAhPT0gZXZlbnQuY29udGV4dClcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldGFpbi5wdXNoKGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXJldGFpbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIF9ldmVudHNbbmFtZV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGF0O1xuICAgIH07XG4gICAgdGhhdC5vbmNlID0gZnVuY3Rpb24obmFtZSwgbGlzdGVuZXIsIGNvbnRleHQpe1xuICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICBjb25zdCBvbmNlQ2FsbGJhY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChjb3VudCsrKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhhdC5vZmYobmFtZSwgb25jZUNhbGxiYWNrKTtcbiAgICAgICAgICAgIGxpc3RlbmVyLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgICAgIG9uY2VDYWxsYmFjay5fbGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgICAgICAgcmV0dXJuIHRoYXQub24obmFtZSwgb25jZUNhbGxiYWNrLCBjb250ZXh0KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IEV2ZW50RW1pdHRlcjsiLCJpbXBvcnQgXyBmcm9tICd1dGlscy91bmRlcnNjb3JlJztcblxuLyoqXG4gKiBAYnJpZWYgICBUaGlzIGV4ZWN1dGVzIHRoZSBpbnB1dCBjb21tYW5kcyBhdCBhIHNwZWNpZmljIHBvaW50IGluIHRpbWUuXG4gKiBAcGFyYW0gICBpbnN0YW5jZVxuICogQHBhcmFtICAgcXVldWVkQ29tbWFuZHNcbiAqICovXG5jb25zdCBMYXp5Q29tbWFuZEV4ZWN1dG9yID0gZnVuY3Rpb24gKGluc3RhbmNlLCBxdWV1ZWRDb21tYW5kcykge1xuICAgIGxldCBjb21tYW5kUXVldWUgPSBbXTtcbiAgICBsZXQgdW5kZWNvcmF0ZWRNZXRob2RzID0ge307XG4gICAgbGV0IGV4ZWN1dGVNb2RlID0gZmFsc2U7XG4gICAgbGV0IHRoYXQgPSB7fTtcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIGxvYWRlZC5cIik7XG4gICAgcXVldWVkQ29tbWFuZHMuZm9yRWFjaCgoY29tbWFuZCkgPT4ge1xuICAgICAgICBjb25zdCBtZXRob2QgPSBpbnN0YW5jZVtjb21tYW5kXTtcbiAgICAgICAgdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdID0gbWV0aG9kIHx8IGZ1bmN0aW9uKCl7fTtcblxuICAgICAgICBpbnN0YW5jZVtjb21tYW5kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc3QgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgICAgICAgICAgIGlmICghZXhlY3V0ZU1vZGUpIHtcbiAgICAgICAgICAgICAgICAvL2NvbW1hbmRRdWV1ZS5wdXNoKHsgY29tbWFuZCwgYXJncyB9KTtcbiAgICAgICAgICAgICAgICB0aGF0LmFkZFF1ZXVlKGNvbW1hbmQsIGFyZ3MpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGV4ZWN1dGVRdWV1ZWRDb21tYW5kcygpO1xuICAgICAgICAgICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kLmFwcGx5KHRoYXQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KTtcbiAgICB2YXIgZXhlY3V0ZVF1ZXVlZENvbW1hbmRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB3aGlsZSAoY29tbWFuZFF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHsgY29tbWFuZCwgYXJncyB9ID0gY29tbWFuZFF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICAodW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdIHx8IGluc3RhbmNlW2NvbW1hbmRdKS5hcHBseShpbnN0YW5jZSwgYXJncyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGF0LnNldEV4ZWN1dGVNb2RlID0gKG1vZGUpID0+IHtcbiAgICAgICAgZXhlY3V0ZU1vZGUgPSBtb2RlO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogc2V0RXhlY3V0ZU1vZGUoKVwiLCBtb2RlKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0VW5kZWNvcmF0ZWRNZXRob2RzID0gZnVuY3Rpb24oKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGdldFVuZGVjb3JhdGVkTWV0aG9kcygpXCIsIHVuZGVjb3JhdGVkTWV0aG9kcyk7XG4gICAgICAgIHJldHVybiB1bmRlY29yYXRlZE1ldGhvZHM7XG4gICAgfVxuICAgIHRoYXQuZ2V0UXVldWUgPSBmdW5jdGlvbigpe1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZ2V0UXVldWUoKVwiLCBnZXRRdWV1ZSk7XG4gICAgICAgIHJldHVybiBjb21tYW5kUXVldWU7XG4gICAgfVxuICAgIHRoYXQuYWRkUXVldWUgPSBmdW5jdGlvbihjb21tYW5kLCBhcmdzKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGFkZFF1ZXVlKClcIiwgY29tbWFuZCwgYXJncyk7XG4gICAgICAgIGNvbW1hbmRRdWV1ZS5wdXNoKHsgY29tbWFuZCwgYXJncyB9KTtcbiAgICB9XG5cbiAgICB0aGF0LmZsdXNoID0gZnVuY3Rpb24oKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGZsdXNoKClcIik7XG4gICAgICAgIGV4ZWN1dGVRdWV1ZWRDb21tYW5kcygpO1xuICAgIH07XG4gICAgdGhhdC5lbXB0eSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZW1wdHkoKVwiKTtcbiAgICAgICAgY29tbWFuZFF1ZXVlLmxlbmd0aCA9IDA7XG4gICAgfTtcbiAgICB0aGF0Lm9mZiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogb2ZmKClcIik7XG4gICAgICAgIHF1ZXVlZENvbW1hbmRzLmZvckVhY2goKGNvbW1hbmQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1ldGhvZCA9IHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXTtcbiAgICAgICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVtjb21tYW5kXSA9IG1ldGhvZDtcbiAgICAgICAgICAgICAgICBkZWxldGUgdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG5cbiAgICAvL1J1biBvbmNlIGF0IHRoZSBlbmRcbiAgICB0aGF0LnJlbW92ZUFuZEV4Y3V0ZU9uY2UgPSBmdW5jdGlvbihjb21tYW5kXyl7XG4gICAgICAgIGxldCBjb21tYW5kUXVldWVJdGVtID0gXy5maW5kV2hlcmUoY29tbWFuZFF1ZXVlLCB7Y29tbWFuZCA6IGNvbW1hbmRffSk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiByZW1vdmVBbmRFeGN1dGVPbmNlKClcIiwgY29tbWFuZF8pO1xuICAgICAgICBjb21tYW5kUXVldWUuc3BsaWNlKF8uZmluZEluZGV4KGNvbW1hbmRRdWV1ZSwge2NvbW1hbmQgOiBjb21tYW5kX30pLCAxKTtcblxuICAgICAgICBjb25zdCBtZXRob2QgPSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF9dO1xuICAgICAgICBpZiAobWV0aG9kKSB7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJyZW1vdmVDb21tYW5kKClcIik7XG4gICAgICAgICAgICBpZihjb21tYW5kUXVldWVJdGVtKXtcbiAgICAgICAgICAgICAgICAobWV0aG9kfHwgaW5zdGFuY2VbY29tbWFuZF9dKS5hcHBseShpbnN0YW5jZSwgY29tbWFuZFF1ZXVlSXRlbS5hcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluc3RhbmNlW2NvbW1hbmRfXSA9IG1ldGhvZDtcbiAgICAgICAgICAgIGRlbGV0ZSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF9dO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoYXQuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZGVzdHJveSgpXCIpO1xuICAgICAgICB0aGF0Lm9mZigpO1xuICAgICAgICB0aGF0LmVtcHR5KCk7XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTGF6eUNvbW1hbmRFeGVjdXRvcjsiLCJpbXBvcnQge2lzUnRtcCwgaXNXZWJSVEMsIGlzRGFzaH0gZnJvbSBcInV0aWxzL3ZhbGlkYXRvclwiO1xuXG4vKipcbiAqIEBicmllZiAgIFRoaXMgZmluZHMgdGhlIHByb3ZpZGVyIHRoYXQgbWF0Y2hlcyB0aGUgaW5wdXQgc291cmNlLlxuICogQHBhcmFtXG4gKiAqL1xuXG5jb25zdCBTdXBwb3J0Q2hlY2tlciA9IGZ1bmN0aW9uKCl7XG4gICAgY29uc3QgdGhhdCA9IHt9O1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlN1cHBvcnRDaGVja2VyIGxvYWRlZC5cIik7XG4gICAgY29uc3Qgc3VwcG9ydExpc3QgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdodG1sNScsXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBNaW1lVHlwZXMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGFhYzogJ2F1ZGlvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIG1wNDogJ3ZpZGVvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIGY0djogJ3ZpZGVvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIG00djogJ3ZpZGVvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIG1vdjogJ3ZpZGVvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIG1wMzogJ2F1ZGlvL21wZWcnLFxuICAgICAgICAgICAgICAgICAgICBtcGVnOiAnYXVkaW8vbXBlZycsXG4gICAgICAgICAgICAgICAgICAgIG9ndjogJ3ZpZGVvL29nZycsXG4gICAgICAgICAgICAgICAgICAgIG9nZzogJ3ZpZGVvL29nZycsXG4gICAgICAgICAgICAgICAgICAgIG9nYTogJ3ZpZGVvL29nZycsXG4gICAgICAgICAgICAgICAgICAgIHZvcmJpczogJ3ZpZGVvL29nZycsXG4gICAgICAgICAgICAgICAgICAgIHdlYm06ICd2aWRlby93ZWJtJyxcbiAgICAgICAgICAgICAgICAgICAgZjRhOiAndmlkZW8vYWFjJyxcbiAgICAgICAgICAgICAgICAgICAgbTN1ODogJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyxcbiAgICAgICAgICAgICAgICAgICAgbTN1OiAnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnLFxuICAgICAgICAgICAgICAgICAgICBobHM6ICdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCdcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgY29uc3QgdmlkZW8gPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKVxuICAgICAgICAgICAgICAgIH0oKTtcbiAgICAgICAgICAgICAgICBpZiAoIXZpZGVvLmNhblBsYXlUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gc291cmNlLmZpbGU7XG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNvdXJjZS50eXBlO1xuICAgICAgICAgICAgICAgIGlmKCF0eXBlKXtyZXR1cm4gZmFsc2U7fVxuICAgICAgICAgICAgICAgIGNvbnN0IG1pbWVUeXBlID0gc291cmNlLm1pbWVUeXBlIHx8IE1pbWVUeXBlc1t0eXBlXTtcblxuICAgICAgICAgICAgICAgIGlmIChpc1J0bXAoZmlsZSwgdHlwZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKGlzV2ViUlRDKGZpbGUsIHR5cGUpKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghbWltZVR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAhIXZpZGVvLmNhblBsYXlUeXBlKG1pbWVUeXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ3dlYnJ0YycsXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2aWRlbyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpXG4gICAgICAgICAgICAgICAgfSgpO1xuICAgICAgICAgICAgICAgIGlmICghdmlkZW8uY2FuUGxheVR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc291cmNlLnR5cGU7XG5cbiAgICAgICAgICAgICAgICBpZihpc1dlYlJUQyhmaWxlLCB0eXBlKSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnZGFzaCcsXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gc291cmNlLmZpbGU7XG5cbiAgICAgICAgICAgICAgICAvL21wZCBhcHBsaWNhdGlvbi9kYXNoK3htbFxuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcbiAgICAgICAgICAgICAgICBpZiAoaXNEYXNoKGZpbGUsIHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnaGxzJyxcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZpZGVvID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJylcbiAgICAgICAgICAgICAgICB9KCk7XG5cbiAgICAgICAgICAgICAgICAvL3RoaXMgbWV0aG9kIGZyb20gaGxzLmpzXG4gICAgICAgICAgICAgICAgY29uc3QgaXNIbHNTdXBwb3J0ID0gKCkgPT57XG4gICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBnZXRNZWRpYVNvdXJjZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuTWVkaWFTb3VyY2UgfHwgd2luZG93LldlYktpdE1lZGlhU291cmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciBtZWRpYVNvdXJjZSA9IGdldE1lZGlhU291cmNlKCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzb3VyY2VCdWZmZXIgPSB3aW5kb3cuU291cmNlQnVmZmVyIHx8IHdpbmRvdy5XZWJLaXRTb3VyY2VCdWZmZXI7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpc1R5cGVTdXBwb3J0ZWQgPSBtZWRpYVNvdXJjZSAmJiB0eXBlb2YgbWVkaWFTb3VyY2UuaXNUeXBlU3VwcG9ydGVkID09PSAnZnVuY3Rpb24nICYmIG1lZGlhU291cmNlLmlzVHlwZVN1cHBvcnRlZCgndmlkZW8vbXA0OyBjb2RlY3M9XCJhdmMxLjQyRTAxRSxtcDRhLjQwLjJcIicpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIFNvdXJjZUJ1ZmZlciBpcyBleHBvc2VkIGVuc3VyZSBpdHMgQVBJIGlzIHZhbGlkXG4gICAgICAgICAgICAgICAgICAgIC8vIHNhZmFyaSBhbmQgb2xkIHZlcnNpb24gb2YgQ2hyb21lIGRvZSBub3QgZXhwb3NlIFNvdXJjZUJ1ZmZlciBnbG9iYWxseSBzbyBjaGVja2luZyBTb3VyY2VCdWZmZXIucHJvdG90eXBlIGlzIGltcG9zc2libGVcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNvdXJjZUJ1ZmZlclZhbGlkQVBJID0gIXNvdXJjZUJ1ZmZlciB8fCBzb3VyY2VCdWZmZXIucHJvdG90eXBlICYmIHR5cGVvZiBzb3VyY2VCdWZmZXIucHJvdG90eXBlLmFwcGVuZEJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygc291cmNlQnVmZmVyLnByb3RvdHlwZS5yZW1vdmUgPT09ICdmdW5jdGlvbic7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhIWlzVHlwZVN1cHBvcnRlZCAmJiAhIXNvdXJjZUJ1ZmZlclZhbGlkQVBJO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLy9SZW1vdmUgdGhpcyAnISF2aWRlby5jYW5QbGF5VHlwZSgnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnKScgaWYgeW91IHdhbnQgdG8gdXNlIGhsc2pzLlxuICAgICAgICAgICAgICAgIHJldHVybiBpc0hsc1N1cHBvcnQoKSAmJiAhIXZpZGVvLmNhblBsYXlUeXBlKCdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgXTtcblxuICAgIHRoYXQuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlID0gKHNvcnVjZV8pID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU3VwcG9ydENoZWNrZXIgOiBmaW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UoKVwiLCBzb3J1Y2VfKTtcbiAgICAgICAgY29uc3Qgc291cmNlID0gKHNvcnVjZV8gPT09IE9iamVjdChzb3J1Y2VfKSkgPyBzb3J1Y2VfIDoge307XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBzdXBwb3J0TGlzdC5sZW5ndGg7IGkgKyspe1xuICAgICAgICAgICAgaWYoc3VwcG9ydExpc3RbaV0uY2hlY2tTdXBwb3J0KHNvdXJjZSkpe1xuICAgICAgICAgICAgICAgIHJldHVybiBzdXBwb3J0TGlzdFtpXS5uYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LmZpbmRQcm92aWRlck5hbWVzQnlQbGF5bGlzdCA9IChwbGF5bGlzdF8pID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU3VwcG9ydENoZWNrZXIgOiBmaW5kUHJvdmlkZXJOYW1lc0J5UGxheWxpc3QoKVwiLCBwbGF5bGlzdF8pO1xuICAgICAgICBsZXQgc3VwcG9ydE5hbWVzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSBwbGF5bGlzdF8ubGVuZ3RoOyBpLS07KSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gcGxheWxpc3RfW2ldO1xuICAgICAgICAgICAgbGV0IHNvdXJjZSA9IFwiXCI7XG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgaXRlbS5zb3VyY2VzLmxlbmd0aDsgaiArKyl7XG4gICAgICAgICAgICAgICAgc291cmNlID0gaXRlbS5zb3VyY2VzW2pdO1xuICAgICAgICAgICAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3VwcG9ydGVkID0gdGhhdC5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2Uoc291cmNlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1cHBvcnRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VwcG9ydE5hbWVzLnB1c2goc3VwcG9ydGVkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3VwcG9ydE5hbWVzO1xuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTdXBwb3J0Q2hlY2tlcjsiLCIvLyBTVEFURVxuZXhwb3J0IGNvbnN0IFNUQVRFX0JVRkZFUklORyA9ICdidWZmZXJpbmcnO1xuZXhwb3J0IGNvbnN0IFNUQVRFX0lETEUgPSAnaWRsZSc7XG5leHBvcnQgY29uc3QgU1RBVEVfQ09NUExFVEUgPSAnY29tcGxldGUnO1xuZXhwb3J0IGNvbnN0IFNUQVRFX1BBVVNFRCA9ICdwYXVzZWQnO1xuZXhwb3J0IGNvbnN0IFNUQVRFX1BMQVlJTkcgPSAncGxheWluZyc7XG5leHBvcnQgY29uc3QgU1RBVEVfRVJST1IgPSAnZXJyb3InO1xuZXhwb3J0IGNvbnN0IFNUQVRFX0xPQURJTkcgPSAnbG9hZGluZyc7XG5leHBvcnQgY29uc3QgU1RBVEVfU1RBTExFRCA9ICdzdGFsbGVkJztcblxuLy8gUFJPVklERVJcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9IVE1MNSA9ICdodG1sNSc7XG5leHBvcnQgY29uc3QgUFJPVklERVJfV0VCUlRDID0gJ3dlYnJ0Yyc7XG5leHBvcnQgY29uc3QgUFJPVklERVJfREFTSCA9ICdkYXNoJztcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9ITFMgPSAnaGxzJztcblxuLy8gRVZFTlRTXG5leHBvcnQgY29uc3QgQ09OVEVOVF9DT01QTEVURSA9IFNUQVRFX0NPTVBMRVRFO1xuZXhwb3J0IGNvbnN0IFJFQURZID0gJ3JlYWR5JztcbmV4cG9ydCBjb25zdCBERVNUUk9ZID0gJ2Rlc3Ryb3knO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfU0VFSyA9ICdzZWVrJztcbmV4cG9ydCBjb25zdCBDT05URU5UX0JVRkZFUl9GVUxMID0gJ2J1ZmZlckZ1bGwnO1xuZXhwb3J0IGNvbnN0IERJU1BMQVlfQ0xJQ0sgPSAnZGlzcGxheUNsaWNrJztcbmV4cG9ydCBjb25zdCBDT05URU5UX0xPQURFRCA9ICdsb2FkZWQnO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfU0VFS0VEID0gJ3NlZWtlZCc7XG5leHBvcnQgY29uc3QgTkVUV09SS19VTlNUQUJMRSA9ICd1bnN0YWJsZSc7XG5leHBvcnQgY29uc3QgRVJST1IgPSAnZXJyb3InO1xuXG4vLyBTVEFURSBPRiBQTEFZRVJcbmV4cG9ydCBjb25zdCBQTEFZRVJfU1RBVEUgPSAnc3RhdGVDaGFuZ2VkJztcbmV4cG9ydCBjb25zdCBQTEFZRVJfQ09NUExFVEUgPSBTVEFURV9DT01QTEVURTtcbmV4cG9ydCBjb25zdCBQTEFZRVJfUEFVU0UgPSAncGF1c2UnO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9QTEFZID0gJ3BsYXknO1xuXG5leHBvcnQgY29uc3QgQ09OVEVOVF9CVUZGRVIgPSAnYnVmZmVyQ2hhbmdlZCc7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9USU1FID0gJ3RpbWUnO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfUkFURV9DSEFOR0UgPSAncmF0ZWNoYW5nZSc7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9WT0xVTUUgPSAndm9sdW1lQ2hhbmdlZCc7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9NVVRFID0gJ211dGUnO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfTUVUQSA9ICdtZXRhQ2hhbmdlZCc7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9MRVZFTFMgPSAncXVhbGl0eUxldmVsQ2hhbmdlZCc7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9MRVZFTF9DSEFOR0VEID0gJ2N1cnJlbnRRdWFsaXR5TGV2ZWxDaGFuZ2VkJztcbmV4cG9ydCBjb25zdCBQTEFZQkFDS19SQVRFX0NIQU5HRUQgPSAncGxheWJhY2tSYXRlQ2hhbmdlZCc7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VEID0gJ2N1ZUNoYW5nZWQnO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfQ0FQVElPTl9DSEFOR0VEID0gJ2NhcHRpb25DaGFuZ2VkJztcblxuXG5leHBvcnQgY29uc3QgSU5JVF9FUlJPUiA9IDEwMDtcbmV4cG9ydCBjb25zdCBQTEFZRVJfVU5LTldPTl9FUlJPUiA9IDMwMDtcbmV4cG9ydCBjb25zdCBQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IgPSAzMDE7XG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUiA9IDMwMjtcbmV4cG9ydCBjb25zdCBQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IgPSAzMDM7XG5leHBvcnQgY29uc3QgUExBWUVSX0ZJTEVfRVJST1IgPSAzMDQ7XG5leHBvcnQgY29uc3QgUExBWUVSX0NBUFRJT05fRVJST1IgPSAzMDU7XG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19XU19FUlJPUiA9IDUwMTtcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1dTX0NMT1NFRCA9IDUwMjtcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX0FERF9JQ0VDQU5ESURBVEVfRVJST1IgPSA1MDM7XG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19TRVRfUkVNT1RFX0RFU0NfRVJST1IgPSA1MDQ7XG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19DUkVBVEVfQU5TV0VSX0VSUk9SID0gNTA1O1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfU0VUX0xPQ0FMX0RFU0NfRVJST1IgPSA1MDY7XG4iLCIvKipcbiAqIEBicmllZiAgIOuvuOuUlOyWtCDsl5jrpqzrqLztirjrpbwg6rSA66as7ZWY64qUIOqwneyytC4g7ZiE7J6s64qUIO2VmOuKlCDsnbzsnbQg66eO7KeAIOyViuuLpC5cbiAqIEBwYXJhbSAgIHtlbGVtZW50fSAgIGNvbnRhaW5lciAgIGRvbSBlbGVtZW50XG4gKlxuICogKi9cblxuY29uc3QgTWFuYWdlciA9IGZ1bmN0aW9uKGNvbnRhaW5lcil7XG4gICAgY29uc3QgdGhhdCA9IHt9O1xuICAgIGxldCBtZWRpYUVsZW1lbnQgPSBcIlwiO1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIk1lZGlhTWFuYWdlciBsb2FkZWQuXCIpO1xuICAgIGNvbnN0IGNyZWF0ZU1lZGlhRWxlbWVudCA9IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgbWVkaWFFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbiAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGlzYWJsZVJlbW90ZVBsYXliYWNrJywgJycpO1xuICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCd3ZWJraXQtcGxheXNpbmxpbmUnLCAnJyk7XG4gICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3BsYXlzaW5saW5lJywgJycpO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobWVkaWFFbGVtZW50KTtcblxuICAgICAgICByZXR1cm4gbWVkaWFFbGVtZW50O1xuICAgIH07XG5cbiAgICB0aGF0LmNyZWF0ZUVsZW1lbnQgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTWVkaWFNYW5hZ2VyIGNyZWF0ZUVsZW1lbnQoKVwiKTtcbiAgICAgICAgaWYoIW1lZGlhRWxlbWVudCl7XG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlTWVkaWFFbGVtZW50KCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgY29udGFpbmVyLnJlbW92ZUNoaWxkKG1lZGlhRWxlbWVudCk7XG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlTWVkaWFFbGVtZW50KCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBNYW5hZ2VyOyIsImltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XG5pbXBvcnQge2lzUnRtcCwgaXNXZWJSVEMsIGlzRGFzaCB9IGZyb20gXCJ1dGlscy92YWxpZGF0b3JcIjtcbmltcG9ydCB7ZXh0cmFjdEV4dGVuc2lvbiAsdHJpbX0gZnJvbSBcIi4uLy4uL3V0aWxzL3N0cmluZ3NcIjtcbmltcG9ydCBTdXBwb3J0Q2hlY2tlciBmcm9tIFwiLi4vU3VwcG9ydENoZWNrZXJcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBUaGlzIG1hbmFnZXMgUGxheWxpc3Qgb3IgU291cmNlcy5cbiAqIEBwYXJhbVxuICpcbiAqICovXG5jb25zdCBNYW5hZ2VyID0gZnVuY3Rpb24oKXtcbiAgICBjb25zdCB0aGF0ID0ge307XG4gICAgbGV0IGN1cnJlbnRQbGF5bGlzdCA9IFtdO1xuICAgIGxldCBzYyA9IFN1cHBvcnRDaGVja2VyKCk7XG5cbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQbGF5bGlzdE1hbmFnZXIgbG9hZGVkLlwiKTtcblxuICAgIGNvbnN0IG1ha2VQcmV0dHlTb3VyY2UgPSBmdW5jdGlvbihzb3VyY2VfKXtcbiAgICAgICAgaWYgKCFzb3VyY2VfIHx8ICFzb3VyY2VfLmZpbGUgJiYgIShzb3VyY2VfLmhvc3QgfHwgc291cmNlXy5hcHBsaWNhdGlvbiB8fCBzb3VyY2VfLnN0cmVhbSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzb3VyY2UgPSBPYmplY3QuYXNzaWduKHt9LCB7ICdkZWZhdWx0JzogZmFsc2UgfSwgc291cmNlXyk7XG4gICAgICAgIHNvdXJjZS5maWxlID0gdHJpbSgnJyArIHNvdXJjZS5maWxlKTtcblxuICAgICAgICBpZihzb3VyY2UuaG9zdCAmJiBzb3VyY2UuYXBwbGljYXRpb24gJiYgc291cmNlLnN0cmVhbSl7XG4gICAgICAgICAgICBzb3VyY2UuZmlsZSA9IHNvdXJjZS5ob3N0ICsgXCIvXCIgKyBzb3VyY2UuYXBwbGljYXRpb24gKyBcIi9zdHJlYW0vXCIgKyBzb3VyY2Uuc3RyZWFtO1xuICAgICAgICAgICAgZGVsZXRlIHNvdXJjZS5ob3N0O1xuICAgICAgICAgICAgZGVsZXRlIHNvdXJjZS5hcHBsaWNhdGlvbjtcbiAgICAgICAgICAgIGRlbGV0ZSBzb3VyY2Uuc3RyZWFtO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbWltZXR5cGVSZWdFeCA9IC9eW14vXStcXC8oPzp4LSk/KFteL10rKSQvO1xuXG4gICAgICAgIGlmIChtaW1ldHlwZVJlZ0V4LnRlc3Qoc291cmNlLnR5cGUpKSB7XG4gICAgICAgICAgICAvLyBpZiB0eXBlIGlzIGdpdmVuIGFzIGEgbWltZXR5cGVcbiAgICAgICAgICAgIHNvdXJjZS5taW1lVHlwZSA9IHNvdXJjZS50eXBlO1xuICAgICAgICAgICAgc291cmNlLnR5cGUgPSBzb3VyY2UudHlwZS5yZXBsYWNlKG1pbWV0eXBlUmVnRXgsICckMScpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoaXNSdG1wKHNvdXJjZS5maWxlKSl7XG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdydG1wJztcbiAgICAgICAgfWVsc2UgaWYoaXNXZWJSVEMoc291cmNlLmZpbGUpKXtcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ3dlYnJ0Yyc7XG4gICAgICAgIH1lbHNlIGlmKGlzRGFzaChzb3VyY2UuZmlsZSwgc291cmNlLnR5cGUpKXtcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ2Rhc2gnO1xuICAgICAgICB9ZWxzZSBpZiAoIXNvdXJjZS50eXBlKSB7XG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9IGV4dHJhY3RFeHRlbnNpb24oc291cmNlLmZpbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFzb3VyY2UudHlwZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbm9ybWFsaXplIHR5cGVzXG4gICAgICAgIHN3aXRjaCAoc291cmNlLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ20zdTgnOlxuICAgICAgICAgICAgY2FzZSAndm5kLmFwcGxlLm1wZWd1cmwnOlxuICAgICAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ2hscyc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdtNGEnOlxuICAgICAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ2FhYyc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdzbWlsJzpcbiAgICAgICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdydG1wJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgaWYgKHNvdXJjZVtrZXldID09PSAnJykge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBzb3VyY2Vba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNvdXJjZTtcblxuICAgIH1cblxuICAgIHRoYXQuc2V0UGxheWxpc3QgPShwbGF5bGlzdCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBzZXRQbGF5bGlzdCgpIFwiLCBwbGF5bGlzdCk7XG4gICAgICAgIGNvbnN0IHByZXR0aWVkUGxheWxpc3QgPSAoXy5pc0FycmF5KHBsYXlsaXN0KSA/IHBsYXlsaXN0IDogW3BsYXlsaXN0XSkubWFwKGZ1bmN0aW9uKGl0ZW0pe1xuICAgICAgICAgICAgaWYoIV8uaXNBcnJheShpdGVtLnRyYWNrcykpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgaXRlbS50cmFja3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgcGxheWxpc3RJdGVtID0gT2JqZWN0LmFzc2lnbih7fSx7XG4gICAgICAgICAgICAgICAgc291cmNlczogW10sXG4gICAgICAgICAgICAgICAgdHJhY2tzOiBbXVxuICAgICAgICAgICAgfSwgaXRlbSApO1xuXG4gICAgICAgICAgICBpZigocGxheWxpc3RJdGVtLnNvdXJjZXMgPT09IE9iamVjdChwbGF5bGlzdEl0ZW0uc291cmNlcykpICYmICFfLmlzQXJyYXkocGxheWxpc3RJdGVtLnNvdXJjZXMpKSB7XG4gICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBbbWFrZVByZXR0eVNvdXJjZShwbGF5bGlzdEl0ZW0uc291cmNlcyldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZighXy5pc0FycmF5KHBsYXlsaXN0SXRlbS5zb3VyY2VzKSB8fCBwbGF5bGlzdEl0ZW0uc291cmNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5sZXZlbHMpIHtcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBpdGVtLmxldmVscztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IFttYWtlUHJldHR5U291cmNlKGl0ZW0pXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHBsYXlsaXN0SXRlbS5zb3VyY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNvdXJjZSA9IHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBwcmV0dHlTb3VyY2UgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGlmICghc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBkZWZhdWx0U291cmNlID0gc291cmNlLmRlZmF1bHQ7XG4gICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRTb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlLmRlZmF1bHQgPSAoZGVmYXVsdFNvdXJjZS50b1N0cmluZygpID09PSAndHJ1ZScpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZS5kZWZhdWx0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHNvdXJjZSBkb2Vzbid0IGhhdmUgYSBsYWJlbCwgbnVtYmVyIGl0XG4gICAgICAgICAgICAgICAgaWYgKCFwbGF5bGlzdEl0ZW0uc291cmNlc1tpXS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXS5sYWJlbCA9IGkudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBwcmV0dHlTb3VyY2UgPSBtYWtlUHJldHR5U291cmNlKHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldKTtcbiAgICAgICAgICAgICAgICBpZihzYy5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UocHJldHR5U291cmNlKSl7XG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldID0gcHJldHR5U291cmNlO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXSA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IHBsYXlsaXN0SXRlbS5zb3VyY2VzLmZpbHRlcihzb3VyY2UgPT4gISFzb3VyY2UpO1xuXG4gICAgICAgICAgICAvLyBkZWZhdWx0IOqwgCDsl4bsnYTrlYwgd2VicnRj6rCAIOyeiOuLpOuptCB3ZWJydGMgZGVmYXVsdCA6IHRydWXroZwg7J6Q64+ZIOyEpOyglVxuICAgICAgICAgICAgLypsZXQgaGF2ZURlZmF1bHQgPSBfLmZpbmQocGxheWxpc3RJdGVtLnNvdXJjZXMsIGZ1bmN0aW9uKHNvdXJjZSl7cmV0dXJuIHNvdXJjZS5kZWZhdWx0ID09IHRydWU7fSk7XG4gICAgICAgICAgICBsZXQgd2VicnRjU291cmNlID0gW107XG4gICAgICAgICAgICBpZighaGF2ZURlZmF1bHQpe1xuICAgICAgICAgICAgICAgIHdlYnJ0Y1NvdXJjZSA9IF8uZmluZChwbGF5bGlzdEl0ZW0uc291cmNlcywgZnVuY3Rpb24oc291cmNlKXtyZXR1cm4gc291cmNlLnR5cGUgPT0gXCJ3ZWJydGNcIjt9KTtcbiAgICAgICAgICAgICAgICBpZih3ZWJydGNTb3VyY2Upe1xuICAgICAgICAgICAgICAgICAgICB3ZWJydGNTb3VyY2UuZGVmYXVsdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSovXG5cblxuXG4gICAgICAgICAgICBpZighXy5pc0FycmF5KHBsYXlsaXN0SXRlbS50cmFja3MpKXtcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0udHJhY2tzID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihfLmlzQXJyYXkocGxheWxpc3RJdGVtLmNhcHRpb25zKSl7XG4gICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnRyYWNrcyA9IHBsYXlsaXN0SXRlbS50cmFja3MuY29uY2F0KHBsYXlsaXN0SXRlbS5jYXB0aW9ucyk7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHBsYXlsaXN0SXRlbS5jYXB0aW9ucztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcGxheWxpc3RJdGVtLnRyYWNrcyA9IHBsYXlsaXN0SXRlbS50cmFja3MubWFwKGZ1bmN0aW9uKHRyYWNrKXtcbiAgICAgICAgICAgICAgICBpZighdHJhY2sgfHwgIXRyYWNrLmZpbGUpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB7XG4gICAgICAgICAgICAgICAgICAgICdraW5kJzogJ2NhcHRpb25zJyxcbiAgICAgICAgICAgICAgICAgICAgJ2RlZmF1bHQnOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sIHRyYWNrKTtcbiAgICAgICAgICAgIH0pLmZpbHRlcih0cmFjayA9PiAhIXRyYWNrKTtcblxuICAgICAgICAgICAgcmV0dXJuIHBsYXlsaXN0SXRlbTtcbiAgICAgICAgfSk7XG4gICAgICAgIGN1cnJlbnRQbGF5bGlzdCA9IHByZXR0aWVkUGxheWxpc3Q7XG4gICAgICAgIHJldHVybiBwcmV0dGllZFBsYXlsaXN0O1xuICAgIH07XG4gICAgdGhhdC5nZXRQbGF5bGlzdCA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIGdldFBsYXlsaXN0KCkgXCIsIGN1cnJlbnRQbGF5bGlzdCk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UGxheWxpc3Q7XG4gICAgfTtcbiAgICB0aGF0LmdldEN1cnJlbnRTb3VyY2VzID0gKCkgPT4ge1xuICAgICAgICAvL1dlIGRvIG5vdCBzdXBwb3J0IFwiUExBWUxJU1RcIiBub3QgeWV0LiBTbyB0aGlzIHJldHVybnMgcGxheWxpc3Qgb2YgMC5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIGdldEN1cnJlbnRTb3VyY2VzKCkgXCIsIGN1cnJlbnRQbGF5bGlzdFswXS5zb3VyY2VzKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQbGF5bGlzdFswXS5zb3VyY2VzO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgTWFuYWdlcjsiLCJpbXBvcnQgU3VwcG9ydENoZWNrZXIgZnJvbSBcImFwaS9TdXBwb3J0Q2hlY2tlclwiO1xuaW1wb3J0IFByb21pc2UsIHtyZXNvbHZlZH0gZnJvbSBcImFwaS9zaGltcy9wcm9taXNlXCI7XG5cbi8qKlxuICogQGJyaWVmICAgVGhpcyBtYW5hZ2VzIHByb3ZpZGVyLlxuICogQHBhcmFtXG4gKiAqL1xuY29uc3QgQ29udHJvbGxlciA9IGZ1bmN0aW9uKCl7XG4gICAgbGV0IHNjID0gU3VwcG9ydENoZWNrZXIoKTtcbiAgICBjb25zdCBQcm92aWRlcnMgPSB7fTtcblxuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgbG9hZGVkLlwiKTtcblxuICAgIGNvbnN0IHJlZ2lzdGVyUHJvdmlkZXIgPSAobmFtZSwgcHJvdmlkZXIpID0+e1xuICAgICAgICBpZihQcm92aWRlcnNbbmFtZV0pe1xuICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgfVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgX3JlZ2lzdGVyUHJvdmlkZXIoKSBcIiwgbmFtZSk7XG4gICAgICAgIFByb3ZpZGVyc1tuYW1lXSA9IHByb3ZpZGVyO1xuICAgIH07XG5cbiAgICBjb25zdCBQcm92aWRlckxvYWRlciA9e1xuICAgICAgICBodG1sNTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvaHRtbDUvSHRtbDUnXSwgZnVuY3Rpb24ocmVxdWlyZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci9odG1sNS9IdG1sNScpLmRlZmF1bHQ7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVyUHJvdmlkZXIoXCJodG1sNVwiLCBwcm92aWRlcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm92aWRlcjtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcbiAgICAgICAgICAgICAgICB9LCdvdmVucGxheWVyLnByb3ZpZGVyLmh0bWw1J1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgd2VicnRjIDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci93ZWJydGMvV2ViUlRDJ10sIGZ1bmN0aW9uKHJlcXVpcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvd2VicnRjL1dlYlJUQycpLmRlZmF1bHQ7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVyUHJvdmlkZXIoXCJ3ZWJydGNcIiwgcHJvdmlkZXIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvdmlkZXI7XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XG4gICAgICAgICAgICAgICAgfSwnb3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcidcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIGRhc2ggOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2Rhc2gvRGFzaCddLCBmdW5jdGlvbihyZXF1aXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2Rhc2gvRGFzaCcpLmRlZmF1bHQ7XG4gICAgICAgICAgICAgICAgICAgIFByb3ZpZGVyc1tcImRhc2hcIl0gPSBwcm92aWRlcjtcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZXJQcm92aWRlcihcImRhc2hcIiwgcHJvdmlkZXIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvdmlkZXI7XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XG4gICAgICAgICAgICAgICAgfSwnb3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXInXG4gICAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICBobHMgOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2hscy9IbHMnXSwgZnVuY3Rpb24ocmVxdWlyZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci9obHMvSGxzJykuZGVmYXVsdDtcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZXJQcm92aWRlcihcImhsc1wiLCBwcm92aWRlcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm92aWRlcjtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcbiAgICAgICAgICAgICAgICB9LCdvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhhdC5sb2FkUHJvdmlkZXJzID0gKHBsYXlsaXN0KSA9PntcbiAgICAgICAgY29uc3Qgc3VwcG9ydGVkUHJvdmlkZXJOYW1lcyA9IHNjLmZpbmRQcm92aWRlck5hbWVzQnlQbGF5bGlzdChwbGF5bGlzdCk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBsb2FkUHJvdmlkZXJzKCkgXCIsIHN1cHBvcnRlZFByb3ZpZGVyTmFtZXMpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoXG4gICAgICAgICAgICBzdXBwb3J0ZWRQcm92aWRlck5hbWVzLmZpbHRlcihmdW5jdGlvbihwcm92aWRlck5hbWUpe1xuICAgICAgICAgICAgICAgIHJldHVybiAhIVByb3ZpZGVyTG9hZGVyW3Byb3ZpZGVyTmFtZV07XG4gICAgICAgICAgICB9KS5tYXAoZnVuY3Rpb24ocHJvdmlkZXJOYW1lKXtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IFByb3ZpZGVyTG9hZGVyW3Byb3ZpZGVyTmFtZV0oKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvdmlkZXI7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH07XG5cbiAgICB0aGF0LmZpbmRCeU5hbWUgPSAobmFtZSkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgZmluZEJ5TmFtZSgpIFwiLCBuYW1lKTtcbiAgICAgICAgcmV0dXJuIFByb3ZpZGVyc1tuYW1lXTtcbiAgICB9O1xuXG4gICAgdGhhdC5nZXRQcm92aWRlckJ5U291cmNlID0gKHNvdXJjZSkgPT4ge1xuICAgICAgICBjb25zdCBzdXBwb3J0ZWRQcm92aWRlck5hbWUgPSBzYy5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2Uoc291cmNlKTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGdldFByb3ZpZGVyQnlTb3VyY2UoKSBcIiwgc3VwcG9ydGVkUHJvdmlkZXJOYW1lKTtcbiAgICAgICAgcmV0dXJuIHRoYXQuZmluZEJ5TmFtZShzdXBwb3J0ZWRQcm92aWRlck5hbWUpO1xuICAgIH07XG5cbiAgICB0aGF0LmlzU2FtZVByb3ZpZGVyID0gKGN1cnJlbnRTb3VyY2UsIG5ld1NvdXJjZSkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgaXNTYW1lUHJvdmlkZXIoKSBcIiwgc2MuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKGN1cnJlbnRTb3VyY2UpICwgc2MuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKG5ld1NvdXJjZSkgKTtcbiAgICAgICAgcmV0dXJuIHNjLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShjdXJyZW50U291cmNlKSA9PSBzYy5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UobmV3U291cmNlKTtcblxuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbnRyb2xsZXI7IiwiLy8gICAgICBQcm9taXNlIFBvbHlmaWxsXG4vLyAgICAgIGh0dHBzOi8vZ2l0aHViLmNvbS90YXlsb3JoYWtlcy9wcm9taXNlLXBvbHlmaWxsXG4vLyAgICAgIENvcHlyaWdodCAoYykgMjAxNCBUYXlsb3IgSGFrZXNcbi8vICAgICAgQ29weXJpZ2h0IChjKSAyMDE0IEZvcmJlcyBMaW5kZXNheVxuLy8gICAgICB0YXlsb3JoYWtlcy9wcm9taXNlLXBvbHlmaWxsIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZVxuXG5jb25zdCBwcm9taXNlRmluYWxseSA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgdmFyIGNvbnN0cnVjdG9yID0gdGhpcy5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gdGhpcy50aGVuKFxuICAgICAgICBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnN0cnVjdG9yLnJlc29sdmUoY2FsbGJhY2soKSkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICAgICAgICByZXR1cm4gY29uc3RydWN0b3IucmVzb2x2ZShjYWxsYmFjaygpKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb25zdHJ1Y3Rvci5yZWplY3QocmVhc29uKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgKTtcbn07XG5cbi8vIFN0b3JlIHNldFRpbWVvdXQgcmVmZXJlbmNlIHNvIHByb21pc2UtcG9seWZpbGwgd2lsbCBiZSB1bmFmZmVjdGVkIGJ5XG4vLyBvdGhlciBjb2RlIG1vZGlmeWluZyBzZXRUaW1lb3V0IChsaWtlIHNpbm9uLnVzZUZha2VUaW1lcnMoKSlcbmNvbnN0IHNldFRpbWVvdXRGdW5jID0gd2luZG93LnNldFRpbWVvdXQ7XG5jb25zdCBzZXRJbW1lZGlhdGVGdW5jID0gd2luZG93LnNldEltbWVkaWF0ZTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbi8vIFBvbHlmaWxsIGZvciBGdW5jdGlvbi5wcm90b3R5cGUuYmluZFxuZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgZm4uYXBwbHkodGhpc0FyZywgYXJndW1lbnRzKTtcbiAgICB9O1xufVxuXG5jb25zdCBQcm9taXNlU2hpbSA9IGZ1bmN0aW9uIChmbikge1xuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBQcm9taXNlKSlcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUHJvbWlzZXMgbXVzdCBiZSBjb25zdHJ1Y3RlZCB2aWEgbmV3Jyk7XG4gICAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykgdGhyb3cgbmV3IFR5cGVFcnJvcignbm90IGEgZnVuY3Rpb24nKTtcbiAgICB0aGlzLl9zdGF0ZSA9IDA7XG4gICAgdGhpcy5faGFuZGxlZCA9IGZhbHNlO1xuICAgIHRoaXMuX3ZhbHVlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2RlZmVycmVkcyA9IFtdO1xuXG4gICAgZG9SZXNvbHZlKGZuLCB0aGlzKTtcbn1cblxuY29uc3QgaGFuZGxlID0gZnVuY3Rpb24gKHNlbGYsIGRlZmVycmVkKSB7XG4gICAgd2hpbGUgKHNlbGYuX3N0YXRlID09PSAzKSB7XG4gICAgICAgIHNlbGYgPSBzZWxmLl92YWx1ZTtcbiAgICB9XG4gICAgaWYgKHNlbGYuX3N0YXRlID09PSAwKSB7XG4gICAgICAgIHNlbGYuX2RlZmVycmVkcy5wdXNoKGRlZmVycmVkKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZWxmLl9oYW5kbGVkID0gdHJ1ZTtcbiAgICBQcm9taXNlLl9pbW1lZGlhdGVGbihmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNiID0gc2VsZi5fc3RhdGUgPT09IDEgPyBkZWZlcnJlZC5vbkZ1bGZpbGxlZCA6IGRlZmVycmVkLm9uUmVqZWN0ZWQ7XG4gICAgICAgIGlmIChjYiA9PT0gbnVsbCkge1xuICAgICAgICAgICAgKHNlbGYuX3N0YXRlID09PSAxID8gcmVzb2x2ZSA6IHJlamVjdCkoZGVmZXJyZWQucHJvbWlzZSwgc2VsZi5fdmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXQgPSBjYihzZWxmLl92YWx1ZSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJlamVjdChkZWZlcnJlZC5wcm9taXNlLCBlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKGRlZmVycmVkLnByb21pc2UsIHJldCk7XG4gICAgfSk7XG59XG5cbmNvbnN0IHJlc29sdmUgPSBmdW5jdGlvbiAoc2VsZiwgbmV3VmFsdWUpIHtcbiAgICB0cnkge1xuICAgICAgICAvLyBQcm9taXNlIFJlc29sdXRpb24gUHJvY2VkdXJlOiBodHRwczovL2dpdGh1Yi5jb20vcHJvbWlzZXMtYXBsdXMvcHJvbWlzZXMtc3BlYyN0aGUtcHJvbWlzZS1yZXNvbHV0aW9uLXByb2NlZHVyZVxuICAgICAgICBpZiAobmV3VmFsdWUgPT09IHNlbGYpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBIHByb21pc2UgY2Fubm90IGJlIHJlc29sdmVkIHdpdGggaXRzZWxmLicpO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICBuZXdWYWx1ZSAmJlxuICAgICAgICAgICAgKHR5cGVvZiBuZXdWYWx1ZSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIG5ld1ZhbHVlID09PSAnZnVuY3Rpb24nKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHZhciB0aGVuID0gbmV3VmFsdWUudGhlbjtcbiAgICAgICAgICAgIGlmIChuZXdWYWx1ZSBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgICAgICBzZWxmLl9zdGF0ZSA9IDM7XG4gICAgICAgICAgICAgICAgc2VsZi5fdmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgICAgICBmaW5hbGUoc2VsZik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGRvUmVzb2x2ZShiaW5kKHRoZW4sIG5ld1ZhbHVlKSwgc2VsZik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHNlbGYuX3N0YXRlID0gMTtcbiAgICAgICAgc2VsZi5fdmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgZmluYWxlKHNlbGYpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmVqZWN0KHNlbGYsIGUpO1xuICAgIH1cbn1cblxuY29uc3QgcmVqZWN0ID1mdW5jdGlvbiAoc2VsZiwgbmV3VmFsdWUpIHtcbiAgICBzZWxmLl9zdGF0ZSA9IDI7XG4gICAgc2VsZi5fdmFsdWUgPSBuZXdWYWx1ZTtcbiAgICBmaW5hbGUoc2VsZik7XG59XG5cbmNvbnN0IGZpbmFsZSA9IGZ1bmN0aW9uIChzZWxmKSB7XG4gICAgaWYgKHNlbGYuX3N0YXRlID09PSAyICYmIHNlbGYuX2RlZmVycmVkcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgUHJvbWlzZS5faW1tZWRpYXRlRm4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoIXNlbGYuX2hhbmRsZWQpIHtcbiAgICAgICAgICAgICAgICBQcm9taXNlLl91bmhhbmRsZWRSZWplY3Rpb25GbihzZWxmLl92YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBzZWxmLl9kZWZlcnJlZHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaGFuZGxlKHNlbGYsIHNlbGYuX2RlZmVycmVkc1tpXSk7XG4gICAgfVxuICAgIHNlbGYuX2RlZmVycmVkcyA9IG51bGw7XG59XG5cbmNvbnN0IEhhbmRsZXIgPSBmdW5jdGlvbiAob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQsIHByb21pc2UpIHtcbiAgICB0aGlzLm9uRnVsZmlsbGVkID0gdHlwZW9mIG9uRnVsZmlsbGVkID09PSAnZnVuY3Rpb24nID8gb25GdWxmaWxsZWQgOiBudWxsO1xuICAgIHRoaXMub25SZWplY3RlZCA9IHR5cGVvZiBvblJlamVjdGVkID09PSAnZnVuY3Rpb24nID8gb25SZWplY3RlZCA6IG51bGw7XG4gICAgdGhpcy5wcm9taXNlID0gcHJvbWlzZTtcbn1cblxuLyoqXG4gKiBUYWtlIGEgcG90ZW50aWFsbHkgbWlzYmVoYXZpbmcgcmVzb2x2ZXIgZnVuY3Rpb24gYW5kIG1ha2Ugc3VyZVxuICogb25GdWxmaWxsZWQgYW5kIG9uUmVqZWN0ZWQgYXJlIG9ubHkgY2FsbGVkIG9uY2UuXG4gKlxuICogTWFrZXMgbm8gZ3VhcmFudGVlcyBhYm91dCBhc3luY2hyb255LlxuICovXG5jb25zdCBkb1Jlc29sdmUgPSBmdW5jdGlvbiAoZm4sIHNlbGYpIHtcbiAgICB2YXIgZG9uZSA9IGZhbHNlO1xuICAgIHRyeSB7XG4gICAgICAgIGZuKFxuICAgICAgICAgICAgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZG9uZSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoc2VsZiwgdmFsdWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uKHJlYXNvbikge1xuICAgICAgICAgICAgICAgIGlmIChkb25lKSByZXR1cm47XG4gICAgICAgICAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmVqZWN0KHNlbGYsIHJlYXNvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgaWYgKGRvbmUpIHJldHVybjtcbiAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgICAgIHJlamVjdChzZWxmLCBleCk7XG4gICAgfVxufVxuXG5Qcm9taXNlU2hpbS5wcm90b3R5cGVbJ2NhdGNoJ10gPSBmdW5jdGlvbihvblJlamVjdGVkKSB7XG4gICAgcmV0dXJuIHRoaXMudGhlbihudWxsLCBvblJlamVjdGVkKTtcbn07XG5cblByb21pc2VTaGltLnByb3RvdHlwZS50aGVuID0gZnVuY3Rpb24ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpIHtcbiAgICB2YXIgcHJvbSA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKG5vb3ApO1xuXG4gICAgaGFuZGxlKHRoaXMsIG5ldyBIYW5kbGVyKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkLCBwcm9tKSk7XG4gICAgcmV0dXJuIHByb207XG59O1xuXG5Qcm9taXNlU2hpbS5wcm90b3R5cGVbJ2ZpbmFsbHknXSA9IHByb21pc2VGaW5hbGx5O1xuXG5Qcm9taXNlU2hpbS5hbGwgPSBmdW5jdGlvbihhcnIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGlmICghYXJyIHx8IHR5cGVvZiBhcnIubGVuZ3RoID09PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Byb21pc2UuYWxsIGFjY2VwdHMgYW4gYXJyYXknKTtcbiAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcnIpO1xuICAgICAgICBpZiAoYXJncy5sZW5ndGggPT09IDApIHJldHVybiByZXNvbHZlKFtdKTtcbiAgICAgICAgdmFyIHJlbWFpbmluZyA9IGFyZ3MubGVuZ3RoO1xuXG4gICAgICAgIGZ1bmN0aW9uIHJlcyhpLCB2YWwpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbCAmJiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoZW4gPSB2YWwudGhlbjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGVuLmNhbGwoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMoaSwgdmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhcmdzW2ldID0gdmFsO1xuICAgICAgICAgICAgICAgIGlmICgtLXJlbWFpbmluZyA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGFyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmVzKGksIGFyZ3NbaV0pO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5Qcm9taXNlU2hpbS5yZXNvbHZlID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gUHJvbWlzZSkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG4gICAgfSk7XG59O1xuXG5Qcm9taXNlU2hpbS5yZWplY3QgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgcmVqZWN0KHZhbHVlKTtcbiAgICB9KTtcbn07XG5cblByb21pc2VTaGltLnJhY2UgPSBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB2YWx1ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIHZhbHVlc1tpXS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbi8vIFVzZSBwb2x5ZmlsbCBmb3Igc2V0SW1tZWRpYXRlIGZvciBwZXJmb3JtYW5jZSBnYWluc1xuUHJvbWlzZVNoaW0uX2ltbWVkaWF0ZUZuID1cbiAgICAodHlwZW9mIHNldEltbWVkaWF0ZUZ1bmMgPT09ICdmdW5jdGlvbicgJiZcbiAgICBmdW5jdGlvbihmbikge1xuICAgICAgICBzZXRJbW1lZGlhdGVGdW5jKGZuKTtcbiAgICB9KSB8fFxuICAgIGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgIHNldEltbWVkaWF0ZUZ1bmMoZm4sIDApO1xuICAgIH07XG5cblByb21pc2VTaGltLl91bmhhbmRsZWRSZWplY3Rpb25GbiA9IGZ1bmN0aW9uIF91bmhhbmRsZWRSZWplY3Rpb25GbihlcnIpIHtcbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIGNvbnNvbGUpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdQb3NzaWJsZSBVbmhhbmRsZWQgUHJvbWlzZSBSZWplY3Rpb246JywgZXJyKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgfVxufTtcblxuY29uc3QgUHJvbWlzZSA9IHdpbmRvdy5Qcm9taXNlIHx8ICh3aW5kb3cuUHJvbWlzZSA9IFByb21pc2VTaGltKTtcblxuZXhwb3J0IGNvbnN0IHJlc29sdmVkID0gUHJvbWlzZS5yZXNvbHZlKCk7XG5cbmV4cG9ydCBkZWZhdWx0IFByb21pc2U7IiwiaW1wb3J0IEFQSSBmcm9tICdhcGkvQXBpJztcbmltcG9ydCB7aXNXZWJSVEN9IGZyb20gJ3V0aWxzL3ZhbGlkYXRvcic7XG5pbXBvcnQgXyBmcm9tICd1dGlscy91bmRlcnNjb3JlJztcbmltcG9ydCB7Z2V0U2NyaXB0UGF0aH0gZnJvbSAndXRpbHMvd2VicGFjayc7XG5cblxuX193ZWJwYWNrX3B1YmxpY19wYXRoX18gPSBnZXRTY3JpcHRQYXRoKCdvdmVucGxheWVyLnNkay5qcycpO1xuXG4vKipcbiAqIE1haW4gT3ZlblBsYXllclNESyBvYmplY3RcbiAqL1xuY29uc3QgT3ZlblBsYXllclNESyA9IHdpbmRvdy5PdmVuUGxheWVyU0RLID0ge307XG5cbmNvbnN0IHZlcnNpb24gPSAnMC4wLjEnO1xuXG5jb25zdCBwbGF5ZXJMaXN0ID0gT3ZlblBsYXllclNESy5wbGF5ZXJMaXN0ID0gW107XG5cbmV4cG9ydCBjb25zdCBjaGVja0FuZEdldENvbnRhaW5lckVsZW1lbnQgPSBmdW5jdGlvbihjb250YWluZXIpIHtcblxuICAgIGlmICghY29udGFpbmVyKSB7XG5cbiAgICAgICAgLy8gVE9ETyhyb2NrKTogU2hvdWxkIGNhdXNlIGFuIGVycm9yLlxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBsZXQgY29udGFpbmVyRWxlbWVudCA9IG51bGw7XG5cbiAgICBpZiAodHlwZW9mIGNvbnRhaW5lciA9PT0gJ3N0cmluZycpIHtcblxuICAgICAgICBjb250YWluZXJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29udGFpbmVyKTtcbiAgICB9IGVsc2UgaWYgKGNvbnRhaW5lci5ub2RlVHlwZSkge1xuXG4gICAgICAgIGNvbnRhaW5lckVsZW1lbnQgPSBjb250YWluZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVE9ETyhyb2NrKTogU2hvdWxkIGNhdXNlIGFuIGVycm9yLlxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gY29udGFpbmVyRWxlbWVudDtcbn1cblxuLyoqXG4gKiBDcmVhdGUgcGxheWVyIGluc3RhbmNlIGFuZCByZXR1cm4gaXQuXG4gKlxuICogQHBhcmFtICAgICAge3N0cmluZyB8IGRvbSBlbGVtZW50fSBjb250YWluZXIgIElkIG9mIGNvbnRhaW5lciBlbGVtZW50IG9yIGNvbnRhaW5lciBlbGVtZW50XG4gKiBAcGFyYW0gICAgICB7b2JqZWN0fSBvcHRpb25zICBUaGUgb3B0aW9uc1xuICovXG5PdmVuUGxheWVyU0RLLmNyZWF0ZSA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgb3B0aW9ucykge1xuXG4gICAgbGV0IGNvbnRhaW5lckVsZW1lbnQgPSBjaGVja0FuZEdldENvbnRhaW5lckVsZW1lbnQoY29udGFpbmVyKTtcblxuICAgIGNvbnN0IHBsYXllckluc3RhbmNlID0gQVBJKGNvbnRhaW5lckVsZW1lbnQpO1xuICAgIHBsYXllckluc3RhbmNlLmluaXQob3B0aW9ucyk7XG5cbiAgICBwbGF5ZXJMaXN0LnB1c2gocGxheWVySW5zdGFuY2UpO1xuXG4gICAgcmV0dXJuIHBsYXllckluc3RhbmNlO1xufTtcblxuLyoqXG4gKiBHZXRzIHRoZSBwbGF5ZXIgaW5zdGFuY2UgbGlzdC5cbiAqXG4gKiBAcmV0dXJuICAgICB7YXJyYXl9ICBUaGUgcGxheWVyIGxpc3QuXG4gKi9cbk92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyTGlzdCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgcmV0dXJuIHBsYXllckxpc3Q7XG59O1xuXG4vKipcbiAqIEdldHMgdGhlIHBsYXllciBpbnN0YW5jZSBieSBjb250YWluZXIgaWQuXG4gKlxuICogQHBhcmFtICAgICAge3N0cmluZ30gIGNvbnRhaW5lcklkICBUaGUgY29udGFpbmVyIGlkZW50aWZpZXJcbiAqIEByZXR1cm4gICAgIHtvYmVqZWN0IHwgbnVsbH0gIFRoZSBwbGF5ZXIgaW5zdGFuY2UuXG4gKi9cbk92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyQnlDb250YWluZXJJZCA9IGZ1bmN0aW9uKGNvbnRhaW5lcklkKSB7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXllckxpc3QubGVuZ3RoIC0xOyBpICsrKSB7XG5cbiAgICAgICAgaWYgKHBsYXllckxpc3RbaV0uY29udGFpbmVySWQgPT09IGNvbnRhaW5lcklkKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBwbGF5ZXJMaXN0W2ldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG59O1xuXG4vKipcbiAqIEdldHMgdGhlIHBsYXllciBpbnN0YW5jZSBieSBpbmRleC5cbiAqXG4gKiBAcGFyYW0gICAgICB7bnVtYmVyfSAgaW5kZXggICBUaGUgaW5kZXhcbiAqIEByZXR1cm4gICAgIHtvYmplY3QgfCBudWxsfSAgVGhlIHBsYXllciBpbnN0YW5jZS5cbiAqL1xuT3ZlblBsYXllclNESy5nZXRQbGF5ZXJCeUluZGV4ID0gZnVuY3Rpb24oaW5kZXgpIHtcblxuICAgIGNvbnN0IHBsYXllckluc3RhbmNlID0gcGxheWVyTGlzdFtpbmRleF07XG5cbiAgICBpZiAocGxheWVySW5zdGFuY2UpIHtcblxuICAgICAgICByZXR1cm4gcGxheWVySW5zdGFuY2U7XG4gICAgfSBlbHNlIHtcblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlIHdlYnJ0YyBzb3VyY2UgZm9yIHBsYXllciBzb3VyY2UgdHlwZS5cbiAqXG4gKiBAcGFyYW0gICAgICB7T2JqZWN0IHwgQXJyYXl9ICBzb3VyY2UgICB3ZWJydGMgc291cmNlXG4gKiBAcmV0dXJuICAgICB7QXJyYXl9ICBQbGF5ZXIgc291cmNlIE9iZWpjdC5cbiAqL1xuT3ZlblBsYXllclNESy5nZW5lcmF0ZVdlYnJ0Y1VybHMgPSBmdW5jdGlvbihzb3VyY2VzKSB7XG4gICAgcmV0dXJuIChfLmlzQXJyYXkoc291cmNlcykgPyBzb3VyY2VzIDogW3NvdXJjZXNdKS5tYXAoZnVuY3Rpb24oc291cmNlLCBpbmRleCl7XG4gICAgICAgIGlmKHNvdXJjZS5ob3N0ICYmIGlzV2ViUlRDKHNvdXJjZS5ob3N0KSAmJiBzb3VyY2UuYXBwbGljYXRpb24gJiYgc291cmNlLnN0cmVhbSl7XG4gICAgICAgICAgICByZXR1cm4ge2ZpbGUgOiBzb3VyY2UuaG9zdCArIFwiL1wiICsgc291cmNlLmFwcGxpY2F0aW9uICsgXCIvXCIgKyBzb3VyY2Uuc3RyZWFtLCB0eXBlIDogXCJ3ZWJydGNcIiwgbGFiZWwgOiBzb3VyY2UubGFiZWwgPyBzb3VyY2UubGFiZWwgOiBcIndlYnJ0Yy1cIisoaW5kZXgrMSkgfTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgT3ZlblBsYXllclNESzsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA1LiAyNC4uXG4gKi9cblxuY29uc3QgbG9nZ2VyID0gZnVuY3Rpb24oKXtcbiAgICBjb25zdCB0aGF0ID0ge307XG4gICAgbGV0IHByZXZDb25zb2xlTG9nID0gbnVsbDtcblxuICAgIHdpbmRvdy5PdmVuUGxheWVyQ29uc29sZSA9IHtsb2cgOiB3aW5kb3dbJ2NvbnNvbGUnXVsnbG9nJ119O1xuXG4gICAgdGhhdC5lbmFibGUgPSAoKSA9PntcbiAgICAgICAgaWYocHJldkNvbnNvbGVMb2cgPT0gbnVsbCl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGVbJ2xvZyddID0gcHJldkNvbnNvbGVMb2c7XG4gICAgfTtcbiAgICB0aGF0LmRpc2FibGUgPSAoKSA9PntcbiAgICAgICAgcHJldkNvbnNvbGVMb2cgPSBjb25zb2xlLmxvZztcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGVbJ2xvZyddID0gZnVuY3Rpb24oKXt9O1xuICAgIH07XG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XG4gICAgICAgIHdpbmRvdy5PdmVuUGxheWVyQ29uc29sZSA9IG51bGw7XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCBsb2dnZXI7IiwiaW1wb3J0IF8gZnJvbSAnLi91bmRlcnNjb3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIHRyaW0oc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG59XG5cbi8qKlxuICogZXh0cmFjdEV4dGVuc2lvblxuICpcbiAqIEBwYXJhbSAgICAgIHtzdHJpbmd9IHBhdGggZm9yIHVybFxuICogQHJldHVybiAgICAge3N0cmluZ30gIEV4dGVuc2lvblxuICovXG5leHBvcnQgY29uc3QgZXh0cmFjdEV4dGVuc2lvbiA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgICBpZighcGF0aCB8fCBwYXRoLnN1YnN0cigwLDQpPT0ncnRtcCcpIHtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldEF6dXJlRmlsZUZvcm1hdChwYXRoKSB7XG4gICAgICAgIGxldCBleHRlbnNpb24gPSBcIlwiO1xuICAgICAgICBpZiAoKC9bKCxdZm9ybWF0PW1wZC0vaSkudGVzdChwYXRoKSkge1xuICAgICAgICAgICAgZXh0ZW5zaW9uID0gJ21wZCc7XG4gICAgICAgIH1lbHNlIGlmICgoL1soLF1mb3JtYXQ9bTN1OC0vaSkudGVzdChwYXRoKSkge1xuICAgICAgICAgICAgZXh0ZW5zaW9uID0gJ20zdTgnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBleHRlbnNpb247XG4gICAgfVxuXG4gICAgbGV0IGF6dXJlZEZvcm1hdCA9IGdldEF6dXJlRmlsZUZvcm1hdChwYXRoKTtcbiAgICBpZihhenVyZWRGb3JtYXQpIHtcbiAgICAgICAgcmV0dXJuIGF6dXJlZEZvcm1hdDtcbiAgICB9XG4gICAgcGF0aCA9IHBhdGguc3BsaXQoJz8nKVswXS5zcGxpdCgnIycpWzBdO1xuICAgIGlmKHBhdGgubGFzdEluZGV4T2YoJy4nKSA+IC0xKSB7XG4gICAgICAgIHJldHVybiBwYXRoLnN1YnN0cihwYXRoLmxhc3RJbmRleE9mKCcuJykgKyAxLCBwYXRoLmxlbmd0aCkudG9Mb3dlckNhc2UoKTtcbiAgICB9ZWxzZXtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxufTtcblxuXG4vKipcbiAqIG5hdHVyYWxIbXNcbiAqXG4gKiBAcGFyYW0gICAgICB7bnVtYmVyIHwgc3RyaW5nfSAgc2Vjb25kICBUaGUgc2Vjb25kXG4gKiBAcmV0dXJuICAgICB7c3RyaW5nfSAgZm9ybWF0dGVkIFN0cmluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gbmF0dXJhbEhtcyhzZWNvbmQpIHtcbiAgICBsZXQgc2VjTnVtID0gcGFyc2VJbnQoc2Vjb25kLCAxMCk7XG4gICAgbGV0IGhvdXJzICAgPSBNYXRoLmZsb29yKHNlY051bSAvIDM2MDApO1xuICAgIGxldCBtaW51dGVzID0gTWF0aC5mbG9vcigoc2VjTnVtIC0gKGhvdXJzICogMzYwMCkpIC8gNjApO1xuICAgIGxldCBzZWNvbmRzID0gc2VjTnVtIC0gKGhvdXJzICogMzYwMCkgLSAobWludXRlcyAqIDYwKTtcblxuICAgIGlmIChob3VycyA+IDApIHttaW51dGVzID0gXCIwXCIrbWludXRlczt9XG4gICAgaWYgKHNlY29uZHMgPCAxMCkge3NlY29uZHMgPSBcIjBcIitzZWNvbmRzO31cblxuICAgIGlmIChob3VycyA+IDApIHtcbiAgICAgICAgcmV0dXJuIGhvdXJzKyc6JyttaW51dGVzKyc6JytzZWNvbmRzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBtaW51dGVzKyc6JytzZWNvbmRzO1xuICAgIH1cbn0iLCJcbi8vICAgICBVbmRlcnNjb3JlLmpzIDEuOS4wXG4vLyAgICAgaHR0cDovL3VuZGVyc2NvcmVqcy5vcmdcbi8vICAgICAoYykgMjAwOS0yMDE4IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4vLyAgICAgVW5kZXJzY29yZSBtYXkgYmUgZnJlZWx5IGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cblxuXG4gIC8vIEJhc2VsaW5lIHNldHVwXG4gIC8vIC0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gRXN0YWJsaXNoIHRoZSByb290IG9iamVjdCwgYHdpbmRvd2AgKGBzZWxmYCkgaW4gdGhlIGJyb3dzZXIsIGBnbG9iYWxgXG4gIC8vIG9uIHRoZSBzZXJ2ZXIsIG9yIGB0aGlzYCBpbiBzb21lIHZpcnR1YWwgbWFjaGluZXMuIFdlIHVzZSBgc2VsZmBcbiAgLy8gaW5zdGVhZCBvZiBgd2luZG93YCBmb3IgYFdlYldvcmtlcmAgc3VwcG9ydC5cbiAgdmFyIHJvb3QgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmLnNlbGYgPT09IHNlbGYgJiYgc2VsZiB8fFxuICAgICAgICAgICAgdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwuZ2xvYmFsID09PSBnbG9iYWwgJiYgZ2xvYmFsIHx8XG4gICAgICAgICAgICB0aGlzIHx8XG4gICAgICAgICAgICB7fTtcblxuICAvLyBTYXZlIHRoZSBwcmV2aW91cyB2YWx1ZSBvZiB0aGUgYF9gIHZhcmlhYmxlLlxuICB2YXIgcHJldmlvdXNVbmRlcnNjb3JlID0gcm9vdC5fO1xuXG4gIC8vIFNhdmUgYnl0ZXMgaW4gdGhlIG1pbmlmaWVkIChidXQgbm90IGd6aXBwZWQpIHZlcnNpb246XG4gIHZhciBBcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlLCBPYmpQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG4gIHZhciBTeW1ib2xQcm90byA9IHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnID8gU3ltYm9sLnByb3RvdHlwZSA6IG51bGw7XG5cbiAgLy8gQ3JlYXRlIHF1aWNrIHJlZmVyZW5jZSB2YXJpYWJsZXMgZm9yIHNwZWVkIGFjY2VzcyB0byBjb3JlIHByb3RvdHlwZXMuXG4gIHZhciBwdXNoID0gQXJyYXlQcm90by5wdXNoLFxuICAgICAgc2xpY2UgPSBBcnJheVByb3RvLnNsaWNlLFxuICAgICAgdG9TdHJpbmcgPSBPYmpQcm90by50b1N0cmluZyxcbiAgICAgIGhhc093blByb3BlcnR5ID0gT2JqUHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbiAgLy8gQWxsICoqRUNNQVNjcmlwdCA1KiogbmF0aXZlIGZ1bmN0aW9uIGltcGxlbWVudGF0aW9ucyB0aGF0IHdlIGhvcGUgdG8gdXNlXG4gIC8vIGFyZSBkZWNsYXJlZCBoZXJlLlxuICB2YXIgbmF0aXZlSXNBcnJheSA9IEFycmF5LmlzQXJyYXksXG4gICAgICBuYXRpdmVLZXlzID0gT2JqZWN0LmtleXMsXG4gICAgICBuYXRpdmVDcmVhdGUgPSBPYmplY3QuY3JlYXRlO1xuXG4gIC8vIE5ha2VkIGZ1bmN0aW9uIHJlZmVyZW5jZSBmb3Igc3Vycm9nYXRlLXByb3RvdHlwZS1zd2FwcGluZy5cbiAgdmFyIEN0b3IgPSBmdW5jdGlvbigpe307XG5cbiAgLy8gQ3JlYXRlIGEgc2FmZSByZWZlcmVuY2UgdG8gdGhlIFVuZGVyc2NvcmUgb2JqZWN0IGZvciB1c2UgYmVsb3cuXG4gIHZhciBfID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mIF8pIHJldHVybiBvYmo7XG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIF8pKSByZXR1cm4gbmV3IF8ob2JqKTtcbiAgICB0aGlzLl93cmFwcGVkID0gb2JqO1xuICB9O1xuXG4gIC8vIEV4cG9ydCB0aGUgVW5kZXJzY29yZSBvYmplY3QgZm9yICoqTm9kZS5qcyoqLCB3aXRoXG4gIC8vIGJhY2t3YXJkcy1jb21wYXRpYmlsaXR5IGZvciB0aGVpciBvbGQgbW9kdWxlIEFQSS4gSWYgd2UncmUgaW5cbiAgLy8gdGhlIGJyb3dzZXIsIGFkZCBgX2AgYXMgYSBnbG9iYWwgb2JqZWN0LlxuICAvLyAoYG5vZGVUeXBlYCBpcyBjaGVja2VkIHRvIGVuc3VyZSB0aGF0IGBtb2R1bGVgXG4gIC8vIGFuZCBgZXhwb3J0c2AgYXJlIG5vdCBIVE1MIGVsZW1lbnRzLilcbiAgaWYgKHR5cGVvZiBleHBvcnRzICE9ICd1bmRlZmluZWQnICYmICFleHBvcnRzLm5vZGVUeXBlKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgIT0gJ3VuZGVmaW5lZCcgJiYgIW1vZHVsZS5ub2RlVHlwZSAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgICAgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gXztcbiAgICB9XG4gICAgZXhwb3J0cy5fID0gXztcbiAgfSBlbHNlIHtcbiAgICByb290Ll8gPSBfO1xuICB9XG5cbiAgLy8gQ3VycmVudCB2ZXJzaW9uLlxuICBfLlZFUlNJT04gPSAnMS45LjAnO1xuXG4gIC8vIEludGVybmFsIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhbiBlZmZpY2llbnQgKGZvciBjdXJyZW50IGVuZ2luZXMpIHZlcnNpb25cbiAgLy8gb2YgdGhlIHBhc3NlZC1pbiBjYWxsYmFjaywgdG8gYmUgcmVwZWF0ZWRseSBhcHBsaWVkIGluIG90aGVyIFVuZGVyc2NvcmVcbiAgLy8gZnVuY3Rpb25zLlxuICB2YXIgb3B0aW1pemVDYiA9IGZ1bmN0aW9uKGZ1bmMsIGNvbnRleHQsIGFyZ0NvdW50KSB7XG4gICAgaWYgKGNvbnRleHQgPT09IHZvaWQgMCkgcmV0dXJuIGZ1bmM7XG4gICAgc3dpdGNoIChhcmdDb3VudCA9PSBudWxsID8gMyA6IGFyZ0NvdW50KSB7XG4gICAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICByZXR1cm4gZnVuYy5jYWxsKGNvbnRleHQsIHZhbHVlKTtcbiAgICAgIH07XG4gICAgICAvLyBUaGUgMi1hcmd1bWVudCBjYXNlIGlzIG9taXR0ZWQgYmVjYXVzZSB3ZeKAmXJlIG5vdCB1c2luZyBpdC5cbiAgICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikge1xuICAgICAgICByZXR1cm4gZnVuYy5jYWxsKGNvbnRleHQsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbik7XG4gICAgICB9O1xuICAgICAgY2FzZSA0OiByZXR1cm4gZnVuY3Rpb24oYWNjdW11bGF0b3IsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikge1xuICAgICAgICByZXR1cm4gZnVuYy5jYWxsKGNvbnRleHQsIGFjY3VtdWxhdG9yLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pO1xuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9O1xuXG4gIHZhciBidWlsdGluSXRlcmF0ZWU7XG5cbiAgLy8gQW4gaW50ZXJuYWwgZnVuY3Rpb24gdG8gZ2VuZXJhdGUgY2FsbGJhY2tzIHRoYXQgY2FuIGJlIGFwcGxpZWQgdG8gZWFjaFxuICAvLyBlbGVtZW50IGluIGEgY29sbGVjdGlvbiwgcmV0dXJuaW5nIHRoZSBkZXNpcmVkIHJlc3VsdCDigJQgZWl0aGVyIGBpZGVudGl0eWAsXG4gIC8vIGFuIGFyYml0cmFyeSBjYWxsYmFjaywgYSBwcm9wZXJ0eSBtYXRjaGVyLCBvciBhIHByb3BlcnR5IGFjY2Vzc29yLlxuICB2YXIgY2IgPSBmdW5jdGlvbih2YWx1ZSwgY29udGV4dCwgYXJnQ291bnQpIHtcbiAgICBpZiAoXy5pdGVyYXRlZSAhPT0gYnVpbHRpbkl0ZXJhdGVlKSByZXR1cm4gXy5pdGVyYXRlZSh2YWx1ZSwgY29udGV4dCk7XG4gICAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiBfLmlkZW50aXR5O1xuICAgIGlmIChfLmlzRnVuY3Rpb24odmFsdWUpKSByZXR1cm4gb3B0aW1pemVDYih2YWx1ZSwgY29udGV4dCwgYXJnQ291bnQpO1xuICAgIGlmIChfLmlzT2JqZWN0KHZhbHVlKSAmJiAhXy5pc0FycmF5KHZhbHVlKSkgcmV0dXJuIF8ubWF0Y2hlcih2YWx1ZSk7XG4gICAgcmV0dXJuIF8ucHJvcGVydHkodmFsdWUpO1xuICB9O1xuXG4gIC8vIEV4dGVybmFsIHdyYXBwZXIgZm9yIG91ciBjYWxsYmFjayBnZW5lcmF0b3IuIFVzZXJzIG1heSBjdXN0b21pemVcbiAgLy8gYF8uaXRlcmF0ZWVgIGlmIHRoZXkgd2FudCBhZGRpdGlvbmFsIHByZWRpY2F0ZS9pdGVyYXRlZSBzaG9ydGhhbmQgc3R5bGVzLlxuICAvLyBUaGlzIGFic3RyYWN0aW9uIGhpZGVzIHRoZSBpbnRlcm5hbC1vbmx5IGFyZ0NvdW50IGFyZ3VtZW50LlxuICBfLml0ZXJhdGVlID0gYnVpbHRpbkl0ZXJhdGVlID0gZnVuY3Rpb24odmFsdWUsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gY2IodmFsdWUsIGNvbnRleHQsIEluZmluaXR5KTtcbiAgfTtcblxuICAvLyBTb21lIGZ1bmN0aW9ucyB0YWtlIGEgdmFyaWFibGUgbnVtYmVyIG9mIGFyZ3VtZW50cywgb3IgYSBmZXcgZXhwZWN0ZWRcbiAgLy8gYXJndW1lbnRzIGF0IHRoZSBiZWdpbm5pbmcgYW5kIHRoZW4gYSB2YXJpYWJsZSBudW1iZXIgb2YgdmFsdWVzIHRvIG9wZXJhdGVcbiAgLy8gb24uIFRoaXMgaGVscGVyIGFjY3VtdWxhdGVzIGFsbCByZW1haW5pbmcgYXJndW1lbnRzIHBhc3QgdGhlIGZ1bmN0aW9u4oCZc1xuICAvLyBhcmd1bWVudCBsZW5ndGggKG9yIGFuIGV4cGxpY2l0IGBzdGFydEluZGV4YCksIGludG8gYW4gYXJyYXkgdGhhdCBiZWNvbWVzXG4gIC8vIHRoZSBsYXN0IGFyZ3VtZW50LiBTaW1pbGFyIHRvIEVTNuKAmXMgXCJyZXN0IHBhcmFtZXRlclwiLlxuICB2YXIgcmVzdEFyZ3VtZW50cyA9IGZ1bmN0aW9uKGZ1bmMsIHN0YXJ0SW5kZXgpIHtcbiAgICBzdGFydEluZGV4ID0gc3RhcnRJbmRleCA9PSBudWxsID8gZnVuYy5sZW5ndGggLSAxIDogK3N0YXJ0SW5kZXg7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGxlbmd0aCA9IE1hdGgubWF4KGFyZ3VtZW50cy5sZW5ndGggLSBzdGFydEluZGV4LCAwKSxcbiAgICAgICAgICByZXN0ID0gQXJyYXkobGVuZ3RoKSxcbiAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICBmb3IgKDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgcmVzdFtpbmRleF0gPSBhcmd1bWVudHNbaW5kZXggKyBzdGFydEluZGV4XTtcbiAgICAgIH1cbiAgICAgIHN3aXRjaCAoc3RhcnRJbmRleCkge1xuICAgICAgICBjYXNlIDA6IHJldHVybiBmdW5jLmNhbGwodGhpcywgcmVzdCk7XG4gICAgICAgIGNhc2UgMTogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzLCBhcmd1bWVudHNbMF0sIHJlc3QpO1xuICAgICAgICBjYXNlIDI6IHJldHVybiBmdW5jLmNhbGwodGhpcywgYXJndW1lbnRzWzBdLCBhcmd1bWVudHNbMV0sIHJlc3QpO1xuICAgICAgfVxuICAgICAgdmFyIGFyZ3MgPSBBcnJheShzdGFydEluZGV4ICsgMSk7XG4gICAgICBmb3IgKGluZGV4ID0gMDsgaW5kZXggPCBzdGFydEluZGV4OyBpbmRleCsrKSB7XG4gICAgICAgIGFyZ3NbaW5kZXhdID0gYXJndW1lbnRzW2luZGV4XTtcbiAgICAgIH1cbiAgICAgIGFyZ3Nbc3RhcnRJbmRleF0gPSByZXN0O1xuICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfTtcbiAgfTtcblxuICAvLyBBbiBpbnRlcm5hbCBmdW5jdGlvbiBmb3IgY3JlYXRpbmcgYSBuZXcgb2JqZWN0IHRoYXQgaW5oZXJpdHMgZnJvbSBhbm90aGVyLlxuICB2YXIgYmFzZUNyZWF0ZSA9IGZ1bmN0aW9uKHByb3RvdHlwZSkge1xuICAgIGlmICghXy5pc09iamVjdChwcm90b3R5cGUpKSByZXR1cm4ge307XG4gICAgaWYgKG5hdGl2ZUNyZWF0ZSkgcmV0dXJuIG5hdGl2ZUNyZWF0ZShwcm90b3R5cGUpO1xuICAgIEN0b3IucHJvdG90eXBlID0gcHJvdG90eXBlO1xuICAgIHZhciByZXN1bHQgPSBuZXcgQ3RvcjtcbiAgICBDdG9yLnByb3RvdHlwZSA9IG51bGw7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICB2YXIgc2hhbGxvd1Byb3BlcnR5ID0gZnVuY3Rpb24oa2V5KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiA9PSBudWxsID8gdm9pZCAwIDogb2JqW2tleV07XG4gICAgfTtcbiAgfTtcblxuICB2YXIgZGVlcEdldCA9IGZ1bmN0aW9uKG9iaiwgcGF0aCkge1xuICAgIHZhciBsZW5ndGggPSBwYXRoLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAob2JqID09IG51bGwpIHJldHVybiB2b2lkIDA7XG4gICAgICBvYmogPSBvYmpbcGF0aFtpXV07XG4gICAgfVxuICAgIHJldHVybiBsZW5ndGggPyBvYmogOiB2b2lkIDA7XG4gIH07XG5cbiAgLy8gSGVscGVyIGZvciBjb2xsZWN0aW9uIG1ldGhvZHMgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgYSBjb2xsZWN0aW9uXG4gIC8vIHNob3VsZCBiZSBpdGVyYXRlZCBhcyBhbiBhcnJheSBvciBhcyBhbiBvYmplY3QuXG4gIC8vIFJlbGF0ZWQ6IGh0dHA6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLXRvbGVuZ3RoXG4gIC8vIEF2b2lkcyBhIHZlcnkgbmFzdHkgaU9TIDggSklUIGJ1ZyBvbiBBUk0tNjQuICMyMDk0XG4gIHZhciBNQVhfQVJSQVlfSU5ERVggPSBNYXRoLnBvdygyLCA1MykgLSAxO1xuICB2YXIgZ2V0TGVuZ3RoID0gc2hhbGxvd1Byb3BlcnR5KCdsZW5ndGgnKTtcbiAgdmFyIGlzQXJyYXlMaWtlID0gZnVuY3Rpb24oY29sbGVjdGlvbikge1xuICAgIHZhciBsZW5ndGggPSBnZXRMZW5ndGgoY29sbGVjdGlvbik7XG4gICAgcmV0dXJuIHR5cGVvZiBsZW5ndGggPT0gJ251bWJlcicgJiYgbGVuZ3RoID49IDAgJiYgbGVuZ3RoIDw9IE1BWF9BUlJBWV9JTkRFWDtcbiAgfTtcblxuICAvLyBDb2xsZWN0aW9uIEZ1bmN0aW9uc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIFRoZSBjb3JuZXJzdG9uZSwgYW4gYGVhY2hgIGltcGxlbWVudGF0aW9uLCBha2EgYGZvckVhY2hgLlxuICAvLyBIYW5kbGVzIHJhdyBvYmplY3RzIGluIGFkZGl0aW9uIHRvIGFycmF5LWxpa2VzLiBUcmVhdHMgYWxsXG4gIC8vIHNwYXJzZSBhcnJheS1saWtlcyBhcyBpZiB0aGV5IHdlcmUgZGVuc2UuXG4gIF8uZWFjaCA9IF8uZm9yRWFjaCA9IGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICBpdGVyYXRlZSA9IG9wdGltaXplQ2IoaXRlcmF0ZWUsIGNvbnRleHQpO1xuICAgIHZhciBpLCBsZW5ndGg7XG4gICAgaWYgKGlzQXJyYXlMaWtlKG9iaikpIHtcbiAgICAgIGZvciAoaSA9IDAsIGxlbmd0aCA9IG9iai5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpdGVyYXRlZShvYmpbaV0sIGksIG9iaik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBrZXlzID0gXy5rZXlzKG9iaik7XG4gICAgICBmb3IgKGkgPSAwLCBsZW5ndGggPSBrZXlzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGl0ZXJhdGVlKG9ialtrZXlzW2ldXSwga2V5c1tpXSwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfTtcblxuICAvLyBSZXR1cm4gdGhlIHJlc3VsdHMgb2YgYXBwbHlpbmcgdGhlIGl0ZXJhdGVlIHRvIGVhY2ggZWxlbWVudC5cbiAgXy5tYXAgPSBfLmNvbGxlY3QgPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgaXRlcmF0ZWUgPSBjYihpdGVyYXRlZSwgY29udGV4dCk7XG4gICAgdmFyIGtleXMgPSAhaXNBcnJheUxpa2Uob2JqKSAmJiBfLmtleXMob2JqKSxcbiAgICAgICAgbGVuZ3RoID0gKGtleXMgfHwgb2JqKS5sZW5ndGgsXG4gICAgICAgIHJlc3VsdHMgPSBBcnJheShsZW5ndGgpO1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHZhciBjdXJyZW50S2V5ID0ga2V5cyA/IGtleXNbaW5kZXhdIDogaW5kZXg7XG4gICAgICByZXN1bHRzW2luZGV4XSA9IGl0ZXJhdGVlKG9ialtjdXJyZW50S2V5XSwgY3VycmVudEtleSwgb2JqKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH07XG5cbiAgLy8gQ3JlYXRlIGEgcmVkdWNpbmcgZnVuY3Rpb24gaXRlcmF0aW5nIGxlZnQgb3IgcmlnaHQuXG4gIHZhciBjcmVhdGVSZWR1Y2UgPSBmdW5jdGlvbihkaXIpIHtcbiAgICAvLyBXcmFwIGNvZGUgdGhhdCByZWFzc2lnbnMgYXJndW1lbnQgdmFyaWFibGVzIGluIGEgc2VwYXJhdGUgZnVuY3Rpb24gdGhhblxuICAgIC8vIHRoZSBvbmUgdGhhdCBhY2Nlc3NlcyBgYXJndW1lbnRzLmxlbmd0aGAgdG8gYXZvaWQgYSBwZXJmIGhpdC4gKCMxOTkxKVxuICAgIHZhciByZWR1Y2VyID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgbWVtbywgaW5pdGlhbCkge1xuICAgICAgdmFyIGtleXMgPSAhaXNBcnJheUxpa2Uob2JqKSAmJiBfLmtleXMob2JqKSxcbiAgICAgICAgICBsZW5ndGggPSAoa2V5cyB8fCBvYmopLmxlbmd0aCxcbiAgICAgICAgICBpbmRleCA9IGRpciA+IDAgPyAwIDogbGVuZ3RoIC0gMTtcbiAgICAgIGlmICghaW5pdGlhbCkge1xuICAgICAgICBtZW1vID0gb2JqW2tleXMgPyBrZXlzW2luZGV4XSA6IGluZGV4XTtcbiAgICAgICAgaW5kZXggKz0gZGlyO1xuICAgICAgfVxuICAgICAgZm9yICg7IGluZGV4ID49IDAgJiYgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IGRpcikge1xuICAgICAgICB2YXIgY3VycmVudEtleSA9IGtleXMgPyBrZXlzW2luZGV4XSA6IGluZGV4O1xuICAgICAgICBtZW1vID0gaXRlcmF0ZWUobWVtbywgb2JqW2N1cnJlbnRLZXldLCBjdXJyZW50S2V5LCBvYmopO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG1lbW87XG4gICAgfTtcblxuICAgIHJldHVybiBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBtZW1vLCBjb250ZXh0KSB7XG4gICAgICB2YXIgaW5pdGlhbCA9IGFyZ3VtZW50cy5sZW5ndGggPj0gMztcbiAgICAgIHJldHVybiByZWR1Y2VyKG9iaiwgb3B0aW1pemVDYihpdGVyYXRlZSwgY29udGV4dCwgNCksIG1lbW8sIGluaXRpYWwpO1xuICAgIH07XG4gIH07XG5cbiAgLy8gKipSZWR1Y2UqKiBidWlsZHMgdXAgYSBzaW5nbGUgcmVzdWx0IGZyb20gYSBsaXN0IG9mIHZhbHVlcywgYWthIGBpbmplY3RgLFxuICAvLyBvciBgZm9sZGxgLlxuICBfLnJlZHVjZSA9IF8uZm9sZGwgPSBfLmluamVjdCA9IGNyZWF0ZVJlZHVjZSgxKTtcblxuICAvLyBUaGUgcmlnaHQtYXNzb2NpYXRpdmUgdmVyc2lvbiBvZiByZWR1Y2UsIGFsc28ga25vd24gYXMgYGZvbGRyYC5cbiAgXy5yZWR1Y2VSaWdodCA9IF8uZm9sZHIgPSBjcmVhdGVSZWR1Y2UoLTEpO1xuXG4gIC8vIFJldHVybiB0aGUgZmlyc3QgdmFsdWUgd2hpY2ggcGFzc2VzIGEgdHJ1dGggdGVzdC4gQWxpYXNlZCBhcyBgZGV0ZWN0YC5cbiAgXy5maW5kID0gXy5kZXRlY3QgPSBmdW5jdGlvbihvYmosIHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBrZXlGaW5kZXIgPSBpc0FycmF5TGlrZShvYmopID8gXy5maW5kSW5kZXggOiBfLmZpbmRLZXk7XG4gICAgdmFyIGtleSA9IGtleUZpbmRlcihvYmosIHByZWRpY2F0ZSwgY29udGV4dCk7XG4gICAgaWYgKGtleSAhPT0gdm9pZCAwICYmIGtleSAhPT0gLTEpIHJldHVybiBvYmpba2V5XTtcbiAgfTtcblxuICAvLyBSZXR1cm4gYWxsIHRoZSBlbGVtZW50cyB0aGF0IHBhc3MgYSB0cnV0aCB0ZXN0LlxuICAvLyBBbGlhc2VkIGFzIGBzZWxlY3RgLlxuICBfLmZpbHRlciA9IF8uc2VsZWN0ID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgIHByZWRpY2F0ZSA9IGNiKHByZWRpY2F0ZSwgY29udGV4dCk7XG4gICAgXy5lYWNoKG9iaiwgZnVuY3Rpb24odmFsdWUsIGluZGV4LCBsaXN0KSB7XG4gICAgICBpZiAocHJlZGljYXRlKHZhbHVlLCBpbmRleCwgbGlzdCkpIHJlc3VsdHMucHVzaCh2YWx1ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH07XG5cbiAgLy8gUmV0dXJuIGFsbCB0aGUgZWxlbWVudHMgZm9yIHdoaWNoIGEgdHJ1dGggdGVzdCBmYWlscy5cbiAgXy5yZWplY3QgPSBmdW5jdGlvbihvYmosIHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHJldHVybiBfLmZpbHRlcihvYmosIF8ubmVnYXRlKGNiKHByZWRpY2F0ZSkpLCBjb250ZXh0KTtcbiAgfTtcblxuICAvLyBEZXRlcm1pbmUgd2hldGhlciBhbGwgb2YgdGhlIGVsZW1lbnRzIG1hdGNoIGEgdHJ1dGggdGVzdC5cbiAgLy8gQWxpYXNlZCBhcyBgYWxsYC5cbiAgXy5ldmVyeSA9IF8uYWxsID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICBwcmVkaWNhdGUgPSBjYihwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgIHZhciBrZXlzID0gIWlzQXJyYXlMaWtlKG9iaikgJiYgXy5rZXlzKG9iaiksXG4gICAgICAgIGxlbmd0aCA9IChrZXlzIHx8IG9iaikubGVuZ3RoO1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHZhciBjdXJyZW50S2V5ID0ga2V5cyA/IGtleXNbaW5kZXhdIDogaW5kZXg7XG4gICAgICBpZiAoIXByZWRpY2F0ZShvYmpbY3VycmVudEtleV0sIGN1cnJlbnRLZXksIG9iaikpIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgLy8gRGV0ZXJtaW5lIGlmIGF0IGxlYXN0IG9uZSBlbGVtZW50IGluIHRoZSBvYmplY3QgbWF0Y2hlcyBhIHRydXRoIHRlc3QuXG4gIC8vIEFsaWFzZWQgYXMgYGFueWAuXG4gIF8uc29tZSA9IF8uYW55ID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICBwcmVkaWNhdGUgPSBjYihwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgIHZhciBrZXlzID0gIWlzQXJyYXlMaWtlKG9iaikgJiYgXy5rZXlzKG9iaiksXG4gICAgICAgIGxlbmd0aCA9IChrZXlzIHx8IG9iaikubGVuZ3RoO1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHZhciBjdXJyZW50S2V5ID0ga2V5cyA/IGtleXNbaW5kZXhdIDogaW5kZXg7XG4gICAgICBpZiAocHJlZGljYXRlKG9ialtjdXJyZW50S2V5XSwgY3VycmVudEtleSwgb2JqKSkgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICAvLyBEZXRlcm1pbmUgaWYgdGhlIGFycmF5IG9yIG9iamVjdCBjb250YWlucyBhIGdpdmVuIGl0ZW0gKHVzaW5nIGA9PT1gKS5cbiAgLy8gQWxpYXNlZCBhcyBgaW5jbHVkZXNgIGFuZCBgaW5jbHVkZWAuXG4gIF8uY29udGFpbnMgPSBfLmluY2x1ZGVzID0gXy5pbmNsdWRlID0gZnVuY3Rpb24ob2JqLCBpdGVtLCBmcm9tSW5kZXgsIGd1YXJkKSB7XG4gICAgaWYgKCFpc0FycmF5TGlrZShvYmopKSBvYmogPSBfLnZhbHVlcyhvYmopO1xuICAgIGlmICh0eXBlb2YgZnJvbUluZGV4ICE9ICdudW1iZXInIHx8IGd1YXJkKSBmcm9tSW5kZXggPSAwO1xuICAgIHJldHVybiBfLmluZGV4T2Yob2JqLCBpdGVtLCBmcm9tSW5kZXgpID49IDA7XG4gIH07XG5cbiAgLy8gSW52b2tlIGEgbWV0aG9kICh3aXRoIGFyZ3VtZW50cykgb24gZXZlcnkgaXRlbSBpbiBhIGNvbGxlY3Rpb24uXG4gIF8uaW52b2tlID0gcmVzdEFyZ3VtZW50cyhmdW5jdGlvbihvYmosIHBhdGgsIGFyZ3MpIHtcbiAgICB2YXIgY29udGV4dFBhdGgsIGZ1bmM7XG4gICAgaWYgKF8uaXNGdW5jdGlvbihwYXRoKSkge1xuICAgICAgZnVuYyA9IHBhdGg7XG4gICAgfSBlbHNlIGlmIChfLmlzQXJyYXkocGF0aCkpIHtcbiAgICAgIGNvbnRleHRQYXRoID0gcGF0aC5zbGljZSgwLCAtMSk7XG4gICAgICBwYXRoID0gcGF0aFtwYXRoLmxlbmd0aCAtIDFdO1xuICAgIH1cbiAgICByZXR1cm4gXy5tYXAob2JqLCBmdW5jdGlvbihjb250ZXh0KSB7XG4gICAgICB2YXIgbWV0aG9kID0gZnVuYztcbiAgICAgIGlmICghbWV0aG9kKSB7XG4gICAgICAgIGlmIChjb250ZXh0UGF0aCAmJiBjb250ZXh0UGF0aC5sZW5ndGgpIHtcbiAgICAgICAgICBjb250ZXh0ID0gZGVlcEdldChjb250ZXh0LCBjb250ZXh0UGF0aCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbnRleHQgPT0gbnVsbCkgcmV0dXJuIHZvaWQgMDtcbiAgICAgICAgbWV0aG9kID0gY29udGV4dFtwYXRoXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBtZXRob2QgPT0gbnVsbCA/IG1ldGhvZCA6IG1ldGhvZC5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgLy8gQ29udmVuaWVuY2UgdmVyc2lvbiBvZiBhIGNvbW1vbiB1c2UgY2FzZSBvZiBgbWFwYDogZmV0Y2hpbmcgYSBwcm9wZXJ0eS5cbiAgXy5wbHVjayA9IGZ1bmN0aW9uKG9iaiwga2V5KSB7XG4gICAgcmV0dXJuIF8ubWFwKG9iaiwgXy5wcm9wZXJ0eShrZXkpKTtcbiAgfTtcblxuICAvLyBDb252ZW5pZW5jZSB2ZXJzaW9uIG9mIGEgY29tbW9uIHVzZSBjYXNlIG9mIGBmaWx0ZXJgOiBzZWxlY3Rpbmcgb25seSBvYmplY3RzXG4gIC8vIGNvbnRhaW5pbmcgc3BlY2lmaWMgYGtleTp2YWx1ZWAgcGFpcnMuXG4gIF8ud2hlcmUgPSBmdW5jdGlvbihvYmosIGF0dHJzKSB7XG4gICAgcmV0dXJuIF8uZmlsdGVyKG9iaiwgXy5tYXRjaGVyKGF0dHJzKSk7XG4gIH07XG5cbiAgLy8gQ29udmVuaWVuY2UgdmVyc2lvbiBvZiBhIGNvbW1vbiB1c2UgY2FzZSBvZiBgZmluZGA6IGdldHRpbmcgdGhlIGZpcnN0IG9iamVjdFxuICAvLyBjb250YWluaW5nIHNwZWNpZmljIGBrZXk6dmFsdWVgIHBhaXJzLlxuICBfLmZpbmRXaGVyZSA9IGZ1bmN0aW9uKG9iaiwgYXR0cnMpIHtcbiAgICByZXR1cm4gXy5maW5kKG9iaiwgXy5tYXRjaGVyKGF0dHJzKSk7XG4gIH07XG5cbiAgLy8gUmV0dXJuIHRoZSBtYXhpbXVtIGVsZW1lbnQgKG9yIGVsZW1lbnQtYmFzZWQgY29tcHV0YXRpb24pLlxuICBfLm1heCA9IGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICB2YXIgcmVzdWx0ID0gLUluZmluaXR5LCBsYXN0Q29tcHV0ZWQgPSAtSW5maW5pdHksXG4gICAgICAgIHZhbHVlLCBjb21wdXRlZDtcbiAgICBpZiAoaXRlcmF0ZWUgPT0gbnVsbCB8fCB0eXBlb2YgaXRlcmF0ZWUgPT0gJ251bWJlcicgJiYgdHlwZW9mIG9ialswXSAhPSAnb2JqZWN0JyAmJiBvYmogIT0gbnVsbCkge1xuICAgICAgb2JqID0gaXNBcnJheUxpa2Uob2JqKSA/IG9iaiA6IF8udmFsdWVzKG9iaik7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gb2JqLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhbHVlID0gb2JqW2ldO1xuICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCAmJiB2YWx1ZSA+IHJlc3VsdCkge1xuICAgICAgICAgIHJlc3VsdCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGl0ZXJhdGVlID0gY2IoaXRlcmF0ZWUsIGNvbnRleHQpO1xuICAgICAgXy5lYWNoKG9iaiwgZnVuY3Rpb24odiwgaW5kZXgsIGxpc3QpIHtcbiAgICAgICAgY29tcHV0ZWQgPSBpdGVyYXRlZSh2LCBpbmRleCwgbGlzdCk7XG4gICAgICAgIGlmIChjb21wdXRlZCA+IGxhc3RDb21wdXRlZCB8fCBjb21wdXRlZCA9PT0gLUluZmluaXR5ICYmIHJlc3VsdCA9PT0gLUluZmluaXR5KSB7XG4gICAgICAgICAgcmVzdWx0ID0gdjtcbiAgICAgICAgICBsYXN0Q29tcHV0ZWQgPSBjb21wdXRlZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLy8gUmV0dXJuIHRoZSBtaW5pbXVtIGVsZW1lbnQgKG9yIGVsZW1lbnQtYmFzZWQgY29tcHV0YXRpb24pLlxuICBfLm1pbiA9IGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICB2YXIgcmVzdWx0ID0gSW5maW5pdHksIGxhc3RDb21wdXRlZCA9IEluZmluaXR5LFxuICAgICAgICB2YWx1ZSwgY29tcHV0ZWQ7XG4gICAgaWYgKGl0ZXJhdGVlID09IG51bGwgfHwgdHlwZW9mIGl0ZXJhdGVlID09ICdudW1iZXInICYmIHR5cGVvZiBvYmpbMF0gIT0gJ29iamVjdCcgJiYgb2JqICE9IG51bGwpIHtcbiAgICAgIG9iaiA9IGlzQXJyYXlMaWtlKG9iaikgPyBvYmogOiBfLnZhbHVlcyhvYmopO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IG9iai5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICB2YWx1ZSA9IG9ialtpXTtcbiAgICAgICAgaWYgKHZhbHVlICE9IG51bGwgJiYgdmFsdWUgPCByZXN1bHQpIHtcbiAgICAgICAgICByZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpdGVyYXRlZSA9IGNiKGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgICAgIF8uZWFjaChvYmosIGZ1bmN0aW9uKHYsIGluZGV4LCBsaXN0KSB7XG4gICAgICAgIGNvbXB1dGVkID0gaXRlcmF0ZWUodiwgaW5kZXgsIGxpc3QpO1xuICAgICAgICBpZiAoY29tcHV0ZWQgPCBsYXN0Q29tcHV0ZWQgfHwgY29tcHV0ZWQgPT09IEluZmluaXR5ICYmIHJlc3VsdCA9PT0gSW5maW5pdHkpIHtcbiAgICAgICAgICByZXN1bHQgPSB2O1xuICAgICAgICAgIGxhc3RDb21wdXRlZCA9IGNvbXB1dGVkO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBTaHVmZmxlIGEgY29sbGVjdGlvbi5cbiAgXy5zaHVmZmxlID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIF8uc2FtcGxlKG9iaiwgSW5maW5pdHkpO1xuICB9O1xuXG4gIC8vIFNhbXBsZSAqKm4qKiByYW5kb20gdmFsdWVzIGZyb20gYSBjb2xsZWN0aW9uIHVzaW5nIHRoZSBtb2Rlcm4gdmVyc2lvbiBvZiB0aGVcbiAgLy8gW0Zpc2hlci1ZYXRlcyBzaHVmZmxlXShodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Zpc2hlcuKAk1lhdGVzX3NodWZmbGUpLlxuICAvLyBJZiAqKm4qKiBpcyBub3Qgc3BlY2lmaWVkLCByZXR1cm5zIGEgc2luZ2xlIHJhbmRvbSBlbGVtZW50LlxuICAvLyBUaGUgaW50ZXJuYWwgYGd1YXJkYCBhcmd1bWVudCBhbGxvd3MgaXQgdG8gd29yayB3aXRoIGBtYXBgLlxuICBfLnNhbXBsZSA9IGZ1bmN0aW9uKG9iaiwgbiwgZ3VhcmQpIHtcbiAgICBpZiAobiA9PSBudWxsIHx8IGd1YXJkKSB7XG4gICAgICBpZiAoIWlzQXJyYXlMaWtlKG9iaikpIG9iaiA9IF8udmFsdWVzKG9iaik7XG4gICAgICByZXR1cm4gb2JqW18ucmFuZG9tKG9iai5sZW5ndGggLSAxKV07XG4gICAgfVxuICAgIHZhciBzYW1wbGUgPSBpc0FycmF5TGlrZShvYmopID8gXy5jbG9uZShvYmopIDogXy52YWx1ZXMob2JqKTtcbiAgICB2YXIgbGVuZ3RoID0gZ2V0TGVuZ3RoKHNhbXBsZSk7XG4gICAgbiA9IE1hdGgubWF4KE1hdGgubWluKG4sIGxlbmd0aCksIDApO1xuICAgIHZhciBsYXN0ID0gbGVuZ3RoIC0gMTtcbiAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgbjsgaW5kZXgrKykge1xuICAgICAgdmFyIHJhbmQgPSBfLnJhbmRvbShpbmRleCwgbGFzdCk7XG4gICAgICB2YXIgdGVtcCA9IHNhbXBsZVtpbmRleF07XG4gICAgICBzYW1wbGVbaW5kZXhdID0gc2FtcGxlW3JhbmRdO1xuICAgICAgc2FtcGxlW3JhbmRdID0gdGVtcDtcbiAgICB9XG4gICAgcmV0dXJuIHNhbXBsZS5zbGljZSgwLCBuKTtcbiAgfTtcblxuICAvLyBTb3J0IHRoZSBvYmplY3QncyB2YWx1ZXMgYnkgYSBjcml0ZXJpb24gcHJvZHVjZWQgYnkgYW4gaXRlcmF0ZWUuXG4gIF8uc29ydEJ5ID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgaXRlcmF0ZWUgPSBjYihpdGVyYXRlZSwgY29udGV4dCk7XG4gICAgcmV0dXJuIF8ucGx1Y2soXy5tYXAob2JqLCBmdW5jdGlvbih2YWx1ZSwga2V5LCBsaXN0KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgIGluZGV4OiBpbmRleCsrLFxuICAgICAgICBjcml0ZXJpYTogaXRlcmF0ZWUodmFsdWUsIGtleSwgbGlzdClcbiAgICAgIH07XG4gICAgfSkuc29ydChmdW5jdGlvbihsZWZ0LCByaWdodCkge1xuICAgICAgdmFyIGEgPSBsZWZ0LmNyaXRlcmlhO1xuICAgICAgdmFyIGIgPSByaWdodC5jcml0ZXJpYTtcbiAgICAgIGlmIChhICE9PSBiKSB7XG4gICAgICAgIGlmIChhID4gYiB8fCBhID09PSB2b2lkIDApIHJldHVybiAxO1xuICAgICAgICBpZiAoYSA8IGIgfHwgYiA9PT0gdm9pZCAwKSByZXR1cm4gLTE7XG4gICAgICB9XG4gICAgICByZXR1cm4gbGVmdC5pbmRleCAtIHJpZ2h0LmluZGV4O1xuICAgIH0pLCAndmFsdWUnKTtcbiAgfTtcblxuICAvLyBBbiBpbnRlcm5hbCBmdW5jdGlvbiB1c2VkIGZvciBhZ2dyZWdhdGUgXCJncm91cCBieVwiIG9wZXJhdGlvbnMuXG4gIHZhciBncm91cCA9IGZ1bmN0aW9uKGJlaGF2aW9yLCBwYXJ0aXRpb24pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgICAgdmFyIHJlc3VsdCA9IHBhcnRpdGlvbiA/IFtbXSwgW11dIDoge307XG4gICAgICBpdGVyYXRlZSA9IGNiKGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgICAgIF8uZWFjaChvYmosIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCkge1xuICAgICAgICB2YXIga2V5ID0gaXRlcmF0ZWUodmFsdWUsIGluZGV4LCBvYmopO1xuICAgICAgICBiZWhhdmlvcihyZXN1bHQsIHZhbHVlLCBrZXkpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gIH07XG5cbiAgLy8gR3JvdXBzIHRoZSBvYmplY3QncyB2YWx1ZXMgYnkgYSBjcml0ZXJpb24uIFBhc3MgZWl0aGVyIGEgc3RyaW5nIGF0dHJpYnV0ZVxuICAvLyB0byBncm91cCBieSwgb3IgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGNyaXRlcmlvbi5cbiAgXy5ncm91cEJ5ID0gZ3JvdXAoZnVuY3Rpb24ocmVzdWx0LCB2YWx1ZSwga2V5KSB7XG4gICAgaWYgKF8uaGFzKHJlc3VsdCwga2V5KSkgcmVzdWx0W2tleV0ucHVzaCh2YWx1ZSk7IGVsc2UgcmVzdWx0W2tleV0gPSBbdmFsdWVdO1xuICB9KTtcblxuICAvLyBJbmRleGVzIHRoZSBvYmplY3QncyB2YWx1ZXMgYnkgYSBjcml0ZXJpb24sIHNpbWlsYXIgdG8gYGdyb3VwQnlgLCBidXQgZm9yXG4gIC8vIHdoZW4geW91IGtub3cgdGhhdCB5b3VyIGluZGV4IHZhbHVlcyB3aWxsIGJlIHVuaXF1ZS5cbiAgXy5pbmRleEJ5ID0gZ3JvdXAoZnVuY3Rpb24ocmVzdWx0LCB2YWx1ZSwga2V5KSB7XG4gICAgcmVzdWx0W2tleV0gPSB2YWx1ZTtcbiAgfSk7XG5cbiAgLy8gQ291bnRzIGluc3RhbmNlcyBvZiBhbiBvYmplY3QgdGhhdCBncm91cCBieSBhIGNlcnRhaW4gY3JpdGVyaW9uLiBQYXNzXG4gIC8vIGVpdGhlciBhIHN0cmluZyBhdHRyaWJ1dGUgdG8gY291bnQgYnksIG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZVxuICAvLyBjcml0ZXJpb24uXG4gIF8uY291bnRCeSA9IGdyb3VwKGZ1bmN0aW9uKHJlc3VsdCwgdmFsdWUsIGtleSkge1xuICAgIGlmIChfLmhhcyhyZXN1bHQsIGtleSkpIHJlc3VsdFtrZXldKys7IGVsc2UgcmVzdWx0W2tleV0gPSAxO1xuICB9KTtcblxuICB2YXIgcmVTdHJTeW1ib2wgPSAvW15cXHVkODAwLVxcdWRmZmZdfFtcXHVkODAwLVxcdWRiZmZdW1xcdWRjMDAtXFx1ZGZmZl18W1xcdWQ4MDAtXFx1ZGZmZl0vZztcbiAgLy8gU2FmZWx5IGNyZWF0ZSBhIHJlYWwsIGxpdmUgYXJyYXkgZnJvbSBhbnl0aGluZyBpdGVyYWJsZS5cbiAgXy50b0FycmF5ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKCFvYmopIHJldHVybiBbXTtcbiAgICBpZiAoXy5pc0FycmF5KG9iaikpIHJldHVybiBzbGljZS5jYWxsKG9iaik7XG4gICAgaWYgKF8uaXNTdHJpbmcob2JqKSkge1xuICAgICAgLy8gS2VlcCBzdXJyb2dhdGUgcGFpciBjaGFyYWN0ZXJzIHRvZ2V0aGVyXG4gICAgICByZXR1cm4gb2JqLm1hdGNoKHJlU3RyU3ltYm9sKTtcbiAgICB9XG4gICAgaWYgKGlzQXJyYXlMaWtlKG9iaikpIHJldHVybiBfLm1hcChvYmosIF8uaWRlbnRpdHkpO1xuICAgIHJldHVybiBfLnZhbHVlcyhvYmopO1xuICB9O1xuXG4gIC8vIFJldHVybiB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIGFuIG9iamVjdC5cbiAgXy5zaXplID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gMDtcbiAgICByZXR1cm4gaXNBcnJheUxpa2Uob2JqKSA/IG9iai5sZW5ndGggOiBfLmtleXMob2JqKS5sZW5ndGg7XG4gIH07XG5cbiAgLy8gU3BsaXQgYSBjb2xsZWN0aW9uIGludG8gdHdvIGFycmF5czogb25lIHdob3NlIGVsZW1lbnRzIGFsbCBzYXRpc2Z5IHRoZSBnaXZlblxuICAvLyBwcmVkaWNhdGUsIGFuZCBvbmUgd2hvc2UgZWxlbWVudHMgYWxsIGRvIG5vdCBzYXRpc2Z5IHRoZSBwcmVkaWNhdGUuXG4gIF8ucGFydGl0aW9uID0gZ3JvdXAoZnVuY3Rpb24ocmVzdWx0LCB2YWx1ZSwgcGFzcykge1xuICAgIHJlc3VsdFtwYXNzID8gMCA6IDFdLnB1c2godmFsdWUpO1xuICB9LCB0cnVlKTtcblxuICAvLyBBcnJheSBGdW5jdGlvbnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gR2V0IHRoZSBmaXJzdCBlbGVtZW50IG9mIGFuIGFycmF5LiBQYXNzaW5nICoqbioqIHdpbGwgcmV0dXJuIHRoZSBmaXJzdCBOXG4gIC8vIHZhbHVlcyBpbiB0aGUgYXJyYXkuIEFsaWFzZWQgYXMgYGhlYWRgIGFuZCBgdGFrZWAuIFRoZSAqKmd1YXJkKiogY2hlY2tcbiAgLy8gYWxsb3dzIGl0IHRvIHdvcmsgd2l0aCBgXy5tYXBgLlxuICBfLmZpcnN0ID0gXy5oZWFkID0gXy50YWtlID0gZnVuY3Rpb24oYXJyYXksIG4sIGd1YXJkKSB7XG4gICAgaWYgKGFycmF5ID09IG51bGwgfHwgYXJyYXkubGVuZ3RoIDwgMSkgcmV0dXJuIHZvaWQgMDtcbiAgICBpZiAobiA9PSBudWxsIHx8IGd1YXJkKSByZXR1cm4gYXJyYXlbMF07XG4gICAgcmV0dXJuIF8uaW5pdGlhbChhcnJheSwgYXJyYXkubGVuZ3RoIC0gbik7XG4gIH07XG5cbiAgLy8gUmV0dXJucyBldmVyeXRoaW5nIGJ1dCB0aGUgbGFzdCBlbnRyeSBvZiB0aGUgYXJyYXkuIEVzcGVjaWFsbHkgdXNlZnVsIG9uXG4gIC8vIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBQYXNzaW5nICoqbioqIHdpbGwgcmV0dXJuIGFsbCB0aGUgdmFsdWVzIGluXG4gIC8vIHRoZSBhcnJheSwgZXhjbHVkaW5nIHRoZSBsYXN0IE4uXG4gIF8uaW5pdGlhbCA9IGZ1bmN0aW9uKGFycmF5LCBuLCBndWFyZCkge1xuICAgIHJldHVybiBzbGljZS5jYWxsKGFycmF5LCAwLCBNYXRoLm1heCgwLCBhcnJheS5sZW5ndGggLSAobiA9PSBudWxsIHx8IGd1YXJkID8gMSA6IG4pKSk7XG4gIH07XG5cbiAgLy8gR2V0IHRoZSBsYXN0IGVsZW1lbnQgb2YgYW4gYXJyYXkuIFBhc3NpbmcgKipuKiogd2lsbCByZXR1cm4gdGhlIGxhc3QgTlxuICAvLyB2YWx1ZXMgaW4gdGhlIGFycmF5LlxuICBfLmxhc3QgPSBmdW5jdGlvbihhcnJheSwgbiwgZ3VhcmQpIHtcbiAgICBpZiAoYXJyYXkgPT0gbnVsbCB8fCBhcnJheS5sZW5ndGggPCAxKSByZXR1cm4gdm9pZCAwO1xuICAgIGlmIChuID09IG51bGwgfHwgZ3VhcmQpIHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSAxXTtcbiAgICByZXR1cm4gXy5yZXN0KGFycmF5LCBNYXRoLm1heCgwLCBhcnJheS5sZW5ndGggLSBuKSk7XG4gIH07XG5cbiAgLy8gUmV0dXJucyBldmVyeXRoaW5nIGJ1dCB0aGUgZmlyc3QgZW50cnkgb2YgdGhlIGFycmF5LiBBbGlhc2VkIGFzIGB0YWlsYCBhbmQgYGRyb3BgLlxuICAvLyBFc3BlY2lhbGx5IHVzZWZ1bCBvbiB0aGUgYXJndW1lbnRzIG9iamVjdC4gUGFzc2luZyBhbiAqKm4qKiB3aWxsIHJldHVyblxuICAvLyB0aGUgcmVzdCBOIHZhbHVlcyBpbiB0aGUgYXJyYXkuXG4gIF8ucmVzdCA9IF8udGFpbCA9IF8uZHJvcCA9IGZ1bmN0aW9uKGFycmF5LCBuLCBndWFyZCkge1xuICAgIHJldHVybiBzbGljZS5jYWxsKGFycmF5LCBuID09IG51bGwgfHwgZ3VhcmQgPyAxIDogbik7XG4gIH07XG5cbiAgLy8gVHJpbSBvdXQgYWxsIGZhbHN5IHZhbHVlcyBmcm9tIGFuIGFycmF5LlxuICBfLmNvbXBhY3QgPSBmdW5jdGlvbihhcnJheSkge1xuICAgIHJldHVybiBfLmZpbHRlcihhcnJheSwgQm9vbGVhbik7XG4gIH07XG5cbiAgLy8gSW50ZXJuYWwgaW1wbGVtZW50YXRpb24gb2YgYSByZWN1cnNpdmUgYGZsYXR0ZW5gIGZ1bmN0aW9uLlxuICB2YXIgZmxhdHRlbiA9IGZ1bmN0aW9uKGlucHV0LCBzaGFsbG93LCBzdHJpY3QsIG91dHB1dCkge1xuICAgIG91dHB1dCA9IG91dHB1dCB8fCBbXTtcbiAgICB2YXIgaWR4ID0gb3V0cHV0Lmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gZ2V0TGVuZ3RoKGlucHV0KTsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgdmFsdWUgPSBpbnB1dFtpXTtcbiAgICAgIGlmIChpc0FycmF5TGlrZSh2YWx1ZSkgJiYgKF8uaXNBcnJheSh2YWx1ZSkgfHwgXy5pc0FyZ3VtZW50cyh2YWx1ZSkpKSB7XG4gICAgICAgIC8vIEZsYXR0ZW4gY3VycmVudCBsZXZlbCBvZiBhcnJheSBvciBhcmd1bWVudHMgb2JqZWN0LlxuICAgICAgICBpZiAoc2hhbGxvdykge1xuICAgICAgICAgIHZhciBqID0gMCwgbGVuID0gdmFsdWUubGVuZ3RoO1xuICAgICAgICAgIHdoaWxlIChqIDwgbGVuKSBvdXRwdXRbaWR4KytdID0gdmFsdWVbaisrXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmbGF0dGVuKHZhbHVlLCBzaGFsbG93LCBzdHJpY3QsIG91dHB1dCk7XG4gICAgICAgICAgaWR4ID0gb3V0cHV0Lmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICghc3RyaWN0KSB7XG4gICAgICAgIG91dHB1dFtpZHgrK10gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfTtcblxuICAvLyBGbGF0dGVuIG91dCBhbiBhcnJheSwgZWl0aGVyIHJlY3Vyc2l2ZWx5IChieSBkZWZhdWx0KSwgb3IganVzdCBvbmUgbGV2ZWwuXG4gIF8uZmxhdHRlbiA9IGZ1bmN0aW9uKGFycmF5LCBzaGFsbG93KSB7XG4gICAgcmV0dXJuIGZsYXR0ZW4oYXJyYXksIHNoYWxsb3csIGZhbHNlKTtcbiAgfTtcblxuICAvLyBSZXR1cm4gYSB2ZXJzaW9uIG9mIHRoZSBhcnJheSB0aGF0IGRvZXMgbm90IGNvbnRhaW4gdGhlIHNwZWNpZmllZCB2YWx1ZShzKS5cbiAgXy53aXRob3V0ID0gcmVzdEFyZ3VtZW50cyhmdW5jdGlvbihhcnJheSwgb3RoZXJBcnJheXMpIHtcbiAgICByZXR1cm4gXy5kaWZmZXJlbmNlKGFycmF5LCBvdGhlckFycmF5cyk7XG4gIH0pO1xuXG4gIC8vIFByb2R1Y2UgYSBkdXBsaWNhdGUtZnJlZSB2ZXJzaW9uIG9mIHRoZSBhcnJheS4gSWYgdGhlIGFycmF5IGhhcyBhbHJlYWR5XG4gIC8vIGJlZW4gc29ydGVkLCB5b3UgaGF2ZSB0aGUgb3B0aW9uIG9mIHVzaW5nIGEgZmFzdGVyIGFsZ29yaXRobS5cbiAgLy8gVGhlIGZhc3RlciBhbGdvcml0aG0gd2lsbCBub3Qgd29yayB3aXRoIGFuIGl0ZXJhdGVlIGlmIHRoZSBpdGVyYXRlZVxuICAvLyBpcyBub3QgYSBvbmUtdG8tb25lIGZ1bmN0aW9uLCBzbyBwcm92aWRpbmcgYW4gaXRlcmF0ZWUgd2lsbCBkaXNhYmxlXG4gIC8vIHRoZSBmYXN0ZXIgYWxnb3JpdGhtLlxuICAvLyBBbGlhc2VkIGFzIGB1bmlxdWVgLlxuICBfLnVuaXEgPSBfLnVuaXF1ZSA9IGZ1bmN0aW9uKGFycmF5LCBpc1NvcnRlZCwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICBpZiAoIV8uaXNCb29sZWFuKGlzU29ydGVkKSkge1xuICAgICAgY29udGV4dCA9IGl0ZXJhdGVlO1xuICAgICAgaXRlcmF0ZWUgPSBpc1NvcnRlZDtcbiAgICAgIGlzU29ydGVkID0gZmFsc2U7XG4gICAgfVxuICAgIGlmIChpdGVyYXRlZSAhPSBudWxsKSBpdGVyYXRlZSA9IGNiKGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgdmFyIHNlZW4gPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gZ2V0TGVuZ3RoKGFycmF5KTsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgdmFsdWUgPSBhcnJheVtpXSxcbiAgICAgICAgICBjb21wdXRlZCA9IGl0ZXJhdGVlID8gaXRlcmF0ZWUodmFsdWUsIGksIGFycmF5KSA6IHZhbHVlO1xuICAgICAgaWYgKGlzU29ydGVkICYmICFpdGVyYXRlZSkge1xuICAgICAgICBpZiAoIWkgfHwgc2VlbiAhPT0gY29tcHV0ZWQpIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICAgICAgc2VlbiA9IGNvbXB1dGVkO1xuICAgICAgfSBlbHNlIGlmIChpdGVyYXRlZSkge1xuICAgICAgICBpZiAoIV8uY29udGFpbnMoc2VlbiwgY29tcHV0ZWQpKSB7XG4gICAgICAgICAgc2Vlbi5wdXNoKGNvbXB1dGVkKTtcbiAgICAgICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoIV8uY29udGFpbnMocmVzdWx0LCB2YWx1ZSkpIHtcbiAgICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIFByb2R1Y2UgYW4gYXJyYXkgdGhhdCBjb250YWlucyB0aGUgdW5pb246IGVhY2ggZGlzdGluY3QgZWxlbWVudCBmcm9tIGFsbCBvZlxuICAvLyB0aGUgcGFzc2VkLWluIGFycmF5cy5cbiAgXy51bmlvbiA9IHJlc3RBcmd1bWVudHMoZnVuY3Rpb24oYXJyYXlzKSB7XG4gICAgcmV0dXJuIF8udW5pcShmbGF0dGVuKGFycmF5cywgdHJ1ZSwgdHJ1ZSkpO1xuICB9KTtcblxuICAvLyBQcm9kdWNlIGFuIGFycmF5IHRoYXQgY29udGFpbnMgZXZlcnkgaXRlbSBzaGFyZWQgYmV0d2VlbiBhbGwgdGhlXG4gIC8vIHBhc3NlZC1pbiBhcnJheXMuXG4gIF8uaW50ZXJzZWN0aW9uID0gZnVuY3Rpb24oYXJyYXkpIHtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgdmFyIGFyZ3NMZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBnZXRMZW5ndGgoYXJyYXkpOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpdGVtID0gYXJyYXlbaV07XG4gICAgICBpZiAoXy5jb250YWlucyhyZXN1bHQsIGl0ZW0pKSBjb250aW51ZTtcbiAgICAgIHZhciBqO1xuICAgICAgZm9yIChqID0gMTsgaiA8IGFyZ3NMZW5ndGg7IGorKykge1xuICAgICAgICBpZiAoIV8uY29udGFpbnMoYXJndW1lbnRzW2pdLCBpdGVtKSkgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoaiA9PT0gYXJnc0xlbmd0aCkgcmVzdWx0LnB1c2goaXRlbSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLy8gVGFrZSB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIG9uZSBhcnJheSBhbmQgYSBudW1iZXIgb2Ygb3RoZXIgYXJyYXlzLlxuICAvLyBPbmx5IHRoZSBlbGVtZW50cyBwcmVzZW50IGluIGp1c3QgdGhlIGZpcnN0IGFycmF5IHdpbGwgcmVtYWluLlxuICBfLmRpZmZlcmVuY2UgPSByZXN0QXJndW1lbnRzKGZ1bmN0aW9uKGFycmF5LCByZXN0KSB7XG4gICAgcmVzdCA9IGZsYXR0ZW4ocmVzdCwgdHJ1ZSwgdHJ1ZSk7XG4gICAgcmV0dXJuIF8uZmlsdGVyKGFycmF5LCBmdW5jdGlvbih2YWx1ZSl7XG4gICAgICByZXR1cm4gIV8uY29udGFpbnMocmVzdCwgdmFsdWUpO1xuICAgIH0pO1xuICB9KTtcblxuICAvLyBDb21wbGVtZW50IG9mIF8uemlwLiBVbnppcCBhY2NlcHRzIGFuIGFycmF5IG9mIGFycmF5cyBhbmQgZ3JvdXBzXG4gIC8vIGVhY2ggYXJyYXkncyBlbGVtZW50cyBvbiBzaGFyZWQgaW5kaWNlcy5cbiAgXy51bnppcCA9IGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgdmFyIGxlbmd0aCA9IGFycmF5ICYmIF8ubWF4KGFycmF5LCBnZXRMZW5ndGgpLmxlbmd0aCB8fCAwO1xuICAgIHZhciByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgcmVzdWx0W2luZGV4XSA9IF8ucGx1Y2soYXJyYXksIGluZGV4KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBaaXAgdG9nZXRoZXIgbXVsdGlwbGUgbGlzdHMgaW50byBhIHNpbmdsZSBhcnJheSAtLSBlbGVtZW50cyB0aGF0IHNoYXJlXG4gIC8vIGFuIGluZGV4IGdvIHRvZ2V0aGVyLlxuICBfLnppcCA9IHJlc3RBcmd1bWVudHMoXy51bnppcCk7XG5cbiAgLy8gQ29udmVydHMgbGlzdHMgaW50byBvYmplY3RzLiBQYXNzIGVpdGhlciBhIHNpbmdsZSBhcnJheSBvZiBgW2tleSwgdmFsdWVdYFxuICAvLyBwYWlycywgb3IgdHdvIHBhcmFsbGVsIGFycmF5cyBvZiB0aGUgc2FtZSBsZW5ndGggLS0gb25lIG9mIGtleXMsIGFuZCBvbmUgb2ZcbiAgLy8gdGhlIGNvcnJlc3BvbmRpbmcgdmFsdWVzLiBQYXNzaW5nIGJ5IHBhaXJzIGlzIHRoZSByZXZlcnNlIG9mIF8ucGFpcnMuXG4gIF8ub2JqZWN0ID0gZnVuY3Rpb24obGlzdCwgdmFsdWVzKSB7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBnZXRMZW5ndGgobGlzdCk7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHZhbHVlcykge1xuICAgICAgICByZXN1bHRbbGlzdFtpXV0gPSB2YWx1ZXNbaV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHRbbGlzdFtpXVswXV0gPSBsaXN0W2ldWzFdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIEdlbmVyYXRvciBmdW5jdGlvbiB0byBjcmVhdGUgdGhlIGZpbmRJbmRleCBhbmQgZmluZExhc3RJbmRleCBmdW5jdGlvbnMuXG4gIHZhciBjcmVhdGVQcmVkaWNhdGVJbmRleEZpbmRlciA9IGZ1bmN0aW9uKGRpcikge1xuICAgIHJldHVybiBmdW5jdGlvbihhcnJheSwgcHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgICBwcmVkaWNhdGUgPSBjYihwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgICAgdmFyIGxlbmd0aCA9IGdldExlbmd0aChhcnJheSk7XG4gICAgICB2YXIgaW5kZXggPSBkaXIgPiAwID8gMCA6IGxlbmd0aCAtIDE7XG4gICAgICBmb3IgKDsgaW5kZXggPj0gMCAmJiBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gZGlyKSB7XG4gICAgICAgIGlmIChwcmVkaWNhdGUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpKSByZXR1cm4gaW5kZXg7XG4gICAgICB9XG4gICAgICByZXR1cm4gLTE7XG4gICAgfTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIHRoZSBmaXJzdCBpbmRleCBvbiBhbiBhcnJheS1saWtlIHRoYXQgcGFzc2VzIGEgcHJlZGljYXRlIHRlc3QuXG4gIF8uZmluZEluZGV4ID0gY3JlYXRlUHJlZGljYXRlSW5kZXhGaW5kZXIoMSk7XG4gIF8uZmluZExhc3RJbmRleCA9IGNyZWF0ZVByZWRpY2F0ZUluZGV4RmluZGVyKC0xKTtcblxuICAvLyBVc2UgYSBjb21wYXJhdG9yIGZ1bmN0aW9uIHRvIGZpZ3VyZSBvdXQgdGhlIHNtYWxsZXN0IGluZGV4IGF0IHdoaWNoXG4gIC8vIGFuIG9iamVjdCBzaG91bGQgYmUgaW5zZXJ0ZWQgc28gYXMgdG8gbWFpbnRhaW4gb3JkZXIuIFVzZXMgYmluYXJ5IHNlYXJjaC5cbiAgXy5zb3J0ZWRJbmRleCA9IGZ1bmN0aW9uKGFycmF5LCBvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgaXRlcmF0ZWUgPSBjYihpdGVyYXRlZSwgY29udGV4dCwgMSk7XG4gICAgdmFyIHZhbHVlID0gaXRlcmF0ZWUob2JqKTtcbiAgICB2YXIgbG93ID0gMCwgaGlnaCA9IGdldExlbmd0aChhcnJheSk7XG4gICAgd2hpbGUgKGxvdyA8IGhpZ2gpIHtcbiAgICAgIHZhciBtaWQgPSBNYXRoLmZsb29yKChsb3cgKyBoaWdoKSAvIDIpO1xuICAgICAgaWYgKGl0ZXJhdGVlKGFycmF5W21pZF0pIDwgdmFsdWUpIGxvdyA9IG1pZCArIDE7IGVsc2UgaGlnaCA9IG1pZDtcbiAgICB9XG4gICAgcmV0dXJuIGxvdztcbiAgfTtcblxuICAvLyBHZW5lcmF0b3IgZnVuY3Rpb24gdG8gY3JlYXRlIHRoZSBpbmRleE9mIGFuZCBsYXN0SW5kZXhPZiBmdW5jdGlvbnMuXG4gIHZhciBjcmVhdGVJbmRleEZpbmRlciA9IGZ1bmN0aW9uKGRpciwgcHJlZGljYXRlRmluZCwgc29ydGVkSW5kZXgpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oYXJyYXksIGl0ZW0sIGlkeCkge1xuICAgICAgdmFyIGkgPSAwLCBsZW5ndGggPSBnZXRMZW5ndGgoYXJyYXkpO1xuICAgICAgaWYgKHR5cGVvZiBpZHggPT0gJ251bWJlcicpIHtcbiAgICAgICAgaWYgKGRpciA+IDApIHtcbiAgICAgICAgICBpID0gaWR4ID49IDAgPyBpZHggOiBNYXRoLm1heChpZHggKyBsZW5ndGgsIGkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxlbmd0aCA9IGlkeCA+PSAwID8gTWF0aC5taW4oaWR4ICsgMSwgbGVuZ3RoKSA6IGlkeCArIGxlbmd0aCArIDE7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoc29ydGVkSW5kZXggJiYgaWR4ICYmIGxlbmd0aCkge1xuICAgICAgICBpZHggPSBzb3J0ZWRJbmRleChhcnJheSwgaXRlbSk7XG4gICAgICAgIHJldHVybiBhcnJheVtpZHhdID09PSBpdGVtID8gaWR4IDogLTE7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbSAhPT0gaXRlbSkge1xuICAgICAgICBpZHggPSBwcmVkaWNhdGVGaW5kKHNsaWNlLmNhbGwoYXJyYXksIGksIGxlbmd0aCksIF8uaXNOYU4pO1xuICAgICAgICByZXR1cm4gaWR4ID49IDAgPyBpZHggKyBpIDogLTE7XG4gICAgICB9XG4gICAgICBmb3IgKGlkeCA9IGRpciA+IDAgPyBpIDogbGVuZ3RoIC0gMTsgaWR4ID49IDAgJiYgaWR4IDwgbGVuZ3RoOyBpZHggKz0gZGlyKSB7XG4gICAgICAgIGlmIChhcnJheVtpZHhdID09PSBpdGVtKSByZXR1cm4gaWR4O1xuICAgICAgfVxuICAgICAgcmV0dXJuIC0xO1xuICAgIH07XG4gIH07XG5cbiAgLy8gUmV0dXJuIHRoZSBwb3NpdGlvbiBvZiB0aGUgZmlyc3Qgb2NjdXJyZW5jZSBvZiBhbiBpdGVtIGluIGFuIGFycmF5LFxuICAvLyBvciAtMSBpZiB0aGUgaXRlbSBpcyBub3QgaW5jbHVkZWQgaW4gdGhlIGFycmF5LlxuICAvLyBJZiB0aGUgYXJyYXkgaXMgbGFyZ2UgYW5kIGFscmVhZHkgaW4gc29ydCBvcmRlciwgcGFzcyBgdHJ1ZWBcbiAgLy8gZm9yICoqaXNTb3J0ZWQqKiB0byB1c2UgYmluYXJ5IHNlYXJjaC5cbiAgXy5pbmRleE9mID0gY3JlYXRlSW5kZXhGaW5kZXIoMSwgXy5maW5kSW5kZXgsIF8uc29ydGVkSW5kZXgpO1xuICBfLmxhc3RJbmRleE9mID0gY3JlYXRlSW5kZXhGaW5kZXIoLTEsIF8uZmluZExhc3RJbmRleCk7XG5cbiAgLy8gR2VuZXJhdGUgYW4gaW50ZWdlciBBcnJheSBjb250YWluaW5nIGFuIGFyaXRobWV0aWMgcHJvZ3Jlc3Npb24uIEEgcG9ydCBvZlxuICAvLyB0aGUgbmF0aXZlIFB5dGhvbiBgcmFuZ2UoKWAgZnVuY3Rpb24uIFNlZVxuICAvLyBbdGhlIFB5dGhvbiBkb2N1bWVudGF0aW9uXShodHRwOi8vZG9jcy5weXRob24ub3JnL2xpYnJhcnkvZnVuY3Rpb25zLmh0bWwjcmFuZ2UpLlxuICBfLnJhbmdlID0gZnVuY3Rpb24oc3RhcnQsIHN0b3AsIHN0ZXApIHtcbiAgICBpZiAoc3RvcCA9PSBudWxsKSB7XG4gICAgICBzdG9wID0gc3RhcnQgfHwgMDtcbiAgICAgIHN0YXJ0ID0gMDtcbiAgICB9XG4gICAgaWYgKCFzdGVwKSB7XG4gICAgICBzdGVwID0gc3RvcCA8IHN0YXJ0ID8gLTEgOiAxO1xuICAgIH1cblxuICAgIHZhciBsZW5ndGggPSBNYXRoLm1heChNYXRoLmNlaWwoKHN0b3AgLSBzdGFydCkgLyBzdGVwKSwgMCk7XG4gICAgdmFyIHJhbmdlID0gQXJyYXkobGVuZ3RoKTtcblxuICAgIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IGxlbmd0aDsgaWR4KyssIHN0YXJ0ICs9IHN0ZXApIHtcbiAgICAgIHJhbmdlW2lkeF0gPSBzdGFydDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmFuZ2U7XG4gIH07XG5cbiAgLy8gQ2h1bmsgYSBzaW5nbGUgYXJyYXkgaW50byBtdWx0aXBsZSBhcnJheXMsIGVhY2ggY29udGFpbmluZyBgY291bnRgIG9yIGZld2VyXG4gIC8vIGl0ZW1zLlxuICBfLmNodW5rID0gZnVuY3Rpb24oYXJyYXksIGNvdW50KSB7XG4gICAgaWYgKGNvdW50ID09IG51bGwgfHwgY291bnQgPCAxKSByZXR1cm4gW107XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHZhciBpID0gMCwgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICAgIHdoaWxlIChpIDwgbGVuZ3RoKSB7XG4gICAgICByZXN1bHQucHVzaChzbGljZS5jYWxsKGFycmF5LCBpLCBpICs9IGNvdW50KSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLy8gRnVuY3Rpb24gKGFoZW0pIEZ1bmN0aW9uc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvLyBEZXRlcm1pbmVzIHdoZXRoZXIgdG8gZXhlY3V0ZSBhIGZ1bmN0aW9uIGFzIGEgY29uc3RydWN0b3JcbiAgLy8gb3IgYSBub3JtYWwgZnVuY3Rpb24gd2l0aCB0aGUgcHJvdmlkZWQgYXJndW1lbnRzLlxuICB2YXIgZXhlY3V0ZUJvdW5kID0gZnVuY3Rpb24oc291cmNlRnVuYywgYm91bmRGdW5jLCBjb250ZXh0LCBjYWxsaW5nQ29udGV4dCwgYXJncykge1xuICAgIGlmICghKGNhbGxpbmdDb250ZXh0IGluc3RhbmNlb2YgYm91bmRGdW5jKSkgcmV0dXJuIHNvdXJjZUZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgdmFyIHNlbGYgPSBiYXNlQ3JlYXRlKHNvdXJjZUZ1bmMucHJvdG90eXBlKTtcbiAgICB2YXIgcmVzdWx0ID0gc291cmNlRnVuYy5hcHBseShzZWxmLCBhcmdzKTtcbiAgICBpZiAoXy5pc09iamVjdChyZXN1bHQpKSByZXR1cm4gcmVzdWx0O1xuICAgIHJldHVybiBzZWxmO1xuICB9O1xuXG4gIC8vIENyZWF0ZSBhIGZ1bmN0aW9uIGJvdW5kIHRvIGEgZ2l2ZW4gb2JqZWN0IChhc3NpZ25pbmcgYHRoaXNgLCBhbmQgYXJndW1lbnRzLFxuICAvLyBvcHRpb25hbGx5KS4gRGVsZWdhdGVzIHRvICoqRUNNQVNjcmlwdCA1KioncyBuYXRpdmUgYEZ1bmN0aW9uLmJpbmRgIGlmXG4gIC8vIGF2YWlsYWJsZS5cbiAgXy5iaW5kID0gcmVzdEFyZ3VtZW50cyhmdW5jdGlvbihmdW5jLCBjb250ZXh0LCBhcmdzKSB7XG4gICAgaWYgKCFfLmlzRnVuY3Rpb24oZnVuYykpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0JpbmQgbXVzdCBiZSBjYWxsZWQgb24gYSBmdW5jdGlvbicpO1xuICAgIHZhciBib3VuZCA9IHJlc3RBcmd1bWVudHMoZnVuY3Rpb24oY2FsbEFyZ3MpIHtcbiAgICAgIHJldHVybiBleGVjdXRlQm91bmQoZnVuYywgYm91bmQsIGNvbnRleHQsIHRoaXMsIGFyZ3MuY29uY2F0KGNhbGxBcmdzKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGJvdW5kO1xuICB9KTtcblxuICAvLyBQYXJ0aWFsbHkgYXBwbHkgYSBmdW5jdGlvbiBieSBjcmVhdGluZyBhIHZlcnNpb24gdGhhdCBoYXMgaGFkIHNvbWUgb2YgaXRzXG4gIC8vIGFyZ3VtZW50cyBwcmUtZmlsbGVkLCB3aXRob3V0IGNoYW5naW5nIGl0cyBkeW5hbWljIGB0aGlzYCBjb250ZXh0LiBfIGFjdHNcbiAgLy8gYXMgYSBwbGFjZWhvbGRlciBieSBkZWZhdWx0LCBhbGxvd2luZyBhbnkgY29tYmluYXRpb24gb2YgYXJndW1lbnRzIHRvIGJlXG4gIC8vIHByZS1maWxsZWQuIFNldCBgXy5wYXJ0aWFsLnBsYWNlaG9sZGVyYCBmb3IgYSBjdXN0b20gcGxhY2Vob2xkZXIgYXJndW1lbnQuXG4gIF8ucGFydGlhbCA9IHJlc3RBcmd1bWVudHMoZnVuY3Rpb24oZnVuYywgYm91bmRBcmdzKSB7XG4gICAgdmFyIHBsYWNlaG9sZGVyID0gXy5wYXJ0aWFsLnBsYWNlaG9sZGVyO1xuICAgIHZhciBib3VuZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHBvc2l0aW9uID0gMCwgbGVuZ3RoID0gYm91bmRBcmdzLmxlbmd0aDtcbiAgICAgIHZhciBhcmdzID0gQXJyYXkobGVuZ3RoKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYXJnc1tpXSA9IGJvdW5kQXJnc1tpXSA9PT0gcGxhY2Vob2xkZXIgPyBhcmd1bWVudHNbcG9zaXRpb24rK10gOiBib3VuZEFyZ3NbaV07XG4gICAgICB9XG4gICAgICB3aGlsZSAocG9zaXRpb24gPCBhcmd1bWVudHMubGVuZ3RoKSBhcmdzLnB1c2goYXJndW1lbnRzW3Bvc2l0aW9uKytdKTtcbiAgICAgIHJldHVybiBleGVjdXRlQm91bmQoZnVuYywgYm91bmQsIHRoaXMsIHRoaXMsIGFyZ3MpO1xuICAgIH07XG4gICAgcmV0dXJuIGJvdW5kO1xuICB9KTtcblxuICBfLnBhcnRpYWwucGxhY2Vob2xkZXIgPSBfO1xuXG4gIC8vIEJpbmQgYSBudW1iZXIgb2YgYW4gb2JqZWN0J3MgbWV0aG9kcyB0byB0aGF0IG9iamVjdC4gUmVtYWluaW5nIGFyZ3VtZW50c1xuICAvLyBhcmUgdGhlIG1ldGhvZCBuYW1lcyB0byBiZSBib3VuZC4gVXNlZnVsIGZvciBlbnN1cmluZyB0aGF0IGFsbCBjYWxsYmFja3NcbiAgLy8gZGVmaW5lZCBvbiBhbiBvYmplY3QgYmVsb25nIHRvIGl0LlxuICBfLmJpbmRBbGwgPSByZXN0QXJndW1lbnRzKGZ1bmN0aW9uKG9iaiwga2V5cykge1xuICAgIGtleXMgPSBmbGF0dGVuKGtleXMsIGZhbHNlLCBmYWxzZSk7XG4gICAgdmFyIGluZGV4ID0ga2V5cy5sZW5ndGg7XG4gICAgaWYgKGluZGV4IDwgMSkgdGhyb3cgbmV3IEVycm9yKCdiaW5kQWxsIG11c3QgYmUgcGFzc2VkIGZ1bmN0aW9uIG5hbWVzJyk7XG4gICAgd2hpbGUgKGluZGV4LS0pIHtcbiAgICAgIHZhciBrZXkgPSBrZXlzW2luZGV4XTtcbiAgICAgIG9ialtrZXldID0gXy5iaW5kKG9ialtrZXldLCBvYmopO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gTWVtb2l6ZSBhbiBleHBlbnNpdmUgZnVuY3Rpb24gYnkgc3RvcmluZyBpdHMgcmVzdWx0cy5cbiAgXy5tZW1vaXplID0gZnVuY3Rpb24oZnVuYywgaGFzaGVyKSB7XG4gICAgdmFyIG1lbW9pemUgPSBmdW5jdGlvbihrZXkpIHtcbiAgICAgIHZhciBjYWNoZSA9IG1lbW9pemUuY2FjaGU7XG4gICAgICB2YXIgYWRkcmVzcyA9ICcnICsgKGhhc2hlciA/IGhhc2hlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIDoga2V5KTtcbiAgICAgIGlmICghXy5oYXMoY2FjaGUsIGFkZHJlc3MpKSBjYWNoZVthZGRyZXNzXSA9IGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIHJldHVybiBjYWNoZVthZGRyZXNzXTtcbiAgICB9O1xuICAgIG1lbW9pemUuY2FjaGUgPSB7fTtcbiAgICByZXR1cm4gbWVtb2l6ZTtcbiAgfTtcblxuICAvLyBEZWxheXMgYSBmdW5jdGlvbiBmb3IgdGhlIGdpdmVuIG51bWJlciBvZiBtaWxsaXNlY29uZHMsIGFuZCB0aGVuIGNhbGxzXG4gIC8vIGl0IHdpdGggdGhlIGFyZ3VtZW50cyBzdXBwbGllZC5cbiAgXy5kZWxheSA9IHJlc3RBcmd1bWVudHMoZnVuY3Rpb24oZnVuYywgd2FpdCwgYXJncykge1xuICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkobnVsbCwgYXJncyk7XG4gICAgfSwgd2FpdCk7XG4gIH0pO1xuXG4gIC8vIERlZmVycyBhIGZ1bmN0aW9uLCBzY2hlZHVsaW5nIGl0IHRvIHJ1biBhZnRlciB0aGUgY3VycmVudCBjYWxsIHN0YWNrIGhhc1xuICAvLyBjbGVhcmVkLlxuICBfLmRlZmVyID0gXy5wYXJ0aWFsKF8uZGVsYXksIF8sIDEpO1xuXG4gIC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgd2hlbiBpbnZva2VkLCB3aWxsIG9ubHkgYmUgdHJpZ2dlcmVkIGF0IG1vc3Qgb25jZVxuICAvLyBkdXJpbmcgYSBnaXZlbiB3aW5kb3cgb2YgdGltZS4gTm9ybWFsbHksIHRoZSB0aHJvdHRsZWQgZnVuY3Rpb24gd2lsbCBydW5cbiAgLy8gYXMgbXVjaCBhcyBpdCBjYW4sIHdpdGhvdXQgZXZlciBnb2luZyBtb3JlIHRoYW4gb25jZSBwZXIgYHdhaXRgIGR1cmF0aW9uO1xuICAvLyBidXQgaWYgeW91J2QgbGlrZSB0byBkaXNhYmxlIHRoZSBleGVjdXRpb24gb24gdGhlIGxlYWRpbmcgZWRnZSwgcGFzc1xuICAvLyBge2xlYWRpbmc6IGZhbHNlfWAuIFRvIGRpc2FibGUgZXhlY3V0aW9uIG9uIHRoZSB0cmFpbGluZyBlZGdlLCBkaXR0by5cbiAgXy50aHJvdHRsZSA9IGZ1bmN0aW9uKGZ1bmMsIHdhaXQsIG9wdGlvbnMpIHtcbiAgICB2YXIgdGltZW91dCwgY29udGV4dCwgYXJncywgcmVzdWx0O1xuICAgIHZhciBwcmV2aW91cyA9IDA7XG4gICAgaWYgKCFvcHRpb25zKSBvcHRpb25zID0ge307XG5cbiAgICB2YXIgbGF0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIHByZXZpb3VzID0gb3B0aW9ucy5sZWFkaW5nID09PSBmYWxzZSA/IDAgOiBfLm5vdygpO1xuICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgaWYgKCF0aW1lb3V0KSBjb250ZXh0ID0gYXJncyA9IG51bGw7XG4gICAgfTtcblxuICAgIHZhciB0aHJvdHRsZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBub3cgPSBfLm5vdygpO1xuICAgICAgaWYgKCFwcmV2aW91cyAmJiBvcHRpb25zLmxlYWRpbmcgPT09IGZhbHNlKSBwcmV2aW91cyA9IG5vdztcbiAgICAgIHZhciByZW1haW5pbmcgPSB3YWl0IC0gKG5vdyAtIHByZXZpb3VzKTtcbiAgICAgIGNvbnRleHQgPSB0aGlzO1xuICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIGlmIChyZW1haW5pbmcgPD0gMCB8fCByZW1haW5pbmcgPiB3YWl0KSB7XG4gICAgICAgIGlmICh0aW1lb3V0KSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHByZXZpb3VzID0gbm93O1xuICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICBpZiAoIXRpbWVvdXQpIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICAgIH0gZWxzZSBpZiAoIXRpbWVvdXQgJiYgb3B0aW9ucy50cmFpbGluZyAhPT0gZmFsc2UpIHtcbiAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHJlbWFpbmluZyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG5cbiAgICB0aHJvdHRsZWQuY2FuY2VsID0gZnVuY3Rpb24oKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICBwcmV2aW91cyA9IDA7XG4gICAgICB0aW1lb3V0ID0gY29udGV4dCA9IGFyZ3MgPSBudWxsO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhyb3R0bGVkO1xuICB9O1xuXG4gIC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgYXMgbG9uZyBhcyBpdCBjb250aW51ZXMgdG8gYmUgaW52b2tlZCwgd2lsbCBub3RcbiAgLy8gYmUgdHJpZ2dlcmVkLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgaXQgc3RvcHMgYmVpbmcgY2FsbGVkIGZvclxuICAvLyBOIG1pbGxpc2Vjb25kcy4gSWYgYGltbWVkaWF0ZWAgaXMgcGFzc2VkLCB0cmlnZ2VyIHRoZSBmdW5jdGlvbiBvbiB0aGVcbiAgLy8gbGVhZGluZyBlZGdlLCBpbnN0ZWFkIG9mIHRoZSB0cmFpbGluZy5cbiAgXy5kZWJvdW5jZSA9IGZ1bmN0aW9uKGZ1bmMsIHdhaXQsIGltbWVkaWF0ZSkge1xuICAgIHZhciB0aW1lb3V0LCByZXN1bHQ7XG5cbiAgICB2YXIgbGF0ZXIgPSBmdW5jdGlvbihjb250ZXh0LCBhcmdzKSB7XG4gICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgIGlmIChhcmdzKSByZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgIH07XG5cbiAgICB2YXIgZGVib3VuY2VkID0gcmVzdEFyZ3VtZW50cyhmdW5jdGlvbihhcmdzKSB7XG4gICAgICBpZiAodGltZW91dCkgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgaWYgKGltbWVkaWF0ZSkge1xuICAgICAgICB2YXIgY2FsbE5vdyA9ICF0aW1lb3V0O1xuICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG4gICAgICAgIGlmIChjYWxsTm93KSByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGltZW91dCA9IF8uZGVsYXkobGF0ZXIsIHdhaXQsIHRoaXMsIGFyZ3MpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0pO1xuXG4gICAgZGVib3VuY2VkLmNhbmNlbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgfTtcblxuICAgIHJldHVybiBkZWJvdW5jZWQ7XG4gIH07XG5cbiAgLy8gUmV0dXJucyB0aGUgZmlyc3QgZnVuY3Rpb24gcGFzc2VkIGFzIGFuIGFyZ3VtZW50IHRvIHRoZSBzZWNvbmQsXG4gIC8vIGFsbG93aW5nIHlvdSB0byBhZGp1c3QgYXJndW1lbnRzLCBydW4gY29kZSBiZWZvcmUgYW5kIGFmdGVyLCBhbmRcbiAgLy8gY29uZGl0aW9uYWxseSBleGVjdXRlIHRoZSBvcmlnaW5hbCBmdW5jdGlvbi5cbiAgXy53cmFwID0gZnVuY3Rpb24oZnVuYywgd3JhcHBlcikge1xuICAgIHJldHVybiBfLnBhcnRpYWwod3JhcHBlciwgZnVuYyk7XG4gIH07XG5cbiAgLy8gUmV0dXJucyBhIG5lZ2F0ZWQgdmVyc2lvbiBvZiB0aGUgcGFzc2VkLWluIHByZWRpY2F0ZS5cbiAgXy5uZWdhdGUgPSBmdW5jdGlvbihwcmVkaWNhdGUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gIXByZWRpY2F0ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH07XG5cbiAgLy8gUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgaXMgdGhlIGNvbXBvc2l0aW9uIG9mIGEgbGlzdCBvZiBmdW5jdGlvbnMsIGVhY2hcbiAgLy8gY29uc3VtaW5nIHRoZSByZXR1cm4gdmFsdWUgb2YgdGhlIGZ1bmN0aW9uIHRoYXQgZm9sbG93cy5cbiAgXy5jb21wb3NlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgdmFyIHN0YXJ0ID0gYXJncy5sZW5ndGggLSAxO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpID0gc3RhcnQ7XG4gICAgICB2YXIgcmVzdWx0ID0gYXJnc1tzdGFydF0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIHdoaWxlIChpLS0pIHJlc3VsdCA9IGFyZ3NbaV0uY2FsbCh0aGlzLCByZXN1bHQpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICB9O1xuXG4gIC8vIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IHdpbGwgb25seSBiZSBleGVjdXRlZCBvbiBhbmQgYWZ0ZXIgdGhlIE50aCBjYWxsLlxuICBfLmFmdGVyID0gZnVuY3Rpb24odGltZXMsIGZ1bmMpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoLS10aW1lcyA8IDEpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xuXG4gIC8vIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IHdpbGwgb25seSBiZSBleGVjdXRlZCB1cCB0byAoYnV0IG5vdCBpbmNsdWRpbmcpIHRoZSBOdGggY2FsbC5cbiAgXy5iZWZvcmUgPSBmdW5jdGlvbih0aW1lcywgZnVuYykge1xuICAgIHZhciBtZW1vO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICgtLXRpbWVzID4gMCkge1xuICAgICAgICBtZW1vID0gZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuICAgICAgaWYgKHRpbWVzIDw9IDEpIGZ1bmMgPSBudWxsO1xuICAgICAgcmV0dXJuIG1lbW87XG4gICAgfTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGV4ZWN1dGVkIGF0IG1vc3Qgb25lIHRpbWUsIG5vIG1hdHRlciBob3dcbiAgLy8gb2Z0ZW4geW91IGNhbGwgaXQuIFVzZWZ1bCBmb3IgbGF6eSBpbml0aWFsaXphdGlvbi5cbiAgXy5vbmNlID0gXy5wYXJ0aWFsKF8uYmVmb3JlLCAyKTtcblxuICBfLnJlc3RBcmd1bWVudHMgPSByZXN0QXJndW1lbnRzO1xuXG4gIC8vIE9iamVjdCBGdW5jdGlvbnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIEtleXMgaW4gSUUgPCA5IHRoYXQgd29uJ3QgYmUgaXRlcmF0ZWQgYnkgYGZvciBrZXkgaW4gLi4uYCBhbmQgdGh1cyBtaXNzZWQuXG4gIHZhciBoYXNFbnVtQnVnID0gIXt0b1N0cmluZzogbnVsbH0ucHJvcGVydHlJc0VudW1lcmFibGUoJ3RvU3RyaW5nJyk7XG4gIHZhciBub25FbnVtZXJhYmxlUHJvcHMgPSBbJ3ZhbHVlT2YnLCAnaXNQcm90b3R5cGVPZicsICd0b1N0cmluZycsXG4gICAgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJywgJ2hhc093blByb3BlcnR5JywgJ3RvTG9jYWxlU3RyaW5nJ107XG5cbiAgdmFyIGNvbGxlY3ROb25FbnVtUHJvcHMgPSBmdW5jdGlvbihvYmosIGtleXMpIHtcbiAgICB2YXIgbm9uRW51bUlkeCA9IG5vbkVudW1lcmFibGVQcm9wcy5sZW5ndGg7XG4gICAgdmFyIGNvbnN0cnVjdG9yID0gb2JqLmNvbnN0cnVjdG9yO1xuICAgIHZhciBwcm90byA9IF8uaXNGdW5jdGlvbihjb25zdHJ1Y3RvcikgJiYgY29uc3RydWN0b3IucHJvdG90eXBlIHx8IE9ialByb3RvO1xuXG4gICAgLy8gQ29uc3RydWN0b3IgaXMgYSBzcGVjaWFsIGNhc2UuXG4gICAgdmFyIHByb3AgPSAnY29uc3RydWN0b3InO1xuICAgIGlmIChfLmhhcyhvYmosIHByb3ApICYmICFfLmNvbnRhaW5zKGtleXMsIHByb3ApKSBrZXlzLnB1c2gocHJvcCk7XG5cbiAgICB3aGlsZSAobm9uRW51bUlkeC0tKSB7XG4gICAgICBwcm9wID0gbm9uRW51bWVyYWJsZVByb3BzW25vbkVudW1JZHhdO1xuICAgICAgaWYgKHByb3AgaW4gb2JqICYmIG9ialtwcm9wXSAhPT0gcHJvdG9bcHJvcF0gJiYgIV8uY29udGFpbnMoa2V5cywgcHJvcCkpIHtcbiAgICAgICAga2V5cy5wdXNoKHByb3ApO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvLyBSZXRyaWV2ZSB0aGUgbmFtZXMgb2YgYW4gb2JqZWN0J3Mgb3duIHByb3BlcnRpZXMuXG4gIC8vIERlbGVnYXRlcyB0byAqKkVDTUFTY3JpcHQgNSoqJ3MgbmF0aXZlIGBPYmplY3Qua2V5c2AuXG4gIF8ua2V5cyA9IGZ1bmN0aW9uKG9iaikge1xuICAgIGlmICghXy5pc09iamVjdChvYmopKSByZXR1cm4gW107XG4gICAgaWYgKG5hdGl2ZUtleXMpIHJldHVybiBuYXRpdmVLZXlzKG9iaik7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSBpZiAoXy5oYXMob2JqLCBrZXkpKSBrZXlzLnB1c2goa2V5KTtcbiAgICAvLyBBaGVtLCBJRSA8IDkuXG4gICAgaWYgKGhhc0VudW1CdWcpIGNvbGxlY3ROb25FbnVtUHJvcHMob2JqLCBrZXlzKTtcbiAgICByZXR1cm4ga2V5cztcbiAgfTtcblxuICAvLyBSZXRyaWV2ZSBhbGwgdGhlIHByb3BlcnR5IG5hbWVzIG9mIGFuIG9iamVjdC5cbiAgXy5hbGxLZXlzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKCFfLmlzT2JqZWN0KG9iaikpIHJldHVybiBbXTtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIGtleXMucHVzaChrZXkpO1xuICAgIC8vIEFoZW0sIElFIDwgOS5cbiAgICBpZiAoaGFzRW51bUJ1ZykgY29sbGVjdE5vbkVudW1Qcm9wcyhvYmosIGtleXMpO1xuICAgIHJldHVybiBrZXlzO1xuICB9O1xuXG4gIC8vIFJldHJpZXZlIHRoZSB2YWx1ZXMgb2YgYW4gb2JqZWN0J3MgcHJvcGVydGllcy5cbiAgXy52YWx1ZXMgPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIga2V5cyA9IF8ua2V5cyhvYmopO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgdmFsdWVzID0gQXJyYXkobGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB2YWx1ZXNbaV0gPSBvYmpba2V5c1tpXV07XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZXM7XG4gIH07XG5cbiAgLy8gUmV0dXJucyB0aGUgcmVzdWx0cyBvZiBhcHBseWluZyB0aGUgaXRlcmF0ZWUgdG8gZWFjaCBlbGVtZW50IG9mIHRoZSBvYmplY3QuXG4gIC8vIEluIGNvbnRyYXN0IHRvIF8ubWFwIGl0IHJldHVybnMgYW4gb2JqZWN0LlxuICBfLm1hcE9iamVjdCA9IGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICBpdGVyYXRlZSA9IGNiKGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgICB2YXIga2V5cyA9IF8ua2V5cyhvYmopLFxuICAgICAgICBsZW5ndGggPSBrZXlzLmxlbmd0aCxcbiAgICAgICAgcmVzdWx0cyA9IHt9O1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHZhciBjdXJyZW50S2V5ID0ga2V5c1tpbmRleF07XG4gICAgICByZXN1bHRzW2N1cnJlbnRLZXldID0gaXRlcmF0ZWUob2JqW2N1cnJlbnRLZXldLCBjdXJyZW50S2V5LCBvYmopO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfTtcblxuICAvLyBDb252ZXJ0IGFuIG9iamVjdCBpbnRvIGEgbGlzdCBvZiBgW2tleSwgdmFsdWVdYCBwYWlycy5cbiAgLy8gVGhlIG9wcG9zaXRlIG9mIF8ub2JqZWN0LlxuICBfLnBhaXJzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIGtleXMgPSBfLmtleXMob2JqKTtcbiAgICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgdmFyIHBhaXJzID0gQXJyYXkobGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBwYWlyc1tpXSA9IFtrZXlzW2ldLCBvYmpba2V5c1tpXV1dO1xuICAgIH1cbiAgICByZXR1cm4gcGFpcnM7XG4gIH07XG5cbiAgLy8gSW52ZXJ0IHRoZSBrZXlzIGFuZCB2YWx1ZXMgb2YgYW4gb2JqZWN0LiBUaGUgdmFsdWVzIG11c3QgYmUgc2VyaWFsaXphYmxlLlxuICBfLmludmVydCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICB2YXIga2V5cyA9IF8ua2V5cyhvYmopO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBrZXlzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICByZXN1bHRbb2JqW2tleXNbaV1dXSA9IGtleXNbaV07XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLy8gUmV0dXJuIGEgc29ydGVkIGxpc3Qgb2YgdGhlIGZ1bmN0aW9uIG5hbWVzIGF2YWlsYWJsZSBvbiB0aGUgb2JqZWN0LlxuICAvLyBBbGlhc2VkIGFzIGBtZXRob2RzYC5cbiAgXy5mdW5jdGlvbnMgPSBfLm1ldGhvZHMgPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIgbmFtZXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoXy5pc0Z1bmN0aW9uKG9ialtrZXldKSkgbmFtZXMucHVzaChrZXkpO1xuICAgIH1cbiAgICByZXR1cm4gbmFtZXMuc29ydCgpO1xuICB9O1xuXG4gIC8vIEFuIGludGVybmFsIGZ1bmN0aW9uIGZvciBjcmVhdGluZyBhc3NpZ25lciBmdW5jdGlvbnMuXG4gIHZhciBjcmVhdGVBc3NpZ25lciA9IGZ1bmN0aW9uKGtleXNGdW5jLCBkZWZhdWx0cykge1xuICAgIHJldHVybiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHZhciBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgaWYgKGRlZmF1bHRzKSBvYmogPSBPYmplY3Qob2JqKTtcbiAgICAgIGlmIChsZW5ndGggPCAyIHx8IG9iaiA9PSBudWxsKSByZXR1cm4gb2JqO1xuICAgICAgZm9yICh2YXIgaW5kZXggPSAxOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2luZGV4XSxcbiAgICAgICAgICAgIGtleXMgPSBrZXlzRnVuYyhzb3VyY2UpLFxuICAgICAgICAgICAgbCA9IGtleXMubGVuZ3RoO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgIGlmICghZGVmYXVsdHMgfHwgb2JqW2tleV0gPT09IHZvaWQgMCkgb2JqW2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG9iajtcbiAgICB9O1xuICB9O1xuXG4gIC8vIEV4dGVuZCBhIGdpdmVuIG9iamVjdCB3aXRoIGFsbCB0aGUgcHJvcGVydGllcyBpbiBwYXNzZWQtaW4gb2JqZWN0KHMpLlxuICBfLmV4dGVuZCA9IGNyZWF0ZUFzc2lnbmVyKF8uYWxsS2V5cyk7XG5cbiAgLy8gQXNzaWducyBhIGdpdmVuIG9iamVjdCB3aXRoIGFsbCB0aGUgb3duIHByb3BlcnRpZXMgaW4gdGhlIHBhc3NlZC1pbiBvYmplY3QocykuXG4gIC8vIChodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvYXNzaWduKVxuICBfLmV4dGVuZE93biA9IF8uYXNzaWduID0gY3JlYXRlQXNzaWduZXIoXy5rZXlzKTtcblxuICAvLyBSZXR1cm5zIHRoZSBmaXJzdCBrZXkgb24gYW4gb2JqZWN0IHRoYXQgcGFzc2VzIGEgcHJlZGljYXRlIHRlc3QuXG4gIF8uZmluZEtleSA9IGZ1bmN0aW9uKG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgcHJlZGljYXRlID0gY2IocHJlZGljYXRlLCBjb250ZXh0KTtcbiAgICB2YXIga2V5cyA9IF8ua2V5cyhvYmopLCBrZXk7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGtleXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICBpZiAocHJlZGljYXRlKG9ialtrZXldLCBrZXksIG9iaikpIHJldHVybiBrZXk7XG4gICAgfVxuICB9O1xuXG4gIC8vIEludGVybmFsIHBpY2sgaGVscGVyIGZ1bmN0aW9uIHRvIGRldGVybWluZSBpZiBgb2JqYCBoYXMga2V5IGBrZXlgLlxuICB2YXIga2V5SW5PYmogPSBmdW5jdGlvbih2YWx1ZSwga2V5LCBvYmopIHtcbiAgICByZXR1cm4ga2V5IGluIG9iajtcbiAgfTtcblxuICAvLyBSZXR1cm4gYSBjb3B5IG9mIHRoZSBvYmplY3Qgb25seSBjb250YWluaW5nIHRoZSB3aGl0ZWxpc3RlZCBwcm9wZXJ0aWVzLlxuICBfLnBpY2sgPSByZXN0QXJndW1lbnRzKGZ1bmN0aW9uKG9iaiwga2V5cykge1xuICAgIHZhciByZXN1bHQgPSB7fSwgaXRlcmF0ZWUgPSBrZXlzWzBdO1xuICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIHJlc3VsdDtcbiAgICBpZiAoXy5pc0Z1bmN0aW9uKGl0ZXJhdGVlKSkge1xuICAgICAgaWYgKGtleXMubGVuZ3RoID4gMSkgaXRlcmF0ZWUgPSBvcHRpbWl6ZUNiKGl0ZXJhdGVlLCBrZXlzWzFdKTtcbiAgICAgIGtleXMgPSBfLmFsbEtleXMob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaXRlcmF0ZWUgPSBrZXlJbk9iajtcbiAgICAgIGtleXMgPSBmbGF0dGVuKGtleXMsIGZhbHNlLCBmYWxzZSk7XG4gICAgICBvYmogPSBPYmplY3Qob2JqKTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGtleXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgdmFyIHZhbHVlID0gb2JqW2tleV07XG4gICAgICBpZiAoaXRlcmF0ZWUodmFsdWUsIGtleSwgb2JqKSkgcmVzdWx0W2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSk7XG5cbiAgLy8gUmV0dXJuIGEgY29weSBvZiB0aGUgb2JqZWN0IHdpdGhvdXQgdGhlIGJsYWNrbGlzdGVkIHByb3BlcnRpZXMuXG4gIF8ub21pdCA9IHJlc3RBcmd1bWVudHMoZnVuY3Rpb24ob2JqLCBrZXlzKSB7XG4gICAgdmFyIGl0ZXJhdGVlID0ga2V5c1swXSwgY29udGV4dDtcbiAgICBpZiAoXy5pc0Z1bmN0aW9uKGl0ZXJhdGVlKSkge1xuICAgICAgaXRlcmF0ZWUgPSBfLm5lZ2F0ZShpdGVyYXRlZSk7XG4gICAgICBpZiAoa2V5cy5sZW5ndGggPiAxKSBjb250ZXh0ID0ga2V5c1sxXTtcbiAgICB9IGVsc2Uge1xuICAgICAga2V5cyA9IF8ubWFwKGZsYXR0ZW4oa2V5cywgZmFsc2UsIGZhbHNlKSwgU3RyaW5nKTtcbiAgICAgIGl0ZXJhdGVlID0gZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgICAgICByZXR1cm4gIV8uY29udGFpbnMoa2V5cywga2V5KTtcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBfLnBpY2sob2JqLCBpdGVyYXRlZSwgY29udGV4dCk7XG4gIH0pO1xuXG4gIC8vIEZpbGwgaW4gYSBnaXZlbiBvYmplY3Qgd2l0aCBkZWZhdWx0IHByb3BlcnRpZXMuXG4gIF8uZGVmYXVsdHMgPSBjcmVhdGVBc3NpZ25lcihfLmFsbEtleXMsIHRydWUpO1xuXG4gIC8vIENyZWF0ZXMgYW4gb2JqZWN0IHRoYXQgaW5oZXJpdHMgZnJvbSB0aGUgZ2l2ZW4gcHJvdG90eXBlIG9iamVjdC5cbiAgLy8gSWYgYWRkaXRpb25hbCBwcm9wZXJ0aWVzIGFyZSBwcm92aWRlZCB0aGVuIHRoZXkgd2lsbCBiZSBhZGRlZCB0byB0aGVcbiAgLy8gY3JlYXRlZCBvYmplY3QuXG4gIF8uY3JlYXRlID0gZnVuY3Rpb24ocHJvdG90eXBlLCBwcm9wcykge1xuICAgIHZhciByZXN1bHQgPSBiYXNlQ3JlYXRlKHByb3RvdHlwZSk7XG4gICAgaWYgKHByb3BzKSBfLmV4dGVuZE93bihyZXN1bHQsIHByb3BzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIENyZWF0ZSBhIChzaGFsbG93LWNsb25lZCkgZHVwbGljYXRlIG9mIGFuIG9iamVjdC5cbiAgXy5jbG9uZSA9IGZ1bmN0aW9uKG9iaikge1xuICAgIGlmICghXy5pc09iamVjdChvYmopKSByZXR1cm4gb2JqO1xuICAgIHJldHVybiBfLmlzQXJyYXkob2JqKSA/IG9iai5zbGljZSgpIDogXy5leHRlbmQoe30sIG9iaik7XG4gIH07XG5cbiAgLy8gSW52b2tlcyBpbnRlcmNlcHRvciB3aXRoIHRoZSBvYmosIGFuZCB0aGVuIHJldHVybnMgb2JqLlxuICAvLyBUaGUgcHJpbWFyeSBwdXJwb3NlIG9mIHRoaXMgbWV0aG9kIGlzIHRvIFwidGFwIGludG9cIiBhIG1ldGhvZCBjaGFpbiwgaW5cbiAgLy8gb3JkZXIgdG8gcGVyZm9ybSBvcGVyYXRpb25zIG9uIGludGVybWVkaWF0ZSByZXN1bHRzIHdpdGhpbiB0aGUgY2hhaW4uXG4gIF8udGFwID0gZnVuY3Rpb24ob2JqLCBpbnRlcmNlcHRvcikge1xuICAgIGludGVyY2VwdG9yKG9iaik7XG4gICAgcmV0dXJuIG9iajtcbiAgfTtcblxuICAvLyBSZXR1cm5zIHdoZXRoZXIgYW4gb2JqZWN0IGhhcyBhIGdpdmVuIHNldCBvZiBga2V5OnZhbHVlYCBwYWlycy5cbiAgXy5pc01hdGNoID0gZnVuY3Rpb24ob2JqZWN0LCBhdHRycykge1xuICAgIHZhciBrZXlzID0gXy5rZXlzKGF0dHJzKSwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgaWYgKG9iamVjdCA9PSBudWxsKSByZXR1cm4gIWxlbmd0aDtcbiAgICB2YXIgb2JqID0gT2JqZWN0KG9iamVjdCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgICBpZiAoYXR0cnNba2V5XSAhPT0gb2JqW2tleV0gfHwgIShrZXkgaW4gb2JqKSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuXG4gIC8vIEludGVybmFsIHJlY3Vyc2l2ZSBjb21wYXJpc29uIGZ1bmN0aW9uIGZvciBgaXNFcXVhbGAuXG4gIHZhciBlcSwgZGVlcEVxO1xuICBlcSA9IGZ1bmN0aW9uKGEsIGIsIGFTdGFjaywgYlN0YWNrKSB7XG4gICAgLy8gSWRlbnRpY2FsIG9iamVjdHMgYXJlIGVxdWFsLiBgMCA9PT0gLTBgLCBidXQgdGhleSBhcmVuJ3QgaWRlbnRpY2FsLlxuICAgIC8vIFNlZSB0aGUgW0hhcm1vbnkgYGVnYWxgIHByb3Bvc2FsXShodHRwOi8vd2lraS5lY21hc2NyaXB0Lm9yZy9kb2t1LnBocD9pZD1oYXJtb255OmVnYWwpLlxuICAgIGlmIChhID09PSBiKSByZXR1cm4gYSAhPT0gMCB8fCAxIC8gYSA9PT0gMSAvIGI7XG4gICAgLy8gYG51bGxgIG9yIGB1bmRlZmluZWRgIG9ubHkgZXF1YWwgdG8gaXRzZWxmIChzdHJpY3QgY29tcGFyaXNvbikuXG4gICAgaWYgKGEgPT0gbnVsbCB8fCBiID09IG51bGwpIHJldHVybiBmYWxzZTtcbiAgICAvLyBgTmFOYHMgYXJlIGVxdWl2YWxlbnQsIGJ1dCBub24tcmVmbGV4aXZlLlxuICAgIGlmIChhICE9PSBhKSByZXR1cm4gYiAhPT0gYjtcbiAgICAvLyBFeGhhdXN0IHByaW1pdGl2ZSBjaGVja3NcbiAgICB2YXIgdHlwZSA9IHR5cGVvZiBhO1xuICAgIGlmICh0eXBlICE9PSAnZnVuY3Rpb24nICYmIHR5cGUgIT09ICdvYmplY3QnICYmIHR5cGVvZiBiICE9ICdvYmplY3QnKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIGRlZXBFcShhLCBiLCBhU3RhY2ssIGJTdGFjayk7XG4gIH07XG5cbiAgLy8gSW50ZXJuYWwgcmVjdXJzaXZlIGNvbXBhcmlzb24gZnVuY3Rpb24gZm9yIGBpc0VxdWFsYC5cbiAgZGVlcEVxID0gZnVuY3Rpb24oYSwgYiwgYVN0YWNrLCBiU3RhY2spIHtcbiAgICAvLyBVbndyYXAgYW55IHdyYXBwZWQgb2JqZWN0cy5cbiAgICBpZiAoYSBpbnN0YW5jZW9mIF8pIGEgPSBhLl93cmFwcGVkO1xuICAgIGlmIChiIGluc3RhbmNlb2YgXykgYiA9IGIuX3dyYXBwZWQ7XG4gICAgLy8gQ29tcGFyZSBgW1tDbGFzc11dYCBuYW1lcy5cbiAgICB2YXIgY2xhc3NOYW1lID0gdG9TdHJpbmcuY2FsbChhKTtcbiAgICBpZiAoY2xhc3NOYW1lICE9PSB0b1N0cmluZy5jYWxsKGIpKSByZXR1cm4gZmFsc2U7XG4gICAgc3dpdGNoIChjbGFzc05hbWUpIHtcbiAgICAgIC8vIFN0cmluZ3MsIG51bWJlcnMsIHJlZ3VsYXIgZXhwcmVzc2lvbnMsIGRhdGVzLCBhbmQgYm9vbGVhbnMgYXJlIGNvbXBhcmVkIGJ5IHZhbHVlLlxuICAgICAgY2FzZSAnW29iamVjdCBSZWdFeHBdJzpcbiAgICAgIC8vIFJlZ0V4cHMgYXJlIGNvZXJjZWQgdG8gc3RyaW5ncyBmb3IgY29tcGFyaXNvbiAoTm90ZTogJycgKyAvYS9pID09PSAnL2EvaScpXG4gICAgICBjYXNlICdbb2JqZWN0IFN0cmluZ10nOlxuICAgICAgICAvLyBQcmltaXRpdmVzIGFuZCB0aGVpciBjb3JyZXNwb25kaW5nIG9iamVjdCB3cmFwcGVycyBhcmUgZXF1aXZhbGVudDsgdGh1cywgYFwiNVwiYCBpc1xuICAgICAgICAvLyBlcXVpdmFsZW50IHRvIGBuZXcgU3RyaW5nKFwiNVwiKWAuXG4gICAgICAgIHJldHVybiAnJyArIGEgPT09ICcnICsgYjtcbiAgICAgIGNhc2UgJ1tvYmplY3QgTnVtYmVyXSc6XG4gICAgICAgIC8vIGBOYU5gcyBhcmUgZXF1aXZhbGVudCwgYnV0IG5vbi1yZWZsZXhpdmUuXG4gICAgICAgIC8vIE9iamVjdChOYU4pIGlzIGVxdWl2YWxlbnQgdG8gTmFOLlxuICAgICAgICBpZiAoK2EgIT09ICthKSByZXR1cm4gK2IgIT09ICtiO1xuICAgICAgICAvLyBBbiBgZWdhbGAgY29tcGFyaXNvbiBpcyBwZXJmb3JtZWQgZm9yIG90aGVyIG51bWVyaWMgdmFsdWVzLlxuICAgICAgICByZXR1cm4gK2EgPT09IDAgPyAxIC8gK2EgPT09IDEgLyBiIDogK2EgPT09ICtiO1xuICAgICAgY2FzZSAnW29iamVjdCBEYXRlXSc6XG4gICAgICBjYXNlICdbb2JqZWN0IEJvb2xlYW5dJzpcbiAgICAgICAgLy8gQ29lcmNlIGRhdGVzIGFuZCBib29sZWFucyB0byBudW1lcmljIHByaW1pdGl2ZSB2YWx1ZXMuIERhdGVzIGFyZSBjb21wYXJlZCBieSB0aGVpclxuICAgICAgICAvLyBtaWxsaXNlY29uZCByZXByZXNlbnRhdGlvbnMuIE5vdGUgdGhhdCBpbnZhbGlkIGRhdGVzIHdpdGggbWlsbGlzZWNvbmQgcmVwcmVzZW50YXRpb25zXG4gICAgICAgIC8vIG9mIGBOYU5gIGFyZSBub3QgZXF1aXZhbGVudC5cbiAgICAgICAgcmV0dXJuICthID09PSArYjtcbiAgICAgIGNhc2UgJ1tvYmplY3QgU3ltYm9sXSc6XG4gICAgICAgIHJldHVybiBTeW1ib2xQcm90by52YWx1ZU9mLmNhbGwoYSkgPT09IFN5bWJvbFByb3RvLnZhbHVlT2YuY2FsbChiKTtcbiAgICB9XG5cbiAgICB2YXIgYXJlQXJyYXlzID0gY2xhc3NOYW1lID09PSAnW29iamVjdCBBcnJheV0nO1xuICAgIGlmICghYXJlQXJyYXlzKSB7XG4gICAgICBpZiAodHlwZW9mIGEgIT0gJ29iamVjdCcgfHwgdHlwZW9mIGIgIT0gJ29iamVjdCcpIHJldHVybiBmYWxzZTtcblxuICAgICAgLy8gT2JqZWN0cyB3aXRoIGRpZmZlcmVudCBjb25zdHJ1Y3RvcnMgYXJlIG5vdCBlcXVpdmFsZW50LCBidXQgYE9iamVjdGBzIG9yIGBBcnJheWBzXG4gICAgICAvLyBmcm9tIGRpZmZlcmVudCBmcmFtZXMgYXJlLlxuICAgICAgdmFyIGFDdG9yID0gYS5jb25zdHJ1Y3RvciwgYkN0b3IgPSBiLmNvbnN0cnVjdG9yO1xuICAgICAgaWYgKGFDdG9yICE9PSBiQ3RvciAmJiAhKF8uaXNGdW5jdGlvbihhQ3RvcikgJiYgYUN0b3IgaW5zdGFuY2VvZiBhQ3RvciAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uaXNGdW5jdGlvbihiQ3RvcikgJiYgYkN0b3IgaW5zdGFuY2VvZiBiQ3RvcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgKCdjb25zdHJ1Y3RvcicgaW4gYSAmJiAnY29uc3RydWN0b3InIGluIGIpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gQXNzdW1lIGVxdWFsaXR5IGZvciBjeWNsaWMgc3RydWN0dXJlcy4gVGhlIGFsZ29yaXRobSBmb3IgZGV0ZWN0aW5nIGN5Y2xpY1xuICAgIC8vIHN0cnVjdHVyZXMgaXMgYWRhcHRlZCBmcm9tIEVTIDUuMSBzZWN0aW9uIDE1LjEyLjMsIGFic3RyYWN0IG9wZXJhdGlvbiBgSk9gLlxuXG4gICAgLy8gSW5pdGlhbGl6aW5nIHN0YWNrIG9mIHRyYXZlcnNlZCBvYmplY3RzLlxuICAgIC8vIEl0J3MgZG9uZSBoZXJlIHNpbmNlIHdlIG9ubHkgbmVlZCB0aGVtIGZvciBvYmplY3RzIGFuZCBhcnJheXMgY29tcGFyaXNvbi5cbiAgICBhU3RhY2sgPSBhU3RhY2sgfHwgW107XG4gICAgYlN0YWNrID0gYlN0YWNrIHx8IFtdO1xuICAgIHZhciBsZW5ndGggPSBhU3RhY2subGVuZ3RoO1xuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgLy8gTGluZWFyIHNlYXJjaC4gUGVyZm9ybWFuY2UgaXMgaW52ZXJzZWx5IHByb3BvcnRpb25hbCB0byB0aGUgbnVtYmVyIG9mXG4gICAgICAvLyB1bmlxdWUgbmVzdGVkIHN0cnVjdHVyZXMuXG4gICAgICBpZiAoYVN0YWNrW2xlbmd0aF0gPT09IGEpIHJldHVybiBiU3RhY2tbbGVuZ3RoXSA9PT0gYjtcbiAgICB9XG5cbiAgICAvLyBBZGQgdGhlIGZpcnN0IG9iamVjdCB0byB0aGUgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHMuXG4gICAgYVN0YWNrLnB1c2goYSk7XG4gICAgYlN0YWNrLnB1c2goYik7XG5cbiAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIG9iamVjdHMgYW5kIGFycmF5cy5cbiAgICBpZiAoYXJlQXJyYXlzKSB7XG4gICAgICAvLyBDb21wYXJlIGFycmF5IGxlbmd0aHMgdG8gZGV0ZXJtaW5lIGlmIGEgZGVlcCBjb21wYXJpc29uIGlzIG5lY2Vzc2FyeS5cbiAgICAgIGxlbmd0aCA9IGEubGVuZ3RoO1xuICAgICAgaWYgKGxlbmd0aCAhPT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgICAgIC8vIERlZXAgY29tcGFyZSB0aGUgY29udGVudHMsIGlnbm9yaW5nIG5vbi1udW1lcmljIHByb3BlcnRpZXMuXG4gICAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgICAgaWYgKCFlcShhW2xlbmd0aF0sIGJbbGVuZ3RoXSwgYVN0YWNrLCBiU3RhY2spKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIERlZXAgY29tcGFyZSBvYmplY3RzLlxuICAgICAgdmFyIGtleXMgPSBfLmtleXMoYSksIGtleTtcbiAgICAgIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgICAgLy8gRW5zdXJlIHRoYXQgYm90aCBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUgbnVtYmVyIG9mIHByb3BlcnRpZXMgYmVmb3JlIGNvbXBhcmluZyBkZWVwIGVxdWFsaXR5LlxuICAgICAgaWYgKF8ua2V5cyhiKS5sZW5ndGggIT09IGxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICAgIC8vIERlZXAgY29tcGFyZSBlYWNoIG1lbWJlclxuICAgICAgICBrZXkgPSBrZXlzW2xlbmd0aF07XG4gICAgICAgIGlmICghKF8uaGFzKGIsIGtleSkgJiYgZXEoYVtrZXldLCBiW2tleV0sIGFTdGFjaywgYlN0YWNrKSkpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gUmVtb3ZlIHRoZSBmaXJzdCBvYmplY3QgZnJvbSB0aGUgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHMuXG4gICAgYVN0YWNrLnBvcCgpO1xuICAgIGJTdGFjay5wb3AoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICAvLyBQZXJmb3JtIGEgZGVlcCBjb21wYXJpc29uIHRvIGNoZWNrIGlmIHR3byBvYmplY3RzIGFyZSBlcXVhbC5cbiAgXy5pc0VxdWFsID0gZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBlcShhLCBiKTtcbiAgfTtcblxuICAvLyBJcyBhIGdpdmVuIGFycmF5LCBzdHJpbmcsIG9yIG9iamVjdCBlbXB0eT9cbiAgLy8gQW4gXCJlbXB0eVwiIG9iamVjdCBoYXMgbm8gZW51bWVyYWJsZSBvd24tcHJvcGVydGllcy5cbiAgXy5pc0VtcHR5ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAoaXNBcnJheUxpa2Uob2JqKSAmJiAoXy5pc0FycmF5KG9iaikgfHwgXy5pc1N0cmluZyhvYmopIHx8IF8uaXNBcmd1bWVudHMob2JqKSkpIHJldHVybiBvYmoubGVuZ3RoID09PSAwO1xuICAgIHJldHVybiBfLmtleXMob2JqKS5sZW5ndGggPT09IDA7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiB2YWx1ZSBhIERPTSBlbGVtZW50P1xuICBfLmlzRWxlbWVudCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiAhIShvYmogJiYgb2JqLm5vZGVUeXBlID09PSAxKTtcbiAgfTtcblxuICAvLyBJcyBhIGdpdmVuIHZhbHVlIGFuIGFycmF5P1xuICAvLyBEZWxlZ2F0ZXMgdG8gRUNNQTUncyBuYXRpdmUgQXJyYXkuaXNBcnJheVxuICBfLmlzQXJyYXkgPSBuYXRpdmVJc0FycmF5IHx8IGZ1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiB2YXJpYWJsZSBhbiBvYmplY3Q/XG4gIF8uaXNPYmplY3QgPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIgdHlwZSA9IHR5cGVvZiBvYmo7XG4gICAgcmV0dXJuIHR5cGUgPT09ICdmdW5jdGlvbicgfHwgdHlwZSA9PT0gJ29iamVjdCcgJiYgISFvYmo7XG4gIH07XG5cbiAgLy8gQWRkIHNvbWUgaXNUeXBlIG1ldGhvZHM6IGlzQXJndW1lbnRzLCBpc0Z1bmN0aW9uLCBpc1N0cmluZywgaXNOdW1iZXIsIGlzRGF0ZSwgaXNSZWdFeHAsIGlzRXJyb3IsIGlzTWFwLCBpc1dlYWtNYXAsIGlzU2V0LCBpc1dlYWtTZXQuXG4gIF8uZWFjaChbJ0FyZ3VtZW50cycsICdGdW5jdGlvbicsICdTdHJpbmcnLCAnTnVtYmVyJywgJ0RhdGUnLCAnUmVnRXhwJywgJ0Vycm9yJywgJ1N5bWJvbCcsICdNYXAnLCAnV2Vha01hcCcsICdTZXQnLCAnV2Vha1NldCddLCBmdW5jdGlvbihuYW1lKSB7XG4gICAgX1snaXMnICsgbmFtZV0gPSBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0ICcgKyBuYW1lICsgJ10nO1xuICAgIH07XG4gIH0pO1xuXG4gIC8vIERlZmluZSBhIGZhbGxiYWNrIHZlcnNpb24gb2YgdGhlIG1ldGhvZCBpbiBicm93c2VycyAoYWhlbSwgSUUgPCA5KSwgd2hlcmVcbiAgLy8gdGhlcmUgaXNuJ3QgYW55IGluc3BlY3RhYmxlIFwiQXJndW1lbnRzXCIgdHlwZS5cbiAgaWYgKCFfLmlzQXJndW1lbnRzKGFyZ3VtZW50cykpIHtcbiAgICBfLmlzQXJndW1lbnRzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gXy5oYXMob2JqLCAnY2FsbGVlJyk7XG4gICAgfTtcbiAgfVxuXG4gIC8vIE9wdGltaXplIGBpc0Z1bmN0aW9uYCBpZiBhcHByb3ByaWF0ZS4gV29yayBhcm91bmQgc29tZSB0eXBlb2YgYnVncyBpbiBvbGQgdjgsXG4gIC8vIElFIDExICgjMTYyMSksIFNhZmFyaSA4ICgjMTkyOSksIGFuZCBQaGFudG9tSlMgKCMyMjM2KS5cbiAgdmFyIG5vZGVsaXN0ID0gcm9vdC5kb2N1bWVudCAmJiByb290LmRvY3VtZW50LmNoaWxkTm9kZXM7XG4gIGlmICh0eXBlb2YgLy4vICE9ICdmdW5jdGlvbicgJiYgdHlwZW9mIEludDhBcnJheSAhPSAnb2JqZWN0JyAmJiB0eXBlb2Ygbm9kZWxpc3QgIT0gJ2Z1bmN0aW9uJykge1xuICAgIF8uaXNGdW5jdGlvbiA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT0gJ2Z1bmN0aW9uJyB8fCBmYWxzZTtcbiAgICB9O1xuICB9XG5cbiAgLy8gSXMgYSBnaXZlbiBvYmplY3QgYSBmaW5pdGUgbnVtYmVyP1xuICBfLmlzRmluaXRlID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuICFfLmlzU3ltYm9sKG9iaikgJiYgaXNGaW5pdGUob2JqKSAmJiAhaXNOYU4ocGFyc2VGbG9hdChvYmopKTtcbiAgfTtcblxuICAvLyBJcyB0aGUgZ2l2ZW4gdmFsdWUgYE5hTmA/XG4gIF8uaXNOYU4gPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gXy5pc051bWJlcihvYmopICYmIGlzTmFOKG9iaik7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiB2YWx1ZSBhIGJvb2xlYW4/XG4gIF8uaXNCb29sZWFuID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIG9iaiA9PT0gdHJ1ZSB8fCBvYmogPT09IGZhbHNlIHx8IHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgQm9vbGVhbl0nO1xuICB9O1xuXG4gIC8vIElzIGEgZ2l2ZW4gdmFsdWUgZXF1YWwgdG8gbnVsbD9cbiAgXy5pc051bGwgPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gb2JqID09PSBudWxsO1xuICB9O1xuXG4gIC8vIElzIGEgZ2l2ZW4gdmFyaWFibGUgdW5kZWZpbmVkP1xuICBfLmlzVW5kZWZpbmVkID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIG9iaiA9PT0gdm9pZCAwO1xuICB9O1xuXG4gIC8vIFNob3J0Y3V0IGZ1bmN0aW9uIGZvciBjaGVja2luZyBpZiBhbiBvYmplY3QgaGFzIGEgZ2l2ZW4gcHJvcGVydHkgZGlyZWN0bHlcbiAgLy8gb24gaXRzZWxmIChpbiBvdGhlciB3b3Jkcywgbm90IG9uIGEgcHJvdG90eXBlKS5cbiAgXy5oYXMgPSBmdW5jdGlvbihvYmosIHBhdGgpIHtcbiAgICBpZiAoIV8uaXNBcnJheShwYXRoKSkge1xuICAgICAgcmV0dXJuIG9iaiAhPSBudWxsICYmIGhhc093blByb3BlcnR5LmNhbGwob2JqLCBwYXRoKTtcbiAgICB9XG4gICAgdmFyIGxlbmd0aCA9IHBhdGgubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBrZXkgPSBwYXRoW2ldO1xuICAgICAgaWYgKG9iaiA9PSBudWxsIHx8ICFoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBvYmogPSBvYmpba2V5XTtcbiAgICB9XG4gICAgcmV0dXJuICEhbGVuZ3RoO1xuICB9O1xuXG4gIC8vIFV0aWxpdHkgRnVuY3Rpb25zXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gUnVuIFVuZGVyc2NvcmUuanMgaW4gKm5vQ29uZmxpY3QqIG1vZGUsIHJldHVybmluZyB0aGUgYF9gIHZhcmlhYmxlIHRvIGl0c1xuICAvLyBwcmV2aW91cyBvd25lci4gUmV0dXJucyBhIHJlZmVyZW5jZSB0byB0aGUgVW5kZXJzY29yZSBvYmplY3QuXG4gIF8ubm9Db25mbGljdCA9IGZ1bmN0aW9uKCkge1xuICAgIHJvb3QuXyA9IHByZXZpb3VzVW5kZXJzY29yZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvLyBLZWVwIHRoZSBpZGVudGl0eSBmdW5jdGlvbiBhcm91bmQgZm9yIGRlZmF1bHQgaXRlcmF0ZWVzLlxuICBfLmlkZW50aXR5ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG5cbiAgLy8gUHJlZGljYXRlLWdlbmVyYXRpbmcgZnVuY3Rpb25zLiBPZnRlbiB1c2VmdWwgb3V0c2lkZSBvZiBVbmRlcnNjb3JlLlxuICBfLmNvbnN0YW50ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgfTtcblxuICBfLm5vb3AgPSBmdW5jdGlvbigpe307XG5cbiAgLy8gQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQsIHdoZW4gcGFzc2VkIGFuIG9iamVjdCwgd2lsbCB0cmF2ZXJzZSB0aGF0IG9iamVjdOKAmXNcbiAgLy8gcHJvcGVydGllcyBkb3duIHRoZSBnaXZlbiBgcGF0aGAsIHNwZWNpZmllZCBhcyBhbiBhcnJheSBvZiBrZXlzIG9yIGluZGV4ZXMuXG4gIF8ucHJvcGVydHkgPSBmdW5jdGlvbihwYXRoKSB7XG4gICAgaWYgKCFfLmlzQXJyYXkocGF0aCkpIHtcbiAgICAgIHJldHVybiBzaGFsbG93UHJvcGVydHkocGF0aCk7XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBkZWVwR2V0KG9iaiwgcGF0aCk7XG4gICAgfTtcbiAgfTtcblxuICAvLyBHZW5lcmF0ZXMgYSBmdW5jdGlvbiBmb3IgYSBnaXZlbiBvYmplY3QgdGhhdCByZXR1cm5zIGEgZ2l2ZW4gcHJvcGVydHkuXG4gIF8ucHJvcGVydHlPZiA9IGZ1bmN0aW9uKG9iaikge1xuICAgIGlmIChvYmogPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCl7fTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHBhdGgpIHtcbiAgICAgIHJldHVybiAhXy5pc0FycmF5KHBhdGgpID8gb2JqW3BhdGhdIDogZGVlcEdldChvYmosIHBhdGgpO1xuICAgIH07XG4gIH07XG5cbiAgLy8gUmV0dXJucyBhIHByZWRpY2F0ZSBmb3IgY2hlY2tpbmcgd2hldGhlciBhbiBvYmplY3QgaGFzIGEgZ2l2ZW4gc2V0IG9mXG4gIC8vIGBrZXk6dmFsdWVgIHBhaXJzLlxuICBfLm1hdGNoZXIgPSBfLm1hdGNoZXMgPSBmdW5jdGlvbihhdHRycykge1xuICAgIGF0dHJzID0gXy5leHRlbmRPd24oe30sIGF0dHJzKTtcbiAgICByZXR1cm4gZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gXy5pc01hdGNoKG9iaiwgYXR0cnMpO1xuICAgIH07XG4gIH07XG5cbiAgLy8gUnVuIGEgZnVuY3Rpb24gKipuKiogdGltZXMuXG4gIF8udGltZXMgPSBmdW5jdGlvbihuLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgIHZhciBhY2N1bSA9IEFycmF5KE1hdGgubWF4KDAsIG4pKTtcbiAgICBpdGVyYXRlZSA9IG9wdGltaXplQ2IoaXRlcmF0ZWUsIGNvbnRleHQsIDEpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgaSsrKSBhY2N1bVtpXSA9IGl0ZXJhdGVlKGkpO1xuICAgIHJldHVybiBhY2N1bTtcbiAgfTtcblxuICAvLyBSZXR1cm4gYSByYW5kb20gaW50ZWdlciBiZXR3ZWVuIG1pbiBhbmQgbWF4IChpbmNsdXNpdmUpLlxuICBfLnJhbmRvbSA9IGZ1bmN0aW9uKG1pbiwgbWF4KSB7XG4gICAgaWYgKG1heCA9PSBudWxsKSB7XG4gICAgICBtYXggPSBtaW47XG4gICAgICBtaW4gPSAwO1xuICAgIH1cbiAgICByZXR1cm4gbWluICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKTtcbiAgfTtcblxuICAvLyBBIChwb3NzaWJseSBmYXN0ZXIpIHdheSB0byBnZXQgdGhlIGN1cnJlbnQgdGltZXN0YW1wIGFzIGFuIGludGVnZXIuXG4gIF8ubm93ID0gRGF0ZS5ub3cgfHwgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICB9O1xuXG4gIC8vIExpc3Qgb2YgSFRNTCBlbnRpdGllcyBmb3IgZXNjYXBpbmcuXG4gIHZhciBlc2NhcGVNYXAgPSB7XG4gICAgJyYnOiAnJmFtcDsnLFxuICAgICc8JzogJyZsdDsnLFxuICAgICc+JzogJyZndDsnLFxuICAgICdcIic6ICcmcXVvdDsnLFxuICAgIFwiJ1wiOiAnJiN4Mjc7JyxcbiAgICAnYCc6ICcmI3g2MDsnXG4gIH07XG4gIHZhciB1bmVzY2FwZU1hcCA9IF8uaW52ZXJ0KGVzY2FwZU1hcCk7XG5cbiAgLy8gRnVuY3Rpb25zIGZvciBlc2NhcGluZyBhbmQgdW5lc2NhcGluZyBzdHJpbmdzIHRvL2Zyb20gSFRNTCBpbnRlcnBvbGF0aW9uLlxuICB2YXIgY3JlYXRlRXNjYXBlciA9IGZ1bmN0aW9uKG1hcCkge1xuICAgIHZhciBlc2NhcGVyID0gZnVuY3Rpb24obWF0Y2gpIHtcbiAgICAgIHJldHVybiBtYXBbbWF0Y2hdO1xuICAgIH07XG4gICAgLy8gUmVnZXhlcyBmb3IgaWRlbnRpZnlpbmcgYSBrZXkgdGhhdCBuZWVkcyB0byBiZSBlc2NhcGVkLlxuICAgIHZhciBzb3VyY2UgPSAnKD86JyArIF8ua2V5cyhtYXApLmpvaW4oJ3wnKSArICcpJztcbiAgICB2YXIgdGVzdFJlZ2V4cCA9IFJlZ0V4cChzb3VyY2UpO1xuICAgIHZhciByZXBsYWNlUmVnZXhwID0gUmVnRXhwKHNvdXJjZSwgJ2cnKTtcbiAgICByZXR1cm4gZnVuY3Rpb24oc3RyaW5nKSB7XG4gICAgICBzdHJpbmcgPSBzdHJpbmcgPT0gbnVsbCA/ICcnIDogJycgKyBzdHJpbmc7XG4gICAgICByZXR1cm4gdGVzdFJlZ2V4cC50ZXN0KHN0cmluZykgPyBzdHJpbmcucmVwbGFjZShyZXBsYWNlUmVnZXhwLCBlc2NhcGVyKSA6IHN0cmluZztcbiAgICB9O1xuICB9O1xuICBfLmVzY2FwZSA9IGNyZWF0ZUVzY2FwZXIoZXNjYXBlTWFwKTtcbiAgXy51bmVzY2FwZSA9IGNyZWF0ZUVzY2FwZXIodW5lc2NhcGVNYXApO1xuXG4gIC8vIFRyYXZlcnNlcyB0aGUgY2hpbGRyZW4gb2YgYG9iamAgYWxvbmcgYHBhdGhgLiBJZiBhIGNoaWxkIGlzIGEgZnVuY3Rpb24sIGl0XG4gIC8vIGlzIGludm9rZWQgd2l0aCBpdHMgcGFyZW50IGFzIGNvbnRleHQuIFJldHVybnMgdGhlIHZhbHVlIG9mIHRoZSBmaW5hbFxuICAvLyBjaGlsZCwgb3IgYGZhbGxiYWNrYCBpZiBhbnkgY2hpbGQgaXMgdW5kZWZpbmVkLlxuICBfLnJlc3VsdCA9IGZ1bmN0aW9uKG9iaiwgcGF0aCwgZmFsbGJhY2spIHtcbiAgICBpZiAoIV8uaXNBcnJheShwYXRoKSkgcGF0aCA9IFtwYXRoXTtcbiAgICB2YXIgbGVuZ3RoID0gcGF0aC5sZW5ndGg7XG4gICAgaWYgKCFsZW5ndGgpIHtcbiAgICAgIHJldHVybiBfLmlzRnVuY3Rpb24oZmFsbGJhY2spID8gZmFsbGJhY2suY2FsbChvYmopIDogZmFsbGJhY2s7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBwcm9wID0gb2JqID09IG51bGwgPyB2b2lkIDAgOiBvYmpbcGF0aFtpXV07XG4gICAgICBpZiAocHJvcCA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHByb3AgPSBmYWxsYmFjaztcbiAgICAgICAgaSA9IGxlbmd0aDsgLy8gRW5zdXJlIHdlIGRvbid0IGNvbnRpbnVlIGl0ZXJhdGluZy5cbiAgICAgIH1cbiAgICAgIG9iaiA9IF8uaXNGdW5jdGlvbihwcm9wKSA/IHByb3AuY2FsbChvYmopIDogcHJvcDtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfTtcblxuICAvLyBHZW5lcmF0ZSBhIHVuaXF1ZSBpbnRlZ2VyIGlkICh1bmlxdWUgd2l0aGluIHRoZSBlbnRpcmUgY2xpZW50IHNlc3Npb24pLlxuICAvLyBVc2VmdWwgZm9yIHRlbXBvcmFyeSBET00gaWRzLlxuICB2YXIgaWRDb3VudGVyID0gMDtcbiAgXy51bmlxdWVJZCA9IGZ1bmN0aW9uKHByZWZpeCkge1xuICAgIHZhciBpZCA9ICsraWRDb3VudGVyICsgJyc7XG4gICAgcmV0dXJuIHByZWZpeCA/IHByZWZpeCArIGlkIDogaWQ7XG4gIH07XG5cbiAgLy8gQnkgZGVmYXVsdCwgVW5kZXJzY29yZSB1c2VzIEVSQi1zdHlsZSB0ZW1wbGF0ZSBkZWxpbWl0ZXJzLCBjaGFuZ2UgdGhlXG4gIC8vIGZvbGxvd2luZyB0ZW1wbGF0ZSBzZXR0aW5ncyB0byB1c2UgYWx0ZXJuYXRpdmUgZGVsaW1pdGVycy5cbiAgXy50ZW1wbGF0ZVNldHRpbmdzID0ge1xuICAgIGV2YWx1YXRlOiAvPCUoW1xcc1xcU10rPyklPi9nLFxuICAgIGludGVycG9sYXRlOiAvPCU9KFtcXHNcXFNdKz8pJT4vZyxcbiAgICBlc2NhcGU6IC88JS0oW1xcc1xcU10rPyklPi9nXG4gIH07XG5cbiAgLy8gV2hlbiBjdXN0b21pemluZyBgdGVtcGxhdGVTZXR0aW5nc2AsIGlmIHlvdSBkb24ndCB3YW50IHRvIGRlZmluZSBhblxuICAvLyBpbnRlcnBvbGF0aW9uLCBldmFsdWF0aW9uIG9yIGVzY2FwaW5nIHJlZ2V4LCB3ZSBuZWVkIG9uZSB0aGF0IGlzXG4gIC8vIGd1YXJhbnRlZWQgbm90IHRvIG1hdGNoLlxuICB2YXIgbm9NYXRjaCA9IC8oLileLztcblxuICAvLyBDZXJ0YWluIGNoYXJhY3RlcnMgbmVlZCB0byBiZSBlc2NhcGVkIHNvIHRoYXQgdGhleSBjYW4gYmUgcHV0IGludG8gYVxuICAvLyBzdHJpbmcgbGl0ZXJhbC5cbiAgdmFyIGVzY2FwZXMgPSB7XG4gICAgXCInXCI6IFwiJ1wiLFxuICAgICdcXFxcJzogJ1xcXFwnLFxuICAgICdcXHInOiAncicsXG4gICAgJ1xcbic6ICduJyxcbiAgICAnXFx1MjAyOCc6ICd1MjAyOCcsXG4gICAgJ1xcdTIwMjknOiAndTIwMjknXG4gIH07XG5cbiAgdmFyIGVzY2FwZVJlZ0V4cCA9IC9cXFxcfCd8XFxyfFxcbnxcXHUyMDI4fFxcdTIwMjkvZztcblxuICB2YXIgZXNjYXBlQ2hhciA9IGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgcmV0dXJuICdcXFxcJyArIGVzY2FwZXNbbWF0Y2hdO1xuICB9O1xuXG4gIC8vIEphdmFTY3JpcHQgbWljcm8tdGVtcGxhdGluZywgc2ltaWxhciB0byBKb2huIFJlc2lnJ3MgaW1wbGVtZW50YXRpb24uXG4gIC8vIFVuZGVyc2NvcmUgdGVtcGxhdGluZyBoYW5kbGVzIGFyYml0cmFyeSBkZWxpbWl0ZXJzLCBwcmVzZXJ2ZXMgd2hpdGVzcGFjZSxcbiAgLy8gYW5kIGNvcnJlY3RseSBlc2NhcGVzIHF1b3RlcyB3aXRoaW4gaW50ZXJwb2xhdGVkIGNvZGUuXG4gIC8vIE5COiBgb2xkU2V0dGluZ3NgIG9ubHkgZXhpc3RzIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eS5cbiAgXy50ZW1wbGF0ZSA9IGZ1bmN0aW9uKHRleHQsIHNldHRpbmdzLCBvbGRTZXR0aW5ncykge1xuICAgIGlmICghc2V0dGluZ3MgJiYgb2xkU2V0dGluZ3MpIHNldHRpbmdzID0gb2xkU2V0dGluZ3M7XG4gICAgc2V0dGluZ3MgPSBfLmRlZmF1bHRzKHt9LCBzZXR0aW5ncywgXy50ZW1wbGF0ZVNldHRpbmdzKTtcblxuICAgIC8vIENvbWJpbmUgZGVsaW1pdGVycyBpbnRvIG9uZSByZWd1bGFyIGV4cHJlc3Npb24gdmlhIGFsdGVybmF0aW9uLlxuICAgIHZhciBtYXRjaGVyID0gUmVnRXhwKFtcbiAgICAgIChzZXR0aW5ncy5lc2NhcGUgfHwgbm9NYXRjaCkuc291cmNlLFxuICAgICAgKHNldHRpbmdzLmludGVycG9sYXRlIHx8IG5vTWF0Y2gpLnNvdXJjZSxcbiAgICAgIChzZXR0aW5ncy5ldmFsdWF0ZSB8fCBub01hdGNoKS5zb3VyY2VcbiAgICBdLmpvaW4oJ3wnKSArICd8JCcsICdnJyk7XG5cbiAgICAvLyBDb21waWxlIHRoZSB0ZW1wbGF0ZSBzb3VyY2UsIGVzY2FwaW5nIHN0cmluZyBsaXRlcmFscyBhcHByb3ByaWF0ZWx5LlxuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIHNvdXJjZSA9IFwiX19wKz0nXCI7XG4gICAgdGV4dC5yZXBsYWNlKG1hdGNoZXIsIGZ1bmN0aW9uKG1hdGNoLCBlc2NhcGUsIGludGVycG9sYXRlLCBldmFsdWF0ZSwgb2Zmc2V0KSB7XG4gICAgICBzb3VyY2UgKz0gdGV4dC5zbGljZShpbmRleCwgb2Zmc2V0KS5yZXBsYWNlKGVzY2FwZVJlZ0V4cCwgZXNjYXBlQ2hhcik7XG4gICAgICBpbmRleCA9IG9mZnNldCArIG1hdGNoLmxlbmd0aDtcblxuICAgICAgaWYgKGVzY2FwZSkge1xuICAgICAgICBzb3VyY2UgKz0gXCInK1xcbigoX190PShcIiArIGVzY2FwZSArIFwiKSk9PW51bGw/Jyc6Xy5lc2NhcGUoX190KSkrXFxuJ1wiO1xuICAgICAgfSBlbHNlIGlmIChpbnRlcnBvbGF0ZSkge1xuICAgICAgICBzb3VyY2UgKz0gXCInK1xcbigoX190PShcIiArIGludGVycG9sYXRlICsgXCIpKT09bnVsbD8nJzpfX3QpK1xcbidcIjtcbiAgICAgIH0gZWxzZSBpZiAoZXZhbHVhdGUpIHtcbiAgICAgICAgc291cmNlICs9IFwiJztcXG5cIiArIGV2YWx1YXRlICsgXCJcXG5fX3ArPSdcIjtcbiAgICAgIH1cblxuICAgICAgLy8gQWRvYmUgVk1zIG5lZWQgdGhlIG1hdGNoIHJldHVybmVkIHRvIHByb2R1Y2UgdGhlIGNvcnJlY3Qgb2Zmc2V0LlxuICAgICAgcmV0dXJuIG1hdGNoO1xuICAgIH0pO1xuICAgIHNvdXJjZSArPSBcIic7XFxuXCI7XG5cbiAgICAvLyBJZiBhIHZhcmlhYmxlIGlzIG5vdCBzcGVjaWZpZWQsIHBsYWNlIGRhdGEgdmFsdWVzIGluIGxvY2FsIHNjb3BlLlxuICAgIGlmICghc2V0dGluZ3MudmFyaWFibGUpIHNvdXJjZSA9ICd3aXRoKG9ianx8e30pe1xcbicgKyBzb3VyY2UgKyAnfVxcbic7XG5cbiAgICBzb3VyY2UgPSBcInZhciBfX3QsX19wPScnLF9faj1BcnJheS5wcm90b3R5cGUuam9pbixcIiArXG4gICAgICBcInByaW50PWZ1bmN0aW9uKCl7X19wKz1fX2ouY2FsbChhcmd1bWVudHMsJycpO307XFxuXCIgK1xuICAgICAgc291cmNlICsgJ3JldHVybiBfX3A7XFxuJztcblxuICAgIHZhciByZW5kZXI7XG4gICAgdHJ5IHtcbiAgICAgIHJlbmRlciA9IG5ldyBGdW5jdGlvbihzZXR0aW5ncy52YXJpYWJsZSB8fCAnb2JqJywgJ18nLCBzb3VyY2UpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGUuc291cmNlID0gc291cmNlO1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG5cbiAgICB2YXIgdGVtcGxhdGUgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICByZXR1cm4gcmVuZGVyLmNhbGwodGhpcywgZGF0YSwgXyk7XG4gICAgfTtcblxuICAgIC8vIFByb3ZpZGUgdGhlIGNvbXBpbGVkIHNvdXJjZSBhcyBhIGNvbnZlbmllbmNlIGZvciBwcmVjb21waWxhdGlvbi5cbiAgICB2YXIgYXJndW1lbnQgPSBzZXR0aW5ncy52YXJpYWJsZSB8fCAnb2JqJztcbiAgICB0ZW1wbGF0ZS5zb3VyY2UgPSAnZnVuY3Rpb24oJyArIGFyZ3VtZW50ICsgJyl7XFxuJyArIHNvdXJjZSArICd9JztcblxuICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgfTtcblxuICAvLyBBZGQgYSBcImNoYWluXCIgZnVuY3Rpb24uIFN0YXJ0IGNoYWluaW5nIGEgd3JhcHBlZCBVbmRlcnNjb3JlIG9iamVjdC5cbiAgXy5jaGFpbiA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciBpbnN0YW5jZSA9IF8ob2JqKTtcbiAgICBpbnN0YW5jZS5fY2hhaW4gPSB0cnVlO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfTtcblxuICAvLyBPT1BcbiAgLy8gLS0tLS0tLS0tLS0tLS0tXG4gIC8vIElmIFVuZGVyc2NvcmUgaXMgY2FsbGVkIGFzIGEgZnVuY3Rpb24sIGl0IHJldHVybnMgYSB3cmFwcGVkIG9iamVjdCB0aGF0XG4gIC8vIGNhbiBiZSB1c2VkIE9PLXN0eWxlLiBUaGlzIHdyYXBwZXIgaG9sZHMgYWx0ZXJlZCB2ZXJzaW9ucyBvZiBhbGwgdGhlXG4gIC8vIHVuZGVyc2NvcmUgZnVuY3Rpb25zLiBXcmFwcGVkIG9iamVjdHMgbWF5IGJlIGNoYWluZWQuXG5cbiAgLy8gSGVscGVyIGZ1bmN0aW9uIHRvIGNvbnRpbnVlIGNoYWluaW5nIGludGVybWVkaWF0ZSByZXN1bHRzLlxuICB2YXIgY2hhaW5SZXN1bHQgPSBmdW5jdGlvbihpbnN0YW5jZSwgb2JqKSB7XG4gICAgcmV0dXJuIGluc3RhbmNlLl9jaGFpbiA/IF8ob2JqKS5jaGFpbigpIDogb2JqO1xuICB9O1xuXG4gIC8vIEFkZCB5b3VyIG93biBjdXN0b20gZnVuY3Rpb25zIHRvIHRoZSBVbmRlcnNjb3JlIG9iamVjdC5cbiAgXy5taXhpbiA9IGZ1bmN0aW9uKG9iaikge1xuICAgIF8uZWFjaChfLmZ1bmN0aW9ucyhvYmopLCBmdW5jdGlvbihuYW1lKSB7XG4gICAgICB2YXIgZnVuYyA9IF9bbmFtZV0gPSBvYmpbbmFtZV07XG4gICAgICBfLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYXJncyA9IFt0aGlzLl93cmFwcGVkXTtcbiAgICAgICAgcHVzaC5hcHBseShhcmdzLCBhcmd1bWVudHMpO1xuICAgICAgICByZXR1cm4gY2hhaW5SZXN1bHQodGhpcywgZnVuYy5hcHBseShfLCBhcmdzKSk7XG4gICAgICB9O1xuICAgIH0pO1xuICAgIHJldHVybiBfO1xuICB9O1xuXG4gIC8vIEFkZCBhbGwgb2YgdGhlIFVuZGVyc2NvcmUgZnVuY3Rpb25zIHRvIHRoZSB3cmFwcGVyIG9iamVjdC5cbiAgXy5taXhpbihfKTtcblxuICAvLyBBZGQgYWxsIG11dGF0b3IgQXJyYXkgZnVuY3Rpb25zIHRvIHRoZSB3cmFwcGVyLlxuICBfLmVhY2goWydwb3AnLCAncHVzaCcsICdyZXZlcnNlJywgJ3NoaWZ0JywgJ3NvcnQnLCAnc3BsaWNlJywgJ3Vuc2hpZnQnXSwgZnVuY3Rpb24obmFtZSkge1xuICAgIHZhciBtZXRob2QgPSBBcnJheVByb3RvW25hbWVdO1xuICAgIF8ucHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgb2JqID0gdGhpcy5fd3JhcHBlZDtcbiAgICAgIG1ldGhvZC5hcHBseShvYmosIGFyZ3VtZW50cyk7XG4gICAgICBpZiAoKG5hbWUgPT09ICdzaGlmdCcgfHwgbmFtZSA9PT0gJ3NwbGljZScpICYmIG9iai5sZW5ndGggPT09IDApIGRlbGV0ZSBvYmpbMF07XG4gICAgICByZXR1cm4gY2hhaW5SZXN1bHQodGhpcywgb2JqKTtcbiAgICB9O1xuICB9KTtcblxuICAvLyBBZGQgYWxsIGFjY2Vzc29yIEFycmF5IGZ1bmN0aW9ucyB0byB0aGUgd3JhcHBlci5cbiAgXy5lYWNoKFsnY29uY2F0JywgJ2pvaW4nLCAnc2xpY2UnXSwgZnVuY3Rpb24obmFtZSkge1xuICAgIHZhciBtZXRob2QgPSBBcnJheVByb3RvW25hbWVdO1xuICAgIF8ucHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gY2hhaW5SZXN1bHQodGhpcywgbWV0aG9kLmFwcGx5KHRoaXMuX3dyYXBwZWQsIGFyZ3VtZW50cykpO1xuICAgIH07XG4gIH0pO1xuXG4gIC8vIEV4dHJhY3RzIHRoZSByZXN1bHQgZnJvbSBhIHdyYXBwZWQgYW5kIGNoYWluZWQgb2JqZWN0LlxuICBfLnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl93cmFwcGVkO1xuICB9O1xuXG4gIC8vIFByb3ZpZGUgdW53cmFwcGluZyBwcm94eSBmb3Igc29tZSBtZXRob2RzIHVzZWQgaW4gZW5naW5lIG9wZXJhdGlvbnNcbiAgLy8gc3VjaCBhcyBhcml0aG1ldGljIGFuZCBKU09OIHN0cmluZ2lmaWNhdGlvbi5cbiAgXy5wcm90b3R5cGUudmFsdWVPZiA9IF8ucHJvdG90eXBlLnRvSlNPTiA9IF8ucHJvdG90eXBlLnZhbHVlO1xuXG4gIF8ucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFN0cmluZyh0aGlzLl93cmFwcGVkKTtcbiAgfTtcblxuICBleHBvcnQgZGVmYXVsdCBfO1xuICAiLCJpbXBvcnQge2V4dHJhY3RFeHRlbnNpb259IGZyb20gXCJ1dGlscy9zdHJpbmdzXCI7XG5cbmV4cG9ydCBjb25zdCBpc1J0bXAgPSBmdW5jdGlvbiAoZmlsZSwgdHlwZSkge1xuICAgIHJldHVybiAoZmlsZS5pbmRleE9mKCdydG1wOicpID09IDAgfHwgdHlwZSA9PSAncnRtcCcpO1xufTtcbmV4cG9ydCBjb25zdCBpc1dlYlJUQyA9IGZ1bmN0aW9uIChmaWxlLCB0eXBlKSB7XG4gICAgcmV0dXJuIChmaWxlLmluZGV4T2YoJ3dzOicpID09PSAwIHx8IGZpbGUuaW5kZXhPZignd3NzOicpID09PSAwIHx8IHR5cGUgPT09ICd3ZWJydGMnKTtcbn07XG5leHBvcnQgY29uc3QgaXNEYXNoID0gZnVuY3Rpb24gKGZpbGUsIHR5cGUpIHtcbiAgICByZXR1cm4gKCB0eXBlID09PSAnbXBkJyB8fCAgdHlwZSA9PT0gJ2Rhc2gnIHx8IHR5cGUgPT09ICdhcHBsaWNhdGlvbi9kYXNoK3htbCcgfHwgZXh0cmFjdEV4dGVuc2lvbihmaWxlKSA9PSAnbXBkJyk7XG59OyIsIi8qKlxuICogdXRpbHMgZm9yIHdlYnBhY2tcbiAqL1xuXG5leHBvcnQgY29uc3QgZ2V0U2NyaXB0UGF0aCA9IGZ1bmN0aW9uKHNjcmlwdE5hbWUpIHtcbiAgICBjb25zdCBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2NyaXB0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBzcmMgPSBzY3JpcHRzW2ldLnNyYztcbiAgICAgICAgaWYgKHNyYykge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBzcmMubGFzdEluZGV4T2YoJy8nICsgc2NyaXB0TmFtZSk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzcmMuc3Vic3RyKDAsIGluZGV4ICsgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuICcnO1xufTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDYuIDI5Li5cbiAqL1xuZXhwb3J0IGNvbnN0IHZlcnNpb24gPSBfX1ZFUlNJT05fXztcbiJdLCJzb3VyY2VSb290IjoiIn0=