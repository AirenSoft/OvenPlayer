/*! OvenPlayerv0.9.6237 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
/******/ 		return __webpack_require__.p + "" + ({"ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~2ec193ac":"ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~2ec193ac","ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~7afd68cf":"ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~7afd68cf","ovenplayer.provider.DashProvider":"ovenplayer.provider.DashProvider","ovenplayer.provider.HlsProvider":"ovenplayer.provider.HlsProvider","ovenplayer.provider.Html5":"ovenplayer.provider.Html5","ovenplayer.provider.WebRTCProvider":"ovenplayer.provider.WebRTCProvider","ovenplayer.provider.RtmpProvider":"ovenplayer.provider.RtmpProvider","smiparser":"smiparser","vendors~downloader":"vendors~downloader","downloader":"downloader","vttparser":"vttparser"}[chunkId]||chunkId) + ".js"
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
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
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
/******/ 				document.head.appendChild(script);
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
	g = g || new Function("return this")();
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

var _Manager3 = __webpack_require__(/*! api/media/Manager */ "./src/js/api/media/Manager.js");

var _Manager4 = _interopRequireDefault(_Manager3);

var _Manager5 = __webpack_require__(/*! api/playlist/Manager */ "./src/js/api/playlist/Manager.js");

var _Manager6 = _interopRequireDefault(_Manager5);

var _Controller = __webpack_require__(/*! api/provider/Controller */ "./src/js/api/provider/Controller.js");

var _Controller2 = _interopRequireDefault(_Controller);

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

var _version = __webpack_require__(/*! version */ "./src/js/version.js");

var _ApiExpansions = __webpack_require__(/*! api/ApiExpansions */ "./src/js/api/ApiExpansions.js");

var _browser = __webpack_require__(/*! utils/browser */ "./src/js/utils/browser.js");

var _likeA$ = __webpack_require__(/*! utils/likeA$ */ "./src/js/utils/likeA$.js");

var _likeA$2 = _interopRequireDefault(_likeA$);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   This object connects UI to the provider.
 * @param   {object}    container  dom element
 *
 * */

var Api = function Api(container) {
    var that = {};
    (0, _EventEmitter2["default"])(that);

    console.log("[[OvenPlayer]] v." + _version.version);
    OvenPlayerConsole.log("API loaded.");

    var playlistManager = (0, _Manager6["default"])(that);
    var providerController = (0, _Controller2["default"])();
    var userAgentObject = (0, _browser.analUserAgent)();
    var mediaManager = (0, _Manager4["default"])(container, userAgentObject);
    var currentProvider = "";
    var playerConfig = "";
    var lazyQueue = "";
    var captionManager = "";

    var runNextPlaylist = function runNextPlaylist(index) {
        OvenPlayerConsole.log("runNextPlaylist");
        var nextPlaylistIndex = index; // || playlistManager.getCurrentPlaylistIndex() + 1;
        var playlist = playlistManager.getPlaylist();
        var hasNextPlaylist = playlist[nextPlaylistIndex] ? true : false;
        //init source index
        playerConfig.setSourceIndex(0);
        if (hasNextPlaylist) {
            //that.pause();
            lazyQueue = (0, _LazyCommandExecutor2["default"])(that, ['play', 'seek', 'stop']);
            playlistManager.setCurrentPlaylist(nextPlaylistIndex);
            initProvider();

            if (!playerConfig.isAutoStart()) {
                //Anyway nextplaylist runs autoStart!.
                that.play();
            }
        } else {
            //All Playlist Ended.
            that.trigger(_constants.ALL_PLAYLIST_ENDED, null);
        }
    };
    var initProvider = function initProvider(lastPlayPosition) {
        var pickQualityFromSource = function pickQualityFromSource(sources) {
            var quality = 0;
            if (sources) {
                for (var i = 0; i < sources.length; i++) {
                    if (sources[i]["default"]) {
                        quality = i;
                    }
                    if (playerConfig.getSourceIndex() === i) {
                        return i;
                    }
                    /*if (playerConfig.getSourceLabel() && sources[i].label === playerConfig.getSourceLabel() ) {
                        return i;
                    }*/
                }
            }
            return quality;
        };

        return providerController.loadProviders(playlistManager.getCurrentPlayList()).then(function (Providers) {
            if (Providers.length < 1) {
                throw _constants.ERRORS[_constants.INIT_UNSUPPORT_ERROR];
            }

            if (currentProvider) {
                currentProvider.destroy();
                currentProvider = null;
            }
            if (captionManager) {
                captionManager.destroy();
                captionManager = null;
            }
            captionManager = (0, _Manager2["default"])(that, playlistManager.getCurrentPlaylistIndex());
            OvenPlayerConsole.log("API : init() captions");

            var currentSourceIndex = pickQualityFromSource(playlistManager.getCurrentSources());
            var providerName = Providers[currentSourceIndex]["name"];
            OvenPlayerConsole.log("API : init() provider", providerName);
            //Init Provider.
            currentProvider = Providers[currentSourceIndex].provider(mediaManager.createMedia(providerName, playerConfig), playerConfig, playlistManager.getCurrentAdTag());

            if (providerName === _constants.PROVIDER_RTMP) {
                //If provider type is RTMP, we accepts RtmpExpansion.
                _extends(that, (0, _ApiExpansions.ApiRtmpExpansion)(currentProvider));
            }

            //This passes the event created by the Provider to API.
            currentProvider.on("all", function (name, data) {

                that.trigger(name, data);

                if (name === "complete") {
                    runNextPlaylist(playlistManager.getCurrentPlaylistIndex() + 1);
                }

                //Auto switching next source when player load failed by amiss source.
                //data.code === PLAYER_FILE_ERROR
                if (name === _constants.ERROR || name === _constants.NETWORK_UNSTABLED) {
                    //let currentSourceIndex = that.getCurrentSource();
                    if (playerConfig.getSourceIndex() + 1 < that.getSources().length) {
                        //this sequential has available source.
                        that.pause();
                        that.setCurrentSource(playerConfig.getSourceIndex() + 1);
                    }
                }
            });
        }).then(function () {

            //provider's preload() have to made Promise. Cuz it overcomes 'flash loading timing problem'.
            currentProvider.preload(playlistManager.getCurrentSources(), lastPlayPosition).then(function () {
                that.trigger(_constants.READY);

                lazyQueue.flush();
                //This is no reason to exist anymore.
                lazyQueue.destroy();
            })["catch"](function (error) {
                lazyQueue.off();
                if (error && error.code && _constants.ERRORS[error.code]) {
                    that.trigger(_constants.ERROR, _constants.ERRORS[error.code]);
                } else {
                    var tempError = _constants.ERRORS[_constants.INIT_UNKNWON_ERROR];
                    tempError.error = error;
                    that.trigger(_constants.ERROR, tempError);
                }
            });
        })["catch"](function (error) {
            //INIT ERROR
            if (error && error.code && _constants.ERRORS[error.code]) {
                that.trigger(_constants.ERROR, _constants.ERRORS[error.code]);
            } else {
                var tempError = _constants.ERRORS[_constants.INIT_UNKNWON_ERROR];
                tempError.error = error;
                that.trigger(_constants.ERROR, tempError);
            }

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
        options.mediaContainer = container;
        options.browser = userAgentObject;
        playerConfig = (0, _Configurator2["default"])(options, that);
        OvenPlayerConsole.log("API : init()");
        OvenPlayerConsole.log("API : init() config : ", playerConfig);

        playlistManager.initPlaylist(playerConfig.getPlaylist());
        OvenPlayerConsole.log("API : init() sources : ", playlistManager.getCurrentSources());

        initProvider();
    };
    that.getProviderName = function () {
        if (currentProvider) {
            return currentProvider.getName();
        } else {
            return null;
        }
    };
    that.getConfig = function () {
        OvenPlayerConsole.log("API : getConfig()", playerConfig.getConfig());
        return playerConfig.getConfig();
    };
    that.getBrowser = function () {

        return playerConfig.getBrowser();
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
        OvenPlayerConsole.log("API : getFramerate()");
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
            playlistManager.initPlaylist(playlist);
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
        return currentProvider.setPlaybackRate(playerConfig.setPlaybackRate(playbackRate));
    };
    that.getPlaybackRate = function () {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : getPlaybackRate() ", currentProvider.getPlaybackRate());
        return currentProvider.getPlaybackRate();
    };

    that.getPlaylist = function () {
        OvenPlayerConsole.log("API : getPlaylist() ", playlistManager.getPlaylist());
        return playlistManager.getPlaylist();
    };
    that.getCurrentPlaylist = function () {
        OvenPlayerConsole.log("API : getCurrentPlaylist() ", playlistManager.getCurrentPlaylistIndex());
        return playlistManager.getCurrentPlaylistIndex();
    };
    that.setCurrentPlaylist = function (index) {
        OvenPlayerConsole.log("API : setCurrentPlaylist() ", index);
        runNextPlaylist(index);
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
    that.setCurrentSource = function (index) {
        if (!currentProvider) {
            return null;
        }

        OvenPlayerConsole.log("API : setCurrentSource() ", index);

        var sources = currentProvider.getSources();
        var currentSource = sources[currentProvider.getCurrentSource()];
        var newSource = sources[index];
        var lastPlayPosition = currentProvider.getPosition();
        var isSameProvider = providerController.isSameProvider(currentSource, newSource);
        // provider.serCurrentQuality -> playerConfig setting -> load
        var resultSourceIndex = currentProvider.setCurrentSource(index, isSameProvider);

        if (!newSource) {
            return null;
        }

        OvenPlayerConsole.log("API : setCurrentQuality() isSameProvider", isSameProvider);

        //switching between streams on HLS. wth? https://video-dev.github.io/hls.js/latest/docs/API.html#final-step-destroying-switching-between-streams
        if (!isSameProvider || currentProvider.getName() === _constants.PROVIDER_HLS) {
            lazyQueue = (0, _LazyCommandExecutor2["default"])(that, ['play', 'seek']);
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
        if (!captionManager) {
            return null;
        }
        OvenPlayerConsole.log("API : getCaptionList() ", captionManager.getCaptionList());
        return captionManager.getCaptionList();
    };
    that.getCurrentCaption = function () {
        if (!captionManager) {
            return null;
        }
        OvenPlayerConsole.log("API : getCurrentCaption() ", captionManager.getCurrentCaption());
        return captionManager.getCurrentCaption();
    };
    that.setCurrentCaption = function (index) {
        if (!captionManager) {
            return null;
        }
        OvenPlayerConsole.log("API : setCurrentCaption() ", index);
        captionManager.setCurrentCaption(index);
    };
    that.addCaption = function (track) {
        if (!captionManager) {
            return null;
        }
        OvenPlayerConsole.log("API : addCaption() ");
        return captionManager.addCaption(track);
    };
    that.removeCaption = function (index) {
        if (!captionManager) {
            return null;
        }
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
        if (captionManager) {
            captionManager.destroy();
            captionManager = null;
        }

        if (currentProvider) {
            currentProvider.destroy();
            currentProvider = null;
        }

        if (mediaManager) {
            mediaManager.destroy();
            mediaManager = null;
        }
        providerController = null;
        playlistManager = null;
        playerConfig = null;
        lazyQueue = null;

        that.trigger(_constants.DESTROY);
        that.off();

        OvenPlayerConsole.log("API : remove() - lazyQueue, currentProvider, providerController, playlistManager, playerConfig, api event destroed. ");
        OvenPlayerSDK.removePlayer(that.getContainerId());
        if (OvenPlayerSDK.getPlayerList().length === 0) {
            OvenPlayerConsole.log("OvenPlayerSDK.playerList", OvenPlayerSDK.getPlayerList());
        }
    };

    that.getVersion = function () {
        return "v." + _version.version;
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
            mediaContainer: "",
            playbackRates: [2, 1.5, 1, 0.5, 0.25],
            playbackRate: 1,
            mute: false,
            volume: 100,
            loop: false,
            controls: true,
            autoStart: false,
            timecode: true,
            sourceIndex: 0,
            browser: "",
            hidePlaylistIcon: false,
            rtmpBufferTime: 1,
            rtmpBufferTimeMax: 3,
            adClient: "googleima"
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

        deserialize(options);
        var config = _extends({}, Defaults, options);

        var playbackRates = config.playbackRates;

        playbackRates = playbackRates.filter(function (rate) {
            return _underscore2["default"].isNumber(rate) && rate >= 0.25 && rate <= 4;
        }).map(function (rate) {
            return Math.round(rate * 4) / 4;
        });

        if (playbackRates.indexOf(1) < 0) {
            playbackRates.push(1);
        }
        playbackRates.sort();

        config.playbackRates = playbackRates;

        config.rtmpBufferTime = config.rtmpBufferTime > 10 ? 10 : config.rtmpBufferTime;
        config.rtmpBufferTimeMax = config.rtmpBufferTimeMax > 50 ? 50 : config.rtmpBufferTimeMax;

        if (config.playbackRates.indexOf(config.playbackRate) < 0) {
            config.playbackRate = 1;
        }

        var configPlaylist = config.playlist;
        if (!configPlaylist) {
            var obj = _underscore2["default"].pick(config, ['title', 'description', 'type', 'image', 'file', 'sources', 'tracks', 'host', 'application', 'stream', 'adTagUrl']);

            config.playlist = [obj];
        } else if (_underscore2["default"].isArray(configPlaylist.playlist)) {
            config.feedData = configPlaylist;
            config.playlist = configPlaylist.playlist;
        }

        delete config.duration;
        return config;
    };
    OvenPlayerConsole.log("Configurator loaded.", options);
    var spec = composeSourceOptions(options);

    spec.isFullscreen = false; //IE 11 can't check current fullscreen state.

    var that = {};
    that.getConfig = function () {
        return spec;
    };
    that.getAdClient = function () {
        return spec.adClient;
    };
    that.setConfig = function (config, value) {
        spec[config] = value;
    };

    that.getContainer = function () {
        return spec.mediaContainer;
    };
    that.isFullscreen = function () {
        return spec.isFullscreen;
    };
    that.setFullscreen = function (isFullscreen) {
        return spec.isFullscreen = isFullscreen;
    };

    that.getPlaybackRate = function () {
        return spec.playbackRate;
    };
    that.setPlaybackRate = function (playbackRate) {
        spec.playbackRate = playbackRate;
        return playbackRate;
    };

    that.getQualityLabel = function () {
        return spec.qualityLabel;
    };
    that.setQualityLabel = function (newLabel) {
        spec.qualityLabel = newLabel;
    };

    /*that.getSourceLabel = () => {
        return spec.sourceLabel;
    };
    that.setSourceLabel = (newLabel) => {
        spec.sourceLabel = newLabel;
    };*/

    that.getSourceIndex = function () {
        return spec.sourceIndex;
    };
    that.setSourceIndex = function (index) {
        spec.sourceIndex = index;
    };
    that.setTimecodeMode = function (timecode) {
        if (spec.timecode !== timecode) {
            spec.timecode = timecode;
            provider.trigger(_constants.CONTENT_TIME_MODE_CHANGED, timecode);
        }
    };
    that.isTimecodeMode = function () {
        return spec.timecode;
    };
    that.getRtmpBufferTime = function () {
        return spec.rtmpBufferTime;
    };
    that.getRtmpBufferTimeMax = function () {
        return spec.rtmpBufferTimeMax;
    };

    that.isMute = function () {
        return spec.mute;
    };
    that.getVolume = function () {
        return spec.volume;
    };
    that.isLoop = function () {
        return spec.loop;
    };
    that.isAutoStart = function () {
        return spec.autoStart;
    };
    that.isControls = function () {
        return spec.controls;
    };

    that.getPlaybackRates = function () {
        return spec.playbackRates;
    };
    that.getBrowser = function () {
        return spec.browser;
    };

    that.getPlaylist = function () {
        return spec.playlist;
    };
    that.setPlaylist = function (playlist) {
        if (_underscore2["default"].isArray(playlist)) {
            spec.playlist = playlist;
        } else {
            spec.playlist = [playlist];
        }
        return spec.playlist;
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

var _browser = __webpack_require__(/*! utils/browser */ "./src/js/utils/browser.js");

/**
 * @brief   This finds the provider that matches the input source.
 * @param
 * */

var SupportChecker = function SupportChecker() {
    var that = {};
    OvenPlayerConsole.log("SupportChecker loaded.");
    var userAgentObject = (0, _browser.analUserAgent)();

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

            if ((0, _validator.isHls)(file, type) && userAgentObject.browser === "Microsoft Edge") {
                //Edge supports hls native but that's sucks.
                return false;
            }

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
            if ((0, _validator.isRtmp)(file, type)) {
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

            var type = source.type;
            if ((0, _validator.isRtmp)(file, type)) {
                return false;
            }

            if (typeof (window.MediaSource || window.WebKitMediaSource) === "function" && (0, _validator.isDash)(file, type)) {
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
            var file = source.file;
            var type = source.type;
            if ((0, _validator.isRtmp)(file, type)) {
                return false;
            }

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
            //Yes I need hlsjs. 2019-06-12 && !!video.canPlayType('application/vnd.apple.mpegurl');
            return isHlsSupport();
        }
    }, {
        name: 'rtmp',
        checkSupport: function checkSupport(source) {
            var file = source.file;
            var type = source.type;
            function testFlash() {

                var support = false;

                //IE only
                if ("ActiveXObject" in window) {

                    try {
                        support = !!new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                    } catch (e) {
                        support = false;
                    }

                    //W3C, better support in legacy browser
                } else {

                    support = !!navigator.mimeTypes['application/x-shockwave-flash'];
                }

                return support;
            }
            function checkSupport() {
                if (userAgentObject.browser === "Microsoft Edge" || userAgentObject.os === "Android" || userAgentObject.os === "iOS" || userAgentObject.browser === "Safari") {
                    return false;
                } else {
                    return true;
                }
            }
            if ((0, _validator.isRtmp)(file, type) && testFlash() && checkSupport()) {
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
    that.findProviderNamesByPlaylist = function (playlistItem) {
        OvenPlayerConsole.log("SupportChecker : findProviderNamesByPlaylist()", playlistItem);
        var supportNames = [];
        /*for (let i = playlist_.length; i--;) {
          }*/
        var item = playlistItem;

        if (item && item.sources) {
            for (var j = 0; j < item.sources.length; j++) {
                var source = item.sources[j];
                if (source) {
                    var supported = that.findProviderNameBySource(source);
                    if (supported) {
                        supportNames.push(supported);
                    }
                }
            }

            return supportNames;
        }
        return null;
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

var _SrtParser = __webpack_require__(/*! api/caption/parser/SrtParser */ "./src/js/api/caption/parser/SrtParser.js");

var _SrtParser2 = _interopRequireDefault(_SrtParser);

var _vttCue = __webpack_require__(/*! utils/captions/vttCue */ "./src/js/utils/captions/vttCue.js");

var _vttCue2 = _interopRequireDefault(_vttCue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import Request from "utils/downloader";

/**
 * Created by hoho on 2018. 7. 4..
 */
var Loader = function Loader() {
    var that = {};

    var convertToVTTCues = function convertToVTTCues(cues) {
        return cues.map(function (cue) {
            return new _vttCue2["default"](cue.start, cue.end, cue.text);
        });
    };
    //language : for SMI format.
    that.load = function (track, language, successCallback, errorCallback) {

        var requestOptions = {
            method: "GET",
            url: track.file,
            encoding: null
        };

        loadRequestDownloder().then(function (Request) {
            Request(requestOptions, function (error, response, body) {
                if (error) {
                    errorCallback(error);
                } else {
                    var cues = [];
                    var vttCues = [];

                    if (body.indexOf('WEBVTT') >= 0) {
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
                            parser.parse(body);
                        })["catch"](function (error) {
                            //delete track.xhr;
                            errorCallback(error);
                        });
                    } else if (body.indexOf('SAMI') >= 0) {
                        OvenPlayerConsole.log("SAMI LOADED");
                        loadSmiParser().then(function (SmiParser) {
                            var parsedData = SmiParser(body, { fixedLang: language });
                            vttCues = convertToVTTCues(parsedData.result);
                            successCallback(vttCues);
                        })["catch"](function (error) {
                            //delete track.xhr;
                            errorCallback(error);
                        });
                    } else {
                        OvenPlayerConsole.log("SRT LOADED");
                        cues = (0, _SrtParser2["default"])(body);
                        vttCues = convertToVTTCues(cues);
                        successCallback(vttCues);
                    }
                }
            });
        })["catch"](function (error) {
            //delete track.xhr;
            errorCallback(error);
        });
    };

    return that;
};
function loadRequestDownloder() {
    return Promise.all(/*! require.ensure | downloader */[__webpack_require__.e("vendors~downloader"), __webpack_require__.e("downloader")]).then((function (require) {
        return __webpack_require__(/*! utils/downloader */ "./src/js/utils/downloader.js")["default"];
    }).bind(null, __webpack_require__)).catch(function (err) {
        console.log(err);
    });
};
function loadVttParser() {
    return __webpack_require__.e(/*! require.ensure | vttparser */ "vttparser").then((function (require) {
        return __webpack_require__(/*! api/caption/parser/VttParser */ "./src/js/api/caption/parser/VttParser.js")["default"];
    }).bind(null, __webpack_require__)).catch(function (err) {
        console.log(err);
    });
}
function loadSmiParser() {
    return __webpack_require__.e(/*! require.ensure | smiparser */ "smiparser").then((function (require) {
        return __webpack_require__(/*! api/caption/parser/SmiParser */ "./src/js/api/caption/parser/SmiParser.js")["default"];
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


var Manager = function Manager(api, playlistIndex) {

    var that = {};
    var captionList = [];
    var currentCaptionIndex = -1;

    var captionLoader = (0, _Loader2["default"])();
    var isFisrtLoad = true;
    var isShowing = false;

    OvenPlayerConsole.log("Caption Manager >> ", playlistIndex);

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
    if (api.getConfig().playlist && api.getConfig().playlist.length > 0) {
        var playlist = api.getConfig().playlist[playlistIndex];

        if (playlist && playlist.tracks && playlist.tracks.length > 0) {
            var _loop = function _loop(i) {
                var track = playlist.tracks[i];

                if (isSupport(track.kind) && !_underscore2["default"].findWhere(track, { file: track.file })) {
                    //that.flushCaptionList(currentCaptionIndex);
                    captionLoader.load(track, track.lang, function (vttCues) {
                        if (vttCues && vttCues.length > 0) {
                            var captionId = bindTrack(track, vttCues);
                        }
                    }, function (error) {
                        var tempError = _constants.ERRORS[_constants.PLAYER_CAPTION_ERROR];
                        tempError.error = error;
                        api.trigger(_constants.ERROR, tempError);
                    });
                }
            };

            for (var i = 0; i < playlist.tracks.length; i++) {
                _loop(i);
            }
        }
    }

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
                var tempError = _constants.ERRORS[_constants.PLAYER_CAPTION_ERROR];
                tempError.error = error;
                api.trigger(_constants.ERROR, tempError);
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
    that.destroy = function () {
        captionList = [];
        captionLoader = null;
        api.off(_constants.CONTENT_TIME, null, that);
    };

    return that;
};

exports["default"] = Manager;

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

var STATE_AD_LOADING = exports.STATE_AD_LOADING = "adLoading";
var STATE_AD_LOADED = exports.STATE_AD_LOADED = "adLoaded";
var STATE_AD_PLAYING = exports.STATE_AD_PLAYING = "adPlaying";
var STATE_AD_PAUSED = exports.STATE_AD_PAUSED = "adPaused";
var STATE_AD_COMPLETE = exports.STATE_AD_COMPLETE = "adComplete";
var STATE_AD_ERROR = exports.STATE_AD_ERROR = "adError";
var PLAYER_AD_CLICK = exports.PLAYER_AD_CLICK = "adclick";

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
var PLAYLIST_CHANGED = exports.PLAYLIST_CHANGED = "playlistChanged";
var CONTENT_SEEKED = exports.CONTENT_SEEKED = "seeked";
var ALL_PLAYLIST_ENDED = exports.ALL_PLAYLIST_ENDED = "allPlaylistEnded";
var NETWORK_UNSTABLED = exports.NETWORK_UNSTABLED = "unstableNetwork";

var ERROR = exports.ERROR = "error";

// STATE OF PLAYER
var PLAYER_STATE = exports.PLAYER_STATE = "stateChanged";
var PLAYER_COMPLETE = exports.PLAYER_COMPLETE = STATE_COMPLETE;
var PLAYER_PAUSE = exports.PLAYER_PAUSE = "pause";
var PLAYER_PLAY = exports.PLAYER_PLAY = "play";

var PLAYER_CLICKED = exports.PLAYER_CLICKED = "clicked";
var PLAYER_RESIZED = exports.PLAYER_RESIZED = "resized";
var PLAYER_LOADING = exports.PLAYER_LOADING = "loading";
var PLAYER_FULLSCREEN_REQUEST = exports.PLAYER_FULLSCREEN_REQUEST = "fullscreenRequested";
var PLAYER_FULLSCREEN_CHANGED = exports.PLAYER_FULLSCREEN_CHANGED = "fullscreenChanged";
var PLAYER_WARNING = exports.PLAYER_WARNING = "warning";

var AD_CHANGED = exports.AD_CHANGED = "adChanged";
var AD_TIME = exports.AD_TIME = "adTime";
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
var OME_P2P_MODE = exports.OME_P2P_MODE = "p2pMode";

var AD_CLIENT_GOOGLEIMA = exports.AD_CLIENT_GOOGLEIMA = "googleima";
var AD_CLIENT_VAST = exports.AD_CLIENT_VAST = "vast";

var INIT_UNKNWON_ERROR = exports.INIT_UNKNWON_ERROR = 100;
var INIT_UNSUPPORT_ERROR = exports.INIT_UNSUPPORT_ERROR = 101;
var INIT_RTMP_SETUP_ERROR = exports.INIT_RTMP_SETUP_ERROR = 102;
var INIT_DASH_UNSUPPORT = exports.INIT_DASH_UNSUPPORT = 103;
var INIT_ADS_ERROR = exports.INIT_ADS_ERROR = 104;
var INIT_DASH_NOTFOUND = exports.INIT_DASH_NOTFOUND = 105;
var INIT_HLSJS_NOTFOUND = exports.INIT_HLSJS_NOTFOUND = 106;
var PLAYER_UNKNWON_ERROR = exports.PLAYER_UNKNWON_ERROR = 300;
var PLAYER_UNKNWON_OPERATION_ERROR = exports.PLAYER_UNKNWON_OPERATION_ERROR = 301;
var PLAYER_UNKNWON_NEWWORK_ERROR = exports.PLAYER_UNKNWON_NEWWORK_ERROR = 302;
var PLAYER_UNKNWON_DECODE_ERROR = exports.PLAYER_UNKNWON_DECODE_ERROR = 303;
var PLAYER_FILE_ERROR = exports.PLAYER_FILE_ERROR = 304;
var PLAYER_CAPTION_ERROR = exports.PLAYER_CAPTION_ERROR = 305;
var PLAYER_WEBRTC_WS_ERROR = exports.PLAYER_WEBRTC_WS_ERROR = 501;
var PLAYER_WEBRTC_ADD_ICECANDIDATE_ERROR = exports.PLAYER_WEBRTC_ADD_ICECANDIDATE_ERROR = 502;
var PLAYER_WEBRTC_SET_REMOTE_DESC_ERROR = exports.PLAYER_WEBRTC_SET_REMOTE_DESC_ERROR = 503;
var PLAYER_WEBRTC_CREATE_ANSWER_ERROR = exports.PLAYER_WEBRTC_CREATE_ANSWER_ERROR = 504;
var PLAYER_WEBRTC_SET_LOCAL_DESC_ERROR = exports.PLAYER_WEBRTC_SET_LOCAL_DESC_ERROR = 505;
var PLAYER_WEBRTC_NETWORK_SLOW = exports.PLAYER_WEBRTC_NETWORK_SLOW = 510;

var WARN_MSG_MUTEDPLAY = exports.WARN_MSG_MUTEDPLAY = "Please touch here to turn on the sound.";

var ERRORS = exports.ERRORS = {
    100: { code: 100, message: "Can not load due to unknown reasons.", reason: "Can not load due to unknown reasons." },
    101: { code: 101, message: "Can not load due to unsupported media.", reason: "Can not load due to unsupported media." },
    102: { code: 102, message: "Flash fetching process aborted. </br><a href='http://www.adobe.com/go/getflashplayer' target='_self'><img src='http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif' alt='Get Adobe Flash player'></a>", reason: "It looks like not found swf or your environment is localhost." },
    103: { code: 103, message: "Can not load due to dashjs. Please check the lastest version.", reason: "dash.js version is old. Please check the lastest." },
    104: { code: 104, message: "Can not load due to google ima for Ads. ", reason: "Please check the google ima library." },
    105: { code: 105, message: "Can not find the dashjs. Please check the dashjs.", reason: "Not found dashjs." },
    106: { code: 106, message: "Can not find the hlsjs. Please check the hlsjs.", reason: "Not found hlsjs." },
    300: { code: 300, message: "Can not play due to unknown reasons.", reason: "Can not play due to unknown reasons." },
    301: { code: 301, message: "Fetching process aborted by user.", reason: "Fetching process aborted by user." },
    302: { code: 302, message: "Some of the media could not be downloaded due to a network error.", reason: "Error occurred when downloading." },
    303: { code: 303, message: "Unable to load media. This may be due to a server or network error, or due to an unsupported format.", reason: "Error occurred when decoding." },
    304: { code: 304, message: "Media playback has been canceled. It looks like your media is corrupted or your browser does not support the features your media uses.", reason: "Media playback not supported." },
    305: { code: 305, message: "Can not load captions due to unknown reasons.", reason: "Can not load captions due to unknown reasons." },
    501: { code: 501, message: "Connection with low-latency(OME) server failed.", reason: "WebSocket connection failed." },
    502: { code: 502, message: "Connection with low-latency(OME) server failed.", reason: "WebRTC addIceCandidate failed." },
    503: { code: 503, message: "Connection with low-latency(OME) server failed.", reason: "WebRTC setRemoteDescription failed." },
    504: { code: 504, message: "Connection with low-latency(OME) server failed.", reason: "WebRTC peer createOffer failed." },
    505: { code: 505, message: "Connection with low-latency(OME) server failed.", reason: "WebRTC setLocalDescription failed." },
    510: { code: 510, message: "Network connection is unstable. Check the network connection.", reason: "Network is slow." }
};

var UI_ICONS = exports.UI_ICONS = {
    volume_mute: "volume-mute",
    op_warning: "op-warning"
};

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

var _browser = __webpack_require__(/*! utils/browser */ "./src/js/utils/browser.js");

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

var _likeA$ = __webpack_require__(/*! utils/likeA$.js */ "./src/js/utils/likeA$.js");

var _likeA$2 = _interopRequireDefault(_likeA$);

var _webpack = __webpack_require__(/*! utils/webpack */ "./src/js/utils/webpack.js");

var _version = __webpack_require__(/*! version */ "./src/js/version.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//ToDo : Restructuring

var Manager = function Manager(container, browserInfo) {
    var that = {};
    var SWFPath = (0, _webpack.getScriptPath)('ovenplayer.js') + "OvenPlayerFlash.swf?v=" + _version.version;
    var rootId = container.getAttribute("data-parent-id");
    var $container = (0, _likeA$2["default"])(container);
    var videoElement = "";

    OvenPlayerConsole.log("MediaManager loaded. browser : ", browserInfo);

    var createHtmlVideo = function createHtmlVideo(isLoop) {
        videoElement = document.createElement('video');
        videoElement.setAttribute('disableremoteplayback', '');
        videoElement.setAttribute('webkit-playsinline', 'true');
        videoElement.setAttribute('playsinline', 'true');
        if (isLoop) {
            videoElement.setAttribute('loop', '');
        }
        $container.append(videoElement);

        return videoElement;
    };
    var createFlashVideo = function createFlashVideo(isLoop, bufferTime, bufferTimeMax) {
        var movie = void 0,
            flashvars = void 0,
            allowscriptaccess = void 0,
            allowfullscreen = void 0,
            quality = void 0,
            name = void 0,
            menu = void 0,
            qual = void 0,
            bgcolor = void 0,
            loop = void 0,
            wmode = void 0;
        OvenPlayerConsole.log("MediaManager Flash buffer setting : ", bufferTime, bufferTimeMax);
        movie = document.createElement('param');
        movie.setAttribute('name', 'movie');
        movie.setAttribute('value', SWFPath);

        flashvars = document.createElement('param');
        flashvars.setAttribute('name', 'flashvars');
        //playerId is to use SWF for ExternalInterface.call().
        flashvars.setAttribute('value', "playerId=" + rootId + "&bufferTime=" + bufferTime + "&bufferMaxTime=" + bufferTimeMax);

        allowscriptaccess = document.createElement('param');
        allowscriptaccess.setAttribute('name', 'allowscriptaccess');
        allowscriptaccess.setAttribute('value', 'always');

        allowfullscreen = document.createElement('param');
        allowfullscreen.setAttribute('name', 'allowfullscreen');
        allowfullscreen.setAttribute('value', 'true');

        quality = document.createElement('param');
        quality.setAttribute('name', 'quality');
        quality.setAttribute('value', 'height');

        name = document.createElement('param');
        name.setAttribute('name', 'name');
        name.setAttribute('value', rootId + "-flash");

        menu = document.createElement('param');
        menu.setAttribute('name', 'menu');
        menu.setAttribute('value', 'false');

        qual = document.createElement('param');
        qual.setAttribute('name', 'quality');
        qual.setAttribute('value', 'high');

        bgcolor = document.createElement('param');
        bgcolor.setAttribute('name', 'bgcolor');
        bgcolor.setAttribute('value', '#000000');

        wmode = document.createElement('param');
        wmode.setAttribute('name', 'wmode');
        wmode.setAttribute('value', 'opaque');

        /*let allowButton = `<a href="http://www.adobe.com/go/getflashplayer"><img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player"></a>`;
        message = document.createElement("div");
        message.innerHTML = allowButton;*/

        if (isLoop) {
            loop = document.createElement('param');
            loop.setAttribute('name', 'loop');
            loop.setAttribute('value', 'true');
        }

        videoElement = document.createElement('object');
        videoElement.setAttribute('id', rootId + "-flash");
        videoElement.setAttribute('name', rootId + "-flash");
        videoElement.setAttribute('width', '100%');
        videoElement.setAttribute('height', '100%');
        videoElement.setAttribute('scale', 'default');
        videoElement.setAttribute('wmode', 'opaque');

        if (browserInfo.browser === "Microsoft Internet Explorer" && browserInfo.browserMajorVersion <= 9) {
            videoElement.setAttribute('classid', 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000');
            videoElement.appendChild(movie);
        } else {
            videoElement.setAttribute('data', SWFPath);
            videoElement.setAttribute('type', 'application/x-shockwave-flash');
        }
        if (isLoop) {
            videoElement.appendChild(loop);
        }

        videoElement.appendChild(wmode);
        videoElement.appendChild(bgcolor);
        videoElement.appendChild(qual);
        videoElement.appendChild(allowfullscreen);
        videoElement.appendChild(allowscriptaccess);
        videoElement.appendChild(flashvars);
        //videoElement.appendChild(message);

        $container.append(videoElement);

        return videoElement;
    };

    that.createMedia = function (providerName, playerConfig) {
        if (providerName === _constants.PROVIDER_RTMP) {
            if (videoElement) {
                that.empty();
            }
            return createFlashVideo(playerConfig.isLoop(), playerConfig.getRtmpBufferTime(), playerConfig.getRtmpBufferTimeMax());
        } else {
            if (videoElement) {
                //that.empty();
                //reuse video element.
                //becuase playlist is auto next playing.
                //Only same video element does not require User Interaction Error.
                //ToDo : refactoring
                return videoElement;
            } else {
                return createHtmlVideo(playerConfig.isLoop());
            }
        }
    };

    that.createAdContainer = function () {
        var adContainer = document.createElement('div');
        adContainer.setAttribute('class', 'ovp-ads');
        $container.append(adContainer);

        return adContainer;
    };

    that.empty = function () {
        OvenPlayerConsole.log("MediaManager removeElement()");
        $container.removeChild(videoElement);
        videoElement = null;
    };

    that.destroy = function () {
        $container.removeChild();
        $container = null;
        videoElement = null;
        rootId = null;
    };

    return that;
}; /**
    * @brief   미디어 엘리먼트를 관리하는 객체. 현재는 하는 일이 많지 않다.
    * @param   {element}   container   dom element
    *
    * */
exports["default"] = Manager;

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

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   This manages Playlist or Sources.
 * @param
 *
 * */
var Manager = function Manager(provider) {
    var that = {};
    var currentPlaylistItem = [];
    var spec = {
        playlist: [],
        currentIndex: 0
    };
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

    that.initPlaylist = function (playlist) {
        OvenPlayerConsole.log("PlaylistManager setPlaylist() ", playlist);
        var prettiedPlaylist = (_underscore2["default"].isArray(playlist) ? playlist : [playlist]).map(function (item) {
            if (!_underscore2["default"].isArray(item.tracks)) {
                delete item.tracks;
            }
            var playlistItem = _extends({}, {
                sources: [],
                tracks: [],
                title: ""
            }, item);

            if (playlistItem.sources === Object(playlistItem.sources) && !_underscore2["default"].isArray(playlistItem.sources)) {
                playlistItem.sources = [makePrettySource(playlistItem.sources)];
            }

            if (!_underscore2["default"].isArray(playlistItem.sources) || playlistItem.sources.length === 0) {
                playlistItem.sources = [makePrettySource(playlistItem)];
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

            if (!playlistItem.title && playlistItem.sources[0] && playlistItem.sources[0].label) {
                playlistItem.title = playlistItem.sources[0].label;
            }

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
        }).filter(function (item) {
            return item.sources && item.sources.length > 0;
        }) || [];
        spec.playlist = prettiedPlaylist;
        return prettiedPlaylist;
    };
    that.getPlaylist = function () {
        OvenPlayerConsole.log("PlaylistManager getPlaylist() ", spec.playlist);
        return spec.playlist;
    };
    that.getCurrentPlayList = function () {
        if (spec.playlist[spec.currentIndex]) {
            return spec.playlist[spec.currentIndex];
        } else {
            return [];
        }
    };
    that.getCurrentPlaylistIndex = function () {
        return spec.currentIndex;
    };
    that.setCurrentPlaylist = function (index) {
        if (spec.playlist[index]) {
            spec.currentIndex = index;
            provider.trigger(_constants.PLAYLIST_CHANGED, spec.currentIndex);
        }
        return spec.currentIndex;
    };
    that.getCurrentSources = function () {
        if (spec.playlist[spec.currentIndex]) {
            OvenPlayerConsole.log("PlaylistManager getCurrentSources() ", spec.playlist[spec.currentIndex].sources);
            return spec.playlist[spec.currentIndex].sources;
        } else {
            return null;
        }
    };
    that.getCurrentAdTag = function () {
        if (spec.playlist[spec.currentIndex]) {
            return spec.playlist[spec.currentIndex].adTagUrl || "";
        }
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

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

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
            return Promise.all(/*! require.ensure | ovenplayer.provider.Html5 */[__webpack_require__.e("ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~2ec193ac"), __webpack_require__.e("ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~7afd68cf"), __webpack_require__.e("ovenplayer.provider.Html5")]).then((function (require) {
                var provider = __webpack_require__(/*! api/provider/html5/providers/Html5 */ "./src/js/api/provider/html5/providers/Html5.js")["default"];
                registeProvider(_constants.PROVIDER_HTML5, provider);
                return { name: _constants.PROVIDER_HTML5, provider: provider };
            }).bind(null, __webpack_require__)).catch(function (err) {
                throw new Error('Network error');
            });
        },
        webrtc: function webrtc() {
            return Promise.all(/*! require.ensure | ovenplayer.provider.WebRTCProvider */[__webpack_require__.e("ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~2ec193ac"), __webpack_require__.e("ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~7afd68cf"), __webpack_require__.e("ovenplayer.provider.WebRTCProvider")]).then((function (require) {
                var provider = __webpack_require__(/*! api/provider/html5/providers/WebRTC */ "./src/js/api/provider/html5/providers/WebRTC.js")["default"];
                registeProvider(_constants.PROVIDER_WEBRTC, provider);
                return { name: _constants.PROVIDER_WEBRTC, provider: provider };
            }).bind(null, __webpack_require__)).catch(function (err) {
                throw new Error('Network error');
            });
        },
        dash: function dash() {
            return Promise.all(/*! require.ensure | ovenplayer.provider.DashProvider */[__webpack_require__.e("ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~2ec193ac"), __webpack_require__.e("ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~7afd68cf"), __webpack_require__.e("ovenplayer.provider.DashProvider")]).then((function (require) {
                var provider = __webpack_require__(/*! api/provider/html5/providers/Dash */ "./src/js/api/provider/html5/providers/Dash.js")["default"];
                registeProvider(_constants.PROVIDER_DASH, provider);
                return { name: _constants.PROVIDER_DASH, provider: provider };
            }).bind(null, __webpack_require__)).catch(function (err) {
                throw new Error('Network error');
            });
        },
        hls: function hls() {
            return Promise.all(/*! require.ensure | ovenplayer.provider.HlsProvider */[__webpack_require__.e("ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~2ec193ac"), __webpack_require__.e("ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~7afd68cf"), __webpack_require__.e("ovenplayer.provider.HlsProvider")]).then((function (require) {
                var provider = __webpack_require__(/*! api/provider/html5/providers/Hls */ "./src/js/api/provider/html5/providers/Hls.js")["default"];
                registeProvider(_constants.PROVIDER_HLS, provider);
                return { name: _constants.PROVIDER_HLS, provider: provider };
            }).bind(null, __webpack_require__)).catch(function (err) {
                throw new Error('Network error');
            });
        },
        rtmp: function rtmp() {
            return Promise.all(/*! require.ensure | ovenplayer.provider.RtmpProvider */[__webpack_require__.e("ovenplayer.provider.DashProvider~ovenplayer.provider.HlsProvider~ovenplayer.provider.Html5~ovenplaye~2ec193ac"), __webpack_require__.e("ovenplayer.provider.RtmpProvider")]).then((function (require) {
                var provider = __webpack_require__(/*! api/provider/flash/providers/Rtmp */ "./src/js/api/provider/flash/providers/Rtmp.js")["default"];
                registeProvider(_constants.PROVIDER_RTMP, provider);
                return { name: _constants.PROVIDER_RTMP, provider: provider };
            }).bind(null, __webpack_require__)).catch(function (err) {
                throw new Error('Network error');
            });
        }
    };

    that.loadProviders = function (playlistItem) {
        var supportedProviderNames = supportChacker.findProviderNamesByPlaylist(playlistItem);
        OvenPlayerConsole.log("ProviderController loadProviders() ", supportedProviderNames);
        if (!supportedProviderNames) {
            return Promise.reject(_constants.ERRORS[_constants.INIT_UNSUPPORT_ERROR]);
        } else {
            return Promise.all(supportedProviderNames.filter(function (providerName) {
                return !!ProviderLoader[providerName];
            }).map(function (providerName) {
                return ProviderLoader[providerName]();
            }));
        }
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
 * @return     {Array}  Player source Object.
 */
OvenPlayerSDK.generateWebrtcUrls = function (sources) {
    return (_underscore2['default'].isArray(sources) ? sources : [sources]).map(function (source, index) {
        if (source.host && (0, _validator.isWebRTC)(source.host) && source.application && source.stream) {
            return { file: source.host + "/" + source.application + "/" + source.stream, type: "webrtc", label: source.label ? source.label : "webrtc-" + (index + 1) };
        }
    });
};

/**
 * Whether show the player core log or not.
 *
 * @param      {boolean}  boolean   run debug mode or not.
 * @return     {boolean}  run debug mode or not.
 */
OvenPlayerSDK.debug = function (isDebugMode) {
    if (isDebugMode) {
        window.OvenPlayerConsole = { log: window['console']['log'] };
    } else {
        window.OvenPlayerConsole = { log: function log() {} };
    }
    return isDebugMode;
};

exports['default'] = OvenPlayerSDK;

/***/ }),

/***/ "./src/js/utils/browser.js":
/*!*********************************!*\
  !*** ./src/js/utils/browser.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by hoho on 2018. 8. 24..
 */

var getBrowserLanguage = exports.getBrowserLanguage = function getBrowserLanguage() {
    var nav = window.navigator,
        browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
        i = void 0,
        language = void 0;

    // support for HTML 5.1 "navigator.languages"
    if (Array.isArray(nav.languages)) {
        for (i = 0; i < nav.languages.length; i++) {
            language = nav.languages[i];
            if (language && language.length) {
                return language;
            }
        }
    }

    // support for other well known properties in browsers
    for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
        language = nav[browserLanguagePropertyKeys[i]];
        if (language && language.length) {
            return language;
        }
    }

    return null;
};
var analUserAgent = exports.analUserAgent = function analUserAgent() {
    var unknown = '-';

    // screen
    var screenSize = '';
    if (screen.width) {
        var width = screen.width ? screen.width : '';
        var height = screen.height ? screen.height : '';
        screenSize += '' + width + " x " + height;
    }

    // browser
    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browser = navigator.appName;
    var version = '' + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var isWebview = false;
    var nameOffset = void 0,
        verOffset = void 0,
        ix = void 0;

    // Opera
    if ((verOffset = nAgt.indexOf('Opera')) != -1) {
        browser = 'Opera';
        version = nAgt.substring(verOffset + 6);
        if ((verOffset = nAgt.indexOf('Version')) != -1) {
            version = nAgt.substring(verOffset + 8);
        }
    }
    // Opera Next
    if ((verOffset = nAgt.indexOf('OPR')) != -1) {
        browser = 'Opera';
        version = nAgt.substring(verOffset + 4);
    }
    //삼성 브라우저
    else if ((verOffset = nAgt.indexOf('SamsungBrowser')) != -1) {
            browser = 'SamsungBrowser';
            version = nAgt.substring(verOffset + 15);
        }
        // Edge
        else if ((verOffset = nAgt.indexOf('Edge')) != -1) {
                browser = 'Microsoft Edge';
                version = nAgt.substring(verOffset + 5);
            }
            // MSIE
            else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
                    browser = 'Microsoft Internet Explorer';
                    version = nAgt.substring(verOffset + 5);

                    //win7 IE11 userAgent is ugly....
                    if (nAgt.indexOf('Trident/') !== -1 && nAgt.indexOf('rv:') !== -1) {
                        version = nAgt.substring(nAgt.indexOf('rv:') + 3);
                    }
                }
                // Chrome
                else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
                        browser = 'Chrome';
                        version = nAgt.substring(verOffset + 7);
                    } else if ((verOffset = nAgt.indexOf('CriOS')) != -1) {
                        //iphone - chrome
                        browser = 'Chrome';
                        version = nAgt.substring(verOffset + 6);
                    }
                    // Firefox
                    else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
                            browser = 'Firefox';
                            version = nAgt.substring(verOffset + 8);
                        } else if ((verOffset = nAgt.indexOf('FxiOS')) != -1) {
                            browser = 'Firefox';
                            version = nAgt.substring(verOffset + 6);
                        }
                        // Safari
                        else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
                                browser = 'Safari';
                                version = nAgt.substring(verOffset + 7);
                                if ((verOffset = nAgt.indexOf('Version')) != -1) {
                                    version = nAgt.substring(verOffset + 8);
                                }
                            }

                            // MSIE 11+
                            else if (nAgt.indexOf('Trident/') !== -1) {
                                    browser = 'Microsoft Internet Explorer';
                                    version = nAgt.substring(nAgt.indexOf('rv:') + 3);
                                }
                                // Other browsers
                                else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
                                        browser = nAgt.substring(nameOffset, verOffset);
                                        version = nAgt.substring(verOffset + 1);
                                        if (browser.toLowerCase() == browser.toUpperCase()) {
                                            browser = navigator.appName;
                                        }
                                    }
    if (nAgt.indexOf(' wv') > 0) {
        isWebview = true;
    }
    // trim the version string
    if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
    if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
    if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

    majorVersion = parseInt('' + version, 10);
    if (isNaN(majorVersion)) {
        version = '' + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
    }

    // mobile version
    var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

    // cookie
    var cookieEnabled = navigator.cookieEnabled ? true : false;

    if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
        document.cookie = 'testcookie';
        cookieEnabled = document.cookie.indexOf('testcookie') != -1 ? true : false;
    }

    // system
    var os = unknown;
    var clientStrings = [{ s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/ }, { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ }, { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ }, { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ }, { s: 'Windows Vista', r: /Windows NT 6.0/ }, { s: 'Windows Server 2003', r: /Windows NT 5.2/ }, { s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ }, { s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ }, { s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ }, { s: 'Windows 98', r: /(Windows 98|Win98)/ }, { s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ }, { s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ }, { s: 'Windows CE', r: /Windows CE/ }, { s: 'Windows 3.11', r: /Win16/ }, { s: 'Android', r: /Android/ }, { s: 'Open BSD', r: /OpenBSD/ }, { s: 'Sun OS', r: /SunOS/ }, { s: 'Linux', r: /(Linux|X11)/ }, { s: 'iOS', r: /(iPhone|iPad|iPod)/ }, { s: 'Mac OS X', r: /Mac OS X/ }, { s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ }, { s: 'QNX', r: /QNX/ }, { s: 'UNIX', r: /UNIX/ }, { s: 'BeOS', r: /BeOS/ }, { s: 'OS/2', r: /OS\/2/ }, { s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ }];
    for (var id in clientStrings) {
        var cs = clientStrings[id];
        if (cs.r.test(nAgt)) {
            os = cs.s;
            break;
        }
    }

    var osVersion = unknown;

    if (/Windows/.test(os)) {
        osVersion = /Windows (.*)/.exec(os)[1];
        os = 'Windows';
    }

    switch (os) {
        case 'Mac OS X':
            osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
            break;

        case 'Android':
            osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
            break;

        case 'iOS':
            osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
            osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
            break;
    }

    return {
        screen: screenSize,
        browser: browser,
        browserVersion: version,
        browserMajorVersion: majorVersion,
        mobile: mobile,
        ua: nAgt,
        os: os,
        osVersion: osVersion,
        cookies: cookieEnabled
    };
};

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

    if (_underscore2["default"].isElement(selectorOrElement) || _underscore2["default"].every(selectorOrElement, function (item) {
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
        if (value) {
            if ($element.length > 0) {
                $element.forEach(function (element) {
                    element.style[name] = value;
                });
            } else {
                $element.style[name] = value;
            }
        } else {
            return $element.style[name];
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

    /*that.append = (htmlCode) =>{
        $element.innerHTML += htmlCode;
    };*/

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
        if ($element.length > 1) {
            $element.parentElement.removeChild($element);
        } else {
            $element.remove();
        }
    };

    that.removeChild = function (element) {
        if (element) {
            $element.removeChild(element);
        } else {
            while ($element.hasChildNodes()) {
                $element.removeChild($element.firstChild);
            }
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
    return string ? string.replace(/^\s+|\s+$/g, '') : "";
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
        return "00:00";
    }
    var hours = Math.floor(secNum / 3600);
    var minutes = Math.floor((secNum - hours * 3600) / 60);
    var seconds = secNum - hours * 3600 - minutes * 60;

    //if (hours > 0) {minutes = "0"+minutes;}
    if (minutes < 10) {
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
  }; false || exports.nodeType ? n._ = h : ( true && !module.nodeType && module.exports && (exports = module.exports = h), exports._ = h), h.VERSION = "1.9.1";var v,
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
  });var D = n.document && n.document.childNodes; true && "object" != (typeof Int8Array === "undefined" ? "undefined" : _typeof(Int8Array)) && "function" != typeof D && (h.isFunction = function (n) {
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
  },  true && !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
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
exports.isDash = exports.isHls = exports.isWebRTC = exports.isRtmp = undefined;

var _strings = __webpack_require__(/*! utils/strings */ "./src/js/utils/strings.js");

var isRtmp = exports.isRtmp = function isRtmp(file, type) {
    if (file) {
        return file.indexOf('rtmp:') == 0 || type == 'rtmp';
    }
};
var isWebRTC = exports.isWebRTC = function isWebRTC(file, type) {
    if (file) {
        return file.indexOf('ws:') === 0 || file.indexOf('wss:') === 0 || type === 'webrtc';
    }
    return false;
};
var isHls = exports.isHls = function isHls(file, type) {
    if (file) {
        return type === 'hls' || type === 'm3u8' || type === 'application/vnd.apple.mpegurl' || (0, _strings.extractExtension)(file) == 'm3u8';
    }
};
var isDash = exports.isDash = function isDash(file, type) {
    if (file) {
        return type === 'mpd' || type === 'dash' || type === 'application/dash+xml' || (0, _strings.extractExtension)(file) == 'mpd';
    }
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
var version = exports.version = '0.9.6237-2019070114-localbuild';

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvQXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvQXBpRXhwYW5zaW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0NvbmZpZ3VyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0V2ZW50RW1pdHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0xhenlDb21tYW5kRXhlY3V0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9TdXBwb3J0Q2hlY2tlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2NhcHRpb24vTG9hZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvY2FwdGlvbi9NYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvY2FwdGlvbi9wYXJzZXIvU3J0UGFyc2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvY29uc3RhbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvbWVkaWEvTWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3BsYXlsaXN0L01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9Db250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9vdmVucGxheWVyLnNkay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvY2FwdGlvbnMvdnR0Q3VlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9saWtlQSQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3N0cmluZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3VuZGVyc2NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3ZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvd2VicGFjay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmVyc2lvbi5qcyJdLCJuYW1lcyI6WyJBcGkiLCJjb250YWluZXIiLCJ0aGF0IiwiY29uc29sZSIsImxvZyIsInZlcnNpb24iLCJPdmVuUGxheWVyQ29uc29sZSIsInBsYXlsaXN0TWFuYWdlciIsInByb3ZpZGVyQ29udHJvbGxlciIsInVzZXJBZ2VudE9iamVjdCIsIm1lZGlhTWFuYWdlciIsImN1cnJlbnRQcm92aWRlciIsInBsYXllckNvbmZpZyIsImxhenlRdWV1ZSIsImNhcHRpb25NYW5hZ2VyIiwicnVuTmV4dFBsYXlsaXN0IiwiaW5kZXgiLCJuZXh0UGxheWxpc3RJbmRleCIsInBsYXlsaXN0IiwiZ2V0UGxheWxpc3QiLCJoYXNOZXh0UGxheWxpc3QiLCJzZXRTb3VyY2VJbmRleCIsInNldEN1cnJlbnRQbGF5bGlzdCIsImluaXRQcm92aWRlciIsImlzQXV0b1N0YXJ0IiwicGxheSIsInRyaWdnZXIiLCJBTExfUExBWUxJU1RfRU5ERUQiLCJsYXN0UGxheVBvc2l0aW9uIiwicGlja1F1YWxpdHlGcm9tU291cmNlIiwic291cmNlcyIsInF1YWxpdHkiLCJpIiwibGVuZ3RoIiwiZ2V0U291cmNlSW5kZXgiLCJsb2FkUHJvdmlkZXJzIiwiZ2V0Q3VycmVudFBsYXlMaXN0IiwidGhlbiIsIlByb3ZpZGVycyIsIkVSUk9SUyIsIklOSVRfVU5TVVBQT1JUX0VSUk9SIiwiZGVzdHJveSIsImdldEN1cnJlbnRQbGF5bGlzdEluZGV4IiwiY3VycmVudFNvdXJjZUluZGV4IiwiZ2V0Q3VycmVudFNvdXJjZXMiLCJwcm92aWRlck5hbWUiLCJwcm92aWRlciIsImNyZWF0ZU1lZGlhIiwiZ2V0Q3VycmVudEFkVGFnIiwiUFJPVklERVJfUlRNUCIsIm9uIiwibmFtZSIsImRhdGEiLCJFUlJPUiIsIk5FVFdPUktfVU5TVEFCTEVEIiwiZ2V0U291cmNlcyIsInBhdXNlIiwic2V0Q3VycmVudFNvdXJjZSIsInByZWxvYWQiLCJSRUFEWSIsImZsdXNoIiwiZXJyb3IiLCJvZmYiLCJjb2RlIiwidGVtcEVycm9yIiwiSU5JVF9VTktOV09OX0VSUk9SIiwiaW5pdCIsIm9wdGlvbnMiLCJtZWRpYUNvbnRhaW5lciIsImJyb3dzZXIiLCJpbml0UGxheWxpc3QiLCJnZXRQcm92aWRlck5hbWUiLCJnZXROYW1lIiwiZ2V0Q29uZmlnIiwiZ2V0QnJvd3NlciIsInNldFRpbWVjb2RlTW9kZSIsImlzU2hvdyIsImlzVGltZWNvZGVNb2RlIiwiZ2V0RnJhbWVyYXRlIiwic2Vla0ZyYW1lIiwiZnJhbWVDb3VudCIsImdldER1cmF0aW9uIiwiZ2V0UG9zaXRpb24iLCJnZXRWb2x1bWUiLCJzZXRWb2x1bWUiLCJ2b2x1bWUiLCJzZXRNdXRlIiwic3RhdGUiLCJnZXRNdXRlIiwibG9hZCIsInNldEN1cnJlbnRRdWFsaXR5Iiwic2VlayIsInBvc2l0aW9uIiwic2V0UGxheWJhY2tSYXRlIiwicGxheWJhY2tSYXRlIiwiZ2V0UGxheWJhY2tSYXRlIiwiZ2V0Q3VycmVudFBsYXlsaXN0IiwiZ2V0Q3VycmVudFNvdXJjZSIsImN1cnJlbnRTb3VyY2UiLCJuZXdTb3VyY2UiLCJpc1NhbWVQcm92aWRlciIsInJlc3VsdFNvdXJjZUluZGV4IiwiUFJPVklERVJfSExTIiwiZ2V0UXVhbGl0eUxldmVscyIsImdldEN1cnJlbnRRdWFsaXR5IiwicXVhbGl0eUluZGV4IiwiaXNBdXRvUXVhbGl0eSIsInNldEF1dG9RdWFsaXR5IiwiaXNBdXRvIiwiZ2V0Q2FwdGlvbkxpc3QiLCJnZXRDdXJyZW50Q2FwdGlvbiIsInNldEN1cnJlbnRDYXB0aW9uIiwiYWRkQ2FwdGlvbiIsInRyYWNrIiwicmVtb3ZlQ2FwdGlvbiIsImdldEJ1ZmZlciIsImdldFN0YXRlIiwic3RvcCIsInJlbW92ZSIsIkRFU1RST1kiLCJPdmVuUGxheWVyU0RLIiwicmVtb3ZlUGxheWVyIiwiZ2V0Q29udGFpbmVySWQiLCJnZXRQbGF5ZXJMaXN0IiwiZ2V0VmVyc2lvbiIsIkFwaVJ0bXBFeHBhbnNpb24iLCJleHRlcm5hbENhbGxiYWNrQ3JlZXAiLCJyZXN1bHQiLCJ0cmlnZ2VyRXZlbnRGcm9tRXh0ZXJuYWwiLCJDb25maWd1cmF0b3IiLCJjb21wb3NlU291cmNlT3B0aW9ucyIsIkRlZmF1bHRzIiwicGxheWJhY2tSYXRlcyIsIm11dGUiLCJsb29wIiwiY29udHJvbHMiLCJhdXRvU3RhcnQiLCJ0aW1lY29kZSIsInNvdXJjZUluZGV4IiwiaGlkZVBsYXlsaXN0SWNvbiIsInJ0bXBCdWZmZXJUaW1lIiwicnRtcEJ1ZmZlclRpbWVNYXgiLCJhZENsaWVudCIsInNlcmlhbGl6ZSIsInZhbCIsInVuZGVmaW5lZCIsImxvd2VyY2FzZVZhbCIsInRvTG93ZXJDYXNlIiwiaXNOYU4iLCJOdW1iZXIiLCJwYXJzZUZsb2F0IiwiZGVzZXJpYWxpemUiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImtleSIsImNvbmZpZyIsImZpbHRlciIsIl8iLCJpc051bWJlciIsInJhdGUiLCJtYXAiLCJNYXRoIiwicm91bmQiLCJpbmRleE9mIiwicHVzaCIsInNvcnQiLCJjb25maWdQbGF5bGlzdCIsIm9iaiIsInBpY2siLCJpc0FycmF5IiwiZmVlZERhdGEiLCJkdXJhdGlvbiIsInNwZWMiLCJpc0Z1bGxzY3JlZW4iLCJnZXRBZENsaWVudCIsInNldENvbmZpZyIsInZhbHVlIiwiZ2V0Q29udGFpbmVyIiwic2V0RnVsbHNjcmVlbiIsImdldFF1YWxpdHlMYWJlbCIsInF1YWxpdHlMYWJlbCIsInNldFF1YWxpdHlMYWJlbCIsIm5ld0xhYmVsIiwiQ09OVEVOVF9USU1FX01PREVfQ0hBTkdFRCIsImdldFJ0bXBCdWZmZXJUaW1lIiwiZ2V0UnRtcEJ1ZmZlclRpbWVNYXgiLCJpc011dGUiLCJpc0xvb3AiLCJpc0NvbnRyb2xzIiwiZ2V0UGxheWJhY2tSYXRlcyIsInNldFBsYXlsaXN0IiwiRXZlbnRFbWl0dGVyIiwib2JqZWN0IiwiX2V2ZW50cyIsInRyaWdnZXJFdmVudHMiLCJldmVudHMiLCJhcmdzIiwiY29udGV4dCIsImV2ZW50IiwibGlzdGVuZXIiLCJhcHBseSIsInNsaWNlIiwiY2FsbCIsImFyZ3VtZW50cyIsImFsbEV2ZW50cyIsImFsbCIsIm5hbWVzIiwibCIsInJldGFpbiIsImoiLCJrIiwiX2xpc3RlbmVyIiwib25jZSIsImNvdW50Iiwib25jZUNhbGxiYWNrIiwiTGF6eUNvbW1hbmRFeGVjdXRvciIsImluc3RhbmNlIiwicXVldWVkQ29tbWFuZHMiLCJjb21tYW5kUXVldWUiLCJ1bmRlY29yYXRlZE1ldGhvZHMiLCJleGVjdXRlTW9kZSIsImNvbW1hbmQiLCJtZXRob2QiLCJBcnJheSIsInByb3RvdHlwZSIsImFkZFF1ZXVlIiwiZXhlY3V0ZVF1ZXVlZENvbW1hbmRzIiwic2hpZnQiLCJzZXRFeGVjdXRlTW9kZSIsIm1vZGUiLCJnZXRVbmRlY29yYXRlZE1ldGhvZHMiLCJnZXRRdWV1ZSIsImVtcHR5IiwicmVtb3ZlQW5kRXhjdXRlT25jZSIsImNvbW1hbmRfIiwiY29tbWFuZFF1ZXVlSXRlbSIsImZpbmRXaGVyZSIsInNwbGljZSIsImZpbmRJbmRleCIsIlN1cHBvcnRDaGVja2VyIiwic3VwcG9ydExpc3QiLCJjaGVja1N1cHBvcnQiLCJzb3VyY2UiLCJNaW1lVHlwZXMiLCJhYWMiLCJtcDQiLCJmNHYiLCJtNHYiLCJtb3YiLCJtcDMiLCJtcGVnIiwib2d2Iiwib2dnIiwib2dhIiwidm9yYmlzIiwid2VibSIsImY0YSIsIm0zdTgiLCJtM3UiLCJobHMiLCJ2aWRlbyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNhblBsYXlUeXBlIiwiZmlsZSIsInR5cGUiLCJtaW1lVHlwZSIsIndpbmRvdyIsIk1lZGlhU291cmNlIiwiV2ViS2l0TWVkaWFTb3VyY2UiLCJpc0hsc1N1cHBvcnQiLCJnZXRNZWRpYVNvdXJjZSIsIm1lZGlhU291cmNlIiwic291cmNlQnVmZmVyIiwiU291cmNlQnVmZmVyIiwiV2ViS2l0U291cmNlQnVmZmVyIiwiaXNUeXBlU3VwcG9ydGVkIiwic291cmNlQnVmZmVyVmFsaWRBUEkiLCJhcHBlbmRCdWZmZXIiLCJ0ZXN0Rmxhc2giLCJzdXBwb3J0IiwiQWN0aXZlWE9iamVjdCIsImUiLCJuYXZpZ2F0b3IiLCJtaW1lVHlwZXMiLCJvcyIsImZpbmRQcm92aWRlck5hbWVCeVNvdXJjZSIsInNvcnVjZV8iLCJmaW5kUHJvdmlkZXJOYW1lc0J5UGxheWxpc3QiLCJwbGF5bGlzdEl0ZW0iLCJzdXBwb3J0TmFtZXMiLCJpdGVtIiwic3VwcG9ydGVkIiwiTG9hZGVyIiwiY29udmVydFRvVlRUQ3VlcyIsImN1ZXMiLCJWVFRDdWUiLCJjdWUiLCJzdGFydCIsImVuZCIsInRleHQiLCJsYW5ndWFnZSIsInN1Y2Nlc3NDYWxsYmFjayIsImVycm9yQ2FsbGJhY2siLCJyZXF1ZXN0T3B0aW9ucyIsInVybCIsImVuY29kaW5nIiwibG9hZFJlcXVlc3REb3dubG9kZXIiLCJSZXF1ZXN0IiwicmVzcG9uc2UiLCJib2R5IiwidnR0Q3VlcyIsImxvYWRWdHRQYXJzZXIiLCJwYXJzZXIiLCJXZWJWVFQiLCJQYXJzZXIiLCJTdHJpbmdEZWNvZGVyIiwib25jdWUiLCJvbmZsdXNoIiwicGFyc2UiLCJsb2FkU21pUGFyc2VyIiwicGFyc2VkRGF0YSIsIlNtaVBhcnNlciIsImZpeGVkTGFuZyIsInJlcXVpcmUiLCJlcnIiLCJpc1N1cHBvcnQiLCJraW5kIiwiTWFuYWdlciIsImFwaSIsInBsYXlsaXN0SW5kZXgiLCJjYXB0aW9uTGlzdCIsImN1cnJlbnRDYXB0aW9uSW5kZXgiLCJjYXB0aW9uTG9hZGVyIiwiaXNGaXNydExvYWQiLCJpc1Nob3dpbmciLCJiaW5kVHJhY2siLCJsYWJlbCIsImlkIiwidHJhY2tzQ291bnQiLCJ0cmFja0lkIiwicHJlZml4IiwiZGVmYXVsdHRyYWNrIiwiY2hhbmdlQ3VycmVudENhcHRpb24iLCJDT05URU5UX0NBUFRJT05fQ0hBTkdFRCIsInRyYWNrcyIsImxhbmciLCJjYXB0aW9uSWQiLCJQTEFZRVJfQ0FQVElPTl9FUlJPUiIsIkNPTlRFTlRfVElNRSIsIm1ldGEiLCJjdXJyZW50Q3VlcyIsInN0YXJ0VGltZSIsImVuZFRpbWUiLCJDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQiLCJmbHVzaENhcHRpb25MaXN0IiwibGFzdENhcHRpb25JbmRleCIsIl9pbmRleCIsIl9lbnRyeSIsImVudHJ5IiwiYXJyYXkiLCJzcGxpdCIsImlkeCIsImxpbmUiLCJzdWJzdHIiLCJqb2luIiwiU3J0UGFyc2VyIiwiY2FwdGlvbnMiLCJsaXN0IiwiU1RBVEVfQlVGRkVSSU5HIiwiU1RBVEVfSURMRSIsIlNUQVRFX0NPTVBMRVRFIiwiU1RBVEVfUEFVU0VEIiwiU1RBVEVfUExBWUlORyIsIlNUQVRFX0VSUk9SIiwiU1RBVEVfTE9BRElORyIsIlNUQVRFX1NUQUxMRUQiLCJTVEFURV9BRF9MT0FESU5HIiwiU1RBVEVfQURfTE9BREVEIiwiU1RBVEVfQURfUExBWUlORyIsIlNUQVRFX0FEX1BBVVNFRCIsIlNUQVRFX0FEX0NPTVBMRVRFIiwiU1RBVEVfQURfRVJST1IiLCJQTEFZRVJfQURfQ0xJQ0siLCJQUk9WSURFUl9IVE1MNSIsIlBST1ZJREVSX1dFQlJUQyIsIlBST1ZJREVSX0RBU0giLCJDT05URU5UX0NPTVBMRVRFIiwiQ09OVEVOVF9TRUVLIiwiQ09OVEVOVF9CVUZGRVJfRlVMTCIsIkRJU1BMQVlfQ0xJQ0siLCJDT05URU5UX0xPQURFRCIsIlBMQVlMSVNUX0NIQU5HRUQiLCJDT05URU5UX1NFRUtFRCIsIlBMQVlFUl9TVEFURSIsIlBMQVlFUl9DT01QTEVURSIsIlBMQVlFUl9QQVVTRSIsIlBMQVlFUl9QTEFZIiwiUExBWUVSX0NMSUNLRUQiLCJQTEFZRVJfUkVTSVpFRCIsIlBMQVlFUl9MT0FESU5HIiwiUExBWUVSX0ZVTExTQ1JFRU5fUkVRVUVTVCIsIlBMQVlFUl9GVUxMU0NSRUVOX0NIQU5HRUQiLCJQTEFZRVJfV0FSTklORyIsIkFEX0NIQU5HRUQiLCJBRF9USU1FIiwiQ09OVEVOVF9CVUZGRVIiLCJDT05URU5UX1JBVEVfQ0hBTkdFIiwiQ09OVEVOVF9WT0xVTUUiLCJDT05URU5UX01VVEUiLCJDT05URU5UX01FVEEiLCJDT05URU5UX1NPVVJDRV9DSEFOR0VEIiwiQ09OVEVOVF9MRVZFTF9DSEFOR0VEIiwiUExBWUJBQ0tfUkFURV9DSEFOR0VEIiwiT01FX1AyUF9NT0RFIiwiQURfQ0xJRU5UX0dPT0dMRUlNQSIsIkFEX0NMSUVOVF9WQVNUIiwiSU5JVF9SVE1QX1NFVFVQX0VSUk9SIiwiSU5JVF9EQVNIX1VOU1VQUE9SVCIsIklOSVRfQURTX0VSUk9SIiwiSU5JVF9EQVNIX05PVEZPVU5EIiwiSU5JVF9ITFNKU19OT1RGT1VORCIsIlBMQVlFUl9VTktOV09OX0VSUk9SIiwiUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SIiwiUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUiIsIlBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUiIsIlBMQVlFUl9GSUxFX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19XU19FUlJPUiIsIlBMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUiIsIlBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19DUkVBVEVfQU5TV0VSX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUiIsIlBMQVlFUl9XRUJSVENfTkVUV09SS19TTE9XIiwiV0FSTl9NU0dfTVVURURQTEFZIiwibWVzc2FnZSIsInJlYXNvbiIsIlVJX0lDT05TIiwidm9sdW1lX211dGUiLCJvcF93YXJuaW5nIiwiYnJvd3NlckluZm8iLCJTV0ZQYXRoIiwicm9vdElkIiwiZ2V0QXR0cmlidXRlIiwiJGNvbnRhaW5lciIsInZpZGVvRWxlbWVudCIsImNyZWF0ZUh0bWxWaWRlbyIsInNldEF0dHJpYnV0ZSIsImFwcGVuZCIsImNyZWF0ZUZsYXNoVmlkZW8iLCJidWZmZXJUaW1lIiwiYnVmZmVyVGltZU1heCIsIm1vdmllIiwiZmxhc2h2YXJzIiwiYWxsb3dzY3JpcHRhY2Nlc3MiLCJhbGxvd2Z1bGxzY3JlZW4iLCJtZW51IiwicXVhbCIsImJnY29sb3IiLCJ3bW9kZSIsImJyb3dzZXJNYWpvclZlcnNpb24iLCJhcHBlbmRDaGlsZCIsImNyZWF0ZUFkQ29udGFpbmVyIiwiYWRDb250YWluZXIiLCJyZW1vdmVDaGlsZCIsImN1cnJlbnRQbGF5bGlzdEl0ZW0iLCJjdXJyZW50SW5kZXgiLCJzdXBwb3J0Q2hlY2tlciIsIm1ha2VQcmV0dHlTb3VyY2UiLCJzb3VyY2VfIiwiaG9zdCIsImFwcGxpY2F0aW9uIiwic3RyZWFtIiwibWltZXR5cGVSZWdFeCIsInRlc3QiLCJyZXBsYWNlIiwicHJldHRpZWRQbGF5bGlzdCIsInRpdGxlIiwibGV2ZWxzIiwicHJldHR5U291cmNlIiwiZGVmYXVsdFNvdXJjZSIsInRvU3RyaW5nIiwiY29uY2F0IiwiYWRUYWdVcmwiLCJDb250cm9sbGVyIiwic3VwcG9ydENoYWNrZXIiLCJyZWdpc3RlUHJvdmlkZXIiLCJQcm92aWRlckxvYWRlciIsImh0bWw1IiwiRXJyb3IiLCJ3ZWJydGMiLCJkYXNoIiwicnRtcCIsInN1cHBvcnRlZFByb3ZpZGVyTmFtZXMiLCJQcm9taXNlIiwicmVqZWN0IiwiZmluZEJ5TmFtZSIsImdldFByb3ZpZGVyQnlTb3VyY2UiLCJzdXBwb3J0ZWRQcm92aWRlck5hbWUiLCJfX3dlYnBhY2tfcHVibGljX3BhdGhfXyIsInBsYXllckxpc3QiLCJjaGVja0FuZEdldENvbnRhaW5lckVsZW1lbnQiLCJjb250YWluZXJFbGVtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJub2RlVHlwZSIsImNyZWF0ZSIsInBsYXllckluc3RhbmNlIiwiZ2V0UGxheWVyQnlDb250YWluZXJJZCIsImNvbnRhaW5lcklkIiwiZ2V0UGxheWVyQnlJbmRleCIsInBsYXllcklkIiwiZ2VuZXJhdGVXZWJydGNVcmxzIiwiZGVidWciLCJpc0RlYnVnTW9kZSIsImdldEJyb3dzZXJMYW5ndWFnZSIsIm5hdiIsImJyb3dzZXJMYW5ndWFnZVByb3BlcnR5S2V5cyIsImxhbmd1YWdlcyIsImFuYWxVc2VyQWdlbnQiLCJ1bmtub3duIiwic2NyZWVuU2l6ZSIsInNjcmVlbiIsIndpZHRoIiwiaGVpZ2h0IiwiblZlciIsImFwcFZlcnNpb24iLCJuQWd0IiwidXNlckFnZW50IiwiYXBwTmFtZSIsIm1ham9yVmVyc2lvbiIsInBhcnNlSW50IiwiaXNXZWJ2aWV3IiwibmFtZU9mZnNldCIsInZlck9mZnNldCIsIml4Iiwic3Vic3RyaW5nIiwibGFzdEluZGV4T2YiLCJ0b1VwcGVyQ2FzZSIsIm1vYmlsZSIsImNvb2tpZUVuYWJsZWQiLCJjb29raWUiLCJjbGllbnRTdHJpbmdzIiwicyIsInIiLCJjcyIsIm9zVmVyc2lvbiIsImV4ZWMiLCJicm93c2VyVmVyc2lvbiIsInVhIiwiY29va2llcyIsImF1dG9LZXl3b3JkIiwiZGlyZWN0aW9uU2V0dGluZyIsImFsaWduU2V0dGluZyIsImZpbmREaXJlY3Rpb25TZXR0aW5nIiwiZGlyIiwiZmluZEFsaWduU2V0dGluZyIsImFsaWduIiwiZXh0ZW5kIiwiY29iaiIsInAiLCJpc0lFOCIsImJhc2VPYmoiLCJlbnVtZXJhYmxlIiwiaGFzQmVlblJlc2V0IiwiX2lkIiwiX3BhdXNlT25FeGl0IiwiX3N0YXJ0VGltZSIsIl9lbmRUaW1lIiwiX3RleHQiLCJfcmVnaW9uIiwiX3ZlcnRpY2FsIiwiX3NuYXBUb0xpbmVzIiwiX2xpbmUiLCJfbGluZUFsaWduIiwiX3Bvc2l0aW9uIiwiX3Bvc2l0aW9uQWxpZ24iLCJfc2l6ZSIsIl9hbGlnbiIsImRlZmluZVByb3BlcnR5IiwiZ2V0Iiwic2V0IiwiVHlwZUVycm9yIiwic2V0dGluZyIsIlN5bnRheEVycm9yIiwiZGlzcGxheVN0YXRlIiwiZ2V0Q3VlQXNIVE1MIiwiY29udmVydEN1ZVRvRE9NVHJlZSIsIkxhJCIsInNlbGVjdG9yT3JFbGVtZW50IiwicmV0dXJuTm9kZSIsIiRlbGVtZW50Iiwic2VsZWN0b3IiLCJub2RlTGlzdCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpc0VsZW1lbnQiLCJldmVyeSIsImZpbmQiLCJjc3MiLCJlbGVtZW50Iiwic3R5bGUiLCJhZGRDbGFzcyIsImNsYXNzTGlzdCIsImFkZCIsImNsYXNzTmFtZXMiLCJjbGFzc05hbWUiLCJyZW1vdmVDbGFzcyIsIlJlZ0V4cCIsInJlbW92ZUF0dHJpYnV0ZSIsImF0dHJOYW1lIiwic2hvdyIsImRpc3BsYXkiLCJoaWRlIiwidGV4dENvbnRlbnQiLCJodG1sIiwiaW5uZXJIVE1MIiwiaGFzQ2xhc3MiLCJjb250YWlucyIsImlzIiwiJHRhcmdldEVsZW1lbnQiLCJvZmZzZXQiLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwidG9wIiwic2Nyb2xsVG9wIiwibGVmdCIsInNjcm9sbExlZnQiLCJjbGllbnRXaWR0aCIsImNsaWVudEhlaWdodCIsImF0dHIiLCJyZXBsYWNlV2l0aCIsInBhcmVudEVsZW1lbnQiLCJoYXNDaGlsZE5vZGVzIiwiZmlyc3RDaGlsZCIsImNsb3Nlc3QiLCJzZWxlY3RvclN0cmluZyIsImNsb3Nlc3RFbGVtZW50IiwidHJpbSIsIm5hdHVyYWxIbXMiLCJobXNUb1NlY29uZCIsInN0cmluZyIsImV4dHJhY3RFeHRlbnNpb24iLCJwYXRoIiwiZ2V0QXp1cmVGaWxlRm9ybWF0IiwiZXh0ZW5zaW9uIiwiYXp1cmVkRm9ybWF0Iiwic2Vjb25kIiwic2VjTnVtIiwiaG91cnMiLCJmbG9vciIsIm1pbnV0ZXMiLCJzZWNvbmRzIiwic3RyIiwiZnJhbWVSYXRlIiwiYXJyIiwiYXJyTGVuZ3RoIiwic2VjIiwic2VjSW5kZXgiLCJuIiwic2VsZiIsImdsb2JhbCIsIm8iLCJTeW1ib2wiLCJ1IiwiYyIsImhhc093blByb3BlcnR5IiwidCIsImEiLCJmIiwiaCIsIl93cmFwcGVkIiwiZXhwb3J0cyIsIm1vZHVsZSIsIlZFUlNJT04iLCJ2IiwieSIsImQiLCJpdGVyYXRlZSIsImlkZW50aXR5IiwiaXNGdW5jdGlvbiIsImlzT2JqZWN0IiwibWF0Y2hlciIsInByb3BlcnR5IiwiZyIsIm1heCIsIm0iLCJiIiwieCIsInBvdyIsIkEiLCJ3IiwiZWFjaCIsImNvbGxlY3QiLCJPIiwicmVkdWNlIiwiZm9sZGwiLCJpbmplY3QiLCJyZWR1Y2VSaWdodCIsImZvbGRyIiwiZGV0ZWN0IiwiZmluZEtleSIsInNlbGVjdCIsIm5lZ2F0ZSIsInNvbWUiLCJhbnkiLCJpbmNsdWRlcyIsImluY2x1ZGUiLCJ2YWx1ZXMiLCJpbnZva2UiLCJwbHVjayIsIndoZXJlIiwibWluIiwic2h1ZmZsZSIsInNhbXBsZSIsInJhbmRvbSIsImNsb25lIiwic29ydEJ5IiwiY3JpdGVyaWEiLCJncm91cEJ5IiwiaW5kZXhCeSIsImNvdW50QnkiLCJTIiwidG9BcnJheSIsImlzU3RyaW5nIiwibWF0Y2giLCJzaXplIiwicGFydGl0aW9uIiwiZmlyc3QiLCJoZWFkIiwidGFrZSIsImluaXRpYWwiLCJsYXN0IiwicmVzdCIsInRhaWwiLCJkcm9wIiwiY29tcGFjdCIsIkJvb2xlYW4iLCJNIiwiaXNBcmd1bWVudHMiLCJmbGF0dGVuIiwid2l0aG91dCIsImRpZmZlcmVuY2UiLCJ1bmlxIiwidW5pcXVlIiwiaXNCb29sZWFuIiwidW5pb24iLCJpbnRlcnNlY3Rpb24iLCJ1bnppcCIsInppcCIsIkYiLCJmaW5kTGFzdEluZGV4Iiwic29ydGVkSW5kZXgiLCJFIiwicmFuZ2UiLCJjZWlsIiwiY2h1bmsiLCJOIiwiYmluZCIsInBhcnRpYWwiLCJwbGFjZWhvbGRlciIsImJpbmRBbGwiLCJtZW1vaXplIiwiY2FjaGUiLCJkZWxheSIsInNldFRpbWVvdXQiLCJkZWZlciIsInRocm90dGxlIiwibGVhZGluZyIsIm5vdyIsImNsZWFyVGltZW91dCIsInRyYWlsaW5nIiwiY2FuY2VsIiwiZGVib3VuY2UiLCJ3cmFwIiwiY29tcG9zZSIsImFmdGVyIiwiYmVmb3JlIiwicmVzdEFyZ3VtZW50cyIsIkkiLCJwcm9wZXJ0eUlzRW51bWVyYWJsZSIsIlQiLCJCIiwiY29uc3RydWN0b3IiLCJhbGxLZXlzIiwibWFwT2JqZWN0IiwicGFpcnMiLCJpbnZlcnQiLCJmdW5jdGlvbnMiLCJtZXRob2RzIiwiUiIsImV4dGVuZE93biIsImFzc2lnbiIsInEiLCJLIiwieiIsIm9taXQiLCJTdHJpbmciLCJkZWZhdWx0cyIsInRhcCIsImlzTWF0Y2giLCJ2YWx1ZU9mIiwicG9wIiwiaXNFcXVhbCIsImlzRW1wdHkiLCJEIiwiY2hpbGROb2RlcyIsIkludDhBcnJheSIsImlzRmluaXRlIiwiaXNTeW1ib2wiLCJpc051bGwiLCJpc1VuZGVmaW5lZCIsImhhcyIsIm5vQ29uZmxpY3QiLCJjb25zdGFudCIsIm5vb3AiLCJwcm9wZXJ0eU9mIiwibWF0Y2hlcyIsInRpbWVzIiwiRGF0ZSIsImdldFRpbWUiLCJMIiwiUCIsIlciLCJlc2NhcGUiLCJ1bmVzY2FwZSIsIkMiLCJ1bmlxdWVJZCIsInRlbXBsYXRlU2V0dGluZ3MiLCJldmFsdWF0ZSIsImludGVycG9sYXRlIiwiSiIsIlUiLCJWIiwiJCIsInRlbXBsYXRlIiwidmFyaWFibGUiLCJGdW5jdGlvbiIsImNoYWluIiwiX2NoYWluIiwiRyIsIm1peGluIiwidG9KU09OIiwiZGVmaW5lIiwiaXNSdG1wIiwiaXNXZWJSVEMiLCJpc0hscyIsImlzRGFzaCIsImdldFNjcmlwdFBhdGgiLCJzY3JpcHROYW1lIiwic2NyaXB0cyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwic3JjIiwiX19WRVJTSU9OX18iXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGdCQUFRLG9CQUFvQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQSxpREFBeUMsczRCQUFzNEI7QUFDLzZCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQSx5Q0FBaUM7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBd0Isa0NBQWtDO0FBQzFELGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQSxrREFBMEMsb0JBQW9CLFdBQVc7O0FBRXpFO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQWdCLHVCQUF1QjtBQUN2Qzs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDck1BOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDOztBQUU1Qzs7Ozs7Ozs7Ozs7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckJBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBOzs7Ozs7QUFNQSxJQUFNQSxNQUFNLFNBQU5BLEdBQU0sQ0FBU0MsU0FBVCxFQUFtQjtBQUMzQixRQUFNQyxPQUFPLEVBQWI7QUFDQSxtQ0FBYUEsSUFBYjs7QUFHQUMsWUFBUUMsR0FBUixDQUFZLHNCQUFxQkMsZ0JBQWpDO0FBQ0FDLHNCQUFrQkYsR0FBbEIsQ0FBc0IsYUFBdEI7O0FBRUEsUUFBSUcsa0JBQWtCLDBCQUFnQkwsSUFBaEIsQ0FBdEI7QUFDQSxRQUFJTSxxQkFBcUIsOEJBQXpCO0FBQ0EsUUFBSUMsa0JBQWtCLDZCQUF0QjtBQUNBLFFBQUlDLGVBQWUsMEJBQWFULFNBQWIsRUFBd0JRLGVBQXhCLENBQW5CO0FBQ0EsUUFBSUUsa0JBQWtCLEVBQXRCO0FBQ0EsUUFBSUMsZUFBZSxFQUFuQjtBQUNBLFFBQUlDLFlBQVksRUFBaEI7QUFDQSxRQUFJQyxpQkFBaUIsRUFBckI7O0FBR0EsUUFBTUMsa0JBQWtCLFNBQWxCQSxlQUFrQixDQUFTQyxLQUFULEVBQWU7QUFDbkNWLDBCQUFrQkYsR0FBbEIsQ0FBc0IsaUJBQXRCO0FBQ0EsWUFBSWEsb0JBQW9CRCxLQUF4QixDQUZtQyxDQUVKO0FBQy9CLFlBQUlFLFdBQVdYLGdCQUFnQlksV0FBaEIsRUFBZjtBQUNBLFlBQUlDLGtCQUFrQkYsU0FBU0QsaUJBQVQsSUFBNkIsSUFBN0IsR0FBb0MsS0FBMUQ7QUFDQTtBQUNBTCxxQkFBYVMsY0FBYixDQUE0QixDQUE1QjtBQUNBLFlBQUdELGVBQUgsRUFBbUI7QUFDZjtBQUNBUCx3QkFBWSxzQ0FBb0JYLElBQXBCLEVBQTBCLENBQUMsTUFBRCxFQUFRLE1BQVIsRUFBZSxNQUFmLENBQTFCLENBQVo7QUFDQUssNEJBQWdCZSxrQkFBaEIsQ0FBbUNMLGlCQUFuQztBQUNBTTs7QUFHQSxnQkFBRyxDQUFDWCxhQUFhWSxXQUFiLEVBQUosRUFBK0I7QUFDM0I7QUFDQXRCLHFCQUFLdUIsSUFBTDtBQUNIO0FBQ0osU0FYRCxNQVdLO0FBQ0Q7QUFDQXZCLGlCQUFLd0IsT0FBTCxDQUFhQyw2QkFBYixFQUFpQyxJQUFqQztBQUNIO0FBQ0osS0F0QkQ7QUF1QkEsUUFBTUosZUFBZSxTQUFmQSxZQUFlLENBQVNLLGdCQUFULEVBQTBCO0FBQzNDLFlBQU1DLHdCQUF3QixTQUF4QkEscUJBQXdCLENBQUNDLE9BQUQsRUFBWTtBQUN0QyxnQkFBSUMsVUFBVSxDQUFkO0FBQ0EsZ0JBQUlELE9BQUosRUFBYTtBQUNULHFCQUFLLElBQUlFLElBQUksQ0FBYixFQUFnQkEsSUFBSUYsUUFBUUcsTUFBNUIsRUFBb0NELEdBQXBDLEVBQXlDO0FBQ3JDLHdCQUFJRixRQUFRRSxDQUFSLFlBQUosRUFBd0I7QUFDcEJELGtDQUFVQyxDQUFWO0FBQ0g7QUFDRCx3QkFBSXBCLGFBQWFzQixjQUFiLE9BQWtDRixDQUF0QyxFQUEwQztBQUN0QywrQkFBT0EsQ0FBUDtBQUNIO0FBQ0Q7OztBQUdIO0FBQ0o7QUFDRCxtQkFBT0QsT0FBUDtBQUNILFNBaEJEOztBQWtCQSxlQUFPdkIsbUJBQW1CMkIsYUFBbkIsQ0FBaUM1QixnQkFBZ0I2QixrQkFBaEIsRUFBakMsRUFBdUVDLElBQXZFLENBQTRFLHFCQUFhO0FBQzVGLGdCQUFHQyxVQUFVTCxNQUFWLEdBQW1CLENBQXRCLEVBQXdCO0FBQ3BCLHNCQUFNTSxrQkFBT0MsK0JBQVAsQ0FBTjtBQUNIOztBQUVELGdCQUFHN0IsZUFBSCxFQUFtQjtBQUNmQSxnQ0FBZ0I4QixPQUFoQjtBQUNBOUIsa0NBQWtCLElBQWxCO0FBQ0g7QUFDRCxnQkFBR0csY0FBSCxFQUFrQjtBQUNkQSwrQkFBZTJCLE9BQWY7QUFDQTNCLGlDQUFpQixJQUFqQjtBQUNIO0FBQ0RBLDZCQUFpQiwwQkFBZVosSUFBZixFQUFxQkssZ0JBQWdCbUMsdUJBQWhCLEVBQXJCLENBQWpCO0FBQ0FwQyw4QkFBa0JGLEdBQWxCLENBQXNCLHVCQUF0Qjs7QUFFQSxnQkFBSXVDLHFCQUFxQmQsc0JBQXNCdEIsZ0JBQWdCcUMsaUJBQWhCLEVBQXRCLENBQXpCO0FBQ0EsZ0JBQUlDLGVBQWVQLFVBQVVLLGtCQUFWLEVBQThCLE1BQTlCLENBQW5CO0FBQ0FyQyw4QkFBa0JGLEdBQWxCLENBQXNCLHVCQUF0QixFQUErQ3lDLFlBQS9DO0FBQ0E7QUFDQWxDLDhCQUFtQjJCLFVBQVVLLGtCQUFWLEVBQThCRyxRQUE5QixDQUNmcEMsYUFBYXFDLFdBQWIsQ0FBeUJGLFlBQXpCLEVBQXVDakMsWUFBdkMsQ0FEZSxFQUVmQSxZQUZlLEVBR2ZMLGdCQUFnQnlDLGVBQWhCLEVBSGUsQ0FBbkI7O0FBUUEsZ0JBQUdILGlCQUFpQkksd0JBQXBCLEVBQWtDO0FBQzlCO0FBQ0EseUJBQWMvQyxJQUFkLEVBQW9CLHFDQUFpQlMsZUFBakIsQ0FBcEI7QUFDSDs7QUFFRDtBQUNBQSw0QkFBZ0J1QyxFQUFoQixDQUFtQixLQUFuQixFQUEwQixVQUFTQyxJQUFULEVBQWVDLElBQWYsRUFBb0I7O0FBRTFDbEQscUJBQUt3QixPQUFMLENBQWF5QixJQUFiLEVBQW1CQyxJQUFuQjs7QUFFQSxvQkFBR0QsU0FBUyxVQUFaLEVBQXVCO0FBQ25CcEMsb0NBQWdCUixnQkFBZ0JtQyx1QkFBaEIsS0FBNEMsQ0FBNUQ7QUFDSDs7QUFFRDtBQUNBO0FBQ0Esb0JBQUlTLFNBQVNFLGdCQUFULElBQWtCRixTQUFTRyw0QkFBL0IsRUFBa0Q7QUFDOUM7QUFDQSx3QkFBRzFDLGFBQWFzQixjQUFiLEtBQThCLENBQTlCLEdBQWtDaEMsS0FBS3FELFVBQUwsR0FBa0J0QixNQUF2RCxFQUE4RDtBQUMxRDtBQUNBL0IsNkJBQUtzRCxLQUFMO0FBQ0F0RCw2QkFBS3VELGdCQUFMLENBQXNCN0MsYUFBYXNCLGNBQWIsS0FBOEIsQ0FBcEQ7QUFDSDtBQUNKO0FBQ0osYUFsQkQ7QUFvQkgsU0F0RE0sRUFzREpHLElBdERJLENBc0RDLFlBQUk7O0FBRVI7QUFDQTFCLDRCQUFnQitDLE9BQWhCLENBQXdCbkQsZ0JBQWdCcUMsaUJBQWhCLEVBQXhCLEVBQTZEaEIsZ0JBQTdELEVBQStFUyxJQUEvRSxDQUFvRixZQUFVO0FBQzFGbkMscUJBQUt3QixPQUFMLENBQWFpQyxnQkFBYjs7QUFFQTlDLDBCQUFVK0MsS0FBVjtBQUNBO0FBQ0EvQywwQkFBVTRCLE9BQVY7QUFFSCxhQVBELFdBT1MsVUFBQ29CLEtBQUQsRUFBVztBQUNoQmhELDBCQUFVaUQsR0FBVjtBQUNBLG9CQUFHRCxTQUFTQSxNQUFNRSxJQUFmLElBQXVCeEIsa0JBQU9zQixNQUFNRSxJQUFiLENBQTFCLEVBQTZDO0FBQ3pDN0QseUJBQUt3QixPQUFMLENBQWEyQixnQkFBYixFQUFvQmQsa0JBQU9zQixNQUFNRSxJQUFiLENBQXBCO0FBQ0gsaUJBRkQsTUFFTTtBQUNGLHdCQUFJQyxZQUFZekIsa0JBQU8wQiw2QkFBUCxDQUFoQjtBQUNBRCw4QkFBVUgsS0FBVixHQUFrQkEsS0FBbEI7QUFDQTNELHlCQUFLd0IsT0FBTCxDQUFhMkIsZ0JBQWIsRUFBb0JXLFNBQXBCO0FBQ0g7QUFDSixhQWhCRDtBQWlCSCxTQTFFTSxXQTBFRSxVQUFDSCxLQUFELEVBQVc7QUFDaEI7QUFDQSxnQkFBR0EsU0FBU0EsTUFBTUUsSUFBZixJQUF1QnhCLGtCQUFPc0IsTUFBTUUsSUFBYixDQUExQixFQUE2QztBQUN6QzdELHFCQUFLd0IsT0FBTCxDQUFhMkIsZ0JBQWIsRUFBb0JkLGtCQUFPc0IsTUFBTUUsSUFBYixDQUFwQjtBQUNILGFBRkQsTUFFTTtBQUNGLG9CQUFJQyxZQUFZekIsa0JBQU8wQiw2QkFBUCxDQUFoQjtBQUNBRCwwQkFBVUgsS0FBVixHQUFrQkEsS0FBbEI7QUFDQTNELHFCQUFLd0IsT0FBTCxDQUFhMkIsZ0JBQWIsRUFBb0JXLFNBQXBCO0FBQ0g7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQW5ELHNCQUFVaUQsR0FBVjtBQUNBO0FBQ0gsU0ExRk0sQ0FBUDtBQTJGSCxLQTlHRDs7QUFpSEE7Ozs7OztBQU1BNUQsU0FBS2dFLElBQUwsR0FBWSxVQUFDQyxPQUFELEVBQVk7QUFDcEI7QUFDQXRELG9CQUFZLHNDQUFvQlgsSUFBcEIsRUFBMEIsQ0FDbEMsTUFEa0MsRUFDM0IsTUFEMkIsRUFDcEIsT0FEb0IsRUFDWixNQURZLEVBQ0wsTUFESyxFQUNHLGFBREgsRUFDa0IsYUFEbEIsRUFDaUMsV0FEakMsRUFFaEMsU0FGZ0MsRUFFckIsV0FGcUIsRUFFUixVQUZRLEVBRUssa0JBRkwsQ0FBMUIsQ0FBWjtBQUlBaUUsZ0JBQVFDLGNBQVIsR0FBeUJuRSxTQUF6QjtBQUNBa0UsZ0JBQVFFLE9BQVIsR0FBa0I1RCxlQUFsQjtBQUNBRyx1QkFBZSwrQkFBYXVELE9BQWIsRUFBc0JqRSxJQUF0QixDQUFmO0FBQ0FJLDBCQUFrQkYsR0FBbEIsQ0FBc0IsY0FBdEI7QUFDQUUsMEJBQWtCRixHQUFsQixDQUFzQix3QkFBdEIsRUFBZ0RRLFlBQWhEOztBQUVBTCx3QkFBZ0IrRCxZQUFoQixDQUE2QjFELGFBQWFPLFdBQWIsRUFBN0I7QUFDQWIsMEJBQWtCRixHQUFsQixDQUFzQix5QkFBdEIsRUFBa0RHLGdCQUFnQnFDLGlCQUFoQixFQUFsRDs7QUFFQXJCO0FBQ0gsS0FoQkQ7QUFpQkFyQixTQUFLcUUsZUFBTCxHQUF1QixZQUFNO0FBQ3pCLFlBQUc1RCxlQUFILEVBQW1CO0FBQ2YsbUJBQU9BLGdCQUFnQjZELE9BQWhCLEVBQVA7QUFDSCxTQUZELE1BRUs7QUFDRCxtQkFBTyxJQUFQO0FBQ0g7QUFFSixLQVBEO0FBUUF0RSxTQUFLdUUsU0FBTCxHQUFpQixZQUFNO0FBQ25CbkUsMEJBQWtCRixHQUFsQixDQUFzQixtQkFBdEIsRUFBMkNRLGFBQWE2RCxTQUFiLEVBQTNDO0FBQ0EsZUFBTzdELGFBQWE2RCxTQUFiLEVBQVA7QUFDSCxLQUhEO0FBSUF2RSxTQUFLd0UsVUFBTCxHQUFrQixZQUFNOztBQUVwQixlQUFPOUQsYUFBYThELFVBQWIsRUFBUDtBQUNILEtBSEQ7QUFJQXhFLFNBQUt5RSxlQUFMLEdBQXVCLFVBQUNDLE1BQUQsRUFBVztBQUM5QnRFLDBCQUFrQkYsR0FBbEIsQ0FBc0IseUJBQXRCLEVBQWlEd0UsTUFBakQ7QUFDQWhFLHFCQUFhK0QsZUFBYixDQUE2QkMsTUFBN0I7QUFDSCxLQUhEO0FBSUExRSxTQUFLMkUsY0FBTCxHQUFzQixZQUFNO0FBQ3hCdkUsMEJBQWtCRixHQUFsQixDQUFzQix3QkFBdEI7QUFDQSxlQUFPUSxhQUFhaUUsY0FBYixFQUFQO0FBQ0gsS0FIRDtBQUlBM0UsU0FBSzRFLFlBQUwsR0FBb0IsWUFBTTtBQUN0QnhFLDBCQUFrQkYsR0FBbEIsQ0FBc0Isc0JBQXRCO0FBQ0EsZUFBT08sZ0JBQWdCbUUsWUFBaEIsRUFBUDtBQUNILEtBSEQ7QUFJQTVFLFNBQUs2RSxTQUFMLEdBQWlCLFVBQUNDLFVBQUQsRUFBZ0I7QUFDN0IsWUFBRyxDQUFDckUsZUFBSixFQUFvQjtBQUFDLG1CQUFPLElBQVA7QUFBYTtBQUNsQ0wsMEJBQWtCRixHQUFsQixDQUFzQixtQkFBdEIsRUFBMkM0RSxVQUEzQztBQUNBLGVBQU9yRSxnQkFBZ0JvRSxTQUFoQixDQUEwQkMsVUFBMUIsQ0FBUDtBQUNILEtBSkQ7O0FBTUE5RSxTQUFLK0UsV0FBTCxHQUFtQixZQUFNO0FBQ3JCLFlBQUcsQ0FBQ3RFLGVBQUosRUFBb0I7QUFBQyxtQkFBTyxJQUFQO0FBQWE7QUFDbENMLDBCQUFrQkYsR0FBbEIsQ0FBc0IscUJBQXRCLEVBQTZDTyxnQkFBZ0JzRSxXQUFoQixFQUE3QztBQUNBLGVBQU90RSxnQkFBZ0JzRSxXQUFoQixFQUFQO0FBQ0gsS0FKRDtBQUtBL0UsU0FBS2dGLFdBQUwsR0FBbUIsWUFBTTtBQUNyQixZQUFHLENBQUN2RSxlQUFKLEVBQW9CO0FBQUMsbUJBQU8sSUFBUDtBQUFhOztBQUVsQ0wsMEJBQWtCRixHQUFsQixDQUFzQixxQkFBdEIsRUFBNkNPLGdCQUFnQnVFLFdBQWhCLEVBQTdDO0FBQ0EsZUFBT3ZFLGdCQUFnQnVFLFdBQWhCLEVBQVA7QUFDSCxLQUxEO0FBTUFoRixTQUFLaUYsU0FBTCxHQUFpQixZQUFNO0FBQ25CLFlBQUcsQ0FBQ3hFLGVBQUosRUFBb0I7QUFBQyxtQkFBTyxJQUFQO0FBQWE7O0FBRWxDTCwwQkFBa0JGLEdBQWxCLENBQXNCLG1CQUF0QixFQUEyQ08sZ0JBQWdCd0UsU0FBaEIsRUFBM0M7QUFDQSxlQUFPeEUsZ0JBQWdCd0UsU0FBaEIsRUFBUDtBQUNILEtBTEQ7QUFNQWpGLFNBQUtrRixTQUFMLEdBQWlCLFVBQUNDLE1BQUQsRUFBWTtBQUN6QixZQUFHLENBQUMxRSxlQUFKLEVBQW9CO0FBQUMsbUJBQU8sSUFBUDtBQUFhOztBQUVsQ0wsMEJBQWtCRixHQUFsQixDQUFzQix1QkFBdUJpRixNQUE3QztBQUNBMUUsd0JBQWdCeUUsU0FBaEIsQ0FBMEJDLE1BQTFCO0FBQ0gsS0FMRDtBQU1BbkYsU0FBS29GLE9BQUwsR0FBZSxVQUFDQyxLQUFELEVBQVc7QUFDdEIsWUFBRyxDQUFDNUUsZUFBSixFQUFvQjtBQUFDLG1CQUFPLElBQVA7QUFBYTs7QUFFbENMLDBCQUFrQkYsR0FBbEIsQ0FBc0IscUJBQXFCbUYsS0FBM0M7QUFDQSxlQUFPNUUsZ0JBQWdCMkUsT0FBaEIsQ0FBd0JDLEtBQXhCLENBQVA7QUFDSCxLQUxEO0FBTUFyRixTQUFLc0YsT0FBTCxHQUFlLFlBQU07QUFDakIsWUFBRyxDQUFDN0UsZUFBSixFQUFvQjtBQUFDLG1CQUFPLElBQVA7QUFBYTs7QUFFbENMLDBCQUFrQkYsR0FBbEIsQ0FBc0IscUJBQXFCTyxnQkFBZ0I2RSxPQUFoQixFQUEzQztBQUNBLGVBQU83RSxnQkFBZ0I2RSxPQUFoQixFQUFQO0FBQ0gsS0FMRDtBQU1BdEYsU0FBS3VGLElBQUwsR0FBWSxVQUFDdkUsUUFBRCxFQUFjO0FBQ3RCWiwwQkFBa0JGLEdBQWxCLENBQXNCLGVBQXRCLEVBQXVDYyxRQUF2QztBQUNBTCxvQkFBWSxzQ0FBb0JYLElBQXBCLEVBQTBCLENBQUMsTUFBRCxFQUFRLE1BQVIsRUFBZSxNQUFmLENBQTFCLENBQVo7O0FBRUEsWUFBR2dCLFFBQUgsRUFBWTtBQUNSLGdCQUFHUCxlQUFILEVBQW1CO0FBQ2ZBLGdDQUFnQitFLGlCQUFoQixDQUFrQyxDQUFsQztBQUNIO0FBQ0RuRiw0QkFBZ0IrRCxZQUFoQixDQUE2QnBELFFBQTdCO0FBQ0g7QUFDRCxlQUFPSyxjQUFQO0FBRUgsS0FaRDtBQWFBckIsU0FBS3VCLElBQUwsR0FBWSxZQUFNO0FBQ2QsWUFBRyxDQUFDZCxlQUFKLEVBQW9CO0FBQUMsbUJBQU8sSUFBUDtBQUFhO0FBQ2xDTCwwQkFBa0JGLEdBQWxCLENBQXNCLGVBQXRCO0FBQ0FPLHdCQUFnQmMsSUFBaEI7QUFDSCxLQUpEO0FBS0F2QixTQUFLc0QsS0FBTCxHQUFhLFlBQU07QUFDZixZQUFHLENBQUM3QyxlQUFKLEVBQW9CO0FBQUMsbUJBQU8sSUFBUDtBQUFhOztBQUVsQ0wsMEJBQWtCRixHQUFsQixDQUFzQixnQkFBdEI7QUFDQU8sd0JBQWdCNkMsS0FBaEI7QUFDSCxLQUxEO0FBTUF0RCxTQUFLeUYsSUFBTCxHQUFZLFVBQUNDLFFBQUQsRUFBYztBQUN0QixZQUFHLENBQUNqRixlQUFKLEVBQW9CO0FBQUMsbUJBQU8sSUFBUDtBQUFhOztBQUVsQ0wsMEJBQWtCRixHQUFsQixDQUFzQixrQkFBaUJ3RixRQUF2QztBQUNBakYsd0JBQWdCZ0YsSUFBaEIsQ0FBcUJDLFFBQXJCO0FBQ0gsS0FMRDtBQU1BMUYsU0FBSzJGLGVBQUwsR0FBdUIsVUFBQ0MsWUFBRCxFQUFpQjtBQUNwQyxZQUFHLENBQUNuRixlQUFKLEVBQW9CO0FBQUMsbUJBQU8sSUFBUDtBQUFhOztBQUVsQ0wsMEJBQWtCRixHQUFsQixDQUFzQiwwQkFBdEIsRUFBa0QwRixZQUFsRDtBQUNBLGVBQU9uRixnQkFBZ0JrRixlQUFoQixDQUFnQ2pGLGFBQWFpRixlQUFiLENBQTZCQyxZQUE3QixDQUFoQyxDQUFQO0FBQ0gsS0FMRDtBQU1BNUYsU0FBSzZGLGVBQUwsR0FBdUIsWUFBSztBQUN4QixZQUFHLENBQUNwRixlQUFKLEVBQW9CO0FBQUMsbUJBQU8sSUFBUDtBQUFhOztBQUVsQ0wsMEJBQWtCRixHQUFsQixDQUFzQiwwQkFBdEIsRUFBa0RPLGdCQUFnQm9GLGVBQWhCLEVBQWxEO0FBQ0EsZUFBT3BGLGdCQUFnQm9GLGVBQWhCLEVBQVA7QUFDSCxLQUxEOztBQU9BN0YsU0FBS2lCLFdBQUwsR0FBbUIsWUFBTTtBQUNyQmIsMEJBQWtCRixHQUFsQixDQUFzQixzQkFBdEIsRUFBOENHLGdCQUFnQlksV0FBaEIsRUFBOUM7QUFDQSxlQUFPWixnQkFBZ0JZLFdBQWhCLEVBQVA7QUFDSCxLQUhEO0FBSUFqQixTQUFLOEYsa0JBQUwsR0FBMEIsWUFBTTtBQUM1QjFGLDBCQUFrQkYsR0FBbEIsQ0FBc0IsNkJBQXRCLEVBQXFERyxnQkFBZ0JtQyx1QkFBaEIsRUFBckQ7QUFDQSxlQUFPbkMsZ0JBQWdCbUMsdUJBQWhCLEVBQVA7QUFDSCxLQUhEO0FBSUF4QyxTQUFLb0Isa0JBQUwsR0FBMEIsVUFBQ04sS0FBRCxFQUFXO0FBQ2pDViwwQkFBa0JGLEdBQWxCLENBQXNCLDZCQUF0QixFQUFxRFksS0FBckQ7QUFDQUQsd0JBQWdCQyxLQUFoQjtBQUNILEtBSEQ7O0FBS0FkLFNBQUtxRCxVQUFMLEdBQWtCLFlBQU07QUFDcEIsWUFBRyxDQUFDNUMsZUFBSixFQUFvQjtBQUFDLG1CQUFPLElBQVA7QUFBYTs7QUFFbENMLDBCQUFrQkYsR0FBbEIsQ0FBc0IscUJBQXRCLEVBQTZDTyxnQkFBZ0I0QyxVQUFoQixFQUE3QztBQUNBLGVBQU81QyxnQkFBZ0I0QyxVQUFoQixFQUFQO0FBQ0gsS0FMRDtBQU1BckQsU0FBSytGLGdCQUFMLEdBQXdCLFlBQUs7QUFDekIsWUFBRyxDQUFDdEYsZUFBSixFQUFvQjtBQUFDLG1CQUFPLElBQVA7QUFBYTs7QUFFbENMLDBCQUFrQkYsR0FBbEIsQ0FBc0IsMkJBQXRCLEVBQW1ETyxnQkFBZ0JzRixnQkFBaEIsRUFBbkQ7QUFDQSxlQUFPdEYsZ0JBQWdCc0YsZ0JBQWhCLEVBQVA7QUFDSCxLQUxEO0FBTUEvRixTQUFLdUQsZ0JBQUwsR0FBd0IsVUFBQ3pDLEtBQUQsRUFBVTtBQUM5QixZQUFHLENBQUNMLGVBQUosRUFBb0I7QUFBQyxtQkFBTyxJQUFQO0FBQWE7O0FBRWxDTCwwQkFBa0JGLEdBQWxCLENBQXNCLDJCQUF0QixFQUFtRFksS0FBbkQ7O0FBRUEsWUFBSWMsVUFBVW5CLGdCQUFnQjRDLFVBQWhCLEVBQWQ7QUFDQSxZQUFJMkMsZ0JBQWdCcEUsUUFBUW5CLGdCQUFnQnNGLGdCQUFoQixFQUFSLENBQXBCO0FBQ0EsWUFBSUUsWUFBWXJFLFFBQVFkLEtBQVIsQ0FBaEI7QUFDQSxZQUFJWSxtQkFBbUJqQixnQkFBZ0J1RSxXQUFoQixFQUF2QjtBQUNBLFlBQUlrQixpQkFBaUI1RixtQkFBbUI0RixjQUFuQixDQUFrQ0YsYUFBbEMsRUFBaURDLFNBQWpELENBQXJCO0FBQ0E7QUFDQSxZQUFJRSxvQkFBb0IxRixnQkFBZ0I4QyxnQkFBaEIsQ0FBaUN6QyxLQUFqQyxFQUF3Q29GLGNBQXhDLENBQXhCOztBQUVBLFlBQUcsQ0FBQ0QsU0FBSixFQUFjO0FBQ1YsbUJBQU8sSUFBUDtBQUNIOztBQUVEN0YsMEJBQWtCRixHQUFsQixDQUFzQiwwQ0FBdEIsRUFBa0VnRyxjQUFsRTs7QUFHQTtBQUNBLFlBQUcsQ0FBQ0EsY0FBRCxJQUFtQnpGLGdCQUFnQjZELE9BQWhCLE9BQThCOEIsdUJBQXBELEVBQWlFO0FBQzdEekYsd0JBQVksc0NBQW9CWCxJQUFwQixFQUEwQixDQUFDLE1BQUQsRUFBUSxNQUFSLENBQTFCLENBQVo7QUFDQXFCLHlCQUFhSyxnQkFBYjtBQUNIOztBQUVELGVBQU95RSxpQkFBUDtBQUNILEtBM0JEOztBQStCQW5HLFNBQUtxRyxnQkFBTCxHQUF3QixZQUFLO0FBQ3pCLFlBQUcsQ0FBQzVGLGVBQUosRUFBb0I7QUFBQyxtQkFBTyxJQUFQO0FBQWE7O0FBRWxDTCwwQkFBa0JGLEdBQWxCLENBQXNCLDJCQUF0QixFQUFtRE8sZ0JBQWdCNEYsZ0JBQWhCLEVBQW5EO0FBQ0EsZUFBTzVGLGdCQUFnQjRGLGdCQUFoQixFQUFQO0FBQ0gsS0FMRDtBQU1BckcsU0FBS3NHLGlCQUFMLEdBQXlCLFlBQUs7QUFDMUIsWUFBRyxDQUFDN0YsZUFBSixFQUFvQjtBQUFDLG1CQUFPLElBQVA7QUFBYTs7QUFFbENMLDBCQUFrQkYsR0FBbEIsQ0FBc0IsNEJBQXRCLEVBQW9ETyxnQkFBZ0I2RixpQkFBaEIsRUFBcEQ7QUFDQSxlQUFPN0YsZ0JBQWdCNkYsaUJBQWhCLEVBQVA7QUFDSCxLQUxEO0FBTUF0RyxTQUFLd0YsaUJBQUwsR0FBeUIsVUFBQ2UsWUFBRCxFQUFpQjtBQUN0QyxZQUFHLENBQUM5RixlQUFKLEVBQW9CO0FBQUMsbUJBQU8sSUFBUDtBQUFhOztBQUVsQ0wsMEJBQWtCRixHQUFsQixDQUFzQiw0QkFBdEIsRUFBb0RxRyxZQUFwRDs7QUFFQSxlQUFPOUYsZ0JBQWdCK0UsaUJBQWhCLENBQWtDZSxZQUFsQyxDQUFQO0FBQ0gsS0FORDtBQU9BdkcsU0FBS3dHLGFBQUwsR0FBcUIsWUFBTTtBQUN2QixZQUFHLENBQUMvRixlQUFKLEVBQW9CO0FBQUMsbUJBQU8sSUFBUDtBQUFhOztBQUVsQ0wsMEJBQWtCRixHQUFsQixDQUFzQix1QkFBdEI7QUFDQSxlQUFPTyxnQkFBZ0IrRixhQUFoQixFQUFQO0FBQ0gsS0FMRDtBQU1BeEcsU0FBS3lHLGNBQUwsR0FBc0IsVUFBQ0MsTUFBRCxFQUFZO0FBQzlCLFlBQUcsQ0FBQ2pHLGVBQUosRUFBb0I7QUFBQyxtQkFBTyxJQUFQO0FBQWE7O0FBRWxDTCwwQkFBa0JGLEdBQWxCLENBQXNCLHlCQUF0QixFQUFpRHdHLE1BQWpEO0FBQ0EsZUFBT2pHLGdCQUFnQmdHLGNBQWhCLENBQStCQyxNQUEvQixDQUFQO0FBQ0gsS0FMRDs7QUFPQTFHLFNBQUsyRyxjQUFMLEdBQXNCLFlBQU07QUFDeEIsWUFBRyxDQUFDL0YsY0FBSixFQUFtQjtBQUFDLG1CQUFPLElBQVA7QUFBYTtBQUNqQ1IsMEJBQWtCRixHQUFsQixDQUFzQix5QkFBdEIsRUFBaURVLGVBQWUrRixjQUFmLEVBQWpEO0FBQ0EsZUFBTy9GLGVBQWUrRixjQUFmLEVBQVA7QUFDSCxLQUpEO0FBS0EzRyxTQUFLNEcsaUJBQUwsR0FBeUIsWUFBTTtBQUMzQixZQUFHLENBQUNoRyxjQUFKLEVBQW1CO0FBQUMsbUJBQU8sSUFBUDtBQUFhO0FBQ2pDUiwwQkFBa0JGLEdBQWxCLENBQXNCLDRCQUF0QixFQUFvRFUsZUFBZWdHLGlCQUFmLEVBQXBEO0FBQ0EsZUFBT2hHLGVBQWVnRyxpQkFBZixFQUFQO0FBQ0gsS0FKRDtBQUtBNUcsU0FBSzZHLGlCQUFMLEdBQXlCLFVBQUMvRixLQUFELEVBQVc7QUFDaEMsWUFBRyxDQUFDRixjQUFKLEVBQW1CO0FBQUMsbUJBQU8sSUFBUDtBQUFhO0FBQ2pDUiwwQkFBa0JGLEdBQWxCLENBQXNCLDRCQUF0QixFQUFvRFksS0FBcEQ7QUFDQUYsdUJBQWVpRyxpQkFBZixDQUFpQy9GLEtBQWpDO0FBQ0gsS0FKRDtBQUtBZCxTQUFLOEcsVUFBTCxHQUFrQixVQUFDQyxLQUFELEVBQVc7QUFDekIsWUFBRyxDQUFDbkcsY0FBSixFQUFtQjtBQUFDLG1CQUFPLElBQVA7QUFBYTtBQUNqQ1IsMEJBQWtCRixHQUFsQixDQUFzQixxQkFBdEI7QUFDQSxlQUFPVSxlQUFla0csVUFBZixDQUEwQkMsS0FBMUIsQ0FBUDtBQUNILEtBSkQ7QUFLQS9HLFNBQUtnSCxhQUFMLEdBQXFCLFVBQUNsRyxLQUFELEVBQVc7QUFDNUIsWUFBRyxDQUFDRixjQUFKLEVBQW1CO0FBQUMsbUJBQU8sSUFBUDtBQUFhO0FBQ2pDUiwwQkFBa0JGLEdBQWxCLENBQXNCLHdCQUF0QixFQUFnRFksS0FBaEQ7QUFDQSxlQUFPRixlQUFlb0csYUFBZixDQUE2QmxHLEtBQTdCLENBQVA7QUFDSCxLQUpEOztBQU1BZCxTQUFLaUgsU0FBTCxHQUFpQixZQUFNO0FBQ25CLFlBQUcsQ0FBQ3hHLGVBQUosRUFBb0I7QUFBQyxtQkFBTyxJQUFQO0FBQWE7QUFDbENMLDBCQUFrQkYsR0FBbEIsQ0FBc0Isb0JBQXRCLEVBQTRDTyxnQkFBZ0J3RyxTQUFoQixFQUE1QztBQUNBeEcsd0JBQWdCd0csU0FBaEI7QUFDSCxLQUpEO0FBS0FqSCxTQUFLa0gsUUFBTCxHQUFnQixZQUFNO0FBQ2xCLFlBQUcsQ0FBQ3pHLGVBQUosRUFBb0I7QUFBQyxtQkFBTyxJQUFQO0FBQWE7QUFDbENMLDBCQUFrQkYsR0FBbEIsQ0FBc0IsbUJBQXRCLEVBQTJDTyxnQkFBZ0J5RyxRQUFoQixFQUEzQztBQUNBLGVBQU96RyxnQkFBZ0J5RyxRQUFoQixFQUFQO0FBQ0gsS0FKRDtBQUtBbEgsU0FBS21ILElBQUwsR0FBWSxZQUFNO0FBQ2QsWUFBRyxDQUFDMUcsZUFBSixFQUFvQjtBQUFDLG1CQUFPLElBQVA7QUFBYTs7QUFFbENMLDBCQUFrQkYsR0FBbEIsQ0FBc0IsZUFBdEI7QUFDQU8sd0JBQWdCMEcsSUFBaEI7QUFDSCxLQUxEO0FBTUFuSCxTQUFLb0gsTUFBTCxHQUFjLFlBQU07QUFDaEIsWUFBRyxDQUFDM0csZUFBSixFQUFvQjtBQUFDLG1CQUFPLElBQVA7QUFBYTs7QUFFbENMLDBCQUFrQkYsR0FBbEIsQ0FBc0IsaUJBQXRCO0FBQ0FTLGtCQUFVNEIsT0FBVjtBQUNBLFlBQUczQixjQUFILEVBQWtCO0FBQ2RBLDJCQUFlMkIsT0FBZjtBQUNBM0IsNkJBQWlCLElBQWpCO0FBQ0g7O0FBRUQsWUFBR0gsZUFBSCxFQUFtQjtBQUNmQSw0QkFBZ0I4QixPQUFoQjtBQUNBOUIsOEJBQWtCLElBQWxCO0FBQ0g7O0FBRUQsWUFBR0QsWUFBSCxFQUFnQjtBQUNaQSx5QkFBYStCLE9BQWI7QUFDQS9CLDJCQUFlLElBQWY7QUFDSDtBQUNERiw2QkFBcUIsSUFBckI7QUFDQUQsMEJBQWtCLElBQWxCO0FBQ0FLLHVCQUFlLElBQWY7QUFDQUMsb0JBQVksSUFBWjs7QUFFQVgsYUFBS3dCLE9BQUwsQ0FBYTZGLGtCQUFiO0FBQ0FySCxhQUFLNEQsR0FBTDs7QUFFQXhELDBCQUFrQkYsR0FBbEIsQ0FBc0Isc0hBQXRCO0FBQ0FvSCxzQkFBY0MsWUFBZCxDQUEyQnZILEtBQUt3SCxjQUFMLEVBQTNCO0FBQ0EsWUFBR0YsY0FBY0csYUFBZCxHQUE4QjFGLE1BQTlCLEtBQTBDLENBQTdDLEVBQStDO0FBQzNDM0IsOEJBQWtCRixHQUFsQixDQUFzQiwwQkFBdEIsRUFBbURvSCxjQUFjRyxhQUFkLEVBQW5EO0FBQ0g7QUFDSixLQWhDRDs7QUFrQ0F6SCxTQUFLMEgsVUFBTCxHQUFrQixZQUFNO0FBQ3BCLGVBQU8sT0FBS3ZILGdCQUFaO0FBQ0gsS0FGRDs7QUFJQSxXQUFPSCxJQUFQO0FBQ0gsQ0ExY0Q7O3FCQThjZUYsRzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsZWY7Ozs7QUFJTyxJQUFNNkgsOENBQW1CLFNBQW5CQSxnQkFBbUIsQ0FBU2xILGVBQVQsRUFBeUI7QUFDckQsV0FBTztBQUNIbUgsK0JBQXdCLCtCQUFDQyxNQUFELEVBQVk7QUFDaEMsZ0JBQUdBLE9BQU81RSxJQUFQLElBQWU0RSxPQUFPM0UsSUFBekIsRUFBOEI7QUFDMUIsdUJBQU96QyxnQkFBZ0JxSCx3QkFBaEIsQ0FBeUNELE9BQU81RSxJQUFoRCxFQUFzRDRFLE9BQU8zRSxJQUE3RCxDQUFQO0FBQ0gsYUFGRCxNQUVLO0FBQ0QsdUJBQU8sSUFBUDtBQUNIO0FBQ0o7QUFQRSxLQUFQO0FBU0gsQ0FWTSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0pQOzs7O0FBRUE7Ozs7QUFJQTs7Ozs7QUFLQSxJQUFNNkUsZUFBZSxTQUFmQSxZQUFlLENBQVM5RCxPQUFULEVBQWtCckIsUUFBbEIsRUFBMkI7O0FBRTVDLFFBQU1vRix1QkFBdUIsU0FBdkJBLG9CQUF1QixDQUFTL0QsT0FBVCxFQUFpQjtBQUMxQyxZQUFNZ0UsV0FBVztBQUNiL0QsNEJBQWlCLEVBREo7QUFFYmdFLDJCQUFlLENBQUMsQ0FBRCxFQUFJLEdBQUosRUFBUyxDQUFULEVBQVksR0FBWixFQUFpQixJQUFqQixDQUZGO0FBR2J0QywwQkFBYyxDQUhEO0FBSWJ1QyxrQkFBTSxLQUpPO0FBS2JoRCxvQkFBUSxHQUxLO0FBTWJpRCxrQkFBTyxLQU5NO0FBT2JDLHNCQUFXLElBUEU7QUFRYkMsdUJBQVksS0FSQztBQVNiQyxzQkFBVyxJQVRFO0FBVWJDLHlCQUFjLENBVkQ7QUFXYnJFLHFCQUFVLEVBWEc7QUFZYnNFLDhCQUFtQixLQVpOO0FBYWJDLDRCQUFpQixDQWJKO0FBY2JDLCtCQUFvQixDQWRQO0FBZWJDLHNCQUFXO0FBZkUsU0FBakI7QUFpQkEsWUFBTUMsWUFBWSxTQUFaQSxTQUFZLENBQVVDLEdBQVYsRUFBZTtBQUM3QixnQkFBSUEsUUFBUUMsU0FBWixFQUF1QjtBQUNuQix1QkFBTyxJQUFQO0FBQ0g7QUFDRCxnQkFBSSxPQUFPRCxHQUFQLEtBQWUsUUFBZixJQUEyQkEsSUFBSS9HLE1BQUosR0FBYSxDQUE1QyxFQUErQztBQUMzQyxvQkFBTWlILGVBQWVGLElBQUlHLFdBQUosRUFBckI7QUFDQSxvQkFBSUQsaUJBQWlCLE1BQXJCLEVBQTZCO0FBQ3pCLDJCQUFPLElBQVA7QUFDSDtBQUNELG9CQUFJQSxpQkFBaUIsT0FBckIsRUFBOEI7QUFDMUIsMkJBQU8sS0FBUDtBQUNIO0FBQ0Qsb0JBQUksQ0FBQ0UsTUFBTUMsT0FBT0wsR0FBUCxDQUFOLENBQUQsSUFBdUIsQ0FBQ0ksTUFBTUUsV0FBV04sR0FBWCxDQUFOLENBQTVCLEVBQW9EO0FBQ2hELDJCQUFPSyxPQUFPTCxHQUFQLENBQVA7QUFDSDtBQUNKO0FBQ0QsbUJBQU9BLEdBQVA7QUFDSCxTQWpCRDtBQWtCQSxZQUFNTyxjQUFjLFNBQWRBLFdBQWMsQ0FBVXBGLE9BQVYsRUFBbUI7QUFDbkNxRixtQkFBT0MsSUFBUCxDQUFZdEYsT0FBWixFQUFxQnVGLE9BQXJCLENBQTZCLFVBQUNDLEdBQUQsRUFBUztBQUNsQyxvQkFBSUEsUUFBUSxJQUFaLEVBQWtCO0FBQ2Q7QUFDSDtBQUNEeEYsd0JBQVF3RixHQUFSLElBQWVaLFVBQVU1RSxRQUFRd0YsR0FBUixDQUFWLENBQWY7QUFDSCxhQUxEO0FBTUgsU0FQRDs7QUFTQUosb0JBQVlwRixPQUFaO0FBQ0EsWUFBSXlGLFNBQVMsU0FBYyxFQUFkLEVBQWtCekIsUUFBbEIsRUFBNEJoRSxPQUE1QixDQUFiOztBQUVBLFlBQUlpRSxnQkFBZ0J3QixPQUFPeEIsYUFBM0I7O0FBRUFBLHdCQUFnQkEsY0FBY3lCLE1BQWQsQ0FBcUI7QUFBQSxtQkFBUUMsd0JBQUVDLFFBQUYsQ0FBV0MsSUFBWCxLQUFvQkEsUUFBUSxJQUE1QixJQUFvQ0EsUUFBUSxDQUFwRDtBQUFBLFNBQXJCLEVBQTRFQyxHQUE1RSxDQUFnRjtBQUFBLG1CQUFRQyxLQUFLQyxLQUFMLENBQVdILE9BQU8sQ0FBbEIsSUFBdUIsQ0FBL0I7QUFBQSxTQUFoRixDQUFoQjs7QUFFQSxZQUFJNUIsY0FBY2dDLE9BQWQsQ0FBc0IsQ0FBdEIsSUFBMkIsQ0FBL0IsRUFBa0M7QUFDOUJoQywwQkFBY2lDLElBQWQsQ0FBbUIsQ0FBbkI7QUFDSDtBQUNEakMsc0JBQWNrQyxJQUFkOztBQUVBVixlQUFPeEIsYUFBUCxHQUF1QkEsYUFBdkI7O0FBRUF3QixlQUFPaEIsY0FBUCxHQUF3QmdCLE9BQU9oQixjQUFQLEdBQXdCLEVBQXhCLEdBQTZCLEVBQTdCLEdBQWtDZ0IsT0FBT2hCLGNBQWpFO0FBQ0FnQixlQUFPZixpQkFBUCxHQUEyQmUsT0FBT2YsaUJBQVAsR0FBMkIsRUFBM0IsR0FBZ0MsRUFBaEMsR0FBcUNlLE9BQU9mLGlCQUF2RTs7QUFHQSxZQUFJZSxPQUFPeEIsYUFBUCxDQUFxQmdDLE9BQXJCLENBQTZCUixPQUFPOUQsWUFBcEMsSUFBb0QsQ0FBeEQsRUFBMkQ7QUFDdkQ4RCxtQkFBTzlELFlBQVAsR0FBc0IsQ0FBdEI7QUFDSDs7QUFFRCxZQUFNeUUsaUJBQWlCWCxPQUFPMUksUUFBOUI7QUFDQSxZQUFJLENBQUNxSixjQUFMLEVBQXFCO0FBQ2pCLGdCQUFNQyxNQUFNVix3QkFBRVcsSUFBRixDQUFPYixNQUFQLEVBQWUsQ0FDdkIsT0FEdUIsRUFFdkIsYUFGdUIsRUFHdkIsTUFIdUIsRUFJdkIsT0FKdUIsRUFLdkIsTUFMdUIsRUFNdkIsU0FOdUIsRUFPdkIsUUFQdUIsRUFRdkIsTUFSdUIsRUFTdkIsYUFUdUIsRUFVdkIsUUFWdUIsRUFXdkIsVUFYdUIsQ0FBZixDQUFaOztBQWNBQSxtQkFBTzFJLFFBQVAsR0FBa0IsQ0FBRXNKLEdBQUYsQ0FBbEI7QUFDSCxTQWhCRCxNQWdCTyxJQUFJVix3QkFBRVksT0FBRixDQUFVSCxlQUFlckosUUFBekIsQ0FBSixFQUF3QztBQUMzQzBJLG1CQUFPZSxRQUFQLEdBQWtCSixjQUFsQjtBQUNBWCxtQkFBTzFJLFFBQVAsR0FBa0JxSixlQUFlckosUUFBakM7QUFDSDs7QUFFRCxlQUFPMEksT0FBT2dCLFFBQWQ7QUFDQSxlQUFPaEIsTUFBUDtBQUNILEtBM0ZEO0FBNEZBdEosc0JBQWtCRixHQUFsQixDQUFzQixzQkFBdEIsRUFBOEMrRCxPQUE5QztBQUNBLFFBQUkwRyxPQUFPM0MscUJBQXFCL0QsT0FBckIsQ0FBWDs7QUFFQTBHLFNBQUtDLFlBQUwsR0FBb0IsS0FBcEIsQ0FqRzRDLENBaUdqQjs7QUFFM0IsUUFBTTVLLE9BQU8sRUFBYjtBQUNBQSxTQUFLdUUsU0FBTCxHQUFpQixZQUFNO0FBQ25CLGVBQU9vRyxJQUFQO0FBQ0gsS0FGRDtBQUdBM0ssU0FBSzZLLFdBQUwsR0FBbUIsWUFBTTtBQUNyQixlQUFPRixLQUFLL0IsUUFBWjtBQUNILEtBRkQ7QUFHQTVJLFNBQUs4SyxTQUFMLEdBQWlCLFVBQUNwQixNQUFELEVBQVNxQixLQUFULEVBQW1CO0FBQ2hDSixhQUFLakIsTUFBTCxJQUFlcUIsS0FBZjtBQUNILEtBRkQ7O0FBSUEvSyxTQUFLZ0wsWUFBTCxHQUFvQixZQUFNO0FBQ3RCLGVBQU9MLEtBQUt6RyxjQUFaO0FBQ0gsS0FGRDtBQUdBbEUsU0FBSzRLLFlBQUwsR0FBb0IsWUFBTTtBQUN0QixlQUFPRCxLQUFLQyxZQUFaO0FBQ0gsS0FGRDtBQUdBNUssU0FBS2lMLGFBQUwsR0FBcUIsVUFBQ0wsWUFBRCxFQUFrQjtBQUNuQyxlQUFPRCxLQUFLQyxZQUFMLEdBQW9CQSxZQUEzQjtBQUNILEtBRkQ7O0FBSUE1SyxTQUFLNkYsZUFBTCxHQUFzQixZQUFJO0FBQ3RCLGVBQU84RSxLQUFLL0UsWUFBWjtBQUNILEtBRkQ7QUFHQTVGLFNBQUsyRixlQUFMLEdBQXNCLFVBQUNDLFlBQUQsRUFBZ0I7QUFDbEMrRSxhQUFLL0UsWUFBTCxHQUFvQkEsWUFBcEI7QUFDQSxlQUFPQSxZQUFQO0FBQ0gsS0FIRDs7QUFLQTVGLFNBQUtrTCxlQUFMLEdBQXVCLFlBQU07QUFDekIsZUFBT1AsS0FBS1EsWUFBWjtBQUNILEtBRkQ7QUFHQW5MLFNBQUtvTCxlQUFMLEdBQXVCLFVBQUNDLFFBQUQsRUFBYztBQUNqQ1YsYUFBS1EsWUFBTCxHQUFvQkUsUUFBcEI7QUFDSCxLQUZEOztBQUlBOzs7Ozs7O0FBT0FyTCxTQUFLZ0MsY0FBTCxHQUFzQixZQUFNO0FBQ3hCLGVBQU8ySSxLQUFLbkMsV0FBWjtBQUNILEtBRkQ7QUFHQXhJLFNBQUttQixjQUFMLEdBQXNCLFVBQUNMLEtBQUQsRUFBVztBQUM3QjZKLGFBQUtuQyxXQUFMLEdBQW1CMUgsS0FBbkI7QUFDSCxLQUZEO0FBR0FkLFNBQUt5RSxlQUFMLEdBQXVCLFVBQUM4RCxRQUFELEVBQWM7QUFDakMsWUFBR29DLEtBQUtwQyxRQUFMLEtBQWtCQSxRQUFyQixFQUE4QjtBQUMxQm9DLGlCQUFLcEMsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQTNGLHFCQUFTcEIsT0FBVCxDQUFpQjhKLG9DQUFqQixFQUE0Qy9DLFFBQTVDO0FBQ0g7QUFDSixLQUxEO0FBTUF2SSxTQUFLMkUsY0FBTCxHQUFzQixZQUFNO0FBQ3hCLGVBQU9nRyxLQUFLcEMsUUFBWjtBQUNILEtBRkQ7QUFHQXZJLFNBQUt1TCxpQkFBTCxHQUF5QixZQUFNO0FBQzNCLGVBQU9aLEtBQUtqQyxjQUFaO0FBQ0gsS0FGRDtBQUdBMUksU0FBS3dMLG9CQUFMLEdBQTRCLFlBQU07QUFDOUIsZUFBT2IsS0FBS2hDLGlCQUFaO0FBQ0gsS0FGRDs7QUFJQTNJLFNBQUt5TCxNQUFMLEdBQWMsWUFBSztBQUNmLGVBQU9kLEtBQUt4QyxJQUFaO0FBQ0gsS0FGRDtBQUdBbkksU0FBS2lGLFNBQUwsR0FBaUIsWUFBSztBQUNsQixlQUFPMEYsS0FBS3hGLE1BQVo7QUFDSCxLQUZEO0FBR0FuRixTQUFLMEwsTUFBTCxHQUFjLFlBQUs7QUFDZixlQUFPZixLQUFLdkMsSUFBWjtBQUNILEtBRkQ7QUFHQXBJLFNBQUtzQixXQUFMLEdBQW1CLFlBQUs7QUFDcEIsZUFBT3FKLEtBQUtyQyxTQUFaO0FBQ0gsS0FGRDtBQUdBdEksU0FBSzJMLFVBQUwsR0FBa0IsWUFBSztBQUNuQixlQUFPaEIsS0FBS3RDLFFBQVo7QUFDSCxLQUZEOztBQUlBckksU0FBSzRMLGdCQUFMLEdBQXVCLFlBQUk7QUFDdkIsZUFBT2pCLEtBQUt6QyxhQUFaO0FBQ0gsS0FGRDtBQUdBbEksU0FBS3dFLFVBQUwsR0FBa0IsWUFBTTtBQUNwQixlQUFPbUcsS0FBS3hHLE9BQVo7QUFDSCxLQUZEOztBQUlBbkUsU0FBS2lCLFdBQUwsR0FBa0IsWUFBSTtBQUNsQixlQUFPMEosS0FBSzNKLFFBQVo7QUFDSCxLQUZEO0FBR0FoQixTQUFLNkwsV0FBTCxHQUFrQixVQUFDN0ssUUFBRCxFQUFZO0FBQzFCLFlBQUc0SSx3QkFBRVksT0FBRixDQUFVeEosUUFBVixDQUFILEVBQXVCO0FBQ25CMkosaUJBQUszSixRQUFMLEdBQWdCQSxRQUFoQjtBQUNILFNBRkQsTUFFSztBQUNEMkosaUJBQUszSixRQUFMLEdBQWdCLENBQUNBLFFBQUQsQ0FBaEI7QUFDSDtBQUNELGVBQU8ySixLQUFLM0osUUFBWjtBQUNILEtBUEQ7O0FBU0EsV0FBT2hCLElBQVA7QUFDSCxDQXhNRDs7cUJBME1lK0gsWTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyTmY7Ozs7QUFJQTs7Ozs7O0FBTUEsSUFBTStELGVBQWUsU0FBZkEsWUFBZSxDQUFTQyxNQUFULEVBQWdCO0FBQ2pDLFFBQUkvTCxPQUFPK0wsTUFBWDtBQUNBLFFBQUlDLFVBQVMsRUFBYjs7QUFFQSxRQUFNQyxnQkFBZ0IsU0FBaEJBLGFBQWdCLENBQVNDLE1BQVQsRUFBaUJDLElBQWpCLEVBQXVCQyxPQUF2QixFQUErQjtBQUNqRCxZQUFJdEssSUFBSSxDQUFSO0FBQ0EsWUFBSUMsU0FBU21LLE9BQU9uSyxNQUFwQjtBQUNBLGFBQUlELElBQUksQ0FBUixFQUFXQSxJQUFJQyxNQUFmLEVBQXVCRCxHQUF2QixFQUE0QjtBQUN4QixnQkFBSXVLLFFBQVFILE9BQU9wSyxDQUFQLENBQVo7QUFDQXVLLGtCQUFNQyxRQUFOLENBQWVDLEtBQWYsQ0FBd0JGLE1BQU1ELE9BQU4sSUFBaUJBLE9BQXpDLEVBQW9ERCxJQUFwRDtBQUNIO0FBQ0osS0FQRDs7QUFTQW5NLFNBQUtnRCxFQUFMLEdBQVUsVUFBU0MsSUFBVCxFQUFlcUosUUFBZixFQUF5QkYsT0FBekIsRUFBaUM7QUFDdkMsU0FBQ0osUUFBUS9JLElBQVIsTUFBa0IrSSxRQUFRL0ksSUFBUixJQUFjLEVBQWhDLENBQUQsRUFBdUNrSCxJQUF2QyxDQUE0QyxFQUFFbUMsVUFBVUEsUUFBWixFQUF3QkYsU0FBVUEsT0FBbEMsRUFBNUM7QUFDQSxlQUFPcE0sSUFBUDtBQUNILEtBSEQ7QUFJQUEsU0FBS3dCLE9BQUwsR0FBZSxVQUFTeUIsSUFBVCxFQUFjO0FBQ3pCLFlBQUcsQ0FBQytJLE9BQUosRUFBWTtBQUNSLG1CQUFPLEtBQVA7QUFDSDtBQUNELFlBQU1HLE9BQU8sR0FBR0ssS0FBSCxDQUFTQyxJQUFULENBQWNDLFNBQWQsRUFBeUIsQ0FBekIsQ0FBYjtBQUNBLFlBQU1SLFNBQVNGLFFBQVEvSSxJQUFSLENBQWY7QUFDQSxZQUFNMEosWUFBWVgsUUFBUVksR0FBMUI7O0FBRUEsWUFBR1YsTUFBSCxFQUFVO0FBQ05ELDBCQUFjQyxNQUFkLEVBQXNCQyxJQUF0QixFQUE0Qm5NLElBQTVCO0FBQ0g7QUFDRCxZQUFHMk0sU0FBSCxFQUFhO0FBQ1RWLDBCQUFjVSxTQUFkLEVBQXlCRCxTQUF6QixFQUFvQzFNLElBQXBDO0FBQ0g7QUFDSixLQWREO0FBZUFBLFNBQUs0RCxHQUFMLEdBQVcsVUFBU1gsSUFBVCxFQUFlcUosUUFBZixFQUF5QkYsT0FBekIsRUFBaUM7QUFDeEMsWUFBRyxDQUFDSixPQUFKLEVBQVk7QUFDUixtQkFBTyxLQUFQO0FBQ0g7O0FBRUQsWUFBSSxDQUFDL0ksSUFBRCxJQUFTLENBQUNxSixRQUFWLElBQXNCLENBQUNGLE9BQTNCLEVBQXFDO0FBQ2pDSixzQkFBVSxFQUFWO0FBQ0EsbUJBQU9oTSxJQUFQO0FBQ0g7O0FBRUQsWUFBTTZNLFFBQVE1SixPQUFPLENBQUNBLElBQUQsQ0FBUCxHQUFnQnFHLE9BQU9DLElBQVAsQ0FBWXlDLE9BQVosQ0FBOUI7O0FBRUEsYUFBSyxJQUFJbEssSUFBSSxDQUFSLEVBQVdnTCxJQUFJRCxNQUFNOUssTUFBMUIsRUFBa0NELElBQUlnTCxDQUF0QyxFQUF5Q2hMLEdBQXpDLEVBQThDO0FBQzFDbUIsbUJBQU80SixNQUFNL0ssQ0FBTixDQUFQO0FBQ0EsZ0JBQU1vSyxTQUFTRixRQUFRL0ksSUFBUixDQUFmO0FBQ0EsZ0JBQUlpSixNQUFKLEVBQVk7QUFDUixvQkFBTWEsU0FBU2YsUUFBUS9JLElBQVIsSUFBZ0IsRUFBL0I7QUFDQSxvQkFBSXFKLFlBQWFGLE9BQWpCLEVBQTBCO0FBQ3RCLHlCQUFLLElBQUlZLElBQUksQ0FBUixFQUFXQyxJQUFJZixPQUFPbkssTUFBM0IsRUFBbUNpTCxJQUFJQyxDQUF2QyxFQUEwQ0QsR0FBMUMsRUFBK0M7QUFDM0MsNEJBQU1YLFFBQVFILE9BQU9jLENBQVAsQ0FBZDtBQUNBLDRCQUFLVixZQUFZQSxhQUFhRCxNQUFNQyxRQUEvQixJQUEyQ0EsYUFBYUQsTUFBTUMsUUFBTixDQUFlQSxRQUF2RSxJQUFvRkEsYUFBYUQsTUFBTUMsUUFBTixDQUFlWSxTQUFqSCxJQUNHZCxXQUFXQSxZQUFZQyxNQUFNRCxPQURwQyxFQUVFO0FBQ0VXLG1DQUFPNUMsSUFBUCxDQUFZa0MsS0FBWjtBQUNIO0FBQ0o7QUFDSjtBQUNELG9CQUFJLENBQUNVLE9BQU9oTCxNQUFaLEVBQW9CO0FBQ2hCLDJCQUFPaUssUUFBUS9JLElBQVIsQ0FBUDtBQUNIO0FBQ0o7QUFDSjtBQUNELGVBQU9qRCxJQUFQO0FBQ0gsS0FqQ0Q7QUFrQ0FBLFNBQUttTixJQUFMLEdBQVksVUFBU2xLLElBQVQsRUFBZXFKLFFBQWYsRUFBeUJGLE9BQXpCLEVBQWlDO0FBQ3pDLFlBQUlnQixRQUFRLENBQVo7QUFDQSxZQUFNQyxlQUFlLFNBQWZBLFlBQWUsR0FBVztBQUM1QixnQkFBSUQsT0FBSixFQUFhO0FBQ1Q7QUFDSDtBQUNEcE4saUJBQUs0RCxHQUFMLENBQVNYLElBQVQsRUFBZW9LLFlBQWY7QUFDQWYscUJBQVNDLEtBQVQsQ0FBZXZNLElBQWYsRUFBcUIwTSxTQUFyQjtBQUNILFNBTkQ7QUFPQVcscUJBQWFILFNBQWIsR0FBeUJaLFFBQXpCO0FBQ0EsZUFBT3RNLEtBQUtnRCxFQUFMLENBQVFDLElBQVIsRUFBY29LLFlBQWQsRUFBNEJqQixPQUE1QixDQUFQO0FBQ0gsS0FYRDs7QUFhQSxXQUFPcE0sSUFBUDtBQUNILENBaEZEOztxQkFrRmU4TCxZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1RmY7Ozs7OztBQUVBOzs7OztBQUtBLElBQU13QixzQkFBc0IsU0FBdEJBLG1CQUFzQixDQUFVQyxRQUFWLEVBQW9CQyxjQUFwQixFQUFvQztBQUM1RCxRQUFJQyxlQUFlLEVBQW5CO0FBQ0EsUUFBSUMscUJBQXFCLEVBQXpCO0FBQ0EsUUFBSUMsY0FBYyxLQUFsQjtBQUNBLFFBQUkzTixPQUFPLEVBQVg7QUFDQUksc0JBQWtCRixHQUFsQixDQUFzQiw2QkFBdEI7QUFDQXNOLG1CQUFlaEUsT0FBZixDQUF1QixVQUFDb0UsT0FBRCxFQUFhO0FBQ2hDLFlBQU1DLFNBQVNOLFNBQVNLLE9BQVQsQ0FBZjtBQUNBRiwyQkFBbUJFLE9BQW5CLElBQThCQyxVQUFVLFlBQVUsQ0FBRSxDQUFwRDs7QUFFQU4saUJBQVNLLE9BQVQsSUFBb0IsWUFBVztBQUMzQixnQkFBTXpCLE9BQU8yQixNQUFNQyxTQUFOLENBQWdCdkIsS0FBaEIsQ0FBc0JDLElBQXRCLENBQTJCQyxTQUEzQixFQUFzQyxDQUF0QyxDQUFiO0FBQ0UsZ0JBQUksQ0FBQ2lCLFdBQUwsRUFBa0I7QUFDaEI7QUFDQTNOLHFCQUFLZ08sUUFBTCxDQUFjSixPQUFkLEVBQXVCekIsSUFBdkI7QUFDSCxhQUhDLE1BR0s7QUFDSDhCO0FBQ0Esb0JBQUlKLE1BQUosRUFBWTtBQUNSQSwyQkFBT3RCLEtBQVAsQ0FBYXZNLElBQWIsRUFBbUJtTSxJQUFuQjtBQUNIO0FBQ0o7QUFDSixTQVhEO0FBWUgsS0FoQkQ7QUFpQkEsUUFBSThCLHdCQUF3QixTQUF4QkEscUJBQXdCLEdBQVk7QUFDcEMsZUFBT1IsYUFBYTFMLE1BQWIsR0FBc0IsQ0FBN0IsRUFBZ0M7QUFBQSxzQ0FDRjBMLGFBQWFTLEtBQWIsRUFERTtBQUFBLGdCQUNwQk4sT0FEb0IsdUJBQ3BCQSxPQURvQjtBQUFBLGdCQUNYekIsSUFEVyx1QkFDWEEsSUFEVzs7QUFFNUIsYUFBQ3VCLG1CQUFtQkUsT0FBbkIsS0FBK0JMLFNBQVNLLE9BQVQsQ0FBaEMsRUFBbURyQixLQUFuRCxDQUF5RGdCLFFBQXpELEVBQW1FcEIsSUFBbkU7QUFDSDtBQUNKLEtBTEQ7O0FBT0FuTSxTQUFLbU8sY0FBTCxHQUFzQixVQUFDQyxJQUFELEVBQVU7QUFDNUJULHNCQUFjUyxJQUFkO0FBQ0FoTywwQkFBa0JGLEdBQWxCLENBQXNCLHdDQUF0QixFQUFnRWtPLElBQWhFO0FBQ0gsS0FIRDtBQUlBcE8sU0FBS3FPLHFCQUFMLEdBQTZCLFlBQVU7QUFDbkNqTywwQkFBa0JGLEdBQWxCLENBQXNCLCtDQUF0QixFQUF1RXdOLGtCQUF2RTtBQUNBLGVBQU9BLGtCQUFQO0FBQ0gsS0FIRDtBQUlBMU4sU0FBS3NPLFFBQUwsR0FBZ0IsWUFBVTtBQUN0QmxPLDBCQUFrQkYsR0FBbEIsQ0FBc0Isa0NBQXRCLEVBQTBEb08sUUFBMUQ7QUFDQSxlQUFPYixZQUFQO0FBQ0gsS0FIRDtBQUlBek4sU0FBS2dPLFFBQUwsR0FBZ0IsVUFBU0osT0FBVCxFQUFrQnpCLElBQWxCLEVBQXVCO0FBQ25DL0wsMEJBQWtCRixHQUFsQixDQUFzQixrQ0FBdEIsRUFBMEQwTixPQUExRCxFQUFtRXpCLElBQW5FO0FBQ0FzQixxQkFBYXRELElBQWIsQ0FBa0IsRUFBRXlELGdCQUFGLEVBQVd6QixVQUFYLEVBQWxCO0FBQ0gsS0FIRDs7QUFLQW5NLFNBQUswRCxLQUFMLEdBQWEsWUFBVTtBQUNuQnRELDBCQUFrQkYsR0FBbEIsQ0FBc0IsK0JBQXRCO0FBQ0ErTjtBQUNILEtBSEQ7QUFJQWpPLFNBQUt1TyxLQUFMLEdBQWEsWUFBVztBQUNwQm5PLDBCQUFrQkYsR0FBbEIsQ0FBc0IsK0JBQXRCO0FBQ0F1TixxQkFBYTFMLE1BQWIsR0FBc0IsQ0FBdEI7QUFDSCxLQUhEO0FBSUEvQixTQUFLNEQsR0FBTCxHQUFXLFlBQVc7QUFDbEJ4RCwwQkFBa0JGLEdBQWxCLENBQXNCLDZCQUF0QjtBQUNBc04sdUJBQWVoRSxPQUFmLENBQXVCLFVBQUNvRSxPQUFELEVBQWE7QUFDaEMsZ0JBQU1DLFNBQVNILG1CQUFtQkUsT0FBbkIsQ0FBZjtBQUNBLGdCQUFJQyxNQUFKLEVBQVk7QUFDUk4seUJBQVNLLE9BQVQsSUFBb0JDLE1BQXBCO0FBQ0EsdUJBQU9ILG1CQUFtQkUsT0FBbkIsQ0FBUDtBQUNIO0FBQ0osU0FORDtBQU9ILEtBVEQ7O0FBWUE7QUFDQTVOLFNBQUt3TyxtQkFBTCxHQUEyQixVQUFTQyxRQUFULEVBQWtCO0FBQ3pDLFlBQUlDLG1CQUFtQjlFLHdCQUFFK0UsU0FBRixDQUFZbEIsWUFBWixFQUEwQixFQUFDRyxTQUFVYSxRQUFYLEVBQTFCLENBQXZCO0FBQ0FyTywwQkFBa0JGLEdBQWxCLENBQXNCLDZDQUF0QixFQUFxRXVPLFFBQXJFO0FBQ0FoQixxQkFBYW1CLE1BQWIsQ0FBb0JoRix3QkFBRWlGLFNBQUYsQ0FBWXBCLFlBQVosRUFBMEIsRUFBQ0csU0FBVWEsUUFBWCxFQUExQixDQUFwQixFQUFxRSxDQUFyRTs7QUFFQSxZQUFNWixTQUFTSCxtQkFBbUJlLFFBQW5CLENBQWY7QUFDQSxZQUFJWixNQUFKLEVBQVk7QUFDUnpOLDhCQUFrQkYsR0FBbEIsQ0FBc0IsaUJBQXRCO0FBQ0EsZ0JBQUd3TyxnQkFBSCxFQUFvQjtBQUNoQixpQkFBQ2IsVUFBU04sU0FBU2tCLFFBQVQsQ0FBVixFQUE4QmxDLEtBQTlCLENBQW9DZ0IsUUFBcEMsRUFBOENtQixpQkFBaUJ2QyxJQUEvRDtBQUNIO0FBQ0RvQixxQkFBU2tCLFFBQVQsSUFBcUJaLE1BQXJCO0FBQ0EsbUJBQU9ILG1CQUFtQmUsUUFBbkIsQ0FBUDtBQUNIO0FBQ0osS0FkRDs7QUFnQkF6TyxTQUFLdUMsT0FBTCxHQUFlLFlBQVc7QUFDdEJuQywwQkFBa0JGLEdBQWxCLENBQXNCLGlDQUF0QjtBQUNBRixhQUFLNEQsR0FBTDtBQUNBNUQsYUFBS3VPLEtBQUw7QUFDSCxLQUpEO0FBS0EsV0FBT3ZPLElBQVA7QUFDSCxDQTFGRDs7cUJBNEZlc04sbUI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25HZjs7QUFDQTs7QUFDQTs7Ozs7QUFLQSxJQUFNd0IsaUJBQWlCLFNBQWpCQSxjQUFpQixHQUFVO0FBQzdCLFFBQU05TyxPQUFPLEVBQWI7QUFDQUksc0JBQWtCRixHQUFsQixDQUFzQix3QkFBdEI7QUFDQSxRQUFJSyxrQkFBa0IsNkJBQXRCOztBQUVBLFFBQU13TyxjQUFjLENBQ2hCO0FBQ0k5TCxjQUFNLE9BRFY7QUFFSStMLHNCQUFjLHNCQUFVQyxNQUFWLEVBQWtCO0FBQzVCLGdCQUFNQyxZQUFZO0FBQ2RDLHFCQUFLLFdBRFM7QUFFZEMscUJBQUssV0FGUztBQUdkQyxxQkFBSyxXQUhTO0FBSWRDLHFCQUFLLFdBSlM7QUFLZEMscUJBQUssV0FMUztBQU1kQyxxQkFBSyxZQU5TO0FBT2RDLHNCQUFNLFlBUFE7QUFRZEMscUJBQUssV0FSUztBQVNkQyxxQkFBSyxXQVRTO0FBVWRDLHFCQUFLLFdBVlM7QUFXZEMsd0JBQVEsV0FYTTtBQVlkQyxzQkFBTSxZQVpRO0FBYWRDLHFCQUFLLFdBYlM7QUFjZEMsc0JBQU0sK0JBZFE7QUFlZEMscUJBQUssK0JBZlM7QUFnQmRDLHFCQUFLO0FBaEJTLGFBQWxCOztBQW1CQSxnQkFBTUMsUUFBUSxZQUFVO0FBQ3BCLHVCQUFPQyxTQUFTQyxhQUFULENBQXVCLE9BQXZCLENBQVA7QUFDSCxhQUZhLEVBQWQ7QUFHQSxnQkFBSSxDQUFDRixNQUFNRyxXQUFYLEVBQXdCO0FBQ3BCLHVCQUFPLEtBQVA7QUFDSDs7QUFHRCxnQkFBTUMsT0FBT3RCLE9BQU9zQixJQUFwQjtBQUNBLGdCQUFNQyxPQUFPdkIsT0FBT3VCLElBQXBCOztBQUVBLGdCQUFHLENBQUNBLElBQUosRUFBUztBQUFDLHVCQUFPLEtBQVA7QUFBYztBQUN4QixnQkFBTUMsV0FBV3hCLE9BQU93QixRQUFQLElBQW1CdkIsVUFBVXNCLElBQVYsQ0FBcEM7O0FBRUEsZ0JBQUcsc0JBQU1ELElBQU4sRUFBWUMsSUFBWixLQUFxQmpRLGdCQUFnQjRELE9BQWhCLEtBQTRCLGdCQUFwRCxFQUFzRTtBQUNsRTtBQUNBLHVCQUFPLEtBQVA7QUFDSDs7QUFFRCxnQkFBSSx1QkFBT29NLElBQVAsRUFBYUMsSUFBYixDQUFKLEVBQXdCO0FBQ3BCLHVCQUFPLEtBQVA7QUFDSDs7QUFFRCxnQkFBRyx5QkFBU0QsSUFBVCxFQUFlQyxJQUFmLENBQUgsRUFBd0I7QUFDcEIsdUJBQU8sS0FBUDtBQUNIOztBQUVELGdCQUFJLENBQUNDLFFBQUwsRUFBZTtBQUNYLHVCQUFPLEtBQVA7QUFDSDs7QUFFRCxtQkFBTyxDQUFDLENBQUNOLE1BQU1HLFdBQU4sQ0FBa0JHLFFBQWxCLENBQVQ7QUFDSDtBQXRETCxLQURnQixFQXlEaEI7QUFDSXhOLGNBQU0sUUFEVjtBQUVJK0wsc0JBQWMsc0JBQVVDLE1BQVYsRUFBa0I7QUFDNUIsZ0JBQU1rQixRQUFRLFlBQVU7QUFDcEIsdUJBQU9DLFNBQVNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBUDtBQUNILGFBRmEsRUFBZDtBQUdBLGdCQUFJLENBQUNGLE1BQU1HLFdBQVgsRUFBd0I7QUFDcEIsdUJBQU8sS0FBUDtBQUNIO0FBQ0QsZ0JBQUksdUJBQU9DLElBQVAsRUFBYUMsSUFBYixDQUFKLEVBQXdCO0FBQ3BCLHVCQUFPLEtBQVA7QUFDSDs7QUFFRCxnQkFBTUQsT0FBT3RCLE9BQU9zQixJQUFwQjtBQUNBLGdCQUFNQyxPQUFPdkIsT0FBT3VCLElBQXBCOztBQUVBLGdCQUFHLHlCQUFTRCxJQUFULEVBQWVDLElBQWYsQ0FBSCxFQUF3QjtBQUNwQix1QkFBTyxJQUFQO0FBQ0gsYUFGRCxNQUVLO0FBQ0QsdUJBQU8sS0FBUDtBQUNIO0FBQ0o7QUFyQkwsS0F6RGdCLEVBZ0ZoQjtBQUNJdk4sY0FBTSxNQURWO0FBRUkrTCxzQkFBYyxzQkFBVUMsTUFBVixFQUFrQjtBQUM1QixnQkFBTXNCLE9BQU90QixPQUFPc0IsSUFBcEI7O0FBRUEsZ0JBQU1DLE9BQU92QixPQUFPdUIsSUFBcEI7QUFDQSxnQkFBSSx1QkFBT0QsSUFBUCxFQUFhQyxJQUFiLENBQUosRUFBd0I7QUFDcEIsdUJBQU8sS0FBUDtBQUNIOztBQUVELGdCQUFJLFFBQVNFLE9BQU9DLFdBQVAsSUFBc0JELE9BQU9FLGlCQUF0QyxNQUE4RCxVQUE5RCxJQUE0RSx1QkFBT0wsSUFBUCxFQUFhQyxJQUFiLENBQWhGLEVBQW9HO0FBQ2hHLHVCQUFPLElBQVA7QUFDSCxhQUZELE1BRUs7QUFDRCx1QkFBTyxLQUFQO0FBQ0g7QUFDSjtBQWZMLEtBaEZnQixFQWlHaEI7QUFDSXZOLGNBQU0sS0FEVjtBQUVJK0wsc0JBQWMsc0JBQVVDLE1BQVYsRUFBa0I7QUFDNUIsZ0JBQU1rQixRQUFRLFlBQVU7QUFDcEIsdUJBQU9DLFNBQVNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBUDtBQUNILGFBRmEsRUFBZDtBQUdBLGdCQUFNRSxPQUFPdEIsT0FBT3NCLElBQXBCO0FBQ0EsZ0JBQU1DLE9BQU92QixPQUFPdUIsSUFBcEI7QUFDQSxnQkFBSSx1QkFBT0QsSUFBUCxFQUFhQyxJQUFiLENBQUosRUFBd0I7QUFDcEIsdUJBQU8sS0FBUDtBQUNIOztBQUVEO0FBQ0EsZ0JBQU1LLGVBQWUsU0FBZkEsWUFBZSxHQUFLO0FBQ3JCLHlCQUFTQyxjQUFULEdBQTBCO0FBQ3ZCLHdCQUFJLE9BQU9KLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUM7QUFDL0IsK0JBQU9BLE9BQU9DLFdBQVAsSUFBc0JELE9BQU9FLGlCQUFwQztBQUNIO0FBQ0o7QUFDRCxvQkFBSUcsY0FBY0QsZ0JBQWxCO0FBQ0Esb0JBQUlFLGVBQWVOLE9BQU9PLFlBQVAsSUFBdUJQLE9BQU9RLGtCQUFqRDtBQUNBLG9CQUFJQyxrQkFBa0JKLGVBQWUsT0FBT0EsWUFBWUksZUFBbkIsS0FBdUMsVUFBdEQsSUFBb0VKLFlBQVlJLGVBQVosQ0FBNEIsMkNBQTVCLENBQTFGOztBQUVBO0FBQ0E7QUFDQSxvQkFBSUMsdUJBQXVCLENBQUNKLFlBQUQsSUFBaUJBLGFBQWFqRCxTQUFiLElBQTBCLE9BQU9pRCxhQUFhakQsU0FBYixDQUF1QnNELFlBQTlCLEtBQStDLFVBQXpFLElBQXVGLE9BQU9MLGFBQWFqRCxTQUFiLENBQXVCM0csTUFBOUIsS0FBeUMsVUFBNUs7QUFDQSx1QkFBTyxDQUFDLENBQUMrSixlQUFGLElBQXFCLENBQUMsQ0FBQ0Msb0JBQTlCO0FBQ0gsYUFkRDtBQWVBO0FBQ0E7QUFDQSxtQkFBT1AsY0FBUDtBQUNIO0FBL0JMLEtBakdnQixFQWtJaEI7QUFDSTVOLGNBQU0sTUFEVjtBQUVJK0wsc0JBQWMsc0JBQVVDLE1BQVYsRUFBa0I7QUFDNUIsZ0JBQU1zQixPQUFPdEIsT0FBT3NCLElBQXBCO0FBQ0EsZ0JBQU1DLE9BQU92QixPQUFPdUIsSUFBcEI7QUFDQSxxQkFBU2MsU0FBVCxHQUFxQjs7QUFFakIsb0JBQUlDLFVBQVUsS0FBZDs7QUFFQTtBQUNBLG9CQUFHLG1CQUFtQmIsTUFBdEIsRUFBOEI7O0FBRTFCLHdCQUFHO0FBQ0NhLGtDQUFVLENBQUMsQ0FBRSxJQUFJQyxhQUFKLENBQWtCLCtCQUFsQixDQUFiO0FBQ0gscUJBRkQsQ0FFQyxPQUFNQyxDQUFOLEVBQVE7QUFDTEYsa0NBQVUsS0FBVjtBQUNIOztBQUVEO0FBQ0gsaUJBVEQsTUFTTzs7QUFFSEEsOEJBQVUsQ0FBQyxDQUFDRyxVQUFVQyxTQUFWLENBQW9CLCtCQUFwQixDQUFaO0FBRUg7O0FBRUQsdUJBQU9KLE9BQVA7QUFFSDtBQUNELHFCQUFTdkMsWUFBVCxHQUF1QjtBQUNuQixvQkFBR3pPLGdCQUFnQjRELE9BQWhCLEtBQTRCLGdCQUE1QixJQUFnRDVELGdCQUFnQnFSLEVBQWhCLEtBQXVCLFNBQXZFLElBQW9GclIsZ0JBQWdCcVIsRUFBaEIsS0FBdUIsS0FBM0csSUFBcUhyUixnQkFBZ0I0RCxPQUFoQixLQUE0QixRQUFwSixFQUE2SjtBQUN6SiwyQkFBTyxLQUFQO0FBQ0gsaUJBRkQsTUFFSztBQUNELDJCQUFPLElBQVA7QUFDSDtBQUNKO0FBQ0QsZ0JBQUksdUJBQU9vTSxJQUFQLEVBQWFDLElBQWIsS0FBc0JjLFdBQXRCLElBQXFDdEMsY0FBekMsRUFBeUQ7QUFDckQsdUJBQU8sSUFBUDtBQUNILGFBRkQsTUFFSztBQUNELHVCQUFPLEtBQVA7QUFDSDtBQUNKO0FBeENMLEtBbElnQixDQUFwQjs7QUE4S0FoUCxTQUFLNlIsd0JBQUwsR0FBZ0MsVUFBQ0MsT0FBRCxFQUFhO0FBQ3pDMVIsMEJBQWtCRixHQUFsQixDQUFzQiw2Q0FBdEIsRUFBcUU0UixPQUFyRTtBQUNBLFlBQU03QyxTQUFVNkMsWUFBWXhJLE9BQU93SSxPQUFQLENBQWIsR0FBZ0NBLE9BQWhDLEdBQTBDLEVBQXpEO0FBQ0EsYUFBSSxJQUFJaFEsSUFBSSxDQUFaLEVBQWVBLElBQUlpTixZQUFZaE4sTUFBL0IsRUFBdUNELEdBQXZDLEVBQTRDO0FBQ3hDLGdCQUFHaU4sWUFBWWpOLENBQVosRUFBZWtOLFlBQWYsQ0FBNEJDLE1BQTVCLENBQUgsRUFBdUM7QUFDbkMsdUJBQU9GLFlBQVlqTixDQUFaLEVBQWVtQixJQUF0QjtBQUNIO0FBQ0o7QUFDSixLQVJEO0FBU0FqRCxTQUFLK1IsMkJBQUwsR0FBbUMsVUFBQ0MsWUFBRCxFQUFrQjtBQUNqRDVSLDBCQUFrQkYsR0FBbEIsQ0FBc0IsZ0RBQXRCLEVBQXdFOFIsWUFBeEU7QUFDQSxZQUFJQyxlQUFlLEVBQW5CO0FBQ0E7O0FBSUEsWUFBTUMsT0FBT0YsWUFBYjs7QUFFQSxZQUFHRSxRQUFRQSxLQUFLdFEsT0FBaEIsRUFBd0I7QUFDcEIsaUJBQUksSUFBSW9MLElBQUksQ0FBWixFQUFlQSxJQUFJa0YsS0FBS3RRLE9BQUwsQ0FBYUcsTUFBaEMsRUFBd0NpTCxHQUF4QyxFQUE2QztBQUN6QyxvQkFBSWlDLFNBQVNpRCxLQUFLdFEsT0FBTCxDQUFhb0wsQ0FBYixDQUFiO0FBQ0Esb0JBQUlpQyxNQUFKLEVBQVk7QUFDUix3QkFBTWtELFlBQVluUyxLQUFLNlIsd0JBQUwsQ0FBOEI1QyxNQUE5QixDQUFsQjtBQUNBLHdCQUFJa0QsU0FBSixFQUFlO0FBQ1hGLHFDQUFhOUgsSUFBYixDQUFrQmdJLFNBQWxCO0FBQ0g7QUFDSjtBQUNKOztBQUVELG1CQUFPRixZQUFQO0FBQ0g7QUFDRCxlQUFPLElBQVA7QUFFSCxLQXhCRDtBQXlCQSxXQUFPalMsSUFBUDtBQUNILENBdE5EOztxQkF3TmU4TyxjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1TmY7Ozs7QUFDQTs7Ozs7O0FBQ0E7O0FBTEE7OztBQU9BLElBQU1zRCxTQUFTLFNBQVRBLE1BQVMsR0FBVTtBQUNyQixRQUFNcFMsT0FBTyxFQUFiOztBQUVBLFFBQU1xUyxtQkFBbUIsU0FBbkJBLGdCQUFtQixDQUFVQyxJQUFWLEVBQWdCO0FBQ3JDLGVBQU9BLEtBQUt2SSxHQUFMLENBQVM7QUFBQSxtQkFBTyxJQUFJd0ksbUJBQUosQ0FBV0MsSUFBSUMsS0FBZixFQUFzQkQsSUFBSUUsR0FBMUIsRUFBK0JGLElBQUlHLElBQW5DLENBQVA7QUFBQSxTQUFULENBQVA7QUFDSCxLQUZEO0FBR0E7QUFDQTNTLFNBQUt1RixJQUFMLEdBQVksVUFBQ3dCLEtBQUQsRUFBUTZMLFFBQVIsRUFBa0JDLGVBQWxCLEVBQW1DQyxhQUFuQyxFQUFxRDs7QUFFN0QsWUFBSUMsaUJBQWtCO0FBQ2xCbEYsb0JBQVEsS0FEVTtBQUVsQm1GLGlCQUFNak0sTUFBTXdKLElBRk07QUFHbEIwQyxzQkFBVTtBQUhRLFNBQXRCOztBQU1BQywrQkFBdUIvUSxJQUF2QixDQUE0QixtQkFBVztBQUNuQ2dSLG9CQUFRSixjQUFSLEVBQXdCLFVBQVNwUCxLQUFULEVBQWdCeVAsUUFBaEIsRUFBMEJDLElBQTFCLEVBQWdDO0FBQ3BELG9CQUFHMVAsS0FBSCxFQUFTO0FBQ0xtUCxrQ0FBY25QLEtBQWQ7QUFDSCxpQkFGRCxNQUVLO0FBQ0Qsd0JBQUkyTyxPQUFPLEVBQVg7QUFDQSx3QkFBSWdCLFVBQVUsRUFBZDs7QUFFQSx3QkFBSUQsS0FBS25KLE9BQUwsQ0FBYSxRQUFiLEtBQTBCLENBQTlCLEVBQWlDO0FBQzdCOUosMENBQWtCRixHQUFsQixDQUFzQixlQUF0QjtBQUNBcVQsd0NBQWdCcFIsSUFBaEIsQ0FBcUIsa0JBQVU7QUFDM0IsZ0NBQUlxUixTQUFTLElBQUlDLE9BQU9DLE1BQVgsQ0FBa0JoRCxNQUFsQixFQUEwQitDLE9BQU9FLGFBQVAsRUFBMUIsQ0FBYjtBQUNBTCxzQ0FBVSxFQUFWO0FBQ0FFLG1DQUFPSSxLQUFQLEdBQWUsVUFBU3BCLEdBQVQsRUFBYztBQUN6QmMsd0NBQVFuSixJQUFSLENBQWFxSSxHQUFiO0FBQ0gsNkJBRkQ7QUFHQWdCLG1DQUFPSyxPQUFQLEdBQWlCLFlBQVc7QUFDeEI7QUFDQWhCLGdEQUFnQlMsT0FBaEI7QUFDSCw2QkFIRDtBQUlBO0FBQ0FFLG1DQUFPTSxLQUFQLENBQWFULElBQWI7QUFDSCx5QkFaRCxXQVlTLGlCQUFTO0FBQ2Q7QUFDQVAsMENBQWNuUCxLQUFkO0FBQ0gseUJBZkQ7QUFnQkgscUJBbEJELE1Ba0JNLElBQUcwUCxLQUFLbkosT0FBTCxDQUFhLE1BQWIsS0FBd0IsQ0FBM0IsRUFBNkI7QUFDL0I5SiwwQ0FBa0JGLEdBQWxCLENBQXNCLGFBQXRCO0FBQ0E2VCx3Q0FBZ0I1UixJQUFoQixDQUFxQixxQkFBYTtBQUM5QixnQ0FBSTZSLGFBQWFDLFVBQVVaLElBQVYsRUFBZ0IsRUFBQ2EsV0FBWXRCLFFBQWIsRUFBaEIsQ0FBakI7QUFDQVUsc0NBQVVqQixpQkFBaUIyQixXQUFXbk0sTUFBNUIsQ0FBVjtBQUNBZ0wsNENBQWdCUyxPQUFoQjtBQUNILHlCQUpELFdBSVMsaUJBQVM7QUFDZDtBQUNBUiwwQ0FBY25QLEtBQWQ7QUFDSCx5QkFQRDtBQVVILHFCQVpLLE1BWUQ7QUFDRHZELDBDQUFrQkYsR0FBbEIsQ0FBc0IsWUFBdEI7QUFDQW9TLCtCQUFPLDRCQUFVZSxJQUFWLENBQVA7QUFDQUMsa0NBQVVqQixpQkFBaUJDLElBQWpCLENBQVY7QUFDQU8sd0NBQWdCUyxPQUFoQjtBQUNIO0FBRUo7QUFDSixhQTdDRDtBQThDSCxTQS9DRCxXQStDUyxpQkFBUztBQUNkO0FBQ0FSLDBCQUFjblAsS0FBZDtBQUNILFNBbEREO0FBbURILEtBM0REOztBQTZEQSxXQUFPM0QsSUFBUDtBQUNILENBckVEO0FBc0VBLFNBQVNrVCxvQkFBVCxHQUErQjtBQUMzQixXQUFPaUIsd0lBQXFDLFVBQVVBLE9BQVYsRUFBbUI7QUFDM0QsZUFBT0EsbUJBQU9BLENBQUMsc0RBQVIsWUFBUDtBQUNILEtBRk0seUNBRUosVUFBU0MsR0FBVCxFQUFhO0FBQUNuVSxnQkFBUUMsR0FBUixDQUFZa1UsR0FBWjtBQUFrQixLQUY1QixDQUFQO0FBR0g7QUFDRCxTQUFTYixhQUFULEdBQXlCO0FBQ3JCLFdBQU9ZLDJFQUFpRCxVQUFVQSxPQUFWLEVBQW1CO0FBQ3ZFLGVBQU9BLG1CQUFPQSxDQUFDLDhFQUFSLFlBQVA7QUFDSCxLQUZNLHlDQUVKLFVBQVNDLEdBQVQsRUFBYTtBQUFDblUsZ0JBQVFDLEdBQVIsQ0FBWWtVLEdBQVo7QUFBa0IsS0FGNUIsQ0FBUDtBQUdIO0FBQ0QsU0FBU0wsYUFBVCxHQUF5QjtBQUNyQixXQUFPSSwyRUFBaUQsVUFBVUEsT0FBVixFQUFtQjtBQUN2RSxlQUFPQSxtQkFBT0EsQ0FBQyw4RUFBUixZQUFQO0FBQ0gsS0FGTSx5Q0FFSixVQUFTQyxHQUFULEVBQWE7QUFBQ25VLGdCQUFRQyxHQUFSLENBQVlrVSxHQUFaO0FBQWtCLEtBRjVCLENBQVA7QUFHSDtxQkFDY2hDLE07Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pGZjs7OztBQUNBOztBQUNBOzs7Ozs7QUFFQSxJQUFNaUMsWUFBWSxTQUFaQSxTQUFZLENBQVNDLElBQVQsRUFBYztBQUM1QixXQUFPQSxTQUFTLFdBQVQsSUFBd0JBLFNBQVMsVUFBeEM7QUFDSCxDQUZELEMsQ0FQQTs7Ozs7QUFXQSxJQUFNQyxVQUFVLFNBQVZBLE9BQVUsQ0FBU0MsR0FBVCxFQUFjQyxhQUFkLEVBQTRCOztBQUV4QyxRQUFNelUsT0FBTyxFQUFiO0FBQ0EsUUFBSTBVLGNBQWMsRUFBbEI7QUFDQSxRQUFJQyxzQkFBc0IsQ0FBQyxDQUEzQjs7QUFFQSxRQUFJQyxnQkFBZ0IsMEJBQXBCO0FBQ0EsUUFBSUMsY0FBYyxJQUFsQjtBQUNBLFFBQUlDLFlBQVksS0FBaEI7O0FBR0ExVSxzQkFBa0JGLEdBQWxCLENBQXNCLHFCQUF0QixFQUE2Q3VVLGFBQTdDOztBQUdBLFFBQUlNLFlBQVksU0FBWkEsU0FBWSxDQUFTaE8sS0FBVCxFQUFnQnVNLE9BQWhCLEVBQXdCO0FBQ3BDdk0sY0FBTTdELElBQU4sR0FBYW9RLFdBQVcsRUFBeEI7QUFDQXZNLGNBQU05RCxJQUFOLEdBQWE4RCxNQUFNaU8sS0FBTixJQUFlak8sTUFBTTlELElBQXJCLElBQTZCOEQsTUFBTTZMLFFBQWhEO0FBQ0E3TCxjQUFNa08sRUFBTixHQUFZLFVBQVNsTyxLQUFULEVBQWdCbU8sV0FBaEIsRUFBNkI7QUFDckMsZ0JBQUlDLE9BQUo7QUFDQSxnQkFBSUMsU0FBU3JPLE1BQU11TixJQUFOLElBQWMsSUFBM0I7QUFDQSxnQkFBSXZOLG9CQUFpQkEsTUFBTXNPLFlBQTNCLEVBQXlDO0FBQ3JDRiwwQkFBVSxTQUFWO0FBRUgsYUFIRCxNQUdPO0FBQ0hBLDBCQUFVcE8sTUFBTWtPLEVBQU4sSUFBYUcsU0FBU0YsV0FBaEM7QUFDSDtBQUNELGdCQUFHTCxXQUFILEVBQWU7QUFDWDtBQUNBUyxxQ0FBcUJaLFlBQVkzUyxNQUFaLElBQW9CLENBQXpDO0FBQ0E4Uyw4QkFBYyxLQUFkO0FBRUg7QUFDRCxtQkFBT00sT0FBUDtBQUNILFNBaEJVLENBZ0JScE8sS0FoQlEsRUFnQkQyTixZQUFZM1MsTUFoQlgsQ0FBWDs7QUFrQkEyUyxvQkFBWXZLLElBQVosQ0FBaUJwRCxLQUFqQjtBQUNBLGVBQU9BLE1BQU1rTyxFQUFiO0FBQ0gsS0F2QkQ7QUF3QkEsUUFBSUssdUJBQXVCLFNBQXZCQSxvQkFBdUIsQ0FBU3hVLEtBQVQsRUFBZTtBQUN0QzZULDhCQUFzQjdULEtBQXRCO0FBQ0EwVCxZQUFJaFQsT0FBSixDQUFZK1Qsa0NBQVosRUFBcUNaLG1CQUFyQztBQUNILEtBSEQ7QUFJQSxRQUFHSCxJQUFJalEsU0FBSixHQUFnQnZELFFBQWhCLElBQTRCd1QsSUFBSWpRLFNBQUosR0FBZ0J2RCxRQUFoQixDQUF5QmUsTUFBekIsR0FBa0MsQ0FBakUsRUFBbUU7QUFDL0QsWUFBSWYsV0FBV3dULElBQUlqUSxTQUFKLEdBQWdCdkQsUUFBaEIsQ0FBeUJ5VCxhQUF6QixDQUFmOztBQUVBLFlBQUd6VCxZQUFZQSxTQUFTd1UsTUFBckIsSUFBK0J4VSxTQUFTd1UsTUFBVCxDQUFnQnpULE1BQWhCLEdBQXlCLENBQTNELEVBQTZEO0FBQUEsdUNBQ2pERCxDQURpRDtBQUVyRCxvQkFBTWlGLFFBQVEvRixTQUFTd1UsTUFBVCxDQUFnQjFULENBQWhCLENBQWQ7O0FBRUEsb0JBQUd1UyxVQUFVdE4sTUFBTXVOLElBQWhCLEtBQXlCLENBQUUxSyx3QkFBRStFLFNBQUYsQ0FBWTVILEtBQVosRUFBbUIsRUFBQ3dKLE1BQU94SixNQUFNd0osSUFBZCxFQUFuQixDQUE5QixFQUFzRTtBQUNsRTtBQUNBcUUsa0NBQWNyUCxJQUFkLENBQW1Cd0IsS0FBbkIsRUFBMEJBLE1BQU0wTyxJQUFoQyxFQUFzQyxVQUFTbkMsT0FBVCxFQUFpQjtBQUNuRCw0QkFBR0EsV0FBV0EsUUFBUXZSLE1BQVIsR0FBaUIsQ0FBL0IsRUFBaUM7QUFDN0IsZ0NBQUkyVCxZQUFZWCxVQUFVaE8sS0FBVixFQUFpQnVNLE9BQWpCLENBQWhCO0FBQ0g7QUFDSixxQkFKRCxFQUlHLFVBQVMzUCxLQUFULEVBQWU7QUFDZCw0QkFBSUcsWUFBWXpCLGtCQUFPc1QsK0JBQVAsQ0FBaEI7QUFDQTdSLGtDQUFVSCxLQUFWLEdBQWtCQSxLQUFsQjtBQUNBNlEsNEJBQUloVCxPQUFKLENBQVkyQixnQkFBWixFQUFtQlcsU0FBbkI7QUFDSCxxQkFSRDtBQVNIO0FBZm9EOztBQUN6RCxpQkFBSSxJQUFJaEMsSUFBSSxDQUFaLEVBQWVBLElBQUlkLFNBQVN3VSxNQUFULENBQWdCelQsTUFBbkMsRUFBMkNELEdBQTNDLEVBQWdEO0FBQUEsc0JBQXhDQSxDQUF3QztBQWUvQztBQUVKO0FBQ0o7O0FBRUQwUyxRQUFJeFIsRUFBSixDQUFPNFMsdUJBQVAsRUFBcUIsVUFBU0MsSUFBVCxFQUFjO0FBQy9CLFlBQUluUSxXQUFXbVEsS0FBS25RLFFBQXBCO0FBQ0EsWUFBR2lQLHNCQUFzQixDQUFDLENBQXZCLElBQTRCRCxZQUFZQyxtQkFBWixDQUEvQixFQUFnRTtBQUM1RCxnQkFBSW1CLGNBQWNsTSx3QkFBRUQsTUFBRixDQUFTK0ssWUFBWUMsbUJBQVosRUFBaUN6UixJQUExQyxFQUFnRCxVQUFVc1AsR0FBVixFQUFlO0FBQzdFLHVCQUFPOU0sWUFBYThNLElBQUl1RCxTQUFqQixJQUFpQyxDQUFDLENBQUN2RCxJQUFJd0QsT0FBTCxJQUFnQnRRLFFBQWpCLEtBQThCOE0sSUFBSXdELE9BQTFFO0FBQ0gsYUFGaUIsQ0FBbEI7QUFHQSxnQkFBR0YsZUFBZUEsWUFBWS9ULE1BQVosR0FBcUIsQ0FBdkMsRUFBeUM7QUFDckN5UyxvQkFBSWhULE9BQUosQ0FBWXlVLHNDQUFaLEVBQXlDSCxZQUFZLENBQVosQ0FBekM7QUFDSDtBQUNKO0FBRUosS0FYRDtBQVlBOVYsU0FBS2tXLGdCQUFMLEdBQXdCLFVBQUNDLGdCQUFELEVBQXFCO0FBQ3pDekIsc0JBQWMsRUFBZDtBQUNBWSw2QkFBcUJhLGdCQUFyQjtBQUNBO0FBQ0gsS0FKRDtBQUtBblcsU0FBSzJHLGNBQUwsR0FBc0IsWUFBSztBQUN2QixlQUFPK04sZUFBYSxFQUFwQjtBQUNILEtBRkQ7QUFHQTFVLFNBQUs0RyxpQkFBTCxHQUF5QixZQUFLO0FBQzFCLGVBQU8rTixtQkFBUDtBQUNILEtBRkQ7QUFHQTNVLFNBQUs2RyxpQkFBTCxHQUF5QixVQUFDdVAsTUFBRCxFQUFXO0FBQ2hDLFlBQUdBLFNBQVMsQ0FBQyxDQUFWLElBQWVBLFNBQVMxQixZQUFZM1MsTUFBdkMsRUFBOEM7QUFDMUN1VCxpQ0FBcUJjLE1BQXJCO0FBQ0gsU0FGRCxNQUVLO0FBQ0QsbUJBQU8sSUFBUDtBQUNIO0FBQ0osS0FORDtBQU9BcFcsU0FBSzhHLFVBQUwsR0FBa0IsVUFBQ0MsS0FBRCxFQUFVO0FBQ3hCLFlBQUdzTixVQUFVdE4sTUFBTXVOLElBQWhCLEtBQXlCLENBQUUxSyx3QkFBRStFLFNBQUYsQ0FBWWlHLGFBQVosRUFBMkIsRUFBQ3JFLE1BQU94SixNQUFNd0osSUFBZCxFQUEzQixDQUE5QixFQUE4RTtBQUMxRXFFLDBCQUFjclAsSUFBZCxDQUFtQndCLEtBQW5CLEVBQTBCLFVBQVN1TSxPQUFULEVBQWlCO0FBQ3ZDLG9CQUFHQSxXQUFXQSxRQUFRdlIsTUFBUixHQUFpQixDQUEvQixFQUFpQztBQUM3QmdULDhCQUFVaE8sS0FBVixFQUFpQnVNLE9BQWpCO0FBQ0g7QUFDSixhQUpELEVBSUcsVUFBUzNQLEtBQVQsRUFBZTtBQUNkLG9CQUFJRyxZQUFZekIsa0JBQU9zVCwrQkFBUCxDQUFoQjtBQUNBN1IsMEJBQVVILEtBQVYsR0FBa0JBLEtBQWxCO0FBQ0E2USxvQkFBSWhULE9BQUosQ0FBWTJCLGdCQUFaLEVBQW1CVyxTQUFuQjtBQUNILGFBUkQ7QUFTSDtBQUNKLEtBWkQ7QUFhQTlELFNBQUtnSCxhQUFMLEdBQXFCLFVBQUNsRyxLQUFELEVBQVc7QUFDNUIsWUFBR0EsUUFBUSxDQUFDLENBQVQsSUFBY0EsUUFBUTRULFlBQVkzUyxNQUFyQyxFQUE0QztBQUN4QzJTLHdCQUFZOUYsTUFBWixDQUFtQjlOLEtBQW5CLEVBQTBCLENBQTFCO0FBQ0EsbUJBQU80VCxXQUFQO0FBQ0gsU0FIRCxNQUdLO0FBQ0QsbUJBQU8sSUFBUDtBQUNIO0FBQ0osS0FQRDtBQVFBMVUsU0FBS3VDLE9BQUwsR0FBZSxZQUFNO0FBQ2pCbVMsc0JBQWMsRUFBZDtBQUNBRSx3QkFBZ0IsSUFBaEI7QUFDQUosWUFBSTVRLEdBQUosQ0FBUWdTLHVCQUFSLEVBQXNCLElBQXRCLEVBQTRCNVYsSUFBNUI7QUFDSCxLQUpEOztBQU1BLFdBQU9BLElBQVA7QUFDSCxDQTVIRDs7cUJBaUlldVUsTzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeklmOztBQUVBLFNBQVM4QixNQUFULENBQWdCblQsSUFBaEIsRUFBc0I7QUFDbEIsUUFBSW9ULFFBQVEsRUFBWjtBQUNBLFFBQUlDLFFBQVFyVCxLQUFLc1QsS0FBTCxDQUFXLE1BQVgsQ0FBWjtBQUNBLFFBQUlELE1BQU14VSxNQUFOLEtBQWlCLENBQXJCLEVBQXdCO0FBQ3BCd1UsZ0JBQVFyVCxLQUFLc1QsS0FBTCxDQUFXLElBQVgsQ0FBUjtBQUNIO0FBQ0QsUUFBSUMsTUFBTSxDQUFWO0FBQ0EsUUFBSUYsTUFBTSxDQUFOLEVBQVNyTSxPQUFULENBQWlCLE9BQWpCLElBQTRCLENBQWhDLEVBQW1DO0FBQy9CdU0sY0FBTSxDQUFOO0FBQ0g7QUFDRCxRQUFJRixNQUFNeFUsTUFBTixHQUFlMFUsTUFBTSxDQUFyQixJQUEwQkYsTUFBTUUsTUFBTSxDQUFaLENBQTlCLEVBQThDO0FBQzFDO0FBQ0EsWUFBSUMsT0FBT0gsTUFBTUUsR0FBTixDQUFYO0FBQ0EsWUFBSTNWLFFBQVE0VixLQUFLeE0sT0FBTCxDQUFhLE9BQWIsQ0FBWjtBQUNBLFlBQUlwSixRQUFRLENBQVosRUFBZTtBQUNYd1Ysa0JBQU03RCxLQUFOLEdBQWMsMEJBQVlpRSxLQUFLQyxNQUFMLENBQVksQ0FBWixFQUFlN1YsS0FBZixDQUFaLENBQWQ7QUFDQXdWLGtCQUFNNUQsR0FBTixHQUFZLDBCQUFZZ0UsS0FBS0MsTUFBTCxDQUFZN1YsUUFBUSxDQUFwQixDQUFaLENBQVo7QUFDQXdWLGtCQUFNM0QsSUFBTixHQUFhNEQsTUFBTS9KLEtBQU4sQ0FBWWlLLE1BQU0sQ0FBbEIsRUFBcUJHLElBQXJCLENBQTBCLE1BQTFCLENBQWI7QUFDSDtBQUNKO0FBQ0QsV0FBT04sS0FBUDtBQUVILEMsQ0EzQkQ7Ozs7O0FBNkJBLElBQU1PLFlBQVksU0FBWkEsU0FBWSxDQUFTM1QsSUFBVCxFQUFlO0FBQzdCLFFBQUk0VCxXQUFXLEVBQWY7O0FBRUE1VCxXQUFPLG1CQUFLQSxJQUFMLENBQVA7O0FBRUEsUUFBSTZULE9BQU83VCxLQUFLc1QsS0FBTCxDQUFXLFVBQVgsQ0FBWDtBQUNBLFFBQUlPLEtBQUtoVixNQUFMLEtBQWdCLENBQXBCLEVBQXVCO0FBQ25CZ1YsZUFBTzdULEtBQUtzVCxLQUFMLENBQVcsTUFBWCxDQUFQO0FBQ0g7O0FBSUQsU0FBSyxJQUFJMVUsSUFBSSxDQUFiLEVBQWdCQSxJQUFJaVYsS0FBS2hWLE1BQXpCLEVBQWlDRCxHQUFqQyxFQUFzQztBQUNsQyxZQUFJaVYsS0FBS2pWLENBQUwsTUFBWSxRQUFoQixFQUEwQjtBQUN0QjtBQUNIO0FBQ0QsWUFBSXdVLFFBQVFELE9BQU9VLEtBQUtqVixDQUFMLENBQVAsQ0FBWjtBQUNBLFlBQUl3VSxNQUFNM0QsSUFBVixFQUFnQjtBQUNabUUscUJBQVMzTSxJQUFULENBQWNtTSxLQUFkO0FBQ0g7QUFDSjs7QUFFRCxXQUFPUSxRQUFQO0FBQ0gsQ0F2QkQ7O3FCQTJCZUQsUzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4RGY7QUFDTyxJQUFNRyw0Q0FBa0IsV0FBeEI7QUFDQSxJQUFNQyxrQ0FBYSxNQUFuQjtBQUNBLElBQU1DLDBDQUFpQixVQUF2QjtBQUNBLElBQU1DLHNDQUFlLFFBQXJCO0FBQ0EsSUFBTUMsd0NBQWdCLFNBQXRCO0FBQ0EsSUFBTUMsb0NBQWMsT0FBcEI7QUFDQSxJQUFNQyx3Q0FBZ0IsU0FBdEI7QUFDQSxJQUFNQyx3Q0FBZ0IsU0FBdEI7O0FBRUEsSUFBTUMsOENBQW1CLFdBQXpCO0FBQ0EsSUFBTUMsNENBQWtCLFVBQXhCO0FBQ0EsSUFBTUMsOENBQW1CLFdBQXpCO0FBQ0EsSUFBTUMsNENBQWtCLFVBQXhCO0FBQ0EsSUFBTUMsZ0RBQW9CLFlBQTFCO0FBQ0EsSUFBTUMsMENBQWlCLFNBQXZCO0FBQ0EsSUFBTUMsNENBQWtCLFNBQXhCOztBQUVQO0FBQ08sSUFBTUMsMENBQWlCLE9BQXZCO0FBQ0EsSUFBTUMsNENBQWtCLFFBQXhCO0FBQ0EsSUFBTUMsd0NBQWdCLE1BQXRCO0FBQ0EsSUFBTTdSLHNDQUFlLEtBQXJCO0FBQ0EsSUFBTXJELHdDQUFnQixNQUF0Qjs7QUFFUDtBQUNPLElBQU1tViw4Q0FBbUJoQixjQUF6QjtBQUNBLElBQU16VCx3QkFBUSxPQUFkO0FBQ0EsSUFBTTRELDRCQUFVLFNBQWhCO0FBQ0EsSUFBTThRLHNDQUFlLE1BQXJCO0FBQ0EsSUFBTUMsb0RBQXNCLFlBQTVCO0FBQ0EsSUFBTUMsd0NBQWdCLGNBQXRCO0FBQ0EsSUFBTUMsMENBQWlCLFFBQXZCO0FBQ0EsSUFBTUMsOENBQW1CLGlCQUF6QjtBQUNBLElBQU1DLDBDQUFpQixRQUF2QjtBQUNBLElBQU0vVyxrREFBcUIsa0JBQTNCO0FBQ0EsSUFBTTJCLGdEQUFvQixpQkFBMUI7O0FBSUEsSUFBTUQsd0JBQVEsT0FBZDs7QUFFUDtBQUNPLElBQU1zVixzQ0FBZSxjQUFyQjtBQUNBLElBQU1DLDRDQUFrQnhCLGNBQXhCO0FBQ0EsSUFBTXlCLHNDQUFlLE9BQXJCO0FBQ0EsSUFBTUMsb0NBQWMsTUFBcEI7O0FBRUEsSUFBTUMsMENBQWlCLFNBQXZCO0FBQ0EsSUFBTUMsMENBQWlCLFNBQXZCO0FBQ0EsSUFBTUMsMENBQWlCLFNBQXZCO0FBQ0EsSUFBTUMsZ0VBQTRCLHFCQUFsQztBQUNBLElBQU1DLGdFQUE0QixtQkFBbEM7QUFDQSxJQUFNQywwQ0FBaUIsU0FBdkI7O0FBRUEsSUFBTUMsa0NBQWEsV0FBbkI7QUFDQSxJQUFNQyw0QkFBVSxRQUFoQjtBQUNBLElBQU1DLDBDQUFpQixlQUF2QjtBQUNBLElBQU16RCxzQ0FBZSxNQUFyQjtBQUNBLElBQU0wRCxvREFBc0IsWUFBNUI7QUFDQSxJQUFNQywwQ0FBaUIsZUFBdkI7QUFDQSxJQUFNQyxzQ0FBZSxNQUFyQjtBQUNBLElBQU1DLHNDQUFlLGFBQXJCO0FBQ0EsSUFBTUMsMERBQXlCLGVBQS9CO0FBQ0EsSUFBTUMsd0RBQXdCLHFCQUE5QjtBQUNBLElBQU1DLHdEQUF3QixxQkFBOUI7QUFDQSxJQUFNM0Qsb0VBQThCLFlBQXBDO0FBQ0EsSUFBTVYsNERBQTBCLGdCQUFoQztBQUNBLElBQU1qSyxnRUFBNEIsd0JBQWxDO0FBQ0EsSUFBTXVPLHNDQUFlLFNBQXJCOztBQUdBLElBQU1DLG9EQUFzQixXQUE1QjtBQUNBLElBQU1DLDBDQUFpQixNQUF2Qjs7QUFHQSxJQUFNaFcsa0RBQXFCLEdBQTNCO0FBQ0EsSUFBTXpCLHNEQUF1QixHQUE3QjtBQUNBLElBQU0wWCx3REFBd0IsR0FBOUI7QUFDQSxJQUFNQyxvREFBc0IsR0FBNUI7QUFDQSxJQUFNQywwQ0FBaUIsR0FBdkI7QUFDQSxJQUFNQyxrREFBcUIsR0FBM0I7QUFDQSxJQUFNQyxvREFBc0IsR0FBNUI7QUFDQSxJQUFNQyxzREFBdUIsR0FBN0I7QUFDQSxJQUFNQywwRUFBaUMsR0FBdkM7QUFDQSxJQUFNQyxzRUFBK0IsR0FBckM7QUFDQSxJQUFNQyxvRUFBOEIsR0FBcEM7QUFDQSxJQUFNQyxnREFBb0IsR0FBMUI7QUFDQSxJQUFNOUUsc0RBQXVCLEdBQTdCO0FBQ0EsSUFBTStFLDBEQUF5QixHQUEvQjtBQUNBLElBQU1DLHNGQUF1QyxHQUE3QztBQUNBLElBQU1DLG9GQUFzQyxHQUE1QztBQUNBLElBQU1DLGdGQUFvQyxHQUExQztBQUNBLElBQU1DLGtGQUFxQyxHQUEzQztBQUNBLElBQU1DLGtFQUE2QixHQUFuQzs7QUFFQSxJQUFNQyxrREFBcUIseUNBQTNCOztBQUVBLElBQU0zWSwwQkFBUztBQUNsQixTQUFNLEVBQUN3QixNQUFPLEdBQVIsRUFBY29YLFNBQVUsc0NBQXhCLEVBQWdFQyxRQUFRLHNDQUF4RSxFQURZO0FBRWxCLFNBQU0sRUFBQ3JYLE1BQU8sR0FBUixFQUFjb1gsU0FBVSx3Q0FBeEIsRUFBa0VDLFFBQVEsd0NBQTFFLEVBRlk7QUFHbEIsU0FBTSxFQUFDclgsTUFBTyxHQUFSLEVBQWNvWCxTQUFVLDROQUF4QixFQUFzUEMsUUFBUSwrREFBOVAsRUFIWTtBQUlsQixTQUFNLEVBQUNyWCxNQUFPLEdBQVIsRUFBY29YLFNBQVUsK0RBQXhCLEVBQXlGQyxRQUFRLG1EQUFqRyxFQUpZO0FBS2xCLFNBQU0sRUFBQ3JYLE1BQU8sR0FBUixFQUFjb1gsU0FBVSwwQ0FBeEIsRUFBb0VDLFFBQVEsc0NBQTVFLEVBTFk7QUFNbEIsU0FBTSxFQUFDclgsTUFBTyxHQUFSLEVBQWNvWCxTQUFVLG1EQUF4QixFQUE2RUMsUUFBUSxtQkFBckYsRUFOWTtBQU9sQixTQUFNLEVBQUNyWCxNQUFPLEdBQVIsRUFBY29YLFNBQVUsaURBQXhCLEVBQTJFQyxRQUFRLGtCQUFuRixFQVBZO0FBUWxCLFNBQU0sRUFBQ3JYLE1BQU8sR0FBUixFQUFjb1gsU0FBVSxzQ0FBeEIsRUFBZ0VDLFFBQVEsc0NBQXhFLEVBUlk7QUFTbEIsU0FBTSxFQUFDclgsTUFBTyxHQUFSLEVBQWNvWCxTQUFVLG1DQUF4QixFQUE2REMsUUFBUSxtQ0FBckUsRUFUWTtBQVVsQixTQUFNLEVBQUNyWCxNQUFPLEdBQVIsRUFBY29YLFNBQVUsbUVBQXhCLEVBQTZGQyxRQUFRLGtDQUFyRyxFQVZZO0FBV2xCLFNBQU0sRUFBQ3JYLE1BQU8sR0FBUixFQUFjb1gsU0FBVSxzR0FBeEIsRUFBZ0lDLFFBQVEsK0JBQXhJLEVBWFk7QUFZbEIsU0FBTSxFQUFDclgsTUFBTyxHQUFSLEVBQWNvWCxTQUFVLHdJQUF4QixFQUFrS0MsUUFBUSwrQkFBMUssRUFaWTtBQWFsQixTQUFNLEVBQUNyWCxNQUFPLEdBQVIsRUFBY29YLFNBQVUsK0NBQXhCLEVBQXlFQyxRQUFRLCtDQUFqRixFQWJZO0FBY2xCLFNBQU0sRUFBQ3JYLE1BQU8sR0FBUixFQUFjb1gsU0FBVSxpREFBeEIsRUFBMkVDLFFBQVEsOEJBQW5GLEVBZFk7QUFlbEIsU0FBTSxFQUFDclgsTUFBTyxHQUFSLEVBQWNvWCxTQUFVLGlEQUF4QixFQUEyRUMsUUFBUSxnQ0FBbkYsRUFmWTtBQWdCbEIsU0FBTSxFQUFDclgsTUFBTyxHQUFSLEVBQWNvWCxTQUFVLGlEQUF4QixFQUEyRUMsUUFBUSxxQ0FBbkYsRUFoQlk7QUFpQmxCLFNBQU0sRUFBQ3JYLE1BQU8sR0FBUixFQUFjb1gsU0FBVSxpREFBeEIsRUFBMkVDLFFBQVEsaUNBQW5GLEVBakJZO0FBa0JsQixTQUFNLEVBQUNyWCxNQUFPLEdBQVIsRUFBY29YLFNBQVUsaURBQXhCLEVBQTJFQyxRQUFRLG9DQUFuRixFQWxCWTtBQW1CbEIsU0FBTSxFQUFDclgsTUFBTyxHQUFSLEVBQWNvWCxTQUFVLCtEQUF4QixFQUF5RkMsUUFBUSxrQkFBakc7QUFuQlksQ0FBZjs7QUFzQkEsSUFBTUMsOEJBQVc7QUFDcEJDLGlCQUFjLGFBRE07QUFFcEJDLGdCQUFhO0FBRk8sQ0FBakIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkhQOztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFFQSxJQUFNOUcsVUFBVSxTQUFWQSxPQUFVLENBQVN4VSxTQUFULEVBQW9CdWIsV0FBcEIsRUFBZ0M7QUFDNUMsUUFBTXRiLE9BQU8sRUFBYjtBQUNBLFFBQU11YixVQUFVLDRCQUFjLGVBQWQsSUFBK0Isd0JBQS9CLEdBQXdEcGIsZ0JBQXhFO0FBQ0EsUUFBSXFiLFNBQVN6YixVQUFVMGIsWUFBVixDQUF1QixnQkFBdkIsQ0FBYjtBQUNBLFFBQUlDLGFBQWEseUJBQUkzYixTQUFKLENBQWpCO0FBQ0EsUUFBSTRiLGVBQWUsRUFBbkI7O0FBRUF2YixzQkFBa0JGLEdBQWxCLENBQXNCLGlDQUF0QixFQUF5RG9iLFdBQXpEOztBQUVBLFFBQU1NLGtCQUFrQixTQUFsQkEsZUFBa0IsQ0FBU2xRLE1BQVQsRUFBZ0I7QUFDcENpUSx1QkFBZXZMLFNBQVNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBZjtBQUNBc0wscUJBQWFFLFlBQWIsQ0FBMEIsdUJBQTFCLEVBQW1ELEVBQW5EO0FBQ0FGLHFCQUFhRSxZQUFiLENBQTBCLG9CQUExQixFQUFnRCxNQUFoRDtBQUNBRixxQkFBYUUsWUFBYixDQUEwQixhQUExQixFQUF5QyxNQUF6QztBQUNBLFlBQUduUSxNQUFILEVBQVU7QUFDTmlRLHlCQUFhRSxZQUFiLENBQTBCLE1BQTFCLEVBQWtDLEVBQWxDO0FBQ0g7QUFDREgsbUJBQVdJLE1BQVgsQ0FBa0JILFlBQWxCOztBQUVBLGVBQU9BLFlBQVA7QUFDSCxLQVhEO0FBWUEsUUFBTUksbUJBQW1CLFNBQW5CQSxnQkFBbUIsQ0FBU3JRLE1BQVQsRUFBaUJzUSxVQUFqQixFQUE2QkMsYUFBN0IsRUFBMkM7QUFDaEUsWUFBSUMsY0FBSjtBQUFBLFlBQVdDLGtCQUFYO0FBQUEsWUFBc0JDLDBCQUF0QjtBQUFBLFlBQXlDQyx3QkFBekM7QUFBQSxZQUEwRHhhLGdCQUExRDtBQUFBLFlBQW1Fb0IsYUFBbkU7QUFBQSxZQUF5RXFaLGFBQXpFO0FBQUEsWUFBK0VDLGFBQS9FO0FBQUEsWUFBcUZDLGdCQUFyRjtBQUFBLFlBQThGcFUsYUFBOUY7QUFBQSxZQUFvR3FVLGNBQXBHO0FBQ0FyYywwQkFBa0JGLEdBQWxCLENBQXNCLHNDQUF0QixFQUE4RDhiLFVBQTlELEVBQTBFQyxhQUExRTtBQUNBQyxnQkFBUTlMLFNBQVNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBUjtBQUNBNkwsY0FBTUwsWUFBTixDQUFtQixNQUFuQixFQUEyQixPQUEzQjtBQUNBSyxjQUFNTCxZQUFOLENBQW1CLE9BQW5CLEVBQTRCTixPQUE1Qjs7QUFFQVksb0JBQVkvTCxTQUFTQyxhQUFULENBQXVCLE9BQXZCLENBQVo7QUFDQThMLGtCQUFVTixZQUFWLENBQXVCLE1BQXZCLEVBQStCLFdBQS9CO0FBQ0E7QUFDQU0sa0JBQVVOLFlBQVYsQ0FBdUIsT0FBdkIsZ0JBQTRDTCxNQUE1QyxvQkFBaUVRLFVBQWpFLHVCQUE2RkMsYUFBN0Y7O0FBRUFHLDRCQUFvQmhNLFNBQVNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBcEI7QUFDQStMLDBCQUFrQlAsWUFBbEIsQ0FBK0IsTUFBL0IsRUFBdUMsbUJBQXZDO0FBQ0FPLDBCQUFrQlAsWUFBbEIsQ0FBK0IsT0FBL0IsRUFBd0MsUUFBeEM7O0FBRUFRLDBCQUFrQmpNLFNBQVNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBbEI7QUFDQWdNLHdCQUFnQlIsWUFBaEIsQ0FBNkIsTUFBN0IsRUFBcUMsaUJBQXJDO0FBQ0FRLHdCQUFnQlIsWUFBaEIsQ0FBNkIsT0FBN0IsRUFBc0MsTUFBdEM7O0FBRUFoYSxrQkFBVXVPLFNBQVNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBVjtBQUNBeE8sZ0JBQVFnYSxZQUFSLENBQXFCLE1BQXJCLEVBQTZCLFNBQTdCO0FBQ0FoYSxnQkFBUWdhLFlBQVIsQ0FBcUIsT0FBckIsRUFBOEIsUUFBOUI7O0FBRUE1WSxlQUFPbU4sU0FBU0MsYUFBVCxDQUF1QixPQUF2QixDQUFQO0FBQ0FwTixhQUFLNFksWUFBTCxDQUFrQixNQUFsQixFQUEwQixNQUExQjtBQUNBNVksYUFBSzRZLFlBQUwsQ0FBa0IsT0FBbEIsRUFBMkJMLFNBQU8sUUFBbEM7O0FBRUFjLGVBQU9sTSxTQUFTQyxhQUFULENBQXVCLE9BQXZCLENBQVA7QUFDQWlNLGFBQUtULFlBQUwsQ0FBa0IsTUFBbEIsRUFBMEIsTUFBMUI7QUFDQVMsYUFBS1QsWUFBTCxDQUFrQixPQUFsQixFQUEyQixPQUEzQjs7QUFFQVUsZUFBT25NLFNBQVNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBUDtBQUNBa00sYUFBS1YsWUFBTCxDQUFrQixNQUFsQixFQUEwQixTQUExQjtBQUNBVSxhQUFLVixZQUFMLENBQWtCLE9BQWxCLEVBQTJCLE1BQTNCOztBQUVBVyxrQkFBVXBNLFNBQVNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBVjtBQUNBbU0sZ0JBQVFYLFlBQVIsQ0FBcUIsTUFBckIsRUFBNkIsU0FBN0I7QUFDQVcsZ0JBQVFYLFlBQVIsQ0FBcUIsT0FBckIsRUFBOEIsU0FBOUI7O0FBRUFZLGdCQUFRck0sU0FBU0MsYUFBVCxDQUF1QixPQUF2QixDQUFSO0FBQ0FvTSxjQUFNWixZQUFOLENBQW1CLE1BQW5CLEVBQTJCLE9BQTNCO0FBQ0FZLGNBQU1aLFlBQU4sQ0FBbUIsT0FBbkIsRUFBNEIsUUFBNUI7O0FBRUE7Ozs7QUFJQSxZQUFHblEsTUFBSCxFQUFVO0FBQ050RCxtQkFBT2dJLFNBQVNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBUDtBQUNBakksaUJBQUt5VCxZQUFMLENBQWtCLE1BQWxCLEVBQTBCLE1BQTFCO0FBQ0F6VCxpQkFBS3lULFlBQUwsQ0FBa0IsT0FBbEIsRUFBMkIsTUFBM0I7QUFDSDs7QUFFREYsdUJBQWV2TCxTQUFTQyxhQUFULENBQXVCLFFBQXZCLENBQWY7QUFDQXNMLHFCQUFhRSxZQUFiLENBQTBCLElBQTFCLEVBQWdDTCxTQUFPLFFBQXZDO0FBQ0FHLHFCQUFhRSxZQUFiLENBQTBCLE1BQTFCLEVBQWtDTCxTQUFPLFFBQXpDO0FBQ0FHLHFCQUFhRSxZQUFiLENBQTBCLE9BQTFCLEVBQW1DLE1BQW5DO0FBQ0FGLHFCQUFhRSxZQUFiLENBQTBCLFFBQTFCLEVBQW9DLE1BQXBDO0FBQ0FGLHFCQUFhRSxZQUFiLENBQTBCLE9BQTFCLEVBQW1DLFNBQW5DO0FBQ0FGLHFCQUFhRSxZQUFiLENBQTBCLE9BQTFCLEVBQW1DLFFBQW5DOztBQUVBLFlBQUdQLFlBQVluWCxPQUFaLEtBQXdCLDZCQUF4QixJQUF5RG1YLFlBQVlvQixtQkFBWixJQUFtQyxDQUEvRixFQUFrRztBQUM5RmYseUJBQWFFLFlBQWIsQ0FBMEIsU0FBMUIsRUFBcUMsNENBQXJDO0FBQ0FGLHlCQUFhZ0IsV0FBYixDQUF5QlQsS0FBekI7QUFDSCxTQUhELE1BR0s7QUFDRFAseUJBQWFFLFlBQWIsQ0FBMEIsTUFBMUIsRUFBa0NOLE9BQWxDO0FBQ0FJLHlCQUFhRSxZQUFiLENBQTBCLE1BQTFCLEVBQWtDLCtCQUFsQztBQUNIO0FBQ0QsWUFBR25RLE1BQUgsRUFBVTtBQUNOaVEseUJBQWFnQixXQUFiLENBQXlCdlUsSUFBekI7QUFDSDs7QUFFRHVULHFCQUFhZ0IsV0FBYixDQUF5QkYsS0FBekI7QUFDQWQscUJBQWFnQixXQUFiLENBQXlCSCxPQUF6QjtBQUNBYixxQkFBYWdCLFdBQWIsQ0FBeUJKLElBQXpCO0FBQ0FaLHFCQUFhZ0IsV0FBYixDQUF5Qk4sZUFBekI7QUFDQVYscUJBQWFnQixXQUFiLENBQXlCUCxpQkFBekI7QUFDQVQscUJBQWFnQixXQUFiLENBQXlCUixTQUF6QjtBQUNBOztBQUVBVCxtQkFBV0ksTUFBWCxDQUFrQkgsWUFBbEI7O0FBRUEsZUFBT0EsWUFBUDtBQUNILEtBcEZEOztBQXNGQTNiLFNBQUs2QyxXQUFMLEdBQW1CLFVBQUNGLFlBQUQsRUFBZ0JqQyxZQUFoQixFQUFrQztBQUNqRCxZQUFJaUMsaUJBQWlCSSx3QkFBckIsRUFBb0M7QUFDaEMsZ0JBQUc0WSxZQUFILEVBQWdCO0FBQ1ozYixxQkFBS3VPLEtBQUw7QUFDSDtBQUNELG1CQUFPd04saUJBQWlCcmIsYUFBYWdMLE1BQWIsRUFBakIsRUFBd0NoTCxhQUFhNkssaUJBQWIsRUFBeEMsRUFBMEU3SyxhQUFhOEssb0JBQWIsRUFBMUUsQ0FBUDtBQUNILFNBTEQsTUFLSztBQUNELGdCQUFHbVEsWUFBSCxFQUFnQjtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBT0EsWUFBUDtBQUNILGFBUEQsTUFPSztBQUNELHVCQUFPQyxnQkFBZ0JsYixhQUFhZ0wsTUFBYixFQUFoQixDQUFQO0FBQ0g7QUFDSjtBQUNKLEtBbEJEOztBQW9CQTFMLFNBQUs0YyxpQkFBTCxHQUF5QixZQUFNO0FBQzNCLFlBQUlDLGNBQWN6TSxTQUFTQyxhQUFULENBQXVCLEtBQXZCLENBQWxCO0FBQ0F3TSxvQkFBWWhCLFlBQVosQ0FBeUIsT0FBekIsRUFBa0MsU0FBbEM7QUFDQUgsbUJBQVdJLE1BQVgsQ0FBa0JlLFdBQWxCOztBQUVBLGVBQU9BLFdBQVA7QUFDSCxLQU5EOztBQVNBN2MsU0FBS3VPLEtBQUwsR0FBYSxZQUFLO0FBQ2RuTywwQkFBa0JGLEdBQWxCLENBQXNCLDhCQUF0QjtBQUNBd2IsbUJBQVdvQixXQUFYLENBQXVCbkIsWUFBdkI7QUFDQUEsdUJBQWUsSUFBZjtBQUNILEtBSkQ7O0FBTUEzYixTQUFLdUMsT0FBTCxHQUFlLFlBQUs7QUFDaEJtWixtQkFBV29CLFdBQVg7QUFDQXBCLHFCQUFhLElBQWI7QUFDQUMsdUJBQWUsSUFBZjtBQUNBSCxpQkFBUyxJQUFUO0FBQ0gsS0FMRDs7QUFPQSxXQUFPeGIsSUFBUDtBQUNILENBdEpELEMsQ0FaQTs7Ozs7cUJBb0tldVUsTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwS2Y7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7O0FBS0EsSUFBTUEsVUFBVSxTQUFWQSxPQUFVLENBQVMzUixRQUFULEVBQWtCO0FBQzlCLFFBQU01QyxPQUFPLEVBQWI7QUFDQSxRQUFJK2Msc0JBQXNCLEVBQTFCO0FBQ0EsUUFBSXBTLE9BQU87QUFDUDNKLGtCQUFXLEVBREo7QUFFUGdjLHNCQUFlO0FBRlIsS0FBWDtBQUlBLFFBQUlDLGlCQUFpQixrQ0FBckI7O0FBRUE3YyxzQkFBa0JGLEdBQWxCLENBQXNCLHlCQUF0Qjs7QUFFQSxRQUFNZ2QsbUJBQW1CLFNBQW5CQSxnQkFBbUIsQ0FBU0MsT0FBVCxFQUFpQjtBQUN0QyxZQUFJLENBQUNBLE9BQUQsSUFBWSxDQUFDQSxRQUFRNU0sSUFBVCxJQUFpQixFQUFFNE0sUUFBUUMsSUFBUixJQUFnQkQsUUFBUUUsV0FBeEIsSUFBdUNGLFFBQVFHLE1BQWpELENBQWpDLEVBQTJGO0FBQ3ZGO0FBQ0g7O0FBRUQsWUFBSXJPLFNBQVMsU0FBYyxFQUFkLEVBQWtCLEVBQUUsV0FBVyxLQUFiLEVBQWxCLEVBQXdDa08sT0FBeEMsQ0FBYjtBQUNBbE8sZUFBT3NCLElBQVAsR0FBYyxtQkFBSyxLQUFLdEIsT0FBT3NCLElBQWpCLENBQWQ7O0FBRUEsWUFBR3RCLE9BQU9tTyxJQUFQLElBQWVuTyxPQUFPb08sV0FBdEIsSUFBcUNwTyxPQUFPcU8sTUFBL0MsRUFBc0Q7QUFDbERyTyxtQkFBT3NCLElBQVAsR0FBY3RCLE9BQU9tTyxJQUFQLEdBQWMsR0FBZCxHQUFvQm5PLE9BQU9vTyxXQUEzQixHQUF5QyxVQUF6QyxHQUFzRHBPLE9BQU9xTyxNQUEzRTtBQUNBLG1CQUFPck8sT0FBT21PLElBQWQ7QUFDQSxtQkFBT25PLE9BQU9vTyxXQUFkO0FBQ0EsbUJBQU9wTyxPQUFPcU8sTUFBZDtBQUNIOztBQUVELFlBQU1DLGdCQUFnQix5QkFBdEI7O0FBRUEsWUFBSUEsY0FBY0MsSUFBZCxDQUFtQnZPLE9BQU91QixJQUExQixDQUFKLEVBQXFDO0FBQ2pDO0FBQ0F2QixtQkFBT3dCLFFBQVAsR0FBa0J4QixPQUFPdUIsSUFBekI7QUFDQXZCLG1CQUFPdUIsSUFBUCxHQUFjdkIsT0FBT3VCLElBQVAsQ0FBWWlOLE9BQVosQ0FBb0JGLGFBQXBCLEVBQW1DLElBQW5DLENBQWQ7QUFDSDs7QUFFRCxZQUFHLHVCQUFPdE8sT0FBT3NCLElBQWQsQ0FBSCxFQUF1QjtBQUNuQnRCLG1CQUFPdUIsSUFBUCxHQUFjLE1BQWQ7QUFDSCxTQUZELE1BRU0sSUFBRyx5QkFBU3ZCLE9BQU9zQixJQUFoQixDQUFILEVBQXlCO0FBQzNCdEIsbUJBQU91QixJQUFQLEdBQWMsUUFBZDtBQUNILFNBRkssTUFFQSxJQUFHLHVCQUFPdkIsT0FBT3NCLElBQWQsRUFBb0J0QixPQUFPdUIsSUFBM0IsQ0FBSCxFQUFvQztBQUN0Q3ZCLG1CQUFPdUIsSUFBUCxHQUFjLE1BQWQ7QUFDSCxTQUZLLE1BRUEsSUFBSSxDQUFDdkIsT0FBT3VCLElBQVosRUFBa0I7QUFDcEJ2QixtQkFBT3VCLElBQVAsR0FBYywrQkFBaUJ2QixPQUFPc0IsSUFBeEIsQ0FBZDtBQUNIOztBQUVELFlBQUksQ0FBQ3RCLE9BQU91QixJQUFaLEVBQWtCO0FBQ2Q7QUFDSDs7QUFFRDtBQUNBLGdCQUFRdkIsT0FBT3VCLElBQWY7QUFDSSxpQkFBSyxNQUFMO0FBQ0EsaUJBQUssbUJBQUw7QUFDSXZCLHVCQUFPdUIsSUFBUCxHQUFjLEtBQWQ7QUFDQTtBQUNKLGlCQUFLLEtBQUw7QUFDSXZCLHVCQUFPdUIsSUFBUCxHQUFjLEtBQWQ7QUFDQTtBQUNKLGlCQUFLLE1BQUw7QUFDSXZCLHVCQUFPdUIsSUFBUCxHQUFjLE1BQWQ7QUFDQTtBQUNKO0FBQ0k7QUFaUjs7QUFlQWxILGVBQU9DLElBQVAsQ0FBWTBGLE1BQVosRUFBb0J6RixPQUFwQixDQUE0QixVQUFTQyxHQUFULEVBQWM7QUFDdEMsZ0JBQUl3RixPQUFPeEYsR0FBUCxNQUFnQixFQUFwQixFQUF3QjtBQUNwQix1QkFBT3dGLE9BQU94RixHQUFQLENBQVA7QUFDSDtBQUNKLFNBSkQ7O0FBTUEsZUFBT3dGLE1BQVA7QUFFSCxLQTdERDs7QUErREFqUCxTQUFLb0UsWUFBTCxHQUFtQixVQUFDcEQsUUFBRCxFQUFhO0FBQzVCWiwwQkFBa0JGLEdBQWxCLENBQXNCLGdDQUF0QixFQUF3RGMsUUFBeEQ7QUFDQSxZQUFNMGMsbUJBQW1CLENBQUM5VCx3QkFBRVksT0FBRixDQUFVeEosUUFBVixJQUFzQkEsUUFBdEIsR0FBaUMsQ0FBQ0EsUUFBRCxDQUFsQyxFQUE4QytJLEdBQTlDLENBQWtELFVBQVNtSSxJQUFULEVBQWM7QUFDckYsZ0JBQUcsQ0FBQ3RJLHdCQUFFWSxPQUFGLENBQVUwSCxLQUFLc0QsTUFBZixDQUFKLEVBQTRCO0FBQ3hCLHVCQUFPdEQsS0FBS3NELE1BQVo7QUFDSDtBQUNELGdCQUFJeEQsZUFBZSxTQUFjLEVBQWQsRUFBaUI7QUFDaENwUSx5QkFBUyxFQUR1QjtBQUVoQzRULHdCQUFRLEVBRndCO0FBR2hDbUksdUJBQVE7QUFId0IsYUFBakIsRUFJaEJ6TCxJQUpnQixDQUFuQjs7QUFNQSxnQkFBSUYsYUFBYXBRLE9BQWIsS0FBeUIwSCxPQUFPMEksYUFBYXBRLE9BQXBCLENBQTFCLElBQTJELENBQUNnSSx3QkFBRVksT0FBRixDQUFVd0gsYUFBYXBRLE9BQXZCLENBQS9ELEVBQWdHO0FBQzVGb1EsNkJBQWFwUSxPQUFiLEdBQXVCLENBQUNzYixpQkFBaUJsTCxhQUFhcFEsT0FBOUIsQ0FBRCxDQUF2QjtBQUNIOztBQUVELGdCQUFJLENBQUNnSSx3QkFBRVksT0FBRixDQUFVd0gsYUFBYXBRLE9BQXZCLENBQUQsSUFBb0NvUSxhQUFhcFEsT0FBYixDQUFxQkcsTUFBckIsS0FBZ0MsQ0FBeEUsRUFBMkU7QUFDdkVpUSw2QkFBYXBRLE9BQWIsR0FBdUIsQ0FBQ3NiLGlCQUFpQmxMLFlBQWpCLENBQUQsQ0FBdkI7QUFDSDs7QUFFRCxnQkFBRyxDQUFDcEksd0JBQUVZLE9BQUYsQ0FBVXdILGFBQWFwUSxPQUF2QixDQUFELElBQW9Db1EsYUFBYXBRLE9BQWIsQ0FBcUJHLE1BQXJCLEtBQWdDLENBQXZFLEVBQTBFO0FBQ3RFLG9CQUFJbVEsS0FBSzBMLE1BQVQsRUFBaUI7QUFDYjVMLGlDQUFhcFEsT0FBYixHQUF1QnNRLEtBQUswTCxNQUE1QjtBQUNILGlCQUZELE1BRU87QUFDSDVMLGlDQUFhcFEsT0FBYixHQUF1QixDQUFDc2IsaUJBQWlCaEwsSUFBakIsQ0FBRCxDQUF2QjtBQUNIO0FBQ0o7O0FBR0QsaUJBQUksSUFBSXBRLElBQUksQ0FBWixFQUFlQSxJQUFJa1EsYUFBYXBRLE9BQWIsQ0FBcUJHLE1BQXhDLEVBQWdERCxHQUFoRCxFQUFxRDtBQUNqRCxvQkFBSW1OLFNBQVMrQyxhQUFhcFEsT0FBYixDQUFxQkUsQ0FBckIsQ0FBYjtBQUNBLG9CQUFJK2IsZUFBZSxFQUFuQjtBQUNBLG9CQUFJLENBQUM1TyxNQUFMLEVBQWE7QUFDVDtBQUNIOztBQUVELG9CQUFJNk8sZ0JBQWdCN08saUJBQXBCO0FBQ0Esb0JBQUk2TyxhQUFKLEVBQW1CO0FBQ2Y3Tyx3Q0FBa0I2TyxjQUFjQyxRQUFkLE9BQTZCLE1BQS9DO0FBQ0gsaUJBRkQsTUFFTztBQUNIOU8sd0NBQWlCLEtBQWpCO0FBQ0g7O0FBRUQ7QUFDQSxvQkFBSSxDQUFDK0MsYUFBYXBRLE9BQWIsQ0FBcUJFLENBQXJCLEVBQXdCa1QsS0FBN0IsRUFBb0M7QUFDaENoRCxpQ0FBYXBRLE9BQWIsQ0FBcUJFLENBQXJCLEVBQXdCa1QsS0FBeEIsR0FBZ0NoRCxhQUFhcFEsT0FBYixDQUFxQkUsQ0FBckIsRUFBd0IwTyxJQUF4QixHQUE2QixHQUE3QixHQUFpQzFPLEVBQUVpYyxRQUFGLEVBQWpFO0FBQ0g7O0FBRURGLCtCQUFlWCxpQkFBaUJsTCxhQUFhcFEsT0FBYixDQUFxQkUsQ0FBckIsQ0FBakIsQ0FBZjtBQUNBLG9CQUFHbWIsZUFBZXBMLHdCQUFmLENBQXdDZ00sWUFBeEMsQ0FBSCxFQUF5RDtBQUNyRDdMLGlDQUFhcFEsT0FBYixDQUFxQkUsQ0FBckIsSUFBMEIrYixZQUExQjtBQUNILGlCQUZELE1BRUs7QUFDRDdMLGlDQUFhcFEsT0FBYixDQUFxQkUsQ0FBckIsSUFBMEIsSUFBMUI7QUFDSDtBQUNKOztBQUVEa1EseUJBQWFwUSxPQUFiLEdBQXVCb1EsYUFBYXBRLE9BQWIsQ0FBcUIrSCxNQUFyQixDQUE0QjtBQUFBLHVCQUFVLENBQUMsQ0FBQ3NGLE1BQVo7QUFBQSxhQUE1QixDQUF2Qjs7QUFFQSxnQkFBRyxDQUFDK0MsYUFBYTJMLEtBQWQsSUFBd0IzTCxhQUFhcFEsT0FBYixDQUFxQixDQUFyQixDQUF4QixJQUFtRG9RLGFBQWFwUSxPQUFiLENBQXFCLENBQXJCLEVBQXdCb1QsS0FBOUUsRUFBb0Y7QUFDaEZoRCw2QkFBYTJMLEtBQWIsR0FBcUIzTCxhQUFhcFEsT0FBYixDQUFxQixDQUFyQixFQUF3Qm9ULEtBQTdDO0FBQ0g7O0FBRUQ7QUFDQTs7Ozs7Ozs7O0FBV0EsZ0JBQUcsQ0FBQ3BMLHdCQUFFWSxPQUFGLENBQVV3SCxhQUFhd0QsTUFBdkIsQ0FBSixFQUFtQztBQUMvQnhELDZCQUFhd0QsTUFBYixHQUFzQixFQUF0QjtBQUNIO0FBQ0QsZ0JBQUc1TCx3QkFBRVksT0FBRixDQUFVd0gsYUFBYThFLFFBQXZCLENBQUgsRUFBb0M7QUFDaEM5RSw2QkFBYXdELE1BQWIsR0FBc0J4RCxhQUFhd0QsTUFBYixDQUFvQndJLE1BQXBCLENBQTJCaE0sYUFBYThFLFFBQXhDLENBQXRCO0FBQ0EsdUJBQU85RSxhQUFhOEUsUUFBcEI7QUFDSDs7QUFFRDlFLHlCQUFhd0QsTUFBYixHQUFzQnhELGFBQWF3RCxNQUFiLENBQW9CekwsR0FBcEIsQ0FBd0IsVUFBU2hELEtBQVQsRUFBZTtBQUN6RCxvQkFBRyxDQUFDQSxLQUFELElBQVUsQ0FBQ0EsTUFBTXdKLElBQXBCLEVBQXlCO0FBQ3JCLDJCQUFPLEtBQVA7QUFDSDtBQUNELHVCQUFPLFNBQWMsRUFBZCxFQUFrQjtBQUNyQiw0QkFBUSxVQURhO0FBRXJCLCtCQUFXO0FBRlUsaUJBQWxCLEVBR0p4SixLQUhJLENBQVA7QUFJSCxhQVJxQixFQVFuQjRDLE1BUm1CLENBUVo7QUFBQSx1QkFBUyxDQUFDLENBQUM1QyxLQUFYO0FBQUEsYUFSWSxDQUF0Qjs7QUFVQSxtQkFBT2lMLFlBQVA7QUFDSCxTQTNGd0IsRUEyRnRCckksTUEzRnNCLENBMkZmLFVBQVN1SSxJQUFULEVBQWM7QUFBQyxtQkFBT0EsS0FBS3RRLE9BQUwsSUFBZ0JzUSxLQUFLdFEsT0FBTCxDQUFhRyxNQUFiLEdBQXNCLENBQTdDO0FBQWdELFNBM0ZoRCxLQTJGbUQsRUEzRjVFO0FBNEZBNEksYUFBSzNKLFFBQUwsR0FBZ0IwYyxnQkFBaEI7QUFDQSxlQUFPQSxnQkFBUDtBQUNILEtBaEdEO0FBaUdBMWQsU0FBS2lCLFdBQUwsR0FBbUIsWUFBTTtBQUNyQmIsMEJBQWtCRixHQUFsQixDQUFzQixnQ0FBdEIsRUFBd0R5SyxLQUFLM0osUUFBN0Q7QUFDQSxlQUFPMkosS0FBSzNKLFFBQVo7QUFDSCxLQUhEO0FBSUFoQixTQUFLa0Msa0JBQUwsR0FBMEIsWUFBTTtBQUM1QixZQUFHeUksS0FBSzNKLFFBQUwsQ0FBYzJKLEtBQUtxUyxZQUFuQixDQUFILEVBQW9DO0FBQ2hDLG1CQUFPclMsS0FBSzNKLFFBQUwsQ0FBYzJKLEtBQUtxUyxZQUFuQixDQUFQO0FBQ0gsU0FGRCxNQUVLO0FBQ0QsbUJBQU8sRUFBUDtBQUNIO0FBQ0osS0FORDtBQU9BaGQsU0FBS3dDLHVCQUFMLEdBQStCLFlBQU07QUFDakMsZUFBT21JLEtBQUtxUyxZQUFaO0FBQ0gsS0FGRDtBQUdBaGQsU0FBS29CLGtCQUFMLEdBQTBCLFVBQUNOLEtBQUQsRUFBVztBQUNqQyxZQUFHNkosS0FBSzNKLFFBQUwsQ0FBY0YsS0FBZCxDQUFILEVBQXdCO0FBQ3BCNkosaUJBQUtxUyxZQUFMLEdBQW9CbGMsS0FBcEI7QUFDQThCLHFCQUFTcEIsT0FBVCxDQUFpQitXLDJCQUFqQixFQUFtQzVOLEtBQUtxUyxZQUF4QztBQUNIO0FBQ0QsZUFBT3JTLEtBQUtxUyxZQUFaO0FBQ0gsS0FORDtBQU9BaGQsU0FBSzBDLGlCQUFMLEdBQXlCLFlBQU07QUFDM0IsWUFBR2lJLEtBQUszSixRQUFMLENBQWMySixLQUFLcVMsWUFBbkIsQ0FBSCxFQUFvQztBQUNoQzVjLDhCQUFrQkYsR0FBbEIsQ0FBc0Isc0NBQXRCLEVBQThEeUssS0FBSzNKLFFBQUwsQ0FBYzJKLEtBQUtxUyxZQUFuQixFQUFpQ3BiLE9BQS9GO0FBQ0EsbUJBQU8rSSxLQUFLM0osUUFBTCxDQUFjMkosS0FBS3FTLFlBQW5CLEVBQWlDcGIsT0FBeEM7QUFDSCxTQUhELE1BR0s7QUFDRCxtQkFBTyxJQUFQO0FBQ0g7QUFFSixLQVJEO0FBU0E1QixTQUFLOEMsZUFBTCxHQUF1QixZQUFNO0FBQ3pCLFlBQUc2SCxLQUFLM0osUUFBTCxDQUFjMkosS0FBS3FTLFlBQW5CLENBQUgsRUFBb0M7QUFDaEMsbUJBQU9yUyxLQUFLM0osUUFBTCxDQUFjMkosS0FBS3FTLFlBQW5CLEVBQWlDaUIsUUFBakMsSUFBNkMsRUFBcEQ7QUFDSDtBQUNKLEtBSkQ7O0FBTUEsV0FBT2plLElBQVA7QUFDSCxDQWhORDs7cUJBbU5ldVUsTzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOU5mOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFLQTs7OztBQUlBLElBQU0ySixhQUFhLFNBQWJBLFVBQWEsR0FBVTtBQUN6QixRQUFJQyxpQkFBaUIsa0NBQXJCO0FBQ0EsUUFBTS9iLFlBQVksRUFBbEI7O0FBRUEsUUFBTXBDLE9BQU8sRUFBYjtBQUNBSSxzQkFBa0JGLEdBQWxCLENBQXNCLDRCQUF0Qjs7QUFFQSxRQUFNa2Usa0JBQWtCLFNBQWxCQSxlQUFrQixDQUFDbmIsSUFBRCxFQUFPTCxRQUFQLEVBQW1CO0FBQ3ZDLFlBQUdSLFVBQVVhLElBQVYsQ0FBSCxFQUFtQjtBQUNmO0FBQ0g7QUFDRDdDLDBCQUFrQkYsR0FBbEIsQ0FBc0IseUNBQXRCLEVBQWlFK0MsSUFBakU7QUFDQWIsa0JBQVVhLElBQVYsSUFBa0JMLFFBQWxCO0FBQ0gsS0FORDs7QUFRQSxRQUFNeWIsaUJBQWdCO0FBQ2xCQyxlQUFPLGlCQUFXO0FBQ2QsbUJBQU9uSyx5WUFBdUQsVUFBU0EsT0FBVCxFQUFrQjtBQUN4RSxvQkFBTXZSLFdBQVd1UixtQkFBT0EsQ0FBQywwRkFBUixZQUFqQjtBQUNBaUssZ0NBQWdCckcseUJBQWhCLEVBQWdDblYsUUFBaEM7QUFDSix1QkFBTyxFQUFDSyxNQUFPOFUseUJBQVIsRUFBd0JuVixVQUFXQSxRQUFuQyxFQUFQO0FBQ0MsYUFKRSx5Q0FJQSxVQUFTd1IsR0FBVCxFQUFhO0FBQ1osc0JBQU0sSUFBSW1LLEtBQUosQ0FBVSxlQUFWLENBQU47QUFDSCxhQU5FLENBQVA7QUFRSCxTQVZpQjtBQVdsQkMsZ0JBQVMsa0JBQVU7QUFDZixtQkFBT3JLLDJaQUF3RCxVQUFTQSxPQUFULEVBQWtCO0FBQ3pFLG9CQUFNdlIsV0FBV3VSLG1CQUFPQSxDQUFDLDRGQUFSLFlBQWpCO0FBQ0FpSyxnQ0FBZ0JwRywwQkFBaEIsRUFBaUNwVixRQUFqQztBQUNKLHVCQUFPLEVBQUNLLE1BQU8rVSwwQkFBUixFQUF5QnBWLFVBQVdBLFFBQXBDLEVBQVA7QUFDQyxhQUpFLHlDQUlBLFVBQVN3UixHQUFULEVBQWE7QUFDWixzQkFBTSxJQUFJbUssS0FBSixDQUFVLGVBQVYsQ0FBTjtBQUNILGFBTkUsQ0FBUDtBQVFILFNBcEJpQjtBQXFCbEJFLGNBQU8sZ0JBQVU7QUFDYixtQkFBT3RLLHVaQUFzRCxVQUFTQSxPQUFULEVBQWtCO0FBQ3ZFLG9CQUFNdlIsV0FBV3VSLG1CQUFPQSxDQUFDLHdGQUFSLFlBQWpCO0FBQ0FpSyxnQ0FBZ0JuRyx3QkFBaEIsRUFBK0JyVixRQUEvQjtBQUNKLHVCQUFPLEVBQUNLLE1BQU9nVix3QkFBUixFQUF1QnJWLFVBQVdBLFFBQWxDLEVBQVA7QUFDQyxhQUpFLHlDQUlBLFVBQVN3UixHQUFULEVBQWE7QUFDWixzQkFBTSxJQUFJbUssS0FBSixDQUFVLGVBQVYsQ0FBTjtBQUNILGFBTkUsQ0FBUDtBQVFILFNBOUJpQjtBQStCbEJyTyxhQUFNLGVBQVU7QUFDWixtQkFBT2lFLHFaQUFxRCxVQUFTQSxPQUFULEVBQWtCO0FBQ3RFLG9CQUFNdlIsV0FBV3VSLG1CQUFPQSxDQUFDLHNGQUFSLFlBQWpCO0FBQ0FpSyxnQ0FBZ0JoWSx1QkFBaEIsRUFBOEJ4RCxRQUE5QjtBQUNKLHVCQUFPLEVBQUNLLE1BQU9tRCx1QkFBUixFQUFzQnhELFVBQVdBLFFBQWpDLEVBQVA7QUFDQyxhQUpFLHlDQUlBLFVBQVN3UixHQUFULEVBQWE7QUFDWixzQkFBTSxJQUFJbUssS0FBSixDQUFVLGVBQVYsQ0FBTjtBQUNILGFBTkUsQ0FBUDtBQVFILFNBeENpQjtBQXlDbEJHLGNBQU8sZ0JBQVU7QUFDYixtQkFBT3ZLLCtRQUFzRCxVQUFTQSxPQUFULEVBQWtCO0FBQ3ZFLG9CQUFNdlIsV0FBV3VSLG1CQUFPQSxDQUFDLHdGQUFSLFlBQWpCO0FBQ0FpSyxnQ0FBZ0JyYix3QkFBaEIsRUFBK0JILFFBQS9CO0FBQ0EsdUJBQU8sRUFBQ0ssTUFBT0Ysd0JBQVIsRUFBdUJILFVBQVdBLFFBQWxDLEVBQVA7QUFDSCxhQUpFLHlDQUlBLFVBQVN3UixHQUFULEVBQWE7QUFDWixzQkFBTSxJQUFJbUssS0FBSixDQUFVLGVBQVYsQ0FBTjtBQUNILGFBTkUsQ0FBUDtBQVFIO0FBbERpQixLQUF0Qjs7QUFzREF2ZSxTQUFLaUMsYUFBTCxHQUFxQixVQUFDK1AsWUFBRCxFQUFpQjtBQUNsQyxZQUFNMk0seUJBQXlCUixlQUFlcE0sMkJBQWYsQ0FBMkNDLFlBQTNDLENBQS9CO0FBQ0E1UiwwQkFBa0JGLEdBQWxCLENBQXNCLHFDQUF0QixFQUE2RHllLHNCQUE3RDtBQUNBLFlBQUcsQ0FBQ0Esc0JBQUosRUFBMkI7QUFDdkIsbUJBQU9DLFFBQVFDLE1BQVIsQ0FBZXhjLGtCQUFPQywrQkFBUCxDQUFmLENBQVA7QUFDSCxTQUZELE1BRUs7QUFDRCxtQkFBT3NjLFFBQVFoUyxHQUFSLENBQ0grUix1QkFBdUJoVixNQUF2QixDQUE4QixVQUFTaEgsWUFBVCxFQUFzQjtBQUNoRCx1QkFBTyxDQUFDLENBQUMwYixlQUFlMWIsWUFBZixDQUFUO0FBQ0gsYUFGRCxFQUVHb0gsR0FGSCxDQUVPLFVBQVNwSCxZQUFULEVBQXNCO0FBQ3pCLHVCQUFPMGIsZUFBZTFiLFlBQWYsR0FBUDtBQUNILGFBSkQsQ0FERyxDQUFQO0FBT0g7QUFFSixLQWZEOztBQWlCQTNDLFNBQUs4ZSxVQUFMLEdBQWtCLFVBQUM3YixJQUFELEVBQVU7QUFDeEI3QywwQkFBa0JGLEdBQWxCLENBQXNCLGtDQUF0QixFQUEwRCtDLElBQTFEO0FBQ0EsZUFBT2IsVUFBVWEsSUFBVixDQUFQO0FBQ0gsS0FIRDs7QUFLQWpELFNBQUsrZSxtQkFBTCxHQUEyQixVQUFDOVAsTUFBRCxFQUFZO0FBQ25DLFlBQU0rUCx3QkFBd0JiLGVBQWV0TSx3QkFBZixDQUF3QzVDLE1BQXhDLENBQTlCO0FBQ0E3TywwQkFBa0JGLEdBQWxCLENBQXNCLDJDQUF0QixFQUFtRThlLHFCQUFuRTtBQUNBLGVBQU9oZixLQUFLOGUsVUFBTCxDQUFnQkUscUJBQWhCLENBQVA7QUFDSCxLQUpEOztBQU1BaGYsU0FBS2tHLGNBQUwsR0FBc0IsVUFBQ0YsYUFBRCxFQUFnQkMsU0FBaEIsRUFBOEI7QUFDaEQ3RiwwQkFBa0JGLEdBQWxCLENBQXNCLHNDQUF0QixFQUE4RGllLGVBQWV0TSx3QkFBZixDQUF3QzdMLGFBQXhDLENBQTlELEVBQXVIbVksZUFBZXRNLHdCQUFmLENBQXdDNUwsU0FBeEMsQ0FBdkg7QUFDQSxlQUFPa1ksZUFBZXRNLHdCQUFmLENBQXdDN0wsYUFBeEMsTUFBMkRtWSxlQUFldE0sd0JBQWYsQ0FBd0M1TCxTQUF4QyxDQUFsRTtBQUNILEtBSEQ7O0FBS0EsV0FBT2pHLElBQVA7QUFDSCxDQXZHRDs7cUJBeUdla2UsVTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BIZjs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUdBZSxxQkFBdUJBLEdBQUcsNEJBQWMsbUJBQWQsQ0FBMUI7O0FBRUE7OztBQUdBLElBQU0zWCxnQkFBZ0JvSixPQUFPcEosYUFBUCxHQUF1QixFQUE3Qzs7QUFFQSxJQUFNNFgsYUFBYTVYLGNBQWM0WCxVQUFkLEdBQTJCLEVBQTlDOztBQUVPLElBQU1DLG9FQUE4QixTQUE5QkEsMkJBQThCLENBQVNwZixTQUFULEVBQW9CO0FBQzNELFFBQUksQ0FBQ0EsU0FBTCxFQUFnQjs7QUFFWjtBQUNBLGVBQU8sSUFBUDtBQUNIOztBQUVELFFBQUlxZixtQkFBbUIsSUFBdkI7O0FBRUEsUUFBSSxPQUFPcmYsU0FBUCxLQUFxQixRQUF6QixFQUFtQzs7QUFFL0JxZiwyQkFBbUJoUCxTQUFTaVAsY0FBVCxDQUF3QnRmLFNBQXhCLENBQW5CO0FBQ0gsS0FIRCxNQUdPLElBQUlBLFVBQVV1ZixRQUFkLEVBQXdCOztBQUUzQkYsMkJBQW1CcmYsU0FBbkI7QUFDSCxLQUhNLE1BR0E7QUFDSDtBQUNBLGVBQU8sSUFBUDtBQUNIOztBQUVELFdBQU9xZixnQkFBUDtBQUNILENBckJNOztBQXVCUDs7Ozs7O0FBTUE5WCxjQUFjaVksTUFBZCxHQUF1QixVQUFTeGYsU0FBVCxFQUFvQmtFLE9BQXBCLEVBQTZCOztBQUVoRCxRQUFJbWIsbUJBQW1CRCw0QkFBNEJwZixTQUE1QixDQUF2Qjs7QUFFQSxRQUFNeWYsaUJBQWlCLHNCQUFJSixnQkFBSixDQUF2QjtBQUNBSSxtQkFBZXhiLElBQWYsQ0FBb0JDLE9BQXBCOztBQUVBaWIsZUFBVy9VLElBQVgsQ0FBZ0JxVixjQUFoQjs7QUFFQSxXQUFPQSxjQUFQO0FBQ0gsQ0FWRDs7QUFZQTs7Ozs7QUFLQWxZLGNBQWNHLGFBQWQsR0FBOEIsWUFBVzs7QUFFckMsV0FBT3lYLFVBQVA7QUFDSCxDQUhEOztBQUtBOzs7Ozs7QUFNQTVYLGNBQWNtWSxzQkFBZCxHQUF1QyxVQUFTQyxXQUFULEVBQXNCOztBQUV6RCxTQUFLLElBQUk1ZCxJQUFJLENBQWIsRUFBZ0JBLElBQUlvZCxXQUFXbmQsTUFBL0IsRUFBdUNELEdBQXZDLEVBQTZDOztBQUV6QyxZQUFJb2QsV0FBV3BkLENBQVgsRUFBYzBGLGNBQWQsT0FBbUNrWSxXQUF2QyxFQUFvRDs7QUFFaEQsbUJBQU9SLFdBQVdwZCxDQUFYLENBQVA7QUFDSDtBQUNKOztBQUVELFdBQU8sSUFBUDtBQUNILENBWEQ7O0FBYUE7Ozs7OztBQU1Bd0YsY0FBY3FZLGdCQUFkLEdBQWlDLFVBQVM3ZSxLQUFULEVBQWdCOztBQUU3QyxRQUFNMGUsaUJBQWlCTixXQUFXcGUsS0FBWCxDQUF2Qjs7QUFFQSxRQUFJMGUsY0FBSixFQUFvQjs7QUFFaEIsZUFBT0EsY0FBUDtBQUNILEtBSEQsTUFHTzs7QUFFSCxlQUFPLElBQVA7QUFDSDtBQUNKLENBWEQ7O0FBYUE7Ozs7OztBQU1BbFksY0FBY0MsWUFBZCxHQUE2QixVQUFTcVksUUFBVCxFQUFtQjtBQUM1QyxTQUFLLElBQUk5ZCxJQUFJLENBQWIsRUFBZ0JBLElBQUlvZCxXQUFXbmQsTUFBL0IsRUFBdUNELEdBQXZDLEVBQTZDOztBQUV6QyxZQUFJb2QsV0FBV3BkLENBQVgsRUFBYzBGLGNBQWQsT0FBbUNvWSxRQUF2QyxFQUFpRDs7QUFFN0NWLHVCQUFXdFEsTUFBWCxDQUFrQjlNLENBQWxCLEVBQXFCLENBQXJCO0FBQ0g7QUFDSjtBQUVKLENBVEQ7O0FBV0E7Ozs7OztBQU1Bd0YsY0FBY3VZLGtCQUFkLEdBQW1DLFVBQVNqZSxPQUFULEVBQWtCO0FBQ2pELFdBQU8sQ0FBQ2dJLHdCQUFFWSxPQUFGLENBQVU1SSxPQUFWLElBQXFCQSxPQUFyQixHQUErQixDQUFDQSxPQUFELENBQWhDLEVBQTJDbUksR0FBM0MsQ0FBK0MsVUFBU2tGLE1BQVQsRUFBaUJuTyxLQUFqQixFQUF1QjtBQUN6RSxZQUFHbU8sT0FBT21PLElBQVAsSUFBZSx5QkFBU25PLE9BQU9tTyxJQUFoQixDQUFmLElBQXdDbk8sT0FBT29PLFdBQS9DLElBQThEcE8sT0FBT3FPLE1BQXhFLEVBQStFO0FBQzNFLG1CQUFPLEVBQUMvTSxNQUFPdEIsT0FBT21PLElBQVAsR0FBYyxHQUFkLEdBQW9Cbk8sT0FBT29PLFdBQTNCLEdBQXlDLEdBQXpDLEdBQStDcE8sT0FBT3FPLE1BQTlELEVBQXNFOU0sTUFBTyxRQUE3RSxFQUF1RndFLE9BQVEvRixPQUFPK0YsS0FBUCxHQUFlL0YsT0FBTytGLEtBQXRCLEdBQThCLGFBQVdsVSxRQUFNLENBQWpCLENBQTdILEVBQVA7QUFDSDtBQUNKLEtBSk0sQ0FBUDtBQUtILENBTkQ7O0FBUUE7Ozs7OztBQU1Bd0csY0FBY3dZLEtBQWQsR0FBc0IsVUFBU0MsV0FBVCxFQUFzQjtBQUN4QyxRQUFHQSxXQUFILEVBQWU7QUFDWHJQLGVBQU90USxpQkFBUCxHQUEyQixFQUFDRixLQUFNd1EsT0FBTyxTQUFQLEVBQWtCLEtBQWxCLENBQVAsRUFBM0I7QUFDSCxLQUZELE1BRUs7QUFDREEsZUFBT3RRLGlCQUFQLEdBQTJCLEVBQUNGLEtBQU8sZUFBVSxDQUFFLENBQXBCLEVBQTNCO0FBQ0g7QUFDRCxXQUFPNmYsV0FBUDtBQUNILENBUEQ7O3FCQVNlelksYTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2SmY7Ozs7QUFJTyxJQUFNMFksa0RBQXFCLFNBQXJCQSxrQkFBcUIsR0FBVTtBQUN4QyxRQUFJQyxNQUFNdlAsT0FBT2dCLFNBQWpCO0FBQUEsUUFDSXdPLDhCQUE4QixDQUFDLFVBQUQsRUFBYSxpQkFBYixFQUFnQyxnQkFBaEMsRUFBa0QsY0FBbEQsQ0FEbEM7QUFBQSxRQUVJcGUsVUFGSjtBQUFBLFFBR0k4USxpQkFISjs7QUFLQTtBQUNBLFFBQUk5RSxNQUFNdEQsT0FBTixDQUFjeVYsSUFBSUUsU0FBbEIsQ0FBSixFQUFrQztBQUM5QixhQUFLcmUsSUFBSSxDQUFULEVBQVlBLElBQUltZSxJQUFJRSxTQUFKLENBQWNwZSxNQUE5QixFQUFzQ0QsR0FBdEMsRUFBMkM7QUFDdkM4USx1QkFBV3FOLElBQUlFLFNBQUosQ0FBY3JlLENBQWQsQ0FBWDtBQUNBLGdCQUFJOFEsWUFBWUEsU0FBUzdRLE1BQXpCLEVBQWlDO0FBQzdCLHVCQUFPNlEsUUFBUDtBQUNIO0FBQ0o7QUFDSjs7QUFFRDtBQUNBLFNBQUs5USxJQUFJLENBQVQsRUFBWUEsSUFBSW9lLDRCQUE0Qm5lLE1BQTVDLEVBQW9ERCxHQUFwRCxFQUF5RDtBQUNyRDhRLG1CQUFXcU4sSUFBSUMsNEJBQTRCcGUsQ0FBNUIsQ0FBSixDQUFYO0FBQ0EsWUFBSThRLFlBQVlBLFNBQVM3USxNQUF6QixFQUFpQztBQUM3QixtQkFBTzZRLFFBQVA7QUFDSDtBQUNKOztBQUVELFdBQU8sSUFBUDtBQUNILENBekJNO0FBMEJBLElBQU13Tix3Q0FBZ0IsU0FBaEJBLGFBQWdCLEdBQVU7QUFDbkMsUUFBSUMsVUFBVSxHQUFkOztBQUVBO0FBQ0EsUUFBSUMsYUFBYSxFQUFqQjtBQUNBLFFBQUlDLE9BQU9DLEtBQVgsRUFBa0I7QUFDZCxZQUFJQSxRQUFTRCxPQUFPQyxLQUFSLEdBQWlCRCxPQUFPQyxLQUF4QixHQUFnQyxFQUE1QztBQUNBLFlBQUlDLFNBQVVGLE9BQU9FLE1BQVIsR0FBa0JGLE9BQU9FLE1BQXpCLEdBQWtDLEVBQS9DO0FBQ0FILHNCQUFjLEtBQUtFLEtBQUwsR0FBYSxLQUFiLEdBQXFCQyxNQUFuQztBQUNIOztBQUVEO0FBQ0EsUUFBSUMsT0FBT2hQLFVBQVVpUCxVQUFyQjtBQUNBLFFBQUlDLE9BQU9sUCxVQUFVbVAsU0FBckI7QUFDQSxRQUFJMWMsVUFBVXVOLFVBQVVvUCxPQUF4QjtBQUNBLFFBQUkzZ0IsVUFBVSxLQUFLaUosV0FBV3NJLFVBQVVpUCxVQUFyQixDQUFuQjtBQUNBLFFBQUlJLGVBQWVDLFNBQVN0UCxVQUFVaVAsVUFBbkIsRUFBK0IsRUFBL0IsQ0FBbkI7QUFDQSxRQUFJTSxZQUFZLEtBQWhCO0FBQ0EsUUFBSUMsbUJBQUo7QUFBQSxRQUFnQkMsa0JBQWhCO0FBQUEsUUFBMkJDLFdBQTNCOztBQUVBO0FBQ0EsUUFBSSxDQUFDRCxZQUFZUCxLQUFLMVcsT0FBTCxDQUFhLE9BQWIsQ0FBYixLQUF1QyxDQUFDLENBQTVDLEVBQStDO0FBQzNDL0Ysa0JBQVUsT0FBVjtBQUNBaEUsa0JBQVV5Z0IsS0FBS1MsU0FBTCxDQUFlRixZQUFZLENBQTNCLENBQVY7QUFDQSxZQUFJLENBQUNBLFlBQVlQLEtBQUsxVyxPQUFMLENBQWEsU0FBYixDQUFiLEtBQXlDLENBQUMsQ0FBOUMsRUFBaUQ7QUFDN0MvSixzQkFBVXlnQixLQUFLUyxTQUFMLENBQWVGLFlBQVksQ0FBM0IsQ0FBVjtBQUNIO0FBQ0o7QUFDRDtBQUNBLFFBQUksQ0FBQ0EsWUFBWVAsS0FBSzFXLE9BQUwsQ0FBYSxLQUFiLENBQWIsS0FBcUMsQ0FBQyxDQUExQyxFQUE2QztBQUN6Qy9GLGtCQUFVLE9BQVY7QUFDQWhFLGtCQUFVeWdCLEtBQUtTLFNBQUwsQ0FBZUYsWUFBWSxDQUEzQixDQUFWO0FBQ0g7QUFDRDtBQUpBLFNBS0ssSUFBSSxDQUFDQSxZQUFZUCxLQUFLMVcsT0FBTCxDQUFhLGdCQUFiLENBQWIsS0FBZ0QsQ0FBQyxDQUFyRCxFQUF3RDtBQUN6RC9GLHNCQUFVLGdCQUFWO0FBQ0FoRSxzQkFBVXlnQixLQUFLUyxTQUFMLENBQWVGLFlBQVksRUFBM0IsQ0FBVjtBQUNIO0FBQ0Q7QUFKSyxhQUtBLElBQUksQ0FBQ0EsWUFBWVAsS0FBSzFXLE9BQUwsQ0FBYSxNQUFiLENBQWIsS0FBc0MsQ0FBQyxDQUEzQyxFQUE4QztBQUMvQy9GLDBCQUFVLGdCQUFWO0FBQ0FoRSwwQkFBVXlnQixLQUFLUyxTQUFMLENBQWVGLFlBQVksQ0FBM0IsQ0FBVjtBQUNIO0FBQ0Q7QUFKSyxpQkFLQSxJQUFJLENBQUNBLFlBQVlQLEtBQUsxVyxPQUFMLENBQWEsTUFBYixDQUFiLEtBQXNDLENBQUMsQ0FBM0MsRUFBOEM7QUFDL0MvRiw4QkFBVSw2QkFBVjtBQUNBaEUsOEJBQVV5Z0IsS0FBS1MsU0FBTCxDQUFlRixZQUFZLENBQTNCLENBQVY7O0FBR0E7QUFDQSx3QkFBS1AsS0FBSzFXLE9BQUwsQ0FBYSxVQUFiLE1BQTZCLENBQUMsQ0FBL0IsSUFBc0MwVyxLQUFLMVcsT0FBTCxDQUFhLEtBQWIsTUFBd0IsQ0FBQyxDQUFuRSxFQUF3RTtBQUNwRS9KLGtDQUFVeWdCLEtBQUtTLFNBQUwsQ0FBZVQsS0FBSzFXLE9BQUwsQ0FBYSxLQUFiLElBQXNCLENBQXJDLENBQVY7QUFDSDtBQUNKO0FBQ0Q7QUFWSyxxQkFXQSxJQUFJLENBQUNpWCxZQUFZUCxLQUFLMVcsT0FBTCxDQUFhLFFBQWIsQ0FBYixLQUF3QyxDQUFDLENBQTdDLEVBQWdEO0FBQ2pEL0Ysa0NBQVUsUUFBVjtBQUNBaEUsa0NBQVV5Z0IsS0FBS1MsU0FBTCxDQUFlRixZQUFZLENBQTNCLENBQVY7QUFDSCxxQkFISSxNQUlBLElBQUksQ0FBQ0EsWUFBWVAsS0FBSzFXLE9BQUwsQ0FBYSxPQUFiLENBQWIsS0FBdUMsQ0FBQyxDQUE1QyxFQUErQztBQUFJO0FBQ3BEL0Ysa0NBQVUsUUFBVjtBQUNBaEUsa0NBQVV5Z0IsS0FBS1MsU0FBTCxDQUFlRixZQUFZLENBQTNCLENBQVY7QUFDSDtBQUNEO0FBSksseUJBS0EsSUFBSSxDQUFDQSxZQUFZUCxLQUFLMVcsT0FBTCxDQUFhLFNBQWIsQ0FBYixLQUF5QyxDQUFDLENBQTlDLEVBQWlEO0FBQ2xEL0Ysc0NBQVUsU0FBVjtBQUNBaEUsc0NBQVV5Z0IsS0FBS1MsU0FBTCxDQUFlRixZQUFZLENBQTNCLENBQVY7QUFDSCx5QkFISSxNQUlBLElBQUksQ0FBQ0EsWUFBWVAsS0FBSzFXLE9BQUwsQ0FBYSxPQUFiLENBQWIsS0FBdUMsQ0FBQyxDQUE1QyxFQUErQztBQUNoRC9GLHNDQUFVLFNBQVY7QUFDQWhFLHNDQUFVeWdCLEtBQUtTLFNBQUwsQ0FBZUYsWUFBWSxDQUEzQixDQUFWO0FBQ0g7QUFDRDtBQUpLLDZCQUtBLElBQUksQ0FBQ0EsWUFBWVAsS0FBSzFXLE9BQUwsQ0FBYSxRQUFiLENBQWIsS0FBd0MsQ0FBQyxDQUE3QyxFQUFnRDtBQUNqRC9GLDBDQUFVLFFBQVY7QUFDQWhFLDBDQUFVeWdCLEtBQUtTLFNBQUwsQ0FBZUYsWUFBWSxDQUEzQixDQUFWO0FBQ0Esb0NBQUksQ0FBQ0EsWUFBWVAsS0FBSzFXLE9BQUwsQ0FBYSxTQUFiLENBQWIsS0FBeUMsQ0FBQyxDQUE5QyxFQUFpRDtBQUM3Qy9KLDhDQUFVeWdCLEtBQUtTLFNBQUwsQ0FBZUYsWUFBWSxDQUEzQixDQUFWO0FBQ0g7QUFDSjs7QUFHRDtBQVRLLGlDQVVBLElBQUlQLEtBQUsxVyxPQUFMLENBQWEsVUFBYixNQUE2QixDQUFDLENBQWxDLEVBQXFDO0FBQ3RDL0YsOENBQVUsNkJBQVY7QUFDQWhFLDhDQUFVeWdCLEtBQUtTLFNBQUwsQ0FBZVQsS0FBSzFXLE9BQUwsQ0FBYSxLQUFiLElBQXNCLENBQXJDLENBQVY7QUFDSDtBQUNEO0FBSksscUNBS0EsSUFBSSxDQUFDZ1gsYUFBYU4sS0FBS1UsV0FBTCxDQUFpQixHQUFqQixJQUF3QixDQUF0QyxLQUE0Q0gsWUFBWVAsS0FBS1UsV0FBTCxDQUFpQixHQUFqQixDQUF4RCxDQUFKLEVBQW9GO0FBQ3JGbmQsa0RBQVV5YyxLQUFLUyxTQUFMLENBQWVILFVBQWYsRUFBMkJDLFNBQTNCLENBQVY7QUFDQWhoQixrREFBVXlnQixLQUFLUyxTQUFMLENBQWVGLFlBQVksQ0FBM0IsQ0FBVjtBQUNBLDRDQUFJaGQsUUFBUThFLFdBQVIsTUFBeUI5RSxRQUFRb2QsV0FBUixFQUE3QixFQUFvRDtBQUNoRHBkLHNEQUFVdU4sVUFBVW9QLE9BQXBCO0FBQ0g7QUFDSjtBQUNELFFBQUdGLEtBQUsxVyxPQUFMLENBQWEsS0FBYixJQUFzQixDQUF6QixFQUEyQjtBQUN2QitXLG9CQUFZLElBQVo7QUFDSDtBQUNEO0FBQ0EsUUFBSSxDQUFDRyxLQUFLamhCLFFBQVErSixPQUFSLENBQWdCLEdBQWhCLENBQU4sS0FBK0IsQ0FBQyxDQUFwQyxFQUF1Qy9KLFVBQVVBLFFBQVFraEIsU0FBUixDQUFrQixDQUFsQixFQUFxQkQsRUFBckIsQ0FBVjtBQUN2QyxRQUFJLENBQUNBLEtBQUtqaEIsUUFBUStKLE9BQVIsQ0FBZ0IsR0FBaEIsQ0FBTixLQUErQixDQUFDLENBQXBDLEVBQXVDL0osVUFBVUEsUUFBUWtoQixTQUFSLENBQWtCLENBQWxCLEVBQXFCRCxFQUFyQixDQUFWO0FBQ3ZDLFFBQUksQ0FBQ0EsS0FBS2poQixRQUFRK0osT0FBUixDQUFnQixHQUFoQixDQUFOLEtBQStCLENBQUMsQ0FBcEMsRUFBdUMvSixVQUFVQSxRQUFRa2hCLFNBQVIsQ0FBa0IsQ0FBbEIsRUFBcUJELEVBQXJCLENBQVY7O0FBRXZDTCxtQkFBZUMsU0FBUyxLQUFLN2dCLE9BQWQsRUFBdUIsRUFBdkIsQ0FBZjtBQUNBLFFBQUkrSSxNQUFNNlgsWUFBTixDQUFKLEVBQXlCO0FBQ3JCNWdCLGtCQUFVLEtBQUtpSixXQUFXc0ksVUFBVWlQLFVBQXJCLENBQWY7QUFDQUksdUJBQWVDLFNBQVN0UCxVQUFVaVAsVUFBbkIsRUFBK0IsRUFBL0IsQ0FBZjtBQUNIOztBQUVEO0FBQ0EsUUFBSWEsU0FBUyw0Q0FBNENoRSxJQUE1QyxDQUFpRGtELElBQWpELENBQWI7O0FBRUE7QUFDQSxRQUFJZSxnQkFBaUIvUCxVQUFVK1AsYUFBWCxHQUE0QixJQUE1QixHQUFtQyxLQUF2RDs7QUFFQSxRQUFJLE9BQU8vUCxVQUFVK1AsYUFBakIsSUFBa0MsV0FBbEMsSUFBaUQsQ0FBQ0EsYUFBdEQsRUFBcUU7QUFDakVyUixpQkFBU3NSLE1BQVQsR0FBa0IsWUFBbEI7QUFDQUQsd0JBQWlCclIsU0FBU3NSLE1BQVQsQ0FBZ0J4WCxPQUFoQixDQUF3QixZQUF4QixLQUF5QyxDQUFDLENBQTNDLEdBQWdELElBQWhELEdBQXVELEtBQXZFO0FBQ0g7O0FBRUQ7QUFDQSxRQUFJMEgsS0FBS3lPLE9BQVQ7QUFDQSxRQUFJc0IsZ0JBQWdCLENBQ2hCLEVBQUNDLEdBQUUsWUFBSCxFQUFpQkMsR0FBRSxnQ0FBbkIsRUFEZ0IsRUFFaEIsRUFBQ0QsR0FBRSxhQUFILEVBQWtCQyxHQUFFLDhCQUFwQixFQUZnQixFQUdoQixFQUFDRCxHQUFFLFdBQUgsRUFBZ0JDLEdBQUUsNEJBQWxCLEVBSGdCLEVBSWhCLEVBQUNELEdBQUUsV0FBSCxFQUFnQkMsR0FBRSw0QkFBbEIsRUFKZ0IsRUFLaEIsRUFBQ0QsR0FBRSxlQUFILEVBQW9CQyxHQUFFLGdCQUF0QixFQUxnQixFQU1oQixFQUFDRCxHQUFFLHFCQUFILEVBQTBCQyxHQUFFLGdCQUE1QixFQU5nQixFQU9oQixFQUFDRCxHQUFFLFlBQUgsRUFBaUJDLEdBQUUsNkJBQW5CLEVBUGdCLEVBUWhCLEVBQUNELEdBQUUsY0FBSCxFQUFtQkMsR0FBRSwrQkFBckIsRUFSZ0IsRUFTaEIsRUFBQ0QsR0FBRSxZQUFILEVBQWlCQyxHQUFFLDBCQUFuQixFQVRnQixFQVVoQixFQUFDRCxHQUFFLFlBQUgsRUFBaUJDLEdBQUUsb0JBQW5CLEVBVmdCLEVBV2hCLEVBQUNELEdBQUUsWUFBSCxFQUFpQkMsR0FBRSwrQkFBbkIsRUFYZ0IsRUFZaEIsRUFBQ0QsR0FBRSxnQkFBSCxFQUFxQkMsR0FBRSw0Q0FBdkIsRUFaZ0IsRUFhaEIsRUFBQ0QsR0FBRSxZQUFILEVBQWlCQyxHQUFFLFlBQW5CLEVBYmdCLEVBY2hCLEVBQUNELEdBQUUsY0FBSCxFQUFtQkMsR0FBRSxPQUFyQixFQWRnQixFQWVoQixFQUFDRCxHQUFFLFNBQUgsRUFBY0MsR0FBRSxTQUFoQixFQWZnQixFQWdCaEIsRUFBQ0QsR0FBRSxVQUFILEVBQWVDLEdBQUUsU0FBakIsRUFoQmdCLEVBaUJoQixFQUFDRCxHQUFFLFFBQUgsRUFBYUMsR0FBRSxPQUFmLEVBakJnQixFQWtCaEIsRUFBQ0QsR0FBRSxPQUFILEVBQVlDLEdBQUUsYUFBZCxFQWxCZ0IsRUFtQmhCLEVBQUNELEdBQUUsS0FBSCxFQUFVQyxHQUFFLG9CQUFaLEVBbkJnQixFQW9CaEIsRUFBQ0QsR0FBRSxVQUFILEVBQWVDLEdBQUUsVUFBakIsRUFwQmdCLEVBcUJoQixFQUFDRCxHQUFFLFFBQUgsRUFBYUMsR0FBRSx5Q0FBZixFQXJCZ0IsRUFzQmhCLEVBQUNELEdBQUUsS0FBSCxFQUFVQyxHQUFFLEtBQVosRUF0QmdCLEVBdUJoQixFQUFDRCxHQUFFLE1BQUgsRUFBV0MsR0FBRSxNQUFiLEVBdkJnQixFQXdCaEIsRUFBQ0QsR0FBRSxNQUFILEVBQVdDLEdBQUUsTUFBYixFQXhCZ0IsRUF5QmhCLEVBQUNELEdBQUUsTUFBSCxFQUFXQyxHQUFFLE9BQWIsRUF6QmdCLEVBMEJoQixFQUFDRCxHQUFFLFlBQUgsRUFBaUJDLEdBQUUsOEVBQW5CLEVBMUJnQixDQUFwQjtBQTRCQSxTQUFLLElBQUk1TSxFQUFULElBQWUwTSxhQUFmLEVBQThCO0FBQzFCLFlBQUlHLEtBQUtILGNBQWMxTSxFQUFkLENBQVQ7QUFDQSxZQUFJNk0sR0FBR0QsQ0FBSCxDQUFLckUsSUFBTCxDQUFVb0QsSUFBVixDQUFKLEVBQXFCO0FBQ2pCaFAsaUJBQUtrUSxHQUFHRixDQUFSO0FBQ0E7QUFDSDtBQUNKOztBQUVELFFBQUlHLFlBQVkxQixPQUFoQjs7QUFFQSxRQUFJLFVBQVU3QyxJQUFWLENBQWU1TCxFQUFmLENBQUosRUFBd0I7QUFDcEJtUSxvQkFBWSxlQUFlQyxJQUFmLENBQW9CcFEsRUFBcEIsRUFBd0IsQ0FBeEIsQ0FBWjtBQUNBQSxhQUFLLFNBQUw7QUFDSDs7QUFFRCxZQUFRQSxFQUFSO0FBQ0ksYUFBSyxVQUFMO0FBQ0ltUSx3QkFBWSx5QkFBeUJDLElBQXpCLENBQThCcEIsSUFBOUIsRUFBb0MsQ0FBcEMsQ0FBWjtBQUNBOztBQUVKLGFBQUssU0FBTDtBQUNJbUIsd0JBQVksc0JBQXNCQyxJQUF0QixDQUEyQnBCLElBQTNCLEVBQWlDLENBQWpDLENBQVo7QUFDQTs7QUFFSixhQUFLLEtBQUw7QUFDSW1CLHdCQUFZLHlCQUF5QkMsSUFBekIsQ0FBOEJ0QixJQUE5QixDQUFaO0FBQ0FxQix3QkFBWUEsVUFBVSxDQUFWLElBQWUsR0FBZixHQUFxQkEsVUFBVSxDQUFWLENBQXJCLEdBQW9DLEdBQXBDLElBQTJDQSxVQUFVLENBQVYsSUFBZSxDQUExRCxDQUFaO0FBQ0E7QUFaUjs7QUFlQSxXQUFPO0FBQ0h4QixnQkFBUUQsVUFETDtBQUVIbmMsaUJBQVNBLE9BRk47QUFHSDhkLHdCQUFnQjloQixPQUhiO0FBSUh1Yyw2QkFBcUJxRSxZQUpsQjtBQUtIUyxnQkFBUUEsTUFMTDtBQU1IVSxZQUFLdEIsSUFORjtBQU9IaFAsWUFBSUEsRUFQRDtBQVFIbVEsbUJBQVdBLFNBUlI7QUFTSEksaUJBQVNWO0FBVE4sS0FBUDtBQVdILENBL0xNLEM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUJQOzs7Ozs7Ozs7Ozs7Ozs7QUFlQSxJQUFJbFAsU0FBUzdCLE9BQU82QixNQUFwQjs7QUFFQSxJQUFJNlAsY0FBYyxNQUFsQjtBQUNBLElBQUlDLG1CQUFtQjtBQUNuQixRQUFJLElBRGU7QUFFbkIsVUFBTSxJQUZhO0FBR25CLFVBQU07QUFIYSxDQUF2QjtBQUtBLElBQUlDLGVBQWU7QUFDZixhQUFTLElBRE07QUFFZixjQUFVLElBRks7QUFHZixXQUFPLElBSFE7QUFJZixZQUFRLElBSk87QUFLZixhQUFTO0FBTE0sQ0FBbkI7O0FBUUEsU0FBU0Msb0JBQVQsQ0FBOEJ4WCxLQUE5QixFQUFxQztBQUNqQyxRQUFJLE9BQU9BLEtBQVAsS0FBaUIsUUFBckIsRUFBK0I7QUFDM0IsZUFBTyxLQUFQO0FBQ0g7QUFDRCxRQUFJeVgsTUFBTUgsaUJBQWlCdFgsTUFBTTlCLFdBQU4sRUFBakIsQ0FBVjtBQUNBLFdBQU91WixNQUFNelgsTUFBTTlCLFdBQU4sRUFBTixHQUE0QixLQUFuQztBQUNIOztBQUVELFNBQVN3WixnQkFBVCxDQUEwQjFYLEtBQTFCLEVBQWlDO0FBQzdCLFFBQUksT0FBT0EsS0FBUCxLQUFpQixRQUFyQixFQUErQjtBQUMzQixlQUFPLEtBQVA7QUFDSDtBQUNELFFBQUkyWCxRQUFRSixhQUFhdlgsTUFBTTlCLFdBQU4sRUFBYixDQUFaO0FBQ0EsV0FBT3laLFFBQVEzWCxNQUFNOUIsV0FBTixFQUFSLEdBQThCLEtBQXJDO0FBQ0g7O0FBRUQsU0FBUzBaLE1BQVQsQ0FBZ0JyWSxHQUFoQixFQUFxQjtBQUNqQixRQUFJeEksSUFBSSxDQUFSO0FBQ0EsV0FBT0EsSUFBSTRLLFVBQVUzSyxNQUFyQixFQUE2QkQsR0FBN0IsRUFBa0M7QUFDOUIsWUFBSThnQixPQUFPbFcsVUFBVTVLLENBQVYsQ0FBWDtBQUNBLGFBQUssSUFBSStnQixDQUFULElBQWNELElBQWQsRUFBb0I7QUFDaEJ0WSxnQkFBSXVZLENBQUosSUFBU0QsS0FBS0MsQ0FBTCxDQUFUO0FBQ0g7QUFDSjs7QUFFRCxXQUFPdlksR0FBUDtBQUNIO0FBQ0QsSUFBRyxDQUFDaUksTUFBSixFQUFXO0FBQ1BBLGFBQVMsZ0JBQVV3RCxTQUFWLEVBQXFCQyxPQUFyQixFQUE4QnJELElBQTlCLEVBQW9DO0FBQ3pDLFlBQUlILE1BQU0sSUFBVjtBQUNBLFlBQUlzUSxRQUFTLFlBQUQsQ0FBZXRGLElBQWYsQ0FBb0I5TCxVQUFVbVAsU0FBOUIsQ0FBWjtBQUNBLFlBQUlrQyxVQUFVLEVBQWQ7O0FBRUEsWUFBSUQsS0FBSixFQUFXO0FBQ1B0USxrQkFBTXBDLFNBQVNDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBTjtBQUNILFNBRkQsTUFFTztBQUNIMFMsb0JBQVFDLFVBQVIsR0FBcUIsSUFBckI7QUFDSDs7QUFFRDs7Ozs7QUFLSTtBQUNBO0FBQ0E7QUFDSnhRLFlBQUl5USxZQUFKLEdBQW1CLEtBQW5COztBQUVBOzs7OztBQUtBLFlBQUlDLE1BQU0sRUFBVjtBQUNBLFlBQUlDLGVBQWUsS0FBbkI7QUFDQSxZQUFJQyxhQUFhck4sU0FBakI7QUFDQSxZQUFJc04sV0FBV3JOLE9BQWY7QUFDQSxZQUFJc04sUUFBUTNRLElBQVo7QUFDQSxZQUFJNFEsVUFBVSxJQUFkO0FBQ0EsWUFBSUMsWUFBWSxFQUFoQjtBQUNBLFlBQUlDLGVBQWUsSUFBbkI7QUFDQSxZQUFJQyxRQUFRLE1BQVo7QUFDQSxZQUFJQyxhQUFhLE9BQWpCO0FBQ0EsWUFBSUMsWUFBWSxFQUFoQjtBQUNBLFlBQUlDLGlCQUFpQixRQUFyQjtBQUNBLFlBQUlDLFFBQVEsRUFBWjtBQUNBLFlBQUlDLFNBQVMsUUFBYjs7QUFFQXphLGVBQU8wYSxjQUFQLENBQXNCeFIsR0FBdEIsRUFDSSxJQURKLEVBQ1VtUSxPQUFPLEVBQVAsRUFBV0ksT0FBWCxFQUFvQjtBQUN0QmtCLGlCQUFLLGVBQVc7QUFDWix1QkFBT2YsR0FBUDtBQUNILGFBSHFCO0FBSXRCZ0IsaUJBQUssYUFBU25aLEtBQVQsRUFBZ0I7QUFDakJtWSxzQkFBTSxLQUFLblksS0FBWDtBQUNIO0FBTnFCLFNBQXBCLENBRFY7O0FBVUF6QixlQUFPMGEsY0FBUCxDQUFzQnhSLEdBQXRCLEVBQ0ksYUFESixFQUNtQm1RLE9BQU8sRUFBUCxFQUFXSSxPQUFYLEVBQW9CO0FBQy9Ca0IsaUJBQUssZUFBVztBQUNaLHVCQUFPZCxZQUFQO0FBQ0gsYUFIOEI7QUFJL0JlLGlCQUFLLGFBQVNuWixLQUFULEVBQWdCO0FBQ2pCb1ksK0JBQWUsQ0FBQyxDQUFDcFksS0FBakI7QUFDSDtBQU44QixTQUFwQixDQURuQjs7QUFVQXpCLGVBQU8wYSxjQUFQLENBQXNCeFIsR0FBdEIsRUFDSSxXQURKLEVBQ2lCbVEsT0FBTyxFQUFQLEVBQVdJLE9BQVgsRUFBb0I7QUFDN0JrQixpQkFBSyxlQUFXO0FBQ1osdUJBQU9iLFVBQVA7QUFDSCxhQUg0QjtBQUk3QmMsaUJBQUssYUFBU25aLEtBQVQsRUFBZ0I7QUFDakIsb0JBQUksT0FBT0EsS0FBUCxLQUFpQixRQUFyQixFQUErQjtBQUMzQiwwQkFBTSxJQUFJb1osU0FBSixDQUFjLHFDQUFkLENBQU47QUFDSDtBQUNEZiw2QkFBYXJZLEtBQWI7QUFDQSxxQkFBS2tZLFlBQUwsR0FBb0IsSUFBcEI7QUFDSDtBQVY0QixTQUFwQixDQURqQjs7QUFjQTNaLGVBQU8wYSxjQUFQLENBQXNCeFIsR0FBdEIsRUFDSSxTQURKLEVBQ2VtUSxPQUFPLEVBQVAsRUFBV0ksT0FBWCxFQUFvQjtBQUMzQmtCLGlCQUFLLGVBQVc7QUFDWix1QkFBT1osUUFBUDtBQUNILGFBSDBCO0FBSTNCYSxpQkFBSyxhQUFTblosS0FBVCxFQUFnQjtBQUNqQixvQkFBSSxPQUFPQSxLQUFQLEtBQWlCLFFBQXJCLEVBQStCO0FBQzNCLDBCQUFNLElBQUlvWixTQUFKLENBQWMsbUNBQWQsQ0FBTjtBQUNIO0FBQ0RkLDJCQUFXdFksS0FBWDtBQUNBLHFCQUFLa1ksWUFBTCxHQUFvQixJQUFwQjtBQUNIO0FBVjBCLFNBQXBCLENBRGY7O0FBY0EzWixlQUFPMGEsY0FBUCxDQUFzQnhSLEdBQXRCLEVBQ0ksTUFESixFQUNZbVEsT0FBTyxFQUFQLEVBQVdJLE9BQVgsRUFBb0I7QUFDeEJrQixpQkFBSyxlQUFXO0FBQ1osdUJBQU9YLEtBQVA7QUFDSCxhQUh1QjtBQUl4QlksaUJBQUssYUFBU25aLEtBQVQsRUFBZ0I7QUFDakJ1WSx3QkFBUSxLQUFLdlksS0FBYjtBQUNBLHFCQUFLa1ksWUFBTCxHQUFvQixJQUFwQjtBQUNIO0FBUHVCLFNBQXBCLENBRFo7O0FBV0EzWixlQUFPMGEsY0FBUCxDQUFzQnhSLEdBQXRCLEVBQ0ksUUFESixFQUNjbVEsT0FBTyxFQUFQLEVBQVdJLE9BQVgsRUFBb0I7QUFDMUJrQixpQkFBSyxlQUFXO0FBQ1osdUJBQU9WLE9BQVA7QUFDSCxhQUh5QjtBQUkxQlcsaUJBQUssYUFBU25aLEtBQVQsRUFBZ0I7QUFDakJ3WSwwQkFBVXhZLEtBQVY7QUFDQSxxQkFBS2tZLFlBQUwsR0FBb0IsSUFBcEI7QUFDSDtBQVB5QixTQUFwQixDQURkOztBQVdBM1osZUFBTzBhLGNBQVAsQ0FBc0J4UixHQUF0QixFQUNJLFVBREosRUFDZ0JtUSxPQUFPLEVBQVAsRUFBV0ksT0FBWCxFQUFvQjtBQUM1QmtCLGlCQUFLLGVBQVc7QUFDWix1QkFBT1QsU0FBUDtBQUNILGFBSDJCO0FBSTVCVSxpQkFBSyxhQUFTblosS0FBVCxFQUFnQjtBQUNqQixvQkFBSXFaLFVBQVU3QixxQkFBcUJ4WCxLQUFyQixDQUFkO0FBQ0E7QUFDQSxvQkFBSXFaLFlBQVksS0FBaEIsRUFBdUI7QUFDbkIsMEJBQU0sSUFBSUMsV0FBSixDQUFnQiw2Q0FBaEIsQ0FBTjtBQUNIO0FBQ0RiLDRCQUFZWSxPQUFaO0FBQ0EscUJBQUtuQixZQUFMLEdBQW9CLElBQXBCO0FBQ0g7QUFaMkIsU0FBcEIsQ0FEaEI7O0FBZ0JBM1osZUFBTzBhLGNBQVAsQ0FBc0J4UixHQUF0QixFQUNJLGFBREosRUFDbUJtUSxPQUFPLEVBQVAsRUFBV0ksT0FBWCxFQUFvQjtBQUMvQmtCLGlCQUFLLGVBQVc7QUFDWix1QkFBT1IsWUFBUDtBQUNILGFBSDhCO0FBSS9CUyxpQkFBSyxhQUFTblosS0FBVCxFQUFnQjtBQUNqQjBZLCtCQUFlLENBQUMsQ0FBQzFZLEtBQWpCO0FBQ0EscUJBQUtrWSxZQUFMLEdBQW9CLElBQXBCO0FBQ0g7QUFQOEIsU0FBcEIsQ0FEbkI7O0FBV0EzWixlQUFPMGEsY0FBUCxDQUFzQnhSLEdBQXRCLEVBQ0ksTUFESixFQUNZbVEsT0FBTyxFQUFQLEVBQVdJLE9BQVgsRUFBb0I7QUFDeEJrQixpQkFBSyxlQUFXO0FBQ1osdUJBQU9QLEtBQVA7QUFDSCxhQUh1QjtBQUl4QlEsaUJBQUssYUFBU25aLEtBQVQsRUFBZ0I7QUFDakIsb0JBQUksT0FBT0EsS0FBUCxLQUFpQixRQUFqQixJQUE2QkEsVUFBVXFYLFdBQTNDLEVBQXdEO0FBQ3BELDBCQUFNLElBQUlpQyxXQUFKLENBQWdCLG9EQUFoQixDQUFOO0FBQ0g7QUFDRFgsd0JBQVEzWSxLQUFSO0FBQ0EscUJBQUtrWSxZQUFMLEdBQW9CLElBQXBCO0FBQ0g7QUFWdUIsU0FBcEIsQ0FEWjs7QUFjQTNaLGVBQU8wYSxjQUFQLENBQXNCeFIsR0FBdEIsRUFDSSxXQURKLEVBQ2lCbVEsT0FBTyxFQUFQLEVBQVdJLE9BQVgsRUFBb0I7QUFDN0JrQixpQkFBSyxlQUFXO0FBQ1osdUJBQU9OLFVBQVA7QUFDSCxhQUg0QjtBQUk3Qk8saUJBQUssYUFBU25aLEtBQVQsRUFBZ0I7QUFDakIsb0JBQUlxWixVQUFVM0IsaUJBQWlCMVgsS0FBakIsQ0FBZDtBQUNBLG9CQUFJLENBQUNxWixPQUFMLEVBQWM7QUFDViwwQkFBTSxJQUFJQyxXQUFKLENBQWdCLDZDQUFoQixDQUFOO0FBQ0g7QUFDRFYsNkJBQWFTLE9BQWI7QUFDQSxxQkFBS25CLFlBQUwsR0FBb0IsSUFBcEI7QUFDSDtBQVg0QixTQUFwQixDQURqQjs7QUFlQTNaLGVBQU8wYSxjQUFQLENBQXNCeFIsR0FBdEIsRUFDSSxVQURKLEVBQ2dCbVEsT0FBTyxFQUFQLEVBQVdJLE9BQVgsRUFBb0I7QUFDNUJrQixpQkFBSyxlQUFXO0FBQ1osdUJBQU9MLFNBQVA7QUFDSCxhQUgyQjtBQUk1Qk0saUJBQUssYUFBU25aLEtBQVQsRUFBZ0I7QUFDakIsb0JBQUlBLFFBQVEsQ0FBUixJQUFhQSxRQUFRLEdBQXpCLEVBQThCO0FBQzFCLDBCQUFNLElBQUl3VCxLQUFKLENBQVUscUNBQVYsQ0FBTjtBQUNIO0FBQ0RxRiw0QkFBWTdZLEtBQVo7QUFDQSxxQkFBS2tZLFlBQUwsR0FBb0IsSUFBcEI7QUFDSDtBQVYyQixTQUFwQixDQURoQjs7QUFjQTNaLGVBQU8wYSxjQUFQLENBQXNCeFIsR0FBdEIsRUFDSSxlQURKLEVBQ3FCbVEsT0FBTyxFQUFQLEVBQVdJLE9BQVgsRUFBb0I7QUFDakNrQixpQkFBSyxlQUFXO0FBQ1osdUJBQU9KLGNBQVA7QUFDSCxhQUhnQztBQUlqQ0ssaUJBQUssYUFBU25aLEtBQVQsRUFBZ0I7QUFDakIsb0JBQUlxWixVQUFVM0IsaUJBQWlCMVgsS0FBakIsQ0FBZDtBQUNBLG9CQUFJLENBQUNxWixPQUFMLEVBQWM7QUFDViwwQkFBTSxJQUFJQyxXQUFKLENBQWdCLDZDQUFoQixDQUFOO0FBQ0g7QUFDRFIsaUNBQWlCTyxPQUFqQjtBQUNBLHFCQUFLbkIsWUFBTCxHQUFvQixJQUFwQjtBQUNIO0FBWGdDLFNBQXBCLENBRHJCOztBQWVBM1osZUFBTzBhLGNBQVAsQ0FBc0J4UixHQUF0QixFQUNJLE1BREosRUFDWW1RLE9BQU8sRUFBUCxFQUFXSSxPQUFYLEVBQW9CO0FBQ3hCa0IsaUJBQUssZUFBVztBQUNaLHVCQUFPSCxLQUFQO0FBQ0gsYUFIdUI7QUFJeEJJLGlCQUFLLGFBQVNuWixLQUFULEVBQWdCO0FBQ2pCLG9CQUFJQSxRQUFRLENBQVIsSUFBYUEsUUFBUSxHQUF6QixFQUE4QjtBQUMxQiwwQkFBTSxJQUFJd1QsS0FBSixDQUFVLGlDQUFWLENBQU47QUFDSDtBQUNEdUYsd0JBQVEvWSxLQUFSO0FBQ0EscUJBQUtrWSxZQUFMLEdBQW9CLElBQXBCO0FBQ0g7QUFWdUIsU0FBcEIsQ0FEWjs7QUFjQTNaLGVBQU8wYSxjQUFQLENBQXNCeFIsR0FBdEIsRUFDSSxPQURKLEVBQ2FtUSxPQUFPLEVBQVAsRUFBV0ksT0FBWCxFQUFvQjtBQUN6QmtCLGlCQUFLLGVBQVc7QUFDWix1QkFBT0YsTUFBUDtBQUNILGFBSHdCO0FBSXpCRyxpQkFBSyxhQUFTblosS0FBVCxFQUFnQjtBQUNqQixvQkFBSXFaLFVBQVUzQixpQkFBaUIxWCxLQUFqQixDQUFkO0FBQ0Esb0JBQUksQ0FBQ3FaLE9BQUwsRUFBYztBQUNWLDBCQUFNLElBQUlDLFdBQUosQ0FBZ0IsNkNBQWhCLENBQU47QUFDSDtBQUNETix5QkFBU0ssT0FBVDtBQUNBLHFCQUFLbkIsWUFBTCxHQUFvQixJQUFwQjtBQUNIO0FBWHdCLFNBQXBCLENBRGI7O0FBZUE7Ozs7QUFJSTtBQUNKelEsWUFBSThSLFlBQUosR0FBbUJ2YixTQUFuQjs7QUFFQSxZQUFJK1osS0FBSixFQUFXO0FBQ1AsbUJBQU90USxHQUFQO0FBQ0g7QUFDSixLQTNPRDs7QUE2T0E7Ozs7QUFJQUQsV0FBT3hFLFNBQVAsQ0FBaUJ3VyxZQUFqQixHQUFnQyxZQUFXO0FBQ3ZDO0FBQ0EsZUFBTzlRLE9BQU8rUSxtQkFBUCxDQUEyQjlULE1BQTNCLEVBQW1DLEtBQUtpQyxJQUF4QyxDQUFQO0FBQ0gsS0FIRDtBQUtIOztxQkFFY0osTTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaFRmOzs7Ozs7QUFFQTs7Ozs7O0FBT0EsSUFBTWtTLE1BQU0sU0FBTkEsR0FBTSxDQUFTQyxpQkFBVCxFQUEyQjtBQUNuQyxRQUFNMWtCLE9BQU8sRUFBYjtBQUNBLFFBQU0ya0IsYUFBYSxTQUFiQSxVQUFhLENBQVNDLFFBQVQsRUFBb0JDLFFBQXBCLEVBQTZCO0FBQzVDLFlBQUlDLFdBQVlGLFNBQVNHLGdCQUFULENBQTBCRixRQUExQixDQUFoQjtBQUNBLFlBQUdDLFNBQVMvaUIsTUFBVCxHQUFrQixDQUFyQixFQUF1QjtBQUNuQixtQkFBTytpQixRQUFQO0FBQ0gsU0FGRCxNQUVLO0FBQ0QsbUJBQU9BLFNBQVMsQ0FBVCxDQUFQO0FBQ0g7QUFFSixLQVJEOztBQVVBLFFBQUlGLFdBQVcsRUFBZjs7QUFFQSxRQUFJaGIsd0JBQUVvYixTQUFGLENBQVlOLGlCQUFaLEtBQWtDOWEsd0JBQUVxYixLQUFGLENBQVFQLGlCQUFSLEVBQTJCLFVBQVN4UyxJQUFULEVBQWM7QUFBQyxlQUFPdEksd0JBQUVvYixTQUFGLENBQVk5UyxJQUFaLENBQVA7QUFBeUIsS0FBbkUsQ0FBdEMsRUFBMkc7QUFDdkcwUyxtQkFBV0YsaUJBQVg7QUFDSCxLQUZELE1BRU0sSUFBR0Esc0JBQXNCLFVBQXpCLEVBQW9DO0FBQ3RDRSxtQkFBV3hVLFFBQVg7QUFDSCxLQUZLLE1BRUEsSUFBR3NVLHNCQUFzQixRQUF6QixFQUFrQztBQUNwQ0UsbUJBQVdsVSxNQUFYO0FBQ0gsS0FGSyxNQUVEO0FBQ0RrVSxtQkFBV0QsV0FBV3ZVLFFBQVgsRUFBcUJzVSxpQkFBckIsQ0FBWDtBQUNIOztBQUdELFFBQUcsQ0FBQ0UsUUFBSixFQUFhO0FBQ1QsZUFBTyxJQUFQO0FBQ0g7O0FBRUQ1a0IsU0FBS2tsQixJQUFMLEdBQVksVUFBQ0wsUUFBRCxFQUFhO0FBQ3JCLGVBQU9KLElBQUlFLFdBQVdDLFFBQVgsRUFBcUJDLFFBQXJCLENBQUosQ0FBUDtBQUNILEtBRkQ7O0FBSUE3a0IsU0FBS21sQixHQUFMLEdBQVcsVUFBQ2xpQixJQUFELEVBQU84SCxLQUFQLEVBQWlCO0FBQ3hCLFlBQUdBLEtBQUgsRUFBUztBQUNMLGdCQUFHNlosU0FBUzdpQixNQUFULEdBQWtCLENBQXJCLEVBQXVCO0FBQ25CNmlCLHlCQUFTcGIsT0FBVCxDQUFpQixVQUFTNGIsT0FBVCxFQUFpQjtBQUM5QkEsNEJBQVFDLEtBQVIsQ0FBY3BpQixJQUFkLElBQXNCOEgsS0FBdEI7QUFDSCxpQkFGRDtBQUdILGFBSkQsTUFJSztBQUNENloseUJBQVNTLEtBQVQsQ0FBZXBpQixJQUFmLElBQXVCOEgsS0FBdkI7QUFDSDtBQUNKLFNBUkQsTUFRSztBQUNELG1CQUFPNlosU0FBU1MsS0FBVCxDQUFlcGlCLElBQWYsQ0FBUDtBQUNIO0FBRUosS0FiRDs7QUFlQWpELFNBQUtzbEIsUUFBTCxHQUFnQixVQUFDcmlCLElBQUQsRUFBUztBQUNyQixZQUFHMmhCLFNBQVNXLFNBQVosRUFBc0I7QUFDbEJYLHFCQUFTVyxTQUFULENBQW1CQyxHQUFuQixDQUF1QnZpQixJQUF2QjtBQUNILFNBRkQsTUFFSztBQUNELGdCQUFJd2lCLGFBQWFiLFNBQVNjLFNBQVQsQ0FBbUJsUCxLQUFuQixDQUF5QixHQUF6QixDQUFqQjtBQUNBLGdCQUFHaVAsV0FBV3ZiLE9BQVgsQ0FBbUJqSCxJQUFuQixNQUE2QixDQUFDLENBQWpDLEVBQW1DO0FBQy9CMmhCLHlCQUFTYyxTQUFULElBQXNCLE1BQU16aUIsSUFBNUI7QUFDSDtBQUNKO0FBRUosS0FWRDs7QUFZQWpELFNBQUsybEIsV0FBTCxHQUFtQixVQUFDMWlCLElBQUQsRUFBUztBQUN4QixZQUFJMmhCLFNBQVNXLFNBQWIsRUFBdUI7QUFDbkJYLHFCQUFTVyxTQUFULENBQW1CbmUsTUFBbkIsQ0FBMEJuRSxJQUExQjtBQUNILFNBRkQsTUFFSztBQUNEMmhCLHFCQUFTYyxTQUFULEdBQXFCZCxTQUFTYyxTQUFULENBQW1CakksT0FBbkIsQ0FBMkIsSUFBSW1JLE1BQUosQ0FBVyxZQUFZM2lCLEtBQUt1VCxLQUFMLENBQVcsR0FBWCxFQUFnQkksSUFBaEIsQ0FBcUIsR0FBckIsQ0FBWixHQUF3QyxTQUFuRCxFQUE4RCxJQUE5RCxDQUEzQixFQUFnRyxHQUFoRyxDQUFyQjtBQUVIO0FBQ0osS0FQRDs7QUFTQTVXLFNBQUs2bEIsZUFBTCxHQUF1QixVQUFDQyxRQUFELEVBQWM7QUFDakNsQixpQkFBU2lCLGVBQVQsQ0FBeUJDLFFBQXpCO0FBQ0gsS0FGRDs7QUFJQTlsQixTQUFLK2xCLElBQUwsR0FBWSxZQUFLO0FBQ2JuQixpQkFBU1MsS0FBVCxDQUFlVyxPQUFmLEdBQXlCLE9BQXpCO0FBQ0gsS0FGRDs7QUFJQWhtQixTQUFLaW1CLElBQUwsR0FBWSxZQUFLO0FBQ2JyQixpQkFBU1MsS0FBVCxDQUFlVyxPQUFmLEdBQXlCLE1BQXpCO0FBQ0gsS0FGRDs7QUFJQTs7OztBQUlBaG1CLFNBQUsyUyxJQUFMLEdBQVksVUFBQ0EsSUFBRCxFQUFVO0FBQUU7QUFDcEIsWUFBR0EsU0FBUzVKLFNBQVosRUFBc0I7QUFDbEIsbUJBQU82YixTQUFTc0IsV0FBaEI7QUFDSCxTQUZELE1BRUs7QUFDRHRCLHFCQUFTc0IsV0FBVCxHQUF1QnZULElBQXZCO0FBQ0g7QUFDSixLQU5EO0FBT0EzUyxTQUFLbW1CLElBQUwsR0FBWSxVQUFDeFQsSUFBRCxFQUFVO0FBQ2xCaVMsaUJBQVN3QixTQUFULEdBQXFCelQsSUFBckI7QUFDSCxLQUZEO0FBR0EzUyxTQUFLcW1CLFFBQUwsR0FBZ0IsVUFBQ3BqQixJQUFELEVBQVU7QUFBRTtBQUN4QixZQUFHMmhCLFNBQVNXLFNBQVosRUFBc0I7QUFDbEIsbUJBQU9YLFNBQVNXLFNBQVQsQ0FBbUJlLFFBQW5CLENBQTRCcmpCLElBQTVCLENBQVA7QUFDSCxTQUZELE1BRUs7QUFDRCxtQkFBTyxJQUFJMmlCLE1BQUosQ0FBVyxVQUFVM2lCLElBQVYsR0FBaUIsT0FBNUIsRUFBcUMsSUFBckMsRUFBMkN1YSxJQUEzQyxDQUFnRG9ILFNBQVMzaEIsSUFBekQsQ0FBUDtBQUNIO0FBQ0osS0FORDs7QUFRQWpELFNBQUt1bUIsRUFBTCxHQUFVLFVBQUNDLGNBQUQsRUFBb0I7QUFDMUIsZUFBTzVCLGFBQWE0QixjQUFwQjtBQUNILEtBRkQ7O0FBSUF4bUIsU0FBS3ltQixNQUFMLEdBQWMsWUFBSztBQUFLO0FBQ3BCLFlBQUlDLE9BQU85QixTQUFTK0IscUJBQVQsRUFBWDs7QUFFQSxlQUFPO0FBQ0hDLGlCQUFLRixLQUFLRSxHQUFMLEdBQVd4VyxTQUFTaUQsSUFBVCxDQUFjd1QsU0FEM0I7QUFFSEMsa0JBQU1KLEtBQUtJLElBQUwsR0FBWTFXLFNBQVNpRCxJQUFULENBQWMwVDtBQUY3QixTQUFQO0FBSUgsS0FQRDs7QUFTQS9tQixTQUFLd2dCLEtBQUwsR0FBYSxZQUFNO0FBQUs7QUFDcEIsZUFBT29FLFNBQVNvQyxXQUFoQjtBQUNILEtBRkQ7O0FBSUFobkIsU0FBS3lnQixNQUFMLEdBQWMsWUFBTTtBQUFJO0FBQ3BCLGVBQU9tRSxTQUFTcUMsWUFBaEI7QUFDSCxLQUZEOztBQUlBam5CLFNBQUtrbkIsSUFBTCxHQUFZLFVBQUNBLElBQUQsRUFBVTtBQUNsQixlQUFPdEMsU0FBU25KLFlBQVQsQ0FBc0J5TCxJQUF0QixDQUFQO0FBQ0gsS0FGRDs7QUFJQWxuQixTQUFLeWQsT0FBTCxHQUFlLFVBQUMwSSxJQUFELEVBQVU7QUFDckJ2QixpQkFBU3VDLFdBQVQsQ0FBcUJoQixJQUFyQjtBQUNILEtBRkQ7O0FBSUFubUIsU0FBSzhiLE1BQUwsR0FBYyxVQUFDcUssSUFBRCxFQUFVO0FBQ3BCdkIsaUJBQVNqSSxXQUFULENBQXFCd0osSUFBckI7QUFDSCxLQUZEOztBQUlBbm1CLFNBQUtvSCxNQUFMLEdBQWMsWUFBTTtBQUNoQixZQUFHd2QsU0FBUzdpQixNQUFULEdBQWtCLENBQXJCLEVBQXVCO0FBQ25CNmlCLHFCQUFTd0MsYUFBVCxDQUF1QnRLLFdBQXZCLENBQW1DOEgsUUFBbkM7QUFDSCxTQUZELE1BRUs7QUFDREEscUJBQVN4ZCxNQUFUO0FBQ0g7QUFFSixLQVBEOztBQVNBcEgsU0FBSzhjLFdBQUwsR0FBbUIsVUFBQ3NJLE9BQUQsRUFBYTtBQUM1QixZQUFHQSxPQUFILEVBQVc7QUFDUFIscUJBQVM5SCxXQUFULENBQXFCc0ksT0FBckI7QUFDSCxTQUZELE1BRUs7QUFDRCxtQkFBT1IsU0FBU3lDLGFBQVQsRUFBUCxFQUFpQztBQUM3QnpDLHlCQUFTOUgsV0FBVCxDQUFxQjhILFNBQVMwQyxVQUE5QjtBQUNIO0FBQ0o7QUFFSixLQVREOztBQVdBdG5CLFNBQUtpa0IsR0FBTCxHQUFXLFlBQU07QUFDYixlQUFPVyxRQUFQO0FBQ0gsS0FGRDs7QUFJQTVrQixTQUFLdW5CLE9BQUwsR0FBZSxVQUFDQyxjQUFELEVBQW9CO0FBQy9CLFlBQUlDLGlCQUFpQjdDLFNBQVMyQyxPQUFULENBQWlCQyxjQUFqQixDQUFyQjtBQUNBLFlBQUdDLGNBQUgsRUFBa0I7QUFDZCxtQkFBT2hELElBQUlnRCxjQUFKLENBQVA7QUFDSCxTQUZELE1BRUs7QUFDRCxtQkFBTyxJQUFQO0FBQ0g7QUFDSixLQVBEOztBQVNBLFdBQU96bkIsSUFBUDtBQUNILENBMUtELEMsQ0FaQTs7O3FCQXdMZXlrQixHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7UUN0TENpRCxJLEdBQUFBLEk7UUEyQ0FDLFUsR0FBQUEsVTtRQXFCQUMsVyxHQUFBQSxXOztBQWxFaEI7Ozs7OztBQUVPLFNBQVNGLElBQVQsQ0FBY0csTUFBZCxFQUFzQjtBQUN6QixXQUFPQSxTQUFTQSxPQUFPcEssT0FBUCxDQUFlLFlBQWYsRUFBNkIsRUFBN0IsQ0FBVCxHQUE0QyxFQUFuRDtBQUNIOztBQUVEOzs7Ozs7QUFNTyxJQUFNcUssOENBQW1CLFNBQW5CQSxnQkFBbUIsQ0FBU0MsSUFBVCxFQUFlO0FBQzNDLFFBQUcsQ0FBQ0EsSUFBRCxJQUFTQSxLQUFLcFIsTUFBTCxDQUFZLENBQVosRUFBYyxDQUFkLEtBQWtCLE1BQTlCLEVBQXNDO0FBQ2xDLGVBQU8sRUFBUDtBQUNIO0FBQ0QsYUFBU3FSLGtCQUFULENBQTRCRCxJQUE1QixFQUFrQztBQUM5QixZQUFJRSxZQUFZLEVBQWhCO0FBQ0EsWUFBSyxrQkFBRCxDQUFxQnpLLElBQXJCLENBQTBCdUssSUFBMUIsQ0FBSixFQUFxQztBQUNqQ0Usd0JBQVksS0FBWjtBQUNILFNBRkQsTUFFTSxJQUFLLG1CQUFELENBQXNCekssSUFBdEIsQ0FBMkJ1SyxJQUEzQixDQUFKLEVBQXNDO0FBQ3hDRSx3QkFBWSxNQUFaO0FBQ0g7QUFDRCxlQUFPQSxTQUFQO0FBQ0g7O0FBRUQsUUFBSUMsZUFBZUYsbUJBQW1CRCxJQUFuQixDQUFuQjtBQUNBLFFBQUdHLFlBQUgsRUFBaUI7QUFDYixlQUFPQSxZQUFQO0FBQ0g7QUFDREgsV0FBT0EsS0FBS3ZSLEtBQUwsQ0FBVyxHQUFYLEVBQWdCLENBQWhCLEVBQW1CQSxLQUFuQixDQUF5QixHQUF6QixFQUE4QixDQUE5QixDQUFQO0FBQ0EsUUFBR3VSLEtBQUt6RyxXQUFMLENBQWlCLEdBQWpCLElBQXdCLENBQUMsQ0FBNUIsRUFBK0I7QUFDM0IsZUFBT3lHLEtBQUtwUixNQUFMLENBQVlvUixLQUFLekcsV0FBTCxDQUFpQixHQUFqQixJQUF3QixDQUFwQyxFQUF1Q3lHLEtBQUtobUIsTUFBNUMsRUFBb0RrSCxXQUFwRCxFQUFQO0FBQ0gsS0FGRCxNQUVLO0FBQ0QsZUFBTyxFQUFQO0FBQ0g7QUFDSixDQXhCTTs7QUEyQlA7Ozs7OztBQU1PLFNBQVMwZSxVQUFULENBQW9CUSxNQUFwQixFQUE0QjtBQUMvQixRQUFJQyxTQUFTcEgsU0FBU21ILE1BQVQsRUFBaUIsRUFBakIsQ0FBYjtBQUNBLFFBQUcsQ0FBQ0EsTUFBSixFQUFXO0FBQ1AsZUFBTyxPQUFQO0FBQ0g7QUFDRCxRQUFJRSxRQUFVcmUsS0FBS3NlLEtBQUwsQ0FBV0YsU0FBUyxJQUFwQixDQUFkO0FBQ0EsUUFBSUcsVUFBVXZlLEtBQUtzZSxLQUFMLENBQVcsQ0FBQ0YsU0FBVUMsUUFBUSxJQUFuQixJQUE0QixFQUF2QyxDQUFkO0FBQ0EsUUFBSUcsVUFBVUosU0FBVUMsUUFBUSxJQUFsQixHQUEyQkUsVUFBVSxFQUFuRDs7QUFFQTtBQUNBLFFBQUlBLFVBQVUsRUFBZCxFQUFrQjtBQUFDQSxrQkFBVSxNQUFJQSxPQUFkO0FBQXVCO0FBQzFDLFFBQUlDLFVBQVUsRUFBZCxFQUFrQjtBQUFDQSxrQkFBVSxNQUFJQSxPQUFkO0FBQXVCOztBQUUxQyxRQUFJSCxRQUFRLENBQVosRUFBZTtBQUNYLGVBQU9BLFFBQU0sR0FBTixHQUFVRSxPQUFWLEdBQWtCLEdBQWxCLEdBQXNCQyxPQUE3QjtBQUNILEtBRkQsTUFFTztBQUNILGVBQU9ELFVBQVEsR0FBUixHQUFZQyxPQUFuQjtBQUNIO0FBQ0o7O0FBR00sU0FBU1osV0FBVCxDQUFxQmEsR0FBckIsRUFBMEJDLFNBQTFCLEVBQXFDO0FBQ3hDLFFBQUcsQ0FBQ0QsR0FBSixFQUFTO0FBQ0wsZUFBTyxDQUFQO0FBQ0g7QUFDRCxRQUFHN2Usd0JBQUVDLFFBQUYsQ0FBVzRlLEdBQVgsS0FBbUIsQ0FBQzdlLHdCQUFFVixLQUFGLENBQVF1ZixHQUFSLENBQXZCLEVBQW9DO0FBQ2hDLGVBQU9BLEdBQVA7QUFDSDtBQUNEQSxVQUFNQSxJQUFJaEwsT0FBSixDQUFZLEdBQVosRUFBaUIsR0FBakIsQ0FBTjtBQUNBLFFBQUlrTCxNQUFNRixJQUFJalMsS0FBSixDQUFVLEdBQVYsQ0FBVjtBQUNBLFFBQUlvUyxZQUFZRCxJQUFJNW1CLE1BQXBCO0FBQ0EsUUFBSThtQixNQUFNLENBQVY7QUFDQSxRQUFJSixJQUFJamMsS0FBSixDQUFVLENBQUMsQ0FBWCxNQUFrQixHQUF0QixFQUEwQjtBQUN0QnFjLGNBQU16ZixXQUFXcWYsR0FBWCxDQUFOO0FBQ0gsS0FGRCxNQUVNLElBQUlBLElBQUlqYyxLQUFKLENBQVUsQ0FBQyxDQUFYLE1BQWtCLEdBQXRCLEVBQTBCO0FBQzVCcWMsY0FBTXpmLFdBQVdxZixHQUFYLElBQWtCLEVBQXhCO0FBQ0gsS0FGSyxNQUVBLElBQUlBLElBQUlqYyxLQUFKLENBQVUsQ0FBQyxDQUFYLE1BQWtCLEdBQXRCLEVBQTBCO0FBQzVCcWMsY0FBTXpmLFdBQVdxZixHQUFYLElBQWtCLElBQXhCO0FBQ0gsS0FGSyxNQUVBLElBQUlHLFlBQVksQ0FBaEIsRUFBbUI7QUFDckIsWUFBSUUsV0FBV0YsWUFBWSxDQUEzQjtBQUNBLFlBQUlBLGNBQWMsQ0FBbEIsRUFBcUI7QUFDakIsZ0JBQUlGLFNBQUosRUFBZTtBQUNYRyxzQkFBTXpmLFdBQVd1ZixJQUFJRyxRQUFKLENBQVgsSUFBNEJKLFNBQWxDO0FBQ0g7QUFDREksd0JBQVksQ0FBWjtBQUNIO0FBQ0RELGVBQU96ZixXQUFXdWYsSUFBSUcsUUFBSixDQUFYLENBQVA7QUFDQUQsZUFBT3pmLFdBQVd1ZixJQUFJRyxXQUFXLENBQWYsQ0FBWCxJQUFnQyxFQUF2QztBQUNBLFlBQUlGLGFBQWEsQ0FBakIsRUFBb0I7QUFDaEJDLG1CQUFPemYsV0FBV3VmLElBQUlHLFdBQVcsQ0FBZixDQUFYLElBQWdDLElBQXZDO0FBQ0g7QUFDSixLQWJLLE1BYUM7QUFDSEQsY0FBTXpmLFdBQVdxZixHQUFYLENBQU47QUFDSDtBQUNELFFBQUk3ZSx3QkFBRVYsS0FBRixDQUFRMmYsR0FBUixDQUFKLEVBQWtCO0FBQ2QsZUFBTyxDQUFQO0FBQ0g7QUFDRCxXQUFPQSxHQUFQO0FBQ0gsQzs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsWUFBVTtBQUFDLE1BQUlFLElBQUUsb0JBQWlCQyxJQUFqQix5Q0FBaUJBLElBQWpCLE1BQXVCQSxLQUFLQSxJQUFMLEtBQVlBLElBQW5DLElBQXlDQSxJQUF6QyxJQUErQyxvQkFBaUJDLE1BQWpCLHlDQUFpQkEsTUFBakIsTUFBeUJBLE9BQU9BLE1BQVAsS0FBZ0JBLE1BQXpDLElBQWlEQSxNQUFoRyxJQUF3RyxJQUF4RyxJQUE4RyxFQUFwSDtBQUFBLE1BQXVIcEgsSUFBRWtILEVBQUVuZixDQUEzSDtBQUFBLE1BQTZINkgsSUFBRTNELE1BQU1DLFNBQXJJO0FBQUEsTUFBK0ltYixJQUFFNWYsT0FBT3lFLFNBQXhKO0FBQUEsTUFBa0s2VCxJQUFFLGVBQWEsT0FBT3VILE1BQXBCLEdBQTJCQSxPQUFPcGIsU0FBbEMsR0FBNEMsSUFBaE47QUFBQSxNQUFxTnFiLElBQUUzWCxFQUFFdEgsSUFBek47QUFBQSxNQUE4TmtmLElBQUU1WCxFQUFFakYsS0FBbE87QUFBQSxNQUF3T3FXLElBQUVxRyxFQUFFbkwsUUFBNU87QUFBQSxNQUFxUGpjLElBQUVvbkIsRUFBRUksY0FBelA7QUFBQSxNQUF3UUMsSUFBRXpiLE1BQU10RCxPQUFoUjtBQUFBLE1BQXdSZ2YsSUFBRWxnQixPQUFPQyxJQUFqUztBQUFBLE1BQXNTdUQsSUFBRXhELE9BQU9pVyxNQUEvUztBQUFBLE1BQXNUa0ssSUFBRSxTQUFGQSxDQUFFLEdBQVUsQ0FBRSxDQUFwVTtBQUFBLE1BQXFVQyxJQUFFLFNBQUZBLENBQUUsQ0FBU1gsQ0FBVCxFQUFXO0FBQUMsV0FBT0EsYUFBYVcsQ0FBYixHQUFlWCxDQUFmLEdBQWlCLGdCQUFnQlcsQ0FBaEIsR0FBa0IsTUFBSyxLQUFLQyxRQUFMLEdBQWNaLENBQW5CLENBQWxCLEdBQXdDLElBQUlXLENBQUosQ0FBTVgsQ0FBTixDQUFoRTtBQUF5RSxHQUE1WixDQUE2WixVQUE2QmEsUUFBUXRLLFFBQXJDLEdBQThDeUosRUFBRW5mLENBQUYsR0FBSThmLENBQWxELElBQXFELFNBQTRCLENBQUNHLE9BQU92SyxRQUFwQyxJQUE4Q3VLLE9BQU9ELE9BQXJELEtBQStEQSxVQUFRQyxPQUFPRCxPQUFQLEdBQWVGLENBQXRGLEdBQXlGRSxRQUFRaGdCLENBQVIsR0FBVThmLENBQXhKLEdBQTJKQSxFQUFFSSxPQUFGLEdBQVUsT0FBckssQ0FBNkssSUFBSUMsQ0FBSjtBQUFBLE1BQU1DLElBQUUsU0FBRkEsQ0FBRSxDQUFTWixDQUFULEVBQVd0bkIsQ0FBWCxFQUFhaW5CLENBQWIsRUFBZTtBQUFDLFFBQUcsS0FBSyxDQUFMLEtBQVNqbkIsQ0FBWixFQUFjLE9BQU9zbkIsQ0FBUCxDQUFTLFFBQU8sUUFBTUwsQ0FBTixHQUFRLENBQVIsR0FBVUEsQ0FBakIsR0FBb0IsS0FBSyxDQUFMO0FBQU8sZUFBTyxVQUFTQSxDQUFULEVBQVc7QUFBQyxpQkFBT0ssRUFBRTNjLElBQUYsQ0FBTzNLLENBQVAsRUFBU2luQixDQUFULENBQVA7QUFBbUIsU0FBdEMsQ0FBdUMsS0FBSyxDQUFMO0FBQU8sZUFBTyxVQUFTQSxDQUFULEVBQVdsSCxDQUFYLEVBQWEwSCxDQUFiLEVBQWU7QUFBQyxpQkFBT0gsRUFBRTNjLElBQUYsQ0FBTzNLLENBQVAsRUFBU2luQixDQUFULEVBQVdsSCxDQUFYLEVBQWEwSCxDQUFiLENBQVA7QUFBdUIsU0FBOUMsQ0FBK0MsS0FBSyxDQUFMO0FBQU8sZUFBTyxVQUFTUixDQUFULEVBQVdsSCxDQUFYLEVBQWEwSCxDQUFiLEVBQWU5WCxDQUFmLEVBQWlCO0FBQUMsaUJBQU8yWCxFQUFFM2MsSUFBRixDQUFPM0ssQ0FBUCxFQUFTaW5CLENBQVQsRUFBV2xILENBQVgsRUFBYTBILENBQWIsRUFBZTlYLENBQWYsQ0FBUDtBQUF5QixTQUFsRCxDQUEvSCxDQUFrTCxPQUFPLFlBQVU7QUFBQyxhQUFPMlgsRUFBRTdjLEtBQUYsQ0FBUXpLLENBQVIsRUFBVTRLLFNBQVYsQ0FBUDtBQUE0QixLQUE5QztBQUErQyxHQUFoUjtBQUFBLE1BQWlSdWQsSUFBRSxTQUFGQSxDQUFFLENBQVNsQixDQUFULEVBQVdsSCxDQUFYLEVBQWEwSCxDQUFiLEVBQWU7QUFBQyxXQUFPRyxFQUFFUSxRQUFGLEtBQWFILENBQWIsR0FBZUwsRUFBRVEsUUFBRixDQUFXbkIsQ0FBWCxFQUFhbEgsQ0FBYixDQUFmLEdBQStCLFFBQU1rSCxDQUFOLEdBQVFXLEVBQUVTLFFBQVYsR0FBbUJULEVBQUVVLFVBQUYsQ0FBYXJCLENBQWIsSUFBZ0JpQixFQUFFakIsQ0FBRixFQUFJbEgsQ0FBSixFQUFNMEgsQ0FBTixDQUFoQixHQUF5QkcsRUFBRVcsUUFBRixDQUFXdEIsQ0FBWCxLQUFlLENBQUNXLEVBQUVsZixPQUFGLENBQVV1ZSxDQUFWLENBQWhCLEdBQTZCVyxFQUFFWSxPQUFGLENBQVV2QixDQUFWLENBQTdCLEdBQTBDVyxFQUFFYSxRQUFGLENBQVd4QixDQUFYLENBQTVIO0FBQTBJLEdBQTdhLENBQThhVyxFQUFFUSxRQUFGLEdBQVdILElBQUUsV0FBU2hCLENBQVQsRUFBV2xILENBQVgsRUFBYTtBQUFDLFdBQU9vSSxFQUFFbEIsQ0FBRixFQUFJbEgsQ0FBSixFQUFNLElBQUUsQ0FBUixDQUFQO0FBQWtCLEdBQTdDLENBQThDLElBQUkySSxJQUFFLFNBQUZBLENBQUUsQ0FBU3BCLENBQVQsRUFBV3RuQixDQUFYLEVBQWE7QUFBQyxXQUFPQSxJQUFFLFFBQU1BLENBQU4sR0FBUXNuQixFQUFFcm5CLE1BQUYsR0FBUyxDQUFqQixHQUFtQixDQUFDRCxDQUF0QixFQUF3QixZQUFVO0FBQUMsV0FBSSxJQUFJaW5CLElBQUUvZSxLQUFLeWdCLEdBQUwsQ0FBUy9kLFVBQVUzSyxNQUFWLEdBQWlCRCxDQUExQixFQUE0QixDQUE1QixDQUFOLEVBQXFDK2YsSUFBRS9ULE1BQU1pYixDQUFOLENBQXZDLEVBQWdEUSxJQUFFLENBQXRELEVBQXdEQSxJQUFFUixDQUExRCxFQUE0RFEsR0FBNUQ7QUFBZ0UxSCxVQUFFMEgsQ0FBRixJQUFLN2MsVUFBVTZjLElBQUV6bkIsQ0FBWixDQUFMO0FBQWhFLE9BQW9GLFFBQU9BLENBQVAsR0FBVSxLQUFLLENBQUw7QUFBTyxpQkFBT3NuQixFQUFFM2MsSUFBRixDQUFPLElBQVAsRUFBWW9WLENBQVosQ0FBUCxDQUFzQixLQUFLLENBQUw7QUFBTyxpQkFBT3VILEVBQUUzYyxJQUFGLENBQU8sSUFBUCxFQUFZQyxVQUFVLENBQVYsQ0FBWixFQUF5Qm1WLENBQXpCLENBQVAsQ0FBbUMsS0FBSyxDQUFMO0FBQU8saUJBQU91SCxFQUFFM2MsSUFBRixDQUFPLElBQVAsRUFBWUMsVUFBVSxDQUFWLENBQVosRUFBeUJBLFVBQVUsQ0FBVixDQUF6QixFQUFzQ21WLENBQXRDLENBQVAsQ0FBeEYsQ0FBd0ksSUFBSXBRLElBQUUzRCxNQUFNaE0sSUFBRSxDQUFSLENBQU4sQ0FBaUIsS0FBSXluQixJQUFFLENBQU4sRUFBUUEsSUFBRXpuQixDQUFWLEVBQVl5bkIsR0FBWjtBQUFnQjlYLFVBQUU4WCxDQUFGLElBQUs3YyxVQUFVNmMsQ0FBVixDQUFMO0FBQWhCLE9BQWtDLE9BQU85WCxFQUFFM1AsQ0FBRixJQUFLK2YsQ0FBTCxFQUFPdUgsRUFBRTdjLEtBQUYsQ0FBUSxJQUFSLEVBQWFrRixDQUFiLENBQWQ7QUFBOEIsS0FBdlY7QUFBd1YsR0FBNVc7QUFBQSxNQUE2V2laLElBQUUsU0FBRkEsQ0FBRSxDQUFTM0IsQ0FBVCxFQUFXO0FBQUMsUUFBRyxDQUFDVyxFQUFFVyxRQUFGLENBQVd0QixDQUFYLENBQUosRUFBa0IsT0FBTSxFQUFOLENBQVMsSUFBR2pjLENBQUgsRUFBSyxPQUFPQSxFQUFFaWMsQ0FBRixDQUFQLENBQVlVLEVBQUUxYixTQUFGLEdBQVlnYixDQUFaLENBQWMsSUFBSWxILElBQUUsSUFBSTRILENBQUosRUFBTixDQUFZLE9BQU9BLEVBQUUxYixTQUFGLEdBQVksSUFBWixFQUFpQjhULENBQXhCO0FBQTBCLEdBQTNkO0FBQUEsTUFBNGQ4SSxJQUFFLFNBQUZBLENBQUUsQ0FBUzlJLENBQVQsRUFBVztBQUFDLFdBQU8sVUFBU2tILENBQVQsRUFBVztBQUFDLGFBQU8sUUFBTUEsQ0FBTixHQUFRLEtBQUssQ0FBYixHQUFlQSxFQUFFbEgsQ0FBRixDQUF0QjtBQUEyQixLQUE5QztBQUErQyxHQUF6aEI7QUFBQSxNQUEwaEI3VSxJQUFFLFNBQUZBLENBQUUsQ0FBUytiLENBQVQsRUFBV2xILENBQVgsRUFBYTtBQUFDLFdBQU8sUUFBTWtILENBQU4sSUFBU2puQixFQUFFMkssSUFBRixDQUFPc2MsQ0FBUCxFQUFTbEgsQ0FBVCxDQUFoQjtBQUE0QixHQUF0a0I7QUFBQSxNQUF1a0IrSSxJQUFFLFNBQUZBLENBQUUsQ0FBUzdCLENBQVQsRUFBV2xILENBQVgsRUFBYTtBQUFDLFNBQUksSUFBSTBILElBQUUxSCxFQUFFOWYsTUFBUixFQUFlMFAsSUFBRSxDQUFyQixFQUF1QkEsSUFBRThYLENBQXpCLEVBQTJCOVgsR0FBM0IsRUFBK0I7QUFBQyxVQUFHLFFBQU1zWCxDQUFULEVBQVcsT0FBT0EsSUFBRUEsRUFBRWxILEVBQUVwUSxDQUFGLENBQUYsQ0FBRjtBQUFVLFlBQU84WCxJQUFFUixDQUFGLEdBQUksS0FBSyxDQUFoQjtBQUFrQixHQUFycUI7QUFBQSxNQUFzcUJuZixJQUFFSSxLQUFLNmdCLEdBQUwsQ0FBUyxDQUFULEVBQVcsRUFBWCxJQUFlLENBQXZyQjtBQUFBLE1BQXlyQkMsSUFBRUgsRUFBRSxRQUFGLENBQTNyQjtBQUFBLE1BQXVzQkksSUFBRSxTQUFGQSxDQUFFLENBQVNoQyxDQUFULEVBQVc7QUFBQyxRQUFJbEgsSUFBRWlKLEVBQUUvQixDQUFGLENBQU4sQ0FBVyxPQUFNLFlBQVUsT0FBT2xILENBQWpCLElBQW9CLEtBQUdBLENBQXZCLElBQTBCQSxLQUFHalksQ0FBbkM7QUFBcUMsR0FBcndCLENBQXN3QjhmLEVBQUVzQixJQUFGLEdBQU90QixFQUFFbGdCLE9BQUYsR0FBVSxVQUFTdWYsQ0FBVCxFQUFXbEgsQ0FBWCxFQUFhMEgsQ0FBYixFQUFlO0FBQUMsUUFBSTlYLENBQUosRUFBTTJYLENBQU4sQ0FBUSxJQUFHdkgsSUFBRW1JLEVBQUVuSSxDQUFGLEVBQUkwSCxDQUFKLENBQUYsRUFBU3dCLEVBQUVoQyxDQUFGLENBQVosRUFBaUIsS0FBSXRYLElBQUUsQ0FBRixFQUFJMlgsSUFBRUwsRUFBRWhuQixNQUFaLEVBQW1CMFAsSUFBRTJYLENBQXJCLEVBQXVCM1gsR0FBdkI7QUFBMkJvUSxRQUFFa0gsRUFBRXRYLENBQUYsQ0FBRixFQUFPQSxDQUFQLEVBQVNzWCxDQUFUO0FBQTNCLEtBQWpCLE1BQTREO0FBQUMsVUFBSWpuQixJQUFFNG5CLEVBQUVuZ0IsSUFBRixDQUFPd2YsQ0FBUCxDQUFOLENBQWdCLEtBQUl0WCxJQUFFLENBQUYsRUFBSTJYLElBQUV0bkIsRUFBRUMsTUFBWixFQUFtQjBQLElBQUUyWCxDQUFyQixFQUF1QjNYLEdBQXZCO0FBQTJCb1EsVUFBRWtILEVBQUVqbkIsRUFBRTJQLENBQUYsQ0FBRixDQUFGLEVBQVUzUCxFQUFFMlAsQ0FBRixDQUFWLEVBQWVzWCxDQUFmO0FBQTNCO0FBQTZDLFlBQU9BLENBQVA7QUFBUyxHQUE1SyxFQUE2S1csRUFBRTNmLEdBQUYsR0FBTTJmLEVBQUV1QixPQUFGLEdBQVUsVUFBU2xDLENBQVQsRUFBV2xILENBQVgsRUFBYTBILENBQWIsRUFBZTtBQUFDMUgsUUFBRW9JLEVBQUVwSSxDQUFGLEVBQUkwSCxDQUFKLENBQUYsQ0FBUyxLQUFJLElBQUk5WCxJQUFFLENBQUNzWixFQUFFaEMsQ0FBRixDQUFELElBQU9XLEVBQUVuZ0IsSUFBRixDQUFPd2YsQ0FBUCxDQUFiLEVBQXVCSyxJQUFFLENBQUMzWCxLQUFHc1gsQ0FBSixFQUFPaG5CLE1BQWhDLEVBQXVDRCxJQUFFZ00sTUFBTXNiLENBQU4sQ0FBekMsRUFBa0RGLElBQUUsQ0FBeEQsRUFBMERBLElBQUVFLENBQTVELEVBQThERixHQUE5RCxFQUFrRTtBQUFDLFVBQUlNLElBQUUvWCxJQUFFQSxFQUFFeVgsQ0FBRixDQUFGLEdBQU9BLENBQWIsQ0FBZXBuQixFQUFFb25CLENBQUYsSUFBS3JILEVBQUVrSCxFQUFFUyxDQUFGLENBQUYsRUFBT0EsQ0FBUCxFQUFTVCxDQUFULENBQUw7QUFBaUIsWUFBT2puQixDQUFQO0FBQVMsR0FBbFUsQ0FBbVUsSUFBSW9wQixJQUFFLFNBQUZBLENBQUUsQ0FBUzdCLENBQVQsRUFBVztBQUFDLFdBQU8sVUFBU04sQ0FBVCxFQUFXbEgsQ0FBWCxFQUFhMEgsQ0FBYixFQUFlOVgsQ0FBZixFQUFpQjtBQUFDLFVBQUkyWCxJQUFFLEtBQUcxYyxVQUFVM0ssTUFBbkIsQ0FBMEIsT0FBTyxVQUFTZ25CLENBQVQsRUFBV2xILENBQVgsRUFBYTBILENBQWIsRUFBZTlYLENBQWYsRUFBaUI7QUFBQyxZQUFJMlgsSUFBRSxDQUFDMkIsRUFBRWhDLENBQUYsQ0FBRCxJQUFPVyxFQUFFbmdCLElBQUYsQ0FBT3dmLENBQVAsQ0FBYjtBQUFBLFlBQXVCam5CLElBQUUsQ0FBQ3NuQixLQUFHTCxDQUFKLEVBQU9obkIsTUFBaEM7QUFBQSxZQUF1Q21uQixJQUFFLElBQUVHLENBQUYsR0FBSSxDQUFKLEdBQU12bkIsSUFBRSxDQUFqRCxDQUFtRCxLQUFJMlAsTUFBSThYLElBQUVSLEVBQUVLLElBQUVBLEVBQUVGLENBQUYsQ0FBRixHQUFPQSxDQUFULENBQUYsRUFBY0EsS0FBR0csQ0FBckIsQ0FBSixFQUE0QixLQUFHSCxDQUFILElBQU1BLElBQUVwbkIsQ0FBcEMsRUFBc0NvbkIsS0FBR0csQ0FBekMsRUFBMkM7QUFBQyxjQUFJRyxJQUFFSixJQUFFQSxFQUFFRixDQUFGLENBQUYsR0FBT0EsQ0FBYixDQUFlSyxJQUFFMUgsRUFBRTBILENBQUYsRUFBSVIsRUFBRVMsQ0FBRixDQUFKLEVBQVNBLENBQVQsRUFBV1QsQ0FBWCxDQUFGO0FBQWdCLGdCQUFPUSxDQUFQO0FBQVMsT0FBekosQ0FBMEpSLENBQTFKLEVBQTRKaUIsRUFBRW5JLENBQUYsRUFBSXBRLENBQUosRUFBTSxDQUFOLENBQTVKLEVBQXFLOFgsQ0FBckssRUFBdUtILENBQXZLLENBQVA7QUFBaUwsS0FBcE87QUFBcU8sR0FBdlAsQ0FBd1BNLEVBQUV5QixNQUFGLEdBQVN6QixFQUFFMEIsS0FBRixHQUFRMUIsRUFBRTJCLE1BQUYsR0FBU0gsRUFBRSxDQUFGLENBQTFCLEVBQStCeEIsRUFBRTRCLFdBQUYsR0FBYzVCLEVBQUU2QixLQUFGLEdBQVFMLEVBQUUsQ0FBQyxDQUFILENBQXJELEVBQTJEeEIsRUFBRXhFLElBQUYsR0FBT3dFLEVBQUU4QixNQUFGLEdBQVMsVUFBU3pDLENBQVQsRUFBV2xILENBQVgsRUFBYTBILENBQWIsRUFBZTtBQUFDLFFBQUk5WCxJQUFFLENBQUNzWixFQUFFaEMsQ0FBRixJQUFLVyxFQUFFN2EsU0FBUCxHQUFpQjZhLEVBQUUrQixPQUFwQixFQUE2QjFDLENBQTdCLEVBQStCbEgsQ0FBL0IsRUFBaUMwSCxDQUFqQyxDQUFOLENBQTBDLElBQUcsS0FBSyxDQUFMLEtBQVM5WCxDQUFULElBQVksQ0FBQyxDQUFELEtBQUtBLENBQXBCLEVBQXNCLE9BQU9zWCxFQUFFdFgsQ0FBRixDQUFQO0FBQVksR0FBdkssRUFBd0tpWSxFQUFFL2YsTUFBRixHQUFTK2YsRUFBRWdDLE1BQUYsR0FBUyxVQUFTM0MsQ0FBVCxFQUFXdFgsQ0FBWCxFQUFhb1EsQ0FBYixFQUFlO0FBQUMsUUFBSXVILElBQUUsRUFBTixDQUFTLE9BQU8zWCxJQUFFd1ksRUFBRXhZLENBQUYsRUFBSW9RLENBQUosQ0FBRixFQUFTNkgsRUFBRXNCLElBQUYsQ0FBT2pDLENBQVAsRUFBUyxVQUFTQSxDQUFULEVBQVdsSCxDQUFYLEVBQWEwSCxDQUFiLEVBQWU7QUFBQzlYLFFBQUVzWCxDQUFGLEVBQUlsSCxDQUFKLEVBQU0wSCxDQUFOLEtBQVVILEVBQUVqZixJQUFGLENBQU80ZSxDQUFQLENBQVY7QUFBb0IsS0FBN0MsQ0FBVCxFQUF3REssQ0FBL0Q7QUFBaUUsR0FBcFIsRUFBcVJNLEVBQUU3SyxNQUFGLEdBQVMsVUFBU2tLLENBQVQsRUFBV2xILENBQVgsRUFBYTBILENBQWIsRUFBZTtBQUFDLFdBQU9HLEVBQUUvZixNQUFGLENBQVNvZixDQUFULEVBQVdXLEVBQUVpQyxNQUFGLENBQVMxQixFQUFFcEksQ0FBRixDQUFULENBQVgsRUFBMEIwSCxDQUExQixDQUFQO0FBQW9DLEdBQWxWLEVBQW1WRyxFQUFFekUsS0FBRixHQUFReUUsRUFBRTljLEdBQUYsR0FBTSxVQUFTbWMsQ0FBVCxFQUFXbEgsQ0FBWCxFQUFhMEgsQ0FBYixFQUFlO0FBQUMxSCxRQUFFb0ksRUFBRXBJLENBQUYsRUFBSTBILENBQUosQ0FBRixDQUFTLEtBQUksSUFBSTlYLElBQUUsQ0FBQ3NaLEVBQUVoQyxDQUFGLENBQUQsSUFBT1csRUFBRW5nQixJQUFGLENBQU93ZixDQUFQLENBQWIsRUFBdUJLLElBQUUsQ0FBQzNYLEtBQUdzWCxDQUFKLEVBQU9obkIsTUFBaEMsRUFBdUNELElBQUUsQ0FBN0MsRUFBK0NBLElBQUVzbkIsQ0FBakQsRUFBbUR0bkIsR0FBbkQsRUFBdUQ7QUFBQyxVQUFJb25CLElBQUV6WCxJQUFFQSxFQUFFM1AsQ0FBRixDQUFGLEdBQU9BLENBQWIsQ0FBZSxJQUFHLENBQUMrZixFQUFFa0gsRUFBRUcsQ0FBRixDQUFGLEVBQU9BLENBQVAsRUFBU0gsQ0FBVCxDQUFKLEVBQWdCLE9BQU0sQ0FBQyxDQUFQO0FBQVMsWUFBTSxDQUFDLENBQVA7QUFBUyxHQUFuZSxFQUFvZVcsRUFBRWtDLElBQUYsR0FBT2xDLEVBQUVtQyxHQUFGLEdBQU0sVUFBUzlDLENBQVQsRUFBV2xILENBQVgsRUFBYTBILENBQWIsRUFBZTtBQUFDMUgsUUFBRW9JLEVBQUVwSSxDQUFGLEVBQUkwSCxDQUFKLENBQUYsQ0FBUyxLQUFJLElBQUk5WCxJQUFFLENBQUNzWixFQUFFaEMsQ0FBRixDQUFELElBQU9XLEVBQUVuZ0IsSUFBRixDQUFPd2YsQ0FBUCxDQUFiLEVBQXVCSyxJQUFFLENBQUMzWCxLQUFHc1gsQ0FBSixFQUFPaG5CLE1BQWhDLEVBQXVDRCxJQUFFLENBQTdDLEVBQStDQSxJQUFFc25CLENBQWpELEVBQW1EdG5CLEdBQW5ELEVBQXVEO0FBQUMsVUFBSW9uQixJQUFFelgsSUFBRUEsRUFBRTNQLENBQUYsQ0FBRixHQUFPQSxDQUFiLENBQWUsSUFBRytmLEVBQUVrSCxFQUFFRyxDQUFGLENBQUYsRUFBT0EsQ0FBUCxFQUFTSCxDQUFULENBQUgsRUFBZSxPQUFNLENBQUMsQ0FBUDtBQUFTLFlBQU0sQ0FBQyxDQUFQO0FBQVMsR0FBbG5CLEVBQW1uQlcsRUFBRXBELFFBQUYsR0FBV29ELEVBQUVvQyxRQUFGLEdBQVdwQyxFQUFFcUMsT0FBRixHQUFVLFVBQVNoRCxDQUFULEVBQVdsSCxDQUFYLEVBQWEwSCxDQUFiLEVBQWU5WCxDQUFmLEVBQWlCO0FBQUMsV0FBT3NaLEVBQUVoQyxDQUFGLE1BQU9BLElBQUVXLEVBQUVzQyxNQUFGLENBQVNqRCxDQUFULENBQVQsR0FBc0IsQ0FBQyxZQUFVLE9BQU9RLENBQWpCLElBQW9COVgsQ0FBckIsTUFBMEI4WCxJQUFFLENBQTVCLENBQXRCLEVBQXFELEtBQUdHLEVBQUV4ZixPQUFGLENBQVU2ZSxDQUFWLEVBQVlsSCxDQUFaLEVBQWMwSCxDQUFkLENBQS9EO0FBQWdGLEdBQXJ2QixFQUFzdkJHLEVBQUV1QyxNQUFGLEdBQVN6QixFQUFFLFVBQVN6QixDQUFULEVBQVdRLENBQVgsRUFBYTlYLENBQWIsRUFBZTtBQUFDLFFBQUkyWCxDQUFKLEVBQU10bkIsQ0FBTixDQUFRLE9BQU80bkIsRUFBRVUsVUFBRixDQUFhYixDQUFiLElBQWdCem5CLElBQUV5bkIsQ0FBbEIsR0FBb0JHLEVBQUVsZixPQUFGLENBQVUrZSxDQUFWLE1BQWVILElBQUVHLEVBQUUvYyxLQUFGLENBQVEsQ0FBUixFQUFVLENBQUMsQ0FBWCxDQUFGLEVBQWdCK2MsSUFBRUEsRUFBRUEsRUFBRXhuQixNQUFGLEdBQVMsQ0FBWCxDQUFqQyxDQUFwQixFQUFvRTJuQixFQUFFM2YsR0FBRixDQUFNZ2YsQ0FBTixFQUFRLFVBQVNBLENBQVQsRUFBVztBQUFDLFVBQUlsSCxJQUFFL2YsQ0FBTixDQUFRLElBQUcsQ0FBQytmLENBQUosRUFBTTtBQUFDLFlBQUd1SCxLQUFHQSxFQUFFcm5CLE1BQUwsS0FBY2duQixJQUFFNkIsRUFBRTdCLENBQUYsRUFBSUssQ0FBSixDQUFoQixHQUF3QixRQUFNTCxDQUFqQyxFQUFtQyxPQUFPbEgsSUFBRWtILEVBQUVRLENBQUYsQ0FBRjtBQUFPLGNBQU8sUUFBTTFILENBQU4sR0FBUUEsQ0FBUixHQUFVQSxFQUFFdFYsS0FBRixDQUFRd2MsQ0FBUixFQUFVdFgsQ0FBVixDQUFqQjtBQUE4QixLQUFsSCxDQUEzRTtBQUErTCxHQUF6TixDQUEvdkIsRUFBMDlCaVksRUFBRXdDLEtBQUYsR0FBUSxVQUFTbkQsQ0FBVCxFQUFXbEgsQ0FBWCxFQUFhO0FBQUMsV0FBTzZILEVBQUUzZixHQUFGLENBQU1nZixDQUFOLEVBQVFXLEVBQUVhLFFBQUYsQ0FBVzFJLENBQVgsQ0FBUixDQUFQO0FBQThCLEdBQTlnQyxFQUErZ0M2SCxFQUFFeUMsS0FBRixHQUFRLFVBQVNwRCxDQUFULEVBQVdsSCxDQUFYLEVBQWE7QUFBQyxXQUFPNkgsRUFBRS9mLE1BQUYsQ0FBU29mLENBQVQsRUFBV1csRUFBRVksT0FBRixDQUFVekksQ0FBVixDQUFYLENBQVA7QUFBZ0MsR0FBcmtDLEVBQXNrQzZILEVBQUUvYSxTQUFGLEdBQVksVUFBU29hLENBQVQsRUFBV2xILENBQVgsRUFBYTtBQUFDLFdBQU82SCxFQUFFeEUsSUFBRixDQUFPNkQsQ0FBUCxFQUFTVyxFQUFFWSxPQUFGLENBQVV6SSxDQUFWLENBQVQsQ0FBUDtBQUE4QixHQUE5bkMsRUFBK25DNkgsRUFBRWUsR0FBRixHQUFNLFVBQVMxQixDQUFULEVBQVd0WCxDQUFYLEVBQWFvUSxDQUFiLEVBQWU7QUFBQyxRQUFJMEgsQ0FBSjtBQUFBLFFBQU1ILENBQU47QUFBQSxRQUFRdG5CLElBQUUsQ0FBQyxDQUFELEdBQUcsQ0FBYjtBQUFBLFFBQWVvbkIsSUFBRSxDQUFDLENBQUQsR0FBRyxDQUFwQixDQUFzQixJQUFHLFFBQU16WCxDQUFOLElBQVMsWUFBVSxPQUFPQSxDQUFqQixJQUFvQixvQkFBaUJzWCxFQUFFLENBQUYsQ0FBakIsQ0FBcEIsSUFBMkMsUUFBTUEsQ0FBN0QsRUFBK0QsS0FBSSxJQUFJUyxJQUFFLENBQU4sRUFBUUgsSUFBRSxDQUFDTixJQUFFZ0MsRUFBRWhDLENBQUYsSUFBS0EsQ0FBTCxHQUFPVyxFQUFFc0MsTUFBRixDQUFTakQsQ0FBVCxDQUFWLEVBQXVCaG5CLE1BQXJDLEVBQTRDeW5CLElBQUVILENBQTlDLEVBQWdERyxHQUFoRDtBQUFvRCxlQUFPRCxJQUFFUixFQUFFUyxDQUFGLENBQVQsS0FBZ0IxbkIsSUFBRXluQixDQUFsQixLQUFzQnpuQixJQUFFeW5CLENBQXhCO0FBQXBELEtBQS9ELE1BQW1KOVgsSUFBRXdZLEVBQUV4WSxDQUFGLEVBQUlvUSxDQUFKLENBQUYsRUFBUzZILEVBQUVzQixJQUFGLENBQU9qQyxDQUFQLEVBQVMsVUFBU0EsQ0FBVCxFQUFXbEgsQ0FBWCxFQUFhMEgsQ0FBYixFQUFlO0FBQUNILFVBQUUzWCxFQUFFc1gsQ0FBRixFQUFJbEgsQ0FBSixFQUFNMEgsQ0FBTixDQUFGLEVBQVcsQ0FBQ0wsSUFBRUUsQ0FBRixJQUFLQSxNQUFJLENBQUMsQ0FBRCxHQUFHLENBQVAsSUFBVXRuQixNQUFJLENBQUMsQ0FBRCxHQUFHLENBQXZCLE1BQTRCQSxJQUFFaW5CLENBQUYsRUFBSUcsSUFBRUUsQ0FBbEMsQ0FBWDtBQUFnRCxLQUF6RSxDQUFULENBQW9GLE9BQU90bkIsQ0FBUDtBQUFTLEdBQTM1QyxFQUE0NUM0bkIsRUFBRTBDLEdBQUYsR0FBTSxVQUFTckQsQ0FBVCxFQUFXdFgsQ0FBWCxFQUFhb1EsQ0FBYixFQUFlO0FBQUMsUUFBSTBILENBQUo7QUFBQSxRQUFNSCxDQUFOO0FBQUEsUUFBUXRuQixJQUFFLElBQUUsQ0FBWjtBQUFBLFFBQWNvbkIsSUFBRSxJQUFFLENBQWxCLENBQW9CLElBQUcsUUFBTXpYLENBQU4sSUFBUyxZQUFVLE9BQU9BLENBQWpCLElBQW9CLG9CQUFpQnNYLEVBQUUsQ0FBRixDQUFqQixDQUFwQixJQUEyQyxRQUFNQSxDQUE3RCxFQUErRCxLQUFJLElBQUlTLElBQUUsQ0FBTixFQUFRSCxJQUFFLENBQUNOLElBQUVnQyxFQUFFaEMsQ0FBRixJQUFLQSxDQUFMLEdBQU9XLEVBQUVzQyxNQUFGLENBQVNqRCxDQUFULENBQVYsRUFBdUJobkIsTUFBckMsRUFBNEN5bkIsSUFBRUgsQ0FBOUMsRUFBZ0RHLEdBQWhEO0FBQW9ELGVBQU9ELElBQUVSLEVBQUVTLENBQUYsQ0FBVCxLQUFnQkQsSUFBRXpuQixDQUFsQixLQUFzQkEsSUFBRXluQixDQUF4QjtBQUFwRCxLQUEvRCxNQUFtSjlYLElBQUV3WSxFQUFFeFksQ0FBRixFQUFJb1EsQ0FBSixDQUFGLEVBQVM2SCxFQUFFc0IsSUFBRixDQUFPakMsQ0FBUCxFQUFTLFVBQVNBLENBQVQsRUFBV2xILENBQVgsRUFBYTBILENBQWIsRUFBZTtBQUFDLE9BQUMsQ0FBQ0gsSUFBRTNYLEVBQUVzWCxDQUFGLEVBQUlsSCxDQUFKLEVBQU0wSCxDQUFOLENBQUgsSUFBYUwsQ0FBYixJQUFnQkUsTUFBSSxJQUFFLENBQU4sSUFBU3RuQixNQUFJLElBQUUsQ0FBaEMsTUFBcUNBLElBQUVpbkIsQ0FBRixFQUFJRyxJQUFFRSxDQUEzQztBQUE4QyxLQUF2RSxDQUFULENBQWtGLE9BQU90bkIsQ0FBUDtBQUFTLEdBQXByRCxFQUFxckQ0bkIsRUFBRTJDLE9BQUYsR0FBVSxVQUFTdEQsQ0FBVCxFQUFXO0FBQUMsV0FBT1csRUFBRTRDLE1BQUYsQ0FBU3ZELENBQVQsRUFBVyxJQUFFLENBQWIsQ0FBUDtBQUF1QixHQUFsdUQsRUFBbXVEVyxFQUFFNEMsTUFBRixHQUFTLFVBQVN2RCxDQUFULEVBQVdsSCxDQUFYLEVBQWEwSCxDQUFiLEVBQWU7QUFBQyxRQUFHLFFBQU0xSCxDQUFOLElBQVMwSCxDQUFaLEVBQWMsT0FBT3dCLEVBQUVoQyxDQUFGLE1BQU9BLElBQUVXLEVBQUVzQyxNQUFGLENBQVNqRCxDQUFULENBQVQsR0FBc0JBLEVBQUVXLEVBQUU2QyxNQUFGLENBQVN4RCxFQUFFaG5CLE1BQUYsR0FBUyxDQUFsQixDQUFGLENBQTdCLENBQXFELElBQUkwUCxJQUFFc1osRUFBRWhDLENBQUYsSUFBS1csRUFBRThDLEtBQUYsQ0FBUXpELENBQVIsQ0FBTCxHQUFnQlcsRUFBRXNDLE1BQUYsQ0FBU2pELENBQVQsQ0FBdEI7QUFBQSxRQUFrQ0ssSUFBRTBCLEVBQUVyWixDQUFGLENBQXBDLENBQXlDb1EsSUFBRTdYLEtBQUt5Z0IsR0FBTCxDQUFTemdCLEtBQUtvaUIsR0FBTCxDQUFTdkssQ0FBVCxFQUFXdUgsQ0FBWCxDQUFULEVBQXVCLENBQXZCLENBQUYsQ0FBNEIsS0FBSSxJQUFJdG5CLElBQUVzbkIsSUFBRSxDQUFSLEVBQVVGLElBQUUsQ0FBaEIsRUFBa0JBLElBQUVySCxDQUFwQixFQUFzQnFILEdBQXRCLEVBQTBCO0FBQUMsVUFBSU0sSUFBRUUsRUFBRTZDLE1BQUYsQ0FBU3JELENBQVQsRUFBV3BuQixDQUFYLENBQU47QUFBQSxVQUFvQnVuQixJQUFFNVgsRUFBRXlYLENBQUYsQ0FBdEIsQ0FBMkJ6WCxFQUFFeVgsQ0FBRixJQUFLelgsRUFBRStYLENBQUYsQ0FBTCxFQUFVL1gsRUFBRStYLENBQUYsSUFBS0gsQ0FBZjtBQUFpQixZQUFPNVgsRUFBRWpGLEtBQUYsQ0FBUSxDQUFSLEVBQVVxVixDQUFWLENBQVA7QUFBb0IsR0FBLzlELEVBQWcrRDZILEVBQUUrQyxNQUFGLEdBQVMsVUFBUzFELENBQVQsRUFBV3RYLENBQVgsRUFBYW9RLENBQWIsRUFBZTtBQUFDLFFBQUl1SCxJQUFFLENBQU4sQ0FBUSxPQUFPM1gsSUFBRXdZLEVBQUV4WSxDQUFGLEVBQUlvUSxDQUFKLENBQUYsRUFBUzZILEVBQUV3QyxLQUFGLENBQVF4QyxFQUFFM2YsR0FBRixDQUFNZ2YsQ0FBTixFQUFRLFVBQVNBLENBQVQsRUFBV2xILENBQVgsRUFBYTBILENBQWIsRUFBZTtBQUFDLGFBQU0sRUFBQ3hlLE9BQU1nZSxDQUFQLEVBQVNqb0IsT0FBTXNvQixHQUFmLEVBQW1Cc0QsVUFBU2piLEVBQUVzWCxDQUFGLEVBQUlsSCxDQUFKLEVBQU0wSCxDQUFOLENBQTVCLEVBQU47QUFBNEMsS0FBcEUsRUFBc0VuZixJQUF0RSxDQUEyRSxVQUFTMmUsQ0FBVCxFQUFXbEgsQ0FBWCxFQUFhO0FBQUMsVUFBSTBILElBQUVSLEVBQUUyRCxRQUFSO0FBQUEsVUFBaUJqYixJQUFFb1EsRUFBRTZLLFFBQXJCLENBQThCLElBQUduRCxNQUFJOVgsQ0FBUCxFQUFTO0FBQUMsWUFBR0EsSUFBRThYLENBQUYsSUFBSyxLQUFLLENBQUwsS0FBU0EsQ0FBakIsRUFBbUIsT0FBTyxDQUFQLENBQVMsSUFBR0EsSUFBRTlYLENBQUYsSUFBSyxLQUFLLENBQUwsS0FBU0EsQ0FBakIsRUFBbUIsT0FBTSxDQUFDLENBQVA7QUFBUyxjQUFPc1gsRUFBRWpvQixLQUFGLEdBQVErZ0IsRUFBRS9nQixLQUFqQjtBQUF1QixLQUFoTixDQUFSLEVBQTBOLE9BQTFOLENBQWhCO0FBQW1QLEdBQXB2RSxDQUFxdkUsSUFBSW1NLElBQUUsU0FBRkEsQ0FBRSxDQUFTaWMsQ0FBVCxFQUFXckgsQ0FBWCxFQUFhO0FBQUMsV0FBTyxVQUFTcFEsQ0FBVCxFQUFXMlgsQ0FBWCxFQUFhTCxDQUFiLEVBQWU7QUFBQyxVQUFJam5CLElBQUUrZixJQUFFLENBQUMsRUFBRCxFQUFJLEVBQUosQ0FBRixHQUFVLEVBQWhCLENBQW1CLE9BQU91SCxJQUFFYSxFQUFFYixDQUFGLEVBQUlMLENBQUosQ0FBRixFQUFTVyxFQUFFc0IsSUFBRixDQUFPdlosQ0FBUCxFQUFTLFVBQVNzWCxDQUFULEVBQVdsSCxDQUFYLEVBQWE7QUFBQyxZQUFJMEgsSUFBRUgsRUFBRUwsQ0FBRixFQUFJbEgsQ0FBSixFQUFNcFEsQ0FBTixDQUFOLENBQWV5WCxFQUFFcG5CLENBQUYsRUFBSWluQixDQUFKLEVBQU1RLENBQU47QUFBUyxPQUEvQyxDQUFULEVBQTBEem5CLENBQWpFO0FBQW1FLEtBQTdHO0FBQThHLEdBQWxJLENBQW1JNG5CLEVBQUVpRCxPQUFGLEdBQVUxZixFQUFFLFVBQVM4YixDQUFULEVBQVdsSCxDQUFYLEVBQWEwSCxDQUFiLEVBQWU7QUFBQ3ZjLE1BQUUrYixDQUFGLEVBQUlRLENBQUosSUFBT1IsRUFBRVEsQ0FBRixFQUFLcGYsSUFBTCxDQUFVMFgsQ0FBVixDQUFQLEdBQW9Ca0gsRUFBRVEsQ0FBRixJQUFLLENBQUMxSCxDQUFELENBQXpCO0FBQTZCLEdBQS9DLENBQVYsRUFBMkQ2SCxFQUFFa0QsT0FBRixHQUFVM2YsRUFBRSxVQUFTOGIsQ0FBVCxFQUFXbEgsQ0FBWCxFQUFhMEgsQ0FBYixFQUFlO0FBQUNSLE1BQUVRLENBQUYsSUFBSzFILENBQUw7QUFBTyxHQUF6QixDQUFyRSxFQUFnRzZILEVBQUVtRCxPQUFGLEdBQVU1ZixFQUFFLFVBQVM4YixDQUFULEVBQVdsSCxDQUFYLEVBQWEwSCxDQUFiLEVBQWU7QUFBQ3ZjLE1BQUUrYixDQUFGLEVBQUlRLENBQUosSUFBT1IsRUFBRVEsQ0FBRixHQUFQLEdBQWNSLEVBQUVRLENBQUYsSUFBSyxDQUFuQjtBQUFxQixHQUF2QyxDQUExRyxDQUFtSixJQUFJdUQsSUFBRSxrRUFBTixDQUF5RXBELEVBQUVxRCxPQUFGLEdBQVUsVUFBU2hFLENBQVQsRUFBVztBQUFDLFdBQU9BLElBQUVXLEVBQUVsZixPQUFGLENBQVV1ZSxDQUFWLElBQWFNLEVBQUU1YyxJQUFGLENBQU9zYyxDQUFQLENBQWIsR0FBdUJXLEVBQUVzRCxRQUFGLENBQVdqRSxDQUFYLElBQWNBLEVBQUVrRSxLQUFGLENBQVFILENBQVIsQ0FBZCxHQUF5Qi9CLEVBQUVoQyxDQUFGLElBQUtXLEVBQUUzZixHQUFGLENBQU1nZixDQUFOLEVBQVFXLEVBQUVTLFFBQVYsQ0FBTCxHQUF5QlQsRUFBRXNDLE1BQUYsQ0FBU2pELENBQVQsQ0FBM0UsR0FBdUYsRUFBOUY7QUFBaUcsR0FBdkgsRUFBd0hXLEVBQUV3RCxJQUFGLEdBQU8sVUFBU25FLENBQVQsRUFBVztBQUFDLFdBQU8sUUFBTUEsQ0FBTixHQUFRLENBQVIsR0FBVWdDLEVBQUVoQyxDQUFGLElBQUtBLEVBQUVobkIsTUFBUCxHQUFjMm5CLEVBQUVuZ0IsSUFBRixDQUFPd2YsQ0FBUCxFQUFVaG5CLE1BQXpDO0FBQWdELEdBQTNMLEVBQTRMMm5CLEVBQUV5RCxTQUFGLEdBQVlsZ0IsRUFBRSxVQUFTOGIsQ0FBVCxFQUFXbEgsQ0FBWCxFQUFhMEgsQ0FBYixFQUFlO0FBQUNSLE1BQUVRLElBQUUsQ0FBRixHQUFJLENBQU4sRUFBU3BmLElBQVQsQ0FBYzBYLENBQWQ7QUFBaUIsR0FBbkMsRUFBb0MsQ0FBQyxDQUFyQyxDQUF4TSxFQUFnUDZILEVBQUUwRCxLQUFGLEdBQVExRCxFQUFFMkQsSUFBRixHQUFPM0QsRUFBRTRELElBQUYsR0FBTyxVQUFTdkUsQ0FBVCxFQUFXbEgsQ0FBWCxFQUFhMEgsQ0FBYixFQUFlO0FBQUMsV0FBTyxRQUFNUixDQUFOLElBQVNBLEVBQUVobkIsTUFBRixHQUFTLENBQWxCLEdBQW9CLFFBQU04ZixDQUFOLEdBQVEsS0FBSyxDQUFiLEdBQWUsRUFBbkMsR0FBc0MsUUFBTUEsQ0FBTixJQUFTMEgsQ0FBVCxHQUFXUixFQUFFLENBQUYsQ0FBWCxHQUFnQlcsRUFBRTZELE9BQUYsQ0FBVXhFLENBQVYsRUFBWUEsRUFBRWhuQixNQUFGLEdBQVM4ZixDQUFyQixDQUE3RDtBQUFxRixHQUEzVyxFQUE0VzZILEVBQUU2RCxPQUFGLEdBQVUsVUFBU3hFLENBQVQsRUFBV2xILENBQVgsRUFBYTBILENBQWIsRUFBZTtBQUFDLFdBQU9GLEVBQUU1YyxJQUFGLENBQU9zYyxDQUFQLEVBQVMsQ0FBVCxFQUFXL2UsS0FBS3lnQixHQUFMLENBQVMsQ0FBVCxFQUFXMUIsRUFBRWhuQixNQUFGLElBQVUsUUFBTThmLENBQU4sSUFBUzBILENBQVQsR0FBVyxDQUFYLEdBQWExSCxDQUF2QixDQUFYLENBQVgsQ0FBUDtBQUF5RCxHQUEvYixFQUFnYzZILEVBQUU4RCxJQUFGLEdBQU8sVUFBU3pFLENBQVQsRUFBV2xILENBQVgsRUFBYTBILENBQWIsRUFBZTtBQUFDLFdBQU8sUUFBTVIsQ0FBTixJQUFTQSxFQUFFaG5CLE1BQUYsR0FBUyxDQUFsQixHQUFvQixRQUFNOGYsQ0FBTixHQUFRLEtBQUssQ0FBYixHQUFlLEVBQW5DLEdBQXNDLFFBQU1BLENBQU4sSUFBUzBILENBQVQsR0FBV1IsRUFBRUEsRUFBRWhuQixNQUFGLEdBQVMsQ0FBWCxDQUFYLEdBQXlCMm5CLEVBQUUrRCxJQUFGLENBQU8xRSxDQUFQLEVBQVMvZSxLQUFLeWdCLEdBQUwsQ0FBUyxDQUFULEVBQVcxQixFQUFFaG5CLE1BQUYsR0FBUzhmLENBQXBCLENBQVQsQ0FBdEU7QUFBdUcsR0FBOWpCLEVBQStqQjZILEVBQUUrRCxJQUFGLEdBQU8vRCxFQUFFZ0UsSUFBRixHQUFPaEUsRUFBRWlFLElBQUYsR0FBTyxVQUFTNUUsQ0FBVCxFQUFXbEgsQ0FBWCxFQUFhMEgsQ0FBYixFQUFlO0FBQUMsV0FBT0YsRUFBRTVjLElBQUYsQ0FBT3NjLENBQVAsRUFBUyxRQUFNbEgsQ0FBTixJQUFTMEgsQ0FBVCxHQUFXLENBQVgsR0FBYTFILENBQXRCLENBQVA7QUFBZ0MsR0FBcG9CLEVBQXFvQjZILEVBQUVrRSxPQUFGLEdBQVUsVUFBUzdFLENBQVQsRUFBVztBQUFDLFdBQU9XLEVBQUUvZixNQUFGLENBQVNvZixDQUFULEVBQVc4RSxPQUFYLENBQVA7QUFBMkIsR0FBdHJCLENBQXVyQixJQUFJQyxJQUFFLFNBQUZBLENBQUUsQ0FBUy9FLENBQVQsRUFBV2xILENBQVgsRUFBYTBILENBQWIsRUFBZTlYLENBQWYsRUFBaUI7QUFBQyxTQUFJLElBQUkyWCxJQUFFLENBQUMzWCxJQUFFQSxLQUFHLEVBQU4sRUFBVTFQLE1BQWhCLEVBQXVCRCxJQUFFLENBQXpCLEVBQTJCb25CLElBQUU0QixFQUFFL0IsQ0FBRixDQUFqQyxFQUFzQ2puQixJQUFFb25CLENBQXhDLEVBQTBDcG5CLEdBQTFDLEVBQThDO0FBQUMsVUFBSTBuQixJQUFFVCxFQUFFam5CLENBQUYsQ0FBTixDQUFXLElBQUdpcEIsRUFBRXZCLENBQUYsTUFBT0UsRUFBRWxmLE9BQUYsQ0FBVWdmLENBQVYsS0FBY0UsRUFBRXFFLFdBQUYsQ0FBY3ZFLENBQWQsQ0FBckIsQ0FBSDtBQUEwQyxZQUFHM0gsQ0FBSCxFQUFLLEtBQUksSUFBSXdILElBQUUsQ0FBTixFQUFRdmMsSUFBRTBjLEVBQUV6bkIsTUFBaEIsRUFBdUJzbkIsSUFBRXZjLENBQXpCO0FBQTRCMkUsWUFBRTJYLEdBQUYsSUFBT0ksRUFBRUgsR0FBRixDQUFQO0FBQTVCLFNBQUwsTUFBb0R5RSxFQUFFdEUsQ0FBRixFQUFJM0gsQ0FBSixFQUFNMEgsQ0FBTixFQUFROVgsQ0FBUixHQUFXMlgsSUFBRTNYLEVBQUUxUCxNQUFmO0FBQTlGLGFBQXlId25CLE1BQUk5WCxFQUFFMlgsR0FBRixJQUFPSSxDQUFYO0FBQWMsWUFBTy9YLENBQVA7QUFBUyxHQUFsTyxDQUFtT2lZLEVBQUVzRSxPQUFGLEdBQVUsVUFBU2pGLENBQVQsRUFBV2xILENBQVgsRUFBYTtBQUFDLFdBQU9pTSxFQUFFL0UsQ0FBRixFQUFJbEgsQ0FBSixFQUFNLENBQUMsQ0FBUCxDQUFQO0FBQWlCLEdBQXpDLEVBQTBDNkgsRUFBRXVFLE9BQUYsR0FBVXpELEVBQUUsVUFBU3pCLENBQVQsRUFBV2xILENBQVgsRUFBYTtBQUFDLFdBQU82SCxFQUFFd0UsVUFBRixDQUFhbkYsQ0FBYixFQUFlbEgsQ0FBZixDQUFQO0FBQXlCLEdBQXpDLENBQXBELEVBQStGNkgsRUFBRXlFLElBQUYsR0FBT3pFLEVBQUUwRSxNQUFGLEdBQVMsVUFBU3JGLENBQVQsRUFBV2xILENBQVgsRUFBYTBILENBQWIsRUFBZTlYLENBQWYsRUFBaUI7QUFBQ2lZLE1BQUUyRSxTQUFGLENBQVl4TSxDQUFaLE1BQWlCcFEsSUFBRThYLENBQUYsRUFBSUEsSUFBRTFILENBQU4sRUFBUUEsSUFBRSxDQUFDLENBQTVCLEdBQStCLFFBQU0wSCxDQUFOLEtBQVVBLElBQUVVLEVBQUVWLENBQUYsRUFBSTlYLENBQUosQ0FBWixDQUEvQixDQUFtRCxLQUFJLElBQUkyWCxJQUFFLEVBQU4sRUFBU3RuQixJQUFFLEVBQVgsRUFBY29uQixJQUFFLENBQWhCLEVBQWtCTSxJQUFFc0IsRUFBRS9CLENBQUYsQ0FBeEIsRUFBNkJHLElBQUVNLENBQS9CLEVBQWlDTixHQUFqQyxFQUFxQztBQUFDLFVBQUlHLElBQUVOLEVBQUVHLENBQUYsQ0FBTjtBQUFBLFVBQVdwYyxJQUFFeWMsSUFBRUEsRUFBRUYsQ0FBRixFQUFJSCxDQUFKLEVBQU1ILENBQU4sQ0FBRixHQUFXTSxDQUF4QixDQUEwQnhILEtBQUcsQ0FBQzBILENBQUosSUFBT0wsS0FBR3BuQixNQUFJZ0wsQ0FBUCxJQUFVc2MsRUFBRWpmLElBQUYsQ0FBT2tmLENBQVAsQ0FBVixFQUFvQnZuQixJQUFFZ0wsQ0FBN0IsSUFBZ0N5YyxJQUFFRyxFQUFFcEQsUUFBRixDQUFXeGtCLENBQVgsRUFBYWdMLENBQWIsTUFBa0JoTCxFQUFFcUksSUFBRixDQUFPMkMsQ0FBUCxHQUFVc2MsRUFBRWpmLElBQUYsQ0FBT2tmLENBQVAsQ0FBNUIsQ0FBRixHQUF5Q0ssRUFBRXBELFFBQUYsQ0FBVzhDLENBQVgsRUFBYUMsQ0FBYixLQUFpQkQsRUFBRWpmLElBQUYsQ0FBT2tmLENBQVAsQ0FBMUY7QUFBb0csWUFBT0QsQ0FBUDtBQUFTLEdBQWpXLEVBQWtXTSxFQUFFNEUsS0FBRixHQUFROUQsRUFBRSxVQUFTekIsQ0FBVCxFQUFXO0FBQUMsV0FBT1csRUFBRXlFLElBQUYsQ0FBT0wsRUFBRS9FLENBQUYsRUFBSSxDQUFDLENBQUwsRUFBTyxDQUFDLENBQVIsQ0FBUCxDQUFQO0FBQTBCLEdBQXhDLENBQTFXLEVBQW9aVyxFQUFFNkUsWUFBRixHQUFlLFVBQVN4RixDQUFULEVBQVc7QUFBQyxTQUFJLElBQUlsSCxJQUFFLEVBQU4sRUFBUzBILElBQUU3YyxVQUFVM0ssTUFBckIsRUFBNEIwUCxJQUFFLENBQTlCLEVBQWdDMlgsSUFBRTBCLEVBQUUvQixDQUFGLENBQXRDLEVBQTJDdFgsSUFBRTJYLENBQTdDLEVBQStDM1gsR0FBL0MsRUFBbUQ7QUFBQyxVQUFJM1AsSUFBRWluQixFQUFFdFgsQ0FBRixDQUFOLENBQVcsSUFBRyxDQUFDaVksRUFBRXBELFFBQUYsQ0FBV3pFLENBQVgsRUFBYS9mLENBQWIsQ0FBSixFQUFvQjtBQUFDLFlBQUlvbkIsQ0FBSixDQUFNLEtBQUlBLElBQUUsQ0FBTixFQUFRQSxJQUFFSyxDQUFGLElBQUtHLEVBQUVwRCxRQUFGLENBQVc1WixVQUFVd2MsQ0FBVixDQUFYLEVBQXdCcG5CLENBQXhCLENBQWIsRUFBd0NvbkIsR0FBeEMsSUFBNkNBLE1BQUlLLENBQUosSUFBTzFILEVBQUUxWCxJQUFGLENBQU9ySSxDQUFQLENBQVA7QUFBaUI7QUFBQyxZQUFPK2YsQ0FBUDtBQUFTLEdBQWpsQixFQUFrbEI2SCxFQUFFd0UsVUFBRixHQUFhMUQsRUFBRSxVQUFTekIsQ0FBVCxFQUFXbEgsQ0FBWCxFQUFhO0FBQUMsV0FBT0EsSUFBRWlNLEVBQUVqTSxDQUFGLEVBQUksQ0FBQyxDQUFMLEVBQU8sQ0FBQyxDQUFSLENBQUYsRUFBYTZILEVBQUUvZixNQUFGLENBQVNvZixDQUFULEVBQVcsVUFBU0EsQ0FBVCxFQUFXO0FBQUMsYUFBTSxDQUFDVyxFQUFFcEQsUUFBRixDQUFXekUsQ0FBWCxFQUFha0gsQ0FBYixDQUFQO0FBQXVCLEtBQTlDLENBQXBCO0FBQW9FLEdBQXBGLENBQS9sQixFQUFxckJXLEVBQUU4RSxLQUFGLEdBQVEsVUFBU3pGLENBQVQsRUFBVztBQUFDLFNBQUksSUFBSWxILElBQUVrSCxLQUFHVyxFQUFFZSxHQUFGLENBQU0xQixDQUFOLEVBQVErQixDQUFSLEVBQVcvb0IsTUFBZCxJQUFzQixDQUE1QixFQUE4QnduQixJQUFFemIsTUFBTStULENBQU4sQ0FBaEMsRUFBeUNwUSxJQUFFLENBQS9DLEVBQWlEQSxJQUFFb1EsQ0FBbkQsRUFBcURwUSxHQUFyRDtBQUF5RDhYLFFBQUU5WCxDQUFGLElBQUtpWSxFQUFFd0MsS0FBRixDQUFRbkQsQ0FBUixFQUFVdFgsQ0FBVixDQUFMO0FBQXpELEtBQTJFLE9BQU84WCxDQUFQO0FBQVMsR0FBN3hCLEVBQTh4QkcsRUFBRStFLEdBQUYsR0FBTWpFLEVBQUVkLEVBQUU4RSxLQUFKLENBQXB5QixFQUEreUI5RSxFQUFFM2QsTUFBRixHQUFTLFVBQVNnZCxDQUFULEVBQVdsSCxDQUFYLEVBQWE7QUFBQyxTQUFJLElBQUkwSCxJQUFFLEVBQU4sRUFBUzlYLElBQUUsQ0FBWCxFQUFhMlgsSUFBRTBCLEVBQUUvQixDQUFGLENBQW5CLEVBQXdCdFgsSUFBRTJYLENBQTFCLEVBQTRCM1gsR0FBNUI7QUFBZ0NvUSxVQUFFMEgsRUFBRVIsRUFBRXRYLENBQUYsQ0FBRixJQUFRb1EsRUFBRXBRLENBQUYsQ0FBVixHQUFlOFgsRUFBRVIsRUFBRXRYLENBQUYsRUFBSyxDQUFMLENBQUYsSUFBV3NYLEVBQUV0WCxDQUFGLEVBQUssQ0FBTCxDQUExQjtBQUFoQyxLQUFrRSxPQUFPOFgsQ0FBUDtBQUFTLEdBQWo1QixDQUFrNUIsSUFBSW1GLElBQUUsU0FBRkEsQ0FBRSxDQUFTNXNCLENBQVQsRUFBVztBQUFDLFdBQU8sVUFBU2luQixDQUFULEVBQVdsSCxDQUFYLEVBQWEwSCxDQUFiLEVBQWU7QUFBQzFILFVBQUVvSSxFQUFFcEksQ0FBRixFQUFJMEgsQ0FBSixDQUFGLENBQVMsS0FBSSxJQUFJOVgsSUFBRXFaLEVBQUUvQixDQUFGLENBQU4sRUFBV0ssSUFBRSxJQUFFdG5CLENBQUYsR0FBSSxDQUFKLEdBQU0yUCxJQUFFLENBQXpCLEVBQTJCLEtBQUcyWCxDQUFILElBQU1BLElBQUUzWCxDQUFuQyxFQUFxQzJYLEtBQUd0bkIsQ0FBeEM7QUFBMEMsWUFBRytmLEVBQUVrSCxFQUFFSyxDQUFGLENBQUYsRUFBT0EsQ0FBUCxFQUFTTCxDQUFULENBQUgsRUFBZSxPQUFPSyxDQUFQO0FBQXpELE9BQWtFLE9BQU0sQ0FBQyxDQUFQO0FBQVMsS0FBM0c7QUFBNEcsR0FBOUgsQ0FBK0hNLEVBQUU3YSxTQUFGLEdBQVk2ZixFQUFFLENBQUYsQ0FBWixFQUFpQmhGLEVBQUVpRixhQUFGLEdBQWdCRCxFQUFFLENBQUMsQ0FBSCxDQUFqQyxFQUF1Q2hGLEVBQUVrRixXQUFGLEdBQWMsVUFBUzdGLENBQVQsRUFBV2xILENBQVgsRUFBYTBILENBQWIsRUFBZTlYLENBQWYsRUFBaUI7QUFBQyxTQUFJLElBQUkyWCxJQUFFLENBQUNHLElBQUVVLEVBQUVWLENBQUYsRUFBSTlYLENBQUosRUFBTSxDQUFOLENBQUgsRUFBYW9RLENBQWIsQ0FBTixFQUFzQi9mLElBQUUsQ0FBeEIsRUFBMEJvbkIsSUFBRTRCLEVBQUUvQixDQUFGLENBQWhDLEVBQXFDam5CLElBQUVvbkIsQ0FBdkMsR0FBMEM7QUFBQyxVQUFJTSxJQUFFeGYsS0FBS3NlLEtBQUwsQ0FBVyxDQUFDeG1CLElBQUVvbkIsQ0FBSCxJQUFNLENBQWpCLENBQU4sQ0FBMEJLLEVBQUVSLEVBQUVTLENBQUYsQ0FBRixJQUFRSixDQUFSLEdBQVV0bkIsSUFBRTBuQixJQUFFLENBQWQsR0FBZ0JOLElBQUVNLENBQWxCO0FBQW9CLFlBQU8xbkIsQ0FBUDtBQUFTLEdBQXpLLENBQTBLLElBQUkrc0IsSUFBRSxTQUFGQSxDQUFFLENBQVMvc0IsQ0FBVCxFQUFXb25CLENBQVgsRUFBYU0sQ0FBYixFQUFlO0FBQUMsV0FBTyxVQUFTVCxDQUFULEVBQVdsSCxDQUFYLEVBQWEwSCxDQUFiLEVBQWU7QUFBQyxVQUFJOVgsSUFBRSxDQUFOO0FBQUEsVUFBUTJYLElBQUUwQixFQUFFL0IsQ0FBRixDQUFWLENBQWUsSUFBRyxZQUFVLE9BQU9RLENBQXBCLEVBQXNCLElBQUV6bkIsQ0FBRixHQUFJMlAsSUFBRSxLQUFHOFgsQ0FBSCxHQUFLQSxDQUFMLEdBQU92ZixLQUFLeWdCLEdBQUwsQ0FBU2xCLElBQUVILENBQVgsRUFBYTNYLENBQWIsQ0FBYixHQUE2QjJYLElBQUUsS0FBR0csQ0FBSCxHQUFLdmYsS0FBS29pQixHQUFMLENBQVM3QyxJQUFFLENBQVgsRUFBYUgsQ0FBYixDQUFMLEdBQXFCRyxJQUFFSCxDQUFGLEdBQUksQ0FBeEQsQ0FBdEIsS0FBcUYsSUFBR0ksS0FBR0QsQ0FBSCxJQUFNSCxDQUFULEVBQVcsT0FBT0wsRUFBRVEsSUFBRUMsRUFBRVQsQ0FBRixFQUFJbEgsQ0FBSixDQUFKLE1BQWNBLENBQWQsR0FBZ0IwSCxDQUFoQixHQUFrQixDQUFDLENBQTFCLENBQTRCLElBQUcxSCxLQUFHQSxDQUFOLEVBQVEsT0FBTyxNQUFJMEgsSUFBRUwsRUFBRUcsRUFBRTVjLElBQUYsQ0FBT3NjLENBQVAsRUFBU3RYLENBQVQsRUFBVzJYLENBQVgsQ0FBRixFQUFnQk0sRUFBRXhnQixLQUFsQixDQUFOLElBQWdDcWdCLElBQUU5WCxDQUFsQyxHQUFvQyxDQUFDLENBQTVDLENBQThDLEtBQUk4WCxJQUFFLElBQUV6bkIsQ0FBRixHQUFJMlAsQ0FBSixHQUFNMlgsSUFBRSxDQUFkLEVBQWdCLEtBQUdHLENBQUgsSUFBTUEsSUFBRUgsQ0FBeEIsRUFBMEJHLEtBQUd6bkIsQ0FBN0I7QUFBK0IsWUFBR2luQixFQUFFUSxDQUFGLE1BQU8xSCxDQUFWLEVBQVksT0FBTzBILENBQVA7QUFBM0MsT0FBb0QsT0FBTSxDQUFDLENBQVA7QUFBUyxLQUFyUjtBQUFzUixHQUE1UyxDQUE2U0csRUFBRXhmLE9BQUYsR0FBVTJrQixFQUFFLENBQUYsRUFBSW5GLEVBQUU3YSxTQUFOLEVBQWdCNmEsRUFBRWtGLFdBQWxCLENBQVYsRUFBeUNsRixFQUFFcEksV0FBRixHQUFjdU4sRUFBRSxDQUFDLENBQUgsRUFBS25GLEVBQUVpRixhQUFQLENBQXZELEVBQTZFakYsRUFBRW9GLEtBQUYsR0FBUSxVQUFTL0YsQ0FBVCxFQUFXbEgsQ0FBWCxFQUFhMEgsQ0FBYixFQUFlO0FBQUMsWUFBTTFILENBQU4sS0FBVUEsSUFBRWtILEtBQUcsQ0FBTCxFQUFPQSxJQUFFLENBQW5CLEdBQXNCUSxNQUFJQSxJQUFFMUgsSUFBRWtILENBQUYsR0FBSSxDQUFDLENBQUwsR0FBTyxDQUFiLENBQXRCLENBQXNDLEtBQUksSUFBSXRYLElBQUV6SCxLQUFLeWdCLEdBQUwsQ0FBU3pnQixLQUFLK2tCLElBQUwsQ0FBVSxDQUFDbE4sSUFBRWtILENBQUgsSUFBTVEsQ0FBaEIsQ0FBVCxFQUE0QixDQUE1QixDQUFOLEVBQXFDSCxJQUFFdGIsTUFBTTJELENBQU4sQ0FBdkMsRUFBZ0QzUCxJQUFFLENBQXRELEVBQXdEQSxJQUFFMlAsQ0FBMUQsRUFBNEQzUCxLQUFJaW5CLEtBQUdRLENBQW5FO0FBQXFFSCxRQUFFdG5CLENBQUYsSUFBS2luQixDQUFMO0FBQXJFLEtBQTRFLE9BQU9LLENBQVA7QUFBUyxHQUFoTyxFQUFpT00sRUFBRXNGLEtBQUYsR0FBUSxVQUFTakcsQ0FBVCxFQUFXbEgsQ0FBWCxFQUFhO0FBQUMsUUFBRyxRQUFNQSxDQUFOLElBQVNBLElBQUUsQ0FBZCxFQUFnQixPQUFNLEVBQU4sQ0FBUyxLQUFJLElBQUkwSCxJQUFFLEVBQU4sRUFBUzlYLElBQUUsQ0FBWCxFQUFhMlgsSUFBRUwsRUFBRWhuQixNQUFyQixFQUE0QjBQLElBQUUyWCxDQUE5QjtBQUFpQ0csUUFBRXBmLElBQUYsQ0FBT2tmLEVBQUU1YyxJQUFGLENBQU9zYyxDQUFQLEVBQVN0WCxDQUFULEVBQVdBLEtBQUdvUSxDQUFkLENBQVA7QUFBakMsS0FBMEQsT0FBTzBILENBQVA7QUFBUyxHQUFuVixDQUFvVixJQUFJMEYsSUFBRSxTQUFGQSxDQUFFLENBQVNsRyxDQUFULEVBQVdsSCxDQUFYLEVBQWEwSCxDQUFiLEVBQWU5WCxDQUFmLEVBQWlCMlgsQ0FBakIsRUFBbUI7QUFBQyxRQUFHLEVBQUUzWCxhQUFhb1EsQ0FBZixDQUFILEVBQXFCLE9BQU9rSCxFQUFFeGMsS0FBRixDQUFRZ2QsQ0FBUixFQUFVSCxDQUFWLENBQVAsQ0FBb0IsSUFBSXRuQixJQUFFNG9CLEVBQUUzQixFQUFFaGIsU0FBSixDQUFOO0FBQUEsUUFBcUJtYixJQUFFSCxFQUFFeGMsS0FBRixDQUFRekssQ0FBUixFQUFVc25CLENBQVYsQ0FBdkIsQ0FBb0MsT0FBT00sRUFBRVcsUUFBRixDQUFXbkIsQ0FBWCxJQUFjQSxDQUFkLEdBQWdCcG5CLENBQXZCO0FBQXlCLEdBQWhJLENBQWlJNG5CLEVBQUV3RixJQUFGLEdBQU8xRSxFQUFFLFVBQVMzSSxDQUFULEVBQVcwSCxDQUFYLEVBQWE5WCxDQUFiLEVBQWU7QUFBQyxRQUFHLENBQUNpWSxFQUFFVSxVQUFGLENBQWF2SSxDQUFiLENBQUosRUFBb0IsTUFBTSxJQUFJc0MsU0FBSixDQUFjLG1DQUFkLENBQU4sQ0FBeUQsSUFBSWlGLElBQUVvQixFQUFFLFVBQVN6QixDQUFULEVBQVc7QUFBQyxhQUFPa0csRUFBRXBOLENBQUYsRUFBSXVILENBQUosRUFBTUcsQ0FBTixFQUFRLElBQVIsRUFBYTlYLEVBQUV1TSxNQUFGLENBQVMrSyxDQUFULENBQWIsQ0FBUDtBQUFpQyxLQUEvQyxDQUFOLENBQXVELE9BQU9LLENBQVA7QUFBUyxHQUEvSixDQUFQLEVBQXdLTSxFQUFFeUYsT0FBRixHQUFVM0UsRUFBRSxVQUFTcEIsQ0FBVCxFQUFXdG5CLENBQVgsRUFBYTtBQUFDLFFBQUlvbkIsSUFBRVEsRUFBRXlGLE9BQUYsQ0FBVUMsV0FBaEI7QUFBQSxRQUE0QjVGLElBQUUsU0FBRkEsQ0FBRSxHQUFVO0FBQUMsV0FBSSxJQUFJVCxJQUFFLENBQU4sRUFBUWxILElBQUUvZixFQUFFQyxNQUFaLEVBQW1Cd25CLElBQUV6YixNQUFNK1QsQ0FBTixDQUFyQixFQUE4QnBRLElBQUUsQ0FBcEMsRUFBc0NBLElBQUVvUSxDQUF4QyxFQUEwQ3BRLEdBQTFDO0FBQThDOFgsVUFBRTlYLENBQUYsSUFBSzNQLEVBQUUyUCxDQUFGLE1BQU95WCxDQUFQLEdBQVN4YyxVQUFVcWMsR0FBVixDQUFULEdBQXdCam5CLEVBQUUyUCxDQUFGLENBQTdCO0FBQTlDLE9BQWdGLE9BQUtzWCxJQUFFcmMsVUFBVTNLLE1BQWpCO0FBQXlCd25CLFVBQUVwZixJQUFGLENBQU91QyxVQUFVcWMsR0FBVixDQUFQO0FBQXpCLE9BQWdELE9BQU9rRyxFQUFFN0YsQ0FBRixFQUFJSSxDQUFKLEVBQU0sSUFBTixFQUFXLElBQVgsRUFBZ0JELENBQWhCLENBQVA7QUFBMEIsS0FBbk0sQ0FBb00sT0FBT0MsQ0FBUDtBQUFTLEdBQTdOLENBQWxMLEVBQWlaLENBQUNFLEVBQUV5RixPQUFGLENBQVVDLFdBQVYsR0FBc0IxRixDQUF2QixFQUEwQjJGLE9BQTFCLEdBQWtDN0UsRUFBRSxVQUFTekIsQ0FBVCxFQUFXbEgsQ0FBWCxFQUFhO0FBQUMsUUFBSTBILElBQUUsQ0FBQzFILElBQUVpTSxFQUFFak0sQ0FBRixFQUFJLENBQUMsQ0FBTCxFQUFPLENBQUMsQ0FBUixDQUFILEVBQWU5ZixNQUFyQixDQUE0QixJQUFHd25CLElBQUUsQ0FBTCxFQUFPLE1BQU0sSUFBSWhMLEtBQUosQ0FBVSx1Q0FBVixDQUFOLENBQXlELE9BQUtnTCxHQUFMLEdBQVU7QUFBQyxVQUFJOVgsSUFBRW9RLEVBQUUwSCxDQUFGLENBQU4sQ0FBV1IsRUFBRXRYLENBQUYsSUFBS2lZLEVBQUV3RixJQUFGLENBQU9uRyxFQUFFdFgsQ0FBRixDQUFQLEVBQVlzWCxDQUFaLENBQUw7QUFBb0I7QUFBQyxHQUF2SixDQUFuYixFQUE0a0JXLEVBQUU0RixPQUFGLEdBQVUsVUFBUzdkLENBQVQsRUFBVzJYLENBQVgsRUFBYTtBQUFDLFFBQUl0bkIsSUFBRSxTQUFGQSxDQUFFLENBQVNpbkIsQ0FBVCxFQUFXO0FBQUMsVUFBSWxILElBQUUvZixFQUFFeXRCLEtBQVI7QUFBQSxVQUFjaEcsSUFBRSxNQUFJSCxJQUFFQSxFQUFFN2MsS0FBRixDQUFRLElBQVIsRUFBYUcsU0FBYixDQUFGLEdBQTBCcWMsQ0FBOUIsQ0FBaEIsQ0FBaUQsT0FBTy9iLEVBQUU2VSxDQUFGLEVBQUkwSCxDQUFKLE1BQVMxSCxFQUFFMEgsQ0FBRixJQUFLOVgsRUFBRWxGLEtBQUYsQ0FBUSxJQUFSLEVBQWFHLFNBQWIsQ0FBZCxHQUF1Q21WLEVBQUUwSCxDQUFGLENBQTlDO0FBQW1ELEtBQXRILENBQXVILE9BQU96bkIsRUFBRXl0QixLQUFGLEdBQVEsRUFBUixFQUFXenRCLENBQWxCO0FBQW9CLEdBQS91QixFQUFndkI0bkIsRUFBRThGLEtBQUYsR0FBUWhGLEVBQUUsVUFBU3pCLENBQVQsRUFBV2xILENBQVgsRUFBYTBILENBQWIsRUFBZTtBQUFDLFdBQU9rRyxXQUFXLFlBQVU7QUFBQyxhQUFPMUcsRUFBRXhjLEtBQUYsQ0FBUSxJQUFSLEVBQWFnZCxDQUFiLENBQVA7QUFBdUIsS0FBN0MsRUFBOEMxSCxDQUE5QyxDQUFQO0FBQXdELEdBQTFFLENBQXh2QixFQUFvMEI2SCxFQUFFZ0csS0FBRixHQUFRaEcsRUFBRXlGLE9BQUYsQ0FBVXpGLEVBQUU4RixLQUFaLEVBQWtCOUYsQ0FBbEIsRUFBb0IsQ0FBcEIsQ0FBNTBCLEVBQW0yQkEsRUFBRWlHLFFBQUYsR0FBVyxVQUFTcEcsQ0FBVCxFQUFXOVgsQ0FBWCxFQUFhMlgsQ0FBYixFQUFlO0FBQUMsUUFBSXRuQixDQUFKO0FBQUEsUUFBTW9uQixDQUFOO0FBQUEsUUFBUU0sQ0FBUjtBQUFBLFFBQVVILENBQVY7QUFBQSxRQUFZdmMsSUFBRSxDQUFkLENBQWdCc2MsTUFBSUEsSUFBRSxFQUFOLEVBQVUsSUFBSUssSUFBRSxTQUFGQSxDQUFFLEdBQVU7QUFBQzNjLFVBQUUsQ0FBQyxDQUFELEtBQUtzYyxFQUFFd0csT0FBUCxHQUFlLENBQWYsR0FBaUJsRyxFQUFFbUcsR0FBRixFQUFuQixFQUEyQi90QixJQUFFLElBQTdCLEVBQWtDdW5CLElBQUVFLEVBQUVoZCxLQUFGLENBQVEyYyxDQUFSLEVBQVVNLENBQVYsQ0FBcEMsRUFBaUQxbkIsTUFBSW9uQixJQUFFTSxJQUFFLElBQVIsQ0FBakQ7QUFBK0QsS0FBaEY7QUFBQSxRQUFpRlQsSUFBRSxhQUFVO0FBQUMsVUFBSUEsSUFBRVcsRUFBRW1HLEdBQUYsRUFBTixDQUFjL2lCLEtBQUcsQ0FBQyxDQUFELEtBQUtzYyxFQUFFd0csT0FBVixLQUFvQjlpQixJQUFFaWMsQ0FBdEIsRUFBeUIsSUFBSWxILElBQUVwUSxLQUFHc1gsSUFBRWpjLENBQUwsQ0FBTixDQUFjLE9BQU9vYyxJQUFFLElBQUYsRUFBT00sSUFBRTljLFNBQVQsRUFBbUJtVixLQUFHLENBQUgsSUFBTXBRLElBQUVvUSxDQUFSLElBQVcvZixNQUFJZ3VCLGFBQWFodUIsQ0FBYixHQUFnQkEsSUFBRSxJQUF0QixHQUE0QmdMLElBQUVpYyxDQUE5QixFQUFnQ00sSUFBRUUsRUFBRWhkLEtBQUYsQ0FBUTJjLENBQVIsRUFBVU0sQ0FBVixDQUFsQyxFQUErQzFuQixNQUFJb25CLElBQUVNLElBQUUsSUFBUixDQUExRCxJQUF5RTFuQixLQUFHLENBQUMsQ0FBRCxLQUFLc25CLEVBQUUyRyxRQUFWLEtBQXFCanVCLElBQUUydEIsV0FBV2hHLENBQVgsRUFBYTVILENBQWIsQ0FBdkIsQ0FBNUYsRUFBb0l3SCxDQUEzSTtBQUE2SSxLQUFoUyxDQUFpUyxPQUFPTixFQUFFaUgsTUFBRixHQUFTLFlBQVU7QUFBQ0YsbUJBQWFodUIsQ0FBYixHQUFnQmdMLElBQUUsQ0FBbEIsRUFBb0JoTCxJQUFFb25CLElBQUVNLElBQUUsSUFBMUI7QUFBK0IsS0FBbkQsRUFBb0RULENBQTNEO0FBQTZELEdBQXR2QyxFQUF1dkNXLEVBQUV1RyxRQUFGLEdBQVcsVUFBUzFHLENBQVQsRUFBVzlYLENBQVgsRUFBYTJYLENBQWIsRUFBZTtBQUFDLFFBQUl0bkIsQ0FBSjtBQUFBLFFBQU1vbkIsQ0FBTjtBQUFBLFFBQVFNLElBQUUsU0FBRkEsQ0FBRSxDQUFTVCxDQUFULEVBQVdsSCxDQUFYLEVBQWE7QUFBQy9mLFVBQUUsSUFBRixFQUFPK2YsTUFBSXFILElBQUVLLEVBQUVoZCxLQUFGLENBQVF3YyxDQUFSLEVBQVVsSCxDQUFWLENBQU4sQ0FBUDtBQUEyQixLQUFuRDtBQUFBLFFBQW9Ea0gsSUFBRXlCLEVBQUUsVUFBU3pCLENBQVQsRUFBVztBQUFDLFVBQUdqbkIsS0FBR2d1QixhQUFhaHVCLENBQWIsQ0FBSCxFQUFtQnNuQixDQUF0QixFQUF3QjtBQUFDLFlBQUl2SCxJQUFFLENBQUMvZixDQUFQLENBQVNBLElBQUUydEIsV0FBV2pHLENBQVgsRUFBYS9YLENBQWIsQ0FBRixFQUFrQm9RLE1BQUlxSCxJQUFFSyxFQUFFaGQsS0FBRixDQUFRLElBQVIsRUFBYXdjLENBQWIsQ0FBTixDQUFsQjtBQUF5QyxPQUEzRSxNQUFnRmpuQixJQUFFNG5CLEVBQUU4RixLQUFGLENBQVFoRyxDQUFSLEVBQVUvWCxDQUFWLEVBQVksSUFBWixFQUFpQnNYLENBQWpCLENBQUYsQ0FBc0IsT0FBT0csQ0FBUDtBQUFTLEtBQTdILENBQXRELENBQXFMLE9BQU9ILEVBQUVpSCxNQUFGLEdBQVMsWUFBVTtBQUFDRixtQkFBYWh1QixDQUFiLEdBQWdCQSxJQUFFLElBQWxCO0FBQXVCLEtBQTNDLEVBQTRDaW5CLENBQW5EO0FBQXFELEdBQTUvQyxFQUE2L0NXLEVBQUV3RyxJQUFGLEdBQU8sVUFBU25ILENBQVQsRUFBV2xILENBQVgsRUFBYTtBQUFDLFdBQU82SCxFQUFFeUYsT0FBRixDQUFVdE4sQ0FBVixFQUFZa0gsQ0FBWixDQUFQO0FBQXNCLEdBQXhpRCxFQUF5aURXLEVBQUVpQyxNQUFGLEdBQVMsVUFBUzVDLENBQVQsRUFBVztBQUFDLFdBQU8sWUFBVTtBQUFDLGFBQU0sQ0FBQ0EsRUFBRXhjLEtBQUYsQ0FBUSxJQUFSLEVBQWFHLFNBQWIsQ0FBUDtBQUErQixLQUFqRDtBQUFrRCxHQUFobkQsRUFBaW5EZ2QsRUFBRXlHLE9BQUYsR0FBVSxZQUFVO0FBQUMsUUFBSTVHLElBQUU3YyxTQUFOO0FBQUEsUUFBZ0IrRSxJQUFFOFgsRUFBRXhuQixNQUFGLEdBQVMsQ0FBM0IsQ0FBNkIsT0FBTyxZQUFVO0FBQUMsV0FBSSxJQUFJZ25CLElBQUV0WCxDQUFOLEVBQVFvUSxJQUFFMEgsRUFBRTlYLENBQUYsRUFBS2xGLEtBQUwsQ0FBVyxJQUFYLEVBQWdCRyxTQUFoQixDQUFkLEVBQXlDcWMsR0FBekM7QUFBOENsSCxZQUFFMEgsRUFBRVIsQ0FBRixFQUFLdGMsSUFBTCxDQUFVLElBQVYsRUFBZW9WLENBQWYsQ0FBRjtBQUE5QyxPQUFrRSxPQUFPQSxDQUFQO0FBQVMsS0FBN0Y7QUFBOEYsR0FBandELEVBQWt3RDZILEVBQUUwRyxLQUFGLEdBQVEsVUFBU3JILENBQVQsRUFBV2xILENBQVgsRUFBYTtBQUFDLFdBQU8sWUFBVTtBQUFDLFVBQUcsRUFBRWtILENBQUYsR0FBSSxDQUFQLEVBQVMsT0FBT2xILEVBQUV0VixLQUFGLENBQVEsSUFBUixFQUFhRyxTQUFiLENBQVA7QUFBK0IsS0FBMUQ7QUFBMkQsR0FBbjFELEVBQW8xRGdkLEVBQUUyRyxNQUFGLEdBQVMsVUFBU3RILENBQVQsRUFBV2xILENBQVgsRUFBYTtBQUFDLFFBQUkwSCxDQUFKLENBQU0sT0FBTyxZQUFVO0FBQUMsYUFBTyxJQUFFLEVBQUVSLENBQUosS0FBUVEsSUFBRTFILEVBQUV0VixLQUFGLENBQVEsSUFBUixFQUFhRyxTQUFiLENBQVYsR0FBbUNxYyxLQUFHLENBQUgsS0FBT2xILElBQUUsSUFBVCxDQUFuQyxFQUFrRDBILENBQXpEO0FBQTJELEtBQTdFO0FBQThFLEdBQS83RCxFQUFnOERHLEVBQUV2YyxJQUFGLEdBQU91YyxFQUFFeUYsT0FBRixDQUFVekYsRUFBRTJHLE1BQVosRUFBbUIsQ0FBbkIsQ0FBdjhELEVBQTY5RDNHLEVBQUU0RyxhQUFGLEdBQWdCOUYsQ0FBNytELENBQSsrRCxJQUFJK0YsSUFBRSxDQUFDLEVBQUN4UyxVQUFTLElBQVYsR0FBZ0J5UyxvQkFBaEIsQ0FBcUMsVUFBckMsQ0FBUDtBQUFBLE1BQXdEQyxJQUFFLENBQUMsU0FBRCxFQUFXLGVBQVgsRUFBMkIsVUFBM0IsRUFBc0Msc0JBQXRDLEVBQTZELGdCQUE3RCxFQUE4RSxnQkFBOUUsQ0FBMUQ7QUFBQSxNQUEwSkMsSUFBRSxTQUFGQSxDQUFFLENBQVMzSCxDQUFULEVBQVdsSCxDQUFYLEVBQWE7QUFBQyxRQUFJMEgsSUFBRWtILEVBQUUxdUIsTUFBUjtBQUFBLFFBQWUwUCxJQUFFc1gsRUFBRTRILFdBQW5CO0FBQUEsUUFBK0J2SCxJQUFFTSxFQUFFVSxVQUFGLENBQWEzWSxDQUFiLEtBQWlCQSxFQUFFMUQsU0FBbkIsSUFBOEJtYixDQUEvRDtBQUFBLFFBQWlFcG5CLElBQUUsYUFBbkUsQ0FBaUYsS0FBSWtMLEVBQUUrYixDQUFGLEVBQUlqbkIsQ0FBSixLQUFRLENBQUM0bkIsRUFBRXBELFFBQUYsQ0FBV3pFLENBQVgsRUFBYS9mLENBQWIsQ0FBVCxJQUEwQitmLEVBQUUxWCxJQUFGLENBQU9ySSxDQUFQLENBQTlCLEVBQXdDeW5CLEdBQXhDO0FBQTZDLE9BQUN6bkIsSUFBRTJ1QixFQUFFbEgsQ0FBRixDQUFILEtBQVdSLENBQVgsSUFBY0EsRUFBRWpuQixDQUFGLE1BQU9zbkIsRUFBRXRuQixDQUFGLENBQXJCLElBQTJCLENBQUM0bkIsRUFBRXBELFFBQUYsQ0FBV3pFLENBQVgsRUFBYS9mLENBQWIsQ0FBNUIsSUFBNkMrZixFQUFFMVgsSUFBRixDQUFPckksQ0FBUCxDQUE3QztBQUE3QztBQUFvRyxHQUEvVixDQUFnVzRuQixFQUFFbmdCLElBQUYsR0FBTyxVQUFTd2YsQ0FBVCxFQUFXO0FBQUMsUUFBRyxDQUFDVyxFQUFFVyxRQUFGLENBQVd0QixDQUFYLENBQUosRUFBa0IsT0FBTSxFQUFOLENBQVMsSUFBR1MsQ0FBSCxFQUFLLE9BQU9BLEVBQUVULENBQUYsQ0FBUCxDQUFZLElBQUlsSCxJQUFFLEVBQU4sQ0FBUyxLQUFJLElBQUkwSCxDQUFSLElBQWFSLENBQWI7QUFBZS9iLFFBQUUrYixDQUFGLEVBQUlRLENBQUosS0FBUTFILEVBQUUxWCxJQUFGLENBQU9vZixDQUFQLENBQVI7QUFBZixLQUFpQyxPQUFPZ0gsS0FBR0csRUFBRTNILENBQUYsRUFBSWxILENBQUosQ0FBSCxFQUFVQSxDQUFqQjtBQUFtQixHQUE1SCxFQUE2SDZILEVBQUVrSCxPQUFGLEdBQVUsVUFBUzdILENBQVQsRUFBVztBQUFDLFFBQUcsQ0FBQ1csRUFBRVcsUUFBRixDQUFXdEIsQ0FBWCxDQUFKLEVBQWtCLE9BQU0sRUFBTixDQUFTLElBQUlsSCxJQUFFLEVBQU4sQ0FBUyxLQUFJLElBQUkwSCxDQUFSLElBQWFSLENBQWI7QUFBZWxILFFBQUUxWCxJQUFGLENBQU9vZixDQUFQO0FBQWYsS0FBeUIsT0FBT2dILEtBQUdHLEVBQUUzSCxDQUFGLEVBQUlsSCxDQUFKLENBQUgsRUFBVUEsQ0FBakI7QUFBbUIsR0FBbk8sRUFBb082SCxFQUFFc0MsTUFBRixHQUFTLFVBQVNqRCxDQUFULEVBQVc7QUFBQyxTQUFJLElBQUlsSCxJQUFFNkgsRUFBRW5nQixJQUFGLENBQU93ZixDQUFQLENBQU4sRUFBZ0JRLElBQUUxSCxFQUFFOWYsTUFBcEIsRUFBMkIwUCxJQUFFM0QsTUFBTXliLENBQU4sQ0FBN0IsRUFBc0NILElBQUUsQ0FBNUMsRUFBOENBLElBQUVHLENBQWhELEVBQWtESCxHQUFsRDtBQUFzRDNYLFFBQUUyWCxDQUFGLElBQUtMLEVBQUVsSCxFQUFFdUgsQ0FBRixDQUFGLENBQUw7QUFBdEQsS0FBbUUsT0FBTzNYLENBQVA7QUFBUyxHQUFyVSxFQUFzVWlZLEVBQUVtSCxTQUFGLEdBQVksVUFBUzlILENBQVQsRUFBV2xILENBQVgsRUFBYTBILENBQWIsRUFBZTtBQUFDMUgsUUFBRW9JLEVBQUVwSSxDQUFGLEVBQUkwSCxDQUFKLENBQUYsQ0FBUyxLQUFJLElBQUk5WCxJQUFFaVksRUFBRW5nQixJQUFGLENBQU93ZixDQUFQLENBQU4sRUFBZ0JLLElBQUUzWCxFQUFFMVAsTUFBcEIsRUFBMkJELElBQUUsRUFBN0IsRUFBZ0NvbkIsSUFBRSxDQUF0QyxFQUF3Q0EsSUFBRUUsQ0FBMUMsRUFBNENGLEdBQTVDLEVBQWdEO0FBQUMsVUFBSU0sSUFBRS9YLEVBQUV5WCxDQUFGLENBQU4sQ0FBV3BuQixFQUFFMG5CLENBQUYsSUFBSzNILEVBQUVrSCxFQUFFUyxDQUFGLENBQUYsRUFBT0EsQ0FBUCxFQUFTVCxDQUFULENBQUw7QUFBaUIsWUFBT2puQixDQUFQO0FBQVMsR0FBamMsRUFBa2M0bkIsRUFBRW9ILEtBQUYsR0FBUSxVQUFTL0gsQ0FBVCxFQUFXO0FBQUMsU0FBSSxJQUFJbEgsSUFBRTZILEVBQUVuZ0IsSUFBRixDQUFPd2YsQ0FBUCxDQUFOLEVBQWdCUSxJQUFFMUgsRUFBRTlmLE1BQXBCLEVBQTJCMFAsSUFBRTNELE1BQU15YixDQUFOLENBQTdCLEVBQXNDSCxJQUFFLENBQTVDLEVBQThDQSxJQUFFRyxDQUFoRCxFQUFrREgsR0FBbEQ7QUFBc0QzWCxRQUFFMlgsQ0FBRixJQUFLLENBQUN2SCxFQUFFdUgsQ0FBRixDQUFELEVBQU1MLEVBQUVsSCxFQUFFdUgsQ0FBRixDQUFGLENBQU4sQ0FBTDtBQUF0RCxLQUEwRSxPQUFPM1gsQ0FBUDtBQUFTLEdBQXppQixFQUEwaUJpWSxFQUFFcUgsTUFBRixHQUFTLFVBQVNoSSxDQUFULEVBQVc7QUFBQyxTQUFJLElBQUlsSCxJQUFFLEVBQU4sRUFBUzBILElBQUVHLEVBQUVuZ0IsSUFBRixDQUFPd2YsQ0FBUCxDQUFYLEVBQXFCdFgsSUFBRSxDQUF2QixFQUF5QjJYLElBQUVHLEVBQUV4bkIsTUFBakMsRUFBd0MwUCxJQUFFMlgsQ0FBMUMsRUFBNEMzWCxHQUE1QztBQUFnRG9RLFFBQUVrSCxFQUFFUSxFQUFFOVgsQ0FBRixDQUFGLENBQUYsSUFBVzhYLEVBQUU5WCxDQUFGLENBQVg7QUFBaEQsS0FBZ0UsT0FBT29RLENBQVA7QUFBUyxHQUF4b0IsRUFBeW9CNkgsRUFBRXNILFNBQUYsR0FBWXRILEVBQUV1SCxPQUFGLEdBQVUsVUFBU2xJLENBQVQsRUFBVztBQUFDLFFBQUlsSCxJQUFFLEVBQU4sQ0FBUyxLQUFJLElBQUkwSCxDQUFSLElBQWFSLENBQWI7QUFBZVcsUUFBRVUsVUFBRixDQUFhckIsRUFBRVEsQ0FBRixDQUFiLEtBQW9CMUgsRUFBRTFYLElBQUYsQ0FBT29mLENBQVAsQ0FBcEI7QUFBZixLQUE2QyxPQUFPMUgsRUFBRXpYLElBQUYsRUFBUDtBQUFnQixHQUFqdkIsQ0FBa3ZCLElBQUk4bUIsSUFBRSxTQUFGQSxDQUFFLENBQVM3SCxDQUFULEVBQVd2YyxDQUFYLEVBQWE7QUFBQyxXQUFPLFVBQVNpYyxDQUFULEVBQVc7QUFBQyxVQUFJbEgsSUFBRW5WLFVBQVUzSyxNQUFoQixDQUF1QixJQUFHK0ssTUFBSWljLElBQUV6ZixPQUFPeWYsQ0FBUCxDQUFOLEdBQWlCbEgsSUFBRSxDQUFGLElBQUssUUFBTWtILENBQS9CLEVBQWlDLE9BQU9BLENBQVAsQ0FBUyxLQUFJLElBQUlRLElBQUUsQ0FBVixFQUFZQSxJQUFFMUgsQ0FBZCxFQUFnQjBILEdBQWhCO0FBQW9CLGFBQUksSUFBSTlYLElBQUUvRSxVQUFVNmMsQ0FBVixDQUFOLEVBQW1CSCxJQUFFQyxFQUFFNVgsQ0FBRixDQUFyQixFQUEwQjNQLElBQUVzbkIsRUFBRXJuQixNQUE5QixFQUFxQ21uQixJQUFFLENBQTNDLEVBQTZDQSxJQUFFcG5CLENBQS9DLEVBQWlEb25CLEdBQWpELEVBQXFEO0FBQUMsY0FBSU0sSUFBRUosRUFBRUYsQ0FBRixDQUFOLENBQVdwYyxLQUFHLEtBQUssQ0FBTCxLQUFTaWMsRUFBRVMsQ0FBRixDQUFaLEtBQW1CVCxFQUFFUyxDQUFGLElBQUsvWCxFQUFFK1gsQ0FBRixDQUF4QjtBQUE4QjtBQUFuSCxPQUFtSCxPQUFPVCxDQUFQO0FBQVMsS0FBaE47QUFBaU4sR0FBck8sQ0FBc09XLEVBQUUvRyxNQUFGLEdBQVN1TyxFQUFFeEgsRUFBRWtILE9BQUosQ0FBVCxFQUFzQmxILEVBQUV5SCxTQUFGLEdBQVl6SCxFQUFFMEgsTUFBRixHQUFTRixFQUFFeEgsRUFBRW5nQixJQUFKLENBQTNDLEVBQXFEbWdCLEVBQUUrQixPQUFGLEdBQVUsVUFBUzFDLENBQVQsRUFBV2xILENBQVgsRUFBYTBILENBQWIsRUFBZTtBQUFDMUgsUUFBRW9JLEVBQUVwSSxDQUFGLEVBQUkwSCxDQUFKLENBQUYsQ0FBUyxLQUFJLElBQUk5WCxDQUFKLEVBQU0yWCxJQUFFTSxFQUFFbmdCLElBQUYsQ0FBT3dmLENBQVAsQ0FBUixFQUFrQmpuQixJQUFFLENBQXBCLEVBQXNCb25CLElBQUVFLEVBQUVybkIsTUFBOUIsRUFBcUNELElBQUVvbkIsQ0FBdkMsRUFBeUNwbkIsR0FBekM7QUFBNkMsVUFBRytmLEVBQUVrSCxFQUFFdFgsSUFBRTJYLEVBQUV0bkIsQ0FBRixDQUFKLENBQUYsRUFBWTJQLENBQVosRUFBY3NYLENBQWQsQ0FBSCxFQUFvQixPQUFPdFgsQ0FBUDtBQUFqRTtBQUEwRSxHQUFsSyxDQUFtSyxJQUFJNGYsQ0FBSjtBQUFBLE1BQU1DLENBQU47QUFBQSxNQUFRQyxJQUFFLFNBQUZBLENBQUUsQ0FBU3hJLENBQVQsRUFBV2xILENBQVgsRUFBYTBILENBQWIsRUFBZTtBQUFDLFdBQU8xSCxLQUFLMEgsQ0FBWjtBQUFjLEdBQXhDLENBQXlDRyxFQUFFbmYsSUFBRixHQUFPaWdCLEVBQUUsVUFBU3pCLENBQVQsRUFBV2xILENBQVgsRUFBYTtBQUFDLFFBQUkwSCxJQUFFLEVBQU47QUFBQSxRQUFTOVgsSUFBRW9RLEVBQUUsQ0FBRixDQUFYLENBQWdCLElBQUcsUUFBTWtILENBQVQsRUFBVyxPQUFPUSxDQUFQLENBQVNHLEVBQUVVLFVBQUYsQ0FBYTNZLENBQWIsS0FBaUIsSUFBRW9RLEVBQUU5ZixNQUFKLEtBQWEwUCxJQUFFdVksRUFBRXZZLENBQUYsRUFBSW9RLEVBQUUsQ0FBRixDQUFKLENBQWYsR0FBMEJBLElBQUU2SCxFQUFFa0gsT0FBRixDQUFVN0gsQ0FBVixDQUE3QyxLQUE0RHRYLElBQUU4ZixDQUFGLEVBQUkxUCxJQUFFaU0sRUFBRWpNLENBQUYsRUFBSSxDQUFDLENBQUwsRUFBTyxDQUFDLENBQVIsQ0FBTixFQUFpQmtILElBQUV6ZixPQUFPeWYsQ0FBUCxDQUEvRSxFQUEwRixLQUFJLElBQUlLLElBQUUsQ0FBTixFQUFRdG5CLElBQUUrZixFQUFFOWYsTUFBaEIsRUFBdUJxbkIsSUFBRXRuQixDQUF6QixFQUEyQnNuQixHQUEzQixFQUErQjtBQUFDLFVBQUlGLElBQUVySCxFQUFFdUgsQ0FBRixDQUFOO0FBQUEsVUFBV0ksSUFBRVQsRUFBRUcsQ0FBRixDQUFiLENBQWtCelgsRUFBRStYLENBQUYsRUFBSU4sQ0FBSixFQUFNSCxDQUFOLE1BQVdRLEVBQUVMLENBQUYsSUFBS00sQ0FBaEI7QUFBbUIsWUFBT0QsQ0FBUDtBQUFTLEdBQTVOLENBQVAsRUFBcU9HLEVBQUU4SCxJQUFGLEdBQU9oSCxFQUFFLFVBQVN6QixDQUFULEVBQVdRLENBQVgsRUFBYTtBQUFDLFFBQUkxSCxDQUFKO0FBQUEsUUFBTXBRLElBQUU4WCxFQUFFLENBQUYsQ0FBUixDQUFhLE9BQU9HLEVBQUVVLFVBQUYsQ0FBYTNZLENBQWIsS0FBaUJBLElBQUVpWSxFQUFFaUMsTUFBRixDQUFTbGEsQ0FBVCxDQUFGLEVBQWMsSUFBRThYLEVBQUV4bkIsTUFBSixLQUFhOGYsSUFBRTBILEVBQUUsQ0FBRixDQUFmLENBQS9CLEtBQXNEQSxJQUFFRyxFQUFFM2YsR0FBRixDQUFNK2pCLEVBQUV2RSxDQUFGLEVBQUksQ0FBQyxDQUFMLEVBQU8sQ0FBQyxDQUFSLENBQU4sRUFBaUJrSSxNQUFqQixDQUFGLEVBQTJCaGdCLElBQUUsV0FBU3NYLENBQVQsRUFBV2xILENBQVgsRUFBYTtBQUFDLGFBQU0sQ0FBQzZILEVBQUVwRCxRQUFGLENBQVdpRCxDQUFYLEVBQWExSCxDQUFiLENBQVA7QUFBdUIsS0FBeEgsR0FBMEg2SCxFQUFFbmYsSUFBRixDQUFPd2UsQ0FBUCxFQUFTdFgsQ0FBVCxFQUFXb1EsQ0FBWCxDQUFqSTtBQUErSSxHQUE1SyxDQUE1TyxFQUEwWjZILEVBQUVnSSxRQUFGLEdBQVdSLEVBQUV4SCxFQUFFa0gsT0FBSixFQUFZLENBQUMsQ0FBYixDQUFyYSxFQUFxYmxILEVBQUVuSyxNQUFGLEdBQVMsVUFBU3dKLENBQVQsRUFBV2xILENBQVgsRUFBYTtBQUFDLFFBQUkwSCxJQUFFbUIsRUFBRTNCLENBQUYsQ0FBTixDQUFXLE9BQU9sSCxLQUFHNkgsRUFBRXlILFNBQUYsQ0FBWTVILENBQVosRUFBYzFILENBQWQsQ0FBSCxFQUFvQjBILENBQTNCO0FBQTZCLEdBQXBmLEVBQXFmRyxFQUFFOEMsS0FBRixHQUFRLFVBQVN6RCxDQUFULEVBQVc7QUFBQyxXQUFPVyxFQUFFVyxRQUFGLENBQVd0QixDQUFYLElBQWNXLEVBQUVsZixPQUFGLENBQVV1ZSxDQUFWLElBQWFBLEVBQUV2YyxLQUFGLEVBQWIsR0FBdUJrZCxFQUFFL0csTUFBRixDQUFTLEVBQVQsRUFBWW9HLENBQVosQ0FBckMsR0FBb0RBLENBQTNEO0FBQTZELEdBQXRrQixFQUF1a0JXLEVBQUVpSSxHQUFGLEdBQU0sVUFBUzVJLENBQVQsRUFBV2xILENBQVgsRUFBYTtBQUFDLFdBQU9BLEVBQUVrSCxDQUFGLEdBQUtBLENBQVo7QUFBYyxHQUF6bUIsRUFBMG1CVyxFQUFFa0ksT0FBRixHQUFVLFVBQVM3SSxDQUFULEVBQVdsSCxDQUFYLEVBQWE7QUFBQyxRQUFJMEgsSUFBRUcsRUFBRW5nQixJQUFGLENBQU9zWSxDQUFQLENBQU47QUFBQSxRQUFnQnBRLElBQUU4WCxFQUFFeG5CLE1BQXBCLENBQTJCLElBQUcsUUFBTWduQixDQUFULEVBQVcsT0FBTSxDQUFDdFgsQ0FBUCxDQUFTLEtBQUksSUFBSTJYLElBQUU5ZixPQUFPeWYsQ0FBUCxDQUFOLEVBQWdCam5CLElBQUUsQ0FBdEIsRUFBd0JBLElBQUUyUCxDQUExQixFQUE0QjNQLEdBQTVCLEVBQWdDO0FBQUMsVUFBSW9uQixJQUFFSyxFQUFFem5CLENBQUYsQ0FBTixDQUFXLElBQUcrZixFQUFFcUgsQ0FBRixNQUFPRSxFQUFFRixDQUFGLENBQVAsSUFBYSxFQUFFQSxLQUFLRSxDQUFQLENBQWhCLEVBQTBCLE9BQU0sQ0FBQyxDQUFQO0FBQVMsWUFBTSxDQUFDLENBQVA7QUFBUyxHQUF6d0IsRUFBMHdCaUksSUFBRSxXQUFTdEksQ0FBVCxFQUFXbEgsQ0FBWCxFQUFhMEgsQ0FBYixFQUFlOVgsQ0FBZixFQUFpQjtBQUFDLFFBQUdzWCxNQUFJbEgsQ0FBUCxFQUFTLE9BQU8sTUFBSWtILENBQUosSUFBTyxJQUFFQSxDQUFGLElBQUssSUFBRWxILENBQXJCLENBQXVCLElBQUcsUUFBTWtILENBQU4sSUFBUyxRQUFNbEgsQ0FBbEIsRUFBb0IsT0FBTSxDQUFDLENBQVAsQ0FBUyxJQUFHa0gsS0FBR0EsQ0FBTixFQUFRLE9BQU9sSCxLQUFHQSxDQUFWLENBQVksSUFBSXVILFdBQVNMLENBQVQseUNBQVNBLENBQVQsQ0FBSixDQUFlLE9BQU0sQ0FBQyxlQUFhSyxDQUFiLElBQWdCLGFBQVdBLENBQTNCLElBQThCLG9CQUFpQnZILENBQWpCLHlDQUFpQkEsQ0FBakIsRUFBL0IsS0FBb0R5UCxFQUFFdkksQ0FBRixFQUFJbEgsQ0FBSixFQUFNMEgsQ0FBTixFQUFROVgsQ0FBUixDQUExRDtBQUFxRSxHQUFuOEIsRUFBbzhCNmYsSUFBRSxXQUFTdkksQ0FBVCxFQUFXbEgsQ0FBWCxFQUFhMEgsQ0FBYixFQUFlOVgsQ0FBZixFQUFpQjtBQUFDc1gsaUJBQWFXLENBQWIsS0FBaUJYLElBQUVBLEVBQUVZLFFBQXJCLEdBQStCOUgsYUFBYTZILENBQWIsS0FBaUI3SCxJQUFFQSxFQUFFOEgsUUFBckIsQ0FBL0IsQ0FBOEQsSUFBSVAsSUFBRXZHLEVBQUVwVyxJQUFGLENBQU9zYyxDQUFQLENBQU4sQ0FBZ0IsSUFBR0ssTUFBSXZHLEVBQUVwVyxJQUFGLENBQU9vVixDQUFQLENBQVAsRUFBaUIsT0FBTSxDQUFDLENBQVAsQ0FBUyxRQUFPdUgsQ0FBUCxHQUFVLEtBQUksaUJBQUosQ0FBc0IsS0FBSSxpQkFBSjtBQUFzQixlQUFNLEtBQUdMLENBQUgsSUFBTSxLQUFHbEgsQ0FBZixDQUFpQixLQUFJLGlCQUFKO0FBQXNCLGVBQU0sQ0FBQ2tILENBQUQsSUFBSSxDQUFDQSxDQUFMLEdBQU8sQ0FBQ2xILENBQUQsSUFBSSxDQUFDQSxDQUFaLEdBQWMsS0FBRyxDQUFDa0gsQ0FBSixHQUFNLElBQUUsQ0FBQ0EsQ0FBSCxJQUFNLElBQUVsSCxDQUFkLEdBQWdCLENBQUNrSCxDQUFELElBQUksQ0FBQ2xILENBQXpDLENBQTJDLEtBQUksZUFBSixDQUFvQixLQUFJLGtCQUFKO0FBQXVCLGVBQU0sQ0FBQ2tILENBQUQsSUFBSSxDQUFDbEgsQ0FBWCxDQUFhLEtBQUksaUJBQUo7QUFBc0IsZUFBT0QsRUFBRWlRLE9BQUYsQ0FBVXBsQixJQUFWLENBQWVzYyxDQUFmLE1BQW9CbkgsRUFBRWlRLE9BQUYsQ0FBVXBsQixJQUFWLENBQWVvVixDQUFmLENBQTNCLENBQXROLENBQW1RLElBQUkvZixJQUFFLHFCQUFtQnNuQixDQUF6QixDQUEyQixJQUFHLENBQUN0bkIsQ0FBSixFQUFNO0FBQUMsVUFBRyxvQkFBaUJpbkIsQ0FBakIseUNBQWlCQSxDQUFqQixNQUFvQixvQkFBaUJsSCxDQUFqQix5Q0FBaUJBLENBQWpCLEVBQXZCLEVBQTBDLE9BQU0sQ0FBQyxDQUFQLENBQVMsSUFBSXFILElBQUVILEVBQUU0SCxXQUFSO0FBQUEsVUFBb0JuSCxJQUFFM0gsRUFBRThPLFdBQXhCLENBQW9DLElBQUd6SCxNQUFJTSxDQUFKLElBQU8sRUFBRUUsRUFBRVUsVUFBRixDQUFhbEIsQ0FBYixLQUFpQkEsYUFBYUEsQ0FBOUIsSUFBaUNRLEVBQUVVLFVBQUYsQ0FBYVosQ0FBYixDQUFqQyxJQUFrREEsYUFBYUEsQ0FBakUsQ0FBUCxJQUE0RSxpQkFBZ0JULENBQTVGLElBQStGLGlCQUFnQmxILENBQWxILEVBQW9ILE9BQU0sQ0FBQyxDQUFQO0FBQVMsU0FBRXBRLEtBQUcsRUFBTCxDQUFRLEtBQUksSUFBSTRYLElBQUUsQ0FBQ0UsSUFBRUEsS0FBRyxFQUFOLEVBQVV4bkIsTUFBcEIsRUFBMkJzbkIsR0FBM0I7QUFBZ0MsVUFBR0UsRUFBRUYsQ0FBRixNQUFPTixDQUFWLEVBQVksT0FBT3RYLEVBQUU0WCxDQUFGLE1BQU94SCxDQUFkO0FBQTVDLEtBQTRELElBQUcwSCxFQUFFcGYsSUFBRixDQUFPNGUsQ0FBUCxHQUFVdFgsRUFBRXRILElBQUYsQ0FBTzBYLENBQVAsQ0FBVixFQUFvQi9mLENBQXZCLEVBQXlCO0FBQUMsVUFBRyxDQUFDdW5CLElBQUVOLEVBQUVobkIsTUFBTCxNQUFlOGYsRUFBRTlmLE1BQXBCLEVBQTJCLE9BQU0sQ0FBQyxDQUFQLENBQVMsT0FBS3NuQixHQUFMO0FBQVUsWUFBRyxDQUFDZ0ksRUFBRXRJLEVBQUVNLENBQUYsQ0FBRixFQUFPeEgsRUFBRXdILENBQUYsQ0FBUCxFQUFZRSxDQUFaLEVBQWM5WCxDQUFkLENBQUosRUFBcUIsT0FBTSxDQUFDLENBQVA7QUFBL0I7QUFBd0MsS0FBdEcsTUFBMEc7QUFBQyxVQUFJM0UsQ0FBSjtBQUFBLFVBQU0yYyxJQUFFQyxFQUFFbmdCLElBQUYsQ0FBT3dmLENBQVAsQ0FBUixDQUFrQixJQUFHTSxJQUFFSSxFQUFFMW5CLE1BQUosRUFBVzJuQixFQUFFbmdCLElBQUYsQ0FBT3NZLENBQVAsRUFBVTlmLE1BQVYsS0FBbUJzbkIsQ0FBakMsRUFBbUMsT0FBTSxDQUFDLENBQVAsQ0FBUyxPQUFLQSxHQUFMO0FBQVUsWUFBR3ZjLElBQUUyYyxFQUFFSixDQUFGLENBQUYsRUFBTyxDQUFDcmMsRUFBRTZVLENBQUYsRUFBSS9VLENBQUosQ0FBRCxJQUFTLENBQUN1a0IsRUFBRXRJLEVBQUVqYyxDQUFGLENBQUYsRUFBTytVLEVBQUUvVSxDQUFGLENBQVAsRUFBWXljLENBQVosRUFBYzlYLENBQWQsQ0FBcEIsRUFBcUMsT0FBTSxDQUFDLENBQVA7QUFBL0M7QUFBd0QsWUFBTzhYLEVBQUV1SSxHQUFGLElBQVFyZ0IsRUFBRXFnQixHQUFGLEVBQVIsRUFBZ0IsQ0FBQyxDQUF4QjtBQUEwQixHQUF4M0QsRUFBeTNEcEksRUFBRXFJLE9BQUYsR0FBVSxVQUFTaEosQ0FBVCxFQUFXbEgsQ0FBWCxFQUFhO0FBQUMsV0FBT3dQLEVBQUV0SSxDQUFGLEVBQUlsSCxDQUFKLENBQVA7QUFBYyxHQUEvNUQsRUFBZzZENkgsRUFBRXNJLE9BQUYsR0FBVSxVQUFTakosQ0FBVCxFQUFXO0FBQUMsV0FBTyxRQUFNQSxDQUFOLEtBQVVnQyxFQUFFaEMsQ0FBRixNQUFPVyxFQUFFbGYsT0FBRixDQUFVdWUsQ0FBVixLQUFjVyxFQUFFc0QsUUFBRixDQUFXakUsQ0FBWCxDQUFkLElBQTZCVyxFQUFFcUUsV0FBRixDQUFjaEYsQ0FBZCxDQUFwQyxJQUFzRCxNQUFJQSxFQUFFaG5CLE1BQTVELEdBQW1FLE1BQUkybkIsRUFBRW5nQixJQUFGLENBQU93ZixDQUFQLEVBQVVobkIsTUFBM0YsQ0FBUDtBQUEwRyxHQUFoaUUsRUFBaWlFMm5CLEVBQUUxRSxTQUFGLEdBQVksVUFBUytELENBQVQsRUFBVztBQUFDLFdBQU0sRUFBRSxDQUFDQSxDQUFELElBQUksTUFBSUEsRUFBRXpKLFFBQVosQ0FBTjtBQUE0QixHQUFybEUsRUFBc2xFb0ssRUFBRWxmLE9BQUYsR0FBVStlLEtBQUcsVUFBU1IsQ0FBVCxFQUFXO0FBQUMsV0FBTSxxQkFBbUJsRyxFQUFFcFcsSUFBRixDQUFPc2MsQ0FBUCxDQUF6QjtBQUFtQyxHQUFscEUsRUFBbXBFVyxFQUFFVyxRQUFGLEdBQVcsVUFBU3RCLENBQVQsRUFBVztBQUFDLFFBQUlsSCxXQUFTa0gsQ0FBVCx5Q0FBU0EsQ0FBVCxDQUFKLENBQWUsT0FBTSxlQUFhbEgsQ0FBYixJQUFnQixhQUFXQSxDQUFYLElBQWMsQ0FBQyxDQUFDa0gsQ0FBdEM7QUFBd0MsR0FBanVFLEVBQWt1RVcsRUFBRXNCLElBQUYsQ0FBTyxDQUFDLFdBQUQsRUFBYSxVQUFiLEVBQXdCLFFBQXhCLEVBQWlDLFFBQWpDLEVBQTBDLE1BQTFDLEVBQWlELFFBQWpELEVBQTBELE9BQTFELEVBQWtFLFFBQWxFLEVBQTJFLEtBQTNFLEVBQWlGLFNBQWpGLEVBQTJGLEtBQTNGLEVBQWlHLFNBQWpHLENBQVAsRUFBbUgsVUFBU25KLENBQVQsRUFBVztBQUFDNkgsTUFBRSxPQUFLN0gsQ0FBUCxJQUFVLFVBQVNrSCxDQUFULEVBQVc7QUFBQyxhQUFPbEcsRUFBRXBXLElBQUYsQ0FBT3NjLENBQVAsTUFBWSxhQUFXbEgsQ0FBWCxHQUFhLEdBQWhDO0FBQW9DLEtBQTFEO0FBQTJELEdBQTFMLENBQWx1RSxFQUE4NUU2SCxFQUFFcUUsV0FBRixDQUFjcmhCLFNBQWQsTUFBMkJnZCxFQUFFcUUsV0FBRixHQUFjLFVBQVNoRixDQUFULEVBQVc7QUFBQyxXQUFPL2IsRUFBRStiLENBQUYsRUFBSSxRQUFKLENBQVA7QUFBcUIsR0FBMUUsQ0FBOTVFLENBQTArRSxJQUFJa0osSUFBRWxKLEVBQUUzWSxRQUFGLElBQVkyWSxFQUFFM1ksUUFBRixDQUFXOGhCLFVBQTdCLENBQXdDLFNBQXVCLG9CQUFpQkMsU0FBakIseUNBQWlCQSxTQUFqQixFQUF2QixJQUFtRCxjQUFZLE9BQU9GLENBQXRFLEtBQTBFdkksRUFBRVUsVUFBRixHQUFhLFVBQVNyQixDQUFULEVBQVc7QUFBQyxXQUFNLGNBQVksT0FBT0EsQ0FBbkIsSUFBc0IsQ0FBQyxDQUE3QjtBQUErQixHQUFsSSxHQUFvSVcsRUFBRTBJLFFBQUYsR0FBVyxVQUFTckosQ0FBVCxFQUFXO0FBQUMsV0FBTSxDQUFDVyxFQUFFMkksUUFBRixDQUFXdEosQ0FBWCxDQUFELElBQWdCcUosU0FBU3JKLENBQVQsQ0FBaEIsSUFBNkIsQ0FBQzdmLE1BQU1FLFdBQVcyZixDQUFYLENBQU4sQ0FBcEM7QUFBeUQsR0FBcE4sRUFBcU5XLEVBQUV4Z0IsS0FBRixHQUFRLFVBQVM2ZixDQUFULEVBQVc7QUFBQyxXQUFPVyxFQUFFN2YsUUFBRixDQUFXa2YsQ0FBWCxLQUFlN2YsTUFBTTZmLENBQU4sQ0FBdEI7QUFBK0IsR0FBeFEsRUFBeVFXLEVBQUUyRSxTQUFGLEdBQVksVUFBU3RGLENBQVQsRUFBVztBQUFDLFdBQU0sQ0FBQyxDQUFELEtBQUtBLENBQUwsSUFBUSxDQUFDLENBQUQsS0FBS0EsQ0FBYixJQUFnQix1QkFBcUJsRyxFQUFFcFcsSUFBRixDQUFPc2MsQ0FBUCxDQUEzQztBQUFxRCxHQUF0VixFQUF1VlcsRUFBRTRJLE1BQUYsR0FBUyxVQUFTdkosQ0FBVCxFQUFXO0FBQUMsV0FBTyxTQUFPQSxDQUFkO0FBQWdCLEdBQTVYLEVBQTZYVyxFQUFFNkksV0FBRixHQUFjLFVBQVN4SixDQUFULEVBQVc7QUFBQyxXQUFPLEtBQUssQ0FBTCxLQUFTQSxDQUFoQjtBQUFrQixHQUF6YSxFQUEwYVcsRUFBRThJLEdBQUYsR0FBTSxVQUFTekosQ0FBVCxFQUFXbEgsQ0FBWCxFQUFhO0FBQUMsUUFBRyxDQUFDNkgsRUFBRWxmLE9BQUYsQ0FBVXFYLENBQVYsQ0FBSixFQUFpQixPQUFPN1UsRUFBRStiLENBQUYsRUFBSWxILENBQUosQ0FBUCxDQUFjLEtBQUksSUFBSTBILElBQUUxSCxFQUFFOWYsTUFBUixFQUFlMFAsSUFBRSxDQUFyQixFQUF1QkEsSUFBRThYLENBQXpCLEVBQTJCOVgsR0FBM0IsRUFBK0I7QUFBQyxVQUFJMlgsSUFBRXZILEVBQUVwUSxDQUFGLENBQU4sQ0FBVyxJQUFHLFFBQU1zWCxDQUFOLElBQVMsQ0FBQ2puQixFQUFFMkssSUFBRixDQUFPc2MsQ0FBUCxFQUFTSyxDQUFULENBQWIsRUFBeUIsT0FBTSxDQUFDLENBQVAsQ0FBU0wsSUFBRUEsRUFBRUssQ0FBRixDQUFGO0FBQU8sWUFBTSxDQUFDLENBQUNHLENBQVI7QUFBVSxHQUEzakIsRUFBNGpCRyxFQUFFK0ksVUFBRixHQUFhLFlBQVU7QUFBQyxXQUFPMUosRUFBRW5mLENBQUYsR0FBSWlZLENBQUosRUFBTSxJQUFiO0FBQWtCLEdBQXRtQixFQUF1bUI2SCxFQUFFUyxRQUFGLEdBQVcsVUFBU3BCLENBQVQsRUFBVztBQUFDLFdBQU9BLENBQVA7QUFBUyxHQUF2b0IsRUFBd29CVyxFQUFFZ0osUUFBRixHQUFXLFVBQVMzSixDQUFULEVBQVc7QUFBQyxXQUFPLFlBQVU7QUFBQyxhQUFPQSxDQUFQO0FBQVMsS0FBM0I7QUFBNEIsR0FBM3JCLEVBQTRyQlcsRUFBRWlKLElBQUYsR0FBTyxZQUFVLENBQUUsQ0FBL3NCLEVBQWd0QmpKLEVBQUVhLFFBQUYsR0FBVyxVQUFTMUksQ0FBVCxFQUFXO0FBQUMsV0FBTzZILEVBQUVsZixPQUFGLENBQVVxWCxDQUFWLElBQWEsVUFBU2tILENBQVQsRUFBVztBQUFDLGFBQU82QixFQUFFN0IsQ0FBRixFQUFJbEgsQ0FBSixDQUFQO0FBQWMsS0FBdkMsR0FBd0M4SSxFQUFFOUksQ0FBRixDQUEvQztBQUFvRCxHQUEzeEIsRUFBNHhCNkgsRUFBRWtKLFVBQUYsR0FBYSxVQUFTL1EsQ0FBVCxFQUFXO0FBQUMsV0FBTyxRQUFNQSxDQUFOLEdBQVEsWUFBVSxDQUFFLENBQXBCLEdBQXFCLFVBQVNrSCxDQUFULEVBQVc7QUFBQyxhQUFPVyxFQUFFbGYsT0FBRixDQUFVdWUsQ0FBVixJQUFhNkIsRUFBRS9JLENBQUYsRUFBSWtILENBQUosQ0FBYixHQUFvQmxILEVBQUVrSCxDQUFGLENBQTNCO0FBQWdDLEtBQXhFO0FBQXlFLEdBQTkzQixFQUErM0JXLEVBQUVZLE9BQUYsR0FBVVosRUFBRW1KLE9BQUYsR0FBVSxVQUFTaFIsQ0FBVCxFQUFXO0FBQUMsV0FBT0EsSUFBRTZILEVBQUV5SCxTQUFGLENBQVksRUFBWixFQUFldFAsQ0FBZixDQUFGLEVBQW9CLFVBQVNrSCxDQUFULEVBQVc7QUFBQyxhQUFPVyxFQUFFa0ksT0FBRixDQUFVN0ksQ0FBVixFQUFZbEgsQ0FBWixDQUFQO0FBQXNCLEtBQTdEO0FBQThELEdBQTc5QixFQUE4OUI2SCxFQUFFb0osS0FBRixHQUFRLFVBQVMvSixDQUFULEVBQVdsSCxDQUFYLEVBQWEwSCxDQUFiLEVBQWU7QUFBQyxRQUFJOVgsSUFBRTNELE1BQU05RCxLQUFLeWdCLEdBQUwsQ0FBUyxDQUFULEVBQVcxQixDQUFYLENBQU4sQ0FBTixDQUEyQmxILElBQUVtSSxFQUFFbkksQ0FBRixFQUFJMEgsQ0FBSixFQUFNLENBQU4sQ0FBRixDQUFXLEtBQUksSUFBSUgsSUFBRSxDQUFWLEVBQVlBLElBQUVMLENBQWQsRUFBZ0JLLEdBQWhCO0FBQW9CM1gsUUFBRTJYLENBQUYsSUFBS3ZILEVBQUV1SCxDQUFGLENBQUw7QUFBcEIsS0FBOEIsT0FBTzNYLENBQVA7QUFBUyxHQUFua0MsRUFBb2tDaVksRUFBRTZDLE1BQUYsR0FBUyxVQUFTeEQsQ0FBVCxFQUFXbEgsQ0FBWCxFQUFhO0FBQUMsV0FBTyxRQUFNQSxDQUFOLEtBQVVBLElBQUVrSCxDQUFGLEVBQUlBLElBQUUsQ0FBaEIsR0FBbUJBLElBQUUvZSxLQUFLc2UsS0FBTCxDQUFXdGUsS0FBS3VpQixNQUFMLE1BQWUxSyxJQUFFa0gsQ0FBRixHQUFJLENBQW5CLENBQVgsQ0FBNUI7QUFBOEQsR0FBenBDLEVBQTBwQ1csRUFBRW1HLEdBQUYsR0FBTWtELEtBQUtsRCxHQUFMLElBQVUsWUFBVTtBQUFDLFdBQU8sSUFBSWtELElBQUosRUFBRCxDQUFXQyxPQUFYLEVBQU47QUFBMkIsR0FBaHRDLENBQWl0QyxJQUFJQyxJQUFFLEVBQUMsS0FBSSxPQUFMLEVBQWEsS0FBSSxNQUFqQixFQUF3QixLQUFJLE1BQTVCLEVBQW1DLEtBQUksUUFBdkMsRUFBZ0QsS0FBSSxRQUFwRCxFQUE2RCxLQUFJLFFBQWpFLEVBQU47QUFBQSxNQUFpRkMsSUFBRXhKLEVBQUVxSCxNQUFGLENBQVNrQyxDQUFULENBQW5GO0FBQUEsTUFBK0ZFLElBQUUsU0FBRkEsQ0FBRSxDQUFTdFIsQ0FBVCxFQUFXO0FBQUMsUUFBSTBILElBQUUsU0FBRkEsQ0FBRSxDQUFTUixDQUFULEVBQVc7QUFBQyxhQUFPbEgsRUFBRWtILENBQUYsQ0FBUDtBQUFZLEtBQTlCO0FBQUEsUUFBK0JBLElBQUUsUUFBTVcsRUFBRW5nQixJQUFGLENBQU9zWSxDQUFQLEVBQVVqTCxJQUFWLENBQWUsR0FBZixDQUFOLEdBQTBCLEdBQTNEO0FBQUEsUUFBK0RuRixJQUFFbVUsT0FBT21ELENBQVAsQ0FBakU7QUFBQSxRQUEyRUssSUFBRXhELE9BQU9tRCxDQUFQLEVBQVMsR0FBVCxDQUE3RSxDQUEyRixPQUFPLFVBQVNBLENBQVQsRUFBVztBQUFDLGFBQU9BLElBQUUsUUFBTUEsQ0FBTixHQUFRLEVBQVIsR0FBVyxLQUFHQSxDQUFoQixFQUFrQnRYLEVBQUUrTCxJQUFGLENBQU91TCxDQUFQLElBQVVBLEVBQUV0TCxPQUFGLENBQVUyTCxDQUFWLEVBQVlHLENBQVosQ0FBVixHQUF5QlIsQ0FBbEQ7QUFBb0QsS0FBdkU7QUFBd0UsR0FBaFIsQ0FBaVJXLEVBQUUwSixNQUFGLEdBQVNELEVBQUVGLENBQUYsQ0FBVCxFQUFjdkosRUFBRTJKLFFBQUYsR0FBV0YsRUFBRUQsQ0FBRixDQUF6QixFQUE4QnhKLEVBQUU3aEIsTUFBRixHQUFTLFVBQVNraEIsQ0FBVCxFQUFXbEgsQ0FBWCxFQUFhMEgsQ0FBYixFQUFlO0FBQUNHLE1BQUVsZixPQUFGLENBQVVxWCxDQUFWLE1BQWVBLElBQUUsQ0FBQ0EsQ0FBRCxDQUFqQixFQUFzQixJQUFJcFEsSUFBRW9RLEVBQUU5ZixNQUFSLENBQWUsSUFBRyxDQUFDMFAsQ0FBSixFQUFNLE9BQU9pWSxFQUFFVSxVQUFGLENBQWFiLENBQWIsSUFBZ0JBLEVBQUU5YyxJQUFGLENBQU9zYyxDQUFQLENBQWhCLEdBQTBCUSxDQUFqQyxDQUFtQyxLQUFJLElBQUlILElBQUUsQ0FBVixFQUFZQSxJQUFFM1gsQ0FBZCxFQUFnQjJYLEdBQWhCLEVBQW9CO0FBQUMsVUFBSXRuQixJQUFFLFFBQU1pbkIsQ0FBTixHQUFRLEtBQUssQ0FBYixHQUFlQSxFQUFFbEgsRUFBRXVILENBQUYsQ0FBRixDQUFyQixDQUE2QixLQUFLLENBQUwsS0FBU3RuQixDQUFULEtBQWFBLElBQUV5bkIsQ0FBRixFQUFJSCxJQUFFM1gsQ0FBbkIsR0FBc0JzWCxJQUFFVyxFQUFFVSxVQUFGLENBQWF0b0IsQ0FBYixJQUFnQkEsRUFBRTJLLElBQUYsQ0FBT3NjLENBQVAsQ0FBaEIsR0FBMEJqbkIsQ0FBbEQ7QUFBb0QsWUFBT2luQixDQUFQO0FBQVMsR0FBcFAsQ0FBcVAsSUFBSXVLLElBQUUsQ0FBTixDQUFRNUosRUFBRTZKLFFBQUYsR0FBVyxVQUFTeEssQ0FBVCxFQUFXO0FBQUMsUUFBSWxILElBQUUsRUFBRXlSLENBQUYsR0FBSSxFQUFWLENBQWEsT0FBT3ZLLElBQUVBLElBQUVsSCxDQUFKLEdBQU1BLENBQWI7QUFBZSxHQUFuRCxFQUFvRDZILEVBQUU4SixnQkFBRixHQUFtQixFQUFDQyxVQUFTLGlCQUFWLEVBQTRCQyxhQUFZLGtCQUF4QyxFQUEyRE4sUUFBTyxrQkFBbEUsRUFBdkUsQ0FBNkosSUFBSU8sSUFBRSxNQUFOO0FBQUEsTUFBYUMsSUFBRSxFQUFDLEtBQUksR0FBTCxFQUFTLE1BQUssSUFBZCxFQUFtQixNQUFLLEdBQXhCLEVBQTRCLE1BQUssR0FBakMsRUFBcUMsVUFBUyxPQUE5QyxFQUFzRCxVQUFTLE9BQS9ELEVBQWY7QUFBQSxNQUF1RkMsSUFBRSwyQkFBekY7QUFBQSxNQUFxSEMsSUFBRSxTQUFGQSxDQUFFLENBQVMvSyxDQUFULEVBQVc7QUFBQyxXQUFNLE9BQUs2SyxFQUFFN0ssQ0FBRixDQUFYO0FBQWdCLEdBQW5KLENBQW9KVyxFQUFFcUssUUFBRixHQUFXLFVBQVNqeUIsQ0FBVCxFQUFXaW5CLENBQVgsRUFBYWxILENBQWIsRUFBZTtBQUFDLEtBQUNrSCxDQUFELElBQUlsSCxDQUFKLEtBQVFrSCxJQUFFbEgsQ0FBVixHQUFha0gsSUFBRVcsRUFBRWdJLFFBQUYsQ0FBVyxFQUFYLEVBQWMzSSxDQUFkLEVBQWdCVyxFQUFFOEosZ0JBQWxCLENBQWYsQ0FBbUQsSUFBSWpLLENBQUo7QUFBQSxRQUFNOVgsSUFBRW1VLE9BQU8sQ0FBQyxDQUFDbUQsRUFBRXFLLE1BQUYsSUFBVU8sQ0FBWCxFQUFjMWtCLE1BQWYsRUFBc0IsQ0FBQzhaLEVBQUUySyxXQUFGLElBQWVDLENBQWhCLEVBQW1CMWtCLE1BQXpDLEVBQWdELENBQUM4WixFQUFFMEssUUFBRixJQUFZRSxDQUFiLEVBQWdCMWtCLE1BQWhFLEVBQXdFMkgsSUFBeEUsQ0FBNkUsR0FBN0UsSUFBa0YsSUFBekYsRUFBOEYsR0FBOUYsQ0FBUjtBQUFBLFFBQTJHc1MsSUFBRSxDQUE3RztBQUFBLFFBQStHTSxJQUFFLFFBQWpILENBQTBIMW5CLEVBQUUyYixPQUFGLENBQVVoTSxDQUFWLEVBQVksVUFBU3NYLENBQVQsRUFBV2xILENBQVgsRUFBYTBILENBQWIsRUFBZTlYLENBQWYsRUFBaUIyWCxDQUFqQixFQUFtQjtBQUFDLGFBQU9JLEtBQUcxbkIsRUFBRTBLLEtBQUYsQ0FBUTBjLENBQVIsRUFBVUUsQ0FBVixFQUFhM0wsT0FBYixDQUFxQm9XLENBQXJCLEVBQXVCQyxDQUF2QixDQUFILEVBQTZCNUssSUFBRUUsSUFBRUwsRUFBRWhuQixNQUFuQyxFQUEwQzhmLElBQUUySCxLQUFHLGdCQUFjM0gsQ0FBZCxHQUFnQixnQ0FBckIsR0FBc0QwSCxJQUFFQyxLQUFHLGdCQUFjRCxDQUFkLEdBQWdCLHNCQUFyQixHQUE0QzlYLE1BQUkrWCxLQUFHLFNBQU8vWCxDQUFQLEdBQVMsVUFBaEIsQ0FBNUksRUFBd0tzWCxDQUEvSztBQUFpTCxLQUFqTixHQUFtTlMsS0FBRyxNQUF0TixFQUE2TlQsRUFBRWlMLFFBQUYsS0FBYXhLLElBQUUscUJBQW1CQSxDQUFuQixHQUFxQixLQUFwQyxDQUE3TixFQUF3UUEsSUFBRSw2Q0FBMkMsbURBQTNDLEdBQStGQSxDQUEvRixHQUFpRyxlQUEzVyxDQUEyWCxJQUFHO0FBQUNELFVBQUUsSUFBSTBLLFFBQUosQ0FBYWxMLEVBQUVpTCxRQUFGLElBQVksS0FBekIsRUFBK0IsR0FBL0IsRUFBbUN4SyxDQUFuQyxDQUFGO0FBQXdDLEtBQTVDLENBQTRDLE9BQU1ULENBQU4sRUFBUTtBQUFDLFlBQU1BLEVBQUU5WixNQUFGLEdBQVN1YSxDQUFULEVBQVdULENBQWpCO0FBQW1CLFNBQUlLLElBQUUsU0FBRkEsQ0FBRSxDQUFTTCxDQUFULEVBQVc7QUFBQyxhQUFPUSxFQUFFOWMsSUFBRixDQUFPLElBQVAsRUFBWXNjLENBQVosRUFBY1csQ0FBZCxDQUFQO0FBQXdCLEtBQTFDO0FBQUEsUUFBMkNMLElBQUVOLEVBQUVpTCxRQUFGLElBQVksS0FBekQsQ0FBK0QsT0FBTzVLLEVBQUVuYSxNQUFGLEdBQVMsY0FBWW9hLENBQVosR0FBYyxNQUFkLEdBQXFCRyxDQUFyQixHQUF1QixHQUFoQyxFQUFvQ0osQ0FBM0M7QUFBNkMsR0FBdnZCLEVBQXd2Qk0sRUFBRXdLLEtBQUYsR0FBUSxVQUFTbkwsQ0FBVCxFQUFXO0FBQUMsUUFBSWxILElBQUU2SCxFQUFFWCxDQUFGLENBQU4sQ0FBVyxPQUFPbEgsRUFBRXNTLE1BQUYsR0FBUyxDQUFDLENBQVYsRUFBWXRTLENBQW5CO0FBQXFCLEdBQTV5QixDQUE2eUIsSUFBSXVTLElBQUUsU0FBRkEsQ0FBRSxDQUFTckwsQ0FBVCxFQUFXbEgsQ0FBWCxFQUFhO0FBQUMsV0FBT2tILEVBQUVvTCxNQUFGLEdBQVN6SyxFQUFFN0gsQ0FBRixFQUFLcVMsS0FBTCxFQUFULEdBQXNCclMsQ0FBN0I7QUFBK0IsR0FBbkQsQ0FBb0Q2SCxFQUFFMkssS0FBRixHQUFRLFVBQVM5SyxDQUFULEVBQVc7QUFBQyxXQUFPRyxFQUFFc0IsSUFBRixDQUFPdEIsRUFBRXNILFNBQUYsQ0FBWXpILENBQVosQ0FBUCxFQUFzQixVQUFTUixDQUFULEVBQVc7QUFBQyxVQUFJbEgsSUFBRTZILEVBQUVYLENBQUYsSUFBS1EsRUFBRVIsQ0FBRixDQUFYLENBQWdCVyxFQUFFM2IsU0FBRixDQUFZZ2IsQ0FBWixJQUFlLFlBQVU7QUFBQyxZQUFJQSxJQUFFLENBQUMsS0FBS1ksUUFBTixDQUFOLENBQXNCLE9BQU9QLEVBQUU3YyxLQUFGLENBQVF3YyxDQUFSLEVBQVVyYyxTQUFWLEdBQXFCMG5CLEVBQUUsSUFBRixFQUFPdlMsRUFBRXRWLEtBQUYsQ0FBUW1kLENBQVIsRUFBVVgsQ0FBVixDQUFQLENBQTVCO0FBQWlELE9BQWpHO0FBQWtHLEtBQXBKLEdBQXNKVyxDQUE3SjtBQUErSixHQUFuTCxFQUFvTEEsRUFBRTJLLEtBQUYsQ0FBUTNLLENBQVIsQ0FBcEwsRUFBK0xBLEVBQUVzQixJQUFGLENBQU8sQ0FBQyxLQUFELEVBQU8sTUFBUCxFQUFjLFNBQWQsRUFBd0IsT0FBeEIsRUFBZ0MsTUFBaEMsRUFBdUMsUUFBdkMsRUFBZ0QsU0FBaEQsQ0FBUCxFQUFrRSxVQUFTbkosQ0FBVCxFQUFXO0FBQUMsUUFBSTBILElBQUU5WCxFQUFFb1EsQ0FBRixDQUFOLENBQVc2SCxFQUFFM2IsU0FBRixDQUFZOFQsQ0FBWixJQUFlLFlBQVU7QUFBQyxVQUFJa0gsSUFBRSxLQUFLWSxRQUFYLENBQW9CLE9BQU9KLEVBQUVoZCxLQUFGLENBQVF3YyxDQUFSLEVBQVVyYyxTQUFWLEdBQXFCLFlBQVVtVixDQUFWLElBQWEsYUFBV0EsQ0FBeEIsSUFBMkIsTUFBSWtILEVBQUVobkIsTUFBakMsSUFBeUMsT0FBT2duQixFQUFFLENBQUYsQ0FBckUsRUFBMEVxTCxFQUFFLElBQUYsRUFBT3JMLENBQVAsQ0FBakY7QUFBMkYsS0FBekk7QUFBMEksR0FBbk8sQ0FBL0wsRUFBb2FXLEVBQUVzQixJQUFGLENBQU8sQ0FBQyxRQUFELEVBQVUsTUFBVixFQUFpQixPQUFqQixDQUFQLEVBQWlDLFVBQVNqQyxDQUFULEVBQVc7QUFBQyxRQUFJbEgsSUFBRXBRLEVBQUVzWCxDQUFGLENBQU4sQ0FBV1csRUFBRTNiLFNBQUYsQ0FBWWdiLENBQVosSUFBZSxZQUFVO0FBQUMsYUFBT3FMLEVBQUUsSUFBRixFQUFPdlMsRUFBRXRWLEtBQUYsQ0FBUSxLQUFLb2QsUUFBYixFQUFzQmpkLFNBQXRCLENBQVAsQ0FBUDtBQUFnRCxLQUExRTtBQUEyRSxHQUFuSSxDQUFwYSxFQUF5aUJnZCxFQUFFM2IsU0FBRixDQUFZaEQsS0FBWixHQUFrQixZQUFVO0FBQUMsV0FBTyxLQUFLNGUsUUFBWjtBQUFxQixHQUEzbEIsRUFBNGxCRCxFQUFFM2IsU0FBRixDQUFZOGpCLE9BQVosR0FBb0JuSSxFQUFFM2IsU0FBRixDQUFZdW1CLE1BQVosR0FBbUI1SyxFQUFFM2IsU0FBRixDQUFZaEQsS0FBL29CLEVBQXFwQjJlLEVBQUUzYixTQUFGLENBQVlnUSxRQUFaLEdBQXFCLFlBQVU7QUFBQyxXQUFPMFQsT0FBTyxLQUFLOUgsUUFBWixDQUFQO0FBQTZCLEdBQWx0QixFQUFtdEIsU0FBdUM0SyxpQ0FBb0IsRUFBcEIsbUNBQXVCLFlBQVU7QUFBQyxXQUFPN0ssQ0FBUDtBQUFTLEdBQTNDO0FBQUEsb0dBQTF2QjtBQUF1eUIsQ0FBMTdpQixFQUFELEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSkE7O0FBRU8sSUFBTThLLDBCQUFTLFNBQVRBLE1BQVMsQ0FBVWprQixJQUFWLEVBQWdCQyxJQUFoQixFQUFzQjtBQUN4QyxRQUFHRCxJQUFILEVBQVE7QUFDSixlQUFRQSxLQUFLckcsT0FBTCxDQUFhLE9BQWIsS0FBeUIsQ0FBekIsSUFBOEJzRyxRQUFRLE1BQTlDO0FBQ0g7QUFDSixDQUpNO0FBS0EsSUFBTWlrQiw4QkFBVyxTQUFYQSxRQUFXLENBQVVsa0IsSUFBVixFQUFnQkMsSUFBaEIsRUFBc0I7QUFDMUMsUUFBR0QsSUFBSCxFQUFRO0FBQ0osZUFBUUEsS0FBS3JHLE9BQUwsQ0FBYSxLQUFiLE1BQXdCLENBQXhCLElBQTZCcUcsS0FBS3JHLE9BQUwsQ0FBYSxNQUFiLE1BQXlCLENBQXRELElBQTJEc0csU0FBUyxRQUE1RTtBQUNIO0FBQ0QsV0FBTyxLQUFQO0FBQ0gsQ0FMTTtBQU1BLElBQU1ra0Isd0JBQVEsU0FBUkEsS0FBUSxDQUFVbmtCLElBQVYsRUFBZ0JDLElBQWhCLEVBQXNCO0FBQ3ZDLFFBQUdELElBQUgsRUFBUTtBQUNKLGVBQVNDLFNBQVMsS0FBVCxJQUFtQkEsU0FBUyxNQUE1QixJQUFzQ0EsU0FBUywrQkFBL0MsSUFBa0YsK0JBQWlCRCxJQUFqQixLQUEwQixNQUFySDtBQUVIO0FBQ0osQ0FMTTtBQU1BLElBQU1va0IsMEJBQVMsU0FBVEEsTUFBUyxDQUFVcGtCLElBQVYsRUFBZ0JDLElBQWhCLEVBQXNCO0FBQ3hDLFFBQUdELElBQUgsRUFBUTtBQUNKLGVBQVNDLFNBQVMsS0FBVCxJQUFtQkEsU0FBUyxNQUE1QixJQUFzQ0EsU0FBUyxzQkFBL0MsSUFBeUUsK0JBQWlCRCxJQUFqQixLQUEwQixLQUE1RztBQUVIO0FBQ0osQ0FMTSxDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ25CUDs7OztBQUlPLElBQU1xa0Isd0NBQWdCLFNBQWhCQSxhQUFnQixDQUFTQyxVQUFULEVBQXFCO0FBQzlDLFFBQU1DLFVBQVUxa0IsU0FBUzJrQixvQkFBVCxDQUE4QixRQUE5QixDQUFoQjtBQUNBLFNBQUssSUFBSWp6QixJQUFJLENBQWIsRUFBZ0JBLElBQUlnekIsUUFBUS95QixNQUE1QixFQUFvQ0QsR0FBcEMsRUFBeUM7QUFDckMsWUFBTWt6QixNQUFNRixRQUFRaHpCLENBQVIsRUFBV2t6QixHQUF2QjtBQUNBLFlBQUlBLEdBQUosRUFBUztBQUNMLGdCQUFNbDBCLFFBQVFrMEIsSUFBSTFULFdBQUosQ0FBZ0IsTUFBTXVULFVBQXRCLENBQWQ7QUFDQSxnQkFBSS96QixTQUFTLENBQWIsRUFBZ0I7QUFDWix1QkFBT2swQixJQUFJcmUsTUFBSixDQUFXLENBQVgsRUFBYzdWLFFBQVEsQ0FBdEIsQ0FBUDtBQUNIO0FBQ0o7QUFDSjtBQUNELFdBQU8sRUFBUDtBQUNILENBWk0sQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKUDs7O0FBR08sSUFBTVgsNEJBQVU4MEIsZ0NBQWhCLEMiLCJmaWxlIjoib3ZlbnBsYXllci5zZGsuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcblxuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHR9O1xuXG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcIm92ZW5wbGF5ZXIuc2RrXCI6IDBcbiBcdH07XG5cblxuXG4gXHQvLyBzY3JpcHQgcGF0aCBmdW5jdGlvblxuIFx0ZnVuY3Rpb24ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCkge1xuIFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArICh7XCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjJlYzE5M2FjXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjJlYzE5M2FjXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjdhZmQ2OGNmXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjdhZmQ2OGNmXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlclwiOlwib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDVcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDVcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuV2ViUlRDUHJvdmlkZXJcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuV2ViUlRDUHJvdmlkZXJcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuUnRtcFByb3ZpZGVyXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLlJ0bXBQcm92aWRlclwiLFwic21pcGFyc2VyXCI6XCJzbWlwYXJzZXJcIixcInZlbmRvcnN+ZG93bmxvYWRlclwiOlwidmVuZG9yc35kb3dubG9hZGVyXCIsXCJkb3dubG9hZGVyXCI6XCJkb3dubG9hZGVyXCIsXCJ2dHRwYXJzZXJcIjpcInZ0dHBhcnNlclwifVtjaHVua0lkXXx8Y2h1bmtJZCkgKyBcIi5qc1wiXG4gXHR9XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuIFx0Ly8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuIFx0Ly8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSBmdW5jdGlvbiByZXF1aXJlRW5zdXJlKGNodW5rSWQpIHtcbiBcdFx0dmFyIHByb21pc2VzID0gW107XG5cblxuIFx0XHQvLyBKU09OUCBjaHVuayBsb2FkaW5nIGZvciBqYXZhc2NyaXB0XG5cbiBcdFx0dmFyIGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhICE9PSAwKSB7IC8vIDAgbWVhbnMgXCJhbHJlYWR5IGluc3RhbGxlZFwiLlxuXG4gXHRcdFx0Ly8gYSBQcm9taXNlIG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEpIHtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdKTtcbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Ly8gc2V0dXAgUHJvbWlzZSBpbiBjaHVuayBjYWNoZVxuIFx0XHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gW3Jlc29sdmUsIHJlamVjdF07XG4gXHRcdFx0XHR9KTtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdID0gcHJvbWlzZSk7XG5cbiBcdFx0XHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcbiBcdFx0XHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiBcdFx0XHRcdHZhciBvblNjcmlwdENvbXBsZXRlO1xuXG4gXHRcdFx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG4gXHRcdFx0XHRzY3JpcHQudGltZW91dCA9IDEyMDtcbiBcdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG4gXHRcdFx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHNjcmlwdC5zcmMgPSBqc29ucFNjcmlwdFNyYyhjaHVua0lkKTtcblxuIFx0XHRcdFx0Ly8gY3JlYXRlIGVycm9yIGJlZm9yZSBzdGFjayB1bndvdW5kIHRvIGdldCB1c2VmdWwgc3RhY2t0cmFjZSBsYXRlclxuIFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCk7XG4gXHRcdFx0XHRvblNjcmlwdENvbXBsZXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gXHRcdFx0XHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cbiBcdFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gbnVsbDtcbiBcdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuIFx0XHRcdFx0XHR2YXIgY2h1bmsgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdFx0XHRcdGlmKGNodW5rICE9PSAwKSB7XG4gXHRcdFx0XHRcdFx0aWYoY2h1bmspIHtcbiBcdFx0XHRcdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG4gXHRcdFx0XHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IubWVzc2FnZSA9ICdMb2FkaW5nIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLm5hbWUgPSAnQ2h1bmtMb2FkRXJyb3InO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnJlcXVlc3QgPSByZWFsU3JjO1xuIFx0XHRcdFx0XHRcdFx0Y2h1bmtbMV0oZXJyb3IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSB1bmRlZmluZWQ7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH07XG4gXHRcdFx0XHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiBcdFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSh7IHR5cGU6ICd0aW1lb3V0JywgdGFyZ2V0OiBzY3JpcHQgfSk7XG4gXHRcdFx0XHR9LCAxMjAwMDApO1xuIFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gb25TY3JpcHRDb21wbGV0ZTtcbiBcdFx0XHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0cmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gb24gZXJyb3IgZnVuY3Rpb24gZm9yIGFzeW5jIGxvYWRpbmdcbiBcdF9fd2VicGFja19yZXF1aXJlX18ub2UgPSBmdW5jdGlvbihlcnIpIHsgY29uc29sZS5lcnJvcihlcnIpOyB0aHJvdyBlcnI7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvanMvb3ZlbnBsYXllci5zZGsuanNcIik7XG4iLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHRpZiAoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcblx0XHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XG5cdH1cblx0cmV0dXJuIG1vZHVsZTtcbn07XG4iLCJpbXBvcnQgQ2FwdGlvbk1hbmFnZXIgZnJvbSBcImFwaS9jYXB0aW9uL01hbmFnZXJcIjtcbmltcG9ydCBDb25maWd1cmF0b3IgZnJvbSBcImFwaS9Db25maWd1cmF0b3JcIjtcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImFwaS9FdmVudEVtaXR0ZXJcIjtcbmltcG9ydCBMYXp5Q29tbWFuZEV4ZWN1dG9yIGZyb20gXCJhcGkvTGF6eUNvbW1hbmRFeGVjdXRvclwiO1xuaW1wb3J0IE1lZGlhTWFuYWdlciBmcm9tIFwiYXBpL21lZGlhL01hbmFnZXJcIjtcbmltcG9ydCBQbGF5bGlzdE1hbmFnZXIgZnJvbSBcImFwaS9wbGF5bGlzdC9NYW5hZ2VyXCI7XG5pbXBvcnQgUHJvdmlkZXJDb250cm9sbGVyIGZyb20gXCJhcGkvcHJvdmlkZXIvQ29udHJvbGxlclwiO1xuaW1wb3J0IHtSRUFEWSwgRVJST1JTLCBFUlJPUiwgQ09OVEVOVF9USU1FX01PREVfQ0hBTkdFRCwgSU5JVF9VTktOV09OX0VSUk9SLCBJTklUX1VOU1VQUE9SVF9FUlJPUiwgREVTVFJPWSwgTkVUV09SS19VTlNUQUJMRUQsXG4gICAgUExBWUVSX0ZJTEVfRVJST1IsIFBST1ZJREVSX0RBU0gsIFBST1ZJREVSX0hMUywgUFJPVklERVJfV0VCUlRDLCBQUk9WSURFUl9IVE1MNSwgUFJPVklERVJfUlRNUCwgQUxMX1BMQVlMSVNUX0VOREVEfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuaW1wb3J0IHt2ZXJzaW9ufSBmcm9tICd2ZXJzaW9uJztcbmltcG9ydCB7QXBpUnRtcEV4cGFuc2lvbn0gZnJvbSAnYXBpL0FwaUV4cGFuc2lvbnMnO1xuaW1wb3J0IHthbmFsVXNlckFnZW50fSBmcm9tIFwidXRpbHMvYnJvd3NlclwiO1xuaW1wb3J0IExBJCBmcm9tICd1dGlscy9saWtlQSQnO1xuXG4vKipcbiAqIEBicmllZiAgIFRoaXMgb2JqZWN0IGNvbm5lY3RzIFVJIHRvIHRoZSBwcm92aWRlci5cbiAqIEBwYXJhbSAgIHtvYmplY3R9ICAgIGNvbnRhaW5lciAgZG9tIGVsZW1lbnRcbiAqXG4gKiAqL1xuXG5jb25zdCBBcGkgPSBmdW5jdGlvbihjb250YWluZXIpe1xuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICBFdmVudEVtaXR0ZXIodGhhdCk7XG5cblxuICAgIGNvbnNvbGUubG9nKFwiW1tPdmVuUGxheWVyXV0gdi5cIisgdmVyc2lvbik7XG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIGxvYWRlZC5cIik7XG5cbiAgICBsZXQgcGxheWxpc3RNYW5hZ2VyID0gUGxheWxpc3RNYW5hZ2VyKHRoYXQpO1xuICAgIGxldCBwcm92aWRlckNvbnRyb2xsZXIgPSBQcm92aWRlckNvbnRyb2xsZXIoKTtcbiAgICBsZXQgdXNlckFnZW50T2JqZWN0ID0gYW5hbFVzZXJBZ2VudCgpO1xuICAgIGxldCBtZWRpYU1hbmFnZXIgPSBNZWRpYU1hbmFnZXIoY29udGFpbmVyLCB1c2VyQWdlbnRPYmplY3QpO1xuICAgIGxldCBjdXJyZW50UHJvdmlkZXIgPSBcIlwiO1xuICAgIGxldCBwbGF5ZXJDb25maWcgPSBcIlwiO1xuICAgIGxldCBsYXp5UXVldWUgPSBcIlwiO1xuICAgIGxldCBjYXB0aW9uTWFuYWdlciA9IFwiXCI7XG5cblxuICAgIGNvbnN0IHJ1bk5leHRQbGF5bGlzdCA9IGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwicnVuTmV4dFBsYXlsaXN0XCIpO1xuICAgICAgICBsZXQgbmV4dFBsYXlsaXN0SW5kZXggPSBpbmRleDsgLy8gfHwgcGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRQbGF5bGlzdEluZGV4KCkgKyAxO1xuICAgICAgICBsZXQgcGxheWxpc3QgPSBwbGF5bGlzdE1hbmFnZXIuZ2V0UGxheWxpc3QoKTtcbiAgICAgICAgbGV0IGhhc05leHRQbGF5bGlzdCA9IHBsYXlsaXN0W25leHRQbGF5bGlzdEluZGV4XT8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAvL2luaXQgc291cmNlIGluZGV4XG4gICAgICAgIHBsYXllckNvbmZpZy5zZXRTb3VyY2VJbmRleCgwKTtcbiAgICAgICAgaWYoaGFzTmV4dFBsYXlsaXN0KXtcbiAgICAgICAgICAgIC8vdGhhdC5wYXVzZSgpO1xuICAgICAgICAgICAgbGF6eVF1ZXVlID0gTGF6eUNvbW1hbmRFeGVjdXRvcih0aGF0LCBbJ3BsYXknLCdzZWVrJywnc3RvcCddKTtcbiAgICAgICAgICAgIHBsYXlsaXN0TWFuYWdlci5zZXRDdXJyZW50UGxheWxpc3QobmV4dFBsYXlsaXN0SW5kZXgpO1xuICAgICAgICAgICAgaW5pdFByb3ZpZGVyKCk7XG5cblxuICAgICAgICAgICAgaWYoIXBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpKXtcbiAgICAgICAgICAgICAgICAvL0FueXdheSBuZXh0cGxheWxpc3QgcnVucyBhdXRvU3RhcnQhLlxuICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIC8vQWxsIFBsYXlsaXN0IEVuZGVkLlxuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKEFMTF9QTEFZTElTVF9FTkRFRCwgbnVsbCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGluaXRQcm92aWRlciA9IGZ1bmN0aW9uKGxhc3RQbGF5UG9zaXRpb24pe1xuICAgICAgICBjb25zdCBwaWNrUXVhbGl0eUZyb21Tb3VyY2UgPSAoc291cmNlcykgPT57XG4gICAgICAgICAgICB2YXIgcXVhbGl0eSA9IDA7XG4gICAgICAgICAgICBpZiAoc291cmNlcykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc291cmNlc1tpXS5kZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWFsaXR5ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyQ29uZmlnLmdldFNvdXJjZUluZGV4KCkgPT09IGkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvKmlmIChwbGF5ZXJDb25maWcuZ2V0U291cmNlTGFiZWwoKSAmJiBzb3VyY2VzW2ldLmxhYmVsID09PSBwbGF5ZXJDb25maWcuZ2V0U291cmNlTGFiZWwoKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgICAgICAgICB9Ki9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcXVhbGl0eTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gcHJvdmlkZXJDb250cm9sbGVyLmxvYWRQcm92aWRlcnMocGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRQbGF5TGlzdCgpKS50aGVuKFByb3ZpZGVycyA9PiB7XG4gICAgICAgICAgICBpZihQcm92aWRlcnMubGVuZ3RoIDwgMSl7XG4gICAgICAgICAgICAgICAgdGhyb3cgRVJST1JTW0lOSVRfVU5TVVBQT1JUX0VSUk9SXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoY3VycmVudFByb3ZpZGVyKXtcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlciA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihjYXB0aW9uTWFuYWdlcil7XG4gICAgICAgICAgICAgICAgY2FwdGlvbk1hbmFnZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIGNhcHRpb25NYW5hZ2VyID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhcHRpb25NYW5hZ2VyID0gQ2FwdGlvbk1hbmFnZXIodGhhdCwgcGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRQbGF5bGlzdEluZGV4KCkpO1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaW5pdCgpIGNhcHRpb25zXCIpO1xuXG4gICAgICAgICAgICBsZXQgY3VycmVudFNvdXJjZUluZGV4ID0gcGlja1F1YWxpdHlGcm9tU291cmNlKHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50U291cmNlcygpKTtcbiAgICAgICAgICAgIGxldCBwcm92aWRlck5hbWUgPSBQcm92aWRlcnNbY3VycmVudFNvdXJjZUluZGV4XVtcIm5hbWVcIl07XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpbml0KCkgcHJvdmlkZXJcIiwgcHJvdmlkZXJOYW1lKTtcbiAgICAgICAgICAgIC8vSW5pdCBQcm92aWRlci5cbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlciA9ICBQcm92aWRlcnNbY3VycmVudFNvdXJjZUluZGV4XS5wcm92aWRlcihcbiAgICAgICAgICAgICAgICBtZWRpYU1hbmFnZXIuY3JlYXRlTWVkaWEocHJvdmlkZXJOYW1lLCBwbGF5ZXJDb25maWcpLFxuICAgICAgICAgICAgICAgIHBsYXllckNvbmZpZyxcbiAgICAgICAgICAgICAgICBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudEFkVGFnKClcbiAgICAgICAgICAgICk7XG5cblxuXG4gICAgICAgICAgICBpZihwcm92aWRlck5hbWUgPT09IFBST1ZJREVSX1JUTVApe1xuICAgICAgICAgICAgICAgIC8vSWYgcHJvdmlkZXIgdHlwZSBpcyBSVE1QLCB3ZSBhY2NlcHRzIFJ0bXBFeHBhbnNpb24uXG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGF0LCBBcGlSdG1wRXhwYW5zaW9uKGN1cnJlbnRQcm92aWRlcikpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL1RoaXMgcGFzc2VzIHRoZSBldmVudCBjcmVhdGVkIGJ5IHRoZSBQcm92aWRlciB0byBBUEkuXG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIub24oXCJhbGxcIiwgZnVuY3Rpb24obmFtZSwgZGF0YSl7XG5cbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIobmFtZSwgZGF0YSk7XG5cbiAgICAgICAgICAgICAgICBpZihuYW1lID09PSBcImNvbXBsZXRlXCIpe1xuICAgICAgICAgICAgICAgICAgICBydW5OZXh0UGxheWxpc3QocGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRQbGF5bGlzdEluZGV4KCkgKyAxKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvL0F1dG8gc3dpdGNoaW5nIG5leHQgc291cmNlIHdoZW4gcGxheWVyIGxvYWQgZmFpbGVkIGJ5IGFtaXNzIHNvdXJjZS5cbiAgICAgICAgICAgICAgICAvL2RhdGEuY29kZSA9PT0gUExBWUVSX0ZJTEVfRVJST1JcbiAgICAgICAgICAgICAgICBpZiggbmFtZSA9PT0gRVJST1IgfHwgbmFtZSA9PT0gTkVUV09SS19VTlNUQUJMRUQgKXtcbiAgICAgICAgICAgICAgICAgICAgLy9sZXQgY3VycmVudFNvdXJjZUluZGV4ID0gdGhhdC5nZXRDdXJyZW50U291cmNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5nZXRTb3VyY2VJbmRleCgpKzEgPCB0aGF0LmdldFNvdXJjZXMoKS5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzIHNlcXVlbnRpYWwgaGFzIGF2YWlsYWJsZSBzb3VyY2UuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBhdXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldEN1cnJlbnRTb3VyY2UocGxheWVyQ29uZmlnLmdldFNvdXJjZUluZGV4KCkrMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KS50aGVuKCgpPT57XG5cbiAgICAgICAgICAgIC8vcHJvdmlkZXIncyBwcmVsb2FkKCkgaGF2ZSB0byBtYWRlIFByb21pc2UuIEN1eiBpdCBvdmVyY29tZXMgJ2ZsYXNoIGxvYWRpbmcgdGltaW5nIHByb2JsZW0nLlxuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLnByZWxvYWQocGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRTb3VyY2VzKCksIGxhc3RQbGF5UG9zaXRpb24pLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoUkVBRFkpO1xuXG4gICAgICAgICAgICAgICAgbGF6eVF1ZXVlLmZsdXNoKCk7XG4gICAgICAgICAgICAgICAgLy9UaGlzIGlzIG5vIHJlYXNvbiB0byBleGlzdCBhbnltb3JlLlxuICAgICAgICAgICAgICAgIGxhenlRdWV1ZS5kZXN0cm95KCk7XG5cbiAgICAgICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGxhenlRdWV1ZS5vZmYoKTtcbiAgICAgICAgICAgICAgICBpZihlcnJvciAmJiBlcnJvci5jb2RlICYmIEVSUk9SU1tlcnJvci5jb2RlXSl7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihFUlJPUiwgRVJST1JTW2Vycm9yLmNvZGVdKTtcbiAgICAgICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlNbSU5JVF9VTktOV09OX0VSUk9SXTtcbiAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihFUlJPUiwgdGVtcEVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAvL0lOSVQgRVJST1JcbiAgICAgICAgICAgIGlmKGVycm9yICYmIGVycm9yLmNvZGUgJiYgRVJST1JTW2Vycm9yLmNvZGVdKXtcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoRVJST1IsIEVSUk9SU1tlcnJvci5jb2RlXSk7XG4gICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SU1tJTklUX1VOS05XT05fRVJST1JdO1xuICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihFUlJPUiwgdGVtcEVycm9yKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy94eHggOiBJZiB5b3UgaW5pdCBlbXB0eSBzb3VyY2VzLiAoSSB0aGluayB0aGlzIGlzIHN0cmFuZ2UgY2FzZS4pXG4gICAgICAgICAgICAvL1RoaXMgd29ya3MgZm9yIHRoaXMgY2FzZS5cbiAgICAgICAgICAgIC8vcGxheWVyID0gT3ZlblBsYXllci5jcmVhdGUoXCJlbElkXCIsIHt9KTtcbiAgICAgICAgICAgIC8vcGxheWVyLmxvYWQoc29ydWNlcyk7XG4gICAgICAgICAgICBsYXp5UXVldWUub2ZmKCk7XG4gICAgICAgICAgICAvL2xhenlRdWV1ZS5yZW1vdmVBbmRFeGN1dGVPbmNlKFwibG9hZFwiKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogQVBJIOy0iOq4sO2ZlCDtlajsiJhcbiAgICAgKiBpbml0XG4gICAgICogQHBhcmFtICAgICAge29iamVjdH0gb3B0aW9ucyBwbGF5ZXIgaW5pdGlhbCBvcHRpb24gdmFsdWUuXG4gICAgICogQHJldHVybnNcbiAgICAgKiovXG4gICAgdGhhdC5pbml0ID0gKG9wdGlvbnMpID0+e1xuICAgICAgICAvL0l0IGNvbGxlY3RzIHRoZSBjb21tYW5kcyBhbmQgZXhlY3V0ZXMgdGhlbSBhdCB0aGUgdGltZSB3aGVuIHRoZXkgYXJlIGV4ZWN1dGFibGUuXG4gICAgICAgIGxhenlRdWV1ZSA9IExhenlDb21tYW5kRXhlY3V0b3IodGhhdCwgW1xuICAgICAgICAgICAgJ2xvYWQnLCdwbGF5JywncGF1c2UnLCdzZWVrJywnc3RvcCcsICdnZXREdXJhdGlvbicsICdnZXRQb3NpdGlvbicsICdnZXRWb2x1bWUnXG4gICAgICAgICAgICAsICdnZXRNdXRlJywgJ2dldEJ1ZmZlcicsICdnZXRTdGF0ZScgLCAnZ2V0UXVhbGl0eUxldmVscydcbiAgICAgICAgXSk7XG4gICAgICAgIG9wdGlvbnMubWVkaWFDb250YWluZXIgPSBjb250YWluZXI7XG4gICAgICAgIG9wdGlvbnMuYnJvd3NlciA9IHVzZXJBZ2VudE9iamVjdDtcbiAgICAgICAgcGxheWVyQ29uZmlnID0gQ29uZmlndXJhdG9yKG9wdGlvbnMsIHRoYXQpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpbml0KClcIik7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGluaXQoKSBjb25maWcgOiBcIiwgcGxheWVyQ29uZmlnKTtcblxuICAgICAgICBwbGF5bGlzdE1hbmFnZXIuaW5pdFBsYXlsaXN0KHBsYXllckNvbmZpZy5nZXRQbGF5bGlzdCgpKTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaW5pdCgpIHNvdXJjZXMgOiBcIiAsIHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50U291cmNlcygpKTtcblxuICAgICAgICBpbml0UHJvdmlkZXIoKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0UHJvdmlkZXJOYW1lID0gKCkgPT4ge1xuICAgICAgICBpZihjdXJyZW50UHJvdmlkZXIpe1xuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXROYW1lKCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgIH1cbiAgICB0aGF0LmdldENvbmZpZyA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Q29uZmlnKClcIiwgcGxheWVyQ29uZmlnLmdldENvbmZpZygpKTtcbiAgICAgICAgcmV0dXJuIHBsYXllckNvbmZpZy5nZXRDb25maWcoKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0QnJvd3NlciA9ICgpID0+IHtcblxuICAgICAgICByZXR1cm4gcGxheWVyQ29uZmlnLmdldEJyb3dzZXIoKTtcbiAgICB9O1xuICAgIHRoYXQuc2V0VGltZWNvZGVNb2RlID0gKGlzU2hvdykgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldFRpbWVjb2RlTW9kZSgpXCIsIGlzU2hvdyk7XG4gICAgICAgIHBsYXllckNvbmZpZy5zZXRUaW1lY29kZU1vZGUoaXNTaG93KTtcbiAgICB9O1xuICAgIHRoYXQuaXNUaW1lY29kZU1vZGUgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGlzVGltZWNvZGVNb2RlKClcIik7XG4gICAgICAgIHJldHVybiBwbGF5ZXJDb25maWcuaXNUaW1lY29kZU1vZGUoKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0RnJhbWVyYXRlID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRGcmFtZXJhdGUoKVwiKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRGcmFtZXJhdGUoKTtcbiAgICB9O1xuICAgIHRoYXQuc2Vla0ZyYW1lID0gKGZyYW1lQ291bnQpID0+IHtcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZWVrRnJhbWUoKVwiLCBmcmFtZUNvdW50KTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5zZWVrRnJhbWUoZnJhbWVDb3VudCk7XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0RHVyYXRpb24gPSAoKSA9PiB7XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0RHVyYXRpb24oKVwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0RHVyYXRpb24oKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0RHVyYXRpb24oKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0UG9zaXRpb24gPSAoKSA9PiB7XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRQb3NpdGlvbigpXCIsIGN1cnJlbnRQcm92aWRlci5nZXRQb3NpdGlvbigpKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRQb3NpdGlvbigpO1xuICAgIH07XG4gICAgdGhhdC5nZXRWb2x1bWUgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRWb2x1bWUoKVwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0Vm9sdW1lKCkpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFZvbHVtZSgpO1xuICAgIH07XG4gICAgdGhhdC5zZXRWb2x1bWUgPSAodm9sdW1lKSA9PiB7XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRWb2x1bWUoKSBcIiArIHZvbHVtZSk7XG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5zZXRWb2x1bWUodm9sdW1lKTtcbiAgICB9O1xuICAgIHRoYXQuc2V0TXV0ZSA9IChzdGF0ZSkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0TXV0ZSgpIFwiICsgc3RhdGUpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLnNldE11dGUoc3RhdGUpO1xuICAgIH07XG4gICAgdGhhdC5nZXRNdXRlID0gKCkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0TXV0ZSgpIFwiICsgY3VycmVudFByb3ZpZGVyLmdldE11dGUoKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0TXV0ZSgpO1xuICAgIH07XG4gICAgdGhhdC5sb2FkID0gKHBsYXlsaXN0KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGxvYWQoKSBcIiwgcGxheWxpc3QpO1xuICAgICAgICBsYXp5UXVldWUgPSBMYXp5Q29tbWFuZEV4ZWN1dG9yKHRoYXQsIFsncGxheScsJ3NlZWsnLCdzdG9wJ10pO1xuXG4gICAgICAgIGlmKHBsYXlsaXN0KXtcbiAgICAgICAgICAgIGlmKGN1cnJlbnRQcm92aWRlcil7XG4gICAgICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLnNldEN1cnJlbnRRdWFsaXR5KDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGxheWxpc3RNYW5hZ2VyLmluaXRQbGF5bGlzdChwbGF5bGlzdCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGluaXRQcm92aWRlcigpO1xuXG4gICAgfTtcbiAgICB0aGF0LnBsYXkgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcGxheSgpIFwiKTtcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnBsYXkoKTtcbiAgICB9XG4gICAgdGhhdC5wYXVzZSA9ICgpID0+IHtcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHBhdXNlKCkgXCIpO1xuICAgICAgICBjdXJyZW50UHJvdmlkZXIucGF1c2UoKTtcbiAgICB9O1xuICAgIHRoYXQuc2VlayA9IChwb3NpdGlvbikgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2VlaygpIFwiKyBwb3NpdGlvbik7XG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5zZWVrKHBvc2l0aW9uKTtcbiAgICB9O1xuICAgIHRoYXQuc2V0UGxheWJhY2tSYXRlID0gKHBsYXliYWNrUmF0ZSkgPT57XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRQbGF5YmFja1JhdGUoKSBcIiwgcGxheWJhY2tSYXRlKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5zZXRQbGF5YmFja1JhdGUocGxheWVyQ29uZmlnLnNldFBsYXliYWNrUmF0ZShwbGF5YmFja1JhdGUpKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0UGxheWJhY2tSYXRlID0gKCkgPT57XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRQbGF5YmFja1JhdGUoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldFBsYXliYWNrUmF0ZSgpKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRQbGF5YmFja1JhdGUoKTtcbiAgICB9O1xuXG4gICAgdGhhdC5nZXRQbGF5bGlzdCA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0UGxheWxpc3QoKSBcIiwgcGxheWxpc3RNYW5hZ2VyLmdldFBsYXlsaXN0KCkpO1xuICAgICAgICByZXR1cm4gcGxheWxpc3RNYW5hZ2VyLmdldFBsYXlsaXN0KCk7XG4gICAgfTtcbiAgICB0aGF0LmdldEN1cnJlbnRQbGF5bGlzdCA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Q3VycmVudFBsYXlsaXN0KCkgXCIsIHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50UGxheWxpc3RJbmRleCgpKTtcbiAgICAgICAgcmV0dXJuIHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50UGxheWxpc3RJbmRleCgpO1xuICAgIH07XG4gICAgdGhhdC5zZXRDdXJyZW50UGxheWxpc3QgPSAoaW5kZXgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Q3VycmVudFBsYXlsaXN0KCkgXCIsIGluZGV4KTtcbiAgICAgICAgcnVuTmV4dFBsYXlsaXN0KGluZGV4KTtcbiAgICB9O1xuXG4gICAgdGhhdC5nZXRTb3VyY2VzID0gKCkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0U291cmNlcygpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0U291cmNlcygpKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRTb3VyY2VzKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldEN1cnJlbnRTb3VyY2UgPSAoKSA9PntcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEN1cnJlbnRTb3VyY2UoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldEN1cnJlbnRTb3VyY2UoKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFNvdXJjZSgpO1xuICAgIH07XG4gICAgdGhhdC5zZXRDdXJyZW50U291cmNlID0gKGluZGV4KSA9PntcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEN1cnJlbnRTb3VyY2UoKSBcIiwgaW5kZXgpO1xuXG4gICAgICAgIGxldCBzb3VyY2VzID0gY3VycmVudFByb3ZpZGVyLmdldFNvdXJjZXMoKTtcbiAgICAgICAgbGV0IGN1cnJlbnRTb3VyY2UgPSBzb3VyY2VzW2N1cnJlbnRQcm92aWRlci5nZXRDdXJyZW50U291cmNlKCldO1xuICAgICAgICBsZXQgbmV3U291cmNlID0gc291cmNlc1tpbmRleF07XG4gICAgICAgIGxldCBsYXN0UGxheVBvc2l0aW9uID0gY3VycmVudFByb3ZpZGVyLmdldFBvc2l0aW9uKCk7XG4gICAgICAgIGxldCBpc1NhbWVQcm92aWRlciA9IHByb3ZpZGVyQ29udHJvbGxlci5pc1NhbWVQcm92aWRlcihjdXJyZW50U291cmNlLCBuZXdTb3VyY2UpO1xuICAgICAgICAvLyBwcm92aWRlci5zZXJDdXJyZW50UXVhbGl0eSAtPiBwbGF5ZXJDb25maWcgc2V0dGluZyAtPiBsb2FkXG4gICAgICAgIGxldCByZXN1bHRTb3VyY2VJbmRleCA9IGN1cnJlbnRQcm92aWRlci5zZXRDdXJyZW50U291cmNlKGluZGV4LCBpc1NhbWVQcm92aWRlcik7XG5cbiAgICAgICAgaWYoIW5ld1NvdXJjZSl7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEN1cnJlbnRRdWFsaXR5KCkgaXNTYW1lUHJvdmlkZXJcIiwgaXNTYW1lUHJvdmlkZXIpO1xuXG5cbiAgICAgICAgLy9zd2l0Y2hpbmcgYmV0d2VlbiBzdHJlYW1zIG9uIEhMUy4gd3RoPyBodHRwczovL3ZpZGVvLWRldi5naXRodWIuaW8vaGxzLmpzL2xhdGVzdC9kb2NzL0FQSS5odG1sI2ZpbmFsLXN0ZXAtZGVzdHJveWluZy1zd2l0Y2hpbmctYmV0d2Vlbi1zdHJlYW1zXG4gICAgICAgIGlmKCFpc1NhbWVQcm92aWRlciB8fCBjdXJyZW50UHJvdmlkZXIuZ2V0TmFtZSgpID09PSBQUk9WSURFUl9ITFMpe1xuICAgICAgICAgICAgbGF6eVF1ZXVlID0gTGF6eUNvbW1hbmRFeGVjdXRvcih0aGF0LCBbJ3BsYXknLCdzZWVrJ10pO1xuICAgICAgICAgICAgaW5pdFByb3ZpZGVyKGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdFNvdXJjZUluZGV4O1xuICAgIH07XG5cblxuXG4gICAgdGhhdC5nZXRRdWFsaXR5TGV2ZWxzID0gKCkgPT57XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRRdWFsaXR5TGV2ZWxzKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRRdWFsaXR5TGV2ZWxzKCkpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFF1YWxpdHlMZXZlbHMoKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Q3VycmVudFF1YWxpdHkgPSAoKSA9PntcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEN1cnJlbnRRdWFsaXR5KCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRDdXJyZW50UXVhbGl0eSgpKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRDdXJyZW50UXVhbGl0eSgpO1xuICAgIH07XG4gICAgdGhhdC5zZXRDdXJyZW50UXVhbGl0eSA9IChxdWFsaXR5SW5kZXgpID0+e1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Q3VycmVudFF1YWxpdHkoKSBcIiwgcXVhbGl0eUluZGV4KTtcblxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLnNldEN1cnJlbnRRdWFsaXR5KHF1YWxpdHlJbmRleCk7XG4gICAgfTtcbiAgICB0aGF0LmlzQXV0b1F1YWxpdHkgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpc0F1dG9RdWFsaXR5KClcIik7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuaXNBdXRvUXVhbGl0eSgpO1xuICAgIH07XG4gICAgdGhhdC5zZXRBdXRvUXVhbGl0eSA9IChpc0F1dG8pID0+IHtcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEF1dG9RdWFsaXR5KCkgXCIsIGlzQXV0byk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2V0QXV0b1F1YWxpdHkoaXNBdXRvKTtcbiAgICB9XG5cbiAgICB0aGF0LmdldENhcHRpb25MaXN0ID0gKCkgPT4ge1xuICAgICAgICBpZighY2FwdGlvbk1hbmFnZXIpe3JldHVybiBudWxsO31cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Q2FwdGlvbkxpc3QoKSBcIiwgY2FwdGlvbk1hbmFnZXIuZ2V0Q2FwdGlvbkxpc3QoKSk7XG4gICAgICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5nZXRDYXB0aW9uTGlzdCgpO1xuICAgIH1cbiAgICB0aGF0LmdldEN1cnJlbnRDYXB0aW9uID0gKCkgPT4ge1xuICAgICAgICBpZighY2FwdGlvbk1hbmFnZXIpe3JldHVybiBudWxsO31cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Q3VycmVudENhcHRpb24oKSBcIiwgY2FwdGlvbk1hbmFnZXIuZ2V0Q3VycmVudENhcHRpb24oKSk7XG4gICAgICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5nZXRDdXJyZW50Q2FwdGlvbigpO1xuICAgIH1cbiAgICB0aGF0LnNldEN1cnJlbnRDYXB0aW9uID0gKGluZGV4KSA9PiB7XG4gICAgICAgIGlmKCFjYXB0aW9uTWFuYWdlcil7cmV0dXJuIG51bGw7fVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRDdXJyZW50Q2FwdGlvbigpIFwiLCBpbmRleCk7XG4gICAgICAgIGNhcHRpb25NYW5hZ2VyLnNldEN1cnJlbnRDYXB0aW9uKGluZGV4KTtcbiAgICB9XG4gICAgdGhhdC5hZGRDYXB0aW9uID0gKHRyYWNrKSA9PiB7XG4gICAgICAgIGlmKCFjYXB0aW9uTWFuYWdlcil7cmV0dXJuIG51bGw7fVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBhZGRDYXB0aW9uKCkgXCIpXG4gICAgICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5hZGRDYXB0aW9uKHRyYWNrKTtcbiAgICB9XG4gICAgdGhhdC5yZW1vdmVDYXB0aW9uID0gKGluZGV4KSA9PiB7XG4gICAgICAgIGlmKCFjYXB0aW9uTWFuYWdlcil7cmV0dXJuIG51bGw7fVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiByZW1vdmVDYXB0aW9uKCkgXCIsIGluZGV4KVxuICAgICAgICByZXR1cm4gY2FwdGlvbk1hbmFnZXIucmVtb3ZlQ2FwdGlvbihpbmRleCk7XG4gICAgfVxuXG4gICAgdGhhdC5nZXRCdWZmZXIgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0QnVmZmVyKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRCdWZmZXIoKSk7XG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5nZXRCdWZmZXIoKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0U3RhdGUgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0U3RhdGUoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldFN0YXRlKCkpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFN0YXRlKCk7XG4gICAgfTtcbiAgICB0aGF0LnN0b3AgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzdG9wKCkgXCIpO1xuICAgICAgICBjdXJyZW50UHJvdmlkZXIuc3RvcCgpO1xuICAgIH07XG4gICAgdGhhdC5yZW1vdmUgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiByZW1vdmUoKSBcIik7XG4gICAgICAgIGxhenlRdWV1ZS5kZXN0cm95KCk7XG4gICAgICAgIGlmKGNhcHRpb25NYW5hZ2VyKXtcbiAgICAgICAgICAgIGNhcHRpb25NYW5hZ2VyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIGNhcHRpb25NYW5hZ2VyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGN1cnJlbnRQcm92aWRlcil7XG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG1lZGlhTWFuYWdlcil7XG4gICAgICAgICAgICBtZWRpYU1hbmFnZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgbWVkaWFNYW5hZ2VyID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBwcm92aWRlckNvbnRyb2xsZXIgPSBudWxsO1xuICAgICAgICBwbGF5bGlzdE1hbmFnZXIgPSBudWxsO1xuICAgICAgICBwbGF5ZXJDb25maWcgPSBudWxsO1xuICAgICAgICBsYXp5UXVldWUgPSBudWxsO1xuXG4gICAgICAgIHRoYXQudHJpZ2dlcihERVNUUk9ZKTtcbiAgICAgICAgdGhhdC5vZmYoKTtcblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiByZW1vdmUoKSAtIGxhenlRdWV1ZSwgY3VycmVudFByb3ZpZGVyLCBwcm92aWRlckNvbnRyb2xsZXIsIHBsYXlsaXN0TWFuYWdlciwgcGxheWVyQ29uZmlnLCBhcGkgZXZlbnQgZGVzdHJvZWQuIFwiKTtcbiAgICAgICAgT3ZlblBsYXllclNESy5yZW1vdmVQbGF5ZXIodGhhdC5nZXRDb250YWluZXJJZCgpKTtcbiAgICAgICAgaWYoT3ZlblBsYXllclNESy5nZXRQbGF5ZXJMaXN0KCkubGVuZ3RoICA9PT0gMCl7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJPdmVuUGxheWVyU0RLLnBsYXllckxpc3RcIiwgIE92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyTGlzdCgpKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0LmdldFZlcnNpb24gPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBcInYuXCIrdmVyc2lvbjtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgQXBpO1xuXG5cbiIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDguIDI0Li5cbiAqL1xuXG5leHBvcnQgY29uc3QgQXBpUnRtcEV4cGFuc2lvbiA9IGZ1bmN0aW9uKGN1cnJlbnRQcm92aWRlcil7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZXh0ZXJuYWxDYWxsYmFja0NyZWVwIDogKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgaWYocmVzdWx0Lm5hbWUgJiYgcmVzdWx0LmRhdGEpe1xuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIudHJpZ2dlckV2ZW50RnJvbUV4dGVybmFsKHJlc3VsdC5uYW1lLCByZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59O1xuIiwiaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcblxuaW1wb3J0IHtcbiAgICBDT05URU5UX1RJTUVfTU9ERV9DSEFOR0VEXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5cbi8qKlxuICogQGJyaWVmICAgVGhpcyBpbml0aWFsaXplcyB0aGUgaW5wdXQgb3B0aW9ucy5cbiAqIEBwYXJhbSAgIG9wdGlvbnNcbiAqXG4gKiAqL1xuY29uc3QgQ29uZmlndXJhdG9yID0gZnVuY3Rpb24ob3B0aW9ucywgcHJvdmlkZXIpe1xuXG4gICAgY29uc3QgY29tcG9zZVNvdXJjZU9wdGlvbnMgPSBmdW5jdGlvbihvcHRpb25zKXtcbiAgICAgICAgY29uc3QgRGVmYXVsdHMgPSB7XG4gICAgICAgICAgICBtZWRpYUNvbnRhaW5lciA6IFwiXCIsXG4gICAgICAgICAgICBwbGF5YmFja1JhdGVzOiBbMiwgMS41LCAxLCAwLjUsIDAuMjVdLFxuICAgICAgICAgICAgcGxheWJhY2tSYXRlOiAxLFxuICAgICAgICAgICAgbXV0ZTogZmFsc2UsXG4gICAgICAgICAgICB2b2x1bWU6IDEwMCxcbiAgICAgICAgICAgIGxvb3AgOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbnRyb2xzIDogdHJ1ZSxcbiAgICAgICAgICAgIGF1dG9TdGFydCA6IGZhbHNlLFxuICAgICAgICAgICAgdGltZWNvZGUgOiB0cnVlLFxuICAgICAgICAgICAgc291cmNlSW5kZXggOiAwLFxuICAgICAgICAgICAgYnJvd3NlciA6IFwiXCIsXG4gICAgICAgICAgICBoaWRlUGxheWxpc3RJY29uIDogZmFsc2UsXG4gICAgICAgICAgICBydG1wQnVmZmVyVGltZSA6IDEsXG4gICAgICAgICAgICBydG1wQnVmZmVyVGltZU1heCA6IDMsXG4gICAgICAgICAgICBhZENsaWVudCA6IFwiZ29vZ2xlaW1hXCJcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgc2VyaWFsaXplID0gZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycgJiYgdmFsLmxlbmd0aCA8IDYpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsb3dlcmNhc2VWYWwgPSB2YWwudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICBpZiAobG93ZXJjYXNlVmFsID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChsb3dlcmNhc2VWYWwgPT09ICdmYWxzZScpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKE51bWJlcih2YWwpKSAmJiAhaXNOYU4ocGFyc2VGbG9hdCh2YWwpKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gTnVtYmVyKHZhbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkZXNlcmlhbGl6ZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSAnaWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3B0aW9uc1trZXldID0gc2VyaWFsaXplKG9wdGlvbnNba2V5XSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRlc2VyaWFsaXplKG9wdGlvbnMpO1xuICAgICAgICBsZXQgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgRGVmYXVsdHMsIG9wdGlvbnMpO1xuXG4gICAgICAgIGxldCBwbGF5YmFja1JhdGVzID0gY29uZmlnLnBsYXliYWNrUmF0ZXM7XG5cbiAgICAgICAgcGxheWJhY2tSYXRlcyA9IHBsYXliYWNrUmF0ZXMuZmlsdGVyKHJhdGUgPT4gXy5pc051bWJlcihyYXRlKSAmJiByYXRlID49IDAuMjUgJiYgcmF0ZSA8PSA0KS5tYXAocmF0ZSA9PiBNYXRoLnJvdW5kKHJhdGUgKiA0KSAvIDQpO1xuXG4gICAgICAgIGlmIChwbGF5YmFja1JhdGVzLmluZGV4T2YoMSkgPCAwKSB7XG4gICAgICAgICAgICBwbGF5YmFja1JhdGVzLnB1c2goMSk7XG4gICAgICAgIH1cbiAgICAgICAgcGxheWJhY2tSYXRlcy5zb3J0KCk7XG5cbiAgICAgICAgY29uZmlnLnBsYXliYWNrUmF0ZXMgPSBwbGF5YmFja1JhdGVzO1xuXG4gICAgICAgIGNvbmZpZy5ydG1wQnVmZmVyVGltZSA9IGNvbmZpZy5ydG1wQnVmZmVyVGltZSA+IDEwID8gMTAgOiBjb25maWcucnRtcEJ1ZmZlclRpbWU7XG4gICAgICAgIGNvbmZpZy5ydG1wQnVmZmVyVGltZU1heCA9IGNvbmZpZy5ydG1wQnVmZmVyVGltZU1heCA+IDUwID8gNTAgOiBjb25maWcucnRtcEJ1ZmZlclRpbWVNYXg7XG5cblxuICAgICAgICBpZiAoY29uZmlnLnBsYXliYWNrUmF0ZXMuaW5kZXhPZihjb25maWcucGxheWJhY2tSYXRlKSA8IDApIHtcbiAgICAgICAgICAgIGNvbmZpZy5wbGF5YmFja1JhdGUgPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29uZmlnUGxheWxpc3QgPSBjb25maWcucGxheWxpc3Q7XG4gICAgICAgIGlmICghY29uZmlnUGxheWxpc3QpIHtcbiAgICAgICAgICAgIGNvbnN0IG9iaiA9IF8ucGljayhjb25maWcsIFtcbiAgICAgICAgICAgICAgICAndGl0bGUnLFxuICAgICAgICAgICAgICAgICdkZXNjcmlwdGlvbicsXG4gICAgICAgICAgICAgICAgJ3R5cGUnLFxuICAgICAgICAgICAgICAgICdpbWFnZScsXG4gICAgICAgICAgICAgICAgJ2ZpbGUnLFxuICAgICAgICAgICAgICAgICdzb3VyY2VzJyxcbiAgICAgICAgICAgICAgICAndHJhY2tzJyxcbiAgICAgICAgICAgICAgICAnaG9zdCcsXG4gICAgICAgICAgICAgICAgJ2FwcGxpY2F0aW9uJyxcbiAgICAgICAgICAgICAgICAnc3RyZWFtJyxcbiAgICAgICAgICAgICAgICAnYWRUYWdVcmwnXG4gICAgICAgICAgICBdKTtcblxuICAgICAgICAgICAgY29uZmlnLnBsYXlsaXN0ID0gWyBvYmogXTtcbiAgICAgICAgfSBlbHNlIGlmIChfLmlzQXJyYXkoY29uZmlnUGxheWxpc3QucGxheWxpc3QpKSB7XG4gICAgICAgICAgICBjb25maWcuZmVlZERhdGEgPSBjb25maWdQbGF5bGlzdDtcbiAgICAgICAgICAgIGNvbmZpZy5wbGF5bGlzdCA9IGNvbmZpZ1BsYXlsaXN0LnBsYXlsaXN0O1xuICAgICAgICB9XG5cbiAgICAgICAgZGVsZXRlIGNvbmZpZy5kdXJhdGlvbjtcbiAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICB9O1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNvbmZpZ3VyYXRvciBsb2FkZWQuXCIsIG9wdGlvbnMpO1xuICAgIGxldCBzcGVjID0gY29tcG9zZVNvdXJjZU9wdGlvbnMob3B0aW9ucyk7XG5cbiAgICBzcGVjLmlzRnVsbHNjcmVlbiA9IGZhbHNlOyAvL0lFIDExIGNhbid0IGNoZWNrIGN1cnJlbnQgZnVsbHNjcmVlbiBzdGF0ZS5cblxuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICB0aGF0LmdldENvbmZpZyA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWM7XG4gICAgfTtcbiAgICB0aGF0LmdldEFkQ2xpZW50ID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5hZENsaWVudDtcbiAgICB9O1xuICAgIHRoYXQuc2V0Q29uZmlnID0gKGNvbmZpZywgdmFsdWUpID0+IHtcbiAgICAgICAgc3BlY1tjb25maWddID0gdmFsdWU7XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0Q29udGFpbmVyID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5tZWRpYUNvbnRhaW5lcjtcbiAgICB9O1xuICAgIHRoYXQuaXNGdWxsc2NyZWVuID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5pc0Z1bGxzY3JlZW47XG4gICAgfVxuICAgIHRoYXQuc2V0RnVsbHNjcmVlbiA9IChpc0Z1bGxzY3JlZW4pID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuaXNGdWxsc2NyZWVuID0gaXNGdWxsc2NyZWVuO1xuICAgIH1cblxuICAgIHRoYXQuZ2V0UGxheWJhY2tSYXRlID0oKT0+e1xuICAgICAgICByZXR1cm4gc3BlYy5wbGF5YmFja1JhdGU7XG4gICAgfTtcbiAgICB0aGF0LnNldFBsYXliYWNrUmF0ZSA9KHBsYXliYWNrUmF0ZSk9PntcbiAgICAgICAgc3BlYy5wbGF5YmFja1JhdGUgPSBwbGF5YmFja1JhdGU7XG4gICAgICAgIHJldHVybiBwbGF5YmFja1JhdGU7XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0UXVhbGl0eUxhYmVsID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5xdWFsaXR5TGFiZWw7XG4gICAgfTtcbiAgICB0aGF0LnNldFF1YWxpdHlMYWJlbCA9IChuZXdMYWJlbCkgPT4ge1xuICAgICAgICBzcGVjLnF1YWxpdHlMYWJlbCA9IG5ld0xhYmVsO1xuICAgIH07XG5cbiAgICAvKnRoYXQuZ2V0U291cmNlTGFiZWwgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLnNvdXJjZUxhYmVsO1xuICAgIH07XG4gICAgdGhhdC5zZXRTb3VyY2VMYWJlbCA9IChuZXdMYWJlbCkgPT4ge1xuICAgICAgICBzcGVjLnNvdXJjZUxhYmVsID0gbmV3TGFiZWw7XG4gICAgfTsqL1xuXG4gICAgdGhhdC5nZXRTb3VyY2VJbmRleCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuc291cmNlSW5kZXg7XG4gICAgfTtcbiAgICB0aGF0LnNldFNvdXJjZUluZGV4ID0gKGluZGV4KSA9PiB7XG4gICAgICAgIHNwZWMuc291cmNlSW5kZXggPSBpbmRleDtcbiAgICB9O1xuICAgIHRoYXQuc2V0VGltZWNvZGVNb2RlID0gKHRpbWVjb2RlKSA9PiB7XG4gICAgICAgIGlmKHNwZWMudGltZWNvZGUgIT09IHRpbWVjb2RlKXtcbiAgICAgICAgICAgIHNwZWMudGltZWNvZGUgPSB0aW1lY29kZTtcbiAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9USU1FX01PREVfQ0hBTkdFRCwgdGltZWNvZGUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LmlzVGltZWNvZGVNb2RlID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy50aW1lY29kZTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0UnRtcEJ1ZmZlclRpbWUgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLnJ0bXBCdWZmZXJUaW1lO1xuICAgIH07XG4gICAgdGhhdC5nZXRSdG1wQnVmZmVyVGltZU1heCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMucnRtcEJ1ZmZlclRpbWVNYXg7XG4gICAgfTtcblxuICAgIHRoYXQuaXNNdXRlID0gKCkgPT57XG4gICAgICAgIHJldHVybiBzcGVjLm11dGU7XG4gICAgfTtcbiAgICB0aGF0LmdldFZvbHVtZSA9ICgpID0+e1xuICAgICAgICByZXR1cm4gc3BlYy52b2x1bWU7XG4gICAgfTtcbiAgICB0aGF0LmlzTG9vcCA9ICgpID0+e1xuICAgICAgICByZXR1cm4gc3BlYy5sb29wO1xuICAgIH07XG4gICAgdGhhdC5pc0F1dG9TdGFydCA9ICgpID0+e1xuICAgICAgICByZXR1cm4gc3BlYy5hdXRvU3RhcnQ7XG4gICAgfTtcbiAgICB0aGF0LmlzQ29udHJvbHMgPSAoKSA9PntcbiAgICAgICAgcmV0dXJuIHNwZWMuY29udHJvbHM7XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0UGxheWJhY2tSYXRlcyA9KCk9PntcbiAgICAgICAgcmV0dXJuIHNwZWMucGxheWJhY2tSYXRlcztcbiAgICB9O1xuICAgIHRoYXQuZ2V0QnJvd3NlciA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuYnJvd3NlcjtcbiAgICB9O1xuXG4gICAgdGhhdC5nZXRQbGF5bGlzdCA9KCk9PntcbiAgICAgICAgcmV0dXJuIHNwZWMucGxheWxpc3Q7XG4gICAgfTtcbiAgICB0aGF0LnNldFBsYXlsaXN0ID0ocGxheWxpc3QpPT57XG4gICAgICAgIGlmKF8uaXNBcnJheShwbGF5bGlzdCkpe1xuICAgICAgICAgICAgc3BlYy5wbGF5bGlzdCA9IHBsYXlsaXN0O1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHNwZWMucGxheWxpc3QgPSBbcGxheWxpc3RdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcGVjLnBsYXlsaXN0O1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbmZpZ3VyYXRvcjtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDMuLlxuICovXG5cbi8qKlxuICogQGJyaWVmICAgVGhpcyBtb2R1bGUgcHJvdmlkZSBjdXN0b20gZXZlbnRzLlxuICogQHBhcmFtICAgb2JqZWN0ICAgIEFuIG9iamVjdCB0aGF0IHJlcXVpcmVzIGN1c3RvbSBldmVudHMuXG4gKlxuICogKi9cblxuY29uc3QgRXZlbnRFbWl0dGVyID0gZnVuY3Rpb24ob2JqZWN0KXtcbiAgICBsZXQgdGhhdCA9IG9iamVjdDtcbiAgICBsZXQgX2V2ZW50cyA9W107XG5cbiAgICBjb25zdCB0cmlnZ2VyRXZlbnRzID0gZnVuY3Rpb24oZXZlbnRzLCBhcmdzLCBjb250ZXh0KXtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBsZXQgbGVuZ3RoID0gZXZlbnRzLmxlbmd0aDtcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgbGVuZ3RoOyBpICsrKXtcbiAgICAgICAgICAgIGxldCBldmVudCA9IGV2ZW50c1tpXTtcbiAgICAgICAgICAgIGV2ZW50Lmxpc3RlbmVyLmFwcGx5KCAoIGV2ZW50LmNvbnRleHQgfHwgY29udGV4dCApLCBhcmdzKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0Lm9uID0gZnVuY3Rpb24obmFtZSwgbGlzdGVuZXIsIGNvbnRleHQpe1xuICAgICAgICAoX2V2ZW50c1tuYW1lXSB8fCAoX2V2ZW50c1tuYW1lXT1bXSkgKS5wdXNoKHsgbGlzdGVuZXI6IGxpc3RlbmVyICAsIGNvbnRleHQgOiBjb250ZXh0fSk7XG4gICAgICAgIHJldHVybiB0aGF0O1xuICAgIH07XG4gICAgdGhhdC50cmlnZ2VyID0gZnVuY3Rpb24obmFtZSl7XG4gICAgICAgIGlmKCFfZXZlbnRzKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICBjb25zdCBldmVudHMgPSBfZXZlbnRzW25hbWVdO1xuICAgICAgICBjb25zdCBhbGxFdmVudHMgPSBfZXZlbnRzLmFsbDtcblxuICAgICAgICBpZihldmVudHMpe1xuICAgICAgICAgICAgdHJpZ2dlckV2ZW50cyhldmVudHMsIGFyZ3MsIHRoYXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmKGFsbEV2ZW50cyl7XG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnRzKGFsbEV2ZW50cywgYXJndW1lbnRzLCB0aGF0KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhhdC5vZmYgPSBmdW5jdGlvbihuYW1lLCBsaXN0ZW5lciwgY29udGV4dCl7XG4gICAgICAgIGlmKCFfZXZlbnRzKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghbmFtZSAmJiAhbGlzdGVuZXIgJiYgIWNvbnRleHQpICB7XG4gICAgICAgICAgICBfZXZlbnRzID0gW107XG4gICAgICAgICAgICByZXR1cm4gdGhhdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5hbWVzID0gbmFtZSA/IFtuYW1lXSA6IE9iamVjdC5rZXlzKF9ldmVudHMpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gbmFtZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBuYW1lID0gbmFtZXNbaV07XG4gICAgICAgICAgICBjb25zdCBldmVudHMgPSBfZXZlbnRzW25hbWVdO1xuICAgICAgICAgICAgaWYgKGV2ZW50cykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJldGFpbiA9IF9ldmVudHNbbmFtZV0gPSBbXTtcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIgIHx8IGNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDAsIGsgPSBldmVudHMubGVuZ3RoOyBqIDwgazsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBldmVudCA9IGV2ZW50c1tqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgobGlzdGVuZXIgJiYgbGlzdGVuZXIgIT09IGV2ZW50Lmxpc3RlbmVyICYmIGxpc3RlbmVyICE9PSBldmVudC5saXN0ZW5lci5saXN0ZW5lciAgJiYgbGlzdGVuZXIgIT09IGV2ZW50Lmxpc3RlbmVyLl9saXN0ZW5lcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fChjb250ZXh0ICYmIGNvbnRleHQgIT09IGV2ZW50LmNvbnRleHQpXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXRhaW4ucHVzaChldmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFyZXRhaW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBfZXZlbnRzW25hbWVdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhhdDtcbiAgICB9O1xuICAgIHRoYXQub25jZSA9IGZ1bmN0aW9uKG5hbWUsIGxpc3RlbmVyLCBjb250ZXh0KXtcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgY29uc3Qgb25jZUNhbGxiYWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoY291bnQrKykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoYXQub2ZmKG5hbWUsIG9uY2VDYWxsYmFjayk7XG4gICAgICAgICAgICBsaXN0ZW5lci5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgICAgICBvbmNlQ2FsbGJhY2suX2xpc3RlbmVyID0gbGlzdGVuZXI7XG4gICAgICAgIHJldHVybiB0aGF0Lm9uKG5hbWUsIG9uY2VDYWxsYmFjaywgY29udGV4dCk7XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBFdmVudEVtaXR0ZXI7XG4iLCJpbXBvcnQgXyBmcm9tICd1dGlscy91bmRlcnNjb3JlJztcblxuLyoqXG4gKiBAYnJpZWYgICBUaGlzIGV4ZWN1dGVzIHRoZSBpbnB1dCBjb21tYW5kcyBhdCBhIHNwZWNpZmljIHBvaW50IGluIHRpbWUuXG4gKiBAcGFyYW0gICBpbnN0YW5jZVxuICogQHBhcmFtICAgcXVldWVkQ29tbWFuZHNcbiAqICovXG5jb25zdCBMYXp5Q29tbWFuZEV4ZWN1dG9yID0gZnVuY3Rpb24gKGluc3RhbmNlLCBxdWV1ZWRDb21tYW5kcykge1xuICAgIGxldCBjb21tYW5kUXVldWUgPSBbXTtcbiAgICBsZXQgdW5kZWNvcmF0ZWRNZXRob2RzID0ge307XG4gICAgbGV0IGV4ZWN1dGVNb2RlID0gZmFsc2U7XG4gICAgbGV0IHRoYXQgPSB7fTtcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIGxvYWRlZC5cIik7XG4gICAgcXVldWVkQ29tbWFuZHMuZm9yRWFjaCgoY29tbWFuZCkgPT4ge1xuICAgICAgICBjb25zdCBtZXRob2QgPSBpbnN0YW5jZVtjb21tYW5kXTtcbiAgICAgICAgdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdID0gbWV0aG9kIHx8IGZ1bmN0aW9uKCl7fTtcblxuICAgICAgICBpbnN0YW5jZVtjb21tYW5kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc3QgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgICAgICAgICAgIGlmICghZXhlY3V0ZU1vZGUpIHtcbiAgICAgICAgICAgICAgICAvL2NvbW1hbmRRdWV1ZS5wdXNoKHsgY29tbWFuZCwgYXJncyB9KTtcbiAgICAgICAgICAgICAgICB0aGF0LmFkZFF1ZXVlKGNvbW1hbmQsIGFyZ3MpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGV4ZWN1dGVRdWV1ZWRDb21tYW5kcygpO1xuICAgICAgICAgICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kLmFwcGx5KHRoYXQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KTtcbiAgICB2YXIgZXhlY3V0ZVF1ZXVlZENvbW1hbmRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB3aGlsZSAoY29tbWFuZFF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHsgY29tbWFuZCwgYXJncyB9ID0gY29tbWFuZFF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICAodW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdIHx8IGluc3RhbmNlW2NvbW1hbmRdKS5hcHBseShpbnN0YW5jZSwgYXJncyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGF0LnNldEV4ZWN1dGVNb2RlID0gKG1vZGUpID0+IHtcbiAgICAgICAgZXhlY3V0ZU1vZGUgPSBtb2RlO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogc2V0RXhlY3V0ZU1vZGUoKVwiLCBtb2RlKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0VW5kZWNvcmF0ZWRNZXRob2RzID0gZnVuY3Rpb24oKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGdldFVuZGVjb3JhdGVkTWV0aG9kcygpXCIsIHVuZGVjb3JhdGVkTWV0aG9kcyk7XG4gICAgICAgIHJldHVybiB1bmRlY29yYXRlZE1ldGhvZHM7XG4gICAgfVxuICAgIHRoYXQuZ2V0UXVldWUgPSBmdW5jdGlvbigpe1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZ2V0UXVldWUoKVwiLCBnZXRRdWV1ZSk7XG4gICAgICAgIHJldHVybiBjb21tYW5kUXVldWU7XG4gICAgfVxuICAgIHRoYXQuYWRkUXVldWUgPSBmdW5jdGlvbihjb21tYW5kLCBhcmdzKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGFkZFF1ZXVlKClcIiwgY29tbWFuZCwgYXJncyk7XG4gICAgICAgIGNvbW1hbmRRdWV1ZS5wdXNoKHsgY29tbWFuZCwgYXJncyB9KTtcbiAgICB9XG5cbiAgICB0aGF0LmZsdXNoID0gZnVuY3Rpb24oKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGZsdXNoKClcIik7XG4gICAgICAgIGV4ZWN1dGVRdWV1ZWRDb21tYW5kcygpO1xuICAgIH07XG4gICAgdGhhdC5lbXB0eSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZW1wdHkoKVwiKTtcbiAgICAgICAgY29tbWFuZFF1ZXVlLmxlbmd0aCA9IDA7XG4gICAgfTtcbiAgICB0aGF0Lm9mZiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogb2ZmKClcIik7XG4gICAgICAgIHF1ZXVlZENvbW1hbmRzLmZvckVhY2goKGNvbW1hbmQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1ldGhvZCA9IHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXTtcbiAgICAgICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVtjb21tYW5kXSA9IG1ldGhvZDtcbiAgICAgICAgICAgICAgICBkZWxldGUgdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG5cbiAgICAvL1J1biBvbmNlIGF0IHRoZSBlbmRcbiAgICB0aGF0LnJlbW92ZUFuZEV4Y3V0ZU9uY2UgPSBmdW5jdGlvbihjb21tYW5kXyl7XG4gICAgICAgIGxldCBjb21tYW5kUXVldWVJdGVtID0gXy5maW5kV2hlcmUoY29tbWFuZFF1ZXVlLCB7Y29tbWFuZCA6IGNvbW1hbmRffSk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiByZW1vdmVBbmRFeGN1dGVPbmNlKClcIiwgY29tbWFuZF8pO1xuICAgICAgICBjb21tYW5kUXVldWUuc3BsaWNlKF8uZmluZEluZGV4KGNvbW1hbmRRdWV1ZSwge2NvbW1hbmQgOiBjb21tYW5kX30pLCAxKTtcblxuICAgICAgICBjb25zdCBtZXRob2QgPSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF9dO1xuICAgICAgICBpZiAobWV0aG9kKSB7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJyZW1vdmVDb21tYW5kKClcIik7XG4gICAgICAgICAgICBpZihjb21tYW5kUXVldWVJdGVtKXtcbiAgICAgICAgICAgICAgICAobWV0aG9kfHwgaW5zdGFuY2VbY29tbWFuZF9dKS5hcHBseShpbnN0YW5jZSwgY29tbWFuZFF1ZXVlSXRlbS5hcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluc3RhbmNlW2NvbW1hbmRfXSA9IG1ldGhvZDtcbiAgICAgICAgICAgIGRlbGV0ZSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF9dO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoYXQuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZGVzdHJveSgpXCIpO1xuICAgICAgICB0aGF0Lm9mZigpO1xuICAgICAgICB0aGF0LmVtcHR5KCk7XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTGF6eUNvbW1hbmRFeGVjdXRvcjsiLCJpbXBvcnQge2lzUnRtcCwgaXNXZWJSVEMsIGlzRGFzaCwgaXNIbHN9IGZyb20gXCJ1dGlscy92YWxpZGF0b3JcIjtcbmltcG9ydCB7YW5hbFVzZXJBZ2VudH0gZnJvbSBcInV0aWxzL2Jyb3dzZXJcIjtcbi8qKlxuICogQGJyaWVmICAgVGhpcyBmaW5kcyB0aGUgcHJvdmlkZXIgdGhhdCBtYXRjaGVzIHRoZSBpbnB1dCBzb3VyY2UuXG4gKiBAcGFyYW1cbiAqICovXG5cbmNvbnN0IFN1cHBvcnRDaGVja2VyID0gZnVuY3Rpb24oKXtcbiAgICBjb25zdCB0aGF0ID0ge307XG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU3VwcG9ydENoZWNrZXIgbG9hZGVkLlwiKTtcbiAgICBsZXQgdXNlckFnZW50T2JqZWN0ID0gYW5hbFVzZXJBZ2VudCgpO1xuXG4gICAgY29uc3Qgc3VwcG9ydExpc3QgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdodG1sNScsXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBNaW1lVHlwZXMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGFhYzogJ2F1ZGlvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIG1wNDogJ3ZpZGVvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIGY0djogJ3ZpZGVvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIG00djogJ3ZpZGVvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIG1vdjogJ3ZpZGVvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIG1wMzogJ2F1ZGlvL21wZWcnLFxuICAgICAgICAgICAgICAgICAgICBtcGVnOiAnYXVkaW8vbXBlZycsXG4gICAgICAgICAgICAgICAgICAgIG9ndjogJ3ZpZGVvL29nZycsXG4gICAgICAgICAgICAgICAgICAgIG9nZzogJ3ZpZGVvL29nZycsXG4gICAgICAgICAgICAgICAgICAgIG9nYTogJ3ZpZGVvL29nZycsXG4gICAgICAgICAgICAgICAgICAgIHZvcmJpczogJ3ZpZGVvL29nZycsXG4gICAgICAgICAgICAgICAgICAgIHdlYm06ICd2aWRlby93ZWJtJyxcbiAgICAgICAgICAgICAgICAgICAgZjRhOiAndmlkZW8vYWFjJyxcbiAgICAgICAgICAgICAgICAgICAgbTN1ODogJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyxcbiAgICAgICAgICAgICAgICAgICAgbTN1OiAnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnLFxuICAgICAgICAgICAgICAgICAgICBobHM6ICdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCdcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgY29uc3QgdmlkZW8gPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKVxuICAgICAgICAgICAgICAgIH0oKTtcbiAgICAgICAgICAgICAgICBpZiAoIXZpZGVvLmNhblBsYXlUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc291cmNlLnR5cGU7XG5cbiAgICAgICAgICAgICAgICBpZighdHlwZSl7cmV0dXJuIGZhbHNlO31cbiAgICAgICAgICAgICAgICBjb25zdCBtaW1lVHlwZSA9IHNvdXJjZS5taW1lVHlwZSB8fCBNaW1lVHlwZXNbdHlwZV07XG5cbiAgICAgICAgICAgICAgICBpZihpc0hscyhmaWxlLCB0eXBlKSAmJiB1c2VyQWdlbnRPYmplY3QuYnJvd3NlciA9PT0gXCJNaWNyb3NvZnQgRWRnZVwiICl7XG4gICAgICAgICAgICAgICAgICAgIC8vRWRnZSBzdXBwb3J0cyBobHMgbmF0aXZlIGJ1dCB0aGF0J3Mgc3Vja3MuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNSdG1wKGZpbGUsIHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihpc1dlYlJUQyhmaWxlLCB0eXBlKSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIW1pbWVUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gISF2aWRlby5jYW5QbGF5VHlwZShtaW1lVHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICd3ZWJydGMnLFxuICAgICAgICAgICAgY2hlY2tTdXBwb3J0OiBmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmlkZW8gPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKVxuICAgICAgICAgICAgICAgIH0oKTtcbiAgICAgICAgICAgICAgICBpZiAoIXZpZGVvLmNhblBsYXlUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlzUnRtcChmaWxlLCB0eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IHNvdXJjZS5maWxlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcblxuICAgICAgICAgICAgICAgIGlmKGlzV2ViUlRDKGZpbGUsIHR5cGUpKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdkYXNoJyxcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcbiAgICAgICAgICAgICAgICBpZiAoaXNSdG1wKGZpbGUsIHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mICggd2luZG93Lk1lZGlhU291cmNlIHx8IHdpbmRvdy5XZWJLaXRNZWRpYVNvdXJjZSApID09PSBcImZ1bmN0aW9uXCIgJiYgaXNEYXNoKGZpbGUsIHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnaGxzJyxcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZpZGVvID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJylcbiAgICAgICAgICAgICAgICB9KCk7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IHNvdXJjZS5maWxlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcbiAgICAgICAgICAgICAgICBpZiAoaXNSdG1wKGZpbGUsIHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvL3RoaXMgbWV0aG9kIGZyb20gaGxzLmpzXG4gICAgICAgICAgICAgICAgY29uc3QgaXNIbHNTdXBwb3J0ID0gKCkgPT57XG4gICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBnZXRNZWRpYVNvdXJjZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuTWVkaWFTb3VyY2UgfHwgd2luZG93LldlYktpdE1lZGlhU291cmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciBtZWRpYVNvdXJjZSA9IGdldE1lZGlhU291cmNlKCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzb3VyY2VCdWZmZXIgPSB3aW5kb3cuU291cmNlQnVmZmVyIHx8IHdpbmRvdy5XZWJLaXRTb3VyY2VCdWZmZXI7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpc1R5cGVTdXBwb3J0ZWQgPSBtZWRpYVNvdXJjZSAmJiB0eXBlb2YgbWVkaWFTb3VyY2UuaXNUeXBlU3VwcG9ydGVkID09PSAnZnVuY3Rpb24nICYmIG1lZGlhU291cmNlLmlzVHlwZVN1cHBvcnRlZCgndmlkZW8vbXA0OyBjb2RlY3M9XCJhdmMxLjQyRTAxRSxtcDRhLjQwLjJcIicpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIFNvdXJjZUJ1ZmZlciBpcyBleHBvc2VkIGVuc3VyZSBpdHMgQVBJIGlzIHZhbGlkXG4gICAgICAgICAgICAgICAgICAgIC8vIHNhZmFyaSBhbmQgb2xkIHZlcnNpb24gb2YgQ2hyb21lIGRvZSBub3QgZXhwb3NlIFNvdXJjZUJ1ZmZlciBnbG9iYWxseSBzbyBjaGVja2luZyBTb3VyY2VCdWZmZXIucHJvdG90eXBlIGlzIGltcG9zc2libGVcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNvdXJjZUJ1ZmZlclZhbGlkQVBJID0gIXNvdXJjZUJ1ZmZlciB8fCBzb3VyY2VCdWZmZXIucHJvdG90eXBlICYmIHR5cGVvZiBzb3VyY2VCdWZmZXIucHJvdG90eXBlLmFwcGVuZEJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygc291cmNlQnVmZmVyLnByb3RvdHlwZS5yZW1vdmUgPT09ICdmdW5jdGlvbic7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhIWlzVHlwZVN1cHBvcnRlZCAmJiAhIXNvdXJjZUJ1ZmZlclZhbGlkQVBJO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLy9SZW1vdmUgdGhpcyAnISF2aWRlby5jYW5QbGF5VHlwZSgnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnKScgaWYgeW91IHdhbnQgdG8gdXNlIGhsc2pzLlxuICAgICAgICAgICAgICAgIC8vWWVzIEkgbmVlZCBobHNqcy4gMjAxOS0wNi0xMiAmJiAhIXZpZGVvLmNhblBsYXlUeXBlKCdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcpO1xuICAgICAgICAgICAgICAgIHJldHVybiBpc0hsc1N1cHBvcnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ3J0bXAnLFxuICAgICAgICAgICAgY2hlY2tTdXBwb3J0OiBmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IHNvdXJjZS5maWxlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiB0ZXN0Rmxhc2goKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1cHBvcnQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAvL0lFIG9ubHlcbiAgICAgICAgICAgICAgICAgICAgaWYoXCJBY3RpdmVYT2JqZWN0XCIgaW4gd2luZG93KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdXBwb3J0ID0gISEobmV3IEFjdGl2ZVhPYmplY3QoXCJTaG9ja3dhdmVGbGFzaC5TaG9ja3dhdmVGbGFzaFwiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9Y2F0Y2goZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VwcG9ydCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1czQywgYmV0dGVyIHN1cHBvcnQgaW4gbGVnYWN5IGJyb3dzZXJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc3VwcG9ydCA9ICEhbmF2aWdhdG9yLm1pbWVUeXBlc1snYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2gnXTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1cHBvcnQ7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gY2hlY2tTdXBwb3J0KCl7XG4gICAgICAgICAgICAgICAgICAgIGlmKHVzZXJBZ2VudE9iamVjdC5icm93c2VyID09PSBcIk1pY3Jvc29mdCBFZGdlXCIgfHwgdXNlckFnZW50T2JqZWN0Lm9zID09PSBcIkFuZHJvaWRcIiB8fCB1c2VyQWdlbnRPYmplY3Qub3MgPT09IFwiaU9TXCIgIHx8IHVzZXJBZ2VudE9iamVjdC5icm93c2VyID09PSBcIlNhZmFyaVwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaXNSdG1wKGZpbGUsIHR5cGUpICYmIHRlc3RGbGFzaCgpICYmIGNoZWNrU3VwcG9ydCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgXTtcblxuICAgIHRoYXQuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlID0gKHNvcnVjZV8pID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU3VwcG9ydENoZWNrZXIgOiBmaW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UoKVwiLCBzb3J1Y2VfKTtcbiAgICAgICAgY29uc3Qgc291cmNlID0gKHNvcnVjZV8gPT09IE9iamVjdChzb3J1Y2VfKSkgPyBzb3J1Y2VfIDoge307XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBzdXBwb3J0TGlzdC5sZW5ndGg7IGkgKyspe1xuICAgICAgICAgICAgaWYoc3VwcG9ydExpc3RbaV0uY2hlY2tTdXBwb3J0KHNvdXJjZSkpe1xuICAgICAgICAgICAgICAgIHJldHVybiBzdXBwb3J0TGlzdFtpXS5uYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LmZpbmRQcm92aWRlck5hbWVzQnlQbGF5bGlzdCA9IChwbGF5bGlzdEl0ZW0pID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU3VwcG9ydENoZWNrZXIgOiBmaW5kUHJvdmlkZXJOYW1lc0J5UGxheWxpc3QoKVwiLCBwbGF5bGlzdEl0ZW0pO1xuICAgICAgICBsZXQgc3VwcG9ydE5hbWVzID0gW107XG4gICAgICAgIC8qZm9yIChsZXQgaSA9IHBsYXlsaXN0Xy5sZW5ndGg7IGktLTspIHtcblxuXG4gICAgICAgIH0qL1xuICAgICAgICBjb25zdCBpdGVtID0gcGxheWxpc3RJdGVtO1xuXG4gICAgICAgIGlmKGl0ZW0gJiYgaXRlbS5zb3VyY2VzKXtcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBpdGVtLnNvdXJjZXMubGVuZ3RoOyBqICsrKXtcbiAgICAgICAgICAgICAgICBsZXQgc291cmNlID0gaXRlbS5zb3VyY2VzW2pdO1xuICAgICAgICAgICAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3VwcG9ydGVkID0gdGhhdC5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2Uoc291cmNlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1cHBvcnRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VwcG9ydE5hbWVzLnB1c2goc3VwcG9ydGVkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHN1cHBvcnROYW1lcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTdXBwb3J0Q2hlY2tlcjtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDQuLlxuICovXG5pbXBvcnQgU3J0UGFyc2VyIGZyb20gXCJhcGkvY2FwdGlvbi9wYXJzZXIvU3J0UGFyc2VyXCI7XG5pbXBvcnQgVlRUQ3VlIGZyb20gXCJ1dGlscy9jYXB0aW9ucy92dHRDdWVcIjtcbi8vaW1wb3J0IFJlcXVlc3QgZnJvbSBcInV0aWxzL2Rvd25sb2FkZXJcIjtcblxuY29uc3QgTG9hZGVyID0gZnVuY3Rpb24oKXtcbiAgICBjb25zdCB0aGF0ID0ge307XG5cbiAgICBjb25zdCBjb252ZXJ0VG9WVFRDdWVzID0gZnVuY3Rpb24gKGN1ZXMpIHtcbiAgICAgICAgcmV0dXJuIGN1ZXMubWFwKGN1ZSA9PiBuZXcgVlRUQ3VlKGN1ZS5zdGFydCwgY3VlLmVuZCwgY3VlLnRleHQpKTtcbiAgICB9XG4gICAgLy9sYW5ndWFnZSA6IGZvciBTTUkgZm9ybWF0LlxuICAgIHRoYXQubG9hZCA9ICh0cmFjaywgbGFuZ3VhZ2UsIHN1Y2Nlc3NDYWxsYmFjaywgZXJyb3JDYWxsYmFjaykgPT4ge1xuXG4gICAgICAgIHZhciByZXF1ZXN0T3B0aW9ucyAgPSB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICAgICAgICB1cmwgOiB0cmFjay5maWxlLFxuICAgICAgICAgICAgZW5jb2Rpbmc6IG51bGxcbiAgICAgICAgfTtcblxuICAgICAgICBsb2FkUmVxdWVzdERvd25sb2RlcigpLnRoZW4oUmVxdWVzdCA9PiB7XG4gICAgICAgICAgICBSZXF1ZXN0KHJlcXVlc3RPcHRpb25zLCBmdW5jdGlvbihlcnJvciwgcmVzcG9uc2UsIGJvZHkpIHtcbiAgICAgICAgICAgICAgICBpZihlcnJvcil7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yQ2FsbGJhY2soZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBsZXQgY3VlcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBsZXQgdnR0Q3VlcyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChib2R5LmluZGV4T2YoJ1dFQlZUVCcpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldFQlZUVCBMT0FERURcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkVnR0UGFyc2VyKCkudGhlbihXZWJWVFQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwYXJzZXIgPSBuZXcgV2ViVlRULlBhcnNlcih3aW5kb3csIFdlYlZUVC5TdHJpbmdEZWNvZGVyKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZ0dEN1ZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZXIub25jdWUgPSBmdW5jdGlvbihjdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdnR0Q3Vlcy5wdXNoKGN1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZXIub25mbHVzaCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2RlbGV0ZSB0cmFjay54aHI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NDYWxsYmFjayh2dHRDdWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBhcnNlIGNhbGxzIG9uZmx1c2ggaW50ZXJuYWxseVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlci5wYXJzZShib2R5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2RlbGV0ZSB0cmFjay54aHI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JDYWxsYmFjayhlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoYm9keS5pbmRleE9mKCdTQU1JJykgPj0gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJTQU1JIExPQURFRFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRTbWlQYXJzZXIoKS50aGVuKFNtaVBhcnNlciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBhcnNlZERhdGEgPSBTbWlQYXJzZXIoYm9keSwge2ZpeGVkTGFuZyA6IGxhbmd1YWdlfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdnR0Q3VlcyA9IGNvbnZlcnRUb1ZUVEN1ZXMocGFyc2VkRGF0YS5yZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NDYWxsYmFjayh2dHRDdWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2RlbGV0ZSB0cmFjay54aHI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JDYWxsYmFjayhlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU1JUIExPQURFRFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ZXMgPSBTcnRQYXJzZXIoYm9keSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2dHRDdWVzID0gY29udmVydFRvVlRUQ3VlcyhjdWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NDYWxsYmFjayh2dHRDdWVzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIC8vZGVsZXRlIHRyYWNrLnhocjtcbiAgICAgICAgICAgIGVycm9yQ2FsbGJhY2soZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuZnVuY3Rpb24gbG9hZFJlcXVlc3REb3dubG9kZXIoKXtcbiAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWyd1dGlscy9kb3dubG9hZGVyJ10sIGZ1bmN0aW9uIChyZXF1aXJlKSB7XG4gICAgICAgIHJldHVybiByZXF1aXJlKCd1dGlscy9kb3dubG9hZGVyJykuZGVmYXVsdDtcbiAgICB9LCBmdW5jdGlvbihlcnIpe2NvbnNvbGUubG9nKGVycik7fSwgJ2Rvd25sb2FkZXInKTtcbn07XG5mdW5jdGlvbiBsb2FkVnR0UGFyc2VyKCkge1xuICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9jYXB0aW9uL3BhcnNlci9WdHRQYXJzZXInXSwgZnVuY3Rpb24gKHJlcXVpcmUpIHtcbiAgICAgICAgcmV0dXJuIHJlcXVpcmUoJ2FwaS9jYXB0aW9uL3BhcnNlci9WdHRQYXJzZXInKS5kZWZhdWx0O1xuICAgIH0sIGZ1bmN0aW9uKGVycil7Y29uc29sZS5sb2coZXJyKTt9LCAndnR0cGFyc2VyJyk7XG59XG5mdW5jdGlvbiBsb2FkU21pUGFyc2VyKCkge1xuICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9jYXB0aW9uL3BhcnNlci9TbWlQYXJzZXInXSwgZnVuY3Rpb24gKHJlcXVpcmUpIHtcbiAgICAgICAgcmV0dXJuIHJlcXVpcmUoJ2FwaS9jYXB0aW9uL3BhcnNlci9TbWlQYXJzZXInKS5kZWZhdWx0O1xuICAgIH0sIGZ1bmN0aW9uKGVycil7Y29uc29sZS5sb2coZXJyKTt9LCAnc21pcGFyc2VyJyk7XG59XG5leHBvcnQgZGVmYXVsdCBMb2FkZXI7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA1LiAxNy4uXG4gKi9cbmltcG9ydCBDYXB0aW9uTG9hZGVyIGZyb20gJ2FwaS9jYXB0aW9uL0xvYWRlcic7XG5pbXBvcnQge1JFQURZLCBFUlJPUlMsIEVSUk9SLCBQTEFZRVJfQ0FQVElPTl9FUlJPUiwgQ09OVEVOVF9NRVRBLCBDT05URU5UX1RJTUUsIENPTlRFTlRfQ0FQVElPTl9DVUVfQ0hBTkdFRCwgQ09OVEVOVF9DQVBUSU9OX0NIQU5HRUR9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xuXG5jb25zdCBpc1N1cHBvcnQgPSBmdW5jdGlvbihraW5kKXtcbiAgICByZXR1cm4ga2luZCA9PT0gJ3N1YnRpdGxlcycgfHwga2luZCA9PT0gJ2NhcHRpb25zJztcbn07XG5cbmNvbnN0IE1hbmFnZXIgPSBmdW5jdGlvbihhcGksIHBsYXlsaXN0SW5kZXgpe1xuXG4gICAgY29uc3QgdGhhdCA9IHt9O1xuICAgIGxldCBjYXB0aW9uTGlzdCA9IFtdO1xuICAgIGxldCBjdXJyZW50Q2FwdGlvbkluZGV4ID0gLTE7XG5cbiAgICBsZXQgY2FwdGlvbkxvYWRlciA9IENhcHRpb25Mb2FkZXIoKTtcbiAgICBsZXQgaXNGaXNydExvYWQgPSB0cnVlO1xuICAgIGxldCBpc1Nob3dpbmcgPSBmYWxzZTtcblxuXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ2FwdGlvbiBNYW5hZ2VyID4+IFwiLCBwbGF5bGlzdEluZGV4KTtcblxuXG4gICAgbGV0IGJpbmRUcmFjayA9IGZ1bmN0aW9uKHRyYWNrLCB2dHRDdWVzKXtcbiAgICAgICAgdHJhY2suZGF0YSA9IHZ0dEN1ZXMgfHwgW107XG4gICAgICAgIHRyYWNrLm5hbWUgPSB0cmFjay5sYWJlbCB8fCB0cmFjay5uYW1lIHx8IHRyYWNrLmxhbmd1YWdlO1xuICAgICAgICB0cmFjay5pZCA9IChmdW5jdGlvbih0cmFjaywgdHJhY2tzQ291bnQpIHtcbiAgICAgICAgICAgIHZhciB0cmFja0lkO1xuICAgICAgICAgICAgdmFyIHByZWZpeCA9IHRyYWNrLmtpbmQgfHwgJ2NjJztcbiAgICAgICAgICAgIGlmICh0cmFjay5kZWZhdWx0IHx8IHRyYWNrLmRlZmF1bHR0cmFjaykge1xuICAgICAgICAgICAgICAgIHRyYWNrSWQgPSAnZGVmYXVsdCc7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdHJhY2tJZCA9IHRyYWNrLmlkIHx8IChwcmVmaXggKyB0cmFja3NDb3VudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihpc0Zpc3J0TG9hZCl7XG4gICAgICAgICAgICAgICAgLy9UaGlzIGV4ZWN1dGUgb25seSBvbi4gYW5kIHRoZW4gdXNlIGZsdXNoQ2FwdGlvbkxpc3QobGFzdENhcHRpb25JbmRleCk7XG4gICAgICAgICAgICAgICAgY2hhbmdlQ3VycmVudENhcHRpb24oY2FwdGlvbkxpc3QubGVuZ3RofHwwKTtcbiAgICAgICAgICAgICAgICBpc0Zpc3J0TG9hZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJhY2tJZDtcbiAgICAgICAgfSkodHJhY2ssIGNhcHRpb25MaXN0Lmxlbmd0aCk7XG5cbiAgICAgICAgY2FwdGlvbkxpc3QucHVzaCh0cmFjayk7XG4gICAgICAgIHJldHVybiB0cmFjay5pZDtcbiAgICB9O1xuICAgIGxldCBjaGFuZ2VDdXJyZW50Q2FwdGlvbiA9IGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgY3VycmVudENhcHRpb25JbmRleCA9IGluZGV4O1xuICAgICAgICBhcGkudHJpZ2dlcihDT05URU5UX0NBUFRJT05fQ0hBTkdFRCwgY3VycmVudENhcHRpb25JbmRleCk7XG4gICAgfTtcbiAgICBpZihhcGkuZ2V0Q29uZmlnKCkucGxheWxpc3QgJiYgYXBpLmdldENvbmZpZygpLnBsYXlsaXN0Lmxlbmd0aCA+IDApe1xuICAgICAgICBsZXQgcGxheWxpc3QgPSBhcGkuZ2V0Q29uZmlnKCkucGxheWxpc3RbcGxheWxpc3RJbmRleF07XG5cbiAgICAgICAgaWYocGxheWxpc3QgJiYgcGxheWxpc3QudHJhY2tzICYmIHBsYXlsaXN0LnRyYWNrcy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBwbGF5bGlzdC50cmFja3MubGVuZ3RoOyBpICsrKXtcbiAgICAgICAgICAgICAgICBjb25zdCB0cmFjayA9IHBsYXlsaXN0LnRyYWNrc1tpXTtcblxuICAgICAgICAgICAgICAgIGlmKGlzU3VwcG9ydCh0cmFjay5raW5kKSAmJiAhIF8uZmluZFdoZXJlKHRyYWNrLCB7ZmlsZSA6IHRyYWNrLmZpbGV9KSl7XG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC5mbHVzaENhcHRpb25MaXN0KGN1cnJlbnRDYXB0aW9uSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uTG9hZGVyLmxvYWQodHJhY2ssIHRyYWNrLmxhbmcsIGZ1bmN0aW9uKHZ0dEN1ZXMpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodnR0Q3VlcyAmJiB2dHRDdWVzLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjYXB0aW9uSWQgPSBiaW5kVHJhY2sodHJhY2ssIHZ0dEN1ZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnJvcil7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTW1BMQVlFUl9DQVBUSU9OX0VSUk9SXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXBpLnRyaWdnZXIoRVJST1IsIHRlbXBFcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBpLm9uKENPTlRFTlRfVElNRSwgZnVuY3Rpb24obWV0YSl7XG4gICAgICAgIGxldCBwb3NpdGlvbiA9IG1ldGEucG9zaXRpb247XG4gICAgICAgIGlmKGN1cnJlbnRDYXB0aW9uSW5kZXggPiAtMSAmJiBjYXB0aW9uTGlzdFtjdXJyZW50Q2FwdGlvbkluZGV4XSl7XG4gICAgICAgICAgICBsZXQgY3VycmVudEN1ZXMgPSBfLmZpbHRlcihjYXB0aW9uTGlzdFtjdXJyZW50Q2FwdGlvbkluZGV4XS5kYXRhLCBmdW5jdGlvbiAoY3VlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvc2l0aW9uID49IChjdWUuc3RhcnRUaW1lKSAmJiAoICghY3VlLmVuZFRpbWUgfHwgcG9zaXRpb24pIDw9IGN1ZS5lbmRUaW1lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYoY3VycmVudEN1ZXMgJiYgY3VycmVudEN1ZXMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgYXBpLnRyaWdnZXIoQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VELCBjdXJyZW50Q3Vlc1swXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH0pO1xuICAgIHRoYXQuZmx1c2hDYXB0aW9uTGlzdCA9IChsYXN0Q2FwdGlvbkluZGV4KSA9PntcbiAgICAgICAgY2FwdGlvbkxpc3QgPSBbXTtcbiAgICAgICAgY2hhbmdlQ3VycmVudENhcHRpb24obGFzdENhcHRpb25JbmRleCk7XG4gICAgICAgIC8vY3VycmVudENhcHRpb25JbmRleCA9IGxhc3RDYXB0aW9uSW5kZXg7XG4gICAgfTtcbiAgICB0aGF0LmdldENhcHRpb25MaXN0ID0gKCkgPT57XG4gICAgICAgIHJldHVybiBjYXB0aW9uTGlzdHx8W107XG4gICAgfTtcbiAgICB0aGF0LmdldEN1cnJlbnRDYXB0aW9uID0gKCkgPT57XG4gICAgICAgIHJldHVybiBjdXJyZW50Q2FwdGlvbkluZGV4O1xuICAgIH07XG4gICAgdGhhdC5zZXRDdXJyZW50Q2FwdGlvbiA9IChfaW5kZXgpID0+e1xuICAgICAgICBpZihfaW5kZXggPiAtMiAmJiBfaW5kZXggPCBjYXB0aW9uTGlzdC5sZW5ndGgpe1xuICAgICAgICAgICAgY2hhbmdlQ3VycmVudENhcHRpb24oX2luZGV4KTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhhdC5hZGRDYXB0aW9uID0gKHRyYWNrKSA9PntcbiAgICAgICAgaWYoaXNTdXBwb3J0KHRyYWNrLmtpbmQpICYmICEgXy5maW5kV2hlcmUoY2FwdGlvbkxvYWRlciwge2ZpbGUgOiB0cmFjay5maWxlfSkpe1xuICAgICAgICAgICAgY2FwdGlvbkxvYWRlci5sb2FkKHRyYWNrLCBmdW5jdGlvbih2dHRDdWVzKXtcbiAgICAgICAgICAgICAgICBpZih2dHRDdWVzICYmIHZ0dEN1ZXMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIGJpbmRUcmFjayh0cmFjaywgdnR0Q3Vlcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3Ipe1xuICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlNbUExBWUVSX0NBUFRJT05fRVJST1JdO1xuICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgICAgIGFwaS50cmlnZ2VyKEVSUk9SLCB0ZW1wRXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQucmVtb3ZlQ2FwdGlvbiA9IChpbmRleCkgPT4ge1xuICAgICAgICBpZihpbmRleCA+IC0xICYmIGluZGV4IDwgY2FwdGlvbkxpc3QubGVuZ3RoKXtcbiAgICAgICAgICAgIGNhcHRpb25MaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICByZXR1cm4gY2FwdGlvbkxpc3Q7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+IHtcbiAgICAgICAgY2FwdGlvbkxpc3QgPSBbXTtcbiAgICAgICAgY2FwdGlvbkxvYWRlciA9IG51bGw7XG4gICAgICAgIGFwaS5vZmYoQ09OVEVOVF9USU1FLCBudWxsLCB0aGF0KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cblxuXG5leHBvcnQgZGVmYXVsdCBNYW5hZ2VyO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNS4gMjkuLlxuICovXG5pbXBvcnQgeyBobXNUb1NlY29uZCwgdHJpbSB9IGZyb20gXCJ1dGlscy9zdHJpbmdzXCJcblxuZnVuY3Rpb24gX2VudHJ5KGRhdGEpIHtcbiAgICB2YXIgZW50cnkgPSB7fTtcbiAgICB2YXIgYXJyYXkgPSBkYXRhLnNwbGl0KCdcXHJcXG4nKTtcbiAgICBpZiAoYXJyYXkubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGFycmF5ID0gZGF0YS5zcGxpdCgnXFxuJyk7XG4gICAgfVxuICAgIHZhciBpZHggPSAxO1xuICAgIGlmIChhcnJheVswXS5pbmRleE9mKCcgLS0+ICcpID4gMCkge1xuICAgICAgICBpZHggPSAwO1xuICAgIH1cbiAgICBpZiAoYXJyYXkubGVuZ3RoID4gaWR4ICsgMSAmJiBhcnJheVtpZHggKyAxXSkge1xuICAgICAgICAvLyBUaGlzIGxpbmUgY29udGFpbnMgdGhlIHN0YXJ0IGFuZCBlbmQuXG4gICAgICAgIHZhciBsaW5lID0gYXJyYXlbaWR4XTtcbiAgICAgICAgdmFyIGluZGV4ID0gbGluZS5pbmRleE9mKCcgLS0+ICcpO1xuICAgICAgICBpZiAoaW5kZXggPiAwKSB7XG4gICAgICAgICAgICBlbnRyeS5zdGFydCA9IGhtc1RvU2Vjb25kKGxpbmUuc3Vic3RyKDAsIGluZGV4KSk7XG4gICAgICAgICAgICBlbnRyeS5lbmQgPSBobXNUb1NlY29uZChsaW5lLnN1YnN0cihpbmRleCArIDUpKTtcbiAgICAgICAgICAgIGVudHJ5LnRleHQgPSBhcnJheS5zbGljZShpZHggKyAxKS5qb2luKCdcXHJcXG4nKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZW50cnk7XG5cbn1cblxuY29uc3QgU3J0UGFyc2VyID0gZnVuY3Rpb24oZGF0YSkge1xuICAgIHZhciBjYXB0aW9ucyA9IFtdO1xuXG4gICAgZGF0YSA9IHRyaW0oZGF0YSk7XG5cbiAgICB2YXIgbGlzdCA9IGRhdGEuc3BsaXQoJ1xcclxcblxcclxcbicpO1xuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBsaXN0ID0gZGF0YS5zcGxpdCgnXFxuXFxuJyk7XG4gICAgfVxuXG5cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAobGlzdFtpXSA9PT0gJ1dFQlZUVCcpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlbnRyeSA9IF9lbnRyeShsaXN0W2ldKTtcbiAgICAgICAgaWYgKGVudHJ5LnRleHQpIHtcbiAgICAgICAgICAgIGNhcHRpb25zLnB1c2goZW50cnkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNhcHRpb25zO1xufVxuXG5cblxuZXhwb3J0IGRlZmF1bHQgU3J0UGFyc2VyOyIsIi8vIFNUQVRFXG5leHBvcnQgY29uc3QgU1RBVEVfQlVGRkVSSU5HID0gXCJidWZmZXJpbmdcIjtcbmV4cG9ydCBjb25zdCBTVEFURV9JRExFID0gXCJpZGxlXCI7XG5leHBvcnQgY29uc3QgU1RBVEVfQ09NUExFVEUgPSBcImNvbXBsZXRlXCI7XG5leHBvcnQgY29uc3QgU1RBVEVfUEFVU0VEID0gXCJwYXVzZWRcIjtcbmV4cG9ydCBjb25zdCBTVEFURV9QTEFZSU5HID0gXCJwbGF5aW5nXCI7XG5leHBvcnQgY29uc3QgU1RBVEVfRVJST1IgPSBcImVycm9yXCI7XG5leHBvcnQgY29uc3QgU1RBVEVfTE9BRElORyA9IFwibG9hZGluZ1wiO1xuZXhwb3J0IGNvbnN0IFNUQVRFX1NUQUxMRUQgPSBcInN0YWxsZWRcIjtcblxuZXhwb3J0IGNvbnN0IFNUQVRFX0FEX0xPQURJTkcgPSBcImFkTG9hZGluZ1wiO1xuZXhwb3J0IGNvbnN0IFNUQVRFX0FEX0xPQURFRCA9IFwiYWRMb2FkZWRcIjtcbmV4cG9ydCBjb25zdCBTVEFURV9BRF9QTEFZSU5HID0gXCJhZFBsYXlpbmdcIjtcbmV4cG9ydCBjb25zdCBTVEFURV9BRF9QQVVTRUQgPSBcImFkUGF1c2VkXCI7XG5leHBvcnQgY29uc3QgU1RBVEVfQURfQ09NUExFVEUgPSBcImFkQ29tcGxldGVcIjtcbmV4cG9ydCBjb25zdCBTVEFURV9BRF9FUlJPUiA9IFwiYWRFcnJvclwiO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9BRF9DTElDSyA9IFwiYWRjbGlja1wiO1xuXG4vLyBQUk9WSURFUlxuZXhwb3J0IGNvbnN0IFBST1ZJREVSX0hUTUw1ID0gXCJodG1sNVwiO1xuZXhwb3J0IGNvbnN0IFBST1ZJREVSX1dFQlJUQyA9IFwid2VicnRjXCI7XG5leHBvcnQgY29uc3QgUFJPVklERVJfREFTSCA9IFwiZGFzaFwiO1xuZXhwb3J0IGNvbnN0IFBST1ZJREVSX0hMUyA9IFwiaGxzXCI7XG5leHBvcnQgY29uc3QgUFJPVklERVJfUlRNUCA9IFwicnRtcFwiO1xuXG4vLyBFVkVOVFNcbmV4cG9ydCBjb25zdCBDT05URU5UX0NPTVBMRVRFID0gU1RBVEVfQ09NUExFVEU7XG5leHBvcnQgY29uc3QgUkVBRFkgPSBcInJlYWR5XCI7XG5leHBvcnQgY29uc3QgREVTVFJPWSA9IFwiZGVzdHJveVwiO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfU0VFSyA9IFwic2Vla1wiO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfQlVGRkVSX0ZVTEwgPSBcImJ1ZmZlckZ1bGxcIjtcbmV4cG9ydCBjb25zdCBESVNQTEFZX0NMSUNLID0gXCJkaXNwbGF5Q2xpY2tcIjtcbmV4cG9ydCBjb25zdCBDT05URU5UX0xPQURFRCA9IFwibG9hZGVkXCI7XG5leHBvcnQgY29uc3QgUExBWUxJU1RfQ0hBTkdFRCA9IFwicGxheWxpc3RDaGFuZ2VkXCI7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9TRUVLRUQgPSBcInNlZWtlZFwiO1xuZXhwb3J0IGNvbnN0IEFMTF9QTEFZTElTVF9FTkRFRCA9IFwiYWxsUGxheWxpc3RFbmRlZFwiO1xuZXhwb3J0IGNvbnN0IE5FVFdPUktfVU5TVEFCTEVEID0gXCJ1bnN0YWJsZU5ldHdvcmtcIjtcblxuXG5cbmV4cG9ydCBjb25zdCBFUlJPUiA9IFwiZXJyb3JcIjtcblxuLy8gU1RBVEUgT0YgUExBWUVSXG5leHBvcnQgY29uc3QgUExBWUVSX1NUQVRFID0gXCJzdGF0ZUNoYW5nZWRcIjtcbmV4cG9ydCBjb25zdCBQTEFZRVJfQ09NUExFVEUgPSBTVEFURV9DT01QTEVURTtcbmV4cG9ydCBjb25zdCBQTEFZRVJfUEFVU0UgPSBcInBhdXNlXCI7XG5leHBvcnQgY29uc3QgUExBWUVSX1BMQVkgPSBcInBsYXlcIjtcblxuZXhwb3J0IGNvbnN0IFBMQVlFUl9DTElDS0VEID0gXCJjbGlja2VkXCI7XG5leHBvcnQgY29uc3QgUExBWUVSX1JFU0laRUQgPSBcInJlc2l6ZWRcIjtcbmV4cG9ydCBjb25zdCBQTEFZRVJfTE9BRElORyA9IFwibG9hZGluZ1wiO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9GVUxMU0NSRUVOX1JFUVVFU1QgPSBcImZ1bGxzY3JlZW5SZXF1ZXN0ZWRcIjtcbmV4cG9ydCBjb25zdCBQTEFZRVJfRlVMTFNDUkVFTl9DSEFOR0VEID0gXCJmdWxsc2NyZWVuQ2hhbmdlZFwiO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XQVJOSU5HID0gXCJ3YXJuaW5nXCI7XG5cbmV4cG9ydCBjb25zdCBBRF9DSEFOR0VEID0gXCJhZENoYW5nZWRcIjtcbmV4cG9ydCBjb25zdCBBRF9USU1FID0gXCJhZFRpbWVcIjtcbmV4cG9ydCBjb25zdCBDT05URU5UX0JVRkZFUiA9IFwiYnVmZmVyQ2hhbmdlZFwiO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfVElNRSA9IFwidGltZVwiO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfUkFURV9DSEFOR0UgPSBcInJhdGVjaGFuZ2VcIjtcbmV4cG9ydCBjb25zdCBDT05URU5UX1ZPTFVNRSA9IFwidm9sdW1lQ2hhbmdlZFwiO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfTVVURSA9IFwibXV0ZVwiO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfTUVUQSA9IFwibWV0YUNoYW5nZWRcIjtcbmV4cG9ydCBjb25zdCBDT05URU5UX1NPVVJDRV9DSEFOR0VEID0gXCJzb3VyY2VDaGFuZ2VkXCI7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9MRVZFTF9DSEFOR0VEID0gXCJxdWFsaXR5TGV2ZWxDaGFuZ2VkXCI7XG5leHBvcnQgY29uc3QgUExBWUJBQ0tfUkFURV9DSEFOR0VEID0gXCJwbGF5YmFja1JhdGVDaGFuZ2VkXCI7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VEID0gXCJjdWVDaGFuZ2VkXCI7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9DQVBUSU9OX0NIQU5HRUQgPSBcImNhcHRpb25DaGFuZ2VkXCI7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9USU1FX01PREVfQ0hBTkdFRCA9IFwidGltZURpc3BsYXlNb2RlQ2hhbmdlZFwiO1xuZXhwb3J0IGNvbnN0IE9NRV9QMlBfTU9ERSA9IFwicDJwTW9kZVwiO1xuXG5cbmV4cG9ydCBjb25zdCBBRF9DTElFTlRfR09PR0xFSU1BID0gXCJnb29nbGVpbWFcIjtcbmV4cG9ydCBjb25zdCBBRF9DTElFTlRfVkFTVCA9IFwidmFzdFwiO1xuXG5cbmV4cG9ydCBjb25zdCBJTklUX1VOS05XT05fRVJST1IgPSAxMDA7XG5leHBvcnQgY29uc3QgSU5JVF9VTlNVUFBPUlRfRVJST1IgPSAxMDE7XG5leHBvcnQgY29uc3QgSU5JVF9SVE1QX1NFVFVQX0VSUk9SID0gMTAyO1xuZXhwb3J0IGNvbnN0IElOSVRfREFTSF9VTlNVUFBPUlQgPSAxMDM7XG5leHBvcnQgY29uc3QgSU5JVF9BRFNfRVJST1IgPSAxMDQ7XG5leHBvcnQgY29uc3QgSU5JVF9EQVNIX05PVEZPVU5EID0gMTA1O1xuZXhwb3J0IGNvbnN0IElOSVRfSExTSlNfTk9URk9VTkQgPSAxMDY7XG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fRVJST1IgPSAzMDA7XG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SID0gMzAxO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IgPSAzMDI7XG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SID0gMzAzO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9GSUxFX0VSUk9SID0gMzA0O1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9DQVBUSU9OX0VSUk9SID0gMzA1O1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfV1NfRVJST1IgPSA1MDE7XG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SID0gNTAyO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SID0gNTAzO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUiA9IDUwNDtcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SID0gNTA1O1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfTkVUV09SS19TTE9XID0gNTEwO1xuXG5leHBvcnQgY29uc3QgV0FSTl9NU0dfTVVURURQTEFZID0gXCJQbGVhc2UgdG91Y2ggaGVyZSB0byB0dXJuIG9uIHRoZSBzb3VuZC5cIjtcblxuZXhwb3J0IGNvbnN0IEVSUk9SUyA9IHtcbiAgICAxMDAgOiB7Y29kZSA6IDEwMCAsIG1lc3NhZ2UgOiBcIkNhbiBub3QgbG9hZCBkdWUgdG8gdW5rbm93biByZWFzb25zLlwiLCByZWFzb24gOlwiQ2FuIG5vdCBsb2FkIGR1ZSB0byB1bmtub3duIHJlYXNvbnMuXCJ9LFxuICAgIDEwMSA6IHtjb2RlIDogMTAxICwgbWVzc2FnZSA6IFwiQ2FuIG5vdCBsb2FkIGR1ZSB0byB1bnN1cHBvcnRlZCBtZWRpYS5cIiwgcmVhc29uIDpcIkNhbiBub3QgbG9hZCBkdWUgdG8gdW5zdXBwb3J0ZWQgbWVkaWEuXCJ9LFxuICAgIDEwMiA6IHtjb2RlIDogMTAyICwgbWVzc2FnZSA6IFwiRmxhc2ggZmV0Y2hpbmcgcHJvY2VzcyBhYm9ydGVkLiA8L2JyPjxhIGhyZWY9J2h0dHA6Ly93d3cuYWRvYmUuY29tL2dvL2dldGZsYXNocGxheWVyJyB0YXJnZXQ9J19zZWxmJz48aW1nIHNyYz0naHR0cDovL3d3dy5hZG9iZS5jb20vaW1hZ2VzL3NoYXJlZC9kb3dubG9hZF9idXR0b25zL2dldF9mbGFzaF9wbGF5ZXIuZ2lmJyBhbHQ9J0dldCBBZG9iZSBGbGFzaCBwbGF5ZXInPjwvYT5cIiwgcmVhc29uIDpcIkl0IGxvb2tzIGxpa2Ugbm90IGZvdW5kIHN3ZiBvciB5b3VyIGVudmlyb25tZW50IGlzIGxvY2FsaG9zdC5cIn0sXG4gICAgMTAzIDoge2NvZGUgOiAxMDMgLCBtZXNzYWdlIDogXCJDYW4gbm90IGxvYWQgZHVlIHRvIGRhc2hqcy4gUGxlYXNlIGNoZWNrIHRoZSBsYXN0ZXN0IHZlcnNpb24uXCIsIHJlYXNvbiA6XCJkYXNoLmpzIHZlcnNpb24gaXMgb2xkLiBQbGVhc2UgY2hlY2sgdGhlIGxhc3Rlc3QuXCJ9LFxuICAgIDEwNCA6IHtjb2RlIDogMTA0ICwgbWVzc2FnZSA6IFwiQ2FuIG5vdCBsb2FkIGR1ZSB0byBnb29nbGUgaW1hIGZvciBBZHMuIFwiLCByZWFzb24gOlwiUGxlYXNlIGNoZWNrIHRoZSBnb29nbGUgaW1hIGxpYnJhcnkuXCJ9LFxuICAgIDEwNSA6IHtjb2RlIDogMTA1ICwgbWVzc2FnZSA6IFwiQ2FuIG5vdCBmaW5kIHRoZSBkYXNoanMuIFBsZWFzZSBjaGVjayB0aGUgZGFzaGpzLlwiLCByZWFzb24gOlwiTm90IGZvdW5kIGRhc2hqcy5cIn0sXG4gICAgMTA2IDoge2NvZGUgOiAxMDYgLCBtZXNzYWdlIDogXCJDYW4gbm90IGZpbmQgdGhlIGhsc2pzLiBQbGVhc2UgY2hlY2sgdGhlIGhsc2pzLlwiLCByZWFzb24gOlwiTm90IGZvdW5kIGhsc2pzLlwifSxcbiAgICAzMDAgOiB7Y29kZSA6IDMwMCAsIG1lc3NhZ2UgOiBcIkNhbiBub3QgcGxheSBkdWUgdG8gdW5rbm93biByZWFzb25zLlwiLCByZWFzb24gOlwiQ2FuIG5vdCBwbGF5IGR1ZSB0byB1bmtub3duIHJlYXNvbnMuXCJ9LFxuICAgIDMwMSA6IHtjb2RlIDogMzAxICwgbWVzc2FnZSA6IFwiRmV0Y2hpbmcgcHJvY2VzcyBhYm9ydGVkIGJ5IHVzZXIuXCIsIHJlYXNvbiA6XCJGZXRjaGluZyBwcm9jZXNzIGFib3J0ZWQgYnkgdXNlci5cIn0sXG4gICAgMzAyIDoge2NvZGUgOiAzMDIgLCBtZXNzYWdlIDogXCJTb21lIG9mIHRoZSBtZWRpYSBjb3VsZCBub3QgYmUgZG93bmxvYWRlZCBkdWUgdG8gYSBuZXR3b3JrIGVycm9yLlwiLCByZWFzb24gOlwiRXJyb3Igb2NjdXJyZWQgd2hlbiBkb3dubG9hZGluZy5cIn0sXG4gICAgMzAzIDoge2NvZGUgOiAzMDMgLCBtZXNzYWdlIDogXCJVbmFibGUgdG8gbG9hZCBtZWRpYS4gVGhpcyBtYXkgYmUgZHVlIHRvIGEgc2VydmVyIG9yIG5ldHdvcmsgZXJyb3IsIG9yIGR1ZSB0byBhbiB1bnN1cHBvcnRlZCBmb3JtYXQuXCIsIHJlYXNvbiA6XCJFcnJvciBvY2N1cnJlZCB3aGVuIGRlY29kaW5nLlwifSxcbiAgICAzMDQgOiB7Y29kZSA6IDMwNCAsIG1lc3NhZ2UgOiBcIk1lZGlhIHBsYXliYWNrIGhhcyBiZWVuIGNhbmNlbGVkLiBJdCBsb29rcyBsaWtlIHlvdXIgbWVkaWEgaXMgY29ycnVwdGVkIG9yIHlvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSBmZWF0dXJlcyB5b3VyIG1lZGlhIHVzZXMuXCIsIHJlYXNvbiA6XCJNZWRpYSBwbGF5YmFjayBub3Qgc3VwcG9ydGVkLlwifSxcbiAgICAzMDUgOiB7Y29kZSA6IDMwNSAsIG1lc3NhZ2UgOiBcIkNhbiBub3QgbG9hZCBjYXB0aW9ucyBkdWUgdG8gdW5rbm93biByZWFzb25zLlwiLCByZWFzb24gOlwiQ2FuIG5vdCBsb2FkIGNhcHRpb25zIGR1ZSB0byB1bmtub3duIHJlYXNvbnMuXCJ9LFxuICAgIDUwMSA6IHtjb2RlIDogNTAxICwgbWVzc2FnZSA6IFwiQ29ubmVjdGlvbiB3aXRoIGxvdy1sYXRlbmN5KE9NRSkgc2VydmVyIGZhaWxlZC5cIiwgcmVhc29uIDpcIldlYlNvY2tldCBjb25uZWN0aW9uIGZhaWxlZC5cIn0sXG4gICAgNTAyIDoge2NvZGUgOiA1MDIgLCBtZXNzYWdlIDogXCJDb25uZWN0aW9uIHdpdGggbG93LWxhdGVuY3koT01FKSBzZXJ2ZXIgZmFpbGVkLlwiLCByZWFzb24gOlwiV2ViUlRDIGFkZEljZUNhbmRpZGF0ZSBmYWlsZWQuXCJ9LFxuICAgIDUwMyA6IHtjb2RlIDogNTAzICwgbWVzc2FnZSA6IFwiQ29ubmVjdGlvbiB3aXRoIGxvdy1sYXRlbmN5KE9NRSkgc2VydmVyIGZhaWxlZC5cIiwgcmVhc29uIDpcIldlYlJUQyBzZXRSZW1vdGVEZXNjcmlwdGlvbiBmYWlsZWQuXCJ9LFxuICAgIDUwNCA6IHtjb2RlIDogNTA0ICwgbWVzc2FnZSA6IFwiQ29ubmVjdGlvbiB3aXRoIGxvdy1sYXRlbmN5KE9NRSkgc2VydmVyIGZhaWxlZC5cIiwgcmVhc29uIDpcIldlYlJUQyBwZWVyIGNyZWF0ZU9mZmVyIGZhaWxlZC5cIn0sXG4gICAgNTA1IDoge2NvZGUgOiA1MDUgLCBtZXNzYWdlIDogXCJDb25uZWN0aW9uIHdpdGggbG93LWxhdGVuY3koT01FKSBzZXJ2ZXIgZmFpbGVkLlwiLCByZWFzb24gOlwiV2ViUlRDIHNldExvY2FsRGVzY3JpcHRpb24gZmFpbGVkLlwifSxcbiAgICA1MTAgOiB7Y29kZSA6IDUxMCAsIG1lc3NhZ2UgOiBcIk5ldHdvcmsgY29ubmVjdGlvbiBpcyB1bnN0YWJsZS4gQ2hlY2sgdGhlIG5ldHdvcmsgY29ubmVjdGlvbi5cIiwgcmVhc29uIDpcIk5ldHdvcmsgaXMgc2xvdy5cIn1cbn07XG5cbmV4cG9ydCBjb25zdCBVSV9JQ09OUyA9IHtcbiAgICB2b2x1bWVfbXV0ZSA6IFwidm9sdW1lLW11dGVcIixcbiAgICBvcF93YXJuaW5nIDogXCJvcC13YXJuaW5nXCJcbn07XG4iLCIvKipcbiAqIEBicmllZiAgIOuvuOuUlOyWtCDsl5jrpqzrqLztirjrpbwg6rSA66as7ZWY64qUIOqwneyytC4g7ZiE7J6s64qUIO2VmOuKlCDsnbzsnbQg66eO7KeAIOyViuuLpC5cbiAqIEBwYXJhbSAgIHtlbGVtZW50fSAgIGNvbnRhaW5lciAgIGRvbSBlbGVtZW50XG4gKlxuICogKi9cbmltcG9ydCB7Z2V0QnJvd3Nlcn0gZnJvbSBcInV0aWxzL2Jyb3dzZXJcIjtcbmltcG9ydCB7UFJPVklERVJfREFTSCwgUFJPVklERVJfSExTLCBQUk9WSURFUl9XRUJSVEMsIFBST1ZJREVSX0hUTUw1LCBQUk9WSURFUl9SVE1QfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuaW1wb3J0IExBJCBmcm9tIFwidXRpbHMvbGlrZUEkLmpzXCI7XG5pbXBvcnQge2dldFNjcmlwdFBhdGh9IGZyb20gJ3V0aWxzL3dlYnBhY2snO1xuaW1wb3J0IHt2ZXJzaW9ufSBmcm9tICd2ZXJzaW9uJztcbi8vVG9EbyA6IFJlc3RydWN0dXJpbmdcblxuY29uc3QgTWFuYWdlciA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgYnJvd3NlckluZm8pe1xuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICBjb25zdCBTV0ZQYXRoID0gZ2V0U2NyaXB0UGF0aCgnb3ZlbnBsYXllci5qcycpK1wiT3ZlblBsYXllckZsYXNoLnN3Zj92PVwiK3ZlcnNpb247XG4gICAgbGV0IHJvb3RJZCA9IGNvbnRhaW5lci5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBhcmVudC1pZFwiKTtcbiAgICBsZXQgJGNvbnRhaW5lciA9IExBJChjb250YWluZXIpO1xuICAgIGxldCB2aWRlb0VsZW1lbnQgPSBcIlwiO1xuXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTWVkaWFNYW5hZ2VyIGxvYWRlZC4gYnJvd3NlciA6IFwiLCBicm93c2VySW5mbyApO1xuXG4gICAgY29uc3QgY3JlYXRlSHRtbFZpZGVvID0gZnVuY3Rpb24oaXNMb29wKXtcbiAgICAgICAgdmlkZW9FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbiAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnZGlzYWJsZXJlbW90ZXBsYXliYWNrJywgJycpO1xuICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCd3ZWJraXQtcGxheXNpbmxpbmUnLCAndHJ1ZScpO1xuICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCdwbGF5c2lubGluZScsICd0cnVlJyk7XG4gICAgICAgIGlmKGlzTG9vcCl7XG4gICAgICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCdsb29wJywgJycpO1xuICAgICAgICB9XG4gICAgICAgICRjb250YWluZXIuYXBwZW5kKHZpZGVvRWxlbWVudCk7XG5cbiAgICAgICAgcmV0dXJuIHZpZGVvRWxlbWVudDtcbiAgICB9O1xuICAgIGNvbnN0IGNyZWF0ZUZsYXNoVmlkZW8gPSBmdW5jdGlvbihpc0xvb3AsIGJ1ZmZlclRpbWUsIGJ1ZmZlclRpbWVNYXgpe1xuICAgICAgICBsZXQgbW92aWUsIGZsYXNodmFycywgYWxsb3dzY3JpcHRhY2Nlc3MsIGFsbG93ZnVsbHNjcmVlbiwgcXVhbGl0eSwgbmFtZSwgbWVudSwgcXVhbCwgYmdjb2xvciwgbG9vcCwgd21vZGUgO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJNZWRpYU1hbmFnZXIgRmxhc2ggYnVmZmVyIHNldHRpbmcgOiBcIiwgYnVmZmVyVGltZSwgYnVmZmVyVGltZU1heCk7XG4gICAgICAgIG1vdmllID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcbiAgICAgICAgbW92aWUuc2V0QXR0cmlidXRlKCduYW1lJywgJ21vdmllJyk7XG4gICAgICAgIG1vdmllLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBTV0ZQYXRoKTtcblxuICAgICAgICBmbGFzaHZhcnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xuICAgICAgICBmbGFzaHZhcnMuc2V0QXR0cmlidXRlKCduYW1lJywgJ2ZsYXNodmFycycpO1xuICAgICAgICAvL3BsYXllcklkIGlzIHRvIHVzZSBTV0YgZm9yIEV4dGVybmFsSW50ZXJmYWNlLmNhbGwoKS5cbiAgICAgICAgZmxhc2h2YXJzLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBgcGxheWVySWQ9JHtyb290SWR9JmJ1ZmZlclRpbWU9JHtidWZmZXJUaW1lfSZidWZmZXJNYXhUaW1lPSR7YnVmZmVyVGltZU1heH1gKTtcblxuICAgICAgICBhbGxvd3NjcmlwdGFjY2VzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XG4gICAgICAgIGFsbG93c2NyaXB0YWNjZXNzLnNldEF0dHJpYnV0ZSgnbmFtZScsICdhbGxvd3NjcmlwdGFjY2VzcycpO1xuICAgICAgICBhbGxvd3NjcmlwdGFjY2Vzcy5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ2Fsd2F5cycpO1xuXG4gICAgICAgIGFsbG93ZnVsbHNjcmVlbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XG4gICAgICAgIGFsbG93ZnVsbHNjcmVlbi5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnYWxsb3dmdWxsc2NyZWVuJyk7XG4gICAgICAgIGFsbG93ZnVsbHNjcmVlbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ3RydWUnKTtcblxuICAgICAgICBxdWFsaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcbiAgICAgICAgcXVhbGl0eS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAncXVhbGl0eScpO1xuICAgICAgICBxdWFsaXR5LnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnaGVpZ2h0Jyk7XG5cbiAgICAgICAgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XG4gICAgICAgIG5hbWUuc2V0QXR0cmlidXRlKCduYW1lJywgJ25hbWUnKTtcbiAgICAgICAgbmFtZS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgcm9vdElkK1wiLWZsYXNoXCIpO1xuXG4gICAgICAgIG1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xuICAgICAgICBtZW51LnNldEF0dHJpYnV0ZSgnbmFtZScsICdtZW51Jyk7XG4gICAgICAgIG1lbnUuc2V0QXR0cmlidXRlKCd2YWx1ZScsICdmYWxzZScpO1xuXG4gICAgICAgIHF1YWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xuICAgICAgICBxdWFsLnNldEF0dHJpYnV0ZSgnbmFtZScsICdxdWFsaXR5Jyk7XG4gICAgICAgIHF1YWwuc2V0QXR0cmlidXRlKCd2YWx1ZScsICdoaWdoJyk7XG5cbiAgICAgICAgYmdjb2xvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XG4gICAgICAgIGJnY29sb3Iuc2V0QXR0cmlidXRlKCduYW1lJywgJ2JnY29sb3InKTtcbiAgICAgICAgYmdjb2xvci5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJyMwMDAwMDAnKTtcblxuICAgICAgICB3bW9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XG4gICAgICAgIHdtb2RlLnNldEF0dHJpYnV0ZSgnbmFtZScsICd3bW9kZScpO1xuICAgICAgICB3bW9kZS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ29wYXF1ZScpO1xuXG4gICAgICAgIC8qbGV0IGFsbG93QnV0dG9uID0gYDxhIGhyZWY9XCJodHRwOi8vd3d3LmFkb2JlLmNvbS9nby9nZXRmbGFzaHBsYXllclwiPjxpbWcgc3JjPVwiaHR0cDovL3d3dy5hZG9iZS5jb20vaW1hZ2VzL3NoYXJlZC9kb3dubG9hZF9idXR0b25zL2dldF9mbGFzaF9wbGF5ZXIuZ2lmXCIgYWx0PVwiR2V0IEFkb2JlIEZsYXNoIHBsYXllclwiPjwvYT5gO1xuICAgICAgICBtZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgbWVzc2FnZS5pbm5lckhUTUwgPSBhbGxvd0J1dHRvbjsqL1xuXG4gICAgICAgIGlmKGlzTG9vcCl7XG4gICAgICAgICAgICBsb29wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcbiAgICAgICAgICAgIGxvb3Auc2V0QXR0cmlidXRlKCduYW1lJywgJ2xvb3AnKTtcbiAgICAgICAgICAgIGxvb3Auc2V0QXR0cmlidXRlKCd2YWx1ZScsICd0cnVlJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2aWRlb0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvYmplY3QnKTtcbiAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCByb290SWQrXCItZmxhc2hcIik7XG4gICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCByb290SWQrXCItZmxhc2hcIik7XG4gICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzEwMCUnKTtcbiAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgJzEwMCUnKTtcbiAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnc2NhbGUnLCAnZGVmYXVsdCcpO1xuICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCd3bW9kZScsICdvcGFxdWUnKTtcblxuICAgICAgICBpZihicm93c2VySW5mby5icm93c2VyID09PSBcIk1pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3JlclwiICYmIGJyb3dzZXJJbmZvLmJyb3dzZXJNYWpvclZlcnNpb24gPD0gOSApe1xuICAgICAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnY2xhc3NpZCcsICdjbHNpZDpEMjdDREI2RS1BRTZELTExY2YtOTZCOC00NDQ1NTM1NDAwMDAnKTtcbiAgICAgICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChtb3ZpZSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YScsIFNXRlBhdGgpO1xuICAgICAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgndHlwZScsICdhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmKGlzTG9vcCl7XG4gICAgICAgICAgICB2aWRlb0VsZW1lbnQuYXBwZW5kQ2hpbGQobG9vcCk7XG4gICAgICAgIH1cblxuICAgICAgICB2aWRlb0VsZW1lbnQuYXBwZW5kQ2hpbGQod21vZGUpO1xuICAgICAgICB2aWRlb0VsZW1lbnQuYXBwZW5kQ2hpbGQoYmdjb2xvcik7XG4gICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChxdWFsKTtcbiAgICAgICAgdmlkZW9FbGVtZW50LmFwcGVuZENoaWxkKGFsbG93ZnVsbHNjcmVlbik7XG4gICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChhbGxvd3NjcmlwdGFjY2Vzcyk7XG4gICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChmbGFzaHZhcnMpO1xuICAgICAgICAvL3ZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChtZXNzYWdlKTtcblxuICAgICAgICAkY29udGFpbmVyLmFwcGVuZCh2aWRlb0VsZW1lbnQpO1xuXG4gICAgICAgIHJldHVybiB2aWRlb0VsZW1lbnQ7XG4gICAgfTtcblxuICAgIHRoYXQuY3JlYXRlTWVkaWEgPSAocHJvdmlkZXJOYW1lICwgcGxheWVyQ29uZmlnKSAgPT4ge1xuICAgICAgICBpZiggcHJvdmlkZXJOYW1lID09PSBQUk9WSURFUl9SVE1QICl7XG4gICAgICAgICAgICBpZih2aWRlb0VsZW1lbnQpe1xuICAgICAgICAgICAgICAgIHRoYXQuZW1wdHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVGbGFzaFZpZGVvKHBsYXllckNvbmZpZy5pc0xvb3AoKSwgcGxheWVyQ29uZmlnLmdldFJ0bXBCdWZmZXJUaW1lKCksIHBsYXllckNvbmZpZy5nZXRSdG1wQnVmZmVyVGltZU1heCgpKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBpZih2aWRlb0VsZW1lbnQpe1xuICAgICAgICAgICAgICAgIC8vdGhhdC5lbXB0eSgpO1xuICAgICAgICAgICAgICAgIC8vcmV1c2UgdmlkZW8gZWxlbWVudC5cbiAgICAgICAgICAgICAgICAvL2JlY3Vhc2UgcGxheWxpc3QgaXMgYXV0byBuZXh0IHBsYXlpbmcuXG4gICAgICAgICAgICAgICAgLy9Pbmx5IHNhbWUgdmlkZW8gZWxlbWVudCBkb2VzIG5vdCByZXF1aXJlIFVzZXIgSW50ZXJhY3Rpb24gRXJyb3IuXG4gICAgICAgICAgICAgICAgLy9Ub0RvIDogcmVmYWN0b3JpbmdcbiAgICAgICAgICAgICAgICByZXR1cm4gdmlkZW9FbGVtZW50O1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUh0bWxWaWRlbyhwbGF5ZXJDb25maWcuaXNMb29wKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhhdC5jcmVhdGVBZENvbnRhaW5lciA9ICgpID0+IHtcbiAgICAgICAgbGV0IGFkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGFkQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnb3ZwLWFkcycpO1xuICAgICAgICAkY29udGFpbmVyLmFwcGVuZChhZENvbnRhaW5lcik7XG5cbiAgICAgICAgcmV0dXJuIGFkQ29udGFpbmVyO1xuICAgIH07XG5cblxuICAgIHRoYXQuZW1wdHkgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTWVkaWFNYW5hZ2VyIHJlbW92ZUVsZW1lbnQoKVwiKTtcbiAgICAgICAgJGNvbnRhaW5lci5yZW1vdmVDaGlsZCh2aWRlb0VsZW1lbnQpO1xuICAgICAgICB2aWRlb0VsZW1lbnQgPSBudWxsO1xuICAgIH07XG5cbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgJGNvbnRhaW5lci5yZW1vdmVDaGlsZCgpO1xuICAgICAgICAkY29udGFpbmVyID0gbnVsbDtcbiAgICAgICAgdmlkZW9FbGVtZW50ID0gbnVsbDtcbiAgICAgICAgcm9vdElkID0gbnVsbDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBNYW5hZ2VyO1xuIiwiaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcbmltcG9ydCB7aXNSdG1wLCBpc1dlYlJUQywgaXNEYXNoIH0gZnJvbSBcInV0aWxzL3ZhbGlkYXRvclwiO1xuaW1wb3J0IHtleHRyYWN0RXh0ZW5zaW9uICx0cmltfSBmcm9tIFwiLi4vLi4vdXRpbHMvc3RyaW5nc1wiO1xuaW1wb3J0IFN1cHBvcnRDaGVja2VyIGZyb20gXCIuLi9TdXBwb3J0Q2hlY2tlclwiO1xuaW1wb3J0IHtQTEFZTElTVF9DSEFOR0VEfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG4vKipcbiAqIEBicmllZiAgIFRoaXMgbWFuYWdlcyBQbGF5bGlzdCBvciBTb3VyY2VzLlxuICogQHBhcmFtXG4gKlxuICogKi9cbmNvbnN0IE1hbmFnZXIgPSBmdW5jdGlvbihwcm92aWRlcil7XG4gICAgY29uc3QgdGhhdCA9IHt9O1xuICAgIGxldCBjdXJyZW50UGxheWxpc3RJdGVtID0gW107XG4gICAgbGV0IHNwZWMgPSB7XG4gICAgICAgIHBsYXlsaXN0IDogW10sXG4gICAgICAgIGN1cnJlbnRJbmRleCA6IDBcbiAgICB9O1xuICAgIGxldCBzdXBwb3J0Q2hlY2tlciA9IFN1cHBvcnRDaGVja2VyKCk7XG5cbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQbGF5bGlzdE1hbmFnZXIgbG9hZGVkLlwiKTtcblxuICAgIGNvbnN0IG1ha2VQcmV0dHlTb3VyY2UgPSBmdW5jdGlvbihzb3VyY2VfKXtcbiAgICAgICAgaWYgKCFzb3VyY2VfIHx8ICFzb3VyY2VfLmZpbGUgJiYgIShzb3VyY2VfLmhvc3QgfHwgc291cmNlXy5hcHBsaWNhdGlvbiB8fCBzb3VyY2VfLnN0cmVhbSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzb3VyY2UgPSBPYmplY3QuYXNzaWduKHt9LCB7ICdkZWZhdWx0JzogZmFsc2UgfSwgc291cmNlXyk7XG4gICAgICAgIHNvdXJjZS5maWxlID0gdHJpbSgnJyArIHNvdXJjZS5maWxlKTtcblxuICAgICAgICBpZihzb3VyY2UuaG9zdCAmJiBzb3VyY2UuYXBwbGljYXRpb24gJiYgc291cmNlLnN0cmVhbSl7XG4gICAgICAgICAgICBzb3VyY2UuZmlsZSA9IHNvdXJjZS5ob3N0ICsgXCIvXCIgKyBzb3VyY2UuYXBwbGljYXRpb24gKyBcIi9zdHJlYW0vXCIgKyBzb3VyY2Uuc3RyZWFtO1xuICAgICAgICAgICAgZGVsZXRlIHNvdXJjZS5ob3N0O1xuICAgICAgICAgICAgZGVsZXRlIHNvdXJjZS5hcHBsaWNhdGlvbjtcbiAgICAgICAgICAgIGRlbGV0ZSBzb3VyY2Uuc3RyZWFtO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbWltZXR5cGVSZWdFeCA9IC9eW14vXStcXC8oPzp4LSk/KFteL10rKSQvO1xuXG4gICAgICAgIGlmIChtaW1ldHlwZVJlZ0V4LnRlc3Qoc291cmNlLnR5cGUpKSB7XG4gICAgICAgICAgICAvLyBpZiB0eXBlIGlzIGdpdmVuIGFzIGEgbWltZXR5cGVcbiAgICAgICAgICAgIHNvdXJjZS5taW1lVHlwZSA9IHNvdXJjZS50eXBlO1xuICAgICAgICAgICAgc291cmNlLnR5cGUgPSBzb3VyY2UudHlwZS5yZXBsYWNlKG1pbWV0eXBlUmVnRXgsICckMScpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoaXNSdG1wKHNvdXJjZS5maWxlKSl7XG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdydG1wJztcbiAgICAgICAgfWVsc2UgaWYoaXNXZWJSVEMoc291cmNlLmZpbGUpKXtcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ3dlYnJ0Yyc7XG4gICAgICAgIH1lbHNlIGlmKGlzRGFzaChzb3VyY2UuZmlsZSwgc291cmNlLnR5cGUpKXtcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ2Rhc2gnO1xuICAgICAgICB9ZWxzZSBpZiAoIXNvdXJjZS50eXBlKSB7XG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9IGV4dHJhY3RFeHRlbnNpb24oc291cmNlLmZpbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFzb3VyY2UudHlwZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbm9ybWFsaXplIHR5cGVzXG4gICAgICAgIHN3aXRjaCAoc291cmNlLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ20zdTgnOlxuICAgICAgICAgICAgY2FzZSAndm5kLmFwcGxlLm1wZWd1cmwnOlxuICAgICAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ2hscyc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdtNGEnOlxuICAgICAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ2FhYyc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdzbWlsJzpcbiAgICAgICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdydG1wJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICBpZiAoc291cmNlW2tleV0gPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHNvdXJjZVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc291cmNlO1xuXG4gICAgfVxuXG4gICAgdGhhdC5pbml0UGxheWxpc3QgPShwbGF5bGlzdCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBzZXRQbGF5bGlzdCgpIFwiLCBwbGF5bGlzdCk7XG4gICAgICAgIGNvbnN0IHByZXR0aWVkUGxheWxpc3QgPSAoXy5pc0FycmF5KHBsYXlsaXN0KSA/IHBsYXlsaXN0IDogW3BsYXlsaXN0XSkubWFwKGZ1bmN0aW9uKGl0ZW0pe1xuICAgICAgICAgICAgaWYoIV8uaXNBcnJheShpdGVtLnRyYWNrcykpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgaXRlbS50cmFja3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgcGxheWxpc3RJdGVtID0gT2JqZWN0LmFzc2lnbih7fSx7XG4gICAgICAgICAgICAgICAgc291cmNlczogW10sXG4gICAgICAgICAgICAgICAgdHJhY2tzOiBbXSxcbiAgICAgICAgICAgICAgICB0aXRsZSA6IFwiXCJcbiAgICAgICAgICAgIH0sIGl0ZW0gKTtcblxuICAgICAgICAgICAgaWYoKHBsYXlsaXN0SXRlbS5zb3VyY2VzID09PSBPYmplY3QocGxheWxpc3RJdGVtLnNvdXJjZXMpKSAmJiAhXy5pc0FycmF5KHBsYXlsaXN0SXRlbS5zb3VyY2VzKSkge1xuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gW21ha2VQcmV0dHlTb3VyY2UocGxheWxpc3RJdGVtLnNvdXJjZXMpXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFfLmlzQXJyYXkocGxheWxpc3RJdGVtLnNvdXJjZXMpIHx8IHBsYXlsaXN0SXRlbS5zb3VyY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gW21ha2VQcmV0dHlTb3VyY2UocGxheWxpc3RJdGVtKV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKCFfLmlzQXJyYXkocGxheWxpc3RJdGVtLnNvdXJjZXMpIHx8IHBsYXlsaXN0SXRlbS5zb3VyY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmxldmVscykge1xuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IGl0ZW0ubGV2ZWxzO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gW21ha2VQcmV0dHlTb3VyY2UoaXRlbSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcGxheWxpc3RJdGVtLnNvdXJjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgc291cmNlID0gcGxheWxpc3RJdGVtLnNvdXJjZXNbaV07XG4gICAgICAgICAgICAgICAgbGV0IHByZXR0eVNvdXJjZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgaWYgKCFzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGRlZmF1bHRTb3VyY2UgPSBzb3VyY2UuZGVmYXVsdDtcbiAgICAgICAgICAgICAgICBpZiAoZGVmYXVsdFNvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2UuZGVmYXVsdCA9IChkZWZhdWx0U291cmNlLnRvU3RyaW5nKCkgPT09ICd0cnVlJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlLmRlZmF1bHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgc291cmNlIGRvZXNuJ3QgaGF2ZSBhIGxhYmVsLCBudW1iZXIgaXRcbiAgICAgICAgICAgICAgICBpZiAoIXBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldLmxhYmVsID0gcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0udHlwZStcIi1cIitpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcHJldHR5U291cmNlID0gbWFrZVByZXR0eVNvdXJjZShwbGF5bGlzdEl0ZW0uc291cmNlc1tpXSk7XG4gICAgICAgICAgICAgICAgaWYoc3VwcG9ydENoZWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKHByZXR0eVNvdXJjZSkpe1xuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXSA9IHByZXR0eVNvdXJjZTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0gPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBwbGF5bGlzdEl0ZW0uc291cmNlcy5maWx0ZXIoc291cmNlID0+ICEhc291cmNlKTtcblxuICAgICAgICAgICAgaWYoIXBsYXlsaXN0SXRlbS50aXRsZSAmJiAgcGxheWxpc3RJdGVtLnNvdXJjZXNbMF0gJiYgcGxheWxpc3RJdGVtLnNvdXJjZXNbMF0ubGFiZWwpe1xuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS50aXRsZSA9IHBsYXlsaXN0SXRlbS5zb3VyY2VzWzBdLmxhYmVsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBkZWZhdWx0IOqwgCDsl4bsnYTrlYwgd2VicnRj6rCAIOyeiOuLpOuptCB3ZWJydGMgZGVmYXVsdCA6IHRydWXroZwg7J6Q64+ZIOyEpOyglVxuICAgICAgICAgICAgLypsZXQgaGF2ZURlZmF1bHQgPSBfLmZpbmQocGxheWxpc3RJdGVtLnNvdXJjZXMsIGZ1bmN0aW9uKHNvdXJjZSl7cmV0dXJuIHNvdXJjZS5kZWZhdWx0ID09IHRydWU7fSk7XG4gICAgICAgICAgICBsZXQgd2VicnRjU291cmNlID0gW107XG4gICAgICAgICAgICBpZighaGF2ZURlZmF1bHQpe1xuICAgICAgICAgICAgICAgIHdlYnJ0Y1NvdXJjZSA9IF8uZmluZChwbGF5bGlzdEl0ZW0uc291cmNlcywgZnVuY3Rpb24oc291cmNlKXtyZXR1cm4gc291cmNlLnR5cGUgPT0gXCJ3ZWJydGNcIjt9KTtcbiAgICAgICAgICAgICAgICBpZih3ZWJydGNTb3VyY2Upe1xuICAgICAgICAgICAgICAgICAgICB3ZWJydGNTb3VyY2UuZGVmYXVsdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSovXG5cblxuXG4gICAgICAgICAgICBpZighXy5pc0FycmF5KHBsYXlsaXN0SXRlbS50cmFja3MpKXtcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0udHJhY2tzID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihfLmlzQXJyYXkocGxheWxpc3RJdGVtLmNhcHRpb25zKSl7XG4gICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnRyYWNrcyA9IHBsYXlsaXN0SXRlbS50cmFja3MuY29uY2F0KHBsYXlsaXN0SXRlbS5jYXB0aW9ucyk7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHBsYXlsaXN0SXRlbS5jYXB0aW9ucztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcGxheWxpc3RJdGVtLnRyYWNrcyA9IHBsYXlsaXN0SXRlbS50cmFja3MubWFwKGZ1bmN0aW9uKHRyYWNrKXtcbiAgICAgICAgICAgICAgICBpZighdHJhY2sgfHwgIXRyYWNrLmZpbGUpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB7XG4gICAgICAgICAgICAgICAgICAgICdraW5kJzogJ2NhcHRpb25zJyxcbiAgICAgICAgICAgICAgICAgICAgJ2RlZmF1bHQnOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sIHRyYWNrKTtcbiAgICAgICAgICAgIH0pLmZpbHRlcih0cmFjayA9PiAhIXRyYWNrKTtcblxuICAgICAgICAgICAgcmV0dXJuIHBsYXlsaXN0SXRlbTtcbiAgICAgICAgfSkuZmlsdGVyKGZ1bmN0aW9uKGl0ZW0pe3JldHVybiBpdGVtLnNvdXJjZXMgJiYgaXRlbS5zb3VyY2VzLmxlbmd0aCA+IDA7fSl8fFtdO1xuICAgICAgICBzcGVjLnBsYXlsaXN0ID0gcHJldHRpZWRQbGF5bGlzdDtcbiAgICAgICAgcmV0dXJuIHByZXR0aWVkUGxheWxpc3Q7XG4gICAgfTtcbiAgICB0aGF0LmdldFBsYXlsaXN0ID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQbGF5bGlzdE1hbmFnZXIgZ2V0UGxheWxpc3QoKSBcIiwgc3BlYy5wbGF5bGlzdCk7XG4gICAgICAgIHJldHVybiBzcGVjLnBsYXlsaXN0O1xuICAgIH07XG4gICAgdGhhdC5nZXRDdXJyZW50UGxheUxpc3QgPSAoKSA9PiB7XG4gICAgICAgIGlmKHNwZWMucGxheWxpc3Rbc3BlYy5jdXJyZW50SW5kZXhdKXtcbiAgICAgICAgICAgIHJldHVybiBzcGVjLnBsYXlsaXN0W3NwZWMuY3VycmVudEluZGV4XTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQuZ2V0Q3VycmVudFBsYXlsaXN0SW5kZXggPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRJbmRleDtcbiAgICB9O1xuICAgIHRoYXQuc2V0Q3VycmVudFBsYXlsaXN0ID0gKGluZGV4KSA9PiB7XG4gICAgICAgIGlmKHNwZWMucGxheWxpc3RbaW5kZXhdKXtcbiAgICAgICAgICAgIHNwZWMuY3VycmVudEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICBwcm92aWRlci50cmlnZ2VyKFBMQVlMSVNUX0NIQU5HRUQsIHNwZWMuY3VycmVudEluZGV4KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50SW5kZXg7XG4gICAgfTtcbiAgICB0aGF0LmdldEN1cnJlbnRTb3VyY2VzID0gKCkgPT4ge1xuICAgICAgICBpZihzcGVjLnBsYXlsaXN0W3NwZWMuY3VycmVudEluZGV4XSl7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQbGF5bGlzdE1hbmFnZXIgZ2V0Q3VycmVudFNvdXJjZXMoKSBcIiwgc3BlYy5wbGF5bGlzdFtzcGVjLmN1cnJlbnRJbmRleF0uc291cmNlcyk7XG4gICAgICAgICAgICByZXR1cm4gc3BlYy5wbGF5bGlzdFtzcGVjLmN1cnJlbnRJbmRleF0uc291cmNlcztcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgfTtcbiAgICB0aGF0LmdldEN1cnJlbnRBZFRhZyA9ICgpID0+IHtcbiAgICAgICAgaWYoc3BlYy5wbGF5bGlzdFtzcGVjLmN1cnJlbnRJbmRleF0pe1xuICAgICAgICAgICAgcmV0dXJuIHNwZWMucGxheWxpc3Rbc3BlYy5jdXJyZW50SW5kZXhdLmFkVGFnVXJsIHx8IFwiXCI7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IE1hbmFnZXI7XG4iLCJpbXBvcnQgU3VwcG9ydENoZWNrZXIgZnJvbSBcImFwaS9TdXBwb3J0Q2hlY2tlclwiO1xuaW1wb3J0IHtBcGlSdG1wRXhwYW5zaW9ufSBmcm9tICdhcGkvQXBpRXhwYW5zaW9ucyc7XG5pbXBvcnQge1xuICAgIFBST1ZJREVSX0hUTUw1LCBQUk9WSURFUl9XRUJSVEMsIFBST1ZJREVSX0RBU0gsIFBST1ZJREVSX0hMUywgUFJPVklERVJfUlRNUCxcbiAgICBFUlJPUlMsIElOSVRfVU5TVVBQT1JUX0VSUk9SXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5cbi8qKlxuICogQGJyaWVmICAgVGhpcyBtYW5hZ2VzIHByb3ZpZGVyLlxuICogQHBhcmFtXG4gKiAqL1xuY29uc3QgQ29udHJvbGxlciA9IGZ1bmN0aW9uKCl7XG4gICAgbGV0IHN1cHBvcnRDaGFja2VyID0gU3VwcG9ydENoZWNrZXIoKTtcbiAgICBjb25zdCBQcm92aWRlcnMgPSB7fTtcblxuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgbG9hZGVkLlwiKTtcblxuICAgIGNvbnN0IHJlZ2lzdGVQcm92aWRlciA9IChuYW1lLCBwcm92aWRlcikgPT57XG4gICAgICAgIGlmKFByb3ZpZGVyc1tuYW1lXSl7XG4gICAgICAgICAgICByZXR1cm4gO1xuICAgICAgICB9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBfcmVnaXN0ZXJQcm92aWRlcigpIFwiLCBuYW1lKTtcbiAgICAgICAgUHJvdmlkZXJzW25hbWVdID0gcHJvdmlkZXI7XG4gICAgfTtcblxuICAgIGNvbnN0IFByb3ZpZGVyTG9hZGVyID17XG4gICAgICAgIGh0bWw1OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvSHRtbDUnXSwgZnVuY3Rpb24ocmVxdWlyZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvSHRtbDUnKS5kZWZhdWx0O1xuICAgICAgICAgICAgICAgICAgICByZWdpc3RlUHJvdmlkZXIoUFJPVklERVJfSFRNTDUsIHByb3ZpZGVyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge25hbWUgOiBQUk9WSURFUl9IVE1MNSwgcHJvdmlkZXIgOiBwcm92aWRlcn07XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XG4gICAgICAgICAgICAgICAgfSwnb3ZlbnBsYXllci5wcm92aWRlci5IdG1sNSdcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIHdlYnJ0YyA6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvaHRtbDUvcHJvdmlkZXJzL1dlYlJUQyddLCBmdW5jdGlvbihyZXF1aXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9XZWJSVEMnKS5kZWZhdWx0O1xuICAgICAgICAgICAgICAgICAgICByZWdpc3RlUHJvdmlkZXIoUFJPVklERVJfV0VCUlRDLCBwcm92aWRlcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtuYW1lIDogUFJPVklERVJfV0VCUlRDLCBwcm92aWRlciA6IHByb3ZpZGVyfTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcbiAgICAgICAgICAgICAgICB9LCdvdmVucGxheWVyLnByb3ZpZGVyLldlYlJUQ1Byb3ZpZGVyJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgZGFzaCA6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvaHRtbDUvcHJvdmlkZXJzL0Rhc2gnXSwgZnVuY3Rpb24ocmVxdWlyZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvRGFzaCcpLmRlZmF1bHQ7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVQcm92aWRlcihQUk9WSURFUl9EQVNILCBwcm92aWRlcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtuYW1lIDogUFJPVklERVJfREFTSCwgcHJvdmlkZXIgOiBwcm92aWRlcn07XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XG4gICAgICAgICAgICAgICAgfSwnb3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXInXG4gICAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICBobHMgOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IbHMnXSwgZnVuY3Rpb24ocmVxdWlyZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvSGxzJykuZGVmYXVsdDtcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFBST1ZJREVSX0hMUywgcHJvdmlkZXIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7bmFtZSA6IFBST1ZJREVSX0hMUywgcHJvdmlkZXIgOiBwcm92aWRlcn07XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XG4gICAgICAgICAgICAgICAgfSwnb3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcidcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIHJ0bXAgOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2ZsYXNoL3Byb3ZpZGVycy9SdG1wJ10sIGZ1bmN0aW9uKHJlcXVpcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvZmxhc2gvcHJvdmlkZXJzL1J0bXAnKS5kZWZhdWx0O1xuICAgICAgICAgICAgICAgICAgICByZWdpc3RlUHJvdmlkZXIoUFJPVklERVJfUlRNUCwgcHJvdmlkZXIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge25hbWUgOiBQUk9WSURFUl9SVE1QLCBwcm92aWRlciA6IHByb3ZpZGVyfTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcbiAgICAgICAgICAgICAgICB9LCdvdmVucGxheWVyLnByb3ZpZGVyLlJ0bXBQcm92aWRlcidcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICB0aGF0LmxvYWRQcm92aWRlcnMgPSAocGxheWxpc3RJdGVtKSA9PntcbiAgICAgICAgY29uc3Qgc3VwcG9ydGVkUHJvdmlkZXJOYW1lcyA9IHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVzQnlQbGF5bGlzdChwbGF5bGlzdEl0ZW0pO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgbG9hZFByb3ZpZGVycygpIFwiLCBzdXBwb3J0ZWRQcm92aWRlck5hbWVzKTtcbiAgICAgICAgaWYoIXN1cHBvcnRlZFByb3ZpZGVyTmFtZXMpe1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEVSUk9SU1tJTklUX1VOU1VQUE9SVF9FUlJPUl0pO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChcbiAgICAgICAgICAgICAgICBzdXBwb3J0ZWRQcm92aWRlck5hbWVzLmZpbHRlcihmdW5jdGlvbihwcm92aWRlck5hbWUpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gISFQcm92aWRlckxvYWRlcltwcm92aWRlck5hbWVdO1xuICAgICAgICAgICAgICAgIH0pLm1hcChmdW5jdGlvbihwcm92aWRlck5hbWUpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvdmlkZXJMb2FkZXJbcHJvdmlkZXJOYW1lXSgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgdGhhdC5maW5kQnlOYW1lID0gKG5hbWUpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGZpbmRCeU5hbWUoKSBcIiwgbmFtZSk7XG4gICAgICAgIHJldHVybiBQcm92aWRlcnNbbmFtZV07XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0UHJvdmlkZXJCeVNvdXJjZSA9IChzb3VyY2UpID0+IHtcbiAgICAgICAgY29uc3Qgc3VwcG9ydGVkUHJvdmlkZXJOYW1lID0gc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKHNvdXJjZSk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBnZXRQcm92aWRlckJ5U291cmNlKCkgXCIsIHN1cHBvcnRlZFByb3ZpZGVyTmFtZSk7XG4gICAgICAgIHJldHVybiB0aGF0LmZpbmRCeU5hbWUoc3VwcG9ydGVkUHJvdmlkZXJOYW1lKTtcbiAgICB9O1xuXG4gICAgdGhhdC5pc1NhbWVQcm92aWRlciA9IChjdXJyZW50U291cmNlLCBuZXdTb3VyY2UpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGlzU2FtZVByb3ZpZGVyKCkgXCIsIHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShjdXJyZW50U291cmNlKSAsIHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShuZXdTb3VyY2UpICk7XG4gICAgICAgIHJldHVybiBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UoY3VycmVudFNvdXJjZSkgPT09IHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShuZXdTb3VyY2UpO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbnRyb2xsZXI7XG4iLCJpbXBvcnQgQVBJIGZyb20gJ2FwaS9BcGknO1xuaW1wb3J0IHtpc1dlYlJUQ30gZnJvbSAndXRpbHMvdmFsaWRhdG9yJztcbmltcG9ydCBfIGZyb20gJ3V0aWxzL3VuZGVyc2NvcmUnO1xuaW1wb3J0IExhJCBmcm9tICd1dGlscy9saWtlQSQnO1xuaW1wb3J0IHtnZXRTY3JpcHRQYXRofSBmcm9tICd1dGlscy93ZWJwYWNrJztcblxuXG5fX3dlYnBhY2tfcHVibGljX3BhdGhfXyA9IGdldFNjcmlwdFBhdGgoJ292ZW5wbGF5ZXIuc2RrLmpzJyk7XG5cbi8qKlxuICogTWFpbiBPdmVuUGxheWVyU0RLIG9iamVjdFxuICovXG5jb25zdCBPdmVuUGxheWVyU0RLID0gd2luZG93Lk92ZW5QbGF5ZXJTREsgPSB7fTtcblxuY29uc3QgcGxheWVyTGlzdCA9IE92ZW5QbGF5ZXJTREsucGxheWVyTGlzdCA9IFtdO1xuXG5leHBvcnQgY29uc3QgY2hlY2tBbmRHZXRDb250YWluZXJFbGVtZW50ID0gZnVuY3Rpb24oY29udGFpbmVyKSB7XG4gICAgaWYgKCFjb250YWluZXIpIHtcblxuICAgICAgICAvLyBUT0RPKHJvY2spOiBTaG91bGQgY2F1c2UgYW4gZXJyb3IuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGxldCBjb250YWluZXJFbGVtZW50ID0gbnVsbDtcblxuICAgIGlmICh0eXBlb2YgY29udGFpbmVyID09PSAnc3RyaW5nJykge1xuXG4gICAgICAgIGNvbnRhaW5lckVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb250YWluZXIpO1xuICAgIH0gZWxzZSBpZiAoY29udGFpbmVyLm5vZGVUeXBlKSB7XG5cbiAgICAgICAgY29udGFpbmVyRWxlbWVudCA9IGNvbnRhaW5lcjtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBUT0RPKHJvY2spOiBTaG91bGQgY2F1c2UgYW4gZXJyb3IuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBjb250YWluZXJFbGVtZW50O1xufVxuXG4vKipcbiAqIENyZWF0ZSBwbGF5ZXIgaW5zdGFuY2UgYW5kIHJldHVybiBpdC5cbiAqXG4gKiBAcGFyYW0gICAgICB7c3RyaW5nIHwgZG9tIGVsZW1lbnR9IGNvbnRhaW5lciAgSWQgb2YgY29udGFpbmVyIGVsZW1lbnQgb3IgY29udGFpbmVyIGVsZW1lbnRcbiAqIEBwYXJhbSAgICAgIHtvYmplY3R9IG9wdGlvbnMgIFRoZSBvcHRpb25zXG4gKi9cbk92ZW5QbGF5ZXJTREsuY3JlYXRlID0gZnVuY3Rpb24oY29udGFpbmVyLCBvcHRpb25zKSB7XG5cbiAgICBsZXQgY29udGFpbmVyRWxlbWVudCA9IGNoZWNrQW5kR2V0Q29udGFpbmVyRWxlbWVudChjb250YWluZXIpO1xuXG4gICAgY29uc3QgcGxheWVySW5zdGFuY2UgPSBBUEkoY29udGFpbmVyRWxlbWVudCk7XG4gICAgcGxheWVySW5zdGFuY2UuaW5pdChvcHRpb25zKTtcblxuICAgIHBsYXllckxpc3QucHVzaChwbGF5ZXJJbnN0YW5jZSk7XG5cbiAgICByZXR1cm4gcGxheWVySW5zdGFuY2U7XG59O1xuXG4vKipcbiAqIEdldHMgdGhlIHBsYXllciBpbnN0YW5jZSBsaXN0LlxuICpcbiAqIEByZXR1cm4gICAgIHthcnJheX0gIFRoZSBwbGF5ZXIgbGlzdC5cbiAqL1xuT3ZlblBsYXllclNESy5nZXRQbGF5ZXJMaXN0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICByZXR1cm4gcGxheWVyTGlzdDtcbn07XG5cbi8qKlxuICogR2V0cyB0aGUgcGxheWVyIGluc3RhbmNlIGJ5IGNvbnRhaW5lciBpZC5cbiAqXG4gKiBAcGFyYW0gICAgICB7c3RyaW5nfSAgY29udGFpbmVySWQgIFRoZSBjb250YWluZXIgaWRlbnRpZmllclxuICogQHJldHVybiAgICAge29iZWplY3QgfCBudWxsfSAgVGhlIHBsYXllciBpbnN0YW5jZS5cbiAqL1xuT3ZlblBsYXllclNESy5nZXRQbGF5ZXJCeUNvbnRhaW5lcklkID0gZnVuY3Rpb24oY29udGFpbmVySWQpIHtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxheWVyTGlzdC5sZW5ndGg7IGkgKyspIHtcblxuICAgICAgICBpZiAocGxheWVyTGlzdFtpXS5nZXRDb250YWluZXJJZCgpID09PSBjb250YWluZXJJZCkge1xuXG4gICAgICAgICAgICByZXR1cm4gcGxheWVyTGlzdFtpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xufTtcblxuLyoqXG4gKiBHZXRzIHRoZSBwbGF5ZXIgaW5zdGFuY2UgYnkgaW5kZXguXG4gKlxuICogQHBhcmFtICAgICAge251bWJlcn0gIGluZGV4ICAgVGhlIGluZGV4XG4gKiBAcmV0dXJuICAgICB7b2JqZWN0IHwgbnVsbH0gIFRoZSBwbGF5ZXIgaW5zdGFuY2UuXG4gKi9cbk92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyQnlJbmRleCA9IGZ1bmN0aW9uKGluZGV4KSB7XG5cbiAgICBjb25zdCBwbGF5ZXJJbnN0YW5jZSA9IHBsYXllckxpc3RbaW5kZXhdO1xuXG4gICAgaWYgKHBsYXllckluc3RhbmNlKSB7XG5cbiAgICAgICAgcmV0dXJuIHBsYXllckluc3RhbmNlO1xuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufTtcblxuLyoqXG4gKiBSZW1vdmUgdGhlIHBsYXllciBpbnN0YW5jZSBieSBwbGF5ZXJJZC5cbiAqXG4gKiBAcGFyYW0gICAgICB7cGxheWVySWR9ICBpZFxuICogQHJldHVybiAgICAge251bGx9XG4gKi9cbk92ZW5QbGF5ZXJTREsucmVtb3ZlUGxheWVyID0gZnVuY3Rpb24ocGxheWVySWQpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXllckxpc3QubGVuZ3RoOyBpICsrKSB7XG5cbiAgICAgICAgaWYgKHBsYXllckxpc3RbaV0uZ2V0Q29udGFpbmVySWQoKSA9PT0gcGxheWVySWQpIHtcblxuICAgICAgICAgICAgcGxheWVyTGlzdC5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn07XG5cbi8qKlxuICogR2VuZXJhdGUgd2VicnRjIHNvdXJjZSBmb3IgcGxheWVyIHNvdXJjZSB0eXBlLlxuICpcbiAqIEBwYXJhbSAgICAgIHtPYmplY3QgfCBBcnJheX0gIHNvdXJjZSAgIHdlYnJ0YyBzb3VyY2VcbiAqIEByZXR1cm4gICAgIHtBcnJheX0gIFBsYXllciBzb3VyY2UgT2JqZWN0LlxuICovXG5PdmVuUGxheWVyU0RLLmdlbmVyYXRlV2VicnRjVXJscyA9IGZ1bmN0aW9uKHNvdXJjZXMpIHtcbiAgICByZXR1cm4gKF8uaXNBcnJheShzb3VyY2VzKSA/IHNvdXJjZXMgOiBbc291cmNlc10pLm1hcChmdW5jdGlvbihzb3VyY2UsIGluZGV4KXtcbiAgICAgICAgaWYoc291cmNlLmhvc3QgJiYgaXNXZWJSVEMoc291cmNlLmhvc3QpICYmIHNvdXJjZS5hcHBsaWNhdGlvbiAmJiBzb3VyY2Uuc3RyZWFtKXtcbiAgICAgICAgICAgIHJldHVybiB7ZmlsZSA6IHNvdXJjZS5ob3N0ICsgXCIvXCIgKyBzb3VyY2UuYXBwbGljYXRpb24gKyBcIi9cIiArIHNvdXJjZS5zdHJlYW0sIHR5cGUgOiBcIndlYnJ0Y1wiLCBsYWJlbCA6IHNvdXJjZS5sYWJlbCA/IHNvdXJjZS5sYWJlbCA6IFwid2VicnRjLVwiKyhpbmRleCsxKSB9O1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFdoZXRoZXIgc2hvdyB0aGUgcGxheWVyIGNvcmUgbG9nIG9yIG5vdC5cbiAqXG4gKiBAcGFyYW0gICAgICB7Ym9vbGVhbn0gIGJvb2xlYW4gICBydW4gZGVidWcgbW9kZSBvciBub3QuXG4gKiBAcmV0dXJuICAgICB7Ym9vbGVhbn0gIHJ1biBkZWJ1ZyBtb2RlIG9yIG5vdC5cbiAqL1xuT3ZlblBsYXllclNESy5kZWJ1ZyA9IGZ1bmN0aW9uKGlzRGVidWdNb2RlKSB7XG4gICAgaWYoaXNEZWJ1Z01vZGUpe1xuICAgICAgICB3aW5kb3cuT3ZlblBsYXllckNvbnNvbGUgPSB7bG9nIDogd2luZG93Wydjb25zb2xlJ11bJ2xvZyddfTtcbiAgICB9ZWxzZXtcbiAgICAgICAgd2luZG93Lk92ZW5QbGF5ZXJDb25zb2xlID0ge2xvZyA6ICBmdW5jdGlvbigpe319O1xuICAgIH1cbiAgICByZXR1cm4gaXNEZWJ1Z01vZGU7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBPdmVuUGxheWVyU0RLO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gOC4gMjQuLlxuICovXG5cbmV4cG9ydCBjb25zdCBnZXRCcm93c2VyTGFuZ3VhZ2UgPSBmdW5jdGlvbigpe1xuICAgIGxldCBuYXYgPSB3aW5kb3cubmF2aWdhdG9yLFxuICAgICAgICBicm93c2VyTGFuZ3VhZ2VQcm9wZXJ0eUtleXMgPSBbJ2xhbmd1YWdlJywgJ2Jyb3dzZXJMYW5ndWFnZScsICdzeXN0ZW1MYW5ndWFnZScsICd1c2VyTGFuZ3VhZ2UnXSxcbiAgICAgICAgaSxcbiAgICAgICAgbGFuZ3VhZ2U7XG5cbiAgICAvLyBzdXBwb3J0IGZvciBIVE1MIDUuMSBcIm5hdmlnYXRvci5sYW5ndWFnZXNcIlxuICAgIGlmIChBcnJheS5pc0FycmF5KG5hdi5sYW5ndWFnZXMpKSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBuYXYubGFuZ3VhZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsYW5ndWFnZSA9IG5hdi5sYW5ndWFnZXNbaV07XG4gICAgICAgICAgICBpZiAobGFuZ3VhZ2UgJiYgbGFuZ3VhZ2UubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxhbmd1YWdlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gc3VwcG9ydCBmb3Igb3RoZXIgd2VsbCBrbm93biBwcm9wZXJ0aWVzIGluIGJyb3dzZXJzXG4gICAgZm9yIChpID0gMDsgaSA8IGJyb3dzZXJMYW5ndWFnZVByb3BlcnR5S2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsYW5ndWFnZSA9IG5hdlticm93c2VyTGFuZ3VhZ2VQcm9wZXJ0eUtleXNbaV1dO1xuICAgICAgICBpZiAobGFuZ3VhZ2UgJiYgbGFuZ3VhZ2UubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gbGFuZ3VhZ2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbn07XG5leHBvcnQgY29uc3QgYW5hbFVzZXJBZ2VudCA9IGZ1bmN0aW9uKCl7XG4gICAgbGV0IHVua25vd24gPSAnLSc7XG5cbiAgICAvLyBzY3JlZW5cbiAgICBsZXQgc2NyZWVuU2l6ZSA9ICcnO1xuICAgIGlmIChzY3JlZW4ud2lkdGgpIHtcbiAgICAgICAgbGV0IHdpZHRoID0gKHNjcmVlbi53aWR0aCkgPyBzY3JlZW4ud2lkdGggOiAnJztcbiAgICAgICAgbGV0IGhlaWdodCA9IChzY3JlZW4uaGVpZ2h0KSA/IHNjcmVlbi5oZWlnaHQgOiAnJztcbiAgICAgICAgc2NyZWVuU2l6ZSArPSAnJyArIHdpZHRoICsgXCIgeCBcIiArIGhlaWdodDtcbiAgICB9XG5cbiAgICAvLyBicm93c2VyXG4gICAgbGV0IG5WZXIgPSBuYXZpZ2F0b3IuYXBwVmVyc2lvbjtcbiAgICBsZXQgbkFndCA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG4gICAgbGV0IGJyb3dzZXIgPSBuYXZpZ2F0b3IuYXBwTmFtZTtcbiAgICBsZXQgdmVyc2lvbiA9ICcnICsgcGFyc2VGbG9hdChuYXZpZ2F0b3IuYXBwVmVyc2lvbik7XG4gICAgbGV0IG1ham9yVmVyc2lvbiA9IHBhcnNlSW50KG5hdmlnYXRvci5hcHBWZXJzaW9uLCAxMCk7XG4gICAgbGV0IGlzV2VidmlldyA9IGZhbHNlO1xuICAgIGxldCBuYW1lT2Zmc2V0LCB2ZXJPZmZzZXQsIGl4O1xuXG4gICAgLy8gT3BlcmFcbiAgICBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignT3BlcmEnKSkgIT0gLTEpIHtcbiAgICAgICAgYnJvd3NlciA9ICdPcGVyYSc7XG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA2KTtcbiAgICAgICAgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ1ZlcnNpb24nKSkgIT0gLTEpIHtcbiAgICAgICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBPcGVyYSBOZXh0XG4gICAgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ09QUicpKSAhPSAtMSkge1xuICAgICAgICBicm93c2VyID0gJ09wZXJhJztcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDQpO1xuICAgIH1cbiAgICAvL+yCvOyEsSDruIzrnbzsmrDsoIBcbiAgICBlbHNlIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdTYW1zdW5nQnJvd3NlcicpKSAhPSAtMSkge1xuICAgICAgICBicm93c2VyID0gJ1NhbXN1bmdCcm93c2VyJztcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDE1KTtcbiAgICB9XG4gICAgLy8gRWRnZVxuICAgIGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ0VkZ2UnKSkgIT0gLTEpIHtcbiAgICAgICAgYnJvd3NlciA9ICdNaWNyb3NvZnQgRWRnZSc7XG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA1KTtcbiAgICB9XG4gICAgLy8gTVNJRVxuICAgIGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ01TSUUnKSkgIT0gLTEpIHtcbiAgICAgICAgYnJvd3NlciA9ICdNaWNyb3NvZnQgSW50ZXJuZXQgRXhwbG9yZXInO1xuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNSk7XG5cblxuICAgICAgICAvL3dpbjcgSUUxMSB1c2VyQWdlbnQgaXMgdWdseS4uLi5cbiAgICAgICAgaWYoIChuQWd0LmluZGV4T2YoJ1RyaWRlbnQvJykgIT09IC0xKSAmJiAobkFndC5pbmRleE9mKCdydjonKSAhPT0gLTEpICApe1xuICAgICAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKG5BZ3QuaW5kZXhPZigncnY6JykgKyAzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBDaHJvbWVcbiAgICBlbHNlIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdDaHJvbWUnKSkgIT0gLTEpIHtcbiAgICAgICAgYnJvd3NlciA9ICdDaHJvbWUnO1xuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ0NyaU9TJykpICE9IC0xKSB7ICAgLy9pcGhvbmUgLSBjaHJvbWVcbiAgICAgICAgYnJvd3NlciA9ICdDaHJvbWUnO1xuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNik7XG4gICAgfVxuICAgIC8vIEZpcmVmb3hcbiAgICBlbHNlIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdGaXJlZm94JykpICE9IC0xKSB7XG4gICAgICAgIGJyb3dzZXIgPSAnRmlyZWZveCc7XG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA4KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignRnhpT1MnKSkgIT0gLTEpIHtcbiAgICAgICAgYnJvd3NlciA9ICdGaXJlZm94JztcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDYpO1xuICAgIH1cbiAgICAvLyBTYWZhcmlcbiAgICBlbHNlIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdTYWZhcmknKSkgIT0gLTEpIHtcbiAgICAgICAgYnJvd3NlciA9ICdTYWZhcmknO1xuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNyk7XG4gICAgICAgIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdWZXJzaW9uJykpICE9IC0xKSB7XG4gICAgICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgOCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vIE1TSUUgMTErXG4gICAgZWxzZSBpZiAobkFndC5pbmRleE9mKCdUcmlkZW50LycpICE9PSAtMSkge1xuICAgICAgICBicm93c2VyID0gJ01pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3Jlcic7XG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyhuQWd0LmluZGV4T2YoJ3J2OicpICsgMyk7XG4gICAgfVxuICAgIC8vIE90aGVyIGJyb3dzZXJzXG4gICAgZWxzZSBpZiAoKG5hbWVPZmZzZXQgPSBuQWd0Lmxhc3RJbmRleE9mKCcgJykgKyAxKSA8ICh2ZXJPZmZzZXQgPSBuQWd0Lmxhc3RJbmRleE9mKCcvJykpKSB7XG4gICAgICAgIGJyb3dzZXIgPSBuQWd0LnN1YnN0cmluZyhuYW1lT2Zmc2V0LCB2ZXJPZmZzZXQpO1xuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgMSk7XG4gICAgICAgIGlmIChicm93c2VyLnRvTG93ZXJDYXNlKCkgPT0gYnJvd3Nlci50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICAgICAgICBicm93c2VyID0gbmF2aWdhdG9yLmFwcE5hbWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYobkFndC5pbmRleE9mKCcgd3YnKSA+IDApe1xuICAgICAgICBpc1dlYnZpZXcgPSB0cnVlO1xuICAgIH1cbiAgICAvLyB0cmltIHRoZSB2ZXJzaW9uIHN0cmluZ1xuICAgIGlmICgoaXggPSB2ZXJzaW9uLmluZGV4T2YoJzsnKSkgIT0gLTEpIHZlcnNpb24gPSB2ZXJzaW9uLnN1YnN0cmluZygwLCBpeCk7XG4gICAgaWYgKChpeCA9IHZlcnNpb24uaW5kZXhPZignICcpKSAhPSAtMSkgdmVyc2lvbiA9IHZlcnNpb24uc3Vic3RyaW5nKDAsIGl4KTtcbiAgICBpZiAoKGl4ID0gdmVyc2lvbi5pbmRleE9mKCcpJykpICE9IC0xKSB2ZXJzaW9uID0gdmVyc2lvbi5zdWJzdHJpbmcoMCwgaXgpO1xuXG4gICAgbWFqb3JWZXJzaW9uID0gcGFyc2VJbnQoJycgKyB2ZXJzaW9uLCAxMCk7XG4gICAgaWYgKGlzTmFOKG1ham9yVmVyc2lvbikpIHtcbiAgICAgICAgdmVyc2lvbiA9ICcnICsgcGFyc2VGbG9hdChuYXZpZ2F0b3IuYXBwVmVyc2lvbik7XG4gICAgICAgIG1ham9yVmVyc2lvbiA9IHBhcnNlSW50KG5hdmlnYXRvci5hcHBWZXJzaW9uLCAxMCk7XG4gICAgfVxuXG4gICAgLy8gbW9iaWxlIHZlcnNpb25cbiAgICB2YXIgbW9iaWxlID0gL01vYmlsZXxtaW5pfEZlbm5lY3xBbmRyb2lkfGlQKGFkfG9kfGhvbmUpLy50ZXN0KG5WZXIpO1xuXG4gICAgLy8gY29va2llXG4gICAgdmFyIGNvb2tpZUVuYWJsZWQgPSAobmF2aWdhdG9yLmNvb2tpZUVuYWJsZWQpID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IuY29va2llRW5hYmxlZCA9PSAndW5kZWZpbmVkJyAmJiAhY29va2llRW5hYmxlZCkge1xuICAgICAgICBkb2N1bWVudC5jb29raWUgPSAndGVzdGNvb2tpZSc7XG4gICAgICAgIGNvb2tpZUVuYWJsZWQgPSAoZG9jdW1lbnQuY29va2llLmluZGV4T2YoJ3Rlc3Rjb29raWUnKSAhPSAtMSkgPyB0cnVlIDogZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gc3lzdGVtXG4gICAgdmFyIG9zID0gdW5rbm93bjtcbiAgICB2YXIgY2xpZW50U3RyaW5ncyA9IFtcbiAgICAgICAge3M6J1dpbmRvd3MgMTAnLCByOi8oV2luZG93cyAxMC4wfFdpbmRvd3MgTlQgMTAuMCkvfSxcbiAgICAgICAge3M6J1dpbmRvd3MgOC4xJywgcjovKFdpbmRvd3MgOC4xfFdpbmRvd3MgTlQgNi4zKS99LFxuICAgICAgICB7czonV2luZG93cyA4JywgcjovKFdpbmRvd3MgOHxXaW5kb3dzIE5UIDYuMikvfSxcbiAgICAgICAge3M6J1dpbmRvd3MgNycsIHI6LyhXaW5kb3dzIDd8V2luZG93cyBOVCA2LjEpL30sXG4gICAgICAgIHtzOidXaW5kb3dzIFZpc3RhJywgcjovV2luZG93cyBOVCA2LjAvfSxcbiAgICAgICAge3M6J1dpbmRvd3MgU2VydmVyIDIwMDMnLCByOi9XaW5kb3dzIE5UIDUuMi99LFxuICAgICAgICB7czonV2luZG93cyBYUCcsIHI6LyhXaW5kb3dzIE5UIDUuMXxXaW5kb3dzIFhQKS99LFxuICAgICAgICB7czonV2luZG93cyAyMDAwJywgcjovKFdpbmRvd3MgTlQgNS4wfFdpbmRvd3MgMjAwMCkvfSxcbiAgICAgICAge3M6J1dpbmRvd3MgTUUnLCByOi8oV2luIDl4IDQuOTB8V2luZG93cyBNRSkvfSxcbiAgICAgICAge3M6J1dpbmRvd3MgOTgnLCByOi8oV2luZG93cyA5OHxXaW45OCkvfSxcbiAgICAgICAge3M6J1dpbmRvd3MgOTUnLCByOi8oV2luZG93cyA5NXxXaW45NXxXaW5kb3dzXzk1KS99LFxuICAgICAgICB7czonV2luZG93cyBOVCA0LjAnLCByOi8oV2luZG93cyBOVCA0LjB8V2luTlQ0LjB8V2luTlR8V2luZG93cyBOVCkvfSxcbiAgICAgICAge3M6J1dpbmRvd3MgQ0UnLCByOi9XaW5kb3dzIENFL30sXG4gICAgICAgIHtzOidXaW5kb3dzIDMuMTEnLCByOi9XaW4xNi99LFxuICAgICAgICB7czonQW5kcm9pZCcsIHI6L0FuZHJvaWQvfSxcbiAgICAgICAge3M6J09wZW4gQlNEJywgcjovT3BlbkJTRC99LFxuICAgICAgICB7czonU3VuIE9TJywgcjovU3VuT1MvfSxcbiAgICAgICAge3M6J0xpbnV4JywgcjovKExpbnV4fFgxMSkvfSxcbiAgICAgICAge3M6J2lPUycsIHI6LyhpUGhvbmV8aVBhZHxpUG9kKS99LFxuICAgICAgICB7czonTWFjIE9TIFgnLCByOi9NYWMgT1MgWC99LFxuICAgICAgICB7czonTWFjIE9TJywgcjovKE1hY1BQQ3xNYWNJbnRlbHxNYWNfUG93ZXJQQ3xNYWNpbnRvc2gpL30sXG4gICAgICAgIHtzOidRTlgnLCByOi9RTlgvfSxcbiAgICAgICAge3M6J1VOSVgnLCByOi9VTklYL30sXG4gICAgICAgIHtzOidCZU9TJywgcjovQmVPUy99LFxuICAgICAgICB7czonT1MvMicsIHI6L09TXFwvMi99LFxuICAgICAgICB7czonU2VhcmNoIEJvdCcsIHI6LyhudWhrfEdvb2dsZWJvdHxZYW1teWJvdHxPcGVuYm90fFNsdXJwfE1TTkJvdHxBc2sgSmVldmVzXFwvVGVvbWF8aWFfYXJjaGl2ZXIpL31cbiAgICBdO1xuICAgIGZvciAodmFyIGlkIGluIGNsaWVudFN0cmluZ3MpIHtcbiAgICAgICAgdmFyIGNzID0gY2xpZW50U3RyaW5nc1tpZF07XG4gICAgICAgIGlmIChjcy5yLnRlc3QobkFndCkpIHtcbiAgICAgICAgICAgIG9zID0gY3MucztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIG9zVmVyc2lvbiA9IHVua25vd247XG5cbiAgICBpZiAoL1dpbmRvd3MvLnRlc3Qob3MpKSB7XG4gICAgICAgIG9zVmVyc2lvbiA9IC9XaW5kb3dzICguKikvLmV4ZWMob3MpWzFdO1xuICAgICAgICBvcyA9ICdXaW5kb3dzJztcbiAgICB9XG5cbiAgICBzd2l0Y2ggKG9zKSB7XG4gICAgICAgIGNhc2UgJ01hYyBPUyBYJzpcbiAgICAgICAgICAgIG9zVmVyc2lvbiA9IC9NYWMgT1MgWCAoMTBbXFwuXFxfXFxkXSspLy5leGVjKG5BZ3QpWzFdO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnQW5kcm9pZCc6XG4gICAgICAgICAgICBvc1ZlcnNpb24gPSAvQW5kcm9pZCAoW1xcLlxcX1xcZF0rKS8uZXhlYyhuQWd0KVsxXTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ2lPUyc6XG4gICAgICAgICAgICBvc1ZlcnNpb24gPSAvT1MgKFxcZCspXyhcXGQrKV8/KFxcZCspPy8uZXhlYyhuVmVyKTtcbiAgICAgICAgICAgIG9zVmVyc2lvbiA9IG9zVmVyc2lvblsxXSArICcuJyArIG9zVmVyc2lvblsyXSArICcuJyArIChvc1ZlcnNpb25bM10gfCAwKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHNjcmVlbjogc2NyZWVuU2l6ZSxcbiAgICAgICAgYnJvd3NlcjogYnJvd3NlcixcbiAgICAgICAgYnJvd3NlclZlcnNpb246IHZlcnNpb24sXG4gICAgICAgIGJyb3dzZXJNYWpvclZlcnNpb246IG1ham9yVmVyc2lvbixcbiAgICAgICAgbW9iaWxlOiBtb2JpbGUsXG4gICAgICAgIHVhIDogbkFndCxcbiAgICAgICAgb3M6IG9zLFxuICAgICAgICBvc1ZlcnNpb246IG9zVmVyc2lvbixcbiAgICAgICAgY29va2llczogY29va2llRW5hYmxlZFxuICAgIH07XG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMyB2dHQuanMgQ29udHJpYnV0b3JzXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xubGV0IFZUVEN1ZSA9IHdpbmRvdy5WVFRDdWU7XG5cbnZhciBhdXRvS2V5d29yZCA9IFwiYXV0b1wiO1xudmFyIGRpcmVjdGlvblNldHRpbmcgPSB7XG4gICAgXCJcIjogdHJ1ZSxcbiAgICBcImxyXCI6IHRydWUsXG4gICAgXCJybFwiOiB0cnVlXG59O1xudmFyIGFsaWduU2V0dGluZyA9IHtcbiAgICBcInN0YXJ0XCI6IHRydWUsXG4gICAgXCJtaWRkbGVcIjogdHJ1ZSxcbiAgICBcImVuZFwiOiB0cnVlLFxuICAgIFwibGVmdFwiOiB0cnVlLFxuICAgIFwicmlnaHRcIjogdHJ1ZVxufTtcblxuZnVuY3Rpb24gZmluZERpcmVjdGlvblNldHRpbmcodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIGRpciA9IGRpcmVjdGlvblNldHRpbmdbdmFsdWUudG9Mb3dlckNhc2UoKV07XG4gICAgcmV0dXJuIGRpciA/IHZhbHVlLnRvTG93ZXJDYXNlKCkgOiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZmluZEFsaWduU2V0dGluZyh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgYWxpZ24gPSBhbGlnblNldHRpbmdbdmFsdWUudG9Mb3dlckNhc2UoKV07XG4gICAgcmV0dXJuIGFsaWduID8gdmFsdWUudG9Mb3dlckNhc2UoKSA6IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBleHRlbmQob2JqKSB7XG4gICAgdmFyIGkgPSAxO1xuICAgIGZvciAoOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjb2JqID0gYXJndW1lbnRzW2ldO1xuICAgICAgICBmb3IgKHZhciBwIGluIGNvYmopIHtcbiAgICAgICAgICAgIG9ialtwXSA9IGNvYmpbcF07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xufVxuaWYoIVZUVEN1ZSl7XG4gICAgVlRUQ3VlID0gZnVuY3Rpb24gKHN0YXJ0VGltZSwgZW5kVGltZSwgdGV4dCkge1xuICAgICAgICB2YXIgY3VlID0gdGhpcztcbiAgICAgICAgdmFyIGlzSUU4ID0gKC9NU0lFXFxzOFxcLjAvKS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgICAgICB2YXIgYmFzZU9iaiA9IHt9O1xuXG4gICAgICAgIGlmIChpc0lFOCkge1xuICAgICAgICAgICAgY3VlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY3VzdG9tJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBiYXNlT2JqLmVudW1lcmFibGUgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNoaW0gaW1wbGVtZW50YXRpb24gc3BlY2lmaWMgcHJvcGVydGllcy4gVGhlc2UgcHJvcGVydGllcyBhcmUgbm90IGluXG4gICAgICAgICAqIHRoZSBzcGVjLlxuICAgICAgICAgKi9cblxuICAgICAgICAgICAgLy8gTGV0cyB1cyBrbm93IHdoZW4gdGhlIFZUVEN1ZSdzIGRhdGEgaGFzIGNoYW5nZWQgaW4gc3VjaCBhIHdheSB0aGF0IHdlIG5lZWRcbiAgICAgICAgICAgIC8vIHRvIHJlY29tcHV0ZSBpdHMgZGlzcGxheSBzdGF0ZS4gVGhpcyBsZXRzIHVzIGNvbXB1dGUgaXRzIGRpc3BsYXkgc3RhdGVcbiAgICAgICAgICAgIC8vIGxhemlseS5cbiAgICAgICAgY3VlLmhhc0JlZW5SZXNldCA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBWVFRDdWUgYW5kIFRleHRUcmFja0N1ZSBwcm9wZXJ0aWVzXG4gICAgICAgICAqIGh0dHA6Ly9kZXYudzMub3JnL2h0bWw1L3dlYnZ0dC8jdnR0Y3VlLWludGVyZmFjZVxuICAgICAgICAgKi9cblxuICAgICAgICB2YXIgX2lkID0gXCJcIjtcbiAgICAgICAgdmFyIF9wYXVzZU9uRXhpdCA9IGZhbHNlO1xuICAgICAgICB2YXIgX3N0YXJ0VGltZSA9IHN0YXJ0VGltZTtcbiAgICAgICAgdmFyIF9lbmRUaW1lID0gZW5kVGltZTtcbiAgICAgICAgdmFyIF90ZXh0ID0gdGV4dDtcbiAgICAgICAgdmFyIF9yZWdpb24gPSBudWxsO1xuICAgICAgICB2YXIgX3ZlcnRpY2FsID0gXCJcIjtcbiAgICAgICAgdmFyIF9zbmFwVG9MaW5lcyA9IHRydWU7XG4gICAgICAgIHZhciBfbGluZSA9IFwiYXV0b1wiO1xuICAgICAgICB2YXIgX2xpbmVBbGlnbiA9IFwic3RhcnRcIjtcbiAgICAgICAgdmFyIF9wb3NpdGlvbiA9IDUwO1xuICAgICAgICB2YXIgX3Bvc2l0aW9uQWxpZ24gPSBcIm1pZGRsZVwiO1xuICAgICAgICB2YXIgX3NpemUgPSA1MDtcbiAgICAgICAgdmFyIF9hbGlnbiA9IFwibWlkZGxlXCI7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcbiAgICAgICAgICAgIFwiaWRcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9pZDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgX2lkID0gXCJcIiArIHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxuICAgICAgICAgICAgXCJwYXVzZU9uRXhpdFwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3BhdXNlT25FeGl0O1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBfcGF1c2VPbkV4aXQgPSAhIXZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxuICAgICAgICAgICAgXCJzdGFydFRpbWVcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9zdGFydFRpbWU7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdGFydCB0aW1lIG11c3QgYmUgc2V0IHRvIGEgbnVtYmVyLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfc3RhcnRUaW1lID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcbiAgICAgICAgICAgIFwiZW5kVGltZVwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2VuZFRpbWU7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJFbmQgdGltZSBtdXN0IGJlIHNldCB0byBhIG51bWJlci5cIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgX2VuZFRpbWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxuICAgICAgICAgICAgXCJ0ZXh0XCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGV4dDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RleHQgPSBcIlwiICsgdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcbiAgICAgICAgICAgIFwicmVnaW9uXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVnaW9uO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBfcmVnaW9uID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcbiAgICAgICAgICAgIFwidmVydGljYWxcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92ZXJ0aWNhbDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNldHRpbmcgPSBmaW5kRGlyZWN0aW9uU2V0dGluZyh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIEhhdmUgdG8gY2hlY2sgZm9yIGZhbHNlIGJlY2F1c2UgdGhlIHNldHRpbmcgYW4gYmUgYW4gZW1wdHkgc3RyaW5nLlxuICAgICAgICAgICAgICAgICAgICBpZiAoc2V0dGluZyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihcIkFuIGludmFsaWQgb3IgaWxsZWdhbCBzdHJpbmcgd2FzIHNwZWNpZmllZC5cIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgX3ZlcnRpY2FsID0gc2V0dGluZztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxuICAgICAgICAgICAgXCJzbmFwVG9MaW5lc1wiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3NuYXBUb0xpbmVzO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBfc25hcFRvTGluZXMgPSAhIXZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXG4gICAgICAgICAgICBcImxpbmVcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9saW5lO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm51bWJlclwiICYmIHZhbHVlICE9PSBhdXRvS2V5d29yZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKFwiQW4gaW52YWxpZCBudW1iZXIgb3IgaWxsZWdhbCBzdHJpbmcgd2FzIHNwZWNpZmllZC5cIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgX2xpbmUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxuICAgICAgICAgICAgXCJsaW5lQWxpZ25cIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9saW5lQWxpZ247XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzZXR0aW5nID0gZmluZEFsaWduU2V0dGluZyh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghc2V0dGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKFwiQW4gaW52YWxpZCBvciBpbGxlZ2FsIHN0cmluZyB3YXMgc3BlY2lmaWVkLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfbGluZUFsaWduID0gc2V0dGluZztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxuICAgICAgICAgICAgXCJwb3NpdGlvblwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3Bvc2l0aW9uO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPCAwIHx8IHZhbHVlID4gMTAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQb3NpdGlvbiBtdXN0IGJlIGJldHdlZW4gMCBhbmQgMTAwLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfcG9zaXRpb24gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxuICAgICAgICAgICAgXCJwb3NpdGlvbkFsaWduXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcG9zaXRpb25BbGlnbjtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNldHRpbmcgPSBmaW5kQWxpZ25TZXR0aW5nKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzZXR0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJBbiBpbnZhbGlkIG9yIGlsbGVnYWwgc3RyaW5nIHdhcyBzcGVjaWZpZWQuXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF9wb3NpdGlvbkFsaWduID0gc2V0dGluZztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxuICAgICAgICAgICAgXCJzaXplXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfc2l6ZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlIDwgMCB8fCB2YWx1ZSA+IDEwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2l6ZSBtdXN0IGJlIGJldHdlZW4gMCBhbmQgMTAwLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfc2l6ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXG4gICAgICAgICAgICBcImFsaWduXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfYWxpZ247XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzZXR0aW5nID0gZmluZEFsaWduU2V0dGluZyh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghc2V0dGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKFwiQW4gaW52YWxpZCBvciBpbGxlZ2FsIHN0cmluZyB3YXMgc3BlY2lmaWVkLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfYWxpZ24gPSBzZXR0aW5nO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBPdGhlciA8dHJhY2s+IHNwZWMgZGVmaW5lZCBwcm9wZXJ0aWVzXG4gICAgICAgICAqL1xuXG4gICAgICAgICAgICAvLyBodHRwOi8vd3d3LndoYXR3Zy5vcmcvc3BlY3Mvd2ViLWFwcHMvY3VycmVudC13b3JrL211bHRpcGFnZS90aGUtdmlkZW8tZWxlbWVudC5odG1sI3RleHQtdHJhY2stY3VlLWRpc3BsYXktc3RhdGVcbiAgICAgICAgY3VlLmRpc3BsYXlTdGF0ZSA9IHVuZGVmaW5lZDtcblxuICAgICAgICBpZiAoaXNJRTgpIHtcbiAgICAgICAgICAgIHJldHVybiBjdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBWVFRDdWUgbWV0aG9kc1xuICAgICAqL1xuXG4gICAgVlRUQ3VlLnByb3RvdHlwZS5nZXRDdWVBc0hUTUwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gQXNzdW1lIFdlYlZUVC5jb252ZXJ0Q3VlVG9ET01UcmVlIGlzIG9uIHRoZSBnbG9iYWwuXG4gICAgICAgIHJldHVybiBXZWJWVFQuY29udmVydEN1ZVRvRE9NVHJlZSh3aW5kb3csIHRoaXMudGV4dCk7XG4gICAgfTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgVlRUQ3VlOyIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDIzLi5cbiAqL1xuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBJdCB3YXMgcmVwbGFjZSBqcXVlcnkncyBzZWxlY3Rvci4gSXQgT2Z0ZW4gdXNlZCBieSBPdmVuVGVtcGxhdGUuICgvdmlldy9lbmdpbmUvT3ZlblRlbXBsYXRlLmpzKVxuICogQHBhcmFtICAgc2VsZWN0b3JPckVsZW1lbnQgIHN0cmluZyBvciBlbGVtZW50XG4gKlxuICogKi9cblxuXG5jb25zdCBMYSQgPSBmdW5jdGlvbihzZWxlY3Rvck9yRWxlbWVudCl7XG4gICAgY29uc3QgdGhhdCA9IHt9O1xuICAgIGNvbnN0IHJldHVybk5vZGUgPSBmdW5jdGlvbigkZWxlbWVudCAsIHNlbGVjdG9yKXtcbiAgICAgICAgbGV0IG5vZGVMaXN0ID0gICRlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgICAgICBpZihub2RlTGlzdC5sZW5ndGggPiAxKXtcbiAgICAgICAgICAgIHJldHVybiBub2RlTGlzdDtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gbm9kZUxpc3RbMF07XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBsZXQgJGVsZW1lbnQgPSBcIlwiO1xuXG4gICAgaWYoIF8uaXNFbGVtZW50KHNlbGVjdG9yT3JFbGVtZW50KSB8fCBfLmV2ZXJ5KHNlbGVjdG9yT3JFbGVtZW50LCBmdW5jdGlvbihpdGVtKXtyZXR1cm4gXy5pc0VsZW1lbnQoaXRlbSl9KSl7XG4gICAgICAgICRlbGVtZW50ID0gc2VsZWN0b3JPckVsZW1lbnQ7XG4gICAgfWVsc2UgaWYoc2VsZWN0b3JPckVsZW1lbnQgPT09IFwiZG9jdW1lbnRcIil7XG4gICAgICAgICRlbGVtZW50ID0gZG9jdW1lbnQ7XG4gICAgfWVsc2UgaWYoc2VsZWN0b3JPckVsZW1lbnQgPT09IFwid2luZG93XCIpe1xuICAgICAgICAkZWxlbWVudCA9IHdpbmRvdztcbiAgICB9ZWxzZXtcbiAgICAgICAgJGVsZW1lbnQgPSByZXR1cm5Ob2RlKGRvY3VtZW50LCBzZWxlY3Rvck9yRWxlbWVudCk7XG4gICAgfVxuXG5cbiAgICBpZighJGVsZW1lbnQpe1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB0aGF0LmZpbmQgPSAoc2VsZWN0b3IpID0+e1xuICAgICAgICByZXR1cm4gTGEkKHJldHVybk5vZGUoJGVsZW1lbnQsIHNlbGVjdG9yKSk7XG4gICAgfTtcblxuICAgIHRoYXQuY3NzID0gKG5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICAgIGlmKHZhbHVlKXtcbiAgICAgICAgICAgIGlmKCRlbGVtZW50Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICRlbGVtZW50LmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCl7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGVbbmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuc3R5bGVbbmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gJGVsZW1lbnQuc3R5bGVbbmFtZV07XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICB0aGF0LmFkZENsYXNzID0gKG5hbWUpID0+e1xuICAgICAgICBpZigkZWxlbWVudC5jbGFzc0xpc3Qpe1xuICAgICAgICAgICAgJGVsZW1lbnQuY2xhc3NMaXN0LmFkZChuYW1lKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBsZXQgY2xhc3NOYW1lcyA9ICRlbGVtZW50LmNsYXNzTmFtZS5zcGxpdChcIiBcIik7XG4gICAgICAgICAgICBpZihjbGFzc05hbWVzLmluZGV4T2YobmFtZSkgPT09IC0xKXtcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5jbGFzc05hbWUgKz0gXCIgXCIgKyBuYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgdGhhdC5yZW1vdmVDbGFzcyA9IChuYW1lKSA9PntcbiAgICAgICAgaWYgKCRlbGVtZW50LmNsYXNzTGlzdCl7XG4gICAgICAgICAgICAkZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKG5hbWUpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTmFtZSA9ICRlbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAoJyhefFxcXFxiKScgKyBuYW1lLnNwbGl0KCcgJykuam9pbignfCcpICsgJyhcXFxcYnwkKScsICdnaScpLCAnICcpO1xuXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhhdC5yZW1vdmVBdHRyaWJ1dGUgPSAoYXR0ck5hbWUpID0+IHtcbiAgICAgICAgJGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKTtcbiAgICB9O1xuXG4gICAgdGhhdC5zaG93ID0gKCkgPT57XG4gICAgICAgICRlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH07XG5cbiAgICB0aGF0LmhpZGUgPSAoKSA9PntcbiAgICAgICAgJGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9O1xuXG4gICAgLyp0aGF0LmFwcGVuZCA9IChodG1sQ29kZSkgPT57XG4gICAgICAgICRlbGVtZW50LmlubmVySFRNTCArPSBodG1sQ29kZTtcbiAgICB9OyovXG5cbiAgICB0aGF0LnRleHQgPSAodGV4dCkgPT4geyAvL0lFOCtcbiAgICAgICAgaWYodGV4dCA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIHJldHVybiAkZWxlbWVudC50ZXh0Q29udGVudDtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAkZWxlbWVudC50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQuaHRtbCA9ICh0ZXh0KSA9PiB7XG4gICAgICAgICRlbGVtZW50LmlubmVySFRNTCA9IHRleHQ7XG4gICAgfTtcbiAgICB0aGF0Lmhhc0NsYXNzID0gKG5hbWUpID0+IHsgLy9JRTgrXG4gICAgICAgIGlmKCRlbGVtZW50LmNsYXNzTGlzdCl7XG4gICAgICAgICAgICByZXR1cm4gJGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKG5hbWUpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVnRXhwKCcoXnwgKScgKyBuYW1lICsgJyggfCQpJywgJ2dpJykudGVzdCgkZWxlbWVudC5uYW1lKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0LmlzID0gKCR0YXJnZXRFbGVtZW50KSA9PiB7XG4gICAgICAgIHJldHVybiAkZWxlbWVudCA9PT0gJHRhcmdldEVsZW1lbnQ7XG4gICAgfTtcblxuICAgIHRoYXQub2Zmc2V0ID0gKCkgPT57ICAgIC8vSUU4K1xuICAgICAgICB2YXIgcmVjdCA9ICRlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0b3A6IHJlY3QudG9wICsgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AsXG4gICAgICAgICAgICBsZWZ0OiByZWN0LmxlZnQgKyBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnRcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0LndpZHRoID0gKCkgPT4geyAgICAvL0lFOCtcbiAgICAgICAgcmV0dXJuICRlbGVtZW50LmNsaWVudFdpZHRoO1xuICAgIH07XG5cbiAgICB0aGF0LmhlaWdodCA9ICgpID0+IHsgICAvL0lFOCtcbiAgICAgICAgcmV0dXJuICRlbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICB9O1xuXG4gICAgdGhhdC5hdHRyID0gKGF0dHIpID0+IHtcbiAgICAgICAgcmV0dXJuICRlbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyKTtcbiAgICB9O1xuXG4gICAgdGhhdC5yZXBsYWNlID0gKGh0bWwpID0+IHtcbiAgICAgICAgJGVsZW1lbnQucmVwbGFjZVdpdGgoaHRtbCk7XG4gICAgfTtcblxuICAgIHRoYXQuYXBwZW5kID0gKGh0bWwpID0+IHtcbiAgICAgICAgJGVsZW1lbnQuYXBwZW5kQ2hpbGQoaHRtbCk7XG4gICAgfTtcblxuICAgIHRoYXQucmVtb3ZlID0gKCkgPT4ge1xuICAgICAgICBpZigkZWxlbWVudC5sZW5ndGggPiAxKXtcbiAgICAgICAgICAgICRlbGVtZW50LnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoJGVsZW1lbnQpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgdGhhdC5yZW1vdmVDaGlsZCA9IChlbGVtZW50KSA9PiB7XG4gICAgICAgIGlmKGVsZW1lbnQpe1xuICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgd2hpbGUgKCRlbGVtZW50Lmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZUNoaWxkKCRlbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgdGhhdC5nZXQgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiAkZWxlbWVudDtcbiAgICB9O1xuXG4gICAgdGhhdC5jbG9zZXN0ID0gKHNlbGVjdG9yU3RyaW5nKSA9PiB7XG4gICAgICAgIGxldCBjbG9zZXN0RWxlbWVudCA9ICRlbGVtZW50LmNsb3Nlc3Qoc2VsZWN0b3JTdHJpbmcpO1xuICAgICAgICBpZihjbG9zZXN0RWxlbWVudCl7XG4gICAgICAgICAgICByZXR1cm4gTGEkKGNsb3Nlc3RFbGVtZW50KTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IExhJDtcbiIsImltcG9ydCBfIGZyb20gJy4vdW5kZXJzY29yZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiB0cmltKHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcgPyBzdHJpbmcucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpIDogXCJcIjtcbn1cblxuLyoqXG4gKiBleHRyYWN0RXh0ZW5zaW9uXG4gKlxuICogQHBhcmFtICAgICAge3N0cmluZ30gcGF0aCBmb3IgdXJsXG4gKiBAcmV0dXJuICAgICB7c3RyaW5nfSAgRXh0ZW5zaW9uXG4gKi9cbmV4cG9ydCBjb25zdCBleHRyYWN0RXh0ZW5zaW9uID0gZnVuY3Rpb24ocGF0aCkge1xuICAgIGlmKCFwYXRoIHx8IHBhdGguc3Vic3RyKDAsNCk9PSdydG1wJykge1xuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0QXp1cmVGaWxlRm9ybWF0KHBhdGgpIHtcbiAgICAgICAgbGV0IGV4dGVuc2lvbiA9IFwiXCI7XG4gICAgICAgIGlmICgoL1soLF1mb3JtYXQ9bXBkLS9pKS50ZXN0KHBhdGgpKSB7XG4gICAgICAgICAgICBleHRlbnNpb24gPSAnbXBkJztcbiAgICAgICAgfWVsc2UgaWYgKCgvWygsXWZvcm1hdD1tM3U4LS9pKS50ZXN0KHBhdGgpKSB7XG4gICAgICAgICAgICBleHRlbnNpb24gPSAnbTN1OCc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV4dGVuc2lvbjtcbiAgICB9XG5cbiAgICBsZXQgYXp1cmVkRm9ybWF0ID0gZ2V0QXp1cmVGaWxlRm9ybWF0KHBhdGgpO1xuICAgIGlmKGF6dXJlZEZvcm1hdCkge1xuICAgICAgICByZXR1cm4gYXp1cmVkRm9ybWF0O1xuICAgIH1cbiAgICBwYXRoID0gcGF0aC5zcGxpdCgnPycpWzBdLnNwbGl0KCcjJylbMF07XG4gICAgaWYocGF0aC5sYXN0SW5kZXhPZignLicpID4gLTEpIHtcbiAgICAgICAgcmV0dXJuIHBhdGguc3Vic3RyKHBhdGgubGFzdEluZGV4T2YoJy4nKSArIDEsIHBhdGgubGVuZ3RoKS50b0xvd2VyQ2FzZSgpO1xuICAgIH1lbHNle1xuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG59O1xuXG5cbi8qKlxuICogbmF0dXJhbEhtc1xuICpcbiAqIEBwYXJhbSAgICAgIHtudW1iZXIgfCBzdHJpbmd9ICBzZWNvbmQgIFRoZSBzZWNvbmRcbiAqIEByZXR1cm4gICAgIHtzdHJpbmd9ICBmb3JtYXR0ZWQgU3RyaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBuYXR1cmFsSG1zKHNlY29uZCkge1xuICAgIGxldCBzZWNOdW0gPSBwYXJzZUludChzZWNvbmQsIDEwKTtcbiAgICBpZighc2Vjb25kKXtcbiAgICAgICAgcmV0dXJuIFwiMDA6MDBcIjtcbiAgICB9XG4gICAgbGV0IGhvdXJzICAgPSBNYXRoLmZsb29yKHNlY051bSAvIDM2MDApO1xuICAgIGxldCBtaW51dGVzID0gTWF0aC5mbG9vcigoc2VjTnVtIC0gKGhvdXJzICogMzYwMCkpIC8gNjApO1xuICAgIGxldCBzZWNvbmRzID0gc2VjTnVtIC0gKGhvdXJzICogMzYwMCkgLSAobWludXRlcyAqIDYwKTtcblxuICAgIC8vaWYgKGhvdXJzID4gMCkge21pbnV0ZXMgPSBcIjBcIittaW51dGVzO31cbiAgICBpZiAobWludXRlcyA8IDEwKSB7bWludXRlcyA9IFwiMFwiK21pbnV0ZXM7fVxuICAgIGlmIChzZWNvbmRzIDwgMTApIHtzZWNvbmRzID0gXCIwXCIrc2Vjb25kczt9XG5cbiAgICBpZiAoaG91cnMgPiAwKSB7XG4gICAgICAgIHJldHVybiBob3VycysnOicrbWludXRlcysnOicrc2Vjb25kcztcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbWludXRlcysnOicrc2Vjb25kcztcbiAgICB9XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGhtc1RvU2Vjb25kKHN0ciwgZnJhbWVSYXRlKSB7XG4gICAgaWYoIXN0cikge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgaWYoXy5pc051bWJlcihzdHIpICYmICFfLmlzTmFOKHN0cikpe1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgICBzdHIgPSBzdHIucmVwbGFjZSgnLCcsICcuJyk7XG4gICAgbGV0IGFyciA9IHN0ci5zcGxpdCgnOicpO1xuICAgIGxldCBhcnJMZW5ndGggPSBhcnIubGVuZ3RoO1xuICAgIGxldCBzZWMgPSAwO1xuICAgIGlmIChzdHIuc2xpY2UoLTEpID09PSAncycpe1xuICAgICAgICBzZWMgPSBwYXJzZUZsb2F0KHN0cik7XG4gICAgfWVsc2UgaWYgKHN0ci5zbGljZSgtMSkgPT09ICdtJyl7XG4gICAgICAgIHNlYyA9IHBhcnNlRmxvYXQoc3RyKSAqIDYwO1xuICAgIH1lbHNlIGlmIChzdHIuc2xpY2UoLTEpID09PSAnaCcpe1xuICAgICAgICBzZWMgPSBwYXJzZUZsb2F0KHN0cikgKiAzNjAwO1xuICAgIH1lbHNlIGlmIChhcnJMZW5ndGggPiAxKSB7XG4gICAgICAgIHZhciBzZWNJbmRleCA9IGFyckxlbmd0aCAtIDE7XG4gICAgICAgIGlmIChhcnJMZW5ndGggPT09IDQpIHtcbiAgICAgICAgICAgIGlmIChmcmFtZVJhdGUpIHtcbiAgICAgICAgICAgICAgICBzZWMgPSBwYXJzZUZsb2F0KGFycltzZWNJbmRleF0pIC8gZnJhbWVSYXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VjSW5kZXggLT0gMTtcbiAgICAgICAgfVxuICAgICAgICBzZWMgKz0gcGFyc2VGbG9hdChhcnJbc2VjSW5kZXhdKTtcbiAgICAgICAgc2VjICs9IHBhcnNlRmxvYXQoYXJyW3NlY0luZGV4IC0gMV0pICogNjA7XG4gICAgICAgIGlmIChhcnJMZW5ndGggPj0gMykge1xuICAgICAgICAgICAgc2VjICs9IHBhcnNlRmxvYXQoYXJyW3NlY0luZGV4IC0gMl0pICogMzYwMDtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHNlYyA9IHBhcnNlRmxvYXQoc3RyKTtcbiAgICB9XG4gICAgaWYgKF8uaXNOYU4oc2VjKSkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgcmV0dXJuIHNlYztcbn0iLCIvLyAgICAgVW5kZXJzY29yZS5qcyAxLjkuMVxuLy8gICAgIGh0dHA6Ly91bmRlcnNjb3JlanMub3JnXG4vLyAgICAgKGMpIDIwMDktMjAxOCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuLy8gICAgIFVuZGVyc2NvcmUgbWF5IGJlIGZyZWVseSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4hZnVuY3Rpb24oKXt2YXIgbj1cIm9iamVjdFwiPT10eXBlb2Ygc2VsZiYmc2VsZi5zZWxmPT09c2VsZiYmc2VsZnx8XCJvYmplY3RcIj09dHlwZW9mIGdsb2JhbCYmZ2xvYmFsLmdsb2JhbD09PWdsb2JhbCYmZ2xvYmFsfHx0aGlzfHx7fSxyPW4uXyxlPUFycmF5LnByb3RvdHlwZSxvPU9iamVjdC5wcm90b3R5cGUscz1cInVuZGVmaW5lZFwiIT10eXBlb2YgU3ltYm9sP1N5bWJvbC5wcm90b3R5cGU6bnVsbCx1PWUucHVzaCxjPWUuc2xpY2UscD1vLnRvU3RyaW5nLGk9by5oYXNPd25Qcm9wZXJ0eSx0PUFycmF5LmlzQXJyYXksYT1PYmplY3Qua2V5cyxsPU9iamVjdC5jcmVhdGUsZj1mdW5jdGlvbigpe30saD1mdW5jdGlvbihuKXtyZXR1cm4gbiBpbnN0YW5jZW9mIGg/bjp0aGlzIGluc3RhbmNlb2YgaD92b2lkKHRoaXMuX3dyYXBwZWQ9bik6bmV3IGgobil9O1widW5kZWZpbmVkXCI9PXR5cGVvZiBleHBvcnRzfHxleHBvcnRzLm5vZGVUeXBlP24uXz1oOihcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlJiYhbW9kdWxlLm5vZGVUeXBlJiZtb2R1bGUuZXhwb3J0cyYmKGV4cG9ydHM9bW9kdWxlLmV4cG9ydHM9aCksZXhwb3J0cy5fPWgpLGguVkVSU0lPTj1cIjEuOS4xXCI7dmFyIHYseT1mdW5jdGlvbih1LGksbil7aWYodm9pZCAwPT09aSlyZXR1cm4gdTtzd2l0Y2gobnVsbD09bj8zOm4pe2Nhc2UgMTpyZXR1cm4gZnVuY3Rpb24obil7cmV0dXJuIHUuY2FsbChpLG4pfTtjYXNlIDM6cmV0dXJuIGZ1bmN0aW9uKG4scix0KXtyZXR1cm4gdS5jYWxsKGksbixyLHQpfTtjYXNlIDQ6cmV0dXJuIGZ1bmN0aW9uKG4scix0LGUpe3JldHVybiB1LmNhbGwoaSxuLHIsdCxlKX19cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIHUuYXBwbHkoaSxhcmd1bWVudHMpfX0sZD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGguaXRlcmF0ZWUhPT12P2guaXRlcmF0ZWUobixyKTpudWxsPT1uP2guaWRlbnRpdHk6aC5pc0Z1bmN0aW9uKG4pP3kobixyLHQpOmguaXNPYmplY3QobikmJiFoLmlzQXJyYXkobik/aC5tYXRjaGVyKG4pOmgucHJvcGVydHkobil9O2guaXRlcmF0ZWU9dj1mdW5jdGlvbihuLHIpe3JldHVybiBkKG4sciwxLzApfTt2YXIgZz1mdW5jdGlvbih1LGkpe3JldHVybiBpPW51bGw9PWk/dS5sZW5ndGgtMToraSxmdW5jdGlvbigpe2Zvcih2YXIgbj1NYXRoLm1heChhcmd1bWVudHMubGVuZ3RoLWksMCkscj1BcnJheShuKSx0PTA7dDxuO3QrKylyW3RdPWFyZ3VtZW50c1t0K2ldO3N3aXRjaChpKXtjYXNlIDA6cmV0dXJuIHUuY2FsbCh0aGlzLHIpO2Nhc2UgMTpyZXR1cm4gdS5jYWxsKHRoaXMsYXJndW1lbnRzWzBdLHIpO2Nhc2UgMjpyZXR1cm4gdS5jYWxsKHRoaXMsYXJndW1lbnRzWzBdLGFyZ3VtZW50c1sxXSxyKX12YXIgZT1BcnJheShpKzEpO2Zvcih0PTA7dDxpO3QrKyllW3RdPWFyZ3VtZW50c1t0XTtyZXR1cm4gZVtpXT1yLHUuYXBwbHkodGhpcyxlKX19LG09ZnVuY3Rpb24obil7aWYoIWguaXNPYmplY3QobikpcmV0dXJue307aWYobClyZXR1cm4gbChuKTtmLnByb3RvdHlwZT1uO3ZhciByPW5ldyBmO3JldHVybiBmLnByb3RvdHlwZT1udWxsLHJ9LGI9ZnVuY3Rpb24ocil7cmV0dXJuIGZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT1uP3ZvaWQgMDpuW3JdfX0saj1mdW5jdGlvbihuLHIpe3JldHVybiBudWxsIT1uJiZpLmNhbGwobixyKX0seD1mdW5jdGlvbihuLHIpe2Zvcih2YXIgdD1yLmxlbmd0aCxlPTA7ZTx0O2UrKyl7aWYobnVsbD09bilyZXR1cm47bj1uW3JbZV1dfXJldHVybiB0P246dm9pZCAwfSxfPU1hdGgucG93KDIsNTMpLTEsQT1iKFwibGVuZ3RoXCIpLHc9ZnVuY3Rpb24obil7dmFyIHI9QShuKTtyZXR1cm5cIm51bWJlclwiPT10eXBlb2YgciYmMDw9ciYmcjw9X307aC5lYWNoPWguZm9yRWFjaD1mdW5jdGlvbihuLHIsdCl7dmFyIGUsdTtpZihyPXkocix0KSx3KG4pKWZvcihlPTAsdT1uLmxlbmd0aDtlPHU7ZSsrKXIobltlXSxlLG4pO2Vsc2V7dmFyIGk9aC5rZXlzKG4pO2ZvcihlPTAsdT1pLmxlbmd0aDtlPHU7ZSsrKXIobltpW2VdXSxpW2VdLG4pfXJldHVybiBufSxoLm1hcD1oLmNvbGxlY3Q9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT0hdyhuKSYmaC5rZXlzKG4pLHU9KGV8fG4pLmxlbmd0aCxpPUFycmF5KHUpLG89MDtvPHU7bysrKXt2YXIgYT1lP2Vbb106bztpW29dPXIoblthXSxhLG4pfXJldHVybiBpfTt2YXIgTz1mdW5jdGlvbihjKXtyZXR1cm4gZnVuY3Rpb24obixyLHQsZSl7dmFyIHU9Mzw9YXJndW1lbnRzLmxlbmd0aDtyZXR1cm4gZnVuY3Rpb24obixyLHQsZSl7dmFyIHU9IXcobikmJmgua2V5cyhuKSxpPSh1fHxuKS5sZW5ndGgsbz0wPGM/MDppLTE7Zm9yKGV8fCh0PW5bdT91W29dOm9dLG8rPWMpOzA8PW8mJm88aTtvKz1jKXt2YXIgYT11P3Vbb106bzt0PXIodCxuW2FdLGEsbil9cmV0dXJuIHR9KG4seShyLGUsNCksdCx1KX19O2gucmVkdWNlPWguZm9sZGw9aC5pbmplY3Q9TygxKSxoLnJlZHVjZVJpZ2h0PWguZm9sZHI9TygtMSksaC5maW5kPWguZGV0ZWN0PWZ1bmN0aW9uKG4scix0KXt2YXIgZT0odyhuKT9oLmZpbmRJbmRleDpoLmZpbmRLZXkpKG4scix0KTtpZih2b2lkIDAhPT1lJiYtMSE9PWUpcmV0dXJuIG5bZV19LGguZmlsdGVyPWguc2VsZWN0PWZ1bmN0aW9uKG4sZSxyKXt2YXIgdT1bXTtyZXR1cm4gZT1kKGUsciksaC5lYWNoKG4sZnVuY3Rpb24obixyLHQpe2UobixyLHQpJiZ1LnB1c2gobil9KSx1fSxoLnJlamVjdD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGguZmlsdGVyKG4saC5uZWdhdGUoZChyKSksdCl9LGguZXZlcnk9aC5hbGw9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT0hdyhuKSYmaC5rZXlzKG4pLHU9KGV8fG4pLmxlbmd0aCxpPTA7aTx1O2krKyl7dmFyIG89ZT9lW2ldOmk7aWYoIXIobltvXSxvLG4pKXJldHVybiExfXJldHVybiEwfSxoLnNvbWU9aC5hbnk9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT0hdyhuKSYmaC5rZXlzKG4pLHU9KGV8fG4pLmxlbmd0aCxpPTA7aTx1O2krKyl7dmFyIG89ZT9lW2ldOmk7aWYocihuW29dLG8sbikpcmV0dXJuITB9cmV0dXJuITF9LGguY29udGFpbnM9aC5pbmNsdWRlcz1oLmluY2x1ZGU9ZnVuY3Rpb24obixyLHQsZSl7cmV0dXJuIHcobil8fChuPWgudmFsdWVzKG4pKSwoXCJudW1iZXJcIiE9dHlwZW9mIHR8fGUpJiYodD0wKSwwPD1oLmluZGV4T2YobixyLHQpfSxoLmludm9rZT1nKGZ1bmN0aW9uKG4sdCxlKXt2YXIgdSxpO3JldHVybiBoLmlzRnVuY3Rpb24odCk/aT10OmguaXNBcnJheSh0KSYmKHU9dC5zbGljZSgwLC0xKSx0PXRbdC5sZW5ndGgtMV0pLGgubWFwKG4sZnVuY3Rpb24obil7dmFyIHI9aTtpZighcil7aWYodSYmdS5sZW5ndGgmJihuPXgobix1KSksbnVsbD09bilyZXR1cm47cj1uW3RdfXJldHVybiBudWxsPT1yP3I6ci5hcHBseShuLGUpfSl9KSxoLnBsdWNrPWZ1bmN0aW9uKG4scil7cmV0dXJuIGgubWFwKG4saC5wcm9wZXJ0eShyKSl9LGgud2hlcmU9ZnVuY3Rpb24obixyKXtyZXR1cm4gaC5maWx0ZXIobixoLm1hdGNoZXIocikpfSxoLmZpbmRXaGVyZT1mdW5jdGlvbihuLHIpe3JldHVybiBoLmZpbmQobixoLm1hdGNoZXIocikpfSxoLm1heD1mdW5jdGlvbihuLGUscil7dmFyIHQsdSxpPS0xLzAsbz0tMS8wO2lmKG51bGw9PWV8fFwibnVtYmVyXCI9PXR5cGVvZiBlJiZcIm9iamVjdFwiIT10eXBlb2YgblswXSYmbnVsbCE9bilmb3IodmFyIGE9MCxjPShuPXcobik/bjpoLnZhbHVlcyhuKSkubGVuZ3RoO2E8YzthKyspbnVsbCE9KHQ9blthXSkmJmk8dCYmKGk9dCk7ZWxzZSBlPWQoZSxyKSxoLmVhY2gobixmdW5jdGlvbihuLHIsdCl7dT1lKG4scix0KSwobzx1fHx1PT09LTEvMCYmaT09PS0xLzApJiYoaT1uLG89dSl9KTtyZXR1cm4gaX0saC5taW49ZnVuY3Rpb24obixlLHIpe3ZhciB0LHUsaT0xLzAsbz0xLzA7aWYobnVsbD09ZXx8XCJudW1iZXJcIj09dHlwZW9mIGUmJlwib2JqZWN0XCIhPXR5cGVvZiBuWzBdJiZudWxsIT1uKWZvcih2YXIgYT0wLGM9KG49dyhuKT9uOmgudmFsdWVzKG4pKS5sZW5ndGg7YTxjO2ErKyludWxsIT0odD1uW2FdKSYmdDxpJiYoaT10KTtlbHNlIGU9ZChlLHIpLGguZWFjaChuLGZ1bmN0aW9uKG4scix0KXsoKHU9ZShuLHIsdCkpPG98fHU9PT0xLzAmJmk9PT0xLzApJiYoaT1uLG89dSl9KTtyZXR1cm4gaX0saC5zaHVmZmxlPWZ1bmN0aW9uKG4pe3JldHVybiBoLnNhbXBsZShuLDEvMCl9LGguc2FtcGxlPWZ1bmN0aW9uKG4scix0KXtpZihudWxsPT1yfHx0KXJldHVybiB3KG4pfHwobj1oLnZhbHVlcyhuKSksbltoLnJhbmRvbShuLmxlbmd0aC0xKV07dmFyIGU9dyhuKT9oLmNsb25lKG4pOmgudmFsdWVzKG4pLHU9QShlKTtyPU1hdGgubWF4KE1hdGgubWluKHIsdSksMCk7Zm9yKHZhciBpPXUtMSxvPTA7bzxyO28rKyl7dmFyIGE9aC5yYW5kb20obyxpKSxjPWVbb107ZVtvXT1lW2FdLGVbYV09Y31yZXR1cm4gZS5zbGljZSgwLHIpfSxoLnNvcnRCeT1mdW5jdGlvbihuLGUscil7dmFyIHU9MDtyZXR1cm4gZT1kKGUsciksaC5wbHVjayhoLm1hcChuLGZ1bmN0aW9uKG4scix0KXtyZXR1cm57dmFsdWU6bixpbmRleDp1KyssY3JpdGVyaWE6ZShuLHIsdCl9fSkuc29ydChmdW5jdGlvbihuLHIpe3ZhciB0PW4uY3JpdGVyaWEsZT1yLmNyaXRlcmlhO2lmKHQhPT1lKXtpZihlPHR8fHZvaWQgMD09PXQpcmV0dXJuIDE7aWYodDxlfHx2b2lkIDA9PT1lKXJldHVybi0xfXJldHVybiBuLmluZGV4LXIuaW5kZXh9KSxcInZhbHVlXCIpfTt2YXIgaz1mdW5jdGlvbihvLHIpe3JldHVybiBmdW5jdGlvbihlLHUsbil7dmFyIGk9cj9bW10sW11dOnt9O3JldHVybiB1PWQodSxuKSxoLmVhY2goZSxmdW5jdGlvbihuLHIpe3ZhciB0PXUobixyLGUpO28oaSxuLHQpfSksaX19O2guZ3JvdXBCeT1rKGZ1bmN0aW9uKG4scix0KXtqKG4sdCk/blt0XS5wdXNoKHIpOm5bdF09W3JdfSksaC5pbmRleEJ5PWsoZnVuY3Rpb24obixyLHQpe25bdF09cn0pLGguY291bnRCeT1rKGZ1bmN0aW9uKG4scix0KXtqKG4sdCk/blt0XSsrOm5bdF09MX0pO3ZhciBTPS9bXlxcdWQ4MDAtXFx1ZGZmZl18W1xcdWQ4MDAtXFx1ZGJmZl1bXFx1ZGMwMC1cXHVkZmZmXXxbXFx1ZDgwMC1cXHVkZmZmXS9nO2gudG9BcnJheT1mdW5jdGlvbihuKXtyZXR1cm4gbj9oLmlzQXJyYXkobik/Yy5jYWxsKG4pOmguaXNTdHJpbmcobik/bi5tYXRjaChTKTp3KG4pP2gubWFwKG4saC5pZGVudGl0eSk6aC52YWx1ZXMobik6W119LGguc2l6ZT1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09bj8wOncobik/bi5sZW5ndGg6aC5rZXlzKG4pLmxlbmd0aH0saC5wYXJ0aXRpb249ayhmdW5jdGlvbihuLHIsdCl7blt0PzA6MV0ucHVzaChyKX0sITApLGguZmlyc3Q9aC5oZWFkPWgudGFrZT1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIG51bGw9PW58fG4ubGVuZ3RoPDE/bnVsbD09cj92b2lkIDA6W106bnVsbD09cnx8dD9uWzBdOmguaW5pdGlhbChuLG4ubGVuZ3RoLXIpfSxoLmluaXRpYWw9ZnVuY3Rpb24obixyLHQpe3JldHVybiBjLmNhbGwobiwwLE1hdGgubWF4KDAsbi5sZW5ndGgtKG51bGw9PXJ8fHQ/MTpyKSkpfSxoLmxhc3Q9ZnVuY3Rpb24obixyLHQpe3JldHVybiBudWxsPT1ufHxuLmxlbmd0aDwxP251bGw9PXI/dm9pZCAwOltdOm51bGw9PXJ8fHQ/bltuLmxlbmd0aC0xXTpoLnJlc3QobixNYXRoLm1heCgwLG4ubGVuZ3RoLXIpKX0saC5yZXN0PWgudGFpbD1oLmRyb3A9ZnVuY3Rpb24obixyLHQpe3JldHVybiBjLmNhbGwobixudWxsPT1yfHx0PzE6cil9LGguY29tcGFjdD1mdW5jdGlvbihuKXtyZXR1cm4gaC5maWx0ZXIobixCb29sZWFuKX07dmFyIE09ZnVuY3Rpb24obixyLHQsZSl7Zm9yKHZhciB1PShlPWV8fFtdKS5sZW5ndGgsaT0wLG89QShuKTtpPG87aSsrKXt2YXIgYT1uW2ldO2lmKHcoYSkmJihoLmlzQXJyYXkoYSl8fGguaXNBcmd1bWVudHMoYSkpKWlmKHIpZm9yKHZhciBjPTAsbD1hLmxlbmd0aDtjPGw7KWVbdSsrXT1hW2MrK107ZWxzZSBNKGEscix0LGUpLHU9ZS5sZW5ndGg7ZWxzZSB0fHwoZVt1KytdPWEpfXJldHVybiBlfTtoLmZsYXR0ZW49ZnVuY3Rpb24obixyKXtyZXR1cm4gTShuLHIsITEpfSxoLndpdGhvdXQ9ZyhmdW5jdGlvbihuLHIpe3JldHVybiBoLmRpZmZlcmVuY2UobixyKX0pLGgudW5pcT1oLnVuaXF1ZT1mdW5jdGlvbihuLHIsdCxlKXtoLmlzQm9vbGVhbihyKXx8KGU9dCx0PXIscj0hMSksbnVsbCE9dCYmKHQ9ZCh0LGUpKTtmb3IodmFyIHU9W10saT1bXSxvPTAsYT1BKG4pO288YTtvKyspe3ZhciBjPW5bb10sbD10P3QoYyxvLG4pOmM7ciYmIXQ/KG8mJmk9PT1sfHx1LnB1c2goYyksaT1sKTp0P2guY29udGFpbnMoaSxsKXx8KGkucHVzaChsKSx1LnB1c2goYykpOmguY29udGFpbnModSxjKXx8dS5wdXNoKGMpfXJldHVybiB1fSxoLnVuaW9uPWcoZnVuY3Rpb24obil7cmV0dXJuIGgudW5pcShNKG4sITAsITApKX0pLGguaW50ZXJzZWN0aW9uPWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj1bXSx0PWFyZ3VtZW50cy5sZW5ndGgsZT0wLHU9QShuKTtlPHU7ZSsrKXt2YXIgaT1uW2VdO2lmKCFoLmNvbnRhaW5zKHIsaSkpe3ZhciBvO2ZvcihvPTE7bzx0JiZoLmNvbnRhaW5zKGFyZ3VtZW50c1tvXSxpKTtvKyspO289PT10JiZyLnB1c2goaSl9fXJldHVybiByfSxoLmRpZmZlcmVuY2U9ZyhmdW5jdGlvbihuLHIpe3JldHVybiByPU0ociwhMCwhMCksaC5maWx0ZXIobixmdW5jdGlvbihuKXtyZXR1cm4haC5jb250YWlucyhyLG4pfSl9KSxoLnVuemlwPWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj1uJiZoLm1heChuLEEpLmxlbmd0aHx8MCx0PUFycmF5KHIpLGU9MDtlPHI7ZSsrKXRbZV09aC5wbHVjayhuLGUpO3JldHVybiB0fSxoLnppcD1nKGgudW56aXApLGgub2JqZWN0PWZ1bmN0aW9uKG4scil7Zm9yKHZhciB0PXt9LGU9MCx1PUEobik7ZTx1O2UrKylyP3RbbltlXV09cltlXTp0W25bZV1bMF1dPW5bZV1bMV07cmV0dXJuIHR9O3ZhciBGPWZ1bmN0aW9uKGkpe3JldHVybiBmdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPUEobiksdT0wPGk/MDplLTE7MDw9dSYmdTxlO3UrPWkpaWYocihuW3VdLHUsbikpcmV0dXJuIHU7cmV0dXJuLTF9fTtoLmZpbmRJbmRleD1GKDEpLGguZmluZExhc3RJbmRleD1GKC0xKSxoLnNvcnRlZEluZGV4PWZ1bmN0aW9uKG4scix0LGUpe2Zvcih2YXIgdT0odD1kKHQsZSwxKSkociksaT0wLG89QShuKTtpPG87KXt2YXIgYT1NYXRoLmZsb29yKChpK28pLzIpO3QoblthXSk8dT9pPWErMTpvPWF9cmV0dXJuIGl9O3ZhciBFPWZ1bmN0aW9uKGksbyxhKXtyZXR1cm4gZnVuY3Rpb24obixyLHQpe3ZhciBlPTAsdT1BKG4pO2lmKFwibnVtYmVyXCI9PXR5cGVvZiB0KTA8aT9lPTA8PXQ/dDpNYXRoLm1heCh0K3UsZSk6dT0wPD10P01hdGgubWluKHQrMSx1KTp0K3UrMTtlbHNlIGlmKGEmJnQmJnUpcmV0dXJuIG5bdD1hKG4scildPT09cj90Oi0xO2lmKHIhPXIpcmV0dXJuIDA8PSh0PW8oYy5jYWxsKG4sZSx1KSxoLmlzTmFOKSk/dCtlOi0xO2Zvcih0PTA8aT9lOnUtMTswPD10JiZ0PHU7dCs9aSlpZihuW3RdPT09cilyZXR1cm4gdDtyZXR1cm4tMX19O2guaW5kZXhPZj1FKDEsaC5maW5kSW5kZXgsaC5zb3J0ZWRJbmRleCksaC5sYXN0SW5kZXhPZj1FKC0xLGguZmluZExhc3RJbmRleCksaC5yYW5nZT1mdW5jdGlvbihuLHIsdCl7bnVsbD09ciYmKHI9bnx8MCxuPTApLHR8fCh0PXI8bj8tMToxKTtmb3IodmFyIGU9TWF0aC5tYXgoTWF0aC5jZWlsKChyLW4pL3QpLDApLHU9QXJyYXkoZSksaT0wO2k8ZTtpKyssbis9dCl1W2ldPW47cmV0dXJuIHV9LGguY2h1bms9ZnVuY3Rpb24obixyKXtpZihudWxsPT1yfHxyPDEpcmV0dXJuW107Zm9yKHZhciB0PVtdLGU9MCx1PW4ubGVuZ3RoO2U8dTspdC5wdXNoKGMuY2FsbChuLGUsZSs9cikpO3JldHVybiB0fTt2YXIgTj1mdW5jdGlvbihuLHIsdCxlLHUpe2lmKCEoZSBpbnN0YW5jZW9mIHIpKXJldHVybiBuLmFwcGx5KHQsdSk7dmFyIGk9bShuLnByb3RvdHlwZSksbz1uLmFwcGx5KGksdSk7cmV0dXJuIGguaXNPYmplY3Qobyk/bzppfTtoLmJpbmQ9ZyhmdW5jdGlvbihyLHQsZSl7aWYoIWguaXNGdW5jdGlvbihyKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiQmluZCBtdXN0IGJlIGNhbGxlZCBvbiBhIGZ1bmN0aW9uXCIpO3ZhciB1PWcoZnVuY3Rpb24obil7cmV0dXJuIE4ocix1LHQsdGhpcyxlLmNvbmNhdChuKSl9KTtyZXR1cm4gdX0pLGgucGFydGlhbD1nKGZ1bmN0aW9uKHUsaSl7dmFyIG89aC5wYXJ0aWFsLnBsYWNlaG9sZGVyLGE9ZnVuY3Rpb24oKXtmb3IodmFyIG49MCxyPWkubGVuZ3RoLHQ9QXJyYXkociksZT0wO2U8cjtlKyspdFtlXT1pW2VdPT09bz9hcmd1bWVudHNbbisrXTppW2VdO2Zvcig7bjxhcmd1bWVudHMubGVuZ3RoOyl0LnB1c2goYXJndW1lbnRzW24rK10pO3JldHVybiBOKHUsYSx0aGlzLHRoaXMsdCl9O3JldHVybiBhfSksKGgucGFydGlhbC5wbGFjZWhvbGRlcj1oKS5iaW5kQWxsPWcoZnVuY3Rpb24obixyKXt2YXIgdD0ocj1NKHIsITEsITEpKS5sZW5ndGg7aWYodDwxKXRocm93IG5ldyBFcnJvcihcImJpbmRBbGwgbXVzdCBiZSBwYXNzZWQgZnVuY3Rpb24gbmFtZXNcIik7Zm9yKDt0LS07KXt2YXIgZT1yW3RdO25bZV09aC5iaW5kKG5bZV0sbil9fSksaC5tZW1vaXplPWZ1bmN0aW9uKGUsdSl7dmFyIGk9ZnVuY3Rpb24obil7dmFyIHI9aS5jYWNoZSx0PVwiXCIrKHU/dS5hcHBseSh0aGlzLGFyZ3VtZW50cyk6bik7cmV0dXJuIGoocix0KXx8KHJbdF09ZS5hcHBseSh0aGlzLGFyZ3VtZW50cykpLHJbdF19O3JldHVybiBpLmNhY2hlPXt9LGl9LGguZGVsYXk9ZyhmdW5jdGlvbihuLHIsdCl7cmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtyZXR1cm4gbi5hcHBseShudWxsLHQpfSxyKX0pLGguZGVmZXI9aC5wYXJ0aWFsKGguZGVsYXksaCwxKSxoLnRocm90dGxlPWZ1bmN0aW9uKHQsZSx1KXt2YXIgaSxvLGEsYyxsPTA7dXx8KHU9e30pO3ZhciBmPWZ1bmN0aW9uKCl7bD0hMT09PXUubGVhZGluZz8wOmgubm93KCksaT1udWxsLGM9dC5hcHBseShvLGEpLGl8fChvPWE9bnVsbCl9LG49ZnVuY3Rpb24oKXt2YXIgbj1oLm5vdygpO2x8fCExIT09dS5sZWFkaW5nfHwobD1uKTt2YXIgcj1lLShuLWwpO3JldHVybiBvPXRoaXMsYT1hcmd1bWVudHMscjw9MHx8ZTxyPyhpJiYoY2xlYXJUaW1lb3V0KGkpLGk9bnVsbCksbD1uLGM9dC5hcHBseShvLGEpLGl8fChvPWE9bnVsbCkpOml8fCExPT09dS50cmFpbGluZ3x8KGk9c2V0VGltZW91dChmLHIpKSxjfTtyZXR1cm4gbi5jYW5jZWw9ZnVuY3Rpb24oKXtjbGVhclRpbWVvdXQoaSksbD0wLGk9bz1hPW51bGx9LG59LGguZGVib3VuY2U9ZnVuY3Rpb24odCxlLHUpe3ZhciBpLG8sYT1mdW5jdGlvbihuLHIpe2k9bnVsbCxyJiYobz10LmFwcGx5KG4scikpfSxuPWcoZnVuY3Rpb24obil7aWYoaSYmY2xlYXJUaW1lb3V0KGkpLHUpe3ZhciByPSFpO2k9c2V0VGltZW91dChhLGUpLHImJihvPXQuYXBwbHkodGhpcyxuKSl9ZWxzZSBpPWguZGVsYXkoYSxlLHRoaXMsbik7cmV0dXJuIG99KTtyZXR1cm4gbi5jYW5jZWw9ZnVuY3Rpb24oKXtjbGVhclRpbWVvdXQoaSksaT1udWxsfSxufSxoLndyYXA9ZnVuY3Rpb24obixyKXtyZXR1cm4gaC5wYXJ0aWFsKHIsbil9LGgubmVnYXRlPWZ1bmN0aW9uKG4pe3JldHVybiBmdW5jdGlvbigpe3JldHVybiFuLmFwcGx5KHRoaXMsYXJndW1lbnRzKX19LGguY29tcG9zZT1mdW5jdGlvbigpe3ZhciB0PWFyZ3VtZW50cyxlPXQubGVuZ3RoLTE7cmV0dXJuIGZ1bmN0aW9uKCl7Zm9yKHZhciBuPWUscj10W2VdLmFwcGx5KHRoaXMsYXJndW1lbnRzKTtuLS07KXI9dFtuXS5jYWxsKHRoaXMscik7cmV0dXJuIHJ9fSxoLmFmdGVyPWZ1bmN0aW9uKG4scil7cmV0dXJuIGZ1bmN0aW9uKCl7aWYoLS1uPDEpcmV0dXJuIHIuYXBwbHkodGhpcyxhcmd1bWVudHMpfX0saC5iZWZvcmU9ZnVuY3Rpb24obixyKXt2YXIgdDtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gMDwtLW4mJih0PXIuYXBwbHkodGhpcyxhcmd1bWVudHMpKSxuPD0xJiYocj1udWxsKSx0fX0saC5vbmNlPWgucGFydGlhbChoLmJlZm9yZSwyKSxoLnJlc3RBcmd1bWVudHM9Zzt2YXIgST0he3RvU3RyaW5nOm51bGx9LnByb3BlcnR5SXNFbnVtZXJhYmxlKFwidG9TdHJpbmdcIiksVD1bXCJ2YWx1ZU9mXCIsXCJpc1Byb3RvdHlwZU9mXCIsXCJ0b1N0cmluZ1wiLFwicHJvcGVydHlJc0VudW1lcmFibGVcIixcImhhc093blByb3BlcnR5XCIsXCJ0b0xvY2FsZVN0cmluZ1wiXSxCPWZ1bmN0aW9uKG4scil7dmFyIHQ9VC5sZW5ndGgsZT1uLmNvbnN0cnVjdG9yLHU9aC5pc0Z1bmN0aW9uKGUpJiZlLnByb3RvdHlwZXx8byxpPVwiY29uc3RydWN0b3JcIjtmb3IoaihuLGkpJiYhaC5jb250YWlucyhyLGkpJiZyLnB1c2goaSk7dC0tOykoaT1UW3RdKWluIG4mJm5baV0hPT11W2ldJiYhaC5jb250YWlucyhyLGkpJiZyLnB1c2goaSl9O2gua2V5cz1mdW5jdGlvbihuKXtpZighaC5pc09iamVjdChuKSlyZXR1cm5bXTtpZihhKXJldHVybiBhKG4pO3ZhciByPVtdO2Zvcih2YXIgdCBpbiBuKWoobix0KSYmci5wdXNoKHQpO3JldHVybiBJJiZCKG4scikscn0saC5hbGxLZXlzPWZ1bmN0aW9uKG4pe2lmKCFoLmlzT2JqZWN0KG4pKXJldHVybltdO3ZhciByPVtdO2Zvcih2YXIgdCBpbiBuKXIucHVzaCh0KTtyZXR1cm4gSSYmQihuLHIpLHJ9LGgudmFsdWVzPWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj1oLmtleXMobiksdD1yLmxlbmd0aCxlPUFycmF5KHQpLHU9MDt1PHQ7dSsrKWVbdV09bltyW3VdXTtyZXR1cm4gZX0saC5tYXBPYmplY3Q9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT1oLmtleXMobiksdT1lLmxlbmd0aCxpPXt9LG89MDtvPHU7bysrKXt2YXIgYT1lW29dO2lbYV09cihuW2FdLGEsbil9cmV0dXJuIGl9LGgucGFpcnM9ZnVuY3Rpb24obil7Zm9yKHZhciByPWgua2V5cyhuKSx0PXIubGVuZ3RoLGU9QXJyYXkodCksdT0wO3U8dDt1KyspZVt1XT1bclt1XSxuW3JbdV1dXTtyZXR1cm4gZX0saC5pbnZlcnQ9ZnVuY3Rpb24obil7Zm9yKHZhciByPXt9LHQ9aC5rZXlzKG4pLGU9MCx1PXQubGVuZ3RoO2U8dTtlKyspcltuW3RbZV1dXT10W2VdO3JldHVybiByfSxoLmZ1bmN0aW9ucz1oLm1ldGhvZHM9ZnVuY3Rpb24obil7dmFyIHI9W107Zm9yKHZhciB0IGluIG4paC5pc0Z1bmN0aW9uKG5bdF0pJiZyLnB1c2godCk7cmV0dXJuIHIuc29ydCgpfTt2YXIgUj1mdW5jdGlvbihjLGwpe3JldHVybiBmdW5jdGlvbihuKXt2YXIgcj1hcmd1bWVudHMubGVuZ3RoO2lmKGwmJihuPU9iamVjdChuKSkscjwyfHxudWxsPT1uKXJldHVybiBuO2Zvcih2YXIgdD0xO3Q8cjt0KyspZm9yKHZhciBlPWFyZ3VtZW50c1t0XSx1PWMoZSksaT11Lmxlbmd0aCxvPTA7bzxpO28rKyl7dmFyIGE9dVtvXTtsJiZ2b2lkIDAhPT1uW2FdfHwoblthXT1lW2FdKX1yZXR1cm4gbn19O2guZXh0ZW5kPVIoaC5hbGxLZXlzKSxoLmV4dGVuZE93bj1oLmFzc2lnbj1SKGgua2V5cyksaC5maW5kS2V5PWZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGUsdT1oLmtleXMobiksaT0wLG89dS5sZW5ndGg7aTxvO2krKylpZihyKG5bZT11W2ldXSxlLG4pKXJldHVybiBlfTt2YXIgcSxLLHo9ZnVuY3Rpb24obixyLHQpe3JldHVybiByIGluIHR9O2gucGljaz1nKGZ1bmN0aW9uKG4scil7dmFyIHQ9e30sZT1yWzBdO2lmKG51bGw9PW4pcmV0dXJuIHQ7aC5pc0Z1bmN0aW9uKGUpPygxPHIubGVuZ3RoJiYoZT15KGUsclsxXSkpLHI9aC5hbGxLZXlzKG4pKTooZT16LHI9TShyLCExLCExKSxuPU9iamVjdChuKSk7Zm9yKHZhciB1PTAsaT1yLmxlbmd0aDt1PGk7dSsrKXt2YXIgbz1yW3VdLGE9bltvXTtlKGEsbyxuKSYmKHRbb109YSl9cmV0dXJuIHR9KSxoLm9taXQ9ZyhmdW5jdGlvbihuLHQpe3ZhciByLGU9dFswXTtyZXR1cm4gaC5pc0Z1bmN0aW9uKGUpPyhlPWgubmVnYXRlKGUpLDE8dC5sZW5ndGgmJihyPXRbMV0pKToodD1oLm1hcChNKHQsITEsITEpLFN0cmluZyksZT1mdW5jdGlvbihuLHIpe3JldHVybiFoLmNvbnRhaW5zKHQscil9KSxoLnBpY2sobixlLHIpfSksaC5kZWZhdWx0cz1SKGguYWxsS2V5cywhMCksaC5jcmVhdGU9ZnVuY3Rpb24obixyKXt2YXIgdD1tKG4pO3JldHVybiByJiZoLmV4dGVuZE93bih0LHIpLHR9LGguY2xvbmU9ZnVuY3Rpb24obil7cmV0dXJuIGguaXNPYmplY3Qobik/aC5pc0FycmF5KG4pP24uc2xpY2UoKTpoLmV4dGVuZCh7fSxuKTpufSxoLnRhcD1mdW5jdGlvbihuLHIpe3JldHVybiByKG4pLG59LGguaXNNYXRjaD1mdW5jdGlvbihuLHIpe3ZhciB0PWgua2V5cyhyKSxlPXQubGVuZ3RoO2lmKG51bGw9PW4pcmV0dXJuIWU7Zm9yKHZhciB1PU9iamVjdChuKSxpPTA7aTxlO2krKyl7dmFyIG89dFtpXTtpZihyW29dIT09dVtvXXx8IShvIGluIHUpKXJldHVybiExfXJldHVybiEwfSxxPWZ1bmN0aW9uKG4scix0LGUpe2lmKG49PT1yKXJldHVybiAwIT09bnx8MS9uPT0xL3I7aWYobnVsbD09bnx8bnVsbD09cilyZXR1cm4hMTtpZihuIT1uKXJldHVybiByIT1yO3ZhciB1PXR5cGVvZiBuO3JldHVybihcImZ1bmN0aW9uXCI9PT11fHxcIm9iamVjdFwiPT09dXx8XCJvYmplY3RcIj09dHlwZW9mIHIpJiZLKG4scix0LGUpfSxLPWZ1bmN0aW9uKG4scix0LGUpe24gaW5zdGFuY2VvZiBoJiYobj1uLl93cmFwcGVkKSxyIGluc3RhbmNlb2YgaCYmKHI9ci5fd3JhcHBlZCk7dmFyIHU9cC5jYWxsKG4pO2lmKHUhPT1wLmNhbGwocikpcmV0dXJuITE7c3dpdGNoKHUpe2Nhc2VcIltvYmplY3QgUmVnRXhwXVwiOmNhc2VcIltvYmplY3QgU3RyaW5nXVwiOnJldHVyblwiXCIrbj09XCJcIityO2Nhc2VcIltvYmplY3QgTnVtYmVyXVwiOnJldHVybituIT0rbj8rciE9K3I6MD09K24/MS8rbj09MS9yOituPT0rcjtjYXNlXCJbb2JqZWN0IERhdGVdXCI6Y2FzZVwiW29iamVjdCBCb29sZWFuXVwiOnJldHVybituPT0rcjtjYXNlXCJbb2JqZWN0IFN5bWJvbF1cIjpyZXR1cm4gcy52YWx1ZU9mLmNhbGwobik9PT1zLnZhbHVlT2YuY2FsbChyKX12YXIgaT1cIltvYmplY3QgQXJyYXldXCI9PT11O2lmKCFpKXtpZihcIm9iamVjdFwiIT10eXBlb2Ygbnx8XCJvYmplY3RcIiE9dHlwZW9mIHIpcmV0dXJuITE7dmFyIG89bi5jb25zdHJ1Y3RvcixhPXIuY29uc3RydWN0b3I7aWYobyE9PWEmJiEoaC5pc0Z1bmN0aW9uKG8pJiZvIGluc3RhbmNlb2YgbyYmaC5pc0Z1bmN0aW9uKGEpJiZhIGluc3RhbmNlb2YgYSkmJlwiY29uc3RydWN0b3JcImluIG4mJlwiY29uc3RydWN0b3JcImluIHIpcmV0dXJuITF9ZT1lfHxbXTtmb3IodmFyIGM9KHQ9dHx8W10pLmxlbmd0aDtjLS07KWlmKHRbY109PT1uKXJldHVybiBlW2NdPT09cjtpZih0LnB1c2gobiksZS5wdXNoKHIpLGkpe2lmKChjPW4ubGVuZ3RoKSE9PXIubGVuZ3RoKXJldHVybiExO2Zvcig7Yy0tOylpZighcShuW2NdLHJbY10sdCxlKSlyZXR1cm4hMX1lbHNle3ZhciBsLGY9aC5rZXlzKG4pO2lmKGM9Zi5sZW5ndGgsaC5rZXlzKHIpLmxlbmd0aCE9PWMpcmV0dXJuITE7Zm9yKDtjLS07KWlmKGw9ZltjXSwhaihyLGwpfHwhcShuW2xdLHJbbF0sdCxlKSlyZXR1cm4hMX1yZXR1cm4gdC5wb3AoKSxlLnBvcCgpLCEwfSxoLmlzRXF1YWw9ZnVuY3Rpb24obixyKXtyZXR1cm4gcShuLHIpfSxoLmlzRW1wdHk9ZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PW58fCh3KG4pJiYoaC5pc0FycmF5KG4pfHxoLmlzU3RyaW5nKG4pfHxoLmlzQXJndW1lbnRzKG4pKT8wPT09bi5sZW5ndGg6MD09PWgua2V5cyhuKS5sZW5ndGgpfSxoLmlzRWxlbWVudD1mdW5jdGlvbihuKXtyZXR1cm4hKCFufHwxIT09bi5ub2RlVHlwZSl9LGguaXNBcnJheT10fHxmdW5jdGlvbihuKXtyZXR1cm5cIltvYmplY3QgQXJyYXldXCI9PT1wLmNhbGwobil9LGguaXNPYmplY3Q9ZnVuY3Rpb24obil7dmFyIHI9dHlwZW9mIG47cmV0dXJuXCJmdW5jdGlvblwiPT09cnx8XCJvYmplY3RcIj09PXImJiEhbn0saC5lYWNoKFtcIkFyZ3VtZW50c1wiLFwiRnVuY3Rpb25cIixcIlN0cmluZ1wiLFwiTnVtYmVyXCIsXCJEYXRlXCIsXCJSZWdFeHBcIixcIkVycm9yXCIsXCJTeW1ib2xcIixcIk1hcFwiLFwiV2Vha01hcFwiLFwiU2V0XCIsXCJXZWFrU2V0XCJdLGZ1bmN0aW9uKHIpe2hbXCJpc1wiK3JdPWZ1bmN0aW9uKG4pe3JldHVybiBwLmNhbGwobik9PT1cIltvYmplY3QgXCIrcitcIl1cIn19KSxoLmlzQXJndW1lbnRzKGFyZ3VtZW50cyl8fChoLmlzQXJndW1lbnRzPWZ1bmN0aW9uKG4pe3JldHVybiBqKG4sXCJjYWxsZWVcIil9KTt2YXIgRD1uLmRvY3VtZW50JiZuLmRvY3VtZW50LmNoaWxkTm9kZXM7XCJmdW5jdGlvblwiIT10eXBlb2YvLi8mJlwib2JqZWN0XCIhPXR5cGVvZiBJbnQ4QXJyYXkmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIEQmJihoLmlzRnVuY3Rpb249ZnVuY3Rpb24obil7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2Ygbnx8ITF9KSxoLmlzRmluaXRlPWZ1bmN0aW9uKG4pe3JldHVybiFoLmlzU3ltYm9sKG4pJiZpc0Zpbml0ZShuKSYmIWlzTmFOKHBhcnNlRmxvYXQobikpfSxoLmlzTmFOPWZ1bmN0aW9uKG4pe3JldHVybiBoLmlzTnVtYmVyKG4pJiZpc05hTihuKX0saC5pc0Jvb2xlYW49ZnVuY3Rpb24obil7cmV0dXJuITA9PT1ufHwhMT09PW58fFwiW29iamVjdCBCb29sZWFuXVwiPT09cC5jYWxsKG4pfSxoLmlzTnVsbD1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09PW59LGguaXNVbmRlZmluZWQ9ZnVuY3Rpb24obil7cmV0dXJuIHZvaWQgMD09PW59LGguaGFzPWZ1bmN0aW9uKG4scil7aWYoIWguaXNBcnJheShyKSlyZXR1cm4gaihuLHIpO2Zvcih2YXIgdD1yLmxlbmd0aCxlPTA7ZTx0O2UrKyl7dmFyIHU9cltlXTtpZihudWxsPT1ufHwhaS5jYWxsKG4sdSkpcmV0dXJuITE7bj1uW3VdfXJldHVybiEhdH0saC5ub0NvbmZsaWN0PWZ1bmN0aW9uKCl7cmV0dXJuIG4uXz1yLHRoaXN9LGguaWRlbnRpdHk9ZnVuY3Rpb24obil7cmV0dXJuIG59LGguY29uc3RhbnQ9ZnVuY3Rpb24obil7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIG59fSxoLm5vb3A9ZnVuY3Rpb24oKXt9LGgucHJvcGVydHk9ZnVuY3Rpb24ocil7cmV0dXJuIGguaXNBcnJheShyKT9mdW5jdGlvbihuKXtyZXR1cm4geChuLHIpfTpiKHIpfSxoLnByb3BlcnR5T2Y9ZnVuY3Rpb24ocil7cmV0dXJuIG51bGw9PXI/ZnVuY3Rpb24oKXt9OmZ1bmN0aW9uKG4pe3JldHVybiBoLmlzQXJyYXkobik/eChyLG4pOnJbbl19fSxoLm1hdGNoZXI9aC5tYXRjaGVzPWZ1bmN0aW9uKHIpe3JldHVybiByPWguZXh0ZW5kT3duKHt9LHIpLGZ1bmN0aW9uKG4pe3JldHVybiBoLmlzTWF0Y2gobixyKX19LGgudGltZXM9ZnVuY3Rpb24obixyLHQpe3ZhciBlPUFycmF5KE1hdGgubWF4KDAsbikpO3I9eShyLHQsMSk7Zm9yKHZhciB1PTA7dTxuO3UrKyllW3VdPXIodSk7cmV0dXJuIGV9LGgucmFuZG9tPWZ1bmN0aW9uKG4scil7cmV0dXJuIG51bGw9PXImJihyPW4sbj0wKSxuK01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSooci1uKzEpKX0saC5ub3c9RGF0ZS5ub3d8fGZ1bmN0aW9uKCl7cmV0dXJuKG5ldyBEYXRlKS5nZXRUaW1lKCl9O3ZhciBMPXtcIiZcIjpcIiZhbXA7XCIsXCI8XCI6XCImbHQ7XCIsXCI+XCI6XCImZ3Q7XCIsJ1wiJzpcIiZxdW90O1wiLFwiJ1wiOlwiJiN4Mjc7XCIsXCJgXCI6XCImI3g2MDtcIn0sUD1oLmludmVydChMKSxXPWZ1bmN0aW9uKHIpe3ZhciB0PWZ1bmN0aW9uKG4pe3JldHVybiByW25dfSxuPVwiKD86XCIraC5rZXlzKHIpLmpvaW4oXCJ8XCIpK1wiKVwiLGU9UmVnRXhwKG4pLHU9UmVnRXhwKG4sXCJnXCIpO3JldHVybiBmdW5jdGlvbihuKXtyZXR1cm4gbj1udWxsPT1uP1wiXCI6XCJcIituLGUudGVzdChuKT9uLnJlcGxhY2UodSx0KTpufX07aC5lc2NhcGU9VyhMKSxoLnVuZXNjYXBlPVcoUCksaC5yZXN1bHQ9ZnVuY3Rpb24obixyLHQpe2guaXNBcnJheShyKXx8KHI9W3JdKTt2YXIgZT1yLmxlbmd0aDtpZighZSlyZXR1cm4gaC5pc0Z1bmN0aW9uKHQpP3QuY2FsbChuKTp0O2Zvcih2YXIgdT0wO3U8ZTt1Kyspe3ZhciBpPW51bGw9PW4/dm9pZCAwOm5bclt1XV07dm9pZCAwPT09aSYmKGk9dCx1PWUpLG49aC5pc0Z1bmN0aW9uKGkpP2kuY2FsbChuKTppfXJldHVybiBufTt2YXIgQz0wO2gudW5pcXVlSWQ9ZnVuY3Rpb24obil7dmFyIHI9KytDK1wiXCI7cmV0dXJuIG4/bityOnJ9LGgudGVtcGxhdGVTZXR0aW5ncz17ZXZhbHVhdGU6LzwlKFtcXHNcXFNdKz8pJT4vZyxpbnRlcnBvbGF0ZTovPCU9KFtcXHNcXFNdKz8pJT4vZyxlc2NhcGU6LzwlLShbXFxzXFxTXSs/KSU+L2d9O3ZhciBKPS8oLileLyxVPXtcIidcIjpcIidcIixcIlxcXFxcIjpcIlxcXFxcIixcIlxcclwiOlwiclwiLFwiXFxuXCI6XCJuXCIsXCJcXHUyMDI4XCI6XCJ1MjAyOFwiLFwiXFx1MjAyOVwiOlwidTIwMjlcIn0sVj0vXFxcXHwnfFxccnxcXG58XFx1MjAyOHxcXHUyMDI5L2csJD1mdW5jdGlvbihuKXtyZXR1cm5cIlxcXFxcIitVW25dfTtoLnRlbXBsYXRlPWZ1bmN0aW9uKGksbixyKXshbiYmciYmKG49ciksbj1oLmRlZmF1bHRzKHt9LG4saC50ZW1wbGF0ZVNldHRpbmdzKTt2YXIgdCxlPVJlZ0V4cChbKG4uZXNjYXBlfHxKKS5zb3VyY2UsKG4uaW50ZXJwb2xhdGV8fEopLnNvdXJjZSwobi5ldmFsdWF0ZXx8Sikuc291cmNlXS5qb2luKFwifFwiKStcInwkXCIsXCJnXCIpLG89MCxhPVwiX19wKz0nXCI7aS5yZXBsYWNlKGUsZnVuY3Rpb24obixyLHQsZSx1KXtyZXR1cm4gYSs9aS5zbGljZShvLHUpLnJlcGxhY2UoViwkKSxvPXUrbi5sZW5ndGgscj9hKz1cIicrXFxuKChfX3Q9KFwiK3IrXCIpKT09bnVsbD8nJzpfLmVzY2FwZShfX3QpKStcXG4nXCI6dD9hKz1cIicrXFxuKChfX3Q9KFwiK3QrXCIpKT09bnVsbD8nJzpfX3QpK1xcbidcIjplJiYoYSs9XCInO1xcblwiK2UrXCJcXG5fX3ArPSdcIiksbn0pLGErPVwiJztcXG5cIixuLnZhcmlhYmxlfHwoYT1cIndpdGgob2JqfHx7fSl7XFxuXCIrYStcIn1cXG5cIiksYT1cInZhciBfX3QsX19wPScnLF9faj1BcnJheS5wcm90b3R5cGUuam9pbixcIitcInByaW50PWZ1bmN0aW9uKCl7X19wKz1fX2ouY2FsbChhcmd1bWVudHMsJycpO307XFxuXCIrYStcInJldHVybiBfX3A7XFxuXCI7dHJ5e3Q9bmV3IEZ1bmN0aW9uKG4udmFyaWFibGV8fFwib2JqXCIsXCJfXCIsYSl9Y2F0Y2gobil7dGhyb3cgbi5zb3VyY2U9YSxufXZhciB1PWZ1bmN0aW9uKG4pe3JldHVybiB0LmNhbGwodGhpcyxuLGgpfSxjPW4udmFyaWFibGV8fFwib2JqXCI7cmV0dXJuIHUuc291cmNlPVwiZnVuY3Rpb24oXCIrYytcIil7XFxuXCIrYStcIn1cIix1fSxoLmNoYWluPWZ1bmN0aW9uKG4pe3ZhciByPWgobik7cmV0dXJuIHIuX2NoYWluPSEwLHJ9O3ZhciBHPWZ1bmN0aW9uKG4scil7cmV0dXJuIG4uX2NoYWluP2gocikuY2hhaW4oKTpyfTtoLm1peGluPWZ1bmN0aW9uKHQpe3JldHVybiBoLmVhY2goaC5mdW5jdGlvbnModCksZnVuY3Rpb24obil7dmFyIHI9aFtuXT10W25dO2gucHJvdG90eXBlW25dPWZ1bmN0aW9uKCl7dmFyIG49W3RoaXMuX3dyYXBwZWRdO3JldHVybiB1LmFwcGx5KG4sYXJndW1lbnRzKSxHKHRoaXMsci5hcHBseShoLG4pKX19KSxofSxoLm1peGluKGgpLGguZWFjaChbXCJwb3BcIixcInB1c2hcIixcInJldmVyc2VcIixcInNoaWZ0XCIsXCJzb3J0XCIsXCJzcGxpY2VcIixcInVuc2hpZnRcIl0sZnVuY3Rpb24ocil7dmFyIHQ9ZVtyXTtoLnByb3RvdHlwZVtyXT1mdW5jdGlvbigpe3ZhciBuPXRoaXMuX3dyYXBwZWQ7cmV0dXJuIHQuYXBwbHkobixhcmd1bWVudHMpLFwic2hpZnRcIiE9PXImJlwic3BsaWNlXCIhPT1yfHwwIT09bi5sZW5ndGh8fGRlbGV0ZSBuWzBdLEcodGhpcyxuKX19KSxoLmVhY2goW1wiY29uY2F0XCIsXCJqb2luXCIsXCJzbGljZVwiXSxmdW5jdGlvbihuKXt2YXIgcj1lW25dO2gucHJvdG90eXBlW25dPWZ1bmN0aW9uKCl7cmV0dXJuIEcodGhpcyxyLmFwcGx5KHRoaXMuX3dyYXBwZWQsYXJndW1lbnRzKSl9fSksaC5wcm90b3R5cGUudmFsdWU9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fd3JhcHBlZH0saC5wcm90b3R5cGUudmFsdWVPZj1oLnByb3RvdHlwZS50b0pTT049aC5wcm90b3R5cGUudmFsdWUsaC5wcm90b3R5cGUudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gU3RyaW5nKHRoaXMuX3dyYXBwZWQpfSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQmJmRlZmluZShcInVuZGVyc2NvcmVcIixbXSxmdW5jdGlvbigpe3JldHVybiBofSl9KCk7XG4iLCJpbXBvcnQge2V4dHJhY3RFeHRlbnNpb259IGZyb20gXCJ1dGlscy9zdHJpbmdzXCI7XG5cbmV4cG9ydCBjb25zdCBpc1J0bXAgPSBmdW5jdGlvbiAoZmlsZSwgdHlwZSkge1xuICAgIGlmKGZpbGUpe1xuICAgICAgICByZXR1cm4gKGZpbGUuaW5kZXhPZigncnRtcDonKSA9PSAwIHx8IHR5cGUgPT0gJ3J0bXAnKTtcbiAgICB9XG59O1xuZXhwb3J0IGNvbnN0IGlzV2ViUlRDID0gZnVuY3Rpb24gKGZpbGUsIHR5cGUpIHtcbiAgICBpZihmaWxlKXtcbiAgICAgICAgcmV0dXJuIChmaWxlLmluZGV4T2YoJ3dzOicpID09PSAwIHx8IGZpbGUuaW5kZXhPZignd3NzOicpID09PSAwIHx8IHR5cGUgPT09ICd3ZWJydGMnKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcbmV4cG9ydCBjb25zdCBpc0hscyA9IGZ1bmN0aW9uIChmaWxlLCB0eXBlKSB7XG4gICAgaWYoZmlsZSl7XG4gICAgICAgIHJldHVybiAoIHR5cGUgPT09ICdobHMnIHx8ICB0eXBlID09PSAnbTN1OCcgfHwgdHlwZSA9PT0gJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyB8fCBleHRyYWN0RXh0ZW5zaW9uKGZpbGUpID09ICdtM3U4Jyk7XG5cbiAgICB9XG59O1xuZXhwb3J0IGNvbnN0IGlzRGFzaCA9IGZ1bmN0aW9uIChmaWxlLCB0eXBlKSB7XG4gICAgaWYoZmlsZSl7XG4gICAgICAgIHJldHVybiAoIHR5cGUgPT09ICdtcGQnIHx8ICB0eXBlID09PSAnZGFzaCcgfHwgdHlwZSA9PT0gJ2FwcGxpY2F0aW9uL2Rhc2greG1sJyB8fCBleHRyYWN0RXh0ZW5zaW9uKGZpbGUpID09ICdtcGQnKTtcblxuICAgIH1cbn07XG4iLCIvKipcbiAqIHV0aWxzIGZvciB3ZWJwYWNrXG4gKi9cblxuZXhwb3J0IGNvbnN0IGdldFNjcmlwdFBhdGggPSBmdW5jdGlvbihzY3JpcHROYW1lKSB7XG4gICAgY29uc3Qgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNjcmlwdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3JjID0gc2NyaXB0c1tpXS5zcmM7XG4gICAgICAgIGlmIChzcmMpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gc3JjLmxhc3RJbmRleE9mKCcvJyArIHNjcmlwdE5hbWUpO1xuICAgICAgICAgICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3JjLnN1YnN0cigwLCBpbmRleCArIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAnJztcbn07XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiAyOS4uXG4gKi9cbmV4cG9ydCBjb25zdCB2ZXJzaW9uID0gX19WRVJTSU9OX187XG4iXSwic291cmNlUm9vdCI6IiJ9