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
var version = exports.version = '0.9.0-2021042313-localbuild';

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvQXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvQXBpRXhwYW5zaW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0NvbmZpZ3VyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0V2ZW50RW1pdHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0xhenlDb21tYW5kRXhlY3V0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9TdXBwb3J0Q2hlY2tlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2NhcHRpb24vTG9hZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvY2FwdGlvbi9NYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvY2FwdGlvbi9wYXJzZXIvU3J0UGFyc2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvY29uc3RhbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvbWVkaWEvTWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3BsYXlsaXN0L01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9Db250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL292ZW5wbGF5ZXIuc2RrLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9jYXB0aW9ucy92dHRDdWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL2xpa2VBJC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvc3RyaW5ncy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvdW5kZXJzY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvdmFsaWRhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy93ZWJwYWNrLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92ZXJzaW9uLmpzIl0sIm5hbWVzIjpbIkFwaSIsImNvbnRhaW5lciIsInRoYXQiLCJjb25zb2xlIiwibG9nIiwidmVyc2lvbiIsIk92ZW5QbGF5ZXJDb25zb2xlIiwicGxheWxpc3RNYW5hZ2VyIiwicHJvdmlkZXJDb250cm9sbGVyIiwidXNlckFnZW50T2JqZWN0IiwibWVkaWFNYW5hZ2VyIiwiY3VycmVudFByb3ZpZGVyIiwicGxheWVyQ29uZmlnIiwibGF6eVF1ZXVlIiwiY2FwdGlvbk1hbmFnZXIiLCJ3ZWJydGNSZXRyeSIsIldFQlJUQ19SRVRSWV9DT1VOVCIsIndlYnJ0Y1JldHJ5Q291bnQiLCJ3ZWJydGNSZXRyeUludGVydmFsIiwid2VicnRjUmV0cnlUaW1lciIsInJ1bk5leHRQbGF5bGlzdCIsImluZGV4IiwibmV4dFBsYXlsaXN0SW5kZXgiLCJwbGF5bGlzdCIsImdldFBsYXlsaXN0IiwiaGFzTmV4dFBsYXlsaXN0Iiwic2V0U291cmNlSW5kZXgiLCJzZXRWb2x1bWUiLCJnZXRWb2x1bWUiLCJzZXRDdXJyZW50UGxheWxpc3QiLCJpbml0UHJvdmlkZXIiLCJpc0F1dG9TdGFydCIsInBsYXkiLCJ0cmlnZ2VyIiwiQUxMX1BMQVlMSVNUX0VOREVEIiwibGFzdFBsYXlQb3NpdGlvbiIsInBpY2tRdWFsaXR5RnJvbVNvdXJjZSIsInNvdXJjZXMiLCJxdWFsaXR5IiwiaSIsImxlbmd0aCIsImdldFNvdXJjZUluZGV4IiwibG9hZFByb3ZpZGVycyIsImdldEN1cnJlbnRQbGF5TGlzdCIsInRoZW4iLCJQcm92aWRlcnMiLCJFUlJPUlMiLCJjb2RlcyIsIklOSVRfVU5TVVBQT1JUX0VSUk9SIiwiZGVzdHJveSIsImdldEN1cnJlbnRQbGF5bGlzdEluZGV4IiwiY3VycmVudFNvdXJjZUluZGV4IiwiZ2V0Q3VycmVudFNvdXJjZXMiLCJwcm92aWRlck5hbWUiLCJwcm92aWRlciIsImNyZWF0ZU1lZGlhIiwiZ2V0Q3VycmVudEFkVGFnIiwiUFJPVklERVJfUlRNUCIsIm9uIiwibmFtZSIsImRhdGEiLCJFUlJPUiIsIm9zIiwiYnJvd3NlciIsImNvZGUiLCJQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SIiwic2V0VGltZW91dCIsInNldEN1cnJlbnRTb3VyY2UiLCJnZXRDdXJyZW50U291cmNlIiwiZ2V0Q29uZmlnIiwiYXV0b0ZhbGxiYWNrIiwiZ2V0U291cmNlcyIsInBhdXNlIiwicHJlbG9hZCIsIlJFQURZIiwiZmx1c2giLCJlcnJvciIsIm9mZiIsInRlbXBFcnJvciIsIklOSVRfVU5LTldPTl9FUlJPUiIsImluaXQiLCJvcHRpb25zIiwibWVkaWFDb250YWluZXIiLCJ3ZWJydGNDb25maWciLCJsb2FkaW5nUmV0cnlDb3VudCIsInVuZGVmaW5lZCIsImdldFN5c3RlbVRleHQiLCJhcGkiLCJpbml0UGxheWxpc3QiLCJnZXRQcm92aWRlck5hbWUiLCJnZXROYW1lIiwiZ2V0TXNlSW5zdGFuY2UiLCJnZXRNc2UiLCJnZXRCcm93c2VyIiwic2V0VGltZWNvZGVNb2RlIiwiaXNTaG93IiwiaXNUaW1lY29kZU1vZGUiLCJnZXRGcmFtZXJhdGUiLCJzZWVrRnJhbWUiLCJmcmFtZUNvdW50IiwiZ2V0RHVyYXRpb24iLCJnZXRQb3NpdGlvbiIsInZvbHVtZSIsInNldE11dGUiLCJzdGF0ZSIsImdldE11dGUiLCJsb2FkIiwic2V0Q3VycmVudFF1YWxpdHkiLCJzZWVrIiwicG9zaXRpb24iLCJzZXRQbGF5YmFja1JhdGUiLCJwbGF5YmFja1JhdGUiLCJnZXRQbGF5YmFja1JhdGUiLCJnZXRDdXJyZW50UGxheWxpc3QiLCJnZXRRdWFsaXR5TGV2ZWxzIiwiZ2V0Q3VycmVudFF1YWxpdHkiLCJxdWFsaXR5SW5kZXgiLCJpc0F1dG9RdWFsaXR5Iiwic2V0QXV0b1F1YWxpdHkiLCJpc0F1dG8iLCJnZXRDYXB0aW9uTGlzdCIsImdldEN1cnJlbnRDYXB0aW9uIiwic2V0Q3VycmVudENhcHRpb24iLCJhZGRDYXB0aW9uIiwidHJhY2siLCJyZW1vdmVDYXB0aW9uIiwiZ2V0QnVmZmVyIiwiZ2V0U3RhdGUiLCJzdG9wIiwicmVtb3ZlIiwiREVTVFJPWSIsIk92ZW5QbGF5ZXJTREsiLCJyZW1vdmVQbGF5ZXIiLCJnZXRDb250YWluZXJJZCIsImdldFBsYXllckxpc3QiLCJnZXRWZXJzaW9uIiwiQXBpUnRtcEV4cGFuc2lvbiIsImV4dGVybmFsQ2FsbGJhY2tDcmVlcCIsInJlc3VsdCIsInRyaWdnZXJFdmVudEZyb21FeHRlcm5hbCIsIkNvbmZpZ3VyYXRvciIsImNvbXBvc2VTb3VyY2VPcHRpb25zIiwiRGVmYXVsdHMiLCJwbGF5YmFja1JhdGVzIiwibXV0ZSIsImxvb3AiLCJjb250cm9scyIsImF1dG9TdGFydCIsInRpbWVjb2RlIiwic291cmNlSW5kZXgiLCJoaWRlUGxheWxpc3RJY29uIiwicnRtcEJ1ZmZlclRpbWUiLCJydG1wQnVmZmVyVGltZU1heCIsImFkQ2xpZW50IiwiY3VycmVudFByb3RvY29sT25seSIsInN5c3RlbVRleHQiLCJsYW5nIiwiZXhwYW5kRnVsbFNjcmVlblVJIiwiZnVsbHNjcmVlbk9wdGlvbiIsInNob3dCaWdQbGF5QnV0dG9uIiwic2VyaWFsaXplIiwidmFsIiwibG93ZXJjYXNlVmFsIiwidG9Mb3dlckNhc2UiLCJpc05hTiIsIk51bWJlciIsInBhcnNlRmxvYXQiLCJkZXNlcmlhbGl6ZSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiY29uZmlnIiwidXNlckN1c3R1bVN5c3RlbVRleHQiLCJfIiwiaXNBcnJheSIsImN1cnJlbnRTeXN0ZW1UZXh0IiwiZmluZFdoZXJlIiwiU1lTVEVNX1RFWFQiLCJwdXNoIiwiZmlsdGVyIiwiaXNOdW1iZXIiLCJyYXRlIiwibWFwIiwiTWF0aCIsInJvdW5kIiwiaW5kZXhPZiIsInNvcnQiLCJjb25maWdQbGF5bGlzdCIsIm9iaiIsInBpY2siLCJmZWVkRGF0YSIsImR1cmF0aW9uIiwic3BlYyIsImdldEFkQ2xpZW50Iiwic2V0Q29uZmlnIiwidmFsdWUiLCJnZXRDb250YWluZXIiLCJnZXRRdWFsaXR5TGFiZWwiLCJxdWFsaXR5TGFiZWwiLCJzZXRRdWFsaXR5TGFiZWwiLCJuZXdMYWJlbCIsImlzQ3VycmVudFByb3RvY29sT25seSIsIkNPTlRFTlRfVElNRV9NT0RFX0NIQU5HRUQiLCJnZXRSdG1wQnVmZmVyVGltZSIsImdldFJ0bXBCdWZmZXJUaW1lTWF4IiwiaXNNdXRlIiwiaXNMb29wIiwiaXNDb250cm9scyIsImdldFBsYXliYWNrUmF0ZXMiLCJnZXRMYW5ndWFnZSIsInNldFBsYXlsaXN0IiwiRXZlbnRFbWl0dGVyIiwib2JqZWN0IiwiX2V2ZW50cyIsInRyaWdnZXJFdmVudHMiLCJldmVudHMiLCJhcmdzIiwiY29udGV4dCIsImV2ZW50IiwibGlzdGVuZXIiLCJhcHBseSIsInNsaWNlIiwiY2FsbCIsImFyZ3VtZW50cyIsImFsbEV2ZW50cyIsImFsbCIsIm5hbWVzIiwibCIsInJldGFpbiIsImoiLCJrIiwiX2xpc3RlbmVyIiwib25jZSIsImNvdW50Iiwib25jZUNhbGxiYWNrIiwiTGF6eUNvbW1hbmRFeGVjdXRvciIsImluc3RhbmNlIiwicXVldWVkQ29tbWFuZHMiLCJjb21tYW5kUXVldWUiLCJ1bmRlY29yYXRlZE1ldGhvZHMiLCJleGVjdXRlTW9kZSIsImNvbW1hbmQiLCJtZXRob2QiLCJBcnJheSIsInByb3RvdHlwZSIsImFkZFF1ZXVlIiwiZXhlY3V0ZVF1ZXVlZENvbW1hbmRzIiwic2hpZnQiLCJzZXRFeGVjdXRlTW9kZSIsIm1vZGUiLCJnZXRVbmRlY29yYXRlZE1ldGhvZHMiLCJnZXRRdWV1ZSIsImVtcHR5IiwicmVtb3ZlQW5kRXhjdXRlT25jZSIsImNvbW1hbmRfIiwiY29tbWFuZFF1ZXVlSXRlbSIsInNwbGljZSIsImZpbmRJbmRleCIsIlN1cHBvcnRDaGVja2VyIiwic3VwcG9ydExpc3QiLCJjaGVja1N1cHBvcnQiLCJzb3VyY2UiLCJNaW1lVHlwZXMiLCJhYWMiLCJtcDQiLCJmNHYiLCJtNHYiLCJtb3YiLCJtcDMiLCJtcGVnIiwib2d2Iiwib2dnIiwib2dhIiwidm9yYmlzIiwid2VibSIsImY0YSIsIm0zdTgiLCJtM3UiLCJobHMiLCJ2aWRlbyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNhblBsYXlUeXBlIiwiZmlsZSIsInR5cGUiLCJtaW1lVHlwZSIsIndpbmRvdyIsIk1lZGlhU291cmNlIiwiV2ViS2l0TWVkaWFTb3VyY2UiLCJpc0hsc1N1cHBvcnQiLCJnZXRNZWRpYVNvdXJjZSIsIm1lZGlhU291cmNlIiwic291cmNlQnVmZmVyIiwiU291cmNlQnVmZmVyIiwiV2ViS2l0U291cmNlQnVmZmVyIiwiaXNUeXBlU3VwcG9ydGVkIiwic291cmNlQnVmZmVyVmFsaWRBUEkiLCJhcHBlbmRCdWZmZXIiLCJ0ZXN0Rmxhc2giLCJzdXBwb3J0IiwiQWN0aXZlWE9iamVjdCIsImUiLCJuYXZpZ2F0b3IiLCJtaW1lVHlwZXMiLCJmaW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UiLCJzb3J1Y2VfIiwiZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0IiwicGxheWxpc3RJdGVtIiwic3VwcG9ydE5hbWVzIiwiaXRlbSIsInN1cHBvcnRlZCIsIkxvYWRlciIsImNvbnZlcnRUb1ZUVEN1ZXMiLCJjdWVzIiwiVlRUQ3VlIiwiY3VlIiwic3RhcnQiLCJlbmQiLCJ0ZXh0IiwibGFuZ3VhZ2UiLCJzdWNjZXNzQ2FsbGJhY2siLCJlcnJvckNhbGxiYWNrIiwicmVxdWVzdE9wdGlvbnMiLCJ1cmwiLCJlbmNvZGluZyIsImxvYWRSZXF1ZXN0RG93bmxvZGVyIiwiUmVxdWVzdCIsInJlc3BvbnNlIiwiYm9keSIsInZ0dEN1ZXMiLCJsb2FkVnR0UGFyc2VyIiwicGFyc2VyIiwiV2ViVlRUIiwiUGFyc2VyIiwiU3RyaW5nRGVjb2RlciIsIm9uY3VlIiwib25mbHVzaCIsInBhcnNlIiwibG9hZFNtaVBhcnNlciIsInBhcnNlZERhdGEiLCJTbWlQYXJzZXIiLCJmaXhlZExhbmciLCJyZXF1aXJlIiwiZXJyIiwiaXNTdXBwb3J0Iiwia2luZCIsIk1hbmFnZXIiLCJwbGF5bGlzdEluZGV4IiwiY2FwdGlvbkxpc3QiLCJjdXJyZW50Q2FwdGlvbkluZGV4IiwiY2FwdGlvbkxvYWRlciIsImlzRmlzcnRMb2FkIiwiaXNTaG93aW5nIiwiYmluZFRyYWNrIiwibGFiZWwiLCJpZCIsInRyYWNrc0NvdW50IiwidHJhY2tJZCIsInByZWZpeCIsImRlZmF1bHR0cmFjayIsImNoYW5nZUN1cnJlbnRDYXB0aW9uIiwiQ09OVEVOVF9DQVBUSU9OX0NIQU5HRUQiLCJ0cmFja3MiLCJjYXB0aW9uSWQiLCJQTEFZRVJfQ0FQVElPTl9FUlJPUiIsIkNPTlRFTlRfVElNRSIsIm1ldGEiLCJjdXJyZW50Q3VlcyIsInN0YXJ0VGltZSIsImVuZFRpbWUiLCJDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQiLCJmbHVzaENhcHRpb25MaXN0IiwibGFzdENhcHRpb25JbmRleCIsIl9pbmRleCIsImVycm9ycyIsIl9lbnRyeSIsImVudHJ5IiwiYXJyYXkiLCJzcGxpdCIsImlkeCIsImxpbmUiLCJzdWJzdHIiLCJqb2luIiwiU3J0UGFyc2VyIiwiY2FwdGlvbnMiLCJsaXN0IiwiU1RBVEVfQlVGRkVSSU5HIiwiU1RBVEVfSURMRSIsIlNUQVRFX0NPTVBMRVRFIiwiU1RBVEVfUEFVU0VEIiwiU1RBVEVfUExBWUlORyIsIlNUQVRFX0VSUk9SIiwiU1RBVEVfTE9BRElORyIsIlNUQVRFX1NUQUxMRUQiLCJTVEFURV9BRF9MT0FESU5HIiwiU1RBVEVfQURfTE9BREVEIiwiU1RBVEVfQURfUExBWUlORyIsIlNUQVRFX0FEX1BBVVNFRCIsIlNUQVRFX0FEX0NPTVBMRVRFIiwiU1RBVEVfQURfRVJST1IiLCJQTEFZRVJfQURfQ0xJQ0siLCJQUk9WSURFUl9IVE1MNSIsIlBST1ZJREVSX1dFQlJUQyIsIlBST1ZJREVSX0RBU0giLCJQUk9WSURFUl9ITFMiLCJDT05URU5UX0NPTVBMRVRFIiwiQ09OVEVOVF9TRUVLIiwiQ09OVEVOVF9CVUZGRVJfRlVMTCIsIkRJU1BMQVlfQ0xJQ0siLCJDT05URU5UX0xPQURFRCIsIlBMQVlMSVNUX0NIQU5HRUQiLCJDT05URU5UX1NFRUtFRCIsIk5FVFdPUktfVU5TVEFCTEVEIiwiREFTSF9QUkVQQVJFRCIsIkRBU0hfREVTVFJPWUVEIiwiUExBWUVSX1NUQVRFIiwiUExBWUVSX0NPTVBMRVRFIiwiUExBWUVSX1BBVVNFIiwiUExBWUVSX1BMQVkiLCJQTEFZRVJfQ0xJQ0tFRCIsIlBMQVlFUl9SRVNJWkVEIiwiUExBWUVSX0xPQURJTkciLCJQTEFZRVJfRlVMTFNDUkVFTl9SRVFVRVNUIiwiUExBWUVSX0ZVTExTQ1JFRU5fQ0hBTkdFRCIsIlBMQVlFUl9XQVJOSU5HIiwiQURfQ0hBTkdFRCIsIkFEX1RJTUUiLCJDT05URU5UX0JVRkZFUiIsIkNPTlRFTlRfUkFURV9DSEFOR0UiLCJDT05URU5UX1ZPTFVNRSIsIkNPTlRFTlRfTVVURSIsIkNPTlRFTlRfTUVUQSIsIkNPTlRFTlRfU09VUkNFX0NIQU5HRUQiLCJDT05URU5UX0xFVkVMX0NIQU5HRUQiLCJDT05URU5UX0RVUkFUSU9OX0NIQU5HRUQiLCJQTEFZQkFDS19SQVRFX0NIQU5HRUQiLCJPTUVfUDJQX01PREUiLCJBRF9DTElFTlRfR09PR0xFSU1BIiwiQURfQ0xJRU5UX1ZBU1QiLCJJTklUX1JUTVBfU0VUVVBfRVJST1IiLCJJTklUX0RBU0hfVU5TVVBQT1JUIiwiSU5JVF9BRFNfRVJST1IiLCJJTklUX0RBU0hfTk9URk9VTkQiLCJJTklUX0hMU0pTX05PVEZPVU5EIiwiUExBWUVSX1VOS05XT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9PUEVSQVRJT05fRVJST1IiLCJQTEFZRVJfVU5LTldPTl9ORVRXT1JLX0VSUk9SIiwiUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SIiwiUExBWUVSX0ZJTEVfRVJST1IiLCJQTEFZRVJfQkFEX1JFUVVFU1RfRVJST1IiLCJQTEFZRVJfQVVUSF9GQUlMRURfRVJST1IiLCJQTEFZRVJfTk9UX0FDQ0VQVEFCTEVfRVJST1IiLCJQTEFZRVJfV0VCUlRDX1dTX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19TRVRfUkVNT1RFX0RFU0NfRVJST1IiLCJQTEFZRVJfV0VCUlRDX0NSRUFURV9BTlNXRVJfRVJST1IiLCJQTEFZRVJfV0VCUlRDX05FVFdPUktfU0xPVyIsIlBMQVlFUl9XRUJSVENfVU5FWFBFQ1RFRF9ESVNDT05ORUNUIiwiV0FSTl9NU0dfTVVURURQTEFZIiwiVUlfSUNPTlMiLCJ2b2x1bWVfbXV0ZSIsIm9wX3dhcm5pbmciLCJicm93c2VySW5mbyIsIlNXRlBhdGgiLCJyb290SWQiLCJnZXRBdHRyaWJ1dGUiLCIkY29udGFpbmVyIiwidmlkZW9FbGVtZW50IiwiY3JlYXRlSHRtbFZpZGVvIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kIiwiY3JlYXRlRmxhc2hWaWRlbyIsImJ1ZmZlclRpbWUiLCJidWZmZXJUaW1lTWF4IiwibW92aWUiLCJmbGFzaHZhcnMiLCJhbGxvd3NjcmlwdGFjY2VzcyIsImFsbG93ZnVsbHNjcmVlbiIsIm1lbnUiLCJxdWFsIiwiYmdjb2xvciIsIndtb2RlIiwiYnJvd3Nlck1ham9yVmVyc2lvbiIsImFwcGVuZENoaWxkIiwiY3JlYXRlQWRDb250YWluZXIiLCJhZENvbnRhaW5lciIsInJlbW92ZUNoaWxkIiwiY3VycmVudFBsYXlsaXN0SXRlbSIsImN1cnJlbnRJbmRleCIsInN1cHBvcnRDaGVja2VyIiwibWFrZVByZXR0eVNvdXJjZSIsInNvdXJjZV8iLCJob3N0IiwiYXBwbGljYXRpb24iLCJzdHJlYW0iLCJtaW1ldHlwZVJlZ0V4IiwidGVzdCIsInJlcGxhY2UiLCJsb3dMYXRlbmN5IiwicHJldHRpZWRQbGF5bGlzdCIsInRpdGxlIiwibGV2ZWxzIiwicHJldHR5U291cmNlIiwiZGVmYXVsdFNvdXJjZSIsInRvU3RyaW5nIiwiZXh0cmFjdE9ubHlPbmVQcm90b2NvbCIsImhpZ2hQcmlvcml0eVR5cGUiLCJjb25jYXQiLCJhZFRhZ1VybCIsIkNvbnRyb2xsZXIiLCJzdXBwb3J0Q2hhY2tlciIsInJlZ2lzdGVQcm92aWRlciIsIlByb3ZpZGVyTG9hZGVyIiwiaHRtbDUiLCJFcnJvciIsIndlYnJ0YyIsImRhc2giLCJydG1wIiwic3VwcG9ydGVkUHJvdmlkZXJOYW1lcyIsIlByb21pc2UiLCJyZWplY3QiLCJmaW5kQnlOYW1lIiwiZ2V0UHJvdmlkZXJCeVNvdXJjZSIsInN1cHBvcnRlZFByb3ZpZGVyTmFtZSIsImlzU2FtZVByb3ZpZGVyIiwiY3VycmVudFNvdXJjZSIsIm5ld1NvdXJjZSIsImV4dHJhY3RWaWRlb0VsZW1lbnQiLCJlbGVtZW50T3JNc2UiLCJpc0VsZW1lbnQiLCJnZXRWaWRlb0VsZW1lbnQiLCJtZWRpYSIsInNlcGFyYXRlTGl2ZSIsIm1zZSIsImlzRHluYW1pYyIsImVycm9yVHJpZ2dlciIsInNldFN0YXRlIiwicGlja0N1cnJlbnRTb3VyY2UiLCJfX3dlYnBhY2tfcHVibGljX3BhdGhfXyIsInBsYXllckxpc3QiLCJjaGVja0FuZEdldENvbnRhaW5lckVsZW1lbnQiLCJjb250YWluZXJFbGVtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJub2RlVHlwZSIsImNyZWF0ZSIsInBsYXllckluc3RhbmNlIiwiZ2V0UGxheWVyQnlDb250YWluZXJJZCIsImNvbnRhaW5lcklkIiwiZ2V0UGxheWVyQnlJbmRleCIsInBsYXllcklkIiwiZ2VuZXJhdGVXZWJydGNVcmxzIiwiZGVidWciLCJpc0RlYnVnTW9kZSIsImdldEJyb3dzZXJMYW5ndWFnZSIsIm5hdiIsImJyb3dzZXJMYW5ndWFnZVByb3BlcnR5S2V5cyIsImxhbmd1YWdlcyIsImFuYWxVc2VyQWdlbnQiLCJ1bmtub3duIiwic2NyZWVuU2l6ZSIsInNjcmVlbiIsIndpZHRoIiwiaGVpZ2h0IiwiblZlciIsImFwcFZlcnNpb24iLCJuQWd0IiwidXNlckFnZW50IiwiYXBwTmFtZSIsIm1ham9yVmVyc2lvbiIsInBhcnNlSW50IiwiaXNXZWJ2aWV3IiwibmFtZU9mZnNldCIsInZlck9mZnNldCIsIml4Iiwic3Vic3RyaW5nIiwibGFzdEluZGV4T2YiLCJ0b1VwcGVyQ2FzZSIsIm1vYmlsZSIsImNvb2tpZUVuYWJsZWQiLCJjb29raWUiLCJjbGllbnRTdHJpbmdzIiwicyIsInIiLCJjcyIsIm9zVmVyc2lvbiIsImV4ZWMiLCJicm93c2VyVmVyc2lvbiIsInVhIiwiY29va2llcyIsImF1dG9LZXl3b3JkIiwiZGlyZWN0aW9uU2V0dGluZyIsImFsaWduU2V0dGluZyIsImZpbmREaXJlY3Rpb25TZXR0aW5nIiwiZGlyIiwiZmluZEFsaWduU2V0dGluZyIsImFsaWduIiwiZXh0ZW5kIiwiY29iaiIsInAiLCJpc0lFOCIsImJhc2VPYmoiLCJlbnVtZXJhYmxlIiwiaGFzQmVlblJlc2V0IiwiX2lkIiwiX3BhdXNlT25FeGl0IiwiX3N0YXJ0VGltZSIsIl9lbmRUaW1lIiwiX3RleHQiLCJfcmVnaW9uIiwiX3ZlcnRpY2FsIiwiX3NuYXBUb0xpbmVzIiwiX2xpbmUiLCJfbGluZUFsaWduIiwiX3Bvc2l0aW9uIiwiX3Bvc2l0aW9uQWxpZ24iLCJfc2l6ZSIsIl9hbGlnbiIsImRlZmluZVByb3BlcnR5IiwiZ2V0Iiwic2V0IiwiVHlwZUVycm9yIiwic2V0dGluZyIsIlN5bnRheEVycm9yIiwiZGlzcGxheVN0YXRlIiwiZ2V0Q3VlQXNIVE1MIiwiY29udmVydEN1ZVRvRE9NVHJlZSIsIkxhJCIsInNlbGVjdG9yT3JFbGVtZW50IiwicmV0dXJuTm9kZSIsIiRlbGVtZW50Iiwic2VsZWN0b3IiLCJub2RlTGlzdCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJldmVyeSIsInNob3ciLCJzdHlsZSIsImRpc3BsYXkiLCJoaWRlIiwiYWRkQ2xhc3MiLCJjbGFzc0xpc3QiLCJhZGQiLCJjbGFzc05hbWVzIiwiY2xhc3NOYW1lIiwiYWZ0ZXIiLCJodG1sU3RyaW5nIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiYmVmb3JlIiwiY2hpbGRyZW4iLCJjb250YWlucyIsImVsQ2hpbGQiLCJpbm5lckhUTUwiLCJmaW5kIiwiY3NzIiwiZWxlbWVudCIsInJlbW92ZUNsYXNzIiwiUmVnRXhwIiwicmVtb3ZlQXR0cmlidXRlIiwiYXR0ck5hbWUiLCJ0ZXh0Q29udGVudCIsImh0bWwiLCJoYXNDbGFzcyIsImlzIiwiJHRhcmdldEVsZW1lbnQiLCJvZmZzZXQiLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwidG9wIiwic2Nyb2xsVG9wIiwibGVmdCIsInNjcm9sbExlZnQiLCJjbGllbnRXaWR0aCIsImNsaWVudEhlaWdodCIsImF0dHIiLCJyZXBsYWNlV2l0aCIsInBhcmVudEVsZW1lbnQiLCJoYXNDaGlsZE5vZGVzIiwiZmlyc3RDaGlsZCIsImNsb3Nlc3QiLCJzZWxlY3RvclN0cmluZyIsImVsIiwibWF0Y2hlcyIsInBhcmVudE5vZGUiLCJjbG9zZXN0RWxlbWVudCIsInRyaW0iLCJuYXR1cmFsSG1zIiwiaG1zVG9TZWNvbmQiLCJzdHJpbmciLCJleHRyYWN0RXh0ZW5zaW9uIiwicGF0aCIsImdldEF6dXJlRmlsZUZvcm1hdCIsImV4dGVuc2lvbiIsImF6dXJlZEZvcm1hdCIsInNlY29uZCIsInNlY051bSIsImhvdXJzIiwiZmxvb3IiLCJtaW51dGVzIiwic2Vjb25kcyIsInN0ciIsImZyYW1lUmF0ZSIsImFyciIsImFyckxlbmd0aCIsInNlYyIsInNlY0luZGV4IiwibiIsInNlbGYiLCJnbG9iYWwiLCJvIiwiU3ltYm9sIiwidSIsImMiLCJoYXNPd25Qcm9wZXJ0eSIsInQiLCJhIiwiZiIsImgiLCJfd3JhcHBlZCIsImV4cG9ydHMiLCJtb2R1bGUiLCJWRVJTSU9OIiwidiIsInkiLCJkIiwiaXRlcmF0ZWUiLCJpZGVudGl0eSIsImlzRnVuY3Rpb24iLCJpc09iamVjdCIsIm1hdGNoZXIiLCJwcm9wZXJ0eSIsImciLCJtYXgiLCJtIiwiYiIsIngiLCJwb3ciLCJBIiwidyIsImVhY2giLCJjb2xsZWN0IiwiTyIsInJlZHVjZSIsImZvbGRsIiwiaW5qZWN0IiwicmVkdWNlUmlnaHQiLCJmb2xkciIsImRldGVjdCIsImZpbmRLZXkiLCJzZWxlY3QiLCJuZWdhdGUiLCJzb21lIiwiYW55IiwiaW5jbHVkZXMiLCJpbmNsdWRlIiwidmFsdWVzIiwiaW52b2tlIiwicGx1Y2siLCJ3aGVyZSIsIm1pbiIsInNodWZmbGUiLCJzYW1wbGUiLCJyYW5kb20iLCJjbG9uZSIsInNvcnRCeSIsImNyaXRlcmlhIiwiZ3JvdXBCeSIsImluZGV4QnkiLCJjb3VudEJ5IiwiUyIsInRvQXJyYXkiLCJpc1N0cmluZyIsIm1hdGNoIiwic2l6ZSIsInBhcnRpdGlvbiIsImZpcnN0IiwiaGVhZCIsInRha2UiLCJpbml0aWFsIiwibGFzdCIsInJlc3QiLCJ0YWlsIiwiZHJvcCIsImNvbXBhY3QiLCJCb29sZWFuIiwiTSIsImlzQXJndW1lbnRzIiwiZmxhdHRlbiIsIndpdGhvdXQiLCJkaWZmZXJlbmNlIiwidW5pcSIsInVuaXF1ZSIsImlzQm9vbGVhbiIsInVuaW9uIiwiaW50ZXJzZWN0aW9uIiwidW56aXAiLCJ6aXAiLCJGIiwiZmluZExhc3RJbmRleCIsInNvcnRlZEluZGV4IiwiRSIsInJhbmdlIiwiY2VpbCIsImNodW5rIiwiTiIsImJpbmQiLCJwYXJ0aWFsIiwicGxhY2Vob2xkZXIiLCJiaW5kQWxsIiwibWVtb2l6ZSIsImNhY2hlIiwiZGVsYXkiLCJkZWZlciIsInRocm90dGxlIiwibGVhZGluZyIsIm5vdyIsImNsZWFyVGltZW91dCIsInRyYWlsaW5nIiwiY2FuY2VsIiwiZGVib3VuY2UiLCJ3cmFwIiwiY29tcG9zZSIsInJlc3RBcmd1bWVudHMiLCJJIiwicHJvcGVydHlJc0VudW1lcmFibGUiLCJUIiwiQiIsImNvbnN0cnVjdG9yIiwiYWxsS2V5cyIsIm1hcE9iamVjdCIsInBhaXJzIiwiaW52ZXJ0IiwiZnVuY3Rpb25zIiwibWV0aG9kcyIsIlIiLCJleHRlbmRPd24iLCJhc3NpZ24iLCJxIiwiSyIsInoiLCJvbWl0IiwiU3RyaW5nIiwiZGVmYXVsdHMiLCJ0YXAiLCJpc01hdGNoIiwidmFsdWVPZiIsInBvcCIsImlzRXF1YWwiLCJpc0VtcHR5IiwiRCIsImNoaWxkTm9kZXMiLCJJbnQ4QXJyYXkiLCJpc0Zpbml0ZSIsImlzU3ltYm9sIiwiaXNOdWxsIiwiaXNVbmRlZmluZWQiLCJoYXMiLCJub0NvbmZsaWN0IiwiY29uc3RhbnQiLCJub29wIiwicHJvcGVydHlPZiIsInRpbWVzIiwiRGF0ZSIsImdldFRpbWUiLCJMIiwiUCIsIlciLCJlc2NhcGUiLCJ1bmVzY2FwZSIsIkMiLCJ1bmlxdWVJZCIsInRlbXBsYXRlU2V0dGluZ3MiLCJldmFsdWF0ZSIsImludGVycG9sYXRlIiwiSiIsIlUiLCJWIiwiJCIsInRlbXBsYXRlIiwidmFyaWFibGUiLCJGdW5jdGlvbiIsImNoYWluIiwiX2NoYWluIiwiRyIsIm1peGluIiwidG9KU09OIiwiZGVmaW5lIiwiaXNSdG1wIiwiaXNXZWJSVEMiLCJpc0hscyIsImlzRGFzaCIsImdldFNjcmlwdFBhdGgiLCJzY3JpcHROYW1lIiwic2NyaXB0cyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwic3JjIiwiX19WRVJTSU9OX18iXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7UUFDQTtRQUNBLFFBQVEsb0JBQW9CO1FBQzVCO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOzs7O1FBSUE7UUFDQTtRQUNBLHlDQUF5QyxzNEJBQXM0QjtRQUMvNkI7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFF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Ozs7O0FBSU8sSUFBTThsQix3Q0FBZ0IsU0FBaEJBLGFBQWdCLENBQVNDLFVBQVQsRUFBcUI7QUFDOUMsUUFBTUMsVUFBVW5tQixTQUFTb21CLG9CQUFULENBQThCLFFBQTlCLENBQWhCO0FBQ0EsU0FBSyxJQUFJdDFCLElBQUksQ0FBYixFQUFnQkEsSUFBSXExQixRQUFRcDFCLE1BQTVCLEVBQW9DRCxHQUFwQyxFQUF5QztBQUNyQyxZQUFNdTFCLE1BQU1GLFFBQVFyMUIsQ0FBUixFQUFXdTFCLEdBQXZCO0FBQ0EsWUFBSUEsR0FBSixFQUFTO0FBQ0wsZ0JBQU16MkIsUUFBUXkyQixJQUFJOVQsV0FBSixDQUFnQixNQUFNMlQsVUFBdEIsQ0FBZDtBQUNBLGdCQUFJdDJCLFNBQVMsQ0FBYixFQUFnQjtBQUNaLHVCQUFPeTJCLElBQUloZ0IsTUFBSixDQUFXLENBQVgsRUFBY3pXLFFBQVEsQ0FBdEIsQ0FBUDtBQUNIO0FBQ0o7QUFDSjtBQUNELFdBQU8sRUFBUDtBQUNILENBWk0sQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKUDs7O0FBR08sSUFBTWhCLDRCQUFVMDNCLDZCQUFoQixDIiwiZmlsZSI6Im92ZW5wbGF5ZXIuc2RrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG5cblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0fTtcblxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJvdmVucGxheWVyLnNka1wiOiAwXG4gXHR9O1xuXG5cblxuIFx0Ly8gc2NyaXB0IHBhdGggZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIGpzb25wU2NyaXB0U3JjKGNodW5rSWQpIHtcbiBcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyAoe1wib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1fm92ZW5wbGF5ZX4yZWMxOTNhY1wiOlwib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1fm92ZW5wbGF5ZX4yZWMxOTNhY1wiLFwib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1fm92ZW5wbGF5ZX43YWZkNjhjZlwiOlwib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1fm92ZW5wbGF5ZX43YWZkNjhjZlwiLFwib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1XCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1XCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLldlYlJUQ1Byb3ZpZGVyXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLldlYlJUQ1Byb3ZpZGVyXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLlJ0bXBQcm92aWRlclwiOlwib3ZlbnBsYXllci5wcm92aWRlci5SdG1wUHJvdmlkZXJcIixcInNtaXBhcnNlclwiOlwic21pcGFyc2VyXCIsXCJ2ZW5kb3JzfmRvd25sb2FkZXJcIjpcInZlbmRvcnN+ZG93bmxvYWRlclwiLFwiZG93bmxvYWRlclwiOlwiZG93bmxvYWRlclwiLFwidnR0cGFyc2VyXCI6XCJ2dHRwYXJzZXJcIn1bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuanNcIlxuIFx0fVxuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lID0gZnVuY3Rpb24gcmVxdWlyZUVuc3VyZShjaHVua0lkKSB7XG4gXHRcdHZhciBwcm9taXNlcyA9IFtdO1xuXG5cbiBcdFx0Ly8gSlNPTlAgY2h1bmsgbG9hZGluZyBmb3IgamF2YXNjcmlwdFxuXG4gXHRcdHZhciBpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgeyAvLyAwIG1lYW5zIFwiYWxyZWFkeSBpbnN0YWxsZWRcIi5cblxuIFx0XHRcdC8vIGEgUHJvbWlzZSBtZWFucyBcImN1cnJlbnRseSBsb2FkaW5nXCIuXG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSk7XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdC8vIHNldHVwIFByb21pc2UgaW4gY2h1bmsgY2FjaGVcbiBcdFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IFtyZXNvbHZlLCByZWplY3RdO1xuIFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSA9IHByb21pc2UpO1xuXG4gXHRcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG4gXHRcdFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gXHRcdFx0XHR2YXIgb25TY3JpcHRDb21wbGV0ZTtcblxuIFx0XHRcdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuIFx0XHRcdFx0c2NyaXB0LnRpbWVvdXQgPSAxMjA7XG4gXHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuIFx0XHRcdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzY3JpcHQuc3JjID0ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCk7XG5cbiBcdFx0XHRcdC8vIGNyZWF0ZSBlcnJvciBiZWZvcmUgc3RhY2sgdW53b3VuZCB0byBnZXQgdXNlZnVsIHN0YWNrdHJhY2UgbGF0ZXJcbiBcdFx0XHRcdHZhciBlcnJvciA9IG5ldyBFcnJvcigpO1xuIFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuIFx0XHRcdFx0XHQvLyBhdm9pZCBtZW0gbGVha3MgaW4gSUUuXG4gXHRcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG4gXHRcdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiBcdFx0XHRcdFx0dmFyIGNodW5rID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRcdFx0XHRpZihjaHVuayAhPT0gMCkge1xuIFx0XHRcdFx0XHRcdGlmKGNodW5rKSB7XG4gXHRcdFx0XHRcdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJyA/ICdtaXNzaW5nJyA6IGV2ZW50LnR5cGUpO1xuIFx0XHRcdFx0XHRcdFx0dmFyIHJlYWxTcmMgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLm1lc3NhZ2UgPSAnTG9hZGluZyBjaHVuayAnICsgY2h1bmtJZCArICcgZmFpbGVkLlxcbignICsgZXJyb3JUeXBlICsgJzogJyArIHJlYWxTcmMgKyAnKSc7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5uYW1lID0gJ0NodW5rTG9hZEVycm9yJztcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnR5cGUgPSBlcnJvclR5cGU7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcbiBcdFx0XHRcdFx0XHRcdGNodW5rWzFdKGVycm9yKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gdW5kZWZpbmVkO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9O1xuIFx0XHRcdFx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gXHRcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUoeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pO1xuIFx0XHRcdFx0fSwgMTIwMDAwKTtcbiBcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG9uU2NyaXB0Q29tcGxldGU7XG4gXHRcdFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gXHR9O1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIG9uIGVycm9yIGZ1bmN0aW9uIGZvciBhc3luYyBsb2FkaW5nXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm9lID0gZnVuY3Rpb24oZXJyKSB7IGNvbnNvbGUuZXJyb3IoZXJyKTsgdGhyb3cgZXJyOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2pzL292ZW5wbGF5ZXIuc2RrLmpzXCIpO1xuIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0aWYgKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XG5cdFx0bW9kdWxlLnBhdGhzID0gW107XG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XG5cdFx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xuXHR9XG5cdHJldHVybiBtb2R1bGU7XG59O1xuIiwiaW1wb3J0IENhcHRpb25NYW5hZ2VyIGZyb20gXCJhcGkvY2FwdGlvbi9NYW5hZ2VyXCI7XHJcbmltcG9ydCBDb25maWd1cmF0b3IgZnJvbSBcImFwaS9Db25maWd1cmF0b3JcIjtcclxuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiYXBpL0V2ZW50RW1pdHRlclwiO1xyXG5pbXBvcnQgTGF6eUNvbW1hbmRFeGVjdXRvciBmcm9tIFwiYXBpL0xhenlDb21tYW5kRXhlY3V0b3JcIjtcclxuaW1wb3J0IE1lZGlhTWFuYWdlciBmcm9tIFwiYXBpL21lZGlhL01hbmFnZXJcIjtcclxuaW1wb3J0IFBsYXlsaXN0TWFuYWdlciBmcm9tIFwiYXBpL3BsYXlsaXN0L01hbmFnZXJcIjtcclxuaW1wb3J0IFByb3ZpZGVyQ29udHJvbGxlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL0NvbnRyb2xsZXJcIjtcclxuaW1wb3J0IHtSRUFEWSwgRVJST1JTLCBFUlJPUiwgQ09OVEVOVF9USU1FX01PREVfQ0hBTkdFRCwgSU5JVF9VTktOV09OX0VSUk9SLCBJTklUX1VOU1VQUE9SVF9FUlJPUiwgREVTVFJPWSwgUExBWUVSX1BMQVksIE5FVFdPUktfVU5TVEFCTEVELCBQTEFZRVJfV0VCUlRDX05FVFdPUktfU0xPVywgUExBWUVSX1dFQlJUQ19VTkVYUEVDVEVEX0RJU0NPTk5FQ1QsIFBMQVlFUl9XRUJSVENfU0VUX0xPQ0FMX0RFU0NfRVJST1IsXHJcbiAgICBQTEFZRVJfRklMRV9FUlJPUiwgUFJPVklERVJfREFTSCwgUFJPVklERVJfSExTLCBQUk9WSURFUl9XRUJSVEMsIFBST1ZJREVSX0hUTUw1LCBQUk9WSURFUl9SVE1QLCBBTExfUExBWUxJU1RfRU5ERUR9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcbmltcG9ydCB7dmVyc2lvbn0gZnJvbSAndmVyc2lvbic7XHJcbmltcG9ydCB7QXBpUnRtcEV4cGFuc2lvbn0gZnJvbSAnYXBpL0FwaUV4cGFuc2lvbnMnO1xyXG5pbXBvcnQge2FuYWxVc2VyQWdlbnR9IGZyb20gXCJ1dGlscy9icm93c2VyXCI7XHJcbmltcG9ydCB7cGlja0N1cnJlbnRTb3VyY2V9IGZyb20gXCJhcGkvcHJvdmlkZXIvdXRpbHNcIjtcclxuaW1wb3J0IExBJCBmcm9tICd1dGlscy9saWtlQSQnO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIFRoaXMgb2JqZWN0IGNvbm5lY3RzIFVJIHRvIHRoZSBwcm92aWRlci5cclxuICogQHBhcmFtICAge29iamVjdH0gICAgY29udGFpbmVyICBkb20gZWxlbWVudFxyXG4gKlxyXG4gKiAqL1xyXG5cclxuY29uc3QgQXBpID0gZnVuY3Rpb24oY29udGFpbmVyKXtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIEV2ZW50RW1pdHRlcih0aGF0KTtcclxuXHJcblxyXG4gICAgY29uc29sZS5sb2coXCJbW092ZW5QbGF5ZXJdXSB2LlwiKyB2ZXJzaW9uKTtcclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSBsb2FkZWQuXCIpO1xyXG5cclxuICAgIGxldCBwbGF5bGlzdE1hbmFnZXIgPSBQbGF5bGlzdE1hbmFnZXIodGhhdCk7XHJcbiAgICBsZXQgcHJvdmlkZXJDb250cm9sbGVyID0gUHJvdmlkZXJDb250cm9sbGVyKCk7XHJcbiAgICBsZXQgdXNlckFnZW50T2JqZWN0ID0gYW5hbFVzZXJBZ2VudCgpO1xyXG4gICAgbGV0IG1lZGlhTWFuYWdlciA9IE1lZGlhTWFuYWdlcihjb250YWluZXIsIHVzZXJBZ2VudE9iamVjdCk7XHJcbiAgICBsZXQgY3VycmVudFByb3ZpZGVyID0gXCJcIjtcclxuICAgIGxldCBwbGF5ZXJDb25maWcgPSBcIlwiO1xyXG4gICAgbGV0IGxhenlRdWV1ZSA9IFwiXCI7XHJcbiAgICBsZXQgY2FwdGlvbk1hbmFnZXIgPSBcIlwiO1xyXG5cclxuICAgIGxldCB3ZWJydGNSZXRyeSA9IGZhbHNlO1xyXG4gICAgbGV0IFdFQlJUQ19SRVRSWV9DT1VOVCA9IDM7XHJcbiAgICBsZXQgd2VicnRjUmV0cnlDb3VudCA9IFdFQlJUQ19SRVRSWV9DT1VOVDtcclxuICAgIGxldCB3ZWJydGNSZXRyeUludGVydmFsID0gMTAwMDtcclxuICAgIGxldCB3ZWJydGNSZXRyeVRpbWVyID0gbnVsbDtcclxuXHJcblxyXG4gICAgY29uc3QgcnVuTmV4dFBsYXlsaXN0ID0gZnVuY3Rpb24oaW5kZXgpe1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcInJ1bk5leHRQbGF5bGlzdFwiKTtcclxuICAgICAgICBsZXQgbmV4dFBsYXlsaXN0SW5kZXggPSBpbmRleDsgLy8gfHwgcGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRQbGF5bGlzdEluZGV4KCkgKyAxO1xyXG4gICAgICAgIGxldCBwbGF5bGlzdCA9IHBsYXlsaXN0TWFuYWdlci5nZXRQbGF5bGlzdCgpO1xyXG4gICAgICAgIGxldCBoYXNOZXh0UGxheWxpc3QgPSBwbGF5bGlzdFtuZXh0UGxheWxpc3RJbmRleF0/IHRydWUgOiBmYWxzZTtcclxuICAgICAgICAvL2luaXQgc291cmNlIGluZGV4XHJcbiAgICAgICAgcGxheWVyQ29uZmlnLnNldFNvdXJjZUluZGV4KDApO1xyXG5cclxuICAgICAgICAvL3NldCBHb2xiYWwgVm9sdW1lIGluZm9cclxuICAgICAgICBwbGF5ZXJDb25maWcuc2V0Vm9sdW1lKGN1cnJlbnRQcm92aWRlci5nZXRWb2x1bWUoKSk7XHJcblxyXG4gICAgICAgIGlmKGhhc05leHRQbGF5bGlzdCl7XHJcbiAgICAgICAgICAgIC8vdGhhdC5wYXVzZSgpO1xyXG4gICAgICAgICAgICBsYXp5UXVldWUgPSBMYXp5Q29tbWFuZEV4ZWN1dG9yKHRoYXQsIFsncGxheScsJ3NlZWsnLCdzdG9wJ10pO1xyXG4gICAgICAgICAgICBwbGF5bGlzdE1hbmFnZXIuc2V0Q3VycmVudFBsYXlsaXN0KG5leHRQbGF5bGlzdEluZGV4KTtcclxuICAgICAgICAgICAgaW5pdFByb3ZpZGVyKCk7XHJcblxyXG5cclxuICAgICAgICAgICAgaWYoIXBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpKXtcclxuICAgICAgICAgICAgICAgIC8vQW55d2F5IG5leHRwbGF5bGlzdCBydW5zIGF1dG9TdGFydCEuXHJcbiAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAvL0FsbCBQbGF5bGlzdCBFbmRlZC5cclxuICAgICAgICAgICAgdGhhdC50cmlnZ2VyKEFMTF9QTEFZTElTVF9FTkRFRCwgbnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGNvbnN0IGluaXRQcm92aWRlciA9IGZ1bmN0aW9uKGxhc3RQbGF5UG9zaXRpb24pe1xyXG4gICAgICAgIGNvbnN0IHBpY2tRdWFsaXR5RnJvbVNvdXJjZSA9IChzb3VyY2VzKSA9PntcclxuICAgICAgICAgICAgdmFyIHF1YWxpdHkgPSAwO1xyXG4gICAgICAgICAgICBpZiAoc291cmNlcykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3VyY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZXNbaV0uZGVmYXVsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWFsaXR5ID0gaTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRTb3VyY2VJbmRleCgpID09PSBpICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLyppZiAocGxheWVyQ29uZmlnLmdldFNvdXJjZUxhYmVsKCkgJiYgc291cmNlc1tpXS5sYWJlbCA9PT0gcGxheWVyQ29uZmlnLmdldFNvdXJjZUxhYmVsKCkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0qL1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBxdWFsaXR5O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBwcm92aWRlckNvbnRyb2xsZXIubG9hZFByb3ZpZGVycyhwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFBsYXlMaXN0KCkpLnRoZW4oUHJvdmlkZXJzID0+IHtcclxuXHJcbiAgICAgICAgICAgIGlmKFByb3ZpZGVycy5sZW5ndGggPCAxKXtcclxuICAgICAgICAgICAgICAgIHRocm93IEVSUk9SUy5jb2Rlc1tJTklUX1VOU1VQUE9SVF9FUlJPUl07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKGN1cnJlbnRQcm92aWRlcil7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihjYXB0aW9uTWFuYWdlcil7XHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uTWFuYWdlci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICBjYXB0aW9uTWFuYWdlciA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FwdGlvbk1hbmFnZXIgPSBDYXB0aW9uTWFuYWdlcih0aGF0LCBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFBsYXlsaXN0SW5kZXgoKSk7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGluaXQoKSBjYXB0aW9uc1wiKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50U291cmNlSW5kZXggPSBwaWNrQ3VycmVudFNvdXJjZShwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKSwgcGxheWVyQ29uZmlnKTtcclxuICAgICAgICAgICAgbGV0IHByb3ZpZGVyTmFtZSA9IFByb3ZpZGVyc1tjdXJyZW50U291cmNlSW5kZXhdW1wibmFtZVwiXTtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaW5pdCgpIHByb3ZpZGVyXCIsIHByb3ZpZGVyTmFtZSk7XHJcbiAgICAgICAgICAgIC8vSW5pdCBQcm92aWRlci5cclxuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyID0gIFByb3ZpZGVyc1tjdXJyZW50U291cmNlSW5kZXhdLnByb3ZpZGVyKFxyXG4gICAgICAgICAgICAgICAgbWVkaWFNYW5hZ2VyLmNyZWF0ZU1lZGlhKHByb3ZpZGVyTmFtZSwgcGxheWVyQ29uZmlnKSxcclxuICAgICAgICAgICAgICAgIHBsYXllckNvbmZpZyxcclxuICAgICAgICAgICAgICAgIHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50QWRUYWcoKVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgaWYocHJvdmlkZXJOYW1lID09PSBQUk9WSURFUl9SVE1QKXtcclxuICAgICAgICAgICAgICAgIC8vSWYgcHJvdmlkZXIgdHlwZSBpcyBSVE1QLCB3ZSBhY2NlcHRzIFJ0bXBFeHBhbnNpb24uXHJcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoYXQsIEFwaVJ0bXBFeHBhbnNpb24oY3VycmVudFByb3ZpZGVyKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vVGhpcyBwYXNzZXMgdGhlIGV2ZW50IGNyZWF0ZWQgYnkgdGhlIFByb3ZpZGVyIHRvIEFQSS5cclxuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLm9uKFwiYWxsXCIsIGZ1bmN0aW9uKG5hbWUsIGRhdGEpe1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKCBuYW1lID09PSBFUlJPUikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBDaHJvbWUgPj04MCBvbiBBbmRyb2lkIG1pc3NlcyBoMjQ2IGluIFNEUCB3aGVuIGZpcnN0IHRpbWUgYWZ0ZXIgd2ViIHBhZ2UgbG9hZGVkLlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNvIHdhaXQgdW50aWwgYnJvd3NlciBnZXQgaDI2NCBjYXBhYmlsaXRpZXMgYW5kIGNyZWF0ZSBhbnN3ZXIgU0RQLlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyQWdlbnRPYmplY3Qub3MgPT09ICdBbmRyb2lkJyAmJiB1c2VyQWdlbnRPYmplY3QuYnJvd3NlciA9PT0gJ0Nocm9tZScpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEuY29kZSAmJiBkYXRhLmNvZGUgPT09IFBMQVlFUl9XRUJSVENfU0VUX0xPQ0FMX0RFU0NfRVJST1IpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRDdXJyZW50U291cmNlKHRoYXQuZ2V0Q3VycmVudFNvdXJjZSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHdlYnJ0Y1JldHJ5SW50ZXJ2YWwpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRDb25maWcoKS5hdXRvRmFsbGJhY2sgJiYgcGxheWVyQ29uZmlnLmdldFNvdXJjZUluZGV4KCkgKyAxIDwgdGhhdC5nZXRTb3VyY2VzKCkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcyBzZXF1ZW50aWFsIGhhcyBhdmFpbGFibGUgc291cmNlLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0Q3VycmVudFNvdXJjZShwbGF5ZXJDb25maWcuZ2V0U291cmNlSW5kZXgoKSArIDEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihuYW1lID09PSBcImNvbXBsZXRlXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJ1bk5leHRQbGF5bGlzdChwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFBsYXlsaXN0SW5kZXgoKSArIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihuYW1lLCBkYXRhKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pLnRoZW4oKCk9PntcclxuXHJcbiAgICAgICAgICAgIC8vcHJvdmlkZXIncyBwcmVsb2FkKCkgaGF2ZSB0byBtYWRlIFByb21pc2UuIEN1eiBpdCBvdmVyY29tZXMgJ2ZsYXNoIGxvYWRpbmcgdGltaW5nIHByb2JsZW0nLlxyXG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIucHJlbG9hZChwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKSwgbGFzdFBsYXlQb3NpdGlvbikudGhlbihmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihSRUFEWSk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGF6eVF1ZXVlLmZsdXNoKCk7XHJcbiAgICAgICAgICAgICAgICAvL1RoaXMgaXMgbm8gcmVhc29uIHRvIGV4aXN0IGFueW1vcmUuXHJcbiAgICAgICAgICAgICAgICBsYXp5UXVldWUuZGVzdHJveSgpO1xyXG5cclxuICAgICAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsYXp5UXVldWUub2ZmKCk7XHJcbiAgICAgICAgICAgICAgICBpZihlcnJvciAmJiBlcnJvci5jb2RlICYmIEVSUk9SUy5jb2Rlc1tlcnJvci5jb2RlXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKEVSUk9SLCBFUlJPUlMuY29kZXNbZXJyb3IuY29kZV0pO1xyXG4gICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbSU5JVF9VTktOV09OX0VSUk9SXTtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoRVJST1IsIHRlbXBFcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAvL0lOSVQgRVJST1JcclxuICAgICAgICAgICAgaWYoZXJyb3IgJiYgZXJyb3IuY29kZSAmJiBFUlJPUlMuY29kZXNbZXJyb3IuY29kZV0pe1xyXG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKEVSUk9SLCBFUlJPUlMuY29kZXNbZXJyb3IuY29kZV0pO1xyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW0lOSVRfVU5LTldPTl9FUlJPUl07XHJcbiAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihFUlJPUiwgdGVtcEVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy94eHggOiBJZiB5b3UgaW5pdCBlbXB0eSBzb3VyY2VzLiAoSSB0aGluayB0aGlzIGlzIHN0cmFuZ2UgY2FzZS4pXHJcbiAgICAgICAgICAgIC8vVGhpcyB3b3JrcyBmb3IgdGhpcyBjYXNlLlxyXG4gICAgICAgICAgICAvL3BsYXllciA9IE92ZW5QbGF5ZXIuY3JlYXRlKFwiZWxJZFwiLCB7fSk7XHJcbiAgICAgICAgICAgIC8vcGxheWVyLmxvYWQoc29ydWNlcyk7XHJcbiAgICAgICAgICAgIGxhenlRdWV1ZS5vZmYoKTtcclxuICAgICAgICAgICAgLy9sYXp5UXVldWUucmVtb3ZlQW5kRXhjdXRlT25jZShcImxvYWRcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFQSSDstIjquLDtmZQg7ZWo7IiYXHJcbiAgICAgKiBpbml0XHJcbiAgICAgKiBAcGFyYW0gICAgICB7b2JqZWN0fSBvcHRpb25zIHBsYXllciBpbml0aWFsIG9wdGlvbiB2YWx1ZS5cclxuICAgICAqIEByZXR1cm5zXHJcbiAgICAgKiovXHJcbiAgICB0aGF0LmluaXQgPSAob3B0aW9ucykgPT57XHJcbiAgICAgICAgLy9JdCBjb2xsZWN0cyB0aGUgY29tbWFuZHMgYW5kIGV4ZWN1dGVzIHRoZW0gYXQgdGhlIHRpbWUgd2hlbiB0aGV5IGFyZSBleGVjdXRhYmxlLlxyXG4gICAgICAgIGxhenlRdWV1ZSA9IExhenlDb21tYW5kRXhlY3V0b3IodGhhdCwgW1xyXG4gICAgICAgICAgICAnbG9hZCcsJ3BsYXknLCdwYXVzZScsJ3NlZWsnLCdzdG9wJywgJ2dldER1cmF0aW9uJywgJ2dldFBvc2l0aW9uJywgJ2dldFZvbHVtZSdcclxuICAgICAgICAgICAgLCAnZ2V0TXV0ZScsICdnZXRCdWZmZXInLCAnZ2V0U3RhdGUnICwgJ2dldFF1YWxpdHlMZXZlbHMnXHJcbiAgICAgICAgXSk7XHJcbiAgICAgICAgb3B0aW9ucy5tZWRpYUNvbnRhaW5lciA9IGNvbnRhaW5lcjtcclxuICAgICAgICBvcHRpb25zLmJyb3dzZXIgPSB1c2VyQWdlbnRPYmplY3Q7XHJcbiAgICAgICAgcGxheWVyQ29uZmlnID0gQ29uZmlndXJhdG9yKG9wdGlvbnMsIHRoYXQpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGluaXQoKVwiKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpbml0KCkgY29uZmlnIDogXCIsIHBsYXllckNvbmZpZyk7XHJcblxyXG4gICAgICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkud2VicnRjQ29uZmlnICYmIHBsYXllckNvbmZpZy5nZXRDb25maWcoKS53ZWJydGNDb25maWcubG9hZGluZ1JldHJ5Q291bnQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBXRUJSVENfUkVUUllfQ09VTlQgPSBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkubG9hZGluZ1JldHJ5Q291bnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL05vdCB3b3JraW5nIDogU3ludGF4RXJyb3I6IFwiRVJST1JTLmNvZGVzXCIgaXMgcmVhZC1vbmx5XHJcbiAgICAgICAgRVJST1JTLmNvZGVzID0gcGxheWVyQ29uZmlnLmdldFN5c3RlbVRleHQoKS5hcGkuZXJyb3I7XHJcbiAgICAgICAgLy9Db29sXHJcbiAgICAgICAgLy9FUlJPUlMuY29kZXMucHVzaChwbGF5ZXJDb25maWcuZ2V0U3lzdGVtVGV4dCgpKTtcclxuXHJcbiAgICAgICAgcGxheWxpc3RNYW5hZ2VyLmluaXRQbGF5bGlzdChwbGF5ZXJDb25maWcuZ2V0UGxheWxpc3QoKSwgcGxheWVyQ29uZmlnKTtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpbml0KCkgc291cmNlcyA6IFwiICwgcGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRTb3VyY2VzKCkpO1xyXG5cclxuICAgICAgICBpbml0UHJvdmlkZXIoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFByb3ZpZGVyTmFtZSA9ICgpID0+IHtcclxuICAgICAgICBpZihjdXJyZW50UHJvdmlkZXIpe1xyXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldE5hbWUoKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcbiAgICB0aGF0LmdldE1zZUluc3RhbmNlID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKGN1cnJlbnRQcm92aWRlcil7XHJcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0TXNlKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRDb25maWcgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Q29uZmlnKClcIiwgcGxheWVyQ29uZmlnLmdldENvbmZpZygpKTtcclxuICAgICAgICByZXR1cm4gcGxheWVyQ29uZmlnLmdldENvbmZpZygpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0QnJvd3NlciA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgcmV0dXJuIHBsYXllckNvbmZpZy5nZXRCcm93c2VyKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRUaW1lY29kZU1vZGUgPSAoaXNTaG93KSA9PntcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRUaW1lY29kZU1vZGUoKVwiLCBpc1Nob3cpO1xyXG4gICAgICAgIHBsYXllckNvbmZpZy5zZXRUaW1lY29kZU1vZGUoaXNTaG93KTtcclxuICAgIH07XHJcbiAgICB0aGF0LmlzVGltZWNvZGVNb2RlID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGlzVGltZWNvZGVNb2RlKClcIik7XHJcbiAgICAgICAgcmV0dXJuIHBsYXllckNvbmZpZy5pc1RpbWVjb2RlTW9kZSgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0RnJhbWVyYXRlID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEZyYW1lcmF0ZSgpXCIpO1xyXG5cclxuICAgICAgICBpZiAoY3VycmVudFByb3ZpZGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0RnJhbWVyYXRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcbiAgICB0aGF0LnNlZWtGcmFtZSA9IChmcmFtZUNvdW50KSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNlZWtGcmFtZSgpXCIsIGZyYW1lQ291bnQpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2Vla0ZyYW1lKGZyYW1lQ291bnQpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldER1cmF0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXREdXJhdGlvbigpXCIsIGN1cnJlbnRQcm92aWRlci5nZXREdXJhdGlvbigpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldER1cmF0aW9uKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRQb3NpdGlvbiA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFBvc2l0aW9uKClcIiwgY3VycmVudFByb3ZpZGVyLmdldFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0UG9zaXRpb24oKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFZvbHVtZSA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFZvbHVtZSgpXCIsIGN1cnJlbnRQcm92aWRlci5nZXRWb2x1bWUoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRWb2x1bWUoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFZvbHVtZSA9ICh2b2x1bWUpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldFZvbHVtZSgpIFwiICsgdm9sdW1lKTtcclxuICAgICAgICBjdXJyZW50UHJvdmlkZXIuc2V0Vm9sdW1lKHZvbHVtZSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRNdXRlID0gKHN0YXRlKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRNdXRlKCkgXCIgKyBzdGF0ZSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5zZXRNdXRlKHN0YXRlKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldE11dGUgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRNdXRlKCkgXCIgKyBjdXJyZW50UHJvdmlkZXIuZ2V0TXV0ZSgpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldE11dGUoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmxvYWQgPSAocGxheWxpc3QpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBsb2FkKCkgXCIsIHBsYXlsaXN0KTtcclxuICAgICAgICBsYXp5UXVldWUgPSBMYXp5Q29tbWFuZEV4ZWN1dG9yKHRoYXQsIFsncGxheScsJ3NlZWsnLCdzdG9wJ10pO1xyXG5cclxuICAgICAgICBpZihwbGF5bGlzdCl7XHJcbiAgICAgICAgICAgIGlmKGN1cnJlbnRQcm92aWRlcil7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIuc2V0Q3VycmVudFF1YWxpdHkoMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcGxheWxpc3RNYW5hZ2VyLmluaXRQbGF5bGlzdChwbGF5bGlzdCwgcGxheWVyQ29uZmlnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGluaXRQcm92aWRlcigpO1xyXG5cclxuICAgIH07XHJcbiAgICB0aGF0LnBsYXkgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHBsYXkoKSBcIik7XHJcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnBsYXkoKTtcclxuICAgIH1cclxuICAgIHRoYXQucGF1c2UgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBwYXVzZSgpIFwiKTtcclxuICAgICAgICBjdXJyZW50UHJvdmlkZXIucGF1c2UoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNlZWsgPSAocG9zaXRpb24pID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNlZWsoKSBcIisgcG9zaXRpb24pO1xyXG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5zZWVrKHBvc2l0aW9uKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldFBsYXliYWNrUmF0ZSA9IChwbGF5YmFja1JhdGUpID0+e1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0UGxheWJhY2tSYXRlKCkgXCIsIHBsYXliYWNrUmF0ZSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5zZXRQbGF5YmFja1JhdGUocGxheWVyQ29uZmlnLnNldFBsYXliYWNrUmF0ZShwbGF5YmFja1JhdGUpKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFBsYXliYWNrUmF0ZSA9ICgpID0+e1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0UGxheWJhY2tSYXRlKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRQbGF5YmFja1JhdGUoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRQbGF5YmFja1JhdGUoKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRQbGF5bGlzdCA9ICgpID0+IHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRQbGF5bGlzdCgpIFwiLCBwbGF5bGlzdE1hbmFnZXIuZ2V0UGxheWxpc3QoKSk7XHJcbiAgICAgICAgcmV0dXJuIHBsYXlsaXN0TWFuYWdlci5nZXRQbGF5bGlzdCgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q3VycmVudFBsYXlsaXN0ID0gKCkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEN1cnJlbnRQbGF5bGlzdCgpIFwiLCBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFBsYXlsaXN0SW5kZXgoKSk7XHJcbiAgICAgICAgcmV0dXJuIHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50UGxheWxpc3RJbmRleCgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Q3VycmVudFBsYXlsaXN0ID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Q3VycmVudFBsYXlsaXN0KCkgXCIsIGluZGV4KTtcclxuICAgICAgICBydW5OZXh0UGxheWxpc3QoaW5kZXgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldFNvdXJjZXMgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRTb3VyY2VzKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRTb3VyY2VzKCkpO1xyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0U291cmNlcygpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q3VycmVudFNvdXJjZSA9ICgpID0+e1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Q3VycmVudFNvdXJjZSgpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFNvdXJjZSgpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldEN1cnJlbnRTb3VyY2UoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnNldEN1cnJlbnRTb3VyY2UgPSAoaW5kZXgpID0+e1xyXG5cclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEN1cnJlbnRTb3VyY2UoKSBcIiwgaW5kZXgpO1xyXG5cclxuICAgICAgICAvLyBsZXQgc291cmNlcyA9IGN1cnJlbnRQcm92aWRlci5nZXRTb3VyY2VzKCk7XHJcbiAgICAgICAgLy8gbGV0IGN1cnJlbnRTb3VyY2UgPSBzb3VyY2VzW2N1cnJlbnRQcm92aWRlci5nZXRDdXJyZW50U291cmNlKCldO1xyXG4gICAgICAgIC8vIGxldCBuZXdTb3VyY2UgPSBzb3VyY2VzW2luZGV4XTtcclxuXHJcbiAgICAgICAgLy8gbGV0IGlzU2FtZVByb3ZpZGVyID0gcHJvdmlkZXJDb250cm9sbGVyLmlzU2FtZVByb3ZpZGVyKGN1cnJlbnRTb3VyY2UsIG5ld1NvdXJjZSk7XHJcbiAgICAgICAgLy8gLy8gcHJvdmlkZXIuc2VyQ3VycmVudFF1YWxpdHkgLT4gcGxheWVyQ29uZmlnIHNldHRpbmcgLT4gbG9hZFxyXG4gICAgICAgIC8vIGxldCByZXN1bHRTb3VyY2VJbmRleCA9IGN1cnJlbnRQcm92aWRlci5zZXRDdXJyZW50U291cmNlKGluZGV4LCBpc1NhbWVQcm92aWRlcik7XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBpZighbmV3U291cmNlKXtcclxuICAgICAgICAvLyAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Q3VycmVudFF1YWxpdHkoKSBpc1NhbWVQcm92aWRlclwiLCBpc1NhbWVQcm92aWRlcik7XHJcblxyXG4gICAgICAgIGxldCBsYXN0UGxheVBvc2l0aW9uID0gY3VycmVudFByb3ZpZGVyLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgcGxheWVyQ29uZmlnLnNldFNvdXJjZUluZGV4KGluZGV4KTtcclxuICAgICAgICBsYXp5UXVldWUgPSBMYXp5Q29tbWFuZEV4ZWN1dG9yKHRoYXQsIFsncGxheScsJ3NlZWsnXSk7XHJcblxyXG4gICAgICAgIGluaXRQcm92aWRlcihsYXN0UGxheVBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGluZGV4O1xyXG4gICAgfTtcclxuXHJcblxyXG5cclxuICAgIHRoYXQuZ2V0UXVhbGl0eUxldmVscyA9ICgpID0+e1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0UXVhbGl0eUxldmVscygpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0UXVhbGl0eUxldmVscygpKTtcclxuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldFF1YWxpdHlMZXZlbHMoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEN1cnJlbnRRdWFsaXR5ID0gKCkgPT57XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRDdXJyZW50UXVhbGl0eSgpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFF1YWxpdHkoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRDdXJyZW50UXVhbGl0eSgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Q3VycmVudFF1YWxpdHkgPSAocXVhbGl0eUluZGV4KSA9PntcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEN1cnJlbnRRdWFsaXR5KCkgXCIsIHF1YWxpdHlJbmRleCk7XHJcblxyXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2V0Q3VycmVudFF1YWxpdHkocXVhbGl0eUluZGV4KTtcclxuICAgIH07XHJcbiAgICB0aGF0LmlzQXV0b1F1YWxpdHkgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpc0F1dG9RdWFsaXR5KClcIik7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5pc0F1dG9RdWFsaXR5KCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRBdXRvUXVhbGl0eSA9IChpc0F1dG8pID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEF1dG9RdWFsaXR5KCkgXCIsIGlzQXV0byk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5zZXRBdXRvUXVhbGl0eShpc0F1dG8pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoYXQuZ2V0Q2FwdGlvbkxpc3QgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWNhcHRpb25NYW5hZ2VyKXtyZXR1cm4gbnVsbDt9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Q2FwdGlvbkxpc3QoKSBcIiwgY2FwdGlvbk1hbmFnZXIuZ2V0Q2FwdGlvbkxpc3QoKSk7XHJcbiAgICAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLmdldENhcHRpb25MaXN0KCk7XHJcbiAgICB9XHJcbiAgICB0aGF0LmdldEN1cnJlbnRDYXB0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjYXB0aW9uTWFuYWdlcil7cmV0dXJuIG51bGw7fVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEN1cnJlbnRDYXB0aW9uKCkgXCIsIGNhcHRpb25NYW5hZ2VyLmdldEN1cnJlbnRDYXB0aW9uKCkpO1xyXG4gICAgICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5nZXRDdXJyZW50Q2FwdGlvbigpO1xyXG4gICAgfVxyXG4gICAgdGhhdC5zZXRDdXJyZW50Q2FwdGlvbiA9IChpbmRleCkgPT4ge1xyXG4gICAgICAgIGlmKCFjYXB0aW9uTWFuYWdlcil7cmV0dXJuIG51bGw7fVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEN1cnJlbnRDYXB0aW9uKCkgXCIsIGluZGV4KTtcclxuICAgICAgICBjYXB0aW9uTWFuYWdlci5zZXRDdXJyZW50Q2FwdGlvbihpbmRleCk7XHJcbiAgICB9XHJcbiAgICB0aGF0LmFkZENhcHRpb24gPSAodHJhY2spID0+IHtcclxuICAgICAgICBpZighY2FwdGlvbk1hbmFnZXIpe3JldHVybiBudWxsO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBhZGRDYXB0aW9uKCkgXCIpXHJcbiAgICAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLmFkZENhcHRpb24odHJhY2spO1xyXG4gICAgfVxyXG4gICAgdGhhdC5yZW1vdmVDYXB0aW9uID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgaWYoIWNhcHRpb25NYW5hZ2VyKXtyZXR1cm4gbnVsbDt9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcmVtb3ZlQ2FwdGlvbigpIFwiLCBpbmRleClcclxuICAgICAgICByZXR1cm4gY2FwdGlvbk1hbmFnZXIucmVtb3ZlQ2FwdGlvbihpbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhhdC5nZXRCdWZmZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEJ1ZmZlcigpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0QnVmZmVyKCkpO1xyXG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5nZXRCdWZmZXIoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFN0YXRlID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRTdGF0ZSgpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0U3RhdGUoKSk7XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRTdGF0ZSgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc3RvcCA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHN0b3AoKSBcIik7XHJcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnN0b3AoKTtcclxuICAgIH07XHJcbiAgICB0aGF0LnJlbW92ZSA9ICgpID0+IHtcclxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHJlbW92ZSgpIFwiKTtcclxuICAgICAgICBsYXp5UXVldWUuZGVzdHJveSgpO1xyXG4gICAgICAgIGlmKGNhcHRpb25NYW5hZ2VyKXtcclxuICAgICAgICAgICAgY2FwdGlvbk1hbmFnZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICBjYXB0aW9uTWFuYWdlciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihjdXJyZW50UHJvdmlkZXIpe1xyXG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYobWVkaWFNYW5hZ2VyKXtcclxuICAgICAgICAgICAgbWVkaWFNYW5hZ2VyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgbWVkaWFNYW5hZ2VyID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoYXQudHJpZ2dlcihERVNUUk9ZKTtcclxuICAgICAgICB0aGF0Lm9mZigpO1xyXG5cclxuICAgICAgICBwcm92aWRlckNvbnRyb2xsZXIgPSBudWxsO1xyXG4gICAgICAgIHBsYXlsaXN0TWFuYWdlciA9IG51bGw7XHJcbiAgICAgICAgcGxheWVyQ29uZmlnID0gbnVsbDtcclxuICAgICAgICBsYXp5UXVldWUgPSBudWxsO1xyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiByZW1vdmUoKSAtIGxhenlRdWV1ZSwgY3VycmVudFByb3ZpZGVyLCBwcm92aWRlckNvbnRyb2xsZXIsIHBsYXlsaXN0TWFuYWdlciwgcGxheWVyQ29uZmlnLCBhcGkgZXZlbnQgZGVzdHJvZWQuIFwiKTtcclxuICAgICAgICBPdmVuUGxheWVyU0RLLnJlbW92ZVBsYXllcih0aGF0LmdldENvbnRhaW5lcklkKCkpO1xyXG4gICAgICAgIGlmKE92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyTGlzdCgpLmxlbmd0aCAgPT09IDApe1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJPdmVuUGxheWVyU0RLLnBsYXllckxpc3RcIiwgIE92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyTGlzdCgpKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZ2V0VmVyc2lvbiA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gXCJ2LlwiK3ZlcnNpb247XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcGk7XHJcblxyXG5cclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyNC4uXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNvbnN0IEFwaVJ0bXBFeHBhbnNpb24gPSBmdW5jdGlvbihjdXJyZW50UHJvdmlkZXIpe1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBleHRlcm5hbENhbGxiYWNrQ3JlZXAgOiAocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmKHJlc3VsdC5uYW1lICYmIHJlc3VsdC5kYXRhKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIudHJpZ2dlckV2ZW50RnJvbUV4dGVybmFsKHJlc3VsdC5uYW1lLCByZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG4iLCJpbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIENPTlRFTlRfVElNRV9NT0RFX0NIQU5HRUQsIFNZU1RFTV9URVhUXHJcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBUaGlzIGluaXRpYWxpemVzIHRoZSBpbnB1dCBvcHRpb25zLlxyXG4gKiBAcGFyYW0gICBvcHRpb25zXHJcbiAqXHJcbiAqICovXHJcbmNvbnN0IENvbmZpZ3VyYXRvciA9IGZ1bmN0aW9uKG9wdGlvbnMsIHByb3ZpZGVyKXtcclxuXHJcbiAgICBjb25zdCBjb21wb3NlU291cmNlT3B0aW9ucyA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xyXG4gICAgICAgIGNvbnN0IERlZmF1bHRzID0ge1xyXG4gICAgICAgICAgICBtZWRpYUNvbnRhaW5lciA6IFwiXCIsXHJcbiAgICAgICAgICAgIHBsYXliYWNrUmF0ZXM6IFsyLCAxLjUsIDEsIDAuNSwgMC4yNV0sXHJcbiAgICAgICAgICAgIHBsYXliYWNrUmF0ZTogMSxcclxuICAgICAgICAgICAgbXV0ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHZvbHVtZTogMTAwLFxyXG4gICAgICAgICAgICBsb29wIDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNvbnRyb2xzIDogdHJ1ZSxcclxuICAgICAgICAgICAgYXV0b1N0YXJ0IDogZmFsc2UsXHJcbiAgICAgICAgICAgIGF1dG9GYWxsYmFjazogdHJ1ZSxcclxuICAgICAgICAgICAgdGltZWNvZGUgOiB0cnVlLFxyXG4gICAgICAgICAgICBzb3VyY2VJbmRleCA6IC0xLFxyXG4gICAgICAgICAgICBicm93c2VyIDogXCJcIixcclxuICAgICAgICAgICAgaGlkZVBsYXlsaXN0SWNvbiA6IGZhbHNlLFxyXG4gICAgICAgICAgICBydG1wQnVmZmVyVGltZSA6IDEsXHJcbiAgICAgICAgICAgIHJ0bXBCdWZmZXJUaW1lTWF4IDogMyxcclxuICAgICAgICAgICAgYWRDbGllbnQgOiBcImdvb2dsZWltYVwiLFxyXG4gICAgICAgICAgICBjdXJyZW50UHJvdG9jb2xPbmx5IDogZmFsc2UsXHJcbiAgICAgICAgICAgIHN5c3RlbVRleHQgOiBudWxsLFxyXG4gICAgICAgICAgICBsYW5nIDogXCJlblwiLFxyXG4gICAgICAgICAgICBsb2FkaW5nUmV0cnlDb3VudDogMCxcclxuICAgICAgICAgICAgZXhwYW5kRnVsbFNjcmVlblVJOiBmYWxzZSxcclxuICAgICAgICAgICAgZnVsbHNjcmVlbk9wdGlvbjogbnVsbCxcclxuICAgICAgICAgICAgc2hvd0JpZ1BsYXlCdXR0b246IHRydWVcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHNlcmlhbGl6ZSA9IGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgICAgICAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycgJiYgdmFsLmxlbmd0aCA8IDYpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxvd2VyY2FzZVZhbCA9IHZhbC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvd2VyY2FzZVZhbCA9PT0gJ3RydWUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobG93ZXJjYXNlVmFsID09PSAnZmFsc2UnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFpc05hTihOdW1iZXIodmFsKSkgJiYgIWlzTmFOKHBhcnNlRmxvYXQodmFsKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gTnVtYmVyKHZhbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZGVzZXJpYWxpemUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChrZXkgPT09ICdpZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zW2tleV0gPSBzZXJpYWxpemUob3B0aW9uc1trZXldKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkZXNlcmlhbGl6ZShvcHRpb25zKTtcclxuICAgICAgICBsZXQgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgRGVmYXVsdHMsIG9wdGlvbnMpO1xyXG4gICAgICAgIGxldCB1c2VyQ3VzdHVtU3lzdGVtVGV4dCA9IFtdO1xyXG4gICAgICAgIGlmKGNvbmZpZy5zeXN0ZW1UZXh0KXtcclxuICAgICAgICAgICAgdXNlckN1c3R1bVN5c3RlbVRleHQgPSBfLmlzQXJyYXkoY29uZmlnLnN5c3RlbVRleHQpID8gY29uZmlnLnN5c3RlbVRleHQgOiBbY29uZmlnLnN5c3RlbVRleHRdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHVzZXJDdXN0dW1TeXN0ZW1UZXh0Lmxlbmd0aDsgaSArKyl7XHJcbiAgICAgICAgICAgIGlmKHVzZXJDdXN0dW1TeXN0ZW1UZXh0W2ldLmxhbmcpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRTeXN0ZW1UZXh0ID0gXy5maW5kV2hlcmUoU1lTVEVNX1RFWFQgLCB7XCJsYW5nXCI6IHVzZXJDdXN0dW1TeXN0ZW1UZXh0W2ldLmxhbmd9KTtcclxuICAgICAgICAgICAgICAgIGlmKGN1cnJlbnRTeXN0ZW1UZXh0KXtcclxuICAgICAgICAgICAgICAgICAgICAvL3ZhbGlkYXRlICYgdXBkYXRlXHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihjdXJyZW50U3lzdGVtVGV4dCwgdXNlckN1c3R1bVN5c3RlbVRleHRbaV0pO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jcmVhdGVcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3lzdGVtVGV4dCA9IF8uZmluZFdoZXJlKFNZU1RFTV9URVhUICwge1wibGFuZ1wiOiBcImVuXCJ9KTtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3lzdGVtVGV4dC5sYW5nID0gdXNlckN1c3R1bVN5c3RlbVRleHRbaV0ubGFuZztcclxuICAgICAgICAgICAgICAgICAgICBTWVNURU1fVEVYVC5wdXNoKE9iamVjdC5hc3NpZ24odXNlckN1c3R1bVN5c3RlbVRleHRbaV0sIGN1cnJlbnRTeXN0ZW1UZXh0KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uZmlnLnN5c3RlbVRleHQgPSBfLmZpbmRXaGVyZShTWVNURU1fVEVYVCAsIHtcImxhbmdcIjogY29uZmlnLmxhbmd9KTtcclxuXHJcbiAgICAgICAgbGV0IHBsYXliYWNrUmF0ZXMgPSBjb25maWcucGxheWJhY2tSYXRlcztcclxuXHJcbiAgICAgICAgcGxheWJhY2tSYXRlcyA9IHBsYXliYWNrUmF0ZXMuZmlsdGVyKHJhdGUgPT4gXy5pc051bWJlcihyYXRlKSAmJiByYXRlID49IDAuMjUgJiYgcmF0ZSA8PSA0KS5tYXAocmF0ZSA9PiBNYXRoLnJvdW5kKHJhdGUgKiA0KSAvIDQpO1xyXG5cclxuICAgICAgICBpZiAocGxheWJhY2tSYXRlcy5pbmRleE9mKDEpIDwgMCkge1xyXG4gICAgICAgICAgICBwbGF5YmFja1JhdGVzLnB1c2goMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBsYXliYWNrUmF0ZXMuc29ydCgpO1xyXG5cclxuICAgICAgICBjb25maWcucGxheWJhY2tSYXRlcyA9IHBsYXliYWNrUmF0ZXM7XHJcblxyXG4gICAgICAgIGNvbmZpZy5ydG1wQnVmZmVyVGltZSA9IGNvbmZpZy5ydG1wQnVmZmVyVGltZSA+IDEwID8gMTAgOiBjb25maWcucnRtcEJ1ZmZlclRpbWU7XHJcbiAgICAgICAgY29uZmlnLnJ0bXBCdWZmZXJUaW1lTWF4ID0gY29uZmlnLnJ0bXBCdWZmZXJUaW1lTWF4ID4gNTAgPyA1MCA6IGNvbmZpZy5ydG1wQnVmZmVyVGltZU1heDtcclxuXHJcblxyXG4gICAgICAgIGlmIChjb25maWcucGxheWJhY2tSYXRlcy5pbmRleE9mKGNvbmZpZy5wbGF5YmFja1JhdGUpIDwgMCkge1xyXG4gICAgICAgICAgICBjb25maWcucGxheWJhY2tSYXRlID0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbmZpZ1BsYXlsaXN0ID0gY29uZmlnLnBsYXlsaXN0O1xyXG4gICAgICAgIGlmICghY29uZmlnUGxheWxpc3QpIHtcclxuICAgICAgICAgICAgY29uc3Qgb2JqID0gXy5waWNrKGNvbmZpZywgW1xyXG4gICAgICAgICAgICAgICAgJ3RpdGxlJyxcclxuICAgICAgICAgICAgICAgICdkZXNjcmlwdGlvbicsXHJcbiAgICAgICAgICAgICAgICAndHlwZScsXHJcbiAgICAgICAgICAgICAgICAnaW1hZ2UnLFxyXG4gICAgICAgICAgICAgICAgJ2ZpbGUnLFxyXG4gICAgICAgICAgICAgICAgJ3NvdXJjZXMnLFxyXG4gICAgICAgICAgICAgICAgJ3RyYWNrcycsXHJcbiAgICAgICAgICAgICAgICAnaG9zdCcsXHJcbiAgICAgICAgICAgICAgICAnYXBwbGljYXRpb24nLFxyXG4gICAgICAgICAgICAgICAgJ3N0cmVhbScsXHJcbiAgICAgICAgICAgICAgICAnYWRUYWdVcmwnXHJcbiAgICAgICAgICAgIF0pO1xyXG5cclxuICAgICAgICAgICAgY29uZmlnLnBsYXlsaXN0ID0gWyBvYmogXTtcclxuICAgICAgICB9IGVsc2UgaWYgKF8uaXNBcnJheShjb25maWdQbGF5bGlzdC5wbGF5bGlzdCkpIHtcclxuICAgICAgICAgICAgY29uZmlnLmZlZWREYXRhID0gY29uZmlnUGxheWxpc3Q7XHJcbiAgICAgICAgICAgIGNvbmZpZy5wbGF5bGlzdCA9IGNvbmZpZ1BsYXlsaXN0LnBsYXlsaXN0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGVsZXRlIGNvbmZpZy5kdXJhdGlvbjtcclxuICAgICAgICByZXR1cm4gY29uZmlnO1xyXG4gICAgfTtcclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNvbmZpZ3VyYXRvciBsb2FkZWQuXCIsIG9wdGlvbnMpO1xyXG4gICAgbGV0IHNwZWMgPSBjb21wb3NlU291cmNlT3B0aW9ucyhvcHRpb25zKTtcclxuXHJcbiAgICAvL3NwZWMuaXNGdWxsc2NyZWVuID0gZmFsc2U7IC8vSUUgMTEgY2FuJ3QgY2hlY2sgY3VycmVudCBmdWxsc2NyZWVuIHN0YXRlLlxyXG5cclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIHRoYXQuZ2V0Q29uZmlnID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0QWRDbGllbnQgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuYWRDbGllbnQ7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRDb25maWcgPSAoY29uZmlnLCB2YWx1ZSkgPT4ge1xyXG4gICAgICAgIHNwZWNbY29uZmlnXSA9IHZhbHVlO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldENvbnRhaW5lciA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5tZWRpYUNvbnRhaW5lcjtcclxuICAgIH07XHJcbiAgICAvKnRoYXQuaXNGdWxsc2NyZWVuID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLmlzRnVsbHNjcmVlbjtcclxuICAgIH1cclxuICAgIHRoYXQuc2V0RnVsbHNjcmVlbiA9IChpc0Z1bGxzY3JlZW4pID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5pc0Z1bGxzY3JlZW4gPSBpc0Z1bGxzY3JlZW47XHJcbiAgICB9Ki9cclxuXHJcbiAgICB0aGF0LmdldFBsYXliYWNrUmF0ZSA9KCk9PntcclxuICAgICAgICByZXR1cm4gc3BlYy5wbGF5YmFja1JhdGU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRQbGF5YmFja1JhdGUgPShwbGF5YmFja1JhdGUpPT57XHJcbiAgICAgICAgc3BlYy5wbGF5YmFja1JhdGUgPSBwbGF5YmFja1JhdGU7XHJcbiAgICAgICAgcmV0dXJuIHBsYXliYWNrUmF0ZTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRRdWFsaXR5TGFiZWwgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMucXVhbGl0eUxhYmVsO1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0UXVhbGl0eUxhYmVsID0gKG5ld0xhYmVsKSA9PiB7XHJcbiAgICAgICAgc3BlYy5xdWFsaXR5TGFiZWwgPSBuZXdMYWJlbDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5pc0N1cnJlbnRQcm90b2NvbE9ubHkgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFByb3RvY29sT25seTtcclxuICAgIH07XHJcbiAgICAvKnRoYXQuZ2V0U291cmNlTGFiZWwgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuc291cmNlTGFiZWw7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRTb3VyY2VMYWJlbCA9IChuZXdMYWJlbCkgPT4ge1xyXG4gICAgICAgIHNwZWMuc291cmNlTGFiZWwgPSBuZXdMYWJlbDtcclxuICAgIH07Ki9cclxuXHJcbiAgICB0aGF0LmdldFNvdXJjZUluZGV4ID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLnNvdXJjZUluZGV4O1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0U291cmNlSW5kZXggPSAoaW5kZXgpID0+IHtcclxuICAgICAgICBzcGVjLnNvdXJjZUluZGV4ID0gaW5kZXg7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRUaW1lY29kZU1vZGUgPSAodGltZWNvZGUpID0+IHtcclxuICAgICAgICBpZihzcGVjLnRpbWVjb2RlICE9PSB0aW1lY29kZSl7XHJcbiAgICAgICAgICAgIHNwZWMudGltZWNvZGUgPSB0aW1lY29kZTtcclxuICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1RJTUVfTU9ERV9DSEFOR0VELCB0aW1lY29kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoYXQuaXNUaW1lY29kZU1vZGUgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMudGltZWNvZGU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRSdG1wQnVmZmVyVGltZSA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5ydG1wQnVmZmVyVGltZTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldFJ0bXBCdWZmZXJUaW1lTWF4ID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLnJ0bXBCdWZmZXJUaW1lTWF4O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmlzTXV0ZSA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBzcGVjLm11dGU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRWb2x1bWUgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gc3BlYy52b2x1bWU7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRWb2x1bWUgPSAodm9sdW1lKSA9PntcclxuICAgICAgICBzcGVjLnZvbHVtZSA9IHZvbHVtZTtcclxuICAgIH07XHJcbiAgICB0aGF0LmlzTG9vcCA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBzcGVjLmxvb3A7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5pc0F1dG9TdGFydCA9ICgpID0+e1xyXG4gICAgICAgIHJldHVybiBzcGVjLmF1dG9TdGFydDtcclxuICAgIH07XHJcbiAgICB0aGF0LmlzQ29udHJvbHMgPSAoKSA9PntcclxuICAgICAgICByZXR1cm4gc3BlYy5jb250cm9scztcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRQbGF5YmFja1JhdGVzID0oKT0+e1xyXG4gICAgICAgIHJldHVybiBzcGVjLnBsYXliYWNrUmF0ZXM7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRCcm93c2VyID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLmJyb3dzZXI7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRTeXN0ZW1UZXh0ID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBzcGVjLnN5c3RlbVRleHQ7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRMYW5ndWFnZSA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gc3BlYy5sYW5nO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldFBsYXlsaXN0ID0oKT0+e1xyXG4gICAgICAgIHJldHVybiBzcGVjLnBsYXlsaXN0O1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0UGxheWxpc3QgPShwbGF5bGlzdCk9PntcclxuICAgICAgICBpZihfLmlzQXJyYXkocGxheWxpc3QpKXtcclxuICAgICAgICAgICAgc3BlYy5wbGF5bGlzdCA9IHBsYXlsaXN0O1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBzcGVjLnBsYXlsaXN0ID0gW3BsYXlsaXN0XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNwZWMucGxheWxpc3Q7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29uZmlndXJhdG9yO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDMuLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBUaGlzIG1vZHVsZSBwcm92aWRlIGN1c3RvbSBldmVudHMuXHJcbiAqIEBwYXJhbSAgIG9iamVjdCAgICBBbiBvYmplY3QgdGhhdCByZXF1aXJlcyBjdXN0b20gZXZlbnRzLlxyXG4gKlxyXG4gKiAqL1xyXG5cclxuY29uc3QgRXZlbnRFbWl0dGVyID0gZnVuY3Rpb24ob2JqZWN0KXtcclxuICAgIGxldCB0aGF0ID0gb2JqZWN0O1xyXG4gICAgbGV0IF9ldmVudHMgPVtdO1xyXG5cclxuICAgIGNvbnN0IHRyaWdnZXJFdmVudHMgPSBmdW5jdGlvbihldmVudHMsIGFyZ3MsIGNvbnRleHQpe1xyXG4gICAgICAgIGxldCBpID0gMDtcclxuICAgICAgICBsZXQgbGVuZ3RoID0gZXZlbnRzLmxlbmd0aDtcclxuICAgICAgICBmb3IoaSA9IDA7IGkgPCBsZW5ndGg7IGkgKyspe1xyXG4gICAgICAgICAgICBsZXQgZXZlbnQgPSBldmVudHNbaV07XHJcbiAgICAgICAgICAgIGV2ZW50Lmxpc3RlbmVyLmFwcGx5KCAoIGV2ZW50LmNvbnRleHQgfHwgY29udGV4dCApLCBhcmdzKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQub24gPSBmdW5jdGlvbihuYW1lLCBsaXN0ZW5lciwgY29udGV4dCl7XHJcbiAgICAgICAgKF9ldmVudHNbbmFtZV0gfHwgKF9ldmVudHNbbmFtZV09W10pICkucHVzaCh7IGxpc3RlbmVyOiBsaXN0ZW5lciAgLCBjb250ZXh0IDogY29udGV4dH0pO1xyXG4gICAgICAgIHJldHVybiB0aGF0O1xyXG4gICAgfTtcclxuICAgIHRoYXQudHJpZ2dlciA9IGZ1bmN0aW9uKG5hbWUpe1xyXG4gICAgICAgIGlmKCFfZXZlbnRzKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xyXG4gICAgICAgIGNvbnN0IGV2ZW50cyA9IF9ldmVudHNbbmFtZV07XHJcbiAgICAgICAgY29uc3QgYWxsRXZlbnRzID0gX2V2ZW50cy5hbGw7XHJcblxyXG4gICAgICAgIGlmKGV2ZW50cyl7XHJcbiAgICAgICAgICAgIHRyaWdnZXJFdmVudHMoZXZlbnRzLCBhcmdzLCB0aGF0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoYWxsRXZlbnRzKXtcclxuICAgICAgICAgICAgdHJpZ2dlckV2ZW50cyhhbGxFdmVudHMsIGFyZ3VtZW50cywgdGhhdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoYXQub2ZmID0gZnVuY3Rpb24obmFtZSwgbGlzdGVuZXIsIGNvbnRleHQpe1xyXG4gICAgICAgIGlmKCFfZXZlbnRzKXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFuYW1lICYmICFsaXN0ZW5lciAmJiAhY29udGV4dCkgIHtcclxuICAgICAgICAgICAgX2V2ZW50cyA9IFtdO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhhdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG5hbWVzID0gbmFtZSA/IFtuYW1lXSA6IE9iamVjdC5rZXlzKF9ldmVudHMpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IG5hbWVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICBuYW1lID0gbmFtZXNbaV07XHJcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50cyA9IF9ldmVudHNbbmFtZV07XHJcbiAgICAgICAgICAgIGlmIChldmVudHMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJldGFpbiA9IF9ldmVudHNbbmFtZV0gPSBbXTtcclxuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lciAgfHwgY29udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwLCBrID0gZXZlbnRzLmxlbmd0aDsgaiA8IGs7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBldmVudCA9IGV2ZW50c1tqXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChsaXN0ZW5lciAmJiBsaXN0ZW5lciAhPT0gZXZlbnQubGlzdGVuZXIgJiYgbGlzdGVuZXIgIT09IGV2ZW50Lmxpc3RlbmVyLmxpc3RlbmVyICAmJiBsaXN0ZW5lciAhPT0gZXZlbnQubGlzdGVuZXIuX2xpc3RlbmVyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwoY29udGV4dCAmJiBjb250ZXh0ICE9PSBldmVudC5jb250ZXh0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldGFpbi5wdXNoKGV2ZW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghcmV0YWluLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBfZXZlbnRzW25hbWVdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGF0O1xyXG4gICAgfTtcclxuICAgIHRoYXQub25jZSA9IGZ1bmN0aW9uKG5hbWUsIGxpc3RlbmVyLCBjb250ZXh0KXtcclxuICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgIGNvbnN0IG9uY2VDYWxsYmFjayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoY291bnQrKykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoYXQub2ZmKG5hbWUsIG9uY2VDYWxsYmFjayk7XHJcbiAgICAgICAgICAgIGxpc3RlbmVyLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBvbmNlQ2FsbGJhY2suX2xpc3RlbmVyID0gbGlzdGVuZXI7XHJcbiAgICAgICAgcmV0dXJuIHRoYXQub24obmFtZSwgb25jZUNhbGxiYWNrLCBjb250ZXh0KTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV2ZW50RW1pdHRlcjtcclxuIiwiaW1wb3J0IF8gZnJvbSAndXRpbHMvdW5kZXJzY29yZSc7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgVGhpcyBleGVjdXRlcyB0aGUgaW5wdXQgY29tbWFuZHMgYXQgYSBzcGVjaWZpYyBwb2ludCBpbiB0aW1lLlxyXG4gKiBAcGFyYW0gICBpbnN0YW5jZVxyXG4gKiBAcGFyYW0gICBxdWV1ZWRDb21tYW5kc1xyXG4gKiAqL1xyXG5jb25zdCBMYXp5Q29tbWFuZEV4ZWN1dG9yID0gZnVuY3Rpb24gKGluc3RhbmNlLCBxdWV1ZWRDb21tYW5kcykge1xyXG4gICAgbGV0IGNvbW1hbmRRdWV1ZSA9IFtdO1xyXG4gICAgbGV0IHVuZGVjb3JhdGVkTWV0aG9kcyA9IHt9O1xyXG4gICAgbGV0IGV4ZWN1dGVNb2RlID0gZmFsc2U7XHJcbiAgICBsZXQgdGhhdCA9IHt9O1xyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciBsb2FkZWQuXCIpO1xyXG4gICAgcXVldWVkQ29tbWFuZHMuZm9yRWFjaCgoY29tbWFuZCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IGluc3RhbmNlW2NvbW1hbmRdO1xyXG4gICAgICAgIHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXSA9IG1ldGhvZCB8fCBmdW5jdGlvbigpe307XHJcblxyXG4gICAgICAgIGluc3RhbmNlW2NvbW1hbmRdID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xyXG4gICAgICAgICAgICAgIGlmICghZXhlY3V0ZU1vZGUpIHtcclxuICAgICAgICAgICAgICAgIC8vY29tbWFuZFF1ZXVlLnB1c2goeyBjb21tYW5kLCBhcmdzIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5hZGRRdWV1ZShjb21tYW5kLCBhcmdzKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZXhlY3V0ZVF1ZXVlZENvbW1hbmRzKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWV0aG9kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kLmFwcGx5KHRoYXQsIGFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG4gICAgdmFyIGV4ZWN1dGVRdWV1ZWRDb21tYW5kcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB3aGlsZSAoY29tbWFuZFF1ZXVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgY29uc3QgeyBjb21tYW5kLCBhcmdzIH0gPSBjb21tYW5kUXVldWUuc2hpZnQoKTtcclxuICAgICAgICAgICAgKHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXSB8fCBpbnN0YW5jZVtjb21tYW5kXSkuYXBwbHkoaW5zdGFuY2UsIGFyZ3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGF0LnNldEV4ZWN1dGVNb2RlID0gKG1vZGUpID0+IHtcclxuICAgICAgICBleGVjdXRlTW9kZSA9IG1vZGU7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IHNldEV4ZWN1dGVNb2RlKClcIiwgbW9kZSk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5nZXRVbmRlY29yYXRlZE1ldGhvZHMgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBnZXRVbmRlY29yYXRlZE1ldGhvZHMoKVwiLCB1bmRlY29yYXRlZE1ldGhvZHMpO1xyXG4gICAgICAgIHJldHVybiB1bmRlY29yYXRlZE1ldGhvZHM7XHJcbiAgICB9XHJcbiAgICB0aGF0LmdldFF1ZXVlID0gZnVuY3Rpb24oKXtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZ2V0UXVldWUoKVwiLCBnZXRRdWV1ZSk7XHJcbiAgICAgICAgcmV0dXJuIGNvbW1hbmRRdWV1ZTtcclxuICAgIH1cclxuICAgIHRoYXQuYWRkUXVldWUgPSBmdW5jdGlvbihjb21tYW5kLCBhcmdzKXtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogYWRkUXVldWUoKVwiLCBjb21tYW5kLCBhcmdzKTtcclxuICAgICAgICBjb21tYW5kUXVldWUucHVzaCh7IGNvbW1hbmQsIGFyZ3MgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhhdC5mbHVzaCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGZsdXNoKClcIik7XHJcbiAgICAgICAgZXhlY3V0ZVF1ZXVlZENvbW1hbmRzKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5lbXB0eSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBlbXB0eSgpXCIpO1xyXG4gICAgICAgIGNvbW1hbmRRdWV1ZS5sZW5ndGggPSAwO1xyXG4gICAgfTtcclxuICAgIHRoYXQub2ZmID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IG9mZigpXCIpO1xyXG4gICAgICAgIHF1ZXVlZENvbW1hbmRzLmZvckVhY2goKGNvbW1hbmQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbWV0aG9kID0gdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdO1xyXG4gICAgICAgICAgICBpZiAobWV0aG9kKSB7XHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVtjb21tYW5kXSA9IG1ldGhvZDtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8vUnVuIG9uY2UgYXQgdGhlIGVuZFxyXG4gICAgdGhhdC5yZW1vdmVBbmRFeGN1dGVPbmNlID0gZnVuY3Rpb24oY29tbWFuZF8pe1xyXG4gICAgICAgIGxldCBjb21tYW5kUXVldWVJdGVtID0gXy5maW5kV2hlcmUoY29tbWFuZFF1ZXVlLCB7Y29tbWFuZCA6IGNvbW1hbmRffSk7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IHJlbW92ZUFuZEV4Y3V0ZU9uY2UoKVwiLCBjb21tYW5kXyk7XHJcbiAgICAgICAgY29tbWFuZFF1ZXVlLnNwbGljZShfLmZpbmRJbmRleChjb21tYW5kUXVldWUsIHtjb21tYW5kIDogY29tbWFuZF99KSwgMSk7XHJcblxyXG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kX107XHJcbiAgICAgICAgaWYgKG1ldGhvZCkge1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJyZW1vdmVDb21tYW5kKClcIik7XHJcbiAgICAgICAgICAgIGlmKGNvbW1hbmRRdWV1ZUl0ZW0pe1xyXG4gICAgICAgICAgICAgICAgKG1ldGhvZHx8IGluc3RhbmNlW2NvbW1hbmRfXSkuYXBwbHkoaW5zdGFuY2UsIGNvbW1hbmRRdWV1ZUl0ZW0uYXJncyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaW5zdGFuY2VbY29tbWFuZF9dID0gbWV0aG9kO1xyXG4gICAgICAgICAgICBkZWxldGUgdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRfXTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBkZXN0cm95KClcIik7XHJcbiAgICAgICAgdGhhdC5vZmYoKTtcclxuICAgICAgICB0aGF0LmVtcHR5KCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IExhenlDb21tYW5kRXhlY3V0b3I7IiwiaW1wb3J0IHtpc1J0bXAsIGlzV2ViUlRDLCBpc0Rhc2gsIGlzSGxzfSBmcm9tIFwidXRpbHMvdmFsaWRhdG9yXCI7XHJcbmltcG9ydCB7YW5hbFVzZXJBZ2VudH0gZnJvbSBcInV0aWxzL2Jyb3dzZXJcIjtcclxuLyoqXHJcbiAqIEBicmllZiAgIFRoaXMgZmluZHMgdGhlIHByb3ZpZGVyIHRoYXQgbWF0Y2hlcyB0aGUgaW5wdXQgc291cmNlLlxyXG4gKiBAcGFyYW1cclxuICogKi9cclxuXHJcbmNvbnN0IFN1cHBvcnRDaGVja2VyID0gZnVuY3Rpb24oKXtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlN1cHBvcnRDaGVja2VyIGxvYWRlZC5cIik7XHJcbiAgICBsZXQgdXNlckFnZW50T2JqZWN0ID0gYW5hbFVzZXJBZ2VudCgpO1xyXG5cclxuICAgIGNvbnN0IHN1cHBvcnRMaXN0ID0gW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ2h0bWw1JyxcclxuICAgICAgICAgICAgY2hlY2tTdXBwb3J0OiBmdW5jdGlvbiAoc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBNaW1lVHlwZXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWFjOiAnYXVkaW8vbXA0JyxcclxuICAgICAgICAgICAgICAgICAgICBtcDQ6ICd2aWRlby9tcDQnLFxyXG4gICAgICAgICAgICAgICAgICAgIGY0djogJ3ZpZGVvL21wNCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbTR2OiAndmlkZW8vbXA0JyxcclxuICAgICAgICAgICAgICAgICAgICBtb3Y6ICd2aWRlby9tcDQnLFxyXG4gICAgICAgICAgICAgICAgICAgIG1wMzogJ2F1ZGlvL21wZWcnLFxyXG4gICAgICAgICAgICAgICAgICAgIG1wZWc6ICdhdWRpby9tcGVnJyxcclxuICAgICAgICAgICAgICAgICAgICBvZ3Y6ICd2aWRlby9vZ2cnLFxyXG4gICAgICAgICAgICAgICAgICAgIG9nZzogJ3ZpZGVvL29nZycsXHJcbiAgICAgICAgICAgICAgICAgICAgb2dhOiAndmlkZW8vb2dnJyxcclxuICAgICAgICAgICAgICAgICAgICB2b3JiaXM6ICd2aWRlby9vZ2cnLFxyXG4gICAgICAgICAgICAgICAgICAgIHdlYm06ICd2aWRlby93ZWJtJyxcclxuICAgICAgICAgICAgICAgICAgICBmNGE6ICd2aWRlby9hYWMnLFxyXG4gICAgICAgICAgICAgICAgICAgIG0zdTg6ICdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbTN1OiAnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnLFxyXG4gICAgICAgICAgICAgICAgICAgIGhsczogJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJ1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCB2aWRlbyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJylcclxuICAgICAgICAgICAgICAgIH0oKTtcclxuICAgICAgICAgICAgICAgIGlmICghdmlkZW8uY2FuUGxheVR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZighdHlwZSl7cmV0dXJuIGZhbHNlO31cclxuICAgICAgICAgICAgICAgIGNvbnN0IG1pbWVUeXBlID0gc291cmNlLm1pbWVUeXBlIHx8IE1pbWVUeXBlc1t0eXBlXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihpc0hscyhmaWxlLCB0eXBlKSAmJiB1c2VyQWdlbnRPYmplY3QuYnJvd3NlciA9PT0gXCJNaWNyb3NvZnQgRWRnZVwiICl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9FZGdlIHN1cHBvcnRzIGhscyBuYXRpdmUgYnV0IHRoYXQncyBzdWNrcy5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGlzUnRtcChmaWxlLCB0eXBlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZihpc1dlYlJUQyhmaWxlLCB0eXBlKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghbWltZVR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICEhdmlkZW8uY2FuUGxheVR5cGUobWltZVR5cGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICd3ZWJydGMnLFxyXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZpZGVvID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKVxyXG4gICAgICAgICAgICAgICAgfSgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF2aWRlby5jYW5QbGF5VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpc1J0bXAoZmlsZSwgdHlwZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IHNvdXJjZS5maWxlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNvdXJjZS50eXBlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGlzV2ViUlRDKGZpbGUsIHR5cGUpKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAnZGFzaCcsXHJcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IHNvdXJjZS5maWxlO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcclxuICAgICAgICAgICAgICAgIGlmIChpc1J0bXAoZmlsZSwgdHlwZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAoIHdpbmRvdy5NZWRpYVNvdXJjZSB8fCB3aW5kb3cuV2ViS2l0TWVkaWFTb3VyY2UgKSA9PT0gXCJmdW5jdGlvblwiICYmIGlzRGFzaChmaWxlLCB0eXBlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdobHMnLFxyXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZpZGVvID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKVxyXG4gICAgICAgICAgICAgICAgfSgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IHNvdXJjZS5maWxlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNvdXJjZS50eXBlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzUnRtcChmaWxlLCB0eXBlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL3RoaXMgbWV0aG9kIGZyb20gaGxzLmpzXHJcbiAgICAgICAgICAgICAgICBjb25zdCBpc0hsc1N1cHBvcnQgPSAoKSA9PntcclxuICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gZ2V0TWVkaWFTb3VyY2UoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5NZWRpYVNvdXJjZSB8fCB3aW5kb3cuV2ViS2l0TWVkaWFTb3VyY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1lZGlhU291cmNlID0gZ2V0TWVkaWFTb3VyY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc291cmNlQnVmZmVyID0gd2luZG93LlNvdXJjZUJ1ZmZlciB8fCB3aW5kb3cuV2ViS2l0U291cmNlQnVmZmVyO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpc1R5cGVTdXBwb3J0ZWQgPSBtZWRpYVNvdXJjZSAmJiB0eXBlb2YgbWVkaWFTb3VyY2UuaXNUeXBlU3VwcG9ydGVkID09PSAnZnVuY3Rpb24nICYmIG1lZGlhU291cmNlLmlzVHlwZVN1cHBvcnRlZCgndmlkZW8vbXA0OyBjb2RlY3M9XCJhdmMxLjQyRTAxRSxtcDRhLjQwLjJcIicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBTb3VyY2VCdWZmZXIgaXMgZXhwb3NlZCBlbnN1cmUgaXRzIEFQSSBpcyB2YWxpZFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNhZmFyaSBhbmQgb2xkIHZlcnNpb24gb2YgQ2hyb21lIGRvZSBub3QgZXhwb3NlIFNvdXJjZUJ1ZmZlciBnbG9iYWxseSBzbyBjaGVja2luZyBTb3VyY2VCdWZmZXIucHJvdG90eXBlIGlzIGltcG9zc2libGVcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc291cmNlQnVmZmVyVmFsaWRBUEkgPSAhc291cmNlQnVmZmVyIHx8IHNvdXJjZUJ1ZmZlci5wcm90b3R5cGUgJiYgdHlwZW9mIHNvdXJjZUJ1ZmZlci5wcm90b3R5cGUuYXBwZW5kQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBzb3VyY2VCdWZmZXIucHJvdG90eXBlLnJlbW92ZSA9PT0gJ2Z1bmN0aW9uJztcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gISFpc1R5cGVTdXBwb3J0ZWQgJiYgISFzb3VyY2VCdWZmZXJWYWxpZEFQSTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAvL1JlbW92ZSB0aGlzICchIXZpZGVvLmNhblBsYXlUeXBlKCdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcpJyBpZiB5b3Ugd2FudCB0byB1c2UgaGxzanMuXHJcbiAgICAgICAgICAgICAgICAvL1llcyBJIG5lZWQgaGxzanMuIDIwMTktMDYtMTIgJiYgISF2aWRlby5jYW5QbGF5VHlwZSgnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpc0hsc1N1cHBvcnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiAncnRtcCcsXHJcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IHNvdXJjZS5maWxlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNvdXJjZS50eXBlO1xyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gdGVzdEZsYXNoKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VwcG9ydCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL0lFIG9ubHlcclxuICAgICAgICAgICAgICAgICAgICBpZihcIkFjdGl2ZVhPYmplY3RcIiBpbiB3aW5kb3cpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1cHBvcnQgPSAhIShuZXcgQWN0aXZlWE9iamVjdChcIlNob2Nrd2F2ZUZsYXNoLlNob2Nrd2F2ZUZsYXNoXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWNhdGNoKGUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VwcG9ydCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1czQywgYmV0dGVyIHN1cHBvcnQgaW4gbGVnYWN5IGJyb3dzZXJcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VwcG9ydCA9ICEhbmF2aWdhdG9yLm1pbWVUeXBlc1snYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2gnXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3VwcG9ydDtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBjaGVja1N1cHBvcnQoKXtcclxuICAgICAgICAgICAgICAgICAgICBpZih1c2VyQWdlbnRPYmplY3QuYnJvd3NlciA9PT0gXCJNaWNyb3NvZnQgRWRnZVwiIHx8IHVzZXJBZ2VudE9iamVjdC5vcyA9PT0gXCJBbmRyb2lkXCIgfHwgdXNlckFnZW50T2JqZWN0Lm9zID09PSBcImlPU1wiICB8fCB1c2VyQWdlbnRPYmplY3QuYnJvd3NlciA9PT0gXCJTYWZhcmlcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGlzUnRtcChmaWxlLCB0eXBlKSAmJiB0ZXN0Rmxhc2goKSAmJiBjaGVja1N1cHBvcnQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgXTtcclxuXHJcbiAgICB0aGF0LmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZSA9IChzb3J1Y2VfKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU3VwcG9ydENoZWNrZXIgOiBmaW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UoKVwiLCBzb3J1Y2VfKTtcclxuICAgICAgICBjb25zdCBzb3VyY2UgPSAoc29ydWNlXyA9PT0gT2JqZWN0KHNvcnVjZV8pKSA/IHNvcnVjZV8gOiB7fTtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgc3VwcG9ydExpc3QubGVuZ3RoOyBpICsrKXtcclxuICAgICAgICAgICAgaWYoc3VwcG9ydExpc3RbaV0uY2hlY2tTdXBwb3J0KHNvdXJjZSkpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1cHBvcnRMaXN0W2ldLm5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhhdC5maW5kUHJvdmlkZXJOYW1lc0J5UGxheWxpc3QgPSAocGxheWxpc3RJdGVtKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU3VwcG9ydENoZWNrZXIgOiBmaW5kUHJvdmlkZXJOYW1lc0J5UGxheWxpc3QoKVwiLCBwbGF5bGlzdEl0ZW0pO1xyXG4gICAgICAgIGxldCBzdXBwb3J0TmFtZXMgPSBbXTtcclxuICAgICAgICAvKmZvciAobGV0IGkgPSBwbGF5bGlzdF8ubGVuZ3RoOyBpLS07KSB7XHJcblxyXG5cclxuICAgICAgICB9Ki9cclxuICAgICAgICBjb25zdCBpdGVtID0gcGxheWxpc3RJdGVtO1xyXG5cclxuICAgICAgICBpZihpdGVtICYmIGl0ZW0uc291cmNlcyl7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBpdGVtLnNvdXJjZXMubGVuZ3RoOyBqICsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBzb3VyY2UgPSBpdGVtLnNvdXJjZXNbal07XHJcbiAgICAgICAgICAgICAgICBpZiAoc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3VwcG9ydGVkID0gdGhhdC5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2Uoc291cmNlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3VwcG9ydGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1cHBvcnROYW1lcy5wdXNoKHN1cHBvcnRlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc3VwcG9ydE5hbWVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTdXBwb3J0Q2hlY2tlcjtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiA0Li5cclxuICovXHJcbmltcG9ydCBTcnRQYXJzZXIgZnJvbSBcImFwaS9jYXB0aW9uL3BhcnNlci9TcnRQYXJzZXJcIjtcclxuaW1wb3J0IFZUVEN1ZSBmcm9tIFwidXRpbHMvY2FwdGlvbnMvdnR0Q3VlXCI7XHJcbi8vaW1wb3J0IFJlcXVlc3QgZnJvbSBcInV0aWxzL2Rvd25sb2FkZXJcIjtcclxuXHJcbmNvbnN0IExvYWRlciA9IGZ1bmN0aW9uKCl7XHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcblxyXG4gICAgY29uc3QgY29udmVydFRvVlRUQ3VlcyA9IGZ1bmN0aW9uIChjdWVzKSB7XHJcbiAgICAgICAgcmV0dXJuIGN1ZXMubWFwKGN1ZSA9PiBuZXcgVlRUQ3VlKGN1ZS5zdGFydCwgY3VlLmVuZCwgY3VlLnRleHQpKTtcclxuICAgIH1cclxuICAgIC8vbGFuZ3VhZ2UgOiBmb3IgU01JIGZvcm1hdC5cclxuICAgIHRoYXQubG9hZCA9ICh0cmFjaywgbGFuZ3VhZ2UsIHN1Y2Nlc3NDYWxsYmFjaywgZXJyb3JDYWxsYmFjaykgPT4ge1xyXG5cclxuICAgICAgICB2YXIgcmVxdWVzdE9wdGlvbnMgID0ge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIHVybCA6IHRyYWNrLmZpbGUsXHJcbiAgICAgICAgICAgIGVuY29kaW5nOiBudWxsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbG9hZFJlcXVlc3REb3dubG9kZXIoKS50aGVuKFJlcXVlc3QgPT4ge1xyXG4gICAgICAgICAgICBSZXF1ZXN0KHJlcXVlc3RPcHRpb25zLCBmdW5jdGlvbihlcnJvciwgcmVzcG9uc2UsIGJvZHkpIHtcclxuICAgICAgICAgICAgICAgIGlmKGVycm9yKXtcclxuICAgICAgICAgICAgICAgICAgICBlcnJvckNhbGxiYWNrKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjdWVzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZ0dEN1ZXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJvZHkuaW5kZXhPZignV0VCVlRUJykgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJXRUJWVFQgTE9BREVEXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkVnR0UGFyc2VyKCkudGhlbihXZWJWVFQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBhcnNlciA9IG5ldyBXZWJWVFQuUGFyc2VyKHdpbmRvdywgV2ViVlRULlN0cmluZ0RlY29kZXIoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2dHRDdWVzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZXIub25jdWUgPSBmdW5jdGlvbihjdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2dHRDdWVzLnB1c2goY3VlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZXIub25mbHVzaCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVsZXRlIHRyYWNrLnhocjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzQ2FsbGJhY2sodnR0Q3Vlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUGFyc2UgY2FsbHMgb25mbHVzaCBpbnRlcm5hbGx5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZXIucGFyc2UoYm9keSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVsZXRlIHRyYWNrLnhocjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yQ2FsbGJhY2soZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihib2R5LmluZGV4T2YoJ1NBTUknKSA+PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU0FNSSBMT0FERURcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRTbWlQYXJzZXIoKS50aGVuKFNtaVBhcnNlciA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGFyc2VkRGF0YSA9IFNtaVBhcnNlcihib2R5LCB7Zml4ZWRMYW5nIDogbGFuZ3VhZ2V9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZ0dEN1ZXMgPSBjb252ZXJ0VG9WVFRDdWVzKHBhcnNlZERhdGEucmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NDYWxsYmFjayh2dHRDdWVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWxldGUgdHJhY2sueGhyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JDYWxsYmFjayhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlNSVCBMT0FERURcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ZXMgPSBTcnRQYXJzZXIoYm9keSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZ0dEN1ZXMgPSBjb252ZXJ0VG9WVFRDdWVzKGN1ZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzQ2FsbGJhY2sodnR0Q3Vlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAvL2RlbGV0ZSB0cmFjay54aHI7XHJcbiAgICAgICAgICAgIGVycm9yQ2FsbGJhY2soZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuZnVuY3Rpb24gbG9hZFJlcXVlc3REb3dubG9kZXIoKXtcclxuICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ3V0aWxzL2Rvd25sb2FkZXInXSwgZnVuY3Rpb24gKHJlcXVpcmUpIHtcclxuICAgICAgICByZXR1cm4gcmVxdWlyZSgndXRpbHMvZG93bmxvYWRlcicpLmRlZmF1bHQ7XHJcbiAgICB9LCBmdW5jdGlvbihlcnIpe2NvbnNvbGUubG9nKGVycik7fSwgJ2Rvd25sb2FkZXInKTtcclxufTtcclxuZnVuY3Rpb24gbG9hZFZ0dFBhcnNlcigpIHtcclxuICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9jYXB0aW9uL3BhcnNlci9WdHRQYXJzZXInXSwgZnVuY3Rpb24gKHJlcXVpcmUpIHtcclxuICAgICAgICByZXR1cm4gcmVxdWlyZSgnYXBpL2NhcHRpb24vcGFyc2VyL1Z0dFBhcnNlcicpLmRlZmF1bHQ7XHJcbiAgICB9LCBmdW5jdGlvbihlcnIpe2NvbnNvbGUubG9nKGVycik7fSwgJ3Z0dHBhcnNlcicpO1xyXG59XHJcbmZ1bmN0aW9uIGxvYWRTbWlQYXJzZXIoKSB7XHJcbiAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvY2FwdGlvbi9wYXJzZXIvU21pUGFyc2VyJ10sIGZ1bmN0aW9uIChyZXF1aXJlKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlcXVpcmUoJ2FwaS9jYXB0aW9uL3BhcnNlci9TbWlQYXJzZXInKS5kZWZhdWx0O1xyXG4gICAgfSwgZnVuY3Rpb24oZXJyKXtjb25zb2xlLmxvZyhlcnIpO30sICdzbWlwYXJzZXInKTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBMb2FkZXI7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNS4gMTcuLlxyXG4gKi9cclxuaW1wb3J0IENhcHRpb25Mb2FkZXIgZnJvbSAnYXBpL2NhcHRpb24vTG9hZGVyJztcclxuaW1wb3J0IHtSRUFEWSwgRVJST1JTLCBFUlJPUiwgUExBWUVSX0NBUFRJT05fRVJST1IsIENPTlRFTlRfTUVUQSwgQ09OVEVOVF9USU1FLCBDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQsIENPTlRFTlRfQ0FQVElPTl9DSEFOR0VEfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xyXG5cclxuY29uc3QgaXNTdXBwb3J0ID0gZnVuY3Rpb24oa2luZCl7XHJcbiAgICByZXR1cm4ga2luZCA9PT0gJ3N1YnRpdGxlcycgfHwga2luZCA9PT0gJ2NhcHRpb25zJztcclxufTtcclxuXHJcbmNvbnN0IE1hbmFnZXIgPSBmdW5jdGlvbihhcGksIHBsYXlsaXN0SW5kZXgpe1xyXG5cclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIGxldCBjYXB0aW9uTGlzdCA9IFtdO1xyXG4gICAgbGV0IGN1cnJlbnRDYXB0aW9uSW5kZXggPSAtMTtcclxuXHJcbiAgICBsZXQgY2FwdGlvbkxvYWRlciA9IENhcHRpb25Mb2FkZXIoKTtcclxuICAgIGxldCBpc0Zpc3J0TG9hZCA9IHRydWU7XHJcbiAgICBsZXQgaXNTaG93aW5nID0gZmFsc2U7XHJcblxyXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ2FwdGlvbiBNYW5hZ2VyID4+IFwiLCBwbGF5bGlzdEluZGV4KTtcclxuXHJcblxyXG4gICAgbGV0IGJpbmRUcmFjayA9IGZ1bmN0aW9uKHRyYWNrLCB2dHRDdWVzKXtcclxuICAgICAgICB0cmFjay5kYXRhID0gdnR0Q3VlcyB8fCBbXTtcclxuICAgICAgICB0cmFjay5uYW1lID0gdHJhY2subGFiZWwgfHwgdHJhY2submFtZSB8fCB0cmFjay5sYW5ndWFnZTtcclxuICAgICAgICB0cmFjay5pZCA9IChmdW5jdGlvbih0cmFjaywgdHJhY2tzQ291bnQpIHtcclxuICAgICAgICAgICAgdmFyIHRyYWNrSWQ7XHJcbiAgICAgICAgICAgIHZhciBwcmVmaXggPSB0cmFjay5raW5kIHx8ICdjYyc7XHJcbiAgICAgICAgICAgIGlmICh0cmFjay5kZWZhdWx0IHx8IHRyYWNrLmRlZmF1bHR0cmFjaykge1xyXG4gICAgICAgICAgICAgICAgdHJhY2tJZCA9ICdkZWZhdWx0JztcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0cmFja0lkID0gdHJhY2suaWQgfHwgKHByZWZpeCArIHRyYWNrc0NvdW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihpc0Zpc3J0TG9hZCl7XHJcbiAgICAgICAgICAgICAgICAvL1RoaXMgZXhlY3V0ZSBvbmx5IG9uLiBhbmQgdGhlbiB1c2UgZmx1c2hDYXB0aW9uTGlzdChsYXN0Q2FwdGlvbkluZGV4KTtcclxuICAgICAgICAgICAgICAgIGNoYW5nZUN1cnJlbnRDYXB0aW9uKGNhcHRpb25MaXN0Lmxlbmd0aHx8MCk7XHJcbiAgICAgICAgICAgICAgICBpc0Zpc3J0TG9hZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJhY2tJZDtcclxuICAgICAgICB9KSh0cmFjaywgY2FwdGlvbkxpc3QubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgY2FwdGlvbkxpc3QucHVzaCh0cmFjayk7XHJcbiAgICAgICAgcmV0dXJuIHRyYWNrLmlkO1xyXG4gICAgfTtcclxuICAgIGxldCBjaGFuZ2VDdXJyZW50Q2FwdGlvbiA9IGZ1bmN0aW9uKGluZGV4KXtcclxuICAgICAgICBjdXJyZW50Q2FwdGlvbkluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgYXBpLnRyaWdnZXIoQ09OVEVOVF9DQVBUSU9OX0NIQU5HRUQsIGN1cnJlbnRDYXB0aW9uSW5kZXgpO1xyXG4gICAgfTtcclxuICAgIGlmKGFwaS5nZXRDb25maWcoKS5wbGF5bGlzdCAmJiBhcGkuZ2V0Q29uZmlnKCkucGxheWxpc3QubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgbGV0IHBsYXlsaXN0ID0gYXBpLmdldENvbmZpZygpLnBsYXlsaXN0W3BsYXlsaXN0SW5kZXhdO1xyXG5cclxuICAgICAgICBpZihwbGF5bGlzdCAmJiBwbGF5bGlzdC50cmFja3MgJiYgcGxheWxpc3QudHJhY2tzLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcGxheWxpc3QudHJhY2tzLmxlbmd0aDsgaSArKyl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0cmFjayA9IHBsYXlsaXN0LnRyYWNrc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihpc1N1cHBvcnQodHJhY2sua2luZCkgJiYgISBfLmZpbmRXaGVyZSh0cmFjaywge2ZpbGUgOiB0cmFjay5maWxlfSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC5mbHVzaENhcHRpb25MaXN0KGN1cnJlbnRDYXB0aW9uSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcHRpb25Mb2FkZXIubG9hZCh0cmFjaywgdHJhY2subGFuZywgZnVuY3Rpb24odnR0Q3Vlcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHZ0dEN1ZXMgJiYgdnR0Q3Vlcy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjYXB0aW9uSWQgPSBiaW5kVHJhY2sodHJhY2ssIHZ0dEN1ZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9DQVBUSU9OX0VSUk9SXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwaS50cmlnZ2VyKEVSUk9SLCB0ZW1wRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhcGkub24oQ09OVEVOVF9USU1FLCBmdW5jdGlvbihtZXRhKXtcclxuICAgICAgICBsZXQgcG9zaXRpb24gPSBtZXRhLnBvc2l0aW9uO1xyXG4gICAgICAgIGlmKGN1cnJlbnRDYXB0aW9uSW5kZXggPiAtMSAmJiBjYXB0aW9uTGlzdFtjdXJyZW50Q2FwdGlvbkluZGV4XSl7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50Q3VlcyA9IF8uZmlsdGVyKGNhcHRpb25MaXN0W2N1cnJlbnRDYXB0aW9uSW5kZXhdLmRhdGEsIGZ1bmN0aW9uIChjdWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwb3NpdGlvbiA+PSAoY3VlLnN0YXJ0VGltZSkgJiYgKCAoIWN1ZS5lbmRUaW1lIHx8IHBvc2l0aW9uKSA8PSBjdWUuZW5kVGltZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZihjdXJyZW50Q3VlcyAmJiBjdXJyZW50Q3Vlcy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgIGFwaS50cmlnZ2VyKENPTlRFTlRfQ0FQVElPTl9DVUVfQ0hBTkdFRCwgY3VycmVudEN1ZXNbMF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG4gICAgdGhhdC5mbHVzaENhcHRpb25MaXN0ID0gKGxhc3RDYXB0aW9uSW5kZXgpID0+e1xyXG4gICAgICAgIGNhcHRpb25MaXN0ID0gW107XHJcbiAgICAgICAgY2hhbmdlQ3VycmVudENhcHRpb24obGFzdENhcHRpb25JbmRleCk7XHJcbiAgICAgICAgLy9jdXJyZW50Q2FwdGlvbkluZGV4ID0gbGFzdENhcHRpb25JbmRleDtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldENhcHRpb25MaXN0ID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIGNhcHRpb25MaXN0fHxbXTtcclxuICAgIH07XHJcbiAgICB0aGF0LmdldEN1cnJlbnRDYXB0aW9uID0gKCkgPT57XHJcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRDYXB0aW9uSW5kZXg7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5zZXRDdXJyZW50Q2FwdGlvbiA9IChfaW5kZXgpID0+e1xyXG4gICAgICAgIGlmKF9pbmRleCA+IC0yICYmIF9pbmRleCA8IGNhcHRpb25MaXN0Lmxlbmd0aCl7XHJcbiAgICAgICAgICAgIGNoYW5nZUN1cnJlbnRDYXB0aW9uKF9pbmRleCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aGF0LmFkZENhcHRpb24gPSAodHJhY2spID0+e1xyXG4gICAgICAgIGlmKGlzU3VwcG9ydCh0cmFjay5raW5kKSAmJiAhIF8uZmluZFdoZXJlKGNhcHRpb25Mb2FkZXIsIHtmaWxlIDogdHJhY2suZmlsZX0pKXtcclxuICAgICAgICAgICAgY2FwdGlvbkxvYWRlci5sb2FkKHRyYWNrLCBmdW5jdGlvbih2dHRDdWVzKXtcclxuICAgICAgICAgICAgICAgIGlmKHZ0dEN1ZXMgJiYgdnR0Q3Vlcy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICBiaW5kVHJhY2sodHJhY2ssIHZ0dEN1ZXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gZXJyb3JzW1BMQVlFUl9DQVBUSU9OX0VSUk9SXTtcclxuICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgYXBpLnRyaWdnZXIoRVJST1IsIHRlbXBFcnJvcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aGF0LnJlbW92ZUNhcHRpb24gPSAoaW5kZXgpID0+IHtcclxuICAgICAgICBpZihpbmRleCA+IC0xICYmIGluZGV4IDwgY2FwdGlvbkxpc3QubGVuZ3RoKXtcclxuICAgICAgICAgICAgY2FwdGlvbkxpc3Quc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNhcHRpb25MaXN0O1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT4ge1xyXG4gICAgICAgIGNhcHRpb25MaXN0ID0gW107XHJcbiAgICAgICAgY2FwdGlvbkxvYWRlciA9IG51bGw7XHJcbiAgICAgICAgYXBpLm9mZihDT05URU5UX1RJTUUsIG51bGwsIHRoYXQpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1hbmFnZXI7XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNS4gMjkuLlxyXG4gKi9cclxuaW1wb3J0IHsgaG1zVG9TZWNvbmQsIHRyaW0gfSBmcm9tIFwidXRpbHMvc3RyaW5nc1wiXHJcblxyXG5mdW5jdGlvbiBfZW50cnkoZGF0YSkge1xyXG4gICAgdmFyIGVudHJ5ID0ge307XHJcbiAgICB2YXIgYXJyYXkgPSBkYXRhLnNwbGl0KCdcXHJcXG4nKTtcclxuICAgIGlmIChhcnJheS5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICBhcnJheSA9IGRhdGEuc3BsaXQoJ1xcbicpO1xyXG4gICAgfVxyXG4gICAgdmFyIGlkeCA9IDE7XHJcbiAgICBpZiAoYXJyYXlbMF0uaW5kZXhPZignIC0tPiAnKSA+IDApIHtcclxuICAgICAgICBpZHggPSAwO1xyXG4gICAgfVxyXG4gICAgaWYgKGFycmF5Lmxlbmd0aCA+IGlkeCArIDEgJiYgYXJyYXlbaWR4ICsgMV0pIHtcclxuICAgICAgICAvLyBUaGlzIGxpbmUgY29udGFpbnMgdGhlIHN0YXJ0IGFuZCBlbmQuXHJcbiAgICAgICAgdmFyIGxpbmUgPSBhcnJheVtpZHhdO1xyXG4gICAgICAgIHZhciBpbmRleCA9IGxpbmUuaW5kZXhPZignIC0tPiAnKTtcclxuICAgICAgICBpZiAoaW5kZXggPiAwKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LnN0YXJ0ID0gaG1zVG9TZWNvbmQobGluZS5zdWJzdHIoMCwgaW5kZXgpKTtcclxuICAgICAgICAgICAgZW50cnkuZW5kID0gaG1zVG9TZWNvbmQobGluZS5zdWJzdHIoaW5kZXggKyA1KSk7XHJcbiAgICAgICAgICAgIGVudHJ5LnRleHQgPSBhcnJheS5zbGljZShpZHggKyAxKS5qb2luKCdcXHJcXG4nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZW50cnk7XHJcblxyXG59XHJcblxyXG5jb25zdCBTcnRQYXJzZXIgPSBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICB2YXIgY2FwdGlvbnMgPSBbXTtcclxuXHJcbiAgICBkYXRhID0gdHJpbShkYXRhKTtcclxuXHJcbiAgICB2YXIgbGlzdCA9IGRhdGEuc3BsaXQoJ1xcclxcblxcclxcbicpO1xyXG4gICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgbGlzdCA9IGRhdGEuc3BsaXQoJ1xcblxcbicpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGxpc3RbaV0gPT09ICdXRUJWVFQnKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZW50cnkgPSBfZW50cnkobGlzdFtpXSk7XHJcbiAgICAgICAgaWYgKGVudHJ5LnRleHQpIHtcclxuICAgICAgICAgICAgY2FwdGlvbnMucHVzaChlbnRyeSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjYXB0aW9ucztcclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBTcnRQYXJzZXI7IiwiLy8gU1RBVEVcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0JVRkZFUklORyA9IFwiYnVmZmVyaW5nXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9JRExFID0gXCJpZGxlXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9DT01QTEVURSA9IFwiY29tcGxldGVcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX1BBVVNFRCA9IFwicGF1c2VkXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9QTEFZSU5HID0gXCJwbGF5aW5nXCI7XHJcbmV4cG9ydCBjb25zdCBTVEFURV9FUlJPUiA9IFwiZXJyb3JcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0xPQURJTkcgPSBcImxvYWRpbmdcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX1NUQUxMRUQgPSBcInN0YWxsZWRcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBTVEFURV9BRF9MT0FESU5HID0gXCJhZExvYWRpbmdcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0FEX0xPQURFRCA9IFwiYWRMb2FkZWRcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0FEX1BMQVlJTkcgPSBcImFkUGxheWluZ1wiO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfQURfUEFVU0VEID0gXCJhZFBhdXNlZFwiO1xyXG5leHBvcnQgY29uc3QgU1RBVEVfQURfQ09NUExFVEUgPSBcImFkQ29tcGxldGVcIjtcclxuZXhwb3J0IGNvbnN0IFNUQVRFX0FEX0VSUk9SID0gXCJhZEVycm9yXCI7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfQURfQ0xJQ0sgPSBcImFkY2xpY2tcIjtcclxuXHJcbi8vIFBST1ZJREVSXHJcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9IVE1MNSA9IFwiaHRtbDVcIjtcclxuZXhwb3J0IGNvbnN0IFBST1ZJREVSX1dFQlJUQyA9IFwid2VicnRjXCI7XHJcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9EQVNIID0gXCJkYXNoXCI7XHJcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9ITFMgPSBcImhsc1wiO1xyXG5leHBvcnQgY29uc3QgUFJPVklERVJfUlRNUCA9IFwicnRtcFwiO1xyXG5cclxuLy8gRVZFTlRTXHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0NPTVBMRVRFID0gU1RBVEVfQ09NUExFVEU7XHJcbmV4cG9ydCBjb25zdCBSRUFEWSA9IFwicmVhZHlcIjtcclxuZXhwb3J0IGNvbnN0IERFU1RST1kgPSBcImRlc3Ryb3lcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfU0VFSyA9IFwic2Vla1wiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9CVUZGRVJfRlVMTCA9IFwiYnVmZmVyRnVsbFwiO1xyXG5leHBvcnQgY29uc3QgRElTUExBWV9DTElDSyA9IFwiZGlzcGxheUNsaWNrXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0xPQURFRCA9IFwibG9hZGVkXCI7XHJcbmV4cG9ydCBjb25zdCBQTEFZTElTVF9DSEFOR0VEID0gXCJwbGF5bGlzdENoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfU0VFS0VEID0gXCJzZWVrZWRcIjtcclxuZXhwb3J0IGNvbnN0IEFMTF9QTEFZTElTVF9FTkRFRCA9IFwiYWxsUGxheWxpc3RFbmRlZFwiO1xyXG5leHBvcnQgY29uc3QgTkVUV09SS19VTlNUQUJMRUQgPSBcInVuc3RhYmxlTmV0d29ya1wiO1xyXG5leHBvcnQgY29uc3QgREFTSF9QUkVQQVJFRCA9IFwiZGFzaFByZXBhcmVkXCI7XHJcbmV4cG9ydCBjb25zdCBEQVNIX0RFU1RST1lFRCA9IFwiZGFzaERlc3Ryb3llZFwiO1xyXG5cclxuXHJcblxyXG5leHBvcnQgY29uc3QgRVJST1IgPSBcImVycm9yXCI7XHJcblxyXG4vLyBTVEFURSBPRiBQTEFZRVJcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9TVEFURSA9IFwic3RhdGVDaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfQ09NUExFVEUgPSBTVEFURV9DT01QTEVURTtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9QQVVTRSA9IFwicGF1c2VcIjtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9QTEFZID0gXCJwbGF5XCI7XHJcblxyXG5leHBvcnQgY29uc3QgUExBWUVSX0NMSUNLRUQgPSBcImNsaWNrZWRcIjtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9SRVNJWkVEID0gXCJyZXNpemVkXCI7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfTE9BRElORyA9IFwibG9hZGluZ1wiO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX0ZVTExTQ1JFRU5fUkVRVUVTVCA9IFwiZnVsbHNjcmVlblJlcXVlc3RlZFwiO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX0ZVTExTQ1JFRU5fQ0hBTkdFRCA9IFwiZnVsbHNjcmVlbkNoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9XQVJOSU5HID0gXCJ3YXJuaW5nXCI7XHJcblxyXG5leHBvcnQgY29uc3QgQURfQ0hBTkdFRCA9IFwiYWRDaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBBRF9USU1FID0gXCJhZFRpbWVcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfQlVGRkVSID0gXCJidWZmZXJDaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX1RJTUUgPSBcInRpbWVcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfUkFURV9DSEFOR0UgPSBcInJhdGVjaGFuZ2VcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfVk9MVU1FID0gXCJ2b2x1bWVDaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX01VVEUgPSBcIm11dGVcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfTUVUQSA9IFwibWV0YUNoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfU09VUkNFX0NIQU5HRUQgPSBcInNvdXJjZUNoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfTEVWRUxfQ0hBTkdFRCA9IFwicXVhbGl0eUxldmVsQ2hhbmdlZFwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9EVVJBVElPTl9DSEFOR0VEID0gXCJkdXJhdGlvbkNoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IFBMQVlCQUNLX1JBVEVfQ0hBTkdFRCA9IFwicGxheWJhY2tSYXRlQ2hhbmdlZFwiO1xyXG5leHBvcnQgY29uc3QgQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VEID0gXCJjdWVDaGFuZ2VkXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URU5UX0NBUFRJT05fQ0hBTkdFRCA9IFwiY2FwdGlvbkNoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IENPTlRFTlRfVElNRV9NT0RFX0NIQU5HRUQgPSBcInRpbWVEaXNwbGF5TW9kZUNoYW5nZWRcIjtcclxuZXhwb3J0IGNvbnN0IE9NRV9QMlBfTU9ERSA9IFwicDJwTW9kZVwiO1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBBRF9DTElFTlRfR09PR0xFSU1BID0gXCJnb29nbGVpbWFcIjtcclxuZXhwb3J0IGNvbnN0IEFEX0NMSUVOVF9WQVNUID0gXCJ2YXN0XCI7XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IElOSVRfVU5LTldPTl9FUlJPUiA9IDEwMDtcclxuZXhwb3J0IGNvbnN0IElOSVRfVU5TVVBQT1JUX0VSUk9SID0gMTAxO1xyXG5leHBvcnQgY29uc3QgSU5JVF9SVE1QX1NFVFVQX0VSUk9SID0gMTAyO1xyXG5leHBvcnQgY29uc3QgSU5JVF9EQVNIX1VOU1VQUE9SVCA9IDEwMztcclxuZXhwb3J0IGNvbnN0IElOSVRfQURTX0VSUk9SID0gMTA0O1xyXG5leHBvcnQgY29uc3QgSU5JVF9EQVNIX05PVEZPVU5EID0gMTA1O1xyXG5leHBvcnQgY29uc3QgSU5JVF9ITFNKU19OT1RGT1VORCA9IDEwNjtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX0VSUk9SID0gMzAwO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SID0gMzAxO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fTkVUV09SS19FUlJPUiA9IDMwMjtcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUiA9IDMwMztcclxuZXhwb3J0IGNvbnN0IFBMQVlFUl9GSUxFX0VSUk9SID0gMzA0O1xyXG5leHBvcnQgY29uc3QgUExBWUVSX0NBUFRJT05fRVJST1IgPSAzMDU7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfQkFEX1JFUVVFU1RfRVJST1IgPSAzMDY7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfQVVUSF9GQUlMRURfRVJST1IgPSAzMDc7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfTk9UX0FDQ0VQVEFCTEVfRVJST1IgPSAzMDg7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1dTX0VSUk9SID0gNTAxO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SID0gNTAyO1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19TRVRfUkVNT1RFX0RFU0NfRVJST1IgPSA1MDM7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX0NSRUFURV9BTlNXRVJfRVJST1IgPSA1MDQ7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SID0gNTA1O1xyXG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19ORVRXT1JLX1NMT1cgPSA1MTA7XHJcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1VORVhQRUNURURfRElTQ09OTkVDVCA9IDUxMTtcclxuXHJcbmV4cG9ydCBjb25zdCBXQVJOX01TR19NVVRFRFBMQVkgPSBcIlBsZWFzZSB0b3VjaCBoZXJlIHRvIHR1cm4gb24gdGhlIHNvdW5kLlwiO1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBVSV9JQ09OUyA9IHtcclxuICAgIHZvbHVtZV9tdXRlIDogXCJ2b2x1bWUtbXV0ZVwiLFxyXG4gICAgb3Bfd2FybmluZyA6IFwib3Atd2FybmluZ1wiXHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IEVSUk9SUyA9IHtjb2RlcyA6IFwiXCJ9O1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBTWVNURU1fVEVYVCA9IFtcclxuICAgIHtcclxuICAgICAgICBcImxhbmdcIiA6IFwiZW5cIixcclxuICAgICAgICBcInVpXCIgOiB7XHJcbiAgICAgICAgICAgIFwiY29udGV4dFwiIDogXCJBYm91dCBPdmVuUGxheWVyXCIsXHJcbiAgICAgICAgICAgIFwiY29udHJvbHNcIiA6IHtcclxuICAgICAgICAgICAgICAgIFwibGl2ZVwiIDogXCJMaXZlIFN0cmVhbWluZ1wiLFxyXG4gICAgICAgICAgICAgICAgXCJsb3dfbGF0ZW5jeV9saXZlXCIgOiBcIlN1Yi1TZWNvbmQgTGF0ZW5jeSBTdHJlYW1pbmdcIixcclxuICAgICAgICAgICAgICAgIFwibG93X2xhdGVuY3lfcDJwXCIgOiBcIlN1Yi1TZWNvbmQgTGF0ZW5jeSBQMlBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwbGF5bGlzdFwiIDogXCJQbGF5bGlzdFwiLFxyXG4gICAgICAgICAgICBcInNldHRpbmdcIiA6IHtcclxuICAgICAgICAgICAgICAgIFwidGl0bGVcIiA6IFwiU2V0dGluZ3NcIixcclxuICAgICAgICAgICAgICAgIFwic3BlZWRcIiA6IFwiU3BlZWRcIixcclxuICAgICAgICAgICAgICAgIFwic3BlZWRVbml0XCIgOiBcInhcIixcclxuICAgICAgICAgICAgICAgIFwic291cmNlXCIgOiBcIlNvdXJjZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJxdWFsaXR5XCIgOiBcIlF1YWxpdHlcIixcclxuICAgICAgICAgICAgICAgIFwiY2FwdGlvblwiIDogXCJDYXB0aW9uXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc3BsYXlcIiA6IFwiRGlzcGxheVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiYXBpXCIgOiB7XHJcbiAgICAgICAgICAgIFwibWVzc2FnZVwiIDoge1xyXG4gICAgICAgICAgICAgICAgXCJtdXRlZF9wbGF5XCIgOiBcIlBsZWFzZSB0b3VjaCBoZXJlIHRvIHR1cm4gb24gdGhlIHNvdW5kLlwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZXJyb3JcIjoge1xyXG4gICAgICAgICAgICAgICAgMTAwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJDYW4gbm90IGxvYWQgZHVlIHRvIHVua25vd24gcmVhc29ucy5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIkNhbiBub3QgbG9hZCBkdWUgdG8gdW5rbm93biByZWFzb25zLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMTAxOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDEwMSxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJDYW4gbm90IGxvYWQgZHVlIHRvIHBsYXlhYmxlIG1lZGlhIG5vdCBmb3VuZC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIkNhbiBub3QgbG9hZCBkdWUgdG8gcGxheWFibGUgbWVkaWEgbm90IGZvdW5kLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMTAyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDEwMixcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJGbGFzaCBmZXRjaGluZyBwcm9jZXNzIGFib3J0ZWQuIDwvYnI+PGEgaHJlZj0naHR0cDovL3d3dy5hZG9iZS5jb20vZ28vZ2V0Zmxhc2hwbGF5ZXInIHRhcmdldD0nX3NlbGYnPjxpbWcgc3JjPSdodHRwOi8vd3d3LmFkb2JlLmNvbS9pbWFnZXMvc2hhcmVkL2Rvd25sb2FkX2J1dHRvbnMvZ2V0X2ZsYXNoX3BsYXllci5naWYnIGFsdD0nR2V0IEFkb2JlIEZsYXNoIHBsYXllcic+PC9hPlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiSXQgbG9va3MgbGlrZSBub3QgZm91bmQgc3dmIG9yIHlvdXIgZW52aXJvbm1lbnQgaXMgbG9jYWxob3N0LlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMTAzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDEwMyxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJDYW4gbm90IGxvYWQgZHVlIHRvIGRhc2hqcy4gUGxlYXNlIGNoZWNrIHRoZSBsYXN0ZXN0IHZlcnNpb24uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJkYXNoLmpzIHZlcnNpb24gaXMgb2xkLiBQbGVhc2UgY2hlY2sgdGhlIGxhc3Rlc3QuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAxMDQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMTA0LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNhbiBub3QgbG9hZCBkdWUgdG8gZ29vZ2xlIGltYSBmb3IgQWRzLiBcIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIlBsZWFzZSBjaGVjayB0aGUgZ29vZ2xlIGltYSBsaWJyYXJ5LlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMTA1OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDEwNSxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJDYW4gbm90IGZpbmQgdGhlIGRhc2hqcy4gUGxlYXNlIGNoZWNrIHRoZSBkYXNoanMuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJOb3QgZm91bmQgZGFzaGpzLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMTA2OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDEwNixcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJDYW4gbm90IGZpbmQgdGhlIGhsc2pzLiBQbGVhc2UgY2hlY2sgdGhlIGhsc2pzLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiTm90IGZvdW5kIGhsc2pzLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMzAwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwMCxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJDYW4gbm90IHBsYXkgZHVlIHRvIHVua25vd24gcmVhc29ucy5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIkNhbiBub3QgcGxheSBkdWUgdG8gdW5rbm93biByZWFzb25zLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMzAxOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwMSxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJGZXRjaGluZyBwcm9jZXNzIGFib3J0ZWQgYnkgdXNlci5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIkZldGNoaW5nIHByb2Nlc3MgYWJvcnRlZCBieSB1c2VyLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMzAyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwMixcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJTb21lIG9mIHRoZSBtZWRpYSBjb3VsZCBub3QgYmUgZG93bmxvYWRlZCBkdWUgdG8gYSBuZXR3b3JrIGVycm9yLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiRXJyb3Igb2NjdXJyZWQgd2hlbiBkb3dubG9hZGluZy5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDMwMzoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDMsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiVW5hYmxlIHRvIGxvYWQgbWVkaWEuIFRoaXMgbWF5IGJlIGR1ZSB0byBhIHNlcnZlciBvciBuZXR3b3JrIGVycm9yLCBvciBkdWUgdG8gYW4gdW5zdXBwb3J0ZWQgZm9ybWF0LlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiRXJyb3Igb2NjdXJyZWQgd2hlbiBkZWNvZGluZy5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDMwNDoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDQsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiTWVkaWEgcGxheWJhY2sgaGFzIGJlZW4gY2FuY2VsZWQuIEl0IGxvb2tzIGxpa2UgeW91ciBtZWRpYSBpcyBjb3JydXB0ZWQgb3IgeW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdGhlIGZlYXR1cmVzIHlvdXIgbWVkaWEgdXNlcy5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIk1lZGlhIHBsYXliYWNrIG5vdCBzdXBwb3J0ZWQuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAzMDU6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMzA1LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNhbiBub3QgbG9hZCBjYXB0aW9ucyBkdWUgdG8gdW5rbm93biByZWFzb25zLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiQ2FuIG5vdCBsb2FkIGNhcHRpb25zIGR1ZSB0byB1bmtub3duIHJlYXNvbnMuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAzMDY6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMzA2LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIlVuYWJsZSB0byBsb2FkIG1lZGlhLiBUaGlzIG1heSBiZSBkdWUgdG8gYSBzZXJ2ZXIgb3IgbmV0d29yayBlcnJvciwgb3IgZHVlIHRvIGFuIHVuc3VwcG9ydGVkIGZvcm1hdC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIlRoZSBzZXJ2ZXIgY2Fubm90IG9yIHdpbGwgbm90IHByb2Nlc3MgdGhlIHJlcXVlc3QuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAzMDc6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMzA3LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIlVuYWJsZSB0byBsb2FkIG1lZGlhLiBUaGlzIG1heSBiZSBkdWUgdG8gYSBzZXJ2ZXIgb3IgbmV0d29yayBlcnJvciwgb3IgZHVlIHRvIGFuIHVuc3VwcG9ydGVkIGZvcm1hdC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIlRoZSBzZXJ2ZXIgcmVmdXNlZCB0aGUgcmVxdWVzdC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDMwODoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDgsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiVW5hYmxlIHRvIGxvYWQgbWVkaWEuIFRoaXMgbWF5IGJlIGR1ZSB0byBhIHNlcnZlciBvciBuZXR3b3JrIGVycm9yLCBvciBkdWUgdG8gYW4gdW5zdXBwb3J0ZWQgZm9ybWF0LlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiVGhlIHNlcnZlciBkbyBub3QgYWNjZXB0IHRoZSByZXF1ZXN0LlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNTAxOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDUwMSxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJDb25uZWN0aW9uIHdpdGggbG93LWxhdGVuY3koT01FKSBzZXJ2ZXIgZmFpbGVkLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiV2ViU29ja2V0IGNvbm5lY3Rpb24gZmFpbGVkLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNTAyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDUwMixcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJDb25uZWN0aW9uIHdpdGggbG93LWxhdGVuY3koT01FKSBzZXJ2ZXIgZmFpbGVkLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiV2ViUlRDIGFkZEljZUNhbmRpZGF0ZSBmYWlsZWQuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA1MDM6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogNTAzLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNvbm5lY3Rpb24gd2l0aCBsb3ctbGF0ZW5jeShPTUUpIHNlcnZlciBmYWlsZWQuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJXZWJSVEMgc2V0UmVtb3RlRGVzY3JpcHRpb24gZmFpbGVkLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNTA0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDUwNCxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJDb25uZWN0aW9uIHdpdGggbG93LWxhdGVuY3koT01FKSBzZXJ2ZXIgZmFpbGVkLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiV2ViUlRDIHBlZXIgY3JlYXRlT2ZmZXIgZmFpbGVkLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNTA1OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDUwNSxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJDb25uZWN0aW9uIHdpdGggbG93LWxhdGVuY3koT01FKSBzZXJ2ZXIgZmFpbGVkLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiV2ViUlRDIHNldExvY2FsRGVzY3JpcHRpb24gZmFpbGVkLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNTEwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDUxMCxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJOZXR3b3JrIGNvbm5lY3Rpb24gaXMgdW5zdGFibGUuIENoZWNrIHRoZSBuZXR3b3JrIGNvbm5lY3Rpb24uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJOZXR3b3JrIGlzIHNsb3cuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA1MTE6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogNTExLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNvbm5lY3Rpb24gd2l0aCBsb3ctbGF0ZW5jeShPTUUpIHRlcm1pbmF0ZWQgdW5leHBlY3RlZGx5LlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiVW5leHBlY3RlZCBlbmQgb2YgY29ubmVjdGlvbi5cIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImxhbmdcIiA6IFwia29cIixcclxuICAgICAgICBcInVpXCIgOiB7XHJcbiAgICAgICAgICAgIFwiY29udGV4dFwiIDogXCLsmKTruJDtlIzroIjsnbTslrTsl5Ag6rSA7ZWY7JesXCIsXHJcbiAgICAgICAgICAgIFwiY29udHJvbHNcIiA6IHtcclxuICAgICAgICAgICAgICAgIFwibGl2ZVwiIDogXCLrnbzsnbTruIxcIixcclxuICAgICAgICAgICAgICAgIFwibG93X2xhdGVuY3lfbGl2ZVwiIDogXCLstIjsoIDsp4Dsl7Ag65287J2067iMXCIsXHJcbiAgICAgICAgICAgICAgICBcImxvd19sYXRlbmN5X3AycFwiIDogXCLstIjsoIDsp4Dsl7AgUDJQXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicGxheWxpc3RcIiA6IFwi7ZSM66CI7J2066as7Iqk7Yq4XCIsXHJcbiAgICAgICAgICAgIFwic2V0dGluZ1wiIDoge1xyXG4gICAgICAgICAgICAgICAgXCJ0aXRsZVwiIDogXCLshKTsoJVcIixcclxuICAgICAgICAgICAgICAgIFwic3BlZWRcIiA6IFwi7J6s7IOdIOyGjeuPhFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzcGVlZFVuaXRcIiA6IFwieFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzb3VyY2VcIiA6IFwi7IaM7IqkXCIsXHJcbiAgICAgICAgICAgICAgICBcInF1YWxpdHlcIiA6IFwi7ZKI7KeIXCIsXHJcbiAgICAgICAgICAgICAgICBcImNhcHRpb25cIiA6IFwi7J6Q66eJXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc3BsYXlcIiA6IFwi7ZGc7IucXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJhcGlcIiA6IHtcclxuICAgICAgICAgICAgXCJtZXNzYWdlXCIgOiB7XHJcbiAgICAgICAgICAgICAgICBcIm11dGVkX3BsYXlcIiA6IFwi64iM65+s7IScIOyGjOumrCDsvJzquLBcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImVycm9yXCI6IHtcclxuICAgICAgICAgICAgICAgIDEwMDoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAxMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi7JWMIOyImCDsl4bripQg7J207Jyg66GcIOuhnOuTnCDtlaAg7IiYIOyXhuyKteuLiOuLpC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIuyVjCDsiJgg7JeG64qUIOydtOycoOuhnCDroZzrk5wg7ZWgIOyImCDsl4bsirXri4jri6QuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAxMDE6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMTAxLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIuyngOybkOuQmOuKlCDrr7jrlJTslrTrpbwg7LC+7KeAIOuqu+2VtCDroZzrk5wg7ZWgIOyImCDsl4bsirXri4jri6QuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJDYW4gbm90IGxvYWQgZHVlIHRvIHBsYXlhYmxlIG1lZGlhIG5vdCBmb3VuZC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDEwMjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAxMDIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi7ZSM66CI7IucIOuhnOuTnOqwgCDspJHri6gg65CY7JeI7Iq164uI64ukLiA8L2JyPjxhIGhyZWY9J2h0dHA6Ly93d3cuYWRvYmUuY29tL2dvL2dldGZsYXNocGxheWVyJyB0YXJnZXQ9J19zZWxmJz48aW1nIHNyYz0naHR0cDovL3d3dy5hZG9iZS5jb20vaW1hZ2VzL3NoYXJlZC9kb3dubG9hZF9idXR0b25zL2dldF9mbGFzaF9wbGF5ZXIuZ2lmJyBhbHQ9J0dldCBBZG9iZSBGbGFzaCBwbGF5ZXInPjwvYT5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIkl0IGxvb2tzIGxpa2Ugbm90IGZvdW5kIHN3ZiBvciB5b3VyIGVudmlyb25tZW50IGlzIGxvY2FsaG9zdC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDEwMzoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAxMDMsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiRGFzaEpT66GcIOyduO2VtCDroZzrk5wg7ZWgIOyImCDsl4bsirXri4jri6QuIGRhc2hqcyDrsoTsoITsnYQg7ZmV7J247ZW07KO87IS47JqULlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiZGFzaC5qcyB2ZXJzaW9uIGlzIG9sZC4gUGxlYXNlIGNoZWNrIHRoZSBsYXN0ZXN0LlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMTA0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDEwNCxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJHb29nbGUgSU1BIOudvOydtOu4jOufrOumrOqwgCDsl4bslrQg66Gc65OcIO2VoCDsiJgg7JeG7Iq164uI64ukLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiUGxlYXNlIGNoZWNrIHRoZSBnb29nbGUgaW1hIGxpYnJhcnkuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAxMDU6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMTA1LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkRhc2hKUyDrnbzsnbTruIzrn6zrpqzqsIAg7JeG7Ja0IOuhnOuTnCDtlaAg7IiYIOyXhuyKteuLiOuLpC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIk5vdCBmb3VuZCBkYXNoanMuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAxMDY6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMTA2LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkhMU0pTIOudvOydtOu4jOufrOumrOqwgCDsl4bslrQg66Gc65OcIO2VoCDsiJgg7JeG7Iq164uI64ukLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiTm90IGZvdW5kIGhsc2pzLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMzAwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwMCxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCLslYwg7IiYIOyXhuuKlCDsnbTsnKDroZwg7J6s7IOd7ZWgIOyImCDsl4bsirXri4jri6QuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJDYW4gbm90IHBsYXkgZHVlIHRvIHVua25vd24gcmVhc29ucy5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDMwMToge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDEsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi7IKs7Jqp7J6Q7JeQIOydmO2VnCDtlITroZzshLjsiqQg7KSR64uoLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiRmV0Y2hpbmcgcHJvY2VzcyBhYm9ydGVkIGJ5IHVzZXIuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAzMDI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMzAyLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIuuEpO2KuOybjO2BrCDsmKTrpZjroZwg7J247ZW0IOydvOu2gCDrr7jrlJTslrTrpbwg64uk7Jq066Gc65OcIO2VoCDsiJgg7JeG7Iq164uI64ukLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiRXJyb3Igb2NjdXJyZWQgd2hlbiBkb3dubG9hZGluZy5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDMwMzoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDMsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi66+465SU7Ja066W8IOuhnOuTnCDtlaAg7IiYIOyXhuyKteuLiOuLpC4g7ISc67KEIOuYkOuKlCDrhKTtirjsm4ztgawg7Jik66WYIOuYkOuKlCDsp4Dsm5DrkJjsp4Ag7JWK64qUIO2YleyLneycvOuhnCDsnbjtlbQg67Cc7IOd7ZWgIOyImCDsnojsirXri4jri6QuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJFcnJvciBvY2N1cnJlZCB3aGVuIGRlY29kaW5nLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMzA0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwNCxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCLrr7jrlJTslrQg7J6s7IOd7J20IOy3qOyGjOuQmOyXiOyKteuLiOuLpC4g66+465SU7Ja06rCAIOyGkOyDgeuQmOyXiOqxsOuCmCDruIzrnbzsmrDsoIDqsIAg66+465SU7Ja07JeQ7IScIOyCrOyaqe2VmOuKlCDquLDriqXsnYQg7KeA7JuQ7ZWY7KeAIOyViuuKlCDqsoMg6rCZ7Iq164uI64ukLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiTWVkaWEgcGxheWJhY2sgbm90IHN1cHBvcnRlZC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDMwNToge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDUsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi7JWMIOyImCDsl4bripQg7J207Jyg66GcIOyekOunieydhCDroZzrk5wg7ZWgIOyImCDsl4bsirXri4jri6QuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJDYW4gbm90IGxvYWQgY2FwdGlvbnMgZHVlIHRvIHVua25vd24gcmVhc29ucy5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDMwNjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDYsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi66+465SU7Ja066W8IOuhnOuTnCDtlaAg7IiYIOyXhuyKteuLiOuLpC4g7ISc67KEIOuYkOuKlCDrhKTtirjsm4ztgawg7Jik66WYIOuYkOuKlCDsp4Dsm5DrkJjsp4Ag7JWK64qUIO2YleyLneycvOuhnCDsnbjtlbQg67Cc7IOd7ZWgIOyImCDsnojsirXri4jri6QuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJUaGUgc2VydmVyIGNhbm5vdCBvciB3aWxsIG5vdCBwcm9jZXNzIHRoZSByZXF1ZXN0LlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgMzA3OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwNyxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCLrr7jrlJTslrTrpbwg66Gc65OcIO2VoCDsiJgg7JeG7Iq164uI64ukLiDshJzrsoQg65iQ64qUIOuEpO2KuOybjO2BrCDsmKTrpZgg65iQ64qUIOyngOybkOuQmOyngCDslYrripQg7ZiV7Iud7Jy866GcIOyduO2VtCDrsJzsg53tlaAg7IiYIOyeiOyKteuLiOuLpC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIlRoZSBzZXJ2ZXIgcmVmdXNlZCB0aGUgcmVxdWVzdC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDMwODoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDgsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi66+465SU7Ja066W8IOuhnOuTnCDtlaAg7IiYIOyXhuyKteuLiOuLpC4g7ISc67KEIOuYkOuKlCDrhKTtirjsm4ztgawg7Jik66WYIOuYkOuKlCDsp4Dsm5DrkJjsp4Ag7JWK64qUIO2YleyLneycvOuhnCDsnbjtlbQg67Cc7IOd7ZWgIOyImCDsnojsirXri4jri6QuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJUaGUgc2VydmVyIGRvIG5vdCBhY2NlcHQgdGhlIHJlcXVlc3QuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA1MDE6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogNTAxLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIuybueyGjOy8kyDsl7DqsrAg7Iuk7YyoXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJXZWJTb2NrZXQgY29ubmVjdGlvbiBmYWlsZWQuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA1MDI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogNTAyLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIuyggOyngOyXsChPTUUpIOyEnOuyhOyZgCDsl7DqsrDsl5Ag7Iuk7Yyo7ZaI7Iq164uI64ukLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiV2ViUlRDIGFkZEljZUNhbmRpZGF0ZSBmYWlsZWQuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA1MDM6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogNTAzLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIuyggOyngOyXsChPTUUpIOyEnOuyhOyZgCDsl7DqsrDsl5Ag7Iuk7Yyo7ZaI7Iq164uI64ukLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiV2ViUlRDIHNldFJlbW90ZURlc2NyaXB0aW9uIGZhaWxlZC5cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDUwNDoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiA1MDQsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi7KCA7KeA7JewKE9NRSkg7ISc67KE7JmAIOyXsOqysOyXkCDsi6TtjKjtlojsirXri4jri6QuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJXZWJSVEMgcGVlciBjcmVhdGVPZmZlciBmYWlsZWQuXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA1MDU6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogNTA1LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIuyggOyngOyXsChPTUUpIOyEnOuyhOyZgCDsl7DqsrDsl5Ag7Iuk7Yyo7ZaI7Iq164uI64ukLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiV2ViUlRDIHNldExvY2FsRGVzY3JpcHRpb24gZmFpbGVkLlwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNTEwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDUxMCxcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCLrhKTtirjsm4ztgawg7Jew6rKw7J20IOu2iOyViOygle2VqeuLiOuLpC4g64Sk7Yq47JuM7YGsIOyXsOqysOydhCDtmZXsnbjtlZjsi63si5zsmKQuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJOZXR3b3JrIGlzIHNsb3cuXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXTsiLCIvKipcclxuICogQGJyaWVmICAg66+465SU7Ja0IOyXmOumrOuovO2KuOulvCDqtIDrpqztlZjripQg6rCd7LK0LiDtmITsnqzripQg7ZWY64qUIOydvOydtCDrp47sp4Ag7JWK64ukLlxyXG4gKiBAcGFyYW0gICB7ZWxlbWVudH0gICBjb250YWluZXIgICBkb20gZWxlbWVudFxyXG4gKlxyXG4gKiAqL1xyXG5pbXBvcnQge2dldEJyb3dzZXJ9IGZyb20gXCJ1dGlscy9icm93c2VyXCI7XHJcbmltcG9ydCB7UFJPVklERVJfREFTSCwgUFJPVklERVJfSExTLCBQUk9WSURFUl9XRUJSVEMsIFBST1ZJREVSX0hUTUw1LCBQUk9WSURFUl9SVE1QfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5pbXBvcnQgTEEkIGZyb20gXCJ1dGlscy9saWtlQSQuanNcIjtcclxuaW1wb3J0IHtnZXRTY3JpcHRQYXRofSBmcm9tICd1dGlscy93ZWJwYWNrJztcclxuaW1wb3J0IHt2ZXJzaW9ufSBmcm9tICd2ZXJzaW9uJztcclxuLy9Ub0RvIDogUmVzdHJ1Y3R1cmluZ1xyXG5cclxuY29uc3QgTWFuYWdlciA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgYnJvd3NlckluZm8pe1xyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG4gICAgY29uc3QgU1dGUGF0aCA9IGdldFNjcmlwdFBhdGgoJ292ZW5wbGF5ZXIuanMnKStcIk92ZW5QbGF5ZXJGbGFzaC5zd2Y/dj1cIit2ZXJzaW9uO1xyXG4gICAgbGV0IHJvb3RJZCA9IGNvbnRhaW5lci5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBhcmVudC1pZFwiKTtcclxuICAgIGxldCAkY29udGFpbmVyID0gTEEkKGNvbnRhaW5lcik7XHJcbiAgICBsZXQgdmlkZW9FbGVtZW50ID0gXCJcIjtcclxuXHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJNZWRpYU1hbmFnZXIgbG9hZGVkLiBicm93c2VyIDogXCIsIGJyb3dzZXJJbmZvICk7XHJcblxyXG4gICAgY29uc3QgY3JlYXRlSHRtbFZpZGVvID0gZnVuY3Rpb24oaXNMb29wLCBpc0F1dG9TdGFydCl7XHJcblxyXG4gICAgICAgIHZpZGVvRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XHJcbiAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnZGlzYWJsZXJlbW90ZXBsYXliYWNrJywgJycpO1xyXG4gICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3dlYmtpdC1wbGF5c2lubGluZScsICd0cnVlJyk7XHJcbiAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgncGxheXNpbmxpbmUnLCAndHJ1ZScpO1xyXG4gICAgICAgIGlmKGlzTG9vcCl7XHJcbiAgICAgICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2xvb3AnLCAnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGlzQXV0b1N0YXJ0KSB7XHJcbiAgICAgICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2F1dG9wbGF5JywgJycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkY29udGFpbmVyLmFwcGVuZCh2aWRlb0VsZW1lbnQpO1xyXG5cclxuICAgICAgICByZXR1cm4gdmlkZW9FbGVtZW50O1xyXG4gICAgfTtcclxuICAgIGNvbnN0IGNyZWF0ZUZsYXNoVmlkZW8gPSBmdW5jdGlvbihpc0xvb3AsIGJ1ZmZlclRpbWUsIGJ1ZmZlclRpbWVNYXgpe1xyXG4gICAgICAgIGxldCBtb3ZpZSwgZmxhc2h2YXJzLCBhbGxvd3NjcmlwdGFjY2VzcywgYWxsb3dmdWxsc2NyZWVuLCBxdWFsaXR5LCBuYW1lLCBtZW51LCBxdWFsLCBiZ2NvbG9yLCBsb29wLCB3bW9kZSA7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTWVkaWFNYW5hZ2VyIEZsYXNoIGJ1ZmZlciBzZXR0aW5nIDogXCIsIGJ1ZmZlclRpbWUsIGJ1ZmZlclRpbWVNYXgpO1xyXG4gICAgICAgIG1vdmllID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICBtb3ZpZS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnbW92aWUnKTtcclxuICAgICAgICBtb3ZpZS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgU1dGUGF0aCk7XHJcblxyXG4gICAgICAgIGZsYXNodmFycyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgZmxhc2h2YXJzLnNldEF0dHJpYnV0ZSgnbmFtZScsICdmbGFzaHZhcnMnKTtcclxuICAgICAgICAvL3BsYXllcklkIGlzIHRvIHVzZSBTV0YgZm9yIEV4dGVybmFsSW50ZXJmYWNlLmNhbGwoKS5cclxuICAgICAgICBmbGFzaHZhcnMuc2V0QXR0cmlidXRlKCd2YWx1ZScsIGBwbGF5ZXJJZD0ke3Jvb3RJZH0mYnVmZmVyVGltZT0ke2J1ZmZlclRpbWV9JmJ1ZmZlck1heFRpbWU9JHtidWZmZXJUaW1lTWF4fWApO1xyXG5cclxuICAgICAgICBhbGxvd3NjcmlwdGFjY2VzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgYWxsb3dzY3JpcHRhY2Nlc3Muc2V0QXR0cmlidXRlKCduYW1lJywgJ2FsbG93c2NyaXB0YWNjZXNzJyk7XHJcbiAgICAgICAgYWxsb3dzY3JpcHRhY2Nlc3Muc2V0QXR0cmlidXRlKCd2YWx1ZScsICdhbHdheXMnKTtcclxuXHJcbiAgICAgICAgYWxsb3dmdWxsc2NyZWVuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICBhbGxvd2Z1bGxzY3JlZW4uc2V0QXR0cmlidXRlKCduYW1lJywgJ2FsbG93ZnVsbHNjcmVlbicpO1xyXG4gICAgICAgIGFsbG93ZnVsbHNjcmVlbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ3RydWUnKTtcclxuXHJcbiAgICAgICAgcXVhbGl0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgcXVhbGl0eS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAncXVhbGl0eScpO1xyXG4gICAgICAgIHF1YWxpdHkuc2V0QXR0cmlidXRlKCd2YWx1ZScsICdoZWlnaHQnKTtcclxuXHJcbiAgICAgICAgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgbmFtZS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnbmFtZScpO1xyXG4gICAgICAgIG5hbWUuc2V0QXR0cmlidXRlKCd2YWx1ZScsIHJvb3RJZCtcIi1mbGFzaFwiKTtcclxuXHJcbiAgICAgICAgbWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgbWVudS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnbWVudScpO1xyXG4gICAgICAgIG1lbnUuc2V0QXR0cmlidXRlKCd2YWx1ZScsICdmYWxzZScpO1xyXG5cclxuICAgICAgICBxdWFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICBxdWFsLnNldEF0dHJpYnV0ZSgnbmFtZScsICdxdWFsaXR5Jyk7XHJcbiAgICAgICAgcXVhbC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ2hpZ2gnKTtcclxuXHJcbiAgICAgICAgYmdjb2xvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XHJcbiAgICAgICAgYmdjb2xvci5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnYmdjb2xvcicpO1xyXG4gICAgICAgIGJnY29sb3Iuc2V0QXR0cmlidXRlKCd2YWx1ZScsICcjMDAwMDAwJyk7XHJcblxyXG4gICAgICAgIHdtb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcclxuICAgICAgICB3bW9kZS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnd21vZGUnKTtcclxuICAgICAgICB3bW9kZS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ29wYXF1ZScpO1xyXG5cclxuICAgICAgICAvKmxldCBhbGxvd0J1dHRvbiA9IGA8YSBocmVmPVwiaHR0cDovL3d3dy5hZG9iZS5jb20vZ28vZ2V0Zmxhc2hwbGF5ZXJcIj48aW1nIHNyYz1cImh0dHA6Ly93d3cuYWRvYmUuY29tL2ltYWdlcy9zaGFyZWQvZG93bmxvYWRfYnV0dG9ucy9nZXRfZmxhc2hfcGxheWVyLmdpZlwiIGFsdD1cIkdldCBBZG9iZSBGbGFzaCBwbGF5ZXJcIj48L2E+YDtcclxuICAgICAgICBtZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBtZXNzYWdlLmlubmVySFRNTCA9IGFsbG93QnV0dG9uOyovXHJcblxyXG4gICAgICAgIGlmKGlzTG9vcCl7XHJcbiAgICAgICAgICAgIGxvb3AgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xyXG4gICAgICAgICAgICBsb29wLnNldEF0dHJpYnV0ZSgnbmFtZScsICdsb29wJyk7XHJcbiAgICAgICAgICAgIGxvb3Auc2V0QXR0cmlidXRlKCd2YWx1ZScsICd0cnVlJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2aWRlb0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvYmplY3QnKTtcclxuICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsIHJvb3RJZCtcIi1mbGFzaFwiKTtcclxuICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCduYW1lJywgcm9vdElkK1wiLWZsYXNoXCIpO1xyXG4gICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzEwMCUnKTtcclxuICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnMTAwJScpO1xyXG4gICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3NjYWxlJywgJ2RlZmF1bHQnKTtcclxuICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCd3bW9kZScsICdvcGFxdWUnKTtcclxuXHJcbiAgICAgICAgaWYoYnJvd3NlckluZm8uYnJvd3NlciA9PT0gXCJNaWNyb3NvZnQgSW50ZXJuZXQgRXhwbG9yZXJcIiAmJiBicm93c2VySW5mby5icm93c2VyTWFqb3JWZXJzaW9uIDw9IDkgKXtcclxuICAgICAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnY2xhc3NpZCcsICdjbHNpZDpEMjdDREI2RS1BRTZELTExY2YtOTZCOC00NDQ1NTM1NDAwMDAnKTtcclxuICAgICAgICAgICAgdmlkZW9FbGVtZW50LmFwcGVuZENoaWxkKG1vdmllKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YScsIFNXRlBhdGgpO1xyXG4gICAgICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2FwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGlzTG9vcCl7XHJcbiAgICAgICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChsb29wKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZCh3bW9kZSk7XHJcbiAgICAgICAgdmlkZW9FbGVtZW50LmFwcGVuZENoaWxkKGJnY29sb3IpO1xyXG4gICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChxdWFsKTtcclxuICAgICAgICB2aWRlb0VsZW1lbnQuYXBwZW5kQ2hpbGQoYWxsb3dmdWxsc2NyZWVuKTtcclxuICAgICAgICB2aWRlb0VsZW1lbnQuYXBwZW5kQ2hpbGQoYWxsb3dzY3JpcHRhY2Nlc3MpO1xyXG4gICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChmbGFzaHZhcnMpO1xyXG4gICAgICAgIC8vdmlkZW9FbGVtZW50LmFwcGVuZENoaWxkKG1lc3NhZ2UpO1xyXG5cclxuICAgICAgICAkY29udGFpbmVyLmFwcGVuZCh2aWRlb0VsZW1lbnQpO1xyXG5cclxuICAgICAgICByZXR1cm4gdmlkZW9FbGVtZW50O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmNyZWF0ZU1lZGlhID0gKHByb3ZpZGVyTmFtZSAsIHBsYXllckNvbmZpZykgID0+IHtcclxuICAgICAgICBpZiggcHJvdmlkZXJOYW1lID09PSBQUk9WSURFUl9SVE1QICl7XHJcbiAgICAgICAgICAgIGlmKHZpZGVvRWxlbWVudCl7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmVtcHR5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUZsYXNoVmlkZW8ocGxheWVyQ29uZmlnLmlzTG9vcCgpLCBwbGF5ZXJDb25maWcuZ2V0UnRtcEJ1ZmZlclRpbWUoKSwgcGxheWVyQ29uZmlnLmdldFJ0bXBCdWZmZXJUaW1lTWF4KCkpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAvLyBpZih2aWRlb0VsZW1lbnQpe1xyXG4gICAgICAgICAgICAvLyAgICAgLy8gdGhhdC5lbXB0eSgpO1xyXG4gICAgICAgICAgICAvLyAgICAgLy9yZXVzZSB2aWRlbyBlbGVtZW50LlxyXG4gICAgICAgICAgICAvLyAgICAgLy9iZWNhdXNlIHBsYXlsaXN0IGlzIGF1dG8gbmV4dCBwbGF5aW5nLlxyXG4gICAgICAgICAgICAvLyAgICAgLy9Pbmx5IHNhbWUgdmlkZW8gZWxlbWVudCBkb2VzIG5vdCByZXF1aXJlIFVzZXIgSW50ZXJhY3Rpb24gRXJyb3IuXHJcbiAgICAgICAgICAgIC8vICAgICByZXR1cm4gdmlkZW9FbGVtZW50O1xyXG4gICAgICAgICAgICAvLyB9ZWxzZXtcclxuICAgICAgICAgICAgLy8gICAgIHJldHVybiBjcmVhdGVIdG1sVmlkZW8ocGxheWVyQ29uZmlnLmlzTG9vcCgpLCBwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSk7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgdGhhdC5lbXB0eSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlSHRtbFZpZGVvKHBsYXllckNvbmZpZy5pc0xvb3AoKSwgcGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGF0LmNyZWF0ZUFkQ29udGFpbmVyID0gKCkgPT4ge1xyXG4gICAgICAgIGxldCBhZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGFkQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnb3AtYWRzJyk7XHJcbiAgICAgICAgJGNvbnRhaW5lci5hcHBlbmQoYWRDb250YWluZXIpO1xyXG5cclxuICAgICAgICByZXR1cm4gYWRDb250YWluZXI7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB0aGF0LmVtcHR5ID0gKCkgPT57XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTWVkaWFNYW5hZ2VyIHJlbW92ZUVsZW1lbnQoKVwiKTtcclxuICAgICAgICAkY29udGFpbmVyLnJlbW92ZUNoaWxkKHZpZGVvRWxlbWVudCk7XHJcbiAgICAgICAgdmlkZW9FbGVtZW50ID0gbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XHJcbiAgICAgICAgJGNvbnRhaW5lci5yZW1vdmVDaGlsZCgpO1xyXG4gICAgICAgICRjb250YWluZXIgPSBudWxsO1xyXG4gICAgICAgIHZpZGVvRWxlbWVudCA9IG51bGw7XHJcbiAgICAgICAgcm9vdElkID0gbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYW5hZ2VyO1xyXG4iLCJpbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xyXG5pbXBvcnQge2lzUnRtcCwgaXNXZWJSVEMsIGlzRGFzaCB9IGZyb20gXCJ1dGlscy92YWxpZGF0b3JcIjtcclxuaW1wb3J0IHtleHRyYWN0RXh0ZW5zaW9uICx0cmltfSBmcm9tIFwiLi4vLi4vdXRpbHMvc3RyaW5nc1wiO1xyXG5pbXBvcnQgU3VwcG9ydENoZWNrZXIgZnJvbSBcIi4uL1N1cHBvcnRDaGVja2VyXCI7XHJcbmltcG9ydCB7UExBWUxJU1RfQ0hBTkdFRH0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBUaGlzIG1hbmFnZXMgUGxheWxpc3Qgb3IgU291cmNlcy5cclxuICogQHBhcmFtXHJcbiAqXHJcbiAqICovXHJcbmNvbnN0IE1hbmFnZXIgPSBmdW5jdGlvbihwcm92aWRlcil7XHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICBsZXQgY3VycmVudFBsYXlsaXN0SXRlbSA9IFtdO1xyXG4gICAgbGV0IHNwZWMgPSB7XHJcbiAgICAgICAgcGxheWxpc3QgOiBbXSxcclxuICAgICAgICBjdXJyZW50SW5kZXggOiAwXHJcbiAgICB9O1xyXG4gICAgbGV0IHN1cHBvcnRDaGVja2VyID0gU3VwcG9ydENoZWNrZXIoKTtcclxuXHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQbGF5bGlzdE1hbmFnZXIgbG9hZGVkLlwiKTtcclxuXHJcbiAgICBjb25zdCBtYWtlUHJldHR5U291cmNlID0gZnVuY3Rpb24oc291cmNlXyl7XHJcbiAgICAgICAgaWYgKCFzb3VyY2VfIHx8ICFzb3VyY2VfLmZpbGUgJiYgIShzb3VyY2VfLmhvc3QgfHwgc291cmNlXy5hcHBsaWNhdGlvbiB8fCBzb3VyY2VfLnN0cmVhbSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNvdXJjZSA9IE9iamVjdC5hc3NpZ24oe30sIHsgJ2RlZmF1bHQnOiBmYWxzZSB9LCBzb3VyY2VfKTtcclxuICAgICAgICBzb3VyY2UuZmlsZSA9IHRyaW0oJycgKyBzb3VyY2UuZmlsZSk7XHJcblxyXG4gICAgICAgIGlmKHNvdXJjZS5ob3N0ICYmIHNvdXJjZS5hcHBsaWNhdGlvbiAmJiBzb3VyY2Uuc3RyZWFtKXtcclxuICAgICAgICAgICAgc291cmNlLmZpbGUgPSBzb3VyY2UuaG9zdCArIFwiL1wiICsgc291cmNlLmFwcGxpY2F0aW9uICsgXCIvc3RyZWFtL1wiICsgc291cmNlLnN0cmVhbTtcclxuICAgICAgICAgICAgZGVsZXRlIHNvdXJjZS5ob3N0O1xyXG4gICAgICAgICAgICBkZWxldGUgc291cmNlLmFwcGxpY2F0aW9uO1xyXG4gICAgICAgICAgICBkZWxldGUgc291cmNlLnN0cmVhbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG1pbWV0eXBlUmVnRXggPSAvXlteL10rXFwvKD86eC0pPyhbXi9dKykkLztcclxuXHJcbiAgICAgICAgaWYgKG1pbWV0eXBlUmVnRXgudGVzdChzb3VyY2UudHlwZSkpIHtcclxuICAgICAgICAgICAgLy8gaWYgdHlwZSBpcyBnaXZlbiBhcyBhIG1pbWV0eXBlXHJcbiAgICAgICAgICAgIHNvdXJjZS5taW1lVHlwZSA9IHNvdXJjZS50eXBlO1xyXG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9IHNvdXJjZS50eXBlLnJlcGxhY2UobWltZXR5cGVSZWdFeCwgJyQxJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihpc1J0bXAoc291cmNlLmZpbGUpKXtcclxuICAgICAgICAgICAgc291cmNlLnR5cGUgPSAncnRtcCc7XHJcbiAgICAgICAgfWVsc2UgaWYoaXNXZWJSVEMoc291cmNlLmZpbGUpKXtcclxuICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnd2VicnRjJztcclxuICAgICAgICB9ZWxzZSBpZihpc0Rhc2goc291cmNlLmZpbGUsIHNvdXJjZS50eXBlKSl7XHJcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ2Rhc2gnO1xyXG4gICAgICAgIH1lbHNlIGlmICghc291cmNlLnR5cGUpIHtcclxuICAgICAgICAgICAgc291cmNlLnR5cGUgPSBleHRyYWN0RXh0ZW5zaW9uKHNvdXJjZS5maWxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzb3VyY2UubG93TGF0ZW5jeSkge1xyXG4gICAgICAgICAgICBzb3VyY2UubG93TGF0ZW5jeSA9IHNvdXJjZS5sb3dMYXRlbmN5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFzb3VyY2UudHlwZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBub3JtYWxpemUgdHlwZXNcclxuICAgICAgICBzd2l0Y2ggKHNvdXJjZS50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ20zdTgnOlxyXG4gICAgICAgICAgICBjYXNlICd2bmQuYXBwbGUubXBlZ3VybCc6XHJcbiAgICAgICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdobHMnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ200YSc6XHJcbiAgICAgICAgICAgICAgICBzb3VyY2UudHlwZSA9ICdhYWMnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NtaWwnOlxyXG4gICAgICAgICAgICAgICAgc291cmNlLnR5cGUgPSAncnRtcCc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgICAgICBpZiAoc291cmNlW2tleV0gPT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgc291cmNlW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNvdXJjZTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdGhhdC5pbml0UGxheWxpc3QgPShwbGF5bGlzdCwgcGxheWVyQ29uZmlnKSA9PntcclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIHNldFBsYXlsaXN0KCkgXCIsIHBsYXlsaXN0KTtcclxuICAgICAgICBjb25zdCBwcmV0dGllZFBsYXlsaXN0ID0gKF8uaXNBcnJheShwbGF5bGlzdCkgPyBwbGF5bGlzdCA6IFtwbGF5bGlzdF0pLm1hcChmdW5jdGlvbihpdGVtKXtcclxuICAgICAgICAgICAgaWYoIV8uaXNBcnJheShpdGVtLnRyYWNrcykpIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBpdGVtLnRyYWNrcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgcGxheWxpc3RJdGVtID0gT2JqZWN0LmFzc2lnbih7fSx7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2VzOiBbXSxcclxuICAgICAgICAgICAgICAgIHRyYWNrczogW10sXHJcbiAgICAgICAgICAgICAgICB0aXRsZSA6IFwiXCJcclxuICAgICAgICAgICAgfSwgaXRlbSApO1xyXG5cclxuICAgICAgICAgICAgaWYoKHBsYXlsaXN0SXRlbS5zb3VyY2VzID09PSBPYmplY3QocGxheWxpc3RJdGVtLnNvdXJjZXMpKSAmJiAhXy5pc0FycmF5KHBsYXlsaXN0SXRlbS5zb3VyY2VzKSkge1xyXG4gICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBbbWFrZVByZXR0eVNvdXJjZShwbGF5bGlzdEl0ZW0uc291cmNlcyldO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIV8uaXNBcnJheShwbGF5bGlzdEl0ZW0uc291cmNlcykgfHwgcGxheWxpc3RJdGVtLnNvdXJjZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IFttYWtlUHJldHR5U291cmNlKHBsYXlsaXN0SXRlbSldO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZighXy5pc0FycmF5KHBsYXlsaXN0SXRlbS5zb3VyY2VzKSB8fCBwbGF5bGlzdEl0ZW0uc291cmNlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmxldmVscykge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gaXRlbS5sZXZlbHM7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gW21ha2VQcmV0dHlTb3VyY2UoaXRlbSldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHBsYXlsaXN0SXRlbS5zb3VyY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc291cmNlID0gcGxheWxpc3RJdGVtLnNvdXJjZXNbaV07XHJcbiAgICAgICAgICAgICAgICBsZXQgcHJldHR5U291cmNlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGlmICghc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGRlZmF1bHRTb3VyY2UgPSBzb3VyY2UuZGVmYXVsdDtcclxuICAgICAgICAgICAgICAgIGlmIChkZWZhdWx0U291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlLmRlZmF1bHQgPSAoZGVmYXVsdFNvdXJjZS50b1N0cmluZygpID09PSAndHJ1ZScpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2UuZGVmYXVsdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBzb3VyY2UgZG9lc24ndCBoYXZlIGEgbGFiZWwsIG51bWJlciBpdFxyXG4gICAgICAgICAgICAgICAgaWYgKCFwbGF5bGlzdEl0ZW0uc291cmNlc1tpXS5sYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldLmxhYmVsID0gcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0udHlwZStcIi1cIitpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcHJldHR5U291cmNlID0gbWFrZVByZXR0eVNvdXJjZShwbGF5bGlzdEl0ZW0uc291cmNlc1tpXSk7XHJcbiAgICAgICAgICAgICAgICBpZihzdXBwb3J0Q2hlY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UocHJldHR5U291cmNlKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0gPSBwcmV0dHlTb3VyY2U7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gcGxheWxpc3RJdGVtLnNvdXJjZXMuZmlsdGVyKHNvdXJjZSA9PiAhIXNvdXJjZSk7XHJcblxyXG4gICAgICAgICAgICBpZighcGxheWxpc3RJdGVtLnRpdGxlICYmICBwbGF5bGlzdEl0ZW0uc291cmNlc1swXSAmJiBwbGF5bGlzdEl0ZW0uc291cmNlc1swXS5sYWJlbCl7XHJcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0udGl0bGUgPSBwbGF5bGlzdEl0ZW0uc291cmNlc1swXS5sYWJlbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gZGVmYXVsdCDqsIAg7JeG7J2E65WMIHdlYnJ0Y+qwgCDsnojri6TrqbQgd2VicnRjIGRlZmF1bHQgOiB0cnVl66GcIOyekOuPmSDshKTsoJVcclxuICAgICAgICAgICAgLypsZXQgaGF2ZURlZmF1bHQgPSBfLmZpbmQocGxheWxpc3RJdGVtLnNvdXJjZXMsIGZ1bmN0aW9uKHNvdXJjZSl7cmV0dXJuIHNvdXJjZS5kZWZhdWx0ID09IHRydWU7fSk7XHJcbiAgICAgICAgICAgIGxldCB3ZWJydGNTb3VyY2UgPSBbXTtcclxuICAgICAgICAgICAgaWYoIWhhdmVEZWZhdWx0KXtcclxuICAgICAgICAgICAgICAgIHdlYnJ0Y1NvdXJjZSA9IF8uZmluZChwbGF5bGlzdEl0ZW0uc291cmNlcywgZnVuY3Rpb24oc291cmNlKXtyZXR1cm4gc291cmNlLnR5cGUgPT0gXCJ3ZWJydGNcIjt9KTtcclxuICAgICAgICAgICAgICAgIGlmKHdlYnJ0Y1NvdXJjZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgd2VicnRjU291cmNlLmRlZmF1bHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9Ki9cclxuXHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBleHRyYWN0T25seU9uZVByb3RvY29sKHNvdXJjZXMpe1xyXG4gICAgICAgICAgICAgICAgaWYoISFzb3VyY2VzKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaGlnaFByaW9yaXR5VHlwZSA9IHBsYXlsaXN0SXRlbS5zb3VyY2VzWzBdLnR5cGU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfLmZpbHRlcihzb3VyY2VzLCB7dHlwZSA6IGhpZ2hQcmlvcml0eVR5cGV9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmlzQ3VycmVudFByb3RvY29sT25seSgpKXtcclxuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gZXh0cmFjdE9ubHlPbmVQcm90b2NvbChwbGF5bGlzdEl0ZW0uc291cmNlcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKCFfLmlzQXJyYXkocGxheWxpc3RJdGVtLnRyYWNrcykpe1xyXG4gICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnRyYWNrcyA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKF8uaXNBcnJheShwbGF5bGlzdEl0ZW0uY2FwdGlvbnMpKXtcclxuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS50cmFja3MgPSBwbGF5bGlzdEl0ZW0udHJhY2tzLmNvbmNhdChwbGF5bGlzdEl0ZW0uY2FwdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHBsYXlsaXN0SXRlbS5jYXB0aW9ucztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcGxheWxpc3RJdGVtLnRyYWNrcyA9IHBsYXlsaXN0SXRlbS50cmFja3MubWFwKGZ1bmN0aW9uKHRyYWNrKXtcclxuICAgICAgICAgICAgICAgIGlmKCF0cmFjayB8fCAhdHJhY2suZmlsZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHtcclxuICAgICAgICAgICAgICAgICAgICAna2luZCc6ICdjYXB0aW9ucycsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2RlZmF1bHQnOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSwgdHJhY2spO1xyXG4gICAgICAgICAgICB9KS5maWx0ZXIodHJhY2sgPT4gISF0cmFjayk7XHJcbiAgICAgICAgICAgIHJldHVybiBwbGF5bGlzdEl0ZW07XHJcbiAgICAgICAgfSkuZmlsdGVyKGZ1bmN0aW9uKGl0ZW0pe3JldHVybiBpdGVtLnNvdXJjZXMgJiYgaXRlbS5zb3VyY2VzLmxlbmd0aCA+IDA7fSl8fFtdO1xyXG4gICAgICAgIHNwZWMucGxheWxpc3QgPSBwcmV0dGllZFBsYXlsaXN0O1xyXG4gICAgICAgIHJldHVybiBwcmV0dGllZFBsYXlsaXN0O1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0UGxheWxpc3QgPSAoKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIGdldFBsYXlsaXN0KCkgXCIsIHNwZWMucGxheWxpc3QpO1xyXG4gICAgICAgIHJldHVybiBzcGVjLnBsYXlsaXN0O1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q3VycmVudFBsYXlMaXN0ID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKHNwZWMucGxheWxpc3Rbc3BlYy5jdXJyZW50SW5kZXhdKXtcclxuICAgICAgICAgICAgcmV0dXJuIHNwZWMucGxheWxpc3Rbc3BlYy5jdXJyZW50SW5kZXhdO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q3VycmVudFBsYXlsaXN0SW5kZXggPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudEluZGV4O1xyXG4gICAgfTtcclxuICAgIHRoYXQuc2V0Q3VycmVudFBsYXlsaXN0ID0gKGluZGV4KSA9PiB7XHJcbiAgICAgICAgaWYoc3BlYy5wbGF5bGlzdFtpbmRleF0pe1xyXG4gICAgICAgICAgICBzcGVjLmN1cnJlbnRJbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICBwcm92aWRlci50cmlnZ2VyKFBMQVlMSVNUX0NIQU5HRUQsIHNwZWMuY3VycmVudEluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudEluZGV4O1xyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q3VycmVudFNvdXJjZXMgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYoc3BlYy5wbGF5bGlzdFtzcGVjLmN1cnJlbnRJbmRleF0pe1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQbGF5bGlzdE1hbmFnZXIgZ2V0Q3VycmVudFNvdXJjZXMoKSBcIiwgc3BlYy5wbGF5bGlzdFtzcGVjLmN1cnJlbnRJbmRleF0uc291cmNlcyk7XHJcbiAgICAgICAgICAgIHJldHVybiBzcGVjLnBsYXlsaXN0W3NwZWMuY3VycmVudEluZGV4XS5zb3VyY2VzO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuICAgIHRoYXQuZ2V0Q3VycmVudEFkVGFnID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKHNwZWMucGxheWxpc3Rbc3BlYy5jdXJyZW50SW5kZXhdKXtcclxuICAgICAgICAgICAgcmV0dXJuIHNwZWMucGxheWxpc3Rbc3BlYy5jdXJyZW50SW5kZXhdLmFkVGFnVXJsIHx8IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBNYW5hZ2VyO1xyXG4iLCJpbXBvcnQgU3VwcG9ydENoZWNrZXIgZnJvbSBcImFwaS9TdXBwb3J0Q2hlY2tlclwiO1xyXG5pbXBvcnQge0FwaVJ0bXBFeHBhbnNpb259IGZyb20gJ2FwaS9BcGlFeHBhbnNpb25zJztcclxuaW1wb3J0IHtcclxuICAgIFBST1ZJREVSX0hUTUw1LCBQUk9WSURFUl9XRUJSVEMsIFBST1ZJREVSX0RBU0gsIFBST1ZJREVSX0hMUywgUFJPVklERVJfUlRNUCwgRVJST1JTLCBJTklUX1VOU1VQUE9SVF9FUlJPUlxyXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgVGhpcyBtYW5hZ2VzIHByb3ZpZGVyLlxyXG4gKiBAcGFyYW1cclxuICogKi9cclxuY29uc3QgQ29udHJvbGxlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBzdXBwb3J0Q2hhY2tlciA9IFN1cHBvcnRDaGVja2VyKCk7XHJcbiAgICBjb25zdCBQcm92aWRlcnMgPSB7fTtcclxuXHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgbG9hZGVkLlwiKTtcclxuXHJcbiAgICBjb25zdCByZWdpc3RlUHJvdmlkZXIgPSAobmFtZSwgcHJvdmlkZXIpID0+IHtcclxuICAgICAgICBpZiAoUHJvdmlkZXJzW25hbWVdKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIF9yZWdpc3RlclByb3ZpZGVyKCkgXCIsIG5hbWUpO1xyXG4gICAgICAgIFByb3ZpZGVyc1tuYW1lXSA9IHByb3ZpZGVyO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBQcm92aWRlckxvYWRlciA9IHtcclxuICAgICAgICBodG1sNTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvaHRtbDUvcHJvdmlkZXJzL0h0bWw1J10sIGZ1bmN0aW9uIChyZXF1aXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvaHRtbDUvcHJvdmlkZXJzL0h0bWw1JykuZGVmYXVsdDtcclxuICAgICAgICAgICAgICAgICAgICByZWdpc3RlUHJvdmlkZXIoUFJPVklERVJfSFRNTDUsIHByb3ZpZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge25hbWU6IFBST1ZJREVSX0hUTUw1LCBwcm92aWRlcjogcHJvdmlkZXJ9O1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgfSwgJ292ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDUnXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB3ZWJydGM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9XZWJSVEMnXSwgZnVuY3Rpb24gKHJlcXVpcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvV2ViUlRDJykuZGVmYXVsdDtcclxuICAgICAgICAgICAgICAgICAgICByZWdpc3RlUHJvdmlkZXIoUFJPVklERVJfV0VCUlRDLCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtuYW1lOiBQUk9WSURFUl9XRUJSVEMsIHByb3ZpZGVyOiBwcm92aWRlcn07XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XHJcbiAgICAgICAgICAgICAgICB9LCAnb3ZlbnBsYXllci5wcm92aWRlci5XZWJSVENQcm92aWRlcidcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRhc2g6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9EYXNoJ10sIGZ1bmN0aW9uIChyZXF1aXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvaHRtbDUvcHJvdmlkZXJzL0Rhc2gnKS5kZWZhdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVQcm92aWRlcihQUk9WSURFUl9EQVNILCBwcm92aWRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtuYW1lOiBQUk9WSURFUl9EQVNILCBwcm92aWRlcjogcHJvdmlkZXJ9O1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgfSwgJ292ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGxzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvSGxzJ10sIGZ1bmN0aW9uIChyZXF1aXJlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvaHRtbDUvcHJvdmlkZXJzL0hscycpLmRlZmF1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFBST1ZJREVSX0hMUywgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7bmFtZTogUFJPVklERVJfSExTLCBwcm92aWRlcjogcHJvdmlkZXJ9O1xyXG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgfSwgJ292ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXInXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBydG1wOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci9mbGFzaC9wcm92aWRlcnMvUnRtcCddLCBmdW5jdGlvbiAocmVxdWlyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2ZsYXNoL3Byb3ZpZGVycy9SdG1wJykuZGVmYXVsdDtcclxuICAgICAgICAgICAgICAgICAgICByZWdpc3RlUHJvdmlkZXIoUFJPVklERVJfUlRNUCwgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7bmFtZTogUFJPVklERVJfUlRNUCwgcHJvdmlkZXI6IHByb3ZpZGVyfTtcclxuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcclxuICAgICAgICAgICAgICAgIH0sICdvdmVucGxheWVyLnByb3ZpZGVyLlJ0bXBQcm92aWRlcidcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB0aGF0LmxvYWRQcm92aWRlcnMgPSAocGxheWxpc3RJdGVtKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc3VwcG9ydGVkUHJvdmlkZXJOYW1lcyA9IHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVzQnlQbGF5bGlzdChwbGF5bGlzdEl0ZW0pO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBsb2FkUHJvdmlkZXJzKCkgXCIsIHN1cHBvcnRlZFByb3ZpZGVyTmFtZXMpO1xyXG4gICAgICAgIGlmICghc3VwcG9ydGVkUHJvdmlkZXJOYW1lcykge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRVJST1JTLmNvZGVzW0lOSVRfVU5TVVBQT1JUX0VSUk9SXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFxyXG4gICAgICAgICAgICAgICAgc3VwcG9ydGVkUHJvdmlkZXJOYW1lcy5maWx0ZXIoZnVuY3Rpb24gKHByb3ZpZGVyTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhIVByb3ZpZGVyTG9hZGVyW3Byb3ZpZGVyTmFtZV07XHJcbiAgICAgICAgICAgICAgICB9KS5tYXAoZnVuY3Rpb24gKHByb3ZpZGVyTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm92aWRlckxvYWRlcltwcm92aWRlck5hbWVdKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZmluZEJ5TmFtZSA9IChuYW1lKSA9PiB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGZpbmRCeU5hbWUoKSBcIiwgbmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIFByb3ZpZGVyc1tuYW1lXTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5nZXRQcm92aWRlckJ5U291cmNlID0gKHNvdXJjZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHN1cHBvcnRlZFByb3ZpZGVyTmFtZSA9IHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShzb3VyY2UpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBnZXRQcm92aWRlckJ5U291cmNlKCkgXCIsIHN1cHBvcnRlZFByb3ZpZGVyTmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoYXQuZmluZEJ5TmFtZShzdXBwb3J0ZWRQcm92aWRlck5hbWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmlzU2FtZVByb3ZpZGVyID0gKGN1cnJlbnRTb3VyY2UsIG5ld1NvdXJjZSkgPT4ge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBpc1NhbWVQcm92aWRlcigpIFwiLCBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UoY3VycmVudFNvdXJjZSksIHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShuZXdTb3VyY2UpKTtcclxuICAgICAgICByZXR1cm4gc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKGN1cnJlbnRTb3VyY2UpID09PSBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UobmV3U291cmNlKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb250cm9sbGVyO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDExLiAxMi4uXHJcbiAqL1xyXG5pbXBvcnQge0VSUk9SLCBTVEFURV9FUlJPUn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBleHRyYWN0VmlkZW9FbGVtZW50ID0gZnVuY3Rpb24oZWxlbWVudE9yTXNlKSB7XHJcbiAgICBpZihfLmlzRWxlbWVudChlbGVtZW50T3JNc2UpKXtcclxuICAgICAgICByZXR1cm4gZWxlbWVudE9yTXNlO1xyXG4gICAgfVxyXG4gICAgaWYoZWxlbWVudE9yTXNlLmdldFZpZGVvRWxlbWVudCl7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRPck1zZS5nZXRWaWRlb0VsZW1lbnQoKTtcclxuICAgIH1lbHNlIGlmKGVsZW1lbnRPck1zZS5tZWRpYSl7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRPck1zZS5tZWRpYTtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHNlcGFyYXRlTGl2ZSA9IGZ1bmN0aW9uKG1zZSkge1xyXG4gICAgLy9Ub0RvIDogWW91IGNvbnNpZGVyIGhsc2pzLiBCdXQgbm90IG5vdyBiZWNhdXNlIHdlIGRvbid0IHN1cHBvcnQgaGxzanMuXHJcblxyXG4gICAgaWYobXNlICYmIG1zZS5pc0R5bmFtaWMpe1xyXG4gICAgICAgIHJldHVybiBtc2UuaXNEeW5hbWljKCk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZXJyb3JUcmlnZ2VyID0gZnVuY3Rpb24oZXJyb3IsIHByb3ZpZGVyKXtcclxuICAgIGlmKHByb3ZpZGVyKXtcclxuICAgICAgICBwcm92aWRlci5zZXRTdGF0ZShTVEFURV9FUlJPUik7XHJcbiAgICAgICAgcHJvdmlkZXIucGF1c2UoKTtcclxuICAgICAgICBwcm92aWRlci50cmlnZ2VyKEVSUk9SLCBlcnJvciApO1xyXG4gICAgfVxyXG5cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBwaWNrQ3VycmVudFNvdXJjZSA9IChzb3VyY2VzLCBwbGF5ZXJDb25maWcpID0+IHtcclxuXHJcbiAgICBsZXQgc291cmNlSW5kZXggPSAwO1xyXG5cclxuICAgIGlmIChzb3VyY2VzKSB7XHJcblxyXG4gICAgICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0U291cmNlSW5kZXgoKSA9PT0gLTEpIHtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNvdXJjZXNbaV0uZGVmYXVsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZUluZGV4ID0gaTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBzb3VyY2VJbmRleCA9IHBsYXllckNvbmZpZy5nZXRTb3VyY2VJbmRleCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHNvdXJjZUluZGV4O1xyXG59IiwiaW1wb3J0IEFQSSBmcm9tICdhcGkvQXBpJztcclxuaW1wb3J0IHtpc1dlYlJUQ30gZnJvbSAndXRpbHMvdmFsaWRhdG9yJztcclxuaW1wb3J0IF8gZnJvbSAndXRpbHMvdW5kZXJzY29yZSc7XHJcbmltcG9ydCBMYSQgZnJvbSAndXRpbHMvbGlrZUEkJztcclxuaW1wb3J0IHtnZXRTY3JpcHRQYXRofSBmcm9tICd1dGlscy93ZWJwYWNrJztcclxuXHJcblxyXG5fX3dlYnBhY2tfcHVibGljX3BhdGhfXyA9IGdldFNjcmlwdFBhdGgoJ292ZW5wbGF5ZXIuc2RrLmpzJyk7XHJcblxyXG4vKipcclxuICogTWFpbiBPdmVuUGxheWVyU0RLIG9iamVjdFxyXG4gKi9cclxuY29uc3QgT3ZlblBsYXllclNESyA9IHdpbmRvdy5PdmVuUGxheWVyU0RLID0ge307XHJcblxyXG5jb25zdCBwbGF5ZXJMaXN0ID0gT3ZlblBsYXllclNESy5wbGF5ZXJMaXN0ID0gW107XHJcblxyXG5leHBvcnQgY29uc3QgY2hlY2tBbmRHZXRDb250YWluZXJFbGVtZW50ID0gZnVuY3Rpb24oY29udGFpbmVyKSB7XHJcbiAgICBpZiAoIWNvbnRhaW5lcikge1xyXG5cclxuICAgICAgICAvLyBUT0RPKHJvY2spOiBTaG91bGQgY2F1c2UgYW4gZXJyb3IuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGNvbnRhaW5lckVsZW1lbnQgPSBudWxsO1xyXG5cclxuICAgIGlmICh0eXBlb2YgY29udGFpbmVyID09PSAnc3RyaW5nJykge1xyXG5cclxuICAgICAgICBjb250YWluZXJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29udGFpbmVyKTtcclxuICAgIH0gZWxzZSBpZiAoY29udGFpbmVyLm5vZGVUeXBlKSB7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lckVsZW1lbnQgPSBjb250YWluZXI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIFRPRE8ocm9jayk6IFNob3VsZCBjYXVzZSBhbiBlcnJvci5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY29udGFpbmVyRWxlbWVudDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBwbGF5ZXIgaW5zdGFuY2UgYW5kIHJldHVybiBpdC5cclxuICpcclxuICogQHBhcmFtICAgICAge3N0cmluZyB8IGRvbSBlbGVtZW50fSBjb250YWluZXIgIElkIG9mIGNvbnRhaW5lciBlbGVtZW50IG9yIGNvbnRhaW5lciBlbGVtZW50XHJcbiAqIEBwYXJhbSAgICAgIHtvYmplY3R9IG9wdGlvbnMgIFRoZSBvcHRpb25zXHJcbiAqL1xyXG5PdmVuUGxheWVyU0RLLmNyZWF0ZSA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgb3B0aW9ucykge1xyXG5cclxuICAgIGxldCBjb250YWluZXJFbGVtZW50ID0gY2hlY2tBbmRHZXRDb250YWluZXJFbGVtZW50KGNvbnRhaW5lcik7XHJcblxyXG4gICAgY29uc3QgcGxheWVySW5zdGFuY2UgPSBBUEkoY29udGFpbmVyRWxlbWVudCk7XHJcbiAgICBwbGF5ZXJJbnN0YW5jZS5pbml0KG9wdGlvbnMpO1xyXG5cclxuICAgIHBsYXllckxpc3QucHVzaChwbGF5ZXJJbnN0YW5jZSk7XHJcblxyXG4gICAgcmV0dXJuIHBsYXllckluc3RhbmNlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIHBsYXllciBpbnN0YW5jZSBsaXN0LlxyXG4gKlxyXG4gKiBAcmV0dXJuICAgICB7YXJyYXl9ICBUaGUgcGxheWVyIGxpc3QuXHJcbiAqL1xyXG5PdmVuUGxheWVyU0RLLmdldFBsYXllckxpc3QgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICByZXR1cm4gcGxheWVyTGlzdDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIHRoZSBwbGF5ZXIgaW5zdGFuY2UgYnkgY29udGFpbmVyIGlkLlxyXG4gKlxyXG4gKiBAcGFyYW0gICAgICB7c3RyaW5nfSAgY29udGFpbmVySWQgIFRoZSBjb250YWluZXIgaWRlbnRpZmllclxyXG4gKiBAcmV0dXJuICAgICB7b2JlamVjdCB8IG51bGx9ICBUaGUgcGxheWVyIGluc3RhbmNlLlxyXG4gKi9cclxuT3ZlblBsYXllclNESy5nZXRQbGF5ZXJCeUNvbnRhaW5lcklkID0gZnVuY3Rpb24oY29udGFpbmVySWQpIHtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXllckxpc3QubGVuZ3RoOyBpICsrKSB7XHJcblxyXG4gICAgICAgIGlmIChwbGF5ZXJMaXN0W2ldLmdldENvbnRhaW5lcklkKCkgPT09IGNvbnRhaW5lcklkKSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcGxheWVyTGlzdFtpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgcGxheWVyIGluc3RhbmNlIGJ5IGluZGV4LlxyXG4gKlxyXG4gKiBAcGFyYW0gICAgICB7bnVtYmVyfSAgaW5kZXggICBUaGUgaW5kZXhcclxuICogQHJldHVybiAgICAge29iamVjdCB8IG51bGx9ICBUaGUgcGxheWVyIGluc3RhbmNlLlxyXG4gKi9cclxuT3ZlblBsYXllclNESy5nZXRQbGF5ZXJCeUluZGV4ID0gZnVuY3Rpb24oaW5kZXgpIHtcclxuXHJcbiAgICBjb25zdCBwbGF5ZXJJbnN0YW5jZSA9IHBsYXllckxpc3RbaW5kZXhdO1xyXG5cclxuICAgIGlmIChwbGF5ZXJJbnN0YW5jZSkge1xyXG5cclxuICAgICAgICByZXR1cm4gcGxheWVySW5zdGFuY2U7XHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgdGhlIHBsYXllciBpbnN0YW5jZSBieSBwbGF5ZXJJZC5cclxuICpcclxuICogQHBhcmFtICAgICAge3BsYXllcklkfSAgaWRcclxuICogQHJldHVybiAgICAge251bGx9XHJcbiAqL1xyXG5PdmVuUGxheWVyU0RLLnJlbW92ZVBsYXllciA9IGZ1bmN0aW9uKHBsYXllcklkKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXllckxpc3QubGVuZ3RoOyBpICsrKSB7XHJcblxyXG4gICAgICAgIGlmIChwbGF5ZXJMaXN0W2ldLmdldENvbnRhaW5lcklkKCkgPT09IHBsYXllcklkKSB7XHJcblxyXG4gICAgICAgICAgICBwbGF5ZXJMaXN0LnNwbGljZShpLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdlbmVyYXRlIHdlYnJ0YyBzb3VyY2UgZm9yIHBsYXllciBzb3VyY2UgdHlwZS5cclxuICpcclxuICogQHBhcmFtICAgICAge09iamVjdCB8IEFycmF5fSAgc291cmNlICAgd2VicnRjIHNvdXJjZVxyXG4gKiBAcmV0dXJuICAgICB7QXJyYXl9ICBQbGF5ZXIgc291cmNlIE9iamVjdC5cclxuICovXHJcbk92ZW5QbGF5ZXJTREsuZ2VuZXJhdGVXZWJydGNVcmxzID0gZnVuY3Rpb24oc291cmNlcykge1xyXG4gICAgcmV0dXJuIChfLmlzQXJyYXkoc291cmNlcykgPyBzb3VyY2VzIDogW3NvdXJjZXNdKS5tYXAoZnVuY3Rpb24oc291cmNlLCBpbmRleCl7XHJcbiAgICAgICAgaWYoc291cmNlLmhvc3QgJiYgaXNXZWJSVEMoc291cmNlLmhvc3QpICYmIHNvdXJjZS5hcHBsaWNhdGlvbiAmJiBzb3VyY2Uuc3RyZWFtKXtcclxuICAgICAgICAgICAgcmV0dXJuIHtmaWxlIDogc291cmNlLmhvc3QgKyBcIi9cIiArIHNvdXJjZS5hcHBsaWNhdGlvbiArIFwiL1wiICsgc291cmNlLnN0cmVhbSwgdHlwZSA6IFwid2VicnRjXCIsIGxhYmVsIDogc291cmNlLmxhYmVsID8gc291cmNlLmxhYmVsIDogXCJ3ZWJydGMtXCIrKGluZGV4KzEpIH07XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogV2hldGhlciBzaG93IHRoZSBwbGF5ZXIgY29yZSBsb2cgb3Igbm90LlxyXG4gKlxyXG4gKiBAcGFyYW0gICAgICB7Ym9vbGVhbn0gIGJvb2xlYW4gICBydW4gZGVidWcgbW9kZSBvciBub3QuXHJcbiAqIEByZXR1cm4gICAgIHtib29sZWFufSAgcnVuIGRlYnVnIG1vZGUgb3Igbm90LlxyXG4gKi9cclxuT3ZlblBsYXllclNESy5kZWJ1ZyA9IGZ1bmN0aW9uKGlzRGVidWdNb2RlKSB7XHJcbiAgICBpZihpc0RlYnVnTW9kZSl7XHJcbiAgICAgICAgd2luZG93Lk92ZW5QbGF5ZXJDb25zb2xlID0ge2xvZyA6IHdpbmRvd1snY29uc29sZSddWydsb2cnXX07XHJcbiAgICB9ZWxzZXtcclxuICAgICAgICB3aW5kb3cuT3ZlblBsYXllckNvbnNvbGUgPSB7bG9nIDogIGZ1bmN0aW9uKCl7fX07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaXNEZWJ1Z01vZGU7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBPdmVuUGxheWVyU0RLO1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDguIDI0Li5cclxuICovXHJcblxyXG5leHBvcnQgY29uc3QgZ2V0QnJvd3Nlckxhbmd1YWdlID0gZnVuY3Rpb24oKXtcclxuICAgIGxldCBuYXYgPSB3aW5kb3cubmF2aWdhdG9yLFxyXG4gICAgICAgIGJyb3dzZXJMYW5ndWFnZVByb3BlcnR5S2V5cyA9IFsnbGFuZ3VhZ2UnLCAnYnJvd3Nlckxhbmd1YWdlJywgJ3N5c3RlbUxhbmd1YWdlJywgJ3VzZXJMYW5ndWFnZSddLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgbGFuZ3VhZ2U7XHJcblxyXG4gICAgLy8gc3VwcG9ydCBmb3IgSFRNTCA1LjEgXCJuYXZpZ2F0b3IubGFuZ3VhZ2VzXCJcclxuICAgIGlmIChBcnJheS5pc0FycmF5KG5hdi5sYW5ndWFnZXMpKSB7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IG5hdi5sYW5ndWFnZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGFuZ3VhZ2UgPSBuYXYubGFuZ3VhZ2VzW2ldO1xyXG4gICAgICAgICAgICBpZiAobGFuZ3VhZ2UgJiYgbGFuZ3VhZ2UubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbGFuZ3VhZ2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc3VwcG9ydCBmb3Igb3RoZXIgd2VsbCBrbm93biBwcm9wZXJ0aWVzIGluIGJyb3dzZXJzXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgYnJvd3Nlckxhbmd1YWdlUHJvcGVydHlLZXlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGFuZ3VhZ2UgPSBuYXZbYnJvd3Nlckxhbmd1YWdlUHJvcGVydHlLZXlzW2ldXTtcclxuICAgICAgICBpZiAobGFuZ3VhZ2UgJiYgbGFuZ3VhZ2UubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsYW5ndWFnZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBhbmFsVXNlckFnZW50ID0gZnVuY3Rpb24oKXtcclxuICAgIGxldCB1bmtub3duID0gJy0nO1xyXG5cclxuICAgIC8vIHNjcmVlblxyXG4gICAgbGV0IHNjcmVlblNpemUgPSAnJztcclxuICAgIGlmIChzY3JlZW4ud2lkdGgpIHtcclxuICAgICAgICBsZXQgd2lkdGggPSAoc2NyZWVuLndpZHRoKSA/IHNjcmVlbi53aWR0aCA6ICcnO1xyXG4gICAgICAgIGxldCBoZWlnaHQgPSAoc2NyZWVuLmhlaWdodCkgPyBzY3JlZW4uaGVpZ2h0IDogJyc7XHJcbiAgICAgICAgc2NyZWVuU2l6ZSArPSAnJyArIHdpZHRoICsgXCIgeCBcIiArIGhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBicm93c2VyXHJcbiAgICBsZXQgblZlciA9IG5hdmlnYXRvci5hcHBWZXJzaW9uO1xyXG4gICAgbGV0IG5BZ3QgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xyXG4gICAgbGV0IGJyb3dzZXIgPSBuYXZpZ2F0b3IuYXBwTmFtZTtcclxuICAgIGxldCB2ZXJzaW9uID0gJycgKyBwYXJzZUZsb2F0KG5hdmlnYXRvci5hcHBWZXJzaW9uKTtcclxuICAgIGxldCBtYWpvclZlcnNpb24gPSBwYXJzZUludChuYXZpZ2F0b3IuYXBwVmVyc2lvbiwgMTApO1xyXG4gICAgbGV0IGlzV2VidmlldyA9IGZhbHNlO1xyXG4gICAgbGV0IG5hbWVPZmZzZXQsIHZlck9mZnNldCwgaXg7XHJcblxyXG4gICAgLy8gT3BlcmFcclxuICAgIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdPcGVyYScpKSAhPSAtMSkge1xyXG4gICAgICAgIGJyb3dzZXIgPSAnT3BlcmEnO1xyXG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA2KTtcclxuICAgICAgICBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignVmVyc2lvbicpKSAhPSAtMSkge1xyXG4gICAgICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgOCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gT3BlcmEgTmV4dFxyXG4gICAgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ09QUicpKSAhPSAtMSkge1xyXG4gICAgICAgIGJyb3dzZXIgPSAnT3BlcmEnO1xyXG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA0KTtcclxuICAgIH1cclxuICAgIC8v7IK87ISxIOu4jOudvOyasOyggFxyXG4gICAgZWxzZSBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignU2Ftc3VuZ0Jyb3dzZXInKSkgIT0gLTEpIHtcclxuICAgICAgICBicm93c2VyID0gJ1NhbXN1bmdCcm93c2VyJztcclxuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgMTUpO1xyXG4gICAgfVxyXG4gICAgLy8gRWRnZVxyXG4gICAgZWxzZSBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignRWRnZScpKSAhPSAtMSkge1xyXG4gICAgICAgIGJyb3dzZXIgPSAnTWljcm9zb2Z0IEVkZ2UnO1xyXG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA1KTtcclxuICAgIH1cclxuICAgIC8vIE1TSUVcclxuICAgIGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ01TSUUnKSkgIT0gLTEpIHtcclxuICAgICAgICBicm93c2VyID0gJ01pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3Jlcic7XHJcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDUpO1xyXG5cclxuXHJcbiAgICAgICAgLy93aW43IElFMTEgdXNlckFnZW50IGlzIHVnbHkuLi4uXHJcbiAgICAgICAgaWYoIChuQWd0LmluZGV4T2YoJ1RyaWRlbnQvJykgIT09IC0xKSAmJiAobkFndC5pbmRleE9mKCdydjonKSAhPT0gLTEpICApe1xyXG4gICAgICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcobkFndC5pbmRleE9mKCdydjonKSArIDMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIENocm9tZVxyXG4gICAgZWxzZSBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignQ2hyb21lJykpICE9IC0xKSB7XHJcbiAgICAgICAgYnJvd3NlciA9ICdDaHJvbWUnO1xyXG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA3KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ0NyaU9TJykpICE9IC0xKSB7ICAgLy9pcGhvbmUgLSBjaHJvbWVcclxuICAgICAgICBicm93c2VyID0gJ0Nocm9tZSc7XHJcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDYpO1xyXG4gICAgfVxyXG4gICAgLy8gRmlyZWZveFxyXG4gICAgZWxzZSBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignRmlyZWZveCcpKSAhPSAtMSkge1xyXG4gICAgICAgIGJyb3dzZXIgPSAnRmlyZWZveCc7XHJcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDgpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignRnhpT1MnKSkgIT0gLTEpIHtcclxuICAgICAgICBicm93c2VyID0gJ0ZpcmVmb3gnO1xyXG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA2KTtcclxuICAgIH1cclxuICAgIC8vIFNhZmFyaVxyXG4gICAgZWxzZSBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignU2FmYXJpJykpICE9IC0xKSB7XHJcbiAgICAgICAgYnJvd3NlciA9ICdTYWZhcmknO1xyXG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA3KTtcclxuICAgICAgICBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignVmVyc2lvbicpKSAhPSAtMSkge1xyXG4gICAgICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgOCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyBNU0lFIDExK1xyXG4gICAgZWxzZSBpZiAobkFndC5pbmRleE9mKCdUcmlkZW50LycpICE9PSAtMSkge1xyXG4gICAgICAgIGJyb3dzZXIgPSAnTWljcm9zb2Z0IEludGVybmV0IEV4cGxvcmVyJztcclxuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcobkFndC5pbmRleE9mKCdydjonKSArIDMpO1xyXG4gICAgfVxyXG4gICAgLy8gT3RoZXIgYnJvd3NlcnNcclxuICAgIGVsc2UgaWYgKChuYW1lT2Zmc2V0ID0gbkFndC5sYXN0SW5kZXhPZignICcpICsgMSkgPCAodmVyT2Zmc2V0ID0gbkFndC5sYXN0SW5kZXhPZignLycpKSkge1xyXG4gICAgICAgIGJyb3dzZXIgPSBuQWd0LnN1YnN0cmluZyhuYW1lT2Zmc2V0LCB2ZXJPZmZzZXQpO1xyXG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyAxKTtcclxuICAgICAgICBpZiAoYnJvd3Nlci50b0xvd2VyQ2FzZSgpID09IGJyb3dzZXIudG9VcHBlckNhc2UoKSkge1xyXG4gICAgICAgICAgICBicm93c2VyID0gbmF2aWdhdG9yLmFwcE5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYobkFndC5pbmRleE9mKCcgd3YnKSA+IDApe1xyXG4gICAgICAgIGlzV2VidmlldyA9IHRydWU7XHJcbiAgICB9XHJcbiAgICAvLyB0cmltIHRoZSB2ZXJzaW9uIHN0cmluZ1xyXG4gICAgaWYgKChpeCA9IHZlcnNpb24uaW5kZXhPZignOycpKSAhPSAtMSkgdmVyc2lvbiA9IHZlcnNpb24uc3Vic3RyaW5nKDAsIGl4KTtcclxuICAgIGlmICgoaXggPSB2ZXJzaW9uLmluZGV4T2YoJyAnKSkgIT0gLTEpIHZlcnNpb24gPSB2ZXJzaW9uLnN1YnN0cmluZygwLCBpeCk7XHJcbiAgICBpZiAoKGl4ID0gdmVyc2lvbi5pbmRleE9mKCcpJykpICE9IC0xKSB2ZXJzaW9uID0gdmVyc2lvbi5zdWJzdHJpbmcoMCwgaXgpO1xyXG5cclxuICAgIG1ham9yVmVyc2lvbiA9IHBhcnNlSW50KCcnICsgdmVyc2lvbiwgMTApO1xyXG4gICAgaWYgKGlzTmFOKG1ham9yVmVyc2lvbikpIHtcclxuICAgICAgICB2ZXJzaW9uID0gJycgKyBwYXJzZUZsb2F0KG5hdmlnYXRvci5hcHBWZXJzaW9uKTtcclxuICAgICAgICBtYWpvclZlcnNpb24gPSBwYXJzZUludChuYXZpZ2F0b3IuYXBwVmVyc2lvbiwgMTApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIG1vYmlsZSB2ZXJzaW9uXHJcbiAgICB2YXIgbW9iaWxlID0gL01vYmlsZXxtaW5pfEZlbm5lY3xBbmRyb2lkfGlQKGFkfG9kfGhvbmUpLy50ZXN0KG5WZXIpO1xyXG5cclxuICAgIC8vIGNvb2tpZVxyXG4gICAgdmFyIGNvb2tpZUVuYWJsZWQgPSAobmF2aWdhdG9yLmNvb2tpZUVuYWJsZWQpID8gdHJ1ZSA6IGZhbHNlO1xyXG5cclxuICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yLmNvb2tpZUVuYWJsZWQgPT0gJ3VuZGVmaW5lZCcgJiYgIWNvb2tpZUVuYWJsZWQpIHtcclxuICAgICAgICBkb2N1bWVudC5jb29raWUgPSAndGVzdGNvb2tpZSc7XHJcbiAgICAgICAgY29va2llRW5hYmxlZCA9IChkb2N1bWVudC5jb29raWUuaW5kZXhPZigndGVzdGNvb2tpZScpICE9IC0xKSA/IHRydWUgOiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzeXN0ZW1cclxuICAgIHZhciBvcyA9IHVua25vd247XHJcbiAgICB2YXIgY2xpZW50U3RyaW5ncyA9IFtcclxuICAgICAgICB7czonV2luZG93cyAxMCcsIHI6LyhXaW5kb3dzIDEwLjB8V2luZG93cyBOVCAxMC4wKS99LFxyXG4gICAgICAgIHtzOidXaW5kb3dzIDguMScsIHI6LyhXaW5kb3dzIDguMXxXaW5kb3dzIE5UIDYuMykvfSxcclxuICAgICAgICB7czonV2luZG93cyA4JywgcjovKFdpbmRvd3MgOHxXaW5kb3dzIE5UIDYuMikvfSxcclxuICAgICAgICB7czonV2luZG93cyA3JywgcjovKFdpbmRvd3MgN3xXaW5kb3dzIE5UIDYuMSkvfSxcclxuICAgICAgICB7czonV2luZG93cyBWaXN0YScsIHI6L1dpbmRvd3MgTlQgNi4wL30sXHJcbiAgICAgICAge3M6J1dpbmRvd3MgU2VydmVyIDIwMDMnLCByOi9XaW5kb3dzIE5UIDUuMi99LFxyXG4gICAgICAgIHtzOidXaW5kb3dzIFhQJywgcjovKFdpbmRvd3MgTlQgNS4xfFdpbmRvd3MgWFApL30sXHJcbiAgICAgICAge3M6J1dpbmRvd3MgMjAwMCcsIHI6LyhXaW5kb3dzIE5UIDUuMHxXaW5kb3dzIDIwMDApL30sXHJcbiAgICAgICAge3M6J1dpbmRvd3MgTUUnLCByOi8oV2luIDl4IDQuOTB8V2luZG93cyBNRSkvfSxcclxuICAgICAgICB7czonV2luZG93cyA5OCcsIHI6LyhXaW5kb3dzIDk4fFdpbjk4KS99LFxyXG4gICAgICAgIHtzOidXaW5kb3dzIDk1JywgcjovKFdpbmRvd3MgOTV8V2luOTV8V2luZG93c185NSkvfSxcclxuICAgICAgICB7czonV2luZG93cyBOVCA0LjAnLCByOi8oV2luZG93cyBOVCA0LjB8V2luTlQ0LjB8V2luTlR8V2luZG93cyBOVCkvfSxcclxuICAgICAgICB7czonV2luZG93cyBDRScsIHI6L1dpbmRvd3MgQ0UvfSxcclxuICAgICAgICB7czonV2luZG93cyAzLjExJywgcjovV2luMTYvfSxcclxuICAgICAgICB7czonQW5kcm9pZCcsIHI6L0FuZHJvaWQvfSxcclxuICAgICAgICB7czonT3BlbiBCU0QnLCByOi9PcGVuQlNEL30sXHJcbiAgICAgICAge3M6J1N1biBPUycsIHI6L1N1bk9TL30sXHJcbiAgICAgICAge3M6J0xpbnV4JywgcjovKExpbnV4fFgxMSkvfSxcclxuICAgICAgICB7czonaU9TJywgcjovKGlQaG9uZXxpUGFkfGlQb2QpL30sXHJcbiAgICAgICAge3M6J01hYyBPUyBYSScsIHI6L01hYyBPUyBYIDExL30sXHJcbiAgICAgICAge3M6J01hYyBPUyBYJywgcjovTWFjIE9TIFggMTAvfSxcclxuICAgICAgICB7czonTWFjIE9TJywgcjovKE1hY1BQQ3xNYWNJbnRlbHxNYWNfUG93ZXJQQ3xNYWNpbnRvc2gpL30sXHJcbiAgICAgICAge3M6J1FOWCcsIHI6L1FOWC99LFxyXG4gICAgICAgIHtzOidVTklYJywgcjovVU5JWC99LFxyXG4gICAgICAgIHtzOidCZU9TJywgcjovQmVPUy99LFxyXG4gICAgICAgIHtzOidPUy8yJywgcjovT1NcXC8yL30sXHJcbiAgICAgICAge3M6J1NlYXJjaCBCb3QnLCByOi8obnVoa3xHb29nbGVib3R8WWFtbXlib3R8T3BlbmJvdHxTbHVycHxNU05Cb3R8QXNrIEplZXZlc1xcL1Rlb21hfGlhX2FyY2hpdmVyKS99XHJcbiAgICBdO1xyXG4gICAgZm9yICh2YXIgaWQgaW4gY2xpZW50U3RyaW5ncykge1xyXG4gICAgICAgIHZhciBjcyA9IGNsaWVudFN0cmluZ3NbaWRdO1xyXG4gICAgICAgIGlmIChjcy5yLnRlc3QobkFndCkpIHtcclxuICAgICAgICAgICAgb3MgPSBjcy5zO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG9zVmVyc2lvbiA9IHVua25vd247XHJcblxyXG4gICAgaWYgKC9XaW5kb3dzLy50ZXN0KG9zKSkge1xyXG4gICAgICAgIG9zVmVyc2lvbiA9IC9XaW5kb3dzICguKikvLmV4ZWMob3MpWzFdO1xyXG4gICAgICAgIG9zID0gJ1dpbmRvd3MnO1xyXG4gICAgfVxyXG5cclxuICAgIHN3aXRjaCAob3MpIHtcclxuICAgICAgICBjYXNlICdNYWMgT1MgWEknOlxyXG4gICAgICAgICAgICBvc1ZlcnNpb24gPSAvTWFjIE9TIFggKDExW1xcLlxcX1xcZF0rKS8uZXhlYyhuQWd0KVsxXTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgJ01hYyBPUyBYJzpcclxuICAgICAgICAgICAgb3NWZXJzaW9uID0gL01hYyBPUyBYICgxMFtcXC5cXF9cXGRdKykvLmV4ZWMobkFndClbMV07XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlICdBbmRyb2lkJzpcclxuICAgICAgICAgICAgb3NWZXJzaW9uID0gL0FuZHJvaWQgKFtcXC5cXF9cXGRdKykvLmV4ZWMobkFndClbMV07XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICBjYXNlICdpT1MnOlxyXG4gICAgICAgICAgICBvc1ZlcnNpb24gPSAvT1MgKFxcZCspXyhcXGQrKV8/KFxcZCspPy8uZXhlYyhuVmVyKTtcclxuICAgICAgICAgICAgb3NWZXJzaW9uID0gb3NWZXJzaW9uWzFdICsgJy4nICsgb3NWZXJzaW9uWzJdICsgJy4nICsgKG9zVmVyc2lvblszXSB8IDApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHNjcmVlbjogc2NyZWVuU2l6ZSxcclxuICAgICAgICBicm93c2VyOiBicm93c2VyLFxyXG4gICAgICAgIGJyb3dzZXJWZXJzaW9uOiB2ZXJzaW9uLFxyXG4gICAgICAgIGJyb3dzZXJNYWpvclZlcnNpb246IG1ham9yVmVyc2lvbixcclxuICAgICAgICBtb2JpbGU6IG1vYmlsZSxcclxuICAgICAgICB1YSA6IG5BZ3QsXHJcbiAgICAgICAgb3M6IG9zLFxyXG4gICAgICAgIG9zVmVyc2lvbjogb3NWZXJzaW9uLFxyXG4gICAgICAgIGNvb2tpZXM6IGNvb2tpZUVuYWJsZWRcclxuICAgIH07XHJcbn07XHJcbiIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgMjAxMyB2dHQuanMgQ29udHJpYnV0b3JzXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcbmxldCBWVFRDdWUgPSB3aW5kb3cuVlRUQ3VlO1xyXG5cclxudmFyIGF1dG9LZXl3b3JkID0gXCJhdXRvXCI7XHJcbnZhciBkaXJlY3Rpb25TZXR0aW5nID0ge1xyXG4gICAgXCJcIjogdHJ1ZSxcclxuICAgIFwibHJcIjogdHJ1ZSxcclxuICAgIFwicmxcIjogdHJ1ZVxyXG59O1xyXG52YXIgYWxpZ25TZXR0aW5nID0ge1xyXG4gICAgXCJzdGFydFwiOiB0cnVlLFxyXG4gICAgXCJtaWRkbGVcIjogdHJ1ZSxcclxuICAgIFwiZW5kXCI6IHRydWUsXHJcbiAgICBcImxlZnRcIjogdHJ1ZSxcclxuICAgIFwicmlnaHRcIjogdHJ1ZVxyXG59O1xyXG5cclxuZnVuY3Rpb24gZmluZERpcmVjdGlvblNldHRpbmcodmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB2YXIgZGlyID0gZGlyZWN0aW9uU2V0dGluZ1t2YWx1ZS50b0xvd2VyQ2FzZSgpXTtcclxuICAgIHJldHVybiBkaXIgPyB2YWx1ZS50b0xvd2VyQ2FzZSgpIDogZmFsc2U7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpbmRBbGlnblNldHRpbmcodmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB2YXIgYWxpZ24gPSBhbGlnblNldHRpbmdbdmFsdWUudG9Mb3dlckNhc2UoKV07XHJcbiAgICByZXR1cm4gYWxpZ24gPyB2YWx1ZS50b0xvd2VyQ2FzZSgpIDogZmFsc2U7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGV4dGVuZChvYmopIHtcclxuICAgIHZhciBpID0gMTtcclxuICAgIGZvciAoOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGNvYmogPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBjb2JqKSB7XHJcbiAgICAgICAgICAgIG9ialtwXSA9IGNvYmpbcF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvYmo7XHJcbn1cclxuaWYoIVZUVEN1ZSl7XHJcbiAgICBWVFRDdWUgPSBmdW5jdGlvbiAoc3RhcnRUaW1lLCBlbmRUaW1lLCB0ZXh0KSB7XHJcbiAgICAgICAgdmFyIGN1ZSA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGlzSUU4ID0gKC9NU0lFXFxzOFxcLjAvKS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xyXG4gICAgICAgIHZhciBiYXNlT2JqID0ge307XHJcblxyXG4gICAgICAgIGlmIChpc0lFOCkge1xyXG4gICAgICAgICAgICBjdWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjdXN0b20nKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBiYXNlT2JqLmVudW1lcmFibGUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2hpbSBpbXBsZW1lbnRhdGlvbiBzcGVjaWZpYyBwcm9wZXJ0aWVzLiBUaGVzZSBwcm9wZXJ0aWVzIGFyZSBub3QgaW5cclxuICAgICAgICAgKiB0aGUgc3BlYy5cclxuICAgICAgICAgKi9cclxuXHJcbiAgICAgICAgICAgIC8vIExldHMgdXMga25vdyB3aGVuIHRoZSBWVFRDdWUncyBkYXRhIGhhcyBjaGFuZ2VkIGluIHN1Y2ggYSB3YXkgdGhhdCB3ZSBuZWVkXHJcbiAgICAgICAgICAgIC8vIHRvIHJlY29tcHV0ZSBpdHMgZGlzcGxheSBzdGF0ZS4gVGhpcyBsZXRzIHVzIGNvbXB1dGUgaXRzIGRpc3BsYXkgc3RhdGVcclxuICAgICAgICAgICAgLy8gbGF6aWx5LlxyXG4gICAgICAgIGN1ZS5oYXNCZWVuUmVzZXQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVlRUQ3VlIGFuZCBUZXh0VHJhY2tDdWUgcHJvcGVydGllc1xyXG4gICAgICAgICAqIGh0dHA6Ly9kZXYudzMub3JnL2h0bWw1L3dlYnZ0dC8jdnR0Y3VlLWludGVyZmFjZVxyXG4gICAgICAgICAqL1xyXG5cclxuICAgICAgICB2YXIgX2lkID0gXCJcIjtcclxuICAgICAgICB2YXIgX3BhdXNlT25FeGl0ID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIF9zdGFydFRpbWUgPSBzdGFydFRpbWU7XHJcbiAgICAgICAgdmFyIF9lbmRUaW1lID0gZW5kVGltZTtcclxuICAgICAgICB2YXIgX3RleHQgPSB0ZXh0O1xyXG4gICAgICAgIHZhciBfcmVnaW9uID0gbnVsbDtcclxuICAgICAgICB2YXIgX3ZlcnRpY2FsID0gXCJcIjtcclxuICAgICAgICB2YXIgX3NuYXBUb0xpbmVzID0gdHJ1ZTtcclxuICAgICAgICB2YXIgX2xpbmUgPSBcImF1dG9cIjtcclxuICAgICAgICB2YXIgX2xpbmVBbGlnbiA9IFwic3RhcnRcIjtcclxuICAgICAgICB2YXIgX3Bvc2l0aW9uID0gNTA7XHJcbiAgICAgICAgdmFyIF9wb3NpdGlvbkFsaWduID0gXCJtaWRkbGVcIjtcclxuICAgICAgICB2YXIgX3NpemUgPSA1MDtcclxuICAgICAgICB2YXIgX2FsaWduID0gXCJtaWRkbGVcIjtcclxuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcclxuICAgICAgICAgICAgXCJpZFwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9pZDtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2lkID0gXCJcIiArIHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXHJcbiAgICAgICAgICAgIFwicGF1c2VPbkV4aXRcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcGF1c2VPbkV4aXQ7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9wYXVzZU9uRXhpdCA9ICEhdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcclxuICAgICAgICAgICAgXCJzdGFydFRpbWVcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfc3RhcnRUaW1lO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdGFydCB0aW1lIG11c3QgYmUgc2V0IHRvIGEgbnVtYmVyLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgX3N0YXJ0VGltZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxyXG4gICAgICAgICAgICBcImVuZFRpbWVcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfZW5kVGltZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRW5kIHRpbWUgbXVzdCBiZSBzZXQgdG8gYSBudW1iZXIuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBfZW5kVGltZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxyXG4gICAgICAgICAgICBcInRleHRcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGV4dDtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RleHQgPSBcIlwiICsgdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXHJcbiAgICAgICAgICAgIFwicmVnaW9uXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3JlZ2lvbjtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3JlZ2lvbiA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxyXG4gICAgICAgICAgICBcInZlcnRpY2FsXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZlcnRpY2FsO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2V0dGluZyA9IGZpbmREaXJlY3Rpb25TZXR0aW5nKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBIYXZlIHRvIGNoZWNrIGZvciBmYWxzZSBiZWNhdXNlIHRoZSBzZXR0aW5nIGFuIGJlIGFuIGVtcHR5IHN0cmluZy5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2V0dGluZyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKFwiQW4gaW52YWxpZCBvciBpbGxlZ2FsIHN0cmluZyB3YXMgc3BlY2lmaWVkLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgX3ZlcnRpY2FsID0gc2V0dGluZztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcclxuICAgICAgICAgICAgXCJzbmFwVG9MaW5lc1wiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9zbmFwVG9MaW5lcztcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3NuYXBUb0xpbmVzID0gISF2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcclxuICAgICAgICAgICAgXCJsaW5lXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2xpbmU7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwibnVtYmVyXCIgJiYgdmFsdWUgIT09IGF1dG9LZXl3b3JkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihcIkFuIGludmFsaWQgbnVtYmVyIG9yIGlsbGVnYWwgc3RyaW5nIHdhcyBzcGVjaWZpZWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBfbGluZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxyXG4gICAgICAgICAgICBcImxpbmVBbGlnblwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9saW5lQWxpZ247XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZXR0aW5nID0gZmluZEFsaWduU2V0dGluZyh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzZXR0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihcIkFuIGludmFsaWQgb3IgaWxsZWdhbCBzdHJpbmcgd2FzIHNwZWNpZmllZC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF9saW5lQWxpZ24gPSBzZXR0aW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxyXG4gICAgICAgICAgICBcInBvc2l0aW9uXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3Bvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPCAwIHx8IHZhbHVlID4gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBvc2l0aW9uIG11c3QgYmUgYmV0d2VlbiAwIGFuZCAxMDAuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBfcG9zaXRpb24gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcclxuICAgICAgICAgICAgXCJwb3NpdGlvbkFsaWduXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3Bvc2l0aW9uQWxpZ247XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzZXR0aW5nID0gZmluZEFsaWduU2V0dGluZyh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzZXR0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihcIkFuIGludmFsaWQgb3IgaWxsZWdhbCBzdHJpbmcgd2FzIHNwZWNpZmllZC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF9wb3NpdGlvbkFsaWduID0gc2V0dGluZztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcclxuICAgICAgICAgICAgXCJzaXplXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3NpemU7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA8IDAgfHwgdmFsdWUgPiAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2l6ZSBtdXN0IGJlIGJldHdlZW4gMCBhbmQgMTAwLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgX3NpemUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcclxuICAgICAgICAgICAgXCJhbGlnblwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9hbGlnbjtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNldHRpbmcgPSBmaW5kQWxpZ25TZXR0aW5nKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXNldHRpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKFwiQW4gaW52YWxpZCBvciBpbGxlZ2FsIHN0cmluZyB3YXMgc3BlY2lmaWVkLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgX2FsaWduID0gc2V0dGluZztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT3RoZXIgPHRyYWNrPiBzcGVjIGRlZmluZWQgcHJvcGVydGllc1xyXG4gICAgICAgICAqL1xyXG5cclxuICAgICAgICAgICAgLy8gaHR0cDovL3d3dy53aGF0d2cub3JnL3NwZWNzL3dlYi1hcHBzL2N1cnJlbnQtd29yay9tdWx0aXBhZ2UvdGhlLXZpZGVvLWVsZW1lbnQuaHRtbCN0ZXh0LXRyYWNrLWN1ZS1kaXNwbGF5LXN0YXRlXHJcbiAgICAgICAgY3VlLmRpc3BsYXlTdGF0ZSA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgaWYgKGlzSUU4KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVlRUQ3VlIG1ldGhvZHNcclxuICAgICAqL1xyXG5cclxuICAgIFZUVEN1ZS5wcm90b3R5cGUuZ2V0Q3VlQXNIVE1MID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gQXNzdW1lIFdlYlZUVC5jb252ZXJ0Q3VlVG9ET01UcmVlIGlzIG9uIHRoZSBnbG9iYWwuXHJcbiAgICAgICAgcmV0dXJuIFdlYlZUVC5jb252ZXJ0Q3VlVG9ET01UcmVlKHdpbmRvdywgdGhpcy50ZXh0KTtcclxuICAgIH07XHJcblxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVlRUQ3VlOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMjMuLlxyXG4gKi9cclxuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICBJdCB3YXMgcmVwbGFjZSBqcXVlcnkncyBzZWxlY3Rvci4gSXQgT2Z0ZW4gdXNlZCBieSBPdmVuVGVtcGxhdGUuICgvdmlldy9lbmdpbmUvT3ZlblRlbXBsYXRlLmpzKVxyXG4gKiBAcGFyYW0gICBzZWxlY3Rvck9yRWxlbWVudCAgc3RyaW5nIG9yIGVsZW1lbnRcclxuICpcclxuICogKi9cclxuXHJcblxyXG5jb25zdCBMYSQgPSBmdW5jdGlvbihzZWxlY3Rvck9yRWxlbWVudCl7XHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICBjb25zdCByZXR1cm5Ob2RlID0gZnVuY3Rpb24oJGVsZW1lbnQgLCBzZWxlY3Rvcil7XHJcbiAgICAgICAgbGV0IG5vZGVMaXN0ID0gICRlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG4gICAgICAgIGlmKG5vZGVMaXN0Lmxlbmd0aCA+IDEpe1xyXG4gICAgICAgICAgICByZXR1cm4gbm9kZUxpc3Q7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlTGlzdFswXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgJGVsZW1lbnQgPSBcIlwiO1xyXG5cclxuICAgIGlmKCBfLmlzRWxlbWVudChzZWxlY3Rvck9yRWxlbWVudCkgfHwgXy5ldmVyeShzZWxlY3Rvck9yRWxlbWVudCwgZnVuY3Rpb24oaXRlbSl7cmV0dXJuIF8uaXNFbGVtZW50KGl0ZW0pfSkpe1xyXG4gICAgICAgICRlbGVtZW50ID0gc2VsZWN0b3JPckVsZW1lbnQ7XHJcbiAgICB9ZWxzZSBpZihzZWxlY3Rvck9yRWxlbWVudCA9PT0gXCJkb2N1bWVudFwiKXtcclxuICAgICAgICAkZWxlbWVudCA9IGRvY3VtZW50O1xyXG4gICAgfWVsc2UgaWYoc2VsZWN0b3JPckVsZW1lbnQgPT09IFwid2luZG93XCIpe1xyXG4gICAgICAgICRlbGVtZW50ID0gd2luZG93O1xyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgJGVsZW1lbnQgPSByZXR1cm5Ob2RlKGRvY3VtZW50LCBzZWxlY3Rvck9yRWxlbWVudCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGlmKCEkZWxlbWVudCl7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLypFRkZFQ1RTKi9cclxuXHJcbiAgICB0aGF0LnNob3cgPSAoKSA9PntcclxuICAgICAgICAkZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5oaWRlID0gKCkgPT57XHJcbiAgICAgICAgJGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIH07XHJcblxyXG4gICAgLypFTEVNRU5UUyovXHJcblxyXG4gICAgdGhhdC5hZGRDbGFzcyA9IChuYW1lKSA9PntcclxuICAgICAgICBpZigkZWxlbWVudC5jbGFzc0xpc3Qpe1xyXG4gICAgICAgICAgICAkZWxlbWVudC5jbGFzc0xpc3QuYWRkKG5hbWUpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBsZXQgY2xhc3NOYW1lcyA9ICRlbGVtZW50LmNsYXNzTmFtZS5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgICAgIGlmKGNsYXNzTmFtZXMuaW5kZXhPZihuYW1lKSA9PT0gLTEpe1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuY2xhc3NOYW1lICs9IFwiIFwiICsgbmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5hZnRlciA9IChodG1sU3RyaW5nKSA9PiB7XHJcbiAgICAgICAgJGVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmVuZCcsIGh0bWxTdHJpbmcpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmFwcGVuZCA9IChodG1sU3RyaW5nKSA9PiB7XHJcbiAgICAgICAgJGVsZW1lbnQuYXBwZW5kQ2hpbGQoaHRtbFN0cmluZyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuYmVmb3JlID0gKGh0bWxTdHJpbmcpID0+IHtcclxuICAgICAgICAkZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWJlZ2luJywgaHRtbFN0cmluZyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuY2hpbGRyZW4gPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICRlbGVtZW50LmNoaWxkcmVuIHx8IFtdO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL1RoZSBjb250YWlucygpIG1ldGhvZCByZXR1cm5zIGEgQm9vbGVhbiB2YWx1ZSBpbmRpY2F0aW5nIHdoZXRoZXIgYSBub2RlIGlzIGEgZGVzY2VuZGFudCBvZiBhIHNwZWNpZmllZCBub2RlLlxyXG4gICAgLy9BIGRlc2NlbmRhbnQgY2FuIGJlIGEgY2hpbGQsIGdyYW5kY2hpbGQsIGdyZWF0LWdyYW5kY2hpbGQsIGFuZCBzbyBvbi5cclxuICAgIHRoYXQuY29udGFpbnMgPSAoZWxDaGlsZCkgPT4ge1xyXG4gICAgICAgIHJldHVybiAkZWxlbWVudCAhPT0gZWxDaGlsZCAmJiAkZWxlbWVudC5jb250YWlucyhlbENoaWxkKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5lbXB0eSA9ICgpID0+IHtcclxuICAgICAgICAkZWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdGhhdC5maW5kID0gKHNlbGVjdG9yKSA9PntcclxuICAgICAgICByZXR1cm4gTGEkKHJldHVybk5vZGUoJGVsZW1lbnQsIHNlbGVjdG9yKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuY3NzID0gKG5hbWUsIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgaWYodmFsdWUpe1xyXG4gICAgICAgICAgICBpZigkZWxlbWVudC5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCl7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZVtuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5zdHlsZVtuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiAkZWxlbWVudC5zdHlsZVtuYW1lXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcblxyXG5cclxuICAgIHRoYXQucmVtb3ZlQ2xhc3MgPSAobmFtZSkgPT57XHJcbiAgICAgICAgaWYgKCRlbGVtZW50LmNsYXNzTGlzdCl7XHJcbiAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUobmFtZSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTmFtZSA9ICRlbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAoJyhefFxcXFxiKScgKyBuYW1lLnNwbGl0KCcgJykuam9pbignfCcpICsgJyhcXFxcYnwkKScsICdnaScpLCAnICcpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucmVtb3ZlQXR0cmlidXRlID0gKGF0dHJOYW1lKSA9PiB7XHJcbiAgICAgICAgJGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKTtcclxuICAgIH07XHJcblxyXG5cclxuXHJcbiAgICAvKnRoYXQuYXBwZW5kID0gKGh0bWxDb2RlKSA9PntcclxuICAgICAgICAkZWxlbWVudC5pbm5lckhUTUwgKz0gaHRtbENvZGU7XHJcbiAgICB9OyovXHJcblxyXG4gICAgdGhhdC50ZXh0ID0gKHRleHQpID0+IHsgLy9JRTgrXHJcbiAgICAgICAgaWYodGV4dCA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuICRlbGVtZW50LnRleHRDb250ZW50O1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAkZWxlbWVudC50ZXh0Q29udGVudCA9IHRleHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoYXQuaHRtbCA9IChodG1sU3RyaW5nKSA9PiB7XHJcbiAgICAgICAgJGVsZW1lbnQuaW5uZXJIVE1MID0gaHRtbFN0cmluZztcclxuICAgIH07XHJcbiAgICB0aGF0Lmhhc0NsYXNzID0gKG5hbWUpID0+IHsgLy9JRTgrXHJcbiAgICAgICAgaWYoJGVsZW1lbnQuY2xhc3NMaXN0KXtcclxuICAgICAgICAgICAgcmV0dXJuICRlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhuYW1lKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoJyhefCApJyArIG5hbWUgKyAnKCB8JCknLCAnZ2knKS50ZXN0KCRlbGVtZW50Lm5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5pcyA9ICgkdGFyZ2V0RWxlbWVudCkgPT4ge1xyXG4gICAgICAgIC8qdmFyIG1hdGNoZXMgPSBmdW5jdGlvbihlbCwgc2VsZWN0b3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChlbC5tYXRjaGVzIHx8IGVsLm1hdGNoZXNTZWxlY3RvciB8fCBlbC5tc01hdGNoZXNTZWxlY3RvciB8fCBlbC5tb3pNYXRjaGVzU2VsZWN0b3IgfHwgZWwud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8IGVsLm9NYXRjaGVzU2VsZWN0b3IpLmNhbGwoZWwsIHNlbGVjdG9yKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBtYXRjaGVzKGVsLCAnLm15LWNsYXNzJyk7Ki9cclxuICAgICAgICByZXR1cm4gJGVsZW1lbnQgPT09ICR0YXJnZXRFbGVtZW50O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0Lm9mZnNldCA9ICgpID0+eyAgICAvL0lFOCtcclxuICAgICAgICB2YXIgcmVjdCA9ICRlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0b3A6IHJlY3QudG9wICsgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AsXHJcbiAgICAgICAgICAgIGxlZnQ6IHJlY3QubGVmdCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdFxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhhdC53aWR0aCA9ICgpID0+IHsgICAgLy9JRTgrXHJcbiAgICAgICAgcmV0dXJuICRlbGVtZW50LmNsaWVudFdpZHRoO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmhlaWdodCA9ICgpID0+IHsgICAvL0lFOCtcclxuICAgICAgICByZXR1cm4gJGVsZW1lbnQuY2xpZW50SGVpZ2h0O1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmF0dHIgPSAoYXR0cikgPT4ge1xyXG4gICAgICAgIHJldHVybiAkZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cik7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucmVwbGFjZSA9IChodG1sKSA9PiB7XHJcbiAgICAgICAgJGVsZW1lbnQucmVwbGFjZVdpdGgoaHRtbCk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB0aGF0LnJlbW92ZSA9ICgpID0+IHtcclxuICAgICAgICBpZigkZWxlbWVudC5sZW5ndGggPiAxKXtcclxuICAgICAgICAgICAgJGVsZW1lbnQucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZCgkZWxlbWVudCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQucmVtb3ZlQ2hpbGQgPSAoZWxlbWVudCkgPT4ge1xyXG4gICAgICAgIGlmKGVsZW1lbnQpe1xyXG4gICAgICAgICAgICAkZWxlbWVudC5yZW1vdmVDaGlsZChlbGVtZW50KTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgd2hpbGUgKCRlbGVtZW50Lmhhc0NoaWxkTm9kZXMoKSkge1xyXG4gICAgICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlQ2hpbGQoJGVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmdldCA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gJGVsZW1lbnQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuY2xvc2VzdCA9IChzZWxlY3RvclN0cmluZykgPT4ge1xyXG5cclxuICAgICAgICAkZWxlbWVudC5jbG9zZXN0ID0gZnVuY3Rpb24gKHMpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBlbCA9ICRlbGVtZW50O1xyXG5cclxuICAgICAgICAgICAgZG8ge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChlbC5tYXRjaGVzKHMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGVsID0gZWwucGFyZW50RWxlbWVudCB8fCBlbC5wYXJlbnROb2RlO1xyXG5cclxuICAgICAgICAgICAgfSB3aGlsZSAoZWwgIT09IG51bGwgJiYgZWwubm9kZVR5cGUgPT09IDEpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGV0IGNsb3Nlc3RFbGVtZW50ID0gJGVsZW1lbnQuY2xvc2VzdChzZWxlY3RvclN0cmluZyk7XHJcblxyXG4gICAgICAgIGlmKGNsb3Nlc3RFbGVtZW50KXtcclxuICAgICAgICAgICAgcmV0dXJuIExhJChjbG9zZXN0RWxlbWVudCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMYSQ7XHJcbiIsImltcG9ydCBfIGZyb20gJy4vdW5kZXJzY29yZSc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdHJpbShzdHJpbmcpIHtcclxuICAgIHJldHVybiBzdHJpbmcgPyBzdHJpbmcucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpIDogXCJcIjtcclxufVxyXG5cclxuLyoqXHJcbiAqIGV4dHJhY3RFeHRlbnNpb25cclxuICpcclxuICogQHBhcmFtICAgICAge3N0cmluZ30gcGF0aCBmb3IgdXJsXHJcbiAqIEByZXR1cm4gICAgIHtzdHJpbmd9ICBFeHRlbnNpb25cclxuICovXHJcbmV4cG9ydCBjb25zdCBleHRyYWN0RXh0ZW5zaW9uID0gZnVuY3Rpb24ocGF0aCkge1xyXG4gICAgaWYoIXBhdGggfHwgcGF0aC5zdWJzdHIoMCw0KT09J3J0bXAnKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBnZXRBenVyZUZpbGVGb3JtYXQocGF0aCkge1xyXG4gICAgICAgIGxldCBleHRlbnNpb24gPSBcIlwiO1xyXG4gICAgICAgIGlmICgoL1soLF1mb3JtYXQ9bXBkLS9pKS50ZXN0KHBhdGgpKSB7XHJcbiAgICAgICAgICAgIGV4dGVuc2lvbiA9ICdtcGQnO1xyXG4gICAgICAgIH1lbHNlIGlmICgoL1soLF1mb3JtYXQ9bTN1OC0vaSkudGVzdChwYXRoKSkge1xyXG4gICAgICAgICAgICBleHRlbnNpb24gPSAnbTN1OCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBleHRlbnNpb247XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGF6dXJlZEZvcm1hdCA9IGdldEF6dXJlRmlsZUZvcm1hdChwYXRoKTtcclxuICAgIGlmKGF6dXJlZEZvcm1hdCkge1xyXG4gICAgICAgIHJldHVybiBhenVyZWRGb3JtYXQ7XHJcbiAgICB9XHJcbiAgICBwYXRoID0gcGF0aC5zcGxpdCgnPycpWzBdLnNwbGl0KCcjJylbMF07XHJcbiAgICBpZihwYXRoLmxhc3RJbmRleE9mKCcuJykgPiAtMSkge1xyXG4gICAgICAgIHJldHVybiBwYXRoLnN1YnN0cihwYXRoLmxhc3RJbmRleE9mKCcuJykgKyAxLCBwYXRoLmxlbmd0aCkudG9Mb3dlckNhc2UoKTtcclxuICAgIH1lbHNle1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBuYXR1cmFsSG1zXHJcbiAqXHJcbiAqIEBwYXJhbSAgICAgIHtudW1iZXIgfCBzdHJpbmd9ICBzZWNvbmQgIFRoZSBzZWNvbmRcclxuICogQHJldHVybiAgICAge3N0cmluZ30gIGZvcm1hdHRlZCBTdHJpbmdcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBuYXR1cmFsSG1zKHNlY29uZCkge1xyXG4gICAgbGV0IHNlY051bSA9IHBhcnNlSW50KHNlY29uZCwgMTApO1xyXG4gICAgaWYoIXNlY29uZCl7XHJcbiAgICAgICAgcmV0dXJuIFwiMDA6MDBcIjtcclxuICAgIH1cclxuICAgIGxldCBob3VycyAgID0gTWF0aC5mbG9vcihzZWNOdW0gLyAzNjAwKTtcclxuICAgIGxldCBtaW51dGVzID0gTWF0aC5mbG9vcigoc2VjTnVtIC0gKGhvdXJzICogMzYwMCkpIC8gNjApO1xyXG4gICAgbGV0IHNlY29uZHMgPSBzZWNOdW0gLSAoaG91cnMgKiAzNjAwKSAtIChtaW51dGVzICogNjApO1xyXG5cclxuICAgIC8vaWYgKGhvdXJzID4gMCkge21pbnV0ZXMgPSBcIjBcIittaW51dGVzO31cclxuICAgIGlmIChtaW51dGVzIDwgMTApIHttaW51dGVzID0gXCIwXCIrbWludXRlczt9XHJcbiAgICBpZiAoc2Vjb25kcyA8IDEwKSB7c2Vjb25kcyA9IFwiMFwiK3NlY29uZHM7fVxyXG5cclxuICAgIGlmIChob3VycyA+IDApIHtcclxuICAgICAgICByZXR1cm4gaG91cnMrJzonK21pbnV0ZXMrJzonK3NlY29uZHM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBtaW51dGVzKyc6JytzZWNvbmRzO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhtc1RvU2Vjb25kKHN0ciwgZnJhbWVSYXRlKSB7XHJcbiAgICBpZighc3RyKSB7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbiAgICBpZihfLmlzTnVtYmVyKHN0cikgJiYgIV8uaXNOYU4oc3RyKSl7XHJcbiAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgIH1cclxuICAgIHN0ciA9IHN0ci5yZXBsYWNlKCcsJywgJy4nKTtcclxuICAgIGxldCBhcnIgPSBzdHIuc3BsaXQoJzonKTtcclxuICAgIGxldCBhcnJMZW5ndGggPSBhcnIubGVuZ3RoO1xyXG4gICAgbGV0IHNlYyA9IDA7XHJcbiAgICBpZiAoc3RyLnNsaWNlKC0xKSA9PT0gJ3MnKXtcclxuICAgICAgICBzZWMgPSBwYXJzZUZsb2F0KHN0cik7XHJcbiAgICB9ZWxzZSBpZiAoc3RyLnNsaWNlKC0xKSA9PT0gJ20nKXtcclxuICAgICAgICBzZWMgPSBwYXJzZUZsb2F0KHN0cikgKiA2MDtcclxuICAgIH1lbHNlIGlmIChzdHIuc2xpY2UoLTEpID09PSAnaCcpe1xyXG4gICAgICAgIHNlYyA9IHBhcnNlRmxvYXQoc3RyKSAqIDM2MDA7XHJcbiAgICB9ZWxzZSBpZiAoYXJyTGVuZ3RoID4gMSkge1xyXG4gICAgICAgIHZhciBzZWNJbmRleCA9IGFyckxlbmd0aCAtIDE7XHJcbiAgICAgICAgaWYgKGFyckxlbmd0aCA9PT0gNCkge1xyXG4gICAgICAgICAgICBpZiAoZnJhbWVSYXRlKSB7XHJcbiAgICAgICAgICAgICAgICBzZWMgPSBwYXJzZUZsb2F0KGFycltzZWNJbmRleF0pIC8gZnJhbWVSYXRlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlY0luZGV4IC09IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlYyArPSBwYXJzZUZsb2F0KGFycltzZWNJbmRleF0pO1xyXG4gICAgICAgIHNlYyArPSBwYXJzZUZsb2F0KGFycltzZWNJbmRleCAtIDFdKSAqIDYwO1xyXG4gICAgICAgIGlmIChhcnJMZW5ndGggPj0gMykge1xyXG4gICAgICAgICAgICBzZWMgKz0gcGFyc2VGbG9hdChhcnJbc2VjSW5kZXggLSAyXSkgKiAzNjAwO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2VjID0gcGFyc2VGbG9hdChzdHIpO1xyXG4gICAgfVxyXG4gICAgaWYgKF8uaXNOYU4oc2VjKSkge1xyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNlYztcclxufSIsIi8vICAgICBVbmRlcnNjb3JlLmpzIDEuOS4xXHJcbi8vICAgICBodHRwOi8vdW5kZXJzY29yZWpzLm9yZ1xyXG4vLyAgICAgKGMpIDIwMDktMjAxOCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xyXG4vLyAgICAgVW5kZXJzY29yZSBtYXkgYmUgZnJlZWx5IGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cclxuIWZ1bmN0aW9uKCl7dmFyIG49XCJvYmplY3RcIj09dHlwZW9mIHNlbGYmJnNlbGYuc2VsZj09PXNlbGYmJnNlbGZ8fFwib2JqZWN0XCI9PXR5cGVvZiBnbG9iYWwmJmdsb2JhbC5nbG9iYWw9PT1nbG9iYWwmJmdsb2JhbHx8dGhpc3x8e30scj1uLl8sZT1BcnJheS5wcm90b3R5cGUsbz1PYmplY3QucHJvdG90eXBlLHM9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFN5bWJvbD9TeW1ib2wucHJvdG90eXBlOm51bGwsdT1lLnB1c2gsYz1lLnNsaWNlLHA9by50b1N0cmluZyxpPW8uaGFzT3duUHJvcGVydHksdD1BcnJheS5pc0FycmF5LGE9T2JqZWN0LmtleXMsbD1PYmplY3QuY3JlYXRlLGY9ZnVuY3Rpb24oKXt9LGg9ZnVuY3Rpb24obil7cmV0dXJuIG4gaW5zdGFuY2VvZiBoP246dGhpcyBpbnN0YW5jZW9mIGg/dm9pZCh0aGlzLl93cmFwcGVkPW4pOm5ldyBoKG4pfTtcInVuZGVmaW5lZFwiPT10eXBlb2YgZXhwb3J0c3x8ZXhwb3J0cy5ub2RlVHlwZT9uLl89aDooXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZSYmIW1vZHVsZS5ub2RlVHlwZSYmbW9kdWxlLmV4cG9ydHMmJihleHBvcnRzPW1vZHVsZS5leHBvcnRzPWgpLGV4cG9ydHMuXz1oKSxoLlZFUlNJT049XCIxLjkuMVwiO3ZhciB2LHk9ZnVuY3Rpb24odSxpLG4pe2lmKHZvaWQgMD09PWkpcmV0dXJuIHU7c3dpdGNoKG51bGw9PW4/MzpuKXtjYXNlIDE6cmV0dXJuIGZ1bmN0aW9uKG4pe3JldHVybiB1LmNhbGwoaSxuKX07Y2FzZSAzOnJldHVybiBmdW5jdGlvbihuLHIsdCl7cmV0dXJuIHUuY2FsbChpLG4scix0KX07Y2FzZSA0OnJldHVybiBmdW5jdGlvbihuLHIsdCxlKXtyZXR1cm4gdS5jYWxsKGksbixyLHQsZSl9fXJldHVybiBmdW5jdGlvbigpe3JldHVybiB1LmFwcGx5KGksYXJndW1lbnRzKX19LGQ9ZnVuY3Rpb24obixyLHQpe3JldHVybiBoLml0ZXJhdGVlIT09dj9oLml0ZXJhdGVlKG4scik6bnVsbD09bj9oLmlkZW50aXR5OmguaXNGdW5jdGlvbihuKT95KG4scix0KTpoLmlzT2JqZWN0KG4pJiYhaC5pc0FycmF5KG4pP2gubWF0Y2hlcihuKTpoLnByb3BlcnR5KG4pfTtoLml0ZXJhdGVlPXY9ZnVuY3Rpb24obixyKXtyZXR1cm4gZChuLHIsMS8wKX07dmFyIGc9ZnVuY3Rpb24odSxpKXtyZXR1cm4gaT1udWxsPT1pP3UubGVuZ3RoLTE6K2ksZnVuY3Rpb24oKXtmb3IodmFyIG49TWF0aC5tYXgoYXJndW1lbnRzLmxlbmd0aC1pLDApLHI9QXJyYXkobiksdD0wO3Q8bjt0Kyspclt0XT1hcmd1bWVudHNbdCtpXTtzd2l0Y2goaSl7Y2FzZSAwOnJldHVybiB1LmNhbGwodGhpcyxyKTtjYXNlIDE6cmV0dXJuIHUuY2FsbCh0aGlzLGFyZ3VtZW50c1swXSxyKTtjYXNlIDI6cmV0dXJuIHUuY2FsbCh0aGlzLGFyZ3VtZW50c1swXSxhcmd1bWVudHNbMV0scil9dmFyIGU9QXJyYXkoaSsxKTtmb3IodD0wO3Q8aTt0KyspZVt0XT1hcmd1bWVudHNbdF07cmV0dXJuIGVbaV09cix1LmFwcGx5KHRoaXMsZSl9fSxtPWZ1bmN0aW9uKG4pe2lmKCFoLmlzT2JqZWN0KG4pKXJldHVybnt9O2lmKGwpcmV0dXJuIGwobik7Zi5wcm90b3R5cGU9bjt2YXIgcj1uZXcgZjtyZXR1cm4gZi5wcm90b3R5cGU9bnVsbCxyfSxiPWZ1bmN0aW9uKHIpe3JldHVybiBmdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09bj92b2lkIDA6bltyXX19LGo9ZnVuY3Rpb24obixyKXtyZXR1cm4gbnVsbCE9biYmaS5jYWxsKG4scil9LHg9ZnVuY3Rpb24obixyKXtmb3IodmFyIHQ9ci5sZW5ndGgsZT0wO2U8dDtlKyspe2lmKG51bGw9PW4pcmV0dXJuO249bltyW2VdXX1yZXR1cm4gdD9uOnZvaWQgMH0sXz1NYXRoLnBvdygyLDUzKS0xLEE9YihcImxlbmd0aFwiKSx3PWZ1bmN0aW9uKG4pe3ZhciByPUEobik7cmV0dXJuXCJudW1iZXJcIj09dHlwZW9mIHImJjA8PXImJnI8PV99O2guZWFjaD1oLmZvckVhY2g9ZnVuY3Rpb24obixyLHQpe3ZhciBlLHU7aWYocj15KHIsdCksdyhuKSlmb3IoZT0wLHU9bi5sZW5ndGg7ZTx1O2UrKylyKG5bZV0sZSxuKTtlbHNle3ZhciBpPWgua2V5cyhuKTtmb3IoZT0wLHU9aS5sZW5ndGg7ZTx1O2UrKylyKG5baVtlXV0saVtlXSxuKX1yZXR1cm4gbn0saC5tYXA9aC5jb2xsZWN0PWZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGU9IXcobikmJmgua2V5cyhuKSx1PShlfHxuKS5sZW5ndGgsaT1BcnJheSh1KSxvPTA7bzx1O28rKyl7dmFyIGE9ZT9lW29dOm87aVtvXT1yKG5bYV0sYSxuKX1yZXR1cm4gaX07dmFyIE89ZnVuY3Rpb24oYyl7cmV0dXJuIGZ1bmN0aW9uKG4scix0LGUpe3ZhciB1PTM8PWFyZ3VtZW50cy5sZW5ndGg7cmV0dXJuIGZ1bmN0aW9uKG4scix0LGUpe3ZhciB1PSF3KG4pJiZoLmtleXMobiksaT0odXx8bikubGVuZ3RoLG89MDxjPzA6aS0xO2ZvcihlfHwodD1uW3U/dVtvXTpvXSxvKz1jKTswPD1vJiZvPGk7bys9Yyl7dmFyIGE9dT91W29dOm87dD1yKHQsblthXSxhLG4pfXJldHVybiB0fShuLHkocixlLDQpLHQsdSl9fTtoLnJlZHVjZT1oLmZvbGRsPWguaW5qZWN0PU8oMSksaC5yZWR1Y2VSaWdodD1oLmZvbGRyPU8oLTEpLGguZmluZD1oLmRldGVjdD1mdW5jdGlvbihuLHIsdCl7dmFyIGU9KHcobik/aC5maW5kSW5kZXg6aC5maW5kS2V5KShuLHIsdCk7aWYodm9pZCAwIT09ZSYmLTEhPT1lKXJldHVybiBuW2VdfSxoLmZpbHRlcj1oLnNlbGVjdD1mdW5jdGlvbihuLGUscil7dmFyIHU9W107cmV0dXJuIGU9ZChlLHIpLGguZWFjaChuLGZ1bmN0aW9uKG4scix0KXtlKG4scix0KSYmdS5wdXNoKG4pfSksdX0saC5yZWplY3Q9ZnVuY3Rpb24obixyLHQpe3JldHVybiBoLmZpbHRlcihuLGgubmVnYXRlKGQocikpLHQpfSxoLmV2ZXJ5PWguYWxsPWZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGU9IXcobikmJmgua2V5cyhuKSx1PShlfHxuKS5sZW5ndGgsaT0wO2k8dTtpKyspe3ZhciBvPWU/ZVtpXTppO2lmKCFyKG5bb10sbyxuKSlyZXR1cm4hMX1yZXR1cm4hMH0saC5zb21lPWguYW55PWZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGU9IXcobikmJmgua2V5cyhuKSx1PShlfHxuKS5sZW5ndGgsaT0wO2k8dTtpKyspe3ZhciBvPWU/ZVtpXTppO2lmKHIobltvXSxvLG4pKXJldHVybiEwfXJldHVybiExfSxoLmNvbnRhaW5zPWguaW5jbHVkZXM9aC5pbmNsdWRlPWZ1bmN0aW9uKG4scix0LGUpe3JldHVybiB3KG4pfHwobj1oLnZhbHVlcyhuKSksKFwibnVtYmVyXCIhPXR5cGVvZiB0fHxlKSYmKHQ9MCksMDw9aC5pbmRleE9mKG4scix0KX0saC5pbnZva2U9ZyhmdW5jdGlvbihuLHQsZSl7dmFyIHUsaTtyZXR1cm4gaC5pc0Z1bmN0aW9uKHQpP2k9dDpoLmlzQXJyYXkodCkmJih1PXQuc2xpY2UoMCwtMSksdD10W3QubGVuZ3RoLTFdKSxoLm1hcChuLGZ1bmN0aW9uKG4pe3ZhciByPWk7aWYoIXIpe2lmKHUmJnUubGVuZ3RoJiYobj14KG4sdSkpLG51bGw9PW4pcmV0dXJuO3I9blt0XX1yZXR1cm4gbnVsbD09cj9yOnIuYXBwbHkobixlKX0pfSksaC5wbHVjaz1mdW5jdGlvbihuLHIpe3JldHVybiBoLm1hcChuLGgucHJvcGVydHkocikpfSxoLndoZXJlPWZ1bmN0aW9uKG4scil7cmV0dXJuIGguZmlsdGVyKG4saC5tYXRjaGVyKHIpKX0saC5maW5kV2hlcmU9ZnVuY3Rpb24obixyKXtyZXR1cm4gaC5maW5kKG4saC5tYXRjaGVyKHIpKX0saC5tYXg9ZnVuY3Rpb24obixlLHIpe3ZhciB0LHUsaT0tMS8wLG89LTEvMDtpZihudWxsPT1lfHxcIm51bWJlclwiPT10eXBlb2YgZSYmXCJvYmplY3RcIiE9dHlwZW9mIG5bMF0mJm51bGwhPW4pZm9yKHZhciBhPTAsYz0obj13KG4pP246aC52YWx1ZXMobikpLmxlbmd0aDthPGM7YSsrKW51bGwhPSh0PW5bYV0pJiZpPHQmJihpPXQpO2Vsc2UgZT1kKGUsciksaC5lYWNoKG4sZnVuY3Rpb24obixyLHQpe3U9ZShuLHIsdCksKG88dXx8dT09PS0xLzAmJmk9PT0tMS8wKSYmKGk9bixvPXUpfSk7cmV0dXJuIGl9LGgubWluPWZ1bmN0aW9uKG4sZSxyKXt2YXIgdCx1LGk9MS8wLG89MS8wO2lmKG51bGw9PWV8fFwibnVtYmVyXCI9PXR5cGVvZiBlJiZcIm9iamVjdFwiIT10eXBlb2YgblswXSYmbnVsbCE9bilmb3IodmFyIGE9MCxjPShuPXcobik/bjpoLnZhbHVlcyhuKSkubGVuZ3RoO2E8YzthKyspbnVsbCE9KHQ9blthXSkmJnQ8aSYmKGk9dCk7ZWxzZSBlPWQoZSxyKSxoLmVhY2gobixmdW5jdGlvbihuLHIsdCl7KCh1PWUobixyLHQpKTxvfHx1PT09MS8wJiZpPT09MS8wKSYmKGk9bixvPXUpfSk7cmV0dXJuIGl9LGguc2h1ZmZsZT1mdW5jdGlvbihuKXtyZXR1cm4gaC5zYW1wbGUobiwxLzApfSxoLnNhbXBsZT1mdW5jdGlvbihuLHIsdCl7aWYobnVsbD09cnx8dClyZXR1cm4gdyhuKXx8KG49aC52YWx1ZXMobikpLG5baC5yYW5kb20obi5sZW5ndGgtMSldO3ZhciBlPXcobik/aC5jbG9uZShuKTpoLnZhbHVlcyhuKSx1PUEoZSk7cj1NYXRoLm1heChNYXRoLm1pbihyLHUpLDApO2Zvcih2YXIgaT11LTEsbz0wO288cjtvKyspe3ZhciBhPWgucmFuZG9tKG8saSksYz1lW29dO2Vbb109ZVthXSxlW2FdPWN9cmV0dXJuIGUuc2xpY2UoMCxyKX0saC5zb3J0Qnk9ZnVuY3Rpb24obixlLHIpe3ZhciB1PTA7cmV0dXJuIGU9ZChlLHIpLGgucGx1Y2soaC5tYXAobixmdW5jdGlvbihuLHIsdCl7cmV0dXJue3ZhbHVlOm4saW5kZXg6dSsrLGNyaXRlcmlhOmUobixyLHQpfX0pLnNvcnQoZnVuY3Rpb24obixyKXt2YXIgdD1uLmNyaXRlcmlhLGU9ci5jcml0ZXJpYTtpZih0IT09ZSl7aWYoZTx0fHx2b2lkIDA9PT10KXJldHVybiAxO2lmKHQ8ZXx8dm9pZCAwPT09ZSlyZXR1cm4tMX1yZXR1cm4gbi5pbmRleC1yLmluZGV4fSksXCJ2YWx1ZVwiKX07dmFyIGs9ZnVuY3Rpb24obyxyKXtyZXR1cm4gZnVuY3Rpb24oZSx1LG4pe3ZhciBpPXI/W1tdLFtdXTp7fTtyZXR1cm4gdT1kKHUsbiksaC5lYWNoKGUsZnVuY3Rpb24obixyKXt2YXIgdD11KG4scixlKTtvKGksbix0KX0pLGl9fTtoLmdyb3VwQnk9ayhmdW5jdGlvbihuLHIsdCl7aihuLHQpP25bdF0ucHVzaChyKTpuW3RdPVtyXX0pLGguaW5kZXhCeT1rKGZ1bmN0aW9uKG4scix0KXtuW3RdPXJ9KSxoLmNvdW50Qnk9ayhmdW5jdGlvbihuLHIsdCl7aihuLHQpP25bdF0rKzpuW3RdPTF9KTt2YXIgUz0vW15cXHVkODAwLVxcdWRmZmZdfFtcXHVkODAwLVxcdWRiZmZdW1xcdWRjMDAtXFx1ZGZmZl18W1xcdWQ4MDAtXFx1ZGZmZl0vZztoLnRvQXJyYXk9ZnVuY3Rpb24obil7cmV0dXJuIG4/aC5pc0FycmF5KG4pP2MuY2FsbChuKTpoLmlzU3RyaW5nKG4pP24ubWF0Y2goUyk6dyhuKT9oLm1hcChuLGguaWRlbnRpdHkpOmgudmFsdWVzKG4pOltdfSxoLnNpemU9ZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PW4/MDp3KG4pP24ubGVuZ3RoOmgua2V5cyhuKS5sZW5ndGh9LGgucGFydGl0aW9uPWsoZnVuY3Rpb24obixyLHQpe25bdD8wOjFdLnB1c2gocil9LCEwKSxoLmZpcnN0PWguaGVhZD1oLnRha2U9ZnVuY3Rpb24obixyLHQpe3JldHVybiBudWxsPT1ufHxuLmxlbmd0aDwxP251bGw9PXI/dm9pZCAwOltdOm51bGw9PXJ8fHQ/blswXTpoLmluaXRpYWwobixuLmxlbmd0aC1yKX0saC5pbml0aWFsPWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gYy5jYWxsKG4sMCxNYXRoLm1heCgwLG4ubGVuZ3RoLShudWxsPT1yfHx0PzE6cikpKX0saC5sYXN0PWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gbnVsbD09bnx8bi5sZW5ndGg8MT9udWxsPT1yP3ZvaWQgMDpbXTpudWxsPT1yfHx0P25bbi5sZW5ndGgtMV06aC5yZXN0KG4sTWF0aC5tYXgoMCxuLmxlbmd0aC1yKSl9LGgucmVzdD1oLnRhaWw9aC5kcm9wPWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gYy5jYWxsKG4sbnVsbD09cnx8dD8xOnIpfSxoLmNvbXBhY3Q9ZnVuY3Rpb24obil7cmV0dXJuIGguZmlsdGVyKG4sQm9vbGVhbil9O3ZhciBNPWZ1bmN0aW9uKG4scix0LGUpe2Zvcih2YXIgdT0oZT1lfHxbXSkubGVuZ3RoLGk9MCxvPUEobik7aTxvO2krKyl7dmFyIGE9bltpXTtpZih3KGEpJiYoaC5pc0FycmF5KGEpfHxoLmlzQXJndW1lbnRzKGEpKSlpZihyKWZvcih2YXIgYz0wLGw9YS5sZW5ndGg7YzxsOyllW3UrK109YVtjKytdO2Vsc2UgTShhLHIsdCxlKSx1PWUubGVuZ3RoO2Vsc2UgdHx8KGVbdSsrXT1hKX1yZXR1cm4gZX07aC5mbGF0dGVuPWZ1bmN0aW9uKG4scil7cmV0dXJuIE0obixyLCExKX0saC53aXRob3V0PWcoZnVuY3Rpb24obixyKXtyZXR1cm4gaC5kaWZmZXJlbmNlKG4scil9KSxoLnVuaXE9aC51bmlxdWU9ZnVuY3Rpb24obixyLHQsZSl7aC5pc0Jvb2xlYW4ocil8fChlPXQsdD1yLHI9ITEpLG51bGwhPXQmJih0PWQodCxlKSk7Zm9yKHZhciB1PVtdLGk9W10sbz0wLGE9QShuKTtvPGE7bysrKXt2YXIgYz1uW29dLGw9dD90KGMsbyxuKTpjO3ImJiF0PyhvJiZpPT09bHx8dS5wdXNoKGMpLGk9bCk6dD9oLmNvbnRhaW5zKGksbCl8fChpLnB1c2gobCksdS5wdXNoKGMpKTpoLmNvbnRhaW5zKHUsYyl8fHUucHVzaChjKX1yZXR1cm4gdX0saC51bmlvbj1nKGZ1bmN0aW9uKG4pe3JldHVybiBoLnVuaXEoTShuLCEwLCEwKSl9KSxoLmludGVyc2VjdGlvbj1mdW5jdGlvbihuKXtmb3IodmFyIHI9W10sdD1hcmd1bWVudHMubGVuZ3RoLGU9MCx1PUEobik7ZTx1O2UrKyl7dmFyIGk9bltlXTtpZighaC5jb250YWlucyhyLGkpKXt2YXIgbztmb3Iobz0xO288dCYmaC5jb250YWlucyhhcmd1bWVudHNbb10saSk7bysrKTtvPT09dCYmci5wdXNoKGkpfX1yZXR1cm4gcn0saC5kaWZmZXJlbmNlPWcoZnVuY3Rpb24obixyKXtyZXR1cm4gcj1NKHIsITAsITApLGguZmlsdGVyKG4sZnVuY3Rpb24obil7cmV0dXJuIWguY29udGFpbnMocixuKX0pfSksaC51bnppcD1mdW5jdGlvbihuKXtmb3IodmFyIHI9biYmaC5tYXgobixBKS5sZW5ndGh8fDAsdD1BcnJheShyKSxlPTA7ZTxyO2UrKyl0W2VdPWgucGx1Y2sobixlKTtyZXR1cm4gdH0saC56aXA9ZyhoLnVuemlwKSxoLm9iamVjdD1mdW5jdGlvbihuLHIpe2Zvcih2YXIgdD17fSxlPTAsdT1BKG4pO2U8dTtlKyspcj90W25bZV1dPXJbZV06dFtuW2VdWzBdXT1uW2VdWzFdO3JldHVybiB0fTt2YXIgRj1mdW5jdGlvbihpKXtyZXR1cm4gZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT1BKG4pLHU9MDxpPzA6ZS0xOzA8PXUmJnU8ZTt1Kz1pKWlmKHIoblt1XSx1LG4pKXJldHVybiB1O3JldHVybi0xfX07aC5maW5kSW5kZXg9RigxKSxoLmZpbmRMYXN0SW5kZXg9RigtMSksaC5zb3J0ZWRJbmRleD1mdW5jdGlvbihuLHIsdCxlKXtmb3IodmFyIHU9KHQ9ZCh0LGUsMSkpKHIpLGk9MCxvPUEobik7aTxvOyl7dmFyIGE9TWF0aC5mbG9vcigoaStvKS8yKTt0KG5bYV0pPHU/aT1hKzE6bz1hfXJldHVybiBpfTt2YXIgRT1mdW5jdGlvbihpLG8sYSl7cmV0dXJuIGZ1bmN0aW9uKG4scix0KXt2YXIgZT0wLHU9QShuKTtpZihcIm51bWJlclwiPT10eXBlb2YgdCkwPGk/ZT0wPD10P3Q6TWF0aC5tYXgodCt1LGUpOnU9MDw9dD9NYXRoLm1pbih0KzEsdSk6dCt1KzE7ZWxzZSBpZihhJiZ0JiZ1KXJldHVybiBuW3Q9YShuLHIpXT09PXI/dDotMTtpZihyIT1yKXJldHVybiAwPD0odD1vKGMuY2FsbChuLGUsdSksaC5pc05hTikpP3QrZTotMTtmb3IodD0wPGk/ZTp1LTE7MDw9dCYmdDx1O3QrPWkpaWYoblt0XT09PXIpcmV0dXJuIHQ7cmV0dXJuLTF9fTtoLmluZGV4T2Y9RSgxLGguZmluZEluZGV4LGguc29ydGVkSW5kZXgpLGgubGFzdEluZGV4T2Y9RSgtMSxoLmZpbmRMYXN0SW5kZXgpLGgucmFuZ2U9ZnVuY3Rpb24obixyLHQpe251bGw9PXImJihyPW58fDAsbj0wKSx0fHwodD1yPG4/LTE6MSk7Zm9yKHZhciBlPU1hdGgubWF4KE1hdGguY2VpbCgoci1uKS90KSwwKSx1PUFycmF5KGUpLGk9MDtpPGU7aSsrLG4rPXQpdVtpXT1uO3JldHVybiB1fSxoLmNodW5rPWZ1bmN0aW9uKG4scil7aWYobnVsbD09cnx8cjwxKXJldHVybltdO2Zvcih2YXIgdD1bXSxlPTAsdT1uLmxlbmd0aDtlPHU7KXQucHVzaChjLmNhbGwobixlLGUrPXIpKTtyZXR1cm4gdH07dmFyIE49ZnVuY3Rpb24obixyLHQsZSx1KXtpZighKGUgaW5zdGFuY2VvZiByKSlyZXR1cm4gbi5hcHBseSh0LHUpO3ZhciBpPW0obi5wcm90b3R5cGUpLG89bi5hcHBseShpLHUpO3JldHVybiBoLmlzT2JqZWN0KG8pP286aX07aC5iaW5kPWcoZnVuY3Rpb24ocix0LGUpe2lmKCFoLmlzRnVuY3Rpb24ocikpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkJpbmQgbXVzdCBiZSBjYWxsZWQgb24gYSBmdW5jdGlvblwiKTt2YXIgdT1nKGZ1bmN0aW9uKG4pe3JldHVybiBOKHIsdSx0LHRoaXMsZS5jb25jYXQobikpfSk7cmV0dXJuIHV9KSxoLnBhcnRpYWw9ZyhmdW5jdGlvbih1LGkpe3ZhciBvPWgucGFydGlhbC5wbGFjZWhvbGRlcixhPWZ1bmN0aW9uKCl7Zm9yKHZhciBuPTAscj1pLmxlbmd0aCx0PUFycmF5KHIpLGU9MDtlPHI7ZSsrKXRbZV09aVtlXT09PW8/YXJndW1lbnRzW24rK106aVtlXTtmb3IoO248YXJndW1lbnRzLmxlbmd0aDspdC5wdXNoKGFyZ3VtZW50c1tuKytdKTtyZXR1cm4gTih1LGEsdGhpcyx0aGlzLHQpfTtyZXR1cm4gYX0pLChoLnBhcnRpYWwucGxhY2Vob2xkZXI9aCkuYmluZEFsbD1nKGZ1bmN0aW9uKG4scil7dmFyIHQ9KHI9TShyLCExLCExKSkubGVuZ3RoO2lmKHQ8MSl0aHJvdyBuZXcgRXJyb3IoXCJiaW5kQWxsIG11c3QgYmUgcGFzc2VkIGZ1bmN0aW9uIG5hbWVzXCIpO2Zvcig7dC0tOyl7dmFyIGU9clt0XTtuW2VdPWguYmluZChuW2VdLG4pfX0pLGgubWVtb2l6ZT1mdW5jdGlvbihlLHUpe3ZhciBpPWZ1bmN0aW9uKG4pe3ZhciByPWkuY2FjaGUsdD1cIlwiKyh1P3UuYXBwbHkodGhpcyxhcmd1bWVudHMpOm4pO3JldHVybiBqKHIsdCl8fChyW3RdPWUuYXBwbHkodGhpcyxhcmd1bWVudHMpKSxyW3RdfTtyZXR1cm4gaS5jYWNoZT17fSxpfSxoLmRlbGF5PWcoZnVuY3Rpb24obixyLHQpe3JldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7cmV0dXJuIG4uYXBwbHkobnVsbCx0KX0scil9KSxoLmRlZmVyPWgucGFydGlhbChoLmRlbGF5LGgsMSksaC50aHJvdHRsZT1mdW5jdGlvbih0LGUsdSl7dmFyIGksbyxhLGMsbD0wO3V8fCh1PXt9KTt2YXIgZj1mdW5jdGlvbigpe2w9ITE9PT11LmxlYWRpbmc/MDpoLm5vdygpLGk9bnVsbCxjPXQuYXBwbHkobyxhKSxpfHwobz1hPW51bGwpfSxuPWZ1bmN0aW9uKCl7dmFyIG49aC5ub3coKTtsfHwhMSE9PXUubGVhZGluZ3x8KGw9bik7dmFyIHI9ZS0obi1sKTtyZXR1cm4gbz10aGlzLGE9YXJndW1lbnRzLHI8PTB8fGU8cj8oaSYmKGNsZWFyVGltZW91dChpKSxpPW51bGwpLGw9bixjPXQuYXBwbHkobyxhKSxpfHwobz1hPW51bGwpKTppfHwhMT09PXUudHJhaWxpbmd8fChpPXNldFRpbWVvdXQoZixyKSksY307cmV0dXJuIG4uY2FuY2VsPWZ1bmN0aW9uKCl7Y2xlYXJUaW1lb3V0KGkpLGw9MCxpPW89YT1udWxsfSxufSxoLmRlYm91bmNlPWZ1bmN0aW9uKHQsZSx1KXt2YXIgaSxvLGE9ZnVuY3Rpb24obixyKXtpPW51bGwsciYmKG89dC5hcHBseShuLHIpKX0sbj1nKGZ1bmN0aW9uKG4pe2lmKGkmJmNsZWFyVGltZW91dChpKSx1KXt2YXIgcj0haTtpPXNldFRpbWVvdXQoYSxlKSxyJiYobz10LmFwcGx5KHRoaXMsbikpfWVsc2UgaT1oLmRlbGF5KGEsZSx0aGlzLG4pO3JldHVybiBvfSk7cmV0dXJuIG4uY2FuY2VsPWZ1bmN0aW9uKCl7Y2xlYXJUaW1lb3V0KGkpLGk9bnVsbH0sbn0saC53cmFwPWZ1bmN0aW9uKG4scil7cmV0dXJuIGgucGFydGlhbChyLG4pfSxoLm5lZ2F0ZT1mdW5jdGlvbihuKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4hbi5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fSxoLmNvbXBvc2U9ZnVuY3Rpb24oKXt2YXIgdD1hcmd1bWVudHMsZT10Lmxlbmd0aC0xO3JldHVybiBmdW5jdGlvbigpe2Zvcih2YXIgbj1lLHI9dFtlXS5hcHBseSh0aGlzLGFyZ3VtZW50cyk7bi0tOylyPXRbbl0uY2FsbCh0aGlzLHIpO3JldHVybiByfX0saC5hZnRlcj1mdW5jdGlvbihuLHIpe3JldHVybiBmdW5jdGlvbigpe2lmKC0tbjwxKXJldHVybiByLmFwcGx5KHRoaXMsYXJndW1lbnRzKX19LGguYmVmb3JlPWZ1bmN0aW9uKG4scil7dmFyIHQ7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIDA8LS1uJiYodD1yLmFwcGx5KHRoaXMsYXJndW1lbnRzKSksbjw9MSYmKHI9bnVsbCksdH19LGgub25jZT1oLnBhcnRpYWwoaC5iZWZvcmUsMiksaC5yZXN0QXJndW1lbnRzPWc7dmFyIEk9IXt0b1N0cmluZzpudWxsfS5wcm9wZXJ0eUlzRW51bWVyYWJsZShcInRvU3RyaW5nXCIpLFQ9W1widmFsdWVPZlwiLFwiaXNQcm90b3R5cGVPZlwiLFwidG9TdHJpbmdcIixcInByb3BlcnR5SXNFbnVtZXJhYmxlXCIsXCJoYXNPd25Qcm9wZXJ0eVwiLFwidG9Mb2NhbGVTdHJpbmdcIl0sQj1mdW5jdGlvbihuLHIpe3ZhciB0PVQubGVuZ3RoLGU9bi5jb25zdHJ1Y3Rvcix1PWguaXNGdW5jdGlvbihlKSYmZS5wcm90b3R5cGV8fG8saT1cImNvbnN0cnVjdG9yXCI7Zm9yKGoobixpKSYmIWguY29udGFpbnMocixpKSYmci5wdXNoKGkpO3QtLTspKGk9VFt0XSlpbiBuJiZuW2ldIT09dVtpXSYmIWguY29udGFpbnMocixpKSYmci5wdXNoKGkpfTtoLmtleXM9ZnVuY3Rpb24obil7aWYoIWguaXNPYmplY3QobikpcmV0dXJuW107aWYoYSlyZXR1cm4gYShuKTt2YXIgcj1bXTtmb3IodmFyIHQgaW4gbilqKG4sdCkmJnIucHVzaCh0KTtyZXR1cm4gSSYmQihuLHIpLHJ9LGguYWxsS2V5cz1mdW5jdGlvbihuKXtpZighaC5pc09iamVjdChuKSlyZXR1cm5bXTt2YXIgcj1bXTtmb3IodmFyIHQgaW4gbilyLnB1c2godCk7cmV0dXJuIEkmJkIobixyKSxyfSxoLnZhbHVlcz1mdW5jdGlvbihuKXtmb3IodmFyIHI9aC5rZXlzKG4pLHQ9ci5sZW5ndGgsZT1BcnJheSh0KSx1PTA7dTx0O3UrKyllW3VdPW5bclt1XV07cmV0dXJuIGV9LGgubWFwT2JqZWN0PWZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGU9aC5rZXlzKG4pLHU9ZS5sZW5ndGgsaT17fSxvPTA7bzx1O28rKyl7dmFyIGE9ZVtvXTtpW2FdPXIoblthXSxhLG4pfXJldHVybiBpfSxoLnBhaXJzPWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj1oLmtleXMobiksdD1yLmxlbmd0aCxlPUFycmF5KHQpLHU9MDt1PHQ7dSsrKWVbdV09W3JbdV0sbltyW3VdXV07cmV0dXJuIGV9LGguaW52ZXJ0PWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj17fSx0PWgua2V5cyhuKSxlPTAsdT10Lmxlbmd0aDtlPHU7ZSsrKXJbblt0W2VdXV09dFtlXTtyZXR1cm4gcn0saC5mdW5jdGlvbnM9aC5tZXRob2RzPWZ1bmN0aW9uKG4pe3ZhciByPVtdO2Zvcih2YXIgdCBpbiBuKWguaXNGdW5jdGlvbihuW3RdKSYmci5wdXNoKHQpO3JldHVybiByLnNvcnQoKX07dmFyIFI9ZnVuY3Rpb24oYyxsKXtyZXR1cm4gZnVuY3Rpb24obil7dmFyIHI9YXJndW1lbnRzLmxlbmd0aDtpZihsJiYobj1PYmplY3QobikpLHI8Mnx8bnVsbD09bilyZXR1cm4gbjtmb3IodmFyIHQ9MTt0PHI7dCsrKWZvcih2YXIgZT1hcmd1bWVudHNbdF0sdT1jKGUpLGk9dS5sZW5ndGgsbz0wO288aTtvKyspe3ZhciBhPXVbb107bCYmdm9pZCAwIT09blthXXx8KG5bYV09ZVthXSl9cmV0dXJuIG59fTtoLmV4dGVuZD1SKGguYWxsS2V5cyksaC5leHRlbmRPd249aC5hc3NpZ249UihoLmtleXMpLGguZmluZEtleT1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlLHU9aC5rZXlzKG4pLGk9MCxvPXUubGVuZ3RoO2k8bztpKyspaWYocihuW2U9dVtpXV0sZSxuKSlyZXR1cm4gZX07dmFyIHEsSyx6PWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gciBpbiB0fTtoLnBpY2s9ZyhmdW5jdGlvbihuLHIpe3ZhciB0PXt9LGU9clswXTtpZihudWxsPT1uKXJldHVybiB0O2guaXNGdW5jdGlvbihlKT8oMTxyLmxlbmd0aCYmKGU9eShlLHJbMV0pKSxyPWguYWxsS2V5cyhuKSk6KGU9eixyPU0ociwhMSwhMSksbj1PYmplY3QobikpO2Zvcih2YXIgdT0wLGk9ci5sZW5ndGg7dTxpO3UrKyl7dmFyIG89clt1XSxhPW5bb107ZShhLG8sbikmJih0W29dPWEpfXJldHVybiB0fSksaC5vbWl0PWcoZnVuY3Rpb24obix0KXt2YXIgcixlPXRbMF07cmV0dXJuIGguaXNGdW5jdGlvbihlKT8oZT1oLm5lZ2F0ZShlKSwxPHQubGVuZ3RoJiYocj10WzFdKSk6KHQ9aC5tYXAoTSh0LCExLCExKSxTdHJpbmcpLGU9ZnVuY3Rpb24obixyKXtyZXR1cm4haC5jb250YWlucyh0LHIpfSksaC5waWNrKG4sZSxyKX0pLGguZGVmYXVsdHM9UihoLmFsbEtleXMsITApLGguY3JlYXRlPWZ1bmN0aW9uKG4scil7dmFyIHQ9bShuKTtyZXR1cm4gciYmaC5leHRlbmRPd24odCxyKSx0fSxoLmNsb25lPWZ1bmN0aW9uKG4pe3JldHVybiBoLmlzT2JqZWN0KG4pP2guaXNBcnJheShuKT9uLnNsaWNlKCk6aC5leHRlbmQoe30sbik6bn0saC50YXA9ZnVuY3Rpb24obixyKXtyZXR1cm4gcihuKSxufSxoLmlzTWF0Y2g9ZnVuY3Rpb24obixyKXt2YXIgdD1oLmtleXMociksZT10Lmxlbmd0aDtpZihudWxsPT1uKXJldHVybiFlO2Zvcih2YXIgdT1PYmplY3QobiksaT0wO2k8ZTtpKyspe3ZhciBvPXRbaV07aWYocltvXSE9PXVbb118fCEobyBpbiB1KSlyZXR1cm4hMX1yZXR1cm4hMH0scT1mdW5jdGlvbihuLHIsdCxlKXtpZihuPT09cilyZXR1cm4gMCE9PW58fDEvbj09MS9yO2lmKG51bGw9PW58fG51bGw9PXIpcmV0dXJuITE7aWYobiE9bilyZXR1cm4gciE9cjt2YXIgdT10eXBlb2YgbjtyZXR1cm4oXCJmdW5jdGlvblwiPT09dXx8XCJvYmplY3RcIj09PXV8fFwib2JqZWN0XCI9PXR5cGVvZiByKSYmSyhuLHIsdCxlKX0sSz1mdW5jdGlvbihuLHIsdCxlKXtuIGluc3RhbmNlb2YgaCYmKG49bi5fd3JhcHBlZCksciBpbnN0YW5jZW9mIGgmJihyPXIuX3dyYXBwZWQpO3ZhciB1PXAuY2FsbChuKTtpZih1IT09cC5jYWxsKHIpKXJldHVybiExO3N3aXRjaCh1KXtjYXNlXCJbb2JqZWN0IFJlZ0V4cF1cIjpjYXNlXCJbb2JqZWN0IFN0cmluZ11cIjpyZXR1cm5cIlwiK249PVwiXCIrcjtjYXNlXCJbb2JqZWN0IE51bWJlcl1cIjpyZXR1cm4rbiE9K24/K3IhPStyOjA9PStuPzEvK249PTEvcjorbj09K3I7Y2FzZVwiW29iamVjdCBEYXRlXVwiOmNhc2VcIltvYmplY3QgQm9vbGVhbl1cIjpyZXR1cm4rbj09K3I7Y2FzZVwiW29iamVjdCBTeW1ib2xdXCI6cmV0dXJuIHMudmFsdWVPZi5jYWxsKG4pPT09cy52YWx1ZU9mLmNhbGwocil9dmFyIGk9XCJbb2JqZWN0IEFycmF5XVwiPT09dTtpZighaSl7aWYoXCJvYmplY3RcIiE9dHlwZW9mIG58fFwib2JqZWN0XCIhPXR5cGVvZiByKXJldHVybiExO3ZhciBvPW4uY29uc3RydWN0b3IsYT1yLmNvbnN0cnVjdG9yO2lmKG8hPT1hJiYhKGguaXNGdW5jdGlvbihvKSYmbyBpbnN0YW5jZW9mIG8mJmguaXNGdW5jdGlvbihhKSYmYSBpbnN0YW5jZW9mIGEpJiZcImNvbnN0cnVjdG9yXCJpbiBuJiZcImNvbnN0cnVjdG9yXCJpbiByKXJldHVybiExfWU9ZXx8W107Zm9yKHZhciBjPSh0PXR8fFtdKS5sZW5ndGg7Yy0tOylpZih0W2NdPT09bilyZXR1cm4gZVtjXT09PXI7aWYodC5wdXNoKG4pLGUucHVzaChyKSxpKXtpZigoYz1uLmxlbmd0aCkhPT1yLmxlbmd0aClyZXR1cm4hMTtmb3IoO2MtLTspaWYoIXEobltjXSxyW2NdLHQsZSkpcmV0dXJuITF9ZWxzZXt2YXIgbCxmPWgua2V5cyhuKTtpZihjPWYubGVuZ3RoLGgua2V5cyhyKS5sZW5ndGghPT1jKXJldHVybiExO2Zvcig7Yy0tOylpZihsPWZbY10sIWoocixsKXx8IXEobltsXSxyW2xdLHQsZSkpcmV0dXJuITF9cmV0dXJuIHQucG9wKCksZS5wb3AoKSwhMH0saC5pc0VxdWFsPWZ1bmN0aW9uKG4scil7cmV0dXJuIHEobixyKX0saC5pc0VtcHR5PWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT1ufHwodyhuKSYmKGguaXNBcnJheShuKXx8aC5pc1N0cmluZyhuKXx8aC5pc0FyZ3VtZW50cyhuKSk/MD09PW4ubGVuZ3RoOjA9PT1oLmtleXMobikubGVuZ3RoKX0saC5pc0VsZW1lbnQ9ZnVuY3Rpb24obil7cmV0dXJuISghbnx8MSE9PW4ubm9kZVR5cGUpfSxoLmlzQXJyYXk9dHx8ZnVuY3Rpb24obil7cmV0dXJuXCJbb2JqZWN0IEFycmF5XVwiPT09cC5jYWxsKG4pfSxoLmlzT2JqZWN0PWZ1bmN0aW9uKG4pe3ZhciByPXR5cGVvZiBuO3JldHVyblwiZnVuY3Rpb25cIj09PXJ8fFwib2JqZWN0XCI9PT1yJiYhIW59LGguZWFjaChbXCJBcmd1bWVudHNcIixcIkZ1bmN0aW9uXCIsXCJTdHJpbmdcIixcIk51bWJlclwiLFwiRGF0ZVwiLFwiUmVnRXhwXCIsXCJFcnJvclwiLFwiU3ltYm9sXCIsXCJNYXBcIixcIldlYWtNYXBcIixcIlNldFwiLFwiV2Vha1NldFwiXSxmdW5jdGlvbihyKXtoW1wiaXNcIityXT1mdW5jdGlvbihuKXtyZXR1cm4gcC5jYWxsKG4pPT09XCJbb2JqZWN0IFwiK3IrXCJdXCJ9fSksaC5pc0FyZ3VtZW50cyhhcmd1bWVudHMpfHwoaC5pc0FyZ3VtZW50cz1mdW5jdGlvbihuKXtyZXR1cm4gaihuLFwiY2FsbGVlXCIpfSk7dmFyIEQ9bi5kb2N1bWVudCYmbi5kb2N1bWVudC5jaGlsZE5vZGVzO1wiZnVuY3Rpb25cIiE9dHlwZW9mLy4vJiZcIm9iamVjdFwiIT10eXBlb2YgSW50OEFycmF5JiZcImZ1bmN0aW9uXCIhPXR5cGVvZiBEJiYoaC5pc0Z1bmN0aW9uPWZ1bmN0aW9uKG4pe3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIG58fCExfSksaC5pc0Zpbml0ZT1mdW5jdGlvbihuKXtyZXR1cm4haC5pc1N5bWJvbChuKSYmaXNGaW5pdGUobikmJiFpc05hTihwYXJzZUZsb2F0KG4pKX0saC5pc05hTj1mdW5jdGlvbihuKXtyZXR1cm4gaC5pc051bWJlcihuKSYmaXNOYU4obil9LGguaXNCb29sZWFuPWZ1bmN0aW9uKG4pe3JldHVybiEwPT09bnx8ITE9PT1ufHxcIltvYmplY3QgQm9vbGVhbl1cIj09PXAuY2FsbChuKX0saC5pc051bGw9ZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PT1ufSxoLmlzVW5kZWZpbmVkPWZ1bmN0aW9uKG4pe3JldHVybiB2b2lkIDA9PT1ufSxoLmhhcz1mdW5jdGlvbihuLHIpe2lmKCFoLmlzQXJyYXkocikpcmV0dXJuIGoobixyKTtmb3IodmFyIHQ9ci5sZW5ndGgsZT0wO2U8dDtlKyspe3ZhciB1PXJbZV07aWYobnVsbD09bnx8IWkuY2FsbChuLHUpKXJldHVybiExO249blt1XX1yZXR1cm4hIXR9LGgubm9Db25mbGljdD1mdW5jdGlvbigpe3JldHVybiBuLl89cix0aGlzfSxoLmlkZW50aXR5PWZ1bmN0aW9uKG4pe3JldHVybiBufSxoLmNvbnN0YW50PWZ1bmN0aW9uKG4pe3JldHVybiBmdW5jdGlvbigpe3JldHVybiBufX0saC5ub29wPWZ1bmN0aW9uKCl7fSxoLnByb3BlcnR5PWZ1bmN0aW9uKHIpe3JldHVybiBoLmlzQXJyYXkocik/ZnVuY3Rpb24obil7cmV0dXJuIHgobixyKX06YihyKX0saC5wcm9wZXJ0eU9mPWZ1bmN0aW9uKHIpe3JldHVybiBudWxsPT1yP2Z1bmN0aW9uKCl7fTpmdW5jdGlvbihuKXtyZXR1cm4gaC5pc0FycmF5KG4pP3gocixuKTpyW25dfX0saC5tYXRjaGVyPWgubWF0Y2hlcz1mdW5jdGlvbihyKXtyZXR1cm4gcj1oLmV4dGVuZE93bih7fSxyKSxmdW5jdGlvbihuKXtyZXR1cm4gaC5pc01hdGNoKG4scil9fSxoLnRpbWVzPWZ1bmN0aW9uKG4scix0KXt2YXIgZT1BcnJheShNYXRoLm1heCgwLG4pKTtyPXkocix0LDEpO2Zvcih2YXIgdT0wO3U8bjt1KyspZVt1XT1yKHUpO3JldHVybiBlfSxoLnJhbmRvbT1mdW5jdGlvbihuLHIpe3JldHVybiBudWxsPT1yJiYocj1uLG49MCksbitNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqKHItbisxKSl9LGgubm93PURhdGUubm93fHxmdW5jdGlvbigpe3JldHVybihuZXcgRGF0ZSkuZ2V0VGltZSgpfTt2YXIgTD17XCImXCI6XCImYW1wO1wiLFwiPFwiOlwiJmx0O1wiLFwiPlwiOlwiJmd0O1wiLCdcIic6XCImcXVvdDtcIixcIidcIjpcIiYjeDI3O1wiLFwiYFwiOlwiJiN4NjA7XCJ9LFA9aC5pbnZlcnQoTCksVz1mdW5jdGlvbihyKXt2YXIgdD1mdW5jdGlvbihuKXtyZXR1cm4gcltuXX0sbj1cIig/OlwiK2gua2V5cyhyKS5qb2luKFwifFwiKStcIilcIixlPVJlZ0V4cChuKSx1PVJlZ0V4cChuLFwiZ1wiKTtyZXR1cm4gZnVuY3Rpb24obil7cmV0dXJuIG49bnVsbD09bj9cIlwiOlwiXCIrbixlLnRlc3Qobik/bi5yZXBsYWNlKHUsdCk6bn19O2guZXNjYXBlPVcoTCksaC51bmVzY2FwZT1XKFApLGgucmVzdWx0PWZ1bmN0aW9uKG4scix0KXtoLmlzQXJyYXkocil8fChyPVtyXSk7dmFyIGU9ci5sZW5ndGg7aWYoIWUpcmV0dXJuIGguaXNGdW5jdGlvbih0KT90LmNhbGwobik6dDtmb3IodmFyIHU9MDt1PGU7dSsrKXt2YXIgaT1udWxsPT1uP3ZvaWQgMDpuW3JbdV1dO3ZvaWQgMD09PWkmJihpPXQsdT1lKSxuPWguaXNGdW5jdGlvbihpKT9pLmNhbGwobik6aX1yZXR1cm4gbn07dmFyIEM9MDtoLnVuaXF1ZUlkPWZ1bmN0aW9uKG4pe3ZhciByPSsrQytcIlwiO3JldHVybiBuP24rcjpyfSxoLnRlbXBsYXRlU2V0dGluZ3M9e2V2YWx1YXRlOi88JShbXFxzXFxTXSs/KSU+L2csaW50ZXJwb2xhdGU6LzwlPShbXFxzXFxTXSs/KSU+L2csZXNjYXBlOi88JS0oW1xcc1xcU10rPyklPi9nfTt2YXIgSj0vKC4pXi8sVT17XCInXCI6XCInXCIsXCJcXFxcXCI6XCJcXFxcXCIsXCJcXHJcIjpcInJcIixcIlxcblwiOlwiblwiLFwiXFx1MjAyOFwiOlwidTIwMjhcIixcIlxcdTIwMjlcIjpcInUyMDI5XCJ9LFY9L1xcXFx8J3xcXHJ8XFxufFxcdTIwMjh8XFx1MjAyOS9nLCQ9ZnVuY3Rpb24obil7cmV0dXJuXCJcXFxcXCIrVVtuXX07aC50ZW1wbGF0ZT1mdW5jdGlvbihpLG4scil7IW4mJnImJihuPXIpLG49aC5kZWZhdWx0cyh7fSxuLGgudGVtcGxhdGVTZXR0aW5ncyk7dmFyIHQsZT1SZWdFeHAoWyhuLmVzY2FwZXx8Sikuc291cmNlLChuLmludGVycG9sYXRlfHxKKS5zb3VyY2UsKG4uZXZhbHVhdGV8fEopLnNvdXJjZV0uam9pbihcInxcIikrXCJ8JFwiLFwiZ1wiKSxvPTAsYT1cIl9fcCs9J1wiO2kucmVwbGFjZShlLGZ1bmN0aW9uKG4scix0LGUsdSl7cmV0dXJuIGErPWkuc2xpY2Uobyx1KS5yZXBsYWNlKFYsJCksbz11K24ubGVuZ3RoLHI/YSs9XCInK1xcbigoX190PShcIityK1wiKSk9PW51bGw/Jyc6Xy5lc2NhcGUoX190KSkrXFxuJ1wiOnQ/YSs9XCInK1xcbigoX190PShcIit0K1wiKSk9PW51bGw/Jyc6X190KStcXG4nXCI6ZSYmKGErPVwiJztcXG5cIitlK1wiXFxuX19wKz0nXCIpLG59KSxhKz1cIic7XFxuXCIsbi52YXJpYWJsZXx8KGE9XCJ3aXRoKG9ianx8e30pe1xcblwiK2ErXCJ9XFxuXCIpLGE9XCJ2YXIgX190LF9fcD0nJyxfX2o9QXJyYXkucHJvdG90eXBlLmpvaW4sXCIrXCJwcmludD1mdW5jdGlvbigpe19fcCs9X19qLmNhbGwoYXJndW1lbnRzLCcnKTt9O1xcblwiK2ErXCJyZXR1cm4gX19wO1xcblwiO3RyeXt0PW5ldyBGdW5jdGlvbihuLnZhcmlhYmxlfHxcIm9ialwiLFwiX1wiLGEpfWNhdGNoKG4pe3Rocm93IG4uc291cmNlPWEsbn12YXIgdT1mdW5jdGlvbihuKXtyZXR1cm4gdC5jYWxsKHRoaXMsbixoKX0sYz1uLnZhcmlhYmxlfHxcIm9ialwiO3JldHVybiB1LnNvdXJjZT1cImZ1bmN0aW9uKFwiK2MrXCIpe1xcblwiK2ErXCJ9XCIsdX0saC5jaGFpbj1mdW5jdGlvbihuKXt2YXIgcj1oKG4pO3JldHVybiByLl9jaGFpbj0hMCxyfTt2YXIgRz1mdW5jdGlvbihuLHIpe3JldHVybiBuLl9jaGFpbj9oKHIpLmNoYWluKCk6cn07aC5taXhpbj1mdW5jdGlvbih0KXtyZXR1cm4gaC5lYWNoKGguZnVuY3Rpb25zKHQpLGZ1bmN0aW9uKG4pe3ZhciByPWhbbl09dFtuXTtoLnByb3RvdHlwZVtuXT1mdW5jdGlvbigpe3ZhciBuPVt0aGlzLl93cmFwcGVkXTtyZXR1cm4gdS5hcHBseShuLGFyZ3VtZW50cyksRyh0aGlzLHIuYXBwbHkoaCxuKSl9fSksaH0saC5taXhpbihoKSxoLmVhY2goW1wicG9wXCIsXCJwdXNoXCIsXCJyZXZlcnNlXCIsXCJzaGlmdFwiLFwic29ydFwiLFwic3BsaWNlXCIsXCJ1bnNoaWZ0XCJdLGZ1bmN0aW9uKHIpe3ZhciB0PWVbcl07aC5wcm90b3R5cGVbcl09ZnVuY3Rpb24oKXt2YXIgbj10aGlzLl93cmFwcGVkO3JldHVybiB0LmFwcGx5KG4sYXJndW1lbnRzKSxcInNoaWZ0XCIhPT1yJiZcInNwbGljZVwiIT09cnx8MCE9PW4ubGVuZ3RofHxkZWxldGUgblswXSxHKHRoaXMsbil9fSksaC5lYWNoKFtcImNvbmNhdFwiLFwiam9pblwiLFwic2xpY2VcIl0sZnVuY3Rpb24obil7dmFyIHI9ZVtuXTtoLnByb3RvdHlwZVtuXT1mdW5jdGlvbigpe3JldHVybiBHKHRoaXMsci5hcHBseSh0aGlzLl93cmFwcGVkLGFyZ3VtZW50cykpfX0pLGgucHJvdG90eXBlLnZhbHVlPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX3dyYXBwZWR9LGgucHJvdG90eXBlLnZhbHVlT2Y9aC5wcm90b3R5cGUudG9KU09OPWgucHJvdG90eXBlLnZhbHVlLGgucHJvdG90eXBlLnRvU3RyaW5nPWZ1bmN0aW9uKCl7cmV0dXJuIFN0cmluZyh0aGlzLl93cmFwcGVkKX0sXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kJiZkZWZpbmUoXCJ1bmRlcnNjb3JlXCIsW10sZnVuY3Rpb24oKXtyZXR1cm4gaH0pfSgpO1xyXG4iLCJpbXBvcnQge2V4dHJhY3RFeHRlbnNpb259IGZyb20gXCJ1dGlscy9zdHJpbmdzXCI7XHJcblxyXG5leHBvcnQgY29uc3QgaXNSdG1wID0gZnVuY3Rpb24gKGZpbGUsIHR5cGUpIHtcclxuICAgIGlmKGZpbGUpe1xyXG4gICAgICAgIHJldHVybiAoZmlsZS5pbmRleE9mKCdydG1wOicpID09IDAgfHwgdHlwZSA9PSAncnRtcCcpO1xyXG4gICAgfVxyXG59O1xyXG5leHBvcnQgY29uc3QgaXNXZWJSVEMgPSBmdW5jdGlvbiAoZmlsZSwgdHlwZSkge1xyXG4gICAgaWYoZmlsZSl7XHJcbiAgICAgICAgcmV0dXJuIChmaWxlLmluZGV4T2YoJ3dzOicpID09PSAwIHx8IGZpbGUuaW5kZXhPZignd3NzOicpID09PSAwIHx8IHR5cGUgPT09ICd3ZWJydGMnKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGlzSGxzID0gZnVuY3Rpb24gKGZpbGUsIHR5cGUpIHtcclxuICAgIGlmKGZpbGUpe1xyXG4gICAgICAgIHJldHVybiAoIHR5cGUgPT09ICdobHMnIHx8ICB0eXBlID09PSAnbTN1OCcgfHwgdHlwZSA9PT0gJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyB8fCBleHRyYWN0RXh0ZW5zaW9uKGZpbGUpID09ICdtM3U4Jyk7XHJcblxyXG4gICAgfVxyXG59O1xyXG5leHBvcnQgY29uc3QgaXNEYXNoID0gZnVuY3Rpb24gKGZpbGUsIHR5cGUpIHtcclxuICAgIGlmKGZpbGUpe1xyXG4gICAgICAgIHJldHVybiAoIHR5cGUgPT09ICdtcGQnIHx8ICB0eXBlID09PSAnZGFzaCcgfHwgdHlwZSA9PT0gJ2FwcGxpY2F0aW9uL2Rhc2greG1sJyB8fCBleHRyYWN0RXh0ZW5zaW9uKGZpbGUpID09ICdtcGQnKTtcclxuXHJcbiAgICB9XHJcbn07XHJcbiIsIi8qKlxyXG4gKiB1dGlscyBmb3Igd2VicGFja1xyXG4gKi9cclxuXHJcbmV4cG9ydCBjb25zdCBnZXRTY3JpcHRQYXRoID0gZnVuY3Rpb24oc2NyaXB0TmFtZSkge1xyXG4gICAgY29uc3Qgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2NyaXB0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHNyYyA9IHNjcmlwdHNbaV0uc3JjO1xyXG4gICAgICAgIGlmIChzcmMpIHtcclxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBzcmMubGFzdEluZGV4T2YoJy8nICsgc2NyaXB0TmFtZSk7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3JjLnN1YnN0cigwLCBpbmRleCArIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuICcnO1xyXG59O1xyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDYuIDI5Li5cclxuICovXHJcbmV4cG9ydCBjb25zdCB2ZXJzaW9uID0gX19WRVJTSU9OX187XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=