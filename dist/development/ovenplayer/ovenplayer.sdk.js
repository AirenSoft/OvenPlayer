/*! OvenPlayerv0.9.6242 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

        //set Golbal Volume info
        playerConfig.setVolume(currentProvider.getVolume());

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

    //spec.isFullscreen = false; //IE 11 can't check current fullscreen state.

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
    /*that.isFullscreen = () => {
        return spec.isFullscreen;
    }
    that.setFullscreen = (isFullscreen) => {
        return spec.isFullscreen = isFullscreen;
    }*/

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
    that.setVolume = function (volume) {
        spec.volume = volume;
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
        adContainer.setAttribute('class', 'op-ads');
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

    /*EFFECTS*/

    that.show = function () {
        $element.style.display = 'block';
    };

    that.hide = function () {
        $element.style.display = 'none';
    };

    /*ELEMENTS*/

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

    that.after = function (htmlString) {
        $element.insertAdjacentHTML('afterend', htmlString);
    };

    that.append = function (htmlString) {
        $element.appendChild(htmlString);
    };

    that.before = function (htmlString) {
        $element.insertAdjacentHTML('beforebegin', htmlString);
    };

    that.children = function () {
        return $element.children || [];
    };

    //The contains() method returns a Boolean value indicating whether a node is a descendant of a specified node.
    //A descendant can be a child, grandchild, great-grandchild, and so on.
    that.contains = function (elChild) {
        return $element !== elChild && $element.contains(elChild);
    };

    that.empty = function () {
        $element.innerHTML = "";
    };

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
    that.html = function (htmlString) {
        $element.innerHTML = htmlString;
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
        /*var matches = function(el, selector) {
            return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
        };
         matches(el, '.my-class');*/
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
var version = exports.version = '0.9.6242-2019070420-localbuild';

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvQXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvQXBpRXhwYW5zaW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0NvbmZpZ3VyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0V2ZW50RW1pdHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0xhenlDb21tYW5kRXhlY3V0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9TdXBwb3J0Q2hlY2tlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2NhcHRpb24vTG9hZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvY2FwdGlvbi9NYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvY2FwdGlvbi9wYXJzZXIvU3J0UGFyc2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvY29uc3RhbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvbWVkaWEvTWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3BsYXlsaXN0L01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9Db250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9vdmVucGxheWVyLnNkay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvY2FwdGlvbnMvdnR0Q3VlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9saWtlQSQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3N0cmluZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3VuZGVyc2NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3ZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvd2VicGFjay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmVyc2lvbi5qcyJdLCJuYW1lcyI6WyJBcGkiLCJjb250YWluZXIiLCJ0aGF0IiwiY29uc29sZSIsImxvZyIsInZlcnNpb24iLCJPdmVuUGxheWVyQ29uc29sZSIsInBsYXlsaXN0TWFuYWdlciIsInByb3ZpZGVyQ29udHJvbGxlciIsInVzZXJBZ2VudE9iamVjdCIsIm1lZGlhTWFuYWdlciIsImN1cnJlbnRQcm92aWRlciIsInBsYXllckNvbmZpZyIsImxhenlRdWV1ZSIsImNhcHRpb25NYW5hZ2VyIiwicnVuTmV4dFBsYXlsaXN0IiwiaW5kZXgiLCJuZXh0UGxheWxpc3RJbmRleCIsInBsYXlsaXN0IiwiZ2V0UGxheWxpc3QiLCJoYXNOZXh0UGxheWxpc3QiLCJzZXRTb3VyY2VJbmRleCIsInNldFZvbHVtZSIsImdldFZvbHVtZSIsInNldEN1cnJlbnRQbGF5bGlzdCIsImluaXRQcm92aWRlciIsImlzQXV0b1N0YXJ0IiwicGxheSIsInRyaWdnZXIiLCJBTExfUExBWUxJU1RfRU5ERUQiLCJsYXN0UGxheVBvc2l0aW9uIiwicGlja1F1YWxpdHlGcm9tU291cmNlIiwic291cmNlcyIsInF1YWxpdHkiLCJpIiwibGVuZ3RoIiwiZ2V0U291cmNlSW5kZXgiLCJsb2FkUHJvdmlkZXJzIiwiZ2V0Q3VycmVudFBsYXlMaXN0IiwidGhlbiIsIlByb3ZpZGVycyIsIkVSUk9SUyIsIklOSVRfVU5TVVBQT1JUX0VSUk9SIiwiZGVzdHJveSIsImdldEN1cnJlbnRQbGF5bGlzdEluZGV4IiwiY3VycmVudFNvdXJjZUluZGV4IiwiZ2V0Q3VycmVudFNvdXJjZXMiLCJwcm92aWRlck5hbWUiLCJwcm92aWRlciIsImNyZWF0ZU1lZGlhIiwiZ2V0Q3VycmVudEFkVGFnIiwiUFJPVklERVJfUlRNUCIsIm9uIiwibmFtZSIsImRhdGEiLCJFUlJPUiIsIk5FVFdPUktfVU5TVEFCTEVEIiwiZ2V0U291cmNlcyIsInBhdXNlIiwic2V0Q3VycmVudFNvdXJjZSIsInByZWxvYWQiLCJSRUFEWSIsImZsdXNoIiwiZXJyb3IiLCJvZmYiLCJjb2RlIiwidGVtcEVycm9yIiwiSU5JVF9VTktOV09OX0VSUk9SIiwiaW5pdCIsIm9wdGlvbnMiLCJtZWRpYUNvbnRhaW5lciIsImJyb3dzZXIiLCJpbml0UGxheWxpc3QiLCJnZXRQcm92aWRlck5hbWUiLCJnZXROYW1lIiwiZ2V0Q29uZmlnIiwiZ2V0QnJvd3NlciIsInNldFRpbWVjb2RlTW9kZSIsImlzU2hvdyIsImlzVGltZWNvZGVNb2RlIiwiZ2V0RnJhbWVyYXRlIiwic2Vla0ZyYW1lIiwiZnJhbWVDb3VudCIsImdldER1cmF0aW9uIiwiZ2V0UG9zaXRpb24iLCJ2b2x1bWUiLCJzZXRNdXRlIiwic3RhdGUiLCJnZXRNdXRlIiwibG9hZCIsInNldEN1cnJlbnRRdWFsaXR5Iiwic2VlayIsInBvc2l0aW9uIiwic2V0UGxheWJhY2tSYXRlIiwicGxheWJhY2tSYXRlIiwiZ2V0UGxheWJhY2tSYXRlIiwiZ2V0Q3VycmVudFBsYXlsaXN0IiwiZ2V0Q3VycmVudFNvdXJjZSIsImN1cnJlbnRTb3VyY2UiLCJuZXdTb3VyY2UiLCJpc1NhbWVQcm92aWRlciIsInJlc3VsdFNvdXJjZUluZGV4IiwiUFJPVklERVJfSExTIiwiZ2V0UXVhbGl0eUxldmVscyIsImdldEN1cnJlbnRRdWFsaXR5IiwicXVhbGl0eUluZGV4IiwiaXNBdXRvUXVhbGl0eSIsInNldEF1dG9RdWFsaXR5IiwiaXNBdXRvIiwiZ2V0Q2FwdGlvbkxpc3QiLCJnZXRDdXJyZW50Q2FwdGlvbiIsInNldEN1cnJlbnRDYXB0aW9uIiwiYWRkQ2FwdGlvbiIsInRyYWNrIiwicmVtb3ZlQ2FwdGlvbiIsImdldEJ1ZmZlciIsImdldFN0YXRlIiwic3RvcCIsInJlbW92ZSIsIkRFU1RST1kiLCJPdmVuUGxheWVyU0RLIiwicmVtb3ZlUGxheWVyIiwiZ2V0Q29udGFpbmVySWQiLCJnZXRQbGF5ZXJMaXN0IiwiZ2V0VmVyc2lvbiIsIkFwaVJ0bXBFeHBhbnNpb24iLCJleHRlcm5hbENhbGxiYWNrQ3JlZXAiLCJyZXN1bHQiLCJ0cmlnZ2VyRXZlbnRGcm9tRXh0ZXJuYWwiLCJDb25maWd1cmF0b3IiLCJjb21wb3NlU291cmNlT3B0aW9ucyIsIkRlZmF1bHRzIiwicGxheWJhY2tSYXRlcyIsIm11dGUiLCJsb29wIiwiY29udHJvbHMiLCJhdXRvU3RhcnQiLCJ0aW1lY29kZSIsInNvdXJjZUluZGV4IiwiaGlkZVBsYXlsaXN0SWNvbiIsInJ0bXBCdWZmZXJUaW1lIiwicnRtcEJ1ZmZlclRpbWVNYXgiLCJhZENsaWVudCIsInNlcmlhbGl6ZSIsInZhbCIsInVuZGVmaW5lZCIsImxvd2VyY2FzZVZhbCIsInRvTG93ZXJDYXNlIiwiaXNOYU4iLCJOdW1iZXIiLCJwYXJzZUZsb2F0IiwiZGVzZXJpYWxpemUiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImtleSIsImNvbmZpZyIsImZpbHRlciIsIl8iLCJpc051bWJlciIsInJhdGUiLCJtYXAiLCJNYXRoIiwicm91bmQiLCJpbmRleE9mIiwicHVzaCIsInNvcnQiLCJjb25maWdQbGF5bGlzdCIsIm9iaiIsInBpY2siLCJpc0FycmF5IiwiZmVlZERhdGEiLCJkdXJhdGlvbiIsInNwZWMiLCJnZXRBZENsaWVudCIsInNldENvbmZpZyIsInZhbHVlIiwiZ2V0Q29udGFpbmVyIiwiZ2V0UXVhbGl0eUxhYmVsIiwicXVhbGl0eUxhYmVsIiwic2V0UXVhbGl0eUxhYmVsIiwibmV3TGFiZWwiLCJDT05URU5UX1RJTUVfTU9ERV9DSEFOR0VEIiwiZ2V0UnRtcEJ1ZmZlclRpbWUiLCJnZXRSdG1wQnVmZmVyVGltZU1heCIsImlzTXV0ZSIsImlzTG9vcCIsImlzQ29udHJvbHMiLCJnZXRQbGF5YmFja1JhdGVzIiwic2V0UGxheWxpc3QiLCJFdmVudEVtaXR0ZXIiLCJvYmplY3QiLCJfZXZlbnRzIiwidHJpZ2dlckV2ZW50cyIsImV2ZW50cyIsImFyZ3MiLCJjb250ZXh0IiwiZXZlbnQiLCJsaXN0ZW5lciIsImFwcGx5Iiwic2xpY2UiLCJjYWxsIiwiYXJndW1lbnRzIiwiYWxsRXZlbnRzIiwiYWxsIiwibmFtZXMiLCJsIiwicmV0YWluIiwiaiIsImsiLCJfbGlzdGVuZXIiLCJvbmNlIiwiY291bnQiLCJvbmNlQ2FsbGJhY2siLCJMYXp5Q29tbWFuZEV4ZWN1dG9yIiwiaW5zdGFuY2UiLCJxdWV1ZWRDb21tYW5kcyIsImNvbW1hbmRRdWV1ZSIsInVuZGVjb3JhdGVkTWV0aG9kcyIsImV4ZWN1dGVNb2RlIiwiY29tbWFuZCIsIm1ldGhvZCIsIkFycmF5IiwicHJvdG90eXBlIiwiYWRkUXVldWUiLCJleGVjdXRlUXVldWVkQ29tbWFuZHMiLCJzaGlmdCIsInNldEV4ZWN1dGVNb2RlIiwibW9kZSIsImdldFVuZGVjb3JhdGVkTWV0aG9kcyIsImdldFF1ZXVlIiwiZW1wdHkiLCJyZW1vdmVBbmRFeGN1dGVPbmNlIiwiY29tbWFuZF8iLCJjb21tYW5kUXVldWVJdGVtIiwiZmluZFdoZXJlIiwic3BsaWNlIiwiZmluZEluZGV4IiwiU3VwcG9ydENoZWNrZXIiLCJzdXBwb3J0TGlzdCIsImNoZWNrU3VwcG9ydCIsInNvdXJjZSIsIk1pbWVUeXBlcyIsImFhYyIsIm1wNCIsImY0diIsIm00diIsIm1vdiIsIm1wMyIsIm1wZWciLCJvZ3YiLCJvZ2ciLCJvZ2EiLCJ2b3JiaXMiLCJ3ZWJtIiwiZjRhIiwibTN1OCIsIm0zdSIsImhscyIsInZpZGVvIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2FuUGxheVR5cGUiLCJmaWxlIiwidHlwZSIsIm1pbWVUeXBlIiwid2luZG93IiwiTWVkaWFTb3VyY2UiLCJXZWJLaXRNZWRpYVNvdXJjZSIsImlzSGxzU3VwcG9ydCIsImdldE1lZGlhU291cmNlIiwibWVkaWFTb3VyY2UiLCJzb3VyY2VCdWZmZXIiLCJTb3VyY2VCdWZmZXIiLCJXZWJLaXRTb3VyY2VCdWZmZXIiLCJpc1R5cGVTdXBwb3J0ZWQiLCJzb3VyY2VCdWZmZXJWYWxpZEFQSSIsImFwcGVuZEJ1ZmZlciIsInRlc3RGbGFzaCIsInN1cHBvcnQiLCJBY3RpdmVYT2JqZWN0IiwiZSIsIm5hdmlnYXRvciIsIm1pbWVUeXBlcyIsIm9zIiwiZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlIiwic29ydWNlXyIsImZpbmRQcm92aWRlck5hbWVzQnlQbGF5bGlzdCIsInBsYXlsaXN0SXRlbSIsInN1cHBvcnROYW1lcyIsIml0ZW0iLCJzdXBwb3J0ZWQiLCJMb2FkZXIiLCJjb252ZXJ0VG9WVFRDdWVzIiwiY3VlcyIsIlZUVEN1ZSIsImN1ZSIsInN0YXJ0IiwiZW5kIiwidGV4dCIsImxhbmd1YWdlIiwic3VjY2Vzc0NhbGxiYWNrIiwiZXJyb3JDYWxsYmFjayIsInJlcXVlc3RPcHRpb25zIiwidXJsIiwiZW5jb2RpbmciLCJsb2FkUmVxdWVzdERvd25sb2RlciIsIlJlcXVlc3QiLCJyZXNwb25zZSIsImJvZHkiLCJ2dHRDdWVzIiwibG9hZFZ0dFBhcnNlciIsInBhcnNlciIsIldlYlZUVCIsIlBhcnNlciIsIlN0cmluZ0RlY29kZXIiLCJvbmN1ZSIsIm9uZmx1c2giLCJwYXJzZSIsImxvYWRTbWlQYXJzZXIiLCJwYXJzZWREYXRhIiwiU21pUGFyc2VyIiwiZml4ZWRMYW5nIiwicmVxdWlyZSIsImVyciIsImlzU3VwcG9ydCIsImtpbmQiLCJNYW5hZ2VyIiwiYXBpIiwicGxheWxpc3RJbmRleCIsImNhcHRpb25MaXN0IiwiY3VycmVudENhcHRpb25JbmRleCIsImNhcHRpb25Mb2FkZXIiLCJpc0Zpc3J0TG9hZCIsImlzU2hvd2luZyIsImJpbmRUcmFjayIsImxhYmVsIiwiaWQiLCJ0cmFja3NDb3VudCIsInRyYWNrSWQiLCJwcmVmaXgiLCJkZWZhdWx0dHJhY2siLCJjaGFuZ2VDdXJyZW50Q2FwdGlvbiIsIkNPTlRFTlRfQ0FQVElPTl9DSEFOR0VEIiwidHJhY2tzIiwibGFuZyIsImNhcHRpb25JZCIsIlBMQVlFUl9DQVBUSU9OX0VSUk9SIiwiQ09OVEVOVF9USU1FIiwibWV0YSIsImN1cnJlbnRDdWVzIiwic3RhcnRUaW1lIiwiZW5kVGltZSIsIkNPTlRFTlRfQ0FQVElPTl9DVUVfQ0hBTkdFRCIsImZsdXNoQ2FwdGlvbkxpc3QiLCJsYXN0Q2FwdGlvbkluZGV4IiwiX2luZGV4IiwiX2VudHJ5IiwiZW50cnkiLCJhcnJheSIsInNwbGl0IiwiaWR4IiwibGluZSIsInN1YnN0ciIsImpvaW4iLCJTcnRQYXJzZXIiLCJjYXB0aW9ucyIsImxpc3QiLCJTVEFURV9CVUZGRVJJTkciLCJTVEFURV9JRExFIiwiU1RBVEVfQ09NUExFVEUiLCJTVEFURV9QQVVTRUQiLCJTVEFURV9QTEFZSU5HIiwiU1RBVEVfRVJST1IiLCJTVEFURV9MT0FESU5HIiwiU1RBVEVfU1RBTExFRCIsIlNUQVRFX0FEX0xPQURJTkciLCJTVEFURV9BRF9MT0FERUQiLCJTVEFURV9BRF9QTEFZSU5HIiwiU1RBVEVfQURfUEFVU0VEIiwiU1RBVEVfQURfQ09NUExFVEUiLCJTVEFURV9BRF9FUlJPUiIsIlBMQVlFUl9BRF9DTElDSyIsIlBST1ZJREVSX0hUTUw1IiwiUFJPVklERVJfV0VCUlRDIiwiUFJPVklERVJfREFTSCIsIkNPTlRFTlRfQ09NUExFVEUiLCJDT05URU5UX1NFRUsiLCJDT05URU5UX0JVRkZFUl9GVUxMIiwiRElTUExBWV9DTElDSyIsIkNPTlRFTlRfTE9BREVEIiwiUExBWUxJU1RfQ0hBTkdFRCIsIkNPTlRFTlRfU0VFS0VEIiwiUExBWUVSX1NUQVRFIiwiUExBWUVSX0NPTVBMRVRFIiwiUExBWUVSX1BBVVNFIiwiUExBWUVSX1BMQVkiLCJQTEFZRVJfQ0xJQ0tFRCIsIlBMQVlFUl9SRVNJWkVEIiwiUExBWUVSX0xPQURJTkciLCJQTEFZRVJfRlVMTFNDUkVFTl9SRVFVRVNUIiwiUExBWUVSX0ZVTExTQ1JFRU5fQ0hBTkdFRCIsIlBMQVlFUl9XQVJOSU5HIiwiQURfQ0hBTkdFRCIsIkFEX1RJTUUiLCJDT05URU5UX0JVRkZFUiIsIkNPTlRFTlRfUkFURV9DSEFOR0UiLCJDT05URU5UX1ZPTFVNRSIsIkNPTlRFTlRfTVVURSIsIkNPTlRFTlRfTUVUQSIsIkNPTlRFTlRfU09VUkNFX0NIQU5HRUQiLCJDT05URU5UX0xFVkVMX0NIQU5HRUQiLCJQTEFZQkFDS19SQVRFX0NIQU5HRUQiLCJPTUVfUDJQX01PREUiLCJBRF9DTElFTlRfR09PR0xFSU1BIiwiQURfQ0xJRU5UX1ZBU1QiLCJJTklUX1JUTVBfU0VUVVBfRVJST1IiLCJJTklUX0RBU0hfVU5TVVBQT1JUIiwiSU5JVF9BRFNfRVJST1IiLCJJTklUX0RBU0hfTk9URk9VTkQiLCJJTklUX0hMU0pTX05PVEZPVU5EIiwiUExBWUVSX1VOS05XT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SIiwiUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SIiwiUExBWUVSX0ZJTEVfRVJST1IiLCJQTEFZRVJfV0VCUlRDX1dTX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19TRVRfUkVNT1RFX0RFU0NfRVJST1IiLCJQTEFZRVJfV0VCUlRDX0NSRUFURV9BTlNXRVJfRVJST1IiLCJQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19ORVRXT1JLX1NMT1ciLCJXQVJOX01TR19NVVRFRFBMQVkiLCJtZXNzYWdlIiwicmVhc29uIiwiVUlfSUNPTlMiLCJ2b2x1bWVfbXV0ZSIsIm9wX3dhcm5pbmciLCJicm93c2VySW5mbyIsIlNXRlBhdGgiLCJyb290SWQiLCJnZXRBdHRyaWJ1dGUiLCIkY29udGFpbmVyIiwidmlkZW9FbGVtZW50IiwiY3JlYXRlSHRtbFZpZGVvIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kIiwiY3JlYXRlRmxhc2hWaWRlbyIsImJ1ZmZlclRpbWUiLCJidWZmZXJUaW1lTWF4IiwibW92aWUiLCJmbGFzaHZhcnMiLCJhbGxvd3NjcmlwdGFjY2VzcyIsImFsbG93ZnVsbHNjcmVlbiIsIm1lbnUiLCJxdWFsIiwiYmdjb2xvciIsIndtb2RlIiwiYnJvd3Nlck1ham9yVmVyc2lvbiIsImFwcGVuZENoaWxkIiwiY3JlYXRlQWRDb250YWluZXIiLCJhZENvbnRhaW5lciIsInJlbW92ZUNoaWxkIiwiY3VycmVudFBsYXlsaXN0SXRlbSIsImN1cnJlbnRJbmRleCIsInN1cHBvcnRDaGVja2VyIiwibWFrZVByZXR0eVNvdXJjZSIsInNvdXJjZV8iLCJob3N0IiwiYXBwbGljYXRpb24iLCJzdHJlYW0iLCJtaW1ldHlwZVJlZ0V4IiwidGVzdCIsInJlcGxhY2UiLCJwcmV0dGllZFBsYXlsaXN0IiwidGl0bGUiLCJsZXZlbHMiLCJwcmV0dHlTb3VyY2UiLCJkZWZhdWx0U291cmNlIiwidG9TdHJpbmciLCJjb25jYXQiLCJhZFRhZ1VybCIsIkNvbnRyb2xsZXIiLCJzdXBwb3J0Q2hhY2tlciIsInJlZ2lzdGVQcm92aWRlciIsIlByb3ZpZGVyTG9hZGVyIiwiaHRtbDUiLCJFcnJvciIsIndlYnJ0YyIsImRhc2giLCJydG1wIiwic3VwcG9ydGVkUHJvdmlkZXJOYW1lcyIsIlByb21pc2UiLCJyZWplY3QiLCJmaW5kQnlOYW1lIiwiZ2V0UHJvdmlkZXJCeVNvdXJjZSIsInN1cHBvcnRlZFByb3ZpZGVyTmFtZSIsIl9fd2VicGFja19wdWJsaWNfcGF0aF9fIiwicGxheWVyTGlzdCIsImNoZWNrQW5kR2V0Q29udGFpbmVyRWxlbWVudCIsImNvbnRhaW5lckVsZW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIm5vZGVUeXBlIiwiY3JlYXRlIiwicGxheWVySW5zdGFuY2UiLCJnZXRQbGF5ZXJCeUNvbnRhaW5lcklkIiwiY29udGFpbmVySWQiLCJnZXRQbGF5ZXJCeUluZGV4IiwicGxheWVySWQiLCJnZW5lcmF0ZVdlYnJ0Y1VybHMiLCJkZWJ1ZyIsImlzRGVidWdNb2RlIiwiZ2V0QnJvd3Nlckxhbmd1YWdlIiwibmF2IiwiYnJvd3Nlckxhbmd1YWdlUHJvcGVydHlLZXlzIiwibGFuZ3VhZ2VzIiwiYW5hbFVzZXJBZ2VudCIsInVua25vd24iLCJzY3JlZW5TaXplIiwic2NyZWVuIiwid2lkdGgiLCJoZWlnaHQiLCJuVmVyIiwiYXBwVmVyc2lvbiIsIm5BZ3QiLCJ1c2VyQWdlbnQiLCJhcHBOYW1lIiwibWFqb3JWZXJzaW9uIiwicGFyc2VJbnQiLCJpc1dlYnZpZXciLCJuYW1lT2Zmc2V0IiwidmVyT2Zmc2V0IiwiaXgiLCJzdWJzdHJpbmciLCJsYXN0SW5kZXhPZiIsInRvVXBwZXJDYXNlIiwibW9iaWxlIiwiY29va2llRW5hYmxlZCIsImNvb2tpZSIsImNsaWVudFN0cmluZ3MiLCJzIiwiciIsImNzIiwib3NWZXJzaW9uIiwiZXhlYyIsImJyb3dzZXJWZXJzaW9uIiwidWEiLCJjb29raWVzIiwiYXV0b0tleXdvcmQiLCJkaXJlY3Rpb25TZXR0aW5nIiwiYWxpZ25TZXR0aW5nIiwiZmluZERpcmVjdGlvblNldHRpbmciLCJkaXIiLCJmaW5kQWxpZ25TZXR0aW5nIiwiYWxpZ24iLCJleHRlbmQiLCJjb2JqIiwicCIsImlzSUU4IiwiYmFzZU9iaiIsImVudW1lcmFibGUiLCJoYXNCZWVuUmVzZXQiLCJfaWQiLCJfcGF1c2VPbkV4aXQiLCJfc3RhcnRUaW1lIiwiX2VuZFRpbWUiLCJfdGV4dCIsIl9yZWdpb24iLCJfdmVydGljYWwiLCJfc25hcFRvTGluZXMiLCJfbGluZSIsIl9saW5lQWxpZ24iLCJfcG9zaXRpb24iLCJfcG9zaXRpb25BbGlnbiIsIl9zaXplIiwiX2FsaWduIiwiZGVmaW5lUHJvcGVydHkiLCJnZXQiLCJzZXQiLCJUeXBlRXJyb3IiLCJzZXR0aW5nIiwiU3ludGF4RXJyb3IiLCJkaXNwbGF5U3RhdGUiLCJnZXRDdWVBc0hUTUwiLCJjb252ZXJ0Q3VlVG9ET01UcmVlIiwiTGEkIiwic2VsZWN0b3JPckVsZW1lbnQiLCJyZXR1cm5Ob2RlIiwiJGVsZW1lbnQiLCJzZWxlY3RvciIsIm5vZGVMaXN0IiwicXVlcnlTZWxlY3RvckFsbCIsImlzRWxlbWVudCIsImV2ZXJ5Iiwic2hvdyIsInN0eWxlIiwiZGlzcGxheSIsImhpZGUiLCJhZGRDbGFzcyIsImNsYXNzTGlzdCIsImFkZCIsImNsYXNzTmFtZXMiLCJjbGFzc05hbWUiLCJhZnRlciIsImh0bWxTdHJpbmciLCJpbnNlcnRBZGphY2VudEhUTUwiLCJiZWZvcmUiLCJjaGlsZHJlbiIsImNvbnRhaW5zIiwiZWxDaGlsZCIsImlubmVySFRNTCIsImZpbmQiLCJjc3MiLCJlbGVtZW50IiwicmVtb3ZlQ2xhc3MiLCJSZWdFeHAiLCJyZW1vdmVBdHRyaWJ1dGUiLCJhdHRyTmFtZSIsInRleHRDb250ZW50IiwiaHRtbCIsImhhc0NsYXNzIiwiaXMiLCIkdGFyZ2V0RWxlbWVudCIsIm9mZnNldCIsInJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0b3AiLCJzY3JvbGxUb3AiLCJsZWZ0Iiwic2Nyb2xsTGVmdCIsImNsaWVudFdpZHRoIiwiY2xpZW50SGVpZ2h0IiwiYXR0ciIsInJlcGxhY2VXaXRoIiwicGFyZW50RWxlbWVudCIsImhhc0NoaWxkTm9kZXMiLCJmaXJzdENoaWxkIiwiY2xvc2VzdCIsInNlbGVjdG9yU3RyaW5nIiwiY2xvc2VzdEVsZW1lbnQiLCJ0cmltIiwibmF0dXJhbEhtcyIsImhtc1RvU2Vjb25kIiwic3RyaW5nIiwiZXh0cmFjdEV4dGVuc2lvbiIsInBhdGgiLCJnZXRBenVyZUZpbGVGb3JtYXQiLCJleHRlbnNpb24iLCJhenVyZWRGb3JtYXQiLCJzZWNvbmQiLCJzZWNOdW0iLCJob3VycyIsImZsb29yIiwibWludXRlcyIsInNlY29uZHMiLCJzdHIiLCJmcmFtZVJhdGUiLCJhcnIiLCJhcnJMZW5ndGgiLCJzZWMiLCJzZWNJbmRleCIsIm4iLCJzZWxmIiwiZ2xvYmFsIiwibyIsIlN5bWJvbCIsInUiLCJjIiwiaGFzT3duUHJvcGVydHkiLCJ0IiwiYSIsImYiLCJoIiwiX3dyYXBwZWQiLCJleHBvcnRzIiwibW9kdWxlIiwiVkVSU0lPTiIsInYiLCJ5IiwiZCIsIml0ZXJhdGVlIiwiaWRlbnRpdHkiLCJpc0Z1bmN0aW9uIiwiaXNPYmplY3QiLCJtYXRjaGVyIiwicHJvcGVydHkiLCJnIiwibWF4IiwibSIsImIiLCJ4IiwicG93IiwiQSIsInciLCJlYWNoIiwiY29sbGVjdCIsIk8iLCJyZWR1Y2UiLCJmb2xkbCIsImluamVjdCIsInJlZHVjZVJpZ2h0IiwiZm9sZHIiLCJkZXRlY3QiLCJmaW5kS2V5Iiwic2VsZWN0IiwibmVnYXRlIiwic29tZSIsImFueSIsImluY2x1ZGVzIiwiaW5jbHVkZSIsInZhbHVlcyIsImludm9rZSIsInBsdWNrIiwid2hlcmUiLCJtaW4iLCJzaHVmZmxlIiwic2FtcGxlIiwicmFuZG9tIiwiY2xvbmUiLCJzb3J0QnkiLCJjcml0ZXJpYSIsImdyb3VwQnkiLCJpbmRleEJ5IiwiY291bnRCeSIsIlMiLCJ0b0FycmF5IiwiaXNTdHJpbmciLCJtYXRjaCIsInNpemUiLCJwYXJ0aXRpb24iLCJmaXJzdCIsImhlYWQiLCJ0YWtlIiwiaW5pdGlhbCIsImxhc3QiLCJyZXN0IiwidGFpbCIsImRyb3AiLCJjb21wYWN0IiwiQm9vbGVhbiIsIk0iLCJpc0FyZ3VtZW50cyIsImZsYXR0ZW4iLCJ3aXRob3V0IiwiZGlmZmVyZW5jZSIsInVuaXEiLCJ1bmlxdWUiLCJpc0Jvb2xlYW4iLCJ1bmlvbiIsImludGVyc2VjdGlvbiIsInVuemlwIiwiemlwIiwiRiIsImZpbmRMYXN0SW5kZXgiLCJzb3J0ZWRJbmRleCIsIkUiLCJyYW5nZSIsImNlaWwiLCJjaHVuayIsIk4iLCJiaW5kIiwicGFydGlhbCIsInBsYWNlaG9sZGVyIiwiYmluZEFsbCIsIm1lbW9pemUiLCJjYWNoZSIsImRlbGF5Iiwic2V0VGltZW91dCIsImRlZmVyIiwidGhyb3R0bGUiLCJsZWFkaW5nIiwibm93IiwiY2xlYXJUaW1lb3V0IiwidHJhaWxpbmciLCJjYW5jZWwiLCJkZWJvdW5jZSIsIndyYXAiLCJjb21wb3NlIiwicmVzdEFyZ3VtZW50cyIsIkkiLCJwcm9wZXJ0eUlzRW51bWVyYWJsZSIsIlQiLCJCIiwiY29uc3RydWN0b3IiLCJhbGxLZXlzIiwibWFwT2JqZWN0IiwicGFpcnMiLCJpbnZlcnQiLCJmdW5jdGlvbnMiLCJtZXRob2RzIiwiUiIsImV4dGVuZE93biIsImFzc2lnbiIsInEiLCJLIiwieiIsIm9taXQiLCJTdHJpbmciLCJkZWZhdWx0cyIsInRhcCIsImlzTWF0Y2giLCJ2YWx1ZU9mIiwicG9wIiwiaXNFcXVhbCIsImlzRW1wdHkiLCJEIiwiY2hpbGROb2RlcyIsIkludDhBcnJheSIsImlzRmluaXRlIiwiaXNTeW1ib2wiLCJpc051bGwiLCJpc1VuZGVmaW5lZCIsImhhcyIsIm5vQ29uZmxpY3QiLCJjb25zdGFudCIsIm5vb3AiLCJwcm9wZXJ0eU9mIiwibWF0Y2hlcyIsInRpbWVzIiwiRGF0ZSIsImdldFRpbWUiLCJMIiwiUCIsIlciLCJlc2NhcGUiLCJ1bmVzY2FwZSIsIkMiLCJ1bmlxdWVJZCIsInRlbXBsYXRlU2V0dGluZ3MiLCJldmFsdWF0ZSIsImludGVycG9sYXRlIiwiSiIsIlUiLCJWIiwiJCIsInRlbXBsYXRlIiwidmFyaWFibGUiLCJGdW5jdGlvbiIsImNoYWluIiwiX2NoYWluIiwiRyIsIm1peGluIiwidG9KU09OIiwiZGVmaW5lIiwiaXNSdG1wIiwiaXNXZWJSVEMiLCJpc0hscyIsImlzRGFzaCIsImdldFNjcmlwdFBhdGgiLCJzY3JpcHROYW1lIiwic2NyaXB0cyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwic3JjIiwiX19WRVJTSU9OX18iXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGdCQUFRLG9CQUFvQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztB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QUssSUFBSWp6QixJQUFJLENBQWIsRUFBZ0JBLElBQUlnekIsUUFBUS95QixNQUE1QixFQUFvQ0QsR0FBcEMsRUFBeUM7QUFDckMsWUFBTWt6QixNQUFNRixRQUFRaHpCLENBQVIsRUFBV2t6QixHQUF2QjtBQUNBLFlBQUlBLEdBQUosRUFBUztBQUNMLGdCQUFNcDBCLFFBQVFvMEIsSUFBSTlULFdBQUosQ0FBZ0IsTUFBTTJULFVBQXRCLENBQWQ7QUFDQSxnQkFBSWowQixTQUFTLENBQWIsRUFBZ0I7QUFDWix1QkFBT28wQixJQUFJemUsTUFBSixDQUFXLENBQVgsRUFBYzNWLFFBQVEsQ0FBdEIsQ0FBUDtBQUNIO0FBQ0o7QUFDSjtBQUNELFdBQU8sRUFBUDtBQUNILENBWk0sQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKUDs7O0FBR08sSUFBTVgsNEJBQVVnMUIsZ0NBQWhCLEMiLCJmaWxlIjoib3ZlbnBsYXllci5zZGsuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcblxuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHR9O1xuXG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcIm92ZW5wbGF5ZXIuc2RrXCI6IDBcbiBcdH07XG5cblxuXG4gXHQvLyBzY3JpcHQgcGF0aCBmdW5jdGlvblxuIFx0ZnVuY3Rpb24ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCkge1xuIFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArICh7XCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjJlYzE5M2FjXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjJlYzE5M2FjXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjdhZmQ2OGNmXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjdhZmQ2OGNmXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlclwiOlwib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDVcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDVcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuV2ViUlRDUHJvdmlkZXJcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuV2ViUlRDUHJvdmlkZXJcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuUnRtcFByb3ZpZGVyXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLlJ0bXBQcm92aWRlclwiLFwic21pcGFyc2VyXCI6XCJzbWlwYXJzZXJcIixcInZlbmRvcnN+ZG93bmxvYWRlclwiOlwidmVuZG9yc35kb3dubG9hZGVyXCIsXCJkb3dubG9hZGVyXCI6XCJkb3dubG9hZGVyXCIsXCJ2dHRwYXJzZXJcIjpcInZ0dHBhcnNlclwifVtjaHVua0lkXXx8Y2h1bmtJZCkgKyBcIi5qc1wiXG4gXHR9XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuIFx0Ly8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuIFx0Ly8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSBmdW5jdGlvbiByZXF1aXJlRW5zdXJlKGNodW5rSWQpIHtcbiBcdFx0dmFyIHByb21pc2VzID0gW107XG5cblxuIFx0XHQvLyBKU09OUCBjaHVuayBsb2FkaW5nIGZvciBqYXZhc2NyaXB0XG5cbiBcdFx0dmFyIGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhICE9PSAwKSB7IC8vIDAgbWVhbnMgXCJhbHJlYWR5IGluc3RhbGxlZFwiLlxuXG4gXHRcdFx0Ly8gYSBQcm9taXNlIG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEpIHtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdKTtcbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Ly8gc2V0dXAgUHJvbWlzZSBpbiBjaHVuayBjYWNoZVxuIFx0XHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gW3Jlc29sdmUsIHJlamVjdF07XG4gXHRcdFx0XHR9KTtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdID0gcHJvbWlzZSk7XG5cbiBcdFx0XHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcbiBcdFx0XHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiBcdFx0XHRcdHZhciBvblNjcmlwdENvbXBsZXRlO1xuXG4gXHRcdFx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG4gXHRcdFx0XHRzY3JpcHQudGltZW91dCA9IDEyMDtcbiBcdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG4gXHRcdFx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHNjcmlwdC5zcmMgPSBqc29ucFNjcmlwdFNyYyhjaHVua0lkKTtcblxuIFx0XHRcdFx0Ly8gY3JlYXRlIGVycm9yIGJlZm9yZSBzdGFjayB1bndvdW5kIHRvIGdldCB1c2VmdWwgc3RhY2t0cmFjZSBsYXRlclxuIFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCk7XG4gXHRcdFx0XHRvblNjcmlwdENvbXBsZXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gXHRcdFx0XHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cbiBcdFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gbnVsbDtcbiBcdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuIFx0XHRcdFx0XHR2YXIgY2h1bmsgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdFx0XHRcdGlmKGNodW5rICE9PSAwKSB7XG4gXHRcdFx0XHRcdFx0aWYoY2h1bmspIHtcbiBcdFx0XHRcdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG4gXHRcdFx0XHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IubWVzc2FnZSA9ICdMb2FkaW5nIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLm5hbWUgPSAnQ2h1bmtMb2FkRXJyb3InO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnJlcXVlc3QgPSByZWFsU3JjO1xuIFx0XHRcdFx0XHRcdFx0Y2h1bmtbMV0oZXJyb3IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSB1bmRlZmluZWQ7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH07XG4gXHRcdFx0XHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiBcdFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSh7IHR5cGU6ICd0aW1lb3V0JywgdGFyZ2V0OiBzY3JpcHQgfSk7XG4gXHRcdFx0XHR9LCAxMjAwMDApO1xuIFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gb25TY3JpcHRDb21wbGV0ZTtcbiBcdFx0XHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0cmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gb24gZXJyb3IgZnVuY3Rpb24gZm9yIGFzeW5jIGxvYWRpbmdcbiBcdF9fd2VicGFja19yZXF1aXJlX18ub2UgPSBmdW5jdGlvbihlcnIpIHsgY29uc29sZS5lcnJvcihlcnIpOyB0aHJvdyBlcnI7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvanMvb3ZlbnBsYXllci5zZGsuanNcIik7XG4iLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHRpZiAoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcblx0XHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XG5cdH1cblx0cmV0dXJuIG1vZHVsZTtcbn07XG4iLCJpbXBvcnQgQ2FwdGlvbk1hbmFnZXIgZnJvbSBcImFwaS9jYXB0aW9uL01hbmFnZXJcIjtcbmltcG9ydCBDb25maWd1cmF0b3IgZnJvbSBcImFwaS9Db25maWd1cmF0b3JcIjtcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImFwaS9FdmVudEVtaXR0ZXJcIjtcbmltcG9ydCBMYXp5Q29tbWFuZEV4ZWN1dG9yIGZyb20gXCJhcGkvTGF6eUNvbW1hbmRFeGVjdXRvclwiO1xuaW1wb3J0IE1lZGlhTWFuYWdlciBmcm9tIFwiYXBpL21lZGlhL01hbmFnZXJcIjtcbmltcG9ydCBQbGF5bGlzdE1hbmFnZXIgZnJvbSBcImFwaS9wbGF5bGlzdC9NYW5hZ2VyXCI7XG5pbXBvcnQgUHJvdmlkZXJDb250cm9sbGVyIGZyb20gXCJhcGkvcHJvdmlkZXIvQ29udHJvbGxlclwiO1xuaW1wb3J0IHtSRUFEWSwgRVJST1JTLCBFUlJPUiwgQ09OVEVOVF9USU1FX01PREVfQ0hBTkdFRCwgSU5JVF9VTktOV09OX0VSUk9SLCBJTklUX1VOU1VQUE9SVF9FUlJPUiwgREVTVFJPWSwgTkVUV09SS19VTlNUQUJMRUQsXG4gICAgUExBWUVSX0ZJTEVfRVJST1IsIFBST1ZJREVSX0RBU0gsIFBST1ZJREVSX0hMUywgUFJPVklERVJfV0VCUlRDLCBQUk9WSURFUl9IVE1MNSwgUFJPVklERVJfUlRNUCwgQUxMX1BMQVlMSVNUX0VOREVEfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuaW1wb3J0IHt2ZXJzaW9ufSBmcm9tICd2ZXJzaW9uJztcbmltcG9ydCB7QXBpUnRtcEV4cGFuc2lvbn0gZnJvbSAnYXBpL0FwaUV4cGFuc2lvbnMnO1xuaW1wb3J0IHthbmFsVXNlckFnZW50fSBmcm9tIFwidXRpbHMvYnJvd3NlclwiO1xuaW1wb3J0IExBJCBmcm9tICd1dGlscy9saWtlQSQnO1xuXG4vKipcbiAqIEBicmllZiAgIFRoaXMgb2JqZWN0IGNvbm5lY3RzIFVJIHRvIHRoZSBwcm92aWRlci5cbiAqIEBwYXJhbSAgIHtvYmplY3R9ICAgIGNvbnRhaW5lciAgZG9tIGVsZW1lbnRcbiAqXG4gKiAqL1xuXG5jb25zdCBBcGkgPSBmdW5jdGlvbihjb250YWluZXIpe1xuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICBFdmVudEVtaXR0ZXIodGhhdCk7XG5cblxuICAgIGNvbnNvbGUubG9nKFwiW1tPdmVuUGxheWVyXV0gdi5cIisgdmVyc2lvbik7XG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIGxvYWRlZC5cIik7XG5cbiAgICBsZXQgcGxheWxpc3RNYW5hZ2VyID0gUGxheWxpc3RNYW5hZ2VyKHRoYXQpO1xuICAgIGxldCBwcm92aWRlckNvbnRyb2xsZXIgPSBQcm92aWRlckNvbnRyb2xsZXIoKTtcbiAgICBsZXQgdXNlckFnZW50T2JqZWN0ID0gYW5hbFVzZXJBZ2VudCgpO1xuICAgIGxldCBtZWRpYU1hbmFnZXIgPSBNZWRpYU1hbmFnZXIoY29udGFpbmVyLCB1c2VyQWdlbnRPYmplY3QpO1xuICAgIGxldCBjdXJyZW50UHJvdmlkZXIgPSBcIlwiO1xuICAgIGxldCBwbGF5ZXJDb25maWcgPSBcIlwiO1xuICAgIGxldCBsYXp5UXVldWUgPSBcIlwiO1xuICAgIGxldCBjYXB0aW9uTWFuYWdlciA9IFwiXCI7XG5cblxuICAgIGNvbnN0IHJ1bk5leHRQbGF5bGlzdCA9IGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwicnVuTmV4dFBsYXlsaXN0XCIpO1xuICAgICAgICBsZXQgbmV4dFBsYXlsaXN0SW5kZXggPSBpbmRleDsgLy8gfHwgcGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRQbGF5bGlzdEluZGV4KCkgKyAxO1xuICAgICAgICBsZXQgcGxheWxpc3QgPSBwbGF5bGlzdE1hbmFnZXIuZ2V0UGxheWxpc3QoKTtcbiAgICAgICAgbGV0IGhhc05leHRQbGF5bGlzdCA9IHBsYXlsaXN0W25leHRQbGF5bGlzdEluZGV4XT8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAvL2luaXQgc291cmNlIGluZGV4XG4gICAgICAgIHBsYXllckNvbmZpZy5zZXRTb3VyY2VJbmRleCgwKTtcblxuICAgICAgICAvL3NldCBHb2xiYWwgVm9sdW1lIGluZm9cbiAgICAgICAgcGxheWVyQ29uZmlnLnNldFZvbHVtZShjdXJyZW50UHJvdmlkZXIuZ2V0Vm9sdW1lKCkpO1xuXG4gICAgICAgIGlmKGhhc05leHRQbGF5bGlzdCl7XG4gICAgICAgICAgICAvL3RoYXQucGF1c2UoKTtcbiAgICAgICAgICAgIGxhenlRdWV1ZSA9IExhenlDb21tYW5kRXhlY3V0b3IodGhhdCwgWydwbGF5Jywnc2VlaycsJ3N0b3AnXSk7XG4gICAgICAgICAgICBwbGF5bGlzdE1hbmFnZXIuc2V0Q3VycmVudFBsYXlsaXN0KG5leHRQbGF5bGlzdEluZGV4KTtcbiAgICAgICAgICAgIGluaXRQcm92aWRlcigpO1xuXG5cbiAgICAgICAgICAgIGlmKCFwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSl7XG4gICAgICAgICAgICAgICAgLy9Bbnl3YXkgbmV4dHBsYXlsaXN0IHJ1bnMgYXV0b1N0YXJ0IS5cbiAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAvL0FsbCBQbGF5bGlzdCBFbmRlZC5cbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihBTExfUExBWUxJU1RfRU5ERUQsIG51bGwpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBpbml0UHJvdmlkZXIgPSBmdW5jdGlvbihsYXN0UGxheVBvc2l0aW9uKXtcbiAgICAgICAgY29uc3QgcGlja1F1YWxpdHlGcm9tU291cmNlID0gKHNvdXJjZXMpID0+e1xuICAgICAgICAgICAgdmFyIHF1YWxpdHkgPSAwO1xuICAgICAgICAgICAgaWYgKHNvdXJjZXMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZXNbaV0uZGVmYXVsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVhbGl0eSA9IGk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRTb3VyY2VJbmRleCgpID09PSBpICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLyppZiAocGxheWVyQ29uZmlnLmdldFNvdXJjZUxhYmVsKCkgJiYgc291cmNlc1tpXS5sYWJlbCA9PT0gcGxheWVyQ29uZmlnLmdldFNvdXJjZUxhYmVsKCkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgICAgICAgICAgfSovXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHF1YWxpdHk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHByb3ZpZGVyQ29udHJvbGxlci5sb2FkUHJvdmlkZXJzKHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50UGxheUxpc3QoKSkudGhlbihQcm92aWRlcnMgPT4ge1xuICAgICAgICAgICAgaWYoUHJvdmlkZXJzLmxlbmd0aCA8IDEpe1xuICAgICAgICAgICAgICAgIHRocm93IEVSUk9SU1tJTklUX1VOU1VQUE9SVF9FUlJPUl07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGN1cnJlbnRQcm92aWRlcil7XG4gICAgICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoY2FwdGlvbk1hbmFnZXIpe1xuICAgICAgICAgICAgICAgIGNhcHRpb25NYW5hZ2VyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICBjYXB0aW9uTWFuYWdlciA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXB0aW9uTWFuYWdlciA9IENhcHRpb25NYW5hZ2VyKHRoYXQsIHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50UGxheWxpc3RJbmRleCgpKTtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGluaXQoKSBjYXB0aW9uc1wiKTtcblxuICAgICAgICAgICAgbGV0IGN1cnJlbnRTb3VyY2VJbmRleCA9IHBpY2tRdWFsaXR5RnJvbVNvdXJjZShwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKSk7XG4gICAgICAgICAgICBsZXQgcHJvdmlkZXJOYW1lID0gUHJvdmlkZXJzW2N1cnJlbnRTb3VyY2VJbmRleF1bXCJuYW1lXCJdO1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaW5pdCgpIHByb3ZpZGVyXCIsIHByb3ZpZGVyTmFtZSk7XG4gICAgICAgICAgICAvL0luaXQgUHJvdmlkZXIuXG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIgPSAgUHJvdmlkZXJzW2N1cnJlbnRTb3VyY2VJbmRleF0ucHJvdmlkZXIoXG4gICAgICAgICAgICAgICAgbWVkaWFNYW5hZ2VyLmNyZWF0ZU1lZGlhKHByb3ZpZGVyTmFtZSwgcGxheWVyQ29uZmlnKSxcbiAgICAgICAgICAgICAgICBwbGF5ZXJDb25maWcsXG4gICAgICAgICAgICAgICAgcGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRBZFRhZygpXG4gICAgICAgICAgICApO1xuXG5cblxuICAgICAgICAgICAgaWYocHJvdmlkZXJOYW1lID09PSBQUk9WSURFUl9SVE1QKXtcbiAgICAgICAgICAgICAgICAvL0lmIHByb3ZpZGVyIHR5cGUgaXMgUlRNUCwgd2UgYWNjZXB0cyBSdG1wRXhwYW5zaW9uLlxuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhhdCwgQXBpUnRtcEV4cGFuc2lvbihjdXJyZW50UHJvdmlkZXIpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9UaGlzIHBhc3NlcyB0aGUgZXZlbnQgY3JlYXRlZCBieSB0aGUgUHJvdmlkZXIgdG8gQVBJLlxuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLm9uKFwiYWxsXCIsIGZ1bmN0aW9uKG5hbWUsIGRhdGEpe1xuXG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKG5hbWUsIGRhdGEpO1xuXG4gICAgICAgICAgICAgICAgaWYobmFtZSA9PT0gXCJjb21wbGV0ZVwiKXtcbiAgICAgICAgICAgICAgICAgICAgcnVuTmV4dFBsYXlsaXN0KHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50UGxheWxpc3RJbmRleCgpICsgMSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9BdXRvIHN3aXRjaGluZyBuZXh0IHNvdXJjZSB3aGVuIHBsYXllciBsb2FkIGZhaWxlZCBieSBhbWlzcyBzb3VyY2UuXG4gICAgICAgICAgICAgICAgLy9kYXRhLmNvZGUgPT09IFBMQVlFUl9GSUxFX0VSUk9SXG4gICAgICAgICAgICAgICAgaWYoIG5hbWUgPT09IEVSUk9SIHx8IG5hbWUgPT09IE5FVFdPUktfVU5TVEFCTEVEICl7XG4gICAgICAgICAgICAgICAgICAgIC8vbGV0IGN1cnJlbnRTb3VyY2VJbmRleCA9IHRoYXQuZ2V0Q3VycmVudFNvdXJjZSgpO1xuICAgICAgICAgICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuZ2V0U291cmNlSW5kZXgoKSsxIDwgdGhhdC5nZXRTb3VyY2VzKCkubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcyBzZXF1ZW50aWFsIGhhcyBhdmFpbGFibGUgc291cmNlLlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wYXVzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRDdXJyZW50U291cmNlKHBsYXllckNvbmZpZy5nZXRTb3VyY2VJbmRleCgpKzEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSkudGhlbigoKT0+e1xuXG4gICAgICAgICAgICAvL3Byb3ZpZGVyJ3MgcHJlbG9hZCgpIGhhdmUgdG8gbWFkZSBQcm9taXNlLiBDdXogaXQgb3ZlcmNvbWVzICdmbGFzaCBsb2FkaW5nIHRpbWluZyBwcm9ibGVtJy5cbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5wcmVsb2FkKHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50U291cmNlcygpLCBsYXN0UGxheVBvc2l0aW9uKS50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFJFQURZKTtcblxuICAgICAgICAgICAgICAgIGxhenlRdWV1ZS5mbHVzaCgpO1xuICAgICAgICAgICAgICAgIC8vVGhpcyBpcyBubyByZWFzb24gdG8gZXhpc3QgYW55bW9yZS5cbiAgICAgICAgICAgICAgICBsYXp5UXVldWUuZGVzdHJveSgpO1xuXG4gICAgICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBsYXp5UXVldWUub2ZmKCk7XG4gICAgICAgICAgICAgICAgaWYoZXJyb3IgJiYgZXJyb3IuY29kZSAmJiBFUlJPUlNbZXJyb3IuY29kZV0pe1xuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoRVJST1IsIEVSUk9SU1tlcnJvci5jb2RlXSk7XG4gICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTW0lOSVRfVU5LTldPTl9FUlJPUl07XG4gICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoRVJST1IsIHRlbXBFcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgLy9JTklUIEVSUk9SXG4gICAgICAgICAgICBpZihlcnJvciAmJiBlcnJvci5jb2RlICYmIEVSUk9SU1tlcnJvci5jb2RlXSl7XG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKEVSUk9SLCBFUlJPUlNbZXJyb3IuY29kZV0pO1xuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlNbSU5JVF9VTktOV09OX0VSUk9SXTtcbiAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoRVJST1IsIHRlbXBFcnJvcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8veHh4IDogSWYgeW91IGluaXQgZW1wdHkgc291cmNlcy4gKEkgdGhpbmsgdGhpcyBpcyBzdHJhbmdlIGNhc2UuKVxuICAgICAgICAgICAgLy9UaGlzIHdvcmtzIGZvciB0aGlzIGNhc2UuXG4gICAgICAgICAgICAvL3BsYXllciA9IE92ZW5QbGF5ZXIuY3JlYXRlKFwiZWxJZFwiLCB7fSk7XG4gICAgICAgICAgICAvL3BsYXllci5sb2FkKHNvcnVjZXMpO1xuICAgICAgICAgICAgbGF6eVF1ZXVlLm9mZigpO1xuICAgICAgICAgICAgLy9sYXp5UXVldWUucmVtb3ZlQW5kRXhjdXRlT25jZShcImxvYWRcIik7XG4gICAgICAgIH0pO1xuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIEFQSSDstIjquLDtmZQg7ZWo7IiYXG4gICAgICogaW5pdFxuICAgICAqIEBwYXJhbSAgICAgIHtvYmplY3R9IG9wdGlvbnMgcGxheWVyIGluaXRpYWwgb3B0aW9uIHZhbHVlLlxuICAgICAqIEByZXR1cm5zXG4gICAgICoqL1xuICAgIHRoYXQuaW5pdCA9IChvcHRpb25zKSA9PntcbiAgICAgICAgLy9JdCBjb2xsZWN0cyB0aGUgY29tbWFuZHMgYW5kIGV4ZWN1dGVzIHRoZW0gYXQgdGhlIHRpbWUgd2hlbiB0aGV5IGFyZSBleGVjdXRhYmxlLlxuICAgICAgICBsYXp5UXVldWUgPSBMYXp5Q29tbWFuZEV4ZWN1dG9yKHRoYXQsIFtcbiAgICAgICAgICAgICdsb2FkJywncGxheScsJ3BhdXNlJywnc2VlaycsJ3N0b3AnLCAnZ2V0RHVyYXRpb24nLCAnZ2V0UG9zaXRpb24nLCAnZ2V0Vm9sdW1lJ1xuICAgICAgICAgICAgLCAnZ2V0TXV0ZScsICdnZXRCdWZmZXInLCAnZ2V0U3RhdGUnICwgJ2dldFF1YWxpdHlMZXZlbHMnXG4gICAgICAgIF0pO1xuICAgICAgICBvcHRpb25zLm1lZGlhQ29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICBvcHRpb25zLmJyb3dzZXIgPSB1c2VyQWdlbnRPYmplY3Q7XG4gICAgICAgIHBsYXllckNvbmZpZyA9IENvbmZpZ3VyYXRvcihvcHRpb25zLCB0aGF0KTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaW5pdCgpXCIpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpbml0KCkgY29uZmlnIDogXCIsIHBsYXllckNvbmZpZyk7XG5cbiAgICAgICAgcGxheWxpc3RNYW5hZ2VyLmluaXRQbGF5bGlzdChwbGF5ZXJDb25maWcuZ2V0UGxheWxpc3QoKSk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGluaXQoKSBzb3VyY2VzIDogXCIgLCBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKSk7XG5cbiAgICAgICAgaW5pdFByb3ZpZGVyKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldFByb3ZpZGVyTmFtZSA9ICgpID0+IHtcbiAgICAgICAgaWYoY3VycmVudFByb3ZpZGVyKXtcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0TmFtZSgpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgdGhhdC5nZXRDb25maWcgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldENvbmZpZygpXCIsIHBsYXllckNvbmZpZy5nZXRDb25maWcoKSk7XG4gICAgICAgIHJldHVybiBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldEJyb3dzZXIgPSAoKSA9PiB7XG5cbiAgICAgICAgcmV0dXJuIHBsYXllckNvbmZpZy5nZXRCcm93c2VyKCk7XG4gICAgfTtcbiAgICB0aGF0LnNldFRpbWVjb2RlTW9kZSA9IChpc1Nob3cpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRUaW1lY29kZU1vZGUoKVwiLCBpc1Nob3cpO1xuICAgICAgICBwbGF5ZXJDb25maWcuc2V0VGltZWNvZGVNb2RlKGlzU2hvdyk7XG4gICAgfTtcbiAgICB0aGF0LmlzVGltZWNvZGVNb2RlID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpc1RpbWVjb2RlTW9kZSgpXCIpO1xuICAgICAgICByZXR1cm4gcGxheWVyQ29uZmlnLmlzVGltZWNvZGVNb2RlKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldEZyYW1lcmF0ZSA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0RnJhbWVyYXRlKClcIik7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0RnJhbWVyYXRlKCk7XG4gICAgfTtcbiAgICB0aGF0LnNlZWtGcmFtZSA9IChmcmFtZUNvdW50KSA9PiB7XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2Vla0ZyYW1lKClcIiwgZnJhbWVDb3VudCk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2Vla0ZyYW1lKGZyYW1lQ291bnQpO1xuICAgIH07XG5cbiAgICB0aGF0LmdldER1cmF0aW9uID0gKCkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldER1cmF0aW9uKClcIiwgY3VycmVudFByb3ZpZGVyLmdldER1cmF0aW9uKCkpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldER1cmF0aW9uKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldFBvc2l0aW9uID0gKCkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0UG9zaXRpb24oKVwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0UG9zaXRpb24oKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0UG9zaXRpb24oKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Vm9sdW1lID0gKCkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Vm9sdW1lKClcIiwgY3VycmVudFByb3ZpZGVyLmdldFZvbHVtZSgpKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRWb2x1bWUoKTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Vm9sdW1lID0gKHZvbHVtZSkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Vm9sdW1lKCkgXCIgKyB2b2x1bWUpO1xuICAgICAgICBjdXJyZW50UHJvdmlkZXIuc2V0Vm9sdW1lKHZvbHVtZSk7XG4gICAgfTtcbiAgICB0aGF0LnNldE11dGUgPSAoc3RhdGUpID0+IHtcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldE11dGUoKSBcIiArIHN0YXRlKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5zZXRNdXRlKHN0YXRlKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0TXV0ZSA9ICgpID0+IHtcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldE11dGUoKSBcIiArIGN1cnJlbnRQcm92aWRlci5nZXRNdXRlKCkpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldE11dGUoKTtcbiAgICB9O1xuICAgIHRoYXQubG9hZCA9IChwbGF5bGlzdCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBsb2FkKCkgXCIsIHBsYXlsaXN0KTtcbiAgICAgICAgbGF6eVF1ZXVlID0gTGF6eUNvbW1hbmRFeGVjdXRvcih0aGF0LCBbJ3BsYXknLCdzZWVrJywnc3RvcCddKTtcblxuICAgICAgICBpZihwbGF5bGlzdCl7XG4gICAgICAgICAgICBpZihjdXJyZW50UHJvdmlkZXIpe1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5zZXRDdXJyZW50UXVhbGl0eSgwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBsYXlsaXN0TWFuYWdlci5pbml0UGxheWxpc3QocGxheWxpc3QpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbml0UHJvdmlkZXIoKTtcblxuICAgIH07XG4gICAgdGhhdC5wbGF5ID0gKCkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHBsYXkoKSBcIik7XG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5wbGF5KCk7XG4gICAgfVxuICAgIHRoYXQucGF1c2UgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBwYXVzZSgpIFwiKTtcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnBhdXNlKCk7XG4gICAgfTtcbiAgICB0aGF0LnNlZWsgPSAocG9zaXRpb24pID0+IHtcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNlZWsoKSBcIisgcG9zaXRpb24pO1xuICAgICAgICBjdXJyZW50UHJvdmlkZXIuc2Vlayhwb3NpdGlvbik7XG4gICAgfTtcbiAgICB0aGF0LnNldFBsYXliYWNrUmF0ZSA9IChwbGF5YmFja1JhdGUpID0+e1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0UGxheWJhY2tSYXRlKCkgXCIsIHBsYXliYWNrUmF0ZSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2V0UGxheWJhY2tSYXRlKHBsYXllckNvbmZpZy5zZXRQbGF5YmFja1JhdGUocGxheWJhY2tSYXRlKSk7XG4gICAgfTtcbiAgICB0aGF0LmdldFBsYXliYWNrUmF0ZSA9ICgpID0+e1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0UGxheWJhY2tSYXRlKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRQbGF5YmFja1JhdGUoKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0UGxheWJhY2tSYXRlKCk7XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0UGxheWxpc3QgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFBsYXlsaXN0KCkgXCIsIHBsYXlsaXN0TWFuYWdlci5nZXRQbGF5bGlzdCgpKTtcbiAgICAgICAgcmV0dXJuIHBsYXlsaXN0TWFuYWdlci5nZXRQbGF5bGlzdCgpO1xuICAgIH07XG4gICAgdGhhdC5nZXRDdXJyZW50UGxheWxpc3QgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEN1cnJlbnRQbGF5bGlzdCgpIFwiLCBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFBsYXlsaXN0SW5kZXgoKSk7XG4gICAgICAgIHJldHVybiBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFBsYXlsaXN0SW5kZXgoKTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Q3VycmVudFBsYXlsaXN0ID0gKGluZGV4KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEN1cnJlbnRQbGF5bGlzdCgpIFwiLCBpbmRleCk7XG4gICAgICAgIHJ1bk5leHRQbGF5bGlzdChpbmRleCk7XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0U291cmNlcyA9ICgpID0+IHtcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFNvdXJjZXMoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldFNvdXJjZXMoKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0U291cmNlcygpO1xuICAgIH07XG4gICAgdGhhdC5nZXRDdXJyZW50U291cmNlID0gKCkgPT57XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRDdXJyZW50U291cmNlKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRDdXJyZW50U291cmNlKCkpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldEN1cnJlbnRTb3VyY2UoKTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Q3VycmVudFNvdXJjZSA9IChpbmRleCkgPT57XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRDdXJyZW50U291cmNlKCkgXCIsIGluZGV4KTtcblxuICAgICAgICBsZXQgc291cmNlcyA9IGN1cnJlbnRQcm92aWRlci5nZXRTb3VyY2VzKCk7XG4gICAgICAgIGxldCBjdXJyZW50U291cmNlID0gc291cmNlc1tjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFNvdXJjZSgpXTtcbiAgICAgICAgbGV0IG5ld1NvdXJjZSA9IHNvdXJjZXNbaW5kZXhdO1xuICAgICAgICBsZXQgbGFzdFBsYXlQb3NpdGlvbiA9IGN1cnJlbnRQcm92aWRlci5nZXRQb3NpdGlvbigpO1xuICAgICAgICBsZXQgaXNTYW1lUHJvdmlkZXIgPSBwcm92aWRlckNvbnRyb2xsZXIuaXNTYW1lUHJvdmlkZXIoY3VycmVudFNvdXJjZSwgbmV3U291cmNlKTtcbiAgICAgICAgLy8gcHJvdmlkZXIuc2VyQ3VycmVudFF1YWxpdHkgLT4gcGxheWVyQ29uZmlnIHNldHRpbmcgLT4gbG9hZFxuICAgICAgICBsZXQgcmVzdWx0U291cmNlSW5kZXggPSBjdXJyZW50UHJvdmlkZXIuc2V0Q3VycmVudFNvdXJjZShpbmRleCwgaXNTYW1lUHJvdmlkZXIpO1xuXG4gICAgICAgIGlmKCFuZXdTb3VyY2Upe1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRDdXJyZW50UXVhbGl0eSgpIGlzU2FtZVByb3ZpZGVyXCIsIGlzU2FtZVByb3ZpZGVyKTtcblxuXG4gICAgICAgIC8vc3dpdGNoaW5nIGJldHdlZW4gc3RyZWFtcyBvbiBITFMuIHd0aD8gaHR0cHM6Ly92aWRlby1kZXYuZ2l0aHViLmlvL2hscy5qcy9sYXRlc3QvZG9jcy9BUEkuaHRtbCNmaW5hbC1zdGVwLWRlc3Ryb3lpbmctc3dpdGNoaW5nLWJldHdlZW4tc3RyZWFtc1xuICAgICAgICBpZighaXNTYW1lUHJvdmlkZXIgfHwgY3VycmVudFByb3ZpZGVyLmdldE5hbWUoKSA9PT0gUFJPVklERVJfSExTKXtcbiAgICAgICAgICAgIGxhenlRdWV1ZSA9IExhenlDb21tYW5kRXhlY3V0b3IodGhhdCwgWydwbGF5Jywnc2VlayddKTtcbiAgICAgICAgICAgIGluaXRQcm92aWRlcihsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHRTb3VyY2VJbmRleDtcbiAgICB9O1xuXG5cblxuICAgIHRoYXQuZ2V0UXVhbGl0eUxldmVscyA9ICgpID0+e1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0UXVhbGl0eUxldmVscygpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0UXVhbGl0eUxldmVscygpKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRRdWFsaXR5TGV2ZWxzKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldEN1cnJlbnRRdWFsaXR5ID0gKCkgPT57XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRDdXJyZW50UXVhbGl0eSgpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFF1YWxpdHkoKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFF1YWxpdHkoKTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Q3VycmVudFF1YWxpdHkgPSAocXVhbGl0eUluZGV4KSA9PntcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEN1cnJlbnRRdWFsaXR5KCkgXCIsIHF1YWxpdHlJbmRleCk7XG5cbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5zZXRDdXJyZW50UXVhbGl0eShxdWFsaXR5SW5kZXgpO1xuICAgIH07XG4gICAgdGhhdC5pc0F1dG9RdWFsaXR5ID0gKCkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaXNBdXRvUXVhbGl0eSgpXCIpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmlzQXV0b1F1YWxpdHkoKTtcbiAgICB9O1xuICAgIHRoYXQuc2V0QXV0b1F1YWxpdHkgPSAoaXNBdXRvKSA9PiB7XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRBdXRvUXVhbGl0eSgpIFwiLCBpc0F1dG8pO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLnNldEF1dG9RdWFsaXR5KGlzQXV0byk7XG4gICAgfVxuXG4gICAgdGhhdC5nZXRDYXB0aW9uTGlzdCA9ICgpID0+IHtcbiAgICAgICAgaWYoIWNhcHRpb25NYW5hZ2VyKXtyZXR1cm4gbnVsbDt9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldENhcHRpb25MaXN0KCkgXCIsIGNhcHRpb25NYW5hZ2VyLmdldENhcHRpb25MaXN0KCkpO1xuICAgICAgICByZXR1cm4gY2FwdGlvbk1hbmFnZXIuZ2V0Q2FwdGlvbkxpc3QoKTtcbiAgICB9XG4gICAgdGhhdC5nZXRDdXJyZW50Q2FwdGlvbiA9ICgpID0+IHtcbiAgICAgICAgaWYoIWNhcHRpb25NYW5hZ2VyKXtyZXR1cm4gbnVsbDt9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEN1cnJlbnRDYXB0aW9uKCkgXCIsIGNhcHRpb25NYW5hZ2VyLmdldEN1cnJlbnRDYXB0aW9uKCkpO1xuICAgICAgICByZXR1cm4gY2FwdGlvbk1hbmFnZXIuZ2V0Q3VycmVudENhcHRpb24oKTtcbiAgICB9XG4gICAgdGhhdC5zZXRDdXJyZW50Q2FwdGlvbiA9IChpbmRleCkgPT4ge1xuICAgICAgICBpZighY2FwdGlvbk1hbmFnZXIpe3JldHVybiBudWxsO31cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Q3VycmVudENhcHRpb24oKSBcIiwgaW5kZXgpO1xuICAgICAgICBjYXB0aW9uTWFuYWdlci5zZXRDdXJyZW50Q2FwdGlvbihpbmRleCk7XG4gICAgfVxuICAgIHRoYXQuYWRkQ2FwdGlvbiA9ICh0cmFjaykgPT4ge1xuICAgICAgICBpZighY2FwdGlvbk1hbmFnZXIpe3JldHVybiBudWxsO31cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogYWRkQ2FwdGlvbigpIFwiKVxuICAgICAgICByZXR1cm4gY2FwdGlvbk1hbmFnZXIuYWRkQ2FwdGlvbih0cmFjayk7XG4gICAgfVxuICAgIHRoYXQucmVtb3ZlQ2FwdGlvbiA9IChpbmRleCkgPT4ge1xuICAgICAgICBpZighY2FwdGlvbk1hbmFnZXIpe3JldHVybiBudWxsO31cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcmVtb3ZlQ2FwdGlvbigpIFwiLCBpbmRleClcbiAgICAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLnJlbW92ZUNhcHRpb24oaW5kZXgpO1xuICAgIH1cblxuICAgIHRoYXQuZ2V0QnVmZmVyID0gKCkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEJ1ZmZlcigpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0QnVmZmVyKCkpO1xuICAgICAgICBjdXJyZW50UHJvdmlkZXIuZ2V0QnVmZmVyKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldFN0YXRlID0gKCkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFN0YXRlKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRTdGF0ZSgpKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRTdGF0ZSgpO1xuICAgIH07XG4gICAgdGhhdC5zdG9wID0gKCkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc3RvcCgpIFwiKTtcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnN0b3AoKTtcbiAgICB9O1xuICAgIHRoYXQucmVtb3ZlID0gKCkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcmVtb3ZlKCkgXCIpO1xuICAgICAgICBsYXp5UXVldWUuZGVzdHJveSgpO1xuICAgICAgICBpZihjYXB0aW9uTWFuYWdlcil7XG4gICAgICAgICAgICBjYXB0aW9uTWFuYWdlci5kZXN0cm95KCk7XG4gICAgICAgICAgICBjYXB0aW9uTWFuYWdlciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZihjdXJyZW50UHJvdmlkZXIpe1xuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZihtZWRpYU1hbmFnZXIpe1xuICAgICAgICAgICAgbWVkaWFNYW5hZ2VyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIG1lZGlhTWFuYWdlciA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcHJvdmlkZXJDb250cm9sbGVyID0gbnVsbDtcbiAgICAgICAgcGxheWxpc3RNYW5hZ2VyID0gbnVsbDtcbiAgICAgICAgcGxheWVyQ29uZmlnID0gbnVsbDtcbiAgICAgICAgbGF6eVF1ZXVlID0gbnVsbDtcblxuICAgICAgICB0aGF0LnRyaWdnZXIoREVTVFJPWSk7XG4gICAgICAgIHRoYXQub2ZmKCk7XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcmVtb3ZlKCkgLSBsYXp5UXVldWUsIGN1cnJlbnRQcm92aWRlciwgcHJvdmlkZXJDb250cm9sbGVyLCBwbGF5bGlzdE1hbmFnZXIsIHBsYXllckNvbmZpZywgYXBpIGV2ZW50IGRlc3Ryb2VkLiBcIik7XG4gICAgICAgIE92ZW5QbGF5ZXJTREsucmVtb3ZlUGxheWVyKHRoYXQuZ2V0Q29udGFpbmVySWQoKSk7XG4gICAgICAgIGlmKE92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyTGlzdCgpLmxlbmd0aCAgPT09IDApe1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiT3ZlblBsYXllclNESy5wbGF5ZXJMaXN0XCIsICBPdmVuUGxheWVyU0RLLmdldFBsYXllckxpc3QoKSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhhdC5nZXRWZXJzaW9uID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gXCJ2LlwiK3ZlcnNpb247XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuXG5cbmV4cG9ydCBkZWZhdWx0IEFwaTtcblxuXG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyNC4uXG4gKi9cblxuZXhwb3J0IGNvbnN0IEFwaVJ0bXBFeHBhbnNpb24gPSBmdW5jdGlvbihjdXJyZW50UHJvdmlkZXIpe1xuICAgIHJldHVybiB7XG4gICAgICAgIGV4dGVybmFsQ2FsbGJhY2tDcmVlcCA6IChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGlmKHJlc3VsdC5uYW1lICYmIHJlc3VsdC5kYXRhKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLnRyaWdnZXJFdmVudEZyb21FeHRlcm5hbChyZXN1bHQubmFtZSwgcmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufTtcbiIsImltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XG5cbmltcG9ydCB7XG4gICAgQ09OVEVOVF9USU1FX01PREVfQ0hBTkdFRFxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG4vKipcbiAqIEBicmllZiAgIFRoaXMgaW5pdGlhbGl6ZXMgdGhlIGlucHV0IG9wdGlvbnMuXG4gKiBAcGFyYW0gICBvcHRpb25zXG4gKlxuICogKi9cbmNvbnN0IENvbmZpZ3VyYXRvciA9IGZ1bmN0aW9uKG9wdGlvbnMsIHByb3ZpZGVyKXtcblxuICAgIGNvbnN0IGNvbXBvc2VTb3VyY2VPcHRpb25zID0gZnVuY3Rpb24ob3B0aW9ucyl7XG4gICAgICAgIGNvbnN0IERlZmF1bHRzID0ge1xuICAgICAgICAgICAgbWVkaWFDb250YWluZXIgOiBcIlwiLFxuICAgICAgICAgICAgcGxheWJhY2tSYXRlczogWzIsIDEuNSwgMSwgMC41LCAwLjI1XSxcbiAgICAgICAgICAgIHBsYXliYWNrUmF0ZTogMSxcbiAgICAgICAgICAgIG11dGU6IGZhbHNlLFxuICAgICAgICAgICAgdm9sdW1lOiAxMDAsXG4gICAgICAgICAgICBsb29wIDogZmFsc2UsXG4gICAgICAgICAgICBjb250cm9scyA6IHRydWUsXG4gICAgICAgICAgICBhdXRvU3RhcnQgOiBmYWxzZSxcbiAgICAgICAgICAgIHRpbWVjb2RlIDogdHJ1ZSxcbiAgICAgICAgICAgIHNvdXJjZUluZGV4IDogMCxcbiAgICAgICAgICAgIGJyb3dzZXIgOiBcIlwiLFxuICAgICAgICAgICAgaGlkZVBsYXlsaXN0SWNvbiA6IGZhbHNlLFxuICAgICAgICAgICAgcnRtcEJ1ZmZlclRpbWUgOiAxLFxuICAgICAgICAgICAgcnRtcEJ1ZmZlclRpbWVNYXggOiAzLFxuICAgICAgICAgICAgYWRDbGllbnQgOiBcImdvb2dsZWltYVwiXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHNlcmlhbGl6ZSA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnICYmIHZhbC5sZW5ndGggPCA2KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbG93ZXJjYXNlVmFsID0gdmFsLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgaWYgKGxvd2VyY2FzZVZhbCA9PT0gJ3RydWUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobG93ZXJjYXNlVmFsID09PSAnZmFsc2UnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFpc05hTihOdW1iZXIodmFsKSkgJiYgIWlzTmFOKHBhcnNlRmxvYXQodmFsKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE51bWJlcih2YWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGVzZXJpYWxpemUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gJ2lkJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9wdGlvbnNba2V5XSA9IHNlcmlhbGl6ZShvcHRpb25zW2tleV0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBkZXNlcmlhbGl6ZShvcHRpb25zKTtcbiAgICAgICAgbGV0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIERlZmF1bHRzLCBvcHRpb25zKTtcblxuICAgICAgICBsZXQgcGxheWJhY2tSYXRlcyA9IGNvbmZpZy5wbGF5YmFja1JhdGVzO1xuXG4gICAgICAgIHBsYXliYWNrUmF0ZXMgPSBwbGF5YmFja1JhdGVzLmZpbHRlcihyYXRlID0+IF8uaXNOdW1iZXIocmF0ZSkgJiYgcmF0ZSA+PSAwLjI1ICYmIHJhdGUgPD0gNCkubWFwKHJhdGUgPT4gTWF0aC5yb3VuZChyYXRlICogNCkgLyA0KTtcblxuICAgICAgICBpZiAocGxheWJhY2tSYXRlcy5pbmRleE9mKDEpIDwgMCkge1xuICAgICAgICAgICAgcGxheWJhY2tSYXRlcy5wdXNoKDEpO1xuICAgICAgICB9XG4gICAgICAgIHBsYXliYWNrUmF0ZXMuc29ydCgpO1xuXG4gICAgICAgIGNvbmZpZy5wbGF5YmFja1JhdGVzID0gcGxheWJhY2tSYXRlcztcblxuICAgICAgICBjb25maWcucnRtcEJ1ZmZlclRpbWUgPSBjb25maWcucnRtcEJ1ZmZlclRpbWUgPiAxMCA/IDEwIDogY29uZmlnLnJ0bXBCdWZmZXJUaW1lO1xuICAgICAgICBjb25maWcucnRtcEJ1ZmZlclRpbWVNYXggPSBjb25maWcucnRtcEJ1ZmZlclRpbWVNYXggPiA1MCA/IDUwIDogY29uZmlnLnJ0bXBCdWZmZXJUaW1lTWF4O1xuXG5cbiAgICAgICAgaWYgKGNvbmZpZy5wbGF5YmFja1JhdGVzLmluZGV4T2YoY29uZmlnLnBsYXliYWNrUmF0ZSkgPCAwKSB7XG4gICAgICAgICAgICBjb25maWcucGxheWJhY2tSYXRlID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbmZpZ1BsYXlsaXN0ID0gY29uZmlnLnBsYXlsaXN0O1xuICAgICAgICBpZiAoIWNvbmZpZ1BsYXlsaXN0KSB7XG4gICAgICAgICAgICBjb25zdCBvYmogPSBfLnBpY2soY29uZmlnLCBbXG4gICAgICAgICAgICAgICAgJ3RpdGxlJyxcbiAgICAgICAgICAgICAgICAnZGVzY3JpcHRpb24nLFxuICAgICAgICAgICAgICAgICd0eXBlJyxcbiAgICAgICAgICAgICAgICAnaW1hZ2UnLFxuICAgICAgICAgICAgICAgICdmaWxlJyxcbiAgICAgICAgICAgICAgICAnc291cmNlcycsXG4gICAgICAgICAgICAgICAgJ3RyYWNrcycsXG4gICAgICAgICAgICAgICAgJ2hvc3QnLFxuICAgICAgICAgICAgICAgICdhcHBsaWNhdGlvbicsXG4gICAgICAgICAgICAgICAgJ3N0cmVhbScsXG4gICAgICAgICAgICAgICAgJ2FkVGFnVXJsJ1xuICAgICAgICAgICAgXSk7XG5cbiAgICAgICAgICAgIGNvbmZpZy5wbGF5bGlzdCA9IFsgb2JqIF07XG4gICAgICAgIH0gZWxzZSBpZiAoXy5pc0FycmF5KGNvbmZpZ1BsYXlsaXN0LnBsYXlsaXN0KSkge1xuICAgICAgICAgICAgY29uZmlnLmZlZWREYXRhID0gY29uZmlnUGxheWxpc3Q7XG4gICAgICAgICAgICBjb25maWcucGxheWxpc3QgPSBjb25maWdQbGF5bGlzdC5wbGF5bGlzdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGRlbGV0ZSBjb25maWcuZHVyYXRpb247XG4gICAgICAgIHJldHVybiBjb25maWc7XG4gICAgfTtcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDb25maWd1cmF0b3IgbG9hZGVkLlwiLCBvcHRpb25zKTtcbiAgICBsZXQgc3BlYyA9IGNvbXBvc2VTb3VyY2VPcHRpb25zKG9wdGlvbnMpO1xuXG4gICAgLy9zcGVjLmlzRnVsbHNjcmVlbiA9IGZhbHNlOyAvL0lFIDExIGNhbid0IGNoZWNrIGN1cnJlbnQgZnVsbHNjcmVlbiBzdGF0ZS5cblxuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICB0aGF0LmdldENvbmZpZyA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWM7XG4gICAgfTtcbiAgICB0aGF0LmdldEFkQ2xpZW50ID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5hZENsaWVudDtcbiAgICB9O1xuICAgIHRoYXQuc2V0Q29uZmlnID0gKGNvbmZpZywgdmFsdWUpID0+IHtcbiAgICAgICAgc3BlY1tjb25maWddID0gdmFsdWU7XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0Q29udGFpbmVyID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5tZWRpYUNvbnRhaW5lcjtcbiAgICB9O1xuICAgIC8qdGhhdC5pc0Z1bGxzY3JlZW4gPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmlzRnVsbHNjcmVlbjtcbiAgICB9XG4gICAgdGhhdC5zZXRGdWxsc2NyZWVuID0gKGlzRnVsbHNjcmVlbikgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5pc0Z1bGxzY3JlZW4gPSBpc0Z1bGxzY3JlZW47XG4gICAgfSovXG5cbiAgICB0aGF0LmdldFBsYXliYWNrUmF0ZSA9KCk9PntcbiAgICAgICAgcmV0dXJuIHNwZWMucGxheWJhY2tSYXRlO1xuICAgIH07XG4gICAgdGhhdC5zZXRQbGF5YmFja1JhdGUgPShwbGF5YmFja1JhdGUpPT57XG4gICAgICAgIHNwZWMucGxheWJhY2tSYXRlID0gcGxheWJhY2tSYXRlO1xuICAgICAgICByZXR1cm4gcGxheWJhY2tSYXRlO1xuICAgIH07XG5cbiAgICB0aGF0LmdldFF1YWxpdHlMYWJlbCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMucXVhbGl0eUxhYmVsO1xuICAgIH07XG4gICAgdGhhdC5zZXRRdWFsaXR5TGFiZWwgPSAobmV3TGFiZWwpID0+IHtcbiAgICAgICAgc3BlYy5xdWFsaXR5TGFiZWwgPSBuZXdMYWJlbDtcbiAgICB9O1xuXG4gICAgLyp0aGF0LmdldFNvdXJjZUxhYmVsID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5zb3VyY2VMYWJlbDtcbiAgICB9O1xuICAgIHRoYXQuc2V0U291cmNlTGFiZWwgPSAobmV3TGFiZWwpID0+IHtcbiAgICAgICAgc3BlYy5zb3VyY2VMYWJlbCA9IG5ld0xhYmVsO1xuICAgIH07Ki9cblxuICAgIHRoYXQuZ2V0U291cmNlSW5kZXggPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLnNvdXJjZUluZGV4O1xuICAgIH07XG4gICAgdGhhdC5zZXRTb3VyY2VJbmRleCA9IChpbmRleCkgPT4ge1xuICAgICAgICBzcGVjLnNvdXJjZUluZGV4ID0gaW5kZXg7XG4gICAgfTtcbiAgICB0aGF0LnNldFRpbWVjb2RlTW9kZSA9ICh0aW1lY29kZSkgPT4ge1xuICAgICAgICBpZihzcGVjLnRpbWVjb2RlICE9PSB0aW1lY29kZSl7XG4gICAgICAgICAgICBzcGVjLnRpbWVjb2RlID0gdGltZWNvZGU7XG4gICAgICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfVElNRV9NT0RFX0NIQU5HRUQsIHRpbWVjb2RlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhhdC5pc1RpbWVjb2RlTW9kZSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMudGltZWNvZGU7XG4gICAgfTtcbiAgICB0aGF0LmdldFJ0bXBCdWZmZXJUaW1lID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5ydG1wQnVmZmVyVGltZTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0UnRtcEJ1ZmZlclRpbWVNYXggPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLnJ0bXBCdWZmZXJUaW1lTWF4O1xuICAgIH07XG5cbiAgICB0aGF0LmlzTXV0ZSA9ICgpID0+e1xuICAgICAgICByZXR1cm4gc3BlYy5tdXRlO1xuICAgIH07XG4gICAgdGhhdC5nZXRWb2x1bWUgPSAoKSA9PntcbiAgICAgICAgcmV0dXJuIHNwZWMudm9sdW1lO1xuICAgIH07XG4gICAgdGhhdC5zZXRWb2x1bWUgPSAodm9sdW1lKSA9PntcbiAgICAgICAgc3BlYy52b2x1bWUgPSB2b2x1bWU7XG4gICAgfTtcbiAgICB0aGF0LmlzTG9vcCA9ICgpID0+e1xuICAgICAgICByZXR1cm4gc3BlYy5sb29wO1xuICAgIH07XG4gICAgdGhhdC5pc0F1dG9TdGFydCA9ICgpID0+e1xuICAgICAgICByZXR1cm4gc3BlYy5hdXRvU3RhcnQ7XG4gICAgfTtcbiAgICB0aGF0LmlzQ29udHJvbHMgPSAoKSA9PntcbiAgICAgICAgcmV0dXJuIHNwZWMuY29udHJvbHM7XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0UGxheWJhY2tSYXRlcyA9KCk9PntcbiAgICAgICAgcmV0dXJuIHNwZWMucGxheWJhY2tSYXRlcztcbiAgICB9O1xuICAgIHRoYXQuZ2V0QnJvd3NlciA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuYnJvd3NlcjtcbiAgICB9O1xuXG4gICAgdGhhdC5nZXRQbGF5bGlzdCA9KCk9PntcbiAgICAgICAgcmV0dXJuIHNwZWMucGxheWxpc3Q7XG4gICAgfTtcbiAgICB0aGF0LnNldFBsYXlsaXN0ID0ocGxheWxpc3QpPT57XG4gICAgICAgIGlmKF8uaXNBcnJheShwbGF5bGlzdCkpe1xuICAgICAgICAgICAgc3BlYy5wbGF5bGlzdCA9IHBsYXlsaXN0O1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHNwZWMucGxheWxpc3QgPSBbcGxheWxpc3RdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcGVjLnBsYXlsaXN0O1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbmZpZ3VyYXRvcjtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDMuLlxuICovXG5cbi8qKlxuICogQGJyaWVmICAgVGhpcyBtb2R1bGUgcHJvdmlkZSBjdXN0b20gZXZlbnRzLlxuICogQHBhcmFtICAgb2JqZWN0ICAgIEFuIG9iamVjdCB0aGF0IHJlcXVpcmVzIGN1c3RvbSBldmVudHMuXG4gKlxuICogKi9cblxuY29uc3QgRXZlbnRFbWl0dGVyID0gZnVuY3Rpb24ob2JqZWN0KXtcbiAgICBsZXQgdGhhdCA9IG9iamVjdDtcbiAgICBsZXQgX2V2ZW50cyA9W107XG5cbiAgICBjb25zdCB0cmlnZ2VyRXZlbnRzID0gZnVuY3Rpb24oZXZlbnRzLCBhcmdzLCBjb250ZXh0KXtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBsZXQgbGVuZ3RoID0gZXZlbnRzLmxlbmd0aDtcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgbGVuZ3RoOyBpICsrKXtcbiAgICAgICAgICAgIGxldCBldmVudCA9IGV2ZW50c1tpXTtcbiAgICAgICAgICAgIGV2ZW50Lmxpc3RlbmVyLmFwcGx5KCAoIGV2ZW50LmNvbnRleHQgfHwgY29udGV4dCApLCBhcmdzKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0Lm9uID0gZnVuY3Rpb24obmFtZSwgbGlzdGVuZXIsIGNvbnRleHQpe1xuICAgICAgICAoX2V2ZW50c1tuYW1lXSB8fCAoX2V2ZW50c1tuYW1lXT1bXSkgKS5wdXNoKHsgbGlzdGVuZXI6IGxpc3RlbmVyICAsIGNvbnRleHQgOiBjb250ZXh0fSk7XG4gICAgICAgIHJldHVybiB0aGF0O1xuICAgIH07XG4gICAgdGhhdC50cmlnZ2VyID0gZnVuY3Rpb24obmFtZSl7XG4gICAgICAgIGlmKCFfZXZlbnRzKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICBjb25zdCBldmVudHMgPSBfZXZlbnRzW25hbWVdO1xuICAgICAgICBjb25zdCBhbGxFdmVudHMgPSBfZXZlbnRzLmFsbDtcblxuICAgICAgICBpZihldmVudHMpe1xuICAgICAgICAgICAgdHJpZ2dlckV2ZW50cyhldmVudHMsIGFyZ3MsIHRoYXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmKGFsbEV2ZW50cyl7XG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnRzKGFsbEV2ZW50cywgYXJndW1lbnRzLCB0aGF0KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhhdC5vZmYgPSBmdW5jdGlvbihuYW1lLCBsaXN0ZW5lciwgY29udGV4dCl7XG4gICAgICAgIGlmKCFfZXZlbnRzKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghbmFtZSAmJiAhbGlzdGVuZXIgJiYgIWNvbnRleHQpICB7XG4gICAgICAgICAgICBfZXZlbnRzID0gW107XG4gICAgICAgICAgICByZXR1cm4gdGhhdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5hbWVzID0gbmFtZSA/IFtuYW1lXSA6IE9iamVjdC5rZXlzKF9ldmVudHMpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gbmFtZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBuYW1lID0gbmFtZXNbaV07XG4gICAgICAgICAgICBjb25zdCBldmVudHMgPSBfZXZlbnRzW25hbWVdO1xuICAgICAgICAgICAgaWYgKGV2ZW50cykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJldGFpbiA9IF9ldmVudHNbbmFtZV0gPSBbXTtcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIgIHx8IGNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDAsIGsgPSBldmVudHMubGVuZ3RoOyBqIDwgazsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBldmVudCA9IGV2ZW50c1tqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgobGlzdGVuZXIgJiYgbGlzdGVuZXIgIT09IGV2ZW50Lmxpc3RlbmVyICYmIGxpc3RlbmVyICE9PSBldmVudC5saXN0ZW5lci5saXN0ZW5lciAgJiYgbGlzdGVuZXIgIT09IGV2ZW50Lmxpc3RlbmVyLl9saXN0ZW5lcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fChjb250ZXh0ICYmIGNvbnRleHQgIT09IGV2ZW50LmNvbnRleHQpXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXRhaW4ucHVzaChldmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFyZXRhaW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBfZXZlbnRzW25hbWVdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhhdDtcbiAgICB9O1xuICAgIHRoYXQub25jZSA9IGZ1bmN0aW9uKG5hbWUsIGxpc3RlbmVyLCBjb250ZXh0KXtcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgY29uc3Qgb25jZUNhbGxiYWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoY291bnQrKykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoYXQub2ZmKG5hbWUsIG9uY2VDYWxsYmFjayk7XG4gICAgICAgICAgICBsaXN0ZW5lci5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgICAgICBvbmNlQ2FsbGJhY2suX2xpc3RlbmVyID0gbGlzdGVuZXI7XG4gICAgICAgIHJldHVybiB0aGF0Lm9uKG5hbWUsIG9uY2VDYWxsYmFjaywgY29udGV4dCk7XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBFdmVudEVtaXR0ZXI7XG4iLCJpbXBvcnQgXyBmcm9tICd1dGlscy91bmRlcnNjb3JlJztcblxuLyoqXG4gKiBAYnJpZWYgICBUaGlzIGV4ZWN1dGVzIHRoZSBpbnB1dCBjb21tYW5kcyBhdCBhIHNwZWNpZmljIHBvaW50IGluIHRpbWUuXG4gKiBAcGFyYW0gICBpbnN0YW5jZVxuICogQHBhcmFtICAgcXVldWVkQ29tbWFuZHNcbiAqICovXG5jb25zdCBMYXp5Q29tbWFuZEV4ZWN1dG9yID0gZnVuY3Rpb24gKGluc3RhbmNlLCBxdWV1ZWRDb21tYW5kcykge1xuICAgIGxldCBjb21tYW5kUXVldWUgPSBbXTtcbiAgICBsZXQgdW5kZWNvcmF0ZWRNZXRob2RzID0ge307XG4gICAgbGV0IGV4ZWN1dGVNb2RlID0gZmFsc2U7XG4gICAgbGV0IHRoYXQgPSB7fTtcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIGxvYWRlZC5cIik7XG4gICAgcXVldWVkQ29tbWFuZHMuZm9yRWFjaCgoY29tbWFuZCkgPT4ge1xuICAgICAgICBjb25zdCBtZXRob2QgPSBpbnN0YW5jZVtjb21tYW5kXTtcbiAgICAgICAgdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdID0gbWV0aG9kIHx8IGZ1bmN0aW9uKCl7fTtcblxuICAgICAgICBpbnN0YW5jZVtjb21tYW5kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc3QgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgICAgICAgICAgIGlmICghZXhlY3V0ZU1vZGUpIHtcbiAgICAgICAgICAgICAgICAvL2NvbW1hbmRRdWV1ZS5wdXNoKHsgY29tbWFuZCwgYXJncyB9KTtcbiAgICAgICAgICAgICAgICB0aGF0LmFkZFF1ZXVlKGNvbW1hbmQsIGFyZ3MpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGV4ZWN1dGVRdWV1ZWRDb21tYW5kcygpO1xuICAgICAgICAgICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kLmFwcGx5KHRoYXQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KTtcbiAgICB2YXIgZXhlY3V0ZVF1ZXVlZENvbW1hbmRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB3aGlsZSAoY29tbWFuZFF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHsgY29tbWFuZCwgYXJncyB9ID0gY29tbWFuZFF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICAodW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdIHx8IGluc3RhbmNlW2NvbW1hbmRdKS5hcHBseShpbnN0YW5jZSwgYXJncyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGF0LnNldEV4ZWN1dGVNb2RlID0gKG1vZGUpID0+IHtcbiAgICAgICAgZXhlY3V0ZU1vZGUgPSBtb2RlO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogc2V0RXhlY3V0ZU1vZGUoKVwiLCBtb2RlKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0VW5kZWNvcmF0ZWRNZXRob2RzID0gZnVuY3Rpb24oKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGdldFVuZGVjb3JhdGVkTWV0aG9kcygpXCIsIHVuZGVjb3JhdGVkTWV0aG9kcyk7XG4gICAgICAgIHJldHVybiB1bmRlY29yYXRlZE1ldGhvZHM7XG4gICAgfVxuICAgIHRoYXQuZ2V0UXVldWUgPSBmdW5jdGlvbigpe1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZ2V0UXVldWUoKVwiLCBnZXRRdWV1ZSk7XG4gICAgICAgIHJldHVybiBjb21tYW5kUXVldWU7XG4gICAgfVxuICAgIHRoYXQuYWRkUXVldWUgPSBmdW5jdGlvbihjb21tYW5kLCBhcmdzKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGFkZFF1ZXVlKClcIiwgY29tbWFuZCwgYXJncyk7XG4gICAgICAgIGNvbW1hbmRRdWV1ZS5wdXNoKHsgY29tbWFuZCwgYXJncyB9KTtcbiAgICB9XG5cbiAgICB0aGF0LmZsdXNoID0gZnVuY3Rpb24oKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGZsdXNoKClcIik7XG4gICAgICAgIGV4ZWN1dGVRdWV1ZWRDb21tYW5kcygpO1xuICAgIH07XG4gICAgdGhhdC5lbXB0eSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZW1wdHkoKVwiKTtcbiAgICAgICAgY29tbWFuZFF1ZXVlLmxlbmd0aCA9IDA7XG4gICAgfTtcbiAgICB0aGF0Lm9mZiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogb2ZmKClcIik7XG4gICAgICAgIHF1ZXVlZENvbW1hbmRzLmZvckVhY2goKGNvbW1hbmQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1ldGhvZCA9IHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXTtcbiAgICAgICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVtjb21tYW5kXSA9IG1ldGhvZDtcbiAgICAgICAgICAgICAgICBkZWxldGUgdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG5cbiAgICAvL1J1biBvbmNlIGF0IHRoZSBlbmRcbiAgICB0aGF0LnJlbW92ZUFuZEV4Y3V0ZU9uY2UgPSBmdW5jdGlvbihjb21tYW5kXyl7XG4gICAgICAgIGxldCBjb21tYW5kUXVldWVJdGVtID0gXy5maW5kV2hlcmUoY29tbWFuZFF1ZXVlLCB7Y29tbWFuZCA6IGNvbW1hbmRffSk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiByZW1vdmVBbmRFeGN1dGVPbmNlKClcIiwgY29tbWFuZF8pO1xuICAgICAgICBjb21tYW5kUXVldWUuc3BsaWNlKF8uZmluZEluZGV4KGNvbW1hbmRRdWV1ZSwge2NvbW1hbmQgOiBjb21tYW5kX30pLCAxKTtcblxuICAgICAgICBjb25zdCBtZXRob2QgPSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF9dO1xuICAgICAgICBpZiAobWV0aG9kKSB7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJyZW1vdmVDb21tYW5kKClcIik7XG4gICAgICAgICAgICBpZihjb21tYW5kUXVldWVJdGVtKXtcbiAgICAgICAgICAgICAgICAobWV0aG9kfHwgaW5zdGFuY2VbY29tbWFuZF9dKS5hcHBseShpbnN0YW5jZSwgY29tbWFuZFF1ZXVlSXRlbS5hcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluc3RhbmNlW2NvbW1hbmRfXSA9IG1ldGhvZDtcbiAgICAgICAgICAgIGRlbGV0ZSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF9dO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoYXQuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZGVzdHJveSgpXCIpO1xuICAgICAgICB0aGF0Lm9mZigpO1xuICAgICAgICB0aGF0LmVtcHR5KCk7XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTGF6eUNvbW1hbmRFeGVjdXRvcjsiLCJpbXBvcnQge2lzUnRtcCwgaXNXZWJSVEMsIGlzRGFzaCwgaXNIbHN9IGZyb20gXCJ1dGlscy92YWxpZGF0b3JcIjtcbmltcG9ydCB7YW5hbFVzZXJBZ2VudH0gZnJvbSBcInV0aWxzL2Jyb3dzZXJcIjtcbi8qKlxuICogQGJyaWVmICAgVGhpcyBmaW5kcyB0aGUgcHJvdmlkZXIgdGhhdCBtYXRjaGVzIHRoZSBpbnB1dCBzb3VyY2UuXG4gKiBAcGFyYW1cbiAqICovXG5cbmNvbnN0IFN1cHBvcnRDaGVja2VyID0gZnVuY3Rpb24oKXtcbiAgICBjb25zdCB0aGF0ID0ge307XG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU3VwcG9ydENoZWNrZXIgbG9hZGVkLlwiKTtcbiAgICBsZXQgdXNlckFnZW50T2JqZWN0ID0gYW5hbFVzZXJBZ2VudCgpO1xuXG4gICAgY29uc3Qgc3VwcG9ydExpc3QgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdodG1sNScsXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBNaW1lVHlwZXMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGFhYzogJ2F1ZGlvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIG1wNDogJ3ZpZGVvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIGY0djogJ3ZpZGVvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIG00djogJ3ZpZGVvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIG1vdjogJ3ZpZGVvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIG1wMzogJ2F1ZGlvL21wZWcnLFxuICAgICAgICAgICAgICAgICAgICBtcGVnOiAnYXVkaW8vbXBlZycsXG4gICAgICAgICAgICAgICAgICAgIG9ndjogJ3ZpZGVvL29nZycsXG4gICAgICAgICAgICAgICAgICAgIG9nZzogJ3ZpZGVvL29nZycsXG4gICAgICAgICAgICAgICAgICAgIG9nYTogJ3ZpZGVvL29nZycsXG4gICAgICAgICAgICAgICAgICAgIHZvcmJpczogJ3ZpZGVvL29nZycsXG4gICAgICAgICAgICAgICAgICAgIHdlYm06ICd2aWRlby93ZWJtJyxcbiAgICAgICAgICAgICAgICAgICAgZjRhOiAndmlkZW8vYWFjJyxcbiAgICAgICAgICAgICAgICAgICAgbTN1ODogJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyxcbiAgICAgICAgICAgICAgICAgICAgbTN1OiAnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnLFxuICAgICAgICAgICAgICAgICAgICBobHM6ICdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCdcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgY29uc3QgdmlkZW8gPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKVxuICAgICAgICAgICAgICAgIH0oKTtcbiAgICAgICAgICAgICAgICBpZiAoIXZpZGVvLmNhblBsYXlUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc291cmNlLnR5cGU7XG5cbiAgICAgICAgICAgICAgICBpZighdHlwZSl7cmV0dXJuIGZhbHNlO31cbiAgICAgICAgICAgICAgICBjb25zdCBtaW1lVHlwZSA9IHNvdXJjZS5taW1lVHlwZSB8fCBNaW1lVHlwZXNbdHlwZV07XG5cbiAgICAgICAgICAgICAgICBpZihpc0hscyhmaWxlLCB0eXBlKSAmJiB1c2VyQWdlbnRPYmplY3QuYnJvd3NlciA9PT0gXCJNaWNyb3NvZnQgRWRnZVwiICl7XG4gICAgICAgICAgICAgICAgICAgIC8vRWRnZSBzdXBwb3J0cyBobHMgbmF0aXZlIGJ1dCB0aGF0J3Mgc3Vja3MuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNSdG1wKGZpbGUsIHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihpc1dlYlJUQyhmaWxlLCB0eXBlKSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIW1pbWVUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gISF2aWRlby5jYW5QbGF5VHlwZShtaW1lVHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICd3ZWJydGMnLFxuICAgICAgICAgICAgY2hlY2tTdXBwb3J0OiBmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmlkZW8gPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKVxuICAgICAgICAgICAgICAgIH0oKTtcbiAgICAgICAgICAgICAgICBpZiAoIXZpZGVvLmNhblBsYXlUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlzUnRtcChmaWxlLCB0eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IHNvdXJjZS5maWxlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcblxuICAgICAgICAgICAgICAgIGlmKGlzV2ViUlRDKGZpbGUsIHR5cGUpKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdkYXNoJyxcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcbiAgICAgICAgICAgICAgICBpZiAoaXNSdG1wKGZpbGUsIHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mICggd2luZG93Lk1lZGlhU291cmNlIHx8IHdpbmRvdy5XZWJLaXRNZWRpYVNvdXJjZSApID09PSBcImZ1bmN0aW9uXCIgJiYgaXNEYXNoKGZpbGUsIHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnaGxzJyxcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZpZGVvID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJylcbiAgICAgICAgICAgICAgICB9KCk7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IHNvdXJjZS5maWxlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcbiAgICAgICAgICAgICAgICBpZiAoaXNSdG1wKGZpbGUsIHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvL3RoaXMgbWV0aG9kIGZyb20gaGxzLmpzXG4gICAgICAgICAgICAgICAgY29uc3QgaXNIbHNTdXBwb3J0ID0gKCkgPT57XG4gICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBnZXRNZWRpYVNvdXJjZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuTWVkaWFTb3VyY2UgfHwgd2luZG93LldlYktpdE1lZGlhU291cmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciBtZWRpYVNvdXJjZSA9IGdldE1lZGlhU291cmNlKCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzb3VyY2VCdWZmZXIgPSB3aW5kb3cuU291cmNlQnVmZmVyIHx8IHdpbmRvdy5XZWJLaXRTb3VyY2VCdWZmZXI7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpc1R5cGVTdXBwb3J0ZWQgPSBtZWRpYVNvdXJjZSAmJiB0eXBlb2YgbWVkaWFTb3VyY2UuaXNUeXBlU3VwcG9ydGVkID09PSAnZnVuY3Rpb24nICYmIG1lZGlhU291cmNlLmlzVHlwZVN1cHBvcnRlZCgndmlkZW8vbXA0OyBjb2RlY3M9XCJhdmMxLjQyRTAxRSxtcDRhLjQwLjJcIicpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIFNvdXJjZUJ1ZmZlciBpcyBleHBvc2VkIGVuc3VyZSBpdHMgQVBJIGlzIHZhbGlkXG4gICAgICAgICAgICAgICAgICAgIC8vIHNhZmFyaSBhbmQgb2xkIHZlcnNpb24gb2YgQ2hyb21lIGRvZSBub3QgZXhwb3NlIFNvdXJjZUJ1ZmZlciBnbG9iYWxseSBzbyBjaGVja2luZyBTb3VyY2VCdWZmZXIucHJvdG90eXBlIGlzIGltcG9zc2libGVcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNvdXJjZUJ1ZmZlclZhbGlkQVBJID0gIXNvdXJjZUJ1ZmZlciB8fCBzb3VyY2VCdWZmZXIucHJvdG90eXBlICYmIHR5cGVvZiBzb3VyY2VCdWZmZXIucHJvdG90eXBlLmFwcGVuZEJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygc291cmNlQnVmZmVyLnByb3RvdHlwZS5yZW1vdmUgPT09ICdmdW5jdGlvbic7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhIWlzVHlwZVN1cHBvcnRlZCAmJiAhIXNvdXJjZUJ1ZmZlclZhbGlkQVBJO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLy9SZW1vdmUgdGhpcyAnISF2aWRlby5jYW5QbGF5VHlwZSgnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnKScgaWYgeW91IHdhbnQgdG8gdXNlIGhsc2pzLlxuICAgICAgICAgICAgICAgIC8vWWVzIEkgbmVlZCBobHNqcy4gMjAxOS0wNi0xMiAmJiAhIXZpZGVvLmNhblBsYXlUeXBlKCdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcpO1xuICAgICAgICAgICAgICAgIHJldHVybiBpc0hsc1N1cHBvcnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ3J0bXAnLFxuICAgICAgICAgICAgY2hlY2tTdXBwb3J0OiBmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IHNvdXJjZS5maWxlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiB0ZXN0Rmxhc2goKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1cHBvcnQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAvL0lFIG9ubHlcbiAgICAgICAgICAgICAgICAgICAgaWYoXCJBY3RpdmVYT2JqZWN0XCIgaW4gd2luZG93KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdXBwb3J0ID0gISEobmV3IEFjdGl2ZVhPYmplY3QoXCJTaG9ja3dhdmVGbGFzaC5TaG9ja3dhdmVGbGFzaFwiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9Y2F0Y2goZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VwcG9ydCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1czQywgYmV0dGVyIHN1cHBvcnQgaW4gbGVnYWN5IGJyb3dzZXJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc3VwcG9ydCA9ICEhbmF2aWdhdG9yLm1pbWVUeXBlc1snYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2gnXTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1cHBvcnQ7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gY2hlY2tTdXBwb3J0KCl7XG4gICAgICAgICAgICAgICAgICAgIGlmKHVzZXJBZ2VudE9iamVjdC5icm93c2VyID09PSBcIk1pY3Jvc29mdCBFZGdlXCIgfHwgdXNlckFnZW50T2JqZWN0Lm9zID09PSBcIkFuZHJvaWRcIiB8fCB1c2VyQWdlbnRPYmplY3Qub3MgPT09IFwiaU9TXCIgIHx8IHVzZXJBZ2VudE9iamVjdC5icm93c2VyID09PSBcIlNhZmFyaVwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaXNSdG1wKGZpbGUsIHR5cGUpICYmIHRlc3RGbGFzaCgpICYmIGNoZWNrU3VwcG9ydCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgXTtcblxuICAgIHRoYXQuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlID0gKHNvcnVjZV8pID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU3VwcG9ydENoZWNrZXIgOiBmaW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UoKVwiLCBzb3J1Y2VfKTtcbiAgICAgICAgY29uc3Qgc291cmNlID0gKHNvcnVjZV8gPT09IE9iamVjdChzb3J1Y2VfKSkgPyBzb3J1Y2VfIDoge307XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBzdXBwb3J0TGlzdC5sZW5ndGg7IGkgKyspe1xuICAgICAgICAgICAgaWYoc3VwcG9ydExpc3RbaV0uY2hlY2tTdXBwb3J0KHNvdXJjZSkpe1xuICAgICAgICAgICAgICAgIHJldHVybiBzdXBwb3J0TGlzdFtpXS5uYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LmZpbmRQcm92aWRlck5hbWVzQnlQbGF5bGlzdCA9IChwbGF5bGlzdEl0ZW0pID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU3VwcG9ydENoZWNrZXIgOiBmaW5kUHJvdmlkZXJOYW1lc0J5UGxheWxpc3QoKVwiLCBwbGF5bGlzdEl0ZW0pO1xuICAgICAgICBsZXQgc3VwcG9ydE5hbWVzID0gW107XG4gICAgICAgIC8qZm9yIChsZXQgaSA9IHBsYXlsaXN0Xy5sZW5ndGg7IGktLTspIHtcblxuXG4gICAgICAgIH0qL1xuICAgICAgICBjb25zdCBpdGVtID0gcGxheWxpc3RJdGVtO1xuXG4gICAgICAgIGlmKGl0ZW0gJiYgaXRlbS5zb3VyY2VzKXtcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBpdGVtLnNvdXJjZXMubGVuZ3RoOyBqICsrKXtcbiAgICAgICAgICAgICAgICBsZXQgc291cmNlID0gaXRlbS5zb3VyY2VzW2pdO1xuICAgICAgICAgICAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3VwcG9ydGVkID0gdGhhdC5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2Uoc291cmNlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1cHBvcnRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VwcG9ydE5hbWVzLnB1c2goc3VwcG9ydGVkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHN1cHBvcnROYW1lcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTdXBwb3J0Q2hlY2tlcjtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDQuLlxuICovXG5pbXBvcnQgU3J0UGFyc2VyIGZyb20gXCJhcGkvY2FwdGlvbi9wYXJzZXIvU3J0UGFyc2VyXCI7XG5pbXBvcnQgVlRUQ3VlIGZyb20gXCJ1dGlscy9jYXB0aW9ucy92dHRDdWVcIjtcbi8vaW1wb3J0IFJlcXVlc3QgZnJvbSBcInV0aWxzL2Rvd25sb2FkZXJcIjtcblxuY29uc3QgTG9hZGVyID0gZnVuY3Rpb24oKXtcbiAgICBjb25zdCB0aGF0ID0ge307XG5cbiAgICBjb25zdCBjb252ZXJ0VG9WVFRDdWVzID0gZnVuY3Rpb24gKGN1ZXMpIHtcbiAgICAgICAgcmV0dXJuIGN1ZXMubWFwKGN1ZSA9PiBuZXcgVlRUQ3VlKGN1ZS5zdGFydCwgY3VlLmVuZCwgY3VlLnRleHQpKTtcbiAgICB9XG4gICAgLy9sYW5ndWFnZSA6IGZvciBTTUkgZm9ybWF0LlxuICAgIHRoYXQubG9hZCA9ICh0cmFjaywgbGFuZ3VhZ2UsIHN1Y2Nlc3NDYWxsYmFjaywgZXJyb3JDYWxsYmFjaykgPT4ge1xuXG4gICAgICAgIHZhciByZXF1ZXN0T3B0aW9ucyAgPSB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICAgICAgICB1cmwgOiB0cmFjay5maWxlLFxuICAgICAgICAgICAgZW5jb2Rpbmc6IG51bGxcbiAgICAgICAgfTtcblxuICAgICAgICBsb2FkUmVxdWVzdERvd25sb2RlcigpLnRoZW4oUmVxdWVzdCA9PiB7XG4gICAgICAgICAgICBSZXF1ZXN0KHJlcXVlc3RPcHRpb25zLCBmdW5jdGlvbihlcnJvciwgcmVzcG9uc2UsIGJvZHkpIHtcbiAgICAgICAgICAgICAgICBpZihlcnJvcil7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yQ2FsbGJhY2soZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBsZXQgY3VlcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBsZXQgdnR0Q3VlcyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChib2R5LmluZGV4T2YoJ1dFQlZUVCcpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldFQlZUVCBMT0FERURcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkVnR0UGFyc2VyKCkudGhlbihXZWJWVFQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwYXJzZXIgPSBuZXcgV2ViVlRULlBhcnNlcih3aW5kb3csIFdlYlZUVC5TdHJpbmdEZWNvZGVyKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZ0dEN1ZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZXIub25jdWUgPSBmdW5jdGlvbihjdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdnR0Q3Vlcy5wdXNoKGN1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZXIub25mbHVzaCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2RlbGV0ZSB0cmFjay54aHI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NDYWxsYmFjayh2dHRDdWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBhcnNlIGNhbGxzIG9uZmx1c2ggaW50ZXJuYWxseVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlci5wYXJzZShib2R5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2RlbGV0ZSB0cmFjay54aHI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JDYWxsYmFjayhlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoYm9keS5pbmRleE9mKCdTQU1JJykgPj0gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJTQU1JIExPQURFRFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRTbWlQYXJzZXIoKS50aGVuKFNtaVBhcnNlciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBhcnNlZERhdGEgPSBTbWlQYXJzZXIoYm9keSwge2ZpeGVkTGFuZyA6IGxhbmd1YWdlfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdnR0Q3VlcyA9IGNvbnZlcnRUb1ZUVEN1ZXMocGFyc2VkRGF0YS5yZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NDYWxsYmFjayh2dHRDdWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2RlbGV0ZSB0cmFjay54aHI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JDYWxsYmFjayhlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU1JUIExPQURFRFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ZXMgPSBTcnRQYXJzZXIoYm9keSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2dHRDdWVzID0gY29udmVydFRvVlRUQ3VlcyhjdWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NDYWxsYmFjayh2dHRDdWVzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIC8vZGVsZXRlIHRyYWNrLnhocjtcbiAgICAgICAgICAgIGVycm9yQ2FsbGJhY2soZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuZnVuY3Rpb24gbG9hZFJlcXVlc3REb3dubG9kZXIoKXtcbiAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWyd1dGlscy9kb3dubG9hZGVyJ10sIGZ1bmN0aW9uIChyZXF1aXJlKSB7XG4gICAgICAgIHJldHVybiByZXF1aXJlKCd1dGlscy9kb3dubG9hZGVyJykuZGVmYXVsdDtcbiAgICB9LCBmdW5jdGlvbihlcnIpe2NvbnNvbGUubG9nKGVycik7fSwgJ2Rvd25sb2FkZXInKTtcbn07XG5mdW5jdGlvbiBsb2FkVnR0UGFyc2VyKCkge1xuICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9jYXB0aW9uL3BhcnNlci9WdHRQYXJzZXInXSwgZnVuY3Rpb24gKHJlcXVpcmUpIHtcbiAgICAgICAgcmV0dXJuIHJlcXVpcmUoJ2FwaS9jYXB0aW9uL3BhcnNlci9WdHRQYXJzZXInKS5kZWZhdWx0O1xuICAgIH0sIGZ1bmN0aW9uKGVycil7Y29uc29sZS5sb2coZXJyKTt9LCAndnR0cGFyc2VyJyk7XG59XG5mdW5jdGlvbiBsb2FkU21pUGFyc2VyKCkge1xuICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9jYXB0aW9uL3BhcnNlci9TbWlQYXJzZXInXSwgZnVuY3Rpb24gKHJlcXVpcmUpIHtcbiAgICAgICAgcmV0dXJuIHJlcXVpcmUoJ2FwaS9jYXB0aW9uL3BhcnNlci9TbWlQYXJzZXInKS5kZWZhdWx0O1xuICAgIH0sIGZ1bmN0aW9uKGVycil7Y29uc29sZS5sb2coZXJyKTt9LCAnc21pcGFyc2VyJyk7XG59XG5leHBvcnQgZGVmYXVsdCBMb2FkZXI7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA1LiAxNy4uXG4gKi9cbmltcG9ydCBDYXB0aW9uTG9hZGVyIGZyb20gJ2FwaS9jYXB0aW9uL0xvYWRlcic7XG5pbXBvcnQge1JFQURZLCBFUlJPUlMsIEVSUk9SLCBQTEFZRVJfQ0FQVElPTl9FUlJPUiwgQ09OVEVOVF9NRVRBLCBDT05URU5UX1RJTUUsIENPTlRFTlRfQ0FQVElPTl9DVUVfQ0hBTkdFRCwgQ09OVEVOVF9DQVBUSU9OX0NIQU5HRUR9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xuXG5jb25zdCBpc1N1cHBvcnQgPSBmdW5jdGlvbihraW5kKXtcbiAgICByZXR1cm4ga2luZCA9PT0gJ3N1YnRpdGxlcycgfHwga2luZCA9PT0gJ2NhcHRpb25zJztcbn07XG5cbmNvbnN0IE1hbmFnZXIgPSBmdW5jdGlvbihhcGksIHBsYXlsaXN0SW5kZXgpe1xuXG4gICAgY29uc3QgdGhhdCA9IHt9O1xuICAgIGxldCBjYXB0aW9uTGlzdCA9IFtdO1xuICAgIGxldCBjdXJyZW50Q2FwdGlvbkluZGV4ID0gLTE7XG5cbiAgICBsZXQgY2FwdGlvbkxvYWRlciA9IENhcHRpb25Mb2FkZXIoKTtcbiAgICBsZXQgaXNGaXNydExvYWQgPSB0cnVlO1xuICAgIGxldCBpc1Nob3dpbmcgPSBmYWxzZTtcblxuXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ2FwdGlvbiBNYW5hZ2VyID4+IFwiLCBwbGF5bGlzdEluZGV4KTtcblxuXG4gICAgbGV0IGJpbmRUcmFjayA9IGZ1bmN0aW9uKHRyYWNrLCB2dHRDdWVzKXtcbiAgICAgICAgdHJhY2suZGF0YSA9IHZ0dEN1ZXMgfHwgW107XG4gICAgICAgIHRyYWNrLm5hbWUgPSB0cmFjay5sYWJlbCB8fCB0cmFjay5uYW1lIHx8IHRyYWNrLmxhbmd1YWdlO1xuICAgICAgICB0cmFjay5pZCA9IChmdW5jdGlvbih0cmFjaywgdHJhY2tzQ291bnQpIHtcbiAgICAgICAgICAgIHZhciB0cmFja0lkO1xuICAgICAgICAgICAgdmFyIHByZWZpeCA9IHRyYWNrLmtpbmQgfHwgJ2NjJztcbiAgICAgICAgICAgIGlmICh0cmFjay5kZWZhdWx0IHx8IHRyYWNrLmRlZmF1bHR0cmFjaykge1xuICAgICAgICAgICAgICAgIHRyYWNrSWQgPSAnZGVmYXVsdCc7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdHJhY2tJZCA9IHRyYWNrLmlkIHx8IChwcmVmaXggKyB0cmFja3NDb3VudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihpc0Zpc3J0TG9hZCl7XG4gICAgICAgICAgICAgICAgLy9UaGlzIGV4ZWN1dGUgb25seSBvbi4gYW5kIHRoZW4gdXNlIGZsdXNoQ2FwdGlvbkxpc3QobGFzdENhcHRpb25JbmRleCk7XG4gICAgICAgICAgICAgICAgY2hhbmdlQ3VycmVudENhcHRpb24oY2FwdGlvbkxpc3QubGVuZ3RofHwwKTtcbiAgICAgICAgICAgICAgICBpc0Zpc3J0TG9hZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJhY2tJZDtcbiAgICAgICAgfSkodHJhY2ssIGNhcHRpb25MaXN0Lmxlbmd0aCk7XG5cbiAgICAgICAgY2FwdGlvbkxpc3QucHVzaCh0cmFjayk7XG4gICAgICAgIHJldHVybiB0cmFjay5pZDtcbiAgICB9O1xuICAgIGxldCBjaGFuZ2VDdXJyZW50Q2FwdGlvbiA9IGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgY3VycmVudENhcHRpb25JbmRleCA9IGluZGV4O1xuICAgICAgICBhcGkudHJpZ2dlcihDT05URU5UX0NBUFRJT05fQ0hBTkdFRCwgY3VycmVudENhcHRpb25JbmRleCk7XG4gICAgfTtcbiAgICBpZihhcGkuZ2V0Q29uZmlnKCkucGxheWxpc3QgJiYgYXBpLmdldENvbmZpZygpLnBsYXlsaXN0Lmxlbmd0aCA+IDApe1xuICAgICAgICBsZXQgcGxheWxpc3QgPSBhcGkuZ2V0Q29uZmlnKCkucGxheWxpc3RbcGxheWxpc3RJbmRleF07XG5cbiAgICAgICAgaWYocGxheWxpc3QgJiYgcGxheWxpc3QudHJhY2tzICYmIHBsYXlsaXN0LnRyYWNrcy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBwbGF5bGlzdC50cmFja3MubGVuZ3RoOyBpICsrKXtcbiAgICAgICAgICAgICAgICBjb25zdCB0cmFjayA9IHBsYXlsaXN0LnRyYWNrc1tpXTtcblxuICAgICAgICAgICAgICAgIGlmKGlzU3VwcG9ydCh0cmFjay5raW5kKSAmJiAhIF8uZmluZFdoZXJlKHRyYWNrLCB7ZmlsZSA6IHRyYWNrLmZpbGV9KSl7XG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC5mbHVzaENhcHRpb25MaXN0KGN1cnJlbnRDYXB0aW9uSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uTG9hZGVyLmxvYWQodHJhY2ssIHRyYWNrLmxhbmcsIGZ1bmN0aW9uKHZ0dEN1ZXMpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodnR0Q3VlcyAmJiB2dHRDdWVzLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjYXB0aW9uSWQgPSBiaW5kVHJhY2sodHJhY2ssIHZ0dEN1ZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnJvcil7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTW1BMQVlFUl9DQVBUSU9OX0VSUk9SXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXBpLnRyaWdnZXIoRVJST1IsIHRlbXBFcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBpLm9uKENPTlRFTlRfVElNRSwgZnVuY3Rpb24obWV0YSl7XG4gICAgICAgIGxldCBwb3NpdGlvbiA9IG1ldGEucG9zaXRpb247XG4gICAgICAgIGlmKGN1cnJlbnRDYXB0aW9uSW5kZXggPiAtMSAmJiBjYXB0aW9uTGlzdFtjdXJyZW50Q2FwdGlvbkluZGV4XSl7XG4gICAgICAgICAgICBsZXQgY3VycmVudEN1ZXMgPSBfLmZpbHRlcihjYXB0aW9uTGlzdFtjdXJyZW50Q2FwdGlvbkluZGV4XS5kYXRhLCBmdW5jdGlvbiAoY3VlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvc2l0aW9uID49IChjdWUuc3RhcnRUaW1lKSAmJiAoICghY3VlLmVuZFRpbWUgfHwgcG9zaXRpb24pIDw9IGN1ZS5lbmRUaW1lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYoY3VycmVudEN1ZXMgJiYgY3VycmVudEN1ZXMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgYXBpLnRyaWdnZXIoQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VELCBjdXJyZW50Q3Vlc1swXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH0pO1xuICAgIHRoYXQuZmx1c2hDYXB0aW9uTGlzdCA9IChsYXN0Q2FwdGlvbkluZGV4KSA9PntcbiAgICAgICAgY2FwdGlvbkxpc3QgPSBbXTtcbiAgICAgICAgY2hhbmdlQ3VycmVudENhcHRpb24obGFzdENhcHRpb25JbmRleCk7XG4gICAgICAgIC8vY3VycmVudENhcHRpb25JbmRleCA9IGxhc3RDYXB0aW9uSW5kZXg7XG4gICAgfTtcbiAgICB0aGF0LmdldENhcHRpb25MaXN0ID0gKCkgPT57XG4gICAgICAgIHJldHVybiBjYXB0aW9uTGlzdHx8W107XG4gICAgfTtcbiAgICB0aGF0LmdldEN1cnJlbnRDYXB0aW9uID0gKCkgPT57XG4gICAgICAgIHJldHVybiBjdXJyZW50Q2FwdGlvbkluZGV4O1xuICAgIH07XG4gICAgdGhhdC5zZXRDdXJyZW50Q2FwdGlvbiA9IChfaW5kZXgpID0+e1xuICAgICAgICBpZihfaW5kZXggPiAtMiAmJiBfaW5kZXggPCBjYXB0aW9uTGlzdC5sZW5ndGgpe1xuICAgICAgICAgICAgY2hhbmdlQ3VycmVudENhcHRpb24oX2luZGV4KTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhhdC5hZGRDYXB0aW9uID0gKHRyYWNrKSA9PntcbiAgICAgICAgaWYoaXNTdXBwb3J0KHRyYWNrLmtpbmQpICYmICEgXy5maW5kV2hlcmUoY2FwdGlvbkxvYWRlciwge2ZpbGUgOiB0cmFjay5maWxlfSkpe1xuICAgICAgICAgICAgY2FwdGlvbkxvYWRlci5sb2FkKHRyYWNrLCBmdW5jdGlvbih2dHRDdWVzKXtcbiAgICAgICAgICAgICAgICBpZih2dHRDdWVzICYmIHZ0dEN1ZXMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIGJpbmRUcmFjayh0cmFjaywgdnR0Q3Vlcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3Ipe1xuICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlNbUExBWUVSX0NBUFRJT05fRVJST1JdO1xuICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgICAgIGFwaS50cmlnZ2VyKEVSUk9SLCB0ZW1wRXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQucmVtb3ZlQ2FwdGlvbiA9IChpbmRleCkgPT4ge1xuICAgICAgICBpZihpbmRleCA+IC0xICYmIGluZGV4IDwgY2FwdGlvbkxpc3QubGVuZ3RoKXtcbiAgICAgICAgICAgIGNhcHRpb25MaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICByZXR1cm4gY2FwdGlvbkxpc3Q7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+IHtcbiAgICAgICAgY2FwdGlvbkxpc3QgPSBbXTtcbiAgICAgICAgY2FwdGlvbkxvYWRlciA9IG51bGw7XG4gICAgICAgIGFwaS5vZmYoQ09OVEVOVF9USU1FLCBudWxsLCB0aGF0KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cblxuXG5leHBvcnQgZGVmYXVsdCBNYW5hZ2VyO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNS4gMjkuLlxuICovXG5pbXBvcnQgeyBobXNUb1NlY29uZCwgdHJpbSB9IGZyb20gXCJ1dGlscy9zdHJpbmdzXCJcblxuZnVuY3Rpb24gX2VudHJ5KGRhdGEpIHtcbiAgICB2YXIgZW50cnkgPSB7fTtcbiAgICB2YXIgYXJyYXkgPSBkYXRhLnNwbGl0KCdcXHJcXG4nKTtcbiAgICBpZiAoYXJyYXkubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGFycmF5ID0gZGF0YS5zcGxpdCgnXFxuJyk7XG4gICAgfVxuICAgIHZhciBpZHggPSAxO1xuICAgIGlmIChhcnJheVswXS5pbmRleE9mKCcgLS0+ICcpID4gMCkge1xuICAgICAgICBpZHggPSAwO1xuICAgIH1cbiAgICBpZiAoYXJyYXkubGVuZ3RoID4gaWR4ICsgMSAmJiBhcnJheVtpZHggKyAxXSkge1xuICAgICAgICAvLyBUaGlzIGxpbmUgY29udGFpbnMgdGhlIHN0YXJ0IGFuZCBlbmQuXG4gICAgICAgIHZhciBsaW5lID0gYXJyYXlbaWR4XTtcbiAgICAgICAgdmFyIGluZGV4ID0gbGluZS5pbmRleE9mKCcgLS0+ICcpO1xuICAgICAgICBpZiAoaW5kZXggPiAwKSB7XG4gICAgICAgICAgICBlbnRyeS5zdGFydCA9IGhtc1RvU2Vjb25kKGxpbmUuc3Vic3RyKDAsIGluZGV4KSk7XG4gICAgICAgICAgICBlbnRyeS5lbmQgPSBobXNUb1NlY29uZChsaW5lLnN1YnN0cihpbmRleCArIDUpKTtcbiAgICAgICAgICAgIGVudHJ5LnRleHQgPSBhcnJheS5zbGljZShpZHggKyAxKS5qb2luKCdcXHJcXG4nKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZW50cnk7XG5cbn1cblxuY29uc3QgU3J0UGFyc2VyID0gZnVuY3Rpb24oZGF0YSkge1xuICAgIHZhciBjYXB0aW9ucyA9IFtdO1xuXG4gICAgZGF0YSA9IHRyaW0oZGF0YSk7XG5cbiAgICB2YXIgbGlzdCA9IGRhdGEuc3BsaXQoJ1xcclxcblxcclxcbicpO1xuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBsaXN0ID0gZGF0YS5zcGxpdCgnXFxuXFxuJyk7XG4gICAgfVxuXG5cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAobGlzdFtpXSA9PT0gJ1dFQlZUVCcpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlbnRyeSA9IF9lbnRyeShsaXN0W2ldKTtcbiAgICAgICAgaWYgKGVudHJ5LnRleHQpIHtcbiAgICAgICAgICAgIGNhcHRpb25zLnB1c2goZW50cnkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNhcHRpb25zO1xufVxuXG5cblxuZXhwb3J0IGRlZmF1bHQgU3J0UGFyc2VyOyIsIi8vIFNUQVRFXG5leHBvcnQgY29uc3QgU1RBVEVfQlVGRkVSSU5HID0gXCJidWZmZXJpbmdcIjtcbmV4cG9ydCBjb25zdCBTVEFURV9JRExFID0gXCJpZGxlXCI7XG5leHBvcnQgY29uc3QgU1RBVEVfQ09NUExFVEUgPSBcImNvbXBsZXRlXCI7XG5leHBvcnQgY29uc3QgU1RBVEVfUEFVU0VEID0gXCJwYXVzZWRcIjtcbmV4cG9ydCBjb25zdCBTVEFURV9QTEFZSU5HID0gXCJwbGF5aW5nXCI7XG5leHBvcnQgY29uc3QgU1RBVEVfRVJST1IgPSBcImVycm9yXCI7XG5leHBvcnQgY29uc3QgU1RBVEVfTE9BRElORyA9IFwibG9hZGluZ1wiO1xuZXhwb3J0IGNvbnN0IFNUQVRFX1NUQUxMRUQgPSBcInN0YWxsZWRcIjtcblxuZXhwb3J0IGNvbnN0IFNUQVRFX0FEX0xPQURJTkcgPSBcImFkTG9hZGluZ1wiO1xuZXhwb3J0IGNvbnN0IFNUQVRFX0FEX0xPQURFRCA9IFwiYWRMb2FkZWRcIjtcbmV4cG9ydCBjb25zdCBTVEFURV9BRF9QTEFZSU5HID0gXCJhZFBsYXlpbmdcIjtcbmV4cG9ydCBjb25zdCBTVEFURV9BRF9QQVVTRUQgPSBcImFkUGF1c2VkXCI7XG5leHBvcnQgY29uc3QgU1RBVEVfQURfQ09NUExFVEUgPSBcImFkQ29tcGxldGVcIjtcbmV4cG9ydCBjb25zdCBTVEFURV9BRF9FUlJPUiA9IFwiYWRFcnJvclwiO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9BRF9DTElDSyA9IFwiYWRjbGlja1wiO1xuXG4vLyBQUk9WSURFUlxuZXhwb3J0IGNvbnN0IFBST1ZJREVSX0hUTUw1ID0gXCJodG1sNVwiO1xuZXhwb3J0IGNvbnN0IFBST1ZJREVSX1dFQlJUQyA9IFwid2VicnRjXCI7XG5leHBvcnQgY29uc3QgUFJPVklERVJfREFTSCA9IFwiZGFzaFwiO1xuZXhwb3J0IGNvbnN0IFBST1ZJREVSX0hMUyA9IFwiaGxzXCI7XG5leHBvcnQgY29uc3QgUFJPVklERVJfUlRNUCA9IFwicnRtcFwiO1xuXG4vLyBFVkVOVFNcbmV4cG9ydCBjb25zdCBDT05URU5UX0NPTVBMRVRFID0gU1RBVEVfQ09NUExFVEU7XG5leHBvcnQgY29uc3QgUkVBRFkgPSBcInJlYWR5XCI7XG5leHBvcnQgY29uc3QgREVTVFJPWSA9IFwiZGVzdHJveVwiO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfU0VFSyA9IFwic2Vla1wiO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfQlVGRkVSX0ZVTEwgPSBcImJ1ZmZlckZ1bGxcIjtcbmV4cG9ydCBjb25zdCBESVNQTEFZX0NMSUNLID0gXCJkaXNwbGF5Q2xpY2tcIjtcbmV4cG9ydCBjb25zdCBDT05URU5UX0xPQURFRCA9IFwibG9hZGVkXCI7XG5leHBvcnQgY29uc3QgUExBWUxJU1RfQ0hBTkdFRCA9IFwicGxheWxpc3RDaGFuZ2VkXCI7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9TRUVLRUQgPSBcInNlZWtlZFwiO1xuZXhwb3J0IGNvbnN0IEFMTF9QTEFZTElTVF9FTkRFRCA9IFwiYWxsUGxheWxpc3RFbmRlZFwiO1xuZXhwb3J0IGNvbnN0IE5FVFdPUktfVU5TVEFCTEVEID0gXCJ1bnN0YWJsZU5ldHdvcmtcIjtcblxuXG5cbmV4cG9ydCBjb25zdCBFUlJPUiA9IFwiZXJyb3JcIjtcblxuLy8gU1RBVEUgT0YgUExBWUVSXG5leHBvcnQgY29uc3QgUExBWUVSX1NUQVRFID0gXCJzdGF0ZUNoYW5nZWRcIjtcbmV4cG9ydCBjb25zdCBQTEFZRVJfQ09NUExFVEUgPSBTVEFURV9DT01QTEVURTtcbmV4cG9ydCBjb25zdCBQTEFZRVJfUEFVU0UgPSBcInBhdXNlXCI7XG5leHBvcnQgY29uc3QgUExBWUVSX1BMQVkgPSBcInBsYXlcIjtcblxuZXhwb3J0IGNvbnN0IFBMQVlFUl9DTElDS0VEID0gXCJjbGlja2VkXCI7XG5leHBvcnQgY29uc3QgUExBWUVSX1JFU0laRUQgPSBcInJlc2l6ZWRcIjtcbmV4cG9ydCBjb25zdCBQTEFZRVJfTE9BRElORyA9IFwibG9hZGluZ1wiO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9GVUxMU0NSRUVOX1JFUVVFU1QgPSBcImZ1bGxzY3JlZW5SZXF1ZXN0ZWRcIjtcbmV4cG9ydCBjb25zdCBQTEFZRVJfRlVMTFNDUkVFTl9DSEFOR0VEID0gXCJmdWxsc2NyZWVuQ2hhbmdlZFwiO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XQVJOSU5HID0gXCJ3YXJuaW5nXCI7XG5cbmV4cG9ydCBjb25zdCBBRF9DSEFOR0VEID0gXCJhZENoYW5nZWRcIjtcbmV4cG9ydCBjb25zdCBBRF9USU1FID0gXCJhZFRpbWVcIjtcbmV4cG9ydCBjb25zdCBDT05URU5UX0JVRkZFUiA9IFwiYnVmZmVyQ2hhbmdlZFwiO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfVElNRSA9IFwidGltZVwiO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfUkFURV9DSEFOR0UgPSBcInJhdGVjaGFuZ2VcIjtcbmV4cG9ydCBjb25zdCBDT05URU5UX1ZPTFVNRSA9IFwidm9sdW1lQ2hhbmdlZFwiO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfTVVURSA9IFwibXV0ZVwiO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfTUVUQSA9IFwibWV0YUNoYW5nZWRcIjtcbmV4cG9ydCBjb25zdCBDT05URU5UX1NPVVJDRV9DSEFOR0VEID0gXCJzb3VyY2VDaGFuZ2VkXCI7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9MRVZFTF9DSEFOR0VEID0gXCJxdWFsaXR5TGV2ZWxDaGFuZ2VkXCI7XG5leHBvcnQgY29uc3QgUExBWUJBQ0tfUkFURV9DSEFOR0VEID0gXCJwbGF5YmFja1JhdGVDaGFuZ2VkXCI7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VEID0gXCJjdWVDaGFuZ2VkXCI7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9DQVBUSU9OX0NIQU5HRUQgPSBcImNhcHRpb25DaGFuZ2VkXCI7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9USU1FX01PREVfQ0hBTkdFRCA9IFwidGltZURpc3BsYXlNb2RlQ2hhbmdlZFwiO1xuZXhwb3J0IGNvbnN0IE9NRV9QMlBfTU9ERSA9IFwicDJwTW9kZVwiO1xuXG5cbmV4cG9ydCBjb25zdCBBRF9DTElFTlRfR09PR0xFSU1BID0gXCJnb29nbGVpbWFcIjtcbmV4cG9ydCBjb25zdCBBRF9DTElFTlRfVkFTVCA9IFwidmFzdFwiO1xuXG5cbmV4cG9ydCBjb25zdCBJTklUX1VOS05XT05fRVJST1IgPSAxMDA7XG5leHBvcnQgY29uc3QgSU5JVF9VTlNVUFBPUlRfRVJST1IgPSAxMDE7XG5leHBvcnQgY29uc3QgSU5JVF9SVE1QX1NFVFVQX0VSUk9SID0gMTAyO1xuZXhwb3J0IGNvbnN0IElOSVRfREFTSF9VTlNVUFBPUlQgPSAxMDM7XG5leHBvcnQgY29uc3QgSU5JVF9BRFNfRVJST1IgPSAxMDQ7XG5leHBvcnQgY29uc3QgSU5JVF9EQVNIX05PVEZPVU5EID0gMTA1O1xuZXhwb3J0IGNvbnN0IElOSVRfSExTSlNfTk9URk9VTkQgPSAxMDY7XG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fRVJST1IgPSAzMDA7XG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SID0gMzAxO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IgPSAzMDI7XG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SID0gMzAzO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9GSUxFX0VSUk9SID0gMzA0O1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9DQVBUSU9OX0VSUk9SID0gMzA1O1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfV1NfRVJST1IgPSA1MDE7XG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SID0gNTAyO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SID0gNTAzO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUiA9IDUwNDtcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SID0gNTA1O1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfTkVUV09SS19TTE9XID0gNTEwO1xuXG5leHBvcnQgY29uc3QgV0FSTl9NU0dfTVVURURQTEFZID0gXCJQbGVhc2UgdG91Y2ggaGVyZSB0byB0dXJuIG9uIHRoZSBzb3VuZC5cIjtcblxuZXhwb3J0IGNvbnN0IEVSUk9SUyA9IHtcbiAgICAxMDAgOiB7Y29kZSA6IDEwMCAsIG1lc3NhZ2UgOiBcIkNhbiBub3QgbG9hZCBkdWUgdG8gdW5rbm93biByZWFzb25zLlwiLCByZWFzb24gOlwiQ2FuIG5vdCBsb2FkIGR1ZSB0byB1bmtub3duIHJlYXNvbnMuXCJ9LFxuICAgIDEwMSA6IHtjb2RlIDogMTAxICwgbWVzc2FnZSA6IFwiQ2FuIG5vdCBsb2FkIGR1ZSB0byB1bnN1cHBvcnRlZCBtZWRpYS5cIiwgcmVhc29uIDpcIkNhbiBub3QgbG9hZCBkdWUgdG8gdW5zdXBwb3J0ZWQgbWVkaWEuXCJ9LFxuICAgIDEwMiA6IHtjb2RlIDogMTAyICwgbWVzc2FnZSA6IFwiRmxhc2ggZmV0Y2hpbmcgcHJvY2VzcyBhYm9ydGVkLiA8L2JyPjxhIGhyZWY9J2h0dHA6Ly93d3cuYWRvYmUuY29tL2dvL2dldGZsYXNocGxheWVyJyB0YXJnZXQ9J19zZWxmJz48aW1nIHNyYz0naHR0cDovL3d3dy5hZG9iZS5jb20vaW1hZ2VzL3NoYXJlZC9kb3dubG9hZF9idXR0b25zL2dldF9mbGFzaF9wbGF5ZXIuZ2lmJyBhbHQ9J0dldCBBZG9iZSBGbGFzaCBwbGF5ZXInPjwvYT5cIiwgcmVhc29uIDpcIkl0IGxvb2tzIGxpa2Ugbm90IGZvdW5kIHN3ZiBvciB5b3VyIGVudmlyb25tZW50IGlzIGxvY2FsaG9zdC5cIn0sXG4gICAgMTAzIDoge2NvZGUgOiAxMDMgLCBtZXNzYWdlIDogXCJDYW4gbm90IGxvYWQgZHVlIHRvIGRhc2hqcy4gUGxlYXNlIGNoZWNrIHRoZSBsYXN0ZXN0IHZlcnNpb24uXCIsIHJlYXNvbiA6XCJkYXNoLmpzIHZlcnNpb24gaXMgb2xkLiBQbGVhc2UgY2hlY2sgdGhlIGxhc3Rlc3QuXCJ9LFxuICAgIDEwNCA6IHtjb2RlIDogMTA0ICwgbWVzc2FnZSA6IFwiQ2FuIG5vdCBsb2FkIGR1ZSB0byBnb29nbGUgaW1hIGZvciBBZHMuIFwiLCByZWFzb24gOlwiUGxlYXNlIGNoZWNrIHRoZSBnb29nbGUgaW1hIGxpYnJhcnkuXCJ9LFxuICAgIDEwNSA6IHtjb2RlIDogMTA1ICwgbWVzc2FnZSA6IFwiQ2FuIG5vdCBmaW5kIHRoZSBkYXNoanMuIFBsZWFzZSBjaGVjayB0aGUgZGFzaGpzLlwiLCByZWFzb24gOlwiTm90IGZvdW5kIGRhc2hqcy5cIn0sXG4gICAgMTA2IDoge2NvZGUgOiAxMDYgLCBtZXNzYWdlIDogXCJDYW4gbm90IGZpbmQgdGhlIGhsc2pzLiBQbGVhc2UgY2hlY2sgdGhlIGhsc2pzLlwiLCByZWFzb24gOlwiTm90IGZvdW5kIGhsc2pzLlwifSxcbiAgICAzMDAgOiB7Y29kZSA6IDMwMCAsIG1lc3NhZ2UgOiBcIkNhbiBub3QgcGxheSBkdWUgdG8gdW5rbm93biByZWFzb25zLlwiLCByZWFzb24gOlwiQ2FuIG5vdCBwbGF5IGR1ZSB0byB1bmtub3duIHJlYXNvbnMuXCJ9LFxuICAgIDMwMSA6IHtjb2RlIDogMzAxICwgbWVzc2FnZSA6IFwiRmV0Y2hpbmcgcHJvY2VzcyBhYm9ydGVkIGJ5IHVzZXIuXCIsIHJlYXNvbiA6XCJGZXRjaGluZyBwcm9jZXNzIGFib3J0ZWQgYnkgdXNlci5cIn0sXG4gICAgMzAyIDoge2NvZGUgOiAzMDIgLCBtZXNzYWdlIDogXCJTb21lIG9mIHRoZSBtZWRpYSBjb3VsZCBub3QgYmUgZG93bmxvYWRlZCBkdWUgdG8gYSBuZXR3b3JrIGVycm9yLlwiLCByZWFzb24gOlwiRXJyb3Igb2NjdXJyZWQgd2hlbiBkb3dubG9hZGluZy5cIn0sXG4gICAgMzAzIDoge2NvZGUgOiAzMDMgLCBtZXNzYWdlIDogXCJVbmFibGUgdG8gbG9hZCBtZWRpYS4gVGhpcyBtYXkgYmUgZHVlIHRvIGEgc2VydmVyIG9yIG5ldHdvcmsgZXJyb3IsIG9yIGR1ZSB0byBhbiB1bnN1cHBvcnRlZCBmb3JtYXQuXCIsIHJlYXNvbiA6XCJFcnJvciBvY2N1cnJlZCB3aGVuIGRlY29kaW5nLlwifSxcbiAgICAzMDQgOiB7Y29kZSA6IDMwNCAsIG1lc3NhZ2UgOiBcIk1lZGlhIHBsYXliYWNrIGhhcyBiZWVuIGNhbmNlbGVkLiBJdCBsb29rcyBsaWtlIHlvdXIgbWVkaWEgaXMgY29ycnVwdGVkIG9yIHlvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSBmZWF0dXJlcyB5b3VyIG1lZGlhIHVzZXMuXCIsIHJlYXNvbiA6XCJNZWRpYSBwbGF5YmFjayBub3Qgc3VwcG9ydGVkLlwifSxcbiAgICAzMDUgOiB7Y29kZSA6IDMwNSAsIG1lc3NhZ2UgOiBcIkNhbiBub3QgbG9hZCBjYXB0aW9ucyBkdWUgdG8gdW5rbm93biByZWFzb25zLlwiLCByZWFzb24gOlwiQ2FuIG5vdCBsb2FkIGNhcHRpb25zIGR1ZSB0byB1bmtub3duIHJlYXNvbnMuXCJ9LFxuICAgIDUwMSA6IHtjb2RlIDogNTAxICwgbWVzc2FnZSA6IFwiQ29ubmVjdGlvbiB3aXRoIGxvdy1sYXRlbmN5KE9NRSkgc2VydmVyIGZhaWxlZC5cIiwgcmVhc29uIDpcIldlYlNvY2tldCBjb25uZWN0aW9uIGZhaWxlZC5cIn0sXG4gICAgNTAyIDoge2NvZGUgOiA1MDIgLCBtZXNzYWdlIDogXCJDb25uZWN0aW9uIHdpdGggbG93LWxhdGVuY3koT01FKSBzZXJ2ZXIgZmFpbGVkLlwiLCByZWFzb24gOlwiV2ViUlRDIGFkZEljZUNhbmRpZGF0ZSBmYWlsZWQuXCJ9LFxuICAgIDUwMyA6IHtjb2RlIDogNTAzICwgbWVzc2FnZSA6IFwiQ29ubmVjdGlvbiB3aXRoIGxvdy1sYXRlbmN5KE9NRSkgc2VydmVyIGZhaWxlZC5cIiwgcmVhc29uIDpcIldlYlJUQyBzZXRSZW1vdGVEZXNjcmlwdGlvbiBmYWlsZWQuXCJ9LFxuICAgIDUwNCA6IHtjb2RlIDogNTA0ICwgbWVzc2FnZSA6IFwiQ29ubmVjdGlvbiB3aXRoIGxvdy1sYXRlbmN5KE9NRSkgc2VydmVyIGZhaWxlZC5cIiwgcmVhc29uIDpcIldlYlJUQyBwZWVyIGNyZWF0ZU9mZmVyIGZhaWxlZC5cIn0sXG4gICAgNTA1IDoge2NvZGUgOiA1MDUgLCBtZXNzYWdlIDogXCJDb25uZWN0aW9uIHdpdGggbG93LWxhdGVuY3koT01FKSBzZXJ2ZXIgZmFpbGVkLlwiLCByZWFzb24gOlwiV2ViUlRDIHNldExvY2FsRGVzY3JpcHRpb24gZmFpbGVkLlwifSxcbiAgICA1MTAgOiB7Y29kZSA6IDUxMCAsIG1lc3NhZ2UgOiBcIk5ldHdvcmsgY29ubmVjdGlvbiBpcyB1bnN0YWJsZS4gQ2hlY2sgdGhlIG5ldHdvcmsgY29ubmVjdGlvbi5cIiwgcmVhc29uIDpcIk5ldHdvcmsgaXMgc2xvdy5cIn1cbn07XG5cbmV4cG9ydCBjb25zdCBVSV9JQ09OUyA9IHtcbiAgICB2b2x1bWVfbXV0ZSA6IFwidm9sdW1lLW11dGVcIixcbiAgICBvcF93YXJuaW5nIDogXCJvcC13YXJuaW5nXCJcbn07XG4iLCIvKipcbiAqIEBicmllZiAgIOuvuOuUlOyWtCDsl5jrpqzrqLztirjrpbwg6rSA66as7ZWY64qUIOqwneyytC4g7ZiE7J6s64qUIO2VmOuKlCDsnbzsnbQg66eO7KeAIOyViuuLpC5cbiAqIEBwYXJhbSAgIHtlbGVtZW50fSAgIGNvbnRhaW5lciAgIGRvbSBlbGVtZW50XG4gKlxuICogKi9cbmltcG9ydCB7Z2V0QnJvd3Nlcn0gZnJvbSBcInV0aWxzL2Jyb3dzZXJcIjtcbmltcG9ydCB7UFJPVklERVJfREFTSCwgUFJPVklERVJfSExTLCBQUk9WSURFUl9XRUJSVEMsIFBST1ZJREVSX0hUTUw1LCBQUk9WSURFUl9SVE1QfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuaW1wb3J0IExBJCBmcm9tIFwidXRpbHMvbGlrZUEkLmpzXCI7XG5pbXBvcnQge2dldFNjcmlwdFBhdGh9IGZyb20gJ3V0aWxzL3dlYnBhY2snO1xuaW1wb3J0IHt2ZXJzaW9ufSBmcm9tICd2ZXJzaW9uJztcbi8vVG9EbyA6IFJlc3RydWN0dXJpbmdcblxuY29uc3QgTWFuYWdlciA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgYnJvd3NlckluZm8pe1xuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICBjb25zdCBTV0ZQYXRoID0gZ2V0U2NyaXB0UGF0aCgnb3ZlbnBsYXllci5qcycpK1wiT3ZlblBsYXllckZsYXNoLnN3Zj92PVwiK3ZlcnNpb247XG4gICAgbGV0IHJvb3RJZCA9IGNvbnRhaW5lci5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBhcmVudC1pZFwiKTtcbiAgICBsZXQgJGNvbnRhaW5lciA9IExBJChjb250YWluZXIpO1xuICAgIGxldCB2aWRlb0VsZW1lbnQgPSBcIlwiO1xuXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTWVkaWFNYW5hZ2VyIGxvYWRlZC4gYnJvd3NlciA6IFwiLCBicm93c2VySW5mbyApO1xuXG4gICAgY29uc3QgY3JlYXRlSHRtbFZpZGVvID0gZnVuY3Rpb24oaXNMb29wKXtcbiAgICAgICAgdmlkZW9FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbiAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnZGlzYWJsZXJlbW90ZXBsYXliYWNrJywgJycpO1xuICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCd3ZWJraXQtcGxheXNpbmxpbmUnLCAndHJ1ZScpO1xuICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCdwbGF5c2lubGluZScsICd0cnVlJyk7XG4gICAgICAgIGlmKGlzTG9vcCl7XG4gICAgICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCdsb29wJywgJycpO1xuICAgICAgICB9XG4gICAgICAgICRjb250YWluZXIuYXBwZW5kKHZpZGVvRWxlbWVudCk7XG5cbiAgICAgICAgcmV0dXJuIHZpZGVvRWxlbWVudDtcbiAgICB9O1xuICAgIGNvbnN0IGNyZWF0ZUZsYXNoVmlkZW8gPSBmdW5jdGlvbihpc0xvb3AsIGJ1ZmZlclRpbWUsIGJ1ZmZlclRpbWVNYXgpe1xuICAgICAgICBsZXQgbW92aWUsIGZsYXNodmFycywgYWxsb3dzY3JpcHRhY2Nlc3MsIGFsbG93ZnVsbHNjcmVlbiwgcXVhbGl0eSwgbmFtZSwgbWVudSwgcXVhbCwgYmdjb2xvciwgbG9vcCwgd21vZGUgO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJNZWRpYU1hbmFnZXIgRmxhc2ggYnVmZmVyIHNldHRpbmcgOiBcIiwgYnVmZmVyVGltZSwgYnVmZmVyVGltZU1heCk7XG4gICAgICAgIG1vdmllID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcbiAgICAgICAgbW92aWUuc2V0QXR0cmlidXRlKCduYW1lJywgJ21vdmllJyk7XG4gICAgICAgIG1vdmllLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBTV0ZQYXRoKTtcblxuICAgICAgICBmbGFzaHZhcnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xuICAgICAgICBmbGFzaHZhcnMuc2V0QXR0cmlidXRlKCduYW1lJywgJ2ZsYXNodmFycycpO1xuICAgICAgICAvL3BsYXllcklkIGlzIHRvIHVzZSBTV0YgZm9yIEV4dGVybmFsSW50ZXJmYWNlLmNhbGwoKS5cbiAgICAgICAgZmxhc2h2YXJzLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBgcGxheWVySWQ9JHtyb290SWR9JmJ1ZmZlclRpbWU9JHtidWZmZXJUaW1lfSZidWZmZXJNYXhUaW1lPSR7YnVmZmVyVGltZU1heH1gKTtcblxuICAgICAgICBhbGxvd3NjcmlwdGFjY2VzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XG4gICAgICAgIGFsbG93c2NyaXB0YWNjZXNzLnNldEF0dHJpYnV0ZSgnbmFtZScsICdhbGxvd3NjcmlwdGFjY2VzcycpO1xuICAgICAgICBhbGxvd3NjcmlwdGFjY2Vzcy5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ2Fsd2F5cycpO1xuXG4gICAgICAgIGFsbG93ZnVsbHNjcmVlbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XG4gICAgICAgIGFsbG93ZnVsbHNjcmVlbi5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnYWxsb3dmdWxsc2NyZWVuJyk7XG4gICAgICAgIGFsbG93ZnVsbHNjcmVlbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ3RydWUnKTtcblxuICAgICAgICBxdWFsaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcbiAgICAgICAgcXVhbGl0eS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAncXVhbGl0eScpO1xuICAgICAgICBxdWFsaXR5LnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnaGVpZ2h0Jyk7XG5cbiAgICAgICAgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XG4gICAgICAgIG5hbWUuc2V0QXR0cmlidXRlKCduYW1lJywgJ25hbWUnKTtcbiAgICAgICAgbmFtZS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgcm9vdElkK1wiLWZsYXNoXCIpO1xuXG4gICAgICAgIG1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xuICAgICAgICBtZW51LnNldEF0dHJpYnV0ZSgnbmFtZScsICdtZW51Jyk7XG4gICAgICAgIG1lbnUuc2V0QXR0cmlidXRlKCd2YWx1ZScsICdmYWxzZScpO1xuXG4gICAgICAgIHF1YWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xuICAgICAgICBxdWFsLnNldEF0dHJpYnV0ZSgnbmFtZScsICdxdWFsaXR5Jyk7XG4gICAgICAgIHF1YWwuc2V0QXR0cmlidXRlKCd2YWx1ZScsICdoaWdoJyk7XG5cbiAgICAgICAgYmdjb2xvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XG4gICAgICAgIGJnY29sb3Iuc2V0QXR0cmlidXRlKCduYW1lJywgJ2JnY29sb3InKTtcbiAgICAgICAgYmdjb2xvci5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJyMwMDAwMDAnKTtcblxuICAgICAgICB3bW9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XG4gICAgICAgIHdtb2RlLnNldEF0dHJpYnV0ZSgnbmFtZScsICd3bW9kZScpO1xuICAgICAgICB3bW9kZS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ29wYXF1ZScpO1xuXG4gICAgICAgIC8qbGV0IGFsbG93QnV0dG9uID0gYDxhIGhyZWY9XCJodHRwOi8vd3d3LmFkb2JlLmNvbS9nby9nZXRmbGFzaHBsYXllclwiPjxpbWcgc3JjPVwiaHR0cDovL3d3dy5hZG9iZS5jb20vaW1hZ2VzL3NoYXJlZC9kb3dubG9hZF9idXR0b25zL2dldF9mbGFzaF9wbGF5ZXIuZ2lmXCIgYWx0PVwiR2V0IEFkb2JlIEZsYXNoIHBsYXllclwiPjwvYT5gO1xuICAgICAgICBtZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgbWVzc2FnZS5pbm5lckhUTUwgPSBhbGxvd0J1dHRvbjsqL1xuXG4gICAgICAgIGlmKGlzTG9vcCl7XG4gICAgICAgICAgICBsb29wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcbiAgICAgICAgICAgIGxvb3Auc2V0QXR0cmlidXRlKCduYW1lJywgJ2xvb3AnKTtcbiAgICAgICAgICAgIGxvb3Auc2V0QXR0cmlidXRlKCd2YWx1ZScsICd0cnVlJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2aWRlb0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvYmplY3QnKTtcbiAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCByb290SWQrXCItZmxhc2hcIik7XG4gICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCByb290SWQrXCItZmxhc2hcIik7XG4gICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzEwMCUnKTtcbiAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgJzEwMCUnKTtcbiAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnc2NhbGUnLCAnZGVmYXVsdCcpO1xuICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCd3bW9kZScsICdvcGFxdWUnKTtcblxuICAgICAgICBpZihicm93c2VySW5mby5icm93c2VyID09PSBcIk1pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3JlclwiICYmIGJyb3dzZXJJbmZvLmJyb3dzZXJNYWpvclZlcnNpb24gPD0gOSApe1xuICAgICAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnY2xhc3NpZCcsICdjbHNpZDpEMjdDREI2RS1BRTZELTExY2YtOTZCOC00NDQ1NTM1NDAwMDAnKTtcbiAgICAgICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChtb3ZpZSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YScsIFNXRlBhdGgpO1xuICAgICAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgndHlwZScsICdhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmKGlzTG9vcCl7XG4gICAgICAgICAgICB2aWRlb0VsZW1lbnQuYXBwZW5kQ2hpbGQobG9vcCk7XG4gICAgICAgIH1cblxuICAgICAgICB2aWRlb0VsZW1lbnQuYXBwZW5kQ2hpbGQod21vZGUpO1xuICAgICAgICB2aWRlb0VsZW1lbnQuYXBwZW5kQ2hpbGQoYmdjb2xvcik7XG4gICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChxdWFsKTtcbiAgICAgICAgdmlkZW9FbGVtZW50LmFwcGVuZENoaWxkKGFsbG93ZnVsbHNjcmVlbik7XG4gICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChhbGxvd3NjcmlwdGFjY2Vzcyk7XG4gICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChmbGFzaHZhcnMpO1xuICAgICAgICAvL3ZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChtZXNzYWdlKTtcblxuICAgICAgICAkY29udGFpbmVyLmFwcGVuZCh2aWRlb0VsZW1lbnQpO1xuXG4gICAgICAgIHJldHVybiB2aWRlb0VsZW1lbnQ7XG4gICAgfTtcblxuICAgIHRoYXQuY3JlYXRlTWVkaWEgPSAocHJvdmlkZXJOYW1lICwgcGxheWVyQ29uZmlnKSAgPT4ge1xuICAgICAgICBpZiggcHJvdmlkZXJOYW1lID09PSBQUk9WSURFUl9SVE1QICl7XG4gICAgICAgICAgICBpZih2aWRlb0VsZW1lbnQpe1xuICAgICAgICAgICAgICAgIHRoYXQuZW1wdHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVGbGFzaFZpZGVvKHBsYXllckNvbmZpZy5pc0xvb3AoKSwgcGxheWVyQ29uZmlnLmdldFJ0bXBCdWZmZXJUaW1lKCksIHBsYXllckNvbmZpZy5nZXRSdG1wQnVmZmVyVGltZU1heCgpKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBpZih2aWRlb0VsZW1lbnQpe1xuICAgICAgICAgICAgICAgIC8vdGhhdC5lbXB0eSgpO1xuICAgICAgICAgICAgICAgIC8vcmV1c2UgdmlkZW8gZWxlbWVudC5cbiAgICAgICAgICAgICAgICAvL2JlY3Vhc2UgcGxheWxpc3QgaXMgYXV0byBuZXh0IHBsYXlpbmcuXG4gICAgICAgICAgICAgICAgLy9Pbmx5IHNhbWUgdmlkZW8gZWxlbWVudCBkb2VzIG5vdCByZXF1aXJlIFVzZXIgSW50ZXJhY3Rpb24gRXJyb3IuXG4gICAgICAgICAgICAgICAgLy9Ub0RvIDogcmVmYWN0b3JpbmdcbiAgICAgICAgICAgICAgICByZXR1cm4gdmlkZW9FbGVtZW50O1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUh0bWxWaWRlbyhwbGF5ZXJDb25maWcuaXNMb29wKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhhdC5jcmVhdGVBZENvbnRhaW5lciA9ICgpID0+IHtcbiAgICAgICAgbGV0IGFkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGFkQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnb3AtYWRzJyk7XG4gICAgICAgICRjb250YWluZXIuYXBwZW5kKGFkQ29udGFpbmVyKTtcblxuICAgICAgICByZXR1cm4gYWRDb250YWluZXI7XG4gICAgfTtcblxuXG4gICAgdGhhdC5lbXB0eSA9ICgpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJNZWRpYU1hbmFnZXIgcmVtb3ZlRWxlbWVudCgpXCIpO1xuICAgICAgICAkY29udGFpbmVyLnJlbW92ZUNoaWxkKHZpZGVvRWxlbWVudCk7XG4gICAgICAgIHZpZGVvRWxlbWVudCA9IG51bGw7XG4gICAgfTtcblxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xuICAgICAgICAkY29udGFpbmVyLnJlbW92ZUNoaWxkKCk7XG4gICAgICAgICRjb250YWluZXIgPSBudWxsO1xuICAgICAgICB2aWRlb0VsZW1lbnQgPSBudWxsO1xuICAgICAgICByb290SWQgPSBudWxsO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE1hbmFnZXI7XG4iLCJpbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xuaW1wb3J0IHtpc1J0bXAsIGlzV2ViUlRDLCBpc0Rhc2ggfSBmcm9tIFwidXRpbHMvdmFsaWRhdG9yXCI7XG5pbXBvcnQge2V4dHJhY3RFeHRlbnNpb24gLHRyaW19IGZyb20gXCIuLi8uLi91dGlscy9zdHJpbmdzXCI7XG5pbXBvcnQgU3VwcG9ydENoZWNrZXIgZnJvbSBcIi4uL1N1cHBvcnRDaGVja2VyXCI7XG5pbXBvcnQge1BMQVlMSVNUX0NIQU5HRUR9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5cbi8qKlxuICogQGJyaWVmICAgVGhpcyBtYW5hZ2VzIFBsYXlsaXN0IG9yIFNvdXJjZXMuXG4gKiBAcGFyYW1cbiAqXG4gKiAqL1xuY29uc3QgTWFuYWdlciA9IGZ1bmN0aW9uKHByb3ZpZGVyKXtcbiAgICBjb25zdCB0aGF0ID0ge307XG4gICAgbGV0IGN1cnJlbnRQbGF5bGlzdEl0ZW0gPSBbXTtcbiAgICBsZXQgc3BlYyA9IHtcbiAgICAgICAgcGxheWxpc3QgOiBbXSxcbiAgICAgICAgY3VycmVudEluZGV4IDogMFxuICAgIH07XG4gICAgbGV0IHN1cHBvcnRDaGVja2VyID0gU3VwcG9ydENoZWNrZXIoKTtcblxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBsb2FkZWQuXCIpO1xuXG4gICAgY29uc3QgbWFrZVByZXR0eVNvdXJjZSA9IGZ1bmN0aW9uKHNvdXJjZV8pe1xuICAgICAgICBpZiAoIXNvdXJjZV8gfHwgIXNvdXJjZV8uZmlsZSAmJiAhKHNvdXJjZV8uaG9zdCB8fCBzb3VyY2VfLmFwcGxpY2F0aW9uIHx8IHNvdXJjZV8uc3RyZWFtKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNvdXJjZSA9IE9iamVjdC5hc3NpZ24oe30sIHsgJ2RlZmF1bHQnOiBmYWxzZSB9LCBzb3VyY2VfKTtcbiAgICAgICAgc291cmNlLmZpbGUgPSB0cmltKCcnICsgc291cmNlLmZpbGUpO1xuXG4gICAgICAgIGlmKHNvdXJjZS5ob3N0ICYmIHNvdXJjZS5hcHBsaWNhdGlvbiAmJiBzb3VyY2Uuc3RyZWFtKXtcbiAgICAgICAgICAgIHNvdXJjZS5maWxlID0gc291cmNlLmhvc3QgKyBcIi9cIiArIHNvdXJjZS5hcHBsaWNhdGlvbiArIFwiL3N0cmVhbS9cIiArIHNvdXJjZS5zdHJlYW07XG4gICAgICAgICAgICBkZWxldGUgc291cmNlLmhvc3Q7XG4gICAgICAgICAgICBkZWxldGUgc291cmNlLmFwcGxpY2F0aW9uO1xuICAgICAgICAgICAgZGVsZXRlIHNvdXJjZS5zdHJlYW07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtaW1ldHlwZVJlZ0V4ID0gL15bXi9dK1xcLyg/OngtKT8oW14vXSspJC87XG5cbiAgICAgICAgaWYgKG1pbWV0eXBlUmVnRXgudGVzdChzb3VyY2UudHlwZSkpIHtcbiAgICAgICAgICAgIC8vIGlmIHR5cGUgaXMgZ2l2ZW4gYXMgYSBtaW1ldHlwZVxuICAgICAgICAgICAgc291cmNlLm1pbWVUeXBlID0gc291cmNlLnR5cGU7XG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9IHNvdXJjZS50eXBlLnJlcGxhY2UobWltZXR5cGVSZWdFeCwgJyQxJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihpc1J0bXAoc291cmNlLmZpbGUpKXtcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ3J0bXAnO1xuICAgICAgICB9ZWxzZSBpZihpc1dlYlJUQyhzb3VyY2UuZmlsZSkpe1xuICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnd2VicnRjJztcbiAgICAgICAgfWVsc2UgaWYoaXNEYXNoKHNvdXJjZS5maWxlLCBzb3VyY2UudHlwZSkpe1xuICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnZGFzaCc7XG4gICAgICAgIH1lbHNlIGlmICghc291cmNlLnR5cGUpIHtcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gZXh0cmFjdEV4dGVuc2lvbihzb3VyY2UuZmlsZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXNvdXJjZS50eXBlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBub3JtYWxpemUgdHlwZXNcbiAgICAgICAgc3dpdGNoIChzb3VyY2UudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnbTN1OCc6XG4gICAgICAgICAgICBjYXNlICd2bmQuYXBwbGUubXBlZ3VybCc6XG4gICAgICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnaGxzJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ200YSc6XG4gICAgICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnYWFjJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3NtaWwnOlxuICAgICAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ3J0bXAnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgIGlmIChzb3VyY2Vba2V5XSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgc291cmNlW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzb3VyY2U7XG5cbiAgICB9XG5cbiAgICB0aGF0LmluaXRQbGF5bGlzdCA9KHBsYXlsaXN0KSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIHNldFBsYXlsaXN0KCkgXCIsIHBsYXlsaXN0KTtcbiAgICAgICAgY29uc3QgcHJldHRpZWRQbGF5bGlzdCA9IChfLmlzQXJyYXkocGxheWxpc3QpID8gcGxheWxpc3QgOiBbcGxheWxpc3RdKS5tYXAoZnVuY3Rpb24oaXRlbSl7XG4gICAgICAgICAgICBpZighXy5pc0FycmF5KGl0ZW0udHJhY2tzKSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBpdGVtLnRyYWNrcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBwbGF5bGlzdEl0ZW0gPSBPYmplY3QuYXNzaWduKHt9LHtcbiAgICAgICAgICAgICAgICBzb3VyY2VzOiBbXSxcbiAgICAgICAgICAgICAgICB0cmFja3M6IFtdLFxuICAgICAgICAgICAgICAgIHRpdGxlIDogXCJcIlxuICAgICAgICAgICAgfSwgaXRlbSApO1xuXG4gICAgICAgICAgICBpZigocGxheWxpc3RJdGVtLnNvdXJjZXMgPT09IE9iamVjdChwbGF5bGlzdEl0ZW0uc291cmNlcykpICYmICFfLmlzQXJyYXkocGxheWxpc3RJdGVtLnNvdXJjZXMpKSB7XG4gICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBbbWFrZVByZXR0eVNvdXJjZShwbGF5bGlzdEl0ZW0uc291cmNlcyldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIV8uaXNBcnJheShwbGF5bGlzdEl0ZW0uc291cmNlcykgfHwgcGxheWxpc3RJdGVtLnNvdXJjZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBbbWFrZVByZXR0eVNvdXJjZShwbGF5bGlzdEl0ZW0pXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoIV8uaXNBcnJheShwbGF5bGlzdEl0ZW0uc291cmNlcykgfHwgcGxheWxpc3RJdGVtLnNvdXJjZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ubGV2ZWxzKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gaXRlbS5sZXZlbHM7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBbbWFrZVByZXR0eVNvdXJjZShpdGVtKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBwbGF5bGlzdEl0ZW0uc291cmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBzb3VyY2UgPSBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgcHJldHR5U291cmNlID0gXCJcIjtcbiAgICAgICAgICAgICAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgZGVmYXVsdFNvdXJjZSA9IHNvdXJjZS5kZWZhdWx0O1xuICAgICAgICAgICAgICAgIGlmIChkZWZhdWx0U291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZS5kZWZhdWx0ID0gKGRlZmF1bHRTb3VyY2UudG9TdHJpbmcoKSA9PT0gJ3RydWUnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2UuZGVmYXVsdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBzb3VyY2UgZG9lc24ndCBoYXZlIGEgbGFiZWwsIG51bWJlciBpdFxuICAgICAgICAgICAgICAgIGlmICghcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0ubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0ubGFiZWwgPSBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXS50eXBlK1wiLVwiK2kudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBwcmV0dHlTb3VyY2UgPSBtYWtlUHJldHR5U291cmNlKHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldKTtcbiAgICAgICAgICAgICAgICBpZihzdXBwb3J0Q2hlY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UocHJldHR5U291cmNlKSl7XG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldID0gcHJldHR5U291cmNlO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXSA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IHBsYXlsaXN0SXRlbS5zb3VyY2VzLmZpbHRlcihzb3VyY2UgPT4gISFzb3VyY2UpO1xuXG4gICAgICAgICAgICBpZighcGxheWxpc3RJdGVtLnRpdGxlICYmICBwbGF5bGlzdEl0ZW0uc291cmNlc1swXSAmJiBwbGF5bGlzdEl0ZW0uc291cmNlc1swXS5sYWJlbCl7XG4gICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnRpdGxlID0gcGxheWxpc3RJdGVtLnNvdXJjZXNbMF0ubGFiZWw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGRlZmF1bHQg6rCAIOyXhuydhOuVjCB3ZWJydGPqsIAg7J6I64uk66m0IHdlYnJ0YyBkZWZhdWx0IDogdHJ1ZeuhnCDsnpDrj5kg7ISk7KCVXG4gICAgICAgICAgICAvKmxldCBoYXZlRGVmYXVsdCA9IF8uZmluZChwbGF5bGlzdEl0ZW0uc291cmNlcywgZnVuY3Rpb24oc291cmNlKXtyZXR1cm4gc291cmNlLmRlZmF1bHQgPT0gdHJ1ZTt9KTtcbiAgICAgICAgICAgIGxldCB3ZWJydGNTb3VyY2UgPSBbXTtcbiAgICAgICAgICAgIGlmKCFoYXZlRGVmYXVsdCl7XG4gICAgICAgICAgICAgICAgd2VicnRjU291cmNlID0gXy5maW5kKHBsYXlsaXN0SXRlbS5zb3VyY2VzLCBmdW5jdGlvbihzb3VyY2Upe3JldHVybiBzb3VyY2UudHlwZSA9PSBcIndlYnJ0Y1wiO30pO1xuICAgICAgICAgICAgICAgIGlmKHdlYnJ0Y1NvdXJjZSl7XG4gICAgICAgICAgICAgICAgICAgIHdlYnJ0Y1NvdXJjZS5kZWZhdWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9Ki9cblxuXG5cbiAgICAgICAgICAgIGlmKCFfLmlzQXJyYXkocGxheWxpc3RJdGVtLnRyYWNrcykpe1xuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS50cmFja3MgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKF8uaXNBcnJheShwbGF5bGlzdEl0ZW0uY2FwdGlvbnMpKXtcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0udHJhY2tzID0gcGxheWxpc3RJdGVtLnRyYWNrcy5jb25jYXQocGxheWxpc3RJdGVtLmNhcHRpb25zKTtcbiAgICAgICAgICAgICAgICBkZWxldGUgcGxheWxpc3RJdGVtLmNhcHRpb25zO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwbGF5bGlzdEl0ZW0udHJhY2tzID0gcGxheWxpc3RJdGVtLnRyYWNrcy5tYXAoZnVuY3Rpb24odHJhY2spe1xuICAgICAgICAgICAgICAgIGlmKCF0cmFjayB8fCAhdHJhY2suZmlsZSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHtcbiAgICAgICAgICAgICAgICAgICAgJ2tpbmQnOiAnY2FwdGlvbnMnLFxuICAgICAgICAgICAgICAgICAgICAnZGVmYXVsdCc6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSwgdHJhY2spO1xuICAgICAgICAgICAgfSkuZmlsdGVyKHRyYWNrID0+ICEhdHJhY2spO1xuXG4gICAgICAgICAgICByZXR1cm4gcGxheWxpc3RJdGVtO1xuICAgICAgICB9KS5maWx0ZXIoZnVuY3Rpb24oaXRlbSl7cmV0dXJuIGl0ZW0uc291cmNlcyAmJiBpdGVtLnNvdXJjZXMubGVuZ3RoID4gMDt9KXx8W107XG4gICAgICAgIHNwZWMucGxheWxpc3QgPSBwcmV0dGllZFBsYXlsaXN0O1xuICAgICAgICByZXR1cm4gcHJldHRpZWRQbGF5bGlzdDtcbiAgICB9O1xuICAgIHRoYXQuZ2V0UGxheWxpc3QgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBnZXRQbGF5bGlzdCgpIFwiLCBzcGVjLnBsYXlsaXN0KTtcbiAgICAgICAgcmV0dXJuIHNwZWMucGxheWxpc3Q7XG4gICAgfTtcbiAgICB0aGF0LmdldEN1cnJlbnRQbGF5TGlzdCA9ICgpID0+IHtcbiAgICAgICAgaWYoc3BlYy5wbGF5bGlzdFtzcGVjLmN1cnJlbnRJbmRleF0pe1xuICAgICAgICAgICAgcmV0dXJuIHNwZWMucGxheWxpc3Rbc3BlYy5jdXJyZW50SW5kZXhdO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhhdC5nZXRDdXJyZW50UGxheWxpc3RJbmRleCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudEluZGV4O1xuICAgIH07XG4gICAgdGhhdC5zZXRDdXJyZW50UGxheWxpc3QgPSAoaW5kZXgpID0+IHtcbiAgICAgICAgaWYoc3BlYy5wbGF5bGlzdFtpbmRleF0pe1xuICAgICAgICAgICAgc3BlYy5jdXJyZW50SW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoUExBWUxJU1RfQ0hBTkdFRCwgc3BlYy5jdXJyZW50SW5kZXgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRJbmRleDtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Q3VycmVudFNvdXJjZXMgPSAoKSA9PiB7XG4gICAgICAgIGlmKHNwZWMucGxheWxpc3Rbc3BlYy5jdXJyZW50SW5kZXhdKXtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBnZXRDdXJyZW50U291cmNlcygpIFwiLCBzcGVjLnBsYXlsaXN0W3NwZWMuY3VycmVudEluZGV4XS5zb3VyY2VzKTtcbiAgICAgICAgICAgIHJldHVybiBzcGVjLnBsYXlsaXN0W3NwZWMuY3VycmVudEluZGV4XS5zb3VyY2VzO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICB9O1xuICAgIHRoYXQuZ2V0Q3VycmVudEFkVGFnID0gKCkgPT4ge1xuICAgICAgICBpZihzcGVjLnBsYXlsaXN0W3NwZWMuY3VycmVudEluZGV4XSl7XG4gICAgICAgICAgICByZXR1cm4gc3BlYy5wbGF5bGlzdFtzcGVjLmN1cnJlbnRJbmRleF0uYWRUYWdVcmwgfHwgXCJcIjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgTWFuYWdlcjtcbiIsImltcG9ydCBTdXBwb3J0Q2hlY2tlciBmcm9tIFwiYXBpL1N1cHBvcnRDaGVja2VyXCI7XG5pbXBvcnQge0FwaVJ0bXBFeHBhbnNpb259IGZyb20gJ2FwaS9BcGlFeHBhbnNpb25zJztcbmltcG9ydCB7XG4gICAgUFJPVklERVJfSFRNTDUsIFBST1ZJREVSX1dFQlJUQywgUFJPVklERVJfREFTSCwgUFJPVklERVJfSExTLCBQUk9WSURFUl9SVE1QLFxuICAgIEVSUk9SUywgSU5JVF9VTlNVUFBPUlRfRVJST1Jcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBUaGlzIG1hbmFnZXMgcHJvdmlkZXIuXG4gKiBAcGFyYW1cbiAqICovXG5jb25zdCBDb250cm9sbGVyID0gZnVuY3Rpb24oKXtcbiAgICBsZXQgc3VwcG9ydENoYWNrZXIgPSBTdXBwb3J0Q2hlY2tlcigpO1xuICAgIGNvbnN0IFByb3ZpZGVycyA9IHt9O1xuXG4gICAgY29uc3QgdGhhdCA9IHt9O1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBsb2FkZWQuXCIpO1xuXG4gICAgY29uc3QgcmVnaXN0ZVByb3ZpZGVyID0gKG5hbWUsIHByb3ZpZGVyKSA9PntcbiAgICAgICAgaWYoUHJvdmlkZXJzW25hbWVdKXtcbiAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgIH1cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIF9yZWdpc3RlclByb3ZpZGVyKCkgXCIsIG5hbWUpO1xuICAgICAgICBQcm92aWRlcnNbbmFtZV0gPSBwcm92aWRlcjtcbiAgICB9O1xuXG4gICAgY29uc3QgUHJvdmlkZXJMb2FkZXIgPXtcbiAgICAgICAgaHRtbDU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IdG1sNSddLCBmdW5jdGlvbihyZXF1aXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IdG1sNScpLmRlZmF1bHQ7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVQcm92aWRlcihQUk9WSURFUl9IVE1MNSwgcHJvdmlkZXIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7bmFtZSA6IFBST1ZJREVSX0hUTUw1LCBwcm92aWRlciA6IHByb3ZpZGVyfTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcbiAgICAgICAgICAgICAgICB9LCdvdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1J1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgd2VicnRjIDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvV2ViUlRDJ10sIGZ1bmN0aW9uKHJlcXVpcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvaHRtbDUvcHJvdmlkZXJzL1dlYlJUQycpLmRlZmF1bHQ7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVQcm92aWRlcihQUk9WSURFUl9XRUJSVEMsIHByb3ZpZGVyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge25hbWUgOiBQUk9WSURFUl9XRUJSVEMsIHByb3ZpZGVyIDogcHJvdmlkZXJ9O1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xuICAgICAgICAgICAgICAgIH0sJ292ZW5wbGF5ZXIucHJvdmlkZXIuV2ViUlRDUHJvdmlkZXInXG4gICAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICBkYXNoIDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvRGFzaCddLCBmdW5jdGlvbihyZXF1aXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9EYXNoJykuZGVmYXVsdDtcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFBST1ZJREVSX0RBU0gsIHByb3ZpZGVyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge25hbWUgOiBQUk9WSURFUl9EQVNILCBwcm92aWRlciA6IHByb3ZpZGVyfTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcbiAgICAgICAgICAgICAgICB9LCdvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcidcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIGhscyA6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvaHRtbDUvcHJvdmlkZXJzL0hscyddLCBmdW5jdGlvbihyZXF1aXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IbHMnKS5kZWZhdWx0O1xuICAgICAgICAgICAgICAgICAgICByZWdpc3RlUHJvdmlkZXIoUFJPVklERVJfSExTLCBwcm92aWRlcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtuYW1lIDogUFJPVklERVJfSExTLCBwcm92aWRlciA6IHByb3ZpZGVyfTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcbiAgICAgICAgICAgICAgICB9LCdvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgcnRtcCA6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvZmxhc2gvcHJvdmlkZXJzL1J0bXAnXSwgZnVuY3Rpb24ocmVxdWlyZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci9mbGFzaC9wcm92aWRlcnMvUnRtcCcpLmRlZmF1bHQ7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVQcm92aWRlcihQUk9WSURFUl9SVE1QLCBwcm92aWRlcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7bmFtZSA6IFBST1ZJREVSX1JUTVAsIHByb3ZpZGVyIDogcHJvdmlkZXJ9O1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xuICAgICAgICAgICAgICAgIH0sJ292ZW5wbGF5ZXIucHJvdmlkZXIuUnRtcFByb3ZpZGVyJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIHRoYXQubG9hZFByb3ZpZGVycyA9IChwbGF5bGlzdEl0ZW0pID0+e1xuICAgICAgICBjb25zdCBzdXBwb3J0ZWRQcm92aWRlck5hbWVzID0gc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0KHBsYXlsaXN0SXRlbSk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBsb2FkUHJvdmlkZXJzKCkgXCIsIHN1cHBvcnRlZFByb3ZpZGVyTmFtZXMpO1xuICAgICAgICBpZighc3VwcG9ydGVkUHJvdmlkZXJOYW1lcyl7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRVJST1JTW0lOSVRfVU5TVVBQT1JUX0VSUk9SXSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFxuICAgICAgICAgICAgICAgIHN1cHBvcnRlZFByb3ZpZGVyTmFtZXMuZmlsdGVyKGZ1bmN0aW9uKHByb3ZpZGVyTmFtZSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhIVByb3ZpZGVyTG9hZGVyW3Byb3ZpZGVyTmFtZV07XG4gICAgICAgICAgICAgICAgfSkubWFwKGZ1bmN0aW9uKHByb3ZpZGVyTmFtZSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm92aWRlckxvYWRlcltwcm92aWRlck5hbWVdKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICB0aGF0LmZpbmRCeU5hbWUgPSAobmFtZSkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgZmluZEJ5TmFtZSgpIFwiLCBuYW1lKTtcbiAgICAgICAgcmV0dXJuIFByb3ZpZGVyc1tuYW1lXTtcbiAgICB9O1xuXG4gICAgdGhhdC5nZXRQcm92aWRlckJ5U291cmNlID0gKHNvdXJjZSkgPT4ge1xuICAgICAgICBjb25zdCBzdXBwb3J0ZWRQcm92aWRlck5hbWUgPSBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2Uoc291cmNlKTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGdldFByb3ZpZGVyQnlTb3VyY2UoKSBcIiwgc3VwcG9ydGVkUHJvdmlkZXJOYW1lKTtcbiAgICAgICAgcmV0dXJuIHRoYXQuZmluZEJ5TmFtZShzdXBwb3J0ZWRQcm92aWRlck5hbWUpO1xuICAgIH07XG5cbiAgICB0aGF0LmlzU2FtZVByb3ZpZGVyID0gKGN1cnJlbnRTb3VyY2UsIG5ld1NvdXJjZSkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgaXNTYW1lUHJvdmlkZXIoKSBcIiwgc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKGN1cnJlbnRTb3VyY2UpICwgc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKG5ld1NvdXJjZSkgKTtcbiAgICAgICAgcmV0dXJuIHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShjdXJyZW50U291cmNlKSA9PT0gc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKG5ld1NvdXJjZSk7XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29udHJvbGxlcjtcbiIsImltcG9ydCBBUEkgZnJvbSAnYXBpL0FwaSc7XG5pbXBvcnQge2lzV2ViUlRDfSBmcm9tICd1dGlscy92YWxpZGF0b3InO1xuaW1wb3J0IF8gZnJvbSAndXRpbHMvdW5kZXJzY29yZSc7XG5pbXBvcnQgTGEkIGZyb20gJ3V0aWxzL2xpa2VBJCc7XG5pbXBvcnQge2dldFNjcmlwdFBhdGh9IGZyb20gJ3V0aWxzL3dlYnBhY2snO1xuXG5cbl9fd2VicGFja19wdWJsaWNfcGF0aF9fID0gZ2V0U2NyaXB0UGF0aCgnb3ZlbnBsYXllci5zZGsuanMnKTtcblxuLyoqXG4gKiBNYWluIE92ZW5QbGF5ZXJTREsgb2JqZWN0XG4gKi9cbmNvbnN0IE92ZW5QbGF5ZXJTREsgPSB3aW5kb3cuT3ZlblBsYXllclNESyA9IHt9O1xuXG5jb25zdCBwbGF5ZXJMaXN0ID0gT3ZlblBsYXllclNESy5wbGF5ZXJMaXN0ID0gW107XG5cbmV4cG9ydCBjb25zdCBjaGVja0FuZEdldENvbnRhaW5lckVsZW1lbnQgPSBmdW5jdGlvbihjb250YWluZXIpIHtcbiAgICBpZiAoIWNvbnRhaW5lcikge1xuXG4gICAgICAgIC8vIFRPRE8ocm9jayk6IFNob3VsZCBjYXVzZSBhbiBlcnJvci5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgbGV0IGNvbnRhaW5lckVsZW1lbnQgPSBudWxsO1xuXG4gICAgaWYgKHR5cGVvZiBjb250YWluZXIgPT09ICdzdHJpbmcnKSB7XG5cbiAgICAgICAgY29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvbnRhaW5lcik7XG4gICAgfSBlbHNlIGlmIChjb250YWluZXIubm9kZVR5cGUpIHtcblxuICAgICAgICBjb250YWluZXJFbGVtZW50ID0gY29udGFpbmVyO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFRPRE8ocm9jayk6IFNob3VsZCBjYXVzZSBhbiBlcnJvci5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnRhaW5lckVsZW1lbnQ7XG59XG5cbi8qKlxuICogQ3JlYXRlIHBsYXllciBpbnN0YW5jZSBhbmQgcmV0dXJuIGl0LlxuICpcbiAqIEBwYXJhbSAgICAgIHtzdHJpbmcgfCBkb20gZWxlbWVudH0gY29udGFpbmVyICBJZCBvZiBjb250YWluZXIgZWxlbWVudCBvciBjb250YWluZXIgZWxlbWVudFxuICogQHBhcmFtICAgICAge29iamVjdH0gb3B0aW9ucyAgVGhlIG9wdGlvbnNcbiAqL1xuT3ZlblBsYXllclNESy5jcmVhdGUgPSBmdW5jdGlvbihjb250YWluZXIsIG9wdGlvbnMpIHtcblxuICAgIGxldCBjb250YWluZXJFbGVtZW50ID0gY2hlY2tBbmRHZXRDb250YWluZXJFbGVtZW50KGNvbnRhaW5lcik7XG5cbiAgICBjb25zdCBwbGF5ZXJJbnN0YW5jZSA9IEFQSShjb250YWluZXJFbGVtZW50KTtcbiAgICBwbGF5ZXJJbnN0YW5jZS5pbml0KG9wdGlvbnMpO1xuXG4gICAgcGxheWVyTGlzdC5wdXNoKHBsYXllckluc3RhbmNlKTtcblxuICAgIHJldHVybiBwbGF5ZXJJbnN0YW5jZTtcbn07XG5cbi8qKlxuICogR2V0cyB0aGUgcGxheWVyIGluc3RhbmNlIGxpc3QuXG4gKlxuICogQHJldHVybiAgICAge2FycmF5fSAgVGhlIHBsYXllciBsaXN0LlxuICovXG5PdmVuUGxheWVyU0RLLmdldFBsYXllckxpc3QgPSBmdW5jdGlvbigpIHtcblxuICAgIHJldHVybiBwbGF5ZXJMaXN0O1xufTtcblxuLyoqXG4gKiBHZXRzIHRoZSBwbGF5ZXIgaW5zdGFuY2UgYnkgY29udGFpbmVyIGlkLlxuICpcbiAqIEBwYXJhbSAgICAgIHtzdHJpbmd9ICBjb250YWluZXJJZCAgVGhlIGNvbnRhaW5lciBpZGVudGlmaWVyXG4gKiBAcmV0dXJuICAgICB7b2JlamVjdCB8IG51bGx9ICBUaGUgcGxheWVyIGluc3RhbmNlLlxuICovXG5PdmVuUGxheWVyU0RLLmdldFBsYXllckJ5Q29udGFpbmVySWQgPSBmdW5jdGlvbihjb250YWluZXJJZCkge1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5ZXJMaXN0Lmxlbmd0aDsgaSArKykge1xuXG4gICAgICAgIGlmIChwbGF5ZXJMaXN0W2ldLmdldENvbnRhaW5lcklkKCkgPT09IGNvbnRhaW5lcklkKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBwbGF5ZXJMaXN0W2ldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG59O1xuXG4vKipcbiAqIEdldHMgdGhlIHBsYXllciBpbnN0YW5jZSBieSBpbmRleC5cbiAqXG4gKiBAcGFyYW0gICAgICB7bnVtYmVyfSAgaW5kZXggICBUaGUgaW5kZXhcbiAqIEByZXR1cm4gICAgIHtvYmplY3QgfCBudWxsfSAgVGhlIHBsYXllciBpbnN0YW5jZS5cbiAqL1xuT3ZlblBsYXllclNESy5nZXRQbGF5ZXJCeUluZGV4ID0gZnVuY3Rpb24oaW5kZXgpIHtcblxuICAgIGNvbnN0IHBsYXllckluc3RhbmNlID0gcGxheWVyTGlzdFtpbmRleF07XG5cbiAgICBpZiAocGxheWVySW5zdGFuY2UpIHtcblxuICAgICAgICByZXR1cm4gcGxheWVySW5zdGFuY2U7XG4gICAgfSBlbHNlIHtcblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59O1xuXG4vKipcbiAqIFJlbW92ZSB0aGUgcGxheWVyIGluc3RhbmNlIGJ5IHBsYXllcklkLlxuICpcbiAqIEBwYXJhbSAgICAgIHtwbGF5ZXJJZH0gIGlkXG4gKiBAcmV0dXJuICAgICB7bnVsbH1cbiAqL1xuT3ZlblBsYXllclNESy5yZW1vdmVQbGF5ZXIgPSBmdW5jdGlvbihwbGF5ZXJJZCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxheWVyTGlzdC5sZW5ndGg7IGkgKyspIHtcblxuICAgICAgICBpZiAocGxheWVyTGlzdFtpXS5nZXRDb250YWluZXJJZCgpID09PSBwbGF5ZXJJZCkge1xuXG4gICAgICAgICAgICBwbGF5ZXJMaXN0LnNwbGljZShpLCAxKTtcbiAgICAgICAgfVxuICAgIH1cblxufTtcblxuLyoqXG4gKiBHZW5lcmF0ZSB3ZWJydGMgc291cmNlIGZvciBwbGF5ZXIgc291cmNlIHR5cGUuXG4gKlxuICogQHBhcmFtICAgICAge09iamVjdCB8IEFycmF5fSAgc291cmNlICAgd2VicnRjIHNvdXJjZVxuICogQHJldHVybiAgICAge0FycmF5fSAgUGxheWVyIHNvdXJjZSBPYmplY3QuXG4gKi9cbk92ZW5QbGF5ZXJTREsuZ2VuZXJhdGVXZWJydGNVcmxzID0gZnVuY3Rpb24oc291cmNlcykge1xuICAgIHJldHVybiAoXy5pc0FycmF5KHNvdXJjZXMpID8gc291cmNlcyA6IFtzb3VyY2VzXSkubWFwKGZ1bmN0aW9uKHNvdXJjZSwgaW5kZXgpe1xuICAgICAgICBpZihzb3VyY2UuaG9zdCAmJiBpc1dlYlJUQyhzb3VyY2UuaG9zdCkgJiYgc291cmNlLmFwcGxpY2F0aW9uICYmIHNvdXJjZS5zdHJlYW0pe1xuICAgICAgICAgICAgcmV0dXJuIHtmaWxlIDogc291cmNlLmhvc3QgKyBcIi9cIiArIHNvdXJjZS5hcHBsaWNhdGlvbiArIFwiL1wiICsgc291cmNlLnN0cmVhbSwgdHlwZSA6IFwid2VicnRjXCIsIGxhYmVsIDogc291cmNlLmxhYmVsID8gc291cmNlLmxhYmVsIDogXCJ3ZWJydGMtXCIrKGluZGV4KzEpIH07XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbi8qKlxuICogV2hldGhlciBzaG93IHRoZSBwbGF5ZXIgY29yZSBsb2cgb3Igbm90LlxuICpcbiAqIEBwYXJhbSAgICAgIHtib29sZWFufSAgYm9vbGVhbiAgIHJ1biBkZWJ1ZyBtb2RlIG9yIG5vdC5cbiAqIEByZXR1cm4gICAgIHtib29sZWFufSAgcnVuIGRlYnVnIG1vZGUgb3Igbm90LlxuICovXG5PdmVuUGxheWVyU0RLLmRlYnVnID0gZnVuY3Rpb24oaXNEZWJ1Z01vZGUpIHtcbiAgICBpZihpc0RlYnVnTW9kZSl7XG4gICAgICAgIHdpbmRvdy5PdmVuUGxheWVyQ29uc29sZSA9IHtsb2cgOiB3aW5kb3dbJ2NvbnNvbGUnXVsnbG9nJ119O1xuICAgIH1lbHNle1xuICAgICAgICB3aW5kb3cuT3ZlblBsYXllckNvbnNvbGUgPSB7bG9nIDogIGZ1bmN0aW9uKCl7fX07XG4gICAgfVxuICAgIHJldHVybiBpc0RlYnVnTW9kZTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE92ZW5QbGF5ZXJTREs7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyNC4uXG4gKi9cblxuZXhwb3J0IGNvbnN0IGdldEJyb3dzZXJMYW5ndWFnZSA9IGZ1bmN0aW9uKCl7XG4gICAgbGV0IG5hdiA9IHdpbmRvdy5uYXZpZ2F0b3IsXG4gICAgICAgIGJyb3dzZXJMYW5ndWFnZVByb3BlcnR5S2V5cyA9IFsnbGFuZ3VhZ2UnLCAnYnJvd3Nlckxhbmd1YWdlJywgJ3N5c3RlbUxhbmd1YWdlJywgJ3VzZXJMYW5ndWFnZSddLFxuICAgICAgICBpLFxuICAgICAgICBsYW5ndWFnZTtcblxuICAgIC8vIHN1cHBvcnQgZm9yIEhUTUwgNS4xIFwibmF2aWdhdG9yLmxhbmd1YWdlc1wiXG4gICAgaWYgKEFycmF5LmlzQXJyYXkobmF2Lmxhbmd1YWdlcykpIHtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IG5hdi5sYW5ndWFnZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxhbmd1YWdlID0gbmF2Lmxhbmd1YWdlc1tpXTtcbiAgICAgICAgICAgIGlmIChsYW5ndWFnZSAmJiBsYW5ndWFnZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGFuZ3VhZ2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzdXBwb3J0IGZvciBvdGhlciB3ZWxsIGtub3duIHByb3BlcnRpZXMgaW4gYnJvd3NlcnNcbiAgICBmb3IgKGkgPSAwOyBpIDwgYnJvd3Nlckxhbmd1YWdlUHJvcGVydHlLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxhbmd1YWdlID0gbmF2W2Jyb3dzZXJMYW5ndWFnZVByb3BlcnR5S2V5c1tpXV07XG4gICAgICAgIGlmIChsYW5ndWFnZSAmJiBsYW5ndWFnZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBsYW5ndWFnZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xufTtcbmV4cG9ydCBjb25zdCBhbmFsVXNlckFnZW50ID0gZnVuY3Rpb24oKXtcbiAgICBsZXQgdW5rbm93biA9ICctJztcblxuICAgIC8vIHNjcmVlblxuICAgIGxldCBzY3JlZW5TaXplID0gJyc7XG4gICAgaWYgKHNjcmVlbi53aWR0aCkge1xuICAgICAgICBsZXQgd2lkdGggPSAoc2NyZWVuLndpZHRoKSA/IHNjcmVlbi53aWR0aCA6ICcnO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gKHNjcmVlbi5oZWlnaHQpID8gc2NyZWVuLmhlaWdodCA6ICcnO1xuICAgICAgICBzY3JlZW5TaXplICs9ICcnICsgd2lkdGggKyBcIiB4IFwiICsgaGVpZ2h0O1xuICAgIH1cblxuICAgIC8vIGJyb3dzZXJcbiAgICBsZXQgblZlciA9IG5hdmlnYXRvci5hcHBWZXJzaW9uO1xuICAgIGxldCBuQWd0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgICBsZXQgYnJvd3NlciA9IG5hdmlnYXRvci5hcHBOYW1lO1xuICAgIGxldCB2ZXJzaW9uID0gJycgKyBwYXJzZUZsb2F0KG5hdmlnYXRvci5hcHBWZXJzaW9uKTtcbiAgICBsZXQgbWFqb3JWZXJzaW9uID0gcGFyc2VJbnQobmF2aWdhdG9yLmFwcFZlcnNpb24sIDEwKTtcbiAgICBsZXQgaXNXZWJ2aWV3ID0gZmFsc2U7XG4gICAgbGV0IG5hbWVPZmZzZXQsIHZlck9mZnNldCwgaXg7XG5cbiAgICAvLyBPcGVyYVxuICAgIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdPcGVyYScpKSAhPSAtMSkge1xuICAgICAgICBicm93c2VyID0gJ09wZXJhJztcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDYpO1xuICAgICAgICBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignVmVyc2lvbicpKSAhPSAtMSkge1xuICAgICAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIE9wZXJhIE5leHRcbiAgICBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignT1BSJykpICE9IC0xKSB7XG4gICAgICAgIGJyb3dzZXIgPSAnT3BlcmEnO1xuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNCk7XG4gICAgfVxuICAgIC8v7IK87ISxIOu4jOudvOyasOyggFxuICAgIGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ1NhbXN1bmdCcm93c2VyJykpICE9IC0xKSB7XG4gICAgICAgIGJyb3dzZXIgPSAnU2Ftc3VuZ0Jyb3dzZXInO1xuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgMTUpO1xuICAgIH1cbiAgICAvLyBFZGdlXG4gICAgZWxzZSBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignRWRnZScpKSAhPSAtMSkge1xuICAgICAgICBicm93c2VyID0gJ01pY3Jvc29mdCBFZGdlJztcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDUpO1xuICAgIH1cbiAgICAvLyBNU0lFXG4gICAgZWxzZSBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignTVNJRScpKSAhPSAtMSkge1xuICAgICAgICBicm93c2VyID0gJ01pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3Jlcic7XG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA1KTtcblxuXG4gICAgICAgIC8vd2luNyBJRTExIHVzZXJBZ2VudCBpcyB1Z2x5Li4uLlxuICAgICAgICBpZiggKG5BZ3QuaW5kZXhPZignVHJpZGVudC8nKSAhPT0gLTEpICYmIChuQWd0LmluZGV4T2YoJ3J2OicpICE9PSAtMSkgICl7XG4gICAgICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcobkFndC5pbmRleE9mKCdydjonKSArIDMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIENocm9tZVxuICAgIGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ0Nocm9tZScpKSAhPSAtMSkge1xuICAgICAgICBicm93c2VyID0gJ0Nocm9tZSc7XG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA3KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignQ3JpT1MnKSkgIT0gLTEpIHsgICAvL2lwaG9uZSAtIGNocm9tZVxuICAgICAgICBicm93c2VyID0gJ0Nocm9tZSc7XG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA2KTtcbiAgICB9XG4gICAgLy8gRmlyZWZveFxuICAgIGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ0ZpcmVmb3gnKSkgIT0gLTEpIHtcbiAgICAgICAgYnJvd3NlciA9ICdGaXJlZm94JztcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDgpO1xuICAgIH1cbiAgICBlbHNlIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdGeGlPUycpKSAhPSAtMSkge1xuICAgICAgICBicm93c2VyID0gJ0ZpcmVmb3gnO1xuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNik7XG4gICAgfVxuICAgIC8vIFNhZmFyaVxuICAgIGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ1NhZmFyaScpKSAhPSAtMSkge1xuICAgICAgICBicm93c2VyID0gJ1NhZmFyaSc7XG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA3KTtcbiAgICAgICAgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ1ZlcnNpb24nKSkgIT0gLTEpIHtcbiAgICAgICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA4KTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8gTVNJRSAxMStcbiAgICBlbHNlIGlmIChuQWd0LmluZGV4T2YoJ1RyaWRlbnQvJykgIT09IC0xKSB7XG4gICAgICAgIGJyb3dzZXIgPSAnTWljcm9zb2Z0IEludGVybmV0IEV4cGxvcmVyJztcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKG5BZ3QuaW5kZXhPZigncnY6JykgKyAzKTtcbiAgICB9XG4gICAgLy8gT3RoZXIgYnJvd3NlcnNcbiAgICBlbHNlIGlmICgobmFtZU9mZnNldCA9IG5BZ3QubGFzdEluZGV4T2YoJyAnKSArIDEpIDwgKHZlck9mZnNldCA9IG5BZ3QubGFzdEluZGV4T2YoJy8nKSkpIHtcbiAgICAgICAgYnJvd3NlciA9IG5BZ3Quc3Vic3RyaW5nKG5hbWVPZmZzZXQsIHZlck9mZnNldCk7XG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyAxKTtcbiAgICAgICAgaWYgKGJyb3dzZXIudG9Mb3dlckNhc2UoKSA9PSBicm93c2VyLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgICAgICAgIGJyb3dzZXIgPSBuYXZpZ2F0b3IuYXBwTmFtZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZihuQWd0LmluZGV4T2YoJyB3dicpID4gMCl7XG4gICAgICAgIGlzV2VidmlldyA9IHRydWU7XG4gICAgfVxuICAgIC8vIHRyaW0gdGhlIHZlcnNpb24gc3RyaW5nXG4gICAgaWYgKChpeCA9IHZlcnNpb24uaW5kZXhPZignOycpKSAhPSAtMSkgdmVyc2lvbiA9IHZlcnNpb24uc3Vic3RyaW5nKDAsIGl4KTtcbiAgICBpZiAoKGl4ID0gdmVyc2lvbi5pbmRleE9mKCcgJykpICE9IC0xKSB2ZXJzaW9uID0gdmVyc2lvbi5zdWJzdHJpbmcoMCwgaXgpO1xuICAgIGlmICgoaXggPSB2ZXJzaW9uLmluZGV4T2YoJyknKSkgIT0gLTEpIHZlcnNpb24gPSB2ZXJzaW9uLnN1YnN0cmluZygwLCBpeCk7XG5cbiAgICBtYWpvclZlcnNpb24gPSBwYXJzZUludCgnJyArIHZlcnNpb24sIDEwKTtcbiAgICBpZiAoaXNOYU4obWFqb3JWZXJzaW9uKSkge1xuICAgICAgICB2ZXJzaW9uID0gJycgKyBwYXJzZUZsb2F0KG5hdmlnYXRvci5hcHBWZXJzaW9uKTtcbiAgICAgICAgbWFqb3JWZXJzaW9uID0gcGFyc2VJbnQobmF2aWdhdG9yLmFwcFZlcnNpb24sIDEwKTtcbiAgICB9XG5cbiAgICAvLyBtb2JpbGUgdmVyc2lvblxuICAgIHZhciBtb2JpbGUgPSAvTW9iaWxlfG1pbml8RmVubmVjfEFuZHJvaWR8aVAoYWR8b2R8aG9uZSkvLnRlc3QoblZlcik7XG5cbiAgICAvLyBjb29raWVcbiAgICB2YXIgY29va2llRW5hYmxlZCA9IChuYXZpZ2F0b3IuY29va2llRW5hYmxlZCkgPyB0cnVlIDogZmFsc2U7XG5cbiAgICBpZiAodHlwZW9mIG5hdmlnYXRvci5jb29raWVFbmFibGVkID09ICd1bmRlZmluZWQnICYmICFjb29raWVFbmFibGVkKSB7XG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9ICd0ZXN0Y29va2llJztcbiAgICAgICAgY29va2llRW5hYmxlZCA9IChkb2N1bWVudC5jb29raWUuaW5kZXhPZigndGVzdGNvb2tpZScpICE9IC0xKSA/IHRydWUgOiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBzeXN0ZW1cbiAgICB2YXIgb3MgPSB1bmtub3duO1xuICAgIHZhciBjbGllbnRTdHJpbmdzID0gW1xuICAgICAgICB7czonV2luZG93cyAxMCcsIHI6LyhXaW5kb3dzIDEwLjB8V2luZG93cyBOVCAxMC4wKS99LFxuICAgICAgICB7czonV2luZG93cyA4LjEnLCByOi8oV2luZG93cyA4LjF8V2luZG93cyBOVCA2LjMpL30sXG4gICAgICAgIHtzOidXaW5kb3dzIDgnLCByOi8oV2luZG93cyA4fFdpbmRvd3MgTlQgNi4yKS99LFxuICAgICAgICB7czonV2luZG93cyA3JywgcjovKFdpbmRvd3MgN3xXaW5kb3dzIE5UIDYuMSkvfSxcbiAgICAgICAge3M6J1dpbmRvd3MgVmlzdGEnLCByOi9XaW5kb3dzIE5UIDYuMC99LFxuICAgICAgICB7czonV2luZG93cyBTZXJ2ZXIgMjAwMycsIHI6L1dpbmRvd3MgTlQgNS4yL30sXG4gICAgICAgIHtzOidXaW5kb3dzIFhQJywgcjovKFdpbmRvd3MgTlQgNS4xfFdpbmRvd3MgWFApL30sXG4gICAgICAgIHtzOidXaW5kb3dzIDIwMDAnLCByOi8oV2luZG93cyBOVCA1LjB8V2luZG93cyAyMDAwKS99LFxuICAgICAgICB7czonV2luZG93cyBNRScsIHI6LyhXaW4gOXggNC45MHxXaW5kb3dzIE1FKS99LFxuICAgICAgICB7czonV2luZG93cyA5OCcsIHI6LyhXaW5kb3dzIDk4fFdpbjk4KS99LFxuICAgICAgICB7czonV2luZG93cyA5NScsIHI6LyhXaW5kb3dzIDk1fFdpbjk1fFdpbmRvd3NfOTUpL30sXG4gICAgICAgIHtzOidXaW5kb3dzIE5UIDQuMCcsIHI6LyhXaW5kb3dzIE5UIDQuMHxXaW5OVDQuMHxXaW5OVHxXaW5kb3dzIE5UKS99LFxuICAgICAgICB7czonV2luZG93cyBDRScsIHI6L1dpbmRvd3MgQ0UvfSxcbiAgICAgICAge3M6J1dpbmRvd3MgMy4xMScsIHI6L1dpbjE2L30sXG4gICAgICAgIHtzOidBbmRyb2lkJywgcjovQW5kcm9pZC99LFxuICAgICAgICB7czonT3BlbiBCU0QnLCByOi9PcGVuQlNEL30sXG4gICAgICAgIHtzOidTdW4gT1MnLCByOi9TdW5PUy99LFxuICAgICAgICB7czonTGludXgnLCByOi8oTGludXh8WDExKS99LFxuICAgICAgICB7czonaU9TJywgcjovKGlQaG9uZXxpUGFkfGlQb2QpL30sXG4gICAgICAgIHtzOidNYWMgT1MgWCcsIHI6L01hYyBPUyBYL30sXG4gICAgICAgIHtzOidNYWMgT1MnLCByOi8oTWFjUFBDfE1hY0ludGVsfE1hY19Qb3dlclBDfE1hY2ludG9zaCkvfSxcbiAgICAgICAge3M6J1FOWCcsIHI6L1FOWC99LFxuICAgICAgICB7czonVU5JWCcsIHI6L1VOSVgvfSxcbiAgICAgICAge3M6J0JlT1MnLCByOi9CZU9TL30sXG4gICAgICAgIHtzOidPUy8yJywgcjovT1NcXC8yL30sXG4gICAgICAgIHtzOidTZWFyY2ggQm90JywgcjovKG51aGt8R29vZ2xlYm90fFlhbW15Ym90fE9wZW5ib3R8U2x1cnB8TVNOQm90fEFzayBKZWV2ZXNcXC9UZW9tYXxpYV9hcmNoaXZlcikvfVxuICAgIF07XG4gICAgZm9yICh2YXIgaWQgaW4gY2xpZW50U3RyaW5ncykge1xuICAgICAgICB2YXIgY3MgPSBjbGllbnRTdHJpbmdzW2lkXTtcbiAgICAgICAgaWYgKGNzLnIudGVzdChuQWd0KSkge1xuICAgICAgICAgICAgb3MgPSBjcy5zO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgb3NWZXJzaW9uID0gdW5rbm93bjtcblxuICAgIGlmICgvV2luZG93cy8udGVzdChvcykpIHtcbiAgICAgICAgb3NWZXJzaW9uID0gL1dpbmRvd3MgKC4qKS8uZXhlYyhvcylbMV07XG4gICAgICAgIG9zID0gJ1dpbmRvd3MnO1xuICAgIH1cblxuICAgIHN3aXRjaCAob3MpIHtcbiAgICAgICAgY2FzZSAnTWFjIE9TIFgnOlxuICAgICAgICAgICAgb3NWZXJzaW9uID0gL01hYyBPUyBYICgxMFtcXC5cXF9cXGRdKykvLmV4ZWMobkFndClbMV07XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBbmRyb2lkJzpcbiAgICAgICAgICAgIG9zVmVyc2lvbiA9IC9BbmRyb2lkIChbXFwuXFxfXFxkXSspLy5leGVjKG5BZ3QpWzFdO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnaU9TJzpcbiAgICAgICAgICAgIG9zVmVyc2lvbiA9IC9PUyAoXFxkKylfKFxcZCspXz8oXFxkKyk/Ly5leGVjKG5WZXIpO1xuICAgICAgICAgICAgb3NWZXJzaW9uID0gb3NWZXJzaW9uWzFdICsgJy4nICsgb3NWZXJzaW9uWzJdICsgJy4nICsgKG9zVmVyc2lvblszXSB8IDApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2NyZWVuOiBzY3JlZW5TaXplLFxuICAgICAgICBicm93c2VyOiBicm93c2VyLFxuICAgICAgICBicm93c2VyVmVyc2lvbjogdmVyc2lvbixcbiAgICAgICAgYnJvd3Nlck1ham9yVmVyc2lvbjogbWFqb3JWZXJzaW9uLFxuICAgICAgICBtb2JpbGU6IG1vYmlsZSxcbiAgICAgICAgdWEgOiBuQWd0LFxuICAgICAgICBvczogb3MsXG4gICAgICAgIG9zVmVyc2lvbjogb3NWZXJzaW9uLFxuICAgICAgICBjb29raWVzOiBjb29raWVFbmFibGVkXG4gICAgfTtcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzIHZ0dC5qcyBDb250cmlidXRvcnNcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5sZXQgVlRUQ3VlID0gd2luZG93LlZUVEN1ZTtcblxudmFyIGF1dG9LZXl3b3JkID0gXCJhdXRvXCI7XG52YXIgZGlyZWN0aW9uU2V0dGluZyA9IHtcbiAgICBcIlwiOiB0cnVlLFxuICAgIFwibHJcIjogdHJ1ZSxcbiAgICBcInJsXCI6IHRydWVcbn07XG52YXIgYWxpZ25TZXR0aW5nID0ge1xuICAgIFwic3RhcnRcIjogdHJ1ZSxcbiAgICBcIm1pZGRsZVwiOiB0cnVlLFxuICAgIFwiZW5kXCI6IHRydWUsXG4gICAgXCJsZWZ0XCI6IHRydWUsXG4gICAgXCJyaWdodFwiOiB0cnVlXG59O1xuXG5mdW5jdGlvbiBmaW5kRGlyZWN0aW9uU2V0dGluZyh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgZGlyID0gZGlyZWN0aW9uU2V0dGluZ1t2YWx1ZS50b0xvd2VyQ2FzZSgpXTtcbiAgICByZXR1cm4gZGlyID8gdmFsdWUudG9Mb3dlckNhc2UoKSA6IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBmaW5kQWxpZ25TZXR0aW5nKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciBhbGlnbiA9IGFsaWduU2V0dGluZ1t2YWx1ZS50b0xvd2VyQ2FzZSgpXTtcbiAgICByZXR1cm4gYWxpZ24gPyB2YWx1ZS50b0xvd2VyQ2FzZSgpIDogZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGV4dGVuZChvYmopIHtcbiAgICB2YXIgaSA9IDE7XG4gICAgZm9yICg7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNvYmogPSBhcmd1bWVudHNbaV07XG4gICAgICAgIGZvciAodmFyIHAgaW4gY29iaikge1xuICAgICAgICAgICAgb2JqW3BdID0gY29ialtwXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvYmo7XG59XG5pZighVlRUQ3VlKXtcbiAgICBWVFRDdWUgPSBmdW5jdGlvbiAoc3RhcnRUaW1lLCBlbmRUaW1lLCB0ZXh0KSB7XG4gICAgICAgIHZhciBjdWUgPSB0aGlzO1xuICAgICAgICB2YXIgaXNJRTggPSAoL01TSUVcXHM4XFwuMC8pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgICAgIHZhciBiYXNlT2JqID0ge307XG5cbiAgICAgICAgaWYgKGlzSUU4KSB7XG4gICAgICAgICAgICBjdWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjdXN0b20nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJhc2VPYmouZW51bWVyYWJsZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogU2hpbSBpbXBsZW1lbnRhdGlvbiBzcGVjaWZpYyBwcm9wZXJ0aWVzLiBUaGVzZSBwcm9wZXJ0aWVzIGFyZSBub3QgaW5cbiAgICAgICAgICogdGhlIHNwZWMuXG4gICAgICAgICAqL1xuXG4gICAgICAgICAgICAvLyBMZXRzIHVzIGtub3cgd2hlbiB0aGUgVlRUQ3VlJ3MgZGF0YSBoYXMgY2hhbmdlZCBpbiBzdWNoIGEgd2F5IHRoYXQgd2UgbmVlZFxuICAgICAgICAgICAgLy8gdG8gcmVjb21wdXRlIGl0cyBkaXNwbGF5IHN0YXRlLiBUaGlzIGxldHMgdXMgY29tcHV0ZSBpdHMgZGlzcGxheSBzdGF0ZVxuICAgICAgICAgICAgLy8gbGF6aWx5LlxuICAgICAgICBjdWUuaGFzQmVlblJlc2V0ID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFZUVEN1ZSBhbmQgVGV4dFRyYWNrQ3VlIHByb3BlcnRpZXNcbiAgICAgICAgICogaHR0cDovL2Rldi53My5vcmcvaHRtbDUvd2VidnR0LyN2dHRjdWUtaW50ZXJmYWNlXG4gICAgICAgICAqL1xuXG4gICAgICAgIHZhciBfaWQgPSBcIlwiO1xuICAgICAgICB2YXIgX3BhdXNlT25FeGl0ID0gZmFsc2U7XG4gICAgICAgIHZhciBfc3RhcnRUaW1lID0gc3RhcnRUaW1lO1xuICAgICAgICB2YXIgX2VuZFRpbWUgPSBlbmRUaW1lO1xuICAgICAgICB2YXIgX3RleHQgPSB0ZXh0O1xuICAgICAgICB2YXIgX3JlZ2lvbiA9IG51bGw7XG4gICAgICAgIHZhciBfdmVydGljYWwgPSBcIlwiO1xuICAgICAgICB2YXIgX3NuYXBUb0xpbmVzID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9saW5lID0gXCJhdXRvXCI7XG4gICAgICAgIHZhciBfbGluZUFsaWduID0gXCJzdGFydFwiO1xuICAgICAgICB2YXIgX3Bvc2l0aW9uID0gNTA7XG4gICAgICAgIHZhciBfcG9zaXRpb25BbGlnbiA9IFwibWlkZGxlXCI7XG4gICAgICAgIHZhciBfc2l6ZSA9IDUwO1xuICAgICAgICB2YXIgX2FsaWduID0gXCJtaWRkbGVcIjtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxuICAgICAgICAgICAgXCJpZFwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2lkO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBfaWQgPSBcIlwiICsgdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXG4gICAgICAgICAgICBcInBhdXNlT25FeGl0XCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcGF1c2VPbkV4aXQ7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIF9wYXVzZU9uRXhpdCA9ICEhdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXG4gICAgICAgICAgICBcInN0YXJ0VGltZVwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3N0YXJ0VGltZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN0YXJ0IHRpbWUgbXVzdCBiZSBzZXQgdG8gYSBudW1iZXIuXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF9zdGFydFRpbWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxuICAgICAgICAgICAgXCJlbmRUaW1lXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfZW5kVGltZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkVuZCB0aW1lIG11c3QgYmUgc2V0IHRvIGEgbnVtYmVyLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfZW5kVGltZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXG4gICAgICAgICAgICBcInRleHRcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF90ZXh0O1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBfdGV4dCA9IFwiXCIgKyB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxuICAgICAgICAgICAgXCJyZWdpb25cIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZWdpb247XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIF9yZWdpb24gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxuICAgICAgICAgICAgXCJ2ZXJ0aWNhbFwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZlcnRpY2FsO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2V0dGluZyA9IGZpbmREaXJlY3Rpb25TZXR0aW5nKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gSGF2ZSB0byBjaGVjayBmb3IgZmFsc2UgYmVjYXVzZSB0aGUgc2V0dGluZyBhbiBiZSBhbiBlbXB0eSBzdHJpbmcuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXR0aW5nID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKFwiQW4gaW52YWxpZCBvciBpbGxlZ2FsIHN0cmluZyB3YXMgc3BlY2lmaWVkLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfdmVydGljYWwgPSBzZXR0aW5nO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXG4gICAgICAgICAgICBcInNuYXBUb0xpbmVzXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfc25hcFRvTGluZXM7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIF9zbmFwVG9MaW5lcyA9ICEhdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcbiAgICAgICAgICAgIFwibGluZVwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2xpbmU7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwibnVtYmVyXCIgJiYgdmFsdWUgIT09IGF1dG9LZXl3b3JkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJBbiBpbnZhbGlkIG51bWJlciBvciBpbGxlZ2FsIHN0cmluZyB3YXMgc3BlY2lmaWVkLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfbGluZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXG4gICAgICAgICAgICBcImxpbmVBbGlnblwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2xpbmVBbGlnbjtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNldHRpbmcgPSBmaW5kQWxpZ25TZXR0aW5nKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzZXR0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJBbiBpbnZhbGlkIG9yIGlsbGVnYWwgc3RyaW5nIHdhcyBzcGVjaWZpZWQuXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF9saW5lQWxpZ24gPSBzZXR0aW5nO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXG4gICAgICAgICAgICBcInBvc2l0aW9uXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcG9zaXRpb247XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA8IDAgfHwgdmFsdWUgPiAxMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBvc2l0aW9uIG11c3QgYmUgYmV0d2VlbiAwIGFuZCAxMDAuXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF9wb3NpdGlvbiA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXG4gICAgICAgICAgICBcInBvc2l0aW9uQWxpZ25cIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9wb3NpdGlvbkFsaWduO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2V0dGluZyA9IGZpbmRBbGlnblNldHRpbmcodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXNldHRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihcIkFuIGludmFsaWQgb3IgaWxsZWdhbCBzdHJpbmcgd2FzIHNwZWNpZmllZC5cIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgX3Bvc2l0aW9uQWxpZ24gPSBzZXR0aW5nO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXG4gICAgICAgICAgICBcInNpemVcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9zaXplO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPCAwIHx8IHZhbHVlID4gMTAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTaXplIG11c3QgYmUgYmV0d2VlbiAwIGFuZCAxMDAuXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF9zaXplID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcbiAgICAgICAgICAgIFwiYWxpZ25cIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9hbGlnbjtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNldHRpbmcgPSBmaW5kQWxpZ25TZXR0aW5nKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzZXR0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJBbiBpbnZhbGlkIG9yIGlsbGVnYWwgc3RyaW5nIHdhcyBzcGVjaWZpZWQuXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF9hbGlnbiA9IHNldHRpbmc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE90aGVyIDx0cmFjaz4gc3BlYyBkZWZpbmVkIHByb3BlcnRpZXNcbiAgICAgICAgICovXG5cbiAgICAgICAgICAgIC8vIGh0dHA6Ly93d3cud2hhdHdnLm9yZy9zcGVjcy93ZWItYXBwcy9jdXJyZW50LXdvcmsvbXVsdGlwYWdlL3RoZS12aWRlby1lbGVtZW50Lmh0bWwjdGV4dC10cmFjay1jdWUtZGlzcGxheS1zdGF0ZVxuICAgICAgICBjdWUuZGlzcGxheVN0YXRlID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIGlmIChpc0lFOCkge1xuICAgICAgICAgICAgcmV0dXJuIGN1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFZUVEN1ZSBtZXRob2RzXG4gICAgICovXG5cbiAgICBWVFRDdWUucHJvdG90eXBlLmdldEN1ZUFzSFRNTCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBBc3N1bWUgV2ViVlRULmNvbnZlcnRDdWVUb0RPTVRyZWUgaXMgb24gdGhlIGdsb2JhbC5cbiAgICAgICAgcmV0dXJuIFdlYlZUVC5jb252ZXJ0Q3VlVG9ET01UcmVlKHdpbmRvdywgdGhpcy50ZXh0KTtcbiAgICB9O1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBWVFRDdWU7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMjMuLlxuICovXG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xuXG4vKipcbiAqIEBicmllZiAgIEl0IHdhcyByZXBsYWNlIGpxdWVyeSdzIHNlbGVjdG9yLiBJdCBPZnRlbiB1c2VkIGJ5IE92ZW5UZW1wbGF0ZS4gKC92aWV3L2VuZ2luZS9PdmVuVGVtcGxhdGUuanMpXG4gKiBAcGFyYW0gICBzZWxlY3Rvck9yRWxlbWVudCAgc3RyaW5nIG9yIGVsZW1lbnRcbiAqXG4gKiAqL1xuXG5cbmNvbnN0IExhJCA9IGZ1bmN0aW9uKHNlbGVjdG9yT3JFbGVtZW50KXtcbiAgICBjb25zdCB0aGF0ID0ge307XG4gICAgY29uc3QgcmV0dXJuTm9kZSA9IGZ1bmN0aW9uKCRlbGVtZW50ICwgc2VsZWN0b3Ipe1xuICAgICAgICBsZXQgbm9kZUxpc3QgPSAgJGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgICAgIGlmKG5vZGVMaXN0Lmxlbmd0aCA+IDEpe1xuICAgICAgICAgICAgcmV0dXJuIG5vZGVMaXN0O1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBub2RlTGlzdFswXTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIGxldCAkZWxlbWVudCA9IFwiXCI7XG5cbiAgICBpZiggXy5pc0VsZW1lbnQoc2VsZWN0b3JPckVsZW1lbnQpIHx8IF8uZXZlcnkoc2VsZWN0b3JPckVsZW1lbnQsIGZ1bmN0aW9uKGl0ZW0pe3JldHVybiBfLmlzRWxlbWVudChpdGVtKX0pKXtcbiAgICAgICAgJGVsZW1lbnQgPSBzZWxlY3Rvck9yRWxlbWVudDtcbiAgICB9ZWxzZSBpZihzZWxlY3Rvck9yRWxlbWVudCA9PT0gXCJkb2N1bWVudFwiKXtcbiAgICAgICAgJGVsZW1lbnQgPSBkb2N1bWVudDtcbiAgICB9ZWxzZSBpZihzZWxlY3Rvck9yRWxlbWVudCA9PT0gXCJ3aW5kb3dcIil7XG4gICAgICAgICRlbGVtZW50ID0gd2luZG93O1xuICAgIH1lbHNle1xuICAgICAgICAkZWxlbWVudCA9IHJldHVybk5vZGUoZG9jdW1lbnQsIHNlbGVjdG9yT3JFbGVtZW50KTtcbiAgICB9XG5cblxuICAgIGlmKCEkZWxlbWVudCl7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8qRUZGRUNUUyovXG5cbiAgICB0aGF0LnNob3cgPSAoKSA9PntcbiAgICAgICAgJGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfTtcblxuICAgIHRoYXQuaGlkZSA9ICgpID0+e1xuICAgICAgICAkZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH07XG5cbiAgICAvKkVMRU1FTlRTKi9cblxuICAgIHRoYXQuYWRkQ2xhc3MgPSAobmFtZSkgPT57XG4gICAgICAgIGlmKCRlbGVtZW50LmNsYXNzTGlzdCl7XG4gICAgICAgICAgICAkZWxlbWVudC5jbGFzc0xpc3QuYWRkKG5hbWUpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGxldCBjbGFzc05hbWVzID0gJGVsZW1lbnQuY2xhc3NOYW1lLnNwbGl0KFwiIFwiKTtcbiAgICAgICAgICAgIGlmKGNsYXNzTmFtZXMuaW5kZXhPZihuYW1lKSA9PT0gLTEpe1xuICAgICAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTmFtZSArPSBcIiBcIiArIG5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhhdC5hZnRlciA9IChodG1sU3RyaW5nKSA9PiB7XG4gICAgICAgICRlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJlbmQnLCBodG1sU3RyaW5nKTtcbiAgICB9O1xuXG4gICAgdGhhdC5hcHBlbmQgPSAoaHRtbFN0cmluZykgPT4ge1xuICAgICAgICAkZWxlbWVudC5hcHBlbmRDaGlsZChodG1sU3RyaW5nKTtcbiAgICB9O1xuXG4gICAgdGhhdC5iZWZvcmUgPSAoaHRtbFN0cmluZykgPT4ge1xuICAgICAgICAkZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWJlZ2luJywgaHRtbFN0cmluZyk7XG4gICAgfTtcblxuICAgIHRoYXQuY2hpbGRyZW4gPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiAkZWxlbWVudC5jaGlsZHJlbiB8fCBbXTtcbiAgICB9O1xuXG4gICAgLy9UaGUgY29udGFpbnMoKSBtZXRob2QgcmV0dXJucyBhIEJvb2xlYW4gdmFsdWUgaW5kaWNhdGluZyB3aGV0aGVyIGEgbm9kZSBpcyBhIGRlc2NlbmRhbnQgb2YgYSBzcGVjaWZpZWQgbm9kZS5cbiAgICAvL0EgZGVzY2VuZGFudCBjYW4gYmUgYSBjaGlsZCwgZ3JhbmRjaGlsZCwgZ3JlYXQtZ3JhbmRjaGlsZCwgYW5kIHNvIG9uLlxuICAgIHRoYXQuY29udGFpbnMgPSAoZWxDaGlsZCkgPT4ge1xuICAgICAgICByZXR1cm4gJGVsZW1lbnQgIT09IGVsQ2hpbGQgJiYgJGVsZW1lbnQuY29udGFpbnMoZWxDaGlsZCk7XG4gICAgfTtcblxuICAgIHRoYXQuZW1wdHkgPSAoKSA9PiB7XG4gICAgICAgICRlbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XG4gICAgfTtcblxuXG4gICAgdGhhdC5maW5kID0gKHNlbGVjdG9yKSA9PntcbiAgICAgICAgcmV0dXJuIExhJChyZXR1cm5Ob2RlKCRlbGVtZW50LCBzZWxlY3RvcikpO1xuICAgIH07XG5cbiAgICB0aGF0LmNzcyA9IChuYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgICBpZih2YWx1ZSl7XG4gICAgICAgICAgICBpZigkZWxlbWVudC5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpe1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlW25hbWVdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICRlbGVtZW50LnN0eWxlW25hbWVdID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuICRlbGVtZW50LnN0eWxlW25hbWVdO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG5cblxuICAgIHRoYXQucmVtb3ZlQ2xhc3MgPSAobmFtZSkgPT57XG4gICAgICAgIGlmICgkZWxlbWVudC5jbGFzc0xpc3Qpe1xuICAgICAgICAgICAgJGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShuYW1lKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAkZWxlbWVudC5jbGFzc05hbWUgPSAkZWxlbWVudC5jbGFzc05hbWUucmVwbGFjZShuZXcgUmVnRXhwKCcoXnxcXFxcYiknICsgbmFtZS5zcGxpdCgnICcpLmpvaW4oJ3wnKSArICcoXFxcXGJ8JCknLCAnZ2knKSwgJyAnKTtcblxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoYXQucmVtb3ZlQXR0cmlidXRlID0gKGF0dHJOYW1lKSA9PiB7XG4gICAgICAgICRlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShhdHRyTmFtZSk7XG4gICAgfTtcblxuXG5cbiAgICAvKnRoYXQuYXBwZW5kID0gKGh0bWxDb2RlKSA9PntcbiAgICAgICAgJGVsZW1lbnQuaW5uZXJIVE1MICs9IGh0bWxDb2RlO1xuICAgIH07Ki9cblxuICAgIHRoYXQudGV4dCA9ICh0ZXh0KSA9PiB7IC8vSUU4K1xuICAgICAgICBpZih0ZXh0ID09PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgcmV0dXJuICRlbGVtZW50LnRleHRDb250ZW50O1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICRlbGVtZW50LnRleHRDb250ZW50ID0gdGV4dDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhhdC5odG1sID0gKGh0bWxTdHJpbmcpID0+IHtcbiAgICAgICAgJGVsZW1lbnQuaW5uZXJIVE1MID0gaHRtbFN0cmluZztcbiAgICB9O1xuICAgIHRoYXQuaGFzQ2xhc3MgPSAobmFtZSkgPT4geyAvL0lFOCtcbiAgICAgICAgaWYoJGVsZW1lbnQuY2xhc3NMaXN0KXtcbiAgICAgICAgICAgIHJldHVybiAkZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMobmFtZSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoJyhefCApJyArIG5hbWUgKyAnKCB8JCknLCAnZ2knKS50ZXN0KCRlbGVtZW50Lm5hbWUpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoYXQuaXMgPSAoJHRhcmdldEVsZW1lbnQpID0+IHtcbiAgICAgICAgLyp2YXIgbWF0Y2hlcyA9IGZ1bmN0aW9uKGVsLCBzZWxlY3Rvcikge1xuICAgICAgICAgICAgcmV0dXJuIChlbC5tYXRjaGVzIHx8IGVsLm1hdGNoZXNTZWxlY3RvciB8fCBlbC5tc01hdGNoZXNTZWxlY3RvciB8fCBlbC5tb3pNYXRjaGVzU2VsZWN0b3IgfHwgZWwud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8IGVsLm9NYXRjaGVzU2VsZWN0b3IpLmNhbGwoZWwsIHNlbGVjdG9yKTtcbiAgICAgICAgfTtcblxuICAgICAgICBtYXRjaGVzKGVsLCAnLm15LWNsYXNzJyk7Ki9cbiAgICAgICAgcmV0dXJuICRlbGVtZW50ID09PSAkdGFyZ2V0RWxlbWVudDtcbiAgICB9O1xuXG4gICAgdGhhdC5vZmZzZXQgPSAoKSA9PnsgICAgLy9JRTgrXG4gICAgICAgIHZhciByZWN0ID0gJGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvcDogcmVjdC50b3AgKyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCxcbiAgICAgICAgICAgIGxlZnQ6IHJlY3QubGVmdCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdFxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoYXQud2lkdGggPSAoKSA9PiB7ICAgIC8vSUU4K1xuICAgICAgICByZXR1cm4gJGVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgfTtcblxuICAgIHRoYXQuaGVpZ2h0ID0gKCkgPT4geyAgIC8vSUU4K1xuICAgICAgICByZXR1cm4gJGVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgIH07XG5cbiAgICB0aGF0LmF0dHIgPSAoYXR0cikgPT4ge1xuICAgICAgICByZXR1cm4gJGVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHIpO1xuICAgIH07XG5cbiAgICB0aGF0LnJlcGxhY2UgPSAoaHRtbCkgPT4ge1xuICAgICAgICAkZWxlbWVudC5yZXBsYWNlV2l0aChodG1sKTtcbiAgICB9O1xuXG5cbiAgICB0aGF0LnJlbW92ZSA9ICgpID0+IHtcbiAgICAgICAgaWYoJGVsZW1lbnQubGVuZ3RoID4gMSl7XG4gICAgICAgICAgICAkZWxlbWVudC5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKCRlbGVtZW50KTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAkZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIHRoYXQucmVtb3ZlQ2hpbGQgPSAoZWxlbWVudCkgPT4ge1xuICAgICAgICBpZihlbGVtZW50KXtcbiAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHdoaWxlICgkZWxlbWVudC5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5yZW1vdmVDaGlsZCgkZWxlbWVudC5maXJzdENoaWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIHRoYXQuZ2V0ID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gJGVsZW1lbnQ7XG4gICAgfTtcblxuICAgIHRoYXQuY2xvc2VzdCA9IChzZWxlY3RvclN0cmluZykgPT4ge1xuICAgICAgICBsZXQgY2xvc2VzdEVsZW1lbnQgPSAkZWxlbWVudC5jbG9zZXN0KHNlbGVjdG9yU3RyaW5nKTtcbiAgICAgICAgaWYoY2xvc2VzdEVsZW1lbnQpe1xuICAgICAgICAgICAgcmV0dXJuIExhJChjbG9zZXN0RWxlbWVudCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBMYSQ7XG4iLCJpbXBvcnQgXyBmcm9tICcuL3VuZGVyc2NvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gdHJpbShzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nID8gc3RyaW5nLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKSA6IFwiXCI7XG59XG5cbi8qKlxuICogZXh0cmFjdEV4dGVuc2lvblxuICpcbiAqIEBwYXJhbSAgICAgIHtzdHJpbmd9IHBhdGggZm9yIHVybFxuICogQHJldHVybiAgICAge3N0cmluZ30gIEV4dGVuc2lvblxuICovXG5leHBvcnQgY29uc3QgZXh0cmFjdEV4dGVuc2lvbiA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgICBpZighcGF0aCB8fCBwYXRoLnN1YnN0cigwLDQpPT0ncnRtcCcpIHtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldEF6dXJlRmlsZUZvcm1hdChwYXRoKSB7XG4gICAgICAgIGxldCBleHRlbnNpb24gPSBcIlwiO1xuICAgICAgICBpZiAoKC9bKCxdZm9ybWF0PW1wZC0vaSkudGVzdChwYXRoKSkge1xuICAgICAgICAgICAgZXh0ZW5zaW9uID0gJ21wZCc7XG4gICAgICAgIH1lbHNlIGlmICgoL1soLF1mb3JtYXQ9bTN1OC0vaSkudGVzdChwYXRoKSkge1xuICAgICAgICAgICAgZXh0ZW5zaW9uID0gJ20zdTgnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBleHRlbnNpb247XG4gICAgfVxuXG4gICAgbGV0IGF6dXJlZEZvcm1hdCA9IGdldEF6dXJlRmlsZUZvcm1hdChwYXRoKTtcbiAgICBpZihhenVyZWRGb3JtYXQpIHtcbiAgICAgICAgcmV0dXJuIGF6dXJlZEZvcm1hdDtcbiAgICB9XG4gICAgcGF0aCA9IHBhdGguc3BsaXQoJz8nKVswXS5zcGxpdCgnIycpWzBdO1xuICAgIGlmKHBhdGgubGFzdEluZGV4T2YoJy4nKSA+IC0xKSB7XG4gICAgICAgIHJldHVybiBwYXRoLnN1YnN0cihwYXRoLmxhc3RJbmRleE9mKCcuJykgKyAxLCBwYXRoLmxlbmd0aCkudG9Mb3dlckNhc2UoKTtcbiAgICB9ZWxzZXtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxufTtcblxuXG4vKipcbiAqIG5hdHVyYWxIbXNcbiAqXG4gKiBAcGFyYW0gICAgICB7bnVtYmVyIHwgc3RyaW5nfSAgc2Vjb25kICBUaGUgc2Vjb25kXG4gKiBAcmV0dXJuICAgICB7c3RyaW5nfSAgZm9ybWF0dGVkIFN0cmluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gbmF0dXJhbEhtcyhzZWNvbmQpIHtcbiAgICBsZXQgc2VjTnVtID0gcGFyc2VJbnQoc2Vjb25kLCAxMCk7XG4gICAgaWYoIXNlY29uZCl7XG4gICAgICAgIHJldHVybiBcIjAwOjAwXCI7XG4gICAgfVxuICAgIGxldCBob3VycyAgID0gTWF0aC5mbG9vcihzZWNOdW0gLyAzNjAwKTtcbiAgICBsZXQgbWludXRlcyA9IE1hdGguZmxvb3IoKHNlY051bSAtIChob3VycyAqIDM2MDApKSAvIDYwKTtcbiAgICBsZXQgc2Vjb25kcyA9IHNlY051bSAtIChob3VycyAqIDM2MDApIC0gKG1pbnV0ZXMgKiA2MCk7XG5cbiAgICAvL2lmIChob3VycyA+IDApIHttaW51dGVzID0gXCIwXCIrbWludXRlczt9XG4gICAgaWYgKG1pbnV0ZXMgPCAxMCkge21pbnV0ZXMgPSBcIjBcIittaW51dGVzO31cbiAgICBpZiAoc2Vjb25kcyA8IDEwKSB7c2Vjb25kcyA9IFwiMFwiK3NlY29uZHM7fVxuXG4gICAgaWYgKGhvdXJzID4gMCkge1xuICAgICAgICByZXR1cm4gaG91cnMrJzonK21pbnV0ZXMrJzonK3NlY29uZHM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG1pbnV0ZXMrJzonK3NlY29uZHM7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBobXNUb1NlY29uZChzdHIsIGZyYW1lUmF0ZSkge1xuICAgIGlmKCFzdHIpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGlmKF8uaXNOdW1iZXIoc3RyKSAmJiAhXy5pc05hTihzdHIpKXtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoJywnLCAnLicpO1xuICAgIGxldCBhcnIgPSBzdHIuc3BsaXQoJzonKTtcbiAgICBsZXQgYXJyTGVuZ3RoID0gYXJyLmxlbmd0aDtcbiAgICBsZXQgc2VjID0gMDtcbiAgICBpZiAoc3RyLnNsaWNlKC0xKSA9PT0gJ3MnKXtcbiAgICAgICAgc2VjID0gcGFyc2VGbG9hdChzdHIpO1xuICAgIH1lbHNlIGlmIChzdHIuc2xpY2UoLTEpID09PSAnbScpe1xuICAgICAgICBzZWMgPSBwYXJzZUZsb2F0KHN0cikgKiA2MDtcbiAgICB9ZWxzZSBpZiAoc3RyLnNsaWNlKC0xKSA9PT0gJ2gnKXtcbiAgICAgICAgc2VjID0gcGFyc2VGbG9hdChzdHIpICogMzYwMDtcbiAgICB9ZWxzZSBpZiAoYXJyTGVuZ3RoID4gMSkge1xuICAgICAgICB2YXIgc2VjSW5kZXggPSBhcnJMZW5ndGggLSAxO1xuICAgICAgICBpZiAoYXJyTGVuZ3RoID09PSA0KSB7XG4gICAgICAgICAgICBpZiAoZnJhbWVSYXRlKSB7XG4gICAgICAgICAgICAgICAgc2VjID0gcGFyc2VGbG9hdChhcnJbc2VjSW5kZXhdKSAvIGZyYW1lUmF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlY0luZGV4IC09IDE7XG4gICAgICAgIH1cbiAgICAgICAgc2VjICs9IHBhcnNlRmxvYXQoYXJyW3NlY0luZGV4XSk7XG4gICAgICAgIHNlYyArPSBwYXJzZUZsb2F0KGFycltzZWNJbmRleCAtIDFdKSAqIDYwO1xuICAgICAgICBpZiAoYXJyTGVuZ3RoID49IDMpIHtcbiAgICAgICAgICAgIHNlYyArPSBwYXJzZUZsb2F0KGFycltzZWNJbmRleCAtIDJdKSAqIDM2MDA7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBzZWMgPSBwYXJzZUZsb2F0KHN0cik7XG4gICAgfVxuICAgIGlmIChfLmlzTmFOKHNlYykpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHJldHVybiBzZWM7XG59IiwiLy8gICAgIFVuZGVyc2NvcmUuanMgMS45LjFcbi8vICAgICBodHRwOi8vdW5kZXJzY29yZWpzLm9yZ1xuLy8gICAgIChjKSAyMDA5LTIwMTggSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbi8vICAgICBVbmRlcnNjb3JlIG1heSBiZSBmcmVlbHkgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuIWZ1bmN0aW9uKCl7dmFyIG49XCJvYmplY3RcIj09dHlwZW9mIHNlbGYmJnNlbGYuc2VsZj09PXNlbGYmJnNlbGZ8fFwib2JqZWN0XCI9PXR5cGVvZiBnbG9iYWwmJmdsb2JhbC5nbG9iYWw9PT1nbG9iYWwmJmdsb2JhbHx8dGhpc3x8e30scj1uLl8sZT1BcnJheS5wcm90b3R5cGUsbz1PYmplY3QucHJvdG90eXBlLHM9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFN5bWJvbD9TeW1ib2wucHJvdG90eXBlOm51bGwsdT1lLnB1c2gsYz1lLnNsaWNlLHA9by50b1N0cmluZyxpPW8uaGFzT3duUHJvcGVydHksdD1BcnJheS5pc0FycmF5LGE9T2JqZWN0LmtleXMsbD1PYmplY3QuY3JlYXRlLGY9ZnVuY3Rpb24oKXt9LGg9ZnVuY3Rpb24obil7cmV0dXJuIG4gaW5zdGFuY2VvZiBoP246dGhpcyBpbnN0YW5jZW9mIGg/dm9pZCh0aGlzLl93cmFwcGVkPW4pOm5ldyBoKG4pfTtcInVuZGVmaW5lZFwiPT10eXBlb2YgZXhwb3J0c3x8ZXhwb3J0cy5ub2RlVHlwZT9uLl89aDooXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZSYmIW1vZHVsZS5ub2RlVHlwZSYmbW9kdWxlLmV4cG9ydHMmJihleHBvcnRzPW1vZHVsZS5leHBvcnRzPWgpLGV4cG9ydHMuXz1oKSxoLlZFUlNJT049XCIxLjkuMVwiO3ZhciB2LHk9ZnVuY3Rpb24odSxpLG4pe2lmKHZvaWQgMD09PWkpcmV0dXJuIHU7c3dpdGNoKG51bGw9PW4/MzpuKXtjYXNlIDE6cmV0dXJuIGZ1bmN0aW9uKG4pe3JldHVybiB1LmNhbGwoaSxuKX07Y2FzZSAzOnJldHVybiBmdW5jdGlvbihuLHIsdCl7cmV0dXJuIHUuY2FsbChpLG4scix0KX07Y2FzZSA0OnJldHVybiBmdW5jdGlvbihuLHIsdCxlKXtyZXR1cm4gdS5jYWxsKGksbixyLHQsZSl9fXJldHVybiBmdW5jdGlvbigpe3JldHVybiB1LmFwcGx5KGksYXJndW1lbnRzKX19LGQ9ZnVuY3Rpb24obixyLHQpe3JldHVybiBoLml0ZXJhdGVlIT09dj9oLml0ZXJhdGVlKG4scik6bnVsbD09bj9oLmlkZW50aXR5OmguaXNGdW5jdGlvbihuKT95KG4scix0KTpoLmlzT2JqZWN0KG4pJiYhaC5pc0FycmF5KG4pP2gubWF0Y2hlcihuKTpoLnByb3BlcnR5KG4pfTtoLml0ZXJhdGVlPXY9ZnVuY3Rpb24obixyKXtyZXR1cm4gZChuLHIsMS8wKX07dmFyIGc9ZnVuY3Rpb24odSxpKXtyZXR1cm4gaT1udWxsPT1pP3UubGVuZ3RoLTE6K2ksZnVuY3Rpb24oKXtmb3IodmFyIG49TWF0aC5tYXgoYXJndW1lbnRzLmxlbmd0aC1pLDApLHI9QXJyYXkobiksdD0wO3Q8bjt0Kyspclt0XT1hcmd1bWVudHNbdCtpXTtzd2l0Y2goaSl7Y2FzZSAwOnJldHVybiB1LmNhbGwodGhpcyxyKTtjYXNlIDE6cmV0dXJuIHUuY2FsbCh0aGlzLGFyZ3VtZW50c1swXSxyKTtjYXNlIDI6cmV0dXJuIHUuY2FsbCh0aGlzLGFyZ3VtZW50c1swXSxhcmd1bWVudHNbMV0scil9dmFyIGU9QXJyYXkoaSsxKTtmb3IodD0wO3Q8aTt0KyspZVt0XT1hcmd1bWVudHNbdF07cmV0dXJuIGVbaV09cix1LmFwcGx5KHRoaXMsZSl9fSxtPWZ1bmN0aW9uKG4pe2lmKCFoLmlzT2JqZWN0KG4pKXJldHVybnt9O2lmKGwpcmV0dXJuIGwobik7Zi5wcm90b3R5cGU9bjt2YXIgcj1uZXcgZjtyZXR1cm4gZi5wcm90b3R5cGU9bnVsbCxyfSxiPWZ1bmN0aW9uKHIpe3JldHVybiBmdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09bj92b2lkIDA6bltyXX19LGo9ZnVuY3Rpb24obixyKXtyZXR1cm4gbnVsbCE9biYmaS5jYWxsKG4scil9LHg9ZnVuY3Rpb24obixyKXtmb3IodmFyIHQ9ci5sZW5ndGgsZT0wO2U8dDtlKyspe2lmKG51bGw9PW4pcmV0dXJuO249bltyW2VdXX1yZXR1cm4gdD9uOnZvaWQgMH0sXz1NYXRoLnBvdygyLDUzKS0xLEE9YihcImxlbmd0aFwiKSx3PWZ1bmN0aW9uKG4pe3ZhciByPUEobik7cmV0dXJuXCJudW1iZXJcIj09dHlwZW9mIHImJjA8PXImJnI8PV99O2guZWFjaD1oLmZvckVhY2g9ZnVuY3Rpb24obixyLHQpe3ZhciBlLHU7aWYocj15KHIsdCksdyhuKSlmb3IoZT0wLHU9bi5sZW5ndGg7ZTx1O2UrKylyKG5bZV0sZSxuKTtlbHNle3ZhciBpPWgua2V5cyhuKTtmb3IoZT0wLHU9aS5sZW5ndGg7ZTx1O2UrKylyKG5baVtlXV0saVtlXSxuKX1yZXR1cm4gbn0saC5tYXA9aC5jb2xsZWN0PWZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGU9IXcobikmJmgua2V5cyhuKSx1PShlfHxuKS5sZW5ndGgsaT1BcnJheSh1KSxvPTA7bzx1O28rKyl7dmFyIGE9ZT9lW29dOm87aVtvXT1yKG5bYV0sYSxuKX1yZXR1cm4gaX07dmFyIE89ZnVuY3Rpb24oYyl7cmV0dXJuIGZ1bmN0aW9uKG4scix0LGUpe3ZhciB1PTM8PWFyZ3VtZW50cy5sZW5ndGg7cmV0dXJuIGZ1bmN0aW9uKG4scix0LGUpe3ZhciB1PSF3KG4pJiZoLmtleXMobiksaT0odXx8bikubGVuZ3RoLG89MDxjPzA6aS0xO2ZvcihlfHwodD1uW3U/dVtvXTpvXSxvKz1jKTswPD1vJiZvPGk7bys9Yyl7dmFyIGE9dT91W29dOm87dD1yKHQsblthXSxhLG4pfXJldHVybiB0fShuLHkocixlLDQpLHQsdSl9fTtoLnJlZHVjZT1oLmZvbGRsPWguaW5qZWN0PU8oMSksaC5yZWR1Y2VSaWdodD1oLmZvbGRyPU8oLTEpLGguZmluZD1oLmRldGVjdD1mdW5jdGlvbihuLHIsdCl7dmFyIGU9KHcobik/aC5maW5kSW5kZXg6aC5maW5kS2V5KShuLHIsdCk7aWYodm9pZCAwIT09ZSYmLTEhPT1lKXJldHVybiBuW2VdfSxoLmZpbHRlcj1oLnNlbGVjdD1mdW5jdGlvbihuLGUscil7dmFyIHU9W107cmV0dXJuIGU9ZChlLHIpLGguZWFjaChuLGZ1bmN0aW9uKG4scix0KXtlKG4scix0KSYmdS5wdXNoKG4pfSksdX0saC5yZWplY3Q9ZnVuY3Rpb24obixyLHQpe3JldHVybiBoLmZpbHRlcihuLGgubmVnYXRlKGQocikpLHQpfSxoLmV2ZXJ5PWguYWxsPWZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGU9IXcobikmJmgua2V5cyhuKSx1PShlfHxuKS5sZW5ndGgsaT0wO2k8dTtpKyspe3ZhciBvPWU/ZVtpXTppO2lmKCFyKG5bb10sbyxuKSlyZXR1cm4hMX1yZXR1cm4hMH0saC5zb21lPWguYW55PWZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGU9IXcobikmJmgua2V5cyhuKSx1PShlfHxuKS5sZW5ndGgsaT0wO2k8dTtpKyspe3ZhciBvPWU/ZVtpXTppO2lmKHIobltvXSxvLG4pKXJldHVybiEwfXJldHVybiExfSxoLmNvbnRhaW5zPWguaW5jbHVkZXM9aC5pbmNsdWRlPWZ1bmN0aW9uKG4scix0LGUpe3JldHVybiB3KG4pfHwobj1oLnZhbHVlcyhuKSksKFwibnVtYmVyXCIhPXR5cGVvZiB0fHxlKSYmKHQ9MCksMDw9aC5pbmRleE9mKG4scix0KX0saC5pbnZva2U9ZyhmdW5jdGlvbihuLHQsZSl7dmFyIHUsaTtyZXR1cm4gaC5pc0Z1bmN0aW9uKHQpP2k9dDpoLmlzQXJyYXkodCkmJih1PXQuc2xpY2UoMCwtMSksdD10W3QubGVuZ3RoLTFdKSxoLm1hcChuLGZ1bmN0aW9uKG4pe3ZhciByPWk7aWYoIXIpe2lmKHUmJnUubGVuZ3RoJiYobj14KG4sdSkpLG51bGw9PW4pcmV0dXJuO3I9blt0XX1yZXR1cm4gbnVsbD09cj9yOnIuYXBwbHkobixlKX0pfSksaC5wbHVjaz1mdW5jdGlvbihuLHIpe3JldHVybiBoLm1hcChuLGgucHJvcGVydHkocikpfSxoLndoZXJlPWZ1bmN0aW9uKG4scil7cmV0dXJuIGguZmlsdGVyKG4saC5tYXRjaGVyKHIpKX0saC5maW5kV2hlcmU9ZnVuY3Rpb24obixyKXtyZXR1cm4gaC5maW5kKG4saC5tYXRjaGVyKHIpKX0saC5tYXg9ZnVuY3Rpb24obixlLHIpe3ZhciB0LHUsaT0tMS8wLG89LTEvMDtpZihudWxsPT1lfHxcIm51bWJlclwiPT10eXBlb2YgZSYmXCJvYmplY3RcIiE9dHlwZW9mIG5bMF0mJm51bGwhPW4pZm9yKHZhciBhPTAsYz0obj13KG4pP246aC52YWx1ZXMobikpLmxlbmd0aDthPGM7YSsrKW51bGwhPSh0PW5bYV0pJiZpPHQmJihpPXQpO2Vsc2UgZT1kKGUsciksaC5lYWNoKG4sZnVuY3Rpb24obixyLHQpe3U9ZShuLHIsdCksKG88dXx8dT09PS0xLzAmJmk9PT0tMS8wKSYmKGk9bixvPXUpfSk7cmV0dXJuIGl9LGgubWluPWZ1bmN0aW9uKG4sZSxyKXt2YXIgdCx1LGk9MS8wLG89MS8wO2lmKG51bGw9PWV8fFwibnVtYmVyXCI9PXR5cGVvZiBlJiZcIm9iamVjdFwiIT10eXBlb2YgblswXSYmbnVsbCE9bilmb3IodmFyIGE9MCxjPShuPXcobik/bjpoLnZhbHVlcyhuKSkubGVuZ3RoO2E8YzthKyspbnVsbCE9KHQ9blthXSkmJnQ8aSYmKGk9dCk7ZWxzZSBlPWQoZSxyKSxoLmVhY2gobixmdW5jdGlvbihuLHIsdCl7KCh1PWUobixyLHQpKTxvfHx1PT09MS8wJiZpPT09MS8wKSYmKGk9bixvPXUpfSk7cmV0dXJuIGl9LGguc2h1ZmZsZT1mdW5jdGlvbihuKXtyZXR1cm4gaC5zYW1wbGUobiwxLzApfSxoLnNhbXBsZT1mdW5jdGlvbihuLHIsdCl7aWYobnVsbD09cnx8dClyZXR1cm4gdyhuKXx8KG49aC52YWx1ZXMobikpLG5baC5yYW5kb20obi5sZW5ndGgtMSldO3ZhciBlPXcobik/aC5jbG9uZShuKTpoLnZhbHVlcyhuKSx1PUEoZSk7cj1NYXRoLm1heChNYXRoLm1pbihyLHUpLDApO2Zvcih2YXIgaT11LTEsbz0wO288cjtvKyspe3ZhciBhPWgucmFuZG9tKG8saSksYz1lW29dO2Vbb109ZVthXSxlW2FdPWN9cmV0dXJuIGUuc2xpY2UoMCxyKX0saC5zb3J0Qnk9ZnVuY3Rpb24obixlLHIpe3ZhciB1PTA7cmV0dXJuIGU9ZChlLHIpLGgucGx1Y2soaC5tYXAobixmdW5jdGlvbihuLHIsdCl7cmV0dXJue3ZhbHVlOm4saW5kZXg6dSsrLGNyaXRlcmlhOmUobixyLHQpfX0pLnNvcnQoZnVuY3Rpb24obixyKXt2YXIgdD1uLmNyaXRlcmlhLGU9ci5jcml0ZXJpYTtpZih0IT09ZSl7aWYoZTx0fHx2b2lkIDA9PT10KXJldHVybiAxO2lmKHQ8ZXx8dm9pZCAwPT09ZSlyZXR1cm4tMX1yZXR1cm4gbi5pbmRleC1yLmluZGV4fSksXCJ2YWx1ZVwiKX07dmFyIGs9ZnVuY3Rpb24obyxyKXtyZXR1cm4gZnVuY3Rpb24oZSx1LG4pe3ZhciBpPXI/W1tdLFtdXTp7fTtyZXR1cm4gdT1kKHUsbiksaC5lYWNoKGUsZnVuY3Rpb24obixyKXt2YXIgdD11KG4scixlKTtvKGksbix0KX0pLGl9fTtoLmdyb3VwQnk9ayhmdW5jdGlvbihuLHIsdCl7aihuLHQpP25bdF0ucHVzaChyKTpuW3RdPVtyXX0pLGguaW5kZXhCeT1rKGZ1bmN0aW9uKG4scix0KXtuW3RdPXJ9KSxoLmNvdW50Qnk9ayhmdW5jdGlvbihuLHIsdCl7aihuLHQpP25bdF0rKzpuW3RdPTF9KTt2YXIgUz0vW15cXHVkODAwLVxcdWRmZmZdfFtcXHVkODAwLVxcdWRiZmZdW1xcdWRjMDAtXFx1ZGZmZl18W1xcdWQ4MDAtXFx1ZGZmZl0vZztoLnRvQXJyYXk9ZnVuY3Rpb24obil7cmV0dXJuIG4/aC5pc0FycmF5KG4pP2MuY2FsbChuKTpoLmlzU3RyaW5nKG4pP24ubWF0Y2goUyk6dyhuKT9oLm1hcChuLGguaWRlbnRpdHkpOmgudmFsdWVzKG4pOltdfSxoLnNpemU9ZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PW4/MDp3KG4pP24ubGVuZ3RoOmgua2V5cyhuKS5sZW5ndGh9LGgucGFydGl0aW9uPWsoZnVuY3Rpb24obixyLHQpe25bdD8wOjFdLnB1c2gocil9LCEwKSxoLmZpcnN0PWguaGVhZD1oLnRha2U9ZnVuY3Rpb24obixyLHQpe3JldHVybiBudWxsPT1ufHxuLmxlbmd0aDwxP251bGw9PXI/dm9pZCAwOltdOm51bGw9PXJ8fHQ/blswXTpoLmluaXRpYWwobixuLmxlbmd0aC1yKX0saC5pbml0aWFsPWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gYy5jYWxsKG4sMCxNYXRoLm1heCgwLG4ubGVuZ3RoLShudWxsPT1yfHx0PzE6cikpKX0saC5sYXN0PWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gbnVsbD09bnx8bi5sZW5ndGg8MT9udWxsPT1yP3ZvaWQgMDpbXTpudWxsPT1yfHx0P25bbi5sZW5ndGgtMV06aC5yZXN0KG4sTWF0aC5tYXgoMCxuLmxlbmd0aC1yKSl9LGgucmVzdD1oLnRhaWw9aC5kcm9wPWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gYy5jYWxsKG4sbnVsbD09cnx8dD8xOnIpfSxoLmNvbXBhY3Q9ZnVuY3Rpb24obil7cmV0dXJuIGguZmlsdGVyKG4sQm9vbGVhbil9O3ZhciBNPWZ1bmN0aW9uKG4scix0LGUpe2Zvcih2YXIgdT0oZT1lfHxbXSkubGVuZ3RoLGk9MCxvPUEobik7aTxvO2krKyl7dmFyIGE9bltpXTtpZih3KGEpJiYoaC5pc0FycmF5KGEpfHxoLmlzQXJndW1lbnRzKGEpKSlpZihyKWZvcih2YXIgYz0wLGw9YS5sZW5ndGg7YzxsOyllW3UrK109YVtjKytdO2Vsc2UgTShhLHIsdCxlKSx1PWUubGVuZ3RoO2Vsc2UgdHx8KGVbdSsrXT1hKX1yZXR1cm4gZX07aC5mbGF0dGVuPWZ1bmN0aW9uKG4scil7cmV0dXJuIE0obixyLCExKX0saC53aXRob3V0PWcoZnVuY3Rpb24obixyKXtyZXR1cm4gaC5kaWZmZXJlbmNlKG4scil9KSxoLnVuaXE9aC51bmlxdWU9ZnVuY3Rpb24obixyLHQsZSl7aC5pc0Jvb2xlYW4ocil8fChlPXQsdD1yLHI9ITEpLG51bGwhPXQmJih0PWQodCxlKSk7Zm9yKHZhciB1PVtdLGk9W10sbz0wLGE9QShuKTtvPGE7bysrKXt2YXIgYz1uW29dLGw9dD90KGMsbyxuKTpjO3ImJiF0PyhvJiZpPT09bHx8dS5wdXNoKGMpLGk9bCk6dD9oLmNvbnRhaW5zKGksbCl8fChpLnB1c2gobCksdS5wdXNoKGMpKTpoLmNvbnRhaW5zKHUsYyl8fHUucHVzaChjKX1yZXR1cm4gdX0saC51bmlvbj1nKGZ1bmN0aW9uKG4pe3JldHVybiBoLnVuaXEoTShuLCEwLCEwKSl9KSxoLmludGVyc2VjdGlvbj1mdW5jdGlvbihuKXtmb3IodmFyIHI9W10sdD1hcmd1bWVudHMubGVuZ3RoLGU9MCx1PUEobik7ZTx1O2UrKyl7dmFyIGk9bltlXTtpZighaC5jb250YWlucyhyLGkpKXt2YXIgbztmb3Iobz0xO288dCYmaC5jb250YWlucyhhcmd1bWVudHNbb10saSk7bysrKTtvPT09dCYmci5wdXNoKGkpfX1yZXR1cm4gcn0saC5kaWZmZXJlbmNlPWcoZnVuY3Rpb24obixyKXtyZXR1cm4gcj1NKHIsITAsITApLGguZmlsdGVyKG4sZnVuY3Rpb24obil7cmV0dXJuIWguY29udGFpbnMocixuKX0pfSksaC51bnppcD1mdW5jdGlvbihuKXtmb3IodmFyIHI9biYmaC5tYXgobixBKS5sZW5ndGh8fDAsdD1BcnJheShyKSxlPTA7ZTxyO2UrKyl0W2VdPWgucGx1Y2sobixlKTtyZXR1cm4gdH0saC56aXA9ZyhoLnVuemlwKSxoLm9iamVjdD1mdW5jdGlvbihuLHIpe2Zvcih2YXIgdD17fSxlPTAsdT1BKG4pO2U8dTtlKyspcj90W25bZV1dPXJbZV06dFtuW2VdWzBdXT1uW2VdWzFdO3JldHVybiB0fTt2YXIgRj1mdW5jdGlvbihpKXtyZXR1cm4gZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT1BKG4pLHU9MDxpPzA6ZS0xOzA8PXUmJnU8ZTt1Kz1pKWlmKHIoblt1XSx1LG4pKXJldHVybiB1O3JldHVybi0xfX07aC5maW5kSW5kZXg9RigxKSxoLmZpbmRMYXN0SW5kZXg9RigtMSksaC5zb3J0ZWRJbmRleD1mdW5jdGlvbihuLHIsdCxlKXtmb3IodmFyIHU9KHQ9ZCh0LGUsMSkpKHIpLGk9MCxvPUEobik7aTxvOyl7dmFyIGE9TWF0aC5mbG9vcigoaStvKS8yKTt0KG5bYV0pPHU/aT1hKzE6bz1hfXJldHVybiBpfTt2YXIgRT1mdW5jdGlvbihpLG8sYSl7cmV0dXJuIGZ1bmN0aW9uKG4scix0KXt2YXIgZT0wLHU9QShuKTtpZihcIm51bWJlclwiPT10eXBlb2YgdCkwPGk/ZT0wPD10P3Q6TWF0aC5tYXgodCt1LGUpOnU9MDw9dD9NYXRoLm1pbih0KzEsdSk6dCt1KzE7ZWxzZSBpZihhJiZ0JiZ1KXJldHVybiBuW3Q9YShuLHIpXT09PXI/dDotMTtpZihyIT1yKXJldHVybiAwPD0odD1vKGMuY2FsbChuLGUsdSksaC5pc05hTikpP3QrZTotMTtmb3IodD0wPGk/ZTp1LTE7MDw9dCYmdDx1O3QrPWkpaWYoblt0XT09PXIpcmV0dXJuIHQ7cmV0dXJuLTF9fTtoLmluZGV4T2Y9RSgxLGguZmluZEluZGV4LGguc29ydGVkSW5kZXgpLGgubGFzdEluZGV4T2Y9RSgtMSxoLmZpbmRMYXN0SW5kZXgpLGgucmFuZ2U9ZnVuY3Rpb24obixyLHQpe251bGw9PXImJihyPW58fDAsbj0wKSx0fHwodD1yPG4/LTE6MSk7Zm9yKHZhciBlPU1hdGgubWF4KE1hdGguY2VpbCgoci1uKS90KSwwKSx1PUFycmF5KGUpLGk9MDtpPGU7aSsrLG4rPXQpdVtpXT1uO3JldHVybiB1fSxoLmNodW5rPWZ1bmN0aW9uKG4scil7aWYobnVsbD09cnx8cjwxKXJldHVybltdO2Zvcih2YXIgdD1bXSxlPTAsdT1uLmxlbmd0aDtlPHU7KXQucHVzaChjLmNhbGwobixlLGUrPXIpKTtyZXR1cm4gdH07dmFyIE49ZnVuY3Rpb24obixyLHQsZSx1KXtpZighKGUgaW5zdGFuY2VvZiByKSlyZXR1cm4gbi5hcHBseSh0LHUpO3ZhciBpPW0obi5wcm90b3R5cGUpLG89bi5hcHBseShpLHUpO3JldHVybiBoLmlzT2JqZWN0KG8pP286aX07aC5iaW5kPWcoZnVuY3Rpb24ocix0LGUpe2lmKCFoLmlzRnVuY3Rpb24ocikpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkJpbmQgbXVzdCBiZSBjYWxsZWQgb24gYSBmdW5jdGlvblwiKTt2YXIgdT1nKGZ1bmN0aW9uKG4pe3JldHVybiBOKHIsdSx0LHRoaXMsZS5jb25jYXQobikpfSk7cmV0dXJuIHV9KSxoLnBhcnRpYWw9ZyhmdW5jdGlvbih1LGkpe3ZhciBvPWgucGFydGlhbC5wbGFjZWhvbGRlcixhPWZ1bmN0aW9uKCl7Zm9yKHZhciBuPTAscj1pLmxlbmd0aCx0PUFycmF5KHIpLGU9MDtlPHI7ZSsrKXRbZV09aVtlXT09PW8/YXJndW1lbnRzW24rK106aVtlXTtmb3IoO248YXJndW1lbnRzLmxlbmd0aDspdC5wdXNoKGFyZ3VtZW50c1tuKytdKTtyZXR1cm4gTih1LGEsdGhpcyx0aGlzLHQpfTtyZXR1cm4gYX0pLChoLnBhcnRpYWwucGxhY2Vob2xkZXI9aCkuYmluZEFsbD1nKGZ1bmN0aW9uKG4scil7dmFyIHQ9KHI9TShyLCExLCExKSkubGVuZ3RoO2lmKHQ8MSl0aHJvdyBuZXcgRXJyb3IoXCJiaW5kQWxsIG11c3QgYmUgcGFzc2VkIGZ1bmN0aW9uIG5hbWVzXCIpO2Zvcig7dC0tOyl7dmFyIGU9clt0XTtuW2VdPWguYmluZChuW2VdLG4pfX0pLGgubWVtb2l6ZT1mdW5jdGlvbihlLHUpe3ZhciBpPWZ1bmN0aW9uKG4pe3ZhciByPWkuY2FjaGUsdD1cIlwiKyh1P3UuYXBwbHkodGhpcyxhcmd1bWVudHMpOm4pO3JldHVybiBqKHIsdCl8fChyW3RdPWUuYXBwbHkodGhpcyxhcmd1bWVudHMpKSxyW3RdfTtyZXR1cm4gaS5jYWNoZT17fSxpfSxoLmRlbGF5PWcoZnVuY3Rpb24obixyLHQpe3JldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7cmV0dXJuIG4uYXBwbHkobnVsbCx0KX0scil9KSxoLmRlZmVyPWgucGFydGlhbChoLmRlbGF5LGgsMSksaC50aHJvdHRsZT1mdW5jdGlvbih0LGUsdSl7dmFyIGksbyxhLGMsbD0wO3V8fCh1PXt9KTt2YXIgZj1mdW5jdGlvbigpe2w9ITE9PT11LmxlYWRpbmc/MDpoLm5vdygpLGk9bnVsbCxjPXQuYXBwbHkobyxhKSxpfHwobz1hPW51bGwpfSxuPWZ1bmN0aW9uKCl7dmFyIG49aC5ub3coKTtsfHwhMSE9PXUubGVhZGluZ3x8KGw9bik7dmFyIHI9ZS0obi1sKTtyZXR1cm4gbz10aGlzLGE9YXJndW1lbnRzLHI8PTB8fGU8cj8oaSYmKGNsZWFyVGltZW91dChpKSxpPW51bGwpLGw9bixjPXQuYXBwbHkobyxhKSxpfHwobz1hPW51bGwpKTppfHwhMT09PXUudHJhaWxpbmd8fChpPXNldFRpbWVvdXQoZixyKSksY307cmV0dXJuIG4uY2FuY2VsPWZ1bmN0aW9uKCl7Y2xlYXJUaW1lb3V0KGkpLGw9MCxpPW89YT1udWxsfSxufSxoLmRlYm91bmNlPWZ1bmN0aW9uKHQsZSx1KXt2YXIgaSxvLGE9ZnVuY3Rpb24obixyKXtpPW51bGwsciYmKG89dC5hcHBseShuLHIpKX0sbj1nKGZ1bmN0aW9uKG4pe2lmKGkmJmNsZWFyVGltZW91dChpKSx1KXt2YXIgcj0haTtpPXNldFRpbWVvdXQoYSxlKSxyJiYobz10LmFwcGx5KHRoaXMsbikpfWVsc2UgaT1oLmRlbGF5KGEsZSx0aGlzLG4pO3JldHVybiBvfSk7cmV0dXJuIG4uY2FuY2VsPWZ1bmN0aW9uKCl7Y2xlYXJUaW1lb3V0KGkpLGk9bnVsbH0sbn0saC53cmFwPWZ1bmN0aW9uKG4scil7cmV0dXJuIGgucGFydGlhbChyLG4pfSxoLm5lZ2F0ZT1mdW5jdGlvbihuKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4hbi5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fSxoLmNvbXBvc2U9ZnVuY3Rpb24oKXt2YXIgdD1hcmd1bWVudHMsZT10Lmxlbmd0aC0xO3JldHVybiBmdW5jdGlvbigpe2Zvcih2YXIgbj1lLHI9dFtlXS5hcHBseSh0aGlzLGFyZ3VtZW50cyk7bi0tOylyPXRbbl0uY2FsbCh0aGlzLHIpO3JldHVybiByfX0saC5hZnRlcj1mdW5jdGlvbihuLHIpe3JldHVybiBmdW5jdGlvbigpe2lmKC0tbjwxKXJldHVybiByLmFwcGx5KHRoaXMsYXJndW1lbnRzKX19LGguYmVmb3JlPWZ1bmN0aW9uKG4scil7dmFyIHQ7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIDA8LS1uJiYodD1yLmFwcGx5KHRoaXMsYXJndW1lbnRzKSksbjw9MSYmKHI9bnVsbCksdH19LGgub25jZT1oLnBhcnRpYWwoaC5iZWZvcmUsMiksaC5yZXN0QXJndW1lbnRzPWc7dmFyIEk9IXt0b1N0cmluZzpudWxsfS5wcm9wZXJ0eUlzRW51bWVyYWJsZShcInRvU3RyaW5nXCIpLFQ9W1widmFsdWVPZlwiLFwiaXNQcm90b3R5cGVPZlwiLFwidG9TdHJpbmdcIixcInByb3BlcnR5SXNFbnVtZXJhYmxlXCIsXCJoYXNPd25Qcm9wZXJ0eVwiLFwidG9Mb2NhbGVTdHJpbmdcIl0sQj1mdW5jdGlvbihuLHIpe3ZhciB0PVQubGVuZ3RoLGU9bi5jb25zdHJ1Y3Rvcix1PWguaXNGdW5jdGlvbihlKSYmZS5wcm90b3R5cGV8fG8saT1cImNvbnN0cnVjdG9yXCI7Zm9yKGoobixpKSYmIWguY29udGFpbnMocixpKSYmci5wdXNoKGkpO3QtLTspKGk9VFt0XSlpbiBuJiZuW2ldIT09dVtpXSYmIWguY29udGFpbnMocixpKSYmci5wdXNoKGkpfTtoLmtleXM9ZnVuY3Rpb24obil7aWYoIWguaXNPYmplY3QobikpcmV0dXJuW107aWYoYSlyZXR1cm4gYShuKTt2YXIgcj1bXTtmb3IodmFyIHQgaW4gbilqKG4sdCkmJnIucHVzaCh0KTtyZXR1cm4gSSYmQihuLHIpLHJ9LGguYWxsS2V5cz1mdW5jdGlvbihuKXtpZighaC5pc09iamVjdChuKSlyZXR1cm5bXTt2YXIgcj1bXTtmb3IodmFyIHQgaW4gbilyLnB1c2godCk7cmV0dXJuIEkmJkIobixyKSxyfSxoLnZhbHVlcz1mdW5jdGlvbihuKXtmb3IodmFyIHI9aC5rZXlzKG4pLHQ9ci5sZW5ndGgsZT1BcnJheSh0KSx1PTA7dTx0O3UrKyllW3VdPW5bclt1XV07cmV0dXJuIGV9LGgubWFwT2JqZWN0PWZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGU9aC5rZXlzKG4pLHU9ZS5sZW5ndGgsaT17fSxvPTA7bzx1O28rKyl7dmFyIGE9ZVtvXTtpW2FdPXIoblthXSxhLG4pfXJldHVybiBpfSxoLnBhaXJzPWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj1oLmtleXMobiksdD1yLmxlbmd0aCxlPUFycmF5KHQpLHU9MDt1PHQ7dSsrKWVbdV09W3JbdV0sbltyW3VdXV07cmV0dXJuIGV9LGguaW52ZXJ0PWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj17fSx0PWgua2V5cyhuKSxlPTAsdT10Lmxlbmd0aDtlPHU7ZSsrKXJbblt0W2VdXV09dFtlXTtyZXR1cm4gcn0saC5mdW5jdGlvbnM9aC5tZXRob2RzPWZ1bmN0aW9uKG4pe3ZhciByPVtdO2Zvcih2YXIgdCBpbiBuKWguaXNGdW5jdGlvbihuW3RdKSYmci5wdXNoKHQpO3JldHVybiByLnNvcnQoKX07dmFyIFI9ZnVuY3Rpb24oYyxsKXtyZXR1cm4gZnVuY3Rpb24obil7dmFyIHI9YXJndW1lbnRzLmxlbmd0aDtpZihsJiYobj1PYmplY3QobikpLHI8Mnx8bnVsbD09bilyZXR1cm4gbjtmb3IodmFyIHQ9MTt0PHI7dCsrKWZvcih2YXIgZT1hcmd1bWVudHNbdF0sdT1jKGUpLGk9dS5sZW5ndGgsbz0wO288aTtvKyspe3ZhciBhPXVbb107bCYmdm9pZCAwIT09blthXXx8KG5bYV09ZVthXSl9cmV0dXJuIG59fTtoLmV4dGVuZD1SKGguYWxsS2V5cyksaC5leHRlbmRPd249aC5hc3NpZ249UihoLmtleXMpLGguZmluZEtleT1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlLHU9aC5rZXlzKG4pLGk9MCxvPXUubGVuZ3RoO2k8bztpKyspaWYocihuW2U9dVtpXV0sZSxuKSlyZXR1cm4gZX07dmFyIHEsSyx6PWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gciBpbiB0fTtoLnBpY2s9ZyhmdW5jdGlvbihuLHIpe3ZhciB0PXt9LGU9clswXTtpZihudWxsPT1uKXJldHVybiB0O2guaXNGdW5jdGlvbihlKT8oMTxyLmxlbmd0aCYmKGU9eShlLHJbMV0pKSxyPWguYWxsS2V5cyhuKSk6KGU9eixyPU0ociwhMSwhMSksbj1PYmplY3QobikpO2Zvcih2YXIgdT0wLGk9ci5sZW5ndGg7dTxpO3UrKyl7dmFyIG89clt1XSxhPW5bb107ZShhLG8sbikmJih0W29dPWEpfXJldHVybiB0fSksaC5vbWl0PWcoZnVuY3Rpb24obix0KXt2YXIgcixlPXRbMF07cmV0dXJuIGguaXNGdW5jdGlvbihlKT8oZT1oLm5lZ2F0ZShlKSwxPHQubGVuZ3RoJiYocj10WzFdKSk6KHQ9aC5tYXAoTSh0LCExLCExKSxTdHJpbmcpLGU9ZnVuY3Rpb24obixyKXtyZXR1cm4haC5jb250YWlucyh0LHIpfSksaC5waWNrKG4sZSxyKX0pLGguZGVmYXVsdHM9UihoLmFsbEtleXMsITApLGguY3JlYXRlPWZ1bmN0aW9uKG4scil7dmFyIHQ9bShuKTtyZXR1cm4gciYmaC5leHRlbmRPd24odCxyKSx0fSxoLmNsb25lPWZ1bmN0aW9uKG4pe3JldHVybiBoLmlzT2JqZWN0KG4pP2guaXNBcnJheShuKT9uLnNsaWNlKCk6aC5leHRlbmQoe30sbik6bn0saC50YXA9ZnVuY3Rpb24obixyKXtyZXR1cm4gcihuKSxufSxoLmlzTWF0Y2g9ZnVuY3Rpb24obixyKXt2YXIgdD1oLmtleXMociksZT10Lmxlbmd0aDtpZihudWxsPT1uKXJldHVybiFlO2Zvcih2YXIgdT1PYmplY3QobiksaT0wO2k8ZTtpKyspe3ZhciBvPXRbaV07aWYocltvXSE9PXVbb118fCEobyBpbiB1KSlyZXR1cm4hMX1yZXR1cm4hMH0scT1mdW5jdGlvbihuLHIsdCxlKXtpZihuPT09cilyZXR1cm4gMCE9PW58fDEvbj09MS9yO2lmKG51bGw9PW58fG51bGw9PXIpcmV0dXJuITE7aWYobiE9bilyZXR1cm4gciE9cjt2YXIgdT10eXBlb2YgbjtyZXR1cm4oXCJmdW5jdGlvblwiPT09dXx8XCJvYmplY3RcIj09PXV8fFwib2JqZWN0XCI9PXR5cGVvZiByKSYmSyhuLHIsdCxlKX0sSz1mdW5jdGlvbihuLHIsdCxlKXtuIGluc3RhbmNlb2YgaCYmKG49bi5fd3JhcHBlZCksciBpbnN0YW5jZW9mIGgmJihyPXIuX3dyYXBwZWQpO3ZhciB1PXAuY2FsbChuKTtpZih1IT09cC5jYWxsKHIpKXJldHVybiExO3N3aXRjaCh1KXtjYXNlXCJbb2JqZWN0IFJlZ0V4cF1cIjpjYXNlXCJbb2JqZWN0IFN0cmluZ11cIjpyZXR1cm5cIlwiK249PVwiXCIrcjtjYXNlXCJbb2JqZWN0IE51bWJlcl1cIjpyZXR1cm4rbiE9K24/K3IhPStyOjA9PStuPzEvK249PTEvcjorbj09K3I7Y2FzZVwiW29iamVjdCBEYXRlXVwiOmNhc2VcIltvYmplY3QgQm9vbGVhbl1cIjpyZXR1cm4rbj09K3I7Y2FzZVwiW29iamVjdCBTeW1ib2xdXCI6cmV0dXJuIHMudmFsdWVPZi5jYWxsKG4pPT09cy52YWx1ZU9mLmNhbGwocil9dmFyIGk9XCJbb2JqZWN0IEFycmF5XVwiPT09dTtpZighaSl7aWYoXCJvYmplY3RcIiE9dHlwZW9mIG58fFwib2JqZWN0XCIhPXR5cGVvZiByKXJldHVybiExO3ZhciBvPW4uY29uc3RydWN0b3IsYT1yLmNvbnN0cnVjdG9yO2lmKG8hPT1hJiYhKGguaXNGdW5jdGlvbihvKSYmbyBpbnN0YW5jZW9mIG8mJmguaXNGdW5jdGlvbihhKSYmYSBpbnN0YW5jZW9mIGEpJiZcImNvbnN0cnVjdG9yXCJpbiBuJiZcImNvbnN0cnVjdG9yXCJpbiByKXJldHVybiExfWU9ZXx8W107Zm9yKHZhciBjPSh0PXR8fFtdKS5sZW5ndGg7Yy0tOylpZih0W2NdPT09bilyZXR1cm4gZVtjXT09PXI7aWYodC5wdXNoKG4pLGUucHVzaChyKSxpKXtpZigoYz1uLmxlbmd0aCkhPT1yLmxlbmd0aClyZXR1cm4hMTtmb3IoO2MtLTspaWYoIXEobltjXSxyW2NdLHQsZSkpcmV0dXJuITF9ZWxzZXt2YXIgbCxmPWgua2V5cyhuKTtpZihjPWYubGVuZ3RoLGgua2V5cyhyKS5sZW5ndGghPT1jKXJldHVybiExO2Zvcig7Yy0tOylpZihsPWZbY10sIWoocixsKXx8IXEobltsXSxyW2xdLHQsZSkpcmV0dXJuITF9cmV0dXJuIHQucG9wKCksZS5wb3AoKSwhMH0saC5pc0VxdWFsPWZ1bmN0aW9uKG4scil7cmV0dXJuIHEobixyKX0saC5pc0VtcHR5PWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT1ufHwodyhuKSYmKGguaXNBcnJheShuKXx8aC5pc1N0cmluZyhuKXx8aC5pc0FyZ3VtZW50cyhuKSk/MD09PW4ubGVuZ3RoOjA9PT1oLmtleXMobikubGVuZ3RoKX0saC5pc0VsZW1lbnQ9ZnVuY3Rpb24obil7cmV0dXJuISghbnx8MSE9PW4ubm9kZVR5cGUpfSxoLmlzQXJyYXk9dHx8ZnVuY3Rpb24obil7cmV0dXJuXCJbb2JqZWN0IEFycmF5XVwiPT09cC5jYWxsKG4pfSxoLmlzT2JqZWN0PWZ1bmN0aW9uKG4pe3ZhciByPXR5cGVvZiBuO3JldHVyblwiZnVuY3Rpb25cIj09PXJ8fFwib2JqZWN0XCI9PT1yJiYhIW59LGguZWFjaChbXCJBcmd1bWVudHNcIixcIkZ1bmN0aW9uXCIsXCJTdHJpbmdcIixcIk51bWJlclwiLFwiRGF0ZVwiLFwiUmVnRXhwXCIsXCJFcnJvclwiLFwiU3ltYm9sXCIsXCJNYXBcIixcIldlYWtNYXBcIixcIlNldFwiLFwiV2Vha1NldFwiXSxmdW5jdGlvbihyKXtoW1wiaXNcIityXT1mdW5jdGlvbihuKXtyZXR1cm4gcC5jYWxsKG4pPT09XCJbb2JqZWN0IFwiK3IrXCJdXCJ9fSksaC5pc0FyZ3VtZW50cyhhcmd1bWVudHMpfHwoaC5pc0FyZ3VtZW50cz1mdW5jdGlvbihuKXtyZXR1cm4gaihuLFwiY2FsbGVlXCIpfSk7dmFyIEQ9bi5kb2N1bWVudCYmbi5kb2N1bWVudC5jaGlsZE5vZGVzO1wiZnVuY3Rpb25cIiE9dHlwZW9mLy4vJiZcIm9iamVjdFwiIT10eXBlb2YgSW50OEFycmF5JiZcImZ1bmN0aW9uXCIhPXR5cGVvZiBEJiYoaC5pc0Z1bmN0aW9uPWZ1bmN0aW9uKG4pe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIG58fCExfSksaC5pc0Zpbml0ZT1mdW5jdGlvbihuKXtyZXR1cm4haC5pc1N5bWJvbChuKSYmaXNGaW5pdGUobikmJiFpc05hTihwYXJzZUZsb2F0KG4pKX0saC5pc05hTj1mdW5jdGlvbihuKXtyZXR1cm4gaC5pc051bWJlcihuKSYmaXNOYU4obil9LGguaXNCb29sZWFuPWZ1bmN0aW9uKG4pe3JldHVybiEwPT09bnx8ITE9PT1ufHxcIltvYmplY3QgQm9vbGVhbl1cIj09PXAuY2FsbChuKX0saC5pc051bGw9ZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PT1ufSxoLmlzVW5kZWZpbmVkPWZ1bmN0aW9uKG4pe3JldHVybiB2b2lkIDA9PT1ufSxoLmhhcz1mdW5jdGlvbihuLHIpe2lmKCFoLmlzQXJyYXkocikpcmV0dXJuIGoobixyKTtmb3IodmFyIHQ9ci5sZW5ndGgsZT0wO2U8dDtlKyspe3ZhciB1PXJbZV07aWYobnVsbD09bnx8IWkuY2FsbChuLHUpKXJldHVybiExO249blt1XX1yZXR1cm4hIXR9LGgubm9Db25mbGljdD1mdW5jdGlvbigpe3JldHVybiBuLl89cix0aGlzfSxoLmlkZW50aXR5PWZ1bmN0aW9uKG4pe3JldHVybiBufSxoLmNvbnN0YW50PWZ1bmN0aW9uKG4pe3JldHVybiBmdW5jdGlvbigpe3JldHVybiBufX0saC5ub29wPWZ1bmN0aW9uKCl7fSxoLnByb3BlcnR5PWZ1bmN0aW9uKHIpe3JldHVybiBoLmlzQXJyYXkocik/ZnVuY3Rpb24obil7cmV0dXJuIHgobixyKX06YihyKX0saC5wcm9wZXJ0eU9mPWZ1bmN0aW9uKHIpe3JldHVybiBudWxsPT1yP2Z1bmN0aW9uKCl7fTpmdW5jdGlvbihuKXtyZXR1cm4gaC5pc0FycmF5KG4pP3gocixuKTpyW25dfX0saC5tYXRjaGVyPWgubWF0Y2hlcz1mdW5jdGlvbihyKXtyZXR1cm4gcj1oLmV4dGVuZE93bih7fSxyKSxmdW5jdGlvbihuKXtyZXR1cm4gaC5pc01hdGNoKG4scil9fSxoLnRpbWVzPWZ1bmN0aW9uKG4scix0KXt2YXIgZT1BcnJheShNYXRoLm1heCgwLG4pKTtyPXkocix0LDEpO2Zvcih2YXIgdT0wO3U8bjt1KyspZVt1XT1yKHUpO3JldHVybiBlfSxoLnJhbmRvbT1mdW5jdGlvbihuLHIpe3JldHVybiBudWxsPT1yJiYocj1uLG49MCksbitNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqKHItbisxKSl9LGgubm93PURhdGUubm93fHxmdW5jdGlvbigpe3JldHVybihuZXcgRGF0ZSkuZ2V0VGltZSgpfTt2YXIgTD17XCImXCI6XCImYW1wO1wiLFwiPFwiOlwiJmx0O1wiLFwiPlwiOlwiJmd0O1wiLCdcIic6XCImcXVvdDtcIixcIidcIjpcIiYjeDI3O1wiLFwiYFwiOlwiJiN4NjA7XCJ9LFA9aC5pbnZlcnQoTCksVz1mdW5jdGlvbihyKXt2YXIgdD1mdW5jdGlvbihuKXtyZXR1cm4gcltuXX0sbj1cIig/OlwiK2gua2V5cyhyKS5qb2luKFwifFwiKStcIilcIixlPVJlZ0V4cChuKSx1PVJlZ0V4cChuLFwiZ1wiKTtyZXR1cm4gZnVuY3Rpb24obil7cmV0dXJuIG49bnVsbD09bj9cIlwiOlwiXCIrbixlLnRlc3Qobik/bi5yZXBsYWNlKHUsdCk6bn19O2guZXNjYXBlPVcoTCksaC51bmVzY2FwZT1XKFApLGgucmVzdWx0PWZ1bmN0aW9uKG4scix0KXtoLmlzQXJyYXkocil8fChyPVtyXSk7dmFyIGU9ci5sZW5ndGg7aWYoIWUpcmV0dXJuIGguaXNGdW5jdGlvbih0KT90LmNhbGwobik6dDtmb3IodmFyIHU9MDt1PGU7dSsrKXt2YXIgaT1udWxsPT1uP3ZvaWQgMDpuW3JbdV1dO3ZvaWQgMD09PWkmJihpPXQsdT1lKSxuPWguaXNGdW5jdGlvbihpKT9pLmNhbGwobik6aX1yZXR1cm4gbn07dmFyIEM9MDtoLnVuaXF1ZUlkPWZ1bmN0aW9uKG4pe3ZhciByPSsrQytcIlwiO3JldHVybiBuP24rcjpyfSxoLnRlbXBsYXRlU2V0dGluZ3M9e2V2YWx1YXRlOi88JShbXFxzXFxTXSs/KSU+L2csaW50ZXJwb2xhdGU6LzwlPShbXFxzXFxTXSs/KSU+L2csZXNjYXBlOi88JS0oW1xcc1xcU10rPyklPi9nfTt2YXIgSj0vKC4pXi8sVT17XCInXCI6XCInXCIsXCJcXFxcXCI6XCJcXFxcXCIsXCJcXHJcIjpcInJcIixcIlxcblwiOlwiblwiLFwiXFx1MjAyOFwiOlwidTIwMjhcIixcIlxcdTIwMjlcIjpcInUyMDI5XCJ9LFY9L1xcXFx8J3xcXHJ8XFxufFxcdTIwMjh8XFx1MjAyOS9nLCQ9ZnVuY3Rpb24obil7cmV0dXJuXCJcXFxcXCIrVVtuXX07aC50ZW1wbGF0ZT1mdW5jdGlvbihpLG4scil7IW4mJnImJihuPXIpLG49aC5kZWZhdWx0cyh7fSxuLGgudGVtcGxhdGVTZXR0aW5ncyk7dmFyIHQsZT1SZWdFeHAoWyhuLmVzY2FwZXx8Sikuc291cmNlLChuLmludGVycG9sYXRlfHxKKS5zb3VyY2UsKG4uZXZhbHVhdGV8fEopLnNvdXJjZV0uam9pbihcInxcIikrXCJ8JFwiLFwiZ1wiKSxvPTAsYT1cIl9fcCs9J1wiO2kucmVwbGFjZShlLGZ1bmN0aW9uKG4scix0LGUsdSl7cmV0dXJuIGErPWkuc2xpY2Uobyx1KS5yZXBsYWNlKFYsJCksbz11K24ubGVuZ3RoLHI/YSs9XCInK1xcbigoX190PShcIityK1wiKSk9PW51bGw/Jyc6Xy5lc2NhcGUoX190KSkrXFxuJ1wiOnQ/YSs9XCInK1xcbigoX190PShcIit0K1wiKSk9PW51bGw/Jyc6X190KStcXG4nXCI6ZSYmKGErPVwiJztcXG5cIitlK1wiXFxuX19wKz0nXCIpLG59KSxhKz1cIic7XFxuXCIsbi52YXJpYWJsZXx8KGE9XCJ3aXRoKG9ianx8e30pe1xcblwiK2ErXCJ9XFxuXCIpLGE9XCJ2YXIgX190LF9fcD0nJyxfX2o9QXJyYXkucHJvdG90eXBlLmpvaW4sXCIrXCJwcmludD1mdW5jdGlvbigpe19fcCs9X19qLmNhbGwoYXJndW1lbnRzLCcnKTt9O1xcblwiK2ErXCJyZXR1cm4gX19wO1xcblwiO3RyeXt0PW5ldyBGdW5jdGlvbihuLnZhcmlhYmxlfHxcIm9ialwiLFwiX1wiLGEpfWNhdGNoKG4pe3Rocm93IG4uc291cmNlPWEsbn12YXIgdT1mdW5jdGlvbihuKXtyZXR1cm4gdC5jYWxsKHRoaXMsbixoKX0sYz1uLnZhcmlhYmxlfHxcIm9ialwiO3JldHVybiB1LnNvdXJjZT1cImZ1bmN0aW9uKFwiK2MrXCIpe1xcblwiK2ErXCJ9XCIsdX0saC5jaGFpbj1mdW5jdGlvbihuKXt2YXIgcj1oKG4pO3JldHVybiByLl9jaGFpbj0hMCxyfTt2YXIgRz1mdW5jdGlvbihuLHIpe3JldHVybiBuLl9jaGFpbj9oKHIpLmNoYWluKCk6cn07aC5taXhpbj1mdW5jdGlvbih0KXtyZXR1cm4gaC5lYWNoKGguZnVuY3Rpb25zKHQpLGZ1bmN0aW9uKG4pe3ZhciByPWhbbl09dFtuXTtoLnByb3RvdHlwZVtuXT1mdW5jdGlvbigpe3ZhciBuPVt0aGlzLl93cmFwcGVkXTtyZXR1cm4gdS5hcHBseShuLGFyZ3VtZW50cyksRyh0aGlzLHIuYXBwbHkoaCxuKSl9fSksaH0saC5taXhpbihoKSxoLmVhY2goW1wicG9wXCIsXCJwdXNoXCIsXCJyZXZlcnNlXCIsXCJzaGlmdFwiLFwic29ydFwiLFwic3BsaWNlXCIsXCJ1bnNoaWZ0XCJdLGZ1bmN0aW9uKHIpe3ZhciB0PWVbcl07aC5wcm90b3R5cGVbcl09ZnVuY3Rpb24oKXt2YXIgbj10aGlzLl93cmFwcGVkO3JldHVybiB0LmFwcGx5KG4sYXJndW1lbnRzKSxcInNoaWZ0XCIhPT1yJiZcInNwbGljZVwiIT09cnx8MCE9PW4ubGVuZ3RofHxkZWxldGUgblswXSxHKHRoaXMsbil9fSksaC5lYWNoKFtcImNvbmNhdFwiLFwiam9pblwiLFwic2xpY2VcIl0sZnVuY3Rpb24obil7dmFyIHI9ZVtuXTtoLnByb3RvdHlwZVtuXT1mdW5jdGlvbigpe3JldHVybiBHKHRoaXMsci5hcHBseSh0aGlzLl93cmFwcGVkLGFyZ3VtZW50cykpfX0pLGgucHJvdG90eXBlLnZhbHVlPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX3dyYXBwZWR9LGgucHJvdG90eXBlLnZhbHVlT2Y9aC5wcm90b3R5cGUudG9KU09OPWgucHJvdG90eXBlLnZhbHVlLGgucHJvdG90eXBlLnRvU3RyaW5nPWZ1bmN0aW9uKCl7cmV0dXJuIFN0cmluZyh0aGlzLl93cmFwcGVkKX0sXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kJiZkZWZpbmUoXCJ1bmRlcnNjb3JlXCIsW10sZnVuY3Rpb24oKXtyZXR1cm4gaH0pfSgpO1xuIiwiaW1wb3J0IHtleHRyYWN0RXh0ZW5zaW9ufSBmcm9tIFwidXRpbHMvc3RyaW5nc1wiO1xuXG5leHBvcnQgY29uc3QgaXNSdG1wID0gZnVuY3Rpb24gKGZpbGUsIHR5cGUpIHtcbiAgICBpZihmaWxlKXtcbiAgICAgICAgcmV0dXJuIChmaWxlLmluZGV4T2YoJ3J0bXA6JykgPT0gMCB8fCB0eXBlID09ICdydG1wJyk7XG4gICAgfVxufTtcbmV4cG9ydCBjb25zdCBpc1dlYlJUQyA9IGZ1bmN0aW9uIChmaWxlLCB0eXBlKSB7XG4gICAgaWYoZmlsZSl7XG4gICAgICAgIHJldHVybiAoZmlsZS5pbmRleE9mKCd3czonKSA9PT0gMCB8fCBmaWxlLmluZGV4T2YoJ3dzczonKSA9PT0gMCB8fCB0eXBlID09PSAnd2VicnRjJyk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG5leHBvcnQgY29uc3QgaXNIbHMgPSBmdW5jdGlvbiAoZmlsZSwgdHlwZSkge1xuICAgIGlmKGZpbGUpe1xuICAgICAgICByZXR1cm4gKCB0eXBlID09PSAnaGxzJyB8fCAgdHlwZSA9PT0gJ20zdTgnIHx8IHR5cGUgPT09ICdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcgfHwgZXh0cmFjdEV4dGVuc2lvbihmaWxlKSA9PSAnbTN1OCcpO1xuXG4gICAgfVxufTtcbmV4cG9ydCBjb25zdCBpc0Rhc2ggPSBmdW5jdGlvbiAoZmlsZSwgdHlwZSkge1xuICAgIGlmKGZpbGUpe1xuICAgICAgICByZXR1cm4gKCB0eXBlID09PSAnbXBkJyB8fCAgdHlwZSA9PT0gJ2Rhc2gnIHx8IHR5cGUgPT09ICdhcHBsaWNhdGlvbi9kYXNoK3htbCcgfHwgZXh0cmFjdEV4dGVuc2lvbihmaWxlKSA9PSAnbXBkJyk7XG5cbiAgICB9XG59O1xuIiwiLyoqXG4gKiB1dGlscyBmb3Igd2VicGFja1xuICovXG5cbmV4cG9ydCBjb25zdCBnZXRTY3JpcHRQYXRoID0gZnVuY3Rpb24oc2NyaXB0TmFtZSkge1xuICAgIGNvbnN0IHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0Jyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY3JpcHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHNyYyA9IHNjcmlwdHNbaV0uc3JjO1xuICAgICAgICBpZiAoc3JjKSB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHNyYy5sYXN0SW5kZXhPZignLycgKyBzY3JpcHROYW1lKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNyYy5zdWJzdHIoMCwgaW5kZXggKyAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gJyc7XG59O1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gMjkuLlxuICovXG5leHBvcnQgY29uc3QgdmVyc2lvbiA9IF9fVkVSU0lPTl9fO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==