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
var version = exports.version = '0.9.0-2021061816-localbuild';

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvQXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvQXBpRXhwYW5zaW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0NvbmZpZ3VyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0V2ZW50RW1pdHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0xhenlDb21tYW5kRXhlY3V0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9TdXBwb3J0Q2hlY2tlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2NhcHRpb24vTG9hZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvY2FwdGlvbi9NYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvY2FwdGlvbi9wYXJzZXIvU3J0UGFyc2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvY29uc3RhbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvbWVkaWEvTWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3BsYXlsaXN0L01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9Db250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL292ZW5wbGF5ZXIuc2RrLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9jYXB0aW9ucy92dHRDdWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL2xpa2VBJC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvc3RyaW5ncy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvdW5kZXJzY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvdmFsaWRhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy93ZWJwYWNrLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92ZXJzaW9uLmpzIl0sIm5hbWVzIjpbIkFwaSIsImNvbnRhaW5lciIsInRoYXQiLCJjb25zb2xlIiwibG9nIiwidmVyc2lvbiIsIk92ZW5QbGF5ZXJDb25zb2xlIiwicGxheWxpc3RNYW5hZ2VyIiwicHJvdmlkZXJDb250cm9sbGVyIiwidXNlckFnZW50T2JqZWN0IiwibWVkaWFNYW5hZ2VyIiwiY3VycmVudFByb3ZpZGVyIiwicGxheWVyQ29uZmlnIiwibGF6eVF1ZXVlIiwiY2FwdGlvbk1hbmFnZXIiLCJ3ZWJydGNSZXRyeSIsIldFQlJUQ19SRVRSWV9DT1VOVCIsIndlYnJ0Y1JldHJ5Q291bnQiLCJ3ZWJydGNSZXRyeUludGVydmFsIiwid2VicnRjUmV0cnlUaW1lciIsInJ1bk5leHRQbGF5bGlzdCIsImluZGV4IiwibmV4dFBsYXlsaXN0SW5kZXgiLCJwbGF5bGlzdCIsImdldFBsYXlsaXN0IiwiaGFzTmV4dFBsYXlsaXN0Iiwic2V0U291cmNlSW5kZXgiLCJzZXRWb2x1bWUiLCJnZXRWb2x1bWUiLCJzZXRDdXJyZW50UGxheWxpc3QiLCJpbml0UHJvdmlkZXIiLCJpc0F1dG9TdGFydCIsInBsYXkiLCJ0cmlnZ2VyIiwiQUxMX1BMQVlMSVNUX0VOREVEIiwibGFzdFBsYXlQb3NpdGlvbiIsInBpY2tRdWFsaXR5RnJvbVNvdXJjZSIsInNvdXJjZXMiLCJxdWFsaXR5IiwiaSIsImxlbmd0aCIsImdldFNvdXJjZUluZGV4IiwibG9hZFByb3ZpZGVycyIsImdldEN1cnJlbnRQbGF5TGlzdCIsInRoZW4iLCJQcm92aWRlcnMiLCJFUlJPUlMiLCJjb2RlcyIsIklOSVRfVU5TVVBQT1JUX0VSUk9SIiwiZGVzdHJveSIsImdldEN1cnJlbnRQbGF5bGlzdEluZGV4IiwiY3VycmVudFNvdXJjZUluZGV4IiwiZ2V0Q3VycmVudFNvdXJjZXMiLCJwcm92aWRlck5hbWUiLCJwcm92aWRlciIsImNyZWF0ZU1lZGlhIiwiZ2V0Q3VycmVudEFkVGFnIiwiUFJPVklERVJfUlRNUCIsIm9uIiwibmFtZSIsImRhdGEiLCJFUlJPUiIsIm9zIiwiYnJvd3NlciIsImNvZGUiLCJQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SIiwic2V0VGltZW91dCIsInNldEN1cnJlbnRTb3VyY2UiLCJnZXRDdXJyZW50U291cmNlIiwiZ2V0Q29uZmlnIiwiYXV0b0ZhbGxiYWNrIiwiZ2V0U291cmNlcyIsInBhdXNlIiwicHJlbG9hZCIsIlJFQURZIiwiZmx1c2giLCJlcnJvciIsIm9mZiIsInRlbXBFcnJvciIsIklOSVRfVU5LTldPTl9FUlJPUiIsImluaXQiLCJvcHRpb25zIiwibWVkaWFDb250YWluZXIiLCJ3ZWJydGNDb25maWciLCJsb2FkaW5nUmV0cnlDb3VudCIsInVuZGVmaW5lZCIsImdldFN5c3RlbVRleHQiLCJhcGkiLCJpbml0UGxheWxpc3QiLCJnZXRQcm92aWRlck5hbWUiLCJnZXROYW1lIiwiZ2V0TXNlSW5zdGFuY2UiLCJnZXRNc2UiLCJnZXRCcm93c2VyIiwic2V0VGltZWNvZGVNb2RlIiwiaXNTaG93IiwiaXNUaW1lY29kZU1vZGUiLCJnZXRGcmFtZXJhdGUiLCJzZWVrRnJhbWUiLCJmcmFtZUNvdW50IiwiZ2V0RHVyYXRpb24iLCJnZXRQb3NpdGlvbiIsInZvbHVtZSIsInNldE11dGUiLCJzdGF0ZSIsImdldE11dGUiLCJsb2FkIiwic2V0Q3VycmVudFF1YWxpdHkiLCJzZXRQbGF5bGlzdCIsInNlZWsiLCJwb3NpdGlvbiIsInNldFBsYXliYWNrUmF0ZSIsInBsYXliYWNrUmF0ZSIsImdldFBsYXliYWNrUmF0ZSIsImdldEN1cnJlbnRQbGF5bGlzdCIsImdldFF1YWxpdHlMZXZlbHMiLCJnZXRDdXJyZW50UXVhbGl0eSIsInF1YWxpdHlJbmRleCIsImlzQXV0b1F1YWxpdHkiLCJzZXRBdXRvUXVhbGl0eSIsImlzQXV0byIsImdldENhcHRpb25MaXN0IiwiZ2V0Q3VycmVudENhcHRpb24iLCJzZXRDdXJyZW50Q2FwdGlvbiIsImFkZENhcHRpb24iLCJ0cmFjayIsInJlbW92ZUNhcHRpb24iLCJnZXRCdWZmZXIiLCJnZXRTdGF0ZSIsInN0b3AiLCJyZW1vdmUiLCJERVNUUk9ZIiwiT3ZlblBsYXllclNESyIsInJlbW92ZVBsYXllciIsImdldENvbnRhaW5lcklkIiwiZ2V0UGxheWVyTGlzdCIsImdldFZlcnNpb24iLCJBcGlSdG1wRXhwYW5zaW9uIiwiZXh0ZXJuYWxDYWxsYmFja0NyZWVwIiwicmVzdWx0IiwidHJpZ2dlckV2ZW50RnJvbUV4dGVybmFsIiwiQ29uZmlndXJhdG9yIiwiY29tcG9zZVNvdXJjZU9wdGlvbnMiLCJEZWZhdWx0cyIsInBsYXliYWNrUmF0ZXMiLCJtdXRlIiwibG9vcCIsImNvbnRyb2xzIiwiYXV0b1N0YXJ0IiwidGltZWNvZGUiLCJzb3VyY2VJbmRleCIsImhpZGVQbGF5bGlzdEljb24iLCJydG1wQnVmZmVyVGltZSIsInJ0bXBCdWZmZXJUaW1lTWF4IiwiYWRDbGllbnQiLCJjdXJyZW50UHJvdG9jb2xPbmx5Iiwic3lzdGVtVGV4dCIsImxhbmciLCJleHBhbmRGdWxsU2NyZWVuVUkiLCJmdWxsc2NyZWVuT3B0aW9uIiwic2hvd0JpZ1BsYXlCdXR0b24iLCJzZXJpYWxpemUiLCJ2YWwiLCJsb3dlcmNhc2VWYWwiLCJ0b0xvd2VyQ2FzZSIsImlzTmFOIiwiTnVtYmVyIiwicGFyc2VGbG9hdCIsImRlc2VyaWFsaXplIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJjb25maWciLCJ1c2VyQ3VzdHVtU3lzdGVtVGV4dCIsIl8iLCJpc0FycmF5IiwiY3VycmVudFN5c3RlbVRleHQiLCJmaW5kV2hlcmUiLCJTWVNURU1fVEVYVCIsInB1c2giLCJmaWx0ZXIiLCJpc051bWJlciIsInJhdGUiLCJtYXAiLCJNYXRoIiwicm91bmQiLCJpbmRleE9mIiwic29ydCIsImNvbmZpZ1BsYXlsaXN0Iiwib2JqIiwicGljayIsImZlZWREYXRhIiwiZHVyYXRpb24iLCJzcGVjIiwiZ2V0QWRDbGllbnQiLCJzZXRDb25maWciLCJ2YWx1ZSIsImdldENvbnRhaW5lciIsImdldFF1YWxpdHlMYWJlbCIsInF1YWxpdHlMYWJlbCIsInNldFF1YWxpdHlMYWJlbCIsIm5ld0xhYmVsIiwiaXNDdXJyZW50UHJvdG9jb2xPbmx5IiwiQ09OVEVOVF9USU1FX01PREVfQ0hBTkdFRCIsImdldFJ0bXBCdWZmZXJUaW1lIiwiZ2V0UnRtcEJ1ZmZlclRpbWVNYXgiLCJpc011dGUiLCJpc0xvb3AiLCJpc0NvbnRyb2xzIiwiZ2V0UGxheWJhY2tSYXRlcyIsImdldExhbmd1YWdlIiwiRXZlbnRFbWl0dGVyIiwib2JqZWN0IiwiX2V2ZW50cyIsInRyaWdnZXJFdmVudHMiLCJldmVudHMiLCJhcmdzIiwiY29udGV4dCIsImV2ZW50IiwibGlzdGVuZXIiLCJhcHBseSIsInNsaWNlIiwiY2FsbCIsImFyZ3VtZW50cyIsImFsbEV2ZW50cyIsImFsbCIsIm5hbWVzIiwibCIsInJldGFpbiIsImoiLCJrIiwiX2xpc3RlbmVyIiwib25jZSIsImNvdW50Iiwib25jZUNhbGxiYWNrIiwiTGF6eUNvbW1hbmRFeGVjdXRvciIsImluc3RhbmNlIiwicXVldWVkQ29tbWFuZHMiLCJjb21tYW5kUXVldWUiLCJ1bmRlY29yYXRlZE1ldGhvZHMiLCJleGVjdXRlTW9kZSIsImNvbW1hbmQiLCJtZXRob2QiLCJBcnJheSIsInByb3RvdHlwZSIsImFkZFF1ZXVlIiwiZXhlY3V0ZVF1ZXVlZENvbW1hbmRzIiwic2hpZnQiLCJzZXRFeGVjdXRlTW9kZSIsIm1vZGUiLCJnZXRVbmRlY29yYXRlZE1ldGhvZHMiLCJnZXRRdWV1ZSIsImVtcHR5IiwicmVtb3ZlQW5kRXhjdXRlT25jZSIsImNvbW1hbmRfIiwiY29tbWFuZFF1ZXVlSXRlbSIsInNwbGljZSIsImZpbmRJbmRleCIsIlN1cHBvcnRDaGVja2VyIiwic3VwcG9ydExpc3QiLCJjaGVja1N1cHBvcnQiLCJzb3VyY2UiLCJNaW1lVHlwZXMiLCJhYWMiLCJtcDQiLCJmNHYiLCJtNHYiLCJtb3YiLCJtcDMiLCJtcGVnIiwib2d2Iiwib2dnIiwib2dhIiwidm9yYmlzIiwid2VibSIsImY0YSIsIm0zdTgiLCJtM3UiLCJobHMiLCJ2aWRlbyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNhblBsYXlUeXBlIiwiZmlsZSIsInR5cGUiLCJtaW1lVHlwZSIsIndpbmRvdyIsIk1lZGlhU291cmNlIiwiV2ViS2l0TWVkaWFTb3VyY2UiLCJpc0hsc1N1cHBvcnQiLCJnZXRNZWRpYVNvdXJjZSIsIm1lZGlhU291cmNlIiwic291cmNlQnVmZmVyIiwiU291cmNlQnVmZmVyIiwiV2ViS2l0U291cmNlQnVmZmVyIiwiaXNUeXBlU3VwcG9ydGVkIiwic291cmNlQnVmZmVyVmFsaWRBUEkiLCJhcHBlbmRCdWZmZXIiLCJ0ZXN0Rmxhc2giLCJzdXBwb3J0IiwiQWN0aXZlWE9iamVjdCIsImUiLCJuYXZpZ2F0b3IiLCJtaW1lVHlwZXMiLCJmaW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UiLCJzb3J1Y2VfIiwiZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0IiwicGxheWxpc3RJdGVtIiwic3VwcG9ydE5hbWVzIiwiaXRlbSIsInN1cHBvcnRlZCIsIkxvYWRlciIsImNvbnZlcnRUb1ZUVEN1ZXMiLCJjdWVzIiwiVlRUQ3VlIiwiY3VlIiwic3RhcnQiLCJlbmQiLCJ0ZXh0IiwibGFuZ3VhZ2UiLCJzdWNjZXNzQ2FsbGJhY2siLCJlcnJvckNhbGxiYWNrIiwicmVxdWVzdE9wdGlvbnMiLCJ1cmwiLCJlbmNvZGluZyIsImxvYWRSZXF1ZXN0RG93bmxvZGVyIiwiUmVxdWVzdCIsInJlc3BvbnNlIiwiYm9keSIsInZ0dEN1ZXMiLCJsb2FkVnR0UGFyc2VyIiwicGFyc2VyIiwiV2ViVlRUIiwiUGFyc2VyIiwiU3RyaW5nRGVjb2RlciIsIm9uY3VlIiwib25mbHVzaCIsInBhcnNlIiwibG9hZFNtaVBhcnNlciIsInBhcnNlZERhdGEiLCJTbWlQYXJzZXIiLCJmaXhlZExhbmciLCJyZXF1aXJlIiwiZXJyIiwiaXNTdXBwb3J0Iiwia2luZCIsIk1hbmFnZXIiLCJwbGF5bGlzdEluZGV4IiwiY2FwdGlvbkxpc3QiLCJjdXJyZW50Q2FwdGlvbkluZGV4IiwiY2FwdGlvbkxvYWRlciIsImlzRmlzcnRMb2FkIiwiaXNTaG93aW5nIiwiYmluZFRyYWNrIiwibGFiZWwiLCJpZCIsInRyYWNrc0NvdW50IiwidHJhY2tJZCIsInByZWZpeCIsImRlZmF1bHR0cmFjayIsImNoYW5nZUN1cnJlbnRDYXB0aW9uIiwiQ09OVEVOVF9DQVBUSU9OX0NIQU5HRUQiLCJ0cmFja3MiLCJjYXB0aW9uSWQiLCJQTEFZRVJfQ0FQVElPTl9FUlJPUiIsIkNPTlRFTlRfVElNRSIsIm1ldGEiLCJjdXJyZW50Q3VlcyIsInN0YXJ0VGltZSIsImVuZFRpbWUiLCJDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQiLCJmbHVzaENhcHRpb25MaXN0IiwibGFzdENhcHRpb25JbmRleCIsIl9pbmRleCIsImVycm9ycyIsIl9lbnRyeSIsImVudHJ5IiwiYXJyYXkiLCJzcGxpdCIsImlkeCIsImxpbmUiLCJzdWJzdHIiLCJqb2luIiwiU3J0UGFyc2VyIiwiY2FwdGlvbnMiLCJsaXN0IiwiU1RBVEVfQlVGRkVSSU5HIiwiU1RBVEVfSURMRSIsIlNUQVRFX0NPTVBMRVRFIiwiU1RBVEVfUEFVU0VEIiwiU1RBVEVfUExBWUlORyIsIlNUQVRFX0VSUk9SIiwiU1RBVEVfTE9BRElORyIsIlNUQVRFX1NUQUxMRUQiLCJTVEFURV9BRF9MT0FESU5HIiwiU1RBVEVfQURfTE9BREVEIiwiU1RBVEVfQURfUExBWUlORyIsIlNUQVRFX0FEX1BBVVNFRCIsIlNUQVRFX0FEX0NPTVBMRVRFIiwiU1RBVEVfQURfRVJST1IiLCJQTEFZRVJfQURfQ0xJQ0siLCJQUk9WSURFUl9IVE1MNSIsIlBST1ZJREVSX1dFQlJUQyIsIlBST1ZJREVSX0RBU0giLCJQUk9WSURFUl9ITFMiLCJDT05URU5UX0NPTVBMRVRFIiwiQ09OVEVOVF9TRUVLIiwiQ09OVEVOVF9CVUZGRVJfRlVMTCIsIkRJU1BMQVlfQ0xJQ0siLCJDT05URU5UX0xPQURFRCIsIlBMQVlMSVNUX0NIQU5HRUQiLCJDT05URU5UX1NFRUtFRCIsIk5FVFdPUktfVU5TVEFCTEVEIiwiREFTSF9QUkVQQVJFRCIsIkRBU0hfREVTVFJPWUVEIiwiUExBWUVSX1NUQVRFIiwiUExBWUVSX0NPTVBMRVRFIiwiUExBWUVSX1BBVVNFIiwiUExBWUVSX1BMQVkiLCJQTEFZRVJfQ0xJQ0tFRCIsIlBMQVlFUl9SRVNJWkVEIiwiUExBWUVSX0xPQURJTkciLCJQTEFZRVJfRlVMTFNDUkVFTl9SRVFVRVNUIiwiUExBWUVSX0ZVTExTQ1JFRU5fQ0hBTkdFRCIsIlBMQVlFUl9XQVJOSU5HIiwiQURfQ0hBTkdFRCIsIkFEX1RJTUUiLCJDT05URU5UX0JVRkZFUiIsIkNPTlRFTlRfUkFURV9DSEFOR0UiLCJDT05URU5UX1ZPTFVNRSIsIkNPTlRFTlRfTVVURSIsIkNPTlRFTlRfTUVUQSIsIkNPTlRFTlRfU09VUkNFX0NIQU5HRUQiLCJDT05URU5UX0xFVkVMX0NIQU5HRUQiLCJDT05URU5UX0RVUkFUSU9OX0NIQU5HRUQiLCJQTEFZQkFDS19SQVRFX0NIQU5HRUQiLCJPTUVfUDJQX01PREUiLCJBRF9DTElFTlRfR09PR0xFSU1BIiwiQURfQ0xJRU5UX1ZBU1QiLCJJTklUX1JUTVBfU0VUVVBfRVJST1IiLCJJTklUX0RBU0hfVU5TVVBQT1JUIiwiSU5JVF9BRFNfRVJST1IiLCJJTklUX0RBU0hfTk9URk9VTkQiLCJJTklUX0hMU0pTX05PVEZPVU5EIiwiUExBWUVSX1VOS05XT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ORVRXT1JLX0VSUk9SIiwiUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SIiwiUExBWUVSX0ZJTEVfRVJST1IiLCJQTEFZRVJfQkFEX1JFUVVFU1RfRVJST1IiLCJQTEFZRVJfQVVUSF9GQUlMRURfRVJST1IiLCJQTEFZRVJfTk9UX0FDQ0VQVEFCTEVfRVJST1IiLCJQTEFZRVJfV0VCUlRDX1dTX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19TRVRfUkVNT1RFX0RFU0NfRVJST1IiLCJQTEFZRVJfV0VCUlRDX0NSRUFURV9BTlNXRVJfRVJST1IiLCJQTEFZRVJfV0VCUlRDX05FVFdPUktfU0xPVyIsIlBMQVlFUl9XRUJSVENfVU5FWFBFQ1RFRF9ESVNDT05ORUNUIiwiV0FSTl9NU0dfTVVURURQTEFZIiwiVUlfSUNPTlMiLCJ2b2x1bWVfbXV0ZSIsIm9wX3dhcm5pbmciLCJicm93c2VySW5mbyIsIlNXRlBhdGgiLCJyb290SWQiLCJnZXRBdHRyaWJ1dGUiLCIkY29udGFpbmVyIiwidmlkZW9FbGVtZW50IiwiY3JlYXRlSHRtbFZpZGVvIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kIiwiY3JlYXRlRmxhc2hWaWRlbyIsImJ1ZmZlclRpbWUiLCJidWZmZXJUaW1lTWF4IiwibW92aWUiLCJmbGFzaHZhcnMiLCJhbGxvd3NjcmlwdGFjY2VzcyIsImFsbG93ZnVsbHNjcmVlbiIsIm1lbnUiLCJxdWFsIiwiYmdjb2xvciIsIndtb2RlIiwiYnJvd3Nlck1ham9yVmVyc2lvbiIsImFwcGVuZENoaWxkIiwiY3JlYXRlQWRDb250YWluZXIiLCJhZENvbnRhaW5lciIsInJlbW92ZUNoaWxkIiwiY3VycmVudFBsYXlsaXN0SXRlbSIsImN1cnJlbnRJbmRleCIsInN1cHBvcnRDaGVja2VyIiwibWFrZVByZXR0eVNvdXJjZSIsInNvdXJjZV8iLCJob3N0IiwiYXBwbGljYXRpb24iLCJzdHJlYW0iLCJtaW1ldHlwZVJlZ0V4IiwidGVzdCIsInJlcGxhY2UiLCJsb3dMYXRlbmN5IiwicHJldHRpZWRQbGF5bGlzdCIsInRpdGxlIiwibGV2ZWxzIiwicHJldHR5U291cmNlIiwiZGVmYXVsdFNvdXJjZSIsInRvU3RyaW5nIiwiZXh0cmFjdE9ubHlPbmVQcm90b2NvbCIsImhpZ2hQcmlvcml0eVR5cGUiLCJjb25jYXQiLCJhZFRhZ1VybCIsIkNvbnRyb2xsZXIiLCJzdXBwb3J0Q2hhY2tlciIsInJlZ2lzdGVQcm92aWRlciIsIlByb3ZpZGVyTG9hZGVyIiwiaHRtbDUiLCJFcnJvciIsIndlYnJ0YyIsImRhc2giLCJydG1wIiwic3VwcG9ydGVkUHJvdmlkZXJOYW1lcyIsIlByb21pc2UiLCJyZWplY3QiLCJmaW5kQnlOYW1lIiwiZ2V0UHJvdmlkZXJCeVNvdXJjZSIsInN1cHBvcnRlZFByb3ZpZGVyTmFtZSIsImlzU2FtZVByb3ZpZGVyIiwiY3VycmVudFNvdXJjZSIsIm5ld1NvdXJjZSIsImV4dHJhY3RWaWRlb0VsZW1lbnQiLCJlbGVtZW50T3JNc2UiLCJpc0VsZW1lbnQiLCJnZXRWaWRlb0VsZW1lbnQiLCJtZWRpYSIsInNlcGFyYXRlTGl2ZSIsIm1zZSIsImlzRHluYW1pYyIsImVycm9yVHJpZ2dlciIsInNldFN0YXRlIiwicGlja0N1cnJlbnRTb3VyY2UiLCJfX3dlYnBhY2tfcHVibGljX3BhdGhfXyIsInBsYXllckxpc3QiLCJjaGVja0FuZEdldENvbnRhaW5lckVsZW1lbnQiLCJjb250YWluZXJFbGVtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJub2RlVHlwZSIsImNyZWF0ZSIsInBsYXllckluc3RhbmNlIiwiZ2V0UGxheWVyQnlDb250YWluZXJJZCIsImNvbnRhaW5lcklkIiwiZ2V0UGxheWVyQnlJbmRleCIsInBsYXllcklkIiwiZ2VuZXJhdGVXZWJydGNVcmxzIiwiZGVidWciLCJpc0RlYnVnTW9kZSIsImdldEJyb3dzZXJMYW5ndWFnZSIsIm5hdiIsImJyb3dzZXJMYW5ndWFnZVByb3BlcnR5S2V5cyIsImxhbmd1YWdlcyIsImFuYWxVc2VyQWdlbnQiLCJ1bmtub3duIiwic2NyZWVuU2l6ZSIsInNjcmVlbiIsIndpZHRoIiwiaGVpZ2h0IiwiblZlciIsImFwcFZlcnNpb24iLCJuQWd0IiwidXNlckFnZW50IiwiYXBwTmFtZSIsIm1ham9yVmVyc2lvbiIsInBhcnNlSW50IiwiaXNXZWJ2aWV3IiwibmFtZU9mZnNldCIsInZlck9mZnNldCIsIml4Iiwic3Vic3RyaW5nIiwibGFzdEluZGV4T2YiLCJ0b1VwcGVyQ2FzZSIsIm1vYmlsZSIsImNvb2tpZUVuYWJsZWQiLCJjb29raWUiLCJjbGllbnRTdHJpbmdzIiwicyIsInIiLCJjcyIsIm9zVmVyc2lvbiIsImV4ZWMiLCJicm93c2VyVmVyc2lvbiIsInVhIiwiY29va2llcyIsImF1dG9LZXl3b3JkIiwiZGlyZWN0aW9uU2V0dGluZyIsImFsaWduU2V0dGluZyIsImZpbmREaXJlY3Rpb25TZXR0aW5nIiwiZGlyIiwiZmluZEFsaWduU2V0dGluZyIsImFsaWduIiwiZXh0ZW5kIiwiY29iaiIsInAiLCJpc0lFOCIsImJhc2VPYmoiLCJlbnVtZXJhYmxlIiwiaGFzQmVlblJlc2V0IiwiX2lkIiwiX3BhdXNlT25FeGl0IiwiX3N0YXJ0VGltZSIsIl9lbmRUaW1lIiwiX3RleHQiLCJfcmVnaW9uIiwiX3ZlcnRpY2FsIiwiX3NuYXBUb0xpbmVzIiwiX2xpbmUiLCJfbGluZUFsaWduIiwiX3Bvc2l0aW9uIiwiX3Bvc2l0aW9uQWxpZ24iLCJfc2l6ZSIsIl9hbGlnbiIsImRlZmluZVByb3BlcnR5IiwiZ2V0Iiwic2V0IiwiVHlwZUVycm9yIiwic2V0dGluZyIsIlN5bnRheEVycm9yIiwiZGlzcGxheVN0YXRlIiwiZ2V0Q3VlQXNIVE1MIiwiY29udmVydEN1ZVRvRE9NVHJlZSIsIkxhJCIsInNlbGVjdG9yT3JFbGVtZW50IiwicmV0dXJuTm9kZSIsIiRlbGVtZW50Iiwic2VsZWN0b3IiLCJub2RlTGlzdCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJldmVyeSIsInNob3ciLCJzdHlsZSIsImRpc3BsYXkiLCJoaWRlIiwiYWRkQ2xhc3MiLCJjbGFzc0xpc3QiLCJhZGQiLCJjbGFzc05hbWVzIiwiY2xhc3NOYW1lIiwiYWZ0ZXIiLCJodG1sU3RyaW5nIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiYmVmb3JlIiwiY2hpbGRyZW4iLCJjb250YWlucyIsImVsQ2hpbGQiLCJpbm5lckhUTUwiLCJmaW5kIiwiY3NzIiwiZWxlbWVudCIsInJlbW92ZUNsYXNzIiwiUmVnRXhwIiwicmVtb3ZlQXR0cmlidXRlIiwiYXR0ck5hbWUiLCJ0ZXh0Q29udGVudCIsImh0bWwiLCJoYXNDbGFzcyIsImlzIiwiJHRhcmdldEVsZW1lbnQiLCJvZmZzZXQiLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwidG9wIiwic2Nyb2xsVG9wIiwibGVmdCIsInNjcm9sbExlZnQiLCJjbGllbnRXaWR0aCIsImNsaWVudEhlaWdodCIsImF0dHIiLCJyZXBsYWNlV2l0aCIsInBhcmVudEVsZW1lbnQiLCJoYXNDaGlsZE5vZGVzIiwiZmlyc3RDaGlsZCIsImNsb3Nlc3QiLCJzZWxlY3RvclN0cmluZyIsImVsIiwibWF0Y2hlcyIsInBhcmVudE5vZGUiLCJjbG9zZXN0RWxlbWVudCIsInRyaW0iLCJuYXR1cmFsSG1zIiwiaG1zVG9TZWNvbmQiLCJzdHJpbmciLCJleHRyYWN0RXh0ZW5zaW9uIiwicGF0aCIsImdldEF6dXJlRmlsZUZvcm1hdCIsImV4dGVuc2lvbiIsImF6dXJlZEZvcm1hdCIsInNlY29uZCIsInNlY051bSIsImhvdXJzIiwiZmxvb3IiLCJtaW51dGVzIiwic2Vjb25kcyIsInN0ciIsImZyYW1lUmF0ZSIsImFyciIsImFyckxlbmd0aCIsInNlYyIsInNlY0luZGV4IiwibiIsInNlbGYiLCJnbG9iYWwiLCJvIiwiU3ltYm9sIiwidSIsImMiLCJoYXNPd25Qcm9wZXJ0eSIsInQiLCJhIiwiZiIsImgiLCJfd3JhcHBlZCIsImV4cG9ydHMiLCJtb2R1bGUiLCJWRVJTSU9OIiwidiIsInkiLCJkIiwiaXRlcmF0ZWUiLCJpZGVudGl0eSIsImlzRnVuY3Rpb24iLCJpc09iamVjdCIsIm1hdGNoZXIiLCJwcm9wZXJ0eSIsImciLCJtYXgiLCJtIiwiYiIsIngiLCJwb3ciLCJBIiwidyIsImVhY2giLCJjb2xsZWN0IiwiTyIsInJlZHVjZSIsImZvbGRsIiwiaW5qZWN0IiwicmVkdWNlUmlnaHQiLCJmb2xkciIsImRldGVjdCIsImZpbmRLZXkiLCJzZWxlY3QiLCJuZWdhdGUiLCJzb21lIiwiYW55IiwiaW5jbHVkZXMiLCJpbmNsdWRlIiwidmFsdWVzIiwiaW52b2tlIiwicGx1Y2siLCJ3aGVyZSIsIm1pbiIsInNodWZmbGUiLCJzYW1wbGUiLCJyYW5kb20iLCJjbG9uZSIsInNvcnRCeSIsImNyaXRlcmlhIiwiZ3JvdXBCeSIsImluZGV4QnkiLCJjb3VudEJ5IiwiUyIsInRvQXJyYXkiLCJpc1N0cmluZyIsIm1hdGNoIiwic2l6ZSIsInBhcnRpdGlvbiIsImZpcnN0IiwiaGVhZCIsInRha2UiLCJpbml0aWFsIiwibGFzdCIsInJlc3QiLCJ0YWlsIiwiZHJvcCIsImNvbXBhY3QiLCJCb29sZWFuIiwiTSIsImlzQXJndW1lbnRzIiwiZmxhdHRlbiIsIndpdGhvdXQiLCJkaWZmZXJlbmNlIiwidW5pcSIsInVuaXF1ZSIsImlzQm9vbGVhbiIsInVuaW9uIiwiaW50ZXJzZWN0aW9uIiwidW56aXAiLCJ6aXAiLCJGIiwiZmluZExhc3RJbmRleCIsInNvcnRlZEluZGV4IiwiRSIsInJhbmdlIiwiY2VpbCIsImNodW5rIiwiTiIsImJpbmQiLCJwYXJ0aWFsIiwicGxhY2Vob2xkZXIiLCJiaW5kQWxsIiwibWVtb2l6ZSIsImNhY2hlIiwiZGVsYXkiLCJkZWZlciIsInRocm90dGxlIiwibGVhZGluZyIsIm5vdyIsImNsZWFyVGltZW91dCIsInRyYWlsaW5nIiwiY2FuY2VsIiwiZGVib3VuY2UiLCJ3cmFwIiwiY29tcG9zZSIsInJlc3RBcmd1bWVudHMiLCJJIiwicHJvcGVydHlJc0VudW1lcmFibGUiLCJUIiwiQiIsImNvbnN0cnVjdG9yIiwiYWxsS2V5cyIsIm1hcE9iamVjdCIsInBhaXJzIiwiaW52ZXJ0IiwiZnVuY3Rpb25zIiwibWV0aG9kcyIsIlIiLCJleHRlbmRPd24iLCJhc3NpZ24iLCJxIiwiSyIsInoiLCJvbWl0IiwiU3RyaW5nIiwiZGVmYXVsdHMiLCJ0YXAiLCJpc01hdGNoIiwidmFsdWVPZiIsInBvcCIsImlzRXF1YWwiLCJpc0VtcHR5IiwiRCIsImNoaWxkTm9kZXMiLCJJbnQ4QXJyYXkiLCJpc0Zpbml0ZSIsImlzU3ltYm9sIiwiaXNOdWxsIiwiaXNVbmRlZmluZWQiLCJoYXMiLCJub0NvbmZsaWN0IiwiY29uc3RhbnQiLCJub29wIiwicHJvcGVydHlPZiIsInRpbWVzIiwiRGF0ZSIsImdldFRpbWUiLCJMIiwiUCIsIlciLCJlc2NhcGUiLCJ1bmVzY2FwZSIsIkMiLCJ1bmlxdWVJZCIsInRlbXBsYXRlU2V0dGluZ3MiLCJldmFsdWF0ZSIsImludGVycG9sYXRlIiwiSiIsIlUiLCJWIiwiJCIsInRlbXBsYXRlIiwidmFyaWFibGUiLCJGdW5jdGlvbiIsImNoYWluIiwiX2NoYWluIiwiRyIsIm1peGluIiwidG9KU09OIiwiZGVmaW5lIiwiaXNSdG1wIiwiaXNXZWJSVEMiLCJpc0hscyIsImlzRGFzaCIsImdldFNjcmlwdFBhdGgiLCJzY3JpcHROYW1lIiwic2NyaXB0cyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwic3JjIiwiX19WRVJTSU9OX18iXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7UUFDQTtRQUNBLFFBQVEsb0JBQW9CO1FBQzVCO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOzs7O1FBSUE7UUFDQTtRQUNBLHlDQUF5QyxzNEJBQXM0QjtRQUMvNkI7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFF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LCtCQUFpQkQsSUFBakIsS0FBMEIsTUFBckg7QUFFSDtBQUNKLENBTE07QUFNQSxJQUFNNmxCLDBCQUFTLFNBQVRBLE1BQVMsQ0FBVTdsQixJQUFWLEVBQWdCQyxJQUFoQixFQUFzQjtBQUN4QyxRQUFHRCxJQUFILEVBQVE7QUFDSixlQUFTQyxTQUFTLEtBQVQsSUFBbUJBLFNBQVMsTUFBNUIsSUFBc0NBLFNBQVMsc0JBQS9DLElBQXlFLCtCQUFpQkQsSUFBakIsS0FBMEIsS0FBNUc7QUFFSDtBQUNKLENBTE0sQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQlA7Ozs7QUFJTyxJQUFNOGxCLHdDQUFnQixTQUFoQkEsYUFBZ0IsQ0FBU0MsVUFBVCxFQUFxQjtBQUM5QyxRQUFNQyxVQUFVbm1CLFNBQVNvbUIsb0JBQVQsQ0FBOEIsUUFBOUIsQ0FBaEI7QUFDQSxTQUFLLElBQUl0MUIsSUFBSSxDQUFiLEVBQWdCQSxJQUFJcTFCLFFBQVFwMUIsTUFBNUIsRUFBb0NELEdBQXBDLEVBQXlDO0FBQ3JDLFlBQU11MUIsTUFBTUYsUUFBUXIxQixDQUFSLEVBQVd1MUIsR0FBdkI7QUFDQSxZQUFJQSxHQUFKLEVBQVM7QUFDTCxnQkFBTXoyQixRQUFReTJCLElBQUk5VCxXQUFKLENBQWdCLE1BQU0yVCxVQUF0QixDQUFkO0FBQ0EsZ0JBQUl0MkIsU0FBUyxDQUFiLEVBQWdCO0FBQ1osdUJBQU95MkIsSUFBSWhnQixNQUFKLENBQVcsQ0FBWCxFQUFjelcsUUFBUSxDQUF0QixDQUFQO0FBQ0g7QUFDSjtBQUNKO0FBQ0QsV0FBTyxFQUFQO0FBQ0gsQ0FaTSxDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0pQOzs7QUFHTyxJQUFNaEIsNEJBQVUwM0IsNkJBQWhCLEMiLCJmaWxlIjoib3ZlbnBsYXllci5zZGsuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcblxuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHR9O1xuXG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcIm92ZW5wbGF5ZXIuc2RrXCI6IDBcbiBcdH07XG5cblxuXG4gXHQvLyBzY3JpcHQgcGF0aCBmdW5jdGlvblxuIFx0ZnVuY3Rpb24ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCkge1xuIFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArICh7XCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjJlYzE5M2FjXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjJlYzE5M2FjXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjdhZmQ2OGNmXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjdhZmQ2OGNmXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlclwiOlwib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDVcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDVcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuV2ViUlRDUHJvdmlkZXJcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuV2ViUlRDUHJvdmlkZXJcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuUnRtcFByb3ZpZGVyXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLlJ0bXBQcm92aWRlclwiLFwic21pcGFyc2VyXCI6XCJzbWlwYXJzZXJcIixcInZlbmRvcnN+ZG93bmxvYWRlclwiOlwidmVuZG9yc35kb3dubG9hZGVyXCIsXCJkb3dubG9hZGVyXCI6XCJkb3dubG9hZGVyXCIsXCJ2dHRwYXJzZXJcIjpcInZ0dHBhcnNlclwifVtjaHVua0lkXXx8Y2h1bmtJZCkgKyBcIi5qc1wiXG4gXHR9XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuIFx0Ly8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuIFx0Ly8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSBmdW5jdGlvbiByZXF1aXJlRW5zdXJlKGNodW5rSWQpIHtcbiBcdFx0dmFyIHByb21pc2VzID0gW107XG5cblxuIFx0XHQvLyBKU09OUCBjaHVuayBsb2FkaW5nIGZvciBqYXZhc2NyaXB0XG5cbiBcdFx0dmFyIGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhICE9PSAwKSB7IC8vIDAgbWVhbnMgXCJhbHJlYWR5IGluc3RhbGxlZFwiLlxuXG4gXHRcdFx0Ly8gYSBQcm9taXNlIG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEpIHtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdKTtcbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Ly8gc2V0dXAgUHJvbWlzZSBpbiBjaHVuayBjYWNoZVxuIFx0XHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gW3Jlc29sdmUsIHJlamVjdF07XG4gXHRcdFx0XHR9KTtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdID0gcHJvbWlzZSk7XG5cbiBcdFx0XHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcbiBcdFx0XHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiBcdFx0XHRcdHZhciBvblNjcmlwdENvbXBsZXRlO1xuXG4gXHRcdFx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG4gXHRcdFx0XHRzY3JpcHQudGltZW91dCA9IDEyMDtcbiBcdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG4gXHRcdFx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHNjcmlwdC5zcmMgPSBqc29ucFNjcmlwdFNyYyhjaHVua0lkKTtcblxuIFx0XHRcdFx0Ly8gY3JlYXRlIGVycm9yIGJlZm9yZSBzdGFjayB1bndvdW5kIHRvIGdldCB1c2VmdWwgc3RhY2t0cmFjZSBsYXRlclxuIFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCk7XG4gXHRcdFx0XHRvblNjcmlwdENvbXBsZXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gXHRcdFx0XHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cbiBcdFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gbnVsbDtcbiBcdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuIFx0XHRcdFx0XHR2YXIgY2h1bmsgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdFx0XHRcdGlmKGNodW5rICE9PSAwKSB7XG4gXHRcdFx0XHRcdFx0aWYoY2h1bmspIHtcbiBcdFx0XHRcdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG4gXHRcdFx0XHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IubWVzc2FnZSA9ICdMb2FkaW5nIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLm5hbWUgPSAnQ2h1bmtMb2FkRXJyb3InO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnJlcXVlc3QgPSByZWFsU3JjO1xuIFx0XHRcdFx0XHRcdFx0Y2h1bmtbMV0oZXJyb3IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSB1bmRlZmluZWQ7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH07XG4gXHRcdFx0XHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiBcdFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSh7IHR5cGU6ICd0aW1lb3V0JywgdGFyZ2V0OiBzY3JpcHQgfSk7XG4gXHRcdFx0XHR9LCAxMjAwMDApO1xuIFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gb25TY3JpcHRDb21wbGV0ZTtcbiBcdFx0XHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0cmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gb24gZXJyb3IgZnVuY3Rpb24gZm9yIGFzeW5jIGxvYWRpbmdcbiBcdF9fd2VicGFja19yZXF1aXJlX18ub2UgPSBmdW5jdGlvbihlcnIpIHsgY29uc29sZS5lcnJvcihlcnIpOyB0aHJvdyBlcnI7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvanMvb3ZlbnBsYXllci5zZGsuanNcIik7XG4iLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHRpZiAoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcblx0XHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XG5cdH1cblx0cmV0dXJuIG1vZHVsZTtcbn07XG4iLCJpbXBvcnQgQ2FwdGlvbk1hbmFnZXIgZnJvbSBcImFwaS9jYXB0aW9uL01hbmFnZXJcIjtcclxuaW1wb3J0IENvbmZpZ3VyYXRvciBmcm9tIFwiYXBpL0NvbmZpZ3VyYXRvclwiO1xyXG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJhcGkvRXZlbnRFbWl0dGVyXCI7XHJcbmltcG9ydCBMYXp5Q29tbWFuZEV4ZWN1dG9yIGZyb20gXCJhcGkvTGF6eUNvbW1hbmRFeGVjdXRvclwiO1xyXG5pbXBvcnQgTWVkaWFNYW5hZ2VyIGZyb20gXCJhcGkvbWVkaWEvTWFuYWdlclwiO1xyXG5pbXBvcnQgUGxheWxpc3RNYW5hZ2VyIGZyb20gXCJhcGkvcGxheWxpc3QvTWFuYWdlclwiO1xyXG5pbXBvcnQgUHJvdmlkZXJDb250cm9sbGVyIGZyb20gXCJhcGkvcHJvdmlkZXIvQ29udHJvbGxlclwiO1xyXG5pbXBvcnQge1JFQURZLCBFUlJPUlMsIEVSUk9SLCBDT05URU5UX1RJTUVfTU9ERV9DSEFOR0VELCBJTklUX1VOS05XT05fRVJST1IsIElOSVRfVU5TVVBQT1JUX0VSUk9SLCBERVNUUk9ZLCBQTEFZRVJfUExBWSwgTkVUV09SS19VTlNUQUJMRUQsIFBMQVlFUl9XRUJSVENfTkVUV09SS19TTE9XLCBQTEFZRVJfV0VCUlRDX1VORVhQRUNURURfRElTQ09OTkVDVCwgUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUixcclxuICAgIFBMQVlFUl9GSUxFX0VSUk9SLCBQUk9WSURFUl9EQVNILCBQUk9WSURFUl9ITFMsIFBST1ZJREVSX1dFQlJUQywgUFJPVklERVJfSFRNTDUsIFBST1ZJREVSX1JUTVAsIEFMTF9QTEFZTElTVF9FTkRFRH0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuaW1wb3J0IHt2ZXJzaW9ufSBmcm9tICd2ZXJzaW9uJztcclxuaW1wb3J0IHtBcGlSdG1wRXhwYW5zaW9ufSBmcm9tICdhcGkvQXBpRXhwYW5zaW9ucyc7XHJcbmltcG9ydCB7YW5hbFVzZXJBZ2VudH0gZnJvbSBcInV0aWxzL2Jyb3dzZXJcIjtcclxuaW1wb3J0IHtwaWNrQ3VycmVudFNvdXJjZX0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xyXG5pbXBvcnQgTEEkIGZyb20gJ3V0aWxzL2xpa2VBJCc7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgVGhpcyBvYmplY3QgY29ubmVjdHMgVUkgdG8gdGhlIHByb3ZpZGVyLlxyXG4gKiBAcGFyYW0gICB7b2JqZWN0fSAgICBjb250YWluZXIgIGRvbSBlbGVtZW50XHJcbiAqXHJcbiAqICovXHJcblxyXG5jb25zdCBBcGkgPSBmdW5jdGlvbihjb250YWluZXIpe1xyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG4gICAgRXZlbnRFbWl0dGVyKHRoYXQpO1xyXG5cclxuXHJcbiAgICBjb25zb2xlLmxvZyhcIltbT3ZlblBsYXllcl1dIHYuXCIrIHZlcnNpb24pO1xyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIGxvYWRlZC5cIik7XHJcblxyXG4gICAgbGV0IHBsYXlsaXN0TWFuYWdlciA9IFBsYXlsaXN0TWFuYWdlcih0aGF0KTtcclxuICAgIGxldCBwcm92aWRlckNvbnRyb2xsZXIgPSBQcm92aWRlckNvbnRyb2xsZXIoKTtcclxuICAgIGxldCB1c2VyQWdlbnRPYmplY3QgPSBhbmFsVXNlckFnZW50KCk7XHJcbiAgICBsZXQgbWVkaWFNYW5hZ2VyID0gTWVkaWFNYW5hZ2VyKGNvbnRhaW5lciwgdXNlckFnZW50T2JqZWN0KTtcclxuICAgIGxldCBjdXJyZW50UHJvdmlkZXIgPSBcIlwiO1xyXG4gICAgbGV0IHBsYXllckNvbmZpZyA9IFwiXCI7XHJcbiAgICBsZXQgbGF6eVF1ZXVlID0gXCJcIjtcclxuICAgIGxldCBjYXB0aW9uTWFuYWdlciA9IFwiXCI7XHJcblxyXG4gICAgbGV0IHdlYnJ0Y1JldHJ5ID0gZmFsc2U7XHJcbiAgICBsZXQgV0VCUlRDX1JFVFJZX0NPVU5UID0gMztcclxuICAgIGxldCB3ZWJydGNSZXRyeUNvdW50ID0gV0VCUlRDX1JFVFJZX0NPVU5UO1xyXG4gICAgbGV0IHdlYnJ0Y1JldHJ5SW50ZXJ2YWwgPSAxMDAwO1xyXG4gICAgbGV0IHdlYnJ0Y1JldHJ5VGltZXIgPSBudWxsO1xyXG5cclxuXHJcbiAgICBjb25zdCBydW5OZXh0UGxheWxpc3QgPSBmdW5jdGlvbihpbmRleCl7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwicnVuTmV4dFBsYXlsaXN0XCIpO1xyXG4gICAgICAgIGxldCBuZXh0UGxheWxpc3RJbmRleCA9IGluZGV4OyAvLyB8fCBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFBsYXlsaXN0SW5kZXgoKSArIDE7XHJcbiAgICAgICAgbGV0IHBsYXlsaXN0ID0gcGxheWxpc3RNYW5hZ2VyLmdldFBsYXlsaXN0KCk7XHJcbiAgICAgICAgbGV0IGhhc05leHRQbGF5bGlzdCA9IHBsYXlsaXN0W25leHRQbGF5bGlzdEluZGV4XT8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgIC8vaW5pdCBzb3VyY2UgaW5kZXhcclxuICAgICAgICBwbGF5ZXJDb25maWcuc2V0U291cmNlSW5kZXgoMCk7XHJcblxyXG4gICAgICAgIC8vc2V0IEdvbGJhbCBWb2x1bWUgaW5mb1xyXG4gICAgICAgIHBsYXllckNvbmZpZy5zZXRWb2x1bWUoY3VycmVudFByb3ZpZGVyLmdldFZvbHVtZSgpKTtcclxuXHJcbiAgICAgICAgaWYoaGFzTmV4dFBsYXlsaXN0KXtcclxuICAgICAgICAgICAgLy90aGF0LnBhdXNlKCk7XHJcbiAgICAgICAgICAgIGxhenlRdWV1ZSA9IExhenlDb21tYW5kRXhlY3V0b3IodGhhdCwgWydwbGF5Jywnc2VlaycsJ3N0b3AnXSk7XHJcbiAgICAgICAgICAgIHBsYXlsaXN0TWFuYWdlci5zZXRDdXJyZW50UGxheWxpc3QobmV4dFBsYXlsaXN0SW5kZXgpO1xyXG4gICAgICAgICAgICBpbml0UHJvdmlkZXIoKTtcclxuXHJcblxyXG4gICAgICAgICAgICBpZighcGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpe1xyXG4gICAgICAgICAgICAgICAgLy9Bbnl3YXkgbmV4dHBsYXlsaXN0IHJ1bnMgYXV0b1N0YXJ0IS5cclxuICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIC8vQWxsIFBsYXlsaXN0IEVuZGVkLlxyXG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoQUxMX1BMQVlMSVNUX0VOREVELCBudWxsKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgY29uc3QgaW5pdFByb3ZpZGVyID0gZnVuY3Rpb24obGFzdFBsYXlQb3NpdGlvbil7XHJcbiAgICAgICAgY29uc3QgcGlja1F1YWxpdHlGcm9tU291cmNlID0gKHNvdXJjZXMpID0+e1xyXG4gICAgICAgICAgICB2YXIgcXVhbGl0eSA9IDA7XHJcbiAgICAgICAgICAgIGlmIChzb3VyY2VzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc291cmNlc1tpXS5kZWZhdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1YWxpdHkgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyQ29uZmlnLmdldFNvdXJjZUluZGV4KCkgPT09IGkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvKmlmIChwbGF5ZXJDb25maWcuZ2V0U291cmNlTGFiZWwoKSAmJiBzb3VyY2VzW2ldLmxhYmVsID09PSBwbGF5ZXJDb25maWcuZ2V0U291cmNlTGFiZWwoKSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSovXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHF1YWxpdHk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHByb3ZpZGVyQ29udHJvbGxlci5sb2FkUHJvdmlkZXJzKHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50UGxheUxpc3QoKSkudGhlbihQcm92aWRlcnMgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYoUHJvdmlkZXJzLmxlbmd0aCA8IDEpe1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgRVJST1JTLmNvZGVzW0lOSVRfVU5TVVBQT1JUX0VSUk9SXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoY3VycmVudFByb3ZpZGVyKXtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGNhcHRpb25NYW5hZ2VyKXtcclxuICAgICAgICAgICAgICAgIGNhcHRpb25NYW5hZ2VyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIGNhcHRpb25NYW5hZ2VyID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXB0aW9uTWFuYWdlciA9IENhcHRpb25NYW5hZ2VyKHRoYXQsIHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50UGxheWxpc3RJbmRleCgpKTtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaW5pdCgpIGNhcHRpb25zXCIpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRTb3VyY2VJbmRleCA9IHBpY2tDdXJyZW50U291cmNlKHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50U291cmNlcygpLCBwbGF5ZXJDb25maWcpO1xyXG4gICAgICAgICAgICBsZXQgcHJvdmlkZXJOYW1lID0gUHJvdmlkZXJzW2N1cnJlbnRTb3VyY2VJbmRleF1bXCJuYW1lXCJdO1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpbml0KCkgcHJvdmlkZXJcIiwgcHJvdmlkZXJOYW1lKTtcclxuICAgICAgICAgICAgLy9Jbml0IFByb3ZpZGVyLlxyXG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIgPSAgUHJvdmlkZXJzW2N1cnJlbnRTb3VyY2VJbmRleF0ucHJvdmlkZXIoXHJcbiAgICAgICAgICAgICAgICBtZWRpYU1hbmFnZXIuY3JlYXRlTWVkaWEocHJvdmlkZXJOYW1lLCBwbGF5ZXJDb25maWcpLFxyXG4gICAgICAgICAgICAgICAgcGxheWVyQ29uZmlnLFxyXG4gICAgICAgICAgICAgICAgcGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRBZFRhZygpXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBpZihwcm92aWRlck5hbWUgPT09IFBST1ZJREVSX1JUTVApe1xyXG4gICAgICAgICAgICAgICAgLy9JZiBwcm92aWRlciB0eXBlIGlzIFJUTVAsIHdlIGFjY2VwdHMgUnRtcEV4cGFuc2lvbi5cclxuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhhdCwgQXBpUnRtcEV4cGFuc2lvbihjdXJyZW50UHJvdmlkZXIpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9UaGlzIHBhc3NlcyB0aGUgZXZlbnQgY3JlYXRlZCBieSB0aGUgUHJvdmlkZXIgdG8gQVBJLlxyXG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIub24oXCJhbGxcIiwgZnVuY3Rpb24obmFtZSwgZGF0YSl7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoIG5hbWUgPT09IEVSUk9SKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIENocm9tZSA+PTgwIG9uIEFuZHJvaWQgbWlzc2VzIGgyNDYgaW4gU0RQIHdoZW4gZmlyc3QgdGltZSBhZnRlciB3ZWIgcGFnZSBsb2FkZWQuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU28gd2FpdCB1bnRpbCBicm93c2VyIGdldCBoMjY0IGNhcGFiaWxpdGllcyBhbmQgY3JlYXRlIGFuc3dlciBTRFAuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXJBZ2VudE9iamVjdC5vcyA9PT0gJ0FuZHJvaWQnICYmIHVzZXJBZ2VudE9iamVjdC5icm93c2VyID09PSAnQ2hyb21lJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5jb2RlICYmIGRhdGEuY29kZSA9PT0gUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldEN1cnJlbnRTb3VyY2UodGhhdC5nZXRDdXJyZW50U291cmNlKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgd2VicnRjUmV0cnlJbnRlcnZhbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyQ29uZmlnLmdldENvbmZpZygpLmF1dG9GYWxsYmFjayAmJiBwbGF5ZXJDb25maWcuZ2V0U291cmNlSW5kZXgoKSArIDEgPCB0aGF0LmdldFNvdXJjZXMoKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzIHNlcXVlbnRpYWwgaGFzIGF2YWlsYWJsZSBzb3VyY2UuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGF1c2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRDdXJyZW50U291cmNlKHBsYXllckNvbmZpZy5nZXRTb3VyY2VJbmRleCgpICsgMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmKG5hbWUgPT09IFwiY29tcGxldGVcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuTmV4dFBsYXlsaXN0KHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50UGxheWxpc3RJbmRleCgpICsgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKG5hbWUsIGRhdGEpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSkudGhlbigoKT0+e1xyXG5cclxuICAgICAgICAgICAgLy9wcm92aWRlcidzIHByZWxvYWQoKSBoYXZlIHRvIG1hZGUgUHJvbWlzZS4gQ3V6IGl0IG92ZXJjb21lcyAnZmxhc2ggbG9hZGluZyB0aW1pbmcgcHJvYmxlbScuXHJcbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5wcmVsb2FkKHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50U291cmNlcygpLCBsYXN0UGxheVBvc2l0aW9uKS50aGVuKGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFJFQURZKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsYXp5UXVldWUuZmx1c2goKTtcclxuICAgICAgICAgICAgICAgIC8vVGhpcyBpcyBubyByZWFzb24gdG8gZXhpc3QgYW55bW9yZS5cclxuICAgICAgICAgICAgICAgIGxhenlRdWV1ZS5kZXN0cm95KCk7XHJcblxyXG4gICAgICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgIGxhenlRdWV1ZS5vZmYoKTtcclxuICAgICAgICAgICAgICAgIGlmKGVycm9yICYmIGVycm9yLmNvZGUgJiYgRVJST1JTLmNvZGVzW2Vycm9yLmNvZGVdKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoRVJST1IsIEVSUk9SUy5jb2Rlc1tlcnJvci5jb2RlXSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tJTklUX1VOS05XT05fRVJST1JdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihFUlJPUiwgdGVtcEVycm9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgIC8vSU5JVCBFUlJPUlxyXG4gICAgICAgICAgICBpZihlcnJvciAmJiBlcnJvci5jb2RlICYmIEVSUk9SUy5jb2Rlc1tlcnJvci5jb2RlXSl7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoRVJST1IsIEVSUk9SUy5jb2Rlc1tlcnJvci5jb2RlXSk7XHJcbiAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbSU5JVF9VTktOV09OX0VSUk9SXTtcclxuICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKEVSUk9SLCB0ZW1wRXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL3h4eCA6IElmIHlvdSBpbml0IGVtcHR5IHNvdXJjZXMuIChJIHRoaW5rIHRoaXMgaXMgc3RyYW5nZSBjYXNlLilcclxuICAgICAgICAgICAgLy9UaGlzIHdvcmtzIGZvciB0aGlzIGNhc2UuXHJcbiAgICAgICAgICAgIC8vcGxheWVyID0gT3ZlblBsYXllci5jcmVhdGUoXCJlbElkXCIsIHt9KTtcclxuICAgICAgICAgICAgLy9wbGF5ZXIubG9hZChzb3J1Y2VzKTtcclxuICAgICAgICAgICAgbGF6eVF1ZXVlLm9mZigpO1xyXG4gICAgICAgICAgICAvL2xhenlRdWV1ZS5yZW1vdmVBbmRFeGN1dGVPbmNlKFwibG9hZFwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQVBJIOy0iOq4sO2ZlCDtlajsiJhcclxuICAgICAqIGluaXRcclxuICAgICAqIEBwYXJhbSAgICAgIHtvYmplY3R9IG9wdGlvbnMgcGxheWVyIGluaXRpYWwgb3B0aW9uIHZhbHVlLlxyXG4gICAgICogQHJldHVybnNcclxuICAgICAqKi9cclxuICAgIHRoYXQuaW5pdCA9IChvcHRpb25zKSA9PntcclxuICAgICAgICAvL0l0IGNvbGxlY3RzIHRoZSBjb21tYW5kcyBhbmQgZXhlY3V0ZXMgdGhlbSBhdCB0aGUgdGltZSB3aGVuIHRoZXkgYXJlIGV4ZWN1dGFibGUuXHJcbiAgICAgICAgbGF6eVF1ZXVlID0gTGF6eUNvbW1hbmRFeGVjdXRvcih0aGF0LCBbXHJcbiAgICAgICAgICAgICdsb2FkJywncGxheScsJ3BhdXNlJywnc2VlaycsJ3N0b3AnLCAnZ2V0RHVyYXRpb24nLCAnZ2V0UG9zaXRpb24nLCAnZ2V0Vm9sdW1lJ1xyXG4gICAgICAgICAgICAsICdnZXRNdXRlJywgJ2dldEJ1ZmZlcicsICdnZXRTdGF0ZScgLCAnZ2V0UXVhbGl0eUxldmVscydcclxuICAgICAgICBdKTtcclxuICAgICAgICBvcHRpb25zLm1lZGlhQ29udGFpbmVyID0gY29udGFpbmVyO1xyXG4gICAgICAgIG9wdGlvbnMuYnJvd3NlciA9IHVzZXJBZ2VudE9iamVjdDtcclxuICAgICAgICBwbGF5ZXJDb25maWcgPSBDb25maWd1cmF0b3Iob3B0aW9ucywgdGhhdCk7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaW5pdCgpXCIpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGluaXQoKSBjb25maWcgOiBcIiwgcGxheWVyQ29uZmlnKTtcclxuXHJcbiAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRDb25maWcoKS53ZWJydGNDb25maWcgJiYgcGxheWVyQ29uZmlnLmdldENvbmZpZygpLndlYnJ0Y0NvbmZpZy5sb2FkaW5nUmV0cnlDb3VudCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIFdFQlJUQ19SRVRSWV9DT1VOVCA9IHBsYXllckNvbmZpZy5nZXRDb25maWcoKS5sb2FkaW5nUmV0cnlDb3VudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vTm90IHdvcmtpbmcgOiBTeW50YXhFcnJvcjogXCJFUlJPUlMuY29kZXNcIiBpcyByZWFkLW9ubHlcclxuICAgICAgICBFUlJPUlMuY29kZXMgPSBwbGF5ZXJDb25maWcuZ2V0U3lzdGVtVGV4dCgpLmFwaS5lcnJvcjtcclxuICAgICAgICAvL0Nvb2xcclxuICAgICAgICAvL0VSUk9SUy5jb2Rlcy5wdXNoKHBsYXllckNvbmZpZy5nZXRTeXN0ZW1UZXh0KCkpO1xyXG5cclxuICAgICAgICBwbGF5bGlzdE1hbmFnZXIuaW5pdFBsYXlsaXN0KHBsYXllckNvbmZpZy5nZXRQbGF5bGlzdCgpLCBwbGF5ZXJDb25maWcpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGluaXQoKSBzb3VyY2VzIDogXCIgLCBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKSk7XHJcblxyXG4gICAgICAgIGluaXRQcm92aWRlcigpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0UHJvdmlkZXJOYW1lID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKGN1cnJlbnRQcm92aWRlcil7XHJcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0TmFtZSgpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0TXNlSW5zdGFuY2UgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoY3VycmVudFByb3ZpZGVyKXtcclxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRNc2UoKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcbiAgICB0aGF0LmdldENvbmZpZyA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRDb25maWcoKVwiLCBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkpO1xyXG4gICAgICAgIHJldHVybiBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRCcm93c2VyID0gKCkgPT4ge1xyXG5cclxuICAgICAgICByZXR1cm4gcGxheWVyQ29uZmlnLmdldEJyb3dzZXIoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFRpbWVjb2RlTW9kZSA9IChpc1Nob3cpID0+e1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldFRpbWVjb2RlTW9kZSgpXCIsIGlzU2hvdyk7XHJcbiAgICAgICAgcGxheWVyQ29uZmlnLnNldFRpbWVjb2RlTW9kZShpc1Nob3cpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuaXNUaW1lY29kZU1vZGUgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaXNUaW1lY29kZU1vZGUoKVwiKTtcclxuICAgICAgICByZXR1cm4gcGxheWVyQ29uZmlnLmlzVGltZWNvZGVNb2RlKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRGcmFtZXJhdGUgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0RnJhbWVyYXRlKClcIik7XHJcblxyXG4gICAgICAgIGlmIChjdXJyZW50UHJvdmlkZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRGcmFtZXJhdGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuICAgIHRoYXQuc2Vla0ZyYW1lID0gKGZyYW1lQ291bnQpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2Vla0ZyYW1lKClcIiwgZnJhbWVDb3VudCk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5zZWVrRnJhbWUoZnJhbWVDb3VudCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0RHVyYXRpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldER1cmF0aW9uKClcIiwgY3VycmVudFByb3ZpZGVyLmdldER1cmF0aW9uKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0RHVyYXRpb24oKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFBvc2l0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0UG9zaXRpb24oKVwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0UG9zaXRpb24oKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRQb3NpdGlvbigpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Vm9sdW1lID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Vm9sdW1lKClcIiwgY3VycmVudFByb3ZpZGVyLmdldFZvbHVtZSgpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFZvbHVtZSgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Vm9sdW1lID0gKHZvbHVtZSkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Vm9sdW1lKCkgXCIgKyB2b2x1bWUpO1xyXG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5zZXRWb2x1bWUodm9sdW1lKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldE11dGUgPSAoc3RhdGUpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldE11dGUoKSBcIiArIHN0YXRlKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLnNldE11dGUoc3RhdGUpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0TXV0ZSA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldE11dGUoKSBcIiArIGN1cnJlbnRQcm92aWRlci5nZXRNdXRlKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0TXV0ZSgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQubG9hZCA9IChwbGF5bGlzdCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGxvYWQoKSBcIiwgcGxheWxpc3QpO1xyXG4gICAgICAgIGxhenlRdWV1ZSA9IExhenlDb21tYW5kRXhlY3V0b3IodGhhdCwgWydwbGF5Jywnc2VlaycsJ3N0b3AnXSk7XHJcblxyXG4gICAgICAgIGlmKHBsYXlsaXN0KXtcclxuICAgICAgICAgICAgaWYoY3VycmVudFByb3ZpZGVyKXtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5zZXRDdXJyZW50UXVhbGl0eSgwKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCdzb3VyY2VzJyBpbiBwbGF5bGlzdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHBsYXllckNvbmZpZy5zZXRQbGF5bGlzdChwbGF5bGlzdCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgcGxheWVyQ29uZmlnLnNldFBsYXlsaXN0KHtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2VzOiBwbGF5bGlzdFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHBsYXlsaXN0TWFuYWdlci5pbml0UGxheWxpc3QocGxheWVyQ29uZmlnLmdldFBsYXlsaXN0KCksIHBsYXllckNvbmZpZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbml0UHJvdmlkZXIoKTtcclxuXHJcbiAgICB9O1xyXG4gICAgdGhhdC5wbGF5ID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBwbGF5KCkgXCIpO1xyXG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5wbGF5KCk7XHJcbiAgICB9XHJcbiAgICB0aGF0LnBhdXNlID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcGF1c2UoKSBcIik7XHJcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnBhdXNlKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZWVrID0gKHBvc2l0aW9uKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZWVrKCkgXCIrIHBvc2l0aW9uKTtcclxuICAgICAgICBjdXJyZW50UHJvdmlkZXIuc2Vlayhwb3NpdGlvbik7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRQbGF5YmFja1JhdGUgPSAocGxheWJhY2tSYXRlKSA9PntcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldFBsYXliYWNrUmF0ZSgpIFwiLCBwbGF5YmFja1JhdGUpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2V0UGxheWJhY2tSYXRlKHBsYXllckNvbmZpZy5zZXRQbGF5YmFja1JhdGUocGxheWJhY2tSYXRlKSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGUgPSAoKSA9PntcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFBsYXliYWNrUmF0ZSgpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0UGxheWJhY2tSYXRlKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0UGxheWJhY2tSYXRlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0UGxheWxpc3QgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0UGxheWxpc3QoKSBcIiwgcGxheWxpc3RNYW5hZ2VyLmdldFBsYXlsaXN0KCkpO1xyXG4gICAgICAgIHJldHVybiBwbGF5bGlzdE1hbmFnZXIuZ2V0UGxheWxpc3QoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEN1cnJlbnRQbGF5bGlzdCA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRDdXJyZW50UGxheWxpc3QoKSBcIiwgcGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRQbGF5bGlzdEluZGV4KCkpO1xyXG4gICAgICAgIHJldHVybiBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFBsYXlsaXN0SW5kZXgoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEN1cnJlbnRQbGF5bGlzdCA9IChpbmRleCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEN1cnJlbnRQbGF5bGlzdCgpIFwiLCBpbmRleCk7XHJcbiAgICAgICAgcnVuTmV4dFBsYXlsaXN0KGluZGV4KTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRTb3VyY2VzID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0U291cmNlcygpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0U291cmNlcygpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFNvdXJjZXMoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEN1cnJlbnRTb3VyY2UgPSAoKSA9PntcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEN1cnJlbnRTb3VyY2UoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldEN1cnJlbnRTb3VyY2UoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRDdXJyZW50U291cmNlKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRDdXJyZW50U291cmNlID0gKGluZGV4KSA9PntcclxuXHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRDdXJyZW50U291cmNlKCkgXCIsIGluZGV4KTtcclxuXHJcbiAgICAgICAgLy8gbGV0IHNvdXJjZXMgPSBjdXJyZW50UHJvdmlkZXIuZ2V0U291cmNlcygpO1xyXG4gICAgICAgIC8vIGxldCBjdXJyZW50U291cmNlID0gc291cmNlc1tjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFNvdXJjZSgpXTtcclxuICAgICAgICAvLyBsZXQgbmV3U291cmNlID0gc291cmNlc1tpbmRleF07XHJcblxyXG4gICAgICAgIC8vIGxldCBpc1NhbWVQcm92aWRlciA9IHByb3ZpZGVyQ29udHJvbGxlci5pc1NhbWVQcm92aWRlcihjdXJyZW50U291cmNlLCBuZXdTb3VyY2UpO1xyXG4gICAgICAgIC8vIC8vIHByb3ZpZGVyLnNlckN1cnJlbnRRdWFsaXR5IC0+IHBsYXllckNvbmZpZyBzZXR0aW5nIC0+IGxvYWRcclxuICAgICAgICAvLyBsZXQgcmVzdWx0U291cmNlSW5kZXggPSBjdXJyZW50UHJvdmlkZXIuc2V0Q3VycmVudFNvdXJjZShpbmRleCwgaXNTYW1lUHJvdmlkZXIpO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gaWYoIW5ld1NvdXJjZSl7XHJcbiAgICAgICAgLy8gICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEN1cnJlbnRRdWFsaXR5KCkgaXNTYW1lUHJvdmlkZXJcIiwgaXNTYW1lUHJvdmlkZXIpO1xyXG5cclxuICAgICAgICBsZXQgbGFzdFBsYXlQb3NpdGlvbiA9IGN1cnJlbnRQcm92aWRlci5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIHBsYXllckNvbmZpZy5zZXRTb3VyY2VJbmRleChpbmRleCk7XHJcbiAgICAgICAgbGF6eVF1ZXVlID0gTGF6eUNvbW1hbmRFeGVjdXRvcih0aGF0LCBbJ3BsYXknLCdzZWVrJ10pO1xyXG5cclxuICAgICAgICBpbml0UHJvdmlkZXIobGFzdFBsYXlQb3NpdGlvbik7XHJcblxyXG4gICAgICAgIHJldHVybiBpbmRleDtcclxuICAgIH07XHJcblxyXG5cclxuXHJcbiAgICB0aGF0LmdldFF1YWxpdHlMZXZlbHMgPSAoKSA9PntcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFF1YWxpdHlMZXZlbHMoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldFF1YWxpdHlMZXZlbHMoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRRdWFsaXR5TGV2ZWxzKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRDdXJyZW50UXVhbGl0eSA9ICgpID0+e1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Q3VycmVudFF1YWxpdHkoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldEN1cnJlbnRRdWFsaXR5KCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFF1YWxpdHkoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEN1cnJlbnRRdWFsaXR5ID0gKHF1YWxpdHlJbmRleCkgPT57XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRDdXJyZW50UXVhbGl0eSgpIFwiLCBxdWFsaXR5SW5kZXgpO1xyXG5cclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLnNldEN1cnJlbnRRdWFsaXR5KHF1YWxpdHlJbmRleCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5pc0F1dG9RdWFsaXR5ID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaXNBdXRvUXVhbGl0eSgpXCIpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuaXNBdXRvUXVhbGl0eSgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0QXV0b1F1YWxpdHkgPSAoaXNBdXRvKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRBdXRvUXVhbGl0eSgpIFwiLCBpc0F1dG8pO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2V0QXV0b1F1YWxpdHkoaXNBdXRvKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGF0LmdldENhcHRpb25MaXN0ID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjYXB0aW9uTWFuYWdlcil7cmV0dXJuIG51bGw7fVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldENhcHRpb25MaXN0KCkgXCIsIGNhcHRpb25NYW5hZ2VyLmdldENhcHRpb25MaXN0KCkpO1xyXG4gICAgICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5nZXRDYXB0aW9uTGlzdCgpO1xyXG4gICAgfVxyXG4gICAgdGhhdC5nZXRDdXJyZW50Q2FwdGlvbiA9ICgpID0+IHtcclxuICAgICAgICBpZighY2FwdGlvbk1hbmFnZXIpe3JldHVybiBudWxsO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRDdXJyZW50Q2FwdGlvbigpIFwiLCBjYXB0aW9uTWFuYWdlci5nZXRDdXJyZW50Q2FwdGlvbigpKTtcclxuICAgICAgICByZXR1cm4gY2FwdGlvbk1hbmFnZXIuZ2V0Q3VycmVudENhcHRpb24oKTtcclxuICAgIH1cclxuICAgIHRoYXQuc2V0Q3VycmVudENhcHRpb24gPSAoaW5kZXgpID0+IHtcclxuICAgICAgICBpZighY2FwdGlvbk1hbmFnZXIpe3JldHVybiBudWxsO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRDdXJyZW50Q2FwdGlvbigpIFwiLCBpbmRleCk7XHJcbiAgICAgICAgY2FwdGlvbk1hbmFnZXIuc2V0Q3VycmVudENhcHRpb24oaW5kZXgpO1xyXG4gICAgfVxyXG4gICAgdGhhdC5hZGRDYXB0aW9uID0gKHRyYWNrKSA9PiB7XHJcbiAgICAgICAgaWYoIWNhcHRpb25NYW5hZ2VyKXtyZXR1cm4gbnVsbDt9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogYWRkQ2FwdGlvbigpIFwiKVxyXG4gICAgICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5hZGRDYXB0aW9uKHRyYWNrKTtcclxuICAgIH1cclxuICAgIHRoYXQucmVtb3ZlQ2FwdGlvbiA9IChpbmRleCkgPT4ge1xyXG4gICAgICAgIGlmKCFjYXB0aW9uTWFuYWdlcil7cmV0dXJuIG51bGw7fVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHJlbW92ZUNhcHRpb24oKSBcIiwgaW5kZXgpXHJcbiAgICAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLnJlbW92ZUNhcHRpb24oaW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoYXQuZ2V0QnVmZmVyID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRCdWZmZXIoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldEJ1ZmZlcigpKTtcclxuICAgICAgICBjdXJyZW50UHJvdmlkZXIuZ2V0QnVmZmVyKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRTdGF0ZSA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0U3RhdGUoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldFN0YXRlKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0U3RhdGUoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnN0b3AgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzdG9wKCkgXCIpO1xyXG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5zdG9wKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5yZW1vdmUgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiByZW1vdmUoKSBcIik7XHJcbiAgICAgICAgbGF6eVF1ZXVlLmRlc3Ryb3koKTtcclxuICAgICAgICBpZihjYXB0aW9uTWFuYWdlcil7XHJcbiAgICAgICAgICAgIGNhcHRpb25NYW5hZ2VyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgY2FwdGlvbk1hbmFnZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoY3VycmVudFByb3ZpZGVyKXtcclxuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKG1lZGlhTWFuYWdlcil7XHJcbiAgICAgICAgICAgIG1lZGlhTWFuYWdlci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIG1lZGlhTWFuYWdlciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGF0LnRyaWdnZXIoREVTVFJPWSk7XHJcbiAgICAgICAgdGhhdC5vZmYoKTtcclxuXHJcbiAgICAgICAgcHJvdmlkZXJDb250cm9sbGVyID0gbnVsbDtcclxuICAgICAgICBwbGF5bGlzdE1hbmFnZXIgPSBudWxsO1xyXG4gICAgICAgIHBsYXllckNvbmZpZyA9IG51bGw7XHJcbiAgICAgICAgbGF6eVF1ZXVlID0gbnVsbDtcclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcmVtb3ZlKCkgLSBsYXp5UXVldWUsIGN1cnJlbnRQcm92aWRlciwgcHJvdmlkZXJDb250cm9sbGVyLCBwbGF5bGlzdE1hbmFnZXIsIHBsYXllckNvbmZpZywgYXBpIGV2ZW50IGRlc3Ryb2VkLiBcIik7XHJcbiAgICAgICAgT3ZlblBsYXllclNESy5yZW1vdmVQbGF5ZXIodGhhdC5nZXRDb250YWluZXJJZCgpKTtcclxuICAgICAgICBpZihPdmVuUGxheWVyU0RLLmdldFBsYXllckxpc3QoKS5sZW5ndGggID09PSAwKXtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiT3ZlblBsYXllclNESy5wbGF5ZXJMaXN0XCIsICBPdmVuUGxheWVyU0RLLmdldFBsYXllckxpc3QoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldFZlcnNpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIFwidi5cIit2ZXJzaW9uO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXBpO1xyXG5cclxuXHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gOC4gMjQuLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjb25zdCBBcGlSdG1wRXhwYW5zaW9uID0gZnVuY3Rpb24oY3VycmVudFByb3ZpZGVyKXtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZXh0ZXJuYWxDYWxsYmFja0NyZWVwIDogKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICBpZihyZXN1bHQubmFtZSAmJiByZXN1bHQuZGF0YSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLnRyaWdnZXJFdmVudEZyb21FeHRlcm5hbChyZXN1bHQubmFtZSwgcmVzdWx0LmRhdGEpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufTtcclxuIiwiaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcclxuXHJcbmltcG9ydCB7XHJcbiAgICBDT05URU5UX1RJTUVfTU9ERV9DSEFOR0VELCBTWVNURU1fVEVYVFxyXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgVGhpcyBpbml0aWFsaXplcyB0aGUgaW5wdXQgb3B0aW9ucy5cclxuICogQHBhcmFtICAgb3B0aW9uc1xyXG4gKlxyXG4gKiAqL1xyXG5jb25zdCBDb25maWd1cmF0b3IgPSBmdW5jdGlvbihvcHRpb25zLCBwcm92aWRlcil7XHJcblxyXG4gICAgY29uc3QgY29tcG9zZVNvdXJjZU9wdGlvbnMgPSBmdW5jdGlvbihvcHRpb25zKXtcclxuICAgICAgICBjb25zdCBEZWZhdWx0cyA9IHtcclxuICAgICAgICAgICAgbWVkaWFDb250YWluZXIgOiBcIlwiLFxyXG4gICAgICAgICAgICBwbGF5YmFja1JhdGVzOiBbMiwgMS41LCAxLCAwLjUsIDAuMjVdLFxyXG4gICAgICAgICAgICBwbGF5YmFja1JhdGU6IDEsXHJcbiAgICAgICAgICAgIG11dGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB2b2x1bWU6IDEwMCxcclxuICAgICAgICAgICAgbG9vcCA6IGZhbHNlLFxyXG4gICAgICAgICAgICBjb250cm9scyA6IHRydWUsXHJcbiAgICAgICAgICAgIGF1dG9TdGFydCA6IGZhbHNlLFxyXG4gICAgICAgICAgICBhdXRvRmFsbGJhY2s6IHRydWUsXHJcbiAgICAgICAgICAgIHRpbWVjb2RlIDogdHJ1ZSxcclxuICAgICAgICAgICAgc291cmNlSW5kZXggOiAtMSxcclxuICAgICAgICAgICAgYnJvd3NlciA6IFwiXCIsXHJcbiAgICAgICAgICAgIGhpZGVQbGF5bGlzdEljb24gOiBmYWxzZSxcclxuICAgICAgICAgICAgcnRtcEJ1ZmZlclRpbWUgOiAxLFxyXG4gICAgICAgICAgICBydG1wQnVmZmVyVGltZU1heCA6IDMsXHJcbiAgICAgICAgICAgIGFkQ2xpZW50IDogXCJnb29nbGVpbWFcIixcclxuICAgICAgICAgICAgY3VycmVudFByb3RvY29sT25seSA6IGZhbHNlLFxyXG4gICAgICAgICAgICBzeXN0ZW1UZXh0IDogbnVsbCxcclxuICAgICAgICAgICAgbGFuZyA6IFwiZW5cIixcclxuICAgICAgICAgICAgbG9hZGluZ1JldHJ5Q291bnQ6IDAsXHJcbiAgICAgICAgICAgIGV4cGFuZEZ1bGxTY3JlZW5VSTogZmFsc2UsXHJcbiAgICAgICAgICAgIGZ1bGxzY3JlZW5PcHRpb246IG51bGwsXHJcbiAgICAgICAgICAgIHNob3dCaWdQbGF5QnV0dG9uOiB0cnVlXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBzZXJpYWxpemUgPSBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgICAgICAgIGlmICh2YWwgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnICYmIHZhbC5sZW5ndGggPCA2KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsb3dlcmNhc2VWYWwgPSB2YWwudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgIGlmIChsb3dlcmNhc2VWYWwgPT09ICd0cnVlJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGxvd2VyY2FzZVZhbCA9PT0gJ2ZhbHNlJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghaXNOYU4oTnVtYmVyKHZhbCkpICYmICFpc05hTihwYXJzZUZsb2F0KHZhbCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE51bWJlcih2YWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGRlc2VyaWFsaXplID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSAnaWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgb3B0aW9uc1trZXldID0gc2VyaWFsaXplKG9wdGlvbnNba2V5XSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGVzZXJpYWxpemUob3B0aW9ucyk7XHJcbiAgICAgICAgbGV0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIERlZmF1bHRzLCBvcHRpb25zKTtcclxuICAgICAgICBsZXQgdXNlckN1c3R1bVN5c3RlbVRleHQgPSBbXTtcclxuICAgICAgICBpZihjb25maWcuc3lzdGVtVGV4dCl7XHJcbiAgICAgICAgICAgIHVzZXJDdXN0dW1TeXN0ZW1UZXh0ID0gXy5pc0FycmF5KGNvbmZpZy5zeXN0ZW1UZXh0KSA/IGNvbmZpZy5zeXN0ZW1UZXh0IDogW2NvbmZpZy5zeXN0ZW1UZXh0XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB1c2VyQ3VzdHVtU3lzdGVtVGV4dC5sZW5ndGg7IGkgKyspe1xyXG4gICAgICAgICAgICBpZih1c2VyQ3VzdHVtU3lzdGVtVGV4dFtpXS5sYW5nKXtcclxuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50U3lzdGVtVGV4dCA9IF8uZmluZFdoZXJlKFNZU1RFTV9URVhUICwge1wibGFuZ1wiOiB1c2VyQ3VzdHVtU3lzdGVtVGV4dFtpXS5sYW5nfSk7XHJcbiAgICAgICAgICAgICAgICBpZihjdXJyZW50U3lzdGVtVGV4dCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy92YWxpZGF0ZSAmIHVwZGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oY3VycmVudFN5c3RlbVRleHQsIHVzZXJDdXN0dW1TeXN0ZW1UZXh0W2ldKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY3JlYXRlXHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFN5c3RlbVRleHQgPSBfLmZpbmRXaGVyZShTWVNURU1fVEVYVCAsIHtcImxhbmdcIjogXCJlblwifSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFN5c3RlbVRleHQubGFuZyA9IHVzZXJDdXN0dW1TeXN0ZW1UZXh0W2ldLmxhbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgU1lTVEVNX1RFWFQucHVzaChPYmplY3QuYXNzaWduKHVzZXJDdXN0dW1TeXN0ZW1UZXh0W2ldLCBjdXJyZW50U3lzdGVtVGV4dCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbmZpZy5zeXN0ZW1UZXh0ID0gXy5maW5kV2hlcmUoU1lTVEVNX1RFWFQgLCB7XCJsYW5nXCI6IGNvbmZpZy5sYW5nfSk7XHJcblxyXG4gICAgICAgIGxldCBwbGF5YmFja1JhdGVzID0gY29uZmlnLnBsYXliYWNrUmF0ZXM7XHJcblxyXG4gICAgICAgIHBsYXliYWNrUmF0ZXMgPSBwbGF5YmFja1JhdGVzLmZpbHRlcihyYXRlID0+IF8uaXNOdW1iZXIocmF0ZSkgJiYgcmF0ZSA+PSAwLjI1ICYmIHJhdGUgPD0gNCkubWFwKHJhdGUgPT4gTWF0aC5yb3VuZChyYXRlICogNCkgLyA0KTtcclxuXHJcbiAgICAgICAgaWYgKHBsYXliYWNrUmF0ZXMuaW5kZXhPZigxKSA8IDApIHtcclxuICAgICAgICAgICAgcGxheWJhY2tSYXRlcy5wdXNoKDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwbGF5YmFja1JhdGVzLnNvcnQoKTtcclxuXHJcbiAgICAgICAgY29uZmlnLnBsYXliYWNrUmF0ZXMgPSBwbGF5YmFja1JhdGVzO1xyXG5cclxuICAgICAgICBjb25maWcucnRtcEJ1ZmZlclRpbWUgPSBjb25maWcucnRtcEJ1ZmZlclRpbWUgPiAxMCA/IDEwIDogY29uZmlnLnJ0bXBCdWZmZXJUaW1lO1xyXG4gICAgICAgIGNvbmZpZy5ydG1wQnVmZmVyVGltZU1heCA9IGNvbmZpZy5ydG1wQnVmZmVyVGltZU1heCA+IDUwID8gNTAgOiBjb25maWcucnRtcEJ1ZmZlclRpbWVNYXg7XHJcblxyXG5cclxuICAgICAgICBpZiAoY29uZmlnLnBsYXliYWNrUmF0ZXMuaW5kZXhPZihjb25maWcucGxheWJhY2tSYXRlKSA8IDApIHtcclxuICAgICAgICAgICAgY29uZmlnLnBsYXliYWNrUmF0ZSA9IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBjb25maWdQbGF5bGlzdCA9IGNvbmZpZy5wbGF5bGlzdDtcclxuICAgICAgICBpZiAoIWNvbmZpZ1BsYXlsaXN0KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9iaiA9IF8ucGljayhjb25maWcsIFtcclxuICAgICAgICAgICAgICAgICd0aXRsZScsXHJcbiAgICAgICAgICAgICAgICAnZGVzY3JpcHRpb24nLFxyXG4gICAgICAgICAgICAgICAgJ3R5cGUnLFxyXG4gICAgICAgICAgICAgICAgJ2ltYWdlJyxcclxuICAgICAgICAgICAgICAgICdmaWxlJyxcclxuICAgICAgICAgICAgICAgICdzb3VyY2VzJyxcclxuICAgICAgICAgICAgICAgICd0cmFja3MnLFxyXG4gICAgICAgICAgICAgICAgJ2hvc3QnLFxyXG4gICAgICAgICAgICAgICAgJ2FwcGxpY2F0aW9uJyxcclxuICAgICAgICAgICAgICAgICdzdHJlYW0nLFxyXG4gICAgICAgICAgICAgICAgJ2FkVGFnVXJsJ1xyXG4gICAgICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgICAgIGNvbmZpZy5wbGF5bGlzdCA9IFsgb2JqIF07XHJcbiAgICAgICAgfSBlbHNlIGlmIChfLmlzQXJyYXkoY29uZmlnUGxheWxpc3QucGxheWxpc3QpKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5mZWVkRGF0YSA9IGNvbmZpZ1BsYXlsaXN0O1xyXG4gICAgICAgICAgICBjb25maWcucGxheWxpc3QgPSBjb25maWdQbGF5bGlzdC5wbGF5bGlzdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRlbGV0ZSBjb25maWcuZHVyYXRpb247XHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZztcclxuICAgIH07XHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDb25maWd1cmF0b3IgbG9hZGVkLlwiLCBvcHRpb25zKTtcclxuICAgIGxldCBzcGVjID0gY29tcG9zZVNvdXJjZU9wdGlvbnMob3B0aW9ucyk7XHJcblxyXG4gICAgLy9zcGVjLmlzRnVsbHNjcmVlbiA9IGZhbHNlOyAvL0lFIDExIGNhbid0IGNoZWNrIGN1cnJlbnQgZnVsbHNjcmVlbiBzdGF0ZS5cclxuXHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICB0aGF0LmdldENvbmZpZyA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYztcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEFkQ2xpZW50ID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLmFkQ2xpZW50O1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Q29uZmlnID0gKGNvbmZpZywgdmFsdWUpID0+IHtcclxuICAgICAgICBzcGVjW2NvbmZpZ10gPSB2YWx1ZTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRDb250YWluZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMubWVkaWFDb250YWluZXI7XHJcbiAgICB9O1xyXG4gICAgLyp0aGF0LmlzRnVsbHNjcmVlbiA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5pc0Z1bGxzY3JlZW47XHJcbiAgICB9XHJcbiAgICB0aGF0LnNldEZ1bGxzY3JlZW4gPSAoaXNGdWxsc2NyZWVuKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuaXNGdWxsc2NyZWVuID0gaXNGdWxsc2NyZWVuO1xyXG4gICAgfSovXHJcblxyXG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGUgPSgpPT57XHJcbiAgICAgICAgcmV0dXJuIHNwZWMucGxheWJhY2tSYXRlO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0UGxheWJhY2tSYXRlID0ocGxheWJhY2tSYXRlKT0+e1xyXG4gICAgICAgIHNwZWMucGxheWJhY2tSYXRlID0gcGxheWJhY2tSYXRlO1xyXG4gICAgICAgIHJldHVybiBwbGF5YmFja1JhdGU7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0UXVhbGl0eUxhYmVsID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLnF1YWxpdHlMYWJlbDtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFF1YWxpdHlMYWJlbCA9IChuZXdMYWJlbCkgPT4ge1xyXG4gICAgICAgIHNwZWMucXVhbGl0eUxhYmVsID0gbmV3TGFiZWw7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuaXNDdXJyZW50UHJvdG9jb2xPbmx5ID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRQcm90b2NvbE9ubHk7XHJcbiAgICB9O1xyXG4gICAgLyp0aGF0LmdldFNvdXJjZUxhYmVsID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLnNvdXJjZUxhYmVsO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0U291cmNlTGFiZWwgPSAobmV3TGFiZWwpID0+IHtcclxuICAgICAgICBzcGVjLnNvdXJjZUxhYmVsID0gbmV3TGFiZWw7XHJcbiAgICB9OyovXHJcblxyXG4gICAgdGhhdC5nZXRTb3VyY2VJbmRleCA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5zb3VyY2VJbmRleDtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFNvdXJjZUluZGV4ID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgc3BlYy5zb3VyY2VJbmRleCA9IGluZGV4O1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0VGltZWNvZGVNb2RlID0gKHRpbWVjb2RlKSA9PiB7XHJcbiAgICAgICAgaWYoc3BlYy50aW1lY29kZSAhPT0gdGltZWNvZGUpe1xyXG4gICAgICAgICAgICBzcGVjLnRpbWVjb2RlID0gdGltZWNvZGU7XHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9USU1FX01PREVfQ0hBTkdFRCwgdGltZWNvZGUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aGF0LmlzVGltZWNvZGVNb2RlID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLnRpbWVjb2RlO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0UnRtcEJ1ZmZlclRpbWUgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMucnRtcEJ1ZmZlclRpbWU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRSdG1wQnVmZmVyVGltZU1heCA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5ydG1wQnVmZmVyVGltZU1heDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5pc011dGUgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gc3BlYy5tdXRlO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Vm9sdW1lID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIHNwZWMudm9sdW1lO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Vm9sdW1lID0gKHZvbHVtZSkgPT57XHJcbiAgICAgICAgc3BlYy52b2x1bWUgPSB2b2x1bWU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5pc0xvb3AgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gc3BlYy5sb29wO1xyXG4gICAgfTtcclxuICAgIHRoYXQuaXNBdXRvU3RhcnQgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gc3BlYy5hdXRvU3RhcnQ7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5pc0NvbnRyb2xzID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuY29udHJvbHM7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0UGxheWJhY2tSYXRlcyA9KCk9PntcclxuICAgICAgICByZXR1cm4gc3BlYy5wbGF5YmFja1JhdGVzO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0QnJvd3NlciA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5icm93c2VyO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0U3lzdGVtVGV4dCA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5zeXN0ZW1UZXh0O1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0TGFuZ3VhZ2UgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMubGFuZztcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRQbGF5bGlzdCA9KCk9PntcclxuICAgICAgICByZXR1cm4gc3BlYy5wbGF5bGlzdDtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFBsYXlsaXN0ID0ocGxheWxpc3QpPT57XHJcbiAgICAgICAgaWYoXy5pc0FycmF5KHBsYXlsaXN0KSl7XHJcbiAgICAgICAgICAgIHNwZWMucGxheWxpc3QgPSBwbGF5bGlzdDtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgc3BlYy5wbGF5bGlzdCA9IFtwbGF5bGlzdF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzcGVjLnBsYXlsaXN0O1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbmZpZ3VyYXRvcjtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAzLi5cclxuICovXHJcblxyXG4vKipcclxuICogQGJyaWVmICAgVGhpcyBtb2R1bGUgcHJvdmlkZSBjdXN0b20gZXZlbnRzLlxyXG4gKiBAcGFyYW0gICBvYmplY3QgICAgQW4gb2JqZWN0IHRoYXQgcmVxdWlyZXMgY3VzdG9tIGV2ZW50cy5cclxuICpcclxuICogKi9cclxuXHJcbmNvbnN0IEV2ZW50RW1pdHRlciA9IGZ1bmN0aW9uKG9iamVjdCl7XHJcbiAgICBsZXQgdGhhdCA9IG9iamVjdDtcclxuICAgIGxldCBfZXZlbnRzID1bXTtcclxuXHJcbiAgICBjb25zdCB0cmlnZ2VyRXZlbnRzID0gZnVuY3Rpb24oZXZlbnRzLCBhcmdzLCBjb250ZXh0KXtcclxuICAgICAgICBsZXQgaSA9IDA7XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IGV2ZW50cy5sZW5ndGg7XHJcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgbGVuZ3RoOyBpICsrKXtcclxuICAgICAgICAgICAgbGV0IGV2ZW50ID0gZXZlbnRzW2ldO1xyXG4gICAgICAgICAgICBldmVudC5saXN0ZW5lci5hcHBseSggKCBldmVudC5jb250ZXh0IHx8IGNvbnRleHQgKSwgYXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0Lm9uID0gZnVuY3Rpb24obmFtZSwgbGlzdGVuZXIsIGNvbnRleHQpe1xyXG4gICAgICAgIChfZXZlbnRzW25hbWVdIHx8IChfZXZlbnRzW25hbWVdPVtdKSApLnB1c2goeyBsaXN0ZW5lcjogbGlzdGVuZXIgICwgY29udGV4dCA6IGNvbnRleHR9KTtcclxuICAgICAgICByZXR1cm4gdGhhdDtcclxuICAgIH07XHJcbiAgICB0aGF0LnRyaWdnZXIgPSBmdW5jdGlvbihuYW1lKXtcclxuICAgICAgICBpZighX2V2ZW50cyl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcclxuICAgICAgICBjb25zdCBldmVudHMgPSBfZXZlbnRzW25hbWVdO1xyXG4gICAgICAgIGNvbnN0IGFsbEV2ZW50cyA9IF9ldmVudHMuYWxsO1xyXG5cclxuICAgICAgICBpZihldmVudHMpe1xyXG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnRzKGV2ZW50cywgYXJncywgdGhhdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGFsbEV2ZW50cyl7XHJcbiAgICAgICAgICAgIHRyaWdnZXJFdmVudHMoYWxsRXZlbnRzLCBhcmd1bWVudHMsIHRoYXQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aGF0Lm9mZiA9IGZ1bmN0aW9uKG5hbWUsIGxpc3RlbmVyLCBjb250ZXh0KXtcclxuICAgICAgICBpZighX2V2ZW50cyl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghbmFtZSAmJiAhbGlzdGVuZXIgJiYgIWNvbnRleHQpICB7XHJcbiAgICAgICAgICAgIF9ldmVudHMgPSBbXTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBuYW1lcyA9IG5hbWUgPyBbbmFtZV0gOiBPYmplY3Qua2V5cyhfZXZlbnRzKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBuYW1lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgbmFtZSA9IG5hbWVzW2ldO1xyXG4gICAgICAgICAgICBjb25zdCBldmVudHMgPSBfZXZlbnRzW25hbWVdO1xyXG4gICAgICAgICAgICBpZiAoZXZlbnRzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXRhaW4gPSBfZXZlbnRzW25hbWVdID0gW107XHJcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIgIHx8IGNvbnRleHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMCwgayA9IGV2ZW50cy5sZW5ndGg7IGogPCBrOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXZlbnQgPSBldmVudHNbal07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgobGlzdGVuZXIgJiYgbGlzdGVuZXIgIT09IGV2ZW50Lmxpc3RlbmVyICYmIGxpc3RlbmVyICE9PSBldmVudC5saXN0ZW5lci5saXN0ZW5lciAgJiYgbGlzdGVuZXIgIT09IGV2ZW50Lmxpc3RlbmVyLl9saXN0ZW5lcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8KGNvbnRleHQgJiYgY29udGV4dCAhPT0gZXZlbnQuY29udGV4dClcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXRhaW4ucHVzaChldmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIXJldGFpbi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgX2V2ZW50c1tuYW1lXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhhdDtcclxuICAgIH07XHJcbiAgICB0aGF0Lm9uY2UgPSBmdW5jdGlvbihuYW1lLCBsaXN0ZW5lciwgY29udGV4dCl7XHJcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICBjb25zdCBvbmNlQ2FsbGJhY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKGNvdW50KyspIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGF0Lm9mZihuYW1lLCBvbmNlQ2FsbGJhY2spO1xyXG4gICAgICAgICAgICBsaXN0ZW5lci5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgb25jZUNhbGxiYWNrLl9saXN0ZW5lciA9IGxpc3RlbmVyO1xyXG4gICAgICAgIHJldHVybiB0aGF0Lm9uKG5hbWUsIG9uY2VDYWxsYmFjaywgY29udGV4dCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFdmVudEVtaXR0ZXI7XHJcbiIsImltcG9ydCBfIGZyb20gJ3V0aWxzL3VuZGVyc2NvcmUnO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIFRoaXMgZXhlY3V0ZXMgdGhlIGlucHV0IGNvbW1hbmRzIGF0IGEgc3BlY2lmaWMgcG9pbnQgaW4gdGltZS5cclxuICogQHBhcmFtICAgaW5zdGFuY2VcclxuICogQHBhcmFtICAgcXVldWVkQ29tbWFuZHNcclxuICogKi9cclxuY29uc3QgTGF6eUNvbW1hbmRFeGVjdXRvciA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgcXVldWVkQ29tbWFuZHMpIHtcclxuICAgIGxldCBjb21tYW5kUXVldWUgPSBbXTtcclxuICAgIGxldCB1bmRlY29yYXRlZE1ldGhvZHMgPSB7fTtcclxuICAgIGxldCBleGVjdXRlTW9kZSA9IGZhbHNlO1xyXG4gICAgbGV0IHRoYXQgPSB7fTtcclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgbG9hZGVkLlwiKTtcclxuICAgIHF1ZXVlZENvbW1hbmRzLmZvckVhY2goKGNvbW1hbmQpID0+IHtcclxuICAgICAgICBjb25zdCBtZXRob2QgPSBpbnN0YW5jZVtjb21tYW5kXTtcclxuICAgICAgICB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF0gPSBtZXRob2QgfHwgZnVuY3Rpb24oKXt9O1xyXG5cclxuICAgICAgICBpbnN0YW5jZVtjb21tYW5kXSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcclxuICAgICAgICAgICAgICBpZiAoIWV4ZWN1dGVNb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAvL2NvbW1hbmRRdWV1ZS5wdXNoKHsgY29tbWFuZCwgYXJncyB9KTtcclxuICAgICAgICAgICAgICAgIHRoYXQuYWRkUXVldWUoY29tbWFuZCwgYXJncylcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGV4ZWN1dGVRdWV1ZWRDb21tYW5kcygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1ldGhvZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZC5hcHBseSh0aGF0LCBhcmdzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxuICAgIHZhciBleGVjdXRlUXVldWVkQ29tbWFuZHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgd2hpbGUgKGNvbW1hbmRRdWV1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgY29tbWFuZCwgYXJncyB9ID0gY29tbWFuZFF1ZXVlLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICh1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF0gfHwgaW5zdGFuY2VbY29tbWFuZF0pLmFwcGx5KGluc3RhbmNlLCBhcmdzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhhdC5zZXRFeGVjdXRlTW9kZSA9IChtb2RlKSA9PiB7XHJcbiAgICAgICAgZXhlY3V0ZU1vZGUgPSBtb2RlO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBzZXRFeGVjdXRlTW9kZSgpXCIsIG1vZGUpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0VW5kZWNvcmF0ZWRNZXRob2RzID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZ2V0VW5kZWNvcmF0ZWRNZXRob2RzKClcIiwgdW5kZWNvcmF0ZWRNZXRob2RzKTtcclxuICAgICAgICByZXR1cm4gdW5kZWNvcmF0ZWRNZXRob2RzO1xyXG4gICAgfVxyXG4gICAgdGhhdC5nZXRRdWV1ZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGdldFF1ZXVlKClcIiwgZ2V0UXVldWUpO1xyXG4gICAgICAgIHJldHVybiBjb21tYW5kUXVldWU7XHJcbiAgICB9XHJcbiAgICB0aGF0LmFkZFF1ZXVlID0gZnVuY3Rpb24oY29tbWFuZCwgYXJncyl7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGFkZFF1ZXVlKClcIiwgY29tbWFuZCwgYXJncyk7XHJcbiAgICAgICAgY29tbWFuZFF1ZXVlLnB1c2goeyBjb21tYW5kLCBhcmdzIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoYXQuZmx1c2ggPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBmbHVzaCgpXCIpO1xyXG4gICAgICAgIGV4ZWN1dGVRdWV1ZWRDb21tYW5kcygpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZW1wdHkgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZW1wdHkoKVwiKTtcclxuICAgICAgICBjb21tYW5kUXVldWUubGVuZ3RoID0gMDtcclxuICAgIH07XHJcbiAgICB0aGF0Lm9mZiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBvZmYoKVwiKTtcclxuICAgICAgICBxdWV1ZWRDb21tYW5kcy5mb3JFYWNoKChjb21tYW5kKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1ldGhvZCA9IHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXTtcclxuICAgICAgICAgICAgaWYgKG1ldGhvZCkge1xyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2VbY29tbWFuZF0gPSBtZXRob2Q7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvL1J1biBvbmNlIGF0IHRoZSBlbmRcclxuICAgIHRoYXQucmVtb3ZlQW5kRXhjdXRlT25jZSA9IGZ1bmN0aW9uKGNvbW1hbmRfKXtcclxuICAgICAgICBsZXQgY29tbWFuZFF1ZXVlSXRlbSA9IF8uZmluZFdoZXJlKGNvbW1hbmRRdWV1ZSwge2NvbW1hbmQgOiBjb21tYW5kX30pO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiByZW1vdmVBbmRFeGN1dGVPbmNlKClcIiwgY29tbWFuZF8pO1xyXG4gICAgICAgIGNvbW1hbmRRdWV1ZS5zcGxpY2UoXy5maW5kSW5kZXgoY29tbWFuZFF1ZXVlLCB7Y29tbWFuZCA6IGNvbW1hbmRffSksIDEpO1xyXG5cclxuICAgICAgICBjb25zdCBtZXRob2QgPSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF9dO1xyXG4gICAgICAgIGlmIChtZXRob2QpIHtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwicmVtb3ZlQ29tbWFuZCgpXCIpO1xyXG4gICAgICAgICAgICBpZihjb21tYW5kUXVldWVJdGVtKXtcclxuICAgICAgICAgICAgICAgIChtZXRob2R8fCBpbnN0YW5jZVtjb21tYW5kX10pLmFwcGx5KGluc3RhbmNlLCBjb21tYW5kUXVldWVJdGVtLmFyZ3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGluc3RhbmNlW2NvbW1hbmRfXSA9IG1ldGhvZDtcclxuICAgICAgICAgICAgZGVsZXRlIHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kX107XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZGVzdHJveSgpXCIpO1xyXG4gICAgICAgIHRoYXQub2ZmKCk7XHJcbiAgICAgICAgdGhhdC5lbXB0eSgpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGF0O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMYXp5Q29tbWFuZEV4ZWN1dG9yOyIsImltcG9ydCB7aXNSdG1wLCBpc1dlYlJUQywgaXNEYXNoLCBpc0hsc30gZnJvbSBcInV0aWxzL3ZhbGlkYXRvclwiO1xyXG5pbXBvcnQge2FuYWxVc2VyQWdlbnR9IGZyb20gXCJ1dGlscy9icm93c2VyXCI7XHJcbi8qKlxyXG4gKiBAYnJpZWYgICBUaGlzIGZpbmRzIHRoZSBwcm92aWRlciB0aGF0IG1hdGNoZXMgdGhlIGlucHV0IHNvdXJjZS5cclxuICogQHBhcmFtXHJcbiAqICovXHJcblxyXG5jb25zdCBTdXBwb3J0Q2hlY2tlciA9IGZ1bmN0aW9uKCl7XHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJTdXBwb3J0Q2hlY2tlciBsb2FkZWQuXCIpO1xyXG4gICAgbGV0IHVzZXJBZ2VudE9iamVjdCA9IGFuYWxVc2VyQWdlbnQoKTtcclxuXHJcbiAgICBjb25zdCBzdXBwb3J0TGlzdCA9IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdodG1sNScsXHJcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgTWltZVR5cGVzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFhYzogJ2F1ZGlvL21wNCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbXA0OiAndmlkZW8vbXA0JyxcclxuICAgICAgICAgICAgICAgICAgICBmNHY6ICd2aWRlby9tcDQnLFxyXG4gICAgICAgICAgICAgICAgICAgIG00djogJ3ZpZGVvL21wNCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbW92OiAndmlkZW8vbXA0JyxcclxuICAgICAgICAgICAgICAgICAgICBtcDM6ICdhdWRpby9tcGVnJyxcclxuICAgICAgICAgICAgICAgICAgICBtcGVnOiAnYXVkaW8vbXBlZycsXHJcbiAgICAgICAgICAgICAgICAgICAgb2d2OiAndmlkZW8vb2dnJyxcclxuICAgICAgICAgICAgICAgICAgICBvZ2c6ICd2aWRlby9vZ2cnLFxyXG4gICAgICAgICAgICAgICAgICAgIG9nYTogJ3ZpZGVvL29nZycsXHJcbiAgICAgICAgICAgICAgICAgICAgdm9yYmlzOiAndmlkZW8vb2dnJyxcclxuICAgICAgICAgICAgICAgICAgICB3ZWJtOiAndmlkZW8vd2VibScsXHJcbiAgICAgICAgICAgICAgICAgICAgZjRhOiAndmlkZW8vYWFjJyxcclxuICAgICAgICAgICAgICAgICAgICBtM3U4OiAnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnLFxyXG4gICAgICAgICAgICAgICAgICAgIG0zdTogJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyxcclxuICAgICAgICAgICAgICAgICAgICBobHM6ICdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCdcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgdmlkZW8gPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpXHJcbiAgICAgICAgICAgICAgICB9KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXZpZGVvLmNhblBsYXlUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gc291cmNlLmZpbGU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc291cmNlLnR5cGU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoIXR5cGUpe3JldHVybiBmYWxzZTt9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtaW1lVHlwZSA9IHNvdXJjZS5taW1lVHlwZSB8fCBNaW1lVHlwZXNbdHlwZV07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoaXNIbHMoZmlsZSwgdHlwZSkgJiYgdXNlckFnZW50T2JqZWN0LmJyb3dzZXIgPT09IFwiTWljcm9zb2Z0IEVkZ2VcIiApe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vRWRnZSBzdXBwb3J0cyBobHMgbmF0aXZlIGJ1dCB0aGF0J3Mgc3Vja3MuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpc1J0bXAoZmlsZSwgdHlwZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoaXNXZWJSVEMoZmlsZSwgdHlwZSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIW1pbWVUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAhIXZpZGVvLmNhblBsYXlUeXBlKG1pbWVUeXBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAnd2VicnRjJyxcclxuICAgICAgICAgICAgY2hlY2tTdXBwb3J0OiBmdW5jdGlvbiAoc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2aWRlbyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJylcclxuICAgICAgICAgICAgICAgIH0oKTtcclxuICAgICAgICAgICAgICAgIGlmICghdmlkZW8uY2FuUGxheVR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNSdG1wKGZpbGUsIHR5cGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihpc1dlYlJUQyhmaWxlLCB0eXBlKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ2Rhc2gnLFxyXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc291cmNlLnR5cGU7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNSdG1wKGZpbGUsIHR5cGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKCB3aW5kb3cuTWVkaWFTb3VyY2UgfHwgd2luZG93LldlYktpdE1lZGlhU291cmNlICkgPT09IFwiZnVuY3Rpb25cIiAmJiBpc0Rhc2goZmlsZSwgdHlwZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAnaGxzJyxcclxuICAgICAgICAgICAgY2hlY2tTdXBwb3J0OiBmdW5jdGlvbiAoc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2aWRlbyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJylcclxuICAgICAgICAgICAgICAgIH0oKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcclxuICAgICAgICAgICAgICAgIGlmIChpc1J0bXAoZmlsZSwgdHlwZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy90aGlzIG1ldGhvZCBmcm9tIGhscy5qc1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXNIbHNTdXBwb3J0ID0gKCkgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGdldE1lZGlhU291cmNlKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuTWVkaWFTb3VyY2UgfHwgd2luZG93LldlYktpdE1lZGlhU291cmNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtZWRpYVNvdXJjZSA9IGdldE1lZGlhU291cmNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNvdXJjZUJ1ZmZlciA9IHdpbmRvdy5Tb3VyY2VCdWZmZXIgfHwgd2luZG93LldlYktpdFNvdXJjZUJ1ZmZlcjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaXNUeXBlU3VwcG9ydGVkID0gbWVkaWFTb3VyY2UgJiYgdHlwZW9mIG1lZGlhU291cmNlLmlzVHlwZVN1cHBvcnRlZCA9PT0gJ2Z1bmN0aW9uJyAmJiBtZWRpYVNvdXJjZS5pc1R5cGVTdXBwb3J0ZWQoJ3ZpZGVvL21wNDsgY29kZWNzPVwiYXZjMS40MkUwMUUsbXA0YS40MC4yXCInKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgU291cmNlQnVmZmVyIGlzIGV4cG9zZWQgZW5zdXJlIGl0cyBBUEkgaXMgdmFsaWRcclxuICAgICAgICAgICAgICAgICAgICAvLyBzYWZhcmkgYW5kIG9sZCB2ZXJzaW9uIG9mIENocm9tZSBkb2Ugbm90IGV4cG9zZSBTb3VyY2VCdWZmZXIgZ2xvYmFsbHkgc28gY2hlY2tpbmcgU291cmNlQnVmZmVyLnByb3RvdHlwZSBpcyBpbXBvc3NpYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNvdXJjZUJ1ZmZlclZhbGlkQVBJID0gIXNvdXJjZUJ1ZmZlciB8fCBzb3VyY2VCdWZmZXIucHJvdG90eXBlICYmIHR5cGVvZiBzb3VyY2VCdWZmZXIucHJvdG90eXBlLmFwcGVuZEJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygc291cmNlQnVmZmVyLnByb3RvdHlwZS5yZW1vdmUgPT09ICdmdW5jdGlvbic7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEhaXNUeXBlU3VwcG9ydGVkICYmICEhc291cmNlQnVmZmVyVmFsaWRBUEk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgLy9SZW1vdmUgdGhpcyAnISF2aWRlby5jYW5QbGF5VHlwZSgnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnKScgaWYgeW91IHdhbnQgdG8gdXNlIGhsc2pzLlxyXG4gICAgICAgICAgICAgICAgLy9ZZXMgSSBuZWVkIGhsc2pzLiAyMDE5LTA2LTEyICYmICEhdmlkZW8uY2FuUGxheVR5cGUoJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNIbHNTdXBwb3J0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ3J0bXAnLFxyXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHRlc3RGbGFzaCgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1cHBvcnQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9JRSBvbmx5XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoXCJBY3RpdmVYT2JqZWN0XCIgaW4gd2luZG93KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdXBwb3J0ID0gISEobmV3IEFjdGl2ZVhPYmplY3QoXCJTaG9ja3dhdmVGbGFzaC5TaG9ja3dhdmVGbGFzaFwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1jYXRjaChlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1cHBvcnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9XM0MsIGJldHRlciBzdXBwb3J0IGluIGxlZ2FjeSBicm93c2VyXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1cHBvcnQgPSAhIW5hdmlnYXRvci5taW1lVHlwZXNbJ2FwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoJ107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1cHBvcnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gY2hlY2tTdXBwb3J0KCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodXNlckFnZW50T2JqZWN0LmJyb3dzZXIgPT09IFwiTWljcm9zb2Z0IEVkZ2VcIiB8fCB1c2VyQWdlbnRPYmplY3Qub3MgPT09IFwiQW5kcm9pZFwiIHx8IHVzZXJBZ2VudE9iamVjdC5vcyA9PT0gXCJpT1NcIiAgfHwgdXNlckFnZW50T2JqZWN0LmJyb3dzZXIgPT09IFwiU2FmYXJpXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpc1J0bXAoZmlsZSwgdHlwZSkgJiYgdGVzdEZsYXNoKCkgJiYgY2hlY2tTdXBwb3J0KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIF07XHJcblxyXG4gICAgdGhhdC5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UgPSAoc29ydWNlXykgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlN1cHBvcnRDaGVja2VyIDogZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKClcIiwgc29ydWNlXyk7XHJcbiAgICAgICAgY29uc3Qgc291cmNlID0gKHNvcnVjZV8gPT09IE9iamVjdChzb3J1Y2VfKSkgPyBzb3J1Y2VfIDoge307XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHN1cHBvcnRMaXN0Lmxlbmd0aDsgaSArKyl7XHJcbiAgICAgICAgICAgIGlmKHN1cHBvcnRMaXN0W2ldLmNoZWNrU3VwcG9ydChzb3VyY2UpKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdXBwb3J0TGlzdFtpXS5uYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoYXQuZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0ID0gKHBsYXlsaXN0SXRlbSkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlN1cHBvcnRDaGVja2VyIDogZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0KClcIiwgcGxheWxpc3RJdGVtKTtcclxuICAgICAgICBsZXQgc3VwcG9ydE5hbWVzID0gW107XHJcbiAgICAgICAgLypmb3IgKGxldCBpID0gcGxheWxpc3RfLmxlbmd0aDsgaS0tOykge1xyXG5cclxuXHJcbiAgICAgICAgfSovXHJcbiAgICAgICAgY29uc3QgaXRlbSA9IHBsYXlsaXN0SXRlbTtcclxuXHJcbiAgICAgICAgaWYoaXRlbSAmJiBpdGVtLnNvdXJjZXMpe1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgaXRlbS5zb3VyY2VzLmxlbmd0aDsgaiArKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgc291cmNlID0gaXRlbS5zb3VyY2VzW2pdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1cHBvcnRlZCA9IHRoYXQuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKHNvdXJjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1cHBvcnRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdXBwb3J0TmFtZXMucHVzaChzdXBwb3J0ZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHN1cHBvcnROYW1lcztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3VwcG9ydENoZWNrZXI7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gNC4uXHJcbiAqL1xyXG5pbXBvcnQgU3J0UGFyc2VyIGZyb20gXCJhcGkvY2FwdGlvbi9wYXJzZXIvU3J0UGFyc2VyXCI7XHJcbmltcG9ydCBWVFRDdWUgZnJvbSBcInV0aWxzL2NhcHRpb25zL3Z0dEN1ZVwiO1xyXG4vL2ltcG9ydCBSZXF1ZXN0IGZyb20gXCJ1dGlscy9kb3dubG9hZGVyXCI7XHJcblxyXG5jb25zdCBMb2FkZXIgPSBmdW5jdGlvbigpe1xyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG5cclxuICAgIGNvbnN0IGNvbnZlcnRUb1ZUVEN1ZXMgPSBmdW5jdGlvbiAoY3Vlcykge1xyXG4gICAgICAgIHJldHVybiBjdWVzLm1hcChjdWUgPT4gbmV3IFZUVEN1ZShjdWUuc3RhcnQsIGN1ZS5lbmQsIGN1ZS50ZXh0KSk7XHJcbiAgICB9XHJcbiAgICAvL2xhbmd1YWdlIDogZm9yIFNNSSBmb3JtYXQuXHJcbiAgICB0aGF0LmxvYWQgPSAodHJhY2ssIGxhbmd1YWdlLCBzdWNjZXNzQ2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spID0+IHtcclxuXHJcbiAgICAgICAgdmFyIHJlcXVlc3RPcHRpb25zICA9IHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICB1cmwgOiB0cmFjay5maWxlLFxyXG4gICAgICAgICAgICBlbmNvZGluZzogbnVsbFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxvYWRSZXF1ZXN0RG93bmxvZGVyKCkudGhlbihSZXF1ZXN0ID0+IHtcclxuICAgICAgICAgICAgUmVxdWVzdChyZXF1ZXN0T3B0aW9ucywgZnVuY3Rpb24oZXJyb3IsIHJlc3BvbnNlLCBib2R5KSB7XHJcbiAgICAgICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JDYWxsYmFjayhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY3VlcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2dHRDdWVzID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChib2R5LmluZGV4T2YoJ1dFQlZUVCcpID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiV0VCVlRUIExPQURFRFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9hZFZ0dFBhcnNlcigpLnRoZW4oV2ViVlRUID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwYXJzZXIgPSBuZXcgV2ViVlRULlBhcnNlcih3aW5kb3csIFdlYlZUVC5TdHJpbmdEZWNvZGVyKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdnR0Q3VlcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VyLm9uY3VlID0gZnVuY3Rpb24oY3VlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdnR0Q3Vlcy5wdXNoKGN1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VyLm9uZmx1c2ggPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2RlbGV0ZSB0cmFjay54aHI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc0NhbGxiYWNrKHZ0dEN1ZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBhcnNlIGNhbGxzIG9uZmx1c2ggaW50ZXJuYWxseVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VyLnBhcnNlKGJvZHkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2RlbGV0ZSB0cmFjay54aHI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvckNhbGxiYWNrKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoYm9keS5pbmRleE9mKCdTQU1JJykgPj0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlNBTUkgTE9BREVEXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkU21pUGFyc2VyKCkudGhlbihTbWlQYXJzZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBhcnNlZERhdGEgPSBTbWlQYXJzZXIoYm9keSwge2ZpeGVkTGFuZyA6IGxhbmd1YWdlfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2dHRDdWVzID0gY29udmVydFRvVlRUQ3VlcyhwYXJzZWREYXRhLnJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzQ2FsbGJhY2sodnR0Q3Vlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVsZXRlIHRyYWNrLnhocjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yQ2FsbGJhY2soZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJTUlQgTE9BREVEXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdWVzID0gU3J0UGFyc2VyKGJvZHkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2dHRDdWVzID0gY29udmVydFRvVlRUQ3VlcyhjdWVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc0NhbGxiYWNrKHZ0dEN1ZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgLy9kZWxldGUgdHJhY2sueGhyO1xyXG4gICAgICAgICAgICBlcnJvckNhbGxiYWNrKGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcbmZ1bmN0aW9uIGxvYWRSZXF1ZXN0RG93bmxvZGVyKCl7XHJcbiAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWyd1dGlscy9kb3dubG9hZGVyJ10sIGZ1bmN0aW9uIChyZXF1aXJlKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlcXVpcmUoJ3V0aWxzL2Rvd25sb2FkZXInKS5kZWZhdWx0O1xyXG4gICAgfSwgZnVuY3Rpb24oZXJyKXtjb25zb2xlLmxvZyhlcnIpO30sICdkb3dubG9hZGVyJyk7XHJcbn07XHJcbmZ1bmN0aW9uIGxvYWRWdHRQYXJzZXIoKSB7XHJcbiAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvY2FwdGlvbi9wYXJzZXIvVnR0UGFyc2VyJ10sIGZ1bmN0aW9uIChyZXF1aXJlKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlcXVpcmUoJ2FwaS9jYXB0aW9uL3BhcnNlci9WdHRQYXJzZXInKS5kZWZhdWx0O1xyXG4gICAgfSwgZnVuY3Rpb24oZXJyKXtjb25zb2xlLmxvZyhlcnIpO30sICd2dHRwYXJzZXInKTtcclxufVxyXG5mdW5jdGlvbiBsb2FkU21pUGFyc2VyKCkge1xyXG4gICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL2NhcHRpb24vcGFyc2VyL1NtaVBhcnNlciddLCBmdW5jdGlvbiAocmVxdWlyZSkge1xyXG4gICAgICAgIHJldHVybiByZXF1aXJlKCdhcGkvY2FwdGlvbi9wYXJzZXIvU21pUGFyc2VyJykuZGVmYXVsdDtcclxuICAgIH0sIGZ1bmN0aW9uKGVycil7Y29uc29sZS5sb2coZXJyKTt9LCAnc21pcGFyc2VyJyk7XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgTG9hZGVyO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDUuIDE3Li5cclxuICovXHJcbmltcG9ydCBDYXB0aW9uTG9hZGVyIGZyb20gJ2FwaS9jYXB0aW9uL0xvYWRlcic7XHJcbmltcG9ydCB7UkVBRFksIEVSUk9SUywgRVJST1IsIFBMQVlFUl9DQVBUSU9OX0VSUk9SLCBDT05URU5UX01FVEEsIENPTlRFTlRfVElNRSwgQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VELCBDT05URU5UX0NBUFRJT05fQ0hBTkdFRH0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcclxuXHJcbmNvbnN0IGlzU3VwcG9ydCA9IGZ1bmN0aW9uKGtpbmQpe1xyXG4gICAgcmV0dXJuIGtpbmQgPT09ICdzdWJ0aXRsZXMnIHx8IGtpbmQgPT09ICdjYXB0aW9ucyc7XHJcbn07XHJcblxyXG5jb25zdCBNYW5hZ2VyID0gZnVuY3Rpb24oYXBpLCBwbGF5bGlzdEluZGV4KXtcclxuXHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICBsZXQgY2FwdGlvbkxpc3QgPSBbXTtcclxuICAgIGxldCBjdXJyZW50Q2FwdGlvbkluZGV4ID0gLTE7XHJcblxyXG4gICAgbGV0IGNhcHRpb25Mb2FkZXIgPSBDYXB0aW9uTG9hZGVyKCk7XHJcbiAgICBsZXQgaXNGaXNydExvYWQgPSB0cnVlO1xyXG4gICAgbGV0IGlzU2hvd2luZyA9IGZhbHNlO1xyXG5cclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNhcHRpb24gTWFuYWdlciA+PiBcIiwgcGxheWxpc3RJbmRleCk7XHJcblxyXG5cclxuICAgIGxldCBiaW5kVHJhY2sgPSBmdW5jdGlvbih0cmFjaywgdnR0Q3Vlcyl7XHJcbiAgICAgICAgdHJhY2suZGF0YSA9IHZ0dEN1ZXMgfHwgW107XHJcbiAgICAgICAgdHJhY2submFtZSA9IHRyYWNrLmxhYmVsIHx8IHRyYWNrLm5hbWUgfHwgdHJhY2subGFuZ3VhZ2U7XHJcbiAgICAgICAgdHJhY2suaWQgPSAoZnVuY3Rpb24odHJhY2ssIHRyYWNrc0NvdW50KSB7XHJcbiAgICAgICAgICAgIHZhciB0cmFja0lkO1xyXG4gICAgICAgICAgICB2YXIgcHJlZml4ID0gdHJhY2sua2luZCB8fCAnY2MnO1xyXG4gICAgICAgICAgICBpZiAodHJhY2suZGVmYXVsdCB8fCB0cmFjay5kZWZhdWx0dHJhY2spIHtcclxuICAgICAgICAgICAgICAgIHRyYWNrSWQgPSAnZGVmYXVsdCc7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHJhY2tJZCA9IHRyYWNrLmlkIHx8IChwcmVmaXggKyB0cmFja3NDb3VudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoaXNGaXNydExvYWQpe1xyXG4gICAgICAgICAgICAgICAgLy9UaGlzIGV4ZWN1dGUgb25seSBvbi4gYW5kIHRoZW4gdXNlIGZsdXNoQ2FwdGlvbkxpc3QobGFzdENhcHRpb25JbmRleCk7XHJcbiAgICAgICAgICAgICAgICBjaGFuZ2VDdXJyZW50Q2FwdGlvbihjYXB0aW9uTGlzdC5sZW5ndGh8fDApO1xyXG4gICAgICAgICAgICAgICAgaXNGaXNydExvYWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRyYWNrSWQ7XHJcbiAgICAgICAgfSkodHJhY2ssIGNhcHRpb25MaXN0Lmxlbmd0aCk7XHJcblxyXG4gICAgICAgIGNhcHRpb25MaXN0LnB1c2godHJhY2spO1xyXG4gICAgICAgIHJldHVybiB0cmFjay5pZDtcclxuICAgIH07XHJcbiAgICBsZXQgY2hhbmdlQ3VycmVudENhcHRpb24gPSBmdW5jdGlvbihpbmRleCl7XHJcbiAgICAgICAgY3VycmVudENhcHRpb25JbmRleCA9IGluZGV4O1xyXG4gICAgICAgIGFwaS50cmlnZ2VyKENPTlRFTlRfQ0FQVElPTl9DSEFOR0VELCBjdXJyZW50Q2FwdGlvbkluZGV4KTtcclxuICAgIH07XHJcbiAgICBpZihhcGkuZ2V0Q29uZmlnKCkucGxheWxpc3QgJiYgYXBpLmdldENvbmZpZygpLnBsYXlsaXN0Lmxlbmd0aCA+IDApe1xyXG4gICAgICAgIGxldCBwbGF5bGlzdCA9IGFwaS5nZXRDb25maWcoKS5wbGF5bGlzdFtwbGF5bGlzdEluZGV4XTtcclxuXHJcbiAgICAgICAgaWYocGxheWxpc3QgJiYgcGxheWxpc3QudHJhY2tzICYmIHBsYXlsaXN0LnRyYWNrcy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHBsYXlsaXN0LnRyYWNrcy5sZW5ndGg7IGkgKyspe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHJhY2sgPSBwbGF5bGlzdC50cmFja3NbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoaXNTdXBwb3J0KHRyYWNrLmtpbmQpICYmICEgXy5maW5kV2hlcmUodHJhY2ssIHtmaWxlIDogdHJhY2suZmlsZX0pKXtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoYXQuZmx1c2hDYXB0aW9uTGlzdChjdXJyZW50Q2FwdGlvbkluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uTG9hZGVyLmxvYWQodHJhY2ssIHRyYWNrLmxhbmcsIGZ1bmN0aW9uKHZ0dEN1ZXMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih2dHRDdWVzICYmIHZ0dEN1ZXMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2FwdGlvbklkID0gYmluZFRyYWNrKHRyYWNrLCB2dHRDdWVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfQ0FQVElPTl9FUlJPUl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcGkudHJpZ2dlcihFUlJPUiwgdGVtcEVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXBpLm9uKENPTlRFTlRfVElNRSwgZnVuY3Rpb24obWV0YSl7XHJcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gbWV0YS5wb3NpdGlvbjtcclxuICAgICAgICBpZihjdXJyZW50Q2FwdGlvbkluZGV4ID4gLTEgJiYgY2FwdGlvbkxpc3RbY3VycmVudENhcHRpb25JbmRleF0pe1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudEN1ZXMgPSBfLmZpbHRlcihjYXB0aW9uTGlzdFtjdXJyZW50Q2FwdGlvbkluZGV4XS5kYXRhLCBmdW5jdGlvbiAoY3VlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9zaXRpb24gPj0gKGN1ZS5zdGFydFRpbWUpICYmICggKCFjdWUuZW5kVGltZSB8fCBwb3NpdGlvbikgPD0gY3VlLmVuZFRpbWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYoY3VycmVudEN1ZXMgJiYgY3VycmVudEN1ZXMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICBhcGkudHJpZ2dlcihDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQsIGN1cnJlbnRDdWVzWzBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuICAgIHRoYXQuZmx1c2hDYXB0aW9uTGlzdCA9IChsYXN0Q2FwdGlvbkluZGV4KSA9PntcclxuICAgICAgICBjYXB0aW9uTGlzdCA9IFtdO1xyXG4gICAgICAgIGNoYW5nZUN1cnJlbnRDYXB0aW9uKGxhc3RDYXB0aW9uSW5kZXgpO1xyXG4gICAgICAgIC8vY3VycmVudENhcHRpb25JbmRleCA9IGxhc3RDYXB0aW9uSW5kZXg7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRDYXB0aW9uTGlzdCA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBjYXB0aW9uTGlzdHx8W107XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRDdXJyZW50Q2FwdGlvbiA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50Q2FwdGlvbkluZGV4O1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Q3VycmVudENhcHRpb24gPSAoX2luZGV4KSA9PntcclxuICAgICAgICBpZihfaW5kZXggPiAtMiAmJiBfaW5kZXggPCBjYXB0aW9uTGlzdC5sZW5ndGgpe1xyXG4gICAgICAgICAgICBjaGFuZ2VDdXJyZW50Q2FwdGlvbihfaW5kZXgpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhhdC5hZGRDYXB0aW9uID0gKHRyYWNrKSA9PntcclxuICAgICAgICBpZihpc1N1cHBvcnQodHJhY2sua2luZCkgJiYgISBfLmZpbmRXaGVyZShjYXB0aW9uTG9hZGVyLCB7ZmlsZSA6IHRyYWNrLmZpbGV9KSl7XHJcbiAgICAgICAgICAgIGNhcHRpb25Mb2FkZXIubG9hZCh0cmFjaywgZnVuY3Rpb24odnR0Q3Vlcyl7XHJcbiAgICAgICAgICAgICAgICBpZih2dHRDdWVzICYmIHZ0dEN1ZXMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgYmluZFRyYWNrKHRyYWNrLCB2dHRDdWVzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IGVycm9yc1tQTEFZRVJfQ0FQVElPTl9FUlJPUl07XHJcbiAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgIGFwaS50cmlnZ2VyKEVSUk9SLCB0ZW1wRXJyb3IpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhhdC5yZW1vdmVDYXB0aW9uID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgaWYoaW5kZXggPiAtMSAmJiBpbmRleCA8IGNhcHRpb25MaXN0Lmxlbmd0aCl7XHJcbiAgICAgICAgICAgIGNhcHRpb25MaXN0LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIHJldHVybiBjYXB0aW9uTGlzdDtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+IHtcclxuICAgICAgICBjYXB0aW9uTGlzdCA9IFtdO1xyXG4gICAgICAgIGNhcHRpb25Mb2FkZXIgPSBudWxsO1xyXG4gICAgICAgIGFwaS5vZmYoQ09OVEVOVF9USU1FLCBudWxsLCB0aGF0KTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYW5hZ2VyO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDUuIDI5Li5cclxuICovXHJcbmltcG9ydCB7IGhtc1RvU2Vjb25kLCB0cmltIH0gZnJvbSBcInV0aWxzL3N0cmluZ3NcIlxyXG5cclxuZnVuY3Rpb24gX2VudHJ5KGRhdGEpIHtcclxuICAgIHZhciBlbnRyeSA9IHt9O1xyXG4gICAgdmFyIGFycmF5ID0gZGF0YS5zcGxpdCgnXFxyXFxuJyk7XHJcbiAgICBpZiAoYXJyYXkubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgYXJyYXkgPSBkYXRhLnNwbGl0KCdcXG4nKTtcclxuICAgIH1cclxuICAgIHZhciBpZHggPSAxO1xyXG4gICAgaWYgKGFycmF5WzBdLmluZGV4T2YoJyAtLT4gJykgPiAwKSB7XHJcbiAgICAgICAgaWR4ID0gMDtcclxuICAgIH1cclxuICAgIGlmIChhcnJheS5sZW5ndGggPiBpZHggKyAxICYmIGFycmF5W2lkeCArIDFdKSB7XHJcbiAgICAgICAgLy8gVGhpcyBsaW5lIGNvbnRhaW5zIHRoZSBzdGFydCBhbmQgZW5kLlxyXG4gICAgICAgIHZhciBsaW5lID0gYXJyYXlbaWR4XTtcclxuICAgICAgICB2YXIgaW5kZXggPSBsaW5lLmluZGV4T2YoJyAtLT4gJyk7XHJcbiAgICAgICAgaWYgKGluZGV4ID4gMCkge1xyXG4gICAgICAgICAgICBlbnRyeS5zdGFydCA9IGhtc1RvU2Vjb25kKGxpbmUuc3Vic3RyKDAsIGluZGV4KSk7XHJcbiAgICAgICAgICAgIGVudHJ5LmVuZCA9IGhtc1RvU2Vjb25kKGxpbmUuc3Vic3RyKGluZGV4ICsgNSkpO1xyXG4gICAgICAgICAgICBlbnRyeS50ZXh0ID0gYXJyYXkuc2xpY2UoaWR4ICsgMSkuam9pbignXFxyXFxuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVudHJ5O1xyXG5cclxufVxyXG5cclxuY29uc3QgU3J0UGFyc2VyID0gZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgdmFyIGNhcHRpb25zID0gW107XHJcblxyXG4gICAgZGF0YSA9IHRyaW0oZGF0YSk7XHJcblxyXG4gICAgdmFyIGxpc3QgPSBkYXRhLnNwbGl0KCdcXHJcXG5cXHJcXG4nKTtcclxuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgIGxpc3QgPSBkYXRhLnNwbGl0KCdcXG5cXG4nKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChsaXN0W2ldID09PSAnV0VCVlRUJykge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGVudHJ5ID0gX2VudHJ5KGxpc3RbaV0pO1xyXG4gICAgICAgIGlmIChlbnRyeS50ZXh0KSB7XHJcbiAgICAgICAgICAgIGNhcHRpb25zLnB1c2goZW50cnkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY2FwdGlvbnM7XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3J0UGFyc2VyOyIsIi8vIFNUQVRFXHJcbmV4cG9ydCBjb25zdCBTVEFURV9CVUZGRVJJTkcgPSBcImJ1ZmZlcmluZ1wiO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfSURMRSA9IFwiaWRsZVwiO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfQ09NUExFVEUgPSBcImNvbXBsZXRlXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9QQVVTRUQgPSBcInBhdXNlZFwiO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfUExBWUlORyA9IFwicGxheWluZ1wiO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfRVJST1IgPSBcImVycm9yXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9MT0FESU5HID0gXCJsb2FkaW5nXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9TVEFMTEVEID0gXCJzdGFsbGVkXCI7XHJcblxyXG5leHBvcnQgY29uc3QgU1RBVEVfQURfTE9BRElORyA9IFwiYWRMb2FkaW5nXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9BRF9MT0FERUQgPSBcImFkTG9hZGVkXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9BRF9QTEFZSU5HID0gXCJhZFBsYXlpbmdcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0FEX1BBVVNFRCA9IFwiYWRQYXVzZWRcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0FEX0NPTVBMRVRFID0gXCJhZENvbXBsZXRlXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9BRF9FUlJPUiA9IFwiYWRFcnJvclwiO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX0FEX0NMSUNLID0gXCJhZGNsaWNrXCI7XHJcblxyXG4vLyBQUk9WSURFUlxyXG5leHBvcnQgY29uc3QgUFJPVklERVJfSFRNTDUgPSBcImh0bWw1XCI7XHJcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9XRUJSVEMgPSBcIndlYnJ0Y1wiO1xyXG5leHBvcnQgY29uc3QgUFJPVklERVJfREFTSCA9IFwiZGFzaFwiO1xyXG5leHBvcnQgY29uc3QgUFJPVklERVJfSExTID0gXCJobHNcIjtcclxuZXhwb3J0IGNvbnN0IFBST1ZJREVSX1JUTVAgPSBcInJ0bXBcIjtcclxuXHJcbi8vIEVWRU5UU1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9DT01QTEVURSA9IFNUQVRFX0NPTVBMRVRFO1xyXG5leHBvcnQgY29uc3QgUkVBRFkgPSBcInJlYWR5XCI7XHJcbmV4cG9ydCBjb25zdCBERVNUUk9ZID0gXCJkZXN0cm95XCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX1NFRUsgPSBcInNlZWtcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfQlVGRkVSX0ZVTEwgPSBcImJ1ZmZlckZ1bGxcIjtcclxuZXhwb3J0IGNvbnN0IERJU1BMQVlfQ0xJQ0sgPSBcImRpc3BsYXlDbGlja1wiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9MT0FERUQgPSBcImxvYWRlZFwiO1xyXG5leHBvcnQgY29uc3QgUExBWUxJU1RfQ0hBTkdFRCA9IFwicGxheWxpc3RDaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX1NFRUtFRCA9IFwic2Vla2VkXCI7XHJcbmV4cG9ydCBjb25zdCBBTExfUExBWUxJU1RfRU5ERUQgPSBcImFsbFBsYXlsaXN0RW5kZWRcIjtcclxuZXhwb3J0IGNvbnN0IE5FVFdPUktfVU5TVEFCTEVEID0gXCJ1bnN0YWJsZU5ldHdvcmtcIjtcclxuZXhwb3J0IGNvbnN0IERBU0hfUFJFUEFSRUQgPSBcImRhc2hQcmVwYXJlZFwiO1xyXG5leHBvcnQgY29uc3QgREFTSF9ERVNUUk9ZRUQgPSBcImRhc2hEZXN0cm95ZWRcIjtcclxuXHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IEVSUk9SID0gXCJlcnJvclwiO1xyXG5cclxuLy8gU1RBVEUgT0YgUExBWUVSXHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfU1RBVEUgPSBcInN0YXRlQ2hhbmdlZFwiO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX0NPTVBMRVRFID0gU1RBVEVfQ09NUExFVEU7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfUEFVU0UgPSBcInBhdXNlXCI7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfUExBWSA9IFwicGxheVwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9DTElDS0VEID0gXCJjbGlja2VkXCI7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfUkVTSVpFRCA9IFwicmVzaXplZFwiO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX0xPQURJTkcgPSBcImxvYWRpbmdcIjtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9GVUxMU0NSRUVOX1JFUVVFU1QgPSBcImZ1bGxzY3JlZW5SZXF1ZXN0ZWRcIjtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9GVUxMU0NSRUVOX0NIQU5HRUQgPSBcImZ1bGxzY3JlZW5DaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0FSTklORyA9IFwid2FybmluZ1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IEFEX0NIQU5HRUQgPSBcImFkQ2hhbmdlZFwiO1xyXG5leHBvcnQgY29uc3QgQURfVElNRSA9IFwiYWRUaW1lXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0JVRkZFUiA9IFwiYnVmZmVyQ2hhbmdlZFwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9USU1FID0gXCJ0aW1lXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX1JBVEVfQ0hBTkdFID0gXCJyYXRlY2hhbmdlXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX1ZPTFVNRSA9IFwidm9sdW1lQ2hhbmdlZFwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9NVVRFID0gXCJtdXRlXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX01FVEEgPSBcIm1ldGFDaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX1NPVVJDRV9DSEFOR0VEID0gXCJzb3VyY2VDaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0xFVkVMX0NIQU5HRUQgPSBcInF1YWxpdHlMZXZlbENoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfRFVSQVRJT05fQ0hBTkdFRCA9IFwiZHVyYXRpb25DaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBQTEFZQkFDS19SQVRFX0NIQU5HRUQgPSBcInBsYXliYWNrUmF0ZUNoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfQ0FQVElPTl9DVUVfQ0hBTkdFRCA9IFwiY3VlQ2hhbmdlZFwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9DQVBUSU9OX0NIQU5HRUQgPSBcImNhcHRpb25DaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX1RJTUVfTU9ERV9DSEFOR0VEID0gXCJ0aW1lRGlzcGxheU1vZGVDaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBPTUVfUDJQX01PREUgPSBcInAycE1vZGVcIjtcclxuXHJcblxyXG5leHBvcnQgY29uc3QgQURfQ0xJRU5UX0dPT0dMRUlNQSA9IFwiZ29vZ2xlaW1hXCI7XHJcbmV4cG9ydCBjb25zdCBBRF9DTElFTlRfVkFTVCA9IFwidmFzdFwiO1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBJTklUX1VOS05XT05fRVJST1IgPSAxMDA7XHJcbmV4cG9ydCBjb25zdCBJTklUX1VOU1VQUE9SVF9FUlJPUiA9IDEwMTtcclxuZXhwb3J0IGNvbnN0IElOSVRfUlRNUF9TRVRVUF9FUlJPUiA9IDEwMjtcclxuZXhwb3J0IGNvbnN0IElOSVRfREFTSF9VTlNVUFBPUlQgPSAxMDM7XHJcbmV4cG9ydCBjb25zdCBJTklUX0FEU19FUlJPUiA9IDEwNDtcclxuZXhwb3J0IGNvbnN0IElOSVRfREFTSF9OT1RGT1VORCA9IDEwNTtcclxuZXhwb3J0IGNvbnN0IElOSVRfSExTSlNfTk9URk9VTkQgPSAxMDY7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfVU5LTldPTl9FUlJPUiA9IDMwMDtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUiA9IDMwMTtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX05FVFdPUktfRVJST1IgPSAzMDI7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IgPSAzMDM7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfRklMRV9FUlJPUiA9IDMwNDtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9DQVBUSU9OX0VSUk9SID0gMzA1O1xyXG5leHBvcnQgY29uc3QgUExBWUVSX0JBRF9SRVFVRVNUX0VSUk9SID0gMzA2O1xyXG5leHBvcnQgY29uc3QgUExBWUVSX0FVVEhfRkFJTEVEX0VSUk9SID0gMzA3O1xyXG5leHBvcnQgY29uc3QgUExBWUVSX05PVF9BQ0NFUFRBQkxFX0VSUk9SID0gMzA4O1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19XU19FUlJPUiA9IDUwMTtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUiA9IDUwMjtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SID0gNTAzO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19DUkVBVEVfQU5TV0VSX0VSUk9SID0gNTA0O1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUiA9IDUwNTtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfTkVUV09SS19TTE9XID0gNTEwO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19VTkVYUEVDVEVEX0RJU0NPTk5FQ1QgPSA1MTE7XHJcblxyXG5leHBvcnQgY29uc3QgV0FSTl9NU0dfTVVURURQTEFZID0gXCJQbGVhc2UgdG91Y2ggaGVyZSB0byB0dXJuIG9uIHRoZSBzb3VuZC5cIjtcclxuXHJcblxyXG5leHBvcnQgY29uc3QgVUlfSUNPTlMgPSB7XHJcbiAgICB2b2x1bWVfbXV0ZSA6IFwidm9sdW1lLW11dGVcIixcclxuICAgIG9wX3dhcm5pbmcgOiBcIm9wLXdhcm5pbmdcIlxyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBFUlJPUlMgPSB7Y29kZXMgOiBcIlwifTtcclxuXHJcblxyXG5leHBvcnQgY29uc3QgU1lTVEVNX1RFWFQgPSBbXHJcbiAgICB7XHJcbiAgICAgICAgXCJsYW5nXCIgOiBcImVuXCIsXHJcbiAgICAgICAgXCJ1aVwiIDoge1xyXG4gICAgICAgICAgICBcImNvbnRleHRcIiA6IFwiQWJvdXQgT3ZlblBsYXllclwiLFxyXG4gICAgICAgICAgICBcImNvbnRyb2xzXCIgOiB7XHJcbiAgICAgICAgICAgICAgICBcImxpdmVcIiA6IFwiTGl2ZSBTdHJlYW1pbmdcIixcclxuICAgICAgICAgICAgICAgIFwibG93X2xhdGVuY3lfbGl2ZVwiIDogXCJTdWItU2Vjb25kIExhdGVuY3kgU3RyZWFtaW5nXCIsXHJcbiAgICAgICAgICAgICAgICBcImxvd19sYXRlbmN5X3AycFwiIDogXCJTdWItU2Vjb25kIExhdGVuY3kgUDJQXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicGxheWxpc3RcIiA6IFwiUGxheWxpc3RcIixcclxuICAgICAgICAgICAgXCJzZXR0aW5nXCIgOiB7XHJcbiAgICAgICAgICAgICAgICBcInRpdGxlXCIgOiBcIlNldHRpbmdzXCIsXHJcbiAgICAgICAgICAgICAgICBcInNwZWVkXCIgOiBcIlNwZWVkXCIsXHJcbiAgICAgICAgICAgICAgICBcInNwZWVkVW5pdFwiIDogXCJ4XCIsXHJcbiAgICAgICAgICAgICAgICBcInNvdXJjZVwiIDogXCJTb3VyY2VcIixcclxuICAgICAgICAgICAgICAgIFwicXVhbGl0eVwiIDogXCJRdWFsaXR5XCIsXHJcbiAgICAgICAgICAgICAgICBcImNhcHRpb25cIiA6IFwiQ2FwdGlvblwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNwbGF5XCIgOiBcIkRpc3BsYXlcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImFwaVwiIDoge1xyXG4gICAgICAgICAgICBcIm1lc3NhZ2VcIiA6IHtcclxuICAgICAgICAgICAgICAgIFwibXV0ZWRfcGxheVwiIDogXCJQbGVhc2UgdG91Y2ggaGVyZSB0byB0dXJuIG9uIHRoZSBzb3VuZC5cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImVycm9yXCI6IHtcclxuICAgICAgICAgICAgICAgIDEwMDoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiQ2FuIG5vdCBsb2FkIGR1ZSB0byB1bmtub3duIHJlYXNvbnMuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJDYW4gbm90IGxvYWQgZHVlIHRvIHVua25vd24gcmVhc29ucy5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDEwMToge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAxMDEsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiQ2FuIG5vdCBsb2FkIGR1ZSB0byBwbGF5YWJsZSBtZWRpYSBub3QgZm91bmQuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJDYW4gbm90IGxvYWQgZHVlIHRvIHBsYXlhYmxlIG1lZGlhIG5vdCBmb3VuZC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDEwMjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAxMDIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiRmxhc2ggZmV0Y2hpbmcgcHJvY2VzcyBhYm9ydGVkLiA8L2JyPjxhIGhyZWY9J2h0dHA6Ly93d3cuYWRvYmUuY29tL2dvL2dldGZsYXNocGxheWVyJyB0YXJnZXQ9J19zZWxmJz48aW1nIHNyYz0naHR0cDovL3d3dy5hZG9iZS5jb20vaW1hZ2VzL3NoYXJlZC9kb3dubG9hZF9idXR0b25zL2dldF9mbGFzaF9wbGF5ZXIuZ2lmJyBhbHQ9J0dldCBBZG9iZSBGbGFzaCBwbGF5ZXInPjwvYT5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIkl0IGxvb2tzIGxpa2Ugbm90IGZvdW5kIHN3ZiBvciB5b3VyIGVudmlyb25tZW50IGlzIGxvY2FsaG9zdC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDEwMzoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAxMDMsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiQ2FuIG5vdCBsb2FkIGR1ZSB0byBkYXNoanMuIFBsZWFzZSBjaGVjayB0aGUgbGFzdGVzdCB2ZXJzaW9uLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiZGFzaC5qcyB2ZXJzaW9uIGlzIG9sZC4gUGxlYXNlIGNoZWNrIHRoZSBsYXN0ZXN0LlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMTA0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDEwNCxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJDYW4gbm90IGxvYWQgZHVlIHRvIGdvb2dsZSBpbWEgZm9yIEFkcy4gXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJQbGVhc2UgY2hlY2sgdGhlIGdvb2dsZSBpbWEgbGlicmFyeS5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDEwNToge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAxMDUsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiQ2FuIG5vdCBmaW5kIHRoZSBkYXNoanMuIFBsZWFzZSBjaGVjayB0aGUgZGFzaGpzLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiTm90IGZvdW5kIGRhc2hqcy5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDEwNjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAxMDYsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiQ2FuIG5vdCBmaW5kIHRoZSBobHNqcy4gUGxlYXNlIGNoZWNrIHRoZSBobHNqcy5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIk5vdCBmb3VuZCBobHNqcy5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDMwMDoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiQ2FuIG5vdCBwbGF5IGR1ZSB0byB1bmtub3duIHJlYXNvbnMuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJDYW4gbm90IHBsYXkgZHVlIHRvIHVua25vd24gcmVhc29ucy5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDMwMToge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDEsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiRmV0Y2hpbmcgcHJvY2VzcyBhYm9ydGVkIGJ5IHVzZXIuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJGZXRjaGluZyBwcm9jZXNzIGFib3J0ZWQgYnkgdXNlci5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDMwMjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiU29tZSBvZiB0aGUgbWVkaWEgY291bGQgbm90IGJlIGRvd25sb2FkZWQgZHVlIHRvIGEgbmV0d29yayBlcnJvci5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIkVycm9yIG9jY3VycmVkIHdoZW4gZG93bmxvYWRpbmcuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAzMDM6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMzAzLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIlVuYWJsZSB0byBsb2FkIG1lZGlhLiBUaGlzIG1heSBiZSBkdWUgdG8gYSBzZXJ2ZXIgb3IgbmV0d29yayBlcnJvciwgb3IgZHVlIHRvIGFuIHVuc3VwcG9ydGVkIGZvcm1hdC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIkVycm9yIG9jY3VycmVkIHdoZW4gZGVjb2RpbmcuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAzMDQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMzA0LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIk1lZGlhIHBsYXliYWNrIGhhcyBiZWVuIGNhbmNlbGVkLiBJdCBsb29rcyBsaWtlIHlvdXIgbWVkaWEgaXMgY29ycnVwdGVkIG9yIHlvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSBmZWF0dXJlcyB5b3VyIG1lZGlhIHVzZXMuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJNZWRpYSBwbGF5YmFjayBub3Qgc3VwcG9ydGVkLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMzA1OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwNSxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJDYW4gbm90IGxvYWQgY2FwdGlvbnMgZHVlIHRvIHVua25vd24gcmVhc29ucy5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIkNhbiBub3QgbG9hZCBjYXB0aW9ucyBkdWUgdG8gdW5rbm93biByZWFzb25zLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMzA2OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwNixcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJVbmFibGUgdG8gbG9hZCBtZWRpYS4gVGhpcyBtYXkgYmUgZHVlIHRvIGEgc2VydmVyIG9yIG5ldHdvcmsgZXJyb3IsIG9yIGR1ZSB0byBhbiB1bnN1cHBvcnRlZCBmb3JtYXQuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJUaGUgc2VydmVyIGNhbm5vdCBvciB3aWxsIG5vdCBwcm9jZXNzIHRoZSByZXF1ZXN0LlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMzA3OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwNyxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJVbmFibGUgdG8gbG9hZCBtZWRpYS4gVGhpcyBtYXkgYmUgZHVlIHRvIGEgc2VydmVyIG9yIG5ldHdvcmsgZXJyb3IsIG9yIGR1ZSB0byBhbiB1bnN1cHBvcnRlZCBmb3JtYXQuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJUaGUgc2VydmVyIHJlZnVzZWQgdGhlIHJlcXVlc3QuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAzMDg6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMzA4LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIlVuYWJsZSB0byBsb2FkIG1lZGlhLiBUaGlzIG1heSBiZSBkdWUgdG8gYSBzZXJ2ZXIgb3IgbmV0d29yayBlcnJvciwgb3IgZHVlIHRvIGFuIHVuc3VwcG9ydGVkIGZvcm1hdC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIlRoZSBzZXJ2ZXIgZG8gbm90IGFjY2VwdCB0aGUgcmVxdWVzdC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDUwMToge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiA1MDEsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiQ29ubmVjdGlvbiB3aXRoIGxvdy1sYXRlbmN5KE9NRSkgc2VydmVyIGZhaWxlZC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIldlYlNvY2tldCBjb25uZWN0aW9uIGZhaWxlZC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDUwMjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiA1MDIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiQ29ubmVjdGlvbiB3aXRoIGxvdy1sYXRlbmN5KE9NRSkgc2VydmVyIGZhaWxlZC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIldlYlJUQyBhZGRJY2VDYW5kaWRhdGUgZmFpbGVkLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNTAzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDUwMyxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJDb25uZWN0aW9uIHdpdGggbG93LWxhdGVuY3koT01FKSBzZXJ2ZXIgZmFpbGVkLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiV2ViUlRDIHNldFJlbW90ZURlc2NyaXB0aW9uIGZhaWxlZC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDUwNDoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiA1MDQsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiQ29ubmVjdGlvbiB3aXRoIGxvdy1sYXRlbmN5KE9NRSkgc2VydmVyIGZhaWxlZC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIldlYlJUQyBwZWVyIGNyZWF0ZU9mZmVyIGZhaWxlZC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDUwNToge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiA1MDUsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiQ29ubmVjdGlvbiB3aXRoIGxvdy1sYXRlbmN5KE9NRSkgc2VydmVyIGZhaWxlZC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIldlYlJUQyBzZXRMb2NhbERlc2NyaXB0aW9uIGZhaWxlZC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDUxMDoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiA1MTAsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiTmV0d29yayBjb25uZWN0aW9uIGlzIHVuc3RhYmxlLiBDaGVjayB0aGUgbmV0d29yayBjb25uZWN0aW9uLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiTmV0d29yayBpcyBzbG93LlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNTExOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDUxMSxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJDb25uZWN0aW9uIHdpdGggbG93LWxhdGVuY3koT01FKSB0ZXJtaW5hdGVkIHVuZXhwZWN0ZWRseS5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIlVuZXhwZWN0ZWQgZW5kIG9mIGNvbm5lY3Rpb24uXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJsYW5nXCIgOiBcImtvXCIsXHJcbiAgICAgICAgXCJ1aVwiIDoge1xyXG4gICAgICAgICAgICBcImNvbnRleHRcIiA6IFwi7Jik67iQ7ZSM66CI7J207Ja07JeQIOq0gO2VmOyXrFwiLFxyXG4gICAgICAgICAgICBcImNvbnRyb2xzXCIgOiB7XHJcbiAgICAgICAgICAgICAgICBcImxpdmVcIiA6IFwi65287J2067iMXCIsXHJcbiAgICAgICAgICAgICAgICBcImxvd19sYXRlbmN5X2xpdmVcIiA6IFwi7LSI7KCA7KeA7JewIOudvOydtOu4jFwiLFxyXG4gICAgICAgICAgICAgICAgXCJsb3dfbGF0ZW5jeV9wMnBcIiA6IFwi7LSI7KCA7KeA7JewIFAyUFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInBsYXlsaXN0XCIgOiBcIu2UjOugiOydtOumrOyKpO2KuFwiLFxyXG4gICAgICAgICAgICBcInNldHRpbmdcIiA6IHtcclxuICAgICAgICAgICAgICAgIFwidGl0bGVcIiA6IFwi7ISk7KCVXCIsXHJcbiAgICAgICAgICAgICAgICBcInNwZWVkXCIgOiBcIuyerOyDnSDsho3rj4RcIixcclxuICAgICAgICAgICAgICAgIFwic3BlZWRVbml0XCIgOiBcInhcIixcclxuICAgICAgICAgICAgICAgIFwic291cmNlXCIgOiBcIuyGjOyKpFwiLFxyXG4gICAgICAgICAgICAgICAgXCJxdWFsaXR5XCIgOiBcIu2SiOyniFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjYXB0aW9uXCIgOiBcIuyekOuniVwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNwbGF5XCIgOiBcIu2RnOyLnFwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiYXBpXCIgOiB7XHJcbiAgICAgICAgICAgIFwibWVzc2FnZVwiIDoge1xyXG4gICAgICAgICAgICAgICAgXCJtdXRlZF9wbGF5XCIgOiBcIuuIjOufrOyEnCDshozrpqwg7Lyc6riwXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJlcnJvclwiOiB7XHJcbiAgICAgICAgICAgICAgICAxMDA6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIuyVjCDsiJgg7JeG64qUIOydtOycoOuhnCDroZzrk5wg7ZWgIOyImCDsl4bsirXri4jri6QuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCLslYwg7IiYIOyXhuuKlCDsnbTsnKDroZwg66Gc65OcIO2VoCDsiJgg7JeG7Iq164uI64ukLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMTAxOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDEwMSxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCLsp4Dsm5DrkJjripQg66+465SU7Ja066W8IOywvuyngCDrqrvtlbQg66Gc65OcIO2VoCDsiJgg7JeG7Iq164uI64ukLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiQ2FuIG5vdCBsb2FkIGR1ZSB0byBwbGF5YWJsZSBtZWRpYSBub3QgZm91bmQuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAxMDI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMTAyLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIu2UjOugiOyLnCDroZzrk5zqsIAg7KSR64uoIOuQmOyXiOyKteuLiOuLpC4gPC9icj48YSBocmVmPSdodHRwOi8vd3d3LmFkb2JlLmNvbS9nby9nZXRmbGFzaHBsYXllcicgdGFyZ2V0PSdfc2VsZic+PGltZyBzcmM9J2h0dHA6Ly93d3cuYWRvYmUuY29tL2ltYWdlcy9zaGFyZWQvZG93bmxvYWRfYnV0dG9ucy9nZXRfZmxhc2hfcGxheWVyLmdpZicgYWx0PSdHZXQgQWRvYmUgRmxhc2ggcGxheWVyJz48L2E+XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJJdCBsb29rcyBsaWtlIG5vdCBmb3VuZCBzd2Ygb3IgeW91ciBlbnZpcm9ubWVudCBpcyBsb2NhbGhvc3QuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAxMDM6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMTAzLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkRhc2hKU+uhnCDsnbjtlbQg66Gc65OcIO2VoCDsiJgg7JeG7Iq164uI64ukLiBkYXNoanMg67KE7KCE7J2EIO2ZleyduO2VtOyjvOyEuOyalC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcImRhc2guanMgdmVyc2lvbiBpcyBvbGQuIFBsZWFzZSBjaGVjayB0aGUgbGFzdGVzdC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDEwNDoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAxMDQsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiR29vZ2xlIElNQSDrnbzsnbTruIzrn6zrpqzqsIAg7JeG7Ja0IOuhnOuTnCDtlaAg7IiYIOyXhuyKteuLiOuLpC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIlBsZWFzZSBjaGVjayB0aGUgZ29vZ2xlIGltYSBsaWJyYXJ5LlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMTA1OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDEwNSxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJEYXNoSlMg65287J2067iM65+s66as6rCAIOyXhuyWtCDroZzrk5wg7ZWgIOyImCDsl4bsirXri4jri6QuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJOb3QgZm91bmQgZGFzaGpzLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMTA2OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDEwNixcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJITFNKUyDrnbzsnbTruIzrn6zrpqzqsIAg7JeG7Ja0IOuhnOuTnCDtlaAg7IiYIOyXhuyKteuLiOuLpC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIk5vdCBmb3VuZCBobHNqcy5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDMwMDoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi7JWMIOyImCDsl4bripQg7J207Jyg66GcIOyerOyDne2VoCDsiJgg7JeG7Iq164uI64ukLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiQ2FuIG5vdCBwbGF5IGR1ZSB0byB1bmtub3duIHJlYXNvbnMuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAzMDE6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMzAxLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIuyCrOyaqeyekOyXkCDsnZjtlZwg7ZSE66Gc7IS47IqkIOykkeuLqC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIkZldGNoaW5nIHByb2Nlc3MgYWJvcnRlZCBieSB1c2VyLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMzAyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwMixcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCLrhKTtirjsm4ztgawg7Jik66WY66GcIOyduO2VtCDsnbzrtoAg66+465SU7Ja066W8IOuLpOyatOuhnOuTnCDtlaAg7IiYIOyXhuyKteuLiOuLpC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIkVycm9yIG9jY3VycmVkIHdoZW4gZG93bmxvYWRpbmcuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAzMDM6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMzAzLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIuuvuOuUlOyWtOulvCDroZzrk5wg7ZWgIOyImCDsl4bsirXri4jri6QuIOyEnOuyhCDrmJDripQg64Sk7Yq47JuM7YGsIOyYpOulmCDrmJDripQg7KeA7JuQ65CY7KeAIOyViuuKlCDtmJXsi53snLzroZwg7J247ZW0IOuwnOyDne2VoCDsiJgg7J6I7Iq164uI64ukLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiRXJyb3Igb2NjdXJyZWQgd2hlbiBkZWNvZGluZy5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDMwNDoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDQsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi66+465SU7Ja0IOyerOyDneydtCDst6jshozrkJjsl4jsirXri4jri6QuIOuvuOuUlOyWtOqwgCDshpDsg4HrkJjsl4jqsbDrgpgg67iM65287Jqw7KCA6rCAIOuvuOuUlOyWtOyXkOyEnCDsgqzsmqntlZjripQg6riw64ql7J2EIOyngOybkO2VmOyngCDslYrripQg6rKDIOqwmeyKteuLiOuLpC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIk1lZGlhIHBsYXliYWNrIG5vdCBzdXBwb3J0ZWQuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAzMDU6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMzA1LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIuyVjCDsiJgg7JeG64qUIOydtOycoOuhnCDsnpDrp4nsnYQg66Gc65OcIO2VoCDsiJgg7JeG7Iq164uI64ukLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiQ2FuIG5vdCBsb2FkIGNhcHRpb25zIGR1ZSB0byB1bmtub3duIHJlYXNvbnMuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAzMDY6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMzA2LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIuuvuOuUlOyWtOulvCDroZzrk5wg7ZWgIOyImCDsl4bsirXri4jri6QuIOyEnOuyhCDrmJDripQg64Sk7Yq47JuM7YGsIOyYpOulmCDrmJDripQg7KeA7JuQ65CY7KeAIOyViuuKlCDtmJXsi53snLzroZwg7J247ZW0IOuwnOyDne2VoCDsiJgg7J6I7Iq164uI64ukLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiVGhlIHNlcnZlciBjYW5ub3Qgb3Igd2lsbCBub3QgcHJvY2VzcyB0aGUgcmVxdWVzdC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDMwNzoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDcsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi66+465SU7Ja066W8IOuhnOuTnCDtlaAg7IiYIOyXhuyKteuLiOuLpC4g7ISc67KEIOuYkOuKlCDrhKTtirjsm4ztgawg7Jik66WYIOuYkOuKlCDsp4Dsm5DrkJjsp4Ag7JWK64qUIO2YleyLneycvOuhnCDsnbjtlbQg67Cc7IOd7ZWgIOyImCDsnojsirXri4jri6QuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJUaGUgc2VydmVyIHJlZnVzZWQgdGhlIHJlcXVlc3QuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAzMDg6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMzA4LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIuuvuOuUlOyWtOulvCDroZzrk5wg7ZWgIOyImCDsl4bsirXri4jri6QuIOyEnOuyhCDrmJDripQg64Sk7Yq47JuM7YGsIOyYpOulmCDrmJDripQg7KeA7JuQ65CY7KeAIOyViuuKlCDtmJXsi53snLzroZwg7J247ZW0IOuwnOyDne2VoCDsiJgg7J6I7Iq164uI64ukLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiVGhlIHNlcnZlciBkbyBub3QgYWNjZXB0IHRoZSByZXF1ZXN0LlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNTAxOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDUwMSxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCLsm7nshozsvJMg7Jew6rKwIOyLpO2MqFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiV2ViU29ja2V0IGNvbm5lY3Rpb24gZmFpbGVkLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNTAyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDUwMixcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCLsoIDsp4Dsl7AoT01FKSDshJzrsoTsmYAg7Jew6rKw7JeQIOyLpO2MqO2WiOyKteuLiOuLpC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIldlYlJUQyBhZGRJY2VDYW5kaWRhdGUgZmFpbGVkLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNTAzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDUwMyxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCLsoIDsp4Dsl7AoT01FKSDshJzrsoTsmYAg7Jew6rKw7JeQIOyLpO2MqO2WiOyKteuLiOuLpC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIldlYlJUQyBzZXRSZW1vdGVEZXNjcmlwdGlvbiBmYWlsZWQuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA1MDQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogNTA0LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIuyggOyngOyXsChPTUUpIOyEnOuyhOyZgCDsl7DqsrDsl5Ag7Iuk7Yyo7ZaI7Iq164uI64ukLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiV2ViUlRDIHBlZXIgY3JlYXRlT2ZmZXIgZmFpbGVkLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNTA1OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDUwNSxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCLsoIDsp4Dsl7AoT01FKSDshJzrsoTsmYAg7Jew6rKw7JeQIOyLpO2MqO2WiOyKteuLiOuLpC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIldlYlJUQyBzZXRMb2NhbERlc2NyaXB0aW9uIGZhaWxlZC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDUxMDoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiA1MTAsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi64Sk7Yq47JuM7YGsIOyXsOqysOydtCDrtojslYjsoJXtlanri4jri6QuIOuEpO2KuOybjO2BrCDsl7DqsrDsnYQg7ZmV7J247ZWY7Iut7Iuc7JikLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiTmV0d29yayBpcyBzbG93LlwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbl07IiwiLyoqXHJcbiAqIEBicmllZiAgIOuvuOuUlOyWtCDsl5jrpqzrqLztirjrpbwg6rSA66as7ZWY64qUIOqwneyytC4g7ZiE7J6s64qUIO2VmOuKlCDsnbzsnbQg66eO7KeAIOyViuuLpC5cclxuICogQHBhcmFtICAge2VsZW1lbnR9ICAgY29udGFpbmVyICAgZG9tIGVsZW1lbnRcclxuICpcclxuICogKi9cclxuaW1wb3J0IHtnZXRCcm93c2VyfSBmcm9tIFwidXRpbHMvYnJvd3NlclwiO1xyXG5pbXBvcnQge1BST1ZJREVSX0RBU0gsIFBST1ZJREVSX0hMUywgUFJPVklERVJfV0VCUlRDLCBQUk9WSURFUl9IVE1MNSwgUFJPVklERVJfUlRNUH0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuaW1wb3J0IExBJCBmcm9tIFwidXRpbHMvbGlrZUEkLmpzXCI7XHJcbmltcG9ydCB7Z2V0U2NyaXB0UGF0aH0gZnJvbSAndXRpbHMvd2VicGFjayc7XHJcbmltcG9ydCB7dmVyc2lvbn0gZnJvbSAndmVyc2lvbic7XHJcbi8vVG9EbyA6IFJlc3RydWN0dXJpbmdcclxuXHJcbmNvbnN0IE1hbmFnZXIgPSBmdW5jdGlvbihjb250YWluZXIsIGJyb3dzZXJJbmZvKXtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIGNvbnN0IFNXRlBhdGggPSBnZXRTY3JpcHRQYXRoKCdvdmVucGxheWVyLmpzJykrXCJPdmVuUGxheWVyRmxhc2guc3dmP3Y9XCIrdmVyc2lvbjtcclxuICAgIGxldCByb290SWQgPSBjb250YWluZXIuZ2V0QXR0cmlidXRlKFwiZGF0YS1wYXJlbnQtaWRcIik7XHJcbiAgICBsZXQgJGNvbnRhaW5lciA9IExBJChjb250YWluZXIpO1xyXG4gICAgbGV0IHZpZGVvRWxlbWVudCA9IFwiXCI7XHJcblxyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTWVkaWFNYW5hZ2VyIGxvYWRlZC4gYnJvd3NlciA6IFwiLCBicm93c2VySW5mbyApO1xyXG5cclxuICAgIGNvbnN0IGNyZWF0ZUh0bWxWaWRlbyA9IGZ1bmN0aW9uKGlzTG9vcCwgaXNBdXRvU3RhcnQpe1xyXG5cclxuICAgICAgICB2aWRlb0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xyXG4gICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVyZW1vdGVwbGF5YmFjaycsICcnKTtcclxuICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCd3ZWJraXQtcGxheXNpbmxpbmUnLCAndHJ1ZScpO1xyXG4gICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3BsYXlzaW5saW5lJywgJ3RydWUnKTtcclxuICAgICAgICBpZihpc0xvb3Ape1xyXG4gICAgICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCdsb29wJywgJycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpc0F1dG9TdGFydCkge1xyXG4gICAgICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCdhdXRvcGxheScsICcnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJGNvbnRhaW5lci5hcHBlbmQodmlkZW9FbGVtZW50KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHZpZGVvRWxlbWVudDtcclxuICAgIH07XHJcbiAgICBjb25zdCBjcmVhdGVGbGFzaFZpZGVvID0gZnVuY3Rpb24oaXNMb29wLCBidWZmZXJUaW1lLCBidWZmZXJUaW1lTWF4KXtcclxuICAgICAgICBsZXQgbW92aWUsIGZsYXNodmFycywgYWxsb3dzY3JpcHRhY2Nlc3MsIGFsbG93ZnVsbHNjcmVlbiwgcXVhbGl0eSwgbmFtZSwgbWVudSwgcXVhbCwgYmdjb2xvciwgbG9vcCwgd21vZGUgO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIk1lZGlhTWFuYWdlciBGbGFzaCBidWZmZXIgc2V0dGluZyA6IFwiLCBidWZmZXJUaW1lLCBidWZmZXJUaW1lTWF4KTtcclxuICAgICAgICBtb3ZpZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgbW92aWUuc2V0QXR0cmlidXRlKCduYW1lJywgJ21vdmllJyk7XHJcbiAgICAgICAgbW92aWUuc2V0QXR0cmlidXRlKCd2YWx1ZScsIFNXRlBhdGgpO1xyXG5cclxuICAgICAgICBmbGFzaHZhcnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgIGZsYXNodmFycy5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnZmxhc2h2YXJzJyk7XHJcbiAgICAgICAgLy9wbGF5ZXJJZCBpcyB0byB1c2UgU1dGIGZvciBFeHRlcm5hbEludGVyZmFjZS5jYWxsKCkuXHJcbiAgICAgICAgZmxhc2h2YXJzLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBgcGxheWVySWQ9JHtyb290SWR9JmJ1ZmZlclRpbWU9JHtidWZmZXJUaW1lfSZidWZmZXJNYXhUaW1lPSR7YnVmZmVyVGltZU1heH1gKTtcclxuXHJcbiAgICAgICAgYWxsb3dzY3JpcHRhY2Nlc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgIGFsbG93c2NyaXB0YWNjZXNzLnNldEF0dHJpYnV0ZSgnbmFtZScsICdhbGxvd3NjcmlwdGFjY2VzcycpO1xyXG4gICAgICAgIGFsbG93c2NyaXB0YWNjZXNzLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnYWx3YXlzJyk7XHJcblxyXG4gICAgICAgIGFsbG93ZnVsbHNjcmVlbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgYWxsb3dmdWxsc2NyZWVuLnNldEF0dHJpYnV0ZSgnbmFtZScsICdhbGxvd2Z1bGxzY3JlZW4nKTtcclxuICAgICAgICBhbGxvd2Z1bGxzY3JlZW4uc2V0QXR0cmlidXRlKCd2YWx1ZScsICd0cnVlJyk7XHJcblxyXG4gICAgICAgIHF1YWxpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgIHF1YWxpdHkuc2V0QXR0cmlidXRlKCduYW1lJywgJ3F1YWxpdHknKTtcclxuICAgICAgICBxdWFsaXR5LnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnaGVpZ2h0Jyk7XHJcblxyXG4gICAgICAgIG5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgIG5hbWUuc2V0QXR0cmlidXRlKCduYW1lJywgJ25hbWUnKTtcclxuICAgICAgICBuYW1lLnNldEF0dHJpYnV0ZSgndmFsdWUnLCByb290SWQrXCItZmxhc2hcIik7XHJcblxyXG4gICAgICAgIG1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgIG1lbnUuc2V0QXR0cmlidXRlKCduYW1lJywgJ21lbnUnKTtcclxuICAgICAgICBtZW51LnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnZmFsc2UnKTtcclxuXHJcbiAgICAgICAgcXVhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgcXVhbC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAncXVhbGl0eScpO1xyXG4gICAgICAgIHF1YWwuc2V0QXR0cmlidXRlKCd2YWx1ZScsICdoaWdoJyk7XHJcblxyXG4gICAgICAgIGJnY29sb3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgIGJnY29sb3Iuc2V0QXR0cmlidXRlKCduYW1lJywgJ2JnY29sb3InKTtcclxuICAgICAgICBiZ2NvbG9yLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnIzAwMDAwMCcpO1xyXG5cclxuICAgICAgICB3bW9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgd21vZGUuc2V0QXR0cmlidXRlKCduYW1lJywgJ3dtb2RlJyk7XHJcbiAgICAgICAgd21vZGUuc2V0QXR0cmlidXRlKCd2YWx1ZScsICdvcGFxdWUnKTtcclxuXHJcbiAgICAgICAgLypsZXQgYWxsb3dCdXR0b24gPSBgPGEgaHJlZj1cImh0dHA6Ly93d3cuYWRvYmUuY29tL2dvL2dldGZsYXNocGxheWVyXCI+PGltZyBzcmM9XCJodHRwOi8vd3d3LmFkb2JlLmNvbS9pbWFnZXMvc2hhcmVkL2Rvd25sb2FkX2J1dHRvbnMvZ2V0X2ZsYXNoX3BsYXllci5naWZcIiBhbHQ9XCJHZXQgQWRvYmUgRmxhc2ggcGxheWVyXCI+PC9hPmA7XHJcbiAgICAgICAgbWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgbWVzc2FnZS5pbm5lckhUTUwgPSBhbGxvd0J1dHRvbjsqL1xyXG5cclxuICAgICAgICBpZihpc0xvb3Ape1xyXG4gICAgICAgICAgICBsb29wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICAgICAgbG9vcC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnbG9vcCcpO1xyXG4gICAgICAgICAgICBsb29wLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAndHJ1ZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmlkZW9FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb2JqZWN0Jyk7XHJcbiAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCByb290SWQrXCItZmxhc2hcIik7XHJcbiAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnbmFtZScsIHJvb3RJZCtcIi1mbGFzaFwiKTtcclxuICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCd3aWR0aCcsICcxMDAlJyk7XHJcbiAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgJzEwMCUnKTtcclxuICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCdzY2FsZScsICdkZWZhdWx0Jyk7XHJcbiAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnd21vZGUnLCAnb3BhcXVlJyk7XHJcblxyXG4gICAgICAgIGlmKGJyb3dzZXJJbmZvLmJyb3dzZXIgPT09IFwiTWljcm9zb2Z0IEludGVybmV0IEV4cGxvcmVyXCIgJiYgYnJvd3NlckluZm8uYnJvd3Nlck1ham9yVmVyc2lvbiA8PSA5ICl7XHJcbiAgICAgICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzaWQnLCAnY2xzaWQ6RDI3Q0RCNkUtQUU2RC0xMWNmLTk2QjgtNDQ0NTUzNTQwMDAwJyk7XHJcbiAgICAgICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChtb3ZpZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEnLCBTV0ZQYXRoKTtcclxuICAgICAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgndHlwZScsICdhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpc0xvb3Ape1xyXG4gICAgICAgICAgICB2aWRlb0VsZW1lbnQuYXBwZW5kQ2hpbGQobG9vcCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2aWRlb0VsZW1lbnQuYXBwZW5kQ2hpbGQod21vZGUpO1xyXG4gICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChiZ2NvbG9yKTtcclxuICAgICAgICB2aWRlb0VsZW1lbnQuYXBwZW5kQ2hpbGQocXVhbCk7XHJcbiAgICAgICAgdmlkZW9FbGVtZW50LmFwcGVuZENoaWxkKGFsbG93ZnVsbHNjcmVlbik7XHJcbiAgICAgICAgdmlkZW9FbGVtZW50LmFwcGVuZENoaWxkKGFsbG93c2NyaXB0YWNjZXNzKTtcclxuICAgICAgICB2aWRlb0VsZW1lbnQuYXBwZW5kQ2hpbGQoZmxhc2h2YXJzKTtcclxuICAgICAgICAvL3ZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChtZXNzYWdlKTtcclxuXHJcbiAgICAgICAgJGNvbnRhaW5lci5hcHBlbmQodmlkZW9FbGVtZW50KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHZpZGVvRWxlbWVudDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5jcmVhdGVNZWRpYSA9IChwcm92aWRlck5hbWUgLCBwbGF5ZXJDb25maWcpICA9PiB7XHJcbiAgICAgICAgaWYoIHByb3ZpZGVyTmFtZSA9PT0gUFJPVklERVJfUlRNUCApe1xyXG4gICAgICAgICAgICBpZih2aWRlb0VsZW1lbnQpe1xyXG4gICAgICAgICAgICAgICAgdGhhdC5lbXB0eSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVGbGFzaFZpZGVvKHBsYXllckNvbmZpZy5pc0xvb3AoKSwgcGxheWVyQ29uZmlnLmdldFJ0bXBCdWZmZXJUaW1lKCksIHBsYXllckNvbmZpZy5nZXRSdG1wQnVmZmVyVGltZU1heCgpKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy8gaWYodmlkZW9FbGVtZW50KXtcclxuICAgICAgICAgICAgLy8gICAgIC8vIHRoYXQuZW1wdHkoKTtcclxuICAgICAgICAgICAgLy8gICAgIC8vcmV1c2UgdmlkZW8gZWxlbWVudC5cclxuICAgICAgICAgICAgLy8gICAgIC8vYmVjYXVzZSBwbGF5bGlzdCBpcyBhdXRvIG5leHQgcGxheWluZy5cclxuICAgICAgICAgICAgLy8gICAgIC8vT25seSBzYW1lIHZpZGVvIGVsZW1lbnQgZG9lcyBub3QgcmVxdWlyZSBVc2VyIEludGVyYWN0aW9uIEVycm9yLlxyXG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuIHZpZGVvRWxlbWVudDtcclxuICAgICAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgICAgIC8vICAgICByZXR1cm4gY3JlYXRlSHRtbFZpZGVvKHBsYXllckNvbmZpZy5pc0xvb3AoKSwgcGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIHRoYXQuZW1wdHkoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUh0bWxWaWRlbyhwbGF5ZXJDb25maWcuaXNMb29wKCksIHBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhhdC5jcmVhdGVBZENvbnRhaW5lciA9ICgpID0+IHtcclxuICAgICAgICBsZXQgYWRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBhZENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ29wLWFkcycpO1xyXG4gICAgICAgICRjb250YWluZXIuYXBwZW5kKGFkQ29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGFkQ29udGFpbmVyO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhhdC5lbXB0eSA9ICgpID0+e1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIk1lZGlhTWFuYWdlciByZW1vdmVFbGVtZW50KClcIik7XHJcbiAgICAgICAgJGNvbnRhaW5lci5yZW1vdmVDaGlsZCh2aWRlb0VsZW1lbnQpO1xyXG4gICAgICAgIHZpZGVvRWxlbWVudCA9IG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xyXG4gICAgICAgICRjb250YWluZXIucmVtb3ZlQ2hpbGQoKTtcclxuICAgICAgICAkY29udGFpbmVyID0gbnVsbDtcclxuICAgICAgICB2aWRlb0VsZW1lbnQgPSBudWxsO1xyXG4gICAgICAgIHJvb3RJZCA9IG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWFuYWdlcjtcclxuIiwiaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcclxuaW1wb3J0IHtpc1J0bXAsIGlzV2ViUlRDLCBpc0Rhc2gsIGlzSGxzIH0gZnJvbSBcInV0aWxzL3ZhbGlkYXRvclwiO1xyXG5pbXBvcnQge2V4dHJhY3RFeHRlbnNpb24gLHRyaW19IGZyb20gXCIuLi8uLi91dGlscy9zdHJpbmdzXCI7XHJcbmltcG9ydCBTdXBwb3J0Q2hlY2tlciBmcm9tIFwiLi4vU3VwcG9ydENoZWNrZXJcIjtcclxuaW1wb3J0IHtQTEFZTElTVF9DSEFOR0VEfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIFRoaXMgbWFuYWdlcyBQbGF5bGlzdCBvciBTb3VyY2VzLlxyXG4gKiBAcGFyYW1cclxuICpcclxuICogKi9cclxuY29uc3QgTWFuYWdlciA9IGZ1bmN0aW9uKHByb3ZpZGVyKXtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIGxldCBjdXJyZW50UGxheWxpc3RJdGVtID0gW107XHJcbiAgICBsZXQgc3BlYyA9IHtcclxuICAgICAgICBwbGF5bGlzdCA6IFtdLFxyXG4gICAgICAgIGN1cnJlbnRJbmRleCA6IDBcclxuICAgIH07XHJcbiAgICBsZXQgc3VwcG9ydENoZWNrZXIgPSBTdXBwb3J0Q2hlY2tlcigpO1xyXG5cclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBsb2FkZWQuXCIpO1xyXG5cclxuICAgIGNvbnN0IG1ha2VQcmV0dHlTb3VyY2UgPSBmdW5jdGlvbihzb3VyY2VfKXtcclxuICAgICAgICBpZiAoIXNvdXJjZV8gfHwgIXNvdXJjZV8uZmlsZSAmJiAhKHNvdXJjZV8uaG9zdCB8fCBzb3VyY2VfLmFwcGxpY2F0aW9uIHx8IHNvdXJjZV8uc3RyZWFtKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc291cmNlID0gT2JqZWN0LmFzc2lnbih7fSwgeyAnZGVmYXVsdCc6IGZhbHNlIH0sIHNvdXJjZV8pO1xyXG4gICAgICAgIHNvdXJjZS5maWxlID0gdHJpbSgnJyArIHNvdXJjZS5maWxlKTtcclxuXHJcbiAgICAgICAgaWYoc291cmNlLmhvc3QgJiYgc291cmNlLmFwcGxpY2F0aW9uICYmIHNvdXJjZS5zdHJlYW0pe1xyXG4gICAgICAgICAgICBzb3VyY2UuZmlsZSA9IHNvdXJjZS5ob3N0ICsgXCIvXCIgKyBzb3VyY2UuYXBwbGljYXRpb24gKyBcIi9zdHJlYW0vXCIgKyBzb3VyY2Uuc3RyZWFtO1xyXG4gICAgICAgICAgICBkZWxldGUgc291cmNlLmhvc3Q7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBzb3VyY2UuYXBwbGljYXRpb247XHJcbiAgICAgICAgICAgIGRlbGV0ZSBzb3VyY2Uuc3RyZWFtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbWltZXR5cGVSZWdFeCA9IC9eW14vXStcXC8oPzp4LSk/KFteL10rKSQvO1xyXG5cclxuICAgICAgICBpZiAobWltZXR5cGVSZWdFeC50ZXN0KHNvdXJjZS50eXBlKSkge1xyXG4gICAgICAgICAgICAvLyBpZiB0eXBlIGlzIGdpdmVuIGFzIGEgbWltZXR5cGVcclxuICAgICAgICAgICAgc291cmNlLm1pbWVUeXBlID0gc291cmNlLnR5cGU7XHJcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gc291cmNlLnR5cGUucmVwbGFjZShtaW1ldHlwZVJlZ0V4LCAnJDEnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGlzUnRtcChzb3VyY2UuZmlsZSkpe1xyXG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdydG1wJztcclxuICAgICAgICB9ZWxzZSBpZihpc1dlYlJUQyhzb3VyY2UuZmlsZSkpe1xyXG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9ICd3ZWJydGMnO1xyXG4gICAgICAgIH1lbHNlIGlmKGlzSGxzKHNvdXJjZS5maWxlLCBzb3VyY2UudHlwZSkpe1xyXG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdobHMnO1xyXG4gICAgICAgIH1lbHNlIGlmKGlzRGFzaChzb3VyY2UuZmlsZSwgc291cmNlLnR5cGUpKXtcclxuICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnZGFzaCc7XHJcbiAgICAgICAgfWVsc2UgaWYgKCFzb3VyY2UudHlwZSkge1xyXG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9IGV4dHJhY3RFeHRlbnNpb24oc291cmNlLmZpbGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNvdXJjZS5sb3dMYXRlbmN5KSB7XHJcbiAgICAgICAgICAgIHNvdXJjZS5sb3dMYXRlbmN5ID0gc291cmNlLmxvd0xhdGVuY3k7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXNvdXJjZS50eXBlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIG5vcm1hbGl6ZSB0eXBlc1xyXG4gICAgICAgIHN3aXRjaCAoc291cmNlLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnbTN1OCc6XHJcbiAgICAgICAgICAgIGNhc2UgJ3ZuZC5hcHBsZS5tcGVndXJsJzpcclxuICAgICAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ2hscyc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbTRhJzpcclxuICAgICAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ2FhYyc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc21pbCc6XHJcbiAgICAgICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdydG1wJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgICAgIGlmIChzb3VyY2Vba2V5XSA9PT0gJycpIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBzb3VyY2Vba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gc291cmNlO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB0aGF0LmluaXRQbGF5bGlzdCA9KHBsYXlsaXN0LCBwbGF5ZXJDb25maWcpID0+e1xyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQbGF5bGlzdE1hbmFnZXIgc2V0UGxheWxpc3QoKSBcIiwgcGxheWxpc3QpO1xyXG4gICAgICAgIGNvbnN0IHByZXR0aWVkUGxheWxpc3QgPSAoXy5pc0FycmF5KHBsYXlsaXN0KSA/IHBsYXlsaXN0IDogW3BsYXlsaXN0XSkubWFwKGZ1bmN0aW9uKGl0ZW0pe1xyXG5cclxuICAgICAgICAgICAgaWYoIV8uaXNBcnJheShpdGVtLnRyYWNrcykpIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBpdGVtLnRyYWNrcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgcGxheWxpc3RJdGVtID0gT2JqZWN0LmFzc2lnbih7fSx7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2VzOiBbXSxcclxuICAgICAgICAgICAgICAgIHRyYWNrczogW10sXHJcbiAgICAgICAgICAgICAgICB0aXRsZSA6IFwiXCJcclxuICAgICAgICAgICAgfSwgaXRlbSApO1xyXG5cclxuICAgICAgICAgICAgaWYoKHBsYXlsaXN0SXRlbS5zb3VyY2VzID09PSBPYmplY3QocGxheWxpc3RJdGVtLnNvdXJjZXMpKSAmJiAhXy5pc0FycmF5KHBsYXlsaXN0SXRlbS5zb3VyY2VzKSkge1xyXG4gICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBbbWFrZVByZXR0eVNvdXJjZShwbGF5bGlzdEl0ZW0uc291cmNlcyldO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIV8uaXNBcnJheShwbGF5bGlzdEl0ZW0uc291cmNlcykgfHwgcGxheWxpc3RJdGVtLnNvdXJjZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IFttYWtlUHJldHR5U291cmNlKHBsYXlsaXN0SXRlbSldO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZighXy5pc0FycmF5KHBsYXlsaXN0SXRlbS5zb3VyY2VzKSB8fCBwbGF5bGlzdEl0ZW0uc291cmNlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmxldmVscykge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gaXRlbS5sZXZlbHM7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gW21ha2VQcmV0dHlTb3VyY2UoaXRlbSldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHBsYXlsaXN0SXRlbS5zb3VyY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc291cmNlID0gcGxheWxpc3RJdGVtLnNvdXJjZXNbaV07XHJcbiAgICAgICAgICAgICAgICBsZXQgcHJldHR5U291cmNlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGlmICghc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGRlZmF1bHRTb3VyY2UgPSBzb3VyY2UuZGVmYXVsdDtcclxuICAgICAgICAgICAgICAgIGlmIChkZWZhdWx0U291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlLmRlZmF1bHQgPSAoZGVmYXVsdFNvdXJjZS50b1N0cmluZygpID09PSAndHJ1ZScpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2UuZGVmYXVsdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBzb3VyY2UgZG9lc24ndCBoYXZlIGEgbGFiZWwsIG51bWJlciBpdFxyXG4gICAgICAgICAgICAgICAgaWYgKCFwbGF5bGlzdEl0ZW0uc291cmNlc1tpXS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldLmxhYmVsID0gcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0udHlwZStcIi1cIitpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHJldHR5U291cmNlID0gbWFrZVByZXR0eVNvdXJjZShwbGF5bGlzdEl0ZW0uc291cmNlc1tpXSk7XHJcbiAgICAgICAgICAgICAgICBpZihzdXBwb3J0Q2hlY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UocHJldHR5U291cmNlKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0gPSBwcmV0dHlTb3VyY2U7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gcGxheWxpc3RJdGVtLnNvdXJjZXMuZmlsdGVyKHNvdXJjZSA9PiAhIXNvdXJjZSk7XHJcblxyXG4gICAgICAgICAgICBpZighcGxheWxpc3RJdGVtLnRpdGxlICYmICBwbGF5bGlzdEl0ZW0uc291cmNlc1swXSAmJiBwbGF5bGlzdEl0ZW0uc291cmNlc1swXS5sYWJlbCl7XHJcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0udGl0bGUgPSBwbGF5bGlzdEl0ZW0uc291cmNlc1swXS5sYWJlbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gZGVmYXVsdCDqsIAg7JeG7J2E65WMIHdlYnJ0Y+qwgCDsnojri6TrqbQgd2VicnRjIGRlZmF1bHQgOiB0cnVl66GcIOyekOuPmSDshKTsoJVcclxuICAgICAgICAgICAgLypsZXQgaGF2ZURlZmF1bHQgPSBfLmZpbmQocGxheWxpc3RJdGVtLnNvdXJjZXMsIGZ1bmN0aW9uKHNvdXJjZSl7cmV0dXJuIHNvdXJjZS5kZWZhdWx0ID09IHRydWU7fSk7XHJcbiAgICAgICAgICAgIGxldCB3ZWJydGNTb3VyY2UgPSBbXTtcclxuICAgICAgICAgICAgaWYoIWhhdmVEZWZhdWx0KXtcclxuICAgICAgICAgICAgICAgIHdlYnJ0Y1NvdXJjZSA9IF8uZmluZChwbGF5bGlzdEl0ZW0uc291cmNlcywgZnVuY3Rpb24oc291cmNlKXtyZXR1cm4gc291cmNlLnR5cGUgPT0gXCJ3ZWJydGNcIjt9KTtcclxuICAgICAgICAgICAgICAgIGlmKHdlYnJ0Y1NvdXJjZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgd2VicnRjU291cmNlLmRlZmF1bHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9Ki9cclxuXHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBleHRyYWN0T25seU9uZVByb3RvY29sKHNvdXJjZXMpe1xyXG4gICAgICAgICAgICAgICAgaWYoISFzb3VyY2VzKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaGlnaFByaW9yaXR5VHlwZSA9IHBsYXlsaXN0SXRlbS5zb3VyY2VzWzBdLnR5cGU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfLmZpbHRlcihzb3VyY2VzLCB7dHlwZSA6IGhpZ2hQcmlvcml0eVR5cGV9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmlzQ3VycmVudFByb3RvY29sT25seSgpKXtcclxuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gZXh0cmFjdE9ubHlPbmVQcm90b2NvbChwbGF5bGlzdEl0ZW0uc291cmNlcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKCFfLmlzQXJyYXkocGxheWxpc3RJdGVtLnRyYWNrcykpe1xyXG4gICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnRyYWNrcyA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKF8uaXNBcnJheShwbGF5bGlzdEl0ZW0uY2FwdGlvbnMpKXtcclxuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS50cmFja3MgPSBwbGF5bGlzdEl0ZW0udHJhY2tzLmNvbmNhdChwbGF5bGlzdEl0ZW0uY2FwdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHBsYXlsaXN0SXRlbS5jYXB0aW9ucztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcGxheWxpc3RJdGVtLnRyYWNrcyA9IHBsYXlsaXN0SXRlbS50cmFja3MubWFwKGZ1bmN0aW9uKHRyYWNrKXtcclxuICAgICAgICAgICAgICAgIGlmKCF0cmFjayB8fCAhdHJhY2suZmlsZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHtcclxuICAgICAgICAgICAgICAgICAgICAna2luZCc6ICdjYXB0aW9ucycsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2RlZmF1bHQnOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSwgdHJhY2spO1xyXG4gICAgICAgICAgICB9KS5maWx0ZXIodHJhY2sgPT4gISF0cmFjayk7XHJcbiAgICAgICAgICAgIHJldHVybiBwbGF5bGlzdEl0ZW07XHJcbiAgICAgICAgfSkuZmlsdGVyKGZ1bmN0aW9uKGl0ZW0pe3JldHVybiBpdGVtLnNvdXJjZXMgJiYgaXRlbS5zb3VyY2VzLmxlbmd0aCA+IDA7fSl8fFtdO1xyXG4gICAgICAgIHNwZWMucGxheWxpc3QgPSBwcmV0dGllZFBsYXlsaXN0O1xyXG4gICAgICAgIHJldHVybiBwcmV0dGllZFBsYXlsaXN0O1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0UGxheWxpc3QgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIGdldFBsYXlsaXN0KCkgXCIsIHNwZWMucGxheWxpc3QpO1xyXG4gICAgICAgIHJldHVybiBzcGVjLnBsYXlsaXN0O1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q3VycmVudFBsYXlMaXN0ID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKHNwZWMucGxheWxpc3Rbc3BlYy5jdXJyZW50SW5kZXhdKXtcclxuICAgICAgICAgICAgcmV0dXJuIHNwZWMucGxheWxpc3Rbc3BlYy5jdXJyZW50SW5kZXhdO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q3VycmVudFBsYXlsaXN0SW5kZXggPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudEluZGV4O1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Q3VycmVudFBsYXlsaXN0ID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgaWYoc3BlYy5wbGF5bGlzdFtpbmRleF0pe1xyXG4gICAgICAgICAgICBzcGVjLmN1cnJlbnRJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICBwcm92aWRlci50cmlnZ2VyKFBMQVlMSVNUX0NIQU5HRUQsIHNwZWMuY3VycmVudEluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudEluZGV4O1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q3VycmVudFNvdXJjZXMgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoc3BlYy5wbGF5bGlzdFtzcGVjLmN1cnJlbnRJbmRleF0pe1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQbGF5bGlzdE1hbmFnZXIgZ2V0Q3VycmVudFNvdXJjZXMoKSBcIiwgc3BlYy5wbGF5bGlzdFtzcGVjLmN1cnJlbnRJbmRleF0uc291cmNlcyk7XHJcbiAgICAgICAgICAgIHJldHVybiBzcGVjLnBsYXlsaXN0W3NwZWMuY3VycmVudEluZGV4XS5zb3VyY2VzO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q3VycmVudEFkVGFnID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKHNwZWMucGxheWxpc3Rbc3BlYy5jdXJyZW50SW5kZXhdKXtcclxuICAgICAgICAgICAgcmV0dXJuIHNwZWMucGxheWxpc3Rbc3BlYy5jdXJyZW50SW5kZXhdLmFkVGFnVXJsIHx8IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYW5hZ2VyO1xyXG4iLCJpbXBvcnQgU3VwcG9ydENoZWNrZXIgZnJvbSBcImFwaS9TdXBwb3J0Q2hlY2tlclwiO1xyXG5pbXBvcnQge0FwaVJ0bXBFeHBhbnNpb259IGZyb20gJ2FwaS9BcGlFeHBhbnNpb25zJztcclxuaW1wb3J0IHtcclxuICAgIFBST1ZJREVSX0hUTUw1LCBQUk9WSURFUl9XRUJSVEMsIFBST1ZJREVSX0RBU0gsIFBST1ZJREVSX0hMUywgUFJPVklERVJfUlRNUCwgRVJST1JTLCBJTklUX1VOU1VQUE9SVF9FUlJPUlxyXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgVGhpcyBtYW5hZ2VzIHByb3ZpZGVyLlxyXG4gKiBAcGFyYW1cclxuICogKi9cclxuY29uc3QgQ29udHJvbGxlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBzdXBwb3J0Q2hhY2tlciA9IFN1cHBvcnRDaGVja2VyKCk7XHJcbiAgICBjb25zdCBQcm92aWRlcnMgPSB7fTtcclxuXHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgbG9hZGVkLlwiKTtcclxuXHJcbiAgICBjb25zdCByZWdpc3RlUHJvdmlkZXIgPSAobmFtZSwgcHJvdmlkZXIpID0+IHtcclxuICAgICAgICBpZiAoUHJvdmlkZXJzW25hbWVdKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIF9yZWdpc3RlclByb3ZpZGVyKCkgXCIsIG5hbWUpO1xyXG4gICAgICAgIFByb3ZpZGVyc1tuYW1lXSA9IHByb3ZpZGVyO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBQcm92aWRlckxvYWRlciA9IHtcclxuICAgICAgICBodG1sNTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvaHRtbDUvcHJvdmlkZXJzL0h0bWw1J10sIGZ1bmN0aW9uIChyZXF1aXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvaHRtbDUvcHJvdmlkZXJzL0h0bWw1JykuZGVmYXVsdDtcclxuICAgICAgICAgICAgICAgICAgICByZWdpc3RlUHJvdmlkZXIoUFJPVklERVJfSFRNTDUsIHByb3ZpZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge25hbWU6IFBST1ZJREVSX0hUTUw1LCBwcm92aWRlcjogcHJvdmlkZXJ9O1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgfSwgJ292ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDUnXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB3ZWJydGM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9XZWJSVEMnXSwgZnVuY3Rpb24gKHJlcXVpcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvV2ViUlRDJykuZGVmYXVsdDtcclxuICAgICAgICAgICAgICAgICAgICByZWdpc3RlUHJvdmlkZXIoUFJPVklERVJfV0VCUlRDLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtuYW1lOiBQUk9WSURFUl9XRUJSVEMsIHByb3ZpZGVyOiBwcm92aWRlcn07XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XHJcbiAgICAgICAgICAgICAgICB9LCAnb3ZlbnBsYXllci5wcm92aWRlci5XZWJSVENQcm92aWRlcidcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRhc2g6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9EYXNoJ10sIGZ1bmN0aW9uIChyZXF1aXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvaHRtbDUvcHJvdmlkZXJzL0Rhc2gnKS5kZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVQcm92aWRlcihQUk9WSURFUl9EQVNILCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtuYW1lOiBQUk9WSURFUl9EQVNILCBwcm92aWRlcjogcHJvdmlkZXJ9O1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgfSwgJ292ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGxzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvSGxzJ10sIGZ1bmN0aW9uIChyZXF1aXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvaHRtbDUvcHJvdmlkZXJzL0hscycpLmRlZmF1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFBST1ZJREVSX0hMUywgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7bmFtZTogUFJPVklERVJfSExTLCBwcm92aWRlcjogcHJvdmlkZXJ9O1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgfSwgJ292ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXInXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBydG1wOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci9mbGFzaC9wcm92aWRlcnMvUnRtcCddLCBmdW5jdGlvbiAocmVxdWlyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2ZsYXNoL3Byb3ZpZGVycy9SdG1wJykuZGVmYXVsdDtcclxuICAgICAgICAgICAgICAgICAgICByZWdpc3RlUHJvdmlkZXIoUFJPVklERVJfUlRNUCwgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7bmFtZTogUFJPVklERVJfUlRNUCwgcHJvdmlkZXI6IHByb3ZpZGVyfTtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcclxuICAgICAgICAgICAgICAgIH0sICdvdmVucGxheWVyLnByb3ZpZGVyLlJ0bXBQcm92aWRlcidcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB0aGF0LmxvYWRQcm92aWRlcnMgPSAocGxheWxpc3RJdGVtKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc3VwcG9ydGVkUHJvdmlkZXJOYW1lcyA9IHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVzQnlQbGF5bGlzdChwbGF5bGlzdEl0ZW0pO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBsb2FkUHJvdmlkZXJzKCkgXCIsIHN1cHBvcnRlZFByb3ZpZGVyTmFtZXMpO1xyXG4gICAgICAgIGlmICghc3VwcG9ydGVkUHJvdmlkZXJOYW1lcykge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRVJST1JTLmNvZGVzW0lOSVRfVU5TVVBQT1JUX0VSUk9SXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFxyXG4gICAgICAgICAgICAgICAgc3VwcG9ydGVkUHJvdmlkZXJOYW1lcy5maWx0ZXIoZnVuY3Rpb24gKHByb3ZpZGVyTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhIVByb3ZpZGVyTG9hZGVyW3Byb3ZpZGVyTmFtZV07XHJcbiAgICAgICAgICAgICAgICB9KS5tYXAoZnVuY3Rpb24gKHByb3ZpZGVyTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm92aWRlckxvYWRlcltwcm92aWRlck5hbWVdKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZmluZEJ5TmFtZSA9IChuYW1lKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGZpbmRCeU5hbWUoKSBcIiwgbmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIFByb3ZpZGVyc1tuYW1lXTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRQcm92aWRlckJ5U291cmNlID0gKHNvdXJjZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHN1cHBvcnRlZFByb3ZpZGVyTmFtZSA9IHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShzb3VyY2UpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBnZXRQcm92aWRlckJ5U291cmNlKCkgXCIsIHN1cHBvcnRlZFByb3ZpZGVyTmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoYXQuZmluZEJ5TmFtZShzdXBwb3J0ZWRQcm92aWRlck5hbWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmlzU2FtZVByb3ZpZGVyID0gKGN1cnJlbnRTb3VyY2UsIG5ld1NvdXJjZSkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBpc1NhbWVQcm92aWRlcigpIFwiLCBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UoY3VycmVudFNvdXJjZSksIHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShuZXdTb3VyY2UpKTtcclxuICAgICAgICByZXR1cm4gc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKGN1cnJlbnRTb3VyY2UpID09PSBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UobmV3U291cmNlKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb250cm9sbGVyO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDExLiAxMi4uXHJcbiAqL1xyXG5pbXBvcnQge0VSUk9SLCBTVEFURV9FUlJPUn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBleHRyYWN0VmlkZW9FbGVtZW50ID0gZnVuY3Rpb24oZWxlbWVudE9yTXNlKSB7XHJcbiAgICBpZihfLmlzRWxlbWVudChlbGVtZW50T3JNc2UpKXtcclxuICAgICAgICByZXR1cm4gZWxlbWVudE9yTXNlO1xyXG4gICAgfVxyXG4gICAgaWYoZWxlbWVudE9yTXNlLmdldFZpZGVvRWxlbWVudCl7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRPck1zZS5nZXRWaWRlb0VsZW1lbnQoKTtcclxuICAgIH1lbHNlIGlmKGVsZW1lbnRPck1zZS5tZWRpYSl7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRPck1zZS5tZWRpYTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHNlcGFyYXRlTGl2ZSA9IGZ1bmN0aW9uKG1zZSkge1xyXG4gICAgLy9Ub0RvIDogWW91IGNvbnNpZGVyIGhsc2pzLiBCdXQgbm90IG5vdyBiZWNhdXNlIHdlIGRvbid0IHN1cHBvcnQgaGxzanMuXHJcblxyXG4gICAgaWYobXNlICYmIG1zZS5pc0R5bmFtaWMpe1xyXG4gICAgICAgIHJldHVybiBtc2UuaXNEeW5hbWljKCk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZXJyb3JUcmlnZ2VyID0gZnVuY3Rpb24oZXJyb3IsIHByb3ZpZGVyKXtcclxuICAgIGlmKHByb3ZpZGVyKXtcclxuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9FUlJPUik7XHJcbiAgICAgICAgcHJvdmlkZXIucGF1c2UoKTtcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKEVSUk9SLCBlcnJvciApO1xyXG4gICAgfVxyXG5cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBwaWNrQ3VycmVudFNvdXJjZSA9IChzb3VyY2VzLCBwbGF5ZXJDb25maWcpID0+IHtcclxuXHJcbiAgICBsZXQgc291cmNlSW5kZXggPSAwO1xyXG5cclxuICAgIGlmIChzb3VyY2VzKSB7XHJcblxyXG4gICAgICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0U291cmNlSW5kZXgoKSA9PT0gLTEpIHtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNvdXJjZXNbaV0uZGVmYXVsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZUluZGV4ID0gaTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBzb3VyY2VJbmRleCA9IHBsYXllckNvbmZpZy5nZXRTb3VyY2VJbmRleCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHNvdXJjZUluZGV4O1xyXG59IiwiaW1wb3J0IEFQSSBmcm9tICdhcGkvQXBpJztcclxuaW1wb3J0IHtpc1dlYlJUQ30gZnJvbSAndXRpbHMvdmFsaWRhdG9yJztcclxuaW1wb3J0IF8gZnJvbSAndXRpbHMvdW5kZXJzY29yZSc7XHJcbmltcG9ydCBMYSQgZnJvbSAndXRpbHMvbGlrZUEkJztcclxuaW1wb3J0IHtnZXRTY3JpcHRQYXRofSBmcm9tICd1dGlscy93ZWJwYWNrJztcclxuXHJcblxyXG5fX3dlYnBhY2tfcHVibGljX3BhdGhfXyA9IGdldFNjcmlwdFBhdGgoJ292ZW5wbGF5ZXIuc2RrLmpzJyk7XHJcblxyXG4vKipcclxuICogTWFpbiBPdmVuUGxheWVyU0RLIG9iamVjdFxyXG4gKi9cclxuY29uc3QgT3ZlblBsYXllclNESyA9IHdpbmRvdy5PdmVuUGxheWVyU0RLID0ge307XHJcblxyXG5jb25zdCBwbGF5ZXJMaXN0ID0gT3ZlblBsYXllclNESy5wbGF5ZXJMaXN0ID0gW107XHJcblxyXG5leHBvcnQgY29uc3QgY2hlY2tBbmRHZXRDb250YWluZXJFbGVtZW50ID0gZnVuY3Rpb24oY29udGFpbmVyKSB7XHJcbiAgICBpZiAoIWNvbnRhaW5lcikge1xyXG5cclxuICAgICAgICAvLyBUT0RPKHJvY2spOiBTaG91bGQgY2F1c2UgYW4gZXJyb3IuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGNvbnRhaW5lckVsZW1lbnQgPSBudWxsO1xyXG5cclxuICAgIGlmICh0eXBlb2YgY29udGFpbmVyID09PSAnc3RyaW5nJykge1xyXG5cclxuICAgICAgICBjb250YWluZXJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29udGFpbmVyKTtcclxuICAgIH0gZWxzZSBpZiAoY29udGFpbmVyLm5vZGVUeXBlKSB7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lckVsZW1lbnQgPSBjb250YWluZXI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIFRPRE8ocm9jayk6IFNob3VsZCBjYXVzZSBhbiBlcnJvci5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY29udGFpbmVyRWxlbWVudDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBwbGF5ZXIgaW5zdGFuY2UgYW5kIHJldHVybiBpdC5cclxuICpcclxuICogQHBhcmFtICAgICAge3N0cmluZyB8IGRvbSBlbGVtZW50fSBjb250YWluZXIgIElkIG9mIGNvbnRhaW5lciBlbGVtZW50IG9yIGNvbnRhaW5lciBlbGVtZW50XHJcbiAqIEBwYXJhbSAgICAgIHtvYmplY3R9IG9wdGlvbnMgIFRoZSBvcHRpb25zXHJcbiAqL1xyXG5PdmVuUGxheWVyU0RLLmNyZWF0ZSA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgb3B0aW9ucykge1xyXG5cclxuICAgIGxldCBjb250YWluZXJFbGVtZW50ID0gY2hlY2tBbmRHZXRDb250YWluZXJFbGVtZW50KGNvbnRhaW5lcik7XHJcblxyXG4gICAgY29uc3QgcGxheWVySW5zdGFuY2UgPSBBUEkoY29udGFpbmVyRWxlbWVudCk7XHJcbiAgICBwbGF5ZXJJbnN0YW5jZS5pbml0KG9wdGlvbnMpO1xyXG5cclxuICAgIHBsYXllckxpc3QucHVzaChwbGF5ZXJJbnN0YW5jZSk7XHJcblxyXG4gICAgcmV0dXJuIHBsYXllckluc3RhbmNlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIHBsYXllciBpbnN0YW5jZSBsaXN0LlxyXG4gKlxyXG4gKiBAcmV0dXJuICAgICB7YXJyYXl9ICBUaGUgcGxheWVyIGxpc3QuXHJcbiAqL1xyXG5PdmVuUGxheWVyU0RLLmdldFBsYXllckxpc3QgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICByZXR1cm4gcGxheWVyTGlzdDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBwbGF5ZXIgaW5zdGFuY2UgYnkgY29udGFpbmVyIGlkLlxyXG4gKlxyXG4gKiBAcGFyYW0gICAgICB7c3RyaW5nfSAgY29udGFpbmVySWQgIFRoZSBjb250YWluZXIgaWRlbnRpZmllclxyXG4gKiBAcmV0dXJuICAgICB7b2JlamVjdCB8IG51bGx9ICBUaGUgcGxheWVyIGluc3RhbmNlLlxyXG4gKi9cclxuT3ZlblBsYXllclNESy5nZXRQbGF5ZXJCeUNvbnRhaW5lcklkID0gZnVuY3Rpb24oY29udGFpbmVySWQpIHtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXllckxpc3QubGVuZ3RoOyBpICsrKSB7XHJcblxyXG4gICAgICAgIGlmIChwbGF5ZXJMaXN0W2ldLmdldENvbnRhaW5lcklkKCkgPT09IGNvbnRhaW5lcklkKSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcGxheWVyTGlzdFtpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgcGxheWVyIGluc3RhbmNlIGJ5IGluZGV4LlxyXG4gKlxyXG4gKiBAcGFyYW0gICAgICB7bnVtYmVyfSAgaW5kZXggICBUaGUgaW5kZXhcclxuICogQHJldHVybiAgICAge29iamVjdCB8IG51bGx9ICBUaGUgcGxheWVyIGluc3RhbmNlLlxyXG4gKi9cclxuT3ZlblBsYXllclNESy5nZXRQbGF5ZXJCeUluZGV4ID0gZnVuY3Rpb24oaW5kZXgpIHtcclxuXHJcbiAgICBjb25zdCBwbGF5ZXJJbnN0YW5jZSA9IHBsYXllckxpc3RbaW5kZXhdO1xyXG5cclxuICAgIGlmIChwbGF5ZXJJbnN0YW5jZSkge1xyXG5cclxuICAgICAgICByZXR1cm4gcGxheWVySW5zdGFuY2U7XHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgdGhlIHBsYXllciBpbnN0YW5jZSBieSBwbGF5ZXJJZC5cclxuICpcclxuICogQHBhcmFtICAgICAge3BsYXllcklkfSAgaWRcclxuICogQHJldHVybiAgICAge251bGx9XHJcbiAqL1xyXG5PdmVuUGxheWVyU0RLLnJlbW92ZVBsYXllciA9IGZ1bmN0aW9uKHBsYXllcklkKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXllckxpc3QubGVuZ3RoOyBpICsrKSB7XHJcblxyXG4gICAgICAgIGlmIChwbGF5ZXJMaXN0W2ldLmdldENvbnRhaW5lcklkKCkgPT09IHBsYXllcklkKSB7XHJcblxyXG4gICAgICAgICAgICBwbGF5ZXJMaXN0LnNwbGljZShpLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdlbmVyYXRlIHdlYnJ0YyBzb3VyY2UgZm9yIHBsYXllciBzb3VyY2UgdHlwZS5cclxuICpcclxuICogQHBhcmFtICAgICAge09iamVjdCB8IEFycmF5fSAgc291cmNlICAgd2VicnRjIHNvdXJjZVxyXG4gKiBAcmV0dXJuICAgICB7QXJyYXl9ICBQbGF5ZXIgc291cmNlIE9iamVjdC5cclxuICovXHJcbk92ZW5QbGF5ZXJTREsuZ2VuZXJhdGVXZWJydGNVcmxzID0gZnVuY3Rpb24oc291cmNlcykge1xyXG4gICAgcmV0dXJuIChfLmlzQXJyYXkoc291cmNlcykgPyBzb3VyY2VzIDogW3NvdXJjZXNdKS5tYXAoZnVuY3Rpb24oc291cmNlLCBpbmRleCl7XHJcbiAgICAgICAgaWYoc291cmNlLmhvc3QgJiYgaXNXZWJSVEMoc291cmNlLmhvc3QpICYmIHNvdXJjZS5hcHBsaWNhdGlvbiAmJiBzb3VyY2Uuc3RyZWFtKXtcclxuICAgICAgICAgICAgcmV0dXJuIHtmaWxlIDogc291cmNlLmhvc3QgKyBcIi9cIiArIHNvdXJjZS5hcHBsaWNhdGlvbiArIFwiL1wiICsgc291cmNlLnN0cmVhbSwgdHlwZSA6IFwid2VicnRjXCIsIGxhYmVsIDogc291cmNlLmxhYmVsID8gc291cmNlLmxhYmVsIDogXCJ3ZWJydGMtXCIrKGluZGV4KzEpIH07XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogV2hldGhlciBzaG93IHRoZSBwbGF5ZXIgY29yZSBsb2cgb3Igbm90LlxyXG4gKlxyXG4gKiBAcGFyYW0gICAgICB7Ym9vbGVhbn0gIGJvb2xlYW4gICBydW4gZGVidWcgbW9kZSBvciBub3QuXHJcbiAqIEByZXR1cm4gICAgIHtib29sZWFufSAgcnVuIGRlYnVnIG1vZGUgb3Igbm90LlxyXG4gKi9cclxuT3ZlblBsYXllclNESy5kZWJ1ZyA9IGZ1bmN0aW9uKGlzRGVidWdNb2RlKSB7XHJcbiAgICBpZihpc0RlYnVnTW9kZSl7XHJcbiAgICAgICAgd2luZG93Lk92ZW5QbGF5ZXJDb25zb2xlID0ge2xvZyA6IHdpbmRvd1snY29uc29sZSddWydsb2cnXX07XHJcbiAgICB9ZWxzZXtcclxuICAgICAgICB3aW5kb3cuT3ZlblBsYXllckNvbnNvbGUgPSB7bG9nIDogIGZ1bmN0aW9uKCl7fX07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaXNEZWJ1Z01vZGU7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBPdmVuUGxheWVyU0RLO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDguIDI0Li5cclxuICovXHJcblxyXG5leHBvcnQgY29uc3QgZ2V0QnJvd3Nlckxhbmd1YWdlID0gZnVuY3Rpb24oKXtcclxuICAgIGxldCBuYXYgPSB3aW5kb3cubmF2aWdhdG9yLFxyXG4gICAgICAgIGJyb3dzZXJMYW5ndWFnZVByb3BlcnR5S2V5cyA9IFsnbGFuZ3VhZ2UnLCAnYnJvd3Nlckxhbmd1YWdlJywgJ3N5c3RlbUxhbmd1YWdlJywgJ3VzZXJMYW5ndWFnZSddLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgbGFuZ3VhZ2U7XHJcblxyXG4gICAgLy8gc3VwcG9ydCBmb3IgSFRNTCA1LjEgXCJuYXZpZ2F0b3IubGFuZ3VhZ2VzXCJcclxuICAgIGlmIChBcnJheS5pc0FycmF5KG5hdi5sYW5ndWFnZXMpKSB7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IG5hdi5sYW5ndWFnZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGFuZ3VhZ2UgPSBuYXYubGFuZ3VhZ2VzW2ldO1xyXG4gICAgICAgICAgICBpZiAobGFuZ3VhZ2UgJiYgbGFuZ3VhZ2UubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbGFuZ3VhZ2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc3VwcG9ydCBmb3Igb3RoZXIgd2VsbCBrbm93biBwcm9wZXJ0aWVzIGluIGJyb3dzZXJzXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgYnJvd3Nlckxhbmd1YWdlUHJvcGVydHlLZXlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGFuZ3VhZ2UgPSBuYXZbYnJvd3Nlckxhbmd1YWdlUHJvcGVydHlLZXlzW2ldXTtcclxuICAgICAgICBpZiAobGFuZ3VhZ2UgJiYgbGFuZ3VhZ2UubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsYW5ndWFnZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBhbmFsVXNlckFnZW50ID0gZnVuY3Rpb24oKXtcclxuICAgIGxldCB1bmtub3duID0gJy0nO1xyXG5cclxuICAgIC8vIHNjcmVlblxyXG4gICAgbGV0IHNjcmVlblNpemUgPSAnJztcclxuICAgIGlmIChzY3JlZW4ud2lkdGgpIHtcclxuICAgICAgICBsZXQgd2lkdGggPSAoc2NyZWVuLndpZHRoKSA/IHNjcmVlbi53aWR0aCA6ICcnO1xyXG4gICAgICAgIGxldCBoZWlnaHQgPSAoc2NyZWVuLmhlaWdodCkgPyBzY3JlZW4uaGVpZ2h0IDogJyc7XHJcbiAgICAgICAgc2NyZWVuU2l6ZSArPSAnJyArIHdpZHRoICsgXCIgeCBcIiArIGhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBicm93c2VyXHJcbiAgICBsZXQgblZlciA9IG5hdmlnYXRvci5hcHBWZXJzaW9uO1xyXG4gICAgbGV0IG5BZ3QgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xyXG4gICAgbGV0IGJyb3dzZXIgPSBuYXZpZ2F0b3IuYXBwTmFtZTtcclxuICAgIGxldCB2ZXJzaW9uID0gJycgKyBwYXJzZUZsb2F0KG5hdmlnYXRvci5hcHBWZXJzaW9uKTtcclxuICAgIGxldCBtYWpvclZlcnNpb24gPSBwYXJzZUludChuYXZpZ2F0b3IuYXBwVmVyc2lvbiwgMTApO1xyXG4gICAgbGV0IGlzV2VidmlldyA9IGZhbHNlO1xyXG4gICAgbGV0IG5hbWVPZmZzZXQsIHZlck9mZnNldCwgaXg7XHJcblxyXG4gICAgLy8gT3BlcmFcclxuICAgIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdPcGVyYScpKSAhPSAtMSkge1xyXG4gICAgICAgIGJyb3dzZXIgPSAnT3BlcmEnO1xyXG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA2KTtcclxuICAgICAgICBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignVmVyc2lvbicpKSAhPSAtMSkge1xyXG4gICAgICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgOCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gT3BlcmEgTmV4dFxyXG4gICAgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ09QUicpKSAhPSAtMSkge1xyXG4gICAgICAgIGJyb3dzZXIgPSAnT3BlcmEnO1xyXG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA0KTtcclxuICAgIH1cclxuICAgIC8v7IK87ISxIOu4jOudvOyasOyggFxyXG4gICAgZWxzZSBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignU2Ftc3VuZ0Jyb3dzZXInKSkgIT0gLTEpIHtcclxuICAgICAgICBicm93c2VyID0gJ1NhbXN1bmdCcm93c2VyJztcclxuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgMTUpO1xyXG4gICAgfVxyXG4gICAgLy8gRWRnZVxyXG4gICAgZWxzZSBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignRWRnZScpKSAhPSAtMSkge1xyXG4gICAgICAgIGJyb3dzZXIgPSAnTWljcm9zb2Z0IEVkZ2UnO1xyXG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA1KTtcclxuICAgIH1cclxuICAgIC8vIE1TSUVcclxuICAgIGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ01TSUUnKSkgIT0gLTEpIHtcclxuICAgICAgICBicm93c2VyID0gJ01pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3Jlcic7XHJcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDUpO1xyXG5cclxuXHJcbiAgICAgICAgLy93aW43IElFMTEgdXNlckFnZW50IGlzIHVnbHkuLi4uXHJcbiAgICAgICAgaWYoIChuQWd0LmluZGV4T2YoJ1RyaWRlbnQvJykgIT09IC0xKSAmJiAobkFndC5pbmRleE9mKCdydjonKSAhPT0gLTEpICApe1xyXG4gICAgICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcobkFndC5pbmRleE9mKCdydjonKSArIDMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIENocm9tZVxyXG4gICAgZWxzZSBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignQ2hyb21lJykpICE9IC0xKSB7XHJcbiAgICAgICAgYnJvd3NlciA9ICdDaHJvbWUnO1xyXG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA3KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ0NyaU9TJykpICE9IC0xKSB7ICAgLy9pcGhvbmUgLSBjaHJvbWVcclxuICAgICAgICBicm93c2VyID0gJ0Nocm9tZSc7XHJcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDYpO1xyXG4gICAgfVxyXG4gICAgLy8gRmlyZWZveFxyXG4gICAgZWxzZSBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignRmlyZWZveCcpKSAhPSAtMSkge1xyXG4gICAgICAgIGJyb3dzZXIgPSAnRmlyZWZveCc7XHJcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDgpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignRnhpT1MnKSkgIT0gLTEpIHtcclxuICAgICAgICBicm93c2VyID0gJ0ZpcmVmb3gnO1xyXG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA2KTtcclxuICAgIH1cclxuICAgIC8vIFNhZmFyaVxyXG4gICAgZWxzZSBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignU2FmYXJpJykpICE9IC0xKSB7XHJcbiAgICAgICAgYnJvd3NlciA9ICdTYWZhcmknO1xyXG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA3KTtcclxuICAgICAgICBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignVmVyc2lvbicpKSAhPSAtMSkge1xyXG4gICAgICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgOCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyBNU0lFIDExK1xyXG4gICAgZWxzZSBpZiAobkFndC5pbmRleE9mKCdUcmlkZW50LycpICE9PSAtMSkge1xyXG4gICAgICAgIGJyb3dzZXIgPSAnTWljcm9zb2Z0IEludGVybmV0IEV4cGxvcmVyJztcclxuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcobkFndC5pbmRleE9mKCdydjonKSArIDMpO1xyXG4gICAgfVxyXG4gICAgLy8gT3RoZXIgYnJvd3NlcnNcclxuICAgIGVsc2UgaWYgKChuYW1lT2Zmc2V0ID0gbkFndC5sYXN0SW5kZXhPZignICcpICsgMSkgPCAodmVyT2Zmc2V0ID0gbkFndC5sYXN0SW5kZXhPZignLycpKSkge1xyXG4gICAgICAgIGJyb3dzZXIgPSBuQWd0LnN1YnN0cmluZyhuYW1lT2Zmc2V0LCB2ZXJPZmZzZXQpO1xyXG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyAxKTtcclxuICAgICAgICBpZiAoYnJvd3Nlci50b0xvd2VyQ2FzZSgpID09IGJyb3dzZXIudG9VcHBlckNhc2UoKSkge1xyXG4gICAgICAgICAgICBicm93c2VyID0gbmF2aWdhdG9yLmFwcE5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYobkFndC5pbmRleE9mKCcgd3YnKSA+IDApe1xyXG4gICAgICAgIGlzV2VidmlldyA9IHRydWU7XHJcbiAgICB9XHJcbiAgICAvLyB0cmltIHRoZSB2ZXJzaW9uIHN0cmluZ1xyXG4gICAgaWYgKChpeCA9IHZlcnNpb24uaW5kZXhPZignOycpKSAhPSAtMSkgdmVyc2lvbiA9IHZlcnNpb24uc3Vic3RyaW5nKDAsIGl4KTtcclxuICAgIGlmICgoaXggPSB2ZXJzaW9uLmluZGV4T2YoJyAnKSkgIT0gLTEpIHZlcnNpb24gPSB2ZXJzaW9uLnN1YnN0cmluZygwLCBpeCk7XHJcbiAgICBpZiAoKGl4ID0gdmVyc2lvbi5pbmRleE9mKCcpJykpICE9IC0xKSB2ZXJzaW9uID0gdmVyc2lvbi5zdWJzdHJpbmcoMCwgaXgpO1xyXG5cclxuICAgIG1ham9yVmVyc2lvbiA9IHBhcnNlSW50KCcnICsgdmVyc2lvbiwgMTApO1xyXG4gICAgaWYgKGlzTmFOKG1ham9yVmVyc2lvbikpIHtcclxuICAgICAgICB2ZXJzaW9uID0gJycgKyBwYXJzZUZsb2F0KG5hdmlnYXRvci5hcHBWZXJzaW9uKTtcclxuICAgICAgICBtYWpvclZlcnNpb24gPSBwYXJzZUludChuYXZpZ2F0b3IuYXBwVmVyc2lvbiwgMTApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIG1vYmlsZSB2ZXJzaW9uXHJcbiAgICB2YXIgbW9iaWxlID0gL01vYmlsZXxtaW5pfEZlbm5lY3xBbmRyb2lkfGlQKGFkfG9kfGhvbmUpLy50ZXN0KG5WZXIpO1xyXG5cclxuICAgIC8vIGNvb2tpZVxyXG4gICAgdmFyIGNvb2tpZUVuYWJsZWQgPSAobmF2aWdhdG9yLmNvb2tpZUVuYWJsZWQpID8gdHJ1ZSA6IGZhbHNlO1xyXG5cclxuICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yLmNvb2tpZUVuYWJsZWQgPT0gJ3VuZGVmaW5lZCcgJiYgIWNvb2tpZUVuYWJsZWQpIHtcclxuICAgICAgICBkb2N1bWVudC5jb29raWUgPSAndGVzdGNvb2tpZSc7XHJcbiAgICAgICAgY29va2llRW5hYmxlZCA9IChkb2N1bWVudC5jb29raWUuaW5kZXhPZigndGVzdGNvb2tpZScpICE9IC0xKSA/IHRydWUgOiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzeXN0ZW1cclxuICAgIHZhciBvcyA9IHVua25vd247XHJcbiAgICB2YXIgY2xpZW50U3RyaW5ncyA9IFtcclxuICAgICAgICB7czonV2luZG93cyAxMCcsIHI6LyhXaW5kb3dzIDEwLjB8V2luZG93cyBOVCAxMC4wKS99LFxyXG4gICAgICAgIHtzOidXaW5kb3dzIDguMScsIHI6LyhXaW5kb3dzIDguMXxXaW5kb3dzIE5UIDYuMykvfSxcclxuICAgICAgICB7czonV2luZG93cyA4JywgcjovKFdpbmRvd3MgOHxXaW5kb3dzIE5UIDYuMikvfSxcclxuICAgICAgICB7czonV2luZG93cyA3JywgcjovKFdpbmRvd3MgN3xXaW5kb3dzIE5UIDYuMSkvfSxcclxuICAgICAgICB7czonV2luZG93cyBWaXN0YScsIHI6L1dpbmRvd3MgTlQgNi4wL30sXHJcbiAgICAgICAge3M6J1dpbmRvd3MgU2VydmVyIDIwMDMnLCByOi9XaW5kb3dzIE5UIDUuMi99LFxyXG4gICAgICAgIHtzOidXaW5kb3dzIFhQJywgcjovKFdpbmRvd3MgTlQgNS4xfFdpbmRvd3MgWFApL30sXHJcbiAgICAgICAge3M6J1dpbmRvd3MgMjAwMCcsIHI6LyhXaW5kb3dzIE5UIDUuMHxXaW5kb3dzIDIwMDApL30sXHJcbiAgICAgICAge3M6J1dpbmRvd3MgTUUnLCByOi8oV2luIDl4IDQuOTB8V2luZG93cyBNRSkvfSxcclxuICAgICAgICB7czonV2luZG93cyA5OCcsIHI6LyhXaW5kb3dzIDk4fFdpbjk4KS99LFxyXG4gICAgICAgIHtzOidXaW5kb3dzIDk1JywgcjovKFdpbmRvd3MgOTV8V2luOTV8V2luZG93c185NSkvfSxcclxuICAgICAgICB7czonV2luZG93cyBOVCA0LjAnLCByOi8oV2luZG93cyBOVCA0LjB8V2luTlQ0LjB8V2luTlR8V2luZG93cyBOVCkvfSxcclxuICAgICAgICB7czonV2luZG93cyBDRScsIHI6L1dpbmRvd3MgQ0UvfSxcclxuICAgICAgICB7czonV2luZG93cyAzLjExJywgcjovV2luMTYvfSxcclxuICAgICAgICB7czonQW5kcm9pZCcsIHI6L0FuZHJvaWQvfSxcclxuICAgICAgICB7czonT3BlbiBCU0QnLCByOi9PcGVuQlNEL30sXHJcbiAgICAgICAge3M6J1N1biBPUycsIHI6L1N1bk9TL30sXHJcbiAgICAgICAge3M6J0xpbnV4JywgcjovKExpbnV4fFgxMSkvfSxcclxuICAgICAgICB7czonaU9TJywgcjovKGlQaG9uZXxpUGFkfGlQb2QpL30sXHJcbiAgICAgICAge3M6J01hYyBPUyBYSScsIHI6L01hYyBPUyBYIDExL30sXHJcbiAgICAgICAge3M6J01hYyBPUyBYJywgcjovTWFjIE9TIFggMTAvfSxcclxuICAgICAgICB7czonTWFjIE9TJywgcjovKE1hY1BQQ3xNYWNJbnRlbHxNYWNfUG93ZXJQQ3xNYWNpbnRvc2gpL30sXHJcbiAgICAgICAge3M6J1FOWCcsIHI6L1FOWC99LFxyXG4gICAgICAgIHtzOidVTklYJywgcjovVU5JWC99LFxyXG4gICAgICAgIHtzOidCZU9TJywgcjovQmVPUy99LFxyXG4gICAgICAgIHtzOidPUy8yJywgcjovT1NcXC8yL30sXHJcbiAgICAgICAge3M6J1NlYXJjaCBCb3QnLCByOi8obnVoa3xHb29nbGVib3R8WWFtbXlib3R8T3BlbmJvdHxTbHVycHxNU05Cb3R8QXNrIEplZXZlc1xcL1Rlb21hfGlhX2FyY2hpdmVyKS99XHJcbiAgICBdO1xyXG4gICAgZm9yICh2YXIgaWQgaW4gY2xpZW50U3RyaW5ncykge1xyXG4gICAgICAgIHZhciBjcyA9IGNsaWVudFN0cmluZ3NbaWRdO1xyXG4gICAgICAgIGlmIChjcy5yLnRlc3QobkFndCkpIHtcclxuICAgICAgICAgICAgb3MgPSBjcy5zO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG9zVmVyc2lvbiA9IHVua25vd247XHJcblxyXG4gICAgaWYgKC9XaW5kb3dzLy50ZXN0KG9zKSkge1xyXG4gICAgICAgIG9zVmVyc2lvbiA9IC9XaW5kb3dzICguKikvLmV4ZWMob3MpWzFdO1xyXG4gICAgICAgIG9zID0gJ1dpbmRvd3MnO1xyXG4gICAgfVxyXG5cclxuICAgIHN3aXRjaCAob3MpIHtcclxuICAgICAgICBjYXNlICdNYWMgT1MgWEknOlxyXG4gICAgICAgICAgICBvc1ZlcnNpb24gPSAvTWFjIE9TIFggKDExW1xcLlxcX1xcZF0rKS8uZXhlYyhuQWd0KVsxXTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgJ01hYyBPUyBYJzpcclxuICAgICAgICAgICAgb3NWZXJzaW9uID0gL01hYyBPUyBYICgxMFtcXC5cXF9cXGRdKykvLmV4ZWMobkFndClbMV07XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlICdBbmRyb2lkJzpcclxuICAgICAgICAgICAgb3NWZXJzaW9uID0gL0FuZHJvaWQgKFtcXC5cXF9cXGRdKykvLmV4ZWMobkFndClbMV07XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlICdpT1MnOlxyXG4gICAgICAgICAgICBvc1ZlcnNpb24gPSAvT1MgKFxcZCspXyhcXGQrKV8/KFxcZCspPy8uZXhlYyhuVmVyKTtcclxuICAgICAgICAgICAgb3NWZXJzaW9uID0gb3NWZXJzaW9uWzFdICsgJy4nICsgb3NWZXJzaW9uWzJdICsgJy4nICsgKG9zVmVyc2lvblszXSB8IDApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHNjcmVlbjogc2NyZWVuU2l6ZSxcclxuICAgICAgICBicm93c2VyOiBicm93c2VyLFxyXG4gICAgICAgIGJyb3dzZXJWZXJzaW9uOiB2ZXJzaW9uLFxyXG4gICAgICAgIGJyb3dzZXJNYWpvclZlcnNpb246IG1ham9yVmVyc2lvbixcclxuICAgICAgICBtb2JpbGU6IG1vYmlsZSxcclxuICAgICAgICB1YSA6IG5BZ3QsXHJcbiAgICAgICAgb3M6IG9zLFxyXG4gICAgICAgIG9zVmVyc2lvbjogb3NWZXJzaW9uLFxyXG4gICAgICAgIGNvb2tpZXM6IGNvb2tpZUVuYWJsZWRcclxuICAgIH07XHJcbn07XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgMjAxMyB2dHQuanMgQ29udHJpYnV0b3JzXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbmxldCBWVFRDdWUgPSB3aW5kb3cuVlRUQ3VlO1xyXG5cclxudmFyIGF1dG9LZXl3b3JkID0gXCJhdXRvXCI7XHJcbnZhciBkaXJlY3Rpb25TZXR0aW5nID0ge1xyXG4gICAgXCJcIjogdHJ1ZSxcclxuICAgIFwibHJcIjogdHJ1ZSxcclxuICAgIFwicmxcIjogdHJ1ZVxyXG59O1xyXG52YXIgYWxpZ25TZXR0aW5nID0ge1xyXG4gICAgXCJzdGFydFwiOiB0cnVlLFxyXG4gICAgXCJtaWRkbGVcIjogdHJ1ZSxcclxuICAgIFwiZW5kXCI6IHRydWUsXHJcbiAgICBcImxlZnRcIjogdHJ1ZSxcclxuICAgIFwicmlnaHRcIjogdHJ1ZVxyXG59O1xyXG5cclxuZnVuY3Rpb24gZmluZERpcmVjdGlvblNldHRpbmcodmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB2YXIgZGlyID0gZGlyZWN0aW9uU2V0dGluZ1t2YWx1ZS50b0xvd2VyQ2FzZSgpXTtcclxuICAgIHJldHVybiBkaXIgPyB2YWx1ZS50b0xvd2VyQ2FzZSgpIDogZmFsc2U7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbmRBbGlnblNldHRpbmcodmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB2YXIgYWxpZ24gPSBhbGlnblNldHRpbmdbdmFsdWUudG9Mb3dlckNhc2UoKV07XHJcbiAgICByZXR1cm4gYWxpZ24gPyB2YWx1ZS50b0xvd2VyQ2FzZSgpIDogZmFsc2U7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGV4dGVuZChvYmopIHtcclxuICAgIHZhciBpID0gMTtcclxuICAgIGZvciAoOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGNvYmogPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBjb2JqKSB7XHJcbiAgICAgICAgICAgIG9ialtwXSA9IGNvYmpbcF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvYmo7XHJcbn1cclxuaWYoIVZUVEN1ZSl7XHJcbiAgICBWVFRDdWUgPSBmdW5jdGlvbiAoc3RhcnRUaW1lLCBlbmRUaW1lLCB0ZXh0KSB7XHJcbiAgICAgICAgdmFyIGN1ZSA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGlzSUU4ID0gKC9NU0lFXFxzOFxcLjAvKS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xyXG4gICAgICAgIHZhciBiYXNlT2JqID0ge307XHJcblxyXG4gICAgICAgIGlmIChpc0lFOCkge1xyXG4gICAgICAgICAgICBjdWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjdXN0b20nKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBiYXNlT2JqLmVudW1lcmFibGUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2hpbSBpbXBsZW1lbnRhdGlvbiBzcGVjaWZpYyBwcm9wZXJ0aWVzLiBUaGVzZSBwcm9wZXJ0aWVzIGFyZSBub3QgaW5cclxuICAgICAgICAgKiB0aGUgc3BlYy5cclxuICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgICAgIC8vIExldHMgdXMga25vdyB3aGVuIHRoZSBWVFRDdWUncyBkYXRhIGhhcyBjaGFuZ2VkIGluIHN1Y2ggYSB3YXkgdGhhdCB3ZSBuZWVkXHJcbiAgICAgICAgICAgIC8vIHRvIHJlY29tcHV0ZSBpdHMgZGlzcGxheSBzdGF0ZS4gVGhpcyBsZXRzIHVzIGNvbXB1dGUgaXRzIGRpc3BsYXkgc3RhdGVcclxuICAgICAgICAgICAgLy8gbGF6aWx5LlxyXG4gICAgICAgIGN1ZS5oYXNCZWVuUmVzZXQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVlRUQ3VlIGFuZCBUZXh0VHJhY2tDdWUgcHJvcGVydGllc1xyXG4gICAgICAgICAqIGh0dHA6Ly9kZXYudzMub3JnL2h0bWw1L3dlYnZ0dC8jdnR0Y3VlLWludGVyZmFjZVxyXG4gICAgICAgICAqL1xyXG5cclxuICAgICAgICB2YXIgX2lkID0gXCJcIjtcclxuICAgICAgICB2YXIgX3BhdXNlT25FeGl0ID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIF9zdGFydFRpbWUgPSBzdGFydFRpbWU7XHJcbiAgICAgICAgdmFyIF9lbmRUaW1lID0gZW5kVGltZTtcclxuICAgICAgICB2YXIgX3RleHQgPSB0ZXh0O1xyXG4gICAgICAgIHZhciBfcmVnaW9uID0gbnVsbDtcclxuICAgICAgICB2YXIgX3ZlcnRpY2FsID0gXCJcIjtcclxuICAgICAgICB2YXIgX3NuYXBUb0xpbmVzID0gdHJ1ZTtcclxuICAgICAgICB2YXIgX2xpbmUgPSBcImF1dG9cIjtcclxuICAgICAgICB2YXIgX2xpbmVBbGlnbiA9IFwic3RhcnRcIjtcclxuICAgICAgICB2YXIgX3Bvc2l0aW9uID0gNTA7XHJcbiAgICAgICAgdmFyIF9wb3NpdGlvbkFsaWduID0gXCJtaWRkbGVcIjtcclxuICAgICAgICB2YXIgX3NpemUgPSA1MDtcclxuICAgICAgICB2YXIgX2FsaWduID0gXCJtaWRkbGVcIjtcclxuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcclxuICAgICAgICAgICAgXCJpZFwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9pZDtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2lkID0gXCJcIiArIHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXHJcbiAgICAgICAgICAgIFwicGF1c2VPbkV4aXRcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcGF1c2VPbkV4aXQ7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9wYXVzZU9uRXhpdCA9ICEhdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcclxuICAgICAgICAgICAgXCJzdGFydFRpbWVcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfc3RhcnRUaW1lO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdGFydCB0aW1lIG11c3QgYmUgc2V0IHRvIGEgbnVtYmVyLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgX3N0YXJ0VGltZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxyXG4gICAgICAgICAgICBcImVuZFRpbWVcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfZW5kVGltZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRW5kIHRpbWUgbXVzdCBiZSBzZXQgdG8gYSBudW1iZXIuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBfZW5kVGltZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxyXG4gICAgICAgICAgICBcInRleHRcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGV4dDtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RleHQgPSBcIlwiICsgdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXHJcbiAgICAgICAgICAgIFwicmVnaW9uXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZ2lvbjtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3JlZ2lvbiA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxyXG4gICAgICAgICAgICBcInZlcnRpY2FsXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZlcnRpY2FsO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2V0dGluZyA9IGZpbmREaXJlY3Rpb25TZXR0aW5nKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBIYXZlIHRvIGNoZWNrIGZvciBmYWxzZSBiZWNhdXNlIHRoZSBzZXR0aW5nIGFuIGJlIGFuIGVtcHR5IHN0cmluZy5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2V0dGluZyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKFwiQW4gaW52YWxpZCBvciBpbGxlZ2FsIHN0cmluZyB3YXMgc3BlY2lmaWVkLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgX3ZlcnRpY2FsID0gc2V0dGluZztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcclxuICAgICAgICAgICAgXCJzbmFwVG9MaW5lc1wiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9zbmFwVG9MaW5lcztcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3NuYXBUb0xpbmVzID0gISF2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcclxuICAgICAgICAgICAgXCJsaW5lXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2xpbmU7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwibnVtYmVyXCIgJiYgdmFsdWUgIT09IGF1dG9LZXl3b3JkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihcIkFuIGludmFsaWQgbnVtYmVyIG9yIGlsbGVnYWwgc3RyaW5nIHdhcyBzcGVjaWZpZWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBfbGluZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxyXG4gICAgICAgICAgICBcImxpbmVBbGlnblwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9saW5lQWxpZ247XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZXR0aW5nID0gZmluZEFsaWduU2V0dGluZyh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzZXR0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihcIkFuIGludmFsaWQgb3IgaWxsZWdhbCBzdHJpbmcgd2FzIHNwZWNpZmllZC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF9saW5lQWxpZ24gPSBzZXR0aW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxyXG4gICAgICAgICAgICBcInBvc2l0aW9uXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3Bvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPCAwIHx8IHZhbHVlID4gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBvc2l0aW9uIG11c3QgYmUgYmV0d2VlbiAwIGFuZCAxMDAuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBfcG9zaXRpb24gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcclxuICAgICAgICAgICAgXCJwb3NpdGlvbkFsaWduXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3Bvc2l0aW9uQWxpZ247XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZXR0aW5nID0gZmluZEFsaWduU2V0dGluZyh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzZXR0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihcIkFuIGludmFsaWQgb3IgaWxsZWdhbCBzdHJpbmcgd2FzIHNwZWNpZmllZC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF9wb3NpdGlvbkFsaWduID0gc2V0dGluZztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcclxuICAgICAgICAgICAgXCJzaXplXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3NpemU7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA8IDAgfHwgdmFsdWUgPiAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2l6ZSBtdXN0IGJlIGJldHdlZW4gMCBhbmQgMTAwLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgX3NpemUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcclxuICAgICAgICAgICAgXCJhbGlnblwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9hbGlnbjtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNldHRpbmcgPSBmaW5kQWxpZ25TZXR0aW5nKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXNldHRpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKFwiQW4gaW52YWxpZCBvciBpbGxlZ2FsIHN0cmluZyB3YXMgc3BlY2lmaWVkLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgX2FsaWduID0gc2V0dGluZztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT3RoZXIgPHRyYWNrPiBzcGVjIGRlZmluZWQgcHJvcGVydGllc1xyXG4gICAgICAgICAqL1xyXG5cclxuICAgICAgICAgICAgLy8gaHR0cDovL3d3dy53aGF0d2cub3JnL3NwZWNzL3dlYi1hcHBzL2N1cnJlbnQtd29yay9tdWx0aXBhZ2UvdGhlLXZpZGVvLWVsZW1lbnQuaHRtbCN0ZXh0LXRyYWNrLWN1ZS1kaXNwbGF5LXN0YXRlXHJcbiAgICAgICAgY3VlLmRpc3BsYXlTdGF0ZSA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgaWYgKGlzSUU4KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVlRUQ3VlIG1ldGhvZHNcclxuICAgICAqL1xyXG5cclxuICAgIFZUVEN1ZS5wcm90b3R5cGUuZ2V0Q3VlQXNIVE1MID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gQXNzdW1lIFdlYlZUVC5jb252ZXJ0Q3VlVG9ET01UcmVlIGlzIG9uIHRoZSBnbG9iYWwuXHJcbiAgICAgICAgcmV0dXJuIFdlYlZUVC5jb252ZXJ0Q3VlVG9ET01UcmVlKHdpbmRvdywgdGhpcy50ZXh0KTtcclxuICAgIH07XHJcblxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVlRUQ3VlOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMjMuLlxyXG4gKi9cclxuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBJdCB3YXMgcmVwbGFjZSBqcXVlcnkncyBzZWxlY3Rvci4gSXQgT2Z0ZW4gdXNlZCBieSBPdmVuVGVtcGxhdGUuICgvdmlldy9lbmdpbmUvT3ZlblRlbXBsYXRlLmpzKVxyXG4gKiBAcGFyYW0gICBzZWxlY3Rvck9yRWxlbWVudCAgc3RyaW5nIG9yIGVsZW1lbnRcclxuICpcclxuICogKi9cclxuXHJcblxyXG5jb25zdCBMYSQgPSBmdW5jdGlvbihzZWxlY3Rvck9yRWxlbWVudCl7XHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICBjb25zdCByZXR1cm5Ob2RlID0gZnVuY3Rpb24oJGVsZW1lbnQgLCBzZWxlY3Rvcil7XHJcbiAgICAgICAgbGV0IG5vZGVMaXN0ID0gICRlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG4gICAgICAgIGlmKG5vZGVMaXN0Lmxlbmd0aCA+IDEpe1xyXG4gICAgICAgICAgICByZXR1cm4gbm9kZUxpc3Q7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlTGlzdFswXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgJGVsZW1lbnQgPSBcIlwiO1xyXG5cclxuICAgIGlmKCBfLmlzRWxlbWVudChzZWxlY3Rvck9yRWxlbWVudCkgfHwgXy5ldmVyeShzZWxlY3Rvck9yRWxlbWVudCwgZnVuY3Rpb24oaXRlbSl7cmV0dXJuIF8uaXNFbGVtZW50KGl0ZW0pfSkpe1xyXG4gICAgICAgICRlbGVtZW50ID0gc2VsZWN0b3JPckVsZW1lbnQ7XHJcbiAgICB9ZWxzZSBpZihzZWxlY3Rvck9yRWxlbWVudCA9PT0gXCJkb2N1bWVudFwiKXtcclxuICAgICAgICAkZWxlbWVudCA9IGRvY3VtZW50O1xyXG4gICAgfWVsc2UgaWYoc2VsZWN0b3JPckVsZW1lbnQgPT09IFwid2luZG93XCIpe1xyXG4gICAgICAgICRlbGVtZW50ID0gd2luZG93O1xyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgJGVsZW1lbnQgPSByZXR1cm5Ob2RlKGRvY3VtZW50LCBzZWxlY3Rvck9yRWxlbWVudCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGlmKCEkZWxlbWVudCl7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLypFRkZFQ1RTKi9cclxuXHJcbiAgICB0aGF0LnNob3cgPSAoKSA9PntcclxuICAgICAgICAkZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5oaWRlID0gKCkgPT57XHJcbiAgICAgICAgJGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIH07XHJcblxyXG4gICAgLypFTEVNRU5UUyovXHJcblxyXG4gICAgdGhhdC5hZGRDbGFzcyA9IChuYW1lKSA9PntcclxuICAgICAgICBpZigkZWxlbWVudC5jbGFzc0xpc3Qpe1xyXG4gICAgICAgICAgICAkZWxlbWVudC5jbGFzc0xpc3QuYWRkKG5hbWUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgY2xhc3NOYW1lcyA9ICRlbGVtZW50LmNsYXNzTmFtZS5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgICAgIGlmKGNsYXNzTmFtZXMuaW5kZXhPZihuYW1lKSA9PT0gLTEpe1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuY2xhc3NOYW1lICs9IFwiIFwiICsgbmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5hZnRlciA9IChodG1sU3RyaW5nKSA9PiB7XHJcbiAgICAgICAgJGVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmVuZCcsIGh0bWxTdHJpbmcpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmFwcGVuZCA9IChodG1sU3RyaW5nKSA9PiB7XHJcbiAgICAgICAgJGVsZW1lbnQuYXBwZW5kQ2hpbGQoaHRtbFN0cmluZyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuYmVmb3JlID0gKGh0bWxTdHJpbmcpID0+IHtcclxuICAgICAgICAkZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWJlZ2luJywgaHRtbFN0cmluZyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuY2hpbGRyZW4gPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICRlbGVtZW50LmNoaWxkcmVuIHx8IFtdO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL1RoZSBjb250YWlucygpIG1ldGhvZCByZXR1cm5zIGEgQm9vbGVhbiB2YWx1ZSBpbmRpY2F0aW5nIHdoZXRoZXIgYSBub2RlIGlzIGEgZGVzY2VuZGFudCBvZiBhIHNwZWNpZmllZCBub2RlLlxyXG4gICAgLy9BIGRlc2NlbmRhbnQgY2FuIGJlIGEgY2hpbGQsIGdyYW5kY2hpbGQsIGdyZWF0LWdyYW5kY2hpbGQsIGFuZCBzbyBvbi5cclxuICAgIHRoYXQuY29udGFpbnMgPSAoZWxDaGlsZCkgPT4ge1xyXG4gICAgICAgIHJldHVybiAkZWxlbWVudCAhPT0gZWxDaGlsZCAmJiAkZWxlbWVudC5jb250YWlucyhlbENoaWxkKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5lbXB0eSA9ICgpID0+IHtcclxuICAgICAgICAkZWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhhdC5maW5kID0gKHNlbGVjdG9yKSA9PntcclxuICAgICAgICByZXR1cm4gTGEkKHJldHVybk5vZGUoJGVsZW1lbnQsIHNlbGVjdG9yKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuY3NzID0gKG5hbWUsIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgaWYodmFsdWUpe1xyXG4gICAgICAgICAgICBpZigkZWxlbWVudC5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCl7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZVtuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5zdHlsZVtuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiAkZWxlbWVudC5zdHlsZVtuYW1lXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcblxyXG5cclxuICAgIHRoYXQucmVtb3ZlQ2xhc3MgPSAobmFtZSkgPT57XHJcbiAgICAgICAgaWYgKCRlbGVtZW50LmNsYXNzTGlzdCl7XHJcbiAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUobmFtZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTmFtZSA9ICRlbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAoJyhefFxcXFxiKScgKyBuYW1lLnNwbGl0KCcgJykuam9pbignfCcpICsgJyhcXFxcYnwkKScsICdnaScpLCAnICcpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucmVtb3ZlQXR0cmlidXRlID0gKGF0dHJOYW1lKSA9PiB7XHJcbiAgICAgICAgJGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKTtcclxuICAgIH07XHJcblxyXG5cclxuXHJcbiAgICAvKnRoYXQuYXBwZW5kID0gKGh0bWxDb2RlKSA9PntcclxuICAgICAgICAkZWxlbWVudC5pbm5lckhUTUwgKz0gaHRtbENvZGU7XHJcbiAgICB9OyovXHJcblxyXG4gICAgdGhhdC50ZXh0ID0gKHRleHQpID0+IHsgLy9JRTgrXHJcbiAgICAgICAgaWYodGV4dCA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuICRlbGVtZW50LnRleHRDb250ZW50O1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAkZWxlbWVudC50ZXh0Q29udGVudCA9IHRleHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoYXQuaHRtbCA9IChodG1sU3RyaW5nKSA9PiB7XHJcbiAgICAgICAgJGVsZW1lbnQuaW5uZXJIVE1MID0gaHRtbFN0cmluZztcclxuICAgIH07XHJcbiAgICB0aGF0Lmhhc0NsYXNzID0gKG5hbWUpID0+IHsgLy9JRTgrXHJcbiAgICAgICAgaWYoJGVsZW1lbnQuY2xhc3NMaXN0KXtcclxuICAgICAgICAgICAgcmV0dXJuICRlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhuYW1lKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoJyhefCApJyArIG5hbWUgKyAnKCB8JCknLCAnZ2knKS50ZXN0KCRlbGVtZW50Lm5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5pcyA9ICgkdGFyZ2V0RWxlbWVudCkgPT4ge1xyXG4gICAgICAgIC8qdmFyIG1hdGNoZXMgPSBmdW5jdGlvbihlbCwgc2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChlbC5tYXRjaGVzIHx8IGVsLm1hdGNoZXNTZWxlY3RvciB8fCBlbC5tc01hdGNoZXNTZWxlY3RvciB8fCBlbC5tb3pNYXRjaGVzU2VsZWN0b3IgfHwgZWwud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8IGVsLm9NYXRjaGVzU2VsZWN0b3IpLmNhbGwoZWwsIHNlbGVjdG9yKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBtYXRjaGVzKGVsLCAnLm15LWNsYXNzJyk7Ki9cclxuICAgICAgICByZXR1cm4gJGVsZW1lbnQgPT09ICR0YXJnZXRFbGVtZW50O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0Lm9mZnNldCA9ICgpID0+eyAgICAvL0lFOCtcclxuICAgICAgICB2YXIgcmVjdCA9ICRlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0b3A6IHJlY3QudG9wICsgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AsXHJcbiAgICAgICAgICAgIGxlZnQ6IHJlY3QubGVmdCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdFxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC53aWR0aCA9ICgpID0+IHsgICAgLy9JRTgrXHJcbiAgICAgICAgcmV0dXJuICRlbGVtZW50LmNsaWVudFdpZHRoO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmhlaWdodCA9ICgpID0+IHsgICAvL0lFOCtcclxuICAgICAgICByZXR1cm4gJGVsZW1lbnQuY2xpZW50SGVpZ2h0O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmF0dHIgPSAoYXR0cikgPT4ge1xyXG4gICAgICAgIHJldHVybiAkZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cik7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucmVwbGFjZSA9IChodG1sKSA9PiB7XHJcbiAgICAgICAgJGVsZW1lbnQucmVwbGFjZVdpdGgoaHRtbCk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB0aGF0LnJlbW92ZSA9ICgpID0+IHtcclxuICAgICAgICBpZigkZWxlbWVudC5sZW5ndGggPiAxKXtcclxuICAgICAgICAgICAgJGVsZW1lbnQucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZCgkZWxlbWVudCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucmVtb3ZlQ2hpbGQgPSAoZWxlbWVudCkgPT4ge1xyXG4gICAgICAgIGlmKGVsZW1lbnQpe1xyXG4gICAgICAgICAgICAkZWxlbWVudC5yZW1vdmVDaGlsZChlbGVtZW50KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgd2hpbGUgKCRlbGVtZW50Lmhhc0NoaWxkTm9kZXMoKSkge1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlQ2hpbGQoJGVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldCA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gJGVsZW1lbnQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuY2xvc2VzdCA9IChzZWxlY3RvclN0cmluZykgPT4ge1xyXG5cclxuICAgICAgICAkZWxlbWVudC5jbG9zZXN0ID0gZnVuY3Rpb24gKHMpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBlbCA9ICRlbGVtZW50O1xyXG5cclxuICAgICAgICAgICAgZG8ge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChlbC5tYXRjaGVzKHMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGVsID0gZWwucGFyZW50RWxlbWVudCB8fCBlbC5wYXJlbnROb2RlO1xyXG5cclxuICAgICAgICAgICAgfSB3aGlsZSAoZWwgIT09IG51bGwgJiYgZWwubm9kZVR5cGUgPT09IDEpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGV0IGNsb3Nlc3RFbGVtZW50ID0gJGVsZW1lbnQuY2xvc2VzdChzZWxlY3RvclN0cmluZyk7XHJcblxyXG4gICAgICAgIGlmKGNsb3Nlc3RFbGVtZW50KXtcclxuICAgICAgICAgICAgcmV0dXJuIExhJChjbG9zZXN0RWxlbWVudCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMYSQ7XHJcbiIsImltcG9ydCBfIGZyb20gJy4vdW5kZXJzY29yZSc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdHJpbShzdHJpbmcpIHtcclxuICAgIHJldHVybiBzdHJpbmcgPyBzdHJpbmcucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpIDogXCJcIjtcclxufVxyXG5cclxuLyoqXHJcbiAqIGV4dHJhY3RFeHRlbnNpb25cclxuICpcclxuICogQHBhcmFtICAgICAge3N0cmluZ30gcGF0aCBmb3IgdXJsXHJcbiAqIEByZXR1cm4gICAgIHtzdHJpbmd9ICBFeHRlbnNpb25cclxuICovXHJcbmV4cG9ydCBjb25zdCBleHRyYWN0RXh0ZW5zaW9uID0gZnVuY3Rpb24ocGF0aCkge1xyXG4gICAgaWYoIXBhdGggfHwgcGF0aC5zdWJzdHIoMCw0KT09J3J0bXAnKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBnZXRBenVyZUZpbGVGb3JtYXQocGF0aCkge1xyXG4gICAgICAgIGxldCBleHRlbnNpb24gPSBcIlwiO1xyXG4gICAgICAgIGlmICgoL1soLF1mb3JtYXQ9bXBkLS9pKS50ZXN0KHBhdGgpKSB7XHJcbiAgICAgICAgICAgIGV4dGVuc2lvbiA9ICdtcGQnO1xyXG4gICAgICAgIH1lbHNlIGlmICgoL1soLF1mb3JtYXQ9bTN1OC0vaSkudGVzdChwYXRoKSkge1xyXG4gICAgICAgICAgICBleHRlbnNpb24gPSAnbTN1OCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBleHRlbnNpb247XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGF6dXJlZEZvcm1hdCA9IGdldEF6dXJlRmlsZUZvcm1hdChwYXRoKTtcclxuICAgIGlmKGF6dXJlZEZvcm1hdCkge1xyXG4gICAgICAgIHJldHVybiBhenVyZWRGb3JtYXQ7XHJcbiAgICB9XHJcbiAgICBwYXRoID0gcGF0aC5zcGxpdCgnPycpWzBdLnNwbGl0KCcjJylbMF07XHJcbiAgICBpZihwYXRoLmxhc3RJbmRleE9mKCcuJykgPiAtMSkge1xyXG4gICAgICAgIHJldHVybiBwYXRoLnN1YnN0cihwYXRoLmxhc3RJbmRleE9mKCcuJykgKyAxLCBwYXRoLmxlbmd0aCkudG9Mb3dlckNhc2UoKTtcclxuICAgIH1lbHNle1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBuYXR1cmFsSG1zXHJcbiAqXHJcbiAqIEBwYXJhbSAgICAgIHtudW1iZXIgfCBzdHJpbmd9ICBzZWNvbmQgIFRoZSBzZWNvbmRcclxuICogQHJldHVybiAgICAge3N0cmluZ30gIGZvcm1hdHRlZCBTdHJpbmdcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBuYXR1cmFsSG1zKHNlY29uZCkge1xyXG4gICAgbGV0IHNlY051bSA9IHBhcnNlSW50KHNlY29uZCwgMTApO1xyXG4gICAgaWYoIXNlY29uZCl7XHJcbiAgICAgICAgcmV0dXJuIFwiMDA6MDBcIjtcclxuICAgIH1cclxuICAgIGxldCBob3VycyAgID0gTWF0aC5mbG9vcihzZWNOdW0gLyAzNjAwKTtcclxuICAgIGxldCBtaW51dGVzID0gTWF0aC5mbG9vcigoc2VjTnVtIC0gKGhvdXJzICogMzYwMCkpIC8gNjApO1xyXG4gICAgbGV0IHNlY29uZHMgPSBzZWNOdW0gLSAoaG91cnMgKiAzNjAwKSAtIChtaW51dGVzICogNjApO1xyXG5cclxuICAgIC8vaWYgKGhvdXJzID4gMCkge21pbnV0ZXMgPSBcIjBcIittaW51dGVzO31cclxuICAgIGlmIChtaW51dGVzIDwgMTApIHttaW51dGVzID0gXCIwXCIrbWludXRlczt9XHJcbiAgICBpZiAoc2Vjb25kcyA8IDEwKSB7c2Vjb25kcyA9IFwiMFwiK3NlY29uZHM7fVxyXG5cclxuICAgIGlmIChob3VycyA+IDApIHtcclxuICAgICAgICByZXR1cm4gaG91cnMrJzonK21pbnV0ZXMrJzonK3NlY29uZHM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBtaW51dGVzKyc6JytzZWNvbmRzO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhtc1RvU2Vjb25kKHN0ciwgZnJhbWVSYXRlKSB7XHJcbiAgICBpZighc3RyKSB7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbiAgICBpZihfLmlzTnVtYmVyKHN0cikgJiYgIV8uaXNOYU4oc3RyKSl7XHJcbiAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgIH1cclxuICAgIHN0ciA9IHN0ci5yZXBsYWNlKCcsJywgJy4nKTtcclxuICAgIGxldCBhcnIgPSBzdHIuc3BsaXQoJzonKTtcclxuICAgIGxldCBhcnJMZW5ndGggPSBhcnIubGVuZ3RoO1xyXG4gICAgbGV0IHNlYyA9IDA7XHJcbiAgICBpZiAoc3RyLnNsaWNlKC0xKSA9PT0gJ3MnKXtcclxuICAgICAgICBzZWMgPSBwYXJzZUZsb2F0KHN0cik7XHJcbiAgICB9ZWxzZSBpZiAoc3RyLnNsaWNlKC0xKSA9PT0gJ20nKXtcclxuICAgICAgICBzZWMgPSBwYXJzZUZsb2F0KHN0cikgKiA2MDtcclxuICAgIH1lbHNlIGlmIChzdHIuc2xpY2UoLTEpID09PSAnaCcpe1xyXG4gICAgICAgIHNlYyA9IHBhcnNlRmxvYXQoc3RyKSAqIDM2MDA7XHJcbiAgICB9ZWxzZSBpZiAoYXJyTGVuZ3RoID4gMSkge1xyXG4gICAgICAgIHZhciBzZWNJbmRleCA9IGFyckxlbmd0aCAtIDE7XHJcbiAgICAgICAgaWYgKGFyckxlbmd0aCA9PT0gNCkge1xyXG4gICAgICAgICAgICBpZiAoZnJhbWVSYXRlKSB7XHJcbiAgICAgICAgICAgICAgICBzZWMgPSBwYXJzZUZsb2F0KGFycltzZWNJbmRleF0pIC8gZnJhbWVSYXRlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlY0luZGV4IC09IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlYyArPSBwYXJzZUZsb2F0KGFycltzZWNJbmRleF0pO1xyXG4gICAgICAgIHNlYyArPSBwYXJzZUZsb2F0KGFycltzZWNJbmRleCAtIDFdKSAqIDYwO1xyXG4gICAgICAgIGlmIChhcnJMZW5ndGggPj0gMykge1xyXG4gICAgICAgICAgICBzZWMgKz0gcGFyc2VGbG9hdChhcnJbc2VjSW5kZXggLSAyXSkgKiAzNjAwO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2VjID0gcGFyc2VGbG9hdChzdHIpO1xyXG4gICAgfVxyXG4gICAgaWYgKF8uaXNOYU4oc2VjKSkge1xyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNlYztcclxufSIsIi8vICAgICBVbmRlcnNjb3JlLmpzIDEuOS4xXHJcbi8vICAgICBodHRwOi8vdW5kZXJzY29yZWpzLm9yZ1xyXG4vLyAgICAgKGMpIDIwMDktMjAxOCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xyXG4vLyAgICAgVW5kZXJzY29yZSBtYXkgYmUgZnJlZWx5IGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cclxuIWZ1bmN0aW9uKCl7dmFyIG49XCJvYmplY3RcIj09dHlwZW9mIHNlbGYmJnNlbGYuc2VsZj09PXNlbGYmJnNlbGZ8fFwib2JqZWN0XCI9PXR5cGVvZiBnbG9iYWwmJmdsb2JhbC5nbG9iYWw9PT1nbG9iYWwmJmdsb2JhbHx8dGhpc3x8e30scj1uLl8sZT1BcnJheS5wcm90b3R5cGUsbz1PYmplY3QucHJvdG90eXBlLHM9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFN5bWJvbD9TeW1ib2wucHJvdG90eXBlOm51bGwsdT1lLnB1c2gsYz1lLnNsaWNlLHA9by50b1N0cmluZyxpPW8uaGFzT3duUHJvcGVydHksdD1BcnJheS5pc0FycmF5LGE9T2JqZWN0LmtleXMsbD1PYmplY3QuY3JlYXRlLGY9ZnVuY3Rpb24oKXt9LGg9ZnVuY3Rpb24obil7cmV0dXJuIG4gaW5zdGFuY2VvZiBoP246dGhpcyBpbnN0YW5jZW9mIGg/dm9pZCh0aGlzLl93cmFwcGVkPW4pOm5ldyBoKG4pfTtcInVuZGVmaW5lZFwiPT10eXBlb2YgZXhwb3J0c3x8ZXhwb3J0cy5ub2RlVHlwZT9uLl89aDooXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZSYmIW1vZHVsZS5ub2RlVHlwZSYmbW9kdWxlLmV4cG9ydHMmJihleHBvcnRzPW1vZHVsZS5leHBvcnRzPWgpLGV4cG9ydHMuXz1oKSxoLlZFUlNJT049XCIxLjkuMVwiO3ZhciB2LHk9ZnVuY3Rpb24odSxpLG4pe2lmKHZvaWQgMD09PWkpcmV0dXJuIHU7c3dpdGNoKG51bGw9PW4/MzpuKXtjYXNlIDE6cmV0dXJuIGZ1bmN0aW9uKG4pe3JldHVybiB1LmNhbGwoaSxuKX07Y2FzZSAzOnJldHVybiBmdW5jdGlvbihuLHIsdCl7cmV0dXJuIHUuY2FsbChpLG4scix0KX07Y2FzZSA0OnJldHVybiBmdW5jdGlvbihuLHIsdCxlKXtyZXR1cm4gdS5jYWxsKGksbixyLHQsZSl9fXJldHVybiBmdW5jdGlvbigpe3JldHVybiB1LmFwcGx5KGksYXJndW1lbnRzKX19LGQ9ZnVuY3Rpb24obixyLHQpe3JldHVybiBoLml0ZXJhdGVlIT09dj9oLml0ZXJhdGVlKG4scik6bnVsbD09bj9oLmlkZW50aXR5OmguaXNGdW5jdGlvbihuKT95KG4scix0KTpoLmlzT2JqZWN0KG4pJiYhaC5pc0FycmF5KG4pP2gubWF0Y2hlcihuKTpoLnByb3BlcnR5KG4pfTtoLml0ZXJhdGVlPXY9ZnVuY3Rpb24obixyKXtyZXR1cm4gZChuLHIsMS8wKX07dmFyIGc9ZnVuY3Rpb24odSxpKXtyZXR1cm4gaT1udWxsPT1pP3UubGVuZ3RoLTE6K2ksZnVuY3Rpb24oKXtmb3IodmFyIG49TWF0aC5tYXgoYXJndW1lbnRzLmxlbmd0aC1pLDApLHI9QXJyYXkobiksdD0wO3Q8bjt0Kyspclt0XT1hcmd1bWVudHNbdCtpXTtzd2l0Y2goaSl7Y2FzZSAwOnJldHVybiB1LmNhbGwodGhpcyxyKTtjYXNlIDE6cmV0dXJuIHUuY2FsbCh0aGlzLGFyZ3VtZW50c1swXSxyKTtjYXNlIDI6cmV0dXJuIHUuY2FsbCh0aGlzLGFyZ3VtZW50c1swXSxhcmd1bWVudHNbMV0scil9dmFyIGU9QXJyYXkoaSsxKTtmb3IodD0wO3Q8aTt0KyspZVt0XT1hcmd1bWVudHNbdF07cmV0dXJuIGVbaV09cix1LmFwcGx5KHRoaXMsZSl9fSxtPWZ1bmN0aW9uKG4pe2lmKCFoLmlzT2JqZWN0KG4pKXJldHVybnt9O2lmKGwpcmV0dXJuIGwobik7Zi5wcm90b3R5cGU9bjt2YXIgcj1uZXcgZjtyZXR1cm4gZi5wcm90b3R5cGU9bnVsbCxyfSxiPWZ1bmN0aW9uKHIpe3JldHVybiBmdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09bj92b2lkIDA6bltyXX19LGo9ZnVuY3Rpb24obixyKXtyZXR1cm4gbnVsbCE9biYmaS5jYWxsKG4scil9LHg9ZnVuY3Rpb24obixyKXtmb3IodmFyIHQ9ci5sZW5ndGgsZT0wO2U8dDtlKyspe2lmKG51bGw9PW4pcmV0dXJuO249bltyW2VdXX1yZXR1cm4gdD9uOnZvaWQgMH0sXz1NYXRoLnBvdygyLDUzKS0xLEE9YihcImxlbmd0aFwiKSx3PWZ1bmN0aW9uKG4pe3ZhciByPUEobik7cmV0dXJuXCJudW1iZXJcIj09dHlwZW9mIHImJjA8PXImJnI8PV99O2guZWFjaD1oLmZvckVhY2g9ZnVuY3Rpb24obixyLHQpe3ZhciBlLHU7aWYocj15KHIsdCksdyhuKSlmb3IoZT0wLHU9bi5sZW5ndGg7ZTx1O2UrKylyKG5bZV0sZSxuKTtlbHNle3ZhciBpPWgua2V5cyhuKTtmb3IoZT0wLHU9aS5sZW5ndGg7ZTx1O2UrKylyKG5baVtlXV0saVtlXSxuKX1yZXR1cm4gbn0saC5tYXA9aC5jb2xsZWN0PWZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGU9IXcobikmJmgua2V5cyhuKSx1PShlfHxuKS5sZW5ndGgsaT1BcnJheSh1KSxvPTA7bzx1O28rKyl7dmFyIGE9ZT9lW29dOm87aVtvXT1yKG5bYV0sYSxuKX1yZXR1cm4gaX07dmFyIE89ZnVuY3Rpb24oYyl7cmV0dXJuIGZ1bmN0aW9uKG4scix0LGUpe3ZhciB1PTM8PWFyZ3VtZW50cy5sZW5ndGg7cmV0dXJuIGZ1bmN0aW9uKG4scix0LGUpe3ZhciB1PSF3KG4pJiZoLmtleXMobiksaT0odXx8bikubGVuZ3RoLG89MDxjPzA6aS0xO2ZvcihlfHwodD1uW3U/dVtvXTpvXSxvKz1jKTswPD1vJiZvPGk7bys9Yyl7dmFyIGE9dT91W29dOm87dD1yKHQsblthXSxhLG4pfXJldHVybiB0fShuLHkocixlLDQpLHQsdSl9fTtoLnJlZHVjZT1oLmZvbGRsPWguaW5qZWN0PU8oMSksaC5yZWR1Y2VSaWdodD1oLmZvbGRyPU8oLTEpLGguZmluZD1oLmRldGVjdD1mdW5jdGlvbihuLHIsdCl7dmFyIGU9KHcobik/aC5maW5kSW5kZXg6aC5maW5kS2V5KShuLHIsdCk7aWYodm9pZCAwIT09ZSYmLTEhPT1lKXJldHVybiBuW2VdfSxoLmZpbHRlcj1oLnNlbGVjdD1mdW5jdGlvbihuLGUscil7dmFyIHU9W107cmV0dXJuIGU9ZChlLHIpLGguZWFjaChuLGZ1bmN0aW9uKG4scix0KXtlKG4scix0KSYmdS5wdXNoKG4pfSksdX0saC5yZWplY3Q9ZnVuY3Rpb24obixyLHQpe3JldHVybiBoLmZpbHRlcihuLGgubmVnYXRlKGQocikpLHQpfSxoLmV2ZXJ5PWguYWxsPWZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGU9IXcobikmJmgua2V5cyhuKSx1PShlfHxuKS5sZW5ndGgsaT0wO2k8dTtpKyspe3ZhciBvPWU/ZVtpXTppO2lmKCFyKG5bb10sbyxuKSlyZXR1cm4hMX1yZXR1cm4hMH0saC5zb21lPWguYW55PWZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGU9IXcobikmJmgua2V5cyhuKSx1PShlfHxuKS5sZW5ndGgsaT0wO2k8dTtpKyspe3ZhciBvPWU/ZVtpXTppO2lmKHIobltvXSxvLG4pKXJldHVybiEwfXJldHVybiExfSxoLmNvbnRhaW5zPWguaW5jbHVkZXM9aC5pbmNsdWRlPWZ1bmN0aW9uKG4scix0LGUpe3JldHVybiB3KG4pfHwobj1oLnZhbHVlcyhuKSksKFwibnVtYmVyXCIhPXR5cGVvZiB0fHxlKSYmKHQ9MCksMDw9aC5pbmRleE9mKG4scix0KX0saC5pbnZva2U9ZyhmdW5jdGlvbihuLHQsZSl7dmFyIHUsaTtyZXR1cm4gaC5pc0Z1bmN0aW9uKHQpP2k9dDpoLmlzQXJyYXkodCkmJih1PXQuc2xpY2UoMCwtMSksdD10W3QubGVuZ3RoLTFdKSxoLm1hcChuLGZ1bmN0aW9uKG4pe3ZhciByPWk7aWYoIXIpe2lmKHUmJnUubGVuZ3RoJiYobj14KG4sdSkpLG51bGw9PW4pcmV0dXJuO3I9blt0XX1yZXR1cm4gbnVsbD09cj9yOnIuYXBwbHkobixlKX0pfSksaC5wbHVjaz1mdW5jdGlvbihuLHIpe3JldHVybiBoLm1hcChuLGgucHJvcGVydHkocikpfSxoLndoZXJlPWZ1bmN0aW9uKG4scil7cmV0dXJuIGguZmlsdGVyKG4saC5tYXRjaGVyKHIpKX0saC5maW5kV2hlcmU9ZnVuY3Rpb24obixyKXtyZXR1cm4gaC5maW5kKG4saC5tYXRjaGVyKHIpKX0saC5tYXg9ZnVuY3Rpb24obixlLHIpe3ZhciB0LHUsaT0tMS8wLG89LTEvMDtpZihudWxsPT1lfHxcIm51bWJlclwiPT10eXBlb2YgZSYmXCJvYmplY3RcIiE9dHlwZW9mIG5bMF0mJm51bGwhPW4pZm9yKHZhciBhPTAsYz0obj13KG4pP246aC52YWx1ZXMobikpLmxlbmd0aDthPGM7YSsrKW51bGwhPSh0PW5bYV0pJiZpPHQmJihpPXQpO2Vsc2UgZT1kKGUsciksaC5lYWNoKG4sZnVuY3Rpb24obixyLHQpe3U9ZShuLHIsdCksKG88dXx8dT09PS0xLzAmJmk9PT0tMS8wKSYmKGk9bixvPXUpfSk7cmV0dXJuIGl9LGgubWluPWZ1bmN0aW9uKG4sZSxyKXt2YXIgdCx1LGk9MS8wLG89MS8wO2lmKG51bGw9PWV8fFwibnVtYmVyXCI9PXR5cGVvZiBlJiZcIm9iamVjdFwiIT10eXBlb2YgblswXSYmbnVsbCE9bilmb3IodmFyIGE9MCxjPShuPXcobik/bjpoLnZhbHVlcyhuKSkubGVuZ3RoO2E8YzthKyspbnVsbCE9KHQ9blthXSkmJnQ8aSYmKGk9dCk7ZWxzZSBlPWQoZSxyKSxoLmVhY2gobixmdW5jdGlvbihuLHIsdCl7KCh1PWUobixyLHQpKTxvfHx1PT09MS8wJiZpPT09MS8wKSYmKGk9bixvPXUpfSk7cmV0dXJuIGl9LGguc2h1ZmZsZT1mdW5jdGlvbihuKXtyZXR1cm4gaC5zYW1wbGUobiwxLzApfSxoLnNhbXBsZT1mdW5jdGlvbihuLHIsdCl7aWYobnVsbD09cnx8dClyZXR1cm4gdyhuKXx8KG49aC52YWx1ZXMobikpLG5baC5yYW5kb20obi5sZW5ndGgtMSldO3ZhciBlPXcobik/aC5jbG9uZShuKTpoLnZhbHVlcyhuKSx1PUEoZSk7cj1NYXRoLm1heChNYXRoLm1pbihyLHUpLDApO2Zvcih2YXIgaT11LTEsbz0wO288cjtvKyspe3ZhciBhPWgucmFuZG9tKG8saSksYz1lW29dO2Vbb109ZVthXSxlW2FdPWN9cmV0dXJuIGUuc2xpY2UoMCxyKX0saC5zb3J0Qnk9ZnVuY3Rpb24obixlLHIpe3ZhciB1PTA7cmV0dXJuIGU9ZChlLHIpLGgucGx1Y2soaC5tYXAobixmdW5jdGlvbihuLHIsdCl7cmV0dXJue3ZhbHVlOm4saW5kZXg6dSsrLGNyaXRlcmlhOmUobixyLHQpfX0pLnNvcnQoZnVuY3Rpb24obixyKXt2YXIgdD1uLmNyaXRlcmlhLGU9ci5jcml0ZXJpYTtpZih0IT09ZSl7aWYoZTx0fHx2b2lkIDA9PT10KXJldHVybiAxO2lmKHQ8ZXx8dm9pZCAwPT09ZSlyZXR1cm4tMX1yZXR1cm4gbi5pbmRleC1yLmluZGV4fSksXCJ2YWx1ZVwiKX07dmFyIGs9ZnVuY3Rpb24obyxyKXtyZXR1cm4gZnVuY3Rpb24oZSx1LG4pe3ZhciBpPXI/W1tdLFtdXTp7fTtyZXR1cm4gdT1kKHUsbiksaC5lYWNoKGUsZnVuY3Rpb24obixyKXt2YXIgdD11KG4scixlKTtvKGksbix0KX0pLGl9fTtoLmdyb3VwQnk9ayhmdW5jdGlvbihuLHIsdCl7aihuLHQpP25bdF0ucHVzaChyKTpuW3RdPVtyXX0pLGguaW5kZXhCeT1rKGZ1bmN0aW9uKG4scix0KXtuW3RdPXJ9KSxoLmNvdW50Qnk9ayhmdW5jdGlvbihuLHIsdCl7aihuLHQpP25bdF0rKzpuW3RdPTF9KTt2YXIgUz0vW15cXHVkODAwLVxcdWRmZmZdfFtcXHVkODAwLVxcdWRiZmZdW1xcdWRjMDAtXFx1ZGZmZl18W1xcdWQ4MDAtXFx1ZGZmZl0vZztoLnRvQXJyYXk9ZnVuY3Rpb24obil7cmV0dXJuIG4/aC5pc0FycmF5KG4pP2MuY2FsbChuKTpoLmlzU3RyaW5nKG4pP24ubWF0Y2goUyk6dyhuKT9oLm1hcChuLGguaWRlbnRpdHkpOmgudmFsdWVzKG4pOltdfSxoLnNpemU9ZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PW4/MDp3KG4pP24ubGVuZ3RoOmgua2V5cyhuKS5sZW5ndGh9LGgucGFydGl0aW9uPWsoZnVuY3Rpb24obixyLHQpe25bdD8wOjFdLnB1c2gocil9LCEwKSxoLmZpcnN0PWguaGVhZD1oLnRha2U9ZnVuY3Rpb24obixyLHQpe3JldHVybiBudWxsPT1ufHxuLmxlbmd0aDwxP251bGw9PXI/dm9pZCAwOltdOm51bGw9PXJ8fHQ/blswXTpoLmluaXRpYWwobixuLmxlbmd0aC1yKX0saC5pbml0aWFsPWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gYy5jYWxsKG4sMCxNYXRoLm1heCgwLG4ubGVuZ3RoLShudWxsPT1yfHx0PzE6cikpKX0saC5sYXN0PWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gbnVsbD09bnx8bi5sZW5ndGg8MT9udWxsPT1yP3ZvaWQgMDpbXTpudWxsPT1yfHx0P25bbi5sZW5ndGgtMV06aC5yZXN0KG4sTWF0aC5tYXgoMCxuLmxlbmd0aC1yKSl9LGgucmVzdD1oLnRhaWw9aC5kcm9wPWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gYy5jYWxsKG4sbnVsbD09cnx8dD8xOnIpfSxoLmNvbXBhY3Q9ZnVuY3Rpb24obil7cmV0dXJuIGguZmlsdGVyKG4sQm9vbGVhbil9O3ZhciBNPWZ1bmN0aW9uKG4scix0LGUpe2Zvcih2YXIgdT0oZT1lfHxbXSkubGVuZ3RoLGk9MCxvPUEobik7aTxvO2krKyl7dmFyIGE9bltpXTtpZih3KGEpJiYoaC5pc0FycmF5KGEpfHxoLmlzQXJndW1lbnRzKGEpKSlpZihyKWZvcih2YXIgYz0wLGw9YS5sZW5ndGg7YzxsOyllW3UrK109YVtjKytdO2Vsc2UgTShhLHIsdCxlKSx1PWUubGVuZ3RoO2Vsc2UgdHx8KGVbdSsrXT1hKX1yZXR1cm4gZX07aC5mbGF0dGVuPWZ1bmN0aW9uKG4scil7cmV0dXJuIE0obixyLCExKX0saC53aXRob3V0PWcoZnVuY3Rpb24obixyKXtyZXR1cm4gaC5kaWZmZXJlbmNlKG4scil9KSxoLnVuaXE9aC51bmlxdWU9ZnVuY3Rpb24obixyLHQsZSl7aC5pc0Jvb2xlYW4ocil8fChlPXQsdD1yLHI9ITEpLG51bGwhPXQmJih0PWQodCxlKSk7Zm9yKHZhciB1PVtdLGk9W10sbz0wLGE9QShuKTtvPGE7bysrKXt2YXIgYz1uW29dLGw9dD90KGMsbyxuKTpjO3ImJiF0PyhvJiZpPT09bHx8dS5wdXNoKGMpLGk9bCk6dD9oLmNvbnRhaW5zKGksbCl8fChpLnB1c2gobCksdS5wdXNoKGMpKTpoLmNvbnRhaW5zKHUsYyl8fHUucHVzaChjKX1yZXR1cm4gdX0saC51bmlvbj1nKGZ1bmN0aW9uKG4pe3JldHVybiBoLnVuaXEoTShuLCEwLCEwKSl9KSxoLmludGVyc2VjdGlvbj1mdW5jdGlvbihuKXtmb3IodmFyIHI9W10sdD1hcmd1bWVudHMubGVuZ3RoLGU9MCx1PUEobik7ZTx1O2UrKyl7dmFyIGk9bltlXTtpZighaC5jb250YWlucyhyLGkpKXt2YXIgbztmb3Iobz0xO288dCYmaC5jb250YWlucyhhcmd1bWVudHNbb10saSk7bysrKTtvPT09dCYmci5wdXNoKGkpfX1yZXR1cm4gcn0saC5kaWZmZXJlbmNlPWcoZnVuY3Rpb24obixyKXtyZXR1cm4gcj1NKHIsITAsITApLGguZmlsdGVyKG4sZnVuY3Rpb24obil7cmV0dXJuIWguY29udGFpbnMocixuKX0pfSksaC51bnppcD1mdW5jdGlvbihuKXtmb3IodmFyIHI9biYmaC5tYXgobixBKS5sZW5ndGh8fDAsdD1BcnJheShyKSxlPTA7ZTxyO2UrKyl0W2VdPWgucGx1Y2sobixlKTtyZXR1cm4gdH0saC56aXA9ZyhoLnVuemlwKSxoLm9iamVjdD1mdW5jdGlvbihuLHIpe2Zvcih2YXIgdD17fSxlPTAsdT1BKG4pO2U8dTtlKyspcj90W25bZV1dPXJbZV06dFtuW2VdWzBdXT1uW2VdWzFdO3JldHVybiB0fTt2YXIgRj1mdW5jdGlvbihpKXtyZXR1cm4gZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT1BKG4pLHU9MDxpPzA6ZS0xOzA8PXUmJnU8ZTt1Kz1pKWlmKHIoblt1XSx1LG4pKXJldHVybiB1O3JldHVybi0xfX07aC5maW5kSW5kZXg9RigxKSxoLmZpbmRMYXN0SW5kZXg9RigtMSksaC5zb3J0ZWRJbmRleD1mdW5jdGlvbihuLHIsdCxlKXtmb3IodmFyIHU9KHQ9ZCh0LGUsMSkpKHIpLGk9MCxvPUEobik7aTxvOyl7dmFyIGE9TWF0aC5mbG9vcigoaStvKS8yKTt0KG5bYV0pPHU/aT1hKzE6bz1hfXJldHVybiBpfTt2YXIgRT1mdW5jdGlvbihpLG8sYSl7cmV0dXJuIGZ1bmN0aW9uKG4scix0KXt2YXIgZT0wLHU9QShuKTtpZihcIm51bWJlclwiPT10eXBlb2YgdCkwPGk/ZT0wPD10P3Q6TWF0aC5tYXgodCt1LGUpOnU9MDw9dD9NYXRoLm1pbih0KzEsdSk6dCt1KzE7ZWxzZSBpZihhJiZ0JiZ1KXJldHVybiBuW3Q9YShuLHIpXT09PXI/dDotMTtpZihyIT1yKXJldHVybiAwPD0odD1vKGMuY2FsbChuLGUsdSksaC5pc05hTikpP3QrZTotMTtmb3IodD0wPGk/ZTp1LTE7MDw9dCYmdDx1O3QrPWkpaWYoblt0XT09PXIpcmV0dXJuIHQ7cmV0dXJuLTF9fTtoLmluZGV4T2Y9RSgxLGguZmluZEluZGV4LGguc29ydGVkSW5kZXgpLGgubGFzdEluZGV4T2Y9RSgtMSxoLmZpbmRMYXN0SW5kZXgpLGgucmFuZ2U9ZnVuY3Rpb24obixyLHQpe251bGw9PXImJihyPW58fDAsbj0wKSx0fHwodD1yPG4/LTE6MSk7Zm9yKHZhciBlPU1hdGgubWF4KE1hdGguY2VpbCgoci1uKS90KSwwKSx1PUFycmF5KGUpLGk9MDtpPGU7aSsrLG4rPXQpdVtpXT1uO3JldHVybiB1fSxoLmNodW5rPWZ1bmN0aW9uKG4scil7aWYobnVsbD09cnx8cjwxKXJldHVybltdO2Zvcih2YXIgdD1bXSxlPTAsdT1uLmxlbmd0aDtlPHU7KXQucHVzaChjLmNhbGwobixlLGUrPXIpKTtyZXR1cm4gdH07dmFyIE49ZnVuY3Rpb24obixyLHQsZSx1KXtpZighKGUgaW5zdGFuY2VvZiByKSlyZXR1cm4gbi5hcHBseSh0LHUpO3ZhciBpPW0obi5wcm90b3R5cGUpLG89bi5hcHBseShpLHUpO3JldHVybiBoLmlzT2JqZWN0KG8pP286aX07aC5iaW5kPWcoZnVuY3Rpb24ocix0LGUpe2lmKCFoLmlzRnVuY3Rpb24ocikpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkJpbmQgbXVzdCBiZSBjYWxsZWQgb24gYSBmdW5jdGlvblwiKTt2YXIgdT1nKGZ1bmN0aW9uKG4pe3JldHVybiBOKHIsdSx0LHRoaXMsZS5jb25jYXQobikpfSk7cmV0dXJuIHV9KSxoLnBhcnRpYWw9ZyhmdW5jdGlvbih1LGkpe3ZhciBvPWgucGFydGlhbC5wbGFjZWhvbGRlcixhPWZ1bmN0aW9uKCl7Zm9yKHZhciBuPTAscj1pLmxlbmd0aCx0PUFycmF5KHIpLGU9MDtlPHI7ZSsrKXRbZV09aVtlXT09PW8/YXJndW1lbnRzW24rK106aVtlXTtmb3IoO248YXJndW1lbnRzLmxlbmd0aDspdC5wdXNoKGFyZ3VtZW50c1tuKytdKTtyZXR1cm4gTih1LGEsdGhpcyx0aGlzLHQpfTtyZXR1cm4gYX0pLChoLnBhcnRpYWwucGxhY2Vob2xkZXI9aCkuYmluZEFsbD1nKGZ1bmN0aW9uKG4scil7dmFyIHQ9KHI9TShyLCExLCExKSkubGVuZ3RoO2lmKHQ8MSl0aHJvdyBuZXcgRXJyb3IoXCJiaW5kQWxsIG11c3QgYmUgcGFzc2VkIGZ1bmN0aW9uIG5hbWVzXCIpO2Zvcig7dC0tOyl7dmFyIGU9clt0XTtuW2VdPWguYmluZChuW2VdLG4pfX0pLGgubWVtb2l6ZT1mdW5jdGlvbihlLHUpe3ZhciBpPWZ1bmN0aW9uKG4pe3ZhciByPWkuY2FjaGUsdD1cIlwiKyh1P3UuYXBwbHkodGhpcyxhcmd1bWVudHMpOm4pO3JldHVybiBqKHIsdCl8fChyW3RdPWUuYXBwbHkodGhpcyxhcmd1bWVudHMpKSxyW3RdfTtyZXR1cm4gaS5jYWNoZT17fSxpfSxoLmRlbGF5PWcoZnVuY3Rpb24obixyLHQpe3JldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7cmV0dXJuIG4uYXBwbHkobnVsbCx0KX0scil9KSxoLmRlZmVyPWgucGFydGlhbChoLmRlbGF5LGgsMSksaC50aHJvdHRsZT1mdW5jdGlvbih0LGUsdSl7dmFyIGksbyxhLGMsbD0wO3V8fCh1PXt9KTt2YXIgZj1mdW5jdGlvbigpe2w9ITE9PT11LmxlYWRpbmc/MDpoLm5vdygpLGk9bnVsbCxjPXQuYXBwbHkobyxhKSxpfHwobz1hPW51bGwpfSxuPWZ1bmN0aW9uKCl7dmFyIG49aC5ub3coKTtsfHwhMSE9PXUubGVhZGluZ3x8KGw9bik7dmFyIHI9ZS0obi1sKTtyZXR1cm4gbz10aGlzLGE9YXJndW1lbnRzLHI8PTB8fGU8cj8oaSYmKGNsZWFyVGltZW91dChpKSxpPW51bGwpLGw9bixjPXQuYXBwbHkobyxhKSxpfHwobz1hPW51bGwpKTppfHwhMT09PXUudHJhaWxpbmd8fChpPXNldFRpbWVvdXQoZixyKSksY307cmV0dXJuIG4uY2FuY2VsPWZ1bmN0aW9uKCl7Y2xlYXJUaW1lb3V0KGkpLGw9MCxpPW89YT1udWxsfSxufSxoLmRlYm91bmNlPWZ1bmN0aW9uKHQsZSx1KXt2YXIgaSxvLGE9ZnVuY3Rpb24obixyKXtpPW51bGwsciYmKG89dC5hcHBseShuLHIpKX0sbj1nKGZ1bmN0aW9uKG4pe2lmKGkmJmNsZWFyVGltZW91dChpKSx1KXt2YXIgcj0haTtpPXNldFRpbWVvdXQoYSxlKSxyJiYobz10LmFwcGx5KHRoaXMsbikpfWVsc2UgaT1oLmRlbGF5KGEsZSx0aGlzLG4pO3JldHVybiBvfSk7cmV0dXJuIG4uY2FuY2VsPWZ1bmN0aW9uKCl7Y2xlYXJUaW1lb3V0KGkpLGk9bnVsbH0sbn0saC53cmFwPWZ1bmN0aW9uKG4scil7cmV0dXJuIGgucGFydGlhbChyLG4pfSxoLm5lZ2F0ZT1mdW5jdGlvbihuKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4hbi5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fSxoLmNvbXBvc2U9ZnVuY3Rpb24oKXt2YXIgdD1hcmd1bWVudHMsZT10Lmxlbmd0aC0xO3JldHVybiBmdW5jdGlvbigpe2Zvcih2YXIgbj1lLHI9dFtlXS5hcHBseSh0aGlzLGFyZ3VtZW50cyk7bi0tOylyPXRbbl0uY2FsbCh0aGlzLHIpO3JldHVybiByfX0saC5hZnRlcj1mdW5jdGlvbihuLHIpe3JldHVybiBmdW5jdGlvbigpe2lmKC0tbjwxKXJldHVybiByLmFwcGx5KHRoaXMsYXJndW1lbnRzKX19LGguYmVmb3JlPWZ1bmN0aW9uKG4scil7dmFyIHQ7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIDA8LS1uJiYodD1yLmFwcGx5KHRoaXMsYXJndW1lbnRzKSksbjw9MSYmKHI9bnVsbCksdH19LGgub25jZT1oLnBhcnRpYWwoaC5iZWZvcmUsMiksaC5yZXN0QXJndW1lbnRzPWc7dmFyIEk9IXt0b1N0cmluZzpudWxsfS5wcm9wZXJ0eUlzRW51bWVyYWJsZShcInRvU3RyaW5nXCIpLFQ9W1widmFsdWVPZlwiLFwiaXNQcm90b3R5cGVPZlwiLFwidG9TdHJpbmdcIixcInByb3BlcnR5SXNFbnVtZXJhYmxlXCIsXCJoYXNPd25Qcm9wZXJ0eVwiLFwidG9Mb2NhbGVTdHJpbmdcIl0sQj1mdW5jdGlvbihuLHIpe3ZhciB0PVQubGVuZ3RoLGU9bi5jb25zdHJ1Y3Rvcix1PWguaXNGdW5jdGlvbihlKSYmZS5wcm90b3R5cGV8fG8saT1cImNvbnN0cnVjdG9yXCI7Zm9yKGoobixpKSYmIWguY29udGFpbnMocixpKSYmci5wdXNoKGkpO3QtLTspKGk9VFt0XSlpbiBuJiZuW2ldIT09dVtpXSYmIWguY29udGFpbnMocixpKSYmci5wdXNoKGkpfTtoLmtleXM9ZnVuY3Rpb24obil7aWYoIWguaXNPYmplY3QobikpcmV0dXJuW107aWYoYSlyZXR1cm4gYShuKTt2YXIgcj1bXTtmb3IodmFyIHQgaW4gbilqKG4sdCkmJnIucHVzaCh0KTtyZXR1cm4gSSYmQihuLHIpLHJ9LGguYWxsS2V5cz1mdW5jdGlvbihuKXtpZighaC5pc09iamVjdChuKSlyZXR1cm5bXTt2YXIgcj1bXTtmb3IodmFyIHQgaW4gbilyLnB1c2godCk7cmV0dXJuIEkmJkIobixyKSxyfSxoLnZhbHVlcz1mdW5jdGlvbihuKXtmb3IodmFyIHI9aC5rZXlzKG4pLHQ9ci5sZW5ndGgsZT1BcnJheSh0KSx1PTA7dTx0O3UrKyllW3VdPW5bclt1XV07cmV0dXJuIGV9LGgubWFwT2JqZWN0PWZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGU9aC5rZXlzKG4pLHU9ZS5sZW5ndGgsaT17fSxvPTA7bzx1O28rKyl7dmFyIGE9ZVtvXTtpW2FdPXIoblthXSxhLG4pfXJldHVybiBpfSxoLnBhaXJzPWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj1oLmtleXMobiksdD1yLmxlbmd0aCxlPUFycmF5KHQpLHU9MDt1PHQ7dSsrKWVbdV09W3JbdV0sbltyW3VdXV07cmV0dXJuIGV9LGguaW52ZXJ0PWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj17fSx0PWgua2V5cyhuKSxlPTAsdT10Lmxlbmd0aDtlPHU7ZSsrKXJbblt0W2VdXV09dFtlXTtyZXR1cm4gcn0saC5mdW5jdGlvbnM9aC5tZXRob2RzPWZ1bmN0aW9uKG4pe3ZhciByPVtdO2Zvcih2YXIgdCBpbiBuKWguaXNGdW5jdGlvbihuW3RdKSYmci5wdXNoKHQpO3JldHVybiByLnNvcnQoKX07dmFyIFI9ZnVuY3Rpb24oYyxsKXtyZXR1cm4gZnVuY3Rpb24obil7dmFyIHI9YXJndW1lbnRzLmxlbmd0aDtpZihsJiYobj1PYmplY3QobikpLHI8Mnx8bnVsbD09bilyZXR1cm4gbjtmb3IodmFyIHQ9MTt0PHI7dCsrKWZvcih2YXIgZT1hcmd1bWVudHNbdF0sdT1jKGUpLGk9dS5sZW5ndGgsbz0wO288aTtvKyspe3ZhciBhPXVbb107bCYmdm9pZCAwIT09blthXXx8KG5bYV09ZVthXSl9cmV0dXJuIG59fTtoLmV4dGVuZD1SKGguYWxsS2V5cyksaC5leHRlbmRPd249aC5hc3NpZ249UihoLmtleXMpLGguZmluZEtleT1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlLHU9aC5rZXlzKG4pLGk9MCxvPXUubGVuZ3RoO2k8bztpKyspaWYocihuW2U9dVtpXV0sZSxuKSlyZXR1cm4gZX07dmFyIHEsSyx6PWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gciBpbiB0fTtoLnBpY2s9ZyhmdW5jdGlvbihuLHIpe3ZhciB0PXt9LGU9clswXTtpZihudWxsPT1uKXJldHVybiB0O2guaXNGdW5jdGlvbihlKT8oMTxyLmxlbmd0aCYmKGU9eShlLHJbMV0pKSxyPWguYWxsS2V5cyhuKSk6KGU9eixyPU0ociwhMSwhMSksbj1PYmplY3QobikpO2Zvcih2YXIgdT0wLGk9ci5sZW5ndGg7dTxpO3UrKyl7dmFyIG89clt1XSxhPW5bb107ZShhLG8sbikmJih0W29dPWEpfXJldHVybiB0fSksaC5vbWl0PWcoZnVuY3Rpb24obix0KXt2YXIgcixlPXRbMF07cmV0dXJuIGguaXNGdW5jdGlvbihlKT8oZT1oLm5lZ2F0ZShlKSwxPHQubGVuZ3RoJiYocj10WzFdKSk6KHQ9aC5tYXAoTSh0LCExLCExKSxTdHJpbmcpLGU9ZnVuY3Rpb24obixyKXtyZXR1cm4haC5jb250YWlucyh0LHIpfSksaC5waWNrKG4sZSxyKX0pLGguZGVmYXVsdHM9UihoLmFsbEtleXMsITApLGguY3JlYXRlPWZ1bmN0aW9uKG4scil7dmFyIHQ9bShuKTtyZXR1cm4gciYmaC5leHRlbmRPd24odCxyKSx0fSxoLmNsb25lPWZ1bmN0aW9uKG4pe3JldHVybiBoLmlzT2JqZWN0KG4pP2guaXNBcnJheShuKT9uLnNsaWNlKCk6aC5leHRlbmQoe30sbik6bn0saC50YXA9ZnVuY3Rpb24obixyKXtyZXR1cm4gcihuKSxufSxoLmlzTWF0Y2g9ZnVuY3Rpb24obixyKXt2YXIgdD1oLmtleXMociksZT10Lmxlbmd0aDtpZihudWxsPT1uKXJldHVybiFlO2Zvcih2YXIgdT1PYmplY3QobiksaT0wO2k8ZTtpKyspe3ZhciBvPXRbaV07aWYocltvXSE9PXVbb118fCEobyBpbiB1KSlyZXR1cm4hMX1yZXR1cm4hMH0scT1mdW5jdGlvbihuLHIsdCxlKXtpZihuPT09cilyZXR1cm4gMCE9PW58fDEvbj09MS9yO2lmKG51bGw9PW58fG51bGw9PXIpcmV0dXJuITE7aWYobiE9bilyZXR1cm4gciE9cjt2YXIgdT10eXBlb2YgbjtyZXR1cm4oXCJmdW5jdGlvblwiPT09dXx8XCJvYmplY3RcIj09PXV8fFwib2JqZWN0XCI9PXR5cGVvZiByKSYmSyhuLHIsdCxlKX0sSz1mdW5jdGlvbihuLHIsdCxlKXtuIGluc3RhbmNlb2YgaCYmKG49bi5fd3JhcHBlZCksciBpbnN0YW5jZW9mIGgmJihyPXIuX3dyYXBwZWQpO3ZhciB1PXAuY2FsbChuKTtpZih1IT09cC5jYWxsKHIpKXJldHVybiExO3N3aXRjaCh1KXtjYXNlXCJbb2JqZWN0IFJlZ0V4cF1cIjpjYXNlXCJbb2JqZWN0IFN0cmluZ11cIjpyZXR1cm5cIlwiK249PVwiXCIrcjtjYXNlXCJbb2JqZWN0IE51bWJlcl1cIjpyZXR1cm4rbiE9K24/K3IhPStyOjA9PStuPzEvK249PTEvcjorbj09K3I7Y2FzZVwiW29iamVjdCBEYXRlXVwiOmNhc2VcIltvYmplY3QgQm9vbGVhbl1cIjpyZXR1cm4rbj09K3I7Y2FzZVwiW29iamVjdCBTeW1ib2xdXCI6cmV0dXJuIHMudmFsdWVPZi5jYWxsKG4pPT09cy52YWx1ZU9mLmNhbGwocil9dmFyIGk9XCJbb2JqZWN0IEFycmF5XVwiPT09dTtpZighaSl7aWYoXCJvYmplY3RcIiE9dHlwZW9mIG58fFwib2JqZWN0XCIhPXR5cGVvZiByKXJldHVybiExO3ZhciBvPW4uY29uc3RydWN0b3IsYT1yLmNvbnN0cnVjdG9yO2lmKG8hPT1hJiYhKGguaXNGdW5jdGlvbihvKSYmbyBpbnN0YW5jZW9mIG8mJmguaXNGdW5jdGlvbihhKSYmYSBpbnN0YW5jZW9mIGEpJiZcImNvbnN0cnVjdG9yXCJpbiBuJiZcImNvbnN0cnVjdG9yXCJpbiByKXJldHVybiExfWU9ZXx8W107Zm9yKHZhciBjPSh0PXR8fFtdKS5sZW5ndGg7Yy0tOylpZih0W2NdPT09bilyZXR1cm4gZVtjXT09PXI7aWYodC5wdXNoKG4pLGUucHVzaChyKSxpKXtpZigoYz1uLmxlbmd0aCkhPT1yLmxlbmd0aClyZXR1cm4hMTtmb3IoO2MtLTspaWYoIXEobltjXSxyW2NdLHQsZSkpcmV0dXJuITF9ZWxzZXt2YXIgbCxmPWgua2V5cyhuKTtpZihjPWYubGVuZ3RoLGgua2V5cyhyKS5sZW5ndGghPT1jKXJldHVybiExO2Zvcig7Yy0tOylpZihsPWZbY10sIWoocixsKXx8IXEobltsXSxyW2xdLHQsZSkpcmV0dXJuITF9cmV0dXJuIHQucG9wKCksZS5wb3AoKSwhMH0saC5pc0VxdWFsPWZ1bmN0aW9uKG4scil7cmV0dXJuIHEobixyKX0saC5pc0VtcHR5PWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT1ufHwodyhuKSYmKGguaXNBcnJheShuKXx8aC5pc1N0cmluZyhuKXx8aC5pc0FyZ3VtZW50cyhuKSk/MD09PW4ubGVuZ3RoOjA9PT1oLmtleXMobikubGVuZ3RoKX0saC5pc0VsZW1lbnQ9ZnVuY3Rpb24obil7cmV0dXJuISghbnx8MSE9PW4ubm9kZVR5cGUpfSxoLmlzQXJyYXk9dHx8ZnVuY3Rpb24obil7cmV0dXJuXCJbb2JqZWN0IEFycmF5XVwiPT09cC5jYWxsKG4pfSxoLmlzT2JqZWN0PWZ1bmN0aW9uKG4pe3ZhciByPXR5cGVvZiBuO3JldHVyblwiZnVuY3Rpb25cIj09PXJ8fFwib2JqZWN0XCI9PT1yJiYhIW59LGguZWFjaChbXCJBcmd1bWVudHNcIixcIkZ1bmN0aW9uXCIsXCJTdHJpbmdcIixcIk51bWJlclwiLFwiRGF0ZVwiLFwiUmVnRXhwXCIsXCJFcnJvclwiLFwiU3ltYm9sXCIsXCJNYXBcIixcIldlYWtNYXBcIixcIlNldFwiLFwiV2Vha1NldFwiXSxmdW5jdGlvbihyKXtoW1wiaXNcIityXT1mdW5jdGlvbihuKXtyZXR1cm4gcC5jYWxsKG4pPT09XCJbb2JqZWN0IFwiK3IrXCJdXCJ9fSksaC5pc0FyZ3VtZW50cyhhcmd1bWVudHMpfHwoaC5pc0FyZ3VtZW50cz1mdW5jdGlvbihuKXtyZXR1cm4gaihuLFwiY2FsbGVlXCIpfSk7dmFyIEQ9bi5kb2N1bWVudCYmbi5kb2N1bWVudC5jaGlsZE5vZGVzO1wiZnVuY3Rpb25cIiE9dHlwZW9mLy4vJiZcIm9iamVjdFwiIT10eXBlb2YgSW50OEFycmF5JiZcImZ1bmN0aW9uXCIhPXR5cGVvZiBEJiYoaC5pc0Z1bmN0aW9uPWZ1bmN0aW9uKG4pe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIG58fCExfSksaC5pc0Zpbml0ZT1mdW5jdGlvbihuKXtyZXR1cm4haC5pc1N5bWJvbChuKSYmaXNGaW5pdGUobikmJiFpc05hTihwYXJzZUZsb2F0KG4pKX0saC5pc05hTj1mdW5jdGlvbihuKXtyZXR1cm4gaC5pc051bWJlcihuKSYmaXNOYU4obil9LGguaXNCb29sZWFuPWZ1bmN0aW9uKG4pe3JldHVybiEwPT09bnx8ITE9PT1ufHxcIltvYmplY3QgQm9vbGVhbl1cIj09PXAuY2FsbChuKX0saC5pc051bGw9ZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PT1ufSxoLmlzVW5kZWZpbmVkPWZ1bmN0aW9uKG4pe3JldHVybiB2b2lkIDA9PT1ufSxoLmhhcz1mdW5jdGlvbihuLHIpe2lmKCFoLmlzQXJyYXkocikpcmV0dXJuIGoobixyKTtmb3IodmFyIHQ9ci5sZW5ndGgsZT0wO2U8dDtlKyspe3ZhciB1PXJbZV07aWYobnVsbD09bnx8IWkuY2FsbChuLHUpKXJldHVybiExO249blt1XX1yZXR1cm4hIXR9LGgubm9Db25mbGljdD1mdW5jdGlvbigpe3JldHVybiBuLl89cix0aGlzfSxoLmlkZW50aXR5PWZ1bmN0aW9uKG4pe3JldHVybiBufSxoLmNvbnN0YW50PWZ1bmN0aW9uKG4pe3JldHVybiBmdW5jdGlvbigpe3JldHVybiBufX0saC5ub29wPWZ1bmN0aW9uKCl7fSxoLnByb3BlcnR5PWZ1bmN0aW9uKHIpe3JldHVybiBoLmlzQXJyYXkocik/ZnVuY3Rpb24obil7cmV0dXJuIHgobixyKX06YihyKX0saC5wcm9wZXJ0eU9mPWZ1bmN0aW9uKHIpe3JldHVybiBudWxsPT1yP2Z1bmN0aW9uKCl7fTpmdW5jdGlvbihuKXtyZXR1cm4gaC5pc0FycmF5KG4pP3gocixuKTpyW25dfX0saC5tYXRjaGVyPWgubWF0Y2hlcz1mdW5jdGlvbihyKXtyZXR1cm4gcj1oLmV4dGVuZE93bih7fSxyKSxmdW5jdGlvbihuKXtyZXR1cm4gaC5pc01hdGNoKG4scil9fSxoLnRpbWVzPWZ1bmN0aW9uKG4scix0KXt2YXIgZT1BcnJheShNYXRoLm1heCgwLG4pKTtyPXkocix0LDEpO2Zvcih2YXIgdT0wO3U8bjt1KyspZVt1XT1yKHUpO3JldHVybiBlfSxoLnJhbmRvbT1mdW5jdGlvbihuLHIpe3JldHVybiBudWxsPT1yJiYocj1uLG49MCksbitNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqKHItbisxKSl9LGgubm93PURhdGUubm93fHxmdW5jdGlvbigpe3JldHVybihuZXcgRGF0ZSkuZ2V0VGltZSgpfTt2YXIgTD17XCImXCI6XCImYW1wO1wiLFwiPFwiOlwiJmx0O1wiLFwiPlwiOlwiJmd0O1wiLCdcIic6XCImcXVvdDtcIixcIidcIjpcIiYjeDI3O1wiLFwiYFwiOlwiJiN4NjA7XCJ9LFA9aC5pbnZlcnQoTCksVz1mdW5jdGlvbihyKXt2YXIgdD1mdW5jdGlvbihuKXtyZXR1cm4gcltuXX0sbj1cIig/OlwiK2gua2V5cyhyKS5qb2luKFwifFwiKStcIilcIixlPVJlZ0V4cChuKSx1PVJlZ0V4cChuLFwiZ1wiKTtyZXR1cm4gZnVuY3Rpb24obil7cmV0dXJuIG49bnVsbD09bj9cIlwiOlwiXCIrbixlLnRlc3Qobik/bi5yZXBsYWNlKHUsdCk6bn19O2guZXNjYXBlPVcoTCksaC51bmVzY2FwZT1XKFApLGgucmVzdWx0PWZ1bmN0aW9uKG4scix0KXtoLmlzQXJyYXkocil8fChyPVtyXSk7dmFyIGU9ci5sZW5ndGg7aWYoIWUpcmV0dXJuIGguaXNGdW5jdGlvbih0KT90LmNhbGwobik6dDtmb3IodmFyIHU9MDt1PGU7dSsrKXt2YXIgaT1udWxsPT1uP3ZvaWQgMDpuW3JbdV1dO3ZvaWQgMD09PWkmJihpPXQsdT1lKSxuPWguaXNGdW5jdGlvbihpKT9pLmNhbGwobik6aX1yZXR1cm4gbn07dmFyIEM9MDtoLnVuaXF1ZUlkPWZ1bmN0aW9uKG4pe3ZhciByPSsrQytcIlwiO3JldHVybiBuP24rcjpyfSxoLnRlbXBsYXRlU2V0dGluZ3M9e2V2YWx1YXRlOi88JShbXFxzXFxTXSs/KSU+L2csaW50ZXJwb2xhdGU6LzwlPShbXFxzXFxTXSs/KSU+L2csZXNjYXBlOi88JS0oW1xcc1xcU10rPyklPi9nfTt2YXIgSj0vKC4pXi8sVT17XCInXCI6XCInXCIsXCJcXFxcXCI6XCJcXFxcXCIsXCJcXHJcIjpcInJcIixcIlxcblwiOlwiblwiLFwiXFx1MjAyOFwiOlwidTIwMjhcIixcIlxcdTIwMjlcIjpcInUyMDI5XCJ9LFY9L1xcXFx8J3xcXHJ8XFxufFxcdTIwMjh8XFx1MjAyOS9nLCQ9ZnVuY3Rpb24obil7cmV0dXJuXCJcXFxcXCIrVVtuXX07aC50ZW1wbGF0ZT1mdW5jdGlvbihpLG4scil7IW4mJnImJihuPXIpLG49aC5kZWZhdWx0cyh7fSxuLGgudGVtcGxhdGVTZXR0aW5ncyk7dmFyIHQsZT1SZWdFeHAoWyhuLmVzY2FwZXx8Sikuc291cmNlLChuLmludGVycG9sYXRlfHxKKS5zb3VyY2UsKG4uZXZhbHVhdGV8fEopLnNvdXJjZV0uam9pbihcInxcIikrXCJ8JFwiLFwiZ1wiKSxvPTAsYT1cIl9fcCs9J1wiO2kucmVwbGFjZShlLGZ1bmN0aW9uKG4scix0LGUsdSl7cmV0dXJuIGErPWkuc2xpY2Uobyx1KS5yZXBsYWNlKFYsJCksbz11K24ubGVuZ3RoLHI/YSs9XCInK1xcbigoX190PShcIityK1wiKSk9PW51bGw/Jyc6Xy5lc2NhcGUoX190KSkrXFxuJ1wiOnQ/YSs9XCInK1xcbigoX190PShcIit0K1wiKSk9PW51bGw/Jyc6X190KStcXG4nXCI6ZSYmKGErPVwiJztcXG5cIitlK1wiXFxuX19wKz0nXCIpLG59KSxhKz1cIic7XFxuXCIsbi52YXJpYWJsZXx8KGE9XCJ3aXRoKG9ianx8e30pe1xcblwiK2ErXCJ9XFxuXCIpLGE9XCJ2YXIgX190LF9fcD0nJyxfX2o9QXJyYXkucHJvdG90eXBlLmpvaW4sXCIrXCJwcmludD1mdW5jdGlvbigpe19fcCs9X19qLmNhbGwoYXJndW1lbnRzLCcnKTt9O1xcblwiK2ErXCJyZXR1cm4gX19wO1xcblwiO3RyeXt0PW5ldyBGdW5jdGlvbihuLnZhcmlhYmxlfHxcIm9ialwiLFwiX1wiLGEpfWNhdGNoKG4pe3Rocm93IG4uc291cmNlPWEsbn12YXIgdT1mdW5jdGlvbihuKXtyZXR1cm4gdC5jYWxsKHRoaXMsbixoKX0sYz1uLnZhcmlhYmxlfHxcIm9ialwiO3JldHVybiB1LnNvdXJjZT1cImZ1bmN0aW9uKFwiK2MrXCIpe1xcblwiK2ErXCJ9XCIsdX0saC5jaGFpbj1mdW5jdGlvbihuKXt2YXIgcj1oKG4pO3JldHVybiByLl9jaGFpbj0hMCxyfTt2YXIgRz1mdW5jdGlvbihuLHIpe3JldHVybiBuLl9jaGFpbj9oKHIpLmNoYWluKCk6cn07aC5taXhpbj1mdW5jdGlvbih0KXtyZXR1cm4gaC5lYWNoKGguZnVuY3Rpb25zKHQpLGZ1bmN0aW9uKG4pe3ZhciByPWhbbl09dFtuXTtoLnByb3RvdHlwZVtuXT1mdW5jdGlvbigpe3ZhciBuPVt0aGlzLl93cmFwcGVkXTtyZXR1cm4gdS5hcHBseShuLGFyZ3VtZW50cyksRyh0aGlzLHIuYXBwbHkoaCxuKSl9fSksaH0saC5taXhpbihoKSxoLmVhY2goW1wicG9wXCIsXCJwdXNoXCIsXCJyZXZlcnNlXCIsXCJzaGlmdFwiLFwic29ydFwiLFwic3BsaWNlXCIsXCJ1bnNoaWZ0XCJdLGZ1bmN0aW9uKHIpe3ZhciB0PWVbcl07aC5wcm90b3R5cGVbcl09ZnVuY3Rpb24oKXt2YXIgbj10aGlzLl93cmFwcGVkO3JldHVybiB0LmFwcGx5KG4sYXJndW1lbnRzKSxcInNoaWZ0XCIhPT1yJiZcInNwbGljZVwiIT09cnx8MCE9PW4ubGVuZ3RofHxkZWxldGUgblswXSxHKHRoaXMsbil9fSksaC5lYWNoKFtcImNvbmNhdFwiLFwiam9pblwiLFwic2xpY2VcIl0sZnVuY3Rpb24obil7dmFyIHI9ZVtuXTtoLnByb3RvdHlwZVtuXT1mdW5jdGlvbigpe3JldHVybiBHKHRoaXMsci5hcHBseSh0aGlzLl93cmFwcGVkLGFyZ3VtZW50cykpfX0pLGgucHJvdG90eXBlLnZhbHVlPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX3dyYXBwZWR9LGgucHJvdG90eXBlLnZhbHVlT2Y9aC5wcm90b3R5cGUudG9KU09OPWgucHJvdG90eXBlLnZhbHVlLGgucHJvdG90eXBlLnRvU3RyaW5nPWZ1bmN0aW9uKCl7cmV0dXJuIFN0cmluZyh0aGlzLl93cmFwcGVkKX0sXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kJiZkZWZpbmUoXCJ1bmRlcnNjb3JlXCIsW10sZnVuY3Rpb24oKXtyZXR1cm4gaH0pfSgpO1xyXG4iLCJpbXBvcnQge2V4dHJhY3RFeHRlbnNpb259IGZyb20gXCJ1dGlscy9zdHJpbmdzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgaXNSdG1wID0gZnVuY3Rpb24gKGZpbGUsIHR5cGUpIHtcclxuICAgIGlmKGZpbGUpe1xyXG4gICAgICAgIHJldHVybiAoZmlsZS5pbmRleE9mKCdydG1wOicpID09IDAgfHwgdHlwZSA9PSAncnRtcCcpO1xyXG4gICAgfVxyXG59O1xyXG5leHBvcnQgY29uc3QgaXNXZWJSVEMgPSBmdW5jdGlvbiAoZmlsZSwgdHlwZSkge1xyXG4gICAgaWYoZmlsZSl7XHJcbiAgICAgICAgcmV0dXJuIChmaWxlLmluZGV4T2YoJ3dzOicpID09PSAwIHx8IGZpbGUuaW5kZXhPZignd3NzOicpID09PSAwIHx8IHR5cGUgPT09ICd3ZWJydGMnKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGlzSGxzID0gZnVuY3Rpb24gKGZpbGUsIHR5cGUpIHtcclxuICAgIGlmKGZpbGUpe1xyXG4gICAgICAgIHJldHVybiAoIHR5cGUgPT09ICdobHMnIHx8ICB0eXBlID09PSAnbTN1OCcgfHwgdHlwZSA9PT0gJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyB8fCBleHRyYWN0RXh0ZW5zaW9uKGZpbGUpID09ICdtM3U4Jyk7XHJcblxyXG4gICAgfVxyXG59O1xyXG5leHBvcnQgY29uc3QgaXNEYXNoID0gZnVuY3Rpb24gKGZpbGUsIHR5cGUpIHtcclxuICAgIGlmKGZpbGUpe1xyXG4gICAgICAgIHJldHVybiAoIHR5cGUgPT09ICdtcGQnIHx8ICB0eXBlID09PSAnZGFzaCcgfHwgdHlwZSA9PT0gJ2FwcGxpY2F0aW9uL2Rhc2greG1sJyB8fCBleHRyYWN0RXh0ZW5zaW9uKGZpbGUpID09ICdtcGQnKTtcclxuXHJcbiAgICB9XHJcbn07XHJcbiIsIi8qKlxyXG4gKiB1dGlscyBmb3Igd2VicGFja1xyXG4gKi9cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRTY3JpcHRQYXRoID0gZnVuY3Rpb24oc2NyaXB0TmFtZSkge1xyXG4gICAgY29uc3Qgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2NyaXB0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHNyYyA9IHNjcmlwdHNbaV0uc3JjO1xyXG4gICAgICAgIGlmIChzcmMpIHtcclxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBzcmMubGFzdEluZGV4T2YoJy8nICsgc2NyaXB0TmFtZSk7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3JjLnN1YnN0cigwLCBpbmRleCArIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuICcnO1xyXG59O1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDYuIDI5Li5cclxuICovXHJcbmV4cG9ydCBjb25zdCB2ZXJzaW9uID0gX19WRVJTSU9OX187XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=