/*! OvenPlayer | (c) 2021 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
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

var _utils = __webpack_require__(/*! api/provider/utils */ "./src/js/api/provider/utils.js");

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

    var webrtcRetry = false;
    var WEBRTC_RETRY_COUNT = 3;
    var webrtcRetryCount = WEBRTC_RETRY_COUNT;
    var webrtcRetryInterval = 1000;
    var webrtcRetryTimer = null;

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
                throw _constants.ERRORS.codes[_constants.INIT_UNSUPPORT_ERROR];
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

            var currentSourceIndex = (0, _utils.pickCurrentSource)(playlistManager.getCurrentSources(), playerConfig);
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

                if (name === _constants.ERROR) {

                    // Chrome >=80 on Android misses h246 in SDP when first time after web page loaded.
                    // So wait until browser get h264 capabilities and create answer SDP.
                    if (userAgentObject.os === 'Android' && userAgentObject.browser === 'Chrome') {

                        if (data && data.code && data.code === _constants.PLAYER_WEBRTC_SET_LOCAL_DESC_ERROR) {

                            setTimeout(function () {

                                that.setCurrentSource(that.getCurrentSource());
                            }, webrtcRetryInterval);

                            return;
                        }
                    }

                    if (playerConfig.getConfig().autoFallback && playerConfig.getSourceIndex() + 1 < that.getSources().length) {
                        //this sequential has available source.
                        that.pause();
                        that.setCurrentSource(playerConfig.getSourceIndex() + 1);

                        return;
                    }
                }

                if (name === "complete") {
                    runNextPlaylist(playlistManager.getCurrentPlaylistIndex() + 1);
                }

                that.trigger(name, data);
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
                if (error && error.code && _constants.ERRORS.codes[error.code]) {
                    that.trigger(_constants.ERROR, _constants.ERRORS.codes[error.code]);
                } else {
                    var tempError = _constants.ERRORS.codes[_constants.INIT_UNKNWON_ERROR];
                    tempError.error = error;
                    that.trigger(_constants.ERROR, tempError);
                }
            });
        })["catch"](function (error) {
            //INIT ERROR
            if (error && error.code && _constants.ERRORS.codes[error.code]) {
                that.trigger(_constants.ERROR, _constants.ERRORS.codes[error.code]);
            } else {
                var tempError = _constants.ERRORS.codes[_constants.INIT_UNKNWON_ERROR];
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

        if (playerConfig.getConfig().webrtcConfig && playerConfig.getConfig().webrtcConfig.loadingRetryCount !== undefined) {
            WEBRTC_RETRY_COUNT = playerConfig.getConfig().loadingRetryCount;
        }

        //Not working : SyntaxError: "ERRORS.codes" is read-only
        _constants.ERRORS.codes = playerConfig.getSystemText().api.error;
        //Cool
        //ERRORS.codes.push(playerConfig.getSystemText());

        playlistManager.initPlaylist(playerConfig.getPlaylist(), playerConfig);
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
    that.getMseInstance = function () {
        if (currentProvider) {
            return currentProvider.getMse();
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

        if (currentProvider) {
            return currentProvider.getFramerate();
        }
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

            if ('sources' in playlist) {
                playerConfig.setPlaylist(playlist);
            } else {
                playerConfig.setPlaylist({
                    sources: playlist
                });
            }

            playlistManager.initPlaylist(playerConfig.getPlaylist(), playerConfig);
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

        // let sources = currentProvider.getSources();
        // let currentSource = sources[currentProvider.getCurrentSource()];
        // let newSource = sources[index];

        // let isSameProvider = providerController.isSameProvider(currentSource, newSource);
        // // provider.serCurrentQuality -> playerConfig setting -> load
        // let resultSourceIndex = currentProvider.setCurrentSource(index, isSameProvider);
        //
        // if(!newSource){
        //     return null;
        // }
        //
        // OvenPlayerConsole.log("API : setCurrentQuality() isSameProvider", isSameProvider);

        var lastPlayPosition = currentProvider.getPosition();
        playerConfig.setSourceIndex(index);
        lazyQueue = (0, _LazyCommandExecutor2["default"])(that, ['play', 'seek']);

        initProvider(lastPlayPosition);

        return index;
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

        OvenPlayerConsole.log("API : remove() ");

        if (lazyQueue) {
            lazyQueue.destroy();
        }

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

        that.trigger(_constants.DESTROY);
        that.off();

        providerController = null;
        playlistManager = null;
        playerConfig = null;
        lazyQueue = null;

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
            autoFallback: true,
            timecode: true,
            sourceIndex: -1,
            browser: "",
            hidePlaylistIcon: false,
            rtmpBufferTime: 1,
            rtmpBufferTimeMax: 3,
            adClient: "googleima",
            currentProtocolOnly: false,
            systemText: null,
            lang: "en",
            loadingRetryCount: 0,
            expandFullScreenUI: false,
            fullscreenOption: null,
            showBigPlayButton: true
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
        var userCustumSystemText = [];
        if (config.systemText) {
            userCustumSystemText = _underscore2["default"].isArray(config.systemText) ? config.systemText : [config.systemText];
        }

        for (var i = 0; i < userCustumSystemText.length; i++) {
            if (userCustumSystemText[i].lang) {
                var currentSystemText = _underscore2["default"].findWhere(_constants.SYSTEM_TEXT, { "lang": userCustumSystemText[i].lang });
                if (currentSystemText) {
                    //validate & update
                    _extends(currentSystemText, userCustumSystemText[i]);
                } else {
                    //create
                    currentSystemText = _underscore2["default"].findWhere(_constants.SYSTEM_TEXT, { "lang": "en" });
                    currentSystemText.lang = userCustumSystemText[i].lang;
                    _constants.SYSTEM_TEXT.push(_extends(userCustumSystemText[i], currentSystemText));
                }
            }
        }
        config.systemText = _underscore2["default"].findWhere(_constants.SYSTEM_TEXT, { "lang": config.lang });

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

    that.isCurrentProtocolOnly = function () {
        return spec.currentProtocolOnly;
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
    that.getSystemText = function () {
        return spec.systemText;
    };
    that.getLanguage = function () {
        return spec.lang;
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
                        var tempError = _constants.ERRORS.codes[_constants.PLAYER_CAPTION_ERROR];
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
                var tempError = errors[_constants.PLAYER_CAPTION_ERROR];
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
var DASH_PREPARED = exports.DASH_PREPARED = "dashPrepared";
var DASH_DESTROYED = exports.DASH_DESTROYED = "dashDestroyed";

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
var CONTENT_DURATION_CHANGED = exports.CONTENT_DURATION_CHANGED = "durationChanged";
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
var PLAYER_UNKNWON_NETWORK_ERROR = exports.PLAYER_UNKNWON_NETWORK_ERROR = 302;
var PLAYER_UNKNWON_DECODE_ERROR = exports.PLAYER_UNKNWON_DECODE_ERROR = 303;
var PLAYER_FILE_ERROR = exports.PLAYER_FILE_ERROR = 304;
var PLAYER_CAPTION_ERROR = exports.PLAYER_CAPTION_ERROR = 305;
var PLAYER_BAD_REQUEST_ERROR = exports.PLAYER_BAD_REQUEST_ERROR = 306;
var PLAYER_AUTH_FAILED_ERROR = exports.PLAYER_AUTH_FAILED_ERROR = 307;
var PLAYER_NOT_ACCEPTABLE_ERROR = exports.PLAYER_NOT_ACCEPTABLE_ERROR = 308;
var PLAYER_WEBRTC_WS_ERROR = exports.PLAYER_WEBRTC_WS_ERROR = 501;
var PLAYER_WEBRTC_ADD_ICECANDIDATE_ERROR = exports.PLAYER_WEBRTC_ADD_ICECANDIDATE_ERROR = 502;
var PLAYER_WEBRTC_SET_REMOTE_DESC_ERROR = exports.PLAYER_WEBRTC_SET_REMOTE_DESC_ERROR = 503;
var PLAYER_WEBRTC_CREATE_ANSWER_ERROR = exports.PLAYER_WEBRTC_CREATE_ANSWER_ERROR = 504;
var PLAYER_WEBRTC_SET_LOCAL_DESC_ERROR = exports.PLAYER_WEBRTC_SET_LOCAL_DESC_ERROR = 505;
var PLAYER_WEBRTC_NETWORK_SLOW = exports.PLAYER_WEBRTC_NETWORK_SLOW = 510;
var PLAYER_WEBRTC_UNEXPECTED_DISCONNECT = exports.PLAYER_WEBRTC_UNEXPECTED_DISCONNECT = 511;

var WARN_MSG_MUTEDPLAY = exports.WARN_MSG_MUTEDPLAY = "Please touch here to turn on the sound.";

var UI_ICONS = exports.UI_ICONS = {
    volume_mute: "volume-mute",
    op_warning: "op-warning"
};

var ERRORS = exports.ERRORS = { codes: "" };

var SYSTEM_TEXT = exports.SYSTEM_TEXT = [{
    "lang": "en",
    "ui": {
        "context": "About OvenPlayer",
        "controls": {
            "live": "Live Streaming",
            "low_latency_live": "Sub-Second Latency Streaming",
            "low_latency_p2p": "Sub-Second Latency P2P"
        },
        "playlist": "Playlist",
        "setting": {
            "title": "Settings",
            "speed": "Speed",
            "speedUnit": "x",
            "source": "Source",
            "quality": "Quality",
            "caption": "Caption",
            "display": "Display"
        }
    },
    "api": {
        "message": {
            "muted_play": "Please touch here to turn on the sound."
        },
        "error": {
            100: {
                "code": 100,
                "message": "Can not load due to unknown reasons.",
                "reason": "Can not load due to unknown reasons."
            },
            101: {
                "code": 101,
                "message": "Can not load due to playable media not found.",
                "reason": "Can not load due to playable media not found."
            },
            102: {
                "code": 102,
                "message": "Flash fetching process aborted. </br><a href='http://www.adobe.com/go/getflashplayer' target='_self'><img src='http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif' alt='Get Adobe Flash player'></a>",
                "reason": "It looks like not found swf or your environment is localhost."
            },
            103: {
                "code": 103,
                "message": "Can not load due to dashjs. Please check the lastest version.",
                "reason": "dash.js version is old. Please check the lastest."
            },
            104: {
                "code": 104,
                "message": "Can not load due to google ima for Ads. ",
                "reason": "Please check the google ima library."
            },
            105: {
                "code": 105,
                "message": "Can not find the dashjs. Please check the dashjs.",
                "reason": "Not found dashjs."
            },
            106: {
                "code": 106,
                "message": "Can not find the hlsjs. Please check the hlsjs.",
                "reason": "Not found hlsjs."
            },
            300: {
                "code": 300,
                "message": "Can not play due to unknown reasons.",
                "reason": "Can not play due to unknown reasons."
            },
            301: {
                "code": 301,
                "message": "Fetching process aborted by user.",
                "reason": "Fetching process aborted by user."
            },
            302: {
                "code": 302,
                "message": "Some of the media could not be downloaded due to a network error.",
                "reason": "Error occurred when downloading."
            },
            303: {
                "code": 303,
                "message": "Unable to load media. This may be due to a server or network error, or due to an unsupported format.",
                "reason": "Error occurred when decoding."
            },
            304: {
                "code": 304,
                "message": "Media playback has been canceled. It looks like your media is corrupted or your browser does not support the features your media uses.",
                "reason": "Media playback not supported."
            },
            305: {
                "code": 305,
                "message": "Can not load captions due to unknown reasons.",
                "reason": "Can not load captions due to unknown reasons."
            },
            306: {
                "code": 306,
                "message": "Unable to load media. This may be due to a server or network error, or due to an unsupported format.",
                "reason": "The server cannot or will not process the request."
            },
            307: {
                "code": 307,
                "message": "Unable to load media. This may be due to a server or network error, or due to an unsupported format.",
                "reason": "The server refused the request."
            },
            308: {
                "code": 308,
                "message": "Unable to load media. This may be due to a server or network error, or due to an unsupported format.",
                "reason": "The server do not accept the request."
            },
            501: {
                "code": 501,
                "message": "Connection with low-latency(OME) server failed.",
                "reason": "WebSocket connection failed."
            },
            502: {
                "code": 502,
                "message": "Connection with low-latency(OME) server failed.",
                "reason": "WebRTC addIceCandidate failed."
            },
            503: {
                "code": 503,
                "message": "Connection with low-latency(OME) server failed.",
                "reason": "WebRTC setRemoteDescription failed."
            },
            504: {
                "code": 504,
                "message": "Connection with low-latency(OME) server failed.",
                "reason": "WebRTC peer createOffer failed."
            },
            505: {
                "code": 505,
                "message": "Connection with low-latency(OME) server failed.",
                "reason": "WebRTC setLocalDescription failed."
            },
            510: {
                "code": 510,
                "message": "Network connection is unstable. Check the network connection.",
                "reason": "Network is slow."
            },
            511: {
                "code": 511,
                "message": "Connection with low-latency(OME) terminated unexpectedly.",
                "reason": "Unexpected end of connection."
            }
        }
    }
}, {
    "lang": "ko",
    "ui": {
        "context": "오븐플레이어에 관하여",
        "controls": {
            "live": "라이브",
            "low_latency_live": "초저지연 라이브",
            "low_latency_p2p": "초저지연 P2P"
        },
        "playlist": "플레이리스트",
        "setting": {
            "title": "설정",
            "speed": "재생 속도",
            "speedUnit": "x",
            "source": "소스",
            "quality": "품질",
            "caption": "자막",
            "display": "표시"
        }
    },
    "api": {
        "message": {
            "muted_play": "눌러서 소리 켜기"
        },
        "error": {
            100: {
                "code": 100,
                "message": "알 수 없는 이유로 로드 할 수 없습니다.",
                "reason": "알 수 없는 이유로 로드 할 수 없습니다."
            },
            101: {
                "code": 101,
                "message": "지원되는 미디어를 찾지 못해 로드 할 수 없습니다.",
                "reason": "Can not load due to playable media not found."
            },
            102: {
                "code": 102,
                "message": "플레시 로드가 중단 되었습니다. </br><a href='http://www.adobe.com/go/getflashplayer' target='_self'><img src='http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif' alt='Get Adobe Flash player'></a>",
                "reason": "It looks like not found swf or your environment is localhost."
            },
            103: {
                "code": 103,
                "message": "DashJS로 인해 로드 할 수 없습니다. dashjs 버전을 확인해주세요.",
                "reason": "dash.js version is old. Please check the lastest."
            },
            104: {
                "code": 104,
                "message": "Google IMA 라이브러리가 없어 로드 할 수 없습니다.",
                "reason": "Please check the google ima library."
            },
            105: {
                "code": 105,
                "message": "DashJS 라이브러리가 없어 로드 할 수 없습니다.",
                "reason": "Not found dashjs."
            },
            106: {
                "code": 106,
                "message": "HLSJS 라이브러리가 없어 로드 할 수 없습니다.",
                "reason": "Not found hlsjs."
            },
            300: {
                "code": 300,
                "message": "알 수 없는 이유로 재생할 수 없습니다.",
                "reason": "Can not play due to unknown reasons."
            },
            301: {
                "code": 301,
                "message": "사용자에 의한 프로세스 중단.",
                "reason": "Fetching process aborted by user."
            },
            302: {
                "code": 302,
                "message": "네트워크 오류로 인해 일부 미디어를 다운로드 할 수 없습니다.",
                "reason": "Error occurred when downloading."
            },
            303: {
                "code": 303,
                "message": "미디어를 로드 할 수 없습니다. 서버 또는 네트워크 오류 또는 지원되지 않는 형식으로 인해 발생할 수 있습니다.",
                "reason": "Error occurred when decoding."
            },
            304: {
                "code": 304,
                "message": "미디어 재생이 취소되었습니다. 미디어가 손상되었거나 브라우저가 미디어에서 사용하는 기능을 지원하지 않는 것 같습니다.",
                "reason": "Media playback not supported."
            },
            305: {
                "code": 305,
                "message": "알 수 없는 이유로 자막을 로드 할 수 없습니다.",
                "reason": "Can not load captions due to unknown reasons."
            },
            306: {
                "code": 306,
                "message": "미디어를 로드 할 수 없습니다. 서버 또는 네트워크 오류 또는 지원되지 않는 형식으로 인해 발생할 수 있습니다.",
                "reason": "The server cannot or will not process the request."
            },
            307: {
                "code": 307,
                "message": "미디어를 로드 할 수 없습니다. 서버 또는 네트워크 오류 또는 지원되지 않는 형식으로 인해 발생할 수 있습니다.",
                "reason": "The server refused the request."
            },
            308: {
                "code": 308,
                "message": "미디어를 로드 할 수 없습니다. 서버 또는 네트워크 오류 또는 지원되지 않는 형식으로 인해 발생할 수 있습니다.",
                "reason": "The server do not accept the request."
            },
            501: {
                "code": 501,
                "message": "웹소켓 연결 실패",
                "reason": "WebSocket connection failed."
            },
            502: {
                "code": 502,
                "message": "저지연(OME) 서버와 연결에 실패했습니다.",
                "reason": "WebRTC addIceCandidate failed."
            },
            503: {
                "code": 503,
                "message": "저지연(OME) 서버와 연결에 실패했습니다.",
                "reason": "WebRTC setRemoteDescription failed."
            },
            504: {
                "code": 504,
                "message": "저지연(OME) 서버와 연결에 실패했습니다.",
                "reason": "WebRTC peer createOffer failed."
            },
            505: {
                "code": 505,
                "message": "저지연(OME) 서버와 연결에 실패했습니다.",
                "reason": "WebRTC setLocalDescription failed."
            },
            510: {
                "code": 510,
                "message": "네트워크 연결이 불안정합니다. 네트워크 연결을 확인하십시오.",
                "reason": "Network is slow."
            }
        }
    }
}];

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

    var createHtmlVideo = function createHtmlVideo(isLoop, isAutoStart) {

        videoElement = document.createElement('video');
        videoElement.setAttribute('disableremoteplayback', '');
        videoElement.setAttribute('webkit-playsinline', 'true');
        videoElement.setAttribute('playsinline', 'true');
        if (isLoop) {
            videoElement.setAttribute('loop', '');
        }
        if (isAutoStart) {
            videoElement.setAttribute('autoplay', '');
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
            // if(videoElement){
            //     // that.empty();
            //     //reuse video element.
            //     //because playlist is auto next playing.
            //     //Only same video element does not require User Interaction Error.
            //     return videoElement;
            // }else{
            //     return createHtmlVideo(playerConfig.isLoop(), playerConfig.isAutoStart());
            // }
            that.empty();
            return createHtmlVideo(playerConfig.isLoop(), playerConfig.isAutoStart());
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
        } else if ((0, _validator.isHls)(source.file, source.type)) {
            source.type = 'hls';
        } else if ((0, _validator.isDash)(source.file, source.type)) {
            source.type = 'dash';
        } else if (!source.type) {
            source.type = (0, _strings.extractExtension)(source.file);
        }

        if (source.lowLatency) {
            source.lowLatency = source.lowLatency;
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

    that.initPlaylist = function (playlist, playerConfig) {

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

            function extractOnlyOneProtocol(sources) {
                if (!!sources) {
                    var highPriorityType = playlistItem.sources[0].type;

                    return _underscore2["default"].filter(sources, { type: highPriorityType });
                }
            }

            if (playerConfig.isCurrentProtocolOnly()) {
                playlistItem.sources = extractOnlyOneProtocol(playlistItem.sources);
            }

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
            return Promise.reject(_constants.ERRORS.codes[_constants.INIT_UNSUPPORT_ERROR]);
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

/***/ "./src/js/api/provider/utils.js":
/*!**************************************!*\
  !*** ./src/js/api/provider/utils.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pickCurrentSource = exports.errorTrigger = exports.separateLive = exports.extractVideoElement = undefined;

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Created by hoho on 2018. 11. 12..
 */
var extractVideoElement = exports.extractVideoElement = function extractVideoElement(elementOrMse) {
    if (_underscore2["default"].isElement(elementOrMse)) {
        return elementOrMse;
    }
    if (elementOrMse.getVideoElement) {
        return elementOrMse.getVideoElement();
    } else if (elementOrMse.media) {
        return elementOrMse.media;
    }
    return null;
};

var separateLive = exports.separateLive = function separateLive(mse) {
    //ToDo : You consider hlsjs. But not now because we don't support hlsjs.

    if (mse && mse.isDynamic) {
        return mse.isDynamic();
    } else {
        return false;
    }
};

var errorTrigger = exports.errorTrigger = function errorTrigger(error, provider) {
    if (provider) {
        provider.setState(_constants.STATE_ERROR);
        provider.pause();
        provider.trigger(_constants.ERROR, error);
    }
};

var pickCurrentSource = exports.pickCurrentSource = function pickCurrentSource(sources, playerConfig) {

    var sourceIndex = 0;

    if (sources) {

        if (playerConfig.getSourceIndex() === -1) {

            for (var i = 0; i < sources.length; i++) {
                if (sources[i]["default"]) {
                    sourceIndex = i;
                    break;
                }
            }
        } else {

            sourceIndex = playerConfig.getSourceIndex();
        }
    }

    return sourceIndex;
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
    var clientStrings = [{ s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/ }, { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ }, { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ }, { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ }, { s: 'Windows Vista', r: /Windows NT 6.0/ }, { s: 'Windows Server 2003', r: /Windows NT 5.2/ }, { s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ }, { s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ }, { s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ }, { s: 'Windows 98', r: /(Windows 98|Win98)/ }, { s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ }, { s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ }, { s: 'Windows CE', r: /Windows CE/ }, { s: 'Windows 3.11', r: /Win16/ }, { s: 'Android', r: /Android/ }, { s: 'Open BSD', r: /OpenBSD/ }, { s: 'Sun OS', r: /SunOS/ }, { s: 'Linux', r: /(Linux|X11)/ }, { s: 'iOS', r: /(iPhone|iPad|iPod)/ }, { s: 'Mac OS XI', r: /Mac OS X 11/ }, { s: 'Mac OS X', r: /Mac OS X 10/ }, { s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ }, { s: 'QNX', r: /QNX/ }, { s: 'UNIX', r: /UNIX/ }, { s: 'BeOS', r: /BeOS/ }, { s: 'OS/2', r: /OS\/2/ }, { s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ }];
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
        case 'Mac OS XI':
            osVersion = /Mac OS X (11[\.\_\d]+)/.exec(nAgt)[1];
            break;

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

        $element.closest = function (s) {

            var el = $element;

            do {

                if (el.matches(s)) {
                    return el;
                }

                el = el.parentElement || el.parentNode;
            } while (el !== null && el.nodeType === 1);

            return null;
        };

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
var version = exports.version = '0.9.0-2021061818-localbuild';

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvQXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvQXBpRXhwYW5zaW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0NvbmZpZ3VyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0V2ZW50RW1pdHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0xhenlDb21tYW5kRXhlY3V0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9TdXBwb3J0Q2hlY2tlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2NhcHRpb24vTG9hZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvY2FwdGlvbi9NYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvY2FwdGlvbi9wYXJzZXIvU3J0UGFyc2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvY29uc3RhbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvbWVkaWEvTWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3BsYXlsaXN0L01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9Db250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL292ZW5wbGF5ZXIuc2RrLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9jYXB0aW9ucy92dHRDdWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL2xpa2VBJC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvc3RyaW5ncy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvdW5kZXJzY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvdmFsaWRhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy93ZWJwYWNrLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92ZXJzaW9uLmpzIl0sIm5hbWVzIjpbIkFwaSIsImNvbnRhaW5lciIsInRoYXQiLCJjb25zb2xlIiwibG9nIiwidmVyc2lvbiIsIk92ZW5QbGF5ZXJDb25zb2xlIiwicGxheWxpc3RNYW5hZ2VyIiwicHJvdmlkZXJDb250cm9sbGVyIiwidXNlckFnZW50T2JqZWN0IiwibWVkaWFNYW5hZ2VyIiwiY3VycmVudFByb3ZpZGVyIiwicGxheWVyQ29uZmlnIiwibGF6eVF1ZXVlIiwiY2FwdGlvbk1hbmFnZXIiLCJ3ZWJydGNSZXRyeSIsIldFQlJUQ19SRVRSWV9DT1VOVCIsIndlYnJ0Y1JldHJ5Q291bnQiLCJ3ZWJydGNSZXRyeUludGVydmFsIiwid2VicnRjUmV0cnlUaW1lciIsInJ1bk5leHRQbGF5bGlzdCIsImluZGV4IiwibmV4dFBsYXlsaXN0SW5kZXgiLCJwbGF5bGlzdCIsImdldFBsYXlsaXN0IiwiaGFzTmV4dFBsYXlsaXN0Iiwic2V0U291cmNlSW5kZXgiLCJzZXRWb2x1bWUiLCJnZXRWb2x1bWUiLCJzZXRDdXJyZW50UGxheWxpc3QiLCJpbml0UHJvdmlkZXIiLCJpc0F1dG9TdGFydCIsInBsYXkiLCJ0cmlnZ2VyIiwiQUxMX1BMQVlMSVNUX0VOREVEIiwibGFzdFBsYXlQb3NpdGlvbiIsInBpY2tRdWFsaXR5RnJvbVNvdXJjZSIsInNvdXJjZXMiLCJxdWFsaXR5IiwiaSIsImxlbmd0aCIsImdldFNvdXJjZUluZGV4IiwibG9hZFByb3ZpZGVycyIsImdldEN1cnJlbnRQbGF5TGlzdCIsInRoZW4iLCJQcm92aWRlcnMiLCJFUlJPUlMiLCJjb2RlcyIsIklOSVRfVU5TVVBQT1JUX0VSUk9SIiwiZGVzdHJveSIsImdldEN1cnJlbnRQbGF5bGlzdEluZGV4IiwiY3VycmVudFNvdXJjZUluZGV4IiwiZ2V0Q3VycmVudFNvdXJjZXMiLCJwcm92aWRlck5hbWUiLCJwcm92aWRlciIsImNyZWF0ZU1lZGlhIiwiZ2V0Q3VycmVudEFkVGFnIiwiUFJPVklERVJfUlRNUCIsIm9uIiwibmFtZSIsImRhdGEiLCJFUlJPUiIsIm9zIiwiYnJvd3NlciIsImNvZGUiLCJQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SIiwic2V0VGltZW91dCIsInNldEN1cnJlbnRTb3VyY2UiLCJnZXRDdXJyZW50U291cmNlIiwiZ2V0Q29uZmlnIiwiYXV0b0ZhbGxiYWNrIiwiZ2V0U291cmNlcyIsInBhdXNlIiwicHJlbG9hZCIsIlJFQURZIiwiZmx1c2giLCJlcnJvciIsIm9mZiIsInRlbXBFcnJvciIsIklOSVRfVU5LTldPTl9FUlJPUiIsImluaXQiLCJvcHRpb25zIiwibWVkaWFDb250YWluZXIiLCJ3ZWJydGNDb25maWciLCJsb2FkaW5nUmV0cnlDb3VudCIsInVuZGVmaW5lZCIsImdldFN5c3RlbVRleHQiLCJhcGkiLCJpbml0UGxheWxpc3QiLCJnZXRQcm92aWRlck5hbWUiLCJnZXROYW1lIiwiZ2V0TXNlSW5zdGFuY2UiLCJnZXRNc2UiLCJnZXRCcm93c2VyIiwic2V0VGltZWNvZGVNb2RlIiwiaXNTaG93IiwiaXNUaW1lY29kZU1vZGUiLCJnZXRGcmFtZXJhdGUiLCJzZWVrRnJhbWUiLCJmcmFtZUNvdW50IiwiZ2V0RHVyYXRpb24iLCJnZXRQb3NpdGlvbiIsInZvbHVtZSIsInNldE11dGUiLCJzdGF0ZSIsImdldE11dGUiLCJsb2FkIiwic2V0Q3VycmVudFF1YWxpdHkiLCJzZXRQbGF5bGlzdCIsInNlZWsiLCJwb3NpdGlvbiIsInNldFBsYXliYWNrUmF0ZSIsInBsYXliYWNrUmF0ZSIsImdldFBsYXliYWNrUmF0ZSIsImdldEN1cnJlbnRQbGF5bGlzdCIsImdldFF1YWxpdHlMZXZlbHMiLCJnZXRDdXJyZW50UXVhbGl0eSIsInF1YWxpdHlJbmRleCIsImlzQXV0b1F1YWxpdHkiLCJzZXRBdXRvUXVhbGl0eSIsImlzQXV0byIsImdldENhcHRpb25MaXN0IiwiZ2V0Q3VycmVudENhcHRpb24iLCJzZXRDdXJyZW50Q2FwdGlvbiIsImFkZENhcHRpb24iLCJ0cmFjayIsInJlbW92ZUNhcHRpb24iLCJnZXRCdWZmZXIiLCJnZXRTdGF0ZSIsInN0b3AiLCJyZW1vdmUiLCJERVNUUk9ZIiwiT3ZlblBsYXllclNESyIsInJlbW92ZVBsYXllciIsImdldENvbnRhaW5lcklkIiwiZ2V0UGxheWVyTGlzdCIsImdldFZlcnNpb24iLCJBcGlSdG1wRXhwYW5zaW9uIiwiZXh0ZXJuYWxDYWxsYmFja0NyZWVwIiwicmVzdWx0IiwidHJpZ2dlckV2ZW50RnJvbUV4dGVybmFsIiwiQ29uZmlndXJhdG9yIiwiY29tcG9zZVNvdXJjZU9wdGlvbnMiLCJEZWZhdWx0cyIsInBsYXliYWNrUmF0ZXMiLCJtdXRlIiwibG9vcCIsImNvbnRyb2xzIiwiYXV0b1N0YXJ0IiwidGltZWNvZGUiLCJzb3VyY2VJbmRleCIsImhpZGVQbGF5bGlzdEljb24iLCJydG1wQnVmZmVyVGltZSIsInJ0bXBCdWZmZXJUaW1lTWF4IiwiYWRDbGllbnQiLCJjdXJyZW50UHJvdG9jb2xPbmx5Iiwic3lzdGVtVGV4dCIsImxhbmciLCJleHBhbmRGdWxsU2NyZWVuVUkiLCJmdWxsc2NyZWVuT3B0aW9uIiwic2hvd0JpZ1BsYXlCdXR0b24iLCJzZXJpYWxpemUiLCJ2YWwiLCJsb3dlcmNhc2VWYWwiLCJ0b0xvd2VyQ2FzZSIsImlzTmFOIiwiTnVtYmVyIiwicGFyc2VGbG9hdCIsImRlc2VyaWFsaXplIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJjb25maWciLCJ1c2VyQ3VzdHVtU3lzdGVtVGV4dCIsIl8iLCJpc0FycmF5IiwiY3VycmVudFN5c3RlbVRleHQiLCJmaW5kV2hlcmUiLCJTWVNURU1fVEVYVCIsInB1c2giLCJmaWx0ZXIiLCJpc051bWJlciIsInJhdGUiLCJtYXAiLCJNYXRoIiwicm91bmQiLCJpbmRleE9mIiwic29ydCIsImNvbmZpZ1BsYXlsaXN0Iiwib2JqIiwicGljayIsImZlZWREYXRhIiwiZHVyYXRpb24iLCJzcGVjIiwiZ2V0QWRDbGllbnQiLCJzZXRDb25maWciLCJ2YWx1ZSIsImdldENvbnRhaW5lciIsImdldFF1YWxpdHlMYWJlbCIsInF1YWxpdHlMYWJlbCIsInNldFF1YWxpdHlMYWJlbCIsIm5ld0xhYmVsIiwiaXNDdXJyZW50UHJvdG9jb2xPbmx5IiwiQ09OVEVOVF9USU1FX01PREVfQ0hBTkdFRCIsImdldFJ0bXBCdWZmZXJUaW1lIiwiZ2V0UnRtcEJ1ZmZlclRpbWVNYXgiLCJpc011dGUiLCJpc0xvb3AiLCJpc0NvbnRyb2xzIiwiZ2V0UGxheWJhY2tSYXRlcyIsImdldExhbmd1YWdlIiwiRXZlbnRFbWl0dGVyIiwib2JqZWN0IiwiX2V2ZW50cyIsInRyaWdnZXJFdmVudHMiLCJldmVudHMiLCJhcmdzIiwiY29udGV4dCIsImV2ZW50IiwibGlzdGVuZXIiLCJhcHBseSIsInNsaWNlIiwiY2FsbCIsImFyZ3VtZW50cyIsImFsbEV2ZW50cyIsImFsbCIsIm5hbWVzIiwibCIsInJldGFpbiIsImoiLCJrIiwiX2xpc3RlbmVyIiwib25jZSIsImNvdW50Iiwib25jZUNhbGxiYWNrIiwiTGF6eUNvbW1hbmRFeGVjdXRvciIsImluc3RhbmNlIiwicXVldWVkQ29tbWFuZHMiLCJjb21tYW5kUXVldWUiLCJ1bmRlY29yYXRlZE1ldGhvZHMiLCJleGVjdXRlTW9kZSIsImNvbW1hbmQiLCJtZXRob2QiLCJBcnJheSIsInByb3RvdHlwZSIsImFkZFF1ZXVlIiwiZXhlY3V0ZVF1ZXVlZENvbW1hbmRzIiwic2hpZnQiLCJzZXRFeGVjdXRlTW9kZSIsIm1vZGUiLCJnZXRVbmRlY29yYXRlZE1ldGhvZHMiLCJnZXRRdWV1ZSIsImVtcHR5IiwicmVtb3ZlQW5kRXhjdXRlT25jZSIsImNvbW1hbmRfIiwiY29tbWFuZFF1ZXVlSXRlbSIsInNwbGljZSIsImZpbmRJbmRleCIsIlN1cHBvcnRDaGVja2VyIiwic3VwcG9ydExpc3QiLCJjaGVja1N1cHBvcnQiLCJzb3VyY2UiLCJNaW1lVHlwZXMiLCJhYWMiLCJtcDQiLCJmNHYiLCJtNHYiLCJtb3YiLCJtcDMiLCJtcGVnIiwib2d2Iiwib2dnIiwib2dhIiwidm9yYmlzIiwid2VibSIsImY0YSIsIm0zdTgiLCJtM3UiLCJobHMiLCJ2aWRlbyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNhblBsYXlUeXBlIiwiZmlsZSIsInR5cGUiLCJtaW1lVHlwZSIsIndpbmRvdyIsIk1lZGlhU291cmNlIiwiV2ViS2l0TWVkaWFTb3VyY2UiLCJpc0hsc1N1cHBvcnQiLCJnZXRNZWRpYVNvdXJjZSIsIm1lZGlhU291cmNlIiwic291cmNlQnVmZmVyIiwiU291cmNlQnVmZmVyIiwiV2ViS2l0U291cmNlQnVmZmVyIiwiaXNUeXBlU3VwcG9ydGVkIiwic291cmNlQnVmZmVyVmFsaWRBUEkiLCJhcHBlbmRCdWZmZXIiLCJ0ZXN0Rmxhc2giLCJzdXBwb3J0IiwiQWN0aXZlWE9iamVjdCIsImUiLCJuYXZpZ2F0b3IiLCJtaW1lVHlwZXMiLCJmaW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UiLCJzb3J1Y2VfIiwiZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0IiwicGxheWxpc3RJdGVtIiwic3VwcG9ydE5hbWVzIiwiaXRlbSIsInN1cHBvcnRlZCIsIkxvYWRlciIsImNvbnZlcnRUb1ZUVEN1ZXMiLCJjdWVzIiwiVlRUQ3VlIiwiY3VlIiwic3RhcnQiLCJlbmQiLCJ0ZXh0IiwibGFuZ3VhZ2UiLCJzdWNjZXNzQ2FsbGJhY2siLCJlcnJvckNhbGxiYWNrIiwicmVxdWVzdE9wdGlvbnMiLCJ1cmwiLCJlbmNvZGluZyIsImxvYWRSZXF1ZXN0RG93bmxvZGVyIiwiUmVxdWVzdCIsInJlc3BvbnNlIiwiYm9keSIsInZ0dEN1ZXMiLCJsb2FkVnR0UGFyc2VyIiwicGFyc2VyIiwiV2ViVlRUIiwiUGFyc2VyIiwiU3RyaW5nRGVjb2RlciIsIm9uY3VlIiwib25mbHVzaCIsInBhcnNlIiwibG9hZFNtaVBhcnNlciIsInBhcnNlZERhdGEiLCJTbWlQYXJzZXIiLCJmaXhlZExhbmciLCJyZXF1aXJlIiwiZXJyIiwiaXNTdXBwb3J0Iiwia2luZCIsIk1hbmFnZXIiLCJwbGF5bGlzdEluZGV4IiwiY2FwdGlvbkxpc3QiLCJjdXJyZW50Q2FwdGlvbkluZGV4IiwiY2FwdGlvbkxvYWRlciIsImlzRmlzcnRMb2FkIiwiaXNTaG93aW5nIiwiYmluZFRyYWNrIiwibGFiZWwiLCJpZCIsInRyYWNrc0NvdW50IiwidHJhY2tJZCIsInByZWZpeCIsImRlZmF1bHR0cmFjayIsImNoYW5nZUN1cnJlbnRDYXB0aW9uIiwiQ09OVEVOVF9DQVBUSU9OX0NIQU5HRUQiLCJ0cmFja3MiLCJjYXB0aW9uSWQiLCJQTEFZRVJfQ0FQVElPTl9FUlJPUiIsIkNPTlRFTlRfVElNRSIsIm1ldGEiLCJjdXJyZW50Q3VlcyIsInN0YXJ0VGltZSIsImVuZFRpbWUiLCJDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQiLCJmbHVzaENhcHRpb25MaXN0IiwibGFzdENhcHRpb25JbmRleCIsIl9pbmRleCIsImVycm9ycyIsIl9lbnRyeSIsImVudHJ5IiwiYXJyYXkiLCJzcGxpdCIsImlkeCIsImxpbmUiLCJzdWJzdHIiLCJqb2luIiwiU3J0UGFyc2VyIiwiY2FwdGlvbnMiLCJsaXN0IiwiU1RBVEVfQlVGRkVSSU5HIiwiU1RBVEVfSURMRSIsIlNUQVRFX0NPTVBMRVRFIiwiU1RBVEVfUEFVU0VEIiwiU1RBVEVfUExBWUlORyIsIlNUQVRFX0VSUk9SIiwiU1RBVEVfTE9BRElORyIsIlNUQVRFX1NUQUxMRUQiLCJTVEFURV9BRF9MT0FESU5HIiwiU1RBVEVfQURfTE9BREVEIiwiU1RBVEVfQURfUExBWUlORyIsIlNUQVRFX0FEX1BBVVNFRCIsIlNUQVRFX0FEX0NPTVBMRVRFIiwiU1RBVEVfQURfRVJST1IiLCJQTEFZRVJfQURfQ0xJQ0siLCJQUk9WSURFUl9IVE1MNSIsIlBST1ZJREVSX1dFQlJUQyIsIlBST1ZJREVSX0RBU0giLCJQUk9WSURFUl9ITFMiLCJDT05URU5UX0NPTVBMRVRFIiwiQ09OVEVOVF9TRUVLIiwiQ09OVEVOVF9CVUZGRVJfRlVMTCIsIkRJU1BMQVlfQ0xJQ0siLCJDT05URU5UX0xPQURFRCIsIlBMQVlMSVNUX0NIQU5HRUQiLCJDT05URU5UX1NFRUtFRCIsIk5FVFdPUktfVU5TVEFCTEVEIiwiREFTSF9QUkVQQVJFRCIsIkRBU0hfREVTVFJPWUVEIiwiUExBWUVSX1NUQVRFIiwiUExBWUVSX0NPTVBMRVRFIiwiUExBWUVSX1BBVVNFIiwiUExBWUVSX1BMQVkiLCJQTEFZRVJfQ0xJQ0tFRCIsIlBMQVlFUl9SRVNJWkVEIiwiUExBWUVSX0xPQURJTkciLCJQTEFZRVJfRlVMTFNDUkVFTl9SRVFVRVNUIiwiUExBWUVSX0ZVTExTQ1JFRU5fQ0hBTkdFRCIsIlBMQVlFUl9XQVJOSU5HIiwiQURfQ0hBTkdFRCIsIkFEX1RJTUUiLCJDT05URU5UX0JVRkZFUiIsIkNPTlRFTlRfUkFURV9DSEFOR0UiLCJDT05URU5UX1ZPTFVNRSIsIkNPTlRFTlRfTVVURSIsIkNPTlRFTlRfTUVUQSIsIkNPTlRFTlRfU09VUkNFX0NIQU5HRUQiLCJDT05URU5UX0xFVkVMX0NIQU5HRUQiLCJDT05URU5UX0RVUkFUSU9OX0NIQU5HRUQiLCJQTEFZQkFDS19SQVRFX0NIQU5HRUQiLCJPTUVfUDJQX01PREUiLCJBRF9DTElFTlRfR09PR0xFSU1BIiwiQURfQ0xJRU5UX1ZBU1QiLCJJTklUX1JUTVBfU0VUVVBfRVJST1IiLCJJTklUX0RBU0hfVU5TVVBQT1JUIiwiSU5JVF9BRFNfRVJST1IiLCJJTklUX0RBU0hfTk9URk9VTkQiLCJJTklUX0hMU0pTX05PVEZPVU5EIiwiUExBWUVSX1VOS05XT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ORVRXT1JLX0VSUk9SIiwiUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SIiwiUExBWUVSX0ZJTEVfRVJST1IiLCJQTEFZRVJfQkFEX1JFUVVFU1RfRVJST1IiLCJQTEFZRVJfQVVUSF9GQUlMRURfRVJST1IiLCJQTEFZRVJfTk9UX0FDQ0VQVEFCTEVfRVJST1IiLCJQTEFZRVJfV0VCUlRDX1dTX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19TRVRfUkVNT1RFX0RFU0NfRVJST1IiLCJQTEFZRVJfV0VCUlRDX0NSRUFURV9BTlNXRVJfRVJST1IiLCJQTEFZRVJfV0VCUlRDX05FVFdPUktfU0xPVyIsIlBMQVlFUl9XRUJSVENfVU5FWFBFQ1RFRF9ESVNDT05ORUNUIiwiV0FSTl9NU0dfTVVURURQTEFZIiwiVUlfSUNPTlMiLCJ2b2x1bWVfbXV0ZSIsIm9wX3dhcm5pbmciLCJicm93c2VySW5mbyIsIlNXRlBhdGgiLCJyb290SWQiLCJnZXRBdHRyaWJ1dGUiLCIkY29udGFpbmVyIiwidmlkZW9FbGVtZW50IiwiY3JlYXRlSHRtbFZpZGVvIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kIiwiY3JlYXRlRmxhc2hWaWRlbyIsImJ1ZmZlclRpbWUiLCJidWZmZXJUaW1lTWF4IiwibW92aWUiLCJmbGFzaHZhcnMiLCJhbGxvd3NjcmlwdGFjY2VzcyIsImFsbG93ZnVsbHNjcmVlbiIsIm1lbnUiLCJxdWFsIiwiYmdjb2xvciIsIndtb2RlIiwiYnJvd3Nlck1ham9yVmVyc2lvbiIsImFwcGVuZENoaWxkIiwiY3JlYXRlQWRDb250YWluZXIiLCJhZENvbnRhaW5lciIsInJlbW92ZUNoaWxkIiwiY3VycmVudFBsYXlsaXN0SXRlbSIsImN1cnJlbnRJbmRleCIsInN1cHBvcnRDaGVja2VyIiwibWFrZVByZXR0eVNvdXJjZSIsInNvdXJjZV8iLCJob3N0IiwiYXBwbGljYXRpb24iLCJzdHJlYW0iLCJtaW1ldHlwZVJlZ0V4IiwidGVzdCIsInJlcGxhY2UiLCJsb3dMYXRlbmN5IiwicHJldHRpZWRQbGF5bGlzdCIsInRpdGxlIiwibGV2ZWxzIiwicHJldHR5U291cmNlIiwiZGVmYXVsdFNvdXJjZSIsInRvU3RyaW5nIiwiZXh0cmFjdE9ubHlPbmVQcm90b2NvbCIsImhpZ2hQcmlvcml0eVR5cGUiLCJjb25jYXQiLCJhZFRhZ1VybCIsIkNvbnRyb2xsZXIiLCJzdXBwb3J0Q2hhY2tlciIsInJlZ2lzdGVQcm92aWRlciIsIlByb3ZpZGVyTG9hZGVyIiwiaHRtbDUiLCJFcnJvciIsIndlYnJ0YyIsImRhc2giLCJydG1wIiwic3VwcG9ydGVkUHJvdmlkZXJOYW1lcyIsIlByb21pc2UiLCJyZWplY3QiLCJmaW5kQnlOYW1lIiwiZ2V0UHJvdmlkZXJCeVNvdXJjZSIsInN1cHBvcnRlZFByb3ZpZGVyTmFtZSIsImlzU2FtZVByb3ZpZGVyIiwiY3VycmVudFNvdXJjZSIsIm5ld1NvdXJjZSIsImV4dHJhY3RWaWRlb0VsZW1lbnQiLCJlbGVtZW50T3JNc2UiLCJpc0VsZW1lbnQiLCJnZXRWaWRlb0VsZW1lbnQiLCJtZWRpYSIsInNlcGFyYXRlTGl2ZSIsIm1zZSIsImlzRHluYW1pYyIsImVycm9yVHJpZ2dlciIsInNldFN0YXRlIiwicGlja0N1cnJlbnRTb3VyY2UiLCJfX3dlYnBhY2tfcHVibGljX3BhdGhfXyIsInBsYXllckxpc3QiLCJjaGVja0FuZEdldENvbnRhaW5lckVsZW1lbnQiLCJjb250YWluZXJFbGVtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJub2RlVHlwZSIsImNyZWF0ZSIsInBsYXllckluc3RhbmNlIiwiZ2V0UGxheWVyQnlDb250YWluZXJJZCIsImNvbnRhaW5lcklkIiwiZ2V0UGxheWVyQnlJbmRleCIsInBsYXllcklkIiwiZ2VuZXJhdGVXZWJydGNVcmxzIiwiZGVidWciLCJpc0RlYnVnTW9kZSIsImdldEJyb3dzZXJMYW5ndWFnZSIsIm5hdiIsImJyb3dzZXJMYW5ndWFnZVByb3BlcnR5S2V5cyIsImxhbmd1YWdlcyIsImFuYWxVc2VyQWdlbnQiLCJ1bmtub3duIiwic2NyZWVuU2l6ZSIsInNjcmVlbiIsIndpZHRoIiwiaGVpZ2h0IiwiblZlciIsImFwcFZlcnNpb24iLCJuQWd0IiwidXNlckFnZW50IiwiYXBwTmFtZSIsIm1ham9yVmVyc2lvbiIsInBhcnNlSW50IiwiaXNXZWJ2aWV3IiwibmFtZU9mZnNldCIsInZlck9mZnNldCIsIml4Iiwic3Vic3RyaW5nIiwibGFzdEluZGV4T2YiLCJ0b1VwcGVyQ2FzZSIsIm1vYmlsZSIsImNvb2tpZUVuYWJsZWQiLCJjb29raWUiLCJjbGllbnRTdHJpbmdzIiwicyIsInIiLCJjcyIsIm9zVmVyc2lvbiIsImV4ZWMiLCJicm93c2VyVmVyc2lvbiIsInVhIiwiY29va2llcyIsImF1dG9LZXl3b3JkIiwiZGlyZWN0aW9uU2V0dGluZyIsImFsaWduU2V0dGluZyIsImZpbmREaXJlY3Rpb25TZXR0aW5nIiwiZGlyIiwiZmluZEFsaWduU2V0dGluZyIsImFsaWduIiwiZXh0ZW5kIiwiY29iaiIsInAiLCJpc0lFOCIsImJhc2VPYmoiLCJlbnVtZXJhYmxlIiwiaGFzQmVlblJlc2V0IiwiX2lkIiwiX3BhdXNlT25FeGl0IiwiX3N0YXJ0VGltZSIsIl9lbmRUaW1lIiwiX3RleHQiLCJfcmVnaW9uIiwiX3ZlcnRpY2FsIiwiX3NuYXBUb0xpbmVzIiwiX2xpbmUiLCJfbGluZUFsaWduIiwiX3Bvc2l0aW9uIiwiX3Bvc2l0aW9uQWxpZ24iLCJfc2l6ZSIsIl9hbGlnbiIsImRlZmluZVByb3BlcnR5IiwiZ2V0Iiwic2V0IiwiVHlwZUVycm9yIiwic2V0dGluZyIsIlN5bnRheEVycm9yIiwiZGlzcGxheVN0YXRlIiwiZ2V0Q3VlQXNIVE1MIiwiY29udmVydEN1ZVRvRE9NVHJlZSIsIkxhJCIsInNlbGVjdG9yT3JFbGVtZW50IiwicmV0dXJuTm9kZSIsIiRlbGVtZW50Iiwic2VsZWN0b3IiLCJub2RlTGlzdCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJldmVyeSIsInNob3ciLCJzdHlsZSIsImRpc3BsYXkiLCJoaWRlIiwiYWRkQ2xhc3MiLCJjbGFzc0xpc3QiLCJhZGQiLCJjbGFzc05hbWVzIiwiY2xhc3NOYW1lIiwiYWZ0ZXIiLCJodG1sU3RyaW5nIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiYmVmb3JlIiwiY2hpbGRyZW4iLCJjb250YWlucyIsImVsQ2hpbGQiLCJpbm5lckhUTUwiLCJmaW5kIiwiY3NzIiwiZWxlbWVudCIsInJlbW92ZUNsYXNzIiwiUmVnRXhwIiwicmVtb3ZlQXR0cmlidXRlIiwiYXR0ck5hbWUiLCJ0ZXh0Q29udGVudCIsImh0bWwiLCJoYXNDbGFzcyIsImlzIiwiJHRhcmdldEVsZW1lbnQiLCJvZmZzZXQiLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwidG9wIiwic2Nyb2xsVG9wIiwibGVmdCIsInNjcm9sbExlZnQiLCJjbGllbnRXaWR0aCIsImNsaWVudEhlaWdodCIsImF0dHIiLCJyZXBsYWNlV2l0aCIsInBhcmVudEVsZW1lbnQiLCJoYXNDaGlsZE5vZGVzIiwiZmlyc3RDaGlsZCIsImNsb3Nlc3QiLCJzZWxlY3RvclN0cmluZyIsImVsIiwibWF0Y2hlcyIsInBhcmVudE5vZGUiLCJjbG9zZXN0RWxlbWVudCIsInRyaW0iLCJuYXR1cmFsSG1zIiwiaG1zVG9TZWNvbmQiLCJzdHJpbmciLCJleHRyYWN0RXh0ZW5zaW9uIiwicGF0aCIsImdldEF6dXJlRmlsZUZvcm1hdCIsImV4dGVuc2lvbiIsImF6dXJlZEZvcm1hdCIsInNlY29uZCIsInNlY051bSIsImhvdXJzIiwiZmxvb3IiLCJtaW51dGVzIiwic2Vjb25kcyIsInN0ciIsImZyYW1lUmF0ZSIsImFyciIsImFyckxlbmd0aCIsInNlYyIsInNlY0luZGV4IiwibiIsInNlbGYiLCJnbG9iYWwiLCJvIiwiU3ltYm9sIiwidSIsImMiLCJoYXNPd25Qcm9wZXJ0eSIsInQiLCJhIiwiZiIsImgiLCJfd3JhcHBlZCIsImV4cG9ydHMiLCJtb2R1bGUiLCJWRVJTSU9OIiwidiIsInkiLCJkIiwiaXRlcmF0ZWUiLCJpZGVudGl0eSIsImlzRnVuY3Rpb24iLCJpc09iamVjdCIsIm1hdGNoZXIiLCJwcm9wZXJ0eSIsImciLCJtYXgiLCJtIiwiYiIsIngiLCJwb3ciLCJBIiwidyIsImVhY2giLCJjb2xsZWN0IiwiTyIsInJlZHVjZSIsImZvbGRsIiwiaW5qZWN0IiwicmVkdWNlUmlnaHQiLCJmb2xkciIsImRldGVjdCIsImZpbmRLZXkiLCJzZWxlY3QiLCJuZWdhdGUiLCJzb21lIiwiYW55IiwiaW5jbHVkZXMiLCJpbmNsdWRlIiwidmFsdWVzIiwiaW52b2tlIiwicGx1Y2siLCJ3aGVyZSIsIm1pbiIsInNodWZmbGUiLCJzYW1wbGUiLCJyYW5kb20iLCJjbG9uZSIsInNvcnRCeSIsImNyaXRlcmlhIiwiZ3JvdXBCeSIsImluZGV4QnkiLCJjb3VudEJ5IiwiUyIsInRvQXJyYXkiLCJpc1N0cmluZyIsIm1hdGNoIiwic2l6ZSIsInBhcnRpdGlvbiIsImZpcnN0IiwiaGVhZCIsInRha2UiLCJpbml0aWFsIiwibGFzdCIsInJlc3QiLCJ0YWlsIiwiZHJvcCIsImNvbXBhY3QiLCJCb29sZWFuIiwiTSIsImlzQXJndW1lbnRzIiwiZmxhdHRlbiIsIndpdGhvdXQiLCJkaWZmZXJlbmNlIiwidW5pcSIsInVuaXF1ZSIsImlzQm9vbGVhbiIsInVuaW9uIiwiaW50ZXJzZWN0aW9uIiwidW56aXAiLCJ6aXAiLCJGIiwiZmluZExhc3RJbmRleCIsInNvcnRlZEluZGV4IiwiRSIsInJhbmdlIiwiY2VpbCIsImNodW5rIiwiTiIsImJpbmQiLCJwYXJ0aWFsIiwicGxhY2Vob2xkZXIiLCJiaW5kQWxsIiwibWVtb2l6ZSIsImNhY2hlIiwiZGVsYXkiLCJkZWZlciIsInRocm90dGxlIiwibGVhZGluZyIsIm5vdyIsImNsZWFyVGltZW91dCIsInRyYWlsaW5nIiwiY2FuY2VsIiwiZGVib3VuY2UiLCJ3cmFwIiwiY29tcG9zZSIsInJlc3RBcmd1bWVudHMiLCJJIiwicHJvcGVydHlJc0VudW1lcmFibGUiLCJUIiwiQiIsImNvbnN0cnVjdG9yIiwiYWxsS2V5cyIsIm1hcE9iamVjdCIsInBhaXJzIiwiaW52ZXJ0IiwiZnVuY3Rpb25zIiwibWV0aG9kcyIsIlIiLCJleHRlbmRPd24iLCJhc3NpZ24iLCJxIiwiSyIsInoiLCJvbWl0IiwiU3RyaW5nIiwiZGVmYXVsdHMiLCJ0YXAiLCJpc01hdGNoIiwidmFsdWVPZiIsInBvcCIsImlzRXF1YWwiLCJpc0VtcHR5IiwiRCIsImNoaWxkTm9kZXMiLCJJbnQ4QXJyYXkiLCJpc0Zpbml0ZSIsImlzU3ltYm9sIiwiaXNOdWxsIiwiaXNVbmRlZmluZWQiLCJoYXMiLCJub0NvbmZsaWN0IiwiY29uc3RhbnQiLCJub29wIiwicHJvcGVydHlPZiIsInRpbWVzIiwiRGF0ZSIsImdldFRpbWUiLCJMIiwiUCIsIlciLCJlc2NhcGUiLCJ1bmVzY2FwZSIsIkMiLCJ1bmlxdWVJZCIsInRlbXBsYXRlU2V0dGluZ3MiLCJldmFsdWF0ZSIsImludGVycG9sYXRlIiwiSiIsIlUiLCJWIiwiJCIsInRlbXBsYXRlIiwidmFyaWFibGUiLCJGdW5jdGlvbiIsImNoYWluIiwiX2NoYWluIiwiRyIsIm1peGluIiwidG9KU09OIiwiZGVmaW5lIiwiaXNSdG1wIiwiaXNXZWJSVEMiLCJpc0hscyIsImlzRGFzaCIsImdldFNjcmlwdFBhdGgiLCJzY3JpcHROYW1lIiwic2NyaXB0cyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwic3JjIiwiX19WRVJTSU9OX18iXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7UUFDQTtRQUNBLFFBQVEsb0JBQW9CO1FBQzVCO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOzs7O1FBSUE7UUFDQTtRQUNBLHlDQUF5QyxzNEJBQXM0QjtRQUMvNkI7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFF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ckg7QUFFSDtBQUNKLENBTE07QUFNQSxJQUFNNmxCLDBCQUFTLFNBQVRBLE1BQVMsQ0FBVTdsQixJQUFWLEVBQWdCQyxJQUFoQixFQUFzQjtBQUN4QyxRQUFHRCxJQUFILEVBQVE7QUFDSixlQUFTQyxTQUFTLEtBQVQsSUFBbUJBLFNBQVMsTUFBNUIsSUFBc0NBLFNBQVMsc0JBQS9DLElBQXlFLCtCQUFpQkQsSUFBakIsS0FBMEIsS0FBNUc7QUFFSDtBQUNKLENBTE0sQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQlA7Ozs7QUFJTyxJQUFNOGxCLHdDQUFnQixTQUFoQkEsYUFBZ0IsQ0FBU0MsVUFBVCxFQUFxQjtBQUM5QyxRQUFNQyxVQUFVbm1CLFNBQVNvbUIsb0JBQVQsQ0FBOEIsUUFBOUIsQ0FBaEI7QUFDQSxTQUFLLElBQUl0MUIsSUFBSSxDQUFiLEVBQWdCQSxJQUFJcTFCLFFBQVFwMUIsTUFBNUIsRUFBb0NELEdBQXBDLEVBQXlDO0FBQ3JDLFlBQU11MUIsTUFBTUYsUUFBUXIxQixDQUFSLEVBQVd1MUIsR0FBdkI7QUFDQSxZQUFJQSxHQUFKLEVBQVM7QUFDTCxnQkFBTXoyQixRQUFReTJCLElBQUk5VCxXQUFKLENBQWdCLE1BQU0yVCxVQUF0QixDQUFkO0FBQ0EsZ0JBQUl0MkIsU0FBUyxDQUFiLEVBQWdCO0FBQ1osdUJBQU95MkIsSUFBSWhnQixNQUFKLENBQVcsQ0FBWCxFQUFjelcsUUFBUSxDQUF0QixDQUFQO0FBQ0g7QUFDSjtBQUNKO0FBQ0QsV0FBTyxFQUFQO0FBQ0gsQ0FaTSxDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0pQOzs7QUFHTyxJQUFNaEIsNEJBQVUwM0IsNkJBQWhCLEMiLCJmaWxlIjoib3ZlbnBsYXllci5zZGsuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcblxuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHR9O1xuXG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcIm92ZW5wbGF5ZXIuc2RrXCI6IDBcbiBcdH07XG5cblxuXG4gXHQvLyBzY3JpcHQgcGF0aCBmdW5jdGlvblxuIFx0ZnVuY3Rpb24ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCkge1xuIFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArICh7XCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjJlYzE5M2FjXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjJlYzE5M2FjXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjdhZmQ2OGNmXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjdhZmQ2OGNmXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlclwiOlwib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDVcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDVcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuV2ViUlRDUHJvdmlkZXJcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuV2ViUlRDUHJvdmlkZXJcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuUnRtcFByb3ZpZGVyXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLlJ0bXBQcm92aWRlclwiLFwic21pcGFyc2VyXCI6XCJzbWlwYXJzZXJcIixcInZlbmRvcnN+ZG93bmxvYWRlclwiOlwidmVuZG9yc35kb3dubG9hZGVyXCIsXCJkb3dubG9hZGVyXCI6XCJkb3dubG9hZGVyXCIsXCJ2dHRwYXJzZXJcIjpcInZ0dHBhcnNlclwifVtjaHVua0lkXXx8Y2h1bmtJZCkgKyBcIi5qc1wiXG4gXHR9XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuIFx0Ly8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuIFx0Ly8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSBmdW5jdGlvbiByZXF1aXJlRW5zdXJlKGNodW5rSWQpIHtcbiBcdFx0dmFyIHByb21pc2VzID0gW107XG5cblxuIFx0XHQvLyBKU09OUCBjaHVuayBsb2FkaW5nIGZvciBqYXZhc2NyaXB0XG5cbiBcdFx0dmFyIGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhICE9PSAwKSB7IC8vIDAgbWVhbnMgXCJhbHJlYWR5IGluc3RhbGxlZFwiLlxuXG4gXHRcdFx0Ly8gYSBQcm9taXNlIG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEpIHtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdKTtcbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Ly8gc2V0dXAgUHJvbWlzZSBpbiBjaHVuayBjYWNoZVxuIFx0XHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gW3Jlc29sdmUsIHJlamVjdF07XG4gXHRcdFx0XHR9KTtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdID0gcHJvbWlzZSk7XG5cbiBcdFx0XHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcbiBcdFx0XHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiBcdFx0XHRcdHZhciBvblNjcmlwdENvbXBsZXRlO1xuXG4gXHRcdFx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG4gXHRcdFx0XHRzY3JpcHQudGltZW91dCA9IDEyMDtcbiBcdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG4gXHRcdFx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHNjcmlwdC5zcmMgPSBqc29ucFNjcmlwdFNyYyhjaHVua0lkKTtcblxuIFx0XHRcdFx0Ly8gY3JlYXRlIGVycm9yIGJlZm9yZSBzdGFjayB1bndvdW5kIHRvIGdldCB1c2VmdWwgc3RhY2t0cmFjZSBsYXRlclxuIFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCk7XG4gXHRcdFx0XHRvblNjcmlwdENvbXBsZXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gXHRcdFx0XHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cbiBcdFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gbnVsbDtcbiBcdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuIFx0XHRcdFx0XHR2YXIgY2h1bmsgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdFx0XHRcdGlmKGNodW5rICE9PSAwKSB7XG4gXHRcdFx0XHRcdFx0aWYoY2h1bmspIHtcbiBcdFx0XHRcdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG4gXHRcdFx0XHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IubWVzc2FnZSA9ICdMb2FkaW5nIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLm5hbWUgPSAnQ2h1bmtMb2FkRXJyb3InO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnJlcXVlc3QgPSByZWFsU3JjO1xuIFx0XHRcdFx0XHRcdFx0Y2h1bmtbMV0oZXJyb3IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSB1bmRlZmluZWQ7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH07XG4gXHRcdFx0XHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiBcdFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSh7IHR5cGU6ICd0aW1lb3V0JywgdGFyZ2V0OiBzY3JpcHQgfSk7XG4gXHRcdFx0XHR9LCAxMjAwMDApO1xuIFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gb25TY3JpcHRDb21wbGV0ZTtcbiBcdFx0XHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0cmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gb24gZXJyb3IgZnVuY3Rpb24gZm9yIGFzeW5jIGxvYWRpbmdcbiBcdF9fd2VicGFja19yZXF1aXJlX18ub2UgPSBmdW5jdGlvbihlcnIpIHsgY29uc29sZS5lcnJvcihlcnIpOyB0aHJvdyBlcnI7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvanMvb3ZlbnBsYXllci5zZGsuanNcIik7XG4iLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHRpZiAoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcblx0XHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XG5cdH1cblx0cmV0dXJuIG1vZHVsZTtcbn07XG4iLCJpbXBvcnQgQ2FwdGlvbk1hbmFnZXIgZnJvbSBcImFwaS9jYXB0aW9uL01hbmFnZXJcIjtcclxuaW1wb3J0IENvbmZpZ3VyYXRvciBmcm9tIFwiYXBpL0NvbmZpZ3VyYXRvclwiO1xyXG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJhcGkvRXZlbnRFbWl0dGVyXCI7XHJcbmltcG9ydCBMYXp5Q29tbWFuZEV4ZWN1dG9yIGZyb20gXCJhcGkvTGF6eUNvbW1hbmRFeGVjdXRvclwiO1xyXG5pbXBvcnQgTWVkaWFNYW5hZ2VyIGZyb20gXCJhcGkvbWVkaWEvTWFuYWdlclwiO1xyXG5pbXBvcnQgUGxheWxpc3RNYW5hZ2VyIGZyb20gXCJhcGkvcGxheWxpc3QvTWFuYWdlclwiO1xyXG5pbXBvcnQgUHJvdmlkZXJDb250cm9sbGVyIGZyb20gXCJhcGkvcHJvdmlkZXIvQ29udHJvbGxlclwiO1xyXG5pbXBvcnQge1JFQURZLCBFUlJPUlMsIEVSUk9SLCBDT05URU5UX1RJTUVfTU9ERV9DSEFOR0VELCBJTklUX1VOS05XT05fRVJST1IsIElOSVRfVU5TVVBQT1JUX0VSUk9SLCBERVNUUk9ZLCBQTEFZRVJfUExBWSwgTkVUV09SS19VTlNUQUJMRUQsIFBMQVlFUl9XRUJSVENfTkVUV09SS19TTE9XLCBQTEFZRVJfV0VCUlRDX1VORVhQRUNURURfRElTQ09OTkVDVCwgUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUixcclxuICAgIFBMQVlFUl9GSUxFX0VSUk9SLCBQUk9WSURFUl9EQVNILCBQUk9WSURFUl9ITFMsIFBST1ZJREVSX1dFQlJUQywgUFJPVklERVJfSFRNTDUsIFBST1ZJREVSX1JUTVAsIEFMTF9QTEFZTElTVF9FTkRFRH0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuaW1wb3J0IHt2ZXJzaW9ufSBmcm9tICd2ZXJzaW9uJztcclxuaW1wb3J0IHtBcGlSdG1wRXhwYW5zaW9ufSBmcm9tICdhcGkvQXBpRXhwYW5zaW9ucyc7XHJcbmltcG9ydCB7YW5hbFVzZXJBZ2VudH0gZnJvbSBcInV0aWxzL2Jyb3dzZXJcIjtcclxuaW1wb3J0IHtwaWNrQ3VycmVudFNvdXJjZX0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xyXG5pbXBvcnQgTEEkIGZyb20gJ3V0aWxzL2xpa2VBJCc7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgVGhpcyBvYmplY3QgY29ubmVjdHMgVUkgdG8gdGhlIHByb3ZpZGVyLlxyXG4gKiBAcGFyYW0gICB7b2JqZWN0fSAgICBjb250YWluZXIgIGRvbSBlbGVtZW50XHJcbiAqXHJcbiAqICovXHJcblxyXG5jb25zdCBBcGkgPSBmdW5jdGlvbihjb250YWluZXIpe1xyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG4gICAgRXZlbnRFbWl0dGVyKHRoYXQpO1xyXG5cclxuXHJcbiAgICBjb25zb2xlLmxvZyhcIltbT3ZlblBsYXllcl1dIHYuXCIrIHZlcnNpb24pO1xyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIGxvYWRlZC5cIik7XHJcblxyXG4gICAgbGV0IHBsYXlsaXN0TWFuYWdlciA9IFBsYXlsaXN0TWFuYWdlcih0aGF0KTtcclxuICAgIGxldCBwcm92aWRlckNvbnRyb2xsZXIgPSBQcm92aWRlckNvbnRyb2xsZXIoKTtcclxuICAgIGxldCB1c2VyQWdlbnRPYmplY3QgPSBhbmFsVXNlckFnZW50KCk7XHJcbiAgICBsZXQgbWVkaWFNYW5hZ2VyID0gTWVkaWFNYW5hZ2VyKGNvbnRhaW5lciwgdXNlckFnZW50T2JqZWN0KTtcclxuICAgIGxldCBjdXJyZW50UHJvdmlkZXIgPSBcIlwiO1xyXG4gICAgbGV0IHBsYXllckNvbmZpZyA9IFwiXCI7XHJcbiAgICBsZXQgbGF6eVF1ZXVlID0gXCJcIjtcclxuICAgIGxldCBjYXB0aW9uTWFuYWdlciA9IFwiXCI7XHJcblxyXG4gICAgbGV0IHdlYnJ0Y1JldHJ5ID0gZmFsc2U7XHJcbiAgICBsZXQgV0VCUlRDX1JFVFJZX0NPVU5UID0gMztcclxuICAgIGxldCB3ZWJydGNSZXRyeUNvdW50ID0gV0VCUlRDX1JFVFJZX0NPVU5UO1xyXG4gICAgbGV0IHdlYnJ0Y1JldHJ5SW50ZXJ2YWwgPSAxMDAwO1xyXG4gICAgbGV0IHdlYnJ0Y1JldHJ5VGltZXIgPSBudWxsO1xyXG5cclxuXHJcbiAgICBjb25zdCBydW5OZXh0UGxheWxpc3QgPSBmdW5jdGlvbihpbmRleCl7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwicnVuTmV4dFBsYXlsaXN0XCIpO1xyXG4gICAgICAgIGxldCBuZXh0UGxheWxpc3RJbmRleCA9IGluZGV4OyAvLyB8fCBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFBsYXlsaXN0SW5kZXgoKSArIDE7XHJcbiAgICAgICAgbGV0IHBsYXlsaXN0ID0gcGxheWxpc3RNYW5hZ2VyLmdldFBsYXlsaXN0KCk7XHJcbiAgICAgICAgbGV0IGhhc05leHRQbGF5bGlzdCA9IHBsYXlsaXN0W25leHRQbGF5bGlzdEluZGV4XT8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgIC8vaW5pdCBzb3VyY2UgaW5kZXhcclxuICAgICAgICBwbGF5ZXJDb25maWcuc2V0U291cmNlSW5kZXgoMCk7XHJcblxyXG4gICAgICAgIC8vc2V0IEdvbGJhbCBWb2x1bWUgaW5mb1xyXG4gICAgICAgIHBsYXllckNvbmZpZy5zZXRWb2x1bWUoY3VycmVudFByb3ZpZGVyLmdldFZvbHVtZSgpKTtcclxuXHJcbiAgICAgICAgaWYoaGFzTmV4dFBsYXlsaXN0KXtcclxuICAgICAgICAgICAgLy90aGF0LnBhdXNlKCk7XHJcbiAgICAgICAgICAgIGxhenlRdWV1ZSA9IExhenlDb21tYW5kRXhlY3V0b3IodGhhdCwgWydwbGF5Jywnc2VlaycsJ3N0b3AnXSk7XHJcbiAgICAgICAgICAgIHBsYXlsaXN0TWFuYWdlci5zZXRDdXJyZW50UGxheWxpc3QobmV4dFBsYXlsaXN0SW5kZXgpO1xyXG4gICAgICAgICAgICBpbml0UHJvdmlkZXIoKTtcclxuXHJcblxyXG4gICAgICAgICAgICBpZighcGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpe1xyXG4gICAgICAgICAgICAgICAgLy9Bbnl3YXkgbmV4dHBsYXlsaXN0IHJ1bnMgYXV0b1N0YXJ0IS5cclxuICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIC8vQWxsIFBsYXlsaXN0IEVuZGVkLlxyXG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoQUxMX1BMQVlMSVNUX0VOREVELCBudWxsKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgY29uc3QgaW5pdFByb3ZpZGVyID0gZnVuY3Rpb24obGFzdFBsYXlQb3NpdGlvbil7XHJcbiAgICAgICAgY29uc3QgcGlja1F1YWxpdHlGcm9tU291cmNlID0gKHNvdXJjZXMpID0+e1xyXG4gICAgICAgICAgICB2YXIgcXVhbGl0eSA9IDA7XHJcbiAgICAgICAgICAgIGlmIChzb3VyY2VzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc291cmNlc1tpXS5kZWZhdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1YWxpdHkgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyQ29uZmlnLmdldFNvdXJjZUluZGV4KCkgPT09IGkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvKmlmIChwbGF5ZXJDb25maWcuZ2V0U291cmNlTGFiZWwoKSAmJiBzb3VyY2VzW2ldLmxhYmVsID09PSBwbGF5ZXJDb25maWcuZ2V0U291cmNlTGFiZWwoKSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSovXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHF1YWxpdHk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHByb3ZpZGVyQ29udHJvbGxlci5sb2FkUHJvdmlkZXJzKHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50UGxheUxpc3QoKSkudGhlbihQcm92aWRlcnMgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYoUHJvdmlkZXJzLmxlbmd0aCA8IDEpe1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgRVJST1JTLmNvZGVzW0lOSVRfVU5TVVBQT1JUX0VSUk9SXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoY3VycmVudFByb3ZpZGVyKXtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGNhcHRpb25NYW5hZ2VyKXtcclxuICAgICAgICAgICAgICAgIGNhcHRpb25NYW5hZ2VyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIGNhcHRpb25NYW5hZ2VyID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXB0aW9uTWFuYWdlciA9IENhcHRpb25NYW5hZ2VyKHRoYXQsIHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50UGxheWxpc3RJbmRleCgpKTtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaW5pdCgpIGNhcHRpb25zXCIpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRTb3VyY2VJbmRleCA9IHBpY2tDdXJyZW50U291cmNlKHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50U291cmNlcygpLCBwbGF5ZXJDb25maWcpO1xyXG4gICAgICAgICAgICBsZXQgcHJvdmlkZXJOYW1lID0gUHJvdmlkZXJzW2N1cnJlbnRTb3VyY2VJbmRleF1bXCJuYW1lXCJdO1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpbml0KCkgcHJvdmlkZXJcIiwgcHJvdmlkZXJOYW1lKTtcclxuICAgICAgICAgICAgLy9Jbml0IFByb3ZpZGVyLlxyXG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIgPSAgUHJvdmlkZXJzW2N1cnJlbnRTb3VyY2VJbmRleF0ucHJvdmlkZXIoXHJcbiAgICAgICAgICAgICAgICBtZWRpYU1hbmFnZXIuY3JlYXRlTWVkaWEocHJvdmlkZXJOYW1lLCBwbGF5ZXJDb25maWcpLFxyXG4gICAgICAgICAgICAgICAgcGxheWVyQ29uZmlnLFxyXG4gICAgICAgICAgICAgICAgcGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRBZFRhZygpXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBpZihwcm92aWRlck5hbWUgPT09IFBST1ZJREVSX1JUTVApe1xyXG4gICAgICAgICAgICAgICAgLy9JZiBwcm92aWRlciB0eXBlIGlzIFJUTVAsIHdlIGFjY2VwdHMgUnRtcEV4cGFuc2lvbi5cclxuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhhdCwgQXBpUnRtcEV4cGFuc2lvbihjdXJyZW50UHJvdmlkZXIpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9UaGlzIHBhc3NlcyB0aGUgZXZlbnQgY3JlYXRlZCBieSB0aGUgUHJvdmlkZXIgdG8gQVBJLlxyXG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIub24oXCJhbGxcIiwgZnVuY3Rpb24obmFtZSwgZGF0YSl7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoIG5hbWUgPT09IEVSUk9SKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIENocm9tZSA+PTgwIG9uIEFuZHJvaWQgbWlzc2VzIGgyNDYgaW4gU0RQIHdoZW4gZmlyc3QgdGltZSBhZnRlciB3ZWIgcGFnZSBsb2FkZWQuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU28gd2FpdCB1bnRpbCBicm93c2VyIGdldCBoMjY0IGNhcGFiaWxpdGllcyBhbmQgY3JlYXRlIGFuc3dlciBTRFAuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJBZ2VudE9iamVjdC5vcyA9PT0gJ0FuZHJvaWQnICYmIHVzZXJBZ2VudE9iamVjdC5icm93c2VyID09PSAnQ2hyb21lJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5jb2RlICYmIGRhdGEuY29kZSA9PT0gUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldEN1cnJlbnRTb3VyY2UodGhhdC5nZXRDdXJyZW50U291cmNlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgd2VicnRjUmV0cnlJbnRlcnZhbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyQ29uZmlnLmdldENvbmZpZygpLmF1dG9GYWxsYmFjayAmJiBwbGF5ZXJDb25maWcuZ2V0U291cmNlSW5kZXgoKSArIDEgPCB0aGF0LmdldFNvdXJjZXMoKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzIHNlcXVlbnRpYWwgaGFzIGF2YWlsYWJsZSBzb3VyY2UuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGF1c2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRDdXJyZW50U291cmNlKHBsYXllckNvbmZpZy5nZXRTb3VyY2VJbmRleCgpICsgMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKG5hbWUgPT09IFwiY29tcGxldGVcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuTmV4dFBsYXlsaXN0KHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50UGxheWxpc3RJbmRleCgpICsgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKG5hbWUsIGRhdGEpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSkudGhlbigoKT0+e1xyXG5cclxuICAgICAgICAgICAgLy9wcm92aWRlcidzIHByZWxvYWQoKSBoYXZlIHRvIG1hZGUgUHJvbWlzZS4gQ3V6IGl0IG92ZXJjb21lcyAnZmxhc2ggbG9hZGluZyB0aW1pbmcgcHJvYmxlbScuXHJcbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5wcmVsb2FkKHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50U291cmNlcygpLCBsYXN0UGxheVBvc2l0aW9uKS50aGVuKGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFJFQURZKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsYXp5UXVldWUuZmx1c2goKTtcclxuICAgICAgICAgICAgICAgIC8vVGhpcyBpcyBubyByZWFzb24gdG8gZXhpc3QgYW55bW9yZS5cclxuICAgICAgICAgICAgICAgIGxhenlRdWV1ZS5kZXN0cm95KCk7XHJcblxyXG4gICAgICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgIGxhenlRdWV1ZS5vZmYoKTtcclxuICAgICAgICAgICAgICAgIGlmKGVycm9yICYmIGVycm9yLmNvZGUgJiYgRVJST1JTLmNvZGVzW2Vycm9yLmNvZGVdKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoRVJST1IsIEVSUk9SUy5jb2Rlc1tlcnJvci5jb2RlXSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tJTklUX1VOS05XT05fRVJST1JdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihFUlJPUiwgdGVtcEVycm9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgIC8vSU5JVCBFUlJPUlxyXG4gICAgICAgICAgICBpZihlcnJvciAmJiBlcnJvci5jb2RlICYmIEVSUk9SUy5jb2Rlc1tlcnJvci5jb2RlXSl7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoRVJST1IsIEVSUk9SUy5jb2Rlc1tlcnJvci5jb2RlXSk7XHJcbiAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbSU5JVF9VTktOV09OX0VSUk9SXTtcclxuICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKEVSUk9SLCB0ZW1wRXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL3h4eCA6IElmIHlvdSBpbml0IGVtcHR5IHNvdXJjZXMuIChJIHRoaW5rIHRoaXMgaXMgc3RyYW5nZSBjYXNlLilcclxuICAgICAgICAgICAgLy9UaGlzIHdvcmtzIGZvciB0aGlzIGNhc2UuXHJcbiAgICAgICAgICAgIC8vcGxheWVyID0gT3ZlblBsYXllci5jcmVhdGUoXCJlbElkXCIsIHt9KTtcclxuICAgICAgICAgICAgLy9wbGF5ZXIubG9hZChzb3J1Y2VzKTtcclxuICAgICAgICAgICAgbGF6eVF1ZXVlLm9mZigpO1xyXG4gICAgICAgICAgICAvL2xhenlRdWV1ZS5yZW1vdmVBbmRFeGN1dGVPbmNlKFwibG9hZFwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQVBJIOy0iOq4sO2ZlCDtlajsiJhcclxuICAgICAqIGluaXRcclxuICAgICAqIEBwYXJhbSAgICAgIHtvYmplY3R9IG9wdGlvbnMgcGxheWVyIGluaXRpYWwgb3B0aW9uIHZhbHVlLlxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqKi9cclxuICAgIHRoYXQuaW5pdCA9IChvcHRpb25zKSA9PntcclxuICAgICAgICAvL0l0IGNvbGxlY3RzIHRoZSBjb21tYW5kcyBhbmQgZXhlY3V0ZXMgdGhlbSBhdCB0aGUgdGltZSB3aGVuIHRoZXkgYXJlIGV4ZWN1dGFibGUuXHJcbiAgICAgICAgbGF6eVF1ZXVlID0gTGF6eUNvbW1hbmRFeGVjdXRvcih0aGF0LCBbXHJcbiAgICAgICAgICAgICdsb2FkJywncGxheScsJ3BhdXNlJywnc2VlaycsJ3N0b3AnLCAnZ2V0RHVyYXRpb24nLCAnZ2V0UG9zaXRpb24nLCAnZ2V0Vm9sdW1lJ1xyXG4gICAgICAgICAgICAsICdnZXRNdXRlJywgJ2dldEJ1ZmZlcicsICdnZXRTdGF0ZScgLCAnZ2V0UXVhbGl0eUxldmVscydcclxuICAgICAgICBdKTtcclxuICAgICAgICBvcHRpb25zLm1lZGlhQ29udGFpbmVyID0gY29udGFpbmVyO1xyXG4gICAgICAgIG9wdGlvbnMuYnJvd3NlciA9IHVzZXJBZ2VudE9iamVjdDtcclxuICAgICAgICBwbGF5ZXJDb25maWcgPSBDb25maWd1cmF0b3Iob3B0aW9ucywgdGhhdCk7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaW5pdCgpXCIpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGluaXQoKSBjb25maWcgOiBcIiwgcGxheWVyQ29uZmlnKTtcclxuXHJcbiAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRDb25maWcoKS53ZWJydGNDb25maWcgJiYgcGxheWVyQ29uZmlnLmdldENvbmZpZygpLndlYnJ0Y0NvbmZpZy5sb2FkaW5nUmV0cnlDb3VudCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIFdFQlJUQ19SRVRSWV9DT1VOVCA9IHBsYXllckNvbmZpZy5nZXRDb25maWcoKS5sb2FkaW5nUmV0cnlDb3VudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vTm90IHdvcmtpbmcgOiBTeW50YXhFcnJvcjogXCJFUlJPUlMuY29kZXNcIiBpcyByZWFkLW9ubHlcclxuICAgICAgICBFUlJPUlMuY29kZXMgPSBwbGF5ZXJDb25maWcuZ2V0U3lzdGVtVGV4dCgpLmFwaS5lcnJvcjtcclxuICAgICAgICAvL0Nvb2xcclxuICAgICAgICAvL0VSUk9SUy5jb2Rlcy5wdXNoKHBsYXllckNvbmZpZy5nZXRTeXN0ZW1UZXh0KCkpO1xyXG5cclxuICAgICAgICBwbGF5bGlzdE1hbmFnZXIuaW5pdFBsYXlsaXN0KHBsYXllckNvbmZpZy5nZXRQbGF5bGlzdCgpLCBwbGF5ZXJDb25maWcpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGluaXQoKSBzb3VyY2VzIDogXCIgLCBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKSk7XHJcblxyXG4gICAgICAgIGluaXRQcm92aWRlcigpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0UHJvdmlkZXJOYW1lID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKGN1cnJlbnRQcm92aWRlcil7XHJcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0TmFtZSgpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0TXNlSW5zdGFuY2UgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoY3VycmVudFByb3ZpZGVyKXtcclxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRNc2UoKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcbiAgICB0aGF0LmdldENvbmZpZyA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRDb25maWcoKVwiLCBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkpO1xyXG4gICAgICAgIHJldHVybiBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRCcm93c2VyID0gKCkgPT4ge1xyXG5cclxuICAgICAgICByZXR1cm4gcGxheWVyQ29uZmlnLmdldEJyb3dzZXIoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFRpbWVjb2RlTW9kZSA9IChpc1Nob3cpID0+e1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldFRpbWVjb2RlTW9kZSgpXCIsIGlzU2hvdyk7XHJcbiAgICAgICAgcGxheWVyQ29uZmlnLnNldFRpbWVjb2RlTW9kZShpc1Nob3cpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuaXNUaW1lY29kZU1vZGUgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaXNUaW1lY29kZU1vZGUoKVwiKTtcclxuICAgICAgICByZXR1cm4gcGxheWVyQ29uZmlnLmlzVGltZWNvZGVNb2RlKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRGcmFtZXJhdGUgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0RnJhbWVyYXRlKClcIik7XHJcblxyXG4gICAgICAgIGlmIChjdXJyZW50UHJvdmlkZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRGcmFtZXJhdGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuICAgIHRoYXQuc2Vla0ZyYW1lID0gKGZyYW1lQ291bnQpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2Vla0ZyYW1lKClcIiwgZnJhbWVDb3VudCk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5zZWVrRnJhbWUoZnJhbWVDb3VudCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0RHVyYXRpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldER1cmF0aW9uKClcIiwgY3VycmVudFByb3ZpZGVyLmdldER1cmF0aW9uKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0RHVyYXRpb24oKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFBvc2l0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0UG9zaXRpb24oKVwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRQb3NpdGlvbigpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Vm9sdW1lID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Vm9sdW1lKClcIiwgY3VycmVudFByb3ZpZGVyLmdldFZvbHVtZSgpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFZvbHVtZSgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Vm9sdW1lID0gKHZvbHVtZSkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Vm9sdW1lKCkgXCIgKyB2b2x1bWUpO1xyXG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5zZXRWb2x1bWUodm9sdW1lKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldE11dGUgPSAoc3RhdGUpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldE11dGUoKSBcIiArIHN0YXRlKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLnNldE11dGUoc3RhdGUpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0TXV0ZSA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldE11dGUoKSBcIiArIGN1cnJlbnRQcm92aWRlci5nZXRNdXRlKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0TXV0ZSgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQubG9hZCA9IChwbGF5bGlzdCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGxvYWQoKSBcIiwgcGxheWxpc3QpO1xyXG4gICAgICAgIGxhenlRdWV1ZSA9IExhenlDb21tYW5kRXhlY3V0b3IodGhhdCwgWydwbGF5Jywnc2VlaycsJ3N0b3AnXSk7XHJcblxyXG4gICAgICAgIGlmKHBsYXlsaXN0KXtcclxuICAgICAgICAgICAgaWYoY3VycmVudFByb3ZpZGVyKXtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5zZXRDdXJyZW50UXVhbGl0eSgwKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCdzb3VyY2VzJyBpbiBwbGF5bGlzdCkge1xyXG4gICAgICAgICAgICAgICAgcGxheWVyQ29uZmlnLnNldFBsYXlsaXN0KHBsYXlsaXN0KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHBsYXllckNvbmZpZy5zZXRQbGF5bGlzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlczogcGxheWxpc3RcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwbGF5bGlzdE1hbmFnZXIuaW5pdFBsYXlsaXN0KHBsYXllckNvbmZpZy5nZXRQbGF5bGlzdCgpLCBwbGF5ZXJDb25maWcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5pdFByb3ZpZGVyKCk7XHJcblxyXG4gICAgfTtcclxuICAgIHRoYXQucGxheSA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcGxheSgpIFwiKTtcclxuICAgICAgICBjdXJyZW50UHJvdmlkZXIucGxheSgpO1xyXG4gICAgfVxyXG4gICAgdGhhdC5wYXVzZSA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHBhdXNlKCkgXCIpO1xyXG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5wYXVzZSgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2VlayA9IChwb3NpdGlvbikgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2VlaygpIFwiKyBwb3NpdGlvbik7XHJcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnNlZWsocG9zaXRpb24pO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0UGxheWJhY2tSYXRlID0gKHBsYXliYWNrUmF0ZSkgPT57XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRQbGF5YmFja1JhdGUoKSBcIiwgcGxheWJhY2tSYXRlKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLnNldFBsYXliYWNrUmF0ZShwbGF5ZXJDb25maWcuc2V0UGxheWJhY2tSYXRlKHBsYXliYWNrUmF0ZSkpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0UGxheWJhY2tSYXRlID0gKCkgPT57XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRQbGF5YmFja1JhdGUoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldFBsYXliYWNrUmF0ZSgpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFBsYXliYWNrUmF0ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldFBsYXlsaXN0ID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFBsYXlsaXN0KCkgXCIsIHBsYXlsaXN0TWFuYWdlci5nZXRQbGF5bGlzdCgpKTtcclxuICAgICAgICByZXR1cm4gcGxheWxpc3RNYW5hZ2VyLmdldFBsYXlsaXN0KCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRDdXJyZW50UGxheWxpc3QgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Q3VycmVudFBsYXlsaXN0KCkgXCIsIHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50UGxheWxpc3RJbmRleCgpKTtcclxuICAgICAgICByZXR1cm4gcGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRQbGF5bGlzdEluZGV4KCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRDdXJyZW50UGxheWxpc3QgPSAoaW5kZXgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRDdXJyZW50UGxheWxpc3QoKSBcIiwgaW5kZXgpO1xyXG4gICAgICAgIHJ1bk5leHRQbGF5bGlzdChpbmRleCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0U291cmNlcyA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFNvdXJjZXMoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldFNvdXJjZXMoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRTb3VyY2VzKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRDdXJyZW50U291cmNlID0gKCkgPT57XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRDdXJyZW50U291cmNlKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRDdXJyZW50U291cmNlKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFNvdXJjZSgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Q3VycmVudFNvdXJjZSA9IChpbmRleCkgPT57XHJcblxyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Q3VycmVudFNvdXJjZSgpIFwiLCBpbmRleCk7XHJcblxyXG4gICAgICAgIC8vIGxldCBzb3VyY2VzID0gY3VycmVudFByb3ZpZGVyLmdldFNvdXJjZXMoKTtcclxuICAgICAgICAvLyBsZXQgY3VycmVudFNvdXJjZSA9IHNvdXJjZXNbY3VycmVudFByb3ZpZGVyLmdldEN1cnJlbnRTb3VyY2UoKV07XHJcbiAgICAgICAgLy8gbGV0IG5ld1NvdXJjZSA9IHNvdXJjZXNbaW5kZXhdO1xyXG5cclxuICAgICAgICAvLyBsZXQgaXNTYW1lUHJvdmlkZXIgPSBwcm92aWRlckNvbnRyb2xsZXIuaXNTYW1lUHJvdmlkZXIoY3VycmVudFNvdXJjZSwgbmV3U291cmNlKTtcclxuICAgICAgICAvLyAvLyBwcm92aWRlci5zZXJDdXJyZW50UXVhbGl0eSAtPiBwbGF5ZXJDb25maWcgc2V0dGluZyAtPiBsb2FkXHJcbiAgICAgICAgLy8gbGV0IHJlc3VsdFNvdXJjZUluZGV4ID0gY3VycmVudFByb3ZpZGVyLnNldEN1cnJlbnRTb3VyY2UoaW5kZXgsIGlzU2FtZVByb3ZpZGVyKTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIGlmKCFuZXdTb3VyY2Upe1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRDdXJyZW50UXVhbGl0eSgpIGlzU2FtZVByb3ZpZGVyXCIsIGlzU2FtZVByb3ZpZGVyKTtcclxuXHJcbiAgICAgICAgbGV0IGxhc3RQbGF5UG9zaXRpb24gPSBjdXJyZW50UHJvdmlkZXIuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICBwbGF5ZXJDb25maWcuc2V0U291cmNlSW5kZXgoaW5kZXgpO1xyXG4gICAgICAgIGxhenlRdWV1ZSA9IExhenlDb21tYW5kRXhlY3V0b3IodGhhdCwgWydwbGF5Jywnc2VlayddKTtcclxuXHJcbiAgICAgICAgaW5pdFByb3ZpZGVyKGxhc3RQbGF5UG9zaXRpb24pO1xyXG5cclxuICAgICAgICByZXR1cm4gaW5kZXg7XHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgdGhhdC5nZXRRdWFsaXR5TGV2ZWxzID0gKCkgPT57XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRRdWFsaXR5TGV2ZWxzKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRRdWFsaXR5TGV2ZWxzKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0UXVhbGl0eUxldmVscygpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q3VycmVudFF1YWxpdHkgPSAoKSA9PntcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEN1cnJlbnRRdWFsaXR5KCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRDdXJyZW50UXVhbGl0eSgpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldEN1cnJlbnRRdWFsaXR5KCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRDdXJyZW50UXVhbGl0eSA9IChxdWFsaXR5SW5kZXgpID0+e1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Q3VycmVudFF1YWxpdHkoKSBcIiwgcXVhbGl0eUluZGV4KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5zZXRDdXJyZW50UXVhbGl0eShxdWFsaXR5SW5kZXgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuaXNBdXRvUXVhbGl0eSA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGlzQXV0b1F1YWxpdHkoKVwiKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmlzQXV0b1F1YWxpdHkoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEF1dG9RdWFsaXR5ID0gKGlzQXV0bykgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0QXV0b1F1YWxpdHkoKSBcIiwgaXNBdXRvKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLnNldEF1dG9RdWFsaXR5KGlzQXV0byk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhhdC5nZXRDYXB0aW9uTGlzdCA9ICgpID0+IHtcclxuICAgICAgICBpZighY2FwdGlvbk1hbmFnZXIpe3JldHVybiBudWxsO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRDYXB0aW9uTGlzdCgpIFwiLCBjYXB0aW9uTWFuYWdlci5nZXRDYXB0aW9uTGlzdCgpKTtcclxuICAgICAgICByZXR1cm4gY2FwdGlvbk1hbmFnZXIuZ2V0Q2FwdGlvbkxpc3QoKTtcclxuICAgIH1cclxuICAgIHRoYXQuZ2V0Q3VycmVudENhcHRpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWNhcHRpb25NYW5hZ2VyKXtyZXR1cm4gbnVsbDt9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Q3VycmVudENhcHRpb24oKSBcIiwgY2FwdGlvbk1hbmFnZXIuZ2V0Q3VycmVudENhcHRpb24oKSk7XHJcbiAgICAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLmdldEN1cnJlbnRDYXB0aW9uKCk7XHJcbiAgICB9XHJcbiAgICB0aGF0LnNldEN1cnJlbnRDYXB0aW9uID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgaWYoIWNhcHRpb25NYW5hZ2VyKXtyZXR1cm4gbnVsbDt9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Q3VycmVudENhcHRpb24oKSBcIiwgaW5kZXgpO1xyXG4gICAgICAgIGNhcHRpb25NYW5hZ2VyLnNldEN1cnJlbnRDYXB0aW9uKGluZGV4KTtcclxuICAgIH1cclxuICAgIHRoYXQuYWRkQ2FwdGlvbiA9ICh0cmFjaykgPT4ge1xyXG4gICAgICAgIGlmKCFjYXB0aW9uTWFuYWdlcil7cmV0dXJuIG51bGw7fVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGFkZENhcHRpb24oKSBcIilcclxuICAgICAgICByZXR1cm4gY2FwdGlvbk1hbmFnZXIuYWRkQ2FwdGlvbih0cmFjayk7XHJcbiAgICB9XHJcbiAgICB0aGF0LnJlbW92ZUNhcHRpb24gPSAoaW5kZXgpID0+IHtcclxuICAgICAgICBpZighY2FwdGlvbk1hbmFnZXIpe3JldHVybiBudWxsO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiByZW1vdmVDYXB0aW9uKCkgXCIsIGluZGV4KVxyXG4gICAgICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5yZW1vdmVDYXB0aW9uKGluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGF0LmdldEJ1ZmZlciA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0QnVmZmVyKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRCdWZmZXIoKSk7XHJcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLmdldEJ1ZmZlcigpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0U3RhdGUgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFN0YXRlKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRTdGF0ZSgpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFN0YXRlKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zdG9wID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc3RvcCgpIFwiKTtcclxuICAgICAgICBjdXJyZW50UHJvdmlkZXIuc3RvcCgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQucmVtb3ZlID0gKCkgPT4ge1xyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiByZW1vdmUoKSBcIik7XHJcblxyXG4gICAgICAgIGlmIChsYXp5UXVldWUpIHtcclxuICAgICAgICAgICAgbGF6eVF1ZXVlLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGNhcHRpb25NYW5hZ2VyKXtcclxuICAgICAgICAgICAgY2FwdGlvbk1hbmFnZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICBjYXB0aW9uTWFuYWdlciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihjdXJyZW50UHJvdmlkZXIpe1xyXG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYobWVkaWFNYW5hZ2VyKXtcclxuICAgICAgICAgICAgbWVkaWFNYW5hZ2VyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgbWVkaWFNYW5hZ2VyID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoYXQudHJpZ2dlcihERVNUUk9ZKTtcclxuICAgICAgICB0aGF0Lm9mZigpO1xyXG5cclxuICAgICAgICBwcm92aWRlckNvbnRyb2xsZXIgPSBudWxsO1xyXG4gICAgICAgIHBsYXlsaXN0TWFuYWdlciA9IG51bGw7XHJcbiAgICAgICAgcGxheWVyQ29uZmlnID0gbnVsbDtcclxuICAgICAgICBsYXp5UXVldWUgPSBudWxsO1xyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiByZW1vdmUoKSAtIGxhenlRdWV1ZSwgY3VycmVudFByb3ZpZGVyLCBwcm92aWRlckNvbnRyb2xsZXIsIHBsYXlsaXN0TWFuYWdlciwgcGxheWVyQ29uZmlnLCBhcGkgZXZlbnQgZGVzdHJvZWQuIFwiKTtcclxuICAgICAgICBPdmVuUGxheWVyU0RLLnJlbW92ZVBsYXllcih0aGF0LmdldENvbnRhaW5lcklkKCkpO1xyXG4gICAgICAgIGlmKE92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyTGlzdCgpLmxlbmd0aCAgPT09IDApe1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJPdmVuUGxheWVyU0RLLnBsYXllckxpc3RcIiwgIE92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyTGlzdCgpKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0VmVyc2lvbiA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gXCJ2LlwiK3ZlcnNpb247XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcGk7XHJcblxyXG5cclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyNC4uXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNvbnN0IEFwaVJ0bXBFeHBhbnNpb24gPSBmdW5jdGlvbihjdXJyZW50UHJvdmlkZXIpe1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBleHRlcm5hbENhbGxiYWNrQ3JlZXAgOiAocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHJlc3VsdC5uYW1lICYmIHJlc3VsdC5kYXRhKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIudHJpZ2dlckV2ZW50RnJvbUV4dGVybmFsKHJlc3VsdC5uYW1lLCByZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG4iLCJpbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIENPTlRFTlRfVElNRV9NT0RFX0NIQU5HRUQsIFNZU1RFTV9URVhUXHJcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBUaGlzIGluaXRpYWxpemVzIHRoZSBpbnB1dCBvcHRpb25zLlxyXG4gKiBAcGFyYW0gICBvcHRpb25zXHJcbiAqXHJcbiAqICovXHJcbmNvbnN0IENvbmZpZ3VyYXRvciA9IGZ1bmN0aW9uKG9wdGlvbnMsIHByb3ZpZGVyKXtcclxuXHJcbiAgICBjb25zdCBjb21wb3NlU291cmNlT3B0aW9ucyA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xyXG4gICAgICAgIGNvbnN0IERlZmF1bHRzID0ge1xyXG4gICAgICAgICAgICBtZWRpYUNvbnRhaW5lciA6IFwiXCIsXHJcbiAgICAgICAgICAgIHBsYXliYWNrUmF0ZXM6IFsyLCAxLjUsIDEsIDAuNSwgMC4yNV0sXHJcbiAgICAgICAgICAgIHBsYXliYWNrUmF0ZTogMSxcclxuICAgICAgICAgICAgbXV0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHZvbHVtZTogMTAwLFxyXG4gICAgICAgICAgICBsb29wIDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNvbnRyb2xzIDogdHJ1ZSxcclxuICAgICAgICAgICAgYXV0b1N0YXJ0IDogZmFsc2UsXHJcbiAgICAgICAgICAgIGF1dG9GYWxsYmFjazogdHJ1ZSxcclxuICAgICAgICAgICAgdGltZWNvZGUgOiB0cnVlLFxyXG4gICAgICAgICAgICBzb3VyY2VJbmRleCA6IC0xLFxyXG4gICAgICAgICAgICBicm93c2VyIDogXCJcIixcclxuICAgICAgICAgICAgaGlkZVBsYXlsaXN0SWNvbiA6IGZhbHNlLFxyXG4gICAgICAgICAgICBydG1wQnVmZmVyVGltZSA6IDEsXHJcbiAgICAgICAgICAgIHJ0bXBCdWZmZXJUaW1lTWF4IDogMyxcclxuICAgICAgICAgICAgYWRDbGllbnQgOiBcImdvb2dsZWltYVwiLFxyXG4gICAgICAgICAgICBjdXJyZW50UHJvdG9jb2xPbmx5IDogZmFsc2UsXHJcbiAgICAgICAgICAgIHN5c3RlbVRleHQgOiBudWxsLFxyXG4gICAgICAgICAgICBsYW5nIDogXCJlblwiLFxyXG4gICAgICAgICAgICBsb2FkaW5nUmV0cnlDb3VudDogMCxcclxuICAgICAgICAgICAgZXhwYW5kRnVsbFNjcmVlblVJOiBmYWxzZSxcclxuICAgICAgICAgICAgZnVsbHNjcmVlbk9wdGlvbjogbnVsbCxcclxuICAgICAgICAgICAgc2hvd0JpZ1BsYXlCdXR0b246IHRydWVcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHNlcmlhbGl6ZSA9IGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgICAgICAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycgJiYgdmFsLmxlbmd0aCA8IDYpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxvd2VyY2FzZVZhbCA9IHZhbC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvd2VyY2FzZVZhbCA9PT0gJ3RydWUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobG93ZXJjYXNlVmFsID09PSAnZmFsc2UnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFpc05hTihOdW1iZXIodmFsKSkgJiYgIWlzTmFOKHBhcnNlRmxvYXQodmFsKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gTnVtYmVyKHZhbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZGVzZXJpYWxpemUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChrZXkgPT09ICdpZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zW2tleV0gPSBzZXJpYWxpemUob3B0aW9uc1trZXldKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZXNlcmlhbGl6ZShvcHRpb25zKTtcclxuICAgICAgICBsZXQgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgRGVmYXVsdHMsIG9wdGlvbnMpO1xyXG4gICAgICAgIGxldCB1c2VyQ3VzdHVtU3lzdGVtVGV4dCA9IFtdO1xyXG4gICAgICAgIGlmKGNvbmZpZy5zeXN0ZW1UZXh0KXtcclxuICAgICAgICAgICAgdXNlckN1c3R1bVN5c3RlbVRleHQgPSBfLmlzQXJyYXkoY29uZmlnLnN5c3RlbVRleHQpID8gY29uZmlnLnN5c3RlbVRleHQgOiBbY29uZmlnLnN5c3RlbVRleHRdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHVzZXJDdXN0dW1TeXN0ZW1UZXh0Lmxlbmd0aDsgaSArKyl7XHJcbiAgICAgICAgICAgIGlmKHVzZXJDdXN0dW1TeXN0ZW1UZXh0W2ldLmxhbmcpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRTeXN0ZW1UZXh0ID0gXy5maW5kV2hlcmUoU1lTVEVNX1RFWFQgLCB7XCJsYW5nXCI6IHVzZXJDdXN0dW1TeXN0ZW1UZXh0W2ldLmxhbmd9KTtcclxuICAgICAgICAgICAgICAgIGlmKGN1cnJlbnRTeXN0ZW1UZXh0KXtcclxuICAgICAgICAgICAgICAgICAgICAvL3ZhbGlkYXRlICYgdXBkYXRlXHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihjdXJyZW50U3lzdGVtVGV4dCwgdXNlckN1c3R1bVN5c3RlbVRleHRbaV0pO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jcmVhdGVcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3lzdGVtVGV4dCA9IF8uZmluZFdoZXJlKFNZU1RFTV9URVhUICwge1wibGFuZ1wiOiBcImVuXCJ9KTtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3lzdGVtVGV4dC5sYW5nID0gdXNlckN1c3R1bVN5c3RlbVRleHRbaV0ubGFuZztcclxuICAgICAgICAgICAgICAgICAgICBTWVNURU1fVEVYVC5wdXNoKE9iamVjdC5hc3NpZ24odXNlckN1c3R1bVN5c3RlbVRleHRbaV0sIGN1cnJlbnRTeXN0ZW1UZXh0KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uZmlnLnN5c3RlbVRleHQgPSBfLmZpbmRXaGVyZShTWVNURU1fVEVYVCAsIHtcImxhbmdcIjogY29uZmlnLmxhbmd9KTtcclxuXHJcbiAgICAgICAgbGV0IHBsYXliYWNrUmF0ZXMgPSBjb25maWcucGxheWJhY2tSYXRlcztcclxuXHJcbiAgICAgICAgcGxheWJhY2tSYXRlcyA9IHBsYXliYWNrUmF0ZXMuZmlsdGVyKHJhdGUgPT4gXy5pc051bWJlcihyYXRlKSAmJiByYXRlID49IDAuMjUgJiYgcmF0ZSA8PSA0KS5tYXAocmF0ZSA9PiBNYXRoLnJvdW5kKHJhdGUgKiA0KSAvIDQpO1xyXG5cclxuICAgICAgICBpZiAocGxheWJhY2tSYXRlcy5pbmRleE9mKDEpIDwgMCkge1xyXG4gICAgICAgICAgICBwbGF5YmFja1JhdGVzLnB1c2goMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBsYXliYWNrUmF0ZXMuc29ydCgpO1xyXG5cclxuICAgICAgICBjb25maWcucGxheWJhY2tSYXRlcyA9IHBsYXliYWNrUmF0ZXM7XHJcblxyXG4gICAgICAgIGNvbmZpZy5ydG1wQnVmZmVyVGltZSA9IGNvbmZpZy5ydG1wQnVmZmVyVGltZSA+IDEwID8gMTAgOiBjb25maWcucnRtcEJ1ZmZlclRpbWU7XHJcbiAgICAgICAgY29uZmlnLnJ0bXBCdWZmZXJUaW1lTWF4ID0gY29uZmlnLnJ0bXBCdWZmZXJUaW1lTWF4ID4gNTAgPyA1MCA6IGNvbmZpZy5ydG1wQnVmZmVyVGltZU1heDtcclxuXHJcblxyXG4gICAgICAgIGlmIChjb25maWcucGxheWJhY2tSYXRlcy5pbmRleE9mKGNvbmZpZy5wbGF5YmFja1JhdGUpIDwgMCkge1xyXG4gICAgICAgICAgICBjb25maWcucGxheWJhY2tSYXRlID0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbmZpZ1BsYXlsaXN0ID0gY29uZmlnLnBsYXlsaXN0O1xyXG4gICAgICAgIGlmICghY29uZmlnUGxheWxpc3QpIHtcclxuICAgICAgICAgICAgY29uc3Qgb2JqID0gXy5waWNrKGNvbmZpZywgW1xyXG4gICAgICAgICAgICAgICAgJ3RpdGxlJyxcclxuICAgICAgICAgICAgICAgICdkZXNjcmlwdGlvbicsXHJcbiAgICAgICAgICAgICAgICAndHlwZScsXHJcbiAgICAgICAgICAgICAgICAnaW1hZ2UnLFxyXG4gICAgICAgICAgICAgICAgJ2ZpbGUnLFxyXG4gICAgICAgICAgICAgICAgJ3NvdXJjZXMnLFxyXG4gICAgICAgICAgICAgICAgJ3RyYWNrcycsXHJcbiAgICAgICAgICAgICAgICAnaG9zdCcsXHJcbiAgICAgICAgICAgICAgICAnYXBwbGljYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgJ3N0cmVhbScsXHJcbiAgICAgICAgICAgICAgICAnYWRUYWdVcmwnXHJcbiAgICAgICAgICAgIF0pO1xyXG5cclxuICAgICAgICAgICAgY29uZmlnLnBsYXlsaXN0ID0gWyBvYmogXTtcclxuICAgICAgICB9IGVsc2UgaWYgKF8uaXNBcnJheShjb25maWdQbGF5bGlzdC5wbGF5bGlzdCkpIHtcclxuICAgICAgICAgICAgY29uZmlnLmZlZWREYXRhID0gY29uZmlnUGxheWxpc3Q7XHJcbiAgICAgICAgICAgIGNvbmZpZy5wbGF5bGlzdCA9IGNvbmZpZ1BsYXlsaXN0LnBsYXlsaXN0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGVsZXRlIGNvbmZpZy5kdXJhdGlvbjtcclxuICAgICAgICByZXR1cm4gY29uZmlnO1xyXG4gICAgfTtcclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNvbmZpZ3VyYXRvciBsb2FkZWQuXCIsIG9wdGlvbnMpO1xyXG4gICAgbGV0IHNwZWMgPSBjb21wb3NlU291cmNlT3B0aW9ucyhvcHRpb25zKTtcclxuXHJcbiAgICAvL3NwZWMuaXNGdWxsc2NyZWVuID0gZmFsc2U7IC8vSUUgMTEgY2FuJ3QgY2hlY2sgY3VycmVudCBmdWxsc2NyZWVuIHN0YXRlLlxyXG5cclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIHRoYXQuZ2V0Q29uZmlnID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0QWRDbGllbnQgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuYWRDbGllbnQ7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRDb25maWcgPSAoY29uZmlnLCB2YWx1ZSkgPT4ge1xyXG4gICAgICAgIHNwZWNbY29uZmlnXSA9IHZhbHVlO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldENvbnRhaW5lciA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5tZWRpYUNvbnRhaW5lcjtcclxuICAgIH07XHJcbiAgICAvKnRoYXQuaXNGdWxsc2NyZWVuID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLmlzRnVsbHNjcmVlbjtcclxuICAgIH1cclxuICAgIHRoYXQuc2V0RnVsbHNjcmVlbiA9IChpc0Z1bGxzY3JlZW4pID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5pc0Z1bGxzY3JlZW4gPSBpc0Z1bGxzY3JlZW47XHJcbiAgICB9Ki9cclxuXHJcbiAgICB0aGF0LmdldFBsYXliYWNrUmF0ZSA9KCk9PntcclxuICAgICAgICByZXR1cm4gc3BlYy5wbGF5YmFja1JhdGU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRQbGF5YmFja1JhdGUgPShwbGF5YmFja1JhdGUpPT57XHJcbiAgICAgICAgc3BlYy5wbGF5YmFja1JhdGUgPSBwbGF5YmFja1JhdGU7XHJcbiAgICAgICAgcmV0dXJuIHBsYXliYWNrUmF0ZTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRRdWFsaXR5TGFiZWwgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMucXVhbGl0eUxhYmVsO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0UXVhbGl0eUxhYmVsID0gKG5ld0xhYmVsKSA9PiB7XHJcbiAgICAgICAgc3BlYy5xdWFsaXR5TGFiZWwgPSBuZXdMYWJlbDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5pc0N1cnJlbnRQcm90b2NvbE9ubHkgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFByb3RvY29sT25seTtcclxuICAgIH07XHJcbiAgICAvKnRoYXQuZ2V0U291cmNlTGFiZWwgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuc291cmNlTGFiZWw7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRTb3VyY2VMYWJlbCA9IChuZXdMYWJlbCkgPT4ge1xyXG4gICAgICAgIHNwZWMuc291cmNlTGFiZWwgPSBuZXdMYWJlbDtcclxuICAgIH07Ki9cclxuXHJcbiAgICB0aGF0LmdldFNvdXJjZUluZGV4ID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLnNvdXJjZUluZGV4O1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0U291cmNlSW5kZXggPSAoaW5kZXgpID0+IHtcclxuICAgICAgICBzcGVjLnNvdXJjZUluZGV4ID0gaW5kZXg7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRUaW1lY29kZU1vZGUgPSAodGltZWNvZGUpID0+IHtcclxuICAgICAgICBpZihzcGVjLnRpbWVjb2RlICE9PSB0aW1lY29kZSl7XHJcbiAgICAgICAgICAgIHNwZWMudGltZWNvZGUgPSB0aW1lY29kZTtcclxuICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1RJTUVfTU9ERV9DSEFOR0VELCB0aW1lY29kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoYXQuaXNUaW1lY29kZU1vZGUgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMudGltZWNvZGU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRSdG1wQnVmZmVyVGltZSA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5ydG1wQnVmZmVyVGltZTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFJ0bXBCdWZmZXJUaW1lTWF4ID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLnJ0bXBCdWZmZXJUaW1lTWF4O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmlzTXV0ZSA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBzcGVjLm11dGU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRWb2x1bWUgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gc3BlYy52b2x1bWU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRWb2x1bWUgPSAodm9sdW1lKSA9PntcclxuICAgICAgICBzcGVjLnZvbHVtZSA9IHZvbHVtZTtcclxuICAgIH07XHJcbiAgICB0aGF0LmlzTG9vcCA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBzcGVjLmxvb3A7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5pc0F1dG9TdGFydCA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBzcGVjLmF1dG9TdGFydDtcclxuICAgIH07XHJcbiAgICB0aGF0LmlzQ29udHJvbHMgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gc3BlYy5jb250cm9scztcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGVzID0oKT0+e1xyXG4gICAgICAgIHJldHVybiBzcGVjLnBsYXliYWNrUmF0ZXM7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRCcm93c2VyID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLmJyb3dzZXI7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRTeXN0ZW1UZXh0ID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLnN5c3RlbVRleHQ7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRMYW5ndWFnZSA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5sYW5nO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldFBsYXlsaXN0ID0oKT0+e1xyXG4gICAgICAgIHJldHVybiBzcGVjLnBsYXlsaXN0O1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0UGxheWxpc3QgPShwbGF5bGlzdCk9PntcclxuICAgICAgICBpZihfLmlzQXJyYXkocGxheWxpc3QpKXtcclxuICAgICAgICAgICAgc3BlYy5wbGF5bGlzdCA9IHBsYXlsaXN0O1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBzcGVjLnBsYXlsaXN0ID0gW3BsYXlsaXN0XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNwZWMucGxheWxpc3Q7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29uZmlndXJhdG9yO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDMuLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBUaGlzIG1vZHVsZSBwcm92aWRlIGN1c3RvbSBldmVudHMuXHJcbiAqIEBwYXJhbSAgIG9iamVjdCAgICBBbiBvYmplY3QgdGhhdCByZXF1aXJlcyBjdXN0b20gZXZlbnRzLlxyXG4gKlxyXG4gKiAqL1xyXG5cclxuY29uc3QgRXZlbnRFbWl0dGVyID0gZnVuY3Rpb24ob2JqZWN0KXtcclxuICAgIGxldCB0aGF0ID0gb2JqZWN0O1xyXG4gICAgbGV0IF9ldmVudHMgPVtdO1xyXG5cclxuICAgIGNvbnN0IHRyaWdnZXJFdmVudHMgPSBmdW5jdGlvbihldmVudHMsIGFyZ3MsIGNvbnRleHQpe1xyXG4gICAgICAgIGxldCBpID0gMDtcclxuICAgICAgICBsZXQgbGVuZ3RoID0gZXZlbnRzLmxlbmd0aDtcclxuICAgICAgICBmb3IoaSA9IDA7IGkgPCBsZW5ndGg7IGkgKyspe1xyXG4gICAgICAgICAgICBsZXQgZXZlbnQgPSBldmVudHNbaV07XHJcbiAgICAgICAgICAgIGV2ZW50Lmxpc3RlbmVyLmFwcGx5KCAoIGV2ZW50LmNvbnRleHQgfHwgY29udGV4dCApLCBhcmdzKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQub24gPSBmdW5jdGlvbihuYW1lLCBsaXN0ZW5lciwgY29udGV4dCl7XHJcbiAgICAgICAgKF9ldmVudHNbbmFtZV0gfHwgKF9ldmVudHNbbmFtZV09W10pICkucHVzaCh7IGxpc3RlbmVyOiBsaXN0ZW5lciAgLCBjb250ZXh0IDogY29udGV4dH0pO1xyXG4gICAgICAgIHJldHVybiB0aGF0O1xyXG4gICAgfTtcclxuICAgIHRoYXQudHJpZ2dlciA9IGZ1bmN0aW9uKG5hbWUpe1xyXG4gICAgICAgIGlmKCFfZXZlbnRzKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xyXG4gICAgICAgIGNvbnN0IGV2ZW50cyA9IF9ldmVudHNbbmFtZV07XHJcbiAgICAgICAgY29uc3QgYWxsRXZlbnRzID0gX2V2ZW50cy5hbGw7XHJcblxyXG4gICAgICAgIGlmKGV2ZW50cyl7XHJcbiAgICAgICAgICAgIHRyaWdnZXJFdmVudHMoZXZlbnRzLCBhcmdzLCB0aGF0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoYWxsRXZlbnRzKXtcclxuICAgICAgICAgICAgdHJpZ2dlckV2ZW50cyhhbGxFdmVudHMsIGFyZ3VtZW50cywgdGhhdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoYXQub2ZmID0gZnVuY3Rpb24obmFtZSwgbGlzdGVuZXIsIGNvbnRleHQpe1xyXG4gICAgICAgIGlmKCFfZXZlbnRzKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFuYW1lICYmICFsaXN0ZW5lciAmJiAhY29udGV4dCkgIHtcclxuICAgICAgICAgICAgX2V2ZW50cyA9IFtdO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhhdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG5hbWVzID0gbmFtZSA/IFtuYW1lXSA6IE9iamVjdC5rZXlzKF9ldmVudHMpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IG5hbWVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICBuYW1lID0gbmFtZXNbaV07XHJcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50cyA9IF9ldmVudHNbbmFtZV07XHJcbiAgICAgICAgICAgIGlmIChldmVudHMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJldGFpbiA9IF9ldmVudHNbbmFtZV0gPSBbXTtcclxuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lciAgfHwgY29udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwLCBrID0gZXZlbnRzLmxlbmd0aDsgaiA8IGs7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBldmVudCA9IGV2ZW50c1tqXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChsaXN0ZW5lciAmJiBsaXN0ZW5lciAhPT0gZXZlbnQubGlzdGVuZXIgJiYgbGlzdGVuZXIgIT09IGV2ZW50Lmxpc3RlbmVyLmxpc3RlbmVyICAmJiBsaXN0ZW5lciAhPT0gZXZlbnQubGlzdGVuZXIuX2xpc3RlbmVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwoY29udGV4dCAmJiBjb250ZXh0ICE9PSBldmVudC5jb250ZXh0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldGFpbi5wdXNoKGV2ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghcmV0YWluLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBfZXZlbnRzW25hbWVdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGF0O1xyXG4gICAgfTtcclxuICAgIHRoYXQub25jZSA9IGZ1bmN0aW9uKG5hbWUsIGxpc3RlbmVyLCBjb250ZXh0KXtcclxuICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgIGNvbnN0IG9uY2VDYWxsYmFjayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoY291bnQrKykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoYXQub2ZmKG5hbWUsIG9uY2VDYWxsYmFjayk7XHJcbiAgICAgICAgICAgIGxpc3RlbmVyLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBvbmNlQ2FsbGJhY2suX2xpc3RlbmVyID0gbGlzdGVuZXI7XHJcbiAgICAgICAgcmV0dXJuIHRoYXQub24obmFtZSwgb25jZUNhbGxiYWNrLCBjb250ZXh0KTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV2ZW50RW1pdHRlcjtcclxuIiwiaW1wb3J0IF8gZnJvbSAndXRpbHMvdW5kZXJzY29yZSc7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgVGhpcyBleGVjdXRlcyB0aGUgaW5wdXQgY29tbWFuZHMgYXQgYSBzcGVjaWZpYyBwb2ludCBpbiB0aW1lLlxyXG4gKiBAcGFyYW0gICBpbnN0YW5jZVxyXG4gKiBAcGFyYW0gICBxdWV1ZWRDb21tYW5kc1xyXG4gKiAqL1xyXG5jb25zdCBMYXp5Q29tbWFuZEV4ZWN1dG9yID0gZnVuY3Rpb24gKGluc3RhbmNlLCBxdWV1ZWRDb21tYW5kcykge1xyXG4gICAgbGV0IGNvbW1hbmRRdWV1ZSA9IFtdO1xyXG4gICAgbGV0IHVuZGVjb3JhdGVkTWV0aG9kcyA9IHt9O1xyXG4gICAgbGV0IGV4ZWN1dGVNb2RlID0gZmFsc2U7XHJcbiAgICBsZXQgdGhhdCA9IHt9O1xyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciBsb2FkZWQuXCIpO1xyXG4gICAgcXVldWVkQ29tbWFuZHMuZm9yRWFjaCgoY29tbWFuZCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IGluc3RhbmNlW2NvbW1hbmRdO1xyXG4gICAgICAgIHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXSA9IG1ldGhvZCB8fCBmdW5jdGlvbigpe307XHJcblxyXG4gICAgICAgIGluc3RhbmNlW2NvbW1hbmRdID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xyXG4gICAgICAgICAgICAgIGlmICghZXhlY3V0ZU1vZGUpIHtcclxuICAgICAgICAgICAgICAgIC8vY29tbWFuZFF1ZXVlLnB1c2goeyBjb21tYW5kLCBhcmdzIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5hZGRRdWV1ZShjb21tYW5kLCBhcmdzKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZXhlY3V0ZVF1ZXVlZENvbW1hbmRzKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWV0aG9kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kLmFwcGx5KHRoYXQsIGFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG4gICAgdmFyIGV4ZWN1dGVRdWV1ZWRDb21tYW5kcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB3aGlsZSAoY29tbWFuZFF1ZXVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgY29uc3QgeyBjb21tYW5kLCBhcmdzIH0gPSBjb21tYW5kUXVldWUuc2hpZnQoKTtcclxuICAgICAgICAgICAgKHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXSB8fCBpbnN0YW5jZVtjb21tYW5kXSkuYXBwbHkoaW5zdGFuY2UsIGFyZ3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGF0LnNldEV4ZWN1dGVNb2RlID0gKG1vZGUpID0+IHtcclxuICAgICAgICBleGVjdXRlTW9kZSA9IG1vZGU7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IHNldEV4ZWN1dGVNb2RlKClcIiwgbW9kZSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRVbmRlY29yYXRlZE1ldGhvZHMgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBnZXRVbmRlY29yYXRlZE1ldGhvZHMoKVwiLCB1bmRlY29yYXRlZE1ldGhvZHMpO1xyXG4gICAgICAgIHJldHVybiB1bmRlY29yYXRlZE1ldGhvZHM7XHJcbiAgICB9XHJcbiAgICB0aGF0LmdldFF1ZXVlID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZ2V0UXVldWUoKVwiLCBnZXRRdWV1ZSk7XHJcbiAgICAgICAgcmV0dXJuIGNvbW1hbmRRdWV1ZTtcclxuICAgIH1cclxuICAgIHRoYXQuYWRkUXVldWUgPSBmdW5jdGlvbihjb21tYW5kLCBhcmdzKXtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogYWRkUXVldWUoKVwiLCBjb21tYW5kLCBhcmdzKTtcclxuICAgICAgICBjb21tYW5kUXVldWUucHVzaCh7IGNvbW1hbmQsIGFyZ3MgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhhdC5mbHVzaCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGZsdXNoKClcIik7XHJcbiAgICAgICAgZXhlY3V0ZVF1ZXVlZENvbW1hbmRzKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5lbXB0eSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBlbXB0eSgpXCIpO1xyXG4gICAgICAgIGNvbW1hbmRRdWV1ZS5sZW5ndGggPSAwO1xyXG4gICAgfTtcclxuICAgIHRoYXQub2ZmID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IG9mZigpXCIpO1xyXG4gICAgICAgIHF1ZXVlZENvbW1hbmRzLmZvckVhY2goKGNvbW1hbmQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbWV0aG9kID0gdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdO1xyXG4gICAgICAgICAgICBpZiAobWV0aG9kKSB7XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVtjb21tYW5kXSA9IG1ldGhvZDtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8vUnVuIG9uY2UgYXQgdGhlIGVuZFxyXG4gICAgdGhhdC5yZW1vdmVBbmRFeGN1dGVPbmNlID0gZnVuY3Rpb24oY29tbWFuZF8pe1xyXG4gICAgICAgIGxldCBjb21tYW5kUXVldWVJdGVtID0gXy5maW5kV2hlcmUoY29tbWFuZFF1ZXVlLCB7Y29tbWFuZCA6IGNvbW1hbmRffSk7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IHJlbW92ZUFuZEV4Y3V0ZU9uY2UoKVwiLCBjb21tYW5kXyk7XHJcbiAgICAgICAgY29tbWFuZFF1ZXVlLnNwbGljZShfLmZpbmRJbmRleChjb21tYW5kUXVldWUsIHtjb21tYW5kIDogY29tbWFuZF99KSwgMSk7XHJcblxyXG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kX107XHJcbiAgICAgICAgaWYgKG1ldGhvZCkge1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJyZW1vdmVDb21tYW5kKClcIik7XHJcbiAgICAgICAgICAgIGlmKGNvbW1hbmRRdWV1ZUl0ZW0pe1xyXG4gICAgICAgICAgICAgICAgKG1ldGhvZHx8IGluc3RhbmNlW2NvbW1hbmRfXSkuYXBwbHkoaW5zdGFuY2UsIGNvbW1hbmRRdWV1ZUl0ZW0uYXJncyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaW5zdGFuY2VbY29tbWFuZF9dID0gbWV0aG9kO1xyXG4gICAgICAgICAgICBkZWxldGUgdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRfXTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBkZXN0cm95KClcIik7XHJcbiAgICAgICAgdGhhdC5vZmYoKTtcclxuICAgICAgICB0aGF0LmVtcHR5KCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExhenlDb21tYW5kRXhlY3V0b3I7IiwiaW1wb3J0IHtpc1J0bXAsIGlzV2ViUlRDLCBpc0Rhc2gsIGlzSGxzfSBmcm9tIFwidXRpbHMvdmFsaWRhdG9yXCI7XHJcbmltcG9ydCB7YW5hbFVzZXJBZ2VudH0gZnJvbSBcInV0aWxzL2Jyb3dzZXJcIjtcclxuLyoqXHJcbiAqIEBicmllZiAgIFRoaXMgZmluZHMgdGhlIHByb3ZpZGVyIHRoYXQgbWF0Y2hlcyB0aGUgaW5wdXQgc291cmNlLlxyXG4gKiBAcGFyYW1cclxuICogKi9cclxuXHJcbmNvbnN0IFN1cHBvcnRDaGVja2VyID0gZnVuY3Rpb24oKXtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlN1cHBvcnRDaGVja2VyIGxvYWRlZC5cIik7XHJcbiAgICBsZXQgdXNlckFnZW50T2JqZWN0ID0gYW5hbFVzZXJBZ2VudCgpO1xyXG5cclxuICAgIGNvbnN0IHN1cHBvcnRMaXN0ID0gW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ2h0bWw1JyxcclxuICAgICAgICAgICAgY2hlY2tTdXBwb3J0OiBmdW5jdGlvbiAoc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBNaW1lVHlwZXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWFjOiAnYXVkaW8vbXA0JyxcclxuICAgICAgICAgICAgICAgICAgICBtcDQ6ICd2aWRlby9tcDQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGY0djogJ3ZpZGVvL21wNCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbTR2OiAndmlkZW8vbXA0JyxcclxuICAgICAgICAgICAgICAgICAgICBtb3Y6ICd2aWRlby9tcDQnLFxyXG4gICAgICAgICAgICAgICAgICAgIG1wMzogJ2F1ZGlvL21wZWcnLFxyXG4gICAgICAgICAgICAgICAgICAgIG1wZWc6ICdhdWRpby9tcGVnJyxcclxuICAgICAgICAgICAgICAgICAgICBvZ3Y6ICd2aWRlby9vZ2cnLFxyXG4gICAgICAgICAgICAgICAgICAgIG9nZzogJ3ZpZGVvL29nZycsXHJcbiAgICAgICAgICAgICAgICAgICAgb2dhOiAndmlkZW8vb2dnJyxcclxuICAgICAgICAgICAgICAgICAgICB2b3JiaXM6ICd2aWRlby9vZ2cnLFxyXG4gICAgICAgICAgICAgICAgICAgIHdlYm06ICd2aWRlby93ZWJtJyxcclxuICAgICAgICAgICAgICAgICAgICBmNGE6ICd2aWRlby9hYWMnLFxyXG4gICAgICAgICAgICAgICAgICAgIG0zdTg6ICdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbTN1OiAnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnLFxyXG4gICAgICAgICAgICAgICAgICAgIGhsczogJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJ1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCB2aWRlbyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJylcclxuICAgICAgICAgICAgICAgIH0oKTtcclxuICAgICAgICAgICAgICAgIGlmICghdmlkZW8uY2FuUGxheVR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZighdHlwZSl7cmV0dXJuIGZhbHNlO31cclxuICAgICAgICAgICAgICAgIGNvbnN0IG1pbWVUeXBlID0gc291cmNlLm1pbWVUeXBlIHx8IE1pbWVUeXBlc1t0eXBlXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihpc0hscyhmaWxlLCB0eXBlKSAmJiB1c2VyQWdlbnRPYmplY3QuYnJvd3NlciA9PT0gXCJNaWNyb3NvZnQgRWRnZVwiICl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9FZGdlIHN1cHBvcnRzIGhscyBuYXRpdmUgYnV0IHRoYXQncyBzdWNrcy5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGlzUnRtcChmaWxlLCB0eXBlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihpc1dlYlJUQyhmaWxlLCB0eXBlKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghbWltZVR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICEhdmlkZW8uY2FuUGxheVR5cGUobWltZVR5cGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICd3ZWJydGMnLFxyXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZpZGVvID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKVxyXG4gICAgICAgICAgICAgICAgfSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF2aWRlby5jYW5QbGF5VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpc1J0bXAoZmlsZSwgdHlwZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IHNvdXJjZS5maWxlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNvdXJjZS50eXBlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGlzV2ViUlRDKGZpbGUsIHR5cGUpKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAnZGFzaCcsXHJcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IHNvdXJjZS5maWxlO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcclxuICAgICAgICAgICAgICAgIGlmIChpc1J0bXAoZmlsZSwgdHlwZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAoIHdpbmRvdy5NZWRpYVNvdXJjZSB8fCB3aW5kb3cuV2ViS2l0TWVkaWFTb3VyY2UgKSA9PT0gXCJmdW5jdGlvblwiICYmIGlzRGFzaChmaWxlLCB0eXBlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdobHMnLFxyXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZpZGVvID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKVxyXG4gICAgICAgICAgICAgICAgfSgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IHNvdXJjZS5maWxlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNvdXJjZS50eXBlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzUnRtcChmaWxlLCB0eXBlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMgbWV0aG9kIGZyb20gaGxzLmpzXHJcbiAgICAgICAgICAgICAgICBjb25zdCBpc0hsc1N1cHBvcnQgPSAoKSA9PntcclxuICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gZ2V0TWVkaWFTb3VyY2UoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5NZWRpYVNvdXJjZSB8fCB3aW5kb3cuV2ViS2l0TWVkaWFTb3VyY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1lZGlhU291cmNlID0gZ2V0TWVkaWFTb3VyY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc291cmNlQnVmZmVyID0gd2luZG93LlNvdXJjZUJ1ZmZlciB8fCB3aW5kb3cuV2ViS2l0U291cmNlQnVmZmVyO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpc1R5cGVTdXBwb3J0ZWQgPSBtZWRpYVNvdXJjZSAmJiB0eXBlb2YgbWVkaWFTb3VyY2UuaXNUeXBlU3VwcG9ydGVkID09PSAnZnVuY3Rpb24nICYmIG1lZGlhU291cmNlLmlzVHlwZVN1cHBvcnRlZCgndmlkZW8vbXA0OyBjb2RlY3M9XCJhdmMxLjQyRTAxRSxtcDRhLjQwLjJcIicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBTb3VyY2VCdWZmZXIgaXMgZXhwb3NlZCBlbnN1cmUgaXRzIEFQSSBpcyB2YWxpZFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNhZmFyaSBhbmQgb2xkIHZlcnNpb24gb2YgQ2hyb21lIGRvZSBub3QgZXhwb3NlIFNvdXJjZUJ1ZmZlciBnbG9iYWxseSBzbyBjaGVja2luZyBTb3VyY2VCdWZmZXIucHJvdG90eXBlIGlzIGltcG9zc2libGVcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc291cmNlQnVmZmVyVmFsaWRBUEkgPSAhc291cmNlQnVmZmVyIHx8IHNvdXJjZUJ1ZmZlci5wcm90b3R5cGUgJiYgdHlwZW9mIHNvdXJjZUJ1ZmZlci5wcm90b3R5cGUuYXBwZW5kQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBzb3VyY2VCdWZmZXIucHJvdG90eXBlLnJlbW92ZSA9PT0gJ2Z1bmN0aW9uJztcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gISFpc1R5cGVTdXBwb3J0ZWQgJiYgISFzb3VyY2VCdWZmZXJWYWxpZEFQSTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAvL1JlbW92ZSB0aGlzICchIXZpZGVvLmNhblBsYXlUeXBlKCdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcpJyBpZiB5b3Ugd2FudCB0byB1c2UgaGxzanMuXHJcbiAgICAgICAgICAgICAgICAvL1llcyBJIG5lZWQgaGxzanMuIDIwMTktMDYtMTIgJiYgISF2aWRlby5jYW5QbGF5VHlwZSgnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpc0hsc1N1cHBvcnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAncnRtcCcsXHJcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IHNvdXJjZS5maWxlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNvdXJjZS50eXBlO1xyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gdGVzdEZsYXNoKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VwcG9ydCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL0lFIG9ubHlcclxuICAgICAgICAgICAgICAgICAgICBpZihcIkFjdGl2ZVhPYmplY3RcIiBpbiB3aW5kb3cpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1cHBvcnQgPSAhIShuZXcgQWN0aXZlWE9iamVjdChcIlNob2Nrd2F2ZUZsYXNoLlNob2Nrd2F2ZUZsYXNoXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWNhdGNoKGUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VwcG9ydCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1czQywgYmV0dGVyIHN1cHBvcnQgaW4gbGVnYWN5IGJyb3dzZXJcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VwcG9ydCA9ICEhbmF2aWdhdG9yLm1pbWVUeXBlc1snYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2gnXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3VwcG9ydDtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBjaGVja1N1cHBvcnQoKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih1c2VyQWdlbnRPYmplY3QuYnJvd3NlciA9PT0gXCJNaWNyb3NvZnQgRWRnZVwiIHx8IHVzZXJBZ2VudE9iamVjdC5vcyA9PT0gXCJBbmRyb2lkXCIgfHwgdXNlckFnZW50T2JqZWN0Lm9zID09PSBcImlPU1wiICB8fCB1c2VyQWdlbnRPYmplY3QuYnJvd3NlciA9PT0gXCJTYWZhcmlcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGlzUnRtcChmaWxlLCB0eXBlKSAmJiB0ZXN0Rmxhc2goKSAmJiBjaGVja1N1cHBvcnQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgXTtcclxuXHJcbiAgICB0aGF0LmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZSA9IChzb3J1Y2VfKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU3VwcG9ydENoZWNrZXIgOiBmaW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UoKVwiLCBzb3J1Y2VfKTtcclxuICAgICAgICBjb25zdCBzb3VyY2UgPSAoc29ydWNlXyA9PT0gT2JqZWN0KHNvcnVjZV8pKSA/IHNvcnVjZV8gOiB7fTtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgc3VwcG9ydExpc3QubGVuZ3RoOyBpICsrKXtcclxuICAgICAgICAgICAgaWYoc3VwcG9ydExpc3RbaV0uY2hlY2tTdXBwb3J0KHNvdXJjZSkpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1cHBvcnRMaXN0W2ldLm5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhhdC5maW5kUHJvdmlkZXJOYW1lc0J5UGxheWxpc3QgPSAocGxheWxpc3RJdGVtKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU3VwcG9ydENoZWNrZXIgOiBmaW5kUHJvdmlkZXJOYW1lc0J5UGxheWxpc3QoKVwiLCBwbGF5bGlzdEl0ZW0pO1xyXG4gICAgICAgIGxldCBzdXBwb3J0TmFtZXMgPSBbXTtcclxuICAgICAgICAvKmZvciAobGV0IGkgPSBwbGF5bGlzdF8ubGVuZ3RoOyBpLS07KSB7XHJcblxyXG5cclxuICAgICAgICB9Ki9cclxuICAgICAgICBjb25zdCBpdGVtID0gcGxheWxpc3RJdGVtO1xyXG5cclxuICAgICAgICBpZihpdGVtICYmIGl0ZW0uc291cmNlcyl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBpdGVtLnNvdXJjZXMubGVuZ3RoOyBqICsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBzb3VyY2UgPSBpdGVtLnNvdXJjZXNbal07XHJcbiAgICAgICAgICAgICAgICBpZiAoc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3VwcG9ydGVkID0gdGhhdC5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2Uoc291cmNlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3VwcG9ydGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1cHBvcnROYW1lcy5wdXNoKHN1cHBvcnRlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc3VwcG9ydE5hbWVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTdXBwb3J0Q2hlY2tlcjtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiA0Li5cclxuICovXHJcbmltcG9ydCBTcnRQYXJzZXIgZnJvbSBcImFwaS9jYXB0aW9uL3BhcnNlci9TcnRQYXJzZXJcIjtcclxuaW1wb3J0IFZUVEN1ZSBmcm9tIFwidXRpbHMvY2FwdGlvbnMvdnR0Q3VlXCI7XHJcbi8vaW1wb3J0IFJlcXVlc3QgZnJvbSBcInV0aWxzL2Rvd25sb2FkZXJcIjtcclxuXHJcbmNvbnN0IExvYWRlciA9IGZ1bmN0aW9uKCl7XHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcblxyXG4gICAgY29uc3QgY29udmVydFRvVlRUQ3VlcyA9IGZ1bmN0aW9uIChjdWVzKSB7XHJcbiAgICAgICAgcmV0dXJuIGN1ZXMubWFwKGN1ZSA9PiBuZXcgVlRUQ3VlKGN1ZS5zdGFydCwgY3VlLmVuZCwgY3VlLnRleHQpKTtcclxuICAgIH1cclxuICAgIC8vbGFuZ3VhZ2UgOiBmb3IgU01JIGZvcm1hdC5cclxuICAgIHRoYXQubG9hZCA9ICh0cmFjaywgbGFuZ3VhZ2UsIHN1Y2Nlc3NDYWxsYmFjaywgZXJyb3JDYWxsYmFjaykgPT4ge1xyXG5cclxuICAgICAgICB2YXIgcmVxdWVzdE9wdGlvbnMgID0ge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIHVybCA6IHRyYWNrLmZpbGUsXHJcbiAgICAgICAgICAgIGVuY29kaW5nOiBudWxsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbG9hZFJlcXVlc3REb3dubG9kZXIoKS50aGVuKFJlcXVlc3QgPT4ge1xyXG4gICAgICAgICAgICBSZXF1ZXN0KHJlcXVlc3RPcHRpb25zLCBmdW5jdGlvbihlcnJvciwgcmVzcG9uc2UsIGJvZHkpIHtcclxuICAgICAgICAgICAgICAgIGlmKGVycm9yKXtcclxuICAgICAgICAgICAgICAgICAgICBlcnJvckNhbGxiYWNrKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjdWVzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZ0dEN1ZXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJvZHkuaW5kZXhPZignV0VCVlRUJykgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJXRUJWVFQgTE9BREVEXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkVnR0UGFyc2VyKCkudGhlbihXZWJWVFQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBhcnNlciA9IG5ldyBXZWJWVFQuUGFyc2VyKHdpbmRvdywgV2ViVlRULlN0cmluZ0RlY29kZXIoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2dHRDdWVzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZXIub25jdWUgPSBmdW5jdGlvbihjdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2dHRDdWVzLnB1c2goY3VlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZXIub25mbHVzaCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVsZXRlIHRyYWNrLnhocjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzQ2FsbGJhY2sodnR0Q3Vlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUGFyc2UgY2FsbHMgb25mbHVzaCBpbnRlcm5hbGx5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZXIucGFyc2UoYm9keSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVsZXRlIHRyYWNrLnhocjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yQ2FsbGJhY2soZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihib2R5LmluZGV4T2YoJ1NBTUknKSA+PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU0FNSSBMT0FERURcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRTbWlQYXJzZXIoKS50aGVuKFNtaVBhcnNlciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGFyc2VkRGF0YSA9IFNtaVBhcnNlcihib2R5LCB7Zml4ZWRMYW5nIDogbGFuZ3VhZ2V9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZ0dEN1ZXMgPSBjb252ZXJ0VG9WVFRDdWVzKHBhcnNlZERhdGEucmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NDYWxsYmFjayh2dHRDdWVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWxldGUgdHJhY2sueGhyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JDYWxsYmFjayhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlNSVCBMT0FERURcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ZXMgPSBTcnRQYXJzZXIoYm9keSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZ0dEN1ZXMgPSBjb252ZXJ0VG9WVFRDdWVzKGN1ZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzQ2FsbGJhY2sodnR0Q3Vlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAvL2RlbGV0ZSB0cmFjay54aHI7XHJcbiAgICAgICAgICAgIGVycm9yQ2FsbGJhY2soZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuZnVuY3Rpb24gbG9hZFJlcXVlc3REb3dubG9kZXIoKXtcclxuICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ3V0aWxzL2Rvd25sb2FkZXInXSwgZnVuY3Rpb24gKHJlcXVpcmUpIHtcclxuICAgICAgICByZXR1cm4gcmVxdWlyZSgndXRpbHMvZG93bmxvYWRlcicpLmRlZmF1bHQ7XHJcbiAgICB9LCBmdW5jdGlvbihlcnIpe2NvbnNvbGUubG9nKGVycik7fSwgJ2Rvd25sb2FkZXInKTtcclxufTtcclxuZnVuY3Rpb24gbG9hZFZ0dFBhcnNlcigpIHtcclxuICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9jYXB0aW9uL3BhcnNlci9WdHRQYXJzZXInXSwgZnVuY3Rpb24gKHJlcXVpcmUpIHtcclxuICAgICAgICByZXR1cm4gcmVxdWlyZSgnYXBpL2NhcHRpb24vcGFyc2VyL1Z0dFBhcnNlcicpLmRlZmF1bHQ7XHJcbiAgICB9LCBmdW5jdGlvbihlcnIpe2NvbnNvbGUubG9nKGVycik7fSwgJ3Z0dHBhcnNlcicpO1xyXG59XHJcbmZ1bmN0aW9uIGxvYWRTbWlQYXJzZXIoKSB7XHJcbiAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvY2FwdGlvbi9wYXJzZXIvU21pUGFyc2VyJ10sIGZ1bmN0aW9uIChyZXF1aXJlKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlcXVpcmUoJ2FwaS9jYXB0aW9uL3BhcnNlci9TbWlQYXJzZXInKS5kZWZhdWx0O1xyXG4gICAgfSwgZnVuY3Rpb24oZXJyKXtjb25zb2xlLmxvZyhlcnIpO30sICdzbWlwYXJzZXInKTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBMb2FkZXI7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNS4gMTcuLlxyXG4gKi9cclxuaW1wb3J0IENhcHRpb25Mb2FkZXIgZnJvbSAnYXBpL2NhcHRpb24vTG9hZGVyJztcclxuaW1wb3J0IHtSRUFEWSwgRVJST1JTLCBFUlJPUiwgUExBWUVSX0NBUFRJT05fRVJST1IsIENPTlRFTlRfTUVUQSwgQ09OVEVOVF9USU1FLCBDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQsIENPTlRFTlRfQ0FQVElPTl9DSEFOR0VEfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xyXG5cclxuY29uc3QgaXNTdXBwb3J0ID0gZnVuY3Rpb24oa2luZCl7XHJcbiAgICByZXR1cm4ga2luZCA9PT0gJ3N1YnRpdGxlcycgfHwga2luZCA9PT0gJ2NhcHRpb25zJztcclxufTtcclxuXHJcbmNvbnN0IE1hbmFnZXIgPSBmdW5jdGlvbihhcGksIHBsYXlsaXN0SW5kZXgpe1xyXG5cclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIGxldCBjYXB0aW9uTGlzdCA9IFtdO1xyXG4gICAgbGV0IGN1cnJlbnRDYXB0aW9uSW5kZXggPSAtMTtcclxuXHJcbiAgICBsZXQgY2FwdGlvbkxvYWRlciA9IENhcHRpb25Mb2FkZXIoKTtcclxuICAgIGxldCBpc0Zpc3J0TG9hZCA9IHRydWU7XHJcbiAgICBsZXQgaXNTaG93aW5nID0gZmFsc2U7XHJcblxyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ2FwdGlvbiBNYW5hZ2VyID4+IFwiLCBwbGF5bGlzdEluZGV4KTtcclxuXHJcblxyXG4gICAgbGV0IGJpbmRUcmFjayA9IGZ1bmN0aW9uKHRyYWNrLCB2dHRDdWVzKXtcclxuICAgICAgICB0cmFjay5kYXRhID0gdnR0Q3VlcyB8fCBbXTtcclxuICAgICAgICB0cmFjay5uYW1lID0gdHJhY2subGFiZWwgfHwgdHJhY2submFtZSB8fCB0cmFjay5sYW5ndWFnZTtcclxuICAgICAgICB0cmFjay5pZCA9IChmdW5jdGlvbih0cmFjaywgdHJhY2tzQ291bnQpIHtcclxuICAgICAgICAgICAgdmFyIHRyYWNrSWQ7XHJcbiAgICAgICAgICAgIHZhciBwcmVmaXggPSB0cmFjay5raW5kIHx8ICdjYyc7XHJcbiAgICAgICAgICAgIGlmICh0cmFjay5kZWZhdWx0IHx8IHRyYWNrLmRlZmF1bHR0cmFjaykge1xyXG4gICAgICAgICAgICAgICAgdHJhY2tJZCA9ICdkZWZhdWx0JztcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0cmFja0lkID0gdHJhY2suaWQgfHwgKHByZWZpeCArIHRyYWNrc0NvdW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihpc0Zpc3J0TG9hZCl7XHJcbiAgICAgICAgICAgICAgICAvL1RoaXMgZXhlY3V0ZSBvbmx5IG9uLiBhbmQgdGhlbiB1c2UgZmx1c2hDYXB0aW9uTGlzdChsYXN0Q2FwdGlvbkluZGV4KTtcclxuICAgICAgICAgICAgICAgIGNoYW5nZUN1cnJlbnRDYXB0aW9uKGNhcHRpb25MaXN0Lmxlbmd0aHx8MCk7XHJcbiAgICAgICAgICAgICAgICBpc0Zpc3J0TG9hZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJhY2tJZDtcclxuICAgICAgICB9KSh0cmFjaywgY2FwdGlvbkxpc3QubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgY2FwdGlvbkxpc3QucHVzaCh0cmFjayk7XHJcbiAgICAgICAgcmV0dXJuIHRyYWNrLmlkO1xyXG4gICAgfTtcclxuICAgIGxldCBjaGFuZ2VDdXJyZW50Q2FwdGlvbiA9IGZ1bmN0aW9uKGluZGV4KXtcclxuICAgICAgICBjdXJyZW50Q2FwdGlvbkluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgYXBpLnRyaWdnZXIoQ09OVEVOVF9DQVBUSU9OX0NIQU5HRUQsIGN1cnJlbnRDYXB0aW9uSW5kZXgpO1xyXG4gICAgfTtcclxuICAgIGlmKGFwaS5nZXRDb25maWcoKS5wbGF5bGlzdCAmJiBhcGkuZ2V0Q29uZmlnKCkucGxheWxpc3QubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgbGV0IHBsYXlsaXN0ID0gYXBpLmdldENvbmZpZygpLnBsYXlsaXN0W3BsYXlsaXN0SW5kZXhdO1xyXG5cclxuICAgICAgICBpZihwbGF5bGlzdCAmJiBwbGF5bGlzdC50cmFja3MgJiYgcGxheWxpc3QudHJhY2tzLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcGxheWxpc3QudHJhY2tzLmxlbmd0aDsgaSArKyl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0cmFjayA9IHBsYXlsaXN0LnRyYWNrc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihpc1N1cHBvcnQodHJhY2sua2luZCkgJiYgISBfLmZpbmRXaGVyZSh0cmFjaywge2ZpbGUgOiB0cmFjay5maWxlfSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC5mbHVzaENhcHRpb25MaXN0KGN1cnJlbnRDYXB0aW9uSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb25Mb2FkZXIubG9hZCh0cmFjaywgdHJhY2subGFuZywgZnVuY3Rpb24odnR0Q3Vlcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHZ0dEN1ZXMgJiYgdnR0Q3Vlcy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjYXB0aW9uSWQgPSBiaW5kVHJhY2sodHJhY2ssIHZ0dEN1ZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9DQVBUSU9OX0VSUk9SXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwaS50cmlnZ2VyKEVSUk9SLCB0ZW1wRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhcGkub24oQ09OVEVOVF9USU1FLCBmdW5jdGlvbihtZXRhKXtcclxuICAgICAgICBsZXQgcG9zaXRpb24gPSBtZXRhLnBvc2l0aW9uO1xyXG4gICAgICAgIGlmKGN1cnJlbnRDYXB0aW9uSW5kZXggPiAtMSAmJiBjYXB0aW9uTGlzdFtjdXJyZW50Q2FwdGlvbkluZGV4XSl7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50Q3VlcyA9IF8uZmlsdGVyKGNhcHRpb25MaXN0W2N1cnJlbnRDYXB0aW9uSW5kZXhdLmRhdGEsIGZ1bmN0aW9uIChjdWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwb3NpdGlvbiA+PSAoY3VlLnN0YXJ0VGltZSkgJiYgKCAoIWN1ZS5lbmRUaW1lIHx8IHBvc2l0aW9uKSA8PSBjdWUuZW5kVGltZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZihjdXJyZW50Q3VlcyAmJiBjdXJyZW50Q3Vlcy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgIGFwaS50cmlnZ2VyKENPTlRFTlRfQ0FQVElPTl9DVUVfQ0hBTkdFRCwgY3VycmVudEN1ZXNbMF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG4gICAgdGhhdC5mbHVzaENhcHRpb25MaXN0ID0gKGxhc3RDYXB0aW9uSW5kZXgpID0+e1xyXG4gICAgICAgIGNhcHRpb25MaXN0ID0gW107XHJcbiAgICAgICAgY2hhbmdlQ3VycmVudENhcHRpb24obGFzdENhcHRpb25JbmRleCk7XHJcbiAgICAgICAgLy9jdXJyZW50Q2FwdGlvbkluZGV4ID0gbGFzdENhcHRpb25JbmRleDtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldENhcHRpb25MaXN0ID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIGNhcHRpb25MaXN0fHxbXTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEN1cnJlbnRDYXB0aW9uID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRDYXB0aW9uSW5kZXg7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRDdXJyZW50Q2FwdGlvbiA9IChfaW5kZXgpID0+e1xyXG4gICAgICAgIGlmKF9pbmRleCA+IC0yICYmIF9pbmRleCA8IGNhcHRpb25MaXN0Lmxlbmd0aCl7XHJcbiAgICAgICAgICAgIGNoYW5nZUN1cnJlbnRDYXB0aW9uKF9pbmRleCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aGF0LmFkZENhcHRpb24gPSAodHJhY2spID0+e1xyXG4gICAgICAgIGlmKGlzU3VwcG9ydCh0cmFjay5raW5kKSAmJiAhIF8uZmluZFdoZXJlKGNhcHRpb25Mb2FkZXIsIHtmaWxlIDogdHJhY2suZmlsZX0pKXtcclxuICAgICAgICAgICAgY2FwdGlvbkxvYWRlci5sb2FkKHRyYWNrLCBmdW5jdGlvbih2dHRDdWVzKXtcclxuICAgICAgICAgICAgICAgIGlmKHZ0dEN1ZXMgJiYgdnR0Q3Vlcy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICBiaW5kVHJhY2sodHJhY2ssIHZ0dEN1ZXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gZXJyb3JzW1BMQVlFUl9DQVBUSU9OX0VSUk9SXTtcclxuICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgYXBpLnRyaWdnZXIoRVJST1IsIHRlbXBFcnJvcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aGF0LnJlbW92ZUNhcHRpb24gPSAoaW5kZXgpID0+IHtcclxuICAgICAgICBpZihpbmRleCA+IC0xICYmIGluZGV4IDwgY2FwdGlvbkxpc3QubGVuZ3RoKXtcclxuICAgICAgICAgICAgY2FwdGlvbkxpc3Quc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNhcHRpb25MaXN0O1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT4ge1xyXG4gICAgICAgIGNhcHRpb25MaXN0ID0gW107XHJcbiAgICAgICAgY2FwdGlvbkxvYWRlciA9IG51bGw7XHJcbiAgICAgICAgYXBpLm9mZihDT05URU5UX1RJTUUsIG51bGwsIHRoYXQpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1hbmFnZXI7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNS4gMjkuLlxyXG4gKi9cclxuaW1wb3J0IHsgaG1zVG9TZWNvbmQsIHRyaW0gfSBmcm9tIFwidXRpbHMvc3RyaW5nc1wiXHJcblxyXG5mdW5jdGlvbiBfZW50cnkoZGF0YSkge1xyXG4gICAgdmFyIGVudHJ5ID0ge307XHJcbiAgICB2YXIgYXJyYXkgPSBkYXRhLnNwbGl0KCdcXHJcXG4nKTtcclxuICAgIGlmIChhcnJheS5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICBhcnJheSA9IGRhdGEuc3BsaXQoJ1xcbicpO1xyXG4gICAgfVxyXG4gICAgdmFyIGlkeCA9IDE7XHJcbiAgICBpZiAoYXJyYXlbMF0uaW5kZXhPZignIC0tPiAnKSA+IDApIHtcclxuICAgICAgICBpZHggPSAwO1xyXG4gICAgfVxyXG4gICAgaWYgKGFycmF5Lmxlbmd0aCA+IGlkeCArIDEgJiYgYXJyYXlbaWR4ICsgMV0pIHtcclxuICAgICAgICAvLyBUaGlzIGxpbmUgY29udGFpbnMgdGhlIHN0YXJ0IGFuZCBlbmQuXHJcbiAgICAgICAgdmFyIGxpbmUgPSBhcnJheVtpZHhdO1xyXG4gICAgICAgIHZhciBpbmRleCA9IGxpbmUuaW5kZXhPZignIC0tPiAnKTtcclxuICAgICAgICBpZiAoaW5kZXggPiAwKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LnN0YXJ0ID0gaG1zVG9TZWNvbmQobGluZS5zdWJzdHIoMCwgaW5kZXgpKTtcclxuICAgICAgICAgICAgZW50cnkuZW5kID0gaG1zVG9TZWNvbmQobGluZS5zdWJzdHIoaW5kZXggKyA1KSk7XHJcbiAgICAgICAgICAgIGVudHJ5LnRleHQgPSBhcnJheS5zbGljZShpZHggKyAxKS5qb2luKCdcXHJcXG4nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZW50cnk7XHJcblxyXG59XHJcblxyXG5jb25zdCBTcnRQYXJzZXIgPSBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICB2YXIgY2FwdGlvbnMgPSBbXTtcclxuXHJcbiAgICBkYXRhID0gdHJpbShkYXRhKTtcclxuXHJcbiAgICB2YXIgbGlzdCA9IGRhdGEuc3BsaXQoJ1xcclxcblxcclxcbicpO1xyXG4gICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgbGlzdCA9IGRhdGEuc3BsaXQoJ1xcblxcbicpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGxpc3RbaV0gPT09ICdXRUJWVFQnKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZW50cnkgPSBfZW50cnkobGlzdFtpXSk7XHJcbiAgICAgICAgaWYgKGVudHJ5LnRleHQpIHtcclxuICAgICAgICAgICAgY2FwdGlvbnMucHVzaChlbnRyeSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjYXB0aW9ucztcclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBTcnRQYXJzZXI7IiwiLy8gU1RBVEVcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0JVRkZFUklORyA9IFwiYnVmZmVyaW5nXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9JRExFID0gXCJpZGxlXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9DT01QTEVURSA9IFwiY29tcGxldGVcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX1BBVVNFRCA9IFwicGF1c2VkXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9QTEFZSU5HID0gXCJwbGF5aW5nXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9FUlJPUiA9IFwiZXJyb3JcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0xPQURJTkcgPSBcImxvYWRpbmdcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX1NUQUxMRUQgPSBcInN0YWxsZWRcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBTVEFURV9BRF9MT0FESU5HID0gXCJhZExvYWRpbmdcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0FEX0xPQURFRCA9IFwiYWRMb2FkZWRcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0FEX1BMQVlJTkcgPSBcImFkUGxheWluZ1wiO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfQURfUEFVU0VEID0gXCJhZFBhdXNlZFwiO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfQURfQ09NUExFVEUgPSBcImFkQ29tcGxldGVcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0FEX0VSUk9SID0gXCJhZEVycm9yXCI7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfQURfQ0xJQ0sgPSBcImFkY2xpY2tcIjtcclxuXHJcbi8vIFBST1ZJREVSXHJcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9IVE1MNSA9IFwiaHRtbDVcIjtcclxuZXhwb3J0IGNvbnN0IFBST1ZJREVSX1dFQlJUQyA9IFwid2VicnRjXCI7XHJcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9EQVNIID0gXCJkYXNoXCI7XHJcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9ITFMgPSBcImhsc1wiO1xyXG5leHBvcnQgY29uc3QgUFJPVklERVJfUlRNUCA9IFwicnRtcFwiO1xyXG5cclxuLy8gRVZFTlRTXHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0NPTVBMRVRFID0gU1RBVEVfQ09NUExFVEU7XHJcbmV4cG9ydCBjb25zdCBSRUFEWSA9IFwicmVhZHlcIjtcclxuZXhwb3J0IGNvbnN0IERFU1RST1kgPSBcImRlc3Ryb3lcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfU0VFSyA9IFwic2Vla1wiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9CVUZGRVJfRlVMTCA9IFwiYnVmZmVyRnVsbFwiO1xyXG5leHBvcnQgY29uc3QgRElTUExBWV9DTElDSyA9IFwiZGlzcGxheUNsaWNrXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0xPQURFRCA9IFwibG9hZGVkXCI7XHJcbmV4cG9ydCBjb25zdCBQTEFZTElTVF9DSEFOR0VEID0gXCJwbGF5bGlzdENoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfU0VFS0VEID0gXCJzZWVrZWRcIjtcclxuZXhwb3J0IGNvbnN0IEFMTF9QTEFZTElTVF9FTkRFRCA9IFwiYWxsUGxheWxpc3RFbmRlZFwiO1xyXG5leHBvcnQgY29uc3QgTkVUV09SS19VTlNUQUJMRUQgPSBcInVuc3RhYmxlTmV0d29ya1wiO1xyXG5leHBvcnQgY29uc3QgREFTSF9QUkVQQVJFRCA9IFwiZGFzaFByZXBhcmVkXCI7XHJcbmV4cG9ydCBjb25zdCBEQVNIX0RFU1RST1lFRCA9IFwiZGFzaERlc3Ryb3llZFwiO1xyXG5cclxuXHJcblxyXG5leHBvcnQgY29uc3QgRVJST1IgPSBcImVycm9yXCI7XHJcblxyXG4vLyBTVEFURSBPRiBQTEFZRVJcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9TVEFURSA9IFwic3RhdGVDaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfQ09NUExFVEUgPSBTVEFURV9DT01QTEVURTtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9QQVVTRSA9IFwicGF1c2VcIjtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9QTEFZID0gXCJwbGF5XCI7XHJcblxyXG5leHBvcnQgY29uc3QgUExBWUVSX0NMSUNLRUQgPSBcImNsaWNrZWRcIjtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9SRVNJWkVEID0gXCJyZXNpemVkXCI7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfTE9BRElORyA9IFwibG9hZGluZ1wiO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX0ZVTExTQ1JFRU5fUkVRVUVTVCA9IFwiZnVsbHNjcmVlblJlcXVlc3RlZFwiO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX0ZVTExTQ1JFRU5fQ0hBTkdFRCA9IFwiZnVsbHNjcmVlbkNoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9XQVJOSU5HID0gXCJ3YXJuaW5nXCI7XHJcblxyXG5leHBvcnQgY29uc3QgQURfQ0hBTkdFRCA9IFwiYWRDaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBBRF9USU1FID0gXCJhZFRpbWVcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfQlVGRkVSID0gXCJidWZmZXJDaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX1RJTUUgPSBcInRpbWVcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfUkFURV9DSEFOR0UgPSBcInJhdGVjaGFuZ2VcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfVk9MVU1FID0gXCJ2b2x1bWVDaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX01VVEUgPSBcIm11dGVcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfTUVUQSA9IFwibWV0YUNoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfU09VUkNFX0NIQU5HRUQgPSBcInNvdXJjZUNoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfTEVWRUxfQ0hBTkdFRCA9IFwicXVhbGl0eUxldmVsQ2hhbmdlZFwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9EVVJBVElPTl9DSEFOR0VEID0gXCJkdXJhdGlvbkNoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IFBMQVlCQUNLX1JBVEVfQ0hBTkdFRCA9IFwicGxheWJhY2tSYXRlQ2hhbmdlZFwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VEID0gXCJjdWVDaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0NBUFRJT05fQ0hBTkdFRCA9IFwiY2FwdGlvbkNoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfVElNRV9NT0RFX0NIQU5HRUQgPSBcInRpbWVEaXNwbGF5TW9kZUNoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IE9NRV9QMlBfTU9ERSA9IFwicDJwTW9kZVwiO1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBBRF9DTElFTlRfR09PR0xFSU1BID0gXCJnb29nbGVpbWFcIjtcclxuZXhwb3J0IGNvbnN0IEFEX0NMSUVOVF9WQVNUID0gXCJ2YXN0XCI7XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IElOSVRfVU5LTldPTl9FUlJPUiA9IDEwMDtcclxuZXhwb3J0IGNvbnN0IElOSVRfVU5TVVBQT1JUX0VSUk9SID0gMTAxO1xyXG5leHBvcnQgY29uc3QgSU5JVF9SVE1QX1NFVFVQX0VSUk9SID0gMTAyO1xyXG5leHBvcnQgY29uc3QgSU5JVF9EQVNIX1VOU1VQUE9SVCA9IDEwMztcclxuZXhwb3J0IGNvbnN0IElOSVRfQURTX0VSUk9SID0gMTA0O1xyXG5leHBvcnQgY29uc3QgSU5JVF9EQVNIX05PVEZPVU5EID0gMTA1O1xyXG5leHBvcnQgY29uc3QgSU5JVF9ITFNKU19OT1RGT1VORCA9IDEwNjtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX0VSUk9SID0gMzAwO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SID0gMzAxO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fTkVUV09SS19FUlJPUiA9IDMwMjtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUiA9IDMwMztcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9GSUxFX0VSUk9SID0gMzA0O1xyXG5leHBvcnQgY29uc3QgUExBWUVSX0NBUFRJT05fRVJST1IgPSAzMDU7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfQkFEX1JFUVVFU1RfRVJST1IgPSAzMDY7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfQVVUSF9GQUlMRURfRVJST1IgPSAzMDc7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfTk9UX0FDQ0VQVEFCTEVfRVJST1IgPSAzMDg7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1dTX0VSUk9SID0gNTAxO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SID0gNTAyO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19TRVRfUkVNT1RFX0RFU0NfRVJST1IgPSA1MDM7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX0NSRUFURV9BTlNXRVJfRVJST1IgPSA1MDQ7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SID0gNTA1O1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19ORVRXT1JLX1NMT1cgPSA1MTA7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1VORVhQRUNURURfRElTQ09OTkVDVCA9IDUxMTtcclxuXHJcbmV4cG9ydCBjb25zdCBXQVJOX01TR19NVVRFRFBMQVkgPSBcIlBsZWFzZSB0b3VjaCBoZXJlIHRvIHR1cm4gb24gdGhlIHNvdW5kLlwiO1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBVSV9JQ09OUyA9IHtcclxuICAgIHZvbHVtZV9tdXRlIDogXCJ2b2x1bWUtbXV0ZVwiLFxyXG4gICAgb3Bfd2FybmluZyA6IFwib3Atd2FybmluZ1wiXHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IEVSUk9SUyA9IHtjb2RlcyA6IFwiXCJ9O1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBTWVNURU1fVEVYVCA9IFtcclxuICAgIHtcclxuICAgICAgICBcImxhbmdcIiA6IFwiZW5cIixcclxuICAgICAgICBcInVpXCIgOiB7XHJcbiAgICAgICAgICAgIFwiY29udGV4dFwiIDogXCJBYm91dCBPdmVuUGxheWVyXCIsXHJcbiAgICAgICAgICAgIFwiY29udHJvbHNcIiA6IHtcclxuICAgICAgICAgICAgICAgIFwibGl2ZVwiIDogXCJMaXZlIFN0cmVhbWluZ1wiLFxyXG4gICAgICAgICAgICAgICAgXCJsb3dfbGF0ZW5jeV9saXZlXCIgOiBcIlN1Yi1TZWNvbmQgTGF0ZW5jeSBTdHJlYW1pbmdcIixcclxuICAgICAgICAgICAgICAgIFwibG93X2xhdGVuY3lfcDJwXCIgOiBcIlN1Yi1TZWNvbmQgTGF0ZW5jeSBQMlBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwbGF5bGlzdFwiIDogXCJQbGF5bGlzdFwiLFxyXG4gICAgICAgICAgICBcInNldHRpbmdcIiA6IHtcclxuICAgICAgICAgICAgICAgIFwidGl0bGVcIiA6IFwiU2V0dGluZ3NcIixcclxuICAgICAgICAgICAgICAgIFwic3BlZWRcIiA6IFwiU3BlZWRcIixcclxuICAgICAgICAgICAgICAgIFwic3BlZWRVbml0XCIgOiBcInhcIixcclxuICAgICAgICAgICAgICAgIFwic291cmNlXCIgOiBcIlNvdXJjZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJxdWFsaXR5XCIgOiBcIlF1YWxpdHlcIixcclxuICAgICAgICAgICAgICAgIFwiY2FwdGlvblwiIDogXCJDYXB0aW9uXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc3BsYXlcIiA6IFwiRGlzcGxheVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiYXBpXCIgOiB7XHJcbiAgICAgICAgICAgIFwibWVzc2FnZVwiIDoge1xyXG4gICAgICAgICAgICAgICAgXCJtdXRlZF9wbGF5XCIgOiBcIlBsZWFzZSB0b3VjaCBoZXJlIHRvIHR1cm4gb24gdGhlIHNvdW5kLlwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZXJyb3JcIjoge1xyXG4gICAgICAgICAgICAgICAgMTAwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJDYW4gbm90IGxvYWQgZHVlIHRvIHVua25vd24gcmVhc29ucy5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIkNhbiBub3QgbG9hZCBkdWUgdG8gdW5rbm93biByZWFzb25zLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMTAxOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDEwMSxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJDYW4gbm90IGxvYWQgZHVlIHRvIHBsYXlhYmxlIG1lZGlhIG5vdCBmb3VuZC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIkNhbiBub3QgbG9hZCBkdWUgdG8gcGxheWFibGUgbWVkaWEgbm90IGZvdW5kLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMTAyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDEwMixcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJGbGFzaCBmZXRjaGluZyBwcm9jZXNzIGFib3J0ZWQuIDwvYnI+PGEgaHJlZj0naHR0cDovL3d3dy5hZG9iZS5jb20vZ28vZ2V0Zmxhc2hwbGF5ZXInIHRhcmdldD0nX3NlbGYnPjxpbWcgc3JjPSdodHRwOi8vd3d3LmFkb2JlLmNvbS9pbWFnZXMvc2hhcmVkL2Rvd25sb2FkX2J1dHRvbnMvZ2V0X2ZsYXNoX3BsYXllci5naWYnIGFsdD0nR2V0IEFkb2JlIEZsYXNoIHBsYXllcic+PC9hPlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiSXQgbG9va3MgbGlrZSBub3QgZm91bmQgc3dmIG9yIHlvdXIgZW52aXJvbm1lbnQgaXMgbG9jYWxob3N0LlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMTAzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDEwMyxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJDYW4gbm90IGxvYWQgZHVlIHRvIGRhc2hqcy4gUGxlYXNlIGNoZWNrIHRoZSBsYXN0ZXN0IHZlcnNpb24uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJkYXNoLmpzIHZlcnNpb24gaXMgb2xkLiBQbGVhc2UgY2hlY2sgdGhlIGxhc3Rlc3QuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAxMDQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMTA0LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNhbiBub3QgbG9hZCBkdWUgdG8gZ29vZ2xlIGltYSBmb3IgQWRzLiBcIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIlBsZWFzZSBjaGVjayB0aGUgZ29vZ2xlIGltYSBsaWJyYXJ5LlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMTA1OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDEwNSxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJDYW4gbm90IGZpbmQgdGhlIGRhc2hqcy4gUGxlYXNlIGNoZWNrIHRoZSBkYXNoanMuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJOb3QgZm91bmQgZGFzaGpzLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMTA2OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDEwNixcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJDYW4gbm90IGZpbmQgdGhlIGhsc2pzLiBQbGVhc2UgY2hlY2sgdGhlIGhsc2pzLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiTm90IGZvdW5kIGhsc2pzLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMzAwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwMCxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJDYW4gbm90IHBsYXkgZHVlIHRvIHVua25vd24gcmVhc29ucy5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIkNhbiBub3QgcGxheSBkdWUgdG8gdW5rbm93biByZWFzb25zLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMzAxOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwMSxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJGZXRjaGluZyBwcm9jZXNzIGFib3J0ZWQgYnkgdXNlci5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIkZldGNoaW5nIHByb2Nlc3MgYWJvcnRlZCBieSB1c2VyLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMzAyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwMixcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJTb21lIG9mIHRoZSBtZWRpYSBjb3VsZCBub3QgYmUgZG93bmxvYWRlZCBkdWUgdG8gYSBuZXR3b3JrIGVycm9yLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiRXJyb3Igb2NjdXJyZWQgd2hlbiBkb3dubG9hZGluZy5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDMwMzoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDMsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiVW5hYmxlIHRvIGxvYWQgbWVkaWEuIFRoaXMgbWF5IGJlIGR1ZSB0byBhIHNlcnZlciBvciBuZXR3b3JrIGVycm9yLCBvciBkdWUgdG8gYW4gdW5zdXBwb3J0ZWQgZm9ybWF0LlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiRXJyb3Igb2NjdXJyZWQgd2hlbiBkZWNvZGluZy5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDMwNDoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDQsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiTWVkaWEgcGxheWJhY2sgaGFzIGJlZW4gY2FuY2VsZWQuIEl0IGxvb2tzIGxpa2UgeW91ciBtZWRpYSBpcyBjb3JydXB0ZWQgb3IgeW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdGhlIGZlYXR1cmVzIHlvdXIgbWVkaWEgdXNlcy5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIk1lZGlhIHBsYXliYWNrIG5vdCBzdXBwb3J0ZWQuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAzMDU6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMzA1LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNhbiBub3QgbG9hZCBjYXB0aW9ucyBkdWUgdG8gdW5rbm93biByZWFzb25zLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiQ2FuIG5vdCBsb2FkIGNhcHRpb25zIGR1ZSB0byB1bmtub3duIHJlYXNvbnMuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAzMDY6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMzA2LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIlVuYWJsZSB0byBsb2FkIG1lZGlhLiBUaGlzIG1heSBiZSBkdWUgdG8gYSBzZXJ2ZXIgb3IgbmV0d29yayBlcnJvciwgb3IgZHVlIHRvIGFuIHVuc3VwcG9ydGVkIGZvcm1hdC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIlRoZSBzZXJ2ZXIgY2Fubm90IG9yIHdpbGwgbm90IHByb2Nlc3MgdGhlIHJlcXVlc3QuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAzMDc6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMzA3LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIlVuYWJsZSB0byBsb2FkIG1lZGlhLiBUaGlzIG1heSBiZSBkdWUgdG8gYSBzZXJ2ZXIgb3IgbmV0d29yayBlcnJvciwgb3IgZHVlIHRvIGFuIHVuc3VwcG9ydGVkIGZvcm1hdC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIlRoZSBzZXJ2ZXIgcmVmdXNlZCB0aGUgcmVxdWVzdC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDMwODoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDgsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiVW5hYmxlIHRvIGxvYWQgbWVkaWEuIFRoaXMgbWF5IGJlIGR1ZSB0byBhIHNlcnZlciBvciBuZXR3b3JrIGVycm9yLCBvciBkdWUgdG8gYW4gdW5zdXBwb3J0ZWQgZm9ybWF0LlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiVGhlIHNlcnZlciBkbyBub3QgYWNjZXB0IHRoZSByZXF1ZXN0LlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNTAxOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDUwMSxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJDb25uZWN0aW9uIHdpdGggbG93LWxhdGVuY3koT01FKSBzZXJ2ZXIgZmFpbGVkLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiV2ViU29ja2V0IGNvbm5lY3Rpb24gZmFpbGVkLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNTAyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDUwMixcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJDb25uZWN0aW9uIHdpdGggbG93LWxhdGVuY3koT01FKSBzZXJ2ZXIgZmFpbGVkLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiV2ViUlRDIGFkZEljZUNhbmRpZGF0ZSBmYWlsZWQuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA1MDM6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogNTAzLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNvbm5lY3Rpb24gd2l0aCBsb3ctbGF0ZW5jeShPTUUpIHNlcnZlciBmYWlsZWQuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJXZWJSVEMgc2V0UmVtb3RlRGVzY3JpcHRpb24gZmFpbGVkLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNTA0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDUwNCxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJDb25uZWN0aW9uIHdpdGggbG93LWxhdGVuY3koT01FKSBzZXJ2ZXIgZmFpbGVkLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiV2ViUlRDIHBlZXIgY3JlYXRlT2ZmZXIgZmFpbGVkLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNTA1OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDUwNSxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJDb25uZWN0aW9uIHdpdGggbG93LWxhdGVuY3koT01FKSBzZXJ2ZXIgZmFpbGVkLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiV2ViUlRDIHNldExvY2FsRGVzY3JpcHRpb24gZmFpbGVkLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNTEwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDUxMCxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJOZXR3b3JrIGNvbm5lY3Rpb24gaXMgdW5zdGFibGUuIENoZWNrIHRoZSBuZXR3b3JrIGNvbm5lY3Rpb24uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJOZXR3b3JrIGlzIHNsb3cuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA1MTE6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogNTExLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNvbm5lY3Rpb24gd2l0aCBsb3ctbGF0ZW5jeShPTUUpIHRlcm1pbmF0ZWQgdW5leHBlY3RlZGx5LlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiVW5leHBlY3RlZCBlbmQgb2YgY29ubmVjdGlvbi5cIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImxhbmdcIiA6IFwia29cIixcclxuICAgICAgICBcInVpXCIgOiB7XHJcbiAgICAgICAgICAgIFwiY29udGV4dFwiIDogXCLsmKTruJDtlIzroIjsnbTslrTsl5Ag6rSA7ZWY7JesXCIsXHJcbiAgICAgICAgICAgIFwiY29udHJvbHNcIiA6IHtcclxuICAgICAgICAgICAgICAgIFwibGl2ZVwiIDogXCLrnbzsnbTruIxcIixcclxuICAgICAgICAgICAgICAgIFwibG93X2xhdGVuY3lfbGl2ZVwiIDogXCLstIjsoIDsp4Dsl7Ag65287J2067iMXCIsXHJcbiAgICAgICAgICAgICAgICBcImxvd19sYXRlbmN5X3AycFwiIDogXCLstIjsoIDsp4Dsl7AgUDJQXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicGxheWxpc3RcIiA6IFwi7ZSM66CI7J2066as7Iqk7Yq4XCIsXHJcbiAgICAgICAgICAgIFwic2V0dGluZ1wiIDoge1xyXG4gICAgICAgICAgICAgICAgXCJ0aXRsZVwiIDogXCLshKTsoJVcIixcclxuICAgICAgICAgICAgICAgIFwic3BlZWRcIiA6IFwi7J6s7IOdIOyGjeuPhFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzcGVlZFVuaXRcIiA6IFwieFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzb3VyY2VcIiA6IFwi7IaM7IqkXCIsXHJcbiAgICAgICAgICAgICAgICBcInF1YWxpdHlcIiA6IFwi7ZKI7KeIXCIsXHJcbiAgICAgICAgICAgICAgICBcImNhcHRpb25cIiA6IFwi7J6Q66eJXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc3BsYXlcIiA6IFwi7ZGc7IucXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJhcGlcIiA6IHtcclxuICAgICAgICAgICAgXCJtZXNzYWdlXCIgOiB7XHJcbiAgICAgICAgICAgICAgICBcIm11dGVkX3BsYXlcIiA6IFwi64iM65+s7IScIOyGjOumrCDsvJzquLBcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImVycm9yXCI6IHtcclxuICAgICAgICAgICAgICAgIDEwMDoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi7JWMIOyImCDsl4bripQg7J207Jyg66GcIOuhnOuTnCDtlaAg7IiYIOyXhuyKteuLiOuLpC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIuyVjCDsiJgg7JeG64qUIOydtOycoOuhnCDroZzrk5wg7ZWgIOyImCDsl4bsirXri4jri6QuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAxMDE6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMTAxLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIuyngOybkOuQmOuKlCDrr7jrlJTslrTrpbwg7LC+7KeAIOuqu+2VtCDroZzrk5wg7ZWgIOyImCDsl4bsirXri4jri6QuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJDYW4gbm90IGxvYWQgZHVlIHRvIHBsYXlhYmxlIG1lZGlhIG5vdCBmb3VuZC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDEwMjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAxMDIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi7ZSM66CI7IucIOuhnOuTnOqwgCDspJHri6gg65CY7JeI7Iq164uI64ukLiA8L2JyPjxhIGhyZWY9J2h0dHA6Ly93d3cuYWRvYmUuY29tL2dvL2dldGZsYXNocGxheWVyJyB0YXJnZXQ9J19zZWxmJz48aW1nIHNyYz0naHR0cDovL3d3dy5hZG9iZS5jb20vaW1hZ2VzL3NoYXJlZC9kb3dubG9hZF9idXR0b25zL2dldF9mbGFzaF9wbGF5ZXIuZ2lmJyBhbHQ9J0dldCBBZG9iZSBGbGFzaCBwbGF5ZXInPjwvYT5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIkl0IGxvb2tzIGxpa2Ugbm90IGZvdW5kIHN3ZiBvciB5b3VyIGVudmlyb25tZW50IGlzIGxvY2FsaG9zdC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDEwMzoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAxMDMsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiRGFzaEpT66GcIOyduO2VtCDroZzrk5wg7ZWgIOyImCDsl4bsirXri4jri6QuIGRhc2hqcyDrsoTsoITsnYQg7ZmV7J247ZW07KO87IS47JqULlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiZGFzaC5qcyB2ZXJzaW9uIGlzIG9sZC4gUGxlYXNlIGNoZWNrIHRoZSBsYXN0ZXN0LlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMTA0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDEwNCxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJHb29nbGUgSU1BIOudvOydtOu4jOufrOumrOqwgCDsl4bslrQg66Gc65OcIO2VoCDsiJgg7JeG7Iq164uI64ukLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiUGxlYXNlIGNoZWNrIHRoZSBnb29nbGUgaW1hIGxpYnJhcnkuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAxMDU6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMTA1LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkRhc2hKUyDrnbzsnbTruIzrn6zrpqzqsIAg7JeG7Ja0IOuhnOuTnCDtlaAg7IiYIOyXhuyKteuLiOuLpC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIk5vdCBmb3VuZCBkYXNoanMuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAxMDY6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMTA2LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkhMU0pTIOudvOydtOu4jOufrOumrOqwgCDsl4bslrQg66Gc65OcIO2VoCDsiJgg7JeG7Iq164uI64ukLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiTm90IGZvdW5kIGhsc2pzLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMzAwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwMCxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCLslYwg7IiYIOyXhuuKlCDsnbTsnKDroZwg7J6s7IOd7ZWgIOyImCDsl4bsirXri4jri6QuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJDYW4gbm90IHBsYXkgZHVlIHRvIHVua25vd24gcmVhc29ucy5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDMwMToge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDEsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi7IKs7Jqp7J6Q7JeQIOydmO2VnCDtlITroZzshLjsiqQg7KSR64uoLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiRmV0Y2hpbmcgcHJvY2VzcyBhYm9ydGVkIGJ5IHVzZXIuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAzMDI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMzAyLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIuuEpO2KuOybjO2BrCDsmKTrpZjroZwg7J247ZW0IOydvOu2gCDrr7jrlJTslrTrpbwg64uk7Jq066Gc65OcIO2VoCDsiJgg7JeG7Iq164uI64ukLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiRXJyb3Igb2NjdXJyZWQgd2hlbiBkb3dubG9hZGluZy5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDMwMzoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDMsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi66+465SU7Ja066W8IOuhnOuTnCDtlaAg7IiYIOyXhuyKteuLiOuLpC4g7ISc67KEIOuYkOuKlCDrhKTtirjsm4ztgawg7Jik66WYIOuYkOuKlCDsp4Dsm5DrkJjsp4Ag7JWK64qUIO2YleyLneycvOuhnCDsnbjtlbQg67Cc7IOd7ZWgIOyImCDsnojsirXri4jri6QuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJFcnJvciBvY2N1cnJlZCB3aGVuIGRlY29kaW5nLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMzA0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwNCxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCLrr7jrlJTslrQg7J6s7IOd7J20IOy3qOyGjOuQmOyXiOyKteuLiOuLpC4g66+465SU7Ja06rCAIOyGkOyDgeuQmOyXiOqxsOuCmCDruIzrnbzsmrDsoIDqsIAg66+465SU7Ja07JeQ7IScIOyCrOyaqe2VmOuKlCDquLDriqXsnYQg7KeA7JuQ7ZWY7KeAIOyViuuKlCDqsoMg6rCZ7Iq164uI64ukLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiTWVkaWEgcGxheWJhY2sgbm90IHN1cHBvcnRlZC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDMwNToge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDUsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi7JWMIOyImCDsl4bripQg7J207Jyg66GcIOyekOunieydhCDroZzrk5wg7ZWgIOyImCDsl4bsirXri4jri6QuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJDYW4gbm90IGxvYWQgY2FwdGlvbnMgZHVlIHRvIHVua25vd24gcmVhc29ucy5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDMwNjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDYsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi66+465SU7Ja066W8IOuhnOuTnCDtlaAg7IiYIOyXhuyKteuLiOuLpC4g7ISc67KEIOuYkOuKlCDrhKTtirjsm4ztgawg7Jik66WYIOuYkOuKlCDsp4Dsm5DrkJjsp4Ag7JWK64qUIO2YleyLneycvOuhnCDsnbjtlbQg67Cc7IOd7ZWgIOyImCDsnojsirXri4jri6QuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJUaGUgc2VydmVyIGNhbm5vdCBvciB3aWxsIG5vdCBwcm9jZXNzIHRoZSByZXF1ZXN0LlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMzA3OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwNyxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCLrr7jrlJTslrTrpbwg66Gc65OcIO2VoCDsiJgg7JeG7Iq164uI64ukLiDshJzrsoQg65iQ64qUIOuEpO2KuOybjO2BrCDsmKTrpZgg65iQ64qUIOyngOybkOuQmOyngCDslYrripQg7ZiV7Iud7Jy866GcIOyduO2VtCDrsJzsg53tlaAg7IiYIOyeiOyKteuLiOuLpC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIlRoZSBzZXJ2ZXIgcmVmdXNlZCB0aGUgcmVxdWVzdC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDMwODoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDgsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi66+465SU7Ja066W8IOuhnOuTnCDtlaAg7IiYIOyXhuyKteuLiOuLpC4g7ISc67KEIOuYkOuKlCDrhKTtirjsm4ztgawg7Jik66WYIOuYkOuKlCDsp4Dsm5DrkJjsp4Ag7JWK64qUIO2YleyLneycvOuhnCDsnbjtlbQg67Cc7IOd7ZWgIOyImCDsnojsirXri4jri6QuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJUaGUgc2VydmVyIGRvIG5vdCBhY2NlcHQgdGhlIHJlcXVlc3QuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA1MDE6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogNTAxLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIuybueyGjOy8kyDsl7DqsrAg7Iuk7YyoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJXZWJTb2NrZXQgY29ubmVjdGlvbiBmYWlsZWQuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA1MDI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogNTAyLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIuyggOyngOyXsChPTUUpIOyEnOuyhOyZgCDsl7DqsrDsl5Ag7Iuk7Yyo7ZaI7Iq164uI64ukLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiV2ViUlRDIGFkZEljZUNhbmRpZGF0ZSBmYWlsZWQuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA1MDM6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogNTAzLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIuyggOyngOyXsChPTUUpIOyEnOuyhOyZgCDsl7DqsrDsl5Ag7Iuk7Yyo7ZaI7Iq164uI64ukLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiV2ViUlRDIHNldFJlbW90ZURlc2NyaXB0aW9uIGZhaWxlZC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDUwNDoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiA1MDQsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi7KCA7KeA7JewKE9NRSkg7ISc67KE7JmAIOyXsOqysOyXkCDsi6TtjKjtlojsirXri4jri6QuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJXZWJSVEMgcGVlciBjcmVhdGVPZmZlciBmYWlsZWQuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA1MDU6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogNTA1LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIuyggOyngOyXsChPTUUpIOyEnOuyhOyZgCDsl7DqsrDsl5Ag7Iuk7Yyo7ZaI7Iq164uI64ukLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiV2ViUlRDIHNldExvY2FsRGVzY3JpcHRpb24gZmFpbGVkLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNTEwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDUxMCxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCLrhKTtirjsm4ztgawg7Jew6rKw7J20IOu2iOyViOygle2VqeuLiOuLpC4g64Sk7Yq47JuM7YGsIOyXsOqysOydhCDtmZXsnbjtlZjsi63si5zsmKQuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJOZXR3b3JrIGlzIHNsb3cuXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXTsiLCIvKipcclxuICogQGJyaWVmICAg66+465SU7Ja0IOyXmOumrOuovO2KuOulvCDqtIDrpqztlZjripQg6rCd7LK0LiDtmITsnqzripQg7ZWY64qUIOydvOydtCDrp47sp4Ag7JWK64ukLlxyXG4gKiBAcGFyYW0gICB7ZWxlbWVudH0gICBjb250YWluZXIgICBkb20gZWxlbWVudFxyXG4gKlxyXG4gKiAqL1xyXG5pbXBvcnQge2dldEJyb3dzZXJ9IGZyb20gXCJ1dGlscy9icm93c2VyXCI7XHJcbmltcG9ydCB7UFJPVklERVJfREFTSCwgUFJPVklERVJfSExTLCBQUk9WSURFUl9XRUJSVEMsIFBST1ZJREVSX0hUTUw1LCBQUk9WSURFUl9SVE1QfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQgTEEkIGZyb20gXCJ1dGlscy9saWtlQSQuanNcIjtcclxuaW1wb3J0IHtnZXRTY3JpcHRQYXRofSBmcm9tICd1dGlscy93ZWJwYWNrJztcclxuaW1wb3J0IHt2ZXJzaW9ufSBmcm9tICd2ZXJzaW9uJztcclxuLy9Ub0RvIDogUmVzdHJ1Y3R1cmluZ1xyXG5cclxuY29uc3QgTWFuYWdlciA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgYnJvd3NlckluZm8pe1xyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG4gICAgY29uc3QgU1dGUGF0aCA9IGdldFNjcmlwdFBhdGgoJ292ZW5wbGF5ZXIuanMnKStcIk92ZW5QbGF5ZXJGbGFzaC5zd2Y/dj1cIit2ZXJzaW9uO1xyXG4gICAgbGV0IHJvb3RJZCA9IGNvbnRhaW5lci5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBhcmVudC1pZFwiKTtcclxuICAgIGxldCAkY29udGFpbmVyID0gTEEkKGNvbnRhaW5lcik7XHJcbiAgICBsZXQgdmlkZW9FbGVtZW50ID0gXCJcIjtcclxuXHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJNZWRpYU1hbmFnZXIgbG9hZGVkLiBicm93c2VyIDogXCIsIGJyb3dzZXJJbmZvICk7XHJcblxyXG4gICAgY29uc3QgY3JlYXRlSHRtbFZpZGVvID0gZnVuY3Rpb24oaXNMb29wLCBpc0F1dG9TdGFydCl7XHJcblxyXG4gICAgICAgIHZpZGVvRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XHJcbiAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnZGlzYWJsZXJlbW90ZXBsYXliYWNrJywgJycpO1xyXG4gICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3dlYmtpdC1wbGF5c2lubGluZScsICd0cnVlJyk7XHJcbiAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgncGxheXNpbmxpbmUnLCAndHJ1ZScpO1xyXG4gICAgICAgIGlmKGlzTG9vcCl7XHJcbiAgICAgICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2xvb3AnLCAnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGlzQXV0b1N0YXJ0KSB7XHJcbiAgICAgICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2F1dG9wbGF5JywgJycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkY29udGFpbmVyLmFwcGVuZCh2aWRlb0VsZW1lbnQpO1xyXG5cclxuICAgICAgICByZXR1cm4gdmlkZW9FbGVtZW50O1xyXG4gICAgfTtcclxuICAgIGNvbnN0IGNyZWF0ZUZsYXNoVmlkZW8gPSBmdW5jdGlvbihpc0xvb3AsIGJ1ZmZlclRpbWUsIGJ1ZmZlclRpbWVNYXgpe1xyXG4gICAgICAgIGxldCBtb3ZpZSwgZmxhc2h2YXJzLCBhbGxvd3NjcmlwdGFjY2VzcywgYWxsb3dmdWxsc2NyZWVuLCBxdWFsaXR5LCBuYW1lLCBtZW51LCBxdWFsLCBiZ2NvbG9yLCBsb29wLCB3bW9kZSA7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTWVkaWFNYW5hZ2VyIEZsYXNoIGJ1ZmZlciBzZXR0aW5nIDogXCIsIGJ1ZmZlclRpbWUsIGJ1ZmZlclRpbWVNYXgpO1xyXG4gICAgICAgIG1vdmllID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICBtb3ZpZS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnbW92aWUnKTtcclxuICAgICAgICBtb3ZpZS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgU1dGUGF0aCk7XHJcblxyXG4gICAgICAgIGZsYXNodmFycyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgZmxhc2h2YXJzLnNldEF0dHJpYnV0ZSgnbmFtZScsICdmbGFzaHZhcnMnKTtcclxuICAgICAgICAvL3BsYXllcklkIGlzIHRvIHVzZSBTV0YgZm9yIEV4dGVybmFsSW50ZXJmYWNlLmNhbGwoKS5cclxuICAgICAgICBmbGFzaHZhcnMuc2V0QXR0cmlidXRlKCd2YWx1ZScsIGBwbGF5ZXJJZD0ke3Jvb3RJZH0mYnVmZmVyVGltZT0ke2J1ZmZlclRpbWV9JmJ1ZmZlck1heFRpbWU9JHtidWZmZXJUaW1lTWF4fWApO1xyXG5cclxuICAgICAgICBhbGxvd3NjcmlwdGFjY2VzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgYWxsb3dzY3JpcHRhY2Nlc3Muc2V0QXR0cmlidXRlKCduYW1lJywgJ2FsbG93c2NyaXB0YWNjZXNzJyk7XHJcbiAgICAgICAgYWxsb3dzY3JpcHRhY2Nlc3Muc2V0QXR0cmlidXRlKCd2YWx1ZScsICdhbHdheXMnKTtcclxuXHJcbiAgICAgICAgYWxsb3dmdWxsc2NyZWVuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICBhbGxvd2Z1bGxzY3JlZW4uc2V0QXR0cmlidXRlKCduYW1lJywgJ2FsbG93ZnVsbHNjcmVlbicpO1xyXG4gICAgICAgIGFsbG93ZnVsbHNjcmVlbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ3RydWUnKTtcclxuXHJcbiAgICAgICAgcXVhbGl0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgcXVhbGl0eS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAncXVhbGl0eScpO1xyXG4gICAgICAgIHF1YWxpdHkuc2V0QXR0cmlidXRlKCd2YWx1ZScsICdoZWlnaHQnKTtcclxuXHJcbiAgICAgICAgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgbmFtZS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnbmFtZScpO1xyXG4gICAgICAgIG5hbWUuc2V0QXR0cmlidXRlKCd2YWx1ZScsIHJvb3RJZCtcIi1mbGFzaFwiKTtcclxuXHJcbiAgICAgICAgbWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgbWVudS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnbWVudScpO1xyXG4gICAgICAgIG1lbnUuc2V0QXR0cmlidXRlKCd2YWx1ZScsICdmYWxzZScpO1xyXG5cclxuICAgICAgICBxdWFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICBxdWFsLnNldEF0dHJpYnV0ZSgnbmFtZScsICdxdWFsaXR5Jyk7XHJcbiAgICAgICAgcXVhbC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ2hpZ2gnKTtcclxuXHJcbiAgICAgICAgYmdjb2xvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgYmdjb2xvci5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnYmdjb2xvcicpO1xyXG4gICAgICAgIGJnY29sb3Iuc2V0QXR0cmlidXRlKCd2YWx1ZScsICcjMDAwMDAwJyk7XHJcblxyXG4gICAgICAgIHdtb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICB3bW9kZS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnd21vZGUnKTtcclxuICAgICAgICB3bW9kZS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ29wYXF1ZScpO1xyXG5cclxuICAgICAgICAvKmxldCBhbGxvd0J1dHRvbiA9IGA8YSBocmVmPVwiaHR0cDovL3d3dy5hZG9iZS5jb20vZ28vZ2V0Zmxhc2hwbGF5ZXJcIj48aW1nIHNyYz1cImh0dHA6Ly93d3cuYWRvYmUuY29tL2ltYWdlcy9zaGFyZWQvZG93bmxvYWRfYnV0dG9ucy9nZXRfZmxhc2hfcGxheWVyLmdpZlwiIGFsdD1cIkdldCBBZG9iZSBGbGFzaCBwbGF5ZXJcIj48L2E+YDtcclxuICAgICAgICBtZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBtZXNzYWdlLmlubmVySFRNTCA9IGFsbG93QnV0dG9uOyovXHJcblxyXG4gICAgICAgIGlmKGlzTG9vcCl7XHJcbiAgICAgICAgICAgIGxvb3AgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgICAgICBsb29wLnNldEF0dHJpYnV0ZSgnbmFtZScsICdsb29wJyk7XHJcbiAgICAgICAgICAgIGxvb3Auc2V0QXR0cmlidXRlKCd2YWx1ZScsICd0cnVlJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2aWRlb0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvYmplY3QnKTtcclxuICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsIHJvb3RJZCtcIi1mbGFzaFwiKTtcclxuICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCduYW1lJywgcm9vdElkK1wiLWZsYXNoXCIpO1xyXG4gICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzEwMCUnKTtcclxuICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnMTAwJScpO1xyXG4gICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3NjYWxlJywgJ2RlZmF1bHQnKTtcclxuICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCd3bW9kZScsICdvcGFxdWUnKTtcclxuXHJcbiAgICAgICAgaWYoYnJvd3NlckluZm8uYnJvd3NlciA9PT0gXCJNaWNyb3NvZnQgSW50ZXJuZXQgRXhwbG9yZXJcIiAmJiBicm93c2VySW5mby5icm93c2VyTWFqb3JWZXJzaW9uIDw9IDkgKXtcclxuICAgICAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnY2xhc3NpZCcsICdjbHNpZDpEMjdDREI2RS1BRTZELTExY2YtOTZCOC00NDQ1NTM1NDAwMDAnKTtcclxuICAgICAgICAgICAgdmlkZW9FbGVtZW50LmFwcGVuZENoaWxkKG1vdmllKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YScsIFNXRlBhdGgpO1xyXG4gICAgICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2FwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGlzTG9vcCl7XHJcbiAgICAgICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChsb29wKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZCh3bW9kZSk7XHJcbiAgICAgICAgdmlkZW9FbGVtZW50LmFwcGVuZENoaWxkKGJnY29sb3IpO1xyXG4gICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChxdWFsKTtcclxuICAgICAgICB2aWRlb0VsZW1lbnQuYXBwZW5kQ2hpbGQoYWxsb3dmdWxsc2NyZWVuKTtcclxuICAgICAgICB2aWRlb0VsZW1lbnQuYXBwZW5kQ2hpbGQoYWxsb3dzY3JpcHRhY2Nlc3MpO1xyXG4gICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChmbGFzaHZhcnMpO1xyXG4gICAgICAgIC8vdmlkZW9FbGVtZW50LmFwcGVuZENoaWxkKG1lc3NhZ2UpO1xyXG5cclxuICAgICAgICAkY29udGFpbmVyLmFwcGVuZCh2aWRlb0VsZW1lbnQpO1xyXG5cclxuICAgICAgICByZXR1cm4gdmlkZW9FbGVtZW50O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmNyZWF0ZU1lZGlhID0gKHByb3ZpZGVyTmFtZSAsIHBsYXllckNvbmZpZykgID0+IHtcclxuICAgICAgICBpZiggcHJvdmlkZXJOYW1lID09PSBQUk9WSURFUl9SVE1QICl7XHJcbiAgICAgICAgICAgIGlmKHZpZGVvRWxlbWVudCl7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmVtcHR5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUZsYXNoVmlkZW8ocGxheWVyQ29uZmlnLmlzTG9vcCgpLCBwbGF5ZXJDb25maWcuZ2V0UnRtcEJ1ZmZlclRpbWUoKSwgcGxheWVyQ29uZmlnLmdldFJ0bXBCdWZmZXJUaW1lTWF4KCkpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAvLyBpZih2aWRlb0VsZW1lbnQpe1xyXG4gICAgICAgICAgICAvLyAgICAgLy8gdGhhdC5lbXB0eSgpO1xyXG4gICAgICAgICAgICAvLyAgICAgLy9yZXVzZSB2aWRlbyBlbGVtZW50LlxyXG4gICAgICAgICAgICAvLyAgICAgLy9iZWNhdXNlIHBsYXlsaXN0IGlzIGF1dG8gbmV4dCBwbGF5aW5nLlxyXG4gICAgICAgICAgICAvLyAgICAgLy9Pbmx5IHNhbWUgdmlkZW8gZWxlbWVudCBkb2VzIG5vdCByZXF1aXJlIFVzZXIgSW50ZXJhY3Rpb24gRXJyb3IuXHJcbiAgICAgICAgICAgIC8vICAgICByZXR1cm4gdmlkZW9FbGVtZW50O1xyXG4gICAgICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAgICAgLy8gICAgIHJldHVybiBjcmVhdGVIdG1sVmlkZW8ocGxheWVyQ29uZmlnLmlzTG9vcCgpLCBwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSk7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgdGhhdC5lbXB0eSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlSHRtbFZpZGVvKHBsYXllckNvbmZpZy5pc0xvb3AoKSwgcGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGF0LmNyZWF0ZUFkQ29udGFpbmVyID0gKCkgPT4ge1xyXG4gICAgICAgIGxldCBhZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGFkQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnb3AtYWRzJyk7XHJcbiAgICAgICAgJGNvbnRhaW5lci5hcHBlbmQoYWRDb250YWluZXIpO1xyXG5cclxuICAgICAgICByZXR1cm4gYWRDb250YWluZXI7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB0aGF0LmVtcHR5ID0gKCkgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTWVkaWFNYW5hZ2VyIHJlbW92ZUVsZW1lbnQoKVwiKTtcclxuICAgICAgICAkY29udGFpbmVyLnJlbW92ZUNoaWxkKHZpZGVvRWxlbWVudCk7XHJcbiAgICAgICAgdmlkZW9FbGVtZW50ID0gbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XHJcbiAgICAgICAgJGNvbnRhaW5lci5yZW1vdmVDaGlsZCgpO1xyXG4gICAgICAgICRjb250YWluZXIgPSBudWxsO1xyXG4gICAgICAgIHZpZGVvRWxlbWVudCA9IG51bGw7XHJcbiAgICAgICAgcm9vdElkID0gbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYW5hZ2VyO1xyXG4iLCJpbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xyXG5pbXBvcnQge2lzUnRtcCwgaXNXZWJSVEMsIGlzRGFzaCwgaXNIbHMgfSBmcm9tIFwidXRpbHMvdmFsaWRhdG9yXCI7XHJcbmltcG9ydCB7ZXh0cmFjdEV4dGVuc2lvbiAsdHJpbX0gZnJvbSBcIi4uLy4uL3V0aWxzL3N0cmluZ3NcIjtcclxuaW1wb3J0IFN1cHBvcnRDaGVja2VyIGZyb20gXCIuLi9TdXBwb3J0Q2hlY2tlclwiO1xyXG5pbXBvcnQge1BMQVlMSVNUX0NIQU5HRUR9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgVGhpcyBtYW5hZ2VzIFBsYXlsaXN0IG9yIFNvdXJjZXMuXHJcbiAqIEBwYXJhbVxyXG4gKlxyXG4gKiAqL1xyXG5jb25zdCBNYW5hZ2VyID0gZnVuY3Rpb24ocHJvdmlkZXIpe1xyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG4gICAgbGV0IGN1cnJlbnRQbGF5bGlzdEl0ZW0gPSBbXTtcclxuICAgIGxldCBzcGVjID0ge1xyXG4gICAgICAgIHBsYXlsaXN0IDogW10sXHJcbiAgICAgICAgY3VycmVudEluZGV4IDogMFxyXG4gICAgfTtcclxuICAgIGxldCBzdXBwb3J0Q2hlY2tlciA9IFN1cHBvcnRDaGVja2VyKCk7XHJcblxyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIGxvYWRlZC5cIik7XHJcblxyXG4gICAgY29uc3QgbWFrZVByZXR0eVNvdXJjZSA9IGZ1bmN0aW9uKHNvdXJjZV8pe1xyXG4gICAgICAgIGlmICghc291cmNlXyB8fCAhc291cmNlXy5maWxlICYmICEoc291cmNlXy5ob3N0IHx8IHNvdXJjZV8uYXBwbGljYXRpb24gfHwgc291cmNlXy5zdHJlYW0pKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzb3VyY2UgPSBPYmplY3QuYXNzaWduKHt9LCB7ICdkZWZhdWx0JzogZmFsc2UgfSwgc291cmNlXyk7XHJcbiAgICAgICAgc291cmNlLmZpbGUgPSB0cmltKCcnICsgc291cmNlLmZpbGUpO1xyXG5cclxuICAgICAgICBpZihzb3VyY2UuaG9zdCAmJiBzb3VyY2UuYXBwbGljYXRpb24gJiYgc291cmNlLnN0cmVhbSl7XHJcbiAgICAgICAgICAgIHNvdXJjZS5maWxlID0gc291cmNlLmhvc3QgKyBcIi9cIiArIHNvdXJjZS5hcHBsaWNhdGlvbiArIFwiL3N0cmVhbS9cIiArIHNvdXJjZS5zdHJlYW07XHJcbiAgICAgICAgICAgIGRlbGV0ZSBzb3VyY2UuaG9zdDtcclxuICAgICAgICAgICAgZGVsZXRlIHNvdXJjZS5hcHBsaWNhdGlvbjtcclxuICAgICAgICAgICAgZGVsZXRlIHNvdXJjZS5zdHJlYW07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBtaW1ldHlwZVJlZ0V4ID0gL15bXi9dK1xcLyg/OngtKT8oW14vXSspJC87XHJcblxyXG4gICAgICAgIGlmIChtaW1ldHlwZVJlZ0V4LnRlc3Qoc291cmNlLnR5cGUpKSB7XHJcbiAgICAgICAgICAgIC8vIGlmIHR5cGUgaXMgZ2l2ZW4gYXMgYSBtaW1ldHlwZVxyXG4gICAgICAgICAgICBzb3VyY2UubWltZVR5cGUgPSBzb3VyY2UudHlwZTtcclxuICAgICAgICAgICAgc291cmNlLnR5cGUgPSBzb3VyY2UudHlwZS5yZXBsYWNlKG1pbWV0eXBlUmVnRXgsICckMScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoaXNSdG1wKHNvdXJjZS5maWxlKSl7XHJcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ3J0bXAnO1xyXG4gICAgICAgIH1lbHNlIGlmKGlzV2ViUlRDKHNvdXJjZS5maWxlKSl7XHJcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ3dlYnJ0Yyc7XHJcbiAgICAgICAgfWVsc2UgaWYoaXNIbHMoc291cmNlLmZpbGUsIHNvdXJjZS50eXBlKSl7XHJcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ2hscyc7XHJcbiAgICAgICAgfWVsc2UgaWYoaXNEYXNoKHNvdXJjZS5maWxlLCBzb3VyY2UudHlwZSkpe1xyXG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdkYXNoJztcclxuICAgICAgICB9ZWxzZSBpZiAoIXNvdXJjZS50eXBlKSB7XHJcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gZXh0cmFjdEV4dGVuc2lvbihzb3VyY2UuZmlsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc291cmNlLmxvd0xhdGVuY3kpIHtcclxuICAgICAgICAgICAgc291cmNlLmxvd0xhdGVuY3kgPSBzb3VyY2UubG93TGF0ZW5jeTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghc291cmNlLnR5cGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gbm9ybWFsaXplIHR5cGVzXHJcbiAgICAgICAgc3dpdGNoIChzb3VyY2UudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdtM3U4JzpcclxuICAgICAgICAgICAgY2FzZSAndm5kLmFwcGxlLm1wZWd1cmwnOlxyXG4gICAgICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnaGxzJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdtNGEnOlxyXG4gICAgICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnYWFjJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzbWlsJzpcclxuICAgICAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ3J0bXAnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcclxuICAgICAgICAgICAgaWYgKHNvdXJjZVtrZXldID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHNvdXJjZVtrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBzb3VyY2U7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHRoYXQuaW5pdFBsYXlsaXN0ID0ocGxheWxpc3QsIHBsYXllckNvbmZpZykgPT57XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBzZXRQbGF5bGlzdCgpIFwiLCBwbGF5bGlzdCk7XHJcbiAgICAgICAgY29uc3QgcHJldHRpZWRQbGF5bGlzdCA9IChfLmlzQXJyYXkocGxheWxpc3QpID8gcGxheWxpc3QgOiBbcGxheWxpc3RdKS5tYXAoZnVuY3Rpb24oaXRlbSl7XHJcbiAgICAgICAgICAgIGlmKCFfLmlzQXJyYXkoaXRlbS50cmFja3MpKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgaXRlbS50cmFja3M7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHBsYXlsaXN0SXRlbSA9IE9iamVjdC5hc3NpZ24oe30se1xyXG4gICAgICAgICAgICAgICAgc291cmNlczogW10sXHJcbiAgICAgICAgICAgICAgICB0cmFja3M6IFtdLFxyXG4gICAgICAgICAgICAgICAgdGl0bGUgOiBcIlwiXHJcbiAgICAgICAgICAgIH0sIGl0ZW0gKTtcclxuXHJcbiAgICAgICAgICAgIGlmKChwbGF5bGlzdEl0ZW0uc291cmNlcyA9PT0gT2JqZWN0KHBsYXlsaXN0SXRlbS5zb3VyY2VzKSkgJiYgIV8uaXNBcnJheShwbGF5bGlzdEl0ZW0uc291cmNlcykpIHtcclxuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gW21ha2VQcmV0dHlTb3VyY2UocGxheWxpc3RJdGVtLnNvdXJjZXMpXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCFfLmlzQXJyYXkocGxheWxpc3RJdGVtLnNvdXJjZXMpIHx8IHBsYXlsaXN0SXRlbS5zb3VyY2VzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBbbWFrZVByZXR0eVNvdXJjZShwbGF5bGlzdEl0ZW0pXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoIV8uaXNBcnJheShwbGF5bGlzdEl0ZW0uc291cmNlcykgfHwgcGxheWxpc3RJdGVtLnNvdXJjZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5sZXZlbHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IGl0ZW0ubGV2ZWxzO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IFttYWtlUHJldHR5U291cmNlKGl0ZW0pXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBwbGF5bGlzdEl0ZW0uc291cmNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNvdXJjZSA9IHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldO1xyXG4gICAgICAgICAgICAgICAgbGV0IHByZXR0eVNvdXJjZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBkZWZhdWx0U291cmNlID0gc291cmNlLmRlZmF1bHQ7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGVmYXVsdFNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZS5kZWZhdWx0ID0gKGRlZmF1bHRTb3VyY2UudG9TdHJpbmcoKSA9PT0gJ3RydWUnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlLmRlZmF1bHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgc291cmNlIGRvZXNuJ3QgaGF2ZSBhIGxhYmVsLCBudW1iZXIgaXRcclxuICAgICAgICAgICAgICAgIGlmICghcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0ubGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXS5sYWJlbCA9IHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldLnR5cGUrXCItXCIraS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHByZXR0eVNvdXJjZSA9IG1ha2VQcmV0dHlTb3VyY2UocGxheWxpc3RJdGVtLnNvdXJjZXNbaV0pO1xyXG4gICAgICAgICAgICAgICAgaWYoc3VwcG9ydENoZWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKHByZXR0eVNvdXJjZSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldID0gcHJldHR5U291cmNlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IHBsYXlsaXN0SXRlbS5zb3VyY2VzLmZpbHRlcihzb3VyY2UgPT4gISFzb3VyY2UpO1xyXG5cclxuICAgICAgICAgICAgaWYoIXBsYXlsaXN0SXRlbS50aXRsZSAmJiAgcGxheWxpc3RJdGVtLnNvdXJjZXNbMF0gJiYgcGxheWxpc3RJdGVtLnNvdXJjZXNbMF0ubGFiZWwpe1xyXG4gICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnRpdGxlID0gcGxheWxpc3RJdGVtLnNvdXJjZXNbMF0ubGFiZWw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGRlZmF1bHQg6rCAIOyXhuydhOuVjCB3ZWJydGPqsIAg7J6I64uk66m0IHdlYnJ0YyBkZWZhdWx0IDogdHJ1ZeuhnCDsnpDrj5kg7ISk7KCVXHJcbiAgICAgICAgICAgIC8qbGV0IGhhdmVEZWZhdWx0ID0gXy5maW5kKHBsYXlsaXN0SXRlbS5zb3VyY2VzLCBmdW5jdGlvbihzb3VyY2Upe3JldHVybiBzb3VyY2UuZGVmYXVsdCA9PSB0cnVlO30pO1xyXG4gICAgICAgICAgICBsZXQgd2VicnRjU291cmNlID0gW107XHJcbiAgICAgICAgICAgIGlmKCFoYXZlRGVmYXVsdCl7XHJcbiAgICAgICAgICAgICAgICB3ZWJydGNTb3VyY2UgPSBfLmZpbmQocGxheWxpc3RJdGVtLnNvdXJjZXMsIGZ1bmN0aW9uKHNvdXJjZSl7cmV0dXJuIHNvdXJjZS50eXBlID09IFwid2VicnRjXCI7fSk7XHJcbiAgICAgICAgICAgICAgICBpZih3ZWJydGNTb3VyY2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIHdlYnJ0Y1NvdXJjZS5kZWZhdWx0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSovXHJcblxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZXh0cmFjdE9ubHlPbmVQcm90b2NvbChzb3VyY2VzKXtcclxuICAgICAgICAgICAgICAgIGlmKCEhc291cmNlcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGhpZ2hQcmlvcml0eVR5cGUgPSBwbGF5bGlzdEl0ZW0uc291cmNlc1swXS50eXBlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXy5maWx0ZXIoc291cmNlcywge3R5cGUgOiBoaWdoUHJpb3JpdHlUeXBlfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5pc0N1cnJlbnRQcm90b2NvbE9ubHkoKSl7XHJcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IGV4dHJhY3RPbmx5T25lUHJvdG9jb2wocGxheWxpc3RJdGVtLnNvdXJjZXMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZighXy5pc0FycmF5KHBsYXlsaXN0SXRlbS50cmFja3MpKXtcclxuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS50cmFja3MgPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihfLmlzQXJyYXkocGxheWxpc3RJdGVtLmNhcHRpb25zKSl7XHJcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0udHJhY2tzID0gcGxheWxpc3RJdGVtLnRyYWNrcy5jb25jYXQocGxheWxpc3RJdGVtLmNhcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBwbGF5bGlzdEl0ZW0uY2FwdGlvbnM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHBsYXlsaXN0SXRlbS50cmFja3MgPSBwbGF5bGlzdEl0ZW0udHJhY2tzLm1hcChmdW5jdGlvbih0cmFjayl7XHJcbiAgICAgICAgICAgICAgICBpZighdHJhY2sgfHwgIXRyYWNrLmZpbGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ2tpbmQnOiAnY2FwdGlvbnMnLFxyXG4gICAgICAgICAgICAgICAgICAgICdkZWZhdWx0JzogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0sIHRyYWNrKTtcclxuICAgICAgICAgICAgfSkuZmlsdGVyKHRyYWNrID0+ICEhdHJhY2spO1xyXG4gICAgICAgICAgICByZXR1cm4gcGxheWxpc3RJdGVtO1xyXG4gICAgICAgIH0pLmZpbHRlcihmdW5jdGlvbihpdGVtKXtyZXR1cm4gaXRlbS5zb3VyY2VzICYmIGl0ZW0uc291cmNlcy5sZW5ndGggPiAwO30pfHxbXTtcclxuICAgICAgICBzcGVjLnBsYXlsaXN0ID0gcHJldHRpZWRQbGF5bGlzdDtcclxuICAgICAgICByZXR1cm4gcHJldHRpZWRQbGF5bGlzdDtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFBsYXlsaXN0ID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBnZXRQbGF5bGlzdCgpIFwiLCBzcGVjLnBsYXlsaXN0KTtcclxuICAgICAgICByZXR1cm4gc3BlYy5wbGF5bGlzdDtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEN1cnJlbnRQbGF5TGlzdCA9ICgpID0+IHtcclxuICAgICAgICBpZihzcGVjLnBsYXlsaXN0W3NwZWMuY3VycmVudEluZGV4XSl7XHJcbiAgICAgICAgICAgIHJldHVybiBzcGVjLnBsYXlsaXN0W3NwZWMuY3VycmVudEluZGV4XTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aGF0LmdldEN1cnJlbnRQbGF5bGlzdEluZGV4ID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRJbmRleDtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEN1cnJlbnRQbGF5bGlzdCA9IChpbmRleCkgPT4ge1xyXG4gICAgICAgIGlmKHNwZWMucGxheWxpc3RbaW5kZXhdKXtcclxuICAgICAgICAgICAgc3BlYy5jdXJyZW50SW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihQTEFZTElTVF9DSEFOR0VELCBzcGVjLmN1cnJlbnRJbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRJbmRleDtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEN1cnJlbnRTb3VyY2VzID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKHNwZWMucGxheWxpc3Rbc3BlYy5jdXJyZW50SW5kZXhdKXtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIGdldEN1cnJlbnRTb3VyY2VzKCkgXCIsIHNwZWMucGxheWxpc3Rbc3BlYy5jdXJyZW50SW5kZXhdLnNvdXJjZXMpO1xyXG4gICAgICAgICAgICByZXR1cm4gc3BlYy5wbGF5bGlzdFtzcGVjLmN1cnJlbnRJbmRleF0uc291cmNlcztcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcbiAgICB0aGF0LmdldEN1cnJlbnRBZFRhZyA9ICgpID0+IHtcclxuICAgICAgICBpZihzcGVjLnBsYXlsaXN0W3NwZWMuY3VycmVudEluZGV4XSl7XHJcbiAgICAgICAgICAgIHJldHVybiBzcGVjLnBsYXlsaXN0W3NwZWMuY3VycmVudEluZGV4XS5hZFRhZ1VybCB8fCBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWFuYWdlcjtcclxuIiwiaW1wb3J0IFN1cHBvcnRDaGVja2VyIGZyb20gXCJhcGkvU3VwcG9ydENoZWNrZXJcIjtcclxuaW1wb3J0IHtBcGlSdG1wRXhwYW5zaW9ufSBmcm9tICdhcGkvQXBpRXhwYW5zaW9ucyc7XHJcbmltcG9ydCB7XHJcbiAgICBQUk9WSURFUl9IVE1MNSwgUFJPVklERVJfV0VCUlRDLCBQUk9WSURFUl9EQVNILCBQUk9WSURFUl9ITFMsIFBST1ZJREVSX1JUTVAsIEVSUk9SUywgSU5JVF9VTlNVUFBPUlRfRVJST1JcclxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIFRoaXMgbWFuYWdlcyBwcm92aWRlci5cclxuICogQHBhcmFtXHJcbiAqICovXHJcbmNvbnN0IENvbnRyb2xsZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBsZXQgc3VwcG9ydENoYWNrZXIgPSBTdXBwb3J0Q2hlY2tlcigpO1xyXG4gICAgY29uc3QgUHJvdmlkZXJzID0ge307XHJcblxyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGxvYWRlZC5cIik7XHJcblxyXG4gICAgY29uc3QgcmVnaXN0ZVByb3ZpZGVyID0gKG5hbWUsIHByb3ZpZGVyKSA9PiB7XHJcbiAgICAgICAgaWYgKFByb3ZpZGVyc1tuYW1lXSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBfcmVnaXN0ZXJQcm92aWRlcigpIFwiLCBuYW1lKTtcclxuICAgICAgICBQcm92aWRlcnNbbmFtZV0gPSBwcm92aWRlcjtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgUHJvdmlkZXJMb2FkZXIgPSB7XHJcbiAgICAgICAgaHRtbDU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IdG1sNSddLCBmdW5jdGlvbiAocmVxdWlyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IdG1sNScpLmRlZmF1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFBST1ZJREVSX0hUTUw1LCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtuYW1lOiBQUk9WSURFUl9IVE1MNSwgcHJvdmlkZXI6IHByb3ZpZGVyfTtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcclxuICAgICAgICAgICAgICAgIH0sICdvdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1J1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgd2VicnRjOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvV2ViUlRDJ10sIGZ1bmN0aW9uIChyZXF1aXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvaHRtbDUvcHJvdmlkZXJzL1dlYlJUQycpLmRlZmF1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFBST1ZJREVSX1dFQlJUQywgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7bmFtZTogUFJPVklERVJfV0VCUlRDLCBwcm92aWRlcjogcHJvdmlkZXJ9O1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgfSwgJ292ZW5wbGF5ZXIucHJvdmlkZXIuV2ViUlRDUHJvdmlkZXInXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkYXNoOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvRGFzaCddLCBmdW5jdGlvbiAocmVxdWlyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9EYXNoJykuZGVmYXVsdDtcclxuICAgICAgICAgICAgICAgICAgICByZWdpc3RlUHJvdmlkZXIoUFJPVklERVJfREFTSCwgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7bmFtZTogUFJPVklERVJfREFTSCwgcHJvdmlkZXI6IHByb3ZpZGVyfTtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcclxuICAgICAgICAgICAgICAgIH0sICdvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcidcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhsczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvaHRtbDUvcHJvdmlkZXJzL0hscyddLCBmdW5jdGlvbiAocmVxdWlyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IbHMnKS5kZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVQcm92aWRlcihQUk9WSURFUl9ITFMsIHByb3ZpZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge25hbWU6IFBST1ZJREVSX0hMUywgcHJvdmlkZXI6IHByb3ZpZGVyfTtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcclxuICAgICAgICAgICAgICAgIH0sICdvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcnRtcDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvZmxhc2gvcHJvdmlkZXJzL1J0bXAnXSwgZnVuY3Rpb24gKHJlcXVpcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci9mbGFzaC9wcm92aWRlcnMvUnRtcCcpLmRlZmF1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFBST1ZJREVSX1JUTVAsIHByb3ZpZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge25hbWU6IFBST1ZJREVSX1JUTVAsIHByb3ZpZGVyOiBwcm92aWRlcn07XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XHJcbiAgICAgICAgICAgICAgICB9LCAnb3ZlbnBsYXllci5wcm92aWRlci5SdG1wUHJvdmlkZXInXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhhdC5sb2FkUHJvdmlkZXJzID0gKHBsYXlsaXN0SXRlbSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHN1cHBvcnRlZFByb3ZpZGVyTmFtZXMgPSBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lc0J5UGxheWxpc3QocGxheWxpc3RJdGVtKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgbG9hZFByb3ZpZGVycygpIFwiLCBzdXBwb3J0ZWRQcm92aWRlck5hbWVzKTtcclxuICAgICAgICBpZiAoIXN1cHBvcnRlZFByb3ZpZGVyTmFtZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KEVSUk9SUy5jb2Rlc1tJTklUX1VOU1VQUE9SVF9FUlJPUl0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChcclxuICAgICAgICAgICAgICAgIHN1cHBvcnRlZFByb3ZpZGVyTmFtZXMuZmlsdGVyKGZ1bmN0aW9uIChwcm92aWRlck5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gISFQcm92aWRlckxvYWRlcltwcm92aWRlck5hbWVdO1xyXG4gICAgICAgICAgICAgICAgfSkubWFwKGZ1bmN0aW9uIChwcm92aWRlck5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvdmlkZXJMb2FkZXJbcHJvdmlkZXJOYW1lXSgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmZpbmRCeU5hbWUgPSAobmFtZSkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBmaW5kQnlOYW1lKCkgXCIsIG5hbWUpO1xyXG4gICAgICAgIHJldHVybiBQcm92aWRlcnNbbmFtZV07XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0UHJvdmlkZXJCeVNvdXJjZSA9IChzb3VyY2UpID0+IHtcclxuICAgICAgICBjb25zdCBzdXBwb3J0ZWRQcm92aWRlck5hbWUgPSBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2Uoc291cmNlKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgZ2V0UHJvdmlkZXJCeVNvdXJjZSgpIFwiLCBzdXBwb3J0ZWRQcm92aWRlck5hbWUpO1xyXG4gICAgICAgIHJldHVybiB0aGF0LmZpbmRCeU5hbWUoc3VwcG9ydGVkUHJvdmlkZXJOYW1lKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5pc1NhbWVQcm92aWRlciA9IChjdXJyZW50U291cmNlLCBuZXdTb3VyY2UpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgaXNTYW1lUHJvdmlkZXIoKSBcIiwgc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKGN1cnJlbnRTb3VyY2UpLCBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UobmV3U291cmNlKSk7XHJcbiAgICAgICAgcmV0dXJuIHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShjdXJyZW50U291cmNlKSA9PT0gc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKG5ld1NvdXJjZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29udHJvbGxlcjtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiAxMS4gMTIuLlxyXG4gKi9cclxuaW1wb3J0IHtFUlJPUiwgU1RBVEVfRVJST1J9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcbmltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XHJcblxyXG5leHBvcnQgY29uc3QgZXh0cmFjdFZpZGVvRWxlbWVudCA9IGZ1bmN0aW9uKGVsZW1lbnRPck1zZSkge1xyXG4gICAgaWYoXy5pc0VsZW1lbnQoZWxlbWVudE9yTXNlKSl7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRPck1zZTtcclxuICAgIH1cclxuICAgIGlmKGVsZW1lbnRPck1zZS5nZXRWaWRlb0VsZW1lbnQpe1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50T3JNc2UuZ2V0VmlkZW9FbGVtZW50KCk7XHJcbiAgICB9ZWxzZSBpZihlbGVtZW50T3JNc2UubWVkaWEpe1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50T3JNc2UubWVkaWE7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBzZXBhcmF0ZUxpdmUgPSBmdW5jdGlvbihtc2UpIHtcclxuICAgIC8vVG9EbyA6IFlvdSBjb25zaWRlciBobHNqcy4gQnV0IG5vdCBub3cgYmVjYXVzZSB3ZSBkb24ndCBzdXBwb3J0IGhsc2pzLlxyXG5cclxuICAgIGlmKG1zZSAmJiBtc2UuaXNEeW5hbWljKXtcclxuICAgICAgICByZXR1cm4gbXNlLmlzRHluYW1pYygpO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGVycm9yVHJpZ2dlciA9IGZ1bmN0aW9uKGVycm9yLCBwcm92aWRlcil7XHJcbiAgICBpZihwcm92aWRlcil7XHJcbiAgICAgICAgcHJvdmlkZXIuc2V0U3RhdGUoU1RBVEVfRVJST1IpO1xyXG4gICAgICAgIHByb3ZpZGVyLnBhdXNlKCk7XHJcbiAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihFUlJPUiwgZXJyb3IgKTtcclxuICAgIH1cclxuXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcGlja0N1cnJlbnRTb3VyY2UgPSAoc291cmNlcywgcGxheWVyQ29uZmlnKSA9PiB7XHJcblxyXG4gICAgbGV0IHNvdXJjZUluZGV4ID0gMDtcclxuXHJcbiAgICBpZiAoc291cmNlcykge1xyXG5cclxuICAgICAgICBpZiAocGxheWVyQ29uZmlnLmdldFNvdXJjZUluZGV4KCkgPT09IC0xKSB7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChzb3VyY2VzW2ldLmRlZmF1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2VJbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgc291cmNlSW5kZXggPSBwbGF5ZXJDb25maWcuZ2V0U291cmNlSW5kZXgoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzb3VyY2VJbmRleDtcclxufSIsImltcG9ydCBBUEkgZnJvbSAnYXBpL0FwaSc7XHJcbmltcG9ydCB7aXNXZWJSVEN9IGZyb20gJ3V0aWxzL3ZhbGlkYXRvcic7XHJcbmltcG9ydCBfIGZyb20gJ3V0aWxzL3VuZGVyc2NvcmUnO1xyXG5pbXBvcnQgTGEkIGZyb20gJ3V0aWxzL2xpa2VBJCc7XHJcbmltcG9ydCB7Z2V0U2NyaXB0UGF0aH0gZnJvbSAndXRpbHMvd2VicGFjayc7XHJcblxyXG5cclxuX193ZWJwYWNrX3B1YmxpY19wYXRoX18gPSBnZXRTY3JpcHRQYXRoKCdvdmVucGxheWVyLnNkay5qcycpO1xyXG5cclxuLyoqXHJcbiAqIE1haW4gT3ZlblBsYXllclNESyBvYmplY3RcclxuICovXHJcbmNvbnN0IE92ZW5QbGF5ZXJTREsgPSB3aW5kb3cuT3ZlblBsYXllclNESyA9IHt9O1xyXG5cclxuY29uc3QgcGxheWVyTGlzdCA9IE92ZW5QbGF5ZXJTREsucGxheWVyTGlzdCA9IFtdO1xyXG5cclxuZXhwb3J0IGNvbnN0IGNoZWNrQW5kR2V0Q29udGFpbmVyRWxlbWVudCA9IGZ1bmN0aW9uKGNvbnRhaW5lcikge1xyXG4gICAgaWYgKCFjb250YWluZXIpIHtcclxuXHJcbiAgICAgICAgLy8gVE9ETyhyb2NrKTogU2hvdWxkIGNhdXNlIGFuIGVycm9yLlxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBjb250YWluZXJFbGVtZW50ID0gbnVsbDtcclxuXHJcbiAgICBpZiAodHlwZW9mIGNvbnRhaW5lciA9PT0gJ3N0cmluZycpIHtcclxuXHJcbiAgICAgICAgY29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvbnRhaW5lcik7XHJcbiAgICB9IGVsc2UgaWYgKGNvbnRhaW5lci5ub2RlVHlwZSkge1xyXG5cclxuICAgICAgICBjb250YWluZXJFbGVtZW50ID0gY29udGFpbmVyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBUT0RPKHJvY2spOiBTaG91bGQgY2F1c2UgYW4gZXJyb3IuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNvbnRhaW5lckVsZW1lbnQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgcGxheWVyIGluc3RhbmNlIGFuZCByZXR1cm4gaXQuXHJcbiAqXHJcbiAqIEBwYXJhbSAgICAgIHtzdHJpbmcgfCBkb20gZWxlbWVudH0gY29udGFpbmVyICBJZCBvZiBjb250YWluZXIgZWxlbWVudCBvciBjb250YWluZXIgZWxlbWVudFxyXG4gKiBAcGFyYW0gICAgICB7b2JqZWN0fSBvcHRpb25zICBUaGUgb3B0aW9uc1xyXG4gKi9cclxuT3ZlblBsYXllclNESy5jcmVhdGUgPSBmdW5jdGlvbihjb250YWluZXIsIG9wdGlvbnMpIHtcclxuXHJcbiAgICBsZXQgY29udGFpbmVyRWxlbWVudCA9IGNoZWNrQW5kR2V0Q29udGFpbmVyRWxlbWVudChjb250YWluZXIpO1xyXG5cclxuICAgIGNvbnN0IHBsYXllckluc3RhbmNlID0gQVBJKGNvbnRhaW5lckVsZW1lbnQpO1xyXG4gICAgcGxheWVySW5zdGFuY2UuaW5pdChvcHRpb25zKTtcclxuXHJcbiAgICBwbGF5ZXJMaXN0LnB1c2gocGxheWVySW5zdGFuY2UpO1xyXG5cclxuICAgIHJldHVybiBwbGF5ZXJJbnN0YW5jZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBwbGF5ZXIgaW5zdGFuY2UgbGlzdC5cclxuICpcclxuICogQHJldHVybiAgICAge2FycmF5fSAgVGhlIHBsYXllciBsaXN0LlxyXG4gKi9cclxuT3ZlblBsYXllclNESy5nZXRQbGF5ZXJMaXN0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgcmV0dXJuIHBsYXllckxpc3Q7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgcGxheWVyIGluc3RhbmNlIGJ5IGNvbnRhaW5lciBpZC5cclxuICpcclxuICogQHBhcmFtICAgICAge3N0cmluZ30gIGNvbnRhaW5lcklkICBUaGUgY29udGFpbmVyIGlkZW50aWZpZXJcclxuICogQHJldHVybiAgICAge29iZWplY3QgfCBudWxsfSAgVGhlIHBsYXllciBpbnN0YW5jZS5cclxuICovXHJcbk92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyQnlDb250YWluZXJJZCA9IGZ1bmN0aW9uKGNvbnRhaW5lcklkKSB7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5ZXJMaXN0Lmxlbmd0aDsgaSArKykge1xyXG5cclxuICAgICAgICBpZiAocGxheWVyTGlzdFtpXS5nZXRDb250YWluZXJJZCgpID09PSBjb250YWluZXJJZCkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHBsYXllckxpc3RbaV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIHBsYXllciBpbnN0YW5jZSBieSBpbmRleC5cclxuICpcclxuICogQHBhcmFtICAgICAge251bWJlcn0gIGluZGV4ICAgVGhlIGluZGV4XHJcbiAqIEByZXR1cm4gICAgIHtvYmplY3QgfCBudWxsfSAgVGhlIHBsYXllciBpbnN0YW5jZS5cclxuICovXHJcbk92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyQnlJbmRleCA9IGZ1bmN0aW9uKGluZGV4KSB7XHJcblxyXG4gICAgY29uc3QgcGxheWVySW5zdGFuY2UgPSBwbGF5ZXJMaXN0W2luZGV4XTtcclxuXHJcbiAgICBpZiAocGxheWVySW5zdGFuY2UpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIHBsYXllckluc3RhbmNlO1xyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIHRoZSBwbGF5ZXIgaW5zdGFuY2UgYnkgcGxheWVySWQuXHJcbiAqXHJcbiAqIEBwYXJhbSAgICAgIHtwbGF5ZXJJZH0gIGlkXHJcbiAqIEByZXR1cm4gICAgIHtudWxsfVxyXG4gKi9cclxuT3ZlblBsYXllclNESy5yZW1vdmVQbGF5ZXIgPSBmdW5jdGlvbihwbGF5ZXJJZCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5ZXJMaXN0Lmxlbmd0aDsgaSArKykge1xyXG5cclxuICAgICAgICBpZiAocGxheWVyTGlzdFtpXS5nZXRDb250YWluZXJJZCgpID09PSBwbGF5ZXJJZCkge1xyXG5cclxuICAgICAgICAgICAgcGxheWVyTGlzdC5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZW5lcmF0ZSB3ZWJydGMgc291cmNlIGZvciBwbGF5ZXIgc291cmNlIHR5cGUuXHJcbiAqXHJcbiAqIEBwYXJhbSAgICAgIHtPYmplY3QgfCBBcnJheX0gIHNvdXJjZSAgIHdlYnJ0YyBzb3VyY2VcclxuICogQHJldHVybiAgICAge0FycmF5fSAgUGxheWVyIHNvdXJjZSBPYmplY3QuXHJcbiAqL1xyXG5PdmVuUGxheWVyU0RLLmdlbmVyYXRlV2VicnRjVXJscyA9IGZ1bmN0aW9uKHNvdXJjZXMpIHtcclxuICAgIHJldHVybiAoXy5pc0FycmF5KHNvdXJjZXMpID8gc291cmNlcyA6IFtzb3VyY2VzXSkubWFwKGZ1bmN0aW9uKHNvdXJjZSwgaW5kZXgpe1xyXG4gICAgICAgIGlmKHNvdXJjZS5ob3N0ICYmIGlzV2ViUlRDKHNvdXJjZS5ob3N0KSAmJiBzb3VyY2UuYXBwbGljYXRpb24gJiYgc291cmNlLnN0cmVhbSl7XHJcbiAgICAgICAgICAgIHJldHVybiB7ZmlsZSA6IHNvdXJjZS5ob3N0ICsgXCIvXCIgKyBzb3VyY2UuYXBwbGljYXRpb24gKyBcIi9cIiArIHNvdXJjZS5zdHJlYW0sIHR5cGUgOiBcIndlYnJ0Y1wiLCBsYWJlbCA6IHNvdXJjZS5sYWJlbCA/IHNvdXJjZS5sYWJlbCA6IFwid2VicnRjLVwiKyhpbmRleCsxKSB9O1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdoZXRoZXIgc2hvdyB0aGUgcGxheWVyIGNvcmUgbG9nIG9yIG5vdC5cclxuICpcclxuICogQHBhcmFtICAgICAge2Jvb2xlYW59ICBib29sZWFuICAgcnVuIGRlYnVnIG1vZGUgb3Igbm90LlxyXG4gKiBAcmV0dXJuICAgICB7Ym9vbGVhbn0gIHJ1biBkZWJ1ZyBtb2RlIG9yIG5vdC5cclxuICovXHJcbk92ZW5QbGF5ZXJTREsuZGVidWcgPSBmdW5jdGlvbihpc0RlYnVnTW9kZSkge1xyXG4gICAgaWYoaXNEZWJ1Z01vZGUpe1xyXG4gICAgICAgIHdpbmRvdy5PdmVuUGxheWVyQ29uc29sZSA9IHtsb2cgOiB3aW5kb3dbJ2NvbnNvbGUnXVsnbG9nJ119O1xyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgd2luZG93Lk92ZW5QbGF5ZXJDb25zb2xlID0ge2xvZyA6ICBmdW5jdGlvbigpe319O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGlzRGVidWdNb2RlO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgT3ZlblBsYXllclNESztcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyNC4uXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldEJyb3dzZXJMYW5ndWFnZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgbmF2ID0gd2luZG93Lm5hdmlnYXRvcixcclxuICAgICAgICBicm93c2VyTGFuZ3VhZ2VQcm9wZXJ0eUtleXMgPSBbJ2xhbmd1YWdlJywgJ2Jyb3dzZXJMYW5ndWFnZScsICdzeXN0ZW1MYW5ndWFnZScsICd1c2VyTGFuZ3VhZ2UnXSxcclxuICAgICAgICBpLFxyXG4gICAgICAgIGxhbmd1YWdlO1xyXG5cclxuICAgIC8vIHN1cHBvcnQgZm9yIEhUTUwgNS4xIFwibmF2aWdhdG9yLmxhbmd1YWdlc1wiXHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShuYXYubGFuZ3VhZ2VzKSkge1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBuYXYubGFuZ3VhZ2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxhbmd1YWdlID0gbmF2Lmxhbmd1YWdlc1tpXTtcclxuICAgICAgICAgICAgaWYgKGxhbmd1YWdlICYmIGxhbmd1YWdlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxhbmd1YWdlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHN1cHBvcnQgZm9yIG90aGVyIHdlbGwga25vd24gcHJvcGVydGllcyBpbiBicm93c2Vyc1xyXG4gICAgZm9yIChpID0gMDsgaSA8IGJyb3dzZXJMYW5ndWFnZVByb3BlcnR5S2V5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxhbmd1YWdlID0gbmF2W2Jyb3dzZXJMYW5ndWFnZVByb3BlcnR5S2V5c1tpXV07XHJcbiAgICAgICAgaWYgKGxhbmd1YWdlICYmIGxhbmd1YWdlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbGFuZ3VhZ2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5leHBvcnQgY29uc3QgYW5hbFVzZXJBZ2VudCA9IGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgdW5rbm93biA9ICctJztcclxuXHJcbiAgICAvLyBzY3JlZW5cclxuICAgIGxldCBzY3JlZW5TaXplID0gJyc7XHJcbiAgICBpZiAoc2NyZWVuLndpZHRoKSB7XHJcbiAgICAgICAgbGV0IHdpZHRoID0gKHNjcmVlbi53aWR0aCkgPyBzY3JlZW4ud2lkdGggOiAnJztcclxuICAgICAgICBsZXQgaGVpZ2h0ID0gKHNjcmVlbi5oZWlnaHQpID8gc2NyZWVuLmhlaWdodCA6ICcnO1xyXG4gICAgICAgIHNjcmVlblNpemUgKz0gJycgKyB3aWR0aCArIFwiIHggXCIgKyBoZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYnJvd3NlclxyXG4gICAgbGV0IG5WZXIgPSBuYXZpZ2F0b3IuYXBwVmVyc2lvbjtcclxuICAgIGxldCBuQWd0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcclxuICAgIGxldCBicm93c2VyID0gbmF2aWdhdG9yLmFwcE5hbWU7XHJcbiAgICBsZXQgdmVyc2lvbiA9ICcnICsgcGFyc2VGbG9hdChuYXZpZ2F0b3IuYXBwVmVyc2lvbik7XHJcbiAgICBsZXQgbWFqb3JWZXJzaW9uID0gcGFyc2VJbnQobmF2aWdhdG9yLmFwcFZlcnNpb24sIDEwKTtcclxuICAgIGxldCBpc1dlYnZpZXcgPSBmYWxzZTtcclxuICAgIGxldCBuYW1lT2Zmc2V0LCB2ZXJPZmZzZXQsIGl4O1xyXG5cclxuICAgIC8vIE9wZXJhXHJcbiAgICBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignT3BlcmEnKSkgIT0gLTEpIHtcclxuICAgICAgICBicm93c2VyID0gJ09wZXJhJztcclxuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNik7XHJcbiAgICAgICAgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ1ZlcnNpb24nKSkgIT0gLTEpIHtcclxuICAgICAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIE9wZXJhIE5leHRcclxuICAgIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdPUFInKSkgIT0gLTEpIHtcclxuICAgICAgICBicm93c2VyID0gJ09wZXJhJztcclxuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNCk7XHJcbiAgICB9XHJcbiAgICAvL+yCvOyEsSDruIzrnbzsmrDsoIBcclxuICAgIGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ1NhbXN1bmdCcm93c2VyJykpICE9IC0xKSB7XHJcbiAgICAgICAgYnJvd3NlciA9ICdTYW1zdW5nQnJvd3Nlcic7XHJcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDE1KTtcclxuICAgIH1cclxuICAgIC8vIEVkZ2VcclxuICAgIGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ0VkZ2UnKSkgIT0gLTEpIHtcclxuICAgICAgICBicm93c2VyID0gJ01pY3Jvc29mdCBFZGdlJztcclxuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNSk7XHJcbiAgICB9XHJcbiAgICAvLyBNU0lFXHJcbiAgICBlbHNlIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdNU0lFJykpICE9IC0xKSB7XHJcbiAgICAgICAgYnJvd3NlciA9ICdNaWNyb3NvZnQgSW50ZXJuZXQgRXhwbG9yZXInO1xyXG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA1KTtcclxuXHJcblxyXG4gICAgICAgIC8vd2luNyBJRTExIHVzZXJBZ2VudCBpcyB1Z2x5Li4uLlxyXG4gICAgICAgIGlmKCAobkFndC5pbmRleE9mKCdUcmlkZW50LycpICE9PSAtMSkgJiYgKG5BZ3QuaW5kZXhPZigncnY6JykgIT09IC0xKSAgKXtcclxuICAgICAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKG5BZ3QuaW5kZXhPZigncnY6JykgKyAzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBDaHJvbWVcclxuICAgIGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ0Nocm9tZScpKSAhPSAtMSkge1xyXG4gICAgICAgIGJyb3dzZXIgPSAnQ2hyb21lJztcclxuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdDcmlPUycpKSAhPSAtMSkgeyAgIC8vaXBob25lIC0gY2hyb21lXHJcbiAgICAgICAgYnJvd3NlciA9ICdDaHJvbWUnO1xyXG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA2KTtcclxuICAgIH1cclxuICAgIC8vIEZpcmVmb3hcclxuICAgIGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ0ZpcmVmb3gnKSkgIT0gLTEpIHtcclxuICAgICAgICBicm93c2VyID0gJ0ZpcmVmb3gnO1xyXG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA4KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ0Z4aU9TJykpICE9IC0xKSB7XHJcbiAgICAgICAgYnJvd3NlciA9ICdGaXJlZm94JztcclxuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNik7XHJcbiAgICB9XHJcbiAgICAvLyBTYWZhcmlcclxuICAgIGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ1NhZmFyaScpKSAhPSAtMSkge1xyXG4gICAgICAgIGJyb3dzZXIgPSAnU2FmYXJpJztcclxuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNyk7XHJcbiAgICAgICAgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ1ZlcnNpb24nKSkgIT0gLTEpIHtcclxuICAgICAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gTVNJRSAxMStcclxuICAgIGVsc2UgaWYgKG5BZ3QuaW5kZXhPZignVHJpZGVudC8nKSAhPT0gLTEpIHtcclxuICAgICAgICBicm93c2VyID0gJ01pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3Jlcic7XHJcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKG5BZ3QuaW5kZXhPZigncnY6JykgKyAzKTtcclxuICAgIH1cclxuICAgIC8vIE90aGVyIGJyb3dzZXJzXHJcbiAgICBlbHNlIGlmICgobmFtZU9mZnNldCA9IG5BZ3QubGFzdEluZGV4T2YoJyAnKSArIDEpIDwgKHZlck9mZnNldCA9IG5BZ3QubGFzdEluZGV4T2YoJy8nKSkpIHtcclxuICAgICAgICBicm93c2VyID0gbkFndC5zdWJzdHJpbmcobmFtZU9mZnNldCwgdmVyT2Zmc2V0KTtcclxuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgMSk7XHJcbiAgICAgICAgaWYgKGJyb3dzZXIudG9Mb3dlckNhc2UoKSA9PSBicm93c2VyLnRvVXBwZXJDYXNlKCkpIHtcclxuICAgICAgICAgICAgYnJvd3NlciA9IG5hdmlnYXRvci5hcHBOYW1lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmKG5BZ3QuaW5kZXhPZignIHd2JykgPiAwKXtcclxuICAgICAgICBpc1dlYnZpZXcgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgLy8gdHJpbSB0aGUgdmVyc2lvbiBzdHJpbmdcclxuICAgIGlmICgoaXggPSB2ZXJzaW9uLmluZGV4T2YoJzsnKSkgIT0gLTEpIHZlcnNpb24gPSB2ZXJzaW9uLnN1YnN0cmluZygwLCBpeCk7XHJcbiAgICBpZiAoKGl4ID0gdmVyc2lvbi5pbmRleE9mKCcgJykpICE9IC0xKSB2ZXJzaW9uID0gdmVyc2lvbi5zdWJzdHJpbmcoMCwgaXgpO1xyXG4gICAgaWYgKChpeCA9IHZlcnNpb24uaW5kZXhPZignKScpKSAhPSAtMSkgdmVyc2lvbiA9IHZlcnNpb24uc3Vic3RyaW5nKDAsIGl4KTtcclxuXHJcbiAgICBtYWpvclZlcnNpb24gPSBwYXJzZUludCgnJyArIHZlcnNpb24sIDEwKTtcclxuICAgIGlmIChpc05hTihtYWpvclZlcnNpb24pKSB7XHJcbiAgICAgICAgdmVyc2lvbiA9ICcnICsgcGFyc2VGbG9hdChuYXZpZ2F0b3IuYXBwVmVyc2lvbik7XHJcbiAgICAgICAgbWFqb3JWZXJzaW9uID0gcGFyc2VJbnQobmF2aWdhdG9yLmFwcFZlcnNpb24sIDEwKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBtb2JpbGUgdmVyc2lvblxyXG4gICAgdmFyIG1vYmlsZSA9IC9Nb2JpbGV8bWluaXxGZW5uZWN8QW5kcm9pZHxpUChhZHxvZHxob25lKS8udGVzdChuVmVyKTtcclxuXHJcbiAgICAvLyBjb29raWVcclxuICAgIHZhciBjb29raWVFbmFibGVkID0gKG5hdmlnYXRvci5jb29raWVFbmFibGVkKSA/IHRydWUgOiBmYWxzZTtcclxuXHJcbiAgICBpZiAodHlwZW9mIG5hdmlnYXRvci5jb29raWVFbmFibGVkID09ICd1bmRlZmluZWQnICYmICFjb29raWVFbmFibGVkKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gJ3Rlc3Rjb29raWUnO1xyXG4gICAgICAgIGNvb2tpZUVuYWJsZWQgPSAoZG9jdW1lbnQuY29va2llLmluZGV4T2YoJ3Rlc3Rjb29raWUnKSAhPSAtMSkgPyB0cnVlIDogZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc3lzdGVtXHJcbiAgICB2YXIgb3MgPSB1bmtub3duO1xyXG4gICAgdmFyIGNsaWVudFN0cmluZ3MgPSBbXHJcbiAgICAgICAge3M6J1dpbmRvd3MgMTAnLCByOi8oV2luZG93cyAxMC4wfFdpbmRvd3MgTlQgMTAuMCkvfSxcclxuICAgICAgICB7czonV2luZG93cyA4LjEnLCByOi8oV2luZG93cyA4LjF8V2luZG93cyBOVCA2LjMpL30sXHJcbiAgICAgICAge3M6J1dpbmRvd3MgOCcsIHI6LyhXaW5kb3dzIDh8V2luZG93cyBOVCA2LjIpL30sXHJcbiAgICAgICAge3M6J1dpbmRvd3MgNycsIHI6LyhXaW5kb3dzIDd8V2luZG93cyBOVCA2LjEpL30sXHJcbiAgICAgICAge3M6J1dpbmRvd3MgVmlzdGEnLCByOi9XaW5kb3dzIE5UIDYuMC99LFxyXG4gICAgICAgIHtzOidXaW5kb3dzIFNlcnZlciAyMDAzJywgcjovV2luZG93cyBOVCA1LjIvfSxcclxuICAgICAgICB7czonV2luZG93cyBYUCcsIHI6LyhXaW5kb3dzIE5UIDUuMXxXaW5kb3dzIFhQKS99LFxyXG4gICAgICAgIHtzOidXaW5kb3dzIDIwMDAnLCByOi8oV2luZG93cyBOVCA1LjB8V2luZG93cyAyMDAwKS99LFxyXG4gICAgICAgIHtzOidXaW5kb3dzIE1FJywgcjovKFdpbiA5eCA0LjkwfFdpbmRvd3MgTUUpL30sXHJcbiAgICAgICAge3M6J1dpbmRvd3MgOTgnLCByOi8oV2luZG93cyA5OHxXaW45OCkvfSxcclxuICAgICAgICB7czonV2luZG93cyA5NScsIHI6LyhXaW5kb3dzIDk1fFdpbjk1fFdpbmRvd3NfOTUpL30sXHJcbiAgICAgICAge3M6J1dpbmRvd3MgTlQgNC4wJywgcjovKFdpbmRvd3MgTlQgNC4wfFdpbk5UNC4wfFdpbk5UfFdpbmRvd3MgTlQpL30sXHJcbiAgICAgICAge3M6J1dpbmRvd3MgQ0UnLCByOi9XaW5kb3dzIENFL30sXHJcbiAgICAgICAge3M6J1dpbmRvd3MgMy4xMScsIHI6L1dpbjE2L30sXHJcbiAgICAgICAge3M6J0FuZHJvaWQnLCByOi9BbmRyb2lkL30sXHJcbiAgICAgICAge3M6J09wZW4gQlNEJywgcjovT3BlbkJTRC99LFxyXG4gICAgICAgIHtzOidTdW4gT1MnLCByOi9TdW5PUy99LFxyXG4gICAgICAgIHtzOidMaW51eCcsIHI6LyhMaW51eHxYMTEpL30sXHJcbiAgICAgICAge3M6J2lPUycsIHI6LyhpUGhvbmV8aVBhZHxpUG9kKS99LFxyXG4gICAgICAgIHtzOidNYWMgT1MgWEknLCByOi9NYWMgT1MgWCAxMS99LFxyXG4gICAgICAgIHtzOidNYWMgT1MgWCcsIHI6L01hYyBPUyBYIDEwL30sXHJcbiAgICAgICAge3M6J01hYyBPUycsIHI6LyhNYWNQUEN8TWFjSW50ZWx8TWFjX1Bvd2VyUEN8TWFjaW50b3NoKS99LFxyXG4gICAgICAgIHtzOidRTlgnLCByOi9RTlgvfSxcclxuICAgICAgICB7czonVU5JWCcsIHI6L1VOSVgvfSxcclxuICAgICAgICB7czonQmVPUycsIHI6L0JlT1MvfSxcclxuICAgICAgICB7czonT1MvMicsIHI6L09TXFwvMi99LFxyXG4gICAgICAgIHtzOidTZWFyY2ggQm90JywgcjovKG51aGt8R29vZ2xlYm90fFlhbW15Ym90fE9wZW5ib3R8U2x1cnB8TVNOQm90fEFzayBKZWV2ZXNcXC9UZW9tYXxpYV9hcmNoaXZlcikvfVxyXG4gICAgXTtcclxuICAgIGZvciAodmFyIGlkIGluIGNsaWVudFN0cmluZ3MpIHtcclxuICAgICAgICB2YXIgY3MgPSBjbGllbnRTdHJpbmdzW2lkXTtcclxuICAgICAgICBpZiAoY3Muci50ZXN0KG5BZ3QpKSB7XHJcbiAgICAgICAgICAgIG9zID0gY3MucztcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBvc1ZlcnNpb24gPSB1bmtub3duO1xyXG5cclxuICAgIGlmICgvV2luZG93cy8udGVzdChvcykpIHtcclxuICAgICAgICBvc1ZlcnNpb24gPSAvV2luZG93cyAoLiopLy5leGVjKG9zKVsxXTtcclxuICAgICAgICBvcyA9ICdXaW5kb3dzJztcclxuICAgIH1cclxuXHJcbiAgICBzd2l0Y2ggKG9zKSB7XHJcbiAgICAgICAgY2FzZSAnTWFjIE9TIFhJJzpcclxuICAgICAgICAgICAgb3NWZXJzaW9uID0gL01hYyBPUyBYICgxMVtcXC5cXF9cXGRdKykvLmV4ZWMobkFndClbMV07XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlICdNYWMgT1MgWCc6XHJcbiAgICAgICAgICAgIG9zVmVyc2lvbiA9IC9NYWMgT1MgWCAoMTBbXFwuXFxfXFxkXSspLy5leGVjKG5BZ3QpWzFdO1xyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSAnQW5kcm9pZCc6XHJcbiAgICAgICAgICAgIG9zVmVyc2lvbiA9IC9BbmRyb2lkIChbXFwuXFxfXFxkXSspLy5leGVjKG5BZ3QpWzFdO1xyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSAnaU9TJzpcclxuICAgICAgICAgICAgb3NWZXJzaW9uID0gL09TIChcXGQrKV8oXFxkKylfPyhcXGQrKT8vLmV4ZWMoblZlcik7XHJcbiAgICAgICAgICAgIG9zVmVyc2lvbiA9IG9zVmVyc2lvblsxXSArICcuJyArIG9zVmVyc2lvblsyXSArICcuJyArIChvc1ZlcnNpb25bM10gfCAwKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBzY3JlZW46IHNjcmVlblNpemUsXHJcbiAgICAgICAgYnJvd3NlcjogYnJvd3NlcixcclxuICAgICAgICBicm93c2VyVmVyc2lvbjogdmVyc2lvbixcclxuICAgICAgICBicm93c2VyTWFqb3JWZXJzaW9uOiBtYWpvclZlcnNpb24sXHJcbiAgICAgICAgbW9iaWxlOiBtb2JpbGUsXHJcbiAgICAgICAgdWEgOiBuQWd0LFxyXG4gICAgICAgIG9zOiBvcyxcclxuICAgICAgICBvc1ZlcnNpb246IG9zVmVyc2lvbixcclxuICAgICAgICBjb29raWVzOiBjb29raWVFbmFibGVkXHJcbiAgICB9O1xyXG59O1xyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IDIwMTMgdnR0LmpzIENvbnRyaWJ1dG9yc1xyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5sZXQgVlRUQ3VlID0gd2luZG93LlZUVEN1ZTtcclxuXHJcbnZhciBhdXRvS2V5d29yZCA9IFwiYXV0b1wiO1xyXG52YXIgZGlyZWN0aW9uU2V0dGluZyA9IHtcclxuICAgIFwiXCI6IHRydWUsXHJcbiAgICBcImxyXCI6IHRydWUsXHJcbiAgICBcInJsXCI6IHRydWVcclxufTtcclxudmFyIGFsaWduU2V0dGluZyA9IHtcclxuICAgIFwic3RhcnRcIjogdHJ1ZSxcclxuICAgIFwibWlkZGxlXCI6IHRydWUsXHJcbiAgICBcImVuZFwiOiB0cnVlLFxyXG4gICAgXCJsZWZ0XCI6IHRydWUsXHJcbiAgICBcInJpZ2h0XCI6IHRydWVcclxufTtcclxuXHJcbmZ1bmN0aW9uIGZpbmREaXJlY3Rpb25TZXR0aW5nKHZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdmFyIGRpciA9IGRpcmVjdGlvblNldHRpbmdbdmFsdWUudG9Mb3dlckNhc2UoKV07XHJcbiAgICByZXR1cm4gZGlyID8gdmFsdWUudG9Mb3dlckNhc2UoKSA6IGZhbHNlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmaW5kQWxpZ25TZXR0aW5nKHZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdmFyIGFsaWduID0gYWxpZ25TZXR0aW5nW3ZhbHVlLnRvTG93ZXJDYXNlKCldO1xyXG4gICAgcmV0dXJuIGFsaWduID8gdmFsdWUudG9Mb3dlckNhc2UoKSA6IGZhbHNlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBleHRlbmQob2JqKSB7XHJcbiAgICB2YXIgaSA9IDE7XHJcbiAgICBmb3IgKDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBjb2JqID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gY29iaikge1xyXG4gICAgICAgICAgICBvYmpbcF0gPSBjb2JqW3BdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb2JqO1xyXG59XHJcbmlmKCFWVFRDdWUpe1xyXG4gICAgVlRUQ3VlID0gZnVuY3Rpb24gKHN0YXJ0VGltZSwgZW5kVGltZSwgdGV4dCkge1xyXG4gICAgICAgIHZhciBjdWUgPSB0aGlzO1xyXG4gICAgICAgIHZhciBpc0lFOCA9ICgvTVNJRVxcczhcXC4wLykudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcclxuICAgICAgICB2YXIgYmFzZU9iaiA9IHt9O1xyXG5cclxuICAgICAgICBpZiAoaXNJRTgpIHtcclxuICAgICAgICAgICAgY3VlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY3VzdG9tJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYmFzZU9iai5lbnVtZXJhYmxlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNoaW0gaW1wbGVtZW50YXRpb24gc3BlY2lmaWMgcHJvcGVydGllcy4gVGhlc2UgcHJvcGVydGllcyBhcmUgbm90IGluXHJcbiAgICAgICAgICogdGhlIHNwZWMuXHJcbiAgICAgICAgICovXHJcblxyXG4gICAgICAgICAgICAvLyBMZXRzIHVzIGtub3cgd2hlbiB0aGUgVlRUQ3VlJ3MgZGF0YSBoYXMgY2hhbmdlZCBpbiBzdWNoIGEgd2F5IHRoYXQgd2UgbmVlZFxyXG4gICAgICAgICAgICAvLyB0byByZWNvbXB1dGUgaXRzIGRpc3BsYXkgc3RhdGUuIFRoaXMgbGV0cyB1cyBjb21wdXRlIGl0cyBkaXNwbGF5IHN0YXRlXHJcbiAgICAgICAgICAgIC8vIGxhemlseS5cclxuICAgICAgICBjdWUuaGFzQmVlblJlc2V0ID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZUVEN1ZSBhbmQgVGV4dFRyYWNrQ3VlIHByb3BlcnRpZXNcclxuICAgICAgICAgKiBodHRwOi8vZGV2LnczLm9yZy9odG1sNS93ZWJ2dHQvI3Z0dGN1ZS1pbnRlcmZhY2VcclxuICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgdmFyIF9pZCA9IFwiXCI7XHJcbiAgICAgICAgdmFyIF9wYXVzZU9uRXhpdCA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBfc3RhcnRUaW1lID0gc3RhcnRUaW1lO1xyXG4gICAgICAgIHZhciBfZW5kVGltZSA9IGVuZFRpbWU7XHJcbiAgICAgICAgdmFyIF90ZXh0ID0gdGV4dDtcclxuICAgICAgICB2YXIgX3JlZ2lvbiA9IG51bGw7XHJcbiAgICAgICAgdmFyIF92ZXJ0aWNhbCA9IFwiXCI7XHJcbiAgICAgICAgdmFyIF9zbmFwVG9MaW5lcyA9IHRydWU7XHJcbiAgICAgICAgdmFyIF9saW5lID0gXCJhdXRvXCI7XHJcbiAgICAgICAgdmFyIF9saW5lQWxpZ24gPSBcInN0YXJ0XCI7XHJcbiAgICAgICAgdmFyIF9wb3NpdGlvbiA9IDUwO1xyXG4gICAgICAgIHZhciBfcG9zaXRpb25BbGlnbiA9IFwibWlkZGxlXCI7XHJcbiAgICAgICAgdmFyIF9zaXplID0gNTA7XHJcbiAgICAgICAgdmFyIF9hbGlnbiA9IFwibWlkZGxlXCI7XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXHJcbiAgICAgICAgICAgIFwiaWRcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfaWQ7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9pZCA9IFwiXCIgKyB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxyXG4gICAgICAgICAgICBcInBhdXNlT25FeGl0XCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3BhdXNlT25FeGl0O1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBfcGF1c2VPbkV4aXQgPSAhIXZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXHJcbiAgICAgICAgICAgIFwic3RhcnRUaW1lXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3N0YXJ0VGltZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3RhcnQgdGltZSBtdXN0IGJlIHNldCB0byBhIG51bWJlci5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF9zdGFydFRpbWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcclxuICAgICAgICAgICAgXCJlbmRUaW1lXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2VuZFRpbWU7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkVuZCB0aW1lIG11c3QgYmUgc2V0IHRvIGEgbnVtYmVyLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgX2VuZFRpbWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcclxuICAgICAgICAgICAgXCJ0ZXh0XCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RleHQ7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90ZXh0ID0gXCJcIiArIHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxyXG4gICAgICAgICAgICBcInJlZ2lvblwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZWdpb247XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9yZWdpb24gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcclxuICAgICAgICAgICAgXCJ2ZXJ0aWNhbFwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92ZXJ0aWNhbDtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNldHRpbmcgPSBmaW5kRGlyZWN0aW9uU2V0dGluZyh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSGF2ZSB0byBjaGVjayBmb3IgZmFsc2UgYmVjYXVzZSB0aGUgc2V0dGluZyBhbiBiZSBhbiBlbXB0eSBzdHJpbmcuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNldHRpbmcgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihcIkFuIGludmFsaWQgb3IgaWxsZWdhbCBzdHJpbmcgd2FzIHNwZWNpZmllZC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF92ZXJ0aWNhbCA9IHNldHRpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXHJcbiAgICAgICAgICAgIFwic25hcFRvTGluZXNcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfc25hcFRvTGluZXM7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9zbmFwVG9MaW5lcyA9ICEhdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXHJcbiAgICAgICAgICAgIFwibGluZVwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9saW5lO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm51bWJlclwiICYmIHZhbHVlICE9PSBhdXRvS2V5d29yZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJBbiBpbnZhbGlkIG51bWJlciBvciBpbGxlZ2FsIHN0cmluZyB3YXMgc3BlY2lmaWVkLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgX2xpbmUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcclxuICAgICAgICAgICAgXCJsaW5lQWxpZ25cIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfbGluZUFsaWduO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2V0dGluZyA9IGZpbmRBbGlnblNldHRpbmcodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghc2V0dGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJBbiBpbnZhbGlkIG9yIGlsbGVnYWwgc3RyaW5nIHdhcyBzcGVjaWZpZWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBfbGluZUFsaWduID0gc2V0dGluZztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcclxuICAgICAgICAgICAgXCJwb3NpdGlvblwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlIDwgMCB8fCB2YWx1ZSA+IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQb3NpdGlvbiBtdXN0IGJlIGJldHdlZW4gMCBhbmQgMTAwLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgX3Bvc2l0aW9uID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXHJcbiAgICAgICAgICAgIFwicG9zaXRpb25BbGlnblwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9wb3NpdGlvbkFsaWduO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2V0dGluZyA9IGZpbmRBbGlnblNldHRpbmcodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghc2V0dGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJBbiBpbnZhbGlkIG9yIGlsbGVnYWwgc3RyaW5nIHdhcyBzcGVjaWZpZWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBfcG9zaXRpb25BbGlnbiA9IHNldHRpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXHJcbiAgICAgICAgICAgIFwic2l6ZVwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9zaXplO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPCAwIHx8IHZhbHVlID4gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlNpemUgbXVzdCBiZSBiZXR3ZWVuIDAgYW5kIDEwMC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF9zaXplID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXHJcbiAgICAgICAgICAgIFwiYWxpZ25cIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfYWxpZ247XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZXR0aW5nID0gZmluZEFsaWduU2V0dGluZyh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzZXR0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihcIkFuIGludmFsaWQgb3IgaWxsZWdhbCBzdHJpbmcgd2FzIHNwZWNpZmllZC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF9hbGlnbiA9IHNldHRpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE90aGVyIDx0cmFjaz4gc3BlYyBkZWZpbmVkIHByb3BlcnRpZXNcclxuICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgICAgIC8vIGh0dHA6Ly93d3cud2hhdHdnLm9yZy9zcGVjcy93ZWItYXBwcy9jdXJyZW50LXdvcmsvbXVsdGlwYWdlL3RoZS12aWRlby1lbGVtZW50Lmh0bWwjdGV4dC10cmFjay1jdWUtZGlzcGxheS1zdGF0ZVxyXG4gICAgICAgIGN1ZS5kaXNwbGF5U3RhdGUgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIGlmIChpc0lFOCkge1xyXG4gICAgICAgICAgICByZXR1cm4gY3VlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFZUVEN1ZSBtZXRob2RzXHJcbiAgICAgKi9cclxuXHJcbiAgICBWVFRDdWUucHJvdG90eXBlLmdldEN1ZUFzSFRNTCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIEFzc3VtZSBXZWJWVFQuY29udmVydEN1ZVRvRE9NVHJlZSBpcyBvbiB0aGUgZ2xvYmFsLlxyXG4gICAgICAgIHJldHVybiBXZWJWVFQuY29udmVydEN1ZVRvRE9NVHJlZSh3aW5kb3csIHRoaXMudGV4dCk7XHJcbiAgICB9O1xyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZUVEN1ZTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDIzLi5cclxuICovXHJcbmltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgSXQgd2FzIHJlcGxhY2UganF1ZXJ5J3Mgc2VsZWN0b3IuIEl0IE9mdGVuIHVzZWQgYnkgT3ZlblRlbXBsYXRlLiAoL3ZpZXcvZW5naW5lL092ZW5UZW1wbGF0ZS5qcylcclxuICogQHBhcmFtICAgc2VsZWN0b3JPckVsZW1lbnQgIHN0cmluZyBvciBlbGVtZW50XHJcbiAqXHJcbiAqICovXHJcblxyXG5cclxuY29uc3QgTGEkID0gZnVuY3Rpb24oc2VsZWN0b3JPckVsZW1lbnQpe1xyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG4gICAgY29uc3QgcmV0dXJuTm9kZSA9IGZ1bmN0aW9uKCRlbGVtZW50ICwgc2VsZWN0b3Ipe1xyXG4gICAgICAgIGxldCBub2RlTGlzdCA9ICAkZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxuICAgICAgICBpZihub2RlTGlzdC5sZW5ndGggPiAxKXtcclxuICAgICAgICAgICAgcmV0dXJuIG5vZGVMaXN0O1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gbm9kZUxpc3RbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgbGV0ICRlbGVtZW50ID0gXCJcIjtcclxuXHJcbiAgICBpZiggXy5pc0VsZW1lbnQoc2VsZWN0b3JPckVsZW1lbnQpIHx8IF8uZXZlcnkoc2VsZWN0b3JPckVsZW1lbnQsIGZ1bmN0aW9uKGl0ZW0pe3JldHVybiBfLmlzRWxlbWVudChpdGVtKX0pKXtcclxuICAgICAgICAkZWxlbWVudCA9IHNlbGVjdG9yT3JFbGVtZW50O1xyXG4gICAgfWVsc2UgaWYoc2VsZWN0b3JPckVsZW1lbnQgPT09IFwiZG9jdW1lbnRcIil7XHJcbiAgICAgICAgJGVsZW1lbnQgPSBkb2N1bWVudDtcclxuICAgIH1lbHNlIGlmKHNlbGVjdG9yT3JFbGVtZW50ID09PSBcIndpbmRvd1wiKXtcclxuICAgICAgICAkZWxlbWVudCA9IHdpbmRvdztcclxuICAgIH1lbHNle1xyXG4gICAgICAgICRlbGVtZW50ID0gcmV0dXJuTm9kZShkb2N1bWVudCwgc2VsZWN0b3JPckVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBpZighJGVsZW1lbnQpe1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qRUZGRUNUUyovXHJcblxyXG4gICAgdGhhdC5zaG93ID0gKCkgPT57XHJcbiAgICAgICAgJGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuaGlkZSA9ICgpID0+e1xyXG4gICAgICAgICRlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qRUxFTUVOVFMqL1xyXG5cclxuICAgIHRoYXQuYWRkQ2xhc3MgPSAobmFtZSkgPT57XHJcbiAgICAgICAgaWYoJGVsZW1lbnQuY2xhc3NMaXN0KXtcclxuICAgICAgICAgICAgJGVsZW1lbnQuY2xhc3NMaXN0LmFkZChuYW1lKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IGNsYXNzTmFtZXMgPSAkZWxlbWVudC5jbGFzc05hbWUuc3BsaXQoXCIgXCIpO1xyXG4gICAgICAgICAgICBpZihjbGFzc05hbWVzLmluZGV4T2YobmFtZSkgPT09IC0xKXtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTmFtZSArPSBcIiBcIiArIG5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuYWZ0ZXIgPSAoaHRtbFN0cmluZykgPT4ge1xyXG4gICAgICAgICRlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJlbmQnLCBodG1sU3RyaW5nKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5hcHBlbmQgPSAoaHRtbFN0cmluZykgPT4ge1xyXG4gICAgICAgICRlbGVtZW50LmFwcGVuZENoaWxkKGh0bWxTdHJpbmcpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmJlZm9yZSA9IChodG1sU3RyaW5nKSA9PiB7XHJcbiAgICAgICAgJGVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmViZWdpbicsIGh0bWxTdHJpbmcpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmNoaWxkcmVuID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiAkZWxlbWVudC5jaGlsZHJlbiB8fCBbXTtcclxuICAgIH07XHJcblxyXG4gICAgLy9UaGUgY29udGFpbnMoKSBtZXRob2QgcmV0dXJucyBhIEJvb2xlYW4gdmFsdWUgaW5kaWNhdGluZyB3aGV0aGVyIGEgbm9kZSBpcyBhIGRlc2NlbmRhbnQgb2YgYSBzcGVjaWZpZWQgbm9kZS5cclxuICAgIC8vQSBkZXNjZW5kYW50IGNhbiBiZSBhIGNoaWxkLCBncmFuZGNoaWxkLCBncmVhdC1ncmFuZGNoaWxkLCBhbmQgc28gb24uXHJcbiAgICB0aGF0LmNvbnRhaW5zID0gKGVsQ2hpbGQpID0+IHtcclxuICAgICAgICByZXR1cm4gJGVsZW1lbnQgIT09IGVsQ2hpbGQgJiYgJGVsZW1lbnQuY29udGFpbnMoZWxDaGlsZCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZW1wdHkgPSAoKSA9PiB7XHJcbiAgICAgICAgJGVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoYXQuZmluZCA9IChzZWxlY3RvcikgPT57XHJcbiAgICAgICAgcmV0dXJuIExhJChyZXR1cm5Ob2RlKCRlbGVtZW50LCBzZWxlY3RvcikpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmNzcyA9IChuYW1lLCB2YWx1ZSkgPT4ge1xyXG4gICAgICAgIGlmKHZhbHVlKXtcclxuICAgICAgICAgICAgaWYoJGVsZW1lbnQubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGVbbmFtZV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuc3R5bGVbbmFtZV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gJGVsZW1lbnQuc3R5bGVbbmFtZV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG5cclxuXHJcbiAgICB0aGF0LnJlbW92ZUNsYXNzID0gKG5hbWUpID0+e1xyXG4gICAgICAgIGlmICgkZWxlbWVudC5jbGFzc0xpc3Qpe1xyXG4gICAgICAgICAgICAkZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKG5hbWUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAkZWxlbWVudC5jbGFzc05hbWUgPSAkZWxlbWVudC5jbGFzc05hbWUucmVwbGFjZShuZXcgUmVnRXhwKCcoXnxcXFxcYiknICsgbmFtZS5zcGxpdCgnICcpLmpvaW4oJ3wnKSArICcoXFxcXGJ8JCknLCAnZ2knKSwgJyAnKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnJlbW92ZUF0dHJpYnV0ZSA9IChhdHRyTmFtZSkgPT4ge1xyXG4gICAgICAgICRlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShhdHRyTmFtZSk7XHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgLyp0aGF0LmFwcGVuZCA9IChodG1sQ29kZSkgPT57XHJcbiAgICAgICAgJGVsZW1lbnQuaW5uZXJIVE1MICs9IGh0bWxDb2RlO1xyXG4gICAgfTsqL1xyXG5cclxuICAgIHRoYXQudGV4dCA9ICh0ZXh0KSA9PiB7IC8vSUU4K1xyXG4gICAgICAgIGlmKHRleHQgPT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiAkZWxlbWVudC50ZXh0Q29udGVudDtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgJGVsZW1lbnQudGV4dENvbnRlbnQgPSB0ZXh0O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aGF0Lmh0bWwgPSAoaHRtbFN0cmluZykgPT4ge1xyXG4gICAgICAgICRlbGVtZW50LmlubmVySFRNTCA9IGh0bWxTdHJpbmc7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5oYXNDbGFzcyA9IChuYW1lKSA9PiB7IC8vSUU4K1xyXG4gICAgICAgIGlmKCRlbGVtZW50LmNsYXNzTGlzdCl7XHJcbiAgICAgICAgICAgIHJldHVybiAkZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMobmFtZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVnRXhwKCcoXnwgKScgKyBuYW1lICsgJyggfCQpJywgJ2dpJykudGVzdCgkZWxlbWVudC5uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuaXMgPSAoJHRhcmdldEVsZW1lbnQpID0+IHtcclxuICAgICAgICAvKnZhciBtYXRjaGVzID0gZnVuY3Rpb24oZWwsIHNlbGVjdG9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoZWwubWF0Y2hlcyB8fCBlbC5tYXRjaGVzU2VsZWN0b3IgfHwgZWwubXNNYXRjaGVzU2VsZWN0b3IgfHwgZWwubW96TWF0Y2hlc1NlbGVjdG9yIHx8IGVsLndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fCBlbC5vTWF0Y2hlc1NlbGVjdG9yKS5jYWxsKGVsLCBzZWxlY3Rvcik7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbWF0Y2hlcyhlbCwgJy5teS1jbGFzcycpOyovXHJcbiAgICAgICAgcmV0dXJuICRlbGVtZW50ID09PSAkdGFyZ2V0RWxlbWVudDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5vZmZzZXQgPSAoKSA9PnsgICAgLy9JRTgrXHJcbiAgICAgICAgdmFyIHJlY3QgPSAkZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdG9wOiByZWN0LnRvcCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wLFxyXG4gICAgICAgICAgICBsZWZ0OiByZWN0LmxlZnQgKyBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnRcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQud2lkdGggPSAoKSA9PiB7ICAgIC8vSUU4K1xyXG4gICAgICAgIHJldHVybiAkZWxlbWVudC5jbGllbnRXaWR0aDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5oZWlnaHQgPSAoKSA9PiB7ICAgLy9JRTgrXHJcbiAgICAgICAgcmV0dXJuICRlbGVtZW50LmNsaWVudEhlaWdodDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5hdHRyID0gKGF0dHIpID0+IHtcclxuICAgICAgICByZXR1cm4gJGVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHIpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnJlcGxhY2UgPSAoaHRtbCkgPT4ge1xyXG4gICAgICAgICRlbGVtZW50LnJlcGxhY2VXaXRoKGh0bWwpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhhdC5yZW1vdmUgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoJGVsZW1lbnQubGVuZ3RoID4gMSl7XHJcbiAgICAgICAgICAgICRlbGVtZW50LnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoJGVsZW1lbnQpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAkZWxlbWVudC5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnJlbW92ZUNoaWxkID0gKGVsZW1lbnQpID0+IHtcclxuICAgICAgICBpZihlbGVtZW50KXtcclxuICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHdoaWxlICgkZWxlbWVudC5oYXNDaGlsZE5vZGVzKCkpIHtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZUNoaWxkKCRlbGVtZW50LmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXQgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICRlbGVtZW50O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmNsb3Nlc3QgPSAoc2VsZWN0b3JTdHJpbmcpID0+IHtcclxuXHJcbiAgICAgICAgJGVsZW1lbnQuY2xvc2VzdCA9IGZ1bmN0aW9uIChzKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgZWwgPSAkZWxlbWVudDtcclxuXHJcbiAgICAgICAgICAgIGRvIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZWwubWF0Y2hlcyhzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBlbCA9IGVsLnBhcmVudEVsZW1lbnQgfHwgZWwucGFyZW50Tm9kZTtcclxuXHJcbiAgICAgICAgICAgIH0gd2hpbGUgKGVsICE9PSBudWxsICYmIGVsLm5vZGVUeXBlID09PSAxKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxldCBjbG9zZXN0RWxlbWVudCA9ICRlbGVtZW50LmNsb3Nlc3Qoc2VsZWN0b3JTdHJpbmcpO1xyXG5cclxuICAgICAgICBpZihjbG9zZXN0RWxlbWVudCl7XHJcbiAgICAgICAgICAgIHJldHVybiBMYSQoY2xvc2VzdEVsZW1lbnQpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGEkO1xyXG4iLCJpbXBvcnQgXyBmcm9tICcuL3VuZGVyc2NvcmUnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRyaW0oc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gc3RyaW5nID8gc3RyaW5nLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKSA6IFwiXCI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBleHRyYWN0RXh0ZW5zaW9uXHJcbiAqXHJcbiAqIEBwYXJhbSAgICAgIHtzdHJpbmd9IHBhdGggZm9yIHVybFxyXG4gKiBAcmV0dXJuICAgICB7c3RyaW5nfSAgRXh0ZW5zaW9uXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZXh0cmFjdEV4dGVuc2lvbiA9IGZ1bmN0aW9uKHBhdGgpIHtcclxuICAgIGlmKCFwYXRoIHx8IHBhdGguc3Vic3RyKDAsNCk9PSdydG1wJykge1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZ2V0QXp1cmVGaWxlRm9ybWF0KHBhdGgpIHtcclxuICAgICAgICBsZXQgZXh0ZW5zaW9uID0gXCJcIjtcclxuICAgICAgICBpZiAoKC9bKCxdZm9ybWF0PW1wZC0vaSkudGVzdChwYXRoKSkge1xyXG4gICAgICAgICAgICBleHRlbnNpb24gPSAnbXBkJztcclxuICAgICAgICB9ZWxzZSBpZiAoKC9bKCxdZm9ybWF0PW0zdTgtL2kpLnRlc3QocGF0aCkpIHtcclxuICAgICAgICAgICAgZXh0ZW5zaW9uID0gJ20zdTgnO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZXh0ZW5zaW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBhenVyZWRGb3JtYXQgPSBnZXRBenVyZUZpbGVGb3JtYXQocGF0aCk7XHJcbiAgICBpZihhenVyZWRGb3JtYXQpIHtcclxuICAgICAgICByZXR1cm4gYXp1cmVkRm9ybWF0O1xyXG4gICAgfVxyXG4gICAgcGF0aCA9IHBhdGguc3BsaXQoJz8nKVswXS5zcGxpdCgnIycpWzBdO1xyXG4gICAgaWYocGF0aC5sYXN0SW5kZXhPZignLicpID4gLTEpIHtcclxuICAgICAgICByZXR1cm4gcGF0aC5zdWJzdHIocGF0aC5sYXN0SW5kZXhPZignLicpICsgMSwgcGF0aC5sZW5ndGgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxufTtcclxuXHJcblxyXG4vKipcclxuICogbmF0dXJhbEhtc1xyXG4gKlxyXG4gKiBAcGFyYW0gICAgICB7bnVtYmVyIHwgc3RyaW5nfSAgc2Vjb25kICBUaGUgc2Vjb25kXHJcbiAqIEByZXR1cm4gICAgIHtzdHJpbmd9ICBmb3JtYXR0ZWQgU3RyaW5nXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbmF0dXJhbEhtcyhzZWNvbmQpIHtcclxuICAgIGxldCBzZWNOdW0gPSBwYXJzZUludChzZWNvbmQsIDEwKTtcclxuICAgIGlmKCFzZWNvbmQpe1xyXG4gICAgICAgIHJldHVybiBcIjAwOjAwXCI7XHJcbiAgICB9XHJcbiAgICBsZXQgaG91cnMgICA9IE1hdGguZmxvb3Ioc2VjTnVtIC8gMzYwMCk7XHJcbiAgICBsZXQgbWludXRlcyA9IE1hdGguZmxvb3IoKHNlY051bSAtIChob3VycyAqIDM2MDApKSAvIDYwKTtcclxuICAgIGxldCBzZWNvbmRzID0gc2VjTnVtIC0gKGhvdXJzICogMzYwMCkgLSAobWludXRlcyAqIDYwKTtcclxuXHJcbiAgICAvL2lmIChob3VycyA+IDApIHttaW51dGVzID0gXCIwXCIrbWludXRlczt9XHJcbiAgICBpZiAobWludXRlcyA8IDEwKSB7bWludXRlcyA9IFwiMFwiK21pbnV0ZXM7fVxyXG4gICAgaWYgKHNlY29uZHMgPCAxMCkge3NlY29uZHMgPSBcIjBcIitzZWNvbmRzO31cclxuXHJcbiAgICBpZiAoaG91cnMgPiAwKSB7XHJcbiAgICAgICAgcmV0dXJuIGhvdXJzKyc6JyttaW51dGVzKyc6JytzZWNvbmRzO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gbWludXRlcysnOicrc2Vjb25kcztcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBobXNUb1NlY29uZChzdHIsIGZyYW1lUmF0ZSkge1xyXG4gICAgaWYoIXN0cikge1xyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gICAgaWYoXy5pc051bWJlcihzdHIpICYmICFfLmlzTmFOKHN0cikpe1xyXG4gICAgICAgIHJldHVybiBzdHI7XHJcbiAgICB9XHJcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgnLCcsICcuJyk7XHJcbiAgICBsZXQgYXJyID0gc3RyLnNwbGl0KCc6Jyk7XHJcbiAgICBsZXQgYXJyTGVuZ3RoID0gYXJyLmxlbmd0aDtcclxuICAgIGxldCBzZWMgPSAwO1xyXG4gICAgaWYgKHN0ci5zbGljZSgtMSkgPT09ICdzJyl7XHJcbiAgICAgICAgc2VjID0gcGFyc2VGbG9hdChzdHIpO1xyXG4gICAgfWVsc2UgaWYgKHN0ci5zbGljZSgtMSkgPT09ICdtJyl7XHJcbiAgICAgICAgc2VjID0gcGFyc2VGbG9hdChzdHIpICogNjA7XHJcbiAgICB9ZWxzZSBpZiAoc3RyLnNsaWNlKC0xKSA9PT0gJ2gnKXtcclxuICAgICAgICBzZWMgPSBwYXJzZUZsb2F0KHN0cikgKiAzNjAwO1xyXG4gICAgfWVsc2UgaWYgKGFyckxlbmd0aCA+IDEpIHtcclxuICAgICAgICB2YXIgc2VjSW5kZXggPSBhcnJMZW5ndGggLSAxO1xyXG4gICAgICAgIGlmIChhcnJMZW5ndGggPT09IDQpIHtcclxuICAgICAgICAgICAgaWYgKGZyYW1lUmF0ZSkge1xyXG4gICAgICAgICAgICAgICAgc2VjID0gcGFyc2VGbG9hdChhcnJbc2VjSW5kZXhdKSAvIGZyYW1lUmF0ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWNJbmRleCAtPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZWMgKz0gcGFyc2VGbG9hdChhcnJbc2VjSW5kZXhdKTtcclxuICAgICAgICBzZWMgKz0gcGFyc2VGbG9hdChhcnJbc2VjSW5kZXggLSAxXSkgKiA2MDtcclxuICAgICAgICBpZiAoYXJyTGVuZ3RoID49IDMpIHtcclxuICAgICAgICAgICAgc2VjICs9IHBhcnNlRmxvYXQoYXJyW3NlY0luZGV4IC0gMl0pICogMzYwMDtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNlYyA9IHBhcnNlRmxvYXQoc3RyKTtcclxuICAgIH1cclxuICAgIGlmIChfLmlzTmFOKHNlYykpIHtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICAgIHJldHVybiBzZWM7XHJcbn0iLCIvLyAgICAgVW5kZXJzY29yZS5qcyAxLjkuMVxyXG4vLyAgICAgaHR0cDovL3VuZGVyc2NvcmVqcy5vcmdcclxuLy8gICAgIChjKSAyMDA5LTIwMTggSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcclxuLy8gICAgIFVuZGVyc2NvcmUgbWF5IGJlIGZyZWVseSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXHJcbiFmdW5jdGlvbigpe3ZhciBuPVwib2JqZWN0XCI9PXR5cGVvZiBzZWxmJiZzZWxmLnNlbGY9PT1zZWxmJiZzZWxmfHxcIm9iamVjdFwiPT10eXBlb2YgZ2xvYmFsJiZnbG9iYWwuZ2xvYmFsPT09Z2xvYmFsJiZnbG9iYWx8fHRoaXN8fHt9LHI9bi5fLGU9QXJyYXkucHJvdG90eXBlLG89T2JqZWN0LnByb3RvdHlwZSxzPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBTeW1ib2w/U3ltYm9sLnByb3RvdHlwZTpudWxsLHU9ZS5wdXNoLGM9ZS5zbGljZSxwPW8udG9TdHJpbmcsaT1vLmhhc093blByb3BlcnR5LHQ9QXJyYXkuaXNBcnJheSxhPU9iamVjdC5rZXlzLGw9T2JqZWN0LmNyZWF0ZSxmPWZ1bmN0aW9uKCl7fSxoPWZ1bmN0aW9uKG4pe3JldHVybiBuIGluc3RhbmNlb2YgaD9uOnRoaXMgaW5zdGFuY2VvZiBoP3ZvaWQodGhpcy5fd3JhcHBlZD1uKTpuZXcgaChuKX07XCJ1bmRlZmluZWRcIj09dHlwZW9mIGV4cG9ydHN8fGV4cG9ydHMubm9kZVR5cGU/bi5fPWg6KFwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGUmJiFtb2R1bGUubm9kZVR5cGUmJm1vZHVsZS5leHBvcnRzJiYoZXhwb3J0cz1tb2R1bGUuZXhwb3J0cz1oKSxleHBvcnRzLl89aCksaC5WRVJTSU9OPVwiMS45LjFcIjt2YXIgdix5PWZ1bmN0aW9uKHUsaSxuKXtpZih2b2lkIDA9PT1pKXJldHVybiB1O3N3aXRjaChudWxsPT1uPzM6bil7Y2FzZSAxOnJldHVybiBmdW5jdGlvbihuKXtyZXR1cm4gdS5jYWxsKGksbil9O2Nhc2UgMzpyZXR1cm4gZnVuY3Rpb24obixyLHQpe3JldHVybiB1LmNhbGwoaSxuLHIsdCl9O2Nhc2UgNDpyZXR1cm4gZnVuY3Rpb24obixyLHQsZSl7cmV0dXJuIHUuY2FsbChpLG4scix0LGUpfX1yZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gdS5hcHBseShpLGFyZ3VtZW50cyl9fSxkPWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gaC5pdGVyYXRlZSE9PXY/aC5pdGVyYXRlZShuLHIpOm51bGw9PW4/aC5pZGVudGl0eTpoLmlzRnVuY3Rpb24obik/eShuLHIsdCk6aC5pc09iamVjdChuKSYmIWguaXNBcnJheShuKT9oLm1hdGNoZXIobik6aC5wcm9wZXJ0eShuKX07aC5pdGVyYXRlZT12PWZ1bmN0aW9uKG4scil7cmV0dXJuIGQobixyLDEvMCl9O3ZhciBnPWZ1bmN0aW9uKHUsaSl7cmV0dXJuIGk9bnVsbD09aT91Lmxlbmd0aC0xOitpLGZ1bmN0aW9uKCl7Zm9yKHZhciBuPU1hdGgubWF4KGFyZ3VtZW50cy5sZW5ndGgtaSwwKSxyPUFycmF5KG4pLHQ9MDt0PG47dCsrKXJbdF09YXJndW1lbnRzW3QraV07c3dpdGNoKGkpe2Nhc2UgMDpyZXR1cm4gdS5jYWxsKHRoaXMscik7Y2FzZSAxOnJldHVybiB1LmNhbGwodGhpcyxhcmd1bWVudHNbMF0scik7Y2FzZSAyOnJldHVybiB1LmNhbGwodGhpcyxhcmd1bWVudHNbMF0sYXJndW1lbnRzWzFdLHIpfXZhciBlPUFycmF5KGkrMSk7Zm9yKHQ9MDt0PGk7dCsrKWVbdF09YXJndW1lbnRzW3RdO3JldHVybiBlW2ldPXIsdS5hcHBseSh0aGlzLGUpfX0sbT1mdW5jdGlvbihuKXtpZighaC5pc09iamVjdChuKSlyZXR1cm57fTtpZihsKXJldHVybiBsKG4pO2YucHJvdG90eXBlPW47dmFyIHI9bmV3IGY7cmV0dXJuIGYucHJvdG90eXBlPW51bGwscn0sYj1mdW5jdGlvbihyKXtyZXR1cm4gZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PW4/dm9pZCAwOm5bcl19fSxqPWZ1bmN0aW9uKG4scil7cmV0dXJuIG51bGwhPW4mJmkuY2FsbChuLHIpfSx4PWZ1bmN0aW9uKG4scil7Zm9yKHZhciB0PXIubGVuZ3RoLGU9MDtlPHQ7ZSsrKXtpZihudWxsPT1uKXJldHVybjtuPW5bcltlXV19cmV0dXJuIHQ/bjp2b2lkIDB9LF89TWF0aC5wb3coMiw1MyktMSxBPWIoXCJsZW5ndGhcIiksdz1mdW5jdGlvbihuKXt2YXIgcj1BKG4pO3JldHVyblwibnVtYmVyXCI9PXR5cGVvZiByJiYwPD1yJiZyPD1ffTtoLmVhY2g9aC5mb3JFYWNoPWZ1bmN0aW9uKG4scix0KXt2YXIgZSx1O2lmKHI9eShyLHQpLHcobikpZm9yKGU9MCx1PW4ubGVuZ3RoO2U8dTtlKyspcihuW2VdLGUsbik7ZWxzZXt2YXIgaT1oLmtleXMobik7Zm9yKGU9MCx1PWkubGVuZ3RoO2U8dTtlKyspcihuW2lbZV1dLGlbZV0sbil9cmV0dXJuIG59LGgubWFwPWguY29sbGVjdD1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPSF3KG4pJiZoLmtleXMobiksdT0oZXx8bikubGVuZ3RoLGk9QXJyYXkodSksbz0wO288dTtvKyspe3ZhciBhPWU/ZVtvXTpvO2lbb109cihuW2FdLGEsbil9cmV0dXJuIGl9O3ZhciBPPWZ1bmN0aW9uKGMpe3JldHVybiBmdW5jdGlvbihuLHIsdCxlKXt2YXIgdT0zPD1hcmd1bWVudHMubGVuZ3RoO3JldHVybiBmdW5jdGlvbihuLHIsdCxlKXt2YXIgdT0hdyhuKSYmaC5rZXlzKG4pLGk9KHV8fG4pLmxlbmd0aCxvPTA8Yz8wOmktMTtmb3IoZXx8KHQ9blt1P3Vbb106b10sbys9Yyk7MDw9byYmbzxpO28rPWMpe3ZhciBhPXU/dVtvXTpvO3Q9cih0LG5bYV0sYSxuKX1yZXR1cm4gdH0obix5KHIsZSw0KSx0LHUpfX07aC5yZWR1Y2U9aC5mb2xkbD1oLmluamVjdD1PKDEpLGgucmVkdWNlUmlnaHQ9aC5mb2xkcj1PKC0xKSxoLmZpbmQ9aC5kZXRlY3Q9ZnVuY3Rpb24obixyLHQpe3ZhciBlPSh3KG4pP2guZmluZEluZGV4OmguZmluZEtleSkobixyLHQpO2lmKHZvaWQgMCE9PWUmJi0xIT09ZSlyZXR1cm4gbltlXX0saC5maWx0ZXI9aC5zZWxlY3Q9ZnVuY3Rpb24obixlLHIpe3ZhciB1PVtdO3JldHVybiBlPWQoZSxyKSxoLmVhY2gobixmdW5jdGlvbihuLHIsdCl7ZShuLHIsdCkmJnUucHVzaChuKX0pLHV9LGgucmVqZWN0PWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gaC5maWx0ZXIobixoLm5lZ2F0ZShkKHIpKSx0KX0saC5ldmVyeT1oLmFsbD1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPSF3KG4pJiZoLmtleXMobiksdT0oZXx8bikubGVuZ3RoLGk9MDtpPHU7aSsrKXt2YXIgbz1lP2VbaV06aTtpZighcihuW29dLG8sbikpcmV0dXJuITF9cmV0dXJuITB9LGguc29tZT1oLmFueT1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPSF3KG4pJiZoLmtleXMobiksdT0oZXx8bikubGVuZ3RoLGk9MDtpPHU7aSsrKXt2YXIgbz1lP2VbaV06aTtpZihyKG5bb10sbyxuKSlyZXR1cm4hMH1yZXR1cm4hMX0saC5jb250YWlucz1oLmluY2x1ZGVzPWguaW5jbHVkZT1mdW5jdGlvbihuLHIsdCxlKXtyZXR1cm4gdyhuKXx8KG49aC52YWx1ZXMobikpLChcIm51bWJlclwiIT10eXBlb2YgdHx8ZSkmJih0PTApLDA8PWguaW5kZXhPZihuLHIsdCl9LGguaW52b2tlPWcoZnVuY3Rpb24obix0LGUpe3ZhciB1LGk7cmV0dXJuIGguaXNGdW5jdGlvbih0KT9pPXQ6aC5pc0FycmF5KHQpJiYodT10LnNsaWNlKDAsLTEpLHQ9dFt0Lmxlbmd0aC0xXSksaC5tYXAobixmdW5jdGlvbihuKXt2YXIgcj1pO2lmKCFyKXtpZih1JiZ1Lmxlbmd0aCYmKG49eChuLHUpKSxudWxsPT1uKXJldHVybjtyPW5bdF19cmV0dXJuIG51bGw9PXI/cjpyLmFwcGx5KG4sZSl9KX0pLGgucGx1Y2s9ZnVuY3Rpb24obixyKXtyZXR1cm4gaC5tYXAobixoLnByb3BlcnR5KHIpKX0saC53aGVyZT1mdW5jdGlvbihuLHIpe3JldHVybiBoLmZpbHRlcihuLGgubWF0Y2hlcihyKSl9LGguZmluZFdoZXJlPWZ1bmN0aW9uKG4scil7cmV0dXJuIGguZmluZChuLGgubWF0Y2hlcihyKSl9LGgubWF4PWZ1bmN0aW9uKG4sZSxyKXt2YXIgdCx1LGk9LTEvMCxvPS0xLzA7aWYobnVsbD09ZXx8XCJudW1iZXJcIj09dHlwZW9mIGUmJlwib2JqZWN0XCIhPXR5cGVvZiBuWzBdJiZudWxsIT1uKWZvcih2YXIgYT0wLGM9KG49dyhuKT9uOmgudmFsdWVzKG4pKS5sZW5ndGg7YTxjO2ErKyludWxsIT0odD1uW2FdKSYmaTx0JiYoaT10KTtlbHNlIGU9ZChlLHIpLGguZWFjaChuLGZ1bmN0aW9uKG4scix0KXt1PWUobixyLHQpLChvPHV8fHU9PT0tMS8wJiZpPT09LTEvMCkmJihpPW4sbz11KX0pO3JldHVybiBpfSxoLm1pbj1mdW5jdGlvbihuLGUscil7dmFyIHQsdSxpPTEvMCxvPTEvMDtpZihudWxsPT1lfHxcIm51bWJlclwiPT10eXBlb2YgZSYmXCJvYmplY3RcIiE9dHlwZW9mIG5bMF0mJm51bGwhPW4pZm9yKHZhciBhPTAsYz0obj13KG4pP246aC52YWx1ZXMobikpLmxlbmd0aDthPGM7YSsrKW51bGwhPSh0PW5bYV0pJiZ0PGkmJihpPXQpO2Vsc2UgZT1kKGUsciksaC5lYWNoKG4sZnVuY3Rpb24obixyLHQpeygodT1lKG4scix0KSk8b3x8dT09PTEvMCYmaT09PTEvMCkmJihpPW4sbz11KX0pO3JldHVybiBpfSxoLnNodWZmbGU9ZnVuY3Rpb24obil7cmV0dXJuIGguc2FtcGxlKG4sMS8wKX0saC5zYW1wbGU9ZnVuY3Rpb24obixyLHQpe2lmKG51bGw9PXJ8fHQpcmV0dXJuIHcobil8fChuPWgudmFsdWVzKG4pKSxuW2gucmFuZG9tKG4ubGVuZ3RoLTEpXTt2YXIgZT13KG4pP2guY2xvbmUobik6aC52YWx1ZXMobiksdT1BKGUpO3I9TWF0aC5tYXgoTWF0aC5taW4ocix1KSwwKTtmb3IodmFyIGk9dS0xLG89MDtvPHI7bysrKXt2YXIgYT1oLnJhbmRvbShvLGkpLGM9ZVtvXTtlW29dPWVbYV0sZVthXT1jfXJldHVybiBlLnNsaWNlKDAscil9LGguc29ydEJ5PWZ1bmN0aW9uKG4sZSxyKXt2YXIgdT0wO3JldHVybiBlPWQoZSxyKSxoLnBsdWNrKGgubWFwKG4sZnVuY3Rpb24obixyLHQpe3JldHVybnt2YWx1ZTpuLGluZGV4OnUrKyxjcml0ZXJpYTplKG4scix0KX19KS5zb3J0KGZ1bmN0aW9uKG4scil7dmFyIHQ9bi5jcml0ZXJpYSxlPXIuY3JpdGVyaWE7aWYodCE9PWUpe2lmKGU8dHx8dm9pZCAwPT09dClyZXR1cm4gMTtpZih0PGV8fHZvaWQgMD09PWUpcmV0dXJuLTF9cmV0dXJuIG4uaW5kZXgtci5pbmRleH0pLFwidmFsdWVcIil9O3ZhciBrPWZ1bmN0aW9uKG8scil7cmV0dXJuIGZ1bmN0aW9uKGUsdSxuKXt2YXIgaT1yP1tbXSxbXV06e307cmV0dXJuIHU9ZCh1LG4pLGguZWFjaChlLGZ1bmN0aW9uKG4scil7dmFyIHQ9dShuLHIsZSk7byhpLG4sdCl9KSxpfX07aC5ncm91cEJ5PWsoZnVuY3Rpb24obixyLHQpe2oobix0KT9uW3RdLnB1c2gocik6blt0XT1bcl19KSxoLmluZGV4Qnk9ayhmdW5jdGlvbihuLHIsdCl7blt0XT1yfSksaC5jb3VudEJ5PWsoZnVuY3Rpb24obixyLHQpe2oobix0KT9uW3RdKys6blt0XT0xfSk7dmFyIFM9L1teXFx1ZDgwMC1cXHVkZmZmXXxbXFx1ZDgwMC1cXHVkYmZmXVtcXHVkYzAwLVxcdWRmZmZdfFtcXHVkODAwLVxcdWRmZmZdL2c7aC50b0FycmF5PWZ1bmN0aW9uKG4pe3JldHVybiBuP2guaXNBcnJheShuKT9jLmNhbGwobik6aC5pc1N0cmluZyhuKT9uLm1hdGNoKFMpOncobik/aC5tYXAobixoLmlkZW50aXR5KTpoLnZhbHVlcyhuKTpbXX0saC5zaXplPWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT1uPzA6dyhuKT9uLmxlbmd0aDpoLmtleXMobikubGVuZ3RofSxoLnBhcnRpdGlvbj1rKGZ1bmN0aW9uKG4scix0KXtuW3Q/MDoxXS5wdXNoKHIpfSwhMCksaC5maXJzdD1oLmhlYWQ9aC50YWtlPWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gbnVsbD09bnx8bi5sZW5ndGg8MT9udWxsPT1yP3ZvaWQgMDpbXTpudWxsPT1yfHx0P25bMF06aC5pbml0aWFsKG4sbi5sZW5ndGgtcil9LGguaW5pdGlhbD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGMuY2FsbChuLDAsTWF0aC5tYXgoMCxuLmxlbmd0aC0obnVsbD09cnx8dD8xOnIpKSl9LGgubGFzdD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIG51bGw9PW58fG4ubGVuZ3RoPDE/bnVsbD09cj92b2lkIDA6W106bnVsbD09cnx8dD9uW24ubGVuZ3RoLTFdOmgucmVzdChuLE1hdGgubWF4KDAsbi5sZW5ndGgtcikpfSxoLnJlc3Q9aC50YWlsPWguZHJvcD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGMuY2FsbChuLG51bGw9PXJ8fHQ/MTpyKX0saC5jb21wYWN0PWZ1bmN0aW9uKG4pe3JldHVybiBoLmZpbHRlcihuLEJvb2xlYW4pfTt2YXIgTT1mdW5jdGlvbihuLHIsdCxlKXtmb3IodmFyIHU9KGU9ZXx8W10pLmxlbmd0aCxpPTAsbz1BKG4pO2k8bztpKyspe3ZhciBhPW5baV07aWYodyhhKSYmKGguaXNBcnJheShhKXx8aC5pc0FyZ3VtZW50cyhhKSkpaWYocilmb3IodmFyIGM9MCxsPWEubGVuZ3RoO2M8bDspZVt1KytdPWFbYysrXTtlbHNlIE0oYSxyLHQsZSksdT1lLmxlbmd0aDtlbHNlIHR8fChlW3UrK109YSl9cmV0dXJuIGV9O2guZmxhdHRlbj1mdW5jdGlvbihuLHIpe3JldHVybiBNKG4sciwhMSl9LGgud2l0aG91dD1nKGZ1bmN0aW9uKG4scil7cmV0dXJuIGguZGlmZmVyZW5jZShuLHIpfSksaC51bmlxPWgudW5pcXVlPWZ1bmN0aW9uKG4scix0LGUpe2guaXNCb29sZWFuKHIpfHwoZT10LHQ9cixyPSExKSxudWxsIT10JiYodD1kKHQsZSkpO2Zvcih2YXIgdT1bXSxpPVtdLG89MCxhPUEobik7bzxhO28rKyl7dmFyIGM9bltvXSxsPXQ/dChjLG8sbik6YztyJiYhdD8obyYmaT09PWx8fHUucHVzaChjKSxpPWwpOnQ/aC5jb250YWlucyhpLGwpfHwoaS5wdXNoKGwpLHUucHVzaChjKSk6aC5jb250YWlucyh1LGMpfHx1LnB1c2goYyl9cmV0dXJuIHV9LGgudW5pb249ZyhmdW5jdGlvbihuKXtyZXR1cm4gaC51bmlxKE0obiwhMCwhMCkpfSksaC5pbnRlcnNlY3Rpb249ZnVuY3Rpb24obil7Zm9yKHZhciByPVtdLHQ9YXJndW1lbnRzLmxlbmd0aCxlPTAsdT1BKG4pO2U8dTtlKyspe3ZhciBpPW5bZV07aWYoIWguY29udGFpbnMocixpKSl7dmFyIG87Zm9yKG89MTtvPHQmJmguY29udGFpbnMoYXJndW1lbnRzW29dLGkpO28rKyk7bz09PXQmJnIucHVzaChpKX19cmV0dXJuIHJ9LGguZGlmZmVyZW5jZT1nKGZ1bmN0aW9uKG4scil7cmV0dXJuIHI9TShyLCEwLCEwKSxoLmZpbHRlcihuLGZ1bmN0aW9uKG4pe3JldHVybiFoLmNvbnRhaW5zKHIsbil9KX0pLGgudW56aXA9ZnVuY3Rpb24obil7Zm9yKHZhciByPW4mJmgubWF4KG4sQSkubGVuZ3RofHwwLHQ9QXJyYXkociksZT0wO2U8cjtlKyspdFtlXT1oLnBsdWNrKG4sZSk7cmV0dXJuIHR9LGguemlwPWcoaC51bnppcCksaC5vYmplY3Q9ZnVuY3Rpb24obixyKXtmb3IodmFyIHQ9e30sZT0wLHU9QShuKTtlPHU7ZSsrKXI/dFtuW2VdXT1yW2VdOnRbbltlXVswXV09bltlXVsxXTtyZXR1cm4gdH07dmFyIEY9ZnVuY3Rpb24oaSl7cmV0dXJuIGZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGU9QShuKSx1PTA8aT8wOmUtMTswPD11JiZ1PGU7dSs9aSlpZihyKG5bdV0sdSxuKSlyZXR1cm4gdTtyZXR1cm4tMX19O2guZmluZEluZGV4PUYoMSksaC5maW5kTGFzdEluZGV4PUYoLTEpLGguc29ydGVkSW5kZXg9ZnVuY3Rpb24obixyLHQsZSl7Zm9yKHZhciB1PSh0PWQodCxlLDEpKShyKSxpPTAsbz1BKG4pO2k8bzspe3ZhciBhPU1hdGguZmxvb3IoKGkrbykvMik7dChuW2FdKTx1P2k9YSsxOm89YX1yZXR1cm4gaX07dmFyIEU9ZnVuY3Rpb24oaSxvLGEpe3JldHVybiBmdW5jdGlvbihuLHIsdCl7dmFyIGU9MCx1PUEobik7aWYoXCJudW1iZXJcIj09dHlwZW9mIHQpMDxpP2U9MDw9dD90Ok1hdGgubWF4KHQrdSxlKTp1PTA8PXQ/TWF0aC5taW4odCsxLHUpOnQrdSsxO2Vsc2UgaWYoYSYmdCYmdSlyZXR1cm4gblt0PWEobixyKV09PT1yP3Q6LTE7aWYociE9cilyZXR1cm4gMDw9KHQ9byhjLmNhbGwobixlLHUpLGguaXNOYU4pKT90K2U6LTE7Zm9yKHQ9MDxpP2U6dS0xOzA8PXQmJnQ8dTt0Kz1pKWlmKG5bdF09PT1yKXJldHVybiB0O3JldHVybi0xfX07aC5pbmRleE9mPUUoMSxoLmZpbmRJbmRleCxoLnNvcnRlZEluZGV4KSxoLmxhc3RJbmRleE9mPUUoLTEsaC5maW5kTGFzdEluZGV4KSxoLnJhbmdlPWZ1bmN0aW9uKG4scix0KXtudWxsPT1yJiYocj1ufHwwLG49MCksdHx8KHQ9cjxuPy0xOjEpO2Zvcih2YXIgZT1NYXRoLm1heChNYXRoLmNlaWwoKHItbikvdCksMCksdT1BcnJheShlKSxpPTA7aTxlO2krKyxuKz10KXVbaV09bjtyZXR1cm4gdX0saC5jaHVuaz1mdW5jdGlvbihuLHIpe2lmKG51bGw9PXJ8fHI8MSlyZXR1cm5bXTtmb3IodmFyIHQ9W10sZT0wLHU9bi5sZW5ndGg7ZTx1Oyl0LnB1c2goYy5jYWxsKG4sZSxlKz1yKSk7cmV0dXJuIHR9O3ZhciBOPWZ1bmN0aW9uKG4scix0LGUsdSl7aWYoIShlIGluc3RhbmNlb2YgcikpcmV0dXJuIG4uYXBwbHkodCx1KTt2YXIgaT1tKG4ucHJvdG90eXBlKSxvPW4uYXBwbHkoaSx1KTtyZXR1cm4gaC5pc09iamVjdChvKT9vOml9O2guYmluZD1nKGZ1bmN0aW9uKHIsdCxlKXtpZighaC5pc0Z1bmN0aW9uKHIpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJCaW5kIG11c3QgYmUgY2FsbGVkIG9uIGEgZnVuY3Rpb25cIik7dmFyIHU9ZyhmdW5jdGlvbihuKXtyZXR1cm4gTihyLHUsdCx0aGlzLGUuY29uY2F0KG4pKX0pO3JldHVybiB1fSksaC5wYXJ0aWFsPWcoZnVuY3Rpb24odSxpKXt2YXIgbz1oLnBhcnRpYWwucGxhY2Vob2xkZXIsYT1mdW5jdGlvbigpe2Zvcih2YXIgbj0wLHI9aS5sZW5ndGgsdD1BcnJheShyKSxlPTA7ZTxyO2UrKyl0W2VdPWlbZV09PT1vP2FyZ3VtZW50c1tuKytdOmlbZV07Zm9yKDtuPGFyZ3VtZW50cy5sZW5ndGg7KXQucHVzaChhcmd1bWVudHNbbisrXSk7cmV0dXJuIE4odSxhLHRoaXMsdGhpcyx0KX07cmV0dXJuIGF9KSwoaC5wYXJ0aWFsLnBsYWNlaG9sZGVyPWgpLmJpbmRBbGw9ZyhmdW5jdGlvbihuLHIpe3ZhciB0PShyPU0ociwhMSwhMSkpLmxlbmd0aDtpZih0PDEpdGhyb3cgbmV3IEVycm9yKFwiYmluZEFsbCBtdXN0IGJlIHBhc3NlZCBmdW5jdGlvbiBuYW1lc1wiKTtmb3IoO3QtLTspe3ZhciBlPXJbdF07bltlXT1oLmJpbmQobltlXSxuKX19KSxoLm1lbW9pemU9ZnVuY3Rpb24oZSx1KXt2YXIgaT1mdW5jdGlvbihuKXt2YXIgcj1pLmNhY2hlLHQ9XCJcIisodT91LmFwcGx5KHRoaXMsYXJndW1lbnRzKTpuKTtyZXR1cm4gaihyLHQpfHwoclt0XT1lLmFwcGx5KHRoaXMsYXJndW1lbnRzKSksclt0XX07cmV0dXJuIGkuY2FjaGU9e30saX0saC5kZWxheT1nKGZ1bmN0aW9uKG4scix0KXtyZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpe3JldHVybiBuLmFwcGx5KG51bGwsdCl9LHIpfSksaC5kZWZlcj1oLnBhcnRpYWwoaC5kZWxheSxoLDEpLGgudGhyb3R0bGU9ZnVuY3Rpb24odCxlLHUpe3ZhciBpLG8sYSxjLGw9MDt1fHwodT17fSk7dmFyIGY9ZnVuY3Rpb24oKXtsPSExPT09dS5sZWFkaW5nPzA6aC5ub3coKSxpPW51bGwsYz10LmFwcGx5KG8sYSksaXx8KG89YT1udWxsKX0sbj1mdW5jdGlvbigpe3ZhciBuPWgubm93KCk7bHx8ITEhPT11LmxlYWRpbmd8fChsPW4pO3ZhciByPWUtKG4tbCk7cmV0dXJuIG89dGhpcyxhPWFyZ3VtZW50cyxyPD0wfHxlPHI/KGkmJihjbGVhclRpbWVvdXQoaSksaT1udWxsKSxsPW4sYz10LmFwcGx5KG8sYSksaXx8KG89YT1udWxsKSk6aXx8ITE9PT11LnRyYWlsaW5nfHwoaT1zZXRUaW1lb3V0KGYscikpLGN9O3JldHVybiBuLmNhbmNlbD1mdW5jdGlvbigpe2NsZWFyVGltZW91dChpKSxsPTAsaT1vPWE9bnVsbH0sbn0saC5kZWJvdW5jZT1mdW5jdGlvbih0LGUsdSl7dmFyIGksbyxhPWZ1bmN0aW9uKG4scil7aT1udWxsLHImJihvPXQuYXBwbHkobixyKSl9LG49ZyhmdW5jdGlvbihuKXtpZihpJiZjbGVhclRpbWVvdXQoaSksdSl7dmFyIHI9IWk7aT1zZXRUaW1lb3V0KGEsZSksciYmKG89dC5hcHBseSh0aGlzLG4pKX1lbHNlIGk9aC5kZWxheShhLGUsdGhpcyxuKTtyZXR1cm4gb30pO3JldHVybiBuLmNhbmNlbD1mdW5jdGlvbigpe2NsZWFyVGltZW91dChpKSxpPW51bGx9LG59LGgud3JhcD1mdW5jdGlvbihuLHIpe3JldHVybiBoLnBhcnRpYWwocixuKX0saC5uZWdhdGU9ZnVuY3Rpb24obil7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIW4uYXBwbHkodGhpcyxhcmd1bWVudHMpfX0saC5jb21wb3NlPWZ1bmN0aW9uKCl7dmFyIHQ9YXJndW1lbnRzLGU9dC5sZW5ndGgtMTtyZXR1cm4gZnVuY3Rpb24oKXtmb3IodmFyIG49ZSxyPXRbZV0uYXBwbHkodGhpcyxhcmd1bWVudHMpO24tLTspcj10W25dLmNhbGwodGhpcyxyKTtyZXR1cm4gcn19LGguYWZ0ZXI9ZnVuY3Rpb24obixyKXtyZXR1cm4gZnVuY3Rpb24oKXtpZigtLW48MSlyZXR1cm4gci5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fSxoLmJlZm9yZT1mdW5jdGlvbihuLHIpe3ZhciB0O3JldHVybiBmdW5jdGlvbigpe3JldHVybiAwPC0tbiYmKHQ9ci5hcHBseSh0aGlzLGFyZ3VtZW50cykpLG48PTEmJihyPW51bGwpLHR9fSxoLm9uY2U9aC5wYXJ0aWFsKGguYmVmb3JlLDIpLGgucmVzdEFyZ3VtZW50cz1nO3ZhciBJPSF7dG9TdHJpbmc6bnVsbH0ucHJvcGVydHlJc0VudW1lcmFibGUoXCJ0b1N0cmluZ1wiKSxUPVtcInZhbHVlT2ZcIixcImlzUHJvdG90eXBlT2ZcIixcInRvU3RyaW5nXCIsXCJwcm9wZXJ0eUlzRW51bWVyYWJsZVwiLFwiaGFzT3duUHJvcGVydHlcIixcInRvTG9jYWxlU3RyaW5nXCJdLEI9ZnVuY3Rpb24obixyKXt2YXIgdD1ULmxlbmd0aCxlPW4uY29uc3RydWN0b3IsdT1oLmlzRnVuY3Rpb24oZSkmJmUucHJvdG90eXBlfHxvLGk9XCJjb25zdHJ1Y3RvclwiO2ZvcihqKG4saSkmJiFoLmNvbnRhaW5zKHIsaSkmJnIucHVzaChpKTt0LS07KShpPVRbdF0paW4gbiYmbltpXSE9PXVbaV0mJiFoLmNvbnRhaW5zKHIsaSkmJnIucHVzaChpKX07aC5rZXlzPWZ1bmN0aW9uKG4pe2lmKCFoLmlzT2JqZWN0KG4pKXJldHVybltdO2lmKGEpcmV0dXJuIGEobik7dmFyIHI9W107Zm9yKHZhciB0IGluIG4paihuLHQpJiZyLnB1c2godCk7cmV0dXJuIEkmJkIobixyKSxyfSxoLmFsbEtleXM9ZnVuY3Rpb24obil7aWYoIWguaXNPYmplY3QobikpcmV0dXJuW107dmFyIHI9W107Zm9yKHZhciB0IGluIG4pci5wdXNoKHQpO3JldHVybiBJJiZCKG4scikscn0saC52YWx1ZXM9ZnVuY3Rpb24obil7Zm9yKHZhciByPWgua2V5cyhuKSx0PXIubGVuZ3RoLGU9QXJyYXkodCksdT0wO3U8dDt1KyspZVt1XT1uW3JbdV1dO3JldHVybiBlfSxoLm1hcE9iamVjdD1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPWgua2V5cyhuKSx1PWUubGVuZ3RoLGk9e30sbz0wO288dTtvKyspe3ZhciBhPWVbb107aVthXT1yKG5bYV0sYSxuKX1yZXR1cm4gaX0saC5wYWlycz1mdW5jdGlvbihuKXtmb3IodmFyIHI9aC5rZXlzKG4pLHQ9ci5sZW5ndGgsZT1BcnJheSh0KSx1PTA7dTx0O3UrKyllW3VdPVtyW3VdLG5bclt1XV1dO3JldHVybiBlfSxoLmludmVydD1mdW5jdGlvbihuKXtmb3IodmFyIHI9e30sdD1oLmtleXMobiksZT0wLHU9dC5sZW5ndGg7ZTx1O2UrKylyW25bdFtlXV1dPXRbZV07cmV0dXJuIHJ9LGguZnVuY3Rpb25zPWgubWV0aG9kcz1mdW5jdGlvbihuKXt2YXIgcj1bXTtmb3IodmFyIHQgaW4gbiloLmlzRnVuY3Rpb24oblt0XSkmJnIucHVzaCh0KTtyZXR1cm4gci5zb3J0KCl9O3ZhciBSPWZ1bmN0aW9uKGMsbCl7cmV0dXJuIGZ1bmN0aW9uKG4pe3ZhciByPWFyZ3VtZW50cy5sZW5ndGg7aWYobCYmKG49T2JqZWN0KG4pKSxyPDJ8fG51bGw9PW4pcmV0dXJuIG47Zm9yKHZhciB0PTE7dDxyO3QrKylmb3IodmFyIGU9YXJndW1lbnRzW3RdLHU9YyhlKSxpPXUubGVuZ3RoLG89MDtvPGk7bysrKXt2YXIgYT11W29dO2wmJnZvaWQgMCE9PW5bYV18fChuW2FdPWVbYV0pfXJldHVybiBufX07aC5leHRlbmQ9UihoLmFsbEtleXMpLGguZXh0ZW5kT3duPWguYXNzaWduPVIoaC5rZXlzKSxoLmZpbmRLZXk9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZSx1PWgua2V5cyhuKSxpPTAsbz11Lmxlbmd0aDtpPG87aSsrKWlmKHIobltlPXVbaV1dLGUsbikpcmV0dXJuIGV9O3ZhciBxLEssej1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIHIgaW4gdH07aC5waWNrPWcoZnVuY3Rpb24obixyKXt2YXIgdD17fSxlPXJbMF07aWYobnVsbD09bilyZXR1cm4gdDtoLmlzRnVuY3Rpb24oZSk/KDE8ci5sZW5ndGgmJihlPXkoZSxyWzFdKSkscj1oLmFsbEtleXMobikpOihlPXoscj1NKHIsITEsITEpLG49T2JqZWN0KG4pKTtmb3IodmFyIHU9MCxpPXIubGVuZ3RoO3U8aTt1Kyspe3ZhciBvPXJbdV0sYT1uW29dO2UoYSxvLG4pJiYodFtvXT1hKX1yZXR1cm4gdH0pLGgub21pdD1nKGZ1bmN0aW9uKG4sdCl7dmFyIHIsZT10WzBdO3JldHVybiBoLmlzRnVuY3Rpb24oZSk/KGU9aC5uZWdhdGUoZSksMTx0Lmxlbmd0aCYmKHI9dFsxXSkpOih0PWgubWFwKE0odCwhMSwhMSksU3RyaW5nKSxlPWZ1bmN0aW9uKG4scil7cmV0dXJuIWguY29udGFpbnModCxyKX0pLGgucGljayhuLGUscil9KSxoLmRlZmF1bHRzPVIoaC5hbGxLZXlzLCEwKSxoLmNyZWF0ZT1mdW5jdGlvbihuLHIpe3ZhciB0PW0obik7cmV0dXJuIHImJmguZXh0ZW5kT3duKHQsciksdH0saC5jbG9uZT1mdW5jdGlvbihuKXtyZXR1cm4gaC5pc09iamVjdChuKT9oLmlzQXJyYXkobik/bi5zbGljZSgpOmguZXh0ZW5kKHt9LG4pOm59LGgudGFwPWZ1bmN0aW9uKG4scil7cmV0dXJuIHIobiksbn0saC5pc01hdGNoPWZ1bmN0aW9uKG4scil7dmFyIHQ9aC5rZXlzKHIpLGU9dC5sZW5ndGg7aWYobnVsbD09bilyZXR1cm4hZTtmb3IodmFyIHU9T2JqZWN0KG4pLGk9MDtpPGU7aSsrKXt2YXIgbz10W2ldO2lmKHJbb10hPT11W29dfHwhKG8gaW4gdSkpcmV0dXJuITF9cmV0dXJuITB9LHE9ZnVuY3Rpb24obixyLHQsZSl7aWYobj09PXIpcmV0dXJuIDAhPT1ufHwxL249PTEvcjtpZihudWxsPT1ufHxudWxsPT1yKXJldHVybiExO2lmKG4hPW4pcmV0dXJuIHIhPXI7dmFyIHU9dHlwZW9mIG47cmV0dXJuKFwiZnVuY3Rpb25cIj09PXV8fFwib2JqZWN0XCI9PT11fHxcIm9iamVjdFwiPT10eXBlb2YgcikmJksobixyLHQsZSl9LEs9ZnVuY3Rpb24obixyLHQsZSl7biBpbnN0YW5jZW9mIGgmJihuPW4uX3dyYXBwZWQpLHIgaW5zdGFuY2VvZiBoJiYocj1yLl93cmFwcGVkKTt2YXIgdT1wLmNhbGwobik7aWYodSE9PXAuY2FsbChyKSlyZXR1cm4hMTtzd2l0Y2godSl7Y2FzZVwiW29iamVjdCBSZWdFeHBdXCI6Y2FzZVwiW29iamVjdCBTdHJpbmddXCI6cmV0dXJuXCJcIituPT1cIlwiK3I7Y2FzZVwiW29iamVjdCBOdW1iZXJdXCI6cmV0dXJuK24hPStuPytyIT0rcjowPT0rbj8xLytuPT0xL3I6K249PStyO2Nhc2VcIltvYmplY3QgRGF0ZV1cIjpjYXNlXCJbb2JqZWN0IEJvb2xlYW5dXCI6cmV0dXJuK249PStyO2Nhc2VcIltvYmplY3QgU3ltYm9sXVwiOnJldHVybiBzLnZhbHVlT2YuY2FsbChuKT09PXMudmFsdWVPZi5jYWxsKHIpfXZhciBpPVwiW29iamVjdCBBcnJheV1cIj09PXU7aWYoIWkpe2lmKFwib2JqZWN0XCIhPXR5cGVvZiBufHxcIm9iamVjdFwiIT10eXBlb2YgcilyZXR1cm4hMTt2YXIgbz1uLmNvbnN0cnVjdG9yLGE9ci5jb25zdHJ1Y3RvcjtpZihvIT09YSYmIShoLmlzRnVuY3Rpb24obykmJm8gaW5zdGFuY2VvZiBvJiZoLmlzRnVuY3Rpb24oYSkmJmEgaW5zdGFuY2VvZiBhKSYmXCJjb25zdHJ1Y3RvclwiaW4gbiYmXCJjb25zdHJ1Y3RvclwiaW4gcilyZXR1cm4hMX1lPWV8fFtdO2Zvcih2YXIgYz0odD10fHxbXSkubGVuZ3RoO2MtLTspaWYodFtjXT09PW4pcmV0dXJuIGVbY109PT1yO2lmKHQucHVzaChuKSxlLnB1c2gociksaSl7aWYoKGM9bi5sZW5ndGgpIT09ci5sZW5ndGgpcmV0dXJuITE7Zm9yKDtjLS07KWlmKCFxKG5bY10scltjXSx0LGUpKXJldHVybiExfWVsc2V7dmFyIGwsZj1oLmtleXMobik7aWYoYz1mLmxlbmd0aCxoLmtleXMocikubGVuZ3RoIT09YylyZXR1cm4hMTtmb3IoO2MtLTspaWYobD1mW2NdLCFqKHIsbCl8fCFxKG5bbF0scltsXSx0LGUpKXJldHVybiExfXJldHVybiB0LnBvcCgpLGUucG9wKCksITB9LGguaXNFcXVhbD1mdW5jdGlvbihuLHIpe3JldHVybiBxKG4scil9LGguaXNFbXB0eT1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09bnx8KHcobikmJihoLmlzQXJyYXkobil8fGguaXNTdHJpbmcobil8fGguaXNBcmd1bWVudHMobikpPzA9PT1uLmxlbmd0aDowPT09aC5rZXlzKG4pLmxlbmd0aCl9LGguaXNFbGVtZW50PWZ1bmN0aW9uKG4pe3JldHVybiEoIW58fDEhPT1uLm5vZGVUeXBlKX0saC5pc0FycmF5PXR8fGZ1bmN0aW9uKG4pe3JldHVyblwiW29iamVjdCBBcnJheV1cIj09PXAuY2FsbChuKX0saC5pc09iamVjdD1mdW5jdGlvbihuKXt2YXIgcj10eXBlb2YgbjtyZXR1cm5cImZ1bmN0aW9uXCI9PT1yfHxcIm9iamVjdFwiPT09ciYmISFufSxoLmVhY2goW1wiQXJndW1lbnRzXCIsXCJGdW5jdGlvblwiLFwiU3RyaW5nXCIsXCJOdW1iZXJcIixcIkRhdGVcIixcIlJlZ0V4cFwiLFwiRXJyb3JcIixcIlN5bWJvbFwiLFwiTWFwXCIsXCJXZWFrTWFwXCIsXCJTZXRcIixcIldlYWtTZXRcIl0sZnVuY3Rpb24ocil7aFtcImlzXCIrcl09ZnVuY3Rpb24obil7cmV0dXJuIHAuY2FsbChuKT09PVwiW29iamVjdCBcIityK1wiXVwifX0pLGguaXNBcmd1bWVudHMoYXJndW1lbnRzKXx8KGguaXNBcmd1bWVudHM9ZnVuY3Rpb24obil7cmV0dXJuIGoobixcImNhbGxlZVwiKX0pO3ZhciBEPW4uZG9jdW1lbnQmJm4uZG9jdW1lbnQuY2hpbGROb2RlcztcImZ1bmN0aW9uXCIhPXR5cGVvZi8uLyYmXCJvYmplY3RcIiE9dHlwZW9mIEludDhBcnJheSYmXCJmdW5jdGlvblwiIT10eXBlb2YgRCYmKGguaXNGdW5jdGlvbj1mdW5jdGlvbihuKXtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBufHwhMX0pLGguaXNGaW5pdGU9ZnVuY3Rpb24obil7cmV0dXJuIWguaXNTeW1ib2wobikmJmlzRmluaXRlKG4pJiYhaXNOYU4ocGFyc2VGbG9hdChuKSl9LGguaXNOYU49ZnVuY3Rpb24obil7cmV0dXJuIGguaXNOdW1iZXIobikmJmlzTmFOKG4pfSxoLmlzQm9vbGVhbj1mdW5jdGlvbihuKXtyZXR1cm4hMD09PW58fCExPT09bnx8XCJbb2JqZWN0IEJvb2xlYW5dXCI9PT1wLmNhbGwobil9LGguaXNOdWxsPWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT09bn0saC5pc1VuZGVmaW5lZD1mdW5jdGlvbihuKXtyZXR1cm4gdm9pZCAwPT09bn0saC5oYXM9ZnVuY3Rpb24obixyKXtpZighaC5pc0FycmF5KHIpKXJldHVybiBqKG4scik7Zm9yKHZhciB0PXIubGVuZ3RoLGU9MDtlPHQ7ZSsrKXt2YXIgdT1yW2VdO2lmKG51bGw9PW58fCFpLmNhbGwobix1KSlyZXR1cm4hMTtuPW5bdV19cmV0dXJuISF0fSxoLm5vQ29uZmxpY3Q9ZnVuY3Rpb24oKXtyZXR1cm4gbi5fPXIsdGhpc30saC5pZGVudGl0eT1mdW5jdGlvbihuKXtyZXR1cm4gbn0saC5jb25zdGFudD1mdW5jdGlvbihuKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gbn19LGgubm9vcD1mdW5jdGlvbigpe30saC5wcm9wZXJ0eT1mdW5jdGlvbihyKXtyZXR1cm4gaC5pc0FycmF5KHIpP2Z1bmN0aW9uKG4pe3JldHVybiB4KG4scil9OmIocil9LGgucHJvcGVydHlPZj1mdW5jdGlvbihyKXtyZXR1cm4gbnVsbD09cj9mdW5jdGlvbigpe306ZnVuY3Rpb24obil7cmV0dXJuIGguaXNBcnJheShuKT94KHIsbik6cltuXX19LGgubWF0Y2hlcj1oLm1hdGNoZXM9ZnVuY3Rpb24ocil7cmV0dXJuIHI9aC5leHRlbmRPd24oe30sciksZnVuY3Rpb24obil7cmV0dXJuIGguaXNNYXRjaChuLHIpfX0saC50aW1lcz1mdW5jdGlvbihuLHIsdCl7dmFyIGU9QXJyYXkoTWF0aC5tYXgoMCxuKSk7cj15KHIsdCwxKTtmb3IodmFyIHU9MDt1PG47dSsrKWVbdV09cih1KTtyZXR1cm4gZX0saC5yYW5kb209ZnVuY3Rpb24obixyKXtyZXR1cm4gbnVsbD09ciYmKHI9bixuPTApLG4rTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKihyLW4rMSkpfSxoLm5vdz1EYXRlLm5vd3x8ZnVuY3Rpb24oKXtyZXR1cm4obmV3IERhdGUpLmdldFRpbWUoKX07dmFyIEw9e1wiJlwiOlwiJmFtcDtcIixcIjxcIjpcIiZsdDtcIixcIj5cIjpcIiZndDtcIiwnXCInOlwiJnF1b3Q7XCIsXCInXCI6XCImI3gyNztcIixcImBcIjpcIiYjeDYwO1wifSxQPWguaW52ZXJ0KEwpLFc9ZnVuY3Rpb24ocil7dmFyIHQ9ZnVuY3Rpb24obil7cmV0dXJuIHJbbl19LG49XCIoPzpcIitoLmtleXMocikuam9pbihcInxcIikrXCIpXCIsZT1SZWdFeHAobiksdT1SZWdFeHAobixcImdcIik7cmV0dXJuIGZ1bmN0aW9uKG4pe3JldHVybiBuPW51bGw9PW4/XCJcIjpcIlwiK24sZS50ZXN0KG4pP24ucmVwbGFjZSh1LHQpOm59fTtoLmVzY2FwZT1XKEwpLGgudW5lc2NhcGU9VyhQKSxoLnJlc3VsdD1mdW5jdGlvbihuLHIsdCl7aC5pc0FycmF5KHIpfHwocj1bcl0pO3ZhciBlPXIubGVuZ3RoO2lmKCFlKXJldHVybiBoLmlzRnVuY3Rpb24odCk/dC5jYWxsKG4pOnQ7Zm9yKHZhciB1PTA7dTxlO3UrKyl7dmFyIGk9bnVsbD09bj92b2lkIDA6bltyW3VdXTt2b2lkIDA9PT1pJiYoaT10LHU9ZSksbj1oLmlzRnVuY3Rpb24oaSk/aS5jYWxsKG4pOml9cmV0dXJuIG59O3ZhciBDPTA7aC51bmlxdWVJZD1mdW5jdGlvbihuKXt2YXIgcj0rK0MrXCJcIjtyZXR1cm4gbj9uK3I6cn0saC50ZW1wbGF0ZVNldHRpbmdzPXtldmFsdWF0ZTovPCUoW1xcc1xcU10rPyklPi9nLGludGVycG9sYXRlOi88JT0oW1xcc1xcU10rPyklPi9nLGVzY2FwZTovPCUtKFtcXHNcXFNdKz8pJT4vZ307dmFyIEo9LyguKV4vLFU9e1wiJ1wiOlwiJ1wiLFwiXFxcXFwiOlwiXFxcXFwiLFwiXFxyXCI6XCJyXCIsXCJcXG5cIjpcIm5cIixcIlxcdTIwMjhcIjpcInUyMDI4XCIsXCJcXHUyMDI5XCI6XCJ1MjAyOVwifSxWPS9cXFxcfCd8XFxyfFxcbnxcXHUyMDI4fFxcdTIwMjkvZywkPWZ1bmN0aW9uKG4pe3JldHVyblwiXFxcXFwiK1Vbbl19O2gudGVtcGxhdGU9ZnVuY3Rpb24oaSxuLHIpeyFuJiZyJiYobj1yKSxuPWguZGVmYXVsdHMoe30sbixoLnRlbXBsYXRlU2V0dGluZ3MpO3ZhciB0LGU9UmVnRXhwKFsobi5lc2NhcGV8fEopLnNvdXJjZSwobi5pbnRlcnBvbGF0ZXx8Sikuc291cmNlLChuLmV2YWx1YXRlfHxKKS5zb3VyY2VdLmpvaW4oXCJ8XCIpK1wifCRcIixcImdcIiksbz0wLGE9XCJfX3ArPSdcIjtpLnJlcGxhY2UoZSxmdW5jdGlvbihuLHIsdCxlLHUpe3JldHVybiBhKz1pLnNsaWNlKG8sdSkucmVwbGFjZShWLCQpLG89dStuLmxlbmd0aCxyP2ErPVwiJytcXG4oKF9fdD0oXCIrcitcIikpPT1udWxsPycnOl8uZXNjYXBlKF9fdCkpK1xcbidcIjp0P2ErPVwiJytcXG4oKF9fdD0oXCIrdCtcIikpPT1udWxsPycnOl9fdCkrXFxuJ1wiOmUmJihhKz1cIic7XFxuXCIrZStcIlxcbl9fcCs9J1wiKSxufSksYSs9XCInO1xcblwiLG4udmFyaWFibGV8fChhPVwid2l0aChvYmp8fHt9KXtcXG5cIithK1wifVxcblwiKSxhPVwidmFyIF9fdCxfX3A9JycsX19qPUFycmF5LnByb3RvdHlwZS5qb2luLFwiK1wicHJpbnQ9ZnVuY3Rpb24oKXtfX3ArPV9fai5jYWxsKGFyZ3VtZW50cywnJyk7fTtcXG5cIithK1wicmV0dXJuIF9fcDtcXG5cIjt0cnl7dD1uZXcgRnVuY3Rpb24obi52YXJpYWJsZXx8XCJvYmpcIixcIl9cIixhKX1jYXRjaChuKXt0aHJvdyBuLnNvdXJjZT1hLG59dmFyIHU9ZnVuY3Rpb24obil7cmV0dXJuIHQuY2FsbCh0aGlzLG4saCl9LGM9bi52YXJpYWJsZXx8XCJvYmpcIjtyZXR1cm4gdS5zb3VyY2U9XCJmdW5jdGlvbihcIitjK1wiKXtcXG5cIithK1wifVwiLHV9LGguY2hhaW49ZnVuY3Rpb24obil7dmFyIHI9aChuKTtyZXR1cm4gci5fY2hhaW49ITAscn07dmFyIEc9ZnVuY3Rpb24obixyKXtyZXR1cm4gbi5fY2hhaW4/aChyKS5jaGFpbigpOnJ9O2gubWl4aW49ZnVuY3Rpb24odCl7cmV0dXJuIGguZWFjaChoLmZ1bmN0aW9ucyh0KSxmdW5jdGlvbihuKXt2YXIgcj1oW25dPXRbbl07aC5wcm90b3R5cGVbbl09ZnVuY3Rpb24oKXt2YXIgbj1bdGhpcy5fd3JhcHBlZF07cmV0dXJuIHUuYXBwbHkobixhcmd1bWVudHMpLEcodGhpcyxyLmFwcGx5KGgsbikpfX0pLGh9LGgubWl4aW4oaCksaC5lYWNoKFtcInBvcFwiLFwicHVzaFwiLFwicmV2ZXJzZVwiLFwic2hpZnRcIixcInNvcnRcIixcInNwbGljZVwiLFwidW5zaGlmdFwiXSxmdW5jdGlvbihyKXt2YXIgdD1lW3JdO2gucHJvdG90eXBlW3JdPWZ1bmN0aW9uKCl7dmFyIG49dGhpcy5fd3JhcHBlZDtyZXR1cm4gdC5hcHBseShuLGFyZ3VtZW50cyksXCJzaGlmdFwiIT09ciYmXCJzcGxpY2VcIiE9PXJ8fDAhPT1uLmxlbmd0aHx8ZGVsZXRlIG5bMF0sRyh0aGlzLG4pfX0pLGguZWFjaChbXCJjb25jYXRcIixcImpvaW5cIixcInNsaWNlXCJdLGZ1bmN0aW9uKG4pe3ZhciByPWVbbl07aC5wcm90b3R5cGVbbl09ZnVuY3Rpb24oKXtyZXR1cm4gRyh0aGlzLHIuYXBwbHkodGhpcy5fd3JhcHBlZCxhcmd1bWVudHMpKX19KSxoLnByb3RvdHlwZS52YWx1ZT1mdW5jdGlvbigpe3JldHVybiB0aGlzLl93cmFwcGVkfSxoLnByb3RvdHlwZS52YWx1ZU9mPWgucHJvdG90eXBlLnRvSlNPTj1oLnByb3RvdHlwZS52YWx1ZSxoLnByb3RvdHlwZS50b1N0cmluZz1mdW5jdGlvbigpe3JldHVybiBTdHJpbmcodGhpcy5fd3JhcHBlZCl9LFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZCYmZGVmaW5lKFwidW5kZXJzY29yZVwiLFtdLGZ1bmN0aW9uKCl7cmV0dXJuIGh9KX0oKTtcclxuIiwiaW1wb3J0IHtleHRyYWN0RXh0ZW5zaW9ufSBmcm9tIFwidXRpbHMvc3RyaW5nc1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGlzUnRtcCA9IGZ1bmN0aW9uIChmaWxlLCB0eXBlKSB7XHJcbiAgICBpZihmaWxlKXtcclxuICAgICAgICByZXR1cm4gKGZpbGUuaW5kZXhPZigncnRtcDonKSA9PSAwIHx8IHR5cGUgPT0gJ3J0bXAnKTtcclxuICAgIH1cclxufTtcclxuZXhwb3J0IGNvbnN0IGlzV2ViUlRDID0gZnVuY3Rpb24gKGZpbGUsIHR5cGUpIHtcclxuICAgIGlmKGZpbGUpe1xyXG4gICAgICAgIHJldHVybiAoZmlsZS5pbmRleE9mKCd3czonKSA9PT0gMCB8fCBmaWxlLmluZGV4T2YoJ3dzczonKSA9PT0gMCB8fCB0eXBlID09PSAnd2VicnRjJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBpc0hscyA9IGZ1bmN0aW9uIChmaWxlLCB0eXBlKSB7XHJcbiAgICBpZihmaWxlKXtcclxuICAgICAgICByZXR1cm4gKCB0eXBlID09PSAnaGxzJyB8fCAgdHlwZSA9PT0gJ20zdTgnIHx8IHR5cGUgPT09ICdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcgfHwgZXh0cmFjdEV4dGVuc2lvbihmaWxlKSA9PSAnbTN1OCcpO1xyXG5cclxuICAgIH1cclxufTtcclxuZXhwb3J0IGNvbnN0IGlzRGFzaCA9IGZ1bmN0aW9uIChmaWxlLCB0eXBlKSB7XHJcbiAgICBpZihmaWxlKXtcclxuICAgICAgICByZXR1cm4gKCB0eXBlID09PSAnbXBkJyB8fCAgdHlwZSA9PT0gJ2Rhc2gnIHx8IHR5cGUgPT09ICdhcHBsaWNhdGlvbi9kYXNoK3htbCcgfHwgZXh0cmFjdEV4dGVuc2lvbihmaWxlKSA9PSAnbXBkJyk7XHJcblxyXG4gICAgfVxyXG59O1xyXG4iLCIvKipcclxuICogdXRpbHMgZm9yIHdlYnBhY2tcclxuICovXHJcblxyXG5leHBvcnQgY29uc3QgZ2V0U2NyaXB0UGF0aCA9IGZ1bmN0aW9uKHNjcmlwdE5hbWUpIHtcclxuICAgIGNvbnN0IHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0Jyk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNjcmlwdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCBzcmMgPSBzY3JpcHRzW2ldLnNyYztcclxuICAgICAgICBpZiAoc3JjKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gc3JjLmxhc3RJbmRleE9mKCcvJyArIHNjcmlwdE5hbWUpO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNyYy5zdWJzdHIoMCwgaW5kZXggKyAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiAnJztcclxufTtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiAyOS4uXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgdmVyc2lvbiA9IF9fVkVSU0lPTl9fO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9