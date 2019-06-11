/*! OvenPlayerv0.9.5974 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

        if (!isSameProvider) {
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
    //sources, tracks,


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
            rtmpBufferTimeMax: 3
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

    var that = {};
    that.getConfig = function () {
        return spec;
    };
    that.setConfig = function (config, value) {
        spec[config] = value;
    };

    that.getContainer = function () {
        return spec.mediaContainer;
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
    volume_mute: "volume-mute"
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
        if (videoElement) {
            that.empty();
        }

        return providerName === _constants.PROVIDER_RTMP ? createFlashVideo(playerConfig.isLoop(), playerConfig.getRtmpBufferTime(), playerConfig.getRtmpBufferTimeMax()) : createHtmlVideo(playerConfig.isLoop());
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
        //We do not support "PLAYLIST" not yet. So this returns playlist of 0.
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
        OvenPlayerConsole['log'] = function () {};
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

    // flash (you'll need to include swfobject)
    /* script src="//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js" */
    var flashVersion = 'no check';
    if (typeof swfobject != 'undefined') {
        var fv = swfobject.getFlashPlayerVersion();
        if (fv.major > 0) {
            flashVersion = fv.major + '.' + fv.minor + ' r' + fv.release;
        } else {
            flashVersion = unknown;
        }
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
        cookies: cookieEnabled,
        flashVersion: flashVersion,
        webview: isWebview
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
var version = exports.version = '0.9.5974-localbuild';

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvQXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvQXBpRXhwYW5zaW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0NvbmZpZ3VyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0V2ZW50RW1pdHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0xhenlDb21tYW5kRXhlY3V0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9TdXBwb3J0Q2hlY2tlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2NhcHRpb24vTG9hZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvY2FwdGlvbi9NYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvY2FwdGlvbi9wYXJzZXIvU3J0UGFyc2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvY29uc3RhbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvbWVkaWEvTWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3BsYXlsaXN0L01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9Db250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9vdmVucGxheWVyLnNkay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvY2FwdGlvbnMvdnR0Q3VlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9saWtlQSQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3N0cmluZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3VuZGVyc2NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3ZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvd2VicGFjay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmVyc2lvbi5qcyJdLCJuYW1lcyI6WyJBcGkiLCJjb250YWluZXIiLCJ0aGF0IiwiY29uc29sZSIsImxvZyIsInZlcnNpb24iLCJPdmVuUGxheWVyQ29uc29sZSIsInBsYXlsaXN0TWFuYWdlciIsInByb3ZpZGVyQ29udHJvbGxlciIsInVzZXJBZ2VudE9iamVjdCIsIm1lZGlhTWFuYWdlciIsImN1cnJlbnRQcm92aWRlciIsInBsYXllckNvbmZpZyIsImxhenlRdWV1ZSIsImNhcHRpb25NYW5hZ2VyIiwicnVuTmV4dFBsYXlsaXN0IiwiaW5kZXgiLCJuZXh0UGxheWxpc3RJbmRleCIsInBsYXlsaXN0IiwiZ2V0UGxheWxpc3QiLCJoYXNOZXh0UGxheWxpc3QiLCJzZXRTb3VyY2VJbmRleCIsInNldEN1cnJlbnRQbGF5bGlzdCIsImluaXRQcm92aWRlciIsImlzQXV0b1N0YXJ0IiwicGxheSIsInRyaWdnZXIiLCJBTExfUExBWUxJU1RfRU5ERUQiLCJsYXN0UGxheVBvc2l0aW9uIiwicGlja1F1YWxpdHlGcm9tU291cmNlIiwic291cmNlcyIsInF1YWxpdHkiLCJpIiwibGVuZ3RoIiwiZ2V0U291cmNlSW5kZXgiLCJsb2FkUHJvdmlkZXJzIiwiZ2V0Q3VycmVudFBsYXlMaXN0IiwidGhlbiIsIlByb3ZpZGVycyIsIkVSUk9SUyIsIklOSVRfVU5TVVBQT1JUX0VSUk9SIiwiZGVzdHJveSIsImdldEN1cnJlbnRQbGF5bGlzdEluZGV4IiwiY3VycmVudFNvdXJjZUluZGV4IiwiZ2V0Q3VycmVudFNvdXJjZXMiLCJwcm92aWRlck5hbWUiLCJwcm92aWRlciIsImNyZWF0ZU1lZGlhIiwiZ2V0Q3VycmVudEFkVGFnIiwiUFJPVklERVJfUlRNUCIsIm9uIiwibmFtZSIsImRhdGEiLCJFUlJPUiIsIk5FVFdPUktfVU5TVEFCTEVEIiwiZ2V0U291cmNlcyIsInBhdXNlIiwic2V0Q3VycmVudFNvdXJjZSIsInByZWxvYWQiLCJSRUFEWSIsImZsdXNoIiwiZXJyb3IiLCJvZmYiLCJjb2RlIiwidGVtcEVycm9yIiwiSU5JVF9VTktOV09OX0VSUk9SIiwiaW5pdCIsIm9wdGlvbnMiLCJtZWRpYUNvbnRhaW5lciIsImJyb3dzZXIiLCJpbml0UGxheWxpc3QiLCJnZXRQcm92aWRlck5hbWUiLCJnZXROYW1lIiwiZ2V0Q29uZmlnIiwiZ2V0QnJvd3NlciIsInNldFRpbWVjb2RlTW9kZSIsImlzU2hvdyIsImlzVGltZWNvZGVNb2RlIiwiZ2V0RnJhbWVyYXRlIiwic2Vla0ZyYW1lIiwiZnJhbWVDb3VudCIsImdldER1cmF0aW9uIiwiZ2V0UG9zaXRpb24iLCJnZXRWb2x1bWUiLCJzZXRWb2x1bWUiLCJ2b2x1bWUiLCJzZXRNdXRlIiwic3RhdGUiLCJnZXRNdXRlIiwibG9hZCIsInNldEN1cnJlbnRRdWFsaXR5Iiwic2VlayIsInBvc2l0aW9uIiwic2V0UGxheWJhY2tSYXRlIiwicGxheWJhY2tSYXRlIiwiZ2V0UGxheWJhY2tSYXRlIiwiZ2V0Q3VycmVudFBsYXlsaXN0IiwiZ2V0Q3VycmVudFNvdXJjZSIsImN1cnJlbnRTb3VyY2UiLCJuZXdTb3VyY2UiLCJpc1NhbWVQcm92aWRlciIsInJlc3VsdFNvdXJjZUluZGV4IiwiZ2V0UXVhbGl0eUxldmVscyIsImdldEN1cnJlbnRRdWFsaXR5IiwicXVhbGl0eUluZGV4IiwiaXNBdXRvUXVhbGl0eSIsInNldEF1dG9RdWFsaXR5IiwiaXNBdXRvIiwiZ2V0Q2FwdGlvbkxpc3QiLCJnZXRDdXJyZW50Q2FwdGlvbiIsInNldEN1cnJlbnRDYXB0aW9uIiwiYWRkQ2FwdGlvbiIsInRyYWNrIiwicmVtb3ZlQ2FwdGlvbiIsImdldEJ1ZmZlciIsImdldFN0YXRlIiwic3RvcCIsInJlbW92ZSIsIkRFU1RST1kiLCJPdmVuUGxheWVyU0RLIiwicmVtb3ZlUGxheWVyIiwiZ2V0Q29udGFpbmVySWQiLCJnZXRQbGF5ZXJMaXN0IiwiZ2V0VmVyc2lvbiIsIkFwaVJ0bXBFeHBhbnNpb24iLCJleHRlcm5hbENhbGxiYWNrQ3JlZXAiLCJyZXN1bHQiLCJ0cmlnZ2VyRXZlbnRGcm9tRXh0ZXJuYWwiLCJDb25maWd1cmF0b3IiLCJjb21wb3NlU291cmNlT3B0aW9ucyIsIkRlZmF1bHRzIiwicGxheWJhY2tSYXRlcyIsIm11dGUiLCJsb29wIiwiY29udHJvbHMiLCJhdXRvU3RhcnQiLCJ0aW1lY29kZSIsInNvdXJjZUluZGV4IiwiaGlkZVBsYXlsaXN0SWNvbiIsInJ0bXBCdWZmZXJUaW1lIiwicnRtcEJ1ZmZlclRpbWVNYXgiLCJzZXJpYWxpemUiLCJ2YWwiLCJ1bmRlZmluZWQiLCJsb3dlcmNhc2VWYWwiLCJ0b0xvd2VyQ2FzZSIsImlzTmFOIiwiTnVtYmVyIiwicGFyc2VGbG9hdCIsImRlc2VyaWFsaXplIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJjb25maWciLCJmaWx0ZXIiLCJfIiwiaXNOdW1iZXIiLCJyYXRlIiwibWFwIiwiTWF0aCIsInJvdW5kIiwiaW5kZXhPZiIsInB1c2giLCJzb3J0IiwiY29uZmlnUGxheWxpc3QiLCJvYmoiLCJwaWNrIiwiaXNBcnJheSIsImZlZWREYXRhIiwiZHVyYXRpb24iLCJzcGVjIiwic2V0Q29uZmlnIiwidmFsdWUiLCJnZXRDb250YWluZXIiLCJnZXRRdWFsaXR5TGFiZWwiLCJxdWFsaXR5TGFiZWwiLCJzZXRRdWFsaXR5TGFiZWwiLCJuZXdMYWJlbCIsIkNPTlRFTlRfVElNRV9NT0RFX0NIQU5HRUQiLCJnZXRSdG1wQnVmZmVyVGltZSIsImdldFJ0bXBCdWZmZXJUaW1lTWF4IiwiaXNNdXRlIiwiaXNMb29wIiwiaXNDb250cm9scyIsImdldFBsYXliYWNrUmF0ZXMiLCJzZXRQbGF5bGlzdCIsIkV2ZW50RW1pdHRlciIsIm9iamVjdCIsIl9ldmVudHMiLCJ0cmlnZ2VyRXZlbnRzIiwiZXZlbnRzIiwiYXJncyIsImNvbnRleHQiLCJldmVudCIsImxpc3RlbmVyIiwiYXBwbHkiLCJzbGljZSIsImNhbGwiLCJhcmd1bWVudHMiLCJhbGxFdmVudHMiLCJhbGwiLCJuYW1lcyIsImwiLCJyZXRhaW4iLCJqIiwiayIsIl9saXN0ZW5lciIsIm9uY2UiLCJjb3VudCIsIm9uY2VDYWxsYmFjayIsIkxhenlDb21tYW5kRXhlY3V0b3IiLCJpbnN0YW5jZSIsInF1ZXVlZENvbW1hbmRzIiwiY29tbWFuZFF1ZXVlIiwidW5kZWNvcmF0ZWRNZXRob2RzIiwiZXhlY3V0ZU1vZGUiLCJjb21tYW5kIiwibWV0aG9kIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJhZGRRdWV1ZSIsImV4ZWN1dGVRdWV1ZWRDb21tYW5kcyIsInNoaWZ0Iiwic2V0RXhlY3V0ZU1vZGUiLCJtb2RlIiwiZ2V0VW5kZWNvcmF0ZWRNZXRob2RzIiwiZ2V0UXVldWUiLCJlbXB0eSIsInJlbW92ZUFuZEV4Y3V0ZU9uY2UiLCJjb21tYW5kXyIsImNvbW1hbmRRdWV1ZUl0ZW0iLCJmaW5kV2hlcmUiLCJzcGxpY2UiLCJmaW5kSW5kZXgiLCJTdXBwb3J0Q2hlY2tlciIsInN1cHBvcnRMaXN0IiwiY2hlY2tTdXBwb3J0Iiwic291cmNlIiwiTWltZVR5cGVzIiwiYWFjIiwibXA0IiwiZjR2IiwibTR2IiwibW92IiwibXAzIiwibXBlZyIsIm9ndiIsIm9nZyIsIm9nYSIsInZvcmJpcyIsIndlYm0iLCJmNGEiLCJtM3U4IiwibTN1IiwiaGxzIiwidmlkZW8iLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjYW5QbGF5VHlwZSIsImZpbGUiLCJ0eXBlIiwibWltZVR5cGUiLCJ3aW5kb3ciLCJNZWRpYVNvdXJjZSIsIldlYktpdE1lZGlhU291cmNlIiwiaXNIbHNTdXBwb3J0IiwiZ2V0TWVkaWFTb3VyY2UiLCJtZWRpYVNvdXJjZSIsInNvdXJjZUJ1ZmZlciIsIlNvdXJjZUJ1ZmZlciIsIldlYktpdFNvdXJjZUJ1ZmZlciIsImlzVHlwZVN1cHBvcnRlZCIsInNvdXJjZUJ1ZmZlclZhbGlkQVBJIiwiYXBwZW5kQnVmZmVyIiwidGVzdEZsYXNoIiwic3VwcG9ydCIsIkFjdGl2ZVhPYmplY3QiLCJlIiwibmF2aWdhdG9yIiwibWltZVR5cGVzIiwib3MiLCJmaW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UiLCJzb3J1Y2VfIiwiZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0IiwicGxheWxpc3RJdGVtIiwic3VwcG9ydE5hbWVzIiwiaXRlbSIsInN1cHBvcnRlZCIsIkxvYWRlciIsImNvbnZlcnRUb1ZUVEN1ZXMiLCJjdWVzIiwiVlRUQ3VlIiwiY3VlIiwic3RhcnQiLCJlbmQiLCJ0ZXh0IiwibGFuZ3VhZ2UiLCJzdWNjZXNzQ2FsbGJhY2siLCJlcnJvckNhbGxiYWNrIiwicmVxdWVzdE9wdGlvbnMiLCJ1cmwiLCJlbmNvZGluZyIsImxvYWRSZXF1ZXN0RG93bmxvZGVyIiwiUmVxdWVzdCIsInJlc3BvbnNlIiwiYm9keSIsInZ0dEN1ZXMiLCJsb2FkVnR0UGFyc2VyIiwicGFyc2VyIiwiV2ViVlRUIiwiUGFyc2VyIiwiU3RyaW5nRGVjb2RlciIsIm9uY3VlIiwib25mbHVzaCIsInBhcnNlIiwibG9hZFNtaVBhcnNlciIsInBhcnNlZERhdGEiLCJTbWlQYXJzZXIiLCJmaXhlZExhbmciLCJyZXF1aXJlIiwiZXJyIiwiaXNTdXBwb3J0Iiwia2luZCIsIk1hbmFnZXIiLCJhcGkiLCJwbGF5bGlzdEluZGV4IiwiY2FwdGlvbkxpc3QiLCJjdXJyZW50Q2FwdGlvbkluZGV4IiwiY2FwdGlvbkxvYWRlciIsImlzRmlzcnRMb2FkIiwiaXNTaG93aW5nIiwiYmluZFRyYWNrIiwibGFiZWwiLCJpZCIsInRyYWNrc0NvdW50IiwidHJhY2tJZCIsInByZWZpeCIsImRlZmF1bHR0cmFjayIsImNoYW5nZUN1cnJlbnRDYXB0aW9uIiwiQ09OVEVOVF9DQVBUSU9OX0NIQU5HRUQiLCJ0cmFja3MiLCJsYW5nIiwiY2FwdGlvbklkIiwiUExBWUVSX0NBUFRJT05fRVJST1IiLCJDT05URU5UX1RJTUUiLCJtZXRhIiwiY3VycmVudEN1ZXMiLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwiQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VEIiwiZmx1c2hDYXB0aW9uTGlzdCIsImxhc3RDYXB0aW9uSW5kZXgiLCJfaW5kZXgiLCJfZW50cnkiLCJlbnRyeSIsImFycmF5Iiwic3BsaXQiLCJpZHgiLCJsaW5lIiwic3Vic3RyIiwiam9pbiIsIlNydFBhcnNlciIsImNhcHRpb25zIiwibGlzdCIsIlNUQVRFX0JVRkZFUklORyIsIlNUQVRFX0lETEUiLCJTVEFURV9DT01QTEVURSIsIlNUQVRFX1BBVVNFRCIsIlNUQVRFX1BMQVlJTkciLCJTVEFURV9FUlJPUiIsIlNUQVRFX0xPQURJTkciLCJTVEFURV9TVEFMTEVEIiwiU1RBVEVfQURfTE9BRElORyIsIlNUQVRFX0FEX0xPQURFRCIsIlNUQVRFX0FEX1BMQVlJTkciLCJTVEFURV9BRF9QQVVTRUQiLCJTVEFURV9BRF9DT01QTEVURSIsIlNUQVRFX0FEX0VSUk9SIiwiUFJPVklERVJfSFRNTDUiLCJQUk9WSURFUl9XRUJSVEMiLCJQUk9WSURFUl9EQVNIIiwiUFJPVklERVJfSExTIiwiQ09OVEVOVF9DT01QTEVURSIsIkNPTlRFTlRfU0VFSyIsIkNPTlRFTlRfQlVGRkVSX0ZVTEwiLCJESVNQTEFZX0NMSUNLIiwiQ09OVEVOVF9MT0FERUQiLCJQTEFZTElTVF9DSEFOR0VEIiwiQ09OVEVOVF9TRUVLRUQiLCJQTEFZRVJfU1RBVEUiLCJQTEFZRVJfQ09NUExFVEUiLCJQTEFZRVJfUEFVU0UiLCJQTEFZRVJfUExBWSIsIlBMQVlFUl9SRVNJWkVEIiwiUExBWUVSX0xPQURJTkciLCJQTEFZRVJfRlVMTFNDUkVFTl9SRVFVRVNUIiwiUExBWUVSX0ZVTExTQ1JFRU5fQ0hBTkdFRCIsIlBMQVlFUl9XQVJOSU5HIiwiQURfQ0hBTkdFRCIsIkFEX1RJTUUiLCJDT05URU5UX0JVRkZFUiIsIkNPTlRFTlRfUkFURV9DSEFOR0UiLCJDT05URU5UX1ZPTFVNRSIsIkNPTlRFTlRfTVVURSIsIkNPTlRFTlRfTUVUQSIsIkNPTlRFTlRfU09VUkNFX0NIQU5HRUQiLCJDT05URU5UX0xFVkVMX0NIQU5HRUQiLCJQTEFZQkFDS19SQVRFX0NIQU5HRUQiLCJPTUVfUDJQX01PREUiLCJJTklUX1JUTVBfU0VUVVBfRVJST1IiLCJJTklUX0RBU0hfVU5TVVBQT1JUIiwiSU5JVF9BRFNfRVJST1IiLCJJTklUX0RBU0hfTk9URk9VTkQiLCJJTklUX0hMU0pTX05PVEZPVU5EIiwiUExBWUVSX1VOS05XT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SIiwiUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SIiwiUExBWUVSX0ZJTEVfRVJST1IiLCJQTEFZRVJfV0VCUlRDX1dTX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19TRVRfUkVNT1RFX0RFU0NfRVJST1IiLCJQTEFZRVJfV0VCUlRDX0NSRUFURV9BTlNXRVJfRVJST1IiLCJQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19ORVRXT1JLX1NMT1ciLCJXQVJOX01TR19NVVRFRFBMQVkiLCJtZXNzYWdlIiwicmVhc29uIiwiVUlfSUNPTlMiLCJ2b2x1bWVfbXV0ZSIsImJyb3dzZXJJbmZvIiwiU1dGUGF0aCIsInJvb3RJZCIsImdldEF0dHJpYnV0ZSIsIiRjb250YWluZXIiLCJ2aWRlb0VsZW1lbnQiLCJjcmVhdGVIdG1sVmlkZW8iLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmQiLCJjcmVhdGVGbGFzaFZpZGVvIiwiYnVmZmVyVGltZSIsImJ1ZmZlclRpbWVNYXgiLCJtb3ZpZSIsImZsYXNodmFycyIsImFsbG93c2NyaXB0YWNjZXNzIiwiYWxsb3dmdWxsc2NyZWVuIiwibWVudSIsInF1YWwiLCJiZ2NvbG9yIiwid21vZGUiLCJicm93c2VyTWFqb3JWZXJzaW9uIiwiYXBwZW5kQ2hpbGQiLCJjcmVhdGVBZENvbnRhaW5lciIsImFkQ29udGFpbmVyIiwicmVtb3ZlQ2hpbGQiLCJjdXJyZW50UGxheWxpc3RJdGVtIiwiY3VycmVudEluZGV4Iiwic3VwcG9ydENoZWNrZXIiLCJtYWtlUHJldHR5U291cmNlIiwic291cmNlXyIsImhvc3QiLCJhcHBsaWNhdGlvbiIsInN0cmVhbSIsIm1pbWV0eXBlUmVnRXgiLCJ0ZXN0IiwicmVwbGFjZSIsInByZXR0aWVkUGxheWxpc3QiLCJ0aXRsZSIsImxldmVscyIsInByZXR0eVNvdXJjZSIsImRlZmF1bHRTb3VyY2UiLCJ0b1N0cmluZyIsImNvbmNhdCIsImFkVGFnVXJsIiwiQ29udHJvbGxlciIsInN1cHBvcnRDaGFja2VyIiwicmVnaXN0ZVByb3ZpZGVyIiwiUHJvdmlkZXJMb2FkZXIiLCJodG1sNSIsIkVycm9yIiwid2VicnRjIiwiZGFzaCIsInJ0bXAiLCJzdXBwb3J0ZWRQcm92aWRlck5hbWVzIiwiUHJvbWlzZSIsInJlamVjdCIsImZpbmRCeU5hbWUiLCJnZXRQcm92aWRlckJ5U291cmNlIiwic3VwcG9ydGVkUHJvdmlkZXJOYW1lIiwiX193ZWJwYWNrX3B1YmxpY19wYXRoX18iLCJwbGF5ZXJMaXN0IiwiY2hlY2tBbmRHZXRDb250YWluZXJFbGVtZW50IiwiY29udGFpbmVyRWxlbWVudCIsImdldEVsZW1lbnRCeUlkIiwibm9kZVR5cGUiLCJjcmVhdGUiLCJwbGF5ZXJJbnN0YW5jZSIsImdldFBsYXllckJ5Q29udGFpbmVySWQiLCJjb250YWluZXJJZCIsImdldFBsYXllckJ5SW5kZXgiLCJwbGF5ZXJJZCIsImdlbmVyYXRlV2VicnRjVXJscyIsImRlYnVnIiwiaXNEZWJ1Z01vZGUiLCJnZXRCcm93c2VyTGFuZ3VhZ2UiLCJuYXYiLCJicm93c2VyTGFuZ3VhZ2VQcm9wZXJ0eUtleXMiLCJsYW5ndWFnZXMiLCJhbmFsVXNlckFnZW50IiwidW5rbm93biIsInNjcmVlblNpemUiLCJzY3JlZW4iLCJ3aWR0aCIsImhlaWdodCIsIm5WZXIiLCJhcHBWZXJzaW9uIiwibkFndCIsInVzZXJBZ2VudCIsImFwcE5hbWUiLCJtYWpvclZlcnNpb24iLCJwYXJzZUludCIsImlzV2VidmlldyIsIm5hbWVPZmZzZXQiLCJ2ZXJPZmZzZXQiLCJpeCIsInN1YnN0cmluZyIsImxhc3RJbmRleE9mIiwidG9VcHBlckNhc2UiLCJtb2JpbGUiLCJjb29raWVFbmFibGVkIiwiY29va2llIiwiY2xpZW50U3RyaW5ncyIsInMiLCJyIiwiY3MiLCJvc1ZlcnNpb24iLCJleGVjIiwiZmxhc2hWZXJzaW9uIiwic3dmb2JqZWN0IiwiZnYiLCJnZXRGbGFzaFBsYXllclZlcnNpb24iLCJtYWpvciIsIm1pbm9yIiwicmVsZWFzZSIsImJyb3dzZXJWZXJzaW9uIiwidWEiLCJjb29raWVzIiwid2VidmlldyIsImF1dG9LZXl3b3JkIiwiZGlyZWN0aW9uU2V0dGluZyIsImFsaWduU2V0dGluZyIsImZpbmREaXJlY3Rpb25TZXR0aW5nIiwiZGlyIiwiZmluZEFsaWduU2V0dGluZyIsImFsaWduIiwiZXh0ZW5kIiwiY29iaiIsInAiLCJpc0lFOCIsImJhc2VPYmoiLCJlbnVtZXJhYmxlIiwiaGFzQmVlblJlc2V0IiwiX2lkIiwiX3BhdXNlT25FeGl0IiwiX3N0YXJ0VGltZSIsIl9lbmRUaW1lIiwiX3RleHQiLCJfcmVnaW9uIiwiX3ZlcnRpY2FsIiwiX3NuYXBUb0xpbmVzIiwiX2xpbmUiLCJfbGluZUFsaWduIiwiX3Bvc2l0aW9uIiwiX3Bvc2l0aW9uQWxpZ24iLCJfc2l6ZSIsIl9hbGlnbiIsImRlZmluZVByb3BlcnR5IiwiZ2V0Iiwic2V0IiwiVHlwZUVycm9yIiwic2V0dGluZyIsIlN5bnRheEVycm9yIiwiZGlzcGxheVN0YXRlIiwiZ2V0Q3VlQXNIVE1MIiwiY29udmVydEN1ZVRvRE9NVHJlZSIsIkxhJCIsInNlbGVjdG9yT3JFbGVtZW50IiwicmV0dXJuTm9kZSIsIiRlbGVtZW50Iiwic2VsZWN0b3IiLCJub2RlTGlzdCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpc0VsZW1lbnQiLCJldmVyeSIsImZpbmQiLCJjc3MiLCJlbGVtZW50Iiwic3R5bGUiLCJhZGRDbGFzcyIsImNsYXNzTGlzdCIsImFkZCIsImNsYXNzTmFtZXMiLCJjbGFzc05hbWUiLCJyZW1vdmVDbGFzcyIsIlJlZ0V4cCIsInJlbW92ZUF0dHJpYnV0ZSIsImF0dHJOYW1lIiwic2hvdyIsImRpc3BsYXkiLCJoaWRlIiwidGV4dENvbnRlbnQiLCJodG1sIiwiaW5uZXJIVE1MIiwiaGFzQ2xhc3MiLCJjb250YWlucyIsImlzIiwiJHRhcmdldEVsZW1lbnQiLCJvZmZzZXQiLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwidG9wIiwic2Nyb2xsVG9wIiwibGVmdCIsInNjcm9sbExlZnQiLCJjbGllbnRXaWR0aCIsImNsaWVudEhlaWdodCIsImF0dHIiLCJyZXBsYWNlV2l0aCIsInBhcmVudEVsZW1lbnQiLCJoYXNDaGlsZE5vZGVzIiwiZmlyc3RDaGlsZCIsImNsb3Nlc3QiLCJzZWxlY3RvclN0cmluZyIsImNsb3Nlc3RFbGVtZW50IiwidHJpbSIsIm5hdHVyYWxIbXMiLCJobXNUb1NlY29uZCIsInN0cmluZyIsImV4dHJhY3RFeHRlbnNpb24iLCJwYXRoIiwiZ2V0QXp1cmVGaWxlRm9ybWF0IiwiZXh0ZW5zaW9uIiwiYXp1cmVkRm9ybWF0Iiwic2Vjb25kIiwic2VjTnVtIiwiaG91cnMiLCJmbG9vciIsIm1pbnV0ZXMiLCJzZWNvbmRzIiwic3RyIiwiZnJhbWVSYXRlIiwiYXJyIiwiYXJyTGVuZ3RoIiwic2VjIiwic2VjSW5kZXgiLCJuIiwic2VsZiIsImdsb2JhbCIsIm8iLCJTeW1ib2wiLCJ1IiwiYyIsImhhc093blByb3BlcnR5IiwidCIsImEiLCJmIiwiaCIsIl93cmFwcGVkIiwiZXhwb3J0cyIsIm1vZHVsZSIsIlZFUlNJT04iLCJ2IiwieSIsImQiLCJpdGVyYXRlZSIsImlkZW50aXR5IiwiaXNGdW5jdGlvbiIsImlzT2JqZWN0IiwibWF0Y2hlciIsInByb3BlcnR5IiwiZyIsIm1heCIsIm0iLCJiIiwieCIsInBvdyIsIkEiLCJ3IiwiZWFjaCIsImNvbGxlY3QiLCJPIiwicmVkdWNlIiwiZm9sZGwiLCJpbmplY3QiLCJyZWR1Y2VSaWdodCIsImZvbGRyIiwiZGV0ZWN0IiwiZmluZEtleSIsInNlbGVjdCIsIm5lZ2F0ZSIsInNvbWUiLCJhbnkiLCJpbmNsdWRlcyIsImluY2x1ZGUiLCJ2YWx1ZXMiLCJpbnZva2UiLCJwbHVjayIsIndoZXJlIiwibWluIiwic2h1ZmZsZSIsInNhbXBsZSIsInJhbmRvbSIsImNsb25lIiwic29ydEJ5IiwiY3JpdGVyaWEiLCJncm91cEJ5IiwiaW5kZXhCeSIsImNvdW50QnkiLCJTIiwidG9BcnJheSIsImlzU3RyaW5nIiwibWF0Y2giLCJzaXplIiwicGFydGl0aW9uIiwiZmlyc3QiLCJoZWFkIiwidGFrZSIsImluaXRpYWwiLCJsYXN0IiwicmVzdCIsInRhaWwiLCJkcm9wIiwiY29tcGFjdCIsIkJvb2xlYW4iLCJNIiwiaXNBcmd1bWVudHMiLCJmbGF0dGVuIiwid2l0aG91dCIsImRpZmZlcmVuY2UiLCJ1bmlxIiwidW5pcXVlIiwiaXNCb29sZWFuIiwidW5pb24iLCJpbnRlcnNlY3Rpb24iLCJ1bnppcCIsInppcCIsIkYiLCJmaW5kTGFzdEluZGV4Iiwic29ydGVkSW5kZXgiLCJFIiwicmFuZ2UiLCJjZWlsIiwiY2h1bmsiLCJOIiwiYmluZCIsInBhcnRpYWwiLCJwbGFjZWhvbGRlciIsImJpbmRBbGwiLCJtZW1vaXplIiwiY2FjaGUiLCJkZWxheSIsInNldFRpbWVvdXQiLCJkZWZlciIsInRocm90dGxlIiwibGVhZGluZyIsIm5vdyIsImNsZWFyVGltZW91dCIsInRyYWlsaW5nIiwiY2FuY2VsIiwiZGVib3VuY2UiLCJ3cmFwIiwiY29tcG9zZSIsImFmdGVyIiwiYmVmb3JlIiwicmVzdEFyZ3VtZW50cyIsIkkiLCJwcm9wZXJ0eUlzRW51bWVyYWJsZSIsIlQiLCJCIiwiY29uc3RydWN0b3IiLCJhbGxLZXlzIiwibWFwT2JqZWN0IiwicGFpcnMiLCJpbnZlcnQiLCJmdW5jdGlvbnMiLCJtZXRob2RzIiwiUiIsImV4dGVuZE93biIsImFzc2lnbiIsInEiLCJLIiwieiIsIm9taXQiLCJTdHJpbmciLCJkZWZhdWx0cyIsInRhcCIsImlzTWF0Y2giLCJ2YWx1ZU9mIiwicG9wIiwiaXNFcXVhbCIsImlzRW1wdHkiLCJEIiwiY2hpbGROb2RlcyIsIkludDhBcnJheSIsImlzRmluaXRlIiwiaXNTeW1ib2wiLCJpc051bGwiLCJpc1VuZGVmaW5lZCIsImhhcyIsIm5vQ29uZmxpY3QiLCJjb25zdGFudCIsIm5vb3AiLCJwcm9wZXJ0eU9mIiwibWF0Y2hlcyIsInRpbWVzIiwiRGF0ZSIsImdldFRpbWUiLCJMIiwiUCIsIlciLCJlc2NhcGUiLCJ1bmVzY2FwZSIsIkMiLCJ1bmlxdWVJZCIsInRlbXBsYXRlU2V0dGluZ3MiLCJldmFsdWF0ZSIsImludGVycG9sYXRlIiwiSiIsIlUiLCJWIiwiJCIsInRlbXBsYXRlIiwidmFyaWFibGUiLCJGdW5jdGlvbiIsImNoYWluIiwiX2NoYWluIiwiRyIsIm1peGluIiwidG9KU09OIiwiZGVmaW5lIiwiaXNSdG1wIiwiaXNXZWJSVEMiLCJpc0hscyIsImlzRGFzaCIsImdldFNjcmlwdFBhdGgiLCJzY3JpcHROYW1lIiwic2NyaXB0cyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwic3JjIiwiX19WRVJTSU9OX18iXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGdCQUFRLG9CQUFvQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQSxpREFBeUMsczRCQUFzNEI7QUFDLzZCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUFiLEVBQWdCQSxJQUFJK3lCLFFBQVE5eUIsTUFBNUIsRUFBb0NELEdBQXBDLEVBQXlDO0FBQ3JDLFlBQU1pekIsTUFBTUYsUUFBUS95QixDQUFSLEVBQVdpekIsR0FBdkI7QUFDQSxZQUFJQSxHQUFKLEVBQVM7QUFDTCxnQkFBTWowQixRQUFRaTBCLElBQUlsVSxXQUFKLENBQWdCLE1BQU0rVCxVQUF0QixDQUFkO0FBQ0EsZ0JBQUk5ekIsU0FBUyxDQUFiLEVBQWdCO0FBQ1osdUJBQU9pMEIsSUFBSXplLE1BQUosQ0FBVyxDQUFYLEVBQWN4VixRQUFRLENBQXRCLENBQVA7QUFDSDtBQUNKO0FBQ0o7QUFDRCxXQUFPLEVBQVA7QUFDSCxDQVpNLEM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSlA7OztBQUdPLElBQU1YLDRCQUFVNjBCLHFCQUFoQixDIiwiZmlsZSI6Im92ZW5wbGF5ZXIuc2RrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG5cblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0fTtcblxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJvdmVucGxheWVyLnNka1wiOiAwXG4gXHR9O1xuXG5cblxuIFx0Ly8gc2NyaXB0IHBhdGggZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIGpzb25wU2NyaXB0U3JjKGNodW5rSWQpIHtcbiBcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyAoe1wib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1fm92ZW5wbGF5ZX4yZWMxOTNhY1wiOlwib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1fm92ZW5wbGF5ZX4yZWMxOTNhY1wiLFwib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1fm92ZW5wbGF5ZX43YWZkNjhjZlwiOlwib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1fm92ZW5wbGF5ZX43YWZkNjhjZlwiLFwib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1XCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1XCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLldlYlJUQ1Byb3ZpZGVyXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLldlYlJUQ1Byb3ZpZGVyXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLlJ0bXBQcm92aWRlclwiOlwib3ZlbnBsYXllci5wcm92aWRlci5SdG1wUHJvdmlkZXJcIixcInNtaXBhcnNlclwiOlwic21pcGFyc2VyXCIsXCJ2ZW5kb3JzfmRvd25sb2FkZXJcIjpcInZlbmRvcnN+ZG93bmxvYWRlclwiLFwiZG93bmxvYWRlclwiOlwiZG93bmxvYWRlclwiLFwidnR0cGFyc2VyXCI6XCJ2dHRwYXJzZXJcIn1bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuanNcIlxuIFx0fVxuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lID0gZnVuY3Rpb24gcmVxdWlyZUVuc3VyZShjaHVua0lkKSB7XG4gXHRcdHZhciBwcm9taXNlcyA9IFtdO1xuXG5cbiBcdFx0Ly8gSlNPTlAgY2h1bmsgbG9hZGluZyBmb3IgamF2YXNjcmlwdFxuXG4gXHRcdHZhciBpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgeyAvLyAwIG1lYW5zIFwiYWxyZWFkeSBpbnN0YWxsZWRcIi5cblxuIFx0XHRcdC8vIGEgUHJvbWlzZSBtZWFucyBcImN1cnJlbnRseSBsb2FkaW5nXCIuXG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSk7XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdC8vIHNldHVwIFByb21pc2UgaW4gY2h1bmsgY2FjaGVcbiBcdFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IFtyZXNvbHZlLCByZWplY3RdO1xuIFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSA9IHByb21pc2UpO1xuXG4gXHRcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG4gXHRcdFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gXHRcdFx0XHR2YXIgb25TY3JpcHRDb21wbGV0ZTtcblxuIFx0XHRcdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuIFx0XHRcdFx0c2NyaXB0LnRpbWVvdXQgPSAxMjA7XG4gXHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuIFx0XHRcdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzY3JpcHQuc3JjID0ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCk7XG5cbiBcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiBcdFx0XHRcdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuIFx0XHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuIFx0XHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG4gXHRcdFx0XHRcdHZhciBjaHVuayA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0XHRcdFx0aWYoY2h1bmsgIT09IDApIHtcbiBcdFx0XHRcdFx0XHRpZihjaHVuaykge1xuIFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcbiBcdFx0XHRcdFx0XHRcdHZhciByZWFsU3JjID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmM7XG4gXHRcdFx0XHRcdFx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoJ0xvYWRpbmcgY2h1bmsgJyArIGNodW5rSWQgKyAnIGZhaWxlZC5cXG4oJyArIGVycm9yVHlwZSArICc6ICcgKyByZWFsU3JjICsgJyknKTtcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnR5cGUgPSBlcnJvclR5cGU7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcbiBcdFx0XHRcdFx0XHRcdGNodW5rWzFdKGVycm9yKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gdW5kZWZpbmVkO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9O1xuIFx0XHRcdFx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gXHRcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUoeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pO1xuIFx0XHRcdFx0fSwgMTIwMDAwKTtcbiBcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG9uU2NyaXB0Q29tcGxldGU7XG4gXHRcdFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gXHR9O1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIG9uIGVycm9yIGZ1bmN0aW9uIGZvciBhc3luYyBsb2FkaW5nXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm9lID0gZnVuY3Rpb24oZXJyKSB7IGNvbnNvbGUuZXJyb3IoZXJyKTsgdGhyb3cgZXJyOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2pzL292ZW5wbGF5ZXIuc2RrLmpzXCIpO1xuIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0aWYgKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XG5cdFx0bW9kdWxlLnBhdGhzID0gW107XG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XG5cdFx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xuXHR9XG5cdHJldHVybiBtb2R1bGU7XG59O1xuIiwiaW1wb3J0IENhcHRpb25NYW5hZ2VyIGZyb20gXCJhcGkvY2FwdGlvbi9NYW5hZ2VyXCI7XG5pbXBvcnQgQ29uZmlndXJhdG9yIGZyb20gXCJhcGkvQ29uZmlndXJhdG9yXCI7XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJhcGkvRXZlbnRFbWl0dGVyXCI7XG5pbXBvcnQgTGF6eUNvbW1hbmRFeGVjdXRvciBmcm9tIFwiYXBpL0xhenlDb21tYW5kRXhlY3V0b3JcIjtcbmltcG9ydCBNZWRpYU1hbmFnZXIgZnJvbSBcImFwaS9tZWRpYS9NYW5hZ2VyXCI7XG5pbXBvcnQgUGxheWxpc3RNYW5hZ2VyIGZyb20gXCJhcGkvcGxheWxpc3QvTWFuYWdlclwiO1xuaW1wb3J0IFByb3ZpZGVyQ29udHJvbGxlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL0NvbnRyb2xsZXJcIjtcbmltcG9ydCB7UkVBRFksIEVSUk9SUywgRVJST1IsIENPTlRFTlRfVElNRV9NT0RFX0NIQU5HRUQsIElOSVRfVU5LTldPTl9FUlJPUiwgSU5JVF9VTlNVUFBPUlRfRVJST1IsIERFU1RST1ksIE5FVFdPUktfVU5TVEFCTEVELFxuICAgIFBMQVlFUl9GSUxFX0VSUk9SLCBQUk9WSURFUl9EQVNILCBQUk9WSURFUl9ITFMsIFBST1ZJREVSX1dFQlJUQywgUFJPVklERVJfSFRNTDUsIFBST1ZJREVSX1JUTVAsIEFMTF9QTEFZTElTVF9FTkRFRH0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcbmltcG9ydCB7dmVyc2lvbn0gZnJvbSAndmVyc2lvbic7XG5pbXBvcnQge0FwaVJ0bXBFeHBhbnNpb259IGZyb20gJ2FwaS9BcGlFeHBhbnNpb25zJztcbmltcG9ydCB7YW5hbFVzZXJBZ2VudH0gZnJvbSBcInV0aWxzL2Jyb3dzZXJcIjtcbmltcG9ydCBMQSQgZnJvbSAndXRpbHMvbGlrZUEkJztcblxuLyoqXG4gKiBAYnJpZWYgICBUaGlzIG9iamVjdCBjb25uZWN0cyBVSSB0byB0aGUgcHJvdmlkZXIuXG4gKiBAcGFyYW0gICB7b2JqZWN0fSAgICBjb250YWluZXIgIGRvbSBlbGVtZW50XG4gKlxuICogKi9cblxuY29uc3QgQXBpID0gZnVuY3Rpb24oY29udGFpbmVyKXtcbiAgICBjb25zdCB0aGF0ID0ge307XG4gICAgRXZlbnRFbWl0dGVyKHRoYXQpO1xuXG5cbiAgICBjb25zb2xlLmxvZyhcIltbT3ZlblBsYXllcl1dIHYuXCIrIHZlcnNpb24pO1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSBsb2FkZWQuXCIpO1xuXG4gICAgbGV0IHBsYXlsaXN0TWFuYWdlciA9IFBsYXlsaXN0TWFuYWdlcih0aGF0KTtcbiAgICBsZXQgcHJvdmlkZXJDb250cm9sbGVyID0gUHJvdmlkZXJDb250cm9sbGVyKCk7XG4gICAgbGV0IHVzZXJBZ2VudE9iamVjdCA9IGFuYWxVc2VyQWdlbnQoKTtcbiAgICBsZXQgbWVkaWFNYW5hZ2VyID0gTWVkaWFNYW5hZ2VyKGNvbnRhaW5lciwgdXNlckFnZW50T2JqZWN0KTtcbiAgICBsZXQgY3VycmVudFByb3ZpZGVyID0gXCJcIjtcbiAgICBsZXQgcGxheWVyQ29uZmlnID0gXCJcIjtcbiAgICBsZXQgbGF6eVF1ZXVlID0gXCJcIjtcbiAgICBsZXQgY2FwdGlvbk1hbmFnZXIgPSBcIlwiO1xuXG5cbiAgICBjb25zdCBydW5OZXh0UGxheWxpc3QgPSBmdW5jdGlvbihpbmRleCl7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcInJ1bk5leHRQbGF5bGlzdFwiKTtcbiAgICAgICAgbGV0IG5leHRQbGF5bGlzdEluZGV4ID0gaW5kZXg7IC8vIHx8IHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50UGxheWxpc3RJbmRleCgpICsgMTtcbiAgICAgICAgbGV0IHBsYXlsaXN0ID0gcGxheWxpc3RNYW5hZ2VyLmdldFBsYXlsaXN0KCk7XG4gICAgICAgIGxldCBoYXNOZXh0UGxheWxpc3QgPSBwbGF5bGlzdFtuZXh0UGxheWxpc3RJbmRleF0/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgLy9pbml0IHNvdXJjZSBpbmRleFxuICAgICAgICBwbGF5ZXJDb25maWcuc2V0U291cmNlSW5kZXgoMCk7XG4gICAgICAgIGlmKGhhc05leHRQbGF5bGlzdCl7XG4gICAgICAgICAgICAvL3RoYXQucGF1c2UoKTtcbiAgICAgICAgICAgIGxhenlRdWV1ZSA9IExhenlDb21tYW5kRXhlY3V0b3IodGhhdCwgWydwbGF5Jywnc2VlaycsJ3N0b3AnXSk7XG4gICAgICAgICAgICBwbGF5bGlzdE1hbmFnZXIuc2V0Q3VycmVudFBsYXlsaXN0KG5leHRQbGF5bGlzdEluZGV4KTtcbiAgICAgICAgICAgIGluaXRQcm92aWRlcigpO1xuXG5cbiAgICAgICAgICAgIGlmKCFwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSl7XG4gICAgICAgICAgICAgICAgLy9Bbnl3YXkgbmV4dHBsYXlsaXN0IHJ1bnMgYXV0b1N0YXJ0IS5cbiAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAvL0FsbCBQbGF5bGlzdCBFbmRlZC5cbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihBTExfUExBWUxJU1RfRU5ERUQsIG51bGwpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBpbml0UHJvdmlkZXIgPSBmdW5jdGlvbihsYXN0UGxheVBvc2l0aW9uKXtcbiAgICAgICAgY29uc3QgcGlja1F1YWxpdHlGcm9tU291cmNlID0gKHNvdXJjZXMpID0+e1xuICAgICAgICAgICAgdmFyIHF1YWxpdHkgPSAwO1xuICAgICAgICAgICAgaWYgKHNvdXJjZXMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZXNbaV0uZGVmYXVsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVhbGl0eSA9IGk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRTb3VyY2VJbmRleCgpID09PSBpICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLyppZiAocGxheWVyQ29uZmlnLmdldFNvdXJjZUxhYmVsKCkgJiYgc291cmNlc1tpXS5sYWJlbCA9PT0gcGxheWVyQ29uZmlnLmdldFNvdXJjZUxhYmVsKCkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgICAgICAgICAgfSovXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHF1YWxpdHk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHByb3ZpZGVyQ29udHJvbGxlci5sb2FkUHJvdmlkZXJzKHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50UGxheUxpc3QoKSkudGhlbihQcm92aWRlcnMgPT4ge1xuICAgICAgICAgICAgaWYoUHJvdmlkZXJzLmxlbmd0aCA8IDEpe1xuICAgICAgICAgICAgICAgIHRocm93IEVSUk9SU1tJTklUX1VOU1VQUE9SVF9FUlJPUl07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGN1cnJlbnRQcm92aWRlcil7XG4gICAgICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoY2FwdGlvbk1hbmFnZXIpe1xuICAgICAgICAgICAgICAgIGNhcHRpb25NYW5hZ2VyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICBjYXB0aW9uTWFuYWdlciA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXB0aW9uTWFuYWdlciA9IENhcHRpb25NYW5hZ2VyKHRoYXQsIHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50UGxheWxpc3RJbmRleCgpKTtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGluaXQoKSBjYXB0aW9uc1wiKTtcblxuICAgICAgICAgICAgbGV0IGN1cnJlbnRTb3VyY2VJbmRleCA9IHBpY2tRdWFsaXR5RnJvbVNvdXJjZShwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKSk7XG4gICAgICAgICAgICBsZXQgcHJvdmlkZXJOYW1lID0gUHJvdmlkZXJzW2N1cnJlbnRTb3VyY2VJbmRleF1bXCJuYW1lXCJdO1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaW5pdCgpIHByb3ZpZGVyXCIsIHByb3ZpZGVyTmFtZSk7XG4gICAgICAgICAgICAvL0luaXQgUHJvdmlkZXIuXG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIgPSAgUHJvdmlkZXJzW2N1cnJlbnRTb3VyY2VJbmRleF0ucHJvdmlkZXIoXG4gICAgICAgICAgICAgICAgbWVkaWFNYW5hZ2VyLmNyZWF0ZU1lZGlhKHByb3ZpZGVyTmFtZSwgcGxheWVyQ29uZmlnKSxcbiAgICAgICAgICAgICAgICBwbGF5ZXJDb25maWcsXG4gICAgICAgICAgICAgICAgcGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRBZFRhZygpXG4gICAgICAgICAgICApO1xuXG5cblxuICAgICAgICAgICAgaWYocHJvdmlkZXJOYW1lID09PSBQUk9WSURFUl9SVE1QKXtcbiAgICAgICAgICAgICAgICAvL0lmIHByb3ZpZGVyIHR5cGUgaXMgUlRNUCwgd2UgYWNjZXB0cyBSdG1wRXhwYW5zaW9uLlxuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhhdCwgQXBpUnRtcEV4cGFuc2lvbihjdXJyZW50UHJvdmlkZXIpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9UaGlzIHBhc3NlcyB0aGUgZXZlbnQgY3JlYXRlZCBieSB0aGUgUHJvdmlkZXIgdG8gQVBJLlxuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLm9uKFwiYWxsXCIsIGZ1bmN0aW9uKG5hbWUsIGRhdGEpe1xuXG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKG5hbWUsIGRhdGEpO1xuXG4gICAgICAgICAgICAgICAgaWYobmFtZSA9PT0gXCJjb21wbGV0ZVwiKXtcbiAgICAgICAgICAgICAgICAgICAgcnVuTmV4dFBsYXlsaXN0KHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50UGxheWxpc3RJbmRleCgpICsgMSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9BdXRvIHN3aXRjaGluZyBuZXh0IHNvdXJjZSB3aGVuIHBsYXllciBsb2FkIGZhaWxlZCBieSBhbWlzcyBzb3VyY2UuXG4gICAgICAgICAgICAgICAgLy9kYXRhLmNvZGUgPT09IFBMQVlFUl9GSUxFX0VSUk9SXG4gICAgICAgICAgICAgICAgaWYoIG5hbWUgPT09IEVSUk9SIHx8IG5hbWUgPT09IE5FVFdPUktfVU5TVEFCTEVEICl7XG4gICAgICAgICAgICAgICAgICAgIC8vbGV0IGN1cnJlbnRTb3VyY2VJbmRleCA9IHRoYXQuZ2V0Q3VycmVudFNvdXJjZSgpO1xuICAgICAgICAgICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuZ2V0U291cmNlSW5kZXgoKSsxIDwgdGhhdC5nZXRTb3VyY2VzKCkubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcyBzZXF1ZW50aWFsIGhhcyBhdmFpbGFibGUgc291cmNlLlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wYXVzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRDdXJyZW50U291cmNlKHBsYXllckNvbmZpZy5nZXRTb3VyY2VJbmRleCgpKzEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSkudGhlbigoKT0+e1xuXG4gICAgICAgICAgICAvL3Byb3ZpZGVyJ3MgcHJlbG9hZCgpIGhhdmUgdG8gbWFkZSBQcm9taXNlLiBDdXogaXQgb3ZlcmNvbWVzICdmbGFzaCBsb2FkaW5nIHRpbWluZyBwcm9ibGVtJy5cbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5wcmVsb2FkKHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50U291cmNlcygpLCBsYXN0UGxheVBvc2l0aW9uKS50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFJFQURZKTtcblxuICAgICAgICAgICAgICAgIGxhenlRdWV1ZS5mbHVzaCgpO1xuICAgICAgICAgICAgICAgIC8vVGhpcyBpcyBubyByZWFzb24gdG8gZXhpc3QgYW55bW9yZS5cbiAgICAgICAgICAgICAgICBsYXp5UXVldWUuZGVzdHJveSgpO1xuXG4gICAgICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBsYXp5UXVldWUub2ZmKCk7XG4gICAgICAgICAgICAgICAgaWYoZXJyb3IgJiYgZXJyb3IuY29kZSAmJiBFUlJPUlNbZXJyb3IuY29kZV0pe1xuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoRVJST1IsIEVSUk9SU1tlcnJvci5jb2RlXSk7XG4gICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTW0lOSVRfVU5LTldPTl9FUlJPUl07XG4gICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoRVJST1IsIHRlbXBFcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgLy9JTklUIEVSUk9SXG4gICAgICAgICAgICBpZihlcnJvciAmJiBlcnJvci5jb2RlICYmIEVSUk9SU1tlcnJvci5jb2RlXSl7XG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKEVSUk9SLCBFUlJPUlNbZXJyb3IuY29kZV0pO1xuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlNbSU5JVF9VTktOV09OX0VSUk9SXTtcbiAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoRVJST1IsIHRlbXBFcnJvcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8veHh4IDogSWYgeW91IGluaXQgZW1wdHkgc291cmNlcy4gKEkgdGhpbmsgdGhpcyBpcyBzdHJhbmdlIGNhc2UuKVxuICAgICAgICAgICAgLy9UaGlzIHdvcmtzIGZvciB0aGlzIGNhc2UuXG4gICAgICAgICAgICAvL3BsYXllciA9IE92ZW5QbGF5ZXIuY3JlYXRlKFwiZWxJZFwiLCB7fSk7XG4gICAgICAgICAgICAvL3BsYXllci5sb2FkKHNvcnVjZXMpO1xuICAgICAgICAgICAgbGF6eVF1ZXVlLm9mZigpO1xuICAgICAgICAgICAgLy9sYXp5UXVldWUucmVtb3ZlQW5kRXhjdXRlT25jZShcImxvYWRcIik7XG4gICAgICAgIH0pO1xuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIEFQSSDstIjquLDtmZQg7ZWo7IiYXG4gICAgICogaW5pdFxuICAgICAqIEBwYXJhbSAgICAgIHtvYmplY3R9IG9wdGlvbnMgcGxheWVyIGluaXRpYWwgb3B0aW9uIHZhbHVlLlxuICAgICAqIEByZXR1cm5zXG4gICAgICoqL1xuICAgIHRoYXQuaW5pdCA9IChvcHRpb25zKSA9PntcbiAgICAgICAgLy9JdCBjb2xsZWN0cyB0aGUgY29tbWFuZHMgYW5kIGV4ZWN1dGVzIHRoZW0gYXQgdGhlIHRpbWUgd2hlbiB0aGV5IGFyZSBleGVjdXRhYmxlLlxuICAgICAgICBsYXp5UXVldWUgPSBMYXp5Q29tbWFuZEV4ZWN1dG9yKHRoYXQsIFtcbiAgICAgICAgICAgICdsb2FkJywncGxheScsJ3BhdXNlJywnc2VlaycsJ3N0b3AnLCAnZ2V0RHVyYXRpb24nLCAnZ2V0UG9zaXRpb24nLCAnZ2V0Vm9sdW1lJ1xuICAgICAgICAgICAgLCAnZ2V0TXV0ZScsICdnZXRCdWZmZXInLCAnZ2V0U3RhdGUnICwgJ2dldFF1YWxpdHlMZXZlbHMnXG4gICAgICAgIF0pO1xuICAgICAgICBvcHRpb25zLm1lZGlhQ29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICBvcHRpb25zLmJyb3dzZXIgPSB1c2VyQWdlbnRPYmplY3Q7XG4gICAgICAgIHBsYXllckNvbmZpZyA9IENvbmZpZ3VyYXRvcihvcHRpb25zLCB0aGF0KTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaW5pdCgpXCIpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpbml0KCkgY29uZmlnIDogXCIsIHBsYXllckNvbmZpZyk7XG5cbiAgICAgICAgcGxheWxpc3RNYW5hZ2VyLmluaXRQbGF5bGlzdChwbGF5ZXJDb25maWcuZ2V0UGxheWxpc3QoKSk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGluaXQoKSBzb3VyY2VzIDogXCIgLCBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKSk7XG5cbiAgICAgICAgaW5pdFByb3ZpZGVyKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldFByb3ZpZGVyTmFtZSA9ICgpID0+IHtcbiAgICAgICAgaWYoY3VycmVudFByb3ZpZGVyKXtcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0TmFtZSgpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgdGhhdC5nZXRDb25maWcgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldENvbmZpZygpXCIsIHBsYXllckNvbmZpZy5nZXRDb25maWcoKSk7XG4gICAgICAgIHJldHVybiBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldEJyb3dzZXIgPSAoKSA9PiB7XG5cbiAgICAgICAgcmV0dXJuIHBsYXllckNvbmZpZy5nZXRCcm93c2VyKCk7XG4gICAgfTtcbiAgICB0aGF0LnNldFRpbWVjb2RlTW9kZSA9IChpc1Nob3cpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRUaW1lY29kZU1vZGUoKVwiLCBpc1Nob3cpO1xuICAgICAgICBwbGF5ZXJDb25maWcuc2V0VGltZWNvZGVNb2RlKGlzU2hvdyk7XG4gICAgfTtcbiAgICB0aGF0LmlzVGltZWNvZGVNb2RlID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpc1RpbWVjb2RlTW9kZSgpXCIpO1xuICAgICAgICByZXR1cm4gcGxheWVyQ29uZmlnLmlzVGltZWNvZGVNb2RlKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldEZyYW1lcmF0ZSA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0RnJhbWVyYXRlKClcIik7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0RnJhbWVyYXRlKCk7XG4gICAgfTtcbiAgICB0aGF0LnNlZWtGcmFtZSA9IChmcmFtZUNvdW50KSA9PiB7XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2Vla0ZyYW1lKClcIiwgZnJhbWVDb3VudCk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2Vla0ZyYW1lKGZyYW1lQ291bnQpO1xuICAgIH07XG5cbiAgICB0aGF0LmdldER1cmF0aW9uID0gKCkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldER1cmF0aW9uKClcIiwgY3VycmVudFByb3ZpZGVyLmdldER1cmF0aW9uKCkpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldER1cmF0aW9uKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldFBvc2l0aW9uID0gKCkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0UG9zaXRpb24oKVwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0UG9zaXRpb24oKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0UG9zaXRpb24oKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Vm9sdW1lID0gKCkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Vm9sdW1lKClcIiwgY3VycmVudFByb3ZpZGVyLmdldFZvbHVtZSgpKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRWb2x1bWUoKTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Vm9sdW1lID0gKHZvbHVtZSkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Vm9sdW1lKCkgXCIgKyB2b2x1bWUpO1xuICAgICAgICBjdXJyZW50UHJvdmlkZXIuc2V0Vm9sdW1lKHZvbHVtZSk7XG4gICAgfTtcbiAgICB0aGF0LnNldE11dGUgPSAoc3RhdGUpID0+IHtcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldE11dGUoKSBcIiArIHN0YXRlKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5zZXRNdXRlKHN0YXRlKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0TXV0ZSA9ICgpID0+IHtcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldE11dGUoKSBcIiArIGN1cnJlbnRQcm92aWRlci5nZXRNdXRlKCkpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldE11dGUoKTtcbiAgICB9O1xuICAgIHRoYXQubG9hZCA9IChwbGF5bGlzdCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBsb2FkKCkgXCIsIHBsYXlsaXN0KTtcbiAgICAgICAgbGF6eVF1ZXVlID0gTGF6eUNvbW1hbmRFeGVjdXRvcih0aGF0LCBbJ3BsYXknLCdzZWVrJywnc3RvcCddKTtcblxuICAgICAgICBpZihwbGF5bGlzdCl7XG4gICAgICAgICAgICBpZihjdXJyZW50UHJvdmlkZXIpe1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5zZXRDdXJyZW50UXVhbGl0eSgwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBsYXlsaXN0TWFuYWdlci5pbml0UGxheWxpc3QocGxheWxpc3QpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbml0UHJvdmlkZXIoKTtcblxuICAgIH07XG4gICAgdGhhdC5wbGF5ID0gKCkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHBsYXkoKSBcIik7XG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5wbGF5KCk7XG4gICAgfVxuICAgIHRoYXQucGF1c2UgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBwYXVzZSgpIFwiKTtcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnBhdXNlKCk7XG4gICAgfTtcbiAgICB0aGF0LnNlZWsgPSAocG9zaXRpb24pID0+IHtcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNlZWsoKSBcIisgcG9zaXRpb24pO1xuICAgICAgICBjdXJyZW50UHJvdmlkZXIuc2Vlayhwb3NpdGlvbik7XG4gICAgfTtcbiAgICB0aGF0LnNldFBsYXliYWNrUmF0ZSA9IChwbGF5YmFja1JhdGUpID0+e1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0UGxheWJhY2tSYXRlKCkgXCIsIHBsYXliYWNrUmF0ZSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2V0UGxheWJhY2tSYXRlKHBsYXllckNvbmZpZy5zZXRQbGF5YmFja1JhdGUocGxheWJhY2tSYXRlKSk7XG4gICAgfTtcbiAgICB0aGF0LmdldFBsYXliYWNrUmF0ZSA9ICgpID0+e1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0UGxheWJhY2tSYXRlKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRQbGF5YmFja1JhdGUoKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0UGxheWJhY2tSYXRlKCk7XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0UGxheWxpc3QgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFBsYXlsaXN0KCkgXCIsIHBsYXlsaXN0TWFuYWdlci5nZXRQbGF5bGlzdCgpKTtcbiAgICAgICAgcmV0dXJuIHBsYXlsaXN0TWFuYWdlci5nZXRQbGF5bGlzdCgpO1xuICAgIH07XG4gICAgdGhhdC5nZXRDdXJyZW50UGxheWxpc3QgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEN1cnJlbnRQbGF5bGlzdCgpIFwiLCBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFBsYXlsaXN0SW5kZXgoKSk7XG4gICAgICAgIHJldHVybiBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFBsYXlsaXN0SW5kZXgoKTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Q3VycmVudFBsYXlsaXN0ID0gKGluZGV4KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEN1cnJlbnRQbGF5bGlzdCgpIFwiLCBpbmRleCk7XG4gICAgICAgIHJ1bk5leHRQbGF5bGlzdChpbmRleCk7XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0U291cmNlcyA9ICgpID0+IHtcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFNvdXJjZXMoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldFNvdXJjZXMoKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0U291cmNlcygpO1xuICAgIH07XG4gICAgdGhhdC5nZXRDdXJyZW50U291cmNlID0gKCkgPT57XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRDdXJyZW50U291cmNlKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRDdXJyZW50U291cmNlKCkpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldEN1cnJlbnRTb3VyY2UoKTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Q3VycmVudFNvdXJjZSA9IChpbmRleCkgPT57XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRDdXJyZW50U291cmNlKCkgXCIsIGluZGV4KTtcblxuICAgICAgICBsZXQgc291cmNlcyA9IGN1cnJlbnRQcm92aWRlci5nZXRTb3VyY2VzKCk7XG4gICAgICAgIGxldCBjdXJyZW50U291cmNlID0gc291cmNlc1tjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFNvdXJjZSgpXTtcbiAgICAgICAgbGV0IG5ld1NvdXJjZSA9IHNvdXJjZXNbaW5kZXhdO1xuICAgICAgICBsZXQgbGFzdFBsYXlQb3NpdGlvbiA9IGN1cnJlbnRQcm92aWRlci5nZXRQb3NpdGlvbigpO1xuICAgICAgICBsZXQgaXNTYW1lUHJvdmlkZXIgPSBwcm92aWRlckNvbnRyb2xsZXIuaXNTYW1lUHJvdmlkZXIoY3VycmVudFNvdXJjZSwgbmV3U291cmNlKTtcbiAgICAgICAgLy8gcHJvdmlkZXIuc2VyQ3VycmVudFF1YWxpdHkgLT4gcGxheWVyQ29uZmlnIHNldHRpbmcgLT4gbG9hZFxuICAgICAgICBsZXQgcmVzdWx0U291cmNlSW5kZXggPSBjdXJyZW50UHJvdmlkZXIuc2V0Q3VycmVudFNvdXJjZShpbmRleCwgaXNTYW1lUHJvdmlkZXIpO1xuXG4gICAgICAgIGlmKCFuZXdTb3VyY2Upe1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRDdXJyZW50UXVhbGl0eSgpIGlzU2FtZVByb3ZpZGVyXCIsIGlzU2FtZVByb3ZpZGVyKTtcblxuICAgICAgICBpZighaXNTYW1lUHJvdmlkZXIpe1xuICAgICAgICAgICAgbGF6eVF1ZXVlID0gTGF6eUNvbW1hbmRFeGVjdXRvcih0aGF0LCBbJ3BsYXknLCdzZWVrJ10pO1xuICAgICAgICAgICAgaW5pdFByb3ZpZGVyKGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdFNvdXJjZUluZGV4O1xuICAgIH07XG5cblxuXG4gICAgdGhhdC5nZXRRdWFsaXR5TGV2ZWxzID0gKCkgPT57XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRRdWFsaXR5TGV2ZWxzKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRRdWFsaXR5TGV2ZWxzKCkpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFF1YWxpdHlMZXZlbHMoKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Q3VycmVudFF1YWxpdHkgPSAoKSA9PntcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEN1cnJlbnRRdWFsaXR5KCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRDdXJyZW50UXVhbGl0eSgpKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRDdXJyZW50UXVhbGl0eSgpO1xuICAgIH07XG4gICAgdGhhdC5zZXRDdXJyZW50UXVhbGl0eSA9IChxdWFsaXR5SW5kZXgpID0+e1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Q3VycmVudFF1YWxpdHkoKSBcIiwgcXVhbGl0eUluZGV4KTtcblxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLnNldEN1cnJlbnRRdWFsaXR5KHF1YWxpdHlJbmRleCk7XG4gICAgfTtcbiAgICB0aGF0LmlzQXV0b1F1YWxpdHkgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpc0F1dG9RdWFsaXR5KClcIik7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuaXNBdXRvUXVhbGl0eSgpO1xuICAgIH07XG4gICAgdGhhdC5zZXRBdXRvUXVhbGl0eSA9IChpc0F1dG8pID0+IHtcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEF1dG9RdWFsaXR5KCkgXCIsIGlzQXV0byk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2V0QXV0b1F1YWxpdHkoaXNBdXRvKTtcbiAgICB9XG5cbiAgICB0aGF0LmdldENhcHRpb25MaXN0ID0gKCkgPT4ge1xuICAgICAgICBpZighY2FwdGlvbk1hbmFnZXIpe3JldHVybiBudWxsO31cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Q2FwdGlvbkxpc3QoKSBcIiwgY2FwdGlvbk1hbmFnZXIuZ2V0Q2FwdGlvbkxpc3QoKSk7XG4gICAgICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5nZXRDYXB0aW9uTGlzdCgpO1xuICAgIH1cbiAgICB0aGF0LmdldEN1cnJlbnRDYXB0aW9uID0gKCkgPT4ge1xuICAgICAgICBpZighY2FwdGlvbk1hbmFnZXIpe3JldHVybiBudWxsO31cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Q3VycmVudENhcHRpb24oKSBcIiwgY2FwdGlvbk1hbmFnZXIuZ2V0Q3VycmVudENhcHRpb24oKSk7XG4gICAgICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5nZXRDdXJyZW50Q2FwdGlvbigpO1xuICAgIH1cbiAgICB0aGF0LnNldEN1cnJlbnRDYXB0aW9uID0gKGluZGV4KSA9PiB7XG4gICAgICAgIGlmKCFjYXB0aW9uTWFuYWdlcil7cmV0dXJuIG51bGw7fVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRDdXJyZW50Q2FwdGlvbigpIFwiLCBpbmRleCk7XG4gICAgICAgIGNhcHRpb25NYW5hZ2VyLnNldEN1cnJlbnRDYXB0aW9uKGluZGV4KTtcbiAgICB9XG4gICAgdGhhdC5hZGRDYXB0aW9uID0gKHRyYWNrKSA9PiB7XG4gICAgICAgIGlmKCFjYXB0aW9uTWFuYWdlcil7cmV0dXJuIG51bGw7fVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBhZGRDYXB0aW9uKCkgXCIpXG4gICAgICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5hZGRDYXB0aW9uKHRyYWNrKTtcbiAgICB9XG4gICAgdGhhdC5yZW1vdmVDYXB0aW9uID0gKGluZGV4KSA9PiB7XG4gICAgICAgIGlmKCFjYXB0aW9uTWFuYWdlcil7cmV0dXJuIG51bGw7fVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiByZW1vdmVDYXB0aW9uKCkgXCIsIGluZGV4KVxuICAgICAgICByZXR1cm4gY2FwdGlvbk1hbmFnZXIucmVtb3ZlQ2FwdGlvbihpbmRleCk7XG4gICAgfVxuXG4gICAgdGhhdC5nZXRCdWZmZXIgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0QnVmZmVyKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRCdWZmZXIoKSk7XG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5nZXRCdWZmZXIoKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0U3RhdGUgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0U3RhdGUoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldFN0YXRlKCkpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFN0YXRlKCk7XG4gICAgfTtcbiAgICB0aGF0LnN0b3AgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzdG9wKCkgXCIpO1xuICAgICAgICBjdXJyZW50UHJvdmlkZXIuc3RvcCgpO1xuICAgIH07XG4gICAgdGhhdC5yZW1vdmUgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiByZW1vdmUoKSBcIik7XG4gICAgICAgIGxhenlRdWV1ZS5kZXN0cm95KCk7XG4gICAgICAgIGlmKGNhcHRpb25NYW5hZ2VyKXtcbiAgICAgICAgICAgIGNhcHRpb25NYW5hZ2VyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIGNhcHRpb25NYW5hZ2VyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGN1cnJlbnRQcm92aWRlcil7XG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG1lZGlhTWFuYWdlcil7XG4gICAgICAgICAgICBtZWRpYU1hbmFnZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgbWVkaWFNYW5hZ2VyID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBwcm92aWRlckNvbnRyb2xsZXIgPSBudWxsO1xuICAgICAgICBwbGF5bGlzdE1hbmFnZXIgPSBudWxsO1xuICAgICAgICBwbGF5ZXJDb25maWcgPSBudWxsO1xuICAgICAgICBsYXp5UXVldWUgPSBudWxsO1xuXG4gICAgICAgIHRoYXQudHJpZ2dlcihERVNUUk9ZKTtcbiAgICAgICAgdGhhdC5vZmYoKTtcblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiByZW1vdmUoKSAtIGxhenlRdWV1ZSwgY3VycmVudFByb3ZpZGVyLCBwcm92aWRlckNvbnRyb2xsZXIsIHBsYXlsaXN0TWFuYWdlciwgcGxheWVyQ29uZmlnLCBhcGkgZXZlbnQgZGVzdHJvZWQuIFwiKTtcbiAgICAgICAgT3ZlblBsYXllclNESy5yZW1vdmVQbGF5ZXIodGhhdC5nZXRDb250YWluZXJJZCgpKTtcbiAgICAgICAgaWYoT3ZlblBsYXllclNESy5nZXRQbGF5ZXJMaXN0KCkubGVuZ3RoICA9PT0gMCl7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJPdmVuUGxheWVyU0RLLnBsYXllckxpc3RcIiwgIE92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyTGlzdCgpKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0LmdldFZlcnNpb24gPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBcInYuXCIrdmVyc2lvbjtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgQXBpO1xuXG5cbiIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDguIDI0Li5cbiAqL1xuXG5leHBvcnQgY29uc3QgQXBpUnRtcEV4cGFuc2lvbiA9IGZ1bmN0aW9uKGN1cnJlbnRQcm92aWRlcil7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZXh0ZXJuYWxDYWxsYmFja0NyZWVwIDogKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgaWYocmVzdWx0Lm5hbWUgJiYgcmVzdWx0LmRhdGEpe1xuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIudHJpZ2dlckV2ZW50RnJvbUV4dGVybmFsKHJlc3VsdC5uYW1lLCByZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59O1xuIiwiaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcblxuaW1wb3J0IHtcbiAgICBDT05URU5UX1RJTUVfTU9ERV9DSEFOR0VEXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5cbi8qKlxuICogQGJyaWVmICAgVGhpcyBpbml0aWFsaXplcyB0aGUgaW5wdXQgb3B0aW9ucy5cbiAqIEBwYXJhbSAgIG9wdGlvbnNcbiAqXG4gKiAqL1xuY29uc3QgQ29uZmlndXJhdG9yID0gZnVuY3Rpb24ob3B0aW9ucywgcHJvdmlkZXIpe1xuICAgIC8vc291cmNlcywgdHJhY2tzLFxuXG5cbiAgICBjb25zdCBjb21wb3NlU291cmNlT3B0aW9ucyA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xuICAgICAgICBjb25zdCBEZWZhdWx0cyA9IHtcbiAgICAgICAgICAgIG1lZGlhQ29udGFpbmVyIDogXCJcIixcbiAgICAgICAgICAgIHBsYXliYWNrUmF0ZXM6IFsyLCAxLjUsIDEsIDAuNSwgMC4yNV0sXG4gICAgICAgICAgICBwbGF5YmFja1JhdGU6IDEsXG4gICAgICAgICAgICBtdXRlOiBmYWxzZSxcbiAgICAgICAgICAgIHZvbHVtZTogMTAwLFxuICAgICAgICAgICAgbG9vcCA6IGZhbHNlLFxuICAgICAgICAgICAgY29udHJvbHMgOiB0cnVlLFxuICAgICAgICAgICAgYXV0b1N0YXJ0IDogZmFsc2UsXG4gICAgICAgICAgICB0aW1lY29kZSA6IHRydWUsXG4gICAgICAgICAgICBzb3VyY2VJbmRleCA6IDAsXG4gICAgICAgICAgICBicm93c2VyIDogXCJcIixcbiAgICAgICAgICAgIGhpZGVQbGF5bGlzdEljb24gOiBmYWxzZSxcbiAgICAgICAgICAgIHJ0bXBCdWZmZXJUaW1lIDogMSxcbiAgICAgICAgICAgIHJ0bXBCdWZmZXJUaW1lTWF4IDogMyxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgc2VyaWFsaXplID0gZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycgJiYgdmFsLmxlbmd0aCA8IDYpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsb3dlcmNhc2VWYWwgPSB2YWwudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICBpZiAobG93ZXJjYXNlVmFsID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChsb3dlcmNhc2VWYWwgPT09ICdmYWxzZScpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKE51bWJlcih2YWwpKSAmJiAhaXNOYU4ocGFyc2VGbG9hdCh2YWwpKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gTnVtYmVyKHZhbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkZXNlcmlhbGl6ZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSAnaWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3B0aW9uc1trZXldID0gc2VyaWFsaXplKG9wdGlvbnNba2V5XSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRlc2VyaWFsaXplKG9wdGlvbnMpO1xuICAgICAgICBsZXQgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgRGVmYXVsdHMsIG9wdGlvbnMpO1xuXG4gICAgICAgIGxldCBwbGF5YmFja1JhdGVzID0gY29uZmlnLnBsYXliYWNrUmF0ZXM7XG5cbiAgICAgICAgcGxheWJhY2tSYXRlcyA9IHBsYXliYWNrUmF0ZXMuZmlsdGVyKHJhdGUgPT4gXy5pc051bWJlcihyYXRlKSAmJiByYXRlID49IDAuMjUgJiYgcmF0ZSA8PSA0KS5tYXAocmF0ZSA9PiBNYXRoLnJvdW5kKHJhdGUgKiA0KSAvIDQpO1xuXG4gICAgICAgIGlmIChwbGF5YmFja1JhdGVzLmluZGV4T2YoMSkgPCAwKSB7XG4gICAgICAgICAgICBwbGF5YmFja1JhdGVzLnB1c2goMSk7XG4gICAgICAgIH1cbiAgICAgICAgcGxheWJhY2tSYXRlcy5zb3J0KCk7XG5cbiAgICAgICAgY29uZmlnLnBsYXliYWNrUmF0ZXMgPSBwbGF5YmFja1JhdGVzO1xuXG4gICAgICAgIGNvbmZpZy5ydG1wQnVmZmVyVGltZSA9IGNvbmZpZy5ydG1wQnVmZmVyVGltZSA+IDEwID8gMTAgOiBjb25maWcucnRtcEJ1ZmZlclRpbWU7XG4gICAgICAgIGNvbmZpZy5ydG1wQnVmZmVyVGltZU1heCA9IGNvbmZpZy5ydG1wQnVmZmVyVGltZU1heCA+IDUwID8gNTAgOiBjb25maWcucnRtcEJ1ZmZlclRpbWVNYXg7XG5cblxuICAgICAgICBpZiAoY29uZmlnLnBsYXliYWNrUmF0ZXMuaW5kZXhPZihjb25maWcucGxheWJhY2tSYXRlKSA8IDApIHtcbiAgICAgICAgICAgIGNvbmZpZy5wbGF5YmFja1JhdGUgPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29uZmlnUGxheWxpc3QgPSBjb25maWcucGxheWxpc3Q7XG4gICAgICAgIGlmICghY29uZmlnUGxheWxpc3QpIHtcbiAgICAgICAgICAgIGNvbnN0IG9iaiA9IF8ucGljayhjb25maWcsIFtcbiAgICAgICAgICAgICAgICAndGl0bGUnLFxuICAgICAgICAgICAgICAgICdkZXNjcmlwdGlvbicsXG4gICAgICAgICAgICAgICAgJ3R5cGUnLFxuICAgICAgICAgICAgICAgICdpbWFnZScsXG4gICAgICAgICAgICAgICAgJ2ZpbGUnLFxuICAgICAgICAgICAgICAgICdzb3VyY2VzJyxcbiAgICAgICAgICAgICAgICAndHJhY2tzJyxcbiAgICAgICAgICAgICAgICAnaG9zdCcsXG4gICAgICAgICAgICAgICAgJ2FwcGxpY2F0aW9uJyxcbiAgICAgICAgICAgICAgICAnc3RyZWFtJyxcbiAgICAgICAgICAgICAgICAnYWRUYWdVcmwnXG4gICAgICAgICAgICBdKTtcblxuICAgICAgICAgICAgY29uZmlnLnBsYXlsaXN0ID0gWyBvYmogXTtcbiAgICAgICAgfSBlbHNlIGlmIChfLmlzQXJyYXkoY29uZmlnUGxheWxpc3QucGxheWxpc3QpKSB7XG4gICAgICAgICAgICBjb25maWcuZmVlZERhdGEgPSBjb25maWdQbGF5bGlzdDtcbiAgICAgICAgICAgIGNvbmZpZy5wbGF5bGlzdCA9IGNvbmZpZ1BsYXlsaXN0LnBsYXlsaXN0O1xuICAgICAgICB9XG5cbiAgICAgICAgZGVsZXRlIGNvbmZpZy5kdXJhdGlvbjtcbiAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICB9O1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNvbmZpZ3VyYXRvciBsb2FkZWQuXCIsIG9wdGlvbnMpO1xuICAgIGxldCBzcGVjID0gY29tcG9zZVNvdXJjZU9wdGlvbnMob3B0aW9ucyk7XG5cblxuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICB0aGF0LmdldENvbmZpZyA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWM7XG4gICAgfTtcbiAgICB0aGF0LnNldENvbmZpZyA9IChjb25maWcsIHZhbHVlKSA9PiB7XG4gICAgICAgIHNwZWNbY29uZmlnXSA9IHZhbHVlO1xuICAgIH07XG5cbiAgICB0aGF0LmdldENvbnRhaW5lciA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMubWVkaWFDb250YWluZXI7XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0UGxheWJhY2tSYXRlID0oKT0+e1xuICAgICAgICByZXR1cm4gc3BlYy5wbGF5YmFja1JhdGU7XG4gICAgfTtcbiAgICB0aGF0LnNldFBsYXliYWNrUmF0ZSA9KHBsYXliYWNrUmF0ZSk9PntcbiAgICAgICAgc3BlYy5wbGF5YmFja1JhdGUgPSBwbGF5YmFja1JhdGU7XG4gICAgICAgIHJldHVybiBwbGF5YmFja1JhdGU7XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0UXVhbGl0eUxhYmVsID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5xdWFsaXR5TGFiZWw7XG4gICAgfTtcbiAgICB0aGF0LnNldFF1YWxpdHlMYWJlbCA9IChuZXdMYWJlbCkgPT4ge1xuICAgICAgICBzcGVjLnF1YWxpdHlMYWJlbCA9IG5ld0xhYmVsO1xuICAgIH07XG5cbiAgICAvKnRoYXQuZ2V0U291cmNlTGFiZWwgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLnNvdXJjZUxhYmVsO1xuICAgIH07XG4gICAgdGhhdC5zZXRTb3VyY2VMYWJlbCA9IChuZXdMYWJlbCkgPT4ge1xuICAgICAgICBzcGVjLnNvdXJjZUxhYmVsID0gbmV3TGFiZWw7XG4gICAgfTsqL1xuXG4gICAgdGhhdC5nZXRTb3VyY2VJbmRleCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuc291cmNlSW5kZXg7XG4gICAgfTtcbiAgICB0aGF0LnNldFNvdXJjZUluZGV4ID0gKGluZGV4KSA9PiB7XG4gICAgICAgIHNwZWMuc291cmNlSW5kZXggPSBpbmRleDtcbiAgICB9O1xuICAgIHRoYXQuc2V0VGltZWNvZGVNb2RlID0gKHRpbWVjb2RlKSA9PiB7XG4gICAgICAgIGlmKHNwZWMudGltZWNvZGUgIT09IHRpbWVjb2RlKXtcbiAgICAgICAgICAgIHNwZWMudGltZWNvZGUgPSB0aW1lY29kZTtcbiAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9USU1FX01PREVfQ0hBTkdFRCwgdGltZWNvZGUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LmlzVGltZWNvZGVNb2RlID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy50aW1lY29kZTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0UnRtcEJ1ZmZlclRpbWUgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLnJ0bXBCdWZmZXJUaW1lO1xuICAgIH07XG4gICAgdGhhdC5nZXRSdG1wQnVmZmVyVGltZU1heCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMucnRtcEJ1ZmZlclRpbWVNYXg7XG4gICAgfTtcblxuICAgIHRoYXQuaXNNdXRlID0gKCkgPT57XG4gICAgICAgIHJldHVybiBzcGVjLm11dGU7XG4gICAgfTtcbiAgICB0aGF0LmdldFZvbHVtZSA9ICgpID0+e1xuICAgICAgICByZXR1cm4gc3BlYy52b2x1bWU7XG4gICAgfTtcbiAgICB0aGF0LmlzTG9vcCA9ICgpID0+e1xuICAgICAgICByZXR1cm4gc3BlYy5sb29wO1xuICAgIH07XG4gICAgdGhhdC5pc0F1dG9TdGFydCA9ICgpID0+e1xuICAgICAgICByZXR1cm4gc3BlYy5hdXRvU3RhcnQ7XG4gICAgfTtcbiAgICB0aGF0LmlzQ29udHJvbHMgPSAoKSA9PntcbiAgICAgICAgcmV0dXJuIHNwZWMuY29udHJvbHM7XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0UGxheWJhY2tSYXRlcyA9KCk9PntcbiAgICAgICAgcmV0dXJuIHNwZWMucGxheWJhY2tSYXRlcztcbiAgICB9O1xuICAgIHRoYXQuZ2V0QnJvd3NlciA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuYnJvd3NlcjtcbiAgICB9O1xuXG4gICAgdGhhdC5nZXRQbGF5bGlzdCA9KCk9PntcbiAgICAgICAgcmV0dXJuIHNwZWMucGxheWxpc3Q7XG4gICAgfTtcbiAgICB0aGF0LnNldFBsYXlsaXN0ID0ocGxheWxpc3QpPT57XG4gICAgICAgIGlmKF8uaXNBcnJheShwbGF5bGlzdCkpe1xuICAgICAgICAgICAgc3BlYy5wbGF5bGlzdCA9IHBsYXlsaXN0O1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHNwZWMucGxheWxpc3QgPSBbcGxheWxpc3RdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcGVjLnBsYXlsaXN0O1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbmZpZ3VyYXRvcjtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDMuLlxuICovXG5cbi8qKlxuICogQGJyaWVmICAgVGhpcyBtb2R1bGUgcHJvdmlkZSBjdXN0b20gZXZlbnRzLlxuICogQHBhcmFtICAgb2JqZWN0ICAgIEFuIG9iamVjdCB0aGF0IHJlcXVpcmVzIGN1c3RvbSBldmVudHMuXG4gKlxuICogKi9cblxuY29uc3QgRXZlbnRFbWl0dGVyID0gZnVuY3Rpb24ob2JqZWN0KXtcbiAgICBsZXQgdGhhdCA9IG9iamVjdDtcbiAgICBsZXQgX2V2ZW50cyA9W107XG5cbiAgICBjb25zdCB0cmlnZ2VyRXZlbnRzID0gZnVuY3Rpb24oZXZlbnRzLCBhcmdzLCBjb250ZXh0KXtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBsZXQgbGVuZ3RoID0gZXZlbnRzLmxlbmd0aDtcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgbGVuZ3RoOyBpICsrKXtcbiAgICAgICAgICAgIGxldCBldmVudCA9IGV2ZW50c1tpXTtcbiAgICAgICAgICAgIGV2ZW50Lmxpc3RlbmVyLmFwcGx5KCAoIGV2ZW50LmNvbnRleHQgfHwgY29udGV4dCApLCBhcmdzKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0Lm9uID0gZnVuY3Rpb24obmFtZSwgbGlzdGVuZXIsIGNvbnRleHQpe1xuICAgICAgICAoX2V2ZW50c1tuYW1lXSB8fCAoX2V2ZW50c1tuYW1lXT1bXSkgKS5wdXNoKHsgbGlzdGVuZXI6IGxpc3RlbmVyICAsIGNvbnRleHQgOiBjb250ZXh0fSk7XG4gICAgICAgIHJldHVybiB0aGF0O1xuICAgIH07XG4gICAgdGhhdC50cmlnZ2VyID0gZnVuY3Rpb24obmFtZSl7XG4gICAgICAgIGlmKCFfZXZlbnRzKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICBjb25zdCBldmVudHMgPSBfZXZlbnRzW25hbWVdO1xuICAgICAgICBjb25zdCBhbGxFdmVudHMgPSBfZXZlbnRzLmFsbDtcblxuICAgICAgICBpZihldmVudHMpe1xuICAgICAgICAgICAgdHJpZ2dlckV2ZW50cyhldmVudHMsIGFyZ3MsIHRoYXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmKGFsbEV2ZW50cyl7XG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnRzKGFsbEV2ZW50cywgYXJndW1lbnRzLCB0aGF0KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhhdC5vZmYgPSBmdW5jdGlvbihuYW1lLCBsaXN0ZW5lciwgY29udGV4dCl7XG4gICAgICAgIGlmKCFfZXZlbnRzKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghbmFtZSAmJiAhbGlzdGVuZXIgJiYgIWNvbnRleHQpICB7XG4gICAgICAgICAgICBfZXZlbnRzID0gW107XG4gICAgICAgICAgICByZXR1cm4gdGhhdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5hbWVzID0gbmFtZSA/IFtuYW1lXSA6IE9iamVjdC5rZXlzKF9ldmVudHMpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gbmFtZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBuYW1lID0gbmFtZXNbaV07XG4gICAgICAgICAgICBjb25zdCBldmVudHMgPSBfZXZlbnRzW25hbWVdO1xuICAgICAgICAgICAgaWYgKGV2ZW50cykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJldGFpbiA9IF9ldmVudHNbbmFtZV0gPSBbXTtcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIgIHx8IGNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDAsIGsgPSBldmVudHMubGVuZ3RoOyBqIDwgazsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBldmVudCA9IGV2ZW50c1tqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgobGlzdGVuZXIgJiYgbGlzdGVuZXIgIT09IGV2ZW50Lmxpc3RlbmVyICYmIGxpc3RlbmVyICE9PSBldmVudC5saXN0ZW5lci5saXN0ZW5lciAgJiYgbGlzdGVuZXIgIT09IGV2ZW50Lmxpc3RlbmVyLl9saXN0ZW5lcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fChjb250ZXh0ICYmIGNvbnRleHQgIT09IGV2ZW50LmNvbnRleHQpXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXRhaW4ucHVzaChldmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFyZXRhaW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBfZXZlbnRzW25hbWVdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhhdDtcbiAgICB9O1xuICAgIHRoYXQub25jZSA9IGZ1bmN0aW9uKG5hbWUsIGxpc3RlbmVyLCBjb250ZXh0KXtcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgY29uc3Qgb25jZUNhbGxiYWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoY291bnQrKykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoYXQub2ZmKG5hbWUsIG9uY2VDYWxsYmFjayk7XG4gICAgICAgICAgICBsaXN0ZW5lci5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgICAgICBvbmNlQ2FsbGJhY2suX2xpc3RlbmVyID0gbGlzdGVuZXI7XG4gICAgICAgIHJldHVybiB0aGF0Lm9uKG5hbWUsIG9uY2VDYWxsYmFjaywgY29udGV4dCk7XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBFdmVudEVtaXR0ZXI7XG4iLCJpbXBvcnQgXyBmcm9tICd1dGlscy91bmRlcnNjb3JlJztcblxuLyoqXG4gKiBAYnJpZWYgICBUaGlzIGV4ZWN1dGVzIHRoZSBpbnB1dCBjb21tYW5kcyBhdCBhIHNwZWNpZmljIHBvaW50IGluIHRpbWUuXG4gKiBAcGFyYW0gICBpbnN0YW5jZVxuICogQHBhcmFtICAgcXVldWVkQ29tbWFuZHNcbiAqICovXG5jb25zdCBMYXp5Q29tbWFuZEV4ZWN1dG9yID0gZnVuY3Rpb24gKGluc3RhbmNlLCBxdWV1ZWRDb21tYW5kcykge1xuICAgIGxldCBjb21tYW5kUXVldWUgPSBbXTtcbiAgICBsZXQgdW5kZWNvcmF0ZWRNZXRob2RzID0ge307XG4gICAgbGV0IGV4ZWN1dGVNb2RlID0gZmFsc2U7XG4gICAgbGV0IHRoYXQgPSB7fTtcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIGxvYWRlZC5cIik7XG4gICAgcXVldWVkQ29tbWFuZHMuZm9yRWFjaCgoY29tbWFuZCkgPT4ge1xuICAgICAgICBjb25zdCBtZXRob2QgPSBpbnN0YW5jZVtjb21tYW5kXTtcbiAgICAgICAgdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdID0gbWV0aG9kIHx8IGZ1bmN0aW9uKCl7fTtcblxuICAgICAgICBpbnN0YW5jZVtjb21tYW5kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc3QgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgICAgICAgICAgIGlmICghZXhlY3V0ZU1vZGUpIHtcbiAgICAgICAgICAgICAgICAvL2NvbW1hbmRRdWV1ZS5wdXNoKHsgY29tbWFuZCwgYXJncyB9KTtcbiAgICAgICAgICAgICAgICB0aGF0LmFkZFF1ZXVlKGNvbW1hbmQsIGFyZ3MpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGV4ZWN1dGVRdWV1ZWRDb21tYW5kcygpO1xuICAgICAgICAgICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kLmFwcGx5KHRoYXQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KTtcbiAgICB2YXIgZXhlY3V0ZVF1ZXVlZENvbW1hbmRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB3aGlsZSAoY29tbWFuZFF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHsgY29tbWFuZCwgYXJncyB9ID0gY29tbWFuZFF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICAodW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdIHx8IGluc3RhbmNlW2NvbW1hbmRdKS5hcHBseShpbnN0YW5jZSwgYXJncyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGF0LnNldEV4ZWN1dGVNb2RlID0gKG1vZGUpID0+IHtcbiAgICAgICAgZXhlY3V0ZU1vZGUgPSBtb2RlO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogc2V0RXhlY3V0ZU1vZGUoKVwiLCBtb2RlKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0VW5kZWNvcmF0ZWRNZXRob2RzID0gZnVuY3Rpb24oKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGdldFVuZGVjb3JhdGVkTWV0aG9kcygpXCIsIHVuZGVjb3JhdGVkTWV0aG9kcyk7XG4gICAgICAgIHJldHVybiB1bmRlY29yYXRlZE1ldGhvZHM7XG4gICAgfVxuICAgIHRoYXQuZ2V0UXVldWUgPSBmdW5jdGlvbigpe1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZ2V0UXVldWUoKVwiLCBnZXRRdWV1ZSk7XG4gICAgICAgIHJldHVybiBjb21tYW5kUXVldWU7XG4gICAgfVxuICAgIHRoYXQuYWRkUXVldWUgPSBmdW5jdGlvbihjb21tYW5kLCBhcmdzKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGFkZFF1ZXVlKClcIiwgY29tbWFuZCwgYXJncyk7XG4gICAgICAgIGNvbW1hbmRRdWV1ZS5wdXNoKHsgY29tbWFuZCwgYXJncyB9KTtcbiAgICB9XG5cbiAgICB0aGF0LmZsdXNoID0gZnVuY3Rpb24oKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGZsdXNoKClcIik7XG4gICAgICAgIGV4ZWN1dGVRdWV1ZWRDb21tYW5kcygpO1xuICAgIH07XG4gICAgdGhhdC5lbXB0eSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZW1wdHkoKVwiKTtcbiAgICAgICAgY29tbWFuZFF1ZXVlLmxlbmd0aCA9IDA7XG4gICAgfTtcbiAgICB0aGF0Lm9mZiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogb2ZmKClcIik7XG4gICAgICAgIHF1ZXVlZENvbW1hbmRzLmZvckVhY2goKGNvbW1hbmQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1ldGhvZCA9IHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXTtcbiAgICAgICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVtjb21tYW5kXSA9IG1ldGhvZDtcbiAgICAgICAgICAgICAgICBkZWxldGUgdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG5cbiAgICAvL1J1biBvbmNlIGF0IHRoZSBlbmRcbiAgICB0aGF0LnJlbW92ZUFuZEV4Y3V0ZU9uY2UgPSBmdW5jdGlvbihjb21tYW5kXyl7XG4gICAgICAgIGxldCBjb21tYW5kUXVldWVJdGVtID0gXy5maW5kV2hlcmUoY29tbWFuZFF1ZXVlLCB7Y29tbWFuZCA6IGNvbW1hbmRffSk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiByZW1vdmVBbmRFeGN1dGVPbmNlKClcIiwgY29tbWFuZF8pO1xuICAgICAgICBjb21tYW5kUXVldWUuc3BsaWNlKF8uZmluZEluZGV4KGNvbW1hbmRRdWV1ZSwge2NvbW1hbmQgOiBjb21tYW5kX30pLCAxKTtcblxuICAgICAgICBjb25zdCBtZXRob2QgPSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF9dO1xuICAgICAgICBpZiAobWV0aG9kKSB7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJyZW1vdmVDb21tYW5kKClcIik7XG4gICAgICAgICAgICBpZihjb21tYW5kUXVldWVJdGVtKXtcbiAgICAgICAgICAgICAgICAobWV0aG9kfHwgaW5zdGFuY2VbY29tbWFuZF9dKS5hcHBseShpbnN0YW5jZSwgY29tbWFuZFF1ZXVlSXRlbS5hcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluc3RhbmNlW2NvbW1hbmRfXSA9IG1ldGhvZDtcbiAgICAgICAgICAgIGRlbGV0ZSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF9dO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoYXQuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZGVzdHJveSgpXCIpO1xuICAgICAgICB0aGF0Lm9mZigpO1xuICAgICAgICB0aGF0LmVtcHR5KCk7XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTGF6eUNvbW1hbmRFeGVjdXRvcjsiLCJpbXBvcnQge2lzUnRtcCwgaXNXZWJSVEMsIGlzRGFzaCwgaXNIbHN9IGZyb20gXCJ1dGlscy92YWxpZGF0b3JcIjtcbmltcG9ydCB7YW5hbFVzZXJBZ2VudH0gZnJvbSBcInV0aWxzL2Jyb3dzZXJcIjtcbi8qKlxuICogQGJyaWVmICAgVGhpcyBmaW5kcyB0aGUgcHJvdmlkZXIgdGhhdCBtYXRjaGVzIHRoZSBpbnB1dCBzb3VyY2UuXG4gKiBAcGFyYW1cbiAqICovXG5cbmNvbnN0IFN1cHBvcnRDaGVja2VyID0gZnVuY3Rpb24oKXtcbiAgICBjb25zdCB0aGF0ID0ge307XG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU3VwcG9ydENoZWNrZXIgbG9hZGVkLlwiKTtcbiAgICBsZXQgdXNlckFnZW50T2JqZWN0ID0gYW5hbFVzZXJBZ2VudCgpO1xuXG4gICAgY29uc3Qgc3VwcG9ydExpc3QgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdodG1sNScsXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBNaW1lVHlwZXMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGFhYzogJ2F1ZGlvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIG1wNDogJ3ZpZGVvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIGY0djogJ3ZpZGVvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIG00djogJ3ZpZGVvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIG1vdjogJ3ZpZGVvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIG1wMzogJ2F1ZGlvL21wZWcnLFxuICAgICAgICAgICAgICAgICAgICBtcGVnOiAnYXVkaW8vbXBlZycsXG4gICAgICAgICAgICAgICAgICAgIG9ndjogJ3ZpZGVvL29nZycsXG4gICAgICAgICAgICAgICAgICAgIG9nZzogJ3ZpZGVvL29nZycsXG4gICAgICAgICAgICAgICAgICAgIG9nYTogJ3ZpZGVvL29nZycsXG4gICAgICAgICAgICAgICAgICAgIHZvcmJpczogJ3ZpZGVvL29nZycsXG4gICAgICAgICAgICAgICAgICAgIHdlYm06ICd2aWRlby93ZWJtJyxcbiAgICAgICAgICAgICAgICAgICAgZjRhOiAndmlkZW8vYWFjJyxcbiAgICAgICAgICAgICAgICAgICAgbTN1ODogJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyxcbiAgICAgICAgICAgICAgICAgICAgbTN1OiAnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnLFxuICAgICAgICAgICAgICAgICAgICBobHM6ICdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCdcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgY29uc3QgdmlkZW8gPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKVxuICAgICAgICAgICAgICAgIH0oKTtcbiAgICAgICAgICAgICAgICBpZiAoIXZpZGVvLmNhblBsYXlUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc291cmNlLnR5cGU7XG5cbiAgICAgICAgICAgICAgICBpZighdHlwZSl7cmV0dXJuIGZhbHNlO31cbiAgICAgICAgICAgICAgICBjb25zdCBtaW1lVHlwZSA9IHNvdXJjZS5taW1lVHlwZSB8fCBNaW1lVHlwZXNbdHlwZV07XG5cbiAgICAgICAgICAgICAgICBpZihpc0hscyhmaWxlLCB0eXBlKSAmJiB1c2VyQWdlbnRPYmplY3QuYnJvd3NlciA9PT0gXCJNaWNyb3NvZnQgRWRnZVwiKXtcbiAgICAgICAgICAgICAgICAgICAgLy9FZGdlIHN1cHBvcnRzIGhscyBuYXRpdmUgYnV0IHRoYXQncyBzdWNrcy5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChpc1J0bXAoZmlsZSwgdHlwZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKGlzV2ViUlRDKGZpbGUsIHR5cGUpKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghbWltZVR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAhIXZpZGVvLmNhblBsYXlUeXBlKG1pbWVUeXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ3dlYnJ0YycsXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2aWRlbyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpXG4gICAgICAgICAgICAgICAgfSgpO1xuICAgICAgICAgICAgICAgIGlmICghdmlkZW8uY2FuUGxheVR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaXNSdG1wKGZpbGUsIHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gc291cmNlLmZpbGU7XG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNvdXJjZS50eXBlO1xuXG4gICAgICAgICAgICAgICAgaWYoaXNXZWJSVEMoZmlsZSwgdHlwZSkpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ2Rhc2gnLFxuICAgICAgICAgICAgY2hlY2tTdXBwb3J0OiBmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IHNvdXJjZS5maWxlO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNvdXJjZS50eXBlO1xuICAgICAgICAgICAgICAgIGlmIChpc1J0bXAoZmlsZSwgdHlwZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKCB3aW5kb3cuTWVkaWFTb3VyY2UgfHwgd2luZG93LldlYktpdE1lZGlhU291cmNlICkgPT09IFwiZnVuY3Rpb25cIiAmJiBpc0Rhc2goZmlsZSwgdHlwZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdobHMnLFxuICAgICAgICAgICAgY2hlY2tTdXBwb3J0OiBmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmlkZW8gPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKVxuICAgICAgICAgICAgICAgIH0oKTtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gc291cmNlLmZpbGU7XG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNvdXJjZS50eXBlO1xuICAgICAgICAgICAgICAgIGlmIChpc1J0bXAoZmlsZSwgdHlwZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vdGhpcyBtZXRob2QgZnJvbSBobHMuanNcbiAgICAgICAgICAgICAgICBjb25zdCBpc0hsc1N1cHBvcnQgPSAoKSA9PntcbiAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGdldE1lZGlhU291cmNlKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5NZWRpYVNvdXJjZSB8fCB3aW5kb3cuV2ViS2l0TWVkaWFTb3VyY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIG1lZGlhU291cmNlID0gZ2V0TWVkaWFTb3VyY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNvdXJjZUJ1ZmZlciA9IHdpbmRvdy5Tb3VyY2VCdWZmZXIgfHwgd2luZG93LldlYktpdFNvdXJjZUJ1ZmZlcjtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlzVHlwZVN1cHBvcnRlZCA9IG1lZGlhU291cmNlICYmIHR5cGVvZiBtZWRpYVNvdXJjZS5pc1R5cGVTdXBwb3J0ZWQgPT09ICdmdW5jdGlvbicgJiYgbWVkaWFTb3VyY2UuaXNUeXBlU3VwcG9ydGVkKCd2aWRlby9tcDQ7IGNvZGVjcz1cImF2YzEuNDJFMDFFLG1wNGEuNDAuMlwiJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgU291cmNlQnVmZmVyIGlzIGV4cG9zZWQgZW5zdXJlIGl0cyBBUEkgaXMgdmFsaWRcbiAgICAgICAgICAgICAgICAgICAgLy8gc2FmYXJpIGFuZCBvbGQgdmVyc2lvbiBvZiBDaHJvbWUgZG9lIG5vdCBleHBvc2UgU291cmNlQnVmZmVyIGdsb2JhbGx5IHNvIGNoZWNraW5nIFNvdXJjZUJ1ZmZlci5wcm90b3R5cGUgaXMgaW1wb3NzaWJsZVxuICAgICAgICAgICAgICAgICAgICB2YXIgc291cmNlQnVmZmVyVmFsaWRBUEkgPSAhc291cmNlQnVmZmVyIHx8IHNvdXJjZUJ1ZmZlci5wcm90b3R5cGUgJiYgdHlwZW9mIHNvdXJjZUJ1ZmZlci5wcm90b3R5cGUuYXBwZW5kQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBzb3VyY2VCdWZmZXIucHJvdG90eXBlLnJlbW92ZSA9PT0gJ2Z1bmN0aW9uJztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEhaXNUeXBlU3VwcG9ydGVkICYmICEhc291cmNlQnVmZmVyVmFsaWRBUEk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvL1JlbW92ZSB0aGlzICchIXZpZGVvLmNhblBsYXlUeXBlKCdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcpJyBpZiB5b3Ugd2FudCB0byB1c2UgaGxzanMuXG4gICAgICAgICAgICAgICAgLy9ZZXMgSSBuZWVkIGhsc2pzLiAyMDE5LTA2LTEyICYmICEhdmlkZW8uY2FuUGxheVR5cGUoJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzSGxzU3VwcG9ydCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAncnRtcCcsXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gc291cmNlLmZpbGU7XG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNvdXJjZS50eXBlO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHRlc3RGbGFzaCgpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VwcG9ydCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vSUUgb25seVxuICAgICAgICAgICAgICAgICAgICBpZihcIkFjdGl2ZVhPYmplY3RcIiBpbiB3aW5kb3cpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1cHBvcnQgPSAhIShuZXcgQWN0aXZlWE9iamVjdChcIlNob2Nrd2F2ZUZsYXNoLlNob2Nrd2F2ZUZsYXNoXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1jYXRjaChlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdXBwb3J0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vVzNDLCBiZXR0ZXIgc3VwcG9ydCBpbiBsZWdhY3kgYnJvd3NlclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzdXBwb3J0ID0gISFuYXZpZ2F0b3IubWltZVR5cGVzWydhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaCddO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3VwcG9ydDtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBjaGVja1N1cHBvcnQoKXtcbiAgICAgICAgICAgICAgICAgICAgaWYodXNlckFnZW50T2JqZWN0LmJyb3dzZXIgPT09IFwiTWljcm9zb2Z0IEVkZ2VcIiB8fCB1c2VyQWdlbnRPYmplY3Qub3MgPT09IFwiQW5kcm9pZFwiIHx8IHVzZXJBZ2VudE9iamVjdC5vcyA9PT0gXCJpT1NcIiAgfHwgdXNlckFnZW50T2JqZWN0LmJyb3dzZXIgPT09IFwiU2FmYXJpXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpc1J0bXAoZmlsZSwgdHlwZSkgJiYgdGVzdEZsYXNoKCkgJiYgY2hlY2tTdXBwb3J0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICBdO1xuXG4gICAgdGhhdC5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UgPSAoc29ydWNlXykgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJTdXBwb3J0Q2hlY2tlciA6IGZpbmRQcm92aWRlck5hbWVCeVNvdXJjZSgpXCIsIHNvcnVjZV8pO1xuICAgICAgICBjb25zdCBzb3VyY2UgPSAoc29ydWNlXyA9PT0gT2JqZWN0KHNvcnVjZV8pKSA/IHNvcnVjZV8gOiB7fTtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHN1cHBvcnRMaXN0Lmxlbmd0aDsgaSArKyl7XG4gICAgICAgICAgICBpZihzdXBwb3J0TGlzdFtpXS5jaGVja1N1cHBvcnQoc291cmNlKSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1cHBvcnRMaXN0W2ldLm5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQuZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0ID0gKHBsYXlsaXN0SXRlbSkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJTdXBwb3J0Q2hlY2tlciA6IGZpbmRQcm92aWRlck5hbWVzQnlQbGF5bGlzdCgpXCIsIHBsYXlsaXN0SXRlbSk7XG4gICAgICAgIGxldCBzdXBwb3J0TmFtZXMgPSBbXTtcbiAgICAgICAgLypmb3IgKGxldCBpID0gcGxheWxpc3RfLmxlbmd0aDsgaS0tOykge1xuXG5cbiAgICAgICAgfSovXG4gICAgICAgIGNvbnN0IGl0ZW0gPSBwbGF5bGlzdEl0ZW07XG5cbiAgICAgICAgaWYoaXRlbSAmJiBpdGVtLnNvdXJjZXMpe1xuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IGl0ZW0uc291cmNlcy5sZW5ndGg7IGogKyspe1xuICAgICAgICAgICAgICAgIGxldCBzb3VyY2UgPSBpdGVtLnNvdXJjZXNbal07XG4gICAgICAgICAgICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdXBwb3J0ZWQgPSB0aGF0LmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShzb3VyY2UpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3VwcG9ydGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdXBwb3J0TmFtZXMucHVzaChzdXBwb3J0ZWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gc3VwcG9ydE5hbWVzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFN1cHBvcnRDaGVja2VyO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gNC4uXG4gKi9cbmltcG9ydCBTcnRQYXJzZXIgZnJvbSBcImFwaS9jYXB0aW9uL3BhcnNlci9TcnRQYXJzZXJcIjtcbmltcG9ydCBWVFRDdWUgZnJvbSBcInV0aWxzL2NhcHRpb25zL3Z0dEN1ZVwiO1xuLy9pbXBvcnQgUmVxdWVzdCBmcm9tIFwidXRpbHMvZG93bmxvYWRlclwiO1xuXG5jb25zdCBMb2FkZXIgPSBmdW5jdGlvbigpe1xuICAgIGNvbnN0IHRoYXQgPSB7fTtcblxuICAgIGNvbnN0IGNvbnZlcnRUb1ZUVEN1ZXMgPSBmdW5jdGlvbiAoY3Vlcykge1xuICAgICAgICByZXR1cm4gY3Vlcy5tYXAoY3VlID0+IG5ldyBWVFRDdWUoY3VlLnN0YXJ0LCBjdWUuZW5kLCBjdWUudGV4dCkpO1xuICAgIH1cbiAgICAvL2xhbmd1YWdlIDogZm9yIFNNSSBmb3JtYXQuXG4gICAgdGhhdC5sb2FkID0gKHRyYWNrLCBsYW5ndWFnZSwgc3VjY2Vzc0NhbGxiYWNrLCBlcnJvckNhbGxiYWNrKSA9PiB7XG5cbiAgICAgICAgdmFyIHJlcXVlc3RPcHRpb25zICA9IHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgICAgIHVybCA6IHRyYWNrLmZpbGUsXG4gICAgICAgICAgICBlbmNvZGluZzogbnVsbFxuICAgICAgICB9O1xuXG4gICAgICAgIGxvYWRSZXF1ZXN0RG93bmxvZGVyKCkudGhlbihSZXF1ZXN0ID0+IHtcbiAgICAgICAgICAgIFJlcXVlc3QocmVxdWVzdE9wdGlvbnMsIGZ1bmN0aW9uKGVycm9yLCByZXNwb25zZSwgYm9keSkge1xuICAgICAgICAgICAgICAgIGlmKGVycm9yKXtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JDYWxsYmFjayhlcnJvcik7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjdWVzID0gW107XG4gICAgICAgICAgICAgICAgICAgIGxldCB2dHRDdWVzID0gW107XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGJvZHkuaW5kZXhPZignV0VCVlRUJykgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiV0VCVlRUIExPQURFRFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRWdHRQYXJzZXIoKS50aGVuKFdlYlZUVCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBhcnNlciA9IG5ldyBXZWJWVFQuUGFyc2VyKHdpbmRvdywgV2ViVlRULlN0cmluZ0RlY29kZXIoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdnR0Q3VlcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlci5vbmN1ZSA9IGZ1bmN0aW9uKGN1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2dHRDdWVzLnB1c2goY3VlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlci5vbmZsdXNoID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVsZXRlIHRyYWNrLnhocjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc0NhbGxiYWNrKHZ0dEN1ZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUGFyc2UgY2FsbHMgb25mbHVzaCBpbnRlcm5hbGx5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VyLnBhcnNlKGJvZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVsZXRlIHRyYWNrLnhocjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvckNhbGxiYWNrKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihib2R5LmluZGV4T2YoJ1NBTUknKSA+PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlNBTUkgTE9BREVEXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9hZFNtaVBhcnNlcigpLnRoZW4oU21pUGFyc2VyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGFyc2VkRGF0YSA9IFNtaVBhcnNlcihib2R5LCB7Zml4ZWRMYW5nIDogbGFuZ3VhZ2V9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2dHRDdWVzID0gY29udmVydFRvVlRUQ3VlcyhwYXJzZWREYXRhLnJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc0NhbGxiYWNrKHZ0dEN1ZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVsZXRlIHRyYWNrLnhocjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvckNhbGxiYWNrKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJTUlQgTE9BREVEXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VlcyA9IFNydFBhcnNlcihib2R5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZ0dEN1ZXMgPSBjb252ZXJ0VG9WVFRDdWVzKGN1ZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc0NhbGxiYWNrKHZ0dEN1ZXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgLy9kZWxldGUgdHJhY2sueGhyO1xuICAgICAgICAgICAgZXJyb3JDYWxsYmFjayhlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5mdW5jdGlvbiBsb2FkUmVxdWVzdERvd25sb2Rlcigpe1xuICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ3V0aWxzL2Rvd25sb2FkZXInXSwgZnVuY3Rpb24gKHJlcXVpcmUpIHtcbiAgICAgICAgcmV0dXJuIHJlcXVpcmUoJ3V0aWxzL2Rvd25sb2FkZXInKS5kZWZhdWx0O1xuICAgIH0sIGZ1bmN0aW9uKGVycil7Y29uc29sZS5sb2coZXJyKTt9LCAnZG93bmxvYWRlcicpO1xufTtcbmZ1bmN0aW9uIGxvYWRWdHRQYXJzZXIoKSB7XG4gICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL2NhcHRpb24vcGFyc2VyL1Z0dFBhcnNlciddLCBmdW5jdGlvbiAocmVxdWlyZSkge1xuICAgICAgICByZXR1cm4gcmVxdWlyZSgnYXBpL2NhcHRpb24vcGFyc2VyL1Z0dFBhcnNlcicpLmRlZmF1bHQ7XG4gICAgfSwgZnVuY3Rpb24oZXJyKXtjb25zb2xlLmxvZyhlcnIpO30sICd2dHRwYXJzZXInKTtcbn1cbmZ1bmN0aW9uIGxvYWRTbWlQYXJzZXIoKSB7XG4gICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL2NhcHRpb24vcGFyc2VyL1NtaVBhcnNlciddLCBmdW5jdGlvbiAocmVxdWlyZSkge1xuICAgICAgICByZXR1cm4gcmVxdWlyZSgnYXBpL2NhcHRpb24vcGFyc2VyL1NtaVBhcnNlcicpLmRlZmF1bHQ7XG4gICAgfSwgZnVuY3Rpb24oZXJyKXtjb25zb2xlLmxvZyhlcnIpO30sICdzbWlwYXJzZXInKTtcbn1cbmV4cG9ydCBkZWZhdWx0IExvYWRlcjtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDUuIDE3Li5cbiAqL1xuaW1wb3J0IENhcHRpb25Mb2FkZXIgZnJvbSAnYXBpL2NhcHRpb24vTG9hZGVyJztcbmltcG9ydCB7UkVBRFksIEVSUk9SUywgRVJST1IsIFBMQVlFUl9DQVBUSU9OX0VSUk9SLCBDT05URU5UX01FVEEsIENPTlRFTlRfVElNRSwgQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VELCBDT05URU5UX0NBUFRJT05fQ0hBTkdFRH0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcbmltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XG5cbmNvbnN0IGlzU3VwcG9ydCA9IGZ1bmN0aW9uKGtpbmQpe1xuICAgIHJldHVybiBraW5kID09PSAnc3VidGl0bGVzJyB8fCBraW5kID09PSAnY2FwdGlvbnMnO1xufTtcblxuY29uc3QgTWFuYWdlciA9IGZ1bmN0aW9uKGFwaSwgcGxheWxpc3RJbmRleCl7XG5cbiAgICBjb25zdCB0aGF0ID0ge307XG4gICAgbGV0IGNhcHRpb25MaXN0ID0gW107XG4gICAgbGV0IGN1cnJlbnRDYXB0aW9uSW5kZXggPSAtMTtcblxuICAgIGxldCBjYXB0aW9uTG9hZGVyID0gQ2FwdGlvbkxvYWRlcigpO1xuICAgIGxldCBpc0Zpc3J0TG9hZCA9IHRydWU7XG4gICAgbGV0IGlzU2hvd2luZyA9IGZhbHNlO1xuXG5cbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDYXB0aW9uIE1hbmFnZXIgPj4gXCIsIHBsYXlsaXN0SW5kZXgpO1xuXG5cbiAgICBsZXQgYmluZFRyYWNrID0gZnVuY3Rpb24odHJhY2ssIHZ0dEN1ZXMpe1xuICAgICAgICB0cmFjay5kYXRhID0gdnR0Q3VlcyB8fCBbXTtcbiAgICAgICAgdHJhY2submFtZSA9IHRyYWNrLmxhYmVsIHx8IHRyYWNrLm5hbWUgfHwgdHJhY2subGFuZ3VhZ2U7XG4gICAgICAgIHRyYWNrLmlkID0gKGZ1bmN0aW9uKHRyYWNrLCB0cmFja3NDb3VudCkge1xuICAgICAgICAgICAgdmFyIHRyYWNrSWQ7XG4gICAgICAgICAgICB2YXIgcHJlZml4ID0gdHJhY2sua2luZCB8fCAnY2MnO1xuICAgICAgICAgICAgaWYgKHRyYWNrLmRlZmF1bHQgfHwgdHJhY2suZGVmYXVsdHRyYWNrKSB7XG4gICAgICAgICAgICAgICAgdHJhY2tJZCA9ICdkZWZhdWx0JztcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0cmFja0lkID0gdHJhY2suaWQgfHwgKHByZWZpeCArIHRyYWNrc0NvdW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGlzRmlzcnRMb2FkKXtcbiAgICAgICAgICAgICAgICAvL1RoaXMgZXhlY3V0ZSBvbmx5IG9uLiBhbmQgdGhlbiB1c2UgZmx1c2hDYXB0aW9uTGlzdChsYXN0Q2FwdGlvbkluZGV4KTtcbiAgICAgICAgICAgICAgICBjaGFuZ2VDdXJyZW50Q2FwdGlvbihjYXB0aW9uTGlzdC5sZW5ndGh8fDApO1xuICAgICAgICAgICAgICAgIGlzRmlzcnRMb2FkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cmFja0lkO1xuICAgICAgICB9KSh0cmFjaywgY2FwdGlvbkxpc3QubGVuZ3RoKTtcblxuICAgICAgICBjYXB0aW9uTGlzdC5wdXNoKHRyYWNrKTtcbiAgICAgICAgcmV0dXJuIHRyYWNrLmlkO1xuICAgIH07XG4gICAgbGV0IGNoYW5nZUN1cnJlbnRDYXB0aW9uID0gZnVuY3Rpb24oaW5kZXgpe1xuICAgICAgICBjdXJyZW50Q2FwdGlvbkluZGV4ID0gaW5kZXg7XG4gICAgICAgIGFwaS50cmlnZ2VyKENPTlRFTlRfQ0FQVElPTl9DSEFOR0VELCBjdXJyZW50Q2FwdGlvbkluZGV4KTtcbiAgICB9O1xuICAgIGlmKGFwaS5nZXRDb25maWcoKS5wbGF5bGlzdCAmJiBhcGkuZ2V0Q29uZmlnKCkucGxheWxpc3QubGVuZ3RoID4gMCl7XG4gICAgICAgIGxldCBwbGF5bGlzdCA9IGFwaS5nZXRDb25maWcoKS5wbGF5bGlzdFtwbGF5bGlzdEluZGV4XTtcblxuICAgICAgICBpZihwbGF5bGlzdCAmJiBwbGF5bGlzdC50cmFja3MgJiYgcGxheWxpc3QudHJhY2tzLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHBsYXlsaXN0LnRyYWNrcy5sZW5ndGg7IGkgKyspe1xuICAgICAgICAgICAgICAgIGNvbnN0IHRyYWNrID0gcGxheWxpc3QudHJhY2tzW2ldO1xuXG4gICAgICAgICAgICAgICAgaWYoaXNTdXBwb3J0KHRyYWNrLmtpbmQpICYmICEgXy5maW5kV2hlcmUodHJhY2ssIHtmaWxlIDogdHJhY2suZmlsZX0pKXtcbiAgICAgICAgICAgICAgICAgICAgLy90aGF0LmZsdXNoQ2FwdGlvbkxpc3QoY3VycmVudENhcHRpb25JbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb25Mb2FkZXIubG9hZCh0cmFjaywgdHJhY2subGFuZywgZnVuY3Rpb24odnR0Q3Vlcyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih2dHRDdWVzICYmIHZ0dEN1ZXMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNhcHRpb25JZCA9IGJpbmRUcmFjayh0cmFjaywgdnR0Q3Vlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlNbUExBWUVSX0NBUFRJT05fRVJST1JdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcGkudHJpZ2dlcihFUlJPUiwgdGVtcEVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhcGkub24oQ09OVEVOVF9USU1FLCBmdW5jdGlvbihtZXRhKXtcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gbWV0YS5wb3NpdGlvbjtcbiAgICAgICAgaWYoY3VycmVudENhcHRpb25JbmRleCA+IC0xICYmIGNhcHRpb25MaXN0W2N1cnJlbnRDYXB0aW9uSW5kZXhdKXtcbiAgICAgICAgICAgIGxldCBjdXJyZW50Q3VlcyA9IF8uZmlsdGVyKGNhcHRpb25MaXN0W2N1cnJlbnRDYXB0aW9uSW5kZXhdLmRhdGEsIGZ1bmN0aW9uIChjdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9zaXRpb24gPj0gKGN1ZS5zdGFydFRpbWUpICYmICggKCFjdWUuZW5kVGltZSB8fCBwb3NpdGlvbikgPD0gY3VlLmVuZFRpbWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZihjdXJyZW50Q3VlcyAmJiBjdXJyZW50Q3Vlcy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICBhcGkudHJpZ2dlcihDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQsIGN1cnJlbnRDdWVzWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfSk7XG4gICAgdGhhdC5mbHVzaENhcHRpb25MaXN0ID0gKGxhc3RDYXB0aW9uSW5kZXgpID0+e1xuICAgICAgICBjYXB0aW9uTGlzdCA9IFtdO1xuICAgICAgICBjaGFuZ2VDdXJyZW50Q2FwdGlvbihsYXN0Q2FwdGlvbkluZGV4KTtcbiAgICAgICAgLy9jdXJyZW50Q2FwdGlvbkluZGV4ID0gbGFzdENhcHRpb25JbmRleDtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Q2FwdGlvbkxpc3QgPSAoKSA9PntcbiAgICAgICAgcmV0dXJuIGNhcHRpb25MaXN0fHxbXTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Q3VycmVudENhcHRpb24gPSAoKSA9PntcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRDYXB0aW9uSW5kZXg7XG4gICAgfTtcbiAgICB0aGF0LnNldEN1cnJlbnRDYXB0aW9uID0gKF9pbmRleCkgPT57XG4gICAgICAgIGlmKF9pbmRleCA+IC0yICYmIF9pbmRleCA8IGNhcHRpb25MaXN0Lmxlbmd0aCl7XG4gICAgICAgICAgICBjaGFuZ2VDdXJyZW50Q2FwdGlvbihfaW5kZXgpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LmFkZENhcHRpb24gPSAodHJhY2spID0+e1xuICAgICAgICBpZihpc1N1cHBvcnQodHJhY2sua2luZCkgJiYgISBfLmZpbmRXaGVyZShjYXB0aW9uTG9hZGVyLCB7ZmlsZSA6IHRyYWNrLmZpbGV9KSl7XG4gICAgICAgICAgICBjYXB0aW9uTG9hZGVyLmxvYWQodHJhY2ssIGZ1bmN0aW9uKHZ0dEN1ZXMpe1xuICAgICAgICAgICAgICAgIGlmKHZ0dEN1ZXMgJiYgdnR0Q3Vlcy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgYmluZFRyYWNrKHRyYWNrLCB2dHRDdWVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlcnJvcil7XG4gICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SU1tQTEFZRVJfQ0FQVElPTl9FUlJPUl07XG4gICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgYXBpLnRyaWdnZXIoRVJST1IsIHRlbXBFcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhhdC5yZW1vdmVDYXB0aW9uID0gKGluZGV4KSA9PiB7XG4gICAgICAgIGlmKGluZGV4ID4gLTEgJiYgaW5kZXggPCBjYXB0aW9uTGlzdC5sZW5ndGgpe1xuICAgICAgICAgICAgY2FwdGlvbkxpc3Quc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIHJldHVybiBjYXB0aW9uTGlzdDtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT4ge1xuICAgICAgICBjYXB0aW9uTGlzdCA9IFtdO1xuICAgICAgICBjYXB0aW9uTG9hZGVyID0gbnVsbDtcbiAgICAgICAgYXBpLm9mZihDT05URU5UX1RJTUUsIG51bGwsIHRoYXQpO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cblxuXG5cbmV4cG9ydCBkZWZhdWx0IE1hbmFnZXI7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA1LiAyOS4uXG4gKi9cbmltcG9ydCB7IGhtc1RvU2Vjb25kLCB0cmltIH0gZnJvbSBcInV0aWxzL3N0cmluZ3NcIlxuXG5mdW5jdGlvbiBfZW50cnkoZGF0YSkge1xuICAgIHZhciBlbnRyeSA9IHt9O1xuICAgIHZhciBhcnJheSA9IGRhdGEuc3BsaXQoJ1xcclxcbicpO1xuICAgIGlmIChhcnJheS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgYXJyYXkgPSBkYXRhLnNwbGl0KCdcXG4nKTtcbiAgICB9XG4gICAgdmFyIGlkeCA9IDE7XG4gICAgaWYgKGFycmF5WzBdLmluZGV4T2YoJyAtLT4gJykgPiAwKSB7XG4gICAgICAgIGlkeCA9IDA7XG4gICAgfVxuICAgIGlmIChhcnJheS5sZW5ndGggPiBpZHggKyAxICYmIGFycmF5W2lkeCArIDFdKSB7XG4gICAgICAgIC8vIFRoaXMgbGluZSBjb250YWlucyB0aGUgc3RhcnQgYW5kIGVuZC5cbiAgICAgICAgdmFyIGxpbmUgPSBhcnJheVtpZHhdO1xuICAgICAgICB2YXIgaW5kZXggPSBsaW5lLmluZGV4T2YoJyAtLT4gJyk7XG4gICAgICAgIGlmIChpbmRleCA+IDApIHtcbiAgICAgICAgICAgIGVudHJ5LnN0YXJ0ID0gaG1zVG9TZWNvbmQobGluZS5zdWJzdHIoMCwgaW5kZXgpKTtcbiAgICAgICAgICAgIGVudHJ5LmVuZCA9IGhtc1RvU2Vjb25kKGxpbmUuc3Vic3RyKGluZGV4ICsgNSkpO1xuICAgICAgICAgICAgZW50cnkudGV4dCA9IGFycmF5LnNsaWNlKGlkeCArIDEpLmpvaW4oJ1xcclxcbicpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBlbnRyeTtcblxufVxuXG5jb25zdCBTcnRQYXJzZXIgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgdmFyIGNhcHRpb25zID0gW107XG5cbiAgICBkYXRhID0gdHJpbShkYXRhKTtcblxuICAgIHZhciBsaXN0ID0gZGF0YS5zcGxpdCgnXFxyXFxuXFxyXFxuJyk7XG4gICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGxpc3QgPSBkYXRhLnNwbGl0KCdcXG5cXG4nKTtcbiAgICB9XG5cblxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChsaXN0W2ldID09PSAnV0VCVlRUJykge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVudHJ5ID0gX2VudHJ5KGxpc3RbaV0pO1xuICAgICAgICBpZiAoZW50cnkudGV4dCkge1xuICAgICAgICAgICAgY2FwdGlvbnMucHVzaChlbnRyeSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY2FwdGlvbnM7XG59XG5cblxuXG5leHBvcnQgZGVmYXVsdCBTcnRQYXJzZXI7IiwiLy8gU1RBVEVcbmV4cG9ydCBjb25zdCBTVEFURV9CVUZGRVJJTkcgPSBcImJ1ZmZlcmluZ1wiO1xuZXhwb3J0IGNvbnN0IFNUQVRFX0lETEUgPSBcImlkbGVcIjtcbmV4cG9ydCBjb25zdCBTVEFURV9DT01QTEVURSA9IFwiY29tcGxldGVcIjtcbmV4cG9ydCBjb25zdCBTVEFURV9QQVVTRUQgPSBcInBhdXNlZFwiO1xuZXhwb3J0IGNvbnN0IFNUQVRFX1BMQVlJTkcgPSBcInBsYXlpbmdcIjtcbmV4cG9ydCBjb25zdCBTVEFURV9FUlJPUiA9IFwiZXJyb3JcIjtcbmV4cG9ydCBjb25zdCBTVEFURV9MT0FESU5HID0gXCJsb2FkaW5nXCI7XG5leHBvcnQgY29uc3QgU1RBVEVfU1RBTExFRCA9IFwic3RhbGxlZFwiO1xuXG5leHBvcnQgY29uc3QgU1RBVEVfQURfTE9BRElORyA9IFwiYWRMb2FkaW5nXCI7XG5leHBvcnQgY29uc3QgU1RBVEVfQURfTE9BREVEID0gXCJhZExvYWRlZFwiO1xuZXhwb3J0IGNvbnN0IFNUQVRFX0FEX1BMQVlJTkcgPSBcImFkUGxheWluZ1wiO1xuZXhwb3J0IGNvbnN0IFNUQVRFX0FEX1BBVVNFRCA9IFwiYWRQYXVzZWRcIjtcbmV4cG9ydCBjb25zdCBTVEFURV9BRF9DT01QTEVURSA9IFwiYWRDb21wbGV0ZVwiO1xuZXhwb3J0IGNvbnN0IFNUQVRFX0FEX0VSUk9SID0gXCJhZEVycm9yXCI7XG5cbi8vIFBST1ZJREVSXG5leHBvcnQgY29uc3QgUFJPVklERVJfSFRNTDUgPSBcImh0bWw1XCI7XG5leHBvcnQgY29uc3QgUFJPVklERVJfV0VCUlRDID0gXCJ3ZWJydGNcIjtcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9EQVNIID0gXCJkYXNoXCI7XG5leHBvcnQgY29uc3QgUFJPVklERVJfSExTID0gXCJobHNcIjtcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9SVE1QID0gXCJydG1wXCI7XG5cbi8vIEVWRU5UU1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfQ09NUExFVEUgPSBTVEFURV9DT01QTEVURTtcbmV4cG9ydCBjb25zdCBSRUFEWSA9IFwicmVhZHlcIjtcbmV4cG9ydCBjb25zdCBERVNUUk9ZID0gXCJkZXN0cm95XCI7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9TRUVLID0gXCJzZWVrXCI7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9CVUZGRVJfRlVMTCA9IFwiYnVmZmVyRnVsbFwiO1xuZXhwb3J0IGNvbnN0IERJU1BMQVlfQ0xJQ0sgPSBcImRpc3BsYXlDbGlja1wiO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfTE9BREVEID0gXCJsb2FkZWRcIjtcbmV4cG9ydCBjb25zdCBQTEFZTElTVF9DSEFOR0VEID0gXCJwbGF5bGlzdENoYW5nZWRcIjtcbmV4cG9ydCBjb25zdCBDT05URU5UX1NFRUtFRCA9IFwic2Vla2VkXCI7XG5leHBvcnQgY29uc3QgQUxMX1BMQVlMSVNUX0VOREVEID0gXCJhbGxQbGF5bGlzdEVuZGVkXCI7XG5leHBvcnQgY29uc3QgTkVUV09SS19VTlNUQUJMRUQgPSBcInVuc3RhYmxlTmV0d29ya1wiO1xuXG5cblxuZXhwb3J0IGNvbnN0IEVSUk9SID0gXCJlcnJvclwiO1xuXG4vLyBTVEFURSBPRiBQTEFZRVJcbmV4cG9ydCBjb25zdCBQTEFZRVJfU1RBVEUgPSBcInN0YXRlQ2hhbmdlZFwiO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9DT01QTEVURSA9IFNUQVRFX0NPTVBMRVRFO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9QQVVTRSA9IFwicGF1c2VcIjtcbmV4cG9ydCBjb25zdCBQTEFZRVJfUExBWSA9IFwicGxheVwiO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9SRVNJWkVEID0gXCJyZXNpemVkXCI7XG5leHBvcnQgY29uc3QgUExBWUVSX0xPQURJTkcgPSBcImxvYWRpbmdcIjtcbmV4cG9ydCBjb25zdCBQTEFZRVJfRlVMTFNDUkVFTl9SRVFVRVNUID0gXCJmdWxsc2NyZWVuUmVxdWVzdGVkXCI7XG5leHBvcnQgY29uc3QgUExBWUVSX0ZVTExTQ1JFRU5fQ0hBTkdFRCA9IFwiZnVsbHNjcmVlbkNoYW5nZWRcIjtcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0FSTklORyA9IFwid2FybmluZ1wiO1xuXG5leHBvcnQgY29uc3QgQURfQ0hBTkdFRCA9IFwiYWRDaGFuZ2VkXCI7XG5leHBvcnQgY29uc3QgQURfVElNRSA9IFwiYWRUaW1lXCI7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9CVUZGRVIgPSBcImJ1ZmZlckNoYW5nZWRcIjtcbmV4cG9ydCBjb25zdCBDT05URU5UX1RJTUUgPSBcInRpbWVcIjtcbmV4cG9ydCBjb25zdCBDT05URU5UX1JBVEVfQ0hBTkdFID0gXCJyYXRlY2hhbmdlXCI7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9WT0xVTUUgPSBcInZvbHVtZUNoYW5nZWRcIjtcbmV4cG9ydCBjb25zdCBDT05URU5UX01VVEUgPSBcIm11dGVcIjtcbmV4cG9ydCBjb25zdCBDT05URU5UX01FVEEgPSBcIm1ldGFDaGFuZ2VkXCI7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCA9IFwic291cmNlQ2hhbmdlZFwiO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfTEVWRUxfQ0hBTkdFRCA9IFwicXVhbGl0eUxldmVsQ2hhbmdlZFwiO1xuZXhwb3J0IGNvbnN0IFBMQVlCQUNLX1JBVEVfQ0hBTkdFRCA9IFwicGxheWJhY2tSYXRlQ2hhbmdlZFwiO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfQ0FQVElPTl9DVUVfQ0hBTkdFRCA9IFwiY3VlQ2hhbmdlZFwiO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfQ0FQVElPTl9DSEFOR0VEID0gXCJjYXB0aW9uQ2hhbmdlZFwiO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfVElNRV9NT0RFX0NIQU5HRUQgPSBcInRpbWVEaXNwbGF5TW9kZUNoYW5nZWRcIjtcbmV4cG9ydCBjb25zdCBPTUVfUDJQX01PREUgPSBcInAycE1vZGVcIjtcblxuXG5leHBvcnQgY29uc3QgSU5JVF9VTktOV09OX0VSUk9SID0gMTAwO1xuZXhwb3J0IGNvbnN0IElOSVRfVU5TVVBQT1JUX0VSUk9SID0gMTAxO1xuZXhwb3J0IGNvbnN0IElOSVRfUlRNUF9TRVRVUF9FUlJPUiA9IDEwMjtcbmV4cG9ydCBjb25zdCBJTklUX0RBU0hfVU5TVVBQT1JUID0gMTAzO1xuZXhwb3J0IGNvbnN0IElOSVRfQURTX0VSUk9SID0gMTA0O1xuZXhwb3J0IGNvbnN0IElOSVRfREFTSF9OT1RGT1VORCA9IDEwNTtcbmV4cG9ydCBjb25zdCBJTklUX0hMU0pTX05PVEZPVU5EID0gMTA2O1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX0VSUk9SID0gMzAwO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUiA9IDMwMTtcbmV4cG9ydCBjb25zdCBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SID0gMzAyO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUiA9IDMwMztcbmV4cG9ydCBjb25zdCBQTEFZRVJfRklMRV9FUlJPUiA9IDMwNDtcbmV4cG9ydCBjb25zdCBQTEFZRVJfQ0FQVElPTl9FUlJPUiA9IDMwNTtcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1dTX0VSUk9SID0gNTAxO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUiA9IDUwMjtcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1NFVF9SRU1PVEVfREVTQ19FUlJPUiA9IDUwMztcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX0NSRUFURV9BTlNXRVJfRVJST1IgPSA1MDQ7XG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUiA9IDUwNTtcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX05FVFdPUktfU0xPVyA9IDUxMDtcblxuZXhwb3J0IGNvbnN0IFdBUk5fTVNHX01VVEVEUExBWSA9IFwiUGxlYXNlIHRvdWNoIGhlcmUgdG8gdHVybiBvbiB0aGUgc291bmQuXCI7XG5cbmV4cG9ydCBjb25zdCBFUlJPUlMgPSB7XG4gICAgMTAwIDoge2NvZGUgOiAxMDAgLCBtZXNzYWdlIDogXCJDYW4gbm90IGxvYWQgZHVlIHRvIHVua25vd24gcmVhc29ucy5cIiwgcmVhc29uIDpcIkNhbiBub3QgbG9hZCBkdWUgdG8gdW5rbm93biByZWFzb25zLlwifSxcbiAgICAxMDEgOiB7Y29kZSA6IDEwMSAsIG1lc3NhZ2UgOiBcIkNhbiBub3QgbG9hZCBkdWUgdG8gdW5zdXBwb3J0ZWQgbWVkaWEuXCIsIHJlYXNvbiA6XCJDYW4gbm90IGxvYWQgZHVlIHRvIHVuc3VwcG9ydGVkIG1lZGlhLlwifSxcbiAgICAxMDIgOiB7Y29kZSA6IDEwMiAsIG1lc3NhZ2UgOiBcIkZsYXNoIGZldGNoaW5nIHByb2Nlc3MgYWJvcnRlZC4gPC9icj48YSBocmVmPSdodHRwOi8vd3d3LmFkb2JlLmNvbS9nby9nZXRmbGFzaHBsYXllcicgdGFyZ2V0PSdfc2VsZic+PGltZyBzcmM9J2h0dHA6Ly93d3cuYWRvYmUuY29tL2ltYWdlcy9zaGFyZWQvZG93bmxvYWRfYnV0dG9ucy9nZXRfZmxhc2hfcGxheWVyLmdpZicgYWx0PSdHZXQgQWRvYmUgRmxhc2ggcGxheWVyJz48L2E+XCIsIHJlYXNvbiA6XCJJdCBsb29rcyBsaWtlIG5vdCBmb3VuZCBzd2Ygb3IgeW91ciBlbnZpcm9ubWVudCBpcyBsb2NhbGhvc3QuXCJ9LFxuICAgIDEwMyA6IHtjb2RlIDogMTAzICwgbWVzc2FnZSA6IFwiQ2FuIG5vdCBsb2FkIGR1ZSB0byBkYXNoanMuIFBsZWFzZSBjaGVjayB0aGUgbGFzdGVzdCB2ZXJzaW9uLlwiLCByZWFzb24gOlwiZGFzaC5qcyB2ZXJzaW9uIGlzIG9sZC4gUGxlYXNlIGNoZWNrIHRoZSBsYXN0ZXN0LlwifSxcbiAgICAxMDQgOiB7Y29kZSA6IDEwNCAsIG1lc3NhZ2UgOiBcIkNhbiBub3QgbG9hZCBkdWUgdG8gZ29vZ2xlIGltYSBmb3IgQWRzLiBcIiwgcmVhc29uIDpcIlBsZWFzZSBjaGVjayB0aGUgZ29vZ2xlIGltYSBsaWJyYXJ5LlwifSxcbiAgICAxMDUgOiB7Y29kZSA6IDEwNSAsIG1lc3NhZ2UgOiBcIkNhbiBub3QgZmluZCB0aGUgZGFzaGpzLiBQbGVhc2UgY2hlY2sgdGhlIGRhc2hqcy5cIiwgcmVhc29uIDpcIk5vdCBmb3VuZCBkYXNoanMuXCJ9LFxuICAgIDEwNiA6IHtjb2RlIDogMTA2ICwgbWVzc2FnZSA6IFwiQ2FuIG5vdCBmaW5kIHRoZSBobHNqcy4gUGxlYXNlIGNoZWNrIHRoZSBobHNqcy5cIiwgcmVhc29uIDpcIk5vdCBmb3VuZCBobHNqcy5cIn0sXG4gICAgMzAwIDoge2NvZGUgOiAzMDAgLCBtZXNzYWdlIDogXCJDYW4gbm90IHBsYXkgZHVlIHRvIHVua25vd24gcmVhc29ucy5cIiwgcmVhc29uIDpcIkNhbiBub3QgcGxheSBkdWUgdG8gdW5rbm93biByZWFzb25zLlwifSxcbiAgICAzMDEgOiB7Y29kZSA6IDMwMSAsIG1lc3NhZ2UgOiBcIkZldGNoaW5nIHByb2Nlc3MgYWJvcnRlZCBieSB1c2VyLlwiLCByZWFzb24gOlwiRmV0Y2hpbmcgcHJvY2VzcyBhYm9ydGVkIGJ5IHVzZXIuXCJ9LFxuICAgIDMwMiA6IHtjb2RlIDogMzAyICwgbWVzc2FnZSA6IFwiU29tZSBvZiB0aGUgbWVkaWEgY291bGQgbm90IGJlIGRvd25sb2FkZWQgZHVlIHRvIGEgbmV0d29yayBlcnJvci5cIiwgcmVhc29uIDpcIkVycm9yIG9jY3VycmVkIHdoZW4gZG93bmxvYWRpbmcuXCJ9LFxuICAgIDMwMyA6IHtjb2RlIDogMzAzICwgbWVzc2FnZSA6IFwiVW5hYmxlIHRvIGxvYWQgbWVkaWEuIFRoaXMgbWF5IGJlIGR1ZSB0byBhIHNlcnZlciBvciBuZXR3b3JrIGVycm9yLCBvciBkdWUgdG8gYW4gdW5zdXBwb3J0ZWQgZm9ybWF0LlwiLCByZWFzb24gOlwiRXJyb3Igb2NjdXJyZWQgd2hlbiBkZWNvZGluZy5cIn0sXG4gICAgMzA0IDoge2NvZGUgOiAzMDQgLCBtZXNzYWdlIDogXCJNZWRpYSBwbGF5YmFjayBoYXMgYmVlbiBjYW5jZWxlZC4gSXQgbG9va3MgbGlrZSB5b3VyIG1lZGlhIGlzIGNvcnJ1cHRlZCBvciB5b3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCB0aGUgZmVhdHVyZXMgeW91ciBtZWRpYSB1c2VzLlwiLCByZWFzb24gOlwiTWVkaWEgcGxheWJhY2sgbm90IHN1cHBvcnRlZC5cIn0sXG4gICAgMzA1IDoge2NvZGUgOiAzMDUgLCBtZXNzYWdlIDogXCJDYW4gbm90IGxvYWQgY2FwdGlvbnMgZHVlIHRvIHVua25vd24gcmVhc29ucy5cIiwgcmVhc29uIDpcIkNhbiBub3QgbG9hZCBjYXB0aW9ucyBkdWUgdG8gdW5rbm93biByZWFzb25zLlwifSxcbiAgICA1MDEgOiB7Y29kZSA6IDUwMSAsIG1lc3NhZ2UgOiBcIkNvbm5lY3Rpb24gd2l0aCBsb3ctbGF0ZW5jeShPTUUpIHNlcnZlciBmYWlsZWQuXCIsIHJlYXNvbiA6XCJXZWJTb2NrZXQgY29ubmVjdGlvbiBmYWlsZWQuXCJ9LFxuICAgIDUwMiA6IHtjb2RlIDogNTAyICwgbWVzc2FnZSA6IFwiQ29ubmVjdGlvbiB3aXRoIGxvdy1sYXRlbmN5KE9NRSkgc2VydmVyIGZhaWxlZC5cIiwgcmVhc29uIDpcIldlYlJUQyBhZGRJY2VDYW5kaWRhdGUgZmFpbGVkLlwifSxcbiAgICA1MDMgOiB7Y29kZSA6IDUwMyAsIG1lc3NhZ2UgOiBcIkNvbm5lY3Rpb24gd2l0aCBsb3ctbGF0ZW5jeShPTUUpIHNlcnZlciBmYWlsZWQuXCIsIHJlYXNvbiA6XCJXZWJSVEMgc2V0UmVtb3RlRGVzY3JpcHRpb24gZmFpbGVkLlwifSxcbiAgICA1MDQgOiB7Y29kZSA6IDUwNCAsIG1lc3NhZ2UgOiBcIkNvbm5lY3Rpb24gd2l0aCBsb3ctbGF0ZW5jeShPTUUpIHNlcnZlciBmYWlsZWQuXCIsIHJlYXNvbiA6XCJXZWJSVEMgcGVlciBjcmVhdGVPZmZlciBmYWlsZWQuXCJ9LFxuICAgIDUwNSA6IHtjb2RlIDogNTA1ICwgbWVzc2FnZSA6IFwiQ29ubmVjdGlvbiB3aXRoIGxvdy1sYXRlbmN5KE9NRSkgc2VydmVyIGZhaWxlZC5cIiwgcmVhc29uIDpcIldlYlJUQyBzZXRMb2NhbERlc2NyaXB0aW9uIGZhaWxlZC5cIn0sXG4gICAgNTEwIDoge2NvZGUgOiA1MTAgLCBtZXNzYWdlIDogXCJOZXR3b3JrIGNvbm5lY3Rpb24gaXMgdW5zdGFibGUuIENoZWNrIHRoZSBuZXR3b3JrIGNvbm5lY3Rpb24uXCIsIHJlYXNvbiA6XCJOZXR3b3JrIGlzIHNsb3cuXCJ9XG59O1xuXG5leHBvcnQgY29uc3QgVUlfSUNPTlMgPSB7XG4gICAgdm9sdW1lX211dGUgOiBcInZvbHVtZS1tdXRlXCJcbn07XG4iLCIvKipcbiAqIEBicmllZiAgIOuvuOuUlOyWtCDsl5jrpqzrqLztirjrpbwg6rSA66as7ZWY64qUIOqwneyytC4g7ZiE7J6s64qUIO2VmOuKlCDsnbzsnbQg66eO7KeAIOyViuuLpC5cbiAqIEBwYXJhbSAgIHtlbGVtZW50fSAgIGNvbnRhaW5lciAgIGRvbSBlbGVtZW50XG4gKlxuICogKi9cbmltcG9ydCB7Z2V0QnJvd3Nlcn0gZnJvbSBcInV0aWxzL2Jyb3dzZXJcIjtcbmltcG9ydCB7UFJPVklERVJfREFTSCwgUFJPVklERVJfSExTLCBQUk9WSURFUl9XRUJSVEMsIFBST1ZJREVSX0hUTUw1LCBQUk9WSURFUl9SVE1QfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuaW1wb3J0IExBJCBmcm9tIFwidXRpbHMvbGlrZUEkLmpzXCI7XG5pbXBvcnQge2dldFNjcmlwdFBhdGh9IGZyb20gJ3V0aWxzL3dlYnBhY2snO1xuaW1wb3J0IHt2ZXJzaW9ufSBmcm9tICd2ZXJzaW9uJztcbi8vVG9EbyA6IFJlc3RydWN0dXJpbmdcblxuY29uc3QgTWFuYWdlciA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgYnJvd3NlckluZm8pe1xuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICBjb25zdCBTV0ZQYXRoID0gZ2V0U2NyaXB0UGF0aCgnb3ZlbnBsYXllci5qcycpK1wiT3ZlblBsYXllckZsYXNoLnN3Zj92PVwiK3ZlcnNpb247XG4gICAgbGV0IHJvb3RJZCA9IGNvbnRhaW5lci5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBhcmVudC1pZFwiKTtcbiAgICBsZXQgJGNvbnRhaW5lciA9IExBJChjb250YWluZXIpO1xuICAgIGxldCB2aWRlb0VsZW1lbnQgPSBcIlwiO1xuXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTWVkaWFNYW5hZ2VyIGxvYWRlZC4gYnJvd3NlciA6IFwiLCBicm93c2VySW5mbyApO1xuXG4gICAgY29uc3QgY3JlYXRlSHRtbFZpZGVvID0gZnVuY3Rpb24oaXNMb29wKXtcbiAgICAgICAgdmlkZW9FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbiAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnZGlzYWJsZXJlbW90ZXBsYXliYWNrJywgJycpO1xuICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCd3ZWJraXQtcGxheXNpbmxpbmUnLCAndHJ1ZScpO1xuICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCdwbGF5c2lubGluZScsICd0cnVlJyk7XG4gICAgICAgIGlmKGlzTG9vcCl7XG4gICAgICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCdsb29wJywgJycpO1xuICAgICAgICB9XG4gICAgICAgICRjb250YWluZXIuYXBwZW5kKHZpZGVvRWxlbWVudCk7XG5cbiAgICAgICAgcmV0dXJuIHZpZGVvRWxlbWVudDtcbiAgICB9O1xuICAgIGNvbnN0IGNyZWF0ZUZsYXNoVmlkZW8gPSBmdW5jdGlvbihpc0xvb3AsIGJ1ZmZlclRpbWUsIGJ1ZmZlclRpbWVNYXgpe1xuICAgICAgICBsZXQgbW92aWUsIGZsYXNodmFycywgYWxsb3dzY3JpcHRhY2Nlc3MsIGFsbG93ZnVsbHNjcmVlbiwgcXVhbGl0eSwgbmFtZSwgbWVudSwgcXVhbCwgYmdjb2xvciwgbG9vcCwgd21vZGUgO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJNZWRpYU1hbmFnZXIgRmxhc2ggYnVmZmVyIHNldHRpbmcgOiBcIiwgYnVmZmVyVGltZSwgYnVmZmVyVGltZU1heCk7XG4gICAgICAgIG1vdmllID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcbiAgICAgICAgbW92aWUuc2V0QXR0cmlidXRlKCduYW1lJywgJ21vdmllJyk7XG4gICAgICAgIG1vdmllLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBTV0ZQYXRoKTtcblxuICAgICAgICBmbGFzaHZhcnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xuICAgICAgICBmbGFzaHZhcnMuc2V0QXR0cmlidXRlKCduYW1lJywgJ2ZsYXNodmFycycpO1xuICAgICAgICAvL3BsYXllcklkIGlzIHRvIHVzZSBTV0YgZm9yIEV4dGVybmFsSW50ZXJmYWNlLmNhbGwoKS5cbiAgICAgICAgZmxhc2h2YXJzLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBgcGxheWVySWQ9JHtyb290SWR9JmJ1ZmZlclRpbWU9JHtidWZmZXJUaW1lfSZidWZmZXJNYXhUaW1lPSR7YnVmZmVyVGltZU1heH1gKTtcblxuICAgICAgICBhbGxvd3NjcmlwdGFjY2VzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XG4gICAgICAgIGFsbG93c2NyaXB0YWNjZXNzLnNldEF0dHJpYnV0ZSgnbmFtZScsICdhbGxvd3NjcmlwdGFjY2VzcycpO1xuICAgICAgICBhbGxvd3NjcmlwdGFjY2Vzcy5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ2Fsd2F5cycpO1xuXG4gICAgICAgIGFsbG93ZnVsbHNjcmVlbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XG4gICAgICAgIGFsbG93ZnVsbHNjcmVlbi5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnYWxsb3dmdWxsc2NyZWVuJyk7XG4gICAgICAgIGFsbG93ZnVsbHNjcmVlbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ3RydWUnKTtcblxuICAgICAgICBxdWFsaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcbiAgICAgICAgcXVhbGl0eS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAncXVhbGl0eScpO1xuICAgICAgICBxdWFsaXR5LnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnaGVpZ2h0Jyk7XG5cbiAgICAgICAgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XG4gICAgICAgIG5hbWUuc2V0QXR0cmlidXRlKCduYW1lJywgJ25hbWUnKTtcbiAgICAgICAgbmFtZS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgcm9vdElkK1wiLWZsYXNoXCIpO1xuXG4gICAgICAgIG1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xuICAgICAgICBtZW51LnNldEF0dHJpYnV0ZSgnbmFtZScsICdtZW51Jyk7XG4gICAgICAgIG1lbnUuc2V0QXR0cmlidXRlKCd2YWx1ZScsICdmYWxzZScpO1xuXG4gICAgICAgIHF1YWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xuICAgICAgICBxdWFsLnNldEF0dHJpYnV0ZSgnbmFtZScsICdxdWFsaXR5Jyk7XG4gICAgICAgIHF1YWwuc2V0QXR0cmlidXRlKCd2YWx1ZScsICdoaWdoJyk7XG5cbiAgICAgICAgYmdjb2xvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XG4gICAgICAgIGJnY29sb3Iuc2V0QXR0cmlidXRlKCduYW1lJywgJ2JnY29sb3InKTtcbiAgICAgICAgYmdjb2xvci5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJyMwMDAwMDAnKTtcblxuICAgICAgICB3bW9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XG4gICAgICAgIHdtb2RlLnNldEF0dHJpYnV0ZSgnbmFtZScsICd3bW9kZScpO1xuICAgICAgICB3bW9kZS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ29wYXF1ZScpO1xuXG4gICAgICAgIC8qbGV0IGFsbG93QnV0dG9uID0gYDxhIGhyZWY9XCJodHRwOi8vd3d3LmFkb2JlLmNvbS9nby9nZXRmbGFzaHBsYXllclwiPjxpbWcgc3JjPVwiaHR0cDovL3d3dy5hZG9iZS5jb20vaW1hZ2VzL3NoYXJlZC9kb3dubG9hZF9idXR0b25zL2dldF9mbGFzaF9wbGF5ZXIuZ2lmXCIgYWx0PVwiR2V0IEFkb2JlIEZsYXNoIHBsYXllclwiPjwvYT5gO1xuICAgICAgICBtZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgbWVzc2FnZS5pbm5lckhUTUwgPSBhbGxvd0J1dHRvbjsqL1xuXG4gICAgICAgIGlmKGlzTG9vcCl7XG4gICAgICAgICAgICBsb29wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcbiAgICAgICAgICAgIGxvb3Auc2V0QXR0cmlidXRlKCduYW1lJywgJ2xvb3AnKTtcbiAgICAgICAgICAgIGxvb3Auc2V0QXR0cmlidXRlKCd2YWx1ZScsICd0cnVlJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2aWRlb0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvYmplY3QnKTtcbiAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCByb290SWQrXCItZmxhc2hcIik7XG4gICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCByb290SWQrXCItZmxhc2hcIik7XG4gICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzEwMCUnKTtcbiAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgJzEwMCUnKTtcbiAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnc2NhbGUnLCAnZGVmYXVsdCcpO1xuICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCd3bW9kZScsICdvcGFxdWUnKTtcblxuICAgICAgICBpZihicm93c2VySW5mby5icm93c2VyID09PSBcIk1pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3JlclwiICYmIGJyb3dzZXJJbmZvLmJyb3dzZXJNYWpvclZlcnNpb24gPD0gOSApe1xuICAgICAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnY2xhc3NpZCcsICdjbHNpZDpEMjdDREI2RS1BRTZELTExY2YtOTZCOC00NDQ1NTM1NDAwMDAnKTtcbiAgICAgICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChtb3ZpZSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YScsIFNXRlBhdGgpO1xuICAgICAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgndHlwZScsICdhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmKGlzTG9vcCl7XG4gICAgICAgICAgICB2aWRlb0VsZW1lbnQuYXBwZW5kQ2hpbGQobG9vcCk7XG4gICAgICAgIH1cblxuICAgICAgICB2aWRlb0VsZW1lbnQuYXBwZW5kQ2hpbGQod21vZGUpO1xuICAgICAgICB2aWRlb0VsZW1lbnQuYXBwZW5kQ2hpbGQoYmdjb2xvcik7XG4gICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChxdWFsKTtcbiAgICAgICAgdmlkZW9FbGVtZW50LmFwcGVuZENoaWxkKGFsbG93ZnVsbHNjcmVlbik7XG4gICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChhbGxvd3NjcmlwdGFjY2Vzcyk7XG4gICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChmbGFzaHZhcnMpO1xuICAgICAgICAvL3ZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChtZXNzYWdlKTtcblxuICAgICAgICAkY29udGFpbmVyLmFwcGVuZCh2aWRlb0VsZW1lbnQpO1xuXG4gICAgICAgIHJldHVybiB2aWRlb0VsZW1lbnQ7XG4gICAgfTtcblxuICAgIHRoYXQuY3JlYXRlTWVkaWEgPSAocHJvdmlkZXJOYW1lICwgcGxheWVyQ29uZmlnKSAgPT4ge1xuICAgICAgICBpZih2aWRlb0VsZW1lbnQpe1xuICAgICAgICAgICAgdGhhdC5lbXB0eSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHByb3ZpZGVyTmFtZSA9PT0gUFJPVklERVJfUlRNUCA/IGNyZWF0ZUZsYXNoVmlkZW8ocGxheWVyQ29uZmlnLmlzTG9vcCgpLCBwbGF5ZXJDb25maWcuZ2V0UnRtcEJ1ZmZlclRpbWUoKSwgcGxheWVyQ29uZmlnLmdldFJ0bXBCdWZmZXJUaW1lTWF4KCkpXG4gICAgICAgICAgICA6IGNyZWF0ZUh0bWxWaWRlbyhwbGF5ZXJDb25maWcuaXNMb29wKCkpO1xuICAgIH1cblxuICAgIHRoYXQuY3JlYXRlQWRDb250YWluZXIgPSAoKSA9PiB7XG4gICAgICAgIGxldCBhZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhZENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ292cC1hZHMnKTtcbiAgICAgICAgJGNvbnRhaW5lci5hcHBlbmQoYWRDb250YWluZXIpO1xuXG4gICAgICAgIHJldHVybiBhZENvbnRhaW5lcjtcbiAgICB9O1xuXG5cbiAgICB0aGF0LmVtcHR5ID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIk1lZGlhTWFuYWdlciByZW1vdmVFbGVtZW50KClcIik7XG4gICAgICAgICRjb250YWluZXIucmVtb3ZlQ2hpbGQodmlkZW9FbGVtZW50KTtcbiAgICAgICAgdmlkZW9FbGVtZW50ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XG4gICAgICAgICRjb250YWluZXIucmVtb3ZlQ2hpbGQoKTtcbiAgICAgICAgJGNvbnRhaW5lciA9IG51bGw7XG4gICAgICAgIHZpZGVvRWxlbWVudCA9IG51bGw7XG4gICAgICAgIHJvb3RJZCA9IG51bGw7XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTWFuYWdlcjtcbiIsImltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XG5pbXBvcnQge2lzUnRtcCwgaXNXZWJSVEMsIGlzRGFzaCB9IGZyb20gXCJ1dGlscy92YWxpZGF0b3JcIjtcbmltcG9ydCB7ZXh0cmFjdEV4dGVuc2lvbiAsdHJpbX0gZnJvbSBcIi4uLy4uL3V0aWxzL3N0cmluZ3NcIjtcbmltcG9ydCBTdXBwb3J0Q2hlY2tlciBmcm9tIFwiLi4vU3VwcG9ydENoZWNrZXJcIjtcbmltcG9ydCB7UExBWUxJU1RfQ0hBTkdFRH0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBUaGlzIG1hbmFnZXMgUGxheWxpc3Qgb3IgU291cmNlcy5cbiAqIEBwYXJhbVxuICpcbiAqICovXG5jb25zdCBNYW5hZ2VyID0gZnVuY3Rpb24ocHJvdmlkZXIpe1xuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICBsZXQgY3VycmVudFBsYXlsaXN0SXRlbSA9IFtdO1xuICAgIGxldCBzcGVjID0ge1xuICAgICAgICBwbGF5bGlzdCA6IFtdLFxuICAgICAgICBjdXJyZW50SW5kZXggOiAwXG4gICAgfTtcbiAgICBsZXQgc3VwcG9ydENoZWNrZXIgPSBTdXBwb3J0Q2hlY2tlcigpO1xuXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIGxvYWRlZC5cIik7XG5cbiAgICBjb25zdCBtYWtlUHJldHR5U291cmNlID0gZnVuY3Rpb24oc291cmNlXyl7XG4gICAgICAgIGlmICghc291cmNlXyB8fCAhc291cmNlXy5maWxlICYmICEoc291cmNlXy5ob3N0IHx8IHNvdXJjZV8uYXBwbGljYXRpb24gfHwgc291cmNlXy5zdHJlYW0pKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc291cmNlID0gT2JqZWN0LmFzc2lnbih7fSwgeyAnZGVmYXVsdCc6IGZhbHNlIH0sIHNvdXJjZV8pO1xuICAgICAgICBzb3VyY2UuZmlsZSA9IHRyaW0oJycgKyBzb3VyY2UuZmlsZSk7XG5cbiAgICAgICAgaWYoc291cmNlLmhvc3QgJiYgc291cmNlLmFwcGxpY2F0aW9uICYmIHNvdXJjZS5zdHJlYW0pe1xuICAgICAgICAgICAgc291cmNlLmZpbGUgPSBzb3VyY2UuaG9zdCArIFwiL1wiICsgc291cmNlLmFwcGxpY2F0aW9uICsgXCIvc3RyZWFtL1wiICsgc291cmNlLnN0cmVhbTtcbiAgICAgICAgICAgIGRlbGV0ZSBzb3VyY2UuaG9zdDtcbiAgICAgICAgICAgIGRlbGV0ZSBzb3VyY2UuYXBwbGljYXRpb247XG4gICAgICAgICAgICBkZWxldGUgc291cmNlLnN0cmVhbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1pbWV0eXBlUmVnRXggPSAvXlteL10rXFwvKD86eC0pPyhbXi9dKykkLztcblxuICAgICAgICBpZiAobWltZXR5cGVSZWdFeC50ZXN0KHNvdXJjZS50eXBlKSkge1xuICAgICAgICAgICAgLy8gaWYgdHlwZSBpcyBnaXZlbiBhcyBhIG1pbWV0eXBlXG4gICAgICAgICAgICBzb3VyY2UubWltZVR5cGUgPSBzb3VyY2UudHlwZTtcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gc291cmNlLnR5cGUucmVwbGFjZShtaW1ldHlwZVJlZ0V4LCAnJDEnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGlzUnRtcChzb3VyY2UuZmlsZSkpe1xuICAgICAgICAgICAgc291cmNlLnR5cGUgPSAncnRtcCc7XG4gICAgICAgIH1lbHNlIGlmKGlzV2ViUlRDKHNvdXJjZS5maWxlKSl7XG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9ICd3ZWJydGMnO1xuICAgICAgICB9ZWxzZSBpZihpc0Rhc2goc291cmNlLmZpbGUsIHNvdXJjZS50eXBlKSl7XG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdkYXNoJztcbiAgICAgICAgfWVsc2UgaWYgKCFzb3VyY2UudHlwZSkge1xuICAgICAgICAgICAgc291cmNlLnR5cGUgPSBleHRyYWN0RXh0ZW5zaW9uKHNvdXJjZS5maWxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc291cmNlLnR5cGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG5vcm1hbGl6ZSB0eXBlc1xuICAgICAgICBzd2l0Y2ggKHNvdXJjZS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdtM3U4JzpcbiAgICAgICAgICAgIGNhc2UgJ3ZuZC5hcHBsZS5tcGVndXJsJzpcbiAgICAgICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdobHMnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbTRhJzpcbiAgICAgICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdhYWMnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnc21pbCc6XG4gICAgICAgICAgICAgICAgc291cmNlLnR5cGUgPSAncnRtcCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgaWYgKHNvdXJjZVtrZXldID09PSAnJykge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBzb3VyY2Vba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNvdXJjZTtcblxuICAgIH1cblxuICAgIHRoYXQuaW5pdFBsYXlsaXN0ID0ocGxheWxpc3QpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQbGF5bGlzdE1hbmFnZXIgc2V0UGxheWxpc3QoKSBcIiwgcGxheWxpc3QpO1xuICAgICAgICBjb25zdCBwcmV0dGllZFBsYXlsaXN0ID0gKF8uaXNBcnJheShwbGF5bGlzdCkgPyBwbGF5bGlzdCA6IFtwbGF5bGlzdF0pLm1hcChmdW5jdGlvbihpdGVtKXtcbiAgICAgICAgICAgIGlmKCFfLmlzQXJyYXkoaXRlbS50cmFja3MpKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGl0ZW0udHJhY2tzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHBsYXlsaXN0SXRlbSA9IE9iamVjdC5hc3NpZ24oe30se1xuICAgICAgICAgICAgICAgIHNvdXJjZXM6IFtdLFxuICAgICAgICAgICAgICAgIHRyYWNrczogW10sXG4gICAgICAgICAgICAgICAgdGl0bGUgOiBcIlwiXG4gICAgICAgICAgICB9LCBpdGVtICk7XG5cbiAgICAgICAgICAgIGlmKChwbGF5bGlzdEl0ZW0uc291cmNlcyA9PT0gT2JqZWN0KHBsYXlsaXN0SXRlbS5zb3VyY2VzKSkgJiYgIV8uaXNBcnJheShwbGF5bGlzdEl0ZW0uc291cmNlcykpIHtcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IFttYWtlUHJldHR5U291cmNlKHBsYXlsaXN0SXRlbS5zb3VyY2VzKV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghXy5pc0FycmF5KHBsYXlsaXN0SXRlbS5zb3VyY2VzKSB8fCBwbGF5bGlzdEl0ZW0uc291cmNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IFttYWtlUHJldHR5U291cmNlKHBsYXlsaXN0SXRlbSldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZighXy5pc0FycmF5KHBsYXlsaXN0SXRlbS5zb3VyY2VzKSB8fCBwbGF5bGlzdEl0ZW0uc291cmNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5sZXZlbHMpIHtcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBpdGVtLmxldmVscztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IFttYWtlUHJldHR5U291cmNlKGl0ZW0pXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHBsYXlsaXN0SXRlbS5zb3VyY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNvdXJjZSA9IHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBwcmV0dHlTb3VyY2UgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGlmICghc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBkZWZhdWx0U291cmNlID0gc291cmNlLmRlZmF1bHQ7XG4gICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRTb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlLmRlZmF1bHQgPSAoZGVmYXVsdFNvdXJjZS50b1N0cmluZygpID09PSAndHJ1ZScpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZS5kZWZhdWx0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHNvdXJjZSBkb2Vzbid0IGhhdmUgYSBsYWJlbCwgbnVtYmVyIGl0XG4gICAgICAgICAgICAgICAgaWYgKCFwbGF5bGlzdEl0ZW0uc291cmNlc1tpXS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXS5sYWJlbCA9IHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldLnR5cGUrXCItXCIraS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHByZXR0eVNvdXJjZSA9IG1ha2VQcmV0dHlTb3VyY2UocGxheWxpc3RJdGVtLnNvdXJjZXNbaV0pO1xuICAgICAgICAgICAgICAgIGlmKHN1cHBvcnRDaGVja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShwcmV0dHlTb3VyY2UpKXtcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0gPSBwcmV0dHlTb3VyY2U7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gcGxheWxpc3RJdGVtLnNvdXJjZXMuZmlsdGVyKHNvdXJjZSA9PiAhIXNvdXJjZSk7XG5cbiAgICAgICAgICAgIGlmKCFwbGF5bGlzdEl0ZW0udGl0bGUgJiYgIHBsYXlsaXN0SXRlbS5zb3VyY2VzWzBdICYmIHBsYXlsaXN0SXRlbS5zb3VyY2VzWzBdLmxhYmVsKXtcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0udGl0bGUgPSBwbGF5bGlzdEl0ZW0uc291cmNlc1swXS5sYWJlbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZGVmYXVsdCDqsIAg7JeG7J2E65WMIHdlYnJ0Y+qwgCDsnojri6TrqbQgd2VicnRjIGRlZmF1bHQgOiB0cnVl66GcIOyekOuPmSDshKTsoJVcbiAgICAgICAgICAgIC8qbGV0IGhhdmVEZWZhdWx0ID0gXy5maW5kKHBsYXlsaXN0SXRlbS5zb3VyY2VzLCBmdW5jdGlvbihzb3VyY2Upe3JldHVybiBzb3VyY2UuZGVmYXVsdCA9PSB0cnVlO30pO1xuICAgICAgICAgICAgbGV0IHdlYnJ0Y1NvdXJjZSA9IFtdO1xuICAgICAgICAgICAgaWYoIWhhdmVEZWZhdWx0KXtcbiAgICAgICAgICAgICAgICB3ZWJydGNTb3VyY2UgPSBfLmZpbmQocGxheWxpc3RJdGVtLnNvdXJjZXMsIGZ1bmN0aW9uKHNvdXJjZSl7cmV0dXJuIHNvdXJjZS50eXBlID09IFwid2VicnRjXCI7fSk7XG4gICAgICAgICAgICAgICAgaWYod2VicnRjU291cmNlKXtcbiAgICAgICAgICAgICAgICAgICAgd2VicnRjU291cmNlLmRlZmF1bHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0qL1xuXG5cblxuICAgICAgICAgICAgaWYoIV8uaXNBcnJheShwbGF5bGlzdEl0ZW0udHJhY2tzKSl7XG4gICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnRyYWNrcyA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoXy5pc0FycmF5KHBsYXlsaXN0SXRlbS5jYXB0aW9ucykpe1xuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS50cmFja3MgPSBwbGF5bGlzdEl0ZW0udHJhY2tzLmNvbmNhdChwbGF5bGlzdEl0ZW0uY2FwdGlvbnMpO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBwbGF5bGlzdEl0ZW0uY2FwdGlvbnM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBsYXlsaXN0SXRlbS50cmFja3MgPSBwbGF5bGlzdEl0ZW0udHJhY2tzLm1hcChmdW5jdGlvbih0cmFjayl7XG4gICAgICAgICAgICAgICAgaWYoIXRyYWNrIHx8ICF0cmFjay5maWxlKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwge1xuICAgICAgICAgICAgICAgICAgICAna2luZCc6ICdjYXB0aW9ucycsXG4gICAgICAgICAgICAgICAgICAgICdkZWZhdWx0JzogZmFsc2VcbiAgICAgICAgICAgICAgICB9LCB0cmFjayk7XG4gICAgICAgICAgICB9KS5maWx0ZXIodHJhY2sgPT4gISF0cmFjayk7XG5cbiAgICAgICAgICAgIHJldHVybiBwbGF5bGlzdEl0ZW07XG4gICAgICAgIH0pLmZpbHRlcihmdW5jdGlvbihpdGVtKXtyZXR1cm4gaXRlbS5zb3VyY2VzICYmIGl0ZW0uc291cmNlcy5sZW5ndGggPiAwO30pfHxbXTtcbiAgICAgICAgc3BlYy5wbGF5bGlzdCA9IHByZXR0aWVkUGxheWxpc3Q7XG4gICAgICAgIHJldHVybiBwcmV0dGllZFBsYXlsaXN0O1xuICAgIH07XG4gICAgdGhhdC5nZXRQbGF5bGlzdCA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIGdldFBsYXlsaXN0KCkgXCIsIHNwZWMucGxheWxpc3QpO1xuICAgICAgICByZXR1cm4gc3BlYy5wbGF5bGlzdDtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Q3VycmVudFBsYXlMaXN0ID0gKCkgPT4ge1xuICAgICAgICBpZihzcGVjLnBsYXlsaXN0W3NwZWMuY3VycmVudEluZGV4XSl7XG4gICAgICAgICAgICByZXR1cm4gc3BlYy5wbGF5bGlzdFtzcGVjLmN1cnJlbnRJbmRleF07XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LmdldEN1cnJlbnRQbGF5bGlzdEluZGV4ID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50SW5kZXg7XG4gICAgfTtcbiAgICB0aGF0LnNldEN1cnJlbnRQbGF5bGlzdCA9IChpbmRleCkgPT4ge1xuICAgICAgICBpZihzcGVjLnBsYXlsaXN0W2luZGV4XSl7XG4gICAgICAgICAgICBzcGVjLmN1cnJlbnRJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihQTEFZTElTVF9DSEFOR0VELCBzcGVjLmN1cnJlbnRJbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudEluZGV4O1xuICAgIH07XG4gICAgdGhhdC5nZXRDdXJyZW50U291cmNlcyA9ICgpID0+IHtcbiAgICAgICAgLy9XZSBkbyBub3Qgc3VwcG9ydCBcIlBMQVlMSVNUXCIgbm90IHlldC4gU28gdGhpcyByZXR1cm5zIHBsYXlsaXN0IG9mIDAuXG4gICAgICAgIGlmKHNwZWMucGxheWxpc3Rbc3BlYy5jdXJyZW50SW5kZXhdKXtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBnZXRDdXJyZW50U291cmNlcygpIFwiLCBzcGVjLnBsYXlsaXN0W3NwZWMuY3VycmVudEluZGV4XS5zb3VyY2VzKTtcbiAgICAgICAgICAgIHJldHVybiBzcGVjLnBsYXlsaXN0W3NwZWMuY3VycmVudEluZGV4XS5zb3VyY2VzO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICB9O1xuICAgIHRoYXQuZ2V0Q3VycmVudEFkVGFnID0gKCkgPT4ge1xuICAgICAgICBpZihzcGVjLnBsYXlsaXN0W3NwZWMuY3VycmVudEluZGV4XSl7XG4gICAgICAgICAgICByZXR1cm4gc3BlYy5wbGF5bGlzdFtzcGVjLmN1cnJlbnRJbmRleF0uYWRUYWdVcmwgfHwgXCJcIjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgTWFuYWdlcjtcbiIsImltcG9ydCBTdXBwb3J0Q2hlY2tlciBmcm9tIFwiYXBpL1N1cHBvcnRDaGVja2VyXCI7XG5pbXBvcnQge0FwaVJ0bXBFeHBhbnNpb259IGZyb20gJ2FwaS9BcGlFeHBhbnNpb25zJztcbmltcG9ydCB7XG4gICAgUFJPVklERVJfSFRNTDUsIFBST1ZJREVSX1dFQlJUQywgUFJPVklERVJfREFTSCwgUFJPVklERVJfSExTLCBQUk9WSURFUl9SVE1QLFxuICAgIEVSUk9SUywgSU5JVF9VTlNVUFBPUlRfRVJST1Jcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBUaGlzIG1hbmFnZXMgcHJvdmlkZXIuXG4gKiBAcGFyYW1cbiAqICovXG5jb25zdCBDb250cm9sbGVyID0gZnVuY3Rpb24oKXtcbiAgICBsZXQgc3VwcG9ydENoYWNrZXIgPSBTdXBwb3J0Q2hlY2tlcigpO1xuICAgIGNvbnN0IFByb3ZpZGVycyA9IHt9O1xuXG4gICAgY29uc3QgdGhhdCA9IHt9O1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBsb2FkZWQuXCIpO1xuXG4gICAgY29uc3QgcmVnaXN0ZVByb3ZpZGVyID0gKG5hbWUsIHByb3ZpZGVyKSA9PntcbiAgICAgICAgaWYoUHJvdmlkZXJzW25hbWVdKXtcbiAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgIH1cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIF9yZWdpc3RlclByb3ZpZGVyKCkgXCIsIG5hbWUpO1xuICAgICAgICBQcm92aWRlcnNbbmFtZV0gPSBwcm92aWRlcjtcbiAgICB9O1xuXG4gICAgY29uc3QgUHJvdmlkZXJMb2FkZXIgPXtcbiAgICAgICAgaHRtbDU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IdG1sNSddLCBmdW5jdGlvbihyZXF1aXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IdG1sNScpLmRlZmF1bHQ7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVQcm92aWRlcihQUk9WSURFUl9IVE1MNSwgcHJvdmlkZXIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7bmFtZSA6IFBST1ZJREVSX0hUTUw1LCBwcm92aWRlciA6IHByb3ZpZGVyfTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcbiAgICAgICAgICAgICAgICB9LCdvdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1J1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgd2VicnRjIDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvV2ViUlRDJ10sIGZ1bmN0aW9uKHJlcXVpcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvaHRtbDUvcHJvdmlkZXJzL1dlYlJUQycpLmRlZmF1bHQ7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVQcm92aWRlcihQUk9WSURFUl9XRUJSVEMsIHByb3ZpZGVyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge25hbWUgOiBQUk9WSURFUl9XRUJSVEMsIHByb3ZpZGVyIDogcHJvdmlkZXJ9O1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xuICAgICAgICAgICAgICAgIH0sJ292ZW5wbGF5ZXIucHJvdmlkZXIuV2ViUlRDUHJvdmlkZXInXG4gICAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICBkYXNoIDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvRGFzaCddLCBmdW5jdGlvbihyZXF1aXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9EYXNoJykuZGVmYXVsdDtcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFBST1ZJREVSX0RBU0gsIHByb3ZpZGVyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge25hbWUgOiBQUk9WSURFUl9EQVNILCBwcm92aWRlciA6IHByb3ZpZGVyfTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcbiAgICAgICAgICAgICAgICB9LCdvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcidcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIGhscyA6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvaHRtbDUvcHJvdmlkZXJzL0hscyddLCBmdW5jdGlvbihyZXF1aXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IbHMnKS5kZWZhdWx0O1xuICAgICAgICAgICAgICAgICAgICByZWdpc3RlUHJvdmlkZXIoUFJPVklERVJfSExTLCBwcm92aWRlcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtuYW1lIDogUFJPVklERVJfSExTLCBwcm92aWRlciA6IHByb3ZpZGVyfTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcbiAgICAgICAgICAgICAgICB9LCdvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgcnRtcCA6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvZmxhc2gvcHJvdmlkZXJzL1J0bXAnXSwgZnVuY3Rpb24ocmVxdWlyZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci9mbGFzaC9wcm92aWRlcnMvUnRtcCcpLmRlZmF1bHQ7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVQcm92aWRlcihQUk9WSURFUl9SVE1QLCBwcm92aWRlcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7bmFtZSA6IFBST1ZJREVSX1JUTVAsIHByb3ZpZGVyIDogcHJvdmlkZXJ9O1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xuICAgICAgICAgICAgICAgIH0sJ292ZW5wbGF5ZXIucHJvdmlkZXIuUnRtcFByb3ZpZGVyJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIHRoYXQubG9hZFByb3ZpZGVycyA9IChwbGF5bGlzdEl0ZW0pID0+e1xuICAgICAgICBjb25zdCBzdXBwb3J0ZWRQcm92aWRlck5hbWVzID0gc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0KHBsYXlsaXN0SXRlbSk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBsb2FkUHJvdmlkZXJzKCkgXCIsIHN1cHBvcnRlZFByb3ZpZGVyTmFtZXMpO1xuICAgICAgICBpZighc3VwcG9ydGVkUHJvdmlkZXJOYW1lcyl7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRVJST1JTW0lOSVRfVU5TVVBQT1JUX0VSUk9SXSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFxuICAgICAgICAgICAgICAgIHN1cHBvcnRlZFByb3ZpZGVyTmFtZXMuZmlsdGVyKGZ1bmN0aW9uKHByb3ZpZGVyTmFtZSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhIVByb3ZpZGVyTG9hZGVyW3Byb3ZpZGVyTmFtZV07XG4gICAgICAgICAgICAgICAgfSkubWFwKGZ1bmN0aW9uKHByb3ZpZGVyTmFtZSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm92aWRlckxvYWRlcltwcm92aWRlck5hbWVdKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICB0aGF0LmZpbmRCeU5hbWUgPSAobmFtZSkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgZmluZEJ5TmFtZSgpIFwiLCBuYW1lKTtcbiAgICAgICAgcmV0dXJuIFByb3ZpZGVyc1tuYW1lXTtcbiAgICB9O1xuXG4gICAgdGhhdC5nZXRQcm92aWRlckJ5U291cmNlID0gKHNvdXJjZSkgPT4ge1xuICAgICAgICBjb25zdCBzdXBwb3J0ZWRQcm92aWRlck5hbWUgPSBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2Uoc291cmNlKTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGdldFByb3ZpZGVyQnlTb3VyY2UoKSBcIiwgc3VwcG9ydGVkUHJvdmlkZXJOYW1lKTtcbiAgICAgICAgcmV0dXJuIHRoYXQuZmluZEJ5TmFtZShzdXBwb3J0ZWRQcm92aWRlck5hbWUpO1xuICAgIH07XG5cbiAgICB0aGF0LmlzU2FtZVByb3ZpZGVyID0gKGN1cnJlbnRTb3VyY2UsIG5ld1NvdXJjZSkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgaXNTYW1lUHJvdmlkZXIoKSBcIiwgc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKGN1cnJlbnRTb3VyY2UpICwgc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKG5ld1NvdXJjZSkgKTtcbiAgICAgICAgcmV0dXJuIHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShjdXJyZW50U291cmNlKSA9PT0gc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKG5ld1NvdXJjZSk7XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29udHJvbGxlcjtcbiIsImltcG9ydCBBUEkgZnJvbSAnYXBpL0FwaSc7XG5pbXBvcnQge2lzV2ViUlRDfSBmcm9tICd1dGlscy92YWxpZGF0b3InO1xuaW1wb3J0IF8gZnJvbSAndXRpbHMvdW5kZXJzY29yZSc7XG5pbXBvcnQgTGEkIGZyb20gJ3V0aWxzL2xpa2VBJCc7XG5pbXBvcnQge2dldFNjcmlwdFBhdGh9IGZyb20gJ3V0aWxzL3dlYnBhY2snO1xuXG5cbl9fd2VicGFja19wdWJsaWNfcGF0aF9fID0gZ2V0U2NyaXB0UGF0aCgnb3ZlbnBsYXllci5zZGsuanMnKTtcblxuLyoqXG4gKiBNYWluIE92ZW5QbGF5ZXJTREsgb2JqZWN0XG4gKi9cbmNvbnN0IE92ZW5QbGF5ZXJTREsgPSB3aW5kb3cuT3ZlblBsYXllclNESyA9IHt9O1xuXG5jb25zdCBwbGF5ZXJMaXN0ID0gT3ZlblBsYXllclNESy5wbGF5ZXJMaXN0ID0gW107XG5cbmV4cG9ydCBjb25zdCBjaGVja0FuZEdldENvbnRhaW5lckVsZW1lbnQgPSBmdW5jdGlvbihjb250YWluZXIpIHtcbiAgICBpZiAoIWNvbnRhaW5lcikge1xuXG4gICAgICAgIC8vIFRPRE8ocm9jayk6IFNob3VsZCBjYXVzZSBhbiBlcnJvci5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgbGV0IGNvbnRhaW5lckVsZW1lbnQgPSBudWxsO1xuXG4gICAgaWYgKHR5cGVvZiBjb250YWluZXIgPT09ICdzdHJpbmcnKSB7XG5cbiAgICAgICAgY29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvbnRhaW5lcik7XG4gICAgfSBlbHNlIGlmIChjb250YWluZXIubm9kZVR5cGUpIHtcblxuICAgICAgICBjb250YWluZXJFbGVtZW50ID0gY29udGFpbmVyO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFRPRE8ocm9jayk6IFNob3VsZCBjYXVzZSBhbiBlcnJvci5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnRhaW5lckVsZW1lbnQ7XG59XG5cbi8qKlxuICogQ3JlYXRlIHBsYXllciBpbnN0YW5jZSBhbmQgcmV0dXJuIGl0LlxuICpcbiAqIEBwYXJhbSAgICAgIHtzdHJpbmcgfCBkb20gZWxlbWVudH0gY29udGFpbmVyICBJZCBvZiBjb250YWluZXIgZWxlbWVudCBvciBjb250YWluZXIgZWxlbWVudFxuICogQHBhcmFtICAgICAge29iamVjdH0gb3B0aW9ucyAgVGhlIG9wdGlvbnNcbiAqL1xuT3ZlblBsYXllclNESy5jcmVhdGUgPSBmdW5jdGlvbihjb250YWluZXIsIG9wdGlvbnMpIHtcblxuICAgIGxldCBjb250YWluZXJFbGVtZW50ID0gY2hlY2tBbmRHZXRDb250YWluZXJFbGVtZW50KGNvbnRhaW5lcik7XG5cbiAgICBjb25zdCBwbGF5ZXJJbnN0YW5jZSA9IEFQSShjb250YWluZXJFbGVtZW50KTtcbiAgICBwbGF5ZXJJbnN0YW5jZS5pbml0KG9wdGlvbnMpO1xuXG4gICAgcGxheWVyTGlzdC5wdXNoKHBsYXllckluc3RhbmNlKTtcblxuICAgIHJldHVybiBwbGF5ZXJJbnN0YW5jZTtcbn07XG5cbi8qKlxuICogR2V0cyB0aGUgcGxheWVyIGluc3RhbmNlIGxpc3QuXG4gKlxuICogQHJldHVybiAgICAge2FycmF5fSAgVGhlIHBsYXllciBsaXN0LlxuICovXG5PdmVuUGxheWVyU0RLLmdldFBsYXllckxpc3QgPSBmdW5jdGlvbigpIHtcblxuICAgIHJldHVybiBwbGF5ZXJMaXN0O1xufTtcblxuLyoqXG4gKiBHZXRzIHRoZSBwbGF5ZXIgaW5zdGFuY2UgYnkgY29udGFpbmVyIGlkLlxuICpcbiAqIEBwYXJhbSAgICAgIHtzdHJpbmd9ICBjb250YWluZXJJZCAgVGhlIGNvbnRhaW5lciBpZGVudGlmaWVyXG4gKiBAcmV0dXJuICAgICB7b2JlamVjdCB8IG51bGx9ICBUaGUgcGxheWVyIGluc3RhbmNlLlxuICovXG5PdmVuUGxheWVyU0RLLmdldFBsYXllckJ5Q29udGFpbmVySWQgPSBmdW5jdGlvbihjb250YWluZXJJZCkge1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5ZXJMaXN0Lmxlbmd0aDsgaSArKykge1xuXG4gICAgICAgIGlmIChwbGF5ZXJMaXN0W2ldLmdldENvbnRhaW5lcklkKCkgPT09IGNvbnRhaW5lcklkKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBwbGF5ZXJMaXN0W2ldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG59O1xuXG4vKipcbiAqIEdldHMgdGhlIHBsYXllciBpbnN0YW5jZSBieSBpbmRleC5cbiAqXG4gKiBAcGFyYW0gICAgICB7bnVtYmVyfSAgaW5kZXggICBUaGUgaW5kZXhcbiAqIEByZXR1cm4gICAgIHtvYmplY3QgfCBudWxsfSAgVGhlIHBsYXllciBpbnN0YW5jZS5cbiAqL1xuT3ZlblBsYXllclNESy5nZXRQbGF5ZXJCeUluZGV4ID0gZnVuY3Rpb24oaW5kZXgpIHtcblxuICAgIGNvbnN0IHBsYXllckluc3RhbmNlID0gcGxheWVyTGlzdFtpbmRleF07XG5cbiAgICBpZiAocGxheWVySW5zdGFuY2UpIHtcblxuICAgICAgICByZXR1cm4gcGxheWVySW5zdGFuY2U7XG4gICAgfSBlbHNlIHtcblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59O1xuXG4vKipcbiAqIFJlbW92ZSB0aGUgcGxheWVyIGluc3RhbmNlIGJ5IHBsYXllcklkLlxuICpcbiAqIEBwYXJhbSAgICAgIHtwbGF5ZXJJZH0gIGlkXG4gKiBAcmV0dXJuICAgICB7bnVsbH1cbiAqL1xuT3ZlblBsYXllclNESy5yZW1vdmVQbGF5ZXIgPSBmdW5jdGlvbihwbGF5ZXJJZCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxheWVyTGlzdC5sZW5ndGg7IGkgKyspIHtcblxuICAgICAgICBpZiAocGxheWVyTGlzdFtpXS5nZXRDb250YWluZXJJZCgpID09PSBwbGF5ZXJJZCkge1xuXG4gICAgICAgICAgICBwbGF5ZXJMaXN0LnNwbGljZShpLCAxKTtcbiAgICAgICAgfVxuICAgIH1cblxufTtcblxuLyoqXG4gKiBHZW5lcmF0ZSB3ZWJydGMgc291cmNlIGZvciBwbGF5ZXIgc291cmNlIHR5cGUuXG4gKlxuICogQHBhcmFtICAgICAge09iamVjdCB8IEFycmF5fSAgc291cmNlICAgd2VicnRjIHNvdXJjZVxuICogQHJldHVybiAgICAge0FycmF5fSAgUGxheWVyIHNvdXJjZSBPYmplY3QuXG4gKi9cbk92ZW5QbGF5ZXJTREsuZ2VuZXJhdGVXZWJydGNVcmxzID0gZnVuY3Rpb24oc291cmNlcykge1xuICAgIHJldHVybiAoXy5pc0FycmF5KHNvdXJjZXMpID8gc291cmNlcyA6IFtzb3VyY2VzXSkubWFwKGZ1bmN0aW9uKHNvdXJjZSwgaW5kZXgpe1xuICAgICAgICBpZihzb3VyY2UuaG9zdCAmJiBpc1dlYlJUQyhzb3VyY2UuaG9zdCkgJiYgc291cmNlLmFwcGxpY2F0aW9uICYmIHNvdXJjZS5zdHJlYW0pe1xuICAgICAgICAgICAgcmV0dXJuIHtmaWxlIDogc291cmNlLmhvc3QgKyBcIi9cIiArIHNvdXJjZS5hcHBsaWNhdGlvbiArIFwiL1wiICsgc291cmNlLnN0cmVhbSwgdHlwZSA6IFwid2VicnRjXCIsIGxhYmVsIDogc291cmNlLmxhYmVsID8gc291cmNlLmxhYmVsIDogXCJ3ZWJydGMtXCIrKGluZGV4KzEpIH07XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbi8qKlxuICogV2hldGhlciBzaG93IHRoZSBwbGF5ZXIgY29yZSBsb2cgb3Igbm90LlxuICpcbiAqIEBwYXJhbSAgICAgIHtib29sZWFufSAgYm9vbGVhbiAgIHJ1biBkZWJ1ZyBtb2RlIG9yIG5vdC5cbiAqIEByZXR1cm4gICAgIHtib29sZWFufSAgcnVuIGRlYnVnIG1vZGUgb3Igbm90LlxuICovXG5PdmVuUGxheWVyU0RLLmRlYnVnID0gZnVuY3Rpb24oaXNEZWJ1Z01vZGUpIHtcbiAgICBpZihpc0RlYnVnTW9kZSl7XG4gICAgICAgIHdpbmRvdy5PdmVuUGxheWVyQ29uc29sZSA9IHtsb2cgOiB3aW5kb3dbJ2NvbnNvbGUnXVsnbG9nJ119O1xuICAgIH1lbHNle1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZVsnbG9nJ10gPSBmdW5jdGlvbigpe307XG4gICAgfVxuICAgIHJldHVybiBpc0RlYnVnTW9kZTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE92ZW5QbGF5ZXJTREs7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyNC4uXG4gKi9cblxuZXhwb3J0IGNvbnN0IGdldEJyb3dzZXJMYW5ndWFnZSA9IGZ1bmN0aW9uKCl7XG4gICAgbGV0IG5hdiA9IHdpbmRvdy5uYXZpZ2F0b3IsXG4gICAgICAgIGJyb3dzZXJMYW5ndWFnZVByb3BlcnR5S2V5cyA9IFsnbGFuZ3VhZ2UnLCAnYnJvd3Nlckxhbmd1YWdlJywgJ3N5c3RlbUxhbmd1YWdlJywgJ3VzZXJMYW5ndWFnZSddLFxuICAgICAgICBpLFxuICAgICAgICBsYW5ndWFnZTtcblxuICAgIC8vIHN1cHBvcnQgZm9yIEhUTUwgNS4xIFwibmF2aWdhdG9yLmxhbmd1YWdlc1wiXG4gICAgaWYgKEFycmF5LmlzQXJyYXkobmF2Lmxhbmd1YWdlcykpIHtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IG5hdi5sYW5ndWFnZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxhbmd1YWdlID0gbmF2Lmxhbmd1YWdlc1tpXTtcbiAgICAgICAgICAgIGlmIChsYW5ndWFnZSAmJiBsYW5ndWFnZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGFuZ3VhZ2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzdXBwb3J0IGZvciBvdGhlciB3ZWxsIGtub3duIHByb3BlcnRpZXMgaW4gYnJvd3NlcnNcbiAgICBmb3IgKGkgPSAwOyBpIDwgYnJvd3Nlckxhbmd1YWdlUHJvcGVydHlLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxhbmd1YWdlID0gbmF2W2Jyb3dzZXJMYW5ndWFnZVByb3BlcnR5S2V5c1tpXV07XG4gICAgICAgIGlmIChsYW5ndWFnZSAmJiBsYW5ndWFnZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBsYW5ndWFnZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xufTtcbmV4cG9ydCBjb25zdCBhbmFsVXNlckFnZW50ID0gZnVuY3Rpb24oKXtcbiAgICBsZXQgdW5rbm93biA9ICctJztcblxuICAgIC8vIHNjcmVlblxuICAgIGxldCBzY3JlZW5TaXplID0gJyc7XG4gICAgaWYgKHNjcmVlbi53aWR0aCkge1xuICAgICAgICBsZXQgd2lkdGggPSAoc2NyZWVuLndpZHRoKSA/IHNjcmVlbi53aWR0aCA6ICcnO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gKHNjcmVlbi5oZWlnaHQpID8gc2NyZWVuLmhlaWdodCA6ICcnO1xuICAgICAgICBzY3JlZW5TaXplICs9ICcnICsgd2lkdGggKyBcIiB4IFwiICsgaGVpZ2h0O1xuICAgIH1cblxuICAgIC8vIGJyb3dzZXJcbiAgICBsZXQgblZlciA9IG5hdmlnYXRvci5hcHBWZXJzaW9uO1xuICAgIGxldCBuQWd0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgICBsZXQgYnJvd3NlciA9IG5hdmlnYXRvci5hcHBOYW1lO1xuICAgIGxldCB2ZXJzaW9uID0gJycgKyBwYXJzZUZsb2F0KG5hdmlnYXRvci5hcHBWZXJzaW9uKTtcbiAgICBsZXQgbWFqb3JWZXJzaW9uID0gcGFyc2VJbnQobmF2aWdhdG9yLmFwcFZlcnNpb24sIDEwKTtcbiAgICBsZXQgaXNXZWJ2aWV3ID0gZmFsc2U7XG4gICAgbGV0IG5hbWVPZmZzZXQsIHZlck9mZnNldCwgaXg7XG5cbiAgICAvLyBPcGVyYVxuICAgIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdPcGVyYScpKSAhPSAtMSkge1xuICAgICAgICBicm93c2VyID0gJ09wZXJhJztcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDYpO1xuICAgICAgICBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignVmVyc2lvbicpKSAhPSAtMSkge1xuICAgICAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIE9wZXJhIE5leHRcbiAgICBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignT1BSJykpICE9IC0xKSB7XG4gICAgICAgIGJyb3dzZXIgPSAnT3BlcmEnO1xuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNCk7XG4gICAgfVxuICAgIC8v7IK87ISxIOu4jOudvOyasOyggFxuICAgIGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ1NhbXN1bmdCcm93c2VyJykpICE9IC0xKSB7XG4gICAgICAgIGJyb3dzZXIgPSAnU2Ftc3VuZ0Jyb3dzZXInO1xuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgMTUpO1xuICAgIH1cbiAgICAvLyBFZGdlXG4gICAgZWxzZSBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignRWRnZScpKSAhPSAtMSkge1xuICAgICAgICBicm93c2VyID0gJ01pY3Jvc29mdCBFZGdlJztcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDUpO1xuICAgIH1cbiAgICAvLyBNU0lFXG4gICAgZWxzZSBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignTVNJRScpKSAhPSAtMSkge1xuICAgICAgICBicm93c2VyID0gJ01pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3Jlcic7XG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA1KTtcblxuXG4gICAgICAgIC8vd2luNyBJRTExIHVzZXJBZ2VudCBpcyB1Z2x5Li4uLlxuICAgICAgICBpZiggKG5BZ3QuaW5kZXhPZignVHJpZGVudC8nKSAhPT0gLTEpICYmIChuQWd0LmluZGV4T2YoJ3J2OicpICE9PSAtMSkgICl7XG4gICAgICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcobkFndC5pbmRleE9mKCdydjonKSArIDMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIENocm9tZVxuICAgIGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ0Nocm9tZScpKSAhPSAtMSkge1xuICAgICAgICBicm93c2VyID0gJ0Nocm9tZSc7XG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA3KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignQ3JpT1MnKSkgIT0gLTEpIHsgICAvL2lwaG9uZSAtIGNocm9tZVxuICAgICAgICBicm93c2VyID0gJ0Nocm9tZSc7XG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA2KTtcbiAgICB9XG4gICAgLy8gRmlyZWZveFxuICAgIGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ0ZpcmVmb3gnKSkgIT0gLTEpIHtcbiAgICAgICAgYnJvd3NlciA9ICdGaXJlZm94JztcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDgpO1xuICAgIH1cbiAgICBlbHNlIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdGeGlPUycpKSAhPSAtMSkge1xuICAgICAgICBicm93c2VyID0gJ0ZpcmVmb3gnO1xuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNik7XG4gICAgfVxuICAgIC8vIFNhZmFyaVxuICAgIGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ1NhZmFyaScpKSAhPSAtMSkge1xuICAgICAgICBicm93c2VyID0gJ1NhZmFyaSc7XG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA3KTtcbiAgICAgICAgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ1ZlcnNpb24nKSkgIT0gLTEpIHtcbiAgICAgICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA4KTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8gTVNJRSAxMStcbiAgICBlbHNlIGlmIChuQWd0LmluZGV4T2YoJ1RyaWRlbnQvJykgIT09IC0xKSB7XG4gICAgICAgIGJyb3dzZXIgPSAnTWljcm9zb2Z0IEludGVybmV0IEV4cGxvcmVyJztcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKG5BZ3QuaW5kZXhPZigncnY6JykgKyAzKTtcbiAgICB9XG4gICAgLy8gT3RoZXIgYnJvd3NlcnNcbiAgICBlbHNlIGlmICgobmFtZU9mZnNldCA9IG5BZ3QubGFzdEluZGV4T2YoJyAnKSArIDEpIDwgKHZlck9mZnNldCA9IG5BZ3QubGFzdEluZGV4T2YoJy8nKSkpIHtcbiAgICAgICAgYnJvd3NlciA9IG5BZ3Quc3Vic3RyaW5nKG5hbWVPZmZzZXQsIHZlck9mZnNldCk7XG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyAxKTtcbiAgICAgICAgaWYgKGJyb3dzZXIudG9Mb3dlckNhc2UoKSA9PSBicm93c2VyLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgICAgICAgIGJyb3dzZXIgPSBuYXZpZ2F0b3IuYXBwTmFtZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZihuQWd0LmluZGV4T2YoJyB3dicpID4gMCl7XG4gICAgICAgIGlzV2VidmlldyA9IHRydWU7XG4gICAgfVxuICAgIC8vIHRyaW0gdGhlIHZlcnNpb24gc3RyaW5nXG4gICAgaWYgKChpeCA9IHZlcnNpb24uaW5kZXhPZignOycpKSAhPSAtMSkgdmVyc2lvbiA9IHZlcnNpb24uc3Vic3RyaW5nKDAsIGl4KTtcbiAgICBpZiAoKGl4ID0gdmVyc2lvbi5pbmRleE9mKCcgJykpICE9IC0xKSB2ZXJzaW9uID0gdmVyc2lvbi5zdWJzdHJpbmcoMCwgaXgpO1xuICAgIGlmICgoaXggPSB2ZXJzaW9uLmluZGV4T2YoJyknKSkgIT0gLTEpIHZlcnNpb24gPSB2ZXJzaW9uLnN1YnN0cmluZygwLCBpeCk7XG5cbiAgICBtYWpvclZlcnNpb24gPSBwYXJzZUludCgnJyArIHZlcnNpb24sIDEwKTtcbiAgICBpZiAoaXNOYU4obWFqb3JWZXJzaW9uKSkge1xuICAgICAgICB2ZXJzaW9uID0gJycgKyBwYXJzZUZsb2F0KG5hdmlnYXRvci5hcHBWZXJzaW9uKTtcbiAgICAgICAgbWFqb3JWZXJzaW9uID0gcGFyc2VJbnQobmF2aWdhdG9yLmFwcFZlcnNpb24sIDEwKTtcbiAgICB9XG5cbiAgICAvLyBtb2JpbGUgdmVyc2lvblxuICAgIHZhciBtb2JpbGUgPSAvTW9iaWxlfG1pbml8RmVubmVjfEFuZHJvaWR8aVAoYWR8b2R8aG9uZSkvLnRlc3QoblZlcik7XG5cbiAgICAvLyBjb29raWVcbiAgICB2YXIgY29va2llRW5hYmxlZCA9IChuYXZpZ2F0b3IuY29va2llRW5hYmxlZCkgPyB0cnVlIDogZmFsc2U7XG5cbiAgICBpZiAodHlwZW9mIG5hdmlnYXRvci5jb29raWVFbmFibGVkID09ICd1bmRlZmluZWQnICYmICFjb29raWVFbmFibGVkKSB7XG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9ICd0ZXN0Y29va2llJztcbiAgICAgICAgY29va2llRW5hYmxlZCA9IChkb2N1bWVudC5jb29raWUuaW5kZXhPZigndGVzdGNvb2tpZScpICE9IC0xKSA/IHRydWUgOiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBzeXN0ZW1cbiAgICB2YXIgb3MgPSB1bmtub3duO1xuICAgIHZhciBjbGllbnRTdHJpbmdzID0gW1xuICAgICAgICB7czonV2luZG93cyAxMCcsIHI6LyhXaW5kb3dzIDEwLjB8V2luZG93cyBOVCAxMC4wKS99LFxuICAgICAgICB7czonV2luZG93cyA4LjEnLCByOi8oV2luZG93cyA4LjF8V2luZG93cyBOVCA2LjMpL30sXG4gICAgICAgIHtzOidXaW5kb3dzIDgnLCByOi8oV2luZG93cyA4fFdpbmRvd3MgTlQgNi4yKS99LFxuICAgICAgICB7czonV2luZG93cyA3JywgcjovKFdpbmRvd3MgN3xXaW5kb3dzIE5UIDYuMSkvfSxcbiAgICAgICAge3M6J1dpbmRvd3MgVmlzdGEnLCByOi9XaW5kb3dzIE5UIDYuMC99LFxuICAgICAgICB7czonV2luZG93cyBTZXJ2ZXIgMjAwMycsIHI6L1dpbmRvd3MgTlQgNS4yL30sXG4gICAgICAgIHtzOidXaW5kb3dzIFhQJywgcjovKFdpbmRvd3MgTlQgNS4xfFdpbmRvd3MgWFApL30sXG4gICAgICAgIHtzOidXaW5kb3dzIDIwMDAnLCByOi8oV2luZG93cyBOVCA1LjB8V2luZG93cyAyMDAwKS99LFxuICAgICAgICB7czonV2luZG93cyBNRScsIHI6LyhXaW4gOXggNC45MHxXaW5kb3dzIE1FKS99LFxuICAgICAgICB7czonV2luZG93cyA5OCcsIHI6LyhXaW5kb3dzIDk4fFdpbjk4KS99LFxuICAgICAgICB7czonV2luZG93cyA5NScsIHI6LyhXaW5kb3dzIDk1fFdpbjk1fFdpbmRvd3NfOTUpL30sXG4gICAgICAgIHtzOidXaW5kb3dzIE5UIDQuMCcsIHI6LyhXaW5kb3dzIE5UIDQuMHxXaW5OVDQuMHxXaW5OVHxXaW5kb3dzIE5UKS99LFxuICAgICAgICB7czonV2luZG93cyBDRScsIHI6L1dpbmRvd3MgQ0UvfSxcbiAgICAgICAge3M6J1dpbmRvd3MgMy4xMScsIHI6L1dpbjE2L30sXG4gICAgICAgIHtzOidBbmRyb2lkJywgcjovQW5kcm9pZC99LFxuICAgICAgICB7czonT3BlbiBCU0QnLCByOi9PcGVuQlNEL30sXG4gICAgICAgIHtzOidTdW4gT1MnLCByOi9TdW5PUy99LFxuICAgICAgICB7czonTGludXgnLCByOi8oTGludXh8WDExKS99LFxuICAgICAgICB7czonaU9TJywgcjovKGlQaG9uZXxpUGFkfGlQb2QpL30sXG4gICAgICAgIHtzOidNYWMgT1MgWCcsIHI6L01hYyBPUyBYL30sXG4gICAgICAgIHtzOidNYWMgT1MnLCByOi8oTWFjUFBDfE1hY0ludGVsfE1hY19Qb3dlclBDfE1hY2ludG9zaCkvfSxcbiAgICAgICAge3M6J1FOWCcsIHI6L1FOWC99LFxuICAgICAgICB7czonVU5JWCcsIHI6L1VOSVgvfSxcbiAgICAgICAge3M6J0JlT1MnLCByOi9CZU9TL30sXG4gICAgICAgIHtzOidPUy8yJywgcjovT1NcXC8yL30sXG4gICAgICAgIHtzOidTZWFyY2ggQm90JywgcjovKG51aGt8R29vZ2xlYm90fFlhbW15Ym90fE9wZW5ib3R8U2x1cnB8TVNOQm90fEFzayBKZWV2ZXNcXC9UZW9tYXxpYV9hcmNoaXZlcikvfVxuICAgIF07XG4gICAgZm9yICh2YXIgaWQgaW4gY2xpZW50U3RyaW5ncykge1xuICAgICAgICB2YXIgY3MgPSBjbGllbnRTdHJpbmdzW2lkXTtcbiAgICAgICAgaWYgKGNzLnIudGVzdChuQWd0KSkge1xuICAgICAgICAgICAgb3MgPSBjcy5zO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgb3NWZXJzaW9uID0gdW5rbm93bjtcblxuICAgIGlmICgvV2luZG93cy8udGVzdChvcykpIHtcbiAgICAgICAgb3NWZXJzaW9uID0gL1dpbmRvd3MgKC4qKS8uZXhlYyhvcylbMV07XG4gICAgICAgIG9zID0gJ1dpbmRvd3MnO1xuICAgIH1cblxuICAgIHN3aXRjaCAob3MpIHtcbiAgICAgICAgY2FzZSAnTWFjIE9TIFgnOlxuICAgICAgICAgICAgb3NWZXJzaW9uID0gL01hYyBPUyBYICgxMFtcXC5cXF9cXGRdKykvLmV4ZWMobkFndClbMV07XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBbmRyb2lkJzpcbiAgICAgICAgICAgIG9zVmVyc2lvbiA9IC9BbmRyb2lkIChbXFwuXFxfXFxkXSspLy5leGVjKG5BZ3QpWzFdO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnaU9TJzpcbiAgICAgICAgICAgIG9zVmVyc2lvbiA9IC9PUyAoXFxkKylfKFxcZCspXz8oXFxkKyk/Ly5leGVjKG5WZXIpO1xuICAgICAgICAgICAgb3NWZXJzaW9uID0gb3NWZXJzaW9uWzFdICsgJy4nICsgb3NWZXJzaW9uWzJdICsgJy4nICsgKG9zVmVyc2lvblszXSB8IDApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgLy8gZmxhc2ggKHlvdSdsbCBuZWVkIHRvIGluY2x1ZGUgc3dmb2JqZWN0KVxuICAgIC8qIHNjcmlwdCBzcmM9XCIvL2FqYXguZ29vZ2xlYXBpcy5jb20vYWpheC9saWJzL3N3Zm9iamVjdC8yLjIvc3dmb2JqZWN0LmpzXCIgKi9cbiAgICB2YXIgZmxhc2hWZXJzaW9uID0gJ25vIGNoZWNrJztcbiAgICBpZiAodHlwZW9mIHN3Zm9iamVjdCAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgZnYgPSBzd2ZvYmplY3QuZ2V0Rmxhc2hQbGF5ZXJWZXJzaW9uKCk7XG4gICAgICAgIGlmIChmdi5tYWpvciA+IDApIHtcbiAgICAgICAgICAgIGZsYXNoVmVyc2lvbiA9IGZ2Lm1ham9yICsgJy4nICsgZnYubWlub3IgKyAnIHInICsgZnYucmVsZWFzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlICB7XG4gICAgICAgICAgICBmbGFzaFZlcnNpb24gPSB1bmtub3duO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHNjcmVlbjogc2NyZWVuU2l6ZSxcbiAgICAgICAgYnJvd3NlcjogYnJvd3NlcixcbiAgICAgICAgYnJvd3NlclZlcnNpb246IHZlcnNpb24sXG4gICAgICAgIGJyb3dzZXJNYWpvclZlcnNpb246IG1ham9yVmVyc2lvbixcbiAgICAgICAgbW9iaWxlOiBtb2JpbGUsXG4gICAgICAgIHVhIDogbkFndCxcbiAgICAgICAgb3M6IG9zLFxuICAgICAgICBvc1ZlcnNpb246IG9zVmVyc2lvbixcbiAgICAgICAgY29va2llczogY29va2llRW5hYmxlZCxcbiAgICAgICAgZmxhc2hWZXJzaW9uOiBmbGFzaFZlcnNpb24sXG4gICAgICAgIHdlYnZpZXcgOiBpc1dlYnZpZXdcbiAgICB9O1xufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMgdnR0LmpzIENvbnRyaWJ1dG9yc1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbmxldCBWVFRDdWUgPSB3aW5kb3cuVlRUQ3VlO1xuXG52YXIgYXV0b0tleXdvcmQgPSBcImF1dG9cIjtcbnZhciBkaXJlY3Rpb25TZXR0aW5nID0ge1xuICAgIFwiXCI6IHRydWUsXG4gICAgXCJsclwiOiB0cnVlLFxuICAgIFwicmxcIjogdHJ1ZVxufTtcbnZhciBhbGlnblNldHRpbmcgPSB7XG4gICAgXCJzdGFydFwiOiB0cnVlLFxuICAgIFwibWlkZGxlXCI6IHRydWUsXG4gICAgXCJlbmRcIjogdHJ1ZSxcbiAgICBcImxlZnRcIjogdHJ1ZSxcbiAgICBcInJpZ2h0XCI6IHRydWVcbn07XG5cbmZ1bmN0aW9uIGZpbmREaXJlY3Rpb25TZXR0aW5nKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciBkaXIgPSBkaXJlY3Rpb25TZXR0aW5nW3ZhbHVlLnRvTG93ZXJDYXNlKCldO1xuICAgIHJldHVybiBkaXIgPyB2YWx1ZS50b0xvd2VyQ2FzZSgpIDogZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGZpbmRBbGlnblNldHRpbmcodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIGFsaWduID0gYWxpZ25TZXR0aW5nW3ZhbHVlLnRvTG93ZXJDYXNlKCldO1xuICAgIHJldHVybiBhbGlnbiA/IHZhbHVlLnRvTG93ZXJDYXNlKCkgOiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZXh0ZW5kKG9iaikge1xuICAgIHZhciBpID0gMTtcbiAgICBmb3IgKDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY29iaiA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgZm9yICh2YXIgcCBpbiBjb2JqKSB7XG4gICAgICAgICAgICBvYmpbcF0gPSBjb2JqW3BdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbn1cbmlmKCFWVFRDdWUpe1xuICAgIFZUVEN1ZSA9IGZ1bmN0aW9uIChzdGFydFRpbWUsIGVuZFRpbWUsIHRleHQpIHtcbiAgICAgICAgdmFyIGN1ZSA9IHRoaXM7XG4gICAgICAgIHZhciBpc0lFOCA9ICgvTVNJRVxcczhcXC4wLykudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICAgICAgdmFyIGJhc2VPYmogPSB7fTtcblxuICAgICAgICBpZiAoaXNJRTgpIHtcbiAgICAgICAgICAgIGN1ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2N1c3RvbScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYmFzZU9iai5lbnVtZXJhYmxlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTaGltIGltcGxlbWVudGF0aW9uIHNwZWNpZmljIHByb3BlcnRpZXMuIFRoZXNlIHByb3BlcnRpZXMgYXJlIG5vdCBpblxuICAgICAgICAgKiB0aGUgc3BlYy5cbiAgICAgICAgICovXG5cbiAgICAgICAgICAgIC8vIExldHMgdXMga25vdyB3aGVuIHRoZSBWVFRDdWUncyBkYXRhIGhhcyBjaGFuZ2VkIGluIHN1Y2ggYSB3YXkgdGhhdCB3ZSBuZWVkXG4gICAgICAgICAgICAvLyB0byByZWNvbXB1dGUgaXRzIGRpc3BsYXkgc3RhdGUuIFRoaXMgbGV0cyB1cyBjb21wdXRlIGl0cyBkaXNwbGF5IHN0YXRlXG4gICAgICAgICAgICAvLyBsYXppbHkuXG4gICAgICAgIGN1ZS5oYXNCZWVuUmVzZXQgPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVlRUQ3VlIGFuZCBUZXh0VHJhY2tDdWUgcHJvcGVydGllc1xuICAgICAgICAgKiBodHRwOi8vZGV2LnczLm9yZy9odG1sNS93ZWJ2dHQvI3Z0dGN1ZS1pbnRlcmZhY2VcbiAgICAgICAgICovXG5cbiAgICAgICAgdmFyIF9pZCA9IFwiXCI7XG4gICAgICAgIHZhciBfcGF1c2VPbkV4aXQgPSBmYWxzZTtcbiAgICAgICAgdmFyIF9zdGFydFRpbWUgPSBzdGFydFRpbWU7XG4gICAgICAgIHZhciBfZW5kVGltZSA9IGVuZFRpbWU7XG4gICAgICAgIHZhciBfdGV4dCA9IHRleHQ7XG4gICAgICAgIHZhciBfcmVnaW9uID0gbnVsbDtcbiAgICAgICAgdmFyIF92ZXJ0aWNhbCA9IFwiXCI7XG4gICAgICAgIHZhciBfc25hcFRvTGluZXMgPSB0cnVlO1xuICAgICAgICB2YXIgX2xpbmUgPSBcImF1dG9cIjtcbiAgICAgICAgdmFyIF9saW5lQWxpZ24gPSBcInN0YXJ0XCI7XG4gICAgICAgIHZhciBfcG9zaXRpb24gPSA1MDtcbiAgICAgICAgdmFyIF9wb3NpdGlvbkFsaWduID0gXCJtaWRkbGVcIjtcbiAgICAgICAgdmFyIF9zaXplID0gNTA7XG4gICAgICAgIHZhciBfYWxpZ24gPSBcIm1pZGRsZVwiO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXG4gICAgICAgICAgICBcImlkXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfaWQ7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIF9pZCA9IFwiXCIgKyB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcbiAgICAgICAgICAgIFwicGF1c2VPbkV4aXRcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9wYXVzZU9uRXhpdDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgX3BhdXNlT25FeGl0ID0gISF2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcbiAgICAgICAgICAgIFwic3RhcnRUaW1lXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfc3RhcnRUaW1lO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3RhcnQgdGltZSBtdXN0IGJlIHNldCB0byBhIG51bWJlci5cIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgX3N0YXJ0VGltZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXG4gICAgICAgICAgICBcImVuZFRpbWVcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9lbmRUaW1lO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRW5kIHRpbWUgbXVzdCBiZSBzZXQgdG8gYSBudW1iZXIuXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF9lbmRUaW1lID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcbiAgICAgICAgICAgIFwidGV4dFwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RleHQ7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIF90ZXh0ID0gXCJcIiArIHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXG4gICAgICAgICAgICBcInJlZ2lvblwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZ2lvbjtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgX3JlZ2lvbiA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXG4gICAgICAgICAgICBcInZlcnRpY2FsXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdmVydGljYWw7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzZXR0aW5nID0gZmluZERpcmVjdGlvblNldHRpbmcodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAvLyBIYXZlIHRvIGNoZWNrIGZvciBmYWxzZSBiZWNhdXNlIHRoZSBzZXR0aW5nIGFuIGJlIGFuIGVtcHR5IHN0cmluZy5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHNldHRpbmcgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJBbiBpbnZhbGlkIG9yIGlsbGVnYWwgc3RyaW5nIHdhcyBzcGVjaWZpZWQuXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF92ZXJ0aWNhbCA9IHNldHRpbmc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcbiAgICAgICAgICAgIFwic25hcFRvTGluZXNcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9zbmFwVG9MaW5lcztcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgX3NuYXBUb0xpbmVzID0gISF2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxuICAgICAgICAgICAgXCJsaW5lXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfbGluZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJudW1iZXJcIiAmJiB2YWx1ZSAhPT0gYXV0b0tleXdvcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihcIkFuIGludmFsaWQgbnVtYmVyIG9yIGlsbGVnYWwgc3RyaW5nIHdhcyBzcGVjaWZpZWQuXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF9saW5lID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcbiAgICAgICAgICAgIFwibGluZUFsaWduXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfbGluZUFsaWduO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2V0dGluZyA9IGZpbmRBbGlnblNldHRpbmcodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXNldHRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihcIkFuIGludmFsaWQgb3IgaWxsZWdhbCBzdHJpbmcgd2FzIHNwZWNpZmllZC5cIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgX2xpbmVBbGlnbiA9IHNldHRpbmc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcbiAgICAgICAgICAgIFwicG9zaXRpb25cIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9wb3NpdGlvbjtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlIDwgMCB8fCB2YWx1ZSA+IDEwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUG9zaXRpb24gbXVzdCBiZSBiZXR3ZWVuIDAgYW5kIDEwMC5cIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgX3Bvc2l0aW9uID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcbiAgICAgICAgICAgIFwicG9zaXRpb25BbGlnblwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3Bvc2l0aW9uQWxpZ247XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzZXR0aW5nID0gZmluZEFsaWduU2V0dGluZyh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghc2V0dGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKFwiQW4gaW52YWxpZCBvciBpbGxlZ2FsIHN0cmluZyB3YXMgc3BlY2lmaWVkLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfcG9zaXRpb25BbGlnbiA9IHNldHRpbmc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcbiAgICAgICAgICAgIFwic2l6ZVwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3NpemU7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA8IDAgfHwgdmFsdWUgPiAxMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlNpemUgbXVzdCBiZSBiZXR3ZWVuIDAgYW5kIDEwMC5cIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgX3NpemUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxuICAgICAgICAgICAgXCJhbGlnblwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2FsaWduO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2V0dGluZyA9IGZpbmRBbGlnblNldHRpbmcodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXNldHRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihcIkFuIGludmFsaWQgb3IgaWxsZWdhbCBzdHJpbmcgd2FzIHNwZWNpZmllZC5cIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgX2FsaWduID0gc2V0dGluZztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogT3RoZXIgPHRyYWNrPiBzcGVjIGRlZmluZWQgcHJvcGVydGllc1xuICAgICAgICAgKi9cblxuICAgICAgICAgICAgLy8gaHR0cDovL3d3dy53aGF0d2cub3JnL3NwZWNzL3dlYi1hcHBzL2N1cnJlbnQtd29yay9tdWx0aXBhZ2UvdGhlLXZpZGVvLWVsZW1lbnQuaHRtbCN0ZXh0LXRyYWNrLWN1ZS1kaXNwbGF5LXN0YXRlXG4gICAgICAgIGN1ZS5kaXNwbGF5U3RhdGUgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgaWYgKGlzSUU4KSB7XG4gICAgICAgICAgICByZXR1cm4gY3VlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVlRUQ3VlIG1ldGhvZHNcbiAgICAgKi9cblxuICAgIFZUVEN1ZS5wcm90b3R5cGUuZ2V0Q3VlQXNIVE1MID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIEFzc3VtZSBXZWJWVFQuY29udmVydEN1ZVRvRE9NVHJlZSBpcyBvbiB0aGUgZ2xvYmFsLlxuICAgICAgICByZXR1cm4gV2ViVlRULmNvbnZlcnRDdWVUb0RPTVRyZWUod2luZG93LCB0aGlzLnRleHQpO1xuICAgIH07XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFZUVEN1ZTsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAyMy4uXG4gKi9cbmltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XG5cbi8qKlxuICogQGJyaWVmICAgSXQgd2FzIHJlcGxhY2UganF1ZXJ5J3Mgc2VsZWN0b3IuIEl0IE9mdGVuIHVzZWQgYnkgT3ZlblRlbXBsYXRlLiAoL3ZpZXcvZW5naW5lL092ZW5UZW1wbGF0ZS5qcylcbiAqIEBwYXJhbSAgIHNlbGVjdG9yT3JFbGVtZW50ICBzdHJpbmcgb3IgZWxlbWVudFxuICpcbiAqICovXG5cblxuY29uc3QgTGEkID0gZnVuY3Rpb24oc2VsZWN0b3JPckVsZW1lbnQpe1xuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICBjb25zdCByZXR1cm5Ob2RlID0gZnVuY3Rpb24oJGVsZW1lbnQgLCBzZWxlY3Rvcil7XG4gICAgICAgIGxldCBub2RlTGlzdCA9ICAkZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICAgICAgaWYobm9kZUxpc3QubGVuZ3RoID4gMSl7XG4gICAgICAgICAgICByZXR1cm4gbm9kZUxpc3Q7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIG5vZGVMaXN0WzBdO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgbGV0ICRlbGVtZW50ID0gXCJcIjtcblxuICAgIGlmKCBfLmlzRWxlbWVudChzZWxlY3Rvck9yRWxlbWVudCkgfHwgXy5ldmVyeShzZWxlY3Rvck9yRWxlbWVudCwgZnVuY3Rpb24oaXRlbSl7cmV0dXJuIF8uaXNFbGVtZW50KGl0ZW0pfSkpe1xuICAgICAgICAkZWxlbWVudCA9IHNlbGVjdG9yT3JFbGVtZW50O1xuICAgIH1lbHNlIGlmKHNlbGVjdG9yT3JFbGVtZW50ID09PSBcImRvY3VtZW50XCIpe1xuICAgICAgICAkZWxlbWVudCA9IGRvY3VtZW50O1xuICAgIH1lbHNlIGlmKHNlbGVjdG9yT3JFbGVtZW50ID09PSBcIndpbmRvd1wiKXtcbiAgICAgICAgJGVsZW1lbnQgPSB3aW5kb3c7XG4gICAgfWVsc2V7XG4gICAgICAgICRlbGVtZW50ID0gcmV0dXJuTm9kZShkb2N1bWVudCwgc2VsZWN0b3JPckVsZW1lbnQpO1xuICAgIH1cblxuXG4gICAgaWYoISRlbGVtZW50KXtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdGhhdC5maW5kID0gKHNlbGVjdG9yKSA9PntcbiAgICAgICAgcmV0dXJuIExhJChyZXR1cm5Ob2RlKCRlbGVtZW50LCBzZWxlY3RvcikpO1xuICAgIH07XG5cbiAgICB0aGF0LmNzcyA9IChuYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgICBpZigkZWxlbWVudC5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICRlbGVtZW50LmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCl7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZVtuYW1lXSA9IHZhbHVlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAkZWxlbWVudC5zdHlsZVtuYW1lXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoYXQuYWRkQ2xhc3MgPSAobmFtZSkgPT57XG4gICAgICAgIGlmKCRlbGVtZW50LmNsYXNzTGlzdCl7XG4gICAgICAgICAgICAkZWxlbWVudC5jbGFzc0xpc3QuYWRkKG5hbWUpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGxldCBjbGFzc05hbWVzID0gJGVsZW1lbnQuY2xhc3NOYW1lLnNwbGl0KFwiIFwiKTtcbiAgICAgICAgICAgIGlmKGNsYXNzTmFtZXMuaW5kZXhPZihuYW1lKSA9PT0gLTEpe1xuICAgICAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTmFtZSArPSBcIiBcIiArIG5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICB0aGF0LnJlbW92ZUNsYXNzID0gKG5hbWUpID0+e1xuICAgICAgICBpZiAoJGVsZW1lbnQuY2xhc3NMaXN0KXtcbiAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUobmFtZSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgJGVsZW1lbnQuY2xhc3NOYW1lID0gJGVsZW1lbnQuY2xhc3NOYW1lLnJlcGxhY2UobmV3IFJlZ0V4cCgnKF58XFxcXGIpJyArIG5hbWUuc3BsaXQoJyAnKS5qb2luKCd8JykgKyAnKFxcXFxifCQpJywgJ2dpJyksICcgJyk7XG5cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0LnJlbW92ZUF0dHJpYnV0ZSA9IChhdHRyTmFtZSkgPT4ge1xuICAgICAgICAkZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0ck5hbWUpO1xuICAgIH07XG5cbiAgICB0aGF0LnNob3cgPSAoKSA9PntcbiAgICAgICAgJGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfTtcblxuICAgIHRoYXQuaGlkZSA9ICgpID0+e1xuICAgICAgICAkZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH07XG5cbiAgICAvKnRoYXQuYXBwZW5kID0gKGh0bWxDb2RlKSA9PntcbiAgICAgICAgJGVsZW1lbnQuaW5uZXJIVE1MICs9IGh0bWxDb2RlO1xuICAgIH07Ki9cblxuICAgIHRoYXQudGV4dCA9ICh0ZXh0KSA9PiB7IC8vSUU4K1xuICAgICAgICBpZih0ZXh0ID09PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgcmV0dXJuICRlbGVtZW50LnRleHRDb250ZW50O1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICRlbGVtZW50LnRleHRDb250ZW50ID0gdGV4dDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhhdC5odG1sID0gKHRleHQpID0+IHtcbiAgICAgICAgJGVsZW1lbnQuaW5uZXJIVE1MID0gdGV4dDtcbiAgICB9O1xuICAgIHRoYXQuaGFzQ2xhc3MgPSAobmFtZSkgPT4geyAvL0lFOCtcbiAgICAgICAgaWYoJGVsZW1lbnQuY2xhc3NMaXN0KXtcbiAgICAgICAgICAgIHJldHVybiAkZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMobmFtZSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoJyhefCApJyArIG5hbWUgKyAnKCB8JCknLCAnZ2knKS50ZXN0KCRlbGVtZW50Lm5hbWUpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoYXQuaXMgPSAoJHRhcmdldEVsZW1lbnQpID0+IHtcbiAgICAgICAgcmV0dXJuICRlbGVtZW50ID09PSAkdGFyZ2V0RWxlbWVudDtcbiAgICB9O1xuXG4gICAgdGhhdC5vZmZzZXQgPSAoKSA9PnsgICAgLy9JRTgrXG4gICAgICAgIHZhciByZWN0ID0gJGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvcDogcmVjdC50b3AgKyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCxcbiAgICAgICAgICAgIGxlZnQ6IHJlY3QubGVmdCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdFxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoYXQud2lkdGggPSAoKSA9PiB7ICAgIC8vSUU4K1xuICAgICAgICByZXR1cm4gJGVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgfTtcblxuICAgIHRoYXQuaGVpZ2h0ID0gKCkgPT4geyAgIC8vSUU4K1xuICAgICAgICByZXR1cm4gJGVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgIH07XG5cbiAgICB0aGF0LmF0dHIgPSAoYXR0cikgPT4ge1xuICAgICAgICByZXR1cm4gJGVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHIpO1xuICAgIH07XG5cbiAgICB0aGF0LnJlcGxhY2UgPSAoaHRtbCkgPT4ge1xuICAgICAgICAkZWxlbWVudC5yZXBsYWNlV2l0aChodG1sKTtcbiAgICB9O1xuXG4gICAgdGhhdC5hcHBlbmQgPSAoaHRtbCkgPT4ge1xuICAgICAgICAkZWxlbWVudC5hcHBlbmRDaGlsZChodG1sKTtcbiAgICB9O1xuXG4gICAgdGhhdC5yZW1vdmUgPSAoKSA9PiB7XG4gICAgICAgIGlmKCRlbGVtZW50Lmxlbmd0aCA+IDEpe1xuICAgICAgICAgICAgJGVsZW1lbnQucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZCgkZWxlbWVudCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICB0aGF0LnJlbW92ZUNoaWxkID0gKGVsZW1lbnQpID0+IHtcbiAgICAgICAgaWYoZWxlbWVudCl7XG4gICAgICAgICAgICAkZWxlbWVudC5yZW1vdmVDaGlsZChlbGVtZW50KTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB3aGlsZSAoJGVsZW1lbnQuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlQ2hpbGQoJGVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICB0aGF0LmdldCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuICRlbGVtZW50O1xuICAgIH07XG5cbiAgICB0aGF0LmNsb3Nlc3QgPSAoc2VsZWN0b3JTdHJpbmcpID0+IHtcbiAgICAgICAgbGV0IGNsb3Nlc3RFbGVtZW50ID0gJGVsZW1lbnQuY2xvc2VzdChzZWxlY3RvclN0cmluZyk7XG4gICAgICAgIGlmKGNsb3Nlc3RFbGVtZW50KXtcbiAgICAgICAgICAgIHJldHVybiBMYSQoY2xvc2VzdEVsZW1lbnQpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTGEkO1xuIiwiaW1wb3J0IF8gZnJvbSAnLi91bmRlcnNjb3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIHRyaW0oc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZyA/IHN0cmluZy5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJykgOiBcIlwiO1xufVxuXG4vKipcbiAqIGV4dHJhY3RFeHRlbnNpb25cbiAqXG4gKiBAcGFyYW0gICAgICB7c3RyaW5nfSBwYXRoIGZvciB1cmxcbiAqIEByZXR1cm4gICAgIHtzdHJpbmd9ICBFeHRlbnNpb25cbiAqL1xuZXhwb3J0IGNvbnN0IGV4dHJhY3RFeHRlbnNpb24gPSBmdW5jdGlvbihwYXRoKSB7XG4gICAgaWYoIXBhdGggfHwgcGF0aC5zdWJzdHIoMCw0KT09J3J0bXAnKSB7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRBenVyZUZpbGVGb3JtYXQocGF0aCkge1xuICAgICAgICBsZXQgZXh0ZW5zaW9uID0gXCJcIjtcbiAgICAgICAgaWYgKCgvWygsXWZvcm1hdD1tcGQtL2kpLnRlc3QocGF0aCkpIHtcbiAgICAgICAgICAgIGV4dGVuc2lvbiA9ICdtcGQnO1xuICAgICAgICB9ZWxzZSBpZiAoKC9bKCxdZm9ybWF0PW0zdTgtL2kpLnRlc3QocGF0aCkpIHtcbiAgICAgICAgICAgIGV4dGVuc2lvbiA9ICdtM3U4JztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXh0ZW5zaW9uO1xuICAgIH1cblxuICAgIGxldCBhenVyZWRGb3JtYXQgPSBnZXRBenVyZUZpbGVGb3JtYXQocGF0aCk7XG4gICAgaWYoYXp1cmVkRm9ybWF0KSB7XG4gICAgICAgIHJldHVybiBhenVyZWRGb3JtYXQ7XG4gICAgfVxuICAgIHBhdGggPSBwYXRoLnNwbGl0KCc/JylbMF0uc3BsaXQoJyMnKVswXTtcbiAgICBpZihwYXRoLmxhc3RJbmRleE9mKCcuJykgPiAtMSkge1xuICAgICAgICByZXR1cm4gcGF0aC5zdWJzdHIocGF0aC5sYXN0SW5kZXhPZignLicpICsgMSwgcGF0aC5sZW5ndGgpLnRvTG93ZXJDYXNlKCk7XG4gICAgfWVsc2V7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cbn07XG5cblxuLyoqXG4gKiBuYXR1cmFsSG1zXG4gKlxuICogQHBhcmFtICAgICAge251bWJlciB8IHN0cmluZ30gIHNlY29uZCAgVGhlIHNlY29uZFxuICogQHJldHVybiAgICAge3N0cmluZ30gIGZvcm1hdHRlZCBTdHJpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5hdHVyYWxIbXMoc2Vjb25kKSB7XG4gICAgbGV0IHNlY051bSA9IHBhcnNlSW50KHNlY29uZCwgMTApO1xuICAgIGlmKCFzZWNvbmQpe1xuICAgICAgICByZXR1cm4gXCIwMDowMFwiO1xuICAgIH1cbiAgICBsZXQgaG91cnMgICA9IE1hdGguZmxvb3Ioc2VjTnVtIC8gMzYwMCk7XG4gICAgbGV0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKChzZWNOdW0gLSAoaG91cnMgKiAzNjAwKSkgLyA2MCk7XG4gICAgbGV0IHNlY29uZHMgPSBzZWNOdW0gLSAoaG91cnMgKiAzNjAwKSAtIChtaW51dGVzICogNjApO1xuXG4gICAgLy9pZiAoaG91cnMgPiAwKSB7bWludXRlcyA9IFwiMFwiK21pbnV0ZXM7fVxuICAgIGlmIChtaW51dGVzIDwgMTApIHttaW51dGVzID0gXCIwXCIrbWludXRlczt9XG4gICAgaWYgKHNlY29uZHMgPCAxMCkge3NlY29uZHMgPSBcIjBcIitzZWNvbmRzO31cblxuICAgIGlmIChob3VycyA+IDApIHtcbiAgICAgICAgcmV0dXJuIGhvdXJzKyc6JyttaW51dGVzKyc6JytzZWNvbmRzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBtaW51dGVzKyc6JytzZWNvbmRzO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gaG1zVG9TZWNvbmQoc3RyLCBmcmFtZVJhdGUpIHtcbiAgICBpZighc3RyKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBpZihfLmlzTnVtYmVyKHN0cikgJiYgIV8uaXNOYU4oc3RyKSl7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuICAgIHN0ciA9IHN0ci5yZXBsYWNlKCcsJywgJy4nKTtcbiAgICBsZXQgYXJyID0gc3RyLnNwbGl0KCc6Jyk7XG4gICAgbGV0IGFyckxlbmd0aCA9IGFyci5sZW5ndGg7XG4gICAgbGV0IHNlYyA9IDA7XG4gICAgaWYgKHN0ci5zbGljZSgtMSkgPT09ICdzJyl7XG4gICAgICAgIHNlYyA9IHBhcnNlRmxvYXQoc3RyKTtcbiAgICB9ZWxzZSBpZiAoc3RyLnNsaWNlKC0xKSA9PT0gJ20nKXtcbiAgICAgICAgc2VjID0gcGFyc2VGbG9hdChzdHIpICogNjA7XG4gICAgfWVsc2UgaWYgKHN0ci5zbGljZSgtMSkgPT09ICdoJyl7XG4gICAgICAgIHNlYyA9IHBhcnNlRmxvYXQoc3RyKSAqIDM2MDA7XG4gICAgfWVsc2UgaWYgKGFyckxlbmd0aCA+IDEpIHtcbiAgICAgICAgdmFyIHNlY0luZGV4ID0gYXJyTGVuZ3RoIC0gMTtcbiAgICAgICAgaWYgKGFyckxlbmd0aCA9PT0gNCkge1xuICAgICAgICAgICAgaWYgKGZyYW1lUmF0ZSkge1xuICAgICAgICAgICAgICAgIHNlYyA9IHBhcnNlRmxvYXQoYXJyW3NlY0luZGV4XSkgLyBmcmFtZVJhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWNJbmRleCAtPSAxO1xuICAgICAgICB9XG4gICAgICAgIHNlYyArPSBwYXJzZUZsb2F0KGFycltzZWNJbmRleF0pO1xuICAgICAgICBzZWMgKz0gcGFyc2VGbG9hdChhcnJbc2VjSW5kZXggLSAxXSkgKiA2MDtcbiAgICAgICAgaWYgKGFyckxlbmd0aCA+PSAzKSB7XG4gICAgICAgICAgICBzZWMgKz0gcGFyc2VGbG9hdChhcnJbc2VjSW5kZXggLSAyXSkgKiAzNjAwO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc2VjID0gcGFyc2VGbG9hdChzdHIpO1xuICAgIH1cbiAgICBpZiAoXy5pc05hTihzZWMpKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICByZXR1cm4gc2VjO1xufSIsIi8vICAgICBVbmRlcnNjb3JlLmpzIDEuOS4xXG4vLyAgICAgaHR0cDovL3VuZGVyc2NvcmVqcy5vcmdcbi8vICAgICAoYykgMjAwOS0yMDE4IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4vLyAgICAgVW5kZXJzY29yZSBtYXkgYmUgZnJlZWx5IGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiFmdW5jdGlvbigpe3ZhciBuPVwib2JqZWN0XCI9PXR5cGVvZiBzZWxmJiZzZWxmLnNlbGY9PT1zZWxmJiZzZWxmfHxcIm9iamVjdFwiPT10eXBlb2YgZ2xvYmFsJiZnbG9iYWwuZ2xvYmFsPT09Z2xvYmFsJiZnbG9iYWx8fHRoaXN8fHt9LHI9bi5fLGU9QXJyYXkucHJvdG90eXBlLG89T2JqZWN0LnByb3RvdHlwZSxzPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBTeW1ib2w/U3ltYm9sLnByb3RvdHlwZTpudWxsLHU9ZS5wdXNoLGM9ZS5zbGljZSxwPW8udG9TdHJpbmcsaT1vLmhhc093blByb3BlcnR5LHQ9QXJyYXkuaXNBcnJheSxhPU9iamVjdC5rZXlzLGw9T2JqZWN0LmNyZWF0ZSxmPWZ1bmN0aW9uKCl7fSxoPWZ1bmN0aW9uKG4pe3JldHVybiBuIGluc3RhbmNlb2YgaD9uOnRoaXMgaW5zdGFuY2VvZiBoP3ZvaWQodGhpcy5fd3JhcHBlZD1uKTpuZXcgaChuKX07XCJ1bmRlZmluZWRcIj09dHlwZW9mIGV4cG9ydHN8fGV4cG9ydHMubm9kZVR5cGU/bi5fPWg6KFwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGUmJiFtb2R1bGUubm9kZVR5cGUmJm1vZHVsZS5leHBvcnRzJiYoZXhwb3J0cz1tb2R1bGUuZXhwb3J0cz1oKSxleHBvcnRzLl89aCksaC5WRVJTSU9OPVwiMS45LjFcIjt2YXIgdix5PWZ1bmN0aW9uKHUsaSxuKXtpZih2b2lkIDA9PT1pKXJldHVybiB1O3N3aXRjaChudWxsPT1uPzM6bil7Y2FzZSAxOnJldHVybiBmdW5jdGlvbihuKXtyZXR1cm4gdS5jYWxsKGksbil9O2Nhc2UgMzpyZXR1cm4gZnVuY3Rpb24obixyLHQpe3JldHVybiB1LmNhbGwoaSxuLHIsdCl9O2Nhc2UgNDpyZXR1cm4gZnVuY3Rpb24obixyLHQsZSl7cmV0dXJuIHUuY2FsbChpLG4scix0LGUpfX1yZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gdS5hcHBseShpLGFyZ3VtZW50cyl9fSxkPWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gaC5pdGVyYXRlZSE9PXY/aC5pdGVyYXRlZShuLHIpOm51bGw9PW4/aC5pZGVudGl0eTpoLmlzRnVuY3Rpb24obik/eShuLHIsdCk6aC5pc09iamVjdChuKSYmIWguaXNBcnJheShuKT9oLm1hdGNoZXIobik6aC5wcm9wZXJ0eShuKX07aC5pdGVyYXRlZT12PWZ1bmN0aW9uKG4scil7cmV0dXJuIGQobixyLDEvMCl9O3ZhciBnPWZ1bmN0aW9uKHUsaSl7cmV0dXJuIGk9bnVsbD09aT91Lmxlbmd0aC0xOitpLGZ1bmN0aW9uKCl7Zm9yKHZhciBuPU1hdGgubWF4KGFyZ3VtZW50cy5sZW5ndGgtaSwwKSxyPUFycmF5KG4pLHQ9MDt0PG47dCsrKXJbdF09YXJndW1lbnRzW3QraV07c3dpdGNoKGkpe2Nhc2UgMDpyZXR1cm4gdS5jYWxsKHRoaXMscik7Y2FzZSAxOnJldHVybiB1LmNhbGwodGhpcyxhcmd1bWVudHNbMF0scik7Y2FzZSAyOnJldHVybiB1LmNhbGwodGhpcyxhcmd1bWVudHNbMF0sYXJndW1lbnRzWzFdLHIpfXZhciBlPUFycmF5KGkrMSk7Zm9yKHQ9MDt0PGk7dCsrKWVbdF09YXJndW1lbnRzW3RdO3JldHVybiBlW2ldPXIsdS5hcHBseSh0aGlzLGUpfX0sbT1mdW5jdGlvbihuKXtpZighaC5pc09iamVjdChuKSlyZXR1cm57fTtpZihsKXJldHVybiBsKG4pO2YucHJvdG90eXBlPW47dmFyIHI9bmV3IGY7cmV0dXJuIGYucHJvdG90eXBlPW51bGwscn0sYj1mdW5jdGlvbihyKXtyZXR1cm4gZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PW4/dm9pZCAwOm5bcl19fSxqPWZ1bmN0aW9uKG4scil7cmV0dXJuIG51bGwhPW4mJmkuY2FsbChuLHIpfSx4PWZ1bmN0aW9uKG4scil7Zm9yKHZhciB0PXIubGVuZ3RoLGU9MDtlPHQ7ZSsrKXtpZihudWxsPT1uKXJldHVybjtuPW5bcltlXV19cmV0dXJuIHQ/bjp2b2lkIDB9LF89TWF0aC5wb3coMiw1MyktMSxBPWIoXCJsZW5ndGhcIiksdz1mdW5jdGlvbihuKXt2YXIgcj1BKG4pO3JldHVyblwibnVtYmVyXCI9PXR5cGVvZiByJiYwPD1yJiZyPD1ffTtoLmVhY2g9aC5mb3JFYWNoPWZ1bmN0aW9uKG4scix0KXt2YXIgZSx1O2lmKHI9eShyLHQpLHcobikpZm9yKGU9MCx1PW4ubGVuZ3RoO2U8dTtlKyspcihuW2VdLGUsbik7ZWxzZXt2YXIgaT1oLmtleXMobik7Zm9yKGU9MCx1PWkubGVuZ3RoO2U8dTtlKyspcihuW2lbZV1dLGlbZV0sbil9cmV0dXJuIG59LGgubWFwPWguY29sbGVjdD1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPSF3KG4pJiZoLmtleXMobiksdT0oZXx8bikubGVuZ3RoLGk9QXJyYXkodSksbz0wO288dTtvKyspe3ZhciBhPWU/ZVtvXTpvO2lbb109cihuW2FdLGEsbil9cmV0dXJuIGl9O3ZhciBPPWZ1bmN0aW9uKGMpe3JldHVybiBmdW5jdGlvbihuLHIsdCxlKXt2YXIgdT0zPD1hcmd1bWVudHMubGVuZ3RoO3JldHVybiBmdW5jdGlvbihuLHIsdCxlKXt2YXIgdT0hdyhuKSYmaC5rZXlzKG4pLGk9KHV8fG4pLmxlbmd0aCxvPTA8Yz8wOmktMTtmb3IoZXx8KHQ9blt1P3Vbb106b10sbys9Yyk7MDw9byYmbzxpO28rPWMpe3ZhciBhPXU/dVtvXTpvO3Q9cih0LG5bYV0sYSxuKX1yZXR1cm4gdH0obix5KHIsZSw0KSx0LHUpfX07aC5yZWR1Y2U9aC5mb2xkbD1oLmluamVjdD1PKDEpLGgucmVkdWNlUmlnaHQ9aC5mb2xkcj1PKC0xKSxoLmZpbmQ9aC5kZXRlY3Q9ZnVuY3Rpb24obixyLHQpe3ZhciBlPSh3KG4pP2guZmluZEluZGV4OmguZmluZEtleSkobixyLHQpO2lmKHZvaWQgMCE9PWUmJi0xIT09ZSlyZXR1cm4gbltlXX0saC5maWx0ZXI9aC5zZWxlY3Q9ZnVuY3Rpb24obixlLHIpe3ZhciB1PVtdO3JldHVybiBlPWQoZSxyKSxoLmVhY2gobixmdW5jdGlvbihuLHIsdCl7ZShuLHIsdCkmJnUucHVzaChuKX0pLHV9LGgucmVqZWN0PWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gaC5maWx0ZXIobixoLm5lZ2F0ZShkKHIpKSx0KX0saC5ldmVyeT1oLmFsbD1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPSF3KG4pJiZoLmtleXMobiksdT0oZXx8bikubGVuZ3RoLGk9MDtpPHU7aSsrKXt2YXIgbz1lP2VbaV06aTtpZighcihuW29dLG8sbikpcmV0dXJuITF9cmV0dXJuITB9LGguc29tZT1oLmFueT1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPSF3KG4pJiZoLmtleXMobiksdT0oZXx8bikubGVuZ3RoLGk9MDtpPHU7aSsrKXt2YXIgbz1lP2VbaV06aTtpZihyKG5bb10sbyxuKSlyZXR1cm4hMH1yZXR1cm4hMX0saC5jb250YWlucz1oLmluY2x1ZGVzPWguaW5jbHVkZT1mdW5jdGlvbihuLHIsdCxlKXtyZXR1cm4gdyhuKXx8KG49aC52YWx1ZXMobikpLChcIm51bWJlclwiIT10eXBlb2YgdHx8ZSkmJih0PTApLDA8PWguaW5kZXhPZihuLHIsdCl9LGguaW52b2tlPWcoZnVuY3Rpb24obix0LGUpe3ZhciB1LGk7cmV0dXJuIGguaXNGdW5jdGlvbih0KT9pPXQ6aC5pc0FycmF5KHQpJiYodT10LnNsaWNlKDAsLTEpLHQ9dFt0Lmxlbmd0aC0xXSksaC5tYXAobixmdW5jdGlvbihuKXt2YXIgcj1pO2lmKCFyKXtpZih1JiZ1Lmxlbmd0aCYmKG49eChuLHUpKSxudWxsPT1uKXJldHVybjtyPW5bdF19cmV0dXJuIG51bGw9PXI/cjpyLmFwcGx5KG4sZSl9KX0pLGgucGx1Y2s9ZnVuY3Rpb24obixyKXtyZXR1cm4gaC5tYXAobixoLnByb3BlcnR5KHIpKX0saC53aGVyZT1mdW5jdGlvbihuLHIpe3JldHVybiBoLmZpbHRlcihuLGgubWF0Y2hlcihyKSl9LGguZmluZFdoZXJlPWZ1bmN0aW9uKG4scil7cmV0dXJuIGguZmluZChuLGgubWF0Y2hlcihyKSl9LGgubWF4PWZ1bmN0aW9uKG4sZSxyKXt2YXIgdCx1LGk9LTEvMCxvPS0xLzA7aWYobnVsbD09ZXx8XCJudW1iZXJcIj09dHlwZW9mIGUmJlwib2JqZWN0XCIhPXR5cGVvZiBuWzBdJiZudWxsIT1uKWZvcih2YXIgYT0wLGM9KG49dyhuKT9uOmgudmFsdWVzKG4pKS5sZW5ndGg7YTxjO2ErKyludWxsIT0odD1uW2FdKSYmaTx0JiYoaT10KTtlbHNlIGU9ZChlLHIpLGguZWFjaChuLGZ1bmN0aW9uKG4scix0KXt1PWUobixyLHQpLChvPHV8fHU9PT0tMS8wJiZpPT09LTEvMCkmJihpPW4sbz11KX0pO3JldHVybiBpfSxoLm1pbj1mdW5jdGlvbihuLGUscil7dmFyIHQsdSxpPTEvMCxvPTEvMDtpZihudWxsPT1lfHxcIm51bWJlclwiPT10eXBlb2YgZSYmXCJvYmplY3RcIiE9dHlwZW9mIG5bMF0mJm51bGwhPW4pZm9yKHZhciBhPTAsYz0obj13KG4pP246aC52YWx1ZXMobikpLmxlbmd0aDthPGM7YSsrKW51bGwhPSh0PW5bYV0pJiZ0PGkmJihpPXQpO2Vsc2UgZT1kKGUsciksaC5lYWNoKG4sZnVuY3Rpb24obixyLHQpeygodT1lKG4scix0KSk8b3x8dT09PTEvMCYmaT09PTEvMCkmJihpPW4sbz11KX0pO3JldHVybiBpfSxoLnNodWZmbGU9ZnVuY3Rpb24obil7cmV0dXJuIGguc2FtcGxlKG4sMS8wKX0saC5zYW1wbGU9ZnVuY3Rpb24obixyLHQpe2lmKG51bGw9PXJ8fHQpcmV0dXJuIHcobil8fChuPWgudmFsdWVzKG4pKSxuW2gucmFuZG9tKG4ubGVuZ3RoLTEpXTt2YXIgZT13KG4pP2guY2xvbmUobik6aC52YWx1ZXMobiksdT1BKGUpO3I9TWF0aC5tYXgoTWF0aC5taW4ocix1KSwwKTtmb3IodmFyIGk9dS0xLG89MDtvPHI7bysrKXt2YXIgYT1oLnJhbmRvbShvLGkpLGM9ZVtvXTtlW29dPWVbYV0sZVthXT1jfXJldHVybiBlLnNsaWNlKDAscil9LGguc29ydEJ5PWZ1bmN0aW9uKG4sZSxyKXt2YXIgdT0wO3JldHVybiBlPWQoZSxyKSxoLnBsdWNrKGgubWFwKG4sZnVuY3Rpb24obixyLHQpe3JldHVybnt2YWx1ZTpuLGluZGV4OnUrKyxjcml0ZXJpYTplKG4scix0KX19KS5zb3J0KGZ1bmN0aW9uKG4scil7dmFyIHQ9bi5jcml0ZXJpYSxlPXIuY3JpdGVyaWE7aWYodCE9PWUpe2lmKGU8dHx8dm9pZCAwPT09dClyZXR1cm4gMTtpZih0PGV8fHZvaWQgMD09PWUpcmV0dXJuLTF9cmV0dXJuIG4uaW5kZXgtci5pbmRleH0pLFwidmFsdWVcIil9O3ZhciBrPWZ1bmN0aW9uKG8scil7cmV0dXJuIGZ1bmN0aW9uKGUsdSxuKXt2YXIgaT1yP1tbXSxbXV06e307cmV0dXJuIHU9ZCh1LG4pLGguZWFjaChlLGZ1bmN0aW9uKG4scil7dmFyIHQ9dShuLHIsZSk7byhpLG4sdCl9KSxpfX07aC5ncm91cEJ5PWsoZnVuY3Rpb24obixyLHQpe2oobix0KT9uW3RdLnB1c2gocik6blt0XT1bcl19KSxoLmluZGV4Qnk9ayhmdW5jdGlvbihuLHIsdCl7blt0XT1yfSksaC5jb3VudEJ5PWsoZnVuY3Rpb24obixyLHQpe2oobix0KT9uW3RdKys6blt0XT0xfSk7dmFyIFM9L1teXFx1ZDgwMC1cXHVkZmZmXXxbXFx1ZDgwMC1cXHVkYmZmXVtcXHVkYzAwLVxcdWRmZmZdfFtcXHVkODAwLVxcdWRmZmZdL2c7aC50b0FycmF5PWZ1bmN0aW9uKG4pe3JldHVybiBuP2guaXNBcnJheShuKT9jLmNhbGwobik6aC5pc1N0cmluZyhuKT9uLm1hdGNoKFMpOncobik/aC5tYXAobixoLmlkZW50aXR5KTpoLnZhbHVlcyhuKTpbXX0saC5zaXplPWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT1uPzA6dyhuKT9uLmxlbmd0aDpoLmtleXMobikubGVuZ3RofSxoLnBhcnRpdGlvbj1rKGZ1bmN0aW9uKG4scix0KXtuW3Q/MDoxXS5wdXNoKHIpfSwhMCksaC5maXJzdD1oLmhlYWQ9aC50YWtlPWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gbnVsbD09bnx8bi5sZW5ndGg8MT9udWxsPT1yP3ZvaWQgMDpbXTpudWxsPT1yfHx0P25bMF06aC5pbml0aWFsKG4sbi5sZW5ndGgtcil9LGguaW5pdGlhbD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGMuY2FsbChuLDAsTWF0aC5tYXgoMCxuLmxlbmd0aC0obnVsbD09cnx8dD8xOnIpKSl9LGgubGFzdD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIG51bGw9PW58fG4ubGVuZ3RoPDE/bnVsbD09cj92b2lkIDA6W106bnVsbD09cnx8dD9uW24ubGVuZ3RoLTFdOmgucmVzdChuLE1hdGgubWF4KDAsbi5sZW5ndGgtcikpfSxoLnJlc3Q9aC50YWlsPWguZHJvcD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGMuY2FsbChuLG51bGw9PXJ8fHQ/MTpyKX0saC5jb21wYWN0PWZ1bmN0aW9uKG4pe3JldHVybiBoLmZpbHRlcihuLEJvb2xlYW4pfTt2YXIgTT1mdW5jdGlvbihuLHIsdCxlKXtmb3IodmFyIHU9KGU9ZXx8W10pLmxlbmd0aCxpPTAsbz1BKG4pO2k8bztpKyspe3ZhciBhPW5baV07aWYodyhhKSYmKGguaXNBcnJheShhKXx8aC5pc0FyZ3VtZW50cyhhKSkpaWYocilmb3IodmFyIGM9MCxsPWEubGVuZ3RoO2M8bDspZVt1KytdPWFbYysrXTtlbHNlIE0oYSxyLHQsZSksdT1lLmxlbmd0aDtlbHNlIHR8fChlW3UrK109YSl9cmV0dXJuIGV9O2guZmxhdHRlbj1mdW5jdGlvbihuLHIpe3JldHVybiBNKG4sciwhMSl9LGgud2l0aG91dD1nKGZ1bmN0aW9uKG4scil7cmV0dXJuIGguZGlmZmVyZW5jZShuLHIpfSksaC51bmlxPWgudW5pcXVlPWZ1bmN0aW9uKG4scix0LGUpe2guaXNCb29sZWFuKHIpfHwoZT10LHQ9cixyPSExKSxudWxsIT10JiYodD1kKHQsZSkpO2Zvcih2YXIgdT1bXSxpPVtdLG89MCxhPUEobik7bzxhO28rKyl7dmFyIGM9bltvXSxsPXQ/dChjLG8sbik6YztyJiYhdD8obyYmaT09PWx8fHUucHVzaChjKSxpPWwpOnQ/aC5jb250YWlucyhpLGwpfHwoaS5wdXNoKGwpLHUucHVzaChjKSk6aC5jb250YWlucyh1LGMpfHx1LnB1c2goYyl9cmV0dXJuIHV9LGgudW5pb249ZyhmdW5jdGlvbihuKXtyZXR1cm4gaC51bmlxKE0obiwhMCwhMCkpfSksaC5pbnRlcnNlY3Rpb249ZnVuY3Rpb24obil7Zm9yKHZhciByPVtdLHQ9YXJndW1lbnRzLmxlbmd0aCxlPTAsdT1BKG4pO2U8dTtlKyspe3ZhciBpPW5bZV07aWYoIWguY29udGFpbnMocixpKSl7dmFyIG87Zm9yKG89MTtvPHQmJmguY29udGFpbnMoYXJndW1lbnRzW29dLGkpO28rKyk7bz09PXQmJnIucHVzaChpKX19cmV0dXJuIHJ9LGguZGlmZmVyZW5jZT1nKGZ1bmN0aW9uKG4scil7cmV0dXJuIHI9TShyLCEwLCEwKSxoLmZpbHRlcihuLGZ1bmN0aW9uKG4pe3JldHVybiFoLmNvbnRhaW5zKHIsbil9KX0pLGgudW56aXA9ZnVuY3Rpb24obil7Zm9yKHZhciByPW4mJmgubWF4KG4sQSkubGVuZ3RofHwwLHQ9QXJyYXkociksZT0wO2U8cjtlKyspdFtlXT1oLnBsdWNrKG4sZSk7cmV0dXJuIHR9LGguemlwPWcoaC51bnppcCksaC5vYmplY3Q9ZnVuY3Rpb24obixyKXtmb3IodmFyIHQ9e30sZT0wLHU9QShuKTtlPHU7ZSsrKXI/dFtuW2VdXT1yW2VdOnRbbltlXVswXV09bltlXVsxXTtyZXR1cm4gdH07dmFyIEY9ZnVuY3Rpb24oaSl7cmV0dXJuIGZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGU9QShuKSx1PTA8aT8wOmUtMTswPD11JiZ1PGU7dSs9aSlpZihyKG5bdV0sdSxuKSlyZXR1cm4gdTtyZXR1cm4tMX19O2guZmluZEluZGV4PUYoMSksaC5maW5kTGFzdEluZGV4PUYoLTEpLGguc29ydGVkSW5kZXg9ZnVuY3Rpb24obixyLHQsZSl7Zm9yKHZhciB1PSh0PWQodCxlLDEpKShyKSxpPTAsbz1BKG4pO2k8bzspe3ZhciBhPU1hdGguZmxvb3IoKGkrbykvMik7dChuW2FdKTx1P2k9YSsxOm89YX1yZXR1cm4gaX07dmFyIEU9ZnVuY3Rpb24oaSxvLGEpe3JldHVybiBmdW5jdGlvbihuLHIsdCl7dmFyIGU9MCx1PUEobik7aWYoXCJudW1iZXJcIj09dHlwZW9mIHQpMDxpP2U9MDw9dD90Ok1hdGgubWF4KHQrdSxlKTp1PTA8PXQ/TWF0aC5taW4odCsxLHUpOnQrdSsxO2Vsc2UgaWYoYSYmdCYmdSlyZXR1cm4gblt0PWEobixyKV09PT1yP3Q6LTE7aWYociE9cilyZXR1cm4gMDw9KHQ9byhjLmNhbGwobixlLHUpLGguaXNOYU4pKT90K2U6LTE7Zm9yKHQ9MDxpP2U6dS0xOzA8PXQmJnQ8dTt0Kz1pKWlmKG5bdF09PT1yKXJldHVybiB0O3JldHVybi0xfX07aC5pbmRleE9mPUUoMSxoLmZpbmRJbmRleCxoLnNvcnRlZEluZGV4KSxoLmxhc3RJbmRleE9mPUUoLTEsaC5maW5kTGFzdEluZGV4KSxoLnJhbmdlPWZ1bmN0aW9uKG4scix0KXtudWxsPT1yJiYocj1ufHwwLG49MCksdHx8KHQ9cjxuPy0xOjEpO2Zvcih2YXIgZT1NYXRoLm1heChNYXRoLmNlaWwoKHItbikvdCksMCksdT1BcnJheShlKSxpPTA7aTxlO2krKyxuKz10KXVbaV09bjtyZXR1cm4gdX0saC5jaHVuaz1mdW5jdGlvbihuLHIpe2lmKG51bGw9PXJ8fHI8MSlyZXR1cm5bXTtmb3IodmFyIHQ9W10sZT0wLHU9bi5sZW5ndGg7ZTx1Oyl0LnB1c2goYy5jYWxsKG4sZSxlKz1yKSk7cmV0dXJuIHR9O3ZhciBOPWZ1bmN0aW9uKG4scix0LGUsdSl7aWYoIShlIGluc3RhbmNlb2YgcikpcmV0dXJuIG4uYXBwbHkodCx1KTt2YXIgaT1tKG4ucHJvdG90eXBlKSxvPW4uYXBwbHkoaSx1KTtyZXR1cm4gaC5pc09iamVjdChvKT9vOml9O2guYmluZD1nKGZ1bmN0aW9uKHIsdCxlKXtpZighaC5pc0Z1bmN0aW9uKHIpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJCaW5kIG11c3QgYmUgY2FsbGVkIG9uIGEgZnVuY3Rpb25cIik7dmFyIHU9ZyhmdW5jdGlvbihuKXtyZXR1cm4gTihyLHUsdCx0aGlzLGUuY29uY2F0KG4pKX0pO3JldHVybiB1fSksaC5wYXJ0aWFsPWcoZnVuY3Rpb24odSxpKXt2YXIgbz1oLnBhcnRpYWwucGxhY2Vob2xkZXIsYT1mdW5jdGlvbigpe2Zvcih2YXIgbj0wLHI9aS5sZW5ndGgsdD1BcnJheShyKSxlPTA7ZTxyO2UrKyl0W2VdPWlbZV09PT1vP2FyZ3VtZW50c1tuKytdOmlbZV07Zm9yKDtuPGFyZ3VtZW50cy5sZW5ndGg7KXQucHVzaChhcmd1bWVudHNbbisrXSk7cmV0dXJuIE4odSxhLHRoaXMsdGhpcyx0KX07cmV0dXJuIGF9KSwoaC5wYXJ0aWFsLnBsYWNlaG9sZGVyPWgpLmJpbmRBbGw9ZyhmdW5jdGlvbihuLHIpe3ZhciB0PShyPU0ociwhMSwhMSkpLmxlbmd0aDtpZih0PDEpdGhyb3cgbmV3IEVycm9yKFwiYmluZEFsbCBtdXN0IGJlIHBhc3NlZCBmdW5jdGlvbiBuYW1lc1wiKTtmb3IoO3QtLTspe3ZhciBlPXJbdF07bltlXT1oLmJpbmQobltlXSxuKX19KSxoLm1lbW9pemU9ZnVuY3Rpb24oZSx1KXt2YXIgaT1mdW5jdGlvbihuKXt2YXIgcj1pLmNhY2hlLHQ9XCJcIisodT91LmFwcGx5KHRoaXMsYXJndW1lbnRzKTpuKTtyZXR1cm4gaihyLHQpfHwoclt0XT1lLmFwcGx5KHRoaXMsYXJndW1lbnRzKSksclt0XX07cmV0dXJuIGkuY2FjaGU9e30saX0saC5kZWxheT1nKGZ1bmN0aW9uKG4scix0KXtyZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpe3JldHVybiBuLmFwcGx5KG51bGwsdCl9LHIpfSksaC5kZWZlcj1oLnBhcnRpYWwoaC5kZWxheSxoLDEpLGgudGhyb3R0bGU9ZnVuY3Rpb24odCxlLHUpe3ZhciBpLG8sYSxjLGw9MDt1fHwodT17fSk7dmFyIGY9ZnVuY3Rpb24oKXtsPSExPT09dS5sZWFkaW5nPzA6aC5ub3coKSxpPW51bGwsYz10LmFwcGx5KG8sYSksaXx8KG89YT1udWxsKX0sbj1mdW5jdGlvbigpe3ZhciBuPWgubm93KCk7bHx8ITEhPT11LmxlYWRpbmd8fChsPW4pO3ZhciByPWUtKG4tbCk7cmV0dXJuIG89dGhpcyxhPWFyZ3VtZW50cyxyPD0wfHxlPHI/KGkmJihjbGVhclRpbWVvdXQoaSksaT1udWxsKSxsPW4sYz10LmFwcGx5KG8sYSksaXx8KG89YT1udWxsKSk6aXx8ITE9PT11LnRyYWlsaW5nfHwoaT1zZXRUaW1lb3V0KGYscikpLGN9O3JldHVybiBuLmNhbmNlbD1mdW5jdGlvbigpe2NsZWFyVGltZW91dChpKSxsPTAsaT1vPWE9bnVsbH0sbn0saC5kZWJvdW5jZT1mdW5jdGlvbih0LGUsdSl7dmFyIGksbyxhPWZ1bmN0aW9uKG4scil7aT1udWxsLHImJihvPXQuYXBwbHkobixyKSl9LG49ZyhmdW5jdGlvbihuKXtpZihpJiZjbGVhclRpbWVvdXQoaSksdSl7dmFyIHI9IWk7aT1zZXRUaW1lb3V0KGEsZSksciYmKG89dC5hcHBseSh0aGlzLG4pKX1lbHNlIGk9aC5kZWxheShhLGUsdGhpcyxuKTtyZXR1cm4gb30pO3JldHVybiBuLmNhbmNlbD1mdW5jdGlvbigpe2NsZWFyVGltZW91dChpKSxpPW51bGx9LG59LGgud3JhcD1mdW5jdGlvbihuLHIpe3JldHVybiBoLnBhcnRpYWwocixuKX0saC5uZWdhdGU9ZnVuY3Rpb24obil7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIW4uYXBwbHkodGhpcyxhcmd1bWVudHMpfX0saC5jb21wb3NlPWZ1bmN0aW9uKCl7dmFyIHQ9YXJndW1lbnRzLGU9dC5sZW5ndGgtMTtyZXR1cm4gZnVuY3Rpb24oKXtmb3IodmFyIG49ZSxyPXRbZV0uYXBwbHkodGhpcyxhcmd1bWVudHMpO24tLTspcj10W25dLmNhbGwodGhpcyxyKTtyZXR1cm4gcn19LGguYWZ0ZXI9ZnVuY3Rpb24obixyKXtyZXR1cm4gZnVuY3Rpb24oKXtpZigtLW48MSlyZXR1cm4gci5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fSxoLmJlZm9yZT1mdW5jdGlvbihuLHIpe3ZhciB0O3JldHVybiBmdW5jdGlvbigpe3JldHVybiAwPC0tbiYmKHQ9ci5hcHBseSh0aGlzLGFyZ3VtZW50cykpLG48PTEmJihyPW51bGwpLHR9fSxoLm9uY2U9aC5wYXJ0aWFsKGguYmVmb3JlLDIpLGgucmVzdEFyZ3VtZW50cz1nO3ZhciBJPSF7dG9TdHJpbmc6bnVsbH0ucHJvcGVydHlJc0VudW1lcmFibGUoXCJ0b1N0cmluZ1wiKSxUPVtcInZhbHVlT2ZcIixcImlzUHJvdG90eXBlT2ZcIixcInRvU3RyaW5nXCIsXCJwcm9wZXJ0eUlzRW51bWVyYWJsZVwiLFwiaGFzT3duUHJvcGVydHlcIixcInRvTG9jYWxlU3RyaW5nXCJdLEI9ZnVuY3Rpb24obixyKXt2YXIgdD1ULmxlbmd0aCxlPW4uY29uc3RydWN0b3IsdT1oLmlzRnVuY3Rpb24oZSkmJmUucHJvdG90eXBlfHxvLGk9XCJjb25zdHJ1Y3RvclwiO2ZvcihqKG4saSkmJiFoLmNvbnRhaW5zKHIsaSkmJnIucHVzaChpKTt0LS07KShpPVRbdF0paW4gbiYmbltpXSE9PXVbaV0mJiFoLmNvbnRhaW5zKHIsaSkmJnIucHVzaChpKX07aC5rZXlzPWZ1bmN0aW9uKG4pe2lmKCFoLmlzT2JqZWN0KG4pKXJldHVybltdO2lmKGEpcmV0dXJuIGEobik7dmFyIHI9W107Zm9yKHZhciB0IGluIG4paihuLHQpJiZyLnB1c2godCk7cmV0dXJuIEkmJkIobixyKSxyfSxoLmFsbEtleXM9ZnVuY3Rpb24obil7aWYoIWguaXNPYmplY3QobikpcmV0dXJuW107dmFyIHI9W107Zm9yKHZhciB0IGluIG4pci5wdXNoKHQpO3JldHVybiBJJiZCKG4scikscn0saC52YWx1ZXM9ZnVuY3Rpb24obil7Zm9yKHZhciByPWgua2V5cyhuKSx0PXIubGVuZ3RoLGU9QXJyYXkodCksdT0wO3U8dDt1KyspZVt1XT1uW3JbdV1dO3JldHVybiBlfSxoLm1hcE9iamVjdD1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPWgua2V5cyhuKSx1PWUubGVuZ3RoLGk9e30sbz0wO288dTtvKyspe3ZhciBhPWVbb107aVthXT1yKG5bYV0sYSxuKX1yZXR1cm4gaX0saC5wYWlycz1mdW5jdGlvbihuKXtmb3IodmFyIHI9aC5rZXlzKG4pLHQ9ci5sZW5ndGgsZT1BcnJheSh0KSx1PTA7dTx0O3UrKyllW3VdPVtyW3VdLG5bclt1XV1dO3JldHVybiBlfSxoLmludmVydD1mdW5jdGlvbihuKXtmb3IodmFyIHI9e30sdD1oLmtleXMobiksZT0wLHU9dC5sZW5ndGg7ZTx1O2UrKylyW25bdFtlXV1dPXRbZV07cmV0dXJuIHJ9LGguZnVuY3Rpb25zPWgubWV0aG9kcz1mdW5jdGlvbihuKXt2YXIgcj1bXTtmb3IodmFyIHQgaW4gbiloLmlzRnVuY3Rpb24oblt0XSkmJnIucHVzaCh0KTtyZXR1cm4gci5zb3J0KCl9O3ZhciBSPWZ1bmN0aW9uKGMsbCl7cmV0dXJuIGZ1bmN0aW9uKG4pe3ZhciByPWFyZ3VtZW50cy5sZW5ndGg7aWYobCYmKG49T2JqZWN0KG4pKSxyPDJ8fG51bGw9PW4pcmV0dXJuIG47Zm9yKHZhciB0PTE7dDxyO3QrKylmb3IodmFyIGU9YXJndW1lbnRzW3RdLHU9YyhlKSxpPXUubGVuZ3RoLG89MDtvPGk7bysrKXt2YXIgYT11W29dO2wmJnZvaWQgMCE9PW5bYV18fChuW2FdPWVbYV0pfXJldHVybiBufX07aC5leHRlbmQ9UihoLmFsbEtleXMpLGguZXh0ZW5kT3duPWguYXNzaWduPVIoaC5rZXlzKSxoLmZpbmRLZXk9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZSx1PWgua2V5cyhuKSxpPTAsbz11Lmxlbmd0aDtpPG87aSsrKWlmKHIobltlPXVbaV1dLGUsbikpcmV0dXJuIGV9O3ZhciBxLEssej1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIHIgaW4gdH07aC5waWNrPWcoZnVuY3Rpb24obixyKXt2YXIgdD17fSxlPXJbMF07aWYobnVsbD09bilyZXR1cm4gdDtoLmlzRnVuY3Rpb24oZSk/KDE8ci5sZW5ndGgmJihlPXkoZSxyWzFdKSkscj1oLmFsbEtleXMobikpOihlPXoscj1NKHIsITEsITEpLG49T2JqZWN0KG4pKTtmb3IodmFyIHU9MCxpPXIubGVuZ3RoO3U8aTt1Kyspe3ZhciBvPXJbdV0sYT1uW29dO2UoYSxvLG4pJiYodFtvXT1hKX1yZXR1cm4gdH0pLGgub21pdD1nKGZ1bmN0aW9uKG4sdCl7dmFyIHIsZT10WzBdO3JldHVybiBoLmlzRnVuY3Rpb24oZSk/KGU9aC5uZWdhdGUoZSksMTx0Lmxlbmd0aCYmKHI9dFsxXSkpOih0PWgubWFwKE0odCwhMSwhMSksU3RyaW5nKSxlPWZ1bmN0aW9uKG4scil7cmV0dXJuIWguY29udGFpbnModCxyKX0pLGgucGljayhuLGUscil9KSxoLmRlZmF1bHRzPVIoaC5hbGxLZXlzLCEwKSxoLmNyZWF0ZT1mdW5jdGlvbihuLHIpe3ZhciB0PW0obik7cmV0dXJuIHImJmguZXh0ZW5kT3duKHQsciksdH0saC5jbG9uZT1mdW5jdGlvbihuKXtyZXR1cm4gaC5pc09iamVjdChuKT9oLmlzQXJyYXkobik/bi5zbGljZSgpOmguZXh0ZW5kKHt9LG4pOm59LGgudGFwPWZ1bmN0aW9uKG4scil7cmV0dXJuIHIobiksbn0saC5pc01hdGNoPWZ1bmN0aW9uKG4scil7dmFyIHQ9aC5rZXlzKHIpLGU9dC5sZW5ndGg7aWYobnVsbD09bilyZXR1cm4hZTtmb3IodmFyIHU9T2JqZWN0KG4pLGk9MDtpPGU7aSsrKXt2YXIgbz10W2ldO2lmKHJbb10hPT11W29dfHwhKG8gaW4gdSkpcmV0dXJuITF9cmV0dXJuITB9LHE9ZnVuY3Rpb24obixyLHQsZSl7aWYobj09PXIpcmV0dXJuIDAhPT1ufHwxL249PTEvcjtpZihudWxsPT1ufHxudWxsPT1yKXJldHVybiExO2lmKG4hPW4pcmV0dXJuIHIhPXI7dmFyIHU9dHlwZW9mIG47cmV0dXJuKFwiZnVuY3Rpb25cIj09PXV8fFwib2JqZWN0XCI9PT11fHxcIm9iamVjdFwiPT10eXBlb2YgcikmJksobixyLHQsZSl9LEs9ZnVuY3Rpb24obixyLHQsZSl7biBpbnN0YW5jZW9mIGgmJihuPW4uX3dyYXBwZWQpLHIgaW5zdGFuY2VvZiBoJiYocj1yLl93cmFwcGVkKTt2YXIgdT1wLmNhbGwobik7aWYodSE9PXAuY2FsbChyKSlyZXR1cm4hMTtzd2l0Y2godSl7Y2FzZVwiW29iamVjdCBSZWdFeHBdXCI6Y2FzZVwiW29iamVjdCBTdHJpbmddXCI6cmV0dXJuXCJcIituPT1cIlwiK3I7Y2FzZVwiW29iamVjdCBOdW1iZXJdXCI6cmV0dXJuK24hPStuPytyIT0rcjowPT0rbj8xLytuPT0xL3I6K249PStyO2Nhc2VcIltvYmplY3QgRGF0ZV1cIjpjYXNlXCJbb2JqZWN0IEJvb2xlYW5dXCI6cmV0dXJuK249PStyO2Nhc2VcIltvYmplY3QgU3ltYm9sXVwiOnJldHVybiBzLnZhbHVlT2YuY2FsbChuKT09PXMudmFsdWVPZi5jYWxsKHIpfXZhciBpPVwiW29iamVjdCBBcnJheV1cIj09PXU7aWYoIWkpe2lmKFwib2JqZWN0XCIhPXR5cGVvZiBufHxcIm9iamVjdFwiIT10eXBlb2YgcilyZXR1cm4hMTt2YXIgbz1uLmNvbnN0cnVjdG9yLGE9ci5jb25zdHJ1Y3RvcjtpZihvIT09YSYmIShoLmlzRnVuY3Rpb24obykmJm8gaW5zdGFuY2VvZiBvJiZoLmlzRnVuY3Rpb24oYSkmJmEgaW5zdGFuY2VvZiBhKSYmXCJjb25zdHJ1Y3RvclwiaW4gbiYmXCJjb25zdHJ1Y3RvclwiaW4gcilyZXR1cm4hMX1lPWV8fFtdO2Zvcih2YXIgYz0odD10fHxbXSkubGVuZ3RoO2MtLTspaWYodFtjXT09PW4pcmV0dXJuIGVbY109PT1yO2lmKHQucHVzaChuKSxlLnB1c2gociksaSl7aWYoKGM9bi5sZW5ndGgpIT09ci5sZW5ndGgpcmV0dXJuITE7Zm9yKDtjLS07KWlmKCFxKG5bY10scltjXSx0LGUpKXJldHVybiExfWVsc2V7dmFyIGwsZj1oLmtleXMobik7aWYoYz1mLmxlbmd0aCxoLmtleXMocikubGVuZ3RoIT09YylyZXR1cm4hMTtmb3IoO2MtLTspaWYobD1mW2NdLCFqKHIsbCl8fCFxKG5bbF0scltsXSx0LGUpKXJldHVybiExfXJldHVybiB0LnBvcCgpLGUucG9wKCksITB9LGguaXNFcXVhbD1mdW5jdGlvbihuLHIpe3JldHVybiBxKG4scil9LGguaXNFbXB0eT1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09bnx8KHcobikmJihoLmlzQXJyYXkobil8fGguaXNTdHJpbmcobil8fGguaXNBcmd1bWVudHMobikpPzA9PT1uLmxlbmd0aDowPT09aC5rZXlzKG4pLmxlbmd0aCl9LGguaXNFbGVtZW50PWZ1bmN0aW9uKG4pe3JldHVybiEoIW58fDEhPT1uLm5vZGVUeXBlKX0saC5pc0FycmF5PXR8fGZ1bmN0aW9uKG4pe3JldHVyblwiW29iamVjdCBBcnJheV1cIj09PXAuY2FsbChuKX0saC5pc09iamVjdD1mdW5jdGlvbihuKXt2YXIgcj10eXBlb2YgbjtyZXR1cm5cImZ1bmN0aW9uXCI9PT1yfHxcIm9iamVjdFwiPT09ciYmISFufSxoLmVhY2goW1wiQXJndW1lbnRzXCIsXCJGdW5jdGlvblwiLFwiU3RyaW5nXCIsXCJOdW1iZXJcIixcIkRhdGVcIixcIlJlZ0V4cFwiLFwiRXJyb3JcIixcIlN5bWJvbFwiLFwiTWFwXCIsXCJXZWFrTWFwXCIsXCJTZXRcIixcIldlYWtTZXRcIl0sZnVuY3Rpb24ocil7aFtcImlzXCIrcl09ZnVuY3Rpb24obil7cmV0dXJuIHAuY2FsbChuKT09PVwiW29iamVjdCBcIityK1wiXVwifX0pLGguaXNBcmd1bWVudHMoYXJndW1lbnRzKXx8KGguaXNBcmd1bWVudHM9ZnVuY3Rpb24obil7cmV0dXJuIGoobixcImNhbGxlZVwiKX0pO3ZhciBEPW4uZG9jdW1lbnQmJm4uZG9jdW1lbnQuY2hpbGROb2RlcztcImZ1bmN0aW9uXCIhPXR5cGVvZi8uLyYmXCJvYmplY3RcIiE9dHlwZW9mIEludDhBcnJheSYmXCJmdW5jdGlvblwiIT10eXBlb2YgRCYmKGguaXNGdW5jdGlvbj1mdW5jdGlvbihuKXtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBufHwhMX0pLGguaXNGaW5pdGU9ZnVuY3Rpb24obil7cmV0dXJuIWguaXNTeW1ib2wobikmJmlzRmluaXRlKG4pJiYhaXNOYU4ocGFyc2VGbG9hdChuKSl9LGguaXNOYU49ZnVuY3Rpb24obil7cmV0dXJuIGguaXNOdW1iZXIobikmJmlzTmFOKG4pfSxoLmlzQm9vbGVhbj1mdW5jdGlvbihuKXtyZXR1cm4hMD09PW58fCExPT09bnx8XCJbb2JqZWN0IEJvb2xlYW5dXCI9PT1wLmNhbGwobil9LGguaXNOdWxsPWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT09bn0saC5pc1VuZGVmaW5lZD1mdW5jdGlvbihuKXtyZXR1cm4gdm9pZCAwPT09bn0saC5oYXM9ZnVuY3Rpb24obixyKXtpZighaC5pc0FycmF5KHIpKXJldHVybiBqKG4scik7Zm9yKHZhciB0PXIubGVuZ3RoLGU9MDtlPHQ7ZSsrKXt2YXIgdT1yW2VdO2lmKG51bGw9PW58fCFpLmNhbGwobix1KSlyZXR1cm4hMTtuPW5bdV19cmV0dXJuISF0fSxoLm5vQ29uZmxpY3Q9ZnVuY3Rpb24oKXtyZXR1cm4gbi5fPXIsdGhpc30saC5pZGVudGl0eT1mdW5jdGlvbihuKXtyZXR1cm4gbn0saC5jb25zdGFudD1mdW5jdGlvbihuKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gbn19LGgubm9vcD1mdW5jdGlvbigpe30saC5wcm9wZXJ0eT1mdW5jdGlvbihyKXtyZXR1cm4gaC5pc0FycmF5KHIpP2Z1bmN0aW9uKG4pe3JldHVybiB4KG4scil9OmIocil9LGgucHJvcGVydHlPZj1mdW5jdGlvbihyKXtyZXR1cm4gbnVsbD09cj9mdW5jdGlvbigpe306ZnVuY3Rpb24obil7cmV0dXJuIGguaXNBcnJheShuKT94KHIsbik6cltuXX19LGgubWF0Y2hlcj1oLm1hdGNoZXM9ZnVuY3Rpb24ocil7cmV0dXJuIHI9aC5leHRlbmRPd24oe30sciksZnVuY3Rpb24obil7cmV0dXJuIGguaXNNYXRjaChuLHIpfX0saC50aW1lcz1mdW5jdGlvbihuLHIsdCl7dmFyIGU9QXJyYXkoTWF0aC5tYXgoMCxuKSk7cj15KHIsdCwxKTtmb3IodmFyIHU9MDt1PG47dSsrKWVbdV09cih1KTtyZXR1cm4gZX0saC5yYW5kb209ZnVuY3Rpb24obixyKXtyZXR1cm4gbnVsbD09ciYmKHI9bixuPTApLG4rTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKihyLW4rMSkpfSxoLm5vdz1EYXRlLm5vd3x8ZnVuY3Rpb24oKXtyZXR1cm4obmV3IERhdGUpLmdldFRpbWUoKX07dmFyIEw9e1wiJlwiOlwiJmFtcDtcIixcIjxcIjpcIiZsdDtcIixcIj5cIjpcIiZndDtcIiwnXCInOlwiJnF1b3Q7XCIsXCInXCI6XCImI3gyNztcIixcImBcIjpcIiYjeDYwO1wifSxQPWguaW52ZXJ0KEwpLFc9ZnVuY3Rpb24ocil7dmFyIHQ9ZnVuY3Rpb24obil7cmV0dXJuIHJbbl19LG49XCIoPzpcIitoLmtleXMocikuam9pbihcInxcIikrXCIpXCIsZT1SZWdFeHAobiksdT1SZWdFeHAobixcImdcIik7cmV0dXJuIGZ1bmN0aW9uKG4pe3JldHVybiBuPW51bGw9PW4/XCJcIjpcIlwiK24sZS50ZXN0KG4pP24ucmVwbGFjZSh1LHQpOm59fTtoLmVzY2FwZT1XKEwpLGgudW5lc2NhcGU9VyhQKSxoLnJlc3VsdD1mdW5jdGlvbihuLHIsdCl7aC5pc0FycmF5KHIpfHwocj1bcl0pO3ZhciBlPXIubGVuZ3RoO2lmKCFlKXJldHVybiBoLmlzRnVuY3Rpb24odCk/dC5jYWxsKG4pOnQ7Zm9yKHZhciB1PTA7dTxlO3UrKyl7dmFyIGk9bnVsbD09bj92b2lkIDA6bltyW3VdXTt2b2lkIDA9PT1pJiYoaT10LHU9ZSksbj1oLmlzRnVuY3Rpb24oaSk/aS5jYWxsKG4pOml9cmV0dXJuIG59O3ZhciBDPTA7aC51bmlxdWVJZD1mdW5jdGlvbihuKXt2YXIgcj0rK0MrXCJcIjtyZXR1cm4gbj9uK3I6cn0saC50ZW1wbGF0ZVNldHRpbmdzPXtldmFsdWF0ZTovPCUoW1xcc1xcU10rPyklPi9nLGludGVycG9sYXRlOi88JT0oW1xcc1xcU10rPyklPi9nLGVzY2FwZTovPCUtKFtcXHNcXFNdKz8pJT4vZ307dmFyIEo9LyguKV4vLFU9e1wiJ1wiOlwiJ1wiLFwiXFxcXFwiOlwiXFxcXFwiLFwiXFxyXCI6XCJyXCIsXCJcXG5cIjpcIm5cIixcIlxcdTIwMjhcIjpcInUyMDI4XCIsXCJcXHUyMDI5XCI6XCJ1MjAyOVwifSxWPS9cXFxcfCd8XFxyfFxcbnxcXHUyMDI4fFxcdTIwMjkvZywkPWZ1bmN0aW9uKG4pe3JldHVyblwiXFxcXFwiK1Vbbl19O2gudGVtcGxhdGU9ZnVuY3Rpb24oaSxuLHIpeyFuJiZyJiYobj1yKSxuPWguZGVmYXVsdHMoe30sbixoLnRlbXBsYXRlU2V0dGluZ3MpO3ZhciB0LGU9UmVnRXhwKFsobi5lc2NhcGV8fEopLnNvdXJjZSwobi5pbnRlcnBvbGF0ZXx8Sikuc291cmNlLChuLmV2YWx1YXRlfHxKKS5zb3VyY2VdLmpvaW4oXCJ8XCIpK1wifCRcIixcImdcIiksbz0wLGE9XCJfX3ArPSdcIjtpLnJlcGxhY2UoZSxmdW5jdGlvbihuLHIsdCxlLHUpe3JldHVybiBhKz1pLnNsaWNlKG8sdSkucmVwbGFjZShWLCQpLG89dStuLmxlbmd0aCxyP2ErPVwiJytcXG4oKF9fdD0oXCIrcitcIikpPT1udWxsPycnOl8uZXNjYXBlKF9fdCkpK1xcbidcIjp0P2ErPVwiJytcXG4oKF9fdD0oXCIrdCtcIikpPT1udWxsPycnOl9fdCkrXFxuJ1wiOmUmJihhKz1cIic7XFxuXCIrZStcIlxcbl9fcCs9J1wiKSxufSksYSs9XCInO1xcblwiLG4udmFyaWFibGV8fChhPVwid2l0aChvYmp8fHt9KXtcXG5cIithK1wifVxcblwiKSxhPVwidmFyIF9fdCxfX3A9JycsX19qPUFycmF5LnByb3RvdHlwZS5qb2luLFwiK1wicHJpbnQ9ZnVuY3Rpb24oKXtfX3ArPV9fai5jYWxsKGFyZ3VtZW50cywnJyk7fTtcXG5cIithK1wicmV0dXJuIF9fcDtcXG5cIjt0cnl7dD1uZXcgRnVuY3Rpb24obi52YXJpYWJsZXx8XCJvYmpcIixcIl9cIixhKX1jYXRjaChuKXt0aHJvdyBuLnNvdXJjZT1hLG59dmFyIHU9ZnVuY3Rpb24obil7cmV0dXJuIHQuY2FsbCh0aGlzLG4saCl9LGM9bi52YXJpYWJsZXx8XCJvYmpcIjtyZXR1cm4gdS5zb3VyY2U9XCJmdW5jdGlvbihcIitjK1wiKXtcXG5cIithK1wifVwiLHV9LGguY2hhaW49ZnVuY3Rpb24obil7dmFyIHI9aChuKTtyZXR1cm4gci5fY2hhaW49ITAscn07dmFyIEc9ZnVuY3Rpb24obixyKXtyZXR1cm4gbi5fY2hhaW4/aChyKS5jaGFpbigpOnJ9O2gubWl4aW49ZnVuY3Rpb24odCl7cmV0dXJuIGguZWFjaChoLmZ1bmN0aW9ucyh0KSxmdW5jdGlvbihuKXt2YXIgcj1oW25dPXRbbl07aC5wcm90b3R5cGVbbl09ZnVuY3Rpb24oKXt2YXIgbj1bdGhpcy5fd3JhcHBlZF07cmV0dXJuIHUuYXBwbHkobixhcmd1bWVudHMpLEcodGhpcyxyLmFwcGx5KGgsbikpfX0pLGh9LGgubWl4aW4oaCksaC5lYWNoKFtcInBvcFwiLFwicHVzaFwiLFwicmV2ZXJzZVwiLFwic2hpZnRcIixcInNvcnRcIixcInNwbGljZVwiLFwidW5zaGlmdFwiXSxmdW5jdGlvbihyKXt2YXIgdD1lW3JdO2gucHJvdG90eXBlW3JdPWZ1bmN0aW9uKCl7dmFyIG49dGhpcy5fd3JhcHBlZDtyZXR1cm4gdC5hcHBseShuLGFyZ3VtZW50cyksXCJzaGlmdFwiIT09ciYmXCJzcGxpY2VcIiE9PXJ8fDAhPT1uLmxlbmd0aHx8ZGVsZXRlIG5bMF0sRyh0aGlzLG4pfX0pLGguZWFjaChbXCJjb25jYXRcIixcImpvaW5cIixcInNsaWNlXCJdLGZ1bmN0aW9uKG4pe3ZhciByPWVbbl07aC5wcm90b3R5cGVbbl09ZnVuY3Rpb24oKXtyZXR1cm4gRyh0aGlzLHIuYXBwbHkodGhpcy5fd3JhcHBlZCxhcmd1bWVudHMpKX19KSxoLnByb3RvdHlwZS52YWx1ZT1mdW5jdGlvbigpe3JldHVybiB0aGlzLl93cmFwcGVkfSxoLnByb3RvdHlwZS52YWx1ZU9mPWgucHJvdG90eXBlLnRvSlNPTj1oLnByb3RvdHlwZS52YWx1ZSxoLnByb3RvdHlwZS50b1N0cmluZz1mdW5jdGlvbigpe3JldHVybiBTdHJpbmcodGhpcy5fd3JhcHBlZCl9LFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZCYmZGVmaW5lKFwidW5kZXJzY29yZVwiLFtdLGZ1bmN0aW9uKCl7cmV0dXJuIGh9KX0oKTtcbiIsImltcG9ydCB7ZXh0cmFjdEV4dGVuc2lvbn0gZnJvbSBcInV0aWxzL3N0cmluZ3NcIjtcblxuZXhwb3J0IGNvbnN0IGlzUnRtcCA9IGZ1bmN0aW9uIChmaWxlLCB0eXBlKSB7XG4gICAgaWYoZmlsZSl7XG4gICAgICAgIHJldHVybiAoZmlsZS5pbmRleE9mKCdydG1wOicpID09IDAgfHwgdHlwZSA9PSAncnRtcCcpO1xuICAgIH1cbn07XG5leHBvcnQgY29uc3QgaXNXZWJSVEMgPSBmdW5jdGlvbiAoZmlsZSwgdHlwZSkge1xuICAgIGlmKGZpbGUpe1xuICAgICAgICByZXR1cm4gKGZpbGUuaW5kZXhPZignd3M6JykgPT09IDAgfHwgZmlsZS5pbmRleE9mKCd3c3M6JykgPT09IDAgfHwgdHlwZSA9PT0gJ3dlYnJ0YycpO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuZXhwb3J0IGNvbnN0IGlzSGxzID0gZnVuY3Rpb24gKGZpbGUsIHR5cGUpIHtcbiAgICBpZihmaWxlKXtcbiAgICAgICAgcmV0dXJuICggdHlwZSA9PT0gJ2hscycgfHwgIHR5cGUgPT09ICdtM3U4JyB8fCB0eXBlID09PSAnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnIHx8IGV4dHJhY3RFeHRlbnNpb24oZmlsZSkgPT0gJ20zdTgnKTtcblxuICAgIH1cbn07XG5leHBvcnQgY29uc3QgaXNEYXNoID0gZnVuY3Rpb24gKGZpbGUsIHR5cGUpIHtcbiAgICBpZihmaWxlKXtcbiAgICAgICAgcmV0dXJuICggdHlwZSA9PT0gJ21wZCcgfHwgIHR5cGUgPT09ICdkYXNoJyB8fCB0eXBlID09PSAnYXBwbGljYXRpb24vZGFzaCt4bWwnIHx8IGV4dHJhY3RFeHRlbnNpb24oZmlsZSkgPT0gJ21wZCcpO1xuXG4gICAgfVxufTtcbiIsIi8qKlxuICogdXRpbHMgZm9yIHdlYnBhY2tcbiAqL1xuXG5leHBvcnQgY29uc3QgZ2V0U2NyaXB0UGF0aCA9IGZ1bmN0aW9uKHNjcmlwdE5hbWUpIHtcbiAgICBjb25zdCBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2NyaXB0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBzcmMgPSBzY3JpcHRzW2ldLnNyYztcbiAgICAgICAgaWYgKHNyYykge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBzcmMubGFzdEluZGV4T2YoJy8nICsgc2NyaXB0TmFtZSk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzcmMuc3Vic3RyKDAsIGluZGV4ICsgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuICcnO1xufTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDYuIDI5Li5cbiAqL1xuZXhwb3J0IGNvbnN0IHZlcnNpb24gPSBfX1ZFUlNJT05fXztcbiJdLCJzb3VyY2VSb290IjoiIn0=