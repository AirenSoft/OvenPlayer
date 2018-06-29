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

var _events = __webpack_require__(/*! utils/events */ "./src/js/utils/events.js");

var _events2 = _interopRequireDefault(_events);

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
    var that = {
        on: _events2.default.on,
        once: _events2.default.once,
        off: _events2.default.off,
        trigger: _events2.default.trigger
    };

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

/***/ "./src/js/utils/events.js":
/*!********************************!*\
  !*** ./src/js/utils/events.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var slice = [].slice;
var eventsApi = function eventsApi(obj, action, name, rest) {
    var eventSplitter = /\s+/;
    if (!name) {
        return true;
    }
    // Handle event maps.
    //
    if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') {
        for (var key in name) {
            if (Object.prototype.hasOwnProperty.call(name, key)) {
                obj[action].apply(obj, [key, name[key]].concat(rest));
            }
        }
        return false;
    }
    if (eventSplitter.test(name)) {
        var names = name.split(eventSplitter);
        for (var i = 0, l = names.length; i < l; i++) {
            obj[action].apply(obj, [names[i]].concat(rest));
        }
        return false;
    }
    return true;
};
var triggerEvents = function triggerEvents(events, args, context, catchExceptionsForName) {
    var i = -1;
    var l = events.length;
    while (++i < l) {
        var ev = events[i];
        if (catchExceptionsForName) {
            try {
                ev.callback.apply(ev.context || context, args);
            } catch (e) {
                OvenPlayerConsole.log('Error in "' + catchExceptionsForName + '" event handler:', e);
            }
        } else {
            ev.callback.apply(ev.context || context, args);
        }
    }
};

var on = exports.on = function on(name, callback, context) {
    if (!eventsApi(this, 'on', name, [callback, context]) || !callback) {
        return this;
    }
    var _events = this._events || (this._events = {});
    var events = _events[name] || (_events[name] = []);
    events.push({ callback: callback, context: context });
    return this;
};

var once = exports.once = function once(name, callback, context) {
    if (!eventsApi(this, 'once', name, [callback, context]) || !callback) {
        return this;
    }
    var count = 0;
    var self = this;
    var onceCallback = function onceCallback() {
        if (count++) {
            return;
        }
        self.off(name, onceCallback);
        callback.apply(this, arguments);
    };
    onceCallback._callback = callback;
    return this.on(name, onceCallback, context);
};

var off = exports.off = function off(name, callback, context) {
    if (!this._events || !eventsApi(this, 'off', name, [callback, context])) {
        return this;
    }
    if (!name && !callback && !context) {
        delete this._events;
        return this;
    }
    var names = name ? [name] : Object.keys(this._events);
    for (var i = 0, l = names.length; i < l; i++) {
        name = names[i];
        var events = this._events[name];
        if (events) {
            var retain = this._events[name] = [];
            if (callback || context) {
                for (var j = 0, k = events.length; j < k; j++) {
                    var ev = events[j];
                    if (callback && callback !== ev.callback && callback !== ev.callback._callback || context && context !== ev.context) {
                        retain.push(ev);
                    }
                }
            }
            if (!retain.length) {
                delete this._events[name];
            }
        }
    }
    return this;
};

var trigger = exports.trigger = function trigger(name) {

    if (!this._events) {
        return this;
    }
    var args = slice.call(arguments, 1);
    if (!eventsApi(this, 'trigger', name, args)) {
        return this;
    }
    var events = this._events[name];
    var allEvents = this._events.all;
    if (events) {
        triggerEvents(events, args, this);
    }
    if (allEvents) {
        triggerEvents(allEvents, arguments, this);
    }
    return this;
};

exports.default = {
    on: on,
    once: once,
    off: off,
    trigger: trigger
};

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
exports.hms = hms;
exports.seconds = seconds;
exports.offsetToSeconds = offsetToSeconds;

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
 * Time Formatter
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
function hms(secondsNumber) {
    function pad(str, length, padd) {
        str = '' + str;
        padd = padd || '0';
        while (str.length < length) {
            str = padd + str;
        }
        return str;
    }
    var h = parseInt(secondsNumber / 3600);
    var m = parseInt(secondsNumber / 60) % 60;
    var s = secondsNumber % 60;
    return pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s.toFixed(3), 6);
}
function seconds(str, frameRate) {
    if (!str) {
        return 0;
    }
    if (_underscore2.default.isNumber(str) && !_underscore2.default.isNaN(str)) {
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
    if (_underscore2.default.isNaN(sec)) {
        return 0;
    }
    return sec;
}

function offsetToSeconds(offset, duration, frameRate) {
    if (_underscore2.default.isString(offset) && offset.slice(-1) === '%') {
        var percent = parseFloat(offset);
        if (!duration || isNaN(duration) || isNaN(percent)) {
            return null;
        }
        return duration * percent / 100;
    }
    return seconds(offset, frameRate);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvQXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvQ29uZmlndXJhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvTGF6eUNvbW1hbmRFeGVjdXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL1N1cHBvcnRDaGVja2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvY29uc3RhbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvbWVkaWEvTWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3BsYXlsaXN0L01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9Db250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvc2hpbXMvcHJvbWlzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvb3ZlbnBsYXllci5zZGsuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvbG9nZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9zdHJpbmdzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy91bmRlcnNjb3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy92YWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3dlYnBhY2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZlcnNpb24uanMiXSwibmFtZXMiOlsiQXBpIiwiY29udGFpbmVyIiwibG9nTWFuYWdlciIsInRoYXQiLCJvbiIsIkV2ZW50cyIsIm9uY2UiLCJvZmYiLCJ0cmlnZ2VyIiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJ2ZXJzaW9uIiwibWVkaWFNYW5hZ2VyIiwicGxheWxpc3RNYW5hZ2VyIiwicHJvdmlkZXJDb250cm9sbGVyIiwiY3VycmVudFByb3ZpZGVyIiwicGxheWVyQ29uZmlnIiwibGF6eVF1ZXVlIiwiaW5pdFByb3ZpZGVyIiwibGFzdFBsYXlQb3NpdGlvbiIsInBpY2tRdWFsaXR5RnJvbVNvdXJjZSIsInNvdXJjZXMiLCJxdWFsaXR5IiwiaSIsImxlbmd0aCIsImRlZmF1bHQiLCJnZXRRdWFsaXR5TGFiZWwiLCJsYWJlbCIsImxvYWRQcm92aWRlcnMiLCJnZXRQbGF5bGlzdCIsInRoZW4iLCJkZXN0cm95IiwidmlkZW9FbGVtZW50IiwiY3JlYXRlRWxlbWVudCIsImN1cnJlbnRTb3VyY2VJbmRleCIsImdldEN1cnJlbnRTb3VyY2VzIiwiUHJvdmlkZXJzIiwibmFtZSIsImRhdGEiLCJwcmVsb2FkIiwiZmx1c2giLCJSRUFEWSIsImNhdGNoIiwiZXJyb3IiLCJlcnJvck9iamVjdCIsImNvZGUiLCJJTklUX0VSUk9SIiwicmVhc29uIiwibWVzc2FnZSIsIkVSUk9SIiwicmVtb3ZlQW5kRXhjdXRlT25jZSIsImluaXQiLCJvcHRpb25zIiwiaXNEZWJ1ZyIsImRpc2FibGUiLCJzZXRQbGF5bGlzdCIsImdldENvbmZpZyIsImdldER1cmF0aW9uIiwiZ2V0UG9zaXRpb24iLCJnZXRWb2x1bWUiLCJzZXRWb2x1bWUiLCJ2b2x1bWUiLCJzZXRNdXRlIiwic3RhdGUiLCJnZXRNdXRlIiwibG9hZCIsInBsYXlsaXN0Iiwic2V0Q3VycmVudFF1YWxpdHkiLCJwbGF5IiwicGF1c2UiLCJzZWVrIiwicG9zaXRpb24iLCJzZXRQbGF5YmFja1JhdGUiLCJwbGF5YmFja1JhdGUiLCJzZXREZWZhdWx0UGxheWJhY2tSYXRlIiwiZ2V0UGxheWJhY2tSYXRlIiwiZ2V0UXVhbGl0eUxldmVscyIsImdldEN1cnJlbnRRdWFsaXR5IiwicXVhbGl0eUluZGV4IiwiY3VycmVudFNvdXJjZSIsIm5ld1NvdXJjZSIsImlzU2FtZVByb3ZpZGVyIiwicmVzUXVhbGl0eUluZGV4IiwiZ2V0QnVmZmVyIiwiZ2V0U3RhdGUiLCJzdG9wIiwicmVtb3ZlIiwiREVTVFJPWSIsIkNvbmZpZ3VyYXRvciIsImNvbXBvc2VTb3VyY2VPcHRpb25zIiwiRGVmYXVsdHMiLCJkZWZhdWx0UGxheWJhY2tSYXRlIiwicGxheWJhY2tSYXRlQ29udHJvbHMiLCJwbGF5YmFja1JhdGVzIiwibXV0ZSIsIndpZHRoIiwiaGVpZ2h0Iiwic2VyaWFsaXplIiwidmFsIiwidW5kZWZpbmVkIiwibG93ZXJjYXNlVmFsIiwidG9Mb3dlckNhc2UiLCJpc05hTiIsIk51bWJlciIsInBhcnNlRmxvYXQiLCJkZXNlcmlhbGl6ZSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5Iiwibm9ybWFsaXplU2l6ZSIsInNsaWNlIiwiZXZhbHVhdGVBc3BlY3RSYXRpbyIsImFyIiwidG9TdHJpbmciLCJpbmRleE9mIiwidGVzdCIsImluZGV4IiwidyIsInN1YnN0ciIsImgiLCJjb25maWciLCJhc3BlY3RyYXRpbyIsInJhdGVDb250cm9scyIsInJhdGVzIiwiQXJyYXkiLCJpc0FycmF5IiwiZmlsdGVyIiwiXyIsImlzTnVtYmVyIiwicmF0ZSIsIm1hcCIsIk1hdGgiLCJyb3VuZCIsInB1c2giLCJzb3J0IiwiY29uZmlnUGxheWxpc3QiLCJvYmoiLCJwaWNrIiwiZmVlZERhdGEiLCJkdXJhdGlvbiIsImRlYnVnIiwiaW1hZ2UiLCJxdWFsaXR5TGFiZWwiLCJyZXBlYXQiLCJzdHJldGNoaW5nIiwiZ2V0QXNwZWN0cmF0aW8iLCJzZXRBc3BlY3RyYXRpbyIsImFzcGVjdHJhdGlvXyIsImdldERlZmF1bHRQbGF5YmFja1JhdGUiLCJzZXRRdWFsaXR5TGFiZWwiLCJuZXdMYWJlbCIsImdldFBsYXliYWNrUmF0ZXMiLCJpc1BsYXliYWNrUmF0ZUNvbnRyb2xzIiwicGxheWxpc3RfIiwiaXNSZXBlYXQiLCJnZXRTdHJldGNoaW5nIiwiTGF6eUNvbW1hbmRFeGVjdXRvciIsImluc3RhbmNlIiwicXVldWVkQ29tbWFuZHMiLCJjb21tYW5kUXVldWUiLCJ1bmRlY29yYXRlZE1ldGhvZHMiLCJleGVjdXRlTW9kZSIsImNvbW1hbmQiLCJtZXRob2QiLCJhcmdzIiwicHJvdG90eXBlIiwiY2FsbCIsImFyZ3VtZW50cyIsImFkZFF1ZXVlIiwiZXhlY3V0ZVF1ZXVlZENvbW1hbmRzIiwiYXBwbHkiLCJzaGlmdCIsInNldEV4ZWN1dGVNb2RlIiwibW9kZSIsImdldFVuZGVjb3JhdGVkTWV0aG9kcyIsImdldFF1ZXVlIiwiZW1wdHkiLCJjb21tYW5kXyIsImNvbW1hbmRRdWV1ZUl0ZW0iLCJmaW5kV2hlcmUiLCJzcGxpY2UiLCJmaW5kSW5kZXgiLCJTdXBwb3J0Q2hlY2tlciIsInN1cHBvcnRMaXN0IiwiY2hlY2tTdXBwb3J0Iiwic291cmNlIiwiTWltZVR5cGVzIiwiYWFjIiwibXA0IiwiZjR2IiwibTR2IiwibW92IiwibXAzIiwibXBlZyIsIm9ndiIsIm9nZyIsIm9nYSIsInZvcmJpcyIsIndlYm0iLCJmNGEiLCJtM3U4IiwibTN1IiwiaGxzIiwidmlkZW8iLCJkb2N1bWVudCIsImNhblBsYXlUeXBlIiwiZmlsZSIsInR5cGUiLCJtaW1lVHlwZSIsImlzSGxzU3VwcG9ydCIsImdldE1lZGlhU291cmNlIiwid2luZG93IiwiTWVkaWFTb3VyY2UiLCJXZWJLaXRNZWRpYVNvdXJjZSIsIm1lZGlhU291cmNlIiwic291cmNlQnVmZmVyIiwiU291cmNlQnVmZmVyIiwiV2ViS2l0U291cmNlQnVmZmVyIiwiaXNUeXBlU3VwcG9ydGVkIiwic291cmNlQnVmZmVyVmFsaWRBUEkiLCJhcHBlbmRCdWZmZXIiLCJmaW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UiLCJzb3J1Y2VfIiwiZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0Iiwic3VwcG9ydE5hbWVzIiwiaXRlbSIsImoiLCJzdXBwb3J0ZWQiLCJTVEFURV9CVUZGRVJJTkciLCJTVEFURV9JRExFIiwiU1RBVEVfQ09NUExFVEUiLCJTVEFURV9QQVVTRUQiLCJTVEFURV9QTEFZSU5HIiwiU1RBVEVfRVJST1IiLCJTVEFURV9MT0FESU5HIiwiU1RBVEVfU1RBTExFRCIsIlBST1ZJREVSX0hUTUw1IiwiUFJPVklERVJfV0VCUlRDIiwiUFJPVklERVJfREFTSCIsIlBST1ZJREVSX0hMUyIsIkNPTlRFTlRfQ09NUExFVEUiLCJDT05URU5UX1NFRUsiLCJDT05URU5UX0JVRkZFUl9GVUxMIiwiRElTUExBWV9DTElDSyIsIkNPTlRFTlRfTE9BREVEIiwiQ09OVEVOVF9TRUVLRUQiLCJQTEFZRVJfU1RBVEUiLCJQTEFZRVJfQ09NUExFVEUiLCJQTEFZRVJfUEFVU0UiLCJQTEFZRVJfUExBWSIsIkNPTlRFTlRfQlVGRkVSIiwiQ09OVEVOVF9USU1FIiwiQ09OVEVOVF9SQVRFX0NIQU5HRSIsIkNPTlRFTlRfVk9MVU1FIiwiQ09OVEVOVF9NVVRFIiwiQ09OVEVOVF9NRVRBIiwiQ09OVEVOVF9MRVZFTFMiLCJDT05URU5UX0xFVkVMX0NIQU5HRUQiLCJQTEFZQkFDS19SQVRFX0NIQU5HRUQiLCJDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQiLCJDT05URU5UX0NBUFRJT05fQ0hBTkdFRCIsIlBMQVlFUl9VTktOV09OX0VSUk9SIiwiUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SIiwiUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUiIsIlBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUiIsIlBMQVlFUl9GSUxFX0VSUk9SIiwiUExBWUVSX0NBUFRJT05fRVJST1IiLCJQTEFZRVJfV0VCUlRDX1dTX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19XU19DTE9TRUQiLCJQTEFZRVJfV0VCUlRDX0FERF9JQ0VDQU5ESURBVEVfRVJST1IiLCJQTEFZRVJfV0VCUlRDX1NFVF9SRU1PVEVfREVTQ19FUlJPUiIsIlBMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUiIsIlBMQVlFUl9XRUJSVENfU0VUX0xPQ0FMX0RFU0NfRVJST1IiLCJNYW5hZ2VyIiwibWVkaWFFbGVtZW50IiwiY3JlYXRlTWVkaWFFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJyZW1vdmVDaGlsZCIsImN1cnJlbnRQbGF5bGlzdCIsInNjIiwibWFrZVByZXR0eVNvdXJjZSIsInNvdXJjZV8iLCJob3N0IiwiYXBwbGljYXRpb24iLCJzdHJlYW0iLCJtaW1ldHlwZVJlZ0V4IiwicmVwbGFjZSIsInByZXR0aWVkUGxheWxpc3QiLCJ0cmFja3MiLCJwbGF5bGlzdEl0ZW0iLCJsZXZlbHMiLCJwcmV0dHlTb3VyY2UiLCJkZWZhdWx0U291cmNlIiwiY2FwdGlvbnMiLCJjb25jYXQiLCJ0cmFjayIsIkNvbnRyb2xsZXIiLCJyZWdpc3RlclByb3ZpZGVyIiwicHJvdmlkZXIiLCJQcm92aWRlckxvYWRlciIsImh0bWw1IiwicmVxdWlyZSIsImVyciIsIkVycm9yIiwid2VicnRjIiwiZGFzaCIsInN1cHBvcnRlZFByb3ZpZGVyTmFtZXMiLCJQcm9taXNlIiwiYWxsIiwicHJvdmlkZXJOYW1lIiwiZmluZEJ5TmFtZSIsImdldFByb3ZpZGVyQnlTb3VyY2UiLCJzdXBwb3J0ZWRQcm92aWRlck5hbWUiLCJwcm9taXNlRmluYWxseSIsImNhbGxiYWNrIiwiY29uc3RydWN0b3IiLCJ2YWx1ZSIsInJlc29sdmUiLCJyZWplY3QiLCJzZXRUaW1lb3V0RnVuYyIsInNldFRpbWVvdXQiLCJzZXRJbW1lZGlhdGVGdW5jIiwic2V0SW1tZWRpYXRlIiwibm9vcCIsImJpbmQiLCJmbiIsInRoaXNBcmciLCJQcm9taXNlU2hpbSIsIlR5cGVFcnJvciIsIl9zdGF0ZSIsIl9oYW5kbGVkIiwiX3ZhbHVlIiwiX2RlZmVycmVkcyIsImRvUmVzb2x2ZSIsImhhbmRsZSIsInNlbGYiLCJkZWZlcnJlZCIsIl9pbW1lZGlhdGVGbiIsImNiIiwib25GdWxmaWxsZWQiLCJvblJlamVjdGVkIiwicHJvbWlzZSIsInJldCIsImUiLCJuZXdWYWx1ZSIsImZpbmFsZSIsIl91bmhhbmRsZWRSZWplY3Rpb25GbiIsImxlbiIsIkhhbmRsZXIiLCJkb25lIiwiZXgiLCJwcm9tIiwiYXJyIiwicmVtYWluaW5nIiwicmVzIiwicmFjZSIsInZhbHVlcyIsImNvbnNvbGUiLCJ3YXJuIiwicmVzb2x2ZWQiLCJfX3dlYnBhY2tfcHVibGljX3BhdGhfXyIsIk92ZW5QbGF5ZXJTREsiLCJwbGF5ZXJMaXN0IiwiY2hlY2tBbmRHZXRDb250YWluZXJFbGVtZW50IiwiY29udGFpbmVyRWxlbWVudCIsImdldEVsZW1lbnRCeUlkIiwibm9kZVR5cGUiLCJjcmVhdGUiLCJwbGF5ZXJJbnN0YW5jZSIsImdldFBsYXllckxpc3QiLCJnZXRQbGF5ZXJCeUNvbnRhaW5lcklkIiwiY29udGFpbmVySWQiLCJnZXRQbGF5ZXJCeUluZGV4IiwiZ2VuZXJhdGVXZWJydGNVcmxzIiwiZXZlbnRzQXBpIiwiYWN0aW9uIiwicmVzdCIsImV2ZW50U3BsaXR0ZXIiLCJoYXNPd25Qcm9wZXJ0eSIsIm5hbWVzIiwic3BsaXQiLCJsIiwidHJpZ2dlckV2ZW50cyIsImV2ZW50cyIsImNvbnRleHQiLCJjYXRjaEV4Y2VwdGlvbnNGb3JOYW1lIiwiZXYiLCJfZXZlbnRzIiwiY291bnQiLCJvbmNlQ2FsbGJhY2siLCJfY2FsbGJhY2siLCJyZXRhaW4iLCJrIiwiYWxsRXZlbnRzIiwibG9nZ2VyIiwicHJldkNvbnNvbGVMb2ciLCJlbmFibGUiLCJ0cmltIiwibmF0dXJhbEhtcyIsImhtcyIsInNlY29uZHMiLCJvZmZzZXRUb1NlY29uZHMiLCJzdHJpbmciLCJleHRyYWN0RXh0ZW5zaW9uIiwicGF0aCIsImdldEF6dXJlRmlsZUZvcm1hdCIsImV4dGVuc2lvbiIsImF6dXJlZEZvcm1hdCIsImxhc3RJbmRleE9mIiwic2Vjb25kIiwic2VjTnVtIiwicGFyc2VJbnQiLCJob3VycyIsImZsb29yIiwibWludXRlcyIsInNlY29uZHNOdW1iZXIiLCJwYWQiLCJzdHIiLCJwYWRkIiwibSIsInMiLCJ0b0ZpeGVkIiwiZnJhbWVSYXRlIiwiYXJyTGVuZ3RoIiwic2VjIiwic2VjSW5kZXgiLCJvZmZzZXQiLCJpc1N0cmluZyIsInBlcmNlbnQiLCJyb290IiwiZ2xvYmFsIiwicHJldmlvdXNVbmRlcnNjb3JlIiwiQXJyYXlQcm90byIsIk9ialByb3RvIiwiU3ltYm9sUHJvdG8iLCJTeW1ib2wiLCJuYXRpdmVJc0FycmF5IiwibmF0aXZlS2V5cyIsIm5hdGl2ZUNyZWF0ZSIsIkN0b3IiLCJfd3JhcHBlZCIsImV4cG9ydHMiLCJtb2R1bGUiLCJWRVJTSU9OIiwib3B0aW1pemVDYiIsImZ1bmMiLCJhcmdDb3VudCIsImNvbGxlY3Rpb24iLCJhY2N1bXVsYXRvciIsImJ1aWx0aW5JdGVyYXRlZSIsIml0ZXJhdGVlIiwiaWRlbnRpdHkiLCJpc0Z1bmN0aW9uIiwiaXNPYmplY3QiLCJtYXRjaGVyIiwicHJvcGVydHkiLCJJbmZpbml0eSIsInJlc3RBcmd1bWVudHMiLCJzdGFydEluZGV4IiwibWF4IiwiYmFzZUNyZWF0ZSIsInJlc3VsdCIsInNoYWxsb3dQcm9wZXJ0eSIsImRlZXBHZXQiLCJNQVhfQVJSQVlfSU5ERVgiLCJwb3ciLCJnZXRMZW5ndGgiLCJpc0FycmF5TGlrZSIsImVhY2giLCJjb2xsZWN0IiwicmVzdWx0cyIsImN1cnJlbnRLZXkiLCJjcmVhdGVSZWR1Y2UiLCJkaXIiLCJyZWR1Y2VyIiwibWVtbyIsImluaXRpYWwiLCJyZWR1Y2UiLCJmb2xkbCIsImluamVjdCIsInJlZHVjZVJpZ2h0IiwiZm9sZHIiLCJmaW5kIiwiZGV0ZWN0IiwicHJlZGljYXRlIiwia2V5RmluZGVyIiwiZmluZEtleSIsInNlbGVjdCIsImxpc3QiLCJuZWdhdGUiLCJldmVyeSIsInNvbWUiLCJhbnkiLCJjb250YWlucyIsImluY2x1ZGVzIiwiaW5jbHVkZSIsImZyb21JbmRleCIsImd1YXJkIiwiaW52b2tlIiwiY29udGV4dFBhdGgiLCJwbHVjayIsIndoZXJlIiwiYXR0cnMiLCJsYXN0Q29tcHV0ZWQiLCJjb21wdXRlZCIsInYiLCJtaW4iLCJzaHVmZmxlIiwic2FtcGxlIiwibiIsInJhbmRvbSIsImNsb25lIiwibGFzdCIsInJhbmQiLCJ0ZW1wIiwic29ydEJ5IiwiY3JpdGVyaWEiLCJsZWZ0IiwicmlnaHQiLCJhIiwiYiIsImdyb3VwIiwiYmVoYXZpb3IiLCJwYXJ0aXRpb24iLCJncm91cEJ5IiwiaGFzIiwiaW5kZXhCeSIsImNvdW50QnkiLCJyZVN0clN5bWJvbCIsInRvQXJyYXkiLCJtYXRjaCIsInNpemUiLCJwYXNzIiwiZmlyc3QiLCJoZWFkIiwidGFrZSIsImFycmF5IiwidGFpbCIsImRyb3AiLCJjb21wYWN0IiwiQm9vbGVhbiIsImZsYXR0ZW4iLCJpbnB1dCIsInNoYWxsb3ciLCJzdHJpY3QiLCJvdXRwdXQiLCJpZHgiLCJpc0FyZ3VtZW50cyIsIndpdGhvdXQiLCJvdGhlckFycmF5cyIsImRpZmZlcmVuY2UiLCJ1bmlxIiwidW5pcXVlIiwiaXNTb3J0ZWQiLCJpc0Jvb2xlYW4iLCJzZWVuIiwidW5pb24iLCJhcnJheXMiLCJpbnRlcnNlY3Rpb24iLCJhcmdzTGVuZ3RoIiwidW56aXAiLCJ6aXAiLCJvYmplY3QiLCJjcmVhdGVQcmVkaWNhdGVJbmRleEZpbmRlciIsImZpbmRMYXN0SW5kZXgiLCJzb3J0ZWRJbmRleCIsImxvdyIsImhpZ2giLCJtaWQiLCJjcmVhdGVJbmRleEZpbmRlciIsInByZWRpY2F0ZUZpbmQiLCJyYW5nZSIsInN0YXJ0Iiwic3RlcCIsImNlaWwiLCJjaHVuayIsImV4ZWN1dGVCb3VuZCIsInNvdXJjZUZ1bmMiLCJib3VuZEZ1bmMiLCJjYWxsaW5nQ29udGV4dCIsImJvdW5kIiwiY2FsbEFyZ3MiLCJwYXJ0aWFsIiwiYm91bmRBcmdzIiwicGxhY2Vob2xkZXIiLCJiaW5kQWxsIiwibWVtb2l6ZSIsImhhc2hlciIsImNhY2hlIiwiYWRkcmVzcyIsImRlbGF5Iiwid2FpdCIsImRlZmVyIiwidGhyb3R0bGUiLCJ0aW1lb3V0IiwicHJldmlvdXMiLCJsYXRlciIsImxlYWRpbmciLCJub3ciLCJ0aHJvdHRsZWQiLCJjbGVhclRpbWVvdXQiLCJ0cmFpbGluZyIsImNhbmNlbCIsImRlYm91bmNlIiwiaW1tZWRpYXRlIiwiZGVib3VuY2VkIiwiY2FsbE5vdyIsIndyYXAiLCJ3cmFwcGVyIiwiY29tcG9zZSIsImFmdGVyIiwidGltZXMiLCJiZWZvcmUiLCJoYXNFbnVtQnVnIiwicHJvcGVydHlJc0VudW1lcmFibGUiLCJub25FbnVtZXJhYmxlUHJvcHMiLCJjb2xsZWN0Tm9uRW51bVByb3BzIiwibm9uRW51bUlkeCIsInByb3RvIiwicHJvcCIsImFsbEtleXMiLCJtYXBPYmplY3QiLCJwYWlycyIsImludmVydCIsImZ1bmN0aW9ucyIsIm1ldGhvZHMiLCJjcmVhdGVBc3NpZ25lciIsImtleXNGdW5jIiwiZGVmYXVsdHMiLCJleHRlbmQiLCJleHRlbmRPd24iLCJhc3NpZ24iLCJrZXlJbk9iaiIsIm9taXQiLCJTdHJpbmciLCJwcm9wcyIsInRhcCIsImludGVyY2VwdG9yIiwiaXNNYXRjaCIsImVxIiwiZGVlcEVxIiwiYVN0YWNrIiwiYlN0YWNrIiwiY2xhc3NOYW1lIiwidmFsdWVPZiIsImFyZUFycmF5cyIsImFDdG9yIiwiYkN0b3IiLCJwb3AiLCJpc0VxdWFsIiwiaXNFbXB0eSIsImlzRWxlbWVudCIsIm5vZGVsaXN0IiwiY2hpbGROb2RlcyIsIkludDhBcnJheSIsImlzRmluaXRlIiwiaXNTeW1ib2wiLCJpc051bGwiLCJpc1VuZGVmaW5lZCIsIm5vQ29uZmxpY3QiLCJjb25zdGFudCIsInByb3BlcnR5T2YiLCJtYXRjaGVzIiwiYWNjdW0iLCJEYXRlIiwiZ2V0VGltZSIsImVzY2FwZU1hcCIsInVuZXNjYXBlTWFwIiwiY3JlYXRlRXNjYXBlciIsImVzY2FwZXIiLCJqb2luIiwidGVzdFJlZ2V4cCIsIlJlZ0V4cCIsInJlcGxhY2VSZWdleHAiLCJlc2NhcGUiLCJ1bmVzY2FwZSIsImZhbGxiYWNrIiwiaWRDb3VudGVyIiwidW5pcXVlSWQiLCJwcmVmaXgiLCJpZCIsInRlbXBsYXRlU2V0dGluZ3MiLCJldmFsdWF0ZSIsImludGVycG9sYXRlIiwibm9NYXRjaCIsImVzY2FwZXMiLCJlc2NhcGVSZWdFeHAiLCJlc2NhcGVDaGFyIiwidGVtcGxhdGUiLCJ0ZXh0Iiwic2V0dGluZ3MiLCJvbGRTZXR0aW5ncyIsInZhcmlhYmxlIiwicmVuZGVyIiwiRnVuY3Rpb24iLCJhcmd1bWVudCIsImNoYWluIiwiX2NoYWluIiwiY2hhaW5SZXN1bHQiLCJtaXhpbiIsInRvSlNPTiIsImlzUnRtcCIsImlzV2ViUlRDIiwiaXNEYXNoIiwiZ2V0U2NyaXB0UGF0aCIsInNjcmlwdE5hbWUiLCJzY3JpcHRzIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJzcmMiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGdCQUFRLG9CQUFvQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQSxpREFBeUMsNFhBQTRYO0FBQ3JhOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQSx5Q0FBaUM7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUF3QixrQ0FBa0M7QUFDMUQsY0FB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QztBQUNyQyxZQUFNK3FCLE1BQU1GLFFBQVE3cUIsQ0FBUixFQUFXK3FCLEdBQXZCO0FBQ0EsWUFBSUEsR0FBSixFQUFTO0FBQ0wsZ0JBQU1qbEIsUUFBUWlsQixJQUFJNVMsV0FBSixDQUFnQixNQUFNeVMsVUFBdEIsQ0FBZDtBQUNBLGdCQUFJOWtCLFNBQVMsQ0FBYixFQUFnQjtBQUNaLHVCQUFPaWxCLElBQUkva0IsTUFBSixDQUFXLENBQVgsRUFBY0YsUUFBUSxDQUF0QixDQUFQO0FBQ0g7QUFDSjtBQUNKO0FBQ0QsV0FBTyxFQUFQO0FBQ0gsQ0FaTSxDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0pQOzs7QUFHTyxJQUFNMUcsNEJBQVUsa0JBQWhCLEMiLCJmaWxlIjoib3ZlbnBsYXllci5zZGsuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcblxuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHR9O1xuXG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcIm92ZW5wbGF5ZXIuc2RrXCI6IDBcbiBcdH07XG5cblxuXG4gXHQvLyBzY3JpcHQgcGF0aCBmdW5jdGlvblxuIFx0ZnVuY3Rpb24ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCkge1xuIFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArICh7XCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuaHRtbDVcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5odG1sNVwiLFwib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLmh0bWw1XCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLmh0bWw1XCJ9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLmpzXCJcbiBcdH1cblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCkge1xuIFx0XHR2YXIgcHJvbWlzZXMgPSBbXTtcblxuXG4gXHRcdC8vIEpTT05QIGNodW5rIGxvYWRpbmcgZm9yIGphdmFzY3JpcHRcblxuIFx0XHR2YXIgaW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIHsgLy8gMCBtZWFucyBcImFscmVhZHkgaW5zdGFsbGVkXCIuXG5cbiBcdFx0XHQvLyBhIFByb21pc2UgbWVhbnMgXCJjdXJyZW50bHkgbG9hZGluZ1wiLlxuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0pO1xuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHQvLyBzZXR1cCBQcm9taXNlIGluIGNodW5rIGNhY2hlXG4gXHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XTtcbiBcdFx0XHRcdH0pO1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0gPSBwcm9taXNlKTtcblxuIFx0XHRcdFx0Ly8gc3RhcnQgY2h1bmsgbG9hZGluZ1xuIFx0XHRcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuIFx0XHRcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuIFx0XHRcdFx0dmFyIG9uU2NyaXB0Q29tcGxldGU7XG5cbiBcdFx0XHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04JztcbiBcdFx0XHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuIFx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcbiBcdFx0XHRcdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c2NyaXB0LnNyYyA9IGpzb25wU2NyaXB0U3JjKGNodW5rSWQpO1xuXG4gXHRcdFx0XHRvblNjcmlwdENvbXBsZXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gXHRcdFx0XHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cbiBcdFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gbnVsbDtcbiBcdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuIFx0XHRcdFx0XHR2YXIgY2h1bmsgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdFx0XHRcdGlmKGNodW5rICE9PSAwKSB7XG4gXHRcdFx0XHRcdFx0aWYoY2h1bmspIHtcbiBcdFx0XHRcdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG4gXHRcdFx0XHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuIFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCdMb2FkaW5nIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJyk7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci50eXBlID0gZXJyb3JUeXBlO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG4gXHRcdFx0XHRcdFx0XHRjaHVua1sxXShlcnJvcik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fTtcbiBcdFx0XHRcdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuIFx0XHRcdFx0XHRvblNjcmlwdENvbXBsZXRlKHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KTtcbiBcdFx0XHRcdH0sIDEyMDAwMCk7XG4gXHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlO1xuIFx0XHRcdFx0aGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBvbiBlcnJvciBmdW5jdGlvbiBmb3IgYXN5bmMgbG9hZGluZ1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikgeyBjb25zb2xlLmVycm9yKGVycik7IHRocm93IGVycjsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9qcy9vdmVucGxheWVyLnNkay5qc1wiKTtcbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLCBldmFsKShcInRoaXNcIik7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHRpZiAoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcblx0XHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XG5cdH1cblx0cmV0dXJuIG1vZHVsZTtcbn07XG4iLCIvL2ltcG9ydCBDYXB0aW9uTWFuYWdlciBmcm9tIFwiYXBpL2NhcHRpb24vTWFuYWdlclwiO1xuaW1wb3J0IENvbmZpZ3VyYXRvciBmcm9tIFwiYXBpL0NvbmZpZ3VyYXRvclwiO1xuaW1wb3J0IEV2ZW50cyBmcm9tIFwidXRpbHMvZXZlbnRzXCI7XG5pbXBvcnQgTGF6eUNvbW1hbmRFeGVjdXRvciBmcm9tIFwiYXBpL0xhenlDb21tYW5kRXhlY3V0b3JcIjtcbmltcG9ydCBMb2dNYW5hZ2VyIGZyb20gXCJ1dGlscy9sb2dnZXJcIjtcbmltcG9ydCBNZWRpYU1hbmFnZXIgZnJvbSBcImFwaS9tZWRpYS9NYW5hZ2VyXCI7XG5pbXBvcnQgUGxheWxpc3RNYW5hZ2VyIGZyb20gXCJhcGkvcGxheWxpc3QvTWFuYWdlclwiO1xuaW1wb3J0IFByb3ZpZGVyQ29udHJvbGxlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL0NvbnRyb2xsZXJcIjtcbmltcG9ydCBQcm9taXNlLCB7cmVzb2x2ZWR9IGZyb20gXCJhcGkvc2hpbXMvcHJvbWlzZVwiO1xuaW1wb3J0IHtSRUFEWSwgRVJST1IsIElOSVRfRVJST1IsIERFU1RST1l9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5pbXBvcnQge3ZlcnNpb259IGZyb20gJ3ZlcnNpb24nO1xuLyoqXG4gKiBAYnJpZWYgICBUaGlzIG9iamVjdCBjb25uZWN0cyBVSSB0byB0aGUgcHJvdmlkZXIuXG4gKiBAcGFyYW0gICB7b2JqZWN0fSAgICBjb250YWluZXIgIGRvbSBlbGVtZW50XG4gKlxuICogKi9cblxuY29uc3QgQXBpID0gZnVuY3Rpb24oY29udGFpbmVyKXtcbiAgICBsZXQgbG9nTWFuYWdlciA9IExvZ01hbmFnZXIoKTtcbiAgICBjb25zdCB0aGF0ID0ge1xuICAgICAgICBvbiA6IEV2ZW50cy5vbixcbiAgICAgICAgb25jZTogRXZlbnRzLm9uY2UsXG4gICAgICAgIG9mZjogRXZlbnRzLm9mZixcbiAgICAgICAgdHJpZ2dlcjogRXZlbnRzLnRyaWdnZXJcbiAgICB9O1xuXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiW1tPdmVuUGxheWVyXV0gdi5cIisgdmVyc2lvbik7XG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIGxvYWRlZC5cIik7XG4gICAgLy9sZXQgY2FwdGlvbk1hbmFnZXIgPSBDYXB0aW9uTWFuYWdlcih0aGF0KTtcbiAgICBsZXQgbWVkaWFNYW5hZ2VyID0gTWVkaWFNYW5hZ2VyKGNvbnRhaW5lcik7XG4gICAgbGV0IHBsYXlsaXN0TWFuYWdlciA9IFBsYXlsaXN0TWFuYWdlcigpO1xuICAgIGxldCBwcm92aWRlckNvbnRyb2xsZXIgPSBQcm92aWRlckNvbnRyb2xsZXIoKTtcbiAgICBsZXQgY3VycmVudFByb3ZpZGVyID0gXCJcIjtcbiAgICBsZXQgcGxheWVyQ29uZmlnID0gXCJcIjtcbiAgICBsZXQgbGF6eVF1ZXVlID0gXCJcIjtcblxuICAgIGNvbnN0IGluaXRQcm92aWRlciA9IGZ1bmN0aW9uKGxhc3RQbGF5UG9zaXRpb24pe1xuICAgICAgICBjb25zdCBwaWNrUXVhbGl0eUZyb21Tb3VyY2UgPSAoc291cmNlcykgPT57XG4gICAgICAgICAgICB2YXIgcXVhbGl0eSA9IDA7XG4gICAgICAgICAgICBpZiAoc291cmNlcykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc291cmNlc1tpXS5kZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWFsaXR5ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyQ29uZmlnLmdldFF1YWxpdHlMYWJlbCgpICYmIHNvdXJjZXNbaV0ubGFiZWwgPT09IHBsYXllckNvbmZpZy5nZXRRdWFsaXR5TGFiZWwoKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHF1YWxpdHk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHByb3ZpZGVyQ29udHJvbGxlci5sb2FkUHJvdmlkZXJzKHBsYXlsaXN0TWFuYWdlci5nZXRQbGF5bGlzdCgpKS50aGVuKFByb3ZpZGVycyA9PiB7XG4gICAgICAgICAgICBpZihjdXJyZW50UHJvdmlkZXIpe1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHZpZGVvRWxlbWVudCA9IG1lZGlhTWFuYWdlci5jcmVhdGVFbGVtZW50KCk7XG4gICAgICAgICAgICBsZXQgY3VycmVudFNvdXJjZUluZGV4ID0gcGlja1F1YWxpdHlGcm9tU291cmNlKHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50U291cmNlcygpKTtcblxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiY3VycmVudCBzb3VyY2UgaW5kZXggOiBcIisgY3VycmVudFNvdXJjZUluZGV4KTtcblxuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyID0gUHJvdmlkZXJzW2N1cnJlbnRTb3VyY2VJbmRleF0odmlkZW9FbGVtZW50LCBwbGF5ZXJDb25maWcpO1xuXG4gICAgICAgICAgICAvL1RoaXMgcGFzc2VzIHRoZSBldmVudCBjcmVhdGVkIGJ5IHRoZSBQcm92aWRlciB0byBBUEkuXG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIub24oXCJhbGxcIiwgZnVuY3Rpb24obmFtZSwgZGF0YSl7XG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKG5hbWUsIGRhdGEpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSkudGhlbigoKT0+e1xuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLnByZWxvYWQocGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRTb3VyY2VzKCksIGxhc3RQbGF5UG9zaXRpb24gKTtcblxuICAgICAgICAgICAgbGF6eVF1ZXVlLmZsdXNoKCk7XG4gICAgICAgICAgICAvL1RoaXMgaXMgbm8gcmVhc29uIHRvIGV4aXN0IGFueW1vcmUuXG4gICAgICAgICAgICBsYXp5UXVldWUuZGVzdHJveSgpO1xuXG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoUkVBRFkpO1xuICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yT2JqZWN0ID0ge2NvZGUgOiBJTklUX0VSUk9SLCByZWFzb24gOiBcImluaXQgZXJyb3IuXCIsIG1lc3NhZ2UgOiBcIlBsYXllciBpbml0IGVycm9yLlwiLCBlcnJvciA6IGVycm9yfTtcbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihFUlJPUiwgZXJyb3JPYmplY3QpO1xuXG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgIGluaXQoKeyLnCBzcmPqsIAg7JeG7J20IOy0iOq4sO2ZlCDtlZjripQg6rK97JqwLiAoc3JjIOyXhuydtCDstIjquLDtmZQg7ZWY64qU6rKMIOuqqOyInOydtOudvCDsg53qsIHsnbQg65Ok7KeA66eMKVxuICAgICAgICAgICAgICAgIHBsYXllckluc3RhbmNlLmNyZWF0ZShcImVsSWRcIiwge30pO1xuICAgICAgICAgICAgICAgIHBsYXllckluc3RhbmNlLmxvYWQoc3JjKTtcbiAgICAgICAgICAgICAgICDrpbwg64yA7J2R7ZWY6riwIOychO2VtCBzcmPsl4bslrQg7ZSE66Gc67CU7J2065OcIOuhnOuTnCDrqrvtlbQgaW5pdEVycm9yIOuwnOyDne2VmOuKlCDqsr3smrAgbG9hZOuKlCDtlZzrsogg7Iuk7ZaJ7ZWgIOyImCDsnojqsowg7ZW07KO87KaI7JWEXG4gICAgICAgICAgICAqL1xuICAgICAgICAgICAgbGF6eVF1ZXVlLnJlbW92ZUFuZEV4Y3V0ZU9uY2UoXCJsb2FkXCIpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBBUEkg7LSI6riw7ZmUIO2VqOyImFxuICAgICAqIGluaXRcbiAgICAgKiBAcGFyYW0gICAgICB7b2JqZWN0fSBvcHRpb25zIHBsYXllciBpbml0aWFsIG9wdGlvbiB2YWx1ZS5cbiAgICAgKiBAcmV0dXJuc1xuICAgICAqKi9cbiAgICB0aGF0LmluaXQgPSAob3B0aW9ucykgPT57XG4gICAgICAgIC8vSXQgY29sbGVjdHMgdGhlIGNvbW1hbmRzIGFuZCBleGVjdXRlcyB0aGVtIGF0IHRoZSB0aW1lIHdoZW4gdGhleSBhcmUgZXhlY3V0YWJsZS5cbiAgICAgICAgbGF6eVF1ZXVlID0gTGF6eUNvbW1hbmRFeGVjdXRvcih0aGF0LCBbJ2xvYWQnLCdwbGF5JywncGF1c2UnLCdzZWVrJywnc3RvcCcsICdnZXREdXJhdGlvbicsICdnZXRQb3NpdGlvbicsICdnZXRWb2x1bWUnLCAnZ2V0TXV0ZScsICdnZXRCdWZmZXInLCAnZ2V0U3RhdGUnXSk7XG4gICAgICAgIHBsYXllckNvbmZpZyA9IENvbmZpZ3VyYXRvcihvcHRpb25zKTtcbiAgICAgICAgaWYoIXBsYXllckNvbmZpZy5pc0RlYnVnKCkpe1xuICAgICAgICAgICAgbG9nTWFuYWdlci5kaXNhYmxlKCk7XG4gICAgICAgIH1cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaW5pdCgpXCIpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpbml0KCkgY29uZmlnIDogXCIsIHBsYXllckNvbmZpZyk7XG5cbiAgICAgICAgcGxheWxpc3RNYW5hZ2VyLnNldFBsYXlsaXN0KHBsYXllckNvbmZpZy5nZXRQbGF5bGlzdCgpKTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaW5pdCgpIHNvdXJjZXMgOiBcIiAsIHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50U291cmNlcygpKTtcbiAgICAgICAgaW5pdFByb3ZpZGVyKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldENvbmZpZyA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Q29uZmlnKClcIiwgcGxheWVyQ29uZmlnLmdldENvbmZpZygpKTtcbiAgICAgICAgcmV0dXJuIHBsYXllckNvbmZpZy5nZXRDb25maWcoKTtcbiAgICB9O1xuXG4gICAgdGhhdC5nZXREdXJhdGlvbiA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0RHVyYXRpb24oKVwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0RHVyYXRpb24oKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0RHVyYXRpb24oKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0UG9zaXRpb24gPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFBvc2l0aW9uKClcIiwgY3VycmVudFByb3ZpZGVyLmdldFBvc2l0aW9uKCkpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFBvc2l0aW9uKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldFZvbHVtZSA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Vm9sdW1lKClcIiwgY3VycmVudFByb3ZpZGVyLmdldFZvbHVtZSgpKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRWb2x1bWUoKTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Vm9sdW1lID0gKHZvbHVtZSkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRWb2x1bWUoKSBcIiArIHZvbHVtZSk7XG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5zZXRWb2x1bWUodm9sdW1lKTtcbiAgICB9O1xuICAgIHRoYXQuc2V0TXV0ZSA9IChzdGF0ZSkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRNdXRlKCkgXCIgKyBzdGF0ZSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2V0TXV0ZShzdGF0ZSk7XG4gICAgfTtcbiAgICB0aGF0LmdldE11dGUgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldE11dGUoKSBcIiArIGN1cnJlbnRQcm92aWRlci5nZXRNdXRlKCkpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldE11dGUoKTtcbiAgICB9O1xuICAgIHRoYXQubG9hZCA9IChwbGF5bGlzdCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBsb2FkKCkgXCIsIHBsYXlsaXN0KTtcbiAgICAgICAgbGF6eVF1ZXVlID0gTGF6eUNvbW1hbmRFeGVjdXRvcih0aGF0LCBbJ3BsYXknLCdzZWVrJywnc3RvcCddKTtcblxuICAgICAgICBpZihwbGF5bGlzdCl7XG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIuc2V0Q3VycmVudFF1YWxpdHkoMCk7XG4gICAgICAgICAgICBwbGF5bGlzdE1hbmFnZXIuc2V0UGxheWxpc3QocGxheWxpc3QpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbml0UHJvdmlkZXIoKTtcblxuICAgIH07XG4gICAgdGhhdC5wbGF5ID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBwbGF5KCkgXCIpO1xuICAgICAgICBjdXJyZW50UHJvdmlkZXIucGxheSgpO1xuICAgIH1cbiAgICB0aGF0LnBhdXNlID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBwYXVzZSgpIFwiKTtcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnBhdXNlKCk7XG4gICAgfTtcbiAgICB0aGF0LnNlZWsgPSAocG9zaXRpb24pID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2VlaygpIFwiKyBwb3NpdGlvbik7XG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5zZWVrKHBvc2l0aW9uKTtcbiAgICB9O1xuICAgIHRoYXQuc2V0UGxheWJhY2tSYXRlID0gKHBsYXliYWNrUmF0ZSkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldFBsYXliYWNrUmF0ZSgpIFwiLCBwbGF5YmFja1JhdGUpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLnNldFBsYXliYWNrUmF0ZShwbGF5ZXJDb25maWcuc2V0RGVmYXVsdFBsYXliYWNrUmF0ZShwbGF5YmFja1JhdGUpKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0UGxheWJhY2tSYXRlID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFBsYXliYWNrUmF0ZSgpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0UGxheWJhY2tSYXRlKCkpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFBsYXliYWNrUmF0ZSgpO1xuICAgIH07XG4gICAgdGhhdC5nZXRRdWFsaXR5TGV2ZWxzID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFF1YWxpdHlMZXZlbHMoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldFF1YWxpdHlMZXZlbHMoKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0UXVhbGl0eUxldmVscygpO1xuICAgIH07XG4gICAgdGhhdC5nZXRDdXJyZW50UXVhbGl0eSA9ICgpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRDdXJyZW50UXVhbGl0eSgpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFF1YWxpdHkoKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFF1YWxpdHkoKTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Q3VycmVudFF1YWxpdHkgPSAocXVhbGl0eUluZGV4KSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Q3VycmVudFF1YWxpdHkoKSBcIiwgcXVhbGl0eUluZGV4KTtcblxuICAgICAgICAvL+2YhOyerCDsnqzsg53spJHsnbgg7IaM7Iqk7J2YIO2UhOuhnOuwlOydtOuNlOyZgCDsg4jroZzsmrQgcXVhbGl0eUluZGV4IOyGjOyKpOydmCDtlITroZzrsJTsnbTrjZTqsIAg6rCZ64uk66m0IOq4sOyhtCDtlITroZzrsJTsnbTrjZTrpbwg7J6s7Zmc7Jqp7ZWc64ukLiDqt7jroIfsp4Ag7JWK7Jy866m0IGluaXRQcm92aWRlcigp66W8IO2Gte2VtCDsnqzroZzrlKlcbiAgICAgICAgbGV0IHNvdXJjZXMgPSBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKTtcbiAgICAgICAgbGV0IGN1cnJlbnRTb3VyY2UgPSBzb3VyY2VzW3RoYXQuZ2V0Q3VycmVudFF1YWxpdHkoKV07XG4gICAgICAgIGxldCBuZXdTb3VyY2UgPSBzb3VyY2VzW3F1YWxpdHlJbmRleF07XG4gICAgICAgIGxldCBsYXN0UGxheVBvc2l0aW9uID0gdGhhdC5nZXRQb3NpdGlvbigpO1xuICAgICAgICBsZXQgaXNTYW1lUHJvdmlkZXIgPSBwcm92aWRlckNvbnRyb2xsZXIuaXNTYW1lUHJvdmlkZXIoY3VycmVudFNvdXJjZSwgbmV3U291cmNlKTtcbiAgICAgICAgLy8gcHJvdmlkZXIuc2VyQ3VycmVudFF1YWxpdHkgLT4gcGxheWVyQ29uZmlnIHNldHRpbmcgLT4gbG9hZFxuICAgICAgICBsZXQgcmVzUXVhbGl0eUluZGV4ID0gY3VycmVudFByb3ZpZGVyLnNldEN1cnJlbnRRdWFsaXR5KHF1YWxpdHlJbmRleCwgaXNTYW1lUHJvdmlkZXIpO1xuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEN1cnJlbnRRdWFsaXR5KCkgaXNTYW1lUHJvdmlkZXJcIiwgaXNTYW1lUHJvdmlkZXIpO1xuXG4gICAgICAgIGlmKCFpc1NhbWVQcm92aWRlcil7XG4gICAgICAgICAgICBsYXp5UXVldWUgPSBMYXp5Q29tbWFuZEV4ZWN1dG9yKHRoYXQsIFsncGxheSddKTtcbiAgICAgICAgICAgIC8v7ZSE66Gc67CU7J20642U6rCAIOuzgOqyveuQoOuVjCDquLDsobQg7IOB7YOc66W8IOycoOyngCDtlaAg7IiYIOyXhuq4sCDrlYzrrLjsl5Ag7ZSE66Gc67CU7J20642UIOuzgOqyvSDsoIQg66eI7KeA66eJIOyerOyDnSDtj6zsp4DshZjsnYQg6rCA7KC47Jio64ukLlxuICAgICAgICAgICAgaW5pdFByb3ZpZGVyKGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc1F1YWxpdHlJbmRleDtcbiAgICB9O1xuXG4gICAgLyogQ2FwdGlvbnMgOiBUaGlzIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhlIGN1cnJlbnQgdmVyc2lvbi4qL1xuICAgIC8qdGhhdC5zZXRDdXJyZW50Q2FwdGlvbiA9IChpbmRleCkgPT57XG4gICAgICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5zZXRDdXJyZW50Q2FwdGlvbihpbmRleCk7XG4gICAgfVxuICAgIHRoYXQuZ2V0Q3VycmVudENhcHRpb24gPSAoKSA9PntcbiAgICAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLmdldEN1cnJlbnRDYXB0aW9uKCk7XG4gICAgfVxuICAgIHRoYXQuZ2V0Q2FwdGlvbkxpc3QgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5nZXRDYXB0aW9uTGlzdCgpO1xuICAgIH1cbiAgICB0aGF0LmFkZENhcHRpb24gPSAodHJhY2spID0+IHtcbiAgICAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLmFkZENhcHRpb24oKTtcbiAgICB9XG4gICAgdGhhdC5nZXRDYXB0aW9uTGlzdCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLmdldENhcHRpb25MaXN0KCk7XG4gICAgfSovXG5cbiAgICB0aGF0LmdldEJ1ZmZlciA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0QnVmZmVyKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRCdWZmZXIoKSk7XG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5nZXRCdWZmZXIoKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0U3RhdGUgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFN0YXRlKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRTdGF0ZSgpKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRTdGF0ZSgpO1xuICAgIH07XG4gICAgdGhhdC5zdG9wID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzdG9wKCkgXCIpO1xuICAgICAgICBjdXJyZW50UHJvdmlkZXIuc3RvcCgpO1xuICAgIH07XG4gICAgdGhhdC5yZW1vdmUgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHJlbW92ZSgpIFwiKTtcbiAgICAgICAgbGF6eVF1ZXVlLmRlc3Ryb3koKTtcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLmRlc3Ryb3koKTtcbiAgICAgICAgY3VycmVudFByb3ZpZGVyID0gbnVsbDtcbiAgICAgICAgcHJvdmlkZXJDb250cm9sbGVyID0gbnVsbDtcbiAgICAgICAgcGxheWxpc3RNYW5hZ2VyID0gbnVsbDtcbiAgICAgICAgcGxheWVyQ29uZmlnID0gbnVsbDtcblxuICAgICAgICB0aGF0LnRyaWdnZXIoREVTVFJPWSk7XG4gICAgICAgIHRoYXQub2ZmKCk7XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcmVtb3ZlKCkgLSBsYXp5UXVldWUsIGN1cnJlbnRQcm92aWRlciwgcHJvdmlkZXJDb250cm9sbGVyLCBwbGF5bGlzdE1hbmFnZXIsIHBsYXllckNvbmZpZywgYXBpIGV2ZW50IGRlc3Ryb2VkLiBcIik7XG4gICAgICAgIGxvZ01hbmFnZXIuZGVzdHJveSgpO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cblxuXG5leHBvcnQgZGVmYXVsdCBBcGk7XG5cblxuIiwiaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBUaGlzIGluaXRpYWxpemVzIHRoZSBpbnB1dCBvcHRpb25zLlxuICogQHBhcmFtICAgb3B0aW9uc1xuICpcbiAqICovXG5jb25zdCBDb25maWd1cmF0b3IgPSBmdW5jdGlvbihvcHRpb25zKXtcblxuICAgIGNvbnN0IGNvbXBvc2VTb3VyY2VPcHRpb25zID0gZnVuY3Rpb24ob3B0aW9ucyl7XG4gICAgICAgIGNvbnN0IERlZmF1bHRzID0ge1xuICAgICAgICAgICAgZGVmYXVsdFBsYXliYWNrUmF0ZTogMSxcbiAgICAgICAgICAgIHBsYXliYWNrUmF0ZUNvbnRyb2xzOiBmYWxzZSxcbiAgICAgICAgICAgIHBsYXliYWNrUmF0ZXM6IFswLjUsIDEsIDEuMjUsIDEuNSwgMl0sXG4gICAgICAgICAgICBtdXRlOiBmYWxzZSxcbiAgICAgICAgICAgIHZvbHVtZTogOTAsXG4gICAgICAgICAgICB3aWR0aDogNjQwLFxuICAgICAgICAgICAgaGVpZ2h0OiAzNjBcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgc2VyaWFsaXplID0gZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycgJiYgdmFsLmxlbmd0aCA8IDYpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsb3dlcmNhc2VWYWwgPSB2YWwudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICBpZiAobG93ZXJjYXNlVmFsID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChsb3dlcmNhc2VWYWwgPT09ICdmYWxzZScpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKE51bWJlcih2YWwpKSAmJiAhaXNOYU4ocGFyc2VGbG9hdCh2YWwpKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gTnVtYmVyKHZhbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkZXNlcmlhbGl6ZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSAnaWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3B0aW9uc1trZXldID0gc2VyaWFsaXplKG9wdGlvbnNba2V5XSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBub3JtYWxpemVTaXplID0gZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbC5zbGljZSAmJiB2YWwuc2xpY2UoLTIpID09PSAncHgnKSB7XG4gICAgICAgICAgICAgICAgdmFsID0gdmFsLnNsaWNlKDAsIC0yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZXZhbHVhdGVBc3BlY3RSYXRpbyA9IGZ1bmN0aW9uIChhciwgd2lkdGgpIHtcbiAgICAgICAgICAgIGlmICh3aWR0aC50b1N0cmluZygpLmluZGV4T2YoJyUnKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXIgIT09ICdzdHJpbmcnIHx8ICFhcikge1xuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKC9eXFxkKlxcLj9cXGQrJSQvLnRlc3QoYXIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBhci5pbmRleE9mKCc6Jyk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB3ID0gcGFyc2VGbG9hdChhci5zdWJzdHIoMCwgaW5kZXgpKTtcbiAgICAgICAgICAgIGNvbnN0IGggPSBwYXJzZUZsb2F0KGFyLnN1YnN0cihpbmRleCArIDEpKTtcbiAgICAgICAgICAgIGlmICh3IDw9IDAgfHwgaCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gKGggLyB3ICogMTAwKSArICclJztcbiAgICAgICAgfVxuICAgICAgICBkZXNlcmlhbGl6ZShvcHRpb25zKTtcbiAgICAgICAgbGV0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIERlZmF1bHRzLCBvcHRpb25zKTtcbiAgICAgICAgY29uZmlnLndpZHRoID0gbm9ybWFsaXplU2l6ZShjb25maWcud2lkdGgpO1xuICAgICAgICBjb25maWcuaGVpZ2h0ID0gbm9ybWFsaXplU2l6ZShjb25maWcuaGVpZ2h0KTtcbiAgICAgICAgY29uZmlnLmFzcGVjdHJhdGlvID0gZXZhbHVhdGVBc3BlY3RSYXRpbyhjb25maWcuYXNwZWN0cmF0aW8sIGNvbmZpZy53aWR0aCk7XG5cbiAgICAgICAgbGV0IHJhdGVDb250cm9scyA9IGNvbmZpZy5wbGF5YmFja1JhdGVDb250cm9scztcbiAgICAgICAgaWYgKHJhdGVDb250cm9scykge1xuICAgICAgICAgICAgbGV0IHJhdGVzID0gY29uZmlnLnBsYXliYWNrUmF0ZXM7XG5cbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJhdGVDb250cm9scykpIHtcbiAgICAgICAgICAgICAgICByYXRlcyA9IHJhdGVDb250cm9scztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJhdGVzID0gcmF0ZXMuZmlsdGVyKHJhdGUgPT4gXy5pc051bWJlcihyYXRlKSAmJiByYXRlID49IDAuMjUgJiYgcmF0ZSA8PSA0KVxuICAgICAgICAgICAgICAgIC5tYXAocmF0ZSA9PiBNYXRoLnJvdW5kKHJhdGUgKiA0KSAvIDQpO1xuXG4gICAgICAgICAgICBpZiAocmF0ZXMuaW5kZXhPZigxKSA8IDApIHtcbiAgICAgICAgICAgICAgICByYXRlcy5wdXNoKDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmF0ZXMuc29ydCgpO1xuXG4gICAgICAgICAgICBjb25maWcucGxheWJhY2tSYXRlQ29udHJvbHMgPSB0cnVlO1xuICAgICAgICAgICAgY29uZmlnLnBsYXliYWNrUmF0ZXMgPSByYXRlcztcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKCFjb25maWcucGxheWJhY2tSYXRlQ29udHJvbHMgfHwgY29uZmlnLnBsYXliYWNrUmF0ZXMuaW5kZXhPZihjb25maWcuZGVmYXVsdFBsYXliYWNrUmF0ZSkgPCAwKSB7XG4gICAgICAgICAgICBjb25maWcuZGVmYXVsdFBsYXliYWNrUmF0ZSA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBjb25maWcucGxheWJhY2tSYXRlID0gY29uZmlnLmRlZmF1bHRQbGF5YmFja1JhdGU7XG5cbiAgICAgICAgaWYgKCFjb25maWcuYXNwZWN0cmF0aW8pIHtcbiAgICAgICAgICAgIGRlbGV0ZSBjb25maWcuYXNwZWN0cmF0aW87XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb25maWdQbGF5bGlzdCA9IGNvbmZpZy5wbGF5bGlzdDtcbiAgICAgICAgaWYgKCFjb25maWdQbGF5bGlzdCkge1xuICAgICAgICAgICAgY29uc3Qgb2JqID0gXy5waWNrKGNvbmZpZywgW1xuICAgICAgICAgICAgICAgICd0aXRsZScsXG4gICAgICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJyxcbiAgICAgICAgICAgICAgICAndHlwZScsXG4gICAgICAgICAgICAgICAgJ21lZGlhaWQnLFxuICAgICAgICAgICAgICAgICdpbWFnZScsXG4gICAgICAgICAgICAgICAgJ2ZpbGUnLFxuICAgICAgICAgICAgICAgICdzb3VyY2VzJyxcbiAgICAgICAgICAgICAgICAndHJhY2tzJyxcbiAgICAgICAgICAgICAgICAncHJlbG9hZCcsXG4gICAgICAgICAgICAgICAgJ2R1cmF0aW9uJyxcbiAgICAgICAgICAgICAgICAnaG9zdCcsXG4gICAgICAgICAgICAgICAgJ2FwcGxpY2F0aW9uJyxcbiAgICAgICAgICAgICAgICAnc3RyZWFtJ1xuICAgICAgICAgICAgXSk7XG5cbiAgICAgICAgICAgIGNvbmZpZy5wbGF5bGlzdCA9IFsgb2JqIF07XG4gICAgICAgIH0gZWxzZSBpZiAoXy5pc0FycmF5KGNvbmZpZ1BsYXlsaXN0LnBsYXlsaXN0KSkge1xuICAgICAgICAgICAgY29uZmlnLmZlZWREYXRhID0gY29uZmlnUGxheWxpc3Q7XG4gICAgICAgICAgICBjb25maWcucGxheWxpc3QgPSBjb25maWdQbGF5bGlzdC5wbGF5bGlzdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGRlbGV0ZSBjb25maWcuZHVyYXRpb247XG4gICAgICAgIHJldHVybiBjb25maWc7XG4gICAgfTtcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDb25maWd1cmF0b3IgbG9hZGVkLlwiLCBvcHRpb25zKTtcbiAgICBsZXQgY29uZmlnID0gY29tcG9zZVNvdXJjZU9wdGlvbnMob3B0aW9ucyk7XG5cbiAgICBsZXQgYXNwZWN0cmF0aW8gPSBjb25maWcuYXNwZWN0cmF0aW8gfHwgXCIxNjo5XCI7XG4gICAgbGV0IGRlYnVnID0gY29uZmlnLmRlYnVnO1xuICAgIGxldCBkZWZhdWx0UGxheWJhY2tSYXRlID0gY29uZmlnLmRlZmF1bHRQbGF5YmFja1JhdGUgfHwgMTtcbiAgICBsZXQgaW1hZ2UgPSBjb25maWcuaW1hZ2U7XG4gICAgbGV0IHBsYXliYWNrUmF0ZUNvbnRyb2xzID0gY29uZmlnLnBsYXliYWNrUmF0ZUNvbnRyb2xzIHx8IHRydWU7XG4gICAgbGV0IHBsYXliYWNrUmF0ZXMgPSBjb25maWcucGxheWJhY2tSYXRlcyB8fCBbMC41LCAxLCAxLjI1LCAxLjUsIDJdO1xuICAgIGxldCBwbGF5bGlzdCA9IGNvbmZpZy5wbGF5bGlzdCB8fCBbXTtcbiAgICBsZXQgcXVhbGl0eUxhYmVsID0gY29uZmlnLnF1YWxpdHlMYWJlbCB8fCBcIlwiO1xuICAgIGxldCByZXBlYXQgPSBjb25maWcucmVwZWF0IHx8IGZhbHNlO1xuICAgIGxldCBzdHJldGNoaW5nID0gY29uZmlnLnN0cmV0Y2hpbmcgfHwgJ3VuaWZvcm0nO1xuXG5cblxuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICB0aGF0LmdldENvbmZpZyA9ICgpID0+IHtyZXR1cm4gY29uZmlnO307XG5cbiAgICB0aGF0LmdldEFzcGVjdHJhdGlvID0oKT0+e3JldHVybiBhc3BlY3RyYXRpbzt9O1xuICAgIHRoYXQuc2V0QXNwZWN0cmF0aW8gPShhc3BlY3RyYXRpb18pPT57YXNwZWN0cmF0aW8gPSBhc3BlY3RyYXRpb187fTtcblxuICAgIHRoYXQuaXNEZWJ1ZyA9KCk9PntyZXR1cm4gZGVidWc7fTtcblxuICAgIHRoYXQuZ2V0RGVmYXVsdFBsYXliYWNrUmF0ZSA9KCk9PntyZXR1cm4gZGVmYXVsdFBsYXliYWNrUmF0ZTt9O1xuICAgIHRoYXQuc2V0RGVmYXVsdFBsYXliYWNrUmF0ZSA9KHBsYXliYWNrUmF0ZSk9PntkZWZhdWx0UGxheWJhY2tSYXRlID0gcGxheWJhY2tSYXRlOyByZXR1cm4gcGxheWJhY2tSYXRlO307XG5cbiAgICB0aGF0LmdldFF1YWxpdHlMYWJlbCA9ICgpID0+IHtyZXR1cm4gcXVhbGl0eUxhYmVsO307XG4gICAgdGhhdC5zZXRRdWFsaXR5TGFiZWwgPSAobmV3TGFiZWwpID0+IHtxdWFsaXR5TGFiZWwgPSBuZXdMYWJlbDt9O1xuXG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGVzID0oKT0+e3JldHVybiBwbGF5YmFja1JhdGVzO307XG4gICAgdGhhdC5pc1BsYXliYWNrUmF0ZUNvbnRyb2xzID0oKT0+e3JldHVybiBwbGF5YmFja1JhdGVDb250cm9sczt9O1xuXG4gICAgdGhhdC5nZXRQbGF5bGlzdCA9KCk9PntyZXR1cm4gcGxheWxpc3Q7fTtcbiAgICB0aGF0LnNldFBsYXlsaXN0ID0ocGxheWxpc3RfICk9PntcbiAgICAgICAgaWYoXy5pc0FycmF5KHBsYXlsaXN0Xykpe1xuICAgICAgICAgICAgcGxheWxpc3QgPSBwbGF5bGlzdF87XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcGxheWxpc3QgPSBbcGxheWxpc3RfXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGxheWxpc3Q7XG4gICAgfTtcblxuICAgIHRoYXQuaXNSZXBlYXQgPSgpPT57cmV0dXJuIHJlcGVhdDt9O1xuXG4gICAgdGhhdC5nZXRTdHJldGNoaW5nID0oKT0+e3JldHVybiBzdHJldGNoaW5nO307XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbmZpZ3VyYXRvcjsiLCJpbXBvcnQgXyBmcm9tICd1dGlscy91bmRlcnNjb3JlJztcblxuLyoqXG4gKiBAYnJpZWYgICBUaGlzIGV4ZWN1dGVzIHRoZSBpbnB1dCBjb21tYW5kcyBhdCBhIHNwZWNpZmljIHBvaW50IGluIHRpbWUuXG4gKiBAcGFyYW0gICBpbnN0YW5jZVxuICogQHBhcmFtICAgcXVldWVkQ29tbWFuZHNcbiAqICovXG5jb25zdCBMYXp5Q29tbWFuZEV4ZWN1dG9yID0gZnVuY3Rpb24gKGluc3RhbmNlLCBxdWV1ZWRDb21tYW5kcykge1xuICAgIGxldCBjb21tYW5kUXVldWUgPSBbXTtcbiAgICBsZXQgdW5kZWNvcmF0ZWRNZXRob2RzID0ge307XG4gICAgbGV0IGV4ZWN1dGVNb2RlID0gZmFsc2U7XG4gICAgbGV0IHRoYXQgPSB7fTtcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIGxvYWRlZC5cIik7XG4gICAgcXVldWVkQ29tbWFuZHMuZm9yRWFjaCgoY29tbWFuZCkgPT4ge1xuICAgICAgICBjb25zdCBtZXRob2QgPSBpbnN0YW5jZVtjb21tYW5kXTtcbiAgICAgICAgdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdID0gbWV0aG9kIHx8IGZ1bmN0aW9uKCl7fTtcblxuICAgICAgICBpbnN0YW5jZVtjb21tYW5kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc3QgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgICAgICAgICAgIGlmICghZXhlY3V0ZU1vZGUpIHtcbiAgICAgICAgICAgICAgICAvL2NvbW1hbmRRdWV1ZS5wdXNoKHsgY29tbWFuZCwgYXJncyB9KTtcbiAgICAgICAgICAgICAgICB0aGF0LmFkZFF1ZXVlKGNvbW1hbmQsIGFyZ3MpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGV4ZWN1dGVRdWV1ZWRDb21tYW5kcygpO1xuICAgICAgICAgICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kLmFwcGx5KHRoYXQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KTtcbiAgICB2YXIgZXhlY3V0ZVF1ZXVlZENvbW1hbmRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB3aGlsZSAoY29tbWFuZFF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHsgY29tbWFuZCwgYXJncyB9ID0gY29tbWFuZFF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICAodW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdIHx8IGluc3RhbmNlW2NvbW1hbmRdKS5hcHBseShpbnN0YW5jZSwgYXJncyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGF0LnNldEV4ZWN1dGVNb2RlID0gKG1vZGUpID0+IHtcbiAgICAgICAgZXhlY3V0ZU1vZGUgPSBtb2RlO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogc2V0RXhlY3V0ZU1vZGUoKVwiLCBtb2RlKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0VW5kZWNvcmF0ZWRNZXRob2RzID0gZnVuY3Rpb24oKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGdldFVuZGVjb3JhdGVkTWV0aG9kcygpXCIsIHVuZGVjb3JhdGVkTWV0aG9kcyk7XG4gICAgICAgIHJldHVybiB1bmRlY29yYXRlZE1ldGhvZHM7XG4gICAgfVxuICAgIHRoYXQuZ2V0UXVldWUgPSBmdW5jdGlvbigpe1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZ2V0UXVldWUoKVwiLCBnZXRRdWV1ZSk7XG4gICAgICAgIHJldHVybiBjb21tYW5kUXVldWU7XG4gICAgfVxuICAgIHRoYXQuYWRkUXVldWUgPSBmdW5jdGlvbihjb21tYW5kLCBhcmdzKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGFkZFF1ZXVlKClcIiwgY29tbWFuZCwgYXJncyk7XG4gICAgICAgIGNvbW1hbmRRdWV1ZS5wdXNoKHsgY29tbWFuZCwgYXJncyB9KTtcbiAgICB9XG5cbiAgICB0aGF0LmZsdXNoID0gZnVuY3Rpb24oKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGZsdXNoKClcIik7XG4gICAgICAgIGV4ZWN1dGVRdWV1ZWRDb21tYW5kcygpO1xuICAgIH07XG4gICAgdGhhdC5lbXB0eSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZW1wdHkoKVwiKTtcbiAgICAgICAgY29tbWFuZFF1ZXVlLmxlbmd0aCA9IDA7XG4gICAgfTtcbiAgICB0aGF0Lm9mZiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogb2ZmKClcIik7XG4gICAgICAgIHF1ZXVlZENvbW1hbmRzLmZvckVhY2goKGNvbW1hbmQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1ldGhvZCA9IHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXTtcbiAgICAgICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVtjb21tYW5kXSA9IG1ldGhvZDtcbiAgICAgICAgICAgICAgICBkZWxldGUgdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG5cbiAgICAvL1J1biBvbmNlIGF0IHRoZSBlbmRcbiAgICB0aGF0LnJlbW92ZUFuZEV4Y3V0ZU9uY2UgPSBmdW5jdGlvbihjb21tYW5kXyl7XG4gICAgICAgIGxldCBjb21tYW5kUXVldWVJdGVtID0gXy5maW5kV2hlcmUoY29tbWFuZFF1ZXVlLCB7Y29tbWFuZCA6IGNvbW1hbmRffSk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiByZW1vdmVBbmRFeGN1dGVPbmNlKClcIiwgY29tbWFuZF8pO1xuICAgICAgICBjb21tYW5kUXVldWUuc3BsaWNlKF8uZmluZEluZGV4KGNvbW1hbmRRdWV1ZSwge2NvbW1hbmQgOiBjb21tYW5kX30pLCAxKTtcblxuICAgICAgICBjb25zdCBtZXRob2QgPSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF9dO1xuICAgICAgICBpZiAobWV0aG9kKSB7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJyZW1vdmVDb21tYW5kKClcIik7XG4gICAgICAgICAgICBpZihjb21tYW5kUXVldWVJdGVtKXtcbiAgICAgICAgICAgICAgICAobWV0aG9kfHwgaW5zdGFuY2VbY29tbWFuZF9dKS5hcHBseShpbnN0YW5jZSwgY29tbWFuZFF1ZXVlSXRlbS5hcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluc3RhbmNlW2NvbW1hbmRfXSA9IG1ldGhvZDtcbiAgICAgICAgICAgIGRlbGV0ZSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF9dO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoYXQuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZGVzdHJveSgpXCIpO1xuICAgICAgICB0aGF0Lm9mZigpO1xuICAgICAgICB0aGF0LmVtcHR5KCk7XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTGF6eUNvbW1hbmRFeGVjdXRvcjsiLCJpbXBvcnQge2lzUnRtcCwgaXNXZWJSVEMsIGlzRGFzaH0gZnJvbSBcInV0aWxzL3ZhbGlkYXRvclwiO1xuXG4vKipcbiAqIEBicmllZiAgIFRoaXMgZmluZHMgdGhlIHByb3ZpZGVyIHRoYXQgbWF0Y2hlcyB0aGUgaW5wdXQgc291cmNlLlxuICogQHBhcmFtXG4gKiAqL1xuXG5jb25zdCBTdXBwb3J0Q2hlY2tlciA9IGZ1bmN0aW9uKCl7XG4gICAgY29uc3QgdGhhdCA9IHt9O1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlN1cHBvcnRDaGVja2VyIGxvYWRlZC5cIik7XG4gICAgY29uc3Qgc3VwcG9ydExpc3QgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdodG1sNScsXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBNaW1lVHlwZXMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGFhYzogJ2F1ZGlvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIG1wNDogJ3ZpZGVvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIGY0djogJ3ZpZGVvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIG00djogJ3ZpZGVvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIG1vdjogJ3ZpZGVvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIG1wMzogJ2F1ZGlvL21wZWcnLFxuICAgICAgICAgICAgICAgICAgICBtcGVnOiAnYXVkaW8vbXBlZycsXG4gICAgICAgICAgICAgICAgICAgIG9ndjogJ3ZpZGVvL29nZycsXG4gICAgICAgICAgICAgICAgICAgIG9nZzogJ3ZpZGVvL29nZycsXG4gICAgICAgICAgICAgICAgICAgIG9nYTogJ3ZpZGVvL29nZycsXG4gICAgICAgICAgICAgICAgICAgIHZvcmJpczogJ3ZpZGVvL29nZycsXG4gICAgICAgICAgICAgICAgICAgIHdlYm06ICd2aWRlby93ZWJtJyxcbiAgICAgICAgICAgICAgICAgICAgZjRhOiAndmlkZW8vYWFjJyxcbiAgICAgICAgICAgICAgICAgICAgbTN1ODogJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyxcbiAgICAgICAgICAgICAgICAgICAgbTN1OiAnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnLFxuICAgICAgICAgICAgICAgICAgICBobHM6ICdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCdcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgY29uc3QgdmlkZW8gPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKVxuICAgICAgICAgICAgICAgIH0oKTtcbiAgICAgICAgICAgICAgICBpZiAoIXZpZGVvLmNhblBsYXlUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gc291cmNlLmZpbGU7XG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNvdXJjZS50eXBlO1xuICAgICAgICAgICAgICAgIGlmKCF0eXBlKXtyZXR1cm4gZmFsc2U7fVxuICAgICAgICAgICAgICAgIGNvbnN0IG1pbWVUeXBlID0gc291cmNlLm1pbWVUeXBlIHx8IE1pbWVUeXBlc1t0eXBlXTtcblxuICAgICAgICAgICAgICAgIGlmIChpc1J0bXAoZmlsZSwgdHlwZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKGlzV2ViUlRDKGZpbGUsIHR5cGUpKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghbWltZVR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAhIXZpZGVvLmNhblBsYXlUeXBlKG1pbWVUeXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ3dlYnJ0YycsXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2aWRlbyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpXG4gICAgICAgICAgICAgICAgfSgpO1xuICAgICAgICAgICAgICAgIGlmICghdmlkZW8uY2FuUGxheVR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc291cmNlLnR5cGU7XG5cbiAgICAgICAgICAgICAgICBpZihpc1dlYlJUQyhmaWxlLCB0eXBlKSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnZGFzaCcsXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gc291cmNlLmZpbGU7XG5cbiAgICAgICAgICAgICAgICAvL21wZCBhcHBsaWNhdGlvbi9kYXNoK3htbFxuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcbiAgICAgICAgICAgICAgICBpZiAoaXNEYXNoKGZpbGUsIHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnaGxzJyxcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZpZGVvID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJylcbiAgICAgICAgICAgICAgICB9KCk7XG5cbiAgICAgICAgICAgICAgICAvL3RoaXMgbWV0aG9kIGZyb20gaGxzLmpzXG4gICAgICAgICAgICAgICAgY29uc3QgaXNIbHNTdXBwb3J0ID0gKCkgPT57XG4gICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBnZXRNZWRpYVNvdXJjZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuTWVkaWFTb3VyY2UgfHwgd2luZG93LldlYktpdE1lZGlhU291cmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciBtZWRpYVNvdXJjZSA9IGdldE1lZGlhU291cmNlKCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzb3VyY2VCdWZmZXIgPSB3aW5kb3cuU291cmNlQnVmZmVyIHx8IHdpbmRvdy5XZWJLaXRTb3VyY2VCdWZmZXI7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpc1R5cGVTdXBwb3J0ZWQgPSBtZWRpYVNvdXJjZSAmJiB0eXBlb2YgbWVkaWFTb3VyY2UuaXNUeXBlU3VwcG9ydGVkID09PSAnZnVuY3Rpb24nICYmIG1lZGlhU291cmNlLmlzVHlwZVN1cHBvcnRlZCgndmlkZW8vbXA0OyBjb2RlY3M9XCJhdmMxLjQyRTAxRSxtcDRhLjQwLjJcIicpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIFNvdXJjZUJ1ZmZlciBpcyBleHBvc2VkIGVuc3VyZSBpdHMgQVBJIGlzIHZhbGlkXG4gICAgICAgICAgICAgICAgICAgIC8vIHNhZmFyaSBhbmQgb2xkIHZlcnNpb24gb2YgQ2hyb21lIGRvZSBub3QgZXhwb3NlIFNvdXJjZUJ1ZmZlciBnbG9iYWxseSBzbyBjaGVja2luZyBTb3VyY2VCdWZmZXIucHJvdG90eXBlIGlzIGltcG9zc2libGVcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNvdXJjZUJ1ZmZlclZhbGlkQVBJID0gIXNvdXJjZUJ1ZmZlciB8fCBzb3VyY2VCdWZmZXIucHJvdG90eXBlICYmIHR5cGVvZiBzb3VyY2VCdWZmZXIucHJvdG90eXBlLmFwcGVuZEJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygc291cmNlQnVmZmVyLnByb3RvdHlwZS5yZW1vdmUgPT09ICdmdW5jdGlvbic7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhIWlzVHlwZVN1cHBvcnRlZCAmJiAhIXNvdXJjZUJ1ZmZlclZhbGlkQVBJO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLy9SZW1vdmUgdGhpcyAnISF2aWRlby5jYW5QbGF5VHlwZSgnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnKScgaWYgeW91IHdhbnQgdG8gdXNlIGhsc2pzLlxuICAgICAgICAgICAgICAgIHJldHVybiBpc0hsc1N1cHBvcnQoKSAmJiAhIXZpZGVvLmNhblBsYXlUeXBlKCdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgXTtcblxuICAgIHRoYXQuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlID0gKHNvcnVjZV8pID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU3VwcG9ydENoZWNrZXIgOiBmaW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UoKVwiLCBzb3J1Y2VfKTtcbiAgICAgICAgY29uc3Qgc291cmNlID0gKHNvcnVjZV8gPT09IE9iamVjdChzb3J1Y2VfKSkgPyBzb3J1Y2VfIDoge307XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBzdXBwb3J0TGlzdC5sZW5ndGg7IGkgKyspe1xuICAgICAgICAgICAgaWYoc3VwcG9ydExpc3RbaV0uY2hlY2tTdXBwb3J0KHNvdXJjZSkpe1xuICAgICAgICAgICAgICAgIHJldHVybiBzdXBwb3J0TGlzdFtpXS5uYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LmZpbmRQcm92aWRlck5hbWVzQnlQbGF5bGlzdCA9IChwbGF5bGlzdF8pID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU3VwcG9ydENoZWNrZXIgOiBmaW5kUHJvdmlkZXJOYW1lc0J5UGxheWxpc3QoKVwiLCBwbGF5bGlzdF8pO1xuICAgICAgICBsZXQgc3VwcG9ydE5hbWVzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSBwbGF5bGlzdF8ubGVuZ3RoOyBpLS07KSB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gcGxheWxpc3RfW2ldO1xuICAgICAgICAgICAgbGV0IHNvdXJjZSA9IFwiXCI7XG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgaXRlbS5zb3VyY2VzLmxlbmd0aDsgaiArKyl7XG4gICAgICAgICAgICAgICAgc291cmNlID0gaXRlbS5zb3VyY2VzW2pdO1xuICAgICAgICAgICAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3VwcG9ydGVkID0gdGhhdC5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2Uoc291cmNlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1cHBvcnRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VwcG9ydE5hbWVzLnB1c2goc3VwcG9ydGVkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3VwcG9ydE5hbWVzO1xuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTdXBwb3J0Q2hlY2tlcjsiLCIvLyBTVEFURVxuZXhwb3J0IGNvbnN0IFNUQVRFX0JVRkZFUklORyA9ICdidWZmZXJpbmcnO1xuZXhwb3J0IGNvbnN0IFNUQVRFX0lETEUgPSAnaWRsZSc7XG5leHBvcnQgY29uc3QgU1RBVEVfQ09NUExFVEUgPSAnY29tcGxldGUnO1xuZXhwb3J0IGNvbnN0IFNUQVRFX1BBVVNFRCA9ICdwYXVzZWQnO1xuZXhwb3J0IGNvbnN0IFNUQVRFX1BMQVlJTkcgPSAncGxheWluZyc7XG5leHBvcnQgY29uc3QgU1RBVEVfRVJST1IgPSAnZXJyb3InO1xuZXhwb3J0IGNvbnN0IFNUQVRFX0xPQURJTkcgPSAnbG9hZGluZyc7XG5leHBvcnQgY29uc3QgU1RBVEVfU1RBTExFRCA9ICdzdGFsbGVkJztcblxuLy8gUFJPVklERVJcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9IVE1MNSA9ICdodG1sNSc7XG5leHBvcnQgY29uc3QgUFJPVklERVJfV0VCUlRDID0gJ3dlYnJ0Yyc7XG5leHBvcnQgY29uc3QgUFJPVklERVJfREFTSCA9ICdkYXNoJztcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9ITFMgPSAnaGxzJztcblxuLy8gRVZFTlRTXG5leHBvcnQgY29uc3QgQ09OVEVOVF9DT01QTEVURSA9IFNUQVRFX0NPTVBMRVRFO1xuZXhwb3J0IGNvbnN0IFJFQURZID0gJ3JlYWR5JztcbmV4cG9ydCBjb25zdCBERVNUUk9ZID0gJ2Rlc3Ryb3knO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfU0VFSyA9ICdzZWVrJztcbmV4cG9ydCBjb25zdCBDT05URU5UX0JVRkZFUl9GVUxMID0gJ2J1ZmZlckZ1bGwnO1xuZXhwb3J0IGNvbnN0IERJU1BMQVlfQ0xJQ0sgPSAnZGlzcGxheUNsaWNrJztcbmV4cG9ydCBjb25zdCBDT05URU5UX0xPQURFRCA9ICdsb2FkZWQnO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfU0VFS0VEID0gJ3NlZWtlZCc7XG5cbmV4cG9ydCBjb25zdCBFUlJPUiA9ICdlcnJvcic7XG5cbi8vIFNUQVRFIE9GIFBMQVlFUlxuZXhwb3J0IGNvbnN0IFBMQVlFUl9TVEFURSA9ICdzdGF0ZUNoYW5nZWQnO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9DT01QTEVURSA9IFNUQVRFX0NPTVBMRVRFO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9QQVVTRSA9ICdwYXVzZSc7XG5leHBvcnQgY29uc3QgUExBWUVSX1BMQVkgPSAncGxheSc7XG5cbmV4cG9ydCBjb25zdCBDT05URU5UX0JVRkZFUiA9ICdidWZmZXJDaGFuZ2VkJztcbmV4cG9ydCBjb25zdCBDT05URU5UX1RJTUUgPSAndGltZSc7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9SQVRFX0NIQU5HRSA9ICdyYXRlY2hhbmdlJztcbmV4cG9ydCBjb25zdCBDT05URU5UX1ZPTFVNRSA9ICd2b2x1bWVDaGFuZ2VkJztcbmV4cG9ydCBjb25zdCBDT05URU5UX01VVEUgPSAnbXV0ZSc7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9NRVRBID0gJ21ldGFDaGFuZ2VkJztcbmV4cG9ydCBjb25zdCBDT05URU5UX0xFVkVMUyA9ICdxdWFsaXR5TGV2ZWxDaGFuZ2VkJztcbmV4cG9ydCBjb25zdCBDT05URU5UX0xFVkVMX0NIQU5HRUQgPSAnY3VycmVudFF1YWxpdHlMZXZlbENoYW5nZWQnO1xuZXhwb3J0IGNvbnN0IFBMQVlCQUNLX1JBVEVfQ0hBTkdFRCA9ICdwbGF5YmFja1JhdGVDaGFuZ2VkJztcbmV4cG9ydCBjb25zdCBDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQgPSAnY3VlQ2hhbmdlZCc7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9DQVBUSU9OX0NIQU5HRUQgPSAnY2FwdGlvbkNoYW5nZWQnO1xuXG5cbmV4cG9ydCBjb25zdCBJTklUX0VSUk9SID0gMTAwO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX0VSUk9SID0gMzAwO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUiA9IDMwMTtcbmV4cG9ydCBjb25zdCBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SID0gMzAyO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUiA9IDMwMztcbmV4cG9ydCBjb25zdCBQTEFZRVJfRklMRV9FUlJPUiA9IDMwNDtcbmV4cG9ydCBjb25zdCBQTEFZRVJfQ0FQVElPTl9FUlJPUiA9IDMwNTtcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1dTX0VSUk9SID0gNTAxO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfV1NfQ0xPU0VEID0gNTAyO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUiA9IDUwMztcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1NFVF9SRU1PVEVfREVTQ19FUlJPUiA9IDUwNDtcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX0NSRUFURV9BTlNXRVJfRVJST1IgPSA1MDU7XG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUiA9IDUwNjtcbiIsIi8qKlxuICogQGJyaWVmICAg66+465SU7Ja0IOyXmOumrOuovO2KuOulvCDqtIDrpqztlZjripQg6rCd7LK0LiDtmITsnqzripQg7ZWY64qUIOydvOydtCDrp47sp4Ag7JWK64ukLlxuICogQHBhcmFtICAge2VsZW1lbnR9ICAgY29udGFpbmVyICAgZG9tIGVsZW1lbnRcbiAqXG4gKiAqL1xuXG5jb25zdCBNYW5hZ2VyID0gZnVuY3Rpb24oY29udGFpbmVyKXtcbiAgICBjb25zdCB0aGF0ID0ge307XG4gICAgbGV0IG1lZGlhRWxlbWVudCA9IFwiXCI7XG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTWVkaWFNYW5hZ2VyIGxvYWRlZC5cIik7XG4gICAgY29uc3QgY3JlYXRlTWVkaWFFbGVtZW50ID0gZnVuY3Rpb24oKXtcblxuICAgICAgICBtZWRpYUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuICAgICAgICBtZWRpYUVsZW1lbnQuc2V0QXR0cmlidXRlKCdkaXNhYmxlUmVtb3RlUGxheWJhY2snLCAnJyk7XG4gICAgICAgIG1lZGlhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3dlYmtpdC1wbGF5c2lubGluZScsICcnKTtcbiAgICAgICAgbWVkaWFFbGVtZW50LnNldEF0dHJpYnV0ZSgncGxheXNpbmxpbmUnLCAnJyk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChtZWRpYUVsZW1lbnQpO1xuXG4gICAgICAgIHJldHVybiBtZWRpYUVsZW1lbnQ7XG4gICAgfTtcblxuICAgIHRoYXQuY3JlYXRlRWxlbWVudCA9ICgpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJNZWRpYU1hbmFnZXIgY3JlYXRlRWxlbWVudCgpXCIpO1xuICAgICAgICBpZighbWVkaWFFbGVtZW50KXtcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVNZWRpYUVsZW1lbnQoKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjb250YWluZXIucmVtb3ZlQ2hpbGQobWVkaWFFbGVtZW50KTtcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVNZWRpYUVsZW1lbnQoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE1hbmFnZXI7IiwiaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcbmltcG9ydCB7aXNSdG1wLCBpc1dlYlJUQywgaXNEYXNoIH0gZnJvbSBcInV0aWxzL3ZhbGlkYXRvclwiO1xuaW1wb3J0IHtleHRyYWN0RXh0ZW5zaW9uICx0cmltfSBmcm9tIFwiLi4vLi4vdXRpbHMvc3RyaW5nc1wiO1xuaW1wb3J0IFN1cHBvcnRDaGVja2VyIGZyb20gXCIuLi9TdXBwb3J0Q2hlY2tlclwiO1xuXG4vKipcbiAqIEBicmllZiAgIFRoaXMgbWFuYWdlcyBQbGF5bGlzdCBvciBTb3VyY2VzLlxuICogQHBhcmFtXG4gKlxuICogKi9cbmNvbnN0IE1hbmFnZXIgPSBmdW5jdGlvbigpe1xuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICBsZXQgY3VycmVudFBsYXlsaXN0ID0gW107XG4gICAgbGV0IHNjID0gU3VwcG9ydENoZWNrZXIoKTtcblxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBsb2FkZWQuXCIpO1xuXG4gICAgY29uc3QgbWFrZVByZXR0eVNvdXJjZSA9IGZ1bmN0aW9uKHNvdXJjZV8pe1xuICAgICAgICBpZiAoIXNvdXJjZV8gfHwgIXNvdXJjZV8uZmlsZSAmJiAhKHNvdXJjZV8uaG9zdCB8fCBzb3VyY2VfLmFwcGxpY2F0aW9uIHx8IHNvdXJjZV8uc3RyZWFtKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNvdXJjZSA9IE9iamVjdC5hc3NpZ24oe30sIHsgJ2RlZmF1bHQnOiBmYWxzZSB9LCBzb3VyY2VfKTtcbiAgICAgICAgc291cmNlLmZpbGUgPSB0cmltKCcnICsgc291cmNlLmZpbGUpO1xuXG4gICAgICAgIGlmKHNvdXJjZS5ob3N0ICYmIHNvdXJjZS5hcHBsaWNhdGlvbiAmJiBzb3VyY2Uuc3RyZWFtKXtcbiAgICAgICAgICAgIHNvdXJjZS5maWxlID0gc291cmNlLmhvc3QgKyBcIi9cIiArIHNvdXJjZS5hcHBsaWNhdGlvbiArIFwiL3N0cmVhbS9cIiArIHNvdXJjZS5zdHJlYW07XG4gICAgICAgICAgICBkZWxldGUgc291cmNlLmhvc3Q7XG4gICAgICAgICAgICBkZWxldGUgc291cmNlLmFwcGxpY2F0aW9uO1xuICAgICAgICAgICAgZGVsZXRlIHNvdXJjZS5zdHJlYW07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtaW1ldHlwZVJlZ0V4ID0gL15bXi9dK1xcLyg/OngtKT8oW14vXSspJC87XG5cbiAgICAgICAgaWYgKG1pbWV0eXBlUmVnRXgudGVzdChzb3VyY2UudHlwZSkpIHtcbiAgICAgICAgICAgIC8vIGlmIHR5cGUgaXMgZ2l2ZW4gYXMgYSBtaW1ldHlwZVxuICAgICAgICAgICAgc291cmNlLm1pbWVUeXBlID0gc291cmNlLnR5cGU7XG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9IHNvdXJjZS50eXBlLnJlcGxhY2UobWltZXR5cGVSZWdFeCwgJyQxJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihpc1J0bXAoc291cmNlLmZpbGUpKXtcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ3J0bXAnO1xuICAgICAgICB9ZWxzZSBpZihpc1dlYlJUQyhzb3VyY2UuZmlsZSkpe1xuICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnd2VicnRjJztcbiAgICAgICAgfWVsc2UgaWYoaXNEYXNoKHNvdXJjZS5maWxlLCBzb3VyY2UudHlwZSkpe1xuICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnZGFzaCc7XG4gICAgICAgIH1lbHNlIGlmICghc291cmNlLnR5cGUpIHtcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gZXh0cmFjdEV4dGVuc2lvbihzb3VyY2UuZmlsZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXNvdXJjZS50eXBlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBub3JtYWxpemUgdHlwZXNcbiAgICAgICAgc3dpdGNoIChzb3VyY2UudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnbTN1OCc6XG4gICAgICAgICAgICBjYXNlICd2bmQuYXBwbGUubXBlZ3VybCc6XG4gICAgICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnaGxzJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ200YSc6XG4gICAgICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnYWFjJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3NtaWwnOlxuICAgICAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ3J0bXAnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICBpZiAoc291cmNlW2tleV0gPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHNvdXJjZVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc291cmNlO1xuXG4gICAgfVxuXG4gICAgdGhhdC5zZXRQbGF5bGlzdCA9KHBsYXlsaXN0KSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIHNldFBsYXlsaXN0KCkgXCIsIHBsYXlsaXN0KTtcbiAgICAgICAgY29uc3QgcHJldHRpZWRQbGF5bGlzdCA9IChfLmlzQXJyYXkocGxheWxpc3QpID8gcGxheWxpc3QgOiBbcGxheWxpc3RdKS5tYXAoZnVuY3Rpb24oaXRlbSl7XG4gICAgICAgICAgICBpZighXy5pc0FycmF5KGl0ZW0udHJhY2tzKSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBpdGVtLnRyYWNrcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBwbGF5bGlzdEl0ZW0gPSBPYmplY3QuYXNzaWduKHt9LHtcbiAgICAgICAgICAgICAgICBzb3VyY2VzOiBbXSxcbiAgICAgICAgICAgICAgICB0cmFja3M6IFtdXG4gICAgICAgICAgICB9LCBpdGVtICk7XG5cbiAgICAgICAgICAgIGlmKChwbGF5bGlzdEl0ZW0uc291cmNlcyA9PT0gT2JqZWN0KHBsYXlsaXN0SXRlbS5zb3VyY2VzKSkgJiYgIV8uaXNBcnJheShwbGF5bGlzdEl0ZW0uc291cmNlcykpIHtcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IFttYWtlUHJldHR5U291cmNlKHBsYXlsaXN0SXRlbS5zb3VyY2VzKV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKCFfLmlzQXJyYXkocGxheWxpc3RJdGVtLnNvdXJjZXMpIHx8IHBsYXlsaXN0SXRlbS5zb3VyY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmxldmVscykge1xuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IGl0ZW0ubGV2ZWxzO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gW21ha2VQcmV0dHlTb3VyY2UoaXRlbSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcGxheWxpc3RJdGVtLnNvdXJjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgc291cmNlID0gcGxheWxpc3RJdGVtLnNvdXJjZXNbaV07XG4gICAgICAgICAgICAgICAgbGV0IHByZXR0eVNvdXJjZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgaWYgKCFzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGRlZmF1bHRTb3VyY2UgPSBzb3VyY2UuZGVmYXVsdDtcbiAgICAgICAgICAgICAgICBpZiAoZGVmYXVsdFNvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2UuZGVmYXVsdCA9IChkZWZhdWx0U291cmNlLnRvU3RyaW5nKCkgPT09ICd0cnVlJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlLmRlZmF1bHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgc291cmNlIGRvZXNuJ3QgaGF2ZSBhIGxhYmVsLCBudW1iZXIgaXRcbiAgICAgICAgICAgICAgICBpZiAoIXBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldLmxhYmVsID0gaS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHByZXR0eVNvdXJjZSA9IG1ha2VQcmV0dHlTb3VyY2UocGxheWxpc3RJdGVtLnNvdXJjZXNbaV0pO1xuICAgICAgICAgICAgICAgIGlmKHNjLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShwcmV0dHlTb3VyY2UpKXtcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0gPSBwcmV0dHlTb3VyY2U7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gcGxheWxpc3RJdGVtLnNvdXJjZXMuZmlsdGVyKHNvdXJjZSA9PiAhIXNvdXJjZSk7XG5cbiAgICAgICAgICAgIC8vIGRlZmF1bHQg6rCAIOyXhuydhOuVjCB3ZWJydGPqsIAg7J6I64uk66m0IHdlYnJ0YyBkZWZhdWx0IDogdHJ1ZeuhnCDsnpDrj5kg7ISk7KCVXG4gICAgICAgICAgICAvKmxldCBoYXZlRGVmYXVsdCA9IF8uZmluZChwbGF5bGlzdEl0ZW0uc291cmNlcywgZnVuY3Rpb24oc291cmNlKXtyZXR1cm4gc291cmNlLmRlZmF1bHQgPT0gdHJ1ZTt9KTtcbiAgICAgICAgICAgIGxldCB3ZWJydGNTb3VyY2UgPSBbXTtcbiAgICAgICAgICAgIGlmKCFoYXZlRGVmYXVsdCl7XG4gICAgICAgICAgICAgICAgd2VicnRjU291cmNlID0gXy5maW5kKHBsYXlsaXN0SXRlbS5zb3VyY2VzLCBmdW5jdGlvbihzb3VyY2Upe3JldHVybiBzb3VyY2UudHlwZSA9PSBcIndlYnJ0Y1wiO30pO1xuICAgICAgICAgICAgICAgIGlmKHdlYnJ0Y1NvdXJjZSl7XG4gICAgICAgICAgICAgICAgICAgIHdlYnJ0Y1NvdXJjZS5kZWZhdWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9Ki9cblxuXG5cbiAgICAgICAgICAgIGlmKCFfLmlzQXJyYXkocGxheWxpc3RJdGVtLnRyYWNrcykpe1xuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS50cmFja3MgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKF8uaXNBcnJheShwbGF5bGlzdEl0ZW0uY2FwdGlvbnMpKXtcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0udHJhY2tzID0gcGxheWxpc3RJdGVtLnRyYWNrcy5jb25jYXQocGxheWxpc3RJdGVtLmNhcHRpb25zKTtcbiAgICAgICAgICAgICAgICBkZWxldGUgcGxheWxpc3RJdGVtLmNhcHRpb25zO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwbGF5bGlzdEl0ZW0udHJhY2tzID0gcGxheWxpc3RJdGVtLnRyYWNrcy5tYXAoZnVuY3Rpb24odHJhY2spe1xuICAgICAgICAgICAgICAgIGlmKCF0cmFjayB8fCAhdHJhY2suZmlsZSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHtcbiAgICAgICAgICAgICAgICAgICAgJ2tpbmQnOiAnY2FwdGlvbnMnLFxuICAgICAgICAgICAgICAgICAgICAnZGVmYXVsdCc6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSwgdHJhY2spO1xuICAgICAgICAgICAgfSkuZmlsdGVyKHRyYWNrID0+ICEhdHJhY2spO1xuXG4gICAgICAgICAgICByZXR1cm4gcGxheWxpc3RJdGVtO1xuICAgICAgICB9KTtcbiAgICAgICAgY3VycmVudFBsYXlsaXN0ID0gcHJldHRpZWRQbGF5bGlzdDtcbiAgICAgICAgcmV0dXJuIHByZXR0aWVkUGxheWxpc3Q7XG4gICAgfTtcbiAgICB0aGF0LmdldFBsYXlsaXN0ID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQbGF5bGlzdE1hbmFnZXIgZ2V0UGxheWxpc3QoKSBcIiwgY3VycmVudFBsYXlsaXN0KTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQbGF5bGlzdDtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Q3VycmVudFNvdXJjZXMgPSAoKSA9PiB7XG4gICAgICAgIC8vV2UgZG8gbm90IHN1cHBvcnQgXCJQTEFZTElTVFwiIG5vdCB5ZXQuIFNvIHRoaXMgcmV0dXJucyBwbGF5bGlzdCBvZiAwLlxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQbGF5bGlzdE1hbmFnZXIgZ2V0Q3VycmVudFNvdXJjZXMoKSBcIiwgY3VycmVudFBsYXlsaXN0WzBdLnNvdXJjZXMpO1xuICAgICAgICByZXR1cm4gY3VycmVudFBsYXlsaXN0WzBdLnNvdXJjZXM7XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCBNYW5hZ2VyOyIsImltcG9ydCBTdXBwb3J0Q2hlY2tlciBmcm9tIFwiYXBpL1N1cHBvcnRDaGVja2VyXCI7XG5pbXBvcnQgUHJvbWlzZSwge3Jlc29sdmVkfSBmcm9tIFwiYXBpL3NoaW1zL3Byb21pc2VcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBUaGlzIG1hbmFnZXMgcHJvdmlkZXIuXG4gKiBAcGFyYW1cbiAqICovXG5jb25zdCBDb250cm9sbGVyID0gZnVuY3Rpb24oKXtcbiAgICBsZXQgc2MgPSBTdXBwb3J0Q2hlY2tlcigpO1xuICAgIGNvbnN0IFByb3ZpZGVycyA9IHt9O1xuXG4gICAgY29uc3QgdGhhdCA9IHt9O1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBsb2FkZWQuXCIpO1xuXG4gICAgY29uc3QgcmVnaXN0ZXJQcm92aWRlciA9IChuYW1lLCBwcm92aWRlcikgPT57XG4gICAgICAgIGlmKFByb3ZpZGVyc1tuYW1lXSl7XG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICB9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBfcmVnaXN0ZXJQcm92aWRlcigpIFwiLCBuYW1lKTtcbiAgICAgICAgUHJvdmlkZXJzW25hbWVdID0gcHJvdmlkZXI7XG4gICAgfTtcblxuICAgIGNvbnN0IFByb3ZpZGVyTG9hZGVyID17XG4gICAgICAgIGh0bWw1OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci9odG1sNS9IdG1sNSddLCBmdW5jdGlvbihyZXF1aXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2h0bWw1L0h0bWw1JykuZGVmYXVsdDtcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZXJQcm92aWRlcihcImh0bWw1XCIsIHByb3ZpZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyO1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xuICAgICAgICAgICAgICAgIH0sJ292ZW5wbGF5ZXIucHJvdmlkZXIuaHRtbDUnXG4gICAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICB3ZWJydGMgOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL3dlYnJ0Yy9XZWJSVEMnXSwgZnVuY3Rpb24ocmVxdWlyZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci93ZWJydGMvV2ViUlRDJykuZGVmYXVsdDtcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZXJQcm92aWRlcihcIndlYnJ0Y1wiLCBwcm92aWRlcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm92aWRlcjtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcbiAgICAgICAgICAgICAgICB9LCdvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgZGFzaCA6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvZGFzaC9EYXNoJ10sIGZ1bmN0aW9uKHJlcXVpcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvZGFzaC9EYXNoJykuZGVmYXVsdDtcbiAgICAgICAgICAgICAgICAgICAgUHJvdmlkZXJzW1wiZGFzaFwiXSA9IHByb3ZpZGVyO1xuICAgICAgICAgICAgICAgICAgICByZWdpc3RlclByb3ZpZGVyKFwiZGFzaFwiLCBwcm92aWRlcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm92aWRlcjtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcbiAgICAgICAgICAgICAgICB9LCdvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcidcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIGhscyA6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvaGxzL0hscyddLCBmdW5jdGlvbihyZXF1aXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2hscy9IbHMnKS5kZWZhdWx0O1xuICAgICAgICAgICAgICAgICAgICByZWdpc3RlclByb3ZpZGVyKFwiaGxzXCIsIHByb3ZpZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyO1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xuICAgICAgICAgICAgICAgIH0sJ292ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXInXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LmxvYWRQcm92aWRlcnMgPSAocGxheWxpc3QpID0+e1xuICAgICAgICBjb25zdCBzdXBwb3J0ZWRQcm92aWRlck5hbWVzID0gc2MuZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0KHBsYXlsaXN0KTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGxvYWRQcm92aWRlcnMoKSBcIiwgc3VwcG9ydGVkUHJvdmlkZXJOYW1lcyk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChcbiAgICAgICAgICAgIHN1cHBvcnRlZFByb3ZpZGVyTmFtZXMuZmlsdGVyKGZ1bmN0aW9uKHByb3ZpZGVyTmFtZSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuICEhUHJvdmlkZXJMb2FkZXJbcHJvdmlkZXJOYW1lXTtcbiAgICAgICAgICAgIH0pLm1hcChmdW5jdGlvbihwcm92aWRlck5hbWUpe1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gUHJvdmlkZXJMb2FkZXJbcHJvdmlkZXJOYW1lXSgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm92aWRlcjtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfTtcblxuICAgIHRoYXQuZmluZEJ5TmFtZSA9IChuYW1lKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBmaW5kQnlOYW1lKCkgXCIsIG5hbWUpO1xuICAgICAgICByZXR1cm4gUHJvdmlkZXJzW25hbWVdO1xuICAgIH07XG5cbiAgICB0aGF0LmdldFByb3ZpZGVyQnlTb3VyY2UgPSAoc291cmNlKSA9PiB7XG4gICAgICAgIGNvbnN0IHN1cHBvcnRlZFByb3ZpZGVyTmFtZSA9IHNjLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShzb3VyY2UpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgZ2V0UHJvdmlkZXJCeVNvdXJjZSgpIFwiLCBzdXBwb3J0ZWRQcm92aWRlck5hbWUpO1xuICAgICAgICByZXR1cm4gdGhhdC5maW5kQnlOYW1lKHN1cHBvcnRlZFByb3ZpZGVyTmFtZSk7XG4gICAgfTtcblxuICAgIHRoYXQuaXNTYW1lUHJvdmlkZXIgPSAoY3VycmVudFNvdXJjZSwgbmV3U291cmNlKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBpc1NhbWVQcm92aWRlcigpIFwiLCBzYy5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UoY3VycmVudFNvdXJjZSkgLCBzYy5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UobmV3U291cmNlKSApO1xuICAgICAgICByZXR1cm4gc2MuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKGN1cnJlbnRTb3VyY2UpID09IHNjLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShuZXdTb3VyY2UpO1xuXG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29udHJvbGxlcjsiLCIvLyAgICAgIFByb21pc2UgUG9seWZpbGxcbi8vICAgICAgaHR0cHM6Ly9naXRodWIuY29tL3RheWxvcmhha2VzL3Byb21pc2UtcG9seWZpbGxcbi8vICAgICAgQ29weXJpZ2h0IChjKSAyMDE0IFRheWxvciBIYWtlc1xuLy8gICAgICBDb3B5cmlnaHQgKGMpIDIwMTQgRm9yYmVzIExpbmRlc2F5XG4vLyAgICAgIHRheWxvcmhha2VzL3Byb21pc2UtcG9seWZpbGwgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXG5cbmNvbnN0IHByb21pc2VGaW5hbGx5ID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICB2YXIgY29uc3RydWN0b3IgPSB0aGlzLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiB0aGlzLnRoZW4oXG4gICAgICAgIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gY29uc3RydWN0b3IucmVzb2x2ZShjYWxsYmFjaygpKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAgICAgICAgIHJldHVybiBjb25zdHJ1Y3Rvci5yZXNvbHZlKGNhbGxiYWNrKCkpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnN0cnVjdG9yLnJlamVjdChyZWFzb24pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICApO1xufTtcblxuLy8gU3RvcmUgc2V0VGltZW91dCByZWZlcmVuY2Ugc28gcHJvbWlzZS1wb2x5ZmlsbCB3aWxsIGJlIHVuYWZmZWN0ZWQgYnlcbi8vIG90aGVyIGNvZGUgbW9kaWZ5aW5nIHNldFRpbWVvdXQgKGxpa2Ugc2lub24udXNlRmFrZVRpbWVycygpKVxuY29uc3Qgc2V0VGltZW91dEZ1bmMgPSB3aW5kb3cuc2V0VGltZW91dDtcbmNvbnN0IHNldEltbWVkaWF0ZUZ1bmMgPSB3aW5kb3cuc2V0SW1tZWRpYXRlO1xuXG5mdW5jdGlvbiBub29wKCkge31cblxuLy8gUG9seWZpbGwgZm9yIEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kXG5mdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBmbi5hcHBseSh0aGlzQXJnLCBhcmd1bWVudHMpO1xuICAgIH07XG59XG5cbmNvbnN0IFByb21pc2VTaGltID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFByb21pc2UpKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdQcm9taXNlcyBtdXN0IGJlIGNvbnN0cnVjdGVkIHZpYSBuZXcnKTtcbiAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdub3QgYSBmdW5jdGlvbicpO1xuICAgIHRoaXMuX3N0YXRlID0gMDtcbiAgICB0aGlzLl9oYW5kbGVkID0gZmFsc2U7XG4gICAgdGhpcy5fdmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fZGVmZXJyZWRzID0gW107XG5cbiAgICBkb1Jlc29sdmUoZm4sIHRoaXMpO1xufVxuXG5jb25zdCBoYW5kbGUgPSBmdW5jdGlvbiAoc2VsZiwgZGVmZXJyZWQpIHtcbiAgICB3aGlsZSAoc2VsZi5fc3RhdGUgPT09IDMpIHtcbiAgICAgICAgc2VsZiA9IHNlbGYuX3ZhbHVlO1xuICAgIH1cbiAgICBpZiAoc2VsZi5fc3RhdGUgPT09IDApIHtcbiAgICAgICAgc2VsZi5fZGVmZXJyZWRzLnB1c2goZGVmZXJyZWQpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHNlbGYuX2hhbmRsZWQgPSB0cnVlO1xuICAgIFByb21pc2UuX2ltbWVkaWF0ZUZuKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY2IgPSBzZWxmLl9zdGF0ZSA9PT0gMSA/IGRlZmVycmVkLm9uRnVsZmlsbGVkIDogZGVmZXJyZWQub25SZWplY3RlZDtcbiAgICAgICAgaWYgKGNiID09PSBudWxsKSB7XG4gICAgICAgICAgICAoc2VsZi5fc3RhdGUgPT09IDEgPyByZXNvbHZlIDogcmVqZWN0KShkZWZlcnJlZC5wcm9taXNlLCBzZWxmLl92YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJldDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldCA9IGNiKHNlbGYuX3ZhbHVlKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmVqZWN0KGRlZmVycmVkLnByb21pc2UsIGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUoZGVmZXJyZWQucHJvbWlzZSwgcmV0KTtcbiAgICB9KTtcbn1cblxuY29uc3QgcmVzb2x2ZSA9IGZ1bmN0aW9uIChzZWxmLCBuZXdWYWx1ZSkge1xuICAgIHRyeSB7XG4gICAgICAgIC8vIFByb21pc2UgUmVzb2x1dGlvbiBQcm9jZWR1cmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9wcm9taXNlcy1hcGx1cy9wcm9taXNlcy1zcGVjI3RoZS1wcm9taXNlLXJlc29sdXRpb24tcHJvY2VkdXJlXG4gICAgICAgIGlmIChuZXdWYWx1ZSA9PT0gc2VsZilcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0EgcHJvbWlzZSBjYW5ub3QgYmUgcmVzb2x2ZWQgd2l0aCBpdHNlbGYuJyk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIG5ld1ZhbHVlICYmXG4gICAgICAgICAgICAodHlwZW9mIG5ld1ZhbHVlID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgbmV3VmFsdWUgPT09ICdmdW5jdGlvbicpXG4gICAgICAgICkge1xuICAgICAgICAgICAgdmFyIHRoZW4gPSBuZXdWYWx1ZS50aGVuO1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgIHNlbGYuX3N0YXRlID0gMztcbiAgICAgICAgICAgICAgICBzZWxmLl92YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgICAgIGZpbmFsZShzZWxmKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgZG9SZXNvbHZlKGJpbmQodGhlbiwgbmV3VmFsdWUpLCBzZWxmKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5fc3RhdGUgPSAxO1xuICAgICAgICBzZWxmLl92YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICBmaW5hbGUoc2VsZik7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZWplY3Qoc2VsZiwgZSk7XG4gICAgfVxufVxuXG5jb25zdCByZWplY3QgPWZ1bmN0aW9uIChzZWxmLCBuZXdWYWx1ZSkge1xuICAgIHNlbGYuX3N0YXRlID0gMjtcbiAgICBzZWxmLl92YWx1ZSA9IG5ld1ZhbHVlO1xuICAgIGZpbmFsZShzZWxmKTtcbn1cblxuY29uc3QgZmluYWxlID0gZnVuY3Rpb24gKHNlbGYpIHtcbiAgICBpZiAoc2VsZi5fc3RhdGUgPT09IDIgJiYgc2VsZi5fZGVmZXJyZWRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBQcm9taXNlLl9pbW1lZGlhdGVGbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghc2VsZi5faGFuZGxlZCkge1xuICAgICAgICAgICAgICAgIFByb21pc2UuX3VuaGFuZGxlZFJlamVjdGlvbkZuKHNlbGYuX3ZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHNlbGYuX2RlZmVycmVkcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBoYW5kbGUoc2VsZiwgc2VsZi5fZGVmZXJyZWRzW2ldKTtcbiAgICB9XG4gICAgc2VsZi5fZGVmZXJyZWRzID0gbnVsbDtcbn1cblxuY29uc3QgSGFuZGxlciA9IGZ1bmN0aW9uIChvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCwgcHJvbWlzZSkge1xuICAgIHRoaXMub25GdWxmaWxsZWQgPSB0eXBlb2Ygb25GdWxmaWxsZWQgPT09ICdmdW5jdGlvbicgPyBvbkZ1bGZpbGxlZCA6IG51bGw7XG4gICAgdGhpcy5vblJlamVjdGVkID0gdHlwZW9mIG9uUmVqZWN0ZWQgPT09ICdmdW5jdGlvbicgPyBvblJlamVjdGVkIDogbnVsbDtcbiAgICB0aGlzLnByb21pc2UgPSBwcm9taXNlO1xufVxuXG4vKipcbiAqIFRha2UgYSBwb3RlbnRpYWxseSBtaXNiZWhhdmluZyByZXNvbHZlciBmdW5jdGlvbiBhbmQgbWFrZSBzdXJlXG4gKiBvbkZ1bGZpbGxlZCBhbmQgb25SZWplY3RlZCBhcmUgb25seSBjYWxsZWQgb25jZS5cbiAqXG4gKiBNYWtlcyBubyBndWFyYW50ZWVzIGFib3V0IGFzeW5jaHJvbnkuXG4gKi9cbmNvbnN0IGRvUmVzb2x2ZSA9IGZ1bmN0aW9uIChmbiwgc2VsZikge1xuICAgIHZhciBkb25lID0gZmFsc2U7XG4gICAgdHJ5IHtcbiAgICAgICAgZm4oXG4gICAgICAgICAgICBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChkb25lKSByZXR1cm47XG4gICAgICAgICAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShzZWxmLCB2YWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRvbmUpIHJldHVybjtcbiAgICAgICAgICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZWplY3Qoc2VsZiwgcmVhc29uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9IGNhdGNoIChleCkge1xuICAgICAgICBpZiAoZG9uZSkgcmV0dXJuO1xuICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgcmVqZWN0KHNlbGYsIGV4KTtcbiAgICB9XG59XG5cblByb21pc2VTaGltLnByb3RvdHlwZVsnY2F0Y2gnXSA9IGZ1bmN0aW9uKG9uUmVqZWN0ZWQpIHtcbiAgICByZXR1cm4gdGhpcy50aGVuKG51bGwsIG9uUmVqZWN0ZWQpO1xufTtcblxuUHJvbWlzZVNoaW0ucHJvdG90eXBlLnRoZW4gPSBmdW5jdGlvbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuICAgIHZhciBwcm9tID0gbmV3IHRoaXMuY29uc3RydWN0b3Iobm9vcCk7XG5cbiAgICBoYW5kbGUodGhpcywgbmV3IEhhbmRsZXIob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQsIHByb20pKTtcbiAgICByZXR1cm4gcHJvbTtcbn07XG5cblByb21pc2VTaGltLnByb3RvdHlwZVsnZmluYWxseSddID0gcHJvbWlzZUZpbmFsbHk7XG5cblByb21pc2VTaGltLmFsbCA9IGZ1bmN0aW9uKGFycikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgaWYgKCFhcnIgfHwgdHlwZW9mIGFyci5sZW5ndGggPT09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUHJvbWlzZS5hbGwgYWNjZXB0cyBhbiBhcnJheScpO1xuICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFycik7XG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHJlc29sdmUoW10pO1xuICAgICAgICB2YXIgcmVtYWluaW5nID0gYXJncy5sZW5ndGg7XG5cbiAgICAgICAgZnVuY3Rpb24gcmVzKGksIHZhbCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAodmFsICYmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGhlbiA9IHZhbC50aGVuO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoZW4uY2FsbChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24odmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcyhpLCB2YWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFyZ3NbaV0gPSB2YWw7XG4gICAgICAgICAgICAgICAgaWYgKC0tcmVtYWluaW5nID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoYXJncyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICByZXMoaSwgYXJnc1tpXSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cblByb21pc2VTaGltLnJlc29sdmUgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlLmNvbnN0cnVjdG9yID09PSBQcm9taXNlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICB9KTtcbn07XG5cblByb21pc2VTaGltLnJlamVjdCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICByZWplY3QodmFsdWUpO1xuICAgIH0pO1xufTtcblxuUHJvbWlzZVNoaW0ucmFjZSA9IGZ1bmN0aW9uKHZhbHVlcykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHZhbHVlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgdmFsdWVzW2ldLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuLy8gVXNlIHBvbHlmaWxsIGZvciBzZXRJbW1lZGlhdGUgZm9yIHBlcmZvcm1hbmNlIGdhaW5zXG5Qcm9taXNlU2hpbS5faW1tZWRpYXRlRm4gPVxuICAgICh0eXBlb2Ygc2V0SW1tZWRpYXRlRnVuYyA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgIGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgIHNldEltbWVkaWF0ZUZ1bmMoZm4pO1xuICAgIH0pIHx8XG4gICAgZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgc2V0SW1tZWRpYXRlRnVuYyhmbiwgMCk7XG4gICAgfTtcblxuUHJvbWlzZVNoaW0uX3VuaGFuZGxlZFJlamVjdGlvbkZuID0gZnVuY3Rpb24gX3VuaGFuZGxlZFJlamVjdGlvbkZuKGVycikge1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgY29uc29sZSkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ1Bvc3NpYmxlIFVuaGFuZGxlZCBQcm9taXNlIFJlamVjdGlvbjonLCBlcnIpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICB9XG59O1xuXG5jb25zdCBQcm9taXNlID0gd2luZG93LlByb21pc2UgfHwgKHdpbmRvdy5Qcm9taXNlID0gUHJvbWlzZVNoaW0pO1xuXG5leHBvcnQgY29uc3QgcmVzb2x2ZWQgPSBQcm9taXNlLnJlc29sdmUoKTtcblxuZXhwb3J0IGRlZmF1bHQgUHJvbWlzZTsiLCJpbXBvcnQgQVBJIGZyb20gJ2FwaS9BcGknO1xuaW1wb3J0IHtpc1dlYlJUQ30gZnJvbSAndXRpbHMvdmFsaWRhdG9yJztcbmltcG9ydCBfIGZyb20gJ3V0aWxzL3VuZGVyc2NvcmUnO1xuaW1wb3J0IHtnZXRTY3JpcHRQYXRofSBmcm9tICd1dGlscy93ZWJwYWNrJztcblxuXG5fX3dlYnBhY2tfcHVibGljX3BhdGhfXyA9IGdldFNjcmlwdFBhdGgoJ292ZW5wbGF5ZXIuc2RrLmpzJyk7XG5cbi8qKlxuICogTWFpbiBPdmVuUGxheWVyU0RLIG9iamVjdFxuICovXG5jb25zdCBPdmVuUGxheWVyU0RLID0gd2luZG93Lk92ZW5QbGF5ZXJTREsgPSB7fTtcblxuY29uc3QgdmVyc2lvbiA9ICcwLjAuMSc7XG5cbmNvbnN0IHBsYXllckxpc3QgPSBPdmVuUGxheWVyU0RLLnBsYXllckxpc3QgPSBbXTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrQW5kR2V0Q29udGFpbmVyRWxlbWVudCA9IGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuXG4gICAgaWYgKCFjb250YWluZXIpIHtcblxuICAgICAgICAvLyBUT0RPKHJvY2spOiBTaG91bGQgY2F1c2UgYW4gZXJyb3IuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGxldCBjb250YWluZXJFbGVtZW50ID0gbnVsbDtcblxuICAgIGlmICh0eXBlb2YgY29udGFpbmVyID09PSAnc3RyaW5nJykge1xuXG4gICAgICAgIGNvbnRhaW5lckVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb250YWluZXIpO1xuICAgIH0gZWxzZSBpZiAoY29udGFpbmVyLm5vZGVUeXBlKSB7XG5cbiAgICAgICAgY29udGFpbmVyRWxlbWVudCA9IGNvbnRhaW5lcjtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBUT0RPKHJvY2spOiBTaG91bGQgY2F1c2UgYW4gZXJyb3IuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBjb250YWluZXJFbGVtZW50O1xufVxuXG4vKipcbiAqIENyZWF0ZSBwbGF5ZXIgaW5zdGFuY2UgYW5kIHJldHVybiBpdC5cbiAqXG4gKiBAcGFyYW0gICAgICB7c3RyaW5nIHwgZG9tIGVsZW1lbnR9IGNvbnRhaW5lciAgSWQgb2YgY29udGFpbmVyIGVsZW1lbnQgb3IgY29udGFpbmVyIGVsZW1lbnRcbiAqIEBwYXJhbSAgICAgIHtvYmplY3R9IG9wdGlvbnMgIFRoZSBvcHRpb25zXG4gKi9cbk92ZW5QbGF5ZXJTREsuY3JlYXRlID0gZnVuY3Rpb24oY29udGFpbmVyLCBvcHRpb25zKSB7XG5cbiAgICBsZXQgY29udGFpbmVyRWxlbWVudCA9IGNoZWNrQW5kR2V0Q29udGFpbmVyRWxlbWVudChjb250YWluZXIpO1xuXG4gICAgY29uc3QgcGxheWVySW5zdGFuY2UgPSBBUEkoY29udGFpbmVyRWxlbWVudCk7XG4gICAgcGxheWVySW5zdGFuY2UuaW5pdChvcHRpb25zKTtcblxuICAgIHBsYXllckxpc3QucHVzaChwbGF5ZXJJbnN0YW5jZSk7XG5cbiAgICByZXR1cm4gcGxheWVySW5zdGFuY2U7XG59O1xuXG4vKipcbiAqIEdldHMgdGhlIHBsYXllciBpbnN0YW5jZSBsaXN0LlxuICpcbiAqIEByZXR1cm4gICAgIHthcnJheX0gIFRoZSBwbGF5ZXIgbGlzdC5cbiAqL1xuT3ZlblBsYXllclNESy5nZXRQbGF5ZXJMaXN0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICByZXR1cm4gcGxheWVyTGlzdDtcbn07XG5cbi8qKlxuICogR2V0cyB0aGUgcGxheWVyIGluc3RhbmNlIGJ5IGNvbnRhaW5lciBpZC5cbiAqXG4gKiBAcGFyYW0gICAgICB7c3RyaW5nfSAgY29udGFpbmVySWQgIFRoZSBjb250YWluZXIgaWRlbnRpZmllclxuICogQHJldHVybiAgICAge29iZWplY3QgfCBudWxsfSAgVGhlIHBsYXllciBpbnN0YW5jZS5cbiAqL1xuT3ZlblBsYXllclNESy5nZXRQbGF5ZXJCeUNvbnRhaW5lcklkID0gZnVuY3Rpb24oY29udGFpbmVySWQpIHtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxheWVyTGlzdC5sZW5ndGggLTE7IGkgKyspIHtcblxuICAgICAgICBpZiAocGxheWVyTGlzdFtpXS5jb250YWluZXJJZCA9PT0gY29udGFpbmVySWQpIHtcblxuICAgICAgICAgICAgcmV0dXJuIHBsYXllckxpc3RbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbn07XG5cbi8qKlxuICogR2V0cyB0aGUgcGxheWVyIGluc3RhbmNlIGJ5IGluZGV4LlxuICpcbiAqIEBwYXJhbSAgICAgIHtudW1iZXJ9ICBpbmRleCAgIFRoZSBpbmRleFxuICogQHJldHVybiAgICAge29iamVjdCB8IG51bGx9ICBUaGUgcGxheWVyIGluc3RhbmNlLlxuICovXG5PdmVuUGxheWVyU0RLLmdldFBsYXllckJ5SW5kZXggPSBmdW5jdGlvbihpbmRleCkge1xuXG4gICAgY29uc3QgcGxheWVySW5zdGFuY2UgPSBwbGF5ZXJMaXN0W2luZGV4XTtcblxuICAgIGlmIChwbGF5ZXJJbnN0YW5jZSkge1xuXG4gICAgICAgIHJldHVybiBwbGF5ZXJJbnN0YW5jZTtcbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn07XG5cbi8qKlxuICogR2VuZXJhdGUgd2VicnRjIHNvdXJjZSBmb3IgcGxheWVyIHNvdXJjZSB0eXBlLlxuICpcbiAqIEBwYXJhbSAgICAgIHtPYmplY3QgfCBBcnJheX0gIHNvdXJjZSAgIHdlYnJ0YyBzb3VyY2VcbiAqIEByZXR1cm4gICAgIHtBcnJheX0gIFBsYXllciBzb3VyY2UgT2JlamN0LlxuICovXG5PdmVuUGxheWVyU0RLLmdlbmVyYXRlV2VicnRjVXJscyA9IGZ1bmN0aW9uKHNvdXJjZXMpIHtcbiAgICByZXR1cm4gKF8uaXNBcnJheShzb3VyY2VzKSA/IHNvdXJjZXMgOiBbc291cmNlc10pLm1hcChmdW5jdGlvbihzb3VyY2UsIGluZGV4KXtcbiAgICAgICAgaWYoc291cmNlLmhvc3QgJiYgaXNXZWJSVEMoc291cmNlLmhvc3QpICYmIHNvdXJjZS5hcHBsaWNhdGlvbiAmJiBzb3VyY2Uuc3RyZWFtKXtcbiAgICAgICAgICAgIHJldHVybiB7ZmlsZSA6IHNvdXJjZS5ob3N0ICsgXCIvXCIgKyBzb3VyY2UuYXBwbGljYXRpb24gKyBcIi9cIiArIHNvdXJjZS5zdHJlYW0sIHR5cGUgOiBcIndlYnJ0Y1wiLCBsYWJlbCA6IHNvdXJjZS5sYWJlbCA/IHNvdXJjZS5sYWJlbCA6IFwid2VicnRjLVwiKyhpbmRleCsxKSB9O1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBPdmVuUGxheWVyU0RLOyIsImNvbnN0IHNsaWNlID0gW10uc2xpY2U7XG5jb25zdCBldmVudHNBcGkgPSBmdW5jdGlvbiAob2JqLCBhY3Rpb24sIG5hbWUsIHJlc3QpIHtcbiAgICBjb25zdCBldmVudFNwbGl0dGVyID0gL1xccysvO1xuICAgIGlmICghbmFtZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLy8gSGFuZGxlIGV2ZW50IG1hcHMuXG4gICAgLy9cbiAgICBpZiAodHlwZW9mIG5hbWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBuYW1lKSB7XG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG5hbWUsIGtleSkpIHtcbiAgICAgICAgICAgICAgICBvYmpbYWN0aW9uXS5hcHBseShvYmosIFtrZXksIG5hbWVba2V5XV0uY29uY2F0KHJlc3QpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChldmVudFNwbGl0dGVyLnRlc3QobmFtZSkpIHtcbiAgICAgICAgY29uc3QgbmFtZXMgPSBuYW1lLnNwbGl0KGV2ZW50U3BsaXR0ZXIpO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IG5hbWVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgb2JqW2FjdGlvbl0uYXBwbHkob2JqLCBbbmFtZXNbaV1dLmNvbmNhdChyZXN0KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmNvbnN0IHRyaWdnZXJFdmVudHMgPSBmdW5jdGlvbiAoZXZlbnRzLCBhcmdzLCBjb250ZXh0LCBjYXRjaEV4Y2VwdGlvbnNGb3JOYW1lKSB7XG4gICAgbGV0IGkgPSAtMTtcbiAgICBjb25zdCBsID0gZXZlbnRzLmxlbmd0aDtcbiAgICB3aGlsZSAoKytpIDwgbCkge1xuICAgICAgICBjb25zdCBldiA9IGV2ZW50c1tpXTtcbiAgICAgICAgaWYgKGNhdGNoRXhjZXB0aW9uc0Zvck5hbWUpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZXYuY2FsbGJhY2suYXBwbHkoZXYuY29udGV4dCB8fCBjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coJ0Vycm9yIGluIFwiJyArIGNhdGNoRXhjZXB0aW9uc0Zvck5hbWUgKyAnXCIgZXZlbnQgaGFuZGxlcjonLCBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV2LmNhbGxiYWNrLmFwcGx5KGV2LmNvbnRleHQgfHwgY29udGV4dCwgYXJncyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBvbiA9IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaywgY29udGV4dCl7XG4gICAgaWYgKCFldmVudHNBcGkodGhpcywgJ29uJywgbmFtZSwgW2NhbGxiYWNrLCBjb250ZXh0XSkgfHwgIWNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBjb25zdCBfZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8ICh0aGlzLl9ldmVudHMgPSB7fSk7XG4gICAgY29uc3QgZXZlbnRzID0gX2V2ZW50c1tuYW1lXSB8fCAoX2V2ZW50c1tuYW1lXSA9IFtdKTtcbiAgICBldmVudHMucHVzaCh7IGNhbGxiYWNrOiBjYWxsYmFjaywgY29udGV4dDogY29udGV4dCB9KTtcbiAgICByZXR1cm4gdGhpcztcbn1cblxuZXhwb3J0IGNvbnN0IG9uY2UgPSBmdW5jdGlvbiAobmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICBpZiAoIWV2ZW50c0FwaSh0aGlzLCAnb25jZScsIG5hbWUsIFtjYWxsYmFjaywgY29udGV4dF0pIHx8ICFjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBjb25zdCBvbmNlQ2FsbGJhY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGNvdW50KyspIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLm9mZihuYW1lLCBvbmNlQ2FsbGJhY2spO1xuICAgICAgICBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gICAgb25jZUNhbGxiYWNrLl9jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIHJldHVybiB0aGlzLm9uKG5hbWUsIG9uY2VDYWxsYmFjaywgY29udGV4dCk7XG59XG5cbmV4cG9ydCBjb25zdCBvZmYgPSBmdW5jdGlvbiAobmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhZXZlbnRzQXBpKHRoaXMsICdvZmYnLCBuYW1lLCBbY2FsbGJhY2ssIGNvbnRleHRdKSkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgaWYgKCFuYW1lICYmICFjYWxsYmFjayAmJiAhY29udGV4dCkge1xuICAgICAgICBkZWxldGUgdGhpcy5fZXZlbnRzO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgY29uc3QgbmFtZXMgPSBuYW1lID8gW25hbWVdIDogT2JqZWN0LmtleXModGhpcy5fZXZlbnRzKTtcbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IG5hbWVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBuYW1lID0gbmFtZXNbaV07XG4gICAgICAgIGNvbnN0IGV2ZW50cyA9IHRoaXMuX2V2ZW50c1tuYW1lXTtcbiAgICAgICAgaWYgKGV2ZW50cykge1xuICAgICAgICAgICAgY29uc3QgcmV0YWluID0gdGhpcy5fZXZlbnRzW25hbWVdID0gW107XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sgfHwgY29udGV4dCkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwLCBrID0gZXZlbnRzLmxlbmd0aDsgaiA8IGs7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBldiA9IGV2ZW50c1tqXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChjYWxsYmFjayAmJiBjYWxsYmFjayAhPT0gZXYuY2FsbGJhY2sgJiYgY2FsbGJhY2sgIT09IGV2LmNhbGxiYWNrLl9jYWxsYmFjaykgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIChjb250ZXh0ICYmIGNvbnRleHQgIT09IGV2LmNvbnRleHQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXRhaW4ucHVzaChldik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXJldGFpbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW25hbWVdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufVxuXG5leHBvcnQgY29uc3QgdHJpZ2dlciA9IGZ1bmN0aW9uIChuYW1lKSB7XG5cbiAgICBpZiAoIXRoaXMuX2V2ZW50cykge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgY29uc3QgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICBpZiAoIWV2ZW50c0FwaSh0aGlzLCAndHJpZ2dlcicsIG5hbWUsIGFyZ3MpKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBjb25zdCBldmVudHMgPSB0aGlzLl9ldmVudHNbbmFtZV07XG4gICAgY29uc3QgYWxsRXZlbnRzID0gdGhpcy5fZXZlbnRzLmFsbDtcbiAgICBpZiAoZXZlbnRzKSB7XG4gICAgICAgIHRyaWdnZXJFdmVudHMoZXZlbnRzLCBhcmdzLCB0aGlzKTtcbiAgICB9XG4gICAgaWYgKGFsbEV2ZW50cykge1xuICAgICAgICB0cmlnZ2VyRXZlbnRzKGFsbEV2ZW50cywgYXJndW1lbnRzLCB0aGlzKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBvbixcbiAgICBvbmNlLFxuICAgIG9mZixcbiAgICB0cmlnZ2VyXG59O1xuXG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA1LiAyNC4uXG4gKi9cblxuY29uc3QgbG9nZ2VyID0gZnVuY3Rpb24oKXtcbiAgICBjb25zdCB0aGF0ID0ge307XG4gICAgbGV0IHByZXZDb25zb2xlTG9nID0gbnVsbDtcblxuICAgIHdpbmRvdy5PdmVuUGxheWVyQ29uc29sZSA9IHtsb2cgOiB3aW5kb3dbJ2NvbnNvbGUnXVsnbG9nJ119O1xuXG4gICAgdGhhdC5lbmFibGUgPSAoKSA9PntcbiAgICAgICAgaWYocHJldkNvbnNvbGVMb2cgPT0gbnVsbCl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGVbJ2xvZyddID0gcHJldkNvbnNvbGVMb2c7XG4gICAgfTtcbiAgICB0aGF0LmRpc2FibGUgPSAoKSA9PntcbiAgICAgICAgcHJldkNvbnNvbGVMb2cgPSBjb25zb2xlLmxvZztcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGVbJ2xvZyddID0gZnVuY3Rpb24oKXt9O1xuICAgIH07XG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XG4gICAgICAgIHdpbmRvdy5PdmVuUGxheWVyQ29uc29sZSA9IG51bGw7XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCBsb2dnZXI7IiwiaW1wb3J0IF8gZnJvbSAnLi91bmRlcnNjb3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIHRyaW0oc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG59XG5cbi8qKlxuICogZXh0cmFjdEV4dGVuc2lvblxuICpcbiAqIEBwYXJhbSAgICAgIHtzdHJpbmd9IHBhdGggZm9yIHVybFxuICogQHJldHVybiAgICAge3N0cmluZ30gIEV4dGVuc2lvblxuICovXG5leHBvcnQgY29uc3QgZXh0cmFjdEV4dGVuc2lvbiA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgICBpZighcGF0aCB8fCBwYXRoLnN1YnN0cigwLDQpPT0ncnRtcCcpIHtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldEF6dXJlRmlsZUZvcm1hdChwYXRoKSB7XG4gICAgICAgIGxldCBleHRlbnNpb24gPSBcIlwiO1xuICAgICAgICBpZiAoKC9bKCxdZm9ybWF0PW1wZC0vaSkudGVzdChwYXRoKSkge1xuICAgICAgICAgICAgZXh0ZW5zaW9uID0gJ21wZCc7XG4gICAgICAgIH1lbHNlIGlmICgoL1soLF1mb3JtYXQ9bTN1OC0vaSkudGVzdChwYXRoKSkge1xuICAgICAgICAgICAgZXh0ZW5zaW9uID0gJ20zdTgnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBleHRlbnNpb247XG4gICAgfVxuXG4gICAgbGV0IGF6dXJlZEZvcm1hdCA9IGdldEF6dXJlRmlsZUZvcm1hdChwYXRoKTtcbiAgICBpZihhenVyZWRGb3JtYXQpIHtcbiAgICAgICAgcmV0dXJuIGF6dXJlZEZvcm1hdDtcbiAgICB9XG4gICAgcGF0aCA9IHBhdGguc3BsaXQoJz8nKVswXS5zcGxpdCgnIycpWzBdO1xuICAgIGlmKHBhdGgubGFzdEluZGV4T2YoJy4nKSA+IC0xKSB7XG4gICAgICAgIHJldHVybiBwYXRoLnN1YnN0cihwYXRoLmxhc3RJbmRleE9mKCcuJykgKyAxLCBwYXRoLmxlbmd0aCkudG9Mb3dlckNhc2UoKTtcbiAgICB9ZWxzZXtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxufTtcblxuXG4vKipcbiAqIFRpbWUgRm9ybWF0dGVyXG4gKlxuICogQHBhcmFtICAgICAge251bWJlciB8IHN0cmluZ30gIHNlY29uZCAgVGhlIHNlY29uZFxuICogQHJldHVybiAgICAge3N0cmluZ30gIGZvcm1hdHRlZCBTdHJpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5hdHVyYWxIbXMoc2Vjb25kKSB7XG4gICAgbGV0IHNlY051bSA9IHBhcnNlSW50KHNlY29uZCwgMTApO1xuICAgIGxldCBob3VycyAgID0gTWF0aC5mbG9vcihzZWNOdW0gLyAzNjAwKTtcbiAgICBsZXQgbWludXRlcyA9IE1hdGguZmxvb3IoKHNlY051bSAtIChob3VycyAqIDM2MDApKSAvIDYwKTtcbiAgICBsZXQgc2Vjb25kcyA9IHNlY051bSAtIChob3VycyAqIDM2MDApIC0gKG1pbnV0ZXMgKiA2MCk7XG5cbiAgICBpZiAoaG91cnMgPiAwKSB7bWludXRlcyA9IFwiMFwiK21pbnV0ZXM7fVxuICAgIGlmIChzZWNvbmRzIDwgMTApIHtzZWNvbmRzID0gXCIwXCIrc2Vjb25kczt9XG5cbiAgICBpZiAoaG91cnMgPiAwKSB7XG4gICAgICAgIHJldHVybiBob3VycysnOicrbWludXRlcysnOicrc2Vjb25kcztcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbWludXRlcysnOicrc2Vjb25kcztcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gaG1zKHNlY29uZHNOdW1iZXIpIHtcbiAgICBmdW5jdGlvbiBwYWQoc3RyLCBsZW5ndGgsIHBhZGQpIHtcbiAgICAgICAgc3RyID0gJycgKyBzdHI7XG4gICAgICAgIHBhZGQgPSBwYWRkIHx8ICcwJztcbiAgICAgICAgd2hpbGUgKHN0ci5sZW5ndGggPCBsZW5ndGgpIHtcbiAgICAgICAgICAgIHN0ciA9IHBhZGQgKyBzdHI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gICAgbGV0IGggPSBwYXJzZUludChzZWNvbmRzTnVtYmVyIC8gMzYwMCk7XG4gICAgbGV0IG0gPSBwYXJzZUludChzZWNvbmRzTnVtYmVyIC8gNjApICUgNjA7XG4gICAgbGV0IHMgPSBzZWNvbmRzTnVtYmVyICUgNjA7XG4gICAgcmV0dXJuIHBhZChoLCAyKSArICc6JyArIHBhZChtLCAyKSArICc6JyArIHBhZChzLnRvRml4ZWQoMyksIDYpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHNlY29uZHMoc3RyLCBmcmFtZVJhdGUpIHtcbiAgICBpZighc3RyKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBpZihfLmlzTnVtYmVyKHN0cikgJiYgIV8uaXNOYU4oc3RyKSl7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuICAgIHN0ciA9IHN0ci5yZXBsYWNlKCcsJywgJy4nKTtcbiAgICBsZXQgYXJyID0gc3RyLnNwbGl0KCc6Jyk7XG4gICAgbGV0IGFyckxlbmd0aCA9IGFyci5sZW5ndGg7XG4gICAgbGV0IHNlYyA9IDA7XG4gICAgaWYgKHN0ci5zbGljZSgtMSkgPT09ICdzJyl7XG4gICAgICAgIHNlYyA9IHBhcnNlRmxvYXQoc3RyKTtcbiAgICB9ZWxzZSBpZiAoc3RyLnNsaWNlKC0xKSA9PT0gJ20nKXtcbiAgICAgICAgc2VjID0gcGFyc2VGbG9hdChzdHIpICogNjA7XG4gICAgfWVsc2UgaWYgKHN0ci5zbGljZSgtMSkgPT09ICdoJyl7XG4gICAgICAgIHNlYyA9IHBhcnNlRmxvYXQoc3RyKSAqIDM2MDA7XG4gICAgfWVsc2UgaWYgKGFyckxlbmd0aCA+IDEpIHtcbiAgICAgICAgdmFyIHNlY0luZGV4ID0gYXJyTGVuZ3RoIC0gMTtcbiAgICAgICAgaWYgKGFyckxlbmd0aCA9PT0gNCkge1xuICAgICAgICAgICAgaWYgKGZyYW1lUmF0ZSkge1xuICAgICAgICAgICAgICAgIHNlYyA9IHBhcnNlRmxvYXQoYXJyW3NlY0luZGV4XSkgLyBmcmFtZVJhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWNJbmRleCAtPSAxO1xuICAgICAgICB9XG4gICAgICAgIHNlYyArPSBwYXJzZUZsb2F0KGFycltzZWNJbmRleF0pO1xuICAgICAgICBzZWMgKz0gcGFyc2VGbG9hdChhcnJbc2VjSW5kZXggLSAxXSkgKiA2MDtcbiAgICAgICAgaWYgKGFyckxlbmd0aCA+PSAzKSB7XG4gICAgICAgICAgICBzZWMgKz0gcGFyc2VGbG9hdChhcnJbc2VjSW5kZXggLSAyXSkgKiAzNjAwO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc2VjID0gcGFyc2VGbG9hdChzdHIpO1xuICAgIH1cbiAgICBpZiAoXy5pc05hTihzZWMpKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICByZXR1cm4gc2VjO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb2Zmc2V0VG9TZWNvbmRzKG9mZnNldCwgZHVyYXRpb24sIGZyYW1lUmF0ZSkge1xuICAgIGlmIChfLmlzU3RyaW5nKG9mZnNldCkgJiYgb2Zmc2V0LnNsaWNlKC0xKSA9PT0gJyUnKSB7XG4gICAgICAgIGNvbnN0IHBlcmNlbnQgPSBwYXJzZUZsb2F0KG9mZnNldCk7XG4gICAgICAgIGlmICghZHVyYXRpb24gfHwgaXNOYU4oZHVyYXRpb24pIHx8IGlzTmFOKHBlcmNlbnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZHVyYXRpb24gKiBwZXJjZW50IC8gMTAwO1xuICAgIH1cbiAgICByZXR1cm4gc2Vjb25kcyhvZmZzZXQsIGZyYW1lUmF0ZSk7XG59IiwiXG4vLyAgICAgVW5kZXJzY29yZS5qcyAxLjkuMFxuLy8gICAgIGh0dHA6Ly91bmRlcnNjb3JlanMub3JnXG4vLyAgICAgKGMpIDIwMDktMjAxOCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuLy8gICAgIFVuZGVyc2NvcmUgbWF5IGJlIGZyZWVseSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG5cblxuICAvLyBCYXNlbGluZSBzZXR1cFxuICAvLyAtLS0tLS0tLS0tLS0tLVxuXG4gIC8vIEVzdGFibGlzaCB0aGUgcm9vdCBvYmplY3QsIGB3aW5kb3dgIChgc2VsZmApIGluIHRoZSBicm93c2VyLCBgZ2xvYmFsYFxuICAvLyBvbiB0aGUgc2VydmVyLCBvciBgdGhpc2AgaW4gc29tZSB2aXJ0dWFsIG1hY2hpbmVzLiBXZSB1c2UgYHNlbGZgXG4gIC8vIGluc3RlYWQgb2YgYHdpbmRvd2AgZm9yIGBXZWJXb3JrZXJgIHN1cHBvcnQuXG4gIHZhciByb290ID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZi5zZWxmID09PSBzZWxmICYmIHNlbGYgfHxcbiAgICAgICAgICAgIHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsLmdsb2JhbCA9PT0gZ2xvYmFsICYmIGdsb2JhbCB8fFxuICAgICAgICAgICAgdGhpcyB8fFxuICAgICAgICAgICAge307XG5cbiAgLy8gU2F2ZSB0aGUgcHJldmlvdXMgdmFsdWUgb2YgdGhlIGBfYCB2YXJpYWJsZS5cbiAgdmFyIHByZXZpb3VzVW5kZXJzY29yZSA9IHJvb3QuXztcblxuICAvLyBTYXZlIGJ5dGVzIGluIHRoZSBtaW5pZmllZCAoYnV0IG5vdCBnemlwcGVkKSB2ZXJzaW9uOlxuICB2YXIgQXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZSwgT2JqUHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuICB2YXIgU3ltYm9sUHJvdG8gPSB0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyA/IFN5bWJvbC5wcm90b3R5cGUgOiBudWxsO1xuXG4gIC8vIENyZWF0ZSBxdWljayByZWZlcmVuY2UgdmFyaWFibGVzIGZvciBzcGVlZCBhY2Nlc3MgdG8gY29yZSBwcm90b3R5cGVzLlxuICB2YXIgcHVzaCA9IEFycmF5UHJvdG8ucHVzaCxcbiAgICAgIHNsaWNlID0gQXJyYXlQcm90by5zbGljZSxcbiAgICAgIHRvU3RyaW5nID0gT2JqUHJvdG8udG9TdHJpbmcsXG4gICAgICBoYXNPd25Qcm9wZXJ0eSA9IE9ialByb3RvLmhhc093blByb3BlcnR5O1xuXG4gIC8vIEFsbCAqKkVDTUFTY3JpcHQgNSoqIG5hdGl2ZSBmdW5jdGlvbiBpbXBsZW1lbnRhdGlvbnMgdGhhdCB3ZSBob3BlIHRvIHVzZVxuICAvLyBhcmUgZGVjbGFyZWQgaGVyZS5cbiAgdmFyIG5hdGl2ZUlzQXJyYXkgPSBBcnJheS5pc0FycmF5LFxuICAgICAgbmF0aXZlS2V5cyA9IE9iamVjdC5rZXlzLFxuICAgICAgbmF0aXZlQ3JlYXRlID0gT2JqZWN0LmNyZWF0ZTtcblxuICAvLyBOYWtlZCBmdW5jdGlvbiByZWZlcmVuY2UgZm9yIHN1cnJvZ2F0ZS1wcm90b3R5cGUtc3dhcHBpbmcuXG4gIHZhciBDdG9yID0gZnVuY3Rpb24oKXt9O1xuXG4gIC8vIENyZWF0ZSBhIHNhZmUgcmVmZXJlbmNlIHRvIHRoZSBVbmRlcnNjb3JlIG9iamVjdCBmb3IgdXNlIGJlbG93LlxuICB2YXIgXyA9IGZ1bmN0aW9uKG9iaikge1xuICAgIGlmIChvYmogaW5zdGFuY2VvZiBfKSByZXR1cm4gb2JqO1xuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBfKSkgcmV0dXJuIG5ldyBfKG9iaik7XG4gICAgdGhpcy5fd3JhcHBlZCA9IG9iajtcbiAgfTtcblxuICAvLyBFeHBvcnQgdGhlIFVuZGVyc2NvcmUgb2JqZWN0IGZvciAqKk5vZGUuanMqKiwgd2l0aFxuICAvLyBiYWNrd2FyZHMtY29tcGF0aWJpbGl0eSBmb3IgdGhlaXIgb2xkIG1vZHVsZSBBUEkuIElmIHdlJ3JlIGluXG4gIC8vIHRoZSBicm93c2VyLCBhZGQgYF9gIGFzIGEgZ2xvYmFsIG9iamVjdC5cbiAgLy8gKGBub2RlVHlwZWAgaXMgY2hlY2tlZCB0byBlbnN1cmUgdGhhdCBgbW9kdWxlYFxuICAvLyBhbmQgYGV4cG9ydHNgIGFyZSBub3QgSFRNTCBlbGVtZW50cy4pXG4gIGlmICh0eXBlb2YgZXhwb3J0cyAhPSAndW5kZWZpbmVkJyAmJiAhZXhwb3J0cy5ub2RlVHlwZSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlICE9ICd1bmRlZmluZWQnICYmICFtb2R1bGUubm9kZVR5cGUgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAgIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IF87XG4gICAgfVxuICAgIGV4cG9ydHMuXyA9IF87XG4gIH0gZWxzZSB7XG4gICAgcm9vdC5fID0gXztcbiAgfVxuXG4gIC8vIEN1cnJlbnQgdmVyc2lvbi5cbiAgXy5WRVJTSU9OID0gJzEuOS4wJztcblxuICAvLyBJbnRlcm5hbCBmdW5jdGlvbiB0aGF0IHJldHVybnMgYW4gZWZmaWNpZW50IChmb3IgY3VycmVudCBlbmdpbmVzKSB2ZXJzaW9uXG4gIC8vIG9mIHRoZSBwYXNzZWQtaW4gY2FsbGJhY2ssIHRvIGJlIHJlcGVhdGVkbHkgYXBwbGllZCBpbiBvdGhlciBVbmRlcnNjb3JlXG4gIC8vIGZ1bmN0aW9ucy5cbiAgdmFyIG9wdGltaXplQ2IgPSBmdW5jdGlvbihmdW5jLCBjb250ZXh0LCBhcmdDb3VudCkge1xuICAgIGlmIChjb250ZXh0ID09PSB2b2lkIDApIHJldHVybiBmdW5jO1xuICAgIHN3aXRjaCAoYXJnQ291bnQgPT0gbnVsbCA/IDMgOiBhcmdDb3VudCkge1xuICAgICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmMuY2FsbChjb250ZXh0LCB2YWx1ZSk7XG4gICAgICB9O1xuICAgICAgLy8gVGhlIDItYXJndW1lbnQgY2FzZSBpcyBvbWl0dGVkIGJlY2F1c2Ugd2XigJlyZSBub3QgdXNpbmcgaXQuXG4gICAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmMuY2FsbChjb250ZXh0LCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pO1xuICAgICAgfTtcbiAgICAgIGNhc2UgNDogcmV0dXJuIGZ1bmN0aW9uKGFjY3VtdWxhdG9yLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmMuY2FsbChjb250ZXh0LCBhY2N1bXVsYXRvciwgdmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKTtcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfTtcblxuICB2YXIgYnVpbHRpbkl0ZXJhdGVlO1xuXG4gIC8vIEFuIGludGVybmFsIGZ1bmN0aW9uIHRvIGdlbmVyYXRlIGNhbGxiYWNrcyB0aGF0IGNhbiBiZSBhcHBsaWVkIHRvIGVhY2hcbiAgLy8gZWxlbWVudCBpbiBhIGNvbGxlY3Rpb24sIHJldHVybmluZyB0aGUgZGVzaXJlZCByZXN1bHQg4oCUIGVpdGhlciBgaWRlbnRpdHlgLFxuICAvLyBhbiBhcmJpdHJhcnkgY2FsbGJhY2ssIGEgcHJvcGVydHkgbWF0Y2hlciwgb3IgYSBwcm9wZXJ0eSBhY2Nlc3Nvci5cbiAgdmFyIGNiID0gZnVuY3Rpb24odmFsdWUsIGNvbnRleHQsIGFyZ0NvdW50KSB7XG4gICAgaWYgKF8uaXRlcmF0ZWUgIT09IGJ1aWx0aW5JdGVyYXRlZSkgcmV0dXJuIF8uaXRlcmF0ZWUodmFsdWUsIGNvbnRleHQpO1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm4gXy5pZGVudGl0eTtcbiAgICBpZiAoXy5pc0Z1bmN0aW9uKHZhbHVlKSkgcmV0dXJuIG9wdGltaXplQ2IodmFsdWUsIGNvbnRleHQsIGFyZ0NvdW50KTtcbiAgICBpZiAoXy5pc09iamVjdCh2YWx1ZSkgJiYgIV8uaXNBcnJheSh2YWx1ZSkpIHJldHVybiBfLm1hdGNoZXIodmFsdWUpO1xuICAgIHJldHVybiBfLnByb3BlcnR5KHZhbHVlKTtcbiAgfTtcblxuICAvLyBFeHRlcm5hbCB3cmFwcGVyIGZvciBvdXIgY2FsbGJhY2sgZ2VuZXJhdG9yLiBVc2VycyBtYXkgY3VzdG9taXplXG4gIC8vIGBfLml0ZXJhdGVlYCBpZiB0aGV5IHdhbnQgYWRkaXRpb25hbCBwcmVkaWNhdGUvaXRlcmF0ZWUgc2hvcnRoYW5kIHN0eWxlcy5cbiAgLy8gVGhpcyBhYnN0cmFjdGlvbiBoaWRlcyB0aGUgaW50ZXJuYWwtb25seSBhcmdDb3VudCBhcmd1bWVudC5cbiAgXy5pdGVyYXRlZSA9IGJ1aWx0aW5JdGVyYXRlZSA9IGZ1bmN0aW9uKHZhbHVlLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIGNiKHZhbHVlLCBjb250ZXh0LCBJbmZpbml0eSk7XG4gIH07XG5cbiAgLy8gU29tZSBmdW5jdGlvbnMgdGFrZSBhIHZhcmlhYmxlIG51bWJlciBvZiBhcmd1bWVudHMsIG9yIGEgZmV3IGV4cGVjdGVkXG4gIC8vIGFyZ3VtZW50cyBhdCB0aGUgYmVnaW5uaW5nIGFuZCB0aGVuIGEgdmFyaWFibGUgbnVtYmVyIG9mIHZhbHVlcyB0byBvcGVyYXRlXG4gIC8vIG9uLiBUaGlzIGhlbHBlciBhY2N1bXVsYXRlcyBhbGwgcmVtYWluaW5nIGFyZ3VtZW50cyBwYXN0IHRoZSBmdW5jdGlvbuKAmXNcbiAgLy8gYXJndW1lbnQgbGVuZ3RoIChvciBhbiBleHBsaWNpdCBgc3RhcnRJbmRleGApLCBpbnRvIGFuIGFycmF5IHRoYXQgYmVjb21lc1xuICAvLyB0aGUgbGFzdCBhcmd1bWVudC4gU2ltaWxhciB0byBFUzbigJlzIFwicmVzdCBwYXJhbWV0ZXJcIi5cbiAgdmFyIHJlc3RBcmd1bWVudHMgPSBmdW5jdGlvbihmdW5jLCBzdGFydEluZGV4KSB7XG4gICAgc3RhcnRJbmRleCA9IHN0YXJ0SW5kZXggPT0gbnVsbCA/IGZ1bmMubGVuZ3RoIC0gMSA6ICtzdGFydEluZGV4O1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBsZW5ndGggPSBNYXRoLm1heChhcmd1bWVudHMubGVuZ3RoIC0gc3RhcnRJbmRleCwgMCksXG4gICAgICAgICAgcmVzdCA9IEFycmF5KGxlbmd0aCksXG4gICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgZm9yICg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIHJlc3RbaW5kZXhdID0gYXJndW1lbnRzW2luZGV4ICsgc3RhcnRJbmRleF07XG4gICAgICB9XG4gICAgICBzd2l0Y2ggKHN0YXJ0SW5kZXgpIHtcbiAgICAgICAgY2FzZSAwOiByZXR1cm4gZnVuYy5jYWxsKHRoaXMsIHJlc3QpO1xuICAgICAgICBjYXNlIDE6IHJldHVybiBmdW5jLmNhbGwodGhpcywgYXJndW1lbnRzWzBdLCByZXN0KTtcbiAgICAgICAgY2FzZSAyOiByZXR1cm4gZnVuYy5jYWxsKHRoaXMsIGFyZ3VtZW50c1swXSwgYXJndW1lbnRzWzFdLCByZXN0KTtcbiAgICAgIH1cbiAgICAgIHZhciBhcmdzID0gQXJyYXkoc3RhcnRJbmRleCArIDEpO1xuICAgICAgZm9yIChpbmRleCA9IDA7IGluZGV4IDwgc3RhcnRJbmRleDsgaW5kZXgrKykge1xuICAgICAgICBhcmdzW2luZGV4XSA9IGFyZ3VtZW50c1tpbmRleF07XG4gICAgICB9XG4gICAgICBhcmdzW3N0YXJ0SW5kZXhdID0gcmVzdDtcbiAgICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH07XG4gIH07XG5cbiAgLy8gQW4gaW50ZXJuYWwgZnVuY3Rpb24gZm9yIGNyZWF0aW5nIGEgbmV3IG9iamVjdCB0aGF0IGluaGVyaXRzIGZyb20gYW5vdGhlci5cbiAgdmFyIGJhc2VDcmVhdGUgPSBmdW5jdGlvbihwcm90b3R5cGUpIHtcbiAgICBpZiAoIV8uaXNPYmplY3QocHJvdG90eXBlKSkgcmV0dXJuIHt9O1xuICAgIGlmIChuYXRpdmVDcmVhdGUpIHJldHVybiBuYXRpdmVDcmVhdGUocHJvdG90eXBlKTtcbiAgICBDdG9yLnByb3RvdHlwZSA9IHByb3RvdHlwZTtcbiAgICB2YXIgcmVzdWx0ID0gbmV3IEN0b3I7XG4gICAgQ3Rvci5wcm90b3R5cGUgPSBudWxsO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgdmFyIHNoYWxsb3dQcm9wZXJ0eSA9IGZ1bmN0aW9uKGtleSkge1xuICAgIHJldHVybiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogPT0gbnVsbCA/IHZvaWQgMCA6IG9ialtrZXldO1xuICAgIH07XG4gIH07XG5cbiAgdmFyIGRlZXBHZXQgPSBmdW5jdGlvbihvYmosIHBhdGgpIHtcbiAgICB2YXIgbGVuZ3RoID0gcGF0aC5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gdm9pZCAwO1xuICAgICAgb2JqID0gb2JqW3BhdGhbaV1dO1xuICAgIH1cbiAgICByZXR1cm4gbGVuZ3RoID8gb2JqIDogdm9pZCAwO1xuICB9O1xuXG4gIC8vIEhlbHBlciBmb3IgY29sbGVjdGlvbiBtZXRob2RzIHRvIGRldGVybWluZSB3aGV0aGVyIGEgY29sbGVjdGlvblxuICAvLyBzaG91bGQgYmUgaXRlcmF0ZWQgYXMgYW4gYXJyYXkgb3IgYXMgYW4gb2JqZWN0LlxuICAvLyBSZWxhdGVkOiBodHRwOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy10b2xlbmd0aFxuICAvLyBBdm9pZHMgYSB2ZXJ5IG5hc3R5IGlPUyA4IEpJVCBidWcgb24gQVJNLTY0LiAjMjA5NFxuICB2YXIgTUFYX0FSUkFZX0lOREVYID0gTWF0aC5wb3coMiwgNTMpIC0gMTtcbiAgdmFyIGdldExlbmd0aCA9IHNoYWxsb3dQcm9wZXJ0eSgnbGVuZ3RoJyk7XG4gIHZhciBpc0FycmF5TGlrZSA9IGZ1bmN0aW9uKGNvbGxlY3Rpb24pIHtcbiAgICB2YXIgbGVuZ3RoID0gZ2V0TGVuZ3RoKGNvbGxlY3Rpb24pO1xuICAgIHJldHVybiB0eXBlb2YgbGVuZ3RoID09ICdudW1iZXInICYmIGxlbmd0aCA+PSAwICYmIGxlbmd0aCA8PSBNQVhfQVJSQVlfSU5ERVg7XG4gIH07XG5cbiAgLy8gQ29sbGVjdGlvbiBGdW5jdGlvbnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAvLyBUaGUgY29ybmVyc3RvbmUsIGFuIGBlYWNoYCBpbXBsZW1lbnRhdGlvbiwgYWthIGBmb3JFYWNoYC5cbiAgLy8gSGFuZGxlcyByYXcgb2JqZWN0cyBpbiBhZGRpdGlvbiB0byBhcnJheS1saWtlcy4gVHJlYXRzIGFsbFxuICAvLyBzcGFyc2UgYXJyYXktbGlrZXMgYXMgaWYgdGhleSB3ZXJlIGRlbnNlLlxuICBfLmVhY2ggPSBfLmZvckVhY2ggPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgaXRlcmF0ZWUgPSBvcHRpbWl6ZUNiKGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgICB2YXIgaSwgbGVuZ3RoO1xuICAgIGlmIChpc0FycmF5TGlrZShvYmopKSB7XG4gICAgICBmb3IgKGkgPSAwLCBsZW5ndGggPSBvYmoubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaXRlcmF0ZWUob2JqW2ldLCBpLCBvYmopO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIga2V5cyA9IF8ua2V5cyhvYmopO1xuICAgICAgZm9yIChpID0gMCwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpdGVyYXRlZShvYmpba2V5c1tpXV0sIGtleXNbaV0sIG9iaik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH07XG5cbiAgLy8gUmV0dXJuIHRoZSByZXN1bHRzIG9mIGFwcGx5aW5nIHRoZSBpdGVyYXRlZSB0byBlYWNoIGVsZW1lbnQuXG4gIF8ubWFwID0gXy5jb2xsZWN0ID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgIGl0ZXJhdGVlID0gY2IoaXRlcmF0ZWUsIGNvbnRleHQpO1xuICAgIHZhciBrZXlzID0gIWlzQXJyYXlMaWtlKG9iaikgJiYgXy5rZXlzKG9iaiksXG4gICAgICAgIGxlbmd0aCA9IChrZXlzIHx8IG9iaikubGVuZ3RoLFxuICAgICAgICByZXN1bHRzID0gQXJyYXkobGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICB2YXIgY3VycmVudEtleSA9IGtleXMgPyBrZXlzW2luZGV4XSA6IGluZGV4O1xuICAgICAgcmVzdWx0c1tpbmRleF0gPSBpdGVyYXRlZShvYmpbY3VycmVudEtleV0sIGN1cnJlbnRLZXksIG9iaik7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xuICB9O1xuXG4gIC8vIENyZWF0ZSBhIHJlZHVjaW5nIGZ1bmN0aW9uIGl0ZXJhdGluZyBsZWZ0IG9yIHJpZ2h0LlxuICB2YXIgY3JlYXRlUmVkdWNlID0gZnVuY3Rpb24oZGlyKSB7XG4gICAgLy8gV3JhcCBjb2RlIHRoYXQgcmVhc3NpZ25zIGFyZ3VtZW50IHZhcmlhYmxlcyBpbiBhIHNlcGFyYXRlIGZ1bmN0aW9uIHRoYW5cbiAgICAvLyB0aGUgb25lIHRoYXQgYWNjZXNzZXMgYGFyZ3VtZW50cy5sZW5ndGhgIHRvIGF2b2lkIGEgcGVyZiBoaXQuICgjMTk5MSlcbiAgICB2YXIgcmVkdWNlciA9IGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIG1lbW8sIGluaXRpYWwpIHtcbiAgICAgIHZhciBrZXlzID0gIWlzQXJyYXlMaWtlKG9iaikgJiYgXy5rZXlzKG9iaiksXG4gICAgICAgICAgbGVuZ3RoID0gKGtleXMgfHwgb2JqKS5sZW5ndGgsXG4gICAgICAgICAgaW5kZXggPSBkaXIgPiAwID8gMCA6IGxlbmd0aCAtIDE7XG4gICAgICBpZiAoIWluaXRpYWwpIHtcbiAgICAgICAgbWVtbyA9IG9ialtrZXlzID8ga2V5c1tpbmRleF0gOiBpbmRleF07XG4gICAgICAgIGluZGV4ICs9IGRpcjtcbiAgICAgIH1cbiAgICAgIGZvciAoOyBpbmRleCA+PSAwICYmIGluZGV4IDwgbGVuZ3RoOyBpbmRleCArPSBkaXIpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRLZXkgPSBrZXlzID8ga2V5c1tpbmRleF0gOiBpbmRleDtcbiAgICAgICAgbWVtbyA9IGl0ZXJhdGVlKG1lbW8sIG9ialtjdXJyZW50S2V5XSwgY3VycmVudEtleSwgb2JqKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBtZW1vO1xuICAgIH07XG5cbiAgICByZXR1cm4gZnVuY3Rpb24ob2JqLCBpdGVyYXRlZSwgbWVtbywgY29udGV4dCkge1xuICAgICAgdmFyIGluaXRpYWwgPSBhcmd1bWVudHMubGVuZ3RoID49IDM7XG4gICAgICByZXR1cm4gcmVkdWNlcihvYmosIG9wdGltaXplQ2IoaXRlcmF0ZWUsIGNvbnRleHQsIDQpLCBtZW1vLCBpbml0aWFsKTtcbiAgICB9O1xuICB9O1xuXG4gIC8vICoqUmVkdWNlKiogYnVpbGRzIHVwIGEgc2luZ2xlIHJlc3VsdCBmcm9tIGEgbGlzdCBvZiB2YWx1ZXMsIGFrYSBgaW5qZWN0YCxcbiAgLy8gb3IgYGZvbGRsYC5cbiAgXy5yZWR1Y2UgPSBfLmZvbGRsID0gXy5pbmplY3QgPSBjcmVhdGVSZWR1Y2UoMSk7XG5cbiAgLy8gVGhlIHJpZ2h0LWFzc29jaWF0aXZlIHZlcnNpb24gb2YgcmVkdWNlLCBhbHNvIGtub3duIGFzIGBmb2xkcmAuXG4gIF8ucmVkdWNlUmlnaHQgPSBfLmZvbGRyID0gY3JlYXRlUmVkdWNlKC0xKTtcblxuICAvLyBSZXR1cm4gdGhlIGZpcnN0IHZhbHVlIHdoaWNoIHBhc3NlcyBhIHRydXRoIHRlc3QuIEFsaWFzZWQgYXMgYGRldGVjdGAuXG4gIF8uZmluZCA9IF8uZGV0ZWN0ID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIga2V5RmluZGVyID0gaXNBcnJheUxpa2Uob2JqKSA/IF8uZmluZEluZGV4IDogXy5maW5kS2V5O1xuICAgIHZhciBrZXkgPSBrZXlGaW5kZXIob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgIGlmIChrZXkgIT09IHZvaWQgMCAmJiBrZXkgIT09IC0xKSByZXR1cm4gb2JqW2tleV07XG4gIH07XG5cbiAgLy8gUmV0dXJuIGFsbCB0aGUgZWxlbWVudHMgdGhhdCBwYXNzIGEgdHJ1dGggdGVzdC5cbiAgLy8gQWxpYXNlZCBhcyBgc2VsZWN0YC5cbiAgXy5maWx0ZXIgPSBfLnNlbGVjdCA9IGZ1bmN0aW9uKG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICBwcmVkaWNhdGUgPSBjYihwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgIF8uZWFjaChvYmosIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgbGlzdCkge1xuICAgICAgaWYgKHByZWRpY2F0ZSh2YWx1ZSwgaW5kZXgsIGxpc3QpKSByZXN1bHRzLnB1c2godmFsdWUpO1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHRzO1xuICB9O1xuXG4gIC8vIFJldHVybiBhbGwgdGhlIGVsZW1lbnRzIGZvciB3aGljaCBhIHRydXRoIHRlc3QgZmFpbHMuXG4gIF8ucmVqZWN0ID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gXy5maWx0ZXIob2JqLCBfLm5lZ2F0ZShjYihwcmVkaWNhdGUpKSwgY29udGV4dCk7XG4gIH07XG5cbiAgLy8gRGV0ZXJtaW5lIHdoZXRoZXIgYWxsIG9mIHRoZSBlbGVtZW50cyBtYXRjaCBhIHRydXRoIHRlc3QuXG4gIC8vIEFsaWFzZWQgYXMgYGFsbGAuXG4gIF8uZXZlcnkgPSBfLmFsbCA9IGZ1bmN0aW9uKG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgcHJlZGljYXRlID0gY2IocHJlZGljYXRlLCBjb250ZXh0KTtcbiAgICB2YXIga2V5cyA9ICFpc0FycmF5TGlrZShvYmopICYmIF8ua2V5cyhvYmopLFxuICAgICAgICBsZW5ndGggPSAoa2V5cyB8fCBvYmopLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICB2YXIgY3VycmVudEtleSA9IGtleXMgPyBrZXlzW2luZGV4XSA6IGluZGV4O1xuICAgICAgaWYgKCFwcmVkaWNhdGUob2JqW2N1cnJlbnRLZXldLCBjdXJyZW50S2V5LCBvYmopKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIC8vIERldGVybWluZSBpZiBhdCBsZWFzdCBvbmUgZWxlbWVudCBpbiB0aGUgb2JqZWN0IG1hdGNoZXMgYSB0cnV0aCB0ZXN0LlxuICAvLyBBbGlhc2VkIGFzIGBhbnlgLlxuICBfLnNvbWUgPSBfLmFueSA9IGZ1bmN0aW9uKG9iaiwgcHJlZGljYXRlLCBjb250ZXh0KSB7XG4gICAgcHJlZGljYXRlID0gY2IocHJlZGljYXRlLCBjb250ZXh0KTtcbiAgICB2YXIga2V5cyA9ICFpc0FycmF5TGlrZShvYmopICYmIF8ua2V5cyhvYmopLFxuICAgICAgICBsZW5ndGggPSAoa2V5cyB8fCBvYmopLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICB2YXIgY3VycmVudEtleSA9IGtleXMgPyBrZXlzW2luZGV4XSA6IGluZGV4O1xuICAgICAgaWYgKHByZWRpY2F0ZShvYmpbY3VycmVudEtleV0sIGN1cnJlbnRLZXksIG9iaikpIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgLy8gRGV0ZXJtaW5lIGlmIHRoZSBhcnJheSBvciBvYmplY3QgY29udGFpbnMgYSBnaXZlbiBpdGVtICh1c2luZyBgPT09YCkuXG4gIC8vIEFsaWFzZWQgYXMgYGluY2x1ZGVzYCBhbmQgYGluY2x1ZGVgLlxuICBfLmNvbnRhaW5zID0gXy5pbmNsdWRlcyA9IF8uaW5jbHVkZSA9IGZ1bmN0aW9uKG9iaiwgaXRlbSwgZnJvbUluZGV4LCBndWFyZCkge1xuICAgIGlmICghaXNBcnJheUxpa2Uob2JqKSkgb2JqID0gXy52YWx1ZXMob2JqKTtcbiAgICBpZiAodHlwZW9mIGZyb21JbmRleCAhPSAnbnVtYmVyJyB8fCBndWFyZCkgZnJvbUluZGV4ID0gMDtcbiAgICByZXR1cm4gXy5pbmRleE9mKG9iaiwgaXRlbSwgZnJvbUluZGV4KSA+PSAwO1xuICB9O1xuXG4gIC8vIEludm9rZSBhIG1ldGhvZCAod2l0aCBhcmd1bWVudHMpIG9uIGV2ZXJ5IGl0ZW0gaW4gYSBjb2xsZWN0aW9uLlxuICBfLmludm9rZSA9IHJlc3RBcmd1bWVudHMoZnVuY3Rpb24ob2JqLCBwYXRoLCBhcmdzKSB7XG4gICAgdmFyIGNvbnRleHRQYXRoLCBmdW5jO1xuICAgIGlmIChfLmlzRnVuY3Rpb24ocGF0aCkpIHtcbiAgICAgIGZ1bmMgPSBwYXRoO1xuICAgIH0gZWxzZSBpZiAoXy5pc0FycmF5KHBhdGgpKSB7XG4gICAgICBjb250ZXh0UGF0aCA9IHBhdGguc2xpY2UoMCwgLTEpO1xuICAgICAgcGF0aCA9IHBhdGhbcGF0aC5sZW5ndGggLSAxXTtcbiAgICB9XG4gICAgcmV0dXJuIF8ubWFwKG9iaiwgZnVuY3Rpb24oY29udGV4dCkge1xuICAgICAgdmFyIG1ldGhvZCA9IGZ1bmM7XG4gICAgICBpZiAoIW1ldGhvZCkge1xuICAgICAgICBpZiAoY29udGV4dFBhdGggJiYgY29udGV4dFBhdGgubGVuZ3RoKSB7XG4gICAgICAgICAgY29udGV4dCA9IGRlZXBHZXQoY29udGV4dCwgY29udGV4dFBhdGgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb250ZXh0ID09IG51bGwpIHJldHVybiB2b2lkIDA7XG4gICAgICAgIG1ldGhvZCA9IGNvbnRleHRbcGF0aF07XG4gICAgICB9XG4gICAgICByZXR1cm4gbWV0aG9kID09IG51bGwgPyBtZXRob2QgOiBtZXRob2QuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIENvbnZlbmllbmNlIHZlcnNpb24gb2YgYSBjb21tb24gdXNlIGNhc2Ugb2YgYG1hcGA6IGZldGNoaW5nIGEgcHJvcGVydHkuXG4gIF8ucGx1Y2sgPSBmdW5jdGlvbihvYmosIGtleSkge1xuICAgIHJldHVybiBfLm1hcChvYmosIF8ucHJvcGVydHkoa2V5KSk7XG4gIH07XG5cbiAgLy8gQ29udmVuaWVuY2UgdmVyc2lvbiBvZiBhIGNvbW1vbiB1c2UgY2FzZSBvZiBgZmlsdGVyYDogc2VsZWN0aW5nIG9ubHkgb2JqZWN0c1xuICAvLyBjb250YWluaW5nIHNwZWNpZmljIGBrZXk6dmFsdWVgIHBhaXJzLlxuICBfLndoZXJlID0gZnVuY3Rpb24ob2JqLCBhdHRycykge1xuICAgIHJldHVybiBfLmZpbHRlcihvYmosIF8ubWF0Y2hlcihhdHRycykpO1xuICB9O1xuXG4gIC8vIENvbnZlbmllbmNlIHZlcnNpb24gb2YgYSBjb21tb24gdXNlIGNhc2Ugb2YgYGZpbmRgOiBnZXR0aW5nIHRoZSBmaXJzdCBvYmplY3RcbiAgLy8gY29udGFpbmluZyBzcGVjaWZpYyBga2V5OnZhbHVlYCBwYWlycy5cbiAgXy5maW5kV2hlcmUgPSBmdW5jdGlvbihvYmosIGF0dHJzKSB7XG4gICAgcmV0dXJuIF8uZmluZChvYmosIF8ubWF0Y2hlcihhdHRycykpO1xuICB9O1xuXG4gIC8vIFJldHVybiB0aGUgbWF4aW11bSBlbGVtZW50IChvciBlbGVtZW50LWJhc2VkIGNvbXB1dGF0aW9uKS5cbiAgXy5tYXggPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgdmFyIHJlc3VsdCA9IC1JbmZpbml0eSwgbGFzdENvbXB1dGVkID0gLUluZmluaXR5LFxuICAgICAgICB2YWx1ZSwgY29tcHV0ZWQ7XG4gICAgaWYgKGl0ZXJhdGVlID09IG51bGwgfHwgdHlwZW9mIGl0ZXJhdGVlID09ICdudW1iZXInICYmIHR5cGVvZiBvYmpbMF0gIT0gJ29iamVjdCcgJiYgb2JqICE9IG51bGwpIHtcbiAgICAgIG9iaiA9IGlzQXJyYXlMaWtlKG9iaikgPyBvYmogOiBfLnZhbHVlcyhvYmopO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IG9iai5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICB2YWx1ZSA9IG9ialtpXTtcbiAgICAgICAgaWYgKHZhbHVlICE9IG51bGwgJiYgdmFsdWUgPiByZXN1bHQpIHtcbiAgICAgICAgICByZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpdGVyYXRlZSA9IGNiKGl0ZXJhdGVlLCBjb250ZXh0KTtcbiAgICAgIF8uZWFjaChvYmosIGZ1bmN0aW9uKHYsIGluZGV4LCBsaXN0KSB7XG4gICAgICAgIGNvbXB1dGVkID0gaXRlcmF0ZWUodiwgaW5kZXgsIGxpc3QpO1xuICAgICAgICBpZiAoY29tcHV0ZWQgPiBsYXN0Q29tcHV0ZWQgfHwgY29tcHV0ZWQgPT09IC1JbmZpbml0eSAmJiByZXN1bHQgPT09IC1JbmZpbml0eSkge1xuICAgICAgICAgIHJlc3VsdCA9IHY7XG4gICAgICAgICAgbGFzdENvbXB1dGVkID0gY29tcHV0ZWQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIFJldHVybiB0aGUgbWluaW11bSBlbGVtZW50IChvciBlbGVtZW50LWJhc2VkIGNvbXB1dGF0aW9uKS5cbiAgXy5taW4gPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgdmFyIHJlc3VsdCA9IEluZmluaXR5LCBsYXN0Q29tcHV0ZWQgPSBJbmZpbml0eSxcbiAgICAgICAgdmFsdWUsIGNvbXB1dGVkO1xuICAgIGlmIChpdGVyYXRlZSA9PSBudWxsIHx8IHR5cGVvZiBpdGVyYXRlZSA9PSAnbnVtYmVyJyAmJiB0eXBlb2Ygb2JqWzBdICE9ICdvYmplY3QnICYmIG9iaiAhPSBudWxsKSB7XG4gICAgICBvYmogPSBpc0FycmF5TGlrZShvYmopID8gb2JqIDogXy52YWx1ZXMob2JqKTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBvYmoubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFsdWUgPSBvYmpbaV07XG4gICAgICAgIGlmICh2YWx1ZSAhPSBudWxsICYmIHZhbHVlIDwgcmVzdWx0KSB7XG4gICAgICAgICAgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaXRlcmF0ZWUgPSBjYihpdGVyYXRlZSwgY29udGV4dCk7XG4gICAgICBfLmVhY2gob2JqLCBmdW5jdGlvbih2LCBpbmRleCwgbGlzdCkge1xuICAgICAgICBjb21wdXRlZCA9IGl0ZXJhdGVlKHYsIGluZGV4LCBsaXN0KTtcbiAgICAgICAgaWYgKGNvbXB1dGVkIDwgbGFzdENvbXB1dGVkIHx8IGNvbXB1dGVkID09PSBJbmZpbml0eSAmJiByZXN1bHQgPT09IEluZmluaXR5KSB7XG4gICAgICAgICAgcmVzdWx0ID0gdjtcbiAgICAgICAgICBsYXN0Q29tcHV0ZWQgPSBjb21wdXRlZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLy8gU2h1ZmZsZSBhIGNvbGxlY3Rpb24uXG4gIF8uc2h1ZmZsZSA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiBfLnNhbXBsZShvYmosIEluZmluaXR5KTtcbiAgfTtcblxuICAvLyBTYW1wbGUgKipuKiogcmFuZG9tIHZhbHVlcyBmcm9tIGEgY29sbGVjdGlvbiB1c2luZyB0aGUgbW9kZXJuIHZlcnNpb24gb2YgdGhlXG4gIC8vIFtGaXNoZXItWWF0ZXMgc2h1ZmZsZV0oaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9GaXNoZXLigJNZYXRlc19zaHVmZmxlKS5cbiAgLy8gSWYgKipuKiogaXMgbm90IHNwZWNpZmllZCwgcmV0dXJucyBhIHNpbmdsZSByYW5kb20gZWxlbWVudC5cbiAgLy8gVGhlIGludGVybmFsIGBndWFyZGAgYXJndW1lbnQgYWxsb3dzIGl0IHRvIHdvcmsgd2l0aCBgbWFwYC5cbiAgXy5zYW1wbGUgPSBmdW5jdGlvbihvYmosIG4sIGd1YXJkKSB7XG4gICAgaWYgKG4gPT0gbnVsbCB8fCBndWFyZCkge1xuICAgICAgaWYgKCFpc0FycmF5TGlrZShvYmopKSBvYmogPSBfLnZhbHVlcyhvYmopO1xuICAgICAgcmV0dXJuIG9ialtfLnJhbmRvbShvYmoubGVuZ3RoIC0gMSldO1xuICAgIH1cbiAgICB2YXIgc2FtcGxlID0gaXNBcnJheUxpa2Uob2JqKSA/IF8uY2xvbmUob2JqKSA6IF8udmFsdWVzKG9iaik7XG4gICAgdmFyIGxlbmd0aCA9IGdldExlbmd0aChzYW1wbGUpO1xuICAgIG4gPSBNYXRoLm1heChNYXRoLm1pbihuLCBsZW5ndGgpLCAwKTtcbiAgICB2YXIgbGFzdCA9IGxlbmd0aCAtIDE7XG4gICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IG47IGluZGV4KyspIHtcbiAgICAgIHZhciByYW5kID0gXy5yYW5kb20oaW5kZXgsIGxhc3QpO1xuICAgICAgdmFyIHRlbXAgPSBzYW1wbGVbaW5kZXhdO1xuICAgICAgc2FtcGxlW2luZGV4XSA9IHNhbXBsZVtyYW5kXTtcbiAgICAgIHNhbXBsZVtyYW5kXSA9IHRlbXA7XG4gICAgfVxuICAgIHJldHVybiBzYW1wbGUuc2xpY2UoMCwgbik7XG4gIH07XG5cbiAgLy8gU29ydCB0aGUgb2JqZWN0J3MgdmFsdWVzIGJ5IGEgY3JpdGVyaW9uIHByb2R1Y2VkIGJ5IGFuIGl0ZXJhdGVlLlxuICBfLnNvcnRCeSA9IGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIGl0ZXJhdGVlID0gY2IoaXRlcmF0ZWUsIGNvbnRleHQpO1xuICAgIHJldHVybiBfLnBsdWNrKF8ubWFwKG9iaiwgZnVuY3Rpb24odmFsdWUsIGtleSwgbGlzdCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICBpbmRleDogaW5kZXgrKyxcbiAgICAgICAgY3JpdGVyaWE6IGl0ZXJhdGVlKHZhbHVlLCBrZXksIGxpc3QpXG4gICAgICB9O1xuICAgIH0pLnNvcnQoZnVuY3Rpb24obGVmdCwgcmlnaHQpIHtcbiAgICAgIHZhciBhID0gbGVmdC5jcml0ZXJpYTtcbiAgICAgIHZhciBiID0gcmlnaHQuY3JpdGVyaWE7XG4gICAgICBpZiAoYSAhPT0gYikge1xuICAgICAgICBpZiAoYSA+IGIgfHwgYSA9PT0gdm9pZCAwKSByZXR1cm4gMTtcbiAgICAgICAgaWYgKGEgPCBiIHx8IGIgPT09IHZvaWQgMCkgcmV0dXJuIC0xO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGxlZnQuaW5kZXggLSByaWdodC5pbmRleDtcbiAgICB9KSwgJ3ZhbHVlJyk7XG4gIH07XG5cbiAgLy8gQW4gaW50ZXJuYWwgZnVuY3Rpb24gdXNlZCBmb3IgYWdncmVnYXRlIFwiZ3JvdXAgYnlcIiBvcGVyYXRpb25zLlxuICB2YXIgZ3JvdXAgPSBmdW5jdGlvbihiZWhhdmlvciwgcGFydGl0aW9uKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICAgIHZhciByZXN1bHQgPSBwYXJ0aXRpb24gPyBbW10sIFtdXSA6IHt9O1xuICAgICAgaXRlcmF0ZWUgPSBjYihpdGVyYXRlZSwgY29udGV4dCk7XG4gICAgICBfLmVhY2gob2JqLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgpIHtcbiAgICAgICAgdmFyIGtleSA9IGl0ZXJhdGVlKHZhbHVlLCBpbmRleCwgb2JqKTtcbiAgICAgICAgYmVoYXZpb3IocmVzdWx0LCB2YWx1ZSwga2V5KTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICB9O1xuXG4gIC8vIEdyb3VwcyB0aGUgb2JqZWN0J3MgdmFsdWVzIGJ5IGEgY3JpdGVyaW9uLiBQYXNzIGVpdGhlciBhIHN0cmluZyBhdHRyaWJ1dGVcbiAgLy8gdG8gZ3JvdXAgYnksIG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBjcml0ZXJpb24uXG4gIF8uZ3JvdXBCeSA9IGdyb3VwKGZ1bmN0aW9uKHJlc3VsdCwgdmFsdWUsIGtleSkge1xuICAgIGlmIChfLmhhcyhyZXN1bHQsIGtleSkpIHJlc3VsdFtrZXldLnB1c2godmFsdWUpOyBlbHNlIHJlc3VsdFtrZXldID0gW3ZhbHVlXTtcbiAgfSk7XG5cbiAgLy8gSW5kZXhlcyB0aGUgb2JqZWN0J3MgdmFsdWVzIGJ5IGEgY3JpdGVyaW9uLCBzaW1pbGFyIHRvIGBncm91cEJ5YCwgYnV0IGZvclxuICAvLyB3aGVuIHlvdSBrbm93IHRoYXQgeW91ciBpbmRleCB2YWx1ZXMgd2lsbCBiZSB1bmlxdWUuXG4gIF8uaW5kZXhCeSA9IGdyb3VwKGZ1bmN0aW9uKHJlc3VsdCwgdmFsdWUsIGtleSkge1xuICAgIHJlc3VsdFtrZXldID0gdmFsdWU7XG4gIH0pO1xuXG4gIC8vIENvdW50cyBpbnN0YW5jZXMgb2YgYW4gb2JqZWN0IHRoYXQgZ3JvdXAgYnkgYSBjZXJ0YWluIGNyaXRlcmlvbi4gUGFzc1xuICAvLyBlaXRoZXIgYSBzdHJpbmcgYXR0cmlidXRlIHRvIGNvdW50IGJ5LCBvciBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGVcbiAgLy8gY3JpdGVyaW9uLlxuICBfLmNvdW50QnkgPSBncm91cChmdW5jdGlvbihyZXN1bHQsIHZhbHVlLCBrZXkpIHtcbiAgICBpZiAoXy5oYXMocmVzdWx0LCBrZXkpKSByZXN1bHRba2V5XSsrOyBlbHNlIHJlc3VsdFtrZXldID0gMTtcbiAgfSk7XG5cbiAgdmFyIHJlU3RyU3ltYm9sID0gL1teXFx1ZDgwMC1cXHVkZmZmXXxbXFx1ZDgwMC1cXHVkYmZmXVtcXHVkYzAwLVxcdWRmZmZdfFtcXHVkODAwLVxcdWRmZmZdL2c7XG4gIC8vIFNhZmVseSBjcmVhdGUgYSByZWFsLCBsaXZlIGFycmF5IGZyb20gYW55dGhpbmcgaXRlcmFibGUuXG4gIF8udG9BcnJheSA9IGZ1bmN0aW9uKG9iaikge1xuICAgIGlmICghb2JqKSByZXR1cm4gW107XG4gICAgaWYgKF8uaXNBcnJheShvYmopKSByZXR1cm4gc2xpY2UuY2FsbChvYmopO1xuICAgIGlmIChfLmlzU3RyaW5nKG9iaikpIHtcbiAgICAgIC8vIEtlZXAgc3Vycm9nYXRlIHBhaXIgY2hhcmFjdGVycyB0b2dldGhlclxuICAgICAgcmV0dXJuIG9iai5tYXRjaChyZVN0clN5bWJvbCk7XG4gICAgfVxuICAgIGlmIChpc0FycmF5TGlrZShvYmopKSByZXR1cm4gXy5tYXAob2JqLCBfLmlkZW50aXR5KTtcbiAgICByZXR1cm4gXy52YWx1ZXMob2JqKTtcbiAgfTtcblxuICAvLyBSZXR1cm4gdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiBhbiBvYmplY3QuXG4gIF8uc2l6ZSA9IGZ1bmN0aW9uKG9iaikge1xuICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIDA7XG4gICAgcmV0dXJuIGlzQXJyYXlMaWtlKG9iaikgPyBvYmoubGVuZ3RoIDogXy5rZXlzKG9iaikubGVuZ3RoO1xuICB9O1xuXG4gIC8vIFNwbGl0IGEgY29sbGVjdGlvbiBpbnRvIHR3byBhcnJheXM6IG9uZSB3aG9zZSBlbGVtZW50cyBhbGwgc2F0aXNmeSB0aGUgZ2l2ZW5cbiAgLy8gcHJlZGljYXRlLCBhbmQgb25lIHdob3NlIGVsZW1lbnRzIGFsbCBkbyBub3Qgc2F0aXNmeSB0aGUgcHJlZGljYXRlLlxuICBfLnBhcnRpdGlvbiA9IGdyb3VwKGZ1bmN0aW9uKHJlc3VsdCwgdmFsdWUsIHBhc3MpIHtcbiAgICByZXN1bHRbcGFzcyA/IDAgOiAxXS5wdXNoKHZhbHVlKTtcbiAgfSwgdHJ1ZSk7XG5cbiAgLy8gQXJyYXkgRnVuY3Rpb25zXG4gIC8vIC0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIEdldCB0aGUgZmlyc3QgZWxlbWVudCBvZiBhbiBhcnJheS4gUGFzc2luZyAqKm4qKiB3aWxsIHJldHVybiB0aGUgZmlyc3QgTlxuICAvLyB2YWx1ZXMgaW4gdGhlIGFycmF5LiBBbGlhc2VkIGFzIGBoZWFkYCBhbmQgYHRha2VgLiBUaGUgKipndWFyZCoqIGNoZWNrXG4gIC8vIGFsbG93cyBpdCB0byB3b3JrIHdpdGggYF8ubWFwYC5cbiAgXy5maXJzdCA9IF8uaGVhZCA9IF8udGFrZSA9IGZ1bmN0aW9uKGFycmF5LCBuLCBndWFyZCkge1xuICAgIGlmIChhcnJheSA9PSBudWxsIHx8IGFycmF5Lmxlbmd0aCA8IDEpIHJldHVybiB2b2lkIDA7XG4gICAgaWYgKG4gPT0gbnVsbCB8fCBndWFyZCkgcmV0dXJuIGFycmF5WzBdO1xuICAgIHJldHVybiBfLmluaXRpYWwoYXJyYXksIGFycmF5Lmxlbmd0aCAtIG4pO1xuICB9O1xuXG4gIC8vIFJldHVybnMgZXZlcnl0aGluZyBidXQgdGhlIGxhc3QgZW50cnkgb2YgdGhlIGFycmF5LiBFc3BlY2lhbGx5IHVzZWZ1bCBvblxuICAvLyB0aGUgYXJndW1lbnRzIG9iamVjdC4gUGFzc2luZyAqKm4qKiB3aWxsIHJldHVybiBhbGwgdGhlIHZhbHVlcyBpblxuICAvLyB0aGUgYXJyYXksIGV4Y2x1ZGluZyB0aGUgbGFzdCBOLlxuICBfLmluaXRpYWwgPSBmdW5jdGlvbihhcnJheSwgbiwgZ3VhcmQpIHtcbiAgICByZXR1cm4gc2xpY2UuY2FsbChhcnJheSwgMCwgTWF0aC5tYXgoMCwgYXJyYXkubGVuZ3RoIC0gKG4gPT0gbnVsbCB8fCBndWFyZCA/IDEgOiBuKSkpO1xuICB9O1xuXG4gIC8vIEdldCB0aGUgbGFzdCBlbGVtZW50IG9mIGFuIGFycmF5LiBQYXNzaW5nICoqbioqIHdpbGwgcmV0dXJuIHRoZSBsYXN0IE5cbiAgLy8gdmFsdWVzIGluIHRoZSBhcnJheS5cbiAgXy5sYXN0ID0gZnVuY3Rpb24oYXJyYXksIG4sIGd1YXJkKSB7XG4gICAgaWYgKGFycmF5ID09IG51bGwgfHwgYXJyYXkubGVuZ3RoIDwgMSkgcmV0dXJuIHZvaWQgMDtcbiAgICBpZiAobiA9PSBudWxsIHx8IGd1YXJkKSByZXR1cm4gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMV07XG4gICAgcmV0dXJuIF8ucmVzdChhcnJheSwgTWF0aC5tYXgoMCwgYXJyYXkubGVuZ3RoIC0gbikpO1xuICB9O1xuXG4gIC8vIFJldHVybnMgZXZlcnl0aGluZyBidXQgdGhlIGZpcnN0IGVudHJ5IG9mIHRoZSBhcnJheS4gQWxpYXNlZCBhcyBgdGFpbGAgYW5kIGBkcm9wYC5cbiAgLy8gRXNwZWNpYWxseSB1c2VmdWwgb24gdGhlIGFyZ3VtZW50cyBvYmplY3QuIFBhc3NpbmcgYW4gKipuKiogd2lsbCByZXR1cm5cbiAgLy8gdGhlIHJlc3QgTiB2YWx1ZXMgaW4gdGhlIGFycmF5LlxuICBfLnJlc3QgPSBfLnRhaWwgPSBfLmRyb3AgPSBmdW5jdGlvbihhcnJheSwgbiwgZ3VhcmQpIHtcbiAgICByZXR1cm4gc2xpY2UuY2FsbChhcnJheSwgbiA9PSBudWxsIHx8IGd1YXJkID8gMSA6IG4pO1xuICB9O1xuXG4gIC8vIFRyaW0gb3V0IGFsbCBmYWxzeSB2YWx1ZXMgZnJvbSBhbiBhcnJheS5cbiAgXy5jb21wYWN0ID0gZnVuY3Rpb24oYXJyYXkpIHtcbiAgICByZXR1cm4gXy5maWx0ZXIoYXJyYXksIEJvb2xlYW4pO1xuICB9O1xuXG4gIC8vIEludGVybmFsIGltcGxlbWVudGF0aW9uIG9mIGEgcmVjdXJzaXZlIGBmbGF0dGVuYCBmdW5jdGlvbi5cbiAgdmFyIGZsYXR0ZW4gPSBmdW5jdGlvbihpbnB1dCwgc2hhbGxvdywgc3RyaWN0LCBvdXRwdXQpIHtcbiAgICBvdXRwdXQgPSBvdXRwdXQgfHwgW107XG4gICAgdmFyIGlkeCA9IG91dHB1dC5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGdldExlbmd0aChpbnB1dCk7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHZhbHVlID0gaW5wdXRbaV07XG4gICAgICBpZiAoaXNBcnJheUxpa2UodmFsdWUpICYmIChfLmlzQXJyYXkodmFsdWUpIHx8IF8uaXNBcmd1bWVudHModmFsdWUpKSkge1xuICAgICAgICAvLyBGbGF0dGVuIGN1cnJlbnQgbGV2ZWwgb2YgYXJyYXkgb3IgYXJndW1lbnRzIG9iamVjdC5cbiAgICAgICAgaWYgKHNoYWxsb3cpIHtcbiAgICAgICAgICB2YXIgaiA9IDAsIGxlbiA9IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgICB3aGlsZSAoaiA8IGxlbikgb3V0cHV0W2lkeCsrXSA9IHZhbHVlW2orK107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmxhdHRlbih2YWx1ZSwgc2hhbGxvdywgc3RyaWN0LCBvdXRwdXQpO1xuICAgICAgICAgIGlkeCA9IG91dHB1dC5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoIXN0cmljdCkge1xuICAgICAgICBvdXRwdXRbaWR4KytdID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH07XG5cbiAgLy8gRmxhdHRlbiBvdXQgYW4gYXJyYXksIGVpdGhlciByZWN1cnNpdmVseSAoYnkgZGVmYXVsdCksIG9yIGp1c3Qgb25lIGxldmVsLlxuICBfLmZsYXR0ZW4gPSBmdW5jdGlvbihhcnJheSwgc2hhbGxvdykge1xuICAgIHJldHVybiBmbGF0dGVuKGFycmF5LCBzaGFsbG93LCBmYWxzZSk7XG4gIH07XG5cbiAgLy8gUmV0dXJuIGEgdmVyc2lvbiBvZiB0aGUgYXJyYXkgdGhhdCBkb2VzIG5vdCBjb250YWluIHRoZSBzcGVjaWZpZWQgdmFsdWUocykuXG4gIF8ud2l0aG91dCA9IHJlc3RBcmd1bWVudHMoZnVuY3Rpb24oYXJyYXksIG90aGVyQXJyYXlzKSB7XG4gICAgcmV0dXJuIF8uZGlmZmVyZW5jZShhcnJheSwgb3RoZXJBcnJheXMpO1xuICB9KTtcblxuICAvLyBQcm9kdWNlIGEgZHVwbGljYXRlLWZyZWUgdmVyc2lvbiBvZiB0aGUgYXJyYXkuIElmIHRoZSBhcnJheSBoYXMgYWxyZWFkeVxuICAvLyBiZWVuIHNvcnRlZCwgeW91IGhhdmUgdGhlIG9wdGlvbiBvZiB1c2luZyBhIGZhc3RlciBhbGdvcml0aG0uXG4gIC8vIFRoZSBmYXN0ZXIgYWxnb3JpdGhtIHdpbGwgbm90IHdvcmsgd2l0aCBhbiBpdGVyYXRlZSBpZiB0aGUgaXRlcmF0ZWVcbiAgLy8gaXMgbm90IGEgb25lLXRvLW9uZSBmdW5jdGlvbiwgc28gcHJvdmlkaW5nIGFuIGl0ZXJhdGVlIHdpbGwgZGlzYWJsZVxuICAvLyB0aGUgZmFzdGVyIGFsZ29yaXRobS5cbiAgLy8gQWxpYXNlZCBhcyBgdW5pcXVlYC5cbiAgXy51bmlxID0gXy51bmlxdWUgPSBmdW5jdGlvbihhcnJheSwgaXNTb3J0ZWQsIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgaWYgKCFfLmlzQm9vbGVhbihpc1NvcnRlZCkpIHtcbiAgICAgIGNvbnRleHQgPSBpdGVyYXRlZTtcbiAgICAgIGl0ZXJhdGVlID0gaXNTb3J0ZWQ7XG4gICAgICBpc1NvcnRlZCA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAoaXRlcmF0ZWUgIT0gbnVsbCkgaXRlcmF0ZWUgPSBjYihpdGVyYXRlZSwgY29udGV4dCk7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHZhciBzZWVuID0gW107XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGdldExlbmd0aChhcnJheSk7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHZhbHVlID0gYXJyYXlbaV0sXG4gICAgICAgICAgY29tcHV0ZWQgPSBpdGVyYXRlZSA/IGl0ZXJhdGVlKHZhbHVlLCBpLCBhcnJheSkgOiB2YWx1ZTtcbiAgICAgIGlmIChpc1NvcnRlZCAmJiAhaXRlcmF0ZWUpIHtcbiAgICAgICAgaWYgKCFpIHx8IHNlZW4gIT09IGNvbXB1dGVkKSByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgICAgIHNlZW4gPSBjb21wdXRlZDtcbiAgICAgIH0gZWxzZSBpZiAoaXRlcmF0ZWUpIHtcbiAgICAgICAgaWYgKCFfLmNvbnRhaW5zKHNlZW4sIGNvbXB1dGVkKSkge1xuICAgICAgICAgIHNlZW4ucHVzaChjb21wdXRlZCk7XG4gICAgICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKCFfLmNvbnRhaW5zKHJlc3VsdCwgdmFsdWUpKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBQcm9kdWNlIGFuIGFycmF5IHRoYXQgY29udGFpbnMgdGhlIHVuaW9uOiBlYWNoIGRpc3RpbmN0IGVsZW1lbnQgZnJvbSBhbGwgb2ZcbiAgLy8gdGhlIHBhc3NlZC1pbiBhcnJheXMuXG4gIF8udW5pb24gPSByZXN0QXJndW1lbnRzKGZ1bmN0aW9uKGFycmF5cykge1xuICAgIHJldHVybiBfLnVuaXEoZmxhdHRlbihhcnJheXMsIHRydWUsIHRydWUpKTtcbiAgfSk7XG5cbiAgLy8gUHJvZHVjZSBhbiBhcnJheSB0aGF0IGNvbnRhaW5zIGV2ZXJ5IGl0ZW0gc2hhcmVkIGJldHdlZW4gYWxsIHRoZVxuICAvLyBwYXNzZWQtaW4gYXJyYXlzLlxuICBfLmludGVyc2VjdGlvbiA9IGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHZhciBhcmdzTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gZ2V0TGVuZ3RoKGFycmF5KTsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IGFycmF5W2ldO1xuICAgICAgaWYgKF8uY29udGFpbnMocmVzdWx0LCBpdGVtKSkgY29udGludWU7XG4gICAgICB2YXIgajtcbiAgICAgIGZvciAoaiA9IDE7IGogPCBhcmdzTGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKCFfLmNvbnRhaW5zKGFyZ3VtZW50c1tqXSwgaXRlbSkpIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKGogPT09IGFyZ3NMZW5ndGgpIHJlc3VsdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIFRha2UgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiBvbmUgYXJyYXkgYW5kIGEgbnVtYmVyIG9mIG90aGVyIGFycmF5cy5cbiAgLy8gT25seSB0aGUgZWxlbWVudHMgcHJlc2VudCBpbiBqdXN0IHRoZSBmaXJzdCBhcnJheSB3aWxsIHJlbWFpbi5cbiAgXy5kaWZmZXJlbmNlID0gcmVzdEFyZ3VtZW50cyhmdW5jdGlvbihhcnJheSwgcmVzdCkge1xuICAgIHJlc3QgPSBmbGF0dGVuKHJlc3QsIHRydWUsIHRydWUpO1xuICAgIHJldHVybiBfLmZpbHRlcihhcnJheSwgZnVuY3Rpb24odmFsdWUpe1xuICAgICAgcmV0dXJuICFfLmNvbnRhaW5zKHJlc3QsIHZhbHVlKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgLy8gQ29tcGxlbWVudCBvZiBfLnppcC4gVW56aXAgYWNjZXB0cyBhbiBhcnJheSBvZiBhcnJheXMgYW5kIGdyb3Vwc1xuICAvLyBlYWNoIGFycmF5J3MgZWxlbWVudHMgb24gc2hhcmVkIGluZGljZXMuXG4gIF8udW56aXAgPSBmdW5jdGlvbihhcnJheSkge1xuICAgIHZhciBsZW5ndGggPSBhcnJheSAmJiBfLm1heChhcnJheSwgZ2V0TGVuZ3RoKS5sZW5ndGggfHwgMDtcbiAgICB2YXIgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKTtcblxuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIHJlc3VsdFtpbmRleF0gPSBfLnBsdWNrKGFycmF5LCBpbmRleCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLy8gWmlwIHRvZ2V0aGVyIG11bHRpcGxlIGxpc3RzIGludG8gYSBzaW5nbGUgYXJyYXkgLS0gZWxlbWVudHMgdGhhdCBzaGFyZVxuICAvLyBhbiBpbmRleCBnbyB0b2dldGhlci5cbiAgXy56aXAgPSByZXN0QXJndW1lbnRzKF8udW56aXApO1xuXG4gIC8vIENvbnZlcnRzIGxpc3RzIGludG8gb2JqZWN0cy4gUGFzcyBlaXRoZXIgYSBzaW5nbGUgYXJyYXkgb2YgYFtrZXksIHZhbHVlXWBcbiAgLy8gcGFpcnMsIG9yIHR3byBwYXJhbGxlbCBhcnJheXMgb2YgdGhlIHNhbWUgbGVuZ3RoIC0tIG9uZSBvZiBrZXlzLCBhbmQgb25lIG9mXG4gIC8vIHRoZSBjb3JyZXNwb25kaW5nIHZhbHVlcy4gUGFzc2luZyBieSBwYWlycyBpcyB0aGUgcmV2ZXJzZSBvZiBfLnBhaXJzLlxuICBfLm9iamVjdCA9IGZ1bmN0aW9uKGxpc3QsIHZhbHVlcykge1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gZ2V0TGVuZ3RoKGxpc3QpOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh2YWx1ZXMpIHtcbiAgICAgICAgcmVzdWx0W2xpc3RbaV1dID0gdmFsdWVzW2ldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0W2xpc3RbaV1bMF1dID0gbGlzdFtpXVsxXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBHZW5lcmF0b3IgZnVuY3Rpb24gdG8gY3JlYXRlIHRoZSBmaW5kSW5kZXggYW5kIGZpbmRMYXN0SW5kZXggZnVuY3Rpb25zLlxuICB2YXIgY3JlYXRlUHJlZGljYXRlSW5kZXhGaW5kZXIgPSBmdW5jdGlvbihkaXIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oYXJyYXksIHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgICAgcHJlZGljYXRlID0gY2IocHJlZGljYXRlLCBjb250ZXh0KTtcbiAgICAgIHZhciBsZW5ndGggPSBnZXRMZW5ndGgoYXJyYXkpO1xuICAgICAgdmFyIGluZGV4ID0gZGlyID4gMCA/IDAgOiBsZW5ndGggLSAxO1xuICAgICAgZm9yICg7IGluZGV4ID49IDAgJiYgaW5kZXggPCBsZW5ndGg7IGluZGV4ICs9IGRpcikge1xuICAgICAgICBpZiAocHJlZGljYXRlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSkgcmV0dXJuIGluZGV4O1xuICAgICAgfVxuICAgICAgcmV0dXJuIC0xO1xuICAgIH07XG4gIH07XG5cbiAgLy8gUmV0dXJucyB0aGUgZmlyc3QgaW5kZXggb24gYW4gYXJyYXktbGlrZSB0aGF0IHBhc3NlcyBhIHByZWRpY2F0ZSB0ZXN0LlxuICBfLmZpbmRJbmRleCA9IGNyZWF0ZVByZWRpY2F0ZUluZGV4RmluZGVyKDEpO1xuICBfLmZpbmRMYXN0SW5kZXggPSBjcmVhdGVQcmVkaWNhdGVJbmRleEZpbmRlcigtMSk7XG5cbiAgLy8gVXNlIGEgY29tcGFyYXRvciBmdW5jdGlvbiB0byBmaWd1cmUgb3V0IHRoZSBzbWFsbGVzdCBpbmRleCBhdCB3aGljaFxuICAvLyBhbiBvYmplY3Qgc2hvdWxkIGJlIGluc2VydGVkIHNvIGFzIHRvIG1haW50YWluIG9yZGVyLiBVc2VzIGJpbmFyeSBzZWFyY2guXG4gIF8uc29ydGVkSW5kZXggPSBmdW5jdGlvbihhcnJheSwgb2JqLCBpdGVyYXRlZSwgY29udGV4dCkge1xuICAgIGl0ZXJhdGVlID0gY2IoaXRlcmF0ZWUsIGNvbnRleHQsIDEpO1xuICAgIHZhciB2YWx1ZSA9IGl0ZXJhdGVlKG9iaik7XG4gICAgdmFyIGxvdyA9IDAsIGhpZ2ggPSBnZXRMZW5ndGgoYXJyYXkpO1xuICAgIHdoaWxlIChsb3cgPCBoaWdoKSB7XG4gICAgICB2YXIgbWlkID0gTWF0aC5mbG9vcigobG93ICsgaGlnaCkgLyAyKTtcbiAgICAgIGlmIChpdGVyYXRlZShhcnJheVttaWRdKSA8IHZhbHVlKSBsb3cgPSBtaWQgKyAxOyBlbHNlIGhpZ2ggPSBtaWQ7XG4gICAgfVxuICAgIHJldHVybiBsb3c7XG4gIH07XG5cbiAgLy8gR2VuZXJhdG9yIGZ1bmN0aW9uIHRvIGNyZWF0ZSB0aGUgaW5kZXhPZiBhbmQgbGFzdEluZGV4T2YgZnVuY3Rpb25zLlxuICB2YXIgY3JlYXRlSW5kZXhGaW5kZXIgPSBmdW5jdGlvbihkaXIsIHByZWRpY2F0ZUZpbmQsIHNvcnRlZEluZGV4KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGFycmF5LCBpdGVtLCBpZHgpIHtcbiAgICAgIHZhciBpID0gMCwgbGVuZ3RoID0gZ2V0TGVuZ3RoKGFycmF5KTtcbiAgICAgIGlmICh0eXBlb2YgaWR4ID09ICdudW1iZXInKSB7XG4gICAgICAgIGlmIChkaXIgPiAwKSB7XG4gICAgICAgICAgaSA9IGlkeCA+PSAwID8gaWR4IDogTWF0aC5tYXgoaWR4ICsgbGVuZ3RoLCBpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZW5ndGggPSBpZHggPj0gMCA/IE1hdGgubWluKGlkeCArIDEsIGxlbmd0aCkgOiBpZHggKyBsZW5ndGggKyAxO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHNvcnRlZEluZGV4ICYmIGlkeCAmJiBsZW5ndGgpIHtcbiAgICAgICAgaWR4ID0gc29ydGVkSW5kZXgoYXJyYXksIGl0ZW0pO1xuICAgICAgICByZXR1cm4gYXJyYXlbaWR4XSA9PT0gaXRlbSA/IGlkeCA6IC0xO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW0gIT09IGl0ZW0pIHtcbiAgICAgICAgaWR4ID0gcHJlZGljYXRlRmluZChzbGljZS5jYWxsKGFycmF5LCBpLCBsZW5ndGgpLCBfLmlzTmFOKTtcbiAgICAgICAgcmV0dXJuIGlkeCA+PSAwID8gaWR4ICsgaSA6IC0xO1xuICAgICAgfVxuICAgICAgZm9yIChpZHggPSBkaXIgPiAwID8gaSA6IGxlbmd0aCAtIDE7IGlkeCA+PSAwICYmIGlkeCA8IGxlbmd0aDsgaWR4ICs9IGRpcikge1xuICAgICAgICBpZiAoYXJyYXlbaWR4XSA9PT0gaXRlbSkgcmV0dXJuIGlkeDtcbiAgICAgIH1cbiAgICAgIHJldHVybiAtMTtcbiAgICB9O1xuICB9O1xuXG4gIC8vIFJldHVybiB0aGUgcG9zaXRpb24gb2YgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgYW4gaXRlbSBpbiBhbiBhcnJheSxcbiAgLy8gb3IgLTEgaWYgdGhlIGl0ZW0gaXMgbm90IGluY2x1ZGVkIGluIHRoZSBhcnJheS5cbiAgLy8gSWYgdGhlIGFycmF5IGlzIGxhcmdlIGFuZCBhbHJlYWR5IGluIHNvcnQgb3JkZXIsIHBhc3MgYHRydWVgXG4gIC8vIGZvciAqKmlzU29ydGVkKiogdG8gdXNlIGJpbmFyeSBzZWFyY2guXG4gIF8uaW5kZXhPZiA9IGNyZWF0ZUluZGV4RmluZGVyKDEsIF8uZmluZEluZGV4LCBfLnNvcnRlZEluZGV4KTtcbiAgXy5sYXN0SW5kZXhPZiA9IGNyZWF0ZUluZGV4RmluZGVyKC0xLCBfLmZpbmRMYXN0SW5kZXgpO1xuXG4gIC8vIEdlbmVyYXRlIGFuIGludGVnZXIgQXJyYXkgY29udGFpbmluZyBhbiBhcml0aG1ldGljIHByb2dyZXNzaW9uLiBBIHBvcnQgb2ZcbiAgLy8gdGhlIG5hdGl2ZSBQeXRob24gYHJhbmdlKClgIGZ1bmN0aW9uLiBTZWVcbiAgLy8gW3RoZSBQeXRob24gZG9jdW1lbnRhdGlvbl0oaHR0cDovL2RvY3MucHl0aG9uLm9yZy9saWJyYXJ5L2Z1bmN0aW9ucy5odG1sI3JhbmdlKS5cbiAgXy5yYW5nZSA9IGZ1bmN0aW9uKHN0YXJ0LCBzdG9wLCBzdGVwKSB7XG4gICAgaWYgKHN0b3AgPT0gbnVsbCkge1xuICAgICAgc3RvcCA9IHN0YXJ0IHx8IDA7XG4gICAgICBzdGFydCA9IDA7XG4gICAgfVxuICAgIGlmICghc3RlcCkge1xuICAgICAgc3RlcCA9IHN0b3AgPCBzdGFydCA/IC0xIDogMTtcbiAgICB9XG5cbiAgICB2YXIgbGVuZ3RoID0gTWF0aC5tYXgoTWF0aC5jZWlsKChzdG9wIC0gc3RhcnQpIC8gc3RlcCksIDApO1xuICAgIHZhciByYW5nZSA9IEFycmF5KGxlbmd0aCk7XG5cbiAgICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCBsZW5ndGg7IGlkeCsrLCBzdGFydCArPSBzdGVwKSB7XG4gICAgICByYW5nZVtpZHhdID0gc3RhcnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJhbmdlO1xuICB9O1xuXG4gIC8vIENodW5rIGEgc2luZ2xlIGFycmF5IGludG8gbXVsdGlwbGUgYXJyYXlzLCBlYWNoIGNvbnRhaW5pbmcgYGNvdW50YCBvciBmZXdlclxuICAvLyBpdGVtcy5cbiAgXy5jaHVuayA9IGZ1bmN0aW9uKGFycmF5LCBjb3VudCkge1xuICAgIGlmIChjb3VudCA9PSBudWxsIHx8IGNvdW50IDwgMSkgcmV0dXJuIFtdO1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICB2YXIgaSA9IDAsIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgICB3aGlsZSAoaSA8IGxlbmd0aCkge1xuICAgICAgcmVzdWx0LnB1c2goc2xpY2UuY2FsbChhcnJheSwgaSwgaSArPSBjb3VudCkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIEZ1bmN0aW9uIChhaGVtKSBGdW5jdGlvbnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gRGV0ZXJtaW5lcyB3aGV0aGVyIHRvIGV4ZWN1dGUgYSBmdW5jdGlvbiBhcyBhIGNvbnN0cnVjdG9yXG4gIC8vIG9yIGEgbm9ybWFsIGZ1bmN0aW9uIHdpdGggdGhlIHByb3ZpZGVkIGFyZ3VtZW50cy5cbiAgdmFyIGV4ZWN1dGVCb3VuZCA9IGZ1bmN0aW9uKHNvdXJjZUZ1bmMsIGJvdW5kRnVuYywgY29udGV4dCwgY2FsbGluZ0NvbnRleHQsIGFyZ3MpIHtcbiAgICBpZiAoIShjYWxsaW5nQ29udGV4dCBpbnN0YW5jZW9mIGJvdW5kRnVuYykpIHJldHVybiBzb3VyY2VGdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgIHZhciBzZWxmID0gYmFzZUNyZWF0ZShzb3VyY2VGdW5jLnByb3RvdHlwZSk7XG4gICAgdmFyIHJlc3VsdCA9IHNvdXJjZUZ1bmMuYXBwbHkoc2VsZiwgYXJncyk7XG4gICAgaWYgKF8uaXNPYmplY3QocmVzdWx0KSkgcmV0dXJuIHJlc3VsdDtcbiAgICByZXR1cm4gc2VsZjtcbiAgfTtcblxuICAvLyBDcmVhdGUgYSBmdW5jdGlvbiBib3VuZCB0byBhIGdpdmVuIG9iamVjdCAoYXNzaWduaW5nIGB0aGlzYCwgYW5kIGFyZ3VtZW50cyxcbiAgLy8gb3B0aW9uYWxseSkuIERlbGVnYXRlcyB0byAqKkVDTUFTY3JpcHQgNSoqJ3MgbmF0aXZlIGBGdW5jdGlvbi5iaW5kYCBpZlxuICAvLyBhdmFpbGFibGUuXG4gIF8uYmluZCA9IHJlc3RBcmd1bWVudHMoZnVuY3Rpb24oZnVuYywgY29udGV4dCwgYXJncykge1xuICAgIGlmICghXy5pc0Z1bmN0aW9uKGZ1bmMpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdCaW5kIG11c3QgYmUgY2FsbGVkIG9uIGEgZnVuY3Rpb24nKTtcbiAgICB2YXIgYm91bmQgPSByZXN0QXJndW1lbnRzKGZ1bmN0aW9uKGNhbGxBcmdzKSB7XG4gICAgICByZXR1cm4gZXhlY3V0ZUJvdW5kKGZ1bmMsIGJvdW5kLCBjb250ZXh0LCB0aGlzLCBhcmdzLmNvbmNhdChjYWxsQXJncykpO1xuICAgIH0pO1xuICAgIHJldHVybiBib3VuZDtcbiAgfSk7XG5cbiAgLy8gUGFydGlhbGx5IGFwcGx5IGEgZnVuY3Rpb24gYnkgY3JlYXRpbmcgYSB2ZXJzaW9uIHRoYXQgaGFzIGhhZCBzb21lIG9mIGl0c1xuICAvLyBhcmd1bWVudHMgcHJlLWZpbGxlZCwgd2l0aG91dCBjaGFuZ2luZyBpdHMgZHluYW1pYyBgdGhpc2AgY29udGV4dC4gXyBhY3RzXG4gIC8vIGFzIGEgcGxhY2Vob2xkZXIgYnkgZGVmYXVsdCwgYWxsb3dpbmcgYW55IGNvbWJpbmF0aW9uIG9mIGFyZ3VtZW50cyB0byBiZVxuICAvLyBwcmUtZmlsbGVkLiBTZXQgYF8ucGFydGlhbC5wbGFjZWhvbGRlcmAgZm9yIGEgY3VzdG9tIHBsYWNlaG9sZGVyIGFyZ3VtZW50LlxuICBfLnBhcnRpYWwgPSByZXN0QXJndW1lbnRzKGZ1bmN0aW9uKGZ1bmMsIGJvdW5kQXJncykge1xuICAgIHZhciBwbGFjZWhvbGRlciA9IF8ucGFydGlhbC5wbGFjZWhvbGRlcjtcbiAgICB2YXIgYm91bmQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBwb3NpdGlvbiA9IDAsIGxlbmd0aCA9IGJvdW5kQXJncy5sZW5ndGg7XG4gICAgICB2YXIgYXJncyA9IEFycmF5KGxlbmd0aCk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGFyZ3NbaV0gPSBib3VuZEFyZ3NbaV0gPT09IHBsYWNlaG9sZGVyID8gYXJndW1lbnRzW3Bvc2l0aW9uKytdIDogYm91bmRBcmdzW2ldO1xuICAgICAgfVxuICAgICAgd2hpbGUgKHBvc2l0aW9uIDwgYXJndW1lbnRzLmxlbmd0aCkgYXJncy5wdXNoKGFyZ3VtZW50c1twb3NpdGlvbisrXSk7XG4gICAgICByZXR1cm4gZXhlY3V0ZUJvdW5kKGZ1bmMsIGJvdW5kLCB0aGlzLCB0aGlzLCBhcmdzKTtcbiAgICB9O1xuICAgIHJldHVybiBib3VuZDtcbiAgfSk7XG5cbiAgXy5wYXJ0aWFsLnBsYWNlaG9sZGVyID0gXztcblxuICAvLyBCaW5kIGEgbnVtYmVyIG9mIGFuIG9iamVjdCdzIG1ldGhvZHMgdG8gdGhhdCBvYmplY3QuIFJlbWFpbmluZyBhcmd1bWVudHNcbiAgLy8gYXJlIHRoZSBtZXRob2QgbmFtZXMgdG8gYmUgYm91bmQuIFVzZWZ1bCBmb3IgZW5zdXJpbmcgdGhhdCBhbGwgY2FsbGJhY2tzXG4gIC8vIGRlZmluZWQgb24gYW4gb2JqZWN0IGJlbG9uZyB0byBpdC5cbiAgXy5iaW5kQWxsID0gcmVzdEFyZ3VtZW50cyhmdW5jdGlvbihvYmosIGtleXMpIHtcbiAgICBrZXlzID0gZmxhdHRlbihrZXlzLCBmYWxzZSwgZmFsc2UpO1xuICAgIHZhciBpbmRleCA9IGtleXMubGVuZ3RoO1xuICAgIGlmIChpbmRleCA8IDEpIHRocm93IG5ldyBFcnJvcignYmluZEFsbCBtdXN0IGJlIHBhc3NlZCBmdW5jdGlvbiBuYW1lcycpO1xuICAgIHdoaWxlIChpbmRleC0tKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpbmRleF07XG4gICAgICBvYmpba2V5XSA9IF8uYmluZChvYmpba2V5XSwgb2JqKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIE1lbW9pemUgYW4gZXhwZW5zaXZlIGZ1bmN0aW9uIGJ5IHN0b3JpbmcgaXRzIHJlc3VsdHMuXG4gIF8ubWVtb2l6ZSA9IGZ1bmN0aW9uKGZ1bmMsIGhhc2hlcikge1xuICAgIHZhciBtZW1vaXplID0gZnVuY3Rpb24oa2V5KSB7XG4gICAgICB2YXIgY2FjaGUgPSBtZW1vaXplLmNhY2hlO1xuICAgICAgdmFyIGFkZHJlc3MgPSAnJyArIChoYXNoZXIgPyBoYXNoZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSA6IGtleSk7XG4gICAgICBpZiAoIV8uaGFzKGNhY2hlLCBhZGRyZXNzKSkgY2FjaGVbYWRkcmVzc10gPSBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICByZXR1cm4gY2FjaGVbYWRkcmVzc107XG4gICAgfTtcbiAgICBtZW1vaXplLmNhY2hlID0ge307XG4gICAgcmV0dXJuIG1lbW9pemU7XG4gIH07XG5cbiAgLy8gRGVsYXlzIGEgZnVuY3Rpb24gZm9yIHRoZSBnaXZlbiBudW1iZXIgb2YgbWlsbGlzZWNvbmRzLCBhbmQgdGhlbiBjYWxsc1xuICAvLyBpdCB3aXRoIHRoZSBhcmd1bWVudHMgc3VwcGxpZWQuXG4gIF8uZGVsYXkgPSByZXN0QXJndW1lbnRzKGZ1bmN0aW9uKGZ1bmMsIHdhaXQsIGFyZ3MpIHtcbiAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBmdW5jLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgIH0sIHdhaXQpO1xuICB9KTtcblxuICAvLyBEZWZlcnMgYSBmdW5jdGlvbiwgc2NoZWR1bGluZyBpdCB0byBydW4gYWZ0ZXIgdGhlIGN1cnJlbnQgY2FsbCBzdGFjayBoYXNcbiAgLy8gY2xlYXJlZC5cbiAgXy5kZWZlciA9IF8ucGFydGlhbChfLmRlbGF5LCBfLCAxKTtcblxuICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIHdoZW4gaW52b2tlZCwgd2lsbCBvbmx5IGJlIHRyaWdnZXJlZCBhdCBtb3N0IG9uY2VcbiAgLy8gZHVyaW5nIGEgZ2l2ZW4gd2luZG93IG9mIHRpbWUuIE5vcm1hbGx5LCB0aGUgdGhyb3R0bGVkIGZ1bmN0aW9uIHdpbGwgcnVuXG4gIC8vIGFzIG11Y2ggYXMgaXQgY2FuLCB3aXRob3V0IGV2ZXIgZ29pbmcgbW9yZSB0aGFuIG9uY2UgcGVyIGB3YWl0YCBkdXJhdGlvbjtcbiAgLy8gYnV0IGlmIHlvdSdkIGxpa2UgdG8gZGlzYWJsZSB0aGUgZXhlY3V0aW9uIG9uIHRoZSBsZWFkaW5nIGVkZ2UsIHBhc3NcbiAgLy8gYHtsZWFkaW5nOiBmYWxzZX1gLiBUbyBkaXNhYmxlIGV4ZWN1dGlvbiBvbiB0aGUgdHJhaWxpbmcgZWRnZSwgZGl0dG8uXG4gIF8udGhyb3R0bGUgPSBmdW5jdGlvbihmdW5jLCB3YWl0LCBvcHRpb25zKSB7XG4gICAgdmFyIHRpbWVvdXQsIGNvbnRleHQsIGFyZ3MsIHJlc3VsdDtcbiAgICB2YXIgcHJldmlvdXMgPSAwO1xuICAgIGlmICghb3B0aW9ucykgb3B0aW9ucyA9IHt9O1xuXG4gICAgdmFyIGxhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICBwcmV2aW91cyA9IG9wdGlvbnMubGVhZGluZyA9PT0gZmFsc2UgPyAwIDogXy5ub3coKTtcbiAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgIGlmICghdGltZW91dCkgY29udGV4dCA9IGFyZ3MgPSBudWxsO1xuICAgIH07XG5cbiAgICB2YXIgdGhyb3R0bGVkID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgbm93ID0gXy5ub3coKTtcbiAgICAgIGlmICghcHJldmlvdXMgJiYgb3B0aW9ucy5sZWFkaW5nID09PSBmYWxzZSkgcHJldmlvdXMgPSBub3c7XG4gICAgICB2YXIgcmVtYWluaW5nID0gd2FpdCAtIChub3cgLSBwcmV2aW91cyk7XG4gICAgICBjb250ZXh0ID0gdGhpcztcbiAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICBpZiAocmVtYWluaW5nIDw9IDAgfHwgcmVtYWluaW5nID4gd2FpdCkge1xuICAgICAgICBpZiAodGltZW91dCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBwcmV2aW91cyA9IG5vdztcbiAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgaWYgKCF0aW1lb3V0KSBjb250ZXh0ID0gYXJncyA9IG51bGw7XG4gICAgICB9IGVsc2UgaWYgKCF0aW1lb3V0ICYmIG9wdGlvbnMudHJhaWxpbmcgIT09IGZhbHNlKSB7XG4gICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCByZW1haW5pbmcpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuXG4gICAgdGhyb3R0bGVkLmNhbmNlbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgcHJldmlvdXMgPSAwO1xuICAgICAgdGltZW91dCA9IGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRocm90dGxlZDtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90XG4gIC8vIGJlIHRyaWdnZXJlZC4gVGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGFmdGVyIGl0IHN0b3BzIGJlaW5nIGNhbGxlZCBmb3JcbiAgLy8gTiBtaWxsaXNlY29uZHMuIElmIGBpbW1lZGlhdGVgIGlzIHBhc3NlZCwgdHJpZ2dlciB0aGUgZnVuY3Rpb24gb24gdGhlXG4gIC8vIGxlYWRpbmcgZWRnZSwgaW5zdGVhZCBvZiB0aGUgdHJhaWxpbmcuXG4gIF8uZGVib3VuY2UgPSBmdW5jdGlvbihmdW5jLCB3YWl0LCBpbW1lZGlhdGUpIHtcbiAgICB2YXIgdGltZW91dCwgcmVzdWx0O1xuXG4gICAgdmFyIGxhdGVyID0gZnVuY3Rpb24oY29udGV4dCwgYXJncykge1xuICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICBpZiAoYXJncykgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICB9O1xuXG4gICAgdmFyIGRlYm91bmNlZCA9IHJlc3RBcmd1bWVudHMoZnVuY3Rpb24oYXJncykge1xuICAgICAgaWYgKHRpbWVvdXQpIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgIGlmIChpbW1lZGlhdGUpIHtcbiAgICAgICAgdmFyIGNhbGxOb3cgPSAhdGltZW91dDtcbiAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuICAgICAgICBpZiAoY2FsbE5vdykgcmVzdWx0ID0gZnVuYy5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRpbWVvdXQgPSBfLmRlbGF5KGxhdGVyLCB3YWl0LCB0aGlzLCBhcmdzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9KTtcblxuICAgIGRlYm91bmNlZC5jYW5jZWwgPSBmdW5jdGlvbigpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgIH07XG5cbiAgICByZXR1cm4gZGVib3VuY2VkO1xuICB9O1xuXG4gIC8vIFJldHVybnMgdGhlIGZpcnN0IGZ1bmN0aW9uIHBhc3NlZCBhcyBhbiBhcmd1bWVudCB0byB0aGUgc2Vjb25kLFxuICAvLyBhbGxvd2luZyB5b3UgdG8gYWRqdXN0IGFyZ3VtZW50cywgcnVuIGNvZGUgYmVmb3JlIGFuZCBhZnRlciwgYW5kXG4gIC8vIGNvbmRpdGlvbmFsbHkgZXhlY3V0ZSB0aGUgb3JpZ2luYWwgZnVuY3Rpb24uXG4gIF8ud3JhcCA9IGZ1bmN0aW9uKGZ1bmMsIHdyYXBwZXIpIHtcbiAgICByZXR1cm4gXy5wYXJ0aWFsKHdyYXBwZXIsIGZ1bmMpO1xuICB9O1xuXG4gIC8vIFJldHVybnMgYSBuZWdhdGVkIHZlcnNpb24gb2YgdGhlIHBhc3NlZC1pbiBwcmVkaWNhdGUuXG4gIF8ubmVnYXRlID0gZnVuY3Rpb24ocHJlZGljYXRlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuICFwcmVkaWNhdGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9O1xuXG4gIC8vIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IGlzIHRoZSBjb21wb3NpdGlvbiBvZiBhIGxpc3Qgb2YgZnVuY3Rpb25zLCBlYWNoXG4gIC8vIGNvbnN1bWluZyB0aGUgcmV0dXJuIHZhbHVlIG9mIHRoZSBmdW5jdGlvbiB0aGF0IGZvbGxvd3MuXG4gIF8uY29tcG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgIHZhciBzdGFydCA9IGFyZ3MubGVuZ3RoIC0gMTtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaSA9IHN0YXJ0O1xuICAgICAgdmFyIHJlc3VsdCA9IGFyZ3Nbc3RhcnRdLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB3aGlsZSAoaS0tKSByZXN1bHQgPSBhcmdzW2ldLmNhbGwodGhpcywgcmVzdWx0KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCB3aWxsIG9ubHkgYmUgZXhlY3V0ZWQgb24gYW5kIGFmdGVyIHRoZSBOdGggY2FsbC5cbiAgXy5hZnRlciA9IGZ1bmN0aW9uKHRpbWVzLCBmdW5jKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKC0tdGltZXMgPCAxKSB7XG4gICAgICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCB3aWxsIG9ubHkgYmUgZXhlY3V0ZWQgdXAgdG8gKGJ1dCBub3QgaW5jbHVkaW5nKSB0aGUgTnRoIGNhbGwuXG4gIF8uYmVmb3JlID0gZnVuY3Rpb24odGltZXMsIGZ1bmMpIHtcbiAgICB2YXIgbWVtbztcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoLS10aW1lcyA+IDApIHtcbiAgICAgICAgbWVtbyA9IGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aW1lcyA8PSAxKSBmdW5jID0gbnVsbDtcbiAgICAgIHJldHVybiBtZW1vO1xuICAgIH07XG4gIH07XG5cbiAgLy8gUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBleGVjdXRlZCBhdCBtb3N0IG9uZSB0aW1lLCBubyBtYXR0ZXIgaG93XG4gIC8vIG9mdGVuIHlvdSBjYWxsIGl0LiBVc2VmdWwgZm9yIGxhenkgaW5pdGlhbGl6YXRpb24uXG4gIF8ub25jZSA9IF8ucGFydGlhbChfLmJlZm9yZSwgMik7XG5cbiAgXy5yZXN0QXJndW1lbnRzID0gcmVzdEFyZ3VtZW50cztcblxuICAvLyBPYmplY3QgRnVuY3Rpb25zXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS1cblxuICAvLyBLZXlzIGluIElFIDwgOSB0aGF0IHdvbid0IGJlIGl0ZXJhdGVkIGJ5IGBmb3Iga2V5IGluIC4uLmAgYW5kIHRodXMgbWlzc2VkLlxuICB2YXIgaGFzRW51bUJ1ZyA9ICF7dG9TdHJpbmc6IG51bGx9LnByb3BlcnR5SXNFbnVtZXJhYmxlKCd0b1N0cmluZycpO1xuICB2YXIgbm9uRW51bWVyYWJsZVByb3BzID0gWyd2YWx1ZU9mJywgJ2lzUHJvdG90eXBlT2YnLCAndG9TdHJpbmcnLFxuICAgICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsICdoYXNPd25Qcm9wZXJ0eScsICd0b0xvY2FsZVN0cmluZyddO1xuXG4gIHZhciBjb2xsZWN0Tm9uRW51bVByb3BzID0gZnVuY3Rpb24ob2JqLCBrZXlzKSB7XG4gICAgdmFyIG5vbkVudW1JZHggPSBub25FbnVtZXJhYmxlUHJvcHMubGVuZ3RoO1xuICAgIHZhciBjb25zdHJ1Y3RvciA9IG9iai5jb25zdHJ1Y3RvcjtcbiAgICB2YXIgcHJvdG8gPSBfLmlzRnVuY3Rpb24oY29uc3RydWN0b3IpICYmIGNvbnN0cnVjdG9yLnByb3RvdHlwZSB8fCBPYmpQcm90bztcblxuICAgIC8vIENvbnN0cnVjdG9yIGlzIGEgc3BlY2lhbCBjYXNlLlxuICAgIHZhciBwcm9wID0gJ2NvbnN0cnVjdG9yJztcbiAgICBpZiAoXy5oYXMob2JqLCBwcm9wKSAmJiAhXy5jb250YWlucyhrZXlzLCBwcm9wKSkga2V5cy5wdXNoKHByb3ApO1xuXG4gICAgd2hpbGUgKG5vbkVudW1JZHgtLSkge1xuICAgICAgcHJvcCA9IG5vbkVudW1lcmFibGVQcm9wc1tub25FbnVtSWR4XTtcbiAgICAgIGlmIChwcm9wIGluIG9iaiAmJiBvYmpbcHJvcF0gIT09IHByb3RvW3Byb3BdICYmICFfLmNvbnRhaW5zKGtleXMsIHByb3ApKSB7XG4gICAgICAgIGtleXMucHVzaChwcm9wKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLy8gUmV0cmlldmUgdGhlIG5hbWVzIG9mIGFuIG9iamVjdCdzIG93biBwcm9wZXJ0aWVzLlxuICAvLyBEZWxlZ2F0ZXMgdG8gKipFQ01BU2NyaXB0IDUqKidzIG5hdGl2ZSBgT2JqZWN0LmtleXNgLlxuICBfLmtleXMgPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAoIV8uaXNPYmplY3Qob2JqKSkgcmV0dXJuIFtdO1xuICAgIGlmIChuYXRpdmVLZXlzKSByZXR1cm4gbmF0aXZlS2V5cyhvYmopO1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iaikgaWYgKF8uaGFzKG9iaiwga2V5KSkga2V5cy5wdXNoKGtleSk7XG4gICAgLy8gQWhlbSwgSUUgPCA5LlxuICAgIGlmIChoYXNFbnVtQnVnKSBjb2xsZWN0Tm9uRW51bVByb3BzKG9iaiwga2V5cyk7XG4gICAgcmV0dXJuIGtleXM7XG4gIH07XG5cbiAgLy8gUmV0cmlldmUgYWxsIHRoZSBwcm9wZXJ0eSBuYW1lcyBvZiBhbiBvYmplY3QuXG4gIF8uYWxsS2V5cyA9IGZ1bmN0aW9uKG9iaikge1xuICAgIGlmICghXy5pc09iamVjdChvYmopKSByZXR1cm4gW107XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSBrZXlzLnB1c2goa2V5KTtcbiAgICAvLyBBaGVtLCBJRSA8IDkuXG4gICAgaWYgKGhhc0VudW1CdWcpIGNvbGxlY3ROb25FbnVtUHJvcHMob2JqLCBrZXlzKTtcbiAgICByZXR1cm4ga2V5cztcbiAgfTtcblxuICAvLyBSZXRyaWV2ZSB0aGUgdmFsdWVzIG9mIGFuIG9iamVjdCdzIHByb3BlcnRpZXMuXG4gIF8udmFsdWVzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIGtleXMgPSBfLmtleXMob2JqKTtcbiAgICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgdmFyIHZhbHVlcyA9IEFycmF5KGxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgdmFsdWVzW2ldID0gb2JqW2tleXNbaV1dO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWVzO1xuICB9O1xuXG4gIC8vIFJldHVybnMgdGhlIHJlc3VsdHMgb2YgYXBwbHlpbmcgdGhlIGl0ZXJhdGVlIHRvIGVhY2ggZWxlbWVudCBvZiB0aGUgb2JqZWN0LlxuICAvLyBJbiBjb250cmFzdCB0byBfLm1hcCBpdCByZXR1cm5zIGFuIG9iamVjdC5cbiAgXy5tYXBPYmplY3QgPSBmdW5jdGlvbihvYmosIGl0ZXJhdGVlLCBjb250ZXh0KSB7XG4gICAgaXRlcmF0ZWUgPSBjYihpdGVyYXRlZSwgY29udGV4dCk7XG4gICAgdmFyIGtleXMgPSBfLmtleXMob2JqKSxcbiAgICAgICAgbGVuZ3RoID0ga2V5cy5sZW5ndGgsXG4gICAgICAgIHJlc3VsdHMgPSB7fTtcbiAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICB2YXIgY3VycmVudEtleSA9IGtleXNbaW5kZXhdO1xuICAgICAgcmVzdWx0c1tjdXJyZW50S2V5XSA9IGl0ZXJhdGVlKG9ialtjdXJyZW50S2V5XSwgY3VycmVudEtleSwgb2JqKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH07XG5cbiAgLy8gQ29udmVydCBhbiBvYmplY3QgaW50byBhIGxpc3Qgb2YgYFtrZXksIHZhbHVlXWAgcGFpcnMuXG4gIC8vIFRoZSBvcHBvc2l0ZSBvZiBfLm9iamVjdC5cbiAgXy5wYWlycyA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciBrZXlzID0gXy5rZXlzKG9iaik7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciBwYWlycyA9IEFycmF5KGxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgcGFpcnNbaV0gPSBba2V5c1tpXSwgb2JqW2tleXNbaV1dXTtcbiAgICB9XG4gICAgcmV0dXJuIHBhaXJzO1xuICB9O1xuXG4gIC8vIEludmVydCB0aGUga2V5cyBhbmQgdmFsdWVzIG9mIGFuIG9iamVjdC4gVGhlIHZhbHVlcyBtdXN0IGJlIHNlcmlhbGl6YWJsZS5cbiAgXy5pbnZlcnQgPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgdmFyIGtleXMgPSBfLmtleXMob2JqKTtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgcmVzdWx0W29ialtrZXlzW2ldXV0gPSBrZXlzW2ldO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIFJldHVybiBhIHNvcnRlZCBsaXN0IG9mIHRoZSBmdW5jdGlvbiBuYW1lcyBhdmFpbGFibGUgb24gdGhlIG9iamVjdC5cbiAgLy8gQWxpYXNlZCBhcyBgbWV0aG9kc2AuXG4gIF8uZnVuY3Rpb25zID0gXy5tZXRob2RzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIG5hbWVzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKF8uaXNGdW5jdGlvbihvYmpba2V5XSkpIG5hbWVzLnB1c2goa2V5KTtcbiAgICB9XG4gICAgcmV0dXJuIG5hbWVzLnNvcnQoKTtcbiAgfTtcblxuICAvLyBBbiBpbnRlcm5hbCBmdW5jdGlvbiBmb3IgY3JlYXRpbmcgYXNzaWduZXIgZnVuY3Rpb25zLlxuICB2YXIgY3JlYXRlQXNzaWduZXIgPSBmdW5jdGlvbihrZXlzRnVuYywgZGVmYXVsdHMpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24ob2JqKSB7XG4gICAgICB2YXIgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgIGlmIChkZWZhdWx0cykgb2JqID0gT2JqZWN0KG9iaik7XG4gICAgICBpZiAobGVuZ3RoIDwgMiB8fCBvYmogPT0gbnVsbCkgcmV0dXJuIG9iajtcbiAgICAgIGZvciAodmFyIGluZGV4ID0gMTsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpbmRleF0sXG4gICAgICAgICAgICBrZXlzID0ga2V5c0Z1bmMoc291cmNlKSxcbiAgICAgICAgICAgIGwgPSBrZXlzLmxlbmd0aDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICBpZiAoIWRlZmF1bHRzIHx8IG9ialtrZXldID09PSB2b2lkIDApIG9ialtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBvYmo7XG4gICAgfTtcbiAgfTtcblxuICAvLyBFeHRlbmQgYSBnaXZlbiBvYmplY3Qgd2l0aCBhbGwgdGhlIHByb3BlcnRpZXMgaW4gcGFzc2VkLWluIG9iamVjdChzKS5cbiAgXy5leHRlbmQgPSBjcmVhdGVBc3NpZ25lcihfLmFsbEtleXMpO1xuXG4gIC8vIEFzc2lnbnMgYSBnaXZlbiBvYmplY3Qgd2l0aCBhbGwgdGhlIG93biBwcm9wZXJ0aWVzIGluIHRoZSBwYXNzZWQtaW4gb2JqZWN0KHMpLlxuICAvLyAoaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2Fzc2lnbilcbiAgXy5leHRlbmRPd24gPSBfLmFzc2lnbiA9IGNyZWF0ZUFzc2lnbmVyKF8ua2V5cyk7XG5cbiAgLy8gUmV0dXJucyB0aGUgZmlyc3Qga2V5IG9uIGFuIG9iamVjdCB0aGF0IHBhc3NlcyBhIHByZWRpY2F0ZSB0ZXN0LlxuICBfLmZpbmRLZXkgPSBmdW5jdGlvbihvYmosIHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHByZWRpY2F0ZSA9IGNiKHByZWRpY2F0ZSwgY29udGV4dCk7XG4gICAgdmFyIGtleXMgPSBfLmtleXMob2JqKSwga2V5O1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBrZXlzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgaWYgKHByZWRpY2F0ZShvYmpba2V5XSwga2V5LCBvYmopKSByZXR1cm4ga2V5O1xuICAgIH1cbiAgfTtcblxuICAvLyBJbnRlcm5hbCBwaWNrIGhlbHBlciBmdW5jdGlvbiB0byBkZXRlcm1pbmUgaWYgYG9iamAgaGFzIGtleSBga2V5YC5cbiAgdmFyIGtleUluT2JqID0gZnVuY3Rpb24odmFsdWUsIGtleSwgb2JqKSB7XG4gICAgcmV0dXJuIGtleSBpbiBvYmo7XG4gIH07XG5cbiAgLy8gUmV0dXJuIGEgY29weSBvZiB0aGUgb2JqZWN0IG9ubHkgY29udGFpbmluZyB0aGUgd2hpdGVsaXN0ZWQgcHJvcGVydGllcy5cbiAgXy5waWNrID0gcmVzdEFyZ3VtZW50cyhmdW5jdGlvbihvYmosIGtleXMpIHtcbiAgICB2YXIgcmVzdWx0ID0ge30sIGl0ZXJhdGVlID0ga2V5c1swXTtcbiAgICBpZiAob2JqID09IG51bGwpIHJldHVybiByZXN1bHQ7XG4gICAgaWYgKF8uaXNGdW5jdGlvbihpdGVyYXRlZSkpIHtcbiAgICAgIGlmIChrZXlzLmxlbmd0aCA+IDEpIGl0ZXJhdGVlID0gb3B0aW1pemVDYihpdGVyYXRlZSwga2V5c1sxXSk7XG4gICAgICBrZXlzID0gXy5hbGxLZXlzKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGl0ZXJhdGVlID0ga2V5SW5PYmo7XG4gICAgICBrZXlzID0gZmxhdHRlbihrZXlzLCBmYWxzZSwgZmFsc2UpO1xuICAgICAgb2JqID0gT2JqZWN0KG9iaik7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBrZXlzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgIHZhciB2YWx1ZSA9IG9ialtrZXldO1xuICAgICAgaWYgKGl0ZXJhdGVlKHZhbHVlLCBrZXksIG9iaikpIHJlc3VsdFtrZXldID0gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0pO1xuXG4gIC8vIFJldHVybiBhIGNvcHkgb2YgdGhlIG9iamVjdCB3aXRob3V0IHRoZSBibGFja2xpc3RlZCBwcm9wZXJ0aWVzLlxuICBfLm9taXQgPSByZXN0QXJndW1lbnRzKGZ1bmN0aW9uKG9iaiwga2V5cykge1xuICAgIHZhciBpdGVyYXRlZSA9IGtleXNbMF0sIGNvbnRleHQ7XG4gICAgaWYgKF8uaXNGdW5jdGlvbihpdGVyYXRlZSkpIHtcbiAgICAgIGl0ZXJhdGVlID0gXy5uZWdhdGUoaXRlcmF0ZWUpO1xuICAgICAgaWYgKGtleXMubGVuZ3RoID4gMSkgY29udGV4dCA9IGtleXNbMV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGtleXMgPSBfLm1hcChmbGF0dGVuKGtleXMsIGZhbHNlLCBmYWxzZSksIFN0cmluZyk7XG4gICAgICBpdGVyYXRlZSA9IGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgcmV0dXJuICFfLmNvbnRhaW5zKGtleXMsIGtleSk7XG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gXy5waWNrKG9iaiwgaXRlcmF0ZWUsIGNvbnRleHQpO1xuICB9KTtcblxuICAvLyBGaWxsIGluIGEgZ2l2ZW4gb2JqZWN0IHdpdGggZGVmYXVsdCBwcm9wZXJ0aWVzLlxuICBfLmRlZmF1bHRzID0gY3JlYXRlQXNzaWduZXIoXy5hbGxLZXlzLCB0cnVlKTtcblxuICAvLyBDcmVhdGVzIGFuIG9iamVjdCB0aGF0IGluaGVyaXRzIGZyb20gdGhlIGdpdmVuIHByb3RvdHlwZSBvYmplY3QuXG4gIC8vIElmIGFkZGl0aW9uYWwgcHJvcGVydGllcyBhcmUgcHJvdmlkZWQgdGhlbiB0aGV5IHdpbGwgYmUgYWRkZWQgdG8gdGhlXG4gIC8vIGNyZWF0ZWQgb2JqZWN0LlxuICBfLmNyZWF0ZSA9IGZ1bmN0aW9uKHByb3RvdHlwZSwgcHJvcHMpIHtcbiAgICB2YXIgcmVzdWx0ID0gYmFzZUNyZWF0ZShwcm90b3R5cGUpO1xuICAgIGlmIChwcm9wcykgXy5leHRlbmRPd24ocmVzdWx0LCBwcm9wcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBDcmVhdGUgYSAoc2hhbGxvdy1jbG9uZWQpIGR1cGxpY2F0ZSBvZiBhbiBvYmplY3QuXG4gIF8uY2xvbmUgPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAoIV8uaXNPYmplY3Qob2JqKSkgcmV0dXJuIG9iajtcbiAgICByZXR1cm4gXy5pc0FycmF5KG9iaikgPyBvYmouc2xpY2UoKSA6IF8uZXh0ZW5kKHt9LCBvYmopO1xuICB9O1xuXG4gIC8vIEludm9rZXMgaW50ZXJjZXB0b3Igd2l0aCB0aGUgb2JqLCBhbmQgdGhlbiByZXR1cm5zIG9iai5cbiAgLy8gVGhlIHByaW1hcnkgcHVycG9zZSBvZiB0aGlzIG1ldGhvZCBpcyB0byBcInRhcCBpbnRvXCIgYSBtZXRob2QgY2hhaW4sIGluXG4gIC8vIG9yZGVyIHRvIHBlcmZvcm0gb3BlcmF0aW9ucyBvbiBpbnRlcm1lZGlhdGUgcmVzdWx0cyB3aXRoaW4gdGhlIGNoYWluLlxuICBfLnRhcCA9IGZ1bmN0aW9uKG9iaiwgaW50ZXJjZXB0b3IpIHtcbiAgICBpbnRlcmNlcHRvcihvYmopO1xuICAgIHJldHVybiBvYmo7XG4gIH07XG5cbiAgLy8gUmV0dXJucyB3aGV0aGVyIGFuIG9iamVjdCBoYXMgYSBnaXZlbiBzZXQgb2YgYGtleTp2YWx1ZWAgcGFpcnMuXG4gIF8uaXNNYXRjaCA9IGZ1bmN0aW9uKG9iamVjdCwgYXR0cnMpIHtcbiAgICB2YXIga2V5cyA9IF8ua2V5cyhhdHRycyksIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIGlmIChvYmplY3QgPT0gbnVsbCkgcmV0dXJuICFsZW5ndGg7XG4gICAgdmFyIG9iaiA9IE9iamVjdChvYmplY3QpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgaWYgKGF0dHJzW2tleV0gIT09IG9ialtrZXldIHx8ICEoa2V5IGluIG9iaikpIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cblxuICAvLyBJbnRlcm5hbCByZWN1cnNpdmUgY29tcGFyaXNvbiBmdW5jdGlvbiBmb3IgYGlzRXF1YWxgLlxuICB2YXIgZXEsIGRlZXBFcTtcbiAgZXEgPSBmdW5jdGlvbihhLCBiLCBhU3RhY2ssIGJTdGFjaykge1xuICAgIC8vIElkZW50aWNhbCBvYmplY3RzIGFyZSBlcXVhbC4gYDAgPT09IC0wYCwgYnV0IHRoZXkgYXJlbid0IGlkZW50aWNhbC5cbiAgICAvLyBTZWUgdGhlIFtIYXJtb255IGBlZ2FsYCBwcm9wb3NhbF0oaHR0cDovL3dpa2kuZWNtYXNjcmlwdC5vcmcvZG9rdS5waHA/aWQ9aGFybW9ueTplZ2FsKS5cbiAgICBpZiAoYSA9PT0gYikgcmV0dXJuIGEgIT09IDAgfHwgMSAvIGEgPT09IDEgLyBiO1xuICAgIC8vIGBudWxsYCBvciBgdW5kZWZpbmVkYCBvbmx5IGVxdWFsIHRvIGl0c2VsZiAoc3RyaWN0IGNvbXBhcmlzb24pLlxuICAgIGlmIChhID09IG51bGwgfHwgYiA9PSBudWxsKSByZXR1cm4gZmFsc2U7XG4gICAgLy8gYE5hTmBzIGFyZSBlcXVpdmFsZW50LCBidXQgbm9uLXJlZmxleGl2ZS5cbiAgICBpZiAoYSAhPT0gYSkgcmV0dXJuIGIgIT09IGI7XG4gICAgLy8gRXhoYXVzdCBwcmltaXRpdmUgY2hlY2tzXG4gICAgdmFyIHR5cGUgPSB0eXBlb2YgYTtcbiAgICBpZiAodHlwZSAhPT0gJ2Z1bmN0aW9uJyAmJiB0eXBlICE9PSAnb2JqZWN0JyAmJiB0eXBlb2YgYiAhPSAnb2JqZWN0JykgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBkZWVwRXEoYSwgYiwgYVN0YWNrLCBiU3RhY2spO1xuICB9O1xuXG4gIC8vIEludGVybmFsIHJlY3Vyc2l2ZSBjb21wYXJpc29uIGZ1bmN0aW9uIGZvciBgaXNFcXVhbGAuXG4gIGRlZXBFcSA9IGZ1bmN0aW9uKGEsIGIsIGFTdGFjaywgYlN0YWNrKSB7XG4gICAgLy8gVW53cmFwIGFueSB3cmFwcGVkIG9iamVjdHMuXG4gICAgaWYgKGEgaW5zdGFuY2VvZiBfKSBhID0gYS5fd3JhcHBlZDtcbiAgICBpZiAoYiBpbnN0YW5jZW9mIF8pIGIgPSBiLl93cmFwcGVkO1xuICAgIC8vIENvbXBhcmUgYFtbQ2xhc3NdXWAgbmFtZXMuXG4gICAgdmFyIGNsYXNzTmFtZSA9IHRvU3RyaW5nLmNhbGwoYSk7XG4gICAgaWYgKGNsYXNzTmFtZSAhPT0gdG9TdHJpbmcuY2FsbChiKSkgcmV0dXJuIGZhbHNlO1xuICAgIHN3aXRjaCAoY2xhc3NOYW1lKSB7XG4gICAgICAvLyBTdHJpbmdzLCBudW1iZXJzLCByZWd1bGFyIGV4cHJlc3Npb25zLCBkYXRlcywgYW5kIGJvb2xlYW5zIGFyZSBjb21wYXJlZCBieSB2YWx1ZS5cbiAgICAgIGNhc2UgJ1tvYmplY3QgUmVnRXhwXSc6XG4gICAgICAvLyBSZWdFeHBzIGFyZSBjb2VyY2VkIHRvIHN0cmluZ3MgZm9yIGNvbXBhcmlzb24gKE5vdGU6ICcnICsgL2EvaSA9PT0gJy9hL2knKVxuICAgICAgY2FzZSAnW29iamVjdCBTdHJpbmddJzpcbiAgICAgICAgLy8gUHJpbWl0aXZlcyBhbmQgdGhlaXIgY29ycmVzcG9uZGluZyBvYmplY3Qgd3JhcHBlcnMgYXJlIGVxdWl2YWxlbnQ7IHRodXMsIGBcIjVcImAgaXNcbiAgICAgICAgLy8gZXF1aXZhbGVudCB0byBgbmV3IFN0cmluZyhcIjVcIilgLlxuICAgICAgICByZXR1cm4gJycgKyBhID09PSAnJyArIGI7XG4gICAgICBjYXNlICdbb2JqZWN0IE51bWJlcl0nOlxuICAgICAgICAvLyBgTmFOYHMgYXJlIGVxdWl2YWxlbnQsIGJ1dCBub24tcmVmbGV4aXZlLlxuICAgICAgICAvLyBPYmplY3QoTmFOKSBpcyBlcXVpdmFsZW50IHRvIE5hTi5cbiAgICAgICAgaWYgKCthICE9PSArYSkgcmV0dXJuICtiICE9PSArYjtcbiAgICAgICAgLy8gQW4gYGVnYWxgIGNvbXBhcmlzb24gaXMgcGVyZm9ybWVkIGZvciBvdGhlciBudW1lcmljIHZhbHVlcy5cbiAgICAgICAgcmV0dXJuICthID09PSAwID8gMSAvICthID09PSAxIC8gYiA6ICthID09PSArYjtcbiAgICAgIGNhc2UgJ1tvYmplY3QgRGF0ZV0nOlxuICAgICAgY2FzZSAnW29iamVjdCBCb29sZWFuXSc6XG4gICAgICAgIC8vIENvZXJjZSBkYXRlcyBhbmQgYm9vbGVhbnMgdG8gbnVtZXJpYyBwcmltaXRpdmUgdmFsdWVzLiBEYXRlcyBhcmUgY29tcGFyZWQgYnkgdGhlaXJcbiAgICAgICAgLy8gbWlsbGlzZWNvbmQgcmVwcmVzZW50YXRpb25zLiBOb3RlIHRoYXQgaW52YWxpZCBkYXRlcyB3aXRoIG1pbGxpc2Vjb25kIHJlcHJlc2VudGF0aW9uc1xuICAgICAgICAvLyBvZiBgTmFOYCBhcmUgbm90IGVxdWl2YWxlbnQuXG4gICAgICAgIHJldHVybiArYSA9PT0gK2I7XG4gICAgICBjYXNlICdbb2JqZWN0IFN5bWJvbF0nOlxuICAgICAgICByZXR1cm4gU3ltYm9sUHJvdG8udmFsdWVPZi5jYWxsKGEpID09PSBTeW1ib2xQcm90by52YWx1ZU9mLmNhbGwoYik7XG4gICAgfVxuXG4gICAgdmFyIGFyZUFycmF5cyA9IGNsYXNzTmFtZSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgICBpZiAoIWFyZUFycmF5cykge1xuICAgICAgaWYgKHR5cGVvZiBhICE9ICdvYmplY3QnIHx8IHR5cGVvZiBiICE9ICdvYmplY3QnKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgIC8vIE9iamVjdHMgd2l0aCBkaWZmZXJlbnQgY29uc3RydWN0b3JzIGFyZSBub3QgZXF1aXZhbGVudCwgYnV0IGBPYmplY3RgcyBvciBgQXJyYXlgc1xuICAgICAgLy8gZnJvbSBkaWZmZXJlbnQgZnJhbWVzIGFyZS5cbiAgICAgIHZhciBhQ3RvciA9IGEuY29uc3RydWN0b3IsIGJDdG9yID0gYi5jb25zdHJ1Y3RvcjtcbiAgICAgIGlmIChhQ3RvciAhPT0gYkN0b3IgJiYgIShfLmlzRnVuY3Rpb24oYUN0b3IpICYmIGFDdG9yIGluc3RhbmNlb2YgYUN0b3IgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLmlzRnVuY3Rpb24oYkN0b3IpICYmIGJDdG9yIGluc3RhbmNlb2YgYkN0b3IpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICYmICgnY29uc3RydWN0b3InIGluIGEgJiYgJ2NvbnN0cnVjdG9yJyBpbiBiKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIEFzc3VtZSBlcXVhbGl0eSBmb3IgY3ljbGljIHN0cnVjdHVyZXMuIFRoZSBhbGdvcml0aG0gZm9yIGRldGVjdGluZyBjeWNsaWNcbiAgICAvLyBzdHJ1Y3R1cmVzIGlzIGFkYXB0ZWQgZnJvbSBFUyA1LjEgc2VjdGlvbiAxNS4xMi4zLCBhYnN0cmFjdCBvcGVyYXRpb24gYEpPYC5cblxuICAgIC8vIEluaXRpYWxpemluZyBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAgICAvLyBJdCdzIGRvbmUgaGVyZSBzaW5jZSB3ZSBvbmx5IG5lZWQgdGhlbSBmb3Igb2JqZWN0cyBhbmQgYXJyYXlzIGNvbXBhcmlzb24uXG4gICAgYVN0YWNrID0gYVN0YWNrIHx8IFtdO1xuICAgIGJTdGFjayA9IGJTdGFjayB8fCBbXTtcbiAgICB2YXIgbGVuZ3RoID0gYVN0YWNrLmxlbmd0aDtcbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgIC8vIExpbmVhciBzZWFyY2guIFBlcmZvcm1hbmNlIGlzIGludmVyc2VseSBwcm9wb3J0aW9uYWwgdG8gdGhlIG51bWJlciBvZlxuICAgICAgLy8gdW5pcXVlIG5lc3RlZCBzdHJ1Y3R1cmVzLlxuICAgICAgaWYgKGFTdGFja1tsZW5ndGhdID09PSBhKSByZXR1cm4gYlN0YWNrW2xlbmd0aF0gPT09IGI7XG4gICAgfVxuXG4gICAgLy8gQWRkIHRoZSBmaXJzdCBvYmplY3QgdG8gdGhlIHN0YWNrIG9mIHRyYXZlcnNlZCBvYmplY3RzLlxuICAgIGFTdGFjay5wdXNoKGEpO1xuICAgIGJTdGFjay5wdXNoKGIpO1xuXG4gICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBvYmplY3RzIGFuZCBhcnJheXMuXG4gICAgaWYgKGFyZUFycmF5cykge1xuICAgICAgLy8gQ29tcGFyZSBhcnJheSBsZW5ndGhzIHRvIGRldGVybWluZSBpZiBhIGRlZXAgY29tcGFyaXNvbiBpcyBuZWNlc3NhcnkuXG4gICAgICBsZW5ndGggPSBhLmxlbmd0aDtcbiAgICAgIGlmIChsZW5ndGggIT09IGIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgICAvLyBEZWVwIGNvbXBhcmUgdGhlIGNvbnRlbnRzLCBpZ25vcmluZyBub24tbnVtZXJpYyBwcm9wZXJ0aWVzLlxuICAgICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICAgIGlmICghZXEoYVtsZW5ndGhdLCBiW2xlbmd0aF0sIGFTdGFjaywgYlN0YWNrKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBEZWVwIGNvbXBhcmUgb2JqZWN0cy5cbiAgICAgIHZhciBrZXlzID0gXy5rZXlzKGEpLCBrZXk7XG4gICAgICBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICAgIC8vIEVuc3VyZSB0aGF0IGJvdGggb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIG51bWJlciBvZiBwcm9wZXJ0aWVzIGJlZm9yZSBjb21wYXJpbmcgZGVlcCBlcXVhbGl0eS5cbiAgICAgIGlmIChfLmtleXMoYikubGVuZ3RoICE9PSBsZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgICAvLyBEZWVwIGNvbXBhcmUgZWFjaCBtZW1iZXJcbiAgICAgICAga2V5ID0ga2V5c1tsZW5ndGhdO1xuICAgICAgICBpZiAoIShfLmhhcyhiLCBrZXkpICYmIGVxKGFba2V5XSwgYltrZXldLCBhU3RhY2ssIGJTdGFjaykpKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFJlbW92ZSB0aGUgZmlyc3Qgb2JqZWN0IGZyb20gdGhlIHN0YWNrIG9mIHRyYXZlcnNlZCBvYmplY3RzLlxuICAgIGFTdGFjay5wb3AoKTtcbiAgICBiU3RhY2sucG9wKCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgLy8gUGVyZm9ybSBhIGRlZXAgY29tcGFyaXNvbiB0byBjaGVjayBpZiB0d28gb2JqZWN0cyBhcmUgZXF1YWwuXG4gIF8uaXNFcXVhbCA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gZXEoYSwgYik7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiBhcnJheSwgc3RyaW5nLCBvciBvYmplY3QgZW1wdHk/XG4gIC8vIEFuIFwiZW1wdHlcIiBvYmplY3QgaGFzIG5vIGVudW1lcmFibGUgb3duLXByb3BlcnRpZXMuXG4gIF8uaXNFbXB0eSA9IGZ1bmN0aW9uKG9iaikge1xuICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIHRydWU7XG4gICAgaWYgKGlzQXJyYXlMaWtlKG9iaikgJiYgKF8uaXNBcnJheShvYmopIHx8IF8uaXNTdHJpbmcob2JqKSB8fCBfLmlzQXJndW1lbnRzKG9iaikpKSByZXR1cm4gb2JqLmxlbmd0aCA9PT0gMDtcbiAgICByZXR1cm4gXy5rZXlzKG9iaikubGVuZ3RoID09PSAwO1xuICB9O1xuXG4gIC8vIElzIGEgZ2l2ZW4gdmFsdWUgYSBET00gZWxlbWVudD9cbiAgXy5pc0VsZW1lbnQgPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gISEob2JqICYmIG9iai5ub2RlVHlwZSA9PT0gMSk7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiB2YWx1ZSBhbiBhcnJheT9cbiAgLy8gRGVsZWdhdGVzIHRvIEVDTUE1J3MgbmF0aXZlIEFycmF5LmlzQXJyYXlcbiAgXy5pc0FycmF5ID0gbmF0aXZlSXNBcnJheSB8fCBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBBcnJheV0nO1xuICB9O1xuXG4gIC8vIElzIGEgZ2l2ZW4gdmFyaWFibGUgYW4gb2JqZWN0P1xuICBfLmlzT2JqZWN0ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIHR5cGUgPSB0eXBlb2Ygb2JqO1xuICAgIHJldHVybiB0eXBlID09PSAnZnVuY3Rpb24nIHx8IHR5cGUgPT09ICdvYmplY3QnICYmICEhb2JqO1xuICB9O1xuXG4gIC8vIEFkZCBzb21lIGlzVHlwZSBtZXRob2RzOiBpc0FyZ3VtZW50cywgaXNGdW5jdGlvbiwgaXNTdHJpbmcsIGlzTnVtYmVyLCBpc0RhdGUsIGlzUmVnRXhwLCBpc0Vycm9yLCBpc01hcCwgaXNXZWFrTWFwLCBpc1NldCwgaXNXZWFrU2V0LlxuICBfLmVhY2goWydBcmd1bWVudHMnLCAnRnVuY3Rpb24nLCAnU3RyaW5nJywgJ051bWJlcicsICdEYXRlJywgJ1JlZ0V4cCcsICdFcnJvcicsICdTeW1ib2wnLCAnTWFwJywgJ1dlYWtNYXAnLCAnU2V0JywgJ1dlYWtTZXQnXSwgZnVuY3Rpb24obmFtZSkge1xuICAgIF9bJ2lzJyArIG5hbWVdID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCAnICsgbmFtZSArICddJztcbiAgICB9O1xuICB9KTtcblxuICAvLyBEZWZpbmUgYSBmYWxsYmFjayB2ZXJzaW9uIG9mIHRoZSBtZXRob2QgaW4gYnJvd3NlcnMgKGFoZW0sIElFIDwgOSksIHdoZXJlXG4gIC8vIHRoZXJlIGlzbid0IGFueSBpbnNwZWN0YWJsZSBcIkFyZ3VtZW50c1wiIHR5cGUuXG4gIGlmICghXy5pc0FyZ3VtZW50cyhhcmd1bWVudHMpKSB7XG4gICAgXy5pc0FyZ3VtZW50cyA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIF8uaGFzKG9iaiwgJ2NhbGxlZScpO1xuICAgIH07XG4gIH1cblxuICAvLyBPcHRpbWl6ZSBgaXNGdW5jdGlvbmAgaWYgYXBwcm9wcmlhdGUuIFdvcmsgYXJvdW5kIHNvbWUgdHlwZW9mIGJ1Z3MgaW4gb2xkIHY4LFxuICAvLyBJRSAxMSAoIzE2MjEpLCBTYWZhcmkgOCAoIzE5MjkpLCBhbmQgUGhhbnRvbUpTICgjMjIzNikuXG4gIHZhciBub2RlbGlzdCA9IHJvb3QuZG9jdW1lbnQgJiYgcm9vdC5kb2N1bWVudC5jaGlsZE5vZGVzO1xuICBpZiAodHlwZW9mIC8uLyAhPSAnZnVuY3Rpb24nICYmIHR5cGVvZiBJbnQ4QXJyYXkgIT0gJ29iamVjdCcgJiYgdHlwZW9mIG5vZGVsaXN0ICE9ICdmdW5jdGlvbicpIHtcbiAgICBfLmlzRnVuY3Rpb24gPSBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09ICdmdW5jdGlvbicgfHwgZmFsc2U7XG4gICAgfTtcbiAgfVxuXG4gIC8vIElzIGEgZ2l2ZW4gb2JqZWN0IGEgZmluaXRlIG51bWJlcj9cbiAgXy5pc0Zpbml0ZSA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiAhXy5pc1N5bWJvbChvYmopICYmIGlzRmluaXRlKG9iaikgJiYgIWlzTmFOKHBhcnNlRmxvYXQob2JqKSk7XG4gIH07XG5cbiAgLy8gSXMgdGhlIGdpdmVuIHZhbHVlIGBOYU5gP1xuICBfLmlzTmFOID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIF8uaXNOdW1iZXIob2JqKSAmJiBpc05hTihvYmopO1xuICB9O1xuXG4gIC8vIElzIGEgZ2l2ZW4gdmFsdWUgYSBib29sZWFuP1xuICBfLmlzQm9vbGVhbiA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiBvYmogPT09IHRydWUgfHwgb2JqID09PSBmYWxzZSB8fCB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEJvb2xlYW5dJztcbiAgfTtcblxuICAvLyBJcyBhIGdpdmVuIHZhbHVlIGVxdWFsIHRvIG51bGw/XG4gIF8uaXNOdWxsID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIG9iaiA9PT0gbnVsbDtcbiAgfTtcblxuICAvLyBJcyBhIGdpdmVuIHZhcmlhYmxlIHVuZGVmaW5lZD9cbiAgXy5pc1VuZGVmaW5lZCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiBvYmogPT09IHZvaWQgMDtcbiAgfTtcblxuICAvLyBTaG9ydGN1dCBmdW5jdGlvbiBmb3IgY2hlY2tpbmcgaWYgYW4gb2JqZWN0IGhhcyBhIGdpdmVuIHByb3BlcnR5IGRpcmVjdGx5XG4gIC8vIG9uIGl0c2VsZiAoaW4gb3RoZXIgd29yZHMsIG5vdCBvbiBhIHByb3RvdHlwZSkuXG4gIF8uaGFzID0gZnVuY3Rpb24ob2JqLCBwYXRoKSB7XG4gICAgaWYgKCFfLmlzQXJyYXkocGF0aCkpIHtcbiAgICAgIHJldHVybiBvYmogIT0gbnVsbCAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcGF0aCk7XG4gICAgfVxuICAgIHZhciBsZW5ndGggPSBwYXRoLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIga2V5ID0gcGF0aFtpXTtcbiAgICAgIGlmIChvYmogPT0gbnVsbCB8fCAhaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgb2JqID0gb2JqW2tleV07XG4gICAgfVxuICAgIHJldHVybiAhIWxlbmd0aDtcbiAgfTtcblxuICAvLyBVdGlsaXR5IEZ1bmN0aW9uc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIFJ1biBVbmRlcnNjb3JlLmpzIGluICpub0NvbmZsaWN0KiBtb2RlLCByZXR1cm5pbmcgdGhlIGBfYCB2YXJpYWJsZSB0byBpdHNcbiAgLy8gcHJldmlvdXMgb3duZXIuIFJldHVybnMgYSByZWZlcmVuY2UgdG8gdGhlIFVuZGVyc2NvcmUgb2JqZWN0LlxuICBfLm5vQ29uZmxpY3QgPSBmdW5jdGlvbigpIHtcbiAgICByb290Ll8gPSBwcmV2aW91c1VuZGVyc2NvcmU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLy8gS2VlcCB0aGUgaWRlbnRpdHkgZnVuY3Rpb24gYXJvdW5kIGZvciBkZWZhdWx0IGl0ZXJhdGVlcy5cbiAgXy5pZGVudGl0eSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xuXG4gIC8vIFByZWRpY2F0ZS1nZW5lcmF0aW5nIGZ1bmN0aW9ucy4gT2Z0ZW4gdXNlZnVsIG91dHNpZGUgb2YgVW5kZXJzY29yZS5cbiAgXy5jb25zdGFudCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gIH07XG5cbiAgXy5ub29wID0gZnVuY3Rpb24oKXt9O1xuXG4gIC8vIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIHBhc3NlZCBhbiBvYmplY3QsIHdpbGwgdHJhdmVyc2UgdGhhdCBvYmplY3TigJlzXG4gIC8vIHByb3BlcnRpZXMgZG93biB0aGUgZ2l2ZW4gYHBhdGhgLCBzcGVjaWZpZWQgYXMgYW4gYXJyYXkgb2Yga2V5cyBvciBpbmRleGVzLlxuICBfLnByb3BlcnR5ID0gZnVuY3Rpb24ocGF0aCkge1xuICAgIGlmICghXy5pc0FycmF5KHBhdGgpKSB7XG4gICAgICByZXR1cm4gc2hhbGxvd1Byb3BlcnR5KHBhdGgpO1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gZGVlcEdldChvYmosIHBhdGgpO1xuICAgIH07XG4gIH07XG5cbiAgLy8gR2VuZXJhdGVzIGEgZnVuY3Rpb24gZm9yIGEgZ2l2ZW4gb2JqZWN0IHRoYXQgcmV0dXJucyBhIGdpdmVuIHByb3BlcnR5LlxuICBfLnByb3BlcnR5T2YgPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAob2JqID09IG51bGwpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpe307XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbihwYXRoKSB7XG4gICAgICByZXR1cm4gIV8uaXNBcnJheShwYXRoKSA/IG9ialtwYXRoXSA6IGRlZXBHZXQob2JqLCBwYXRoKTtcbiAgICB9O1xuICB9O1xuXG4gIC8vIFJldHVybnMgYSBwcmVkaWNhdGUgZm9yIGNoZWNraW5nIHdoZXRoZXIgYW4gb2JqZWN0IGhhcyBhIGdpdmVuIHNldCBvZlxuICAvLyBga2V5OnZhbHVlYCBwYWlycy5cbiAgXy5tYXRjaGVyID0gXy5tYXRjaGVzID0gZnVuY3Rpb24oYXR0cnMpIHtcbiAgICBhdHRycyA9IF8uZXh0ZW5kT3duKHt9LCBhdHRycyk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIF8uaXNNYXRjaChvYmosIGF0dHJzKTtcbiAgICB9O1xuICB9O1xuXG4gIC8vIFJ1biBhIGZ1bmN0aW9uICoqbioqIHRpbWVzLlxuICBfLnRpbWVzID0gZnVuY3Rpb24obiwgaXRlcmF0ZWUsIGNvbnRleHQpIHtcbiAgICB2YXIgYWNjdW0gPSBBcnJheShNYXRoLm1heCgwLCBuKSk7XG4gICAgaXRlcmF0ZWUgPSBvcHRpbWl6ZUNiKGl0ZXJhdGVlLCBjb250ZXh0LCAxKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG47IGkrKykgYWNjdW1baV0gPSBpdGVyYXRlZShpKTtcbiAgICByZXR1cm4gYWNjdW07XG4gIH07XG5cbiAgLy8gUmV0dXJuIGEgcmFuZG9tIGludGVnZXIgYmV0d2VlbiBtaW4gYW5kIG1heCAoaW5jbHVzaXZlKS5cbiAgXy5yYW5kb20gPSBmdW5jdGlvbihtaW4sIG1heCkge1xuICAgIGlmIChtYXggPT0gbnVsbCkge1xuICAgICAgbWF4ID0gbWluO1xuICAgICAgbWluID0gMDtcbiAgICB9XG4gICAgcmV0dXJuIG1pbiArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSk7XG4gIH07XG5cbiAgLy8gQSAocG9zc2libHkgZmFzdGVyKSB3YXkgdG8gZ2V0IHRoZSBjdXJyZW50IHRpbWVzdGFtcCBhcyBhbiBpbnRlZ2VyLlxuICBfLm5vdyA9IERhdGUubm93IHx8IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgfTtcblxuICAvLyBMaXN0IG9mIEhUTUwgZW50aXRpZXMgZm9yIGVzY2FwaW5nLlxuICB2YXIgZXNjYXBlTWFwID0ge1xuICAgICcmJzogJyZhbXA7JyxcbiAgICAnPCc6ICcmbHQ7JyxcbiAgICAnPic6ICcmZ3Q7JyxcbiAgICAnXCInOiAnJnF1b3Q7JyxcbiAgICBcIidcIjogJyYjeDI3OycsXG4gICAgJ2AnOiAnJiN4NjA7J1xuICB9O1xuICB2YXIgdW5lc2NhcGVNYXAgPSBfLmludmVydChlc2NhcGVNYXApO1xuXG4gIC8vIEZ1bmN0aW9ucyBmb3IgZXNjYXBpbmcgYW5kIHVuZXNjYXBpbmcgc3RyaW5ncyB0by9mcm9tIEhUTUwgaW50ZXJwb2xhdGlvbi5cbiAgdmFyIGNyZWF0ZUVzY2FwZXIgPSBmdW5jdGlvbihtYXApIHtcbiAgICB2YXIgZXNjYXBlciA9IGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgICByZXR1cm4gbWFwW21hdGNoXTtcbiAgICB9O1xuICAgIC8vIFJlZ2V4ZXMgZm9yIGlkZW50aWZ5aW5nIGEga2V5IHRoYXQgbmVlZHMgdG8gYmUgZXNjYXBlZC5cbiAgICB2YXIgc291cmNlID0gJyg/OicgKyBfLmtleXMobWFwKS5qb2luKCd8JykgKyAnKSc7XG4gICAgdmFyIHRlc3RSZWdleHAgPSBSZWdFeHAoc291cmNlKTtcbiAgICB2YXIgcmVwbGFjZVJlZ2V4cCA9IFJlZ0V4cChzb3VyY2UsICdnJyk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHN0cmluZykge1xuICAgICAgc3RyaW5nID0gc3RyaW5nID09IG51bGwgPyAnJyA6ICcnICsgc3RyaW5nO1xuICAgICAgcmV0dXJuIHRlc3RSZWdleHAudGVzdChzdHJpbmcpID8gc3RyaW5nLnJlcGxhY2UocmVwbGFjZVJlZ2V4cCwgZXNjYXBlcikgOiBzdHJpbmc7XG4gICAgfTtcbiAgfTtcbiAgXy5lc2NhcGUgPSBjcmVhdGVFc2NhcGVyKGVzY2FwZU1hcCk7XG4gIF8udW5lc2NhcGUgPSBjcmVhdGVFc2NhcGVyKHVuZXNjYXBlTWFwKTtcblxuICAvLyBUcmF2ZXJzZXMgdGhlIGNoaWxkcmVuIG9mIGBvYmpgIGFsb25nIGBwYXRoYC4gSWYgYSBjaGlsZCBpcyBhIGZ1bmN0aW9uLCBpdFxuICAvLyBpcyBpbnZva2VkIHdpdGggaXRzIHBhcmVudCBhcyBjb250ZXh0LiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGUgZmluYWxcbiAgLy8gY2hpbGQsIG9yIGBmYWxsYmFja2AgaWYgYW55IGNoaWxkIGlzIHVuZGVmaW5lZC5cbiAgXy5yZXN1bHQgPSBmdW5jdGlvbihvYmosIHBhdGgsIGZhbGxiYWNrKSB7XG4gICAgaWYgKCFfLmlzQXJyYXkocGF0aCkpIHBhdGggPSBbcGF0aF07XG4gICAgdmFyIGxlbmd0aCA9IHBhdGgubGVuZ3RoO1xuICAgIGlmICghbGVuZ3RoKSB7XG4gICAgICByZXR1cm4gXy5pc0Z1bmN0aW9uKGZhbGxiYWNrKSA/IGZhbGxiYWNrLmNhbGwob2JqKSA6IGZhbGxiYWNrO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcHJvcCA9IG9iaiA9PSBudWxsID8gdm9pZCAwIDogb2JqW3BhdGhbaV1dO1xuICAgICAgaWYgKHByb3AgPT09IHZvaWQgMCkge1xuICAgICAgICBwcm9wID0gZmFsbGJhY2s7XG4gICAgICAgIGkgPSBsZW5ndGg7IC8vIEVuc3VyZSB3ZSBkb24ndCBjb250aW51ZSBpdGVyYXRpbmcuXG4gICAgICB9XG4gICAgICBvYmogPSBfLmlzRnVuY3Rpb24ocHJvcCkgPyBwcm9wLmNhbGwob2JqKSA6IHByb3A7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH07XG5cbiAgLy8gR2VuZXJhdGUgYSB1bmlxdWUgaW50ZWdlciBpZCAodW5pcXVlIHdpdGhpbiB0aGUgZW50aXJlIGNsaWVudCBzZXNzaW9uKS5cbiAgLy8gVXNlZnVsIGZvciB0ZW1wb3JhcnkgRE9NIGlkcy5cbiAgdmFyIGlkQ291bnRlciA9IDA7XG4gIF8udW5pcXVlSWQgPSBmdW5jdGlvbihwcmVmaXgpIHtcbiAgICB2YXIgaWQgPSArK2lkQ291bnRlciArICcnO1xuICAgIHJldHVybiBwcmVmaXggPyBwcmVmaXggKyBpZCA6IGlkO1xuICB9O1xuXG4gIC8vIEJ5IGRlZmF1bHQsIFVuZGVyc2NvcmUgdXNlcyBFUkItc3R5bGUgdGVtcGxhdGUgZGVsaW1pdGVycywgY2hhbmdlIHRoZVxuICAvLyBmb2xsb3dpbmcgdGVtcGxhdGUgc2V0dGluZ3MgdG8gdXNlIGFsdGVybmF0aXZlIGRlbGltaXRlcnMuXG4gIF8udGVtcGxhdGVTZXR0aW5ncyA9IHtcbiAgICBldmFsdWF0ZTogLzwlKFtcXHNcXFNdKz8pJT4vZyxcbiAgICBpbnRlcnBvbGF0ZTogLzwlPShbXFxzXFxTXSs/KSU+L2csXG4gICAgZXNjYXBlOiAvPCUtKFtcXHNcXFNdKz8pJT4vZ1xuICB9O1xuXG4gIC8vIFdoZW4gY3VzdG9taXppbmcgYHRlbXBsYXRlU2V0dGluZ3NgLCBpZiB5b3UgZG9uJ3Qgd2FudCB0byBkZWZpbmUgYW5cbiAgLy8gaW50ZXJwb2xhdGlvbiwgZXZhbHVhdGlvbiBvciBlc2NhcGluZyByZWdleCwgd2UgbmVlZCBvbmUgdGhhdCBpc1xuICAvLyBndWFyYW50ZWVkIG5vdCB0byBtYXRjaC5cbiAgdmFyIG5vTWF0Y2ggPSAvKC4pXi87XG5cbiAgLy8gQ2VydGFpbiBjaGFyYWN0ZXJzIG5lZWQgdG8gYmUgZXNjYXBlZCBzbyB0aGF0IHRoZXkgY2FuIGJlIHB1dCBpbnRvIGFcbiAgLy8gc3RyaW5nIGxpdGVyYWwuXG4gIHZhciBlc2NhcGVzID0ge1xuICAgIFwiJ1wiOiBcIidcIixcbiAgICAnXFxcXCc6ICdcXFxcJyxcbiAgICAnXFxyJzogJ3InLFxuICAgICdcXG4nOiAnbicsXG4gICAgJ1xcdTIwMjgnOiAndTIwMjgnLFxuICAgICdcXHUyMDI5JzogJ3UyMDI5J1xuICB9O1xuXG4gIHZhciBlc2NhcGVSZWdFeHAgPSAvXFxcXHwnfFxccnxcXG58XFx1MjAyOHxcXHUyMDI5L2c7XG5cbiAgdmFyIGVzY2FwZUNoYXIgPSBmdW5jdGlvbihtYXRjaCkge1xuICAgIHJldHVybiAnXFxcXCcgKyBlc2NhcGVzW21hdGNoXTtcbiAgfTtcblxuICAvLyBKYXZhU2NyaXB0IG1pY3JvLXRlbXBsYXRpbmcsIHNpbWlsYXIgdG8gSm9obiBSZXNpZydzIGltcGxlbWVudGF0aW9uLlxuICAvLyBVbmRlcnNjb3JlIHRlbXBsYXRpbmcgaGFuZGxlcyBhcmJpdHJhcnkgZGVsaW1pdGVycywgcHJlc2VydmVzIHdoaXRlc3BhY2UsXG4gIC8vIGFuZCBjb3JyZWN0bHkgZXNjYXBlcyBxdW90ZXMgd2l0aGluIGludGVycG9sYXRlZCBjb2RlLlxuICAvLyBOQjogYG9sZFNldHRpbmdzYCBvbmx5IGV4aXN0cyBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuXG4gIF8udGVtcGxhdGUgPSBmdW5jdGlvbih0ZXh0LCBzZXR0aW5ncywgb2xkU2V0dGluZ3MpIHtcbiAgICBpZiAoIXNldHRpbmdzICYmIG9sZFNldHRpbmdzKSBzZXR0aW5ncyA9IG9sZFNldHRpbmdzO1xuICAgIHNldHRpbmdzID0gXy5kZWZhdWx0cyh7fSwgc2V0dGluZ3MsIF8udGVtcGxhdGVTZXR0aW5ncyk7XG5cbiAgICAvLyBDb21iaW5lIGRlbGltaXRlcnMgaW50byBvbmUgcmVndWxhciBleHByZXNzaW9uIHZpYSBhbHRlcm5hdGlvbi5cbiAgICB2YXIgbWF0Y2hlciA9IFJlZ0V4cChbXG4gICAgICAoc2V0dGluZ3MuZXNjYXBlIHx8IG5vTWF0Y2gpLnNvdXJjZSxcbiAgICAgIChzZXR0aW5ncy5pbnRlcnBvbGF0ZSB8fCBub01hdGNoKS5zb3VyY2UsXG4gICAgICAoc2V0dGluZ3MuZXZhbHVhdGUgfHwgbm9NYXRjaCkuc291cmNlXG4gICAgXS5qb2luKCd8JykgKyAnfCQnLCAnZycpO1xuXG4gICAgLy8gQ29tcGlsZSB0aGUgdGVtcGxhdGUgc291cmNlLCBlc2NhcGluZyBzdHJpbmcgbGl0ZXJhbHMgYXBwcm9wcmlhdGVseS5cbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBzb3VyY2UgPSBcIl9fcCs9J1wiO1xuICAgIHRleHQucmVwbGFjZShtYXRjaGVyLCBmdW5jdGlvbihtYXRjaCwgZXNjYXBlLCBpbnRlcnBvbGF0ZSwgZXZhbHVhdGUsIG9mZnNldCkge1xuICAgICAgc291cmNlICs9IHRleHQuc2xpY2UoaW5kZXgsIG9mZnNldCkucmVwbGFjZShlc2NhcGVSZWdFeHAsIGVzY2FwZUNoYXIpO1xuICAgICAgaW5kZXggPSBvZmZzZXQgKyBtYXRjaC5sZW5ndGg7XG5cbiAgICAgIGlmIChlc2NhcGUpIHtcbiAgICAgICAgc291cmNlICs9IFwiJytcXG4oKF9fdD0oXCIgKyBlc2NhcGUgKyBcIikpPT1udWxsPycnOl8uZXNjYXBlKF9fdCkpK1xcbidcIjtcbiAgICAgIH0gZWxzZSBpZiAoaW50ZXJwb2xhdGUpIHtcbiAgICAgICAgc291cmNlICs9IFwiJytcXG4oKF9fdD0oXCIgKyBpbnRlcnBvbGF0ZSArIFwiKSk9PW51bGw/Jyc6X190KStcXG4nXCI7XG4gICAgICB9IGVsc2UgaWYgKGV2YWx1YXRlKSB7XG4gICAgICAgIHNvdXJjZSArPSBcIic7XFxuXCIgKyBldmFsdWF0ZSArIFwiXFxuX19wKz0nXCI7XG4gICAgICB9XG5cbiAgICAgIC8vIEFkb2JlIFZNcyBuZWVkIHRoZSBtYXRjaCByZXR1cm5lZCB0byBwcm9kdWNlIHRoZSBjb3JyZWN0IG9mZnNldC5cbiAgICAgIHJldHVybiBtYXRjaDtcbiAgICB9KTtcbiAgICBzb3VyY2UgKz0gXCInO1xcblwiO1xuXG4gICAgLy8gSWYgYSB2YXJpYWJsZSBpcyBub3Qgc3BlY2lmaWVkLCBwbGFjZSBkYXRhIHZhbHVlcyBpbiBsb2NhbCBzY29wZS5cbiAgICBpZiAoIXNldHRpbmdzLnZhcmlhYmxlKSBzb3VyY2UgPSAnd2l0aChvYmp8fHt9KXtcXG4nICsgc291cmNlICsgJ31cXG4nO1xuXG4gICAgc291cmNlID0gXCJ2YXIgX190LF9fcD0nJyxfX2o9QXJyYXkucHJvdG90eXBlLmpvaW4sXCIgK1xuICAgICAgXCJwcmludD1mdW5jdGlvbigpe19fcCs9X19qLmNhbGwoYXJndW1lbnRzLCcnKTt9O1xcblwiICtcbiAgICAgIHNvdXJjZSArICdyZXR1cm4gX19wO1xcbic7XG5cbiAgICB2YXIgcmVuZGVyO1xuICAgIHRyeSB7XG4gICAgICByZW5kZXIgPSBuZXcgRnVuY3Rpb24oc2V0dGluZ3MudmFyaWFibGUgfHwgJ29iaicsICdfJywgc291cmNlKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBlLnNvdXJjZSA9IHNvdXJjZTtcbiAgICAgIHRocm93IGU7XG4gICAgfVxuXG4gICAgdmFyIHRlbXBsYXRlID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgcmV0dXJuIHJlbmRlci5jYWxsKHRoaXMsIGRhdGEsIF8pO1xuICAgIH07XG5cbiAgICAvLyBQcm92aWRlIHRoZSBjb21waWxlZCBzb3VyY2UgYXMgYSBjb252ZW5pZW5jZSBmb3IgcHJlY29tcGlsYXRpb24uXG4gICAgdmFyIGFyZ3VtZW50ID0gc2V0dGluZ3MudmFyaWFibGUgfHwgJ29iaic7XG4gICAgdGVtcGxhdGUuc291cmNlID0gJ2Z1bmN0aW9uKCcgKyBhcmd1bWVudCArICcpe1xcbicgKyBzb3VyY2UgKyAnfSc7XG5cbiAgICByZXR1cm4gdGVtcGxhdGU7XG4gIH07XG5cbiAgLy8gQWRkIGEgXCJjaGFpblwiIGZ1bmN0aW9uLiBTdGFydCBjaGFpbmluZyBhIHdyYXBwZWQgVW5kZXJzY29yZSBvYmplY3QuXG4gIF8uY2hhaW4gPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBfKG9iaik7XG4gICAgaW5zdGFuY2UuX2NoYWluID0gdHJ1ZTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH07XG5cbiAgLy8gT09QXG4gIC8vIC0tLS0tLS0tLS0tLS0tLVxuICAvLyBJZiBVbmRlcnNjb3JlIGlzIGNhbGxlZCBhcyBhIGZ1bmN0aW9uLCBpdCByZXR1cm5zIGEgd3JhcHBlZCBvYmplY3QgdGhhdFxuICAvLyBjYW4gYmUgdXNlZCBPTy1zdHlsZS4gVGhpcyB3cmFwcGVyIGhvbGRzIGFsdGVyZWQgdmVyc2lvbnMgb2YgYWxsIHRoZVxuICAvLyB1bmRlcnNjb3JlIGZ1bmN0aW9ucy4gV3JhcHBlZCBvYmplY3RzIG1heSBiZSBjaGFpbmVkLlxuXG4gIC8vIEhlbHBlciBmdW5jdGlvbiB0byBjb250aW51ZSBjaGFpbmluZyBpbnRlcm1lZGlhdGUgcmVzdWx0cy5cbiAgdmFyIGNoYWluUmVzdWx0ID0gZnVuY3Rpb24oaW5zdGFuY2UsIG9iaikge1xuICAgIHJldHVybiBpbnN0YW5jZS5fY2hhaW4gPyBfKG9iaikuY2hhaW4oKSA6IG9iajtcbiAgfTtcblxuICAvLyBBZGQgeW91ciBvd24gY3VzdG9tIGZ1bmN0aW9ucyB0byB0aGUgVW5kZXJzY29yZSBvYmplY3QuXG4gIF8ubWl4aW4gPSBmdW5jdGlvbihvYmopIHtcbiAgICBfLmVhY2goXy5mdW5jdGlvbnMob2JqKSwgZnVuY3Rpb24obmFtZSkge1xuICAgICAgdmFyIGZ1bmMgPSBfW25hbWVdID0gb2JqW25hbWVdO1xuICAgICAgXy5wcm90b3R5cGVbbmFtZV0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbdGhpcy5fd3JhcHBlZF07XG4gICAgICAgIHB1c2guYXBwbHkoYXJncywgYXJndW1lbnRzKTtcbiAgICAgICAgcmV0dXJuIGNoYWluUmVzdWx0KHRoaXMsIGZ1bmMuYXBwbHkoXywgYXJncykpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgICByZXR1cm4gXztcbiAgfTtcblxuICAvLyBBZGQgYWxsIG9mIHRoZSBVbmRlcnNjb3JlIGZ1bmN0aW9ucyB0byB0aGUgd3JhcHBlciBvYmplY3QuXG4gIF8ubWl4aW4oXyk7XG5cbiAgLy8gQWRkIGFsbCBtdXRhdG9yIEFycmF5IGZ1bmN0aW9ucyB0byB0aGUgd3JhcHBlci5cbiAgXy5lYWNoKFsncG9wJywgJ3B1c2gnLCAncmV2ZXJzZScsICdzaGlmdCcsICdzb3J0JywgJ3NwbGljZScsICd1bnNoaWZ0J10sIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICB2YXIgbWV0aG9kID0gQXJyYXlQcm90b1tuYW1lXTtcbiAgICBfLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG9iaiA9IHRoaXMuX3dyYXBwZWQ7XG4gICAgICBtZXRob2QuYXBwbHkob2JqLCBhcmd1bWVudHMpO1xuICAgICAgaWYgKChuYW1lID09PSAnc2hpZnQnIHx8IG5hbWUgPT09ICdzcGxpY2UnKSAmJiBvYmoubGVuZ3RoID09PSAwKSBkZWxldGUgb2JqWzBdO1xuICAgICAgcmV0dXJuIGNoYWluUmVzdWx0KHRoaXMsIG9iaik7XG4gICAgfTtcbiAgfSk7XG5cbiAgLy8gQWRkIGFsbCBhY2Nlc3NvciBBcnJheSBmdW5jdGlvbnMgdG8gdGhlIHdyYXBwZXIuXG4gIF8uZWFjaChbJ2NvbmNhdCcsICdqb2luJywgJ3NsaWNlJ10sIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICB2YXIgbWV0aG9kID0gQXJyYXlQcm90b1tuYW1lXTtcbiAgICBfLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGNoYWluUmVzdWx0KHRoaXMsIG1ldGhvZC5hcHBseSh0aGlzLl93cmFwcGVkLCBhcmd1bWVudHMpKTtcbiAgICB9O1xuICB9KTtcblxuICAvLyBFeHRyYWN0cyB0aGUgcmVzdWx0IGZyb20gYSB3cmFwcGVkIGFuZCBjaGFpbmVkIG9iamVjdC5cbiAgXy5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fd3JhcHBlZDtcbiAgfTtcblxuICAvLyBQcm92aWRlIHVud3JhcHBpbmcgcHJveHkgZm9yIHNvbWUgbWV0aG9kcyB1c2VkIGluIGVuZ2luZSBvcGVyYXRpb25zXG4gIC8vIHN1Y2ggYXMgYXJpdGhtZXRpYyBhbmQgSlNPTiBzdHJpbmdpZmljYXRpb24uXG4gIF8ucHJvdG90eXBlLnZhbHVlT2YgPSBfLnByb3RvdHlwZS50b0pTT04gPSBfLnByb3RvdHlwZS52YWx1ZTtcblxuICBfLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBTdHJpbmcodGhpcy5fd3JhcHBlZCk7XG4gIH07XG5cbiAgZXhwb3J0IGRlZmF1bHQgXztcbiAgIiwiaW1wb3J0IHtleHRyYWN0RXh0ZW5zaW9ufSBmcm9tIFwidXRpbHMvc3RyaW5nc1wiO1xuXG5leHBvcnQgY29uc3QgaXNSdG1wID0gZnVuY3Rpb24gKGZpbGUsIHR5cGUpIHtcbiAgICByZXR1cm4gKGZpbGUuaW5kZXhPZigncnRtcDonKSA9PSAwIHx8IHR5cGUgPT0gJ3J0bXAnKTtcbn07XG5leHBvcnQgY29uc3QgaXNXZWJSVEMgPSBmdW5jdGlvbiAoZmlsZSwgdHlwZSkge1xuICAgIHJldHVybiAoZmlsZS5pbmRleE9mKCd3czonKSA9PT0gMCB8fCBmaWxlLmluZGV4T2YoJ3dzczonKSA9PT0gMCB8fCB0eXBlID09PSAnd2VicnRjJyk7XG59O1xuZXhwb3J0IGNvbnN0IGlzRGFzaCA9IGZ1bmN0aW9uIChmaWxlLCB0eXBlKSB7XG4gICAgcmV0dXJuICggdHlwZSA9PT0gJ21wZCcgfHwgIHR5cGUgPT09ICdkYXNoJyB8fCB0eXBlID09PSAnYXBwbGljYXRpb24vZGFzaCt4bWwnIHx8IGV4dHJhY3RFeHRlbnNpb24oZmlsZSkgPT0gJ21wZCcpO1xufTsiLCIvKipcbiAqIHV0aWxzIGZvciB3ZWJwYWNrXG4gKi9cblxuZXhwb3J0IGNvbnN0IGdldFNjcmlwdFBhdGggPSBmdW5jdGlvbihzY3JpcHROYW1lKSB7XG4gICAgY29uc3Qgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNjcmlwdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3JjID0gc2NyaXB0c1tpXS5zcmM7XG4gICAgICAgIGlmIChzcmMpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gc3JjLmxhc3RJbmRleE9mKCcvJyArIHNjcmlwdE5hbWUpO1xuICAgICAgICAgICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3JjLnN1YnN0cigwLCBpbmRleCArIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAnJztcbn07XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiAyOS4uXG4gKi9cbmV4cG9ydCBjb25zdCB2ZXJzaW9uID0gX19WRVJTSU9OX187XG4iXSwic291cmNlUm9vdCI6IiJ9