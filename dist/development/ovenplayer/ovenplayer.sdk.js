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
var version = exports.version = '0.9.0-2021030518-localbuild';

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvQXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvQXBpRXhwYW5zaW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0NvbmZpZ3VyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0V2ZW50RW1pdHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0xhenlDb21tYW5kRXhlY3V0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9TdXBwb3J0Q2hlY2tlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2NhcHRpb24vTG9hZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvY2FwdGlvbi9NYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvY2FwdGlvbi9wYXJzZXIvU3J0UGFyc2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvY29uc3RhbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvbWVkaWEvTWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3BsYXlsaXN0L01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9Db250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL292ZW5wbGF5ZXIuc2RrLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9jYXB0aW9ucy92dHRDdWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL2xpa2VBJC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvc3RyaW5ncy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvdW5kZXJzY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvdmFsaWRhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy93ZWJwYWNrLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92ZXJzaW9uLmpzIl0sIm5hbWVzIjpbIkFwaSIsImNvbnRhaW5lciIsInRoYXQiLCJjb25zb2xlIiwibG9nIiwidmVyc2lvbiIsIk92ZW5QbGF5ZXJDb25zb2xlIiwicGxheWxpc3RNYW5hZ2VyIiwicHJvdmlkZXJDb250cm9sbGVyIiwidXNlckFnZW50T2JqZWN0IiwibWVkaWFNYW5hZ2VyIiwiY3VycmVudFByb3ZpZGVyIiwicGxheWVyQ29uZmlnIiwibGF6eVF1ZXVlIiwiY2FwdGlvbk1hbmFnZXIiLCJ3ZWJydGNSZXRyeSIsIldFQlJUQ19SRVRSWV9DT1VOVCIsIndlYnJ0Y1JldHJ5Q291bnQiLCJ3ZWJydGNSZXRyeUludGVydmFsIiwid2VicnRjUmV0cnlUaW1lciIsInJ1bk5leHRQbGF5bGlzdCIsImluZGV4IiwibmV4dFBsYXlsaXN0SW5kZXgiLCJwbGF5bGlzdCIsImdldFBsYXlsaXN0IiwiaGFzTmV4dFBsYXlsaXN0Iiwic2V0U291cmNlSW5kZXgiLCJzZXRWb2x1bWUiLCJnZXRWb2x1bWUiLCJzZXRDdXJyZW50UGxheWxpc3QiLCJpbml0UHJvdmlkZXIiLCJpc0F1dG9TdGFydCIsInBsYXkiLCJ0cmlnZ2VyIiwiQUxMX1BMQVlMSVNUX0VOREVEIiwibGFzdFBsYXlQb3NpdGlvbiIsInBpY2tRdWFsaXR5RnJvbVNvdXJjZSIsInNvdXJjZXMiLCJxdWFsaXR5IiwiaSIsImxlbmd0aCIsImdldFNvdXJjZUluZGV4IiwibG9hZFByb3ZpZGVycyIsImdldEN1cnJlbnRQbGF5TGlzdCIsInRoZW4iLCJQcm92aWRlcnMiLCJFUlJPUlMiLCJjb2RlcyIsIklOSVRfVU5TVVBQT1JUX0VSUk9SIiwiZGVzdHJveSIsImdldEN1cnJlbnRQbGF5bGlzdEluZGV4IiwiY3VycmVudFNvdXJjZUluZGV4IiwiZ2V0Q3VycmVudFNvdXJjZXMiLCJwcm92aWRlck5hbWUiLCJwcm92aWRlciIsImNyZWF0ZU1lZGlhIiwiZ2V0Q3VycmVudEFkVGFnIiwiUFJPVklERVJfUlRNUCIsIm9uIiwibmFtZSIsImRhdGEiLCJFUlJPUiIsIm9zIiwiYnJvd3NlciIsImNvZGUiLCJQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SIiwic2V0VGltZW91dCIsInNldEN1cnJlbnRTb3VyY2UiLCJnZXRDdXJyZW50U291cmNlIiwiUExBWUVSX1BMQVkiLCJjbGVhckludGVydmFsIiwiTkVUV09SS19VTlNUQUJMRUQiLCJQTEFZRVJfV0VCUlRDX1VORVhQRUNURURfRElTQ09OTkVDVCIsImdldENvbmZpZyIsImF1dG9GYWxsYmFjayIsIlBMQVlFUl9XRUJSVENfTkVUV09SS19TTE9XIiwiZ2V0U291cmNlcyIsInBhdXNlIiwicHJlbG9hZCIsIlJFQURZIiwiZmx1c2giLCJlcnJvciIsIm9mZiIsInRlbXBFcnJvciIsIklOSVRfVU5LTldPTl9FUlJPUiIsImluaXQiLCJvcHRpb25zIiwibWVkaWFDb250YWluZXIiLCJ3ZWJydGNDb25maWciLCJsb2FkaW5nUmV0cnlDb3VudCIsInVuZGVmaW5lZCIsImdldFN5c3RlbVRleHQiLCJhcGkiLCJpbml0UGxheWxpc3QiLCJnZXRQcm92aWRlck5hbWUiLCJnZXROYW1lIiwiZ2V0TXNlSW5zdGFuY2UiLCJnZXRNc2UiLCJnZXRCcm93c2VyIiwic2V0VGltZWNvZGVNb2RlIiwiaXNTaG93IiwiaXNUaW1lY29kZU1vZGUiLCJnZXRGcmFtZXJhdGUiLCJzZWVrRnJhbWUiLCJmcmFtZUNvdW50IiwiZ2V0RHVyYXRpb24iLCJnZXRQb3NpdGlvbiIsInZvbHVtZSIsInNldE11dGUiLCJzdGF0ZSIsImdldE11dGUiLCJsb2FkIiwic2V0Q3VycmVudFF1YWxpdHkiLCJzZWVrIiwicG9zaXRpb24iLCJzZXRQbGF5YmFja1JhdGUiLCJwbGF5YmFja1JhdGUiLCJnZXRQbGF5YmFja1JhdGUiLCJnZXRDdXJyZW50UGxheWxpc3QiLCJnZXRRdWFsaXR5TGV2ZWxzIiwiZ2V0Q3VycmVudFF1YWxpdHkiLCJxdWFsaXR5SW5kZXgiLCJpc0F1dG9RdWFsaXR5Iiwic2V0QXV0b1F1YWxpdHkiLCJpc0F1dG8iLCJnZXRDYXB0aW9uTGlzdCIsImdldEN1cnJlbnRDYXB0aW9uIiwic2V0Q3VycmVudENhcHRpb24iLCJhZGRDYXB0aW9uIiwidHJhY2siLCJyZW1vdmVDYXB0aW9uIiwiZ2V0QnVmZmVyIiwiZ2V0U3RhdGUiLCJzdG9wIiwicmVtb3ZlIiwiREVTVFJPWSIsIk92ZW5QbGF5ZXJTREsiLCJyZW1vdmVQbGF5ZXIiLCJnZXRDb250YWluZXJJZCIsImdldFBsYXllckxpc3QiLCJnZXRWZXJzaW9uIiwiQXBpUnRtcEV4cGFuc2lvbiIsImV4dGVybmFsQ2FsbGJhY2tDcmVlcCIsInJlc3VsdCIsInRyaWdnZXJFdmVudEZyb21FeHRlcm5hbCIsIkNvbmZpZ3VyYXRvciIsImNvbXBvc2VTb3VyY2VPcHRpb25zIiwiRGVmYXVsdHMiLCJwbGF5YmFja1JhdGVzIiwibXV0ZSIsImxvb3AiLCJjb250cm9scyIsImF1dG9TdGFydCIsInRpbWVjb2RlIiwic291cmNlSW5kZXgiLCJoaWRlUGxheWxpc3RJY29uIiwicnRtcEJ1ZmZlclRpbWUiLCJydG1wQnVmZmVyVGltZU1heCIsImFkQ2xpZW50IiwiY3VycmVudFByb3RvY29sT25seSIsInN5c3RlbVRleHQiLCJsYW5nIiwiZXhwYW5kRnVsbFNjcmVlblVJIiwiZnVsbHNjcmVlbk9wdGlvbiIsInNob3dCaWdQbGF5QnV0dG9uIiwic2VyaWFsaXplIiwidmFsIiwibG93ZXJjYXNlVmFsIiwidG9Mb3dlckNhc2UiLCJpc05hTiIsIk51bWJlciIsInBhcnNlRmxvYXQiLCJkZXNlcmlhbGl6ZSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiY29uZmlnIiwidXNlckN1c3R1bVN5c3RlbVRleHQiLCJfIiwiaXNBcnJheSIsImN1cnJlbnRTeXN0ZW1UZXh0IiwiZmluZFdoZXJlIiwiU1lTVEVNX1RFWFQiLCJwdXNoIiwiZmlsdGVyIiwiaXNOdW1iZXIiLCJyYXRlIiwibWFwIiwiTWF0aCIsInJvdW5kIiwiaW5kZXhPZiIsInNvcnQiLCJjb25maWdQbGF5bGlzdCIsIm9iaiIsInBpY2siLCJmZWVkRGF0YSIsImR1cmF0aW9uIiwic3BlYyIsImdldEFkQ2xpZW50Iiwic2V0Q29uZmlnIiwidmFsdWUiLCJnZXRDb250YWluZXIiLCJnZXRRdWFsaXR5TGFiZWwiLCJxdWFsaXR5TGFiZWwiLCJzZXRRdWFsaXR5TGFiZWwiLCJuZXdMYWJlbCIsImlzQ3VycmVudFByb3RvY29sT25seSIsIkNPTlRFTlRfVElNRV9NT0RFX0NIQU5HRUQiLCJnZXRSdG1wQnVmZmVyVGltZSIsImdldFJ0bXBCdWZmZXJUaW1lTWF4IiwiaXNNdXRlIiwiaXNMb29wIiwiaXNDb250cm9scyIsImdldFBsYXliYWNrUmF0ZXMiLCJnZXRMYW5ndWFnZSIsInNldFBsYXlsaXN0IiwiRXZlbnRFbWl0dGVyIiwib2JqZWN0IiwiX2V2ZW50cyIsInRyaWdnZXJFdmVudHMiLCJldmVudHMiLCJhcmdzIiwiY29udGV4dCIsImV2ZW50IiwibGlzdGVuZXIiLCJhcHBseSIsInNsaWNlIiwiY2FsbCIsImFyZ3VtZW50cyIsImFsbEV2ZW50cyIsImFsbCIsIm5hbWVzIiwibCIsInJldGFpbiIsImoiLCJrIiwiX2xpc3RlbmVyIiwib25jZSIsImNvdW50Iiwib25jZUNhbGxiYWNrIiwiTGF6eUNvbW1hbmRFeGVjdXRvciIsImluc3RhbmNlIiwicXVldWVkQ29tbWFuZHMiLCJjb21tYW5kUXVldWUiLCJ1bmRlY29yYXRlZE1ldGhvZHMiLCJleGVjdXRlTW9kZSIsImNvbW1hbmQiLCJtZXRob2QiLCJBcnJheSIsInByb3RvdHlwZSIsImFkZFF1ZXVlIiwiZXhlY3V0ZVF1ZXVlZENvbW1hbmRzIiwic2hpZnQiLCJzZXRFeGVjdXRlTW9kZSIsIm1vZGUiLCJnZXRVbmRlY29yYXRlZE1ldGhvZHMiLCJnZXRRdWV1ZSIsImVtcHR5IiwicmVtb3ZlQW5kRXhjdXRlT25jZSIsImNvbW1hbmRfIiwiY29tbWFuZFF1ZXVlSXRlbSIsInNwbGljZSIsImZpbmRJbmRleCIsIlN1cHBvcnRDaGVja2VyIiwic3VwcG9ydExpc3QiLCJjaGVja1N1cHBvcnQiLCJzb3VyY2UiLCJNaW1lVHlwZXMiLCJhYWMiLCJtcDQiLCJmNHYiLCJtNHYiLCJtb3YiLCJtcDMiLCJtcGVnIiwib2d2Iiwib2dnIiwib2dhIiwidm9yYmlzIiwid2VibSIsImY0YSIsIm0zdTgiLCJtM3UiLCJobHMiLCJ2aWRlbyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNhblBsYXlUeXBlIiwiZmlsZSIsInR5cGUiLCJtaW1lVHlwZSIsIndpbmRvdyIsIk1lZGlhU291cmNlIiwiV2ViS2l0TWVkaWFTb3VyY2UiLCJpc0hsc1N1cHBvcnQiLCJnZXRNZWRpYVNvdXJjZSIsIm1lZGlhU291cmNlIiwic291cmNlQnVmZmVyIiwiU291cmNlQnVmZmVyIiwiV2ViS2l0U291cmNlQnVmZmVyIiwiaXNUeXBlU3VwcG9ydGVkIiwic291cmNlQnVmZmVyVmFsaWRBUEkiLCJhcHBlbmRCdWZmZXIiLCJ0ZXN0Rmxhc2giLCJzdXBwb3J0IiwiQWN0aXZlWE9iamVjdCIsImUiLCJuYXZpZ2F0b3IiLCJtaW1lVHlwZXMiLCJmaW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UiLCJzb3J1Y2VfIiwiZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0IiwicGxheWxpc3RJdGVtIiwic3VwcG9ydE5hbWVzIiwiaXRlbSIsInN1cHBvcnRlZCIsIkxvYWRlciIsImNvbnZlcnRUb1ZUVEN1ZXMiLCJjdWVzIiwiVlRUQ3VlIiwiY3VlIiwic3RhcnQiLCJlbmQiLCJ0ZXh0IiwibGFuZ3VhZ2UiLCJzdWNjZXNzQ2FsbGJhY2siLCJlcnJvckNhbGxiYWNrIiwicmVxdWVzdE9wdGlvbnMiLCJ1cmwiLCJlbmNvZGluZyIsImxvYWRSZXF1ZXN0RG93bmxvZGVyIiwiUmVxdWVzdCIsInJlc3BvbnNlIiwiYm9keSIsInZ0dEN1ZXMiLCJsb2FkVnR0UGFyc2VyIiwicGFyc2VyIiwiV2ViVlRUIiwiUGFyc2VyIiwiU3RyaW5nRGVjb2RlciIsIm9uY3VlIiwib25mbHVzaCIsInBhcnNlIiwibG9hZFNtaVBhcnNlciIsInBhcnNlZERhdGEiLCJTbWlQYXJzZXIiLCJmaXhlZExhbmciLCJyZXF1aXJlIiwiZXJyIiwiaXNTdXBwb3J0Iiwia2luZCIsIk1hbmFnZXIiLCJwbGF5bGlzdEluZGV4IiwiY2FwdGlvbkxpc3QiLCJjdXJyZW50Q2FwdGlvbkluZGV4IiwiY2FwdGlvbkxvYWRlciIsImlzRmlzcnRMb2FkIiwiaXNTaG93aW5nIiwiYmluZFRyYWNrIiwibGFiZWwiLCJpZCIsInRyYWNrc0NvdW50IiwidHJhY2tJZCIsInByZWZpeCIsImRlZmF1bHR0cmFjayIsImNoYW5nZUN1cnJlbnRDYXB0aW9uIiwiQ09OVEVOVF9DQVBUSU9OX0NIQU5HRUQiLCJ0cmFja3MiLCJjYXB0aW9uSWQiLCJQTEFZRVJfQ0FQVElPTl9FUlJPUiIsIkNPTlRFTlRfVElNRSIsIm1ldGEiLCJjdXJyZW50Q3VlcyIsInN0YXJ0VGltZSIsImVuZFRpbWUiLCJDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQiLCJmbHVzaENhcHRpb25MaXN0IiwibGFzdENhcHRpb25JbmRleCIsIl9pbmRleCIsImVycm9ycyIsIl9lbnRyeSIsImVudHJ5IiwiYXJyYXkiLCJzcGxpdCIsImlkeCIsImxpbmUiLCJzdWJzdHIiLCJqb2luIiwiU3J0UGFyc2VyIiwiY2FwdGlvbnMiLCJsaXN0IiwiU1RBVEVfQlVGRkVSSU5HIiwiU1RBVEVfSURMRSIsIlNUQVRFX0NPTVBMRVRFIiwiU1RBVEVfUEFVU0VEIiwiU1RBVEVfUExBWUlORyIsIlNUQVRFX0VSUk9SIiwiU1RBVEVfTE9BRElORyIsIlNUQVRFX1NUQUxMRUQiLCJTVEFURV9BRF9MT0FESU5HIiwiU1RBVEVfQURfTE9BREVEIiwiU1RBVEVfQURfUExBWUlORyIsIlNUQVRFX0FEX1BBVVNFRCIsIlNUQVRFX0FEX0NPTVBMRVRFIiwiU1RBVEVfQURfRVJST1IiLCJQTEFZRVJfQURfQ0xJQ0siLCJQUk9WSURFUl9IVE1MNSIsIlBST1ZJREVSX1dFQlJUQyIsIlBST1ZJREVSX0RBU0giLCJQUk9WSURFUl9ITFMiLCJDT05URU5UX0NPTVBMRVRFIiwiQ09OVEVOVF9TRUVLIiwiQ09OVEVOVF9CVUZGRVJfRlVMTCIsIkRJU1BMQVlfQ0xJQ0siLCJDT05URU5UX0xPQURFRCIsIlBMQVlMSVNUX0NIQU5HRUQiLCJDT05URU5UX1NFRUtFRCIsIkRBU0hfUFJFUEFSRUQiLCJEQVNIX0RFU1RST1lFRCIsIlBMQVlFUl9TVEFURSIsIlBMQVlFUl9DT01QTEVURSIsIlBMQVlFUl9QQVVTRSIsIlBMQVlFUl9DTElDS0VEIiwiUExBWUVSX1JFU0laRUQiLCJQTEFZRVJfTE9BRElORyIsIlBMQVlFUl9GVUxMU0NSRUVOX1JFUVVFU1QiLCJQTEFZRVJfRlVMTFNDUkVFTl9DSEFOR0VEIiwiUExBWUVSX1dBUk5JTkciLCJBRF9DSEFOR0VEIiwiQURfVElNRSIsIkNPTlRFTlRfQlVGRkVSIiwiQ09OVEVOVF9SQVRFX0NIQU5HRSIsIkNPTlRFTlRfVk9MVU1FIiwiQ09OVEVOVF9NVVRFIiwiQ09OVEVOVF9NRVRBIiwiQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCIsIkNPTlRFTlRfTEVWRUxfQ0hBTkdFRCIsIkNPTlRFTlRfRFVSQVRJT05fQ0hBTkdFRCIsIlBMQVlCQUNLX1JBVEVfQ0hBTkdFRCIsIk9NRV9QMlBfTU9ERSIsIkFEX0NMSUVOVF9HT09HTEVJTUEiLCJBRF9DTElFTlRfVkFTVCIsIklOSVRfUlRNUF9TRVRVUF9FUlJPUiIsIklOSVRfREFTSF9VTlNVUFBPUlQiLCJJTklUX0FEU19FUlJPUiIsIklOSVRfREFTSF9OT1RGT1VORCIsIklOSVRfSExTSlNfTk9URk9VTkQiLCJQTEFZRVJfVU5LTldPTl9FUlJPUiIsIlBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUiIsIlBMQVlFUl9VTktOV09OX05FVFdPUktfRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ERUNPREVfRVJST1IiLCJQTEFZRVJfRklMRV9FUlJPUiIsIlBMQVlFUl9CQURfUkVRVUVTVF9FUlJPUiIsIlBMQVlFUl9BVVRIX0ZBSUxFRF9FUlJPUiIsIlBMQVlFUl9OT1RfQUNDRVBUQUJMRV9FUlJPUiIsIlBMQVlFUl9XRUJSVENfV1NfRVJST1IiLCJQTEFZRVJfV0VCUlRDX0FERF9JQ0VDQU5ESURBVEVfRVJST1IiLCJQTEFZRVJfV0VCUlRDX1NFVF9SRU1PVEVfREVTQ19FUlJPUiIsIlBMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUiIsIldBUk5fTVNHX01VVEVEUExBWSIsIlVJX0lDT05TIiwidm9sdW1lX211dGUiLCJvcF93YXJuaW5nIiwiYnJvd3NlckluZm8iLCJTV0ZQYXRoIiwicm9vdElkIiwiZ2V0QXR0cmlidXRlIiwiJGNvbnRhaW5lciIsInZpZGVvRWxlbWVudCIsImNyZWF0ZUh0bWxWaWRlbyIsInNldEF0dHJpYnV0ZSIsImFwcGVuZCIsImNyZWF0ZUZsYXNoVmlkZW8iLCJidWZmZXJUaW1lIiwiYnVmZmVyVGltZU1heCIsIm1vdmllIiwiZmxhc2h2YXJzIiwiYWxsb3dzY3JpcHRhY2Nlc3MiLCJhbGxvd2Z1bGxzY3JlZW4iLCJtZW51IiwicXVhbCIsImJnY29sb3IiLCJ3bW9kZSIsImJyb3dzZXJNYWpvclZlcnNpb24iLCJhcHBlbmRDaGlsZCIsImNyZWF0ZUFkQ29udGFpbmVyIiwiYWRDb250YWluZXIiLCJyZW1vdmVDaGlsZCIsImN1cnJlbnRQbGF5bGlzdEl0ZW0iLCJjdXJyZW50SW5kZXgiLCJzdXBwb3J0Q2hlY2tlciIsIm1ha2VQcmV0dHlTb3VyY2UiLCJzb3VyY2VfIiwiaG9zdCIsImFwcGxpY2F0aW9uIiwic3RyZWFtIiwibWltZXR5cGVSZWdFeCIsInRlc3QiLCJyZXBsYWNlIiwibG93TGF0ZW5jeSIsInByZXR0aWVkUGxheWxpc3QiLCJ0aXRsZSIsImxldmVscyIsInByZXR0eVNvdXJjZSIsImRlZmF1bHRTb3VyY2UiLCJ0b1N0cmluZyIsImV4dHJhY3RPbmx5T25lUHJvdG9jb2wiLCJoaWdoUHJpb3JpdHlUeXBlIiwiY29uY2F0IiwiYWRUYWdVcmwiLCJDb250cm9sbGVyIiwic3VwcG9ydENoYWNrZXIiLCJyZWdpc3RlUHJvdmlkZXIiLCJQcm92aWRlckxvYWRlciIsImh0bWw1IiwiRXJyb3IiLCJ3ZWJydGMiLCJkYXNoIiwicnRtcCIsInN1cHBvcnRlZFByb3ZpZGVyTmFtZXMiLCJQcm9taXNlIiwicmVqZWN0IiwiZmluZEJ5TmFtZSIsImdldFByb3ZpZGVyQnlTb3VyY2UiLCJzdXBwb3J0ZWRQcm92aWRlck5hbWUiLCJpc1NhbWVQcm92aWRlciIsImN1cnJlbnRTb3VyY2UiLCJuZXdTb3VyY2UiLCJleHRyYWN0VmlkZW9FbGVtZW50IiwiZWxlbWVudE9yTXNlIiwiaXNFbGVtZW50IiwiZ2V0VmlkZW9FbGVtZW50IiwibWVkaWEiLCJzZXBhcmF0ZUxpdmUiLCJtc2UiLCJpc0R5bmFtaWMiLCJlcnJvclRyaWdnZXIiLCJzZXRTdGF0ZSIsInBpY2tDdXJyZW50U291cmNlIiwiX193ZWJwYWNrX3B1YmxpY19wYXRoX18iLCJwbGF5ZXJMaXN0IiwiY2hlY2tBbmRHZXRDb250YWluZXJFbGVtZW50IiwiY29udGFpbmVyRWxlbWVudCIsImdldEVsZW1lbnRCeUlkIiwibm9kZVR5cGUiLCJjcmVhdGUiLCJwbGF5ZXJJbnN0YW5jZSIsImdldFBsYXllckJ5Q29udGFpbmVySWQiLCJjb250YWluZXJJZCIsImdldFBsYXllckJ5SW5kZXgiLCJwbGF5ZXJJZCIsImdlbmVyYXRlV2VicnRjVXJscyIsImRlYnVnIiwiaXNEZWJ1Z01vZGUiLCJnZXRCcm93c2VyTGFuZ3VhZ2UiLCJuYXYiLCJicm93c2VyTGFuZ3VhZ2VQcm9wZXJ0eUtleXMiLCJsYW5ndWFnZXMiLCJhbmFsVXNlckFnZW50IiwidW5rbm93biIsInNjcmVlblNpemUiLCJzY3JlZW4iLCJ3aWR0aCIsImhlaWdodCIsIm5WZXIiLCJhcHBWZXJzaW9uIiwibkFndCIsInVzZXJBZ2VudCIsImFwcE5hbWUiLCJtYWpvclZlcnNpb24iLCJwYXJzZUludCIsImlzV2VidmlldyIsIm5hbWVPZmZzZXQiLCJ2ZXJPZmZzZXQiLCJpeCIsInN1YnN0cmluZyIsImxhc3RJbmRleE9mIiwidG9VcHBlckNhc2UiLCJtb2JpbGUiLCJjb29raWVFbmFibGVkIiwiY29va2llIiwiY2xpZW50U3RyaW5ncyIsInMiLCJyIiwiY3MiLCJvc1ZlcnNpb24iLCJleGVjIiwiYnJvd3NlclZlcnNpb24iLCJ1YSIsImNvb2tpZXMiLCJhdXRvS2V5d29yZCIsImRpcmVjdGlvblNldHRpbmciLCJhbGlnblNldHRpbmciLCJmaW5kRGlyZWN0aW9uU2V0dGluZyIsImRpciIsImZpbmRBbGlnblNldHRpbmciLCJhbGlnbiIsImV4dGVuZCIsImNvYmoiLCJwIiwiaXNJRTgiLCJiYXNlT2JqIiwiZW51bWVyYWJsZSIsImhhc0JlZW5SZXNldCIsIl9pZCIsIl9wYXVzZU9uRXhpdCIsIl9zdGFydFRpbWUiLCJfZW5kVGltZSIsIl90ZXh0IiwiX3JlZ2lvbiIsIl92ZXJ0aWNhbCIsIl9zbmFwVG9MaW5lcyIsIl9saW5lIiwiX2xpbmVBbGlnbiIsIl9wb3NpdGlvbiIsIl9wb3NpdGlvbkFsaWduIiwiX3NpemUiLCJfYWxpZ24iLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsInNldCIsIlR5cGVFcnJvciIsInNldHRpbmciLCJTeW50YXhFcnJvciIsImRpc3BsYXlTdGF0ZSIsImdldEN1ZUFzSFRNTCIsImNvbnZlcnRDdWVUb0RPTVRyZWUiLCJMYSQiLCJzZWxlY3Rvck9yRWxlbWVudCIsInJldHVybk5vZGUiLCIkZWxlbWVudCIsInNlbGVjdG9yIiwibm9kZUxpc3QiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZXZlcnkiLCJzaG93Iiwic3R5bGUiLCJkaXNwbGF5IiwiaGlkZSIsImFkZENsYXNzIiwiY2xhc3NMaXN0IiwiYWRkIiwiY2xhc3NOYW1lcyIsImNsYXNzTmFtZSIsImFmdGVyIiwiaHRtbFN0cmluZyIsImluc2VydEFkamFjZW50SFRNTCIsImJlZm9yZSIsImNoaWxkcmVuIiwiY29udGFpbnMiLCJlbENoaWxkIiwiaW5uZXJIVE1MIiwiZmluZCIsImNzcyIsImVsZW1lbnQiLCJyZW1vdmVDbGFzcyIsIlJlZ0V4cCIsInJlbW92ZUF0dHJpYnV0ZSIsImF0dHJOYW1lIiwidGV4dENvbnRlbnQiLCJodG1sIiwiaGFzQ2xhc3MiLCJpcyIsIiR0YXJnZXRFbGVtZW50Iiwib2Zmc2V0IiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInRvcCIsInNjcm9sbFRvcCIsImxlZnQiLCJzY3JvbGxMZWZ0IiwiY2xpZW50V2lkdGgiLCJjbGllbnRIZWlnaHQiLCJhdHRyIiwicmVwbGFjZVdpdGgiLCJwYXJlbnRFbGVtZW50IiwiaGFzQ2hpbGROb2RlcyIsImZpcnN0Q2hpbGQiLCJjbG9zZXN0Iiwic2VsZWN0b3JTdHJpbmciLCJjbG9zZXN0RWxlbWVudCIsInRyaW0iLCJuYXR1cmFsSG1zIiwiaG1zVG9TZWNvbmQiLCJzdHJpbmciLCJleHRyYWN0RXh0ZW5zaW9uIiwicGF0aCIsImdldEF6dXJlRmlsZUZvcm1hdCIsImV4dGVuc2lvbiIsImF6dXJlZEZvcm1hdCIsInNlY29uZCIsInNlY051bSIsImhvdXJzIiwiZmxvb3IiLCJtaW51dGVzIiwic2Vjb25kcyIsInN0ciIsImZyYW1lUmF0ZSIsImFyciIsImFyckxlbmd0aCIsInNlYyIsInNlY0luZGV4IiwibiIsInNlbGYiLCJnbG9iYWwiLCJvIiwiU3ltYm9sIiwidSIsImMiLCJoYXNPd25Qcm9wZXJ0eSIsInQiLCJhIiwiZiIsImgiLCJfd3JhcHBlZCIsImV4cG9ydHMiLCJtb2R1bGUiLCJWRVJTSU9OIiwidiIsInkiLCJkIiwiaXRlcmF0ZWUiLCJpZGVudGl0eSIsImlzRnVuY3Rpb24iLCJpc09iamVjdCIsIm1hdGNoZXIiLCJwcm9wZXJ0eSIsImciLCJtYXgiLCJtIiwiYiIsIngiLCJwb3ciLCJBIiwidyIsImVhY2giLCJjb2xsZWN0IiwiTyIsInJlZHVjZSIsImZvbGRsIiwiaW5qZWN0IiwicmVkdWNlUmlnaHQiLCJmb2xkciIsImRldGVjdCIsImZpbmRLZXkiLCJzZWxlY3QiLCJuZWdhdGUiLCJzb21lIiwiYW55IiwiaW5jbHVkZXMiLCJpbmNsdWRlIiwidmFsdWVzIiwiaW52b2tlIiwicGx1Y2siLCJ3aGVyZSIsIm1pbiIsInNodWZmbGUiLCJzYW1wbGUiLCJyYW5kb20iLCJjbG9uZSIsInNvcnRCeSIsImNyaXRlcmlhIiwiZ3JvdXBCeSIsImluZGV4QnkiLCJjb3VudEJ5IiwiUyIsInRvQXJyYXkiLCJpc1N0cmluZyIsIm1hdGNoIiwic2l6ZSIsInBhcnRpdGlvbiIsImZpcnN0IiwiaGVhZCIsInRha2UiLCJpbml0aWFsIiwibGFzdCIsInJlc3QiLCJ0YWlsIiwiZHJvcCIsImNvbXBhY3QiLCJCb29sZWFuIiwiTSIsImlzQXJndW1lbnRzIiwiZmxhdHRlbiIsIndpdGhvdXQiLCJkaWZmZXJlbmNlIiwidW5pcSIsInVuaXF1ZSIsImlzQm9vbGVhbiIsInVuaW9uIiwiaW50ZXJzZWN0aW9uIiwidW56aXAiLCJ6aXAiLCJGIiwiZmluZExhc3RJbmRleCIsInNvcnRlZEluZGV4IiwiRSIsInJhbmdlIiwiY2VpbCIsImNodW5rIiwiTiIsImJpbmQiLCJwYXJ0aWFsIiwicGxhY2Vob2xkZXIiLCJiaW5kQWxsIiwibWVtb2l6ZSIsImNhY2hlIiwiZGVsYXkiLCJkZWZlciIsInRocm90dGxlIiwibGVhZGluZyIsIm5vdyIsImNsZWFyVGltZW91dCIsInRyYWlsaW5nIiwiY2FuY2VsIiwiZGVib3VuY2UiLCJ3cmFwIiwiY29tcG9zZSIsInJlc3RBcmd1bWVudHMiLCJJIiwicHJvcGVydHlJc0VudW1lcmFibGUiLCJUIiwiQiIsImNvbnN0cnVjdG9yIiwiYWxsS2V5cyIsIm1hcE9iamVjdCIsInBhaXJzIiwiaW52ZXJ0IiwiZnVuY3Rpb25zIiwibWV0aG9kcyIsIlIiLCJleHRlbmRPd24iLCJhc3NpZ24iLCJxIiwiSyIsInoiLCJvbWl0IiwiU3RyaW5nIiwiZGVmYXVsdHMiLCJ0YXAiLCJpc01hdGNoIiwidmFsdWVPZiIsInBvcCIsImlzRXF1YWwiLCJpc0VtcHR5IiwiRCIsImNoaWxkTm9kZXMiLCJJbnQ4QXJyYXkiLCJpc0Zpbml0ZSIsImlzU3ltYm9sIiwiaXNOdWxsIiwiaXNVbmRlZmluZWQiLCJoYXMiLCJub0NvbmZsaWN0IiwiY29uc3RhbnQiLCJub29wIiwicHJvcGVydHlPZiIsIm1hdGNoZXMiLCJ0aW1lcyIsIkRhdGUiLCJnZXRUaW1lIiwiTCIsIlAiLCJXIiwiZXNjYXBlIiwidW5lc2NhcGUiLCJDIiwidW5pcXVlSWQiLCJ0ZW1wbGF0ZVNldHRpbmdzIiwiZXZhbHVhdGUiLCJpbnRlcnBvbGF0ZSIsIkoiLCJVIiwiViIsIiQiLCJ0ZW1wbGF0ZSIsInZhcmlhYmxlIiwiRnVuY3Rpb24iLCJjaGFpbiIsIl9jaGFpbiIsIkciLCJtaXhpbiIsInRvSlNPTiIsImRlZmluZSIsImlzUnRtcCIsImlzV2ViUlRDIiwiaXNIbHMiLCJpc0Rhc2giLCJnZXRTY3JpcHRQYXRoIiwic2NyaXB0TmFtZSIsInNjcmlwdHMiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInNyYyIsIl9fVkVSU0lPTl9fIl0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7UUFDQTtRQUNBOzs7UUFHQTtRQUNBO1FBQ0E7UUFDQSxRQUFRLG9CQUFvQjtRQUM1QjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOztRQUVBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7OztRQUlBO1FBQ0E7UUFDQSx5Q0FBeUMsczRCQUFzNEI7UUFDLzZCOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7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RCxJQUFILEVBQVE7QUFDSixlQUFTQyxTQUFTLEtBQVQsSUFBbUJBLFNBQVMsTUFBNUIsSUFBc0NBLFNBQVMsK0JBQS9DLElBQWtGLCtCQUFpQkQsSUFBakIsS0FBMEIsTUFBckg7QUFFSDtBQUNKLENBTE07QUFNQSxJQUFNdWxCLDBCQUFTLFNBQVRBLE1BQVMsQ0FBVXZsQixJQUFWLEVBQWdCQyxJQUFoQixFQUFzQjtBQUN4QyxRQUFHRCxJQUFILEVBQVE7QUFDSixlQUFTQyxTQUFTLEtBQVQsSUFBbUJBLFNBQVMsTUFBNUIsSUFBc0NBLFNBQVMsc0JBQS9DLElBQXlFLCtCQUFpQkQsSUFBakIsS0FBMEIsS0FBNUc7QUFFSDtBQUNKLENBTE0sQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQlA7Ozs7QUFJTyxJQUFNd2xCLHdDQUFnQixTQUFoQkEsYUFBZ0IsQ0FBU0MsVUFBVCxFQUFxQjtBQUM5QyxRQUFNQyxVQUFVN2xCLFNBQVM4bEIsb0JBQVQsQ0FBOEIsUUFBOUIsQ0FBaEI7QUFDQSxTQUFLLElBQUlyMUIsSUFBSSxDQUFiLEVBQWdCQSxJQUFJbzFCLFFBQVFuMUIsTUFBNUIsRUFBb0NELEdBQXBDLEVBQXlDO0FBQ3JDLFlBQU1zMUIsTUFBTUYsUUFBUXAxQixDQUFSLEVBQVdzMUIsR0FBdkI7QUFDQSxZQUFJQSxHQUFKLEVBQVM7QUFDTCxnQkFBTXgyQixRQUFRdzJCLElBQUk1VCxXQUFKLENBQWdCLE1BQU15VCxVQUF0QixDQUFkO0FBQ0EsZ0JBQUlyMkIsU0FBUyxDQUFiLEVBQWdCO0FBQ1osdUJBQU93MkIsSUFBSTFmLE1BQUosQ0FBVyxDQUFYLEVBQWM5VyxRQUFRLENBQXRCLENBQVA7QUFDSDtBQUNKO0FBQ0o7QUFDRCxXQUFPLEVBQVA7QUFDSCxDQVpNLEM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSlA7OztBQUdPLElBQU1oQiw0QkFBVXkzQiw2QkFBaEIsQyIsImZpbGUiOiJvdmVucGxheWVyLnNkay5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuXG5cbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCByZXNvbHZlcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdHJlc29sdmVzLnB1c2goaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKTtcbiBcdFx0XHR9XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oZGF0YSk7XG5cbiBcdFx0d2hpbGUocmVzb2x2ZXMubGVuZ3RoKSB7XG4gXHRcdFx0cmVzb2x2ZXMuc2hpZnQoKSgpO1xuIFx0XHR9XG5cbiBcdH07XG5cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuIFx0Ly8gUHJvbWlzZSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdFwib3ZlbnBsYXllci5zZGtcIjogMFxuIFx0fTtcblxuXG5cbiBcdC8vIHNjcmlwdCBwYXRoIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBqc29ucFNjcmlwdFNyYyhjaHVua0lkKSB7XG4gXHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgKHtcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IdG1sNX5vdmVucGxheWV+MmVjMTkzYWNcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IdG1sNX5vdmVucGxheWV+MmVjMTkzYWNcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IdG1sNX5vdmVucGxheWV+N2FmZDY4Y2ZcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IdG1sNX5vdmVucGxheWV+N2FmZDY4Y2ZcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlclwiLFwib3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlclwiOlwib3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlclwiLFwib3ZlbnBsYXllci5wcm92aWRlci5IdG1sNVwiOlwib3ZlbnBsYXllci5wcm92aWRlci5IdG1sNVwiLFwib3ZlbnBsYXllci5wcm92aWRlci5XZWJSVENQcm92aWRlclwiOlwib3ZlbnBsYXllci5wcm92aWRlci5XZWJSVENQcm92aWRlclwiLFwib3ZlbnBsYXllci5wcm92aWRlci5SdG1wUHJvdmlkZXJcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuUnRtcFByb3ZpZGVyXCIsXCJzbWlwYXJzZXJcIjpcInNtaXBhcnNlclwiLFwidmVuZG9yc35kb3dubG9hZGVyXCI6XCJ2ZW5kb3JzfmRvd25sb2FkZXJcIixcImRvd25sb2FkZXJcIjpcImRvd25sb2FkZXJcIixcInZ0dHBhcnNlclwiOlwidnR0cGFyc2VyXCJ9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLmpzXCJcbiBcdH1cblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCkge1xuIFx0XHR2YXIgcHJvbWlzZXMgPSBbXTtcblxuXG4gXHRcdC8vIEpTT05QIGNodW5rIGxvYWRpbmcgZm9yIGphdmFzY3JpcHRcblxuIFx0XHR2YXIgaW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIHsgLy8gMCBtZWFucyBcImFscmVhZHkgaW5zdGFsbGVkXCIuXG5cbiBcdFx0XHQvLyBhIFByb21pc2UgbWVhbnMgXCJjdXJyZW50bHkgbG9hZGluZ1wiLlxuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0pO1xuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHQvLyBzZXR1cCBQcm9taXNlIGluIGNodW5rIGNhY2hlXG4gXHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XTtcbiBcdFx0XHRcdH0pO1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0gPSBwcm9taXNlKTtcblxuIFx0XHRcdFx0Ly8gc3RhcnQgY2h1bmsgbG9hZGluZ1xuIFx0XHRcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuIFx0XHRcdFx0dmFyIG9uU2NyaXB0Q29tcGxldGU7XG5cbiBcdFx0XHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04JztcbiBcdFx0XHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuIFx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcbiBcdFx0XHRcdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c2NyaXB0LnNyYyA9IGpzb25wU2NyaXB0U3JjKGNodW5rSWQpO1xuXG4gXHRcdFx0XHQvLyBjcmVhdGUgZXJyb3IgYmVmb3JlIHN0YWNrIHVud291bmQgdG8gZ2V0IHVzZWZ1bCBzdGFja3RyYWNlIGxhdGVyXG4gXHRcdFx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoKTtcbiBcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiBcdFx0XHRcdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuIFx0XHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuIFx0XHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG4gXHRcdFx0XHRcdHZhciBjaHVuayA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0XHRcdFx0aWYoY2h1bmsgIT09IDApIHtcbiBcdFx0XHRcdFx0XHRpZihjaHVuaykge1xuIFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcbiBcdFx0XHRcdFx0XHRcdHZhciByZWFsU3JjID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmM7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5tZXNzYWdlID0gJ0xvYWRpbmcgY2h1bmsgJyArIGNodW5rSWQgKyAnIGZhaWxlZC5cXG4oJyArIGVycm9yVHlwZSArICc6ICcgKyByZWFsU3JjICsgJyknO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IubmFtZSA9ICdDaHVua0xvYWRFcnJvcic7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci50eXBlID0gZXJyb3JUeXBlO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG4gXHRcdFx0XHRcdFx0XHRjaHVua1sxXShlcnJvcik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fTtcbiBcdFx0XHRcdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuIFx0XHRcdFx0XHRvblNjcmlwdENvbXBsZXRlKHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KTtcbiBcdFx0XHRcdH0sIDEyMDAwMCk7XG4gXHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlO1xuIFx0XHRcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBvbiBlcnJvciBmdW5jdGlvbiBmb3IgYXN5bmMgbG9hZGluZ1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikgeyBjb25zb2xlLmVycm9yKGVycik7IHRocm93IGVycjsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9qcy9vdmVucGxheWVyLnNkay5qc1wiKTtcbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdGlmICghbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxuXHRcdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcblx0fVxuXHRyZXR1cm4gbW9kdWxlO1xufTtcbiIsImltcG9ydCBDYXB0aW9uTWFuYWdlciBmcm9tIFwiYXBpL2NhcHRpb24vTWFuYWdlclwiO1xyXG5pbXBvcnQgQ29uZmlndXJhdG9yIGZyb20gXCJhcGkvQ29uZmlndXJhdG9yXCI7XHJcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImFwaS9FdmVudEVtaXR0ZXJcIjtcclxuaW1wb3J0IExhenlDb21tYW5kRXhlY3V0b3IgZnJvbSBcImFwaS9MYXp5Q29tbWFuZEV4ZWN1dG9yXCI7XHJcbmltcG9ydCBNZWRpYU1hbmFnZXIgZnJvbSBcImFwaS9tZWRpYS9NYW5hZ2VyXCI7XHJcbmltcG9ydCBQbGF5bGlzdE1hbmFnZXIgZnJvbSBcImFwaS9wbGF5bGlzdC9NYW5hZ2VyXCI7XHJcbmltcG9ydCBQcm92aWRlckNvbnRyb2xsZXIgZnJvbSBcImFwaS9wcm92aWRlci9Db250cm9sbGVyXCI7XHJcbmltcG9ydCB7UkVBRFksIEVSUk9SUywgRVJST1IsIENPTlRFTlRfVElNRV9NT0RFX0NIQU5HRUQsIElOSVRfVU5LTldPTl9FUlJPUiwgSU5JVF9VTlNVUFBPUlRfRVJST1IsIERFU1RST1ksIFBMQVlFUl9QTEFZLCBORVRXT1JLX1VOU1RBQkxFRCwgUExBWUVSX1dFQlJUQ19ORVRXT1JLX1NMT1csIFBMQVlFUl9XRUJSVENfVU5FWFBFQ1RFRF9ESVNDT05ORUNULCBQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SLFxyXG4gICAgUExBWUVSX0ZJTEVfRVJST1IsIFBST1ZJREVSX0RBU0gsIFBST1ZJREVSX0hMUywgUFJPVklERVJfV0VCUlRDLCBQUk9WSURFUl9IVE1MNSwgUFJPVklERVJfUlRNUCwgQUxMX1BMQVlMSVNUX0VOREVEfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQge3ZlcnNpb259IGZyb20gJ3ZlcnNpb24nO1xyXG5pbXBvcnQge0FwaVJ0bXBFeHBhbnNpb259IGZyb20gJ2FwaS9BcGlFeHBhbnNpb25zJztcclxuaW1wb3J0IHthbmFsVXNlckFnZW50fSBmcm9tIFwidXRpbHMvYnJvd3NlclwiO1xyXG5pbXBvcnQge3BpY2tDdXJyZW50U291cmNlfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XHJcbmltcG9ydCBMQSQgZnJvbSAndXRpbHMvbGlrZUEkJztcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBUaGlzIG9iamVjdCBjb25uZWN0cyBVSSB0byB0aGUgcHJvdmlkZXIuXHJcbiAqIEBwYXJhbSAgIHtvYmplY3R9ICAgIGNvbnRhaW5lciAgZG9tIGVsZW1lbnRcclxuICpcclxuICogKi9cclxuXHJcbmNvbnN0IEFwaSA9IGZ1bmN0aW9uKGNvbnRhaW5lcil7XHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICBFdmVudEVtaXR0ZXIodGhhdCk7XHJcblxyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiW1tPdmVuUGxheWVyXV0gdi5cIisgdmVyc2lvbik7XHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgbG9hZGVkLlwiKTtcclxuXHJcbiAgICBsZXQgcGxheWxpc3RNYW5hZ2VyID0gUGxheWxpc3RNYW5hZ2VyKHRoYXQpO1xyXG4gICAgbGV0IHByb3ZpZGVyQ29udHJvbGxlciA9IFByb3ZpZGVyQ29udHJvbGxlcigpO1xyXG4gICAgbGV0IHVzZXJBZ2VudE9iamVjdCA9IGFuYWxVc2VyQWdlbnQoKTtcclxuICAgIGxldCBtZWRpYU1hbmFnZXIgPSBNZWRpYU1hbmFnZXIoY29udGFpbmVyLCB1c2VyQWdlbnRPYmplY3QpO1xyXG4gICAgbGV0IGN1cnJlbnRQcm92aWRlciA9IFwiXCI7XHJcbiAgICBsZXQgcGxheWVyQ29uZmlnID0gXCJcIjtcclxuICAgIGxldCBsYXp5UXVldWUgPSBcIlwiO1xyXG4gICAgbGV0IGNhcHRpb25NYW5hZ2VyID0gXCJcIjtcclxuXHJcbiAgICBsZXQgd2VicnRjUmV0cnkgPSBmYWxzZTtcclxuICAgIGxldCBXRUJSVENfUkVUUllfQ09VTlQgPSAzO1xyXG4gICAgbGV0IHdlYnJ0Y1JldHJ5Q291bnQgPSBXRUJSVENfUkVUUllfQ09VTlQ7XHJcbiAgICBsZXQgd2VicnRjUmV0cnlJbnRlcnZhbCA9IDEwMDA7XHJcbiAgICBsZXQgd2VicnRjUmV0cnlUaW1lciA9IG51bGw7XHJcblxyXG5cclxuICAgIGNvbnN0IHJ1bk5leHRQbGF5bGlzdCA9IGZ1bmN0aW9uKGluZGV4KXtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJydW5OZXh0UGxheWxpc3RcIik7XHJcbiAgICAgICAgbGV0IG5leHRQbGF5bGlzdEluZGV4ID0gaW5kZXg7IC8vIHx8IHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50UGxheWxpc3RJbmRleCgpICsgMTtcclxuICAgICAgICBsZXQgcGxheWxpc3QgPSBwbGF5bGlzdE1hbmFnZXIuZ2V0UGxheWxpc3QoKTtcclxuICAgICAgICBsZXQgaGFzTmV4dFBsYXlsaXN0ID0gcGxheWxpc3RbbmV4dFBsYXlsaXN0SW5kZXhdPyB0cnVlIDogZmFsc2U7XHJcbiAgICAgICAgLy9pbml0IHNvdXJjZSBpbmRleFxyXG4gICAgICAgIHBsYXllckNvbmZpZy5zZXRTb3VyY2VJbmRleCgwKTtcclxuXHJcbiAgICAgICAgLy9zZXQgR29sYmFsIFZvbHVtZSBpbmZvXHJcbiAgICAgICAgcGxheWVyQ29uZmlnLnNldFZvbHVtZShjdXJyZW50UHJvdmlkZXIuZ2V0Vm9sdW1lKCkpO1xyXG5cclxuICAgICAgICBpZihoYXNOZXh0UGxheWxpc3Qpe1xyXG4gICAgICAgICAgICAvL3RoYXQucGF1c2UoKTtcclxuICAgICAgICAgICAgbGF6eVF1ZXVlID0gTGF6eUNvbW1hbmRFeGVjdXRvcih0aGF0LCBbJ3BsYXknLCdzZWVrJywnc3RvcCddKTtcclxuICAgICAgICAgICAgcGxheWxpc3RNYW5hZ2VyLnNldEN1cnJlbnRQbGF5bGlzdChuZXh0UGxheWxpc3RJbmRleCk7XHJcbiAgICAgICAgICAgIGluaXRQcm92aWRlcigpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGlmKCFwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSl7XHJcbiAgICAgICAgICAgICAgICAvL0FueXdheSBuZXh0cGxheWxpc3QgcnVucyBhdXRvU3RhcnQhLlxyXG4gICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgLy9BbGwgUGxheWxpc3QgRW5kZWQuXHJcbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihBTExfUExBWUxJU1RfRU5ERUQsIG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBjb25zdCBpbml0UHJvdmlkZXIgPSBmdW5jdGlvbihsYXN0UGxheVBvc2l0aW9uKXtcclxuICAgICAgICBjb25zdCBwaWNrUXVhbGl0eUZyb21Tb3VyY2UgPSAoc291cmNlcykgPT57XHJcbiAgICAgICAgICAgIHZhciBxdWFsaXR5ID0gMDtcclxuICAgICAgICAgICAgaWYgKHNvdXJjZXMpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzb3VyY2VzW2ldLmRlZmF1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcXVhbGl0eSA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0U291cmNlSW5kZXgoKSA9PT0gaSApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8qaWYgKHBsYXllckNvbmZpZy5nZXRTb3VyY2VMYWJlbCgpICYmIHNvdXJjZXNbaV0ubGFiZWwgPT09IHBsYXllckNvbmZpZy5nZXRTb3VyY2VMYWJlbCgpICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgICAgICAgICB9Ki9cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcXVhbGl0eTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gcHJvdmlkZXJDb250cm9sbGVyLmxvYWRQcm92aWRlcnMocGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRQbGF5TGlzdCgpKS50aGVuKFByb3ZpZGVycyA9PiB7XHJcblxyXG4gICAgICAgICAgICBpZihQcm92aWRlcnMubGVuZ3RoIDwgMSl7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBFUlJPUlMuY29kZXNbSU5JVF9VTlNVUFBPUlRfRVJST1JdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihjdXJyZW50UHJvdmlkZXIpe1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlciA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoY2FwdGlvbk1hbmFnZXIpe1xyXG4gICAgICAgICAgICAgICAgY2FwdGlvbk1hbmFnZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgY2FwdGlvbk1hbmFnZXIgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhcHRpb25NYW5hZ2VyID0gQ2FwdGlvbk1hbmFnZXIodGhhdCwgcGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRQbGF5bGlzdEluZGV4KCkpO1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpbml0KCkgY2FwdGlvbnNcIik7XHJcblxyXG4gICAgICAgICAgICBsZXQgY3VycmVudFNvdXJjZUluZGV4ID0gcGlja0N1cnJlbnRTb3VyY2UocGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRTb3VyY2VzKCksIHBsYXllckNvbmZpZyk7XHJcbiAgICAgICAgICAgIGxldCBwcm92aWRlck5hbWUgPSBQcm92aWRlcnNbY3VycmVudFNvdXJjZUluZGV4XVtcIm5hbWVcIl07XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGluaXQoKSBwcm92aWRlclwiLCBwcm92aWRlck5hbWUpO1xyXG4gICAgICAgICAgICAvL0luaXQgUHJvdmlkZXIuXHJcbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlciA9ICBQcm92aWRlcnNbY3VycmVudFNvdXJjZUluZGV4XS5wcm92aWRlcihcclxuICAgICAgICAgICAgICAgIG1lZGlhTWFuYWdlci5jcmVhdGVNZWRpYShwcm92aWRlck5hbWUsIHBsYXllckNvbmZpZyksXHJcbiAgICAgICAgICAgICAgICBwbGF5ZXJDb25maWcsXHJcbiAgICAgICAgICAgICAgICBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudEFkVGFnKClcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHByb3ZpZGVyTmFtZSA9PT0gUFJPVklERVJfUlRNUCl7XHJcbiAgICAgICAgICAgICAgICAvL0lmIHByb3ZpZGVyIHR5cGUgaXMgUlRNUCwgd2UgYWNjZXB0cyBSdG1wRXhwYW5zaW9uLlxyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGF0LCBBcGlSdG1wRXhwYW5zaW9uKGN1cnJlbnRQcm92aWRlcikpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL1RoaXMgcGFzc2VzIHRoZSBldmVudCBjcmVhdGVkIGJ5IHRoZSBQcm92aWRlciB0byBBUEkuXHJcbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5vbihcImFsbFwiLCBmdW5jdGlvbihuYW1lLCBkYXRhKXtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiggbmFtZSA9PT0gRVJST1IpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2hyb21lID49ODAgb24gQW5kcm9pZCBtaXNzZXMgaDI0NiBpbiBTRFAgd2hlbiBmaXJzdCB0aW1lIGFmdGVyIHdlYiBwYWdlIGxvYWRlZC5cclxuICAgICAgICAgICAgICAgICAgICAvLyBTbyB3YWl0IHVudGlsIGJyb3dzZXIgZ2V0IGgyNjQgY2FwYWJpbGl0aWVzIGFuZCBjcmVhdGUgYW5zd2VyIFNEUC5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodXNlckFnZW50T2JqZWN0Lm9zID09PSAnQW5kcm9pZCcgJiYgdXNlckFnZW50T2JqZWN0LmJyb3dzZXIgPT09ICdDaHJvbWUnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLmNvZGUgJiYgZGF0YS5jb2RlID09PSBQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0Q3VycmVudFNvdXJjZSh0aGF0LmdldEN1cnJlbnRTb3VyY2UoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB3ZWJydGNSZXRyeUludGVydmFsKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKG5hbWUsIGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKG5hbWUgPT09IFwiY29tcGxldGVcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgcnVuTmV4dFBsYXlsaXN0KHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50UGxheWxpc3RJbmRleCgpICsgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYobmFtZSA9PT0gUExBWUVSX1BMQVkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHdlYnJ0Y1JldHJ5VGltZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHdlYnJ0Y1JldHJ5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgd2VicnRjUmV0cnlDb3VudCA9IFdFQlJUQ19SRVRSWV9DT1VOVDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL0F1dG8gc3dpdGNoaW5nIG5leHQgc291cmNlIHdoZW4gcGxheWVyIGxvYWQgZmFpbGVkIGJ5IGFtaXNzIHNvdXJjZS5cclxuICAgICAgICAgICAgICAgIC8vZGF0YS5jb2RlID09PSBQTEFZRVJfRklMRV9FUlJPUlxyXG4gICAgICAgICAgICAgICAgaWYoIG5hbWUgPT09IEVSUk9SIHx8IG5hbWUgPT09IE5FVFdPUktfVU5TVEFCTEVEICl7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmNvZGUgPT09IFBMQVlFUl9XRUJSVENfVU5FWFBFQ1RFRF9ESVNDT05ORUNUXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8ICghcGxheWVyQ29uZmlnLmdldENvbmZpZygpLmF1dG9GYWxsYmFjayAmJiBkYXRhLmNvZGUgPT09IFBMQVlFUl9XRUJSVENfTkVUV09SS19TTE9XKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF3ZWJydGNSZXRyeSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlYnJ0Y1JldHJ5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlYnJ0Y1JldHJ5Q291bnQgPSBXRUJSVENfUkVUUllfQ09VTlQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAod2VicnRjUmV0cnkgJiYgd2VicnRjUmV0cnlDb3VudCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlYnJ0Y1JldHJ5VGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldEN1cnJlbnRTb3VyY2UocGxheWVyQ29uZmlnLmdldFNvdXJjZUluZGV4KCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VicnRjUmV0cnlDb3VudCAtLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgd2VicnRjUmV0cnlJbnRlcnZhbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAod2VicnRjUmV0cnkgJiYgd2VicnRjUmV0cnlDb3VudCA8PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHdlYnJ0Y1JldHJ5VGltZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWJydGNSZXRyeSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWJydGNSZXRyeUNvdW50ID0gV0VCUlRDX1JFVFJZX0NPVU5UO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmdldENvbmZpZygpLmF1dG9GYWxsYmFjayAmJiBwbGF5ZXJDb25maWcuZ2V0U291cmNlSW5kZXgoKSsxIDwgdGhhdC5nZXRTb3VyY2VzKCkubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzIHNlcXVlbnRpYWwgaGFzIGF2YWlsYWJsZSBzb3VyY2UuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQucGF1c2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRDdXJyZW50U291cmNlKHBsYXllckNvbmZpZy5nZXRTb3VyY2VJbmRleCgpKzEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pLnRoZW4oKCk9PntcclxuXHJcbiAgICAgICAgICAgIC8vcHJvdmlkZXIncyBwcmVsb2FkKCkgaGF2ZSB0byBtYWRlIFByb21pc2UuIEN1eiBpdCBvdmVyY29tZXMgJ2ZsYXNoIGxvYWRpbmcgdGltaW5nIHByb2JsZW0nLlxyXG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIucHJlbG9hZChwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKSwgbGFzdFBsYXlQb3NpdGlvbikudGhlbihmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihSRUFEWSk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGF6eVF1ZXVlLmZsdXNoKCk7XHJcbiAgICAgICAgICAgICAgICAvL1RoaXMgaXMgbm8gcmVhc29uIHRvIGV4aXN0IGFueW1vcmUuXHJcbiAgICAgICAgICAgICAgICBsYXp5UXVldWUuZGVzdHJveSgpO1xyXG5cclxuICAgICAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsYXp5UXVldWUub2ZmKCk7XHJcbiAgICAgICAgICAgICAgICBpZihlcnJvciAmJiBlcnJvci5jb2RlICYmIEVSUk9SUy5jb2Rlc1tlcnJvci5jb2RlXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKEVSUk9SLCBFUlJPUlMuY29kZXNbZXJyb3IuY29kZV0pO1xyXG4gICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbSU5JVF9VTktOV09OX0VSUk9SXTtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoRVJST1IsIHRlbXBFcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAvL0lOSVQgRVJST1JcclxuICAgICAgICAgICAgaWYoZXJyb3IgJiYgZXJyb3IuY29kZSAmJiBFUlJPUlMuY29kZXNbZXJyb3IuY29kZV0pe1xyXG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKEVSUk9SLCBFUlJPUlMuY29kZXNbZXJyb3IuY29kZV0pO1xyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW0lOSVRfVU5LTldPTl9FUlJPUl07XHJcbiAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihFUlJPUiwgdGVtcEVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy94eHggOiBJZiB5b3UgaW5pdCBlbXB0eSBzb3VyY2VzLiAoSSB0aGluayB0aGlzIGlzIHN0cmFuZ2UgY2FzZS4pXHJcbiAgICAgICAgICAgIC8vVGhpcyB3b3JrcyBmb3IgdGhpcyBjYXNlLlxyXG4gICAgICAgICAgICAvL3BsYXllciA9IE92ZW5QbGF5ZXIuY3JlYXRlKFwiZWxJZFwiLCB7fSk7XHJcbiAgICAgICAgICAgIC8vcGxheWVyLmxvYWQoc29ydWNlcyk7XHJcbiAgICAgICAgICAgIGxhenlRdWV1ZS5vZmYoKTtcclxuICAgICAgICAgICAgLy9sYXp5UXVldWUucmVtb3ZlQW5kRXhjdXRlT25jZShcImxvYWRcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFQSSDstIjquLDtmZQg7ZWo7IiYXHJcbiAgICAgKiBpbml0XHJcbiAgICAgKiBAcGFyYW0gICAgICB7b2JqZWN0fSBvcHRpb25zIHBsYXllciBpbml0aWFsIG9wdGlvbiB2YWx1ZS5cclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiovXHJcbiAgICB0aGF0LmluaXQgPSAob3B0aW9ucykgPT57XHJcbiAgICAgICAgLy9JdCBjb2xsZWN0cyB0aGUgY29tbWFuZHMgYW5kIGV4ZWN1dGVzIHRoZW0gYXQgdGhlIHRpbWUgd2hlbiB0aGV5IGFyZSBleGVjdXRhYmxlLlxyXG4gICAgICAgIGxhenlRdWV1ZSA9IExhenlDb21tYW5kRXhlY3V0b3IodGhhdCwgW1xyXG4gICAgICAgICAgICAnbG9hZCcsJ3BsYXknLCdwYXVzZScsJ3NlZWsnLCdzdG9wJywgJ2dldER1cmF0aW9uJywgJ2dldFBvc2l0aW9uJywgJ2dldFZvbHVtZSdcclxuICAgICAgICAgICAgLCAnZ2V0TXV0ZScsICdnZXRCdWZmZXInLCAnZ2V0U3RhdGUnICwgJ2dldFF1YWxpdHlMZXZlbHMnXHJcbiAgICAgICAgXSk7XHJcbiAgICAgICAgb3B0aW9ucy5tZWRpYUNvbnRhaW5lciA9IGNvbnRhaW5lcjtcclxuICAgICAgICBvcHRpb25zLmJyb3dzZXIgPSB1c2VyQWdlbnRPYmplY3Q7XHJcbiAgICAgICAgcGxheWVyQ29uZmlnID0gQ29uZmlndXJhdG9yKG9wdGlvbnMsIHRoYXQpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGluaXQoKVwiKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpbml0KCkgY29uZmlnIDogXCIsIHBsYXllckNvbmZpZyk7XHJcblxyXG4gICAgICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkud2VicnRjQ29uZmlnICYmIHBsYXllckNvbmZpZy5nZXRDb25maWcoKS53ZWJydGNDb25maWcubG9hZGluZ1JldHJ5Q291bnQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBXRUJSVENfUkVUUllfQ09VTlQgPSBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkubG9hZGluZ1JldHJ5Q291bnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL05vdCB3b3JraW5nIDogU3ludGF4RXJyb3I6IFwiRVJST1JTLmNvZGVzXCIgaXMgcmVhZC1vbmx5XHJcbiAgICAgICAgRVJST1JTLmNvZGVzID0gcGxheWVyQ29uZmlnLmdldFN5c3RlbVRleHQoKS5hcGkuZXJyb3I7XHJcbiAgICAgICAgLy9Db29sXHJcbiAgICAgICAgLy9FUlJPUlMuY29kZXMucHVzaChwbGF5ZXJDb25maWcuZ2V0U3lzdGVtVGV4dCgpKTtcclxuXHJcbiAgICAgICAgcGxheWxpc3RNYW5hZ2VyLmluaXRQbGF5bGlzdChwbGF5ZXJDb25maWcuZ2V0UGxheWxpc3QoKSwgcGxheWVyQ29uZmlnKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpbml0KCkgc291cmNlcyA6IFwiICwgcGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRTb3VyY2VzKCkpO1xyXG5cclxuICAgICAgICBpbml0UHJvdmlkZXIoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFByb3ZpZGVyTmFtZSA9ICgpID0+IHtcclxuICAgICAgICBpZihjdXJyZW50UHJvdmlkZXIpe1xyXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldE5hbWUoKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcbiAgICB0aGF0LmdldE1zZUluc3RhbmNlID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKGN1cnJlbnRQcm92aWRlcil7XHJcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0TXNlKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRDb25maWcgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Q29uZmlnKClcIiwgcGxheWVyQ29uZmlnLmdldENvbmZpZygpKTtcclxuICAgICAgICByZXR1cm4gcGxheWVyQ29uZmlnLmdldENvbmZpZygpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0QnJvd3NlciA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgcmV0dXJuIHBsYXllckNvbmZpZy5nZXRCcm93c2VyKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRUaW1lY29kZU1vZGUgPSAoaXNTaG93KSA9PntcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRUaW1lY29kZU1vZGUoKVwiLCBpc1Nob3cpO1xyXG4gICAgICAgIHBsYXllckNvbmZpZy5zZXRUaW1lY29kZU1vZGUoaXNTaG93KTtcclxuICAgIH07XHJcbiAgICB0aGF0LmlzVGltZWNvZGVNb2RlID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGlzVGltZWNvZGVNb2RlKClcIik7XHJcbiAgICAgICAgcmV0dXJuIHBsYXllckNvbmZpZy5pc1RpbWVjb2RlTW9kZSgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0RnJhbWVyYXRlID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEZyYW1lcmF0ZSgpXCIpO1xyXG5cclxuICAgICAgICBpZiAoY3VycmVudFByb3ZpZGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0RnJhbWVyYXRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcbiAgICB0aGF0LnNlZWtGcmFtZSA9IChmcmFtZUNvdW50KSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNlZWtGcmFtZSgpXCIsIGZyYW1lQ291bnQpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2Vla0ZyYW1lKGZyYW1lQ291bnQpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldER1cmF0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXREdXJhdGlvbigpXCIsIGN1cnJlbnRQcm92aWRlci5nZXREdXJhdGlvbigpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldER1cmF0aW9uKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRQb3NpdGlvbiA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFBvc2l0aW9uKClcIiwgY3VycmVudFByb3ZpZGVyLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0UG9zaXRpb24oKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFZvbHVtZSA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFZvbHVtZSgpXCIsIGN1cnJlbnRQcm92aWRlci5nZXRWb2x1bWUoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRWb2x1bWUoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFZvbHVtZSA9ICh2b2x1bWUpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldFZvbHVtZSgpIFwiICsgdm9sdW1lKTtcclxuICAgICAgICBjdXJyZW50UHJvdmlkZXIuc2V0Vm9sdW1lKHZvbHVtZSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRNdXRlID0gKHN0YXRlKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRNdXRlKCkgXCIgKyBzdGF0ZSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5zZXRNdXRlKHN0YXRlKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldE11dGUgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRNdXRlKCkgXCIgKyBjdXJyZW50UHJvdmlkZXIuZ2V0TXV0ZSgpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldE11dGUoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmxvYWQgPSAocGxheWxpc3QpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBsb2FkKCkgXCIsIHBsYXlsaXN0KTtcclxuICAgICAgICBsYXp5UXVldWUgPSBMYXp5Q29tbWFuZEV4ZWN1dG9yKHRoYXQsIFsncGxheScsJ3NlZWsnLCdzdG9wJ10pO1xyXG5cclxuICAgICAgICBpZihwbGF5bGlzdCl7XHJcbiAgICAgICAgICAgIGlmKGN1cnJlbnRQcm92aWRlcil7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIuc2V0Q3VycmVudFF1YWxpdHkoMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcGxheWxpc3RNYW5hZ2VyLmluaXRQbGF5bGlzdChwbGF5bGlzdCwgcGxheWVyQ29uZmlnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGluaXRQcm92aWRlcigpO1xyXG5cclxuICAgIH07XHJcbiAgICB0aGF0LnBsYXkgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHBsYXkoKSBcIik7XHJcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnBsYXkoKTtcclxuICAgIH1cclxuICAgIHRoYXQucGF1c2UgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBwYXVzZSgpIFwiKTtcclxuICAgICAgICBjdXJyZW50UHJvdmlkZXIucGF1c2UoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNlZWsgPSAocG9zaXRpb24pID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNlZWsoKSBcIisgcG9zaXRpb24pO1xyXG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5zZWVrKHBvc2l0aW9uKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFBsYXliYWNrUmF0ZSA9IChwbGF5YmFja1JhdGUpID0+e1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0UGxheWJhY2tSYXRlKCkgXCIsIHBsYXliYWNrUmF0ZSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5zZXRQbGF5YmFja1JhdGUocGxheWVyQ29uZmlnLnNldFBsYXliYWNrUmF0ZShwbGF5YmFja1JhdGUpKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFBsYXliYWNrUmF0ZSA9ICgpID0+e1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0UGxheWJhY2tSYXRlKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRQbGF5YmFja1JhdGUoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRQbGF5YmFja1JhdGUoKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRQbGF5bGlzdCA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRQbGF5bGlzdCgpIFwiLCBwbGF5bGlzdE1hbmFnZXIuZ2V0UGxheWxpc3QoKSk7XHJcbiAgICAgICAgcmV0dXJuIHBsYXlsaXN0TWFuYWdlci5nZXRQbGF5bGlzdCgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q3VycmVudFBsYXlsaXN0ID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEN1cnJlbnRQbGF5bGlzdCgpIFwiLCBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFBsYXlsaXN0SW5kZXgoKSk7XHJcbiAgICAgICAgcmV0dXJuIHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50UGxheWxpc3RJbmRleCgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Q3VycmVudFBsYXlsaXN0ID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Q3VycmVudFBsYXlsaXN0KCkgXCIsIGluZGV4KTtcclxuICAgICAgICBydW5OZXh0UGxheWxpc3QoaW5kZXgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldFNvdXJjZXMgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRTb3VyY2VzKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRTb3VyY2VzKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0U291cmNlcygpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q3VycmVudFNvdXJjZSA9ICgpID0+e1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Q3VycmVudFNvdXJjZSgpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFNvdXJjZSgpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldEN1cnJlbnRTb3VyY2UoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEN1cnJlbnRTb3VyY2UgPSAoaW5kZXgpID0+e1xyXG5cclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEN1cnJlbnRTb3VyY2UoKSBcIiwgaW5kZXgpO1xyXG5cclxuICAgICAgICAvLyBsZXQgc291cmNlcyA9IGN1cnJlbnRQcm92aWRlci5nZXRTb3VyY2VzKCk7XHJcbiAgICAgICAgLy8gbGV0IGN1cnJlbnRTb3VyY2UgPSBzb3VyY2VzW2N1cnJlbnRQcm92aWRlci5nZXRDdXJyZW50U291cmNlKCldO1xyXG4gICAgICAgIC8vIGxldCBuZXdTb3VyY2UgPSBzb3VyY2VzW2luZGV4XTtcclxuXHJcbiAgICAgICAgLy8gbGV0IGlzU2FtZVByb3ZpZGVyID0gcHJvdmlkZXJDb250cm9sbGVyLmlzU2FtZVByb3ZpZGVyKGN1cnJlbnRTb3VyY2UsIG5ld1NvdXJjZSk7XHJcbiAgICAgICAgLy8gLy8gcHJvdmlkZXIuc2VyQ3VycmVudFF1YWxpdHkgLT4gcGxheWVyQ29uZmlnIHNldHRpbmcgLT4gbG9hZFxyXG4gICAgICAgIC8vIGxldCByZXN1bHRTb3VyY2VJbmRleCA9IGN1cnJlbnRQcm92aWRlci5zZXRDdXJyZW50U291cmNlKGluZGV4LCBpc1NhbWVQcm92aWRlcik7XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBpZighbmV3U291cmNlKXtcclxuICAgICAgICAvLyAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Q3VycmVudFF1YWxpdHkoKSBpc1NhbWVQcm92aWRlclwiLCBpc1NhbWVQcm92aWRlcik7XHJcblxyXG4gICAgICAgIGxldCBsYXN0UGxheVBvc2l0aW9uID0gY3VycmVudFByb3ZpZGVyLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgcGxheWVyQ29uZmlnLnNldFNvdXJjZUluZGV4KGluZGV4KTtcclxuICAgICAgICBsYXp5UXVldWUgPSBMYXp5Q29tbWFuZEV4ZWN1dG9yKHRoYXQsIFsncGxheScsJ3NlZWsnXSk7XHJcblxyXG4gICAgICAgIGluaXRQcm92aWRlcihsYXN0UGxheVBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgfTtcclxuXHJcblxyXG5cclxuICAgIHRoYXQuZ2V0UXVhbGl0eUxldmVscyA9ICgpID0+e1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0UXVhbGl0eUxldmVscygpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0UXVhbGl0eUxldmVscygpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFF1YWxpdHlMZXZlbHMoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEN1cnJlbnRRdWFsaXR5ID0gKCkgPT57XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRDdXJyZW50UXVhbGl0eSgpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFF1YWxpdHkoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRDdXJyZW50UXVhbGl0eSgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Q3VycmVudFF1YWxpdHkgPSAocXVhbGl0eUluZGV4KSA9PntcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEN1cnJlbnRRdWFsaXR5KCkgXCIsIHF1YWxpdHlJbmRleCk7XHJcblxyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2V0Q3VycmVudFF1YWxpdHkocXVhbGl0eUluZGV4KTtcclxuICAgIH07XHJcbiAgICB0aGF0LmlzQXV0b1F1YWxpdHkgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpc0F1dG9RdWFsaXR5KClcIik7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5pc0F1dG9RdWFsaXR5KCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRBdXRvUXVhbGl0eSA9IChpc0F1dG8pID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEF1dG9RdWFsaXR5KCkgXCIsIGlzQXV0byk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5zZXRBdXRvUXVhbGl0eShpc0F1dG8pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoYXQuZ2V0Q2FwdGlvbkxpc3QgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWNhcHRpb25NYW5hZ2VyKXtyZXR1cm4gbnVsbDt9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Q2FwdGlvbkxpc3QoKSBcIiwgY2FwdGlvbk1hbmFnZXIuZ2V0Q2FwdGlvbkxpc3QoKSk7XHJcbiAgICAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLmdldENhcHRpb25MaXN0KCk7XHJcbiAgICB9XHJcbiAgICB0aGF0LmdldEN1cnJlbnRDYXB0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjYXB0aW9uTWFuYWdlcil7cmV0dXJuIG51bGw7fVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEN1cnJlbnRDYXB0aW9uKCkgXCIsIGNhcHRpb25NYW5hZ2VyLmdldEN1cnJlbnRDYXB0aW9uKCkpO1xyXG4gICAgICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5nZXRDdXJyZW50Q2FwdGlvbigpO1xyXG4gICAgfVxyXG4gICAgdGhhdC5zZXRDdXJyZW50Q2FwdGlvbiA9IChpbmRleCkgPT4ge1xyXG4gICAgICAgIGlmKCFjYXB0aW9uTWFuYWdlcil7cmV0dXJuIG51bGw7fVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEN1cnJlbnRDYXB0aW9uKCkgXCIsIGluZGV4KTtcclxuICAgICAgICBjYXB0aW9uTWFuYWdlci5zZXRDdXJyZW50Q2FwdGlvbihpbmRleCk7XHJcbiAgICB9XHJcbiAgICB0aGF0LmFkZENhcHRpb24gPSAodHJhY2spID0+IHtcclxuICAgICAgICBpZighY2FwdGlvbk1hbmFnZXIpe3JldHVybiBudWxsO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBhZGRDYXB0aW9uKCkgXCIpXHJcbiAgICAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLmFkZENhcHRpb24odHJhY2spO1xyXG4gICAgfVxyXG4gICAgdGhhdC5yZW1vdmVDYXB0aW9uID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgaWYoIWNhcHRpb25NYW5hZ2VyKXtyZXR1cm4gbnVsbDt9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcmVtb3ZlQ2FwdGlvbigpIFwiLCBpbmRleClcclxuICAgICAgICByZXR1cm4gY2FwdGlvbk1hbmFnZXIucmVtb3ZlQ2FwdGlvbihpbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhhdC5nZXRCdWZmZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEJ1ZmZlcigpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0QnVmZmVyKCkpO1xyXG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5nZXRCdWZmZXIoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFN0YXRlID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRTdGF0ZSgpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0U3RhdGUoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRTdGF0ZSgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc3RvcCA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHN0b3AoKSBcIik7XHJcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnN0b3AoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnJlbW92ZSA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHJlbW92ZSgpIFwiKTtcclxuICAgICAgICBsYXp5UXVldWUuZGVzdHJveSgpO1xyXG4gICAgICAgIGlmKGNhcHRpb25NYW5hZ2VyKXtcclxuICAgICAgICAgICAgY2FwdGlvbk1hbmFnZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICBjYXB0aW9uTWFuYWdlciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihjdXJyZW50UHJvdmlkZXIpe1xyXG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYobWVkaWFNYW5hZ2VyKXtcclxuICAgICAgICAgICAgbWVkaWFNYW5hZ2VyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgbWVkaWFNYW5hZ2VyID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoYXQudHJpZ2dlcihERVNUUk9ZKTtcclxuICAgICAgICB0aGF0Lm9mZigpO1xyXG5cclxuICAgICAgICBwcm92aWRlckNvbnRyb2xsZXIgPSBudWxsO1xyXG4gICAgICAgIHBsYXlsaXN0TWFuYWdlciA9IG51bGw7XHJcbiAgICAgICAgcGxheWVyQ29uZmlnID0gbnVsbDtcclxuICAgICAgICBsYXp5UXVldWUgPSBudWxsO1xyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiByZW1vdmUoKSAtIGxhenlRdWV1ZSwgY3VycmVudFByb3ZpZGVyLCBwcm92aWRlckNvbnRyb2xsZXIsIHBsYXlsaXN0TWFuYWdlciwgcGxheWVyQ29uZmlnLCBhcGkgZXZlbnQgZGVzdHJvZWQuIFwiKTtcclxuICAgICAgICBPdmVuUGxheWVyU0RLLnJlbW92ZVBsYXllcih0aGF0LmdldENvbnRhaW5lcklkKCkpO1xyXG4gICAgICAgIGlmKE92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyTGlzdCgpLmxlbmd0aCAgPT09IDApe1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJPdmVuUGxheWVyU0RLLnBsYXllckxpc3RcIiwgIE92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyTGlzdCgpKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0VmVyc2lvbiA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gXCJ2LlwiK3ZlcnNpb247XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcGk7XHJcblxyXG5cclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyNC4uXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNvbnN0IEFwaVJ0bXBFeHBhbnNpb24gPSBmdW5jdGlvbihjdXJyZW50UHJvdmlkZXIpe1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBleHRlcm5hbENhbGxiYWNrQ3JlZXAgOiAocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHJlc3VsdC5uYW1lICYmIHJlc3VsdC5kYXRhKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIudHJpZ2dlckV2ZW50RnJvbUV4dGVybmFsKHJlc3VsdC5uYW1lLCByZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG4iLCJpbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIENPTlRFTlRfVElNRV9NT0RFX0NIQU5HRUQsIFNZU1RFTV9URVhUXHJcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBUaGlzIGluaXRpYWxpemVzIHRoZSBpbnB1dCBvcHRpb25zLlxyXG4gKiBAcGFyYW0gICBvcHRpb25zXHJcbiAqXHJcbiAqICovXHJcbmNvbnN0IENvbmZpZ3VyYXRvciA9IGZ1bmN0aW9uKG9wdGlvbnMsIHByb3ZpZGVyKXtcclxuXHJcbiAgICBjb25zdCBjb21wb3NlU291cmNlT3B0aW9ucyA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xyXG4gICAgICAgIGNvbnN0IERlZmF1bHRzID0ge1xyXG4gICAgICAgICAgICBtZWRpYUNvbnRhaW5lciA6IFwiXCIsXHJcbiAgICAgICAgICAgIHBsYXliYWNrUmF0ZXM6IFsyLCAxLjUsIDEsIDAuNSwgMC4yNV0sXHJcbiAgICAgICAgICAgIHBsYXliYWNrUmF0ZTogMSxcclxuICAgICAgICAgICAgbXV0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHZvbHVtZTogMTAwLFxyXG4gICAgICAgICAgICBsb29wIDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNvbnRyb2xzIDogdHJ1ZSxcclxuICAgICAgICAgICAgYXV0b1N0YXJ0IDogZmFsc2UsXHJcbiAgICAgICAgICAgIGF1dG9GYWxsYmFjazogdHJ1ZSxcclxuICAgICAgICAgICAgdGltZWNvZGUgOiB0cnVlLFxyXG4gICAgICAgICAgICBzb3VyY2VJbmRleCA6IC0xLFxyXG4gICAgICAgICAgICBicm93c2VyIDogXCJcIixcclxuICAgICAgICAgICAgaGlkZVBsYXlsaXN0SWNvbiA6IGZhbHNlLFxyXG4gICAgICAgICAgICBydG1wQnVmZmVyVGltZSA6IDEsXHJcbiAgICAgICAgICAgIHJ0bXBCdWZmZXJUaW1lTWF4IDogMyxcclxuICAgICAgICAgICAgYWRDbGllbnQgOiBcImdvb2dsZWltYVwiLFxyXG4gICAgICAgICAgICBjdXJyZW50UHJvdG9jb2xPbmx5IDogZmFsc2UsXHJcbiAgICAgICAgICAgIHN5c3RlbVRleHQgOiBudWxsLFxyXG4gICAgICAgICAgICBsYW5nIDogXCJlblwiLFxyXG4gICAgICAgICAgICBsb2FkaW5nUmV0cnlDb3VudDogMCxcclxuICAgICAgICAgICAgZXhwYW5kRnVsbFNjcmVlblVJOiBmYWxzZSxcclxuICAgICAgICAgICAgZnVsbHNjcmVlbk9wdGlvbjogbnVsbCxcclxuICAgICAgICAgICAgc2hvd0JpZ1BsYXlCdXR0b246IHRydWVcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHNlcmlhbGl6ZSA9IGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgICAgICAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycgJiYgdmFsLmxlbmd0aCA8IDYpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxvd2VyY2FzZVZhbCA9IHZhbC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvd2VyY2FzZVZhbCA9PT0gJ3RydWUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobG93ZXJjYXNlVmFsID09PSAnZmFsc2UnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFpc05hTihOdW1iZXIodmFsKSkgJiYgIWlzTmFOKHBhcnNlRmxvYXQodmFsKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gTnVtYmVyKHZhbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZGVzZXJpYWxpemUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChrZXkgPT09ICdpZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zW2tleV0gPSBzZXJpYWxpemUob3B0aW9uc1trZXldKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZXNlcmlhbGl6ZShvcHRpb25zKTtcclxuICAgICAgICBsZXQgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgRGVmYXVsdHMsIG9wdGlvbnMpO1xyXG4gICAgICAgIGxldCB1c2VyQ3VzdHVtU3lzdGVtVGV4dCA9IFtdO1xyXG4gICAgICAgIGlmKGNvbmZpZy5zeXN0ZW1UZXh0KXtcclxuICAgICAgICAgICAgdXNlckN1c3R1bVN5c3RlbVRleHQgPSBfLmlzQXJyYXkoY29uZmlnLnN5c3RlbVRleHQpID8gY29uZmlnLnN5c3RlbVRleHQgOiBbY29uZmlnLnN5c3RlbVRleHRdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHVzZXJDdXN0dW1TeXN0ZW1UZXh0Lmxlbmd0aDsgaSArKyl7XHJcbiAgICAgICAgICAgIGlmKHVzZXJDdXN0dW1TeXN0ZW1UZXh0W2ldLmxhbmcpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRTeXN0ZW1UZXh0ID0gXy5maW5kV2hlcmUoU1lTVEVNX1RFWFQgLCB7XCJsYW5nXCI6IHVzZXJDdXN0dW1TeXN0ZW1UZXh0W2ldLmxhbmd9KTtcclxuICAgICAgICAgICAgICAgIGlmKGN1cnJlbnRTeXN0ZW1UZXh0KXtcclxuICAgICAgICAgICAgICAgICAgICAvL3ZhbGlkYXRlICYgdXBkYXRlXHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihjdXJyZW50U3lzdGVtVGV4dCwgdXNlckN1c3R1bVN5c3RlbVRleHRbaV0pO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jcmVhdGVcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3lzdGVtVGV4dCA9IF8uZmluZFdoZXJlKFNZU1RFTV9URVhUICwge1wibGFuZ1wiOiBcImVuXCJ9KTtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3lzdGVtVGV4dC5sYW5nID0gdXNlckN1c3R1bVN5c3RlbVRleHRbaV0ubGFuZztcclxuICAgICAgICAgICAgICAgICAgICBTWVNURU1fVEVYVC5wdXNoKE9iamVjdC5hc3NpZ24odXNlckN1c3R1bVN5c3RlbVRleHRbaV0sIGN1cnJlbnRTeXN0ZW1UZXh0KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uZmlnLnN5c3RlbVRleHQgPSBfLmZpbmRXaGVyZShTWVNURU1fVEVYVCAsIHtcImxhbmdcIjogY29uZmlnLmxhbmd9KTtcclxuXHJcbiAgICAgICAgbGV0IHBsYXliYWNrUmF0ZXMgPSBjb25maWcucGxheWJhY2tSYXRlcztcclxuXHJcbiAgICAgICAgcGxheWJhY2tSYXRlcyA9IHBsYXliYWNrUmF0ZXMuZmlsdGVyKHJhdGUgPT4gXy5pc051bWJlcihyYXRlKSAmJiByYXRlID49IDAuMjUgJiYgcmF0ZSA8PSA0KS5tYXAocmF0ZSA9PiBNYXRoLnJvdW5kKHJhdGUgKiA0KSAvIDQpO1xyXG5cclxuICAgICAgICBpZiAocGxheWJhY2tSYXRlcy5pbmRleE9mKDEpIDwgMCkge1xyXG4gICAgICAgICAgICBwbGF5YmFja1JhdGVzLnB1c2goMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBsYXliYWNrUmF0ZXMuc29ydCgpO1xyXG5cclxuICAgICAgICBjb25maWcucGxheWJhY2tSYXRlcyA9IHBsYXliYWNrUmF0ZXM7XHJcblxyXG4gICAgICAgIGNvbmZpZy5ydG1wQnVmZmVyVGltZSA9IGNvbmZpZy5ydG1wQnVmZmVyVGltZSA+IDEwID8gMTAgOiBjb25maWcucnRtcEJ1ZmZlclRpbWU7XHJcbiAgICAgICAgY29uZmlnLnJ0bXBCdWZmZXJUaW1lTWF4ID0gY29uZmlnLnJ0bXBCdWZmZXJUaW1lTWF4ID4gNTAgPyA1MCA6IGNvbmZpZy5ydG1wQnVmZmVyVGltZU1heDtcclxuXHJcblxyXG4gICAgICAgIGlmIChjb25maWcucGxheWJhY2tSYXRlcy5pbmRleE9mKGNvbmZpZy5wbGF5YmFja1JhdGUpIDwgMCkge1xyXG4gICAgICAgICAgICBjb25maWcucGxheWJhY2tSYXRlID0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbmZpZ1BsYXlsaXN0ID0gY29uZmlnLnBsYXlsaXN0O1xyXG4gICAgICAgIGlmICghY29uZmlnUGxheWxpc3QpIHtcclxuICAgICAgICAgICAgY29uc3Qgb2JqID0gXy5waWNrKGNvbmZpZywgW1xyXG4gICAgICAgICAgICAgICAgJ3RpdGxlJyxcclxuICAgICAgICAgICAgICAgICdkZXNjcmlwdGlvbicsXHJcbiAgICAgICAgICAgICAgICAndHlwZScsXHJcbiAgICAgICAgICAgICAgICAnaW1hZ2UnLFxyXG4gICAgICAgICAgICAgICAgJ2ZpbGUnLFxyXG4gICAgICAgICAgICAgICAgJ3NvdXJjZXMnLFxyXG4gICAgICAgICAgICAgICAgJ3RyYWNrcycsXHJcbiAgICAgICAgICAgICAgICAnaG9zdCcsXHJcbiAgICAgICAgICAgICAgICAnYXBwbGljYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgJ3N0cmVhbScsXHJcbiAgICAgICAgICAgICAgICAnYWRUYWdVcmwnXHJcbiAgICAgICAgICAgIF0pO1xyXG5cclxuICAgICAgICAgICAgY29uZmlnLnBsYXlsaXN0ID0gWyBvYmogXTtcclxuICAgICAgICB9IGVsc2UgaWYgKF8uaXNBcnJheShjb25maWdQbGF5bGlzdC5wbGF5bGlzdCkpIHtcclxuICAgICAgICAgICAgY29uZmlnLmZlZWREYXRhID0gY29uZmlnUGxheWxpc3Q7XHJcbiAgICAgICAgICAgIGNvbmZpZy5wbGF5bGlzdCA9IGNvbmZpZ1BsYXlsaXN0LnBsYXlsaXN0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGVsZXRlIGNvbmZpZy5kdXJhdGlvbjtcclxuICAgICAgICByZXR1cm4gY29uZmlnO1xyXG4gICAgfTtcclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNvbmZpZ3VyYXRvciBsb2FkZWQuXCIsIG9wdGlvbnMpO1xyXG4gICAgbGV0IHNwZWMgPSBjb21wb3NlU291cmNlT3B0aW9ucyhvcHRpb25zKTtcclxuXHJcbiAgICAvL3NwZWMuaXNGdWxsc2NyZWVuID0gZmFsc2U7IC8vSUUgMTEgY2FuJ3QgY2hlY2sgY3VycmVudCBmdWxsc2NyZWVuIHN0YXRlLlxyXG5cclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIHRoYXQuZ2V0Q29uZmlnID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0QWRDbGllbnQgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuYWRDbGllbnQ7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRDb25maWcgPSAoY29uZmlnLCB2YWx1ZSkgPT4ge1xyXG4gICAgICAgIHNwZWNbY29uZmlnXSA9IHZhbHVlO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldENvbnRhaW5lciA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5tZWRpYUNvbnRhaW5lcjtcclxuICAgIH07XHJcbiAgICAvKnRoYXQuaXNGdWxsc2NyZWVuID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLmlzRnVsbHNjcmVlbjtcclxuICAgIH1cclxuICAgIHRoYXQuc2V0RnVsbHNjcmVlbiA9IChpc0Z1bGxzY3JlZW4pID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5pc0Z1bGxzY3JlZW4gPSBpc0Z1bGxzY3JlZW47XHJcbiAgICB9Ki9cclxuXHJcbiAgICB0aGF0LmdldFBsYXliYWNrUmF0ZSA9KCk9PntcclxuICAgICAgICByZXR1cm4gc3BlYy5wbGF5YmFja1JhdGU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRQbGF5YmFja1JhdGUgPShwbGF5YmFja1JhdGUpPT57XHJcbiAgICAgICAgc3BlYy5wbGF5YmFja1JhdGUgPSBwbGF5YmFja1JhdGU7XHJcbiAgICAgICAgcmV0dXJuIHBsYXliYWNrUmF0ZTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRRdWFsaXR5TGFiZWwgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMucXVhbGl0eUxhYmVsO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0UXVhbGl0eUxhYmVsID0gKG5ld0xhYmVsKSA9PiB7XHJcbiAgICAgICAgc3BlYy5xdWFsaXR5TGFiZWwgPSBuZXdMYWJlbDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5pc0N1cnJlbnRQcm90b2NvbE9ubHkgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFByb3RvY29sT25seTtcclxuICAgIH07XHJcbiAgICAvKnRoYXQuZ2V0U291cmNlTGFiZWwgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuc291cmNlTGFiZWw7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRTb3VyY2VMYWJlbCA9IChuZXdMYWJlbCkgPT4ge1xyXG4gICAgICAgIHNwZWMuc291cmNlTGFiZWwgPSBuZXdMYWJlbDtcclxuICAgIH07Ki9cclxuXHJcbiAgICB0aGF0LmdldFNvdXJjZUluZGV4ID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLnNvdXJjZUluZGV4O1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0U291cmNlSW5kZXggPSAoaW5kZXgpID0+IHtcclxuICAgICAgICBzcGVjLnNvdXJjZUluZGV4ID0gaW5kZXg7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRUaW1lY29kZU1vZGUgPSAodGltZWNvZGUpID0+IHtcclxuICAgICAgICBpZihzcGVjLnRpbWVjb2RlICE9PSB0aW1lY29kZSl7XHJcbiAgICAgICAgICAgIHNwZWMudGltZWNvZGUgPSB0aW1lY29kZTtcclxuICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1RJTUVfTU9ERV9DSEFOR0VELCB0aW1lY29kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoYXQuaXNUaW1lY29kZU1vZGUgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMudGltZWNvZGU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRSdG1wQnVmZmVyVGltZSA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5ydG1wQnVmZmVyVGltZTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFJ0bXBCdWZmZXJUaW1lTWF4ID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLnJ0bXBCdWZmZXJUaW1lTWF4O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmlzTXV0ZSA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBzcGVjLm11dGU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRWb2x1bWUgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gc3BlYy52b2x1bWU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRWb2x1bWUgPSAodm9sdW1lKSA9PntcclxuICAgICAgICBzcGVjLnZvbHVtZSA9IHZvbHVtZTtcclxuICAgIH07XHJcbiAgICB0aGF0LmlzTG9vcCA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBzcGVjLmxvb3A7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5pc0F1dG9TdGFydCA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBzcGVjLmF1dG9TdGFydDtcclxuICAgIH07XHJcbiAgICB0aGF0LmlzQ29udHJvbHMgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gc3BlYy5jb250cm9scztcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGVzID0oKT0+e1xyXG4gICAgICAgIHJldHVybiBzcGVjLnBsYXliYWNrUmF0ZXM7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRCcm93c2VyID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLmJyb3dzZXI7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRTeXN0ZW1UZXh0ID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLnN5c3RlbVRleHQ7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRMYW5ndWFnZSA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5sYW5nO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldFBsYXlsaXN0ID0oKT0+e1xyXG4gICAgICAgIHJldHVybiBzcGVjLnBsYXlsaXN0O1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0UGxheWxpc3QgPShwbGF5bGlzdCk9PntcclxuICAgICAgICBpZihfLmlzQXJyYXkocGxheWxpc3QpKXtcclxuICAgICAgICAgICAgc3BlYy5wbGF5bGlzdCA9IHBsYXlsaXN0O1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBzcGVjLnBsYXlsaXN0ID0gW3BsYXlsaXN0XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNwZWMucGxheWxpc3Q7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29uZmlndXJhdG9yO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDMuLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBUaGlzIG1vZHVsZSBwcm92aWRlIGN1c3RvbSBldmVudHMuXHJcbiAqIEBwYXJhbSAgIG9iamVjdCAgICBBbiBvYmplY3QgdGhhdCByZXF1aXJlcyBjdXN0b20gZXZlbnRzLlxyXG4gKlxyXG4gKiAqL1xyXG5cclxuY29uc3QgRXZlbnRFbWl0dGVyID0gZnVuY3Rpb24ob2JqZWN0KXtcclxuICAgIGxldCB0aGF0ID0gb2JqZWN0O1xyXG4gICAgbGV0IF9ldmVudHMgPVtdO1xyXG5cclxuICAgIGNvbnN0IHRyaWdnZXJFdmVudHMgPSBmdW5jdGlvbihldmVudHMsIGFyZ3MsIGNvbnRleHQpe1xyXG4gICAgICAgIGxldCBpID0gMDtcclxuICAgICAgICBsZXQgbGVuZ3RoID0gZXZlbnRzLmxlbmd0aDtcclxuICAgICAgICBmb3IoaSA9IDA7IGkgPCBsZW5ndGg7IGkgKyspe1xyXG4gICAgICAgICAgICBsZXQgZXZlbnQgPSBldmVudHNbaV07XHJcbiAgICAgICAgICAgIGV2ZW50Lmxpc3RlbmVyLmFwcGx5KCAoIGV2ZW50LmNvbnRleHQgfHwgY29udGV4dCApLCBhcmdzKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQub24gPSBmdW5jdGlvbihuYW1lLCBsaXN0ZW5lciwgY29udGV4dCl7XHJcbiAgICAgICAgKF9ldmVudHNbbmFtZV0gfHwgKF9ldmVudHNbbmFtZV09W10pICkucHVzaCh7IGxpc3RlbmVyOiBsaXN0ZW5lciAgLCBjb250ZXh0IDogY29udGV4dH0pO1xyXG4gICAgICAgIHJldHVybiB0aGF0O1xyXG4gICAgfTtcclxuICAgIHRoYXQudHJpZ2dlciA9IGZ1bmN0aW9uKG5hbWUpe1xyXG4gICAgICAgIGlmKCFfZXZlbnRzKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xyXG4gICAgICAgIGNvbnN0IGV2ZW50cyA9IF9ldmVudHNbbmFtZV07XHJcbiAgICAgICAgY29uc3QgYWxsRXZlbnRzID0gX2V2ZW50cy5hbGw7XHJcblxyXG4gICAgICAgIGlmKGV2ZW50cyl7XHJcbiAgICAgICAgICAgIHRyaWdnZXJFdmVudHMoZXZlbnRzLCBhcmdzLCB0aGF0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoYWxsRXZlbnRzKXtcclxuICAgICAgICAgICAgdHJpZ2dlckV2ZW50cyhhbGxFdmVudHMsIGFyZ3VtZW50cywgdGhhdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoYXQub2ZmID0gZnVuY3Rpb24obmFtZSwgbGlzdGVuZXIsIGNvbnRleHQpe1xyXG4gICAgICAgIGlmKCFfZXZlbnRzKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFuYW1lICYmICFsaXN0ZW5lciAmJiAhY29udGV4dCkgIHtcclxuICAgICAgICAgICAgX2V2ZW50cyA9IFtdO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhhdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG5hbWVzID0gbmFtZSA/IFtuYW1lXSA6IE9iamVjdC5rZXlzKF9ldmVudHMpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IG5hbWVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICBuYW1lID0gbmFtZXNbaV07XHJcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50cyA9IF9ldmVudHNbbmFtZV07XHJcbiAgICAgICAgICAgIGlmIChldmVudHMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJldGFpbiA9IF9ldmVudHNbbmFtZV0gPSBbXTtcclxuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lciAgfHwgY29udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwLCBrID0gZXZlbnRzLmxlbmd0aDsgaiA8IGs7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBldmVudCA9IGV2ZW50c1tqXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChsaXN0ZW5lciAmJiBsaXN0ZW5lciAhPT0gZXZlbnQubGlzdGVuZXIgJiYgbGlzdGVuZXIgIT09IGV2ZW50Lmxpc3RlbmVyLmxpc3RlbmVyICAmJiBsaXN0ZW5lciAhPT0gZXZlbnQubGlzdGVuZXIuX2xpc3RlbmVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwoY29udGV4dCAmJiBjb250ZXh0ICE9PSBldmVudC5jb250ZXh0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldGFpbi5wdXNoKGV2ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghcmV0YWluLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBfZXZlbnRzW25hbWVdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGF0O1xyXG4gICAgfTtcclxuICAgIHRoYXQub25jZSA9IGZ1bmN0aW9uKG5hbWUsIGxpc3RlbmVyLCBjb250ZXh0KXtcclxuICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgIGNvbnN0IG9uY2VDYWxsYmFjayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoY291bnQrKykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoYXQub2ZmKG5hbWUsIG9uY2VDYWxsYmFjayk7XHJcbiAgICAgICAgICAgIGxpc3RlbmVyLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBvbmNlQ2FsbGJhY2suX2xpc3RlbmVyID0gbGlzdGVuZXI7XHJcbiAgICAgICAgcmV0dXJuIHRoYXQub24obmFtZSwgb25jZUNhbGxiYWNrLCBjb250ZXh0KTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV2ZW50RW1pdHRlcjtcclxuIiwiaW1wb3J0IF8gZnJvbSAndXRpbHMvdW5kZXJzY29yZSc7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgVGhpcyBleGVjdXRlcyB0aGUgaW5wdXQgY29tbWFuZHMgYXQgYSBzcGVjaWZpYyBwb2ludCBpbiB0aW1lLlxyXG4gKiBAcGFyYW0gICBpbnN0YW5jZVxyXG4gKiBAcGFyYW0gICBxdWV1ZWRDb21tYW5kc1xyXG4gKiAqL1xyXG5jb25zdCBMYXp5Q29tbWFuZEV4ZWN1dG9yID0gZnVuY3Rpb24gKGluc3RhbmNlLCBxdWV1ZWRDb21tYW5kcykge1xyXG4gICAgbGV0IGNvbW1hbmRRdWV1ZSA9IFtdO1xyXG4gICAgbGV0IHVuZGVjb3JhdGVkTWV0aG9kcyA9IHt9O1xyXG4gICAgbGV0IGV4ZWN1dGVNb2RlID0gZmFsc2U7XHJcbiAgICBsZXQgdGhhdCA9IHt9O1xyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciBsb2FkZWQuXCIpO1xyXG4gICAgcXVldWVkQ29tbWFuZHMuZm9yRWFjaCgoY29tbWFuZCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IGluc3RhbmNlW2NvbW1hbmRdO1xyXG4gICAgICAgIHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXSA9IG1ldGhvZCB8fCBmdW5jdGlvbigpe307XHJcblxyXG4gICAgICAgIGluc3RhbmNlW2NvbW1hbmRdID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xyXG4gICAgICAgICAgICAgIGlmICghZXhlY3V0ZU1vZGUpIHtcclxuICAgICAgICAgICAgICAgIC8vY29tbWFuZFF1ZXVlLnB1c2goeyBjb21tYW5kLCBhcmdzIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5hZGRRdWV1ZShjb21tYW5kLCBhcmdzKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZXhlY3V0ZVF1ZXVlZENvbW1hbmRzKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWV0aG9kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kLmFwcGx5KHRoYXQsIGFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG4gICAgdmFyIGV4ZWN1dGVRdWV1ZWRDb21tYW5kcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB3aGlsZSAoY29tbWFuZFF1ZXVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgY29uc3QgeyBjb21tYW5kLCBhcmdzIH0gPSBjb21tYW5kUXVldWUuc2hpZnQoKTtcclxuICAgICAgICAgICAgKHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXSB8fCBpbnN0YW5jZVtjb21tYW5kXSkuYXBwbHkoaW5zdGFuY2UsIGFyZ3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGF0LnNldEV4ZWN1dGVNb2RlID0gKG1vZGUpID0+IHtcclxuICAgICAgICBleGVjdXRlTW9kZSA9IG1vZGU7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IHNldEV4ZWN1dGVNb2RlKClcIiwgbW9kZSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRVbmRlY29yYXRlZE1ldGhvZHMgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBnZXRVbmRlY29yYXRlZE1ldGhvZHMoKVwiLCB1bmRlY29yYXRlZE1ldGhvZHMpO1xyXG4gICAgICAgIHJldHVybiB1bmRlY29yYXRlZE1ldGhvZHM7XHJcbiAgICB9XHJcbiAgICB0aGF0LmdldFF1ZXVlID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZ2V0UXVldWUoKVwiLCBnZXRRdWV1ZSk7XHJcbiAgICAgICAgcmV0dXJuIGNvbW1hbmRRdWV1ZTtcclxuICAgIH1cclxuICAgIHRoYXQuYWRkUXVldWUgPSBmdW5jdGlvbihjb21tYW5kLCBhcmdzKXtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogYWRkUXVldWUoKVwiLCBjb21tYW5kLCBhcmdzKTtcclxuICAgICAgICBjb21tYW5kUXVldWUucHVzaCh7IGNvbW1hbmQsIGFyZ3MgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhhdC5mbHVzaCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGZsdXNoKClcIik7XHJcbiAgICAgICAgZXhlY3V0ZVF1ZXVlZENvbW1hbmRzKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5lbXB0eSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBlbXB0eSgpXCIpO1xyXG4gICAgICAgIGNvbW1hbmRRdWV1ZS5sZW5ndGggPSAwO1xyXG4gICAgfTtcclxuICAgIHRoYXQub2ZmID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IG9mZigpXCIpO1xyXG4gICAgICAgIHF1ZXVlZENvbW1hbmRzLmZvckVhY2goKGNvbW1hbmQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbWV0aG9kID0gdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdO1xyXG4gICAgICAgICAgICBpZiAobWV0aG9kKSB7XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVtjb21tYW5kXSA9IG1ldGhvZDtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8vUnVuIG9uY2UgYXQgdGhlIGVuZFxyXG4gICAgdGhhdC5yZW1vdmVBbmRFeGN1dGVPbmNlID0gZnVuY3Rpb24oY29tbWFuZF8pe1xyXG4gICAgICAgIGxldCBjb21tYW5kUXVldWVJdGVtID0gXy5maW5kV2hlcmUoY29tbWFuZFF1ZXVlLCB7Y29tbWFuZCA6IGNvbW1hbmRffSk7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IHJlbW92ZUFuZEV4Y3V0ZU9uY2UoKVwiLCBjb21tYW5kXyk7XHJcbiAgICAgICAgY29tbWFuZFF1ZXVlLnNwbGljZShfLmZpbmRJbmRleChjb21tYW5kUXVldWUsIHtjb21tYW5kIDogY29tbWFuZF99KSwgMSk7XHJcblxyXG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kX107XHJcbiAgICAgICAgaWYgKG1ldGhvZCkge1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJyZW1vdmVDb21tYW5kKClcIik7XHJcbiAgICAgICAgICAgIGlmKGNvbW1hbmRRdWV1ZUl0ZW0pe1xyXG4gICAgICAgICAgICAgICAgKG1ldGhvZHx8IGluc3RhbmNlW2NvbW1hbmRfXSkuYXBwbHkoaW5zdGFuY2UsIGNvbW1hbmRRdWV1ZUl0ZW0uYXJncyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaW5zdGFuY2VbY29tbWFuZF9dID0gbWV0aG9kO1xyXG4gICAgICAgICAgICBkZWxldGUgdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRfXTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBkZXN0cm95KClcIik7XHJcbiAgICAgICAgdGhhdC5vZmYoKTtcclxuICAgICAgICB0aGF0LmVtcHR5KCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExhenlDb21tYW5kRXhlY3V0b3I7IiwiaW1wb3J0IHtpc1J0bXAsIGlzV2ViUlRDLCBpc0Rhc2gsIGlzSGxzfSBmcm9tIFwidXRpbHMvdmFsaWRhdG9yXCI7XHJcbmltcG9ydCB7YW5hbFVzZXJBZ2VudH0gZnJvbSBcInV0aWxzL2Jyb3dzZXJcIjtcclxuLyoqXHJcbiAqIEBicmllZiAgIFRoaXMgZmluZHMgdGhlIHByb3ZpZGVyIHRoYXQgbWF0Y2hlcyB0aGUgaW5wdXQgc291cmNlLlxyXG4gKiBAcGFyYW1cclxuICogKi9cclxuXHJcbmNvbnN0IFN1cHBvcnRDaGVja2VyID0gZnVuY3Rpb24oKXtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlN1cHBvcnRDaGVja2VyIGxvYWRlZC5cIik7XHJcbiAgICBsZXQgdXNlckFnZW50T2JqZWN0ID0gYW5hbFVzZXJBZ2VudCgpO1xyXG5cclxuICAgIGNvbnN0IHN1cHBvcnRMaXN0ID0gW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ2h0bWw1JyxcclxuICAgICAgICAgICAgY2hlY2tTdXBwb3J0OiBmdW5jdGlvbiAoc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBNaW1lVHlwZXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWFjOiAnYXVkaW8vbXA0JyxcclxuICAgICAgICAgICAgICAgICAgICBtcDQ6ICd2aWRlby9tcDQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGY0djogJ3ZpZGVvL21wNCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbTR2OiAndmlkZW8vbXA0JyxcclxuICAgICAgICAgICAgICAgICAgICBtb3Y6ICd2aWRlby9tcDQnLFxyXG4gICAgICAgICAgICAgICAgICAgIG1wMzogJ2F1ZGlvL21wZWcnLFxyXG4gICAgICAgICAgICAgICAgICAgIG1wZWc6ICdhdWRpby9tcGVnJyxcclxuICAgICAgICAgICAgICAgICAgICBvZ3Y6ICd2aWRlby9vZ2cnLFxyXG4gICAgICAgICAgICAgICAgICAgIG9nZzogJ3ZpZGVvL29nZycsXHJcbiAgICAgICAgICAgICAgICAgICAgb2dhOiAndmlkZW8vb2dnJyxcclxuICAgICAgICAgICAgICAgICAgICB2b3JiaXM6ICd2aWRlby9vZ2cnLFxyXG4gICAgICAgICAgICAgICAgICAgIHdlYm06ICd2aWRlby93ZWJtJyxcclxuICAgICAgICAgICAgICAgICAgICBmNGE6ICd2aWRlby9hYWMnLFxyXG4gICAgICAgICAgICAgICAgICAgIG0zdTg6ICdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbTN1OiAnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnLFxyXG4gICAgICAgICAgICAgICAgICAgIGhsczogJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJ1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCB2aWRlbyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJylcclxuICAgICAgICAgICAgICAgIH0oKTtcclxuICAgICAgICAgICAgICAgIGlmICghdmlkZW8uY2FuUGxheVR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZighdHlwZSl7cmV0dXJuIGZhbHNlO31cclxuICAgICAgICAgICAgICAgIGNvbnN0IG1pbWVUeXBlID0gc291cmNlLm1pbWVUeXBlIHx8IE1pbWVUeXBlc1t0eXBlXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihpc0hscyhmaWxlLCB0eXBlKSAmJiB1c2VyQWdlbnRPYmplY3QuYnJvd3NlciA9PT0gXCJNaWNyb3NvZnQgRWRnZVwiICl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9FZGdlIHN1cHBvcnRzIGhscyBuYXRpdmUgYnV0IHRoYXQncyBzdWNrcy5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGlzUnRtcChmaWxlLCB0eXBlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihpc1dlYlJUQyhmaWxlLCB0eXBlKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghbWltZVR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICEhdmlkZW8uY2FuUGxheVR5cGUobWltZVR5cGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICd3ZWJydGMnLFxyXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZpZGVvID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKVxyXG4gICAgICAgICAgICAgICAgfSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF2aWRlby5jYW5QbGF5VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpc1J0bXAoZmlsZSwgdHlwZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IHNvdXJjZS5maWxlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNvdXJjZS50eXBlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGlzV2ViUlRDKGZpbGUsIHR5cGUpKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAnZGFzaCcsXHJcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IHNvdXJjZS5maWxlO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcclxuICAgICAgICAgICAgICAgIGlmIChpc1J0bXAoZmlsZSwgdHlwZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAoIHdpbmRvdy5NZWRpYVNvdXJjZSB8fCB3aW5kb3cuV2ViS2l0TWVkaWFTb3VyY2UgKSA9PT0gXCJmdW5jdGlvblwiICYmIGlzRGFzaChmaWxlLCB0eXBlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdobHMnLFxyXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZpZGVvID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKVxyXG4gICAgICAgICAgICAgICAgfSgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IHNvdXJjZS5maWxlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNvdXJjZS50eXBlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzUnRtcChmaWxlLCB0eXBlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMgbWV0aG9kIGZyb20gaGxzLmpzXHJcbiAgICAgICAgICAgICAgICBjb25zdCBpc0hsc1N1cHBvcnQgPSAoKSA9PntcclxuICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gZ2V0TWVkaWFTb3VyY2UoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5NZWRpYVNvdXJjZSB8fCB3aW5kb3cuV2ViS2l0TWVkaWFTb3VyY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1lZGlhU291cmNlID0gZ2V0TWVkaWFTb3VyY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc291cmNlQnVmZmVyID0gd2luZG93LlNvdXJjZUJ1ZmZlciB8fCB3aW5kb3cuV2ViS2l0U291cmNlQnVmZmVyO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpc1R5cGVTdXBwb3J0ZWQgPSBtZWRpYVNvdXJjZSAmJiB0eXBlb2YgbWVkaWFTb3VyY2UuaXNUeXBlU3VwcG9ydGVkID09PSAnZnVuY3Rpb24nICYmIG1lZGlhU291cmNlLmlzVHlwZVN1cHBvcnRlZCgndmlkZW8vbXA0OyBjb2RlY3M9XCJhdmMxLjQyRTAxRSxtcDRhLjQwLjJcIicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBTb3VyY2VCdWZmZXIgaXMgZXhwb3NlZCBlbnN1cmUgaXRzIEFQSSBpcyB2YWxpZFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNhZmFyaSBhbmQgb2xkIHZlcnNpb24gb2YgQ2hyb21lIGRvZSBub3QgZXhwb3NlIFNvdXJjZUJ1ZmZlciBnbG9iYWxseSBzbyBjaGVja2luZyBTb3VyY2VCdWZmZXIucHJvdG90eXBlIGlzIGltcG9zc2libGVcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc291cmNlQnVmZmVyVmFsaWRBUEkgPSAhc291cmNlQnVmZmVyIHx8IHNvdXJjZUJ1ZmZlci5wcm90b3R5cGUgJiYgdHlwZW9mIHNvdXJjZUJ1ZmZlci5wcm90b3R5cGUuYXBwZW5kQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBzb3VyY2VCdWZmZXIucHJvdG90eXBlLnJlbW92ZSA9PT0gJ2Z1bmN0aW9uJztcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gISFpc1R5cGVTdXBwb3J0ZWQgJiYgISFzb3VyY2VCdWZmZXJWYWxpZEFQSTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAvL1JlbW92ZSB0aGlzICchIXZpZGVvLmNhblBsYXlUeXBlKCdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcpJyBpZiB5b3Ugd2FudCB0byB1c2UgaGxzanMuXHJcbiAgICAgICAgICAgICAgICAvL1llcyBJIG5lZWQgaGxzanMuIDIwMTktMDYtMTIgJiYgISF2aWRlby5jYW5QbGF5VHlwZSgnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpc0hsc1N1cHBvcnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAncnRtcCcsXHJcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IHNvdXJjZS5maWxlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNvdXJjZS50eXBlO1xyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gdGVzdEZsYXNoKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VwcG9ydCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL0lFIG9ubHlcclxuICAgICAgICAgICAgICAgICAgICBpZihcIkFjdGl2ZVhPYmplY3RcIiBpbiB3aW5kb3cpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1cHBvcnQgPSAhIShuZXcgQWN0aXZlWE9iamVjdChcIlNob2Nrd2F2ZUZsYXNoLlNob2Nrd2F2ZUZsYXNoXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWNhdGNoKGUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VwcG9ydCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1czQywgYmV0dGVyIHN1cHBvcnQgaW4gbGVnYWN5IGJyb3dzZXJcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VwcG9ydCA9ICEhbmF2aWdhdG9yLm1pbWVUeXBlc1snYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2gnXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3VwcG9ydDtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBjaGVja1N1cHBvcnQoKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih1c2VyQWdlbnRPYmplY3QuYnJvd3NlciA9PT0gXCJNaWNyb3NvZnQgRWRnZVwiIHx8IHVzZXJBZ2VudE9iamVjdC5vcyA9PT0gXCJBbmRyb2lkXCIgfHwgdXNlckFnZW50T2JqZWN0Lm9zID09PSBcImlPU1wiICB8fCB1c2VyQWdlbnRPYmplY3QuYnJvd3NlciA9PT0gXCJTYWZhcmlcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGlzUnRtcChmaWxlLCB0eXBlKSAmJiB0ZXN0Rmxhc2goKSAmJiBjaGVja1N1cHBvcnQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgXTtcclxuXHJcbiAgICB0aGF0LmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZSA9IChzb3J1Y2VfKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU3VwcG9ydENoZWNrZXIgOiBmaW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UoKVwiLCBzb3J1Y2VfKTtcclxuICAgICAgICBjb25zdCBzb3VyY2UgPSAoc29ydWNlXyA9PT0gT2JqZWN0KHNvcnVjZV8pKSA/IHNvcnVjZV8gOiB7fTtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgc3VwcG9ydExpc3QubGVuZ3RoOyBpICsrKXtcclxuICAgICAgICAgICAgaWYoc3VwcG9ydExpc3RbaV0uY2hlY2tTdXBwb3J0KHNvdXJjZSkpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1cHBvcnRMaXN0W2ldLm5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhhdC5maW5kUHJvdmlkZXJOYW1lc0J5UGxheWxpc3QgPSAocGxheWxpc3RJdGVtKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU3VwcG9ydENoZWNrZXIgOiBmaW5kUHJvdmlkZXJOYW1lc0J5UGxheWxpc3QoKVwiLCBwbGF5bGlzdEl0ZW0pO1xyXG4gICAgICAgIGxldCBzdXBwb3J0TmFtZXMgPSBbXTtcclxuICAgICAgICAvKmZvciAobGV0IGkgPSBwbGF5bGlzdF8ubGVuZ3RoOyBpLS07KSB7XHJcblxyXG5cclxuICAgICAgICB9Ki9cclxuICAgICAgICBjb25zdCBpdGVtID0gcGxheWxpc3RJdGVtO1xyXG5cclxuICAgICAgICBpZihpdGVtICYmIGl0ZW0uc291cmNlcyl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBpdGVtLnNvdXJjZXMubGVuZ3RoOyBqICsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBzb3VyY2UgPSBpdGVtLnNvdXJjZXNbal07XHJcbiAgICAgICAgICAgICAgICBpZiAoc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3VwcG9ydGVkID0gdGhhdC5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2Uoc291cmNlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3VwcG9ydGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1cHBvcnROYW1lcy5wdXNoKHN1cHBvcnRlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc3VwcG9ydE5hbWVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTdXBwb3J0Q2hlY2tlcjtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiA0Li5cclxuICovXHJcbmltcG9ydCBTcnRQYXJzZXIgZnJvbSBcImFwaS9jYXB0aW9uL3BhcnNlci9TcnRQYXJzZXJcIjtcclxuaW1wb3J0IFZUVEN1ZSBmcm9tIFwidXRpbHMvY2FwdGlvbnMvdnR0Q3VlXCI7XHJcbi8vaW1wb3J0IFJlcXVlc3QgZnJvbSBcInV0aWxzL2Rvd25sb2FkZXJcIjtcclxuXHJcbmNvbnN0IExvYWRlciA9IGZ1bmN0aW9uKCl7XHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcblxyXG4gICAgY29uc3QgY29udmVydFRvVlRUQ3VlcyA9IGZ1bmN0aW9uIChjdWVzKSB7XHJcbiAgICAgICAgcmV0dXJuIGN1ZXMubWFwKGN1ZSA9PiBuZXcgVlRUQ3VlKGN1ZS5zdGFydCwgY3VlLmVuZCwgY3VlLnRleHQpKTtcclxuICAgIH1cclxuICAgIC8vbGFuZ3VhZ2UgOiBmb3IgU01JIGZvcm1hdC5cclxuICAgIHRoYXQubG9hZCA9ICh0cmFjaywgbGFuZ3VhZ2UsIHN1Y2Nlc3NDYWxsYmFjaywgZXJyb3JDYWxsYmFjaykgPT4ge1xyXG5cclxuICAgICAgICB2YXIgcmVxdWVzdE9wdGlvbnMgID0ge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIHVybCA6IHRyYWNrLmZpbGUsXHJcbiAgICAgICAgICAgIGVuY29kaW5nOiBudWxsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbG9hZFJlcXVlc3REb3dubG9kZXIoKS50aGVuKFJlcXVlc3QgPT4ge1xyXG4gICAgICAgICAgICBSZXF1ZXN0KHJlcXVlc3RPcHRpb25zLCBmdW5jdGlvbihlcnJvciwgcmVzcG9uc2UsIGJvZHkpIHtcclxuICAgICAgICAgICAgICAgIGlmKGVycm9yKXtcclxuICAgICAgICAgICAgICAgICAgICBlcnJvckNhbGxiYWNrKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjdWVzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZ0dEN1ZXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJvZHkuaW5kZXhPZignV0VCVlRUJykgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJXRUJWVFQgTE9BREVEXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkVnR0UGFyc2VyKCkudGhlbihXZWJWVFQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBhcnNlciA9IG5ldyBXZWJWVFQuUGFyc2VyKHdpbmRvdywgV2ViVlRULlN0cmluZ0RlY29kZXIoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2dHRDdWVzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZXIub25jdWUgPSBmdW5jdGlvbihjdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2dHRDdWVzLnB1c2goY3VlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZXIub25mbHVzaCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVsZXRlIHRyYWNrLnhocjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzQ2FsbGJhY2sodnR0Q3Vlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUGFyc2UgY2FsbHMgb25mbHVzaCBpbnRlcm5hbGx5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZXIucGFyc2UoYm9keSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVsZXRlIHRyYWNrLnhocjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yQ2FsbGJhY2soZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihib2R5LmluZGV4T2YoJ1NBTUknKSA+PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU0FNSSBMT0FERURcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRTbWlQYXJzZXIoKS50aGVuKFNtaVBhcnNlciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGFyc2VkRGF0YSA9IFNtaVBhcnNlcihib2R5LCB7Zml4ZWRMYW5nIDogbGFuZ3VhZ2V9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZ0dEN1ZXMgPSBjb252ZXJ0VG9WVFRDdWVzKHBhcnNlZERhdGEucmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NDYWxsYmFjayh2dHRDdWVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWxldGUgdHJhY2sueGhyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JDYWxsYmFjayhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlNSVCBMT0FERURcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ZXMgPSBTcnRQYXJzZXIoYm9keSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZ0dEN1ZXMgPSBjb252ZXJ0VG9WVFRDdWVzKGN1ZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzQ2FsbGJhY2sodnR0Q3Vlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAvL2RlbGV0ZSB0cmFjay54aHI7XHJcbiAgICAgICAgICAgIGVycm9yQ2FsbGJhY2soZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuZnVuY3Rpb24gbG9hZFJlcXVlc3REb3dubG9kZXIoKXtcclxuICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ3V0aWxzL2Rvd25sb2FkZXInXSwgZnVuY3Rpb24gKHJlcXVpcmUpIHtcclxuICAgICAgICByZXR1cm4gcmVxdWlyZSgndXRpbHMvZG93bmxvYWRlcicpLmRlZmF1bHQ7XHJcbiAgICB9LCBmdW5jdGlvbihlcnIpe2NvbnNvbGUubG9nKGVycik7fSwgJ2Rvd25sb2FkZXInKTtcclxufTtcclxuZnVuY3Rpb24gbG9hZFZ0dFBhcnNlcigpIHtcclxuICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9jYXB0aW9uL3BhcnNlci9WdHRQYXJzZXInXSwgZnVuY3Rpb24gKHJlcXVpcmUpIHtcclxuICAgICAgICByZXR1cm4gcmVxdWlyZSgnYXBpL2NhcHRpb24vcGFyc2VyL1Z0dFBhcnNlcicpLmRlZmF1bHQ7XHJcbiAgICB9LCBmdW5jdGlvbihlcnIpe2NvbnNvbGUubG9nKGVycik7fSwgJ3Z0dHBhcnNlcicpO1xyXG59XHJcbmZ1bmN0aW9uIGxvYWRTbWlQYXJzZXIoKSB7XHJcbiAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvY2FwdGlvbi9wYXJzZXIvU21pUGFyc2VyJ10sIGZ1bmN0aW9uIChyZXF1aXJlKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlcXVpcmUoJ2FwaS9jYXB0aW9uL3BhcnNlci9TbWlQYXJzZXInKS5kZWZhdWx0O1xyXG4gICAgfSwgZnVuY3Rpb24oZXJyKXtjb25zb2xlLmxvZyhlcnIpO30sICdzbWlwYXJzZXInKTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBMb2FkZXI7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNS4gMTcuLlxyXG4gKi9cclxuaW1wb3J0IENhcHRpb25Mb2FkZXIgZnJvbSAnYXBpL2NhcHRpb24vTG9hZGVyJztcclxuaW1wb3J0IHtSRUFEWSwgRVJST1JTLCBFUlJPUiwgUExBWUVSX0NBUFRJT05fRVJST1IsIENPTlRFTlRfTUVUQSwgQ09OVEVOVF9USU1FLCBDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQsIENPTlRFTlRfQ0FQVElPTl9DSEFOR0VEfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xyXG5cclxuY29uc3QgaXNTdXBwb3J0ID0gZnVuY3Rpb24oa2luZCl7XHJcbiAgICByZXR1cm4ga2luZCA9PT0gJ3N1YnRpdGxlcycgfHwga2luZCA9PT0gJ2NhcHRpb25zJztcclxufTtcclxuXHJcbmNvbnN0IE1hbmFnZXIgPSBmdW5jdGlvbihhcGksIHBsYXlsaXN0SW5kZXgpe1xyXG5cclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIGxldCBjYXB0aW9uTGlzdCA9IFtdO1xyXG4gICAgbGV0IGN1cnJlbnRDYXB0aW9uSW5kZXggPSAtMTtcclxuXHJcbiAgICBsZXQgY2FwdGlvbkxvYWRlciA9IENhcHRpb25Mb2FkZXIoKTtcclxuICAgIGxldCBpc0Zpc3J0TG9hZCA9IHRydWU7XHJcbiAgICBsZXQgaXNTaG93aW5nID0gZmFsc2U7XHJcblxyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ2FwdGlvbiBNYW5hZ2VyID4+IFwiLCBwbGF5bGlzdEluZGV4KTtcclxuXHJcblxyXG4gICAgbGV0IGJpbmRUcmFjayA9IGZ1bmN0aW9uKHRyYWNrLCB2dHRDdWVzKXtcclxuICAgICAgICB0cmFjay5kYXRhID0gdnR0Q3VlcyB8fCBbXTtcclxuICAgICAgICB0cmFjay5uYW1lID0gdHJhY2subGFiZWwgfHwgdHJhY2submFtZSB8fCB0cmFjay5sYW5ndWFnZTtcclxuICAgICAgICB0cmFjay5pZCA9IChmdW5jdGlvbih0cmFjaywgdHJhY2tzQ291bnQpIHtcclxuICAgICAgICAgICAgdmFyIHRyYWNrSWQ7XHJcbiAgICAgICAgICAgIHZhciBwcmVmaXggPSB0cmFjay5raW5kIHx8ICdjYyc7XHJcbiAgICAgICAgICAgIGlmICh0cmFjay5kZWZhdWx0IHx8IHRyYWNrLmRlZmF1bHR0cmFjaykge1xyXG4gICAgICAgICAgICAgICAgdHJhY2tJZCA9ICdkZWZhdWx0JztcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0cmFja0lkID0gdHJhY2suaWQgfHwgKHByZWZpeCArIHRyYWNrc0NvdW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihpc0Zpc3J0TG9hZCl7XHJcbiAgICAgICAgICAgICAgICAvL1RoaXMgZXhlY3V0ZSBvbmx5IG9uLiBhbmQgdGhlbiB1c2UgZmx1c2hDYXB0aW9uTGlzdChsYXN0Q2FwdGlvbkluZGV4KTtcclxuICAgICAgICAgICAgICAgIGNoYW5nZUN1cnJlbnRDYXB0aW9uKGNhcHRpb25MaXN0Lmxlbmd0aHx8MCk7XHJcbiAgICAgICAgICAgICAgICBpc0Zpc3J0TG9hZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJhY2tJZDtcclxuICAgICAgICB9KSh0cmFjaywgY2FwdGlvbkxpc3QubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgY2FwdGlvbkxpc3QucHVzaCh0cmFjayk7XHJcbiAgICAgICAgcmV0dXJuIHRyYWNrLmlkO1xyXG4gICAgfTtcclxuICAgIGxldCBjaGFuZ2VDdXJyZW50Q2FwdGlvbiA9IGZ1bmN0aW9uKGluZGV4KXtcclxuICAgICAgICBjdXJyZW50Q2FwdGlvbkluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgYXBpLnRyaWdnZXIoQ09OVEVOVF9DQVBUSU9OX0NIQU5HRUQsIGN1cnJlbnRDYXB0aW9uSW5kZXgpO1xyXG4gICAgfTtcclxuICAgIGlmKGFwaS5nZXRDb25maWcoKS5wbGF5bGlzdCAmJiBhcGkuZ2V0Q29uZmlnKCkucGxheWxpc3QubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgbGV0IHBsYXlsaXN0ID0gYXBpLmdldENvbmZpZygpLnBsYXlsaXN0W3BsYXlsaXN0SW5kZXhdO1xyXG5cclxuICAgICAgICBpZihwbGF5bGlzdCAmJiBwbGF5bGlzdC50cmFja3MgJiYgcGxheWxpc3QudHJhY2tzLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcGxheWxpc3QudHJhY2tzLmxlbmd0aDsgaSArKyl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0cmFjayA9IHBsYXlsaXN0LnRyYWNrc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihpc1N1cHBvcnQodHJhY2sua2luZCkgJiYgISBfLmZpbmRXaGVyZSh0cmFjaywge2ZpbGUgOiB0cmFjay5maWxlfSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC5mbHVzaENhcHRpb25MaXN0KGN1cnJlbnRDYXB0aW9uSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb25Mb2FkZXIubG9hZCh0cmFjaywgdHJhY2subGFuZywgZnVuY3Rpb24odnR0Q3Vlcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHZ0dEN1ZXMgJiYgdnR0Q3Vlcy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjYXB0aW9uSWQgPSBiaW5kVHJhY2sodHJhY2ssIHZ0dEN1ZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9DQVBUSU9OX0VSUk9SXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwaS50cmlnZ2VyKEVSUk9SLCB0ZW1wRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhcGkub24oQ09OVEVOVF9USU1FLCBmdW5jdGlvbihtZXRhKXtcclxuICAgICAgICBsZXQgcG9zaXRpb24gPSBtZXRhLnBvc2l0aW9uO1xyXG4gICAgICAgIGlmKGN1cnJlbnRDYXB0aW9uSW5kZXggPiAtMSAmJiBjYXB0aW9uTGlzdFtjdXJyZW50Q2FwdGlvbkluZGV4XSl7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50Q3VlcyA9IF8uZmlsdGVyKGNhcHRpb25MaXN0W2N1cnJlbnRDYXB0aW9uSW5kZXhdLmRhdGEsIGZ1bmN0aW9uIChjdWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwb3NpdGlvbiA+PSAoY3VlLnN0YXJ0VGltZSkgJiYgKCAoIWN1ZS5lbmRUaW1lIHx8IHBvc2l0aW9uKSA8PSBjdWUuZW5kVGltZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZihjdXJyZW50Q3VlcyAmJiBjdXJyZW50Q3Vlcy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgIGFwaS50cmlnZ2VyKENPTlRFTlRfQ0FQVElPTl9DVUVfQ0hBTkdFRCwgY3VycmVudEN1ZXNbMF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG4gICAgdGhhdC5mbHVzaENhcHRpb25MaXN0ID0gKGxhc3RDYXB0aW9uSW5kZXgpID0+e1xyXG4gICAgICAgIGNhcHRpb25MaXN0ID0gW107XHJcbiAgICAgICAgY2hhbmdlQ3VycmVudENhcHRpb24obGFzdENhcHRpb25JbmRleCk7XHJcbiAgICAgICAgLy9jdXJyZW50Q2FwdGlvbkluZGV4ID0gbGFzdENhcHRpb25JbmRleDtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldENhcHRpb25MaXN0ID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIGNhcHRpb25MaXN0fHxbXTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEN1cnJlbnRDYXB0aW9uID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRDYXB0aW9uSW5kZXg7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRDdXJyZW50Q2FwdGlvbiA9IChfaW5kZXgpID0+e1xyXG4gICAgICAgIGlmKF9pbmRleCA+IC0yICYmIF9pbmRleCA8IGNhcHRpb25MaXN0Lmxlbmd0aCl7XHJcbiAgICAgICAgICAgIGNoYW5nZUN1cnJlbnRDYXB0aW9uKF9pbmRleCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aGF0LmFkZENhcHRpb24gPSAodHJhY2spID0+e1xyXG4gICAgICAgIGlmKGlzU3VwcG9ydCh0cmFjay5raW5kKSAmJiAhIF8uZmluZFdoZXJlKGNhcHRpb25Mb2FkZXIsIHtmaWxlIDogdHJhY2suZmlsZX0pKXtcclxuICAgICAgICAgICAgY2FwdGlvbkxvYWRlci5sb2FkKHRyYWNrLCBmdW5jdGlvbih2dHRDdWVzKXtcclxuICAgICAgICAgICAgICAgIGlmKHZ0dEN1ZXMgJiYgdnR0Q3Vlcy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICBiaW5kVHJhY2sodHJhY2ssIHZ0dEN1ZXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gZXJyb3JzW1BMQVlFUl9DQVBUSU9OX0VSUk9SXTtcclxuICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgYXBpLnRyaWdnZXIoRVJST1IsIHRlbXBFcnJvcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aGF0LnJlbW92ZUNhcHRpb24gPSAoaW5kZXgpID0+IHtcclxuICAgICAgICBpZihpbmRleCA+IC0xICYmIGluZGV4IDwgY2FwdGlvbkxpc3QubGVuZ3RoKXtcclxuICAgICAgICAgICAgY2FwdGlvbkxpc3Quc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNhcHRpb25MaXN0O1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT4ge1xyXG4gICAgICAgIGNhcHRpb25MaXN0ID0gW107XHJcbiAgICAgICAgY2FwdGlvbkxvYWRlciA9IG51bGw7XHJcbiAgICAgICAgYXBpLm9mZihDT05URU5UX1RJTUUsIG51bGwsIHRoYXQpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1hbmFnZXI7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNS4gMjkuLlxyXG4gKi9cclxuaW1wb3J0IHsgaG1zVG9TZWNvbmQsIHRyaW0gfSBmcm9tIFwidXRpbHMvc3RyaW5nc1wiXHJcblxyXG5mdW5jdGlvbiBfZW50cnkoZGF0YSkge1xyXG4gICAgdmFyIGVudHJ5ID0ge307XHJcbiAgICB2YXIgYXJyYXkgPSBkYXRhLnNwbGl0KCdcXHJcXG4nKTtcclxuICAgIGlmIChhcnJheS5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICBhcnJheSA9IGRhdGEuc3BsaXQoJ1xcbicpO1xyXG4gICAgfVxyXG4gICAgdmFyIGlkeCA9IDE7XHJcbiAgICBpZiAoYXJyYXlbMF0uaW5kZXhPZignIC0tPiAnKSA+IDApIHtcclxuICAgICAgICBpZHggPSAwO1xyXG4gICAgfVxyXG4gICAgaWYgKGFycmF5Lmxlbmd0aCA+IGlkeCArIDEgJiYgYXJyYXlbaWR4ICsgMV0pIHtcclxuICAgICAgICAvLyBUaGlzIGxpbmUgY29udGFpbnMgdGhlIHN0YXJ0IGFuZCBlbmQuXHJcbiAgICAgICAgdmFyIGxpbmUgPSBhcnJheVtpZHhdO1xyXG4gICAgICAgIHZhciBpbmRleCA9IGxpbmUuaW5kZXhPZignIC0tPiAnKTtcclxuICAgICAgICBpZiAoaW5kZXggPiAwKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LnN0YXJ0ID0gaG1zVG9TZWNvbmQobGluZS5zdWJzdHIoMCwgaW5kZXgpKTtcclxuICAgICAgICAgICAgZW50cnkuZW5kID0gaG1zVG9TZWNvbmQobGluZS5zdWJzdHIoaW5kZXggKyA1KSk7XHJcbiAgICAgICAgICAgIGVudHJ5LnRleHQgPSBhcnJheS5zbGljZShpZHggKyAxKS5qb2luKCdcXHJcXG4nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZW50cnk7XHJcblxyXG59XHJcblxyXG5jb25zdCBTcnRQYXJzZXIgPSBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICB2YXIgY2FwdGlvbnMgPSBbXTtcclxuXHJcbiAgICBkYXRhID0gdHJpbShkYXRhKTtcclxuXHJcbiAgICB2YXIgbGlzdCA9IGRhdGEuc3BsaXQoJ1xcclxcblxcclxcbicpO1xyXG4gICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgbGlzdCA9IGRhdGEuc3BsaXQoJ1xcblxcbicpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGxpc3RbaV0gPT09ICdXRUJWVFQnKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZW50cnkgPSBfZW50cnkobGlzdFtpXSk7XHJcbiAgICAgICAgaWYgKGVudHJ5LnRleHQpIHtcclxuICAgICAgICAgICAgY2FwdGlvbnMucHVzaChlbnRyeSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjYXB0aW9ucztcclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBTcnRQYXJzZXI7IiwiLy8gU1RBVEVcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0JVRkZFUklORyA9IFwiYnVmZmVyaW5nXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9JRExFID0gXCJpZGxlXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9DT01QTEVURSA9IFwiY29tcGxldGVcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX1BBVVNFRCA9IFwicGF1c2VkXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9QTEFZSU5HID0gXCJwbGF5aW5nXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9FUlJPUiA9IFwiZXJyb3JcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0xPQURJTkcgPSBcImxvYWRpbmdcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX1NUQUxMRUQgPSBcInN0YWxsZWRcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBTVEFURV9BRF9MT0FESU5HID0gXCJhZExvYWRpbmdcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0FEX0xPQURFRCA9IFwiYWRMb2FkZWRcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0FEX1BMQVlJTkcgPSBcImFkUGxheWluZ1wiO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfQURfUEFVU0VEID0gXCJhZFBhdXNlZFwiO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfQURfQ09NUExFVEUgPSBcImFkQ29tcGxldGVcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0FEX0VSUk9SID0gXCJhZEVycm9yXCI7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfQURfQ0xJQ0sgPSBcImFkY2xpY2tcIjtcclxuXHJcbi8vIFBST1ZJREVSXHJcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9IVE1MNSA9IFwiaHRtbDVcIjtcclxuZXhwb3J0IGNvbnN0IFBST1ZJREVSX1dFQlJUQyA9IFwid2VicnRjXCI7XHJcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9EQVNIID0gXCJkYXNoXCI7XHJcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9ITFMgPSBcImhsc1wiO1xyXG5leHBvcnQgY29uc3QgUFJPVklERVJfUlRNUCA9IFwicnRtcFwiO1xyXG5cclxuLy8gRVZFTlRTXHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0NPTVBMRVRFID0gU1RBVEVfQ09NUExFVEU7XHJcbmV4cG9ydCBjb25zdCBSRUFEWSA9IFwicmVhZHlcIjtcclxuZXhwb3J0IGNvbnN0IERFU1RST1kgPSBcImRlc3Ryb3lcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfU0VFSyA9IFwic2Vla1wiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9CVUZGRVJfRlVMTCA9IFwiYnVmZmVyRnVsbFwiO1xyXG5leHBvcnQgY29uc3QgRElTUExBWV9DTElDSyA9IFwiZGlzcGxheUNsaWNrXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0xPQURFRCA9IFwibG9hZGVkXCI7XHJcbmV4cG9ydCBjb25zdCBQTEFZTElTVF9DSEFOR0VEID0gXCJwbGF5bGlzdENoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfU0VFS0VEID0gXCJzZWVrZWRcIjtcclxuZXhwb3J0IGNvbnN0IEFMTF9QTEFZTElTVF9FTkRFRCA9IFwiYWxsUGxheWxpc3RFbmRlZFwiO1xyXG5leHBvcnQgY29uc3QgTkVUV09SS19VTlNUQUJMRUQgPSBcInVuc3RhYmxlTmV0d29ya1wiO1xyXG5leHBvcnQgY29uc3QgREFTSF9QUkVQQVJFRCA9IFwiZGFzaFByZXBhcmVkXCI7XHJcbmV4cG9ydCBjb25zdCBEQVNIX0RFU1RST1lFRCA9IFwiZGFzaERlc3Ryb3llZFwiO1xyXG5cclxuXHJcblxyXG5leHBvcnQgY29uc3QgRVJST1IgPSBcImVycm9yXCI7XHJcblxyXG4vLyBTVEFURSBPRiBQTEFZRVJcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9TVEFURSA9IFwic3RhdGVDaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfQ09NUExFVEUgPSBTVEFURV9DT01QTEVURTtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9QQVVTRSA9IFwicGF1c2VcIjtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9QTEFZID0gXCJwbGF5XCI7XHJcblxyXG5leHBvcnQgY29uc3QgUExBWUVSX0NMSUNLRUQgPSBcImNsaWNrZWRcIjtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9SRVNJWkVEID0gXCJyZXNpemVkXCI7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfTE9BRElORyA9IFwibG9hZGluZ1wiO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX0ZVTExTQ1JFRU5fUkVRVUVTVCA9IFwiZnVsbHNjcmVlblJlcXVlc3RlZFwiO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX0ZVTExTQ1JFRU5fQ0hBTkdFRCA9IFwiZnVsbHNjcmVlbkNoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9XQVJOSU5HID0gXCJ3YXJuaW5nXCI7XHJcblxyXG5leHBvcnQgY29uc3QgQURfQ0hBTkdFRCA9IFwiYWRDaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBBRF9USU1FID0gXCJhZFRpbWVcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfQlVGRkVSID0gXCJidWZmZXJDaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX1RJTUUgPSBcInRpbWVcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfUkFURV9DSEFOR0UgPSBcInJhdGVjaGFuZ2VcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfVk9MVU1FID0gXCJ2b2x1bWVDaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX01VVEUgPSBcIm11dGVcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfTUVUQSA9IFwibWV0YUNoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfU09VUkNFX0NIQU5HRUQgPSBcInNvdXJjZUNoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfTEVWRUxfQ0hBTkdFRCA9IFwicXVhbGl0eUxldmVsQ2hhbmdlZFwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9EVVJBVElPTl9DSEFOR0VEID0gXCJkdXJhdGlvbkNoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IFBMQVlCQUNLX1JBVEVfQ0hBTkdFRCA9IFwicGxheWJhY2tSYXRlQ2hhbmdlZFwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VEID0gXCJjdWVDaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0NBUFRJT05fQ0hBTkdFRCA9IFwiY2FwdGlvbkNoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfVElNRV9NT0RFX0NIQU5HRUQgPSBcInRpbWVEaXNwbGF5TW9kZUNoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IE9NRV9QMlBfTU9ERSA9IFwicDJwTW9kZVwiO1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBBRF9DTElFTlRfR09PR0xFSU1BID0gXCJnb29nbGVpbWFcIjtcclxuZXhwb3J0IGNvbnN0IEFEX0NMSUVOVF9WQVNUID0gXCJ2YXN0XCI7XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IElOSVRfVU5LTldPTl9FUlJPUiA9IDEwMDtcclxuZXhwb3J0IGNvbnN0IElOSVRfVU5TVVBQT1JUX0VSUk9SID0gMTAxO1xyXG5leHBvcnQgY29uc3QgSU5JVF9SVE1QX1NFVFVQX0VSUk9SID0gMTAyO1xyXG5leHBvcnQgY29uc3QgSU5JVF9EQVNIX1VOU1VQUE9SVCA9IDEwMztcclxuZXhwb3J0IGNvbnN0IElOSVRfQURTX0VSUk9SID0gMTA0O1xyXG5leHBvcnQgY29uc3QgSU5JVF9EQVNIX05PVEZPVU5EID0gMTA1O1xyXG5leHBvcnQgY29uc3QgSU5JVF9ITFNKU19OT1RGT1VORCA9IDEwNjtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX0VSUk9SID0gMzAwO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SID0gMzAxO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fTkVUV09SS19FUlJPUiA9IDMwMjtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUiA9IDMwMztcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9GSUxFX0VSUk9SID0gMzA0O1xyXG5leHBvcnQgY29uc3QgUExBWUVSX0NBUFRJT05fRVJST1IgPSAzMDU7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfQkFEX1JFUVVFU1RfRVJST1IgPSAzMDY7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfQVVUSF9GQUlMRURfRVJST1IgPSAzMDc7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfTk9UX0FDQ0VQVEFCTEVfRVJST1IgPSAzMDg7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1dTX0VSUk9SID0gNTAxO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SID0gNTAyO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19TRVRfUkVNT1RFX0RFU0NfRVJST1IgPSA1MDM7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX0NSRUFURV9BTlNXRVJfRVJST1IgPSA1MDQ7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SID0gNTA1O1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19ORVRXT1JLX1NMT1cgPSA1MTA7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1VORVhQRUNURURfRElTQ09OTkVDVCA9IDUxMTtcclxuXHJcbmV4cG9ydCBjb25zdCBXQVJOX01TR19NVVRFRFBMQVkgPSBcIlBsZWFzZSB0b3VjaCBoZXJlIHRvIHR1cm4gb24gdGhlIHNvdW5kLlwiO1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBVSV9JQ09OUyA9IHtcclxuICAgIHZvbHVtZV9tdXRlIDogXCJ2b2x1bWUtbXV0ZVwiLFxyXG4gICAgb3Bfd2FybmluZyA6IFwib3Atd2FybmluZ1wiXHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IEVSUk9SUyA9IHtjb2RlcyA6IFwiXCJ9O1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBTWVNURU1fVEVYVCA9IFtcclxuICAgIHtcclxuICAgICAgICBcImxhbmdcIiA6IFwiZW5cIixcclxuICAgICAgICBcInVpXCIgOiB7XHJcbiAgICAgICAgICAgIFwiY29udGV4dFwiIDogXCJBYm91dCBPdmVuUGxheWVyXCIsXHJcbiAgICAgICAgICAgIFwiY29udHJvbHNcIiA6IHtcclxuICAgICAgICAgICAgICAgIFwibGl2ZVwiIDogXCJsaXZlXCIsXHJcbiAgICAgICAgICAgICAgICBcImxvd19sYXRlbmN5X2xpdmVcIiA6IFwiU3ViLVNlY29uZCBMYXRlbmN5IFN0cmVhbWluZ1wiLFxyXG4gICAgICAgICAgICAgICAgXCJsb3dfbGF0ZW5jeV9wMnBcIiA6IFwiU3ViLVNlY29uZCBMYXRlbmN5IFAyUFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInBsYXlsaXN0XCIgOiBcIlBsYXlsaXN0XCIsXHJcbiAgICAgICAgICAgIFwic2V0dGluZ1wiIDoge1xyXG4gICAgICAgICAgICAgICAgXCJ0aXRsZVwiIDogXCJTZXR0aW5nc1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzcGVlZFwiIDogXCJTcGVlZFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzcGVlZFVuaXRcIiA6IFwieFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzb3VyY2VcIiA6IFwiU291cmNlXCIsXHJcbiAgICAgICAgICAgICAgICBcInF1YWxpdHlcIiA6IFwiUXVhbGl0eVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjYXB0aW9uXCIgOiBcIkNhcHRpb25cIixcclxuICAgICAgICAgICAgICAgIFwiZGlzcGxheVwiIDogXCJEaXNwbGF5XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJhcGlcIiA6IHtcclxuICAgICAgICAgICAgXCJtZXNzYWdlXCIgOiB7XHJcbiAgICAgICAgICAgICAgICBcIm11dGVkX3BsYXlcIiA6IFwiUGxlYXNlIHRvdWNoIGhlcmUgdG8gdHVybiBvbiB0aGUgc291bmQuXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJlcnJvclwiOiB7XHJcbiAgICAgICAgICAgICAgICAxMDA6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNhbiBub3QgbG9hZCBkdWUgdG8gdW5rbm93biByZWFzb25zLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiQ2FuIG5vdCBsb2FkIGR1ZSB0byB1bmtub3duIHJlYXNvbnMuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAxMDE6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMTAxLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNhbiBub3QgbG9hZCBkdWUgdG8gcGxheWFibGUgbWVkaWEgbm90IGZvdW5kLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiQ2FuIG5vdCBsb2FkIGR1ZSB0byBwbGF5YWJsZSBtZWRpYSBub3QgZm91bmQuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAxMDI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMTAyLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkZsYXNoIGZldGNoaW5nIHByb2Nlc3MgYWJvcnRlZC4gPC9icj48YSBocmVmPSdodHRwOi8vd3d3LmFkb2JlLmNvbS9nby9nZXRmbGFzaHBsYXllcicgdGFyZ2V0PSdfc2VsZic+PGltZyBzcmM9J2h0dHA6Ly93d3cuYWRvYmUuY29tL2ltYWdlcy9zaGFyZWQvZG93bmxvYWRfYnV0dG9ucy9nZXRfZmxhc2hfcGxheWVyLmdpZicgYWx0PSdHZXQgQWRvYmUgRmxhc2ggcGxheWVyJz48L2E+XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJJdCBsb29rcyBsaWtlIG5vdCBmb3VuZCBzd2Ygb3IgeW91ciBlbnZpcm9ubWVudCBpcyBsb2NhbGhvc3QuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAxMDM6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMTAzLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNhbiBub3QgbG9hZCBkdWUgdG8gZGFzaGpzLiBQbGVhc2UgY2hlY2sgdGhlIGxhc3Rlc3QgdmVyc2lvbi5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcImRhc2guanMgdmVyc2lvbiBpcyBvbGQuIFBsZWFzZSBjaGVjayB0aGUgbGFzdGVzdC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDEwNDoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAxMDQsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiQ2FuIG5vdCBsb2FkIGR1ZSB0byBnb29nbGUgaW1hIGZvciBBZHMuIFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiUGxlYXNlIGNoZWNrIHRoZSBnb29nbGUgaW1hIGxpYnJhcnkuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAxMDU6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMTA1LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNhbiBub3QgZmluZCB0aGUgZGFzaGpzLiBQbGVhc2UgY2hlY2sgdGhlIGRhc2hqcy5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIk5vdCBmb3VuZCBkYXNoanMuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAxMDY6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMTA2LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNhbiBub3QgZmluZCB0aGUgaGxzanMuIFBsZWFzZSBjaGVjayB0aGUgaGxzanMuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJOb3QgZm91bmQgaGxzanMuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAzMDA6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMzAwLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNhbiBub3QgcGxheSBkdWUgdG8gdW5rbm93biByZWFzb25zLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiQ2FuIG5vdCBwbGF5IGR1ZSB0byB1bmtub3duIHJlYXNvbnMuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAzMDE6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMzAxLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkZldGNoaW5nIHByb2Nlc3MgYWJvcnRlZCBieSB1c2VyLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiRmV0Y2hpbmcgcHJvY2VzcyBhYm9ydGVkIGJ5IHVzZXIuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAzMDI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMzAyLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIlNvbWUgb2YgdGhlIG1lZGlhIGNvdWxkIG5vdCBiZSBkb3dubG9hZGVkIGR1ZSB0byBhIG5ldHdvcmsgZXJyb3IuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJFcnJvciBvY2N1cnJlZCB3aGVuIGRvd25sb2FkaW5nLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMzAzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwMyxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJVbmFibGUgdG8gbG9hZCBtZWRpYS4gVGhpcyBtYXkgYmUgZHVlIHRvIGEgc2VydmVyIG9yIG5ldHdvcmsgZXJyb3IsIG9yIGR1ZSB0byBhbiB1bnN1cHBvcnRlZCBmb3JtYXQuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJFcnJvciBvY2N1cnJlZCB3aGVuIGRlY29kaW5nLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMzA0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwNCxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJNZWRpYSBwbGF5YmFjayBoYXMgYmVlbiBjYW5jZWxlZC4gSXQgbG9va3MgbGlrZSB5b3VyIG1lZGlhIGlzIGNvcnJ1cHRlZCBvciB5b3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCB0aGUgZmVhdHVyZXMgeW91ciBtZWRpYSB1c2VzLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiTWVkaWEgcGxheWJhY2sgbm90IHN1cHBvcnRlZC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDMwNToge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDUsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiQ2FuIG5vdCBsb2FkIGNhcHRpb25zIGR1ZSB0byB1bmtub3duIHJlYXNvbnMuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJDYW4gbm90IGxvYWQgY2FwdGlvbnMgZHVlIHRvIHVua25vd24gcmVhc29ucy5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDMwNjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDYsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiVW5hYmxlIHRvIGxvYWQgbWVkaWEuIFRoaXMgbWF5IGJlIGR1ZSB0byBhIHNlcnZlciBvciBuZXR3b3JrIGVycm9yLCBvciBkdWUgdG8gYW4gdW5zdXBwb3J0ZWQgZm9ybWF0LlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiVGhlIHNlcnZlciBjYW5ub3Qgb3Igd2lsbCBub3QgcHJvY2VzcyB0aGUgcmVxdWVzdC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDMwNzoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDcsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiVW5hYmxlIHRvIGxvYWQgbWVkaWEuIFRoaXMgbWF5IGJlIGR1ZSB0byBhIHNlcnZlciBvciBuZXR3b3JrIGVycm9yLCBvciBkdWUgdG8gYW4gdW5zdXBwb3J0ZWQgZm9ybWF0LlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiVGhlIHNlcnZlciByZWZ1c2VkIHRoZSByZXF1ZXN0LlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMzA4OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwOCxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJVbmFibGUgdG8gbG9hZCBtZWRpYS4gVGhpcyBtYXkgYmUgZHVlIHRvIGEgc2VydmVyIG9yIG5ldHdvcmsgZXJyb3IsIG9yIGR1ZSB0byBhbiB1bnN1cHBvcnRlZCBmb3JtYXQuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJUaGUgc2VydmVyIGRvIG5vdCBhY2NlcHQgdGhlIHJlcXVlc3QuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA1MDE6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogNTAxLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNvbm5lY3Rpb24gd2l0aCBsb3ctbGF0ZW5jeShPTUUpIHNlcnZlciBmYWlsZWQuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJXZWJTb2NrZXQgY29ubmVjdGlvbiBmYWlsZWQuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA1MDI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogNTAyLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNvbm5lY3Rpb24gd2l0aCBsb3ctbGF0ZW5jeShPTUUpIHNlcnZlciBmYWlsZWQuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJXZWJSVEMgYWRkSWNlQ2FuZGlkYXRlIGZhaWxlZC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDUwMzoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiA1MDMsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiQ29ubmVjdGlvbiB3aXRoIGxvdy1sYXRlbmN5KE9NRSkgc2VydmVyIGZhaWxlZC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIldlYlJUQyBzZXRSZW1vdGVEZXNjcmlwdGlvbiBmYWlsZWQuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA1MDQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogNTA0LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNvbm5lY3Rpb24gd2l0aCBsb3ctbGF0ZW5jeShPTUUpIHNlcnZlciBmYWlsZWQuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJXZWJSVEMgcGVlciBjcmVhdGVPZmZlciBmYWlsZWQuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA1MDU6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogNTA1LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNvbm5lY3Rpb24gd2l0aCBsb3ctbGF0ZW5jeShPTUUpIHNlcnZlciBmYWlsZWQuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJXZWJSVEMgc2V0TG9jYWxEZXNjcmlwdGlvbiBmYWlsZWQuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA1MTA6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogNTEwLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIk5ldHdvcmsgY29ubmVjdGlvbiBpcyB1bnN0YWJsZS4gQ2hlY2sgdGhlIG5ldHdvcmsgY29ubmVjdGlvbi5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIk5ldHdvcmsgaXMgc2xvdy5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDUxMToge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiA1MTEsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiQ29ubmVjdGlvbiB3aXRoIGxvdy1sYXRlbmN5KE9NRSkgdGVybWluYXRlZCB1bmV4cGVjdGVkbHkuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJVbmV4cGVjdGVkIGVuZCBvZiBjb25uZWN0aW9uLlwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwibGFuZ1wiIDogXCJrb1wiLFxyXG4gICAgICAgIFwidWlcIiA6IHtcclxuICAgICAgICAgICAgXCJjb250ZXh0XCIgOiBcIuyYpOu4kO2UjOugiOydtOyWtOyXkCDqtIDtlZjsl6xcIixcclxuICAgICAgICAgICAgXCJjb250cm9sc1wiIDoge1xyXG4gICAgICAgICAgICAgICAgXCJsaXZlXCIgOiBcIuudvOydtOu4jFwiLFxyXG4gICAgICAgICAgICAgICAgXCJsb3dfbGF0ZW5jeV9saXZlXCIgOiBcIuy0iOyggOyngOyXsCDrnbzsnbTruIxcIixcclxuICAgICAgICAgICAgICAgIFwibG93X2xhdGVuY3lfcDJwXCIgOiBcIuy0iOyggOyngOyXsCBQMlBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwbGF5bGlzdFwiIDogXCLtlIzroIjsnbTrpqzsiqTtirhcIixcclxuICAgICAgICAgICAgXCJzZXR0aW5nXCIgOiB7XHJcbiAgICAgICAgICAgICAgICBcInRpdGxlXCIgOiBcIuyEpOyglVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzcGVlZFwiIDogXCLsnqzsg50g7IaN64+EXCIsXHJcbiAgICAgICAgICAgICAgICBcInNwZWVkVW5pdFwiIDogXCJ4XCIsXHJcbiAgICAgICAgICAgICAgICBcInNvdXJjZVwiIDogXCLshozsiqRcIixcclxuICAgICAgICAgICAgICAgIFwicXVhbGl0eVwiIDogXCLtkojsp4hcIixcclxuICAgICAgICAgICAgICAgIFwiY2FwdGlvblwiIDogXCLsnpDrp4lcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzcGxheVwiIDogXCLtkZzsi5xcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImFwaVwiIDoge1xyXG4gICAgICAgICAgICBcIm1lc3NhZ2VcIiA6IHtcclxuICAgICAgICAgICAgICAgIFwibXV0ZWRfcGxheVwiIDogXCLriIzrn6zshJwg7IaM66asIOy8nOq4sFwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZXJyb3JcIjoge1xyXG4gICAgICAgICAgICAgICAgMTAwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCLslYwg7IiYIOyXhuuKlCDsnbTsnKDroZwg66Gc65OcIO2VoCDsiJgg7JeG7Iq164uI64ukLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwi7JWMIOyImCDsl4bripQg7J207Jyg66GcIOuhnOuTnCDtlaAg7IiYIOyXhuyKteuLiOuLpC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDEwMToge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAxMDEsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi7KeA7JuQ65CY64qUIOuvuOuUlOyWtOulvCDssL7sp4Ag66q77ZW0IOuhnOuTnCDtlaAg7IiYIOyXhuyKteuLiOuLpC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIkNhbiBub3QgbG9hZCBkdWUgdG8gcGxheWFibGUgbWVkaWEgbm90IGZvdW5kLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMTAyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDEwMixcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCLtlIzroIjsi5wg66Gc65Oc6rCAIOykkeuLqCDrkJjsl4jsirXri4jri6QuIDwvYnI+PGEgaHJlZj0naHR0cDovL3d3dy5hZG9iZS5jb20vZ28vZ2V0Zmxhc2hwbGF5ZXInIHRhcmdldD0nX3NlbGYnPjxpbWcgc3JjPSdodHRwOi8vd3d3LmFkb2JlLmNvbS9pbWFnZXMvc2hhcmVkL2Rvd25sb2FkX2J1dHRvbnMvZ2V0X2ZsYXNoX3BsYXllci5naWYnIGFsdD0nR2V0IEFkb2JlIEZsYXNoIHBsYXllcic+PC9hPlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiSXQgbG9va3MgbGlrZSBub3QgZm91bmQgc3dmIG9yIHlvdXIgZW52aXJvbm1lbnQgaXMgbG9jYWxob3N0LlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMTAzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDEwMyxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJEYXNoSlProZwg7J247ZW0IOuhnOuTnCDtlaAg7IiYIOyXhuyKteuLiOuLpC4gZGFzaGpzIOuyhOyghOydhCDtmZXsnbjtlbTso7zshLjsmpQuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJkYXNoLmpzIHZlcnNpb24gaXMgb2xkLiBQbGVhc2UgY2hlY2sgdGhlIGxhc3Rlc3QuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAxMDQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMTA0LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkdvb2dsZSBJTUEg65287J2067iM65+s66as6rCAIOyXhuyWtCDroZzrk5wg7ZWgIOyImCDsl4bsirXri4jri6QuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJQbGVhc2UgY2hlY2sgdGhlIGdvb2dsZSBpbWEgbGlicmFyeS5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDEwNToge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAxMDUsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiRGFzaEpTIOudvOydtOu4jOufrOumrOqwgCDsl4bslrQg66Gc65OcIO2VoCDsiJgg7JeG7Iq164uI64ukLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiTm90IGZvdW5kIGRhc2hqcy5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDEwNjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAxMDYsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiSExTSlMg65287J2067iM65+s66as6rCAIOyXhuyWtCDroZzrk5wg7ZWgIOyImCDsl4bsirXri4jri6QuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJOb3QgZm91bmQgaGxzanMuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAzMDA6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMzAwLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIuyVjCDsiJgg7JeG64qUIOydtOycoOuhnCDsnqzsg53tlaAg7IiYIOyXhuyKteuLiOuLpC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIkNhbiBub3QgcGxheSBkdWUgdG8gdW5rbm93biByZWFzb25zLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMzAxOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwMSxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCLsgqzsmqnsnpDsl5Ag7J2Y7ZWcIO2UhOuhnOyEuOyKpCDspJHri6guXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJGZXRjaGluZyBwcm9jZXNzIGFib3J0ZWQgYnkgdXNlci5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDMwMjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi64Sk7Yq47JuM7YGsIOyYpOulmOuhnCDsnbjtlbQg7J2867aAIOuvuOuUlOyWtOulvCDri6TsmrTroZzrk5wg7ZWgIOyImCDsl4bsirXri4jri6QuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJFcnJvciBvY2N1cnJlZCB3aGVuIGRvd25sb2FkaW5nLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMzAzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwMyxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCLrr7jrlJTslrTrpbwg66Gc65OcIO2VoCDsiJgg7JeG7Iq164uI64ukLiDshJzrsoQg65iQ64qUIOuEpO2KuOybjO2BrCDsmKTrpZgg65iQ64qUIOyngOybkOuQmOyngCDslYrripQg7ZiV7Iud7Jy866GcIOyduO2VtCDrsJzsg53tlaAg7IiYIOyeiOyKteuLiOuLpC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIkVycm9yIG9jY3VycmVkIHdoZW4gZGVjb2RpbmcuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAzMDQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMzA0LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIuuvuOuUlOyWtCDsnqzsg53snbQg7Leo7IaM65CY7JeI7Iq164uI64ukLiDrr7jrlJTslrTqsIAg7IaQ7IOB65CY7JeI6rGw64KYIOu4jOudvOyasOyggOqwgCDrr7jrlJTslrTsl5DshJwg7IKs7Jqp7ZWY64qUIOq4sOuKpeydhCDsp4Dsm5DtlZjsp4Ag7JWK64qUIOqygyDqsJnsirXri4jri6QuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJNZWRpYSBwbGF5YmFjayBub3Qgc3VwcG9ydGVkLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMzA1OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwNSxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCLslYwg7IiYIOyXhuuKlCDsnbTsnKDroZwg7J6Q66eJ7J2EIOuhnOuTnCDtlaAg7IiYIOyXhuyKteuLiOuLpC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIkNhbiBub3QgbG9hZCBjYXB0aW9ucyBkdWUgdG8gdW5rbm93biByZWFzb25zLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMzA2OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwNixcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCLrr7jrlJTslrTrpbwg66Gc65OcIO2VoCDsiJgg7JeG7Iq164uI64ukLiDshJzrsoQg65iQ64qUIOuEpO2KuOybjO2BrCDsmKTrpZgg65iQ64qUIOyngOybkOuQmOyngCDslYrripQg7ZiV7Iud7Jy866GcIOyduO2VtCDrsJzsg53tlaAg7IiYIOyeiOyKteuLiOuLpC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIlRoZSBzZXJ2ZXIgY2Fubm90IG9yIHdpbGwgbm90IHByb2Nlc3MgdGhlIHJlcXVlc3QuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAzMDc6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMzA3LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIuuvuOuUlOyWtOulvCDroZzrk5wg7ZWgIOyImCDsl4bsirXri4jri6QuIOyEnOuyhCDrmJDripQg64Sk7Yq47JuM7YGsIOyYpOulmCDrmJDripQg7KeA7JuQ65CY7KeAIOyViuuKlCDtmJXsi53snLzroZwg7J247ZW0IOuwnOyDne2VoCDsiJgg7J6I7Iq164uI64ukLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiVGhlIHNlcnZlciByZWZ1c2VkIHRoZSByZXF1ZXN0LlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMzA4OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwOCxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCLrr7jrlJTslrTrpbwg66Gc65OcIO2VoCDsiJgg7JeG7Iq164uI64ukLiDshJzrsoQg65iQ64qUIOuEpO2KuOybjO2BrCDsmKTrpZgg65iQ64qUIOyngOybkOuQmOyngCDslYrripQg7ZiV7Iud7Jy866GcIOyduO2VtCDrsJzsg53tlaAg7IiYIOyeiOyKteuLiOuLpC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIlRoZSBzZXJ2ZXIgZG8gbm90IGFjY2VwdCB0aGUgcmVxdWVzdC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDUwMToge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiA1MDEsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi7Ju57IaM7LyTIOyXsOqysCDsi6TtjKhcIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIldlYlNvY2tldCBjb25uZWN0aW9uIGZhaWxlZC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDUwMjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiA1MDIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi7KCA7KeA7JewKE9NRSkg7ISc67KE7JmAIOyXsOqysOyXkCDsi6TtjKjtlojsirXri4jri6QuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJXZWJSVEMgYWRkSWNlQ2FuZGlkYXRlIGZhaWxlZC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDUwMzoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiA1MDMsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi7KCA7KeA7JewKE9NRSkg7ISc67KE7JmAIOyXsOqysOyXkCDsi6TtjKjtlojsirXri4jri6QuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJXZWJSVEMgc2V0UmVtb3RlRGVzY3JpcHRpb24gZmFpbGVkLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNTA0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDUwNCxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCLsoIDsp4Dsl7AoT01FKSDshJzrsoTsmYAg7Jew6rKw7JeQIOyLpO2MqO2WiOyKteuLiOuLpC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIldlYlJUQyBwZWVyIGNyZWF0ZU9mZmVyIGZhaWxlZC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDUwNToge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiA1MDUsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi7KCA7KeA7JewKE9NRSkg7ISc67KE7JmAIOyXsOqysOyXkCDsi6TtjKjtlojsirXri4jri6QuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJXZWJSVEMgc2V0TG9jYWxEZXNjcmlwdGlvbiBmYWlsZWQuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA1MTA6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogNTEwLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIuuEpO2KuOybjO2BrCDsl7DqsrDsnbQg67aI7JWI7KCV7ZWp64uI64ukLiDrhKTtirjsm4ztgawg7Jew6rKw7J2EIO2ZleyduO2VmOyLreyLnOyYpC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIk5ldHdvcmsgaXMgc2xvdy5cIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5dOyIsIi8qKlxyXG4gKiBAYnJpZWYgICDrr7jrlJTslrQg7JeY66as66i87Yq466W8IOq0gOumrO2VmOuKlCDqsJ3ssrQuIO2YhOyerOuKlCDtlZjripQg7J287J20IOunjuyngCDslYrri6QuXHJcbiAqIEBwYXJhbSAgIHtlbGVtZW50fSAgIGNvbnRhaW5lciAgIGRvbSBlbGVtZW50XHJcbiAqXHJcbiAqICovXHJcbmltcG9ydCB7Z2V0QnJvd3Nlcn0gZnJvbSBcInV0aWxzL2Jyb3dzZXJcIjtcclxuaW1wb3J0IHtQUk9WSURFUl9EQVNILCBQUk9WSURFUl9ITFMsIFBST1ZJREVSX1dFQlJUQywgUFJPVklERVJfSFRNTDUsIFBST1ZJREVSX1JUTVB9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcbmltcG9ydCBMQSQgZnJvbSBcInV0aWxzL2xpa2VBJC5qc1wiO1xyXG5pbXBvcnQge2dldFNjcmlwdFBhdGh9IGZyb20gJ3V0aWxzL3dlYnBhY2snO1xyXG5pbXBvcnQge3ZlcnNpb259IGZyb20gJ3ZlcnNpb24nO1xyXG4vL1RvRG8gOiBSZXN0cnVjdHVyaW5nXHJcblxyXG5jb25zdCBNYW5hZ2VyID0gZnVuY3Rpb24oY29udGFpbmVyLCBicm93c2VySW5mbyl7XHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICBjb25zdCBTV0ZQYXRoID0gZ2V0U2NyaXB0UGF0aCgnb3ZlbnBsYXllci5qcycpK1wiT3ZlblBsYXllckZsYXNoLnN3Zj92PVwiK3ZlcnNpb247XHJcbiAgICBsZXQgcm9vdElkID0gY29udGFpbmVyLmdldEF0dHJpYnV0ZShcImRhdGEtcGFyZW50LWlkXCIpO1xyXG4gICAgbGV0ICRjb250YWluZXIgPSBMQSQoY29udGFpbmVyKTtcclxuICAgIGxldCB2aWRlb0VsZW1lbnQgPSBcIlwiO1xyXG5cclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIk1lZGlhTWFuYWdlciBsb2FkZWQuIGJyb3dzZXIgOiBcIiwgYnJvd3NlckluZm8gKTtcclxuXHJcbiAgICBjb25zdCBjcmVhdGVIdG1sVmlkZW8gPSBmdW5jdGlvbihpc0xvb3AsIGlzQXV0b1N0YXJ0KXtcclxuXHJcbiAgICAgICAgdmlkZW9FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcclxuICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCdkaXNhYmxlcmVtb3RlcGxheWJhY2snLCAnJyk7XHJcbiAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnd2Via2l0LXBsYXlzaW5saW5lJywgJ3RydWUnKTtcclxuICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCdwbGF5c2lubGluZScsICd0cnVlJyk7XHJcbiAgICAgICAgaWYoaXNMb29wKXtcclxuICAgICAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnbG9vcCcsICcnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaXNBdXRvU3RhcnQpIHtcclxuICAgICAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnYXV0b3BsYXknLCAnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICRjb250YWluZXIuYXBwZW5kKHZpZGVvRWxlbWVudCk7XHJcblxyXG4gICAgICAgIHJldHVybiB2aWRlb0VsZW1lbnQ7XHJcbiAgICB9O1xyXG4gICAgY29uc3QgY3JlYXRlRmxhc2hWaWRlbyA9IGZ1bmN0aW9uKGlzTG9vcCwgYnVmZmVyVGltZSwgYnVmZmVyVGltZU1heCl7XHJcbiAgICAgICAgbGV0IG1vdmllLCBmbGFzaHZhcnMsIGFsbG93c2NyaXB0YWNjZXNzLCBhbGxvd2Z1bGxzY3JlZW4sIHF1YWxpdHksIG5hbWUsIG1lbnUsIHF1YWwsIGJnY29sb3IsIGxvb3AsIHdtb2RlIDtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJNZWRpYU1hbmFnZXIgRmxhc2ggYnVmZmVyIHNldHRpbmcgOiBcIiwgYnVmZmVyVGltZSwgYnVmZmVyVGltZU1heCk7XHJcbiAgICAgICAgbW92aWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgIG1vdmllLnNldEF0dHJpYnV0ZSgnbmFtZScsICdtb3ZpZScpO1xyXG4gICAgICAgIG1vdmllLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBTV0ZQYXRoKTtcclxuXHJcbiAgICAgICAgZmxhc2h2YXJzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICBmbGFzaHZhcnMuc2V0QXR0cmlidXRlKCduYW1lJywgJ2ZsYXNodmFycycpO1xyXG4gICAgICAgIC8vcGxheWVySWQgaXMgdG8gdXNlIFNXRiBmb3IgRXh0ZXJuYWxJbnRlcmZhY2UuY2FsbCgpLlxyXG4gICAgICAgIGZsYXNodmFycy5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgYHBsYXllcklkPSR7cm9vdElkfSZidWZmZXJUaW1lPSR7YnVmZmVyVGltZX0mYnVmZmVyTWF4VGltZT0ke2J1ZmZlclRpbWVNYXh9YCk7XHJcblxyXG4gICAgICAgIGFsbG93c2NyaXB0YWNjZXNzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICBhbGxvd3NjcmlwdGFjY2Vzcy5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnYWxsb3dzY3JpcHRhY2Nlc3MnKTtcclxuICAgICAgICBhbGxvd3NjcmlwdGFjY2Vzcy5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ2Fsd2F5cycpO1xyXG5cclxuICAgICAgICBhbGxvd2Z1bGxzY3JlZW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgIGFsbG93ZnVsbHNjcmVlbi5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnYWxsb3dmdWxsc2NyZWVuJyk7XHJcbiAgICAgICAgYWxsb3dmdWxsc2NyZWVuLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAndHJ1ZScpO1xyXG5cclxuICAgICAgICBxdWFsaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICBxdWFsaXR5LnNldEF0dHJpYnV0ZSgnbmFtZScsICdxdWFsaXR5Jyk7XHJcbiAgICAgICAgcXVhbGl0eS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ2hlaWdodCcpO1xyXG5cclxuICAgICAgICBuYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICBuYW1lLnNldEF0dHJpYnV0ZSgnbmFtZScsICduYW1lJyk7XHJcbiAgICAgICAgbmFtZS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgcm9vdElkK1wiLWZsYXNoXCIpO1xyXG5cclxuICAgICAgICBtZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICBtZW51LnNldEF0dHJpYnV0ZSgnbmFtZScsICdtZW51Jyk7XHJcbiAgICAgICAgbWVudS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ2ZhbHNlJyk7XHJcblxyXG4gICAgICAgIHF1YWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgIHF1YWwuc2V0QXR0cmlidXRlKCduYW1lJywgJ3F1YWxpdHknKTtcclxuICAgICAgICBxdWFsLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnaGlnaCcpO1xyXG5cclxuICAgICAgICBiZ2NvbG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICBiZ2NvbG9yLnNldEF0dHJpYnV0ZSgnbmFtZScsICdiZ2NvbG9yJyk7XHJcbiAgICAgICAgYmdjb2xvci5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJyMwMDAwMDAnKTtcclxuXHJcbiAgICAgICAgd21vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgIHdtb2RlLnNldEF0dHJpYnV0ZSgnbmFtZScsICd3bW9kZScpO1xyXG4gICAgICAgIHdtb2RlLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnb3BhcXVlJyk7XHJcblxyXG4gICAgICAgIC8qbGV0IGFsbG93QnV0dG9uID0gYDxhIGhyZWY9XCJodHRwOi8vd3d3LmFkb2JlLmNvbS9nby9nZXRmbGFzaHBsYXllclwiPjxpbWcgc3JjPVwiaHR0cDovL3d3dy5hZG9iZS5jb20vaW1hZ2VzL3NoYXJlZC9kb3dubG9hZF9idXR0b25zL2dldF9mbGFzaF9wbGF5ZXIuZ2lmXCIgYWx0PVwiR2V0IEFkb2JlIEZsYXNoIHBsYXllclwiPjwvYT5gO1xyXG4gICAgICAgIG1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIG1lc3NhZ2UuaW5uZXJIVE1MID0gYWxsb3dCdXR0b247Ki9cclxuXHJcbiAgICAgICAgaWYoaXNMb29wKXtcclxuICAgICAgICAgICAgbG9vcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgICAgIGxvb3Auc2V0QXR0cmlidXRlKCduYW1lJywgJ2xvb3AnKTtcclxuICAgICAgICAgICAgbG9vcC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ3RydWUnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZpZGVvRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29iamVjdCcpO1xyXG4gICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgcm9vdElkK1wiLWZsYXNoXCIpO1xyXG4gICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCByb290SWQrXCItZmxhc2hcIik7XHJcbiAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAnMTAwJScpO1xyXG4gICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsICcxMDAlJyk7XHJcbiAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnc2NhbGUnLCAnZGVmYXVsdCcpO1xyXG4gICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3dtb2RlJywgJ29wYXF1ZScpO1xyXG5cclxuICAgICAgICBpZihicm93c2VySW5mby5icm93c2VyID09PSBcIk1pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3JlclwiICYmIGJyb3dzZXJJbmZvLmJyb3dzZXJNYWpvclZlcnNpb24gPD0gOSApe1xyXG4gICAgICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCdjbGFzc2lkJywgJ2Nsc2lkOkQyN0NEQjZFLUFFNkQtMTFjZi05NkI4LTQ0NDU1MzU0MDAwMCcpO1xyXG4gICAgICAgICAgICB2aWRlb0VsZW1lbnQuYXBwZW5kQ2hpbGQobW92aWUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhJywgU1dGUGF0aCk7XHJcbiAgICAgICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2gnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaXNMb29wKXtcclxuICAgICAgICAgICAgdmlkZW9FbGVtZW50LmFwcGVuZENoaWxkKGxvb3ApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmlkZW9FbGVtZW50LmFwcGVuZENoaWxkKHdtb2RlKTtcclxuICAgICAgICB2aWRlb0VsZW1lbnQuYXBwZW5kQ2hpbGQoYmdjb2xvcik7XHJcbiAgICAgICAgdmlkZW9FbGVtZW50LmFwcGVuZENoaWxkKHF1YWwpO1xyXG4gICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChhbGxvd2Z1bGxzY3JlZW4pO1xyXG4gICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChhbGxvd3NjcmlwdGFjY2Vzcyk7XHJcbiAgICAgICAgdmlkZW9FbGVtZW50LmFwcGVuZENoaWxkKGZsYXNodmFycyk7XHJcbiAgICAgICAgLy92aWRlb0VsZW1lbnQuYXBwZW5kQ2hpbGQobWVzc2FnZSk7XHJcblxyXG4gICAgICAgICRjb250YWluZXIuYXBwZW5kKHZpZGVvRWxlbWVudCk7XHJcblxyXG4gICAgICAgIHJldHVybiB2aWRlb0VsZW1lbnQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuY3JlYXRlTWVkaWEgPSAocHJvdmlkZXJOYW1lICwgcGxheWVyQ29uZmlnKSAgPT4ge1xyXG4gICAgICAgIGlmKCBwcm92aWRlck5hbWUgPT09IFBST1ZJREVSX1JUTVAgKXtcclxuICAgICAgICAgICAgaWYodmlkZW9FbGVtZW50KXtcclxuICAgICAgICAgICAgICAgIHRoYXQuZW1wdHkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlRmxhc2hWaWRlbyhwbGF5ZXJDb25maWcuaXNMb29wKCksIHBsYXllckNvbmZpZy5nZXRSdG1wQnVmZmVyVGltZSgpLCBwbGF5ZXJDb25maWcuZ2V0UnRtcEJ1ZmZlclRpbWVNYXgoKSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIC8vIGlmKHZpZGVvRWxlbWVudCl7XHJcbiAgICAgICAgICAgIC8vICAgICAvLyB0aGF0LmVtcHR5KCk7XHJcbiAgICAgICAgICAgIC8vICAgICAvL3JldXNlIHZpZGVvIGVsZW1lbnQuXHJcbiAgICAgICAgICAgIC8vICAgICAvL2JlY2F1c2UgcGxheWxpc3QgaXMgYXV0byBuZXh0IHBsYXlpbmcuXHJcbiAgICAgICAgICAgIC8vICAgICAvL09ubHkgc2FtZSB2aWRlbyBlbGVtZW50IGRvZXMgbm90IHJlcXVpcmUgVXNlciBJbnRlcmFjdGlvbiBFcnJvci5cclxuICAgICAgICAgICAgLy8gICAgIHJldHVybiB2aWRlb0VsZW1lbnQ7XHJcbiAgICAgICAgICAgIC8vIH1lbHNle1xyXG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuIGNyZWF0ZUh0bWxWaWRlbyhwbGF5ZXJDb25maWcuaXNMb29wKCksIHBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpKTtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICB0aGF0LmVtcHR5KCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVIdG1sVmlkZW8ocGxheWVyQ29uZmlnLmlzTG9vcCgpLCBwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoYXQuY3JlYXRlQWRDb250YWluZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgbGV0IGFkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgYWRDb250YWluZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdvcC1hZHMnKTtcclxuICAgICAgICAkY29udGFpbmVyLmFwcGVuZChhZENvbnRhaW5lcik7XHJcblxyXG4gICAgICAgIHJldHVybiBhZENvbnRhaW5lcjtcclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoYXQuZW1wdHkgPSAoKSA9PntcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJNZWRpYU1hbmFnZXIgcmVtb3ZlRWxlbWVudCgpXCIpO1xyXG4gICAgICAgICRjb250YWluZXIucmVtb3ZlQ2hpbGQodmlkZW9FbGVtZW50KTtcclxuICAgICAgICB2aWRlb0VsZW1lbnQgPSBudWxsO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcclxuICAgICAgICAkY29udGFpbmVyLnJlbW92ZUNoaWxkKCk7XHJcbiAgICAgICAgJGNvbnRhaW5lciA9IG51bGw7XHJcbiAgICAgICAgdmlkZW9FbGVtZW50ID0gbnVsbDtcclxuICAgICAgICByb290SWQgPSBudWxsO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1hbmFnZXI7XHJcbiIsImltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XHJcbmltcG9ydCB7aXNSdG1wLCBpc1dlYlJUQywgaXNEYXNoIH0gZnJvbSBcInV0aWxzL3ZhbGlkYXRvclwiO1xyXG5pbXBvcnQge2V4dHJhY3RFeHRlbnNpb24gLHRyaW19IGZyb20gXCIuLi8uLi91dGlscy9zdHJpbmdzXCI7XHJcbmltcG9ydCBTdXBwb3J0Q2hlY2tlciBmcm9tIFwiLi4vU3VwcG9ydENoZWNrZXJcIjtcclxuaW1wb3J0IHtQTEFZTElTVF9DSEFOR0VEfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIFRoaXMgbWFuYWdlcyBQbGF5bGlzdCBvciBTb3VyY2VzLlxyXG4gKiBAcGFyYW1cclxuICpcclxuICogKi9cclxuY29uc3QgTWFuYWdlciA9IGZ1bmN0aW9uKHByb3ZpZGVyKXtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIGxldCBjdXJyZW50UGxheWxpc3RJdGVtID0gW107XHJcbiAgICBsZXQgc3BlYyA9IHtcclxuICAgICAgICBwbGF5bGlzdCA6IFtdLFxyXG4gICAgICAgIGN1cnJlbnRJbmRleCA6IDBcclxuICAgIH07XHJcbiAgICBsZXQgc3VwcG9ydENoZWNrZXIgPSBTdXBwb3J0Q2hlY2tlcigpO1xyXG5cclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBsb2FkZWQuXCIpO1xyXG5cclxuICAgIGNvbnN0IG1ha2VQcmV0dHlTb3VyY2UgPSBmdW5jdGlvbihzb3VyY2VfKXtcclxuICAgICAgICBpZiAoIXNvdXJjZV8gfHwgIXNvdXJjZV8uZmlsZSAmJiAhKHNvdXJjZV8uaG9zdCB8fCBzb3VyY2VfLmFwcGxpY2F0aW9uIHx8IHNvdXJjZV8uc3RyZWFtKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc291cmNlID0gT2JqZWN0LmFzc2lnbih7fSwgeyAnZGVmYXVsdCc6IGZhbHNlIH0sIHNvdXJjZV8pO1xyXG4gICAgICAgIHNvdXJjZS5maWxlID0gdHJpbSgnJyArIHNvdXJjZS5maWxlKTtcclxuXHJcbiAgICAgICAgaWYoc291cmNlLmhvc3QgJiYgc291cmNlLmFwcGxpY2F0aW9uICYmIHNvdXJjZS5zdHJlYW0pe1xyXG4gICAgICAgICAgICBzb3VyY2UuZmlsZSA9IHNvdXJjZS5ob3N0ICsgXCIvXCIgKyBzb3VyY2UuYXBwbGljYXRpb24gKyBcIi9zdHJlYW0vXCIgKyBzb3VyY2Uuc3RyZWFtO1xyXG4gICAgICAgICAgICBkZWxldGUgc291cmNlLmhvc3Q7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBzb3VyY2UuYXBwbGljYXRpb247XHJcbiAgICAgICAgICAgIGRlbGV0ZSBzb3VyY2Uuc3RyZWFtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbWltZXR5cGVSZWdFeCA9IC9eW14vXStcXC8oPzp4LSk/KFteL10rKSQvO1xyXG5cclxuICAgICAgICBpZiAobWltZXR5cGVSZWdFeC50ZXN0KHNvdXJjZS50eXBlKSkge1xyXG4gICAgICAgICAgICAvLyBpZiB0eXBlIGlzIGdpdmVuIGFzIGEgbWltZXR5cGVcclxuICAgICAgICAgICAgc291cmNlLm1pbWVUeXBlID0gc291cmNlLnR5cGU7XHJcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gc291cmNlLnR5cGUucmVwbGFjZShtaW1ldHlwZVJlZ0V4LCAnJDEnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGlzUnRtcChzb3VyY2UuZmlsZSkpe1xyXG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdydG1wJztcclxuICAgICAgICB9ZWxzZSBpZihpc1dlYlJUQyhzb3VyY2UuZmlsZSkpe1xyXG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9ICd3ZWJydGMnO1xyXG4gICAgICAgIH1lbHNlIGlmKGlzRGFzaChzb3VyY2UuZmlsZSwgc291cmNlLnR5cGUpKXtcclxuICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnZGFzaCc7XHJcbiAgICAgICAgfWVsc2UgaWYgKCFzb3VyY2UudHlwZSkge1xyXG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9IGV4dHJhY3RFeHRlbnNpb24oc291cmNlLmZpbGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNvdXJjZS5sb3dMYXRlbmN5KSB7XHJcbiAgICAgICAgICAgIHNvdXJjZS5sb3dMYXRlbmN5ID0gc291cmNlLmxvd0xhdGVuY3k7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXNvdXJjZS50eXBlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIG5vcm1hbGl6ZSB0eXBlc1xyXG4gICAgICAgIHN3aXRjaCAoc291cmNlLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnbTN1OCc6XHJcbiAgICAgICAgICAgIGNhc2UgJ3ZuZC5hcHBsZS5tcGVndXJsJzpcclxuICAgICAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ2hscyc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbTRhJzpcclxuICAgICAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ2FhYyc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc21pbCc6XHJcbiAgICAgICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdydG1wJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgICAgIGlmIChzb3VyY2Vba2V5XSA9PT0gJycpIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBzb3VyY2Vba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gc291cmNlO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB0aGF0LmluaXRQbGF5bGlzdCA9KHBsYXlsaXN0LCBwbGF5ZXJDb25maWcpID0+e1xyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQbGF5bGlzdE1hbmFnZXIgc2V0UGxheWxpc3QoKSBcIiwgcGxheWxpc3QpO1xyXG4gICAgICAgIGNvbnN0IHByZXR0aWVkUGxheWxpc3QgPSAoXy5pc0FycmF5KHBsYXlsaXN0KSA/IHBsYXlsaXN0IDogW3BsYXlsaXN0XSkubWFwKGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgICAgICAgICBpZighXy5pc0FycmF5KGl0ZW0udHJhY2tzKSkge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGl0ZW0udHJhY2tzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBwbGF5bGlzdEl0ZW0gPSBPYmplY3QuYXNzaWduKHt9LHtcclxuICAgICAgICAgICAgICAgIHNvdXJjZXM6IFtdLFxyXG4gICAgICAgICAgICAgICAgdHJhY2tzOiBbXSxcclxuICAgICAgICAgICAgICAgIHRpdGxlIDogXCJcIlxyXG4gICAgICAgICAgICB9LCBpdGVtICk7XHJcblxyXG4gICAgICAgICAgICBpZigocGxheWxpc3RJdGVtLnNvdXJjZXMgPT09IE9iamVjdChwbGF5bGlzdEl0ZW0uc291cmNlcykpICYmICFfLmlzQXJyYXkocGxheWxpc3RJdGVtLnNvdXJjZXMpKSB7XHJcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IFttYWtlUHJldHR5U291cmNlKHBsYXlsaXN0SXRlbS5zb3VyY2VzKV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghXy5pc0FycmF5KHBsYXlsaXN0SXRlbS5zb3VyY2VzKSB8fCBwbGF5bGlzdEl0ZW0uc291cmNlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gW21ha2VQcmV0dHlTb3VyY2UocGxheWxpc3RJdGVtKV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKCFfLmlzQXJyYXkocGxheWxpc3RJdGVtLnNvdXJjZXMpIHx8IHBsYXlsaXN0SXRlbS5zb3VyY2VzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ubGV2ZWxzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBpdGVtLmxldmVscztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBbbWFrZVByZXR0eVNvdXJjZShpdGVtKV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcGxheWxpc3RJdGVtLnNvdXJjZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBzb3VyY2UgPSBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXTtcclxuICAgICAgICAgICAgICAgIGxldCBwcmV0dHlTb3VyY2UgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZGVmYXVsdFNvdXJjZSA9IHNvdXJjZS5kZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgaWYgKGRlZmF1bHRTb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2UuZGVmYXVsdCA9IChkZWZhdWx0U291cmNlLnRvU3RyaW5nKCkgPT09ICd0cnVlJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZS5kZWZhdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHNvdXJjZSBkb2Vzbid0IGhhdmUgYSBsYWJlbCwgbnVtYmVyIGl0XHJcbiAgICAgICAgICAgICAgICBpZiAoIXBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldLmxhYmVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0ubGFiZWwgPSBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXS50eXBlK1wiLVwiK2kudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBwcmV0dHlTb3VyY2UgPSBtYWtlUHJldHR5U291cmNlKHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldKTtcclxuICAgICAgICAgICAgICAgIGlmKHN1cHBvcnRDaGVja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShwcmV0dHlTb3VyY2UpKXtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXSA9IHByZXR0eVNvdXJjZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBwbGF5bGlzdEl0ZW0uc291cmNlcy5maWx0ZXIoc291cmNlID0+ICEhc291cmNlKTtcclxuXHJcbiAgICAgICAgICAgIGlmKCFwbGF5bGlzdEl0ZW0udGl0bGUgJiYgIHBsYXlsaXN0SXRlbS5zb3VyY2VzWzBdICYmIHBsYXlsaXN0SXRlbS5zb3VyY2VzWzBdLmxhYmVsKXtcclxuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS50aXRsZSA9IHBsYXlsaXN0SXRlbS5zb3VyY2VzWzBdLmxhYmVsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBkZWZhdWx0IOqwgCDsl4bsnYTrlYwgd2VicnRj6rCAIOyeiOuLpOuptCB3ZWJydGMgZGVmYXVsdCA6IHRydWXroZwg7J6Q64+ZIOyEpOyglVxyXG4gICAgICAgICAgICAvKmxldCBoYXZlRGVmYXVsdCA9IF8uZmluZChwbGF5bGlzdEl0ZW0uc291cmNlcywgZnVuY3Rpb24oc291cmNlKXtyZXR1cm4gc291cmNlLmRlZmF1bHQgPT0gdHJ1ZTt9KTtcclxuICAgICAgICAgICAgbGV0IHdlYnJ0Y1NvdXJjZSA9IFtdO1xyXG4gICAgICAgICAgICBpZighaGF2ZURlZmF1bHQpe1xyXG4gICAgICAgICAgICAgICAgd2VicnRjU291cmNlID0gXy5maW5kKHBsYXlsaXN0SXRlbS5zb3VyY2VzLCBmdW5jdGlvbihzb3VyY2Upe3JldHVybiBzb3VyY2UudHlwZSA9PSBcIndlYnJ0Y1wiO30pO1xyXG4gICAgICAgICAgICAgICAgaWYod2VicnRjU291cmNlKXtcclxuICAgICAgICAgICAgICAgICAgICB3ZWJydGNTb3VyY2UuZGVmYXVsdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0qL1xyXG5cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGV4dHJhY3RPbmx5T25lUHJvdG9jb2woc291cmNlcyl7XHJcbiAgICAgICAgICAgICAgICBpZighIXNvdXJjZXMpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBoaWdoUHJpb3JpdHlUeXBlID0gcGxheWxpc3RJdGVtLnNvdXJjZXNbMF0udHlwZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF8uZmlsdGVyKHNvdXJjZXMsIHt0eXBlIDogaGlnaFByaW9yaXR5VHlwZX0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuaXNDdXJyZW50UHJvdG9jb2xPbmx5KCkpe1xyXG4gICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBleHRyYWN0T25seU9uZVByb3RvY29sKHBsYXlsaXN0SXRlbS5zb3VyY2VzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoIV8uaXNBcnJheShwbGF5bGlzdEl0ZW0udHJhY2tzKSl7XHJcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0udHJhY2tzID0gW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoXy5pc0FycmF5KHBsYXlsaXN0SXRlbS5jYXB0aW9ucykpe1xyXG4gICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnRyYWNrcyA9IHBsYXlsaXN0SXRlbS50cmFja3MuY29uY2F0KHBsYXlsaXN0SXRlbS5jYXB0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgcGxheWxpc3RJdGVtLmNhcHRpb25zO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwbGF5bGlzdEl0ZW0udHJhY2tzID0gcGxheWxpc3RJdGVtLnRyYWNrcy5tYXAoZnVuY3Rpb24odHJhY2spe1xyXG4gICAgICAgICAgICAgICAgaWYoIXRyYWNrIHx8ICF0cmFjay5maWxlKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwge1xyXG4gICAgICAgICAgICAgICAgICAgICdraW5kJzogJ2NhcHRpb25zJyxcclxuICAgICAgICAgICAgICAgICAgICAnZGVmYXVsdCc6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9LCB0cmFjayk7XHJcbiAgICAgICAgICAgIH0pLmZpbHRlcih0cmFjayA9PiAhIXRyYWNrKTtcclxuICAgICAgICAgICAgcmV0dXJuIHBsYXlsaXN0SXRlbTtcclxuICAgICAgICB9KS5maWx0ZXIoZnVuY3Rpb24oaXRlbSl7cmV0dXJuIGl0ZW0uc291cmNlcyAmJiBpdGVtLnNvdXJjZXMubGVuZ3RoID4gMDt9KXx8W107XHJcbiAgICAgICAgc3BlYy5wbGF5bGlzdCA9IHByZXR0aWVkUGxheWxpc3Q7XHJcbiAgICAgICAgcmV0dXJuIHByZXR0aWVkUGxheWxpc3Q7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRQbGF5bGlzdCA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQbGF5bGlzdE1hbmFnZXIgZ2V0UGxheWxpc3QoKSBcIiwgc3BlYy5wbGF5bGlzdCk7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMucGxheWxpc3Q7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRDdXJyZW50UGxheUxpc3QgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoc3BlYy5wbGF5bGlzdFtzcGVjLmN1cnJlbnRJbmRleF0pe1xyXG4gICAgICAgICAgICByZXR1cm4gc3BlYy5wbGF5bGlzdFtzcGVjLmN1cnJlbnRJbmRleF07XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRDdXJyZW50UGxheWxpc3RJbmRleCA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50SW5kZXg7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRDdXJyZW50UGxheWxpc3QgPSAoaW5kZXgpID0+IHtcclxuICAgICAgICBpZihzcGVjLnBsYXlsaXN0W2luZGV4XSl7XHJcbiAgICAgICAgICAgIHNwZWMuY3VycmVudEluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoUExBWUxJU1RfQ0hBTkdFRCwgc3BlYy5jdXJyZW50SW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50SW5kZXg7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRDdXJyZW50U291cmNlcyA9ICgpID0+IHtcclxuICAgICAgICBpZihzcGVjLnBsYXlsaXN0W3NwZWMuY3VycmVudEluZGV4XSl7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBnZXRDdXJyZW50U291cmNlcygpIFwiLCBzcGVjLnBsYXlsaXN0W3NwZWMuY3VycmVudEluZGV4XS5zb3VyY2VzKTtcclxuICAgICAgICAgICAgcmV0dXJuIHNwZWMucGxheWxpc3Rbc3BlYy5jdXJyZW50SW5kZXhdLnNvdXJjZXM7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRDdXJyZW50QWRUYWcgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoc3BlYy5wbGF5bGlzdFtzcGVjLmN1cnJlbnRJbmRleF0pe1xyXG4gICAgICAgICAgICByZXR1cm4gc3BlYy5wbGF5bGlzdFtzcGVjLmN1cnJlbnRJbmRleF0uYWRUYWdVcmwgfHwgXCJcIjtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1hbmFnZXI7XHJcbiIsImltcG9ydCBTdXBwb3J0Q2hlY2tlciBmcm9tIFwiYXBpL1N1cHBvcnRDaGVja2VyXCI7XHJcbmltcG9ydCB7QXBpUnRtcEV4cGFuc2lvbn0gZnJvbSAnYXBpL0FwaUV4cGFuc2lvbnMnO1xyXG5pbXBvcnQge1xyXG4gICAgUFJPVklERVJfSFRNTDUsIFBST1ZJREVSX1dFQlJUQywgUFJPVklERVJfREFTSCwgUFJPVklERVJfSExTLCBQUk9WSURFUl9SVE1QLCBFUlJPUlMsIElOSVRfVU5TVVBQT1JUX0VSUk9SXHJcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBUaGlzIG1hbmFnZXMgcHJvdmlkZXIuXHJcbiAqIEBwYXJhbVxyXG4gKiAqL1xyXG5jb25zdCBDb250cm9sbGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IHN1cHBvcnRDaGFja2VyID0gU3VwcG9ydENoZWNrZXIoKTtcclxuICAgIGNvbnN0IFByb3ZpZGVycyA9IHt9O1xyXG5cclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBsb2FkZWQuXCIpO1xyXG5cclxuICAgIGNvbnN0IHJlZ2lzdGVQcm92aWRlciA9IChuYW1lLCBwcm92aWRlcikgPT4ge1xyXG4gICAgICAgIGlmIChQcm92aWRlcnNbbmFtZV0pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgX3JlZ2lzdGVyUHJvdmlkZXIoKSBcIiwgbmFtZSk7XHJcbiAgICAgICAgUHJvdmlkZXJzW25hbWVdID0gcHJvdmlkZXI7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IFByb3ZpZGVyTG9hZGVyID0ge1xyXG4gICAgICAgIGh0bWw1OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvSHRtbDUnXSwgZnVuY3Rpb24gKHJlcXVpcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvSHRtbDUnKS5kZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVQcm92aWRlcihQUk9WSURFUl9IVE1MNSwgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7bmFtZTogUFJPVklERVJfSFRNTDUsIHByb3ZpZGVyOiBwcm92aWRlcn07XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XHJcbiAgICAgICAgICAgICAgICB9LCAnb3ZlbnBsYXllci5wcm92aWRlci5IdG1sNSdcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHdlYnJ0YzogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvaHRtbDUvcHJvdmlkZXJzL1dlYlJUQyddLCBmdW5jdGlvbiAocmVxdWlyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9XZWJSVEMnKS5kZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVQcm92aWRlcihQUk9WSURFUl9XRUJSVEMsIHByb3ZpZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge25hbWU6IFBST1ZJREVSX1dFQlJUQywgcHJvdmlkZXI6IHByb3ZpZGVyfTtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcclxuICAgICAgICAgICAgICAgIH0sICdvdmVucGxheWVyLnByb3ZpZGVyLldlYlJUQ1Byb3ZpZGVyJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGFzaDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvaHRtbDUvcHJvdmlkZXJzL0Rhc2gnXSwgZnVuY3Rpb24gKHJlcXVpcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvRGFzaCcpLmRlZmF1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFBST1ZJREVSX0RBU0gsIHByb3ZpZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge25hbWU6IFBST1ZJREVSX0RBU0gsIHByb3ZpZGVyOiBwcm92aWRlcn07XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XHJcbiAgICAgICAgICAgICAgICB9LCAnb3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXInXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBobHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IbHMnXSwgZnVuY3Rpb24gKHJlcXVpcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvSGxzJykuZGVmYXVsdDtcclxuICAgICAgICAgICAgICAgICAgICByZWdpc3RlUHJvdmlkZXIoUFJPVklERVJfSExTLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtuYW1lOiBQUk9WSURFUl9ITFMsIHByb3ZpZGVyOiBwcm92aWRlcn07XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XHJcbiAgICAgICAgICAgICAgICB9LCAnb3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcidcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJ0bXA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2ZsYXNoL3Byb3ZpZGVycy9SdG1wJ10sIGZ1bmN0aW9uIChyZXF1aXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvZmxhc2gvcHJvdmlkZXJzL1J0bXAnKS5kZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVQcm92aWRlcihQUk9WSURFUl9SVE1QLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtuYW1lOiBQUk9WSURFUl9SVE1QLCBwcm92aWRlcjogcHJvdmlkZXJ9O1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgfSwgJ292ZW5wbGF5ZXIucHJvdmlkZXIuUnRtcFByb3ZpZGVyJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoYXQubG9hZFByb3ZpZGVycyA9IChwbGF5bGlzdEl0ZW0pID0+IHtcclxuICAgICAgICBjb25zdCBzdXBwb3J0ZWRQcm92aWRlck5hbWVzID0gc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0KHBsYXlsaXN0SXRlbSk7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGxvYWRQcm92aWRlcnMoKSBcIiwgc3VwcG9ydGVkUHJvdmlkZXJOYW1lcyk7XHJcbiAgICAgICAgaWYgKCFzdXBwb3J0ZWRQcm92aWRlck5hbWVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChFUlJPUlMuY29kZXNbSU5JVF9VTlNVUFBPUlRfRVJST1JdKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoXHJcbiAgICAgICAgICAgICAgICBzdXBwb3J0ZWRQcm92aWRlck5hbWVzLmZpbHRlcihmdW5jdGlvbiAocHJvdmlkZXJOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEhUHJvdmlkZXJMb2FkZXJbcHJvdmlkZXJOYW1lXTtcclxuICAgICAgICAgICAgICAgIH0pLm1hcChmdW5jdGlvbiAocHJvdmlkZXJOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb3ZpZGVyTG9hZGVyW3Byb3ZpZGVyTmFtZV0oKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5maW5kQnlOYW1lID0gKG5hbWUpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgZmluZEJ5TmFtZSgpIFwiLCBuYW1lKTtcclxuICAgICAgICByZXR1cm4gUHJvdmlkZXJzW25hbWVdO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldFByb3ZpZGVyQnlTb3VyY2UgPSAoc291cmNlKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc3VwcG9ydGVkUHJvdmlkZXJOYW1lID0gc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKHNvdXJjZSk7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGdldFByb3ZpZGVyQnlTb3VyY2UoKSBcIiwgc3VwcG9ydGVkUHJvdmlkZXJOYW1lKTtcclxuICAgICAgICByZXR1cm4gdGhhdC5maW5kQnlOYW1lKHN1cHBvcnRlZFByb3ZpZGVyTmFtZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuaXNTYW1lUHJvdmlkZXIgPSAoY3VycmVudFNvdXJjZSwgbmV3U291cmNlKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGlzU2FtZVByb3ZpZGVyKCkgXCIsIHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShjdXJyZW50U291cmNlKSwgc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKG5ld1NvdXJjZSkpO1xyXG4gICAgICAgIHJldHVybiBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UoY3VycmVudFNvdXJjZSkgPT09IHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShuZXdTb3VyY2UpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbnRyb2xsZXI7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gMTEuIDEyLi5cclxuICovXHJcbmltcG9ydCB7RVJST1IsIFNUQVRFX0VSUk9SfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGV4dHJhY3RWaWRlb0VsZW1lbnQgPSBmdW5jdGlvbihlbGVtZW50T3JNc2UpIHtcclxuICAgIGlmKF8uaXNFbGVtZW50KGVsZW1lbnRPck1zZSkpe1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50T3JNc2U7XHJcbiAgICB9XHJcbiAgICBpZihlbGVtZW50T3JNc2UuZ2V0VmlkZW9FbGVtZW50KXtcclxuICAgICAgICByZXR1cm4gZWxlbWVudE9yTXNlLmdldFZpZGVvRWxlbWVudCgpO1xyXG4gICAgfWVsc2UgaWYoZWxlbWVudE9yTXNlLm1lZGlhKXtcclxuICAgICAgICByZXR1cm4gZWxlbWVudE9yTXNlLm1lZGlhO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgc2VwYXJhdGVMaXZlID0gZnVuY3Rpb24obXNlKSB7XHJcbiAgICAvL1RvRG8gOiBZb3UgY29uc2lkZXIgaGxzanMuIEJ1dCBub3Qgbm93IGJlY2F1c2Ugd2UgZG9uJ3Qgc3VwcG9ydCBobHNqcy5cclxuXHJcbiAgICBpZihtc2UgJiYgbXNlLmlzRHluYW1pYyl7XHJcbiAgICAgICAgcmV0dXJuIG1zZS5pc0R5bmFtaWMoKTtcclxuICAgIH1lbHNle1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBlcnJvclRyaWdnZXIgPSBmdW5jdGlvbihlcnJvciwgcHJvdmlkZXIpe1xyXG4gICAgaWYocHJvdmlkZXIpe1xyXG4gICAgICAgIHByb3ZpZGVyLnNldFN0YXRlKFNUQVRFX0VSUk9SKTtcclxuICAgICAgICBwcm92aWRlci5wYXVzZSgpO1xyXG4gICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoRVJST1IsIGVycm9yICk7XHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHBpY2tDdXJyZW50U291cmNlID0gKHNvdXJjZXMsIHBsYXllckNvbmZpZykgPT4ge1xyXG5cclxuICAgIGxldCBzb3VyY2VJbmRleCA9IDA7XHJcblxyXG4gICAgaWYgKHNvdXJjZXMpIHtcclxuXHJcbiAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRTb3VyY2VJbmRleCgpID09PSAtMSkge1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3VyY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc291cmNlc1tpXS5kZWZhdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlSW5kZXggPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIHNvdXJjZUluZGV4ID0gcGxheWVyQ29uZmlnLmdldFNvdXJjZUluZGV4KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc291cmNlSW5kZXg7XHJcbn0iLCJpbXBvcnQgQVBJIGZyb20gJ2FwaS9BcGknO1xyXG5pbXBvcnQge2lzV2ViUlRDfSBmcm9tICd1dGlscy92YWxpZGF0b3InO1xyXG5pbXBvcnQgXyBmcm9tICd1dGlscy91bmRlcnNjb3JlJztcclxuaW1wb3J0IExhJCBmcm9tICd1dGlscy9saWtlQSQnO1xyXG5pbXBvcnQge2dldFNjcmlwdFBhdGh9IGZyb20gJ3V0aWxzL3dlYnBhY2snO1xyXG5cclxuXHJcbl9fd2VicGFja19wdWJsaWNfcGF0aF9fID0gZ2V0U2NyaXB0UGF0aCgnb3ZlbnBsYXllci5zZGsuanMnKTtcclxuXHJcbi8qKlxyXG4gKiBNYWluIE92ZW5QbGF5ZXJTREsgb2JqZWN0XHJcbiAqL1xyXG5jb25zdCBPdmVuUGxheWVyU0RLID0gd2luZG93Lk92ZW5QbGF5ZXJTREsgPSB7fTtcclxuXHJcbmNvbnN0IHBsYXllckxpc3QgPSBPdmVuUGxheWVyU0RLLnBsYXllckxpc3QgPSBbXTtcclxuXHJcbmV4cG9ydCBjb25zdCBjaGVja0FuZEdldENvbnRhaW5lckVsZW1lbnQgPSBmdW5jdGlvbihjb250YWluZXIpIHtcclxuICAgIGlmICghY29udGFpbmVyKSB7XHJcblxyXG4gICAgICAgIC8vIFRPRE8ocm9jayk6IFNob3VsZCBjYXVzZSBhbiBlcnJvci5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgY29udGFpbmVyRWxlbWVudCA9IG51bGw7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBjb250YWluZXIgPT09ICdzdHJpbmcnKSB7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lckVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb250YWluZXIpO1xyXG4gICAgfSBlbHNlIGlmIChjb250YWluZXIubm9kZVR5cGUpIHtcclxuXHJcbiAgICAgICAgY29udGFpbmVyRWxlbWVudCA9IGNvbnRhaW5lcjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gVE9ETyhyb2NrKTogU2hvdWxkIGNhdXNlIGFuIGVycm9yLlxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjb250YWluZXJFbGVtZW50O1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlIHBsYXllciBpbnN0YW5jZSBhbmQgcmV0dXJuIGl0LlxyXG4gKlxyXG4gKiBAcGFyYW0gICAgICB7c3RyaW5nIHwgZG9tIGVsZW1lbnR9IGNvbnRhaW5lciAgSWQgb2YgY29udGFpbmVyIGVsZW1lbnQgb3IgY29udGFpbmVyIGVsZW1lbnRcclxuICogQHBhcmFtICAgICAge29iamVjdH0gb3B0aW9ucyAgVGhlIG9wdGlvbnNcclxuICovXHJcbk92ZW5QbGF5ZXJTREsuY3JlYXRlID0gZnVuY3Rpb24oY29udGFpbmVyLCBvcHRpb25zKSB7XHJcblxyXG4gICAgbGV0IGNvbnRhaW5lckVsZW1lbnQgPSBjaGVja0FuZEdldENvbnRhaW5lckVsZW1lbnQoY29udGFpbmVyKTtcclxuXHJcbiAgICBjb25zdCBwbGF5ZXJJbnN0YW5jZSA9IEFQSShjb250YWluZXJFbGVtZW50KTtcclxuICAgIHBsYXllckluc3RhbmNlLmluaXQob3B0aW9ucyk7XHJcblxyXG4gICAgcGxheWVyTGlzdC5wdXNoKHBsYXllckluc3RhbmNlKTtcclxuXHJcbiAgICByZXR1cm4gcGxheWVySW5zdGFuY2U7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgcGxheWVyIGluc3RhbmNlIGxpc3QuXHJcbiAqXHJcbiAqIEByZXR1cm4gICAgIHthcnJheX0gIFRoZSBwbGF5ZXIgbGlzdC5cclxuICovXHJcbk92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyTGlzdCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHJldHVybiBwbGF5ZXJMaXN0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIHBsYXllciBpbnN0YW5jZSBieSBjb250YWluZXIgaWQuXHJcbiAqXHJcbiAqIEBwYXJhbSAgICAgIHtzdHJpbmd9ICBjb250YWluZXJJZCAgVGhlIGNvbnRhaW5lciBpZGVudGlmaWVyXHJcbiAqIEByZXR1cm4gICAgIHtvYmVqZWN0IHwgbnVsbH0gIFRoZSBwbGF5ZXIgaW5zdGFuY2UuXHJcbiAqL1xyXG5PdmVuUGxheWVyU0RLLmdldFBsYXllckJ5Q29udGFpbmVySWQgPSBmdW5jdGlvbihjb250YWluZXJJZCkge1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxheWVyTGlzdC5sZW5ndGg7IGkgKyspIHtcclxuXHJcbiAgICAgICAgaWYgKHBsYXllckxpc3RbaV0uZ2V0Q29udGFpbmVySWQoKSA9PT0gY29udGFpbmVySWQpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBwbGF5ZXJMaXN0W2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBwbGF5ZXIgaW5zdGFuY2UgYnkgaW5kZXguXHJcbiAqXHJcbiAqIEBwYXJhbSAgICAgIHtudW1iZXJ9ICBpbmRleCAgIFRoZSBpbmRleFxyXG4gKiBAcmV0dXJuICAgICB7b2JqZWN0IHwgbnVsbH0gIFRoZSBwbGF5ZXIgaW5zdGFuY2UuXHJcbiAqL1xyXG5PdmVuUGxheWVyU0RLLmdldFBsYXllckJ5SW5kZXggPSBmdW5jdGlvbihpbmRleCkge1xyXG5cclxuICAgIGNvbnN0IHBsYXllckluc3RhbmNlID0gcGxheWVyTGlzdFtpbmRleF07XHJcblxyXG4gICAgaWYgKHBsYXllckluc3RhbmNlKSB7XHJcblxyXG4gICAgICAgIHJldHVybiBwbGF5ZXJJbnN0YW5jZTtcclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSB0aGUgcGxheWVyIGluc3RhbmNlIGJ5IHBsYXllcklkLlxyXG4gKlxyXG4gKiBAcGFyYW0gICAgICB7cGxheWVySWR9ICBpZFxyXG4gKiBAcmV0dXJuICAgICB7bnVsbH1cclxuICovXHJcbk92ZW5QbGF5ZXJTREsucmVtb3ZlUGxheWVyID0gZnVuY3Rpb24ocGxheWVySWQpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxheWVyTGlzdC5sZW5ndGg7IGkgKyspIHtcclxuXHJcbiAgICAgICAgaWYgKHBsYXllckxpc3RbaV0uZ2V0Q29udGFpbmVySWQoKSA9PT0gcGxheWVySWQpIHtcclxuXHJcbiAgICAgICAgICAgIHBsYXllckxpc3Quc3BsaWNlKGksIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn07XHJcblxyXG4vKipcclxuICogR2VuZXJhdGUgd2VicnRjIHNvdXJjZSBmb3IgcGxheWVyIHNvdXJjZSB0eXBlLlxyXG4gKlxyXG4gKiBAcGFyYW0gICAgICB7T2JqZWN0IHwgQXJyYXl9ICBzb3VyY2UgICB3ZWJydGMgc291cmNlXHJcbiAqIEByZXR1cm4gICAgIHtBcnJheX0gIFBsYXllciBzb3VyY2UgT2JqZWN0LlxyXG4gKi9cclxuT3ZlblBsYXllclNESy5nZW5lcmF0ZVdlYnJ0Y1VybHMgPSBmdW5jdGlvbihzb3VyY2VzKSB7XHJcbiAgICByZXR1cm4gKF8uaXNBcnJheShzb3VyY2VzKSA/IHNvdXJjZXMgOiBbc291cmNlc10pLm1hcChmdW5jdGlvbihzb3VyY2UsIGluZGV4KXtcclxuICAgICAgICBpZihzb3VyY2UuaG9zdCAmJiBpc1dlYlJUQyhzb3VyY2UuaG9zdCkgJiYgc291cmNlLmFwcGxpY2F0aW9uICYmIHNvdXJjZS5zdHJlYW0pe1xyXG4gICAgICAgICAgICByZXR1cm4ge2ZpbGUgOiBzb3VyY2UuaG9zdCArIFwiL1wiICsgc291cmNlLmFwcGxpY2F0aW9uICsgXCIvXCIgKyBzb3VyY2Uuc3RyZWFtLCB0eXBlIDogXCJ3ZWJydGNcIiwgbGFiZWwgOiBzb3VyY2UubGFiZWwgPyBzb3VyY2UubGFiZWwgOiBcIndlYnJ0Yy1cIisoaW5kZXgrMSkgfTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXaGV0aGVyIHNob3cgdGhlIHBsYXllciBjb3JlIGxvZyBvciBub3QuXHJcbiAqXHJcbiAqIEBwYXJhbSAgICAgIHtib29sZWFufSAgYm9vbGVhbiAgIHJ1biBkZWJ1ZyBtb2RlIG9yIG5vdC5cclxuICogQHJldHVybiAgICAge2Jvb2xlYW59ICBydW4gZGVidWcgbW9kZSBvciBub3QuXHJcbiAqL1xyXG5PdmVuUGxheWVyU0RLLmRlYnVnID0gZnVuY3Rpb24oaXNEZWJ1Z01vZGUpIHtcclxuICAgIGlmKGlzRGVidWdNb2RlKXtcclxuICAgICAgICB3aW5kb3cuT3ZlblBsYXllckNvbnNvbGUgPSB7bG9nIDogd2luZG93Wydjb25zb2xlJ11bJ2xvZyddfTtcclxuICAgIH1lbHNle1xyXG4gICAgICAgIHdpbmRvdy5PdmVuUGxheWVyQ29uc29sZSA9IHtsb2cgOiAgZnVuY3Rpb24oKXt9fTtcclxuICAgIH1cclxuICAgIHJldHVybiBpc0RlYnVnTW9kZTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE92ZW5QbGF5ZXJTREs7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gOC4gMjQuLlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRCcm93c2VyTGFuZ3VhZ2UgPSBmdW5jdGlvbigpe1xyXG4gICAgbGV0IG5hdiA9IHdpbmRvdy5uYXZpZ2F0b3IsXHJcbiAgICAgICAgYnJvd3Nlckxhbmd1YWdlUHJvcGVydHlLZXlzID0gWydsYW5ndWFnZScsICdicm93c2VyTGFuZ3VhZ2UnLCAnc3lzdGVtTGFuZ3VhZ2UnLCAndXNlckxhbmd1YWdlJ10sXHJcbiAgICAgICAgaSxcclxuICAgICAgICBsYW5ndWFnZTtcclxuXHJcbiAgICAvLyBzdXBwb3J0IGZvciBIVE1MIDUuMSBcIm5hdmlnYXRvci5sYW5ndWFnZXNcIlxyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkobmF2Lmxhbmd1YWdlcykpIHtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbmF2Lmxhbmd1YWdlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsYW5ndWFnZSA9IG5hdi5sYW5ndWFnZXNbaV07XHJcbiAgICAgICAgICAgIGlmIChsYW5ndWFnZSAmJiBsYW5ndWFnZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsYW5ndWFnZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBzdXBwb3J0IGZvciBvdGhlciB3ZWxsIGtub3duIHByb3BlcnRpZXMgaW4gYnJvd3NlcnNcclxuICAgIGZvciAoaSA9IDA7IGkgPCBicm93c2VyTGFuZ3VhZ2VQcm9wZXJ0eUtleXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsYW5ndWFnZSA9IG5hdlticm93c2VyTGFuZ3VhZ2VQcm9wZXJ0eUtleXNbaV1dO1xyXG4gICAgICAgIGlmIChsYW5ndWFnZSAmJiBsYW5ndWFnZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxhbmd1YWdlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxuZXhwb3J0IGNvbnN0IGFuYWxVc2VyQWdlbnQgPSBmdW5jdGlvbigpe1xyXG4gICAgbGV0IHVua25vd24gPSAnLSc7XHJcblxyXG4gICAgLy8gc2NyZWVuXHJcbiAgICBsZXQgc2NyZWVuU2l6ZSA9ICcnO1xyXG4gICAgaWYgKHNjcmVlbi53aWR0aCkge1xyXG4gICAgICAgIGxldCB3aWR0aCA9IChzY3JlZW4ud2lkdGgpID8gc2NyZWVuLndpZHRoIDogJyc7XHJcbiAgICAgICAgbGV0IGhlaWdodCA9IChzY3JlZW4uaGVpZ2h0KSA/IHNjcmVlbi5oZWlnaHQgOiAnJztcclxuICAgICAgICBzY3JlZW5TaXplICs9ICcnICsgd2lkdGggKyBcIiB4IFwiICsgaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGJyb3dzZXJcclxuICAgIGxldCBuVmVyID0gbmF2aWdhdG9yLmFwcFZlcnNpb247XHJcbiAgICBsZXQgbkFndCA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XHJcbiAgICBsZXQgYnJvd3NlciA9IG5hdmlnYXRvci5hcHBOYW1lO1xyXG4gICAgbGV0IHZlcnNpb24gPSAnJyArIHBhcnNlRmxvYXQobmF2aWdhdG9yLmFwcFZlcnNpb24pO1xyXG4gICAgbGV0IG1ham9yVmVyc2lvbiA9IHBhcnNlSW50KG5hdmlnYXRvci5hcHBWZXJzaW9uLCAxMCk7XHJcbiAgICBsZXQgaXNXZWJ2aWV3ID0gZmFsc2U7XHJcbiAgICBsZXQgbmFtZU9mZnNldCwgdmVyT2Zmc2V0LCBpeDtcclxuXHJcbiAgICAvLyBPcGVyYVxyXG4gICAgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ09wZXJhJykpICE9IC0xKSB7XHJcbiAgICAgICAgYnJvd3NlciA9ICdPcGVyYSc7XHJcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDYpO1xyXG4gICAgICAgIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdWZXJzaW9uJykpICE9IC0xKSB7XHJcbiAgICAgICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA4KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBPcGVyYSBOZXh0XHJcbiAgICBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignT1BSJykpICE9IC0xKSB7XHJcbiAgICAgICAgYnJvd3NlciA9ICdPcGVyYSc7XHJcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDQpO1xyXG4gICAgfVxyXG4gICAgLy/sgrzshLEg67iM65287Jqw7KCAXHJcbiAgICBlbHNlIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdTYW1zdW5nQnJvd3NlcicpKSAhPSAtMSkge1xyXG4gICAgICAgIGJyb3dzZXIgPSAnU2Ftc3VuZ0Jyb3dzZXInO1xyXG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyAxNSk7XHJcbiAgICB9XHJcbiAgICAvLyBFZGdlXHJcbiAgICBlbHNlIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdFZGdlJykpICE9IC0xKSB7XHJcbiAgICAgICAgYnJvd3NlciA9ICdNaWNyb3NvZnQgRWRnZSc7XHJcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDUpO1xyXG4gICAgfVxyXG4gICAgLy8gTVNJRVxyXG4gICAgZWxzZSBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignTVNJRScpKSAhPSAtMSkge1xyXG4gICAgICAgIGJyb3dzZXIgPSAnTWljcm9zb2Z0IEludGVybmV0IEV4cGxvcmVyJztcclxuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNSk7XHJcblxyXG5cclxuICAgICAgICAvL3dpbjcgSUUxMSB1c2VyQWdlbnQgaXMgdWdseS4uLi5cclxuICAgICAgICBpZiggKG5BZ3QuaW5kZXhPZignVHJpZGVudC8nKSAhPT0gLTEpICYmIChuQWd0LmluZGV4T2YoJ3J2OicpICE9PSAtMSkgICl7XHJcbiAgICAgICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyhuQWd0LmluZGV4T2YoJ3J2OicpICsgMyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gQ2hyb21lXHJcbiAgICBlbHNlIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdDaHJvbWUnKSkgIT0gLTEpIHtcclxuICAgICAgICBicm93c2VyID0gJ0Nocm9tZSc7XHJcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDcpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignQ3JpT1MnKSkgIT0gLTEpIHsgICAvL2lwaG9uZSAtIGNocm9tZVxyXG4gICAgICAgIGJyb3dzZXIgPSAnQ2hyb21lJztcclxuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNik7XHJcbiAgICB9XHJcbiAgICAvLyBGaXJlZm94XHJcbiAgICBlbHNlIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdGaXJlZm94JykpICE9IC0xKSB7XHJcbiAgICAgICAgYnJvd3NlciA9ICdGaXJlZm94JztcclxuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgOCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdGeGlPUycpKSAhPSAtMSkge1xyXG4gICAgICAgIGJyb3dzZXIgPSAnRmlyZWZveCc7XHJcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDYpO1xyXG4gICAgfVxyXG4gICAgLy8gU2FmYXJpXHJcbiAgICBlbHNlIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdTYWZhcmknKSkgIT0gLTEpIHtcclxuICAgICAgICBicm93c2VyID0gJ1NhZmFyaSc7XHJcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDcpO1xyXG4gICAgICAgIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdWZXJzaW9uJykpICE9IC0xKSB7XHJcbiAgICAgICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA4KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIE1TSUUgMTErXHJcbiAgICBlbHNlIGlmIChuQWd0LmluZGV4T2YoJ1RyaWRlbnQvJykgIT09IC0xKSB7XHJcbiAgICAgICAgYnJvd3NlciA9ICdNaWNyb3NvZnQgSW50ZXJuZXQgRXhwbG9yZXInO1xyXG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyhuQWd0LmluZGV4T2YoJ3J2OicpICsgMyk7XHJcbiAgICB9XHJcbiAgICAvLyBPdGhlciBicm93c2Vyc1xyXG4gICAgZWxzZSBpZiAoKG5hbWVPZmZzZXQgPSBuQWd0Lmxhc3RJbmRleE9mKCcgJykgKyAxKSA8ICh2ZXJPZmZzZXQgPSBuQWd0Lmxhc3RJbmRleE9mKCcvJykpKSB7XHJcbiAgICAgICAgYnJvd3NlciA9IG5BZ3Quc3Vic3RyaW5nKG5hbWVPZmZzZXQsIHZlck9mZnNldCk7XHJcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDEpO1xyXG4gICAgICAgIGlmIChicm93c2VyLnRvTG93ZXJDYXNlKCkgPT0gYnJvd3Nlci50b1VwcGVyQ2FzZSgpKSB7XHJcbiAgICAgICAgICAgIGJyb3dzZXIgPSBuYXZpZ2F0b3IuYXBwTmFtZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZihuQWd0LmluZGV4T2YoJyB3dicpID4gMCl7XHJcbiAgICAgICAgaXNXZWJ2aWV3ID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8vIHRyaW0gdGhlIHZlcnNpb24gc3RyaW5nXHJcbiAgICBpZiAoKGl4ID0gdmVyc2lvbi5pbmRleE9mKCc7JykpICE9IC0xKSB2ZXJzaW9uID0gdmVyc2lvbi5zdWJzdHJpbmcoMCwgaXgpO1xyXG4gICAgaWYgKChpeCA9IHZlcnNpb24uaW5kZXhPZignICcpKSAhPSAtMSkgdmVyc2lvbiA9IHZlcnNpb24uc3Vic3RyaW5nKDAsIGl4KTtcclxuICAgIGlmICgoaXggPSB2ZXJzaW9uLmluZGV4T2YoJyknKSkgIT0gLTEpIHZlcnNpb24gPSB2ZXJzaW9uLnN1YnN0cmluZygwLCBpeCk7XHJcblxyXG4gICAgbWFqb3JWZXJzaW9uID0gcGFyc2VJbnQoJycgKyB2ZXJzaW9uLCAxMCk7XHJcbiAgICBpZiAoaXNOYU4obWFqb3JWZXJzaW9uKSkge1xyXG4gICAgICAgIHZlcnNpb24gPSAnJyArIHBhcnNlRmxvYXQobmF2aWdhdG9yLmFwcFZlcnNpb24pO1xyXG4gICAgICAgIG1ham9yVmVyc2lvbiA9IHBhcnNlSW50KG5hdmlnYXRvci5hcHBWZXJzaW9uLCAxMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbW9iaWxlIHZlcnNpb25cclxuICAgIHZhciBtb2JpbGUgPSAvTW9iaWxlfG1pbml8RmVubmVjfEFuZHJvaWR8aVAoYWR8b2R8aG9uZSkvLnRlc3QoblZlcik7XHJcblxyXG4gICAgLy8gY29va2llXHJcbiAgICB2YXIgY29va2llRW5hYmxlZCA9IChuYXZpZ2F0b3IuY29va2llRW5hYmxlZCkgPyB0cnVlIDogZmFsc2U7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IuY29va2llRW5hYmxlZCA9PSAndW5kZWZpbmVkJyAmJiAhY29va2llRW5hYmxlZCkge1xyXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9ICd0ZXN0Y29va2llJztcclxuICAgICAgICBjb29raWVFbmFibGVkID0gKGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKCd0ZXN0Y29va2llJykgIT0gLTEpID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHN5c3RlbVxyXG4gICAgdmFyIG9zID0gdW5rbm93bjtcclxuICAgIHZhciBjbGllbnRTdHJpbmdzID0gW1xyXG4gICAgICAgIHtzOidXaW5kb3dzIDEwJywgcjovKFdpbmRvd3MgMTAuMHxXaW5kb3dzIE5UIDEwLjApL30sXHJcbiAgICAgICAge3M6J1dpbmRvd3MgOC4xJywgcjovKFdpbmRvd3MgOC4xfFdpbmRvd3MgTlQgNi4zKS99LFxyXG4gICAgICAgIHtzOidXaW5kb3dzIDgnLCByOi8oV2luZG93cyA4fFdpbmRvd3MgTlQgNi4yKS99LFxyXG4gICAgICAgIHtzOidXaW5kb3dzIDcnLCByOi8oV2luZG93cyA3fFdpbmRvd3MgTlQgNi4xKS99LFxyXG4gICAgICAgIHtzOidXaW5kb3dzIFZpc3RhJywgcjovV2luZG93cyBOVCA2LjAvfSxcclxuICAgICAgICB7czonV2luZG93cyBTZXJ2ZXIgMjAwMycsIHI6L1dpbmRvd3MgTlQgNS4yL30sXHJcbiAgICAgICAge3M6J1dpbmRvd3MgWFAnLCByOi8oV2luZG93cyBOVCA1LjF8V2luZG93cyBYUCkvfSxcclxuICAgICAgICB7czonV2luZG93cyAyMDAwJywgcjovKFdpbmRvd3MgTlQgNS4wfFdpbmRvd3MgMjAwMCkvfSxcclxuICAgICAgICB7czonV2luZG93cyBNRScsIHI6LyhXaW4gOXggNC45MHxXaW5kb3dzIE1FKS99LFxyXG4gICAgICAgIHtzOidXaW5kb3dzIDk4JywgcjovKFdpbmRvd3MgOTh8V2luOTgpL30sXHJcbiAgICAgICAge3M6J1dpbmRvd3MgOTUnLCByOi8oV2luZG93cyA5NXxXaW45NXxXaW5kb3dzXzk1KS99LFxyXG4gICAgICAgIHtzOidXaW5kb3dzIE5UIDQuMCcsIHI6LyhXaW5kb3dzIE5UIDQuMHxXaW5OVDQuMHxXaW5OVHxXaW5kb3dzIE5UKS99LFxyXG4gICAgICAgIHtzOidXaW5kb3dzIENFJywgcjovV2luZG93cyBDRS99LFxyXG4gICAgICAgIHtzOidXaW5kb3dzIDMuMTEnLCByOi9XaW4xNi99LFxyXG4gICAgICAgIHtzOidBbmRyb2lkJywgcjovQW5kcm9pZC99LFxyXG4gICAgICAgIHtzOidPcGVuIEJTRCcsIHI6L09wZW5CU0QvfSxcclxuICAgICAgICB7czonU3VuIE9TJywgcjovU3VuT1MvfSxcclxuICAgICAgICB7czonTGludXgnLCByOi8oTGludXh8WDExKS99LFxyXG4gICAgICAgIHtzOidpT1MnLCByOi8oaVBob25lfGlQYWR8aVBvZCkvfSxcclxuICAgICAgICB7czonTWFjIE9TIFhJJywgcjovTWFjIE9TIFggMTEvfSxcclxuICAgICAgICB7czonTWFjIE9TIFgnLCByOi9NYWMgT1MgWCAxMC99LFxyXG4gICAgICAgIHtzOidNYWMgT1MnLCByOi8oTWFjUFBDfE1hY0ludGVsfE1hY19Qb3dlclBDfE1hY2ludG9zaCkvfSxcclxuICAgICAgICB7czonUU5YJywgcjovUU5YL30sXHJcbiAgICAgICAge3M6J1VOSVgnLCByOi9VTklYL30sXHJcbiAgICAgICAge3M6J0JlT1MnLCByOi9CZU9TL30sXHJcbiAgICAgICAge3M6J09TLzInLCByOi9PU1xcLzIvfSxcclxuICAgICAgICB7czonU2VhcmNoIEJvdCcsIHI6LyhudWhrfEdvb2dsZWJvdHxZYW1teWJvdHxPcGVuYm90fFNsdXJwfE1TTkJvdHxBc2sgSmVldmVzXFwvVGVvbWF8aWFfYXJjaGl2ZXIpL31cclxuICAgIF07XHJcbiAgICBmb3IgKHZhciBpZCBpbiBjbGllbnRTdHJpbmdzKSB7XHJcbiAgICAgICAgdmFyIGNzID0gY2xpZW50U3RyaW5nc1tpZF07XHJcbiAgICAgICAgaWYgKGNzLnIudGVzdChuQWd0KSkge1xyXG4gICAgICAgICAgICBvcyA9IGNzLnM7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgb3NWZXJzaW9uID0gdW5rbm93bjtcclxuXHJcbiAgICBpZiAoL1dpbmRvd3MvLnRlc3Qob3MpKSB7XHJcbiAgICAgICAgb3NWZXJzaW9uID0gL1dpbmRvd3MgKC4qKS8uZXhlYyhvcylbMV07XHJcbiAgICAgICAgb3MgPSAnV2luZG93cyc7XHJcbiAgICB9XHJcblxyXG4gICAgc3dpdGNoIChvcykge1xyXG4gICAgICAgIGNhc2UgJ01hYyBPUyBYSSc6XHJcbiAgICAgICAgICAgIG9zVmVyc2lvbiA9IC9NYWMgT1MgWCAoMTFbXFwuXFxfXFxkXSspLy5leGVjKG5BZ3QpWzFdO1xyXG4gICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgY2FzZSAnTWFjIE9TIFgnOlxyXG4gICAgICAgICAgICBvc1ZlcnNpb24gPSAvTWFjIE9TIFggKDEwW1xcLlxcX1xcZF0rKS8uZXhlYyhuQWd0KVsxXTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgJ0FuZHJvaWQnOlxyXG4gICAgICAgICAgICBvc1ZlcnNpb24gPSAvQW5kcm9pZCAoW1xcLlxcX1xcZF0rKS8uZXhlYyhuQWd0KVsxXTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgJ2lPUyc6XHJcbiAgICAgICAgICAgIG9zVmVyc2lvbiA9IC9PUyAoXFxkKylfKFxcZCspXz8oXFxkKyk/Ly5leGVjKG5WZXIpO1xyXG4gICAgICAgICAgICBvc1ZlcnNpb24gPSBvc1ZlcnNpb25bMV0gKyAnLicgKyBvc1ZlcnNpb25bMl0gKyAnLicgKyAob3NWZXJzaW9uWzNdIHwgMCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgc2NyZWVuOiBzY3JlZW5TaXplLFxyXG4gICAgICAgIGJyb3dzZXI6IGJyb3dzZXIsXHJcbiAgICAgICAgYnJvd3NlclZlcnNpb246IHZlcnNpb24sXHJcbiAgICAgICAgYnJvd3Nlck1ham9yVmVyc2lvbjogbWFqb3JWZXJzaW9uLFxyXG4gICAgICAgIG1vYmlsZTogbW9iaWxlLFxyXG4gICAgICAgIHVhIDogbkFndCxcclxuICAgICAgICBvczogb3MsXHJcbiAgICAgICAgb3NWZXJzaW9uOiBvc1ZlcnNpb24sXHJcbiAgICAgICAgY29va2llczogY29va2llRW5hYmxlZFxyXG4gICAgfTtcclxufTtcclxuIiwiLyoqXHJcbiAqIENvcHlyaWdodCAyMDEzIHZ0dC5qcyBDb250cmlidXRvcnNcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxubGV0IFZUVEN1ZSA9IHdpbmRvdy5WVFRDdWU7XHJcblxyXG52YXIgYXV0b0tleXdvcmQgPSBcImF1dG9cIjtcclxudmFyIGRpcmVjdGlvblNldHRpbmcgPSB7XHJcbiAgICBcIlwiOiB0cnVlLFxyXG4gICAgXCJsclwiOiB0cnVlLFxyXG4gICAgXCJybFwiOiB0cnVlXHJcbn07XHJcbnZhciBhbGlnblNldHRpbmcgPSB7XHJcbiAgICBcInN0YXJ0XCI6IHRydWUsXHJcbiAgICBcIm1pZGRsZVwiOiB0cnVlLFxyXG4gICAgXCJlbmRcIjogdHJ1ZSxcclxuICAgIFwibGVmdFwiOiB0cnVlLFxyXG4gICAgXCJyaWdodFwiOiB0cnVlXHJcbn07XHJcblxyXG5mdW5jdGlvbiBmaW5kRGlyZWN0aW9uU2V0dGluZyh2YWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHZhciBkaXIgPSBkaXJlY3Rpb25TZXR0aW5nW3ZhbHVlLnRvTG93ZXJDYXNlKCldO1xyXG4gICAgcmV0dXJuIGRpciA/IHZhbHVlLnRvTG93ZXJDYXNlKCkgOiBmYWxzZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZmluZEFsaWduU2V0dGluZyh2YWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHZhciBhbGlnbiA9IGFsaWduU2V0dGluZ1t2YWx1ZS50b0xvd2VyQ2FzZSgpXTtcclxuICAgIHJldHVybiBhbGlnbiA/IHZhbHVlLnRvTG93ZXJDYXNlKCkgOiBmYWxzZTtcclxufVxyXG5cclxuZnVuY3Rpb24gZXh0ZW5kKG9iaikge1xyXG4gICAgdmFyIGkgPSAxO1xyXG4gICAgZm9yICg7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgY29iaiA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIGNvYmopIHtcclxuICAgICAgICAgICAgb2JqW3BdID0gY29ialtwXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG9iajtcclxufVxyXG5pZighVlRUQ3VlKXtcclxuICAgIFZUVEN1ZSA9IGZ1bmN0aW9uIChzdGFydFRpbWUsIGVuZFRpbWUsIHRleHQpIHtcclxuICAgICAgICB2YXIgY3VlID0gdGhpcztcclxuICAgICAgICB2YXIgaXNJRTggPSAoL01TSUVcXHM4XFwuMC8pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XHJcbiAgICAgICAgdmFyIGJhc2VPYmogPSB7fTtcclxuXHJcbiAgICAgICAgaWYgKGlzSUU4KSB7XHJcbiAgICAgICAgICAgIGN1ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2N1c3RvbScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGJhc2VPYmouZW51bWVyYWJsZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTaGltIGltcGxlbWVudGF0aW9uIHNwZWNpZmljIHByb3BlcnRpZXMuIFRoZXNlIHByb3BlcnRpZXMgYXJlIG5vdCBpblxyXG4gICAgICAgICAqIHRoZSBzcGVjLlxyXG4gICAgICAgICAqL1xyXG5cclxuICAgICAgICAgICAgLy8gTGV0cyB1cyBrbm93IHdoZW4gdGhlIFZUVEN1ZSdzIGRhdGEgaGFzIGNoYW5nZWQgaW4gc3VjaCBhIHdheSB0aGF0IHdlIG5lZWRcclxuICAgICAgICAgICAgLy8gdG8gcmVjb21wdXRlIGl0cyBkaXNwbGF5IHN0YXRlLiBUaGlzIGxldHMgdXMgY29tcHV0ZSBpdHMgZGlzcGxheSBzdGF0ZVxyXG4gICAgICAgICAgICAvLyBsYXppbHkuXHJcbiAgICAgICAgY3VlLmhhc0JlZW5SZXNldCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBWVFRDdWUgYW5kIFRleHRUcmFja0N1ZSBwcm9wZXJ0aWVzXHJcbiAgICAgICAgICogaHR0cDovL2Rldi53My5vcmcvaHRtbDUvd2VidnR0LyN2dHRjdWUtaW50ZXJmYWNlXHJcbiAgICAgICAgICovXHJcblxyXG4gICAgICAgIHZhciBfaWQgPSBcIlwiO1xyXG4gICAgICAgIHZhciBfcGF1c2VPbkV4aXQgPSBmYWxzZTtcclxuICAgICAgICB2YXIgX3N0YXJ0VGltZSA9IHN0YXJ0VGltZTtcclxuICAgICAgICB2YXIgX2VuZFRpbWUgPSBlbmRUaW1lO1xyXG4gICAgICAgIHZhciBfdGV4dCA9IHRleHQ7XHJcbiAgICAgICAgdmFyIF9yZWdpb24gPSBudWxsO1xyXG4gICAgICAgIHZhciBfdmVydGljYWwgPSBcIlwiO1xyXG4gICAgICAgIHZhciBfc25hcFRvTGluZXMgPSB0cnVlO1xyXG4gICAgICAgIHZhciBfbGluZSA9IFwiYXV0b1wiO1xyXG4gICAgICAgIHZhciBfbGluZUFsaWduID0gXCJzdGFydFwiO1xyXG4gICAgICAgIHZhciBfcG9zaXRpb24gPSA1MDtcclxuICAgICAgICB2YXIgX3Bvc2l0aW9uQWxpZ24gPSBcIm1pZGRsZVwiO1xyXG4gICAgICAgIHZhciBfc2l6ZSA9IDUwO1xyXG4gICAgICAgIHZhciBfYWxpZ24gPSBcIm1pZGRsZVwiO1xyXG5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxyXG4gICAgICAgICAgICBcImlkXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2lkO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBfaWQgPSBcIlwiICsgdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcclxuICAgICAgICAgICAgXCJwYXVzZU9uRXhpdFwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9wYXVzZU9uRXhpdDtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3BhdXNlT25FeGl0ID0gISF2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxyXG4gICAgICAgICAgICBcInN0YXJ0VGltZVwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9zdGFydFRpbWU7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN0YXJ0IHRpbWUgbXVzdCBiZSBzZXQgdG8gYSBudW1iZXIuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBfc3RhcnRUaW1lID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXHJcbiAgICAgICAgICAgIFwiZW5kVGltZVwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9lbmRUaW1lO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJFbmQgdGltZSBtdXN0IGJlIHNldCB0byBhIG51bWJlci5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF9lbmRUaW1lID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXHJcbiAgICAgICAgICAgIFwidGV4dFwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF90ZXh0O1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGV4dCA9IFwiXCIgKyB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcclxuICAgICAgICAgICAgXCJyZWdpb25cIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVnaW9uO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBfcmVnaW9uID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXHJcbiAgICAgICAgICAgIFwidmVydGljYWxcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdmVydGljYWw7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZXR0aW5nID0gZmluZERpcmVjdGlvblNldHRpbmcodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEhhdmUgdG8gY2hlY2sgZm9yIGZhbHNlIGJlY2F1c2UgdGhlIHNldHRpbmcgYW4gYmUgYW4gZW1wdHkgc3RyaW5nLlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXR0aW5nID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJBbiBpbnZhbGlkIG9yIGlsbGVnYWwgc3RyaW5nIHdhcyBzcGVjaWZpZWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBfdmVydGljYWwgPSBzZXR0aW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxyXG4gICAgICAgICAgICBcInNuYXBUb0xpbmVzXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3NuYXBUb0xpbmVzO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBfc25hcFRvTGluZXMgPSAhIXZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxyXG4gICAgICAgICAgICBcImxpbmVcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfbGluZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJudW1iZXJcIiAmJiB2YWx1ZSAhPT0gYXV0b0tleXdvcmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKFwiQW4gaW52YWxpZCBudW1iZXIgb3IgaWxsZWdhbCBzdHJpbmcgd2FzIHNwZWNpZmllZC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF9saW5lID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXHJcbiAgICAgICAgICAgIFwibGluZUFsaWduXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2xpbmVBbGlnbjtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNldHRpbmcgPSBmaW5kQWxpZ25TZXR0aW5nKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXNldHRpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKFwiQW4gaW52YWxpZCBvciBpbGxlZ2FsIHN0cmluZyB3YXMgc3BlY2lmaWVkLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgX2xpbmVBbGlnbiA9IHNldHRpbmc7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXHJcbiAgICAgICAgICAgIFwicG9zaXRpb25cIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA8IDAgfHwgdmFsdWUgPiAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUG9zaXRpb24gbXVzdCBiZSBiZXR3ZWVuIDAgYW5kIDEwMC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF9wb3NpdGlvbiA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxyXG4gICAgICAgICAgICBcInBvc2l0aW9uQWxpZ25cIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcG9zaXRpb25BbGlnbjtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNldHRpbmcgPSBmaW5kQWxpZ25TZXR0aW5nKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXNldHRpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKFwiQW4gaW52YWxpZCBvciBpbGxlZ2FsIHN0cmluZyB3YXMgc3BlY2lmaWVkLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgX3Bvc2l0aW9uQWxpZ24gPSBzZXR0aW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxyXG4gICAgICAgICAgICBcInNpemVcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfc2l6ZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlIDwgMCB8fCB2YWx1ZSA+IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTaXplIG11c3QgYmUgYmV0d2VlbiAwIGFuZCAxMDAuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBfc2l6ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxyXG4gICAgICAgICAgICBcImFsaWduXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2FsaWduO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2V0dGluZyA9IGZpbmRBbGlnblNldHRpbmcodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghc2V0dGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJBbiBpbnZhbGlkIG9yIGlsbGVnYWwgc3RyaW5nIHdhcyBzcGVjaWZpZWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBfYWxpZ24gPSBzZXR0aW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPdGhlciA8dHJhY2s+IHNwZWMgZGVmaW5lZCBwcm9wZXJ0aWVzXHJcbiAgICAgICAgICovXHJcblxyXG4gICAgICAgICAgICAvLyBodHRwOi8vd3d3LndoYXR3Zy5vcmcvc3BlY3Mvd2ViLWFwcHMvY3VycmVudC13b3JrL211bHRpcGFnZS90aGUtdmlkZW8tZWxlbWVudC5odG1sI3RleHQtdHJhY2stY3VlLWRpc3BsYXktc3RhdGVcclxuICAgICAgICBjdWUuZGlzcGxheVN0YXRlID0gdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICBpZiAoaXNJRTgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGN1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWVFRDdWUgbWV0aG9kc1xyXG4gICAgICovXHJcblxyXG4gICAgVlRUQ3VlLnByb3RvdHlwZS5nZXRDdWVBc0hUTUwgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyBBc3N1bWUgV2ViVlRULmNvbnZlcnRDdWVUb0RPTVRyZWUgaXMgb24gdGhlIGdsb2JhbC5cclxuICAgICAgICByZXR1cm4gV2ViVlRULmNvbnZlcnRDdWVUb0RPTVRyZWUod2luZG93LCB0aGlzLnRleHQpO1xyXG4gICAgfTtcclxuXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBWVFRDdWU7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAyMy4uXHJcbiAqL1xyXG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIEl0IHdhcyByZXBsYWNlIGpxdWVyeSdzIHNlbGVjdG9yLiBJdCBPZnRlbiB1c2VkIGJ5IE92ZW5UZW1wbGF0ZS4gKC92aWV3L2VuZ2luZS9PdmVuVGVtcGxhdGUuanMpXHJcbiAqIEBwYXJhbSAgIHNlbGVjdG9yT3JFbGVtZW50ICBzdHJpbmcgb3IgZWxlbWVudFxyXG4gKlxyXG4gKiAqL1xyXG5cclxuXHJcbmNvbnN0IExhJCA9IGZ1bmN0aW9uKHNlbGVjdG9yT3JFbGVtZW50KXtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIGNvbnN0IHJldHVybk5vZGUgPSBmdW5jdGlvbigkZWxlbWVudCAsIHNlbGVjdG9yKXtcclxuICAgICAgICBsZXQgbm9kZUxpc3QgPSAgJGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcbiAgICAgICAgaWYobm9kZUxpc3QubGVuZ3RoID4gMSl7XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlTGlzdDtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG5vZGVMaXN0WzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCAkZWxlbWVudCA9IFwiXCI7XHJcblxyXG4gICAgaWYoIF8uaXNFbGVtZW50KHNlbGVjdG9yT3JFbGVtZW50KSB8fCBfLmV2ZXJ5KHNlbGVjdG9yT3JFbGVtZW50LCBmdW5jdGlvbihpdGVtKXtyZXR1cm4gXy5pc0VsZW1lbnQoaXRlbSl9KSl7XHJcbiAgICAgICAgJGVsZW1lbnQgPSBzZWxlY3Rvck9yRWxlbWVudDtcclxuICAgIH1lbHNlIGlmKHNlbGVjdG9yT3JFbGVtZW50ID09PSBcImRvY3VtZW50XCIpe1xyXG4gICAgICAgICRlbGVtZW50ID0gZG9jdW1lbnQ7XHJcbiAgICB9ZWxzZSBpZihzZWxlY3Rvck9yRWxlbWVudCA9PT0gXCJ3aW5kb3dcIil7XHJcbiAgICAgICAgJGVsZW1lbnQgPSB3aW5kb3c7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgICAkZWxlbWVudCA9IHJldHVybk5vZGUoZG9jdW1lbnQsIHNlbGVjdG9yT3JFbGVtZW50KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgaWYoISRlbGVtZW50KXtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKkVGRkVDVFMqL1xyXG5cclxuICAgIHRoYXQuc2hvdyA9ICgpID0+e1xyXG4gICAgICAgICRlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmhpZGUgPSAoKSA9PntcclxuICAgICAgICAkZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKkVMRU1FTlRTKi9cclxuXHJcbiAgICB0aGF0LmFkZENsYXNzID0gKG5hbWUpID0+e1xyXG4gICAgICAgIGlmKCRlbGVtZW50LmNsYXNzTGlzdCl7XHJcbiAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTGlzdC5hZGQobmFtZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGxldCBjbGFzc05hbWVzID0gJGVsZW1lbnQuY2xhc3NOYW1lLnNwbGl0KFwiIFwiKTtcclxuICAgICAgICAgICAgaWYoY2xhc3NOYW1lcy5pbmRleE9mKG5hbWUpID09PSAtMSl7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5jbGFzc05hbWUgKz0gXCIgXCIgKyBuYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmFmdGVyID0gKGh0bWxTdHJpbmcpID0+IHtcclxuICAgICAgICAkZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyZW5kJywgaHRtbFN0cmluZyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuYXBwZW5kID0gKGh0bWxTdHJpbmcpID0+IHtcclxuICAgICAgICAkZWxlbWVudC5hcHBlbmRDaGlsZChodG1sU3RyaW5nKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5iZWZvcmUgPSAoaHRtbFN0cmluZykgPT4ge1xyXG4gICAgICAgICRlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlYmVnaW4nLCBodG1sU3RyaW5nKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5jaGlsZHJlbiA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gJGVsZW1lbnQuY2hpbGRyZW4gfHwgW107XHJcbiAgICB9O1xyXG5cclxuICAgIC8vVGhlIGNvbnRhaW5zKCkgbWV0aG9kIHJldHVybnMgYSBCb29sZWFuIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciBhIG5vZGUgaXMgYSBkZXNjZW5kYW50IG9mIGEgc3BlY2lmaWVkIG5vZGUuXHJcbiAgICAvL0EgZGVzY2VuZGFudCBjYW4gYmUgYSBjaGlsZCwgZ3JhbmRjaGlsZCwgZ3JlYXQtZ3JhbmRjaGlsZCwgYW5kIHNvIG9uLlxyXG4gICAgdGhhdC5jb250YWlucyA9IChlbENoaWxkKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICRlbGVtZW50ICE9PSBlbENoaWxkICYmICRlbGVtZW50LmNvbnRhaW5zKGVsQ2hpbGQpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmVtcHR5ID0gKCkgPT4ge1xyXG4gICAgICAgICRlbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB0aGF0LmZpbmQgPSAoc2VsZWN0b3IpID0+e1xyXG4gICAgICAgIHJldHVybiBMYSQocmV0dXJuTm9kZSgkZWxlbWVudCwgc2VsZWN0b3IpKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5jc3MgPSAobmFtZSwgdmFsdWUpID0+IHtcclxuICAgICAgICBpZih2YWx1ZSl7XHJcbiAgICAgICAgICAgIGlmKCRlbGVtZW50Lmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KXtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlW25hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LnN0eWxlW25hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuICRlbGVtZW50LnN0eWxlW25hbWVdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgdGhhdC5yZW1vdmVDbGFzcyA9IChuYW1lKSA9PntcclxuICAgICAgICBpZiAoJGVsZW1lbnQuY2xhc3NMaXN0KXtcclxuICAgICAgICAgICAgJGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShuYW1lKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgJGVsZW1lbnQuY2xhc3NOYW1lID0gJGVsZW1lbnQuY2xhc3NOYW1lLnJlcGxhY2UobmV3IFJlZ0V4cCgnKF58XFxcXGIpJyArIG5hbWUuc3BsaXQoJyAnKS5qb2luKCd8JykgKyAnKFxcXFxifCQpJywgJ2dpJyksICcgJyk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5yZW1vdmVBdHRyaWJ1dGUgPSAoYXR0ck5hbWUpID0+IHtcclxuICAgICAgICAkZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0ck5hbWUpO1xyXG4gICAgfTtcclxuXHJcblxyXG5cclxuICAgIC8qdGhhdC5hcHBlbmQgPSAoaHRtbENvZGUpID0+e1xyXG4gICAgICAgICRlbGVtZW50LmlubmVySFRNTCArPSBodG1sQ29kZTtcclxuICAgIH07Ki9cclxuXHJcbiAgICB0aGF0LnRleHQgPSAodGV4dCkgPT4geyAvL0lFOCtcclxuICAgICAgICBpZih0ZXh0ID09PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm4gJGVsZW1lbnQudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICRlbGVtZW50LnRleHRDb250ZW50ID0gdGV4dDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhhdC5odG1sID0gKGh0bWxTdHJpbmcpID0+IHtcclxuICAgICAgICAkZWxlbWVudC5pbm5lckhUTUwgPSBodG1sU3RyaW5nO1xyXG4gICAgfTtcclxuICAgIHRoYXQuaGFzQ2xhc3MgPSAobmFtZSkgPT4geyAvL0lFOCtcclxuICAgICAgICBpZigkZWxlbWVudC5jbGFzc0xpc3Qpe1xyXG4gICAgICAgICAgICByZXR1cm4gJGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKG5hbWUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cCgnKF58ICknICsgbmFtZSArICcoIHwkKScsICdnaScpLnRlc3QoJGVsZW1lbnQubmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmlzID0gKCR0YXJnZXRFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgLyp2YXIgbWF0Y2hlcyA9IGZ1bmN0aW9uKGVsLCBzZWxlY3Rvcikge1xyXG4gICAgICAgICAgICByZXR1cm4gKGVsLm1hdGNoZXMgfHwgZWwubWF0Y2hlc1NlbGVjdG9yIHx8IGVsLm1zTWF0Y2hlc1NlbGVjdG9yIHx8IGVsLm1vek1hdGNoZXNTZWxlY3RvciB8fCBlbC53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHwgZWwub01hdGNoZXNTZWxlY3RvcikuY2FsbChlbCwgc2VsZWN0b3IpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG1hdGNoZXMoZWwsICcubXktY2xhc3MnKTsqL1xyXG4gICAgICAgIHJldHVybiAkZWxlbWVudCA9PT0gJHRhcmdldEVsZW1lbnQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQub2Zmc2V0ID0gKCkgPT57ICAgIC8vSUU4K1xyXG4gICAgICAgIHZhciByZWN0ID0gJGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRvcDogcmVjdC50b3AgKyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCxcclxuICAgICAgICAgICAgbGVmdDogcmVjdC5sZWZ0ICsgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LndpZHRoID0gKCkgPT4geyAgICAvL0lFOCtcclxuICAgICAgICByZXR1cm4gJGVsZW1lbnQuY2xpZW50V2lkdGg7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuaGVpZ2h0ID0gKCkgPT4geyAgIC8vSUU4K1xyXG4gICAgICAgIHJldHVybiAkZWxlbWVudC5jbGllbnRIZWlnaHQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuYXR0ciA9IChhdHRyKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICRlbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5yZXBsYWNlID0gKGh0bWwpID0+IHtcclxuICAgICAgICAkZWxlbWVudC5yZXBsYWNlV2l0aChodG1sKTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIHRoYXQucmVtb3ZlID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCRlbGVtZW50Lmxlbmd0aCA+IDEpe1xyXG4gICAgICAgICAgICAkZWxlbWVudC5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKCRlbGVtZW50KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5yZW1vdmVDaGlsZCA9IChlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgaWYoZWxlbWVudCl7XHJcbiAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB3aGlsZSAoJGVsZW1lbnQuaGFzQ2hpbGROb2RlcygpKSB7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5yZW1vdmVDaGlsZCgkZWxlbWVudC5maXJzdENoaWxkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0ID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiAkZWxlbWVudDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5jbG9zZXN0ID0gKHNlbGVjdG9yU3RyaW5nKSA9PiB7XHJcbiAgICAgICAgbGV0IGNsb3Nlc3RFbGVtZW50ID0gJGVsZW1lbnQuY2xvc2VzdChzZWxlY3RvclN0cmluZyk7XHJcbiAgICAgICAgaWYoY2xvc2VzdEVsZW1lbnQpe1xyXG4gICAgICAgICAgICByZXR1cm4gTGEkKGNsb3Nlc3RFbGVtZW50KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IExhJDtcclxuIiwiaW1wb3J0IF8gZnJvbSAnLi91bmRlcnNjb3JlJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0cmltKHN0cmluZykge1xyXG4gICAgcmV0dXJuIHN0cmluZyA/IHN0cmluZy5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJykgOiBcIlwiO1xyXG59XHJcblxyXG4vKipcclxuICogZXh0cmFjdEV4dGVuc2lvblxyXG4gKlxyXG4gKiBAcGFyYW0gICAgICB7c3RyaW5nfSBwYXRoIGZvciB1cmxcclxuICogQHJldHVybiAgICAge3N0cmluZ30gIEV4dGVuc2lvblxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGV4dHJhY3RFeHRlbnNpb24gPSBmdW5jdGlvbihwYXRoKSB7XHJcbiAgICBpZighcGF0aCB8fCBwYXRoLnN1YnN0cigwLDQpPT0ncnRtcCcpIHtcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGdldEF6dXJlRmlsZUZvcm1hdChwYXRoKSB7XHJcbiAgICAgICAgbGV0IGV4dGVuc2lvbiA9IFwiXCI7XHJcbiAgICAgICAgaWYgKCgvWygsXWZvcm1hdD1tcGQtL2kpLnRlc3QocGF0aCkpIHtcclxuICAgICAgICAgICAgZXh0ZW5zaW9uID0gJ21wZCc7XHJcbiAgICAgICAgfWVsc2UgaWYgKCgvWygsXWZvcm1hdD1tM3U4LS9pKS50ZXN0KHBhdGgpKSB7XHJcbiAgICAgICAgICAgIGV4dGVuc2lvbiA9ICdtM3U4JztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuc2lvbjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgYXp1cmVkRm9ybWF0ID0gZ2V0QXp1cmVGaWxlRm9ybWF0KHBhdGgpO1xyXG4gICAgaWYoYXp1cmVkRm9ybWF0KSB7XHJcbiAgICAgICAgcmV0dXJuIGF6dXJlZEZvcm1hdDtcclxuICAgIH1cclxuICAgIHBhdGggPSBwYXRoLnNwbGl0KCc/JylbMF0uc3BsaXQoJyMnKVswXTtcclxuICAgIGlmKHBhdGgubGFzdEluZGV4T2YoJy4nKSA+IC0xKSB7XHJcbiAgICAgICAgcmV0dXJuIHBhdGguc3Vic3RyKHBhdGgubGFzdEluZGV4T2YoJy4nKSArIDEsIHBhdGgubGVuZ3RoKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIG5hdHVyYWxIbXNcclxuICpcclxuICogQHBhcmFtICAgICAge251bWJlciB8IHN0cmluZ30gIHNlY29uZCAgVGhlIHNlY29uZFxyXG4gKiBAcmV0dXJuICAgICB7c3RyaW5nfSAgZm9ybWF0dGVkIFN0cmluZ1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG5hdHVyYWxIbXMoc2Vjb25kKSB7XHJcbiAgICBsZXQgc2VjTnVtID0gcGFyc2VJbnQoc2Vjb25kLCAxMCk7XHJcbiAgICBpZighc2Vjb25kKXtcclxuICAgICAgICByZXR1cm4gXCIwMDowMFwiO1xyXG4gICAgfVxyXG4gICAgbGV0IGhvdXJzICAgPSBNYXRoLmZsb29yKHNlY051bSAvIDM2MDApO1xyXG4gICAgbGV0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKChzZWNOdW0gLSAoaG91cnMgKiAzNjAwKSkgLyA2MCk7XHJcbiAgICBsZXQgc2Vjb25kcyA9IHNlY051bSAtIChob3VycyAqIDM2MDApIC0gKG1pbnV0ZXMgKiA2MCk7XHJcblxyXG4gICAgLy9pZiAoaG91cnMgPiAwKSB7bWludXRlcyA9IFwiMFwiK21pbnV0ZXM7fVxyXG4gICAgaWYgKG1pbnV0ZXMgPCAxMCkge21pbnV0ZXMgPSBcIjBcIittaW51dGVzO31cclxuICAgIGlmIChzZWNvbmRzIDwgMTApIHtzZWNvbmRzID0gXCIwXCIrc2Vjb25kczt9XHJcblxyXG4gICAgaWYgKGhvdXJzID4gMCkge1xyXG4gICAgICAgIHJldHVybiBob3VycysnOicrbWludXRlcysnOicrc2Vjb25kcztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIG1pbnV0ZXMrJzonK3NlY29uZHM7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaG1zVG9TZWNvbmQoc3RyLCBmcmFtZVJhdGUpIHtcclxuICAgIGlmKCFzdHIpIHtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICAgIGlmKF8uaXNOdW1iZXIoc3RyKSAmJiAhXy5pc05hTihzdHIpKXtcclxuICAgICAgICByZXR1cm4gc3RyO1xyXG4gICAgfVxyXG4gICAgc3RyID0gc3RyLnJlcGxhY2UoJywnLCAnLicpO1xyXG4gICAgbGV0IGFyciA9IHN0ci5zcGxpdCgnOicpO1xyXG4gICAgbGV0IGFyckxlbmd0aCA9IGFyci5sZW5ndGg7XHJcbiAgICBsZXQgc2VjID0gMDtcclxuICAgIGlmIChzdHIuc2xpY2UoLTEpID09PSAncycpe1xyXG4gICAgICAgIHNlYyA9IHBhcnNlRmxvYXQoc3RyKTtcclxuICAgIH1lbHNlIGlmIChzdHIuc2xpY2UoLTEpID09PSAnbScpe1xyXG4gICAgICAgIHNlYyA9IHBhcnNlRmxvYXQoc3RyKSAqIDYwO1xyXG4gICAgfWVsc2UgaWYgKHN0ci5zbGljZSgtMSkgPT09ICdoJyl7XHJcbiAgICAgICAgc2VjID0gcGFyc2VGbG9hdChzdHIpICogMzYwMDtcclxuICAgIH1lbHNlIGlmIChhcnJMZW5ndGggPiAxKSB7XHJcbiAgICAgICAgdmFyIHNlY0luZGV4ID0gYXJyTGVuZ3RoIC0gMTtcclxuICAgICAgICBpZiAoYXJyTGVuZ3RoID09PSA0KSB7XHJcbiAgICAgICAgICAgIGlmIChmcmFtZVJhdGUpIHtcclxuICAgICAgICAgICAgICAgIHNlYyA9IHBhcnNlRmxvYXQoYXJyW3NlY0luZGV4XSkgLyBmcmFtZVJhdGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VjSW5kZXggLT0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VjICs9IHBhcnNlRmxvYXQoYXJyW3NlY0luZGV4XSk7XHJcbiAgICAgICAgc2VjICs9IHBhcnNlRmxvYXQoYXJyW3NlY0luZGV4IC0gMV0pICogNjA7XHJcbiAgICAgICAgaWYgKGFyckxlbmd0aCA+PSAzKSB7XHJcbiAgICAgICAgICAgIHNlYyArPSBwYXJzZUZsb2F0KGFycltzZWNJbmRleCAtIDJdKSAqIDM2MDA7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBzZWMgPSBwYXJzZUZsb2F0KHN0cik7XHJcbiAgICB9XHJcbiAgICBpZiAoXy5pc05hTihzZWMpKSB7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2VjO1xyXG59IiwiLy8gICAgIFVuZGVyc2NvcmUuanMgMS45LjFcclxuLy8gICAgIGh0dHA6Ly91bmRlcnNjb3JlanMub3JnXHJcbi8vICAgICAoYykgMjAwOS0yMDE4IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXHJcbi8vICAgICBVbmRlcnNjb3JlIG1heSBiZSBmcmVlbHkgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxyXG4hZnVuY3Rpb24oKXt2YXIgbj1cIm9iamVjdFwiPT10eXBlb2Ygc2VsZiYmc2VsZi5zZWxmPT09c2VsZiYmc2VsZnx8XCJvYmplY3RcIj09dHlwZW9mIGdsb2JhbCYmZ2xvYmFsLmdsb2JhbD09PWdsb2JhbCYmZ2xvYmFsfHx0aGlzfHx7fSxyPW4uXyxlPUFycmF5LnByb3RvdHlwZSxvPU9iamVjdC5wcm90b3R5cGUscz1cInVuZGVmaW5lZFwiIT10eXBlb2YgU3ltYm9sP1N5bWJvbC5wcm90b3R5cGU6bnVsbCx1PWUucHVzaCxjPWUuc2xpY2UscD1vLnRvU3RyaW5nLGk9by5oYXNPd25Qcm9wZXJ0eSx0PUFycmF5LmlzQXJyYXksYT1PYmplY3Qua2V5cyxsPU9iamVjdC5jcmVhdGUsZj1mdW5jdGlvbigpe30saD1mdW5jdGlvbihuKXtyZXR1cm4gbiBpbnN0YW5jZW9mIGg/bjp0aGlzIGluc3RhbmNlb2YgaD92b2lkKHRoaXMuX3dyYXBwZWQ9bik6bmV3IGgobil9O1widW5kZWZpbmVkXCI9PXR5cGVvZiBleHBvcnRzfHxleHBvcnRzLm5vZGVUeXBlP24uXz1oOihcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlJiYhbW9kdWxlLm5vZGVUeXBlJiZtb2R1bGUuZXhwb3J0cyYmKGV4cG9ydHM9bW9kdWxlLmV4cG9ydHM9aCksZXhwb3J0cy5fPWgpLGguVkVSU0lPTj1cIjEuOS4xXCI7dmFyIHYseT1mdW5jdGlvbih1LGksbil7aWYodm9pZCAwPT09aSlyZXR1cm4gdTtzd2l0Y2gobnVsbD09bj8zOm4pe2Nhc2UgMTpyZXR1cm4gZnVuY3Rpb24obil7cmV0dXJuIHUuY2FsbChpLG4pfTtjYXNlIDM6cmV0dXJuIGZ1bmN0aW9uKG4scix0KXtyZXR1cm4gdS5jYWxsKGksbixyLHQpfTtjYXNlIDQ6cmV0dXJuIGZ1bmN0aW9uKG4scix0LGUpe3JldHVybiB1LmNhbGwoaSxuLHIsdCxlKX19cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIHUuYXBwbHkoaSxhcmd1bWVudHMpfX0sZD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGguaXRlcmF0ZWUhPT12P2guaXRlcmF0ZWUobixyKTpudWxsPT1uP2guaWRlbnRpdHk6aC5pc0Z1bmN0aW9uKG4pP3kobixyLHQpOmguaXNPYmplY3QobikmJiFoLmlzQXJyYXkobik/aC5tYXRjaGVyKG4pOmgucHJvcGVydHkobil9O2guaXRlcmF0ZWU9dj1mdW5jdGlvbihuLHIpe3JldHVybiBkKG4sciwxLzApfTt2YXIgZz1mdW5jdGlvbih1LGkpe3JldHVybiBpPW51bGw9PWk/dS5sZW5ndGgtMToraSxmdW5jdGlvbigpe2Zvcih2YXIgbj1NYXRoLm1heChhcmd1bWVudHMubGVuZ3RoLWksMCkscj1BcnJheShuKSx0PTA7dDxuO3QrKylyW3RdPWFyZ3VtZW50c1t0K2ldO3N3aXRjaChpKXtjYXNlIDA6cmV0dXJuIHUuY2FsbCh0aGlzLHIpO2Nhc2UgMTpyZXR1cm4gdS5jYWxsKHRoaXMsYXJndW1lbnRzWzBdLHIpO2Nhc2UgMjpyZXR1cm4gdS5jYWxsKHRoaXMsYXJndW1lbnRzWzBdLGFyZ3VtZW50c1sxXSxyKX12YXIgZT1BcnJheShpKzEpO2Zvcih0PTA7dDxpO3QrKyllW3RdPWFyZ3VtZW50c1t0XTtyZXR1cm4gZVtpXT1yLHUuYXBwbHkodGhpcyxlKX19LG09ZnVuY3Rpb24obil7aWYoIWguaXNPYmplY3QobikpcmV0dXJue307aWYobClyZXR1cm4gbChuKTtmLnByb3RvdHlwZT1uO3ZhciByPW5ldyBmO3JldHVybiBmLnByb3RvdHlwZT1udWxsLHJ9LGI9ZnVuY3Rpb24ocil7cmV0dXJuIGZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT1uP3ZvaWQgMDpuW3JdfX0saj1mdW5jdGlvbihuLHIpe3JldHVybiBudWxsIT1uJiZpLmNhbGwobixyKX0seD1mdW5jdGlvbihuLHIpe2Zvcih2YXIgdD1yLmxlbmd0aCxlPTA7ZTx0O2UrKyl7aWYobnVsbD09bilyZXR1cm47bj1uW3JbZV1dfXJldHVybiB0P246dm9pZCAwfSxfPU1hdGgucG93KDIsNTMpLTEsQT1iKFwibGVuZ3RoXCIpLHc9ZnVuY3Rpb24obil7dmFyIHI9QShuKTtyZXR1cm5cIm51bWJlclwiPT10eXBlb2YgciYmMDw9ciYmcjw9X307aC5lYWNoPWguZm9yRWFjaD1mdW5jdGlvbihuLHIsdCl7dmFyIGUsdTtpZihyPXkocix0KSx3KG4pKWZvcihlPTAsdT1uLmxlbmd0aDtlPHU7ZSsrKXIobltlXSxlLG4pO2Vsc2V7dmFyIGk9aC5rZXlzKG4pO2ZvcihlPTAsdT1pLmxlbmd0aDtlPHU7ZSsrKXIobltpW2VdXSxpW2VdLG4pfXJldHVybiBufSxoLm1hcD1oLmNvbGxlY3Q9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT0hdyhuKSYmaC5rZXlzKG4pLHU9KGV8fG4pLmxlbmd0aCxpPUFycmF5KHUpLG89MDtvPHU7bysrKXt2YXIgYT1lP2Vbb106bztpW29dPXIoblthXSxhLG4pfXJldHVybiBpfTt2YXIgTz1mdW5jdGlvbihjKXtyZXR1cm4gZnVuY3Rpb24obixyLHQsZSl7dmFyIHU9Mzw9YXJndW1lbnRzLmxlbmd0aDtyZXR1cm4gZnVuY3Rpb24obixyLHQsZSl7dmFyIHU9IXcobikmJmgua2V5cyhuKSxpPSh1fHxuKS5sZW5ndGgsbz0wPGM/MDppLTE7Zm9yKGV8fCh0PW5bdT91W29dOm9dLG8rPWMpOzA8PW8mJm88aTtvKz1jKXt2YXIgYT11P3Vbb106bzt0PXIodCxuW2FdLGEsbil9cmV0dXJuIHR9KG4seShyLGUsNCksdCx1KX19O2gucmVkdWNlPWguZm9sZGw9aC5pbmplY3Q9TygxKSxoLnJlZHVjZVJpZ2h0PWguZm9sZHI9TygtMSksaC5maW5kPWguZGV0ZWN0PWZ1bmN0aW9uKG4scix0KXt2YXIgZT0odyhuKT9oLmZpbmRJbmRleDpoLmZpbmRLZXkpKG4scix0KTtpZih2b2lkIDAhPT1lJiYtMSE9PWUpcmV0dXJuIG5bZV19LGguZmlsdGVyPWguc2VsZWN0PWZ1bmN0aW9uKG4sZSxyKXt2YXIgdT1bXTtyZXR1cm4gZT1kKGUsciksaC5lYWNoKG4sZnVuY3Rpb24obixyLHQpe2UobixyLHQpJiZ1LnB1c2gobil9KSx1fSxoLnJlamVjdD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGguZmlsdGVyKG4saC5uZWdhdGUoZChyKSksdCl9LGguZXZlcnk9aC5hbGw9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT0hdyhuKSYmaC5rZXlzKG4pLHU9KGV8fG4pLmxlbmd0aCxpPTA7aTx1O2krKyl7dmFyIG89ZT9lW2ldOmk7aWYoIXIobltvXSxvLG4pKXJldHVybiExfXJldHVybiEwfSxoLnNvbWU9aC5hbnk9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT0hdyhuKSYmaC5rZXlzKG4pLHU9KGV8fG4pLmxlbmd0aCxpPTA7aTx1O2krKyl7dmFyIG89ZT9lW2ldOmk7aWYocihuW29dLG8sbikpcmV0dXJuITB9cmV0dXJuITF9LGguY29udGFpbnM9aC5pbmNsdWRlcz1oLmluY2x1ZGU9ZnVuY3Rpb24obixyLHQsZSl7cmV0dXJuIHcobil8fChuPWgudmFsdWVzKG4pKSwoXCJudW1iZXJcIiE9dHlwZW9mIHR8fGUpJiYodD0wKSwwPD1oLmluZGV4T2YobixyLHQpfSxoLmludm9rZT1nKGZ1bmN0aW9uKG4sdCxlKXt2YXIgdSxpO3JldHVybiBoLmlzRnVuY3Rpb24odCk/aT10OmguaXNBcnJheSh0KSYmKHU9dC5zbGljZSgwLC0xKSx0PXRbdC5sZW5ndGgtMV0pLGgubWFwKG4sZnVuY3Rpb24obil7dmFyIHI9aTtpZighcil7aWYodSYmdS5sZW5ndGgmJihuPXgobix1KSksbnVsbD09bilyZXR1cm47cj1uW3RdfXJldHVybiBudWxsPT1yP3I6ci5hcHBseShuLGUpfSl9KSxoLnBsdWNrPWZ1bmN0aW9uKG4scil7cmV0dXJuIGgubWFwKG4saC5wcm9wZXJ0eShyKSl9LGgud2hlcmU9ZnVuY3Rpb24obixyKXtyZXR1cm4gaC5maWx0ZXIobixoLm1hdGNoZXIocikpfSxoLmZpbmRXaGVyZT1mdW5jdGlvbihuLHIpe3JldHVybiBoLmZpbmQobixoLm1hdGNoZXIocikpfSxoLm1heD1mdW5jdGlvbihuLGUscil7dmFyIHQsdSxpPS0xLzAsbz0tMS8wO2lmKG51bGw9PWV8fFwibnVtYmVyXCI9PXR5cGVvZiBlJiZcIm9iamVjdFwiIT10eXBlb2YgblswXSYmbnVsbCE9bilmb3IodmFyIGE9MCxjPShuPXcobik/bjpoLnZhbHVlcyhuKSkubGVuZ3RoO2E8YzthKyspbnVsbCE9KHQ9blthXSkmJmk8dCYmKGk9dCk7ZWxzZSBlPWQoZSxyKSxoLmVhY2gobixmdW5jdGlvbihuLHIsdCl7dT1lKG4scix0KSwobzx1fHx1PT09LTEvMCYmaT09PS0xLzApJiYoaT1uLG89dSl9KTtyZXR1cm4gaX0saC5taW49ZnVuY3Rpb24obixlLHIpe3ZhciB0LHUsaT0xLzAsbz0xLzA7aWYobnVsbD09ZXx8XCJudW1iZXJcIj09dHlwZW9mIGUmJlwib2JqZWN0XCIhPXR5cGVvZiBuWzBdJiZudWxsIT1uKWZvcih2YXIgYT0wLGM9KG49dyhuKT9uOmgudmFsdWVzKG4pKS5sZW5ndGg7YTxjO2ErKyludWxsIT0odD1uW2FdKSYmdDxpJiYoaT10KTtlbHNlIGU9ZChlLHIpLGguZWFjaChuLGZ1bmN0aW9uKG4scix0KXsoKHU9ZShuLHIsdCkpPG98fHU9PT0xLzAmJmk9PT0xLzApJiYoaT1uLG89dSl9KTtyZXR1cm4gaX0saC5zaHVmZmxlPWZ1bmN0aW9uKG4pe3JldHVybiBoLnNhbXBsZShuLDEvMCl9LGguc2FtcGxlPWZ1bmN0aW9uKG4scix0KXtpZihudWxsPT1yfHx0KXJldHVybiB3KG4pfHwobj1oLnZhbHVlcyhuKSksbltoLnJhbmRvbShuLmxlbmd0aC0xKV07dmFyIGU9dyhuKT9oLmNsb25lKG4pOmgudmFsdWVzKG4pLHU9QShlKTtyPU1hdGgubWF4KE1hdGgubWluKHIsdSksMCk7Zm9yKHZhciBpPXUtMSxvPTA7bzxyO28rKyl7dmFyIGE9aC5yYW5kb20obyxpKSxjPWVbb107ZVtvXT1lW2FdLGVbYV09Y31yZXR1cm4gZS5zbGljZSgwLHIpfSxoLnNvcnRCeT1mdW5jdGlvbihuLGUscil7dmFyIHU9MDtyZXR1cm4gZT1kKGUsciksaC5wbHVjayhoLm1hcChuLGZ1bmN0aW9uKG4scix0KXtyZXR1cm57dmFsdWU6bixpbmRleDp1KyssY3JpdGVyaWE6ZShuLHIsdCl9fSkuc29ydChmdW5jdGlvbihuLHIpe3ZhciB0PW4uY3JpdGVyaWEsZT1yLmNyaXRlcmlhO2lmKHQhPT1lKXtpZihlPHR8fHZvaWQgMD09PXQpcmV0dXJuIDE7aWYodDxlfHx2b2lkIDA9PT1lKXJldHVybi0xfXJldHVybiBuLmluZGV4LXIuaW5kZXh9KSxcInZhbHVlXCIpfTt2YXIgaz1mdW5jdGlvbihvLHIpe3JldHVybiBmdW5jdGlvbihlLHUsbil7dmFyIGk9cj9bW10sW11dOnt9O3JldHVybiB1PWQodSxuKSxoLmVhY2goZSxmdW5jdGlvbihuLHIpe3ZhciB0PXUobixyLGUpO28oaSxuLHQpfSksaX19O2guZ3JvdXBCeT1rKGZ1bmN0aW9uKG4scix0KXtqKG4sdCk/blt0XS5wdXNoKHIpOm5bdF09W3JdfSksaC5pbmRleEJ5PWsoZnVuY3Rpb24obixyLHQpe25bdF09cn0pLGguY291bnRCeT1rKGZ1bmN0aW9uKG4scix0KXtqKG4sdCk/blt0XSsrOm5bdF09MX0pO3ZhciBTPS9bXlxcdWQ4MDAtXFx1ZGZmZl18W1xcdWQ4MDAtXFx1ZGJmZl1bXFx1ZGMwMC1cXHVkZmZmXXxbXFx1ZDgwMC1cXHVkZmZmXS9nO2gudG9BcnJheT1mdW5jdGlvbihuKXtyZXR1cm4gbj9oLmlzQXJyYXkobik/Yy5jYWxsKG4pOmguaXNTdHJpbmcobik/bi5tYXRjaChTKTp3KG4pP2gubWFwKG4saC5pZGVudGl0eSk6aC52YWx1ZXMobik6W119LGguc2l6ZT1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09bj8wOncobik/bi5sZW5ndGg6aC5rZXlzKG4pLmxlbmd0aH0saC5wYXJ0aXRpb249ayhmdW5jdGlvbihuLHIsdCl7blt0PzA6MV0ucHVzaChyKX0sITApLGguZmlyc3Q9aC5oZWFkPWgudGFrZT1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIG51bGw9PW58fG4ubGVuZ3RoPDE/bnVsbD09cj92b2lkIDA6W106bnVsbD09cnx8dD9uWzBdOmguaW5pdGlhbChuLG4ubGVuZ3RoLXIpfSxoLmluaXRpYWw9ZnVuY3Rpb24obixyLHQpe3JldHVybiBjLmNhbGwobiwwLE1hdGgubWF4KDAsbi5sZW5ndGgtKG51bGw9PXJ8fHQ/MTpyKSkpfSxoLmxhc3Q9ZnVuY3Rpb24obixyLHQpe3JldHVybiBudWxsPT1ufHxuLmxlbmd0aDwxP251bGw9PXI/dm9pZCAwOltdOm51bGw9PXJ8fHQ/bltuLmxlbmd0aC0xXTpoLnJlc3QobixNYXRoLm1heCgwLG4ubGVuZ3RoLXIpKX0saC5yZXN0PWgudGFpbD1oLmRyb3A9ZnVuY3Rpb24obixyLHQpe3JldHVybiBjLmNhbGwobixudWxsPT1yfHx0PzE6cil9LGguY29tcGFjdD1mdW5jdGlvbihuKXtyZXR1cm4gaC5maWx0ZXIobixCb29sZWFuKX07dmFyIE09ZnVuY3Rpb24obixyLHQsZSl7Zm9yKHZhciB1PShlPWV8fFtdKS5sZW5ndGgsaT0wLG89QShuKTtpPG87aSsrKXt2YXIgYT1uW2ldO2lmKHcoYSkmJihoLmlzQXJyYXkoYSl8fGguaXNBcmd1bWVudHMoYSkpKWlmKHIpZm9yKHZhciBjPTAsbD1hLmxlbmd0aDtjPGw7KWVbdSsrXT1hW2MrK107ZWxzZSBNKGEscix0LGUpLHU9ZS5sZW5ndGg7ZWxzZSB0fHwoZVt1KytdPWEpfXJldHVybiBlfTtoLmZsYXR0ZW49ZnVuY3Rpb24obixyKXtyZXR1cm4gTShuLHIsITEpfSxoLndpdGhvdXQ9ZyhmdW5jdGlvbihuLHIpe3JldHVybiBoLmRpZmZlcmVuY2UobixyKX0pLGgudW5pcT1oLnVuaXF1ZT1mdW5jdGlvbihuLHIsdCxlKXtoLmlzQm9vbGVhbihyKXx8KGU9dCx0PXIscj0hMSksbnVsbCE9dCYmKHQ9ZCh0LGUpKTtmb3IodmFyIHU9W10saT1bXSxvPTAsYT1BKG4pO288YTtvKyspe3ZhciBjPW5bb10sbD10P3QoYyxvLG4pOmM7ciYmIXQ/KG8mJmk9PT1sfHx1LnB1c2goYyksaT1sKTp0P2guY29udGFpbnMoaSxsKXx8KGkucHVzaChsKSx1LnB1c2goYykpOmguY29udGFpbnModSxjKXx8dS5wdXNoKGMpfXJldHVybiB1fSxoLnVuaW9uPWcoZnVuY3Rpb24obil7cmV0dXJuIGgudW5pcShNKG4sITAsITApKX0pLGguaW50ZXJzZWN0aW9uPWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj1bXSx0PWFyZ3VtZW50cy5sZW5ndGgsZT0wLHU9QShuKTtlPHU7ZSsrKXt2YXIgaT1uW2VdO2lmKCFoLmNvbnRhaW5zKHIsaSkpe3ZhciBvO2ZvcihvPTE7bzx0JiZoLmNvbnRhaW5zKGFyZ3VtZW50c1tvXSxpKTtvKyspO289PT10JiZyLnB1c2goaSl9fXJldHVybiByfSxoLmRpZmZlcmVuY2U9ZyhmdW5jdGlvbihuLHIpe3JldHVybiByPU0ociwhMCwhMCksaC5maWx0ZXIobixmdW5jdGlvbihuKXtyZXR1cm4haC5jb250YWlucyhyLG4pfSl9KSxoLnVuemlwPWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj1uJiZoLm1heChuLEEpLmxlbmd0aHx8MCx0PUFycmF5KHIpLGU9MDtlPHI7ZSsrKXRbZV09aC5wbHVjayhuLGUpO3JldHVybiB0fSxoLnppcD1nKGgudW56aXApLGgub2JqZWN0PWZ1bmN0aW9uKG4scil7Zm9yKHZhciB0PXt9LGU9MCx1PUEobik7ZTx1O2UrKylyP3RbbltlXV09cltlXTp0W25bZV1bMF1dPW5bZV1bMV07cmV0dXJuIHR9O3ZhciBGPWZ1bmN0aW9uKGkpe3JldHVybiBmdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPUEobiksdT0wPGk/MDplLTE7MDw9dSYmdTxlO3UrPWkpaWYocihuW3VdLHUsbikpcmV0dXJuIHU7cmV0dXJuLTF9fTtoLmZpbmRJbmRleD1GKDEpLGguZmluZExhc3RJbmRleD1GKC0xKSxoLnNvcnRlZEluZGV4PWZ1bmN0aW9uKG4scix0LGUpe2Zvcih2YXIgdT0odD1kKHQsZSwxKSkociksaT0wLG89QShuKTtpPG87KXt2YXIgYT1NYXRoLmZsb29yKChpK28pLzIpO3QoblthXSk8dT9pPWErMTpvPWF9cmV0dXJuIGl9O3ZhciBFPWZ1bmN0aW9uKGksbyxhKXtyZXR1cm4gZnVuY3Rpb24obixyLHQpe3ZhciBlPTAsdT1BKG4pO2lmKFwibnVtYmVyXCI9PXR5cGVvZiB0KTA8aT9lPTA8PXQ/dDpNYXRoLm1heCh0K3UsZSk6dT0wPD10P01hdGgubWluKHQrMSx1KTp0K3UrMTtlbHNlIGlmKGEmJnQmJnUpcmV0dXJuIG5bdD1hKG4scildPT09cj90Oi0xO2lmKHIhPXIpcmV0dXJuIDA8PSh0PW8oYy5jYWxsKG4sZSx1KSxoLmlzTmFOKSk/dCtlOi0xO2Zvcih0PTA8aT9lOnUtMTswPD10JiZ0PHU7dCs9aSlpZihuW3RdPT09cilyZXR1cm4gdDtyZXR1cm4tMX19O2guaW5kZXhPZj1FKDEsaC5maW5kSW5kZXgsaC5zb3J0ZWRJbmRleCksaC5sYXN0SW5kZXhPZj1FKC0xLGguZmluZExhc3RJbmRleCksaC5yYW5nZT1mdW5jdGlvbihuLHIsdCl7bnVsbD09ciYmKHI9bnx8MCxuPTApLHR8fCh0PXI8bj8tMToxKTtmb3IodmFyIGU9TWF0aC5tYXgoTWF0aC5jZWlsKChyLW4pL3QpLDApLHU9QXJyYXkoZSksaT0wO2k8ZTtpKyssbis9dCl1W2ldPW47cmV0dXJuIHV9LGguY2h1bms9ZnVuY3Rpb24obixyKXtpZihudWxsPT1yfHxyPDEpcmV0dXJuW107Zm9yKHZhciB0PVtdLGU9MCx1PW4ubGVuZ3RoO2U8dTspdC5wdXNoKGMuY2FsbChuLGUsZSs9cikpO3JldHVybiB0fTt2YXIgTj1mdW5jdGlvbihuLHIsdCxlLHUpe2lmKCEoZSBpbnN0YW5jZW9mIHIpKXJldHVybiBuLmFwcGx5KHQsdSk7dmFyIGk9bShuLnByb3RvdHlwZSksbz1uLmFwcGx5KGksdSk7cmV0dXJuIGguaXNPYmplY3Qobyk/bzppfTtoLmJpbmQ9ZyhmdW5jdGlvbihyLHQsZSl7aWYoIWguaXNGdW5jdGlvbihyKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiQmluZCBtdXN0IGJlIGNhbGxlZCBvbiBhIGZ1bmN0aW9uXCIpO3ZhciB1PWcoZnVuY3Rpb24obil7cmV0dXJuIE4ocix1LHQsdGhpcyxlLmNvbmNhdChuKSl9KTtyZXR1cm4gdX0pLGgucGFydGlhbD1nKGZ1bmN0aW9uKHUsaSl7dmFyIG89aC5wYXJ0aWFsLnBsYWNlaG9sZGVyLGE9ZnVuY3Rpb24oKXtmb3IodmFyIG49MCxyPWkubGVuZ3RoLHQ9QXJyYXkociksZT0wO2U8cjtlKyspdFtlXT1pW2VdPT09bz9hcmd1bWVudHNbbisrXTppW2VdO2Zvcig7bjxhcmd1bWVudHMubGVuZ3RoOyl0LnB1c2goYXJndW1lbnRzW24rK10pO3JldHVybiBOKHUsYSx0aGlzLHRoaXMsdCl9O3JldHVybiBhfSksKGgucGFydGlhbC5wbGFjZWhvbGRlcj1oKS5iaW5kQWxsPWcoZnVuY3Rpb24obixyKXt2YXIgdD0ocj1NKHIsITEsITEpKS5sZW5ndGg7aWYodDwxKXRocm93IG5ldyBFcnJvcihcImJpbmRBbGwgbXVzdCBiZSBwYXNzZWQgZnVuY3Rpb24gbmFtZXNcIik7Zm9yKDt0LS07KXt2YXIgZT1yW3RdO25bZV09aC5iaW5kKG5bZV0sbil9fSksaC5tZW1vaXplPWZ1bmN0aW9uKGUsdSl7dmFyIGk9ZnVuY3Rpb24obil7dmFyIHI9aS5jYWNoZSx0PVwiXCIrKHU/dS5hcHBseSh0aGlzLGFyZ3VtZW50cyk6bik7cmV0dXJuIGoocix0KXx8KHJbdF09ZS5hcHBseSh0aGlzLGFyZ3VtZW50cykpLHJbdF19O3JldHVybiBpLmNhY2hlPXt9LGl9LGguZGVsYXk9ZyhmdW5jdGlvbihuLHIsdCl7cmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtyZXR1cm4gbi5hcHBseShudWxsLHQpfSxyKX0pLGguZGVmZXI9aC5wYXJ0aWFsKGguZGVsYXksaCwxKSxoLnRocm90dGxlPWZ1bmN0aW9uKHQsZSx1KXt2YXIgaSxvLGEsYyxsPTA7dXx8KHU9e30pO3ZhciBmPWZ1bmN0aW9uKCl7bD0hMT09PXUubGVhZGluZz8wOmgubm93KCksaT1udWxsLGM9dC5hcHBseShvLGEpLGl8fChvPWE9bnVsbCl9LG49ZnVuY3Rpb24oKXt2YXIgbj1oLm5vdygpO2x8fCExIT09dS5sZWFkaW5nfHwobD1uKTt2YXIgcj1lLShuLWwpO3JldHVybiBvPXRoaXMsYT1hcmd1bWVudHMscjw9MHx8ZTxyPyhpJiYoY2xlYXJUaW1lb3V0KGkpLGk9bnVsbCksbD1uLGM9dC5hcHBseShvLGEpLGl8fChvPWE9bnVsbCkpOml8fCExPT09dS50cmFpbGluZ3x8KGk9c2V0VGltZW91dChmLHIpKSxjfTtyZXR1cm4gbi5jYW5jZWw9ZnVuY3Rpb24oKXtjbGVhclRpbWVvdXQoaSksbD0wLGk9bz1hPW51bGx9LG59LGguZGVib3VuY2U9ZnVuY3Rpb24odCxlLHUpe3ZhciBpLG8sYT1mdW5jdGlvbihuLHIpe2k9bnVsbCxyJiYobz10LmFwcGx5KG4scikpfSxuPWcoZnVuY3Rpb24obil7aWYoaSYmY2xlYXJUaW1lb3V0KGkpLHUpe3ZhciByPSFpO2k9c2V0VGltZW91dChhLGUpLHImJihvPXQuYXBwbHkodGhpcyxuKSl9ZWxzZSBpPWguZGVsYXkoYSxlLHRoaXMsbik7cmV0dXJuIG99KTtyZXR1cm4gbi5jYW5jZWw9ZnVuY3Rpb24oKXtjbGVhclRpbWVvdXQoaSksaT1udWxsfSxufSxoLndyYXA9ZnVuY3Rpb24obixyKXtyZXR1cm4gaC5wYXJ0aWFsKHIsbil9LGgubmVnYXRlPWZ1bmN0aW9uKG4pe3JldHVybiBmdW5jdGlvbigpe3JldHVybiFuLmFwcGx5KHRoaXMsYXJndW1lbnRzKX19LGguY29tcG9zZT1mdW5jdGlvbigpe3ZhciB0PWFyZ3VtZW50cyxlPXQubGVuZ3RoLTE7cmV0dXJuIGZ1bmN0aW9uKCl7Zm9yKHZhciBuPWUscj10W2VdLmFwcGx5KHRoaXMsYXJndW1lbnRzKTtuLS07KXI9dFtuXS5jYWxsKHRoaXMscik7cmV0dXJuIHJ9fSxoLmFmdGVyPWZ1bmN0aW9uKG4scil7cmV0dXJuIGZ1bmN0aW9uKCl7aWYoLS1uPDEpcmV0dXJuIHIuYXBwbHkodGhpcyxhcmd1bWVudHMpfX0saC5iZWZvcmU9ZnVuY3Rpb24obixyKXt2YXIgdDtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gMDwtLW4mJih0PXIuYXBwbHkodGhpcyxhcmd1bWVudHMpKSxuPD0xJiYocj1udWxsKSx0fX0saC5vbmNlPWgucGFydGlhbChoLmJlZm9yZSwyKSxoLnJlc3RBcmd1bWVudHM9Zzt2YXIgST0he3RvU3RyaW5nOm51bGx9LnByb3BlcnR5SXNFbnVtZXJhYmxlKFwidG9TdHJpbmdcIiksVD1bXCJ2YWx1ZU9mXCIsXCJpc1Byb3RvdHlwZU9mXCIsXCJ0b1N0cmluZ1wiLFwicHJvcGVydHlJc0VudW1lcmFibGVcIixcImhhc093blByb3BlcnR5XCIsXCJ0b0xvY2FsZVN0cmluZ1wiXSxCPWZ1bmN0aW9uKG4scil7dmFyIHQ9VC5sZW5ndGgsZT1uLmNvbnN0cnVjdG9yLHU9aC5pc0Z1bmN0aW9uKGUpJiZlLnByb3RvdHlwZXx8byxpPVwiY29uc3RydWN0b3JcIjtmb3IoaihuLGkpJiYhaC5jb250YWlucyhyLGkpJiZyLnB1c2goaSk7dC0tOykoaT1UW3RdKWluIG4mJm5baV0hPT11W2ldJiYhaC5jb250YWlucyhyLGkpJiZyLnB1c2goaSl9O2gua2V5cz1mdW5jdGlvbihuKXtpZighaC5pc09iamVjdChuKSlyZXR1cm5bXTtpZihhKXJldHVybiBhKG4pO3ZhciByPVtdO2Zvcih2YXIgdCBpbiBuKWoobix0KSYmci5wdXNoKHQpO3JldHVybiBJJiZCKG4scikscn0saC5hbGxLZXlzPWZ1bmN0aW9uKG4pe2lmKCFoLmlzT2JqZWN0KG4pKXJldHVybltdO3ZhciByPVtdO2Zvcih2YXIgdCBpbiBuKXIucHVzaCh0KTtyZXR1cm4gSSYmQihuLHIpLHJ9LGgudmFsdWVzPWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj1oLmtleXMobiksdD1yLmxlbmd0aCxlPUFycmF5KHQpLHU9MDt1PHQ7dSsrKWVbdV09bltyW3VdXTtyZXR1cm4gZX0saC5tYXBPYmplY3Q9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT1oLmtleXMobiksdT1lLmxlbmd0aCxpPXt9LG89MDtvPHU7bysrKXt2YXIgYT1lW29dO2lbYV09cihuW2FdLGEsbil9cmV0dXJuIGl9LGgucGFpcnM9ZnVuY3Rpb24obil7Zm9yKHZhciByPWgua2V5cyhuKSx0PXIubGVuZ3RoLGU9QXJyYXkodCksdT0wO3U8dDt1KyspZVt1XT1bclt1XSxuW3JbdV1dXTtyZXR1cm4gZX0saC5pbnZlcnQ9ZnVuY3Rpb24obil7Zm9yKHZhciByPXt9LHQ9aC5rZXlzKG4pLGU9MCx1PXQubGVuZ3RoO2U8dTtlKyspcltuW3RbZV1dXT10W2VdO3JldHVybiByfSxoLmZ1bmN0aW9ucz1oLm1ldGhvZHM9ZnVuY3Rpb24obil7dmFyIHI9W107Zm9yKHZhciB0IGluIG4paC5pc0Z1bmN0aW9uKG5bdF0pJiZyLnB1c2godCk7cmV0dXJuIHIuc29ydCgpfTt2YXIgUj1mdW5jdGlvbihjLGwpe3JldHVybiBmdW5jdGlvbihuKXt2YXIgcj1hcmd1bWVudHMubGVuZ3RoO2lmKGwmJihuPU9iamVjdChuKSkscjwyfHxudWxsPT1uKXJldHVybiBuO2Zvcih2YXIgdD0xO3Q8cjt0KyspZm9yKHZhciBlPWFyZ3VtZW50c1t0XSx1PWMoZSksaT11Lmxlbmd0aCxvPTA7bzxpO28rKyl7dmFyIGE9dVtvXTtsJiZ2b2lkIDAhPT1uW2FdfHwoblthXT1lW2FdKX1yZXR1cm4gbn19O2guZXh0ZW5kPVIoaC5hbGxLZXlzKSxoLmV4dGVuZE93bj1oLmFzc2lnbj1SKGgua2V5cyksaC5maW5kS2V5PWZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGUsdT1oLmtleXMobiksaT0wLG89dS5sZW5ndGg7aTxvO2krKylpZihyKG5bZT11W2ldXSxlLG4pKXJldHVybiBlfTt2YXIgcSxLLHo9ZnVuY3Rpb24obixyLHQpe3JldHVybiByIGluIHR9O2gucGljaz1nKGZ1bmN0aW9uKG4scil7dmFyIHQ9e30sZT1yWzBdO2lmKG51bGw9PW4pcmV0dXJuIHQ7aC5pc0Z1bmN0aW9uKGUpPygxPHIubGVuZ3RoJiYoZT15KGUsclsxXSkpLHI9aC5hbGxLZXlzKG4pKTooZT16LHI9TShyLCExLCExKSxuPU9iamVjdChuKSk7Zm9yKHZhciB1PTAsaT1yLmxlbmd0aDt1PGk7dSsrKXt2YXIgbz1yW3VdLGE9bltvXTtlKGEsbyxuKSYmKHRbb109YSl9cmV0dXJuIHR9KSxoLm9taXQ9ZyhmdW5jdGlvbihuLHQpe3ZhciByLGU9dFswXTtyZXR1cm4gaC5pc0Z1bmN0aW9uKGUpPyhlPWgubmVnYXRlKGUpLDE8dC5sZW5ndGgmJihyPXRbMV0pKToodD1oLm1hcChNKHQsITEsITEpLFN0cmluZyksZT1mdW5jdGlvbihuLHIpe3JldHVybiFoLmNvbnRhaW5zKHQscil9KSxoLnBpY2sobixlLHIpfSksaC5kZWZhdWx0cz1SKGguYWxsS2V5cywhMCksaC5jcmVhdGU9ZnVuY3Rpb24obixyKXt2YXIgdD1tKG4pO3JldHVybiByJiZoLmV4dGVuZE93bih0LHIpLHR9LGguY2xvbmU9ZnVuY3Rpb24obil7cmV0dXJuIGguaXNPYmplY3Qobik/aC5pc0FycmF5KG4pP24uc2xpY2UoKTpoLmV4dGVuZCh7fSxuKTpufSxoLnRhcD1mdW5jdGlvbihuLHIpe3JldHVybiByKG4pLG59LGguaXNNYXRjaD1mdW5jdGlvbihuLHIpe3ZhciB0PWgua2V5cyhyKSxlPXQubGVuZ3RoO2lmKG51bGw9PW4pcmV0dXJuIWU7Zm9yKHZhciB1PU9iamVjdChuKSxpPTA7aTxlO2krKyl7dmFyIG89dFtpXTtpZihyW29dIT09dVtvXXx8IShvIGluIHUpKXJldHVybiExfXJldHVybiEwfSxxPWZ1bmN0aW9uKG4scix0LGUpe2lmKG49PT1yKXJldHVybiAwIT09bnx8MS9uPT0xL3I7aWYobnVsbD09bnx8bnVsbD09cilyZXR1cm4hMTtpZihuIT1uKXJldHVybiByIT1yO3ZhciB1PXR5cGVvZiBuO3JldHVybihcImZ1bmN0aW9uXCI9PT11fHxcIm9iamVjdFwiPT09dXx8XCJvYmplY3RcIj09dHlwZW9mIHIpJiZLKG4scix0LGUpfSxLPWZ1bmN0aW9uKG4scix0LGUpe24gaW5zdGFuY2VvZiBoJiYobj1uLl93cmFwcGVkKSxyIGluc3RhbmNlb2YgaCYmKHI9ci5fd3JhcHBlZCk7dmFyIHU9cC5jYWxsKG4pO2lmKHUhPT1wLmNhbGwocikpcmV0dXJuITE7c3dpdGNoKHUpe2Nhc2VcIltvYmplY3QgUmVnRXhwXVwiOmNhc2VcIltvYmplY3QgU3RyaW5nXVwiOnJldHVyblwiXCIrbj09XCJcIityO2Nhc2VcIltvYmplY3QgTnVtYmVyXVwiOnJldHVybituIT0rbj8rciE9K3I6MD09K24/MS8rbj09MS9yOituPT0rcjtjYXNlXCJbb2JqZWN0IERhdGVdXCI6Y2FzZVwiW29iamVjdCBCb29sZWFuXVwiOnJldHVybituPT0rcjtjYXNlXCJbb2JqZWN0IFN5bWJvbF1cIjpyZXR1cm4gcy52YWx1ZU9mLmNhbGwobik9PT1zLnZhbHVlT2YuY2FsbChyKX12YXIgaT1cIltvYmplY3QgQXJyYXldXCI9PT11O2lmKCFpKXtpZihcIm9iamVjdFwiIT10eXBlb2Ygbnx8XCJvYmplY3RcIiE9dHlwZW9mIHIpcmV0dXJuITE7dmFyIG89bi5jb25zdHJ1Y3RvcixhPXIuY29uc3RydWN0b3I7aWYobyE9PWEmJiEoaC5pc0Z1bmN0aW9uKG8pJiZvIGluc3RhbmNlb2YgbyYmaC5pc0Z1bmN0aW9uKGEpJiZhIGluc3RhbmNlb2YgYSkmJlwiY29uc3RydWN0b3JcImluIG4mJlwiY29uc3RydWN0b3JcImluIHIpcmV0dXJuITF9ZT1lfHxbXTtmb3IodmFyIGM9KHQ9dHx8W10pLmxlbmd0aDtjLS07KWlmKHRbY109PT1uKXJldHVybiBlW2NdPT09cjtpZih0LnB1c2gobiksZS5wdXNoKHIpLGkpe2lmKChjPW4ubGVuZ3RoKSE9PXIubGVuZ3RoKXJldHVybiExO2Zvcig7Yy0tOylpZighcShuW2NdLHJbY10sdCxlKSlyZXR1cm4hMX1lbHNle3ZhciBsLGY9aC5rZXlzKG4pO2lmKGM9Zi5sZW5ndGgsaC5rZXlzKHIpLmxlbmd0aCE9PWMpcmV0dXJuITE7Zm9yKDtjLS07KWlmKGw9ZltjXSwhaihyLGwpfHwhcShuW2xdLHJbbF0sdCxlKSlyZXR1cm4hMX1yZXR1cm4gdC5wb3AoKSxlLnBvcCgpLCEwfSxoLmlzRXF1YWw9ZnVuY3Rpb24obixyKXtyZXR1cm4gcShuLHIpfSxoLmlzRW1wdHk9ZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PW58fCh3KG4pJiYoaC5pc0FycmF5KG4pfHxoLmlzU3RyaW5nKG4pfHxoLmlzQXJndW1lbnRzKG4pKT8wPT09bi5sZW5ndGg6MD09PWgua2V5cyhuKS5sZW5ndGgpfSxoLmlzRWxlbWVudD1mdW5jdGlvbihuKXtyZXR1cm4hKCFufHwxIT09bi5ub2RlVHlwZSl9LGguaXNBcnJheT10fHxmdW5jdGlvbihuKXtyZXR1cm5cIltvYmplY3QgQXJyYXldXCI9PT1wLmNhbGwobil9LGguaXNPYmplY3Q9ZnVuY3Rpb24obil7dmFyIHI9dHlwZW9mIG47cmV0dXJuXCJmdW5jdGlvblwiPT09cnx8XCJvYmplY3RcIj09PXImJiEhbn0saC5lYWNoKFtcIkFyZ3VtZW50c1wiLFwiRnVuY3Rpb25cIixcIlN0cmluZ1wiLFwiTnVtYmVyXCIsXCJEYXRlXCIsXCJSZWdFeHBcIixcIkVycm9yXCIsXCJTeW1ib2xcIixcIk1hcFwiLFwiV2Vha01hcFwiLFwiU2V0XCIsXCJXZWFrU2V0XCJdLGZ1bmN0aW9uKHIpe2hbXCJpc1wiK3JdPWZ1bmN0aW9uKG4pe3JldHVybiBwLmNhbGwobik9PT1cIltvYmplY3QgXCIrcitcIl1cIn19KSxoLmlzQXJndW1lbnRzKGFyZ3VtZW50cyl8fChoLmlzQXJndW1lbnRzPWZ1bmN0aW9uKG4pe3JldHVybiBqKG4sXCJjYWxsZWVcIil9KTt2YXIgRD1uLmRvY3VtZW50JiZuLmRvY3VtZW50LmNoaWxkTm9kZXM7XCJmdW5jdGlvblwiIT10eXBlb2YvLi8mJlwib2JqZWN0XCIhPXR5cGVvZiBJbnQ4QXJyYXkmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIEQmJihoLmlzRnVuY3Rpb249ZnVuY3Rpb24obil7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2Ygbnx8ITF9KSxoLmlzRmluaXRlPWZ1bmN0aW9uKG4pe3JldHVybiFoLmlzU3ltYm9sKG4pJiZpc0Zpbml0ZShuKSYmIWlzTmFOKHBhcnNlRmxvYXQobikpfSxoLmlzTmFOPWZ1bmN0aW9uKG4pe3JldHVybiBoLmlzTnVtYmVyKG4pJiZpc05hTihuKX0saC5pc0Jvb2xlYW49ZnVuY3Rpb24obil7cmV0dXJuITA9PT1ufHwhMT09PW58fFwiW29iamVjdCBCb29sZWFuXVwiPT09cC5jYWxsKG4pfSxoLmlzTnVsbD1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09PW59LGguaXNVbmRlZmluZWQ9ZnVuY3Rpb24obil7cmV0dXJuIHZvaWQgMD09PW59LGguaGFzPWZ1bmN0aW9uKG4scil7aWYoIWguaXNBcnJheShyKSlyZXR1cm4gaihuLHIpO2Zvcih2YXIgdD1yLmxlbmd0aCxlPTA7ZTx0O2UrKyl7dmFyIHU9cltlXTtpZihudWxsPT1ufHwhaS5jYWxsKG4sdSkpcmV0dXJuITE7bj1uW3VdfXJldHVybiEhdH0saC5ub0NvbmZsaWN0PWZ1bmN0aW9uKCl7cmV0dXJuIG4uXz1yLHRoaXN9LGguaWRlbnRpdHk9ZnVuY3Rpb24obil7cmV0dXJuIG59LGguY29uc3RhbnQ9ZnVuY3Rpb24obil7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIG59fSxoLm5vb3A9ZnVuY3Rpb24oKXt9LGgucHJvcGVydHk9ZnVuY3Rpb24ocil7cmV0dXJuIGguaXNBcnJheShyKT9mdW5jdGlvbihuKXtyZXR1cm4geChuLHIpfTpiKHIpfSxoLnByb3BlcnR5T2Y9ZnVuY3Rpb24ocil7cmV0dXJuIG51bGw9PXI/ZnVuY3Rpb24oKXt9OmZ1bmN0aW9uKG4pe3JldHVybiBoLmlzQXJyYXkobik/eChyLG4pOnJbbl19fSxoLm1hdGNoZXI9aC5tYXRjaGVzPWZ1bmN0aW9uKHIpe3JldHVybiByPWguZXh0ZW5kT3duKHt9LHIpLGZ1bmN0aW9uKG4pe3JldHVybiBoLmlzTWF0Y2gobixyKX19LGgudGltZXM9ZnVuY3Rpb24obixyLHQpe3ZhciBlPUFycmF5KE1hdGgubWF4KDAsbikpO3I9eShyLHQsMSk7Zm9yKHZhciB1PTA7dTxuO3UrKyllW3VdPXIodSk7cmV0dXJuIGV9LGgucmFuZG9tPWZ1bmN0aW9uKG4scil7cmV0dXJuIG51bGw9PXImJihyPW4sbj0wKSxuK01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSooci1uKzEpKX0saC5ub3c9RGF0ZS5ub3d8fGZ1bmN0aW9uKCl7cmV0dXJuKG5ldyBEYXRlKS5nZXRUaW1lKCl9O3ZhciBMPXtcIiZcIjpcIiZhbXA7XCIsXCI8XCI6XCImbHQ7XCIsXCI+XCI6XCImZ3Q7XCIsJ1wiJzpcIiZxdW90O1wiLFwiJ1wiOlwiJiN4Mjc7XCIsXCJgXCI6XCImI3g2MDtcIn0sUD1oLmludmVydChMKSxXPWZ1bmN0aW9uKHIpe3ZhciB0PWZ1bmN0aW9uKG4pe3JldHVybiByW25dfSxuPVwiKD86XCIraC5rZXlzKHIpLmpvaW4oXCJ8XCIpK1wiKVwiLGU9UmVnRXhwKG4pLHU9UmVnRXhwKG4sXCJnXCIpO3JldHVybiBmdW5jdGlvbihuKXtyZXR1cm4gbj1udWxsPT1uP1wiXCI6XCJcIituLGUudGVzdChuKT9uLnJlcGxhY2UodSx0KTpufX07aC5lc2NhcGU9VyhMKSxoLnVuZXNjYXBlPVcoUCksaC5yZXN1bHQ9ZnVuY3Rpb24obixyLHQpe2guaXNBcnJheShyKXx8KHI9W3JdKTt2YXIgZT1yLmxlbmd0aDtpZighZSlyZXR1cm4gaC5pc0Z1bmN0aW9uKHQpP3QuY2FsbChuKTp0O2Zvcih2YXIgdT0wO3U8ZTt1Kyspe3ZhciBpPW51bGw9PW4/dm9pZCAwOm5bclt1XV07dm9pZCAwPT09aSYmKGk9dCx1PWUpLG49aC5pc0Z1bmN0aW9uKGkpP2kuY2FsbChuKTppfXJldHVybiBufTt2YXIgQz0wO2gudW5pcXVlSWQ9ZnVuY3Rpb24obil7dmFyIHI9KytDK1wiXCI7cmV0dXJuIG4/bityOnJ9LGgudGVtcGxhdGVTZXR0aW5ncz17ZXZhbHVhdGU6LzwlKFtcXHNcXFNdKz8pJT4vZyxpbnRlcnBvbGF0ZTovPCU9KFtcXHNcXFNdKz8pJT4vZyxlc2NhcGU6LzwlLShbXFxzXFxTXSs/KSU+L2d9O3ZhciBKPS8oLileLyxVPXtcIidcIjpcIidcIixcIlxcXFxcIjpcIlxcXFxcIixcIlxcclwiOlwiclwiLFwiXFxuXCI6XCJuXCIsXCJcXHUyMDI4XCI6XCJ1MjAyOFwiLFwiXFx1MjAyOVwiOlwidTIwMjlcIn0sVj0vXFxcXHwnfFxccnxcXG58XFx1MjAyOHxcXHUyMDI5L2csJD1mdW5jdGlvbihuKXtyZXR1cm5cIlxcXFxcIitVW25dfTtoLnRlbXBsYXRlPWZ1bmN0aW9uKGksbixyKXshbiYmciYmKG49ciksbj1oLmRlZmF1bHRzKHt9LG4saC50ZW1wbGF0ZVNldHRpbmdzKTt2YXIgdCxlPVJlZ0V4cChbKG4uZXNjYXBlfHxKKS5zb3VyY2UsKG4uaW50ZXJwb2xhdGV8fEopLnNvdXJjZSwobi5ldmFsdWF0ZXx8Sikuc291cmNlXS5qb2luKFwifFwiKStcInwkXCIsXCJnXCIpLG89MCxhPVwiX19wKz0nXCI7aS5yZXBsYWNlKGUsZnVuY3Rpb24obixyLHQsZSx1KXtyZXR1cm4gYSs9aS5zbGljZShvLHUpLnJlcGxhY2UoViwkKSxvPXUrbi5sZW5ndGgscj9hKz1cIicrXFxuKChfX3Q9KFwiK3IrXCIpKT09bnVsbD8nJzpfLmVzY2FwZShfX3QpKStcXG4nXCI6dD9hKz1cIicrXFxuKChfX3Q9KFwiK3QrXCIpKT09bnVsbD8nJzpfX3QpK1xcbidcIjplJiYoYSs9XCInO1xcblwiK2UrXCJcXG5fX3ArPSdcIiksbn0pLGErPVwiJztcXG5cIixuLnZhcmlhYmxlfHwoYT1cIndpdGgob2JqfHx7fSl7XFxuXCIrYStcIn1cXG5cIiksYT1cInZhciBfX3QsX19wPScnLF9faj1BcnJheS5wcm90b3R5cGUuam9pbixcIitcInByaW50PWZ1bmN0aW9uKCl7X19wKz1fX2ouY2FsbChhcmd1bWVudHMsJycpO307XFxuXCIrYStcInJldHVybiBfX3A7XFxuXCI7dHJ5e3Q9bmV3IEZ1bmN0aW9uKG4udmFyaWFibGV8fFwib2JqXCIsXCJfXCIsYSl9Y2F0Y2gobil7dGhyb3cgbi5zb3VyY2U9YSxufXZhciB1PWZ1bmN0aW9uKG4pe3JldHVybiB0LmNhbGwodGhpcyxuLGgpfSxjPW4udmFyaWFibGV8fFwib2JqXCI7cmV0dXJuIHUuc291cmNlPVwiZnVuY3Rpb24oXCIrYytcIil7XFxuXCIrYStcIn1cIix1fSxoLmNoYWluPWZ1bmN0aW9uKG4pe3ZhciByPWgobik7cmV0dXJuIHIuX2NoYWluPSEwLHJ9O3ZhciBHPWZ1bmN0aW9uKG4scil7cmV0dXJuIG4uX2NoYWluP2gocikuY2hhaW4oKTpyfTtoLm1peGluPWZ1bmN0aW9uKHQpe3JldHVybiBoLmVhY2goaC5mdW5jdGlvbnModCksZnVuY3Rpb24obil7dmFyIHI9aFtuXT10W25dO2gucHJvdG90eXBlW25dPWZ1bmN0aW9uKCl7dmFyIG49W3RoaXMuX3dyYXBwZWRdO3JldHVybiB1LmFwcGx5KG4sYXJndW1lbnRzKSxHKHRoaXMsci5hcHBseShoLG4pKX19KSxofSxoLm1peGluKGgpLGguZWFjaChbXCJwb3BcIixcInB1c2hcIixcInJldmVyc2VcIixcInNoaWZ0XCIsXCJzb3J0XCIsXCJzcGxpY2VcIixcInVuc2hpZnRcIl0sZnVuY3Rpb24ocil7dmFyIHQ9ZVtyXTtoLnByb3RvdHlwZVtyXT1mdW5jdGlvbigpe3ZhciBuPXRoaXMuX3dyYXBwZWQ7cmV0dXJuIHQuYXBwbHkobixhcmd1bWVudHMpLFwic2hpZnRcIiE9PXImJlwic3BsaWNlXCIhPT1yfHwwIT09bi5sZW5ndGh8fGRlbGV0ZSBuWzBdLEcodGhpcyxuKX19KSxoLmVhY2goW1wiY29uY2F0XCIsXCJqb2luXCIsXCJzbGljZVwiXSxmdW5jdGlvbihuKXt2YXIgcj1lW25dO2gucHJvdG90eXBlW25dPWZ1bmN0aW9uKCl7cmV0dXJuIEcodGhpcyxyLmFwcGx5KHRoaXMuX3dyYXBwZWQsYXJndW1lbnRzKSl9fSksaC5wcm90b3R5cGUudmFsdWU9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fd3JhcHBlZH0saC5wcm90b3R5cGUudmFsdWVPZj1oLnByb3RvdHlwZS50b0pTT049aC5wcm90b3R5cGUudmFsdWUsaC5wcm90b3R5cGUudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gU3RyaW5nKHRoaXMuX3dyYXBwZWQpfSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQmJmRlZmluZShcInVuZGVyc2NvcmVcIixbXSxmdW5jdGlvbigpe3JldHVybiBofSl9KCk7XHJcbiIsImltcG9ydCB7ZXh0cmFjdEV4dGVuc2lvbn0gZnJvbSBcInV0aWxzL3N0cmluZ3NcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBpc1J0bXAgPSBmdW5jdGlvbiAoZmlsZSwgdHlwZSkge1xyXG4gICAgaWYoZmlsZSl7XHJcbiAgICAgICAgcmV0dXJuIChmaWxlLmluZGV4T2YoJ3J0bXA6JykgPT0gMCB8fCB0eXBlID09ICdydG1wJyk7XHJcbiAgICB9XHJcbn07XHJcbmV4cG9ydCBjb25zdCBpc1dlYlJUQyA9IGZ1bmN0aW9uIChmaWxlLCB0eXBlKSB7XHJcbiAgICBpZihmaWxlKXtcclxuICAgICAgICByZXR1cm4gKGZpbGUuaW5kZXhPZignd3M6JykgPT09IDAgfHwgZmlsZS5pbmRleE9mKCd3c3M6JykgPT09IDAgfHwgdHlwZSA9PT0gJ3dlYnJ0YycpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5leHBvcnQgY29uc3QgaXNIbHMgPSBmdW5jdGlvbiAoZmlsZSwgdHlwZSkge1xyXG4gICAgaWYoZmlsZSl7XHJcbiAgICAgICAgcmV0dXJuICggdHlwZSA9PT0gJ2hscycgfHwgIHR5cGUgPT09ICdtM3U4JyB8fCB0eXBlID09PSAnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnIHx8IGV4dHJhY3RFeHRlbnNpb24oZmlsZSkgPT0gJ20zdTgnKTtcclxuXHJcbiAgICB9XHJcbn07XHJcbmV4cG9ydCBjb25zdCBpc0Rhc2ggPSBmdW5jdGlvbiAoZmlsZSwgdHlwZSkge1xyXG4gICAgaWYoZmlsZSl7XHJcbiAgICAgICAgcmV0dXJuICggdHlwZSA9PT0gJ21wZCcgfHwgIHR5cGUgPT09ICdkYXNoJyB8fCB0eXBlID09PSAnYXBwbGljYXRpb24vZGFzaCt4bWwnIHx8IGV4dHJhY3RFeHRlbnNpb24oZmlsZSkgPT0gJ21wZCcpO1xyXG5cclxuICAgIH1cclxufTtcclxuIiwiLyoqXHJcbiAqIHV0aWxzIGZvciB3ZWJwYWNrXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNvbnN0IGdldFNjcmlwdFBhdGggPSBmdW5jdGlvbihzY3JpcHROYW1lKSB7XHJcbiAgICBjb25zdCBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY3JpcHRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3Qgc3JjID0gc2NyaXB0c1tpXS5zcmM7XHJcbiAgICAgICAgaWYgKHNyYykge1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHNyYy5sYXN0SW5kZXhPZignLycgKyBzY3JpcHROYW1lKTtcclxuICAgICAgICAgICAgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzcmMuc3Vic3RyKDAsIGluZGV4ICsgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gJyc7XHJcbn07XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gMjkuLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHZlcnNpb24gPSBfX1ZFUlNJT05fXztcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==