/*! OvenPlayerv0.9.5972 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

            //Init Provider.
            currentProvider = Providers[currentSourceIndex].provider(mediaManager.createMedia(providerName, playerConfig), playerConfig, playlistManager.getCurrentAdTag());
            OvenPlayerConsole.log("API : init() provider", providerName);

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

            var type = source.type;

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
    that.findProviderNamesByPlaylist = function (playlistItem) {
        OvenPlayerConsole.log("SupportChecker : findProviderNamesByPlaylist()", playlistItem);
        var supportNames = [];
        /*for (let i = playlist_.length; i--;) {
          }*/
        var item = playlistItem;
        var source = "";
        if (item && item.sources) {
            for (var j = 0; j < item.sources.length; j++) {
                source = item.sources[j];
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
var version = exports.version = '0.9.5972-localbuild';

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvQXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvQXBpRXhwYW5zaW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0NvbmZpZ3VyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0V2ZW50RW1pdHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0xhenlDb21tYW5kRXhlY3V0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9TdXBwb3J0Q2hlY2tlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2NhcHRpb24vTG9hZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvY2FwdGlvbi9NYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvY2FwdGlvbi9wYXJzZXIvU3J0UGFyc2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvY29uc3RhbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvbWVkaWEvTWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3BsYXlsaXN0L01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9Db250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9vdmVucGxheWVyLnNkay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvY2FwdGlvbnMvdnR0Q3VlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9saWtlQSQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3N0cmluZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3VuZGVyc2NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3ZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvd2VicGFjay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmVyc2lvbi5qcyJdLCJuYW1lcyI6WyJBcGkiLCJjb250YWluZXIiLCJ0aGF0IiwiY29uc29sZSIsImxvZyIsInZlcnNpb24iLCJPdmVuUGxheWVyQ29uc29sZSIsInBsYXlsaXN0TWFuYWdlciIsInByb3ZpZGVyQ29udHJvbGxlciIsInVzZXJBZ2VudE9iamVjdCIsIm1lZGlhTWFuYWdlciIsImN1cnJlbnRQcm92aWRlciIsInBsYXllckNvbmZpZyIsImxhenlRdWV1ZSIsImNhcHRpb25NYW5hZ2VyIiwicnVuTmV4dFBsYXlsaXN0IiwiaW5kZXgiLCJuZXh0UGxheWxpc3RJbmRleCIsInBsYXlsaXN0IiwiZ2V0UGxheWxpc3QiLCJoYXNOZXh0UGxheWxpc3QiLCJzZXRTb3VyY2VJbmRleCIsInNldEN1cnJlbnRQbGF5bGlzdCIsImluaXRQcm92aWRlciIsImlzQXV0b1N0YXJ0IiwicGxheSIsInRyaWdnZXIiLCJBTExfUExBWUxJU1RfRU5ERUQiLCJsYXN0UGxheVBvc2l0aW9uIiwicGlja1F1YWxpdHlGcm9tU291cmNlIiwic291cmNlcyIsInF1YWxpdHkiLCJpIiwibGVuZ3RoIiwiZ2V0U291cmNlSW5kZXgiLCJsb2FkUHJvdmlkZXJzIiwiZ2V0Q3VycmVudFBsYXlMaXN0IiwidGhlbiIsIlByb3ZpZGVycyIsIkVSUk9SUyIsIklOSVRfVU5TVVBQT1JUX0VSUk9SIiwiZGVzdHJveSIsImdldEN1cnJlbnRQbGF5bGlzdEluZGV4IiwiY3VycmVudFNvdXJjZUluZGV4IiwiZ2V0Q3VycmVudFNvdXJjZXMiLCJwcm92aWRlck5hbWUiLCJwcm92aWRlciIsImNyZWF0ZU1lZGlhIiwiZ2V0Q3VycmVudEFkVGFnIiwiUFJPVklERVJfUlRNUCIsIm9uIiwibmFtZSIsImRhdGEiLCJFUlJPUiIsIk5FVFdPUktfVU5TVEFCTEVEIiwiZ2V0U291cmNlcyIsInBhdXNlIiwic2V0Q3VycmVudFNvdXJjZSIsInByZWxvYWQiLCJSRUFEWSIsImZsdXNoIiwiZXJyb3IiLCJvZmYiLCJjb2RlIiwidGVtcEVycm9yIiwiSU5JVF9VTktOV09OX0VSUk9SIiwiaW5pdCIsIm9wdGlvbnMiLCJtZWRpYUNvbnRhaW5lciIsImJyb3dzZXIiLCJpbml0UGxheWxpc3QiLCJnZXRQcm92aWRlck5hbWUiLCJnZXROYW1lIiwiZ2V0Q29uZmlnIiwiZ2V0QnJvd3NlciIsInNldFRpbWVjb2RlTW9kZSIsImlzU2hvdyIsImlzVGltZWNvZGVNb2RlIiwiZ2V0RnJhbWVyYXRlIiwic2Vla0ZyYW1lIiwiZnJhbWVDb3VudCIsImdldER1cmF0aW9uIiwiZ2V0UG9zaXRpb24iLCJnZXRWb2x1bWUiLCJzZXRWb2x1bWUiLCJ2b2x1bWUiLCJzZXRNdXRlIiwic3RhdGUiLCJnZXRNdXRlIiwibG9hZCIsInNldEN1cnJlbnRRdWFsaXR5Iiwic2VlayIsInBvc2l0aW9uIiwic2V0UGxheWJhY2tSYXRlIiwicGxheWJhY2tSYXRlIiwiZ2V0UGxheWJhY2tSYXRlIiwiZ2V0Q3VycmVudFBsYXlsaXN0IiwiZ2V0Q3VycmVudFNvdXJjZSIsImN1cnJlbnRTb3VyY2UiLCJuZXdTb3VyY2UiLCJpc1NhbWVQcm92aWRlciIsInJlc3VsdFNvdXJjZUluZGV4IiwiZ2V0UXVhbGl0eUxldmVscyIsImdldEN1cnJlbnRRdWFsaXR5IiwicXVhbGl0eUluZGV4IiwiaXNBdXRvUXVhbGl0eSIsInNldEF1dG9RdWFsaXR5IiwiaXNBdXRvIiwiZ2V0Q2FwdGlvbkxpc3QiLCJnZXRDdXJyZW50Q2FwdGlvbiIsInNldEN1cnJlbnRDYXB0aW9uIiwiYWRkQ2FwdGlvbiIsInRyYWNrIiwicmVtb3ZlQ2FwdGlvbiIsImdldEJ1ZmZlciIsImdldFN0YXRlIiwic3RvcCIsInJlbW92ZSIsIkRFU1RST1kiLCJPdmVuUGxheWVyU0RLIiwicmVtb3ZlUGxheWVyIiwiZ2V0Q29udGFpbmVySWQiLCJnZXRQbGF5ZXJMaXN0IiwiZ2V0VmVyc2lvbiIsIkFwaVJ0bXBFeHBhbnNpb24iLCJleHRlcm5hbENhbGxiYWNrQ3JlZXAiLCJyZXN1bHQiLCJ0cmlnZ2VyRXZlbnRGcm9tRXh0ZXJuYWwiLCJDb25maWd1cmF0b3IiLCJjb21wb3NlU291cmNlT3B0aW9ucyIsIkRlZmF1bHRzIiwicGxheWJhY2tSYXRlcyIsIm11dGUiLCJsb29wIiwiY29udHJvbHMiLCJhdXRvU3RhcnQiLCJ0aW1lY29kZSIsInNvdXJjZUluZGV4IiwiaGlkZVBsYXlsaXN0SWNvbiIsInJ0bXBCdWZmZXJUaW1lIiwicnRtcEJ1ZmZlclRpbWVNYXgiLCJzZXJpYWxpemUiLCJ2YWwiLCJ1bmRlZmluZWQiLCJsb3dlcmNhc2VWYWwiLCJ0b0xvd2VyQ2FzZSIsImlzTmFOIiwiTnVtYmVyIiwicGFyc2VGbG9hdCIsImRlc2VyaWFsaXplIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJjb25maWciLCJmaWx0ZXIiLCJfIiwiaXNOdW1iZXIiLCJyYXRlIiwibWFwIiwiTWF0aCIsInJvdW5kIiwiaW5kZXhPZiIsInB1c2giLCJzb3J0IiwiY29uZmlnUGxheWxpc3QiLCJvYmoiLCJwaWNrIiwiaXNBcnJheSIsImZlZWREYXRhIiwiZHVyYXRpb24iLCJzcGVjIiwic2V0Q29uZmlnIiwidmFsdWUiLCJnZXRDb250YWluZXIiLCJnZXRRdWFsaXR5TGFiZWwiLCJxdWFsaXR5TGFiZWwiLCJzZXRRdWFsaXR5TGFiZWwiLCJuZXdMYWJlbCIsIkNPTlRFTlRfVElNRV9NT0RFX0NIQU5HRUQiLCJnZXRSdG1wQnVmZmVyVGltZSIsImdldFJ0bXBCdWZmZXJUaW1lTWF4IiwiaXNNdXRlIiwiaXNMb29wIiwiaXNDb250cm9scyIsImdldFBsYXliYWNrUmF0ZXMiLCJzZXRQbGF5bGlzdCIsIkV2ZW50RW1pdHRlciIsIm9iamVjdCIsIl9ldmVudHMiLCJ0cmlnZ2VyRXZlbnRzIiwiZXZlbnRzIiwiYXJncyIsImNvbnRleHQiLCJldmVudCIsImxpc3RlbmVyIiwiYXBwbHkiLCJzbGljZSIsImNhbGwiLCJhcmd1bWVudHMiLCJhbGxFdmVudHMiLCJhbGwiLCJuYW1lcyIsImwiLCJyZXRhaW4iLCJqIiwiayIsIl9saXN0ZW5lciIsIm9uY2UiLCJjb3VudCIsIm9uY2VDYWxsYmFjayIsIkxhenlDb21tYW5kRXhlY3V0b3IiLCJpbnN0YW5jZSIsInF1ZXVlZENvbW1hbmRzIiwiY29tbWFuZFF1ZXVlIiwidW5kZWNvcmF0ZWRNZXRob2RzIiwiZXhlY3V0ZU1vZGUiLCJjb21tYW5kIiwibWV0aG9kIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJhZGRRdWV1ZSIsImV4ZWN1dGVRdWV1ZWRDb21tYW5kcyIsInNoaWZ0Iiwic2V0RXhlY3V0ZU1vZGUiLCJtb2RlIiwiZ2V0VW5kZWNvcmF0ZWRNZXRob2RzIiwiZ2V0UXVldWUiLCJlbXB0eSIsInJlbW92ZUFuZEV4Y3V0ZU9uY2UiLCJjb21tYW5kXyIsImNvbW1hbmRRdWV1ZUl0ZW0iLCJmaW5kV2hlcmUiLCJzcGxpY2UiLCJmaW5kSW5kZXgiLCJTdXBwb3J0Q2hlY2tlciIsInN1cHBvcnRMaXN0IiwiY2hlY2tTdXBwb3J0Iiwic291cmNlIiwiTWltZVR5cGVzIiwiYWFjIiwibXA0IiwiZjR2IiwibTR2IiwibW92IiwibXAzIiwibXBlZyIsIm9ndiIsIm9nZyIsIm9nYSIsInZvcmJpcyIsIndlYm0iLCJmNGEiLCJtM3U4IiwibTN1IiwiaGxzIiwidmlkZW8iLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjYW5QbGF5VHlwZSIsImZpbGUiLCJ0eXBlIiwibWltZVR5cGUiLCJ3aW5kb3ciLCJNZWRpYVNvdXJjZSIsIldlYktpdE1lZGlhU291cmNlIiwiaXNIbHNTdXBwb3J0IiwiZ2V0TWVkaWFTb3VyY2UiLCJtZWRpYVNvdXJjZSIsInNvdXJjZUJ1ZmZlciIsIlNvdXJjZUJ1ZmZlciIsIldlYktpdFNvdXJjZUJ1ZmZlciIsImlzVHlwZVN1cHBvcnRlZCIsInNvdXJjZUJ1ZmZlclZhbGlkQVBJIiwiYXBwZW5kQnVmZmVyIiwiZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlIiwic29ydWNlXyIsImZpbmRQcm92aWRlck5hbWVzQnlQbGF5bGlzdCIsInBsYXlsaXN0SXRlbSIsInN1cHBvcnROYW1lcyIsIml0ZW0iLCJzdXBwb3J0ZWQiLCJMb2FkZXIiLCJjb252ZXJ0VG9WVFRDdWVzIiwiY3VlcyIsIlZUVEN1ZSIsImN1ZSIsInN0YXJ0IiwiZW5kIiwidGV4dCIsImxhbmd1YWdlIiwic3VjY2Vzc0NhbGxiYWNrIiwiZXJyb3JDYWxsYmFjayIsInJlcXVlc3RPcHRpb25zIiwidXJsIiwiZW5jb2RpbmciLCJsb2FkUmVxdWVzdERvd25sb2RlciIsIlJlcXVlc3QiLCJyZXNwb25zZSIsImJvZHkiLCJ2dHRDdWVzIiwibG9hZFZ0dFBhcnNlciIsInBhcnNlciIsIldlYlZUVCIsIlBhcnNlciIsIlN0cmluZ0RlY29kZXIiLCJvbmN1ZSIsIm9uZmx1c2giLCJwYXJzZSIsImxvYWRTbWlQYXJzZXIiLCJwYXJzZWREYXRhIiwiU21pUGFyc2VyIiwiZml4ZWRMYW5nIiwicmVxdWlyZSIsImVyciIsImlzU3VwcG9ydCIsImtpbmQiLCJNYW5hZ2VyIiwiYXBpIiwicGxheWxpc3RJbmRleCIsImNhcHRpb25MaXN0IiwiY3VycmVudENhcHRpb25JbmRleCIsImNhcHRpb25Mb2FkZXIiLCJpc0Zpc3J0TG9hZCIsImlzU2hvd2luZyIsImJpbmRUcmFjayIsImxhYmVsIiwiaWQiLCJ0cmFja3NDb3VudCIsInRyYWNrSWQiLCJwcmVmaXgiLCJkZWZhdWx0dHJhY2siLCJjaGFuZ2VDdXJyZW50Q2FwdGlvbiIsIkNPTlRFTlRfQ0FQVElPTl9DSEFOR0VEIiwidHJhY2tzIiwibGFuZyIsImNhcHRpb25JZCIsIlBMQVlFUl9DQVBUSU9OX0VSUk9SIiwiQ09OVEVOVF9USU1FIiwibWV0YSIsImN1cnJlbnRDdWVzIiwic3RhcnRUaW1lIiwiZW5kVGltZSIsIkNPTlRFTlRfQ0FQVElPTl9DVUVfQ0hBTkdFRCIsImZsdXNoQ2FwdGlvbkxpc3QiLCJsYXN0Q2FwdGlvbkluZGV4IiwiX2luZGV4IiwiX2VudHJ5IiwiZW50cnkiLCJhcnJheSIsInNwbGl0IiwiaWR4IiwibGluZSIsInN1YnN0ciIsImpvaW4iLCJTcnRQYXJzZXIiLCJjYXB0aW9ucyIsImxpc3QiLCJTVEFURV9CVUZGRVJJTkciLCJTVEFURV9JRExFIiwiU1RBVEVfQ09NUExFVEUiLCJTVEFURV9QQVVTRUQiLCJTVEFURV9QTEFZSU5HIiwiU1RBVEVfRVJST1IiLCJTVEFURV9MT0FESU5HIiwiU1RBVEVfU1RBTExFRCIsIlNUQVRFX0FEX0xPQURFRCIsIlNUQVRFX0FEX1BMQVlJTkciLCJTVEFURV9BRF9QQVVTRUQiLCJTVEFURV9BRF9DT01QTEVURSIsIlNUQVRFX0FEX0VSUk9SIiwiUFJPVklERVJfSFRNTDUiLCJQUk9WSURFUl9XRUJSVEMiLCJQUk9WSURFUl9EQVNIIiwiUFJPVklERVJfSExTIiwiQ09OVEVOVF9DT01QTEVURSIsIkNPTlRFTlRfU0VFSyIsIkNPTlRFTlRfQlVGRkVSX0ZVTEwiLCJESVNQTEFZX0NMSUNLIiwiQ09OVEVOVF9MT0FERUQiLCJQTEFZTElTVF9DSEFOR0VEIiwiQ09OVEVOVF9TRUVLRUQiLCJQTEFZRVJfU1RBVEUiLCJQTEFZRVJfQ09NUExFVEUiLCJQTEFZRVJfUEFVU0UiLCJQTEFZRVJfUExBWSIsIlBMQVlFUl9SRVNJWkVEIiwiUExBWUVSX0xPQURJTkciLCJQTEFZRVJfRlVMTFNDUkVFTl9SRVFVRVNUIiwiUExBWUVSX0ZVTExTQ1JFRU5fQ0hBTkdFRCIsIlBMQVlFUl9XQVJOSU5HIiwiQURfQ0hBTkdFRCIsIkFEX1RJTUUiLCJDT05URU5UX0JVRkZFUiIsIkNPTlRFTlRfUkFURV9DSEFOR0UiLCJDT05URU5UX1ZPTFVNRSIsIkNPTlRFTlRfTVVURSIsIkNPTlRFTlRfTUVUQSIsIkNPTlRFTlRfU09VUkNFX0NIQU5HRUQiLCJDT05URU5UX0xFVkVMX0NIQU5HRUQiLCJQTEFZQkFDS19SQVRFX0NIQU5HRUQiLCJPTUVfUDJQX01PREUiLCJJTklUX1JUTVBfU0VUVVBfRVJST1IiLCJJTklUX0RBU0hfVU5TVVBQT1JUIiwiSU5JVF9BRFNfRVJST1IiLCJJTklUX0RBU0hfTk9URk9VTkQiLCJQTEFZRVJfVU5LTldPTl9FUlJPUiIsIlBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUiIsIlBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IiLCJQTEFZRVJfRklMRV9FUlJPUiIsIlBMQVlFUl9XRUJSVENfV1NfRVJST1IiLCJQTEFZRVJfV0VCUlRDX0FERF9JQ0VDQU5ESURBVEVfRVJST1IiLCJQTEFZRVJfV0VCUlRDX1NFVF9SRU1PVEVfREVTQ19FUlJPUiIsIlBMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUiIsIlBMQVlFUl9XRUJSVENfU0VUX0xPQ0FMX0RFU0NfRVJST1IiLCJQTEFZRVJfV0VCUlRDX05FVFdPUktfU0xPVyIsIldBUk5fTVNHX01VVEVEUExBWSIsIm1lc3NhZ2UiLCJyZWFzb24iLCJVSV9JQ09OUyIsInZvbHVtZV9tdXRlIiwiYnJvd3NlckluZm8iLCJTV0ZQYXRoIiwicm9vdElkIiwiZ2V0QXR0cmlidXRlIiwiJGNvbnRhaW5lciIsInZpZGVvRWxlbWVudCIsImNyZWF0ZUh0bWxWaWRlbyIsInNldEF0dHJpYnV0ZSIsImFwcGVuZCIsImNyZWF0ZUZsYXNoVmlkZW8iLCJidWZmZXJUaW1lIiwiYnVmZmVyVGltZU1heCIsIm1vdmllIiwiZmxhc2h2YXJzIiwiYWxsb3dzY3JpcHRhY2Nlc3MiLCJhbGxvd2Z1bGxzY3JlZW4iLCJtZW51IiwicXVhbCIsImJnY29sb3IiLCJ3bW9kZSIsImJyb3dzZXJNYWpvclZlcnNpb24iLCJhcHBlbmRDaGlsZCIsImNyZWF0ZUFkQ29udGFpbmVyIiwiYWRDb250YWluZXIiLCJyZW1vdmVDaGlsZCIsImN1cnJlbnRQbGF5bGlzdEl0ZW0iLCJjdXJyZW50SW5kZXgiLCJzdXBwb3J0Q2hlY2tlciIsIm1ha2VQcmV0dHlTb3VyY2UiLCJzb3VyY2VfIiwiaG9zdCIsImFwcGxpY2F0aW9uIiwic3RyZWFtIiwibWltZXR5cGVSZWdFeCIsInRlc3QiLCJyZXBsYWNlIiwicHJldHRpZWRQbGF5bGlzdCIsInRpdGxlIiwibGV2ZWxzIiwicHJldHR5U291cmNlIiwiZGVmYXVsdFNvdXJjZSIsInRvU3RyaW5nIiwiY29uY2F0IiwiYWRUYWdVcmwiLCJDb250cm9sbGVyIiwic3VwcG9ydENoYWNrZXIiLCJyZWdpc3RlUHJvdmlkZXIiLCJQcm92aWRlckxvYWRlciIsImh0bWw1IiwiRXJyb3IiLCJ3ZWJydGMiLCJkYXNoIiwicnRtcCIsInN1cHBvcnRlZFByb3ZpZGVyTmFtZXMiLCJQcm9taXNlIiwicmVqZWN0IiwiZmluZEJ5TmFtZSIsImdldFByb3ZpZGVyQnlTb3VyY2UiLCJzdXBwb3J0ZWRQcm92aWRlck5hbWUiLCJfX3dlYnBhY2tfcHVibGljX3BhdGhfXyIsInBsYXllckxpc3QiLCJjaGVja0FuZEdldENvbnRhaW5lckVsZW1lbnQiLCJjb250YWluZXJFbGVtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJub2RlVHlwZSIsImNyZWF0ZSIsInBsYXllckluc3RhbmNlIiwiZ2V0UGxheWVyQnlDb250YWluZXJJZCIsImNvbnRhaW5lcklkIiwiZ2V0UGxheWVyQnlJbmRleCIsInBsYXllcklkIiwiZ2VuZXJhdGVXZWJydGNVcmxzIiwiZGVidWciLCJpc0RlYnVnTW9kZSIsImdldEJyb3dzZXJMYW5ndWFnZSIsIm5hdiIsIm5hdmlnYXRvciIsImJyb3dzZXJMYW5ndWFnZVByb3BlcnR5S2V5cyIsImxhbmd1YWdlcyIsImFuYWxVc2VyQWdlbnQiLCJ1bmtub3duIiwic2NyZWVuU2l6ZSIsInNjcmVlbiIsIndpZHRoIiwiaGVpZ2h0IiwiblZlciIsImFwcFZlcnNpb24iLCJuQWd0IiwidXNlckFnZW50IiwiYXBwTmFtZSIsIm1ham9yVmVyc2lvbiIsInBhcnNlSW50IiwiaXNXZWJ2aWV3IiwibmFtZU9mZnNldCIsInZlck9mZnNldCIsIml4Iiwic3Vic3RyaW5nIiwibGFzdEluZGV4T2YiLCJ0b1VwcGVyQ2FzZSIsIm1vYmlsZSIsImNvb2tpZUVuYWJsZWQiLCJjb29raWUiLCJvcyIsImNsaWVudFN0cmluZ3MiLCJzIiwiciIsImNzIiwib3NWZXJzaW9uIiwiZXhlYyIsImZsYXNoVmVyc2lvbiIsInN3Zm9iamVjdCIsImZ2IiwiZ2V0Rmxhc2hQbGF5ZXJWZXJzaW9uIiwibWFqb3IiLCJtaW5vciIsInJlbGVhc2UiLCJicm93c2VyVmVyc2lvbiIsInVhIiwiY29va2llcyIsIndlYnZpZXciLCJhdXRvS2V5d29yZCIsImRpcmVjdGlvblNldHRpbmciLCJhbGlnblNldHRpbmciLCJmaW5kRGlyZWN0aW9uU2V0dGluZyIsImRpciIsImZpbmRBbGlnblNldHRpbmciLCJhbGlnbiIsImV4dGVuZCIsImNvYmoiLCJwIiwiaXNJRTgiLCJiYXNlT2JqIiwiZW51bWVyYWJsZSIsImhhc0JlZW5SZXNldCIsIl9pZCIsIl9wYXVzZU9uRXhpdCIsIl9zdGFydFRpbWUiLCJfZW5kVGltZSIsIl90ZXh0IiwiX3JlZ2lvbiIsIl92ZXJ0aWNhbCIsIl9zbmFwVG9MaW5lcyIsIl9saW5lIiwiX2xpbmVBbGlnbiIsIl9wb3NpdGlvbiIsIl9wb3NpdGlvbkFsaWduIiwiX3NpemUiLCJfYWxpZ24iLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsInNldCIsIlR5cGVFcnJvciIsInNldHRpbmciLCJTeW50YXhFcnJvciIsImRpc3BsYXlTdGF0ZSIsImdldEN1ZUFzSFRNTCIsImNvbnZlcnRDdWVUb0RPTVRyZWUiLCJMYSQiLCJzZWxlY3Rvck9yRWxlbWVudCIsInJldHVybk5vZGUiLCIkZWxlbWVudCIsInNlbGVjdG9yIiwibm9kZUxpc3QiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaXNFbGVtZW50IiwiZXZlcnkiLCJmaW5kIiwiY3NzIiwiZWxlbWVudCIsInN0eWxlIiwiYWRkQ2xhc3MiLCJjbGFzc0xpc3QiLCJhZGQiLCJjbGFzc05hbWVzIiwiY2xhc3NOYW1lIiwicmVtb3ZlQ2xhc3MiLCJSZWdFeHAiLCJyZW1vdmVBdHRyaWJ1dGUiLCJhdHRyTmFtZSIsInNob3ciLCJkaXNwbGF5IiwiaGlkZSIsInRleHRDb250ZW50IiwiaHRtbCIsImlubmVySFRNTCIsImhhc0NsYXNzIiwiY29udGFpbnMiLCJpcyIsIiR0YXJnZXRFbGVtZW50Iiwib2Zmc2V0IiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInRvcCIsInNjcm9sbFRvcCIsImxlZnQiLCJzY3JvbGxMZWZ0IiwiY2xpZW50V2lkdGgiLCJjbGllbnRIZWlnaHQiLCJhdHRyIiwicmVwbGFjZVdpdGgiLCJwYXJlbnRFbGVtZW50IiwiaGFzQ2hpbGROb2RlcyIsImZpcnN0Q2hpbGQiLCJjbG9zZXN0Iiwic2VsZWN0b3JTdHJpbmciLCJjbG9zZXN0RWxlbWVudCIsInRyaW0iLCJuYXR1cmFsSG1zIiwiaG1zVG9TZWNvbmQiLCJzdHJpbmciLCJleHRyYWN0RXh0ZW5zaW9uIiwicGF0aCIsImdldEF6dXJlRmlsZUZvcm1hdCIsImV4dGVuc2lvbiIsImF6dXJlZEZvcm1hdCIsInNlY29uZCIsInNlY051bSIsImhvdXJzIiwiZmxvb3IiLCJtaW51dGVzIiwic2Vjb25kcyIsInN0ciIsImZyYW1lUmF0ZSIsImFyciIsImFyckxlbmd0aCIsInNlYyIsInNlY0luZGV4IiwibiIsInNlbGYiLCJnbG9iYWwiLCJlIiwibyIsIlN5bWJvbCIsInUiLCJjIiwiaGFzT3duUHJvcGVydHkiLCJ0IiwiYSIsImYiLCJoIiwiX3dyYXBwZWQiLCJleHBvcnRzIiwibW9kdWxlIiwiVkVSU0lPTiIsInYiLCJ5IiwiZCIsIml0ZXJhdGVlIiwiaWRlbnRpdHkiLCJpc0Z1bmN0aW9uIiwiaXNPYmplY3QiLCJtYXRjaGVyIiwicHJvcGVydHkiLCJnIiwibWF4IiwibSIsImIiLCJ4IiwicG93IiwiQSIsInciLCJlYWNoIiwiY29sbGVjdCIsIk8iLCJyZWR1Y2UiLCJmb2xkbCIsImluamVjdCIsInJlZHVjZVJpZ2h0IiwiZm9sZHIiLCJkZXRlY3QiLCJmaW5kS2V5Iiwic2VsZWN0IiwibmVnYXRlIiwic29tZSIsImFueSIsImluY2x1ZGVzIiwiaW5jbHVkZSIsInZhbHVlcyIsImludm9rZSIsInBsdWNrIiwid2hlcmUiLCJtaW4iLCJzaHVmZmxlIiwic2FtcGxlIiwicmFuZG9tIiwiY2xvbmUiLCJzb3J0QnkiLCJjcml0ZXJpYSIsImdyb3VwQnkiLCJpbmRleEJ5IiwiY291bnRCeSIsIlMiLCJ0b0FycmF5IiwiaXNTdHJpbmciLCJtYXRjaCIsInNpemUiLCJwYXJ0aXRpb24iLCJmaXJzdCIsImhlYWQiLCJ0YWtlIiwiaW5pdGlhbCIsImxhc3QiLCJyZXN0IiwidGFpbCIsImRyb3AiLCJjb21wYWN0IiwiQm9vbGVhbiIsIk0iLCJpc0FyZ3VtZW50cyIsImZsYXR0ZW4iLCJ3aXRob3V0IiwiZGlmZmVyZW5jZSIsInVuaXEiLCJ1bmlxdWUiLCJpc0Jvb2xlYW4iLCJ1bmlvbiIsImludGVyc2VjdGlvbiIsInVuemlwIiwiemlwIiwiRiIsImZpbmRMYXN0SW5kZXgiLCJzb3J0ZWRJbmRleCIsIkUiLCJyYW5nZSIsImNlaWwiLCJjaHVuayIsIk4iLCJiaW5kIiwicGFydGlhbCIsInBsYWNlaG9sZGVyIiwiYmluZEFsbCIsIm1lbW9pemUiLCJjYWNoZSIsImRlbGF5Iiwic2V0VGltZW91dCIsImRlZmVyIiwidGhyb3R0bGUiLCJsZWFkaW5nIiwibm93IiwiY2xlYXJUaW1lb3V0IiwidHJhaWxpbmciLCJjYW5jZWwiLCJkZWJvdW5jZSIsIndyYXAiLCJjb21wb3NlIiwiYWZ0ZXIiLCJiZWZvcmUiLCJyZXN0QXJndW1lbnRzIiwiSSIsInByb3BlcnR5SXNFbnVtZXJhYmxlIiwiVCIsIkIiLCJjb25zdHJ1Y3RvciIsImFsbEtleXMiLCJtYXBPYmplY3QiLCJwYWlycyIsImludmVydCIsImZ1bmN0aW9ucyIsIm1ldGhvZHMiLCJSIiwiZXh0ZW5kT3duIiwiYXNzaWduIiwicSIsIksiLCJ6Iiwib21pdCIsIlN0cmluZyIsImRlZmF1bHRzIiwidGFwIiwiaXNNYXRjaCIsInZhbHVlT2YiLCJwb3AiLCJpc0VxdWFsIiwiaXNFbXB0eSIsIkQiLCJjaGlsZE5vZGVzIiwiSW50OEFycmF5IiwiaXNGaW5pdGUiLCJpc1N5bWJvbCIsImlzTnVsbCIsImlzVW5kZWZpbmVkIiwiaGFzIiwibm9Db25mbGljdCIsImNvbnN0YW50Iiwibm9vcCIsInByb3BlcnR5T2YiLCJtYXRjaGVzIiwidGltZXMiLCJEYXRlIiwiZ2V0VGltZSIsIkwiLCJQIiwiVyIsImVzY2FwZSIsInVuZXNjYXBlIiwiQyIsInVuaXF1ZUlkIiwidGVtcGxhdGVTZXR0aW5ncyIsImV2YWx1YXRlIiwiaW50ZXJwb2xhdGUiLCJKIiwiVSIsIlYiLCIkIiwidGVtcGxhdGUiLCJ2YXJpYWJsZSIsIkZ1bmN0aW9uIiwiY2hhaW4iLCJfY2hhaW4iLCJHIiwibWl4aW4iLCJ0b0pTT04iLCJkZWZpbmUiLCJpc1J0bXAiLCJpc1dlYlJUQyIsImlzRGFzaCIsImdldFNjcmlwdFBhdGgiLCJzY3JpcHROYW1lIiwic2NyaXB0cyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwic3JjIiwiX19WRVJTSU9OX18iXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGdCQUFRLG9CQUFvQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQSxpREFBeUMsczRCQUFzNEI7QUFDLzZCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFD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QUFNa2tCLHdDQUFnQixTQUFoQkEsYUFBZ0IsQ0FBU0MsVUFBVCxFQUFxQjtBQUM5QyxRQUFNQyxVQUFVdmtCLFNBQVN3a0Isb0JBQVQsQ0FBOEIsUUFBOUIsQ0FBaEI7QUFDQSxTQUFLLElBQUl6eUIsSUFBSSxDQUFiLEVBQWdCQSxJQUFJd3lCLFFBQVF2eUIsTUFBNUIsRUFBb0NELEdBQXBDLEVBQXlDO0FBQ3JDLFlBQU0weUIsTUFBTUYsUUFBUXh5QixDQUFSLEVBQVcweUIsR0FBdkI7QUFDQSxZQUFJQSxHQUFKLEVBQVM7QUFDTCxnQkFBTTF6QixRQUFRMHpCLElBQUluVSxXQUFKLENBQWdCLE1BQU1nVSxVQUF0QixDQUFkO0FBQ0EsZ0JBQUl2ekIsU0FBUyxDQUFiLEVBQWdCO0FBQ1osdUJBQU8wekIsSUFBSXplLE1BQUosQ0FBVyxDQUFYLEVBQWNqVixRQUFRLENBQXRCLENBQVA7QUFDSDtBQUNKO0FBQ0o7QUFDRCxXQUFPLEVBQVA7QUFDSCxDQVpNLEM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSlA7OztBQUdPLElBQU1YLDRCQUFVczBCLHFCQUFoQixDIiwiZmlsZSI6Im92ZW5wbGF5ZXIuc2RrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG5cblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0fTtcblxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJvdmVucGxheWVyLnNka1wiOiAwXG4gXHR9O1xuXG5cblxuIFx0Ly8gc2NyaXB0IHBhdGggZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIGpzb25wU2NyaXB0U3JjKGNodW5rSWQpIHtcbiBcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyAoe1wib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1fm92ZW5wbGF5ZX4yZWMxOTNhY1wiOlwib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1fm92ZW5wbGF5ZX4yZWMxOTNhY1wiLFwib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1fm92ZW5wbGF5ZX43YWZkNjhjZlwiOlwib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1fm92ZW5wbGF5ZX43YWZkNjhjZlwiLFwib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1XCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1XCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLldlYlJUQ1Byb3ZpZGVyXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLldlYlJUQ1Byb3ZpZGVyXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLlJ0bXBQcm92aWRlclwiOlwib3ZlbnBsYXllci5wcm92aWRlci5SdG1wUHJvdmlkZXJcIixcInNtaXBhcnNlclwiOlwic21pcGFyc2VyXCIsXCJ2ZW5kb3JzfmRvd25sb2FkZXJcIjpcInZlbmRvcnN+ZG93bmxvYWRlclwiLFwiZG93bmxvYWRlclwiOlwiZG93bmxvYWRlclwiLFwidnR0cGFyc2VyXCI6XCJ2dHRwYXJzZXJcIn1bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuanNcIlxuIFx0fVxuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lID0gZnVuY3Rpb24gcmVxdWlyZUVuc3VyZShjaHVua0lkKSB7XG4gXHRcdHZhciBwcm9taXNlcyA9IFtdO1xuXG5cbiBcdFx0Ly8gSlNPTlAgY2h1bmsgbG9hZGluZyBmb3IgamF2YXNjcmlwdFxuXG4gXHRcdHZhciBpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgeyAvLyAwIG1lYW5zIFwiYWxyZWFkeSBpbnN0YWxsZWRcIi5cblxuIFx0XHRcdC8vIGEgUHJvbWlzZSBtZWFucyBcImN1cnJlbnRseSBsb2FkaW5nXCIuXG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSk7XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdC8vIHNldHVwIFByb21pc2UgaW4gY2h1bmsgY2FjaGVcbiBcdFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IFtyZXNvbHZlLCByZWplY3RdO1xuIFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSA9IHByb21pc2UpO1xuXG4gXHRcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG4gXHRcdFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gXHRcdFx0XHR2YXIgb25TY3JpcHRDb21wbGV0ZTtcblxuIFx0XHRcdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuIFx0XHRcdFx0c2NyaXB0LnRpbWVvdXQgPSAxMjA7XG4gXHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuIFx0XHRcdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzY3JpcHQuc3JjID0ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCk7XG5cbiBcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiBcdFx0XHRcdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuIFx0XHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuIFx0XHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG4gXHRcdFx0XHRcdHZhciBjaHVuayA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0XHRcdFx0aWYoY2h1bmsgIT09IDApIHtcbiBcdFx0XHRcdFx0XHRpZihjaHVuaykge1xuIFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcbiBcdFx0XHRcdFx0XHRcdHZhciByZWFsU3JjID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmM7XG4gXHRcdFx0XHRcdFx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoJ0xvYWRpbmcgY2h1bmsgJyArIGNodW5rSWQgKyAnIGZhaWxlZC5cXG4oJyArIGVycm9yVHlwZSArICc6ICcgKyByZWFsU3JjICsgJyknKTtcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnR5cGUgPSBlcnJvclR5cGU7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcbiBcdFx0XHRcdFx0XHRcdGNodW5rWzFdKGVycm9yKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gdW5kZWZpbmVkO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9O1xuIFx0XHRcdFx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gXHRcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUoeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pO1xuIFx0XHRcdFx0fSwgMTIwMDAwKTtcbiBcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG9uU2NyaXB0Q29tcGxldGU7XG4gXHRcdFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gXHR9O1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIG9uIGVycm9yIGZ1bmN0aW9uIGZvciBhc3luYyBsb2FkaW5nXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm9lID0gZnVuY3Rpb24oZXJyKSB7IGNvbnNvbGUuZXJyb3IoZXJyKTsgdGhyb3cgZXJyOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2pzL292ZW5wbGF5ZXIuc2RrLmpzXCIpO1xuIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0aWYgKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XG5cdFx0bW9kdWxlLnBhdGhzID0gW107XG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XG5cdFx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xuXHR9XG5cdHJldHVybiBtb2R1bGU7XG59O1xuIiwiaW1wb3J0IENhcHRpb25NYW5hZ2VyIGZyb20gXCJhcGkvY2FwdGlvbi9NYW5hZ2VyXCI7XG5pbXBvcnQgQ29uZmlndXJhdG9yIGZyb20gXCJhcGkvQ29uZmlndXJhdG9yXCI7XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJhcGkvRXZlbnRFbWl0dGVyXCI7XG5pbXBvcnQgTGF6eUNvbW1hbmRFeGVjdXRvciBmcm9tIFwiYXBpL0xhenlDb21tYW5kRXhlY3V0b3JcIjtcbmltcG9ydCBNZWRpYU1hbmFnZXIgZnJvbSBcImFwaS9tZWRpYS9NYW5hZ2VyXCI7XG5pbXBvcnQgUGxheWxpc3RNYW5hZ2VyIGZyb20gXCJhcGkvcGxheWxpc3QvTWFuYWdlclwiO1xuaW1wb3J0IFByb3ZpZGVyQ29udHJvbGxlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL0NvbnRyb2xsZXJcIjtcbmltcG9ydCB7UkVBRFksIEVSUk9SUywgRVJST1IsIENPTlRFTlRfVElNRV9NT0RFX0NIQU5HRUQsIElOSVRfVU5LTldPTl9FUlJPUiwgSU5JVF9VTlNVUFBPUlRfRVJST1IsIERFU1RST1ksIE5FVFdPUktfVU5TVEFCTEVELFxuICAgIFBMQVlFUl9GSUxFX0VSUk9SLCBQUk9WSURFUl9EQVNILCBQUk9WSURFUl9ITFMsIFBST1ZJREVSX1dFQlJUQywgUFJPVklERVJfSFRNTDUsIFBST1ZJREVSX1JUTVAsIEFMTF9QTEFZTElTVF9FTkRFRH0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcbmltcG9ydCB7dmVyc2lvbn0gZnJvbSAndmVyc2lvbic7XG5pbXBvcnQge0FwaVJ0bXBFeHBhbnNpb259IGZyb20gJ2FwaS9BcGlFeHBhbnNpb25zJztcbmltcG9ydCB7YW5hbFVzZXJBZ2VudH0gZnJvbSBcInV0aWxzL2Jyb3dzZXJcIjtcbmltcG9ydCBMQSQgZnJvbSAndXRpbHMvbGlrZUEkJztcblxuLyoqXG4gKiBAYnJpZWYgICBUaGlzIG9iamVjdCBjb25uZWN0cyBVSSB0byB0aGUgcHJvdmlkZXIuXG4gKiBAcGFyYW0gICB7b2JqZWN0fSAgICBjb250YWluZXIgIGRvbSBlbGVtZW50XG4gKlxuICogKi9cblxuY29uc3QgQXBpID0gZnVuY3Rpb24oY29udGFpbmVyKXtcbiAgICBjb25zdCB0aGF0ID0ge307XG4gICAgRXZlbnRFbWl0dGVyKHRoYXQpO1xuXG5cbiAgICBjb25zb2xlLmxvZyhcIltbT3ZlblBsYXllcl1dIHYuXCIrIHZlcnNpb24pO1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSBsb2FkZWQuXCIpO1xuXG4gICAgbGV0IHBsYXlsaXN0TWFuYWdlciA9IFBsYXlsaXN0TWFuYWdlcih0aGF0KTtcbiAgICBsZXQgcHJvdmlkZXJDb250cm9sbGVyID0gUHJvdmlkZXJDb250cm9sbGVyKCk7XG4gICAgbGV0IHVzZXJBZ2VudE9iamVjdCA9IGFuYWxVc2VyQWdlbnQoKTtcbiAgICBsZXQgbWVkaWFNYW5hZ2VyID0gTWVkaWFNYW5hZ2VyKGNvbnRhaW5lciwgdXNlckFnZW50T2JqZWN0KTtcbiAgICBsZXQgY3VycmVudFByb3ZpZGVyID0gXCJcIjtcbiAgICBsZXQgcGxheWVyQ29uZmlnID0gXCJcIjtcbiAgICBsZXQgbGF6eVF1ZXVlID0gXCJcIjtcbiAgICBsZXQgY2FwdGlvbk1hbmFnZXIgPSBcIlwiO1xuXG5cbiAgICBjb25zdCBydW5OZXh0UGxheWxpc3QgPSBmdW5jdGlvbihpbmRleCl7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcInJ1bk5leHRQbGF5bGlzdFwiKTtcbiAgICAgICAgbGV0IG5leHRQbGF5bGlzdEluZGV4ID0gaW5kZXg7IC8vIHx8IHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50UGxheWxpc3RJbmRleCgpICsgMTtcbiAgICAgICAgbGV0IHBsYXlsaXN0ID0gcGxheWxpc3RNYW5hZ2VyLmdldFBsYXlsaXN0KCk7XG4gICAgICAgIGxldCBoYXNOZXh0UGxheWxpc3QgPSBwbGF5bGlzdFtuZXh0UGxheWxpc3RJbmRleF0/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgLy9pbml0IHNvdXJjZSBpbmRleFxuICAgICAgICBwbGF5ZXJDb25maWcuc2V0U291cmNlSW5kZXgoMCk7XG4gICAgICAgIGlmKGhhc05leHRQbGF5bGlzdCl7XG4gICAgICAgICAgICAvL3RoYXQucGF1c2UoKTtcbiAgICAgICAgICAgIGxhenlRdWV1ZSA9IExhenlDb21tYW5kRXhlY3V0b3IodGhhdCwgWydwbGF5Jywnc2VlaycsJ3N0b3AnXSk7XG4gICAgICAgICAgICBwbGF5bGlzdE1hbmFnZXIuc2V0Q3VycmVudFBsYXlsaXN0KG5leHRQbGF5bGlzdEluZGV4KTtcbiAgICAgICAgICAgIGluaXRQcm92aWRlcigpO1xuXG5cbiAgICAgICAgICAgIGlmKCFwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSl7XG4gICAgICAgICAgICAgICAgLy9Bbnl3YXkgbmV4dHBsYXlsaXN0IHJ1bnMgYXV0b1N0YXJ0IS5cbiAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAvL0FsbCBQbGF5bGlzdCBFbmRlZC5cbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihBTExfUExBWUxJU1RfRU5ERUQsIG51bGwpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBpbml0UHJvdmlkZXIgPSBmdW5jdGlvbihsYXN0UGxheVBvc2l0aW9uKXtcbiAgICAgICAgY29uc3QgcGlja1F1YWxpdHlGcm9tU291cmNlID0gKHNvdXJjZXMpID0+e1xuICAgICAgICAgICAgdmFyIHF1YWxpdHkgPSAwO1xuICAgICAgICAgICAgaWYgKHNvdXJjZXMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZXNbaV0uZGVmYXVsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVhbGl0eSA9IGk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRTb3VyY2VJbmRleCgpID09PSBpICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLyppZiAocGxheWVyQ29uZmlnLmdldFNvdXJjZUxhYmVsKCkgJiYgc291cmNlc1tpXS5sYWJlbCA9PT0gcGxheWVyQ29uZmlnLmdldFNvdXJjZUxhYmVsKCkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgICAgICAgICAgfSovXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHF1YWxpdHk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHByb3ZpZGVyQ29udHJvbGxlci5sb2FkUHJvdmlkZXJzKHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50UGxheUxpc3QoKSkudGhlbihQcm92aWRlcnMgPT4ge1xuICAgICAgICAgICAgaWYoUHJvdmlkZXJzLmxlbmd0aCA8IDEpe1xuICAgICAgICAgICAgICAgIHRocm93IEVSUk9SU1tJTklUX1VOU1VQUE9SVF9FUlJPUl07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGN1cnJlbnRQcm92aWRlcil7XG4gICAgICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoY2FwdGlvbk1hbmFnZXIpe1xuICAgICAgICAgICAgICAgIGNhcHRpb25NYW5hZ2VyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICBjYXB0aW9uTWFuYWdlciA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXB0aW9uTWFuYWdlciA9IENhcHRpb25NYW5hZ2VyKHRoYXQsIHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50UGxheWxpc3RJbmRleCgpKTtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGluaXQoKSBjYXB0aW9uc1wiKTtcblxuICAgICAgICAgICAgbGV0IGN1cnJlbnRTb3VyY2VJbmRleCA9IHBpY2tRdWFsaXR5RnJvbVNvdXJjZShwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKSk7XG4gICAgICAgICAgICBsZXQgcHJvdmlkZXJOYW1lID0gUHJvdmlkZXJzW2N1cnJlbnRTb3VyY2VJbmRleF1bXCJuYW1lXCJdO1xuXG4gICAgICAgICAgICAvL0luaXQgUHJvdmlkZXIuXG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIgPSAgUHJvdmlkZXJzW2N1cnJlbnRTb3VyY2VJbmRleF0ucHJvdmlkZXIoXG4gICAgICAgICAgICAgICAgbWVkaWFNYW5hZ2VyLmNyZWF0ZU1lZGlhKHByb3ZpZGVyTmFtZSwgcGxheWVyQ29uZmlnKSxcbiAgICAgICAgICAgICAgICBwbGF5ZXJDb25maWcsXG4gICAgICAgICAgICAgICAgcGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRBZFRhZygpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaW5pdCgpIHByb3ZpZGVyXCIsIHByb3ZpZGVyTmFtZSk7XG5cblxuICAgICAgICAgICAgaWYocHJvdmlkZXJOYW1lID09PSBQUk9WSURFUl9SVE1QKXtcbiAgICAgICAgICAgICAgICAvL0lmIHByb3ZpZGVyIHR5cGUgaXMgUlRNUCwgd2UgYWNjZXB0cyBSdG1wRXhwYW5zaW9uLlxuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhhdCwgQXBpUnRtcEV4cGFuc2lvbihjdXJyZW50UHJvdmlkZXIpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9UaGlzIHBhc3NlcyB0aGUgZXZlbnQgY3JlYXRlZCBieSB0aGUgUHJvdmlkZXIgdG8gQVBJLlxuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLm9uKFwiYWxsXCIsIGZ1bmN0aW9uKG5hbWUsIGRhdGEpe1xuXG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKG5hbWUsIGRhdGEpO1xuXG4gICAgICAgICAgICAgICAgaWYobmFtZSA9PT0gXCJjb21wbGV0ZVwiKXtcbiAgICAgICAgICAgICAgICAgICAgcnVuTmV4dFBsYXlsaXN0KHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50UGxheWxpc3RJbmRleCgpICsgMSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9BdXRvIHN3aXRjaGluZyBuZXh0IHNvdXJjZSB3aGVuIHBsYXllciBsb2FkIGZhaWxlZCBieSBhbWlzcyBzb3VyY2UuXG4gICAgICAgICAgICAgICAgLy9kYXRhLmNvZGUgPT09IFBMQVlFUl9GSUxFX0VSUk9SXG4gICAgICAgICAgICAgICAgaWYoIG5hbWUgPT09IEVSUk9SIHx8IG5hbWUgPT09IE5FVFdPUktfVU5TVEFCTEVEICl7XG4gICAgICAgICAgICAgICAgICAgIC8vbGV0IGN1cnJlbnRTb3VyY2VJbmRleCA9IHRoYXQuZ2V0Q3VycmVudFNvdXJjZSgpO1xuICAgICAgICAgICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuZ2V0U291cmNlSW5kZXgoKSsxIDwgdGhhdC5nZXRTb3VyY2VzKCkubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcyBzZXF1ZW50aWFsIGhhcyBhdmFpbGFibGUgc291cmNlLlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wYXVzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRDdXJyZW50U291cmNlKHBsYXllckNvbmZpZy5nZXRTb3VyY2VJbmRleCgpKzEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSkudGhlbigoKT0+e1xuXG4gICAgICAgICAgICAvL3Byb3ZpZGVyJ3MgcHJlbG9hZCgpIGhhdmUgdG8gbWFkZSBQcm9taXNlLiBDdXogaXQgb3ZlcmNvbWVzICdmbGFzaCBsb2FkaW5nIHRpbWluZyBwcm9ibGVtJy5cbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5wcmVsb2FkKHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50U291cmNlcygpLCBsYXN0UGxheVBvc2l0aW9uKS50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFJFQURZKTtcblxuICAgICAgICAgICAgICAgIGxhenlRdWV1ZS5mbHVzaCgpO1xuICAgICAgICAgICAgICAgIC8vVGhpcyBpcyBubyByZWFzb24gdG8gZXhpc3QgYW55bW9yZS5cbiAgICAgICAgICAgICAgICBsYXp5UXVldWUuZGVzdHJveSgpO1xuXG4gICAgICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBsYXp5UXVldWUub2ZmKCk7XG4gICAgICAgICAgICAgICAgaWYoZXJyb3IgJiYgZXJyb3IuY29kZSAmJiBFUlJPUlNbZXJyb3IuY29kZV0pe1xuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoRVJST1IsIEVSUk9SU1tlcnJvci5jb2RlXSk7XG4gICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTW0lOSVRfVU5LTldPTl9FUlJPUl07XG4gICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoRVJST1IsIHRlbXBFcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgLy9JTklUIEVSUk9SXG4gICAgICAgICAgICBpZihlcnJvciAmJiBlcnJvci5jb2RlICYmIEVSUk9SU1tlcnJvci5jb2RlXSl7XG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKEVSUk9SLCBFUlJPUlNbZXJyb3IuY29kZV0pO1xuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlNbSU5JVF9VTktOV09OX0VSUk9SXTtcbiAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoRVJST1IsIHRlbXBFcnJvcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8veHh4IDogSWYgeW91IGluaXQgZW1wdHkgc291cmNlcy4gKEkgdGhpbmsgdGhpcyBpcyBzdHJhbmdlIGNhc2UuKVxuICAgICAgICAgICAgLy9UaGlzIHdvcmtzIGZvciB0aGlzIGNhc2UuXG4gICAgICAgICAgICAvL3BsYXllciA9IE92ZW5QbGF5ZXIuY3JlYXRlKFwiZWxJZFwiLCB7fSk7XG4gICAgICAgICAgICAvL3BsYXllci5sb2FkKHNvcnVjZXMpO1xuICAgICAgICAgICAgbGF6eVF1ZXVlLm9mZigpO1xuICAgICAgICAgICAgLy9sYXp5UXVldWUucmVtb3ZlQW5kRXhjdXRlT25jZShcImxvYWRcIik7XG4gICAgICAgIH0pO1xuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIEFQSSDstIjquLDtmZQg7ZWo7IiYXG4gICAgICogaW5pdFxuICAgICAqIEBwYXJhbSAgICAgIHtvYmplY3R9IG9wdGlvbnMgcGxheWVyIGluaXRpYWwgb3B0aW9uIHZhbHVlLlxuICAgICAqIEByZXR1cm5zXG4gICAgICoqL1xuICAgIHRoYXQuaW5pdCA9IChvcHRpb25zKSA9PntcbiAgICAgICAgLy9JdCBjb2xsZWN0cyB0aGUgY29tbWFuZHMgYW5kIGV4ZWN1dGVzIHRoZW0gYXQgdGhlIHRpbWUgd2hlbiB0aGV5IGFyZSBleGVjdXRhYmxlLlxuICAgICAgICBsYXp5UXVldWUgPSBMYXp5Q29tbWFuZEV4ZWN1dG9yKHRoYXQsIFtcbiAgICAgICAgICAgICdsb2FkJywncGxheScsJ3BhdXNlJywnc2VlaycsJ3N0b3AnLCAnZ2V0RHVyYXRpb24nLCAnZ2V0UG9zaXRpb24nLCAnZ2V0Vm9sdW1lJ1xuICAgICAgICAgICAgLCAnZ2V0TXV0ZScsICdnZXRCdWZmZXInLCAnZ2V0U3RhdGUnICwgJ2dldFF1YWxpdHlMZXZlbHMnXG4gICAgICAgIF0pO1xuICAgICAgICBvcHRpb25zLm1lZGlhQ29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICBvcHRpb25zLmJyb3dzZXIgPSB1c2VyQWdlbnRPYmplY3Q7XG4gICAgICAgIHBsYXllckNvbmZpZyA9IENvbmZpZ3VyYXRvcihvcHRpb25zLCB0aGF0KTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaW5pdCgpXCIpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpbml0KCkgY29uZmlnIDogXCIsIHBsYXllckNvbmZpZyk7XG5cbiAgICAgICAgcGxheWxpc3RNYW5hZ2VyLmluaXRQbGF5bGlzdChwbGF5ZXJDb25maWcuZ2V0UGxheWxpc3QoKSk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGluaXQoKSBzb3VyY2VzIDogXCIgLCBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKSk7XG5cbiAgICAgICAgaW5pdFByb3ZpZGVyKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldFByb3ZpZGVyTmFtZSA9ICgpID0+IHtcbiAgICAgICAgaWYoY3VycmVudFByb3ZpZGVyKXtcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0TmFtZSgpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgdGhhdC5nZXRDb25maWcgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldENvbmZpZygpXCIsIHBsYXllckNvbmZpZy5nZXRDb25maWcoKSk7XG4gICAgICAgIHJldHVybiBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldEJyb3dzZXIgPSAoKSA9PiB7XG5cbiAgICAgICAgcmV0dXJuIHBsYXllckNvbmZpZy5nZXRCcm93c2VyKCk7XG4gICAgfTtcbiAgICB0aGF0LnNldFRpbWVjb2RlTW9kZSA9IChpc1Nob3cpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRUaW1lY29kZU1vZGUoKVwiLCBpc1Nob3cpO1xuICAgICAgICBwbGF5ZXJDb25maWcuc2V0VGltZWNvZGVNb2RlKGlzU2hvdyk7XG4gICAgfTtcbiAgICB0aGF0LmlzVGltZWNvZGVNb2RlID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpc1RpbWVjb2RlTW9kZSgpXCIpO1xuICAgICAgICByZXR1cm4gcGxheWVyQ29uZmlnLmlzVGltZWNvZGVNb2RlKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldEZyYW1lcmF0ZSA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0RnJhbWVyYXRlKClcIik7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0RnJhbWVyYXRlKCk7XG4gICAgfTtcbiAgICB0aGF0LnNlZWtGcmFtZSA9IChmcmFtZUNvdW50KSA9PiB7XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2Vla0ZyYW1lKClcIiwgZnJhbWVDb3VudCk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2Vla0ZyYW1lKGZyYW1lQ291bnQpO1xuICAgIH07XG5cbiAgICB0aGF0LmdldER1cmF0aW9uID0gKCkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldER1cmF0aW9uKClcIiwgY3VycmVudFByb3ZpZGVyLmdldER1cmF0aW9uKCkpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldER1cmF0aW9uKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldFBvc2l0aW9uID0gKCkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0UG9zaXRpb24oKVwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0UG9zaXRpb24oKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0UG9zaXRpb24oKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Vm9sdW1lID0gKCkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Vm9sdW1lKClcIiwgY3VycmVudFByb3ZpZGVyLmdldFZvbHVtZSgpKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRWb2x1bWUoKTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Vm9sdW1lID0gKHZvbHVtZSkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Vm9sdW1lKCkgXCIgKyB2b2x1bWUpO1xuICAgICAgICBjdXJyZW50UHJvdmlkZXIuc2V0Vm9sdW1lKHZvbHVtZSk7XG4gICAgfTtcbiAgICB0aGF0LnNldE11dGUgPSAoc3RhdGUpID0+IHtcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldE11dGUoKSBcIiArIHN0YXRlKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5zZXRNdXRlKHN0YXRlKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0TXV0ZSA9ICgpID0+IHtcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldE11dGUoKSBcIiArIGN1cnJlbnRQcm92aWRlci5nZXRNdXRlKCkpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldE11dGUoKTtcbiAgICB9O1xuICAgIHRoYXQubG9hZCA9IChwbGF5bGlzdCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBsb2FkKCkgXCIsIHBsYXlsaXN0KTtcbiAgICAgICAgbGF6eVF1ZXVlID0gTGF6eUNvbW1hbmRFeGVjdXRvcih0aGF0LCBbJ3BsYXknLCdzZWVrJywnc3RvcCddKTtcblxuICAgICAgICBpZihwbGF5bGlzdCl7XG4gICAgICAgICAgICBpZihjdXJyZW50UHJvdmlkZXIpe1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5zZXRDdXJyZW50UXVhbGl0eSgwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBsYXlsaXN0TWFuYWdlci5pbml0UGxheWxpc3QocGxheWxpc3QpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbml0UHJvdmlkZXIoKTtcblxuICAgIH07XG4gICAgdGhhdC5wbGF5ID0gKCkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHBsYXkoKSBcIik7XG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5wbGF5KCk7XG4gICAgfVxuICAgIHRoYXQucGF1c2UgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBwYXVzZSgpIFwiKTtcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnBhdXNlKCk7XG4gICAgfTtcbiAgICB0aGF0LnNlZWsgPSAocG9zaXRpb24pID0+IHtcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNlZWsoKSBcIisgcG9zaXRpb24pO1xuICAgICAgICBjdXJyZW50UHJvdmlkZXIuc2Vlayhwb3NpdGlvbik7XG4gICAgfTtcbiAgICB0aGF0LnNldFBsYXliYWNrUmF0ZSA9IChwbGF5YmFja1JhdGUpID0+e1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0UGxheWJhY2tSYXRlKCkgXCIsIHBsYXliYWNrUmF0ZSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2V0UGxheWJhY2tSYXRlKHBsYXllckNvbmZpZy5zZXRQbGF5YmFja1JhdGUocGxheWJhY2tSYXRlKSk7XG4gICAgfTtcbiAgICB0aGF0LmdldFBsYXliYWNrUmF0ZSA9ICgpID0+e1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0UGxheWJhY2tSYXRlKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRQbGF5YmFja1JhdGUoKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0UGxheWJhY2tSYXRlKCk7XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0UGxheWxpc3QgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFBsYXlsaXN0KCkgXCIsIHBsYXlsaXN0TWFuYWdlci5nZXRQbGF5bGlzdCgpKTtcbiAgICAgICAgcmV0dXJuIHBsYXlsaXN0TWFuYWdlci5nZXRQbGF5bGlzdCgpO1xuICAgIH07XG4gICAgdGhhdC5nZXRDdXJyZW50UGxheWxpc3QgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEN1cnJlbnRQbGF5bGlzdCgpIFwiLCBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFBsYXlsaXN0SW5kZXgoKSk7XG4gICAgICAgIHJldHVybiBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFBsYXlsaXN0SW5kZXgoKTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Q3VycmVudFBsYXlsaXN0ID0gKGluZGV4KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEN1cnJlbnRQbGF5bGlzdCgpIFwiLCBpbmRleCk7XG4gICAgICAgIHJ1bk5leHRQbGF5bGlzdChpbmRleCk7XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0U291cmNlcyA9ICgpID0+IHtcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFNvdXJjZXMoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldFNvdXJjZXMoKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0U291cmNlcygpO1xuICAgIH07XG4gICAgdGhhdC5nZXRDdXJyZW50U291cmNlID0gKCkgPT57XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRDdXJyZW50U291cmNlKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRDdXJyZW50U291cmNlKCkpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldEN1cnJlbnRTb3VyY2UoKTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Q3VycmVudFNvdXJjZSA9IChpbmRleCkgPT57XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRDdXJyZW50U291cmNlKCkgXCIsIGluZGV4KTtcblxuICAgICAgICBsZXQgc291cmNlcyA9IGN1cnJlbnRQcm92aWRlci5nZXRTb3VyY2VzKCk7XG4gICAgICAgIGxldCBjdXJyZW50U291cmNlID0gc291cmNlc1tjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFNvdXJjZSgpXTtcbiAgICAgICAgbGV0IG5ld1NvdXJjZSA9IHNvdXJjZXNbaW5kZXhdO1xuICAgICAgICBsZXQgbGFzdFBsYXlQb3NpdGlvbiA9IGN1cnJlbnRQcm92aWRlci5nZXRQb3NpdGlvbigpO1xuICAgICAgICBsZXQgaXNTYW1lUHJvdmlkZXIgPSBwcm92aWRlckNvbnRyb2xsZXIuaXNTYW1lUHJvdmlkZXIoY3VycmVudFNvdXJjZSwgbmV3U291cmNlKTtcbiAgICAgICAgLy8gcHJvdmlkZXIuc2VyQ3VycmVudFF1YWxpdHkgLT4gcGxheWVyQ29uZmlnIHNldHRpbmcgLT4gbG9hZFxuICAgICAgICBsZXQgcmVzdWx0U291cmNlSW5kZXggPSBjdXJyZW50UHJvdmlkZXIuc2V0Q3VycmVudFNvdXJjZShpbmRleCwgaXNTYW1lUHJvdmlkZXIpO1xuXG4gICAgICAgIGlmKCFuZXdTb3VyY2Upe1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRDdXJyZW50UXVhbGl0eSgpIGlzU2FtZVByb3ZpZGVyXCIsIGlzU2FtZVByb3ZpZGVyKTtcblxuICAgICAgICBpZighaXNTYW1lUHJvdmlkZXIpe1xuICAgICAgICAgICAgbGF6eVF1ZXVlID0gTGF6eUNvbW1hbmRFeGVjdXRvcih0aGF0LCBbJ3BsYXknLCdzZWVrJ10pO1xuICAgICAgICAgICAgaW5pdFByb3ZpZGVyKGxhc3RQbGF5UG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdFNvdXJjZUluZGV4O1xuICAgIH07XG5cblxuXG4gICAgdGhhdC5nZXRRdWFsaXR5TGV2ZWxzID0gKCkgPT57XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRRdWFsaXR5TGV2ZWxzKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRRdWFsaXR5TGV2ZWxzKCkpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFF1YWxpdHlMZXZlbHMoKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Q3VycmVudFF1YWxpdHkgPSAoKSA9PntcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEN1cnJlbnRRdWFsaXR5KCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRDdXJyZW50UXVhbGl0eSgpKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRDdXJyZW50UXVhbGl0eSgpO1xuICAgIH07XG4gICAgdGhhdC5zZXRDdXJyZW50UXVhbGl0eSA9IChxdWFsaXR5SW5kZXgpID0+e1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Q3VycmVudFF1YWxpdHkoKSBcIiwgcXVhbGl0eUluZGV4KTtcblxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLnNldEN1cnJlbnRRdWFsaXR5KHF1YWxpdHlJbmRleCk7XG4gICAgfTtcbiAgICB0aGF0LmlzQXV0b1F1YWxpdHkgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpc0F1dG9RdWFsaXR5KClcIik7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuaXNBdXRvUXVhbGl0eSgpO1xuICAgIH07XG4gICAgdGhhdC5zZXRBdXRvUXVhbGl0eSA9IChpc0F1dG8pID0+IHtcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEF1dG9RdWFsaXR5KCkgXCIsIGlzQXV0byk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2V0QXV0b1F1YWxpdHkoaXNBdXRvKTtcbiAgICB9XG5cbiAgICB0aGF0LmdldENhcHRpb25MaXN0ID0gKCkgPT4ge1xuICAgICAgICBpZighY2FwdGlvbk1hbmFnZXIpe3JldHVybiBudWxsO31cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Q2FwdGlvbkxpc3QoKSBcIiwgY2FwdGlvbk1hbmFnZXIuZ2V0Q2FwdGlvbkxpc3QoKSk7XG4gICAgICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5nZXRDYXB0aW9uTGlzdCgpO1xuICAgIH1cbiAgICB0aGF0LmdldEN1cnJlbnRDYXB0aW9uID0gKCkgPT4ge1xuICAgICAgICBpZighY2FwdGlvbk1hbmFnZXIpe3JldHVybiBudWxsO31cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Q3VycmVudENhcHRpb24oKSBcIiwgY2FwdGlvbk1hbmFnZXIuZ2V0Q3VycmVudENhcHRpb24oKSk7XG4gICAgICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5nZXRDdXJyZW50Q2FwdGlvbigpO1xuICAgIH1cbiAgICB0aGF0LnNldEN1cnJlbnRDYXB0aW9uID0gKGluZGV4KSA9PiB7XG4gICAgICAgIGlmKCFjYXB0aW9uTWFuYWdlcil7cmV0dXJuIG51bGw7fVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRDdXJyZW50Q2FwdGlvbigpIFwiLCBpbmRleCk7XG4gICAgICAgIGNhcHRpb25NYW5hZ2VyLnNldEN1cnJlbnRDYXB0aW9uKGluZGV4KTtcbiAgICB9XG4gICAgdGhhdC5hZGRDYXB0aW9uID0gKHRyYWNrKSA9PiB7XG4gICAgICAgIGlmKCFjYXB0aW9uTWFuYWdlcil7cmV0dXJuIG51bGw7fVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBhZGRDYXB0aW9uKCkgXCIpXG4gICAgICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5hZGRDYXB0aW9uKHRyYWNrKTtcbiAgICB9XG4gICAgdGhhdC5yZW1vdmVDYXB0aW9uID0gKGluZGV4KSA9PiB7XG4gICAgICAgIGlmKCFjYXB0aW9uTWFuYWdlcil7cmV0dXJuIG51bGw7fVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiByZW1vdmVDYXB0aW9uKCkgXCIsIGluZGV4KVxuICAgICAgICByZXR1cm4gY2FwdGlvbk1hbmFnZXIucmVtb3ZlQ2FwdGlvbihpbmRleCk7XG4gICAgfVxuXG4gICAgdGhhdC5nZXRCdWZmZXIgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0QnVmZmVyKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRCdWZmZXIoKSk7XG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5nZXRCdWZmZXIoKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0U3RhdGUgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0U3RhdGUoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldFN0YXRlKCkpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFN0YXRlKCk7XG4gICAgfTtcbiAgICB0aGF0LnN0b3AgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzdG9wKCkgXCIpO1xuICAgICAgICBjdXJyZW50UHJvdmlkZXIuc3RvcCgpO1xuICAgIH07XG4gICAgdGhhdC5yZW1vdmUgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiByZW1vdmUoKSBcIik7XG4gICAgICAgIGxhenlRdWV1ZS5kZXN0cm95KCk7XG4gICAgICAgIGlmKGNhcHRpb25NYW5hZ2VyKXtcbiAgICAgICAgICAgIGNhcHRpb25NYW5hZ2VyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIGNhcHRpb25NYW5hZ2VyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGN1cnJlbnRQcm92aWRlcil7XG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG1lZGlhTWFuYWdlcil7XG4gICAgICAgICAgICBtZWRpYU1hbmFnZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgbWVkaWFNYW5hZ2VyID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBwcm92aWRlckNvbnRyb2xsZXIgPSBudWxsO1xuICAgICAgICBwbGF5bGlzdE1hbmFnZXIgPSBudWxsO1xuICAgICAgICBwbGF5ZXJDb25maWcgPSBudWxsO1xuICAgICAgICBsYXp5UXVldWUgPSBudWxsO1xuXG4gICAgICAgIHRoYXQudHJpZ2dlcihERVNUUk9ZKTtcbiAgICAgICAgdGhhdC5vZmYoKTtcblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiByZW1vdmUoKSAtIGxhenlRdWV1ZSwgY3VycmVudFByb3ZpZGVyLCBwcm92aWRlckNvbnRyb2xsZXIsIHBsYXlsaXN0TWFuYWdlciwgcGxheWVyQ29uZmlnLCBhcGkgZXZlbnQgZGVzdHJvZWQuIFwiKTtcbiAgICAgICAgT3ZlblBsYXllclNESy5yZW1vdmVQbGF5ZXIodGhhdC5nZXRDb250YWluZXJJZCgpKTtcbiAgICAgICAgaWYoT3ZlblBsYXllclNESy5nZXRQbGF5ZXJMaXN0KCkubGVuZ3RoICA9PT0gMCl7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJPdmVuUGxheWVyU0RLLnBsYXllckxpc3RcIiwgIE92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyTGlzdCgpKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0LmdldFZlcnNpb24gPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBcInYuXCIrdmVyc2lvbjtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgQXBpO1xuXG5cbiIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDguIDI0Li5cbiAqL1xuXG5leHBvcnQgY29uc3QgQXBpUnRtcEV4cGFuc2lvbiA9IGZ1bmN0aW9uKGN1cnJlbnRQcm92aWRlcil7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZXh0ZXJuYWxDYWxsYmFja0NyZWVwIDogKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgaWYocmVzdWx0Lm5hbWUgJiYgcmVzdWx0LmRhdGEpe1xuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIudHJpZ2dlckV2ZW50RnJvbUV4dGVybmFsKHJlc3VsdC5uYW1lLCByZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59O1xuIiwiaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcblxuaW1wb3J0IHtcbiAgICBDT05URU5UX1RJTUVfTU9ERV9DSEFOR0VEXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5cbi8qKlxuICogQGJyaWVmICAgVGhpcyBpbml0aWFsaXplcyB0aGUgaW5wdXQgb3B0aW9ucy5cbiAqIEBwYXJhbSAgIG9wdGlvbnNcbiAqXG4gKiAqL1xuY29uc3QgQ29uZmlndXJhdG9yID0gZnVuY3Rpb24ob3B0aW9ucywgcHJvdmlkZXIpe1xuICAgIC8vc291cmNlcywgdHJhY2tzLFxuXG5cbiAgICBjb25zdCBjb21wb3NlU291cmNlT3B0aW9ucyA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xuICAgICAgICBjb25zdCBEZWZhdWx0cyA9IHtcbiAgICAgICAgICAgIG1lZGlhQ29udGFpbmVyIDogXCJcIixcbiAgICAgICAgICAgIHBsYXliYWNrUmF0ZXM6IFsyLCAxLjUsIDEsIDAuNSwgMC4yNV0sXG4gICAgICAgICAgICBwbGF5YmFja1JhdGU6IDEsXG4gICAgICAgICAgICBtdXRlOiBmYWxzZSxcbiAgICAgICAgICAgIHZvbHVtZTogMTAwLFxuICAgICAgICAgICAgbG9vcCA6IGZhbHNlLFxuICAgICAgICAgICAgY29udHJvbHMgOiB0cnVlLFxuICAgICAgICAgICAgYXV0b1N0YXJ0IDogZmFsc2UsXG4gICAgICAgICAgICB0aW1lY29kZSA6IHRydWUsXG4gICAgICAgICAgICBzb3VyY2VJbmRleCA6IDAsXG4gICAgICAgICAgICBicm93c2VyIDogXCJcIixcbiAgICAgICAgICAgIGhpZGVQbGF5bGlzdEljb24gOiBmYWxzZSxcbiAgICAgICAgICAgIHJ0bXBCdWZmZXJUaW1lIDogMSxcbiAgICAgICAgICAgIHJ0bXBCdWZmZXJUaW1lTWF4IDogMyxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgc2VyaWFsaXplID0gZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycgJiYgdmFsLmxlbmd0aCA8IDYpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsb3dlcmNhc2VWYWwgPSB2YWwudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICBpZiAobG93ZXJjYXNlVmFsID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChsb3dlcmNhc2VWYWwgPT09ICdmYWxzZScpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKE51bWJlcih2YWwpKSAmJiAhaXNOYU4ocGFyc2VGbG9hdCh2YWwpKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gTnVtYmVyKHZhbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkZXNlcmlhbGl6ZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSAnaWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3B0aW9uc1trZXldID0gc2VyaWFsaXplKG9wdGlvbnNba2V5XSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRlc2VyaWFsaXplKG9wdGlvbnMpO1xuICAgICAgICBsZXQgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgRGVmYXVsdHMsIG9wdGlvbnMpO1xuXG4gICAgICAgIGxldCBwbGF5YmFja1JhdGVzID0gY29uZmlnLnBsYXliYWNrUmF0ZXM7XG5cbiAgICAgICAgcGxheWJhY2tSYXRlcyA9IHBsYXliYWNrUmF0ZXMuZmlsdGVyKHJhdGUgPT4gXy5pc051bWJlcihyYXRlKSAmJiByYXRlID49IDAuMjUgJiYgcmF0ZSA8PSA0KS5tYXAocmF0ZSA9PiBNYXRoLnJvdW5kKHJhdGUgKiA0KSAvIDQpO1xuXG4gICAgICAgIGlmIChwbGF5YmFja1JhdGVzLmluZGV4T2YoMSkgPCAwKSB7XG4gICAgICAgICAgICBwbGF5YmFja1JhdGVzLnB1c2goMSk7XG4gICAgICAgIH1cbiAgICAgICAgcGxheWJhY2tSYXRlcy5zb3J0KCk7XG5cbiAgICAgICAgY29uZmlnLnBsYXliYWNrUmF0ZXMgPSBwbGF5YmFja1JhdGVzO1xuXG4gICAgICAgIGNvbmZpZy5ydG1wQnVmZmVyVGltZSA9IGNvbmZpZy5ydG1wQnVmZmVyVGltZSA+IDEwID8gMTAgOiBjb25maWcucnRtcEJ1ZmZlclRpbWU7XG4gICAgICAgIGNvbmZpZy5ydG1wQnVmZmVyVGltZU1heCA9IGNvbmZpZy5ydG1wQnVmZmVyVGltZU1heCA+IDUwID8gNTAgOiBjb25maWcucnRtcEJ1ZmZlclRpbWVNYXg7XG5cblxuICAgICAgICBpZiAoY29uZmlnLnBsYXliYWNrUmF0ZXMuaW5kZXhPZihjb25maWcucGxheWJhY2tSYXRlKSA8IDApIHtcbiAgICAgICAgICAgIGNvbmZpZy5wbGF5YmFja1JhdGUgPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29uZmlnUGxheWxpc3QgPSBjb25maWcucGxheWxpc3Q7XG4gICAgICAgIGlmICghY29uZmlnUGxheWxpc3QpIHtcbiAgICAgICAgICAgIGNvbnN0IG9iaiA9IF8ucGljayhjb25maWcsIFtcbiAgICAgICAgICAgICAgICAndGl0bGUnLFxuICAgICAgICAgICAgICAgICdkZXNjcmlwdGlvbicsXG4gICAgICAgICAgICAgICAgJ3R5cGUnLFxuICAgICAgICAgICAgICAgICdpbWFnZScsXG4gICAgICAgICAgICAgICAgJ2ZpbGUnLFxuICAgICAgICAgICAgICAgICdzb3VyY2VzJyxcbiAgICAgICAgICAgICAgICAndHJhY2tzJyxcbiAgICAgICAgICAgICAgICAnaG9zdCcsXG4gICAgICAgICAgICAgICAgJ2FwcGxpY2F0aW9uJyxcbiAgICAgICAgICAgICAgICAnc3RyZWFtJyxcbiAgICAgICAgICAgICAgICAnYWRUYWdVcmwnXG4gICAgICAgICAgICBdKTtcblxuICAgICAgICAgICAgY29uZmlnLnBsYXlsaXN0ID0gWyBvYmogXTtcbiAgICAgICAgfSBlbHNlIGlmIChfLmlzQXJyYXkoY29uZmlnUGxheWxpc3QucGxheWxpc3QpKSB7XG4gICAgICAgICAgICBjb25maWcuZmVlZERhdGEgPSBjb25maWdQbGF5bGlzdDtcbiAgICAgICAgICAgIGNvbmZpZy5wbGF5bGlzdCA9IGNvbmZpZ1BsYXlsaXN0LnBsYXlsaXN0O1xuICAgICAgICB9XG5cbiAgICAgICAgZGVsZXRlIGNvbmZpZy5kdXJhdGlvbjtcbiAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICB9O1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNvbmZpZ3VyYXRvciBsb2FkZWQuXCIsIG9wdGlvbnMpO1xuICAgIGxldCBzcGVjID0gY29tcG9zZVNvdXJjZU9wdGlvbnMob3B0aW9ucyk7XG5cblxuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICB0aGF0LmdldENvbmZpZyA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWM7XG4gICAgfTtcbiAgICB0aGF0LnNldENvbmZpZyA9IChjb25maWcsIHZhbHVlKSA9PiB7XG4gICAgICAgIHNwZWNbY29uZmlnXSA9IHZhbHVlO1xuICAgIH07XG5cbiAgICB0aGF0LmdldENvbnRhaW5lciA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMubWVkaWFDb250YWluZXI7XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0UGxheWJhY2tSYXRlID0oKT0+e1xuICAgICAgICByZXR1cm4gc3BlYy5wbGF5YmFja1JhdGU7XG4gICAgfTtcbiAgICB0aGF0LnNldFBsYXliYWNrUmF0ZSA9KHBsYXliYWNrUmF0ZSk9PntcbiAgICAgICAgc3BlYy5wbGF5YmFja1JhdGUgPSBwbGF5YmFja1JhdGU7XG4gICAgICAgIHJldHVybiBwbGF5YmFja1JhdGU7XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0UXVhbGl0eUxhYmVsID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5xdWFsaXR5TGFiZWw7XG4gICAgfTtcbiAgICB0aGF0LnNldFF1YWxpdHlMYWJlbCA9IChuZXdMYWJlbCkgPT4ge1xuICAgICAgICBzcGVjLnF1YWxpdHlMYWJlbCA9IG5ld0xhYmVsO1xuICAgIH07XG5cbiAgICAvKnRoYXQuZ2V0U291cmNlTGFiZWwgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLnNvdXJjZUxhYmVsO1xuICAgIH07XG4gICAgdGhhdC5zZXRTb3VyY2VMYWJlbCA9IChuZXdMYWJlbCkgPT4ge1xuICAgICAgICBzcGVjLnNvdXJjZUxhYmVsID0gbmV3TGFiZWw7XG4gICAgfTsqL1xuXG4gICAgdGhhdC5nZXRTb3VyY2VJbmRleCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuc291cmNlSW5kZXg7XG4gICAgfTtcbiAgICB0aGF0LnNldFNvdXJjZUluZGV4ID0gKGluZGV4KSA9PiB7XG4gICAgICAgIHNwZWMuc291cmNlSW5kZXggPSBpbmRleDtcbiAgICB9O1xuICAgIHRoYXQuc2V0VGltZWNvZGVNb2RlID0gKHRpbWVjb2RlKSA9PiB7XG4gICAgICAgIGlmKHNwZWMudGltZWNvZGUgIT09IHRpbWVjb2RlKXtcbiAgICAgICAgICAgIHNwZWMudGltZWNvZGUgPSB0aW1lY29kZTtcbiAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9USU1FX01PREVfQ0hBTkdFRCwgdGltZWNvZGUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LmlzVGltZWNvZGVNb2RlID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy50aW1lY29kZTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0UnRtcEJ1ZmZlclRpbWUgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLnJ0bXBCdWZmZXJUaW1lO1xuICAgIH07XG4gICAgdGhhdC5nZXRSdG1wQnVmZmVyVGltZU1heCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMucnRtcEJ1ZmZlclRpbWVNYXg7XG4gICAgfTtcblxuICAgIHRoYXQuaXNNdXRlID0gKCkgPT57XG4gICAgICAgIHJldHVybiBzcGVjLm11dGU7XG4gICAgfTtcbiAgICB0aGF0LmdldFZvbHVtZSA9ICgpID0+e1xuICAgICAgICByZXR1cm4gc3BlYy52b2x1bWU7XG4gICAgfTtcbiAgICB0aGF0LmlzTG9vcCA9ICgpID0+e1xuICAgICAgICByZXR1cm4gc3BlYy5sb29wO1xuICAgIH07XG4gICAgdGhhdC5pc0F1dG9TdGFydCA9ICgpID0+e1xuICAgICAgICByZXR1cm4gc3BlYy5hdXRvU3RhcnQ7XG4gICAgfTtcbiAgICB0aGF0LmlzQ29udHJvbHMgPSAoKSA9PntcbiAgICAgICAgcmV0dXJuIHNwZWMuY29udHJvbHM7XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0UGxheWJhY2tSYXRlcyA9KCk9PntcbiAgICAgICAgcmV0dXJuIHNwZWMucGxheWJhY2tSYXRlcztcbiAgICB9O1xuICAgIHRoYXQuZ2V0QnJvd3NlciA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuYnJvd3NlcjtcbiAgICB9O1xuXG4gICAgdGhhdC5nZXRQbGF5bGlzdCA9KCk9PntcbiAgICAgICAgcmV0dXJuIHNwZWMucGxheWxpc3Q7XG4gICAgfTtcbiAgICB0aGF0LnNldFBsYXlsaXN0ID0ocGxheWxpc3QpPT57XG4gICAgICAgIGlmKF8uaXNBcnJheShwbGF5bGlzdCkpe1xuICAgICAgICAgICAgc3BlYy5wbGF5bGlzdCA9IHBsYXlsaXN0O1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHNwZWMucGxheWxpc3QgPSBbcGxheWxpc3RdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcGVjLnBsYXlsaXN0O1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbmZpZ3VyYXRvcjtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDMuLlxuICovXG5cbi8qKlxuICogQGJyaWVmICAgVGhpcyBtb2R1bGUgcHJvdmlkZSBjdXN0b20gZXZlbnRzLlxuICogQHBhcmFtICAgb2JqZWN0ICAgIEFuIG9iamVjdCB0aGF0IHJlcXVpcmVzIGN1c3RvbSBldmVudHMuXG4gKlxuICogKi9cblxuY29uc3QgRXZlbnRFbWl0dGVyID0gZnVuY3Rpb24ob2JqZWN0KXtcbiAgICBsZXQgdGhhdCA9IG9iamVjdDtcbiAgICBsZXQgX2V2ZW50cyA9W107XG5cbiAgICBjb25zdCB0cmlnZ2VyRXZlbnRzID0gZnVuY3Rpb24oZXZlbnRzLCBhcmdzLCBjb250ZXh0KXtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBsZXQgbGVuZ3RoID0gZXZlbnRzLmxlbmd0aDtcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgbGVuZ3RoOyBpICsrKXtcbiAgICAgICAgICAgIGxldCBldmVudCA9IGV2ZW50c1tpXTtcbiAgICAgICAgICAgIGV2ZW50Lmxpc3RlbmVyLmFwcGx5KCAoIGV2ZW50LmNvbnRleHQgfHwgY29udGV4dCApLCBhcmdzKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0Lm9uID0gZnVuY3Rpb24obmFtZSwgbGlzdGVuZXIsIGNvbnRleHQpe1xuICAgICAgICAoX2V2ZW50c1tuYW1lXSB8fCAoX2V2ZW50c1tuYW1lXT1bXSkgKS5wdXNoKHsgbGlzdGVuZXI6IGxpc3RlbmVyICAsIGNvbnRleHQgOiBjb250ZXh0fSk7XG4gICAgICAgIHJldHVybiB0aGF0O1xuICAgIH07XG4gICAgdGhhdC50cmlnZ2VyID0gZnVuY3Rpb24obmFtZSl7XG4gICAgICAgIGlmKCFfZXZlbnRzKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICBjb25zdCBldmVudHMgPSBfZXZlbnRzW25hbWVdO1xuICAgICAgICBjb25zdCBhbGxFdmVudHMgPSBfZXZlbnRzLmFsbDtcblxuICAgICAgICBpZihldmVudHMpe1xuICAgICAgICAgICAgdHJpZ2dlckV2ZW50cyhldmVudHMsIGFyZ3MsIHRoYXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmKGFsbEV2ZW50cyl7XG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnRzKGFsbEV2ZW50cywgYXJndW1lbnRzLCB0aGF0KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhhdC5vZmYgPSBmdW5jdGlvbihuYW1lLCBsaXN0ZW5lciwgY29udGV4dCl7XG4gICAgICAgIGlmKCFfZXZlbnRzKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghbmFtZSAmJiAhbGlzdGVuZXIgJiYgIWNvbnRleHQpICB7XG4gICAgICAgICAgICBfZXZlbnRzID0gW107XG4gICAgICAgICAgICByZXR1cm4gdGhhdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5hbWVzID0gbmFtZSA/IFtuYW1lXSA6IE9iamVjdC5rZXlzKF9ldmVudHMpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gbmFtZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBuYW1lID0gbmFtZXNbaV07XG4gICAgICAgICAgICBjb25zdCBldmVudHMgPSBfZXZlbnRzW25hbWVdO1xuICAgICAgICAgICAgaWYgKGV2ZW50cykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJldGFpbiA9IF9ldmVudHNbbmFtZV0gPSBbXTtcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIgIHx8IGNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDAsIGsgPSBldmVudHMubGVuZ3RoOyBqIDwgazsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBldmVudCA9IGV2ZW50c1tqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgobGlzdGVuZXIgJiYgbGlzdGVuZXIgIT09IGV2ZW50Lmxpc3RlbmVyICYmIGxpc3RlbmVyICE9PSBldmVudC5saXN0ZW5lci5saXN0ZW5lciAgJiYgbGlzdGVuZXIgIT09IGV2ZW50Lmxpc3RlbmVyLl9saXN0ZW5lcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fChjb250ZXh0ICYmIGNvbnRleHQgIT09IGV2ZW50LmNvbnRleHQpXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXRhaW4ucHVzaChldmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFyZXRhaW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBfZXZlbnRzW25hbWVdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhhdDtcbiAgICB9O1xuICAgIHRoYXQub25jZSA9IGZ1bmN0aW9uKG5hbWUsIGxpc3RlbmVyLCBjb250ZXh0KXtcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgY29uc3Qgb25jZUNhbGxiYWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoY291bnQrKykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoYXQub2ZmKG5hbWUsIG9uY2VDYWxsYmFjayk7XG4gICAgICAgICAgICBsaXN0ZW5lci5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgICAgICBvbmNlQ2FsbGJhY2suX2xpc3RlbmVyID0gbGlzdGVuZXI7XG4gICAgICAgIHJldHVybiB0aGF0Lm9uKG5hbWUsIG9uY2VDYWxsYmFjaywgY29udGV4dCk7XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBFdmVudEVtaXR0ZXI7XG4iLCJpbXBvcnQgXyBmcm9tICd1dGlscy91bmRlcnNjb3JlJztcblxuLyoqXG4gKiBAYnJpZWYgICBUaGlzIGV4ZWN1dGVzIHRoZSBpbnB1dCBjb21tYW5kcyBhdCBhIHNwZWNpZmljIHBvaW50IGluIHRpbWUuXG4gKiBAcGFyYW0gICBpbnN0YW5jZVxuICogQHBhcmFtICAgcXVldWVkQ29tbWFuZHNcbiAqICovXG5jb25zdCBMYXp5Q29tbWFuZEV4ZWN1dG9yID0gZnVuY3Rpb24gKGluc3RhbmNlLCBxdWV1ZWRDb21tYW5kcykge1xuICAgIGxldCBjb21tYW5kUXVldWUgPSBbXTtcbiAgICBsZXQgdW5kZWNvcmF0ZWRNZXRob2RzID0ge307XG4gICAgbGV0IGV4ZWN1dGVNb2RlID0gZmFsc2U7XG4gICAgbGV0IHRoYXQgPSB7fTtcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIGxvYWRlZC5cIik7XG4gICAgcXVldWVkQ29tbWFuZHMuZm9yRWFjaCgoY29tbWFuZCkgPT4ge1xuICAgICAgICBjb25zdCBtZXRob2QgPSBpbnN0YW5jZVtjb21tYW5kXTtcbiAgICAgICAgdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdID0gbWV0aG9kIHx8IGZ1bmN0aW9uKCl7fTtcblxuICAgICAgICBpbnN0YW5jZVtjb21tYW5kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc3QgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gICAgICAgICAgICAgIGlmICghZXhlY3V0ZU1vZGUpIHtcbiAgICAgICAgICAgICAgICAvL2NvbW1hbmRRdWV1ZS5wdXNoKHsgY29tbWFuZCwgYXJncyB9KTtcbiAgICAgICAgICAgICAgICB0aGF0LmFkZFF1ZXVlKGNvbW1hbmQsIGFyZ3MpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGV4ZWN1dGVRdWV1ZWRDb21tYW5kcygpO1xuICAgICAgICAgICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kLmFwcGx5KHRoYXQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KTtcbiAgICB2YXIgZXhlY3V0ZVF1ZXVlZENvbW1hbmRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB3aGlsZSAoY29tbWFuZFF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHsgY29tbWFuZCwgYXJncyB9ID0gY29tbWFuZFF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICAodW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdIHx8IGluc3RhbmNlW2NvbW1hbmRdKS5hcHBseShpbnN0YW5jZSwgYXJncyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGF0LnNldEV4ZWN1dGVNb2RlID0gKG1vZGUpID0+IHtcbiAgICAgICAgZXhlY3V0ZU1vZGUgPSBtb2RlO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogc2V0RXhlY3V0ZU1vZGUoKVwiLCBtb2RlKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0VW5kZWNvcmF0ZWRNZXRob2RzID0gZnVuY3Rpb24oKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGdldFVuZGVjb3JhdGVkTWV0aG9kcygpXCIsIHVuZGVjb3JhdGVkTWV0aG9kcyk7XG4gICAgICAgIHJldHVybiB1bmRlY29yYXRlZE1ldGhvZHM7XG4gICAgfVxuICAgIHRoYXQuZ2V0UXVldWUgPSBmdW5jdGlvbigpe1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZ2V0UXVldWUoKVwiLCBnZXRRdWV1ZSk7XG4gICAgICAgIHJldHVybiBjb21tYW5kUXVldWU7XG4gICAgfVxuICAgIHRoYXQuYWRkUXVldWUgPSBmdW5jdGlvbihjb21tYW5kLCBhcmdzKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGFkZFF1ZXVlKClcIiwgY29tbWFuZCwgYXJncyk7XG4gICAgICAgIGNvbW1hbmRRdWV1ZS5wdXNoKHsgY29tbWFuZCwgYXJncyB9KTtcbiAgICB9XG5cbiAgICB0aGF0LmZsdXNoID0gZnVuY3Rpb24oKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGZsdXNoKClcIik7XG4gICAgICAgIGV4ZWN1dGVRdWV1ZWRDb21tYW5kcygpO1xuICAgIH07XG4gICAgdGhhdC5lbXB0eSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZW1wdHkoKVwiKTtcbiAgICAgICAgY29tbWFuZFF1ZXVlLmxlbmd0aCA9IDA7XG4gICAgfTtcbiAgICB0aGF0Lm9mZiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogb2ZmKClcIik7XG4gICAgICAgIHF1ZXVlZENvbW1hbmRzLmZvckVhY2goKGNvbW1hbmQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1ldGhvZCA9IHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXTtcbiAgICAgICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVtjb21tYW5kXSA9IG1ldGhvZDtcbiAgICAgICAgICAgICAgICBkZWxldGUgdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG5cbiAgICAvL1J1biBvbmNlIGF0IHRoZSBlbmRcbiAgICB0aGF0LnJlbW92ZUFuZEV4Y3V0ZU9uY2UgPSBmdW5jdGlvbihjb21tYW5kXyl7XG4gICAgICAgIGxldCBjb21tYW5kUXVldWVJdGVtID0gXy5maW5kV2hlcmUoY29tbWFuZFF1ZXVlLCB7Y29tbWFuZCA6IGNvbW1hbmRffSk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiByZW1vdmVBbmRFeGN1dGVPbmNlKClcIiwgY29tbWFuZF8pO1xuICAgICAgICBjb21tYW5kUXVldWUuc3BsaWNlKF8uZmluZEluZGV4KGNvbW1hbmRRdWV1ZSwge2NvbW1hbmQgOiBjb21tYW5kX30pLCAxKTtcblxuICAgICAgICBjb25zdCBtZXRob2QgPSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF9dO1xuICAgICAgICBpZiAobWV0aG9kKSB7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJyZW1vdmVDb21tYW5kKClcIik7XG4gICAgICAgICAgICBpZihjb21tYW5kUXVldWVJdGVtKXtcbiAgICAgICAgICAgICAgICAobWV0aG9kfHwgaW5zdGFuY2VbY29tbWFuZF9dKS5hcHBseShpbnN0YW5jZSwgY29tbWFuZFF1ZXVlSXRlbS5hcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluc3RhbmNlW2NvbW1hbmRfXSA9IG1ldGhvZDtcbiAgICAgICAgICAgIGRlbGV0ZSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF9dO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoYXQuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZGVzdHJveSgpXCIpO1xuICAgICAgICB0aGF0Lm9mZigpO1xuICAgICAgICB0aGF0LmVtcHR5KCk7XG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTGF6eUNvbW1hbmRFeGVjdXRvcjsiLCJpbXBvcnQge2lzUnRtcCwgaXNXZWJSVEMsIGlzRGFzaH0gZnJvbSBcInV0aWxzL3ZhbGlkYXRvclwiO1xuXG4vKipcbiAqIEBicmllZiAgIFRoaXMgZmluZHMgdGhlIHByb3ZpZGVyIHRoYXQgbWF0Y2hlcyB0aGUgaW5wdXQgc291cmNlLlxuICogQHBhcmFtXG4gKiAqL1xuXG5jb25zdCBTdXBwb3J0Q2hlY2tlciA9IGZ1bmN0aW9uKCl7XG4gICAgY29uc3QgdGhhdCA9IHt9O1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlN1cHBvcnRDaGVja2VyIGxvYWRlZC5cIik7XG4gICAgY29uc3Qgc3VwcG9ydExpc3QgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdodG1sNScsXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBNaW1lVHlwZXMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGFhYzogJ2F1ZGlvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIG1wNDogJ3ZpZGVvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIGY0djogJ3ZpZGVvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIG00djogJ3ZpZGVvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIG1vdjogJ3ZpZGVvL21wNCcsXG4gICAgICAgICAgICAgICAgICAgIG1wMzogJ2F1ZGlvL21wZWcnLFxuICAgICAgICAgICAgICAgICAgICBtcGVnOiAnYXVkaW8vbXBlZycsXG4gICAgICAgICAgICAgICAgICAgIG9ndjogJ3ZpZGVvL29nZycsXG4gICAgICAgICAgICAgICAgICAgIG9nZzogJ3ZpZGVvL29nZycsXG4gICAgICAgICAgICAgICAgICAgIG9nYTogJ3ZpZGVvL29nZycsXG4gICAgICAgICAgICAgICAgICAgIHZvcmJpczogJ3ZpZGVvL29nZycsXG4gICAgICAgICAgICAgICAgICAgIHdlYm06ICd2aWRlby93ZWJtJyxcbiAgICAgICAgICAgICAgICAgICAgZjRhOiAndmlkZW8vYWFjJyxcbiAgICAgICAgICAgICAgICAgICAgbTN1ODogJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyxcbiAgICAgICAgICAgICAgICAgICAgbTN1OiAnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnLFxuICAgICAgICAgICAgICAgICAgICBobHM6ICdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCdcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgY29uc3QgdmlkZW8gPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKVxuICAgICAgICAgICAgICAgIH0oKTtcbiAgICAgICAgICAgICAgICBpZiAoIXZpZGVvLmNhblBsYXlUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gc291cmNlLmZpbGU7XG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNvdXJjZS50eXBlO1xuICAgICAgICAgICAgICAgIGlmKCF0eXBlKXtyZXR1cm4gZmFsc2U7fVxuICAgICAgICAgICAgICAgIGNvbnN0IG1pbWVUeXBlID0gc291cmNlLm1pbWVUeXBlIHx8IE1pbWVUeXBlc1t0eXBlXTtcblxuICAgICAgICAgICAgICAgIGlmIChpc1J0bXAoZmlsZSwgdHlwZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKGlzV2ViUlRDKGZpbGUsIHR5cGUpKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghbWltZVR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAhIXZpZGVvLmNhblBsYXlUeXBlKG1pbWVUeXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ3dlYnJ0YycsXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2aWRlbyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpXG4gICAgICAgICAgICAgICAgfSgpO1xuICAgICAgICAgICAgICAgIGlmICghdmlkZW8uY2FuUGxheVR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc291cmNlLnR5cGU7XG5cbiAgICAgICAgICAgICAgICBpZihpc1dlYlJUQyhmaWxlLCB0eXBlKSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnZGFzaCcsXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gc291cmNlLmZpbGU7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc291cmNlLnR5cGU7XG5cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mICggd2luZG93Lk1lZGlhU291cmNlIHx8IHdpbmRvdy5XZWJLaXRNZWRpYVNvdXJjZSApID09PSBcImZ1bmN0aW9uXCIgJiYgaXNEYXNoKGZpbGUsIHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnaGxzJyxcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZpZGVvID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJylcbiAgICAgICAgICAgICAgICB9KCk7XG5cbiAgICAgICAgICAgICAgICAvL3RoaXMgbWV0aG9kIGZyb20gaGxzLmpzXG4gICAgICAgICAgICAgICAgY29uc3QgaXNIbHNTdXBwb3J0ID0gKCkgPT57XG4gICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiBnZXRNZWRpYVNvdXJjZSgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuTWVkaWFTb3VyY2UgfHwgd2luZG93LldlYktpdE1lZGlhU291cmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciBtZWRpYVNvdXJjZSA9IGdldE1lZGlhU291cmNlKCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzb3VyY2VCdWZmZXIgPSB3aW5kb3cuU291cmNlQnVmZmVyIHx8IHdpbmRvdy5XZWJLaXRTb3VyY2VCdWZmZXI7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpc1R5cGVTdXBwb3J0ZWQgPSBtZWRpYVNvdXJjZSAmJiB0eXBlb2YgbWVkaWFTb3VyY2UuaXNUeXBlU3VwcG9ydGVkID09PSAnZnVuY3Rpb24nICYmIG1lZGlhU291cmNlLmlzVHlwZVN1cHBvcnRlZCgndmlkZW8vbXA0OyBjb2RlY3M9XCJhdmMxLjQyRTAxRSxtcDRhLjQwLjJcIicpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIFNvdXJjZUJ1ZmZlciBpcyBleHBvc2VkIGVuc3VyZSBpdHMgQVBJIGlzIHZhbGlkXG4gICAgICAgICAgICAgICAgICAgIC8vIHNhZmFyaSBhbmQgb2xkIHZlcnNpb24gb2YgQ2hyb21lIGRvZSBub3QgZXhwb3NlIFNvdXJjZUJ1ZmZlciBnbG9iYWxseSBzbyBjaGVja2luZyBTb3VyY2VCdWZmZXIucHJvdG90eXBlIGlzIGltcG9zc2libGVcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNvdXJjZUJ1ZmZlclZhbGlkQVBJID0gIXNvdXJjZUJ1ZmZlciB8fCBzb3VyY2VCdWZmZXIucHJvdG90eXBlICYmIHR5cGVvZiBzb3VyY2VCdWZmZXIucHJvdG90eXBlLmFwcGVuZEJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygc291cmNlQnVmZmVyLnByb3RvdHlwZS5yZW1vdmUgPT09ICdmdW5jdGlvbic7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhIWlzVHlwZVN1cHBvcnRlZCAmJiAhIXNvdXJjZUJ1ZmZlclZhbGlkQVBJO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLy9SZW1vdmUgdGhpcyAnISF2aWRlby5jYW5QbGF5VHlwZSgnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnKScgaWYgeW91IHdhbnQgdG8gdXNlIGhsc2pzLlxuICAgICAgICAgICAgICAgIHJldHVybiBpc0hsc1N1cHBvcnQoKSAmJiAhIXZpZGVvLmNhblBsYXlUeXBlKCdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAncnRtcCcsXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gc291cmNlLmZpbGU7XG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNvdXJjZS50eXBlO1xuICAgICAgICAgICAgICAgIGlmIChpc1J0bXAoZmlsZSwgdHlwZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICBdO1xuXG4gICAgdGhhdC5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UgPSAoc29ydWNlXykgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJTdXBwb3J0Q2hlY2tlciA6IGZpbmRQcm92aWRlck5hbWVCeVNvdXJjZSgpXCIsIHNvcnVjZV8pO1xuICAgICAgICBjb25zdCBzb3VyY2UgPSAoc29ydWNlXyA9PT0gT2JqZWN0KHNvcnVjZV8pKSA/IHNvcnVjZV8gOiB7fTtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHN1cHBvcnRMaXN0Lmxlbmd0aDsgaSArKyl7XG4gICAgICAgICAgICBpZihzdXBwb3J0TGlzdFtpXS5jaGVja1N1cHBvcnQoc291cmNlKSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1cHBvcnRMaXN0W2ldLm5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQuZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0ID0gKHBsYXlsaXN0SXRlbSkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJTdXBwb3J0Q2hlY2tlciA6IGZpbmRQcm92aWRlck5hbWVzQnlQbGF5bGlzdCgpXCIsIHBsYXlsaXN0SXRlbSk7XG4gICAgICAgIGxldCBzdXBwb3J0TmFtZXMgPSBbXTtcbiAgICAgICAgLypmb3IgKGxldCBpID0gcGxheWxpc3RfLmxlbmd0aDsgaS0tOykge1xuXG5cbiAgICAgICAgfSovXG4gICAgICAgIGNvbnN0IGl0ZW0gPSBwbGF5bGlzdEl0ZW07XG4gICAgICAgIGxldCBzb3VyY2UgPSBcIlwiO1xuICAgICAgICBpZihpdGVtICYmIGl0ZW0uc291cmNlcyl7XG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgaXRlbS5zb3VyY2VzLmxlbmd0aDsgaiArKyl7XG4gICAgICAgICAgICAgICAgc291cmNlID0gaXRlbS5zb3VyY2VzW2pdO1xuICAgICAgICAgICAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3VwcG9ydGVkID0gdGhhdC5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2Uoc291cmNlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1cHBvcnRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VwcG9ydE5hbWVzLnB1c2goc3VwcG9ydGVkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHN1cHBvcnROYW1lcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBTdXBwb3J0Q2hlY2tlcjtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDQuLlxuICovXG5pbXBvcnQgU3J0UGFyc2VyIGZyb20gXCJhcGkvY2FwdGlvbi9wYXJzZXIvU3J0UGFyc2VyXCI7XG5pbXBvcnQgVlRUQ3VlIGZyb20gXCJ1dGlscy9jYXB0aW9ucy92dHRDdWVcIjtcbi8vaW1wb3J0IFJlcXVlc3QgZnJvbSBcInV0aWxzL2Rvd25sb2FkZXJcIjtcblxuY29uc3QgTG9hZGVyID0gZnVuY3Rpb24oKXtcbiAgICBjb25zdCB0aGF0ID0ge307XG5cbiAgICBjb25zdCBjb252ZXJ0VG9WVFRDdWVzID0gZnVuY3Rpb24gKGN1ZXMpIHtcbiAgICAgICAgcmV0dXJuIGN1ZXMubWFwKGN1ZSA9PiBuZXcgVlRUQ3VlKGN1ZS5zdGFydCwgY3VlLmVuZCwgY3VlLnRleHQpKTtcbiAgICB9XG4gICAgLy9sYW5ndWFnZSA6IGZvciBTTUkgZm9ybWF0LlxuICAgIHRoYXQubG9hZCA9ICh0cmFjaywgbGFuZ3VhZ2UsIHN1Y2Nlc3NDYWxsYmFjaywgZXJyb3JDYWxsYmFjaykgPT4ge1xuXG4gICAgICAgIHZhciByZXF1ZXN0T3B0aW9ucyAgPSB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICAgICAgICB1cmwgOiB0cmFjay5maWxlLFxuICAgICAgICAgICAgZW5jb2Rpbmc6IG51bGxcbiAgICAgICAgfTtcblxuICAgICAgICBsb2FkUmVxdWVzdERvd25sb2RlcigpLnRoZW4oUmVxdWVzdCA9PiB7XG4gICAgICAgICAgICBSZXF1ZXN0KHJlcXVlc3RPcHRpb25zLCBmdW5jdGlvbihlcnJvciwgcmVzcG9uc2UsIGJvZHkpIHtcbiAgICAgICAgICAgICAgICBpZihlcnJvcil7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yQ2FsbGJhY2soZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBsZXQgY3VlcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBsZXQgdnR0Q3VlcyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChib2R5LmluZGV4T2YoJ1dFQlZUVCcpID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldFQlZUVCBMT0FERURcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkVnR0UGFyc2VyKCkudGhlbihXZWJWVFQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwYXJzZXIgPSBuZXcgV2ViVlRULlBhcnNlcih3aW5kb3csIFdlYlZUVC5TdHJpbmdEZWNvZGVyKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZ0dEN1ZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZXIub25jdWUgPSBmdW5jdGlvbihjdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdnR0Q3Vlcy5wdXNoKGN1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZXIub25mbHVzaCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2RlbGV0ZSB0cmFjay54aHI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NDYWxsYmFjayh2dHRDdWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBhcnNlIGNhbGxzIG9uZmx1c2ggaW50ZXJuYWxseVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlci5wYXJzZShib2R5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2RlbGV0ZSB0cmFjay54aHI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JDYWxsYmFjayhlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoYm9keS5pbmRleE9mKCdTQU1JJykgPj0gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJTQU1JIExPQURFRFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRTbWlQYXJzZXIoKS50aGVuKFNtaVBhcnNlciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBhcnNlZERhdGEgPSBTbWlQYXJzZXIoYm9keSwge2ZpeGVkTGFuZyA6IGxhbmd1YWdlfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdnR0Q3VlcyA9IGNvbnZlcnRUb1ZUVEN1ZXMocGFyc2VkRGF0YS5yZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NDYWxsYmFjayh2dHRDdWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2RlbGV0ZSB0cmFjay54aHI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JDYWxsYmFjayhlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU1JUIExPQURFRFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ZXMgPSBTcnRQYXJzZXIoYm9keSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2dHRDdWVzID0gY29udmVydFRvVlRUQ3VlcyhjdWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NDYWxsYmFjayh2dHRDdWVzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIC8vZGVsZXRlIHRyYWNrLnhocjtcbiAgICAgICAgICAgIGVycm9yQ2FsbGJhY2soZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuZnVuY3Rpb24gbG9hZFJlcXVlc3REb3dubG9kZXIoKXtcbiAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWyd1dGlscy9kb3dubG9hZGVyJ10sIGZ1bmN0aW9uIChyZXF1aXJlKSB7XG4gICAgICAgIHJldHVybiByZXF1aXJlKCd1dGlscy9kb3dubG9hZGVyJykuZGVmYXVsdDtcbiAgICB9LCBmdW5jdGlvbihlcnIpe2NvbnNvbGUubG9nKGVycik7fSwgJ2Rvd25sb2FkZXInKTtcbn07XG5mdW5jdGlvbiBsb2FkVnR0UGFyc2VyKCkge1xuICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9jYXB0aW9uL3BhcnNlci9WdHRQYXJzZXInXSwgZnVuY3Rpb24gKHJlcXVpcmUpIHtcbiAgICAgICAgcmV0dXJuIHJlcXVpcmUoJ2FwaS9jYXB0aW9uL3BhcnNlci9WdHRQYXJzZXInKS5kZWZhdWx0O1xuICAgIH0sIGZ1bmN0aW9uKGVycil7Y29uc29sZS5sb2coZXJyKTt9LCAndnR0cGFyc2VyJyk7XG59XG5mdW5jdGlvbiBsb2FkU21pUGFyc2VyKCkge1xuICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9jYXB0aW9uL3BhcnNlci9TbWlQYXJzZXInXSwgZnVuY3Rpb24gKHJlcXVpcmUpIHtcbiAgICAgICAgcmV0dXJuIHJlcXVpcmUoJ2FwaS9jYXB0aW9uL3BhcnNlci9TbWlQYXJzZXInKS5kZWZhdWx0O1xuICAgIH0sIGZ1bmN0aW9uKGVycil7Y29uc29sZS5sb2coZXJyKTt9LCAnc21pcGFyc2VyJyk7XG59XG5leHBvcnQgZGVmYXVsdCBMb2FkZXI7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA1LiAxNy4uXG4gKi9cbmltcG9ydCBDYXB0aW9uTG9hZGVyIGZyb20gJ2FwaS9jYXB0aW9uL0xvYWRlcic7XG5pbXBvcnQge1JFQURZLCBFUlJPUlMsIEVSUk9SLCBQTEFZRVJfQ0FQVElPTl9FUlJPUiwgQ09OVEVOVF9NRVRBLCBDT05URU5UX1RJTUUsIENPTlRFTlRfQ0FQVElPTl9DVUVfQ0hBTkdFRCwgQ09OVEVOVF9DQVBUSU9OX0NIQU5HRUR9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xuXG5jb25zdCBpc1N1cHBvcnQgPSBmdW5jdGlvbihraW5kKXtcbiAgICByZXR1cm4ga2luZCA9PT0gJ3N1YnRpdGxlcycgfHwga2luZCA9PT0gJ2NhcHRpb25zJztcbn07XG5cbmNvbnN0IE1hbmFnZXIgPSBmdW5jdGlvbihhcGksIHBsYXlsaXN0SW5kZXgpe1xuXG4gICAgY29uc3QgdGhhdCA9IHt9O1xuICAgIGxldCBjYXB0aW9uTGlzdCA9IFtdO1xuICAgIGxldCBjdXJyZW50Q2FwdGlvbkluZGV4ID0gLTE7XG5cbiAgICBsZXQgY2FwdGlvbkxvYWRlciA9IENhcHRpb25Mb2FkZXIoKTtcbiAgICBsZXQgaXNGaXNydExvYWQgPSB0cnVlO1xuICAgIGxldCBpc1Nob3dpbmcgPSBmYWxzZTtcblxuXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ2FwdGlvbiBNYW5hZ2VyID4+IFwiLCBwbGF5bGlzdEluZGV4KTtcblxuXG4gICAgbGV0IGJpbmRUcmFjayA9IGZ1bmN0aW9uKHRyYWNrLCB2dHRDdWVzKXtcbiAgICAgICAgdHJhY2suZGF0YSA9IHZ0dEN1ZXMgfHwgW107XG4gICAgICAgIHRyYWNrLm5hbWUgPSB0cmFjay5sYWJlbCB8fCB0cmFjay5uYW1lIHx8IHRyYWNrLmxhbmd1YWdlO1xuICAgICAgICB0cmFjay5pZCA9IChmdW5jdGlvbih0cmFjaywgdHJhY2tzQ291bnQpIHtcbiAgICAgICAgICAgIHZhciB0cmFja0lkO1xuICAgICAgICAgICAgdmFyIHByZWZpeCA9IHRyYWNrLmtpbmQgfHwgJ2NjJztcbiAgICAgICAgICAgIGlmICh0cmFjay5kZWZhdWx0IHx8IHRyYWNrLmRlZmF1bHR0cmFjaykge1xuICAgICAgICAgICAgICAgIHRyYWNrSWQgPSAnZGVmYXVsdCc7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdHJhY2tJZCA9IHRyYWNrLmlkIHx8IChwcmVmaXggKyB0cmFja3NDb3VudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihpc0Zpc3J0TG9hZCl7XG4gICAgICAgICAgICAgICAgLy9UaGlzIGV4ZWN1dGUgb25seSBvbi4gYW5kIHRoZW4gdXNlIGZsdXNoQ2FwdGlvbkxpc3QobGFzdENhcHRpb25JbmRleCk7XG4gICAgICAgICAgICAgICAgY2hhbmdlQ3VycmVudENhcHRpb24oY2FwdGlvbkxpc3QubGVuZ3RofHwwKTtcbiAgICAgICAgICAgICAgICBpc0Zpc3J0TG9hZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJhY2tJZDtcbiAgICAgICAgfSkodHJhY2ssIGNhcHRpb25MaXN0Lmxlbmd0aCk7XG5cbiAgICAgICAgY2FwdGlvbkxpc3QucHVzaCh0cmFjayk7XG4gICAgICAgIHJldHVybiB0cmFjay5pZDtcbiAgICB9O1xuICAgIGxldCBjaGFuZ2VDdXJyZW50Q2FwdGlvbiA9IGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgY3VycmVudENhcHRpb25JbmRleCA9IGluZGV4O1xuICAgICAgICBhcGkudHJpZ2dlcihDT05URU5UX0NBUFRJT05fQ0hBTkdFRCwgY3VycmVudENhcHRpb25JbmRleCk7XG4gICAgfTtcbiAgICBpZihhcGkuZ2V0Q29uZmlnKCkucGxheWxpc3QgJiYgYXBpLmdldENvbmZpZygpLnBsYXlsaXN0Lmxlbmd0aCA+IDApe1xuICAgICAgICBsZXQgcGxheWxpc3QgPSBhcGkuZ2V0Q29uZmlnKCkucGxheWxpc3RbcGxheWxpc3RJbmRleF07XG5cbiAgICAgICAgaWYocGxheWxpc3QgJiYgcGxheWxpc3QudHJhY2tzICYmIHBsYXlsaXN0LnRyYWNrcy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBwbGF5bGlzdC50cmFja3MubGVuZ3RoOyBpICsrKXtcbiAgICAgICAgICAgICAgICBjb25zdCB0cmFjayA9IHBsYXlsaXN0LnRyYWNrc1tpXTtcblxuICAgICAgICAgICAgICAgIGlmKGlzU3VwcG9ydCh0cmFjay5raW5kKSAmJiAhIF8uZmluZFdoZXJlKHRyYWNrLCB7ZmlsZSA6IHRyYWNrLmZpbGV9KSl7XG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC5mbHVzaENhcHRpb25MaXN0KGN1cnJlbnRDYXB0aW9uSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uTG9hZGVyLmxvYWQodHJhY2ssIHRyYWNrLmxhbmcsIGZ1bmN0aW9uKHZ0dEN1ZXMpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodnR0Q3VlcyAmJiB2dHRDdWVzLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjYXB0aW9uSWQgPSBiaW5kVHJhY2sodHJhY2ssIHZ0dEN1ZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnJvcil7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTW1BMQVlFUl9DQVBUSU9OX0VSUk9SXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXBpLnRyaWdnZXIoRVJST1IsIHRlbXBFcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBpLm9uKENPTlRFTlRfVElNRSwgZnVuY3Rpb24obWV0YSl7XG4gICAgICAgIGxldCBwb3NpdGlvbiA9IG1ldGEucG9zaXRpb247XG4gICAgICAgIGlmKGN1cnJlbnRDYXB0aW9uSW5kZXggPiAtMSAmJiBjYXB0aW9uTGlzdFtjdXJyZW50Q2FwdGlvbkluZGV4XSl7XG4gICAgICAgICAgICBsZXQgY3VycmVudEN1ZXMgPSBfLmZpbHRlcihjYXB0aW9uTGlzdFtjdXJyZW50Q2FwdGlvbkluZGV4XS5kYXRhLCBmdW5jdGlvbiAoY3VlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvc2l0aW9uID49IChjdWUuc3RhcnRUaW1lKSAmJiAoICghY3VlLmVuZFRpbWUgfHwgcG9zaXRpb24pIDw9IGN1ZS5lbmRUaW1lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYoY3VycmVudEN1ZXMgJiYgY3VycmVudEN1ZXMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgYXBpLnRyaWdnZXIoQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VELCBjdXJyZW50Q3Vlc1swXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH0pO1xuICAgIHRoYXQuZmx1c2hDYXB0aW9uTGlzdCA9IChsYXN0Q2FwdGlvbkluZGV4KSA9PntcbiAgICAgICAgY2FwdGlvbkxpc3QgPSBbXTtcbiAgICAgICAgY2hhbmdlQ3VycmVudENhcHRpb24obGFzdENhcHRpb25JbmRleCk7XG4gICAgICAgIC8vY3VycmVudENhcHRpb25JbmRleCA9IGxhc3RDYXB0aW9uSW5kZXg7XG4gICAgfTtcbiAgICB0aGF0LmdldENhcHRpb25MaXN0ID0gKCkgPT57XG4gICAgICAgIHJldHVybiBjYXB0aW9uTGlzdHx8W107XG4gICAgfTtcbiAgICB0aGF0LmdldEN1cnJlbnRDYXB0aW9uID0gKCkgPT57XG4gICAgICAgIHJldHVybiBjdXJyZW50Q2FwdGlvbkluZGV4O1xuICAgIH07XG4gICAgdGhhdC5zZXRDdXJyZW50Q2FwdGlvbiA9IChfaW5kZXgpID0+e1xuICAgICAgICBpZihfaW5kZXggPiAtMiAmJiBfaW5kZXggPCBjYXB0aW9uTGlzdC5sZW5ndGgpe1xuICAgICAgICAgICAgY2hhbmdlQ3VycmVudENhcHRpb24oX2luZGV4KTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhhdC5hZGRDYXB0aW9uID0gKHRyYWNrKSA9PntcbiAgICAgICAgaWYoaXNTdXBwb3J0KHRyYWNrLmtpbmQpICYmICEgXy5maW5kV2hlcmUoY2FwdGlvbkxvYWRlciwge2ZpbGUgOiB0cmFjay5maWxlfSkpe1xuICAgICAgICAgICAgY2FwdGlvbkxvYWRlci5sb2FkKHRyYWNrLCBmdW5jdGlvbih2dHRDdWVzKXtcbiAgICAgICAgICAgICAgICBpZih2dHRDdWVzICYmIHZ0dEN1ZXMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIGJpbmRUcmFjayh0cmFjaywgdnR0Q3Vlcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3Ipe1xuICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlNbUExBWUVSX0NBUFRJT05fRVJST1JdO1xuICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgICAgIGFwaS50cmlnZ2VyKEVSUk9SLCB0ZW1wRXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQucmVtb3ZlQ2FwdGlvbiA9IChpbmRleCkgPT4ge1xuICAgICAgICBpZihpbmRleCA+IC0xICYmIGluZGV4IDwgY2FwdGlvbkxpc3QubGVuZ3RoKXtcbiAgICAgICAgICAgIGNhcHRpb25MaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICByZXR1cm4gY2FwdGlvbkxpc3Q7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+IHtcbiAgICAgICAgY2FwdGlvbkxpc3QgPSBbXTtcbiAgICAgICAgY2FwdGlvbkxvYWRlciA9IG51bGw7XG4gICAgICAgIGFwaS5vZmYoQ09OVEVOVF9USU1FLCBudWxsLCB0aGF0KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cblxuXG5leHBvcnQgZGVmYXVsdCBNYW5hZ2VyO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNS4gMjkuLlxuICovXG5pbXBvcnQgeyBobXNUb1NlY29uZCwgdHJpbSB9IGZyb20gXCJ1dGlscy9zdHJpbmdzXCJcblxuZnVuY3Rpb24gX2VudHJ5KGRhdGEpIHtcbiAgICB2YXIgZW50cnkgPSB7fTtcbiAgICB2YXIgYXJyYXkgPSBkYXRhLnNwbGl0KCdcXHJcXG4nKTtcbiAgICBpZiAoYXJyYXkubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGFycmF5ID0gZGF0YS5zcGxpdCgnXFxuJyk7XG4gICAgfVxuICAgIHZhciBpZHggPSAxO1xuICAgIGlmIChhcnJheVswXS5pbmRleE9mKCcgLS0+ICcpID4gMCkge1xuICAgICAgICBpZHggPSAwO1xuICAgIH1cbiAgICBpZiAoYXJyYXkubGVuZ3RoID4gaWR4ICsgMSAmJiBhcnJheVtpZHggKyAxXSkge1xuICAgICAgICAvLyBUaGlzIGxpbmUgY29udGFpbnMgdGhlIHN0YXJ0IGFuZCBlbmQuXG4gICAgICAgIHZhciBsaW5lID0gYXJyYXlbaWR4XTtcbiAgICAgICAgdmFyIGluZGV4ID0gbGluZS5pbmRleE9mKCcgLS0+ICcpO1xuICAgICAgICBpZiAoaW5kZXggPiAwKSB7XG4gICAgICAgICAgICBlbnRyeS5zdGFydCA9IGhtc1RvU2Vjb25kKGxpbmUuc3Vic3RyKDAsIGluZGV4KSk7XG4gICAgICAgICAgICBlbnRyeS5lbmQgPSBobXNUb1NlY29uZChsaW5lLnN1YnN0cihpbmRleCArIDUpKTtcbiAgICAgICAgICAgIGVudHJ5LnRleHQgPSBhcnJheS5zbGljZShpZHggKyAxKS5qb2luKCdcXHJcXG4nKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZW50cnk7XG5cbn1cblxuY29uc3QgU3J0UGFyc2VyID0gZnVuY3Rpb24oZGF0YSkge1xuICAgIHZhciBjYXB0aW9ucyA9IFtdO1xuXG4gICAgZGF0YSA9IHRyaW0oZGF0YSk7XG5cbiAgICB2YXIgbGlzdCA9IGRhdGEuc3BsaXQoJ1xcclxcblxcclxcbicpO1xuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBsaXN0ID0gZGF0YS5zcGxpdCgnXFxuXFxuJyk7XG4gICAgfVxuXG5cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAobGlzdFtpXSA9PT0gJ1dFQlZUVCcpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlbnRyeSA9IF9lbnRyeShsaXN0W2ldKTtcbiAgICAgICAgaWYgKGVudHJ5LnRleHQpIHtcbiAgICAgICAgICAgIGNhcHRpb25zLnB1c2goZW50cnkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNhcHRpb25zO1xufVxuXG5cblxuZXhwb3J0IGRlZmF1bHQgU3J0UGFyc2VyOyIsIi8vIFNUQVRFXG5leHBvcnQgY29uc3QgU1RBVEVfQlVGRkVSSU5HID0gXCJidWZmZXJpbmdcIjtcbmV4cG9ydCBjb25zdCBTVEFURV9JRExFID0gXCJpZGxlXCI7XG5leHBvcnQgY29uc3QgU1RBVEVfQ09NUExFVEUgPSBcImNvbXBsZXRlXCI7XG5leHBvcnQgY29uc3QgU1RBVEVfUEFVU0VEID0gXCJwYXVzZWRcIjtcbmV4cG9ydCBjb25zdCBTVEFURV9QTEFZSU5HID0gXCJwbGF5aW5nXCI7XG5leHBvcnQgY29uc3QgU1RBVEVfRVJST1IgPSBcImVycm9yXCI7XG5leHBvcnQgY29uc3QgU1RBVEVfTE9BRElORyA9IFwibG9hZGluZ1wiO1xuZXhwb3J0IGNvbnN0IFNUQVRFX1NUQUxMRUQgPSBcInN0YWxsZWRcIjtcblxuZXhwb3J0IGNvbnN0IFNUQVRFX0FEX0xPQURFRCA9IFwiYWRMb2FkZWRcIjtcbmV4cG9ydCBjb25zdCBTVEFURV9BRF9QTEFZSU5HID0gXCJhZFBsYXlpbmdcIjtcbmV4cG9ydCBjb25zdCBTVEFURV9BRF9QQVVTRUQgPSBcImFkUGF1c2VkXCI7XG5leHBvcnQgY29uc3QgU1RBVEVfQURfQ09NUExFVEUgPSBcImFkQ29tcGxldGVcIjtcbmV4cG9ydCBjb25zdCBTVEFURV9BRF9FUlJPUiA9IFwiYWRFcnJvclwiO1xuXG4vLyBQUk9WSURFUlxuZXhwb3J0IGNvbnN0IFBST1ZJREVSX0hUTUw1ID0gXCJodG1sNVwiO1xuZXhwb3J0IGNvbnN0IFBST1ZJREVSX1dFQlJUQyA9IFwid2VicnRjXCI7XG5leHBvcnQgY29uc3QgUFJPVklERVJfREFTSCA9IFwiZGFzaFwiO1xuZXhwb3J0IGNvbnN0IFBST1ZJREVSX0hMUyA9IFwiaGxzXCI7XG5leHBvcnQgY29uc3QgUFJPVklERVJfUlRNUCA9IFwicnRtcFwiO1xuXG4vLyBFVkVOVFNcbmV4cG9ydCBjb25zdCBDT05URU5UX0NPTVBMRVRFID0gU1RBVEVfQ09NUExFVEU7XG5leHBvcnQgY29uc3QgUkVBRFkgPSBcInJlYWR5XCI7XG5leHBvcnQgY29uc3QgREVTVFJPWSA9IFwiZGVzdHJveVwiO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfU0VFSyA9IFwic2Vla1wiO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfQlVGRkVSX0ZVTEwgPSBcImJ1ZmZlckZ1bGxcIjtcbmV4cG9ydCBjb25zdCBESVNQTEFZX0NMSUNLID0gXCJkaXNwbGF5Q2xpY2tcIjtcbmV4cG9ydCBjb25zdCBDT05URU5UX0xPQURFRCA9IFwibG9hZGVkXCI7XG5leHBvcnQgY29uc3QgUExBWUxJU1RfQ0hBTkdFRCA9IFwicGxheWxpc3RDaGFuZ2VkXCI7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9TRUVLRUQgPSBcInNlZWtlZFwiO1xuZXhwb3J0IGNvbnN0IEFMTF9QTEFZTElTVF9FTkRFRCA9IFwiYWxsUGxheWxpc3RFbmRlZFwiO1xuZXhwb3J0IGNvbnN0IE5FVFdPUktfVU5TVEFCTEVEID0gXCJ1bnN0YWJsZU5ldHdvcmtcIjtcblxuXG5cbmV4cG9ydCBjb25zdCBFUlJPUiA9IFwiZXJyb3JcIjtcblxuLy8gU1RBVEUgT0YgUExBWUVSXG5leHBvcnQgY29uc3QgUExBWUVSX1NUQVRFID0gXCJzdGF0ZUNoYW5nZWRcIjtcbmV4cG9ydCBjb25zdCBQTEFZRVJfQ09NUExFVEUgPSBTVEFURV9DT01QTEVURTtcbmV4cG9ydCBjb25zdCBQTEFZRVJfUEFVU0UgPSBcInBhdXNlXCI7XG5leHBvcnQgY29uc3QgUExBWUVSX1BMQVkgPSBcInBsYXlcIjtcbmV4cG9ydCBjb25zdCBQTEFZRVJfUkVTSVpFRCA9IFwicmVzaXplZFwiO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9MT0FESU5HID0gXCJsb2FkaW5nXCI7XG5leHBvcnQgY29uc3QgUExBWUVSX0ZVTExTQ1JFRU5fUkVRVUVTVCA9IFwiZnVsbHNjcmVlblJlcXVlc3RlZFwiO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9GVUxMU0NSRUVOX0NIQU5HRUQgPSBcImZ1bGxzY3JlZW5DaGFuZ2VkXCI7XG5leHBvcnQgY29uc3QgUExBWUVSX1dBUk5JTkcgPSBcIndhcm5pbmdcIjtcblxuZXhwb3J0IGNvbnN0IEFEX0NIQU5HRUQgPSBcImFkQ2hhbmdlZFwiO1xuZXhwb3J0IGNvbnN0IEFEX1RJTUUgPSBcImFkVGltZVwiO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfQlVGRkVSID0gXCJidWZmZXJDaGFuZ2VkXCI7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9USU1FID0gXCJ0aW1lXCI7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9SQVRFX0NIQU5HRSA9IFwicmF0ZWNoYW5nZVwiO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfVk9MVU1FID0gXCJ2b2x1bWVDaGFuZ2VkXCI7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9NVVRFID0gXCJtdXRlXCI7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9NRVRBID0gXCJtZXRhQ2hhbmdlZFwiO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfU09VUkNFX0NIQU5HRUQgPSBcInNvdXJjZUNoYW5nZWRcIjtcbmV4cG9ydCBjb25zdCBDT05URU5UX0xFVkVMX0NIQU5HRUQgPSBcInF1YWxpdHlMZXZlbENoYW5nZWRcIjtcbmV4cG9ydCBjb25zdCBQTEFZQkFDS19SQVRFX0NIQU5HRUQgPSBcInBsYXliYWNrUmF0ZUNoYW5nZWRcIjtcbmV4cG9ydCBjb25zdCBDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQgPSBcImN1ZUNoYW5nZWRcIjtcbmV4cG9ydCBjb25zdCBDT05URU5UX0NBUFRJT05fQ0hBTkdFRCA9IFwiY2FwdGlvbkNoYW5nZWRcIjtcbmV4cG9ydCBjb25zdCBDT05URU5UX1RJTUVfTU9ERV9DSEFOR0VEID0gXCJ0aW1lRGlzcGxheU1vZGVDaGFuZ2VkXCI7XG5leHBvcnQgY29uc3QgT01FX1AyUF9NT0RFID0gXCJwMnBNb2RlXCI7XG5cblxuZXhwb3J0IGNvbnN0IElOSVRfVU5LTldPTl9FUlJPUiA9IDEwMDtcbmV4cG9ydCBjb25zdCBJTklUX1VOU1VQUE9SVF9FUlJPUiA9IDEwMTtcbmV4cG9ydCBjb25zdCBJTklUX1JUTVBfU0VUVVBfRVJST1IgPSAxMDI7XG5leHBvcnQgY29uc3QgSU5JVF9EQVNIX1VOU1VQUE9SVCA9IDEwMztcbmV4cG9ydCBjb25zdCBJTklUX0FEU19FUlJPUiA9IDEwNDtcbmV4cG9ydCBjb25zdCBJTklUX0RBU0hfTk9URk9VTkQgPSAxMDU7XG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fRVJST1IgPSAzMDA7XG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SID0gMzAxO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IgPSAzMDI7XG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SID0gMzAzO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9GSUxFX0VSUk9SID0gMzA0O1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9DQVBUSU9OX0VSUk9SID0gMzA1O1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfV1NfRVJST1IgPSA1MDE7XG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SID0gNTAyO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SID0gNTAzO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUiA9IDUwNDtcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SID0gNTA1O1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfTkVUV09SS19TTE9XID0gNTEwO1xuXG5leHBvcnQgY29uc3QgV0FSTl9NU0dfTVVURURQTEFZID0gXCJQbGVhc2UgdG91Y2ggaGVyZSB0byB0dXJuIG9uIHRoZSBzb3VuZC5cIjtcblxuZXhwb3J0IGNvbnN0IEVSUk9SUyA9IHtcbiAgICAxMDAgOiB7Y29kZSA6IDEwMCAsIG1lc3NhZ2UgOiBcIkNhbiBub3QgbG9hZCBkdWUgdG8gdW5rbm93biByZWFzb25zLlwiLCByZWFzb24gOlwiQ2FuIG5vdCBsb2FkIGR1ZSB0byB1bmtub3duIHJlYXNvbnMuXCJ9LFxuICAgIDEwMSA6IHtjb2RlIDogMTAxICwgbWVzc2FnZSA6IFwiQ2FuIG5vdCBsb2FkIGR1ZSB0byB1bnN1cHBvcnRlZCBtZWRpYS5cIiwgcmVhc29uIDpcIkNhbiBub3QgbG9hZCBkdWUgdG8gdW5zdXBwb3J0ZWQgbWVkaWEuXCJ9LFxuICAgIDEwMiA6IHtjb2RlIDogMTAyICwgbWVzc2FnZSA6IFwiRmxhc2ggZmV0Y2hpbmcgcHJvY2VzcyBhYm9ydGVkLiA8L2JyPjxhIGhyZWY9J2h0dHA6Ly93d3cuYWRvYmUuY29tL2dvL2dldGZsYXNocGxheWVyJyB0YXJnZXQ9J19zZWxmJz48aW1nIHNyYz0naHR0cDovL3d3dy5hZG9iZS5jb20vaW1hZ2VzL3NoYXJlZC9kb3dubG9hZF9idXR0b25zL2dldF9mbGFzaF9wbGF5ZXIuZ2lmJyBhbHQ9J0dldCBBZG9iZSBGbGFzaCBwbGF5ZXInPjwvYT5cIiwgcmVhc29uIDpcIkl0IGxvb2tzIGxpa2Ugbm90IGZvdW5kIHN3ZiBvciB5b3VyIGVudmlyb25tZW50IGlzIGxvY2FsaG9zdC5cIn0sXG4gICAgMTAzIDoge2NvZGUgOiAxMDMgLCBtZXNzYWdlIDogXCJDYW4gbm90IGxvYWQgZHVlIHRvIGRhc2hqcy4gUGxlYXNlIGNoZWNrIHRoZSBsYXN0ZXN0IHZlcnNpb24uXCIsIHJlYXNvbiA6XCJkYXNoLmpzIHZlcnNpb24gaXMgb2xkLiBQbGVhc2UgY2hlY2sgdGhlIGxhc3Rlc3QuXCJ9LFxuICAgIDEwNCA6IHtjb2RlIDogMTA0ICwgbWVzc2FnZSA6IFwiQ2FuIG5vdCBsb2FkIGR1ZSB0byBnb29nbGUgaW1hIGZvciBBZHMuIFwiLCByZWFzb24gOlwiUGxlYXNlIGNoZWNrIHRoZSBnb29nbGUgaW1hIGxpYnJhcnkuXCJ9LFxuICAgIDEwNSA6IHtjb2RlIDogMTA1ICwgbWVzc2FnZSA6IFwiQ2FuIG5vdCBmaW5kIHRoZSBkYXNoanMuIFBsZWFzZSBjaGVjayB0aGUgZGFzaGpzLlwiLCByZWFzb24gOlwiTm90IGZvdW5kIGRhc2hqcy5cIn0sXG4gICAgMzAwIDoge2NvZGUgOiAzMDAgLCBtZXNzYWdlIDogXCJDYW4gbm90IHBsYXkgZHVlIHRvIHVua25vd24gcmVhc29ucy5cIiwgcmVhc29uIDpcIkNhbiBub3QgcGxheSBkdWUgdG8gdW5rbm93biByZWFzb25zLlwifSxcbiAgICAzMDEgOiB7Y29kZSA6IDMwMSAsIG1lc3NhZ2UgOiBcIkZldGNoaW5nIHByb2Nlc3MgYWJvcnRlZCBieSB1c2VyLlwiLCByZWFzb24gOlwiRmV0Y2hpbmcgcHJvY2VzcyBhYm9ydGVkIGJ5IHVzZXIuXCJ9LFxuICAgIDMwMiA6IHtjb2RlIDogMzAyICwgbWVzc2FnZSA6IFwiU29tZSBvZiB0aGUgbWVkaWEgY291bGQgbm90IGJlIGRvd25sb2FkZWQgZHVlIHRvIGEgbmV0d29yayBlcnJvci5cIiwgcmVhc29uIDpcIkVycm9yIG9jY3VycmVkIHdoZW4gZG93bmxvYWRpbmcuXCJ9LFxuICAgIDMwMyA6IHtjb2RlIDogMzAzICwgbWVzc2FnZSA6IFwiVW5hYmxlIHRvIGxvYWQgbWVkaWEuIFRoaXMgbWF5IGJlIGR1ZSB0byBhIHNlcnZlciBvciBuZXR3b3JrIGVycm9yLCBvciBkdWUgdG8gYW4gdW5zdXBwb3J0ZWQgZm9ybWF0LlwiLCByZWFzb24gOlwiRXJyb3Igb2NjdXJyZWQgd2hlbiBkZWNvZGluZy5cIn0sXG4gICAgMzA0IDoge2NvZGUgOiAzMDQgLCBtZXNzYWdlIDogXCJNZWRpYSBwbGF5YmFjayBoYXMgYmVlbiBjYW5jZWxlZC4gSXQgbG9va3MgbGlrZSB5b3VyIG1lZGlhIGlzIGNvcnJ1cHRlZCBvciB5b3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCB0aGUgZmVhdHVyZXMgeW91ciBtZWRpYSB1c2VzLlwiLCByZWFzb24gOlwiTWVkaWEgcGxheWJhY2sgbm90IHN1cHBvcnRlZC5cIn0sXG4gICAgMzA1IDoge2NvZGUgOiAzMDUgLCBtZXNzYWdlIDogXCJDYW4gbm90IGxvYWQgY2FwdGlvbnMgZHVlIHRvIHVua25vd24gcmVhc29ucy5cIiwgcmVhc29uIDpcIkNhbiBub3QgbG9hZCBjYXB0aW9ucyBkdWUgdG8gdW5rbm93biByZWFzb25zLlwifSxcbiAgICA1MDEgOiB7Y29kZSA6IDUwMSAsIG1lc3NhZ2UgOiBcIkNvbm5lY3Rpb24gd2l0aCBsb3ctbGF0ZW5jeShPTUUpIHNlcnZlciBmYWlsZWQuXCIsIHJlYXNvbiA6XCJXZWJTb2NrZXQgY29ubmVjdGlvbiBmYWlsZWQuXCJ9LFxuICAgIDUwMiA6IHtjb2RlIDogNTAyICwgbWVzc2FnZSA6IFwiQ29ubmVjdGlvbiB3aXRoIGxvdy1sYXRlbmN5KE9NRSkgc2VydmVyIGZhaWxlZC5cIiwgcmVhc29uIDpcIldlYlJUQyBhZGRJY2VDYW5kaWRhdGUgZmFpbGVkLlwifSxcbiAgICA1MDMgOiB7Y29kZSA6IDUwMyAsIG1lc3NhZ2UgOiBcIkNvbm5lY3Rpb24gd2l0aCBsb3ctbGF0ZW5jeShPTUUpIHNlcnZlciBmYWlsZWQuXCIsIHJlYXNvbiA6XCJXZWJSVEMgc2V0UmVtb3RlRGVzY3JpcHRpb24gZmFpbGVkLlwifSxcbiAgICA1MDQgOiB7Y29kZSA6IDUwNCAsIG1lc3NhZ2UgOiBcIkNvbm5lY3Rpb24gd2l0aCBsb3ctbGF0ZW5jeShPTUUpIHNlcnZlciBmYWlsZWQuXCIsIHJlYXNvbiA6XCJXZWJSVEMgcGVlciBjcmVhdGVPZmZlciBmYWlsZWQuXCJ9LFxuICAgIDUwNSA6IHtjb2RlIDogNTA1ICwgbWVzc2FnZSA6IFwiQ29ubmVjdGlvbiB3aXRoIGxvdy1sYXRlbmN5KE9NRSkgc2VydmVyIGZhaWxlZC5cIiwgcmVhc29uIDpcIldlYlJUQyBzZXRMb2NhbERlc2NyaXB0aW9uIGZhaWxlZC5cIn0sXG4gICAgNTEwIDoge2NvZGUgOiA1MTAgLCBtZXNzYWdlIDogXCJOZXR3b3JrIGNvbm5lY3Rpb24gaXMgdW5zdGFibGUuIENoZWNrIHRoZSBuZXR3b3JrIGNvbm5lY3Rpb24uXCIsIHJlYXNvbiA6XCJOZXR3b3JrIGlzIHNsb3cuXCJ9XG59O1xuXG5leHBvcnQgY29uc3QgVUlfSUNPTlMgPSB7XG4gICAgdm9sdW1lX211dGUgOiBcInZvbHVtZS1tdXRlXCJcbn07XG4iLCIvKipcbiAqIEBicmllZiAgIOuvuOuUlOyWtCDsl5jrpqzrqLztirjrpbwg6rSA66as7ZWY64qUIOqwneyytC4g7ZiE7J6s64qUIO2VmOuKlCDsnbzsnbQg66eO7KeAIOyViuuLpC5cbiAqIEBwYXJhbSAgIHtlbGVtZW50fSAgIGNvbnRhaW5lciAgIGRvbSBlbGVtZW50XG4gKlxuICogKi9cbmltcG9ydCB7Z2V0QnJvd3Nlcn0gZnJvbSBcInV0aWxzL2Jyb3dzZXJcIjtcbmltcG9ydCB7UFJPVklERVJfREFTSCwgUFJPVklERVJfSExTLCBQUk9WSURFUl9XRUJSVEMsIFBST1ZJREVSX0hUTUw1LCBQUk9WSURFUl9SVE1QfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuaW1wb3J0IExBJCBmcm9tIFwidXRpbHMvbGlrZUEkLmpzXCI7XG5pbXBvcnQge2dldFNjcmlwdFBhdGh9IGZyb20gJ3V0aWxzL3dlYnBhY2snO1xuaW1wb3J0IHt2ZXJzaW9ufSBmcm9tICd2ZXJzaW9uJztcbi8vVG9EbyA6IFJlc3RydWN0dXJpbmdcblxuY29uc3QgTWFuYWdlciA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgYnJvd3NlckluZm8pe1xuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICBjb25zdCBTV0ZQYXRoID0gZ2V0U2NyaXB0UGF0aCgnb3ZlbnBsYXllci5qcycpK1wiT3ZlblBsYXllckZsYXNoLnN3Zj92PVwiK3ZlcnNpb247XG4gICAgbGV0IHJvb3RJZCA9IGNvbnRhaW5lci5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBhcmVudC1pZFwiKTtcbiAgICBsZXQgJGNvbnRhaW5lciA9IExBJChjb250YWluZXIpO1xuICAgIGxldCB2aWRlb0VsZW1lbnQgPSBcIlwiO1xuXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTWVkaWFNYW5hZ2VyIGxvYWRlZC4gYnJvd3NlciA6IFwiLCBicm93c2VySW5mbyApO1xuXG4gICAgY29uc3QgY3JlYXRlSHRtbFZpZGVvID0gZnVuY3Rpb24oaXNMb29wKXtcbiAgICAgICAgdmlkZW9FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbiAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnZGlzYWJsZXJlbW90ZXBsYXliYWNrJywgJycpO1xuICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCd3ZWJraXQtcGxheXNpbmxpbmUnLCAndHJ1ZScpO1xuICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCdwbGF5c2lubGluZScsICd0cnVlJyk7XG4gICAgICAgIGlmKGlzTG9vcCl7XG4gICAgICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCdsb29wJywgJycpO1xuICAgICAgICB9XG4gICAgICAgICRjb250YWluZXIuYXBwZW5kKHZpZGVvRWxlbWVudCk7XG5cbiAgICAgICAgcmV0dXJuIHZpZGVvRWxlbWVudDtcbiAgICB9O1xuICAgIGNvbnN0IGNyZWF0ZUZsYXNoVmlkZW8gPSBmdW5jdGlvbihpc0xvb3AsIGJ1ZmZlclRpbWUsIGJ1ZmZlclRpbWVNYXgpe1xuICAgICAgICBsZXQgbW92aWUsIGZsYXNodmFycywgYWxsb3dzY3JpcHRhY2Nlc3MsIGFsbG93ZnVsbHNjcmVlbiwgcXVhbGl0eSwgbmFtZSwgbWVudSwgcXVhbCwgYmdjb2xvciwgbG9vcCwgd21vZGUgO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJNZWRpYU1hbmFnZXIgRmxhc2ggYnVmZmVyIHNldHRpbmcgOiBcIiwgYnVmZmVyVGltZSwgYnVmZmVyVGltZU1heCk7XG4gICAgICAgIG1vdmllID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcbiAgICAgICAgbW92aWUuc2V0QXR0cmlidXRlKCduYW1lJywgJ21vdmllJyk7XG4gICAgICAgIG1vdmllLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBTV0ZQYXRoKTtcblxuICAgICAgICBmbGFzaHZhcnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xuICAgICAgICBmbGFzaHZhcnMuc2V0QXR0cmlidXRlKCduYW1lJywgJ2ZsYXNodmFycycpO1xuICAgICAgICAvL3BsYXllcklkIGlzIHRvIHVzZSBTV0YgZm9yIEV4dGVybmFsSW50ZXJmYWNlLmNhbGwoKS5cbiAgICAgICAgZmxhc2h2YXJzLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBgcGxheWVySWQ9JHtyb290SWR9JmJ1ZmZlclRpbWU9JHtidWZmZXJUaW1lfSZidWZmZXJNYXhUaW1lPSR7YnVmZmVyVGltZU1heH1gKTtcblxuICAgICAgICBhbGxvd3NjcmlwdGFjY2VzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XG4gICAgICAgIGFsbG93c2NyaXB0YWNjZXNzLnNldEF0dHJpYnV0ZSgnbmFtZScsICdhbGxvd3NjcmlwdGFjY2VzcycpO1xuICAgICAgICBhbGxvd3NjcmlwdGFjY2Vzcy5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ2Fsd2F5cycpO1xuXG4gICAgICAgIGFsbG93ZnVsbHNjcmVlbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XG4gICAgICAgIGFsbG93ZnVsbHNjcmVlbi5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnYWxsb3dmdWxsc2NyZWVuJyk7XG4gICAgICAgIGFsbG93ZnVsbHNjcmVlbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ3RydWUnKTtcblxuICAgICAgICBxdWFsaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcbiAgICAgICAgcXVhbGl0eS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAncXVhbGl0eScpO1xuICAgICAgICBxdWFsaXR5LnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnaGVpZ2h0Jyk7XG5cbiAgICAgICAgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XG4gICAgICAgIG5hbWUuc2V0QXR0cmlidXRlKCduYW1lJywgJ25hbWUnKTtcbiAgICAgICAgbmFtZS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgcm9vdElkK1wiLWZsYXNoXCIpO1xuXG4gICAgICAgIG1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xuICAgICAgICBtZW51LnNldEF0dHJpYnV0ZSgnbmFtZScsICdtZW51Jyk7XG4gICAgICAgIG1lbnUuc2V0QXR0cmlidXRlKCd2YWx1ZScsICdmYWxzZScpO1xuXG4gICAgICAgIHF1YWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xuICAgICAgICBxdWFsLnNldEF0dHJpYnV0ZSgnbmFtZScsICdxdWFsaXR5Jyk7XG4gICAgICAgIHF1YWwuc2V0QXR0cmlidXRlKCd2YWx1ZScsICdoaWdoJyk7XG5cbiAgICAgICAgYmdjb2xvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XG4gICAgICAgIGJnY29sb3Iuc2V0QXR0cmlidXRlKCduYW1lJywgJ2JnY29sb3InKTtcbiAgICAgICAgYmdjb2xvci5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJyMwMDAwMDAnKTtcblxuICAgICAgICB3bW9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XG4gICAgICAgIHdtb2RlLnNldEF0dHJpYnV0ZSgnbmFtZScsICd3bW9kZScpO1xuICAgICAgICB3bW9kZS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ29wYXF1ZScpO1xuXG4gICAgICAgIC8qbGV0IGFsbG93QnV0dG9uID0gYDxhIGhyZWY9XCJodHRwOi8vd3d3LmFkb2JlLmNvbS9nby9nZXRmbGFzaHBsYXllclwiPjxpbWcgc3JjPVwiaHR0cDovL3d3dy5hZG9iZS5jb20vaW1hZ2VzL3NoYXJlZC9kb3dubG9hZF9idXR0b25zL2dldF9mbGFzaF9wbGF5ZXIuZ2lmXCIgYWx0PVwiR2V0IEFkb2JlIEZsYXNoIHBsYXllclwiPjwvYT5gO1xuICAgICAgICBtZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgbWVzc2FnZS5pbm5lckhUTUwgPSBhbGxvd0J1dHRvbjsqL1xuXG4gICAgICAgIGlmKGlzTG9vcCl7XG4gICAgICAgICAgICBsb29wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcbiAgICAgICAgICAgIGxvb3Auc2V0QXR0cmlidXRlKCduYW1lJywgJ2xvb3AnKTtcbiAgICAgICAgICAgIGxvb3Auc2V0QXR0cmlidXRlKCd2YWx1ZScsICd0cnVlJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2aWRlb0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvYmplY3QnKTtcbiAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCByb290SWQrXCItZmxhc2hcIik7XG4gICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCByb290SWQrXCItZmxhc2hcIik7XG4gICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzEwMCUnKTtcbiAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgJzEwMCUnKTtcbiAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnc2NhbGUnLCAnZGVmYXVsdCcpO1xuICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCd3bW9kZScsICdvcGFxdWUnKTtcblxuICAgICAgICBpZihicm93c2VySW5mby5icm93c2VyID09PSBcIk1pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3JlclwiICYmIGJyb3dzZXJJbmZvLmJyb3dzZXJNYWpvclZlcnNpb24gPD0gOSApe1xuICAgICAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnY2xhc3NpZCcsICdjbHNpZDpEMjdDREI2RS1BRTZELTExY2YtOTZCOC00NDQ1NTM1NDAwMDAnKTtcbiAgICAgICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChtb3ZpZSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YScsIFNXRlBhdGgpO1xuICAgICAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgndHlwZScsICdhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmKGlzTG9vcCl7XG4gICAgICAgICAgICB2aWRlb0VsZW1lbnQuYXBwZW5kQ2hpbGQobG9vcCk7XG4gICAgICAgIH1cblxuICAgICAgICB2aWRlb0VsZW1lbnQuYXBwZW5kQ2hpbGQod21vZGUpO1xuICAgICAgICB2aWRlb0VsZW1lbnQuYXBwZW5kQ2hpbGQoYmdjb2xvcik7XG4gICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChxdWFsKTtcbiAgICAgICAgdmlkZW9FbGVtZW50LmFwcGVuZENoaWxkKGFsbG93ZnVsbHNjcmVlbik7XG4gICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChhbGxvd3NjcmlwdGFjY2Vzcyk7XG4gICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChmbGFzaHZhcnMpO1xuICAgICAgICAvL3ZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChtZXNzYWdlKTtcblxuICAgICAgICAkY29udGFpbmVyLmFwcGVuZCh2aWRlb0VsZW1lbnQpO1xuXG4gICAgICAgIHJldHVybiB2aWRlb0VsZW1lbnQ7XG4gICAgfTtcblxuICAgIHRoYXQuY3JlYXRlTWVkaWEgPSAocHJvdmlkZXJOYW1lICwgcGxheWVyQ29uZmlnKSAgPT4ge1xuICAgICAgICBpZih2aWRlb0VsZW1lbnQpe1xuICAgICAgICAgICAgdGhhdC5lbXB0eSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHByb3ZpZGVyTmFtZSA9PT0gUFJPVklERVJfUlRNUCA/IGNyZWF0ZUZsYXNoVmlkZW8ocGxheWVyQ29uZmlnLmlzTG9vcCgpLCBwbGF5ZXJDb25maWcuZ2V0UnRtcEJ1ZmZlclRpbWUoKSwgcGxheWVyQ29uZmlnLmdldFJ0bXBCdWZmZXJUaW1lTWF4KCkpXG4gICAgICAgICAgICA6IGNyZWF0ZUh0bWxWaWRlbyhwbGF5ZXJDb25maWcuaXNMb29wKCkpO1xuICAgIH1cblxuICAgIHRoYXQuY3JlYXRlQWRDb250YWluZXIgPSAoKSA9PiB7XG4gICAgICAgIGxldCBhZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhZENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ292cC1hZHMnKTtcbiAgICAgICAgJGNvbnRhaW5lci5hcHBlbmQoYWRDb250YWluZXIpO1xuXG4gICAgICAgIHJldHVybiBhZENvbnRhaW5lcjtcbiAgICB9O1xuXG5cbiAgICB0aGF0LmVtcHR5ID0gKCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIk1lZGlhTWFuYWdlciByZW1vdmVFbGVtZW50KClcIik7XG4gICAgICAgICRjb250YWluZXIucmVtb3ZlQ2hpbGQodmlkZW9FbGVtZW50KTtcbiAgICAgICAgdmlkZW9FbGVtZW50ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XG4gICAgICAgICRjb250YWluZXIucmVtb3ZlQ2hpbGQoKTtcbiAgICAgICAgJGNvbnRhaW5lciA9IG51bGw7XG4gICAgICAgIHZpZGVvRWxlbWVudCA9IG51bGw7XG4gICAgICAgIHJvb3RJZCA9IG51bGw7XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTWFuYWdlcjtcbiIsImltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XG5pbXBvcnQge2lzUnRtcCwgaXNXZWJSVEMsIGlzRGFzaCB9IGZyb20gXCJ1dGlscy92YWxpZGF0b3JcIjtcbmltcG9ydCB7ZXh0cmFjdEV4dGVuc2lvbiAsdHJpbX0gZnJvbSBcIi4uLy4uL3V0aWxzL3N0cmluZ3NcIjtcbmltcG9ydCBTdXBwb3J0Q2hlY2tlciBmcm9tIFwiLi4vU3VwcG9ydENoZWNrZXJcIjtcbmltcG9ydCB7UExBWUxJU1RfQ0hBTkdFRH0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBUaGlzIG1hbmFnZXMgUGxheWxpc3Qgb3IgU291cmNlcy5cbiAqIEBwYXJhbVxuICpcbiAqICovXG5jb25zdCBNYW5hZ2VyID0gZnVuY3Rpb24ocHJvdmlkZXIpe1xuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICBsZXQgY3VycmVudFBsYXlsaXN0SXRlbSA9IFtdO1xuICAgIGxldCBzcGVjID0ge1xuICAgICAgICBwbGF5bGlzdCA6IFtdLFxuICAgICAgICBjdXJyZW50SW5kZXggOiAwXG4gICAgfTtcbiAgICBsZXQgc3VwcG9ydENoZWNrZXIgPSBTdXBwb3J0Q2hlY2tlcigpO1xuXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIGxvYWRlZC5cIik7XG5cbiAgICBjb25zdCBtYWtlUHJldHR5U291cmNlID0gZnVuY3Rpb24oc291cmNlXyl7XG4gICAgICAgIGlmICghc291cmNlXyB8fCAhc291cmNlXy5maWxlICYmICEoc291cmNlXy5ob3N0IHx8IHNvdXJjZV8uYXBwbGljYXRpb24gfHwgc291cmNlXy5zdHJlYW0pKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc291cmNlID0gT2JqZWN0LmFzc2lnbih7fSwgeyAnZGVmYXVsdCc6IGZhbHNlIH0sIHNvdXJjZV8pO1xuICAgICAgICBzb3VyY2UuZmlsZSA9IHRyaW0oJycgKyBzb3VyY2UuZmlsZSk7XG5cbiAgICAgICAgaWYoc291cmNlLmhvc3QgJiYgc291cmNlLmFwcGxpY2F0aW9uICYmIHNvdXJjZS5zdHJlYW0pe1xuICAgICAgICAgICAgc291cmNlLmZpbGUgPSBzb3VyY2UuaG9zdCArIFwiL1wiICsgc291cmNlLmFwcGxpY2F0aW9uICsgXCIvc3RyZWFtL1wiICsgc291cmNlLnN0cmVhbTtcbiAgICAgICAgICAgIGRlbGV0ZSBzb3VyY2UuaG9zdDtcbiAgICAgICAgICAgIGRlbGV0ZSBzb3VyY2UuYXBwbGljYXRpb247XG4gICAgICAgICAgICBkZWxldGUgc291cmNlLnN0cmVhbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1pbWV0eXBlUmVnRXggPSAvXlteL10rXFwvKD86eC0pPyhbXi9dKykkLztcblxuICAgICAgICBpZiAobWltZXR5cGVSZWdFeC50ZXN0KHNvdXJjZS50eXBlKSkge1xuICAgICAgICAgICAgLy8gaWYgdHlwZSBpcyBnaXZlbiBhcyBhIG1pbWV0eXBlXG4gICAgICAgICAgICBzb3VyY2UubWltZVR5cGUgPSBzb3VyY2UudHlwZTtcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gc291cmNlLnR5cGUucmVwbGFjZShtaW1ldHlwZVJlZ0V4LCAnJDEnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGlzUnRtcChzb3VyY2UuZmlsZSkpe1xuICAgICAgICAgICAgc291cmNlLnR5cGUgPSAncnRtcCc7XG4gICAgICAgIH1lbHNlIGlmKGlzV2ViUlRDKHNvdXJjZS5maWxlKSl7XG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9ICd3ZWJydGMnO1xuICAgICAgICB9ZWxzZSBpZihpc0Rhc2goc291cmNlLmZpbGUsIHNvdXJjZS50eXBlKSl7XG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdkYXNoJztcbiAgICAgICAgfWVsc2UgaWYgKCFzb3VyY2UudHlwZSkge1xuICAgICAgICAgICAgc291cmNlLnR5cGUgPSBleHRyYWN0RXh0ZW5zaW9uKHNvdXJjZS5maWxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc291cmNlLnR5cGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG5vcm1hbGl6ZSB0eXBlc1xuICAgICAgICBzd2l0Y2ggKHNvdXJjZS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdtM3U4JzpcbiAgICAgICAgICAgIGNhc2UgJ3ZuZC5hcHBsZS5tcGVndXJsJzpcbiAgICAgICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdobHMnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbTRhJzpcbiAgICAgICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdhYWMnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnc21pbCc6XG4gICAgICAgICAgICAgICAgc291cmNlLnR5cGUgPSAncnRtcCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgaWYgKHNvdXJjZVtrZXldID09PSAnJykge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBzb3VyY2Vba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNvdXJjZTtcblxuICAgIH1cblxuICAgIHRoYXQuaW5pdFBsYXlsaXN0ID0ocGxheWxpc3QpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQbGF5bGlzdE1hbmFnZXIgc2V0UGxheWxpc3QoKSBcIiwgcGxheWxpc3QpO1xuICAgICAgICBjb25zdCBwcmV0dGllZFBsYXlsaXN0ID0gKF8uaXNBcnJheShwbGF5bGlzdCkgPyBwbGF5bGlzdCA6IFtwbGF5bGlzdF0pLm1hcChmdW5jdGlvbihpdGVtKXtcbiAgICAgICAgICAgIGlmKCFfLmlzQXJyYXkoaXRlbS50cmFja3MpKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGl0ZW0udHJhY2tzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHBsYXlsaXN0SXRlbSA9IE9iamVjdC5hc3NpZ24oe30se1xuICAgICAgICAgICAgICAgIHNvdXJjZXM6IFtdLFxuICAgICAgICAgICAgICAgIHRyYWNrczogW10sXG4gICAgICAgICAgICAgICAgdGl0bGUgOiBcIlwiXG4gICAgICAgICAgICB9LCBpdGVtICk7XG5cbiAgICAgICAgICAgIGlmKChwbGF5bGlzdEl0ZW0uc291cmNlcyA9PT0gT2JqZWN0KHBsYXlsaXN0SXRlbS5zb3VyY2VzKSkgJiYgIV8uaXNBcnJheShwbGF5bGlzdEl0ZW0uc291cmNlcykpIHtcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IFttYWtlUHJldHR5U291cmNlKHBsYXlsaXN0SXRlbS5zb3VyY2VzKV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghXy5pc0FycmF5KHBsYXlsaXN0SXRlbS5zb3VyY2VzKSB8fCBwbGF5bGlzdEl0ZW0uc291cmNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IFttYWtlUHJldHR5U291cmNlKHBsYXlsaXN0SXRlbSldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZighXy5pc0FycmF5KHBsYXlsaXN0SXRlbS5zb3VyY2VzKSB8fCBwbGF5bGlzdEl0ZW0uc291cmNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5sZXZlbHMpIHtcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBpdGVtLmxldmVscztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IFttYWtlUHJldHR5U291cmNlKGl0ZW0pXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHBsYXlsaXN0SXRlbS5zb3VyY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNvdXJjZSA9IHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldO1xuICAgICAgICAgICAgICAgIGxldCBwcmV0dHlTb3VyY2UgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGlmICghc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBkZWZhdWx0U291cmNlID0gc291cmNlLmRlZmF1bHQ7XG4gICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRTb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlLmRlZmF1bHQgPSAoZGVmYXVsdFNvdXJjZS50b1N0cmluZygpID09PSAndHJ1ZScpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZS5kZWZhdWx0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHNvdXJjZSBkb2Vzbid0IGhhdmUgYSBsYWJlbCwgbnVtYmVyIGl0XG4gICAgICAgICAgICAgICAgaWYgKCFwbGF5bGlzdEl0ZW0uc291cmNlc1tpXS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXS5sYWJlbCA9IHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldLnR5cGUrXCItXCIraS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHByZXR0eVNvdXJjZSA9IG1ha2VQcmV0dHlTb3VyY2UocGxheWxpc3RJdGVtLnNvdXJjZXNbaV0pO1xuICAgICAgICAgICAgICAgIGlmKHN1cHBvcnRDaGVja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShwcmV0dHlTb3VyY2UpKXtcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0gPSBwcmV0dHlTb3VyY2U7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gcGxheWxpc3RJdGVtLnNvdXJjZXMuZmlsdGVyKHNvdXJjZSA9PiAhIXNvdXJjZSk7XG5cbiAgICAgICAgICAgIGlmKCFwbGF5bGlzdEl0ZW0udGl0bGUgJiYgIHBsYXlsaXN0SXRlbS5zb3VyY2VzWzBdICYmIHBsYXlsaXN0SXRlbS5zb3VyY2VzWzBdLmxhYmVsKXtcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0udGl0bGUgPSBwbGF5bGlzdEl0ZW0uc291cmNlc1swXS5sYWJlbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZGVmYXVsdCDqsIAg7JeG7J2E65WMIHdlYnJ0Y+qwgCDsnojri6TrqbQgd2VicnRjIGRlZmF1bHQgOiB0cnVl66GcIOyekOuPmSDshKTsoJVcbiAgICAgICAgICAgIC8qbGV0IGhhdmVEZWZhdWx0ID0gXy5maW5kKHBsYXlsaXN0SXRlbS5zb3VyY2VzLCBmdW5jdGlvbihzb3VyY2Upe3JldHVybiBzb3VyY2UuZGVmYXVsdCA9PSB0cnVlO30pO1xuICAgICAgICAgICAgbGV0IHdlYnJ0Y1NvdXJjZSA9IFtdO1xuICAgICAgICAgICAgaWYoIWhhdmVEZWZhdWx0KXtcbiAgICAgICAgICAgICAgICB3ZWJydGNTb3VyY2UgPSBfLmZpbmQocGxheWxpc3RJdGVtLnNvdXJjZXMsIGZ1bmN0aW9uKHNvdXJjZSl7cmV0dXJuIHNvdXJjZS50eXBlID09IFwid2VicnRjXCI7fSk7XG4gICAgICAgICAgICAgICAgaWYod2VicnRjU291cmNlKXtcbiAgICAgICAgICAgICAgICAgICAgd2VicnRjU291cmNlLmRlZmF1bHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0qL1xuXG5cblxuICAgICAgICAgICAgaWYoIV8uaXNBcnJheShwbGF5bGlzdEl0ZW0udHJhY2tzKSl7XG4gICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnRyYWNrcyA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoXy5pc0FycmF5KHBsYXlsaXN0SXRlbS5jYXB0aW9ucykpe1xuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS50cmFja3MgPSBwbGF5bGlzdEl0ZW0udHJhY2tzLmNvbmNhdChwbGF5bGlzdEl0ZW0uY2FwdGlvbnMpO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBwbGF5bGlzdEl0ZW0uY2FwdGlvbnM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBsYXlsaXN0SXRlbS50cmFja3MgPSBwbGF5bGlzdEl0ZW0udHJhY2tzLm1hcChmdW5jdGlvbih0cmFjayl7XG4gICAgICAgICAgICAgICAgaWYoIXRyYWNrIHx8ICF0cmFjay5maWxlKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwge1xuICAgICAgICAgICAgICAgICAgICAna2luZCc6ICdjYXB0aW9ucycsXG4gICAgICAgICAgICAgICAgICAgICdkZWZhdWx0JzogZmFsc2VcbiAgICAgICAgICAgICAgICB9LCB0cmFjayk7XG4gICAgICAgICAgICB9KS5maWx0ZXIodHJhY2sgPT4gISF0cmFjayk7XG5cbiAgICAgICAgICAgIHJldHVybiBwbGF5bGlzdEl0ZW07XG4gICAgICAgIH0pLmZpbHRlcihmdW5jdGlvbihpdGVtKXtyZXR1cm4gaXRlbS5zb3VyY2VzICYmIGl0ZW0uc291cmNlcy5sZW5ndGggPiAwO30pfHxbXTtcbiAgICAgICAgc3BlYy5wbGF5bGlzdCA9IHByZXR0aWVkUGxheWxpc3Q7XG4gICAgICAgIHJldHVybiBwcmV0dGllZFBsYXlsaXN0O1xuICAgIH07XG4gICAgdGhhdC5nZXRQbGF5bGlzdCA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIGdldFBsYXlsaXN0KCkgXCIsIHNwZWMucGxheWxpc3QpO1xuICAgICAgICByZXR1cm4gc3BlYy5wbGF5bGlzdDtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Q3VycmVudFBsYXlMaXN0ID0gKCkgPT4ge1xuICAgICAgICBpZihzcGVjLnBsYXlsaXN0W3NwZWMuY3VycmVudEluZGV4XSl7XG4gICAgICAgICAgICByZXR1cm4gc3BlYy5wbGF5bGlzdFtzcGVjLmN1cnJlbnRJbmRleF07XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LmdldEN1cnJlbnRQbGF5bGlzdEluZGV4ID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50SW5kZXg7XG4gICAgfTtcbiAgICB0aGF0LnNldEN1cnJlbnRQbGF5bGlzdCA9IChpbmRleCkgPT4ge1xuICAgICAgICBpZihzcGVjLnBsYXlsaXN0W2luZGV4XSl7XG4gICAgICAgICAgICBzcGVjLmN1cnJlbnRJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihQTEFZTElTVF9DSEFOR0VELCBzcGVjLmN1cnJlbnRJbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudEluZGV4O1xuICAgIH07XG4gICAgdGhhdC5nZXRDdXJyZW50U291cmNlcyA9ICgpID0+IHtcbiAgICAgICAgLy9XZSBkbyBub3Qgc3VwcG9ydCBcIlBMQVlMSVNUXCIgbm90IHlldC4gU28gdGhpcyByZXR1cm5zIHBsYXlsaXN0IG9mIDAuXG4gICAgICAgIGlmKHNwZWMucGxheWxpc3Rbc3BlYy5jdXJyZW50SW5kZXhdKXtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBnZXRDdXJyZW50U291cmNlcygpIFwiLCBzcGVjLnBsYXlsaXN0W3NwZWMuY3VycmVudEluZGV4XS5zb3VyY2VzKTtcbiAgICAgICAgICAgIHJldHVybiBzcGVjLnBsYXlsaXN0W3NwZWMuY3VycmVudEluZGV4XS5zb3VyY2VzO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICB9O1xuICAgIHRoYXQuZ2V0Q3VycmVudEFkVGFnID0gKCkgPT4ge1xuICAgICAgICBpZihzcGVjLnBsYXlsaXN0W3NwZWMuY3VycmVudEluZGV4XSl7XG4gICAgICAgICAgICByZXR1cm4gc3BlYy5wbGF5bGlzdFtzcGVjLmN1cnJlbnRJbmRleF0uYWRUYWdVcmwgfHwgXCJcIjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgTWFuYWdlcjtcbiIsImltcG9ydCBTdXBwb3J0Q2hlY2tlciBmcm9tIFwiYXBpL1N1cHBvcnRDaGVja2VyXCI7XG5pbXBvcnQge0FwaVJ0bXBFeHBhbnNpb259IGZyb20gJ2FwaS9BcGlFeHBhbnNpb25zJztcbmltcG9ydCB7XG4gICAgUFJPVklERVJfSFRNTDUsIFBST1ZJREVSX1dFQlJUQywgUFJPVklERVJfREFTSCwgUFJPVklERVJfSExTLCBQUk9WSURFUl9SVE1QLFxuICAgIEVSUk9SUywgSU5JVF9VTlNVUFBPUlRfRVJST1Jcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBUaGlzIG1hbmFnZXMgcHJvdmlkZXIuXG4gKiBAcGFyYW1cbiAqICovXG5jb25zdCBDb250cm9sbGVyID0gZnVuY3Rpb24oKXtcbiAgICBsZXQgc3VwcG9ydENoYWNrZXIgPSBTdXBwb3J0Q2hlY2tlcigpO1xuICAgIGNvbnN0IFByb3ZpZGVycyA9IHt9O1xuXG4gICAgY29uc3QgdGhhdCA9IHt9O1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBsb2FkZWQuXCIpO1xuXG4gICAgY29uc3QgcmVnaXN0ZVByb3ZpZGVyID0gKG5hbWUsIHByb3ZpZGVyKSA9PntcbiAgICAgICAgaWYoUHJvdmlkZXJzW25hbWVdKXtcbiAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgIH1cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIF9yZWdpc3RlclByb3ZpZGVyKCkgXCIsIG5hbWUpO1xuICAgICAgICBQcm92aWRlcnNbbmFtZV0gPSBwcm92aWRlcjtcbiAgICB9O1xuXG4gICAgY29uc3QgUHJvdmlkZXJMb2FkZXIgPXtcbiAgICAgICAgaHRtbDU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IdG1sNSddLCBmdW5jdGlvbihyZXF1aXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IdG1sNScpLmRlZmF1bHQ7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVQcm92aWRlcihQUk9WSURFUl9IVE1MNSwgcHJvdmlkZXIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7bmFtZSA6IFBST1ZJREVSX0hUTUw1LCBwcm92aWRlciA6IHByb3ZpZGVyfTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcbiAgICAgICAgICAgICAgICB9LCdvdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1J1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgd2VicnRjIDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvV2ViUlRDJ10sIGZ1bmN0aW9uKHJlcXVpcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvaHRtbDUvcHJvdmlkZXJzL1dlYlJUQycpLmRlZmF1bHQ7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVQcm92aWRlcihQUk9WSURFUl9XRUJSVEMsIHByb3ZpZGVyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge25hbWUgOiBQUk9WSURFUl9XRUJSVEMsIHByb3ZpZGVyIDogcHJvdmlkZXJ9O1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xuICAgICAgICAgICAgICAgIH0sJ292ZW5wbGF5ZXIucHJvdmlkZXIuV2ViUlRDUHJvdmlkZXInXG4gICAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICBkYXNoIDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvRGFzaCddLCBmdW5jdGlvbihyZXF1aXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9EYXNoJykuZGVmYXVsdDtcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFBST1ZJREVSX0RBU0gsIHByb3ZpZGVyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge25hbWUgOiBQUk9WSURFUl9EQVNILCBwcm92aWRlciA6IHByb3ZpZGVyfTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcbiAgICAgICAgICAgICAgICB9LCdvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcidcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIGhscyA6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvaHRtbDUvcHJvdmlkZXJzL0hscyddLCBmdW5jdGlvbihyZXF1aXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IbHMnKS5kZWZhdWx0O1xuICAgICAgICAgICAgICAgICAgICByZWdpc3RlUHJvdmlkZXIoUFJPVklERVJfSExTLCBwcm92aWRlcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtuYW1lIDogUFJPVklERVJfSExTLCBwcm92aWRlciA6IHByb3ZpZGVyfTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcbiAgICAgICAgICAgICAgICB9LCdvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgcnRtcCA6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvZmxhc2gvcHJvdmlkZXJzL1J0bXAnXSwgZnVuY3Rpb24ocmVxdWlyZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci9mbGFzaC9wcm92aWRlcnMvUnRtcCcpLmRlZmF1bHQ7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVQcm92aWRlcihQUk9WSURFUl9SVE1QLCBwcm92aWRlcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7bmFtZSA6IFBST1ZJREVSX1JUTVAsIHByb3ZpZGVyIDogcHJvdmlkZXJ9O1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xuICAgICAgICAgICAgICAgIH0sJ292ZW5wbGF5ZXIucHJvdmlkZXIuUnRtcFByb3ZpZGVyJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIHRoYXQubG9hZFByb3ZpZGVycyA9IChwbGF5bGlzdEl0ZW0pID0+e1xuICAgICAgICBjb25zdCBzdXBwb3J0ZWRQcm92aWRlck5hbWVzID0gc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0KHBsYXlsaXN0SXRlbSk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBsb2FkUHJvdmlkZXJzKCkgXCIsIHN1cHBvcnRlZFByb3ZpZGVyTmFtZXMpO1xuICAgICAgICBpZighc3VwcG9ydGVkUHJvdmlkZXJOYW1lcyl7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRVJST1JTW0lOSVRfVU5TVVBQT1JUX0VSUk9SXSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFxuICAgICAgICAgICAgICAgIHN1cHBvcnRlZFByb3ZpZGVyTmFtZXMuZmlsdGVyKGZ1bmN0aW9uKHByb3ZpZGVyTmFtZSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhIVByb3ZpZGVyTG9hZGVyW3Byb3ZpZGVyTmFtZV07XG4gICAgICAgICAgICAgICAgfSkubWFwKGZ1bmN0aW9uKHByb3ZpZGVyTmFtZSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm92aWRlckxvYWRlcltwcm92aWRlck5hbWVdKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICB0aGF0LmZpbmRCeU5hbWUgPSAobmFtZSkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgZmluZEJ5TmFtZSgpIFwiLCBuYW1lKTtcbiAgICAgICAgcmV0dXJuIFByb3ZpZGVyc1tuYW1lXTtcbiAgICB9O1xuXG4gICAgdGhhdC5nZXRQcm92aWRlckJ5U291cmNlID0gKHNvdXJjZSkgPT4ge1xuICAgICAgICBjb25zdCBzdXBwb3J0ZWRQcm92aWRlck5hbWUgPSBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2Uoc291cmNlKTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGdldFByb3ZpZGVyQnlTb3VyY2UoKSBcIiwgc3VwcG9ydGVkUHJvdmlkZXJOYW1lKTtcbiAgICAgICAgcmV0dXJuIHRoYXQuZmluZEJ5TmFtZShzdXBwb3J0ZWRQcm92aWRlck5hbWUpO1xuICAgIH07XG5cbiAgICB0aGF0LmlzU2FtZVByb3ZpZGVyID0gKGN1cnJlbnRTb3VyY2UsIG5ld1NvdXJjZSkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgaXNTYW1lUHJvdmlkZXIoKSBcIiwgc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKGN1cnJlbnRTb3VyY2UpICwgc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKG5ld1NvdXJjZSkgKTtcbiAgICAgICAgcmV0dXJuIHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShjdXJyZW50U291cmNlKSA9PT0gc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKG5ld1NvdXJjZSk7XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29udHJvbGxlcjtcbiIsImltcG9ydCBBUEkgZnJvbSAnYXBpL0FwaSc7XG5pbXBvcnQge2lzV2ViUlRDfSBmcm9tICd1dGlscy92YWxpZGF0b3InO1xuaW1wb3J0IF8gZnJvbSAndXRpbHMvdW5kZXJzY29yZSc7XG5pbXBvcnQgTGEkIGZyb20gJ3V0aWxzL2xpa2VBJCc7XG5pbXBvcnQge2dldFNjcmlwdFBhdGh9IGZyb20gJ3V0aWxzL3dlYnBhY2snO1xuXG5cbl9fd2VicGFja19wdWJsaWNfcGF0aF9fID0gZ2V0U2NyaXB0UGF0aCgnb3ZlbnBsYXllci5zZGsuanMnKTtcblxuLyoqXG4gKiBNYWluIE92ZW5QbGF5ZXJTREsgb2JqZWN0XG4gKi9cbmNvbnN0IE92ZW5QbGF5ZXJTREsgPSB3aW5kb3cuT3ZlblBsYXllclNESyA9IHt9O1xuXG5jb25zdCBwbGF5ZXJMaXN0ID0gT3ZlblBsYXllclNESy5wbGF5ZXJMaXN0ID0gW107XG5cbmV4cG9ydCBjb25zdCBjaGVja0FuZEdldENvbnRhaW5lckVsZW1lbnQgPSBmdW5jdGlvbihjb250YWluZXIpIHtcbiAgICBpZiAoIWNvbnRhaW5lcikge1xuXG4gICAgICAgIC8vIFRPRE8ocm9jayk6IFNob3VsZCBjYXVzZSBhbiBlcnJvci5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgbGV0IGNvbnRhaW5lckVsZW1lbnQgPSBudWxsO1xuXG4gICAgaWYgKHR5cGVvZiBjb250YWluZXIgPT09ICdzdHJpbmcnKSB7XG5cbiAgICAgICAgY29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvbnRhaW5lcik7XG4gICAgfSBlbHNlIGlmIChjb250YWluZXIubm9kZVR5cGUpIHtcblxuICAgICAgICBjb250YWluZXJFbGVtZW50ID0gY29udGFpbmVyO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFRPRE8ocm9jayk6IFNob3VsZCBjYXVzZSBhbiBlcnJvci5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnRhaW5lckVsZW1lbnQ7XG59XG5cbi8qKlxuICogQ3JlYXRlIHBsYXllciBpbnN0YW5jZSBhbmQgcmV0dXJuIGl0LlxuICpcbiAqIEBwYXJhbSAgICAgIHtzdHJpbmcgfCBkb20gZWxlbWVudH0gY29udGFpbmVyICBJZCBvZiBjb250YWluZXIgZWxlbWVudCBvciBjb250YWluZXIgZWxlbWVudFxuICogQHBhcmFtICAgICAge29iamVjdH0gb3B0aW9ucyAgVGhlIG9wdGlvbnNcbiAqL1xuT3ZlblBsYXllclNESy5jcmVhdGUgPSBmdW5jdGlvbihjb250YWluZXIsIG9wdGlvbnMpIHtcblxuICAgIGxldCBjb250YWluZXJFbGVtZW50ID0gY2hlY2tBbmRHZXRDb250YWluZXJFbGVtZW50KGNvbnRhaW5lcik7XG5cbiAgICBjb25zdCBwbGF5ZXJJbnN0YW5jZSA9IEFQSShjb250YWluZXJFbGVtZW50KTtcbiAgICBwbGF5ZXJJbnN0YW5jZS5pbml0KG9wdGlvbnMpO1xuXG4gICAgcGxheWVyTGlzdC5wdXNoKHBsYXllckluc3RhbmNlKTtcblxuICAgIHJldHVybiBwbGF5ZXJJbnN0YW5jZTtcbn07XG5cbi8qKlxuICogR2V0cyB0aGUgcGxheWVyIGluc3RhbmNlIGxpc3QuXG4gKlxuICogQHJldHVybiAgICAge2FycmF5fSAgVGhlIHBsYXllciBsaXN0LlxuICovXG5PdmVuUGxheWVyU0RLLmdldFBsYXllckxpc3QgPSBmdW5jdGlvbigpIHtcblxuICAgIHJldHVybiBwbGF5ZXJMaXN0O1xufTtcblxuLyoqXG4gKiBHZXRzIHRoZSBwbGF5ZXIgaW5zdGFuY2UgYnkgY29udGFpbmVyIGlkLlxuICpcbiAqIEBwYXJhbSAgICAgIHtzdHJpbmd9ICBjb250YWluZXJJZCAgVGhlIGNvbnRhaW5lciBpZGVudGlmaWVyXG4gKiBAcmV0dXJuICAgICB7b2JlamVjdCB8IG51bGx9ICBUaGUgcGxheWVyIGluc3RhbmNlLlxuICovXG5PdmVuUGxheWVyU0RLLmdldFBsYXllckJ5Q29udGFpbmVySWQgPSBmdW5jdGlvbihjb250YWluZXJJZCkge1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5ZXJMaXN0Lmxlbmd0aDsgaSArKykge1xuXG4gICAgICAgIGlmIChwbGF5ZXJMaXN0W2ldLmdldENvbnRhaW5lcklkKCkgPT09IGNvbnRhaW5lcklkKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBwbGF5ZXJMaXN0W2ldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG59O1xuXG4vKipcbiAqIEdldHMgdGhlIHBsYXllciBpbnN0YW5jZSBieSBpbmRleC5cbiAqXG4gKiBAcGFyYW0gICAgICB7bnVtYmVyfSAgaW5kZXggICBUaGUgaW5kZXhcbiAqIEByZXR1cm4gICAgIHtvYmplY3QgfCBudWxsfSAgVGhlIHBsYXllciBpbnN0YW5jZS5cbiAqL1xuT3ZlblBsYXllclNESy5nZXRQbGF5ZXJCeUluZGV4ID0gZnVuY3Rpb24oaW5kZXgpIHtcblxuICAgIGNvbnN0IHBsYXllckluc3RhbmNlID0gcGxheWVyTGlzdFtpbmRleF07XG5cbiAgICBpZiAocGxheWVySW5zdGFuY2UpIHtcblxuICAgICAgICByZXR1cm4gcGxheWVySW5zdGFuY2U7XG4gICAgfSBlbHNlIHtcblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59O1xuXG4vKipcbiAqIFJlbW92ZSB0aGUgcGxheWVyIGluc3RhbmNlIGJ5IHBsYXllcklkLlxuICpcbiAqIEBwYXJhbSAgICAgIHtwbGF5ZXJJZH0gIGlkXG4gKiBAcmV0dXJuICAgICB7bnVsbH1cbiAqL1xuT3ZlblBsYXllclNESy5yZW1vdmVQbGF5ZXIgPSBmdW5jdGlvbihwbGF5ZXJJZCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxheWVyTGlzdC5sZW5ndGg7IGkgKyspIHtcblxuICAgICAgICBpZiAocGxheWVyTGlzdFtpXS5nZXRDb250YWluZXJJZCgpID09PSBwbGF5ZXJJZCkge1xuXG4gICAgICAgICAgICBwbGF5ZXJMaXN0LnNwbGljZShpLCAxKTtcbiAgICAgICAgfVxuICAgIH1cblxufTtcblxuLyoqXG4gKiBHZW5lcmF0ZSB3ZWJydGMgc291cmNlIGZvciBwbGF5ZXIgc291cmNlIHR5cGUuXG4gKlxuICogQHBhcmFtICAgICAge09iamVjdCB8IEFycmF5fSAgc291cmNlICAgd2VicnRjIHNvdXJjZVxuICogQHJldHVybiAgICAge0FycmF5fSAgUGxheWVyIHNvdXJjZSBPYmplY3QuXG4gKi9cbk92ZW5QbGF5ZXJTREsuZ2VuZXJhdGVXZWJydGNVcmxzID0gZnVuY3Rpb24oc291cmNlcykge1xuICAgIHJldHVybiAoXy5pc0FycmF5KHNvdXJjZXMpID8gc291cmNlcyA6IFtzb3VyY2VzXSkubWFwKGZ1bmN0aW9uKHNvdXJjZSwgaW5kZXgpe1xuICAgICAgICBpZihzb3VyY2UuaG9zdCAmJiBpc1dlYlJUQyhzb3VyY2UuaG9zdCkgJiYgc291cmNlLmFwcGxpY2F0aW9uICYmIHNvdXJjZS5zdHJlYW0pe1xuICAgICAgICAgICAgcmV0dXJuIHtmaWxlIDogc291cmNlLmhvc3QgKyBcIi9cIiArIHNvdXJjZS5hcHBsaWNhdGlvbiArIFwiL1wiICsgc291cmNlLnN0cmVhbSwgdHlwZSA6IFwid2VicnRjXCIsIGxhYmVsIDogc291cmNlLmxhYmVsID8gc291cmNlLmxhYmVsIDogXCJ3ZWJydGMtXCIrKGluZGV4KzEpIH07XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbi8qKlxuICogV2hldGhlciBzaG93IHRoZSBwbGF5ZXIgY29yZSBsb2cgb3Igbm90LlxuICpcbiAqIEBwYXJhbSAgICAgIHtib29sZWFufSAgYm9vbGVhbiAgIHJ1biBkZWJ1ZyBtb2RlIG9yIG5vdC5cbiAqIEByZXR1cm4gICAgIHtib29sZWFufSAgcnVuIGRlYnVnIG1vZGUgb3Igbm90LlxuICovXG5PdmVuUGxheWVyU0RLLmRlYnVnID0gZnVuY3Rpb24oaXNEZWJ1Z01vZGUpIHtcbiAgICBpZihpc0RlYnVnTW9kZSl7XG4gICAgICAgIHdpbmRvdy5PdmVuUGxheWVyQ29uc29sZSA9IHtsb2cgOiB3aW5kb3dbJ2NvbnNvbGUnXVsnbG9nJ119O1xuICAgIH1lbHNle1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZVsnbG9nJ10gPSBmdW5jdGlvbigpe307XG4gICAgfVxuICAgIHJldHVybiBpc0RlYnVnTW9kZTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE92ZW5QbGF5ZXJTREs7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyNC4uXG4gKi9cblxuZXhwb3J0IGNvbnN0IGdldEJyb3dzZXJMYW5ndWFnZSA9IGZ1bmN0aW9uKCl7XG4gICAgbGV0IG5hdiA9IHdpbmRvdy5uYXZpZ2F0b3IsXG4gICAgICAgIGJyb3dzZXJMYW5ndWFnZVByb3BlcnR5S2V5cyA9IFsnbGFuZ3VhZ2UnLCAnYnJvd3Nlckxhbmd1YWdlJywgJ3N5c3RlbUxhbmd1YWdlJywgJ3VzZXJMYW5ndWFnZSddLFxuICAgICAgICBpLFxuICAgICAgICBsYW5ndWFnZTtcblxuICAgIC8vIHN1cHBvcnQgZm9yIEhUTUwgNS4xIFwibmF2aWdhdG9yLmxhbmd1YWdlc1wiXG4gICAgaWYgKEFycmF5LmlzQXJyYXkobmF2Lmxhbmd1YWdlcykpIHtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IG5hdi5sYW5ndWFnZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxhbmd1YWdlID0gbmF2Lmxhbmd1YWdlc1tpXTtcbiAgICAgICAgICAgIGlmIChsYW5ndWFnZSAmJiBsYW5ndWFnZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGFuZ3VhZ2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzdXBwb3J0IGZvciBvdGhlciB3ZWxsIGtub3duIHByb3BlcnRpZXMgaW4gYnJvd3NlcnNcbiAgICBmb3IgKGkgPSAwOyBpIDwgYnJvd3Nlckxhbmd1YWdlUHJvcGVydHlLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxhbmd1YWdlID0gbmF2W2Jyb3dzZXJMYW5ndWFnZVByb3BlcnR5S2V5c1tpXV07XG4gICAgICAgIGlmIChsYW5ndWFnZSAmJiBsYW5ndWFnZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBsYW5ndWFnZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xufTtcbmV4cG9ydCBjb25zdCBhbmFsVXNlckFnZW50ID0gZnVuY3Rpb24oKXtcbiAgICBsZXQgdW5rbm93biA9ICctJztcblxuICAgIC8vIHNjcmVlblxuICAgIGxldCBzY3JlZW5TaXplID0gJyc7XG4gICAgaWYgKHNjcmVlbi53aWR0aCkge1xuICAgICAgICBsZXQgd2lkdGggPSAoc2NyZWVuLndpZHRoKSA/IHNjcmVlbi53aWR0aCA6ICcnO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gKHNjcmVlbi5oZWlnaHQpID8gc2NyZWVuLmhlaWdodCA6ICcnO1xuICAgICAgICBzY3JlZW5TaXplICs9ICcnICsgd2lkdGggKyBcIiB4IFwiICsgaGVpZ2h0O1xuICAgIH1cblxuICAgIC8vIGJyb3dzZXJcbiAgICBsZXQgblZlciA9IG5hdmlnYXRvci5hcHBWZXJzaW9uO1xuICAgIGxldCBuQWd0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgICBsZXQgYnJvd3NlciA9IG5hdmlnYXRvci5hcHBOYW1lO1xuICAgIGxldCB2ZXJzaW9uID0gJycgKyBwYXJzZUZsb2F0KG5hdmlnYXRvci5hcHBWZXJzaW9uKTtcbiAgICBsZXQgbWFqb3JWZXJzaW9uID0gcGFyc2VJbnQobmF2aWdhdG9yLmFwcFZlcnNpb24sIDEwKTtcbiAgICBsZXQgaXNXZWJ2aWV3ID0gZmFsc2U7XG4gICAgbGV0IG5hbWVPZmZzZXQsIHZlck9mZnNldCwgaXg7XG5cbiAgICAvLyBPcGVyYVxuICAgIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdPcGVyYScpKSAhPSAtMSkge1xuICAgICAgICBicm93c2VyID0gJ09wZXJhJztcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDYpO1xuICAgICAgICBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignVmVyc2lvbicpKSAhPSAtMSkge1xuICAgICAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIE9wZXJhIE5leHRcbiAgICBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignT1BSJykpICE9IC0xKSB7XG4gICAgICAgIGJyb3dzZXIgPSAnT3BlcmEnO1xuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNCk7XG4gICAgfVxuICAgIC8v7IK87ISxIOu4jOudvOyasOyggFxuICAgIGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ1NhbXN1bmdCcm93c2VyJykpICE9IC0xKSB7XG4gICAgICAgIGJyb3dzZXIgPSAnU2Ftc3VuZ0Jyb3dzZXInO1xuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgMTUpO1xuICAgIH1cbiAgICAvLyBFZGdlXG4gICAgZWxzZSBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignRWRnZScpKSAhPSAtMSkge1xuICAgICAgICBicm93c2VyID0gJ01pY3Jvc29mdCBFZGdlJztcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDUpO1xuICAgIH1cbiAgICAvLyBNU0lFXG4gICAgZWxzZSBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignTVNJRScpKSAhPSAtMSkge1xuICAgICAgICBicm93c2VyID0gJ01pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3Jlcic7XG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA1KTtcblxuXG4gICAgICAgIC8vd2luNyBJRTExIHVzZXJBZ2VudCBpcyB1Z2x5Li4uLlxuICAgICAgICBpZiggKG5BZ3QuaW5kZXhPZignVHJpZGVudC8nKSAhPT0gLTEpICYmIChuQWd0LmluZGV4T2YoJ3J2OicpICE9PSAtMSkgICl7XG4gICAgICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcobkFndC5pbmRleE9mKCdydjonKSArIDMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIENocm9tZVxuICAgIGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ0Nocm9tZScpKSAhPSAtMSkge1xuICAgICAgICBicm93c2VyID0gJ0Nocm9tZSc7XG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA3KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignQ3JpT1MnKSkgIT0gLTEpIHsgICAvL2lwaG9uZSAtIGNocm9tZVxuICAgICAgICBicm93c2VyID0gJ0Nocm9tZSc7XG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA2KTtcbiAgICB9XG4gICAgLy8gRmlyZWZveFxuICAgIGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ0ZpcmVmb3gnKSkgIT0gLTEpIHtcbiAgICAgICAgYnJvd3NlciA9ICdGaXJlZm94JztcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDgpO1xuICAgIH1cbiAgICBlbHNlIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdGeGlPUycpKSAhPSAtMSkge1xuICAgICAgICBicm93c2VyID0gJ0ZpcmVmb3gnO1xuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNik7XG4gICAgfVxuICAgIC8vIFNhZmFyaVxuICAgIGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ1NhZmFyaScpKSAhPSAtMSkge1xuICAgICAgICBicm93c2VyID0gJ1NhZmFyaSc7XG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA3KTtcbiAgICAgICAgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ1ZlcnNpb24nKSkgIT0gLTEpIHtcbiAgICAgICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA4KTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8gTVNJRSAxMStcbiAgICBlbHNlIGlmIChuQWd0LmluZGV4T2YoJ1RyaWRlbnQvJykgIT09IC0xKSB7XG4gICAgICAgIGJyb3dzZXIgPSAnTWljcm9zb2Z0IEludGVybmV0IEV4cGxvcmVyJztcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKG5BZ3QuaW5kZXhPZigncnY6JykgKyAzKTtcbiAgICB9XG4gICAgLy8gT3RoZXIgYnJvd3NlcnNcbiAgICBlbHNlIGlmICgobmFtZU9mZnNldCA9IG5BZ3QubGFzdEluZGV4T2YoJyAnKSArIDEpIDwgKHZlck9mZnNldCA9IG5BZ3QubGFzdEluZGV4T2YoJy8nKSkpIHtcbiAgICAgICAgYnJvd3NlciA9IG5BZ3Quc3Vic3RyaW5nKG5hbWVPZmZzZXQsIHZlck9mZnNldCk7XG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyAxKTtcbiAgICAgICAgaWYgKGJyb3dzZXIudG9Mb3dlckNhc2UoKSA9PSBicm93c2VyLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgICAgICAgIGJyb3dzZXIgPSBuYXZpZ2F0b3IuYXBwTmFtZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZihuQWd0LmluZGV4T2YoJyB3dicpID4gMCl7XG4gICAgICAgIGlzV2VidmlldyA9IHRydWU7XG4gICAgfVxuICAgIC8vIHRyaW0gdGhlIHZlcnNpb24gc3RyaW5nXG4gICAgaWYgKChpeCA9IHZlcnNpb24uaW5kZXhPZignOycpKSAhPSAtMSkgdmVyc2lvbiA9IHZlcnNpb24uc3Vic3RyaW5nKDAsIGl4KTtcbiAgICBpZiAoKGl4ID0gdmVyc2lvbi5pbmRleE9mKCcgJykpICE9IC0xKSB2ZXJzaW9uID0gdmVyc2lvbi5zdWJzdHJpbmcoMCwgaXgpO1xuICAgIGlmICgoaXggPSB2ZXJzaW9uLmluZGV4T2YoJyknKSkgIT0gLTEpIHZlcnNpb24gPSB2ZXJzaW9uLnN1YnN0cmluZygwLCBpeCk7XG5cbiAgICBtYWpvclZlcnNpb24gPSBwYXJzZUludCgnJyArIHZlcnNpb24sIDEwKTtcbiAgICBpZiAoaXNOYU4obWFqb3JWZXJzaW9uKSkge1xuICAgICAgICB2ZXJzaW9uID0gJycgKyBwYXJzZUZsb2F0KG5hdmlnYXRvci5hcHBWZXJzaW9uKTtcbiAgICAgICAgbWFqb3JWZXJzaW9uID0gcGFyc2VJbnQobmF2aWdhdG9yLmFwcFZlcnNpb24sIDEwKTtcbiAgICB9XG5cbiAgICAvLyBtb2JpbGUgdmVyc2lvblxuICAgIHZhciBtb2JpbGUgPSAvTW9iaWxlfG1pbml8RmVubmVjfEFuZHJvaWR8aVAoYWR8b2R8aG9uZSkvLnRlc3QoblZlcik7XG5cbiAgICAvLyBjb29raWVcbiAgICB2YXIgY29va2llRW5hYmxlZCA9IChuYXZpZ2F0b3IuY29va2llRW5hYmxlZCkgPyB0cnVlIDogZmFsc2U7XG5cbiAgICBpZiAodHlwZW9mIG5hdmlnYXRvci5jb29raWVFbmFibGVkID09ICd1bmRlZmluZWQnICYmICFjb29raWVFbmFibGVkKSB7XG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9ICd0ZXN0Y29va2llJztcbiAgICAgICAgY29va2llRW5hYmxlZCA9IChkb2N1bWVudC5jb29raWUuaW5kZXhPZigndGVzdGNvb2tpZScpICE9IC0xKSA/IHRydWUgOiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBzeXN0ZW1cbiAgICB2YXIgb3MgPSB1bmtub3duO1xuICAgIHZhciBjbGllbnRTdHJpbmdzID0gW1xuICAgICAgICB7czonV2luZG93cyAxMCcsIHI6LyhXaW5kb3dzIDEwLjB8V2luZG93cyBOVCAxMC4wKS99LFxuICAgICAgICB7czonV2luZG93cyA4LjEnLCByOi8oV2luZG93cyA4LjF8V2luZG93cyBOVCA2LjMpL30sXG4gICAgICAgIHtzOidXaW5kb3dzIDgnLCByOi8oV2luZG93cyA4fFdpbmRvd3MgTlQgNi4yKS99LFxuICAgICAgICB7czonV2luZG93cyA3JywgcjovKFdpbmRvd3MgN3xXaW5kb3dzIE5UIDYuMSkvfSxcbiAgICAgICAge3M6J1dpbmRvd3MgVmlzdGEnLCByOi9XaW5kb3dzIE5UIDYuMC99LFxuICAgICAgICB7czonV2luZG93cyBTZXJ2ZXIgMjAwMycsIHI6L1dpbmRvd3MgTlQgNS4yL30sXG4gICAgICAgIHtzOidXaW5kb3dzIFhQJywgcjovKFdpbmRvd3MgTlQgNS4xfFdpbmRvd3MgWFApL30sXG4gICAgICAgIHtzOidXaW5kb3dzIDIwMDAnLCByOi8oV2luZG93cyBOVCA1LjB8V2luZG93cyAyMDAwKS99LFxuICAgICAgICB7czonV2luZG93cyBNRScsIHI6LyhXaW4gOXggNC45MHxXaW5kb3dzIE1FKS99LFxuICAgICAgICB7czonV2luZG93cyA5OCcsIHI6LyhXaW5kb3dzIDk4fFdpbjk4KS99LFxuICAgICAgICB7czonV2luZG93cyA5NScsIHI6LyhXaW5kb3dzIDk1fFdpbjk1fFdpbmRvd3NfOTUpL30sXG4gICAgICAgIHtzOidXaW5kb3dzIE5UIDQuMCcsIHI6LyhXaW5kb3dzIE5UIDQuMHxXaW5OVDQuMHxXaW5OVHxXaW5kb3dzIE5UKS99LFxuICAgICAgICB7czonV2luZG93cyBDRScsIHI6L1dpbmRvd3MgQ0UvfSxcbiAgICAgICAge3M6J1dpbmRvd3MgMy4xMScsIHI6L1dpbjE2L30sXG4gICAgICAgIHtzOidBbmRyb2lkJywgcjovQW5kcm9pZC99LFxuICAgICAgICB7czonT3BlbiBCU0QnLCByOi9PcGVuQlNEL30sXG4gICAgICAgIHtzOidTdW4gT1MnLCByOi9TdW5PUy99LFxuICAgICAgICB7czonTGludXgnLCByOi8oTGludXh8WDExKS99LFxuICAgICAgICB7czonaU9TJywgcjovKGlQaG9uZXxpUGFkfGlQb2QpL30sXG4gICAgICAgIHtzOidNYWMgT1MgWCcsIHI6L01hYyBPUyBYL30sXG4gICAgICAgIHtzOidNYWMgT1MnLCByOi8oTWFjUFBDfE1hY0ludGVsfE1hY19Qb3dlclBDfE1hY2ludG9zaCkvfSxcbiAgICAgICAge3M6J1FOWCcsIHI6L1FOWC99LFxuICAgICAgICB7czonVU5JWCcsIHI6L1VOSVgvfSxcbiAgICAgICAge3M6J0JlT1MnLCByOi9CZU9TL30sXG4gICAgICAgIHtzOidPUy8yJywgcjovT1NcXC8yL30sXG4gICAgICAgIHtzOidTZWFyY2ggQm90JywgcjovKG51aGt8R29vZ2xlYm90fFlhbW15Ym90fE9wZW5ib3R8U2x1cnB8TVNOQm90fEFzayBKZWV2ZXNcXC9UZW9tYXxpYV9hcmNoaXZlcikvfVxuICAgIF07XG4gICAgZm9yICh2YXIgaWQgaW4gY2xpZW50U3RyaW5ncykge1xuICAgICAgICB2YXIgY3MgPSBjbGllbnRTdHJpbmdzW2lkXTtcbiAgICAgICAgaWYgKGNzLnIudGVzdChuQWd0KSkge1xuICAgICAgICAgICAgb3MgPSBjcy5zO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgb3NWZXJzaW9uID0gdW5rbm93bjtcblxuICAgIGlmICgvV2luZG93cy8udGVzdChvcykpIHtcbiAgICAgICAgb3NWZXJzaW9uID0gL1dpbmRvd3MgKC4qKS8uZXhlYyhvcylbMV07XG4gICAgICAgIG9zID0gJ1dpbmRvd3MnO1xuICAgIH1cblxuICAgIHN3aXRjaCAob3MpIHtcbiAgICAgICAgY2FzZSAnTWFjIE9TIFgnOlxuICAgICAgICAgICAgb3NWZXJzaW9uID0gL01hYyBPUyBYICgxMFtcXC5cXF9cXGRdKykvLmV4ZWMobkFndClbMV07XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBbmRyb2lkJzpcbiAgICAgICAgICAgIG9zVmVyc2lvbiA9IC9BbmRyb2lkIChbXFwuXFxfXFxkXSspLy5leGVjKG5BZ3QpWzFdO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnaU9TJzpcbiAgICAgICAgICAgIG9zVmVyc2lvbiA9IC9PUyAoXFxkKylfKFxcZCspXz8oXFxkKyk/Ly5leGVjKG5WZXIpO1xuICAgICAgICAgICAgb3NWZXJzaW9uID0gb3NWZXJzaW9uWzFdICsgJy4nICsgb3NWZXJzaW9uWzJdICsgJy4nICsgKG9zVmVyc2lvblszXSB8IDApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgLy8gZmxhc2ggKHlvdSdsbCBuZWVkIHRvIGluY2x1ZGUgc3dmb2JqZWN0KVxuICAgIC8qIHNjcmlwdCBzcmM9XCIvL2FqYXguZ29vZ2xlYXBpcy5jb20vYWpheC9saWJzL3N3Zm9iamVjdC8yLjIvc3dmb2JqZWN0LmpzXCIgKi9cbiAgICB2YXIgZmxhc2hWZXJzaW9uID0gJ25vIGNoZWNrJztcbiAgICBpZiAodHlwZW9mIHN3Zm9iamVjdCAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgZnYgPSBzd2ZvYmplY3QuZ2V0Rmxhc2hQbGF5ZXJWZXJzaW9uKCk7XG4gICAgICAgIGlmIChmdi5tYWpvciA+IDApIHtcbiAgICAgICAgICAgIGZsYXNoVmVyc2lvbiA9IGZ2Lm1ham9yICsgJy4nICsgZnYubWlub3IgKyAnIHInICsgZnYucmVsZWFzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlICB7XG4gICAgICAgICAgICBmbGFzaFZlcnNpb24gPSB1bmtub3duO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHNjcmVlbjogc2NyZWVuU2l6ZSxcbiAgICAgICAgYnJvd3NlcjogYnJvd3NlcixcbiAgICAgICAgYnJvd3NlclZlcnNpb246IHZlcnNpb24sXG4gICAgICAgIGJyb3dzZXJNYWpvclZlcnNpb246IG1ham9yVmVyc2lvbixcbiAgICAgICAgbW9iaWxlOiBtb2JpbGUsXG4gICAgICAgIHVhIDogbkFndCxcbiAgICAgICAgb3M6IG9zLFxuICAgICAgICBvc1ZlcnNpb246IG9zVmVyc2lvbixcbiAgICAgICAgY29va2llczogY29va2llRW5hYmxlZCxcbiAgICAgICAgZmxhc2hWZXJzaW9uOiBmbGFzaFZlcnNpb24sXG4gICAgICAgIHdlYnZpZXcgOiBpc1dlYnZpZXdcbiAgICB9O1xufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMgdnR0LmpzIENvbnRyaWJ1dG9yc1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cbmxldCBWVFRDdWUgPSB3aW5kb3cuVlRUQ3VlO1xuXG52YXIgYXV0b0tleXdvcmQgPSBcImF1dG9cIjtcbnZhciBkaXJlY3Rpb25TZXR0aW5nID0ge1xuICAgIFwiXCI6IHRydWUsXG4gICAgXCJsclwiOiB0cnVlLFxuICAgIFwicmxcIjogdHJ1ZVxufTtcbnZhciBhbGlnblNldHRpbmcgPSB7XG4gICAgXCJzdGFydFwiOiB0cnVlLFxuICAgIFwibWlkZGxlXCI6IHRydWUsXG4gICAgXCJlbmRcIjogdHJ1ZSxcbiAgICBcImxlZnRcIjogdHJ1ZSxcbiAgICBcInJpZ2h0XCI6IHRydWVcbn07XG5cbmZ1bmN0aW9uIGZpbmREaXJlY3Rpb25TZXR0aW5nKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciBkaXIgPSBkaXJlY3Rpb25TZXR0aW5nW3ZhbHVlLnRvTG93ZXJDYXNlKCldO1xuICAgIHJldHVybiBkaXIgPyB2YWx1ZS50b0xvd2VyQ2FzZSgpIDogZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGZpbmRBbGlnblNldHRpbmcodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIGFsaWduID0gYWxpZ25TZXR0aW5nW3ZhbHVlLnRvTG93ZXJDYXNlKCldO1xuICAgIHJldHVybiBhbGlnbiA/IHZhbHVlLnRvTG93ZXJDYXNlKCkgOiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZXh0ZW5kKG9iaikge1xuICAgIHZhciBpID0gMTtcbiAgICBmb3IgKDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY29iaiA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgZm9yICh2YXIgcCBpbiBjb2JqKSB7XG4gICAgICAgICAgICBvYmpbcF0gPSBjb2JqW3BdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbn1cbmlmKCFWVFRDdWUpe1xuICAgIFZUVEN1ZSA9IGZ1bmN0aW9uIChzdGFydFRpbWUsIGVuZFRpbWUsIHRleHQpIHtcbiAgICAgICAgdmFyIGN1ZSA9IHRoaXM7XG4gICAgICAgIHZhciBpc0lFOCA9ICgvTVNJRVxcczhcXC4wLykudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICAgICAgdmFyIGJhc2VPYmogPSB7fTtcblxuICAgICAgICBpZiAoaXNJRTgpIHtcbiAgICAgICAgICAgIGN1ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2N1c3RvbScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYmFzZU9iai5lbnVtZXJhYmxlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTaGltIGltcGxlbWVudGF0aW9uIHNwZWNpZmljIHByb3BlcnRpZXMuIFRoZXNlIHByb3BlcnRpZXMgYXJlIG5vdCBpblxuICAgICAgICAgKiB0aGUgc3BlYy5cbiAgICAgICAgICovXG5cbiAgICAgICAgICAgIC8vIExldHMgdXMga25vdyB3aGVuIHRoZSBWVFRDdWUncyBkYXRhIGhhcyBjaGFuZ2VkIGluIHN1Y2ggYSB3YXkgdGhhdCB3ZSBuZWVkXG4gICAgICAgICAgICAvLyB0byByZWNvbXB1dGUgaXRzIGRpc3BsYXkgc3RhdGUuIFRoaXMgbGV0cyB1cyBjb21wdXRlIGl0cyBkaXNwbGF5IHN0YXRlXG4gICAgICAgICAgICAvLyBsYXppbHkuXG4gICAgICAgIGN1ZS5oYXNCZWVuUmVzZXQgPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVlRUQ3VlIGFuZCBUZXh0VHJhY2tDdWUgcHJvcGVydGllc1xuICAgICAgICAgKiBodHRwOi8vZGV2LnczLm9yZy9odG1sNS93ZWJ2dHQvI3Z0dGN1ZS1pbnRlcmZhY2VcbiAgICAgICAgICovXG5cbiAgICAgICAgdmFyIF9pZCA9IFwiXCI7XG4gICAgICAgIHZhciBfcGF1c2VPbkV4aXQgPSBmYWxzZTtcbiAgICAgICAgdmFyIF9zdGFydFRpbWUgPSBzdGFydFRpbWU7XG4gICAgICAgIHZhciBfZW5kVGltZSA9IGVuZFRpbWU7XG4gICAgICAgIHZhciBfdGV4dCA9IHRleHQ7XG4gICAgICAgIHZhciBfcmVnaW9uID0gbnVsbDtcbiAgICAgICAgdmFyIF92ZXJ0aWNhbCA9IFwiXCI7XG4gICAgICAgIHZhciBfc25hcFRvTGluZXMgPSB0cnVlO1xuICAgICAgICB2YXIgX2xpbmUgPSBcImF1dG9cIjtcbiAgICAgICAgdmFyIF9saW5lQWxpZ24gPSBcInN0YXJ0XCI7XG4gICAgICAgIHZhciBfcG9zaXRpb24gPSA1MDtcbiAgICAgICAgdmFyIF9wb3NpdGlvbkFsaWduID0gXCJtaWRkbGVcIjtcbiAgICAgICAgdmFyIF9zaXplID0gNTA7XG4gICAgICAgIHZhciBfYWxpZ24gPSBcIm1pZGRsZVwiO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXG4gICAgICAgICAgICBcImlkXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfaWQ7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIF9pZCA9IFwiXCIgKyB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcbiAgICAgICAgICAgIFwicGF1c2VPbkV4aXRcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9wYXVzZU9uRXhpdDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgX3BhdXNlT25FeGl0ID0gISF2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcbiAgICAgICAgICAgIFwic3RhcnRUaW1lXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfc3RhcnRUaW1lO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3RhcnQgdGltZSBtdXN0IGJlIHNldCB0byBhIG51bWJlci5cIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgX3N0YXJ0VGltZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXG4gICAgICAgICAgICBcImVuZFRpbWVcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9lbmRUaW1lO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRW5kIHRpbWUgbXVzdCBiZSBzZXQgdG8gYSBudW1iZXIuXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF9lbmRUaW1lID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcbiAgICAgICAgICAgIFwidGV4dFwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RleHQ7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIF90ZXh0ID0gXCJcIiArIHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXG4gICAgICAgICAgICBcInJlZ2lvblwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZ2lvbjtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgX3JlZ2lvbiA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXG4gICAgICAgICAgICBcInZlcnRpY2FsXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdmVydGljYWw7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzZXR0aW5nID0gZmluZERpcmVjdGlvblNldHRpbmcodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAvLyBIYXZlIHRvIGNoZWNrIGZvciBmYWxzZSBiZWNhdXNlIHRoZSBzZXR0aW5nIGFuIGJlIGFuIGVtcHR5IHN0cmluZy5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHNldHRpbmcgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJBbiBpbnZhbGlkIG9yIGlsbGVnYWwgc3RyaW5nIHdhcyBzcGVjaWZpZWQuXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF92ZXJ0aWNhbCA9IHNldHRpbmc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcbiAgICAgICAgICAgIFwic25hcFRvTGluZXNcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9zbmFwVG9MaW5lcztcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgX3NuYXBUb0xpbmVzID0gISF2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxuICAgICAgICAgICAgXCJsaW5lXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfbGluZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJudW1iZXJcIiAmJiB2YWx1ZSAhPT0gYXV0b0tleXdvcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihcIkFuIGludmFsaWQgbnVtYmVyIG9yIGlsbGVnYWwgc3RyaW5nIHdhcyBzcGVjaWZpZWQuXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF9saW5lID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcbiAgICAgICAgICAgIFwibGluZUFsaWduXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfbGluZUFsaWduO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2V0dGluZyA9IGZpbmRBbGlnblNldHRpbmcodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXNldHRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihcIkFuIGludmFsaWQgb3IgaWxsZWdhbCBzdHJpbmcgd2FzIHNwZWNpZmllZC5cIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgX2xpbmVBbGlnbiA9IHNldHRpbmc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcbiAgICAgICAgICAgIFwicG9zaXRpb25cIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9wb3NpdGlvbjtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlIDwgMCB8fCB2YWx1ZSA+IDEwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUG9zaXRpb24gbXVzdCBiZSBiZXR3ZWVuIDAgYW5kIDEwMC5cIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgX3Bvc2l0aW9uID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcbiAgICAgICAgICAgIFwicG9zaXRpb25BbGlnblwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3Bvc2l0aW9uQWxpZ247XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzZXR0aW5nID0gZmluZEFsaWduU2V0dGluZyh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghc2V0dGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKFwiQW4gaW52YWxpZCBvciBpbGxlZ2FsIHN0cmluZyB3YXMgc3BlY2lmaWVkLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfcG9zaXRpb25BbGlnbiA9IHNldHRpbmc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcbiAgICAgICAgICAgIFwic2l6ZVwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3NpemU7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA8IDAgfHwgdmFsdWUgPiAxMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlNpemUgbXVzdCBiZSBiZXR3ZWVuIDAgYW5kIDEwMC5cIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgX3NpemUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxuICAgICAgICAgICAgXCJhbGlnblwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2FsaWduO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2V0dGluZyA9IGZpbmRBbGlnblNldHRpbmcodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXNldHRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihcIkFuIGludmFsaWQgb3IgaWxsZWdhbCBzdHJpbmcgd2FzIHNwZWNpZmllZC5cIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgX2FsaWduID0gc2V0dGluZztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogT3RoZXIgPHRyYWNrPiBzcGVjIGRlZmluZWQgcHJvcGVydGllc1xuICAgICAgICAgKi9cblxuICAgICAgICAgICAgLy8gaHR0cDovL3d3dy53aGF0d2cub3JnL3NwZWNzL3dlYi1hcHBzL2N1cnJlbnQtd29yay9tdWx0aXBhZ2UvdGhlLXZpZGVvLWVsZW1lbnQuaHRtbCN0ZXh0LXRyYWNrLWN1ZS1kaXNwbGF5LXN0YXRlXG4gICAgICAgIGN1ZS5kaXNwbGF5U3RhdGUgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgaWYgKGlzSUU4KSB7XG4gICAgICAgICAgICByZXR1cm4gY3VlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVlRUQ3VlIG1ldGhvZHNcbiAgICAgKi9cblxuICAgIFZUVEN1ZS5wcm90b3R5cGUuZ2V0Q3VlQXNIVE1MID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIEFzc3VtZSBXZWJWVFQuY29udmVydEN1ZVRvRE9NVHJlZSBpcyBvbiB0aGUgZ2xvYmFsLlxuICAgICAgICByZXR1cm4gV2ViVlRULmNvbnZlcnRDdWVUb0RPTVRyZWUod2luZG93LCB0aGlzLnRleHQpO1xuICAgIH07XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFZUVEN1ZTsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAyMy4uXG4gKi9cbmltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XG5cbi8qKlxuICogQGJyaWVmICAgSXQgd2FzIHJlcGxhY2UganF1ZXJ5J3Mgc2VsZWN0b3IuIEl0IE9mdGVuIHVzZWQgYnkgT3ZlblRlbXBsYXRlLiAoL3ZpZXcvZW5naW5lL092ZW5UZW1wbGF0ZS5qcylcbiAqIEBwYXJhbSAgIHNlbGVjdG9yT3JFbGVtZW50ICBzdHJpbmcgb3IgZWxlbWVudFxuICpcbiAqICovXG5cblxuY29uc3QgTGEkID0gZnVuY3Rpb24oc2VsZWN0b3JPckVsZW1lbnQpe1xuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICBjb25zdCByZXR1cm5Ob2RlID0gZnVuY3Rpb24oJGVsZW1lbnQgLCBzZWxlY3Rvcil7XG4gICAgICAgIGxldCBub2RlTGlzdCA9ICAkZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICAgICAgaWYobm9kZUxpc3QubGVuZ3RoID4gMSl7XG4gICAgICAgICAgICByZXR1cm4gbm9kZUxpc3Q7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIG5vZGVMaXN0WzBdO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgbGV0ICRlbGVtZW50ID0gXCJcIjtcblxuICAgIGlmKCBfLmlzRWxlbWVudChzZWxlY3Rvck9yRWxlbWVudCkgfHwgXy5ldmVyeShzZWxlY3Rvck9yRWxlbWVudCwgZnVuY3Rpb24oaXRlbSl7cmV0dXJuIF8uaXNFbGVtZW50KGl0ZW0pfSkpe1xuICAgICAgICAkZWxlbWVudCA9IHNlbGVjdG9yT3JFbGVtZW50O1xuICAgIH1lbHNlIGlmKHNlbGVjdG9yT3JFbGVtZW50ID09PSBcImRvY3VtZW50XCIpe1xuICAgICAgICAkZWxlbWVudCA9IGRvY3VtZW50O1xuICAgIH1lbHNlIGlmKHNlbGVjdG9yT3JFbGVtZW50ID09PSBcIndpbmRvd1wiKXtcbiAgICAgICAgJGVsZW1lbnQgPSB3aW5kb3c7XG4gICAgfWVsc2V7XG4gICAgICAgICRlbGVtZW50ID0gcmV0dXJuTm9kZShkb2N1bWVudCwgc2VsZWN0b3JPckVsZW1lbnQpO1xuICAgIH1cblxuXG4gICAgaWYoISRlbGVtZW50KXtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdGhhdC5maW5kID0gKHNlbGVjdG9yKSA9PntcbiAgICAgICAgcmV0dXJuIExhJChyZXR1cm5Ob2RlKCRlbGVtZW50LCBzZWxlY3RvcikpO1xuICAgIH07XG5cbiAgICB0aGF0LmNzcyA9IChuYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgICBpZigkZWxlbWVudC5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICRlbGVtZW50LmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCl7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZVtuYW1lXSA9IHZhbHVlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAkZWxlbWVudC5zdHlsZVtuYW1lXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoYXQuYWRkQ2xhc3MgPSAobmFtZSkgPT57XG4gICAgICAgIGlmKCRlbGVtZW50LmNsYXNzTGlzdCl7XG4gICAgICAgICAgICAkZWxlbWVudC5jbGFzc0xpc3QuYWRkKG5hbWUpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGxldCBjbGFzc05hbWVzID0gJGVsZW1lbnQuY2xhc3NOYW1lLnNwbGl0KFwiIFwiKTtcbiAgICAgICAgICAgIGlmKGNsYXNzTmFtZXMuaW5kZXhPZihuYW1lKSA9PT0gLTEpe1xuICAgICAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTmFtZSArPSBcIiBcIiArIG5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICB0aGF0LnJlbW92ZUNsYXNzID0gKG5hbWUpID0+e1xuICAgICAgICBpZiAoJGVsZW1lbnQuY2xhc3NMaXN0KXtcbiAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUobmFtZSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgJGVsZW1lbnQuY2xhc3NOYW1lID0gJGVsZW1lbnQuY2xhc3NOYW1lLnJlcGxhY2UobmV3IFJlZ0V4cCgnKF58XFxcXGIpJyArIG5hbWUuc3BsaXQoJyAnKS5qb2luKCd8JykgKyAnKFxcXFxifCQpJywgJ2dpJyksICcgJyk7XG5cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0LnJlbW92ZUF0dHJpYnV0ZSA9IChhdHRyTmFtZSkgPT4ge1xuICAgICAgICAkZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0ck5hbWUpO1xuICAgIH07XG5cbiAgICB0aGF0LnNob3cgPSAoKSA9PntcbiAgICAgICAgJGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfTtcblxuICAgIHRoYXQuaGlkZSA9ICgpID0+e1xuICAgICAgICAkZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH07XG5cbiAgICAvKnRoYXQuYXBwZW5kID0gKGh0bWxDb2RlKSA9PntcbiAgICAgICAgJGVsZW1lbnQuaW5uZXJIVE1MICs9IGh0bWxDb2RlO1xuICAgIH07Ki9cblxuICAgIHRoYXQudGV4dCA9ICh0ZXh0KSA9PiB7IC8vSUU4K1xuICAgICAgICBpZih0ZXh0ID09PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgcmV0dXJuICRlbGVtZW50LnRleHRDb250ZW50O1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICRlbGVtZW50LnRleHRDb250ZW50ID0gdGV4dDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhhdC5odG1sID0gKHRleHQpID0+IHtcbiAgICAgICAgJGVsZW1lbnQuaW5uZXJIVE1MID0gdGV4dDtcbiAgICB9O1xuICAgIHRoYXQuaGFzQ2xhc3MgPSAobmFtZSkgPT4geyAvL0lFOCtcbiAgICAgICAgaWYoJGVsZW1lbnQuY2xhc3NMaXN0KXtcbiAgICAgICAgICAgIHJldHVybiAkZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMobmFtZSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoJyhefCApJyArIG5hbWUgKyAnKCB8JCknLCAnZ2knKS50ZXN0KCRlbGVtZW50Lm5hbWUpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoYXQuaXMgPSAoJHRhcmdldEVsZW1lbnQpID0+IHtcbiAgICAgICAgcmV0dXJuICRlbGVtZW50ID09PSAkdGFyZ2V0RWxlbWVudDtcbiAgICB9O1xuXG4gICAgdGhhdC5vZmZzZXQgPSAoKSA9PnsgICAgLy9JRTgrXG4gICAgICAgIHZhciByZWN0ID0gJGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvcDogcmVjdC50b3AgKyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCxcbiAgICAgICAgICAgIGxlZnQ6IHJlY3QubGVmdCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdFxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoYXQud2lkdGggPSAoKSA9PiB7ICAgIC8vSUU4K1xuICAgICAgICByZXR1cm4gJGVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgfTtcblxuICAgIHRoYXQuaGVpZ2h0ID0gKCkgPT4geyAgIC8vSUU4K1xuICAgICAgICByZXR1cm4gJGVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgIH07XG5cbiAgICB0aGF0LmF0dHIgPSAoYXR0cikgPT4ge1xuICAgICAgICByZXR1cm4gJGVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHIpO1xuICAgIH07XG5cbiAgICB0aGF0LnJlcGxhY2UgPSAoaHRtbCkgPT4ge1xuICAgICAgICAkZWxlbWVudC5yZXBsYWNlV2l0aChodG1sKTtcbiAgICB9O1xuXG4gICAgdGhhdC5hcHBlbmQgPSAoaHRtbCkgPT4ge1xuICAgICAgICAkZWxlbWVudC5hcHBlbmRDaGlsZChodG1sKTtcbiAgICB9O1xuXG4gICAgdGhhdC5yZW1vdmUgPSAoKSA9PiB7XG4gICAgICAgIGlmKCRlbGVtZW50Lmxlbmd0aCA+IDEpe1xuICAgICAgICAgICAgJGVsZW1lbnQucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZCgkZWxlbWVudCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICB0aGF0LnJlbW92ZUNoaWxkID0gKGVsZW1lbnQpID0+IHtcbiAgICAgICAgaWYoZWxlbWVudCl7XG4gICAgICAgICAgICAkZWxlbWVudC5yZW1vdmVDaGlsZChlbGVtZW50KTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB3aGlsZSAoJGVsZW1lbnQuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlQ2hpbGQoJGVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICB0aGF0LmdldCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuICRlbGVtZW50O1xuICAgIH07XG5cbiAgICB0aGF0LmNsb3Nlc3QgPSAoc2VsZWN0b3JTdHJpbmcpID0+IHtcbiAgICAgICAgbGV0IGNsb3Nlc3RFbGVtZW50ID0gJGVsZW1lbnQuY2xvc2VzdChzZWxlY3RvclN0cmluZyk7XG4gICAgICAgIGlmKGNsb3Nlc3RFbGVtZW50KXtcbiAgICAgICAgICAgIHJldHVybiBMYSQoY2xvc2VzdEVsZW1lbnQpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTGEkO1xuIiwiaW1wb3J0IF8gZnJvbSAnLi91bmRlcnNjb3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIHRyaW0oc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZyA/IHN0cmluZy5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJykgOiBcIlwiO1xufVxuXG4vKipcbiAqIGV4dHJhY3RFeHRlbnNpb25cbiAqXG4gKiBAcGFyYW0gICAgICB7c3RyaW5nfSBwYXRoIGZvciB1cmxcbiAqIEByZXR1cm4gICAgIHtzdHJpbmd9ICBFeHRlbnNpb25cbiAqL1xuZXhwb3J0IGNvbnN0IGV4dHJhY3RFeHRlbnNpb24gPSBmdW5jdGlvbihwYXRoKSB7XG4gICAgaWYoIXBhdGggfHwgcGF0aC5zdWJzdHIoMCw0KT09J3J0bXAnKSB7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRBenVyZUZpbGVGb3JtYXQocGF0aCkge1xuICAgICAgICBsZXQgZXh0ZW5zaW9uID0gXCJcIjtcbiAgICAgICAgaWYgKCgvWygsXWZvcm1hdD1tcGQtL2kpLnRlc3QocGF0aCkpIHtcbiAgICAgICAgICAgIGV4dGVuc2lvbiA9ICdtcGQnO1xuICAgICAgICB9ZWxzZSBpZiAoKC9bKCxdZm9ybWF0PW0zdTgtL2kpLnRlc3QocGF0aCkpIHtcbiAgICAgICAgICAgIGV4dGVuc2lvbiA9ICdtM3U4JztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXh0ZW5zaW9uO1xuICAgIH1cblxuICAgIGxldCBhenVyZWRGb3JtYXQgPSBnZXRBenVyZUZpbGVGb3JtYXQocGF0aCk7XG4gICAgaWYoYXp1cmVkRm9ybWF0KSB7XG4gICAgICAgIHJldHVybiBhenVyZWRGb3JtYXQ7XG4gICAgfVxuICAgIHBhdGggPSBwYXRoLnNwbGl0KCc/JylbMF0uc3BsaXQoJyMnKVswXTtcbiAgICBpZihwYXRoLmxhc3RJbmRleE9mKCcuJykgPiAtMSkge1xuICAgICAgICByZXR1cm4gcGF0aC5zdWJzdHIocGF0aC5sYXN0SW5kZXhPZignLicpICsgMSwgcGF0aC5sZW5ndGgpLnRvTG93ZXJDYXNlKCk7XG4gICAgfWVsc2V7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cbn07XG5cblxuLyoqXG4gKiBuYXR1cmFsSG1zXG4gKlxuICogQHBhcmFtICAgICAge251bWJlciB8IHN0cmluZ30gIHNlY29uZCAgVGhlIHNlY29uZFxuICogQHJldHVybiAgICAge3N0cmluZ30gIGZvcm1hdHRlZCBTdHJpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5hdHVyYWxIbXMoc2Vjb25kKSB7XG4gICAgbGV0IHNlY051bSA9IHBhcnNlSW50KHNlY29uZCwgMTApO1xuICAgIGlmKCFzZWNvbmQpe1xuICAgICAgICByZXR1cm4gXCIwMDowMFwiO1xuICAgIH1cbiAgICBsZXQgaG91cnMgICA9IE1hdGguZmxvb3Ioc2VjTnVtIC8gMzYwMCk7XG4gICAgbGV0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKChzZWNOdW0gLSAoaG91cnMgKiAzNjAwKSkgLyA2MCk7XG4gICAgbGV0IHNlY29uZHMgPSBzZWNOdW0gLSAoaG91cnMgKiAzNjAwKSAtIChtaW51dGVzICogNjApO1xuXG4gICAgLy9pZiAoaG91cnMgPiAwKSB7bWludXRlcyA9IFwiMFwiK21pbnV0ZXM7fVxuICAgIGlmIChtaW51dGVzIDwgMTApIHttaW51dGVzID0gXCIwXCIrbWludXRlczt9XG4gICAgaWYgKHNlY29uZHMgPCAxMCkge3NlY29uZHMgPSBcIjBcIitzZWNvbmRzO31cblxuICAgIGlmIChob3VycyA+IDApIHtcbiAgICAgICAgcmV0dXJuIGhvdXJzKyc6JyttaW51dGVzKyc6JytzZWNvbmRzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBtaW51dGVzKyc6JytzZWNvbmRzO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gaG1zVG9TZWNvbmQoc3RyLCBmcmFtZVJhdGUpIHtcbiAgICBpZighc3RyKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBpZihfLmlzTnVtYmVyKHN0cikgJiYgIV8uaXNOYU4oc3RyKSl7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuICAgIHN0ciA9IHN0ci5yZXBsYWNlKCcsJywgJy4nKTtcbiAgICBsZXQgYXJyID0gc3RyLnNwbGl0KCc6Jyk7XG4gICAgbGV0IGFyckxlbmd0aCA9IGFyci5sZW5ndGg7XG4gICAgbGV0IHNlYyA9IDA7XG4gICAgaWYgKHN0ci5zbGljZSgtMSkgPT09ICdzJyl7XG4gICAgICAgIHNlYyA9IHBhcnNlRmxvYXQoc3RyKTtcbiAgICB9ZWxzZSBpZiAoc3RyLnNsaWNlKC0xKSA9PT0gJ20nKXtcbiAgICAgICAgc2VjID0gcGFyc2VGbG9hdChzdHIpICogNjA7XG4gICAgfWVsc2UgaWYgKHN0ci5zbGljZSgtMSkgPT09ICdoJyl7XG4gICAgICAgIHNlYyA9IHBhcnNlRmxvYXQoc3RyKSAqIDM2MDA7XG4gICAgfWVsc2UgaWYgKGFyckxlbmd0aCA+IDEpIHtcbiAgICAgICAgdmFyIHNlY0luZGV4ID0gYXJyTGVuZ3RoIC0gMTtcbiAgICAgICAgaWYgKGFyckxlbmd0aCA9PT0gNCkge1xuICAgICAgICAgICAgaWYgKGZyYW1lUmF0ZSkge1xuICAgICAgICAgICAgICAgIHNlYyA9IHBhcnNlRmxvYXQoYXJyW3NlY0luZGV4XSkgLyBmcmFtZVJhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWNJbmRleCAtPSAxO1xuICAgICAgICB9XG4gICAgICAgIHNlYyArPSBwYXJzZUZsb2F0KGFycltzZWNJbmRleF0pO1xuICAgICAgICBzZWMgKz0gcGFyc2VGbG9hdChhcnJbc2VjSW5kZXggLSAxXSkgKiA2MDtcbiAgICAgICAgaWYgKGFyckxlbmd0aCA+PSAzKSB7XG4gICAgICAgICAgICBzZWMgKz0gcGFyc2VGbG9hdChhcnJbc2VjSW5kZXggLSAyXSkgKiAzNjAwO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc2VjID0gcGFyc2VGbG9hdChzdHIpO1xuICAgIH1cbiAgICBpZiAoXy5pc05hTihzZWMpKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICByZXR1cm4gc2VjO1xufSIsIi8vICAgICBVbmRlcnNjb3JlLmpzIDEuOS4xXG4vLyAgICAgaHR0cDovL3VuZGVyc2NvcmVqcy5vcmdcbi8vICAgICAoYykgMjAwOS0yMDE4IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4vLyAgICAgVW5kZXJzY29yZSBtYXkgYmUgZnJlZWx5IGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiFmdW5jdGlvbigpe3ZhciBuPVwib2JqZWN0XCI9PXR5cGVvZiBzZWxmJiZzZWxmLnNlbGY9PT1zZWxmJiZzZWxmfHxcIm9iamVjdFwiPT10eXBlb2YgZ2xvYmFsJiZnbG9iYWwuZ2xvYmFsPT09Z2xvYmFsJiZnbG9iYWx8fHRoaXN8fHt9LHI9bi5fLGU9QXJyYXkucHJvdG90eXBlLG89T2JqZWN0LnByb3RvdHlwZSxzPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBTeW1ib2w/U3ltYm9sLnByb3RvdHlwZTpudWxsLHU9ZS5wdXNoLGM9ZS5zbGljZSxwPW8udG9TdHJpbmcsaT1vLmhhc093blByb3BlcnR5LHQ9QXJyYXkuaXNBcnJheSxhPU9iamVjdC5rZXlzLGw9T2JqZWN0LmNyZWF0ZSxmPWZ1bmN0aW9uKCl7fSxoPWZ1bmN0aW9uKG4pe3JldHVybiBuIGluc3RhbmNlb2YgaD9uOnRoaXMgaW5zdGFuY2VvZiBoP3ZvaWQodGhpcy5fd3JhcHBlZD1uKTpuZXcgaChuKX07XCJ1bmRlZmluZWRcIj09dHlwZW9mIGV4cG9ydHN8fGV4cG9ydHMubm9kZVR5cGU/bi5fPWg6KFwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGUmJiFtb2R1bGUubm9kZVR5cGUmJm1vZHVsZS5leHBvcnRzJiYoZXhwb3J0cz1tb2R1bGUuZXhwb3J0cz1oKSxleHBvcnRzLl89aCksaC5WRVJTSU9OPVwiMS45LjFcIjt2YXIgdix5PWZ1bmN0aW9uKHUsaSxuKXtpZih2b2lkIDA9PT1pKXJldHVybiB1O3N3aXRjaChudWxsPT1uPzM6bil7Y2FzZSAxOnJldHVybiBmdW5jdGlvbihuKXtyZXR1cm4gdS5jYWxsKGksbil9O2Nhc2UgMzpyZXR1cm4gZnVuY3Rpb24obixyLHQpe3JldHVybiB1LmNhbGwoaSxuLHIsdCl9O2Nhc2UgNDpyZXR1cm4gZnVuY3Rpb24obixyLHQsZSl7cmV0dXJuIHUuY2FsbChpLG4scix0LGUpfX1yZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gdS5hcHBseShpLGFyZ3VtZW50cyl9fSxkPWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gaC5pdGVyYXRlZSE9PXY/aC5pdGVyYXRlZShuLHIpOm51bGw9PW4/aC5pZGVudGl0eTpoLmlzRnVuY3Rpb24obik/eShuLHIsdCk6aC5pc09iamVjdChuKSYmIWguaXNBcnJheShuKT9oLm1hdGNoZXIobik6aC5wcm9wZXJ0eShuKX07aC5pdGVyYXRlZT12PWZ1bmN0aW9uKG4scil7cmV0dXJuIGQobixyLDEvMCl9O3ZhciBnPWZ1bmN0aW9uKHUsaSl7cmV0dXJuIGk9bnVsbD09aT91Lmxlbmd0aC0xOitpLGZ1bmN0aW9uKCl7Zm9yKHZhciBuPU1hdGgubWF4KGFyZ3VtZW50cy5sZW5ndGgtaSwwKSxyPUFycmF5KG4pLHQ9MDt0PG47dCsrKXJbdF09YXJndW1lbnRzW3QraV07c3dpdGNoKGkpe2Nhc2UgMDpyZXR1cm4gdS5jYWxsKHRoaXMscik7Y2FzZSAxOnJldHVybiB1LmNhbGwodGhpcyxhcmd1bWVudHNbMF0scik7Y2FzZSAyOnJldHVybiB1LmNhbGwodGhpcyxhcmd1bWVudHNbMF0sYXJndW1lbnRzWzFdLHIpfXZhciBlPUFycmF5KGkrMSk7Zm9yKHQ9MDt0PGk7dCsrKWVbdF09YXJndW1lbnRzW3RdO3JldHVybiBlW2ldPXIsdS5hcHBseSh0aGlzLGUpfX0sbT1mdW5jdGlvbihuKXtpZighaC5pc09iamVjdChuKSlyZXR1cm57fTtpZihsKXJldHVybiBsKG4pO2YucHJvdG90eXBlPW47dmFyIHI9bmV3IGY7cmV0dXJuIGYucHJvdG90eXBlPW51bGwscn0sYj1mdW5jdGlvbihyKXtyZXR1cm4gZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PW4/dm9pZCAwOm5bcl19fSxqPWZ1bmN0aW9uKG4scil7cmV0dXJuIG51bGwhPW4mJmkuY2FsbChuLHIpfSx4PWZ1bmN0aW9uKG4scil7Zm9yKHZhciB0PXIubGVuZ3RoLGU9MDtlPHQ7ZSsrKXtpZihudWxsPT1uKXJldHVybjtuPW5bcltlXV19cmV0dXJuIHQ/bjp2b2lkIDB9LF89TWF0aC5wb3coMiw1MyktMSxBPWIoXCJsZW5ndGhcIiksdz1mdW5jdGlvbihuKXt2YXIgcj1BKG4pO3JldHVyblwibnVtYmVyXCI9PXR5cGVvZiByJiYwPD1yJiZyPD1ffTtoLmVhY2g9aC5mb3JFYWNoPWZ1bmN0aW9uKG4scix0KXt2YXIgZSx1O2lmKHI9eShyLHQpLHcobikpZm9yKGU9MCx1PW4ubGVuZ3RoO2U8dTtlKyspcihuW2VdLGUsbik7ZWxzZXt2YXIgaT1oLmtleXMobik7Zm9yKGU9MCx1PWkubGVuZ3RoO2U8dTtlKyspcihuW2lbZV1dLGlbZV0sbil9cmV0dXJuIG59LGgubWFwPWguY29sbGVjdD1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPSF3KG4pJiZoLmtleXMobiksdT0oZXx8bikubGVuZ3RoLGk9QXJyYXkodSksbz0wO288dTtvKyspe3ZhciBhPWU/ZVtvXTpvO2lbb109cihuW2FdLGEsbil9cmV0dXJuIGl9O3ZhciBPPWZ1bmN0aW9uKGMpe3JldHVybiBmdW5jdGlvbihuLHIsdCxlKXt2YXIgdT0zPD1hcmd1bWVudHMubGVuZ3RoO3JldHVybiBmdW5jdGlvbihuLHIsdCxlKXt2YXIgdT0hdyhuKSYmaC5rZXlzKG4pLGk9KHV8fG4pLmxlbmd0aCxvPTA8Yz8wOmktMTtmb3IoZXx8KHQ9blt1P3Vbb106b10sbys9Yyk7MDw9byYmbzxpO28rPWMpe3ZhciBhPXU/dVtvXTpvO3Q9cih0LG5bYV0sYSxuKX1yZXR1cm4gdH0obix5KHIsZSw0KSx0LHUpfX07aC5yZWR1Y2U9aC5mb2xkbD1oLmluamVjdD1PKDEpLGgucmVkdWNlUmlnaHQ9aC5mb2xkcj1PKC0xKSxoLmZpbmQ9aC5kZXRlY3Q9ZnVuY3Rpb24obixyLHQpe3ZhciBlPSh3KG4pP2guZmluZEluZGV4OmguZmluZEtleSkobixyLHQpO2lmKHZvaWQgMCE9PWUmJi0xIT09ZSlyZXR1cm4gbltlXX0saC5maWx0ZXI9aC5zZWxlY3Q9ZnVuY3Rpb24obixlLHIpe3ZhciB1PVtdO3JldHVybiBlPWQoZSxyKSxoLmVhY2gobixmdW5jdGlvbihuLHIsdCl7ZShuLHIsdCkmJnUucHVzaChuKX0pLHV9LGgucmVqZWN0PWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gaC5maWx0ZXIobixoLm5lZ2F0ZShkKHIpKSx0KX0saC5ldmVyeT1oLmFsbD1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPSF3KG4pJiZoLmtleXMobiksdT0oZXx8bikubGVuZ3RoLGk9MDtpPHU7aSsrKXt2YXIgbz1lP2VbaV06aTtpZighcihuW29dLG8sbikpcmV0dXJuITF9cmV0dXJuITB9LGguc29tZT1oLmFueT1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPSF3KG4pJiZoLmtleXMobiksdT0oZXx8bikubGVuZ3RoLGk9MDtpPHU7aSsrKXt2YXIgbz1lP2VbaV06aTtpZihyKG5bb10sbyxuKSlyZXR1cm4hMH1yZXR1cm4hMX0saC5jb250YWlucz1oLmluY2x1ZGVzPWguaW5jbHVkZT1mdW5jdGlvbihuLHIsdCxlKXtyZXR1cm4gdyhuKXx8KG49aC52YWx1ZXMobikpLChcIm51bWJlclwiIT10eXBlb2YgdHx8ZSkmJih0PTApLDA8PWguaW5kZXhPZihuLHIsdCl9LGguaW52b2tlPWcoZnVuY3Rpb24obix0LGUpe3ZhciB1LGk7cmV0dXJuIGguaXNGdW5jdGlvbih0KT9pPXQ6aC5pc0FycmF5KHQpJiYodT10LnNsaWNlKDAsLTEpLHQ9dFt0Lmxlbmd0aC0xXSksaC5tYXAobixmdW5jdGlvbihuKXt2YXIgcj1pO2lmKCFyKXtpZih1JiZ1Lmxlbmd0aCYmKG49eChuLHUpKSxudWxsPT1uKXJldHVybjtyPW5bdF19cmV0dXJuIG51bGw9PXI/cjpyLmFwcGx5KG4sZSl9KX0pLGgucGx1Y2s9ZnVuY3Rpb24obixyKXtyZXR1cm4gaC5tYXAobixoLnByb3BlcnR5KHIpKX0saC53aGVyZT1mdW5jdGlvbihuLHIpe3JldHVybiBoLmZpbHRlcihuLGgubWF0Y2hlcihyKSl9LGguZmluZFdoZXJlPWZ1bmN0aW9uKG4scil7cmV0dXJuIGguZmluZChuLGgubWF0Y2hlcihyKSl9LGgubWF4PWZ1bmN0aW9uKG4sZSxyKXt2YXIgdCx1LGk9LTEvMCxvPS0xLzA7aWYobnVsbD09ZXx8XCJudW1iZXJcIj09dHlwZW9mIGUmJlwib2JqZWN0XCIhPXR5cGVvZiBuWzBdJiZudWxsIT1uKWZvcih2YXIgYT0wLGM9KG49dyhuKT9uOmgudmFsdWVzKG4pKS5sZW5ndGg7YTxjO2ErKyludWxsIT0odD1uW2FdKSYmaTx0JiYoaT10KTtlbHNlIGU9ZChlLHIpLGguZWFjaChuLGZ1bmN0aW9uKG4scix0KXt1PWUobixyLHQpLChvPHV8fHU9PT0tMS8wJiZpPT09LTEvMCkmJihpPW4sbz11KX0pO3JldHVybiBpfSxoLm1pbj1mdW5jdGlvbihuLGUscil7dmFyIHQsdSxpPTEvMCxvPTEvMDtpZihudWxsPT1lfHxcIm51bWJlclwiPT10eXBlb2YgZSYmXCJvYmplY3RcIiE9dHlwZW9mIG5bMF0mJm51bGwhPW4pZm9yKHZhciBhPTAsYz0obj13KG4pP246aC52YWx1ZXMobikpLmxlbmd0aDthPGM7YSsrKW51bGwhPSh0PW5bYV0pJiZ0PGkmJihpPXQpO2Vsc2UgZT1kKGUsciksaC5lYWNoKG4sZnVuY3Rpb24obixyLHQpeygodT1lKG4scix0KSk8b3x8dT09PTEvMCYmaT09PTEvMCkmJihpPW4sbz11KX0pO3JldHVybiBpfSxoLnNodWZmbGU9ZnVuY3Rpb24obil7cmV0dXJuIGguc2FtcGxlKG4sMS8wKX0saC5zYW1wbGU9ZnVuY3Rpb24obixyLHQpe2lmKG51bGw9PXJ8fHQpcmV0dXJuIHcobil8fChuPWgudmFsdWVzKG4pKSxuW2gucmFuZG9tKG4ubGVuZ3RoLTEpXTt2YXIgZT13KG4pP2guY2xvbmUobik6aC52YWx1ZXMobiksdT1BKGUpO3I9TWF0aC5tYXgoTWF0aC5taW4ocix1KSwwKTtmb3IodmFyIGk9dS0xLG89MDtvPHI7bysrKXt2YXIgYT1oLnJhbmRvbShvLGkpLGM9ZVtvXTtlW29dPWVbYV0sZVthXT1jfXJldHVybiBlLnNsaWNlKDAscil9LGguc29ydEJ5PWZ1bmN0aW9uKG4sZSxyKXt2YXIgdT0wO3JldHVybiBlPWQoZSxyKSxoLnBsdWNrKGgubWFwKG4sZnVuY3Rpb24obixyLHQpe3JldHVybnt2YWx1ZTpuLGluZGV4OnUrKyxjcml0ZXJpYTplKG4scix0KX19KS5zb3J0KGZ1bmN0aW9uKG4scil7dmFyIHQ9bi5jcml0ZXJpYSxlPXIuY3JpdGVyaWE7aWYodCE9PWUpe2lmKGU8dHx8dm9pZCAwPT09dClyZXR1cm4gMTtpZih0PGV8fHZvaWQgMD09PWUpcmV0dXJuLTF9cmV0dXJuIG4uaW5kZXgtci5pbmRleH0pLFwidmFsdWVcIil9O3ZhciBrPWZ1bmN0aW9uKG8scil7cmV0dXJuIGZ1bmN0aW9uKGUsdSxuKXt2YXIgaT1yP1tbXSxbXV06e307cmV0dXJuIHU9ZCh1LG4pLGguZWFjaChlLGZ1bmN0aW9uKG4scil7dmFyIHQ9dShuLHIsZSk7byhpLG4sdCl9KSxpfX07aC5ncm91cEJ5PWsoZnVuY3Rpb24obixyLHQpe2oobix0KT9uW3RdLnB1c2gocik6blt0XT1bcl19KSxoLmluZGV4Qnk9ayhmdW5jdGlvbihuLHIsdCl7blt0XT1yfSksaC5jb3VudEJ5PWsoZnVuY3Rpb24obixyLHQpe2oobix0KT9uW3RdKys6blt0XT0xfSk7dmFyIFM9L1teXFx1ZDgwMC1cXHVkZmZmXXxbXFx1ZDgwMC1cXHVkYmZmXVtcXHVkYzAwLVxcdWRmZmZdfFtcXHVkODAwLVxcdWRmZmZdL2c7aC50b0FycmF5PWZ1bmN0aW9uKG4pe3JldHVybiBuP2guaXNBcnJheShuKT9jLmNhbGwobik6aC5pc1N0cmluZyhuKT9uLm1hdGNoKFMpOncobik/aC5tYXAobixoLmlkZW50aXR5KTpoLnZhbHVlcyhuKTpbXX0saC5zaXplPWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT1uPzA6dyhuKT9uLmxlbmd0aDpoLmtleXMobikubGVuZ3RofSxoLnBhcnRpdGlvbj1rKGZ1bmN0aW9uKG4scix0KXtuW3Q/MDoxXS5wdXNoKHIpfSwhMCksaC5maXJzdD1oLmhlYWQ9aC50YWtlPWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gbnVsbD09bnx8bi5sZW5ndGg8MT9udWxsPT1yP3ZvaWQgMDpbXTpudWxsPT1yfHx0P25bMF06aC5pbml0aWFsKG4sbi5sZW5ndGgtcil9LGguaW5pdGlhbD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGMuY2FsbChuLDAsTWF0aC5tYXgoMCxuLmxlbmd0aC0obnVsbD09cnx8dD8xOnIpKSl9LGgubGFzdD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIG51bGw9PW58fG4ubGVuZ3RoPDE/bnVsbD09cj92b2lkIDA6W106bnVsbD09cnx8dD9uW24ubGVuZ3RoLTFdOmgucmVzdChuLE1hdGgubWF4KDAsbi5sZW5ndGgtcikpfSxoLnJlc3Q9aC50YWlsPWguZHJvcD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGMuY2FsbChuLG51bGw9PXJ8fHQ/MTpyKX0saC5jb21wYWN0PWZ1bmN0aW9uKG4pe3JldHVybiBoLmZpbHRlcihuLEJvb2xlYW4pfTt2YXIgTT1mdW5jdGlvbihuLHIsdCxlKXtmb3IodmFyIHU9KGU9ZXx8W10pLmxlbmd0aCxpPTAsbz1BKG4pO2k8bztpKyspe3ZhciBhPW5baV07aWYodyhhKSYmKGguaXNBcnJheShhKXx8aC5pc0FyZ3VtZW50cyhhKSkpaWYocilmb3IodmFyIGM9MCxsPWEubGVuZ3RoO2M8bDspZVt1KytdPWFbYysrXTtlbHNlIE0oYSxyLHQsZSksdT1lLmxlbmd0aDtlbHNlIHR8fChlW3UrK109YSl9cmV0dXJuIGV9O2guZmxhdHRlbj1mdW5jdGlvbihuLHIpe3JldHVybiBNKG4sciwhMSl9LGgud2l0aG91dD1nKGZ1bmN0aW9uKG4scil7cmV0dXJuIGguZGlmZmVyZW5jZShuLHIpfSksaC51bmlxPWgudW5pcXVlPWZ1bmN0aW9uKG4scix0LGUpe2guaXNCb29sZWFuKHIpfHwoZT10LHQ9cixyPSExKSxudWxsIT10JiYodD1kKHQsZSkpO2Zvcih2YXIgdT1bXSxpPVtdLG89MCxhPUEobik7bzxhO28rKyl7dmFyIGM9bltvXSxsPXQ/dChjLG8sbik6YztyJiYhdD8obyYmaT09PWx8fHUucHVzaChjKSxpPWwpOnQ/aC5jb250YWlucyhpLGwpfHwoaS5wdXNoKGwpLHUucHVzaChjKSk6aC5jb250YWlucyh1LGMpfHx1LnB1c2goYyl9cmV0dXJuIHV9LGgudW5pb249ZyhmdW5jdGlvbihuKXtyZXR1cm4gaC51bmlxKE0obiwhMCwhMCkpfSksaC5pbnRlcnNlY3Rpb249ZnVuY3Rpb24obil7Zm9yKHZhciByPVtdLHQ9YXJndW1lbnRzLmxlbmd0aCxlPTAsdT1BKG4pO2U8dTtlKyspe3ZhciBpPW5bZV07aWYoIWguY29udGFpbnMocixpKSl7dmFyIG87Zm9yKG89MTtvPHQmJmguY29udGFpbnMoYXJndW1lbnRzW29dLGkpO28rKyk7bz09PXQmJnIucHVzaChpKX19cmV0dXJuIHJ9LGguZGlmZmVyZW5jZT1nKGZ1bmN0aW9uKG4scil7cmV0dXJuIHI9TShyLCEwLCEwKSxoLmZpbHRlcihuLGZ1bmN0aW9uKG4pe3JldHVybiFoLmNvbnRhaW5zKHIsbil9KX0pLGgudW56aXA9ZnVuY3Rpb24obil7Zm9yKHZhciByPW4mJmgubWF4KG4sQSkubGVuZ3RofHwwLHQ9QXJyYXkociksZT0wO2U8cjtlKyspdFtlXT1oLnBsdWNrKG4sZSk7cmV0dXJuIHR9LGguemlwPWcoaC51bnppcCksaC5vYmplY3Q9ZnVuY3Rpb24obixyKXtmb3IodmFyIHQ9e30sZT0wLHU9QShuKTtlPHU7ZSsrKXI/dFtuW2VdXT1yW2VdOnRbbltlXVswXV09bltlXVsxXTtyZXR1cm4gdH07dmFyIEY9ZnVuY3Rpb24oaSl7cmV0dXJuIGZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGU9QShuKSx1PTA8aT8wOmUtMTswPD11JiZ1PGU7dSs9aSlpZihyKG5bdV0sdSxuKSlyZXR1cm4gdTtyZXR1cm4tMX19O2guZmluZEluZGV4PUYoMSksaC5maW5kTGFzdEluZGV4PUYoLTEpLGguc29ydGVkSW5kZXg9ZnVuY3Rpb24obixyLHQsZSl7Zm9yKHZhciB1PSh0PWQodCxlLDEpKShyKSxpPTAsbz1BKG4pO2k8bzspe3ZhciBhPU1hdGguZmxvb3IoKGkrbykvMik7dChuW2FdKTx1P2k9YSsxOm89YX1yZXR1cm4gaX07dmFyIEU9ZnVuY3Rpb24oaSxvLGEpe3JldHVybiBmdW5jdGlvbihuLHIsdCl7dmFyIGU9MCx1PUEobik7aWYoXCJudW1iZXJcIj09dHlwZW9mIHQpMDxpP2U9MDw9dD90Ok1hdGgubWF4KHQrdSxlKTp1PTA8PXQ/TWF0aC5taW4odCsxLHUpOnQrdSsxO2Vsc2UgaWYoYSYmdCYmdSlyZXR1cm4gblt0PWEobixyKV09PT1yP3Q6LTE7aWYociE9cilyZXR1cm4gMDw9KHQ9byhjLmNhbGwobixlLHUpLGguaXNOYU4pKT90K2U6LTE7Zm9yKHQ9MDxpP2U6dS0xOzA8PXQmJnQ8dTt0Kz1pKWlmKG5bdF09PT1yKXJldHVybiB0O3JldHVybi0xfX07aC5pbmRleE9mPUUoMSxoLmZpbmRJbmRleCxoLnNvcnRlZEluZGV4KSxoLmxhc3RJbmRleE9mPUUoLTEsaC5maW5kTGFzdEluZGV4KSxoLnJhbmdlPWZ1bmN0aW9uKG4scix0KXtudWxsPT1yJiYocj1ufHwwLG49MCksdHx8KHQ9cjxuPy0xOjEpO2Zvcih2YXIgZT1NYXRoLm1heChNYXRoLmNlaWwoKHItbikvdCksMCksdT1BcnJheShlKSxpPTA7aTxlO2krKyxuKz10KXVbaV09bjtyZXR1cm4gdX0saC5jaHVuaz1mdW5jdGlvbihuLHIpe2lmKG51bGw9PXJ8fHI8MSlyZXR1cm5bXTtmb3IodmFyIHQ9W10sZT0wLHU9bi5sZW5ndGg7ZTx1Oyl0LnB1c2goYy5jYWxsKG4sZSxlKz1yKSk7cmV0dXJuIHR9O3ZhciBOPWZ1bmN0aW9uKG4scix0LGUsdSl7aWYoIShlIGluc3RhbmNlb2YgcikpcmV0dXJuIG4uYXBwbHkodCx1KTt2YXIgaT1tKG4ucHJvdG90eXBlKSxvPW4uYXBwbHkoaSx1KTtyZXR1cm4gaC5pc09iamVjdChvKT9vOml9O2guYmluZD1nKGZ1bmN0aW9uKHIsdCxlKXtpZighaC5pc0Z1bmN0aW9uKHIpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJCaW5kIG11c3QgYmUgY2FsbGVkIG9uIGEgZnVuY3Rpb25cIik7dmFyIHU9ZyhmdW5jdGlvbihuKXtyZXR1cm4gTihyLHUsdCx0aGlzLGUuY29uY2F0KG4pKX0pO3JldHVybiB1fSksaC5wYXJ0aWFsPWcoZnVuY3Rpb24odSxpKXt2YXIgbz1oLnBhcnRpYWwucGxhY2Vob2xkZXIsYT1mdW5jdGlvbigpe2Zvcih2YXIgbj0wLHI9aS5sZW5ndGgsdD1BcnJheShyKSxlPTA7ZTxyO2UrKyl0W2VdPWlbZV09PT1vP2FyZ3VtZW50c1tuKytdOmlbZV07Zm9yKDtuPGFyZ3VtZW50cy5sZW5ndGg7KXQucHVzaChhcmd1bWVudHNbbisrXSk7cmV0dXJuIE4odSxhLHRoaXMsdGhpcyx0KX07cmV0dXJuIGF9KSwoaC5wYXJ0aWFsLnBsYWNlaG9sZGVyPWgpLmJpbmRBbGw9ZyhmdW5jdGlvbihuLHIpe3ZhciB0PShyPU0ociwhMSwhMSkpLmxlbmd0aDtpZih0PDEpdGhyb3cgbmV3IEVycm9yKFwiYmluZEFsbCBtdXN0IGJlIHBhc3NlZCBmdW5jdGlvbiBuYW1lc1wiKTtmb3IoO3QtLTspe3ZhciBlPXJbdF07bltlXT1oLmJpbmQobltlXSxuKX19KSxoLm1lbW9pemU9ZnVuY3Rpb24oZSx1KXt2YXIgaT1mdW5jdGlvbihuKXt2YXIgcj1pLmNhY2hlLHQ9XCJcIisodT91LmFwcGx5KHRoaXMsYXJndW1lbnRzKTpuKTtyZXR1cm4gaihyLHQpfHwoclt0XT1lLmFwcGx5KHRoaXMsYXJndW1lbnRzKSksclt0XX07cmV0dXJuIGkuY2FjaGU9e30saX0saC5kZWxheT1nKGZ1bmN0aW9uKG4scix0KXtyZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpe3JldHVybiBuLmFwcGx5KG51bGwsdCl9LHIpfSksaC5kZWZlcj1oLnBhcnRpYWwoaC5kZWxheSxoLDEpLGgudGhyb3R0bGU9ZnVuY3Rpb24odCxlLHUpe3ZhciBpLG8sYSxjLGw9MDt1fHwodT17fSk7dmFyIGY9ZnVuY3Rpb24oKXtsPSExPT09dS5sZWFkaW5nPzA6aC5ub3coKSxpPW51bGwsYz10LmFwcGx5KG8sYSksaXx8KG89YT1udWxsKX0sbj1mdW5jdGlvbigpe3ZhciBuPWgubm93KCk7bHx8ITEhPT11LmxlYWRpbmd8fChsPW4pO3ZhciByPWUtKG4tbCk7cmV0dXJuIG89dGhpcyxhPWFyZ3VtZW50cyxyPD0wfHxlPHI/KGkmJihjbGVhclRpbWVvdXQoaSksaT1udWxsKSxsPW4sYz10LmFwcGx5KG8sYSksaXx8KG89YT1udWxsKSk6aXx8ITE9PT11LnRyYWlsaW5nfHwoaT1zZXRUaW1lb3V0KGYscikpLGN9O3JldHVybiBuLmNhbmNlbD1mdW5jdGlvbigpe2NsZWFyVGltZW91dChpKSxsPTAsaT1vPWE9bnVsbH0sbn0saC5kZWJvdW5jZT1mdW5jdGlvbih0LGUsdSl7dmFyIGksbyxhPWZ1bmN0aW9uKG4scil7aT1udWxsLHImJihvPXQuYXBwbHkobixyKSl9LG49ZyhmdW5jdGlvbihuKXtpZihpJiZjbGVhclRpbWVvdXQoaSksdSl7dmFyIHI9IWk7aT1zZXRUaW1lb3V0KGEsZSksciYmKG89dC5hcHBseSh0aGlzLG4pKX1lbHNlIGk9aC5kZWxheShhLGUsdGhpcyxuKTtyZXR1cm4gb30pO3JldHVybiBuLmNhbmNlbD1mdW5jdGlvbigpe2NsZWFyVGltZW91dChpKSxpPW51bGx9LG59LGgud3JhcD1mdW5jdGlvbihuLHIpe3JldHVybiBoLnBhcnRpYWwocixuKX0saC5uZWdhdGU9ZnVuY3Rpb24obil7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIW4uYXBwbHkodGhpcyxhcmd1bWVudHMpfX0saC5jb21wb3NlPWZ1bmN0aW9uKCl7dmFyIHQ9YXJndW1lbnRzLGU9dC5sZW5ndGgtMTtyZXR1cm4gZnVuY3Rpb24oKXtmb3IodmFyIG49ZSxyPXRbZV0uYXBwbHkodGhpcyxhcmd1bWVudHMpO24tLTspcj10W25dLmNhbGwodGhpcyxyKTtyZXR1cm4gcn19LGguYWZ0ZXI9ZnVuY3Rpb24obixyKXtyZXR1cm4gZnVuY3Rpb24oKXtpZigtLW48MSlyZXR1cm4gci5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fSxoLmJlZm9yZT1mdW5jdGlvbihuLHIpe3ZhciB0O3JldHVybiBmdW5jdGlvbigpe3JldHVybiAwPC0tbiYmKHQ9ci5hcHBseSh0aGlzLGFyZ3VtZW50cykpLG48PTEmJihyPW51bGwpLHR9fSxoLm9uY2U9aC5wYXJ0aWFsKGguYmVmb3JlLDIpLGgucmVzdEFyZ3VtZW50cz1nO3ZhciBJPSF7dG9TdHJpbmc6bnVsbH0ucHJvcGVydHlJc0VudW1lcmFibGUoXCJ0b1N0cmluZ1wiKSxUPVtcInZhbHVlT2ZcIixcImlzUHJvdG90eXBlT2ZcIixcInRvU3RyaW5nXCIsXCJwcm9wZXJ0eUlzRW51bWVyYWJsZVwiLFwiaGFzT3duUHJvcGVydHlcIixcInRvTG9jYWxlU3RyaW5nXCJdLEI9ZnVuY3Rpb24obixyKXt2YXIgdD1ULmxlbmd0aCxlPW4uY29uc3RydWN0b3IsdT1oLmlzRnVuY3Rpb24oZSkmJmUucHJvdG90eXBlfHxvLGk9XCJjb25zdHJ1Y3RvclwiO2ZvcihqKG4saSkmJiFoLmNvbnRhaW5zKHIsaSkmJnIucHVzaChpKTt0LS07KShpPVRbdF0paW4gbiYmbltpXSE9PXVbaV0mJiFoLmNvbnRhaW5zKHIsaSkmJnIucHVzaChpKX07aC5rZXlzPWZ1bmN0aW9uKG4pe2lmKCFoLmlzT2JqZWN0KG4pKXJldHVybltdO2lmKGEpcmV0dXJuIGEobik7dmFyIHI9W107Zm9yKHZhciB0IGluIG4paihuLHQpJiZyLnB1c2godCk7cmV0dXJuIEkmJkIobixyKSxyfSxoLmFsbEtleXM9ZnVuY3Rpb24obil7aWYoIWguaXNPYmplY3QobikpcmV0dXJuW107dmFyIHI9W107Zm9yKHZhciB0IGluIG4pci5wdXNoKHQpO3JldHVybiBJJiZCKG4scikscn0saC52YWx1ZXM9ZnVuY3Rpb24obil7Zm9yKHZhciByPWgua2V5cyhuKSx0PXIubGVuZ3RoLGU9QXJyYXkodCksdT0wO3U8dDt1KyspZVt1XT1uW3JbdV1dO3JldHVybiBlfSxoLm1hcE9iamVjdD1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPWgua2V5cyhuKSx1PWUubGVuZ3RoLGk9e30sbz0wO288dTtvKyspe3ZhciBhPWVbb107aVthXT1yKG5bYV0sYSxuKX1yZXR1cm4gaX0saC5wYWlycz1mdW5jdGlvbihuKXtmb3IodmFyIHI9aC5rZXlzKG4pLHQ9ci5sZW5ndGgsZT1BcnJheSh0KSx1PTA7dTx0O3UrKyllW3VdPVtyW3VdLG5bclt1XV1dO3JldHVybiBlfSxoLmludmVydD1mdW5jdGlvbihuKXtmb3IodmFyIHI9e30sdD1oLmtleXMobiksZT0wLHU9dC5sZW5ndGg7ZTx1O2UrKylyW25bdFtlXV1dPXRbZV07cmV0dXJuIHJ9LGguZnVuY3Rpb25zPWgubWV0aG9kcz1mdW5jdGlvbihuKXt2YXIgcj1bXTtmb3IodmFyIHQgaW4gbiloLmlzRnVuY3Rpb24oblt0XSkmJnIucHVzaCh0KTtyZXR1cm4gci5zb3J0KCl9O3ZhciBSPWZ1bmN0aW9uKGMsbCl7cmV0dXJuIGZ1bmN0aW9uKG4pe3ZhciByPWFyZ3VtZW50cy5sZW5ndGg7aWYobCYmKG49T2JqZWN0KG4pKSxyPDJ8fG51bGw9PW4pcmV0dXJuIG47Zm9yKHZhciB0PTE7dDxyO3QrKylmb3IodmFyIGU9YXJndW1lbnRzW3RdLHU9YyhlKSxpPXUubGVuZ3RoLG89MDtvPGk7bysrKXt2YXIgYT11W29dO2wmJnZvaWQgMCE9PW5bYV18fChuW2FdPWVbYV0pfXJldHVybiBufX07aC5leHRlbmQ9UihoLmFsbEtleXMpLGguZXh0ZW5kT3duPWguYXNzaWduPVIoaC5rZXlzKSxoLmZpbmRLZXk9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZSx1PWgua2V5cyhuKSxpPTAsbz11Lmxlbmd0aDtpPG87aSsrKWlmKHIobltlPXVbaV1dLGUsbikpcmV0dXJuIGV9O3ZhciBxLEssej1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIHIgaW4gdH07aC5waWNrPWcoZnVuY3Rpb24obixyKXt2YXIgdD17fSxlPXJbMF07aWYobnVsbD09bilyZXR1cm4gdDtoLmlzRnVuY3Rpb24oZSk/KDE8ci5sZW5ndGgmJihlPXkoZSxyWzFdKSkscj1oLmFsbEtleXMobikpOihlPXoscj1NKHIsITEsITEpLG49T2JqZWN0KG4pKTtmb3IodmFyIHU9MCxpPXIubGVuZ3RoO3U8aTt1Kyspe3ZhciBvPXJbdV0sYT1uW29dO2UoYSxvLG4pJiYodFtvXT1hKX1yZXR1cm4gdH0pLGgub21pdD1nKGZ1bmN0aW9uKG4sdCl7dmFyIHIsZT10WzBdO3JldHVybiBoLmlzRnVuY3Rpb24oZSk/KGU9aC5uZWdhdGUoZSksMTx0Lmxlbmd0aCYmKHI9dFsxXSkpOih0PWgubWFwKE0odCwhMSwhMSksU3RyaW5nKSxlPWZ1bmN0aW9uKG4scil7cmV0dXJuIWguY29udGFpbnModCxyKX0pLGgucGljayhuLGUscil9KSxoLmRlZmF1bHRzPVIoaC5hbGxLZXlzLCEwKSxoLmNyZWF0ZT1mdW5jdGlvbihuLHIpe3ZhciB0PW0obik7cmV0dXJuIHImJmguZXh0ZW5kT3duKHQsciksdH0saC5jbG9uZT1mdW5jdGlvbihuKXtyZXR1cm4gaC5pc09iamVjdChuKT9oLmlzQXJyYXkobik/bi5zbGljZSgpOmguZXh0ZW5kKHt9LG4pOm59LGgudGFwPWZ1bmN0aW9uKG4scil7cmV0dXJuIHIobiksbn0saC5pc01hdGNoPWZ1bmN0aW9uKG4scil7dmFyIHQ9aC5rZXlzKHIpLGU9dC5sZW5ndGg7aWYobnVsbD09bilyZXR1cm4hZTtmb3IodmFyIHU9T2JqZWN0KG4pLGk9MDtpPGU7aSsrKXt2YXIgbz10W2ldO2lmKHJbb10hPT11W29dfHwhKG8gaW4gdSkpcmV0dXJuITF9cmV0dXJuITB9LHE9ZnVuY3Rpb24obixyLHQsZSl7aWYobj09PXIpcmV0dXJuIDAhPT1ufHwxL249PTEvcjtpZihudWxsPT1ufHxudWxsPT1yKXJldHVybiExO2lmKG4hPW4pcmV0dXJuIHIhPXI7dmFyIHU9dHlwZW9mIG47cmV0dXJuKFwiZnVuY3Rpb25cIj09PXV8fFwib2JqZWN0XCI9PT11fHxcIm9iamVjdFwiPT10eXBlb2YgcikmJksobixyLHQsZSl9LEs9ZnVuY3Rpb24obixyLHQsZSl7biBpbnN0YW5jZW9mIGgmJihuPW4uX3dyYXBwZWQpLHIgaW5zdGFuY2VvZiBoJiYocj1yLl93cmFwcGVkKTt2YXIgdT1wLmNhbGwobik7aWYodSE9PXAuY2FsbChyKSlyZXR1cm4hMTtzd2l0Y2godSl7Y2FzZVwiW29iamVjdCBSZWdFeHBdXCI6Y2FzZVwiW29iamVjdCBTdHJpbmddXCI6cmV0dXJuXCJcIituPT1cIlwiK3I7Y2FzZVwiW29iamVjdCBOdW1iZXJdXCI6cmV0dXJuK24hPStuPytyIT0rcjowPT0rbj8xLytuPT0xL3I6K249PStyO2Nhc2VcIltvYmplY3QgRGF0ZV1cIjpjYXNlXCJbb2JqZWN0IEJvb2xlYW5dXCI6cmV0dXJuK249PStyO2Nhc2VcIltvYmplY3QgU3ltYm9sXVwiOnJldHVybiBzLnZhbHVlT2YuY2FsbChuKT09PXMudmFsdWVPZi5jYWxsKHIpfXZhciBpPVwiW29iamVjdCBBcnJheV1cIj09PXU7aWYoIWkpe2lmKFwib2JqZWN0XCIhPXR5cGVvZiBufHxcIm9iamVjdFwiIT10eXBlb2YgcilyZXR1cm4hMTt2YXIgbz1uLmNvbnN0cnVjdG9yLGE9ci5jb25zdHJ1Y3RvcjtpZihvIT09YSYmIShoLmlzRnVuY3Rpb24obykmJm8gaW5zdGFuY2VvZiBvJiZoLmlzRnVuY3Rpb24oYSkmJmEgaW5zdGFuY2VvZiBhKSYmXCJjb25zdHJ1Y3RvclwiaW4gbiYmXCJjb25zdHJ1Y3RvclwiaW4gcilyZXR1cm4hMX1lPWV8fFtdO2Zvcih2YXIgYz0odD10fHxbXSkubGVuZ3RoO2MtLTspaWYodFtjXT09PW4pcmV0dXJuIGVbY109PT1yO2lmKHQucHVzaChuKSxlLnB1c2gociksaSl7aWYoKGM9bi5sZW5ndGgpIT09ci5sZW5ndGgpcmV0dXJuITE7Zm9yKDtjLS07KWlmKCFxKG5bY10scltjXSx0LGUpKXJldHVybiExfWVsc2V7dmFyIGwsZj1oLmtleXMobik7aWYoYz1mLmxlbmd0aCxoLmtleXMocikubGVuZ3RoIT09YylyZXR1cm4hMTtmb3IoO2MtLTspaWYobD1mW2NdLCFqKHIsbCl8fCFxKG5bbF0scltsXSx0LGUpKXJldHVybiExfXJldHVybiB0LnBvcCgpLGUucG9wKCksITB9LGguaXNFcXVhbD1mdW5jdGlvbihuLHIpe3JldHVybiBxKG4scil9LGguaXNFbXB0eT1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09bnx8KHcobikmJihoLmlzQXJyYXkobil8fGguaXNTdHJpbmcobil8fGguaXNBcmd1bWVudHMobikpPzA9PT1uLmxlbmd0aDowPT09aC5rZXlzKG4pLmxlbmd0aCl9LGguaXNFbGVtZW50PWZ1bmN0aW9uKG4pe3JldHVybiEoIW58fDEhPT1uLm5vZGVUeXBlKX0saC5pc0FycmF5PXR8fGZ1bmN0aW9uKG4pe3JldHVyblwiW29iamVjdCBBcnJheV1cIj09PXAuY2FsbChuKX0saC5pc09iamVjdD1mdW5jdGlvbihuKXt2YXIgcj10eXBlb2YgbjtyZXR1cm5cImZ1bmN0aW9uXCI9PT1yfHxcIm9iamVjdFwiPT09ciYmISFufSxoLmVhY2goW1wiQXJndW1lbnRzXCIsXCJGdW5jdGlvblwiLFwiU3RyaW5nXCIsXCJOdW1iZXJcIixcIkRhdGVcIixcIlJlZ0V4cFwiLFwiRXJyb3JcIixcIlN5bWJvbFwiLFwiTWFwXCIsXCJXZWFrTWFwXCIsXCJTZXRcIixcIldlYWtTZXRcIl0sZnVuY3Rpb24ocil7aFtcImlzXCIrcl09ZnVuY3Rpb24obil7cmV0dXJuIHAuY2FsbChuKT09PVwiW29iamVjdCBcIityK1wiXVwifX0pLGguaXNBcmd1bWVudHMoYXJndW1lbnRzKXx8KGguaXNBcmd1bWVudHM9ZnVuY3Rpb24obil7cmV0dXJuIGoobixcImNhbGxlZVwiKX0pO3ZhciBEPW4uZG9jdW1lbnQmJm4uZG9jdW1lbnQuY2hpbGROb2RlcztcImZ1bmN0aW9uXCIhPXR5cGVvZi8uLyYmXCJvYmplY3RcIiE9dHlwZW9mIEludDhBcnJheSYmXCJmdW5jdGlvblwiIT10eXBlb2YgRCYmKGguaXNGdW5jdGlvbj1mdW5jdGlvbihuKXtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBufHwhMX0pLGguaXNGaW5pdGU9ZnVuY3Rpb24obil7cmV0dXJuIWguaXNTeW1ib2wobikmJmlzRmluaXRlKG4pJiYhaXNOYU4ocGFyc2VGbG9hdChuKSl9LGguaXNOYU49ZnVuY3Rpb24obil7cmV0dXJuIGguaXNOdW1iZXIobikmJmlzTmFOKG4pfSxoLmlzQm9vbGVhbj1mdW5jdGlvbihuKXtyZXR1cm4hMD09PW58fCExPT09bnx8XCJbb2JqZWN0IEJvb2xlYW5dXCI9PT1wLmNhbGwobil9LGguaXNOdWxsPWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT09bn0saC5pc1VuZGVmaW5lZD1mdW5jdGlvbihuKXtyZXR1cm4gdm9pZCAwPT09bn0saC5oYXM9ZnVuY3Rpb24obixyKXtpZighaC5pc0FycmF5KHIpKXJldHVybiBqKG4scik7Zm9yKHZhciB0PXIubGVuZ3RoLGU9MDtlPHQ7ZSsrKXt2YXIgdT1yW2VdO2lmKG51bGw9PW58fCFpLmNhbGwobix1KSlyZXR1cm4hMTtuPW5bdV19cmV0dXJuISF0fSxoLm5vQ29uZmxpY3Q9ZnVuY3Rpb24oKXtyZXR1cm4gbi5fPXIsdGhpc30saC5pZGVudGl0eT1mdW5jdGlvbihuKXtyZXR1cm4gbn0saC5jb25zdGFudD1mdW5jdGlvbihuKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gbn19LGgubm9vcD1mdW5jdGlvbigpe30saC5wcm9wZXJ0eT1mdW5jdGlvbihyKXtyZXR1cm4gaC5pc0FycmF5KHIpP2Z1bmN0aW9uKG4pe3JldHVybiB4KG4scil9OmIocil9LGgucHJvcGVydHlPZj1mdW5jdGlvbihyKXtyZXR1cm4gbnVsbD09cj9mdW5jdGlvbigpe306ZnVuY3Rpb24obil7cmV0dXJuIGguaXNBcnJheShuKT94KHIsbik6cltuXX19LGgubWF0Y2hlcj1oLm1hdGNoZXM9ZnVuY3Rpb24ocil7cmV0dXJuIHI9aC5leHRlbmRPd24oe30sciksZnVuY3Rpb24obil7cmV0dXJuIGguaXNNYXRjaChuLHIpfX0saC50aW1lcz1mdW5jdGlvbihuLHIsdCl7dmFyIGU9QXJyYXkoTWF0aC5tYXgoMCxuKSk7cj15KHIsdCwxKTtmb3IodmFyIHU9MDt1PG47dSsrKWVbdV09cih1KTtyZXR1cm4gZX0saC5yYW5kb209ZnVuY3Rpb24obixyKXtyZXR1cm4gbnVsbD09ciYmKHI9bixuPTApLG4rTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKihyLW4rMSkpfSxoLm5vdz1EYXRlLm5vd3x8ZnVuY3Rpb24oKXtyZXR1cm4obmV3IERhdGUpLmdldFRpbWUoKX07dmFyIEw9e1wiJlwiOlwiJmFtcDtcIixcIjxcIjpcIiZsdDtcIixcIj5cIjpcIiZndDtcIiwnXCInOlwiJnF1b3Q7XCIsXCInXCI6XCImI3gyNztcIixcImBcIjpcIiYjeDYwO1wifSxQPWguaW52ZXJ0KEwpLFc9ZnVuY3Rpb24ocil7dmFyIHQ9ZnVuY3Rpb24obil7cmV0dXJuIHJbbl19LG49XCIoPzpcIitoLmtleXMocikuam9pbihcInxcIikrXCIpXCIsZT1SZWdFeHAobiksdT1SZWdFeHAobixcImdcIik7cmV0dXJuIGZ1bmN0aW9uKG4pe3JldHVybiBuPW51bGw9PW4/XCJcIjpcIlwiK24sZS50ZXN0KG4pP24ucmVwbGFjZSh1LHQpOm59fTtoLmVzY2FwZT1XKEwpLGgudW5lc2NhcGU9VyhQKSxoLnJlc3VsdD1mdW5jdGlvbihuLHIsdCl7aC5pc0FycmF5KHIpfHwocj1bcl0pO3ZhciBlPXIubGVuZ3RoO2lmKCFlKXJldHVybiBoLmlzRnVuY3Rpb24odCk/dC5jYWxsKG4pOnQ7Zm9yKHZhciB1PTA7dTxlO3UrKyl7dmFyIGk9bnVsbD09bj92b2lkIDA6bltyW3VdXTt2b2lkIDA9PT1pJiYoaT10LHU9ZSksbj1oLmlzRnVuY3Rpb24oaSk/aS5jYWxsKG4pOml9cmV0dXJuIG59O3ZhciBDPTA7aC51bmlxdWVJZD1mdW5jdGlvbihuKXt2YXIgcj0rK0MrXCJcIjtyZXR1cm4gbj9uK3I6cn0saC50ZW1wbGF0ZVNldHRpbmdzPXtldmFsdWF0ZTovPCUoW1xcc1xcU10rPyklPi9nLGludGVycG9sYXRlOi88JT0oW1xcc1xcU10rPyklPi9nLGVzY2FwZTovPCUtKFtcXHNcXFNdKz8pJT4vZ307dmFyIEo9LyguKV4vLFU9e1wiJ1wiOlwiJ1wiLFwiXFxcXFwiOlwiXFxcXFwiLFwiXFxyXCI6XCJyXCIsXCJcXG5cIjpcIm5cIixcIlxcdTIwMjhcIjpcInUyMDI4XCIsXCJcXHUyMDI5XCI6XCJ1MjAyOVwifSxWPS9cXFxcfCd8XFxyfFxcbnxcXHUyMDI4fFxcdTIwMjkvZywkPWZ1bmN0aW9uKG4pe3JldHVyblwiXFxcXFwiK1Vbbl19O2gudGVtcGxhdGU9ZnVuY3Rpb24oaSxuLHIpeyFuJiZyJiYobj1yKSxuPWguZGVmYXVsdHMoe30sbixoLnRlbXBsYXRlU2V0dGluZ3MpO3ZhciB0LGU9UmVnRXhwKFsobi5lc2NhcGV8fEopLnNvdXJjZSwobi5pbnRlcnBvbGF0ZXx8Sikuc291cmNlLChuLmV2YWx1YXRlfHxKKS5zb3VyY2VdLmpvaW4oXCJ8XCIpK1wifCRcIixcImdcIiksbz0wLGE9XCJfX3ArPSdcIjtpLnJlcGxhY2UoZSxmdW5jdGlvbihuLHIsdCxlLHUpe3JldHVybiBhKz1pLnNsaWNlKG8sdSkucmVwbGFjZShWLCQpLG89dStuLmxlbmd0aCxyP2ErPVwiJytcXG4oKF9fdD0oXCIrcitcIikpPT1udWxsPycnOl8uZXNjYXBlKF9fdCkpK1xcbidcIjp0P2ErPVwiJytcXG4oKF9fdD0oXCIrdCtcIikpPT1udWxsPycnOl9fdCkrXFxuJ1wiOmUmJihhKz1cIic7XFxuXCIrZStcIlxcbl9fcCs9J1wiKSxufSksYSs9XCInO1xcblwiLG4udmFyaWFibGV8fChhPVwid2l0aChvYmp8fHt9KXtcXG5cIithK1wifVxcblwiKSxhPVwidmFyIF9fdCxfX3A9JycsX19qPUFycmF5LnByb3RvdHlwZS5qb2luLFwiK1wicHJpbnQ9ZnVuY3Rpb24oKXtfX3ArPV9fai5jYWxsKGFyZ3VtZW50cywnJyk7fTtcXG5cIithK1wicmV0dXJuIF9fcDtcXG5cIjt0cnl7dD1uZXcgRnVuY3Rpb24obi52YXJpYWJsZXx8XCJvYmpcIixcIl9cIixhKX1jYXRjaChuKXt0aHJvdyBuLnNvdXJjZT1hLG59dmFyIHU9ZnVuY3Rpb24obil7cmV0dXJuIHQuY2FsbCh0aGlzLG4saCl9LGM9bi52YXJpYWJsZXx8XCJvYmpcIjtyZXR1cm4gdS5zb3VyY2U9XCJmdW5jdGlvbihcIitjK1wiKXtcXG5cIithK1wifVwiLHV9LGguY2hhaW49ZnVuY3Rpb24obil7dmFyIHI9aChuKTtyZXR1cm4gci5fY2hhaW49ITAscn07dmFyIEc9ZnVuY3Rpb24obixyKXtyZXR1cm4gbi5fY2hhaW4/aChyKS5jaGFpbigpOnJ9O2gubWl4aW49ZnVuY3Rpb24odCl7cmV0dXJuIGguZWFjaChoLmZ1bmN0aW9ucyh0KSxmdW5jdGlvbihuKXt2YXIgcj1oW25dPXRbbl07aC5wcm90b3R5cGVbbl09ZnVuY3Rpb24oKXt2YXIgbj1bdGhpcy5fd3JhcHBlZF07cmV0dXJuIHUuYXBwbHkobixhcmd1bWVudHMpLEcodGhpcyxyLmFwcGx5KGgsbikpfX0pLGh9LGgubWl4aW4oaCksaC5lYWNoKFtcInBvcFwiLFwicHVzaFwiLFwicmV2ZXJzZVwiLFwic2hpZnRcIixcInNvcnRcIixcInNwbGljZVwiLFwidW5zaGlmdFwiXSxmdW5jdGlvbihyKXt2YXIgdD1lW3JdO2gucHJvdG90eXBlW3JdPWZ1bmN0aW9uKCl7dmFyIG49dGhpcy5fd3JhcHBlZDtyZXR1cm4gdC5hcHBseShuLGFyZ3VtZW50cyksXCJzaGlmdFwiIT09ciYmXCJzcGxpY2VcIiE9PXJ8fDAhPT1uLmxlbmd0aHx8ZGVsZXRlIG5bMF0sRyh0aGlzLG4pfX0pLGguZWFjaChbXCJjb25jYXRcIixcImpvaW5cIixcInNsaWNlXCJdLGZ1bmN0aW9uKG4pe3ZhciByPWVbbl07aC5wcm90b3R5cGVbbl09ZnVuY3Rpb24oKXtyZXR1cm4gRyh0aGlzLHIuYXBwbHkodGhpcy5fd3JhcHBlZCxhcmd1bWVudHMpKX19KSxoLnByb3RvdHlwZS52YWx1ZT1mdW5jdGlvbigpe3JldHVybiB0aGlzLl93cmFwcGVkfSxoLnByb3RvdHlwZS52YWx1ZU9mPWgucHJvdG90eXBlLnRvSlNPTj1oLnByb3RvdHlwZS52YWx1ZSxoLnByb3RvdHlwZS50b1N0cmluZz1mdW5jdGlvbigpe3JldHVybiBTdHJpbmcodGhpcy5fd3JhcHBlZCl9LFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZCYmZGVmaW5lKFwidW5kZXJzY29yZVwiLFtdLGZ1bmN0aW9uKCl7cmV0dXJuIGh9KX0oKTtcbiIsImltcG9ydCB7ZXh0cmFjdEV4dGVuc2lvbn0gZnJvbSBcInV0aWxzL3N0cmluZ3NcIjtcblxuZXhwb3J0IGNvbnN0IGlzUnRtcCA9IGZ1bmN0aW9uIChmaWxlLCB0eXBlKSB7XG4gICAgcmV0dXJuIChmaWxlLmluZGV4T2YoJ3J0bXA6JykgPT0gMCB8fCB0eXBlID09ICdydG1wJyk7XG59O1xuZXhwb3J0IGNvbnN0IGlzV2ViUlRDID0gZnVuY3Rpb24gKGZpbGUsIHR5cGUpIHtcbiAgICBpZihmaWxlKXtcbiAgICAgICAgcmV0dXJuIChmaWxlLmluZGV4T2YoJ3dzOicpID09PSAwIHx8IGZpbGUuaW5kZXhPZignd3NzOicpID09PSAwIHx8IHR5cGUgPT09ICd3ZWJydGMnKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcbmV4cG9ydCBjb25zdCBpc0Rhc2ggPSBmdW5jdGlvbiAoZmlsZSwgdHlwZSkge1xuICAgIHJldHVybiAoIHR5cGUgPT09ICdtcGQnIHx8ICB0eXBlID09PSAnZGFzaCcgfHwgdHlwZSA9PT0gJ2FwcGxpY2F0aW9uL2Rhc2greG1sJyB8fCBleHRyYWN0RXh0ZW5zaW9uKGZpbGUpID09ICdtcGQnKTtcbn07XG4iLCIvKipcbiAqIHV0aWxzIGZvciB3ZWJwYWNrXG4gKi9cblxuZXhwb3J0IGNvbnN0IGdldFNjcmlwdFBhdGggPSBmdW5jdGlvbihzY3JpcHROYW1lKSB7XG4gICAgY29uc3Qgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNjcmlwdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3JjID0gc2NyaXB0c1tpXS5zcmM7XG4gICAgICAgIGlmIChzcmMpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gc3JjLmxhc3RJbmRleE9mKCcvJyArIHNjcmlwdE5hbWUpO1xuICAgICAgICAgICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3JjLnN1YnN0cigwLCBpbmRleCArIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAnJztcbn07XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiAyOS4uXG4gKi9cbmV4cG9ydCBjb25zdCB2ZXJzaW9uID0gX19WRVJTSU9OX187XG4iXSwic291cmNlUm9vdCI6IiJ9