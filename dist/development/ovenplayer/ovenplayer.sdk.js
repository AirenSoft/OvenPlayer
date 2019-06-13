/*! OvenPlayerv0.9.59781 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
                    console.log("Complete");
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
var version = exports.version = '0.9.59781-localbuild';

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvQXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvQXBpRXhwYW5zaW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0NvbmZpZ3VyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0V2ZW50RW1pdHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0xhenlDb21tYW5kRXhlY3V0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9TdXBwb3J0Q2hlY2tlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2NhcHRpb24vTG9hZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvY2FwdGlvbi9NYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvY2FwdGlvbi9wYXJzZXIvU3J0UGFyc2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvY29uc3RhbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvbWVkaWEvTWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3BsYXlsaXN0L01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9Db250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9vdmVucGxheWVyLnNkay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvY2FwdGlvbnMvdnR0Q3VlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9saWtlQSQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3N0cmluZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3VuZGVyc2NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3ZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvd2VicGFjay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmVyc2lvbi5qcyJdLCJuYW1lcyI6WyJBcGkiLCJjb250YWluZXIiLCJ0aGF0IiwiY29uc29sZSIsImxvZyIsInZlcnNpb24iLCJPdmVuUGxheWVyQ29uc29sZSIsInBsYXlsaXN0TWFuYWdlciIsInByb3ZpZGVyQ29udHJvbGxlciIsInVzZXJBZ2VudE9iamVjdCIsIm1lZGlhTWFuYWdlciIsImN1cnJlbnRQcm92aWRlciIsInBsYXllckNvbmZpZyIsImxhenlRdWV1ZSIsImNhcHRpb25NYW5hZ2VyIiwicnVuTmV4dFBsYXlsaXN0IiwiaW5kZXgiLCJuZXh0UGxheWxpc3RJbmRleCIsInBsYXlsaXN0IiwiZ2V0UGxheWxpc3QiLCJoYXNOZXh0UGxheWxpc3QiLCJzZXRTb3VyY2VJbmRleCIsInNldEN1cnJlbnRQbGF5bGlzdCIsImluaXRQcm92aWRlciIsImlzQXV0b1N0YXJ0IiwicGxheSIsInRyaWdnZXIiLCJBTExfUExBWUxJU1RfRU5ERUQiLCJsYXN0UGxheVBvc2l0aW9uIiwicGlja1F1YWxpdHlGcm9tU291cmNlIiwic291cmNlcyIsInF1YWxpdHkiLCJpIiwibGVuZ3RoIiwiZ2V0U291cmNlSW5kZXgiLCJsb2FkUHJvdmlkZXJzIiwiZ2V0Q3VycmVudFBsYXlMaXN0IiwidGhlbiIsIlByb3ZpZGVycyIsIkVSUk9SUyIsIklOSVRfVU5TVVBQT1JUX0VSUk9SIiwiZGVzdHJveSIsImdldEN1cnJlbnRQbGF5bGlzdEluZGV4IiwiY3VycmVudFNvdXJjZUluZGV4IiwiZ2V0Q3VycmVudFNvdXJjZXMiLCJwcm92aWRlck5hbWUiLCJwcm92aWRlciIsImNyZWF0ZU1lZGlhIiwiZ2V0Q3VycmVudEFkVGFnIiwiUFJPVklERVJfUlRNUCIsIm9uIiwibmFtZSIsImRhdGEiLCJFUlJPUiIsIk5FVFdPUktfVU5TVEFCTEVEIiwiZ2V0U291cmNlcyIsInBhdXNlIiwic2V0Q3VycmVudFNvdXJjZSIsInByZWxvYWQiLCJSRUFEWSIsImZsdXNoIiwiZXJyb3IiLCJvZmYiLCJjb2RlIiwidGVtcEVycm9yIiwiSU5JVF9VTktOV09OX0VSUk9SIiwiaW5pdCIsIm9wdGlvbnMiLCJtZWRpYUNvbnRhaW5lciIsImJyb3dzZXIiLCJpbml0UGxheWxpc3QiLCJnZXRQcm92aWRlck5hbWUiLCJnZXROYW1lIiwiZ2V0Q29uZmlnIiwiZ2V0QnJvd3NlciIsInNldFRpbWVjb2RlTW9kZSIsImlzU2hvdyIsImlzVGltZWNvZGVNb2RlIiwiZ2V0RnJhbWVyYXRlIiwic2Vla0ZyYW1lIiwiZnJhbWVDb3VudCIsImdldER1cmF0aW9uIiwiZ2V0UG9zaXRpb24iLCJnZXRWb2x1bWUiLCJzZXRWb2x1bWUiLCJ2b2x1bWUiLCJzZXRNdXRlIiwic3RhdGUiLCJnZXRNdXRlIiwibG9hZCIsInNldEN1cnJlbnRRdWFsaXR5Iiwic2VlayIsInBvc2l0aW9uIiwic2V0UGxheWJhY2tSYXRlIiwicGxheWJhY2tSYXRlIiwiZ2V0UGxheWJhY2tSYXRlIiwiZ2V0Q3VycmVudFBsYXlsaXN0IiwiZ2V0Q3VycmVudFNvdXJjZSIsImN1cnJlbnRTb3VyY2UiLCJuZXdTb3VyY2UiLCJpc1NhbWVQcm92aWRlciIsInJlc3VsdFNvdXJjZUluZGV4IiwiZ2V0UXVhbGl0eUxldmVscyIsImdldEN1cnJlbnRRdWFsaXR5IiwicXVhbGl0eUluZGV4IiwiaXNBdXRvUXVhbGl0eSIsInNldEF1dG9RdWFsaXR5IiwiaXNBdXRvIiwiZ2V0Q2FwdGlvbkxpc3QiLCJnZXRDdXJyZW50Q2FwdGlvbiIsInNldEN1cnJlbnRDYXB0aW9uIiwiYWRkQ2FwdGlvbiIsInRyYWNrIiwicmVtb3ZlQ2FwdGlvbiIsImdldEJ1ZmZlciIsImdldFN0YXRlIiwic3RvcCIsInJlbW92ZSIsIkRFU1RST1kiLCJPdmVuUGxheWVyU0RLIiwicmVtb3ZlUGxheWVyIiwiZ2V0Q29udGFpbmVySWQiLCJnZXRQbGF5ZXJMaXN0IiwiZ2V0VmVyc2lvbiIsIkFwaVJ0bXBFeHBhbnNpb24iLCJleHRlcm5hbENhbGxiYWNrQ3JlZXAiLCJyZXN1bHQiLCJ0cmlnZ2VyRXZlbnRGcm9tRXh0ZXJuYWwiLCJDb25maWd1cmF0b3IiLCJjb21wb3NlU291cmNlT3B0aW9ucyIsIkRlZmF1bHRzIiwicGxheWJhY2tSYXRlcyIsIm11dGUiLCJsb29wIiwiY29udHJvbHMiLCJhdXRvU3RhcnQiLCJ0aW1lY29kZSIsInNvdXJjZUluZGV4IiwiaGlkZVBsYXlsaXN0SWNvbiIsInJ0bXBCdWZmZXJUaW1lIiwicnRtcEJ1ZmZlclRpbWVNYXgiLCJzZXJpYWxpemUiLCJ2YWwiLCJ1bmRlZmluZWQiLCJsb3dlcmNhc2VWYWwiLCJ0b0xvd2VyQ2FzZSIsImlzTmFOIiwiTnVtYmVyIiwicGFyc2VGbG9hdCIsImRlc2VyaWFsaXplIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJjb25maWciLCJmaWx0ZXIiLCJfIiwiaXNOdW1iZXIiLCJyYXRlIiwibWFwIiwiTWF0aCIsInJvdW5kIiwiaW5kZXhPZiIsInB1c2giLCJzb3J0IiwiY29uZmlnUGxheWxpc3QiLCJvYmoiLCJwaWNrIiwiaXNBcnJheSIsImZlZWREYXRhIiwiZHVyYXRpb24iLCJzcGVjIiwic2V0Q29uZmlnIiwidmFsdWUiLCJnZXRDb250YWluZXIiLCJnZXRRdWFsaXR5TGFiZWwiLCJxdWFsaXR5TGFiZWwiLCJzZXRRdWFsaXR5TGFiZWwiLCJuZXdMYWJlbCIsIkNPTlRFTlRfVElNRV9NT0RFX0NIQU5HRUQiLCJnZXRSdG1wQnVmZmVyVGltZSIsImdldFJ0bXBCdWZmZXJUaW1lTWF4IiwiaXNNdXRlIiwiaXNMb29wIiwiaXNDb250cm9scyIsImdldFBsYXliYWNrUmF0ZXMiLCJzZXRQbGF5bGlzdCIsIkV2ZW50RW1pdHRlciIsIm9iamVjdCIsIl9ldmVudHMiLCJ0cmlnZ2VyRXZlbnRzIiwiZXZlbnRzIiwiYXJncyIsImNvbnRleHQiLCJldmVudCIsImxpc3RlbmVyIiwiYXBwbHkiLCJzbGljZSIsImNhbGwiLCJhcmd1bWVudHMiLCJhbGxFdmVudHMiLCJhbGwiLCJuYW1lcyIsImwiLCJyZXRhaW4iLCJqIiwiayIsIl9saXN0ZW5lciIsIm9uY2UiLCJjb3VudCIsIm9uY2VDYWxsYmFjayIsIkxhenlDb21tYW5kRXhlY3V0b3IiLCJpbnN0YW5jZSIsInF1ZXVlZENvbW1hbmRzIiwiY29tbWFuZFF1ZXVlIiwidW5kZWNvcmF0ZWRNZXRob2RzIiwiZXhlY3V0ZU1vZGUiLCJjb21tYW5kIiwibWV0aG9kIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJhZGRRdWV1ZSIsImV4ZWN1dGVRdWV1ZWRDb21tYW5kcyIsInNoaWZ0Iiwic2V0RXhlY3V0ZU1vZGUiLCJtb2RlIiwiZ2V0VW5kZWNvcmF0ZWRNZXRob2RzIiwiZ2V0UXVldWUiLCJlbXB0eSIsInJlbW92ZUFuZEV4Y3V0ZU9uY2UiLCJjb21tYW5kXyIsImNvbW1hbmRRdWV1ZUl0ZW0iLCJmaW5kV2hlcmUiLCJzcGxpY2UiLCJmaW5kSW5kZXgiLCJTdXBwb3J0Q2hlY2tlciIsInN1cHBvcnRMaXN0IiwiY2hlY2tTdXBwb3J0Iiwic291cmNlIiwiTWltZVR5cGVzIiwiYWFjIiwibXA0IiwiZjR2IiwibTR2IiwibW92IiwibXAzIiwibXBlZyIsIm9ndiIsIm9nZyIsIm9nYSIsInZvcmJpcyIsIndlYm0iLCJmNGEiLCJtM3U4IiwibTN1IiwiaGxzIiwidmlkZW8iLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjYW5QbGF5VHlwZSIsImZpbGUiLCJ0eXBlIiwibWltZVR5cGUiLCJ3aW5kb3ciLCJNZWRpYVNvdXJjZSIsIldlYktpdE1lZGlhU291cmNlIiwiaXNIbHNTdXBwb3J0IiwiZ2V0TWVkaWFTb3VyY2UiLCJtZWRpYVNvdXJjZSIsInNvdXJjZUJ1ZmZlciIsIlNvdXJjZUJ1ZmZlciIsIldlYktpdFNvdXJjZUJ1ZmZlciIsImlzVHlwZVN1cHBvcnRlZCIsInNvdXJjZUJ1ZmZlclZhbGlkQVBJIiwiYXBwZW5kQnVmZmVyIiwidGVzdEZsYXNoIiwic3VwcG9ydCIsIkFjdGl2ZVhPYmplY3QiLCJlIiwibmF2aWdhdG9yIiwibWltZVR5cGVzIiwib3MiLCJmaW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UiLCJzb3J1Y2VfIiwiZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0IiwicGxheWxpc3RJdGVtIiwic3VwcG9ydE5hbWVzIiwiaXRlbSIsInN1cHBvcnRlZCIsIkxvYWRlciIsImNvbnZlcnRUb1ZUVEN1ZXMiLCJjdWVzIiwiVlRUQ3VlIiwiY3VlIiwic3RhcnQiLCJlbmQiLCJ0ZXh0IiwibGFuZ3VhZ2UiLCJzdWNjZXNzQ2FsbGJhY2siLCJlcnJvckNhbGxiYWNrIiwicmVxdWVzdE9wdGlvbnMiLCJ1cmwiLCJlbmNvZGluZyIsImxvYWRSZXF1ZXN0RG93bmxvZGVyIiwiUmVxdWVzdCIsInJlc3BvbnNlIiwiYm9keSIsInZ0dEN1ZXMiLCJsb2FkVnR0UGFyc2VyIiwicGFyc2VyIiwiV2ViVlRUIiwiUGFyc2VyIiwiU3RyaW5nRGVjb2RlciIsIm9uY3VlIiwib25mbHVzaCIsInBhcnNlIiwibG9hZFNtaVBhcnNlciIsInBhcnNlZERhdGEiLCJTbWlQYXJzZXIiLCJmaXhlZExhbmciLCJyZXF1aXJlIiwiZXJyIiwiaXNTdXBwb3J0Iiwia2luZCIsIk1hbmFnZXIiLCJhcGkiLCJwbGF5bGlzdEluZGV4IiwiY2FwdGlvbkxpc3QiLCJjdXJyZW50Q2FwdGlvbkluZGV4IiwiY2FwdGlvbkxvYWRlciIsImlzRmlzcnRMb2FkIiwiaXNTaG93aW5nIiwiYmluZFRyYWNrIiwibGFiZWwiLCJpZCIsInRyYWNrc0NvdW50IiwidHJhY2tJZCIsInByZWZpeCIsImRlZmF1bHR0cmFjayIsImNoYW5nZUN1cnJlbnRDYXB0aW9uIiwiQ09OVEVOVF9DQVBUSU9OX0NIQU5HRUQiLCJ0cmFja3MiLCJsYW5nIiwiY2FwdGlvbklkIiwiUExBWUVSX0NBUFRJT05fRVJST1IiLCJDT05URU5UX1RJTUUiLCJtZXRhIiwiY3VycmVudEN1ZXMiLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwiQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VEIiwiZmx1c2hDYXB0aW9uTGlzdCIsImxhc3RDYXB0aW9uSW5kZXgiLCJfaW5kZXgiLCJfZW50cnkiLCJlbnRyeSIsImFycmF5Iiwic3BsaXQiLCJpZHgiLCJsaW5lIiwic3Vic3RyIiwiam9pbiIsIlNydFBhcnNlciIsImNhcHRpb25zIiwibGlzdCIsIlNUQVRFX0JVRkZFUklORyIsIlNUQVRFX0lETEUiLCJTVEFURV9DT01QTEVURSIsIlNUQVRFX1BBVVNFRCIsIlNUQVRFX1BMQVlJTkciLCJTVEFURV9FUlJPUiIsIlNUQVRFX0xPQURJTkciLCJTVEFURV9TVEFMTEVEIiwiU1RBVEVfQURfTE9BRElORyIsIlNUQVRFX0FEX0xPQURFRCIsIlNUQVRFX0FEX1BMQVlJTkciLCJTVEFURV9BRF9QQVVTRUQiLCJTVEFURV9BRF9DT01QTEVURSIsIlNUQVRFX0FEX0VSUk9SIiwiUFJPVklERVJfSFRNTDUiLCJQUk9WSURFUl9XRUJSVEMiLCJQUk9WSURFUl9EQVNIIiwiUFJPVklERVJfSExTIiwiQ09OVEVOVF9DT01QTEVURSIsIkNPTlRFTlRfU0VFSyIsIkNPTlRFTlRfQlVGRkVSX0ZVTEwiLCJESVNQTEFZX0NMSUNLIiwiQ09OVEVOVF9MT0FERUQiLCJQTEFZTElTVF9DSEFOR0VEIiwiQ09OVEVOVF9TRUVLRUQiLCJQTEFZRVJfU1RBVEUiLCJQTEFZRVJfQ09NUExFVEUiLCJQTEFZRVJfUEFVU0UiLCJQTEFZRVJfUExBWSIsIlBMQVlFUl9SRVNJWkVEIiwiUExBWUVSX0xPQURJTkciLCJQTEFZRVJfRlVMTFNDUkVFTl9SRVFVRVNUIiwiUExBWUVSX0ZVTExTQ1JFRU5fQ0hBTkdFRCIsIlBMQVlFUl9XQVJOSU5HIiwiQURfQ0hBTkdFRCIsIkFEX1RJTUUiLCJDT05URU5UX0JVRkZFUiIsIkNPTlRFTlRfUkFURV9DSEFOR0UiLCJDT05URU5UX1ZPTFVNRSIsIkNPTlRFTlRfTVVURSIsIkNPTlRFTlRfTUVUQSIsIkNPTlRFTlRfU09VUkNFX0NIQU5HRUQiLCJDT05URU5UX0xFVkVMX0NIQU5HRUQiLCJQTEFZQkFDS19SQVRFX0NIQU5HRUQiLCJPTUVfUDJQX01PREUiLCJJTklUX1JUTVBfU0VUVVBfRVJST1IiLCJJTklUX0RBU0hfVU5TVVBQT1JUIiwiSU5JVF9BRFNfRVJST1IiLCJJTklUX0RBU0hfTk9URk9VTkQiLCJJTklUX0hMU0pTX05PVEZPVU5EIiwiUExBWUVSX1VOS05XT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SIiwiUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SIiwiUExBWUVSX0ZJTEVfRVJST1IiLCJQTEFZRVJfV0VCUlRDX1dTX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19TRVRfUkVNT1RFX0RFU0NfRVJST1IiLCJQTEFZRVJfV0VCUlRDX0NSRUFURV9BTlNXRVJfRVJST1IiLCJQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19ORVRXT1JLX1NMT1ciLCJXQVJOX01TR19NVVRFRFBMQVkiLCJtZXNzYWdlIiwicmVhc29uIiwiVUlfSUNPTlMiLCJ2b2x1bWVfbXV0ZSIsImJyb3dzZXJJbmZvIiwiU1dGUGF0aCIsInJvb3RJZCIsImdldEF0dHJpYnV0ZSIsIiRjb250YWluZXIiLCJ2aWRlb0VsZW1lbnQiLCJjcmVhdGVIdG1sVmlkZW8iLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmQiLCJjcmVhdGVGbGFzaFZpZGVvIiwiYnVmZmVyVGltZSIsImJ1ZmZlclRpbWVNYXgiLCJtb3ZpZSIsImZsYXNodmFycyIsImFsbG93c2NyaXB0YWNjZXNzIiwiYWxsb3dmdWxsc2NyZWVuIiwibWVudSIsInF1YWwiLCJiZ2NvbG9yIiwid21vZGUiLCJicm93c2VyTWFqb3JWZXJzaW9uIiwiYXBwZW5kQ2hpbGQiLCJjcmVhdGVBZENvbnRhaW5lciIsImFkQ29udGFpbmVyIiwicmVtb3ZlQ2hpbGQiLCJjdXJyZW50UGxheWxpc3RJdGVtIiwiY3VycmVudEluZGV4Iiwic3VwcG9ydENoZWNrZXIiLCJtYWtlUHJldHR5U291cmNlIiwic291cmNlXyIsImhvc3QiLCJhcHBsaWNhdGlvbiIsInN0cmVhbSIsIm1pbWV0eXBlUmVnRXgiLCJ0ZXN0IiwicmVwbGFjZSIsInByZXR0aWVkUGxheWxpc3QiLCJ0aXRsZSIsImxldmVscyIsInByZXR0eVNvdXJjZSIsImRlZmF1bHRTb3VyY2UiLCJ0b1N0cmluZyIsImNvbmNhdCIsImFkVGFnVXJsIiwiQ29udHJvbGxlciIsInN1cHBvcnRDaGFja2VyIiwicmVnaXN0ZVByb3ZpZGVyIiwiUHJvdmlkZXJMb2FkZXIiLCJodG1sNSIsIkVycm9yIiwid2VicnRjIiwiZGFzaCIsInJ0bXAiLCJzdXBwb3J0ZWRQcm92aWRlck5hbWVzIiwiUHJvbWlzZSIsInJlamVjdCIsImZpbmRCeU5hbWUiLCJnZXRQcm92aWRlckJ5U291cmNlIiwic3VwcG9ydGVkUHJvdmlkZXJOYW1lIiwiX193ZWJwYWNrX3B1YmxpY19wYXRoX18iLCJwbGF5ZXJMaXN0IiwiY2hlY2tBbmRHZXRDb250YWluZXJFbGVtZW50IiwiY29udGFpbmVyRWxlbWVudCIsImdldEVsZW1lbnRCeUlkIiwibm9kZVR5cGUiLCJjcmVhdGUiLCJwbGF5ZXJJbnN0YW5jZSIsImdldFBsYXllckJ5Q29udGFpbmVySWQiLCJjb250YWluZXJJZCIsImdldFBsYXllckJ5SW5kZXgiLCJwbGF5ZXJJZCIsImdlbmVyYXRlV2VicnRjVXJscyIsImRlYnVnIiwiaXNEZWJ1Z01vZGUiLCJnZXRCcm93c2VyTGFuZ3VhZ2UiLCJuYXYiLCJicm93c2VyTGFuZ3VhZ2VQcm9wZXJ0eUtleXMiLCJsYW5ndWFnZXMiLCJhbmFsVXNlckFnZW50IiwidW5rbm93biIsInNjcmVlblNpemUiLCJzY3JlZW4iLCJ3aWR0aCIsImhlaWdodCIsIm5WZXIiLCJhcHBWZXJzaW9uIiwibkFndCIsInVzZXJBZ2VudCIsImFwcE5hbWUiLCJtYWpvclZlcnNpb24iLCJwYXJzZUludCIsImlzV2VidmlldyIsIm5hbWVPZmZzZXQiLCJ2ZXJPZmZzZXQiLCJpeCIsInN1YnN0cmluZyIsImxhc3RJbmRleE9mIiwidG9VcHBlckNhc2UiLCJtb2JpbGUiLCJjb29raWVFbmFibGVkIiwiY29va2llIiwiY2xpZW50U3RyaW5ncyIsInMiLCJyIiwiY3MiLCJvc1ZlcnNpb24iLCJleGVjIiwiZmxhc2hWZXJzaW9uIiwic3dmb2JqZWN0IiwiZnYiLCJnZXRGbGFzaFBsYXllclZlcnNpb24iLCJtYWpvciIsIm1pbm9yIiwicmVsZWFzZSIsImJyb3dzZXJWZXJzaW9uIiwidWEiLCJjb29raWVzIiwid2VidmlldyIsImF1dG9LZXl3b3JkIiwiZGlyZWN0aW9uU2V0dGluZyIsImFsaWduU2V0dGluZyIsImZpbmREaXJlY3Rpb25TZXR0aW5nIiwiZGlyIiwiZmluZEFsaWduU2V0dGluZyIsImFsaWduIiwiZXh0ZW5kIiwiY29iaiIsInAiLCJpc0lFOCIsImJhc2VPYmoiLCJlbnVtZXJhYmxlIiwiaGFzQmVlblJlc2V0IiwiX2lkIiwiX3BhdXNlT25FeGl0IiwiX3N0YXJ0VGltZSIsIl9lbmRUaW1lIiwiX3RleHQiLCJfcmVnaW9uIiwiX3ZlcnRpY2FsIiwiX3NuYXBUb0xpbmVzIiwiX2xpbmUiLCJfbGluZUFsaWduIiwiX3Bvc2l0aW9uIiwiX3Bvc2l0aW9uQWxpZ24iLCJfc2l6ZSIsIl9hbGlnbiIsImRlZmluZVByb3BlcnR5IiwiZ2V0Iiwic2V0IiwiVHlwZUVycm9yIiwic2V0dGluZyIsIlN5bnRheEVycm9yIiwiZGlzcGxheVN0YXRlIiwiZ2V0Q3VlQXNIVE1MIiwiY29udmVydEN1ZVRvRE9NVHJlZSIsIkxhJCIsInNlbGVjdG9yT3JFbGVtZW50IiwicmV0dXJuTm9kZSIsIiRlbGVtZW50Iiwic2VsZWN0b3IiLCJub2RlTGlzdCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpc0VsZW1lbnQiLCJldmVyeSIsImZpbmQiLCJjc3MiLCJlbGVtZW50Iiwic3R5bGUiLCJhZGRDbGFzcyIsImNsYXNzTGlzdCIsImFkZCIsImNsYXNzTmFtZXMiLCJjbGFzc05hbWUiLCJyZW1vdmVDbGFzcyIsIlJlZ0V4cCIsInJlbW92ZUF0dHJpYnV0ZSIsImF0dHJOYW1lIiwic2hvdyIsImRpc3BsYXkiLCJoaWRlIiwidGV4dENvbnRlbnQiLCJodG1sIiwiaW5uZXJIVE1MIiwiaGFzQ2xhc3MiLCJjb250YWlucyIsImlzIiwiJHRhcmdldEVsZW1lbnQiLCJvZmZzZXQiLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwidG9wIiwic2Nyb2xsVG9wIiwibGVmdCIsInNjcm9sbExlZnQiLCJjbGllbnRXaWR0aCIsImNsaWVudEhlaWdodCIsImF0dHIiLCJyZXBsYWNlV2l0aCIsInBhcmVudEVsZW1lbnQiLCJoYXNDaGlsZE5vZGVzIiwiZmlyc3RDaGlsZCIsImNsb3Nlc3QiLCJzZWxlY3RvclN0cmluZyIsImNsb3Nlc3RFbGVtZW50IiwidHJpbSIsIm5hdHVyYWxIbXMiLCJobXNUb1NlY29uZCIsInN0cmluZyIsImV4dHJhY3RFeHRlbnNpb24iLCJwYXRoIiwiZ2V0QXp1cmVGaWxlRm9ybWF0IiwiZXh0ZW5zaW9uIiwiYXp1cmVkRm9ybWF0Iiwic2Vjb25kIiwic2VjTnVtIiwiaG91cnMiLCJmbG9vciIsIm1pbnV0ZXMiLCJzZWNvbmRzIiwic3RyIiwiZnJhbWVSYXRlIiwiYXJyIiwiYXJyTGVuZ3RoIiwic2VjIiwic2VjSW5kZXgiLCJuIiwic2VsZiIsImdsb2JhbCIsIm8iLCJTeW1ib2wiLCJ1IiwiYyIsImhhc093blByb3BlcnR5IiwidCIsImEiLCJmIiwiaCIsIl93cmFwcGVkIiwiZXhwb3J0cyIsIm1vZHVsZSIsIlZFUlNJT04iLCJ2IiwieSIsImQiLCJpdGVyYXRlZSIsImlkZW50aXR5IiwiaXNGdW5jdGlvbiIsImlzT2JqZWN0IiwibWF0Y2hlciIsInByb3BlcnR5IiwiZyIsIm1heCIsIm0iLCJiIiwieCIsInBvdyIsIkEiLCJ3IiwiZWFjaCIsImNvbGxlY3QiLCJPIiwicmVkdWNlIiwiZm9sZGwiLCJpbmplY3QiLCJyZWR1Y2VSaWdodCIsImZvbGRyIiwiZGV0ZWN0IiwiZmluZEtleSIsInNlbGVjdCIsIm5lZ2F0ZSIsInNvbWUiLCJhbnkiLCJpbmNsdWRlcyIsImluY2x1ZGUiLCJ2YWx1ZXMiLCJpbnZva2UiLCJwbHVjayIsIndoZXJlIiwibWluIiwic2h1ZmZsZSIsInNhbXBsZSIsInJhbmRvbSIsImNsb25lIiwic29ydEJ5IiwiY3JpdGVyaWEiLCJncm91cEJ5IiwiaW5kZXhCeSIsImNvdW50QnkiLCJTIiwidG9BcnJheSIsImlzU3RyaW5nIiwibWF0Y2giLCJzaXplIiwicGFydGl0aW9uIiwiZmlyc3QiLCJoZWFkIiwidGFrZSIsImluaXRpYWwiLCJsYXN0IiwicmVzdCIsInRhaWwiLCJkcm9wIiwiY29tcGFjdCIsIkJvb2xlYW4iLCJNIiwiaXNBcmd1bWVudHMiLCJmbGF0dGVuIiwid2l0aG91dCIsImRpZmZlcmVuY2UiLCJ1bmlxIiwidW5pcXVlIiwiaXNCb29sZWFuIiwidW5pb24iLCJpbnRlcnNlY3Rpb24iLCJ1bnppcCIsInppcCIsIkYiLCJmaW5kTGFzdEluZGV4Iiwic29ydGVkSW5kZXgiLCJFIiwicmFuZ2UiLCJjZWlsIiwiY2h1bmsiLCJOIiwiYmluZCIsInBhcnRpYWwiLCJwbGFjZWhvbGRlciIsImJpbmRBbGwiLCJtZW1vaXplIiwiY2FjaGUiLCJkZWxheSIsInNldFRpbWVvdXQiLCJkZWZlciIsInRocm90dGxlIiwibGVhZGluZyIsIm5vdyIsImNsZWFyVGltZW91dCIsInRyYWlsaW5nIiwiY2FuY2VsIiwiZGVib3VuY2UiLCJ3cmFwIiwiY29tcG9zZSIsImFmdGVyIiwiYmVmb3JlIiwicmVzdEFyZ3VtZW50cyIsIkkiLCJwcm9wZXJ0eUlzRW51bWVyYWJsZSIsIlQiLCJCIiwiY29uc3RydWN0b3IiLCJhbGxLZXlzIiwibWFwT2JqZWN0IiwicGFpcnMiLCJpbnZlcnQiLCJmdW5jdGlvbnMiLCJtZXRob2RzIiwiUiIsImV4dGVuZE93biIsImFzc2lnbiIsInEiLCJLIiwieiIsIm9taXQiLCJTdHJpbmciLCJkZWZhdWx0cyIsInRhcCIsImlzTWF0Y2giLCJ2YWx1ZU9mIiwicG9wIiwiaXNFcXVhbCIsImlzRW1wdHkiLCJEIiwiY2hpbGROb2RlcyIsIkludDhBcnJheSIsImlzRmluaXRlIiwiaXNTeW1ib2wiLCJpc051bGwiLCJpc1VuZGVmaW5lZCIsImhhcyIsIm5vQ29uZmxpY3QiLCJjb25zdGFudCIsIm5vb3AiLCJwcm9wZXJ0eU9mIiwibWF0Y2hlcyIsInRpbWVzIiwiRGF0ZSIsImdldFRpbWUiLCJMIiwiUCIsIlciLCJlc2NhcGUiLCJ1bmVzY2FwZSIsIkMiLCJ1bmlxdWVJZCIsInRlbXBsYXRlU2V0dGluZ3MiLCJldmFsdWF0ZSIsImludGVycG9sYXRlIiwiSiIsIlUiLCJWIiwiJCIsInRlbXBsYXRlIiwidmFyaWFibGUiLCJGdW5jdGlvbiIsImNoYWluIiwiX2NoYWluIiwiRyIsIm1peGluIiwidG9KU09OIiwiZGVmaW5lIiwiaXNSdG1wIiwiaXNXZWJSVEMiLCJpc0hscyIsImlzRGFzaCIsImdldFNjcmlwdFBhdGgiLCJzY3JpcHROYW1lIiwic2NyaXB0cyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwic3JjIiwiX19WRVJTSU9OX18iXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGdCQUFRLG9CQUFvQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQSxpREFBeUMsczRCQUFzNEI7QUFDLzZCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QWhCO0FBQ0EsU0FBSyxJQUFJaHpCLElBQUksQ0FBYixFQUFnQkEsSUFBSSt5QixRQUFROXlCLE1BQTVCLEVBQW9DRCxHQUFwQyxFQUF5QztBQUNyQyxZQUFNaXpCLE1BQU1GLFFBQVEveUIsQ0FBUixFQUFXaXpCLEdBQXZCO0FBQ0EsWUFBSUEsR0FBSixFQUFTO0FBQ0wsZ0JBQU1qMEIsUUFBUWkwQixJQUFJbFUsV0FBSixDQUFnQixNQUFNK1QsVUFBdEIsQ0FBZDtBQUNBLGdCQUFJOXpCLFNBQVMsQ0FBYixFQUFnQjtBQUNaLHVCQUFPaTBCLElBQUl6ZSxNQUFKLENBQVcsQ0FBWCxFQUFjeFYsUUFBUSxDQUF0QixDQUFQO0FBQ0g7QUFDSjtBQUNKO0FBQ0QsV0FBTyxFQUFQO0FBQ0gsQ0FaTSxDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0pQOzs7QUFHTyxJQUFNWCw0QkFBVTYwQixzQkFBaEIsQyIsImZpbGUiOiJvdmVucGxheWVyLnNkay5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuXG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdH07XG5cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwib3ZlbnBsYXllci5zZGtcIjogMFxuIFx0fTtcblxuXG5cbiBcdC8vIHNjcmlwdCBwYXRoIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBqc29ucFNjcmlwdFNyYyhjaHVua0lkKSB7XG4gXHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgKHtcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IdG1sNX5vdmVucGxheWV+MmVjMTkzYWNcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IdG1sNX5vdmVucGxheWV+MmVjMTkzYWNcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IdG1sNX5vdmVucGxheWV+N2FmZDY4Y2ZcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IdG1sNX5vdmVucGxheWV+N2FmZDY4Y2ZcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlclwiLFwib3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlclwiOlwib3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlclwiLFwib3ZlbnBsYXllci5wcm92aWRlci5IdG1sNVwiOlwib3ZlbnBsYXllci5wcm92aWRlci5IdG1sNVwiLFwib3ZlbnBsYXllci5wcm92aWRlci5XZWJSVENQcm92aWRlclwiOlwib3ZlbnBsYXllci5wcm92aWRlci5XZWJSVENQcm92aWRlclwiLFwib3ZlbnBsYXllci5wcm92aWRlci5SdG1wUHJvdmlkZXJcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuUnRtcFByb3ZpZGVyXCIsXCJzbWlwYXJzZXJcIjpcInNtaXBhcnNlclwiLFwidmVuZG9yc35kb3dubG9hZGVyXCI6XCJ2ZW5kb3JzfmRvd25sb2FkZXJcIixcImRvd25sb2FkZXJcIjpcImRvd25sb2FkZXJcIixcInZ0dHBhcnNlclwiOlwidnR0cGFyc2VyXCJ9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLmpzXCJcbiBcdH1cblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCkge1xuIFx0XHR2YXIgcHJvbWlzZXMgPSBbXTtcblxuXG4gXHRcdC8vIEpTT05QIGNodW5rIGxvYWRpbmcgZm9yIGphdmFzY3JpcHRcblxuIFx0XHR2YXIgaW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIHsgLy8gMCBtZWFucyBcImFscmVhZHkgaW5zdGFsbGVkXCIuXG5cbiBcdFx0XHQvLyBhIFByb21pc2UgbWVhbnMgXCJjdXJyZW50bHkgbG9hZGluZ1wiLlxuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0pO1xuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHQvLyBzZXR1cCBQcm9taXNlIGluIGNodW5rIGNhY2hlXG4gXHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XTtcbiBcdFx0XHRcdH0pO1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0gPSBwcm9taXNlKTtcblxuIFx0XHRcdFx0Ly8gc3RhcnQgY2h1bmsgbG9hZGluZ1xuIFx0XHRcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuIFx0XHRcdFx0dmFyIG9uU2NyaXB0Q29tcGxldGU7XG5cbiBcdFx0XHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04JztcbiBcdFx0XHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuIFx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcbiBcdFx0XHRcdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c2NyaXB0LnNyYyA9IGpzb25wU2NyaXB0U3JjKGNodW5rSWQpO1xuXG4gXHRcdFx0XHRvblNjcmlwdENvbXBsZXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gXHRcdFx0XHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cbiBcdFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gbnVsbDtcbiBcdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuIFx0XHRcdFx0XHR2YXIgY2h1bmsgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdFx0XHRcdGlmKGNodW5rICE9PSAwKSB7XG4gXHRcdFx0XHRcdFx0aWYoY2h1bmspIHtcbiBcdFx0XHRcdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG4gXHRcdFx0XHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuIFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCdMb2FkaW5nIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJyk7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci50eXBlID0gZXJyb3JUeXBlO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG4gXHRcdFx0XHRcdFx0XHRjaHVua1sxXShlcnJvcik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fTtcbiBcdFx0XHRcdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuIFx0XHRcdFx0XHRvblNjcmlwdENvbXBsZXRlKHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KTtcbiBcdFx0XHRcdH0sIDEyMDAwMCk7XG4gXHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlO1xuIFx0XHRcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBvbiBlcnJvciBmdW5jdGlvbiBmb3IgYXN5bmMgbG9hZGluZ1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikgeyBjb25zb2xlLmVycm9yKGVycik7IHRocm93IGVycjsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9qcy9vdmVucGxheWVyLnNkay5qc1wiKTtcbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdGlmICghbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxuXHRcdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcblx0fVxuXHRyZXR1cm4gbW9kdWxlO1xufTtcbiIsImltcG9ydCBDYXB0aW9uTWFuYWdlciBmcm9tIFwiYXBpL2NhcHRpb24vTWFuYWdlclwiO1xuaW1wb3J0IENvbmZpZ3VyYXRvciBmcm9tIFwiYXBpL0NvbmZpZ3VyYXRvclwiO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiYXBpL0V2ZW50RW1pdHRlclwiO1xuaW1wb3J0IExhenlDb21tYW5kRXhlY3V0b3IgZnJvbSBcImFwaS9MYXp5Q29tbWFuZEV4ZWN1dG9yXCI7XG5pbXBvcnQgTWVkaWFNYW5hZ2VyIGZyb20gXCJhcGkvbWVkaWEvTWFuYWdlclwiO1xuaW1wb3J0IFBsYXlsaXN0TWFuYWdlciBmcm9tIFwiYXBpL3BsYXlsaXN0L01hbmFnZXJcIjtcbmltcG9ydCBQcm92aWRlckNvbnRyb2xsZXIgZnJvbSBcImFwaS9wcm92aWRlci9Db250cm9sbGVyXCI7XG5pbXBvcnQge1JFQURZLCBFUlJPUlMsIEVSUk9SLCBDT05URU5UX1RJTUVfTU9ERV9DSEFOR0VELCBJTklUX1VOS05XT05fRVJST1IsIElOSVRfVU5TVVBQT1JUX0VSUk9SLCBERVNUUk9ZLCBORVRXT1JLX1VOU1RBQkxFRCxcbiAgICBQTEFZRVJfRklMRV9FUlJPUiwgUFJPVklERVJfREFTSCwgUFJPVklERVJfSExTLCBQUk9WSURFUl9XRUJSVEMsIFBST1ZJREVSX0hUTUw1LCBQUk9WSURFUl9SVE1QLCBBTExfUExBWUxJU1RfRU5ERUR9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5pbXBvcnQge3ZlcnNpb259IGZyb20gJ3ZlcnNpb24nO1xuaW1wb3J0IHtBcGlSdG1wRXhwYW5zaW9ufSBmcm9tICdhcGkvQXBpRXhwYW5zaW9ucyc7XG5pbXBvcnQge2FuYWxVc2VyQWdlbnR9IGZyb20gXCJ1dGlscy9icm93c2VyXCI7XG5pbXBvcnQgTEEkIGZyb20gJ3V0aWxzL2xpa2VBJCc7XG5cbi8qKlxuICogQGJyaWVmICAgVGhpcyBvYmplY3QgY29ubmVjdHMgVUkgdG8gdGhlIHByb3ZpZGVyLlxuICogQHBhcmFtICAge29iamVjdH0gICAgY29udGFpbmVyICBkb20gZWxlbWVudFxuICpcbiAqICovXG5cbmNvbnN0IEFwaSA9IGZ1bmN0aW9uKGNvbnRhaW5lcil7XG4gICAgY29uc3QgdGhhdCA9IHt9O1xuICAgIEV2ZW50RW1pdHRlcih0aGF0KTtcblxuXG4gICAgY29uc29sZS5sb2coXCJbW092ZW5QbGF5ZXJdXSB2LlwiKyB2ZXJzaW9uKTtcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgbG9hZGVkLlwiKTtcblxuICAgIGxldCBwbGF5bGlzdE1hbmFnZXIgPSBQbGF5bGlzdE1hbmFnZXIodGhhdCk7XG4gICAgbGV0IHByb3ZpZGVyQ29udHJvbGxlciA9IFByb3ZpZGVyQ29udHJvbGxlcigpO1xuICAgIGxldCB1c2VyQWdlbnRPYmplY3QgPSBhbmFsVXNlckFnZW50KCk7XG4gICAgbGV0IG1lZGlhTWFuYWdlciA9IE1lZGlhTWFuYWdlcihjb250YWluZXIsIHVzZXJBZ2VudE9iamVjdCk7XG4gICAgbGV0IGN1cnJlbnRQcm92aWRlciA9IFwiXCI7XG4gICAgbGV0IHBsYXllckNvbmZpZyA9IFwiXCI7XG4gICAgbGV0IGxhenlRdWV1ZSA9IFwiXCI7XG4gICAgbGV0IGNhcHRpb25NYW5hZ2VyID0gXCJcIjtcblxuXG4gICAgY29uc3QgcnVuTmV4dFBsYXlsaXN0ID0gZnVuY3Rpb24oaW5kZXgpe1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJydW5OZXh0UGxheWxpc3RcIik7XG4gICAgICAgIGxldCBuZXh0UGxheWxpc3RJbmRleCA9IGluZGV4OyAvLyB8fCBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFBsYXlsaXN0SW5kZXgoKSArIDE7XG4gICAgICAgIGxldCBwbGF5bGlzdCA9IHBsYXlsaXN0TWFuYWdlci5nZXRQbGF5bGlzdCgpO1xuICAgICAgICBsZXQgaGFzTmV4dFBsYXlsaXN0ID0gcGxheWxpc3RbbmV4dFBsYXlsaXN0SW5kZXhdPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIC8vaW5pdCBzb3VyY2UgaW5kZXhcbiAgICAgICAgcGxheWVyQ29uZmlnLnNldFNvdXJjZUluZGV4KDApO1xuICAgICAgICBpZihoYXNOZXh0UGxheWxpc3Qpe1xuICAgICAgICAgICAgLy90aGF0LnBhdXNlKCk7XG4gICAgICAgICAgICBsYXp5UXVldWUgPSBMYXp5Q29tbWFuZEV4ZWN1dG9yKHRoYXQsIFsncGxheScsJ3NlZWsnLCdzdG9wJ10pO1xuICAgICAgICAgICAgcGxheWxpc3RNYW5hZ2VyLnNldEN1cnJlbnRQbGF5bGlzdChuZXh0UGxheWxpc3RJbmRleCk7XG4gICAgICAgICAgICBpbml0UHJvdmlkZXIoKTtcblxuXG4gICAgICAgICAgICBpZighcGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpe1xuICAgICAgICAgICAgICAgIC8vQW55d2F5IG5leHRwbGF5bGlzdCBydW5zIGF1dG9TdGFydCEuXG4gICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgLy9BbGwgUGxheWxpc3QgRW5kZWQuXG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoQUxMX1BMQVlMSVNUX0VOREVELCBudWxsKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgaW5pdFByb3ZpZGVyID0gZnVuY3Rpb24obGFzdFBsYXlQb3NpdGlvbil7XG4gICAgICAgIGNvbnN0IHBpY2tRdWFsaXR5RnJvbVNvdXJjZSA9IChzb3VyY2VzKSA9PntcbiAgICAgICAgICAgIHZhciBxdWFsaXR5ID0gMDtcbiAgICAgICAgICAgIGlmIChzb3VyY2VzKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3VyY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzb3VyY2VzW2ldLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1YWxpdHkgPSBpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0U291cmNlSW5kZXgoKSA9PT0gaSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8qaWYgKHBsYXllckNvbmZpZy5nZXRTb3VyY2VMYWJlbCgpICYmIHNvdXJjZXNbaV0ubGFiZWwgPT09IHBsYXllckNvbmZpZy5nZXRTb3VyY2VMYWJlbCgpICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICAgICAgICAgIH0qL1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBxdWFsaXR5O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBwcm92aWRlckNvbnRyb2xsZXIubG9hZFByb3ZpZGVycyhwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFBsYXlMaXN0KCkpLnRoZW4oUHJvdmlkZXJzID0+IHtcbiAgICAgICAgICAgIGlmKFByb3ZpZGVycy5sZW5ndGggPCAxKXtcbiAgICAgICAgICAgICAgICB0aHJvdyBFUlJPUlNbSU5JVF9VTlNVUFBPUlRfRVJST1JdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihjdXJyZW50UHJvdmlkZXIpe1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGNhcHRpb25NYW5hZ2VyKXtcbiAgICAgICAgICAgICAgICBjYXB0aW9uTWFuYWdlci5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgY2FwdGlvbk1hbmFnZXIgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FwdGlvbk1hbmFnZXIgPSBDYXB0aW9uTWFuYWdlcih0aGF0LCBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFBsYXlsaXN0SW5kZXgoKSk7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpbml0KCkgY2FwdGlvbnNcIik7XG5cbiAgICAgICAgICAgIGxldCBjdXJyZW50U291cmNlSW5kZXggPSBwaWNrUXVhbGl0eUZyb21Tb3VyY2UocGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRTb3VyY2VzKCkpO1xuICAgICAgICAgICAgbGV0IHByb3ZpZGVyTmFtZSA9IFByb3ZpZGVyc1tjdXJyZW50U291cmNlSW5kZXhdW1wibmFtZVwiXTtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGluaXQoKSBwcm92aWRlclwiLCBwcm92aWRlck5hbWUpO1xuICAgICAgICAgICAgLy9Jbml0IFByb3ZpZGVyLlxuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyID0gIFByb3ZpZGVyc1tjdXJyZW50U291cmNlSW5kZXhdLnByb3ZpZGVyKFxuICAgICAgICAgICAgICAgIG1lZGlhTWFuYWdlci5jcmVhdGVNZWRpYShwcm92aWRlck5hbWUsIHBsYXllckNvbmZpZyksXG4gICAgICAgICAgICAgICAgcGxheWVyQ29uZmlnLFxuICAgICAgICAgICAgICAgIHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50QWRUYWcoKVxuICAgICAgICAgICAgKTtcblxuXG5cbiAgICAgICAgICAgIGlmKHByb3ZpZGVyTmFtZSA9PT0gUFJPVklERVJfUlRNUCl7XG4gICAgICAgICAgICAgICAgLy9JZiBwcm92aWRlciB0eXBlIGlzIFJUTVAsIHdlIGFjY2VwdHMgUnRtcEV4cGFuc2lvbi5cbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoYXQsIEFwaVJ0bXBFeHBhbnNpb24oY3VycmVudFByb3ZpZGVyKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vVGhpcyBwYXNzZXMgdGhlIGV2ZW50IGNyZWF0ZWQgYnkgdGhlIFByb3ZpZGVyIHRvIEFQSS5cbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5vbihcImFsbFwiLCBmdW5jdGlvbihuYW1lLCBkYXRhKXtcblxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihuYW1lLCBkYXRhKTtcblxuICAgICAgICAgICAgICAgIGlmKG5hbWUgPT09IFwiY29tcGxldGVcIil7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ29tcGxldGVcIik7XG4gICAgICAgICAgICAgICAgICAgIHJ1bk5leHRQbGF5bGlzdChwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFBsYXlsaXN0SW5kZXgoKSArIDEpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vQXV0byBzd2l0Y2hpbmcgbmV4dCBzb3VyY2Ugd2hlbiBwbGF5ZXIgbG9hZCBmYWlsZWQgYnkgYW1pc3Mgc291cmNlLlxuICAgICAgICAgICAgICAgIC8vZGF0YS5jb2RlID09PSBQTEFZRVJfRklMRV9FUlJPUlxuICAgICAgICAgICAgICAgIGlmKCBuYW1lID09PSBFUlJPUiB8fCBuYW1lID09PSBORVRXT1JLX1VOU1RBQkxFRCApe1xuICAgICAgICAgICAgICAgICAgICAvL2xldCBjdXJyZW50U291cmNlSW5kZXggPSB0aGF0LmdldEN1cnJlbnRTb3VyY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmdldFNvdXJjZUluZGV4KCkrMSA8IHRoYXQuZ2V0U291cmNlcygpLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMgc2VxdWVudGlhbCBoYXMgYXZhaWxhYmxlIHNvdXJjZS5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGF1c2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0Q3VycmVudFNvdXJjZShwbGF5ZXJDb25maWcuZ2V0U291cmNlSW5kZXgoKSsxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pLnRoZW4oKCk9PntcblxuICAgICAgICAgICAgLy9wcm92aWRlcidzIHByZWxvYWQoKSBoYXZlIHRvIG1hZGUgUHJvbWlzZS4gQ3V6IGl0IG92ZXJjb21lcyAnZmxhc2ggbG9hZGluZyB0aW1pbmcgcHJvYmxlbScuXG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIucHJlbG9hZChwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKSwgbGFzdFBsYXlQb3NpdGlvbikudGhlbihmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihSRUFEWSk7XG5cbiAgICAgICAgICAgICAgICBsYXp5UXVldWUuZmx1c2goKTtcbiAgICAgICAgICAgICAgICAvL1RoaXMgaXMgbm8gcmVhc29uIHRvIGV4aXN0IGFueW1vcmUuXG4gICAgICAgICAgICAgICAgbGF6eVF1ZXVlLmRlc3Ryb3koKTtcblxuICAgICAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgbGF6eVF1ZXVlLm9mZigpO1xuICAgICAgICAgICAgICAgIGlmKGVycm9yICYmIGVycm9yLmNvZGUgJiYgRVJST1JTW2Vycm9yLmNvZGVdKXtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKEVSUk9SLCBFUlJPUlNbZXJyb3IuY29kZV0pO1xuICAgICAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SU1tJTklUX1VOS05XT05fRVJST1JdO1xuICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKEVSUk9SLCB0ZW1wRXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIC8vSU5JVCBFUlJPUlxuICAgICAgICAgICAgaWYoZXJyb3IgJiYgZXJyb3IuY29kZSAmJiBFUlJPUlNbZXJyb3IuY29kZV0pe1xuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihFUlJPUiwgRVJST1JTW2Vycm9yLmNvZGVdKTtcbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTW0lOSVRfVU5LTldPTl9FUlJPUl07XG4gICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKEVSUk9SLCB0ZW1wRXJyb3IpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL3h4eCA6IElmIHlvdSBpbml0IGVtcHR5IHNvdXJjZXMuIChJIHRoaW5rIHRoaXMgaXMgc3RyYW5nZSBjYXNlLilcbiAgICAgICAgICAgIC8vVGhpcyB3b3JrcyBmb3IgdGhpcyBjYXNlLlxuICAgICAgICAgICAgLy9wbGF5ZXIgPSBPdmVuUGxheWVyLmNyZWF0ZShcImVsSWRcIiwge30pO1xuICAgICAgICAgICAgLy9wbGF5ZXIubG9hZChzb3J1Y2VzKTtcbiAgICAgICAgICAgIGxhenlRdWV1ZS5vZmYoKTtcbiAgICAgICAgICAgIC8vbGF6eVF1ZXVlLnJlbW92ZUFuZEV4Y3V0ZU9uY2UoXCJsb2FkXCIpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBBUEkg7LSI6riw7ZmUIO2VqOyImFxuICAgICAqIGluaXRcbiAgICAgKiBAcGFyYW0gICAgICB7b2JqZWN0fSBvcHRpb25zIHBsYXllciBpbml0aWFsIG9wdGlvbiB2YWx1ZS5cbiAgICAgKiBAcmV0dXJuc1xuICAgICAqKi9cbiAgICB0aGF0LmluaXQgPSAob3B0aW9ucykgPT57XG4gICAgICAgIC8vSXQgY29sbGVjdHMgdGhlIGNvbW1hbmRzIGFuZCBleGVjdXRlcyB0aGVtIGF0IHRoZSB0aW1lIHdoZW4gdGhleSBhcmUgZXhlY3V0YWJsZS5cbiAgICAgICAgbGF6eVF1ZXVlID0gTGF6eUNvbW1hbmRFeGVjdXRvcih0aGF0LCBbXG4gICAgICAgICAgICAnbG9hZCcsJ3BsYXknLCdwYXVzZScsJ3NlZWsnLCdzdG9wJywgJ2dldER1cmF0aW9uJywgJ2dldFBvc2l0aW9uJywgJ2dldFZvbHVtZSdcbiAgICAgICAgICAgICwgJ2dldE11dGUnLCAnZ2V0QnVmZmVyJywgJ2dldFN0YXRlJyAsICdnZXRRdWFsaXR5TGV2ZWxzJ1xuICAgICAgICBdKTtcbiAgICAgICAgb3B0aW9ucy5tZWRpYUNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICAgICAgb3B0aW9ucy5icm93c2VyID0gdXNlckFnZW50T2JqZWN0O1xuICAgICAgICBwbGF5ZXJDb25maWcgPSBDb25maWd1cmF0b3Iob3B0aW9ucywgdGhhdCk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGluaXQoKVwiKTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaW5pdCgpIGNvbmZpZyA6IFwiLCBwbGF5ZXJDb25maWcpO1xuXG4gICAgICAgIHBsYXlsaXN0TWFuYWdlci5pbml0UGxheWxpc3QocGxheWVyQ29uZmlnLmdldFBsYXlsaXN0KCkpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpbml0KCkgc291cmNlcyA6IFwiICwgcGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRTb3VyY2VzKCkpO1xuXG4gICAgICAgIGluaXRQcm92aWRlcigpO1xuICAgIH07XG4gICAgdGhhdC5nZXRQcm92aWRlck5hbWUgPSAoKSA9PiB7XG4gICAgICAgIGlmKGN1cnJlbnRQcm92aWRlcil7XG4gICAgICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldE5hbWUoKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIHRoYXQuZ2V0Q29uZmlnID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRDb25maWcoKVwiLCBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkpO1xuICAgICAgICByZXR1cm4gcGxheWVyQ29uZmlnLmdldENvbmZpZygpO1xuICAgIH07XG4gICAgdGhhdC5nZXRCcm93c2VyID0gKCkgPT4ge1xuXG4gICAgICAgIHJldHVybiBwbGF5ZXJDb25maWcuZ2V0QnJvd3NlcigpO1xuICAgIH07XG4gICAgdGhhdC5zZXRUaW1lY29kZU1vZGUgPSAoaXNTaG93KSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0VGltZWNvZGVNb2RlKClcIiwgaXNTaG93KTtcbiAgICAgICAgcGxheWVyQ29uZmlnLnNldFRpbWVjb2RlTW9kZShpc1Nob3cpO1xuICAgIH07XG4gICAgdGhhdC5pc1RpbWVjb2RlTW9kZSA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaXNUaW1lY29kZU1vZGUoKVwiKTtcbiAgICAgICAgcmV0dXJuIHBsYXllckNvbmZpZy5pc1RpbWVjb2RlTW9kZSgpO1xuICAgIH07XG4gICAgdGhhdC5nZXRGcmFtZXJhdGUgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEZyYW1lcmF0ZSgpXCIpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldEZyYW1lcmF0ZSgpO1xuICAgIH07XG4gICAgdGhhdC5zZWVrRnJhbWUgPSAoZnJhbWVDb3VudCkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNlZWtGcmFtZSgpXCIsIGZyYW1lQ291bnQpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLnNlZWtGcmFtZShmcmFtZUNvdW50KTtcbiAgICB9O1xuXG4gICAgdGhhdC5nZXREdXJhdGlvbiA9ICgpID0+IHtcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXREdXJhdGlvbigpXCIsIGN1cnJlbnRQcm92aWRlci5nZXREdXJhdGlvbigpKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXREdXJhdGlvbigpO1xuICAgIH07XG4gICAgdGhhdC5nZXRQb3NpdGlvbiA9ICgpID0+IHtcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFBvc2l0aW9uKClcIiwgY3VycmVudFByb3ZpZGVyLmdldFBvc2l0aW9uKCkpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFBvc2l0aW9uKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldFZvbHVtZSA9ICgpID0+IHtcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFZvbHVtZSgpXCIsIGN1cnJlbnRQcm92aWRlci5nZXRWb2x1bWUoKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0Vm9sdW1lKCk7XG4gICAgfTtcbiAgICB0aGF0LnNldFZvbHVtZSA9ICh2b2x1bWUpID0+IHtcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldFZvbHVtZSgpIFwiICsgdm9sdW1lKTtcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnNldFZvbHVtZSh2b2x1bWUpO1xuICAgIH07XG4gICAgdGhhdC5zZXRNdXRlID0gKHN0YXRlKSA9PiB7XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRNdXRlKCkgXCIgKyBzdGF0ZSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2V0TXV0ZShzdGF0ZSk7XG4gICAgfTtcbiAgICB0aGF0LmdldE11dGUgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRNdXRlKCkgXCIgKyBjdXJyZW50UHJvdmlkZXIuZ2V0TXV0ZSgpKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRNdXRlKCk7XG4gICAgfTtcbiAgICB0aGF0LmxvYWQgPSAocGxheWxpc3QpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogbG9hZCgpIFwiLCBwbGF5bGlzdCk7XG4gICAgICAgIGxhenlRdWV1ZSA9IExhenlDb21tYW5kRXhlY3V0b3IodGhhdCwgWydwbGF5Jywnc2VlaycsJ3N0b3AnXSk7XG5cbiAgICAgICAgaWYocGxheWxpc3Qpe1xuICAgICAgICAgICAgaWYoY3VycmVudFByb3ZpZGVyKXtcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIuc2V0Q3VycmVudFF1YWxpdHkoMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwbGF5bGlzdE1hbmFnZXIuaW5pdFBsYXlsaXN0KHBsYXlsaXN0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5pdFByb3ZpZGVyKCk7XG5cbiAgICB9O1xuICAgIHRoYXQucGxheSA9ICgpID0+IHtcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBwbGF5KCkgXCIpO1xuICAgICAgICBjdXJyZW50UHJvdmlkZXIucGxheSgpO1xuICAgIH1cbiAgICB0aGF0LnBhdXNlID0gKCkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcGF1c2UoKSBcIik7XG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5wYXVzZSgpO1xuICAgIH07XG4gICAgdGhhdC5zZWVrID0gKHBvc2l0aW9uKSA9PiB7XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZWVrKCkgXCIrIHBvc2l0aW9uKTtcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnNlZWsocG9zaXRpb24pO1xuICAgIH07XG4gICAgdGhhdC5zZXRQbGF5YmFja1JhdGUgPSAocGxheWJhY2tSYXRlKSA9PntcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldFBsYXliYWNrUmF0ZSgpIFwiLCBwbGF5YmFja1JhdGUpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLnNldFBsYXliYWNrUmF0ZShwbGF5ZXJDb25maWcuc2V0UGxheWJhY2tSYXRlKHBsYXliYWNrUmF0ZSkpO1xuICAgIH07XG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGUgPSAoKSA9PntcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFBsYXliYWNrUmF0ZSgpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0UGxheWJhY2tSYXRlKCkpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFBsYXliYWNrUmF0ZSgpO1xuICAgIH07XG5cbiAgICB0aGF0LmdldFBsYXlsaXN0ID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRQbGF5bGlzdCgpIFwiLCBwbGF5bGlzdE1hbmFnZXIuZ2V0UGxheWxpc3QoKSk7XG4gICAgICAgIHJldHVybiBwbGF5bGlzdE1hbmFnZXIuZ2V0UGxheWxpc3QoKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Q3VycmVudFBsYXlsaXN0ID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRDdXJyZW50UGxheWxpc3QoKSBcIiwgcGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRQbGF5bGlzdEluZGV4KCkpO1xuICAgICAgICByZXR1cm4gcGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRQbGF5bGlzdEluZGV4KCk7XG4gICAgfTtcbiAgICB0aGF0LnNldEN1cnJlbnRQbGF5bGlzdCA9IChpbmRleCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRDdXJyZW50UGxheWxpc3QoKSBcIiwgaW5kZXgpO1xuICAgICAgICBydW5OZXh0UGxheWxpc3QoaW5kZXgpO1xuICAgIH07XG5cbiAgICB0aGF0LmdldFNvdXJjZXMgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRTb3VyY2VzKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRTb3VyY2VzKCkpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFNvdXJjZXMoKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Q3VycmVudFNvdXJjZSA9ICgpID0+e1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Q3VycmVudFNvdXJjZSgpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFNvdXJjZSgpKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRDdXJyZW50U291cmNlKCk7XG4gICAgfTtcbiAgICB0aGF0LnNldEN1cnJlbnRTb3VyY2UgPSAoaW5kZXgpID0+e1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Q3VycmVudFNvdXJjZSgpIFwiLCBpbmRleCk7XG5cbiAgICAgICAgbGV0IHNvdXJjZXMgPSBjdXJyZW50UHJvdmlkZXIuZ2V0U291cmNlcygpO1xuICAgICAgICBsZXQgY3VycmVudFNvdXJjZSA9IHNvdXJjZXNbY3VycmVudFByb3ZpZGVyLmdldEN1cnJlbnRTb3VyY2UoKV07XG4gICAgICAgIGxldCBuZXdTb3VyY2UgPSBzb3VyY2VzW2luZGV4XTtcbiAgICAgICAgbGV0IGxhc3RQbGF5UG9zaXRpb24gPSBjdXJyZW50UHJvdmlkZXIuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgbGV0IGlzU2FtZVByb3ZpZGVyID0gcHJvdmlkZXJDb250cm9sbGVyLmlzU2FtZVByb3ZpZGVyKGN1cnJlbnRTb3VyY2UsIG5ld1NvdXJjZSk7XG4gICAgICAgIC8vIHByb3ZpZGVyLnNlckN1cnJlbnRRdWFsaXR5IC0+IHBsYXllckNvbmZpZyBzZXR0aW5nIC0+IGxvYWRcbiAgICAgICAgbGV0IHJlc3VsdFNvdXJjZUluZGV4ID0gY3VycmVudFByb3ZpZGVyLnNldEN1cnJlbnRTb3VyY2UoaW5kZXgsIGlzU2FtZVByb3ZpZGVyKTtcblxuICAgICAgICBpZighbmV3U291cmNlKXtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Q3VycmVudFF1YWxpdHkoKSBpc1NhbWVQcm92aWRlclwiLCBpc1NhbWVQcm92aWRlcik7XG5cbiAgICAgICAgaWYoIWlzU2FtZVByb3ZpZGVyKXtcbiAgICAgICAgICAgIGxhenlRdWV1ZSA9IExhenlDb21tYW5kRXhlY3V0b3IodGhhdCwgWydwbGF5Jywnc2VlayddKTtcbiAgICAgICAgICAgIGluaXRQcm92aWRlcihsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHRTb3VyY2VJbmRleDtcbiAgICB9O1xuXG5cblxuICAgIHRoYXQuZ2V0UXVhbGl0eUxldmVscyA9ICgpID0+e1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0UXVhbGl0eUxldmVscygpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0UXVhbGl0eUxldmVscygpKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRRdWFsaXR5TGV2ZWxzKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldEN1cnJlbnRRdWFsaXR5ID0gKCkgPT57XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRDdXJyZW50UXVhbGl0eSgpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFF1YWxpdHkoKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFF1YWxpdHkoKTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Q3VycmVudFF1YWxpdHkgPSAocXVhbGl0eUluZGV4KSA9PntcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEN1cnJlbnRRdWFsaXR5KCkgXCIsIHF1YWxpdHlJbmRleCk7XG5cbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5zZXRDdXJyZW50UXVhbGl0eShxdWFsaXR5SW5kZXgpO1xuICAgIH07XG4gICAgdGhhdC5pc0F1dG9RdWFsaXR5ID0gKCkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaXNBdXRvUXVhbGl0eSgpXCIpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmlzQXV0b1F1YWxpdHkoKTtcbiAgICB9O1xuICAgIHRoYXQuc2V0QXV0b1F1YWxpdHkgPSAoaXNBdXRvKSA9PiB7XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRBdXRvUXVhbGl0eSgpIFwiLCBpc0F1dG8pO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLnNldEF1dG9RdWFsaXR5KGlzQXV0byk7XG4gICAgfVxuXG4gICAgdGhhdC5nZXRDYXB0aW9uTGlzdCA9ICgpID0+IHtcbiAgICAgICAgaWYoIWNhcHRpb25NYW5hZ2VyKXtyZXR1cm4gbnVsbDt9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldENhcHRpb25MaXN0KCkgXCIsIGNhcHRpb25NYW5hZ2VyLmdldENhcHRpb25MaXN0KCkpO1xuICAgICAgICByZXR1cm4gY2FwdGlvbk1hbmFnZXIuZ2V0Q2FwdGlvbkxpc3QoKTtcbiAgICB9XG4gICAgdGhhdC5nZXRDdXJyZW50Q2FwdGlvbiA9ICgpID0+IHtcbiAgICAgICAgaWYoIWNhcHRpb25NYW5hZ2VyKXtyZXR1cm4gbnVsbDt9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEN1cnJlbnRDYXB0aW9uKCkgXCIsIGNhcHRpb25NYW5hZ2VyLmdldEN1cnJlbnRDYXB0aW9uKCkpO1xuICAgICAgICByZXR1cm4gY2FwdGlvbk1hbmFnZXIuZ2V0Q3VycmVudENhcHRpb24oKTtcbiAgICB9XG4gICAgdGhhdC5zZXRDdXJyZW50Q2FwdGlvbiA9IChpbmRleCkgPT4ge1xuICAgICAgICBpZighY2FwdGlvbk1hbmFnZXIpe3JldHVybiBudWxsO31cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Q3VycmVudENhcHRpb24oKSBcIiwgaW5kZXgpO1xuICAgICAgICBjYXB0aW9uTWFuYWdlci5zZXRDdXJyZW50Q2FwdGlvbihpbmRleCk7XG4gICAgfVxuICAgIHRoYXQuYWRkQ2FwdGlvbiA9ICh0cmFjaykgPT4ge1xuICAgICAgICBpZighY2FwdGlvbk1hbmFnZXIpe3JldHVybiBudWxsO31cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogYWRkQ2FwdGlvbigpIFwiKVxuICAgICAgICByZXR1cm4gY2FwdGlvbk1hbmFnZXIuYWRkQ2FwdGlvbih0cmFjayk7XG4gICAgfVxuICAgIHRoYXQucmVtb3ZlQ2FwdGlvbiA9IChpbmRleCkgPT4ge1xuICAgICAgICBpZighY2FwdGlvbk1hbmFnZXIpe3JldHVybiBudWxsO31cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcmVtb3ZlQ2FwdGlvbigpIFwiLCBpbmRleClcbiAgICAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLnJlbW92ZUNhcHRpb24oaW5kZXgpO1xuICAgIH1cblxuICAgIHRoYXQuZ2V0QnVmZmVyID0gKCkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEJ1ZmZlcigpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0QnVmZmVyKCkpO1xuICAgICAgICBjdXJyZW50UHJvdmlkZXIuZ2V0QnVmZmVyKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldFN0YXRlID0gKCkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFN0YXRlKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRTdGF0ZSgpKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRTdGF0ZSgpO1xuICAgIH07XG4gICAgdGhhdC5zdG9wID0gKCkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc3RvcCgpIFwiKTtcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnN0b3AoKTtcbiAgICB9O1xuICAgIHRoYXQucmVtb3ZlID0gKCkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcmVtb3ZlKCkgXCIpO1xuICAgICAgICBsYXp5UXVldWUuZGVzdHJveSgpO1xuICAgICAgICBpZihjYXB0aW9uTWFuYWdlcil7XG4gICAgICAgICAgICBjYXB0aW9uTWFuYWdlci5kZXN0cm95KCk7XG4gICAgICAgICAgICBjYXB0aW9uTWFuYWdlciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZihjdXJyZW50UHJvdmlkZXIpe1xuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZihtZWRpYU1hbmFnZXIpe1xuICAgICAgICAgICAgbWVkaWFNYW5hZ2VyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIG1lZGlhTWFuYWdlciA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcHJvdmlkZXJDb250cm9sbGVyID0gbnVsbDtcbiAgICAgICAgcGxheWxpc3RNYW5hZ2VyID0gbnVsbDtcbiAgICAgICAgcGxheWVyQ29uZmlnID0gbnVsbDtcbiAgICAgICAgbGF6eVF1ZXVlID0gbnVsbDtcblxuICAgICAgICB0aGF0LnRyaWdnZXIoREVTVFJPWSk7XG4gICAgICAgIHRoYXQub2ZmKCk7XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcmVtb3ZlKCkgLSBsYXp5UXVldWUsIGN1cnJlbnRQcm92aWRlciwgcHJvdmlkZXJDb250cm9sbGVyLCBwbGF5bGlzdE1hbmFnZXIsIHBsYXllckNvbmZpZywgYXBpIGV2ZW50IGRlc3Ryb2VkLiBcIik7XG4gICAgICAgIE92ZW5QbGF5ZXJTREsucmVtb3ZlUGxheWVyKHRoYXQuZ2V0Q29udGFpbmVySWQoKSk7XG4gICAgICAgIGlmKE92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyTGlzdCgpLmxlbmd0aCAgPT09IDApe1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiT3ZlblBsYXllclNESy5wbGF5ZXJMaXN0XCIsICBPdmVuUGxheWVyU0RLLmdldFBsYXllckxpc3QoKSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhhdC5nZXRWZXJzaW9uID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gXCJ2LlwiK3ZlcnNpb247XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuXG5cbmV4cG9ydCBkZWZhdWx0IEFwaTtcblxuXG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyNC4uXG4gKi9cblxuZXhwb3J0IGNvbnN0IEFwaVJ0bXBFeHBhbnNpb24gPSBmdW5jdGlvbihjdXJyZW50UHJvdmlkZXIpe1xuICAgIHJldHVybiB7XG4gICAgICAgIGV4dGVybmFsQ2FsbGJhY2tDcmVlcCA6IChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGlmKHJlc3VsdC5uYW1lICYmIHJlc3VsdC5kYXRhKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLnRyaWdnZXJFdmVudEZyb21FeHRlcm5hbChyZXN1bHQubmFtZSwgcmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufTtcbiIsImltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XG5cbmltcG9ydCB7XG4gICAgQ09OVEVOVF9USU1FX01PREVfQ0hBTkdFRFxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG4vKipcbiAqIEBicmllZiAgIFRoaXMgaW5pdGlhbGl6ZXMgdGhlIGlucHV0IG9wdGlvbnMuXG4gKiBAcGFyYW0gICBvcHRpb25zXG4gKlxuICogKi9cbmNvbnN0IENvbmZpZ3VyYXRvciA9IGZ1bmN0aW9uKG9wdGlvbnMsIHByb3ZpZGVyKXtcbiAgICAvL3NvdXJjZXMsIHRyYWNrcyxcblxuXG4gICAgY29uc3QgY29tcG9zZVNvdXJjZU9wdGlvbnMgPSBmdW5jdGlvbihvcHRpb25zKXtcbiAgICAgICAgY29uc3QgRGVmYXVsdHMgPSB7XG4gICAgICAgICAgICBtZWRpYUNvbnRhaW5lciA6IFwiXCIsXG4gICAgICAgICAgICBwbGF5YmFja1JhdGVzOiBbMiwgMS41LCAxLCAwLjUsIDAuMjVdLFxuICAgICAgICAgICAgcGxheWJhY2tSYXRlOiAxLFxuICAgICAgICAgICAgbXV0ZTogZmFsc2UsXG4gICAgICAgICAgICB2b2x1bWU6IDEwMCxcbiAgICAgICAgICAgIGxvb3AgOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbnRyb2xzIDogdHJ1ZSxcbiAgICAgICAgICAgIGF1dG9TdGFydCA6IGZhbHNlLFxuICAgICAgICAgICAgdGltZWNvZGUgOiB0cnVlLFxuICAgICAgICAgICAgc291cmNlSW5kZXggOiAwLFxuICAgICAgICAgICAgYnJvd3NlciA6IFwiXCIsXG4gICAgICAgICAgICBoaWRlUGxheWxpc3RJY29uIDogZmFsc2UsXG4gICAgICAgICAgICBydG1wQnVmZmVyVGltZSA6IDEsXG4gICAgICAgICAgICBydG1wQnVmZmVyVGltZU1heCA6IDMsXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHNlcmlhbGl6ZSA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnICYmIHZhbC5sZW5ndGggPCA2KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbG93ZXJjYXNlVmFsID0gdmFsLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgaWYgKGxvd2VyY2FzZVZhbCA9PT0gJ3RydWUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobG93ZXJjYXNlVmFsID09PSAnZmFsc2UnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFpc05hTihOdW1iZXIodmFsKSkgJiYgIWlzTmFOKHBhcnNlRmxvYXQodmFsKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE51bWJlcih2YWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGVzZXJpYWxpemUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gJ2lkJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9wdGlvbnNba2V5XSA9IHNlcmlhbGl6ZShvcHRpb25zW2tleV0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBkZXNlcmlhbGl6ZShvcHRpb25zKTtcbiAgICAgICAgbGV0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIERlZmF1bHRzLCBvcHRpb25zKTtcblxuICAgICAgICBsZXQgcGxheWJhY2tSYXRlcyA9IGNvbmZpZy5wbGF5YmFja1JhdGVzO1xuXG4gICAgICAgIHBsYXliYWNrUmF0ZXMgPSBwbGF5YmFja1JhdGVzLmZpbHRlcihyYXRlID0+IF8uaXNOdW1iZXIocmF0ZSkgJiYgcmF0ZSA+PSAwLjI1ICYmIHJhdGUgPD0gNCkubWFwKHJhdGUgPT4gTWF0aC5yb3VuZChyYXRlICogNCkgLyA0KTtcblxuICAgICAgICBpZiAocGxheWJhY2tSYXRlcy5pbmRleE9mKDEpIDwgMCkge1xuICAgICAgICAgICAgcGxheWJhY2tSYXRlcy5wdXNoKDEpO1xuICAgICAgICB9XG4gICAgICAgIHBsYXliYWNrUmF0ZXMuc29ydCgpO1xuXG4gICAgICAgIGNvbmZpZy5wbGF5YmFja1JhdGVzID0gcGxheWJhY2tSYXRlcztcblxuICAgICAgICBjb25maWcucnRtcEJ1ZmZlclRpbWUgPSBjb25maWcucnRtcEJ1ZmZlclRpbWUgPiAxMCA/IDEwIDogY29uZmlnLnJ0bXBCdWZmZXJUaW1lO1xuICAgICAgICBjb25maWcucnRtcEJ1ZmZlclRpbWVNYXggPSBjb25maWcucnRtcEJ1ZmZlclRpbWVNYXggPiA1MCA/IDUwIDogY29uZmlnLnJ0bXBCdWZmZXJUaW1lTWF4O1xuXG5cbiAgICAgICAgaWYgKGNvbmZpZy5wbGF5YmFja1JhdGVzLmluZGV4T2YoY29uZmlnLnBsYXliYWNrUmF0ZSkgPCAwKSB7XG4gICAgICAgICAgICBjb25maWcucGxheWJhY2tSYXRlID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbmZpZ1BsYXlsaXN0ID0gY29uZmlnLnBsYXlsaXN0O1xuICAgICAgICBpZiAoIWNvbmZpZ1BsYXlsaXN0KSB7XG4gICAgICAgICAgICBjb25zdCBvYmogPSBfLnBpY2soY29uZmlnLCBbXG4gICAgICAgICAgICAgICAgJ3RpdGxlJyxcbiAgICAgICAgICAgICAgICAnZGVzY3JpcHRpb24nLFxuICAgICAgICAgICAgICAgICd0eXBlJyxcbiAgICAgICAgICAgICAgICAnaW1hZ2UnLFxuICAgICAgICAgICAgICAgICdmaWxlJyxcbiAgICAgICAgICAgICAgICAnc291cmNlcycsXG4gICAgICAgICAgICAgICAgJ3RyYWNrcycsXG4gICAgICAgICAgICAgICAgJ2hvc3QnLFxuICAgICAgICAgICAgICAgICdhcHBsaWNhdGlvbicsXG4gICAgICAgICAgICAgICAgJ3N0cmVhbScsXG4gICAgICAgICAgICAgICAgJ2FkVGFnVXJsJ1xuICAgICAgICAgICAgXSk7XG5cbiAgICAgICAgICAgIGNvbmZpZy5wbGF5bGlzdCA9IFsgb2JqIF07XG4gICAgICAgIH0gZWxzZSBpZiAoXy5pc0FycmF5KGNvbmZpZ1BsYXlsaXN0LnBsYXlsaXN0KSkge1xuICAgICAgICAgICAgY29uZmlnLmZlZWREYXRhID0gY29uZmlnUGxheWxpc3Q7XG4gICAgICAgICAgICBjb25maWcucGxheWxpc3QgPSBjb25maWdQbGF5bGlzdC5wbGF5bGlzdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGRlbGV0ZSBjb25maWcuZHVyYXRpb247XG4gICAgICAgIHJldHVybiBjb25maWc7XG4gICAgfTtcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDb25maWd1cmF0b3IgbG9hZGVkLlwiLCBvcHRpb25zKTtcbiAgICBsZXQgc3BlYyA9IGNvbXBvc2VTb3VyY2VPcHRpb25zKG9wdGlvbnMpO1xuXG5cbiAgICBjb25zdCB0aGF0ID0ge307XG4gICAgdGhhdC5nZXRDb25maWcgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjO1xuICAgIH07XG4gICAgdGhhdC5zZXRDb25maWcgPSAoY29uZmlnLCB2YWx1ZSkgPT4ge1xuICAgICAgICBzcGVjW2NvbmZpZ10gPSB2YWx1ZTtcbiAgICB9O1xuXG4gICAgdGhhdC5nZXRDb250YWluZXIgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLm1lZGlhQ29udGFpbmVyO1xuICAgIH07XG5cbiAgICB0aGF0LmdldFBsYXliYWNrUmF0ZSA9KCk9PntcbiAgICAgICAgcmV0dXJuIHNwZWMucGxheWJhY2tSYXRlO1xuICAgIH07XG4gICAgdGhhdC5zZXRQbGF5YmFja1JhdGUgPShwbGF5YmFja1JhdGUpPT57XG4gICAgICAgIHNwZWMucGxheWJhY2tSYXRlID0gcGxheWJhY2tSYXRlO1xuICAgICAgICByZXR1cm4gcGxheWJhY2tSYXRlO1xuICAgIH07XG5cbiAgICB0aGF0LmdldFF1YWxpdHlMYWJlbCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMucXVhbGl0eUxhYmVsO1xuICAgIH07XG4gICAgdGhhdC5zZXRRdWFsaXR5TGFiZWwgPSAobmV3TGFiZWwpID0+IHtcbiAgICAgICAgc3BlYy5xdWFsaXR5TGFiZWwgPSBuZXdMYWJlbDtcbiAgICB9O1xuXG4gICAgLyp0aGF0LmdldFNvdXJjZUxhYmVsID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5zb3VyY2VMYWJlbDtcbiAgICB9O1xuICAgIHRoYXQuc2V0U291cmNlTGFiZWwgPSAobmV3TGFiZWwpID0+IHtcbiAgICAgICAgc3BlYy5zb3VyY2VMYWJlbCA9IG5ld0xhYmVsO1xuICAgIH07Ki9cblxuICAgIHRoYXQuZ2V0U291cmNlSW5kZXggPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLnNvdXJjZUluZGV4O1xuICAgIH07XG4gICAgdGhhdC5zZXRTb3VyY2VJbmRleCA9IChpbmRleCkgPT4ge1xuICAgICAgICBzcGVjLnNvdXJjZUluZGV4ID0gaW5kZXg7XG4gICAgfTtcbiAgICB0aGF0LnNldFRpbWVjb2RlTW9kZSA9ICh0aW1lY29kZSkgPT4ge1xuICAgICAgICBpZihzcGVjLnRpbWVjb2RlICE9PSB0aW1lY29kZSl7XG4gICAgICAgICAgICBzcGVjLnRpbWVjb2RlID0gdGltZWNvZGU7XG4gICAgICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfVElNRV9NT0RFX0NIQU5HRUQsIHRpbWVjb2RlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhhdC5pc1RpbWVjb2RlTW9kZSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMudGltZWNvZGU7XG4gICAgfTtcbiAgICB0aGF0LmdldFJ0bXBCdWZmZXJUaW1lID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5ydG1wQnVmZmVyVGltZTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0UnRtcEJ1ZmZlclRpbWVNYXggPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLnJ0bXBCdWZmZXJUaW1lTWF4O1xuICAgIH07XG5cbiAgICB0aGF0LmlzTXV0ZSA9ICgpID0+e1xuICAgICAgICByZXR1cm4gc3BlYy5tdXRlO1xuICAgIH07XG4gICAgdGhhdC5nZXRWb2x1bWUgPSAoKSA9PntcbiAgICAgICAgcmV0dXJuIHNwZWMudm9sdW1lO1xuICAgIH07XG4gICAgdGhhdC5pc0xvb3AgPSAoKSA9PntcbiAgICAgICAgcmV0dXJuIHNwZWMubG9vcDtcbiAgICB9O1xuICAgIHRoYXQuaXNBdXRvU3RhcnQgPSAoKSA9PntcbiAgICAgICAgcmV0dXJuIHNwZWMuYXV0b1N0YXJ0O1xuICAgIH07XG4gICAgdGhhdC5pc0NvbnRyb2xzID0gKCkgPT57XG4gICAgICAgIHJldHVybiBzcGVjLmNvbnRyb2xzO1xuICAgIH07XG5cbiAgICB0aGF0LmdldFBsYXliYWNrUmF0ZXMgPSgpPT57XG4gICAgICAgIHJldHVybiBzcGVjLnBsYXliYWNrUmF0ZXM7XG4gICAgfTtcbiAgICB0aGF0LmdldEJyb3dzZXIgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmJyb3dzZXI7XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0UGxheWxpc3QgPSgpPT57XG4gICAgICAgIHJldHVybiBzcGVjLnBsYXlsaXN0O1xuICAgIH07XG4gICAgdGhhdC5zZXRQbGF5bGlzdCA9KHBsYXlsaXN0KT0+e1xuICAgICAgICBpZihfLmlzQXJyYXkocGxheWxpc3QpKXtcbiAgICAgICAgICAgIHNwZWMucGxheWxpc3QgPSBwbGF5bGlzdDtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBzcGVjLnBsYXlsaXN0ID0gW3BsYXlsaXN0XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3BlYy5wbGF5bGlzdDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb25maWd1cmF0b3I7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAzLi5cbiAqL1xuXG4vKipcbiAqIEBicmllZiAgIFRoaXMgbW9kdWxlIHByb3ZpZGUgY3VzdG9tIGV2ZW50cy5cbiAqIEBwYXJhbSAgIG9iamVjdCAgICBBbiBvYmplY3QgdGhhdCByZXF1aXJlcyBjdXN0b20gZXZlbnRzLlxuICpcbiAqICovXG5cbmNvbnN0IEV2ZW50RW1pdHRlciA9IGZ1bmN0aW9uKG9iamVjdCl7XG4gICAgbGV0IHRoYXQgPSBvYmplY3Q7XG4gICAgbGV0IF9ldmVudHMgPVtdO1xuXG4gICAgY29uc3QgdHJpZ2dlckV2ZW50cyA9IGZ1bmN0aW9uKGV2ZW50cywgYXJncywgY29udGV4dCl7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgbGV0IGxlbmd0aCA9IGV2ZW50cy5sZW5ndGg7XG4gICAgICAgIGZvcihpID0gMDsgaSA8IGxlbmd0aDsgaSArKyl7XG4gICAgICAgICAgICBsZXQgZXZlbnQgPSBldmVudHNbaV07XG4gICAgICAgICAgICBldmVudC5saXN0ZW5lci5hcHBseSggKCBldmVudC5jb250ZXh0IHx8IGNvbnRleHQgKSwgYXJncyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhhdC5vbiA9IGZ1bmN0aW9uKG5hbWUsIGxpc3RlbmVyLCBjb250ZXh0KXtcbiAgICAgICAgKF9ldmVudHNbbmFtZV0gfHwgKF9ldmVudHNbbmFtZV09W10pICkucHVzaCh7IGxpc3RlbmVyOiBsaXN0ZW5lciAgLCBjb250ZXh0IDogY29udGV4dH0pO1xuICAgICAgICByZXR1cm4gdGhhdDtcbiAgICB9O1xuICAgIHRoYXQudHJpZ2dlciA9IGZ1bmN0aW9uKG5hbWUpe1xuICAgICAgICBpZighX2V2ZW50cyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgY29uc3QgZXZlbnRzID0gX2V2ZW50c1tuYW1lXTtcbiAgICAgICAgY29uc3QgYWxsRXZlbnRzID0gX2V2ZW50cy5hbGw7XG5cbiAgICAgICAgaWYoZXZlbnRzKXtcbiAgICAgICAgICAgIHRyaWdnZXJFdmVudHMoZXZlbnRzLCBhcmdzLCB0aGF0KTtcbiAgICAgICAgfVxuICAgICAgICBpZihhbGxFdmVudHMpe1xuICAgICAgICAgICAgdHJpZ2dlckV2ZW50cyhhbGxFdmVudHMsIGFyZ3VtZW50cywgdGhhdCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQub2ZmID0gZnVuY3Rpb24obmFtZSwgbGlzdGVuZXIsIGNvbnRleHQpe1xuICAgICAgICBpZighX2V2ZW50cyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW5hbWUgJiYgIWxpc3RlbmVyICYmICFjb250ZXh0KSAge1xuICAgICAgICAgICAgX2V2ZW50cyA9IFtdO1xuICAgICAgICAgICAgcmV0dXJuIHRoYXQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuYW1lcyA9IG5hbWUgPyBbbmFtZV0gOiBPYmplY3Qua2V5cyhfZXZlbnRzKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IG5hbWVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgbmFtZSA9IG5hbWVzW2ldO1xuICAgICAgICAgICAgY29uc3QgZXZlbnRzID0gX2V2ZW50c1tuYW1lXTtcbiAgICAgICAgICAgIGlmIChldmVudHMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXRhaW4gPSBfZXZlbnRzW25hbWVdID0gW107XG4gICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyICB8fCBjb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwLCBrID0gZXZlbnRzLmxlbmd0aDsgaiA8IGs7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXZlbnQgPSBldmVudHNbal07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGxpc3RlbmVyICYmIGxpc3RlbmVyICE9PSBldmVudC5saXN0ZW5lciAmJiBsaXN0ZW5lciAhPT0gZXZlbnQubGlzdGVuZXIubGlzdGVuZXIgICYmIGxpc3RlbmVyICE9PSBldmVudC5saXN0ZW5lci5fbGlzdGVuZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwoY29udGV4dCAmJiBjb250ZXh0ICE9PSBldmVudC5jb250ZXh0KVxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0YWluLnB1c2goZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghcmV0YWluLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgX2V2ZW50c1tuYW1lXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoYXQ7XG4gICAgfTtcbiAgICB0aGF0Lm9uY2UgPSBmdW5jdGlvbihuYW1lLCBsaXN0ZW5lciwgY29udGV4dCl7XG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgIGNvbnN0IG9uY2VDYWxsYmFjayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKGNvdW50KyspIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGF0Lm9mZihuYW1lLCBvbmNlQ2FsbGJhY2spO1xuICAgICAgICAgICAgbGlzdGVuZXIuYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICAgICAgb25jZUNhbGxiYWNrLl9saXN0ZW5lciA9IGxpc3RlbmVyO1xuICAgICAgICByZXR1cm4gdGhhdC5vbihuYW1lLCBvbmNlQ2FsbGJhY2ssIGNvbnRleHQpO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgRXZlbnRFbWl0dGVyO1xuIiwiaW1wb3J0IF8gZnJvbSAndXRpbHMvdW5kZXJzY29yZSc7XG5cbi8qKlxuICogQGJyaWVmICAgVGhpcyBleGVjdXRlcyB0aGUgaW5wdXQgY29tbWFuZHMgYXQgYSBzcGVjaWZpYyBwb2ludCBpbiB0aW1lLlxuICogQHBhcmFtICAgaW5zdGFuY2VcbiAqIEBwYXJhbSAgIHF1ZXVlZENvbW1hbmRzXG4gKiAqL1xuY29uc3QgTGF6eUNvbW1hbmRFeGVjdXRvciA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgcXVldWVkQ29tbWFuZHMpIHtcbiAgICBsZXQgY29tbWFuZFF1ZXVlID0gW107XG4gICAgbGV0IHVuZGVjb3JhdGVkTWV0aG9kcyA9IHt9O1xuICAgIGxldCBleGVjdXRlTW9kZSA9IGZhbHNlO1xuICAgIGxldCB0aGF0ID0ge307XG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciBsb2FkZWQuXCIpO1xuICAgIHF1ZXVlZENvbW1hbmRzLmZvckVhY2goKGNvbW1hbmQpID0+IHtcbiAgICAgICAgY29uc3QgbWV0aG9kID0gaW5zdGFuY2VbY29tbWFuZF07XG4gICAgICAgIHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXSA9IG1ldGhvZCB8fCBmdW5jdGlvbigpe307XG5cbiAgICAgICAgaW5zdGFuY2VbY29tbWFuZF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgICAgICAgICAgICBpZiAoIWV4ZWN1dGVNb2RlKSB7XG4gICAgICAgICAgICAgICAgLy9jb21tYW5kUXVldWUucHVzaCh7IGNvbW1hbmQsIGFyZ3MgfSk7XG4gICAgICAgICAgICAgICAgdGhhdC5hZGRRdWV1ZShjb21tYW5kLCBhcmdzKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBleGVjdXRlUXVldWVkQ29tbWFuZHMoKTtcbiAgICAgICAgICAgICAgICBpZiAobWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZC5hcHBseSh0aGF0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7XG4gICAgdmFyIGV4ZWN1dGVRdWV1ZWRDb21tYW5kcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2hpbGUgKGNvbW1hbmRRdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCB7IGNvbW1hbmQsIGFyZ3MgfSA9IGNvbW1hbmRRdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgICAgKHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXSB8fCBpbnN0YW5jZVtjb21tYW5kXSkuYXBwbHkoaW5zdGFuY2UsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhhdC5zZXRFeGVjdXRlTW9kZSA9IChtb2RlKSA9PiB7XG4gICAgICAgIGV4ZWN1dGVNb2RlID0gbW9kZTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IHNldEV4ZWN1dGVNb2RlKClcIiwgbW9kZSk7XG4gICAgfTtcbiAgICB0aGF0LmdldFVuZGVjb3JhdGVkTWV0aG9kcyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBnZXRVbmRlY29yYXRlZE1ldGhvZHMoKVwiLCB1bmRlY29yYXRlZE1ldGhvZHMpO1xuICAgICAgICByZXR1cm4gdW5kZWNvcmF0ZWRNZXRob2RzO1xuICAgIH1cbiAgICB0aGF0LmdldFF1ZXVlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGdldFF1ZXVlKClcIiwgZ2V0UXVldWUpO1xuICAgICAgICByZXR1cm4gY29tbWFuZFF1ZXVlO1xuICAgIH1cbiAgICB0aGF0LmFkZFF1ZXVlID0gZnVuY3Rpb24oY29tbWFuZCwgYXJncyl7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBhZGRRdWV1ZSgpXCIsIGNvbW1hbmQsIGFyZ3MpO1xuICAgICAgICBjb21tYW5kUXVldWUucHVzaCh7IGNvbW1hbmQsIGFyZ3MgfSk7XG4gICAgfVxuXG4gICAgdGhhdC5mbHVzaCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBmbHVzaCgpXCIpO1xuICAgICAgICBleGVjdXRlUXVldWVkQ29tbWFuZHMoKTtcbiAgICB9O1xuICAgIHRoYXQuZW1wdHkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGVtcHR5KClcIik7XG4gICAgICAgIGNvbW1hbmRRdWV1ZS5sZW5ndGggPSAwO1xuICAgIH07XG4gICAgdGhhdC5vZmYgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IG9mZigpXCIpO1xuICAgICAgICBxdWV1ZWRDb21tYW5kcy5mb3JFYWNoKChjb21tYW5kKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtZXRob2QgPSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF07XG4gICAgICAgICAgICBpZiAobWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VbY29tbWFuZF0gPSBtZXRob2Q7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuXG4gICAgLy9SdW4gb25jZSBhdCB0aGUgZW5kXG4gICAgdGhhdC5yZW1vdmVBbmRFeGN1dGVPbmNlID0gZnVuY3Rpb24oY29tbWFuZF8pe1xuICAgICAgICBsZXQgY29tbWFuZFF1ZXVlSXRlbSA9IF8uZmluZFdoZXJlKGNvbW1hbmRRdWV1ZSwge2NvbW1hbmQgOiBjb21tYW5kX30pO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogcmVtb3ZlQW5kRXhjdXRlT25jZSgpXCIsIGNvbW1hbmRfKTtcbiAgICAgICAgY29tbWFuZFF1ZXVlLnNwbGljZShfLmZpbmRJbmRleChjb21tYW5kUXVldWUsIHtjb21tYW5kIDogY29tbWFuZF99KSwgMSk7XG5cbiAgICAgICAgY29uc3QgbWV0aG9kID0gdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRfXTtcbiAgICAgICAgaWYgKG1ldGhvZCkge1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwicmVtb3ZlQ29tbWFuZCgpXCIpO1xuICAgICAgICAgICAgaWYoY29tbWFuZFF1ZXVlSXRlbSl7XG4gICAgICAgICAgICAgICAgKG1ldGhvZHx8IGluc3RhbmNlW2NvbW1hbmRfXSkuYXBwbHkoaW5zdGFuY2UsIGNvbW1hbmRRdWV1ZUl0ZW0uYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbnN0YW5jZVtjb21tYW5kX10gPSBtZXRob2Q7XG4gICAgICAgICAgICBkZWxldGUgdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRfXTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0LmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGRlc3Ryb3koKVwiKTtcbiAgICAgICAgdGhhdC5vZmYoKTtcbiAgICAgICAgdGhhdC5lbXB0eSgpO1xuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IExhenlDb21tYW5kRXhlY3V0b3I7IiwiaW1wb3J0IHtpc1J0bXAsIGlzV2ViUlRDLCBpc0Rhc2gsIGlzSGxzfSBmcm9tIFwidXRpbHMvdmFsaWRhdG9yXCI7XG5pbXBvcnQge2FuYWxVc2VyQWdlbnR9IGZyb20gXCJ1dGlscy9icm93c2VyXCI7XG4vKipcbiAqIEBicmllZiAgIFRoaXMgZmluZHMgdGhlIHByb3ZpZGVyIHRoYXQgbWF0Y2hlcyB0aGUgaW5wdXQgc291cmNlLlxuICogQHBhcmFtXG4gKiAqL1xuXG5jb25zdCBTdXBwb3J0Q2hlY2tlciA9IGZ1bmN0aW9uKCl7XG4gICAgY29uc3QgdGhhdCA9IHt9O1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlN1cHBvcnRDaGVja2VyIGxvYWRlZC5cIik7XG4gICAgbGV0IHVzZXJBZ2VudE9iamVjdCA9IGFuYWxVc2VyQWdlbnQoKTtcblxuICAgIGNvbnN0IHN1cHBvcnRMaXN0ID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnaHRtbDUnLFxuICAgICAgICAgICAgY2hlY2tTdXBwb3J0OiBmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgTWltZVR5cGVzID0ge1xuICAgICAgICAgICAgICAgICAgICBhYWM6ICdhdWRpby9tcDQnLFxuICAgICAgICAgICAgICAgICAgICBtcDQ6ICd2aWRlby9tcDQnLFxuICAgICAgICAgICAgICAgICAgICBmNHY6ICd2aWRlby9tcDQnLFxuICAgICAgICAgICAgICAgICAgICBtNHY6ICd2aWRlby9tcDQnLFxuICAgICAgICAgICAgICAgICAgICBtb3Y6ICd2aWRlby9tcDQnLFxuICAgICAgICAgICAgICAgICAgICBtcDM6ICdhdWRpby9tcGVnJyxcbiAgICAgICAgICAgICAgICAgICAgbXBlZzogJ2F1ZGlvL21wZWcnLFxuICAgICAgICAgICAgICAgICAgICBvZ3Y6ICd2aWRlby9vZ2cnLFxuICAgICAgICAgICAgICAgICAgICBvZ2c6ICd2aWRlby9vZ2cnLFxuICAgICAgICAgICAgICAgICAgICBvZ2E6ICd2aWRlby9vZ2cnLFxuICAgICAgICAgICAgICAgICAgICB2b3JiaXM6ICd2aWRlby9vZ2cnLFxuICAgICAgICAgICAgICAgICAgICB3ZWJtOiAndmlkZW8vd2VibScsXG4gICAgICAgICAgICAgICAgICAgIGY0YTogJ3ZpZGVvL2FhYycsXG4gICAgICAgICAgICAgICAgICAgIG0zdTg6ICdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcsXG4gICAgICAgICAgICAgICAgICAgIG0zdTogJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyxcbiAgICAgICAgICAgICAgICAgICAgaGxzOiAnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHZpZGVvID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJylcbiAgICAgICAgICAgICAgICB9KCk7XG4gICAgICAgICAgICAgICAgaWYgKCF2aWRlby5jYW5QbGF5VHlwZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gc291cmNlLmZpbGU7XG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNvdXJjZS50eXBlO1xuXG4gICAgICAgICAgICAgICAgaWYoIXR5cGUpe3JldHVybiBmYWxzZTt9XG4gICAgICAgICAgICAgICAgY29uc3QgbWltZVR5cGUgPSBzb3VyY2UubWltZVR5cGUgfHwgTWltZVR5cGVzW3R5cGVdO1xuXG4gICAgICAgICAgICAgICAgaWYoaXNIbHMoZmlsZSwgdHlwZSkgJiYgdXNlckFnZW50T2JqZWN0LmJyb3dzZXIgPT09IFwiTWljcm9zb2Z0IEVkZ2VcIiApe1xuICAgICAgICAgICAgICAgICAgICAvL0VkZ2Ugc3VwcG9ydHMgaGxzIG5hdGl2ZSBidXQgdGhhdCdzIHN1Y2tzLlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGlzUnRtcChmaWxlLCB0eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoaXNXZWJSVEMoZmlsZSwgdHlwZSkpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFtaW1lVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuICEhdmlkZW8uY2FuUGxheVR5cGUobWltZVR5cGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnd2VicnRjJyxcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZpZGVvID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJylcbiAgICAgICAgICAgICAgICB9KCk7XG4gICAgICAgICAgICAgICAgaWYgKCF2aWRlby5jYW5QbGF5VHlwZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpc1J0bXAoZmlsZSwgdHlwZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc291cmNlLnR5cGU7XG5cbiAgICAgICAgICAgICAgICBpZihpc1dlYlJUQyhmaWxlLCB0eXBlKSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnZGFzaCcsXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gc291cmNlLmZpbGU7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc291cmNlLnR5cGU7XG4gICAgICAgICAgICAgICAgaWYgKGlzUnRtcChmaWxlLCB0eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAoIHdpbmRvdy5NZWRpYVNvdXJjZSB8fCB3aW5kb3cuV2ViS2l0TWVkaWFTb3VyY2UgKSA9PT0gXCJmdW5jdGlvblwiICYmIGlzRGFzaChmaWxlLCB0eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ2hscycsXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2aWRlbyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpXG4gICAgICAgICAgICAgICAgfSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc291cmNlLnR5cGU7XG4gICAgICAgICAgICAgICAgaWYgKGlzUnRtcChmaWxlLCB0eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy90aGlzIG1ldGhvZCBmcm9tIGhscy5qc1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzSGxzU3VwcG9ydCA9ICgpID0+e1xuICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gZ2V0TWVkaWFTb3VyY2UoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93Lk1lZGlhU291cmNlIHx8IHdpbmRvdy5XZWJLaXRNZWRpYVNvdXJjZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YXIgbWVkaWFTb3VyY2UgPSBnZXRNZWRpYVNvdXJjZSgpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc291cmNlQnVmZmVyID0gd2luZG93LlNvdXJjZUJ1ZmZlciB8fCB3aW5kb3cuV2ViS2l0U291cmNlQnVmZmVyO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXNUeXBlU3VwcG9ydGVkID0gbWVkaWFTb3VyY2UgJiYgdHlwZW9mIG1lZGlhU291cmNlLmlzVHlwZVN1cHBvcnRlZCA9PT0gJ2Z1bmN0aW9uJyAmJiBtZWRpYVNvdXJjZS5pc1R5cGVTdXBwb3J0ZWQoJ3ZpZGVvL21wNDsgY29kZWNzPVwiYXZjMS40MkUwMUUsbXA0YS40MC4yXCInKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBTb3VyY2VCdWZmZXIgaXMgZXhwb3NlZCBlbnN1cmUgaXRzIEFQSSBpcyB2YWxpZFxuICAgICAgICAgICAgICAgICAgICAvLyBzYWZhcmkgYW5kIG9sZCB2ZXJzaW9uIG9mIENocm9tZSBkb2Ugbm90IGV4cG9zZSBTb3VyY2VCdWZmZXIgZ2xvYmFsbHkgc28gY2hlY2tpbmcgU291cmNlQnVmZmVyLnByb3RvdHlwZSBpcyBpbXBvc3NpYmxlXG4gICAgICAgICAgICAgICAgICAgIHZhciBzb3VyY2VCdWZmZXJWYWxpZEFQSSA9ICFzb3VyY2VCdWZmZXIgfHwgc291cmNlQnVmZmVyLnByb3RvdHlwZSAmJiB0eXBlb2Ygc291cmNlQnVmZmVyLnByb3RvdHlwZS5hcHBlbmRCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHNvdXJjZUJ1ZmZlci5wcm90b3R5cGUucmVtb3ZlID09PSAnZnVuY3Rpb24nO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gISFpc1R5cGVTdXBwb3J0ZWQgJiYgISFzb3VyY2VCdWZmZXJWYWxpZEFQSTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8vUmVtb3ZlIHRoaXMgJyEhdmlkZW8uY2FuUGxheVR5cGUoJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyknIGlmIHlvdSB3YW50IHRvIHVzZSBobHNqcy5cbiAgICAgICAgICAgICAgICAvL1llcyBJIG5lZWQgaGxzanMuIDIwMTktMDYtMTIgJiYgISF2aWRlby5jYW5QbGF5VHlwZSgnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNIbHNTdXBwb3J0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdydG1wJyxcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc291cmNlLnR5cGU7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gdGVzdEZsYXNoKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdXBwb3J0ID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9JRSBvbmx5XG4gICAgICAgICAgICAgICAgICAgIGlmKFwiQWN0aXZlWE9iamVjdFwiIGluIHdpbmRvdykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VwcG9ydCA9ICEhKG5ldyBBY3RpdmVYT2JqZWN0KFwiU2hvY2t3YXZlRmxhc2guU2hvY2t3YXZlRmxhc2hcIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfWNhdGNoKGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1cHBvcnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9XM0MsIGJldHRlciBzdXBwb3J0IGluIGxlZ2FjeSBicm93c2VyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN1cHBvcnQgPSAhIW5hdmlnYXRvci5taW1lVHlwZXNbJ2FwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoJ107XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdXBwb3J0O1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGNoZWNrU3VwcG9ydCgpe1xuICAgICAgICAgICAgICAgICAgICBpZih1c2VyQWdlbnRPYmplY3QuYnJvd3NlciA9PT0gXCJNaWNyb3NvZnQgRWRnZVwiIHx8IHVzZXJBZ2VudE9iamVjdC5vcyA9PT0gXCJBbmRyb2lkXCIgfHwgdXNlckFnZW50T2JqZWN0Lm9zID09PSBcImlPU1wiICB8fCB1c2VyQWdlbnRPYmplY3QuYnJvd3NlciA9PT0gXCJTYWZhcmlcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlzUnRtcChmaWxlLCB0eXBlKSAmJiB0ZXN0Rmxhc2goKSAmJiBjaGVja1N1cHBvcnQoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIF07XG5cbiAgICB0aGF0LmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZSA9IChzb3J1Y2VfKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlN1cHBvcnRDaGVja2VyIDogZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKClcIiwgc29ydWNlXyk7XG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IChzb3J1Y2VfID09PSBPYmplY3Qoc29ydWNlXykpID8gc29ydWNlXyA6IHt9O1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgc3VwcG9ydExpc3QubGVuZ3RoOyBpICsrKXtcbiAgICAgICAgICAgIGlmKHN1cHBvcnRMaXN0W2ldLmNoZWNrU3VwcG9ydChzb3VyY2UpKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VwcG9ydExpc3RbaV0ubmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhhdC5maW5kUHJvdmlkZXJOYW1lc0J5UGxheWxpc3QgPSAocGxheWxpc3RJdGVtKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlN1cHBvcnRDaGVja2VyIDogZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0KClcIiwgcGxheWxpc3RJdGVtKTtcbiAgICAgICAgbGV0IHN1cHBvcnROYW1lcyA9IFtdO1xuICAgICAgICAvKmZvciAobGV0IGkgPSBwbGF5bGlzdF8ubGVuZ3RoOyBpLS07KSB7XG5cblxuICAgICAgICB9Ki9cbiAgICAgICAgY29uc3QgaXRlbSA9IHBsYXlsaXN0SXRlbTtcblxuICAgICAgICBpZihpdGVtICYmIGl0ZW0uc291cmNlcyl7XG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgaXRlbS5zb3VyY2VzLmxlbmd0aDsgaiArKyl7XG4gICAgICAgICAgICAgICAgbGV0IHNvdXJjZSA9IGl0ZW0uc291cmNlc1tqXTtcbiAgICAgICAgICAgICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1cHBvcnRlZCA9IHRoYXQuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKHNvdXJjZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdXBwb3J0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1cHBvcnROYW1lcy5wdXNoKHN1cHBvcnRlZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBzdXBwb3J0TmFtZXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICB9O1xuICAgIHJldHVybiB0aGF0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU3VwcG9ydENoZWNrZXI7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiA0Li5cbiAqL1xuaW1wb3J0IFNydFBhcnNlciBmcm9tIFwiYXBpL2NhcHRpb24vcGFyc2VyL1NydFBhcnNlclwiO1xuaW1wb3J0IFZUVEN1ZSBmcm9tIFwidXRpbHMvY2FwdGlvbnMvdnR0Q3VlXCI7XG4vL2ltcG9ydCBSZXF1ZXN0IGZyb20gXCJ1dGlscy9kb3dubG9hZGVyXCI7XG5cbmNvbnN0IExvYWRlciA9IGZ1bmN0aW9uKCl7XG4gICAgY29uc3QgdGhhdCA9IHt9O1xuXG4gICAgY29uc3QgY29udmVydFRvVlRUQ3VlcyA9IGZ1bmN0aW9uIChjdWVzKSB7XG4gICAgICAgIHJldHVybiBjdWVzLm1hcChjdWUgPT4gbmV3IFZUVEN1ZShjdWUuc3RhcnQsIGN1ZS5lbmQsIGN1ZS50ZXh0KSk7XG4gICAgfVxuICAgIC8vbGFuZ3VhZ2UgOiBmb3IgU01JIGZvcm1hdC5cbiAgICB0aGF0LmxvYWQgPSAodHJhY2ssIGxhbmd1YWdlLCBzdWNjZXNzQ2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spID0+IHtcblxuICAgICAgICB2YXIgcmVxdWVzdE9wdGlvbnMgID0ge1xuICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICAgICAgdXJsIDogdHJhY2suZmlsZSxcbiAgICAgICAgICAgIGVuY29kaW5nOiBudWxsXG4gICAgICAgIH07XG5cbiAgICAgICAgbG9hZFJlcXVlc3REb3dubG9kZXIoKS50aGVuKFJlcXVlc3QgPT4ge1xuICAgICAgICAgICAgUmVxdWVzdChyZXF1ZXN0T3B0aW9ucywgZnVuY3Rpb24oZXJyb3IsIHJlc3BvbnNlLCBib2R5KSB7XG4gICAgICAgICAgICAgICAgaWYoZXJyb3Ipe1xuICAgICAgICAgICAgICAgICAgICBlcnJvckNhbGxiYWNrKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1ZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZ0dEN1ZXMgPSBbXTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoYm9keS5pbmRleE9mKCdXRUJWVFQnKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJXRUJWVFQgTE9BREVEXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9hZFZ0dFBhcnNlcigpLnRoZW4oV2ViVlRUID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGFyc2VyID0gbmV3IFdlYlZUVC5QYXJzZXIod2luZG93LCBXZWJWVFQuU3RyaW5nRGVjb2RlcigpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2dHRDdWVzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VyLm9uY3VlID0gZnVuY3Rpb24oY3VlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZ0dEN1ZXMucHVzaChjdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VyLm9uZmx1c2ggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWxldGUgdHJhY2sueGhyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzQ2FsbGJhY2sodnR0Q3Vlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQYXJzZSBjYWxscyBvbmZsdXNoIGludGVybmFsbHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZXIucGFyc2UoYm9keSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWxldGUgdHJhY2sueGhyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yQ2FsbGJhY2soZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGJvZHkuaW5kZXhPZignU0FNSScpID49IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU0FNSSBMT0FERURcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkU21pUGFyc2VyKCkudGhlbihTbWlQYXJzZXIgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwYXJzZWREYXRhID0gU21pUGFyc2VyKGJvZHksIHtmaXhlZExhbmcgOiBsYW5ndWFnZX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZ0dEN1ZXMgPSBjb252ZXJ0VG9WVFRDdWVzKHBhcnNlZERhdGEucmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzQ2FsbGJhY2sodnR0Q3Vlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWxldGUgdHJhY2sueGhyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yQ2FsbGJhY2soZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlNSVCBMT0FERURcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdWVzID0gU3J0UGFyc2VyKGJvZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdnR0Q3VlcyA9IGNvbnZlcnRUb1ZUVEN1ZXMoY3Vlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzQ2FsbGJhY2sodnR0Q3Vlcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAvL2RlbGV0ZSB0cmFjay54aHI7XG4gICAgICAgICAgICBlcnJvckNhbGxiYWNrKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufTtcbmZ1bmN0aW9uIGxvYWRSZXF1ZXN0RG93bmxvZGVyKCl7XG4gICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsndXRpbHMvZG93bmxvYWRlciddLCBmdW5jdGlvbiAocmVxdWlyZSkge1xuICAgICAgICByZXR1cm4gcmVxdWlyZSgndXRpbHMvZG93bmxvYWRlcicpLmRlZmF1bHQ7XG4gICAgfSwgZnVuY3Rpb24oZXJyKXtjb25zb2xlLmxvZyhlcnIpO30sICdkb3dubG9hZGVyJyk7XG59O1xuZnVuY3Rpb24gbG9hZFZ0dFBhcnNlcigpIHtcbiAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvY2FwdGlvbi9wYXJzZXIvVnR0UGFyc2VyJ10sIGZ1bmN0aW9uIChyZXF1aXJlKSB7XG4gICAgICAgIHJldHVybiByZXF1aXJlKCdhcGkvY2FwdGlvbi9wYXJzZXIvVnR0UGFyc2VyJykuZGVmYXVsdDtcbiAgICB9LCBmdW5jdGlvbihlcnIpe2NvbnNvbGUubG9nKGVycik7fSwgJ3Z0dHBhcnNlcicpO1xufVxuZnVuY3Rpb24gbG9hZFNtaVBhcnNlcigpIHtcbiAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvY2FwdGlvbi9wYXJzZXIvU21pUGFyc2VyJ10sIGZ1bmN0aW9uIChyZXF1aXJlKSB7XG4gICAgICAgIHJldHVybiByZXF1aXJlKCdhcGkvY2FwdGlvbi9wYXJzZXIvU21pUGFyc2VyJykuZGVmYXVsdDtcbiAgICB9LCBmdW5jdGlvbihlcnIpe2NvbnNvbGUubG9nKGVycik7fSwgJ3NtaXBhcnNlcicpO1xufVxuZXhwb3J0IGRlZmF1bHQgTG9hZGVyO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNS4gMTcuLlxuICovXG5pbXBvcnQgQ2FwdGlvbkxvYWRlciBmcm9tICdhcGkvY2FwdGlvbi9Mb2FkZXInO1xuaW1wb3J0IHtSRUFEWSwgRVJST1JTLCBFUlJPUiwgUExBWUVSX0NBUFRJT05fRVJST1IsIENPTlRFTlRfTUVUQSwgQ09OVEVOVF9USU1FLCBDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQsIENPTlRFTlRfQ0FQVElPTl9DSEFOR0VEfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcblxuY29uc3QgaXNTdXBwb3J0ID0gZnVuY3Rpb24oa2luZCl7XG4gICAgcmV0dXJuIGtpbmQgPT09ICdzdWJ0aXRsZXMnIHx8IGtpbmQgPT09ICdjYXB0aW9ucyc7XG59O1xuXG5jb25zdCBNYW5hZ2VyID0gZnVuY3Rpb24oYXBpLCBwbGF5bGlzdEluZGV4KXtcblxuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICBsZXQgY2FwdGlvbkxpc3QgPSBbXTtcbiAgICBsZXQgY3VycmVudENhcHRpb25JbmRleCA9IC0xO1xuXG4gICAgbGV0IGNhcHRpb25Mb2FkZXIgPSBDYXB0aW9uTG9hZGVyKCk7XG4gICAgbGV0IGlzRmlzcnRMb2FkID0gdHJ1ZTtcbiAgICBsZXQgaXNTaG93aW5nID0gZmFsc2U7XG5cblxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNhcHRpb24gTWFuYWdlciA+PiBcIiwgcGxheWxpc3RJbmRleCk7XG5cblxuICAgIGxldCBiaW5kVHJhY2sgPSBmdW5jdGlvbih0cmFjaywgdnR0Q3Vlcyl7XG4gICAgICAgIHRyYWNrLmRhdGEgPSB2dHRDdWVzIHx8IFtdO1xuICAgICAgICB0cmFjay5uYW1lID0gdHJhY2subGFiZWwgfHwgdHJhY2submFtZSB8fCB0cmFjay5sYW5ndWFnZTtcbiAgICAgICAgdHJhY2suaWQgPSAoZnVuY3Rpb24odHJhY2ssIHRyYWNrc0NvdW50KSB7XG4gICAgICAgICAgICB2YXIgdHJhY2tJZDtcbiAgICAgICAgICAgIHZhciBwcmVmaXggPSB0cmFjay5raW5kIHx8ICdjYyc7XG4gICAgICAgICAgICBpZiAodHJhY2suZGVmYXVsdCB8fCB0cmFjay5kZWZhdWx0dHJhY2spIHtcbiAgICAgICAgICAgICAgICB0cmFja0lkID0gJ2RlZmF1bHQnO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRyYWNrSWQgPSB0cmFjay5pZCB8fCAocHJlZml4ICsgdHJhY2tzQ291bnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoaXNGaXNydExvYWQpe1xuICAgICAgICAgICAgICAgIC8vVGhpcyBleGVjdXRlIG9ubHkgb24uIGFuZCB0aGVuIHVzZSBmbHVzaENhcHRpb25MaXN0KGxhc3RDYXB0aW9uSW5kZXgpO1xuICAgICAgICAgICAgICAgIGNoYW5nZUN1cnJlbnRDYXB0aW9uKGNhcHRpb25MaXN0Lmxlbmd0aHx8MCk7XG4gICAgICAgICAgICAgICAgaXNGaXNydExvYWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRyYWNrSWQ7XG4gICAgICAgIH0pKHRyYWNrLCBjYXB0aW9uTGlzdC5sZW5ndGgpO1xuXG4gICAgICAgIGNhcHRpb25MaXN0LnB1c2godHJhY2spO1xuICAgICAgICByZXR1cm4gdHJhY2suaWQ7XG4gICAgfTtcbiAgICBsZXQgY2hhbmdlQ3VycmVudENhcHRpb24gPSBmdW5jdGlvbihpbmRleCl7XG4gICAgICAgIGN1cnJlbnRDYXB0aW9uSW5kZXggPSBpbmRleDtcbiAgICAgICAgYXBpLnRyaWdnZXIoQ09OVEVOVF9DQVBUSU9OX0NIQU5HRUQsIGN1cnJlbnRDYXB0aW9uSW5kZXgpO1xuICAgIH07XG4gICAgaWYoYXBpLmdldENvbmZpZygpLnBsYXlsaXN0ICYmIGFwaS5nZXRDb25maWcoKS5wbGF5bGlzdC5sZW5ndGggPiAwKXtcbiAgICAgICAgbGV0IHBsYXlsaXN0ID0gYXBpLmdldENvbmZpZygpLnBsYXlsaXN0W3BsYXlsaXN0SW5kZXhdO1xuXG4gICAgICAgIGlmKHBsYXlsaXN0ICYmIHBsYXlsaXN0LnRyYWNrcyAmJiBwbGF5bGlzdC50cmFja3MubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcGxheWxpc3QudHJhY2tzLmxlbmd0aDsgaSArKyl7XG4gICAgICAgICAgICAgICAgY29uc3QgdHJhY2sgPSBwbGF5bGlzdC50cmFja3NbaV07XG5cbiAgICAgICAgICAgICAgICBpZihpc1N1cHBvcnQodHJhY2sua2luZCkgJiYgISBfLmZpbmRXaGVyZSh0cmFjaywge2ZpbGUgOiB0cmFjay5maWxlfSkpe1xuICAgICAgICAgICAgICAgICAgICAvL3RoYXQuZmx1c2hDYXB0aW9uTGlzdChjdXJyZW50Q2FwdGlvbkluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbkxvYWRlci5sb2FkKHRyYWNrLCB0cmFjay5sYW5nLCBmdW5jdGlvbih2dHRDdWVzKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHZ0dEN1ZXMgJiYgdnR0Q3Vlcy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2FwdGlvbklkID0gYmluZFRyYWNrKHRyYWNrLCB2dHRDdWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3Ipe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SU1tQTEFZRVJfQ0FQVElPTl9FUlJPUl07XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwaS50cmlnZ2VyKEVSUk9SLCB0ZW1wRXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwaS5vbihDT05URU5UX1RJTUUsIGZ1bmN0aW9uKG1ldGEpe1xuICAgICAgICBsZXQgcG9zaXRpb24gPSBtZXRhLnBvc2l0aW9uO1xuICAgICAgICBpZihjdXJyZW50Q2FwdGlvbkluZGV4ID4gLTEgJiYgY2FwdGlvbkxpc3RbY3VycmVudENhcHRpb25JbmRleF0pe1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRDdWVzID0gXy5maWx0ZXIoY2FwdGlvbkxpc3RbY3VycmVudENhcHRpb25JbmRleF0uZGF0YSwgZnVuY3Rpb24gKGN1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwb3NpdGlvbiA+PSAoY3VlLnN0YXJ0VGltZSkgJiYgKCAoIWN1ZS5lbmRUaW1lIHx8IHBvc2l0aW9uKSA8PSBjdWUuZW5kVGltZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmKGN1cnJlbnRDdWVzICYmIGN1cnJlbnRDdWVzLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIGFwaS50cmlnZ2VyKENPTlRFTlRfQ0FQVElPTl9DVUVfQ0hBTkdFRCwgY3VycmVudEN1ZXNbMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9KTtcbiAgICB0aGF0LmZsdXNoQ2FwdGlvbkxpc3QgPSAobGFzdENhcHRpb25JbmRleCkgPT57XG4gICAgICAgIGNhcHRpb25MaXN0ID0gW107XG4gICAgICAgIGNoYW5nZUN1cnJlbnRDYXB0aW9uKGxhc3RDYXB0aW9uSW5kZXgpO1xuICAgICAgICAvL2N1cnJlbnRDYXB0aW9uSW5kZXggPSBsYXN0Q2FwdGlvbkluZGV4O1xuICAgIH07XG4gICAgdGhhdC5nZXRDYXB0aW9uTGlzdCA9ICgpID0+e1xuICAgICAgICByZXR1cm4gY2FwdGlvbkxpc3R8fFtdO1xuICAgIH07XG4gICAgdGhhdC5nZXRDdXJyZW50Q2FwdGlvbiA9ICgpID0+e1xuICAgICAgICByZXR1cm4gY3VycmVudENhcHRpb25JbmRleDtcbiAgICB9O1xuICAgIHRoYXQuc2V0Q3VycmVudENhcHRpb24gPSAoX2luZGV4KSA9PntcbiAgICAgICAgaWYoX2luZGV4ID4gLTIgJiYgX2luZGV4IDwgY2FwdGlvbkxpc3QubGVuZ3RoKXtcbiAgICAgICAgICAgIGNoYW5nZUN1cnJlbnRDYXB0aW9uKF9pbmRleCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQuYWRkQ2FwdGlvbiA9ICh0cmFjaykgPT57XG4gICAgICAgIGlmKGlzU3VwcG9ydCh0cmFjay5raW5kKSAmJiAhIF8uZmluZFdoZXJlKGNhcHRpb25Mb2FkZXIsIHtmaWxlIDogdHJhY2suZmlsZX0pKXtcbiAgICAgICAgICAgIGNhcHRpb25Mb2FkZXIubG9hZCh0cmFjaywgZnVuY3Rpb24odnR0Q3Vlcyl7XG4gICAgICAgICAgICAgICAgaWYodnR0Q3VlcyAmJiB2dHRDdWVzLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICBiaW5kVHJhY2sodHJhY2ssIHZ0dEN1ZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKXtcbiAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTW1BMQVlFUl9DQVBUSU9OX0VSUk9SXTtcbiAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICBhcGkudHJpZ2dlcihFUlJPUiwgdGVtcEVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LnJlbW92ZUNhcHRpb24gPSAoaW5kZXgpID0+IHtcbiAgICAgICAgaWYoaW5kZXggPiAtMSAmJiBpbmRleCA8IGNhcHRpb25MaXN0Lmxlbmd0aCl7XG4gICAgICAgICAgICBjYXB0aW9uTGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgcmV0dXJuIGNhcHRpb25MaXN0O1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgICAgIGNhcHRpb25MaXN0ID0gW107XG4gICAgICAgIGNhcHRpb25Mb2FkZXIgPSBudWxsO1xuICAgICAgICBhcGkub2ZmKENPTlRFTlRfVElNRSwgbnVsbCwgdGhhdCk7XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuXG5cblxuZXhwb3J0IGRlZmF1bHQgTWFuYWdlcjtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDUuIDI5Li5cbiAqL1xuaW1wb3J0IHsgaG1zVG9TZWNvbmQsIHRyaW0gfSBmcm9tIFwidXRpbHMvc3RyaW5nc1wiXG5cbmZ1bmN0aW9uIF9lbnRyeShkYXRhKSB7XG4gICAgdmFyIGVudHJ5ID0ge307XG4gICAgdmFyIGFycmF5ID0gZGF0YS5zcGxpdCgnXFxyXFxuJyk7XG4gICAgaWYgKGFycmF5Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBhcnJheSA9IGRhdGEuc3BsaXQoJ1xcbicpO1xuICAgIH1cbiAgICB2YXIgaWR4ID0gMTtcbiAgICBpZiAoYXJyYXlbMF0uaW5kZXhPZignIC0tPiAnKSA+IDApIHtcbiAgICAgICAgaWR4ID0gMDtcbiAgICB9XG4gICAgaWYgKGFycmF5Lmxlbmd0aCA+IGlkeCArIDEgJiYgYXJyYXlbaWR4ICsgMV0pIHtcbiAgICAgICAgLy8gVGhpcyBsaW5lIGNvbnRhaW5zIHRoZSBzdGFydCBhbmQgZW5kLlxuICAgICAgICB2YXIgbGluZSA9IGFycmF5W2lkeF07XG4gICAgICAgIHZhciBpbmRleCA9IGxpbmUuaW5kZXhPZignIC0tPiAnKTtcbiAgICAgICAgaWYgKGluZGV4ID4gMCkge1xuICAgICAgICAgICAgZW50cnkuc3RhcnQgPSBobXNUb1NlY29uZChsaW5lLnN1YnN0cigwLCBpbmRleCkpO1xuICAgICAgICAgICAgZW50cnkuZW5kID0gaG1zVG9TZWNvbmQobGluZS5zdWJzdHIoaW5kZXggKyA1KSk7XG4gICAgICAgICAgICBlbnRyeS50ZXh0ID0gYXJyYXkuc2xpY2UoaWR4ICsgMSkuam9pbignXFxyXFxuJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGVudHJ5O1xuXG59XG5cbmNvbnN0IFNydFBhcnNlciA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICB2YXIgY2FwdGlvbnMgPSBbXTtcblxuICAgIGRhdGEgPSB0cmltKGRhdGEpO1xuXG4gICAgdmFyIGxpc3QgPSBkYXRhLnNwbGl0KCdcXHJcXG5cXHJcXG4nKTtcbiAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgbGlzdCA9IGRhdGEuc3BsaXQoJ1xcblxcbicpO1xuICAgIH1cblxuXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGxpc3RbaV0gPT09ICdXRUJWVFQnKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZW50cnkgPSBfZW50cnkobGlzdFtpXSk7XG4gICAgICAgIGlmIChlbnRyeS50ZXh0KSB7XG4gICAgICAgICAgICBjYXB0aW9ucy5wdXNoKGVudHJ5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjYXB0aW9ucztcbn1cblxuXG5cbmV4cG9ydCBkZWZhdWx0IFNydFBhcnNlcjsiLCIvLyBTVEFURVxuZXhwb3J0IGNvbnN0IFNUQVRFX0JVRkZFUklORyA9IFwiYnVmZmVyaW5nXCI7XG5leHBvcnQgY29uc3QgU1RBVEVfSURMRSA9IFwiaWRsZVwiO1xuZXhwb3J0IGNvbnN0IFNUQVRFX0NPTVBMRVRFID0gXCJjb21wbGV0ZVwiO1xuZXhwb3J0IGNvbnN0IFNUQVRFX1BBVVNFRCA9IFwicGF1c2VkXCI7XG5leHBvcnQgY29uc3QgU1RBVEVfUExBWUlORyA9IFwicGxheWluZ1wiO1xuZXhwb3J0IGNvbnN0IFNUQVRFX0VSUk9SID0gXCJlcnJvclwiO1xuZXhwb3J0IGNvbnN0IFNUQVRFX0xPQURJTkcgPSBcImxvYWRpbmdcIjtcbmV4cG9ydCBjb25zdCBTVEFURV9TVEFMTEVEID0gXCJzdGFsbGVkXCI7XG5cbmV4cG9ydCBjb25zdCBTVEFURV9BRF9MT0FESU5HID0gXCJhZExvYWRpbmdcIjtcbmV4cG9ydCBjb25zdCBTVEFURV9BRF9MT0FERUQgPSBcImFkTG9hZGVkXCI7XG5leHBvcnQgY29uc3QgU1RBVEVfQURfUExBWUlORyA9IFwiYWRQbGF5aW5nXCI7XG5leHBvcnQgY29uc3QgU1RBVEVfQURfUEFVU0VEID0gXCJhZFBhdXNlZFwiO1xuZXhwb3J0IGNvbnN0IFNUQVRFX0FEX0NPTVBMRVRFID0gXCJhZENvbXBsZXRlXCI7XG5leHBvcnQgY29uc3QgU1RBVEVfQURfRVJST1IgPSBcImFkRXJyb3JcIjtcblxuLy8gUFJPVklERVJcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9IVE1MNSA9IFwiaHRtbDVcIjtcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9XRUJSVEMgPSBcIndlYnJ0Y1wiO1xuZXhwb3J0IGNvbnN0IFBST1ZJREVSX0RBU0ggPSBcImRhc2hcIjtcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9ITFMgPSBcImhsc1wiO1xuZXhwb3J0IGNvbnN0IFBST1ZJREVSX1JUTVAgPSBcInJ0bXBcIjtcblxuLy8gRVZFTlRTXG5leHBvcnQgY29uc3QgQ09OVEVOVF9DT01QTEVURSA9IFNUQVRFX0NPTVBMRVRFO1xuZXhwb3J0IGNvbnN0IFJFQURZID0gXCJyZWFkeVwiO1xuZXhwb3J0IGNvbnN0IERFU1RST1kgPSBcImRlc3Ryb3lcIjtcbmV4cG9ydCBjb25zdCBDT05URU5UX1NFRUsgPSBcInNlZWtcIjtcbmV4cG9ydCBjb25zdCBDT05URU5UX0JVRkZFUl9GVUxMID0gXCJidWZmZXJGdWxsXCI7XG5leHBvcnQgY29uc3QgRElTUExBWV9DTElDSyA9IFwiZGlzcGxheUNsaWNrXCI7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9MT0FERUQgPSBcImxvYWRlZFwiO1xuZXhwb3J0IGNvbnN0IFBMQVlMSVNUX0NIQU5HRUQgPSBcInBsYXlsaXN0Q2hhbmdlZFwiO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfU0VFS0VEID0gXCJzZWVrZWRcIjtcbmV4cG9ydCBjb25zdCBBTExfUExBWUxJU1RfRU5ERUQgPSBcImFsbFBsYXlsaXN0RW5kZWRcIjtcbmV4cG9ydCBjb25zdCBORVRXT1JLX1VOU1RBQkxFRCA9IFwidW5zdGFibGVOZXR3b3JrXCI7XG5cblxuXG5leHBvcnQgY29uc3QgRVJST1IgPSBcImVycm9yXCI7XG5cbi8vIFNUQVRFIE9GIFBMQVlFUlxuZXhwb3J0IGNvbnN0IFBMQVlFUl9TVEFURSA9IFwic3RhdGVDaGFuZ2VkXCI7XG5leHBvcnQgY29uc3QgUExBWUVSX0NPTVBMRVRFID0gU1RBVEVfQ09NUExFVEU7XG5leHBvcnQgY29uc3QgUExBWUVSX1BBVVNFID0gXCJwYXVzZVwiO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9QTEFZID0gXCJwbGF5XCI7XG5leHBvcnQgY29uc3QgUExBWUVSX1JFU0laRUQgPSBcInJlc2l6ZWRcIjtcbmV4cG9ydCBjb25zdCBQTEFZRVJfTE9BRElORyA9IFwibG9hZGluZ1wiO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9GVUxMU0NSRUVOX1JFUVVFU1QgPSBcImZ1bGxzY3JlZW5SZXF1ZXN0ZWRcIjtcbmV4cG9ydCBjb25zdCBQTEFZRVJfRlVMTFNDUkVFTl9DSEFOR0VEID0gXCJmdWxsc2NyZWVuQ2hhbmdlZFwiO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XQVJOSU5HID0gXCJ3YXJuaW5nXCI7XG5cbmV4cG9ydCBjb25zdCBBRF9DSEFOR0VEID0gXCJhZENoYW5nZWRcIjtcbmV4cG9ydCBjb25zdCBBRF9USU1FID0gXCJhZFRpbWVcIjtcbmV4cG9ydCBjb25zdCBDT05URU5UX0JVRkZFUiA9IFwiYnVmZmVyQ2hhbmdlZFwiO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfVElNRSA9IFwidGltZVwiO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfUkFURV9DSEFOR0UgPSBcInJhdGVjaGFuZ2VcIjtcbmV4cG9ydCBjb25zdCBDT05URU5UX1ZPTFVNRSA9IFwidm9sdW1lQ2hhbmdlZFwiO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfTVVURSA9IFwibXV0ZVwiO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfTUVUQSA9IFwibWV0YUNoYW5nZWRcIjtcbmV4cG9ydCBjb25zdCBDT05URU5UX1NPVVJDRV9DSEFOR0VEID0gXCJzb3VyY2VDaGFuZ2VkXCI7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9MRVZFTF9DSEFOR0VEID0gXCJxdWFsaXR5TGV2ZWxDaGFuZ2VkXCI7XG5leHBvcnQgY29uc3QgUExBWUJBQ0tfUkFURV9DSEFOR0VEID0gXCJwbGF5YmFja1JhdGVDaGFuZ2VkXCI7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VEID0gXCJjdWVDaGFuZ2VkXCI7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9DQVBUSU9OX0NIQU5HRUQgPSBcImNhcHRpb25DaGFuZ2VkXCI7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9USU1FX01PREVfQ0hBTkdFRCA9IFwidGltZURpc3BsYXlNb2RlQ2hhbmdlZFwiO1xuZXhwb3J0IGNvbnN0IE9NRV9QMlBfTU9ERSA9IFwicDJwTW9kZVwiO1xuXG5cbmV4cG9ydCBjb25zdCBJTklUX1VOS05XT05fRVJST1IgPSAxMDA7XG5leHBvcnQgY29uc3QgSU5JVF9VTlNVUFBPUlRfRVJST1IgPSAxMDE7XG5leHBvcnQgY29uc3QgSU5JVF9SVE1QX1NFVFVQX0VSUk9SID0gMTAyO1xuZXhwb3J0IGNvbnN0IElOSVRfREFTSF9VTlNVUFBPUlQgPSAxMDM7XG5leHBvcnQgY29uc3QgSU5JVF9BRFNfRVJST1IgPSAxMDQ7XG5leHBvcnQgY29uc3QgSU5JVF9EQVNIX05PVEZPVU5EID0gMTA1O1xuZXhwb3J0IGNvbnN0IElOSVRfSExTSlNfTk9URk9VTkQgPSAxMDY7XG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fRVJST1IgPSAzMDA7XG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SID0gMzAxO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX05FV1dPUktfRVJST1IgPSAzMDI7XG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SID0gMzAzO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9GSUxFX0VSUk9SID0gMzA0O1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9DQVBUSU9OX0VSUk9SID0gMzA1O1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfV1NfRVJST1IgPSA1MDE7XG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SID0gNTAyO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SID0gNTAzO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUiA9IDUwNDtcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SID0gNTA1O1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfTkVUV09SS19TTE9XID0gNTEwO1xuXG5leHBvcnQgY29uc3QgV0FSTl9NU0dfTVVURURQTEFZID0gXCJQbGVhc2UgdG91Y2ggaGVyZSB0byB0dXJuIG9uIHRoZSBzb3VuZC5cIjtcblxuZXhwb3J0IGNvbnN0IEVSUk9SUyA9IHtcbiAgICAxMDAgOiB7Y29kZSA6IDEwMCAsIG1lc3NhZ2UgOiBcIkNhbiBub3QgbG9hZCBkdWUgdG8gdW5rbm93biByZWFzb25zLlwiLCByZWFzb24gOlwiQ2FuIG5vdCBsb2FkIGR1ZSB0byB1bmtub3duIHJlYXNvbnMuXCJ9LFxuICAgIDEwMSA6IHtjb2RlIDogMTAxICwgbWVzc2FnZSA6IFwiQ2FuIG5vdCBsb2FkIGR1ZSB0byB1bnN1cHBvcnRlZCBtZWRpYS5cIiwgcmVhc29uIDpcIkNhbiBub3QgbG9hZCBkdWUgdG8gdW5zdXBwb3J0ZWQgbWVkaWEuXCJ9LFxuICAgIDEwMiA6IHtjb2RlIDogMTAyICwgbWVzc2FnZSA6IFwiRmxhc2ggZmV0Y2hpbmcgcHJvY2VzcyBhYm9ydGVkLiA8L2JyPjxhIGhyZWY9J2h0dHA6Ly93d3cuYWRvYmUuY29tL2dvL2dldGZsYXNocGxheWVyJyB0YXJnZXQ9J19zZWxmJz48aW1nIHNyYz0naHR0cDovL3d3dy5hZG9iZS5jb20vaW1hZ2VzL3NoYXJlZC9kb3dubG9hZF9idXR0b25zL2dldF9mbGFzaF9wbGF5ZXIuZ2lmJyBhbHQ9J0dldCBBZG9iZSBGbGFzaCBwbGF5ZXInPjwvYT5cIiwgcmVhc29uIDpcIkl0IGxvb2tzIGxpa2Ugbm90IGZvdW5kIHN3ZiBvciB5b3VyIGVudmlyb25tZW50IGlzIGxvY2FsaG9zdC5cIn0sXG4gICAgMTAzIDoge2NvZGUgOiAxMDMgLCBtZXNzYWdlIDogXCJDYW4gbm90IGxvYWQgZHVlIHRvIGRhc2hqcy4gUGxlYXNlIGNoZWNrIHRoZSBsYXN0ZXN0IHZlcnNpb24uXCIsIHJlYXNvbiA6XCJkYXNoLmpzIHZlcnNpb24gaXMgb2xkLiBQbGVhc2UgY2hlY2sgdGhlIGxhc3Rlc3QuXCJ9LFxuICAgIDEwNCA6IHtjb2RlIDogMTA0ICwgbWVzc2FnZSA6IFwiQ2FuIG5vdCBsb2FkIGR1ZSB0byBnb29nbGUgaW1hIGZvciBBZHMuIFwiLCByZWFzb24gOlwiUGxlYXNlIGNoZWNrIHRoZSBnb29nbGUgaW1hIGxpYnJhcnkuXCJ9LFxuICAgIDEwNSA6IHtjb2RlIDogMTA1ICwgbWVzc2FnZSA6IFwiQ2FuIG5vdCBmaW5kIHRoZSBkYXNoanMuIFBsZWFzZSBjaGVjayB0aGUgZGFzaGpzLlwiLCByZWFzb24gOlwiTm90IGZvdW5kIGRhc2hqcy5cIn0sXG4gICAgMTA2IDoge2NvZGUgOiAxMDYgLCBtZXNzYWdlIDogXCJDYW4gbm90IGZpbmQgdGhlIGhsc2pzLiBQbGVhc2UgY2hlY2sgdGhlIGhsc2pzLlwiLCByZWFzb24gOlwiTm90IGZvdW5kIGhsc2pzLlwifSxcbiAgICAzMDAgOiB7Y29kZSA6IDMwMCAsIG1lc3NhZ2UgOiBcIkNhbiBub3QgcGxheSBkdWUgdG8gdW5rbm93biByZWFzb25zLlwiLCByZWFzb24gOlwiQ2FuIG5vdCBwbGF5IGR1ZSB0byB1bmtub3duIHJlYXNvbnMuXCJ9LFxuICAgIDMwMSA6IHtjb2RlIDogMzAxICwgbWVzc2FnZSA6IFwiRmV0Y2hpbmcgcHJvY2VzcyBhYm9ydGVkIGJ5IHVzZXIuXCIsIHJlYXNvbiA6XCJGZXRjaGluZyBwcm9jZXNzIGFib3J0ZWQgYnkgdXNlci5cIn0sXG4gICAgMzAyIDoge2NvZGUgOiAzMDIgLCBtZXNzYWdlIDogXCJTb21lIG9mIHRoZSBtZWRpYSBjb3VsZCBub3QgYmUgZG93bmxvYWRlZCBkdWUgdG8gYSBuZXR3b3JrIGVycm9yLlwiLCByZWFzb24gOlwiRXJyb3Igb2NjdXJyZWQgd2hlbiBkb3dubG9hZGluZy5cIn0sXG4gICAgMzAzIDoge2NvZGUgOiAzMDMgLCBtZXNzYWdlIDogXCJVbmFibGUgdG8gbG9hZCBtZWRpYS4gVGhpcyBtYXkgYmUgZHVlIHRvIGEgc2VydmVyIG9yIG5ldHdvcmsgZXJyb3IsIG9yIGR1ZSB0byBhbiB1bnN1cHBvcnRlZCBmb3JtYXQuXCIsIHJlYXNvbiA6XCJFcnJvciBvY2N1cnJlZCB3aGVuIGRlY29kaW5nLlwifSxcbiAgICAzMDQgOiB7Y29kZSA6IDMwNCAsIG1lc3NhZ2UgOiBcIk1lZGlhIHBsYXliYWNrIGhhcyBiZWVuIGNhbmNlbGVkLiBJdCBsb29rcyBsaWtlIHlvdXIgbWVkaWEgaXMgY29ycnVwdGVkIG9yIHlvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSBmZWF0dXJlcyB5b3VyIG1lZGlhIHVzZXMuXCIsIHJlYXNvbiA6XCJNZWRpYSBwbGF5YmFjayBub3Qgc3VwcG9ydGVkLlwifSxcbiAgICAzMDUgOiB7Y29kZSA6IDMwNSAsIG1lc3NhZ2UgOiBcIkNhbiBub3QgbG9hZCBjYXB0aW9ucyBkdWUgdG8gdW5rbm93biByZWFzb25zLlwiLCByZWFzb24gOlwiQ2FuIG5vdCBsb2FkIGNhcHRpb25zIGR1ZSB0byB1bmtub3duIHJlYXNvbnMuXCJ9LFxuICAgIDUwMSA6IHtjb2RlIDogNTAxICwgbWVzc2FnZSA6IFwiQ29ubmVjdGlvbiB3aXRoIGxvdy1sYXRlbmN5KE9NRSkgc2VydmVyIGZhaWxlZC5cIiwgcmVhc29uIDpcIldlYlNvY2tldCBjb25uZWN0aW9uIGZhaWxlZC5cIn0sXG4gICAgNTAyIDoge2NvZGUgOiA1MDIgLCBtZXNzYWdlIDogXCJDb25uZWN0aW9uIHdpdGggbG93LWxhdGVuY3koT01FKSBzZXJ2ZXIgZmFpbGVkLlwiLCByZWFzb24gOlwiV2ViUlRDIGFkZEljZUNhbmRpZGF0ZSBmYWlsZWQuXCJ9LFxuICAgIDUwMyA6IHtjb2RlIDogNTAzICwgbWVzc2FnZSA6IFwiQ29ubmVjdGlvbiB3aXRoIGxvdy1sYXRlbmN5KE9NRSkgc2VydmVyIGZhaWxlZC5cIiwgcmVhc29uIDpcIldlYlJUQyBzZXRSZW1vdGVEZXNjcmlwdGlvbiBmYWlsZWQuXCJ9LFxuICAgIDUwNCA6IHtjb2RlIDogNTA0ICwgbWVzc2FnZSA6IFwiQ29ubmVjdGlvbiB3aXRoIGxvdy1sYXRlbmN5KE9NRSkgc2VydmVyIGZhaWxlZC5cIiwgcmVhc29uIDpcIldlYlJUQyBwZWVyIGNyZWF0ZU9mZmVyIGZhaWxlZC5cIn0sXG4gICAgNTA1IDoge2NvZGUgOiA1MDUgLCBtZXNzYWdlIDogXCJDb25uZWN0aW9uIHdpdGggbG93LWxhdGVuY3koT01FKSBzZXJ2ZXIgZmFpbGVkLlwiLCByZWFzb24gOlwiV2ViUlRDIHNldExvY2FsRGVzY3JpcHRpb24gZmFpbGVkLlwifSxcbiAgICA1MTAgOiB7Y29kZSA6IDUxMCAsIG1lc3NhZ2UgOiBcIk5ldHdvcmsgY29ubmVjdGlvbiBpcyB1bnN0YWJsZS4gQ2hlY2sgdGhlIG5ldHdvcmsgY29ubmVjdGlvbi5cIiwgcmVhc29uIDpcIk5ldHdvcmsgaXMgc2xvdy5cIn1cbn07XG5cbmV4cG9ydCBjb25zdCBVSV9JQ09OUyA9IHtcbiAgICB2b2x1bWVfbXV0ZSA6IFwidm9sdW1lLW11dGVcIlxufTtcbiIsIi8qKlxuICogQGJyaWVmICAg66+465SU7Ja0IOyXmOumrOuovO2KuOulvCDqtIDrpqztlZjripQg6rCd7LK0LiDtmITsnqzripQg7ZWY64qUIOydvOydtCDrp47sp4Ag7JWK64ukLlxuICogQHBhcmFtICAge2VsZW1lbnR9ICAgY29udGFpbmVyICAgZG9tIGVsZW1lbnRcbiAqXG4gKiAqL1xuaW1wb3J0IHtnZXRCcm93c2VyfSBmcm9tIFwidXRpbHMvYnJvd3NlclwiO1xuaW1wb3J0IHtQUk9WSURFUl9EQVNILCBQUk9WSURFUl9ITFMsIFBST1ZJREVSX1dFQlJUQywgUFJPVklERVJfSFRNTDUsIFBST1ZJREVSX1JUTVB9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5pbXBvcnQgTEEkIGZyb20gXCJ1dGlscy9saWtlQSQuanNcIjtcbmltcG9ydCB7Z2V0U2NyaXB0UGF0aH0gZnJvbSAndXRpbHMvd2VicGFjayc7XG5pbXBvcnQge3ZlcnNpb259IGZyb20gJ3ZlcnNpb24nO1xuLy9Ub0RvIDogUmVzdHJ1Y3R1cmluZ1xuXG5jb25zdCBNYW5hZ2VyID0gZnVuY3Rpb24oY29udGFpbmVyLCBicm93c2VySW5mbyl7XG4gICAgY29uc3QgdGhhdCA9IHt9O1xuICAgIGNvbnN0IFNXRlBhdGggPSBnZXRTY3JpcHRQYXRoKCdvdmVucGxheWVyLmpzJykrXCJPdmVuUGxheWVyRmxhc2guc3dmP3Y9XCIrdmVyc2lvbjtcbiAgICBsZXQgcm9vdElkID0gY29udGFpbmVyLmdldEF0dHJpYnV0ZShcImRhdGEtcGFyZW50LWlkXCIpO1xuICAgIGxldCAkY29udGFpbmVyID0gTEEkKGNvbnRhaW5lcik7XG4gICAgbGV0IHZpZGVvRWxlbWVudCA9IFwiXCI7XG5cbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJNZWRpYU1hbmFnZXIgbG9hZGVkLiBicm93c2VyIDogXCIsIGJyb3dzZXJJbmZvICk7XG5cbiAgICBjb25zdCBjcmVhdGVIdG1sVmlkZW8gPSBmdW5jdGlvbihpc0xvb3Ape1xuICAgICAgICB2aWRlb0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCdkaXNhYmxlcmVtb3RlcGxheWJhY2snLCAnJyk7XG4gICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3dlYmtpdC1wbGF5c2lubGluZScsICd0cnVlJyk7XG4gICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3BsYXlzaW5saW5lJywgJ3RydWUnKTtcbiAgICAgICAgaWYoaXNMb29wKXtcbiAgICAgICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2xvb3AnLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgJGNvbnRhaW5lci5hcHBlbmQodmlkZW9FbGVtZW50KTtcblxuICAgICAgICByZXR1cm4gdmlkZW9FbGVtZW50O1xuICAgIH07XG4gICAgY29uc3QgY3JlYXRlRmxhc2hWaWRlbyA9IGZ1bmN0aW9uKGlzTG9vcCwgYnVmZmVyVGltZSwgYnVmZmVyVGltZU1heCl7XG4gICAgICAgIGxldCBtb3ZpZSwgZmxhc2h2YXJzLCBhbGxvd3NjcmlwdGFjY2VzcywgYWxsb3dmdWxsc2NyZWVuLCBxdWFsaXR5LCBuYW1lLCBtZW51LCBxdWFsLCBiZ2NvbG9yLCBsb29wLCB3bW9kZSA7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIk1lZGlhTWFuYWdlciBGbGFzaCBidWZmZXIgc2V0dGluZyA6IFwiLCBidWZmZXJUaW1lLCBidWZmZXJUaW1lTWF4KTtcbiAgICAgICAgbW92aWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xuICAgICAgICBtb3ZpZS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnbW92aWUnKTtcbiAgICAgICAgbW92aWUuc2V0QXR0cmlidXRlKCd2YWx1ZScsIFNXRlBhdGgpO1xuXG4gICAgICAgIGZsYXNodmFycyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XG4gICAgICAgIGZsYXNodmFycy5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnZmxhc2h2YXJzJyk7XG4gICAgICAgIC8vcGxheWVySWQgaXMgdG8gdXNlIFNXRiBmb3IgRXh0ZXJuYWxJbnRlcmZhY2UuY2FsbCgpLlxuICAgICAgICBmbGFzaHZhcnMuc2V0QXR0cmlidXRlKCd2YWx1ZScsIGBwbGF5ZXJJZD0ke3Jvb3RJZH0mYnVmZmVyVGltZT0ke2J1ZmZlclRpbWV9JmJ1ZmZlck1heFRpbWU9JHtidWZmZXJUaW1lTWF4fWApO1xuXG4gICAgICAgIGFsbG93c2NyaXB0YWNjZXNzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcbiAgICAgICAgYWxsb3dzY3JpcHRhY2Nlc3Muc2V0QXR0cmlidXRlKCduYW1lJywgJ2FsbG93c2NyaXB0YWNjZXNzJyk7XG4gICAgICAgIGFsbG93c2NyaXB0YWNjZXNzLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnYWx3YXlzJyk7XG5cbiAgICAgICAgYWxsb3dmdWxsc2NyZWVuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcbiAgICAgICAgYWxsb3dmdWxsc2NyZWVuLnNldEF0dHJpYnV0ZSgnbmFtZScsICdhbGxvd2Z1bGxzY3JlZW4nKTtcbiAgICAgICAgYWxsb3dmdWxsc2NyZWVuLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAndHJ1ZScpO1xuXG4gICAgICAgIHF1YWxpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xuICAgICAgICBxdWFsaXR5LnNldEF0dHJpYnV0ZSgnbmFtZScsICdxdWFsaXR5Jyk7XG4gICAgICAgIHF1YWxpdHkuc2V0QXR0cmlidXRlKCd2YWx1ZScsICdoZWlnaHQnKTtcblxuICAgICAgICBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcbiAgICAgICAgbmFtZS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnbmFtZScpO1xuICAgICAgICBuYW1lLnNldEF0dHJpYnV0ZSgndmFsdWUnLCByb290SWQrXCItZmxhc2hcIik7XG5cbiAgICAgICAgbWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XG4gICAgICAgIG1lbnUuc2V0QXR0cmlidXRlKCduYW1lJywgJ21lbnUnKTtcbiAgICAgICAgbWVudS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ2ZhbHNlJyk7XG5cbiAgICAgICAgcXVhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XG4gICAgICAgIHF1YWwuc2V0QXR0cmlidXRlKCduYW1lJywgJ3F1YWxpdHknKTtcbiAgICAgICAgcXVhbC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ2hpZ2gnKTtcblxuICAgICAgICBiZ2NvbG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcbiAgICAgICAgYmdjb2xvci5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnYmdjb2xvcicpO1xuICAgICAgICBiZ2NvbG9yLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnIzAwMDAwMCcpO1xuXG4gICAgICAgIHdtb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcbiAgICAgICAgd21vZGUuc2V0QXR0cmlidXRlKCduYW1lJywgJ3dtb2RlJyk7XG4gICAgICAgIHdtb2RlLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnb3BhcXVlJyk7XG5cbiAgICAgICAgLypsZXQgYWxsb3dCdXR0b24gPSBgPGEgaHJlZj1cImh0dHA6Ly93d3cuYWRvYmUuY29tL2dvL2dldGZsYXNocGxheWVyXCI+PGltZyBzcmM9XCJodHRwOi8vd3d3LmFkb2JlLmNvbS9pbWFnZXMvc2hhcmVkL2Rvd25sb2FkX2J1dHRvbnMvZ2V0X2ZsYXNoX3BsYXllci5naWZcIiBhbHQ9XCJHZXQgQWRvYmUgRmxhc2ggcGxheWVyXCI+PC9hPmA7XG4gICAgICAgIG1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBtZXNzYWdlLmlubmVySFRNTCA9IGFsbG93QnV0dG9uOyovXG5cbiAgICAgICAgaWYoaXNMb29wKXtcbiAgICAgICAgICAgIGxvb3AgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xuICAgICAgICAgICAgbG9vcC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnbG9vcCcpO1xuICAgICAgICAgICAgbG9vcC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ3RydWUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZpZGVvRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29iamVjdCcpO1xuICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsIHJvb3RJZCtcIi1mbGFzaFwiKTtcbiAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnbmFtZScsIHJvb3RJZCtcIi1mbGFzaFwiKTtcbiAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAnMTAwJScpO1xuICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnMTAwJScpO1xuICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCdzY2FsZScsICdkZWZhdWx0Jyk7XG4gICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3dtb2RlJywgJ29wYXF1ZScpO1xuXG4gICAgICAgIGlmKGJyb3dzZXJJbmZvLmJyb3dzZXIgPT09IFwiTWljcm9zb2Z0IEludGVybmV0IEV4cGxvcmVyXCIgJiYgYnJvd3NlckluZm8uYnJvd3Nlck1ham9yVmVyc2lvbiA8PSA5ICl7XG4gICAgICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCdjbGFzc2lkJywgJ2Nsc2lkOkQyN0NEQjZFLUFFNkQtMTFjZi05NkI4LTQ0NDU1MzU0MDAwMCcpO1xuICAgICAgICAgICAgdmlkZW9FbGVtZW50LmFwcGVuZENoaWxkKG1vdmllKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhJywgU1dGUGF0aCk7XG4gICAgICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2FwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoaXNMb29wKXtcbiAgICAgICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChsb29wKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZCh3bW9kZSk7XG4gICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChiZ2NvbG9yKTtcbiAgICAgICAgdmlkZW9FbGVtZW50LmFwcGVuZENoaWxkKHF1YWwpO1xuICAgICAgICB2aWRlb0VsZW1lbnQuYXBwZW5kQ2hpbGQoYWxsb3dmdWxsc2NyZWVuKTtcbiAgICAgICAgdmlkZW9FbGVtZW50LmFwcGVuZENoaWxkKGFsbG93c2NyaXB0YWNjZXNzKTtcbiAgICAgICAgdmlkZW9FbGVtZW50LmFwcGVuZENoaWxkKGZsYXNodmFycyk7XG4gICAgICAgIC8vdmlkZW9FbGVtZW50LmFwcGVuZENoaWxkKG1lc3NhZ2UpO1xuXG4gICAgICAgICRjb250YWluZXIuYXBwZW5kKHZpZGVvRWxlbWVudCk7XG5cbiAgICAgICAgcmV0dXJuIHZpZGVvRWxlbWVudDtcbiAgICB9O1xuXG4gICAgdGhhdC5jcmVhdGVNZWRpYSA9IChwcm92aWRlck5hbWUgLCBwbGF5ZXJDb25maWcpICA9PiB7XG4gICAgICAgIGlmKHZpZGVvRWxlbWVudCl7XG4gICAgICAgICAgICB0aGF0LmVtcHR5KCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcHJvdmlkZXJOYW1lID09PSBQUk9WSURFUl9SVE1QID8gY3JlYXRlRmxhc2hWaWRlbyhwbGF5ZXJDb25maWcuaXNMb29wKCksIHBsYXllckNvbmZpZy5nZXRSdG1wQnVmZmVyVGltZSgpLCBwbGF5ZXJDb25maWcuZ2V0UnRtcEJ1ZmZlclRpbWVNYXgoKSlcbiAgICAgICAgICAgIDogY3JlYXRlSHRtbFZpZGVvKHBsYXllckNvbmZpZy5pc0xvb3AoKSk7XG4gICAgfVxuXG4gICAgdGhhdC5jcmVhdGVBZENvbnRhaW5lciA9ICgpID0+IHtcbiAgICAgICAgbGV0IGFkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGFkQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnb3ZwLWFkcycpO1xuICAgICAgICAkY29udGFpbmVyLmFwcGVuZChhZENvbnRhaW5lcik7XG5cbiAgICAgICAgcmV0dXJuIGFkQ29udGFpbmVyO1xuICAgIH07XG5cblxuICAgIHRoYXQuZW1wdHkgPSAoKSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTWVkaWFNYW5hZ2VyIHJlbW92ZUVsZW1lbnQoKVwiKTtcbiAgICAgICAgJGNvbnRhaW5lci5yZW1vdmVDaGlsZCh2aWRlb0VsZW1lbnQpO1xuICAgICAgICB2aWRlb0VsZW1lbnQgPSBudWxsO1xuICAgIH07XG5cbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgJGNvbnRhaW5lci5yZW1vdmVDaGlsZCgpO1xuICAgICAgICAkY29udGFpbmVyID0gbnVsbDtcbiAgICAgICAgdmlkZW9FbGVtZW50ID0gbnVsbDtcbiAgICAgICAgcm9vdElkID0gbnVsbDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBNYW5hZ2VyO1xuIiwiaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcbmltcG9ydCB7aXNSdG1wLCBpc1dlYlJUQywgaXNEYXNoIH0gZnJvbSBcInV0aWxzL3ZhbGlkYXRvclwiO1xuaW1wb3J0IHtleHRyYWN0RXh0ZW5zaW9uICx0cmltfSBmcm9tIFwiLi4vLi4vdXRpbHMvc3RyaW5nc1wiO1xuaW1wb3J0IFN1cHBvcnRDaGVja2VyIGZyb20gXCIuLi9TdXBwb3J0Q2hlY2tlclwiO1xuaW1wb3J0IHtQTEFZTElTVF9DSEFOR0VEfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG4vKipcbiAqIEBicmllZiAgIFRoaXMgbWFuYWdlcyBQbGF5bGlzdCBvciBTb3VyY2VzLlxuICogQHBhcmFtXG4gKlxuICogKi9cbmNvbnN0IE1hbmFnZXIgPSBmdW5jdGlvbihwcm92aWRlcil7XG4gICAgY29uc3QgdGhhdCA9IHt9O1xuICAgIGxldCBjdXJyZW50UGxheWxpc3RJdGVtID0gW107XG4gICAgbGV0IHNwZWMgPSB7XG4gICAgICAgIHBsYXlsaXN0IDogW10sXG4gICAgICAgIGN1cnJlbnRJbmRleCA6IDBcbiAgICB9O1xuICAgIGxldCBzdXBwb3J0Q2hlY2tlciA9IFN1cHBvcnRDaGVja2VyKCk7XG5cbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQbGF5bGlzdE1hbmFnZXIgbG9hZGVkLlwiKTtcblxuICAgIGNvbnN0IG1ha2VQcmV0dHlTb3VyY2UgPSBmdW5jdGlvbihzb3VyY2VfKXtcbiAgICAgICAgaWYgKCFzb3VyY2VfIHx8ICFzb3VyY2VfLmZpbGUgJiYgIShzb3VyY2VfLmhvc3QgfHwgc291cmNlXy5hcHBsaWNhdGlvbiB8fCBzb3VyY2VfLnN0cmVhbSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzb3VyY2UgPSBPYmplY3QuYXNzaWduKHt9LCB7ICdkZWZhdWx0JzogZmFsc2UgfSwgc291cmNlXyk7XG4gICAgICAgIHNvdXJjZS5maWxlID0gdHJpbSgnJyArIHNvdXJjZS5maWxlKTtcblxuICAgICAgICBpZihzb3VyY2UuaG9zdCAmJiBzb3VyY2UuYXBwbGljYXRpb24gJiYgc291cmNlLnN0cmVhbSl7XG4gICAgICAgICAgICBzb3VyY2UuZmlsZSA9IHNvdXJjZS5ob3N0ICsgXCIvXCIgKyBzb3VyY2UuYXBwbGljYXRpb24gKyBcIi9zdHJlYW0vXCIgKyBzb3VyY2Uuc3RyZWFtO1xuICAgICAgICAgICAgZGVsZXRlIHNvdXJjZS5ob3N0O1xuICAgICAgICAgICAgZGVsZXRlIHNvdXJjZS5hcHBsaWNhdGlvbjtcbiAgICAgICAgICAgIGRlbGV0ZSBzb3VyY2Uuc3RyZWFtO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbWltZXR5cGVSZWdFeCA9IC9eW14vXStcXC8oPzp4LSk/KFteL10rKSQvO1xuXG4gICAgICAgIGlmIChtaW1ldHlwZVJlZ0V4LnRlc3Qoc291cmNlLnR5cGUpKSB7XG4gICAgICAgICAgICAvLyBpZiB0eXBlIGlzIGdpdmVuIGFzIGEgbWltZXR5cGVcbiAgICAgICAgICAgIHNvdXJjZS5taW1lVHlwZSA9IHNvdXJjZS50eXBlO1xuICAgICAgICAgICAgc291cmNlLnR5cGUgPSBzb3VyY2UudHlwZS5yZXBsYWNlKG1pbWV0eXBlUmVnRXgsICckMScpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoaXNSdG1wKHNvdXJjZS5maWxlKSl7XG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdydG1wJztcbiAgICAgICAgfWVsc2UgaWYoaXNXZWJSVEMoc291cmNlLmZpbGUpKXtcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ3dlYnJ0Yyc7XG4gICAgICAgIH1lbHNlIGlmKGlzRGFzaChzb3VyY2UuZmlsZSwgc291cmNlLnR5cGUpKXtcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ2Rhc2gnO1xuICAgICAgICB9ZWxzZSBpZiAoIXNvdXJjZS50eXBlKSB7XG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9IGV4dHJhY3RFeHRlbnNpb24oc291cmNlLmZpbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFzb3VyY2UudHlwZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbm9ybWFsaXplIHR5cGVzXG4gICAgICAgIHN3aXRjaCAoc291cmNlLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ20zdTgnOlxuICAgICAgICAgICAgY2FzZSAndm5kLmFwcGxlLm1wZWd1cmwnOlxuICAgICAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ2hscyc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdtNGEnOlxuICAgICAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ2FhYyc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdzbWlsJzpcbiAgICAgICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdydG1wJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICBpZiAoc291cmNlW2tleV0gPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHNvdXJjZVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc291cmNlO1xuXG4gICAgfVxuXG4gICAgdGhhdC5pbml0UGxheWxpc3QgPShwbGF5bGlzdCkgPT57XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBzZXRQbGF5bGlzdCgpIFwiLCBwbGF5bGlzdCk7XG4gICAgICAgIGNvbnN0IHByZXR0aWVkUGxheWxpc3QgPSAoXy5pc0FycmF5KHBsYXlsaXN0KSA/IHBsYXlsaXN0IDogW3BsYXlsaXN0XSkubWFwKGZ1bmN0aW9uKGl0ZW0pe1xuICAgICAgICAgICAgaWYoIV8uaXNBcnJheShpdGVtLnRyYWNrcykpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgaXRlbS50cmFja3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgcGxheWxpc3RJdGVtID0gT2JqZWN0LmFzc2lnbih7fSx7XG4gICAgICAgICAgICAgICAgc291cmNlczogW10sXG4gICAgICAgICAgICAgICAgdHJhY2tzOiBbXSxcbiAgICAgICAgICAgICAgICB0aXRsZSA6IFwiXCJcbiAgICAgICAgICAgIH0sIGl0ZW0gKTtcblxuICAgICAgICAgICAgaWYoKHBsYXlsaXN0SXRlbS5zb3VyY2VzID09PSBPYmplY3QocGxheWxpc3RJdGVtLnNvdXJjZXMpKSAmJiAhXy5pc0FycmF5KHBsYXlsaXN0SXRlbS5zb3VyY2VzKSkge1xuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gW21ha2VQcmV0dHlTb3VyY2UocGxheWxpc3RJdGVtLnNvdXJjZXMpXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFfLmlzQXJyYXkocGxheWxpc3RJdGVtLnNvdXJjZXMpIHx8IHBsYXlsaXN0SXRlbS5zb3VyY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gW21ha2VQcmV0dHlTb3VyY2UocGxheWxpc3RJdGVtKV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKCFfLmlzQXJyYXkocGxheWxpc3RJdGVtLnNvdXJjZXMpIHx8IHBsYXlsaXN0SXRlbS5zb3VyY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmxldmVscykge1xuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IGl0ZW0ubGV2ZWxzO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gW21ha2VQcmV0dHlTb3VyY2UoaXRlbSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcGxheWxpc3RJdGVtLnNvdXJjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgc291cmNlID0gcGxheWxpc3RJdGVtLnNvdXJjZXNbaV07XG4gICAgICAgICAgICAgICAgbGV0IHByZXR0eVNvdXJjZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgaWYgKCFzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGRlZmF1bHRTb3VyY2UgPSBzb3VyY2UuZGVmYXVsdDtcbiAgICAgICAgICAgICAgICBpZiAoZGVmYXVsdFNvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2UuZGVmYXVsdCA9IChkZWZhdWx0U291cmNlLnRvU3RyaW5nKCkgPT09ICd0cnVlJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlLmRlZmF1bHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgc291cmNlIGRvZXNuJ3QgaGF2ZSBhIGxhYmVsLCBudW1iZXIgaXRcbiAgICAgICAgICAgICAgICBpZiAoIXBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldLmxhYmVsID0gcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0udHlwZStcIi1cIitpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcHJldHR5U291cmNlID0gbWFrZVByZXR0eVNvdXJjZShwbGF5bGlzdEl0ZW0uc291cmNlc1tpXSk7XG4gICAgICAgICAgICAgICAgaWYoc3VwcG9ydENoZWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKHByZXR0eVNvdXJjZSkpe1xuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXSA9IHByZXR0eVNvdXJjZTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0gPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBwbGF5bGlzdEl0ZW0uc291cmNlcy5maWx0ZXIoc291cmNlID0+ICEhc291cmNlKTtcblxuICAgICAgICAgICAgaWYoIXBsYXlsaXN0SXRlbS50aXRsZSAmJiAgcGxheWxpc3RJdGVtLnNvdXJjZXNbMF0gJiYgcGxheWxpc3RJdGVtLnNvdXJjZXNbMF0ubGFiZWwpe1xuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS50aXRsZSA9IHBsYXlsaXN0SXRlbS5zb3VyY2VzWzBdLmxhYmVsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBkZWZhdWx0IOqwgCDsl4bsnYTrlYwgd2VicnRj6rCAIOyeiOuLpOuptCB3ZWJydGMgZGVmYXVsdCA6IHRydWXroZwg7J6Q64+ZIOyEpOyglVxuICAgICAgICAgICAgLypsZXQgaGF2ZURlZmF1bHQgPSBfLmZpbmQocGxheWxpc3RJdGVtLnNvdXJjZXMsIGZ1bmN0aW9uKHNvdXJjZSl7cmV0dXJuIHNvdXJjZS5kZWZhdWx0ID09IHRydWU7fSk7XG4gICAgICAgICAgICBsZXQgd2VicnRjU291cmNlID0gW107XG4gICAgICAgICAgICBpZighaGF2ZURlZmF1bHQpe1xuICAgICAgICAgICAgICAgIHdlYnJ0Y1NvdXJjZSA9IF8uZmluZChwbGF5bGlzdEl0ZW0uc291cmNlcywgZnVuY3Rpb24oc291cmNlKXtyZXR1cm4gc291cmNlLnR5cGUgPT0gXCJ3ZWJydGNcIjt9KTtcbiAgICAgICAgICAgICAgICBpZih3ZWJydGNTb3VyY2Upe1xuICAgICAgICAgICAgICAgICAgICB3ZWJydGNTb3VyY2UuZGVmYXVsdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSovXG5cblxuXG4gICAgICAgICAgICBpZighXy5pc0FycmF5KHBsYXlsaXN0SXRlbS50cmFja3MpKXtcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0udHJhY2tzID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihfLmlzQXJyYXkocGxheWxpc3RJdGVtLmNhcHRpb25zKSl7XG4gICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnRyYWNrcyA9IHBsYXlsaXN0SXRlbS50cmFja3MuY29uY2F0KHBsYXlsaXN0SXRlbS5jYXB0aW9ucyk7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHBsYXlsaXN0SXRlbS5jYXB0aW9ucztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcGxheWxpc3RJdGVtLnRyYWNrcyA9IHBsYXlsaXN0SXRlbS50cmFja3MubWFwKGZ1bmN0aW9uKHRyYWNrKXtcbiAgICAgICAgICAgICAgICBpZighdHJhY2sgfHwgIXRyYWNrLmZpbGUpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB7XG4gICAgICAgICAgICAgICAgICAgICdraW5kJzogJ2NhcHRpb25zJyxcbiAgICAgICAgICAgICAgICAgICAgJ2RlZmF1bHQnOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sIHRyYWNrKTtcbiAgICAgICAgICAgIH0pLmZpbHRlcih0cmFjayA9PiAhIXRyYWNrKTtcblxuICAgICAgICAgICAgcmV0dXJuIHBsYXlsaXN0SXRlbTtcbiAgICAgICAgfSkuZmlsdGVyKGZ1bmN0aW9uKGl0ZW0pe3JldHVybiBpdGVtLnNvdXJjZXMgJiYgaXRlbS5zb3VyY2VzLmxlbmd0aCA+IDA7fSl8fFtdO1xuICAgICAgICBzcGVjLnBsYXlsaXN0ID0gcHJldHRpZWRQbGF5bGlzdDtcbiAgICAgICAgcmV0dXJuIHByZXR0aWVkUGxheWxpc3Q7XG4gICAgfTtcbiAgICB0aGF0LmdldFBsYXlsaXN0ID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQbGF5bGlzdE1hbmFnZXIgZ2V0UGxheWxpc3QoKSBcIiwgc3BlYy5wbGF5bGlzdCk7XG4gICAgICAgIHJldHVybiBzcGVjLnBsYXlsaXN0O1xuICAgIH07XG4gICAgdGhhdC5nZXRDdXJyZW50UGxheUxpc3QgPSAoKSA9PiB7XG4gICAgICAgIGlmKHNwZWMucGxheWxpc3Rbc3BlYy5jdXJyZW50SW5kZXhdKXtcbiAgICAgICAgICAgIHJldHVybiBzcGVjLnBsYXlsaXN0W3NwZWMuY3VycmVudEluZGV4XTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQuZ2V0Q3VycmVudFBsYXlsaXN0SW5kZXggPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRJbmRleDtcbiAgICB9O1xuICAgIHRoYXQuc2V0Q3VycmVudFBsYXlsaXN0ID0gKGluZGV4KSA9PiB7XG4gICAgICAgIGlmKHNwZWMucGxheWxpc3RbaW5kZXhdKXtcbiAgICAgICAgICAgIHNwZWMuY3VycmVudEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICBwcm92aWRlci50cmlnZ2VyKFBMQVlMSVNUX0NIQU5HRUQsIHNwZWMuY3VycmVudEluZGV4KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50SW5kZXg7XG4gICAgfTtcbiAgICB0aGF0LmdldEN1cnJlbnRTb3VyY2VzID0gKCkgPT4ge1xuICAgICAgICAvL1dlIGRvIG5vdCBzdXBwb3J0IFwiUExBWUxJU1RcIiBub3QgeWV0LiBTbyB0aGlzIHJldHVybnMgcGxheWxpc3Qgb2YgMC5cbiAgICAgICAgaWYoc3BlYy5wbGF5bGlzdFtzcGVjLmN1cnJlbnRJbmRleF0pe1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIGdldEN1cnJlbnRTb3VyY2VzKCkgXCIsIHNwZWMucGxheWxpc3Rbc3BlYy5jdXJyZW50SW5kZXhdLnNvdXJjZXMpO1xuICAgICAgICAgICAgcmV0dXJuIHNwZWMucGxheWxpc3Rbc3BlYy5jdXJyZW50SW5kZXhdLnNvdXJjZXM7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgIH07XG4gICAgdGhhdC5nZXRDdXJyZW50QWRUYWcgPSAoKSA9PiB7XG4gICAgICAgIGlmKHNwZWMucGxheWxpc3Rbc3BlYy5jdXJyZW50SW5kZXhdKXtcbiAgICAgICAgICAgIHJldHVybiBzcGVjLnBsYXlsaXN0W3NwZWMuY3VycmVudEluZGV4XS5hZFRhZ1VybCB8fCBcIlwiO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCBNYW5hZ2VyO1xuIiwiaW1wb3J0IFN1cHBvcnRDaGVja2VyIGZyb20gXCJhcGkvU3VwcG9ydENoZWNrZXJcIjtcbmltcG9ydCB7QXBpUnRtcEV4cGFuc2lvbn0gZnJvbSAnYXBpL0FwaUV4cGFuc2lvbnMnO1xuaW1wb3J0IHtcbiAgICBQUk9WSURFUl9IVE1MNSwgUFJPVklERVJfV0VCUlRDLCBQUk9WSURFUl9EQVNILCBQUk9WSURFUl9ITFMsIFBST1ZJREVSX1JUTVAsXG4gICAgRVJST1JTLCBJTklUX1VOU1VQUE9SVF9FUlJPUlxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG4vKipcbiAqIEBicmllZiAgIFRoaXMgbWFuYWdlcyBwcm92aWRlci5cbiAqIEBwYXJhbVxuICogKi9cbmNvbnN0IENvbnRyb2xsZXIgPSBmdW5jdGlvbigpe1xuICAgIGxldCBzdXBwb3J0Q2hhY2tlciA9IFN1cHBvcnRDaGVja2VyKCk7XG4gICAgY29uc3QgUHJvdmlkZXJzID0ge307XG5cbiAgICBjb25zdCB0aGF0ID0ge307XG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGxvYWRlZC5cIik7XG5cbiAgICBjb25zdCByZWdpc3RlUHJvdmlkZXIgPSAobmFtZSwgcHJvdmlkZXIpID0+e1xuICAgICAgICBpZihQcm92aWRlcnNbbmFtZV0pe1xuICAgICAgICAgICAgcmV0dXJuIDtcbiAgICAgICAgfVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgX3JlZ2lzdGVyUHJvdmlkZXIoKSBcIiwgbmFtZSk7XG4gICAgICAgIFByb3ZpZGVyc1tuYW1lXSA9IHByb3ZpZGVyO1xuICAgIH07XG5cbiAgICBjb25zdCBQcm92aWRlckxvYWRlciA9e1xuICAgICAgICBodG1sNTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvaHRtbDUvcHJvdmlkZXJzL0h0bWw1J10sIGZ1bmN0aW9uKHJlcXVpcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvaHRtbDUvcHJvdmlkZXJzL0h0bWw1JykuZGVmYXVsdDtcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFBST1ZJREVSX0hUTUw1LCBwcm92aWRlcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtuYW1lIDogUFJPVklERVJfSFRNTDUsIHByb3ZpZGVyIDogcHJvdmlkZXJ9O1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xuICAgICAgICAgICAgICAgIH0sJ292ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDUnXG4gICAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICB3ZWJydGMgOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9XZWJSVEMnXSwgZnVuY3Rpb24ocmVxdWlyZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvV2ViUlRDJykuZGVmYXVsdDtcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFBST1ZJREVSX1dFQlJUQywgcHJvdmlkZXIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7bmFtZSA6IFBST1ZJREVSX1dFQlJUQywgcHJvdmlkZXIgOiBwcm92aWRlcn07XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XG4gICAgICAgICAgICAgICAgfSwnb3ZlbnBsYXllci5wcm92aWRlci5XZWJSVENQcm92aWRlcidcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIGRhc2ggOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9EYXNoJ10sIGZ1bmN0aW9uKHJlcXVpcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvaHRtbDUvcHJvdmlkZXJzL0Rhc2gnKS5kZWZhdWx0O1xuICAgICAgICAgICAgICAgICAgICByZWdpc3RlUHJvdmlkZXIoUFJPVklERVJfREFTSCwgcHJvdmlkZXIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7bmFtZSA6IFBST1ZJREVSX0RBU0gsIHByb3ZpZGVyIDogcHJvdmlkZXJ9O1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xuICAgICAgICAgICAgICAgIH0sJ292ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgaGxzIDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvSGxzJ10sIGZ1bmN0aW9uKHJlcXVpcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvaHRtbDUvcHJvdmlkZXJzL0hscycpLmRlZmF1bHQ7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVQcm92aWRlcihQUk9WSURFUl9ITFMsIHByb3ZpZGVyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge25hbWUgOiBQUk9WSURFUl9ITFMsIHByb3ZpZGVyIDogcHJvdmlkZXJ9O1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xuICAgICAgICAgICAgICAgIH0sJ292ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXInXG4gICAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICBydG1wIDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci9mbGFzaC9wcm92aWRlcnMvUnRtcCddLCBmdW5jdGlvbihyZXF1aXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2ZsYXNoL3Byb3ZpZGVycy9SdG1wJykuZGVmYXVsdDtcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFBST1ZJREVSX1JUTVAsIHByb3ZpZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtuYW1lIDogUFJPVklERVJfUlRNUCwgcHJvdmlkZXIgOiBwcm92aWRlcn07XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XG4gICAgICAgICAgICAgICAgfSwnb3ZlbnBsYXllci5wcm92aWRlci5SdG1wUHJvdmlkZXInXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgdGhhdC5sb2FkUHJvdmlkZXJzID0gKHBsYXlsaXN0SXRlbSkgPT57XG4gICAgICAgIGNvbnN0IHN1cHBvcnRlZFByb3ZpZGVyTmFtZXMgPSBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lc0J5UGxheWxpc3QocGxheWxpc3RJdGVtKTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGxvYWRQcm92aWRlcnMoKSBcIiwgc3VwcG9ydGVkUHJvdmlkZXJOYW1lcyk7XG4gICAgICAgIGlmKCFzdXBwb3J0ZWRQcm92aWRlck5hbWVzKXtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFUlJPUlNbSU5JVF9VTlNVUFBPUlRfRVJST1JdKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoXG4gICAgICAgICAgICAgICAgc3VwcG9ydGVkUHJvdmlkZXJOYW1lcy5maWx0ZXIoZnVuY3Rpb24ocHJvdmlkZXJOYW1lKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEhUHJvdmlkZXJMb2FkZXJbcHJvdmlkZXJOYW1lXTtcbiAgICAgICAgICAgICAgICB9KS5tYXAoZnVuY3Rpb24ocHJvdmlkZXJOYW1lKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb3ZpZGVyTG9hZGVyW3Byb3ZpZGVyTmFtZV0oKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIHRoYXQuZmluZEJ5TmFtZSA9IChuYW1lKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBmaW5kQnlOYW1lKCkgXCIsIG5hbWUpO1xuICAgICAgICByZXR1cm4gUHJvdmlkZXJzW25hbWVdO1xuICAgIH07XG5cbiAgICB0aGF0LmdldFByb3ZpZGVyQnlTb3VyY2UgPSAoc291cmNlKSA9PiB7XG4gICAgICAgIGNvbnN0IHN1cHBvcnRlZFByb3ZpZGVyTmFtZSA9IHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShzb3VyY2UpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgZ2V0UHJvdmlkZXJCeVNvdXJjZSgpIFwiLCBzdXBwb3J0ZWRQcm92aWRlck5hbWUpO1xuICAgICAgICByZXR1cm4gdGhhdC5maW5kQnlOYW1lKHN1cHBvcnRlZFByb3ZpZGVyTmFtZSk7XG4gICAgfTtcblxuICAgIHRoYXQuaXNTYW1lUHJvdmlkZXIgPSAoY3VycmVudFNvdXJjZSwgbmV3U291cmNlKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBpc1NhbWVQcm92aWRlcigpIFwiLCBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UoY3VycmVudFNvdXJjZSkgLCBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UobmV3U291cmNlKSApO1xuICAgICAgICByZXR1cm4gc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKGN1cnJlbnRTb3VyY2UpID09PSBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UobmV3U291cmNlKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb250cm9sbGVyO1xuIiwiaW1wb3J0IEFQSSBmcm9tICdhcGkvQXBpJztcbmltcG9ydCB7aXNXZWJSVEN9IGZyb20gJ3V0aWxzL3ZhbGlkYXRvcic7XG5pbXBvcnQgXyBmcm9tICd1dGlscy91bmRlcnNjb3JlJztcbmltcG9ydCBMYSQgZnJvbSAndXRpbHMvbGlrZUEkJztcbmltcG9ydCB7Z2V0U2NyaXB0UGF0aH0gZnJvbSAndXRpbHMvd2VicGFjayc7XG5cblxuX193ZWJwYWNrX3B1YmxpY19wYXRoX18gPSBnZXRTY3JpcHRQYXRoKCdvdmVucGxheWVyLnNkay5qcycpO1xuXG4vKipcbiAqIE1haW4gT3ZlblBsYXllclNESyBvYmplY3RcbiAqL1xuY29uc3QgT3ZlblBsYXllclNESyA9IHdpbmRvdy5PdmVuUGxheWVyU0RLID0ge307XG5cbmNvbnN0IHBsYXllckxpc3QgPSBPdmVuUGxheWVyU0RLLnBsYXllckxpc3QgPSBbXTtcblxuZXhwb3J0IGNvbnN0IGNoZWNrQW5kR2V0Q29udGFpbmVyRWxlbWVudCA9IGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuICAgIGlmICghY29udGFpbmVyKSB7XG5cbiAgICAgICAgLy8gVE9ETyhyb2NrKTogU2hvdWxkIGNhdXNlIGFuIGVycm9yLlxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBsZXQgY29udGFpbmVyRWxlbWVudCA9IG51bGw7XG5cbiAgICBpZiAodHlwZW9mIGNvbnRhaW5lciA9PT0gJ3N0cmluZycpIHtcblxuICAgICAgICBjb250YWluZXJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29udGFpbmVyKTtcbiAgICB9IGVsc2UgaWYgKGNvbnRhaW5lci5ub2RlVHlwZSkge1xuXG4gICAgICAgIGNvbnRhaW5lckVsZW1lbnQgPSBjb250YWluZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVE9ETyhyb2NrKTogU2hvdWxkIGNhdXNlIGFuIGVycm9yLlxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gY29udGFpbmVyRWxlbWVudDtcbn1cblxuLyoqXG4gKiBDcmVhdGUgcGxheWVyIGluc3RhbmNlIGFuZCByZXR1cm4gaXQuXG4gKlxuICogQHBhcmFtICAgICAge3N0cmluZyB8IGRvbSBlbGVtZW50fSBjb250YWluZXIgIElkIG9mIGNvbnRhaW5lciBlbGVtZW50IG9yIGNvbnRhaW5lciBlbGVtZW50XG4gKiBAcGFyYW0gICAgICB7b2JqZWN0fSBvcHRpb25zICBUaGUgb3B0aW9uc1xuICovXG5PdmVuUGxheWVyU0RLLmNyZWF0ZSA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgb3B0aW9ucykge1xuXG4gICAgbGV0IGNvbnRhaW5lckVsZW1lbnQgPSBjaGVja0FuZEdldENvbnRhaW5lckVsZW1lbnQoY29udGFpbmVyKTtcblxuICAgIGNvbnN0IHBsYXllckluc3RhbmNlID0gQVBJKGNvbnRhaW5lckVsZW1lbnQpO1xuICAgIHBsYXllckluc3RhbmNlLmluaXQob3B0aW9ucyk7XG5cbiAgICBwbGF5ZXJMaXN0LnB1c2gocGxheWVySW5zdGFuY2UpO1xuXG4gICAgcmV0dXJuIHBsYXllckluc3RhbmNlO1xufTtcblxuLyoqXG4gKiBHZXRzIHRoZSBwbGF5ZXIgaW5zdGFuY2UgbGlzdC5cbiAqXG4gKiBAcmV0dXJuICAgICB7YXJyYXl9ICBUaGUgcGxheWVyIGxpc3QuXG4gKi9cbk92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyTGlzdCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgcmV0dXJuIHBsYXllckxpc3Q7XG59O1xuXG4vKipcbiAqIEdldHMgdGhlIHBsYXllciBpbnN0YW5jZSBieSBjb250YWluZXIgaWQuXG4gKlxuICogQHBhcmFtICAgICAge3N0cmluZ30gIGNvbnRhaW5lcklkICBUaGUgY29udGFpbmVyIGlkZW50aWZpZXJcbiAqIEByZXR1cm4gICAgIHtvYmVqZWN0IHwgbnVsbH0gIFRoZSBwbGF5ZXIgaW5zdGFuY2UuXG4gKi9cbk92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyQnlDb250YWluZXJJZCA9IGZ1bmN0aW9uKGNvbnRhaW5lcklkKSB7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXllckxpc3QubGVuZ3RoOyBpICsrKSB7XG5cbiAgICAgICAgaWYgKHBsYXllckxpc3RbaV0uZ2V0Q29udGFpbmVySWQoKSA9PT0gY29udGFpbmVySWQpIHtcblxuICAgICAgICAgICAgcmV0dXJuIHBsYXllckxpc3RbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbn07XG5cbi8qKlxuICogR2V0cyB0aGUgcGxheWVyIGluc3RhbmNlIGJ5IGluZGV4LlxuICpcbiAqIEBwYXJhbSAgICAgIHtudW1iZXJ9ICBpbmRleCAgIFRoZSBpbmRleFxuICogQHJldHVybiAgICAge29iamVjdCB8IG51bGx9ICBUaGUgcGxheWVyIGluc3RhbmNlLlxuICovXG5PdmVuUGxheWVyU0RLLmdldFBsYXllckJ5SW5kZXggPSBmdW5jdGlvbihpbmRleCkge1xuXG4gICAgY29uc3QgcGxheWVySW5zdGFuY2UgPSBwbGF5ZXJMaXN0W2luZGV4XTtcblxuICAgIGlmIChwbGF5ZXJJbnN0YW5jZSkge1xuXG4gICAgICAgIHJldHVybiBwbGF5ZXJJbnN0YW5jZTtcbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn07XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBwbGF5ZXIgaW5zdGFuY2UgYnkgcGxheWVySWQuXG4gKlxuICogQHBhcmFtICAgICAge3BsYXllcklkfSAgaWRcbiAqIEByZXR1cm4gICAgIHtudWxsfVxuICovXG5PdmVuUGxheWVyU0RLLnJlbW92ZVBsYXllciA9IGZ1bmN0aW9uKHBsYXllcklkKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5ZXJMaXN0Lmxlbmd0aDsgaSArKykge1xuXG4gICAgICAgIGlmIChwbGF5ZXJMaXN0W2ldLmdldENvbnRhaW5lcklkKCkgPT09IHBsYXllcklkKSB7XG5cbiAgICAgICAgICAgIHBsYXllckxpc3Quc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG59O1xuXG4vKipcbiAqIEdlbmVyYXRlIHdlYnJ0YyBzb3VyY2UgZm9yIHBsYXllciBzb3VyY2UgdHlwZS5cbiAqXG4gKiBAcGFyYW0gICAgICB7T2JqZWN0IHwgQXJyYXl9ICBzb3VyY2UgICB3ZWJydGMgc291cmNlXG4gKiBAcmV0dXJuICAgICB7QXJyYXl9ICBQbGF5ZXIgc291cmNlIE9iamVjdC5cbiAqL1xuT3ZlblBsYXllclNESy5nZW5lcmF0ZVdlYnJ0Y1VybHMgPSBmdW5jdGlvbihzb3VyY2VzKSB7XG4gICAgcmV0dXJuIChfLmlzQXJyYXkoc291cmNlcykgPyBzb3VyY2VzIDogW3NvdXJjZXNdKS5tYXAoZnVuY3Rpb24oc291cmNlLCBpbmRleCl7XG4gICAgICAgIGlmKHNvdXJjZS5ob3N0ICYmIGlzV2ViUlRDKHNvdXJjZS5ob3N0KSAmJiBzb3VyY2UuYXBwbGljYXRpb24gJiYgc291cmNlLnN0cmVhbSl7XG4gICAgICAgICAgICByZXR1cm4ge2ZpbGUgOiBzb3VyY2UuaG9zdCArIFwiL1wiICsgc291cmNlLmFwcGxpY2F0aW9uICsgXCIvXCIgKyBzb3VyY2Uuc3RyZWFtLCB0eXBlIDogXCJ3ZWJydGNcIiwgbGFiZWwgOiBzb3VyY2UubGFiZWwgPyBzb3VyY2UubGFiZWwgOiBcIndlYnJ0Yy1cIisoaW5kZXgrMSkgfTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuLyoqXG4gKiBXaGV0aGVyIHNob3cgdGhlIHBsYXllciBjb3JlIGxvZyBvciBub3QuXG4gKlxuICogQHBhcmFtICAgICAge2Jvb2xlYW59ICBib29sZWFuICAgcnVuIGRlYnVnIG1vZGUgb3Igbm90LlxuICogQHJldHVybiAgICAge2Jvb2xlYW59ICBydW4gZGVidWcgbW9kZSBvciBub3QuXG4gKi9cbk92ZW5QbGF5ZXJTREsuZGVidWcgPSBmdW5jdGlvbihpc0RlYnVnTW9kZSkge1xuICAgIGlmKGlzRGVidWdNb2RlKXtcbiAgICAgICAgd2luZG93Lk92ZW5QbGF5ZXJDb25zb2xlID0ge2xvZyA6IHdpbmRvd1snY29uc29sZSddWydsb2cnXX07XG4gICAgfWVsc2V7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlWydsb2cnXSA9IGZ1bmN0aW9uKCl7fTtcbiAgICB9XG4gICAgcmV0dXJuIGlzRGVidWdNb2RlO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgT3ZlblBsYXllclNESztcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDguIDI0Li5cbiAqL1xuXG5leHBvcnQgY29uc3QgZ2V0QnJvd3Nlckxhbmd1YWdlID0gZnVuY3Rpb24oKXtcbiAgICBsZXQgbmF2ID0gd2luZG93Lm5hdmlnYXRvcixcbiAgICAgICAgYnJvd3Nlckxhbmd1YWdlUHJvcGVydHlLZXlzID0gWydsYW5ndWFnZScsICdicm93c2VyTGFuZ3VhZ2UnLCAnc3lzdGVtTGFuZ3VhZ2UnLCAndXNlckxhbmd1YWdlJ10sXG4gICAgICAgIGksXG4gICAgICAgIGxhbmd1YWdlO1xuXG4gICAgLy8gc3VwcG9ydCBmb3IgSFRNTCA1LjEgXCJuYXZpZ2F0b3IubGFuZ3VhZ2VzXCJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShuYXYubGFuZ3VhZ2VzKSkge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbmF2Lmxhbmd1YWdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGFuZ3VhZ2UgPSBuYXYubGFuZ3VhZ2VzW2ldO1xuICAgICAgICAgICAgaWYgKGxhbmd1YWdlICYmIGxhbmd1YWdlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBsYW5ndWFnZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHN1cHBvcnQgZm9yIG90aGVyIHdlbGwga25vd24gcHJvcGVydGllcyBpbiBicm93c2Vyc1xuICAgIGZvciAoaSA9IDA7IGkgPCBicm93c2VyTGFuZ3VhZ2VQcm9wZXJ0eUtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGFuZ3VhZ2UgPSBuYXZbYnJvd3Nlckxhbmd1YWdlUHJvcGVydHlLZXlzW2ldXTtcbiAgICAgICAgaWYgKGxhbmd1YWdlICYmIGxhbmd1YWdlLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGxhbmd1YWdlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG59O1xuZXhwb3J0IGNvbnN0IGFuYWxVc2VyQWdlbnQgPSBmdW5jdGlvbigpe1xuICAgIGxldCB1bmtub3duID0gJy0nO1xuXG4gICAgLy8gc2NyZWVuXG4gICAgbGV0IHNjcmVlblNpemUgPSAnJztcbiAgICBpZiAoc2NyZWVuLndpZHRoKSB7XG4gICAgICAgIGxldCB3aWR0aCA9IChzY3JlZW4ud2lkdGgpID8gc2NyZWVuLndpZHRoIDogJyc7XG4gICAgICAgIGxldCBoZWlnaHQgPSAoc2NyZWVuLmhlaWdodCkgPyBzY3JlZW4uaGVpZ2h0IDogJyc7XG4gICAgICAgIHNjcmVlblNpemUgKz0gJycgKyB3aWR0aCArIFwiIHggXCIgKyBoZWlnaHQ7XG4gICAgfVxuXG4gICAgLy8gYnJvd3NlclxuICAgIGxldCBuVmVyID0gbmF2aWdhdG9yLmFwcFZlcnNpb247XG4gICAgbGV0IG5BZ3QgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuICAgIGxldCBicm93c2VyID0gbmF2aWdhdG9yLmFwcE5hbWU7XG4gICAgbGV0IHZlcnNpb24gPSAnJyArIHBhcnNlRmxvYXQobmF2aWdhdG9yLmFwcFZlcnNpb24pO1xuICAgIGxldCBtYWpvclZlcnNpb24gPSBwYXJzZUludChuYXZpZ2F0b3IuYXBwVmVyc2lvbiwgMTApO1xuICAgIGxldCBpc1dlYnZpZXcgPSBmYWxzZTtcbiAgICBsZXQgbmFtZU9mZnNldCwgdmVyT2Zmc2V0LCBpeDtcblxuICAgIC8vIE9wZXJhXG4gICAgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ09wZXJhJykpICE9IC0xKSB7XG4gICAgICAgIGJyb3dzZXIgPSAnT3BlcmEnO1xuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNik7XG4gICAgICAgIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdWZXJzaW9uJykpICE9IC0xKSB7XG4gICAgICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgOCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gT3BlcmEgTmV4dFxuICAgIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdPUFInKSkgIT0gLTEpIHtcbiAgICAgICAgYnJvd3NlciA9ICdPcGVyYSc7XG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA0KTtcbiAgICB9XG4gICAgLy/sgrzshLEg67iM65287Jqw7KCAXG4gICAgZWxzZSBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignU2Ftc3VuZ0Jyb3dzZXInKSkgIT0gLTEpIHtcbiAgICAgICAgYnJvd3NlciA9ICdTYW1zdW5nQnJvd3Nlcic7XG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyAxNSk7XG4gICAgfVxuICAgIC8vIEVkZ2VcbiAgICBlbHNlIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdFZGdlJykpICE9IC0xKSB7XG4gICAgICAgIGJyb3dzZXIgPSAnTWljcm9zb2Z0IEVkZ2UnO1xuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNSk7XG4gICAgfVxuICAgIC8vIE1TSUVcbiAgICBlbHNlIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdNU0lFJykpICE9IC0xKSB7XG4gICAgICAgIGJyb3dzZXIgPSAnTWljcm9zb2Z0IEludGVybmV0IEV4cGxvcmVyJztcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDUpO1xuXG5cbiAgICAgICAgLy93aW43IElFMTEgdXNlckFnZW50IGlzIHVnbHkuLi4uXG4gICAgICAgIGlmKCAobkFndC5pbmRleE9mKCdUcmlkZW50LycpICE9PSAtMSkgJiYgKG5BZ3QuaW5kZXhPZigncnY6JykgIT09IC0xKSAgKXtcbiAgICAgICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyhuQWd0LmluZGV4T2YoJ3J2OicpICsgMyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gQ2hyb21lXG4gICAgZWxzZSBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignQ2hyb21lJykpICE9IC0xKSB7XG4gICAgICAgIGJyb3dzZXIgPSAnQ2hyb21lJztcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDcpO1xuICAgIH1cbiAgICBlbHNlIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdDcmlPUycpKSAhPSAtMSkgeyAgIC8vaXBob25lIC0gY2hyb21lXG4gICAgICAgIGJyb3dzZXIgPSAnQ2hyb21lJztcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDYpO1xuICAgIH1cbiAgICAvLyBGaXJlZm94XG4gICAgZWxzZSBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignRmlyZWZveCcpKSAhPSAtMSkge1xuICAgICAgICBicm93c2VyID0gJ0ZpcmVmb3gnO1xuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgOCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ0Z4aU9TJykpICE9IC0xKSB7XG4gICAgICAgIGJyb3dzZXIgPSAnRmlyZWZveCc7XG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA2KTtcbiAgICB9XG4gICAgLy8gU2FmYXJpXG4gICAgZWxzZSBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignU2FmYXJpJykpICE9IC0xKSB7XG4gICAgICAgIGJyb3dzZXIgPSAnU2FmYXJpJztcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDcpO1xuICAgICAgICBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignVmVyc2lvbicpKSAhPSAtMSkge1xuICAgICAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDgpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvLyBNU0lFIDExK1xuICAgIGVsc2UgaWYgKG5BZ3QuaW5kZXhPZignVHJpZGVudC8nKSAhPT0gLTEpIHtcbiAgICAgICAgYnJvd3NlciA9ICdNaWNyb3NvZnQgSW50ZXJuZXQgRXhwbG9yZXInO1xuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcobkFndC5pbmRleE9mKCdydjonKSArIDMpO1xuICAgIH1cbiAgICAvLyBPdGhlciBicm93c2Vyc1xuICAgIGVsc2UgaWYgKChuYW1lT2Zmc2V0ID0gbkFndC5sYXN0SW5kZXhPZignICcpICsgMSkgPCAodmVyT2Zmc2V0ID0gbkFndC5sYXN0SW5kZXhPZignLycpKSkge1xuICAgICAgICBicm93c2VyID0gbkFndC5zdWJzdHJpbmcobmFtZU9mZnNldCwgdmVyT2Zmc2V0KTtcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDEpO1xuICAgICAgICBpZiAoYnJvd3Nlci50b0xvd2VyQ2FzZSgpID09IGJyb3dzZXIudG9VcHBlckNhc2UoKSkge1xuICAgICAgICAgICAgYnJvd3NlciA9IG5hdmlnYXRvci5hcHBOYW1lO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmKG5BZ3QuaW5kZXhPZignIHd2JykgPiAwKXtcbiAgICAgICAgaXNXZWJ2aWV3ID0gdHJ1ZTtcbiAgICB9XG4gICAgLy8gdHJpbSB0aGUgdmVyc2lvbiBzdHJpbmdcbiAgICBpZiAoKGl4ID0gdmVyc2lvbi5pbmRleE9mKCc7JykpICE9IC0xKSB2ZXJzaW9uID0gdmVyc2lvbi5zdWJzdHJpbmcoMCwgaXgpO1xuICAgIGlmICgoaXggPSB2ZXJzaW9uLmluZGV4T2YoJyAnKSkgIT0gLTEpIHZlcnNpb24gPSB2ZXJzaW9uLnN1YnN0cmluZygwLCBpeCk7XG4gICAgaWYgKChpeCA9IHZlcnNpb24uaW5kZXhPZignKScpKSAhPSAtMSkgdmVyc2lvbiA9IHZlcnNpb24uc3Vic3RyaW5nKDAsIGl4KTtcblxuICAgIG1ham9yVmVyc2lvbiA9IHBhcnNlSW50KCcnICsgdmVyc2lvbiwgMTApO1xuICAgIGlmIChpc05hTihtYWpvclZlcnNpb24pKSB7XG4gICAgICAgIHZlcnNpb24gPSAnJyArIHBhcnNlRmxvYXQobmF2aWdhdG9yLmFwcFZlcnNpb24pO1xuICAgICAgICBtYWpvclZlcnNpb24gPSBwYXJzZUludChuYXZpZ2F0b3IuYXBwVmVyc2lvbiwgMTApO1xuICAgIH1cblxuICAgIC8vIG1vYmlsZSB2ZXJzaW9uXG4gICAgdmFyIG1vYmlsZSA9IC9Nb2JpbGV8bWluaXxGZW5uZWN8QW5kcm9pZHxpUChhZHxvZHxob25lKS8udGVzdChuVmVyKTtcblxuICAgIC8vIGNvb2tpZVxuICAgIHZhciBjb29raWVFbmFibGVkID0gKG5hdmlnYXRvci5jb29raWVFbmFibGVkKSA/IHRydWUgOiBmYWxzZTtcblxuICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yLmNvb2tpZUVuYWJsZWQgPT0gJ3VuZGVmaW5lZCcgJiYgIWNvb2tpZUVuYWJsZWQpIHtcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gJ3Rlc3Rjb29raWUnO1xuICAgICAgICBjb29raWVFbmFibGVkID0gKGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKCd0ZXN0Y29va2llJykgIT0gLTEpID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH1cblxuICAgIC8vIHN5c3RlbVxuICAgIHZhciBvcyA9IHVua25vd247XG4gICAgdmFyIGNsaWVudFN0cmluZ3MgPSBbXG4gICAgICAgIHtzOidXaW5kb3dzIDEwJywgcjovKFdpbmRvd3MgMTAuMHxXaW5kb3dzIE5UIDEwLjApL30sXG4gICAgICAgIHtzOidXaW5kb3dzIDguMScsIHI6LyhXaW5kb3dzIDguMXxXaW5kb3dzIE5UIDYuMykvfSxcbiAgICAgICAge3M6J1dpbmRvd3MgOCcsIHI6LyhXaW5kb3dzIDh8V2luZG93cyBOVCA2LjIpL30sXG4gICAgICAgIHtzOidXaW5kb3dzIDcnLCByOi8oV2luZG93cyA3fFdpbmRvd3MgTlQgNi4xKS99LFxuICAgICAgICB7czonV2luZG93cyBWaXN0YScsIHI6L1dpbmRvd3MgTlQgNi4wL30sXG4gICAgICAgIHtzOidXaW5kb3dzIFNlcnZlciAyMDAzJywgcjovV2luZG93cyBOVCA1LjIvfSxcbiAgICAgICAge3M6J1dpbmRvd3MgWFAnLCByOi8oV2luZG93cyBOVCA1LjF8V2luZG93cyBYUCkvfSxcbiAgICAgICAge3M6J1dpbmRvd3MgMjAwMCcsIHI6LyhXaW5kb3dzIE5UIDUuMHxXaW5kb3dzIDIwMDApL30sXG4gICAgICAgIHtzOidXaW5kb3dzIE1FJywgcjovKFdpbiA5eCA0LjkwfFdpbmRvd3MgTUUpL30sXG4gICAgICAgIHtzOidXaW5kb3dzIDk4JywgcjovKFdpbmRvd3MgOTh8V2luOTgpL30sXG4gICAgICAgIHtzOidXaW5kb3dzIDk1JywgcjovKFdpbmRvd3MgOTV8V2luOTV8V2luZG93c185NSkvfSxcbiAgICAgICAge3M6J1dpbmRvd3MgTlQgNC4wJywgcjovKFdpbmRvd3MgTlQgNC4wfFdpbk5UNC4wfFdpbk5UfFdpbmRvd3MgTlQpL30sXG4gICAgICAgIHtzOidXaW5kb3dzIENFJywgcjovV2luZG93cyBDRS99LFxuICAgICAgICB7czonV2luZG93cyAzLjExJywgcjovV2luMTYvfSxcbiAgICAgICAge3M6J0FuZHJvaWQnLCByOi9BbmRyb2lkL30sXG4gICAgICAgIHtzOidPcGVuIEJTRCcsIHI6L09wZW5CU0QvfSxcbiAgICAgICAge3M6J1N1biBPUycsIHI6L1N1bk9TL30sXG4gICAgICAgIHtzOidMaW51eCcsIHI6LyhMaW51eHxYMTEpL30sXG4gICAgICAgIHtzOidpT1MnLCByOi8oaVBob25lfGlQYWR8aVBvZCkvfSxcbiAgICAgICAge3M6J01hYyBPUyBYJywgcjovTWFjIE9TIFgvfSxcbiAgICAgICAge3M6J01hYyBPUycsIHI6LyhNYWNQUEN8TWFjSW50ZWx8TWFjX1Bvd2VyUEN8TWFjaW50b3NoKS99LFxuICAgICAgICB7czonUU5YJywgcjovUU5YL30sXG4gICAgICAgIHtzOidVTklYJywgcjovVU5JWC99LFxuICAgICAgICB7czonQmVPUycsIHI6L0JlT1MvfSxcbiAgICAgICAge3M6J09TLzInLCByOi9PU1xcLzIvfSxcbiAgICAgICAge3M6J1NlYXJjaCBCb3QnLCByOi8obnVoa3xHb29nbGVib3R8WWFtbXlib3R8T3BlbmJvdHxTbHVycHxNU05Cb3R8QXNrIEplZXZlc1xcL1Rlb21hfGlhX2FyY2hpdmVyKS99XG4gICAgXTtcbiAgICBmb3IgKHZhciBpZCBpbiBjbGllbnRTdHJpbmdzKSB7XG4gICAgICAgIHZhciBjcyA9IGNsaWVudFN0cmluZ3NbaWRdO1xuICAgICAgICBpZiAoY3Muci50ZXN0KG5BZ3QpKSB7XG4gICAgICAgICAgICBvcyA9IGNzLnM7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBvc1ZlcnNpb24gPSB1bmtub3duO1xuXG4gICAgaWYgKC9XaW5kb3dzLy50ZXN0KG9zKSkge1xuICAgICAgICBvc1ZlcnNpb24gPSAvV2luZG93cyAoLiopLy5leGVjKG9zKVsxXTtcbiAgICAgICAgb3MgPSAnV2luZG93cyc7XG4gICAgfVxuXG4gICAgc3dpdGNoIChvcykge1xuICAgICAgICBjYXNlICdNYWMgT1MgWCc6XG4gICAgICAgICAgICBvc1ZlcnNpb24gPSAvTWFjIE9TIFggKDEwW1xcLlxcX1xcZF0rKS8uZXhlYyhuQWd0KVsxXTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0FuZHJvaWQnOlxuICAgICAgICAgICAgb3NWZXJzaW9uID0gL0FuZHJvaWQgKFtcXC5cXF9cXGRdKykvLmV4ZWMobkFndClbMV07XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdpT1MnOlxuICAgICAgICAgICAgb3NWZXJzaW9uID0gL09TIChcXGQrKV8oXFxkKylfPyhcXGQrKT8vLmV4ZWMoblZlcik7XG4gICAgICAgICAgICBvc1ZlcnNpb24gPSBvc1ZlcnNpb25bMV0gKyAnLicgKyBvc1ZlcnNpb25bMl0gKyAnLicgKyAob3NWZXJzaW9uWzNdIHwgMCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICAvLyBmbGFzaCAoeW91J2xsIG5lZWQgdG8gaW5jbHVkZSBzd2ZvYmplY3QpXG4gICAgLyogc2NyaXB0IHNyYz1cIi8vYWpheC5nb29nbGVhcGlzLmNvbS9hamF4L2xpYnMvc3dmb2JqZWN0LzIuMi9zd2ZvYmplY3QuanNcIiAqL1xuICAgIHZhciBmbGFzaFZlcnNpb24gPSAnbm8gY2hlY2snO1xuICAgIGlmICh0eXBlb2Ygc3dmb2JqZWN0ICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhciBmdiA9IHN3Zm9iamVjdC5nZXRGbGFzaFBsYXllclZlcnNpb24oKTtcbiAgICAgICAgaWYgKGZ2Lm1ham9yID4gMCkge1xuICAgICAgICAgICAgZmxhc2hWZXJzaW9uID0gZnYubWFqb3IgKyAnLicgKyBmdi5taW5vciArICcgcicgKyBmdi5yZWxlYXNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgIHtcbiAgICAgICAgICAgIGZsYXNoVmVyc2lvbiA9IHVua25vd247XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2NyZWVuOiBzY3JlZW5TaXplLFxuICAgICAgICBicm93c2VyOiBicm93c2VyLFxuICAgICAgICBicm93c2VyVmVyc2lvbjogdmVyc2lvbixcbiAgICAgICAgYnJvd3Nlck1ham9yVmVyc2lvbjogbWFqb3JWZXJzaW9uLFxuICAgICAgICBtb2JpbGU6IG1vYmlsZSxcbiAgICAgICAgdWEgOiBuQWd0LFxuICAgICAgICBvczogb3MsXG4gICAgICAgIG9zVmVyc2lvbjogb3NWZXJzaW9uLFxuICAgICAgICBjb29raWVzOiBjb29raWVFbmFibGVkLFxuICAgICAgICBmbGFzaFZlcnNpb246IGZsYXNoVmVyc2lvbixcbiAgICAgICAgd2VidmlldyA6IGlzV2Vidmlld1xuICAgIH07XG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMyB2dHQuanMgQ29udHJpYnV0b3JzXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xubGV0IFZUVEN1ZSA9IHdpbmRvdy5WVFRDdWU7XG5cbnZhciBhdXRvS2V5d29yZCA9IFwiYXV0b1wiO1xudmFyIGRpcmVjdGlvblNldHRpbmcgPSB7XG4gICAgXCJcIjogdHJ1ZSxcbiAgICBcImxyXCI6IHRydWUsXG4gICAgXCJybFwiOiB0cnVlXG59O1xudmFyIGFsaWduU2V0dGluZyA9IHtcbiAgICBcInN0YXJ0XCI6IHRydWUsXG4gICAgXCJtaWRkbGVcIjogdHJ1ZSxcbiAgICBcImVuZFwiOiB0cnVlLFxuICAgIFwibGVmdFwiOiB0cnVlLFxuICAgIFwicmlnaHRcIjogdHJ1ZVxufTtcblxuZnVuY3Rpb24gZmluZERpcmVjdGlvblNldHRpbmcodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIGRpciA9IGRpcmVjdGlvblNldHRpbmdbdmFsdWUudG9Mb3dlckNhc2UoKV07XG4gICAgcmV0dXJuIGRpciA/IHZhbHVlLnRvTG93ZXJDYXNlKCkgOiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZmluZEFsaWduU2V0dGluZyh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgYWxpZ24gPSBhbGlnblNldHRpbmdbdmFsdWUudG9Mb3dlckNhc2UoKV07XG4gICAgcmV0dXJuIGFsaWduID8gdmFsdWUudG9Mb3dlckNhc2UoKSA6IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBleHRlbmQob2JqKSB7XG4gICAgdmFyIGkgPSAxO1xuICAgIGZvciAoOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjb2JqID0gYXJndW1lbnRzW2ldO1xuICAgICAgICBmb3IgKHZhciBwIGluIGNvYmopIHtcbiAgICAgICAgICAgIG9ialtwXSA9IGNvYmpbcF07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xufVxuaWYoIVZUVEN1ZSl7XG4gICAgVlRUQ3VlID0gZnVuY3Rpb24gKHN0YXJ0VGltZSwgZW5kVGltZSwgdGV4dCkge1xuICAgICAgICB2YXIgY3VlID0gdGhpcztcbiAgICAgICAgdmFyIGlzSUU4ID0gKC9NU0lFXFxzOFxcLjAvKS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgICAgICB2YXIgYmFzZU9iaiA9IHt9O1xuXG4gICAgICAgIGlmIChpc0lFOCkge1xuICAgICAgICAgICAgY3VlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY3VzdG9tJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBiYXNlT2JqLmVudW1lcmFibGUgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNoaW0gaW1wbGVtZW50YXRpb24gc3BlY2lmaWMgcHJvcGVydGllcy4gVGhlc2UgcHJvcGVydGllcyBhcmUgbm90IGluXG4gICAgICAgICAqIHRoZSBzcGVjLlxuICAgICAgICAgKi9cblxuICAgICAgICAgICAgLy8gTGV0cyB1cyBrbm93IHdoZW4gdGhlIFZUVEN1ZSdzIGRhdGEgaGFzIGNoYW5nZWQgaW4gc3VjaCBhIHdheSB0aGF0IHdlIG5lZWRcbiAgICAgICAgICAgIC8vIHRvIHJlY29tcHV0ZSBpdHMgZGlzcGxheSBzdGF0ZS4gVGhpcyBsZXRzIHVzIGNvbXB1dGUgaXRzIGRpc3BsYXkgc3RhdGVcbiAgICAgICAgICAgIC8vIGxhemlseS5cbiAgICAgICAgY3VlLmhhc0JlZW5SZXNldCA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBWVFRDdWUgYW5kIFRleHRUcmFja0N1ZSBwcm9wZXJ0aWVzXG4gICAgICAgICAqIGh0dHA6Ly9kZXYudzMub3JnL2h0bWw1L3dlYnZ0dC8jdnR0Y3VlLWludGVyZmFjZVxuICAgICAgICAgKi9cblxuICAgICAgICB2YXIgX2lkID0gXCJcIjtcbiAgICAgICAgdmFyIF9wYXVzZU9uRXhpdCA9IGZhbHNlO1xuICAgICAgICB2YXIgX3N0YXJ0VGltZSA9IHN0YXJ0VGltZTtcbiAgICAgICAgdmFyIF9lbmRUaW1lID0gZW5kVGltZTtcbiAgICAgICAgdmFyIF90ZXh0ID0gdGV4dDtcbiAgICAgICAgdmFyIF9yZWdpb24gPSBudWxsO1xuICAgICAgICB2YXIgX3ZlcnRpY2FsID0gXCJcIjtcbiAgICAgICAgdmFyIF9zbmFwVG9MaW5lcyA9IHRydWU7XG4gICAgICAgIHZhciBfbGluZSA9IFwiYXV0b1wiO1xuICAgICAgICB2YXIgX2xpbmVBbGlnbiA9IFwic3RhcnRcIjtcbiAgICAgICAgdmFyIF9wb3NpdGlvbiA9IDUwO1xuICAgICAgICB2YXIgX3Bvc2l0aW9uQWxpZ24gPSBcIm1pZGRsZVwiO1xuICAgICAgICB2YXIgX3NpemUgPSA1MDtcbiAgICAgICAgdmFyIF9hbGlnbiA9IFwibWlkZGxlXCI7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcbiAgICAgICAgICAgIFwiaWRcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9pZDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgX2lkID0gXCJcIiArIHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxuICAgICAgICAgICAgXCJwYXVzZU9uRXhpdFwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3BhdXNlT25FeGl0O1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBfcGF1c2VPbkV4aXQgPSAhIXZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxuICAgICAgICAgICAgXCJzdGFydFRpbWVcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9zdGFydFRpbWU7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdGFydCB0aW1lIG11c3QgYmUgc2V0IHRvIGEgbnVtYmVyLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfc3RhcnRUaW1lID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcbiAgICAgICAgICAgIFwiZW5kVGltZVwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2VuZFRpbWU7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJFbmQgdGltZSBtdXN0IGJlIHNldCB0byBhIG51bWJlci5cIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgX2VuZFRpbWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxuICAgICAgICAgICAgXCJ0ZXh0XCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGV4dDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RleHQgPSBcIlwiICsgdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcbiAgICAgICAgICAgIFwicmVnaW9uXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVnaW9uO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBfcmVnaW9uID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcbiAgICAgICAgICAgIFwidmVydGljYWxcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92ZXJ0aWNhbDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNldHRpbmcgPSBmaW5kRGlyZWN0aW9uU2V0dGluZyh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIEhhdmUgdG8gY2hlY2sgZm9yIGZhbHNlIGJlY2F1c2UgdGhlIHNldHRpbmcgYW4gYmUgYW4gZW1wdHkgc3RyaW5nLlxuICAgICAgICAgICAgICAgICAgICBpZiAoc2V0dGluZyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihcIkFuIGludmFsaWQgb3IgaWxsZWdhbCBzdHJpbmcgd2FzIHNwZWNpZmllZC5cIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgX3ZlcnRpY2FsID0gc2V0dGluZztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxuICAgICAgICAgICAgXCJzbmFwVG9MaW5lc1wiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3NuYXBUb0xpbmVzO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBfc25hcFRvTGluZXMgPSAhIXZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXG4gICAgICAgICAgICBcImxpbmVcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9saW5lO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm51bWJlclwiICYmIHZhbHVlICE9PSBhdXRvS2V5d29yZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKFwiQW4gaW52YWxpZCBudW1iZXIgb3IgaWxsZWdhbCBzdHJpbmcgd2FzIHNwZWNpZmllZC5cIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgX2xpbmUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxuICAgICAgICAgICAgXCJsaW5lQWxpZ25cIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9saW5lQWxpZ247XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzZXR0aW5nID0gZmluZEFsaWduU2V0dGluZyh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghc2V0dGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKFwiQW4gaW52YWxpZCBvciBpbGxlZ2FsIHN0cmluZyB3YXMgc3BlY2lmaWVkLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfbGluZUFsaWduID0gc2V0dGluZztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxuICAgICAgICAgICAgXCJwb3NpdGlvblwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3Bvc2l0aW9uO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPCAwIHx8IHZhbHVlID4gMTAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQb3NpdGlvbiBtdXN0IGJlIGJldHdlZW4gMCBhbmQgMTAwLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfcG9zaXRpb24gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxuICAgICAgICAgICAgXCJwb3NpdGlvbkFsaWduXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcG9zaXRpb25BbGlnbjtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNldHRpbmcgPSBmaW5kQWxpZ25TZXR0aW5nKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzZXR0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJBbiBpbnZhbGlkIG9yIGlsbGVnYWwgc3RyaW5nIHdhcyBzcGVjaWZpZWQuXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF9wb3NpdGlvbkFsaWduID0gc2V0dGluZztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxuICAgICAgICAgICAgXCJzaXplXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfc2l6ZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlIDwgMCB8fCB2YWx1ZSA+IDEwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2l6ZSBtdXN0IGJlIGJldHdlZW4gMCBhbmQgMTAwLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfc2l6ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXG4gICAgICAgICAgICBcImFsaWduXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfYWxpZ247XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzZXR0aW5nID0gZmluZEFsaWduU2V0dGluZyh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghc2V0dGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKFwiQW4gaW52YWxpZCBvciBpbGxlZ2FsIHN0cmluZyB3YXMgc3BlY2lmaWVkLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfYWxpZ24gPSBzZXR0aW5nO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBPdGhlciA8dHJhY2s+IHNwZWMgZGVmaW5lZCBwcm9wZXJ0aWVzXG4gICAgICAgICAqL1xuXG4gICAgICAgICAgICAvLyBodHRwOi8vd3d3LndoYXR3Zy5vcmcvc3BlY3Mvd2ViLWFwcHMvY3VycmVudC13b3JrL211bHRpcGFnZS90aGUtdmlkZW8tZWxlbWVudC5odG1sI3RleHQtdHJhY2stY3VlLWRpc3BsYXktc3RhdGVcbiAgICAgICAgY3VlLmRpc3BsYXlTdGF0ZSA9IHVuZGVmaW5lZDtcblxuICAgICAgICBpZiAoaXNJRTgpIHtcbiAgICAgICAgICAgIHJldHVybiBjdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBWVFRDdWUgbWV0aG9kc1xuICAgICAqL1xuXG4gICAgVlRUQ3VlLnByb3RvdHlwZS5nZXRDdWVBc0hUTUwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gQXNzdW1lIFdlYlZUVC5jb252ZXJ0Q3VlVG9ET01UcmVlIGlzIG9uIHRoZSBnbG9iYWwuXG4gICAgICAgIHJldHVybiBXZWJWVFQuY29udmVydEN1ZVRvRE9NVHJlZSh3aW5kb3csIHRoaXMudGV4dCk7XG4gICAgfTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgVlRUQ3VlOyIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDIzLi5cbiAqL1xuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBJdCB3YXMgcmVwbGFjZSBqcXVlcnkncyBzZWxlY3Rvci4gSXQgT2Z0ZW4gdXNlZCBieSBPdmVuVGVtcGxhdGUuICgvdmlldy9lbmdpbmUvT3ZlblRlbXBsYXRlLmpzKVxuICogQHBhcmFtICAgc2VsZWN0b3JPckVsZW1lbnQgIHN0cmluZyBvciBlbGVtZW50XG4gKlxuICogKi9cblxuXG5jb25zdCBMYSQgPSBmdW5jdGlvbihzZWxlY3Rvck9yRWxlbWVudCl7XG4gICAgY29uc3QgdGhhdCA9IHt9O1xuICAgIGNvbnN0IHJldHVybk5vZGUgPSBmdW5jdGlvbigkZWxlbWVudCAsIHNlbGVjdG9yKXtcbiAgICAgICAgbGV0IG5vZGVMaXN0ID0gICRlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgICAgICBpZihub2RlTGlzdC5sZW5ndGggPiAxKXtcbiAgICAgICAgICAgIHJldHVybiBub2RlTGlzdDtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gbm9kZUxpc3RbMF07XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBsZXQgJGVsZW1lbnQgPSBcIlwiO1xuXG4gICAgaWYoIF8uaXNFbGVtZW50KHNlbGVjdG9yT3JFbGVtZW50KSB8fCBfLmV2ZXJ5KHNlbGVjdG9yT3JFbGVtZW50LCBmdW5jdGlvbihpdGVtKXtyZXR1cm4gXy5pc0VsZW1lbnQoaXRlbSl9KSl7XG4gICAgICAgICRlbGVtZW50ID0gc2VsZWN0b3JPckVsZW1lbnQ7XG4gICAgfWVsc2UgaWYoc2VsZWN0b3JPckVsZW1lbnQgPT09IFwiZG9jdW1lbnRcIil7XG4gICAgICAgICRlbGVtZW50ID0gZG9jdW1lbnQ7XG4gICAgfWVsc2UgaWYoc2VsZWN0b3JPckVsZW1lbnQgPT09IFwid2luZG93XCIpe1xuICAgICAgICAkZWxlbWVudCA9IHdpbmRvdztcbiAgICB9ZWxzZXtcbiAgICAgICAgJGVsZW1lbnQgPSByZXR1cm5Ob2RlKGRvY3VtZW50LCBzZWxlY3Rvck9yRWxlbWVudCk7XG4gICAgfVxuXG5cbiAgICBpZighJGVsZW1lbnQpe1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB0aGF0LmZpbmQgPSAoc2VsZWN0b3IpID0+e1xuICAgICAgICByZXR1cm4gTGEkKHJldHVybk5vZGUoJGVsZW1lbnQsIHNlbGVjdG9yKSk7XG4gICAgfTtcblxuICAgIHRoYXQuY3NzID0gKG5hbWUsIHZhbHVlKSA9PiB7XG4gICAgICAgIGlmKCRlbGVtZW50Lmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgJGVsZW1lbnQuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KXtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlW25hbWVdID0gdmFsdWU7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICRlbGVtZW50LnN0eWxlW25hbWVdID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhhdC5hZGRDbGFzcyA9IChuYW1lKSA9PntcbiAgICAgICAgaWYoJGVsZW1lbnQuY2xhc3NMaXN0KXtcbiAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTGlzdC5hZGQobmFtZSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgbGV0IGNsYXNzTmFtZXMgPSAkZWxlbWVudC5jbGFzc05hbWUuc3BsaXQoXCIgXCIpO1xuICAgICAgICAgICAgaWYoY2xhc3NOYW1lcy5pbmRleE9mKG5hbWUpID09PSAtMSl7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuY2xhc3NOYW1lICs9IFwiIFwiICsgbmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIHRoYXQucmVtb3ZlQ2xhc3MgPSAobmFtZSkgPT57XG4gICAgICAgIGlmICgkZWxlbWVudC5jbGFzc0xpc3Qpe1xuICAgICAgICAgICAgJGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShuYW1lKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAkZWxlbWVudC5jbGFzc05hbWUgPSAkZWxlbWVudC5jbGFzc05hbWUucmVwbGFjZShuZXcgUmVnRXhwKCcoXnxcXFxcYiknICsgbmFtZS5zcGxpdCgnICcpLmpvaW4oJ3wnKSArICcoXFxcXGJ8JCknLCAnZ2knKSwgJyAnKTtcblxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoYXQucmVtb3ZlQXR0cmlidXRlID0gKGF0dHJOYW1lKSA9PiB7XG4gICAgICAgICRlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShhdHRyTmFtZSk7XG4gICAgfTtcblxuICAgIHRoYXQuc2hvdyA9ICgpID0+e1xuICAgICAgICAkZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9O1xuXG4gICAgdGhhdC5oaWRlID0gKCkgPT57XG4gICAgICAgICRlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfTtcblxuICAgIC8qdGhhdC5hcHBlbmQgPSAoaHRtbENvZGUpID0+e1xuICAgICAgICAkZWxlbWVudC5pbm5lckhUTUwgKz0gaHRtbENvZGU7XG4gICAgfTsqL1xuXG4gICAgdGhhdC50ZXh0ID0gKHRleHQpID0+IHsgLy9JRTgrXG4gICAgICAgIGlmKHRleHQgPT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICByZXR1cm4gJGVsZW1lbnQudGV4dENvbnRlbnQ7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgJGVsZW1lbnQudGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0Lmh0bWwgPSAodGV4dCkgPT4ge1xuICAgICAgICAkZWxlbWVudC5pbm5lckhUTUwgPSB0ZXh0O1xuICAgIH07XG4gICAgdGhhdC5oYXNDbGFzcyA9IChuYW1lKSA9PiB7IC8vSUU4K1xuICAgICAgICBpZigkZWxlbWVudC5jbGFzc0xpc3Qpe1xuICAgICAgICAgICAgcmV0dXJuICRlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhuYW1lKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cCgnKF58ICknICsgbmFtZSArICcoIHwkKScsICdnaScpLnRlc3QoJGVsZW1lbnQubmFtZSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhhdC5pcyA9ICgkdGFyZ2V0RWxlbWVudCkgPT4ge1xuICAgICAgICByZXR1cm4gJGVsZW1lbnQgPT09ICR0YXJnZXRFbGVtZW50O1xuICAgIH07XG5cbiAgICB0aGF0Lm9mZnNldCA9ICgpID0+eyAgICAvL0lFOCtcbiAgICAgICAgdmFyIHJlY3QgPSAkZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdG9wOiByZWN0LnRvcCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wLFxuICAgICAgICAgICAgbGVmdDogcmVjdC5sZWZ0ICsgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhhdC53aWR0aCA9ICgpID0+IHsgICAgLy9JRTgrXG4gICAgICAgIHJldHVybiAkZWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICB9O1xuXG4gICAgdGhhdC5oZWlnaHQgPSAoKSA9PiB7ICAgLy9JRTgrXG4gICAgICAgIHJldHVybiAkZWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgfTtcblxuICAgIHRoYXQuYXR0ciA9IChhdHRyKSA9PiB7XG4gICAgICAgIHJldHVybiAkZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cik7XG4gICAgfTtcblxuICAgIHRoYXQucmVwbGFjZSA9IChodG1sKSA9PiB7XG4gICAgICAgICRlbGVtZW50LnJlcGxhY2VXaXRoKGh0bWwpO1xuICAgIH07XG5cbiAgICB0aGF0LmFwcGVuZCA9IChodG1sKSA9PiB7XG4gICAgICAgICRlbGVtZW50LmFwcGVuZENoaWxkKGh0bWwpO1xuICAgIH07XG5cbiAgICB0aGF0LnJlbW92ZSA9ICgpID0+IHtcbiAgICAgICAgaWYoJGVsZW1lbnQubGVuZ3RoID4gMSl7XG4gICAgICAgICAgICAkZWxlbWVudC5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKCRlbGVtZW50KTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAkZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIHRoYXQucmVtb3ZlQ2hpbGQgPSAoZWxlbWVudCkgPT4ge1xuICAgICAgICBpZihlbGVtZW50KXtcbiAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHdoaWxlICgkZWxlbWVudC5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5yZW1vdmVDaGlsZCgkZWxlbWVudC5maXJzdENoaWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIHRoYXQuZ2V0ID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gJGVsZW1lbnQ7XG4gICAgfTtcblxuICAgIHRoYXQuY2xvc2VzdCA9IChzZWxlY3RvclN0cmluZykgPT4ge1xuICAgICAgICBsZXQgY2xvc2VzdEVsZW1lbnQgPSAkZWxlbWVudC5jbG9zZXN0KHNlbGVjdG9yU3RyaW5nKTtcbiAgICAgICAgaWYoY2xvc2VzdEVsZW1lbnQpe1xuICAgICAgICAgICAgcmV0dXJuIExhJChjbG9zZXN0RWxlbWVudCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBMYSQ7XG4iLCJpbXBvcnQgXyBmcm9tICcuL3VuZGVyc2NvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gdHJpbShzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nID8gc3RyaW5nLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKSA6IFwiXCI7XG59XG5cbi8qKlxuICogZXh0cmFjdEV4dGVuc2lvblxuICpcbiAqIEBwYXJhbSAgICAgIHtzdHJpbmd9IHBhdGggZm9yIHVybFxuICogQHJldHVybiAgICAge3N0cmluZ30gIEV4dGVuc2lvblxuICovXG5leHBvcnQgY29uc3QgZXh0cmFjdEV4dGVuc2lvbiA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgICBpZighcGF0aCB8fCBwYXRoLnN1YnN0cigwLDQpPT0ncnRtcCcpIHtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldEF6dXJlRmlsZUZvcm1hdChwYXRoKSB7XG4gICAgICAgIGxldCBleHRlbnNpb24gPSBcIlwiO1xuICAgICAgICBpZiAoKC9bKCxdZm9ybWF0PW1wZC0vaSkudGVzdChwYXRoKSkge1xuICAgICAgICAgICAgZXh0ZW5zaW9uID0gJ21wZCc7XG4gICAgICAgIH1lbHNlIGlmICgoL1soLF1mb3JtYXQ9bTN1OC0vaSkudGVzdChwYXRoKSkge1xuICAgICAgICAgICAgZXh0ZW5zaW9uID0gJ20zdTgnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBleHRlbnNpb247XG4gICAgfVxuXG4gICAgbGV0IGF6dXJlZEZvcm1hdCA9IGdldEF6dXJlRmlsZUZvcm1hdChwYXRoKTtcbiAgICBpZihhenVyZWRGb3JtYXQpIHtcbiAgICAgICAgcmV0dXJuIGF6dXJlZEZvcm1hdDtcbiAgICB9XG4gICAgcGF0aCA9IHBhdGguc3BsaXQoJz8nKVswXS5zcGxpdCgnIycpWzBdO1xuICAgIGlmKHBhdGgubGFzdEluZGV4T2YoJy4nKSA+IC0xKSB7XG4gICAgICAgIHJldHVybiBwYXRoLnN1YnN0cihwYXRoLmxhc3RJbmRleE9mKCcuJykgKyAxLCBwYXRoLmxlbmd0aCkudG9Mb3dlckNhc2UoKTtcbiAgICB9ZWxzZXtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxufTtcblxuXG4vKipcbiAqIG5hdHVyYWxIbXNcbiAqXG4gKiBAcGFyYW0gICAgICB7bnVtYmVyIHwgc3RyaW5nfSAgc2Vjb25kICBUaGUgc2Vjb25kXG4gKiBAcmV0dXJuICAgICB7c3RyaW5nfSAgZm9ybWF0dGVkIFN0cmluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gbmF0dXJhbEhtcyhzZWNvbmQpIHtcbiAgICBsZXQgc2VjTnVtID0gcGFyc2VJbnQoc2Vjb25kLCAxMCk7XG4gICAgaWYoIXNlY29uZCl7XG4gICAgICAgIHJldHVybiBcIjAwOjAwXCI7XG4gICAgfVxuICAgIGxldCBob3VycyAgID0gTWF0aC5mbG9vcihzZWNOdW0gLyAzNjAwKTtcbiAgICBsZXQgbWludXRlcyA9IE1hdGguZmxvb3IoKHNlY051bSAtIChob3VycyAqIDM2MDApKSAvIDYwKTtcbiAgICBsZXQgc2Vjb25kcyA9IHNlY051bSAtIChob3VycyAqIDM2MDApIC0gKG1pbnV0ZXMgKiA2MCk7XG5cbiAgICAvL2lmIChob3VycyA+IDApIHttaW51dGVzID0gXCIwXCIrbWludXRlczt9XG4gICAgaWYgKG1pbnV0ZXMgPCAxMCkge21pbnV0ZXMgPSBcIjBcIittaW51dGVzO31cbiAgICBpZiAoc2Vjb25kcyA8IDEwKSB7c2Vjb25kcyA9IFwiMFwiK3NlY29uZHM7fVxuXG4gICAgaWYgKGhvdXJzID4gMCkge1xuICAgICAgICByZXR1cm4gaG91cnMrJzonK21pbnV0ZXMrJzonK3NlY29uZHM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG1pbnV0ZXMrJzonK3NlY29uZHM7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBobXNUb1NlY29uZChzdHIsIGZyYW1lUmF0ZSkge1xuICAgIGlmKCFzdHIpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGlmKF8uaXNOdW1iZXIoc3RyKSAmJiAhXy5pc05hTihzdHIpKXtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoJywnLCAnLicpO1xuICAgIGxldCBhcnIgPSBzdHIuc3BsaXQoJzonKTtcbiAgICBsZXQgYXJyTGVuZ3RoID0gYXJyLmxlbmd0aDtcbiAgICBsZXQgc2VjID0gMDtcbiAgICBpZiAoc3RyLnNsaWNlKC0xKSA9PT0gJ3MnKXtcbiAgICAgICAgc2VjID0gcGFyc2VGbG9hdChzdHIpO1xuICAgIH1lbHNlIGlmIChzdHIuc2xpY2UoLTEpID09PSAnbScpe1xuICAgICAgICBzZWMgPSBwYXJzZUZsb2F0KHN0cikgKiA2MDtcbiAgICB9ZWxzZSBpZiAoc3RyLnNsaWNlKC0xKSA9PT0gJ2gnKXtcbiAgICAgICAgc2VjID0gcGFyc2VGbG9hdChzdHIpICogMzYwMDtcbiAgICB9ZWxzZSBpZiAoYXJyTGVuZ3RoID4gMSkge1xuICAgICAgICB2YXIgc2VjSW5kZXggPSBhcnJMZW5ndGggLSAxO1xuICAgICAgICBpZiAoYXJyTGVuZ3RoID09PSA0KSB7XG4gICAgICAgICAgICBpZiAoZnJhbWVSYXRlKSB7XG4gICAgICAgICAgICAgICAgc2VjID0gcGFyc2VGbG9hdChhcnJbc2VjSW5kZXhdKSAvIGZyYW1lUmF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlY0luZGV4IC09IDE7XG4gICAgICAgIH1cbiAgICAgICAgc2VjICs9IHBhcnNlRmxvYXQoYXJyW3NlY0luZGV4XSk7XG4gICAgICAgIHNlYyArPSBwYXJzZUZsb2F0KGFycltzZWNJbmRleCAtIDFdKSAqIDYwO1xuICAgICAgICBpZiAoYXJyTGVuZ3RoID49IDMpIHtcbiAgICAgICAgICAgIHNlYyArPSBwYXJzZUZsb2F0KGFycltzZWNJbmRleCAtIDJdKSAqIDM2MDA7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBzZWMgPSBwYXJzZUZsb2F0KHN0cik7XG4gICAgfVxuICAgIGlmIChfLmlzTmFOKHNlYykpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHJldHVybiBzZWM7XG59IiwiLy8gICAgIFVuZGVyc2NvcmUuanMgMS45LjFcbi8vICAgICBodHRwOi8vdW5kZXJzY29yZWpzLm9yZ1xuLy8gICAgIChjKSAyMDA5LTIwMTggSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbi8vICAgICBVbmRlcnNjb3JlIG1heSBiZSBmcmVlbHkgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuIWZ1bmN0aW9uKCl7dmFyIG49XCJvYmplY3RcIj09dHlwZW9mIHNlbGYmJnNlbGYuc2VsZj09PXNlbGYmJnNlbGZ8fFwib2JqZWN0XCI9PXR5cGVvZiBnbG9iYWwmJmdsb2JhbC5nbG9iYWw9PT1nbG9iYWwmJmdsb2JhbHx8dGhpc3x8e30scj1uLl8sZT1BcnJheS5wcm90b3R5cGUsbz1PYmplY3QucHJvdG90eXBlLHM9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFN5bWJvbD9TeW1ib2wucHJvdG90eXBlOm51bGwsdT1lLnB1c2gsYz1lLnNsaWNlLHA9by50b1N0cmluZyxpPW8uaGFzT3duUHJvcGVydHksdD1BcnJheS5pc0FycmF5LGE9T2JqZWN0LmtleXMsbD1PYmplY3QuY3JlYXRlLGY9ZnVuY3Rpb24oKXt9LGg9ZnVuY3Rpb24obil7cmV0dXJuIG4gaW5zdGFuY2VvZiBoP246dGhpcyBpbnN0YW5jZW9mIGg/dm9pZCh0aGlzLl93cmFwcGVkPW4pOm5ldyBoKG4pfTtcInVuZGVmaW5lZFwiPT10eXBlb2YgZXhwb3J0c3x8ZXhwb3J0cy5ub2RlVHlwZT9uLl89aDooXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZSYmIW1vZHVsZS5ub2RlVHlwZSYmbW9kdWxlLmV4cG9ydHMmJihleHBvcnRzPW1vZHVsZS5leHBvcnRzPWgpLGV4cG9ydHMuXz1oKSxoLlZFUlNJT049XCIxLjkuMVwiO3ZhciB2LHk9ZnVuY3Rpb24odSxpLG4pe2lmKHZvaWQgMD09PWkpcmV0dXJuIHU7c3dpdGNoKG51bGw9PW4/MzpuKXtjYXNlIDE6cmV0dXJuIGZ1bmN0aW9uKG4pe3JldHVybiB1LmNhbGwoaSxuKX07Y2FzZSAzOnJldHVybiBmdW5jdGlvbihuLHIsdCl7cmV0dXJuIHUuY2FsbChpLG4scix0KX07Y2FzZSA0OnJldHVybiBmdW5jdGlvbihuLHIsdCxlKXtyZXR1cm4gdS5jYWxsKGksbixyLHQsZSl9fXJldHVybiBmdW5jdGlvbigpe3JldHVybiB1LmFwcGx5KGksYXJndW1lbnRzKX19LGQ9ZnVuY3Rpb24obixyLHQpe3JldHVybiBoLml0ZXJhdGVlIT09dj9oLml0ZXJhdGVlKG4scik6bnVsbD09bj9oLmlkZW50aXR5OmguaXNGdW5jdGlvbihuKT95KG4scix0KTpoLmlzT2JqZWN0KG4pJiYhaC5pc0FycmF5KG4pP2gubWF0Y2hlcihuKTpoLnByb3BlcnR5KG4pfTtoLml0ZXJhdGVlPXY9ZnVuY3Rpb24obixyKXtyZXR1cm4gZChuLHIsMS8wKX07dmFyIGc9ZnVuY3Rpb24odSxpKXtyZXR1cm4gaT1udWxsPT1pP3UubGVuZ3RoLTE6K2ksZnVuY3Rpb24oKXtmb3IodmFyIG49TWF0aC5tYXgoYXJndW1lbnRzLmxlbmd0aC1pLDApLHI9QXJyYXkobiksdD0wO3Q8bjt0Kyspclt0XT1hcmd1bWVudHNbdCtpXTtzd2l0Y2goaSl7Y2FzZSAwOnJldHVybiB1LmNhbGwodGhpcyxyKTtjYXNlIDE6cmV0dXJuIHUuY2FsbCh0aGlzLGFyZ3VtZW50c1swXSxyKTtjYXNlIDI6cmV0dXJuIHUuY2FsbCh0aGlzLGFyZ3VtZW50c1swXSxhcmd1bWVudHNbMV0scil9dmFyIGU9QXJyYXkoaSsxKTtmb3IodD0wO3Q8aTt0KyspZVt0XT1hcmd1bWVudHNbdF07cmV0dXJuIGVbaV09cix1LmFwcGx5KHRoaXMsZSl9fSxtPWZ1bmN0aW9uKG4pe2lmKCFoLmlzT2JqZWN0KG4pKXJldHVybnt9O2lmKGwpcmV0dXJuIGwobik7Zi5wcm90b3R5cGU9bjt2YXIgcj1uZXcgZjtyZXR1cm4gZi5wcm90b3R5cGU9bnVsbCxyfSxiPWZ1bmN0aW9uKHIpe3JldHVybiBmdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09bj92b2lkIDA6bltyXX19LGo9ZnVuY3Rpb24obixyKXtyZXR1cm4gbnVsbCE9biYmaS5jYWxsKG4scil9LHg9ZnVuY3Rpb24obixyKXtmb3IodmFyIHQ9ci5sZW5ndGgsZT0wO2U8dDtlKyspe2lmKG51bGw9PW4pcmV0dXJuO249bltyW2VdXX1yZXR1cm4gdD9uOnZvaWQgMH0sXz1NYXRoLnBvdygyLDUzKS0xLEE9YihcImxlbmd0aFwiKSx3PWZ1bmN0aW9uKG4pe3ZhciByPUEobik7cmV0dXJuXCJudW1iZXJcIj09dHlwZW9mIHImJjA8PXImJnI8PV99O2guZWFjaD1oLmZvckVhY2g9ZnVuY3Rpb24obixyLHQpe3ZhciBlLHU7aWYocj15KHIsdCksdyhuKSlmb3IoZT0wLHU9bi5sZW5ndGg7ZTx1O2UrKylyKG5bZV0sZSxuKTtlbHNle3ZhciBpPWgua2V5cyhuKTtmb3IoZT0wLHU9aS5sZW5ndGg7ZTx1O2UrKylyKG5baVtlXV0saVtlXSxuKX1yZXR1cm4gbn0saC5tYXA9aC5jb2xsZWN0PWZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGU9IXcobikmJmgua2V5cyhuKSx1PShlfHxuKS5sZW5ndGgsaT1BcnJheSh1KSxvPTA7bzx1O28rKyl7dmFyIGE9ZT9lW29dOm87aVtvXT1yKG5bYV0sYSxuKX1yZXR1cm4gaX07dmFyIE89ZnVuY3Rpb24oYyl7cmV0dXJuIGZ1bmN0aW9uKG4scix0LGUpe3ZhciB1PTM8PWFyZ3VtZW50cy5sZW5ndGg7cmV0dXJuIGZ1bmN0aW9uKG4scix0LGUpe3ZhciB1PSF3KG4pJiZoLmtleXMobiksaT0odXx8bikubGVuZ3RoLG89MDxjPzA6aS0xO2ZvcihlfHwodD1uW3U/dVtvXTpvXSxvKz1jKTswPD1vJiZvPGk7bys9Yyl7dmFyIGE9dT91W29dOm87dD1yKHQsblthXSxhLG4pfXJldHVybiB0fShuLHkocixlLDQpLHQsdSl9fTtoLnJlZHVjZT1oLmZvbGRsPWguaW5qZWN0PU8oMSksaC5yZWR1Y2VSaWdodD1oLmZvbGRyPU8oLTEpLGguZmluZD1oLmRldGVjdD1mdW5jdGlvbihuLHIsdCl7dmFyIGU9KHcobik/aC5maW5kSW5kZXg6aC5maW5kS2V5KShuLHIsdCk7aWYodm9pZCAwIT09ZSYmLTEhPT1lKXJldHVybiBuW2VdfSxoLmZpbHRlcj1oLnNlbGVjdD1mdW5jdGlvbihuLGUscil7dmFyIHU9W107cmV0dXJuIGU9ZChlLHIpLGguZWFjaChuLGZ1bmN0aW9uKG4scix0KXtlKG4scix0KSYmdS5wdXNoKG4pfSksdX0saC5yZWplY3Q9ZnVuY3Rpb24obixyLHQpe3JldHVybiBoLmZpbHRlcihuLGgubmVnYXRlKGQocikpLHQpfSxoLmV2ZXJ5PWguYWxsPWZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGU9IXcobikmJmgua2V5cyhuKSx1PShlfHxuKS5sZW5ndGgsaT0wO2k8dTtpKyspe3ZhciBvPWU/ZVtpXTppO2lmKCFyKG5bb10sbyxuKSlyZXR1cm4hMX1yZXR1cm4hMH0saC5zb21lPWguYW55PWZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGU9IXcobikmJmgua2V5cyhuKSx1PShlfHxuKS5sZW5ndGgsaT0wO2k8dTtpKyspe3ZhciBvPWU/ZVtpXTppO2lmKHIobltvXSxvLG4pKXJldHVybiEwfXJldHVybiExfSxoLmNvbnRhaW5zPWguaW5jbHVkZXM9aC5pbmNsdWRlPWZ1bmN0aW9uKG4scix0LGUpe3JldHVybiB3KG4pfHwobj1oLnZhbHVlcyhuKSksKFwibnVtYmVyXCIhPXR5cGVvZiB0fHxlKSYmKHQ9MCksMDw9aC5pbmRleE9mKG4scix0KX0saC5pbnZva2U9ZyhmdW5jdGlvbihuLHQsZSl7dmFyIHUsaTtyZXR1cm4gaC5pc0Z1bmN0aW9uKHQpP2k9dDpoLmlzQXJyYXkodCkmJih1PXQuc2xpY2UoMCwtMSksdD10W3QubGVuZ3RoLTFdKSxoLm1hcChuLGZ1bmN0aW9uKG4pe3ZhciByPWk7aWYoIXIpe2lmKHUmJnUubGVuZ3RoJiYobj14KG4sdSkpLG51bGw9PW4pcmV0dXJuO3I9blt0XX1yZXR1cm4gbnVsbD09cj9yOnIuYXBwbHkobixlKX0pfSksaC5wbHVjaz1mdW5jdGlvbihuLHIpe3JldHVybiBoLm1hcChuLGgucHJvcGVydHkocikpfSxoLndoZXJlPWZ1bmN0aW9uKG4scil7cmV0dXJuIGguZmlsdGVyKG4saC5tYXRjaGVyKHIpKX0saC5maW5kV2hlcmU9ZnVuY3Rpb24obixyKXtyZXR1cm4gaC5maW5kKG4saC5tYXRjaGVyKHIpKX0saC5tYXg9ZnVuY3Rpb24obixlLHIpe3ZhciB0LHUsaT0tMS8wLG89LTEvMDtpZihudWxsPT1lfHxcIm51bWJlclwiPT10eXBlb2YgZSYmXCJvYmplY3RcIiE9dHlwZW9mIG5bMF0mJm51bGwhPW4pZm9yKHZhciBhPTAsYz0obj13KG4pP246aC52YWx1ZXMobikpLmxlbmd0aDthPGM7YSsrKW51bGwhPSh0PW5bYV0pJiZpPHQmJihpPXQpO2Vsc2UgZT1kKGUsciksaC5lYWNoKG4sZnVuY3Rpb24obixyLHQpe3U9ZShuLHIsdCksKG88dXx8dT09PS0xLzAmJmk9PT0tMS8wKSYmKGk9bixvPXUpfSk7cmV0dXJuIGl9LGgubWluPWZ1bmN0aW9uKG4sZSxyKXt2YXIgdCx1LGk9MS8wLG89MS8wO2lmKG51bGw9PWV8fFwibnVtYmVyXCI9PXR5cGVvZiBlJiZcIm9iamVjdFwiIT10eXBlb2YgblswXSYmbnVsbCE9bilmb3IodmFyIGE9MCxjPShuPXcobik/bjpoLnZhbHVlcyhuKSkubGVuZ3RoO2E8YzthKyspbnVsbCE9KHQ9blthXSkmJnQ8aSYmKGk9dCk7ZWxzZSBlPWQoZSxyKSxoLmVhY2gobixmdW5jdGlvbihuLHIsdCl7KCh1PWUobixyLHQpKTxvfHx1PT09MS8wJiZpPT09MS8wKSYmKGk9bixvPXUpfSk7cmV0dXJuIGl9LGguc2h1ZmZsZT1mdW5jdGlvbihuKXtyZXR1cm4gaC5zYW1wbGUobiwxLzApfSxoLnNhbXBsZT1mdW5jdGlvbihuLHIsdCl7aWYobnVsbD09cnx8dClyZXR1cm4gdyhuKXx8KG49aC52YWx1ZXMobikpLG5baC5yYW5kb20obi5sZW5ndGgtMSldO3ZhciBlPXcobik/aC5jbG9uZShuKTpoLnZhbHVlcyhuKSx1PUEoZSk7cj1NYXRoLm1heChNYXRoLm1pbihyLHUpLDApO2Zvcih2YXIgaT11LTEsbz0wO288cjtvKyspe3ZhciBhPWgucmFuZG9tKG8saSksYz1lW29dO2Vbb109ZVthXSxlW2FdPWN9cmV0dXJuIGUuc2xpY2UoMCxyKX0saC5zb3J0Qnk9ZnVuY3Rpb24obixlLHIpe3ZhciB1PTA7cmV0dXJuIGU9ZChlLHIpLGgucGx1Y2soaC5tYXAobixmdW5jdGlvbihuLHIsdCl7cmV0dXJue3ZhbHVlOm4saW5kZXg6dSsrLGNyaXRlcmlhOmUobixyLHQpfX0pLnNvcnQoZnVuY3Rpb24obixyKXt2YXIgdD1uLmNyaXRlcmlhLGU9ci5jcml0ZXJpYTtpZih0IT09ZSl7aWYoZTx0fHx2b2lkIDA9PT10KXJldHVybiAxO2lmKHQ8ZXx8dm9pZCAwPT09ZSlyZXR1cm4tMX1yZXR1cm4gbi5pbmRleC1yLmluZGV4fSksXCJ2YWx1ZVwiKX07dmFyIGs9ZnVuY3Rpb24obyxyKXtyZXR1cm4gZnVuY3Rpb24oZSx1LG4pe3ZhciBpPXI/W1tdLFtdXTp7fTtyZXR1cm4gdT1kKHUsbiksaC5lYWNoKGUsZnVuY3Rpb24obixyKXt2YXIgdD11KG4scixlKTtvKGksbix0KX0pLGl9fTtoLmdyb3VwQnk9ayhmdW5jdGlvbihuLHIsdCl7aihuLHQpP25bdF0ucHVzaChyKTpuW3RdPVtyXX0pLGguaW5kZXhCeT1rKGZ1bmN0aW9uKG4scix0KXtuW3RdPXJ9KSxoLmNvdW50Qnk9ayhmdW5jdGlvbihuLHIsdCl7aihuLHQpP25bdF0rKzpuW3RdPTF9KTt2YXIgUz0vW15cXHVkODAwLVxcdWRmZmZdfFtcXHVkODAwLVxcdWRiZmZdW1xcdWRjMDAtXFx1ZGZmZl18W1xcdWQ4MDAtXFx1ZGZmZl0vZztoLnRvQXJyYXk9ZnVuY3Rpb24obil7cmV0dXJuIG4/aC5pc0FycmF5KG4pP2MuY2FsbChuKTpoLmlzU3RyaW5nKG4pP24ubWF0Y2goUyk6dyhuKT9oLm1hcChuLGguaWRlbnRpdHkpOmgudmFsdWVzKG4pOltdfSxoLnNpemU9ZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PW4/MDp3KG4pP24ubGVuZ3RoOmgua2V5cyhuKS5sZW5ndGh9LGgucGFydGl0aW9uPWsoZnVuY3Rpb24obixyLHQpe25bdD8wOjFdLnB1c2gocil9LCEwKSxoLmZpcnN0PWguaGVhZD1oLnRha2U9ZnVuY3Rpb24obixyLHQpe3JldHVybiBudWxsPT1ufHxuLmxlbmd0aDwxP251bGw9PXI/dm9pZCAwOltdOm51bGw9PXJ8fHQ/blswXTpoLmluaXRpYWwobixuLmxlbmd0aC1yKX0saC5pbml0aWFsPWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gYy5jYWxsKG4sMCxNYXRoLm1heCgwLG4ubGVuZ3RoLShudWxsPT1yfHx0PzE6cikpKX0saC5sYXN0PWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gbnVsbD09bnx8bi5sZW5ndGg8MT9udWxsPT1yP3ZvaWQgMDpbXTpudWxsPT1yfHx0P25bbi5sZW5ndGgtMV06aC5yZXN0KG4sTWF0aC5tYXgoMCxuLmxlbmd0aC1yKSl9LGgucmVzdD1oLnRhaWw9aC5kcm9wPWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gYy5jYWxsKG4sbnVsbD09cnx8dD8xOnIpfSxoLmNvbXBhY3Q9ZnVuY3Rpb24obil7cmV0dXJuIGguZmlsdGVyKG4sQm9vbGVhbil9O3ZhciBNPWZ1bmN0aW9uKG4scix0LGUpe2Zvcih2YXIgdT0oZT1lfHxbXSkubGVuZ3RoLGk9MCxvPUEobik7aTxvO2krKyl7dmFyIGE9bltpXTtpZih3KGEpJiYoaC5pc0FycmF5KGEpfHxoLmlzQXJndW1lbnRzKGEpKSlpZihyKWZvcih2YXIgYz0wLGw9YS5sZW5ndGg7YzxsOyllW3UrK109YVtjKytdO2Vsc2UgTShhLHIsdCxlKSx1PWUubGVuZ3RoO2Vsc2UgdHx8KGVbdSsrXT1hKX1yZXR1cm4gZX07aC5mbGF0dGVuPWZ1bmN0aW9uKG4scil7cmV0dXJuIE0obixyLCExKX0saC53aXRob3V0PWcoZnVuY3Rpb24obixyKXtyZXR1cm4gaC5kaWZmZXJlbmNlKG4scil9KSxoLnVuaXE9aC51bmlxdWU9ZnVuY3Rpb24obixyLHQsZSl7aC5pc0Jvb2xlYW4ocil8fChlPXQsdD1yLHI9ITEpLG51bGwhPXQmJih0PWQodCxlKSk7Zm9yKHZhciB1PVtdLGk9W10sbz0wLGE9QShuKTtvPGE7bysrKXt2YXIgYz1uW29dLGw9dD90KGMsbyxuKTpjO3ImJiF0PyhvJiZpPT09bHx8dS5wdXNoKGMpLGk9bCk6dD9oLmNvbnRhaW5zKGksbCl8fChpLnB1c2gobCksdS5wdXNoKGMpKTpoLmNvbnRhaW5zKHUsYyl8fHUucHVzaChjKX1yZXR1cm4gdX0saC51bmlvbj1nKGZ1bmN0aW9uKG4pe3JldHVybiBoLnVuaXEoTShuLCEwLCEwKSl9KSxoLmludGVyc2VjdGlvbj1mdW5jdGlvbihuKXtmb3IodmFyIHI9W10sdD1hcmd1bWVudHMubGVuZ3RoLGU9MCx1PUEobik7ZTx1O2UrKyl7dmFyIGk9bltlXTtpZighaC5jb250YWlucyhyLGkpKXt2YXIgbztmb3Iobz0xO288dCYmaC5jb250YWlucyhhcmd1bWVudHNbb10saSk7bysrKTtvPT09dCYmci5wdXNoKGkpfX1yZXR1cm4gcn0saC5kaWZmZXJlbmNlPWcoZnVuY3Rpb24obixyKXtyZXR1cm4gcj1NKHIsITAsITApLGguZmlsdGVyKG4sZnVuY3Rpb24obil7cmV0dXJuIWguY29udGFpbnMocixuKX0pfSksaC51bnppcD1mdW5jdGlvbihuKXtmb3IodmFyIHI9biYmaC5tYXgobixBKS5sZW5ndGh8fDAsdD1BcnJheShyKSxlPTA7ZTxyO2UrKyl0W2VdPWgucGx1Y2sobixlKTtyZXR1cm4gdH0saC56aXA9ZyhoLnVuemlwKSxoLm9iamVjdD1mdW5jdGlvbihuLHIpe2Zvcih2YXIgdD17fSxlPTAsdT1BKG4pO2U8dTtlKyspcj90W25bZV1dPXJbZV06dFtuW2VdWzBdXT1uW2VdWzFdO3JldHVybiB0fTt2YXIgRj1mdW5jdGlvbihpKXtyZXR1cm4gZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT1BKG4pLHU9MDxpPzA6ZS0xOzA8PXUmJnU8ZTt1Kz1pKWlmKHIoblt1XSx1LG4pKXJldHVybiB1O3JldHVybi0xfX07aC5maW5kSW5kZXg9RigxKSxoLmZpbmRMYXN0SW5kZXg9RigtMSksaC5zb3J0ZWRJbmRleD1mdW5jdGlvbihuLHIsdCxlKXtmb3IodmFyIHU9KHQ9ZCh0LGUsMSkpKHIpLGk9MCxvPUEobik7aTxvOyl7dmFyIGE9TWF0aC5mbG9vcigoaStvKS8yKTt0KG5bYV0pPHU/aT1hKzE6bz1hfXJldHVybiBpfTt2YXIgRT1mdW5jdGlvbihpLG8sYSl7cmV0dXJuIGZ1bmN0aW9uKG4scix0KXt2YXIgZT0wLHU9QShuKTtpZihcIm51bWJlclwiPT10eXBlb2YgdCkwPGk/ZT0wPD10P3Q6TWF0aC5tYXgodCt1LGUpOnU9MDw9dD9NYXRoLm1pbih0KzEsdSk6dCt1KzE7ZWxzZSBpZihhJiZ0JiZ1KXJldHVybiBuW3Q9YShuLHIpXT09PXI/dDotMTtpZihyIT1yKXJldHVybiAwPD0odD1vKGMuY2FsbChuLGUsdSksaC5pc05hTikpP3QrZTotMTtmb3IodD0wPGk/ZTp1LTE7MDw9dCYmdDx1O3QrPWkpaWYoblt0XT09PXIpcmV0dXJuIHQ7cmV0dXJuLTF9fTtoLmluZGV4T2Y9RSgxLGguZmluZEluZGV4LGguc29ydGVkSW5kZXgpLGgubGFzdEluZGV4T2Y9RSgtMSxoLmZpbmRMYXN0SW5kZXgpLGgucmFuZ2U9ZnVuY3Rpb24obixyLHQpe251bGw9PXImJihyPW58fDAsbj0wKSx0fHwodD1yPG4/LTE6MSk7Zm9yKHZhciBlPU1hdGgubWF4KE1hdGguY2VpbCgoci1uKS90KSwwKSx1PUFycmF5KGUpLGk9MDtpPGU7aSsrLG4rPXQpdVtpXT1uO3JldHVybiB1fSxoLmNodW5rPWZ1bmN0aW9uKG4scil7aWYobnVsbD09cnx8cjwxKXJldHVybltdO2Zvcih2YXIgdD1bXSxlPTAsdT1uLmxlbmd0aDtlPHU7KXQucHVzaChjLmNhbGwobixlLGUrPXIpKTtyZXR1cm4gdH07dmFyIE49ZnVuY3Rpb24obixyLHQsZSx1KXtpZighKGUgaW5zdGFuY2VvZiByKSlyZXR1cm4gbi5hcHBseSh0LHUpO3ZhciBpPW0obi5wcm90b3R5cGUpLG89bi5hcHBseShpLHUpO3JldHVybiBoLmlzT2JqZWN0KG8pP286aX07aC5iaW5kPWcoZnVuY3Rpb24ocix0LGUpe2lmKCFoLmlzRnVuY3Rpb24ocikpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkJpbmQgbXVzdCBiZSBjYWxsZWQgb24gYSBmdW5jdGlvblwiKTt2YXIgdT1nKGZ1bmN0aW9uKG4pe3JldHVybiBOKHIsdSx0LHRoaXMsZS5jb25jYXQobikpfSk7cmV0dXJuIHV9KSxoLnBhcnRpYWw9ZyhmdW5jdGlvbih1LGkpe3ZhciBvPWgucGFydGlhbC5wbGFjZWhvbGRlcixhPWZ1bmN0aW9uKCl7Zm9yKHZhciBuPTAscj1pLmxlbmd0aCx0PUFycmF5KHIpLGU9MDtlPHI7ZSsrKXRbZV09aVtlXT09PW8/YXJndW1lbnRzW24rK106aVtlXTtmb3IoO248YXJndW1lbnRzLmxlbmd0aDspdC5wdXNoKGFyZ3VtZW50c1tuKytdKTtyZXR1cm4gTih1LGEsdGhpcyx0aGlzLHQpfTtyZXR1cm4gYX0pLChoLnBhcnRpYWwucGxhY2Vob2xkZXI9aCkuYmluZEFsbD1nKGZ1bmN0aW9uKG4scil7dmFyIHQ9KHI9TShyLCExLCExKSkubGVuZ3RoO2lmKHQ8MSl0aHJvdyBuZXcgRXJyb3IoXCJiaW5kQWxsIG11c3QgYmUgcGFzc2VkIGZ1bmN0aW9uIG5hbWVzXCIpO2Zvcig7dC0tOyl7dmFyIGU9clt0XTtuW2VdPWguYmluZChuW2VdLG4pfX0pLGgubWVtb2l6ZT1mdW5jdGlvbihlLHUpe3ZhciBpPWZ1bmN0aW9uKG4pe3ZhciByPWkuY2FjaGUsdD1cIlwiKyh1P3UuYXBwbHkodGhpcyxhcmd1bWVudHMpOm4pO3JldHVybiBqKHIsdCl8fChyW3RdPWUuYXBwbHkodGhpcyxhcmd1bWVudHMpKSxyW3RdfTtyZXR1cm4gaS5jYWNoZT17fSxpfSxoLmRlbGF5PWcoZnVuY3Rpb24obixyLHQpe3JldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7cmV0dXJuIG4uYXBwbHkobnVsbCx0KX0scil9KSxoLmRlZmVyPWgucGFydGlhbChoLmRlbGF5LGgsMSksaC50aHJvdHRsZT1mdW5jdGlvbih0LGUsdSl7dmFyIGksbyxhLGMsbD0wO3V8fCh1PXt9KTt2YXIgZj1mdW5jdGlvbigpe2w9ITE9PT11LmxlYWRpbmc/MDpoLm5vdygpLGk9bnVsbCxjPXQuYXBwbHkobyxhKSxpfHwobz1hPW51bGwpfSxuPWZ1bmN0aW9uKCl7dmFyIG49aC5ub3coKTtsfHwhMSE9PXUubGVhZGluZ3x8KGw9bik7dmFyIHI9ZS0obi1sKTtyZXR1cm4gbz10aGlzLGE9YXJndW1lbnRzLHI8PTB8fGU8cj8oaSYmKGNsZWFyVGltZW91dChpKSxpPW51bGwpLGw9bixjPXQuYXBwbHkobyxhKSxpfHwobz1hPW51bGwpKTppfHwhMT09PXUudHJhaWxpbmd8fChpPXNldFRpbWVvdXQoZixyKSksY307cmV0dXJuIG4uY2FuY2VsPWZ1bmN0aW9uKCl7Y2xlYXJUaW1lb3V0KGkpLGw9MCxpPW89YT1udWxsfSxufSxoLmRlYm91bmNlPWZ1bmN0aW9uKHQsZSx1KXt2YXIgaSxvLGE9ZnVuY3Rpb24obixyKXtpPW51bGwsciYmKG89dC5hcHBseShuLHIpKX0sbj1nKGZ1bmN0aW9uKG4pe2lmKGkmJmNsZWFyVGltZW91dChpKSx1KXt2YXIgcj0haTtpPXNldFRpbWVvdXQoYSxlKSxyJiYobz10LmFwcGx5KHRoaXMsbikpfWVsc2UgaT1oLmRlbGF5KGEsZSx0aGlzLG4pO3JldHVybiBvfSk7cmV0dXJuIG4uY2FuY2VsPWZ1bmN0aW9uKCl7Y2xlYXJUaW1lb3V0KGkpLGk9bnVsbH0sbn0saC53cmFwPWZ1bmN0aW9uKG4scil7cmV0dXJuIGgucGFydGlhbChyLG4pfSxoLm5lZ2F0ZT1mdW5jdGlvbihuKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4hbi5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fSxoLmNvbXBvc2U9ZnVuY3Rpb24oKXt2YXIgdD1hcmd1bWVudHMsZT10Lmxlbmd0aC0xO3JldHVybiBmdW5jdGlvbigpe2Zvcih2YXIgbj1lLHI9dFtlXS5hcHBseSh0aGlzLGFyZ3VtZW50cyk7bi0tOylyPXRbbl0uY2FsbCh0aGlzLHIpO3JldHVybiByfX0saC5hZnRlcj1mdW5jdGlvbihuLHIpe3JldHVybiBmdW5jdGlvbigpe2lmKC0tbjwxKXJldHVybiByLmFwcGx5KHRoaXMsYXJndW1lbnRzKX19LGguYmVmb3JlPWZ1bmN0aW9uKG4scil7dmFyIHQ7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIDA8LS1uJiYodD1yLmFwcGx5KHRoaXMsYXJndW1lbnRzKSksbjw9MSYmKHI9bnVsbCksdH19LGgub25jZT1oLnBhcnRpYWwoaC5iZWZvcmUsMiksaC5yZXN0QXJndW1lbnRzPWc7dmFyIEk9IXt0b1N0cmluZzpudWxsfS5wcm9wZXJ0eUlzRW51bWVyYWJsZShcInRvU3RyaW5nXCIpLFQ9W1widmFsdWVPZlwiLFwiaXNQcm90b3R5cGVPZlwiLFwidG9TdHJpbmdcIixcInByb3BlcnR5SXNFbnVtZXJhYmxlXCIsXCJoYXNPd25Qcm9wZXJ0eVwiLFwidG9Mb2NhbGVTdHJpbmdcIl0sQj1mdW5jdGlvbihuLHIpe3ZhciB0PVQubGVuZ3RoLGU9bi5jb25zdHJ1Y3Rvcix1PWguaXNGdW5jdGlvbihlKSYmZS5wcm90b3R5cGV8fG8saT1cImNvbnN0cnVjdG9yXCI7Zm9yKGoobixpKSYmIWguY29udGFpbnMocixpKSYmci5wdXNoKGkpO3QtLTspKGk9VFt0XSlpbiBuJiZuW2ldIT09dVtpXSYmIWguY29udGFpbnMocixpKSYmci5wdXNoKGkpfTtoLmtleXM9ZnVuY3Rpb24obil7aWYoIWguaXNPYmplY3QobikpcmV0dXJuW107aWYoYSlyZXR1cm4gYShuKTt2YXIgcj1bXTtmb3IodmFyIHQgaW4gbilqKG4sdCkmJnIucHVzaCh0KTtyZXR1cm4gSSYmQihuLHIpLHJ9LGguYWxsS2V5cz1mdW5jdGlvbihuKXtpZighaC5pc09iamVjdChuKSlyZXR1cm5bXTt2YXIgcj1bXTtmb3IodmFyIHQgaW4gbilyLnB1c2godCk7cmV0dXJuIEkmJkIobixyKSxyfSxoLnZhbHVlcz1mdW5jdGlvbihuKXtmb3IodmFyIHI9aC5rZXlzKG4pLHQ9ci5sZW5ndGgsZT1BcnJheSh0KSx1PTA7dTx0O3UrKyllW3VdPW5bclt1XV07cmV0dXJuIGV9LGgubWFwT2JqZWN0PWZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGU9aC5rZXlzKG4pLHU9ZS5sZW5ndGgsaT17fSxvPTA7bzx1O28rKyl7dmFyIGE9ZVtvXTtpW2FdPXIoblthXSxhLG4pfXJldHVybiBpfSxoLnBhaXJzPWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj1oLmtleXMobiksdD1yLmxlbmd0aCxlPUFycmF5KHQpLHU9MDt1PHQ7dSsrKWVbdV09W3JbdV0sbltyW3VdXV07cmV0dXJuIGV9LGguaW52ZXJ0PWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj17fSx0PWgua2V5cyhuKSxlPTAsdT10Lmxlbmd0aDtlPHU7ZSsrKXJbblt0W2VdXV09dFtlXTtyZXR1cm4gcn0saC5mdW5jdGlvbnM9aC5tZXRob2RzPWZ1bmN0aW9uKG4pe3ZhciByPVtdO2Zvcih2YXIgdCBpbiBuKWguaXNGdW5jdGlvbihuW3RdKSYmci5wdXNoKHQpO3JldHVybiByLnNvcnQoKX07dmFyIFI9ZnVuY3Rpb24oYyxsKXtyZXR1cm4gZnVuY3Rpb24obil7dmFyIHI9YXJndW1lbnRzLmxlbmd0aDtpZihsJiYobj1PYmplY3QobikpLHI8Mnx8bnVsbD09bilyZXR1cm4gbjtmb3IodmFyIHQ9MTt0PHI7dCsrKWZvcih2YXIgZT1hcmd1bWVudHNbdF0sdT1jKGUpLGk9dS5sZW5ndGgsbz0wO288aTtvKyspe3ZhciBhPXVbb107bCYmdm9pZCAwIT09blthXXx8KG5bYV09ZVthXSl9cmV0dXJuIG59fTtoLmV4dGVuZD1SKGguYWxsS2V5cyksaC5leHRlbmRPd249aC5hc3NpZ249UihoLmtleXMpLGguZmluZEtleT1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlLHU9aC5rZXlzKG4pLGk9MCxvPXUubGVuZ3RoO2k8bztpKyspaWYocihuW2U9dVtpXV0sZSxuKSlyZXR1cm4gZX07dmFyIHEsSyx6PWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gciBpbiB0fTtoLnBpY2s9ZyhmdW5jdGlvbihuLHIpe3ZhciB0PXt9LGU9clswXTtpZihudWxsPT1uKXJldHVybiB0O2guaXNGdW5jdGlvbihlKT8oMTxyLmxlbmd0aCYmKGU9eShlLHJbMV0pKSxyPWguYWxsS2V5cyhuKSk6KGU9eixyPU0ociwhMSwhMSksbj1PYmplY3QobikpO2Zvcih2YXIgdT0wLGk9ci5sZW5ndGg7dTxpO3UrKyl7dmFyIG89clt1XSxhPW5bb107ZShhLG8sbikmJih0W29dPWEpfXJldHVybiB0fSksaC5vbWl0PWcoZnVuY3Rpb24obix0KXt2YXIgcixlPXRbMF07cmV0dXJuIGguaXNGdW5jdGlvbihlKT8oZT1oLm5lZ2F0ZShlKSwxPHQubGVuZ3RoJiYocj10WzFdKSk6KHQ9aC5tYXAoTSh0LCExLCExKSxTdHJpbmcpLGU9ZnVuY3Rpb24obixyKXtyZXR1cm4haC5jb250YWlucyh0LHIpfSksaC5waWNrKG4sZSxyKX0pLGguZGVmYXVsdHM9UihoLmFsbEtleXMsITApLGguY3JlYXRlPWZ1bmN0aW9uKG4scil7dmFyIHQ9bShuKTtyZXR1cm4gciYmaC5leHRlbmRPd24odCxyKSx0fSxoLmNsb25lPWZ1bmN0aW9uKG4pe3JldHVybiBoLmlzT2JqZWN0KG4pP2guaXNBcnJheShuKT9uLnNsaWNlKCk6aC5leHRlbmQoe30sbik6bn0saC50YXA9ZnVuY3Rpb24obixyKXtyZXR1cm4gcihuKSxufSxoLmlzTWF0Y2g9ZnVuY3Rpb24obixyKXt2YXIgdD1oLmtleXMociksZT10Lmxlbmd0aDtpZihudWxsPT1uKXJldHVybiFlO2Zvcih2YXIgdT1PYmplY3QobiksaT0wO2k8ZTtpKyspe3ZhciBvPXRbaV07aWYocltvXSE9PXVbb118fCEobyBpbiB1KSlyZXR1cm4hMX1yZXR1cm4hMH0scT1mdW5jdGlvbihuLHIsdCxlKXtpZihuPT09cilyZXR1cm4gMCE9PW58fDEvbj09MS9yO2lmKG51bGw9PW58fG51bGw9PXIpcmV0dXJuITE7aWYobiE9bilyZXR1cm4gciE9cjt2YXIgdT10eXBlb2YgbjtyZXR1cm4oXCJmdW5jdGlvblwiPT09dXx8XCJvYmplY3RcIj09PXV8fFwib2JqZWN0XCI9PXR5cGVvZiByKSYmSyhuLHIsdCxlKX0sSz1mdW5jdGlvbihuLHIsdCxlKXtuIGluc3RhbmNlb2YgaCYmKG49bi5fd3JhcHBlZCksciBpbnN0YW5jZW9mIGgmJihyPXIuX3dyYXBwZWQpO3ZhciB1PXAuY2FsbChuKTtpZih1IT09cC5jYWxsKHIpKXJldHVybiExO3N3aXRjaCh1KXtjYXNlXCJbb2JqZWN0IFJlZ0V4cF1cIjpjYXNlXCJbb2JqZWN0IFN0cmluZ11cIjpyZXR1cm5cIlwiK249PVwiXCIrcjtjYXNlXCJbb2JqZWN0IE51bWJlcl1cIjpyZXR1cm4rbiE9K24/K3IhPStyOjA9PStuPzEvK249PTEvcjorbj09K3I7Y2FzZVwiW29iamVjdCBEYXRlXVwiOmNhc2VcIltvYmplY3QgQm9vbGVhbl1cIjpyZXR1cm4rbj09K3I7Y2FzZVwiW29iamVjdCBTeW1ib2xdXCI6cmV0dXJuIHMudmFsdWVPZi5jYWxsKG4pPT09cy52YWx1ZU9mLmNhbGwocil9dmFyIGk9XCJbb2JqZWN0IEFycmF5XVwiPT09dTtpZighaSl7aWYoXCJvYmplY3RcIiE9dHlwZW9mIG58fFwib2JqZWN0XCIhPXR5cGVvZiByKXJldHVybiExO3ZhciBvPW4uY29uc3RydWN0b3IsYT1yLmNvbnN0cnVjdG9yO2lmKG8hPT1hJiYhKGguaXNGdW5jdGlvbihvKSYmbyBpbnN0YW5jZW9mIG8mJmguaXNGdW5jdGlvbihhKSYmYSBpbnN0YW5jZW9mIGEpJiZcImNvbnN0cnVjdG9yXCJpbiBuJiZcImNvbnN0cnVjdG9yXCJpbiByKXJldHVybiExfWU9ZXx8W107Zm9yKHZhciBjPSh0PXR8fFtdKS5sZW5ndGg7Yy0tOylpZih0W2NdPT09bilyZXR1cm4gZVtjXT09PXI7aWYodC5wdXNoKG4pLGUucHVzaChyKSxpKXtpZigoYz1uLmxlbmd0aCkhPT1yLmxlbmd0aClyZXR1cm4hMTtmb3IoO2MtLTspaWYoIXEobltjXSxyW2NdLHQsZSkpcmV0dXJuITF9ZWxzZXt2YXIgbCxmPWgua2V5cyhuKTtpZihjPWYubGVuZ3RoLGgua2V5cyhyKS5sZW5ndGghPT1jKXJldHVybiExO2Zvcig7Yy0tOylpZihsPWZbY10sIWoocixsKXx8IXEobltsXSxyW2xdLHQsZSkpcmV0dXJuITF9cmV0dXJuIHQucG9wKCksZS5wb3AoKSwhMH0saC5pc0VxdWFsPWZ1bmN0aW9uKG4scil7cmV0dXJuIHEobixyKX0saC5pc0VtcHR5PWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT1ufHwodyhuKSYmKGguaXNBcnJheShuKXx8aC5pc1N0cmluZyhuKXx8aC5pc0FyZ3VtZW50cyhuKSk/MD09PW4ubGVuZ3RoOjA9PT1oLmtleXMobikubGVuZ3RoKX0saC5pc0VsZW1lbnQ9ZnVuY3Rpb24obil7cmV0dXJuISghbnx8MSE9PW4ubm9kZVR5cGUpfSxoLmlzQXJyYXk9dHx8ZnVuY3Rpb24obil7cmV0dXJuXCJbb2JqZWN0IEFycmF5XVwiPT09cC5jYWxsKG4pfSxoLmlzT2JqZWN0PWZ1bmN0aW9uKG4pe3ZhciByPXR5cGVvZiBuO3JldHVyblwiZnVuY3Rpb25cIj09PXJ8fFwib2JqZWN0XCI9PT1yJiYhIW59LGguZWFjaChbXCJBcmd1bWVudHNcIixcIkZ1bmN0aW9uXCIsXCJTdHJpbmdcIixcIk51bWJlclwiLFwiRGF0ZVwiLFwiUmVnRXhwXCIsXCJFcnJvclwiLFwiU3ltYm9sXCIsXCJNYXBcIixcIldlYWtNYXBcIixcIlNldFwiLFwiV2Vha1NldFwiXSxmdW5jdGlvbihyKXtoW1wiaXNcIityXT1mdW5jdGlvbihuKXtyZXR1cm4gcC5jYWxsKG4pPT09XCJbb2JqZWN0IFwiK3IrXCJdXCJ9fSksaC5pc0FyZ3VtZW50cyhhcmd1bWVudHMpfHwoaC5pc0FyZ3VtZW50cz1mdW5jdGlvbihuKXtyZXR1cm4gaihuLFwiY2FsbGVlXCIpfSk7dmFyIEQ9bi5kb2N1bWVudCYmbi5kb2N1bWVudC5jaGlsZE5vZGVzO1wiZnVuY3Rpb25cIiE9dHlwZW9mLy4vJiZcIm9iamVjdFwiIT10eXBlb2YgSW50OEFycmF5JiZcImZ1bmN0aW9uXCIhPXR5cGVvZiBEJiYoaC5pc0Z1bmN0aW9uPWZ1bmN0aW9uKG4pe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIG58fCExfSksaC5pc0Zpbml0ZT1mdW5jdGlvbihuKXtyZXR1cm4haC5pc1N5bWJvbChuKSYmaXNGaW5pdGUobikmJiFpc05hTihwYXJzZUZsb2F0KG4pKX0saC5pc05hTj1mdW5jdGlvbihuKXtyZXR1cm4gaC5pc051bWJlcihuKSYmaXNOYU4obil9LGguaXNCb29sZWFuPWZ1bmN0aW9uKG4pe3JldHVybiEwPT09bnx8ITE9PT1ufHxcIltvYmplY3QgQm9vbGVhbl1cIj09PXAuY2FsbChuKX0saC5pc051bGw9ZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PT1ufSxoLmlzVW5kZWZpbmVkPWZ1bmN0aW9uKG4pe3JldHVybiB2b2lkIDA9PT1ufSxoLmhhcz1mdW5jdGlvbihuLHIpe2lmKCFoLmlzQXJyYXkocikpcmV0dXJuIGoobixyKTtmb3IodmFyIHQ9ci5sZW5ndGgsZT0wO2U8dDtlKyspe3ZhciB1PXJbZV07aWYobnVsbD09bnx8IWkuY2FsbChuLHUpKXJldHVybiExO249blt1XX1yZXR1cm4hIXR9LGgubm9Db25mbGljdD1mdW5jdGlvbigpe3JldHVybiBuLl89cix0aGlzfSxoLmlkZW50aXR5PWZ1bmN0aW9uKG4pe3JldHVybiBufSxoLmNvbnN0YW50PWZ1bmN0aW9uKG4pe3JldHVybiBmdW5jdGlvbigpe3JldHVybiBufX0saC5ub29wPWZ1bmN0aW9uKCl7fSxoLnByb3BlcnR5PWZ1bmN0aW9uKHIpe3JldHVybiBoLmlzQXJyYXkocik/ZnVuY3Rpb24obil7cmV0dXJuIHgobixyKX06YihyKX0saC5wcm9wZXJ0eU9mPWZ1bmN0aW9uKHIpe3JldHVybiBudWxsPT1yP2Z1bmN0aW9uKCl7fTpmdW5jdGlvbihuKXtyZXR1cm4gaC5pc0FycmF5KG4pP3gocixuKTpyW25dfX0saC5tYXRjaGVyPWgubWF0Y2hlcz1mdW5jdGlvbihyKXtyZXR1cm4gcj1oLmV4dGVuZE93bih7fSxyKSxmdW5jdGlvbihuKXtyZXR1cm4gaC5pc01hdGNoKG4scil9fSxoLnRpbWVzPWZ1bmN0aW9uKG4scix0KXt2YXIgZT1BcnJheShNYXRoLm1heCgwLG4pKTtyPXkocix0LDEpO2Zvcih2YXIgdT0wO3U8bjt1KyspZVt1XT1yKHUpO3JldHVybiBlfSxoLnJhbmRvbT1mdW5jdGlvbihuLHIpe3JldHVybiBudWxsPT1yJiYocj1uLG49MCksbitNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqKHItbisxKSl9LGgubm93PURhdGUubm93fHxmdW5jdGlvbigpe3JldHVybihuZXcgRGF0ZSkuZ2V0VGltZSgpfTt2YXIgTD17XCImXCI6XCImYW1wO1wiLFwiPFwiOlwiJmx0O1wiLFwiPlwiOlwiJmd0O1wiLCdcIic6XCImcXVvdDtcIixcIidcIjpcIiYjeDI3O1wiLFwiYFwiOlwiJiN4NjA7XCJ9LFA9aC5pbnZlcnQoTCksVz1mdW5jdGlvbihyKXt2YXIgdD1mdW5jdGlvbihuKXtyZXR1cm4gcltuXX0sbj1cIig/OlwiK2gua2V5cyhyKS5qb2luKFwifFwiKStcIilcIixlPVJlZ0V4cChuKSx1PVJlZ0V4cChuLFwiZ1wiKTtyZXR1cm4gZnVuY3Rpb24obil7cmV0dXJuIG49bnVsbD09bj9cIlwiOlwiXCIrbixlLnRlc3Qobik/bi5yZXBsYWNlKHUsdCk6bn19O2guZXNjYXBlPVcoTCksaC51bmVzY2FwZT1XKFApLGgucmVzdWx0PWZ1bmN0aW9uKG4scix0KXtoLmlzQXJyYXkocil8fChyPVtyXSk7dmFyIGU9ci5sZW5ndGg7aWYoIWUpcmV0dXJuIGguaXNGdW5jdGlvbih0KT90LmNhbGwobik6dDtmb3IodmFyIHU9MDt1PGU7dSsrKXt2YXIgaT1udWxsPT1uP3ZvaWQgMDpuW3JbdV1dO3ZvaWQgMD09PWkmJihpPXQsdT1lKSxuPWguaXNGdW5jdGlvbihpKT9pLmNhbGwobik6aX1yZXR1cm4gbn07dmFyIEM9MDtoLnVuaXF1ZUlkPWZ1bmN0aW9uKG4pe3ZhciByPSsrQytcIlwiO3JldHVybiBuP24rcjpyfSxoLnRlbXBsYXRlU2V0dGluZ3M9e2V2YWx1YXRlOi88JShbXFxzXFxTXSs/KSU+L2csaW50ZXJwb2xhdGU6LzwlPShbXFxzXFxTXSs/KSU+L2csZXNjYXBlOi88JS0oW1xcc1xcU10rPyklPi9nfTt2YXIgSj0vKC4pXi8sVT17XCInXCI6XCInXCIsXCJcXFxcXCI6XCJcXFxcXCIsXCJcXHJcIjpcInJcIixcIlxcblwiOlwiblwiLFwiXFx1MjAyOFwiOlwidTIwMjhcIixcIlxcdTIwMjlcIjpcInUyMDI5XCJ9LFY9L1xcXFx8J3xcXHJ8XFxufFxcdTIwMjh8XFx1MjAyOS9nLCQ9ZnVuY3Rpb24obil7cmV0dXJuXCJcXFxcXCIrVVtuXX07aC50ZW1wbGF0ZT1mdW5jdGlvbihpLG4scil7IW4mJnImJihuPXIpLG49aC5kZWZhdWx0cyh7fSxuLGgudGVtcGxhdGVTZXR0aW5ncyk7dmFyIHQsZT1SZWdFeHAoWyhuLmVzY2FwZXx8Sikuc291cmNlLChuLmludGVycG9sYXRlfHxKKS5zb3VyY2UsKG4uZXZhbHVhdGV8fEopLnNvdXJjZV0uam9pbihcInxcIikrXCJ8JFwiLFwiZ1wiKSxvPTAsYT1cIl9fcCs9J1wiO2kucmVwbGFjZShlLGZ1bmN0aW9uKG4scix0LGUsdSl7cmV0dXJuIGErPWkuc2xpY2Uobyx1KS5yZXBsYWNlKFYsJCksbz11K24ubGVuZ3RoLHI/YSs9XCInK1xcbigoX190PShcIityK1wiKSk9PW51bGw/Jyc6Xy5lc2NhcGUoX190KSkrXFxuJ1wiOnQ/YSs9XCInK1xcbigoX190PShcIit0K1wiKSk9PW51bGw/Jyc6X190KStcXG4nXCI6ZSYmKGErPVwiJztcXG5cIitlK1wiXFxuX19wKz0nXCIpLG59KSxhKz1cIic7XFxuXCIsbi52YXJpYWJsZXx8KGE9XCJ3aXRoKG9ianx8e30pe1xcblwiK2ErXCJ9XFxuXCIpLGE9XCJ2YXIgX190LF9fcD0nJyxfX2o9QXJyYXkucHJvdG90eXBlLmpvaW4sXCIrXCJwcmludD1mdW5jdGlvbigpe19fcCs9X19qLmNhbGwoYXJndW1lbnRzLCcnKTt9O1xcblwiK2ErXCJyZXR1cm4gX19wO1xcblwiO3RyeXt0PW5ldyBGdW5jdGlvbihuLnZhcmlhYmxlfHxcIm9ialwiLFwiX1wiLGEpfWNhdGNoKG4pe3Rocm93IG4uc291cmNlPWEsbn12YXIgdT1mdW5jdGlvbihuKXtyZXR1cm4gdC5jYWxsKHRoaXMsbixoKX0sYz1uLnZhcmlhYmxlfHxcIm9ialwiO3JldHVybiB1LnNvdXJjZT1cImZ1bmN0aW9uKFwiK2MrXCIpe1xcblwiK2ErXCJ9XCIsdX0saC5jaGFpbj1mdW5jdGlvbihuKXt2YXIgcj1oKG4pO3JldHVybiByLl9jaGFpbj0hMCxyfTt2YXIgRz1mdW5jdGlvbihuLHIpe3JldHVybiBuLl9jaGFpbj9oKHIpLmNoYWluKCk6cn07aC5taXhpbj1mdW5jdGlvbih0KXtyZXR1cm4gaC5lYWNoKGguZnVuY3Rpb25zKHQpLGZ1bmN0aW9uKG4pe3ZhciByPWhbbl09dFtuXTtoLnByb3RvdHlwZVtuXT1mdW5jdGlvbigpe3ZhciBuPVt0aGlzLl93cmFwcGVkXTtyZXR1cm4gdS5hcHBseShuLGFyZ3VtZW50cyksRyh0aGlzLHIuYXBwbHkoaCxuKSl9fSksaH0saC5taXhpbihoKSxoLmVhY2goW1wicG9wXCIsXCJwdXNoXCIsXCJyZXZlcnNlXCIsXCJzaGlmdFwiLFwic29ydFwiLFwic3BsaWNlXCIsXCJ1bnNoaWZ0XCJdLGZ1bmN0aW9uKHIpe3ZhciB0PWVbcl07aC5wcm90b3R5cGVbcl09ZnVuY3Rpb24oKXt2YXIgbj10aGlzLl93cmFwcGVkO3JldHVybiB0LmFwcGx5KG4sYXJndW1lbnRzKSxcInNoaWZ0XCIhPT1yJiZcInNwbGljZVwiIT09cnx8MCE9PW4ubGVuZ3RofHxkZWxldGUgblswXSxHKHRoaXMsbil9fSksaC5lYWNoKFtcImNvbmNhdFwiLFwiam9pblwiLFwic2xpY2VcIl0sZnVuY3Rpb24obil7dmFyIHI9ZVtuXTtoLnByb3RvdHlwZVtuXT1mdW5jdGlvbigpe3JldHVybiBHKHRoaXMsci5hcHBseSh0aGlzLl93cmFwcGVkLGFyZ3VtZW50cykpfX0pLGgucHJvdG90eXBlLnZhbHVlPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX3dyYXBwZWR9LGgucHJvdG90eXBlLnZhbHVlT2Y9aC5wcm90b3R5cGUudG9KU09OPWgucHJvdG90eXBlLnZhbHVlLGgucHJvdG90eXBlLnRvU3RyaW5nPWZ1bmN0aW9uKCl7cmV0dXJuIFN0cmluZyh0aGlzLl93cmFwcGVkKX0sXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kJiZkZWZpbmUoXCJ1bmRlcnNjb3JlXCIsW10sZnVuY3Rpb24oKXtyZXR1cm4gaH0pfSgpO1xuIiwiaW1wb3J0IHtleHRyYWN0RXh0ZW5zaW9ufSBmcm9tIFwidXRpbHMvc3RyaW5nc1wiO1xuXG5leHBvcnQgY29uc3QgaXNSdG1wID0gZnVuY3Rpb24gKGZpbGUsIHR5cGUpIHtcbiAgICBpZihmaWxlKXtcbiAgICAgICAgcmV0dXJuIChmaWxlLmluZGV4T2YoJ3J0bXA6JykgPT0gMCB8fCB0eXBlID09ICdydG1wJyk7XG4gICAgfVxufTtcbmV4cG9ydCBjb25zdCBpc1dlYlJUQyA9IGZ1bmN0aW9uIChmaWxlLCB0eXBlKSB7XG4gICAgaWYoZmlsZSl7XG4gICAgICAgIHJldHVybiAoZmlsZS5pbmRleE9mKCd3czonKSA9PT0gMCB8fCBmaWxlLmluZGV4T2YoJ3dzczonKSA9PT0gMCB8fCB0eXBlID09PSAnd2VicnRjJyk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG5leHBvcnQgY29uc3QgaXNIbHMgPSBmdW5jdGlvbiAoZmlsZSwgdHlwZSkge1xuICAgIGlmKGZpbGUpe1xuICAgICAgICByZXR1cm4gKCB0eXBlID09PSAnaGxzJyB8fCAgdHlwZSA9PT0gJ20zdTgnIHx8IHR5cGUgPT09ICdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcgfHwgZXh0cmFjdEV4dGVuc2lvbihmaWxlKSA9PSAnbTN1OCcpO1xuXG4gICAgfVxufTtcbmV4cG9ydCBjb25zdCBpc0Rhc2ggPSBmdW5jdGlvbiAoZmlsZSwgdHlwZSkge1xuICAgIGlmKGZpbGUpe1xuICAgICAgICByZXR1cm4gKCB0eXBlID09PSAnbXBkJyB8fCAgdHlwZSA9PT0gJ2Rhc2gnIHx8IHR5cGUgPT09ICdhcHBsaWNhdGlvbi9kYXNoK3htbCcgfHwgZXh0cmFjdEV4dGVuc2lvbihmaWxlKSA9PSAnbXBkJyk7XG5cbiAgICB9XG59O1xuIiwiLyoqXG4gKiB1dGlscyBmb3Igd2VicGFja1xuICovXG5cbmV4cG9ydCBjb25zdCBnZXRTY3JpcHRQYXRoID0gZnVuY3Rpb24oc2NyaXB0TmFtZSkge1xuICAgIGNvbnN0IHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0Jyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY3JpcHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHNyYyA9IHNjcmlwdHNbaV0uc3JjO1xuICAgICAgICBpZiAoc3JjKSB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHNyYy5sYXN0SW5kZXhPZignLycgKyBzY3JpcHROYW1lKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNyYy5zdWJzdHIoMCwgaW5kZXggKyAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gJyc7XG59O1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gMjkuLlxuICovXG5leHBvcnQgY29uc3QgdmVyc2lvbiA9IF9fVkVSU0lPTl9fO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==