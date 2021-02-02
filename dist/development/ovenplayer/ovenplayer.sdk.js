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
                }

                that.trigger(name, data);

                if (name === "complete") {
                    runNextPlaylist(playlistManager.getCurrentPlaylistIndex() + 1);
                }

                if (name === _constants.PLAYER_PLAY) {
                    clearInterval(webrtcRetryTimer);
                    webrtcRetry = false;
                    webrtcRetryCount = WEBRTC_RETRY_COUNT;
                }

                //Auto switching next source when player load failed by amiss source.
                //data.code === PLAYER_FILE_ERROR
                if (name === _constants.ERROR || name === _constants.NETWORK_UNSTABLED) {

                    if (data.code === _constants.PLAYER_WEBRTC_UNEXPECTED_DISCONNECT || !playerConfig.getConfig().autoFallback && data.code === _constants.PLAYER_WEBRTC_NETWORK_SLOW) {

                        if (!webrtcRetry) {

                            webrtcRetry = true;
                            webrtcRetryCount = WEBRTC_RETRY_COUNT;
                        }
                    }

                    if (webrtcRetry && webrtcRetryCount > 0) {

                        webrtcRetryTimer = setTimeout(function () {

                            that.setCurrentSource(playerConfig.getSourceIndex());
                            webrtcRetryCount--;
                        }, webrtcRetryInterval);

                        return;
                    }

                    if (webrtcRetry && webrtcRetryCount <= 0) {

                        clearInterval(webrtcRetryTimer);
                        webrtcRetry = false;
                        webrtcRetryCount = WEBRTC_RETRY_COUNT;
                    }

                    if (playerConfig.getConfig().autoFallback && playerConfig.getSourceIndex() + 1 < that.getSources().length) {
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
            playlistManager.initPlaylist(playlist, playerConfig);
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
        if (!isSameProvider || currentProvider.getName() === _constants.PROVIDER_HLS || currentProvider.getName() === _constants.PROVIDER_DASH || currentProvider.getName() === _constants.PROVIDER_HTML5) {
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
            sourceIndex: 0,
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
            "live": "live",
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
var version = exports.version = '0.9.0-2021020212-localbuild';

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvQXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvQXBpRXhwYW5zaW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0NvbmZpZ3VyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0V2ZW50RW1pdHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0xhenlDb21tYW5kRXhlY3V0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9TdXBwb3J0Q2hlY2tlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2NhcHRpb24vTG9hZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvY2FwdGlvbi9NYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvY2FwdGlvbi9wYXJzZXIvU3J0UGFyc2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvY29uc3RhbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvbWVkaWEvTWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3BsYXlsaXN0L01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9Db250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9vdmVucGxheWVyLnNkay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvY2FwdGlvbnMvdnR0Q3VlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9saWtlQSQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3N0cmluZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3VuZGVyc2NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3ZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvd2VicGFjay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmVyc2lvbi5qcyJdLCJuYW1lcyI6WyJBcGkiLCJjb250YWluZXIiLCJ0aGF0IiwiY29uc29sZSIsImxvZyIsInZlcnNpb24iLCJPdmVuUGxheWVyQ29uc29sZSIsInBsYXlsaXN0TWFuYWdlciIsInByb3ZpZGVyQ29udHJvbGxlciIsInVzZXJBZ2VudE9iamVjdCIsIm1lZGlhTWFuYWdlciIsImN1cnJlbnRQcm92aWRlciIsInBsYXllckNvbmZpZyIsImxhenlRdWV1ZSIsImNhcHRpb25NYW5hZ2VyIiwid2VicnRjUmV0cnkiLCJXRUJSVENfUkVUUllfQ09VTlQiLCJ3ZWJydGNSZXRyeUNvdW50Iiwid2VicnRjUmV0cnlJbnRlcnZhbCIsIndlYnJ0Y1JldHJ5VGltZXIiLCJydW5OZXh0UGxheWxpc3QiLCJpbmRleCIsIm5leHRQbGF5bGlzdEluZGV4IiwicGxheWxpc3QiLCJnZXRQbGF5bGlzdCIsImhhc05leHRQbGF5bGlzdCIsInNldFNvdXJjZUluZGV4Iiwic2V0Vm9sdW1lIiwiZ2V0Vm9sdW1lIiwic2V0Q3VycmVudFBsYXlsaXN0IiwiaW5pdFByb3ZpZGVyIiwiaXNBdXRvU3RhcnQiLCJwbGF5IiwidHJpZ2dlciIsIkFMTF9QTEFZTElTVF9FTkRFRCIsImxhc3RQbGF5UG9zaXRpb24iLCJwaWNrUXVhbGl0eUZyb21Tb3VyY2UiLCJzb3VyY2VzIiwicXVhbGl0eSIsImkiLCJsZW5ndGgiLCJnZXRTb3VyY2VJbmRleCIsImxvYWRQcm92aWRlcnMiLCJnZXRDdXJyZW50UGxheUxpc3QiLCJ0aGVuIiwiUHJvdmlkZXJzIiwiRVJST1JTIiwiY29kZXMiLCJJTklUX1VOU1VQUE9SVF9FUlJPUiIsImRlc3Ryb3kiLCJnZXRDdXJyZW50UGxheWxpc3RJbmRleCIsImN1cnJlbnRTb3VyY2VJbmRleCIsImdldEN1cnJlbnRTb3VyY2VzIiwicHJvdmlkZXJOYW1lIiwicHJvdmlkZXIiLCJjcmVhdGVNZWRpYSIsImdldEN1cnJlbnRBZFRhZyIsIlBST1ZJREVSX1JUTVAiLCJvbiIsIm5hbWUiLCJkYXRhIiwiRVJST1IiLCJvcyIsImJyb3dzZXIiLCJjb2RlIiwiUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUiIsInNldFRpbWVvdXQiLCJzZXRDdXJyZW50U291cmNlIiwiZ2V0Q3VycmVudFNvdXJjZSIsIlBMQVlFUl9QTEFZIiwiY2xlYXJJbnRlcnZhbCIsIk5FVFdPUktfVU5TVEFCTEVEIiwiUExBWUVSX1dFQlJUQ19VTkVYUEVDVEVEX0RJU0NPTk5FQ1QiLCJnZXRDb25maWciLCJhdXRvRmFsbGJhY2siLCJQTEFZRVJfV0VCUlRDX05FVFdPUktfU0xPVyIsImdldFNvdXJjZXMiLCJwYXVzZSIsInByZWxvYWQiLCJSRUFEWSIsImZsdXNoIiwiZXJyb3IiLCJvZmYiLCJ0ZW1wRXJyb3IiLCJJTklUX1VOS05XT05fRVJST1IiLCJpbml0Iiwib3B0aW9ucyIsIm1lZGlhQ29udGFpbmVyIiwid2VicnRjQ29uZmlnIiwibG9hZGluZ1JldHJ5Q291bnQiLCJ1bmRlZmluZWQiLCJnZXRTeXN0ZW1UZXh0IiwiYXBpIiwiaW5pdFBsYXlsaXN0IiwiZ2V0UHJvdmlkZXJOYW1lIiwiZ2V0TmFtZSIsImdldE1zZUluc3RhbmNlIiwiZ2V0TXNlIiwiZ2V0QnJvd3NlciIsInNldFRpbWVjb2RlTW9kZSIsImlzU2hvdyIsImlzVGltZWNvZGVNb2RlIiwiZ2V0RnJhbWVyYXRlIiwic2Vla0ZyYW1lIiwiZnJhbWVDb3VudCIsImdldER1cmF0aW9uIiwiZ2V0UG9zaXRpb24iLCJ2b2x1bWUiLCJzZXRNdXRlIiwic3RhdGUiLCJnZXRNdXRlIiwibG9hZCIsInNldEN1cnJlbnRRdWFsaXR5Iiwic2VlayIsInBvc2l0aW9uIiwic2V0UGxheWJhY2tSYXRlIiwicGxheWJhY2tSYXRlIiwiZ2V0UGxheWJhY2tSYXRlIiwiZ2V0Q3VycmVudFBsYXlsaXN0IiwiY3VycmVudFNvdXJjZSIsIm5ld1NvdXJjZSIsImlzU2FtZVByb3ZpZGVyIiwicmVzdWx0U291cmNlSW5kZXgiLCJQUk9WSURFUl9ITFMiLCJQUk9WSURFUl9EQVNIIiwiUFJPVklERVJfSFRNTDUiLCJnZXRRdWFsaXR5TGV2ZWxzIiwiZ2V0Q3VycmVudFF1YWxpdHkiLCJxdWFsaXR5SW5kZXgiLCJpc0F1dG9RdWFsaXR5Iiwic2V0QXV0b1F1YWxpdHkiLCJpc0F1dG8iLCJnZXRDYXB0aW9uTGlzdCIsImdldEN1cnJlbnRDYXB0aW9uIiwic2V0Q3VycmVudENhcHRpb24iLCJhZGRDYXB0aW9uIiwidHJhY2siLCJyZW1vdmVDYXB0aW9uIiwiZ2V0QnVmZmVyIiwiZ2V0U3RhdGUiLCJzdG9wIiwicmVtb3ZlIiwiREVTVFJPWSIsIk92ZW5QbGF5ZXJTREsiLCJyZW1vdmVQbGF5ZXIiLCJnZXRDb250YWluZXJJZCIsImdldFBsYXllckxpc3QiLCJnZXRWZXJzaW9uIiwiQXBpUnRtcEV4cGFuc2lvbiIsImV4dGVybmFsQ2FsbGJhY2tDcmVlcCIsInJlc3VsdCIsInRyaWdnZXJFdmVudEZyb21FeHRlcm5hbCIsIkNvbmZpZ3VyYXRvciIsImNvbXBvc2VTb3VyY2VPcHRpb25zIiwiRGVmYXVsdHMiLCJwbGF5YmFja1JhdGVzIiwibXV0ZSIsImxvb3AiLCJjb250cm9scyIsImF1dG9TdGFydCIsInRpbWVjb2RlIiwic291cmNlSW5kZXgiLCJoaWRlUGxheWxpc3RJY29uIiwicnRtcEJ1ZmZlclRpbWUiLCJydG1wQnVmZmVyVGltZU1heCIsImFkQ2xpZW50IiwiY3VycmVudFByb3RvY29sT25seSIsInN5c3RlbVRleHQiLCJsYW5nIiwiZXhwYW5kRnVsbFNjcmVlblVJIiwiZnVsbHNjcmVlbk9wdGlvbiIsInNob3dCaWdQbGF5QnV0dG9uIiwic2VyaWFsaXplIiwidmFsIiwibG93ZXJjYXNlVmFsIiwidG9Mb3dlckNhc2UiLCJpc05hTiIsIk51bWJlciIsInBhcnNlRmxvYXQiLCJkZXNlcmlhbGl6ZSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiY29uZmlnIiwidXNlckN1c3R1bVN5c3RlbVRleHQiLCJfIiwiaXNBcnJheSIsImN1cnJlbnRTeXN0ZW1UZXh0IiwiZmluZFdoZXJlIiwiU1lTVEVNX1RFWFQiLCJwdXNoIiwiZmlsdGVyIiwiaXNOdW1iZXIiLCJyYXRlIiwibWFwIiwiTWF0aCIsInJvdW5kIiwiaW5kZXhPZiIsInNvcnQiLCJjb25maWdQbGF5bGlzdCIsIm9iaiIsInBpY2siLCJmZWVkRGF0YSIsImR1cmF0aW9uIiwic3BlYyIsImdldEFkQ2xpZW50Iiwic2V0Q29uZmlnIiwidmFsdWUiLCJnZXRDb250YWluZXIiLCJnZXRRdWFsaXR5TGFiZWwiLCJxdWFsaXR5TGFiZWwiLCJzZXRRdWFsaXR5TGFiZWwiLCJuZXdMYWJlbCIsImlzQ3VycmVudFByb3RvY29sT25seSIsIkNPTlRFTlRfVElNRV9NT0RFX0NIQU5HRUQiLCJnZXRSdG1wQnVmZmVyVGltZSIsImdldFJ0bXBCdWZmZXJUaW1lTWF4IiwiaXNNdXRlIiwiaXNMb29wIiwiaXNDb250cm9scyIsImdldFBsYXliYWNrUmF0ZXMiLCJnZXRMYW5ndWFnZSIsInNldFBsYXlsaXN0IiwiRXZlbnRFbWl0dGVyIiwib2JqZWN0IiwiX2V2ZW50cyIsInRyaWdnZXJFdmVudHMiLCJldmVudHMiLCJhcmdzIiwiY29udGV4dCIsImV2ZW50IiwibGlzdGVuZXIiLCJhcHBseSIsInNsaWNlIiwiY2FsbCIsImFyZ3VtZW50cyIsImFsbEV2ZW50cyIsImFsbCIsIm5hbWVzIiwibCIsInJldGFpbiIsImoiLCJrIiwiX2xpc3RlbmVyIiwib25jZSIsImNvdW50Iiwib25jZUNhbGxiYWNrIiwiTGF6eUNvbW1hbmRFeGVjdXRvciIsImluc3RhbmNlIiwicXVldWVkQ29tbWFuZHMiLCJjb21tYW5kUXVldWUiLCJ1bmRlY29yYXRlZE1ldGhvZHMiLCJleGVjdXRlTW9kZSIsImNvbW1hbmQiLCJtZXRob2QiLCJBcnJheSIsInByb3RvdHlwZSIsImFkZFF1ZXVlIiwiZXhlY3V0ZVF1ZXVlZENvbW1hbmRzIiwic2hpZnQiLCJzZXRFeGVjdXRlTW9kZSIsIm1vZGUiLCJnZXRVbmRlY29yYXRlZE1ldGhvZHMiLCJnZXRRdWV1ZSIsImVtcHR5IiwicmVtb3ZlQW5kRXhjdXRlT25jZSIsImNvbW1hbmRfIiwiY29tbWFuZFF1ZXVlSXRlbSIsInNwbGljZSIsImZpbmRJbmRleCIsIlN1cHBvcnRDaGVja2VyIiwic3VwcG9ydExpc3QiLCJjaGVja1N1cHBvcnQiLCJzb3VyY2UiLCJNaW1lVHlwZXMiLCJhYWMiLCJtcDQiLCJmNHYiLCJtNHYiLCJtb3YiLCJtcDMiLCJtcGVnIiwib2d2Iiwib2dnIiwib2dhIiwidm9yYmlzIiwid2VibSIsImY0YSIsIm0zdTgiLCJtM3UiLCJobHMiLCJ2aWRlbyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNhblBsYXlUeXBlIiwiZmlsZSIsInR5cGUiLCJtaW1lVHlwZSIsIndpbmRvdyIsIk1lZGlhU291cmNlIiwiV2ViS2l0TWVkaWFTb3VyY2UiLCJpc0hsc1N1cHBvcnQiLCJnZXRNZWRpYVNvdXJjZSIsIm1lZGlhU291cmNlIiwic291cmNlQnVmZmVyIiwiU291cmNlQnVmZmVyIiwiV2ViS2l0U291cmNlQnVmZmVyIiwiaXNUeXBlU3VwcG9ydGVkIiwic291cmNlQnVmZmVyVmFsaWRBUEkiLCJhcHBlbmRCdWZmZXIiLCJ0ZXN0Rmxhc2giLCJzdXBwb3J0IiwiQWN0aXZlWE9iamVjdCIsImUiLCJuYXZpZ2F0b3IiLCJtaW1lVHlwZXMiLCJmaW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UiLCJzb3J1Y2VfIiwiZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0IiwicGxheWxpc3RJdGVtIiwic3VwcG9ydE5hbWVzIiwiaXRlbSIsInN1cHBvcnRlZCIsIkxvYWRlciIsImNvbnZlcnRUb1ZUVEN1ZXMiLCJjdWVzIiwiVlRUQ3VlIiwiY3VlIiwic3RhcnQiLCJlbmQiLCJ0ZXh0IiwibGFuZ3VhZ2UiLCJzdWNjZXNzQ2FsbGJhY2siLCJlcnJvckNhbGxiYWNrIiwicmVxdWVzdE9wdGlvbnMiLCJ1cmwiLCJlbmNvZGluZyIsImxvYWRSZXF1ZXN0RG93bmxvZGVyIiwiUmVxdWVzdCIsInJlc3BvbnNlIiwiYm9keSIsInZ0dEN1ZXMiLCJsb2FkVnR0UGFyc2VyIiwicGFyc2VyIiwiV2ViVlRUIiwiUGFyc2VyIiwiU3RyaW5nRGVjb2RlciIsIm9uY3VlIiwib25mbHVzaCIsInBhcnNlIiwibG9hZFNtaVBhcnNlciIsInBhcnNlZERhdGEiLCJTbWlQYXJzZXIiLCJmaXhlZExhbmciLCJyZXF1aXJlIiwiZXJyIiwiaXNTdXBwb3J0Iiwia2luZCIsIk1hbmFnZXIiLCJwbGF5bGlzdEluZGV4IiwiY2FwdGlvbkxpc3QiLCJjdXJyZW50Q2FwdGlvbkluZGV4IiwiY2FwdGlvbkxvYWRlciIsImlzRmlzcnRMb2FkIiwiaXNTaG93aW5nIiwiYmluZFRyYWNrIiwibGFiZWwiLCJpZCIsInRyYWNrc0NvdW50IiwidHJhY2tJZCIsInByZWZpeCIsImRlZmF1bHR0cmFjayIsImNoYW5nZUN1cnJlbnRDYXB0aW9uIiwiQ09OVEVOVF9DQVBUSU9OX0NIQU5HRUQiLCJ0cmFja3MiLCJjYXB0aW9uSWQiLCJQTEFZRVJfQ0FQVElPTl9FUlJPUiIsIkNPTlRFTlRfVElNRSIsIm1ldGEiLCJjdXJyZW50Q3VlcyIsInN0YXJ0VGltZSIsImVuZFRpbWUiLCJDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQiLCJmbHVzaENhcHRpb25MaXN0IiwibGFzdENhcHRpb25JbmRleCIsIl9pbmRleCIsImVycm9ycyIsIl9lbnRyeSIsImVudHJ5IiwiYXJyYXkiLCJzcGxpdCIsImlkeCIsImxpbmUiLCJzdWJzdHIiLCJqb2luIiwiU3J0UGFyc2VyIiwiY2FwdGlvbnMiLCJsaXN0IiwiU1RBVEVfQlVGRkVSSU5HIiwiU1RBVEVfSURMRSIsIlNUQVRFX0NPTVBMRVRFIiwiU1RBVEVfUEFVU0VEIiwiU1RBVEVfUExBWUlORyIsIlNUQVRFX0VSUk9SIiwiU1RBVEVfTE9BRElORyIsIlNUQVRFX1NUQUxMRUQiLCJTVEFURV9BRF9MT0FESU5HIiwiU1RBVEVfQURfTE9BREVEIiwiU1RBVEVfQURfUExBWUlORyIsIlNUQVRFX0FEX1BBVVNFRCIsIlNUQVRFX0FEX0NPTVBMRVRFIiwiU1RBVEVfQURfRVJST1IiLCJQTEFZRVJfQURfQ0xJQ0siLCJQUk9WSURFUl9XRUJSVEMiLCJDT05URU5UX0NPTVBMRVRFIiwiQ09OVEVOVF9TRUVLIiwiQ09OVEVOVF9CVUZGRVJfRlVMTCIsIkRJU1BMQVlfQ0xJQ0siLCJDT05URU5UX0xPQURFRCIsIlBMQVlMSVNUX0NIQU5HRUQiLCJDT05URU5UX1NFRUtFRCIsIkRBU0hfUFJFUEFSRUQiLCJEQVNIX0RFU1RST1lFRCIsIlBMQVlFUl9TVEFURSIsIlBMQVlFUl9DT01QTEVURSIsIlBMQVlFUl9QQVVTRSIsIlBMQVlFUl9DTElDS0VEIiwiUExBWUVSX1JFU0laRUQiLCJQTEFZRVJfTE9BRElORyIsIlBMQVlFUl9GVUxMU0NSRUVOX1JFUVVFU1QiLCJQTEFZRVJfRlVMTFNDUkVFTl9DSEFOR0VEIiwiUExBWUVSX1dBUk5JTkciLCJBRF9DSEFOR0VEIiwiQURfVElNRSIsIkNPTlRFTlRfQlVGRkVSIiwiQ09OVEVOVF9SQVRFX0NIQU5HRSIsIkNPTlRFTlRfVk9MVU1FIiwiQ09OVEVOVF9NVVRFIiwiQ09OVEVOVF9NRVRBIiwiQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCIsIkNPTlRFTlRfTEVWRUxfQ0hBTkdFRCIsIlBMQVlCQUNLX1JBVEVfQ0hBTkdFRCIsIk9NRV9QMlBfTU9ERSIsIkFEX0NMSUVOVF9HT09HTEVJTUEiLCJBRF9DTElFTlRfVkFTVCIsIklOSVRfUlRNUF9TRVRVUF9FUlJPUiIsIklOSVRfREFTSF9VTlNVUFBPUlQiLCJJTklUX0FEU19FUlJPUiIsIklOSVRfREFTSF9OT1RGT1VORCIsIklOSVRfSExTSlNfTk9URk9VTkQiLCJQTEFZRVJfVU5LTldPTl9FUlJPUiIsIlBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUiIsIlBMQVlFUl9VTktOV09OX05FVFdPUktfRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IiLCJQTEFZRVJfRklMRV9FUlJPUiIsIlBMQVlFUl9CQURfUkVRVUVTVF9FUlJPUiIsIlBMQVlFUl9BVVRIX0ZBSUxFRF9FUlJPUiIsIlBMQVlFUl9OT1RfQUNDRVBUQUJMRV9FUlJPUiIsIlBMQVlFUl9XRUJSVENfV1NfRVJST1IiLCJQTEFZRVJfV0VCUlRDX0FERF9JQ0VDQU5ESURBVEVfRVJST1IiLCJQTEFZRVJfV0VCUlRDX1NFVF9SRU1PVEVfREVTQ19FUlJPUiIsIlBMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUiIsIldBUk5fTVNHX01VVEVEUExBWSIsIlVJX0lDT05TIiwidm9sdW1lX211dGUiLCJvcF93YXJuaW5nIiwiYnJvd3NlckluZm8iLCJTV0ZQYXRoIiwicm9vdElkIiwiZ2V0QXR0cmlidXRlIiwiJGNvbnRhaW5lciIsInZpZGVvRWxlbWVudCIsImNyZWF0ZUh0bWxWaWRlbyIsInNldEF0dHJpYnV0ZSIsImFwcGVuZCIsImNyZWF0ZUZsYXNoVmlkZW8iLCJidWZmZXJUaW1lIiwiYnVmZmVyVGltZU1heCIsIm1vdmllIiwiZmxhc2h2YXJzIiwiYWxsb3dzY3JpcHRhY2Nlc3MiLCJhbGxvd2Z1bGxzY3JlZW4iLCJtZW51IiwicXVhbCIsImJnY29sb3IiLCJ3bW9kZSIsImJyb3dzZXJNYWpvclZlcnNpb24iLCJhcHBlbmRDaGlsZCIsImNyZWF0ZUFkQ29udGFpbmVyIiwiYWRDb250YWluZXIiLCJyZW1vdmVDaGlsZCIsImN1cnJlbnRQbGF5bGlzdEl0ZW0iLCJjdXJyZW50SW5kZXgiLCJzdXBwb3J0Q2hlY2tlciIsIm1ha2VQcmV0dHlTb3VyY2UiLCJzb3VyY2VfIiwiaG9zdCIsImFwcGxpY2F0aW9uIiwic3RyZWFtIiwibWltZXR5cGVSZWdFeCIsInRlc3QiLCJyZXBsYWNlIiwibG93TGF0ZW5jeSIsInByZXR0aWVkUGxheWxpc3QiLCJ0aXRsZSIsImxldmVscyIsInByZXR0eVNvdXJjZSIsImRlZmF1bHRTb3VyY2UiLCJ0b1N0cmluZyIsImV4dHJhY3RPbmx5T25lUHJvdG9jb2wiLCJoaWdoUHJpb3JpdHlUeXBlIiwiY29uY2F0IiwiYWRUYWdVcmwiLCJDb250cm9sbGVyIiwic3VwcG9ydENoYWNrZXIiLCJyZWdpc3RlUHJvdmlkZXIiLCJQcm92aWRlckxvYWRlciIsImh0bWw1IiwiRXJyb3IiLCJ3ZWJydGMiLCJkYXNoIiwicnRtcCIsInN1cHBvcnRlZFByb3ZpZGVyTmFtZXMiLCJQcm9taXNlIiwicmVqZWN0IiwiZmluZEJ5TmFtZSIsImdldFByb3ZpZGVyQnlTb3VyY2UiLCJzdXBwb3J0ZWRQcm92aWRlck5hbWUiLCJfX3dlYnBhY2tfcHVibGljX3BhdGhfXyIsInBsYXllckxpc3QiLCJjaGVja0FuZEdldENvbnRhaW5lckVsZW1lbnQiLCJjb250YWluZXJFbGVtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJub2RlVHlwZSIsImNyZWF0ZSIsInBsYXllckluc3RhbmNlIiwiZ2V0UGxheWVyQnlDb250YWluZXJJZCIsImNvbnRhaW5lcklkIiwiZ2V0UGxheWVyQnlJbmRleCIsInBsYXllcklkIiwiZ2VuZXJhdGVXZWJydGNVcmxzIiwiZGVidWciLCJpc0RlYnVnTW9kZSIsImdldEJyb3dzZXJMYW5ndWFnZSIsIm5hdiIsImJyb3dzZXJMYW5ndWFnZVByb3BlcnR5S2V5cyIsImxhbmd1YWdlcyIsImFuYWxVc2VyQWdlbnQiLCJ1bmtub3duIiwic2NyZWVuU2l6ZSIsInNjcmVlbiIsIndpZHRoIiwiaGVpZ2h0IiwiblZlciIsImFwcFZlcnNpb24iLCJuQWd0IiwidXNlckFnZW50IiwiYXBwTmFtZSIsIm1ham9yVmVyc2lvbiIsInBhcnNlSW50IiwiaXNXZWJ2aWV3IiwibmFtZU9mZnNldCIsInZlck9mZnNldCIsIml4Iiwic3Vic3RyaW5nIiwibGFzdEluZGV4T2YiLCJ0b1VwcGVyQ2FzZSIsIm1vYmlsZSIsImNvb2tpZUVuYWJsZWQiLCJjb29raWUiLCJjbGllbnRTdHJpbmdzIiwicyIsInIiLCJjcyIsIm9zVmVyc2lvbiIsImV4ZWMiLCJicm93c2VyVmVyc2lvbiIsInVhIiwiY29va2llcyIsImF1dG9LZXl3b3JkIiwiZGlyZWN0aW9uU2V0dGluZyIsImFsaWduU2V0dGluZyIsImZpbmREaXJlY3Rpb25TZXR0aW5nIiwiZGlyIiwiZmluZEFsaWduU2V0dGluZyIsImFsaWduIiwiZXh0ZW5kIiwiY29iaiIsInAiLCJpc0lFOCIsImJhc2VPYmoiLCJlbnVtZXJhYmxlIiwiaGFzQmVlblJlc2V0IiwiX2lkIiwiX3BhdXNlT25FeGl0IiwiX3N0YXJ0VGltZSIsIl9lbmRUaW1lIiwiX3RleHQiLCJfcmVnaW9uIiwiX3ZlcnRpY2FsIiwiX3NuYXBUb0xpbmVzIiwiX2xpbmUiLCJfbGluZUFsaWduIiwiX3Bvc2l0aW9uIiwiX3Bvc2l0aW9uQWxpZ24iLCJfc2l6ZSIsIl9hbGlnbiIsImRlZmluZVByb3BlcnR5IiwiZ2V0Iiwic2V0IiwiVHlwZUVycm9yIiwic2V0dGluZyIsIlN5bnRheEVycm9yIiwiZGlzcGxheVN0YXRlIiwiZ2V0Q3VlQXNIVE1MIiwiY29udmVydEN1ZVRvRE9NVHJlZSIsIkxhJCIsInNlbGVjdG9yT3JFbGVtZW50IiwicmV0dXJuTm9kZSIsIiRlbGVtZW50Iiwic2VsZWN0b3IiLCJub2RlTGlzdCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpc0VsZW1lbnQiLCJldmVyeSIsInNob3ciLCJzdHlsZSIsImRpc3BsYXkiLCJoaWRlIiwiYWRkQ2xhc3MiLCJjbGFzc0xpc3QiLCJhZGQiLCJjbGFzc05hbWVzIiwiY2xhc3NOYW1lIiwiYWZ0ZXIiLCJodG1sU3RyaW5nIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiYmVmb3JlIiwiY2hpbGRyZW4iLCJjb250YWlucyIsImVsQ2hpbGQiLCJpbm5lckhUTUwiLCJmaW5kIiwiY3NzIiwiZWxlbWVudCIsInJlbW92ZUNsYXNzIiwiUmVnRXhwIiwicmVtb3ZlQXR0cmlidXRlIiwiYXR0ck5hbWUiLCJ0ZXh0Q29udGVudCIsImh0bWwiLCJoYXNDbGFzcyIsImlzIiwiJHRhcmdldEVsZW1lbnQiLCJvZmZzZXQiLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwidG9wIiwic2Nyb2xsVG9wIiwibGVmdCIsInNjcm9sbExlZnQiLCJjbGllbnRXaWR0aCIsImNsaWVudEhlaWdodCIsImF0dHIiLCJyZXBsYWNlV2l0aCIsInBhcmVudEVsZW1lbnQiLCJoYXNDaGlsZE5vZGVzIiwiZmlyc3RDaGlsZCIsImNsb3Nlc3QiLCJzZWxlY3RvclN0cmluZyIsImNsb3Nlc3RFbGVtZW50IiwidHJpbSIsIm5hdHVyYWxIbXMiLCJobXNUb1NlY29uZCIsInN0cmluZyIsImV4dHJhY3RFeHRlbnNpb24iLCJwYXRoIiwiZ2V0QXp1cmVGaWxlRm9ybWF0IiwiZXh0ZW5zaW9uIiwiYXp1cmVkRm9ybWF0Iiwic2Vjb25kIiwic2VjTnVtIiwiaG91cnMiLCJmbG9vciIsIm1pbnV0ZXMiLCJzZWNvbmRzIiwic3RyIiwiZnJhbWVSYXRlIiwiYXJyIiwiYXJyTGVuZ3RoIiwic2VjIiwic2VjSW5kZXgiLCJuIiwic2VsZiIsImdsb2JhbCIsIm8iLCJTeW1ib2wiLCJ1IiwiYyIsImhhc093blByb3BlcnR5IiwidCIsImEiLCJmIiwiaCIsIl93cmFwcGVkIiwiZXhwb3J0cyIsIm1vZHVsZSIsIlZFUlNJT04iLCJ2IiwieSIsImQiLCJpdGVyYXRlZSIsImlkZW50aXR5IiwiaXNGdW5jdGlvbiIsImlzT2JqZWN0IiwibWF0Y2hlciIsInByb3BlcnR5IiwiZyIsIm1heCIsIm0iLCJiIiwieCIsInBvdyIsIkEiLCJ3IiwiZWFjaCIsImNvbGxlY3QiLCJPIiwicmVkdWNlIiwiZm9sZGwiLCJpbmplY3QiLCJyZWR1Y2VSaWdodCIsImZvbGRyIiwiZGV0ZWN0IiwiZmluZEtleSIsInNlbGVjdCIsIm5lZ2F0ZSIsInNvbWUiLCJhbnkiLCJpbmNsdWRlcyIsImluY2x1ZGUiLCJ2YWx1ZXMiLCJpbnZva2UiLCJwbHVjayIsIndoZXJlIiwibWluIiwic2h1ZmZsZSIsInNhbXBsZSIsInJhbmRvbSIsImNsb25lIiwic29ydEJ5IiwiY3JpdGVyaWEiLCJncm91cEJ5IiwiaW5kZXhCeSIsImNvdW50QnkiLCJTIiwidG9BcnJheSIsImlzU3RyaW5nIiwibWF0Y2giLCJzaXplIiwicGFydGl0aW9uIiwiZmlyc3QiLCJoZWFkIiwidGFrZSIsImluaXRpYWwiLCJsYXN0IiwicmVzdCIsInRhaWwiLCJkcm9wIiwiY29tcGFjdCIsIkJvb2xlYW4iLCJNIiwiaXNBcmd1bWVudHMiLCJmbGF0dGVuIiwid2l0aG91dCIsImRpZmZlcmVuY2UiLCJ1bmlxIiwidW5pcXVlIiwiaXNCb29sZWFuIiwidW5pb24iLCJpbnRlcnNlY3Rpb24iLCJ1bnppcCIsInppcCIsIkYiLCJmaW5kTGFzdEluZGV4Iiwic29ydGVkSW5kZXgiLCJFIiwicmFuZ2UiLCJjZWlsIiwiY2h1bmsiLCJOIiwiYmluZCIsInBhcnRpYWwiLCJwbGFjZWhvbGRlciIsImJpbmRBbGwiLCJtZW1vaXplIiwiY2FjaGUiLCJkZWxheSIsImRlZmVyIiwidGhyb3R0bGUiLCJsZWFkaW5nIiwibm93IiwiY2xlYXJUaW1lb3V0IiwidHJhaWxpbmciLCJjYW5jZWwiLCJkZWJvdW5jZSIsIndyYXAiLCJjb21wb3NlIiwicmVzdEFyZ3VtZW50cyIsIkkiLCJwcm9wZXJ0eUlzRW51bWVyYWJsZSIsIlQiLCJCIiwiY29uc3RydWN0b3IiLCJhbGxLZXlzIiwibWFwT2JqZWN0IiwicGFpcnMiLCJpbnZlcnQiLCJmdW5jdGlvbnMiLCJtZXRob2RzIiwiUiIsImV4dGVuZE93biIsImFzc2lnbiIsInEiLCJLIiwieiIsIm9taXQiLCJTdHJpbmciLCJkZWZhdWx0cyIsInRhcCIsImlzTWF0Y2giLCJ2YWx1ZU9mIiwicG9wIiwiaXNFcXVhbCIsImlzRW1wdHkiLCJEIiwiY2hpbGROb2RlcyIsIkludDhBcnJheSIsImlzRmluaXRlIiwiaXNTeW1ib2wiLCJpc051bGwiLCJpc1VuZGVmaW5lZCIsImhhcyIsIm5vQ29uZmxpY3QiLCJjb25zdGFudCIsIm5vb3AiLCJwcm9wZXJ0eU9mIiwibWF0Y2hlcyIsInRpbWVzIiwiRGF0ZSIsImdldFRpbWUiLCJMIiwiUCIsIlciLCJlc2NhcGUiLCJ1bmVzY2FwZSIsIkMiLCJ1bmlxdWVJZCIsInRlbXBsYXRlU2V0dGluZ3MiLCJldmFsdWF0ZSIsImludGVycG9sYXRlIiwiSiIsIlUiLCJWIiwiJCIsInRlbXBsYXRlIiwidmFyaWFibGUiLCJGdW5jdGlvbiIsImNoYWluIiwiX2NoYWluIiwiRyIsIm1peGluIiwidG9KU09OIiwiZGVmaW5lIiwiaXNSdG1wIiwiaXNXZWJSVEMiLCJpc0hscyIsImlzRGFzaCIsImdldFNjcmlwdFBhdGgiLCJzY3JpcHROYW1lIiwic2NyaXB0cyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwic3JjIiwiX19WRVJTSU9OX18iXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7UUFDQTtRQUNBLFFBQVEsb0JBQW9CO1FBQzVCO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOzs7O1FBSUE7UUFDQTtRQUNBLHlDQUF5QyxzNEJBQXM0QjtRQUMvNkI7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBOzs7UUFHQTs7UUFFQTtRQUNBLGlDQUFpQzs7UUFFakM7UUFDQTtRQUNBO1FBQ0EsS0FBSztRQUNMO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7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K0JBQS9DLElBQWtGLCtCQUFpQkQsSUFBakIsS0FBMEIsTUFBckg7QUFFSDtBQUNKLENBTE07QUFNQSxJQUFNc2tCLDBCQUFTLFNBQVRBLE1BQVMsQ0FBVXRrQixJQUFWLEVBQWdCQyxJQUFoQixFQUFzQjtBQUN4QyxRQUFHRCxJQUFILEVBQVE7QUFDSixlQUFTQyxTQUFTLEtBQVQsSUFBbUJBLFNBQVMsTUFBNUIsSUFBc0NBLFNBQVMsc0JBQS9DLElBQXlFLCtCQUFpQkQsSUFBakIsS0FBMEIsS0FBNUc7QUFFSDtBQUNKLENBTE0sQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQlA7Ozs7QUFJTyxJQUFNdWtCLHdDQUFnQixTQUFoQkEsYUFBZ0IsQ0FBU0MsVUFBVCxFQUFxQjtBQUM5QyxRQUFNQyxVQUFVNWtCLFNBQVM2a0Isb0JBQVQsQ0FBOEIsUUFBOUIsQ0FBaEI7QUFDQSxTQUFLLElBQUkzMEIsSUFBSSxDQUFiLEVBQWdCQSxJQUFJMDBCLFFBQVF6MEIsTUFBNUIsRUFBb0NELEdBQXBDLEVBQXlDO0FBQ3JDLFlBQU00MEIsTUFBTUYsUUFBUTEwQixDQUFSLEVBQVc0MEIsR0FBdkI7QUFDQSxZQUFJQSxHQUFKLEVBQVM7QUFDTCxnQkFBTTkxQixRQUFRODFCLElBQUk3VCxXQUFKLENBQWdCLE1BQU0wVCxVQUF0QixDQUFkO0FBQ0EsZ0JBQUkzMUIsU0FBUyxDQUFiLEVBQWdCO0FBQ1osdUJBQU84MUIsSUFBSXplLE1BQUosQ0FBVyxDQUFYLEVBQWNyWCxRQUFRLENBQXRCLENBQVA7QUFDSDtBQUNKO0FBQ0o7QUFDRCxXQUFPLEVBQVA7QUFDSCxDQVpNLEM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSlA7OztBQUdPLElBQU1oQiw0QkFBVSsyQiw2QkFBaEIsQyIsImZpbGUiOiJvdmVucGxheWVyLnNkay5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuXG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdH07XG5cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwib3ZlbnBsYXllci5zZGtcIjogMFxuIFx0fTtcblxuXG5cbiBcdC8vIHNjcmlwdCBwYXRoIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBqc29ucFNjcmlwdFNyYyhjaHVua0lkKSB7XG4gXHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgKHtcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IdG1sNX5vdmVucGxheWV+MmVjMTkzYWNcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IdG1sNX5vdmVucGxheWV+MmVjMTkzYWNcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IdG1sNX5vdmVucGxheWV+N2FmZDY4Y2ZcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IdG1sNX5vdmVucGxheWV+N2FmZDY4Y2ZcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlclwiLFwib3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlclwiOlwib3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlclwiLFwib3ZlbnBsYXllci5wcm92aWRlci5IdG1sNVwiOlwib3ZlbnBsYXllci5wcm92aWRlci5IdG1sNVwiLFwib3ZlbnBsYXllci5wcm92aWRlci5XZWJSVENQcm92aWRlclwiOlwib3ZlbnBsYXllci5wcm92aWRlci5XZWJSVENQcm92aWRlclwiLFwib3ZlbnBsYXllci5wcm92aWRlci5SdG1wUHJvdmlkZXJcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuUnRtcFByb3ZpZGVyXCIsXCJzbWlwYXJzZXJcIjpcInNtaXBhcnNlclwiLFwidmVuZG9yc35kb3dubG9hZGVyXCI6XCJ2ZW5kb3JzfmRvd25sb2FkZXJcIixcImRvd25sb2FkZXJcIjpcImRvd25sb2FkZXJcIixcInZ0dHBhcnNlclwiOlwidnR0cGFyc2VyXCJ9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLmpzXCJcbiBcdH1cblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCkge1xuIFx0XHR2YXIgcHJvbWlzZXMgPSBbXTtcblxuXG4gXHRcdC8vIEpTT05QIGNodW5rIGxvYWRpbmcgZm9yIGphdmFzY3JpcHRcblxuIFx0XHR2YXIgaW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIHsgLy8gMCBtZWFucyBcImFscmVhZHkgaW5zdGFsbGVkXCIuXG5cbiBcdFx0XHQvLyBhIFByb21pc2UgbWVhbnMgXCJjdXJyZW50bHkgbG9hZGluZ1wiLlxuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0pO1xuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHQvLyBzZXR1cCBQcm9taXNlIGluIGNodW5rIGNhY2hlXG4gXHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XTtcbiBcdFx0XHRcdH0pO1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0gPSBwcm9taXNlKTtcblxuIFx0XHRcdFx0Ly8gc3RhcnQgY2h1bmsgbG9hZGluZ1xuIFx0XHRcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuIFx0XHRcdFx0dmFyIG9uU2NyaXB0Q29tcGxldGU7XG5cbiBcdFx0XHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04JztcbiBcdFx0XHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuIFx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcbiBcdFx0XHRcdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c2NyaXB0LnNyYyA9IGpzb25wU2NyaXB0U3JjKGNodW5rSWQpO1xuXG4gXHRcdFx0XHQvLyBjcmVhdGUgZXJyb3IgYmVmb3JlIHN0YWNrIHVud291bmQgdG8gZ2V0IHVzZWZ1bCBzdGFja3RyYWNlIGxhdGVyXG4gXHRcdFx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoKTtcbiBcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiBcdFx0XHRcdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuIFx0XHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuIFx0XHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG4gXHRcdFx0XHRcdHZhciBjaHVuayA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0XHRcdFx0aWYoY2h1bmsgIT09IDApIHtcbiBcdFx0XHRcdFx0XHRpZihjaHVuaykge1xuIFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcbiBcdFx0XHRcdFx0XHRcdHZhciByZWFsU3JjID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmM7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5tZXNzYWdlID0gJ0xvYWRpbmcgY2h1bmsgJyArIGNodW5rSWQgKyAnIGZhaWxlZC5cXG4oJyArIGVycm9yVHlwZSArICc6ICcgKyByZWFsU3JjICsgJyknO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IubmFtZSA9ICdDaHVua0xvYWRFcnJvcic7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci50eXBlID0gZXJyb3JUeXBlO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG4gXHRcdFx0XHRcdFx0XHRjaHVua1sxXShlcnJvcik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fTtcbiBcdFx0XHRcdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuIFx0XHRcdFx0XHRvblNjcmlwdENvbXBsZXRlKHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KTtcbiBcdFx0XHRcdH0sIDEyMDAwMCk7XG4gXHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlO1xuIFx0XHRcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBvbiBlcnJvciBmdW5jdGlvbiBmb3IgYXN5bmMgbG9hZGluZ1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikgeyBjb25zb2xlLmVycm9yKGVycik7IHRocm93IGVycjsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9qcy9vdmVucGxheWVyLnNkay5qc1wiKTtcbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdGlmICghbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxuXHRcdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcblx0fVxuXHRyZXR1cm4gbW9kdWxlO1xufTtcbiIsImltcG9ydCBDYXB0aW9uTWFuYWdlciBmcm9tIFwiYXBpL2NhcHRpb24vTWFuYWdlclwiO1xyXG5pbXBvcnQgQ29uZmlndXJhdG9yIGZyb20gXCJhcGkvQ29uZmlndXJhdG9yXCI7XHJcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImFwaS9FdmVudEVtaXR0ZXJcIjtcclxuaW1wb3J0IExhenlDb21tYW5kRXhlY3V0b3IgZnJvbSBcImFwaS9MYXp5Q29tbWFuZEV4ZWN1dG9yXCI7XHJcbmltcG9ydCBNZWRpYU1hbmFnZXIgZnJvbSBcImFwaS9tZWRpYS9NYW5hZ2VyXCI7XHJcbmltcG9ydCBQbGF5bGlzdE1hbmFnZXIgZnJvbSBcImFwaS9wbGF5bGlzdC9NYW5hZ2VyXCI7XHJcbmltcG9ydCBQcm92aWRlckNvbnRyb2xsZXIgZnJvbSBcImFwaS9wcm92aWRlci9Db250cm9sbGVyXCI7XHJcbmltcG9ydCB7UkVBRFksIEVSUk9SUywgRVJST1IsIENPTlRFTlRfVElNRV9NT0RFX0NIQU5HRUQsIElOSVRfVU5LTldPTl9FUlJPUiwgSU5JVF9VTlNVUFBPUlRfRVJST1IsIERFU1RST1ksIFBMQVlFUl9QTEFZLCBORVRXT1JLX1VOU1RBQkxFRCwgUExBWUVSX1dFQlJUQ19ORVRXT1JLX1NMT1csIFBMQVlFUl9XRUJSVENfVU5FWFBFQ1RFRF9ESVNDT05ORUNULCBQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SLFxyXG4gICAgUExBWUVSX0ZJTEVfRVJST1IsIFBST1ZJREVSX0RBU0gsIFBST1ZJREVSX0hMUywgUFJPVklERVJfV0VCUlRDLCBQUk9WSURFUl9IVE1MNSwgUFJPVklERVJfUlRNUCwgQUxMX1BMQVlMSVNUX0VOREVEfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQge3ZlcnNpb259IGZyb20gJ3ZlcnNpb24nO1xyXG5pbXBvcnQge0FwaVJ0bXBFeHBhbnNpb259IGZyb20gJ2FwaS9BcGlFeHBhbnNpb25zJztcclxuaW1wb3J0IHthbmFsVXNlckFnZW50fSBmcm9tIFwidXRpbHMvYnJvd3NlclwiO1xyXG5pbXBvcnQgTEEkIGZyb20gJ3V0aWxzL2xpa2VBJCc7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgVGhpcyBvYmplY3QgY29ubmVjdHMgVUkgdG8gdGhlIHByb3ZpZGVyLlxyXG4gKiBAcGFyYW0gICB7b2JqZWN0fSAgICBjb250YWluZXIgIGRvbSBlbGVtZW50XHJcbiAqXHJcbiAqICovXHJcblxyXG5jb25zdCBBcGkgPSBmdW5jdGlvbihjb250YWluZXIpe1xyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG4gICAgRXZlbnRFbWl0dGVyKHRoYXQpO1xyXG5cclxuXHJcbiAgICBjb25zb2xlLmxvZyhcIltbT3ZlblBsYXllcl1dIHYuXCIrIHZlcnNpb24pO1xyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIGxvYWRlZC5cIik7XHJcblxyXG4gICAgbGV0IHBsYXlsaXN0TWFuYWdlciA9IFBsYXlsaXN0TWFuYWdlcih0aGF0KTtcclxuICAgIGxldCBwcm92aWRlckNvbnRyb2xsZXIgPSBQcm92aWRlckNvbnRyb2xsZXIoKTtcclxuICAgIGxldCB1c2VyQWdlbnRPYmplY3QgPSBhbmFsVXNlckFnZW50KCk7XHJcbiAgICBsZXQgbWVkaWFNYW5hZ2VyID0gTWVkaWFNYW5hZ2VyKGNvbnRhaW5lciwgdXNlckFnZW50T2JqZWN0KTtcclxuICAgIGxldCBjdXJyZW50UHJvdmlkZXIgPSBcIlwiO1xyXG4gICAgbGV0IHBsYXllckNvbmZpZyA9IFwiXCI7XHJcbiAgICBsZXQgbGF6eVF1ZXVlID0gXCJcIjtcclxuICAgIGxldCBjYXB0aW9uTWFuYWdlciA9IFwiXCI7XHJcblxyXG4gICAgbGV0IHdlYnJ0Y1JldHJ5ID0gZmFsc2U7XHJcbiAgICBsZXQgV0VCUlRDX1JFVFJZX0NPVU5UID0gMztcclxuICAgIGxldCB3ZWJydGNSZXRyeUNvdW50ID0gV0VCUlRDX1JFVFJZX0NPVU5UO1xyXG4gICAgbGV0IHdlYnJ0Y1JldHJ5SW50ZXJ2YWwgPSAxMDAwO1xyXG4gICAgbGV0IHdlYnJ0Y1JldHJ5VGltZXIgPSBudWxsO1xyXG5cclxuXHJcbiAgICBjb25zdCBydW5OZXh0UGxheWxpc3QgPSBmdW5jdGlvbihpbmRleCl7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwicnVuTmV4dFBsYXlsaXN0XCIpO1xyXG4gICAgICAgIGxldCBuZXh0UGxheWxpc3RJbmRleCA9IGluZGV4OyAvLyB8fCBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFBsYXlsaXN0SW5kZXgoKSArIDE7XHJcbiAgICAgICAgbGV0IHBsYXlsaXN0ID0gcGxheWxpc3RNYW5hZ2VyLmdldFBsYXlsaXN0KCk7XHJcbiAgICAgICAgbGV0IGhhc05leHRQbGF5bGlzdCA9IHBsYXlsaXN0W25leHRQbGF5bGlzdEluZGV4XT8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgIC8vaW5pdCBzb3VyY2UgaW5kZXhcclxuICAgICAgICBwbGF5ZXJDb25maWcuc2V0U291cmNlSW5kZXgoMCk7XHJcblxyXG4gICAgICAgIC8vc2V0IEdvbGJhbCBWb2x1bWUgaW5mb1xyXG4gICAgICAgIHBsYXllckNvbmZpZy5zZXRWb2x1bWUoY3VycmVudFByb3ZpZGVyLmdldFZvbHVtZSgpKTtcclxuXHJcbiAgICAgICAgaWYoaGFzTmV4dFBsYXlsaXN0KXtcclxuICAgICAgICAgICAgLy90aGF0LnBhdXNlKCk7XHJcbiAgICAgICAgICAgIGxhenlRdWV1ZSA9IExhenlDb21tYW5kRXhlY3V0b3IodGhhdCwgWydwbGF5Jywnc2VlaycsJ3N0b3AnXSk7XHJcbiAgICAgICAgICAgIHBsYXlsaXN0TWFuYWdlci5zZXRDdXJyZW50UGxheWxpc3QobmV4dFBsYXlsaXN0SW5kZXgpO1xyXG4gICAgICAgICAgICBpbml0UHJvdmlkZXIoKTtcclxuXHJcblxyXG4gICAgICAgICAgICBpZighcGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpe1xyXG4gICAgICAgICAgICAgICAgLy9Bbnl3YXkgbmV4dHBsYXlsaXN0IHJ1bnMgYXV0b1N0YXJ0IS5cclxuICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIC8vQWxsIFBsYXlsaXN0IEVuZGVkLlxyXG4gICAgICAgICAgICB0aGF0LnRyaWdnZXIoQUxMX1BMQVlMSVNUX0VOREVELCBudWxsKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgY29uc3QgaW5pdFByb3ZpZGVyID0gZnVuY3Rpb24obGFzdFBsYXlQb3NpdGlvbil7XHJcbiAgICAgICAgY29uc3QgcGlja1F1YWxpdHlGcm9tU291cmNlID0gKHNvdXJjZXMpID0+e1xyXG4gICAgICAgICAgICB2YXIgcXVhbGl0eSA9IDA7XHJcbiAgICAgICAgICAgIGlmIChzb3VyY2VzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc291cmNlc1tpXS5kZWZhdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1YWxpdHkgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAocGxheWVyQ29uZmlnLmdldFNvdXJjZUluZGV4KCkgPT09IGkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvKmlmIChwbGF5ZXJDb25maWcuZ2V0U291cmNlTGFiZWwoKSAmJiBzb3VyY2VzW2ldLmxhYmVsID09PSBwbGF5ZXJDb25maWcuZ2V0U291cmNlTGFiZWwoKSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSovXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHF1YWxpdHk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHByb3ZpZGVyQ29udHJvbGxlci5sb2FkUHJvdmlkZXJzKHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50UGxheUxpc3QoKSkudGhlbihQcm92aWRlcnMgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYoUHJvdmlkZXJzLmxlbmd0aCA8IDEpe1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgRVJST1JTLmNvZGVzW0lOSVRfVU5TVVBQT1JUX0VSUk9SXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoY3VycmVudFByb3ZpZGVyKXtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGNhcHRpb25NYW5hZ2VyKXtcclxuICAgICAgICAgICAgICAgIGNhcHRpb25NYW5hZ2VyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIGNhcHRpb25NYW5hZ2VyID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXB0aW9uTWFuYWdlciA9IENhcHRpb25NYW5hZ2VyKHRoYXQsIHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50UGxheWxpc3RJbmRleCgpKTtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaW5pdCgpIGNhcHRpb25zXCIpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRTb3VyY2VJbmRleCA9IHBpY2tRdWFsaXR5RnJvbVNvdXJjZShwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKSk7XHJcbiAgICAgICAgICAgIGxldCBwcm92aWRlck5hbWUgPSBQcm92aWRlcnNbY3VycmVudFNvdXJjZUluZGV4XVtcIm5hbWVcIl07XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGluaXQoKSBwcm92aWRlclwiLCBwcm92aWRlck5hbWUpO1xyXG4gICAgICAgICAgICAvL0luaXQgUHJvdmlkZXIuXHJcbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlciA9ICBQcm92aWRlcnNbY3VycmVudFNvdXJjZUluZGV4XS5wcm92aWRlcihcclxuICAgICAgICAgICAgICAgIG1lZGlhTWFuYWdlci5jcmVhdGVNZWRpYShwcm92aWRlck5hbWUsIHBsYXllckNvbmZpZyksXHJcbiAgICAgICAgICAgICAgICBwbGF5ZXJDb25maWcsXHJcbiAgICAgICAgICAgICAgICBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudEFkVGFnKClcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHByb3ZpZGVyTmFtZSA9PT0gUFJPVklERVJfUlRNUCl7XHJcbiAgICAgICAgICAgICAgICAvL0lmIHByb3ZpZGVyIHR5cGUgaXMgUlRNUCwgd2UgYWNjZXB0cyBSdG1wRXhwYW5zaW9uLlxyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGF0LCBBcGlSdG1wRXhwYW5zaW9uKGN1cnJlbnRQcm92aWRlcikpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL1RoaXMgcGFzc2VzIHRoZSBldmVudCBjcmVhdGVkIGJ5IHRoZSBQcm92aWRlciB0byBBUEkuXHJcbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5vbihcImFsbFwiLCBmdW5jdGlvbihuYW1lLCBkYXRhKXtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiggbmFtZSA9PT0gRVJST1IpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2hyb21lID49ODAgb24gQW5kcm9pZCBtaXNzZXMgaDI0NiBpbiBTRFAgd2hlbiBmaXJzdCB0aW1lIGFmdGVyIHdlYiBwYWdlIGxvYWRlZC5cclxuICAgICAgICAgICAgICAgICAgICAvLyBTbyB3YWl0IHVudGlsIGJyb3dzZXIgZ2V0IGgyNjQgY2FwYWJpbGl0aWVzIGFuZCBjcmVhdGUgYW5zd2VyIFNEUC5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodXNlckFnZW50T2JqZWN0Lm9zID09PSAnQW5kcm9pZCcgJiYgdXNlckFnZW50T2JqZWN0LmJyb3dzZXIgPT09ICdDaHJvbWUnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLmNvZGUgJiYgZGF0YS5jb2RlID09PSBQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0Q3VycmVudFNvdXJjZSh0aGF0LmdldEN1cnJlbnRTb3VyY2UoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB3ZWJydGNSZXRyeUludGVydmFsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKG5hbWUsIGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKG5hbWUgPT09IFwiY29tcGxldGVcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuTmV4dFBsYXlsaXN0KHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50UGxheWxpc3RJbmRleCgpICsgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYobmFtZSA9PT0gUExBWUVSX1BMQVkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHdlYnJ0Y1JldHJ5VGltZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHdlYnJ0Y1JldHJ5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgd2VicnRjUmV0cnlDb3VudCA9IFdFQlJUQ19SRVRSWV9DT1VOVDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL0F1dG8gc3dpdGNoaW5nIG5leHQgc291cmNlIHdoZW4gcGxheWVyIGxvYWQgZmFpbGVkIGJ5IGFtaXNzIHNvdXJjZS5cclxuICAgICAgICAgICAgICAgIC8vZGF0YS5jb2RlID09PSBQTEFZRVJfRklMRV9FUlJPUlxyXG4gICAgICAgICAgICAgICAgaWYoIG5hbWUgPT09IEVSUk9SIHx8IG5hbWUgPT09IE5FVFdPUktfVU5TVEFCTEVEICl7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmNvZGUgPT09IFBMQVlFUl9XRUJSVENfVU5FWFBFQ1RFRF9ESVNDT05ORUNUXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8ICghcGxheWVyQ29uZmlnLmdldENvbmZpZygpLmF1dG9GYWxsYmFjayAmJiBkYXRhLmNvZGUgPT09IFBMQVlFUl9XRUJSVENfTkVUV09SS19TTE9XKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF3ZWJydGNSZXRyeSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlYnJ0Y1JldHJ5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlYnJ0Y1JldHJ5Q291bnQgPSBXRUJSVENfUkVUUllfQ09VTlQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAod2VicnRjUmV0cnkgJiYgd2VicnRjUmV0cnlDb3VudCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlYnJ0Y1JldHJ5VGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldEN1cnJlbnRTb3VyY2UocGxheWVyQ29uZmlnLmdldFNvdXJjZUluZGV4KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VicnRjUmV0cnlDb3VudCAtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgd2VicnRjUmV0cnlJbnRlcnZhbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAod2VicnRjUmV0cnkgJiYgd2VicnRjUmV0cnlDb3VudCA8PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHdlYnJ0Y1JldHJ5VGltZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWJydGNSZXRyeSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWJydGNSZXRyeUNvdW50ID0gV0VCUlRDX1JFVFJZX0NPVU5UO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmdldENvbmZpZygpLmF1dG9GYWxsYmFjayAmJiBwbGF5ZXJDb25maWcuZ2V0U291cmNlSW5kZXgoKSsxIDwgdGhhdC5nZXRTb3VyY2VzKCkubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzIHNlcXVlbnRpYWwgaGFzIGF2YWlsYWJsZSBzb3VyY2UuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGF1c2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRDdXJyZW50U291cmNlKHBsYXllckNvbmZpZy5nZXRTb3VyY2VJbmRleCgpKzEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pLnRoZW4oKCk9PntcclxuXHJcbiAgICAgICAgICAgIC8vcHJvdmlkZXIncyBwcmVsb2FkKCkgaGF2ZSB0byBtYWRlIFByb21pc2UuIEN1eiBpdCBvdmVyY29tZXMgJ2ZsYXNoIGxvYWRpbmcgdGltaW5nIHByb2JsZW0nLlxyXG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIucHJlbG9hZChwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKSwgbGFzdFBsYXlQb3NpdGlvbikudGhlbihmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihSRUFEWSk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGF6eVF1ZXVlLmZsdXNoKCk7XHJcbiAgICAgICAgICAgICAgICAvL1RoaXMgaXMgbm8gcmVhc29uIHRvIGV4aXN0IGFueW1vcmUuXHJcbiAgICAgICAgICAgICAgICBsYXp5UXVldWUuZGVzdHJveSgpO1xyXG5cclxuICAgICAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsYXp5UXVldWUub2ZmKCk7XHJcbiAgICAgICAgICAgICAgICBpZihlcnJvciAmJiBlcnJvci5jb2RlICYmIEVSUk9SUy5jb2Rlc1tlcnJvci5jb2RlXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKEVSUk9SLCBFUlJPUlMuY29kZXNbZXJyb3IuY29kZV0pO1xyXG4gICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbSU5JVF9VTktOV09OX0VSUk9SXTtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoRVJST1IsIHRlbXBFcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAvL0lOSVQgRVJST1JcclxuICAgICAgICAgICAgaWYoZXJyb3IgJiYgZXJyb3IuY29kZSAmJiBFUlJPUlMuY29kZXNbZXJyb3IuY29kZV0pe1xyXG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKEVSUk9SLCBFUlJPUlMuY29kZXNbZXJyb3IuY29kZV0pO1xyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW0lOSVRfVU5LTldPTl9FUlJPUl07XHJcbiAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihFUlJPUiwgdGVtcEVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy94eHggOiBJZiB5b3UgaW5pdCBlbXB0eSBzb3VyY2VzLiAoSSB0aGluayB0aGlzIGlzIHN0cmFuZ2UgY2FzZS4pXHJcbiAgICAgICAgICAgIC8vVGhpcyB3b3JrcyBmb3IgdGhpcyBjYXNlLlxyXG4gICAgICAgICAgICAvL3BsYXllciA9IE92ZW5QbGF5ZXIuY3JlYXRlKFwiZWxJZFwiLCB7fSk7XHJcbiAgICAgICAgICAgIC8vcGxheWVyLmxvYWQoc29ydWNlcyk7XHJcbiAgICAgICAgICAgIGxhenlRdWV1ZS5vZmYoKTtcclxuICAgICAgICAgICAgLy9sYXp5UXVldWUucmVtb3ZlQW5kRXhjdXRlT25jZShcImxvYWRcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFQSSDstIjquLDtmZQg7ZWo7IiYXHJcbiAgICAgKiBpbml0XHJcbiAgICAgKiBAcGFyYW0gICAgICB7b2JqZWN0fSBvcHRpb25zIHBsYXllciBpbml0aWFsIG9wdGlvbiB2YWx1ZS5cclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiovXHJcbiAgICB0aGF0LmluaXQgPSAob3B0aW9ucykgPT57XHJcbiAgICAgICAgLy9JdCBjb2xsZWN0cyB0aGUgY29tbWFuZHMgYW5kIGV4ZWN1dGVzIHRoZW0gYXQgdGhlIHRpbWUgd2hlbiB0aGV5IGFyZSBleGVjdXRhYmxlLlxyXG4gICAgICAgIGxhenlRdWV1ZSA9IExhenlDb21tYW5kRXhlY3V0b3IodGhhdCwgW1xyXG4gICAgICAgICAgICAnbG9hZCcsJ3BsYXknLCdwYXVzZScsJ3NlZWsnLCdzdG9wJywgJ2dldER1cmF0aW9uJywgJ2dldFBvc2l0aW9uJywgJ2dldFZvbHVtZSdcclxuICAgICAgICAgICAgLCAnZ2V0TXV0ZScsICdnZXRCdWZmZXInLCAnZ2V0U3RhdGUnICwgJ2dldFF1YWxpdHlMZXZlbHMnXHJcbiAgICAgICAgXSk7XHJcbiAgICAgICAgb3B0aW9ucy5tZWRpYUNvbnRhaW5lciA9IGNvbnRhaW5lcjtcclxuICAgICAgICBvcHRpb25zLmJyb3dzZXIgPSB1c2VyQWdlbnRPYmplY3Q7XHJcbiAgICAgICAgcGxheWVyQ29uZmlnID0gQ29uZmlndXJhdG9yKG9wdGlvbnMsIHRoYXQpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGluaXQoKVwiKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpbml0KCkgY29uZmlnIDogXCIsIHBsYXllckNvbmZpZyk7XHJcblxyXG4gICAgICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkud2VicnRjQ29uZmlnICYmIHBsYXllckNvbmZpZy5nZXRDb25maWcoKS53ZWJydGNDb25maWcubG9hZGluZ1JldHJ5Q291bnQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBXRUJSVENfUkVUUllfQ09VTlQgPSBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkubG9hZGluZ1JldHJ5Q291bnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL05vdCB3b3JraW5nIDogU3ludGF4RXJyb3I6IFwiRVJST1JTLmNvZGVzXCIgaXMgcmVhZC1vbmx5XHJcbiAgICAgICAgRVJST1JTLmNvZGVzID0gcGxheWVyQ29uZmlnLmdldFN5c3RlbVRleHQoKS5hcGkuZXJyb3I7XHJcbiAgICAgICAgLy9Db29sXHJcbiAgICAgICAgLy9FUlJPUlMuY29kZXMucHVzaChwbGF5ZXJDb25maWcuZ2V0U3lzdGVtVGV4dCgpKTtcclxuXHJcbiAgICAgICAgcGxheWxpc3RNYW5hZ2VyLmluaXRQbGF5bGlzdChwbGF5ZXJDb25maWcuZ2V0UGxheWxpc3QoKSwgcGxheWVyQ29uZmlnKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpbml0KCkgc291cmNlcyA6IFwiICwgcGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRTb3VyY2VzKCkpO1xyXG5cclxuICAgICAgICBpbml0UHJvdmlkZXIoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFByb3ZpZGVyTmFtZSA9ICgpID0+IHtcclxuICAgICAgICBpZihjdXJyZW50UHJvdmlkZXIpe1xyXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldE5hbWUoKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcbiAgICB0aGF0LmdldE1zZUluc3RhbmNlID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKGN1cnJlbnRQcm92aWRlcil7XHJcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0TXNlKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRDb25maWcgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Q29uZmlnKClcIiwgcGxheWVyQ29uZmlnLmdldENvbmZpZygpKTtcclxuICAgICAgICByZXR1cm4gcGxheWVyQ29uZmlnLmdldENvbmZpZygpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0QnJvd3NlciA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgcmV0dXJuIHBsYXllckNvbmZpZy5nZXRCcm93c2VyKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRUaW1lY29kZU1vZGUgPSAoaXNTaG93KSA9PntcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRUaW1lY29kZU1vZGUoKVwiLCBpc1Nob3cpO1xyXG4gICAgICAgIHBsYXllckNvbmZpZy5zZXRUaW1lY29kZU1vZGUoaXNTaG93KTtcclxuICAgIH07XHJcbiAgICB0aGF0LmlzVGltZWNvZGVNb2RlID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGlzVGltZWNvZGVNb2RlKClcIik7XHJcbiAgICAgICAgcmV0dXJuIHBsYXllckNvbmZpZy5pc1RpbWVjb2RlTW9kZSgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0RnJhbWVyYXRlID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEZyYW1lcmF0ZSgpXCIpO1xyXG5cclxuICAgICAgICBpZiAoY3VycmVudFByb3ZpZGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0RnJhbWVyYXRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcbiAgICB0aGF0LnNlZWtGcmFtZSA9IChmcmFtZUNvdW50KSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNlZWtGcmFtZSgpXCIsIGZyYW1lQ291bnQpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2Vla0ZyYW1lKGZyYW1lQ291bnQpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldER1cmF0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXREdXJhdGlvbigpXCIsIGN1cnJlbnRQcm92aWRlci5nZXREdXJhdGlvbigpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldER1cmF0aW9uKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRQb3NpdGlvbiA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFBvc2l0aW9uKClcIiwgY3VycmVudFByb3ZpZGVyLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0UG9zaXRpb24oKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFZvbHVtZSA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFZvbHVtZSgpXCIsIGN1cnJlbnRQcm92aWRlci5nZXRWb2x1bWUoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRWb2x1bWUoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFZvbHVtZSA9ICh2b2x1bWUpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldFZvbHVtZSgpIFwiICsgdm9sdW1lKTtcclxuICAgICAgICBjdXJyZW50UHJvdmlkZXIuc2V0Vm9sdW1lKHZvbHVtZSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRNdXRlID0gKHN0YXRlKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRNdXRlKCkgXCIgKyBzdGF0ZSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5zZXRNdXRlKHN0YXRlKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldE11dGUgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRNdXRlKCkgXCIgKyBjdXJyZW50UHJvdmlkZXIuZ2V0TXV0ZSgpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldE11dGUoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmxvYWQgPSAocGxheWxpc3QpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBsb2FkKCkgXCIsIHBsYXlsaXN0KTtcclxuICAgICAgICBsYXp5UXVldWUgPSBMYXp5Q29tbWFuZEV4ZWN1dG9yKHRoYXQsIFsncGxheScsJ3NlZWsnLCdzdG9wJ10pO1xyXG5cclxuICAgICAgICBpZihwbGF5bGlzdCl7XHJcbiAgICAgICAgICAgIGlmKGN1cnJlbnRQcm92aWRlcil7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIuc2V0Q3VycmVudFF1YWxpdHkoMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcGxheWxpc3RNYW5hZ2VyLmluaXRQbGF5bGlzdChwbGF5bGlzdCwgcGxheWVyQ29uZmlnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGluaXRQcm92aWRlcigpO1xyXG5cclxuICAgIH07XHJcbiAgICB0aGF0LnBsYXkgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHBsYXkoKSBcIik7XHJcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnBsYXkoKTtcclxuICAgIH1cclxuICAgIHRoYXQucGF1c2UgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBwYXVzZSgpIFwiKTtcclxuICAgICAgICBjdXJyZW50UHJvdmlkZXIucGF1c2UoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNlZWsgPSAocG9zaXRpb24pID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNlZWsoKSBcIisgcG9zaXRpb24pO1xyXG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5zZWVrKHBvc2l0aW9uKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFBsYXliYWNrUmF0ZSA9IChwbGF5YmFja1JhdGUpID0+e1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0UGxheWJhY2tSYXRlKCkgXCIsIHBsYXliYWNrUmF0ZSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5zZXRQbGF5YmFja1JhdGUocGxheWVyQ29uZmlnLnNldFBsYXliYWNrUmF0ZShwbGF5YmFja1JhdGUpKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFBsYXliYWNrUmF0ZSA9ICgpID0+e1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0UGxheWJhY2tSYXRlKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRQbGF5YmFja1JhdGUoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRQbGF5YmFja1JhdGUoKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRQbGF5bGlzdCA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRQbGF5bGlzdCgpIFwiLCBwbGF5bGlzdE1hbmFnZXIuZ2V0UGxheWxpc3QoKSk7XHJcbiAgICAgICAgcmV0dXJuIHBsYXlsaXN0TWFuYWdlci5nZXRQbGF5bGlzdCgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q3VycmVudFBsYXlsaXN0ID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEN1cnJlbnRQbGF5bGlzdCgpIFwiLCBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFBsYXlsaXN0SW5kZXgoKSk7XHJcbiAgICAgICAgcmV0dXJuIHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50UGxheWxpc3RJbmRleCgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Q3VycmVudFBsYXlsaXN0ID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Q3VycmVudFBsYXlsaXN0KCkgXCIsIGluZGV4KTtcclxuICAgICAgICBydW5OZXh0UGxheWxpc3QoaW5kZXgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldFNvdXJjZXMgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRTb3VyY2VzKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRTb3VyY2VzKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0U291cmNlcygpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q3VycmVudFNvdXJjZSA9ICgpID0+e1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Q3VycmVudFNvdXJjZSgpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFNvdXJjZSgpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldEN1cnJlbnRTb3VyY2UoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEN1cnJlbnRTb3VyY2UgPSAoaW5kZXgpID0+e1xyXG5cclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEN1cnJlbnRTb3VyY2UoKSBcIiwgaW5kZXgpO1xyXG5cclxuICAgICAgICBsZXQgc291cmNlcyA9IGN1cnJlbnRQcm92aWRlci5nZXRTb3VyY2VzKCk7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRTb3VyY2UgPSBzb3VyY2VzW2N1cnJlbnRQcm92aWRlci5nZXRDdXJyZW50U291cmNlKCldO1xyXG4gICAgICAgIGxldCBuZXdTb3VyY2UgPSBzb3VyY2VzW2luZGV4XTtcclxuICAgICAgICBsZXQgbGFzdFBsYXlQb3NpdGlvbiA9IGN1cnJlbnRQcm92aWRlci5nZXRQb3NpdGlvbigpO1xyXG4gICAgICAgIGxldCBpc1NhbWVQcm92aWRlciA9IHByb3ZpZGVyQ29udHJvbGxlci5pc1NhbWVQcm92aWRlcihjdXJyZW50U291cmNlLCBuZXdTb3VyY2UpO1xyXG4gICAgICAgIC8vIHByb3ZpZGVyLnNlckN1cnJlbnRRdWFsaXR5IC0+IHBsYXllckNvbmZpZyBzZXR0aW5nIC0+IGxvYWRcclxuICAgICAgICBsZXQgcmVzdWx0U291cmNlSW5kZXggPSBjdXJyZW50UHJvdmlkZXIuc2V0Q3VycmVudFNvdXJjZShpbmRleCwgaXNTYW1lUHJvdmlkZXIpO1xyXG5cclxuICAgICAgICBpZighbmV3U291cmNlKXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRDdXJyZW50UXVhbGl0eSgpIGlzU2FtZVByb3ZpZGVyXCIsIGlzU2FtZVByb3ZpZGVyKTtcclxuXHJcbiAgICAgICAgLy9zd2l0Y2hpbmcgYmV0d2VlbiBzdHJlYW1zIG9uIEhMUy4gd3RoPyBodHRwczovL3ZpZGVvLWRldi5naXRodWIuaW8vaGxzLmpzL2xhdGVzdC9kb2NzL0FQSS5odG1sI2ZpbmFsLXN0ZXAtZGVzdHJveWluZy1zd2l0Y2hpbmctYmV0d2Vlbi1zdHJlYW1zXHJcbiAgICAgICAgaWYoIWlzU2FtZVByb3ZpZGVyIHx8IGN1cnJlbnRQcm92aWRlci5nZXROYW1lKCkgPT09IFBST1ZJREVSX0hMUyB8fCBjdXJyZW50UHJvdmlkZXIuZ2V0TmFtZSgpID09PSBQUk9WSURFUl9EQVNIIHx8IGN1cnJlbnRQcm92aWRlci5nZXROYW1lKCkgPT09IFBST1ZJREVSX0hUTUw1KXtcclxuICAgICAgICAgICAgbGF6eVF1ZXVlID0gTGF6eUNvbW1hbmRFeGVjdXRvcih0aGF0LCBbJ3BsYXknLCdzZWVrJ10pO1xyXG4gICAgICAgICAgICBpbml0UHJvdmlkZXIobGFzdFBsYXlQb3NpdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0U291cmNlSW5kZXg7XHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgdGhhdC5nZXRRdWFsaXR5TGV2ZWxzID0gKCkgPT57XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRRdWFsaXR5TGV2ZWxzKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRRdWFsaXR5TGV2ZWxzKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0UXVhbGl0eUxldmVscygpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q3VycmVudFF1YWxpdHkgPSAoKSA9PntcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEN1cnJlbnRRdWFsaXR5KCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRDdXJyZW50UXVhbGl0eSgpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldEN1cnJlbnRRdWFsaXR5KCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRDdXJyZW50UXVhbGl0eSA9IChxdWFsaXR5SW5kZXgpID0+e1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Q3VycmVudFF1YWxpdHkoKSBcIiwgcXVhbGl0eUluZGV4KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5zZXRDdXJyZW50UXVhbGl0eShxdWFsaXR5SW5kZXgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuaXNBdXRvUXVhbGl0eSA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGlzQXV0b1F1YWxpdHkoKVwiKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmlzQXV0b1F1YWxpdHkoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEF1dG9RdWFsaXR5ID0gKGlzQXV0bykgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0QXV0b1F1YWxpdHkoKSBcIiwgaXNBdXRvKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLnNldEF1dG9RdWFsaXR5KGlzQXV0byk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhhdC5nZXRDYXB0aW9uTGlzdCA9ICgpID0+IHtcclxuICAgICAgICBpZighY2FwdGlvbk1hbmFnZXIpe3JldHVybiBudWxsO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRDYXB0aW9uTGlzdCgpIFwiLCBjYXB0aW9uTWFuYWdlci5nZXRDYXB0aW9uTGlzdCgpKTtcclxuICAgICAgICByZXR1cm4gY2FwdGlvbk1hbmFnZXIuZ2V0Q2FwdGlvbkxpc3QoKTtcclxuICAgIH1cclxuICAgIHRoYXQuZ2V0Q3VycmVudENhcHRpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWNhcHRpb25NYW5hZ2VyKXtyZXR1cm4gbnVsbDt9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Q3VycmVudENhcHRpb24oKSBcIiwgY2FwdGlvbk1hbmFnZXIuZ2V0Q3VycmVudENhcHRpb24oKSk7XHJcbiAgICAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLmdldEN1cnJlbnRDYXB0aW9uKCk7XHJcbiAgICB9XHJcbiAgICB0aGF0LnNldEN1cnJlbnRDYXB0aW9uID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgaWYoIWNhcHRpb25NYW5hZ2VyKXtyZXR1cm4gbnVsbDt9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Q3VycmVudENhcHRpb24oKSBcIiwgaW5kZXgpO1xyXG4gICAgICAgIGNhcHRpb25NYW5hZ2VyLnNldEN1cnJlbnRDYXB0aW9uKGluZGV4KTtcclxuICAgIH1cclxuICAgIHRoYXQuYWRkQ2FwdGlvbiA9ICh0cmFjaykgPT4ge1xyXG4gICAgICAgIGlmKCFjYXB0aW9uTWFuYWdlcil7cmV0dXJuIG51bGw7fVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGFkZENhcHRpb24oKSBcIilcclxuICAgICAgICByZXR1cm4gY2FwdGlvbk1hbmFnZXIuYWRkQ2FwdGlvbih0cmFjayk7XHJcbiAgICB9XHJcbiAgICB0aGF0LnJlbW92ZUNhcHRpb24gPSAoaW5kZXgpID0+IHtcclxuICAgICAgICBpZighY2FwdGlvbk1hbmFnZXIpe3JldHVybiBudWxsO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiByZW1vdmVDYXB0aW9uKCkgXCIsIGluZGV4KVxyXG4gICAgICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5yZW1vdmVDYXB0aW9uKGluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGF0LmdldEJ1ZmZlciA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0QnVmZmVyKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRCdWZmZXIoKSk7XHJcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLmdldEJ1ZmZlcigpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0U3RhdGUgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFN0YXRlKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRTdGF0ZSgpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFN0YXRlKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zdG9wID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc3RvcCgpIFwiKTtcclxuICAgICAgICBjdXJyZW50UHJvdmlkZXIuc3RvcCgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQucmVtb3ZlID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcmVtb3ZlKCkgXCIpO1xyXG4gICAgICAgIGxhenlRdWV1ZS5kZXN0cm95KCk7XHJcbiAgICAgICAgaWYoY2FwdGlvbk1hbmFnZXIpe1xyXG4gICAgICAgICAgICBjYXB0aW9uTWFuYWdlci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIGNhcHRpb25NYW5hZ2VyID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGN1cnJlbnRQcm92aWRlcil7XHJcbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihtZWRpYU1hbmFnZXIpe1xyXG4gICAgICAgICAgICBtZWRpYU1hbmFnZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICBtZWRpYU1hbmFnZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhhdC50cmlnZ2VyKERFU1RST1kpO1xyXG4gICAgICAgIHRoYXQub2ZmKCk7XHJcblxyXG4gICAgICAgIHByb3ZpZGVyQ29udHJvbGxlciA9IG51bGw7XHJcbiAgICAgICAgcGxheWxpc3RNYW5hZ2VyID0gbnVsbDtcclxuICAgICAgICBwbGF5ZXJDb25maWcgPSBudWxsO1xyXG4gICAgICAgIGxhenlRdWV1ZSA9IG51bGw7XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHJlbW92ZSgpIC0gbGF6eVF1ZXVlLCBjdXJyZW50UHJvdmlkZXIsIHByb3ZpZGVyQ29udHJvbGxlciwgcGxheWxpc3RNYW5hZ2VyLCBwbGF5ZXJDb25maWcsIGFwaSBldmVudCBkZXN0cm9lZC4gXCIpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJTREsucmVtb3ZlUGxheWVyKHRoYXQuZ2V0Q29udGFpbmVySWQoKSk7XHJcbiAgICAgICAgaWYoT3ZlblBsYXllclNESy5nZXRQbGF5ZXJMaXN0KCkubGVuZ3RoICA9PT0gMCl7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIk92ZW5QbGF5ZXJTREsucGxheWVyTGlzdFwiLCAgT3ZlblBsYXllclNESy5nZXRQbGF5ZXJMaXN0KCkpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRWZXJzaW9uID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBcInYuXCIrdmVyc2lvbjtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwaTtcclxuXHJcblxyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDguIDI0Li5cclxuICovXHJcblxyXG5leHBvcnQgY29uc3QgQXBpUnRtcEV4cGFuc2lvbiA9IGZ1bmN0aW9uKGN1cnJlbnRQcm92aWRlcil7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGV4dGVybmFsQ2FsbGJhY2tDcmVlcCA6IChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgaWYocmVzdWx0Lm5hbWUgJiYgcmVzdWx0LmRhdGEpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci50cmlnZ2VyRXZlbnRGcm9tRXh0ZXJuYWwocmVzdWx0Lm5hbWUsIHJlc3VsdC5kYXRhKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn07XHJcbiIsImltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgQ09OVEVOVF9USU1FX01PREVfQ0hBTkdFRCwgU1lTVEVNX1RFWFRcclxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIFRoaXMgaW5pdGlhbGl6ZXMgdGhlIGlucHV0IG9wdGlvbnMuXHJcbiAqIEBwYXJhbSAgIG9wdGlvbnNcclxuICpcclxuICogKi9cclxuY29uc3QgQ29uZmlndXJhdG9yID0gZnVuY3Rpb24ob3B0aW9ucywgcHJvdmlkZXIpe1xyXG5cclxuICAgIGNvbnN0IGNvbXBvc2VTb3VyY2VPcHRpb25zID0gZnVuY3Rpb24ob3B0aW9ucyl7XHJcbiAgICAgICAgY29uc3QgRGVmYXVsdHMgPSB7XHJcbiAgICAgICAgICAgIG1lZGlhQ29udGFpbmVyIDogXCJcIixcclxuICAgICAgICAgICAgcGxheWJhY2tSYXRlczogWzIsIDEuNSwgMSwgMC41LCAwLjI1XSxcclxuICAgICAgICAgICAgcGxheWJhY2tSYXRlOiAxLFxyXG4gICAgICAgICAgICBtdXRlOiBmYWxzZSxcclxuICAgICAgICAgICAgdm9sdW1lOiAxMDAsXHJcbiAgICAgICAgICAgIGxvb3AgOiBmYWxzZSxcclxuICAgICAgICAgICAgY29udHJvbHMgOiB0cnVlLFxyXG4gICAgICAgICAgICBhdXRvU3RhcnQgOiBmYWxzZSxcclxuICAgICAgICAgICAgYXV0b0ZhbGxiYWNrOiB0cnVlLFxyXG4gICAgICAgICAgICB0aW1lY29kZSA6IHRydWUsXHJcbiAgICAgICAgICAgIHNvdXJjZUluZGV4IDogMCxcclxuICAgICAgICAgICAgYnJvd3NlciA6IFwiXCIsXHJcbiAgICAgICAgICAgIGhpZGVQbGF5bGlzdEljb24gOiBmYWxzZSxcclxuICAgICAgICAgICAgcnRtcEJ1ZmZlclRpbWUgOiAxLFxyXG4gICAgICAgICAgICBydG1wQnVmZmVyVGltZU1heCA6IDMsXHJcbiAgICAgICAgICAgIGFkQ2xpZW50IDogXCJnb29nbGVpbWFcIixcclxuICAgICAgICAgICAgY3VycmVudFByb3RvY29sT25seSA6IGZhbHNlLFxyXG4gICAgICAgICAgICBzeXN0ZW1UZXh0IDogbnVsbCxcclxuICAgICAgICAgICAgbGFuZyA6IFwiZW5cIixcclxuICAgICAgICAgICAgbG9hZGluZ1JldHJ5Q291bnQ6IDAsXHJcbiAgICAgICAgICAgIGV4cGFuZEZ1bGxTY3JlZW5VSTogZmFsc2UsXHJcbiAgICAgICAgICAgIGZ1bGxzY3JlZW5PcHRpb246IG51bGwsXHJcbiAgICAgICAgICAgIHNob3dCaWdQbGF5QnV0dG9uOiB0cnVlXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBzZXJpYWxpemUgPSBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgICAgICAgIGlmICh2YWwgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnICYmIHZhbC5sZW5ndGggPCA2KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsb3dlcmNhc2VWYWwgPSB2YWwudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgIGlmIChsb3dlcmNhc2VWYWwgPT09ICd0cnVlJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGxvd2VyY2FzZVZhbCA9PT0gJ2ZhbHNlJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghaXNOYU4oTnVtYmVyKHZhbCkpICYmICFpc05hTihwYXJzZUZsb2F0KHZhbCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE51bWJlcih2YWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGRlc2VyaWFsaXplID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSAnaWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgb3B0aW9uc1trZXldID0gc2VyaWFsaXplKG9wdGlvbnNba2V5XSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGVzZXJpYWxpemUob3B0aW9ucyk7XHJcbiAgICAgICAgbGV0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIERlZmF1bHRzLCBvcHRpb25zKTtcclxuICAgICAgICBsZXQgdXNlckN1c3R1bVN5c3RlbVRleHQgPSBbXTtcclxuICAgICAgICBpZihjb25maWcuc3lzdGVtVGV4dCl7XHJcbiAgICAgICAgICAgIHVzZXJDdXN0dW1TeXN0ZW1UZXh0ID0gXy5pc0FycmF5KGNvbmZpZy5zeXN0ZW1UZXh0KSA/IGNvbmZpZy5zeXN0ZW1UZXh0IDogW2NvbmZpZy5zeXN0ZW1UZXh0XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB1c2VyQ3VzdHVtU3lzdGVtVGV4dC5sZW5ndGg7IGkgKyspe1xyXG4gICAgICAgICAgICBpZih1c2VyQ3VzdHVtU3lzdGVtVGV4dFtpXS5sYW5nKXtcclxuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50U3lzdGVtVGV4dCA9IF8uZmluZFdoZXJlKFNZU1RFTV9URVhUICwge1wibGFuZ1wiOiB1c2VyQ3VzdHVtU3lzdGVtVGV4dFtpXS5sYW5nfSk7XHJcbiAgICAgICAgICAgICAgICBpZihjdXJyZW50U3lzdGVtVGV4dCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy92YWxpZGF0ZSAmIHVwZGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oY3VycmVudFN5c3RlbVRleHQsIHVzZXJDdXN0dW1TeXN0ZW1UZXh0W2ldKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY3JlYXRlXHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFN5c3RlbVRleHQgPSBfLmZpbmRXaGVyZShTWVNURU1fVEVYVCAsIHtcImxhbmdcIjogXCJlblwifSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFN5c3RlbVRleHQubGFuZyA9IHVzZXJDdXN0dW1TeXN0ZW1UZXh0W2ldLmxhbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgU1lTVEVNX1RFWFQucHVzaChPYmplY3QuYXNzaWduKHVzZXJDdXN0dW1TeXN0ZW1UZXh0W2ldLCBjdXJyZW50U3lzdGVtVGV4dCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbmZpZy5zeXN0ZW1UZXh0ID0gXy5maW5kV2hlcmUoU1lTVEVNX1RFWFQgLCB7XCJsYW5nXCI6IGNvbmZpZy5sYW5nfSk7XHJcblxyXG4gICAgICAgIGxldCBwbGF5YmFja1JhdGVzID0gY29uZmlnLnBsYXliYWNrUmF0ZXM7XHJcblxyXG4gICAgICAgIHBsYXliYWNrUmF0ZXMgPSBwbGF5YmFja1JhdGVzLmZpbHRlcihyYXRlID0+IF8uaXNOdW1iZXIocmF0ZSkgJiYgcmF0ZSA+PSAwLjI1ICYmIHJhdGUgPD0gNCkubWFwKHJhdGUgPT4gTWF0aC5yb3VuZChyYXRlICogNCkgLyA0KTtcclxuXHJcbiAgICAgICAgaWYgKHBsYXliYWNrUmF0ZXMuaW5kZXhPZigxKSA8IDApIHtcclxuICAgICAgICAgICAgcGxheWJhY2tSYXRlcy5wdXNoKDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwbGF5YmFja1JhdGVzLnNvcnQoKTtcclxuXHJcbiAgICAgICAgY29uZmlnLnBsYXliYWNrUmF0ZXMgPSBwbGF5YmFja1JhdGVzO1xyXG5cclxuICAgICAgICBjb25maWcucnRtcEJ1ZmZlclRpbWUgPSBjb25maWcucnRtcEJ1ZmZlclRpbWUgPiAxMCA/IDEwIDogY29uZmlnLnJ0bXBCdWZmZXJUaW1lO1xyXG4gICAgICAgIGNvbmZpZy5ydG1wQnVmZmVyVGltZU1heCA9IGNvbmZpZy5ydG1wQnVmZmVyVGltZU1heCA+IDUwID8gNTAgOiBjb25maWcucnRtcEJ1ZmZlclRpbWVNYXg7XHJcblxyXG5cclxuICAgICAgICBpZiAoY29uZmlnLnBsYXliYWNrUmF0ZXMuaW5kZXhPZihjb25maWcucGxheWJhY2tSYXRlKSA8IDApIHtcclxuICAgICAgICAgICAgY29uZmlnLnBsYXliYWNrUmF0ZSA9IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBjb25maWdQbGF5bGlzdCA9IGNvbmZpZy5wbGF5bGlzdDtcclxuICAgICAgICBpZiAoIWNvbmZpZ1BsYXlsaXN0KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9iaiA9IF8ucGljayhjb25maWcsIFtcclxuICAgICAgICAgICAgICAgICd0aXRsZScsXHJcbiAgICAgICAgICAgICAgICAnZGVzY3JpcHRpb24nLFxyXG4gICAgICAgICAgICAgICAgJ3R5cGUnLFxyXG4gICAgICAgICAgICAgICAgJ2ltYWdlJyxcclxuICAgICAgICAgICAgICAgICdmaWxlJyxcclxuICAgICAgICAgICAgICAgICdzb3VyY2VzJyxcclxuICAgICAgICAgICAgICAgICd0cmFja3MnLFxyXG4gICAgICAgICAgICAgICAgJ2hvc3QnLFxyXG4gICAgICAgICAgICAgICAgJ2FwcGxpY2F0aW9uJyxcclxuICAgICAgICAgICAgICAgICdzdHJlYW0nLFxyXG4gICAgICAgICAgICAgICAgJ2FkVGFnVXJsJ1xyXG4gICAgICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgICAgIGNvbmZpZy5wbGF5bGlzdCA9IFsgb2JqIF07XHJcbiAgICAgICAgfSBlbHNlIGlmIChfLmlzQXJyYXkoY29uZmlnUGxheWxpc3QucGxheWxpc3QpKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5mZWVkRGF0YSA9IGNvbmZpZ1BsYXlsaXN0O1xyXG4gICAgICAgICAgICBjb25maWcucGxheWxpc3QgPSBjb25maWdQbGF5bGlzdC5wbGF5bGlzdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRlbGV0ZSBjb25maWcuZHVyYXRpb247XHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZztcclxuICAgIH07XHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDb25maWd1cmF0b3IgbG9hZGVkLlwiLCBvcHRpb25zKTtcclxuICAgIGxldCBzcGVjID0gY29tcG9zZVNvdXJjZU9wdGlvbnMob3B0aW9ucyk7XHJcblxyXG4gICAgLy9zcGVjLmlzRnVsbHNjcmVlbiA9IGZhbHNlOyAvL0lFIDExIGNhbid0IGNoZWNrIGN1cnJlbnQgZnVsbHNjcmVlbiBzdGF0ZS5cclxuXHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICB0aGF0LmdldENvbmZpZyA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYztcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEFkQ2xpZW50ID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLmFkQ2xpZW50O1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Q29uZmlnID0gKGNvbmZpZywgdmFsdWUpID0+IHtcclxuICAgICAgICBzcGVjW2NvbmZpZ10gPSB2YWx1ZTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRDb250YWluZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMubWVkaWFDb250YWluZXI7XHJcbiAgICB9O1xyXG4gICAgLyp0aGF0LmlzRnVsbHNjcmVlbiA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5pc0Z1bGxzY3JlZW47XHJcbiAgICB9XHJcbiAgICB0aGF0LnNldEZ1bGxzY3JlZW4gPSAoaXNGdWxsc2NyZWVuKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuaXNGdWxsc2NyZWVuID0gaXNGdWxsc2NyZWVuO1xyXG4gICAgfSovXHJcblxyXG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGUgPSgpPT57XHJcbiAgICAgICAgcmV0dXJuIHNwZWMucGxheWJhY2tSYXRlO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0UGxheWJhY2tSYXRlID0ocGxheWJhY2tSYXRlKT0+e1xyXG4gICAgICAgIHNwZWMucGxheWJhY2tSYXRlID0gcGxheWJhY2tSYXRlO1xyXG4gICAgICAgIHJldHVybiBwbGF5YmFja1JhdGU7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0UXVhbGl0eUxhYmVsID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLnF1YWxpdHlMYWJlbDtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFF1YWxpdHlMYWJlbCA9IChuZXdMYWJlbCkgPT4ge1xyXG4gICAgICAgIHNwZWMucXVhbGl0eUxhYmVsID0gbmV3TGFiZWw7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuaXNDdXJyZW50UHJvdG9jb2xPbmx5ID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRQcm90b2NvbE9ubHk7XHJcbiAgICB9O1xyXG4gICAgLyp0aGF0LmdldFNvdXJjZUxhYmVsID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLnNvdXJjZUxhYmVsO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0U291cmNlTGFiZWwgPSAobmV3TGFiZWwpID0+IHtcclxuICAgICAgICBzcGVjLnNvdXJjZUxhYmVsID0gbmV3TGFiZWw7XHJcbiAgICB9OyovXHJcblxyXG4gICAgdGhhdC5nZXRTb3VyY2VJbmRleCA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5zb3VyY2VJbmRleDtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFNvdXJjZUluZGV4ID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgc3BlYy5zb3VyY2VJbmRleCA9IGluZGV4O1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0VGltZWNvZGVNb2RlID0gKHRpbWVjb2RlKSA9PiB7XHJcbiAgICAgICAgaWYoc3BlYy50aW1lY29kZSAhPT0gdGltZWNvZGUpe1xyXG4gICAgICAgICAgICBzcGVjLnRpbWVjb2RlID0gdGltZWNvZGU7XHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoQ09OVEVOVF9USU1FX01PREVfQ0hBTkdFRCwgdGltZWNvZGUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aGF0LmlzVGltZWNvZGVNb2RlID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLnRpbWVjb2RlO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0UnRtcEJ1ZmZlclRpbWUgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMucnRtcEJ1ZmZlclRpbWU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRSdG1wQnVmZmVyVGltZU1heCA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5ydG1wQnVmZmVyVGltZU1heDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5pc011dGUgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gc3BlYy5tdXRlO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Vm9sdW1lID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIHNwZWMudm9sdW1lO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Vm9sdW1lID0gKHZvbHVtZSkgPT57XHJcbiAgICAgICAgc3BlYy52b2x1bWUgPSB2b2x1bWU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5pc0xvb3AgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gc3BlYy5sb29wO1xyXG4gICAgfTtcclxuICAgIHRoYXQuaXNBdXRvU3RhcnQgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gc3BlYy5hdXRvU3RhcnQ7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5pc0NvbnRyb2xzID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuY29udHJvbHM7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0UGxheWJhY2tSYXRlcyA9KCk9PntcclxuICAgICAgICByZXR1cm4gc3BlYy5wbGF5YmFja1JhdGVzO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0QnJvd3NlciA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5icm93c2VyO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0U3lzdGVtVGV4dCA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5zeXN0ZW1UZXh0O1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0TGFuZ3VhZ2UgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMubGFuZztcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRQbGF5bGlzdCA9KCk9PntcclxuICAgICAgICByZXR1cm4gc3BlYy5wbGF5bGlzdDtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFBsYXlsaXN0ID0ocGxheWxpc3QpPT57XHJcbiAgICAgICAgaWYoXy5pc0FycmF5KHBsYXlsaXN0KSl7XHJcbiAgICAgICAgICAgIHNwZWMucGxheWxpc3QgPSBwbGF5bGlzdDtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgc3BlYy5wbGF5bGlzdCA9IFtwbGF5bGlzdF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzcGVjLnBsYXlsaXN0O1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbmZpZ3VyYXRvcjtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAzLi5cclxuICovXHJcblxyXG4vKipcclxuICogQGJyaWVmICAgVGhpcyBtb2R1bGUgcHJvdmlkZSBjdXN0b20gZXZlbnRzLlxyXG4gKiBAcGFyYW0gICBvYmplY3QgICAgQW4gb2JqZWN0IHRoYXQgcmVxdWlyZXMgY3VzdG9tIGV2ZW50cy5cclxuICpcclxuICogKi9cclxuXHJcbmNvbnN0IEV2ZW50RW1pdHRlciA9IGZ1bmN0aW9uKG9iamVjdCl7XHJcbiAgICBsZXQgdGhhdCA9IG9iamVjdDtcclxuICAgIGxldCBfZXZlbnRzID1bXTtcclxuXHJcbiAgICBjb25zdCB0cmlnZ2VyRXZlbnRzID0gZnVuY3Rpb24oZXZlbnRzLCBhcmdzLCBjb250ZXh0KXtcclxuICAgICAgICBsZXQgaSA9IDA7XHJcbiAgICAgICAgbGV0IGxlbmd0aCA9IGV2ZW50cy5sZW5ndGg7XHJcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgbGVuZ3RoOyBpICsrKXtcclxuICAgICAgICAgICAgbGV0IGV2ZW50ID0gZXZlbnRzW2ldO1xyXG4gICAgICAgICAgICBldmVudC5saXN0ZW5lci5hcHBseSggKCBldmVudC5jb250ZXh0IHx8IGNvbnRleHQgKSwgYXJncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0Lm9uID0gZnVuY3Rpb24obmFtZSwgbGlzdGVuZXIsIGNvbnRleHQpe1xyXG4gICAgICAgIChfZXZlbnRzW25hbWVdIHx8IChfZXZlbnRzW25hbWVdPVtdKSApLnB1c2goeyBsaXN0ZW5lcjogbGlzdGVuZXIgICwgY29udGV4dCA6IGNvbnRleHR9KTtcclxuICAgICAgICByZXR1cm4gdGhhdDtcclxuICAgIH07XHJcbiAgICB0aGF0LnRyaWdnZXIgPSBmdW5jdGlvbihuYW1lKXtcclxuICAgICAgICBpZighX2V2ZW50cyl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcclxuICAgICAgICBjb25zdCBldmVudHMgPSBfZXZlbnRzW25hbWVdO1xyXG4gICAgICAgIGNvbnN0IGFsbEV2ZW50cyA9IF9ldmVudHMuYWxsO1xyXG5cclxuICAgICAgICBpZihldmVudHMpe1xyXG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnRzKGV2ZW50cywgYXJncywgdGhhdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGFsbEV2ZW50cyl7XHJcbiAgICAgICAgICAgIHRyaWdnZXJFdmVudHMoYWxsRXZlbnRzLCBhcmd1bWVudHMsIHRoYXQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aGF0Lm9mZiA9IGZ1bmN0aW9uKG5hbWUsIGxpc3RlbmVyLCBjb250ZXh0KXtcclxuICAgICAgICBpZighX2V2ZW50cyl7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghbmFtZSAmJiAhbGlzdGVuZXIgJiYgIWNvbnRleHQpICB7XHJcbiAgICAgICAgICAgIF9ldmVudHMgPSBbXTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoYXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBuYW1lcyA9IG5hbWUgPyBbbmFtZV0gOiBPYmplY3Qua2V5cyhfZXZlbnRzKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBuYW1lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgbmFtZSA9IG5hbWVzW2ldO1xyXG4gICAgICAgICAgICBjb25zdCBldmVudHMgPSBfZXZlbnRzW25hbWVdO1xyXG4gICAgICAgICAgICBpZiAoZXZlbnRzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXRhaW4gPSBfZXZlbnRzW25hbWVdID0gW107XHJcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIgIHx8IGNvbnRleHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMCwgayA9IGV2ZW50cy5sZW5ndGg7IGogPCBrOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXZlbnQgPSBldmVudHNbal07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgobGlzdGVuZXIgJiYgbGlzdGVuZXIgIT09IGV2ZW50Lmxpc3RlbmVyICYmIGxpc3RlbmVyICE9PSBldmVudC5saXN0ZW5lci5saXN0ZW5lciAgJiYgbGlzdGVuZXIgIT09IGV2ZW50Lmxpc3RlbmVyLl9saXN0ZW5lcilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8KGNvbnRleHQgJiYgY29udGV4dCAhPT0gZXZlbnQuY29udGV4dClcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXRhaW4ucHVzaChldmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIXJldGFpbi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgX2V2ZW50c1tuYW1lXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhhdDtcclxuICAgIH07XHJcbiAgICB0aGF0Lm9uY2UgPSBmdW5jdGlvbihuYW1lLCBsaXN0ZW5lciwgY29udGV4dCl7XHJcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICBjb25zdCBvbmNlQ2FsbGJhY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKGNvdW50KyspIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGF0Lm9mZihuYW1lLCBvbmNlQ2FsbGJhY2spO1xyXG4gICAgICAgICAgICBsaXN0ZW5lci5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgb25jZUNhbGxiYWNrLl9saXN0ZW5lciA9IGxpc3RlbmVyO1xyXG4gICAgICAgIHJldHVybiB0aGF0Lm9uKG5hbWUsIG9uY2VDYWxsYmFjaywgY29udGV4dCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFdmVudEVtaXR0ZXI7XHJcbiIsImltcG9ydCBfIGZyb20gJ3V0aWxzL3VuZGVyc2NvcmUnO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIFRoaXMgZXhlY3V0ZXMgdGhlIGlucHV0IGNvbW1hbmRzIGF0IGEgc3BlY2lmaWMgcG9pbnQgaW4gdGltZS5cclxuICogQHBhcmFtICAgaW5zdGFuY2VcclxuICogQHBhcmFtICAgcXVldWVkQ29tbWFuZHNcclxuICogKi9cclxuY29uc3QgTGF6eUNvbW1hbmRFeGVjdXRvciA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgcXVldWVkQ29tbWFuZHMpIHtcclxuICAgIGxldCBjb21tYW5kUXVldWUgPSBbXTtcclxuICAgIGxldCB1bmRlY29yYXRlZE1ldGhvZHMgPSB7fTtcclxuICAgIGxldCBleGVjdXRlTW9kZSA9IGZhbHNlO1xyXG4gICAgbGV0IHRoYXQgPSB7fTtcclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgbG9hZGVkLlwiKTtcclxuICAgIHF1ZXVlZENvbW1hbmRzLmZvckVhY2goKGNvbW1hbmQpID0+IHtcclxuICAgICAgICBjb25zdCBtZXRob2QgPSBpbnN0YW5jZVtjb21tYW5kXTtcclxuICAgICAgICB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF0gPSBtZXRob2QgfHwgZnVuY3Rpb24oKXt9O1xyXG5cclxuICAgICAgICBpbnN0YW5jZVtjb21tYW5kXSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcclxuICAgICAgICAgICAgICBpZiAoIWV4ZWN1dGVNb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAvL2NvbW1hbmRRdWV1ZS5wdXNoKHsgY29tbWFuZCwgYXJncyB9KTtcclxuICAgICAgICAgICAgICAgIHRoYXQuYWRkUXVldWUoY29tbWFuZCwgYXJncylcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGV4ZWN1dGVRdWV1ZWRDb21tYW5kcygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1ldGhvZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZC5hcHBseSh0aGF0LCBhcmdzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxuICAgIHZhciBleGVjdXRlUXVldWVkQ29tbWFuZHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgd2hpbGUgKGNvbW1hbmRRdWV1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgY29tbWFuZCwgYXJncyB9ID0gY29tbWFuZFF1ZXVlLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICh1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF0gfHwgaW5zdGFuY2VbY29tbWFuZF0pLmFwcGx5KGluc3RhbmNlLCBhcmdzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhhdC5zZXRFeGVjdXRlTW9kZSA9IChtb2RlKSA9PiB7XHJcbiAgICAgICAgZXhlY3V0ZU1vZGUgPSBtb2RlO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBzZXRFeGVjdXRlTW9kZSgpXCIsIG1vZGUpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0VW5kZWNvcmF0ZWRNZXRob2RzID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZ2V0VW5kZWNvcmF0ZWRNZXRob2RzKClcIiwgdW5kZWNvcmF0ZWRNZXRob2RzKTtcclxuICAgICAgICByZXR1cm4gdW5kZWNvcmF0ZWRNZXRob2RzO1xyXG4gICAgfVxyXG4gICAgdGhhdC5nZXRRdWV1ZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGdldFF1ZXVlKClcIiwgZ2V0UXVldWUpO1xyXG4gICAgICAgIHJldHVybiBjb21tYW5kUXVldWU7XHJcbiAgICB9XHJcbiAgICB0aGF0LmFkZFF1ZXVlID0gZnVuY3Rpb24oY29tbWFuZCwgYXJncyl7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGFkZFF1ZXVlKClcIiwgY29tbWFuZCwgYXJncyk7XHJcbiAgICAgICAgY29tbWFuZFF1ZXVlLnB1c2goeyBjb21tYW5kLCBhcmdzIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoYXQuZmx1c2ggPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBmbHVzaCgpXCIpO1xyXG4gICAgICAgIGV4ZWN1dGVRdWV1ZWRDb21tYW5kcygpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZW1wdHkgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZW1wdHkoKVwiKTtcclxuICAgICAgICBjb21tYW5kUXVldWUubGVuZ3RoID0gMDtcclxuICAgIH07XHJcbiAgICB0aGF0Lm9mZiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBvZmYoKVwiKTtcclxuICAgICAgICBxdWV1ZWRDb21tYW5kcy5mb3JFYWNoKChjb21tYW5kKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1ldGhvZCA9IHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXTtcclxuICAgICAgICAgICAgaWYgKG1ldGhvZCkge1xyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2VbY29tbWFuZF0gPSBtZXRob2Q7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvL1J1biBvbmNlIGF0IHRoZSBlbmRcclxuICAgIHRoYXQucmVtb3ZlQW5kRXhjdXRlT25jZSA9IGZ1bmN0aW9uKGNvbW1hbmRfKXtcclxuICAgICAgICBsZXQgY29tbWFuZFF1ZXVlSXRlbSA9IF8uZmluZFdoZXJlKGNvbW1hbmRRdWV1ZSwge2NvbW1hbmQgOiBjb21tYW5kX30pO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiByZW1vdmVBbmRFeGN1dGVPbmNlKClcIiwgY29tbWFuZF8pO1xyXG4gICAgICAgIGNvbW1hbmRRdWV1ZS5zcGxpY2UoXy5maW5kSW5kZXgoY29tbWFuZFF1ZXVlLCB7Y29tbWFuZCA6IGNvbW1hbmRffSksIDEpO1xyXG5cclxuICAgICAgICBjb25zdCBtZXRob2QgPSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF9dO1xyXG4gICAgICAgIGlmIChtZXRob2QpIHtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwicmVtb3ZlQ29tbWFuZCgpXCIpO1xyXG4gICAgICAgICAgICBpZihjb21tYW5kUXVldWVJdGVtKXtcclxuICAgICAgICAgICAgICAgIChtZXRob2R8fCBpbnN0YW5jZVtjb21tYW5kX10pLmFwcGx5KGluc3RhbmNlLCBjb21tYW5kUXVldWVJdGVtLmFyZ3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGluc3RhbmNlW2NvbW1hbmRfXSA9IG1ldGhvZDtcclxuICAgICAgICAgICAgZGVsZXRlIHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kX107XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZGVzdHJveSgpXCIpO1xyXG4gICAgICAgIHRoYXQub2ZmKCk7XHJcbiAgICAgICAgdGhhdC5lbXB0eSgpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGF0O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMYXp5Q29tbWFuZEV4ZWN1dG9yOyIsImltcG9ydCB7aXNSdG1wLCBpc1dlYlJUQywgaXNEYXNoLCBpc0hsc30gZnJvbSBcInV0aWxzL3ZhbGlkYXRvclwiO1xyXG5pbXBvcnQge2FuYWxVc2VyQWdlbnR9IGZyb20gXCJ1dGlscy9icm93c2VyXCI7XHJcbi8qKlxyXG4gKiBAYnJpZWYgICBUaGlzIGZpbmRzIHRoZSBwcm92aWRlciB0aGF0IG1hdGNoZXMgdGhlIGlucHV0IHNvdXJjZS5cclxuICogQHBhcmFtXHJcbiAqICovXHJcblxyXG5jb25zdCBTdXBwb3J0Q2hlY2tlciA9IGZ1bmN0aW9uKCl7XHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJTdXBwb3J0Q2hlY2tlciBsb2FkZWQuXCIpO1xyXG4gICAgbGV0IHVzZXJBZ2VudE9iamVjdCA9IGFuYWxVc2VyQWdlbnQoKTtcclxuXHJcbiAgICBjb25zdCBzdXBwb3J0TGlzdCA9IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdodG1sNScsXHJcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgTWltZVR5cGVzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFhYzogJ2F1ZGlvL21wNCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbXA0OiAndmlkZW8vbXA0JyxcclxuICAgICAgICAgICAgICAgICAgICBmNHY6ICd2aWRlby9tcDQnLFxyXG4gICAgICAgICAgICAgICAgICAgIG00djogJ3ZpZGVvL21wNCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbW92OiAndmlkZW8vbXA0JyxcclxuICAgICAgICAgICAgICAgICAgICBtcDM6ICdhdWRpby9tcGVnJyxcclxuICAgICAgICAgICAgICAgICAgICBtcGVnOiAnYXVkaW8vbXBlZycsXHJcbiAgICAgICAgICAgICAgICAgICAgb2d2OiAndmlkZW8vb2dnJyxcclxuICAgICAgICAgICAgICAgICAgICBvZ2c6ICd2aWRlby9vZ2cnLFxyXG4gICAgICAgICAgICAgICAgICAgIG9nYTogJ3ZpZGVvL29nZycsXHJcbiAgICAgICAgICAgICAgICAgICAgdm9yYmlzOiAndmlkZW8vb2dnJyxcclxuICAgICAgICAgICAgICAgICAgICB3ZWJtOiAndmlkZW8vd2VibScsXHJcbiAgICAgICAgICAgICAgICAgICAgZjRhOiAndmlkZW8vYWFjJyxcclxuICAgICAgICAgICAgICAgICAgICBtM3U4OiAnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnLFxyXG4gICAgICAgICAgICAgICAgICAgIG0zdTogJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyxcclxuICAgICAgICAgICAgICAgICAgICBobHM6ICdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCdcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgdmlkZW8gPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpXHJcbiAgICAgICAgICAgICAgICB9KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXZpZGVvLmNhblBsYXlUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gc291cmNlLmZpbGU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc291cmNlLnR5cGU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoIXR5cGUpe3JldHVybiBmYWxzZTt9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtaW1lVHlwZSA9IHNvdXJjZS5taW1lVHlwZSB8fCBNaW1lVHlwZXNbdHlwZV07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoaXNIbHMoZmlsZSwgdHlwZSkgJiYgdXNlckFnZW50T2JqZWN0LmJyb3dzZXIgPT09IFwiTWljcm9zb2Z0IEVkZ2VcIiApe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vRWRnZSBzdXBwb3J0cyBobHMgbmF0aXZlIGJ1dCB0aGF0J3Mgc3Vja3MuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpc1J0bXAoZmlsZSwgdHlwZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoaXNXZWJSVEMoZmlsZSwgdHlwZSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIW1pbWVUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAhIXZpZGVvLmNhblBsYXlUeXBlKG1pbWVUeXBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAnd2VicnRjJyxcclxuICAgICAgICAgICAgY2hlY2tTdXBwb3J0OiBmdW5jdGlvbiAoc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2aWRlbyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJylcclxuICAgICAgICAgICAgICAgIH0oKTtcclxuICAgICAgICAgICAgICAgIGlmICghdmlkZW8uY2FuUGxheVR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNSdG1wKGZpbGUsIHR5cGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihpc1dlYlJUQyhmaWxlLCB0eXBlKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ2Rhc2gnLFxyXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc291cmNlLnR5cGU7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNSdG1wKGZpbGUsIHR5cGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKCB3aW5kb3cuTWVkaWFTb3VyY2UgfHwgd2luZG93LldlYktpdE1lZGlhU291cmNlICkgPT09IFwiZnVuY3Rpb25cIiAmJiBpc0Rhc2goZmlsZSwgdHlwZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAnaGxzJyxcclxuICAgICAgICAgICAgY2hlY2tTdXBwb3J0OiBmdW5jdGlvbiAoc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2aWRlbyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJylcclxuICAgICAgICAgICAgICAgIH0oKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcclxuICAgICAgICAgICAgICAgIGlmIChpc1J0bXAoZmlsZSwgdHlwZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy90aGlzIG1ldGhvZCBmcm9tIGhscy5qc1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXNIbHNTdXBwb3J0ID0gKCkgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGdldE1lZGlhU291cmNlKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuTWVkaWFTb3VyY2UgfHwgd2luZG93LldlYktpdE1lZGlhU291cmNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtZWRpYVNvdXJjZSA9IGdldE1lZGlhU291cmNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNvdXJjZUJ1ZmZlciA9IHdpbmRvdy5Tb3VyY2VCdWZmZXIgfHwgd2luZG93LldlYktpdFNvdXJjZUJ1ZmZlcjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaXNUeXBlU3VwcG9ydGVkID0gbWVkaWFTb3VyY2UgJiYgdHlwZW9mIG1lZGlhU291cmNlLmlzVHlwZVN1cHBvcnRlZCA9PT0gJ2Z1bmN0aW9uJyAmJiBtZWRpYVNvdXJjZS5pc1R5cGVTdXBwb3J0ZWQoJ3ZpZGVvL21wNDsgY29kZWNzPVwiYXZjMS40MkUwMUUsbXA0YS40MC4yXCInKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgU291cmNlQnVmZmVyIGlzIGV4cG9zZWQgZW5zdXJlIGl0cyBBUEkgaXMgdmFsaWRcclxuICAgICAgICAgICAgICAgICAgICAvLyBzYWZhcmkgYW5kIG9sZCB2ZXJzaW9uIG9mIENocm9tZSBkb2Ugbm90IGV4cG9zZSBTb3VyY2VCdWZmZXIgZ2xvYmFsbHkgc28gY2hlY2tpbmcgU291cmNlQnVmZmVyLnByb3RvdHlwZSBpcyBpbXBvc3NpYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNvdXJjZUJ1ZmZlclZhbGlkQVBJID0gIXNvdXJjZUJ1ZmZlciB8fCBzb3VyY2VCdWZmZXIucHJvdG90eXBlICYmIHR5cGVvZiBzb3VyY2VCdWZmZXIucHJvdG90eXBlLmFwcGVuZEJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygc291cmNlQnVmZmVyLnByb3RvdHlwZS5yZW1vdmUgPT09ICdmdW5jdGlvbic7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEhaXNUeXBlU3VwcG9ydGVkICYmICEhc291cmNlQnVmZmVyVmFsaWRBUEk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgLy9SZW1vdmUgdGhpcyAnISF2aWRlby5jYW5QbGF5VHlwZSgnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnKScgaWYgeW91IHdhbnQgdG8gdXNlIGhsc2pzLlxyXG4gICAgICAgICAgICAgICAgLy9ZZXMgSSBuZWVkIGhsc2pzLiAyMDE5LTA2LTEyICYmICEhdmlkZW8uY2FuUGxheVR5cGUoJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNIbHNTdXBwb3J0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ3J0bXAnLFxyXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHRlc3RGbGFzaCgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1cHBvcnQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9JRSBvbmx5XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoXCJBY3RpdmVYT2JqZWN0XCIgaW4gd2luZG93KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdXBwb3J0ID0gISEobmV3IEFjdGl2ZVhPYmplY3QoXCJTaG9ja3dhdmVGbGFzaC5TaG9ja3dhdmVGbGFzaFwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1jYXRjaChlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1cHBvcnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9XM0MsIGJldHRlciBzdXBwb3J0IGluIGxlZ2FjeSBicm93c2VyXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1cHBvcnQgPSAhIW5hdmlnYXRvci5taW1lVHlwZXNbJ2FwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoJ107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1cHBvcnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gY2hlY2tTdXBwb3J0KCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodXNlckFnZW50T2JqZWN0LmJyb3dzZXIgPT09IFwiTWljcm9zb2Z0IEVkZ2VcIiB8fCB1c2VyQWdlbnRPYmplY3Qub3MgPT09IFwiQW5kcm9pZFwiIHx8IHVzZXJBZ2VudE9iamVjdC5vcyA9PT0gXCJpT1NcIiAgfHwgdXNlckFnZW50T2JqZWN0LmJyb3dzZXIgPT09IFwiU2FmYXJpXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpc1J0bXAoZmlsZSwgdHlwZSkgJiYgdGVzdEZsYXNoKCkgJiYgY2hlY2tTdXBwb3J0KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIF07XHJcblxyXG4gICAgdGhhdC5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UgPSAoc29ydWNlXykgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlN1cHBvcnRDaGVja2VyIDogZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKClcIiwgc29ydWNlXyk7XHJcbiAgICAgICAgY29uc3Qgc291cmNlID0gKHNvcnVjZV8gPT09IE9iamVjdChzb3J1Y2VfKSkgPyBzb3J1Y2VfIDoge307XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHN1cHBvcnRMaXN0Lmxlbmd0aDsgaSArKyl7XHJcbiAgICAgICAgICAgIGlmKHN1cHBvcnRMaXN0W2ldLmNoZWNrU3VwcG9ydChzb3VyY2UpKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdXBwb3J0TGlzdFtpXS5uYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoYXQuZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0ID0gKHBsYXlsaXN0SXRlbSkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlN1cHBvcnRDaGVja2VyIDogZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0KClcIiwgcGxheWxpc3RJdGVtKTtcclxuICAgICAgICBsZXQgc3VwcG9ydE5hbWVzID0gW107XHJcbiAgICAgICAgLypmb3IgKGxldCBpID0gcGxheWxpc3RfLmxlbmd0aDsgaS0tOykge1xyXG5cclxuXHJcbiAgICAgICAgfSovXHJcbiAgICAgICAgY29uc3QgaXRlbSA9IHBsYXlsaXN0SXRlbTtcclxuXHJcbiAgICAgICAgaWYoaXRlbSAmJiBpdGVtLnNvdXJjZXMpe1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgaXRlbS5zb3VyY2VzLmxlbmd0aDsgaiArKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgc291cmNlID0gaXRlbS5zb3VyY2VzW2pdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1cHBvcnRlZCA9IHRoYXQuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKHNvdXJjZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1cHBvcnRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdXBwb3J0TmFtZXMucHVzaChzdXBwb3J0ZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHN1cHBvcnROYW1lcztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3VwcG9ydENoZWNrZXI7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gNC4uXHJcbiAqL1xyXG5pbXBvcnQgU3J0UGFyc2VyIGZyb20gXCJhcGkvY2FwdGlvbi9wYXJzZXIvU3J0UGFyc2VyXCI7XHJcbmltcG9ydCBWVFRDdWUgZnJvbSBcInV0aWxzL2NhcHRpb25zL3Z0dEN1ZVwiO1xyXG4vL2ltcG9ydCBSZXF1ZXN0IGZyb20gXCJ1dGlscy9kb3dubG9hZGVyXCI7XHJcblxyXG5jb25zdCBMb2FkZXIgPSBmdW5jdGlvbigpe1xyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG5cclxuICAgIGNvbnN0IGNvbnZlcnRUb1ZUVEN1ZXMgPSBmdW5jdGlvbiAoY3Vlcykge1xyXG4gICAgICAgIHJldHVybiBjdWVzLm1hcChjdWUgPT4gbmV3IFZUVEN1ZShjdWUuc3RhcnQsIGN1ZS5lbmQsIGN1ZS50ZXh0KSk7XHJcbiAgICB9XHJcbiAgICAvL2xhbmd1YWdlIDogZm9yIFNNSSBmb3JtYXQuXHJcbiAgICB0aGF0LmxvYWQgPSAodHJhY2ssIGxhbmd1YWdlLCBzdWNjZXNzQ2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spID0+IHtcclxuXHJcbiAgICAgICAgdmFyIHJlcXVlc3RPcHRpb25zICA9IHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICB1cmwgOiB0cmFjay5maWxlLFxyXG4gICAgICAgICAgICBlbmNvZGluZzogbnVsbFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxvYWRSZXF1ZXN0RG93bmxvZGVyKCkudGhlbihSZXF1ZXN0ID0+IHtcclxuICAgICAgICAgICAgUmVxdWVzdChyZXF1ZXN0T3B0aW9ucywgZnVuY3Rpb24oZXJyb3IsIHJlc3BvbnNlLCBib2R5KSB7XHJcbiAgICAgICAgICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JDYWxsYmFjayhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY3VlcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2dHRDdWVzID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChib2R5LmluZGV4T2YoJ1dFQlZUVCcpID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiV0VCVlRUIExPQURFRFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9hZFZ0dFBhcnNlcigpLnRoZW4oV2ViVlRUID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwYXJzZXIgPSBuZXcgV2ViVlRULlBhcnNlcih3aW5kb3csIFdlYlZUVC5TdHJpbmdEZWNvZGVyKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdnR0Q3VlcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VyLm9uY3VlID0gZnVuY3Rpb24oY3VlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdnR0Q3Vlcy5wdXNoKGN1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VyLm9uZmx1c2ggPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2RlbGV0ZSB0cmFjay54aHI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc0NhbGxiYWNrKHZ0dEN1ZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBhcnNlIGNhbGxzIG9uZmx1c2ggaW50ZXJuYWxseVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VyLnBhcnNlKGJvZHkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2RlbGV0ZSB0cmFjay54aHI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvckNhbGxiYWNrKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoYm9keS5pbmRleE9mKCdTQU1JJykgPj0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlNBTUkgTE9BREVEXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkU21pUGFyc2VyKCkudGhlbihTbWlQYXJzZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBhcnNlZERhdGEgPSBTbWlQYXJzZXIoYm9keSwge2ZpeGVkTGFuZyA6IGxhbmd1YWdlfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2dHRDdWVzID0gY29udmVydFRvVlRUQ3VlcyhwYXJzZWREYXRhLnJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzQ2FsbGJhY2sodnR0Q3Vlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVsZXRlIHRyYWNrLnhocjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yQ2FsbGJhY2soZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJTUlQgTE9BREVEXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdWVzID0gU3J0UGFyc2VyKGJvZHkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2dHRDdWVzID0gY29udmVydFRvVlRUQ3VlcyhjdWVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc0NhbGxiYWNrKHZ0dEN1ZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgLy9kZWxldGUgdHJhY2sueGhyO1xyXG4gICAgICAgICAgICBlcnJvckNhbGxiYWNrKGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcbmZ1bmN0aW9uIGxvYWRSZXF1ZXN0RG93bmxvZGVyKCl7XHJcbiAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWyd1dGlscy9kb3dubG9hZGVyJ10sIGZ1bmN0aW9uIChyZXF1aXJlKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlcXVpcmUoJ3V0aWxzL2Rvd25sb2FkZXInKS5kZWZhdWx0O1xyXG4gICAgfSwgZnVuY3Rpb24oZXJyKXtjb25zb2xlLmxvZyhlcnIpO30sICdkb3dubG9hZGVyJyk7XHJcbn07XHJcbmZ1bmN0aW9uIGxvYWRWdHRQYXJzZXIoKSB7XHJcbiAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvY2FwdGlvbi9wYXJzZXIvVnR0UGFyc2VyJ10sIGZ1bmN0aW9uIChyZXF1aXJlKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlcXVpcmUoJ2FwaS9jYXB0aW9uL3BhcnNlci9WdHRQYXJzZXInKS5kZWZhdWx0O1xyXG4gICAgfSwgZnVuY3Rpb24oZXJyKXtjb25zb2xlLmxvZyhlcnIpO30sICd2dHRwYXJzZXInKTtcclxufVxyXG5mdW5jdGlvbiBsb2FkU21pUGFyc2VyKCkge1xyXG4gICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL2NhcHRpb24vcGFyc2VyL1NtaVBhcnNlciddLCBmdW5jdGlvbiAocmVxdWlyZSkge1xyXG4gICAgICAgIHJldHVybiByZXF1aXJlKCdhcGkvY2FwdGlvbi9wYXJzZXIvU21pUGFyc2VyJykuZGVmYXVsdDtcclxuICAgIH0sIGZ1bmN0aW9uKGVycil7Y29uc29sZS5sb2coZXJyKTt9LCAnc21pcGFyc2VyJyk7XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgTG9hZGVyO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDUuIDE3Li5cclxuICovXHJcbmltcG9ydCBDYXB0aW9uTG9hZGVyIGZyb20gJ2FwaS9jYXB0aW9uL0xvYWRlcic7XHJcbmltcG9ydCB7UkVBRFksIEVSUk9SUywgRVJST1IsIFBMQVlFUl9DQVBUSU9OX0VSUk9SLCBDT05URU5UX01FVEEsIENPTlRFTlRfVElNRSwgQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VELCBDT05URU5UX0NBUFRJT05fQ0hBTkdFRH0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcclxuXHJcbmNvbnN0IGlzU3VwcG9ydCA9IGZ1bmN0aW9uKGtpbmQpe1xyXG4gICAgcmV0dXJuIGtpbmQgPT09ICdzdWJ0aXRsZXMnIHx8IGtpbmQgPT09ICdjYXB0aW9ucyc7XHJcbn07XHJcblxyXG5jb25zdCBNYW5hZ2VyID0gZnVuY3Rpb24oYXBpLCBwbGF5bGlzdEluZGV4KXtcclxuXHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICBsZXQgY2FwdGlvbkxpc3QgPSBbXTtcclxuICAgIGxldCBjdXJyZW50Q2FwdGlvbkluZGV4ID0gLTE7XHJcblxyXG4gICAgbGV0IGNhcHRpb25Mb2FkZXIgPSBDYXB0aW9uTG9hZGVyKCk7XHJcbiAgICBsZXQgaXNGaXNydExvYWQgPSB0cnVlO1xyXG4gICAgbGV0IGlzU2hvd2luZyA9IGZhbHNlO1xyXG5cclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNhcHRpb24gTWFuYWdlciA+PiBcIiwgcGxheWxpc3RJbmRleCk7XHJcblxyXG5cclxuICAgIGxldCBiaW5kVHJhY2sgPSBmdW5jdGlvbih0cmFjaywgdnR0Q3Vlcyl7XHJcbiAgICAgICAgdHJhY2suZGF0YSA9IHZ0dEN1ZXMgfHwgW107XHJcbiAgICAgICAgdHJhY2submFtZSA9IHRyYWNrLmxhYmVsIHx8IHRyYWNrLm5hbWUgfHwgdHJhY2subGFuZ3VhZ2U7XHJcbiAgICAgICAgdHJhY2suaWQgPSAoZnVuY3Rpb24odHJhY2ssIHRyYWNrc0NvdW50KSB7XHJcbiAgICAgICAgICAgIHZhciB0cmFja0lkO1xyXG4gICAgICAgICAgICB2YXIgcHJlZml4ID0gdHJhY2sua2luZCB8fCAnY2MnO1xyXG4gICAgICAgICAgICBpZiAodHJhY2suZGVmYXVsdCB8fCB0cmFjay5kZWZhdWx0dHJhY2spIHtcclxuICAgICAgICAgICAgICAgIHRyYWNrSWQgPSAnZGVmYXVsdCc7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHJhY2tJZCA9IHRyYWNrLmlkIHx8IChwcmVmaXggKyB0cmFja3NDb3VudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoaXNGaXNydExvYWQpe1xyXG4gICAgICAgICAgICAgICAgLy9UaGlzIGV4ZWN1dGUgb25seSBvbi4gYW5kIHRoZW4gdXNlIGZsdXNoQ2FwdGlvbkxpc3QobGFzdENhcHRpb25JbmRleCk7XHJcbiAgICAgICAgICAgICAgICBjaGFuZ2VDdXJyZW50Q2FwdGlvbihjYXB0aW9uTGlzdC5sZW5ndGh8fDApO1xyXG4gICAgICAgICAgICAgICAgaXNGaXNydExvYWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRyYWNrSWQ7XHJcbiAgICAgICAgfSkodHJhY2ssIGNhcHRpb25MaXN0Lmxlbmd0aCk7XHJcblxyXG4gICAgICAgIGNhcHRpb25MaXN0LnB1c2godHJhY2spO1xyXG4gICAgICAgIHJldHVybiB0cmFjay5pZDtcclxuICAgIH07XHJcbiAgICBsZXQgY2hhbmdlQ3VycmVudENhcHRpb24gPSBmdW5jdGlvbihpbmRleCl7XHJcbiAgICAgICAgY3VycmVudENhcHRpb25JbmRleCA9IGluZGV4O1xyXG4gICAgICAgIGFwaS50cmlnZ2VyKENPTlRFTlRfQ0FQVElPTl9DSEFOR0VELCBjdXJyZW50Q2FwdGlvbkluZGV4KTtcclxuICAgIH07XHJcbiAgICBpZihhcGkuZ2V0Q29uZmlnKCkucGxheWxpc3QgJiYgYXBpLmdldENvbmZpZygpLnBsYXlsaXN0Lmxlbmd0aCA+IDApe1xyXG4gICAgICAgIGxldCBwbGF5bGlzdCA9IGFwaS5nZXRDb25maWcoKS5wbGF5bGlzdFtwbGF5bGlzdEluZGV4XTtcclxuXHJcbiAgICAgICAgaWYocGxheWxpc3QgJiYgcGxheWxpc3QudHJhY2tzICYmIHBsYXlsaXN0LnRyYWNrcy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHBsYXlsaXN0LnRyYWNrcy5sZW5ndGg7IGkgKyspe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHJhY2sgPSBwbGF5bGlzdC50cmFja3NbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoaXNTdXBwb3J0KHRyYWNrLmtpbmQpICYmICEgXy5maW5kV2hlcmUodHJhY2ssIHtmaWxlIDogdHJhY2suZmlsZX0pKXtcclxuICAgICAgICAgICAgICAgICAgICAvL3RoYXQuZmx1c2hDYXB0aW9uTGlzdChjdXJyZW50Q2FwdGlvbkluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uTG9hZGVyLmxvYWQodHJhY2ssIHRyYWNrLmxhbmcsIGZ1bmN0aW9uKHZ0dEN1ZXMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih2dHRDdWVzICYmIHZ0dEN1ZXMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2FwdGlvbklkID0gYmluZFRyYWNrKHRyYWNrLCB2dHRDdWVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfQ0FQVElPTl9FUlJPUl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcGkudHJpZ2dlcihFUlJPUiwgdGVtcEVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXBpLm9uKENPTlRFTlRfVElNRSwgZnVuY3Rpb24obWV0YSl7XHJcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gbWV0YS5wb3NpdGlvbjtcclxuICAgICAgICBpZihjdXJyZW50Q2FwdGlvbkluZGV4ID4gLTEgJiYgY2FwdGlvbkxpc3RbY3VycmVudENhcHRpb25JbmRleF0pe1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudEN1ZXMgPSBfLmZpbHRlcihjYXB0aW9uTGlzdFtjdXJyZW50Q2FwdGlvbkluZGV4XS5kYXRhLCBmdW5jdGlvbiAoY3VlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9zaXRpb24gPj0gKGN1ZS5zdGFydFRpbWUpICYmICggKCFjdWUuZW5kVGltZSB8fCBwb3NpdGlvbikgPD0gY3VlLmVuZFRpbWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYoY3VycmVudEN1ZXMgJiYgY3VycmVudEN1ZXMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICBhcGkudHJpZ2dlcihDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQsIGN1cnJlbnRDdWVzWzBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuICAgIHRoYXQuZmx1c2hDYXB0aW9uTGlzdCA9IChsYXN0Q2FwdGlvbkluZGV4KSA9PntcclxuICAgICAgICBjYXB0aW9uTGlzdCA9IFtdO1xyXG4gICAgICAgIGNoYW5nZUN1cnJlbnRDYXB0aW9uKGxhc3RDYXB0aW9uSW5kZXgpO1xyXG4gICAgICAgIC8vY3VycmVudENhcHRpb25JbmRleCA9IGxhc3RDYXB0aW9uSW5kZXg7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRDYXB0aW9uTGlzdCA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBjYXB0aW9uTGlzdHx8W107XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRDdXJyZW50Q2FwdGlvbiA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50Q2FwdGlvbkluZGV4O1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Q3VycmVudENhcHRpb24gPSAoX2luZGV4KSA9PntcclxuICAgICAgICBpZihfaW5kZXggPiAtMiAmJiBfaW5kZXggPCBjYXB0aW9uTGlzdC5sZW5ndGgpe1xyXG4gICAgICAgICAgICBjaGFuZ2VDdXJyZW50Q2FwdGlvbihfaW5kZXgpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhhdC5hZGRDYXB0aW9uID0gKHRyYWNrKSA9PntcclxuICAgICAgICBpZihpc1N1cHBvcnQodHJhY2sua2luZCkgJiYgISBfLmZpbmRXaGVyZShjYXB0aW9uTG9hZGVyLCB7ZmlsZSA6IHRyYWNrLmZpbGV9KSl7XHJcbiAgICAgICAgICAgIGNhcHRpb25Mb2FkZXIubG9hZCh0cmFjaywgZnVuY3Rpb24odnR0Q3Vlcyl7XHJcbiAgICAgICAgICAgICAgICBpZih2dHRDdWVzICYmIHZ0dEN1ZXMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgYmluZFRyYWNrKHRyYWNrLCB2dHRDdWVzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IGVycm9yc1tQTEFZRVJfQ0FQVElPTl9FUlJPUl07XHJcbiAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgIGFwaS50cmlnZ2VyKEVSUk9SLCB0ZW1wRXJyb3IpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhhdC5yZW1vdmVDYXB0aW9uID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgaWYoaW5kZXggPiAtMSAmJiBpbmRleCA8IGNhcHRpb25MaXN0Lmxlbmd0aCl7XHJcbiAgICAgICAgICAgIGNhcHRpb25MaXN0LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIHJldHVybiBjYXB0aW9uTGlzdDtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+IHtcclxuICAgICAgICBjYXB0aW9uTGlzdCA9IFtdO1xyXG4gICAgICAgIGNhcHRpb25Mb2FkZXIgPSBudWxsO1xyXG4gICAgICAgIGFwaS5vZmYoQ09OVEVOVF9USU1FLCBudWxsLCB0aGF0KTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYW5hZ2VyO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDUuIDI5Li5cclxuICovXHJcbmltcG9ydCB7IGhtc1RvU2Vjb25kLCB0cmltIH0gZnJvbSBcInV0aWxzL3N0cmluZ3NcIlxyXG5cclxuZnVuY3Rpb24gX2VudHJ5KGRhdGEpIHtcclxuICAgIHZhciBlbnRyeSA9IHt9O1xyXG4gICAgdmFyIGFycmF5ID0gZGF0YS5zcGxpdCgnXFxyXFxuJyk7XHJcbiAgICBpZiAoYXJyYXkubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgYXJyYXkgPSBkYXRhLnNwbGl0KCdcXG4nKTtcclxuICAgIH1cclxuICAgIHZhciBpZHggPSAxO1xyXG4gICAgaWYgKGFycmF5WzBdLmluZGV4T2YoJyAtLT4gJykgPiAwKSB7XHJcbiAgICAgICAgaWR4ID0gMDtcclxuICAgIH1cclxuICAgIGlmIChhcnJheS5sZW5ndGggPiBpZHggKyAxICYmIGFycmF5W2lkeCArIDFdKSB7XHJcbiAgICAgICAgLy8gVGhpcyBsaW5lIGNvbnRhaW5zIHRoZSBzdGFydCBhbmQgZW5kLlxyXG4gICAgICAgIHZhciBsaW5lID0gYXJyYXlbaWR4XTtcclxuICAgICAgICB2YXIgaW5kZXggPSBsaW5lLmluZGV4T2YoJyAtLT4gJyk7XHJcbiAgICAgICAgaWYgKGluZGV4ID4gMCkge1xyXG4gICAgICAgICAgICBlbnRyeS5zdGFydCA9IGhtc1RvU2Vjb25kKGxpbmUuc3Vic3RyKDAsIGluZGV4KSk7XHJcbiAgICAgICAgICAgIGVudHJ5LmVuZCA9IGhtc1RvU2Vjb25kKGxpbmUuc3Vic3RyKGluZGV4ICsgNSkpO1xyXG4gICAgICAgICAgICBlbnRyeS50ZXh0ID0gYXJyYXkuc2xpY2UoaWR4ICsgMSkuam9pbignXFxyXFxuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVudHJ5O1xyXG5cclxufVxyXG5cclxuY29uc3QgU3J0UGFyc2VyID0gZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgdmFyIGNhcHRpb25zID0gW107XHJcblxyXG4gICAgZGF0YSA9IHRyaW0oZGF0YSk7XHJcblxyXG4gICAgdmFyIGxpc3QgPSBkYXRhLnNwbGl0KCdcXHJcXG5cXHJcXG4nKTtcclxuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgIGxpc3QgPSBkYXRhLnNwbGl0KCdcXG5cXG4nKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChsaXN0W2ldID09PSAnV0VCVlRUJykge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGVudHJ5ID0gX2VudHJ5KGxpc3RbaV0pO1xyXG4gICAgICAgIGlmIChlbnRyeS50ZXh0KSB7XHJcbiAgICAgICAgICAgIGNhcHRpb25zLnB1c2goZW50cnkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY2FwdGlvbnM7XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3J0UGFyc2VyOyIsIi8vIFNUQVRFXHJcbmV4cG9ydCBjb25zdCBTVEFURV9CVUZGRVJJTkcgPSBcImJ1ZmZlcmluZ1wiO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfSURMRSA9IFwiaWRsZVwiO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfQ09NUExFVEUgPSBcImNvbXBsZXRlXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9QQVVTRUQgPSBcInBhdXNlZFwiO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfUExBWUlORyA9IFwicGxheWluZ1wiO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfRVJST1IgPSBcImVycm9yXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9MT0FESU5HID0gXCJsb2FkaW5nXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9TVEFMTEVEID0gXCJzdGFsbGVkXCI7XHJcblxyXG5leHBvcnQgY29uc3QgU1RBVEVfQURfTE9BRElORyA9IFwiYWRMb2FkaW5nXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9BRF9MT0FERUQgPSBcImFkTG9hZGVkXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9BRF9QTEFZSU5HID0gXCJhZFBsYXlpbmdcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0FEX1BBVVNFRCA9IFwiYWRQYXVzZWRcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0FEX0NPTVBMRVRFID0gXCJhZENvbXBsZXRlXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9BRF9FUlJPUiA9IFwiYWRFcnJvclwiO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX0FEX0NMSUNLID0gXCJhZGNsaWNrXCI7XHJcblxyXG4vLyBQUk9WSURFUlxyXG5leHBvcnQgY29uc3QgUFJPVklERVJfSFRNTDUgPSBcImh0bWw1XCI7XHJcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9XRUJSVEMgPSBcIndlYnJ0Y1wiO1xyXG5leHBvcnQgY29uc3QgUFJPVklERVJfREFTSCA9IFwiZGFzaFwiO1xyXG5leHBvcnQgY29uc3QgUFJPVklERVJfSExTID0gXCJobHNcIjtcclxuZXhwb3J0IGNvbnN0IFBST1ZJREVSX1JUTVAgPSBcInJ0bXBcIjtcclxuXHJcbi8vIEVWRU5UU1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9DT01QTEVURSA9IFNUQVRFX0NPTVBMRVRFO1xyXG5leHBvcnQgY29uc3QgUkVBRFkgPSBcInJlYWR5XCI7XHJcbmV4cG9ydCBjb25zdCBERVNUUk9ZID0gXCJkZXN0cm95XCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX1NFRUsgPSBcInNlZWtcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfQlVGRkVSX0ZVTEwgPSBcImJ1ZmZlckZ1bGxcIjtcclxuZXhwb3J0IGNvbnN0IERJU1BMQVlfQ0xJQ0sgPSBcImRpc3BsYXlDbGlja1wiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9MT0FERUQgPSBcImxvYWRlZFwiO1xyXG5leHBvcnQgY29uc3QgUExBWUxJU1RfQ0hBTkdFRCA9IFwicGxheWxpc3RDaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX1NFRUtFRCA9IFwic2Vla2VkXCI7XHJcbmV4cG9ydCBjb25zdCBBTExfUExBWUxJU1RfRU5ERUQgPSBcImFsbFBsYXlsaXN0RW5kZWRcIjtcclxuZXhwb3J0IGNvbnN0IE5FVFdPUktfVU5TVEFCTEVEID0gXCJ1bnN0YWJsZU5ldHdvcmtcIjtcclxuZXhwb3J0IGNvbnN0IERBU0hfUFJFUEFSRUQgPSBcImRhc2hQcmVwYXJlZFwiO1xyXG5leHBvcnQgY29uc3QgREFTSF9ERVNUUk9ZRUQgPSBcImRhc2hEZXN0cm95ZWRcIjtcclxuXHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IEVSUk9SID0gXCJlcnJvclwiO1xyXG5cclxuLy8gU1RBVEUgT0YgUExBWUVSXHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfU1RBVEUgPSBcInN0YXRlQ2hhbmdlZFwiO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX0NPTVBMRVRFID0gU1RBVEVfQ09NUExFVEU7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfUEFVU0UgPSBcInBhdXNlXCI7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfUExBWSA9IFwicGxheVwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9DTElDS0VEID0gXCJjbGlja2VkXCI7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfUkVTSVpFRCA9IFwicmVzaXplZFwiO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX0xPQURJTkcgPSBcImxvYWRpbmdcIjtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9GVUxMU0NSRUVOX1JFUVVFU1QgPSBcImZ1bGxzY3JlZW5SZXF1ZXN0ZWRcIjtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9GVUxMU0NSRUVOX0NIQU5HRUQgPSBcImZ1bGxzY3JlZW5DaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0FSTklORyA9IFwid2FybmluZ1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IEFEX0NIQU5HRUQgPSBcImFkQ2hhbmdlZFwiO1xyXG5leHBvcnQgY29uc3QgQURfVElNRSA9IFwiYWRUaW1lXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0JVRkZFUiA9IFwiYnVmZmVyQ2hhbmdlZFwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9USU1FID0gXCJ0aW1lXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX1JBVEVfQ0hBTkdFID0gXCJyYXRlY2hhbmdlXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX1ZPTFVNRSA9IFwidm9sdW1lQ2hhbmdlZFwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9NVVRFID0gXCJtdXRlXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX01FVEEgPSBcIm1ldGFDaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX1NPVVJDRV9DSEFOR0VEID0gXCJzb3VyY2VDaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0xFVkVMX0NIQU5HRUQgPSBcInF1YWxpdHlMZXZlbENoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IFBMQVlCQUNLX1JBVEVfQ0hBTkdFRCA9IFwicGxheWJhY2tSYXRlQ2hhbmdlZFwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VEID0gXCJjdWVDaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0NBUFRJT05fQ0hBTkdFRCA9IFwiY2FwdGlvbkNoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfVElNRV9NT0RFX0NIQU5HRUQgPSBcInRpbWVEaXNwbGF5TW9kZUNoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IE9NRV9QMlBfTU9ERSA9IFwicDJwTW9kZVwiO1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBBRF9DTElFTlRfR09PR0xFSU1BID0gXCJnb29nbGVpbWFcIjtcclxuZXhwb3J0IGNvbnN0IEFEX0NMSUVOVF9WQVNUID0gXCJ2YXN0XCI7XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IElOSVRfVU5LTldPTl9FUlJPUiA9IDEwMDtcclxuZXhwb3J0IGNvbnN0IElOSVRfVU5TVVBQT1JUX0VSUk9SID0gMTAxO1xyXG5leHBvcnQgY29uc3QgSU5JVF9SVE1QX1NFVFVQX0VSUk9SID0gMTAyO1xyXG5leHBvcnQgY29uc3QgSU5JVF9EQVNIX1VOU1VQUE9SVCA9IDEwMztcclxuZXhwb3J0IGNvbnN0IElOSVRfQURTX0VSUk9SID0gMTA0O1xyXG5leHBvcnQgY29uc3QgSU5JVF9EQVNIX05PVEZPVU5EID0gMTA1O1xyXG5leHBvcnQgY29uc3QgSU5JVF9ITFNKU19OT1RGT1VORCA9IDEwNjtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX0VSUk9SID0gMzAwO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SID0gMzAxO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fTkVUV09SS19FUlJPUiA9IDMwMjtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUiA9IDMwMztcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9GSUxFX0VSUk9SID0gMzA0O1xyXG5leHBvcnQgY29uc3QgUExBWUVSX0NBUFRJT05fRVJST1IgPSAzMDU7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfQkFEX1JFUVVFU1RfRVJST1IgPSAzMDY7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfQVVUSF9GQUlMRURfRVJST1IgPSAzMDc7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfTk9UX0FDQ0VQVEFCTEVfRVJST1IgPSAzMDg7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1dTX0VSUk9SID0gNTAxO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SID0gNTAyO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19TRVRfUkVNT1RFX0RFU0NfRVJST1IgPSA1MDM7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX0NSRUFURV9BTlNXRVJfRVJST1IgPSA1MDQ7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SID0gNTA1O1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19ORVRXT1JLX1NMT1cgPSA1MTA7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1VORVhQRUNURURfRElTQ09OTkVDVCA9IDUxMTtcclxuXHJcbmV4cG9ydCBjb25zdCBXQVJOX01TR19NVVRFRFBMQVkgPSBcIlBsZWFzZSB0b3VjaCBoZXJlIHRvIHR1cm4gb24gdGhlIHNvdW5kLlwiO1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBVSV9JQ09OUyA9IHtcclxuICAgIHZvbHVtZV9tdXRlIDogXCJ2b2x1bWUtbXV0ZVwiLFxyXG4gICAgb3Bfd2FybmluZyA6IFwib3Atd2FybmluZ1wiXHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IEVSUk9SUyA9IHtjb2RlcyA6IFwiXCJ9O1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBTWVNURU1fVEVYVCA9IFtcclxuICAgIHtcclxuICAgICAgICBcImxhbmdcIiA6IFwiZW5cIixcclxuICAgICAgICBcInVpXCIgOiB7XHJcbiAgICAgICAgICAgIFwiY29udGV4dFwiIDogXCJBYm91dCBPdmVuUGxheWVyXCIsXHJcbiAgICAgICAgICAgIFwiY29udHJvbHNcIiA6IHtcclxuICAgICAgICAgICAgICAgIFwibGl2ZVwiIDogXCJsaXZlXCIsXHJcbiAgICAgICAgICAgICAgICBcImxvd19sYXRlbmN5X2xpdmVcIiA6IFwiU3ViLVNlY29uZCBMYXRlbmN5IFN0cmVhbWluZ1wiLFxyXG4gICAgICAgICAgICAgICAgXCJsb3dfbGF0ZW5jeV9wMnBcIiA6IFwiU3ViLVNlY29uZCBMYXRlbmN5IFAyUFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInBsYXlsaXN0XCIgOiBcIlBsYXlsaXN0XCIsXHJcbiAgICAgICAgICAgIFwic2V0dGluZ1wiIDoge1xyXG4gICAgICAgICAgICAgICAgXCJ0aXRsZVwiIDogXCJTZXR0aW5nc1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzcGVlZFwiIDogXCJTcGVlZFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzcGVlZFVuaXRcIiA6IFwieFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzb3VyY2VcIiA6IFwiU291cmNlXCIsXHJcbiAgICAgICAgICAgICAgICBcInF1YWxpdHlcIiA6IFwiUXVhbGl0eVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjYXB0aW9uXCIgOiBcIkNhcHRpb25cIixcclxuICAgICAgICAgICAgICAgIFwiZGlzcGxheVwiIDogXCJEaXNwbGF5XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJhcGlcIiA6IHtcclxuICAgICAgICAgICAgXCJtZXNzYWdlXCIgOiB7XHJcbiAgICAgICAgICAgICAgICBcIm11dGVkX3BsYXlcIiA6IFwiUGxlYXNlIHRvdWNoIGhlcmUgdG8gdHVybiBvbiB0aGUgc291bmQuXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJlcnJvclwiOiB7XHJcbiAgICAgICAgICAgICAgICAxMDA6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNhbiBub3QgbG9hZCBkdWUgdG8gdW5rbm93biByZWFzb25zLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiQ2FuIG5vdCBsb2FkIGR1ZSB0byB1bmtub3duIHJlYXNvbnMuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAxMDE6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMTAxLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNhbiBub3QgbG9hZCBkdWUgdG8gcGxheWFibGUgbWVkaWEgbm90IGZvdW5kLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiQ2FuIG5vdCBsb2FkIGR1ZSB0byBwbGF5YWJsZSBtZWRpYSBub3QgZm91bmQuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAxMDI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMTAyLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkZsYXNoIGZldGNoaW5nIHByb2Nlc3MgYWJvcnRlZC4gPC9icj48YSBocmVmPSdodHRwOi8vd3d3LmFkb2JlLmNvbS9nby9nZXRmbGFzaHBsYXllcicgdGFyZ2V0PSdfc2VsZic+PGltZyBzcmM9J2h0dHA6Ly93d3cuYWRvYmUuY29tL2ltYWdlcy9zaGFyZWQvZG93bmxvYWRfYnV0dG9ucy9nZXRfZmxhc2hfcGxheWVyLmdpZicgYWx0PSdHZXQgQWRvYmUgRmxhc2ggcGxheWVyJz48L2E+XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJJdCBsb29rcyBsaWtlIG5vdCBmb3VuZCBzd2Ygb3IgeW91ciBlbnZpcm9ubWVudCBpcyBsb2NhbGhvc3QuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAxMDM6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMTAzLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNhbiBub3QgbG9hZCBkdWUgdG8gZGFzaGpzLiBQbGVhc2UgY2hlY2sgdGhlIGxhc3Rlc3QgdmVyc2lvbi5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcImRhc2guanMgdmVyc2lvbiBpcyBvbGQuIFBsZWFzZSBjaGVjayB0aGUgbGFzdGVzdC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDEwNDoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAxMDQsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiQ2FuIG5vdCBsb2FkIGR1ZSB0byBnb29nbGUgaW1hIGZvciBBZHMuIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiUGxlYXNlIGNoZWNrIHRoZSBnb29nbGUgaW1hIGxpYnJhcnkuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAxMDU6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMTA1LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNhbiBub3QgZmluZCB0aGUgZGFzaGpzLiBQbGVhc2UgY2hlY2sgdGhlIGRhc2hqcy5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIk5vdCBmb3VuZCBkYXNoanMuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAxMDY6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMTA2LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNhbiBub3QgZmluZCB0aGUgaGxzanMuIFBsZWFzZSBjaGVjayB0aGUgaGxzanMuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJOb3QgZm91bmQgaGxzanMuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAzMDA6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMzAwLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNhbiBub3QgcGxheSBkdWUgdG8gdW5rbm93biByZWFzb25zLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiQ2FuIG5vdCBwbGF5IGR1ZSB0byB1bmtub3duIHJlYXNvbnMuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAzMDE6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMzAxLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkZldGNoaW5nIHByb2Nlc3MgYWJvcnRlZCBieSB1c2VyLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiRmV0Y2hpbmcgcHJvY2VzcyBhYm9ydGVkIGJ5IHVzZXIuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAzMDI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMzAyLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIlNvbWUgb2YgdGhlIG1lZGlhIGNvdWxkIG5vdCBiZSBkb3dubG9hZGVkIGR1ZSB0byBhIG5ldHdvcmsgZXJyb3IuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJFcnJvciBvY2N1cnJlZCB3aGVuIGRvd25sb2FkaW5nLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMzAzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwMyxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJVbmFibGUgdG8gbG9hZCBtZWRpYS4gVGhpcyBtYXkgYmUgZHVlIHRvIGEgc2VydmVyIG9yIG5ldHdvcmsgZXJyb3IsIG9yIGR1ZSB0byBhbiB1bnN1cHBvcnRlZCBmb3JtYXQuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJFcnJvciBvY2N1cnJlZCB3aGVuIGRlY29kaW5nLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMzA0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwNCxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJNZWRpYSBwbGF5YmFjayBoYXMgYmVlbiBjYW5jZWxlZC4gSXQgbG9va3MgbGlrZSB5b3VyIG1lZGlhIGlzIGNvcnJ1cHRlZCBvciB5b3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCB0aGUgZmVhdHVyZXMgeW91ciBtZWRpYSB1c2VzLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiTWVkaWEgcGxheWJhY2sgbm90IHN1cHBvcnRlZC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDMwNToge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDUsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiQ2FuIG5vdCBsb2FkIGNhcHRpb25zIGR1ZSB0byB1bmtub3duIHJlYXNvbnMuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJDYW4gbm90IGxvYWQgY2FwdGlvbnMgZHVlIHRvIHVua25vd24gcmVhc29ucy5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDMwNjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDYsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiVW5hYmxlIHRvIGxvYWQgbWVkaWEuIFRoaXMgbWF5IGJlIGR1ZSB0byBhIHNlcnZlciBvciBuZXR3b3JrIGVycm9yLCBvciBkdWUgdG8gYW4gdW5zdXBwb3J0ZWQgZm9ybWF0LlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiVGhlIHNlcnZlciBjYW5ub3Qgb3Igd2lsbCBub3QgcHJvY2VzcyB0aGUgcmVxdWVzdC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDMwNzoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDcsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiVW5hYmxlIHRvIGxvYWQgbWVkaWEuIFRoaXMgbWF5IGJlIGR1ZSB0byBhIHNlcnZlciBvciBuZXR3b3JrIGVycm9yLCBvciBkdWUgdG8gYW4gdW5zdXBwb3J0ZWQgZm9ybWF0LlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiVGhlIHNlcnZlciByZWZ1c2VkIHRoZSByZXF1ZXN0LlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMzA4OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwOCxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJVbmFibGUgdG8gbG9hZCBtZWRpYS4gVGhpcyBtYXkgYmUgZHVlIHRvIGEgc2VydmVyIG9yIG5ldHdvcmsgZXJyb3IsIG9yIGR1ZSB0byBhbiB1bnN1cHBvcnRlZCBmb3JtYXQuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJUaGUgc2VydmVyIGRvIG5vdCBhY2NlcHQgdGhlIHJlcXVlc3QuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA1MDE6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogNTAxLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNvbm5lY3Rpb24gd2l0aCBsb3ctbGF0ZW5jeShPTUUpIHNlcnZlciBmYWlsZWQuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJXZWJTb2NrZXQgY29ubmVjdGlvbiBmYWlsZWQuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA1MDI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogNTAyLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNvbm5lY3Rpb24gd2l0aCBsb3ctbGF0ZW5jeShPTUUpIHNlcnZlciBmYWlsZWQuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJXZWJSVEMgYWRkSWNlQ2FuZGlkYXRlIGZhaWxlZC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDUwMzoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiA1MDMsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiQ29ubmVjdGlvbiB3aXRoIGxvdy1sYXRlbmN5KE9NRSkgc2VydmVyIGZhaWxlZC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIldlYlJUQyBzZXRSZW1vdGVEZXNjcmlwdGlvbiBmYWlsZWQuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA1MDQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogNTA0LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNvbm5lY3Rpb24gd2l0aCBsb3ctbGF0ZW5jeShPTUUpIHNlcnZlciBmYWlsZWQuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJXZWJSVEMgcGVlciBjcmVhdGVPZmZlciBmYWlsZWQuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA1MDU6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogNTA1LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNvbm5lY3Rpb24gd2l0aCBsb3ctbGF0ZW5jeShPTUUpIHNlcnZlciBmYWlsZWQuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJXZWJSVEMgc2V0TG9jYWxEZXNjcmlwdGlvbiBmYWlsZWQuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA1MTA6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogNTEwLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIk5ldHdvcmsgY29ubmVjdGlvbiBpcyB1bnN0YWJsZS4gQ2hlY2sgdGhlIG5ldHdvcmsgY29ubmVjdGlvbi5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIk5ldHdvcmsgaXMgc2xvdy5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDUxMToge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiA1MTEsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiQ29ubmVjdGlvbiB3aXRoIGxvdy1sYXRlbmN5KE9NRSkgdGVybWluYXRlZCB1bmV4cGVjdGVkbHkuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJVbmV4cGVjdGVkIGVuZCBvZiBjb25uZWN0aW9uLlwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwibGFuZ1wiIDogXCJrb1wiLFxyXG4gICAgICAgIFwidWlcIiA6IHtcclxuICAgICAgICAgICAgXCJjb250ZXh0XCIgOiBcIuyYpOu4kO2UjOugiOydtOyWtOyXkCDqtIDtlZjsl6xcIixcclxuICAgICAgICAgICAgXCJjb250cm9sc1wiIDoge1xyXG4gICAgICAgICAgICAgICAgXCJsaXZlXCIgOiBcIuudvOydtOu4jFwiLFxyXG4gICAgICAgICAgICAgICAgXCJsb3dfbGF0ZW5jeV9saXZlXCIgOiBcIuy0iOyggOyngOyXsCDrnbzsnbTruIxcIixcclxuICAgICAgICAgICAgICAgIFwibG93X2xhdGVuY3lfcDJwXCIgOiBcIuy0iOyggOyngOyXsCBQMlBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwbGF5bGlzdFwiIDogXCLtlIzroIjsnbTrpqzsiqTtirhcIixcclxuICAgICAgICAgICAgXCJzZXR0aW5nXCIgOiB7XHJcbiAgICAgICAgICAgICAgICBcInRpdGxlXCIgOiBcIuyEpOyglVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzcGVlZFwiIDogXCLsnqzsg50g7IaN64+EXCIsXHJcbiAgICAgICAgICAgICAgICBcInNwZWVkVW5pdFwiIDogXCJ4XCIsXHJcbiAgICAgICAgICAgICAgICBcInNvdXJjZVwiIDogXCLshozsiqRcIixcclxuICAgICAgICAgICAgICAgIFwicXVhbGl0eVwiIDogXCLtkojsp4hcIixcclxuICAgICAgICAgICAgICAgIFwiY2FwdGlvblwiIDogXCLsnpDrp4lcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzcGxheVwiIDogXCLtkZzsi5xcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImFwaVwiIDoge1xyXG4gICAgICAgICAgICBcIm1lc3NhZ2VcIiA6IHtcclxuICAgICAgICAgICAgICAgIFwibXV0ZWRfcGxheVwiIDogXCLriIzrn6zshJwg7IaM66asIOy8nOq4sFwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZXJyb3JcIjoge1xyXG4gICAgICAgICAgICAgICAgMTAwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCLslYwg7IiYIOyXhuuKlCDsnbTsnKDroZwg66Gc65OcIO2VoCDsiJgg7JeG7Iq164uI64ukLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwi7JWMIOyImCDsl4bripQg7J207Jyg66GcIOuhnOuTnCDtlaAg7IiYIOyXhuyKteuLiOuLpC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDEwMToge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAxMDEsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi7KeA7JuQ65CY64qUIOuvuOuUlOyWtOulvCDssL7sp4Ag66q77ZW0IOuhnOuTnCDtlaAg7IiYIOyXhuyKteuLiOuLpC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIkNhbiBub3QgbG9hZCBkdWUgdG8gcGxheWFibGUgbWVkaWEgbm90IGZvdW5kLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMTAyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDEwMixcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCLtlIzroIjsi5wg66Gc65Oc6rCAIOykkeuLqCDrkJjsl4jsirXri4jri6QuIDwvYnI+PGEgaHJlZj0naHR0cDovL3d3dy5hZG9iZS5jb20vZ28vZ2V0Zmxhc2hwbGF5ZXInIHRhcmdldD0nX3NlbGYnPjxpbWcgc3JjPSdodHRwOi8vd3d3LmFkb2JlLmNvbS9pbWFnZXMvc2hhcmVkL2Rvd25sb2FkX2J1dHRvbnMvZ2V0X2ZsYXNoX3BsYXllci5naWYnIGFsdD0nR2V0IEFkb2JlIEZsYXNoIHBsYXllcic+PC9hPlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiSXQgbG9va3MgbGlrZSBub3QgZm91bmQgc3dmIG9yIHlvdXIgZW52aXJvbm1lbnQgaXMgbG9jYWxob3N0LlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMTAzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDEwMyxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJEYXNoSlProZwg7J247ZW0IOuhnOuTnCDtlaAg7IiYIOyXhuyKteuLiOuLpC4gZGFzaGpzIOuyhOyghOydhCDtmZXsnbjtlbTso7zshLjsmpQuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJkYXNoLmpzIHZlcnNpb24gaXMgb2xkLiBQbGVhc2UgY2hlY2sgdGhlIGxhc3Rlc3QuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAxMDQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMTA0LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkdvb2dsZSBJTUEg65287J2067iM65+s66as6rCAIOyXhuyWtCDroZzrk5wg7ZWgIOyImCDsl4bsirXri4jri6QuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJQbGVhc2UgY2hlY2sgdGhlIGdvb2dsZSBpbWEgbGlicmFyeS5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDEwNToge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAxMDUsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiRGFzaEpTIOudvOydtOu4jOufrOumrOqwgCDsl4bslrQg66Gc65OcIO2VoCDsiJgg7JeG7Iq164uI64ukLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiTm90IGZvdW5kIGRhc2hqcy5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDEwNjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAxMDYsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiSExTSlMg65287J2067iM65+s66as6rCAIOyXhuyWtCDroZzrk5wg7ZWgIOyImCDsl4bsirXri4jri6QuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJOb3QgZm91bmQgaGxzanMuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAzMDA6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMzAwLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIuyVjCDsiJgg7JeG64qUIOydtOycoOuhnCDsnqzsg53tlaAg7IiYIOyXhuyKteuLiOuLpC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIkNhbiBub3QgcGxheSBkdWUgdG8gdW5rbm93biByZWFzb25zLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMzAxOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwMSxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCLsgqzsmqnsnpDsl5Ag7J2Y7ZWcIO2UhOuhnOyEuOyKpCDspJHri6guXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJGZXRjaGluZyBwcm9jZXNzIGFib3J0ZWQgYnkgdXNlci5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDMwMjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi64Sk7Yq47JuM7YGsIOyYpOulmOuhnCDsnbjtlbQg7J2867aAIOuvuOuUlOyWtOulvCDri6TsmrTroZzrk5wg7ZWgIOyImCDsl4bsirXri4jri6QuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJFcnJvciBvY2N1cnJlZCB3aGVuIGRvd25sb2FkaW5nLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMzAzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwMyxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCLrr7jrlJTslrTrpbwg66Gc65OcIO2VoCDsiJgg7JeG7Iq164uI64ukLiDshJzrsoQg65iQ64qUIOuEpO2KuOybjO2BrCDsmKTrpZgg65iQ64qUIOyngOybkOuQmOyngCDslYrripQg7ZiV7Iud7Jy866GcIOyduO2VtCDrsJzsg53tlaAg7IiYIOyeiOyKteuLiOuLpC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIkVycm9yIG9jY3VycmVkIHdoZW4gZGVjb2RpbmcuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAzMDQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMzA0LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIuuvuOuUlOyWtCDsnqzsg53snbQg7Leo7IaM65CY7JeI7Iq164uI64ukLiDrr7jrlJTslrTqsIAg7IaQ7IOB65CY7JeI6rGw64KYIOu4jOudvOyasOyggOqwgCDrr7jrlJTslrTsl5DshJwg7IKs7Jqp7ZWY64qUIOq4sOuKpeydhCDsp4Dsm5DtlZjsp4Ag7JWK64qUIOqygyDqsJnsirXri4jri6QuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJNZWRpYSBwbGF5YmFjayBub3Qgc3VwcG9ydGVkLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMzA1OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwNSxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCLslYwg7IiYIOyXhuuKlCDsnbTsnKDroZwg7J6Q66eJ7J2EIOuhnOuTnCDtlaAg7IiYIOyXhuyKteuLiOuLpC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIkNhbiBub3QgbG9hZCBjYXB0aW9ucyBkdWUgdG8gdW5rbm93biByZWFzb25zLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMzA2OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwNixcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCLrr7jrlJTslrTrpbwg66Gc65OcIO2VoCDsiJgg7JeG7Iq164uI64ukLiDshJzrsoQg65iQ64qUIOuEpO2KuOybjO2BrCDsmKTrpZgg65iQ64qUIOyngOybkOuQmOyngCDslYrripQg7ZiV7Iud7Jy866GcIOyduO2VtCDrsJzsg53tlaAg7IiYIOyeiOyKteuLiOuLpC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIlRoZSBzZXJ2ZXIgY2Fubm90IG9yIHdpbGwgbm90IHByb2Nlc3MgdGhlIHJlcXVlc3QuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAzMDc6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMzA3LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIuuvuOuUlOyWtOulvCDroZzrk5wg7ZWgIOyImCDsl4bsirXri4jri6QuIOyEnOuyhCDrmJDripQg64Sk7Yq47JuM7YGsIOyYpOulmCDrmJDripQg7KeA7JuQ65CY7KeAIOyViuuKlCDtmJXsi53snLzroZwg7J247ZW0IOuwnOyDne2VoCDsiJgg7J6I7Iq164uI64ukLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiVGhlIHNlcnZlciByZWZ1c2VkIHRoZSByZXF1ZXN0LlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMzA4OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwOCxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCLrr7jrlJTslrTrpbwg66Gc65OcIO2VoCDsiJgg7JeG7Iq164uI64ukLiDshJzrsoQg65iQ64qUIOuEpO2KuOybjO2BrCDsmKTrpZgg65iQ64qUIOyngOybkOuQmOyngCDslYrripQg7ZiV7Iud7Jy866GcIOyduO2VtCDrsJzsg53tlaAg7IiYIOyeiOyKteuLiOuLpC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIlRoZSBzZXJ2ZXIgZG8gbm90IGFjY2VwdCB0aGUgcmVxdWVzdC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDUwMToge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiA1MDEsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi7Ju57IaM7LyTIOyXsOqysCDsi6TtjKhcIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIldlYlNvY2tldCBjb25uZWN0aW9uIGZhaWxlZC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDUwMjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiA1MDIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi7KCA7KeA7JewKE9NRSkg7ISc67KE7JmAIOyXsOqysOyXkCDsi6TtjKjtlojsirXri4jri6QuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJXZWJSVEMgYWRkSWNlQ2FuZGlkYXRlIGZhaWxlZC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDUwMzoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiA1MDMsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi7KCA7KeA7JewKE9NRSkg7ISc67KE7JmAIOyXsOqysOyXkCDsi6TtjKjtlojsirXri4jri6QuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJXZWJSVEMgc2V0UmVtb3RlRGVzY3JpcHRpb24gZmFpbGVkLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNTA0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDUwNCxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCLsoIDsp4Dsl7AoT01FKSDshJzrsoTsmYAg7Jew6rKw7JeQIOyLpO2MqO2WiOyKteuLiOuLpC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIldlYlJUQyBwZWVyIGNyZWF0ZU9mZmVyIGZhaWxlZC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDUwNToge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiA1MDUsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi7KCA7KeA7JewKE9NRSkg7ISc67KE7JmAIOyXsOqysOyXkCDsi6TtjKjtlojsirXri4jri6QuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJXZWJSVEMgc2V0TG9jYWxEZXNjcmlwdGlvbiBmYWlsZWQuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA1MTA6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogNTEwLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIuuEpO2KuOybjO2BrCDsl7DqsrDsnbQg67aI7JWI7KCV7ZWp64uI64ukLiDrhKTtirjsm4ztgawg7Jew6rKw7J2EIO2ZleyduO2VmOyLreyLnOyYpC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIk5ldHdvcmsgaXMgc2xvdy5cIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5dOyIsIi8qKlxyXG4gKiBAYnJpZWYgICDrr7jrlJTslrQg7JeY66as66i87Yq466W8IOq0gOumrO2VmOuKlCDqsJ3ssrQuIO2YhOyerOuKlCDtlZjripQg7J287J20IOunjuyngCDslYrri6QuXHJcbiAqIEBwYXJhbSAgIHtlbGVtZW50fSAgIGNvbnRhaW5lciAgIGRvbSBlbGVtZW50XHJcbiAqXHJcbiAqICovXHJcbmltcG9ydCB7Z2V0QnJvd3Nlcn0gZnJvbSBcInV0aWxzL2Jyb3dzZXJcIjtcclxuaW1wb3J0IHtQUk9WSURFUl9EQVNILCBQUk9WSURFUl9ITFMsIFBST1ZJREVSX1dFQlJUQywgUFJPVklERVJfSFRNTDUsIFBST1ZJREVSX1JUTVB9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcbmltcG9ydCBMQSQgZnJvbSBcInV0aWxzL2xpa2VBJC5qc1wiO1xyXG5pbXBvcnQge2dldFNjcmlwdFBhdGh9IGZyb20gJ3V0aWxzL3dlYnBhY2snO1xyXG5pbXBvcnQge3ZlcnNpb259IGZyb20gJ3ZlcnNpb24nO1xyXG4vL1RvRG8gOiBSZXN0cnVjdHVyaW5nXHJcblxyXG5jb25zdCBNYW5hZ2VyID0gZnVuY3Rpb24oY29udGFpbmVyLCBicm93c2VySW5mbyl7XHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICBjb25zdCBTV0ZQYXRoID0gZ2V0U2NyaXB0UGF0aCgnb3ZlbnBsYXllci5qcycpK1wiT3ZlblBsYXllckZsYXNoLnN3Zj92PVwiK3ZlcnNpb247XHJcbiAgICBsZXQgcm9vdElkID0gY29udGFpbmVyLmdldEF0dHJpYnV0ZShcImRhdGEtcGFyZW50LWlkXCIpO1xyXG4gICAgbGV0ICRjb250YWluZXIgPSBMQSQoY29udGFpbmVyKTtcclxuICAgIGxldCB2aWRlb0VsZW1lbnQgPSBcIlwiO1xyXG5cclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIk1lZGlhTWFuYWdlciBsb2FkZWQuIGJyb3dzZXIgOiBcIiwgYnJvd3NlckluZm8gKTtcclxuXHJcbiAgICBjb25zdCBjcmVhdGVIdG1sVmlkZW8gPSBmdW5jdGlvbihpc0xvb3AsIGlzQXV0b1N0YXJ0KXtcclxuXHJcbiAgICAgICAgdmlkZW9FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcclxuICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCdkaXNhYmxlcmVtb3RlcGxheWJhY2snLCAnJyk7XHJcbiAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnd2Via2l0LXBsYXlzaW5saW5lJywgJ3RydWUnKTtcclxuICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCdwbGF5c2lubGluZScsICd0cnVlJyk7XHJcbiAgICAgICAgaWYoaXNMb29wKXtcclxuICAgICAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnbG9vcCcsICcnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaXNBdXRvU3RhcnQpIHtcclxuICAgICAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnYXV0b3BsYXknLCAnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICRjb250YWluZXIuYXBwZW5kKHZpZGVvRWxlbWVudCk7XHJcblxyXG4gICAgICAgIHJldHVybiB2aWRlb0VsZW1lbnQ7XHJcbiAgICB9O1xyXG4gICAgY29uc3QgY3JlYXRlRmxhc2hWaWRlbyA9IGZ1bmN0aW9uKGlzTG9vcCwgYnVmZmVyVGltZSwgYnVmZmVyVGltZU1heCl7XHJcbiAgICAgICAgbGV0IG1vdmllLCBmbGFzaHZhcnMsIGFsbG93c2NyaXB0YWNjZXNzLCBhbGxvd2Z1bGxzY3JlZW4sIHF1YWxpdHksIG5hbWUsIG1lbnUsIHF1YWwsIGJnY29sb3IsIGxvb3AsIHdtb2RlIDtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJNZWRpYU1hbmFnZXIgRmxhc2ggYnVmZmVyIHNldHRpbmcgOiBcIiwgYnVmZmVyVGltZSwgYnVmZmVyVGltZU1heCk7XHJcbiAgICAgICAgbW92aWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgIG1vdmllLnNldEF0dHJpYnV0ZSgnbmFtZScsICdtb3ZpZScpO1xyXG4gICAgICAgIG1vdmllLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBTV0ZQYXRoKTtcclxuXHJcbiAgICAgICAgZmxhc2h2YXJzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICBmbGFzaHZhcnMuc2V0QXR0cmlidXRlKCduYW1lJywgJ2ZsYXNodmFycycpO1xyXG4gICAgICAgIC8vcGxheWVySWQgaXMgdG8gdXNlIFNXRiBmb3IgRXh0ZXJuYWxJbnRlcmZhY2UuY2FsbCgpLlxyXG4gICAgICAgIGZsYXNodmFycy5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgYHBsYXllcklkPSR7cm9vdElkfSZidWZmZXJUaW1lPSR7YnVmZmVyVGltZX0mYnVmZmVyTWF4VGltZT0ke2J1ZmZlclRpbWVNYXh9YCk7XHJcblxyXG4gICAgICAgIGFsbG93c2NyaXB0YWNjZXNzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICBhbGxvd3NjcmlwdGFjY2Vzcy5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnYWxsb3dzY3JpcHRhY2Nlc3MnKTtcclxuICAgICAgICBhbGxvd3NjcmlwdGFjY2Vzcy5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ2Fsd2F5cycpO1xyXG5cclxuICAgICAgICBhbGxvd2Z1bGxzY3JlZW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgIGFsbG93ZnVsbHNjcmVlbi5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnYWxsb3dmdWxsc2NyZWVuJyk7XHJcbiAgICAgICAgYWxsb3dmdWxsc2NyZWVuLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAndHJ1ZScpO1xyXG5cclxuICAgICAgICBxdWFsaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICBxdWFsaXR5LnNldEF0dHJpYnV0ZSgnbmFtZScsICdxdWFsaXR5Jyk7XHJcbiAgICAgICAgcXVhbGl0eS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ2hlaWdodCcpO1xyXG5cclxuICAgICAgICBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICBuYW1lLnNldEF0dHJpYnV0ZSgnbmFtZScsICduYW1lJyk7XHJcbiAgICAgICAgbmFtZS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgcm9vdElkK1wiLWZsYXNoXCIpO1xyXG5cclxuICAgICAgICBtZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICBtZW51LnNldEF0dHJpYnV0ZSgnbmFtZScsICdtZW51Jyk7XHJcbiAgICAgICAgbWVudS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ2ZhbHNlJyk7XHJcblxyXG4gICAgICAgIHF1YWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgIHF1YWwuc2V0QXR0cmlidXRlKCduYW1lJywgJ3F1YWxpdHknKTtcclxuICAgICAgICBxdWFsLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnaGlnaCcpO1xyXG5cclxuICAgICAgICBiZ2NvbG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICBiZ2NvbG9yLnNldEF0dHJpYnV0ZSgnbmFtZScsICdiZ2NvbG9yJyk7XHJcbiAgICAgICAgYmdjb2xvci5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJyMwMDAwMDAnKTtcclxuXHJcbiAgICAgICAgd21vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgIHdtb2RlLnNldEF0dHJpYnV0ZSgnbmFtZScsICd3bW9kZScpO1xyXG4gICAgICAgIHdtb2RlLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnb3BhcXVlJyk7XHJcblxyXG4gICAgICAgIC8qbGV0IGFsbG93QnV0dG9uID0gYDxhIGhyZWY9XCJodHRwOi8vd3d3LmFkb2JlLmNvbS9nby9nZXRmbGFzaHBsYXllclwiPjxpbWcgc3JjPVwiaHR0cDovL3d3dy5hZG9iZS5jb20vaW1hZ2VzL3NoYXJlZC9kb3dubG9hZF9idXR0b25zL2dldF9mbGFzaF9wbGF5ZXIuZ2lmXCIgYWx0PVwiR2V0IEFkb2JlIEZsYXNoIHBsYXllclwiPjwvYT5gO1xyXG4gICAgICAgIG1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIG1lc3NhZ2UuaW5uZXJIVE1MID0gYWxsb3dCdXR0b247Ki9cclxuXHJcbiAgICAgICAgaWYoaXNMb29wKXtcclxuICAgICAgICAgICAgbG9vcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIGxvb3Auc2V0QXR0cmlidXRlKCduYW1lJywgJ2xvb3AnKTtcclxuICAgICAgICAgICAgbG9vcC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ3RydWUnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZpZGVvRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29iamVjdCcpO1xyXG4gICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgcm9vdElkK1wiLWZsYXNoXCIpO1xyXG4gICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCByb290SWQrXCItZmxhc2hcIik7XHJcbiAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAnMTAwJScpO1xyXG4gICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsICcxMDAlJyk7XHJcbiAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnc2NhbGUnLCAnZGVmYXVsdCcpO1xyXG4gICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3dtb2RlJywgJ29wYXF1ZScpO1xyXG5cclxuICAgICAgICBpZihicm93c2VySW5mby5icm93c2VyID09PSBcIk1pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3JlclwiICYmIGJyb3dzZXJJbmZvLmJyb3dzZXJNYWpvclZlcnNpb24gPD0gOSApe1xyXG4gICAgICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCdjbGFzc2lkJywgJ2Nsc2lkOkQyN0NEQjZFLUFFNkQtMTFjZi05NkI4LTQ0NDU1MzU0MDAwMCcpO1xyXG4gICAgICAgICAgICB2aWRlb0VsZW1lbnQuYXBwZW5kQ2hpbGQobW92aWUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhJywgU1dGUGF0aCk7XHJcbiAgICAgICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2gnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaXNMb29wKXtcclxuICAgICAgICAgICAgdmlkZW9FbGVtZW50LmFwcGVuZENoaWxkKGxvb3ApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmlkZW9FbGVtZW50LmFwcGVuZENoaWxkKHdtb2RlKTtcclxuICAgICAgICB2aWRlb0VsZW1lbnQuYXBwZW5kQ2hpbGQoYmdjb2xvcik7XHJcbiAgICAgICAgdmlkZW9FbGVtZW50LmFwcGVuZENoaWxkKHF1YWwpO1xyXG4gICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChhbGxvd2Z1bGxzY3JlZW4pO1xyXG4gICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChhbGxvd3NjcmlwdGFjY2Vzcyk7XHJcbiAgICAgICAgdmlkZW9FbGVtZW50LmFwcGVuZENoaWxkKGZsYXNodmFycyk7XHJcbiAgICAgICAgLy92aWRlb0VsZW1lbnQuYXBwZW5kQ2hpbGQobWVzc2FnZSk7XHJcblxyXG4gICAgICAgICRjb250YWluZXIuYXBwZW5kKHZpZGVvRWxlbWVudCk7XHJcblxyXG4gICAgICAgIHJldHVybiB2aWRlb0VsZW1lbnQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuY3JlYXRlTWVkaWEgPSAocHJvdmlkZXJOYW1lICwgcGxheWVyQ29uZmlnKSAgPT4ge1xyXG4gICAgICAgIGlmKCBwcm92aWRlck5hbWUgPT09IFBST1ZJREVSX1JUTVAgKXtcclxuICAgICAgICAgICAgaWYodmlkZW9FbGVtZW50KXtcclxuICAgICAgICAgICAgICAgIHRoYXQuZW1wdHkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlRmxhc2hWaWRlbyhwbGF5ZXJDb25maWcuaXNMb29wKCksIHBsYXllckNvbmZpZy5nZXRSdG1wQnVmZmVyVGltZSgpLCBwbGF5ZXJDb25maWcuZ2V0UnRtcEJ1ZmZlclRpbWVNYXgoKSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIC8vIGlmKHZpZGVvRWxlbWVudCl7XHJcbiAgICAgICAgICAgIC8vICAgICAvLyB0aGF0LmVtcHR5KCk7XHJcbiAgICAgICAgICAgIC8vICAgICAvL3JldXNlIHZpZGVvIGVsZW1lbnQuXHJcbiAgICAgICAgICAgIC8vICAgICAvL2JlY2F1c2UgcGxheWxpc3QgaXMgYXV0byBuZXh0IHBsYXlpbmcuXHJcbiAgICAgICAgICAgIC8vICAgICAvL09ubHkgc2FtZSB2aWRlbyBlbGVtZW50IGRvZXMgbm90IHJlcXVpcmUgVXNlciBJbnRlcmFjdGlvbiBFcnJvci5cclxuICAgICAgICAgICAgLy8gICAgIHJldHVybiB2aWRlb0VsZW1lbnQ7XHJcbiAgICAgICAgICAgIC8vIH1lbHNle1xyXG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuIGNyZWF0ZUh0bWxWaWRlbyhwbGF5ZXJDb25maWcuaXNMb29wKCksIHBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpKTtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICB0aGF0LmVtcHR5KCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVIdG1sVmlkZW8ocGxheWVyQ29uZmlnLmlzTG9vcCgpLCBwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoYXQuY3JlYXRlQWRDb250YWluZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGFkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgYWRDb250YWluZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdvcC1hZHMnKTtcclxuICAgICAgICAkY29udGFpbmVyLmFwcGVuZChhZENvbnRhaW5lcik7XHJcblxyXG4gICAgICAgIHJldHVybiBhZENvbnRhaW5lcjtcclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoYXQuZW1wdHkgPSAoKSA9PntcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJNZWRpYU1hbmFnZXIgcmVtb3ZlRWxlbWVudCgpXCIpO1xyXG4gICAgICAgICRjb250YWluZXIucmVtb3ZlQ2hpbGQodmlkZW9FbGVtZW50KTtcclxuICAgICAgICB2aWRlb0VsZW1lbnQgPSBudWxsO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcclxuICAgICAgICAkY29udGFpbmVyLnJlbW92ZUNoaWxkKCk7XHJcbiAgICAgICAgJGNvbnRhaW5lciA9IG51bGw7XHJcbiAgICAgICAgdmlkZW9FbGVtZW50ID0gbnVsbDtcclxuICAgICAgICByb290SWQgPSBudWxsO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1hbmFnZXI7XHJcbiIsImltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XHJcbmltcG9ydCB7aXNSdG1wLCBpc1dlYlJUQywgaXNEYXNoIH0gZnJvbSBcInV0aWxzL3ZhbGlkYXRvclwiO1xyXG5pbXBvcnQge2V4dHJhY3RFeHRlbnNpb24gLHRyaW19IGZyb20gXCIuLi8uLi91dGlscy9zdHJpbmdzXCI7XHJcbmltcG9ydCBTdXBwb3J0Q2hlY2tlciBmcm9tIFwiLi4vU3VwcG9ydENoZWNrZXJcIjtcclxuaW1wb3J0IHtQTEFZTElTVF9DSEFOR0VEfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIFRoaXMgbWFuYWdlcyBQbGF5bGlzdCBvciBTb3VyY2VzLlxyXG4gKiBAcGFyYW1cclxuICpcclxuICogKi9cclxuY29uc3QgTWFuYWdlciA9IGZ1bmN0aW9uKHByb3ZpZGVyKXtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIGxldCBjdXJyZW50UGxheWxpc3RJdGVtID0gW107XHJcbiAgICBsZXQgc3BlYyA9IHtcclxuICAgICAgICBwbGF5bGlzdCA6IFtdLFxyXG4gICAgICAgIGN1cnJlbnRJbmRleCA6IDBcclxuICAgIH07XHJcbiAgICBsZXQgc3VwcG9ydENoZWNrZXIgPSBTdXBwb3J0Q2hlY2tlcigpO1xyXG5cclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBsb2FkZWQuXCIpO1xyXG5cclxuICAgIGNvbnN0IG1ha2VQcmV0dHlTb3VyY2UgPSBmdW5jdGlvbihzb3VyY2VfKXtcclxuICAgICAgICBpZiAoIXNvdXJjZV8gfHwgIXNvdXJjZV8uZmlsZSAmJiAhKHNvdXJjZV8uaG9zdCB8fCBzb3VyY2VfLmFwcGxpY2F0aW9uIHx8IHNvdXJjZV8uc3RyZWFtKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc291cmNlID0gT2JqZWN0LmFzc2lnbih7fSwgeyAnZGVmYXVsdCc6IGZhbHNlIH0sIHNvdXJjZV8pO1xyXG4gICAgICAgIHNvdXJjZS5maWxlID0gdHJpbSgnJyArIHNvdXJjZS5maWxlKTtcclxuXHJcbiAgICAgICAgaWYoc291cmNlLmhvc3QgJiYgc291cmNlLmFwcGxpY2F0aW9uICYmIHNvdXJjZS5zdHJlYW0pe1xyXG4gICAgICAgICAgICBzb3VyY2UuZmlsZSA9IHNvdXJjZS5ob3N0ICsgXCIvXCIgKyBzb3VyY2UuYXBwbGljYXRpb24gKyBcIi9zdHJlYW0vXCIgKyBzb3VyY2Uuc3RyZWFtO1xyXG4gICAgICAgICAgICBkZWxldGUgc291cmNlLmhvc3Q7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBzb3VyY2UuYXBwbGljYXRpb247XHJcbiAgICAgICAgICAgIGRlbGV0ZSBzb3VyY2Uuc3RyZWFtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbWltZXR5cGVSZWdFeCA9IC9eW14vXStcXC8oPzp4LSk/KFteL10rKSQvO1xyXG5cclxuICAgICAgICBpZiAobWltZXR5cGVSZWdFeC50ZXN0KHNvdXJjZS50eXBlKSkge1xyXG4gICAgICAgICAgICAvLyBpZiB0eXBlIGlzIGdpdmVuIGFzIGEgbWltZXR5cGVcclxuICAgICAgICAgICAgc291cmNlLm1pbWVUeXBlID0gc291cmNlLnR5cGU7XHJcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gc291cmNlLnR5cGUucmVwbGFjZShtaW1ldHlwZVJlZ0V4LCAnJDEnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGlzUnRtcChzb3VyY2UuZmlsZSkpe1xyXG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdydG1wJztcclxuICAgICAgICB9ZWxzZSBpZihpc1dlYlJUQyhzb3VyY2UuZmlsZSkpe1xyXG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9ICd3ZWJydGMnO1xyXG4gICAgICAgIH1lbHNlIGlmKGlzRGFzaChzb3VyY2UuZmlsZSwgc291cmNlLnR5cGUpKXtcclxuICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnZGFzaCc7XHJcbiAgICAgICAgfWVsc2UgaWYgKCFzb3VyY2UudHlwZSkge1xyXG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9IGV4dHJhY3RFeHRlbnNpb24oc291cmNlLmZpbGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNvdXJjZS5sb3dMYXRlbmN5KSB7XHJcbiAgICAgICAgICAgIHNvdXJjZS5sb3dMYXRlbmN5ID0gc291cmNlLmxvd0xhdGVuY3k7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXNvdXJjZS50eXBlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIG5vcm1hbGl6ZSB0eXBlc1xyXG4gICAgICAgIHN3aXRjaCAoc291cmNlLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnbTN1OCc6XHJcbiAgICAgICAgICAgIGNhc2UgJ3ZuZC5hcHBsZS5tcGVndXJsJzpcclxuICAgICAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ2hscyc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbTRhJzpcclxuICAgICAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ2FhYyc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc21pbCc6XHJcbiAgICAgICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdydG1wJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgICAgIGlmIChzb3VyY2Vba2V5XSA9PT0gJycpIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBzb3VyY2Vba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gc291cmNlO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB0aGF0LmluaXRQbGF5bGlzdCA9KHBsYXlsaXN0LCBwbGF5ZXJDb25maWcpID0+e1xyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQbGF5bGlzdE1hbmFnZXIgc2V0UGxheWxpc3QoKSBcIiwgcGxheWxpc3QpO1xyXG4gICAgICAgIGNvbnN0IHByZXR0aWVkUGxheWxpc3QgPSAoXy5pc0FycmF5KHBsYXlsaXN0KSA/IHBsYXlsaXN0IDogW3BsYXlsaXN0XSkubWFwKGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgICAgICAgICBpZighXy5pc0FycmF5KGl0ZW0udHJhY2tzKSkge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGl0ZW0udHJhY2tzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBwbGF5bGlzdEl0ZW0gPSBPYmplY3QuYXNzaWduKHt9LHtcclxuICAgICAgICAgICAgICAgIHNvdXJjZXM6IFtdLFxyXG4gICAgICAgICAgICAgICAgdHJhY2tzOiBbXSxcclxuICAgICAgICAgICAgICAgIHRpdGxlIDogXCJcIlxyXG4gICAgICAgICAgICB9LCBpdGVtICk7XHJcblxyXG4gICAgICAgICAgICBpZigocGxheWxpc3RJdGVtLnNvdXJjZXMgPT09IE9iamVjdChwbGF5bGlzdEl0ZW0uc291cmNlcykpICYmICFfLmlzQXJyYXkocGxheWxpc3RJdGVtLnNvdXJjZXMpKSB7XHJcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IFttYWtlUHJldHR5U291cmNlKHBsYXlsaXN0SXRlbS5zb3VyY2VzKV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghXy5pc0FycmF5KHBsYXlsaXN0SXRlbS5zb3VyY2VzKSB8fCBwbGF5bGlzdEl0ZW0uc291cmNlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gW21ha2VQcmV0dHlTb3VyY2UocGxheWxpc3RJdGVtKV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKCFfLmlzQXJyYXkocGxheWxpc3RJdGVtLnNvdXJjZXMpIHx8IHBsYXlsaXN0SXRlbS5zb3VyY2VzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ubGV2ZWxzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBpdGVtLmxldmVscztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBbbWFrZVByZXR0eVNvdXJjZShpdGVtKV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcGxheWxpc3RJdGVtLnNvdXJjZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBzb3VyY2UgPSBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXTtcclxuICAgICAgICAgICAgICAgIGxldCBwcmV0dHlTb3VyY2UgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZGVmYXVsdFNvdXJjZSA9IHNvdXJjZS5kZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRTb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2UuZGVmYXVsdCA9IChkZWZhdWx0U291cmNlLnRvU3RyaW5nKCkgPT09ICd0cnVlJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZS5kZWZhdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHNvdXJjZSBkb2Vzbid0IGhhdmUgYSBsYWJlbCwgbnVtYmVyIGl0XHJcbiAgICAgICAgICAgICAgICBpZiAoIXBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0ubGFiZWwgPSBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXS50eXBlK1wiLVwiK2kudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwcmV0dHlTb3VyY2UgPSBtYWtlUHJldHR5U291cmNlKHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldKTtcclxuICAgICAgICAgICAgICAgIGlmKHN1cHBvcnRDaGVja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShwcmV0dHlTb3VyY2UpKXtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXSA9IHByZXR0eVNvdXJjZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBwbGF5bGlzdEl0ZW0uc291cmNlcy5maWx0ZXIoc291cmNlID0+ICEhc291cmNlKTtcclxuXHJcbiAgICAgICAgICAgIGlmKCFwbGF5bGlzdEl0ZW0udGl0bGUgJiYgIHBsYXlsaXN0SXRlbS5zb3VyY2VzWzBdICYmIHBsYXlsaXN0SXRlbS5zb3VyY2VzWzBdLmxhYmVsKXtcclxuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS50aXRsZSA9IHBsYXlsaXN0SXRlbS5zb3VyY2VzWzBdLmxhYmVsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBkZWZhdWx0IOqwgCDsl4bsnYTrlYwgd2VicnRj6rCAIOyeiOuLpOuptCB3ZWJydGMgZGVmYXVsdCA6IHRydWXroZwg7J6Q64+ZIOyEpOyglVxyXG4gICAgICAgICAgICAvKmxldCBoYXZlRGVmYXVsdCA9IF8uZmluZChwbGF5bGlzdEl0ZW0uc291cmNlcywgZnVuY3Rpb24oc291cmNlKXtyZXR1cm4gc291cmNlLmRlZmF1bHQgPT0gdHJ1ZTt9KTtcclxuICAgICAgICAgICAgbGV0IHdlYnJ0Y1NvdXJjZSA9IFtdO1xyXG4gICAgICAgICAgICBpZighaGF2ZURlZmF1bHQpe1xyXG4gICAgICAgICAgICAgICAgd2VicnRjU291cmNlID0gXy5maW5kKHBsYXlsaXN0SXRlbS5zb3VyY2VzLCBmdW5jdGlvbihzb3VyY2Upe3JldHVybiBzb3VyY2UudHlwZSA9PSBcIndlYnJ0Y1wiO30pO1xyXG4gICAgICAgICAgICAgICAgaWYod2VicnRjU291cmNlKXtcclxuICAgICAgICAgICAgICAgICAgICB3ZWJydGNTb3VyY2UuZGVmYXVsdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0qL1xyXG5cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGV4dHJhY3RPbmx5T25lUHJvdG9jb2woc291cmNlcyl7XHJcbiAgICAgICAgICAgICAgICBpZighIXNvdXJjZXMpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBoaWdoUHJpb3JpdHlUeXBlID0gcGxheWxpc3RJdGVtLnNvdXJjZXNbMF0udHlwZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF8uZmlsdGVyKHNvdXJjZXMsIHt0eXBlIDogaGlnaFByaW9yaXR5VHlwZX0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuaXNDdXJyZW50UHJvdG9jb2xPbmx5KCkpe1xyXG4gICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBleHRyYWN0T25seU9uZVByb3RvY29sKHBsYXlsaXN0SXRlbS5zb3VyY2VzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoIV8uaXNBcnJheShwbGF5bGlzdEl0ZW0udHJhY2tzKSl7XHJcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0udHJhY2tzID0gW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoXy5pc0FycmF5KHBsYXlsaXN0SXRlbS5jYXB0aW9ucykpe1xyXG4gICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnRyYWNrcyA9IHBsYXlsaXN0SXRlbS50cmFja3MuY29uY2F0KHBsYXlsaXN0SXRlbS5jYXB0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgcGxheWxpc3RJdGVtLmNhcHRpb25zO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwbGF5bGlzdEl0ZW0udHJhY2tzID0gcGxheWxpc3RJdGVtLnRyYWNrcy5tYXAoZnVuY3Rpb24odHJhY2spe1xyXG4gICAgICAgICAgICAgICAgaWYoIXRyYWNrIHx8ICF0cmFjay5maWxlKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwge1xyXG4gICAgICAgICAgICAgICAgICAgICdraW5kJzogJ2NhcHRpb25zJyxcclxuICAgICAgICAgICAgICAgICAgICAnZGVmYXVsdCc6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9LCB0cmFjayk7XHJcbiAgICAgICAgICAgIH0pLmZpbHRlcih0cmFjayA9PiAhIXRyYWNrKTtcclxuICAgICAgICAgICAgcmV0dXJuIHBsYXlsaXN0SXRlbTtcclxuICAgICAgICB9KS5maWx0ZXIoZnVuY3Rpb24oaXRlbSl7cmV0dXJuIGl0ZW0uc291cmNlcyAmJiBpdGVtLnNvdXJjZXMubGVuZ3RoID4gMDt9KXx8W107XHJcbiAgICAgICAgc3BlYy5wbGF5bGlzdCA9IHByZXR0aWVkUGxheWxpc3Q7XHJcbiAgICAgICAgcmV0dXJuIHByZXR0aWVkUGxheWxpc3Q7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRQbGF5bGlzdCA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQbGF5bGlzdE1hbmFnZXIgZ2V0UGxheWxpc3QoKSBcIiwgc3BlYy5wbGF5bGlzdCk7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMucGxheWxpc3Q7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRDdXJyZW50UGxheUxpc3QgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoc3BlYy5wbGF5bGlzdFtzcGVjLmN1cnJlbnRJbmRleF0pe1xyXG4gICAgICAgICAgICByZXR1cm4gc3BlYy5wbGF5bGlzdFtzcGVjLmN1cnJlbnRJbmRleF07XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRDdXJyZW50UGxheWxpc3RJbmRleCA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50SW5kZXg7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRDdXJyZW50UGxheWxpc3QgPSAoaW5kZXgpID0+IHtcclxuICAgICAgICBpZihzcGVjLnBsYXlsaXN0W2luZGV4XSl7XHJcbiAgICAgICAgICAgIHNwZWMuY3VycmVudEluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoUExBWUxJU1RfQ0hBTkdFRCwgc3BlYy5jdXJyZW50SW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50SW5kZXg7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRDdXJyZW50U291cmNlcyA9ICgpID0+IHtcclxuICAgICAgICBpZihzcGVjLnBsYXlsaXN0W3NwZWMuY3VycmVudEluZGV4XSl7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBnZXRDdXJyZW50U291cmNlcygpIFwiLCBzcGVjLnBsYXlsaXN0W3NwZWMuY3VycmVudEluZGV4XS5zb3VyY2VzKTtcclxuICAgICAgICAgICAgcmV0dXJuIHNwZWMucGxheWxpc3Rbc3BlYy5jdXJyZW50SW5kZXhdLnNvdXJjZXM7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRDdXJyZW50QWRUYWcgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoc3BlYy5wbGF5bGlzdFtzcGVjLmN1cnJlbnRJbmRleF0pe1xyXG4gICAgICAgICAgICByZXR1cm4gc3BlYy5wbGF5bGlzdFtzcGVjLmN1cnJlbnRJbmRleF0uYWRUYWdVcmwgfHwgXCJcIjtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1hbmFnZXI7XHJcbiIsImltcG9ydCBTdXBwb3J0Q2hlY2tlciBmcm9tIFwiYXBpL1N1cHBvcnRDaGVja2VyXCI7XHJcbmltcG9ydCB7QXBpUnRtcEV4cGFuc2lvbn0gZnJvbSAnYXBpL0FwaUV4cGFuc2lvbnMnO1xyXG5pbXBvcnQge1xyXG4gICAgUFJPVklERVJfSFRNTDUsIFBST1ZJREVSX1dFQlJUQywgUFJPVklERVJfREFTSCwgUFJPVklERVJfSExTLCBQUk9WSURFUl9SVE1QLCBFUlJPUlMsIElOSVRfVU5TVVBQT1JUX0VSUk9SXHJcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBUaGlzIG1hbmFnZXMgcHJvdmlkZXIuXHJcbiAqIEBwYXJhbVxyXG4gKiAqL1xyXG5jb25zdCBDb250cm9sbGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IHN1cHBvcnRDaGFja2VyID0gU3VwcG9ydENoZWNrZXIoKTtcclxuICAgIGNvbnN0IFByb3ZpZGVycyA9IHt9O1xyXG5cclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBsb2FkZWQuXCIpO1xyXG5cclxuICAgIGNvbnN0IHJlZ2lzdGVQcm92aWRlciA9IChuYW1lLCBwcm92aWRlcikgPT4ge1xyXG4gICAgICAgIGlmIChQcm92aWRlcnNbbmFtZV0pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgX3JlZ2lzdGVyUHJvdmlkZXIoKSBcIiwgbmFtZSk7XHJcbiAgICAgICAgUHJvdmlkZXJzW25hbWVdID0gcHJvdmlkZXI7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IFByb3ZpZGVyTG9hZGVyID0ge1xyXG4gICAgICAgIGh0bWw1OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvSHRtbDUnXSwgZnVuY3Rpb24gKHJlcXVpcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvSHRtbDUnKS5kZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVQcm92aWRlcihQUk9WSURFUl9IVE1MNSwgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7bmFtZTogUFJPVklERVJfSFRNTDUsIHByb3ZpZGVyOiBwcm92aWRlcn07XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XHJcbiAgICAgICAgICAgICAgICB9LCAnb3ZlbnBsYXllci5wcm92aWRlci5IdG1sNSdcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHdlYnJ0YzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvaHRtbDUvcHJvdmlkZXJzL1dlYlJUQyddLCBmdW5jdGlvbiAocmVxdWlyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9XZWJSVEMnKS5kZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVQcm92aWRlcihQUk9WSURFUl9XRUJSVEMsIHByb3ZpZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge25hbWU6IFBST1ZJREVSX1dFQlJUQywgcHJvdmlkZXI6IHByb3ZpZGVyfTtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcclxuICAgICAgICAgICAgICAgIH0sICdvdmVucGxheWVyLnByb3ZpZGVyLldlYlJUQ1Byb3ZpZGVyJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGFzaDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvaHRtbDUvcHJvdmlkZXJzL0Rhc2gnXSwgZnVuY3Rpb24gKHJlcXVpcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvRGFzaCcpLmRlZmF1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFBST1ZJREVSX0RBU0gsIHByb3ZpZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge25hbWU6IFBST1ZJREVSX0RBU0gsIHByb3ZpZGVyOiBwcm92aWRlcn07XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XHJcbiAgICAgICAgICAgICAgICB9LCAnb3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXInXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBobHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IbHMnXSwgZnVuY3Rpb24gKHJlcXVpcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvSGxzJykuZGVmYXVsdDtcclxuICAgICAgICAgICAgICAgICAgICByZWdpc3RlUHJvdmlkZXIoUFJPVklERVJfSExTLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtuYW1lOiBQUk9WSURFUl9ITFMsIHByb3ZpZGVyOiBwcm92aWRlcn07XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XHJcbiAgICAgICAgICAgICAgICB9LCAnb3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcidcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJ0bXA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2ZsYXNoL3Byb3ZpZGVycy9SdG1wJ10sIGZ1bmN0aW9uIChyZXF1aXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvZmxhc2gvcHJvdmlkZXJzL1J0bXAnKS5kZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVQcm92aWRlcihQUk9WSURFUl9SVE1QLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtuYW1lOiBQUk9WSURFUl9SVE1QLCBwcm92aWRlcjogcHJvdmlkZXJ9O1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgfSwgJ292ZW5wbGF5ZXIucHJvdmlkZXIuUnRtcFByb3ZpZGVyJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoYXQubG9hZFByb3ZpZGVycyA9IChwbGF5bGlzdEl0ZW0pID0+IHtcclxuICAgICAgICBjb25zdCBzdXBwb3J0ZWRQcm92aWRlck5hbWVzID0gc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0KHBsYXlsaXN0SXRlbSk7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGxvYWRQcm92aWRlcnMoKSBcIiwgc3VwcG9ydGVkUHJvdmlkZXJOYW1lcyk7XHJcbiAgICAgICAgaWYgKCFzdXBwb3J0ZWRQcm92aWRlck5hbWVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFUlJPUlMuY29kZXNbSU5JVF9VTlNVUFBPUlRfRVJST1JdKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoXHJcbiAgICAgICAgICAgICAgICBzdXBwb3J0ZWRQcm92aWRlck5hbWVzLmZpbHRlcihmdW5jdGlvbiAocHJvdmlkZXJOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEhUHJvdmlkZXJMb2FkZXJbcHJvdmlkZXJOYW1lXTtcclxuICAgICAgICAgICAgICAgIH0pLm1hcChmdW5jdGlvbiAocHJvdmlkZXJOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb3ZpZGVyTG9hZGVyW3Byb3ZpZGVyTmFtZV0oKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5maW5kQnlOYW1lID0gKG5hbWUpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgZmluZEJ5TmFtZSgpIFwiLCBuYW1lKTtcclxuICAgICAgICByZXR1cm4gUHJvdmlkZXJzW25hbWVdO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldFByb3ZpZGVyQnlTb3VyY2UgPSAoc291cmNlKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc3VwcG9ydGVkUHJvdmlkZXJOYW1lID0gc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKHNvdXJjZSk7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGdldFByb3ZpZGVyQnlTb3VyY2UoKSBcIiwgc3VwcG9ydGVkUHJvdmlkZXJOYW1lKTtcclxuICAgICAgICByZXR1cm4gdGhhdC5maW5kQnlOYW1lKHN1cHBvcnRlZFByb3ZpZGVyTmFtZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuaXNTYW1lUHJvdmlkZXIgPSAoY3VycmVudFNvdXJjZSwgbmV3U291cmNlKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGlzU2FtZVByb3ZpZGVyKCkgXCIsIHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShjdXJyZW50U291cmNlKSwgc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKG5ld1NvdXJjZSkpO1xyXG4gICAgICAgIHJldHVybiBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UoY3VycmVudFNvdXJjZSkgPT09IHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShuZXdTb3VyY2UpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbnRyb2xsZXI7XHJcbiIsImltcG9ydCBBUEkgZnJvbSAnYXBpL0FwaSc7XHJcbmltcG9ydCB7aXNXZWJSVEN9IGZyb20gJ3V0aWxzL3ZhbGlkYXRvcic7XHJcbmltcG9ydCBfIGZyb20gJ3V0aWxzL3VuZGVyc2NvcmUnO1xyXG5pbXBvcnQgTGEkIGZyb20gJ3V0aWxzL2xpa2VBJCc7XHJcbmltcG9ydCB7Z2V0U2NyaXB0UGF0aH0gZnJvbSAndXRpbHMvd2VicGFjayc7XHJcblxyXG5cclxuX193ZWJwYWNrX3B1YmxpY19wYXRoX18gPSBnZXRTY3JpcHRQYXRoKCdvdmVucGxheWVyLnNkay5qcycpO1xyXG5cclxuLyoqXHJcbiAqIE1haW4gT3ZlblBsYXllclNESyBvYmplY3RcclxuICovXHJcbmNvbnN0IE92ZW5QbGF5ZXJTREsgPSB3aW5kb3cuT3ZlblBsYXllclNESyA9IHt9O1xyXG5cclxuY29uc3QgcGxheWVyTGlzdCA9IE92ZW5QbGF5ZXJTREsucGxheWVyTGlzdCA9IFtdO1xyXG5cclxuZXhwb3J0IGNvbnN0IGNoZWNrQW5kR2V0Q29udGFpbmVyRWxlbWVudCA9IGZ1bmN0aW9uKGNvbnRhaW5lcikge1xyXG4gICAgaWYgKCFjb250YWluZXIpIHtcclxuXHJcbiAgICAgICAgLy8gVE9ETyhyb2NrKTogU2hvdWxkIGNhdXNlIGFuIGVycm9yLlxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBjb250YWluZXJFbGVtZW50ID0gbnVsbDtcclxuXHJcbiAgICBpZiAodHlwZW9mIGNvbnRhaW5lciA9PT0gJ3N0cmluZycpIHtcclxuXHJcbiAgICAgICAgY29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvbnRhaW5lcik7XHJcbiAgICB9IGVsc2UgaWYgKGNvbnRhaW5lci5ub2RlVHlwZSkge1xyXG5cclxuICAgICAgICBjb250YWluZXJFbGVtZW50ID0gY29udGFpbmVyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBUT0RPKHJvY2spOiBTaG91bGQgY2F1c2UgYW4gZXJyb3IuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNvbnRhaW5lckVsZW1lbnQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgcGxheWVyIGluc3RhbmNlIGFuZCByZXR1cm4gaXQuXHJcbiAqXHJcbiAqIEBwYXJhbSAgICAgIHtzdHJpbmcgfCBkb20gZWxlbWVudH0gY29udGFpbmVyICBJZCBvZiBjb250YWluZXIgZWxlbWVudCBvciBjb250YWluZXIgZWxlbWVudFxyXG4gKiBAcGFyYW0gICAgICB7b2JqZWN0fSBvcHRpb25zICBUaGUgb3B0aW9uc1xyXG4gKi9cclxuT3ZlblBsYXllclNESy5jcmVhdGUgPSBmdW5jdGlvbihjb250YWluZXIsIG9wdGlvbnMpIHtcclxuXHJcbiAgICBsZXQgY29udGFpbmVyRWxlbWVudCA9IGNoZWNrQW5kR2V0Q29udGFpbmVyRWxlbWVudChjb250YWluZXIpO1xyXG5cclxuICAgIGNvbnN0IHBsYXllckluc3RhbmNlID0gQVBJKGNvbnRhaW5lckVsZW1lbnQpO1xyXG4gICAgcGxheWVySW5zdGFuY2UuaW5pdChvcHRpb25zKTtcclxuXHJcbiAgICBwbGF5ZXJMaXN0LnB1c2gocGxheWVySW5zdGFuY2UpO1xyXG5cclxuICAgIHJldHVybiBwbGF5ZXJJbnN0YW5jZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBwbGF5ZXIgaW5zdGFuY2UgbGlzdC5cclxuICpcclxuICogQHJldHVybiAgICAge2FycmF5fSAgVGhlIHBsYXllciBsaXN0LlxyXG4gKi9cclxuT3ZlblBsYXllclNESy5nZXRQbGF5ZXJMaXN0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgcmV0dXJuIHBsYXllckxpc3Q7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgcGxheWVyIGluc3RhbmNlIGJ5IGNvbnRhaW5lciBpZC5cclxuICpcclxuICogQHBhcmFtICAgICAge3N0cmluZ30gIGNvbnRhaW5lcklkICBUaGUgY29udGFpbmVyIGlkZW50aWZpZXJcclxuICogQHJldHVybiAgICAge29iZWplY3QgfCBudWxsfSAgVGhlIHBsYXllciBpbnN0YW5jZS5cclxuICovXHJcbk92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyQnlDb250YWluZXJJZCA9IGZ1bmN0aW9uKGNvbnRhaW5lcklkKSB7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5ZXJMaXN0Lmxlbmd0aDsgaSArKykge1xyXG5cclxuICAgICAgICBpZiAocGxheWVyTGlzdFtpXS5nZXRDb250YWluZXJJZCgpID09PSBjb250YWluZXJJZCkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHBsYXllckxpc3RbaV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIHBsYXllciBpbnN0YW5jZSBieSBpbmRleC5cclxuICpcclxuICogQHBhcmFtICAgICAge251bWJlcn0gIGluZGV4ICAgVGhlIGluZGV4XHJcbiAqIEByZXR1cm4gICAgIHtvYmplY3QgfCBudWxsfSAgVGhlIHBsYXllciBpbnN0YW5jZS5cclxuICovXHJcbk92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyQnlJbmRleCA9IGZ1bmN0aW9uKGluZGV4KSB7XHJcblxyXG4gICAgY29uc3QgcGxheWVySW5zdGFuY2UgPSBwbGF5ZXJMaXN0W2luZGV4XTtcclxuXHJcbiAgICBpZiAocGxheWVySW5zdGFuY2UpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIHBsYXllckluc3RhbmNlO1xyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIHRoZSBwbGF5ZXIgaW5zdGFuY2UgYnkgcGxheWVySWQuXHJcbiAqXHJcbiAqIEBwYXJhbSAgICAgIHtwbGF5ZXJJZH0gIGlkXHJcbiAqIEByZXR1cm4gICAgIHtudWxsfVxyXG4gKi9cclxuT3ZlblBsYXllclNESy5yZW1vdmVQbGF5ZXIgPSBmdW5jdGlvbihwbGF5ZXJJZCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5ZXJMaXN0Lmxlbmd0aDsgaSArKykge1xyXG5cclxuICAgICAgICBpZiAocGxheWVyTGlzdFtpXS5nZXRDb250YWluZXJJZCgpID09PSBwbGF5ZXJJZCkge1xyXG5cclxuICAgICAgICAgICAgcGxheWVyTGlzdC5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZW5lcmF0ZSB3ZWJydGMgc291cmNlIGZvciBwbGF5ZXIgc291cmNlIHR5cGUuXHJcbiAqXHJcbiAqIEBwYXJhbSAgICAgIHtPYmplY3QgfCBBcnJheX0gIHNvdXJjZSAgIHdlYnJ0YyBzb3VyY2VcclxuICogQHJldHVybiAgICAge0FycmF5fSAgUGxheWVyIHNvdXJjZSBPYmplY3QuXHJcbiAqL1xyXG5PdmVuUGxheWVyU0RLLmdlbmVyYXRlV2VicnRjVXJscyA9IGZ1bmN0aW9uKHNvdXJjZXMpIHtcclxuICAgIHJldHVybiAoXy5pc0FycmF5KHNvdXJjZXMpID8gc291cmNlcyA6IFtzb3VyY2VzXSkubWFwKGZ1bmN0aW9uKHNvdXJjZSwgaW5kZXgpe1xyXG4gICAgICAgIGlmKHNvdXJjZS5ob3N0ICYmIGlzV2ViUlRDKHNvdXJjZS5ob3N0KSAmJiBzb3VyY2UuYXBwbGljYXRpb24gJiYgc291cmNlLnN0cmVhbSl7XHJcbiAgICAgICAgICAgIHJldHVybiB7ZmlsZSA6IHNvdXJjZS5ob3N0ICsgXCIvXCIgKyBzb3VyY2UuYXBwbGljYXRpb24gKyBcIi9cIiArIHNvdXJjZS5zdHJlYW0sIHR5cGUgOiBcIndlYnJ0Y1wiLCBsYWJlbCA6IHNvdXJjZS5sYWJlbCA/IHNvdXJjZS5sYWJlbCA6IFwid2VicnRjLVwiKyhpbmRleCsxKSB9O1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdoZXRoZXIgc2hvdyB0aGUgcGxheWVyIGNvcmUgbG9nIG9yIG5vdC5cclxuICpcclxuICogQHBhcmFtICAgICAge2Jvb2xlYW59ICBib29sZWFuICAgcnVuIGRlYnVnIG1vZGUgb3Igbm90LlxyXG4gKiBAcmV0dXJuICAgICB7Ym9vbGVhbn0gIHJ1biBkZWJ1ZyBtb2RlIG9yIG5vdC5cclxuICovXHJcbk92ZW5QbGF5ZXJTREsuZGVidWcgPSBmdW5jdGlvbihpc0RlYnVnTW9kZSkge1xyXG4gICAgaWYoaXNEZWJ1Z01vZGUpe1xyXG4gICAgICAgIHdpbmRvdy5PdmVuUGxheWVyQ29uc29sZSA9IHtsb2cgOiB3aW5kb3dbJ2NvbnNvbGUnXVsnbG9nJ119O1xyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgd2luZG93Lk92ZW5QbGF5ZXJDb25zb2xlID0ge2xvZyA6ICBmdW5jdGlvbigpe319O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGlzRGVidWdNb2RlO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgT3ZlblBsYXllclNESztcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyNC4uXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldEJyb3dzZXJMYW5ndWFnZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgbmF2ID0gd2luZG93Lm5hdmlnYXRvcixcclxuICAgICAgICBicm93c2VyTGFuZ3VhZ2VQcm9wZXJ0eUtleXMgPSBbJ2xhbmd1YWdlJywgJ2Jyb3dzZXJMYW5ndWFnZScsICdzeXN0ZW1MYW5ndWFnZScsICd1c2VyTGFuZ3VhZ2UnXSxcclxuICAgICAgICBpLFxyXG4gICAgICAgIGxhbmd1YWdlO1xyXG5cclxuICAgIC8vIHN1cHBvcnQgZm9yIEhUTUwgNS4xIFwibmF2aWdhdG9yLmxhbmd1YWdlc1wiXHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShuYXYubGFuZ3VhZ2VzKSkge1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBuYXYubGFuZ3VhZ2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxhbmd1YWdlID0gbmF2Lmxhbmd1YWdlc1tpXTtcclxuICAgICAgICAgICAgaWYgKGxhbmd1YWdlICYmIGxhbmd1YWdlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxhbmd1YWdlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHN1cHBvcnQgZm9yIG90aGVyIHdlbGwga25vd24gcHJvcGVydGllcyBpbiBicm93c2Vyc1xyXG4gICAgZm9yIChpID0gMDsgaSA8IGJyb3dzZXJMYW5ndWFnZVByb3BlcnR5S2V5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxhbmd1YWdlID0gbmF2W2Jyb3dzZXJMYW5ndWFnZVByb3BlcnR5S2V5c1tpXV07XHJcbiAgICAgICAgaWYgKGxhbmd1YWdlICYmIGxhbmd1YWdlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbGFuZ3VhZ2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5leHBvcnQgY29uc3QgYW5hbFVzZXJBZ2VudCA9IGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgdW5rbm93biA9ICctJztcclxuXHJcbiAgICAvLyBzY3JlZW5cclxuICAgIGxldCBzY3JlZW5TaXplID0gJyc7XHJcbiAgICBpZiAoc2NyZWVuLndpZHRoKSB7XHJcbiAgICAgICAgbGV0IHdpZHRoID0gKHNjcmVlbi53aWR0aCkgPyBzY3JlZW4ud2lkdGggOiAnJztcclxuICAgICAgICBsZXQgaGVpZ2h0ID0gKHNjcmVlbi5oZWlnaHQpID8gc2NyZWVuLmhlaWdodCA6ICcnO1xyXG4gICAgICAgIHNjcmVlblNpemUgKz0gJycgKyB3aWR0aCArIFwiIHggXCIgKyBoZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYnJvd3NlclxyXG4gICAgbGV0IG5WZXIgPSBuYXZpZ2F0b3IuYXBwVmVyc2lvbjtcclxuICAgIGxldCBuQWd0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcclxuICAgIGxldCBicm93c2VyID0gbmF2aWdhdG9yLmFwcE5hbWU7XHJcbiAgICBsZXQgdmVyc2lvbiA9ICcnICsgcGFyc2VGbG9hdChuYXZpZ2F0b3IuYXBwVmVyc2lvbik7XHJcbiAgICBsZXQgbWFqb3JWZXJzaW9uID0gcGFyc2VJbnQobmF2aWdhdG9yLmFwcFZlcnNpb24sIDEwKTtcclxuICAgIGxldCBpc1dlYnZpZXcgPSBmYWxzZTtcclxuICAgIGxldCBuYW1lT2Zmc2V0LCB2ZXJPZmZzZXQsIGl4O1xyXG5cclxuICAgIC8vIE9wZXJhXHJcbiAgICBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignT3BlcmEnKSkgIT0gLTEpIHtcclxuICAgICAgICBicm93c2VyID0gJ09wZXJhJztcclxuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNik7XHJcbiAgICAgICAgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ1ZlcnNpb24nKSkgIT0gLTEpIHtcclxuICAgICAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIE9wZXJhIE5leHRcclxuICAgIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdPUFInKSkgIT0gLTEpIHtcclxuICAgICAgICBicm93c2VyID0gJ09wZXJhJztcclxuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNCk7XHJcbiAgICB9XHJcbiAgICAvL+yCvOyEsSDruIzrnbzsmrDsoIBcclxuICAgIGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ1NhbXN1bmdCcm93c2VyJykpICE9IC0xKSB7XHJcbiAgICAgICAgYnJvd3NlciA9ICdTYW1zdW5nQnJvd3Nlcic7XHJcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDE1KTtcclxuICAgIH1cclxuICAgIC8vIEVkZ2VcclxuICAgIGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ0VkZ2UnKSkgIT0gLTEpIHtcclxuICAgICAgICBicm93c2VyID0gJ01pY3Jvc29mdCBFZGdlJztcclxuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNSk7XHJcbiAgICB9XHJcbiAgICAvLyBNU0lFXHJcbiAgICBlbHNlIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdNU0lFJykpICE9IC0xKSB7XHJcbiAgICAgICAgYnJvd3NlciA9ICdNaWNyb3NvZnQgSW50ZXJuZXQgRXhwbG9yZXInO1xyXG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA1KTtcclxuXHJcblxyXG4gICAgICAgIC8vd2luNyBJRTExIHVzZXJBZ2VudCBpcyB1Z2x5Li4uLlxyXG4gICAgICAgIGlmKCAobkFndC5pbmRleE9mKCdUcmlkZW50LycpICE9PSAtMSkgJiYgKG5BZ3QuaW5kZXhPZigncnY6JykgIT09IC0xKSAgKXtcclxuICAgICAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKG5BZ3QuaW5kZXhPZigncnY6JykgKyAzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBDaHJvbWVcclxuICAgIGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ0Nocm9tZScpKSAhPSAtMSkge1xyXG4gICAgICAgIGJyb3dzZXIgPSAnQ2hyb21lJztcclxuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdDcmlPUycpKSAhPSAtMSkgeyAgIC8vaXBob25lIC0gY2hyb21lXHJcbiAgICAgICAgYnJvd3NlciA9ICdDaHJvbWUnO1xyXG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA2KTtcclxuICAgIH1cclxuICAgIC8vIEZpcmVmb3hcclxuICAgIGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ0ZpcmVmb3gnKSkgIT0gLTEpIHtcclxuICAgICAgICBicm93c2VyID0gJ0ZpcmVmb3gnO1xyXG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA4KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ0Z4aU9TJykpICE9IC0xKSB7XHJcbiAgICAgICAgYnJvd3NlciA9ICdGaXJlZm94JztcclxuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNik7XHJcbiAgICB9XHJcbiAgICAvLyBTYWZhcmlcclxuICAgIGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ1NhZmFyaScpKSAhPSAtMSkge1xyXG4gICAgICAgIGJyb3dzZXIgPSAnU2FmYXJpJztcclxuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNyk7XHJcbiAgICAgICAgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ1ZlcnNpb24nKSkgIT0gLTEpIHtcclxuICAgICAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gTVNJRSAxMStcclxuICAgIGVsc2UgaWYgKG5BZ3QuaW5kZXhPZignVHJpZGVudC8nKSAhPT0gLTEpIHtcclxuICAgICAgICBicm93c2VyID0gJ01pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3Jlcic7XHJcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKG5BZ3QuaW5kZXhPZigncnY6JykgKyAzKTtcclxuICAgIH1cclxuICAgIC8vIE90aGVyIGJyb3dzZXJzXHJcbiAgICBlbHNlIGlmICgobmFtZU9mZnNldCA9IG5BZ3QubGFzdEluZGV4T2YoJyAnKSArIDEpIDwgKHZlck9mZnNldCA9IG5BZ3QubGFzdEluZGV4T2YoJy8nKSkpIHtcclxuICAgICAgICBicm93c2VyID0gbkFndC5zdWJzdHJpbmcobmFtZU9mZnNldCwgdmVyT2Zmc2V0KTtcclxuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgMSk7XHJcbiAgICAgICAgaWYgKGJyb3dzZXIudG9Mb3dlckNhc2UoKSA9PSBicm93c2VyLnRvVXBwZXJDYXNlKCkpIHtcclxuICAgICAgICAgICAgYnJvd3NlciA9IG5hdmlnYXRvci5hcHBOYW1lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmKG5BZ3QuaW5kZXhPZignIHd2JykgPiAwKXtcclxuICAgICAgICBpc1dlYnZpZXcgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgLy8gdHJpbSB0aGUgdmVyc2lvbiBzdHJpbmdcclxuICAgIGlmICgoaXggPSB2ZXJzaW9uLmluZGV4T2YoJzsnKSkgIT0gLTEpIHZlcnNpb24gPSB2ZXJzaW9uLnN1YnN0cmluZygwLCBpeCk7XHJcbiAgICBpZiAoKGl4ID0gdmVyc2lvbi5pbmRleE9mKCcgJykpICE9IC0xKSB2ZXJzaW9uID0gdmVyc2lvbi5zdWJzdHJpbmcoMCwgaXgpO1xyXG4gICAgaWYgKChpeCA9IHZlcnNpb24uaW5kZXhPZignKScpKSAhPSAtMSkgdmVyc2lvbiA9IHZlcnNpb24uc3Vic3RyaW5nKDAsIGl4KTtcclxuXHJcbiAgICBtYWpvclZlcnNpb24gPSBwYXJzZUludCgnJyArIHZlcnNpb24sIDEwKTtcclxuICAgIGlmIChpc05hTihtYWpvclZlcnNpb24pKSB7XHJcbiAgICAgICAgdmVyc2lvbiA9ICcnICsgcGFyc2VGbG9hdChuYXZpZ2F0b3IuYXBwVmVyc2lvbik7XHJcbiAgICAgICAgbWFqb3JWZXJzaW9uID0gcGFyc2VJbnQobmF2aWdhdG9yLmFwcFZlcnNpb24sIDEwKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBtb2JpbGUgdmVyc2lvblxyXG4gICAgdmFyIG1vYmlsZSA9IC9Nb2JpbGV8bWluaXxGZW5uZWN8QW5kcm9pZHxpUChhZHxvZHxob25lKS8udGVzdChuVmVyKTtcclxuXHJcbiAgICAvLyBjb29raWVcclxuICAgIHZhciBjb29raWVFbmFibGVkID0gKG5hdmlnYXRvci5jb29raWVFbmFibGVkKSA/IHRydWUgOiBmYWxzZTtcclxuXHJcbiAgICBpZiAodHlwZW9mIG5hdmlnYXRvci5jb29raWVFbmFibGVkID09ICd1bmRlZmluZWQnICYmICFjb29raWVFbmFibGVkKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gJ3Rlc3Rjb29raWUnO1xyXG4gICAgICAgIGNvb2tpZUVuYWJsZWQgPSAoZG9jdW1lbnQuY29va2llLmluZGV4T2YoJ3Rlc3Rjb29raWUnKSAhPSAtMSkgPyB0cnVlIDogZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc3lzdGVtXHJcbiAgICB2YXIgb3MgPSB1bmtub3duO1xyXG4gICAgdmFyIGNsaWVudFN0cmluZ3MgPSBbXHJcbiAgICAgICAge3M6J1dpbmRvd3MgMTAnLCByOi8oV2luZG93cyAxMC4wfFdpbmRvd3MgTlQgMTAuMCkvfSxcclxuICAgICAgICB7czonV2luZG93cyA4LjEnLCByOi8oV2luZG93cyA4LjF8V2luZG93cyBOVCA2LjMpL30sXHJcbiAgICAgICAge3M6J1dpbmRvd3MgOCcsIHI6LyhXaW5kb3dzIDh8V2luZG93cyBOVCA2LjIpL30sXHJcbiAgICAgICAge3M6J1dpbmRvd3MgNycsIHI6LyhXaW5kb3dzIDd8V2luZG93cyBOVCA2LjEpL30sXHJcbiAgICAgICAge3M6J1dpbmRvd3MgVmlzdGEnLCByOi9XaW5kb3dzIE5UIDYuMC99LFxyXG4gICAgICAgIHtzOidXaW5kb3dzIFNlcnZlciAyMDAzJywgcjovV2luZG93cyBOVCA1LjIvfSxcclxuICAgICAgICB7czonV2luZG93cyBYUCcsIHI6LyhXaW5kb3dzIE5UIDUuMXxXaW5kb3dzIFhQKS99LFxyXG4gICAgICAgIHtzOidXaW5kb3dzIDIwMDAnLCByOi8oV2luZG93cyBOVCA1LjB8V2luZG93cyAyMDAwKS99LFxyXG4gICAgICAgIHtzOidXaW5kb3dzIE1FJywgcjovKFdpbiA5eCA0LjkwfFdpbmRvd3MgTUUpL30sXHJcbiAgICAgICAge3M6J1dpbmRvd3MgOTgnLCByOi8oV2luZG93cyA5OHxXaW45OCkvfSxcclxuICAgICAgICB7czonV2luZG93cyA5NScsIHI6LyhXaW5kb3dzIDk1fFdpbjk1fFdpbmRvd3NfOTUpL30sXHJcbiAgICAgICAge3M6J1dpbmRvd3MgTlQgNC4wJywgcjovKFdpbmRvd3MgTlQgNC4wfFdpbk5UNC4wfFdpbk5UfFdpbmRvd3MgTlQpL30sXHJcbiAgICAgICAge3M6J1dpbmRvd3MgQ0UnLCByOi9XaW5kb3dzIENFL30sXHJcbiAgICAgICAge3M6J1dpbmRvd3MgMy4xMScsIHI6L1dpbjE2L30sXHJcbiAgICAgICAge3M6J0FuZHJvaWQnLCByOi9BbmRyb2lkL30sXHJcbiAgICAgICAge3M6J09wZW4gQlNEJywgcjovT3BlbkJTRC99LFxyXG4gICAgICAgIHtzOidTdW4gT1MnLCByOi9TdW5PUy99LFxyXG4gICAgICAgIHtzOidMaW51eCcsIHI6LyhMaW51eHxYMTEpL30sXHJcbiAgICAgICAge3M6J2lPUycsIHI6LyhpUGhvbmV8aVBhZHxpUG9kKS99LFxyXG4gICAgICAgIHtzOidNYWMgT1MgWEknLCByOi9NYWMgT1MgWCAxMS99LFxyXG4gICAgICAgIHtzOidNYWMgT1MgWCcsIHI6L01hYyBPUyBYIDEwL30sXHJcbiAgICAgICAge3M6J01hYyBPUycsIHI6LyhNYWNQUEN8TWFjSW50ZWx8TWFjX1Bvd2VyUEN8TWFjaW50b3NoKS99LFxyXG4gICAgICAgIHtzOidRTlgnLCByOi9RTlgvfSxcclxuICAgICAgICB7czonVU5JWCcsIHI6L1VOSVgvfSxcclxuICAgICAgICB7czonQmVPUycsIHI6L0JlT1MvfSxcclxuICAgICAgICB7czonT1MvMicsIHI6L09TXFwvMi99LFxyXG4gICAgICAgIHtzOidTZWFyY2ggQm90JywgcjovKG51aGt8R29vZ2xlYm90fFlhbW15Ym90fE9wZW5ib3R8U2x1cnB8TVNOQm90fEFzayBKZWV2ZXNcXC9UZW9tYXxpYV9hcmNoaXZlcikvfVxyXG4gICAgXTtcclxuICAgIGZvciAodmFyIGlkIGluIGNsaWVudFN0cmluZ3MpIHtcclxuICAgICAgICB2YXIgY3MgPSBjbGllbnRTdHJpbmdzW2lkXTtcclxuICAgICAgICBpZiAoY3Muci50ZXN0KG5BZ3QpKSB7XHJcbiAgICAgICAgICAgIG9zID0gY3MucztcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBvc1ZlcnNpb24gPSB1bmtub3duO1xyXG5cclxuICAgIGlmICgvV2luZG93cy8udGVzdChvcykpIHtcclxuICAgICAgICBvc1ZlcnNpb24gPSAvV2luZG93cyAoLiopLy5leGVjKG9zKVsxXTtcclxuICAgICAgICBvcyA9ICdXaW5kb3dzJztcclxuICAgIH1cclxuXHJcbiAgICBzd2l0Y2ggKG9zKSB7XHJcbiAgICAgICAgY2FzZSAnTWFjIE9TIFhJJzpcclxuICAgICAgICAgICAgb3NWZXJzaW9uID0gL01hYyBPUyBYICgxMVtcXC5cXF9cXGRdKykvLmV4ZWMobkFndClbMV07XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlICdNYWMgT1MgWCc6XHJcbiAgICAgICAgICAgIG9zVmVyc2lvbiA9IC9NYWMgT1MgWCAoMTBbXFwuXFxfXFxkXSspLy5leGVjKG5BZ3QpWzFdO1xyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSAnQW5kcm9pZCc6XHJcbiAgICAgICAgICAgIG9zVmVyc2lvbiA9IC9BbmRyb2lkIChbXFwuXFxfXFxkXSspLy5leGVjKG5BZ3QpWzFdO1xyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSAnaU9TJzpcclxuICAgICAgICAgICAgb3NWZXJzaW9uID0gL09TIChcXGQrKV8oXFxkKylfPyhcXGQrKT8vLmV4ZWMoblZlcik7XHJcbiAgICAgICAgICAgIG9zVmVyc2lvbiA9IG9zVmVyc2lvblsxXSArICcuJyArIG9zVmVyc2lvblsyXSArICcuJyArIChvc1ZlcnNpb25bM10gfCAwKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBzY3JlZW46IHNjcmVlblNpemUsXHJcbiAgICAgICAgYnJvd3NlcjogYnJvd3NlcixcclxuICAgICAgICBicm93c2VyVmVyc2lvbjogdmVyc2lvbixcclxuICAgICAgICBicm93c2VyTWFqb3JWZXJzaW9uOiBtYWpvclZlcnNpb24sXHJcbiAgICAgICAgbW9iaWxlOiBtb2JpbGUsXHJcbiAgICAgICAgdWEgOiBuQWd0LFxyXG4gICAgICAgIG9zOiBvcyxcclxuICAgICAgICBvc1ZlcnNpb246IG9zVmVyc2lvbixcclxuICAgICAgICBjb29raWVzOiBjb29raWVFbmFibGVkXHJcbiAgICB9O1xyXG59O1xyXG4iLCIvKipcclxuICogQ29weXJpZ2h0IDIwMTMgdnR0LmpzIENvbnRyaWJ1dG9yc1xyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5sZXQgVlRUQ3VlID0gd2luZG93LlZUVEN1ZTtcclxuXHJcbnZhciBhdXRvS2V5d29yZCA9IFwiYXV0b1wiO1xyXG52YXIgZGlyZWN0aW9uU2V0dGluZyA9IHtcclxuICAgIFwiXCI6IHRydWUsXHJcbiAgICBcImxyXCI6IHRydWUsXHJcbiAgICBcInJsXCI6IHRydWVcclxufTtcclxudmFyIGFsaWduU2V0dGluZyA9IHtcclxuICAgIFwic3RhcnRcIjogdHJ1ZSxcclxuICAgIFwibWlkZGxlXCI6IHRydWUsXHJcbiAgICBcImVuZFwiOiB0cnVlLFxyXG4gICAgXCJsZWZ0XCI6IHRydWUsXHJcbiAgICBcInJpZ2h0XCI6IHRydWVcclxufTtcclxuXHJcbmZ1bmN0aW9uIGZpbmREaXJlY3Rpb25TZXR0aW5nKHZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdmFyIGRpciA9IGRpcmVjdGlvblNldHRpbmdbdmFsdWUudG9Mb3dlckNhc2UoKV07XHJcbiAgICByZXR1cm4gZGlyID8gdmFsdWUudG9Mb3dlckNhc2UoKSA6IGZhbHNlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmaW5kQWxpZ25TZXR0aW5nKHZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdmFyIGFsaWduID0gYWxpZ25TZXR0aW5nW3ZhbHVlLnRvTG93ZXJDYXNlKCldO1xyXG4gICAgcmV0dXJuIGFsaWduID8gdmFsdWUudG9Mb3dlckNhc2UoKSA6IGZhbHNlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBleHRlbmQob2JqKSB7XHJcbiAgICB2YXIgaSA9IDE7XHJcbiAgICBmb3IgKDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBjb2JqID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gY29iaikge1xyXG4gICAgICAgICAgICBvYmpbcF0gPSBjb2JqW3BdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb2JqO1xyXG59XHJcbmlmKCFWVFRDdWUpe1xyXG4gICAgVlRUQ3VlID0gZnVuY3Rpb24gKHN0YXJ0VGltZSwgZW5kVGltZSwgdGV4dCkge1xyXG4gICAgICAgIHZhciBjdWUgPSB0aGlzO1xyXG4gICAgICAgIHZhciBpc0lFOCA9ICgvTVNJRVxcczhcXC4wLykudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcclxuICAgICAgICB2YXIgYmFzZU9iaiA9IHt9O1xyXG5cclxuICAgICAgICBpZiAoaXNJRTgpIHtcclxuICAgICAgICAgICAgY3VlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY3VzdG9tJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYmFzZU9iai5lbnVtZXJhYmxlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNoaW0gaW1wbGVtZW50YXRpb24gc3BlY2lmaWMgcHJvcGVydGllcy4gVGhlc2UgcHJvcGVydGllcyBhcmUgbm90IGluXHJcbiAgICAgICAgICogdGhlIHNwZWMuXHJcbiAgICAgICAgICovXHJcblxyXG4gICAgICAgICAgICAvLyBMZXRzIHVzIGtub3cgd2hlbiB0aGUgVlRUQ3VlJ3MgZGF0YSBoYXMgY2hhbmdlZCBpbiBzdWNoIGEgd2F5IHRoYXQgd2UgbmVlZFxyXG4gICAgICAgICAgICAvLyB0byByZWNvbXB1dGUgaXRzIGRpc3BsYXkgc3RhdGUuIFRoaXMgbGV0cyB1cyBjb21wdXRlIGl0cyBkaXNwbGF5IHN0YXRlXHJcbiAgICAgICAgICAgIC8vIGxhemlseS5cclxuICAgICAgICBjdWUuaGFzQmVlblJlc2V0ID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFZUVEN1ZSBhbmQgVGV4dFRyYWNrQ3VlIHByb3BlcnRpZXNcclxuICAgICAgICAgKiBodHRwOi8vZGV2LnczLm9yZy9odG1sNS93ZWJ2dHQvI3Z0dGN1ZS1pbnRlcmZhY2VcclxuICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgdmFyIF9pZCA9IFwiXCI7XHJcbiAgICAgICAgdmFyIF9wYXVzZU9uRXhpdCA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBfc3RhcnRUaW1lID0gc3RhcnRUaW1lO1xyXG4gICAgICAgIHZhciBfZW5kVGltZSA9IGVuZFRpbWU7XHJcbiAgICAgICAgdmFyIF90ZXh0ID0gdGV4dDtcclxuICAgICAgICB2YXIgX3JlZ2lvbiA9IG51bGw7XHJcbiAgICAgICAgdmFyIF92ZXJ0aWNhbCA9IFwiXCI7XHJcbiAgICAgICAgdmFyIF9zbmFwVG9MaW5lcyA9IHRydWU7XHJcbiAgICAgICAgdmFyIF9saW5lID0gXCJhdXRvXCI7XHJcbiAgICAgICAgdmFyIF9saW5lQWxpZ24gPSBcInN0YXJ0XCI7XHJcbiAgICAgICAgdmFyIF9wb3NpdGlvbiA9IDUwO1xyXG4gICAgICAgIHZhciBfcG9zaXRpb25BbGlnbiA9IFwibWlkZGxlXCI7XHJcbiAgICAgICAgdmFyIF9zaXplID0gNTA7XHJcbiAgICAgICAgdmFyIF9hbGlnbiA9IFwibWlkZGxlXCI7XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXHJcbiAgICAgICAgICAgIFwiaWRcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfaWQ7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9pZCA9IFwiXCIgKyB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxyXG4gICAgICAgICAgICBcInBhdXNlT25FeGl0XCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3BhdXNlT25FeGl0O1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBfcGF1c2VPbkV4aXQgPSAhIXZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXHJcbiAgICAgICAgICAgIFwic3RhcnRUaW1lXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3N0YXJ0VGltZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3RhcnQgdGltZSBtdXN0IGJlIHNldCB0byBhIG51bWJlci5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF9zdGFydFRpbWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcclxuICAgICAgICAgICAgXCJlbmRUaW1lXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2VuZFRpbWU7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkVuZCB0aW1lIG11c3QgYmUgc2V0IHRvIGEgbnVtYmVyLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgX2VuZFRpbWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcclxuICAgICAgICAgICAgXCJ0ZXh0XCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RleHQ7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90ZXh0ID0gXCJcIiArIHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxyXG4gICAgICAgICAgICBcInJlZ2lvblwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZWdpb247XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9yZWdpb24gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcclxuICAgICAgICAgICAgXCJ2ZXJ0aWNhbFwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92ZXJ0aWNhbDtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNldHRpbmcgPSBmaW5kRGlyZWN0aW9uU2V0dGluZyh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSGF2ZSB0byBjaGVjayBmb3IgZmFsc2UgYmVjYXVzZSB0aGUgc2V0dGluZyBhbiBiZSBhbiBlbXB0eSBzdHJpbmcuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNldHRpbmcgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihcIkFuIGludmFsaWQgb3IgaWxsZWdhbCBzdHJpbmcgd2FzIHNwZWNpZmllZC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF92ZXJ0aWNhbCA9IHNldHRpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXHJcbiAgICAgICAgICAgIFwic25hcFRvTGluZXNcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfc25hcFRvTGluZXM7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9zbmFwVG9MaW5lcyA9ICEhdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXHJcbiAgICAgICAgICAgIFwibGluZVwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9saW5lO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm51bWJlclwiICYmIHZhbHVlICE9PSBhdXRvS2V5d29yZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJBbiBpbnZhbGlkIG51bWJlciBvciBpbGxlZ2FsIHN0cmluZyB3YXMgc3BlY2lmaWVkLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgX2xpbmUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcclxuICAgICAgICAgICAgXCJsaW5lQWxpZ25cIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfbGluZUFsaWduO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2V0dGluZyA9IGZpbmRBbGlnblNldHRpbmcodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghc2V0dGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJBbiBpbnZhbGlkIG9yIGlsbGVnYWwgc3RyaW5nIHdhcyBzcGVjaWZpZWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBfbGluZUFsaWduID0gc2V0dGluZztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcclxuICAgICAgICAgICAgXCJwb3NpdGlvblwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlIDwgMCB8fCB2YWx1ZSA+IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQb3NpdGlvbiBtdXN0IGJlIGJldHdlZW4gMCBhbmQgMTAwLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgX3Bvc2l0aW9uID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXHJcbiAgICAgICAgICAgIFwicG9zaXRpb25BbGlnblwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9wb3NpdGlvbkFsaWduO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2V0dGluZyA9IGZpbmRBbGlnblNldHRpbmcodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghc2V0dGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJBbiBpbnZhbGlkIG9yIGlsbGVnYWwgc3RyaW5nIHdhcyBzcGVjaWZpZWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBfcG9zaXRpb25BbGlnbiA9IHNldHRpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXHJcbiAgICAgICAgICAgIFwic2l6ZVwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9zaXplO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPCAwIHx8IHZhbHVlID4gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlNpemUgbXVzdCBiZSBiZXR3ZWVuIDAgYW5kIDEwMC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF9zaXplID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXHJcbiAgICAgICAgICAgIFwiYWxpZ25cIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfYWxpZ247XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZXR0aW5nID0gZmluZEFsaWduU2V0dGluZyh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzZXR0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihcIkFuIGludmFsaWQgb3IgaWxsZWdhbCBzdHJpbmcgd2FzIHNwZWNpZmllZC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF9hbGlnbiA9IHNldHRpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE90aGVyIDx0cmFjaz4gc3BlYyBkZWZpbmVkIHByb3BlcnRpZXNcclxuICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgICAgIC8vIGh0dHA6Ly93d3cud2hhdHdnLm9yZy9zcGVjcy93ZWItYXBwcy9jdXJyZW50LXdvcmsvbXVsdGlwYWdlL3RoZS12aWRlby1lbGVtZW50Lmh0bWwjdGV4dC10cmFjay1jdWUtZGlzcGxheS1zdGF0ZVxyXG4gICAgICAgIGN1ZS5kaXNwbGF5U3RhdGUgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIGlmIChpc0lFOCkge1xyXG4gICAgICAgICAgICByZXR1cm4gY3VlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFZUVEN1ZSBtZXRob2RzXHJcbiAgICAgKi9cclxuXHJcbiAgICBWVFRDdWUucHJvdG90eXBlLmdldEN1ZUFzSFRNTCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIEFzc3VtZSBXZWJWVFQuY29udmVydEN1ZVRvRE9NVHJlZSBpcyBvbiB0aGUgZ2xvYmFsLlxyXG4gICAgICAgIHJldHVybiBXZWJWVFQuY29udmVydEN1ZVRvRE9NVHJlZSh3aW5kb3csIHRoaXMudGV4dCk7XHJcbiAgICB9O1xyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZUVEN1ZTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDIzLi5cclxuICovXHJcbmltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgSXQgd2FzIHJlcGxhY2UganF1ZXJ5J3Mgc2VsZWN0b3IuIEl0IE9mdGVuIHVzZWQgYnkgT3ZlblRlbXBsYXRlLiAoL3ZpZXcvZW5naW5lL092ZW5UZW1wbGF0ZS5qcylcclxuICogQHBhcmFtICAgc2VsZWN0b3JPckVsZW1lbnQgIHN0cmluZyBvciBlbGVtZW50XHJcbiAqXHJcbiAqICovXHJcblxyXG5cclxuY29uc3QgTGEkID0gZnVuY3Rpb24oc2VsZWN0b3JPckVsZW1lbnQpe1xyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG4gICAgY29uc3QgcmV0dXJuTm9kZSA9IGZ1bmN0aW9uKCRlbGVtZW50ICwgc2VsZWN0b3Ipe1xyXG4gICAgICAgIGxldCBub2RlTGlzdCA9ICAkZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxuICAgICAgICBpZihub2RlTGlzdC5sZW5ndGggPiAxKXtcclxuICAgICAgICAgICAgcmV0dXJuIG5vZGVMaXN0O1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gbm9kZUxpc3RbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgbGV0ICRlbGVtZW50ID0gXCJcIjtcclxuXHJcbiAgICBpZiggXy5pc0VsZW1lbnQoc2VsZWN0b3JPckVsZW1lbnQpIHx8IF8uZXZlcnkoc2VsZWN0b3JPckVsZW1lbnQsIGZ1bmN0aW9uKGl0ZW0pe3JldHVybiBfLmlzRWxlbWVudChpdGVtKX0pKXtcclxuICAgICAgICAkZWxlbWVudCA9IHNlbGVjdG9yT3JFbGVtZW50O1xyXG4gICAgfWVsc2UgaWYoc2VsZWN0b3JPckVsZW1lbnQgPT09IFwiZG9jdW1lbnRcIil7XHJcbiAgICAgICAgJGVsZW1lbnQgPSBkb2N1bWVudDtcclxuICAgIH1lbHNlIGlmKHNlbGVjdG9yT3JFbGVtZW50ID09PSBcIndpbmRvd1wiKXtcclxuICAgICAgICAkZWxlbWVudCA9IHdpbmRvdztcclxuICAgIH1lbHNle1xyXG4gICAgICAgICRlbGVtZW50ID0gcmV0dXJuTm9kZShkb2N1bWVudCwgc2VsZWN0b3JPckVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBpZighJGVsZW1lbnQpe1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qRUZGRUNUUyovXHJcblxyXG4gICAgdGhhdC5zaG93ID0gKCkgPT57XHJcbiAgICAgICAgJGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuaGlkZSA9ICgpID0+e1xyXG4gICAgICAgICRlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qRUxFTUVOVFMqL1xyXG5cclxuICAgIHRoYXQuYWRkQ2xhc3MgPSAobmFtZSkgPT57XHJcbiAgICAgICAgaWYoJGVsZW1lbnQuY2xhc3NMaXN0KXtcclxuICAgICAgICAgICAgJGVsZW1lbnQuY2xhc3NMaXN0LmFkZChuYW1lKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgbGV0IGNsYXNzTmFtZXMgPSAkZWxlbWVudC5jbGFzc05hbWUuc3BsaXQoXCIgXCIpO1xyXG4gICAgICAgICAgICBpZihjbGFzc05hbWVzLmluZGV4T2YobmFtZSkgPT09IC0xKXtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTmFtZSArPSBcIiBcIiArIG5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuYWZ0ZXIgPSAoaHRtbFN0cmluZykgPT4ge1xyXG4gICAgICAgICRlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJlbmQnLCBodG1sU3RyaW5nKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5hcHBlbmQgPSAoaHRtbFN0cmluZykgPT4ge1xyXG4gICAgICAgICRlbGVtZW50LmFwcGVuZENoaWxkKGh0bWxTdHJpbmcpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmJlZm9yZSA9IChodG1sU3RyaW5nKSA9PiB7XHJcbiAgICAgICAgJGVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmViZWdpbicsIGh0bWxTdHJpbmcpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmNoaWxkcmVuID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiAkZWxlbWVudC5jaGlsZHJlbiB8fCBbXTtcclxuICAgIH07XHJcblxyXG4gICAgLy9UaGUgY29udGFpbnMoKSBtZXRob2QgcmV0dXJucyBhIEJvb2xlYW4gdmFsdWUgaW5kaWNhdGluZyB3aGV0aGVyIGEgbm9kZSBpcyBhIGRlc2NlbmRhbnQgb2YgYSBzcGVjaWZpZWQgbm9kZS5cclxuICAgIC8vQSBkZXNjZW5kYW50IGNhbiBiZSBhIGNoaWxkLCBncmFuZGNoaWxkLCBncmVhdC1ncmFuZGNoaWxkLCBhbmQgc28gb24uXHJcbiAgICB0aGF0LmNvbnRhaW5zID0gKGVsQ2hpbGQpID0+IHtcclxuICAgICAgICByZXR1cm4gJGVsZW1lbnQgIT09IGVsQ2hpbGQgJiYgJGVsZW1lbnQuY29udGFpbnMoZWxDaGlsZCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZW1wdHkgPSAoKSA9PiB7XHJcbiAgICAgICAgJGVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoYXQuZmluZCA9IChzZWxlY3RvcikgPT57XHJcbiAgICAgICAgcmV0dXJuIExhJChyZXR1cm5Ob2RlKCRlbGVtZW50LCBzZWxlY3RvcikpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmNzcyA9IChuYW1lLCB2YWx1ZSkgPT4ge1xyXG4gICAgICAgIGlmKHZhbHVlKXtcclxuICAgICAgICAgICAgaWYoJGVsZW1lbnQubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGVbbmFtZV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuc3R5bGVbbmFtZV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gJGVsZW1lbnQuc3R5bGVbbmFtZV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG5cclxuXHJcbiAgICB0aGF0LnJlbW92ZUNsYXNzID0gKG5hbWUpID0+e1xyXG4gICAgICAgIGlmICgkZWxlbWVudC5jbGFzc0xpc3Qpe1xyXG4gICAgICAgICAgICAkZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKG5hbWUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAkZWxlbWVudC5jbGFzc05hbWUgPSAkZWxlbWVudC5jbGFzc05hbWUucmVwbGFjZShuZXcgUmVnRXhwKCcoXnxcXFxcYiknICsgbmFtZS5zcGxpdCgnICcpLmpvaW4oJ3wnKSArICcoXFxcXGJ8JCknLCAnZ2knKSwgJyAnKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnJlbW92ZUF0dHJpYnV0ZSA9IChhdHRyTmFtZSkgPT4ge1xyXG4gICAgICAgICRlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShhdHRyTmFtZSk7XHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgLyp0aGF0LmFwcGVuZCA9IChodG1sQ29kZSkgPT57XHJcbiAgICAgICAgJGVsZW1lbnQuaW5uZXJIVE1MICs9IGh0bWxDb2RlO1xyXG4gICAgfTsqL1xyXG5cclxuICAgIHRoYXQudGV4dCA9ICh0ZXh0KSA9PiB7IC8vSUU4K1xyXG4gICAgICAgIGlmKHRleHQgPT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybiAkZWxlbWVudC50ZXh0Q29udGVudDtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgJGVsZW1lbnQudGV4dENvbnRlbnQgPSB0ZXh0O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aGF0Lmh0bWwgPSAoaHRtbFN0cmluZykgPT4ge1xyXG4gICAgICAgICRlbGVtZW50LmlubmVySFRNTCA9IGh0bWxTdHJpbmc7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5oYXNDbGFzcyA9IChuYW1lKSA9PiB7IC8vSUU4K1xyXG4gICAgICAgIGlmKCRlbGVtZW50LmNsYXNzTGlzdCl7XHJcbiAgICAgICAgICAgIHJldHVybiAkZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMobmFtZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVnRXhwKCcoXnwgKScgKyBuYW1lICsgJyggfCQpJywgJ2dpJykudGVzdCgkZWxlbWVudC5uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuaXMgPSAoJHRhcmdldEVsZW1lbnQpID0+IHtcclxuICAgICAgICAvKnZhciBtYXRjaGVzID0gZnVuY3Rpb24oZWwsIHNlbGVjdG9yKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoZWwubWF0Y2hlcyB8fCBlbC5tYXRjaGVzU2VsZWN0b3IgfHwgZWwubXNNYXRjaGVzU2VsZWN0b3IgfHwgZWwubW96TWF0Y2hlc1NlbGVjdG9yIHx8IGVsLndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fCBlbC5vTWF0Y2hlc1NlbGVjdG9yKS5jYWxsKGVsLCBzZWxlY3Rvcik7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbWF0Y2hlcyhlbCwgJy5teS1jbGFzcycpOyovXHJcbiAgICAgICAgcmV0dXJuICRlbGVtZW50ID09PSAkdGFyZ2V0RWxlbWVudDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5vZmZzZXQgPSAoKSA9PnsgICAgLy9JRTgrXHJcbiAgICAgICAgdmFyIHJlY3QgPSAkZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdG9wOiByZWN0LnRvcCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wLFxyXG4gICAgICAgICAgICBsZWZ0OiByZWN0LmxlZnQgKyBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnRcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQud2lkdGggPSAoKSA9PiB7ICAgIC8vSUU4K1xyXG4gICAgICAgIHJldHVybiAkZWxlbWVudC5jbGllbnRXaWR0aDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5oZWlnaHQgPSAoKSA9PiB7ICAgLy9JRTgrXHJcbiAgICAgICAgcmV0dXJuICRlbGVtZW50LmNsaWVudEhlaWdodDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5hdHRyID0gKGF0dHIpID0+IHtcclxuICAgICAgICByZXR1cm4gJGVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHIpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnJlcGxhY2UgPSAoaHRtbCkgPT4ge1xyXG4gICAgICAgICRlbGVtZW50LnJlcGxhY2VXaXRoKGh0bWwpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhhdC5yZW1vdmUgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoJGVsZW1lbnQubGVuZ3RoID4gMSl7XHJcbiAgICAgICAgICAgICRlbGVtZW50LnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoJGVsZW1lbnQpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAkZWxlbWVudC5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LnJlbW92ZUNoaWxkID0gKGVsZW1lbnQpID0+IHtcclxuICAgICAgICBpZihlbGVtZW50KXtcclxuICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHdoaWxlICgkZWxlbWVudC5oYXNDaGlsZE5vZGVzKCkpIHtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZUNoaWxkKCRlbGVtZW50LmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXQgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICRlbGVtZW50O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmNsb3Nlc3QgPSAoc2VsZWN0b3JTdHJpbmcpID0+IHtcclxuICAgICAgICBsZXQgY2xvc2VzdEVsZW1lbnQgPSAkZWxlbWVudC5jbG9zZXN0KHNlbGVjdG9yU3RyaW5nKTtcclxuICAgICAgICBpZihjbG9zZXN0RWxlbWVudCl7XHJcbiAgICAgICAgICAgIHJldHVybiBMYSQoY2xvc2VzdEVsZW1lbnQpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGEkO1xyXG4iLCJpbXBvcnQgXyBmcm9tICcuL3VuZGVyc2NvcmUnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRyaW0oc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gc3RyaW5nID8gc3RyaW5nLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKSA6IFwiXCI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBleHRyYWN0RXh0ZW5zaW9uXHJcbiAqXHJcbiAqIEBwYXJhbSAgICAgIHtzdHJpbmd9IHBhdGggZm9yIHVybFxyXG4gKiBAcmV0dXJuICAgICB7c3RyaW5nfSAgRXh0ZW5zaW9uXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZXh0cmFjdEV4dGVuc2lvbiA9IGZ1bmN0aW9uKHBhdGgpIHtcclxuICAgIGlmKCFwYXRoIHx8IHBhdGguc3Vic3RyKDAsNCk9PSdydG1wJykge1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZ2V0QXp1cmVGaWxlRm9ybWF0KHBhdGgpIHtcclxuICAgICAgICBsZXQgZXh0ZW5zaW9uID0gXCJcIjtcclxuICAgICAgICBpZiAoKC9bKCxdZm9ybWF0PW1wZC0vaSkudGVzdChwYXRoKSkge1xyXG4gICAgICAgICAgICBleHRlbnNpb24gPSAnbXBkJztcclxuICAgICAgICB9ZWxzZSBpZiAoKC9bKCxdZm9ybWF0PW0zdTgtL2kpLnRlc3QocGF0aCkpIHtcclxuICAgICAgICAgICAgZXh0ZW5zaW9uID0gJ20zdTgnO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZXh0ZW5zaW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBhenVyZWRGb3JtYXQgPSBnZXRBenVyZUZpbGVGb3JtYXQocGF0aCk7XHJcbiAgICBpZihhenVyZWRGb3JtYXQpIHtcclxuICAgICAgICByZXR1cm4gYXp1cmVkRm9ybWF0O1xyXG4gICAgfVxyXG4gICAgcGF0aCA9IHBhdGguc3BsaXQoJz8nKVswXS5zcGxpdCgnIycpWzBdO1xyXG4gICAgaWYocGF0aC5sYXN0SW5kZXhPZignLicpID4gLTEpIHtcclxuICAgICAgICByZXR1cm4gcGF0aC5zdWJzdHIocGF0aC5sYXN0SW5kZXhPZignLicpICsgMSwgcGF0aC5sZW5ndGgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxufTtcclxuXHJcblxyXG4vKipcclxuICogbmF0dXJhbEhtc1xyXG4gKlxyXG4gKiBAcGFyYW0gICAgICB7bnVtYmVyIHwgc3RyaW5nfSAgc2Vjb25kICBUaGUgc2Vjb25kXHJcbiAqIEByZXR1cm4gICAgIHtzdHJpbmd9ICBmb3JtYXR0ZWQgU3RyaW5nXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbmF0dXJhbEhtcyhzZWNvbmQpIHtcclxuICAgIGxldCBzZWNOdW0gPSBwYXJzZUludChzZWNvbmQsIDEwKTtcclxuICAgIGlmKCFzZWNvbmQpe1xyXG4gICAgICAgIHJldHVybiBcIjAwOjAwXCI7XHJcbiAgICB9XHJcbiAgICBsZXQgaG91cnMgICA9IE1hdGguZmxvb3Ioc2VjTnVtIC8gMzYwMCk7XHJcbiAgICBsZXQgbWludXRlcyA9IE1hdGguZmxvb3IoKHNlY051bSAtIChob3VycyAqIDM2MDApKSAvIDYwKTtcclxuICAgIGxldCBzZWNvbmRzID0gc2VjTnVtIC0gKGhvdXJzICogMzYwMCkgLSAobWludXRlcyAqIDYwKTtcclxuXHJcbiAgICAvL2lmIChob3VycyA+IDApIHttaW51dGVzID0gXCIwXCIrbWludXRlczt9XHJcbiAgICBpZiAobWludXRlcyA8IDEwKSB7bWludXRlcyA9IFwiMFwiK21pbnV0ZXM7fVxyXG4gICAgaWYgKHNlY29uZHMgPCAxMCkge3NlY29uZHMgPSBcIjBcIitzZWNvbmRzO31cclxuXHJcbiAgICBpZiAoaG91cnMgPiAwKSB7XHJcbiAgICAgICAgcmV0dXJuIGhvdXJzKyc6JyttaW51dGVzKyc6JytzZWNvbmRzO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gbWludXRlcysnOicrc2Vjb25kcztcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBobXNUb1NlY29uZChzdHIsIGZyYW1lUmF0ZSkge1xyXG4gICAgaWYoIXN0cikge1xyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gICAgaWYoXy5pc051bWJlcihzdHIpICYmICFfLmlzTmFOKHN0cikpe1xyXG4gICAgICAgIHJldHVybiBzdHI7XHJcbiAgICB9XHJcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgnLCcsICcuJyk7XHJcbiAgICBsZXQgYXJyID0gc3RyLnNwbGl0KCc6Jyk7XHJcbiAgICBsZXQgYXJyTGVuZ3RoID0gYXJyLmxlbmd0aDtcclxuICAgIGxldCBzZWMgPSAwO1xyXG4gICAgaWYgKHN0ci5zbGljZSgtMSkgPT09ICdzJyl7XHJcbiAgICAgICAgc2VjID0gcGFyc2VGbG9hdChzdHIpO1xyXG4gICAgfWVsc2UgaWYgKHN0ci5zbGljZSgtMSkgPT09ICdtJyl7XHJcbiAgICAgICAgc2VjID0gcGFyc2VGbG9hdChzdHIpICogNjA7XHJcbiAgICB9ZWxzZSBpZiAoc3RyLnNsaWNlKC0xKSA9PT0gJ2gnKXtcclxuICAgICAgICBzZWMgPSBwYXJzZUZsb2F0KHN0cikgKiAzNjAwO1xyXG4gICAgfWVsc2UgaWYgKGFyckxlbmd0aCA+IDEpIHtcclxuICAgICAgICB2YXIgc2VjSW5kZXggPSBhcnJMZW5ndGggLSAxO1xyXG4gICAgICAgIGlmIChhcnJMZW5ndGggPT09IDQpIHtcclxuICAgICAgICAgICAgaWYgKGZyYW1lUmF0ZSkge1xyXG4gICAgICAgICAgICAgICAgc2VjID0gcGFyc2VGbG9hdChhcnJbc2VjSW5kZXhdKSAvIGZyYW1lUmF0ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWNJbmRleCAtPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZWMgKz0gcGFyc2VGbG9hdChhcnJbc2VjSW5kZXhdKTtcclxuICAgICAgICBzZWMgKz0gcGFyc2VGbG9hdChhcnJbc2VjSW5kZXggLSAxXSkgKiA2MDtcclxuICAgICAgICBpZiAoYXJyTGVuZ3RoID49IDMpIHtcclxuICAgICAgICAgICAgc2VjICs9IHBhcnNlRmxvYXQoYXJyW3NlY0luZGV4IC0gMl0pICogMzYwMDtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNlYyA9IHBhcnNlRmxvYXQoc3RyKTtcclxuICAgIH1cclxuICAgIGlmIChfLmlzTmFOKHNlYykpIHtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICAgIHJldHVybiBzZWM7XHJcbn0iLCIvLyAgICAgVW5kZXJzY29yZS5qcyAxLjkuMVxyXG4vLyAgICAgaHR0cDovL3VuZGVyc2NvcmVqcy5vcmdcclxuLy8gICAgIChjKSAyMDA5LTIwMTggSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcclxuLy8gICAgIFVuZGVyc2NvcmUgbWF5IGJlIGZyZWVseSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXHJcbiFmdW5jdGlvbigpe3ZhciBuPVwib2JqZWN0XCI9PXR5cGVvZiBzZWxmJiZzZWxmLnNlbGY9PT1zZWxmJiZzZWxmfHxcIm9iamVjdFwiPT10eXBlb2YgZ2xvYmFsJiZnbG9iYWwuZ2xvYmFsPT09Z2xvYmFsJiZnbG9iYWx8fHRoaXN8fHt9LHI9bi5fLGU9QXJyYXkucHJvdG90eXBlLG89T2JqZWN0LnByb3RvdHlwZSxzPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBTeW1ib2w/U3ltYm9sLnByb3RvdHlwZTpudWxsLHU9ZS5wdXNoLGM9ZS5zbGljZSxwPW8udG9TdHJpbmcsaT1vLmhhc093blByb3BlcnR5LHQ9QXJyYXkuaXNBcnJheSxhPU9iamVjdC5rZXlzLGw9T2JqZWN0LmNyZWF0ZSxmPWZ1bmN0aW9uKCl7fSxoPWZ1bmN0aW9uKG4pe3JldHVybiBuIGluc3RhbmNlb2YgaD9uOnRoaXMgaW5zdGFuY2VvZiBoP3ZvaWQodGhpcy5fd3JhcHBlZD1uKTpuZXcgaChuKX07XCJ1bmRlZmluZWRcIj09dHlwZW9mIGV4cG9ydHN8fGV4cG9ydHMubm9kZVR5cGU/bi5fPWg6KFwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGUmJiFtb2R1bGUubm9kZVR5cGUmJm1vZHVsZS5leHBvcnRzJiYoZXhwb3J0cz1tb2R1bGUuZXhwb3J0cz1oKSxleHBvcnRzLl89aCksaC5WRVJTSU9OPVwiMS45LjFcIjt2YXIgdix5PWZ1bmN0aW9uKHUsaSxuKXtpZih2b2lkIDA9PT1pKXJldHVybiB1O3N3aXRjaChudWxsPT1uPzM6bil7Y2FzZSAxOnJldHVybiBmdW5jdGlvbihuKXtyZXR1cm4gdS5jYWxsKGksbil9O2Nhc2UgMzpyZXR1cm4gZnVuY3Rpb24obixyLHQpe3JldHVybiB1LmNhbGwoaSxuLHIsdCl9O2Nhc2UgNDpyZXR1cm4gZnVuY3Rpb24obixyLHQsZSl7cmV0dXJuIHUuY2FsbChpLG4scix0LGUpfX1yZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gdS5hcHBseShpLGFyZ3VtZW50cyl9fSxkPWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gaC5pdGVyYXRlZSE9PXY/aC5pdGVyYXRlZShuLHIpOm51bGw9PW4/aC5pZGVudGl0eTpoLmlzRnVuY3Rpb24obik/eShuLHIsdCk6aC5pc09iamVjdChuKSYmIWguaXNBcnJheShuKT9oLm1hdGNoZXIobik6aC5wcm9wZXJ0eShuKX07aC5pdGVyYXRlZT12PWZ1bmN0aW9uKG4scil7cmV0dXJuIGQobixyLDEvMCl9O3ZhciBnPWZ1bmN0aW9uKHUsaSl7cmV0dXJuIGk9bnVsbD09aT91Lmxlbmd0aC0xOitpLGZ1bmN0aW9uKCl7Zm9yKHZhciBuPU1hdGgubWF4KGFyZ3VtZW50cy5sZW5ndGgtaSwwKSxyPUFycmF5KG4pLHQ9MDt0PG47dCsrKXJbdF09YXJndW1lbnRzW3QraV07c3dpdGNoKGkpe2Nhc2UgMDpyZXR1cm4gdS5jYWxsKHRoaXMscik7Y2FzZSAxOnJldHVybiB1LmNhbGwodGhpcyxhcmd1bWVudHNbMF0scik7Y2FzZSAyOnJldHVybiB1LmNhbGwodGhpcyxhcmd1bWVudHNbMF0sYXJndW1lbnRzWzFdLHIpfXZhciBlPUFycmF5KGkrMSk7Zm9yKHQ9MDt0PGk7dCsrKWVbdF09YXJndW1lbnRzW3RdO3JldHVybiBlW2ldPXIsdS5hcHBseSh0aGlzLGUpfX0sbT1mdW5jdGlvbihuKXtpZighaC5pc09iamVjdChuKSlyZXR1cm57fTtpZihsKXJldHVybiBsKG4pO2YucHJvdG90eXBlPW47dmFyIHI9bmV3IGY7cmV0dXJuIGYucHJvdG90eXBlPW51bGwscn0sYj1mdW5jdGlvbihyKXtyZXR1cm4gZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PW4/dm9pZCAwOm5bcl19fSxqPWZ1bmN0aW9uKG4scil7cmV0dXJuIG51bGwhPW4mJmkuY2FsbChuLHIpfSx4PWZ1bmN0aW9uKG4scil7Zm9yKHZhciB0PXIubGVuZ3RoLGU9MDtlPHQ7ZSsrKXtpZihudWxsPT1uKXJldHVybjtuPW5bcltlXV19cmV0dXJuIHQ/bjp2b2lkIDB9LF89TWF0aC5wb3coMiw1MyktMSxBPWIoXCJsZW5ndGhcIiksdz1mdW5jdGlvbihuKXt2YXIgcj1BKG4pO3JldHVyblwibnVtYmVyXCI9PXR5cGVvZiByJiYwPD1yJiZyPD1ffTtoLmVhY2g9aC5mb3JFYWNoPWZ1bmN0aW9uKG4scix0KXt2YXIgZSx1O2lmKHI9eShyLHQpLHcobikpZm9yKGU9MCx1PW4ubGVuZ3RoO2U8dTtlKyspcihuW2VdLGUsbik7ZWxzZXt2YXIgaT1oLmtleXMobik7Zm9yKGU9MCx1PWkubGVuZ3RoO2U8dTtlKyspcihuW2lbZV1dLGlbZV0sbil9cmV0dXJuIG59LGgubWFwPWguY29sbGVjdD1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPSF3KG4pJiZoLmtleXMobiksdT0oZXx8bikubGVuZ3RoLGk9QXJyYXkodSksbz0wO288dTtvKyspe3ZhciBhPWU/ZVtvXTpvO2lbb109cihuW2FdLGEsbil9cmV0dXJuIGl9O3ZhciBPPWZ1bmN0aW9uKGMpe3JldHVybiBmdW5jdGlvbihuLHIsdCxlKXt2YXIgdT0zPD1hcmd1bWVudHMubGVuZ3RoO3JldHVybiBmdW5jdGlvbihuLHIsdCxlKXt2YXIgdT0hdyhuKSYmaC5rZXlzKG4pLGk9KHV8fG4pLmxlbmd0aCxvPTA8Yz8wOmktMTtmb3IoZXx8KHQ9blt1P3Vbb106b10sbys9Yyk7MDw9byYmbzxpO28rPWMpe3ZhciBhPXU/dVtvXTpvO3Q9cih0LG5bYV0sYSxuKX1yZXR1cm4gdH0obix5KHIsZSw0KSx0LHUpfX07aC5yZWR1Y2U9aC5mb2xkbD1oLmluamVjdD1PKDEpLGgucmVkdWNlUmlnaHQ9aC5mb2xkcj1PKC0xKSxoLmZpbmQ9aC5kZXRlY3Q9ZnVuY3Rpb24obixyLHQpe3ZhciBlPSh3KG4pP2guZmluZEluZGV4OmguZmluZEtleSkobixyLHQpO2lmKHZvaWQgMCE9PWUmJi0xIT09ZSlyZXR1cm4gbltlXX0saC5maWx0ZXI9aC5zZWxlY3Q9ZnVuY3Rpb24obixlLHIpe3ZhciB1PVtdO3JldHVybiBlPWQoZSxyKSxoLmVhY2gobixmdW5jdGlvbihuLHIsdCl7ZShuLHIsdCkmJnUucHVzaChuKX0pLHV9LGgucmVqZWN0PWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gaC5maWx0ZXIobixoLm5lZ2F0ZShkKHIpKSx0KX0saC5ldmVyeT1oLmFsbD1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPSF3KG4pJiZoLmtleXMobiksdT0oZXx8bikubGVuZ3RoLGk9MDtpPHU7aSsrKXt2YXIgbz1lP2VbaV06aTtpZighcihuW29dLG8sbikpcmV0dXJuITF9cmV0dXJuITB9LGguc29tZT1oLmFueT1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPSF3KG4pJiZoLmtleXMobiksdT0oZXx8bikubGVuZ3RoLGk9MDtpPHU7aSsrKXt2YXIgbz1lP2VbaV06aTtpZihyKG5bb10sbyxuKSlyZXR1cm4hMH1yZXR1cm4hMX0saC5jb250YWlucz1oLmluY2x1ZGVzPWguaW5jbHVkZT1mdW5jdGlvbihuLHIsdCxlKXtyZXR1cm4gdyhuKXx8KG49aC52YWx1ZXMobikpLChcIm51bWJlclwiIT10eXBlb2YgdHx8ZSkmJih0PTApLDA8PWguaW5kZXhPZihuLHIsdCl9LGguaW52b2tlPWcoZnVuY3Rpb24obix0LGUpe3ZhciB1LGk7cmV0dXJuIGguaXNGdW5jdGlvbih0KT9pPXQ6aC5pc0FycmF5KHQpJiYodT10LnNsaWNlKDAsLTEpLHQ9dFt0Lmxlbmd0aC0xXSksaC5tYXAobixmdW5jdGlvbihuKXt2YXIgcj1pO2lmKCFyKXtpZih1JiZ1Lmxlbmd0aCYmKG49eChuLHUpKSxudWxsPT1uKXJldHVybjtyPW5bdF19cmV0dXJuIG51bGw9PXI/cjpyLmFwcGx5KG4sZSl9KX0pLGgucGx1Y2s9ZnVuY3Rpb24obixyKXtyZXR1cm4gaC5tYXAobixoLnByb3BlcnR5KHIpKX0saC53aGVyZT1mdW5jdGlvbihuLHIpe3JldHVybiBoLmZpbHRlcihuLGgubWF0Y2hlcihyKSl9LGguZmluZFdoZXJlPWZ1bmN0aW9uKG4scil7cmV0dXJuIGguZmluZChuLGgubWF0Y2hlcihyKSl9LGgubWF4PWZ1bmN0aW9uKG4sZSxyKXt2YXIgdCx1LGk9LTEvMCxvPS0xLzA7aWYobnVsbD09ZXx8XCJudW1iZXJcIj09dHlwZW9mIGUmJlwib2JqZWN0XCIhPXR5cGVvZiBuWzBdJiZudWxsIT1uKWZvcih2YXIgYT0wLGM9KG49dyhuKT9uOmgudmFsdWVzKG4pKS5sZW5ndGg7YTxjO2ErKyludWxsIT0odD1uW2FdKSYmaTx0JiYoaT10KTtlbHNlIGU9ZChlLHIpLGguZWFjaChuLGZ1bmN0aW9uKG4scix0KXt1PWUobixyLHQpLChvPHV8fHU9PT0tMS8wJiZpPT09LTEvMCkmJihpPW4sbz11KX0pO3JldHVybiBpfSxoLm1pbj1mdW5jdGlvbihuLGUscil7dmFyIHQsdSxpPTEvMCxvPTEvMDtpZihudWxsPT1lfHxcIm51bWJlclwiPT10eXBlb2YgZSYmXCJvYmplY3RcIiE9dHlwZW9mIG5bMF0mJm51bGwhPW4pZm9yKHZhciBhPTAsYz0obj13KG4pP246aC52YWx1ZXMobikpLmxlbmd0aDthPGM7YSsrKW51bGwhPSh0PW5bYV0pJiZ0PGkmJihpPXQpO2Vsc2UgZT1kKGUsciksaC5lYWNoKG4sZnVuY3Rpb24obixyLHQpeygodT1lKG4scix0KSk8b3x8dT09PTEvMCYmaT09PTEvMCkmJihpPW4sbz11KX0pO3JldHVybiBpfSxoLnNodWZmbGU9ZnVuY3Rpb24obil7cmV0dXJuIGguc2FtcGxlKG4sMS8wKX0saC5zYW1wbGU9ZnVuY3Rpb24obixyLHQpe2lmKG51bGw9PXJ8fHQpcmV0dXJuIHcobil8fChuPWgudmFsdWVzKG4pKSxuW2gucmFuZG9tKG4ubGVuZ3RoLTEpXTt2YXIgZT13KG4pP2guY2xvbmUobik6aC52YWx1ZXMobiksdT1BKGUpO3I9TWF0aC5tYXgoTWF0aC5taW4ocix1KSwwKTtmb3IodmFyIGk9dS0xLG89MDtvPHI7bysrKXt2YXIgYT1oLnJhbmRvbShvLGkpLGM9ZVtvXTtlW29dPWVbYV0sZVthXT1jfXJldHVybiBlLnNsaWNlKDAscil9LGguc29ydEJ5PWZ1bmN0aW9uKG4sZSxyKXt2YXIgdT0wO3JldHVybiBlPWQoZSxyKSxoLnBsdWNrKGgubWFwKG4sZnVuY3Rpb24obixyLHQpe3JldHVybnt2YWx1ZTpuLGluZGV4OnUrKyxjcml0ZXJpYTplKG4scix0KX19KS5zb3J0KGZ1bmN0aW9uKG4scil7dmFyIHQ9bi5jcml0ZXJpYSxlPXIuY3JpdGVyaWE7aWYodCE9PWUpe2lmKGU8dHx8dm9pZCAwPT09dClyZXR1cm4gMTtpZih0PGV8fHZvaWQgMD09PWUpcmV0dXJuLTF9cmV0dXJuIG4uaW5kZXgtci5pbmRleH0pLFwidmFsdWVcIil9O3ZhciBrPWZ1bmN0aW9uKG8scil7cmV0dXJuIGZ1bmN0aW9uKGUsdSxuKXt2YXIgaT1yP1tbXSxbXV06e307cmV0dXJuIHU9ZCh1LG4pLGguZWFjaChlLGZ1bmN0aW9uKG4scil7dmFyIHQ9dShuLHIsZSk7byhpLG4sdCl9KSxpfX07aC5ncm91cEJ5PWsoZnVuY3Rpb24obixyLHQpe2oobix0KT9uW3RdLnB1c2gocik6blt0XT1bcl19KSxoLmluZGV4Qnk9ayhmdW5jdGlvbihuLHIsdCl7blt0XT1yfSksaC5jb3VudEJ5PWsoZnVuY3Rpb24obixyLHQpe2oobix0KT9uW3RdKys6blt0XT0xfSk7dmFyIFM9L1teXFx1ZDgwMC1cXHVkZmZmXXxbXFx1ZDgwMC1cXHVkYmZmXVtcXHVkYzAwLVxcdWRmZmZdfFtcXHVkODAwLVxcdWRmZmZdL2c7aC50b0FycmF5PWZ1bmN0aW9uKG4pe3JldHVybiBuP2guaXNBcnJheShuKT9jLmNhbGwobik6aC5pc1N0cmluZyhuKT9uLm1hdGNoKFMpOncobik/aC5tYXAobixoLmlkZW50aXR5KTpoLnZhbHVlcyhuKTpbXX0saC5zaXplPWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT1uPzA6dyhuKT9uLmxlbmd0aDpoLmtleXMobikubGVuZ3RofSxoLnBhcnRpdGlvbj1rKGZ1bmN0aW9uKG4scix0KXtuW3Q/MDoxXS5wdXNoKHIpfSwhMCksaC5maXJzdD1oLmhlYWQ9aC50YWtlPWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gbnVsbD09bnx8bi5sZW5ndGg8MT9udWxsPT1yP3ZvaWQgMDpbXTpudWxsPT1yfHx0P25bMF06aC5pbml0aWFsKG4sbi5sZW5ndGgtcil9LGguaW5pdGlhbD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGMuY2FsbChuLDAsTWF0aC5tYXgoMCxuLmxlbmd0aC0obnVsbD09cnx8dD8xOnIpKSl9LGgubGFzdD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIG51bGw9PW58fG4ubGVuZ3RoPDE/bnVsbD09cj92b2lkIDA6W106bnVsbD09cnx8dD9uW24ubGVuZ3RoLTFdOmgucmVzdChuLE1hdGgubWF4KDAsbi5sZW5ndGgtcikpfSxoLnJlc3Q9aC50YWlsPWguZHJvcD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGMuY2FsbChuLG51bGw9PXJ8fHQ/MTpyKX0saC5jb21wYWN0PWZ1bmN0aW9uKG4pe3JldHVybiBoLmZpbHRlcihuLEJvb2xlYW4pfTt2YXIgTT1mdW5jdGlvbihuLHIsdCxlKXtmb3IodmFyIHU9KGU9ZXx8W10pLmxlbmd0aCxpPTAsbz1BKG4pO2k8bztpKyspe3ZhciBhPW5baV07aWYodyhhKSYmKGguaXNBcnJheShhKXx8aC5pc0FyZ3VtZW50cyhhKSkpaWYocilmb3IodmFyIGM9MCxsPWEubGVuZ3RoO2M8bDspZVt1KytdPWFbYysrXTtlbHNlIE0oYSxyLHQsZSksdT1lLmxlbmd0aDtlbHNlIHR8fChlW3UrK109YSl9cmV0dXJuIGV9O2guZmxhdHRlbj1mdW5jdGlvbihuLHIpe3JldHVybiBNKG4sciwhMSl9LGgud2l0aG91dD1nKGZ1bmN0aW9uKG4scil7cmV0dXJuIGguZGlmZmVyZW5jZShuLHIpfSksaC51bmlxPWgudW5pcXVlPWZ1bmN0aW9uKG4scix0LGUpe2guaXNCb29sZWFuKHIpfHwoZT10LHQ9cixyPSExKSxudWxsIT10JiYodD1kKHQsZSkpO2Zvcih2YXIgdT1bXSxpPVtdLG89MCxhPUEobik7bzxhO28rKyl7dmFyIGM9bltvXSxsPXQ/dChjLG8sbik6YztyJiYhdD8obyYmaT09PWx8fHUucHVzaChjKSxpPWwpOnQ/aC5jb250YWlucyhpLGwpfHwoaS5wdXNoKGwpLHUucHVzaChjKSk6aC5jb250YWlucyh1LGMpfHx1LnB1c2goYyl9cmV0dXJuIHV9LGgudW5pb249ZyhmdW5jdGlvbihuKXtyZXR1cm4gaC51bmlxKE0obiwhMCwhMCkpfSksaC5pbnRlcnNlY3Rpb249ZnVuY3Rpb24obil7Zm9yKHZhciByPVtdLHQ9YXJndW1lbnRzLmxlbmd0aCxlPTAsdT1BKG4pO2U8dTtlKyspe3ZhciBpPW5bZV07aWYoIWguY29udGFpbnMocixpKSl7dmFyIG87Zm9yKG89MTtvPHQmJmguY29udGFpbnMoYXJndW1lbnRzW29dLGkpO28rKyk7bz09PXQmJnIucHVzaChpKX19cmV0dXJuIHJ9LGguZGlmZmVyZW5jZT1nKGZ1bmN0aW9uKG4scil7cmV0dXJuIHI9TShyLCEwLCEwKSxoLmZpbHRlcihuLGZ1bmN0aW9uKG4pe3JldHVybiFoLmNvbnRhaW5zKHIsbil9KX0pLGgudW56aXA9ZnVuY3Rpb24obil7Zm9yKHZhciByPW4mJmgubWF4KG4sQSkubGVuZ3RofHwwLHQ9QXJyYXkociksZT0wO2U8cjtlKyspdFtlXT1oLnBsdWNrKG4sZSk7cmV0dXJuIHR9LGguemlwPWcoaC51bnppcCksaC5vYmplY3Q9ZnVuY3Rpb24obixyKXtmb3IodmFyIHQ9e30sZT0wLHU9QShuKTtlPHU7ZSsrKXI/dFtuW2VdXT1yW2VdOnRbbltlXVswXV09bltlXVsxXTtyZXR1cm4gdH07dmFyIEY9ZnVuY3Rpb24oaSl7cmV0dXJuIGZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGU9QShuKSx1PTA8aT8wOmUtMTswPD11JiZ1PGU7dSs9aSlpZihyKG5bdV0sdSxuKSlyZXR1cm4gdTtyZXR1cm4tMX19O2guZmluZEluZGV4PUYoMSksaC5maW5kTGFzdEluZGV4PUYoLTEpLGguc29ydGVkSW5kZXg9ZnVuY3Rpb24obixyLHQsZSl7Zm9yKHZhciB1PSh0PWQodCxlLDEpKShyKSxpPTAsbz1BKG4pO2k8bzspe3ZhciBhPU1hdGguZmxvb3IoKGkrbykvMik7dChuW2FdKTx1P2k9YSsxOm89YX1yZXR1cm4gaX07dmFyIEU9ZnVuY3Rpb24oaSxvLGEpe3JldHVybiBmdW5jdGlvbihuLHIsdCl7dmFyIGU9MCx1PUEobik7aWYoXCJudW1iZXJcIj09dHlwZW9mIHQpMDxpP2U9MDw9dD90Ok1hdGgubWF4KHQrdSxlKTp1PTA8PXQ/TWF0aC5taW4odCsxLHUpOnQrdSsxO2Vsc2UgaWYoYSYmdCYmdSlyZXR1cm4gblt0PWEobixyKV09PT1yP3Q6LTE7aWYociE9cilyZXR1cm4gMDw9KHQ9byhjLmNhbGwobixlLHUpLGguaXNOYU4pKT90K2U6LTE7Zm9yKHQ9MDxpP2U6dS0xOzA8PXQmJnQ8dTt0Kz1pKWlmKG5bdF09PT1yKXJldHVybiB0O3JldHVybi0xfX07aC5pbmRleE9mPUUoMSxoLmZpbmRJbmRleCxoLnNvcnRlZEluZGV4KSxoLmxhc3RJbmRleE9mPUUoLTEsaC5maW5kTGFzdEluZGV4KSxoLnJhbmdlPWZ1bmN0aW9uKG4scix0KXtudWxsPT1yJiYocj1ufHwwLG49MCksdHx8KHQ9cjxuPy0xOjEpO2Zvcih2YXIgZT1NYXRoLm1heChNYXRoLmNlaWwoKHItbikvdCksMCksdT1BcnJheShlKSxpPTA7aTxlO2krKyxuKz10KXVbaV09bjtyZXR1cm4gdX0saC5jaHVuaz1mdW5jdGlvbihuLHIpe2lmKG51bGw9PXJ8fHI8MSlyZXR1cm5bXTtmb3IodmFyIHQ9W10sZT0wLHU9bi5sZW5ndGg7ZTx1Oyl0LnB1c2goYy5jYWxsKG4sZSxlKz1yKSk7cmV0dXJuIHR9O3ZhciBOPWZ1bmN0aW9uKG4scix0LGUsdSl7aWYoIShlIGluc3RhbmNlb2YgcikpcmV0dXJuIG4uYXBwbHkodCx1KTt2YXIgaT1tKG4ucHJvdG90eXBlKSxvPW4uYXBwbHkoaSx1KTtyZXR1cm4gaC5pc09iamVjdChvKT9vOml9O2guYmluZD1nKGZ1bmN0aW9uKHIsdCxlKXtpZighaC5pc0Z1bmN0aW9uKHIpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJCaW5kIG11c3QgYmUgY2FsbGVkIG9uIGEgZnVuY3Rpb25cIik7dmFyIHU9ZyhmdW5jdGlvbihuKXtyZXR1cm4gTihyLHUsdCx0aGlzLGUuY29uY2F0KG4pKX0pO3JldHVybiB1fSksaC5wYXJ0aWFsPWcoZnVuY3Rpb24odSxpKXt2YXIgbz1oLnBhcnRpYWwucGxhY2Vob2xkZXIsYT1mdW5jdGlvbigpe2Zvcih2YXIgbj0wLHI9aS5sZW5ndGgsdD1BcnJheShyKSxlPTA7ZTxyO2UrKyl0W2VdPWlbZV09PT1vP2FyZ3VtZW50c1tuKytdOmlbZV07Zm9yKDtuPGFyZ3VtZW50cy5sZW5ndGg7KXQucHVzaChhcmd1bWVudHNbbisrXSk7cmV0dXJuIE4odSxhLHRoaXMsdGhpcyx0KX07cmV0dXJuIGF9KSwoaC5wYXJ0aWFsLnBsYWNlaG9sZGVyPWgpLmJpbmRBbGw9ZyhmdW5jdGlvbihuLHIpe3ZhciB0PShyPU0ociwhMSwhMSkpLmxlbmd0aDtpZih0PDEpdGhyb3cgbmV3IEVycm9yKFwiYmluZEFsbCBtdXN0IGJlIHBhc3NlZCBmdW5jdGlvbiBuYW1lc1wiKTtmb3IoO3QtLTspe3ZhciBlPXJbdF07bltlXT1oLmJpbmQobltlXSxuKX19KSxoLm1lbW9pemU9ZnVuY3Rpb24oZSx1KXt2YXIgaT1mdW5jdGlvbihuKXt2YXIgcj1pLmNhY2hlLHQ9XCJcIisodT91LmFwcGx5KHRoaXMsYXJndW1lbnRzKTpuKTtyZXR1cm4gaihyLHQpfHwoclt0XT1lLmFwcGx5KHRoaXMsYXJndW1lbnRzKSksclt0XX07cmV0dXJuIGkuY2FjaGU9e30saX0saC5kZWxheT1nKGZ1bmN0aW9uKG4scix0KXtyZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpe3JldHVybiBuLmFwcGx5KG51bGwsdCl9LHIpfSksaC5kZWZlcj1oLnBhcnRpYWwoaC5kZWxheSxoLDEpLGgudGhyb3R0bGU9ZnVuY3Rpb24odCxlLHUpe3ZhciBpLG8sYSxjLGw9MDt1fHwodT17fSk7dmFyIGY9ZnVuY3Rpb24oKXtsPSExPT09dS5sZWFkaW5nPzA6aC5ub3coKSxpPW51bGwsYz10LmFwcGx5KG8sYSksaXx8KG89YT1udWxsKX0sbj1mdW5jdGlvbigpe3ZhciBuPWgubm93KCk7bHx8ITEhPT11LmxlYWRpbmd8fChsPW4pO3ZhciByPWUtKG4tbCk7cmV0dXJuIG89dGhpcyxhPWFyZ3VtZW50cyxyPD0wfHxlPHI/KGkmJihjbGVhclRpbWVvdXQoaSksaT1udWxsKSxsPW4sYz10LmFwcGx5KG8sYSksaXx8KG89YT1udWxsKSk6aXx8ITE9PT11LnRyYWlsaW5nfHwoaT1zZXRUaW1lb3V0KGYscikpLGN9O3JldHVybiBuLmNhbmNlbD1mdW5jdGlvbigpe2NsZWFyVGltZW91dChpKSxsPTAsaT1vPWE9bnVsbH0sbn0saC5kZWJvdW5jZT1mdW5jdGlvbih0LGUsdSl7dmFyIGksbyxhPWZ1bmN0aW9uKG4scil7aT1udWxsLHImJihvPXQuYXBwbHkobixyKSl9LG49ZyhmdW5jdGlvbihuKXtpZihpJiZjbGVhclRpbWVvdXQoaSksdSl7dmFyIHI9IWk7aT1zZXRUaW1lb3V0KGEsZSksciYmKG89dC5hcHBseSh0aGlzLG4pKX1lbHNlIGk9aC5kZWxheShhLGUsdGhpcyxuKTtyZXR1cm4gb30pO3JldHVybiBuLmNhbmNlbD1mdW5jdGlvbigpe2NsZWFyVGltZW91dChpKSxpPW51bGx9LG59LGgud3JhcD1mdW5jdGlvbihuLHIpe3JldHVybiBoLnBhcnRpYWwocixuKX0saC5uZWdhdGU9ZnVuY3Rpb24obil7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIW4uYXBwbHkodGhpcyxhcmd1bWVudHMpfX0saC5jb21wb3NlPWZ1bmN0aW9uKCl7dmFyIHQ9YXJndW1lbnRzLGU9dC5sZW5ndGgtMTtyZXR1cm4gZnVuY3Rpb24oKXtmb3IodmFyIG49ZSxyPXRbZV0uYXBwbHkodGhpcyxhcmd1bWVudHMpO24tLTspcj10W25dLmNhbGwodGhpcyxyKTtyZXR1cm4gcn19LGguYWZ0ZXI9ZnVuY3Rpb24obixyKXtyZXR1cm4gZnVuY3Rpb24oKXtpZigtLW48MSlyZXR1cm4gci5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fSxoLmJlZm9yZT1mdW5jdGlvbihuLHIpe3ZhciB0O3JldHVybiBmdW5jdGlvbigpe3JldHVybiAwPC0tbiYmKHQ9ci5hcHBseSh0aGlzLGFyZ3VtZW50cykpLG48PTEmJihyPW51bGwpLHR9fSxoLm9uY2U9aC5wYXJ0aWFsKGguYmVmb3JlLDIpLGgucmVzdEFyZ3VtZW50cz1nO3ZhciBJPSF7dG9TdHJpbmc6bnVsbH0ucHJvcGVydHlJc0VudW1lcmFibGUoXCJ0b1N0cmluZ1wiKSxUPVtcInZhbHVlT2ZcIixcImlzUHJvdG90eXBlT2ZcIixcInRvU3RyaW5nXCIsXCJwcm9wZXJ0eUlzRW51bWVyYWJsZVwiLFwiaGFzT3duUHJvcGVydHlcIixcInRvTG9jYWxlU3RyaW5nXCJdLEI9ZnVuY3Rpb24obixyKXt2YXIgdD1ULmxlbmd0aCxlPW4uY29uc3RydWN0b3IsdT1oLmlzRnVuY3Rpb24oZSkmJmUucHJvdG90eXBlfHxvLGk9XCJjb25zdHJ1Y3RvclwiO2ZvcihqKG4saSkmJiFoLmNvbnRhaW5zKHIsaSkmJnIucHVzaChpKTt0LS07KShpPVRbdF0paW4gbiYmbltpXSE9PXVbaV0mJiFoLmNvbnRhaW5zKHIsaSkmJnIucHVzaChpKX07aC5rZXlzPWZ1bmN0aW9uKG4pe2lmKCFoLmlzT2JqZWN0KG4pKXJldHVybltdO2lmKGEpcmV0dXJuIGEobik7dmFyIHI9W107Zm9yKHZhciB0IGluIG4paihuLHQpJiZyLnB1c2godCk7cmV0dXJuIEkmJkIobixyKSxyfSxoLmFsbEtleXM9ZnVuY3Rpb24obil7aWYoIWguaXNPYmplY3QobikpcmV0dXJuW107dmFyIHI9W107Zm9yKHZhciB0IGluIG4pci5wdXNoKHQpO3JldHVybiBJJiZCKG4scikscn0saC52YWx1ZXM9ZnVuY3Rpb24obil7Zm9yKHZhciByPWgua2V5cyhuKSx0PXIubGVuZ3RoLGU9QXJyYXkodCksdT0wO3U8dDt1KyspZVt1XT1uW3JbdV1dO3JldHVybiBlfSxoLm1hcE9iamVjdD1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPWgua2V5cyhuKSx1PWUubGVuZ3RoLGk9e30sbz0wO288dTtvKyspe3ZhciBhPWVbb107aVthXT1yKG5bYV0sYSxuKX1yZXR1cm4gaX0saC5wYWlycz1mdW5jdGlvbihuKXtmb3IodmFyIHI9aC5rZXlzKG4pLHQ9ci5sZW5ndGgsZT1BcnJheSh0KSx1PTA7dTx0O3UrKyllW3VdPVtyW3VdLG5bclt1XV1dO3JldHVybiBlfSxoLmludmVydD1mdW5jdGlvbihuKXtmb3IodmFyIHI9e30sdD1oLmtleXMobiksZT0wLHU9dC5sZW5ndGg7ZTx1O2UrKylyW25bdFtlXV1dPXRbZV07cmV0dXJuIHJ9LGguZnVuY3Rpb25zPWgubWV0aG9kcz1mdW5jdGlvbihuKXt2YXIgcj1bXTtmb3IodmFyIHQgaW4gbiloLmlzRnVuY3Rpb24oblt0XSkmJnIucHVzaCh0KTtyZXR1cm4gci5zb3J0KCl9O3ZhciBSPWZ1bmN0aW9uKGMsbCl7cmV0dXJuIGZ1bmN0aW9uKG4pe3ZhciByPWFyZ3VtZW50cy5sZW5ndGg7aWYobCYmKG49T2JqZWN0KG4pKSxyPDJ8fG51bGw9PW4pcmV0dXJuIG47Zm9yKHZhciB0PTE7dDxyO3QrKylmb3IodmFyIGU9YXJndW1lbnRzW3RdLHU9YyhlKSxpPXUubGVuZ3RoLG89MDtvPGk7bysrKXt2YXIgYT11W29dO2wmJnZvaWQgMCE9PW5bYV18fChuW2FdPWVbYV0pfXJldHVybiBufX07aC5leHRlbmQ9UihoLmFsbEtleXMpLGguZXh0ZW5kT3duPWguYXNzaWduPVIoaC5rZXlzKSxoLmZpbmRLZXk9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZSx1PWgua2V5cyhuKSxpPTAsbz11Lmxlbmd0aDtpPG87aSsrKWlmKHIobltlPXVbaV1dLGUsbikpcmV0dXJuIGV9O3ZhciBxLEssej1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIHIgaW4gdH07aC5waWNrPWcoZnVuY3Rpb24obixyKXt2YXIgdD17fSxlPXJbMF07aWYobnVsbD09bilyZXR1cm4gdDtoLmlzRnVuY3Rpb24oZSk/KDE8ci5sZW5ndGgmJihlPXkoZSxyWzFdKSkscj1oLmFsbEtleXMobikpOihlPXoscj1NKHIsITEsITEpLG49T2JqZWN0KG4pKTtmb3IodmFyIHU9MCxpPXIubGVuZ3RoO3U8aTt1Kyspe3ZhciBvPXJbdV0sYT1uW29dO2UoYSxvLG4pJiYodFtvXT1hKX1yZXR1cm4gdH0pLGgub21pdD1nKGZ1bmN0aW9uKG4sdCl7dmFyIHIsZT10WzBdO3JldHVybiBoLmlzRnVuY3Rpb24oZSk/KGU9aC5uZWdhdGUoZSksMTx0Lmxlbmd0aCYmKHI9dFsxXSkpOih0PWgubWFwKE0odCwhMSwhMSksU3RyaW5nKSxlPWZ1bmN0aW9uKG4scil7cmV0dXJuIWguY29udGFpbnModCxyKX0pLGgucGljayhuLGUscil9KSxoLmRlZmF1bHRzPVIoaC5hbGxLZXlzLCEwKSxoLmNyZWF0ZT1mdW5jdGlvbihuLHIpe3ZhciB0PW0obik7cmV0dXJuIHImJmguZXh0ZW5kT3duKHQsciksdH0saC5jbG9uZT1mdW5jdGlvbihuKXtyZXR1cm4gaC5pc09iamVjdChuKT9oLmlzQXJyYXkobik/bi5zbGljZSgpOmguZXh0ZW5kKHt9LG4pOm59LGgudGFwPWZ1bmN0aW9uKG4scil7cmV0dXJuIHIobiksbn0saC5pc01hdGNoPWZ1bmN0aW9uKG4scil7dmFyIHQ9aC5rZXlzKHIpLGU9dC5sZW5ndGg7aWYobnVsbD09bilyZXR1cm4hZTtmb3IodmFyIHU9T2JqZWN0KG4pLGk9MDtpPGU7aSsrKXt2YXIgbz10W2ldO2lmKHJbb10hPT11W29dfHwhKG8gaW4gdSkpcmV0dXJuITF9cmV0dXJuITB9LHE9ZnVuY3Rpb24obixyLHQsZSl7aWYobj09PXIpcmV0dXJuIDAhPT1ufHwxL249PTEvcjtpZihudWxsPT1ufHxudWxsPT1yKXJldHVybiExO2lmKG4hPW4pcmV0dXJuIHIhPXI7dmFyIHU9dHlwZW9mIG47cmV0dXJuKFwiZnVuY3Rpb25cIj09PXV8fFwib2JqZWN0XCI9PT11fHxcIm9iamVjdFwiPT10eXBlb2YgcikmJksobixyLHQsZSl9LEs9ZnVuY3Rpb24obixyLHQsZSl7biBpbnN0YW5jZW9mIGgmJihuPW4uX3dyYXBwZWQpLHIgaW5zdGFuY2VvZiBoJiYocj1yLl93cmFwcGVkKTt2YXIgdT1wLmNhbGwobik7aWYodSE9PXAuY2FsbChyKSlyZXR1cm4hMTtzd2l0Y2godSl7Y2FzZVwiW29iamVjdCBSZWdFeHBdXCI6Y2FzZVwiW29iamVjdCBTdHJpbmddXCI6cmV0dXJuXCJcIituPT1cIlwiK3I7Y2FzZVwiW29iamVjdCBOdW1iZXJdXCI6cmV0dXJuK24hPStuPytyIT0rcjowPT0rbj8xLytuPT0xL3I6K249PStyO2Nhc2VcIltvYmplY3QgRGF0ZV1cIjpjYXNlXCJbb2JqZWN0IEJvb2xlYW5dXCI6cmV0dXJuK249PStyO2Nhc2VcIltvYmplY3QgU3ltYm9sXVwiOnJldHVybiBzLnZhbHVlT2YuY2FsbChuKT09PXMudmFsdWVPZi5jYWxsKHIpfXZhciBpPVwiW29iamVjdCBBcnJheV1cIj09PXU7aWYoIWkpe2lmKFwib2JqZWN0XCIhPXR5cGVvZiBufHxcIm9iamVjdFwiIT10eXBlb2YgcilyZXR1cm4hMTt2YXIgbz1uLmNvbnN0cnVjdG9yLGE9ci5jb25zdHJ1Y3RvcjtpZihvIT09YSYmIShoLmlzRnVuY3Rpb24obykmJm8gaW5zdGFuY2VvZiBvJiZoLmlzRnVuY3Rpb24oYSkmJmEgaW5zdGFuY2VvZiBhKSYmXCJjb25zdHJ1Y3RvclwiaW4gbiYmXCJjb25zdHJ1Y3RvclwiaW4gcilyZXR1cm4hMX1lPWV8fFtdO2Zvcih2YXIgYz0odD10fHxbXSkubGVuZ3RoO2MtLTspaWYodFtjXT09PW4pcmV0dXJuIGVbY109PT1yO2lmKHQucHVzaChuKSxlLnB1c2gociksaSl7aWYoKGM9bi5sZW5ndGgpIT09ci5sZW5ndGgpcmV0dXJuITE7Zm9yKDtjLS07KWlmKCFxKG5bY10scltjXSx0LGUpKXJldHVybiExfWVsc2V7dmFyIGwsZj1oLmtleXMobik7aWYoYz1mLmxlbmd0aCxoLmtleXMocikubGVuZ3RoIT09YylyZXR1cm4hMTtmb3IoO2MtLTspaWYobD1mW2NdLCFqKHIsbCl8fCFxKG5bbF0scltsXSx0LGUpKXJldHVybiExfXJldHVybiB0LnBvcCgpLGUucG9wKCksITB9LGguaXNFcXVhbD1mdW5jdGlvbihuLHIpe3JldHVybiBxKG4scil9LGguaXNFbXB0eT1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09bnx8KHcobikmJihoLmlzQXJyYXkobil8fGguaXNTdHJpbmcobil8fGguaXNBcmd1bWVudHMobikpPzA9PT1uLmxlbmd0aDowPT09aC5rZXlzKG4pLmxlbmd0aCl9LGguaXNFbGVtZW50PWZ1bmN0aW9uKG4pe3JldHVybiEoIW58fDEhPT1uLm5vZGVUeXBlKX0saC5pc0FycmF5PXR8fGZ1bmN0aW9uKG4pe3JldHVyblwiW29iamVjdCBBcnJheV1cIj09PXAuY2FsbChuKX0saC5pc09iamVjdD1mdW5jdGlvbihuKXt2YXIgcj10eXBlb2YgbjtyZXR1cm5cImZ1bmN0aW9uXCI9PT1yfHxcIm9iamVjdFwiPT09ciYmISFufSxoLmVhY2goW1wiQXJndW1lbnRzXCIsXCJGdW5jdGlvblwiLFwiU3RyaW5nXCIsXCJOdW1iZXJcIixcIkRhdGVcIixcIlJlZ0V4cFwiLFwiRXJyb3JcIixcIlN5bWJvbFwiLFwiTWFwXCIsXCJXZWFrTWFwXCIsXCJTZXRcIixcIldlYWtTZXRcIl0sZnVuY3Rpb24ocil7aFtcImlzXCIrcl09ZnVuY3Rpb24obil7cmV0dXJuIHAuY2FsbChuKT09PVwiW29iamVjdCBcIityK1wiXVwifX0pLGguaXNBcmd1bWVudHMoYXJndW1lbnRzKXx8KGguaXNBcmd1bWVudHM9ZnVuY3Rpb24obil7cmV0dXJuIGoobixcImNhbGxlZVwiKX0pO3ZhciBEPW4uZG9jdW1lbnQmJm4uZG9jdW1lbnQuY2hpbGROb2RlcztcImZ1bmN0aW9uXCIhPXR5cGVvZi8uLyYmXCJvYmplY3RcIiE9dHlwZW9mIEludDhBcnJheSYmXCJmdW5jdGlvblwiIT10eXBlb2YgRCYmKGguaXNGdW5jdGlvbj1mdW5jdGlvbihuKXtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBufHwhMX0pLGguaXNGaW5pdGU9ZnVuY3Rpb24obil7cmV0dXJuIWguaXNTeW1ib2wobikmJmlzRmluaXRlKG4pJiYhaXNOYU4ocGFyc2VGbG9hdChuKSl9LGguaXNOYU49ZnVuY3Rpb24obil7cmV0dXJuIGguaXNOdW1iZXIobikmJmlzTmFOKG4pfSxoLmlzQm9vbGVhbj1mdW5jdGlvbihuKXtyZXR1cm4hMD09PW58fCExPT09bnx8XCJbb2JqZWN0IEJvb2xlYW5dXCI9PT1wLmNhbGwobil9LGguaXNOdWxsPWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT09bn0saC5pc1VuZGVmaW5lZD1mdW5jdGlvbihuKXtyZXR1cm4gdm9pZCAwPT09bn0saC5oYXM9ZnVuY3Rpb24obixyKXtpZighaC5pc0FycmF5KHIpKXJldHVybiBqKG4scik7Zm9yKHZhciB0PXIubGVuZ3RoLGU9MDtlPHQ7ZSsrKXt2YXIgdT1yW2VdO2lmKG51bGw9PW58fCFpLmNhbGwobix1KSlyZXR1cm4hMTtuPW5bdV19cmV0dXJuISF0fSxoLm5vQ29uZmxpY3Q9ZnVuY3Rpb24oKXtyZXR1cm4gbi5fPXIsdGhpc30saC5pZGVudGl0eT1mdW5jdGlvbihuKXtyZXR1cm4gbn0saC5jb25zdGFudD1mdW5jdGlvbihuKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gbn19LGgubm9vcD1mdW5jdGlvbigpe30saC5wcm9wZXJ0eT1mdW5jdGlvbihyKXtyZXR1cm4gaC5pc0FycmF5KHIpP2Z1bmN0aW9uKG4pe3JldHVybiB4KG4scil9OmIocil9LGgucHJvcGVydHlPZj1mdW5jdGlvbihyKXtyZXR1cm4gbnVsbD09cj9mdW5jdGlvbigpe306ZnVuY3Rpb24obil7cmV0dXJuIGguaXNBcnJheShuKT94KHIsbik6cltuXX19LGgubWF0Y2hlcj1oLm1hdGNoZXM9ZnVuY3Rpb24ocil7cmV0dXJuIHI9aC5leHRlbmRPd24oe30sciksZnVuY3Rpb24obil7cmV0dXJuIGguaXNNYXRjaChuLHIpfX0saC50aW1lcz1mdW5jdGlvbihuLHIsdCl7dmFyIGU9QXJyYXkoTWF0aC5tYXgoMCxuKSk7cj15KHIsdCwxKTtmb3IodmFyIHU9MDt1PG47dSsrKWVbdV09cih1KTtyZXR1cm4gZX0saC5yYW5kb209ZnVuY3Rpb24obixyKXtyZXR1cm4gbnVsbD09ciYmKHI9bixuPTApLG4rTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKihyLW4rMSkpfSxoLm5vdz1EYXRlLm5vd3x8ZnVuY3Rpb24oKXtyZXR1cm4obmV3IERhdGUpLmdldFRpbWUoKX07dmFyIEw9e1wiJlwiOlwiJmFtcDtcIixcIjxcIjpcIiZsdDtcIixcIj5cIjpcIiZndDtcIiwnXCInOlwiJnF1b3Q7XCIsXCInXCI6XCImI3gyNztcIixcImBcIjpcIiYjeDYwO1wifSxQPWguaW52ZXJ0KEwpLFc9ZnVuY3Rpb24ocil7dmFyIHQ9ZnVuY3Rpb24obil7cmV0dXJuIHJbbl19LG49XCIoPzpcIitoLmtleXMocikuam9pbihcInxcIikrXCIpXCIsZT1SZWdFeHAobiksdT1SZWdFeHAobixcImdcIik7cmV0dXJuIGZ1bmN0aW9uKG4pe3JldHVybiBuPW51bGw9PW4/XCJcIjpcIlwiK24sZS50ZXN0KG4pP24ucmVwbGFjZSh1LHQpOm59fTtoLmVzY2FwZT1XKEwpLGgudW5lc2NhcGU9VyhQKSxoLnJlc3VsdD1mdW5jdGlvbihuLHIsdCl7aC5pc0FycmF5KHIpfHwocj1bcl0pO3ZhciBlPXIubGVuZ3RoO2lmKCFlKXJldHVybiBoLmlzRnVuY3Rpb24odCk/dC5jYWxsKG4pOnQ7Zm9yKHZhciB1PTA7dTxlO3UrKyl7dmFyIGk9bnVsbD09bj92b2lkIDA6bltyW3VdXTt2b2lkIDA9PT1pJiYoaT10LHU9ZSksbj1oLmlzRnVuY3Rpb24oaSk/aS5jYWxsKG4pOml9cmV0dXJuIG59O3ZhciBDPTA7aC51bmlxdWVJZD1mdW5jdGlvbihuKXt2YXIgcj0rK0MrXCJcIjtyZXR1cm4gbj9uK3I6cn0saC50ZW1wbGF0ZVNldHRpbmdzPXtldmFsdWF0ZTovPCUoW1xcc1xcU10rPyklPi9nLGludGVycG9sYXRlOi88JT0oW1xcc1xcU10rPyklPi9nLGVzY2FwZTovPCUtKFtcXHNcXFNdKz8pJT4vZ307dmFyIEo9LyguKV4vLFU9e1wiJ1wiOlwiJ1wiLFwiXFxcXFwiOlwiXFxcXFwiLFwiXFxyXCI6XCJyXCIsXCJcXG5cIjpcIm5cIixcIlxcdTIwMjhcIjpcInUyMDI4XCIsXCJcXHUyMDI5XCI6XCJ1MjAyOVwifSxWPS9cXFxcfCd8XFxyfFxcbnxcXHUyMDI4fFxcdTIwMjkvZywkPWZ1bmN0aW9uKG4pe3JldHVyblwiXFxcXFwiK1Vbbl19O2gudGVtcGxhdGU9ZnVuY3Rpb24oaSxuLHIpeyFuJiZyJiYobj1yKSxuPWguZGVmYXVsdHMoe30sbixoLnRlbXBsYXRlU2V0dGluZ3MpO3ZhciB0LGU9UmVnRXhwKFsobi5lc2NhcGV8fEopLnNvdXJjZSwobi5pbnRlcnBvbGF0ZXx8Sikuc291cmNlLChuLmV2YWx1YXRlfHxKKS5zb3VyY2VdLmpvaW4oXCJ8XCIpK1wifCRcIixcImdcIiksbz0wLGE9XCJfX3ArPSdcIjtpLnJlcGxhY2UoZSxmdW5jdGlvbihuLHIsdCxlLHUpe3JldHVybiBhKz1pLnNsaWNlKG8sdSkucmVwbGFjZShWLCQpLG89dStuLmxlbmd0aCxyP2ErPVwiJytcXG4oKF9fdD0oXCIrcitcIikpPT1udWxsPycnOl8uZXNjYXBlKF9fdCkpK1xcbidcIjp0P2ErPVwiJytcXG4oKF9fdD0oXCIrdCtcIikpPT1udWxsPycnOl9fdCkrXFxuJ1wiOmUmJihhKz1cIic7XFxuXCIrZStcIlxcbl9fcCs9J1wiKSxufSksYSs9XCInO1xcblwiLG4udmFyaWFibGV8fChhPVwid2l0aChvYmp8fHt9KXtcXG5cIithK1wifVxcblwiKSxhPVwidmFyIF9fdCxfX3A9JycsX19qPUFycmF5LnByb3RvdHlwZS5qb2luLFwiK1wicHJpbnQ9ZnVuY3Rpb24oKXtfX3ArPV9fai5jYWxsKGFyZ3VtZW50cywnJyk7fTtcXG5cIithK1wicmV0dXJuIF9fcDtcXG5cIjt0cnl7dD1uZXcgRnVuY3Rpb24obi52YXJpYWJsZXx8XCJvYmpcIixcIl9cIixhKX1jYXRjaChuKXt0aHJvdyBuLnNvdXJjZT1hLG59dmFyIHU9ZnVuY3Rpb24obil7cmV0dXJuIHQuY2FsbCh0aGlzLG4saCl9LGM9bi52YXJpYWJsZXx8XCJvYmpcIjtyZXR1cm4gdS5zb3VyY2U9XCJmdW5jdGlvbihcIitjK1wiKXtcXG5cIithK1wifVwiLHV9LGguY2hhaW49ZnVuY3Rpb24obil7dmFyIHI9aChuKTtyZXR1cm4gci5fY2hhaW49ITAscn07dmFyIEc9ZnVuY3Rpb24obixyKXtyZXR1cm4gbi5fY2hhaW4/aChyKS5jaGFpbigpOnJ9O2gubWl4aW49ZnVuY3Rpb24odCl7cmV0dXJuIGguZWFjaChoLmZ1bmN0aW9ucyh0KSxmdW5jdGlvbihuKXt2YXIgcj1oW25dPXRbbl07aC5wcm90b3R5cGVbbl09ZnVuY3Rpb24oKXt2YXIgbj1bdGhpcy5fd3JhcHBlZF07cmV0dXJuIHUuYXBwbHkobixhcmd1bWVudHMpLEcodGhpcyxyLmFwcGx5KGgsbikpfX0pLGh9LGgubWl4aW4oaCksaC5lYWNoKFtcInBvcFwiLFwicHVzaFwiLFwicmV2ZXJzZVwiLFwic2hpZnRcIixcInNvcnRcIixcInNwbGljZVwiLFwidW5zaGlmdFwiXSxmdW5jdGlvbihyKXt2YXIgdD1lW3JdO2gucHJvdG90eXBlW3JdPWZ1bmN0aW9uKCl7dmFyIG49dGhpcy5fd3JhcHBlZDtyZXR1cm4gdC5hcHBseShuLGFyZ3VtZW50cyksXCJzaGlmdFwiIT09ciYmXCJzcGxpY2VcIiE9PXJ8fDAhPT1uLmxlbmd0aHx8ZGVsZXRlIG5bMF0sRyh0aGlzLG4pfX0pLGguZWFjaChbXCJjb25jYXRcIixcImpvaW5cIixcInNsaWNlXCJdLGZ1bmN0aW9uKG4pe3ZhciByPWVbbl07aC5wcm90b3R5cGVbbl09ZnVuY3Rpb24oKXtyZXR1cm4gRyh0aGlzLHIuYXBwbHkodGhpcy5fd3JhcHBlZCxhcmd1bWVudHMpKX19KSxoLnByb3RvdHlwZS52YWx1ZT1mdW5jdGlvbigpe3JldHVybiB0aGlzLl93cmFwcGVkfSxoLnByb3RvdHlwZS52YWx1ZU9mPWgucHJvdG90eXBlLnRvSlNPTj1oLnByb3RvdHlwZS52YWx1ZSxoLnByb3RvdHlwZS50b1N0cmluZz1mdW5jdGlvbigpe3JldHVybiBTdHJpbmcodGhpcy5fd3JhcHBlZCl9LFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZCYmZGVmaW5lKFwidW5kZXJzY29yZVwiLFtdLGZ1bmN0aW9uKCl7cmV0dXJuIGh9KX0oKTtcclxuIiwiaW1wb3J0IHtleHRyYWN0RXh0ZW5zaW9ufSBmcm9tIFwidXRpbHMvc3RyaW5nc1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGlzUnRtcCA9IGZ1bmN0aW9uIChmaWxlLCB0eXBlKSB7XHJcbiAgICBpZihmaWxlKXtcclxuICAgICAgICByZXR1cm4gKGZpbGUuaW5kZXhPZigncnRtcDonKSA9PSAwIHx8IHR5cGUgPT0gJ3J0bXAnKTtcclxuICAgIH1cclxufTtcclxuZXhwb3J0IGNvbnN0IGlzV2ViUlRDID0gZnVuY3Rpb24gKGZpbGUsIHR5cGUpIHtcclxuICAgIGlmKGZpbGUpe1xyXG4gICAgICAgIHJldHVybiAoZmlsZS5pbmRleE9mKCd3czonKSA9PT0gMCB8fCBmaWxlLmluZGV4T2YoJ3dzczonKSA9PT0gMCB8fCB0eXBlID09PSAnd2VicnRjJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBpc0hscyA9IGZ1bmN0aW9uIChmaWxlLCB0eXBlKSB7XHJcbiAgICBpZihmaWxlKXtcclxuICAgICAgICByZXR1cm4gKCB0eXBlID09PSAnaGxzJyB8fCAgdHlwZSA9PT0gJ20zdTgnIHx8IHR5cGUgPT09ICdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcgfHwgZXh0cmFjdEV4dGVuc2lvbihmaWxlKSA9PSAnbTN1OCcpO1xyXG5cclxuICAgIH1cclxufTtcclxuZXhwb3J0IGNvbnN0IGlzRGFzaCA9IGZ1bmN0aW9uIChmaWxlLCB0eXBlKSB7XHJcbiAgICBpZihmaWxlKXtcclxuICAgICAgICByZXR1cm4gKCB0eXBlID09PSAnbXBkJyB8fCAgdHlwZSA9PT0gJ2Rhc2gnIHx8IHR5cGUgPT09ICdhcHBsaWNhdGlvbi9kYXNoK3htbCcgfHwgZXh0cmFjdEV4dGVuc2lvbihmaWxlKSA9PSAnbXBkJyk7XHJcblxyXG4gICAgfVxyXG59O1xyXG4iLCIvKipcclxuICogdXRpbHMgZm9yIHdlYnBhY2tcclxuICovXHJcblxyXG5leHBvcnQgY29uc3QgZ2V0U2NyaXB0UGF0aCA9IGZ1bmN0aW9uKHNjcmlwdE5hbWUpIHtcclxuICAgIGNvbnN0IHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0Jyk7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNjcmlwdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCBzcmMgPSBzY3JpcHRzW2ldLnNyYztcclxuICAgICAgICBpZiAoc3JjKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gc3JjLmxhc3RJbmRleE9mKCcvJyArIHNjcmlwdE5hbWUpO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNyYy5zdWJzdHIoMCwgaW5kZXggKyAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiAnJztcclxufTtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiAyOS4uXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgdmVyc2lvbiA9IF9fVkVSU0lPTl9fO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9