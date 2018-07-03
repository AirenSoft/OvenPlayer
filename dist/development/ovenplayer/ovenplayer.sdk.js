/*! OvenPlayerv0.6.1 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

            /*
                init()시 src가 없이 초기화 하는 경우. (src 없이 초기화 하는게 모순이라 생각이 들지만)
                playerInstance.create("elId", {});
                playerInstance.load(src);
                를 대응하기 위해 src없어 프로바이드 로드 못해 initError 발생하는 경우 load는 한번 실행할 수 있게 해주즈아
            */
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

        //현재 재생중인 소스의 프로바이더와 새로운 qualityIndex 소스의 프로바이더가 같다면 기존 프로바이더를 재활용한다. 그렇지 않으면 initProvider()를 통해 재로딩
        var sources = playlistManager.getCurrentSources();
        var currentSource = sources[that.getCurrentQuality()];
        var newSource = sources[qualityIndex];
        var lastPlayPosition = that.getPosition();
        var isSameProvider = providerController.isSameProvider(currentSource, newSource);
        // provider.serCurrentQuality -> playerConfig setting -> load
        var resQualityIndex = currentProvider.setCurrentQuality(qualityIndex, isSameProvider);

        OvenPlayerConsole.log("API : setCurrentQuality() isSameProvider", isSameProvider);

        if (!isSameProvider) {
            lazyQueue = (0, _LazyCommandExecutor2.default)(that, ['play']);
            //프로바이더가 변경될때 기존 상태를 유지 할 수 없기 때문에 프로바이더 변경 전 마지막 재생 포지션을 가져온다.
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
var version = exports.version = '0.6.1-localbuild';

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvQXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvQ29uZmlndXJhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvRXZlbnRFbWl0dGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvTGF6eUNvbW1hbmRFeGVjdXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL1N1cHBvcnRDaGVja2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvY29uc3RhbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvbWVkaWEvTWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3BsYXlsaXN0L01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9Db250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvc2hpbXMvcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvb3ZlbnBsYXllci5zZGsuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL2xvZ2dlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvc3RyaW5ncy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvdW5kZXJzY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvdmFsaWRhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy93ZWJwYWNrLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92ZXJzaW9uLmpzIl0sIm5hbWVzIjpbIkFwaSIsImNvbnRhaW5lciIsImxvZ01hbmFnZXIiLCJ0aGF0IiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJ2ZXJzaW9uIiwibWVkaWFNYW5hZ2VyIiwicGxheWxpc3RNYW5hZ2VyIiwicHJvdmlkZXJDb250cm9sbGVyIiwiY3VycmVudFByb3ZpZGVyIiwicGxheWVyQ29uZmlnIiwibGF6eVF1ZXVlIiwiaW5pdFByb3ZpZGVyIiwibGFzdFBsYXlQb3NpdGlvbiIsInBpY2tRdWFsaXR5RnJvbVNvdXJjZSIsInNvdXJjZXMiLCJxdWFsaXR5IiwiaSIsImxlbmd0aCIsImRlZmF1bHQiLCJnZXRRdWFsaXR5TGFiZWwiLCJsYWJlbCIsImxvYWRQcm92aWRlcnMiLCJnZXRQbGF5bGlzdCIsInRoZW4iLCJkZXN0cm95IiwidmlkZW9FbGVtZW50IiwiY3JlYXRlRWxlbWVudCIsImN1cnJlbnRTb3VyY2VJbmRleCIsImdldEN1cnJlbnRTb3VyY2VzIiwiUHJvdmlkZXJzIiwib24iLCJuYW1lIiwiZGF0YSIsInRyaWdnZXIiLCJwcmVsb2FkIiwiZmx1c2giLCJSRUFEWSIsImNhdGNoIiwiZXJyb3IiLCJlcnJvck9iamVjdCIsImNvZGUiLCJJTklUX0VSUk9SIiwicmVhc29uIiwibWVzc2FnZSIsIkVSUk9SIiwicmVtb3ZlQW5kRXhjdXRlT25jZSIsImluaXQiLCJvcHRpb25zIiwiaXNEZWJ1ZyIsImRpc2FibGUiLCJzZXRQbGF5bGlzdCIsImdldENvbmZpZyIsImdldER1cmF0aW9uIiwiZ2V0UG9zaXRpb24iLCJnZXRWb2x1bWUiLCJzZXRWb2x1bWUiLCJ2b2x1bWUiLCJzZXRNdXRlIiwic3RhdGUiLCJnZXRNdXRlIiwibG9hZCIsInBsYXlsaXN0Iiwic2V0Q3VycmVudFF1YWxpdHkiLCJwbGF5IiwicGF1c2UiLCJzZWVrIiwicG9zaXRpb24iLCJzZXRQbGF5YmFja1JhdGUiLCJwbGF5YmFja1JhdGUiLCJzZXREZWZhdWx0UGxheWJhY2tSYXRlIiwiZ2V0UGxheWJhY2tSYXRlIiwiZ2V0UXVhbGl0eUxldmVscyIsImdldEN1cnJlbnRRdWFsaXR5IiwicXVhbGl0eUluZGV4IiwiY3VycmVudFNvdXJjZSIsIm5ld1NvdXJjZSIsImlzU2FtZVByb3ZpZGVyIiwicmVzUXVhbGl0eUluZGV4IiwiZ2V0QnVmZmVyIiwiZ2V0U3RhdGUiLCJzdG9wIiwicmVtb3ZlIiwiREVTVFJPWSIsIm9mZiIsIkNvbmZpZ3VyYXRvciIsImNvbXBvc2VTb3VyY2VPcHRpb25zIiwiRGVmYXVsdHMiLCJkZWZhdWx0UGxheWJhY2tSYXRlIiwicGxheWJhY2tSYXRlQ29udHJvbHMiLCJwbGF5YmFja1JhdGVzIiwibXV0ZSIsIndpZHRoIiwiaGVpZ2h0Iiwic2VyaWFsaXplIiwidmFsIiwidW5kZWZpbmVkIiwibG93ZXJjYXNlVmFsIiwidG9Mb3dlckNhc2UiLCJpc05hTiIsIk51bWJlciIsInBhcnNlRmxvYXQiLCJkZXNlcmlhbGl6ZSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5Iiwibm9ybWFsaXplU2l6ZSIsInNsaWNlIiwiZXZhbHVhdGVBc3BlY3RSYXRpbyIsImFyIiwidG9TdHJpbmciLCJpbmRleE9mIiwidGVzdCIsImluZGV4IiwidyIsInN1YnN0ciIsImgiLCJjb25maWciLCJhc3BlY3RyYXRpbyIsInJhdGVDb250cm9scyIsInJhdGVzIiwiQXJyYXkiLCJpc0FycmF5IiwiZmlsdGVyIiwiXyIsImlzTnVtYmVyIiwicmF0ZSIsIm1hcCIsIk1hdGgiLCJyb3VuZCIsInB1c2giLCJzb3J0IiwiY29uZmlnUGxheWxpc3QiLCJvYmoiLCJwaWNrIiwiZmVlZERhdGEiLCJkdXJhdGlvbiIsImRlYnVnIiwiaW1hZ2UiLCJxdWFsaXR5TGFiZWwiLCJyZXBlYXQiLCJzdHJldGNoaW5nIiwiZ2V0QXNwZWN0cmF0aW8iLCJzZXRBc3BlY3RyYXRpbyIsImFzcGVjdHJhdGlvXyIsImdldERlZmF1bHRQbGF5YmFja1JhdGUiLCJzZXRRdWFsaXR5TGFiZWwiLCJuZXdMYWJlbCIsImdldFBsYXliYWNrUmF0ZXMiLCJpc1BsYXliYWNrUmF0ZUNvbnRyb2xzIiwicGxheWxpc3RfIiwiaXNSZXBlYXQiLCJnZXRTdHJldGNoaW5nIiwiRXZlbnRFbWl0dGVyIiwib2JqZWN0IiwiX2V2ZW50cyIsInRyaWdnZXJFdmVudHMiLCJldmVudHMiLCJhcmdzIiwiY29udGV4dCIsImV2ZW50IiwibGlzdGVuZXIiLCJhcHBseSIsImNhbGwiLCJhcmd1bWVudHMiLCJhbGxFdmVudHMiLCJhbGwiLCJuYW1lcyIsImwiLCJyZXRhaW4iLCJqIiwiayIsIl9jYWxsYmFjayIsIm9uY2UiLCJjb3VudCIsIm9uY2VDYWxsYmFjayIsIl9saXN0ZW5lciIsIkxhenlDb21tYW5kRXhlY3V0b3IiLCJpbnN0YW5jZSIsInF1ZXVlZENvbW1hbmRzIiwiY29tbWFuZFF1ZXVlIiwidW5kZWNvcmF0ZWRNZXRob2RzIiwiZXhlY3V0ZU1vZGUiLCJjb21tYW5kIiwibWV0aG9kIiwicHJvdG90eXBlIiwiYWRkUXVldWUiLCJleGVjdXRlUXVldWVkQ29tbWFuZHMiLCJzaGlmdCIsInNldEV4ZWN1dGVNb2RlIiwibW9kZSIsImdldFVuZGVjb3JhdGVkTWV0aG9kcyIsImdldFF1ZXVlIiwiZW1wdHkiLCJjb21tYW5kXyIsImNvbW1hbmRRdWV1ZUl0ZW0iLCJmaW5kV2hlcmUiLCJzcGxpY2UiLCJmaW5kSW5kZXgiLCJTdXBwb3J0Q2hlY2tlciIsInN1cHBvcnRMaXN0IiwiY2hlY2tTdXBwb3J0Iiwic291cmNlIiwiTWltZVR5cGVzIiwiYWFjIiwibXA0IiwiZjR2IiwibTR2IiwibW92IiwibXAzIiwibXBlZyIsIm9ndiIsIm9nZyIsIm9nYSIsInZvcmJpcyIsIndlYm0iLCJmNGEiLCJtM3U4IiwibTN1IiwiaGxzIiwidmlkZW8iLCJkb2N1bWVudCIsImNhblBsYXlUeXBlIiwiZmlsZSIsInR5cGUiLCJtaW1lVHlwZSIsImlzSGxzU3VwcG9ydCIsImdldE1lZGlhU291cmNlIiwid2luZG93IiwiTWVkaWFTb3VyY2UiLCJXZWJLaXRNZWRpYVNvdXJjZSIsIm1lZGlhU291cmNlIiwic291cmNlQnVmZmVyIiwiU291cmNlQnVmZmVyIiwiV2ViS2l0U291cmNlQnVmZmVyIiwiaXNUeXBlU3VwcG9ydGVkIiwic291cmNlQnVmZmVyVmFsaWRBUEkiLCJhcHBlbmRCdWZmZXIiLCJmaW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UiLCJzb3J1Y2VfIiwiZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0Iiwic3VwcG9ydE5hbWVzIiwiaXRlbSIsInN1cHBvcnRlZCIsIlNUQVRFX0JVRkZFUklORyIsIlNUQVRFX0lETEUiLCJTVEFURV9DT01QTEVURSIsIlNUQVRFX1BBVVNFRCIsIlNUQVRFX1BMQVlJTkciLCJTVEFURV9FUlJPUiIsIlNUQVRFX0xPQURJTkciLCJTVEFURV9TVEFMTEVEIiwiUFJPVklERVJfSFRNTDUiLCJQUk9WSURFUl9XRUJSVEMiLCJQUk9WSURFUl9EQVNIIiwiUFJPVklERVJfSExTIiwiQ09OVEVOVF9DT01QTEVURSIsIkNPTlRFTlRfU0VFSyIsIkNPTlRFTlRfQlVGRkVSX0ZVTEwiLCJESVNQTEFZX0NMSUNLIiwiQ09OVEVOVF9MT0FERUQiLCJDT05URU5UX1NFRUtFRCIsIlBMQVlFUl9TVEFURSIsIlBMQVlFUl9DT01QTEVURSIsIlBMQVlFUl9QQVVTRSIsIlBMQVlFUl9QTEFZIiwiQ09OVEVOVF9CVUZGRVIiLCJDT05URU5UX1RJTUUiLCJDT05URU5UX1JBVEVfQ0hBTkdFIiwiQ09OVEVOVF9WT0xVTUUiLCJDT05URU5UX01VVEUiLCJDT05URU5UX01FVEEiLCJDT05URU5UX0xFVkVMUyIsIkNPTlRFTlRfTEVWRUxfQ0hBTkdFRCIsIlBMQVlCQUNLX1JBVEVfQ0hBTkdFRCIsIkNPTlRFTlRfQ0FQVElPTl9DVUVfQ0hBTkdFRCIsIkNPTlRFTlRfQ0FQVElPTl9DSEFOR0VEIiwiUExBWUVSX1VOS05XT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SIiwiUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SIiwiUExBWUVSX0ZJTEVfRVJST1IiLCJQTEFZRVJfQ0FQVElPTl9FUlJPUiIsIlBMQVlFUl9XRUJSVENfV1NfRVJST1IiLCJQTEFZRVJfV0VCUlRDX1dTX0NMT1NFRCIsIlBMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUiIsIlBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19DUkVBVEVfQU5TV0VSX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUiIsIk1hbmFnZXIiLCJtZWRpYUVsZW1lbnQiLCJjcmVhdGVNZWRpYUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsInJlbW92ZUNoaWxkIiwiY3VycmVudFBsYXlsaXN0Iiwic2MiLCJtYWtlUHJldHR5U291cmNlIiwic291cmNlXyIsImhvc3QiLCJhcHBsaWNhdGlvbiIsInN0cmVhbSIsIm1pbWV0eXBlUmVnRXgiLCJyZXBsYWNlIiwicHJldHRpZWRQbGF5bGlzdCIsInRyYWNrcyIsInBsYXlsaXN0SXRlbSIsImxldmVscyIsInByZXR0eVNvdXJjZSIsImRlZmF1bHRTb3VyY2UiLCJjYXB0aW9ucyIsImNvbmNhdCIsInRyYWNrIiwiQ29udHJvbGxlciIsInJlZ2lzdGVyUHJvdmlkZXIiLCJwcm92aWRlciIsIlByb3ZpZGVyTG9hZGVyIiwiaHRtbDUiLCJyZXF1aXJlIiwiZXJyIiwiRXJyb3IiLCJ3ZWJydGMiLCJkYXNoIiwic3VwcG9ydGVkUHJvdmlkZXJOYW1lcyIsIlByb21pc2UiLCJwcm92aWRlck5hbWUiLCJmaW5kQnlOYW1lIiwiZ2V0UHJvdmlkZXJCeVNvdXJjZSIsInN1cHBvcnRlZFByb3ZpZGVyTmFtZSIsInByb21pc2VGaW5hbGx5IiwiY2FsbGJhY2siLCJjb25zdHJ1Y3RvciIsInZhbHVlIiwicmVzb2x2ZSIsInJlamVjdCIsInNldFRpbWVvdXRGdW5jIiwic2V0VGltZW91dCIsInNldEltbWVkaWF0ZUZ1bmMiLCJzZXRJbW1lZGlhdGUiLCJub29wIiwiYmluZCIsImZuIiwidGhpc0FyZyIsIlByb21pc2VTaGltIiwiVHlwZUVycm9yIiwiX3N0YXRlIiwiX2hhbmRsZWQiLCJfdmFsdWUiLCJfZGVmZXJyZWRzIiwiZG9SZXNvbHZlIiwiaGFuZGxlIiwic2VsZiIsImRlZmVycmVkIiwiX2ltbWVkaWF0ZUZuIiwiY2IiLCJvbkZ1bGZpbGxlZCIsIm9uUmVqZWN0ZWQiLCJwcm9taXNlIiwicmV0IiwiZSIsIm5ld1ZhbHVlIiwiZmluYWxlIiwiX3VuaGFuZGxlZFJlamVjdGlvbkZuIiwibGVuIiwiSGFuZGxlciIsImRvbmUiLCJleCIsInByb20iLCJhcnIiLCJyZW1haW5pbmciLCJyZXMiLCJyYWNlIiwidmFsdWVzIiwiY29uc29sZSIsIndhcm4iLCJyZXNvbHZlZCIsIl9fd2VicGFja19wdWJsaWNfcGF0aF9fIiwiT3ZlblBsYXllclNESyIsInBsYXllckxpc3QiLCJjaGVja0FuZEdldENvbnRhaW5lckVsZW1lbnQiLCJjb250YWluZXJFbGVtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJub2RlVHlwZSIsImNyZWF0ZSIsInBsYXllckluc3RhbmNlIiwiZ2V0UGxheWVyTGlzdCIsImdldFBsYXllckJ5Q29udGFpbmVySWQiLCJjb250YWluZXJJZCIsImdldFBsYXllckJ5SW5kZXgiLCJnZW5lcmF0ZVdlYnJ0Y1VybHMiLCJsb2dnZXIiLCJwcmV2Q29uc29sZUxvZyIsImVuYWJsZSIsInRyaW0iLCJuYXR1cmFsSG1zIiwic3RyaW5nIiwiZXh0cmFjdEV4dGVuc2lvbiIsInBhdGgiLCJnZXRBenVyZUZpbGVGb3JtYXQiLCJleHRlbnNpb24iLCJhenVyZWRGb3JtYXQiLCJzcGxpdCIsImxhc3RJbmRleE9mIiwic2Vjb25kIiwic2VjTnVtIiwicGFyc2VJbnQiLCJob3VycyIsImZsb29yIiwibWludXRlcyIsInNlY29uZHMiLCJyb290IiwiZ2xvYmFsIiwicHJldmlvdXNVbmRlcnNjb3JlIiwiQXJyYXlQcm90byIsIk9ialByb3RvIiwiU3ltYm9sUHJvdG8iLCJTeW1ib2wiLCJoYXNPd25Qcm9wZXJ0eSIsIm5hdGl2ZUlzQXJyYXkiLCJuYXRpdmVLZXlzIiwibmF0aXZlQ3JlYXRlIiwiQ3RvciIsIl93cmFwcGVkIiwiZXhwb3J0cyIsIm1vZHVsZSIsIlZFUlNJT04iLCJvcHRpbWl6ZUNiIiwiZnVuYyIsImFyZ0NvdW50IiwiY29sbGVjdGlvbiIsImFjY3VtdWxhdG9yIiwiYnVpbHRpbkl0ZXJhdGVlIiwiaXRlcmF0ZWUiLCJpZGVudGl0eSIsImlzRnVuY3Rpb24iLCJpc09iamVjdCIsIm1hdGNoZXIiLCJwcm9wZXJ0eSIsIkluZmluaXR5IiwicmVzdEFyZ3VtZW50cyIsInN0YXJ0SW5kZXgiLCJtYXgiLCJyZXN0IiwiYmFzZUNyZWF0ZSIsInJlc3VsdCIsInNoYWxsb3dQcm9wZXJ0eSIsImRlZXBHZXQiLCJNQVhfQVJSQVlfSU5ERVgiLCJwb3ciLCJnZXRMZW5ndGgiLCJpc0FycmF5TGlrZSIsImVhY2giLCJjb2xsZWN0IiwicmVzdWx0cyIsImN1cnJlbnRLZXkiLCJjcmVhdGVSZWR1Y2UiLCJkaXIiLCJyZWR1Y2VyIiwibWVtbyIsImluaXRpYWwiLCJyZWR1Y2UiLCJmb2xkbCIsImluamVjdCIsInJlZHVjZVJpZ2h0IiwiZm9sZHIiLCJmaW5kIiwiZGV0ZWN0IiwicHJlZGljYXRlIiwia2V5RmluZGVyIiwiZmluZEtleSIsInNlbGVjdCIsImxpc3QiLCJuZWdhdGUiLCJldmVyeSIsInNvbWUiLCJhbnkiLCJjb250YWlucyIsImluY2x1ZGVzIiwiaW5jbHVkZSIsImZyb21JbmRleCIsImd1YXJkIiwiaW52b2tlIiwiY29udGV4dFBhdGgiLCJwbHVjayIsIndoZXJlIiwiYXR0cnMiLCJsYXN0Q29tcHV0ZWQiLCJjb21wdXRlZCIsInYiLCJtaW4iLCJzaHVmZmxlIiwic2FtcGxlIiwibiIsInJhbmRvbSIsImNsb25lIiwibGFzdCIsInJhbmQiLCJ0ZW1wIiwic29ydEJ5IiwiY3JpdGVyaWEiLCJsZWZ0IiwicmlnaHQiLCJhIiwiYiIsImdyb3VwIiwiYmVoYXZpb3IiLCJwYXJ0aXRpb24iLCJncm91cEJ5IiwiaGFzIiwiaW5kZXhCeSIsImNvdW50QnkiLCJyZVN0clN5bWJvbCIsInRvQXJyYXkiLCJpc1N0cmluZyIsIm1hdGNoIiwic2l6ZSIsInBhc3MiLCJmaXJzdCIsImhlYWQiLCJ0YWtlIiwiYXJyYXkiLCJ0YWlsIiwiZHJvcCIsImNvbXBhY3QiLCJCb29sZWFuIiwiZmxhdHRlbiIsImlucHV0Iiwic2hhbGxvdyIsInN0cmljdCIsIm91dHB1dCIsImlkeCIsImlzQXJndW1lbnRzIiwid2l0aG91dCIsIm90aGVyQXJyYXlzIiwiZGlmZmVyZW5jZSIsInVuaXEiLCJ1bmlxdWUiLCJpc1NvcnRlZCIsImlzQm9vbGVhbiIsInNlZW4iLCJ1bmlvbiIsImFycmF5cyIsImludGVyc2VjdGlvbiIsImFyZ3NMZW5ndGgiLCJ1bnppcCIsInppcCIsImNyZWF0ZVByZWRpY2F0ZUluZGV4RmluZGVyIiwiZmluZExhc3RJbmRleCIsInNvcnRlZEluZGV4IiwibG93IiwiaGlnaCIsIm1pZCIsImNyZWF0ZUluZGV4RmluZGVyIiwicHJlZGljYXRlRmluZCIsInJhbmdlIiwic3RhcnQiLCJzdGVwIiwiY2VpbCIsImNodW5rIiwiZXhlY3V0ZUJvdW5kIiwic291cmNlRnVuYyIsImJvdW5kRnVuYyIsImNhbGxpbmdDb250ZXh0IiwiYm91bmQiLCJjYWxsQXJncyIsInBhcnRpYWwiLCJib3VuZEFyZ3MiLCJwbGFjZWhvbGRlciIsImJpbmRBbGwiLCJtZW1vaXplIiwiaGFzaGVyIiwiY2FjaGUiLCJhZGRyZXNzIiwiZGVsYXkiLCJ3YWl0IiwiZGVmZXIiLCJ0aHJvdHRsZSIsInRpbWVvdXQiLCJwcmV2aW91cyIsImxhdGVyIiwibGVhZGluZyIsIm5vdyIsInRocm90dGxlZCIsImNsZWFyVGltZW91dCIsInRyYWlsaW5nIiwiY2FuY2VsIiwiZGVib3VuY2UiLCJpbW1lZGlhdGUiLCJkZWJvdW5jZWQiLCJjYWxsTm93Iiwid3JhcCIsIndyYXBwZXIiLCJjb21wb3NlIiwiYWZ0ZXIiLCJ0aW1lcyIsImJlZm9yZSIsImhhc0VudW1CdWciLCJwcm9wZXJ0eUlzRW51bWVyYWJsZSIsIm5vbkVudW1lcmFibGVQcm9wcyIsImNvbGxlY3ROb25FbnVtUHJvcHMiLCJub25FbnVtSWR4IiwicHJvdG8iLCJwcm9wIiwiYWxsS2V5cyIsIm1hcE9iamVjdCIsInBhaXJzIiwiaW52ZXJ0IiwiZnVuY3Rpb25zIiwibWV0aG9kcyIsImNyZWF0ZUFzc2lnbmVyIiwia2V5c0Z1bmMiLCJkZWZhdWx0cyIsImV4dGVuZCIsImV4dGVuZE93biIsImFzc2lnbiIsImtleUluT2JqIiwib21pdCIsIlN0cmluZyIsInByb3BzIiwidGFwIiwiaW50ZXJjZXB0b3IiLCJpc01hdGNoIiwiZXEiLCJkZWVwRXEiLCJhU3RhY2siLCJiU3RhY2siLCJjbGFzc05hbWUiLCJ2YWx1ZU9mIiwiYXJlQXJyYXlzIiwiYUN0b3IiLCJiQ3RvciIsInBvcCIsImlzRXF1YWwiLCJpc0VtcHR5IiwiaXNFbGVtZW50Iiwibm9kZWxpc3QiLCJjaGlsZE5vZGVzIiwiSW50OEFycmF5IiwiaXNGaW5pdGUiLCJpc1N5bWJvbCIsImlzTnVsbCIsImlzVW5kZWZpbmVkIiwibm9Db25mbGljdCIsImNvbnN0YW50IiwicHJvcGVydHlPZiIsIm1hdGNoZXMiLCJhY2N1bSIsIkRhdGUiLCJnZXRUaW1lIiwiZXNjYXBlTWFwIiwidW5lc2NhcGVNYXAiLCJjcmVhdGVFc2NhcGVyIiwiZXNjYXBlciIsImpvaW4iLCJ0ZXN0UmVnZXhwIiwiUmVnRXhwIiwicmVwbGFjZVJlZ2V4cCIsImVzY2FwZSIsInVuZXNjYXBlIiwiZmFsbGJhY2siLCJpZENvdW50ZXIiLCJ1bmlxdWVJZCIsInByZWZpeCIsImlkIiwidGVtcGxhdGVTZXR0aW5ncyIsImV2YWx1YXRlIiwiaW50ZXJwb2xhdGUiLCJub01hdGNoIiwiZXNjYXBlcyIsImVzY2FwZVJlZ0V4cCIsImVzY2FwZUNoYXIiLCJ0ZW1wbGF0ZSIsInRleHQiLCJzZXR0aW5ncyIsIm9sZFNldHRpbmdzIiwib2Zmc2V0IiwidmFyaWFibGUiLCJyZW5kZXIiLCJGdW5jdGlvbiIsImFyZ3VtZW50IiwiY2hhaW4iLCJfY2hhaW4iLCJjaGFpblJlc3VsdCIsIm1peGluIiwidG9KU09OIiwiaXNSdG1wIiwiaXNXZWJSVEMiLCJpc0Rhc2giLCJnZXRTY3JpcHRQYXRoIiwic2NyaXB0TmFtZSIsInNjcmlwdHMiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInNyYyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQVEsb0JBQW9CO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBLGlEQUF5Qyw0WEFBNFg7QUFDcmE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBLHlDQUFpQzs7QUFFakM7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQXdCLGtDQUFrQztBQUMxRCxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxj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Q0FBYSxNQUFiLE1BQXlCLENBQXRELElBQTJEaUgsU0FBUyxRQUE1RTtBQUNILENBRk07QUFHQSxJQUFNK2MsMEJBQVMsU0FBVEEsTUFBUyxDQUFVaGQsSUFBVixFQUFnQkMsSUFBaEIsRUFBc0I7QUFDeEMsV0FBU0EsU0FBUyxLQUFULElBQW1CQSxTQUFTLE1BQTVCLElBQXNDQSxTQUFTLHNCQUEvQyxJQUF5RSwrQkFBaUJELElBQWpCLEtBQTBCLEtBQTVHO0FBQ0gsQ0FGTSxDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1JQOzs7O0FBSU8sSUFBTWlkLHdDQUFnQixTQUFoQkEsYUFBZ0IsQ0FBU0MsVUFBVCxFQUFxQjtBQUM5QyxRQUFNQyxVQUFVcmQsU0FBU3NkLG9CQUFULENBQThCLFFBQTlCLENBQWhCO0FBQ0EsU0FBSyxJQUFJbnFCLElBQUksQ0FBYixFQUFnQkEsSUFBSWtxQixRQUFRanFCLE1BQTVCLEVBQW9DRCxHQUFwQyxFQUF5QztBQUNyQyxZQUFNb3FCLE1BQU1GLFFBQVFscUIsQ0FBUixFQUFXb3FCLEdBQXZCO0FBQ0EsWUFBSUEsR0FBSixFQUFTO0FBQ0wsZ0JBQU1ua0IsUUFBUW1rQixJQUFJbFMsV0FBSixDQUFnQixNQUFNK1IsVUFBdEIsQ0FBZDtBQUNBLGdCQUFJaGtCLFNBQVMsQ0FBYixFQUFnQjtBQUNaLHVCQUFPbWtCLElBQUlqa0IsTUFBSixDQUFXLENBQVgsRUFBY0YsUUFBUSxDQUF0QixDQUFQO0FBQ0g7QUFDSjtBQUNKO0FBQ0QsV0FBTyxFQUFQO0FBQ0gsQ0FaTSxDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0pQOzs7QUFHTyxJQUFNN0csNEJBQVUsa0JBQWhCLEMiLCJmaWxlIjoib3ZlbnBsYXllci5zZGsuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcblxuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHR9O1xuXG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcIm92ZW5wbGF5ZXIuc2RrXCI6IDBcbiBcdH07XG5cblxuXG4gXHQvLyBzY3JpcHQgcGF0aCBmdW5jdGlvblxuIFx0ZnVuY3Rpb24ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCkge1xuIFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArICh7XCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuaHRtbDVcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5odG1sNVwiLFwib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLmh0bWw1XCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLmh0bWw1XCJ9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLmpzXCJcbiBcdH1cblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCkge1xuIFx0XHR2YXIgcHJvbWlzZXMgPSBbXTtcblxuXG4gXHRcdC8vIEpTT05QIGNodW5rIGxvYWRpbmcgZm9yIGphdmFzY3JpcHRcblxuIFx0XHR2YXIgaW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIHsgLy8gMCBtZWFucyBcImFscmVhZHkgaW5zdGFsbGVkXCIuXG5cbiBcdFx0XHQvLyBhIFByb21pc2UgbWVhbnMgXCJjdXJyZW50bHkgbG9hZGluZ1wiLlxuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0pO1xuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHQvLyBzZXR1cCBQcm9taXNlIGluIGNodW5rIGNhY2hlXG4gXHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XTtcbiBcdFx0XHRcdH0pO1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0gPSBwcm9taXNlKTtcblxuIFx0XHRcdFx0Ly8gc3RhcnQgY2h1bmsgbG9hZGluZ1xuIFx0XHRcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuIFx0XHRcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuIFx0XHRcdFx0dmFyIG9uU2NyaXB0Q29tcGxldGU7XG5cbiBcdFx0XHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04JztcbiBcdFx0XHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuIFx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcbiBcdFx0XHRcdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c2NyaXB0LnNyYyA9IGpzb25wU2NyaXB0U3JjKGNodW5rSWQpO1xuXG4gXHRcdFx0XHRvblNjcmlwdENvbXBsZXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gXHRcdFx0XHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cbiBcdFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gbnVsbDtcbiBcdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuIFx0XHRcdFx0XHR2YXIgY2h1bmsgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdFx0XHRcdGlmKGNodW5rICE9PSAwKSB7XG4gXHRcdFx0XHRcdFx0aWYoY2h1bmspIHtcbiBcdFx0XHRcdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG4gXHRcdFx0XHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuIFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCdMb2FkaW5nIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJyk7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci50eXBlID0gZXJyb3JUeXBlO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG4gXHRcdFx0XHRcdFx0XHRjaHVua1sxXShlcnJvcik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fTtcbiBcdFx0XHRcdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuIFx0XHRcdFx0XHRvblNjcmlwdENvbXBsZXRlKHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KTtcbiBcdFx0XHRcdH0sIDEyMDAwMCk7XG4gXHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlO1xuIFx0XHRcdFx0aGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBvbiBlcnJvciBmdW5jdGlvbiBmb3IgYXN5bmMgbG9hZGluZ1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikgeyBjb25zb2xlLmVycm9yKGVycik7IHRocm93IGVycjsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9qcy9vdmVucGxheWVyLnNkay5qc1wiKTtcbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLCBldmFsKShcInRoaXNcIik7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHRpZiAoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcblx0XHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XG5cdH1cblx0cmV0dXJuIG1vZHVsZTtcbn07XG4iLCIvL2ltcG9ydCBDYXB0aW9uTWFuYWdlciBmcm9tIFwiYXBpL2NhcHRpb24vTWFuYWdlclwiO1xuaW1wb3J0IENvbmZpZ3VyYXRvciBmcm9tIFwiYXBpL0NvbmZpZ3VyYXRvclwiO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiYXBpL0V2ZW50RW1pdHRlclwiO1xuaW1wb3J0IExhenlDb21tYW5kRXhlY3V0b3IgZnJvbSBcImFwaS9MYXp5Q29tbWFuZEV4ZWN1dG9yXCI7XG5pbXBvcnQgTG9nTWFuYWdlciBmcm9tIFwidXRpbHMvbG9nZ2VyXCI7XG5pbXBvcnQgTWVkaWFNYW5hZ2VyIGZyb20gXCJhcGkvbWVkaWEvTWFuYWdlclwiO1xuaW1wb3J0IFBsYXlsaXN0TWFuYWdlciBmcm9tIFwiYXBpL3BsYXlsaXN0L01hbmFnZXJcIjtcbmltcG9ydCBQcm92aWRlckNvbnRyb2xsZXIgZnJvbSBcImFwaS9wcm92aWRlci9Db250cm9sbGVyXCI7XG5pbXBvcnQgUHJvbWlzZSwge3Jlc29sdmVkfSBmcm9tIFwiYXBpL3NoaW1zL3Byb21pc2VcIjtcbmltcG9ydCB7UkVBRFksIEVSUk9SLCBJTklUX0VSUk9SLCBERVNUUk9ZfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuaW1wb3J0IHt2ZXJzaW9ufSBmcm9tICd2ZXJzaW9uJztcblxuLyoqXG4gKiBAYnJpZWYgICBUaGlzIG9iamVjdCBjb25uZWN0cyBVSSB0byB0aGUgcHJvdmlkZXIuXG4gKiBAcGFyYW0gICB7b2JqZWN0fSAgICBjb250YWluZXIgIGRvbSBlbGVtZW50XG4gKlxuICogKi9cblxuY29uc3QgQXBpID0gZnVuY3Rpb24oY29udGFpbmVyKXtcbiAgICBsZXQgbG9nTWFuYWdlciA9IExvZ01hbmFnZXIoKTtcbiAgICBjb25zdCB0aGF0ID0ge307XG4gICAgRXZlbnRFbWl0dGVyKHRoYXQpO1xuXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiW1tPdmVuUGxheWVyXV0gdi5cIisgdmVyc2lvbik7XG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIGxvYWRlZC5cIik7XG4gICAgLy9sZXQgY2FwdGlvbk1hbmFnZXIgPSBDYXB0aW9uTWFuYWdlcih0aGF0KTtcbiAgICBsZXQgbWVkaWFNYW5hZ2VyID0gTWVkaWFNYW5hZ2VyKGNvbnRhaW5lcik7XG4gICAgbGV0IHBsYXlsaXN0TWFuYWdlciA9IFBsYXlsaXN0TWFuYWdlcigpO1xuICAgIGxldCBwcm92aWRlckNvbnRyb2xsZXIgPSBQcm92aWRlckNvbnRyb2xsZXIoKTtcbiAgICBsZXQgY3VycmVudFByb3ZpZGVyID0gXCJcIjtcbiAgICBsZXQgcGxheWVyQ29uZmlnID0gXCJcIjtcbiAgICBsZXQgbGF6eVF1ZXVlID0gXCJcIjtcblxuICAgIGNvbnN0IGluaXRQcm92aWRlciA9IGZ1bmN0aW9uKGxhc3RQbGF5UG9zaXRpb24pe1xuICAgICAgICBjb25zdCBwaWNrUXVhbGl0eUZyb21Tb3VyY2UgPSAoc291cmNlcykgPT57XG4gICAgICAgICAgICB2YXIgcXVhbGl0eSA9IDA7XG4gICAgICAgICAgICBpZiAoc291cmNlcykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc291cmNlc1tpXS5kZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWFsaXR5ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyQ29uZmlnLmdldFF1YWxpdHlMYWJlbCgpICYmIHNvdXJjZXNbaV0ubGFiZWwgPT09IHBsYXllckNvbmZpZy5nZXRRdWFsaXR5TGFiZWwoKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHF1YWxpdHk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHByb3ZpZGVyQ29udHJvbGxlci5sb2FkUHJvdmlkZXJzKHBsYXlsaXN0TWFuYWdlci5nZXRQbGF5bGlzdCgpKS50aGVuKFByb3ZpZGVycyA9PiB7XG4gICAgICAgICAgICBpZihjdXJyZW50UHJvdmlkZXIpe1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHZpZGVvRWxlbWVudCA9IG1lZGlhTWFuYWdlci5jcmVhdGVFbGVtZW50KCk7XG4gICAgICAgICAgICBsZXQgY3VycmVudFNvdXJjZUluZGV4ID0gcGlja1F1YWxpdHlGcm9tU291cmNlKHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50U291cmNlcygpKTtcblxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiY3VycmVudCBzb3VyY2UgaW5kZXggOiBcIisgY3VycmVudFNvdXJjZUluZGV4KTtcblxuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyID0gUHJvdmlkZXJzW2N1cnJlbnRTb3VyY2VJbmRleF0odmlkZW9FbGVtZW50LCBwbGF5ZXJDb25maWcpO1xuXG4gICAgICAgICAgICAvL1RoaXMgcGFzc2VzIHRoZSBldmVudCBjcmVhdGVkIGJ5IHRoZSBQcm92aWRlciB0byBBUEkuXG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIub24oXCJhbGxcIiwgZnVuY3Rpb24obmFtZSwgZGF0YSl7XG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKG5hbWUsIGRhdGEpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSkudGhlbigoKT0+e1xuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLnByZWxvYWQocGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRTb3VyY2VzKCksIGxhc3RQbGF5UG9zaXRpb24gKTtcblxuICAgICAgICAgICAgbGF6eVF1ZXVlLmZsdXNoKCk7XG4gICAgICAgICAgICAvL1RoaXMgaXMgbm8gcmVhc29uIHRvIGV4aXN0IGFueW1vcmUuXG4gICAgICAgICAgICBsYXp5UXVldWUuZGVzdHJveSgpO1xuXG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoUkVBRFkpO1xuICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yT2JqZWN0ID0ge2NvZGUgOiBJTklUX0VSUk9SLCByZWFzb24gOiBcImluaXQgZXJyb3IuXCIsIG1lc3NhZ2UgOiBcIlBsYXllciBpbml0IGVycm9yLlwiLCBlcnJvciA6IGVycm9yfTtcbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihFUlJPUiwgZXJyb3JPYmplY3QpO1xuXG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgIGluaXQoKeyLnCBzcmPqsIAg7JeG7J20IOy0iOq4sO2ZlCDtlZjripQg6rK97JqwLiAoc3JjIOyXhuydtCDstIjquLDtmZQg7ZWY64qU6rKMIOuqqOyInOydtOudvCDsg53qsIHsnbQg65Ok7KeA66eMKVxuICAgICAgICAgICAgICAgIHBsYXllckluc3RhbmNlLmNyZWF0ZShcImVsSWRcIiwge30pO1xuICAgICAgICAgICAgICAgIHBsYXllckluc3RhbmNlLmxvYWQoc3JjKTtcbiAgICAgICAgICAgICAgICDrpbwg64yA7J2R7ZWY6riwIOychO2VtCBzcmPsl4bslrQg7ZSE66Gc67CU7J2065OcIOuhnOuTnCDrqrvtlbQgaW5pdEVycm9yIOuwnOyDne2VmOuKlCDqsr3smrAgbG9hZOuKlCDtlZzrsogg7Iuk7ZaJ7ZWgIOyImCDsnojqsowg7ZW07KO87KaI7JWEXG4gICAgICAgICAgICAqL1xuICAgICAgICAgICAgbGF6eVF1ZXVlLnJlbW92ZUFuZEV4Y3V0ZU9uY2UoXCJsb2FkXCIpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBBUEkg7LSI6riw7ZmUIO2VqOyImFxuICAgICAqIGluaXRcbiAgICAgKiBAcGFyYW0gICAgICB7b2JqZWN0fSBvcHRpb25zIHBsYXllciBpbml0aWFsIG9wdGlvbiB2YWx1ZS5cbiAgICAgKiBAcmV0dXJuc1xuICAgICAqKi9cbiAgICB0aGF0LmluaXQgPSAob3B0aW9ucykgPT57XG4gICAgICAgIC8vSXQgY29sbGVjdHMgdGhlIGNvbW1hbmRzIGFuZCBleGVjdXRlcyB0aGVtIGF0IHRoZSB0aW1lIHdoZW4gdGhleSBhcmUgZXhlY3V0YWJsZS5cbiAgICAgICAgbGF6eVF1ZXVlID0gTGF6eUNvbW1hbmRFeGVjdXRvcih0aGF0LCBbJ2xvYWQnLCdwbGF5JywncGF1c2UnLCdzZWVrJywnc3RvcCcsICdnZXREdXJhdGlvbicsICdnZXRQb3NpdGlvbicsICdnZXRWb2x1bWUnLCAnZ2V0TXV0ZScsICdnZXRCdWZmZXInLCAnZ2V0U3RhdGUnXSk7XG4gICAgICAgIHBsYXllckNvbmZpZyA9IENvbmZpZ3VyYXRvcihvcHRpb25zKTtcbiAgICAgICAgaWYoIXBsYXllckNvbmZpZy5pc0RlYnVnKCkpe1xuICAgICAgICAgICAgbG9nTWFuYWdlci5kaXNhYmxlKCk7XG4gICAgICAgIH1cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaW5pdCgpXCIpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpbml0KCkgY29uZmlnIDogXCIsIHBsYXllckNvbmZpZyk7XG5cbiAgICAgICAgcGxheWxpc3RNYW5hZ2VyLnNldFBsYXlsaXN0KHBsYXllckNvbmZpZy5nZXRQbGF5bGlzdCgpKTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaW5pdCgpIHNvdXJjZXMgOiBcIiAsIHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50U291cmNlcygpKTtcbiAgICAgICAgaW5pdFByb3ZpZGVyKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldENvbmZpZyA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Q29uZmlnKClcIiwgcGxheWVyQ29uZmlnLmdldENvbmZpZygpKTtcbiAgICAgICAgcmV0dXJuIHBsYXllckNvbmZpZy5nZXRDb25maWcoKTtcbiAgICB9O1xuXG4gICAgdGhhdC5nZXREdXJhdGlvbiA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0RHVyYXRpb24oKVwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0RHVyYXRpb24oKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0RHVyYXRpb24oKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0UG9zaXRpb24gPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFBvc2l0aW9uKClcIiwgY3VycmVudFByb3ZpZGVyLmdldFBvc2l0aW9uKCkpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFBvc2l0aW9uKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldFZvbHVtZSA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Vm9sdW1lKClcIiwgY3VycmVudFByb3ZpZGVyLmdldFZvbHVtZSgpKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRWb2x1bWUoKTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Vm9sdW1lID0gKHZvbHVtZSkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRWb2x1bWUoKSBcIiArIHZvbHVtZSk7XG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5zZXRWb2x1bWUodm9sdW1lKTtcbiAgICB9O1xuICAgIHRoYXQuc2V0TXV0ZSA9IChzdGF0ZSkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRNdXRlKCkgXCIgKyBzdGF0ZSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2V0TXV0ZShzdGF0ZSk7XG4gICAgfTtcbiAgICB0aGF0LmdldE11dGUgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldE11dGUoKSBcIiArIGN1cnJlbnRQcm92aWRlci5nZXRNdXRlKCkpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldE11dGUoKTtcbiAgICB9O1xuICAgIHRoYXQubG9hZCA9IChwbGF5bGlzdCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBsb2FkKCkgXCIsIHBsYXlsaXN0KTtcbiAgICAgICAgbGF6eVF1ZXVlID0gTGF6eUNvbW1hbmRFeGVjdXRvcih0aGF0LCBbJ3BsYXknLCdzZWVrJywnc3RvcCddKTtcblxuICAgICAgICBpZihwbGF5bGlzdCl7XG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIuc2V0Q3VycmVudFF1YWxpdHkoMCk7XG4gICAgICAgICAgICBwbGF5bGlzdE1hbmFnZXIuc2V0UGxheWxpc3QocGxheWxpc3QpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbml0UHJvdmlkZXIoKTtcblxuICAgIH07XG4gICAgdGhhdC5wbGF5ID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBwbGF5KCkgXCIpO1xuICAgICAgICBjdXJyZW50UHJvdmlkZXIucGxheSgpO1xuICAgIH1cbiAgICB0aGF0LnBhdXNlID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBwYXVzZSgpIFwiKTtcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnBhdXNlKCk7XG4gICAgfTtcbiAgICB0aGF0LnNlZWsgPSAocG9zaXRpb24pID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2VlaygpIFwiKyBwb3NpdGlvbik7XG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5zZWVrKHBvc2l0aW9uKTtcbiAgICB9O1xuICAgIHRoYXQuc2V0UGxheWJhY2tSYXRlID0gKHBsYXliYWNrUmF0ZSkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldFBsYXliYWNrUmF0ZSgpIFwiLCBwbGF5YmFja1JhdGUpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLnNldFBsYXliYWNrUmF0ZShwbGF5ZXJDb25maWcuc2V0RGVmYXVsdFBsYXliYWNrUmF0ZShwbGF5YmFja1JhdGUpKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0UGxheWJhY2tSYXRlID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFBsYXliYWNrUmF0ZSgpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0UGxheWJhY2tSYXRlKCkpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFBsYXliYWNrUmF0ZSgpO1xuICAgIH07XG4gICAgdGhhdC5nZXRRdWFsaXR5TGV2ZWxzID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFF1YWxpdHlMZXZlbHMoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldFF1YWxpdHlMZXZlbHMoKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0UXVhbGl0eUxldmVscygpO1xuICAgIH07XG4gICAgdGhhdC5nZXRDdXJyZW50UXVhbGl0eSA9ICgpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRDdXJyZW50UXVhbGl0eSgpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFF1YWxpdHkoKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFF1YWxpdHkoKTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Q3VycmVudFF1YWxpdHkgPSAocXVhbGl0eUluZGV4KSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Q3VycmVudFF1YWxpdHkoKSBcIiwgcXVhbGl0eUluZGV4KTtcblxuICAgICAgICAvL+2YhOyerCDsnqzsg53spJHsnbgg7IaM7Iqk7J2YIO2UhOuhnOuwlOydtOuNlOyZgCDsg4jroZzsmrQgcXVhbGl0eUluZGV4IOyGjOyKpOydmCDtlITroZzrsJTsnbTrjZTqsIAg6rCZ64uk66m0IOq4sOyhtCDtlITroZzrsJTsnbTrjZTrpbwg7J6s7Zmc7Jqp7ZWc64ukLiDqt7jroIfsp4Ag7JWK7Jy866m0IGluaXRQcm92aWRlcigp66W8IO2Gte2VtCDsnqzroZzrlKlcbiAgICAgICAgbGV0IHNvdXJjZXMgPSBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKTtcbiAgICAgICAgbGV0IGN1cnJlbnRTb3VyY2UgPSBzb3VyY2VzW3RoYXQuZ2V0Q3VycmVudFF1YWxpdHkoKV07XG4gICAgICAgIGxldCBuZXdTb3VyY2UgPSBzb3VyY2VzW3F1YWxpdHlJbmRleF07XG4gICAgICAgIGxldCBsYXN0UGxheVBvc2l0aW9uID0gdGhhdC5nZXRQb3NpdGlvbigpO1xuICAgICAgICBsZXQgaXNTYW1lUHJvdmlkZXIgPSBwcm92aWRlckNvbnRyb2xsZXIuaXNTYW1lUHJvdmlkZXIoY3VycmVudFNvdXJjZSwgbmV3U291cmNlKTtcbiAgICAgICAgLy8gcHJvdmlkZXIuc2VyQ3VycmVudFF1YWxpdHkgLT4gcGxheWVyQ29uZmlnIHNldHRpbmcgLT4gbG9hZFxuICAgICAgICBsZXQgcmVzUXVhbGl0eUluZGV4ID0gY3VycmVudFByb3ZpZGVyLnNldEN1cnJlbnRRdWFsaXR5KHF1YWxpdHlJbmRleCwgaXNTYW1lUHJvdmlkZXIpO1xuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEN1cnJlbnRRdWFsaXR5KCkgaXNTYW1lUHJvdmlkZXJcIiwgaXNTYW1lUHJvdmlkZXIpO1xuXG4gICAgICAgIGlmKCFpc1NhbWVQcm92aWRlcil7XG4gICAgICAgICAgICBsYXp5UXVldWUgPSBMYXp5Q29tbWFuZEV4ZWN1dG9yKHRoYXQsIFsncGxheSddKTtcbiAgICAgICAgICAgIC8v7ZSE66Gc67CU7J20642U6rCAIOuzgOqyveuQoOuVjCDquLDsobQg7IOB7YOc66W8IOycoOyngCDtlaAg7IiYIOyXhuq4sCDrlYzrrLjsl5Ag7ZSE66Gc67CU7J20642UIOuzgOqyvSDsoIQg66eI7KeA66eJIOyerOyDnSDtj6zsp4DshZjsnYQg6rCA7KC47Jio64ukLlxuICAgICAgICAgICAgaW5pdFByb3ZpZGVyKGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc1F1YWxpdHlJbmRleDtcbiAgICB9O1xuXG4gICAgLyogQ2FwdGlvbnMgOiBUaGlzIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhlIGN1cnJlbnQgdmVyc2lvbi4qL1xuICAgIC8qdGhhdC5zZXRDdXJyZW50Q2FwdGlvbiA9IChpbmRleCkgPT57XG4gICAgICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5zZXRDdXJyZW50Q2FwdGlvbihpbmRleCk7XG4gICAgfVxuICAgIHRoYXQuZ2V0Q3VycmVudENhcHRpb24gPSAoKSA9PntcbiAgICAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLmdldEN1cnJlbnRDYXB0aW9uKCk7XG4gICAgfVxuICAgIHRoYXQuZ2V0Q2FwdGlvbkxpc3QgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5nZXRDYXB0aW9uTGlzdCgpO1xuICAgIH1cbiAgICB0aGF0LmFkZENhcHRpb24gPSAodHJhY2spID0+IHtcbiAgICAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLmFkZENhcHRpb24oKTtcbiAgICB9XG4gICAgdGhhdC5nZXRDYXB0aW9uTGlzdCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLmdldENhcHRpb25MaXN0KCk7XG4gICAgfSovXG5cbiAgICB0aGF0LmdldEJ1ZmZlciA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0QnVmZmVyKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRCdWZmZXIoKSk7XG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5nZXRCdWZmZXIoKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0U3RhdGUgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFN0YXRlKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRTdGF0ZSgpKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRTdGF0ZSgpO1xuICAgIH07XG4gICAgdGhhdC5zdG9wID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzdG9wKCkgXCIpO1xuICAgICAgICBjdXJyZW50UHJvdmlkZXIuc3RvcCgpO1xuICAgIH07XG4gICAgdGhhdC5yZW1vdmUgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHJlbW92ZSgpIFwiKTtcbiAgICAgICAgbGF6eVF1ZXVlLmRlc3Ryb3koKTtcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLmRlc3Ryb3koKTtcbiAgICAgICAgY3VycmVudFByb3ZpZGVyID0gbnVsbDtcbiAgICAgICAgcHJvdmlkZXJDb250cm9sbGVyID0gbnVsbDtcbiAgICAgICAgcGxheWxpc3RNYW5hZ2VyID0gbnVsbDtcbiAgICAgICAgcGxheWVyQ29uZmlnID0gbnVsbDtcblxuICAgICAgICB0aGF0LnRyaWdnZXIoREVTVFJPWSk7XG4gICAgICAgIHRoYXQub2ZmKCk7XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcmVtb3ZlKCkgLSBsYXp5UXVldWUsIGN1cnJlbnRQcm92aWRlciwgcHJvdmlkZXJDb250cm9sbGVyLCBwbGF5bGlzdE1hbmFnZXIsIHBsYXllckNvbmZpZywgYXBpIGV2ZW50IGRlc3Ryb2VkLiBcIik7XG4gICAgICAgIGxvZ01hbmFnZXIuZGVzdHJveSgpO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cblxuXG5leHBvcnQgZGVmYXVsdCBBcGk7XG5cblxuIiwiaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBUaGlzIGluaXRpYWxpemVzIHRoZSBpbnB1dCBvcHRpb25zLlxuICogQHBhcmFtICAgb3B0aW9uc1xuICpcbiAqICovXG5jb25zdCBDb25maWd1cmF0b3IgPSBmdW5jdGlvbihvcHRpb25zKXtcblxuICAgIGNvbnN0IGNvbXBvc2VTb3VyY2VPcHRpb25zID0gZnVuY3Rpb24ob3B0aW9ucyl7XG4gICAgICAgIGNvbnN0IERlZmF1bHRzID0ge1xuICAgICAgICAgICAgZGVmYXVsdFBsYXliYWNrUmF0ZTogMSxcbiAgICAgICAgICAgIHBsYXliYWNrUmF0ZUNvbnRyb2xzOiBmYWxzZSxcbiAgICAgICAgICAgIHBsYXliYWNrUmF0ZXM6IFswLjUsIDEsIDEuMjUsIDEuNSwgMl0sXG4gICAgICAgICAgICBtdXRlOiBmYWxzZSxcbiAgICAgICAgICAgIHZvbHVtZTogOTAsXG4gICAgICAgICAgICB3aWR0aDogNjQwLFxuICAgICAgICAgICAgaGVpZ2h0OiAzNjBcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgc2VyaWFsaXplID0gZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycgJiYgdmFsLmxlbmd0aCA8IDYpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsb3dlcmNhc2VWYWwgPSB2YWwudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICBpZiAobG93ZXJjYXNlVmFsID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChsb3dlcmNhc2VWYWwgPT09ICdmYWxzZScpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKE51bWJlcih2YWwpKSAmJiAhaXNOYU4ocGFyc2VGbG9hdCh2YWwpKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gTnVtYmVyKHZhbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkZXNlcmlhbGl6ZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSAnaWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3B0aW9uc1trZXldID0gc2VyaWFsaXplKG9wdGlvbnNba2V5XSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBub3JtYWxpemVTaXplID0gZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbC5zbGljZSAmJiB2YWwuc2xpY2UoLTIpID09PSAncHgnKSB7XG4gICAgICAgICAgICAgICAgdmFsID0gdmFsLnNsaWNlKDAsIC0yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZXZhbHVhdGVBc3BlY3RSYXRpbyA9IGZ1bmN0aW9uIChhciwgd2lkdGgpIHtcbiAgICAgICAgICAgIGlmICh3aWR0aC50b1N0cmluZygpLmluZGV4T2YoJyUnKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXIgIT09ICdzdHJpbmcnIHx8ICFhcikge1xuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKC9eXFxkKlxcLj9cXGQrJSQvLnRlc3QoYXIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBhci5pbmRleE9mKCc6Jyk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB3ID0gcGFyc2VGbG9hdChhci5zdWJzdHIoMCwgaW5kZXgpKTtcbiAgICAgICAgICAgIGNvbnN0IGggPSBwYXJzZUZsb2F0KGFyLnN1YnN0cihpbmRleCArIDEpKTtcbiAgICAgICAgICAgIGlmICh3IDw9IDAgfHwgaCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gKGggLyB3ICogMTAwKSArICclJztcbiAgICAgICAgfVxuICAgICAgICBkZXNlcmlhbGl6ZShvcHRpb25zKTtcbiAgICAgICAgbGV0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIERlZmF1bHRzLCBvcHRpb25zKTtcbiAgICAgICAgY29uZmlnLndpZHRoID0gbm9ybWFsaXplU2l6ZShjb25maWcud2lkdGgpO1xuICAgICAgICBjb25maWcuaGVpZ2h0ID0gbm9ybWFsaXplU2l6ZShjb25maWcuaGVpZ2h0KTtcbiAgICAgICAgY29uZmlnLmFzcGVjdHJhdGlvID0gZXZhbHVhdGVBc3BlY3RSYXRpbyhjb25maWcuYXNwZWN0cmF0aW8sIGNvbmZpZy53aWR0aCk7XG5cbiAgICAgICAgbGV0IHJhdGVDb250cm9scyA9IGNvbmZpZy5wbGF5YmFja1JhdGVDb250cm9scztcbiAgICAgICAgaWYgKHJhdGVDb250cm9scykge1xuICAgICAgICAgICAgbGV0IHJhdGVzID0gY29uZmlnLnBsYXliYWNrUmF0ZXM7XG5cbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJhdGVDb250cm9scykpIHtcbiAgICAgICAgICAgICAgICByYXRlcyA9IHJhdGVDb250cm9scztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJhdGVzID0gcmF0ZXMuZmlsdGVyKHJhdGUgPT4gXy5pc051bWJlcihyYXRlKSAmJiByYXRlID49IDAuMjUgJiYgcmF0ZSA8PSA0KVxuICAgICAgICAgICAgICAgIC5tYXAocmF0ZSA9PiBNYXRoLnJvdW5kKHJhdGUgKiA0KSAvIDQpO1xuXG4gICAgICAgICAgICBpZiAocmF0ZXMuaW5kZXhPZigxKSA8IDApIHtcbiAgICAgICAgICAgICAgICByYXRlcy5wdXNoKDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmF0ZXMuc29ydCgpO1xuXG4gICAgICAgICAgICBjb25maWcucGxheWJhY2tSYXRlQ29udHJvbHMgPSB0cnVlO1xuICAgICAgICAgICAgY29uZmlnLnBsYXliYWNrUmF0ZXMgPSByYXRlcztcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKCFjb25maWcucGxheWJhY2tSYXRlQ29udHJvbHMgfHwgY29uZmlnLnBsYXliYWNrUmF0ZXMuaW5kZXhPZihjb25maWcuZGVmYXVsdFBsYXliYWNrUmF0ZSkgPCAwKSB7XG4gICAgICAgICAgICBjb25maWcuZGVmYXVsdFBsYXliYWNrUmF0ZSA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBjb25maWcucGxheWJhY2tSYXRlID0gY29uZmlnLmRlZmF1bHRQbGF5YmFja1JhdGU7XG5cbiAgICAgICAgaWYgKCFjb25maWcuYXNwZWN0cmF0aW8pIHtcbiAgICAgICAgICAgIGRlbGV0ZSBjb25maWcuYXNwZWN0cmF0aW87XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb25maWdQbGF5bGlzdCA9IGNvbmZpZy5wbGF5bGlzdDtcbiAgICAgICAgaWYgKCFjb25maWdQbGF5bGlzdCkge1xuICAgICAgICAgICAgY29uc3Qgb2JqID0gXy5waWNrKGNvbmZpZywgW1xuICAgICAgICAgICAgICAgICd0aXRsZScsXG4gICAgICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJyxcbiAgICAgICAgICAgICAgICAndHlwZScsXG4gICAgICAgICAgICAgICAgJ21lZGlhaWQnLFxuICAgICAgICAgICAgICAgICdpbWFnZScsXG4gICAgICAgICAgICAgICAgJ2ZpbGUnLFxuICAgICAgICAgICAgICAgICdzb3VyY2VzJyxcbiAgICAgICAgICAgICAgICAndHJhY2tzJyxcbiAgICAgICAgICAgICAgICAncHJlbG9hZCcsXG4gICAgICAgICAgICAgICAgJ2R1cmF0aW9uJyxcbiAgICAgICAgICAgICAgICAnaG9zdCcsXG4gICAgICAgICAgICAgICAgJ2FwcGxpY2F0aW9uJyxcbiAgICAgICAgICAgICAgICAnc3RyZWFtJ1xuICAgICAgICAgICAgXSk7XG5cbiAgICAgICAgICAgIGNvbmZpZy5wbGF5bGlzdCA9IFsgb2JqIF07XG4gICAgICAgIH0gZWxzZSBpZiAoXy5pc0FycmF5KGNvbmZpZ1BsYXlsaXN0LnBsYXlsaXN0KSkge1xuICAgICAgICAgICAgY29uZmlnLmZlZWREYXRhID0gY29uZmlnUGxheWxpc3Q7XG4gICAgICAgICAgICBjb25maWcucGxheWxpc3QgPSBjb25maWdQbGF5bGlzdC5wbGF5bGlzdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGRlbGV0ZSBjb25maWcuZHVyYXRpb247XG4gICAgICAgIHJldHVybiBjb25maWc7XG4gICAgfTtcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDb25maWd1cmF0b3IgbG9hZGVkLlwiLCBvcHRpb25zKTtcbiAgICBsZXQgY29uZmlnID0gY29tcG9zZVNvdXJjZU9wdGlvbnMob3B0aW9ucyk7XG5cbiAgICBsZXQgYXNwZWN0cmF0aW8gPSBjb25maWcuYXNwZWN0cmF0aW8gfHwgXCIxNjo5XCI7XG4gICAgbGV0IGRlYnVnID0gY29uZmlnLmRlYnVnO1xuICAgIGxldCBkZWZhdWx0UGxheWJhY2tSYXRlID0gY29uZmlnLmRlZmF1bHRQbGF5YmFja1JhdGUgfHwgMTtcbiAgICBsZXQgaW1hZ2UgPSBjb25maWcuaW1hZ2U7XG4gICAgbGV0IHBsYXliYWNrUmF0ZUNvbnRyb2xzID0gY29uZmlnLnBsYXliYWNrUmF0ZUNvbnRyb2xzIHx8IHRydWU7XG4gICAgbGV0IHBsYXliYWNrUmF0ZXMgPSBjb25maWcucGxheWJhY2tSYXRlcyB8fCBbMC41LCAxLCAxLjI1LCAxLjUsIDJdO1xuICAgIGxldCBwbGF5bGlzdCA9IGNvbmZpZy5wbGF5bGlzdCB8fCBbXTtcbiAgICBsZXQgcXVhbGl0eUxhYmVsID0gY29uZmlnLnF1YWxpdHlMYWJlbCB8fCBcIlwiO1xuICAgIGxldCByZXBlYXQgPSBjb25maWcucmVwZWF0IHx8IGZhbHNlO1xuICAgIGxldCBzdHJldGNoaW5nID0gY29uZmlnLnN0cmV0Y2hpbmcgfHwgJ3VuaWZvcm0nO1xuXG5cblxuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICB0aGF0LmdldENvbmZpZyA9ICgpID0+IHtyZXR1cm4gY29uZmlnO307XG5cbiAgICB0aGF0LmdldEFzcGVjdHJhdGlvID0oKT0+e3JldHVybiBhc3BlY3RyYXRpbzt9O1xuICAgIHRoYXQuc2V0QXNwZWN0cmF0aW8gPShhc3BlY3RyYXRpb18pPT57YXNwZWN0cmF0aW8gPSBhc3BlY3RyYXRpb187fTtcblxuICAgIHRoYXQuaXNEZWJ1ZyA9KCk9PntyZXR1cm4gZGVidWc7fTtcblxuICAgIHRoYXQuZ2V0RGVmYXVsdFBsYXliYWNrUmF0ZSA9KCk9PntyZXR1cm4gZGVmYXVsdFBsYXliYWNrUmF0ZTt9O1xuICAgIHRoYXQuc2V0RGVmYXVsdFBsYXliYWNrUmF0ZSA9KHBsYXliYWNrUmF0ZSk9PntkZWZhdWx0UGxheWJhY2tSYXRlID0gcGxheWJhY2tSYXRlOyByZXR1cm4gcGxheWJhY2tSYXRlO307XG5cbiAgICB0aGF0LmdldFF1YWxpdHlMYWJlbCA9ICgpID0+IHtyZXR1cm4gcXVhbGl0eUxhYmVsO307XG4gICAgdGhhdC5zZXRRdWFsaXR5TGFiZWwgPSAobmV3TGFiZWwpID0+IHtxdWFsaXR5TGFiZWwgPSBuZXdMYWJlbDt9O1xuXG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGVzID0oKT0+e3JldHVybiBwbGF5YmFja1JhdGVzO307XG4gICAgdGhhdC5pc1BsYXliYWNrUmF0ZUNvbnRyb2xzID0oKT0+e3JldHVybiBwbGF5YmFja1JhdGVDb250cm9sczt9O1xuXG4gICAgdGhhdC5nZXRQbGF5bGlzdCA9KCk9PntyZXR1cm4gcGxheWxpc3Q7fTtcbiAgICB0aGF0LnNldFBsYXlsaXN0ID0ocGxheWxpc3RfICk9PntcbiAgICAgICAgaWYoXy5pc0FycmF5KHBsYXlsaXN0Xykpe1xuICAgICAgICAgICAgcGxheWxpc3QgPSBwbGF5bGlzdF87XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcGxheWxpc3QgPSBbcGxheWxpc3RfXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGxheWxpc3Q7XG4gICAgfTtcblxuICAgIHRoYXQuaXNSZXBlYXQgPSgpPT57cmV0dXJuIHJlcGVhdDt9O1xuXG4gICAgdGhhdC5nZXRTdHJldGNoaW5nID0oKT0+e3JldHVybiBzdHJldGNoaW5nO307XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbmZpZ3VyYXRvcjsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAzLi5cbiAqL1xuXG4vKipcbiAqIEBicmllZiAgIFRoaXMgbW9kdWxlIHByb3ZpZGUgY3VzdG9tIGV2ZW50cy5cbiAqIEBwYXJhbSAgIG9iamVjdCAgICBBbiBvYmplY3QgdGhhdCByZXF1aXJlcyBjdXN0b20gZXZlbnRzLlxuICpcbiAqICovXG5cbmNvbnN0IEV2ZW50RW1pdHRlciA9IGZ1bmN0aW9uKG9iamVjdCl7XG4gICAgbGV0IHRoYXQgPSBvYmplY3Q7XG4gICAgbGV0IF9ldmVudHMgPVtdO1xuXG4gICAgY29uc3QgdHJpZ2dlckV2ZW50cyA9IGZ1bmN0aW9uKGV2ZW50cywgYXJncywgY29udGV4dCl7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgbGV0IGxlbmd0aCA9IGV2ZW50cy5sZW5ndGg7XG4gICAgICAgIGZvcihpID0gMDsgaSA8IGxlbmd0aDsgaSArKyl7XG4gICAgICAgICAgICBsZXQgZXZlbnQgPSBldmVudHNbaV07XG4gICAgICAgICAgICBldmVudC5saXN0ZW5lci5hcHBseSggKCBldmVudC5jb250ZXh0IHx8IGNvbnRleHQgKSwgYXJncyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhhdC5vbiA9IGZ1bmN0aW9uKG5hbWUsIGxpc3RlbmVyLCBjb250ZXh0KXtcbiAgICAgICAgKF9ldmVudHNbbmFtZV0gfHwgKF9ldmVudHNbbmFtZV09W10pICkucHVzaCh7IGxpc3RlbmVyOiBsaXN0ZW5lciAgLCBjb250ZXh0IDogY29udGV4dH0pO1xuICAgICAgICByZXR1cm4gdGhhdDtcbiAgICB9O1xuICAgIHRoYXQudHJpZ2dlciA9IGZ1bmN0aW9uKG5hbWUpe1xuICAgICAgICBpZighX2V2ZW50cyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgY29uc3QgZXZlbnRzID0gX2V2ZW50c1tuYW1lXTtcbiAgICAgICAgY29uc3QgYWxsRXZlbnRzID0gX2V2ZW50cy5hbGw7XG5cbiAgICAgICAgaWYoZXZlbnRzKXtcbiAgICAgICAgICAgIHRyaWdnZXJFdmVudHMoZXZlbnRzLCBhcmdzLCB0aGF0KTtcbiAgICAgICAgfVxuICAgICAgICBpZihhbGxFdmVudHMpe1xuICAgICAgICAgICAgdHJpZ2dlckV2ZW50cyhhbGxFdmVudHMsIGFyZ3VtZW50cywgdGhhdCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQub2ZmID0gZnVuY3Rpb24obmFtZSwgbGlzdGVuZXIsIGNvbnRleHQpe1xuICAgICAgICBpZighX2V2ZW50cyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW5hbWUgJiYgIWxpc3RlbmVyICYmICFjb250ZXh0KSAge1xuICAgICAgICAgICAgX2V2ZW50cyA9IFtdO1xuICAgICAgICAgICAgcmV0dXJuIHRoYXQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuYW1lcyA9IG5hbWUgPyBbbmFtZV0gOiBPYmplY3Qua2V5cyhfZXZlbnRzKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBuYW1lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lc1tpXTtcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50cyA9IF9ldmVudHNbbmFtZV07XG4gICAgICAgICAgICBpZiAoZXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmV0YWluID0gX2V2ZW50c1tuYW1lXSA9IFtdO1xuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lciAgfHwgY29udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMCwgayA9IGV2ZW50cy5sZW5ndGg7IGogPCBrOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gZXZlbnRzW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChsaXN0ZW5lciAmJiBsaXN0ZW5lciAhPT0gZXZlbnQubGlzdGVuZXIgJiYgbGlzdGVuZXIgIT09IGV2ZW50Lmxpc3RlbmVyLmxpc3RlbmVyICAmJiBsaXN0ZW5lciAhPT0gZXZlbnQubGlzdGVuZXIuX2NhbGxiYWNrKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8KGNvbnRleHQgJiYgY29udGV4dCAhPT0gZXZlbnQuY29udGV4dClcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldGFpbi5wdXNoKGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXJldGFpbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIF9ldmVudHNbbmFtZV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGF0O1xuICAgIH07XG4gICAgdGhhdC5vbmNlID0gZnVuY3Rpb24obmFtZSwgbGlzdGVuZXIsIGNvbnRleHQpe1xuICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICBjb25zdCBvbmNlQ2FsbGJhY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChjb3VudCsrKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhhdC5vZmYobmFtZSwgb25jZUNhbGxiYWNrKTtcbiAgICAgICAgICAgIGxpc3RlbmVyLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgICAgIG9uY2VDYWxsYmFjay5fbGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgICAgICAgcmV0dXJuIHRoYXQub24obmFtZSwgb25jZUNhbGxiYWNrLCBjb250ZXh0KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IEV2ZW50RW1pdHRlcjsiLCJpbXBvcnQgXyBmcm9tICd1dGlscy91bmRlcnNjb3JlJztcblxuLyoqXG4gKiBAYnJpZWYgICBUaGlzIGV4ZWN1dGVzIHRoZSBpbnB1dCBjb21tYW5kcyBhdCBhIHNwZWNpZmljIHBvaW50IGluIHRpbWUuXG4gKiBAcGFyYW0gICBpbnN0YW5jZVxuICogQHBhcmFtICAgcXVldWVkQ29tbWFuZHNcbiAqICovXG5jb25zdCBMYXp5Q29tbWFuZEV4ZWN1dG9yID0gZnVuY3Rpb24gKGluc3RhbmNlLCBxdWV1ZWRDb21tYW5kcykge1xuICAgIGxldCBjb21tYW5kUXVldWUgPSBbXTtcbiAgICBsZXQgdW5kZWNvcmF0ZWRNZXRob2RzID0ge307XG4gICAgbGV0IGV4ZWN1dGVNb2RlID0gZmFsc2U7XG4gICAgbGV0IHRoYXQgPSB7fTtcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIGxvYWRlZC5cIik7XG4gICAgcXVldWVkQ29tbWFuZHMuZm9yRWFjaCgoY29tbWFuZCkgPT4ge1xuICAgICAgICBjb25zdCBtZXRob2QgPSBpbnN0YW5jZVtjb21tYW5kXTtcbiAgICAgICAgdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdID0gbWV0aG9kIHx8IGZ1bmN0aW9uKCl7fTtcblxuICAgICAgICBpbnN0YW5jZVtjb21tYW5kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc3QgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgICAgICAgICAgIGlmICghZXhlY3V0ZU1vZGUpIHtcbiAgICAgICAgICAgICAgICAvL2NvbW1hbmRRdWV1ZS5wdXNoKHsgY29tbWFuZCwgYXJncyB9KTtcbiAgICAgICAgICAgICAgICB0aGF0LmFkZFF1ZXVlKGNvbW1hbmQsIGFyZ3MpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGV4ZWN1dGVRdWV1ZWRDb21tYW5kcygpO1xuICAgICAgICAgICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kLmFwcGx5KHRoYXQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KTtcbiAgICB2YXIgZXhlY3V0ZVF1ZXVlZENvbW1hbmRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB3aGlsZSAoY29tbWFuZFF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHsgY29tbWFuZCwgYXJncyB9ID0gY29tbWFuZFF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICAodW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdIHx8IGluc3RhbmNlW2NvbW1hbmRdKS5hcHBseShpbnN0YW5jZSwgYXJncyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGF0LnNldEV4ZWN1dGVNb2RlID0gKG1vZGUpID0+IHtcbiAgICAgICAgZXhlY3V0ZU1vZGUgPSBtb2RlO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogc2V0RXhlY3V0ZU1vZGUoKVwiLCBtb2RlKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0VW5kZWNvcmF0ZWRNZXRob2RzID0gZnVuY3Rpb24oKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGdldFVuZGVjb3JhdGVkTWV0aG9kcygpXCIsIHVuZGVjb3JhdGVkTWV0aG9kcyk7XG4gICAgICAgIHJldHVybiB1bmRlY29yYXRlZE1ldGhvZHM7XG4gICAgfVxuICAgIHRoYXQuZ2V0UXVldWUgPSBmdW5jdGlvbigpe1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZ2V0UXVldWUoKVwiLCBnZXRRdWV1ZSk7XG4gICAgICAgIHJldHVybiBjb21tYW5kUXVldWU7XG4gICAgfVxuICAgIHRoYXQuYWRkUXVldWUgPSBmdW5jdGlvbihjb21tYW5kLCBhcmdzKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGFkZFF1ZXVlKClcIiwgY29tbWFuZCwgYXJncyk7XG4gICAgICAgIGNvbW1hbmRRdWV1ZS5wdXNoKHsgY29tbWFuZCwgYXJncyB9KTtcbiAgICB9XG5cbiAgICB0aGF0LmZsdXNoID0gZnVuY3Rpb24oKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGZsdXNoKClcIik7XG4gICAgICAgIGV4ZWN1dGVRdWV1ZWRDb21tYW5kcygpO1xuICAgIH07XG4gICAgdGhhdC5lbXB0eSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZW1wdHkoKVwiKTtcbiAgICAgICAgY29tbWFuZFF1ZXVlLmxlbmd0aCA9IDA7XG4gICAgfTtcbiAgICB0aGF0Lm9mZiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogb2ZmKClcIik7XG4gICAgICAgIHF1ZXVlZENvbW1hbmRzLmZvckVhY2goKGNvbW1hbmQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1ldGhvZCA9IHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXTtcbiAgICAgICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVtjb21tYW5kXSA9IG1ldGhvZDtcbiAgICAgICAgICAgICAgICBkZWxldGUgdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG5cbiAgICAvL1J1biBvbmNlIGF0IHRoZSBlbmRcbiAgICB0aGF0LnJlbW92ZUFuZEV4Y3V0ZU9uY2UgPSBmdW5jdGlvbihjb21tYW5kXyl7XG4gICAgICAgIGxldCBjb21tYW5kUXVldWVJdGVtID0gXy5maW5kV2hlcmUoY29tbWFuZFF1ZXVlLCB7Y29tbWFuZCA6IGNvbW1hbmRffSk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiByZW1vdmVBbmRFeGN1dGVPbmNlKClcIiwgY29tbWFuZF8pO1xuICAgICAgICBjb21tYW5kUXVldWUuc3BsaWNlKF8uZmluZEluZGV4KGNvbW1hbmRRdWV1ZSwge2NvbW1hbmQgOiBjb21tYW5kX30pLCAxKTtcblxuICAgICAgICBjb25zdCBtZXRob2QgPSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF9dO1xuICAgICAgICBpZiAobWV0aG9kKSB7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJyZW1vdmVDb21tYW5kKClcIik7XG4gICAgICAgICAgICBpZihjb21tYW5kUXVldWVJdGVtKXtcbiAgICAgICAgICAgICAgICAobWV0aG9kfHwgaW5zdGFuY2VbY29tbWFuZF9dKS5hcHBseShpbnN0YW5jZSwgY29tbWFuZFF1ZXVlSXRlbS5hcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluc3RhbmNlW2NvbW1hbmRfXSA9IG1ldGhvZDtcbiAgICAgICAgICAgIGRlbGV0ZSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF9dO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoYXQuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZGVzdHJveSgpXCIpO1xuICAgICAgICB0aGF0Lm9mZigpO1xuICAgICAgICB0aGF0LmVtcHR5KCk7XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTGF6eUNvbW1hbmRFeGVjdXRvcjsiLCJpbXBvcnQge2lzUnRtcCwgaXNXZWJSVEMsIGlzRGFzaH0gZnJvbSBcInV0aWxzL3ZhbGlkYXRvclwiO1xuXG4vKipcbiAqIEBicmllZiAgIFRoaXMgZmluZHMgdGhlIHByb3ZpZGVyIHRoYXQgbWF0Y2hlcyB0aGUgaW5wdXQgc291cmNlLlxuICogQHBhcmFtXG4gKiAqL1xuXG5jb25zdCBTdXBwb3J0Q2hlY2tlciA9IGZ1bmN0aW9uKCl7XG4gICAgY29uc3QgdGhhdCA9IHt9O1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlN1cHBvcnRDaGVja2VyIGxvYWRlZC5cIik7XG4gICAgY29uc3Qgc3VwcG9ydExpc3QgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdodG1sNScsXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBNaW1lVHlwZXMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGFhYzogJ2F1ZGlvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIG1wNDogJ3ZpZGVvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIGY0djogJ3ZpZGVvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIG00djogJ3ZpZGVvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIG1vdjogJ3ZpZGVvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIG1wMzogJ2F1ZGlvL21wZWcnLFxuICAgICAgICAgICAgICAgICAgICBtcGVnOiAnYXVkaW8vbXBlZycsXG4gICAgICAgICAgICAgICAgICAgIG9ndjogJ3ZpZGVvL29nZycsXG4gICAgICAgICAgICAgICAgICAgIG9nZzogJ3ZpZGVvL29nZycsXG4gICAgICAgICAgICAgICAgICAgIG9nYTogJ3ZpZGVvL29nZycsXG4gICAgICAgICAgICAgICAgICAgIHZvcmJpczogJ3ZpZGVvL29nZycsXG4gICAgICAgICAgICAgICAgICAgIHdlYm06ICd2aWRlby93ZWJtJyxcbiAgICAgICAgICAgICAgICAgICAgZjRhOiAndmlkZW8vYWFjJyxcbiAgICAgICAgICAgICAgICAgICAgbTN1ODogJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyxcbiAgICAgICAgICAgICAgICAgICAgbTN1OiAnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnLFxuICAgICAgICAgICAgICAgICAgICBobHM6ICdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCdcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgY29uc3QgdmlkZW8gPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKVxuICAgICAgICAgICAgICAgIH0oKTtcbiAgICAgICAgICAgICAgICBpZiAoIXZpZGVvLmNhblBsYXlUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gc291cmNlLmZpbGU7XG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNvdXJjZS50eXBlO1xuICAgICAgICAgICAgICAgIGlmKCF0eXBlKXtyZXR1cm4gZmFsc2U7fVxuICAgICAgICAgICAgICAgIGNvbnN0IG1pbWVUeXBlID0gc291cmNlLm1pbWVUeXBlIHx8IE1pbWVUeXBlc1t0eXBlXTtcblxuICAgICAgICAgICAgICAgIGlmIChpc1J0bXAoZmlsZSwgdHlwZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKGlzV2ViUlRDKGZpbGUsIHR5cGUpKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghbWltZVR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAhIXZpZGVvLmNhblBsYXlUeXBlKG1pbWVUeXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ3dlYnJ0YycsXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2aWRlbyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpXG4gICAgICAgICAgICAgICAgfSgpO1xuICAgICAgICAgICAgICAgIGlmICghdmlkZW8uY2FuUGxheVR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc291cmNlLnR5cGU7XG5cbiAgICAgICAgICAgICAgICBpZihpc1dlYlJUQyhmaWxlLCB0eXBlKSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnZGFzaCcsXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gc291cmNlLmZpbGU7XG5cbiAgICAgICAgICAgICAgICAvL21wZCBhcHBsaWNhdGlvbi9kYXNoK3htbFxuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcbiAgICAgICAgICAgICAgICBpZiAoaXNEYXNoKGZpbGUsIHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnaGxzJyxcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZpZGVvID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJylcbiAgICAgICAgICAgICAgICB9KCk7XG5cbiAgICAgICAgICAgICAgICAvL3RoaXMgbWV0aG9kIGZyb20gaGxzLmpzXG4gICAgICAgICAgICAgICAgY29uc3QgaXNIbHNTdXBwb3J0ID0gKCkgPT57XG4gICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBnZXRNZWRpYVNvdXJjZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuTWVkaWFTb3VyY2UgfHwgd2luZG93LldlYktpdE1lZGlhU291cmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciBtZWRpYVNvdXJjZSA9IGdldE1lZGlhU291cmNlKCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzb3VyY2VCdWZmZXIgPSB3aW5kb3cuU291cmNlQnVmZmVyIHx8IHdpbmRvdy5XZWJLaXRTb3VyY2VCdWZmZXI7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpc1R5cGVTdXBwb3J0ZWQgPSBtZWRpYVNvdXJjZSAmJiB0eXBlb2YgbWVkaWFTb3VyY2UuaXNUeXBlU3VwcG9ydGVkID09PSAnZnVuY3Rpb24nICYmIG1lZGlhU291cmNlLmlzVHlwZVN1cHBvcnRlZCgndmlkZW8vbXA0OyBjb2RlY3M9XCJhdmMxLjQyRTAxRSxtcDRhLjQwLjJcIicpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIFNvdXJjZUJ1ZmZlciBpcyBleHBvc2VkIGVuc3VyZSBpdHMgQVBJIGlzIHZhbGlkXG4gICAgICAgICAgICAgICAgICAgIC8vIHNhZmFyaSBhbmQgb2xkIHZlcnNpb24gb2YgQ2hyb21lIGRvZSBub3QgZXhwb3NlIFNvdXJjZUJ1ZmZlciBnbG9iYWxseSBzbyBjaGVja2luZyBTb3VyY2VCdWZmZXIucHJvdG90eXBlIGlzIGltcG9zc2libGVcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNvdXJjZUJ1ZmZlclZhbGlkQVBJID0gIXNvdXJjZUJ1ZmZlciB8fCBzb3VyY2VCdWZmZXIucHJvdG90eXBlICYmIHR5cGVvZiBzb3VyY2VCdWZmZXIucHJvdG90eXBlLmFwcGVuZEJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygc291cmNlQnVmZmVyLnByb3RvdHlwZS5yZW1vdmUgPT09ICdmdW5jdGlvbic7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhIWlzVHlwZVN1cHBvcnRlZCAmJiAhIXNvdXJjZUJ1ZmZlclZhbGlkQVBJO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLy9SZW1vdmUgdGhpcyAnISF2aWRlby5jYW5QbGF5VHlwZSgnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnKScgaWYgeW91IHdhbnQgdG8gdXNlIGhsc2pzLlxuICAgICAgICAgICAgICAgIHJldHVybiBpc0hsc1N1cHBvcnQoKSAmJiAhIXZpZGVvLmNhblBsYXlUeXBlKCdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgXTtcblxuICAgIHRoYXQuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlID0gKHNvcnVjZV8pID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU3VwcG9ydENoZWNrZXIgOiBmaW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UoKVwiLCBzb3J1Y2VfKTtcbiAgICAgICAgY29uc3Qgc291cmNlID0gKHNvcnVjZV8gPT09IE9iamVjdChzb3J1Y2VfKSkgPyBzb3J1Y2VfIDoge307XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBzdXBwb3J0TGlzdC5sZW5ndGg7IGkgKyspe1xuICAgICAgICAgICAgaWYoc3VwcG9ydExpc3RbaV0uY2hlY2tTdXBwb3J0KHNvdXJjZSkpe1xuICAgICAgICAgICAgICAgIHJldHVybiBzdXBwb3J0TGlzdFtpXS5uYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LmZpbmRQcm92aWRlck5hbWVzQnlQbGF5bGlzdCA9IChwbGF5bGlzdF8pID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU3VwcG9ydENoZWNrZXIgOiBmaW5kUHJvdmlkZXJOYW1lc0J5UGxheWxpc3QoKVwiLCBwbGF5bGlzdF8pO1xuICAgICAgICBsZXQgc3VwcG9ydE5hbWVzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSBwbGF5bGlzdF8ubGVuZ3RoOyBpLS07KSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gcGxheWxpc3RfW2ldO1xuICAgICAgICAgICAgbGV0IHNvdXJjZSA9IFwiXCI7XG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgaXRlbS5zb3VyY2VzLmxlbmd0aDsgaiArKyl7XG4gICAgICAgICAgICAgICAgc291cmNlID0gaXRlbS5zb3VyY2VzW2pdO1xuICAgICAgICAgICAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3VwcG9ydGVkID0gdGhhdC5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2Uoc291cmNlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1cHBvcnRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VwcG9ydE5hbWVzLnB1c2goc3VwcG9ydGVkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3VwcG9ydE5hbWVzO1xuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTdXBwb3J0Q2hlY2tlcjsiLCIvLyBTVEFURVxuZXhwb3J0IGNvbnN0IFNUQVRFX0JVRkZFUklORyA9ICdidWZmZXJpbmcnO1xuZXhwb3J0IGNvbnN0IFNUQVRFX0lETEUgPSAnaWRsZSc7XG5leHBvcnQgY29uc3QgU1RBVEVfQ09NUExFVEUgPSAnY29tcGxldGUnO1xuZXhwb3J0IGNvbnN0IFNUQVRFX1BBVVNFRCA9ICdwYXVzZWQnO1xuZXhwb3J0IGNvbnN0IFNUQVRFX1BMQVlJTkcgPSAncGxheWluZyc7XG5leHBvcnQgY29uc3QgU1RBVEVfRVJST1IgPSAnZXJyb3InO1xuZXhwb3J0IGNvbnN0IFNUQVRFX0xPQURJTkcgPSAnbG9hZGluZyc7XG5leHBvcnQgY29uc3QgU1RBVEVfU1RBTExFRCA9ICdzdGFsbGVkJztcblxuLy8gUFJPVklERVJcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9IVE1MNSA9ICdodG1sNSc7XG5leHBvcnQgY29uc3QgUFJPVklERVJfV0VCUlRDID0gJ3dlYnJ0Yyc7XG5leHBvcnQgY29uc3QgUFJPVklERVJfREFTSCA9ICdkYXNoJztcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9ITFMgPSAnaGxzJztcblxuLy8gRVZFTlRTXG5leHBvcnQgY29uc3QgQ09OVEVOVF9DT01QTEVURSA9IFNUQVRFX0NPTVBMRVRFO1xuZXhwb3J0IGNvbnN0IFJFQURZID0gJ3JlYWR5JztcbmV4cG9ydCBjb25zdCBERVNUUk9ZID0gJ2Rlc3Ryb3knO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfU0VFSyA9ICdzZWVrJztcbmV4cG9ydCBjb25zdCBDT05URU5UX0JVRkZFUl9GVUxMID0gJ2J1ZmZlckZ1bGwnO1xuZXhwb3J0IGNvbnN0IERJU1BMQVlfQ0xJQ0sgPSAnZGlzcGxheUNsaWNrJztcbmV4cG9ydCBjb25zdCBDT05URU5UX0xPQURFRCA9ICdsb2FkZWQnO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfU0VFS0VEID0gJ3NlZWtlZCc7XG5cbmV4cG9ydCBjb25zdCBFUlJPUiA9ICdlcnJvcic7XG5cbi8vIFNUQVRFIE9GIFBMQVlFUlxuZXhwb3J0IGNvbnN0IFBMQVlFUl9TVEFURSA9ICdzdGF0ZUNoYW5nZWQnO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9DT01QTEVURSA9IFNUQVRFX0NPTVBMRVRFO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9QQVVTRSA9ICdwYXVzZSc7XG5leHBvcnQgY29uc3QgUExBWUVSX1BMQVkgPSAncGxheSc7XG5cbmV4cG9ydCBjb25zdCBDT05URU5UX0JVRkZFUiA9ICdidWZmZXJDaGFuZ2VkJztcbmV4cG9ydCBjb25zdCBDT05URU5UX1RJTUUgPSAndGltZSc7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9SQVRFX0NIQU5HRSA9ICdyYXRlY2hhbmdlJztcbmV4cG9ydCBjb25zdCBDT05URU5UX1ZPTFVNRSA9ICd2b2x1bWVDaGFuZ2VkJztcbmV4cG9ydCBjb25zdCBDT05URU5UX01VVEUgPSAnbXV0ZSc7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9NRVRBID0gJ21ldGFDaGFuZ2VkJztcbmV4cG9ydCBjb25zdCBDT05URU5UX0xFVkVMUyA9ICdxdWFsaXR5TGV2ZWxDaGFuZ2VkJztcbmV4cG9ydCBjb25zdCBDT05URU5UX0xFVkVMX0NIQU5HRUQgPSAnY3VycmVudFF1YWxpdHlMZXZlbENoYW5nZWQnO1xuZXhwb3J0IGNvbnN0IFBMQVlCQUNLX1JBVEVfQ0hBTkdFRCA9ICdwbGF5YmFja1JhdGVDaGFuZ2VkJztcbmV4cG9ydCBjb25zdCBDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQgPSAnY3VlQ2hhbmdlZCc7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9DQVBUSU9OX0NIQU5HRUQgPSAnY2FwdGlvbkNoYW5nZWQnO1xuXG5cbmV4cG9ydCBjb25zdCBJTklUX0VSUk9SID0gMTAwO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX0VSUk9SID0gMzAwO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUiA9IDMwMTtcbmV4cG9ydCBjb25zdCBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SID0gMzAyO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUiA9IDMwMztcbmV4cG9ydCBjb25zdCBQTEFZRVJfRklMRV9FUlJPUiA9IDMwNDtcbmV4cG9ydCBjb25zdCBQTEFZRVJfQ0FQVElPTl9FUlJPUiA9IDMwNTtcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1dTX0VSUk9SID0gNTAxO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfV1NfQ0xPU0VEID0gNTAyO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUiA9IDUwMztcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1NFVF9SRU1PVEVfREVTQ19FUlJPUiA9IDUwNDtcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX0NSRUFURV9BTlNXRVJfRVJST1IgPSA1MDU7XG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUiA9IDUwNjtcbiIsIi8qKlxuICogQGJyaWVmICAg66+465SU7Ja0IOyXmOumrOuovO2KuOulvCDqtIDrpqztlZjripQg6rCd7LK0LiDtmITsnqzripQg7ZWY64qUIOydvOydtCDrp47sp4Ag7JWK64ukLlxuICogQHBhcmFtICAge2VsZW1lbnR9ICAgY29udGFpbmVyICAgZG9tIGVsZW1lbnRcbiAqXG4gKiAqL1xuXG5jb25zdCBNYW5hZ2VyID0gZnVuY3Rpb24oY29udGFpbmVyKXtcbiAgICBjb25zdCB0aGF0ID0ge307XG4gICAgbGV0IG1lZGlhRWxlbWVudCA9IFwiXCI7XG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTWVkaWFNYW5hZ2VyIGxvYWRlZC5cIik7XG4gICAgY29uc3QgY3JlYXRlTWVkaWFFbGVtZW50ID0gZnVuY3Rpb24oKXtcblxuICAgICAgICBtZWRpYUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCdkaXNhYmxlUmVtb3RlUGxheWJhY2snLCAnJyk7XG4gICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3dlYmtpdC1wbGF5c2lubGluZScsICcnKTtcbiAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgncGxheXNpbmxpbmUnLCAnJyk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChtZWRpYUVsZW1lbnQpO1xuXG4gICAgICAgIHJldHVybiBtZWRpYUVsZW1lbnQ7XG4gICAgfTtcblxuICAgIHRoYXQuY3JlYXRlRWxlbWVudCA9ICgpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJNZWRpYU1hbmFnZXIgY3JlYXRlRWxlbWVudCgpXCIpO1xuICAgICAgICBpZighbWVkaWFFbGVtZW50KXtcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVNZWRpYUVsZW1lbnQoKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjb250YWluZXIucmVtb3ZlQ2hpbGQobWVkaWFFbGVtZW50KTtcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVNZWRpYUVsZW1lbnQoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE1hbmFnZXI7IiwiaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcbmltcG9ydCB7aXNSdG1wLCBpc1dlYlJUQywgaXNEYXNoIH0gZnJvbSBcInV0aWxzL3ZhbGlkYXRvclwiO1xuaW1wb3J0IHtleHRyYWN0RXh0ZW5zaW9uICx0cmltfSBmcm9tIFwiLi4vLi4vdXRpbHMvc3RyaW5nc1wiO1xuaW1wb3J0IFN1cHBvcnRDaGVja2VyIGZyb20gXCIuLi9TdXBwb3J0Q2hlY2tlclwiO1xuXG4vKipcbiAqIEBicmllZiAgIFRoaXMgbWFuYWdlcyBQbGF5bGlzdCBvciBTb3VyY2VzLlxuICogQHBhcmFtXG4gKlxuICogKi9cbmNvbnN0IE1hbmFnZXIgPSBmdW5jdGlvbigpe1xuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICBsZXQgY3VycmVudFBsYXlsaXN0ID0gW107XG4gICAgbGV0IHNjID0gU3VwcG9ydENoZWNrZXIoKTtcblxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBsb2FkZWQuXCIpO1xuXG4gICAgY29uc3QgbWFrZVByZXR0eVNvdXJjZSA9IGZ1bmN0aW9uKHNvdXJjZV8pe1xuICAgICAgICBpZiAoIXNvdXJjZV8gfHwgIXNvdXJjZV8uZmlsZSAmJiAhKHNvdXJjZV8uaG9zdCB8fCBzb3VyY2VfLmFwcGxpY2F0aW9uIHx8IHNvdXJjZV8uc3RyZWFtKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNvdXJjZSA9IE9iamVjdC5hc3NpZ24oe30sIHsgJ2RlZmF1bHQnOiBmYWxzZSB9LCBzb3VyY2VfKTtcbiAgICAgICAgc291cmNlLmZpbGUgPSB0cmltKCcnICsgc291cmNlLmZpbGUpO1xuXG4gICAgICAgIGlmKHNvdXJjZS5ob3N0ICYmIHNvdXJjZS5hcHBsaWNhdGlvbiAmJiBzb3VyY2Uuc3RyZWFtKXtcbiAgICAgICAgICAgIHNvdXJjZS5maWxlID0gc291cmNlLmhvc3QgKyBcIi9cIiArIHNvdXJjZS5hcHBsaWNhdGlvbiArIFwiL3N0cmVhbS9cIiArIHNvdXJjZS5zdHJlYW07XG4gICAgICAgICAgICBkZWxldGUgc291cmNlLmhvc3Q7XG4gICAgICAgICAgICBkZWxldGUgc291cmNlLmFwcGxpY2F0aW9uO1xuICAgICAgICAgICAgZGVsZXRlIHNvdXJjZS5zdHJlYW07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtaW1ldHlwZVJlZ0V4ID0gL15bXi9dK1xcLyg/OngtKT8oW14vXSspJC87XG5cbiAgICAgICAgaWYgKG1pbWV0eXBlUmVnRXgudGVzdChzb3VyY2UudHlwZSkpIHtcbiAgICAgICAgICAgIC8vIGlmIHR5cGUgaXMgZ2l2ZW4gYXMgYSBtaW1ldHlwZVxuICAgICAgICAgICAgc291cmNlLm1pbWVUeXBlID0gc291cmNlLnR5cGU7XG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9IHNvdXJjZS50eXBlLnJlcGxhY2UobWltZXR5cGVSZWdFeCwgJyQxJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihpc1J0bXAoc291cmNlLmZpbGUpKXtcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ3J0bXAnO1xuICAgICAgICB9ZWxzZSBpZihpc1dlYlJUQyhzb3VyY2UuZmlsZSkpe1xuICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnd2VicnRjJztcbiAgICAgICAgfWVsc2UgaWYoaXNEYXNoKHNvdXJjZS5maWxlLCBzb3VyY2UudHlwZSkpe1xuICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnZGFzaCc7XG4gICAgICAgIH1lbHNlIGlmICghc291cmNlLnR5cGUpIHtcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gZXh0cmFjdEV4dGVuc2lvbihzb3VyY2UuZmlsZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXNvdXJjZS50eXBlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBub3JtYWxpemUgdHlwZXNcbiAgICAgICAgc3dpdGNoIChzb3VyY2UudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnbTN1OCc6XG4gICAgICAgICAgICBjYXNlICd2bmQuYXBwbGUubXBlZ3VybCc6XG4gICAgICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnaGxzJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ200YSc6XG4gICAgICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnYWFjJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3NtaWwnOlxuICAgICAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ3J0bXAnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICBpZiAoc291cmNlW2tleV0gPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHNvdXJjZVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc291cmNlO1xuXG4gICAgfVxuXG4gICAgdGhhdC5zZXRQbGF5bGlzdCA9KHBsYXlsaXN0KSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIHNldFBsYXlsaXN0KCkgXCIsIHBsYXlsaXN0KTtcbiAgICAgICAgY29uc3QgcHJldHRpZWRQbGF5bGlzdCA9IChfLmlzQXJyYXkocGxheWxpc3QpID8gcGxheWxpc3QgOiBbcGxheWxpc3RdKS5tYXAoZnVuY3Rpb24oaXRlbSl7XG4gICAgICAgICAgICBpZighXy5pc0FycmF5KGl0ZW0udHJhY2tzKSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBpdGVtLnRyYWNrcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBwbGF5bGlzdEl0ZW0gPSBPYmplY3QuYXNzaWduKHt9LHtcbiAgICAgICAgICAgICAgICBzb3VyY2VzOiBbXSxcbiAgICAgICAgICAgICAgICB0cmFja3M6IFtdXG4gICAgICAgICAgICB9LCBpdGVtICk7XG5cbiAgICAgICAgICAgIGlmKChwbGF5bGlzdEl0ZW0uc291cmNlcyA9PT0gT2JqZWN0KHBsYXlsaXN0SXRlbS5zb3VyY2VzKSkgJiYgIV8uaXNBcnJheShwbGF5bGlzdEl0ZW0uc291cmNlcykpIHtcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IFttYWtlUHJldHR5U291cmNlKHBsYXlsaXN0SXRlbS5zb3VyY2VzKV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKCFfLmlzQXJyYXkocGxheWxpc3RJdGVtLnNvdXJjZXMpIHx8IHBsYXlsaXN0SXRlbS5zb3VyY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmxldmVscykge1xuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IGl0ZW0ubGV2ZWxzO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gW21ha2VQcmV0dHlTb3VyY2UoaXRlbSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcGxheWxpc3RJdGVtLnNvdXJjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgc291cmNlID0gcGxheWxpc3RJdGVtLnNvdXJjZXNbaV07XG4gICAgICAgICAgICAgICAgbGV0IHByZXR0eVNvdXJjZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgaWYgKCFzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGRlZmF1bHRTb3VyY2UgPSBzb3VyY2UuZGVmYXVsdDtcbiAgICAgICAgICAgICAgICBpZiAoZGVmYXVsdFNvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2UuZGVmYXVsdCA9IChkZWZhdWx0U291cmNlLnRvU3RyaW5nKCkgPT09ICd0cnVlJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlLmRlZmF1bHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgc291cmNlIGRvZXNuJ3QgaGF2ZSBhIGxhYmVsLCBudW1iZXIgaXRcbiAgICAgICAgICAgICAgICBpZiAoIXBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldLmxhYmVsID0gaS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHByZXR0eVNvdXJjZSA9IG1ha2VQcmV0dHlTb3VyY2UocGxheWxpc3RJdGVtLnNvdXJjZXNbaV0pO1xuICAgICAgICAgICAgICAgIGlmKHNjLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShwcmV0dHlTb3VyY2UpKXtcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0gPSBwcmV0dHlTb3VyY2U7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gcGxheWxpc3RJdGVtLnNvdXJjZXMuZmlsdGVyKHNvdXJjZSA9PiAhIXNvdXJjZSk7XG5cbiAgICAgICAgICAgIC8vIGRlZmF1bHQg6rCAIOyXhuydhOuVjCB3ZWJydGPqsIAg7J6I64uk66m0IHdlYnJ0YyBkZWZhdWx0IDogdHJ1ZeuhnCDsnpDrj5kg7ISk7KCVXG4gICAgICAgICAgICAvKmxldCBoYXZlRGVmYXVsdCA9IF8uZmluZChwbGF5bGlzdEl0ZW0uc291cmNlcywgZnVuY3Rpb24oc291cmNlKXtyZXR1cm4gc291cmNlLmRlZmF1bHQgPT0gdHJ1ZTt9KTtcbiAgICAgICAgICAgIGxldCB3ZWJydGNTb3VyY2UgPSBbXTtcbiAgICAgICAgICAgIGlmKCFoYXZlRGVmYXVsdCl7XG4gICAgICAgICAgICAgICAgd2VicnRjU291cmNlID0gXy5maW5kKHBsYXlsaXN0SXRlbS5zb3VyY2VzLCBmdW5jdGlvbihzb3VyY2Upe3JldHVybiBzb3VyY2UudHlwZSA9PSBcIndlYnJ0Y1wiO30pO1xuICAgICAgICAgICAgICAgIGlmKHdlYnJ0Y1NvdXJjZSl7XG4gICAgICAgICAgICAgICAgICAgIHdlYnJ0Y1NvdXJjZS5kZWZhdWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9Ki9cblxuXG5cbiAgICAgICAgICAgIGlmKCFfLmlzQXJyYXkocGxheWxpc3RJdGVtLnRyYWNrcykpe1xuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS50cmFja3MgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKF8uaXNBcnJheShwbGF5bGlzdEl0ZW0uY2FwdGlvbnMpKXtcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0udHJhY2tzID0gcGxheWxpc3RJdGVtLnRyYWNrcy5jb25jYXQocGxheWxpc3RJdGVtLmNhcHRpb25zKTtcbiAgICAgICAgICAgICAgICBkZWxldGUgcGxheWxpc3RJdGVtLmNhcHRpb25zO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwbGF5bGlzdEl0ZW0udHJhY2tzID0gcGxheWxpc3RJdGVtLnRyYWNrcy5tYXAoZnVuY3Rpb24odHJhY2spe1xuICAgICAgICAgICAgICAgIGlmKCF0cmFjayB8fCAhdHJhY2suZmlsZSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHtcbiAgICAgICAgICAgICAgICAgICAgJ2tpbmQnOiAnY2FwdGlvbnMnLFxuICAgICAgICAgICAgICAgICAgICAnZGVmYXVsdCc6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSwgdHJhY2spO1xuICAgICAgICAgICAgfSkuZmlsdGVyKHRyYWNrID0+ICEhdHJhY2spO1xuXG4gICAgICAgICAgICByZXR1cm4gcGxheWxpc3RJdGVtO1xuICAgICAgICB9KTtcbiAgICAgICAgY3VycmVudFBsYXlsaXN0ID0gcHJldHRpZWRQbGF5bGlzdDtcbiAgICAgICAgcmV0dXJuIHByZXR0aWVkUGxheWxpc3Q7XG4gICAgfTtcbiAgICB0aGF0LmdldFBsYXlsaXN0ID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQbGF5bGlzdE1hbmFnZXIgZ2V0UGxheWxpc3QoKSBcIiwgY3VycmVudFBsYXlsaXN0KTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQbGF5bGlzdDtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Q3VycmVudFNvdXJjZXMgPSAoKSA9PiB7XG4gICAgICAgIC8vV2UgZG8gbm90IHN1cHBvcnQgXCJQTEFZTElTVFwiIG5vdCB5ZXQuIFNvIHRoaXMgcmV0dXJucyBwbGF5bGlzdCBvZiAwLlxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQbGF5bGlzdE1hbmFnZXIgZ2V0Q3VycmVudFNvdXJjZXMoKSBcIiwgY3VycmVudFBsYXlsaXN0WzBdLnNvdXJjZXMpO1xuICAgICAgICByZXR1cm4gY3VycmVudFBsYXlsaXN0WzBdLnNvdXJjZXM7XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCBNYW5hZ2VyOyIsImltcG9ydCBTdXBwb3J0Q2hlY2tlciBmcm9tIFwiYXBpL1N1cHBvcnRDaGVja2VyXCI7XG5pbXBvcnQgUHJvbWlzZSwge3Jlc29sdmVkfSBmcm9tIFwiYXBpL3NoaW1zL3Byb21pc2VcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBUaGlzIG1hbmFnZXMgcHJvdmlkZXIuXG4gKiBAcGFyYW1cbiAqICovXG5jb25zdCBDb250cm9sbGVyID0gZnVuY3Rpb24oKXtcbiAgICBsZXQgc2MgPSBTdXBwb3J0Q2hlY2tlcigpO1xuICAgIGNvbnN0IFByb3ZpZGVycyA9IHt9O1xuXG4gICAgY29uc3QgdGhhdCA9IHt9O1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBsb2FkZWQuXCIpO1xuXG4gICAgY29uc3QgcmVnaXN0ZXJQcm92aWRlciA9IChuYW1lLCBwcm92aWRlcikgPT57XG4gICAgICAgIGlmKFByb3ZpZGVyc1tuYW1lXSl7XG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICB9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBfcmVnaXN0ZXJQcm92aWRlcigpIFwiLCBuYW1lKTtcbiAgICAgICAgUHJvdmlkZXJzW25hbWVdID0gcHJvdmlkZXI7XG4gICAgfTtcblxuICAgIGNvbnN0IFByb3ZpZGVyTG9hZGVyID17XG4gICAgICAgIGh0bWw1OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci9odG1sNS9IdG1sNSddLCBmdW5jdGlvbihyZXF1aXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2h0bWw1L0h0bWw1JykuZGVmYXVsdDtcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZXJQcm92aWRlcihcImh0bWw1XCIsIHByb3ZpZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyO1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xuICAgICAgICAgICAgICAgIH0sJ292ZW5wbGF5ZXIucHJvdmlkZXIuaHRtbDUnXG4gICAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICB3ZWJydGMgOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL3dlYnJ0Yy9XZWJSVEMnXSwgZnVuY3Rpb24ocmVxdWlyZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci93ZWJydGMvV2ViUlRDJykuZGVmYXVsdDtcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZXJQcm92aWRlcihcIndlYnJ0Y1wiLCBwcm92aWRlcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm92aWRlcjtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcbiAgICAgICAgICAgICAgICB9LCdvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgZGFzaCA6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvZGFzaC9EYXNoJ10sIGZ1bmN0aW9uKHJlcXVpcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvZGFzaC9EYXNoJykuZGVmYXVsdDtcbiAgICAgICAgICAgICAgICAgICAgUHJvdmlkZXJzW1wiZGFzaFwiXSA9IHByb3ZpZGVyO1xuICAgICAgICAgICAgICAgICAgICByZWdpc3RlclByb3ZpZGVyKFwiZGFzaFwiLCBwcm92aWRlcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm92aWRlcjtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcbiAgICAgICAgICAgICAgICB9LCdvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcidcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIGhscyA6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvaGxzL0hscyddLCBmdW5jdGlvbihyZXF1aXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2hscy9IbHMnKS5kZWZhdWx0O1xuICAgICAgICAgICAgICAgICAgICByZWdpc3RlclByb3ZpZGVyKFwiaGxzXCIsIHByb3ZpZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyO1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xuICAgICAgICAgICAgICAgIH0sJ292ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXInXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LmxvYWRQcm92aWRlcnMgPSAocGxheWxpc3QpID0+e1xuICAgICAgICBjb25zdCBzdXBwb3J0ZWRQcm92aWRlck5hbWVzID0gc2MuZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0KHBsYXlsaXN0KTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGxvYWRQcm92aWRlcnMoKSBcIiwgc3VwcG9ydGVkUHJvdmlkZXJOYW1lcyk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChcbiAgICAgICAgICAgIHN1cHBvcnRlZFByb3ZpZGVyTmFtZXMuZmlsdGVyKGZ1bmN0aW9uKHByb3ZpZGVyTmFtZSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuICEhUHJvdmlkZXJMb2FkZXJbcHJvdmlkZXJOYW1lXTtcbiAgICAgICAgICAgIH0pLm1hcChmdW5jdGlvbihwcm92aWRlck5hbWUpe1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gUHJvdmlkZXJMb2FkZXJbcHJvdmlkZXJOYW1lXSgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm92aWRlcjtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfTtcblxuICAgIHRoYXQuZmluZEJ5TmFtZSA9IChuYW1lKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBmaW5kQnlOYW1lKCkgXCIsIG5hbWUpO1xuICAgICAgICByZXR1cm4gUHJvdmlkZXJzW25hbWVdO1xuICAgIH07XG5cbiAgICB0aGF0LmdldFByb3ZpZGVyQnlTb3VyY2UgPSAoc291cmNlKSA9PiB7XG4gICAgICAgIGNvbnN0IHN1cHBvcnRlZFByb3ZpZGVyTmFtZSA9IHNjLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShzb3VyY2UpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgZ2V0UHJvdmlkZXJCeVNvdXJjZSgpIFwiLCBzdXBwb3J0ZWRQcm92aWRlck5hbWUpO1xuICAgICAgICByZXR1cm4gdGhhdC5maW5kQnlOYW1lKHN1cHBvcnRlZFByb3ZpZGVyTmFtZSk7XG4gICAgfTtcblxuICAgIHRoYXQuaXNTYW1lUHJvdmlkZXIgPSAoY3VycmVudFNvdXJjZSwgbmV3U291cmNlKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBpc1NhbWVQcm92aWRlcigpIFwiLCBzYy5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UoY3VycmVudFNvdXJjZSkgLCBzYy5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UobmV3U291cmNlKSApO1xuICAgICAgICByZXR1cm4gc2MuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKGN1cnJlbnRTb3VyY2UpID09IHNjLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShuZXdTb3VyY2UpO1xuXG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29udHJvbGxlcjsiLCIvLyAgICAgIFByb21pc2UgUG9seWZpbGxcbi8vICAgICAgaHR0cHM6Ly9naXRodWIuY29tL3RheWxvcmhha2VzL3Byb21pc2UtcG9seWZpbGxcbi8vICAgICAgQ29weXJpZ2h0IChjKSAyMDE0IFRheWxvciBIYWtlc1xuLy8gICAgICBDb3B5cmlnaHQgKGMpIDIwMTQgRm9yYmVzIExpbmRlc2F5XG4vLyAgICAgIHRheWxvcmhha2VzL3Byb21pc2UtcG9seWZpbGwgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXG5cbmNvbnN0IHByb21pc2VGaW5hbGx5ID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICB2YXIgY29uc3RydWN0b3IgPSB0aGlzLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiB0aGlzLnRoZW4oXG4gICAgICAgIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gY29uc3RydWN0b3IucmVzb2x2ZShjYWxsYmFjaygpKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAgICAgICAgIHJldHVybiBjb25zdHJ1Y3Rvci5yZXNvbHZlKGNhbGxiYWNrKCkpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnN0cnVjdG9yLnJlamVjdChyZWFzb24pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICApO1xufTtcblxuLy8gU3RvcmUgc2V0VGltZW91dCByZWZlcmVuY2Ugc28gcHJvbWlzZS1wb2x5ZmlsbCB3aWxsIGJlIHVuYWZmZWN0ZWQgYnlcbi8vIG90aGVyIGNvZGUgbW9kaWZ5aW5nIHNldFRpbWVvdXQgKGxpa2Ugc2lub24udXNlRmFrZVRpbWVycygpKVxuY29uc3Qgc2V0VGltZW91dEZ1bmMgPSB3aW5kb3cuc2V0VGltZW91dDtcbmNvbnN0IHNldEltbWVkaWF0ZUZ1bmMgPSB3aW5kb3cuc2V0SW1tZWRpYXRlO1xuXG5mdW5jdGlvbiBub29wKCkge31cblxuLy8gUG9seWZpbGwgZm9yIEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kXG5mdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBmbi5hcHBseSh0aGlzQXJnLCBhcmd1bWVudHMpO1xuICAgIH07XG59XG5cbmNvbnN0IFByb21pc2VTaGltID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFByb21pc2UpKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdQcm9taXNlcyBtdXN0IGJlIGNvbnN0cnVjdGVkIHZpYSBuZXcnKTtcbiAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdub3QgYSBmdW5jdGlvbicpO1xuICAgIHRoaXMuX3N0YXRlID0gMDtcbiAgICB0aGlzLl9oYW5kbGVkID0gZmFsc2U7XG4gICAgdGhpcy5fdmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fZGVmZXJyZWRzID0gW107XG5cbiAgICBkb1Jlc29sdmUoZm4sIHRoaXMpO1xufVxuXG5jb25zdCBoYW5kbGUgPSBmdW5jdGlvbiAoc2VsZiwgZGVmZXJyZWQpIHtcbiAgICB3aGlsZSAoc2VsZi5fc3RhdGUgPT09IDMpIHtcbiAgICAgICAgc2VsZiA9IHNlbGYuX3ZhbHVlO1xuICAgIH1cbiAgICBpZiAoc2VsZi5fc3RhdGUgPT09IDApIHtcbiAgICAgICAgc2VsZi5fZGVmZXJyZWRzLnB1c2goZGVmZXJyZWQpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHNlbGYuX2hhbmRsZWQgPSB0cnVlO1xuICAgIFByb21pc2UuX2ltbWVkaWF0ZUZuKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY2IgPSBzZWxmLl9zdGF0ZSA9PT0gMSA/IGRlZmVycmVkLm9uRnVsZmlsbGVkIDogZGVmZXJyZWQub25SZWplY3RlZDtcbiAgICAgICAgaWYgKGNiID09PSBudWxsKSB7XG4gICAgICAgICAgICAoc2VsZi5fc3RhdGUgPT09IDEgPyByZXNvbHZlIDogcmVqZWN0KShkZWZlcnJlZC5wcm9taXNlLCBzZWxmLl92YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJldDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldCA9IGNiKHNlbGYuX3ZhbHVlKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmVqZWN0KGRlZmVycmVkLnByb21pc2UsIGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUoZGVmZXJyZWQucHJvbWlzZSwgcmV0KTtcbiAgICB9KTtcbn1cblxuY29uc3QgcmVzb2x2ZSA9IGZ1bmN0aW9uIChzZWxmLCBuZXdWYWx1ZSkge1xuICAgIHRyeSB7XG4gICAgICAgIC8vIFByb21pc2UgUmVzb2x1dGlvbiBQcm9jZWR1cmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9wcm9taXNlcy1hcGx1cy9wcm9taXNlcy1zcGVjI3RoZS1wcm9taXNlLXJlc29sdXRpb24tcHJvY2VkdXJlXG4gICAgICAgIGlmIChuZXdWYWx1ZSA9PT0gc2VsZilcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0EgcHJvbWlzZSBjYW5ub3QgYmUgcmVzb2x2ZWQgd2l0aCBpdHNlbGYuJyk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIG5ld1ZhbHVlICYmXG4gICAgICAgICAgICAodHlwZW9mIG5ld1ZhbHVlID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgbmV3VmFsdWUgPT09ICdmdW5jdGlvbicpXG4gICAgICAgICkge1xuICAgICAgICAgICAgdmFyIHRoZW4gPSBuZXdWYWx1ZS50aGVuO1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgIHNlbGYuX3N0YXRlID0gMztcbiAgICAgICAgICAgICAgICBzZWxmLl92YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgICAgIGZpbmFsZShzZWxmKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgZG9SZXNvbHZlKGJpbmQodGhlbiwgbmV3VmFsdWUpLCBzZWxmKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5fc3RhdGUgPSAxO1xuICAgICAgICBzZWxmLl92YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICBmaW5hbGUoc2VsZik7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZWplY3Qoc2VsZiwgZSk7XG4gICAgfVxufVxuXG5jb25zdCByZWplY3QgPWZ1bmN0aW9uIChzZWxmLCBuZXdWYWx1ZSkge1xuICAgIHNlbGYuX3N0YXRlID0gMjtcbiAgICBzZWxmLl92YWx1ZSA9IG5ld1ZhbHVlO1xuICAgIGZpbmFsZShzZWxmKTtcbn1cblxuY29uc3QgZmluYWxlID0gZnVuY3Rpb24gKHNlbGYpIHtcbiAgICBpZiAoc2VsZi5fc3RhdGUgPT09IDIgJiYgc2VsZi5fZGVmZXJyZWRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBQcm9taXNlLl9pbW1lZGlhdGVGbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghc2VsZi5faGFuZGxlZCkge1xuICAgICAgICAgICAgICAgIFByb21pc2UuX3VuaGFuZGxlZFJlamVjdGlvbkZuKHNlbGYuX3ZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHNlbGYuX2RlZmVycmVkcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBoYW5kbGUoc2VsZiwgc2VsZi5fZGVmZXJyZWRzW2ldKTtcbiAgICB9XG4gICAgc2VsZi5fZGVmZXJyZWRzID0gbnVsbDtcbn1cblxuY29uc3QgSGFuZGxlciA9IGZ1bmN0aW9uIChvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCwgcHJvbWlzZSkge1xuICAgIHRoaXMub25GdWxmaWxsZWQgPSB0eXBlb2Ygb25GdWxmaWxsZWQgPT09ICdmdW5jdGlvbicgPyBvbkZ1bGZpbGxlZCA6IG51bGw7XG4gICAgdGhpcy5vblJlamVjdGVkID0gdHlwZW9mIG9uUmVqZWN0ZWQgPT09ICdmdW5jdGlvbicgPyBvblJlamVjdGVkIDogbnVsbDtcbiAgICB0aGlzLnByb21pc2UgPSBwcm9taXNlO1xufVxuXG4vKipcbiAqIFRha2UgYSBwb3RlbnRpYWxseSBtaXNiZWhhdmluZyByZXNvbHZlciBmdW5jdGlvbiBhbmQgbWFrZSBzdXJlXG4gKiBvbkZ1bGZpbGxlZCBhbmQgb25SZWplY3RlZCBhcmUgb25seSBjYWxsZWQgb25jZS5cbiAqXG4gKiBNYWtlcyBubyBndWFyYW50ZWVzIGFib3V0IGFzeW5jaHJvbnkuXG4gKi9cbmNvbnN0IGRvUmVzb2x2ZSA9IGZ1bmN0aW9uIChmbiwgc2VsZikge1xuICAgIHZhciBkb25lID0gZmFsc2U7XG4gICAgdHJ5IHtcbiAgICAgICAgZm4oXG4gICAgICAgICAgICBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChkb25lKSByZXR1cm47XG4gICAgICAgICAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShzZWxmLCB2YWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRvbmUpIHJldHVybjtcbiAgICAgICAgICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZWplY3Qoc2VsZiwgcmVhc29uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9IGNhdGNoIChleCkge1xuICAgICAgICBpZiAoZG9uZSkgcmV0dXJuO1xuICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgcmVqZWN0KHNlbGYsIGV4KTtcbiAgICB9XG59XG5cblByb21pc2VTaGltLnByb3RvdHlwZVsnY2F0Y2gnXSA9IGZ1bmN0aW9uKG9uUmVqZWN0ZWQpIHtcbiAgICByZXR1cm4gdGhpcy50aGVuKG51bGwsIG9uUmVqZWN0ZWQpO1xufTtcblxuUHJvbWlzZVNoaW0ucHJvdG90eXBlLnRoZW4gPSBmdW5jdGlvbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuICAgIHZhciBwcm9tID0gbmV3IHRoaXMuY29uc3RydWN0b3Iobm9vcCk7XG5cbiAgICBoYW5kbGUodGhpcywgbmV3IEhhbmRsZXIob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQsIHByb20pKTtcbiAgICByZXR1cm4gcHJvbTtcbn07XG5cblByb21pc2VTaGltLnByb3RvdHlwZVsnZmluYWxseSddID0gcHJvbWlzZUZpbmFsbHk7XG5cblByb21pc2VTaGltLmFsbCA9IGZ1bmN0aW9uKGFycikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgaWYgKCFhcnIgfHwgdHlwZW9mIGFyci5sZW5ndGggPT09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUHJvbWlzZS5hbGwgYWNjZXB0cyBhbiBhcnJheScpO1xuICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFycik7XG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHJlc29sdmUoW10pO1xuICAgICAgICB2YXIgcmVtYWluaW5nID0gYXJncy5sZW5ndGg7XG5cbiAgICAgICAgZnVuY3Rpb24gcmVzKGksIHZhbCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAodmFsICYmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGhlbiA9IHZhbC50aGVuO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoZW4uY2FsbChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24odmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcyhpLCB2YWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFyZ3NbaV0gPSB2YWw7XG4gICAgICAgICAgICAgICAgaWYgKC0tcmVtYWluaW5nID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoYXJncyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICByZXMoaSwgYXJnc1tpXSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cblByb21pc2VTaGltLnJlc29sdmUgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlLmNvbnN0cnVjdG9yID09PSBQcm9taXNlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICB9KTtcbn07XG5cblByb21pc2VTaGltLnJlamVjdCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICByZWplY3QodmFsdWUpO1xuICAgIH0pO1xufTtcblxuUHJvbWlzZVNoaW0ucmFjZSA9IGZ1bmN0aW9uKHZhbHVlcykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHZhbHVlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgdmFsdWVzW2ldLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuLy8gVXNlIHBvbHlmaWxsIGZvciBzZXRJbW1lZGlhdGUgZm9yIHBlcmZvcm1hbmNlIGdhaW5zXG5Qcm9taXNlU2hpbS5faW1tZWRpYXRlRm4gPVxuICAgICh0eXBlb2Ygc2V0SW1tZWRpYXRlRnVuYyA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgIGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgIHNldEltbWVkaWF0ZUZ1bmMoZm4pO1xuICAgIH0pIHx8XG4gICAgZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgc2V0SW1tZWRpYXRlRnVuYyhmbiwgMCk7XG4gICAgfTtcblxuUHJvbWlzZVNoaW0uX3VuaGFuZGxlZFJlamVjdGlvbkZuID0gZnVuY3Rpb24gX3VuaGFuZGxlZFJlamVjdGlvbkZuKGVycikge1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgY29uc29sZSkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ1Bvc3NpYmxlIFVuaGFuZGxlZCBQcm9taXNlIFJlamVjdGlvbjonLCBlcnIpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICB9XG59O1xuXG5jb25zdCBQcm9taXNlID0gd2luZG93LlByb21pc2UgfHwgKHdpbmRvdy5Qcm9taXNlID0gUHJvbWlzZVNoaW0pO1xuXG5leHBvcnQgY29uc3QgcmVzb2x2ZWQgPSBQcm9taXNlLnJlc29sdmUoKTtcblxuZXhwb3J0IGRlZmF1bHQgUHJvbWlzZTsiLCJpbXBvcnQgQVBJIGZyb20gJ2FwaS9BcGknO1xuaW1wb3J0IHtpc1dlYlJUQ30gZnJvbSAndXRpbHMvdmFsaWRhdG9yJztcbmltcG9ydCBfIGZyb20gJ3V0aWxzL3VuZGVyc2NvcmUnO1xuaW1wb3J0IHtnZXRTY3JpcHRQYXRofSBmcm9tICd1dGlscy93ZWJwYWNrJztcblxuXG5fX3dlYnBhY2tfcHVibGljX3BhdGhfXyA9IGdldFNjcmlwdFBhdGgoJ292ZW5wbGF5ZXIuc2RrLmpzJyk7XG5cbi8qKlxuICogTWFpbiBPdmVuUGxheWVyU0RLIG9iamVjdFxuICovXG5jb25zdCBPdmVuUGxheWVyU0RLID0gd2luZG93Lk92ZW5QbGF5ZXJTREsgPSB7fTtcblxuY29uc3QgdmVyc2lvbiA9ICcwLjAuMSc7XG5cbmNvbnN0IHBsYXllckxpc3QgPSBPdmVuUGxheWVyU0RLLnBsYXllckxpc3QgPSBbXTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrQW5kR2V0Q29udGFpbmVyRWxlbWVudCA9IGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuXG4gICAgaWYgKCFjb250YWluZXIpIHtcblxuICAgICAgICAvLyBUT0RPKHJvY2spOiBTaG91bGQgY2F1c2UgYW4gZXJyb3IuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGxldCBjb250YWluZXJFbGVtZW50ID0gbnVsbDtcblxuICAgIGlmICh0eXBlb2YgY29udGFpbmVyID09PSAnc3RyaW5nJykge1xuXG4gICAgICAgIGNvbnRhaW5lckVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb250YWluZXIpO1xuICAgIH0gZWxzZSBpZiAoY29udGFpbmVyLm5vZGVUeXBlKSB7XG5cbiAgICAgICAgY29udGFpbmVyRWxlbWVudCA9IGNvbnRhaW5lcjtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBUT0RPKHJvY2spOiBTaG91bGQgY2F1c2UgYW4gZXJyb3IuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBjb250YWluZXJFbGVtZW50O1xufVxuXG4vKipcbiAqIENyZWF0ZSBwbGF5ZXIgaW5zdGFuY2UgYW5kIHJldHVybiBpdC5cbiAqXG4gKiBAcGFyYW0gICAgICB7c3RyaW5nIHwgZG9tIGVsZW1lbnR9IGNvbnRhaW5lciAgSWQgb2YgY29udGFpbmVyIGVsZW1lbnQgb3IgY29udGFpbmVyIGVsZW1lbnRcbiAqIEBwYXJhbSAgICAgIHtvYmplY3R9IG9wdGlvbnMgIFRoZSBvcHRpb25zXG4gKi9cbk92ZW5QbGF5ZXJTREsuY3JlYXRlID0gZnVuY3Rpb24oY29udGFpbmVyLCBvcHRpb25zKSB7XG5cbiAgICBsZXQgY29udGFpbmVyRWxlbWVudCA9IGNoZWNrQW5kR2V0Q29udGFpbmVyRWxlbWVudChjb250YWluZXIpO1xuXG4gICAgY29uc3QgcGxheWVySW5zdGFuY2UgPSBBUEkoY29udGFpbmVyRWxlbWVudCk7XG4gICAgcGxheWVySW5zdGFuY2UuaW5pdChvcHRpb25zKTtcblxuICAgIHBsYXllckxpc3QucHVzaChwbGF5ZXJJbnN0YW5jZSk7XG5cbiAgICByZXR1cm4gcGxheWVySW5zdGFuY2U7XG59O1xuXG4vKipcbiAqIEdldHMgdGhlIHBsYXllciBpbnN0YW5jZSBsaXN0LlxuICpcbiAqIEByZXR1cm4gICAgIHthcnJheX0gIFRoZSBwbGF5ZXIgbGlzdC5cbiAqL1xuT3ZlblBsYXllclNESy5nZXRQbGF5ZXJMaXN0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICByZXR1cm4gcGxheWVyTGlzdDtcbn07XG5cbi8qKlxuICogR2V0cyB0aGUgcGxheWVyIGluc3RhbmNlIGJ5IGNvbnRhaW5lciBpZC5cbiAqXG4gKiBAcGFyYW0gICAgICB7c3RyaW5nfSAgY29udGFpbmVySWQgIFRoZSBjb250YWluZXIgaWRlbnRpZmllclxuICogQHJldHVybiAgICAge29iZWplY3QgfCBudWxsfSAgVGhlIHBsYXllciBpbnN0YW5jZS5cbiAqL1xuT3ZlblBsYXllclNESy5nZXRQbGF5ZXJCeUNvbnRhaW5lcklkID0gZnVuY3Rpb24oY29udGFpbmVySWQpIHtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxheWVyTGlzdC5sZW5ndGggLTE7IGkgKyspIHtcblxuICAgICAgICBpZiAocGxheWVyTGlzdFtpXS5jb250YWluZXJJZCA9PT0gY29udGFpbmVySWQpIHtcblxuICAgICAgICAgICAgcmV0dXJuIHBsYXllckxpc3RbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbn07XG5cbi8qKlxuICogR2V0cyB0aGUgcGxheWVyIGluc3RhbmNlIGJ5IGluZGV4LlxuICpcbiAqIEBwYXJhbSAgICAgIHtudW1iZXJ9ICBpbmRleCAgIFRoZSBpbmRleFxuICogQHJldHVybiAgICAge29iamVjdCB8IG51bGx9ICBUaGUgcGxheWVyIGluc3RhbmNlLlxuICovXG5PdmVuUGxheWVyU0RLLmdldFBsYXllckJ5SW5kZXggPSBmdW5jdGlvbihpbmRleCkge1xuXG4gICAgY29uc3QgcGxheWVySW5zdGFuY2UgPSBwbGF5ZXJMaXN0W2luZGV4XTtcblxuICAgIGlmIChwbGF5ZXJJbnN0YW5jZSkge1xuXG4gICAgICAgIHJldHVybiBwbGF5ZXJJbnN0YW5jZTtcbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn07XG5cbi8qKlxuICogR2VuZXJhdGUgd2VicnRjIHNvdXJjZSBmb3IgcGxheWVyIHNvdXJjZSB0eXBlLlxuICpcbiAqIEBwYXJhbSAgICAgIHtPYmplY3QgfCBBcnJheX0gIHNvdXJjZSAgIHdlYnJ0YyBzb3VyY2VcbiAqIEByZXR1cm4gICAgIHtBcnJheX0gIFBsYXllciBzb3VyY2UgT2JlamN0LlxuICovXG5PdmVuUGxheWVyU0RLLmdlbmVyYXRlV2VicnRjVXJscyA9IGZ1bmN0aW9uKHNvdXJjZXMpIHtcbiAgICByZXR1cm4gKF8uaXNBcnJheShzb3VyY2VzKSA/IHNvdXJjZXMgOiBbc291cmNlc10pLm1hcChmdW5jdGlvbihzb3VyY2UsIGluZGV4KXtcbiAgICAgICAgaWYoc291cmNlLmhvc3QgJiYgaXNXZWJSVEMoc291cmNlLmhvc3QpICYmIHNvdXJjZS5hcHBsaWNhdGlvbiAmJiBzb3VyY2Uuc3RyZWFtKXtcbiAgICAgICAgICAgIHJldHVybiB7ZmlsZSA6IHNvdXJjZS5ob3N0ICsgXCIvXCIgKyBzb3VyY2UuYXBwbGljYXRpb24gKyBcIi9cIiArIHNvdXJjZS5zdHJlYW0sIHR5cGUgOiBcIndlYnJ0Y1wiLCBsYWJlbCA6IHNvdXJjZS5sYWJlbCA/IHNvdXJjZS5sYWJlbCA6IFwid2VicnRjLVwiKyhpbmRleCsxKSB9O1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBPdmVuUGxheWVyU0RLOyIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDUuIDI0Li5cbiAqL1xuXG5jb25zdCBsb2dnZXIgPSBmdW5jdGlvbigpe1xuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICBsZXQgcHJldkNvbnNvbGVMb2cgPSBudWxsO1xuXG4gICAgd2luZG93Lk92ZW5QbGF5ZXJDb25zb2xlID0ge2xvZyA6IHdpbmRvd1snY29uc29sZSddWydsb2cnXX07XG5cbiAgICB0aGF0LmVuYWJsZSA9ICgpID0+e1xuICAgICAgICBpZihwcmV2Q29uc29sZUxvZyA9PSBudWxsKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZVsnbG9nJ10gPSBwcmV2Q29uc29sZUxvZztcbiAgICB9O1xuICAgIHRoYXQuZGlzYWJsZSA9ICgpID0+e1xuICAgICAgICBwcmV2Q29uc29sZUxvZyA9IGNvbnNvbGUubG9nO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZVsnbG9nJ10gPSBmdW5jdGlvbigpe307XG4gICAgfTtcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgd2luZG93Lk92ZW5QbGF5ZXJDb25zb2xlID0gbnVsbDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IGxvZ2dlcjsiLCJpbXBvcnQgXyBmcm9tICcuL3VuZGVyc2NvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gdHJpbShzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcbn1cblxuLyoqXG4gKiBleHRyYWN0RXh0ZW5zaW9uXG4gKlxuICogQHBhcmFtICAgICAge3N0cmluZ30gcGF0aCBmb3IgdXJsXG4gKiBAcmV0dXJuICAgICB7c3RyaW5nfSAgRXh0ZW5zaW9uXG4gKi9cbmV4cG9ydCBjb25zdCBleHRyYWN0RXh0ZW5zaW9uID0gZnVuY3Rpb24ocGF0aCkge1xuICAgIGlmKCFwYXRoIHx8IHBhdGguc3Vic3RyKDAsNCk9PSdydG1wJykge1xuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0QXp1cmVGaWxlRm9ybWF0KHBhdGgpIHtcbiAgICAgICAgbGV0IGV4dGVuc2lvbiA9IFwiXCI7XG4gICAgICAgIGlmICgoL1soLF1mb3JtYXQ9bXBkLS9pKS50ZXN0KHBhdGgpKSB7XG4gICAgICAgICAgICBleHRlbnNpb24gPSAnbXBkJztcbiAgICAgICAgfWVsc2UgaWYgKCgvWygsXWZvcm1hdD1tM3U4LS9pKS50ZXN0KHBhdGgpKSB7XG4gICAgICAgICAgICBleHRlbnNpb24gPSAnbTN1OCc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV4dGVuc2lvbjtcbiAgICB9XG5cbiAgICBsZXQgYXp1cmVkRm9ybWF0ID0gZ2V0QXp1cmVGaWxlRm9ybWF0KHBhdGgpO1xuICAgIGlmKGF6dXJlZEZvcm1hdCkge1xuICAgICAgICByZXR1cm4gYXp1cmVkRm9ybWF0O1xuICAgIH1cbiAgICBwYXRoID0gcGF0aC5zcGxpdCgnPycpWzBdLnNwbGl0KCcjJylbMF07XG4gICAgaWYocGF0aC5sYXN0SW5kZXhPZignLicpID4gLTEpIHtcbiAgICAgICAgcmV0dXJuIHBhdGguc3Vic3RyKHBhdGgubGFzdEluZGV4T2YoJy4nKSArIDEsIHBhdGgubGVuZ3RoKS50b0xvd2VyQ2FzZSgpO1xuICAgIH1lbHNle1xuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG59O1xuXG5cbi8qKlxuICogbmF0dXJhbEhtc1xuICpcbiAqIEBwYXJhbSAgICAgIHtudW1iZXIgfCBzdHJpbmd9ICBzZWNvbmQgIFRoZSBzZWNvbmRcbiAqIEByZXR1cm4gICAgIHtzdHJpbmd9ICBmb3JtYXR0ZWQgU3RyaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBuYXR1cmFsSG1zKHNlY29uZCkge1xuICAgIGxldCBzZWNOdW0gPSBwYXJzZUludChzZWNvbmQsIDEwKTtcbiAgICBsZXQgaG91cnMgICA9IE1hdGguZmxvb3Ioc2VjTnVtIC8gMzYwMCk7XG4gICAgbGV0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKChzZWNOdW0gLSAoaG91cnMgKiAzNjAwKSkgLyA2MCk7XG4gICAgbGV0IHNlY29uZHMgPSBzZWNOdW0gLSAoaG91cnMgKiAzNjAwKSAtIChtaW51dGVzICogNjApO1xuXG4gICAgaWYgKGhvdXJzID4gMCkge21pbnV0ZXMgPSBcIjBcIittaW51dGVzO31cbiAgICBpZiAoc2Vjb25kcyA8IDEwKSB7c2Vjb25kcyA9IFwiMFwiK3NlY29uZHM7fVxuXG4gICAgaWYgKGhvdXJzID4gMCkge1xuICAgICAgICByZXR1cm4gaG91cnMrJzonK21pbnV0ZXMrJzonK3NlY29uZHM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG1pbnV0ZXMrJzonK3NlY29uZHM7XG4gICAgfVxufSIsIlxuLy8gICAgIFVuZGVyc2NvcmUuanMgMS45LjBcbi8vICAgICBodHRwOi8vdW5kZXJzY29yZWpzLm9yZ1xuLy8gICAgIChjKSAyMDA5LTIwMTggSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbi8vICAgICBVbmRlcnNjb3JlIG1heSBiZSBmcmVlbHkgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuXG5cbiAgLy8gQmFzZWxpbmUgc2V0dXBcbiAgLy8gLS0tLS0tLS0tLS0tLS1cblxuICAvLyBFc3RhYmxpc2ggdGhlIHJvb3Qgb2JqZWN0LCBgd2luZG93YCAoYHNlbGZgKSBpbiB0aGUgYnJvd3NlciwgYGdsb2JhbGBcbiAgLy8gb24gdGhlIHNlcnZlciwgb3IgYHRoaXNgIGluIHNvbWUgdmlydHVhbCBtYWNoaW5lcy4gV2UgdXNlIGBzZWxmYFxuICAvLyBpbnN0ZWFkIG9mIGB3aW5kb3dgIGZvciBgV2ViV29ya2VyYCBzdXBwb3J0LlxuICB2YXIgcm9vdCA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYuc2VsZiA9PT0gc2VsZiAmJiBzZWxmIHx8XG4gICAgICAgICAgICB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbC5nbG9iYWwgPT09IGdsb2JhbCAmJiBnbG9iYWwgfHxcbiAgICAgICAgICAgIHRoaXMgfHxcbiAgICAgICAgICAgIHt9O1xuXG4gIC8vIFNhdmUgdGhlIHByZXZpb3VzIHZhbHVlIG9mIHRoZSBgX2AgdmFyaWFibGUuXG4gIHZhciBwcmV2aW91c1VuZGVyc2NvcmUgPSByb290Ll87XG5cbiAgLy8gU2F2ZSBieXRlcyBpbiB0aGUgbWluaWZpZWQgKGJ1dCBub3QgZ3ppcHBlZCkgdmVyc2lvbjpcbiAgdmFyIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGUsIE9ialByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIFN5bWJvbFByb3RvID0gdHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgPyBTeW1ib2wucHJvdG90eXBlIDogbnVsbDtcblxuICAvLyBDcmVhdGUgcXVpY2sgcmVmZXJlbmNlIHZhcmlhYmxlcyBmb3Igc3BlZWQgYWNjZXNzIHRvIGNvcmUgcHJvdG90eXBlcy5cbiAgdmFyIHB1c2ggPSBBcnJheVByb3RvLnB1c2gsXG4gICAgICBzbGljZSA9IEFycmF5UHJvdG8uc2xpY2UsXG4gICAgICB0b1N0cmluZyA9IE9ialByb3RvLnRvU3RyaW5nLFxuICAgICAgaGFzT3duUHJvcGVydHkgPSBPYmpQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuICAvLyBBbGwgKipFQ01BU2NyaXB0IDUqKiBuYXRpdmUgZnVuY3Rpb24gaW1wbGVtZW50YXRpb25zIHRoYXQgd2UgaG9wZSB0byB1c2VcbiAgLy8gYXJlIGRlY2xhcmVkIGhlcmUuXG4gIHZhciBuYXRpdmVJc0FycmF5ID0gQXJyYXkuaXNBcnJheSxcbiAgICAgIG5hdGl2ZUtleXMgPSBPYmplY3Qua2V5cyxcbiAgICAgIG5hdGl2ZUNyZWF0ZSA9IE9iamVjdC5jcmVhdGU7XG5cbiAgLy8gTmFrZWQgZnVuY3Rpb24gcmVmZXJlbmNlIGZvciBzdXJyb2dhdGUtcHJvdG90eXBlLXN3YXBwaW5nLlxuICB2YXIgQ3RvciA9IGZ1bmN0aW9uKCl7fTtcblxuICAvLyBDcmVhdGUgYSBzYWZlIHJlZmVyZW5jZSB0byB0aGUgVW5kZXJzY29yZSBvYmplY3QgZm9yIHVzZSBiZWxvdy5cbiAgdmFyIF8gPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgXykgcmV0dXJuIG9iajtcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgXykpIHJldHVybiBuZXcgXyhvYmopO1xuICAgIHRoaXMuX3dyYXBwZWQgPSBvYmo7XG4gIH07XG5cbiAgLy8gRXhwb3J0IHRoZSBVbmRlcnNjb3JlIG9iamVjdCBmb3IgKipOb2RlLmpzKiosIHdpdGhcbiAgLy8gYmFja3dhcmRzLWNvbXBhdGliaWxpdHkgZm9yIHRoZWlyIG9sZCBtb2R1bGUgQVBJLiBJZiB3ZSdyZSBpblxuICAvLyB0aGUgYnJvd3NlciwgYWRkIGBfYCBhcyBhIGdsb2JhbCBvYmplY3QuXG4gIC8vIChgbm9kZVR5cGVgIGlzIGNoZWNrZWQgdG8gZW5zdXJlIHRoYXQgYG1vZHVsZWBcbiAgLy8gYW5kIGBleHBvcnRzYCBhcmUgbm90IEhUTUwgZWxlbWVudHMuKVxuICBpZiAodHlwZW9mIGV4cG9ydHMgIT0gJ3VuZGVmaW5lZCcgJiYgIWV4cG9ydHMubm9kZVR5cGUpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSAhPSAndW5kZWZpbmVkJyAmJiAhbW9kdWxlLm5vZGVUeXBlICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgICBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBfO1xuICAgIH1cbiAgICBleHBvcnRzLl8gPSBfO1xuICB9IGVsc2Uge1xuICAgIHJvb3QuXyA9IF87XG4gIH1cblxuICAvLyBDdXJyZW50IHZlcnNpb24uXG4gIF8uVkVSU0lPTiA9ICcxLjkuMCc7XG5cbiAgLy8gSW50ZXJuYWwgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGFuIGVmZmljaWVudCAoZm9yIGN1cnJlbnQgZW5naW5lcykgdmVyc2lvblxuICAvLyBvZiB0aGUgcGFzc2VkLWluIGNhbGxiYWNrLCB0byBiZSByZXBlYXRlZGx5IGFwcGxpZWQgaW4gb3RoZXIgVW5kZXJzY29yZVxuICAvLyBmdW5jdGlvbnMuXG4gIHZhciBvcHRpbWl6ZUNiID0gZnVuY3Rpb24oZnVuYywgY29udGV4dCwgYXJnQ291bnQpIHtcbiAgICBpZiAoY29udGV4dCA9PT0gdm9pZCAwKSByZXR1cm4gZnVuYztcbiAgICBzd2l0Y2ggKGFyZ0NvdW50ID09IG51bGwgPyAzIDogYXJnQ291bnQpIHtcbiAgICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBmdW5jLmNhbGwoY29udGV4dCwgdmFsdWUpO1xuICAgICAgfTtcbiAgICAgIC8vIFRoZSAyLWFyZ3VtZW50IGNhc2UgaXMgb21pdHRlZCBiZWNhdXNlIHdl4oCZcmUgbm90IHVzaW5nIGl0LlxuICAgICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24odmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBmdW5jLmNhbGwoY29udGV4dCwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKTtcbiAgICAgIH07XG4gICAgICBjYXNlIDQ6IHJldHVybiBmdW5jdGlvbihhY2N1bXVsYXRvciwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBmdW5jLmNhbGwoY29udGV4dCwgYWNjdW11bGF0b3IsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbik7XG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZnVuYy5hcHBseShjb250ZXh0LCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH07XG5cbiAgdmFyIGJ1aWx0aW5JdGVyYXRlZTtcblxuICAvLyBBbiBpbnRlcm5hbCBmdW5jdGlvbiB0byBnZW5lcmF0ZSBjYWxsYmFja3MgdGhhdCBjYW4gYmUgYXBwbGllZCB0byBlYWNoXG4gIC8vIGVsZW1lbnQgaW4gYSBjb2xsZWN0aW9uLCByZXR1cm5pbmcgdGhlIGRlc2lyZWQgcmVzdWx0IOKAlCBlaXRoZXIgYGlkZW50aXR5YCxcbiAgLy8gYW4gYXJiaXRyYXJ5IGNhbGxiYWNrLCBhIHByb3BlcnR5IG1hdGNoZXIsIG9yIGEgcHJvcGVydHkgYWNjZXNzb3IuXG4gIHZhciBjYiA9IGZ1bmN0aW9uKHZhbHVlLCBjb250ZXh0LCBhcmdDb3VudCkge1xuICAgIGlmIChfLml0ZXJhdGVlICE9PSBidWlsdGluSXRlcmF0ZWUpIHJldHVybiBfLml0ZXJhdGVlKHZhbHVlLCBjb250ZXh0KTtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIF8uaWRlbnRpdHk7XG4gICAgaWYgKF8uaXNGdW5jdGlvbih2YWx1ZSkpIHJldHVybiBvcHRpbWl6ZUNiKHZhbHVlLCBjb250ZXh0LCBhcmdDb3VudCk7XG4gICAgaWYgKF8uaXNPYmplY3QodmFsdWUpICYmICFfLmlzQXJyYXkodmFsdWUpKSByZXR1cm4gXy5tYXRjaGVyKHZhbHVlKTtcbiAgICByZXR1cm4gXy5wcm9wZXJ0eSh2YWx1ZSk7XG4gIH07XG5cbiAgLy8gRXh0ZXJuYWwgd3JhcHBlciBmb3Igb3VyIGNhbGxiYWNrIGdlbmVyYXRvci4gVXNlcnMgbWF5IGN1c3RvbWl6ZVxuICAvLyBgXy5pdGVyYXRlZWAgaWYgdGhleSB3YW50IGFkZGl0aW9uYWwgcHJlZGljYXRlL2l0ZXJhdGVlIHNob3J0aGFuZCBzdHlsZXMuXG4gIC8vIFRoaXMgYWJzdHJhY3Rpb24gaGlkZXMgdGhlIGludGVybmFsLW9ubHkgYXJnQ291bnQgYXJndW1lbnQuXG4gIF8uaXRlcmF0ZWUgPSBidWlsdGluSXRlcmF0ZWUgPSBmdW5jdGlvbih2YWx1ZSwgY29udGV4dCkge1xuICAgIHJldHVybiBjYih2YWx1ZSwgY29udGV4dCwgSW5maW5pdHkpO1xuICB9O1xuXG4gIC8vIFNvbWUgZnVuY3Rpb25zIHRha2UgYSB2YXJpYWJsZSBudW1iZXIgb2YgYXJndW1lbnRzLCBvciBhIGZldyBleHBlY3RlZFxuICAvLyBhcmd1bWVudHMgYXQgdGhlIGJlZ2lubmluZyBhbmQgdGhlbiBhIHZhcmlhYmxlIG51bWJlciBvZiB2YWx1ZXMgdG8gb3BlcmF0ZVxuICAvLyBvbi4gVGhpcyBoZWxwZXIgYWNjdW11bGF0ZXMgYWxsIHJlbWFpbmluZyBhcmd1bWVudHMgcGFzdCB0aGUgZnVuY3Rpb27igJlzXG4gIC8vIGFyZ3VtZW50IGxlbmd0aCAob3IgYW4gZXhwbGljaXQgYHN0YXJ0SW5kZXhgKSwgaW50byBhbiBhcnJheSB0aGF0IGJlY29tZXNcbiAgLy8gdGhlIGxhc3QgYXJndW1lbnQuIFNpbWlsYXIgdG8gRVM24oCZcyBcInJlc3QgcGFyYW1ldGVyXCIuXG4gIHZhciByZXN0QXJndW1lbnRzID0gZnVuY3Rpb24oZnVuYywgc3RhcnRJbmRleCkge1xuICAgIHN0YXJ0SW5kZXggPSBzdGFydEluZGV4ID09IG51bGwgPyBmdW5jLmxlbmd0aCAtIDEgOiArc3RhcnRJbmRleDtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgbGVuZ3RoID0gTWF0aC5tYXgoYXJndW1lbnRzLmxlbmd0aCAtIHN0YXJ0SW5kZXgsIDApLFxuICAgICAgICAgIHJlc3QgPSBBcnJheShsZW5ndGgpLFxuICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgIGZvciAoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICByZXN0W2luZGV4XSA9IGFyZ3VtZW50c1tpbmRleCArIHN0YXJ0SW5kZXhdO1xuICAgICAgfVxuICAgICAgc3dpdGNoIChzdGFydEluZGV4KSB7XG4gICAgICAgIGNhc2UgMDogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzLCByZXN0KTtcbiAgICAgICAgY2FzZSAxOiByZXR1cm4gZnVuYy5jYWxsKHRoaXMsIGFyZ3VtZW50c1swXSwgcmVzdCk7XG4gICAgICAgIGNhc2UgMjogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzLCBhcmd1bWVudHNbMF0sIGFyZ3VtZW50c1sxXSwgcmVzdCk7XG4gICAgICB9XG4gICAgICB2YXIgYXJncyA9IEFycmF5KHN0YXJ0SW5kZXggKyAxKTtcbiAgICAgIGZvciAoaW5kZXggPSAwOyBpbmRleCA8IHN0YXJ0SW5kZXg7IGluZGV4KyspIHtcbiAgICAgICAgYXJnc1tpbmRleF0gPSBhcmd1bWVudHNbaW5kZXhdO1xuICAgICAgfVxuICAgICAgYXJnc1tzdGFydEluZGV4XSA9IHJlc3Q7XG4gICAgICByZXR1cm4gZnVuYy5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9O1xuICB9O1xuXG4gIC8vIEFuIGludGVybmFsIGZ1bmN0aW9uIGZvciBjcmVhdGluZyBhIG5ldyBvYmplY3QgdGhhdCBpbmhlcml0cyBmcm9tIGFub3RoZXIuXG4gIHZhciBiYXNlQ3JlYXRlID0gZnVuY3Rpb24ocHJvdG90eXBlKSB7XG4gICAgaWYgKCFfLmlzT2JqZWN0KHByb3RvdHlwZSkpIHJldHVybiB7fTtcbiAgICBpZiAobmF0aXZlQ3JlYXRlKSByZXR1cm4gbmF0aXZlQ3JlYXRlKHByb3RvdHlwZSk7XG4gICAgQ3Rvci5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG4gICAgdmFyIHJlc3VsdCA9IG5ldyBDdG9yO1xuICAgIEN0b3IucHJvdG90eXBlID0gbnVsbDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIHZhciBzaGFsbG93UHJvcGVydHkgPSBmdW5jdGlvbihrZXkpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqID09IG51bGwgPyB2b2lkIDAgOiBvYmpba2V5XTtcbiAgICB9O1xuICB9O1xuXG4gIHZhciBkZWVwR2V0ID0gZnVuY3Rpb24ob2JqLCBwYXRoKSB7XG4gICAgdmFyIGxlbmd0aCA9IHBhdGgubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIHZvaWQgMDtcbiAgICAgIG9iaiA9IG9ialtwYXRoW2ldXTtcbiAgICB9XG4gICAgcmV0dXJuIGxlbmd0aCA/IG9iaiA6IHZvaWQgMDtcbiAgfTtcblxuICAvLyBIZWxwZXIgZm9yIGNvbGxlY3Rpb24gbWV0aG9kcyB0byBkZXRlcm1pbmUgd2hldGhlciBhIGNvbGxlY3Rpb25cbiAgLy8gc2hvdWxkIGJlIGl0ZXJhdGVkIGFzIGFuIGFycmF5IG9yIGFzIGFuIG9iamVjdC5cbiAgLy8gUmVsYXRlZDogaHR0cDovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtdG9sZW5ndGhcbiAgLy8gQXZvaWRzIGEgdmVyeSBuYXN0eSBpT1MgOCBKSVQgYnVnIG9uIEFSTS02NC4gIzIwOTRcbiAgdmFyIE1BWF9BUlJBWV9JTkRFWCA9IE1hdGgucG93KDIsIDUzKSAtIDE7XG4gIHZhciBnZXRMZW5ndGggPSBzaGFsbG93UHJvcGVydHkoJ2xlbmd0aCcpO1xuICB2YXIgaXNBcnJheUxpa2UgPSBmdW5jdGlvbihjb2xsZWN0aW9uKSB7XG4gICAgdmFyIGxlbmd0aCA9IGdldExlbmd0aChjb2xsZWN0aW9uKTtcbiAgICByZXR1cm4gdHlwZW9mIGxlbmd0aCA9PSAnbnVtYmVyJyAmJiBsZW5ndGggPj0gMCAmJiBsZW5ndGggPD0gTUFYX0FSUkFZX0lOREVYO1xuICB9O1xuXG4gIC8vIENvbGxlY3Rpb24gRnVuY3Rpb25zXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gVGhlIGNvcm5lcnN0b25lLCBhbiBgZWFjaGAgaW1wbGVtZW50YXRpb24sIGFrYSBgZm9yRWFjaGAuXG4gIC8vIEhhbmRsZXMgcmF3IG9iamVjdHMgaW4gYWRkaXRpb24gdG8gYXJyYXktbGlrZXMuIFRyZWF0cyBhbGxcbiAgLy8gc3BhcnNlIGFycmF5LWxpa2VzIGFzIGlmIHRoZXkgd2VyZSBkZW5zZS5cbiAgXy5lYWNoID0gXy5mb3JFYWNoID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgIGl0ZXJhdGVlID0gb3B0aW1pemVDYihpdGVyYXRlZSwgY29udGV4dCk7XG4gICAgdmFyIGksIGxlbmd0aDtcbiAgICBpZiAoaXNBcnJheUxpa2Uob2JqKSkge1xuICAgICAgZm9yIChpID0gMCwgbGVuZ3RoID0gb2JqLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGl0ZXJhdGVlKG9ialtpXSwgaSwgb2JqKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGtleXMgPSBfLmtleXMob2JqKTtcbiAgICAgIGZvciAoaSA9IDAsIGxlbmd0aCA9IGtleXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaXRlcmF0ZWUob2JqW2tleXNbaV1dLCBrZXlzW2ldLCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9O1xuXG4gIC8vIFJldHVybiB0aGUgcmVzdWx0cyBvZiBhcHBseWluZyB0aGUgaXRlcmF0ZWUgdG8gZWFjaCBlbGVtZW50LlxuICBfLm1hcCA9IF8uY29sbGVjdCA9IGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICBpdGVyYXRlZSA9IGNiKGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgICB2YXIga2V5cyA9ICFpc0FycmF5TGlrZShvYmopICYmIF8ua2V5cyhvYmopLFxuICAgICAgICBsZW5ndGggPSAoa2V5cyB8fCBvYmopLmxlbmd0aCxcbiAgICAgICAgcmVzdWx0cyA9IEFycmF5KGxlbmd0aCk7XG4gICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgdmFyIGN1cnJlbnRLZXkgPSBrZXlzID8ga2V5c1tpbmRleF0gOiBpbmRleDtcbiAgICAgIHJlc3VsdHNbaW5kZXhdID0gaXRlcmF0ZWUob2JqW2N1cnJlbnRLZXldLCBjdXJyZW50S2V5LCBvYmopO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfTtcblxuICAvLyBDcmVhdGUgYSByZWR1Y2luZyBmdW5jdGlvbiBpdGVyYXRpbmcgbGVmdCBvciByaWdodC5cbiAgdmFyIGNyZWF0ZVJlZHVjZSA9IGZ1bmN0aW9uKGRpcikge1xuICAgIC8vIFdyYXAgY29kZSB0aGF0IHJlYXNzaWducyBhcmd1bWVudCB2YXJpYWJsZXMgaW4gYSBzZXBhcmF0ZSBmdW5jdGlvbiB0aGFuXG4gICAgLy8gdGhlIG9uZSB0aGF0IGFjY2Vzc2VzIGBhcmd1bWVudHMubGVuZ3RoYCB0byBhdm9pZCBhIHBlcmYgaGl0LiAoIzE5OTEpXG4gICAgdmFyIHJlZHVjZXIgPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBtZW1vLCBpbml0aWFsKSB7XG4gICAgICB2YXIga2V5cyA9ICFpc0FycmF5TGlrZShvYmopICYmIF8ua2V5cyhvYmopLFxuICAgICAgICAgIGxlbmd0aCA9IChrZXlzIHx8IG9iaikubGVuZ3RoLFxuICAgICAgICAgIGluZGV4ID0gZGlyID4gMCA/IDAgOiBsZW5ndGggLSAxO1xuICAgICAgaWYgKCFpbml0aWFsKSB7XG4gICAgICAgIG1lbW8gPSBvYmpba2V5cyA/IGtleXNbaW5kZXhdIDogaW5kZXhdO1xuICAgICAgICBpbmRleCArPSBkaXI7XG4gICAgICB9XG4gICAgICBmb3IgKDsgaW5kZXggPj0gMCAmJiBpbmRleCA8IGxlbmd0aDsgaW5kZXggKz0gZGlyKSB7XG4gICAgICAgIHZhciBjdXJyZW50S2V5ID0ga2V5cyA/IGtleXNbaW5kZXhdIDogaW5kZXg7XG4gICAgICAgIG1lbW8gPSBpdGVyYXRlZShtZW1vLCBvYmpbY3VycmVudEtleV0sIGN1cnJlbnRLZXksIG9iaik7XG4gICAgICB9XG4gICAgICByZXR1cm4gbWVtbztcbiAgICB9O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIG1lbW8sIGNvbnRleHQpIHtcbiAgICAgIHZhciBpbml0aWFsID0gYXJndW1lbnRzLmxlbmd0aCA+PSAzO1xuICAgICAgcmV0dXJuIHJlZHVjZXIob2JqLCBvcHRpbWl6ZUNiKGl0ZXJhdGVlLCBjb250ZXh0LCA0KSwgbWVtbywgaW5pdGlhbCk7XG4gICAgfTtcbiAgfTtcblxuICAvLyAqKlJlZHVjZSoqIGJ1aWxkcyB1cCBhIHNpbmdsZSByZXN1bHQgZnJvbSBhIGxpc3Qgb2YgdmFsdWVzLCBha2EgYGluamVjdGAsXG4gIC8vIG9yIGBmb2xkbGAuXG4gIF8ucmVkdWNlID0gXy5mb2xkbCA9IF8uaW5qZWN0ID0gY3JlYXRlUmVkdWNlKDEpO1xuXG4gIC8vIFRoZSByaWdodC1hc3NvY2lhdGl2ZSB2ZXJzaW9uIG9mIHJlZHVjZSwgYWxzbyBrbm93biBhcyBgZm9sZHJgLlxuICBfLnJlZHVjZVJpZ2h0ID0gXy5mb2xkciA9IGNyZWF0ZVJlZHVjZSgtMSk7XG5cbiAgLy8gUmV0dXJuIHRoZSBmaXJzdCB2YWx1ZSB3aGljaCBwYXNzZXMgYSB0cnV0aCB0ZXN0LiBBbGlhc2VkIGFzIGBkZXRlY3RgLlxuICBfLmZpbmQgPSBfLmRldGVjdCA9IGZ1bmN0aW9uKG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIGtleUZpbmRlciA9IGlzQXJyYXlMaWtlKG9iaikgPyBfLmZpbmRJbmRleCA6IF8uZmluZEtleTtcbiAgICB2YXIga2V5ID0ga2V5RmluZGVyKG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KTtcbiAgICBpZiAoa2V5ICE9PSB2b2lkIDAgJiYga2V5ICE9PSAtMSkgcmV0dXJuIG9ialtrZXldO1xuICB9O1xuXG4gIC8vIFJldHVybiBhbGwgdGhlIGVsZW1lbnRzIHRoYXQgcGFzcyBhIHRydXRoIHRlc3QuXG4gIC8vIEFsaWFzZWQgYXMgYHNlbGVjdGAuXG4gIF8uZmlsdGVyID0gXy5zZWxlY3QgPSBmdW5jdGlvbihvYmosIHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHZhciByZXN1bHRzID0gW107XG4gICAgcHJlZGljYXRlID0gY2IocHJlZGljYXRlLCBjb250ZXh0KTtcbiAgICBfLmVhY2gob2JqLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGxpc3QpIHtcbiAgICAgIGlmIChwcmVkaWNhdGUodmFsdWUsIGluZGV4LCBsaXN0KSkgcmVzdWx0cy5wdXNoKHZhbHVlKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfTtcblxuICAvLyBSZXR1cm4gYWxsIHRoZSBlbGVtZW50cyBmb3Igd2hpY2ggYSB0cnV0aCB0ZXN0IGZhaWxzLlxuICBfLnJlamVjdCA9IGZ1bmN0aW9uKG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIF8uZmlsdGVyKG9iaiwgXy5uZWdhdGUoY2IocHJlZGljYXRlKSksIGNvbnRleHQpO1xuICB9O1xuXG4gIC8vIERldGVybWluZSB3aGV0aGVyIGFsbCBvZiB0aGUgZWxlbWVudHMgbWF0Y2ggYSB0cnV0aCB0ZXN0LlxuICAvLyBBbGlhc2VkIGFzIGBhbGxgLlxuICBfLmV2ZXJ5ID0gXy5hbGwgPSBmdW5jdGlvbihvYmosIHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHByZWRpY2F0ZSA9IGNiKHByZWRpY2F0ZSwgY29udGV4dCk7XG4gICAgdmFyIGtleXMgPSAhaXNBcnJheUxpa2Uob2JqKSAmJiBfLmtleXMob2JqKSxcbiAgICAgICAgbGVuZ3RoID0gKGtleXMgfHwgb2JqKS5sZW5ndGg7XG4gICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgdmFyIGN1cnJlbnRLZXkgPSBrZXlzID8ga2V5c1tpbmRleF0gOiBpbmRleDtcbiAgICAgIGlmICghcHJlZGljYXRlKG9ialtjdXJyZW50S2V5XSwgY3VycmVudEtleSwgb2JqKSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICAvLyBEZXRlcm1pbmUgaWYgYXQgbGVhc3Qgb25lIGVsZW1lbnQgaW4gdGhlIG9iamVjdCBtYXRjaGVzIGEgdHJ1dGggdGVzdC5cbiAgLy8gQWxpYXNlZCBhcyBgYW55YC5cbiAgXy5zb21lID0gXy5hbnkgPSBmdW5jdGlvbihvYmosIHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHByZWRpY2F0ZSA9IGNiKHByZWRpY2F0ZSwgY29udGV4dCk7XG4gICAgdmFyIGtleXMgPSAhaXNBcnJheUxpa2Uob2JqKSAmJiBfLmtleXMob2JqKSxcbiAgICAgICAgbGVuZ3RoID0gKGtleXMgfHwgb2JqKS5sZW5ndGg7XG4gICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgdmFyIGN1cnJlbnRLZXkgPSBrZXlzID8ga2V5c1tpbmRleF0gOiBpbmRleDtcbiAgICAgIGlmIChwcmVkaWNhdGUob2JqW2N1cnJlbnRLZXldLCBjdXJyZW50S2V5LCBvYmopKSByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIC8vIERldGVybWluZSBpZiB0aGUgYXJyYXkgb3Igb2JqZWN0IGNvbnRhaW5zIGEgZ2l2ZW4gaXRlbSAodXNpbmcgYD09PWApLlxuICAvLyBBbGlhc2VkIGFzIGBpbmNsdWRlc2AgYW5kIGBpbmNsdWRlYC5cbiAgXy5jb250YWlucyA9IF8uaW5jbHVkZXMgPSBfLmluY2x1ZGUgPSBmdW5jdGlvbihvYmosIGl0ZW0sIGZyb21JbmRleCwgZ3VhcmQpIHtcbiAgICBpZiAoIWlzQXJyYXlMaWtlKG9iaikpIG9iaiA9IF8udmFsdWVzKG9iaik7XG4gICAgaWYgKHR5cGVvZiBmcm9tSW5kZXggIT0gJ251bWJlcicgfHwgZ3VhcmQpIGZyb21JbmRleCA9IDA7XG4gICAgcmV0dXJuIF8uaW5kZXhPZihvYmosIGl0ZW0sIGZyb21JbmRleCkgPj0gMDtcbiAgfTtcblxuICAvLyBJbnZva2UgYSBtZXRob2QgKHdpdGggYXJndW1lbnRzKSBvbiBldmVyeSBpdGVtIGluIGEgY29sbGVjdGlvbi5cbiAgXy5pbnZva2UgPSByZXN0QXJndW1lbnRzKGZ1bmN0aW9uKG9iaiwgcGF0aCwgYXJncykge1xuICAgIHZhciBjb250ZXh0UGF0aCwgZnVuYztcbiAgICBpZiAoXy5pc0Z1bmN0aW9uKHBhdGgpKSB7XG4gICAgICBmdW5jID0gcGF0aDtcbiAgICB9IGVsc2UgaWYgKF8uaXNBcnJheShwYXRoKSkge1xuICAgICAgY29udGV4dFBhdGggPSBwYXRoLnNsaWNlKDAsIC0xKTtcbiAgICAgIHBhdGggPSBwYXRoW3BhdGgubGVuZ3RoIC0gMV07XG4gICAgfVxuICAgIHJldHVybiBfLm1hcChvYmosIGZ1bmN0aW9uKGNvbnRleHQpIHtcbiAgICAgIHZhciBtZXRob2QgPSBmdW5jO1xuICAgICAgaWYgKCFtZXRob2QpIHtcbiAgICAgICAgaWYgKGNvbnRleHRQYXRoICYmIGNvbnRleHRQYXRoLmxlbmd0aCkge1xuICAgICAgICAgIGNvbnRleHQgPSBkZWVwR2V0KGNvbnRleHQsIGNvbnRleHRQYXRoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29udGV4dCA9PSBudWxsKSByZXR1cm4gdm9pZCAwO1xuICAgICAgICBtZXRob2QgPSBjb250ZXh0W3BhdGhdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG1ldGhvZCA9PSBudWxsID8gbWV0aG9kIDogbWV0aG9kLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgIH0pO1xuICB9KTtcblxuICAvLyBDb252ZW5pZW5jZSB2ZXJzaW9uIG9mIGEgY29tbW9uIHVzZSBjYXNlIG9mIGBtYXBgOiBmZXRjaGluZyBhIHByb3BlcnR5LlxuICBfLnBsdWNrID0gZnVuY3Rpb24ob2JqLCBrZXkpIHtcbiAgICByZXR1cm4gXy5tYXAob2JqLCBfLnByb3BlcnR5KGtleSkpO1xuICB9O1xuXG4gIC8vIENvbnZlbmllbmNlIHZlcnNpb24gb2YgYSBjb21tb24gdXNlIGNhc2Ugb2YgYGZpbHRlcmA6IHNlbGVjdGluZyBvbmx5IG9iamVjdHNcbiAgLy8gY29udGFpbmluZyBzcGVjaWZpYyBga2V5OnZhbHVlYCBwYWlycy5cbiAgXy53aGVyZSA9IGZ1bmN0aW9uKG9iaiwgYXR0cnMpIHtcbiAgICByZXR1cm4gXy5maWx0ZXIob2JqLCBfLm1hdGNoZXIoYXR0cnMpKTtcbiAgfTtcblxuICAvLyBDb252ZW5pZW5jZSB2ZXJzaW9uIG9mIGEgY29tbW9uIHVzZSBjYXNlIG9mIGBmaW5kYDogZ2V0dGluZyB0aGUgZmlyc3Qgb2JqZWN0XG4gIC8vIGNvbnRhaW5pbmcgc3BlY2lmaWMgYGtleTp2YWx1ZWAgcGFpcnMuXG4gIF8uZmluZFdoZXJlID0gZnVuY3Rpb24ob2JqLCBhdHRycykge1xuICAgIHJldHVybiBfLmZpbmQob2JqLCBfLm1hdGNoZXIoYXR0cnMpKTtcbiAgfTtcblxuICAvLyBSZXR1cm4gdGhlIG1heGltdW0gZWxlbWVudCAob3IgZWxlbWVudC1iYXNlZCBjb21wdXRhdGlvbikuXG4gIF8ubWF4ID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgIHZhciByZXN1bHQgPSAtSW5maW5pdHksIGxhc3RDb21wdXRlZCA9IC1JbmZpbml0eSxcbiAgICAgICAgdmFsdWUsIGNvbXB1dGVkO1xuICAgIGlmIChpdGVyYXRlZSA9PSBudWxsIHx8IHR5cGVvZiBpdGVyYXRlZSA9PSAnbnVtYmVyJyAmJiB0eXBlb2Ygb2JqWzBdICE9ICdvYmplY3QnICYmIG9iaiAhPSBudWxsKSB7XG4gICAgICBvYmogPSBpc0FycmF5TGlrZShvYmopID8gb2JqIDogXy52YWx1ZXMob2JqKTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBvYmoubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFsdWUgPSBvYmpbaV07XG4gICAgICAgIGlmICh2YWx1ZSAhPSBudWxsICYmIHZhbHVlID4gcmVzdWx0KSB7XG4gICAgICAgICAgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaXRlcmF0ZWUgPSBjYihpdGVyYXRlZSwgY29udGV4dCk7XG4gICAgICBfLmVhY2gob2JqLCBmdW5jdGlvbih2LCBpbmRleCwgbGlzdCkge1xuICAgICAgICBjb21wdXRlZCA9IGl0ZXJhdGVlKHYsIGluZGV4LCBsaXN0KTtcbiAgICAgICAgaWYgKGNvbXB1dGVkID4gbGFzdENvbXB1dGVkIHx8IGNvbXB1dGVkID09PSAtSW5maW5pdHkgJiYgcmVzdWx0ID09PSAtSW5maW5pdHkpIHtcbiAgICAgICAgICByZXN1bHQgPSB2O1xuICAgICAgICAgIGxhc3RDb21wdXRlZCA9IGNvbXB1dGVkO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBSZXR1cm4gdGhlIG1pbmltdW0gZWxlbWVudCAob3IgZWxlbWVudC1iYXNlZCBjb21wdXRhdGlvbikuXG4gIF8ubWluID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgIHZhciByZXN1bHQgPSBJbmZpbml0eSwgbGFzdENvbXB1dGVkID0gSW5maW5pdHksXG4gICAgICAgIHZhbHVlLCBjb21wdXRlZDtcbiAgICBpZiAoaXRlcmF0ZWUgPT0gbnVsbCB8fCB0eXBlb2YgaXRlcmF0ZWUgPT0gJ251bWJlcicgJiYgdHlwZW9mIG9ialswXSAhPSAnb2JqZWN0JyAmJiBvYmogIT0gbnVsbCkge1xuICAgICAgb2JqID0gaXNBcnJheUxpa2Uob2JqKSA/IG9iaiA6IF8udmFsdWVzKG9iaik7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gb2JqLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhbHVlID0gb2JqW2ldO1xuICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCAmJiB2YWx1ZSA8IHJlc3VsdCkge1xuICAgICAgICAgIHJlc3VsdCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGl0ZXJhdGVlID0gY2IoaXRlcmF0ZWUsIGNvbnRleHQpO1xuICAgICAgXy5lYWNoKG9iaiwgZnVuY3Rpb24odiwgaW5kZXgsIGxpc3QpIHtcbiAgICAgICAgY29tcHV0ZWQgPSBpdGVyYXRlZSh2LCBpbmRleCwgbGlzdCk7XG4gICAgICAgIGlmIChjb21wdXRlZCA8IGxhc3RDb21wdXRlZCB8fCBjb21wdXRlZCA9PT0gSW5maW5pdHkgJiYgcmVzdWx0ID09PSBJbmZpbml0eSkge1xuICAgICAgICAgIHJlc3VsdCA9IHY7XG4gICAgICAgICAgbGFzdENvbXB1dGVkID0gY29tcHV0ZWQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIFNodWZmbGUgYSBjb2xsZWN0aW9uLlxuICBfLnNodWZmbGUgPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gXy5zYW1wbGUob2JqLCBJbmZpbml0eSk7XG4gIH07XG5cbiAgLy8gU2FtcGxlICoqbioqIHJhbmRvbSB2YWx1ZXMgZnJvbSBhIGNvbGxlY3Rpb24gdXNpbmcgdGhlIG1vZGVybiB2ZXJzaW9uIG9mIHRoZVxuICAvLyBbRmlzaGVyLVlhdGVzIHNodWZmbGVdKGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRmlzaGVy4oCTWWF0ZXNfc2h1ZmZsZSkuXG4gIC8vIElmICoqbioqIGlzIG5vdCBzcGVjaWZpZWQsIHJldHVybnMgYSBzaW5nbGUgcmFuZG9tIGVsZW1lbnQuXG4gIC8vIFRoZSBpbnRlcm5hbCBgZ3VhcmRgIGFyZ3VtZW50IGFsbG93cyBpdCB0byB3b3JrIHdpdGggYG1hcGAuXG4gIF8uc2FtcGxlID0gZnVuY3Rpb24ob2JqLCBuLCBndWFyZCkge1xuICAgIGlmIChuID09IG51bGwgfHwgZ3VhcmQpIHtcbiAgICAgIGlmICghaXNBcnJheUxpa2Uob2JqKSkgb2JqID0gXy52YWx1ZXMob2JqKTtcbiAgICAgIHJldHVybiBvYmpbXy5yYW5kb20ob2JqLmxlbmd0aCAtIDEpXTtcbiAgICB9XG4gICAgdmFyIHNhbXBsZSA9IGlzQXJyYXlMaWtlKG9iaikgPyBfLmNsb25lKG9iaikgOiBfLnZhbHVlcyhvYmopO1xuICAgIHZhciBsZW5ndGggPSBnZXRMZW5ndGgoc2FtcGxlKTtcbiAgICBuID0gTWF0aC5tYXgoTWF0aC5taW4obiwgbGVuZ3RoKSwgMCk7XG4gICAgdmFyIGxhc3QgPSBsZW5ndGggLSAxO1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBuOyBpbmRleCsrKSB7XG4gICAgICB2YXIgcmFuZCA9IF8ucmFuZG9tKGluZGV4LCBsYXN0KTtcbiAgICAgIHZhciB0ZW1wID0gc2FtcGxlW2luZGV4XTtcbiAgICAgIHNhbXBsZVtpbmRleF0gPSBzYW1wbGVbcmFuZF07XG4gICAgICBzYW1wbGVbcmFuZF0gPSB0ZW1wO1xuICAgIH1cbiAgICByZXR1cm4gc2FtcGxlLnNsaWNlKDAsIG4pO1xuICB9O1xuXG4gIC8vIFNvcnQgdGhlIG9iamVjdCdzIHZhbHVlcyBieSBhIGNyaXRlcmlvbiBwcm9kdWNlZCBieSBhbiBpdGVyYXRlZS5cbiAgXy5zb3J0QnkgPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICBpdGVyYXRlZSA9IGNiKGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgICByZXR1cm4gXy5wbHVjayhfLm1hcChvYmosIGZ1bmN0aW9uKHZhbHVlLCBrZXksIGxpc3QpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgaW5kZXg6IGluZGV4KyssXG4gICAgICAgIGNyaXRlcmlhOiBpdGVyYXRlZSh2YWx1ZSwga2V5LCBsaXN0KVxuICAgICAgfTtcbiAgICB9KS5zb3J0KGZ1bmN0aW9uKGxlZnQsIHJpZ2h0KSB7XG4gICAgICB2YXIgYSA9IGxlZnQuY3JpdGVyaWE7XG4gICAgICB2YXIgYiA9IHJpZ2h0LmNyaXRlcmlhO1xuICAgICAgaWYgKGEgIT09IGIpIHtcbiAgICAgICAgaWYgKGEgPiBiIHx8IGEgPT09IHZvaWQgMCkgcmV0dXJuIDE7XG4gICAgICAgIGlmIChhIDwgYiB8fCBiID09PSB2b2lkIDApIHJldHVybiAtMTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBsZWZ0LmluZGV4IC0gcmlnaHQuaW5kZXg7XG4gICAgfSksICd2YWx1ZScpO1xuICB9O1xuXG4gIC8vIEFuIGludGVybmFsIGZ1bmN0aW9uIHVzZWQgZm9yIGFnZ3JlZ2F0ZSBcImdyb3VwIGJ5XCIgb3BlcmF0aW9ucy5cbiAgdmFyIGdyb3VwID0gZnVuY3Rpb24oYmVoYXZpb3IsIHBhcnRpdGlvbikge1xuICAgIHJldHVybiBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgICB2YXIgcmVzdWx0ID0gcGFydGl0aW9uID8gW1tdLCBbXV0gOiB7fTtcbiAgICAgIGl0ZXJhdGVlID0gY2IoaXRlcmF0ZWUsIGNvbnRleHQpO1xuICAgICAgXy5lYWNoKG9iaiwgZnVuY3Rpb24odmFsdWUsIGluZGV4KSB7XG4gICAgICAgIHZhciBrZXkgPSBpdGVyYXRlZSh2YWx1ZSwgaW5kZXgsIG9iaik7XG4gICAgICAgIGJlaGF2aW9yKHJlc3VsdCwgdmFsdWUsIGtleSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgfTtcblxuICAvLyBHcm91cHMgdGhlIG9iamVjdCdzIHZhbHVlcyBieSBhIGNyaXRlcmlvbi4gUGFzcyBlaXRoZXIgYSBzdHJpbmcgYXR0cmlidXRlXG4gIC8vIHRvIGdyb3VwIGJ5LCBvciBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgY3JpdGVyaW9uLlxuICBfLmdyb3VwQnkgPSBncm91cChmdW5jdGlvbihyZXN1bHQsIHZhbHVlLCBrZXkpIHtcbiAgICBpZiAoXy5oYXMocmVzdWx0LCBrZXkpKSByZXN1bHRba2V5XS5wdXNoKHZhbHVlKTsgZWxzZSByZXN1bHRba2V5XSA9IFt2YWx1ZV07XG4gIH0pO1xuXG4gIC8vIEluZGV4ZXMgdGhlIG9iamVjdCdzIHZhbHVlcyBieSBhIGNyaXRlcmlvbiwgc2ltaWxhciB0byBgZ3JvdXBCeWAsIGJ1dCBmb3JcbiAgLy8gd2hlbiB5b3Uga25vdyB0aGF0IHlvdXIgaW5kZXggdmFsdWVzIHdpbGwgYmUgdW5pcXVlLlxuICBfLmluZGV4QnkgPSBncm91cChmdW5jdGlvbihyZXN1bHQsIHZhbHVlLCBrZXkpIHtcbiAgICByZXN1bHRba2V5XSA9IHZhbHVlO1xuICB9KTtcblxuICAvLyBDb3VudHMgaW5zdGFuY2VzIG9mIGFuIG9iamVjdCB0aGF0IGdyb3VwIGJ5IGEgY2VydGFpbiBjcml0ZXJpb24uIFBhc3NcbiAgLy8gZWl0aGVyIGEgc3RyaW5nIGF0dHJpYnV0ZSB0byBjb3VudCBieSwgb3IgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlXG4gIC8vIGNyaXRlcmlvbi5cbiAgXy5jb3VudEJ5ID0gZ3JvdXAoZnVuY3Rpb24ocmVzdWx0LCB2YWx1ZSwga2V5KSB7XG4gICAgaWYgKF8uaGFzKHJlc3VsdCwga2V5KSkgcmVzdWx0W2tleV0rKzsgZWxzZSByZXN1bHRba2V5XSA9IDE7XG4gIH0pO1xuXG4gIHZhciByZVN0clN5bWJvbCA9IC9bXlxcdWQ4MDAtXFx1ZGZmZl18W1xcdWQ4MDAtXFx1ZGJmZl1bXFx1ZGMwMC1cXHVkZmZmXXxbXFx1ZDgwMC1cXHVkZmZmXS9nO1xuICAvLyBTYWZlbHkgY3JlYXRlIGEgcmVhbCwgbGl2ZSBhcnJheSBmcm9tIGFueXRoaW5nIGl0ZXJhYmxlLlxuICBfLnRvQXJyYXkgPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAoIW9iaikgcmV0dXJuIFtdO1xuICAgIGlmIChfLmlzQXJyYXkob2JqKSkgcmV0dXJuIHNsaWNlLmNhbGwob2JqKTtcbiAgICBpZiAoXy5pc1N0cmluZyhvYmopKSB7XG4gICAgICAvLyBLZWVwIHN1cnJvZ2F0ZSBwYWlyIGNoYXJhY3RlcnMgdG9nZXRoZXJcbiAgICAgIHJldHVybiBvYmoubWF0Y2gocmVTdHJTeW1ib2wpO1xuICAgIH1cbiAgICBpZiAoaXNBcnJheUxpa2Uob2JqKSkgcmV0dXJuIF8ubWFwKG9iaiwgXy5pZGVudGl0eSk7XG4gICAgcmV0dXJuIF8udmFsdWVzKG9iaik7XG4gIH07XG5cbiAgLy8gUmV0dXJuIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgaW4gYW4gb2JqZWN0LlxuICBfLnNpemUgPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAob2JqID09IG51bGwpIHJldHVybiAwO1xuICAgIHJldHVybiBpc0FycmF5TGlrZShvYmopID8gb2JqLmxlbmd0aCA6IF8ua2V5cyhvYmopLmxlbmd0aDtcbiAgfTtcblxuICAvLyBTcGxpdCBhIGNvbGxlY3Rpb24gaW50byB0d28gYXJyYXlzOiBvbmUgd2hvc2UgZWxlbWVudHMgYWxsIHNhdGlzZnkgdGhlIGdpdmVuXG4gIC8vIHByZWRpY2F0ZSwgYW5kIG9uZSB3aG9zZSBlbGVtZW50cyBhbGwgZG8gbm90IHNhdGlzZnkgdGhlIHByZWRpY2F0ZS5cbiAgXy5wYXJ0aXRpb24gPSBncm91cChmdW5jdGlvbihyZXN1bHQsIHZhbHVlLCBwYXNzKSB7XG4gICAgcmVzdWx0W3Bhc3MgPyAwIDogMV0ucHVzaCh2YWx1ZSk7XG4gIH0sIHRydWUpO1xuXG4gIC8vIEFycmF5IEZ1bmN0aW9uc1xuICAvLyAtLS0tLS0tLS0tLS0tLS1cblxuICAvLyBHZXQgdGhlIGZpcnN0IGVsZW1lbnQgb2YgYW4gYXJyYXkuIFBhc3NpbmcgKipuKiogd2lsbCByZXR1cm4gdGhlIGZpcnN0IE5cbiAgLy8gdmFsdWVzIGluIHRoZSBhcnJheS4gQWxpYXNlZCBhcyBgaGVhZGAgYW5kIGB0YWtlYC4gVGhlICoqZ3VhcmQqKiBjaGVja1xuICAvLyBhbGxvd3MgaXQgdG8gd29yayB3aXRoIGBfLm1hcGAuXG4gIF8uZmlyc3QgPSBfLmhlYWQgPSBfLnRha2UgPSBmdW5jdGlvbihhcnJheSwgbiwgZ3VhcmQpIHtcbiAgICBpZiAoYXJyYXkgPT0gbnVsbCB8fCBhcnJheS5sZW5ndGggPCAxKSByZXR1cm4gdm9pZCAwO1xuICAgIGlmIChuID09IG51bGwgfHwgZ3VhcmQpIHJldHVybiBhcnJheVswXTtcbiAgICByZXR1cm4gXy5pbml0aWFsKGFycmF5LCBhcnJheS5sZW5ndGggLSBuKTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGV2ZXJ5dGhpbmcgYnV0IHRoZSBsYXN0IGVudHJ5IG9mIHRoZSBhcnJheS4gRXNwZWNpYWxseSB1c2VmdWwgb25cbiAgLy8gdGhlIGFyZ3VtZW50cyBvYmplY3QuIFBhc3NpbmcgKipuKiogd2lsbCByZXR1cm4gYWxsIHRoZSB2YWx1ZXMgaW5cbiAgLy8gdGhlIGFycmF5LCBleGNsdWRpbmcgdGhlIGxhc3QgTi5cbiAgXy5pbml0aWFsID0gZnVuY3Rpb24oYXJyYXksIG4sIGd1YXJkKSB7XG4gICAgcmV0dXJuIHNsaWNlLmNhbGwoYXJyYXksIDAsIE1hdGgubWF4KDAsIGFycmF5Lmxlbmd0aCAtIChuID09IG51bGwgfHwgZ3VhcmQgPyAxIDogbikpKTtcbiAgfTtcblxuICAvLyBHZXQgdGhlIGxhc3QgZWxlbWVudCBvZiBhbiBhcnJheS4gUGFzc2luZyAqKm4qKiB3aWxsIHJldHVybiB0aGUgbGFzdCBOXG4gIC8vIHZhbHVlcyBpbiB0aGUgYXJyYXkuXG4gIF8ubGFzdCA9IGZ1bmN0aW9uKGFycmF5LCBuLCBndWFyZCkge1xuICAgIGlmIChhcnJheSA9PSBudWxsIHx8IGFycmF5Lmxlbmd0aCA8IDEpIHJldHVybiB2b2lkIDA7XG4gICAgaWYgKG4gPT0gbnVsbCB8fCBndWFyZCkgcmV0dXJuIGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdO1xuICAgIHJldHVybiBfLnJlc3QoYXJyYXksIE1hdGgubWF4KDAsIGFycmF5Lmxlbmd0aCAtIG4pKTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGV2ZXJ5dGhpbmcgYnV0IHRoZSBmaXJzdCBlbnRyeSBvZiB0aGUgYXJyYXkuIEFsaWFzZWQgYXMgYHRhaWxgIGFuZCBgZHJvcGAuXG4gIC8vIEVzcGVjaWFsbHkgdXNlZnVsIG9uIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBQYXNzaW5nIGFuICoqbioqIHdpbGwgcmV0dXJuXG4gIC8vIHRoZSByZXN0IE4gdmFsdWVzIGluIHRoZSBhcnJheS5cbiAgXy5yZXN0ID0gXy50YWlsID0gXy5kcm9wID0gZnVuY3Rpb24oYXJyYXksIG4sIGd1YXJkKSB7XG4gICAgcmV0dXJuIHNsaWNlLmNhbGwoYXJyYXksIG4gPT0gbnVsbCB8fCBndWFyZCA/IDEgOiBuKTtcbiAgfTtcblxuICAvLyBUcmltIG91dCBhbGwgZmFsc3kgdmFsdWVzIGZyb20gYW4gYXJyYXkuXG4gIF8uY29tcGFjdCA9IGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgcmV0dXJuIF8uZmlsdGVyKGFycmF5LCBCb29sZWFuKTtcbiAgfTtcblxuICAvLyBJbnRlcm5hbCBpbXBsZW1lbnRhdGlvbiBvZiBhIHJlY3Vyc2l2ZSBgZmxhdHRlbmAgZnVuY3Rpb24uXG4gIHZhciBmbGF0dGVuID0gZnVuY3Rpb24oaW5wdXQsIHNoYWxsb3csIHN0cmljdCwgb3V0cHV0KSB7XG4gICAgb3V0cHV0ID0gb3V0cHV0IHx8IFtdO1xuICAgIHZhciBpZHggPSBvdXRwdXQubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBnZXRMZW5ndGgoaW5wdXQpOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciB2YWx1ZSA9IGlucHV0W2ldO1xuICAgICAgaWYgKGlzQXJyYXlMaWtlKHZhbHVlKSAmJiAoXy5pc0FycmF5KHZhbHVlKSB8fCBfLmlzQXJndW1lbnRzKHZhbHVlKSkpIHtcbiAgICAgICAgLy8gRmxhdHRlbiBjdXJyZW50IGxldmVsIG9mIGFycmF5IG9yIGFyZ3VtZW50cyBvYmplY3QuXG4gICAgICAgIGlmIChzaGFsbG93KSB7XG4gICAgICAgICAgdmFyIGogPSAwLCBsZW4gPSB2YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgd2hpbGUgKGogPCBsZW4pIG91dHB1dFtpZHgrK10gPSB2YWx1ZVtqKytdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZsYXR0ZW4odmFsdWUsIHNoYWxsb3csIHN0cmljdCwgb3V0cHV0KTtcbiAgICAgICAgICBpZHggPSBvdXRwdXQubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKCFzdHJpY3QpIHtcbiAgICAgICAgb3V0cHV0W2lkeCsrXSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0O1xuICB9O1xuXG4gIC8vIEZsYXR0ZW4gb3V0IGFuIGFycmF5LCBlaXRoZXIgcmVjdXJzaXZlbHkgKGJ5IGRlZmF1bHQpLCBvciBqdXN0IG9uZSBsZXZlbC5cbiAgXy5mbGF0dGVuID0gZnVuY3Rpb24oYXJyYXksIHNoYWxsb3cpIHtcbiAgICByZXR1cm4gZmxhdHRlbihhcnJheSwgc2hhbGxvdywgZmFsc2UpO1xuICB9O1xuXG4gIC8vIFJldHVybiBhIHZlcnNpb24gb2YgdGhlIGFycmF5IHRoYXQgZG9lcyBub3QgY29udGFpbiB0aGUgc3BlY2lmaWVkIHZhbHVlKHMpLlxuICBfLndpdGhvdXQgPSByZXN0QXJndW1lbnRzKGZ1bmN0aW9uKGFycmF5LCBvdGhlckFycmF5cykge1xuICAgIHJldHVybiBfLmRpZmZlcmVuY2UoYXJyYXksIG90aGVyQXJyYXlzKTtcbiAgfSk7XG5cbiAgLy8gUHJvZHVjZSBhIGR1cGxpY2F0ZS1mcmVlIHZlcnNpb24gb2YgdGhlIGFycmF5LiBJZiB0aGUgYXJyYXkgaGFzIGFscmVhZHlcbiAgLy8gYmVlbiBzb3J0ZWQsIHlvdSBoYXZlIHRoZSBvcHRpb24gb2YgdXNpbmcgYSBmYXN0ZXIgYWxnb3JpdGhtLlxuICAvLyBUaGUgZmFzdGVyIGFsZ29yaXRobSB3aWxsIG5vdCB3b3JrIHdpdGggYW4gaXRlcmF0ZWUgaWYgdGhlIGl0ZXJhdGVlXG4gIC8vIGlzIG5vdCBhIG9uZS10by1vbmUgZnVuY3Rpb24sIHNvIHByb3ZpZGluZyBhbiBpdGVyYXRlZSB3aWxsIGRpc2FibGVcbiAgLy8gdGhlIGZhc3RlciBhbGdvcml0aG0uXG4gIC8vIEFsaWFzZWQgYXMgYHVuaXF1ZWAuXG4gIF8udW5pcSA9IF8udW5pcXVlID0gZnVuY3Rpb24oYXJyYXksIGlzU29ydGVkLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgIGlmICghXy5pc0Jvb2xlYW4oaXNTb3J0ZWQpKSB7XG4gICAgICBjb250ZXh0ID0gaXRlcmF0ZWU7XG4gICAgICBpdGVyYXRlZSA9IGlzU29ydGVkO1xuICAgICAgaXNTb3J0ZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGl0ZXJhdGVlICE9IG51bGwpIGl0ZXJhdGVlID0gY2IoaXRlcmF0ZWUsIGNvbnRleHQpO1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICB2YXIgc2VlbiA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBnZXRMZW5ndGgoYXJyYXkpOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciB2YWx1ZSA9IGFycmF5W2ldLFxuICAgICAgICAgIGNvbXB1dGVkID0gaXRlcmF0ZWUgPyBpdGVyYXRlZSh2YWx1ZSwgaSwgYXJyYXkpIDogdmFsdWU7XG4gICAgICBpZiAoaXNTb3J0ZWQgJiYgIWl0ZXJhdGVlKSB7XG4gICAgICAgIGlmICghaSB8fCBzZWVuICE9PSBjb21wdXRlZCkgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgICAgICBzZWVuID0gY29tcHV0ZWQ7XG4gICAgICB9IGVsc2UgaWYgKGl0ZXJhdGVlKSB7XG4gICAgICAgIGlmICghXy5jb250YWlucyhzZWVuLCBjb21wdXRlZCkpIHtcbiAgICAgICAgICBzZWVuLnB1c2goY29tcHV0ZWQpO1xuICAgICAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICghXy5jb250YWlucyhyZXN1bHQsIHZhbHVlKSkge1xuICAgICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLy8gUHJvZHVjZSBhbiBhcnJheSB0aGF0IGNvbnRhaW5zIHRoZSB1bmlvbjogZWFjaCBkaXN0aW5jdCBlbGVtZW50IGZyb20gYWxsIG9mXG4gIC8vIHRoZSBwYXNzZWQtaW4gYXJyYXlzLlxuICBfLnVuaW9uID0gcmVzdEFyZ3VtZW50cyhmdW5jdGlvbihhcnJheXMpIHtcbiAgICByZXR1cm4gXy51bmlxKGZsYXR0ZW4oYXJyYXlzLCB0cnVlLCB0cnVlKSk7XG4gIH0pO1xuXG4gIC8vIFByb2R1Y2UgYW4gYXJyYXkgdGhhdCBjb250YWlucyBldmVyeSBpdGVtIHNoYXJlZCBiZXR3ZWVuIGFsbCB0aGVcbiAgLy8gcGFzc2VkLWluIGFycmF5cy5cbiAgXy5pbnRlcnNlY3Rpb24gPSBmdW5jdGlvbihhcnJheSkge1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICB2YXIgYXJnc0xlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGdldExlbmd0aChhcnJheSk7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGl0ZW0gPSBhcnJheVtpXTtcbiAgICAgIGlmIChfLmNvbnRhaW5zKHJlc3VsdCwgaXRlbSkpIGNvbnRpbnVlO1xuICAgICAgdmFyIGo7XG4gICAgICBmb3IgKGogPSAxOyBqIDwgYXJnc0xlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmICghXy5jb250YWlucyhhcmd1bWVudHNbal0sIGl0ZW0pKSBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmIChqID09PSBhcmdzTGVuZ3RoKSByZXN1bHQucHVzaChpdGVtKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBUYWtlIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gb25lIGFycmF5IGFuZCBhIG51bWJlciBvZiBvdGhlciBhcnJheXMuXG4gIC8vIE9ubHkgdGhlIGVsZW1lbnRzIHByZXNlbnQgaW4ganVzdCB0aGUgZmlyc3QgYXJyYXkgd2lsbCByZW1haW4uXG4gIF8uZGlmZmVyZW5jZSA9IHJlc3RBcmd1bWVudHMoZnVuY3Rpb24oYXJyYXksIHJlc3QpIHtcbiAgICByZXN0ID0gZmxhdHRlbihyZXN0LCB0cnVlLCB0cnVlKTtcbiAgICByZXR1cm4gXy5maWx0ZXIoYXJyYXksIGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgIHJldHVybiAhXy5jb250YWlucyhyZXN0LCB2YWx1ZSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIENvbXBsZW1lbnQgb2YgXy56aXAuIFVuemlwIGFjY2VwdHMgYW4gYXJyYXkgb2YgYXJyYXlzIGFuZCBncm91cHNcbiAgLy8gZWFjaCBhcnJheSdzIGVsZW1lbnRzIG9uIHNoYXJlZCBpbmRpY2VzLlxuICBfLnVuemlwID0gZnVuY3Rpb24oYXJyYXkpIHtcbiAgICB2YXIgbGVuZ3RoID0gYXJyYXkgJiYgXy5tYXgoYXJyYXksIGdldExlbmd0aCkubGVuZ3RoIHx8IDA7XG4gICAgdmFyIHJlc3VsdCA9IEFycmF5KGxlbmd0aCk7XG5cbiAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICByZXN1bHRbaW5kZXhdID0gXy5wbHVjayhhcnJheSwgaW5kZXgpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIFppcCB0b2dldGhlciBtdWx0aXBsZSBsaXN0cyBpbnRvIGEgc2luZ2xlIGFycmF5IC0tIGVsZW1lbnRzIHRoYXQgc2hhcmVcbiAgLy8gYW4gaW5kZXggZ28gdG9nZXRoZXIuXG4gIF8uemlwID0gcmVzdEFyZ3VtZW50cyhfLnVuemlwKTtcblxuICAvLyBDb252ZXJ0cyBsaXN0cyBpbnRvIG9iamVjdHMuIFBhc3MgZWl0aGVyIGEgc2luZ2xlIGFycmF5IG9mIGBba2V5LCB2YWx1ZV1gXG4gIC8vIHBhaXJzLCBvciB0d28gcGFyYWxsZWwgYXJyYXlzIG9mIHRoZSBzYW1lIGxlbmd0aCAtLSBvbmUgb2Yga2V5cywgYW5kIG9uZSBvZlxuICAvLyB0aGUgY29ycmVzcG9uZGluZyB2YWx1ZXMuIFBhc3NpbmcgYnkgcGFpcnMgaXMgdGhlIHJldmVyc2Ugb2YgXy5wYWlycy5cbiAgXy5vYmplY3QgPSBmdW5jdGlvbihsaXN0LCB2YWx1ZXMpIHtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGdldExlbmd0aChsaXN0KTsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodmFsdWVzKSB7XG4gICAgICAgIHJlc3VsdFtsaXN0W2ldXSA9IHZhbHVlc1tpXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdFtsaXN0W2ldWzBdXSA9IGxpc3RbaV1bMV07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLy8gR2VuZXJhdG9yIGZ1bmN0aW9uIHRvIGNyZWF0ZSB0aGUgZmluZEluZGV4IGFuZCBmaW5kTGFzdEluZGV4IGZ1bmN0aW9ucy5cbiAgdmFyIGNyZWF0ZVByZWRpY2F0ZUluZGV4RmluZGVyID0gZnVuY3Rpb24oZGlyKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGFycmF5LCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICAgIHByZWRpY2F0ZSA9IGNiKHByZWRpY2F0ZSwgY29udGV4dCk7XG4gICAgICB2YXIgbGVuZ3RoID0gZ2V0TGVuZ3RoKGFycmF5KTtcbiAgICAgIHZhciBpbmRleCA9IGRpciA+IDAgPyAwIDogbGVuZ3RoIC0gMTtcbiAgICAgIGZvciAoOyBpbmRleCA+PSAwICYmIGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSBkaXIpIHtcbiAgICAgICAgaWYgKHByZWRpY2F0ZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkpIHJldHVybiBpbmRleDtcbiAgICAgIH1cbiAgICAgIHJldHVybiAtMTtcbiAgICB9O1xuICB9O1xuXG4gIC8vIFJldHVybnMgdGhlIGZpcnN0IGluZGV4IG9uIGFuIGFycmF5LWxpa2UgdGhhdCBwYXNzZXMgYSBwcmVkaWNhdGUgdGVzdC5cbiAgXy5maW5kSW5kZXggPSBjcmVhdGVQcmVkaWNhdGVJbmRleEZpbmRlcigxKTtcbiAgXy5maW5kTGFzdEluZGV4ID0gY3JlYXRlUHJlZGljYXRlSW5kZXhGaW5kZXIoLTEpO1xuXG4gIC8vIFVzZSBhIGNvbXBhcmF0b3IgZnVuY3Rpb24gdG8gZmlndXJlIG91dCB0aGUgc21hbGxlc3QgaW5kZXggYXQgd2hpY2hcbiAgLy8gYW4gb2JqZWN0IHNob3VsZCBiZSBpbnNlcnRlZCBzbyBhcyB0byBtYWludGFpbiBvcmRlci4gVXNlcyBiaW5hcnkgc2VhcmNoLlxuICBfLnNvcnRlZEluZGV4ID0gZnVuY3Rpb24oYXJyYXksIG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICBpdGVyYXRlZSA9IGNiKGl0ZXJhdGVlLCBjb250ZXh0LCAxKTtcbiAgICB2YXIgdmFsdWUgPSBpdGVyYXRlZShvYmopO1xuICAgIHZhciBsb3cgPSAwLCBoaWdoID0gZ2V0TGVuZ3RoKGFycmF5KTtcbiAgICB3aGlsZSAobG93IDwgaGlnaCkge1xuICAgICAgdmFyIG1pZCA9IE1hdGguZmxvb3IoKGxvdyArIGhpZ2gpIC8gMik7XG4gICAgICBpZiAoaXRlcmF0ZWUoYXJyYXlbbWlkXSkgPCB2YWx1ZSkgbG93ID0gbWlkICsgMTsgZWxzZSBoaWdoID0gbWlkO1xuICAgIH1cbiAgICByZXR1cm4gbG93O1xuICB9O1xuXG4gIC8vIEdlbmVyYXRvciBmdW5jdGlvbiB0byBjcmVhdGUgdGhlIGluZGV4T2YgYW5kIGxhc3RJbmRleE9mIGZ1bmN0aW9ucy5cbiAgdmFyIGNyZWF0ZUluZGV4RmluZGVyID0gZnVuY3Rpb24oZGlyLCBwcmVkaWNhdGVGaW5kLCBzb3J0ZWRJbmRleCkge1xuICAgIHJldHVybiBmdW5jdGlvbihhcnJheSwgaXRlbSwgaWR4KSB7XG4gICAgICB2YXIgaSA9IDAsIGxlbmd0aCA9IGdldExlbmd0aChhcnJheSk7XG4gICAgICBpZiAodHlwZW9mIGlkeCA9PSAnbnVtYmVyJykge1xuICAgICAgICBpZiAoZGlyID4gMCkge1xuICAgICAgICAgIGkgPSBpZHggPj0gMCA/IGlkeCA6IE1hdGgubWF4KGlkeCArIGxlbmd0aCwgaSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGVuZ3RoID0gaWR4ID49IDAgPyBNYXRoLm1pbihpZHggKyAxLCBsZW5ndGgpIDogaWR4ICsgbGVuZ3RoICsgMTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzb3J0ZWRJbmRleCAmJiBpZHggJiYgbGVuZ3RoKSB7XG4gICAgICAgIGlkeCA9IHNvcnRlZEluZGV4KGFycmF5LCBpdGVtKTtcbiAgICAgICAgcmV0dXJuIGFycmF5W2lkeF0gPT09IGl0ZW0gPyBpZHggOiAtMTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtICE9PSBpdGVtKSB7XG4gICAgICAgIGlkeCA9IHByZWRpY2F0ZUZpbmQoc2xpY2UuY2FsbChhcnJheSwgaSwgbGVuZ3RoKSwgXy5pc05hTik7XG4gICAgICAgIHJldHVybiBpZHggPj0gMCA/IGlkeCArIGkgOiAtMTtcbiAgICAgIH1cbiAgICAgIGZvciAoaWR4ID0gZGlyID4gMCA/IGkgOiBsZW5ndGggLSAxOyBpZHggPj0gMCAmJiBpZHggPCBsZW5ndGg7IGlkeCArPSBkaXIpIHtcbiAgICAgICAgaWYgKGFycmF5W2lkeF0gPT09IGl0ZW0pIHJldHVybiBpZHg7XG4gICAgICB9XG4gICAgICByZXR1cm4gLTE7XG4gICAgfTtcbiAgfTtcblxuICAvLyBSZXR1cm4gdGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIGFuIGl0ZW0gaW4gYW4gYXJyYXksXG4gIC8vIG9yIC0xIGlmIHRoZSBpdGVtIGlzIG5vdCBpbmNsdWRlZCBpbiB0aGUgYXJyYXkuXG4gIC8vIElmIHRoZSBhcnJheSBpcyBsYXJnZSBhbmQgYWxyZWFkeSBpbiBzb3J0IG9yZGVyLCBwYXNzIGB0cnVlYFxuICAvLyBmb3IgKippc1NvcnRlZCoqIHRvIHVzZSBiaW5hcnkgc2VhcmNoLlxuICBfLmluZGV4T2YgPSBjcmVhdGVJbmRleEZpbmRlcigxLCBfLmZpbmRJbmRleCwgXy5zb3J0ZWRJbmRleCk7XG4gIF8ubGFzdEluZGV4T2YgPSBjcmVhdGVJbmRleEZpbmRlcigtMSwgXy5maW5kTGFzdEluZGV4KTtcblxuICAvLyBHZW5lcmF0ZSBhbiBpbnRlZ2VyIEFycmF5IGNvbnRhaW5pbmcgYW4gYXJpdGhtZXRpYyBwcm9ncmVzc2lvbi4gQSBwb3J0IG9mXG4gIC8vIHRoZSBuYXRpdmUgUHl0aG9uIGByYW5nZSgpYCBmdW5jdGlvbi4gU2VlXG4gIC8vIFt0aGUgUHl0aG9uIGRvY3VtZW50YXRpb25dKGh0dHA6Ly9kb2NzLnB5dGhvbi5vcmcvbGlicmFyeS9mdW5jdGlvbnMuaHRtbCNyYW5nZSkuXG4gIF8ucmFuZ2UgPSBmdW5jdGlvbihzdGFydCwgc3RvcCwgc3RlcCkge1xuICAgIGlmIChzdG9wID09IG51bGwpIHtcbiAgICAgIHN0b3AgPSBzdGFydCB8fCAwO1xuICAgICAgc3RhcnQgPSAwO1xuICAgIH1cbiAgICBpZiAoIXN0ZXApIHtcbiAgICAgIHN0ZXAgPSBzdG9wIDwgc3RhcnQgPyAtMSA6IDE7XG4gICAgfVxuXG4gICAgdmFyIGxlbmd0aCA9IE1hdGgubWF4KE1hdGguY2VpbCgoc3RvcCAtIHN0YXJ0KSAvIHN0ZXApLCAwKTtcbiAgICB2YXIgcmFuZ2UgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgbGVuZ3RoOyBpZHgrKywgc3RhcnQgKz0gc3RlcCkge1xuICAgICAgcmFuZ2VbaWR4XSA9IHN0YXJ0O1xuICAgIH1cblxuICAgIHJldHVybiByYW5nZTtcbiAgfTtcblxuICAvLyBDaHVuayBhIHNpbmdsZSBhcnJheSBpbnRvIG11bHRpcGxlIGFycmF5cywgZWFjaCBjb250YWluaW5nIGBjb3VudGAgb3IgZmV3ZXJcbiAgLy8gaXRlbXMuXG4gIF8uY2h1bmsgPSBmdW5jdGlvbihhcnJheSwgY291bnQpIHtcbiAgICBpZiAoY291bnQgPT0gbnVsbCB8fCBjb3VudCA8IDEpIHJldHVybiBbXTtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgdmFyIGkgPSAwLCBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gICAgd2hpbGUgKGkgPCBsZW5ndGgpIHtcbiAgICAgIHJlc3VsdC5wdXNoKHNsaWNlLmNhbGwoYXJyYXksIGksIGkgKz0gY291bnQpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBGdW5jdGlvbiAoYWhlbSkgRnVuY3Rpb25zXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIERldGVybWluZXMgd2hldGhlciB0byBleGVjdXRlIGEgZnVuY3Rpb24gYXMgYSBjb25zdHJ1Y3RvclxuICAvLyBvciBhIG5vcm1hbCBmdW5jdGlvbiB3aXRoIHRoZSBwcm92aWRlZCBhcmd1bWVudHMuXG4gIHZhciBleGVjdXRlQm91bmQgPSBmdW5jdGlvbihzb3VyY2VGdW5jLCBib3VuZEZ1bmMsIGNvbnRleHQsIGNhbGxpbmdDb250ZXh0LCBhcmdzKSB7XG4gICAgaWYgKCEoY2FsbGluZ0NvbnRleHQgaW5zdGFuY2VvZiBib3VuZEZ1bmMpKSByZXR1cm4gc291cmNlRnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICB2YXIgc2VsZiA9IGJhc2VDcmVhdGUoc291cmNlRnVuYy5wcm90b3R5cGUpO1xuICAgIHZhciByZXN1bHQgPSBzb3VyY2VGdW5jLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICAgIGlmIChfLmlzT2JqZWN0KHJlc3VsdCkpIHJldHVybiByZXN1bHQ7XG4gICAgcmV0dXJuIHNlbGY7XG4gIH07XG5cbiAgLy8gQ3JlYXRlIGEgZnVuY3Rpb24gYm91bmQgdG8gYSBnaXZlbiBvYmplY3QgKGFzc2lnbmluZyBgdGhpc2AsIGFuZCBhcmd1bWVudHMsXG4gIC8vIG9wdGlvbmFsbHkpLiBEZWxlZ2F0ZXMgdG8gKipFQ01BU2NyaXB0IDUqKidzIG5hdGl2ZSBgRnVuY3Rpb24uYmluZGAgaWZcbiAgLy8gYXZhaWxhYmxlLlxuICBfLmJpbmQgPSByZXN0QXJndW1lbnRzKGZ1bmN0aW9uKGZ1bmMsIGNvbnRleHQsIGFyZ3MpIHtcbiAgICBpZiAoIV8uaXNGdW5jdGlvbihmdW5jKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignQmluZCBtdXN0IGJlIGNhbGxlZCBvbiBhIGZ1bmN0aW9uJyk7XG4gICAgdmFyIGJvdW5kID0gcmVzdEFyZ3VtZW50cyhmdW5jdGlvbihjYWxsQXJncykge1xuICAgICAgcmV0dXJuIGV4ZWN1dGVCb3VuZChmdW5jLCBib3VuZCwgY29udGV4dCwgdGhpcywgYXJncy5jb25jYXQoY2FsbEFyZ3MpKTtcbiAgICB9KTtcbiAgICByZXR1cm4gYm91bmQ7XG4gIH0pO1xuXG4gIC8vIFBhcnRpYWxseSBhcHBseSBhIGZ1bmN0aW9uIGJ5IGNyZWF0aW5nIGEgdmVyc2lvbiB0aGF0IGhhcyBoYWQgc29tZSBvZiBpdHNcbiAgLy8gYXJndW1lbnRzIHByZS1maWxsZWQsIHdpdGhvdXQgY2hhbmdpbmcgaXRzIGR5bmFtaWMgYHRoaXNgIGNvbnRleHQuIF8gYWN0c1xuICAvLyBhcyBhIHBsYWNlaG9sZGVyIGJ5IGRlZmF1bHQsIGFsbG93aW5nIGFueSBjb21iaW5hdGlvbiBvZiBhcmd1bWVudHMgdG8gYmVcbiAgLy8gcHJlLWZpbGxlZC4gU2V0IGBfLnBhcnRpYWwucGxhY2Vob2xkZXJgIGZvciBhIGN1c3RvbSBwbGFjZWhvbGRlciBhcmd1bWVudC5cbiAgXy5wYXJ0aWFsID0gcmVzdEFyZ3VtZW50cyhmdW5jdGlvbihmdW5jLCBib3VuZEFyZ3MpIHtcbiAgICB2YXIgcGxhY2Vob2xkZXIgPSBfLnBhcnRpYWwucGxhY2Vob2xkZXI7XG4gICAgdmFyIGJvdW5kID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcG9zaXRpb24gPSAwLCBsZW5ndGggPSBib3VuZEFyZ3MubGVuZ3RoO1xuICAgICAgdmFyIGFyZ3MgPSBBcnJheShsZW5ndGgpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBhcmdzW2ldID0gYm91bmRBcmdzW2ldID09PSBwbGFjZWhvbGRlciA/IGFyZ3VtZW50c1twb3NpdGlvbisrXSA6IGJvdW5kQXJnc1tpXTtcbiAgICAgIH1cbiAgICAgIHdoaWxlIChwb3NpdGlvbiA8IGFyZ3VtZW50cy5sZW5ndGgpIGFyZ3MucHVzaChhcmd1bWVudHNbcG9zaXRpb24rK10pO1xuICAgICAgcmV0dXJuIGV4ZWN1dGVCb3VuZChmdW5jLCBib3VuZCwgdGhpcywgdGhpcywgYXJncyk7XG4gICAgfTtcbiAgICByZXR1cm4gYm91bmQ7XG4gIH0pO1xuXG4gIF8ucGFydGlhbC5wbGFjZWhvbGRlciA9IF87XG5cbiAgLy8gQmluZCBhIG51bWJlciBvZiBhbiBvYmplY3QncyBtZXRob2RzIHRvIHRoYXQgb2JqZWN0LiBSZW1haW5pbmcgYXJndW1lbnRzXG4gIC8vIGFyZSB0aGUgbWV0aG9kIG5hbWVzIHRvIGJlIGJvdW5kLiBVc2VmdWwgZm9yIGVuc3VyaW5nIHRoYXQgYWxsIGNhbGxiYWNrc1xuICAvLyBkZWZpbmVkIG9uIGFuIG9iamVjdCBiZWxvbmcgdG8gaXQuXG4gIF8uYmluZEFsbCA9IHJlc3RBcmd1bWVudHMoZnVuY3Rpb24ob2JqLCBrZXlzKSB7XG4gICAga2V5cyA9IGZsYXR0ZW4oa2V5cywgZmFsc2UsIGZhbHNlKTtcbiAgICB2YXIgaW5kZXggPSBrZXlzLmxlbmd0aDtcbiAgICBpZiAoaW5kZXggPCAxKSB0aHJvdyBuZXcgRXJyb3IoJ2JpbmRBbGwgbXVzdCBiZSBwYXNzZWQgZnVuY3Rpb24gbmFtZXMnKTtcbiAgICB3aGlsZSAoaW5kZXgtLSkge1xuICAgICAgdmFyIGtleSA9IGtleXNbaW5kZXhdO1xuICAgICAgb2JqW2tleV0gPSBfLmJpbmQob2JqW2tleV0sIG9iaik7XG4gICAgfVxuICB9KTtcblxuICAvLyBNZW1vaXplIGFuIGV4cGVuc2l2ZSBmdW5jdGlvbiBieSBzdG9yaW5nIGl0cyByZXN1bHRzLlxuICBfLm1lbW9pemUgPSBmdW5jdGlvbihmdW5jLCBoYXNoZXIpIHtcbiAgICB2YXIgbWVtb2l6ZSA9IGZ1bmN0aW9uKGtleSkge1xuICAgICAgdmFyIGNhY2hlID0gbWVtb2l6ZS5jYWNoZTtcbiAgICAgIHZhciBhZGRyZXNzID0gJycgKyAoaGFzaGVyID8gaGFzaGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgOiBrZXkpO1xuICAgICAgaWYgKCFfLmhhcyhjYWNoZSwgYWRkcmVzcykpIGNhY2hlW2FkZHJlc3NdID0gZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgcmV0dXJuIGNhY2hlW2FkZHJlc3NdO1xuICAgIH07XG4gICAgbWVtb2l6ZS5jYWNoZSA9IHt9O1xuICAgIHJldHVybiBtZW1vaXplO1xuICB9O1xuXG4gIC8vIERlbGF5cyBhIGZ1bmN0aW9uIGZvciB0aGUgZ2l2ZW4gbnVtYmVyIG9mIG1pbGxpc2Vjb25kcywgYW5kIHRoZW4gY2FsbHNcbiAgLy8gaXQgd2l0aCB0aGUgYXJndW1lbnRzIHN1cHBsaWVkLlxuICBfLmRlbGF5ID0gcmVzdEFyZ3VtZW50cyhmdW5jdGlvbihmdW5jLCB3YWl0LCBhcmdzKSB7XG4gICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZnVuYy5hcHBseShudWxsLCBhcmdzKTtcbiAgICB9LCB3YWl0KTtcbiAgfSk7XG5cbiAgLy8gRGVmZXJzIGEgZnVuY3Rpb24sIHNjaGVkdWxpbmcgaXQgdG8gcnVuIGFmdGVyIHRoZSBjdXJyZW50IGNhbGwgc3RhY2sgaGFzXG4gIC8vIGNsZWFyZWQuXG4gIF8uZGVmZXIgPSBfLnBhcnRpYWwoXy5kZWxheSwgXywgMSk7XG5cbiAgLy8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCB3aGVuIGludm9rZWQsIHdpbGwgb25seSBiZSB0cmlnZ2VyZWQgYXQgbW9zdCBvbmNlXG4gIC8vIGR1cmluZyBhIGdpdmVuIHdpbmRvdyBvZiB0aW1lLiBOb3JtYWxseSwgdGhlIHRocm90dGxlZCBmdW5jdGlvbiB3aWxsIHJ1blxuICAvLyBhcyBtdWNoIGFzIGl0IGNhbiwgd2l0aG91dCBldmVyIGdvaW5nIG1vcmUgdGhhbiBvbmNlIHBlciBgd2FpdGAgZHVyYXRpb247XG4gIC8vIGJ1dCBpZiB5b3UnZCBsaWtlIHRvIGRpc2FibGUgdGhlIGV4ZWN1dGlvbiBvbiB0aGUgbGVhZGluZyBlZGdlLCBwYXNzXG4gIC8vIGB7bGVhZGluZzogZmFsc2V9YC4gVG8gZGlzYWJsZSBleGVjdXRpb24gb24gdGhlIHRyYWlsaW5nIGVkZ2UsIGRpdHRvLlxuICBfLnRocm90dGxlID0gZnVuY3Rpb24oZnVuYywgd2FpdCwgb3B0aW9ucykge1xuICAgIHZhciB0aW1lb3V0LCBjb250ZXh0LCBhcmdzLCByZXN1bHQ7XG4gICAgdmFyIHByZXZpb3VzID0gMDtcbiAgICBpZiAoIW9wdGlvbnMpIG9wdGlvbnMgPSB7fTtcblxuICAgIHZhciBsYXRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgcHJldmlvdXMgPSBvcHRpb25zLmxlYWRpbmcgPT09IGZhbHNlID8gMCA6IF8ubm93KCk7XG4gICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICBpZiAoIXRpbWVvdXQpIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICB9O1xuXG4gICAgdmFyIHRocm90dGxlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG5vdyA9IF8ubm93KCk7XG4gICAgICBpZiAoIXByZXZpb3VzICYmIG9wdGlvbnMubGVhZGluZyA9PT0gZmFsc2UpIHByZXZpb3VzID0gbm93O1xuICAgICAgdmFyIHJlbWFpbmluZyA9IHdhaXQgLSAobm93IC0gcHJldmlvdXMpO1xuICAgICAgY29udGV4dCA9IHRoaXM7XG4gICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgaWYgKHJlbWFpbmluZyA8PSAwIHx8IHJlbWFpbmluZyA+IHdhaXQpIHtcbiAgICAgICAgaWYgKHRpbWVvdXQpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcHJldmlvdXMgPSBub3c7XG4gICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgIGlmICghdGltZW91dCkgY29udGV4dCA9IGFyZ3MgPSBudWxsO1xuICAgICAgfSBlbHNlIGlmICghdGltZW91dCAmJiBvcHRpb25zLnRyYWlsaW5nICE9PSBmYWxzZSkge1xuICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgcmVtYWluaW5nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcblxuICAgIHRocm90dGxlZC5jYW5jZWwgPSBmdW5jdGlvbigpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgIHByZXZpb3VzID0gMDtcbiAgICAgIHRpbWVvdXQgPSBjb250ZXh0ID0gYXJncyA9IG51bGw7XG4gICAgfTtcblxuICAgIHJldHVybiB0aHJvdHRsZWQ7XG4gIH07XG5cbiAgLy8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCBhcyBsb25nIGFzIGl0IGNvbnRpbnVlcyB0byBiZSBpbnZva2VkLCB3aWxsIG5vdFxuICAvLyBiZSB0cmlnZ2VyZWQuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciBpdCBzdG9wcyBiZWluZyBjYWxsZWQgZm9yXG4gIC8vIE4gbWlsbGlzZWNvbmRzLiBJZiBgaW1tZWRpYXRlYCBpcyBwYXNzZWQsIHRyaWdnZXIgdGhlIGZ1bmN0aW9uIG9uIHRoZVxuICAvLyBsZWFkaW5nIGVkZ2UsIGluc3RlYWQgb2YgdGhlIHRyYWlsaW5nLlxuICBfLmRlYm91bmNlID0gZnVuY3Rpb24oZnVuYywgd2FpdCwgaW1tZWRpYXRlKSB7XG4gICAgdmFyIHRpbWVvdXQsIHJlc3VsdDtcblxuICAgIHZhciBsYXRlciA9IGZ1bmN0aW9uKGNvbnRleHQsIGFyZ3MpIHtcbiAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgaWYgKGFyZ3MpIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgfTtcblxuICAgIHZhciBkZWJvdW5jZWQgPSByZXN0QXJndW1lbnRzKGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICAgIGlmICh0aW1lb3V0KSBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICBpZiAoaW1tZWRpYXRlKSB7XG4gICAgICAgIHZhciBjYWxsTm93ID0gIXRpbWVvdXQ7XG4gICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcbiAgICAgICAgaWYgKGNhbGxOb3cpIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aW1lb3V0ID0gXy5kZWxheShsYXRlciwgd2FpdCwgdGhpcywgYXJncyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSk7XG5cbiAgICBkZWJvdW5jZWQuY2FuY2VsID0gZnVuY3Rpb24oKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIGRlYm91bmNlZDtcbiAgfTtcblxuICAvLyBSZXR1cm5zIHRoZSBmaXJzdCBmdW5jdGlvbiBwYXNzZWQgYXMgYW4gYXJndW1lbnQgdG8gdGhlIHNlY29uZCxcbiAgLy8gYWxsb3dpbmcgeW91IHRvIGFkanVzdCBhcmd1bWVudHMsIHJ1biBjb2RlIGJlZm9yZSBhbmQgYWZ0ZXIsIGFuZFxuICAvLyBjb25kaXRpb25hbGx5IGV4ZWN1dGUgdGhlIG9yaWdpbmFsIGZ1bmN0aW9uLlxuICBfLndyYXAgPSBmdW5jdGlvbihmdW5jLCB3cmFwcGVyKSB7XG4gICAgcmV0dXJuIF8ucGFydGlhbCh3cmFwcGVyLCBmdW5jKTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgbmVnYXRlZCB2ZXJzaW9uIG9mIHRoZSBwYXNzZWQtaW4gcHJlZGljYXRlLlxuICBfLm5lZ2F0ZSA9IGZ1bmN0aW9uKHByZWRpY2F0ZSkge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAhcHJlZGljYXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBpcyB0aGUgY29tcG9zaXRpb24gb2YgYSBsaXN0IG9mIGZ1bmN0aW9ucywgZWFjaFxuICAvLyBjb25zdW1pbmcgdGhlIHJldHVybiB2YWx1ZSBvZiB0aGUgZnVuY3Rpb24gdGhhdCBmb2xsb3dzLlxuICBfLmNvbXBvc2UgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICB2YXIgc3RhcnQgPSBhcmdzLmxlbmd0aCAtIDE7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGkgPSBzdGFydDtcbiAgICAgIHZhciByZXN1bHQgPSBhcmdzW3N0YXJ0XS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgd2hpbGUgKGktLSkgcmVzdWx0ID0gYXJnc1tpXS5jYWxsKHRoaXMsIHJlc3VsdCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gIH07XG5cbiAgLy8gUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBvbmx5IGJlIGV4ZWN1dGVkIG9uIGFuZCBhZnRlciB0aGUgTnRoIGNhbGwuXG4gIF8uYWZ0ZXIgPSBmdW5jdGlvbih0aW1lcywgZnVuYykge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICgtLXRpbWVzIDwgMSkge1xuICAgICAgICByZXR1cm4gZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuICAgIH07XG4gIH07XG5cbiAgLy8gUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBvbmx5IGJlIGV4ZWN1dGVkIHVwIHRvIChidXQgbm90IGluY2x1ZGluZykgdGhlIE50aCBjYWxsLlxuICBfLmJlZm9yZSA9IGZ1bmN0aW9uKHRpbWVzLCBmdW5jKSB7XG4gICAgdmFyIG1lbW87XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKC0tdGltZXMgPiAwKSB7XG4gICAgICAgIG1lbW8gPSBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgICBpZiAodGltZXMgPD0gMSkgZnVuYyA9IG51bGw7XG4gICAgICByZXR1cm4gbWVtbztcbiAgICB9O1xuICB9O1xuXG4gIC8vIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgZXhlY3V0ZWQgYXQgbW9zdCBvbmUgdGltZSwgbm8gbWF0dGVyIGhvd1xuICAvLyBvZnRlbiB5b3UgY2FsbCBpdC4gVXNlZnVsIGZvciBsYXp5IGluaXRpYWxpemF0aW9uLlxuICBfLm9uY2UgPSBfLnBhcnRpYWwoXy5iZWZvcmUsIDIpO1xuXG4gIF8ucmVzdEFyZ3VtZW50cyA9IHJlc3RBcmd1bWVudHM7XG5cbiAgLy8gT2JqZWN0IEZ1bmN0aW9uc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gS2V5cyBpbiBJRSA8IDkgdGhhdCB3b24ndCBiZSBpdGVyYXRlZCBieSBgZm9yIGtleSBpbiAuLi5gIGFuZCB0aHVzIG1pc3NlZC5cbiAgdmFyIGhhc0VudW1CdWcgPSAhe3RvU3RyaW5nOiBudWxsfS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgndG9TdHJpbmcnKTtcbiAgdmFyIG5vbkVudW1lcmFibGVQcm9wcyA9IFsndmFsdWVPZicsICdpc1Byb3RvdHlwZU9mJywgJ3RvU3RyaW5nJyxcbiAgICAncHJvcGVydHlJc0VudW1lcmFibGUnLCAnaGFzT3duUHJvcGVydHknLCAndG9Mb2NhbGVTdHJpbmcnXTtcblxuICB2YXIgY29sbGVjdE5vbkVudW1Qcm9wcyA9IGZ1bmN0aW9uKG9iaiwga2V5cykge1xuICAgIHZhciBub25FbnVtSWR4ID0gbm9uRW51bWVyYWJsZVByb3BzLmxlbmd0aDtcbiAgICB2YXIgY29uc3RydWN0b3IgPSBvYmouY29uc3RydWN0b3I7XG4gICAgdmFyIHByb3RvID0gXy5pc0Z1bmN0aW9uKGNvbnN0cnVjdG9yKSAmJiBjb25zdHJ1Y3Rvci5wcm90b3R5cGUgfHwgT2JqUHJvdG87XG5cbiAgICAvLyBDb25zdHJ1Y3RvciBpcyBhIHNwZWNpYWwgY2FzZS5cbiAgICB2YXIgcHJvcCA9ICdjb25zdHJ1Y3Rvcic7XG4gICAgaWYgKF8uaGFzKG9iaiwgcHJvcCkgJiYgIV8uY29udGFpbnMoa2V5cywgcHJvcCkpIGtleXMucHVzaChwcm9wKTtcblxuICAgIHdoaWxlIChub25FbnVtSWR4LS0pIHtcbiAgICAgIHByb3AgPSBub25FbnVtZXJhYmxlUHJvcHNbbm9uRW51bUlkeF07XG4gICAgICBpZiAocHJvcCBpbiBvYmogJiYgb2JqW3Byb3BdICE9PSBwcm90b1twcm9wXSAmJiAhXy5jb250YWlucyhrZXlzLCBwcm9wKSkge1xuICAgICAgICBrZXlzLnB1c2gocHJvcCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8vIFJldHJpZXZlIHRoZSBuYW1lcyBvZiBhbiBvYmplY3QncyBvd24gcHJvcGVydGllcy5cbiAgLy8gRGVsZWdhdGVzIHRvICoqRUNNQVNjcmlwdCA1KioncyBuYXRpdmUgYE9iamVjdC5rZXlzYC5cbiAgXy5rZXlzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKCFfLmlzT2JqZWN0KG9iaikpIHJldHVybiBbXTtcbiAgICBpZiAobmF0aXZlS2V5cykgcmV0dXJuIG5hdGl2ZUtleXMob2JqKTtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIGlmIChfLmhhcyhvYmosIGtleSkpIGtleXMucHVzaChrZXkpO1xuICAgIC8vIEFoZW0sIElFIDwgOS5cbiAgICBpZiAoaGFzRW51bUJ1ZykgY29sbGVjdE5vbkVudW1Qcm9wcyhvYmosIGtleXMpO1xuICAgIHJldHVybiBrZXlzO1xuICB9O1xuXG4gIC8vIFJldHJpZXZlIGFsbCB0aGUgcHJvcGVydHkgbmFtZXMgb2YgYW4gb2JqZWN0LlxuICBfLmFsbEtleXMgPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAoIV8uaXNPYmplY3Qob2JqKSkgcmV0dXJuIFtdO1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iaikga2V5cy5wdXNoKGtleSk7XG4gICAgLy8gQWhlbSwgSUUgPCA5LlxuICAgIGlmIChoYXNFbnVtQnVnKSBjb2xsZWN0Tm9uRW51bVByb3BzKG9iaiwga2V5cyk7XG4gICAgcmV0dXJuIGtleXM7XG4gIH07XG5cbiAgLy8gUmV0cmlldmUgdGhlIHZhbHVlcyBvZiBhbiBvYmplY3QncyBwcm9wZXJ0aWVzLlxuICBfLnZhbHVlcyA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciBrZXlzID0gXy5rZXlzKG9iaik7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciB2YWx1ZXMgPSBBcnJheShsZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhbHVlc1tpXSA9IG9ialtrZXlzW2ldXTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlcztcbiAgfTtcblxuICAvLyBSZXR1cm5zIHRoZSByZXN1bHRzIG9mIGFwcGx5aW5nIHRoZSBpdGVyYXRlZSB0byBlYWNoIGVsZW1lbnQgb2YgdGhlIG9iamVjdC5cbiAgLy8gSW4gY29udHJhc3QgdG8gXy5tYXAgaXQgcmV0dXJucyBhbiBvYmplY3QuXG4gIF8ubWFwT2JqZWN0ID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgIGl0ZXJhdGVlID0gY2IoaXRlcmF0ZWUsIGNvbnRleHQpO1xuICAgIHZhciBrZXlzID0gXy5rZXlzKG9iaiksXG4gICAgICAgIGxlbmd0aCA9IGtleXMubGVuZ3RoLFxuICAgICAgICByZXN1bHRzID0ge307XG4gICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgdmFyIGN1cnJlbnRLZXkgPSBrZXlzW2luZGV4XTtcbiAgICAgIHJlc3VsdHNbY3VycmVudEtleV0gPSBpdGVyYXRlZShvYmpbY3VycmVudEtleV0sIGN1cnJlbnRLZXksIG9iaik7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xuICB9O1xuXG4gIC8vIENvbnZlcnQgYW4gb2JqZWN0IGludG8gYSBsaXN0IG9mIGBba2V5LCB2YWx1ZV1gIHBhaXJzLlxuICAvLyBUaGUgb3Bwb3NpdGUgb2YgXy5vYmplY3QuXG4gIF8ucGFpcnMgPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIga2V5cyA9IF8ua2V5cyhvYmopO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgcGFpcnMgPSBBcnJheShsZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHBhaXJzW2ldID0gW2tleXNbaV0sIG9ialtrZXlzW2ldXV07XG4gICAgfVxuICAgIHJldHVybiBwYWlycztcbiAgfTtcblxuICAvLyBJbnZlcnQgdGhlIGtleXMgYW5kIHZhbHVlcyBvZiBhbiBvYmplY3QuIFRoZSB2YWx1ZXMgbXVzdCBiZSBzZXJpYWxpemFibGUuXG4gIF8uaW52ZXJ0ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIHZhciBrZXlzID0gXy5rZXlzKG9iaik7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGtleXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHJlc3VsdFtvYmpba2V5c1tpXV1dID0ga2V5c1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBSZXR1cm4gYSBzb3J0ZWQgbGlzdCBvZiB0aGUgZnVuY3Rpb24gbmFtZXMgYXZhaWxhYmxlIG9uIHRoZSBvYmplY3QuXG4gIC8vIEFsaWFzZWQgYXMgYG1ldGhvZHNgLlxuICBfLmZ1bmN0aW9ucyA9IF8ubWV0aG9kcyA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciBuYW1lcyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChfLmlzRnVuY3Rpb24ob2JqW2tleV0pKSBuYW1lcy5wdXNoKGtleSk7XG4gICAgfVxuICAgIHJldHVybiBuYW1lcy5zb3J0KCk7XG4gIH07XG5cbiAgLy8gQW4gaW50ZXJuYWwgZnVuY3Rpb24gZm9yIGNyZWF0aW5nIGFzc2lnbmVyIGZ1bmN0aW9ucy5cbiAgdmFyIGNyZWF0ZUFzc2lnbmVyID0gZnVuY3Rpb24oa2V5c0Z1bmMsIGRlZmF1bHRzKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKG9iaikge1xuICAgICAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICBpZiAoZGVmYXVsdHMpIG9iaiA9IE9iamVjdChvYmopO1xuICAgICAgaWYgKGxlbmd0aCA8IDIgfHwgb2JqID09IG51bGwpIHJldHVybiBvYmo7XG4gICAgICBmb3IgKHZhciBpbmRleCA9IDE7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaW5kZXhdLFxuICAgICAgICAgICAga2V5cyA9IGtleXNGdW5jKHNvdXJjZSksXG4gICAgICAgICAgICBsID0ga2V5cy5sZW5ndGg7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgaWYgKCFkZWZhdWx0cyB8fCBvYmpba2V5XSA9PT0gdm9pZCAwKSBvYmpba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gb2JqO1xuICAgIH07XG4gIH07XG5cbiAgLy8gRXh0ZW5kIGEgZ2l2ZW4gb2JqZWN0IHdpdGggYWxsIHRoZSBwcm9wZXJ0aWVzIGluIHBhc3NlZC1pbiBvYmplY3QocykuXG4gIF8uZXh0ZW5kID0gY3JlYXRlQXNzaWduZXIoXy5hbGxLZXlzKTtcblxuICAvLyBBc3NpZ25zIGEgZ2l2ZW4gb2JqZWN0IHdpdGggYWxsIHRoZSBvd24gcHJvcGVydGllcyBpbiB0aGUgcGFzc2VkLWluIG9iamVjdChzKS5cbiAgLy8gKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9hc3NpZ24pXG4gIF8uZXh0ZW5kT3duID0gXy5hc3NpZ24gPSBjcmVhdGVBc3NpZ25lcihfLmtleXMpO1xuXG4gIC8vIFJldHVybnMgdGhlIGZpcnN0IGtleSBvbiBhbiBvYmplY3QgdGhhdCBwYXNzZXMgYSBwcmVkaWNhdGUgdGVzdC5cbiAgXy5maW5kS2V5ID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICBwcmVkaWNhdGUgPSBjYihwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgIHZhciBrZXlzID0gXy5rZXlzKG9iaiksIGtleTtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgIGlmIChwcmVkaWNhdGUob2JqW2tleV0sIGtleSwgb2JqKSkgcmV0dXJuIGtleTtcbiAgICB9XG4gIH07XG5cbiAgLy8gSW50ZXJuYWwgcGljayBoZWxwZXIgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGlmIGBvYmpgIGhhcyBrZXkgYGtleWAuXG4gIHZhciBrZXlJbk9iaiA9IGZ1bmN0aW9uKHZhbHVlLCBrZXksIG9iaikge1xuICAgIHJldHVybiBrZXkgaW4gb2JqO1xuICB9O1xuXG4gIC8vIFJldHVybiBhIGNvcHkgb2YgdGhlIG9iamVjdCBvbmx5IGNvbnRhaW5pbmcgdGhlIHdoaXRlbGlzdGVkIHByb3BlcnRpZXMuXG4gIF8ucGljayA9IHJlc3RBcmd1bWVudHMoZnVuY3Rpb24ob2JqLCBrZXlzKSB7XG4gICAgdmFyIHJlc3VsdCA9IHt9LCBpdGVyYXRlZSA9IGtleXNbMF07XG4gICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gcmVzdWx0O1xuICAgIGlmIChfLmlzRnVuY3Rpb24oaXRlcmF0ZWUpKSB7XG4gICAgICBpZiAoa2V5cy5sZW5ndGggPiAxKSBpdGVyYXRlZSA9IG9wdGltaXplQ2IoaXRlcmF0ZWUsIGtleXNbMV0pO1xuICAgICAga2V5cyA9IF8uYWxsS2V5cyhvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBpdGVyYXRlZSA9IGtleUluT2JqO1xuICAgICAga2V5cyA9IGZsYXR0ZW4oa2V5cywgZmFsc2UsIGZhbHNlKTtcbiAgICAgIG9iaiA9IE9iamVjdChvYmopO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgICB2YXIgdmFsdWUgPSBvYmpba2V5XTtcbiAgICAgIGlmIChpdGVyYXRlZSh2YWx1ZSwga2V5LCBvYmopKSByZXN1bHRba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9KTtcblxuICAvLyBSZXR1cm4gYSBjb3B5IG9mIHRoZSBvYmplY3Qgd2l0aG91dCB0aGUgYmxhY2tsaXN0ZWQgcHJvcGVydGllcy5cbiAgXy5vbWl0ID0gcmVzdEFyZ3VtZW50cyhmdW5jdGlvbihvYmosIGtleXMpIHtcbiAgICB2YXIgaXRlcmF0ZWUgPSBrZXlzWzBdLCBjb250ZXh0O1xuICAgIGlmIChfLmlzRnVuY3Rpb24oaXRlcmF0ZWUpKSB7XG4gICAgICBpdGVyYXRlZSA9IF8ubmVnYXRlKGl0ZXJhdGVlKTtcbiAgICAgIGlmIChrZXlzLmxlbmd0aCA+IDEpIGNvbnRleHQgPSBrZXlzWzFdO1xuICAgIH0gZWxzZSB7XG4gICAgICBrZXlzID0gXy5tYXAoZmxhdHRlbihrZXlzLCBmYWxzZSwgZmFsc2UpLCBTdHJpbmcpO1xuICAgICAgaXRlcmF0ZWUgPSBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgICAgIHJldHVybiAhXy5jb250YWlucyhrZXlzLCBrZXkpO1xuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIF8ucGljayhvYmosIGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgfSk7XG5cbiAgLy8gRmlsbCBpbiBhIGdpdmVuIG9iamVjdCB3aXRoIGRlZmF1bHQgcHJvcGVydGllcy5cbiAgXy5kZWZhdWx0cyA9IGNyZWF0ZUFzc2lnbmVyKF8uYWxsS2V5cywgdHJ1ZSk7XG5cbiAgLy8gQ3JlYXRlcyBhbiBvYmplY3QgdGhhdCBpbmhlcml0cyBmcm9tIHRoZSBnaXZlbiBwcm90b3R5cGUgb2JqZWN0LlxuICAvLyBJZiBhZGRpdGlvbmFsIHByb3BlcnRpZXMgYXJlIHByb3ZpZGVkIHRoZW4gdGhleSB3aWxsIGJlIGFkZGVkIHRvIHRoZVxuICAvLyBjcmVhdGVkIG9iamVjdC5cbiAgXy5jcmVhdGUgPSBmdW5jdGlvbihwcm90b3R5cGUsIHByb3BzKSB7XG4gICAgdmFyIHJlc3VsdCA9IGJhc2VDcmVhdGUocHJvdG90eXBlKTtcbiAgICBpZiAocHJvcHMpIF8uZXh0ZW5kT3duKHJlc3VsdCwgcHJvcHMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLy8gQ3JlYXRlIGEgKHNoYWxsb3ctY2xvbmVkKSBkdXBsaWNhdGUgb2YgYW4gb2JqZWN0LlxuICBfLmNsb25lID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKCFfLmlzT2JqZWN0KG9iaikpIHJldHVybiBvYmo7XG4gICAgcmV0dXJuIF8uaXNBcnJheShvYmopID8gb2JqLnNsaWNlKCkgOiBfLmV4dGVuZCh7fSwgb2JqKTtcbiAgfTtcblxuICAvLyBJbnZva2VzIGludGVyY2VwdG9yIHdpdGggdGhlIG9iaiwgYW5kIHRoZW4gcmV0dXJucyBvYmouXG4gIC8vIFRoZSBwcmltYXJ5IHB1cnBvc2Ugb2YgdGhpcyBtZXRob2QgaXMgdG8gXCJ0YXAgaW50b1wiIGEgbWV0aG9kIGNoYWluLCBpblxuICAvLyBvcmRlciB0byBwZXJmb3JtIG9wZXJhdGlvbnMgb24gaW50ZXJtZWRpYXRlIHJlc3VsdHMgd2l0aGluIHRoZSBjaGFpbi5cbiAgXy50YXAgPSBmdW5jdGlvbihvYmosIGludGVyY2VwdG9yKSB7XG4gICAgaW50ZXJjZXB0b3Iob2JqKTtcbiAgICByZXR1cm4gb2JqO1xuICB9O1xuXG4gIC8vIFJldHVybnMgd2hldGhlciBhbiBvYmplY3QgaGFzIGEgZ2l2ZW4gc2V0IG9mIGBrZXk6dmFsdWVgIHBhaXJzLlxuICBfLmlzTWF0Y2ggPSBmdW5jdGlvbihvYmplY3QsIGF0dHJzKSB7XG4gICAgdmFyIGtleXMgPSBfLmtleXMoYXR0cnMpLCBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICBpZiAob2JqZWN0ID09IG51bGwpIHJldHVybiAhbGVuZ3RoO1xuICAgIHZhciBvYmogPSBPYmplY3Qob2JqZWN0KTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgIGlmIChhdHRyc1trZXldICE9PSBvYmpba2V5XSB8fCAhKGtleSBpbiBvYmopKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG5cbiAgLy8gSW50ZXJuYWwgcmVjdXJzaXZlIGNvbXBhcmlzb24gZnVuY3Rpb24gZm9yIGBpc0VxdWFsYC5cbiAgdmFyIGVxLCBkZWVwRXE7XG4gIGVxID0gZnVuY3Rpb24oYSwgYiwgYVN0YWNrLCBiU3RhY2spIHtcbiAgICAvLyBJZGVudGljYWwgb2JqZWN0cyBhcmUgZXF1YWwuIGAwID09PSAtMGAsIGJ1dCB0aGV5IGFyZW4ndCBpZGVudGljYWwuXG4gICAgLy8gU2VlIHRoZSBbSGFybW9ueSBgZWdhbGAgcHJvcG9zYWxdKGh0dHA6Ly93aWtpLmVjbWFzY3JpcHQub3JnL2Rva3UucGhwP2lkPWhhcm1vbnk6ZWdhbCkuXG4gICAgaWYgKGEgPT09IGIpIHJldHVybiBhICE9PSAwIHx8IDEgLyBhID09PSAxIC8gYjtcbiAgICAvLyBgbnVsbGAgb3IgYHVuZGVmaW5lZGAgb25seSBlcXVhbCB0byBpdHNlbGYgKHN0cmljdCBjb21wYXJpc29uKS5cbiAgICBpZiAoYSA9PSBudWxsIHx8IGIgPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuICAgIC8vIGBOYU5gcyBhcmUgZXF1aXZhbGVudCwgYnV0IG5vbi1yZWZsZXhpdmUuXG4gICAgaWYgKGEgIT09IGEpIHJldHVybiBiICE9PSBiO1xuICAgIC8vIEV4aGF1c3QgcHJpbWl0aXZlIGNoZWNrc1xuICAgIHZhciB0eXBlID0gdHlwZW9mIGE7XG4gICAgaWYgKHR5cGUgIT09ICdmdW5jdGlvbicgJiYgdHlwZSAhPT0gJ29iamVjdCcgJiYgdHlwZW9mIGIgIT0gJ29iamVjdCcpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gZGVlcEVxKGEsIGIsIGFTdGFjaywgYlN0YWNrKTtcbiAgfTtcblxuICAvLyBJbnRlcm5hbCByZWN1cnNpdmUgY29tcGFyaXNvbiBmdW5jdGlvbiBmb3IgYGlzRXF1YWxgLlxuICBkZWVwRXEgPSBmdW5jdGlvbihhLCBiLCBhU3RhY2ssIGJTdGFjaykge1xuICAgIC8vIFVud3JhcCBhbnkgd3JhcHBlZCBvYmplY3RzLlxuICAgIGlmIChhIGluc3RhbmNlb2YgXykgYSA9IGEuX3dyYXBwZWQ7XG4gICAgaWYgKGIgaW5zdGFuY2VvZiBfKSBiID0gYi5fd3JhcHBlZDtcbiAgICAvLyBDb21wYXJlIGBbW0NsYXNzXV1gIG5hbWVzLlxuICAgIHZhciBjbGFzc05hbWUgPSB0b1N0cmluZy5jYWxsKGEpO1xuICAgIGlmIChjbGFzc05hbWUgIT09IHRvU3RyaW5nLmNhbGwoYikpIHJldHVybiBmYWxzZTtcbiAgICBzd2l0Y2ggKGNsYXNzTmFtZSkge1xuICAgICAgLy8gU3RyaW5ncywgbnVtYmVycywgcmVndWxhciBleHByZXNzaW9ucywgZGF0ZXMsIGFuZCBib29sZWFucyBhcmUgY29tcGFyZWQgYnkgdmFsdWUuXG4gICAgICBjYXNlICdbb2JqZWN0IFJlZ0V4cF0nOlxuICAgICAgLy8gUmVnRXhwcyBhcmUgY29lcmNlZCB0byBzdHJpbmdzIGZvciBjb21wYXJpc29uIChOb3RlOiAnJyArIC9hL2kgPT09ICcvYS9pJylcbiAgICAgIGNhc2UgJ1tvYmplY3QgU3RyaW5nXSc6XG4gICAgICAgIC8vIFByaW1pdGl2ZXMgYW5kIHRoZWlyIGNvcnJlc3BvbmRpbmcgb2JqZWN0IHdyYXBwZXJzIGFyZSBlcXVpdmFsZW50OyB0aHVzLCBgXCI1XCJgIGlzXG4gICAgICAgIC8vIGVxdWl2YWxlbnQgdG8gYG5ldyBTdHJpbmcoXCI1XCIpYC5cbiAgICAgICAgcmV0dXJuICcnICsgYSA9PT0gJycgKyBiO1xuICAgICAgY2FzZSAnW29iamVjdCBOdW1iZXJdJzpcbiAgICAgICAgLy8gYE5hTmBzIGFyZSBlcXVpdmFsZW50LCBidXQgbm9uLXJlZmxleGl2ZS5cbiAgICAgICAgLy8gT2JqZWN0KE5hTikgaXMgZXF1aXZhbGVudCB0byBOYU4uXG4gICAgICAgIGlmICgrYSAhPT0gK2EpIHJldHVybiArYiAhPT0gK2I7XG4gICAgICAgIC8vIEFuIGBlZ2FsYCBjb21wYXJpc29uIGlzIHBlcmZvcm1lZCBmb3Igb3RoZXIgbnVtZXJpYyB2YWx1ZXMuXG4gICAgICAgIHJldHVybiArYSA9PT0gMCA/IDEgLyArYSA9PT0gMSAvIGIgOiArYSA9PT0gK2I7XG4gICAgICBjYXNlICdbb2JqZWN0IERhdGVdJzpcbiAgICAgIGNhc2UgJ1tvYmplY3QgQm9vbGVhbl0nOlxuICAgICAgICAvLyBDb2VyY2UgZGF0ZXMgYW5kIGJvb2xlYW5zIHRvIG51bWVyaWMgcHJpbWl0aXZlIHZhbHVlcy4gRGF0ZXMgYXJlIGNvbXBhcmVkIGJ5IHRoZWlyXG4gICAgICAgIC8vIG1pbGxpc2Vjb25kIHJlcHJlc2VudGF0aW9ucy4gTm90ZSB0aGF0IGludmFsaWQgZGF0ZXMgd2l0aCBtaWxsaXNlY29uZCByZXByZXNlbnRhdGlvbnNcbiAgICAgICAgLy8gb2YgYE5hTmAgYXJlIG5vdCBlcXVpdmFsZW50LlxuICAgICAgICByZXR1cm4gK2EgPT09ICtiO1xuICAgICAgY2FzZSAnW29iamVjdCBTeW1ib2xdJzpcbiAgICAgICAgcmV0dXJuIFN5bWJvbFByb3RvLnZhbHVlT2YuY2FsbChhKSA9PT0gU3ltYm9sUHJvdG8udmFsdWVPZi5jYWxsKGIpO1xuICAgIH1cblxuICAgIHZhciBhcmVBcnJheXMgPSBjbGFzc05hbWUgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gICAgaWYgKCFhcmVBcnJheXMpIHtcbiAgICAgIGlmICh0eXBlb2YgYSAhPSAnb2JqZWN0JyB8fCB0eXBlb2YgYiAhPSAnb2JqZWN0JykgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAvLyBPYmplY3RzIHdpdGggZGlmZmVyZW50IGNvbnN0cnVjdG9ycyBhcmUgbm90IGVxdWl2YWxlbnQsIGJ1dCBgT2JqZWN0YHMgb3IgYEFycmF5YHNcbiAgICAgIC8vIGZyb20gZGlmZmVyZW50IGZyYW1lcyBhcmUuXG4gICAgICB2YXIgYUN0b3IgPSBhLmNvbnN0cnVjdG9yLCBiQ3RvciA9IGIuY29uc3RydWN0b3I7XG4gICAgICBpZiAoYUN0b3IgIT09IGJDdG9yICYmICEoXy5pc0Z1bmN0aW9uKGFDdG9yKSAmJiBhQ3RvciBpbnN0YW5jZW9mIGFDdG9yICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXy5pc0Z1bmN0aW9uKGJDdG9yKSAmJiBiQ3RvciBpbnN0YW5jZW9mIGJDdG9yKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAmJiAoJ2NvbnN0cnVjdG9yJyBpbiBhICYmICdjb25zdHJ1Y3RvcicgaW4gYikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBBc3N1bWUgZXF1YWxpdHkgZm9yIGN5Y2xpYyBzdHJ1Y3R1cmVzLiBUaGUgYWxnb3JpdGhtIGZvciBkZXRlY3RpbmcgY3ljbGljXG4gICAgLy8gc3RydWN0dXJlcyBpcyBhZGFwdGVkIGZyb20gRVMgNS4xIHNlY3Rpb24gMTUuMTIuMywgYWJzdHJhY3Qgb3BlcmF0aW9uIGBKT2AuXG5cbiAgICAvLyBJbml0aWFsaXppbmcgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHMuXG4gICAgLy8gSXQncyBkb25lIGhlcmUgc2luY2Ugd2Ugb25seSBuZWVkIHRoZW0gZm9yIG9iamVjdHMgYW5kIGFycmF5cyBjb21wYXJpc29uLlxuICAgIGFTdGFjayA9IGFTdGFjayB8fCBbXTtcbiAgICBiU3RhY2sgPSBiU3RhY2sgfHwgW107XG4gICAgdmFyIGxlbmd0aCA9IGFTdGFjay5sZW5ndGg7XG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICAvLyBMaW5lYXIgc2VhcmNoLiBQZXJmb3JtYW5jZSBpcyBpbnZlcnNlbHkgcHJvcG9ydGlvbmFsIHRvIHRoZSBudW1iZXIgb2ZcbiAgICAgIC8vIHVuaXF1ZSBuZXN0ZWQgc3RydWN0dXJlcy5cbiAgICAgIGlmIChhU3RhY2tbbGVuZ3RoXSA9PT0gYSkgcmV0dXJuIGJTdGFja1tsZW5ndGhdID09PSBiO1xuICAgIH1cblxuICAgIC8vIEFkZCB0aGUgZmlyc3Qgb2JqZWN0IHRvIHRoZSBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAgICBhU3RhY2sucHVzaChhKTtcbiAgICBiU3RhY2sucHVzaChiKTtcblxuICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgb2JqZWN0cyBhbmQgYXJyYXlzLlxuICAgIGlmIChhcmVBcnJheXMpIHtcbiAgICAgIC8vIENvbXBhcmUgYXJyYXkgbGVuZ3RocyB0byBkZXRlcm1pbmUgaWYgYSBkZWVwIGNvbXBhcmlzb24gaXMgbmVjZXNzYXJ5LlxuICAgICAgbGVuZ3RoID0gYS5sZW5ndGg7XG4gICAgICBpZiAobGVuZ3RoICE9PSBiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgICAgLy8gRGVlcCBjb21wYXJlIHRoZSBjb250ZW50cywgaWdub3Jpbmcgbm9uLW51bWVyaWMgcHJvcGVydGllcy5cbiAgICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgICBpZiAoIWVxKGFbbGVuZ3RoXSwgYltsZW5ndGhdLCBhU3RhY2ssIGJTdGFjaykpIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRGVlcCBjb21wYXJlIG9iamVjdHMuXG4gICAgICB2YXIga2V5cyA9IF8ua2V5cyhhKSwga2V5O1xuICAgICAgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgICAvLyBFbnN1cmUgdGhhdCBib3RoIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBudW1iZXIgb2YgcHJvcGVydGllcyBiZWZvcmUgY29tcGFyaW5nIGRlZXAgZXF1YWxpdHkuXG4gICAgICBpZiAoXy5rZXlzKGIpLmxlbmd0aCAhPT0gbGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgICAgLy8gRGVlcCBjb21wYXJlIGVhY2ggbWVtYmVyXG4gICAgICAgIGtleSA9IGtleXNbbGVuZ3RoXTtcbiAgICAgICAgaWYgKCEoXy5oYXMoYiwga2V5KSAmJiBlcShhW2tleV0sIGJba2V5XSwgYVN0YWNrLCBiU3RhY2spKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBSZW1vdmUgdGhlIGZpcnN0IG9iamVjdCBmcm9tIHRoZSBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAgICBhU3RhY2sucG9wKCk7XG4gICAgYlN0YWNrLnBvcCgpO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIC8vIFBlcmZvcm0gYSBkZWVwIGNvbXBhcmlzb24gdG8gY2hlY2sgaWYgdHdvIG9iamVjdHMgYXJlIGVxdWFsLlxuICBfLmlzRXF1YWwgPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIGVxKGEsIGIpO1xuICB9O1xuXG4gIC8vIElzIGEgZ2l2ZW4gYXJyYXksIHN0cmluZywgb3Igb2JqZWN0IGVtcHR5P1xuICAvLyBBbiBcImVtcHR5XCIgb2JqZWN0IGhhcyBubyBlbnVtZXJhYmxlIG93bi1wcm9wZXJ0aWVzLlxuICBfLmlzRW1wdHkgPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAob2JqID09IG51bGwpIHJldHVybiB0cnVlO1xuICAgIGlmIChpc0FycmF5TGlrZShvYmopICYmIChfLmlzQXJyYXkob2JqKSB8fCBfLmlzU3RyaW5nKG9iaikgfHwgXy5pc0FyZ3VtZW50cyhvYmopKSkgcmV0dXJuIG9iai5sZW5ndGggPT09IDA7XG4gICAgcmV0dXJuIF8ua2V5cyhvYmopLmxlbmd0aCA9PT0gMDtcbiAgfTtcblxuICAvLyBJcyBhIGdpdmVuIHZhbHVlIGEgRE9NIGVsZW1lbnQ/XG4gIF8uaXNFbGVtZW50ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuICEhKG9iaiAmJiBvYmoubm9kZVR5cGUgPT09IDEpO1xuICB9O1xuXG4gIC8vIElzIGEgZ2l2ZW4gdmFsdWUgYW4gYXJyYXk/XG4gIC8vIERlbGVnYXRlcyB0byBFQ01BNSdzIG5hdGl2ZSBBcnJheS5pc0FycmF5XG4gIF8uaXNBcnJheSA9IG5hdGl2ZUlzQXJyYXkgfHwgZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgfTtcblxuICAvLyBJcyBhIGdpdmVuIHZhcmlhYmxlIGFuIG9iamVjdD9cbiAgXy5pc09iamVjdCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciB0eXBlID0gdHlwZW9mIG9iajtcbiAgICByZXR1cm4gdHlwZSA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlID09PSAnb2JqZWN0JyAmJiAhIW9iajtcbiAgfTtcblxuICAvLyBBZGQgc29tZSBpc1R5cGUgbWV0aG9kczogaXNBcmd1bWVudHMsIGlzRnVuY3Rpb24sIGlzU3RyaW5nLCBpc051bWJlciwgaXNEYXRlLCBpc1JlZ0V4cCwgaXNFcnJvciwgaXNNYXAsIGlzV2Vha01hcCwgaXNTZXQsIGlzV2Vha1NldC5cbiAgXy5lYWNoKFsnQXJndW1lbnRzJywgJ0Z1bmN0aW9uJywgJ1N0cmluZycsICdOdW1iZXInLCAnRGF0ZScsICdSZWdFeHAnLCAnRXJyb3InLCAnU3ltYm9sJywgJ01hcCcsICdXZWFrTWFwJywgJ1NldCcsICdXZWFrU2V0J10sIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBfWydpcycgKyBuYW1lXSA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgJyArIG5hbWUgKyAnXSc7XG4gICAgfTtcbiAgfSk7XG5cbiAgLy8gRGVmaW5lIGEgZmFsbGJhY2sgdmVyc2lvbiBvZiB0aGUgbWV0aG9kIGluIGJyb3dzZXJzIChhaGVtLCBJRSA8IDkpLCB3aGVyZVxuICAvLyB0aGVyZSBpc24ndCBhbnkgaW5zcGVjdGFibGUgXCJBcmd1bWVudHNcIiB0eXBlLlxuICBpZiAoIV8uaXNBcmd1bWVudHMoYXJndW1lbnRzKSkge1xuICAgIF8uaXNBcmd1bWVudHMgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBfLmhhcyhvYmosICdjYWxsZWUnKTtcbiAgICB9O1xuICB9XG5cbiAgLy8gT3B0aW1pemUgYGlzRnVuY3Rpb25gIGlmIGFwcHJvcHJpYXRlLiBXb3JrIGFyb3VuZCBzb21lIHR5cGVvZiBidWdzIGluIG9sZCB2OCxcbiAgLy8gSUUgMTEgKCMxNjIxKSwgU2FmYXJpIDggKCMxOTI5KSwgYW5kIFBoYW50b21KUyAoIzIyMzYpLlxuICB2YXIgbm9kZWxpc3QgPSByb290LmRvY3VtZW50ICYmIHJvb3QuZG9jdW1lbnQuY2hpbGROb2RlcztcbiAgaWYgKHR5cGVvZiAvLi8gIT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgSW50OEFycmF5ICE9ICdvYmplY3QnICYmIHR5cGVvZiBub2RlbGlzdCAhPSAnZnVuY3Rpb24nKSB7XG4gICAgXy5pc0Z1bmN0aW9uID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIG9iaiA9PSAnZnVuY3Rpb24nIHx8IGZhbHNlO1xuICAgIH07XG4gIH1cblxuICAvLyBJcyBhIGdpdmVuIG9iamVjdCBhIGZpbml0ZSBudW1iZXI/XG4gIF8uaXNGaW5pdGUgPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gIV8uaXNTeW1ib2wob2JqKSAmJiBpc0Zpbml0ZShvYmopICYmICFpc05hTihwYXJzZUZsb2F0KG9iaikpO1xuICB9O1xuXG4gIC8vIElzIHRoZSBnaXZlbiB2YWx1ZSBgTmFOYD9cbiAgXy5pc05hTiA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiBfLmlzTnVtYmVyKG9iaikgJiYgaXNOYU4ob2JqKTtcbiAgfTtcblxuICAvLyBJcyBhIGdpdmVuIHZhbHVlIGEgYm9vbGVhbj9cbiAgXy5pc0Jvb2xlYW4gPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gb2JqID09PSB0cnVlIHx8IG9iaiA9PT0gZmFsc2UgfHwgdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBCb29sZWFuXSc7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiB2YWx1ZSBlcXVhbCB0byBudWxsP1xuICBfLmlzTnVsbCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiBvYmogPT09IG51bGw7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiB2YXJpYWJsZSB1bmRlZmluZWQ/XG4gIF8uaXNVbmRlZmluZWQgPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gb2JqID09PSB2b2lkIDA7XG4gIH07XG5cbiAgLy8gU2hvcnRjdXQgZnVuY3Rpb24gZm9yIGNoZWNraW5nIGlmIGFuIG9iamVjdCBoYXMgYSBnaXZlbiBwcm9wZXJ0eSBkaXJlY3RseVxuICAvLyBvbiBpdHNlbGYgKGluIG90aGVyIHdvcmRzLCBub3Qgb24gYSBwcm90b3R5cGUpLlxuICBfLmhhcyA9IGZ1bmN0aW9uKG9iaiwgcGF0aCkge1xuICAgIGlmICghXy5pc0FycmF5KHBhdGgpKSB7XG4gICAgICByZXR1cm4gb2JqICE9IG51bGwgJiYgaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHBhdGgpO1xuICAgIH1cbiAgICB2YXIgbGVuZ3RoID0gcGF0aC5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGtleSA9IHBhdGhbaV07XG4gICAgICBpZiAob2JqID09IG51bGwgfHwgIWhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIG9iaiA9IG9ialtrZXldO1xuICAgIH1cbiAgICByZXR1cm4gISFsZW5ndGg7XG4gIH07XG5cbiAgLy8gVXRpbGl0eSBGdW5jdGlvbnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvLyBSdW4gVW5kZXJzY29yZS5qcyBpbiAqbm9Db25mbGljdCogbW9kZSwgcmV0dXJuaW5nIHRoZSBgX2AgdmFyaWFibGUgdG8gaXRzXG4gIC8vIHByZXZpb3VzIG93bmVyLiBSZXR1cm5zIGEgcmVmZXJlbmNlIHRvIHRoZSBVbmRlcnNjb3JlIG9iamVjdC5cbiAgXy5ub0NvbmZsaWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgcm9vdC5fID0gcHJldmlvdXNVbmRlcnNjb3JlO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8vIEtlZXAgdGhlIGlkZW50aXR5IGZ1bmN0aW9uIGFyb3VuZCBmb3IgZGVmYXVsdCBpdGVyYXRlZXMuXG4gIF8uaWRlbnRpdHkgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcblxuICAvLyBQcmVkaWNhdGUtZ2VuZXJhdGluZyBmdW5jdGlvbnMuIE9mdGVuIHVzZWZ1bCBvdXRzaWRlIG9mIFVuZGVyc2NvcmUuXG4gIF8uY29uc3RhbnQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xuICB9O1xuXG4gIF8ubm9vcCA9IGZ1bmN0aW9uKCl7fTtcblxuICAvLyBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBwYXNzZWQgYW4gb2JqZWN0LCB3aWxsIHRyYXZlcnNlIHRoYXQgb2JqZWN04oCZc1xuICAvLyBwcm9wZXJ0aWVzIGRvd24gdGhlIGdpdmVuIGBwYXRoYCwgc3BlY2lmaWVkIGFzIGFuIGFycmF5IG9mIGtleXMgb3IgaW5kZXhlcy5cbiAgXy5wcm9wZXJ0eSA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgICBpZiAoIV8uaXNBcnJheShwYXRoKSkge1xuICAgICAgcmV0dXJuIHNoYWxsb3dQcm9wZXJ0eShwYXRoKTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIGRlZXBHZXQob2JqLCBwYXRoKTtcbiAgICB9O1xuICB9O1xuXG4gIC8vIEdlbmVyYXRlcyBhIGZ1bmN0aW9uIGZvciBhIGdpdmVuIG9iamVjdCB0aGF0IHJldHVybnMgYSBnaXZlbiBwcm9wZXJ0eS5cbiAgXy5wcm9wZXJ0eU9mID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKG9iaiA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKXt9O1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24ocGF0aCkge1xuICAgICAgcmV0dXJuICFfLmlzQXJyYXkocGF0aCkgPyBvYmpbcGF0aF0gOiBkZWVwR2V0KG9iaiwgcGF0aCk7XG4gICAgfTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgcHJlZGljYXRlIGZvciBjaGVja2luZyB3aGV0aGVyIGFuIG9iamVjdCBoYXMgYSBnaXZlbiBzZXQgb2ZcbiAgLy8gYGtleTp2YWx1ZWAgcGFpcnMuXG4gIF8ubWF0Y2hlciA9IF8ubWF0Y2hlcyA9IGZ1bmN0aW9uKGF0dHJzKSB7XG4gICAgYXR0cnMgPSBfLmV4dGVuZE93bih7fSwgYXR0cnMpO1xuICAgIHJldHVybiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBfLmlzTWF0Y2gob2JqLCBhdHRycyk7XG4gICAgfTtcbiAgfTtcblxuICAvLyBSdW4gYSBmdW5jdGlvbiAqKm4qKiB0aW1lcy5cbiAgXy50aW1lcyA9IGZ1bmN0aW9uKG4sIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgdmFyIGFjY3VtID0gQXJyYXkoTWF0aC5tYXgoMCwgbikpO1xuICAgIGl0ZXJhdGVlID0gb3B0aW1pemVDYihpdGVyYXRlZSwgY29udGV4dCwgMSk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyBpKyspIGFjY3VtW2ldID0gaXRlcmF0ZWUoaSk7XG4gICAgcmV0dXJuIGFjY3VtO1xuICB9O1xuXG4gIC8vIFJldHVybiBhIHJhbmRvbSBpbnRlZ2VyIGJldHdlZW4gbWluIGFuZCBtYXggKGluY2x1c2l2ZSkuXG4gIF8ucmFuZG9tID0gZnVuY3Rpb24obWluLCBtYXgpIHtcbiAgICBpZiAobWF4ID09IG51bGwpIHtcbiAgICAgIG1heCA9IG1pbjtcbiAgICAgIG1pbiA9IDA7XG4gICAgfVxuICAgIHJldHVybiBtaW4gKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpO1xuICB9O1xuXG4gIC8vIEEgKHBvc3NpYmx5IGZhc3Rlcikgd2F5IHRvIGdldCB0aGUgY3VycmVudCB0aW1lc3RhbXAgYXMgYW4gaW50ZWdlci5cbiAgXy5ub3cgPSBEYXRlLm5vdyB8fCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIH07XG5cbiAgLy8gTGlzdCBvZiBIVE1MIGVudGl0aWVzIGZvciBlc2NhcGluZy5cbiAgdmFyIGVzY2FwZU1hcCA9IHtcbiAgICAnJic6ICcmYW1wOycsXG4gICAgJzwnOiAnJmx0OycsXG4gICAgJz4nOiAnJmd0OycsXG4gICAgJ1wiJzogJyZxdW90OycsXG4gICAgXCInXCI6ICcmI3gyNzsnLFxuICAgICdgJzogJyYjeDYwOydcbiAgfTtcbiAgdmFyIHVuZXNjYXBlTWFwID0gXy5pbnZlcnQoZXNjYXBlTWFwKTtcblxuICAvLyBGdW5jdGlvbnMgZm9yIGVzY2FwaW5nIGFuZCB1bmVzY2FwaW5nIHN0cmluZ3MgdG8vZnJvbSBIVE1MIGludGVycG9sYXRpb24uXG4gIHZhciBjcmVhdGVFc2NhcGVyID0gZnVuY3Rpb24obWFwKSB7XG4gICAgdmFyIGVzY2FwZXIgPSBmdW5jdGlvbihtYXRjaCkge1xuICAgICAgcmV0dXJuIG1hcFttYXRjaF07XG4gICAgfTtcbiAgICAvLyBSZWdleGVzIGZvciBpZGVudGlmeWluZyBhIGtleSB0aGF0IG5lZWRzIHRvIGJlIGVzY2FwZWQuXG4gICAgdmFyIHNvdXJjZSA9ICcoPzonICsgXy5rZXlzKG1hcCkuam9pbignfCcpICsgJyknO1xuICAgIHZhciB0ZXN0UmVnZXhwID0gUmVnRXhwKHNvdXJjZSk7XG4gICAgdmFyIHJlcGxhY2VSZWdleHAgPSBSZWdFeHAoc291cmNlLCAnZycpO1xuICAgIHJldHVybiBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICAgIHN0cmluZyA9IHN0cmluZyA9PSBudWxsID8gJycgOiAnJyArIHN0cmluZztcbiAgICAgIHJldHVybiB0ZXN0UmVnZXhwLnRlc3Qoc3RyaW5nKSA/IHN0cmluZy5yZXBsYWNlKHJlcGxhY2VSZWdleHAsIGVzY2FwZXIpIDogc3RyaW5nO1xuICAgIH07XG4gIH07XG4gIF8uZXNjYXBlID0gY3JlYXRlRXNjYXBlcihlc2NhcGVNYXApO1xuICBfLnVuZXNjYXBlID0gY3JlYXRlRXNjYXBlcih1bmVzY2FwZU1hcCk7XG5cbiAgLy8gVHJhdmVyc2VzIHRoZSBjaGlsZHJlbiBvZiBgb2JqYCBhbG9uZyBgcGF0aGAuIElmIGEgY2hpbGQgaXMgYSBmdW5jdGlvbiwgaXRcbiAgLy8gaXMgaW52b2tlZCB3aXRoIGl0cyBwYXJlbnQgYXMgY29udGV4dC4gUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhlIGZpbmFsXG4gIC8vIGNoaWxkLCBvciBgZmFsbGJhY2tgIGlmIGFueSBjaGlsZCBpcyB1bmRlZmluZWQuXG4gIF8ucmVzdWx0ID0gZnVuY3Rpb24ob2JqLCBwYXRoLCBmYWxsYmFjaykge1xuICAgIGlmICghXy5pc0FycmF5KHBhdGgpKSBwYXRoID0gW3BhdGhdO1xuICAgIHZhciBsZW5ndGggPSBwYXRoLmxlbmd0aDtcbiAgICBpZiAoIWxlbmd0aCkge1xuICAgICAgcmV0dXJuIF8uaXNGdW5jdGlvbihmYWxsYmFjaykgPyBmYWxsYmFjay5jYWxsKG9iaikgOiBmYWxsYmFjaztcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHByb3AgPSBvYmogPT0gbnVsbCA/IHZvaWQgMCA6IG9ialtwYXRoW2ldXTtcbiAgICAgIGlmIChwcm9wID09PSB2b2lkIDApIHtcbiAgICAgICAgcHJvcCA9IGZhbGxiYWNrO1xuICAgICAgICBpID0gbGVuZ3RoOyAvLyBFbnN1cmUgd2UgZG9uJ3QgY29udGludWUgaXRlcmF0aW5nLlxuICAgICAgfVxuICAgICAgb2JqID0gXy5pc0Z1bmN0aW9uKHByb3ApID8gcHJvcC5jYWxsKG9iaikgOiBwcm9wO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9O1xuXG4gIC8vIEdlbmVyYXRlIGEgdW5pcXVlIGludGVnZXIgaWQgKHVuaXF1ZSB3aXRoaW4gdGhlIGVudGlyZSBjbGllbnQgc2Vzc2lvbikuXG4gIC8vIFVzZWZ1bCBmb3IgdGVtcG9yYXJ5IERPTSBpZHMuXG4gIHZhciBpZENvdW50ZXIgPSAwO1xuICBfLnVuaXF1ZUlkID0gZnVuY3Rpb24ocHJlZml4KSB7XG4gICAgdmFyIGlkID0gKytpZENvdW50ZXIgKyAnJztcbiAgICByZXR1cm4gcHJlZml4ID8gcHJlZml4ICsgaWQgOiBpZDtcbiAgfTtcblxuICAvLyBCeSBkZWZhdWx0LCBVbmRlcnNjb3JlIHVzZXMgRVJCLXN0eWxlIHRlbXBsYXRlIGRlbGltaXRlcnMsIGNoYW5nZSB0aGVcbiAgLy8gZm9sbG93aW5nIHRlbXBsYXRlIHNldHRpbmdzIHRvIHVzZSBhbHRlcm5hdGl2ZSBkZWxpbWl0ZXJzLlxuICBfLnRlbXBsYXRlU2V0dGluZ3MgPSB7XG4gICAgZXZhbHVhdGU6IC88JShbXFxzXFxTXSs/KSU+L2csXG4gICAgaW50ZXJwb2xhdGU6IC88JT0oW1xcc1xcU10rPyklPi9nLFxuICAgIGVzY2FwZTogLzwlLShbXFxzXFxTXSs/KSU+L2dcbiAgfTtcblxuICAvLyBXaGVuIGN1c3RvbWl6aW5nIGB0ZW1wbGF0ZVNldHRpbmdzYCwgaWYgeW91IGRvbid0IHdhbnQgdG8gZGVmaW5lIGFuXG4gIC8vIGludGVycG9sYXRpb24sIGV2YWx1YXRpb24gb3IgZXNjYXBpbmcgcmVnZXgsIHdlIG5lZWQgb25lIHRoYXQgaXNcbiAgLy8gZ3VhcmFudGVlZCBub3QgdG8gbWF0Y2guXG4gIHZhciBub01hdGNoID0gLyguKV4vO1xuXG4gIC8vIENlcnRhaW4gY2hhcmFjdGVycyBuZWVkIHRvIGJlIGVzY2FwZWQgc28gdGhhdCB0aGV5IGNhbiBiZSBwdXQgaW50byBhXG4gIC8vIHN0cmluZyBsaXRlcmFsLlxuICB2YXIgZXNjYXBlcyA9IHtcbiAgICBcIidcIjogXCInXCIsXG4gICAgJ1xcXFwnOiAnXFxcXCcsXG4gICAgJ1xccic6ICdyJyxcbiAgICAnXFxuJzogJ24nLFxuICAgICdcXHUyMDI4JzogJ3UyMDI4JyxcbiAgICAnXFx1MjAyOSc6ICd1MjAyOSdcbiAgfTtcblxuICB2YXIgZXNjYXBlUmVnRXhwID0gL1xcXFx8J3xcXHJ8XFxufFxcdTIwMjh8XFx1MjAyOS9nO1xuXG4gIHZhciBlc2NhcGVDaGFyID0gZnVuY3Rpb24obWF0Y2gpIHtcbiAgICByZXR1cm4gJ1xcXFwnICsgZXNjYXBlc1ttYXRjaF07XG4gIH07XG5cbiAgLy8gSmF2YVNjcmlwdCBtaWNyby10ZW1wbGF0aW5nLCBzaW1pbGFyIHRvIEpvaG4gUmVzaWcncyBpbXBsZW1lbnRhdGlvbi5cbiAgLy8gVW5kZXJzY29yZSB0ZW1wbGF0aW5nIGhhbmRsZXMgYXJiaXRyYXJ5IGRlbGltaXRlcnMsIHByZXNlcnZlcyB3aGl0ZXNwYWNlLFxuICAvLyBhbmQgY29ycmVjdGx5IGVzY2FwZXMgcXVvdGVzIHdpdGhpbiBpbnRlcnBvbGF0ZWQgY29kZS5cbiAgLy8gTkI6IGBvbGRTZXR0aW5nc2Agb25seSBleGlzdHMgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LlxuICBfLnRlbXBsYXRlID0gZnVuY3Rpb24odGV4dCwgc2V0dGluZ3MsIG9sZFNldHRpbmdzKSB7XG4gICAgaWYgKCFzZXR0aW5ncyAmJiBvbGRTZXR0aW5ncykgc2V0dGluZ3MgPSBvbGRTZXR0aW5ncztcbiAgICBzZXR0aW5ncyA9IF8uZGVmYXVsdHMoe30sIHNldHRpbmdzLCBfLnRlbXBsYXRlU2V0dGluZ3MpO1xuXG4gICAgLy8gQ29tYmluZSBkZWxpbWl0ZXJzIGludG8gb25lIHJlZ3VsYXIgZXhwcmVzc2lvbiB2aWEgYWx0ZXJuYXRpb24uXG4gICAgdmFyIG1hdGNoZXIgPSBSZWdFeHAoW1xuICAgICAgKHNldHRpbmdzLmVzY2FwZSB8fCBub01hdGNoKS5zb3VyY2UsXG4gICAgICAoc2V0dGluZ3MuaW50ZXJwb2xhdGUgfHwgbm9NYXRjaCkuc291cmNlLFxuICAgICAgKHNldHRpbmdzLmV2YWx1YXRlIHx8IG5vTWF0Y2gpLnNvdXJjZVxuICAgIF0uam9pbignfCcpICsgJ3wkJywgJ2cnKTtcblxuICAgIC8vIENvbXBpbGUgdGhlIHRlbXBsYXRlIHNvdXJjZSwgZXNjYXBpbmcgc3RyaW5nIGxpdGVyYWxzIGFwcHJvcHJpYXRlbHkuXG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICB2YXIgc291cmNlID0gXCJfX3ArPSdcIjtcbiAgICB0ZXh0LnJlcGxhY2UobWF0Y2hlciwgZnVuY3Rpb24obWF0Y2gsIGVzY2FwZSwgaW50ZXJwb2xhdGUsIGV2YWx1YXRlLCBvZmZzZXQpIHtcbiAgICAgIHNvdXJjZSArPSB0ZXh0LnNsaWNlKGluZGV4LCBvZmZzZXQpLnJlcGxhY2UoZXNjYXBlUmVnRXhwLCBlc2NhcGVDaGFyKTtcbiAgICAgIGluZGV4ID0gb2Zmc2V0ICsgbWF0Y2gubGVuZ3RoO1xuXG4gICAgICBpZiAoZXNjYXBlKSB7XG4gICAgICAgIHNvdXJjZSArPSBcIicrXFxuKChfX3Q9KFwiICsgZXNjYXBlICsgXCIpKT09bnVsbD8nJzpfLmVzY2FwZShfX3QpKStcXG4nXCI7XG4gICAgICB9IGVsc2UgaWYgKGludGVycG9sYXRlKSB7XG4gICAgICAgIHNvdXJjZSArPSBcIicrXFxuKChfX3Q9KFwiICsgaW50ZXJwb2xhdGUgKyBcIikpPT1udWxsPycnOl9fdCkrXFxuJ1wiO1xuICAgICAgfSBlbHNlIGlmIChldmFsdWF0ZSkge1xuICAgICAgICBzb3VyY2UgKz0gXCInO1xcblwiICsgZXZhbHVhdGUgKyBcIlxcbl9fcCs9J1wiO1xuICAgICAgfVxuXG4gICAgICAvLyBBZG9iZSBWTXMgbmVlZCB0aGUgbWF0Y2ggcmV0dXJuZWQgdG8gcHJvZHVjZSB0aGUgY29ycmVjdCBvZmZzZXQuXG4gICAgICByZXR1cm4gbWF0Y2g7XG4gICAgfSk7XG4gICAgc291cmNlICs9IFwiJztcXG5cIjtcblxuICAgIC8vIElmIGEgdmFyaWFibGUgaXMgbm90IHNwZWNpZmllZCwgcGxhY2UgZGF0YSB2YWx1ZXMgaW4gbG9jYWwgc2NvcGUuXG4gICAgaWYgKCFzZXR0aW5ncy52YXJpYWJsZSkgc291cmNlID0gJ3dpdGgob2JqfHx7fSl7XFxuJyArIHNvdXJjZSArICd9XFxuJztcblxuICAgIHNvdXJjZSA9IFwidmFyIF9fdCxfX3A9JycsX19qPUFycmF5LnByb3RvdHlwZS5qb2luLFwiICtcbiAgICAgIFwicHJpbnQ9ZnVuY3Rpb24oKXtfX3ArPV9fai5jYWxsKGFyZ3VtZW50cywnJyk7fTtcXG5cIiArXG4gICAgICBzb3VyY2UgKyAncmV0dXJuIF9fcDtcXG4nO1xuXG4gICAgdmFyIHJlbmRlcjtcbiAgICB0cnkge1xuICAgICAgcmVuZGVyID0gbmV3IEZ1bmN0aW9uKHNldHRpbmdzLnZhcmlhYmxlIHx8ICdvYmonLCAnXycsIHNvdXJjZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZS5zb3VyY2UgPSBzb3VyY2U7XG4gICAgICB0aHJvdyBlO1xuICAgIH1cblxuICAgIHZhciB0ZW1wbGF0ZSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHJldHVybiByZW5kZXIuY2FsbCh0aGlzLCBkYXRhLCBfKTtcbiAgICB9O1xuXG4gICAgLy8gUHJvdmlkZSB0aGUgY29tcGlsZWQgc291cmNlIGFzIGEgY29udmVuaWVuY2UgZm9yIHByZWNvbXBpbGF0aW9uLlxuICAgIHZhciBhcmd1bWVudCA9IHNldHRpbmdzLnZhcmlhYmxlIHx8ICdvYmonO1xuICAgIHRlbXBsYXRlLnNvdXJjZSA9ICdmdW5jdGlvbignICsgYXJndW1lbnQgKyAnKXtcXG4nICsgc291cmNlICsgJ30nO1xuXG4gICAgcmV0dXJuIHRlbXBsYXRlO1xuICB9O1xuXG4gIC8vIEFkZCBhIFwiY2hhaW5cIiBmdW5jdGlvbi4gU3RhcnQgY2hhaW5pbmcgYSB3cmFwcGVkIFVuZGVyc2NvcmUgb2JqZWN0LlxuICBfLmNoYWluID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIGluc3RhbmNlID0gXyhvYmopO1xuICAgIGluc3RhbmNlLl9jaGFpbiA9IHRydWU7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9O1xuXG4gIC8vIE9PUFxuICAvLyAtLS0tLS0tLS0tLS0tLS1cbiAgLy8gSWYgVW5kZXJzY29yZSBpcyBjYWxsZWQgYXMgYSBmdW5jdGlvbiwgaXQgcmV0dXJucyBhIHdyYXBwZWQgb2JqZWN0IHRoYXRcbiAgLy8gY2FuIGJlIHVzZWQgT08tc3R5bGUuIFRoaXMgd3JhcHBlciBob2xkcyBhbHRlcmVkIHZlcnNpb25zIG9mIGFsbCB0aGVcbiAgLy8gdW5kZXJzY29yZSBmdW5jdGlvbnMuIFdyYXBwZWQgb2JqZWN0cyBtYXkgYmUgY2hhaW5lZC5cblxuICAvLyBIZWxwZXIgZnVuY3Rpb24gdG8gY29udGludWUgY2hhaW5pbmcgaW50ZXJtZWRpYXRlIHJlc3VsdHMuXG4gIHZhciBjaGFpblJlc3VsdCA9IGZ1bmN0aW9uKGluc3RhbmNlLCBvYmopIHtcbiAgICByZXR1cm4gaW5zdGFuY2UuX2NoYWluID8gXyhvYmopLmNoYWluKCkgOiBvYmo7XG4gIH07XG5cbiAgLy8gQWRkIHlvdXIgb3duIGN1c3RvbSBmdW5jdGlvbnMgdG8gdGhlIFVuZGVyc2NvcmUgb2JqZWN0LlxuICBfLm1peGluID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgXy5lYWNoKF8uZnVuY3Rpb25zKG9iaiksIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHZhciBmdW5jID0gX1tuYW1lXSA9IG9ialtuYW1lXTtcbiAgICAgIF8ucHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhcmdzID0gW3RoaXMuX3dyYXBwZWRdO1xuICAgICAgICBwdXNoLmFwcGx5KGFyZ3MsIGFyZ3VtZW50cyk7XG4gICAgICAgIHJldHVybiBjaGFpblJlc3VsdCh0aGlzLCBmdW5jLmFwcGx5KF8sIGFyZ3MpKTtcbiAgICAgIH07XG4gICAgfSk7XG4gICAgcmV0dXJuIF87XG4gIH07XG5cbiAgLy8gQWRkIGFsbCBvZiB0aGUgVW5kZXJzY29yZSBmdW5jdGlvbnMgdG8gdGhlIHdyYXBwZXIgb2JqZWN0LlxuICBfLm1peGluKF8pO1xuXG4gIC8vIEFkZCBhbGwgbXV0YXRvciBBcnJheSBmdW5jdGlvbnMgdG8gdGhlIHdyYXBwZXIuXG4gIF8uZWFjaChbJ3BvcCcsICdwdXNoJywgJ3JldmVyc2UnLCAnc2hpZnQnLCAnc29ydCcsICdzcGxpY2UnLCAndW5zaGlmdCddLCBmdW5jdGlvbihuYW1lKSB7XG4gICAgdmFyIG1ldGhvZCA9IEFycmF5UHJvdG9bbmFtZV07XG4gICAgXy5wcm90b3R5cGVbbmFtZV0gPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBvYmogPSB0aGlzLl93cmFwcGVkO1xuICAgICAgbWV0aG9kLmFwcGx5KG9iaiwgYXJndW1lbnRzKTtcbiAgICAgIGlmICgobmFtZSA9PT0gJ3NoaWZ0JyB8fCBuYW1lID09PSAnc3BsaWNlJykgJiYgb2JqLmxlbmd0aCA9PT0gMCkgZGVsZXRlIG9ialswXTtcbiAgICAgIHJldHVybiBjaGFpblJlc3VsdCh0aGlzLCBvYmopO1xuICAgIH07XG4gIH0pO1xuXG4gIC8vIEFkZCBhbGwgYWNjZXNzb3IgQXJyYXkgZnVuY3Rpb25zIHRvIHRoZSB3cmFwcGVyLlxuICBfLmVhY2goWydjb25jYXQnLCAnam9pbicsICdzbGljZSddLCBmdW5jdGlvbihuYW1lKSB7XG4gICAgdmFyIG1ldGhvZCA9IEFycmF5UHJvdG9bbmFtZV07XG4gICAgXy5wcm90b3R5cGVbbmFtZV0gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBjaGFpblJlc3VsdCh0aGlzLCBtZXRob2QuYXBwbHkodGhpcy5fd3JhcHBlZCwgYXJndW1lbnRzKSk7XG4gICAgfTtcbiAgfSk7XG5cbiAgLy8gRXh0cmFjdHMgdGhlIHJlc3VsdCBmcm9tIGEgd3JhcHBlZCBhbmQgY2hhaW5lZCBvYmplY3QuXG4gIF8ucHJvdG90eXBlLnZhbHVlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3dyYXBwZWQ7XG4gIH07XG5cbiAgLy8gUHJvdmlkZSB1bndyYXBwaW5nIHByb3h5IGZvciBzb21lIG1ldGhvZHMgdXNlZCBpbiBlbmdpbmUgb3BlcmF0aW9uc1xuICAvLyBzdWNoIGFzIGFyaXRobWV0aWMgYW5kIEpTT04gc3RyaW5naWZpY2F0aW9uLlxuICBfLnByb3RvdHlwZS52YWx1ZU9mID0gXy5wcm90b3R5cGUudG9KU09OID0gXy5wcm90b3R5cGUudmFsdWU7XG5cbiAgXy5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gU3RyaW5nKHRoaXMuX3dyYXBwZWQpO1xuICB9O1xuXG4gIGV4cG9ydCBkZWZhdWx0IF87XG4gICIsImltcG9ydCB7ZXh0cmFjdEV4dGVuc2lvbn0gZnJvbSBcInV0aWxzL3N0cmluZ3NcIjtcblxuZXhwb3J0IGNvbnN0IGlzUnRtcCA9IGZ1bmN0aW9uIChmaWxlLCB0eXBlKSB7XG4gICAgcmV0dXJuIChmaWxlLmluZGV4T2YoJ3J0bXA6JykgPT0gMCB8fCB0eXBlID09ICdydG1wJyk7XG59O1xuZXhwb3J0IGNvbnN0IGlzV2ViUlRDID0gZnVuY3Rpb24gKGZpbGUsIHR5cGUpIHtcbiAgICByZXR1cm4gKGZpbGUuaW5kZXhPZignd3M6JykgPT09IDAgfHwgZmlsZS5pbmRleE9mKCd3c3M6JykgPT09IDAgfHwgdHlwZSA9PT0gJ3dlYnJ0YycpO1xufTtcbmV4cG9ydCBjb25zdCBpc0Rhc2ggPSBmdW5jdGlvbiAoZmlsZSwgdHlwZSkge1xuICAgIHJldHVybiAoIHR5cGUgPT09ICdtcGQnIHx8ICB0eXBlID09PSAnZGFzaCcgfHwgdHlwZSA9PT0gJ2FwcGxpY2F0aW9uL2Rhc2greG1sJyB8fCBleHRyYWN0RXh0ZW5zaW9uKGZpbGUpID09ICdtcGQnKTtcbn07IiwiLyoqXG4gKiB1dGlscyBmb3Igd2VicGFja1xuICovXG5cbmV4cG9ydCBjb25zdCBnZXRTY3JpcHRQYXRoID0gZnVuY3Rpb24oc2NyaXB0TmFtZSkge1xuICAgIGNvbnN0IHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0Jyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY3JpcHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHNyYyA9IHNjcmlwdHNbaV0uc3JjO1xuICAgICAgICBpZiAoc3JjKSB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHNyYy5sYXN0SW5kZXhPZignLycgKyBzY3JpcHROYW1lKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNyYy5zdWJzdHIoMCwgaW5kZXggKyAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gJyc7XG59O1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gMjkuLlxuICovXG5leHBvcnQgY29uc3QgdmVyc2lvbiA9IF9fVkVSU0lPTl9fO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==