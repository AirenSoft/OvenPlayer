/*! OvenPlayerv0.9.0 | (c)2020 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
            fullscreenOption: null
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
            "low_latency_live": "low latency live",
            "low_latency_p2p": "low latency p2p"
        },
        "playlist": "Playlist",
        "setting": {
            "title": "Settings",
            "speed": "Speed",
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
                "message": "Can not load due to unsupported media.",
                "reason": "Can not load due to unsupported media."
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
                "message": "지원되지 않는 미디어로 인해 로드 할 수 없습니다.",
                "reason": "Can not load due to unsupported media."
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
var version = exports.version = '0.9.0-2020091017-localbuild';

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvQXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvQXBpRXhwYW5zaW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0NvbmZpZ3VyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0V2ZW50RW1pdHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0xhenlDb21tYW5kRXhlY3V0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9TdXBwb3J0Q2hlY2tlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2NhcHRpb24vTG9hZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvY2FwdGlvbi9NYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvY2FwdGlvbi9wYXJzZXIvU3J0UGFyc2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvY29uc3RhbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvbWVkaWEvTWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3BsYXlsaXN0L01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9Db250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9vdmVucGxheWVyLnNkay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvY2FwdGlvbnMvdnR0Q3VlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9saWtlQSQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3N0cmluZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3VuZGVyc2NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3ZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvd2VicGFjay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmVyc2lvbi5qcyJdLCJuYW1lcyI6WyJBcGkiLCJjb250YWluZXIiLCJ0aGF0IiwiY29uc29sZSIsImxvZyIsInZlcnNpb24iLCJPdmVuUGxheWVyQ29uc29sZSIsInBsYXlsaXN0TWFuYWdlciIsInByb3ZpZGVyQ29udHJvbGxlciIsInVzZXJBZ2VudE9iamVjdCIsIm1lZGlhTWFuYWdlciIsImN1cnJlbnRQcm92aWRlciIsInBsYXllckNvbmZpZyIsImxhenlRdWV1ZSIsImNhcHRpb25NYW5hZ2VyIiwid2VicnRjUmV0cnkiLCJXRUJSVENfUkVUUllfQ09VTlQiLCJ3ZWJydGNSZXRyeUNvdW50Iiwid2VicnRjUmV0cnlJbnRlcnZhbCIsIndlYnJ0Y1JldHJ5VGltZXIiLCJydW5OZXh0UGxheWxpc3QiLCJpbmRleCIsIm5leHRQbGF5bGlzdEluZGV4IiwicGxheWxpc3QiLCJnZXRQbGF5bGlzdCIsImhhc05leHRQbGF5bGlzdCIsInNldFNvdXJjZUluZGV4Iiwic2V0Vm9sdW1lIiwiZ2V0Vm9sdW1lIiwic2V0Q3VycmVudFBsYXlsaXN0IiwiaW5pdFByb3ZpZGVyIiwiaXNBdXRvU3RhcnQiLCJwbGF5IiwidHJpZ2dlciIsIkFMTF9QTEFZTElTVF9FTkRFRCIsImxhc3RQbGF5UG9zaXRpb24iLCJwaWNrUXVhbGl0eUZyb21Tb3VyY2UiLCJzb3VyY2VzIiwicXVhbGl0eSIsImkiLCJsZW5ndGgiLCJnZXRTb3VyY2VJbmRleCIsImxvYWRQcm92aWRlcnMiLCJnZXRDdXJyZW50UGxheUxpc3QiLCJ0aGVuIiwiUHJvdmlkZXJzIiwiRVJST1JTIiwiY29kZXMiLCJJTklUX1VOU1VQUE9SVF9FUlJPUiIsImRlc3Ryb3kiLCJnZXRDdXJyZW50UGxheWxpc3RJbmRleCIsImN1cnJlbnRTb3VyY2VJbmRleCIsImdldEN1cnJlbnRTb3VyY2VzIiwicHJvdmlkZXJOYW1lIiwicHJvdmlkZXIiLCJjcmVhdGVNZWRpYSIsImdldEN1cnJlbnRBZFRhZyIsIlBST1ZJREVSX1JUTVAiLCJvbiIsIm5hbWUiLCJkYXRhIiwiRVJST1IiLCJvcyIsImJyb3dzZXIiLCJjb2RlIiwiUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUiIsInNldFRpbWVvdXQiLCJzZXRDdXJyZW50U291cmNlIiwiZ2V0Q3VycmVudFNvdXJjZSIsIlBMQVlFUl9QTEFZIiwiY2xlYXJJbnRlcnZhbCIsIk5FVFdPUktfVU5TVEFCTEVEIiwiUExBWUVSX1dFQlJUQ19VTkVYUEVDVEVEX0RJU0NPTk5FQ1QiLCJnZXRDb25maWciLCJhdXRvRmFsbGJhY2siLCJQTEFZRVJfV0VCUlRDX05FVFdPUktfU0xPVyIsImdldFNvdXJjZXMiLCJwYXVzZSIsInByZWxvYWQiLCJSRUFEWSIsImZsdXNoIiwiZXJyb3IiLCJvZmYiLCJ0ZW1wRXJyb3IiLCJJTklUX1VOS05XT05fRVJST1IiLCJpbml0Iiwib3B0aW9ucyIsIm1lZGlhQ29udGFpbmVyIiwiZ2V0U3lzdGVtVGV4dCIsImFwaSIsImluaXRQbGF5bGlzdCIsImdldFByb3ZpZGVyTmFtZSIsImdldE5hbWUiLCJnZXRCcm93c2VyIiwic2V0VGltZWNvZGVNb2RlIiwiaXNTaG93IiwiaXNUaW1lY29kZU1vZGUiLCJnZXRGcmFtZXJhdGUiLCJzZWVrRnJhbWUiLCJmcmFtZUNvdW50IiwiZ2V0RHVyYXRpb24iLCJnZXRQb3NpdGlvbiIsInZvbHVtZSIsInNldE11dGUiLCJzdGF0ZSIsImdldE11dGUiLCJsb2FkIiwic2V0Q3VycmVudFF1YWxpdHkiLCJzZWVrIiwicG9zaXRpb24iLCJzZXRQbGF5YmFja1JhdGUiLCJwbGF5YmFja1JhdGUiLCJnZXRQbGF5YmFja1JhdGUiLCJnZXRDdXJyZW50UGxheWxpc3QiLCJjdXJyZW50U291cmNlIiwibmV3U291cmNlIiwiaXNTYW1lUHJvdmlkZXIiLCJyZXN1bHRTb3VyY2VJbmRleCIsIlBST1ZJREVSX0hMUyIsIlBST1ZJREVSX0RBU0giLCJQUk9WSURFUl9IVE1MNSIsImdldFF1YWxpdHlMZXZlbHMiLCJnZXRDdXJyZW50UXVhbGl0eSIsInF1YWxpdHlJbmRleCIsImlzQXV0b1F1YWxpdHkiLCJzZXRBdXRvUXVhbGl0eSIsImlzQXV0byIsImdldENhcHRpb25MaXN0IiwiZ2V0Q3VycmVudENhcHRpb24iLCJzZXRDdXJyZW50Q2FwdGlvbiIsImFkZENhcHRpb24iLCJ0cmFjayIsInJlbW92ZUNhcHRpb24iLCJnZXRCdWZmZXIiLCJnZXRTdGF0ZSIsInN0b3AiLCJyZW1vdmUiLCJERVNUUk9ZIiwiT3ZlblBsYXllclNESyIsInJlbW92ZVBsYXllciIsImdldENvbnRhaW5lcklkIiwiZ2V0UGxheWVyTGlzdCIsImdldFZlcnNpb24iLCJBcGlSdG1wRXhwYW5zaW9uIiwiZXh0ZXJuYWxDYWxsYmFja0NyZWVwIiwicmVzdWx0IiwidHJpZ2dlckV2ZW50RnJvbUV4dGVybmFsIiwiQ29uZmlndXJhdG9yIiwiY29tcG9zZVNvdXJjZU9wdGlvbnMiLCJEZWZhdWx0cyIsInBsYXliYWNrUmF0ZXMiLCJtdXRlIiwibG9vcCIsImNvbnRyb2xzIiwiYXV0b1N0YXJ0IiwidGltZWNvZGUiLCJzb3VyY2VJbmRleCIsImhpZGVQbGF5bGlzdEljb24iLCJydG1wQnVmZmVyVGltZSIsInJ0bXBCdWZmZXJUaW1lTWF4IiwiYWRDbGllbnQiLCJjdXJyZW50UHJvdG9jb2xPbmx5Iiwic3lzdGVtVGV4dCIsImxhbmciLCJsb2FkaW5nUmV0cnlDb3VudCIsImV4cGFuZEZ1bGxTY3JlZW5VSSIsImZ1bGxzY3JlZW5PcHRpb24iLCJzZXJpYWxpemUiLCJ2YWwiLCJ1bmRlZmluZWQiLCJsb3dlcmNhc2VWYWwiLCJ0b0xvd2VyQ2FzZSIsImlzTmFOIiwiTnVtYmVyIiwicGFyc2VGbG9hdCIsImRlc2VyaWFsaXplIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJrZXkiLCJjb25maWciLCJ1c2VyQ3VzdHVtU3lzdGVtVGV4dCIsIl8iLCJpc0FycmF5IiwiY3VycmVudFN5c3RlbVRleHQiLCJmaW5kV2hlcmUiLCJTWVNURU1fVEVYVCIsInB1c2giLCJmaWx0ZXIiLCJpc051bWJlciIsInJhdGUiLCJtYXAiLCJNYXRoIiwicm91bmQiLCJpbmRleE9mIiwic29ydCIsImNvbmZpZ1BsYXlsaXN0Iiwib2JqIiwicGljayIsImZlZWREYXRhIiwiZHVyYXRpb24iLCJzcGVjIiwiZ2V0QWRDbGllbnQiLCJzZXRDb25maWciLCJ2YWx1ZSIsImdldENvbnRhaW5lciIsImdldFF1YWxpdHlMYWJlbCIsInF1YWxpdHlMYWJlbCIsInNldFF1YWxpdHlMYWJlbCIsIm5ld0xhYmVsIiwiaXNDdXJyZW50UHJvdG9jb2xPbmx5IiwiQ09OVEVOVF9USU1FX01PREVfQ0hBTkdFRCIsImdldFJ0bXBCdWZmZXJUaW1lIiwiZ2V0UnRtcEJ1ZmZlclRpbWVNYXgiLCJpc011dGUiLCJpc0xvb3AiLCJpc0NvbnRyb2xzIiwiZ2V0UGxheWJhY2tSYXRlcyIsImdldExhbmd1YWdlIiwic2V0UGxheWxpc3QiLCJFdmVudEVtaXR0ZXIiLCJvYmplY3QiLCJfZXZlbnRzIiwidHJpZ2dlckV2ZW50cyIsImV2ZW50cyIsImFyZ3MiLCJjb250ZXh0IiwiZXZlbnQiLCJsaXN0ZW5lciIsImFwcGx5Iiwic2xpY2UiLCJjYWxsIiwiYXJndW1lbnRzIiwiYWxsRXZlbnRzIiwiYWxsIiwibmFtZXMiLCJsIiwicmV0YWluIiwiaiIsImsiLCJfbGlzdGVuZXIiLCJvbmNlIiwiY291bnQiLCJvbmNlQ2FsbGJhY2siLCJMYXp5Q29tbWFuZEV4ZWN1dG9yIiwiaW5zdGFuY2UiLCJxdWV1ZWRDb21tYW5kcyIsImNvbW1hbmRRdWV1ZSIsInVuZGVjb3JhdGVkTWV0aG9kcyIsImV4ZWN1dGVNb2RlIiwiY29tbWFuZCIsIm1ldGhvZCIsIkFycmF5IiwicHJvdG90eXBlIiwiYWRkUXVldWUiLCJleGVjdXRlUXVldWVkQ29tbWFuZHMiLCJzaGlmdCIsInNldEV4ZWN1dGVNb2RlIiwibW9kZSIsImdldFVuZGVjb3JhdGVkTWV0aG9kcyIsImdldFF1ZXVlIiwiZW1wdHkiLCJyZW1vdmVBbmRFeGN1dGVPbmNlIiwiY29tbWFuZF8iLCJjb21tYW5kUXVldWVJdGVtIiwic3BsaWNlIiwiZmluZEluZGV4IiwiU3VwcG9ydENoZWNrZXIiLCJzdXBwb3J0TGlzdCIsImNoZWNrU3VwcG9ydCIsInNvdXJjZSIsIk1pbWVUeXBlcyIsImFhYyIsIm1wNCIsImY0diIsIm00diIsIm1vdiIsIm1wMyIsIm1wZWciLCJvZ3YiLCJvZ2ciLCJvZ2EiLCJ2b3JiaXMiLCJ3ZWJtIiwiZjRhIiwibTN1OCIsIm0zdSIsImhscyIsInZpZGVvIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2FuUGxheVR5cGUiLCJmaWxlIiwidHlwZSIsIm1pbWVUeXBlIiwid2luZG93IiwiTWVkaWFTb3VyY2UiLCJXZWJLaXRNZWRpYVNvdXJjZSIsImlzSGxzU3VwcG9ydCIsImdldE1lZGlhU291cmNlIiwibWVkaWFTb3VyY2UiLCJzb3VyY2VCdWZmZXIiLCJTb3VyY2VCdWZmZXIiLCJXZWJLaXRTb3VyY2VCdWZmZXIiLCJpc1R5cGVTdXBwb3J0ZWQiLCJzb3VyY2VCdWZmZXJWYWxpZEFQSSIsImFwcGVuZEJ1ZmZlciIsInRlc3RGbGFzaCIsInN1cHBvcnQiLCJBY3RpdmVYT2JqZWN0IiwiZSIsIm5hdmlnYXRvciIsIm1pbWVUeXBlcyIsImZpbmRQcm92aWRlck5hbWVCeVNvdXJjZSIsInNvcnVjZV8iLCJmaW5kUHJvdmlkZXJOYW1lc0J5UGxheWxpc3QiLCJwbGF5bGlzdEl0ZW0iLCJzdXBwb3J0TmFtZXMiLCJpdGVtIiwic3VwcG9ydGVkIiwiTG9hZGVyIiwiY29udmVydFRvVlRUQ3VlcyIsImN1ZXMiLCJWVFRDdWUiLCJjdWUiLCJzdGFydCIsImVuZCIsInRleHQiLCJsYW5ndWFnZSIsInN1Y2Nlc3NDYWxsYmFjayIsImVycm9yQ2FsbGJhY2siLCJyZXF1ZXN0T3B0aW9ucyIsInVybCIsImVuY29kaW5nIiwibG9hZFJlcXVlc3REb3dubG9kZXIiLCJSZXF1ZXN0IiwicmVzcG9uc2UiLCJib2R5IiwidnR0Q3VlcyIsImxvYWRWdHRQYXJzZXIiLCJwYXJzZXIiLCJXZWJWVFQiLCJQYXJzZXIiLCJTdHJpbmdEZWNvZGVyIiwib25jdWUiLCJvbmZsdXNoIiwicGFyc2UiLCJsb2FkU21pUGFyc2VyIiwicGFyc2VkRGF0YSIsIlNtaVBhcnNlciIsImZpeGVkTGFuZyIsInJlcXVpcmUiLCJlcnIiLCJpc1N1cHBvcnQiLCJraW5kIiwiTWFuYWdlciIsInBsYXlsaXN0SW5kZXgiLCJjYXB0aW9uTGlzdCIsImN1cnJlbnRDYXB0aW9uSW5kZXgiLCJjYXB0aW9uTG9hZGVyIiwiaXNGaXNydExvYWQiLCJpc1Nob3dpbmciLCJiaW5kVHJhY2siLCJsYWJlbCIsImlkIiwidHJhY2tzQ291bnQiLCJ0cmFja0lkIiwicHJlZml4IiwiZGVmYXVsdHRyYWNrIiwiY2hhbmdlQ3VycmVudENhcHRpb24iLCJDT05URU5UX0NBUFRJT05fQ0hBTkdFRCIsInRyYWNrcyIsImNhcHRpb25JZCIsIlBMQVlFUl9DQVBUSU9OX0VSUk9SIiwiQ09OVEVOVF9USU1FIiwibWV0YSIsImN1cnJlbnRDdWVzIiwic3RhcnRUaW1lIiwiZW5kVGltZSIsIkNPTlRFTlRfQ0FQVElPTl9DVUVfQ0hBTkdFRCIsImZsdXNoQ2FwdGlvbkxpc3QiLCJsYXN0Q2FwdGlvbkluZGV4IiwiX2luZGV4IiwiZXJyb3JzIiwiX2VudHJ5IiwiZW50cnkiLCJhcnJheSIsInNwbGl0IiwiaWR4IiwibGluZSIsInN1YnN0ciIsImpvaW4iLCJTcnRQYXJzZXIiLCJjYXB0aW9ucyIsImxpc3QiLCJTVEFURV9CVUZGRVJJTkciLCJTVEFURV9JRExFIiwiU1RBVEVfQ09NUExFVEUiLCJTVEFURV9QQVVTRUQiLCJTVEFURV9QTEFZSU5HIiwiU1RBVEVfRVJST1IiLCJTVEFURV9MT0FESU5HIiwiU1RBVEVfU1RBTExFRCIsIlNUQVRFX0FEX0xPQURJTkciLCJTVEFURV9BRF9MT0FERUQiLCJTVEFURV9BRF9QTEFZSU5HIiwiU1RBVEVfQURfUEFVU0VEIiwiU1RBVEVfQURfQ09NUExFVEUiLCJTVEFURV9BRF9FUlJPUiIsIlBMQVlFUl9BRF9DTElDSyIsIlBST1ZJREVSX1dFQlJUQyIsIkNPTlRFTlRfQ09NUExFVEUiLCJDT05URU5UX1NFRUsiLCJDT05URU5UX0JVRkZFUl9GVUxMIiwiRElTUExBWV9DTElDSyIsIkNPTlRFTlRfTE9BREVEIiwiUExBWUxJU1RfQ0hBTkdFRCIsIkNPTlRFTlRfU0VFS0VEIiwiUExBWUVSX1NUQVRFIiwiUExBWUVSX0NPTVBMRVRFIiwiUExBWUVSX1BBVVNFIiwiUExBWUVSX0NMSUNLRUQiLCJQTEFZRVJfUkVTSVpFRCIsIlBMQVlFUl9MT0FESU5HIiwiUExBWUVSX0ZVTExTQ1JFRU5fUkVRVUVTVCIsIlBMQVlFUl9GVUxMU0NSRUVOX0NIQU5HRUQiLCJQTEFZRVJfV0FSTklORyIsIkFEX0NIQU5HRUQiLCJBRF9USU1FIiwiQ09OVEVOVF9CVUZGRVIiLCJDT05URU5UX1JBVEVfQ0hBTkdFIiwiQ09OVEVOVF9WT0xVTUUiLCJDT05URU5UX01VVEUiLCJDT05URU5UX01FVEEiLCJDT05URU5UX1NPVVJDRV9DSEFOR0VEIiwiQ09OVEVOVF9MRVZFTF9DSEFOR0VEIiwiUExBWUJBQ0tfUkFURV9DSEFOR0VEIiwiT01FX1AyUF9NT0RFIiwiQURfQ0xJRU5UX0dPT0dMRUlNQSIsIkFEX0NMSUVOVF9WQVNUIiwiSU5JVF9SVE1QX1NFVFVQX0VSUk9SIiwiSU5JVF9EQVNIX1VOU1VQUE9SVCIsIklOSVRfQURTX0VSUk9SIiwiSU5JVF9EQVNIX05PVEZPVU5EIiwiSU5JVF9ITFNKU19OT1RGT1VORCIsIlBMQVlFUl9VTktOV09OX0VSUk9SIiwiUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SIiwiUExBWUVSX1VOS05XT05fTkVUV09SS19FUlJPUiIsIlBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUiIsIlBMQVlFUl9GSUxFX0VSUk9SIiwiUExBWUVSX0JBRF9SRVFVRVNUX0VSUk9SIiwiUExBWUVSX0FVVEhfRkFJTEVEX0VSUk9SIiwiUExBWUVSX05PVF9BQ0NFUFRBQkxFX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19XU19FUlJPUiIsIlBMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUiIsIlBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19DUkVBVEVfQU5TV0VSX0VSUk9SIiwiV0FSTl9NU0dfTVVURURQTEFZIiwiVUlfSUNPTlMiLCJ2b2x1bWVfbXV0ZSIsIm9wX3dhcm5pbmciLCJicm93c2VySW5mbyIsIlNXRlBhdGgiLCJyb290SWQiLCJnZXRBdHRyaWJ1dGUiLCIkY29udGFpbmVyIiwidmlkZW9FbGVtZW50IiwiY3JlYXRlSHRtbFZpZGVvIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kIiwiY3JlYXRlRmxhc2hWaWRlbyIsImJ1ZmZlclRpbWUiLCJidWZmZXJUaW1lTWF4IiwibW92aWUiLCJmbGFzaHZhcnMiLCJhbGxvd3NjcmlwdGFjY2VzcyIsImFsbG93ZnVsbHNjcmVlbiIsIm1lbnUiLCJxdWFsIiwiYmdjb2xvciIsIndtb2RlIiwiYnJvd3Nlck1ham9yVmVyc2lvbiIsImFwcGVuZENoaWxkIiwiY3JlYXRlQWRDb250YWluZXIiLCJhZENvbnRhaW5lciIsInJlbW92ZUNoaWxkIiwiY3VycmVudFBsYXlsaXN0SXRlbSIsImN1cnJlbnRJbmRleCIsInN1cHBvcnRDaGVja2VyIiwibWFrZVByZXR0eVNvdXJjZSIsInNvdXJjZV8iLCJob3N0IiwiYXBwbGljYXRpb24iLCJzdHJlYW0iLCJtaW1ldHlwZVJlZ0V4IiwidGVzdCIsInJlcGxhY2UiLCJsb3dMYXRlbmN5IiwicHJldHRpZWRQbGF5bGlzdCIsInRpdGxlIiwibGV2ZWxzIiwicHJldHR5U291cmNlIiwiZGVmYXVsdFNvdXJjZSIsInRvU3RyaW5nIiwiZXh0cmFjdE9ubHlPbmVQcm90b2NvbCIsImhpZ2hQcmlvcml0eVR5cGUiLCJjb25jYXQiLCJhZFRhZ1VybCIsIkNvbnRyb2xsZXIiLCJzdXBwb3J0Q2hhY2tlciIsInJlZ2lzdGVQcm92aWRlciIsIlByb3ZpZGVyTG9hZGVyIiwiaHRtbDUiLCJFcnJvciIsIndlYnJ0YyIsImRhc2giLCJydG1wIiwic3VwcG9ydGVkUHJvdmlkZXJOYW1lcyIsIlByb21pc2UiLCJyZWplY3QiLCJmaW5kQnlOYW1lIiwiZ2V0UHJvdmlkZXJCeVNvdXJjZSIsInN1cHBvcnRlZFByb3ZpZGVyTmFtZSIsIl9fd2VicGFja19wdWJsaWNfcGF0aF9fIiwicGxheWVyTGlzdCIsImNoZWNrQW5kR2V0Q29udGFpbmVyRWxlbWVudCIsImNvbnRhaW5lckVsZW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIm5vZGVUeXBlIiwiY3JlYXRlIiwicGxheWVySW5zdGFuY2UiLCJnZXRQbGF5ZXJCeUNvbnRhaW5lcklkIiwiY29udGFpbmVySWQiLCJnZXRQbGF5ZXJCeUluZGV4IiwicGxheWVySWQiLCJnZW5lcmF0ZVdlYnJ0Y1VybHMiLCJkZWJ1ZyIsImlzRGVidWdNb2RlIiwiZ2V0QnJvd3Nlckxhbmd1YWdlIiwibmF2IiwiYnJvd3Nlckxhbmd1YWdlUHJvcGVydHlLZXlzIiwibGFuZ3VhZ2VzIiwiYW5hbFVzZXJBZ2VudCIsInVua25vd24iLCJzY3JlZW5TaXplIiwic2NyZWVuIiwid2lkdGgiLCJoZWlnaHQiLCJuVmVyIiwiYXBwVmVyc2lvbiIsIm5BZ3QiLCJ1c2VyQWdlbnQiLCJhcHBOYW1lIiwibWFqb3JWZXJzaW9uIiwicGFyc2VJbnQiLCJpc1dlYnZpZXciLCJuYW1lT2Zmc2V0IiwidmVyT2Zmc2V0IiwiaXgiLCJzdWJzdHJpbmciLCJsYXN0SW5kZXhPZiIsInRvVXBwZXJDYXNlIiwibW9iaWxlIiwiY29va2llRW5hYmxlZCIsImNvb2tpZSIsImNsaWVudFN0cmluZ3MiLCJzIiwiciIsImNzIiwib3NWZXJzaW9uIiwiZXhlYyIsImJyb3dzZXJWZXJzaW9uIiwidWEiLCJjb29raWVzIiwiYXV0b0tleXdvcmQiLCJkaXJlY3Rpb25TZXR0aW5nIiwiYWxpZ25TZXR0aW5nIiwiZmluZERpcmVjdGlvblNldHRpbmciLCJkaXIiLCJmaW5kQWxpZ25TZXR0aW5nIiwiYWxpZ24iLCJleHRlbmQiLCJjb2JqIiwicCIsImlzSUU4IiwiYmFzZU9iaiIsImVudW1lcmFibGUiLCJoYXNCZWVuUmVzZXQiLCJfaWQiLCJfcGF1c2VPbkV4aXQiLCJfc3RhcnRUaW1lIiwiX2VuZFRpbWUiLCJfdGV4dCIsIl9yZWdpb24iLCJfdmVydGljYWwiLCJfc25hcFRvTGluZXMiLCJfbGluZSIsIl9saW5lQWxpZ24iLCJfcG9zaXRpb24iLCJfcG9zaXRpb25BbGlnbiIsIl9zaXplIiwiX2FsaWduIiwiZGVmaW5lUHJvcGVydHkiLCJnZXQiLCJzZXQiLCJUeXBlRXJyb3IiLCJzZXR0aW5nIiwiU3ludGF4RXJyb3IiLCJkaXNwbGF5U3RhdGUiLCJnZXRDdWVBc0hUTUwiLCJjb252ZXJ0Q3VlVG9ET01UcmVlIiwiTGEkIiwic2VsZWN0b3JPckVsZW1lbnQiLCJyZXR1cm5Ob2RlIiwiJGVsZW1lbnQiLCJzZWxlY3RvciIsIm5vZGVMaXN0IiwicXVlcnlTZWxlY3RvckFsbCIsImlzRWxlbWVudCIsImV2ZXJ5Iiwic2hvdyIsInN0eWxlIiwiZGlzcGxheSIsImhpZGUiLCJhZGRDbGFzcyIsImNsYXNzTGlzdCIsImFkZCIsImNsYXNzTmFtZXMiLCJjbGFzc05hbWUiLCJhZnRlciIsImh0bWxTdHJpbmciLCJpbnNlcnRBZGphY2VudEhUTUwiLCJiZWZvcmUiLCJjaGlsZHJlbiIsImNvbnRhaW5zIiwiZWxDaGlsZCIsImlubmVySFRNTCIsImZpbmQiLCJjc3MiLCJlbGVtZW50IiwicmVtb3ZlQ2xhc3MiLCJSZWdFeHAiLCJyZW1vdmVBdHRyaWJ1dGUiLCJhdHRyTmFtZSIsInRleHRDb250ZW50IiwiaHRtbCIsImhhc0NsYXNzIiwiaXMiLCIkdGFyZ2V0RWxlbWVudCIsIm9mZnNldCIsInJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0b3AiLCJzY3JvbGxUb3AiLCJsZWZ0Iiwic2Nyb2xsTGVmdCIsImNsaWVudFdpZHRoIiwiY2xpZW50SGVpZ2h0IiwiYXR0ciIsInJlcGxhY2VXaXRoIiwicGFyZW50RWxlbWVudCIsImhhc0NoaWxkTm9kZXMiLCJmaXJzdENoaWxkIiwiY2xvc2VzdCIsInNlbGVjdG9yU3RyaW5nIiwiY2xvc2VzdEVsZW1lbnQiLCJ0cmltIiwibmF0dXJhbEhtcyIsImhtc1RvU2Vjb25kIiwic3RyaW5nIiwiZXh0cmFjdEV4dGVuc2lvbiIsInBhdGgiLCJnZXRBenVyZUZpbGVGb3JtYXQiLCJleHRlbnNpb24iLCJhenVyZWRGb3JtYXQiLCJzZWNvbmQiLCJzZWNOdW0iLCJob3VycyIsImZsb29yIiwibWludXRlcyIsInNlY29uZHMiLCJzdHIiLCJmcmFtZVJhdGUiLCJhcnIiLCJhcnJMZW5ndGgiLCJzZWMiLCJzZWNJbmRleCIsIm4iLCJzZWxmIiwiZ2xvYmFsIiwibyIsIlN5bWJvbCIsInUiLCJjIiwiaGFzT3duUHJvcGVydHkiLCJ0IiwiYSIsImYiLCJoIiwiX3dyYXBwZWQiLCJleHBvcnRzIiwibW9kdWxlIiwiVkVSU0lPTiIsInYiLCJ5IiwiZCIsIml0ZXJhdGVlIiwiaWRlbnRpdHkiLCJpc0Z1bmN0aW9uIiwiaXNPYmplY3QiLCJtYXRjaGVyIiwicHJvcGVydHkiLCJnIiwibWF4IiwibSIsImIiLCJ4IiwicG93IiwiQSIsInciLCJlYWNoIiwiY29sbGVjdCIsIk8iLCJyZWR1Y2UiLCJmb2xkbCIsImluamVjdCIsInJlZHVjZVJpZ2h0IiwiZm9sZHIiLCJkZXRlY3QiLCJmaW5kS2V5Iiwic2VsZWN0IiwibmVnYXRlIiwic29tZSIsImFueSIsImluY2x1ZGVzIiwiaW5jbHVkZSIsInZhbHVlcyIsImludm9rZSIsInBsdWNrIiwid2hlcmUiLCJtaW4iLCJzaHVmZmxlIiwic2FtcGxlIiwicmFuZG9tIiwiY2xvbmUiLCJzb3J0QnkiLCJjcml0ZXJpYSIsImdyb3VwQnkiLCJpbmRleEJ5IiwiY291bnRCeSIsIlMiLCJ0b0FycmF5IiwiaXNTdHJpbmciLCJtYXRjaCIsInNpemUiLCJwYXJ0aXRpb24iLCJmaXJzdCIsImhlYWQiLCJ0YWtlIiwiaW5pdGlhbCIsImxhc3QiLCJyZXN0IiwidGFpbCIsImRyb3AiLCJjb21wYWN0IiwiQm9vbGVhbiIsIk0iLCJpc0FyZ3VtZW50cyIsImZsYXR0ZW4iLCJ3aXRob3V0IiwiZGlmZmVyZW5jZSIsInVuaXEiLCJ1bmlxdWUiLCJpc0Jvb2xlYW4iLCJ1bmlvbiIsImludGVyc2VjdGlvbiIsInVuemlwIiwiemlwIiwiRiIsImZpbmRMYXN0SW5kZXgiLCJzb3J0ZWRJbmRleCIsIkUiLCJyYW5nZSIsImNlaWwiLCJjaHVuayIsIk4iLCJiaW5kIiwicGFydGlhbCIsInBsYWNlaG9sZGVyIiwiYmluZEFsbCIsIm1lbW9pemUiLCJjYWNoZSIsImRlbGF5IiwiZGVmZXIiLCJ0aHJvdHRsZSIsImxlYWRpbmciLCJub3ciLCJjbGVhclRpbWVvdXQiLCJ0cmFpbGluZyIsImNhbmNlbCIsImRlYm91bmNlIiwid3JhcCIsImNvbXBvc2UiLCJyZXN0QXJndW1lbnRzIiwiSSIsInByb3BlcnR5SXNFbnVtZXJhYmxlIiwiVCIsIkIiLCJjb25zdHJ1Y3RvciIsImFsbEtleXMiLCJtYXBPYmplY3QiLCJwYWlycyIsImludmVydCIsImZ1bmN0aW9ucyIsIm1ldGhvZHMiLCJSIiwiZXh0ZW5kT3duIiwiYXNzaWduIiwicSIsIksiLCJ6Iiwib21pdCIsIlN0cmluZyIsImRlZmF1bHRzIiwidGFwIiwiaXNNYXRjaCIsInZhbHVlT2YiLCJwb3AiLCJpc0VxdWFsIiwiaXNFbXB0eSIsIkQiLCJjaGlsZE5vZGVzIiwiSW50OEFycmF5IiwiaXNGaW5pdGUiLCJpc1N5bWJvbCIsImlzTnVsbCIsImlzVW5kZWZpbmVkIiwiaGFzIiwibm9Db25mbGljdCIsImNvbnN0YW50Iiwibm9vcCIsInByb3BlcnR5T2YiLCJtYXRjaGVzIiwidGltZXMiLCJEYXRlIiwiZ2V0VGltZSIsIkwiLCJQIiwiVyIsImVzY2FwZSIsInVuZXNjYXBlIiwiQyIsInVuaXF1ZUlkIiwidGVtcGxhdGVTZXR0aW5ncyIsImV2YWx1YXRlIiwiaW50ZXJwb2xhdGUiLCJKIiwiVSIsIlYiLCIkIiwidGVtcGxhdGUiLCJ2YXJpYWJsZSIsIkZ1bmN0aW9uIiwiY2hhaW4iLCJfY2hhaW4iLCJHIiwibWl4aW4iLCJ0b0pTT04iLCJkZWZpbmUiLCJpc1J0bXAiLCJpc1dlYlJUQyIsImlzSGxzIiwiaXNEYXNoIiwiZ2V0U2NyaXB0UGF0aCIsInNjcmlwdE5hbWUiLCJzY3JpcHRzIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJzcmMiLCJfX1ZFUlNJT05fXyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQVEsb0JBQW9CO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBLGlEQUF5QyxzNEJBQXM0QjtBQUMvNkI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBLHlDQUFpQzs7QUFFakM7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUF3Qixr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dGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcblxuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHR9O1xuXG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcIm92ZW5wbGF5ZXIuc2RrXCI6IDBcbiBcdH07XG5cblxuXG4gXHQvLyBzY3JpcHQgcGF0aCBmdW5jdGlvblxuIFx0ZnVuY3Rpb24ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCkge1xuIFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArICh7XCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjJlYzE5M2FjXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjJlYzE5M2FjXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjdhZmQ2OGNmXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyfm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDV+b3ZlbnBsYXllfjdhZmQ2OGNmXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlclwiOlwib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuSGxzUHJvdmlkZXJcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDVcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuSHRtbDVcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuV2ViUlRDUHJvdmlkZXJcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuV2ViUlRDUHJvdmlkZXJcIixcIm92ZW5wbGF5ZXIucHJvdmlkZXIuUnRtcFByb3ZpZGVyXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLlJ0bXBQcm92aWRlclwiLFwic21pcGFyc2VyXCI6XCJzbWlwYXJzZXJcIixcInZlbmRvcnN+ZG93bmxvYWRlclwiOlwidmVuZG9yc35kb3dubG9hZGVyXCIsXCJkb3dubG9hZGVyXCI6XCJkb3dubG9hZGVyXCIsXCJ2dHRwYXJzZXJcIjpcInZ0dHBhcnNlclwifVtjaHVua0lkXXx8Y2h1bmtJZCkgKyBcIi5qc1wiXG4gXHR9XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuIFx0Ly8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuIFx0Ly8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSBmdW5jdGlvbiByZXF1aXJlRW5zdXJlKGNodW5rSWQpIHtcbiBcdFx0dmFyIHByb21pc2VzID0gW107XG5cblxuIFx0XHQvLyBKU09OUCBjaHVuayBsb2FkaW5nIGZvciBqYXZhc2NyaXB0XG5cbiBcdFx0dmFyIGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhICE9PSAwKSB7IC8vIDAgbWVhbnMgXCJhbHJlYWR5IGluc3RhbGxlZFwiLlxuXG4gXHRcdFx0Ly8gYSBQcm9taXNlIG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEpIHtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdKTtcbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Ly8gc2V0dXAgUHJvbWlzZSBpbiBjaHVuayBjYWNoZVxuIFx0XHRcdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gW3Jlc29sdmUsIHJlamVjdF07XG4gXHRcdFx0XHR9KTtcbiBcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdID0gcHJvbWlzZSk7XG5cbiBcdFx0XHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcbiBcdFx0XHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiBcdFx0XHRcdHZhciBvblNjcmlwdENvbXBsZXRlO1xuXG4gXHRcdFx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG4gXHRcdFx0XHRzY3JpcHQudGltZW91dCA9IDEyMDtcbiBcdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG4gXHRcdFx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHNjcmlwdC5zcmMgPSBqc29ucFNjcmlwdFNyYyhjaHVua0lkKTtcblxuIFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuIFx0XHRcdFx0XHQvLyBhdm9pZCBtZW0gbGVha3MgaW4gSUUuXG4gXHRcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG51bGw7XG4gXHRcdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiBcdFx0XHRcdFx0dmFyIGNodW5rID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRcdFx0XHRpZihjaHVuayAhPT0gMCkge1xuIFx0XHRcdFx0XHRcdGlmKGNodW5rKSB7XG4gXHRcdFx0XHRcdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJyA/ICdtaXNzaW5nJyA6IGV2ZW50LnR5cGUpO1xuIFx0XHRcdFx0XHRcdFx0dmFyIHJlYWxTcmMgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYztcbiBcdFx0XHRcdFx0XHRcdHZhciBlcnJvciA9IG5ldyBFcnJvcignTG9hZGluZyBjaHVuayAnICsgY2h1bmtJZCArICcgZmFpbGVkLlxcbignICsgZXJyb3JUeXBlICsgJzogJyArIHJlYWxTcmMgKyAnKScpO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnJlcXVlc3QgPSByZWFsU3JjO1xuIFx0XHRcdFx0XHRcdFx0Y2h1bmtbMV0oZXJyb3IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSB1bmRlZmluZWQ7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH07XG4gXHRcdFx0XHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiBcdFx0XHRcdFx0b25TY3JpcHRDb21wbGV0ZSh7IHR5cGU6ICd0aW1lb3V0JywgdGFyZ2V0OiBzY3JpcHQgfSk7XG4gXHRcdFx0XHR9LCAxMjAwMDApO1xuIFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gb25TY3JpcHRDb21wbGV0ZTtcbiBcdFx0XHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0cmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gb24gZXJyb3IgZnVuY3Rpb24gZm9yIGFzeW5jIGxvYWRpbmdcbiBcdF9fd2VicGFja19yZXF1aXJlX18ub2UgPSBmdW5jdGlvbihlcnIpIHsgY29uc29sZS5lcnJvcihlcnIpOyB0aHJvdyBlcnI7IH07XG5cbiBcdHZhciBqc29ucEFycmF5ID0gd2luZG93W1wid2VicGFja0pzb25wXCJdID0gd2luZG93W1wid2VicGFja0pzb25wXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvanMvb3ZlbnBsYXllci5zZGsuanNcIik7XG4iLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHRpZiAoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcblx0XHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XG5cdH1cblx0cmV0dXJuIG1vZHVsZTtcbn07XG4iLCJpbXBvcnQgQ2FwdGlvbk1hbmFnZXIgZnJvbSBcImFwaS9jYXB0aW9uL01hbmFnZXJcIjtcbmltcG9ydCBDb25maWd1cmF0b3IgZnJvbSBcImFwaS9Db25maWd1cmF0b3JcIjtcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImFwaS9FdmVudEVtaXR0ZXJcIjtcbmltcG9ydCBMYXp5Q29tbWFuZEV4ZWN1dG9yIGZyb20gXCJhcGkvTGF6eUNvbW1hbmRFeGVjdXRvclwiO1xuaW1wb3J0IE1lZGlhTWFuYWdlciBmcm9tIFwiYXBpL21lZGlhL01hbmFnZXJcIjtcbmltcG9ydCBQbGF5bGlzdE1hbmFnZXIgZnJvbSBcImFwaS9wbGF5bGlzdC9NYW5hZ2VyXCI7XG5pbXBvcnQgUHJvdmlkZXJDb250cm9sbGVyIGZyb20gXCJhcGkvcHJvdmlkZXIvQ29udHJvbGxlclwiO1xuaW1wb3J0IHtSRUFEWSwgRVJST1JTLCBFUlJPUiwgQ09OVEVOVF9USU1FX01PREVfQ0hBTkdFRCwgSU5JVF9VTktOV09OX0VSUk9SLCBJTklUX1VOU1VQUE9SVF9FUlJPUiwgREVTVFJPWSwgUExBWUVSX1BMQVksIE5FVFdPUktfVU5TVEFCTEVELCBQTEFZRVJfV0VCUlRDX05FVFdPUktfU0xPVywgUExBWUVSX1dFQlJUQ19VTkVYUEVDVEVEX0RJU0NPTk5FQ1QsIFBMQVlFUl9XRUJSVENfU0VUX0xPQ0FMX0RFU0NfRVJST1IsXG4gICAgUExBWUVSX0ZJTEVfRVJST1IsIFBST1ZJREVSX0RBU0gsIFBST1ZJREVSX0hMUywgUFJPVklERVJfV0VCUlRDLCBQUk9WSURFUl9IVE1MNSwgUFJPVklERVJfUlRNUCwgQUxMX1BMQVlMSVNUX0VOREVEfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuaW1wb3J0IHt2ZXJzaW9ufSBmcm9tICd2ZXJzaW9uJztcbmltcG9ydCB7QXBpUnRtcEV4cGFuc2lvbn0gZnJvbSAnYXBpL0FwaUV4cGFuc2lvbnMnO1xuaW1wb3J0IHthbmFsVXNlckFnZW50fSBmcm9tIFwidXRpbHMvYnJvd3NlclwiO1xuaW1wb3J0IExBJCBmcm9tICd1dGlscy9saWtlQSQnO1xuXG4vKipcbiAqIEBicmllZiAgIFRoaXMgb2JqZWN0IGNvbm5lY3RzIFVJIHRvIHRoZSBwcm92aWRlci5cbiAqIEBwYXJhbSAgIHtvYmplY3R9ICAgIGNvbnRhaW5lciAgZG9tIGVsZW1lbnRcbiAqXG4gKiAqL1xuXG5jb25zdCBBcGkgPSBmdW5jdGlvbihjb250YWluZXIpe1xuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICBFdmVudEVtaXR0ZXIodGhhdCk7XG5cblxuICAgIGNvbnNvbGUubG9nKFwiW1tPdmVuUGxheWVyXV0gdi5cIisgdmVyc2lvbik7XG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIGxvYWRlZC5cIik7XG5cbiAgICBsZXQgcGxheWxpc3RNYW5hZ2VyID0gUGxheWxpc3RNYW5hZ2VyKHRoYXQpO1xuICAgIGxldCBwcm92aWRlckNvbnRyb2xsZXIgPSBQcm92aWRlckNvbnRyb2xsZXIoKTtcbiAgICBsZXQgdXNlckFnZW50T2JqZWN0ID0gYW5hbFVzZXJBZ2VudCgpO1xuICAgIGxldCBtZWRpYU1hbmFnZXIgPSBNZWRpYU1hbmFnZXIoY29udGFpbmVyLCB1c2VyQWdlbnRPYmplY3QpO1xuICAgIGxldCBjdXJyZW50UHJvdmlkZXIgPSBcIlwiO1xuICAgIGxldCBwbGF5ZXJDb25maWcgPSBcIlwiO1xuICAgIGxldCBsYXp5UXVldWUgPSBcIlwiO1xuICAgIGxldCBjYXB0aW9uTWFuYWdlciA9IFwiXCI7XG5cbiAgICBsZXQgd2VicnRjUmV0cnkgPSBmYWxzZTtcbiAgICBjb25zdCBXRUJSVENfUkVUUllfQ09VTlQgPSAzO1xuICAgIGxldCB3ZWJydGNSZXRyeUNvdW50ID0gV0VCUlRDX1JFVFJZX0NPVU5UO1xuICAgIGxldCB3ZWJydGNSZXRyeUludGVydmFsID0gMTAwMDtcbiAgICBsZXQgd2VicnRjUmV0cnlUaW1lciA9IG51bGw7XG5cblxuICAgIGNvbnN0IHJ1bk5leHRQbGF5bGlzdCA9IGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwicnVuTmV4dFBsYXlsaXN0XCIpO1xuICAgICAgICBsZXQgbmV4dFBsYXlsaXN0SW5kZXggPSBpbmRleDsgLy8gfHwgcGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRQbGF5bGlzdEluZGV4KCkgKyAxO1xuICAgICAgICBsZXQgcGxheWxpc3QgPSBwbGF5bGlzdE1hbmFnZXIuZ2V0UGxheWxpc3QoKTtcbiAgICAgICAgbGV0IGhhc05leHRQbGF5bGlzdCA9IHBsYXlsaXN0W25leHRQbGF5bGlzdEluZGV4XT8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAvL2luaXQgc291cmNlIGluZGV4XG4gICAgICAgIHBsYXllckNvbmZpZy5zZXRTb3VyY2VJbmRleCgwKTtcblxuICAgICAgICAvL3NldCBHb2xiYWwgVm9sdW1lIGluZm9cbiAgICAgICAgcGxheWVyQ29uZmlnLnNldFZvbHVtZShjdXJyZW50UHJvdmlkZXIuZ2V0Vm9sdW1lKCkpO1xuXG4gICAgICAgIGlmKGhhc05leHRQbGF5bGlzdCl7XG4gICAgICAgICAgICAvL3RoYXQucGF1c2UoKTtcbiAgICAgICAgICAgIGxhenlRdWV1ZSA9IExhenlDb21tYW5kRXhlY3V0b3IodGhhdCwgWydwbGF5Jywnc2VlaycsJ3N0b3AnXSk7XG4gICAgICAgICAgICBwbGF5bGlzdE1hbmFnZXIuc2V0Q3VycmVudFBsYXlsaXN0KG5leHRQbGF5bGlzdEluZGV4KTtcbiAgICAgICAgICAgIGluaXRQcm92aWRlcigpO1xuXG5cbiAgICAgICAgICAgIGlmKCFwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSl7XG4gICAgICAgICAgICAgICAgLy9Bbnl3YXkgbmV4dHBsYXlsaXN0IHJ1bnMgYXV0b1N0YXJ0IS5cbiAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAvL0FsbCBQbGF5bGlzdCBFbmRlZC5cbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihBTExfUExBWUxJU1RfRU5ERUQsIG51bGwpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBpbml0UHJvdmlkZXIgPSBmdW5jdGlvbihsYXN0UGxheVBvc2l0aW9uKXtcbiAgICAgICAgY29uc3QgcGlja1F1YWxpdHlGcm9tU291cmNlID0gKHNvdXJjZXMpID0+e1xuICAgICAgICAgICAgdmFyIHF1YWxpdHkgPSAwO1xuICAgICAgICAgICAgaWYgKHNvdXJjZXMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZXNbaV0uZGVmYXVsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVhbGl0eSA9IGk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRTb3VyY2VJbmRleCgpID09PSBpICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLyppZiAocGxheWVyQ29uZmlnLmdldFNvdXJjZUxhYmVsKCkgJiYgc291cmNlc1tpXS5sYWJlbCA9PT0gcGxheWVyQ29uZmlnLmdldFNvdXJjZUxhYmVsKCkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgICAgICAgICAgfSovXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHF1YWxpdHk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHByb3ZpZGVyQ29udHJvbGxlci5sb2FkUHJvdmlkZXJzKHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50UGxheUxpc3QoKSkudGhlbihQcm92aWRlcnMgPT4ge1xuXG4gICAgICAgICAgICBpZihQcm92aWRlcnMubGVuZ3RoIDwgMSl7XG4gICAgICAgICAgICAgICAgdGhyb3cgRVJST1JTLmNvZGVzW0lOSVRfVU5TVVBQT1JUX0VSUk9SXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoY3VycmVudFByb3ZpZGVyKXtcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlciA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihjYXB0aW9uTWFuYWdlcil7XG4gICAgICAgICAgICAgICAgY2FwdGlvbk1hbmFnZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIGNhcHRpb25NYW5hZ2VyID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhcHRpb25NYW5hZ2VyID0gQ2FwdGlvbk1hbmFnZXIodGhhdCwgcGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRQbGF5bGlzdEluZGV4KCkpO1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaW5pdCgpIGNhcHRpb25zXCIpO1xuXG4gICAgICAgICAgICBsZXQgY3VycmVudFNvdXJjZUluZGV4ID0gcGlja1F1YWxpdHlGcm9tU291cmNlKHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50U291cmNlcygpKTtcbiAgICAgICAgICAgIGxldCBwcm92aWRlck5hbWUgPSBQcm92aWRlcnNbY3VycmVudFNvdXJjZUluZGV4XVtcIm5hbWVcIl07XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpbml0KCkgcHJvdmlkZXJcIiwgcHJvdmlkZXJOYW1lKTtcbiAgICAgICAgICAgIC8vSW5pdCBQcm92aWRlci5cbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlciA9ICBQcm92aWRlcnNbY3VycmVudFNvdXJjZUluZGV4XS5wcm92aWRlcihcbiAgICAgICAgICAgICAgICBtZWRpYU1hbmFnZXIuY3JlYXRlTWVkaWEocHJvdmlkZXJOYW1lLCBwbGF5ZXJDb25maWcpLFxuICAgICAgICAgICAgICAgIHBsYXllckNvbmZpZyxcbiAgICAgICAgICAgICAgICBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudEFkVGFnKClcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGlmKHByb3ZpZGVyTmFtZSA9PT0gUFJPVklERVJfUlRNUCl7XG4gICAgICAgICAgICAgICAgLy9JZiBwcm92aWRlciB0eXBlIGlzIFJUTVAsIHdlIGFjY2VwdHMgUnRtcEV4cGFuc2lvbi5cbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoYXQsIEFwaVJ0bXBFeHBhbnNpb24oY3VycmVudFByb3ZpZGVyKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vVGhpcyBwYXNzZXMgdGhlIGV2ZW50IGNyZWF0ZWQgYnkgdGhlIFByb3ZpZGVyIHRvIEFQSS5cbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5vbihcImFsbFwiLCBmdW5jdGlvbihuYW1lLCBkYXRhKXtcblxuICAgICAgICAgICAgICAgIGlmKCBuYW1lID09PSBFUlJPUikge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIENocm9tZSA+PTgwIG9uIEFuZHJvaWQgbWlzc2VzIGgyNDYgaW4gU0RQIHdoZW4gZmlyc3QgdGltZSBhZnRlciB3ZWIgcGFnZSBsb2FkZWQuXG4gICAgICAgICAgICAgICAgICAgIC8vIFNvIHdhaXQgdW50aWwgYnJvd3NlciBnZXQgaDI2NCBjYXBhYmlsaXRpZXMgYW5kIGNyZWF0ZSBhbnN3ZXIgU0RQLlxuICAgICAgICAgICAgICAgICAgICBpZiAodXNlckFnZW50T2JqZWN0Lm9zID09PSAnQW5kcm9pZCcgJiYgdXNlckFnZW50T2JqZWN0LmJyb3dzZXIgPT09ICdDaHJvbWUnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEuY29kZSAmJiBkYXRhLmNvZGUgPT09IFBMQVlFUl9XRUJSVENfU0VUX0xPQ0FMX0RFU0NfRVJST1IpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2V0Q3VycmVudFNvdXJjZSh0aGF0LmdldEN1cnJlbnRTb3VyY2UoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgd2VicnRjUmV0cnlJbnRlcnZhbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIobmFtZSwgZGF0YSk7XG5cbiAgICAgICAgICAgICAgICBpZihuYW1lID09PSBcImNvbXBsZXRlXCIpe1xuICAgICAgICAgICAgICAgICAgICBydW5OZXh0UGxheWxpc3QocGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRQbGF5bGlzdEluZGV4KCkgKyAxKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihuYW1lID09PSBQTEFZRVJfUExBWSkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHdlYnJ0Y1JldHJ5VGltZXIpO1xuICAgICAgICAgICAgICAgICAgICB3ZWJydGNSZXRyeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB3ZWJydGNSZXRyeUNvdW50ID0gV0VCUlRDX1JFVFJZX0NPVU5UO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vQXV0byBzd2l0Y2hpbmcgbmV4dCBzb3VyY2Ugd2hlbiBwbGF5ZXIgbG9hZCBmYWlsZWQgYnkgYW1pc3Mgc291cmNlLlxuICAgICAgICAgICAgICAgIC8vZGF0YS5jb2RlID09PSBQTEFZRVJfRklMRV9FUlJPUlxuICAgICAgICAgICAgICAgIGlmKCBuYW1lID09PSBFUlJPUiB8fCBuYW1lID09PSBORVRXT1JLX1VOU1RBQkxFRCApe1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmNvZGUgPT09IFBMQVlFUl9XRUJSVENfVU5FWFBFQ1RFRF9ESVNDT05ORUNUXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCAoIXBsYXllckNvbmZpZy5nZXRDb25maWcoKS5hdXRvRmFsbGJhY2sgJiYgZGF0YS5jb2RlID09PSBQTEFZRVJfV0VCUlRDX05FVFdPUktfU0xPVykpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF3ZWJydGNSZXRyeSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2VicnRjUmV0cnkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlYnJ0Y1JldHJ5Q291bnQgPSBXRUJSVENfUkVUUllfQ09VTlQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh3ZWJydGNSZXRyeSAmJiB3ZWJydGNSZXRyeUNvdW50ID4gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB3ZWJydGNSZXRyeVRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldEN1cnJlbnRTb3VyY2UocGxheWVyQ29uZmlnLmdldFNvdXJjZUluZGV4KCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlYnJ0Y1JldHJ5Q291bnQgLS07XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB3ZWJydGNSZXRyeUludGVydmFsKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHdlYnJ0Y1JldHJ5ICYmIHdlYnJ0Y1JldHJ5Q291bnQgPD0gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHdlYnJ0Y1JldHJ5VGltZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2VicnRjUmV0cnkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlYnJ0Y1JldHJ5Q291bnQgPSBXRUJSVENfUkVUUllfQ09VTlQ7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkuYXV0b0ZhbGxiYWNrICYmIHBsYXllckNvbmZpZy5nZXRTb3VyY2VJbmRleCgpKzEgPCB0aGF0LmdldFNvdXJjZXMoKS5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzIHNlcXVlbnRpYWwgaGFzIGF2YWlsYWJsZSBzb3VyY2UuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnBhdXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnNldEN1cnJlbnRTb3VyY2UocGxheWVyQ29uZmlnLmdldFNvdXJjZUluZGV4KCkrMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9KS50aGVuKCgpPT57XG5cbiAgICAgICAgICAgIC8vcHJvdmlkZXIncyBwcmVsb2FkKCkgaGF2ZSB0byBtYWRlIFByb21pc2UuIEN1eiBpdCBvdmVyY29tZXMgJ2ZsYXNoIGxvYWRpbmcgdGltaW5nIHByb2JsZW0nLlxuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLnByZWxvYWQocGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRTb3VyY2VzKCksIGxhc3RQbGF5UG9zaXRpb24pLnRoZW4oZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihSRUFEWSk7XG5cbiAgICAgICAgICAgICAgICBsYXp5UXVldWUuZmx1c2goKTtcbiAgICAgICAgICAgICAgICAvL1RoaXMgaXMgbm8gcmVhc29uIHRvIGV4aXN0IGFueW1vcmUuXG4gICAgICAgICAgICAgICAgbGF6eVF1ZXVlLmRlc3Ryb3koKTtcblxuICAgICAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgbGF6eVF1ZXVlLm9mZigpO1xuICAgICAgICAgICAgICAgIGlmKGVycm9yICYmIGVycm9yLmNvZGUgJiYgRVJST1JTLmNvZGVzW2Vycm9yLmNvZGVdKXtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKEVSUk9SLCBFUlJPUlMuY29kZXNbZXJyb3IuY29kZV0pO1xuICAgICAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tJTklUX1VOS05XT05fRVJST1JdO1xuICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKEVSUk9SLCB0ZW1wRXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIC8vSU5JVCBFUlJPUlxuICAgICAgICAgICAgaWYoZXJyb3IgJiYgZXJyb3IuY29kZSAmJiBFUlJPUlMuY29kZXNbZXJyb3IuY29kZV0pe1xuICAgICAgICAgICAgICAgIHRoYXQudHJpZ2dlcihFUlJPUiwgRVJST1JTLmNvZGVzW2Vycm9yLmNvZGVdKTtcbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW0lOSVRfVU5LTldPTl9FUlJPUl07XG4gICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKEVSUk9SLCB0ZW1wRXJyb3IpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL3h4eCA6IElmIHlvdSBpbml0IGVtcHR5IHNvdXJjZXMuIChJIHRoaW5rIHRoaXMgaXMgc3RyYW5nZSBjYXNlLilcbiAgICAgICAgICAgIC8vVGhpcyB3b3JrcyBmb3IgdGhpcyBjYXNlLlxuICAgICAgICAgICAgLy9wbGF5ZXIgPSBPdmVuUGxheWVyLmNyZWF0ZShcImVsSWRcIiwge30pO1xuICAgICAgICAgICAgLy9wbGF5ZXIubG9hZChzb3J1Y2VzKTtcbiAgICAgICAgICAgIGxhenlRdWV1ZS5vZmYoKTtcbiAgICAgICAgICAgIC8vbGF6eVF1ZXVlLnJlbW92ZUFuZEV4Y3V0ZU9uY2UoXCJsb2FkXCIpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBBUEkg7LSI6riw7ZmUIO2VqOyImFxuICAgICAqIGluaXRcbiAgICAgKiBAcGFyYW0gICAgICB7b2JqZWN0fSBvcHRpb25zIHBsYXllciBpbml0aWFsIG9wdGlvbiB2YWx1ZS5cbiAgICAgKiBAcmV0dXJuc1xuICAgICAqKi9cbiAgICB0aGF0LmluaXQgPSAob3B0aW9ucykgPT57XG4gICAgICAgIC8vSXQgY29sbGVjdHMgdGhlIGNvbW1hbmRzIGFuZCBleGVjdXRlcyB0aGVtIGF0IHRoZSB0aW1lIHdoZW4gdGhleSBhcmUgZXhlY3V0YWJsZS5cbiAgICAgICAgbGF6eVF1ZXVlID0gTGF6eUNvbW1hbmRFeGVjdXRvcih0aGF0LCBbXG4gICAgICAgICAgICAnbG9hZCcsJ3BsYXknLCdwYXVzZScsJ3NlZWsnLCdzdG9wJywgJ2dldER1cmF0aW9uJywgJ2dldFBvc2l0aW9uJywgJ2dldFZvbHVtZSdcbiAgICAgICAgICAgICwgJ2dldE11dGUnLCAnZ2V0QnVmZmVyJywgJ2dldFN0YXRlJyAsICdnZXRRdWFsaXR5TGV2ZWxzJ1xuICAgICAgICBdKTtcbiAgICAgICAgb3B0aW9ucy5tZWRpYUNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICAgICAgb3B0aW9ucy5icm93c2VyID0gdXNlckFnZW50T2JqZWN0O1xuICAgICAgICBwbGF5ZXJDb25maWcgPSBDb25maWd1cmF0b3Iob3B0aW9ucywgdGhhdCk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGluaXQoKVwiKTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaW5pdCgpIGNvbmZpZyA6IFwiLCBwbGF5ZXJDb25maWcpO1xuXG4gICAgICAgIC8vTm90IHdvcmtpbmcgOiBTeW50YXhFcnJvcjogXCJFUlJPUlMuY29kZXNcIiBpcyByZWFkLW9ubHlcbiAgICAgICAgRVJST1JTLmNvZGVzID0gcGxheWVyQ29uZmlnLmdldFN5c3RlbVRleHQoKS5hcGkuZXJyb3I7XG4gICAgICAgIC8vQ29vbFxuICAgICAgICAvL0VSUk9SUy5jb2Rlcy5wdXNoKHBsYXllckNvbmZpZy5nZXRTeXN0ZW1UZXh0KCkpO1xuXG4gICAgICAgIHBsYXlsaXN0TWFuYWdlci5pbml0UGxheWxpc3QocGxheWVyQ29uZmlnLmdldFBsYXlsaXN0KCksIHBsYXllckNvbmZpZyk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGluaXQoKSBzb3VyY2VzIDogXCIgLCBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKSk7XG5cbiAgICAgICAgaW5pdFByb3ZpZGVyKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldFByb3ZpZGVyTmFtZSA9ICgpID0+IHtcbiAgICAgICAgaWYoY3VycmVudFByb3ZpZGVyKXtcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0TmFtZSgpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgdGhhdC5nZXRDb25maWcgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldENvbmZpZygpXCIsIHBsYXllckNvbmZpZy5nZXRDb25maWcoKSk7XG4gICAgICAgIHJldHVybiBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldEJyb3dzZXIgPSAoKSA9PiB7XG5cbiAgICAgICAgcmV0dXJuIHBsYXllckNvbmZpZy5nZXRCcm93c2VyKCk7XG4gICAgfTtcbiAgICB0aGF0LnNldFRpbWVjb2RlTW9kZSA9IChpc1Nob3cpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRUaW1lY29kZU1vZGUoKVwiLCBpc1Nob3cpO1xuICAgICAgICBwbGF5ZXJDb25maWcuc2V0VGltZWNvZGVNb2RlKGlzU2hvdyk7XG4gICAgfTtcbiAgICB0aGF0LmlzVGltZWNvZGVNb2RlID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpc1RpbWVjb2RlTW9kZSgpXCIpO1xuICAgICAgICByZXR1cm4gcGxheWVyQ29uZmlnLmlzVGltZWNvZGVNb2RlKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldEZyYW1lcmF0ZSA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0RnJhbWVyYXRlKClcIik7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0RnJhbWVyYXRlKCk7XG4gICAgfTtcbiAgICB0aGF0LnNlZWtGcmFtZSA9IChmcmFtZUNvdW50KSA9PiB7XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2Vla0ZyYW1lKClcIiwgZnJhbWVDb3VudCk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2Vla0ZyYW1lKGZyYW1lQ291bnQpO1xuICAgIH07XG5cbiAgICB0aGF0LmdldER1cmF0aW9uID0gKCkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldER1cmF0aW9uKClcIiwgY3VycmVudFByb3ZpZGVyLmdldER1cmF0aW9uKCkpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldER1cmF0aW9uKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldFBvc2l0aW9uID0gKCkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0UG9zaXRpb24oKVwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0UG9zaXRpb24oKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0UG9zaXRpb24oKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Vm9sdW1lID0gKCkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Vm9sdW1lKClcIiwgY3VycmVudFByb3ZpZGVyLmdldFZvbHVtZSgpKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRWb2x1bWUoKTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Vm9sdW1lID0gKHZvbHVtZSkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Vm9sdW1lKCkgXCIgKyB2b2x1bWUpO1xuICAgICAgICBjdXJyZW50UHJvdmlkZXIuc2V0Vm9sdW1lKHZvbHVtZSk7XG4gICAgfTtcbiAgICB0aGF0LnNldE11dGUgPSAoc3RhdGUpID0+IHtcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldE11dGUoKSBcIiArIHN0YXRlKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5zZXRNdXRlKHN0YXRlKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0TXV0ZSA9ICgpID0+IHtcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldE11dGUoKSBcIiArIGN1cnJlbnRQcm92aWRlci5nZXRNdXRlKCkpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldE11dGUoKTtcbiAgICB9O1xuICAgIHRoYXQubG9hZCA9IChwbGF5bGlzdCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBsb2FkKCkgXCIsIHBsYXlsaXN0KTtcbiAgICAgICAgbGF6eVF1ZXVlID0gTGF6eUNvbW1hbmRFeGVjdXRvcih0aGF0LCBbJ3BsYXknLCdzZWVrJywnc3RvcCddKTtcblxuICAgICAgICBpZihwbGF5bGlzdCl7XG4gICAgICAgICAgICBpZihjdXJyZW50UHJvdmlkZXIpe1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5zZXRDdXJyZW50UXVhbGl0eSgwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBsYXlsaXN0TWFuYWdlci5pbml0UGxheWxpc3QocGxheWxpc3QsIHBsYXllckNvbmZpZyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGluaXRQcm92aWRlcigpO1xuXG4gICAgfTtcbiAgICB0aGF0LnBsYXkgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcGxheSgpIFwiKTtcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnBsYXkoKTtcbiAgICB9XG4gICAgdGhhdC5wYXVzZSA9ICgpID0+IHtcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHBhdXNlKCkgXCIpO1xuICAgICAgICBjdXJyZW50UHJvdmlkZXIucGF1c2UoKTtcbiAgICB9O1xuICAgIHRoYXQuc2VlayA9IChwb3NpdGlvbikgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2VlaygpIFwiKyBwb3NpdGlvbik7XG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5zZWVrKHBvc2l0aW9uKTtcbiAgICB9O1xuICAgIHRoYXQuc2V0UGxheWJhY2tSYXRlID0gKHBsYXliYWNrUmF0ZSkgPT57XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRQbGF5YmFja1JhdGUoKSBcIiwgcGxheWJhY2tSYXRlKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5zZXRQbGF5YmFja1JhdGUocGxheWVyQ29uZmlnLnNldFBsYXliYWNrUmF0ZShwbGF5YmFja1JhdGUpKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0UGxheWJhY2tSYXRlID0gKCkgPT57XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRQbGF5YmFja1JhdGUoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldFBsYXliYWNrUmF0ZSgpKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRQbGF5YmFja1JhdGUoKTtcbiAgICB9O1xuXG4gICAgdGhhdC5nZXRQbGF5bGlzdCA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0UGxheWxpc3QoKSBcIiwgcGxheWxpc3RNYW5hZ2VyLmdldFBsYXlsaXN0KCkpO1xuICAgICAgICByZXR1cm4gcGxheWxpc3RNYW5hZ2VyLmdldFBsYXlsaXN0KCk7XG4gICAgfTtcbiAgICB0aGF0LmdldEN1cnJlbnRQbGF5bGlzdCA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Q3VycmVudFBsYXlsaXN0KCkgXCIsIHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50UGxheWxpc3RJbmRleCgpKTtcbiAgICAgICAgcmV0dXJuIHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50UGxheWxpc3RJbmRleCgpO1xuICAgIH07XG4gICAgdGhhdC5zZXRDdXJyZW50UGxheWxpc3QgPSAoaW5kZXgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Q3VycmVudFBsYXlsaXN0KCkgXCIsIGluZGV4KTtcbiAgICAgICAgcnVuTmV4dFBsYXlsaXN0KGluZGV4KTtcbiAgICB9O1xuXG4gICAgdGhhdC5nZXRTb3VyY2VzID0gKCkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0U291cmNlcygpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0U291cmNlcygpKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRTb3VyY2VzKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldEN1cnJlbnRTb3VyY2UgPSAoKSA9PntcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEN1cnJlbnRTb3VyY2UoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldEN1cnJlbnRTb3VyY2UoKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFNvdXJjZSgpO1xuICAgIH07XG4gICAgdGhhdC5zZXRDdXJyZW50U291cmNlID0gKGluZGV4KSA9PntcblxuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Q3VycmVudFNvdXJjZSgpIFwiLCBpbmRleCk7XG5cbiAgICAgICAgbGV0IHNvdXJjZXMgPSBjdXJyZW50UHJvdmlkZXIuZ2V0U291cmNlcygpO1xuICAgICAgICBsZXQgY3VycmVudFNvdXJjZSA9IHNvdXJjZXNbY3VycmVudFByb3ZpZGVyLmdldEN1cnJlbnRTb3VyY2UoKV07XG4gICAgICAgIGxldCBuZXdTb3VyY2UgPSBzb3VyY2VzW2luZGV4XTtcbiAgICAgICAgbGV0IGxhc3RQbGF5UG9zaXRpb24gPSBjdXJyZW50UHJvdmlkZXIuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgbGV0IGlzU2FtZVByb3ZpZGVyID0gcHJvdmlkZXJDb250cm9sbGVyLmlzU2FtZVByb3ZpZGVyKGN1cnJlbnRTb3VyY2UsIG5ld1NvdXJjZSk7XG4gICAgICAgIC8vIHByb3ZpZGVyLnNlckN1cnJlbnRRdWFsaXR5IC0+IHBsYXllckNvbmZpZyBzZXR0aW5nIC0+IGxvYWRcbiAgICAgICAgbGV0IHJlc3VsdFNvdXJjZUluZGV4ID0gY3VycmVudFByb3ZpZGVyLnNldEN1cnJlbnRTb3VyY2UoaW5kZXgsIGlzU2FtZVByb3ZpZGVyKTtcblxuICAgICAgICBpZighbmV3U291cmNlKXtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Q3VycmVudFF1YWxpdHkoKSBpc1NhbWVQcm92aWRlclwiLCBpc1NhbWVQcm92aWRlcik7XG5cbiAgICAgICAgLy9zd2l0Y2hpbmcgYmV0d2VlbiBzdHJlYW1zIG9uIEhMUy4gd3RoPyBodHRwczovL3ZpZGVvLWRldi5naXRodWIuaW8vaGxzLmpzL2xhdGVzdC9kb2NzL0FQSS5odG1sI2ZpbmFsLXN0ZXAtZGVzdHJveWluZy1zd2l0Y2hpbmctYmV0d2Vlbi1zdHJlYW1zXG4gICAgICAgIGlmKCFpc1NhbWVQcm92aWRlciB8fCBjdXJyZW50UHJvdmlkZXIuZ2V0TmFtZSgpID09PSBQUk9WSURFUl9ITFMgfHwgY3VycmVudFByb3ZpZGVyLmdldE5hbWUoKSA9PT0gUFJPVklERVJfREFTSCB8fCBjdXJyZW50UHJvdmlkZXIuZ2V0TmFtZSgpID09PSBQUk9WSURFUl9IVE1MNSl7XG4gICAgICAgICAgICBsYXp5UXVldWUgPSBMYXp5Q29tbWFuZEV4ZWN1dG9yKHRoYXQsIFsncGxheScsJ3NlZWsnXSk7XG4gICAgICAgICAgICBpbml0UHJvdmlkZXIobGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0U291cmNlSW5kZXg7XG4gICAgfTtcblxuXG5cbiAgICB0aGF0LmdldFF1YWxpdHlMZXZlbHMgPSAoKSA9PntcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFF1YWxpdHlMZXZlbHMoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldFF1YWxpdHlMZXZlbHMoKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0UXVhbGl0eUxldmVscygpO1xuICAgIH07XG4gICAgdGhhdC5nZXRDdXJyZW50UXVhbGl0eSA9ICgpID0+e1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Q3VycmVudFF1YWxpdHkoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldEN1cnJlbnRRdWFsaXR5KCkpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldEN1cnJlbnRRdWFsaXR5KCk7XG4gICAgfTtcbiAgICB0aGF0LnNldEN1cnJlbnRRdWFsaXR5ID0gKHF1YWxpdHlJbmRleCkgPT57XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRDdXJyZW50UXVhbGl0eSgpIFwiLCBxdWFsaXR5SW5kZXgpO1xuXG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2V0Q3VycmVudFF1YWxpdHkocXVhbGl0eUluZGV4KTtcbiAgICB9O1xuICAgIHRoYXQuaXNBdXRvUXVhbGl0eSA9ICgpID0+IHtcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGlzQXV0b1F1YWxpdHkoKVwiKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5pc0F1dG9RdWFsaXR5KCk7XG4gICAgfTtcbiAgICB0aGF0LnNldEF1dG9RdWFsaXR5ID0gKGlzQXV0bykgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0QXV0b1F1YWxpdHkoKSBcIiwgaXNBdXRvKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5zZXRBdXRvUXVhbGl0eShpc0F1dG8pO1xuICAgIH1cblxuICAgIHRoYXQuZ2V0Q2FwdGlvbkxpc3QgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFjYXB0aW9uTWFuYWdlcil7cmV0dXJuIG51bGw7fVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRDYXB0aW9uTGlzdCgpIFwiLCBjYXB0aW9uTWFuYWdlci5nZXRDYXB0aW9uTGlzdCgpKTtcbiAgICAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLmdldENhcHRpb25MaXN0KCk7XG4gICAgfVxuICAgIHRoYXQuZ2V0Q3VycmVudENhcHRpb24gPSAoKSA9PiB7XG4gICAgICAgIGlmKCFjYXB0aW9uTWFuYWdlcil7cmV0dXJuIG51bGw7fVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRDdXJyZW50Q2FwdGlvbigpIFwiLCBjYXB0aW9uTWFuYWdlci5nZXRDdXJyZW50Q2FwdGlvbigpKTtcbiAgICAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLmdldEN1cnJlbnRDYXB0aW9uKCk7XG4gICAgfVxuICAgIHRoYXQuc2V0Q3VycmVudENhcHRpb24gPSAoaW5kZXgpID0+IHtcbiAgICAgICAgaWYoIWNhcHRpb25NYW5hZ2VyKXtyZXR1cm4gbnVsbDt9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEN1cnJlbnRDYXB0aW9uKCkgXCIsIGluZGV4KTtcbiAgICAgICAgY2FwdGlvbk1hbmFnZXIuc2V0Q3VycmVudENhcHRpb24oaW5kZXgpO1xuICAgIH1cbiAgICB0aGF0LmFkZENhcHRpb24gPSAodHJhY2spID0+IHtcbiAgICAgICAgaWYoIWNhcHRpb25NYW5hZ2VyKXtyZXR1cm4gbnVsbDt9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGFkZENhcHRpb24oKSBcIilcbiAgICAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLmFkZENhcHRpb24odHJhY2spO1xuICAgIH1cbiAgICB0aGF0LnJlbW92ZUNhcHRpb24gPSAoaW5kZXgpID0+IHtcbiAgICAgICAgaWYoIWNhcHRpb25NYW5hZ2VyKXtyZXR1cm4gbnVsbDt9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHJlbW92ZUNhcHRpb24oKSBcIiwgaW5kZXgpXG4gICAgICAgIHJldHVybiBjYXB0aW9uTWFuYWdlci5yZW1vdmVDYXB0aW9uKGluZGV4KTtcbiAgICB9XG5cbiAgICB0aGF0LmdldEJ1ZmZlciA9ICgpID0+IHtcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRCdWZmZXIoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldEJ1ZmZlcigpKTtcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLmdldEJ1ZmZlcigpO1xuICAgIH07XG4gICAgdGhhdC5nZXRTdGF0ZSA9ICgpID0+IHtcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRTdGF0ZSgpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0U3RhdGUoKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0U3RhdGUoKTtcbiAgICB9O1xuICAgIHRoYXQuc3RvcCA9ICgpID0+IHtcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHN0b3AoKSBcIik7XG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5zdG9wKCk7XG4gICAgfTtcbiAgICB0aGF0LnJlbW92ZSA9ICgpID0+IHtcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHJlbW92ZSgpIFwiKTtcbiAgICAgICAgbGF6eVF1ZXVlLmRlc3Ryb3koKTtcbiAgICAgICAgaWYoY2FwdGlvbk1hbmFnZXIpe1xuICAgICAgICAgICAgY2FwdGlvbk1hbmFnZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgY2FwdGlvbk1hbmFnZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoY3VycmVudFByb3ZpZGVyKXtcbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5kZXN0cm95KCk7XG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYobWVkaWFNYW5hZ2VyKXtcbiAgICAgICAgICAgIG1lZGlhTWFuYWdlci5kZXN0cm95KCk7XG4gICAgICAgICAgICBtZWRpYU1hbmFnZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhhdC50cmlnZ2VyKERFU1RST1kpO1xuICAgICAgICB0aGF0Lm9mZigpO1xuXG4gICAgICAgIHByb3ZpZGVyQ29udHJvbGxlciA9IG51bGw7XG4gICAgICAgIHBsYXlsaXN0TWFuYWdlciA9IG51bGw7XG4gICAgICAgIHBsYXllckNvbmZpZyA9IG51bGw7XG4gICAgICAgIGxhenlRdWV1ZSA9IG51bGw7XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcmVtb3ZlKCkgLSBsYXp5UXVldWUsIGN1cnJlbnRQcm92aWRlciwgcHJvdmlkZXJDb250cm9sbGVyLCBwbGF5bGlzdE1hbmFnZXIsIHBsYXllckNvbmZpZywgYXBpIGV2ZW50IGRlc3Ryb2VkLiBcIik7XG4gICAgICAgIE92ZW5QbGF5ZXJTREsucmVtb3ZlUGxheWVyKHRoYXQuZ2V0Q29udGFpbmVySWQoKSk7XG4gICAgICAgIGlmKE92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyTGlzdCgpLmxlbmd0aCAgPT09IDApe1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiT3ZlblBsYXllclNESy5wbGF5ZXJMaXN0XCIsICBPdmVuUGxheWVyU0RLLmdldFBsYXllckxpc3QoKSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhhdC5nZXRWZXJzaW9uID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gXCJ2LlwiK3ZlcnNpb247XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuXG5cbmV4cG9ydCBkZWZhdWx0IEFwaTtcblxuXG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyNC4uXG4gKi9cblxuZXhwb3J0IGNvbnN0IEFwaVJ0bXBFeHBhbnNpb24gPSBmdW5jdGlvbihjdXJyZW50UHJvdmlkZXIpe1xuICAgIHJldHVybiB7XG4gICAgICAgIGV4dGVybmFsQ2FsbGJhY2tDcmVlcCA6IChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGlmKHJlc3VsdC5uYW1lICYmIHJlc3VsdC5kYXRhKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLnRyaWdnZXJFdmVudEZyb21FeHRlcm5hbChyZXN1bHQubmFtZSwgcmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufTtcbiIsImltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XG5cbmltcG9ydCB7XG4gICAgQ09OVEVOVF9USU1FX01PREVfQ0hBTkdFRCwgU1lTVEVNX1RFWFRcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBUaGlzIGluaXRpYWxpemVzIHRoZSBpbnB1dCBvcHRpb25zLlxuICogQHBhcmFtICAgb3B0aW9uc1xuICpcbiAqICovXG5jb25zdCBDb25maWd1cmF0b3IgPSBmdW5jdGlvbihvcHRpb25zLCBwcm92aWRlcil7XG5cbiAgICBjb25zdCBjb21wb3NlU291cmNlT3B0aW9ucyA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xuICAgICAgICBjb25zdCBEZWZhdWx0cyA9IHtcbiAgICAgICAgICAgIG1lZGlhQ29udGFpbmVyIDogXCJcIixcbiAgICAgICAgICAgIHBsYXliYWNrUmF0ZXM6IFsyLCAxLjUsIDEsIDAuNSwgMC4yNV0sXG4gICAgICAgICAgICBwbGF5YmFja1JhdGU6IDEsXG4gICAgICAgICAgICBtdXRlOiBmYWxzZSxcbiAgICAgICAgICAgIHZvbHVtZTogMTAwLFxuICAgICAgICAgICAgbG9vcCA6IGZhbHNlLFxuICAgICAgICAgICAgY29udHJvbHMgOiB0cnVlLFxuICAgICAgICAgICAgYXV0b1N0YXJ0IDogZmFsc2UsXG4gICAgICAgICAgICBhdXRvRmFsbGJhY2s6IHRydWUsXG4gICAgICAgICAgICB0aW1lY29kZSA6IHRydWUsXG4gICAgICAgICAgICBzb3VyY2VJbmRleCA6IDAsXG4gICAgICAgICAgICBicm93c2VyIDogXCJcIixcbiAgICAgICAgICAgIGhpZGVQbGF5bGlzdEljb24gOiBmYWxzZSxcbiAgICAgICAgICAgIHJ0bXBCdWZmZXJUaW1lIDogMSxcbiAgICAgICAgICAgIHJ0bXBCdWZmZXJUaW1lTWF4IDogMyxcbiAgICAgICAgICAgIGFkQ2xpZW50IDogXCJnb29nbGVpbWFcIixcbiAgICAgICAgICAgIGN1cnJlbnRQcm90b2NvbE9ubHkgOiBmYWxzZSxcbiAgICAgICAgICAgIHN5c3RlbVRleHQgOiBudWxsLFxuICAgICAgICAgICAgbGFuZyA6IFwiZW5cIixcbiAgICAgICAgICAgIGxvYWRpbmdSZXRyeUNvdW50OiAwLFxuICAgICAgICAgICAgZXhwYW5kRnVsbFNjcmVlblVJOiBmYWxzZSxcbiAgICAgICAgICAgIGZ1bGxzY3JlZW5PcHRpb246IG51bGxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgc2VyaWFsaXplID0gZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycgJiYgdmFsLmxlbmd0aCA8IDYpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsb3dlcmNhc2VWYWwgPSB2YWwudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICBpZiAobG93ZXJjYXNlVmFsID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChsb3dlcmNhc2VWYWwgPT09ICdmYWxzZScpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKE51bWJlcih2YWwpKSAmJiAhaXNOYU4ocGFyc2VGbG9hdCh2YWwpKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gTnVtYmVyKHZhbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkZXNlcmlhbGl6ZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSAnaWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3B0aW9uc1trZXldID0gc2VyaWFsaXplKG9wdGlvbnNba2V5XSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRlc2VyaWFsaXplKG9wdGlvbnMpO1xuICAgICAgICBsZXQgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgRGVmYXVsdHMsIG9wdGlvbnMpO1xuICAgICAgICBsZXQgdXNlckN1c3R1bVN5c3RlbVRleHQgPSBbXTtcbiAgICAgICAgaWYoY29uZmlnLnN5c3RlbVRleHQpe1xuICAgICAgICAgICAgdXNlckN1c3R1bVN5c3RlbVRleHQgPSBfLmlzQXJyYXkoY29uZmlnLnN5c3RlbVRleHQpID8gY29uZmlnLnN5c3RlbVRleHQgOiBbY29uZmlnLnN5c3RlbVRleHRdO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHVzZXJDdXN0dW1TeXN0ZW1UZXh0Lmxlbmd0aDsgaSArKyl7XG4gICAgICAgICAgICBpZih1c2VyQ3VzdHVtU3lzdGVtVGV4dFtpXS5sYW5nKXtcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudFN5c3RlbVRleHQgPSBfLmZpbmRXaGVyZShTWVNURU1fVEVYVCAsIHtcImxhbmdcIjogdXNlckN1c3R1bVN5c3RlbVRleHRbaV0ubGFuZ30pO1xuICAgICAgICAgICAgICAgIGlmKGN1cnJlbnRTeXN0ZW1UZXh0KXtcbiAgICAgICAgICAgICAgICAgICAgLy92YWxpZGF0ZSAmIHVwZGF0ZVxuICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGN1cnJlbnRTeXN0ZW1UZXh0LCB1c2VyQ3VzdHVtU3lzdGVtVGV4dFtpXSk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIC8vY3JlYXRlXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTeXN0ZW1UZXh0ID0gXy5maW5kV2hlcmUoU1lTVEVNX1RFWFQgLCB7XCJsYW5nXCI6IFwiZW5cIn0pO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3lzdGVtVGV4dC5sYW5nID0gdXNlckN1c3R1bVN5c3RlbVRleHRbaV0ubGFuZztcbiAgICAgICAgICAgICAgICAgICAgU1lTVEVNX1RFWFQucHVzaChPYmplY3QuYXNzaWduKHVzZXJDdXN0dW1TeXN0ZW1UZXh0W2ldLCBjdXJyZW50U3lzdGVtVGV4dCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25maWcuc3lzdGVtVGV4dCA9IF8uZmluZFdoZXJlKFNZU1RFTV9URVhUICwge1wibGFuZ1wiOiBjb25maWcubGFuZ30pO1xuXG4gICAgICAgIGxldCBwbGF5YmFja1JhdGVzID0gY29uZmlnLnBsYXliYWNrUmF0ZXM7XG5cbiAgICAgICAgcGxheWJhY2tSYXRlcyA9IHBsYXliYWNrUmF0ZXMuZmlsdGVyKHJhdGUgPT4gXy5pc051bWJlcihyYXRlKSAmJiByYXRlID49IDAuMjUgJiYgcmF0ZSA8PSA0KS5tYXAocmF0ZSA9PiBNYXRoLnJvdW5kKHJhdGUgKiA0KSAvIDQpO1xuXG4gICAgICAgIGlmIChwbGF5YmFja1JhdGVzLmluZGV4T2YoMSkgPCAwKSB7XG4gICAgICAgICAgICBwbGF5YmFja1JhdGVzLnB1c2goMSk7XG4gICAgICAgIH1cbiAgICAgICAgcGxheWJhY2tSYXRlcy5zb3J0KCk7XG5cbiAgICAgICAgY29uZmlnLnBsYXliYWNrUmF0ZXMgPSBwbGF5YmFja1JhdGVzO1xuXG4gICAgICAgIGNvbmZpZy5ydG1wQnVmZmVyVGltZSA9IGNvbmZpZy5ydG1wQnVmZmVyVGltZSA+IDEwID8gMTAgOiBjb25maWcucnRtcEJ1ZmZlclRpbWU7XG4gICAgICAgIGNvbmZpZy5ydG1wQnVmZmVyVGltZU1heCA9IGNvbmZpZy5ydG1wQnVmZmVyVGltZU1heCA+IDUwID8gNTAgOiBjb25maWcucnRtcEJ1ZmZlclRpbWVNYXg7XG5cblxuICAgICAgICBpZiAoY29uZmlnLnBsYXliYWNrUmF0ZXMuaW5kZXhPZihjb25maWcucGxheWJhY2tSYXRlKSA8IDApIHtcbiAgICAgICAgICAgIGNvbmZpZy5wbGF5YmFja1JhdGUgPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29uZmlnUGxheWxpc3QgPSBjb25maWcucGxheWxpc3Q7XG4gICAgICAgIGlmICghY29uZmlnUGxheWxpc3QpIHtcbiAgICAgICAgICAgIGNvbnN0IG9iaiA9IF8ucGljayhjb25maWcsIFtcbiAgICAgICAgICAgICAgICAndGl0bGUnLFxuICAgICAgICAgICAgICAgICdkZXNjcmlwdGlvbicsXG4gICAgICAgICAgICAgICAgJ3R5cGUnLFxuICAgICAgICAgICAgICAgICdpbWFnZScsXG4gICAgICAgICAgICAgICAgJ2ZpbGUnLFxuICAgICAgICAgICAgICAgICdzb3VyY2VzJyxcbiAgICAgICAgICAgICAgICAndHJhY2tzJyxcbiAgICAgICAgICAgICAgICAnaG9zdCcsXG4gICAgICAgICAgICAgICAgJ2FwcGxpY2F0aW9uJyxcbiAgICAgICAgICAgICAgICAnc3RyZWFtJyxcbiAgICAgICAgICAgICAgICAnYWRUYWdVcmwnXG4gICAgICAgICAgICBdKTtcblxuICAgICAgICAgICAgY29uZmlnLnBsYXlsaXN0ID0gWyBvYmogXTtcbiAgICAgICAgfSBlbHNlIGlmIChfLmlzQXJyYXkoY29uZmlnUGxheWxpc3QucGxheWxpc3QpKSB7XG4gICAgICAgICAgICBjb25maWcuZmVlZERhdGEgPSBjb25maWdQbGF5bGlzdDtcbiAgICAgICAgICAgIGNvbmZpZy5wbGF5bGlzdCA9IGNvbmZpZ1BsYXlsaXN0LnBsYXlsaXN0O1xuICAgICAgICB9XG5cbiAgICAgICAgZGVsZXRlIGNvbmZpZy5kdXJhdGlvbjtcbiAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICB9O1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNvbmZpZ3VyYXRvciBsb2FkZWQuXCIsIG9wdGlvbnMpO1xuICAgIGxldCBzcGVjID0gY29tcG9zZVNvdXJjZU9wdGlvbnMob3B0aW9ucyk7XG5cbiAgICAvL3NwZWMuaXNGdWxsc2NyZWVuID0gZmFsc2U7IC8vSUUgMTEgY2FuJ3QgY2hlY2sgY3VycmVudCBmdWxsc2NyZWVuIHN0YXRlLlxuXG4gICAgY29uc3QgdGhhdCA9IHt9O1xuICAgIHRoYXQuZ2V0Q29uZmlnID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYztcbiAgICB9O1xuICAgIHRoYXQuZ2V0QWRDbGllbnQgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmFkQ2xpZW50O1xuICAgIH07XG4gICAgdGhhdC5zZXRDb25maWcgPSAoY29uZmlnLCB2YWx1ZSkgPT4ge1xuICAgICAgICBzcGVjW2NvbmZpZ10gPSB2YWx1ZTtcbiAgICB9O1xuXG4gICAgdGhhdC5nZXRDb250YWluZXIgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLm1lZGlhQ29udGFpbmVyO1xuICAgIH07XG4gICAgLyp0aGF0LmlzRnVsbHNjcmVlbiA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuaXNGdWxsc2NyZWVuO1xuICAgIH1cbiAgICB0aGF0LnNldEZ1bGxzY3JlZW4gPSAoaXNGdWxsc2NyZWVuKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmlzRnVsbHNjcmVlbiA9IGlzRnVsbHNjcmVlbjtcbiAgICB9Ki9cblxuICAgIHRoYXQuZ2V0UGxheWJhY2tSYXRlID0oKT0+e1xuICAgICAgICByZXR1cm4gc3BlYy5wbGF5YmFja1JhdGU7XG4gICAgfTtcbiAgICB0aGF0LnNldFBsYXliYWNrUmF0ZSA9KHBsYXliYWNrUmF0ZSk9PntcbiAgICAgICAgc3BlYy5wbGF5YmFja1JhdGUgPSBwbGF5YmFja1JhdGU7XG4gICAgICAgIHJldHVybiBwbGF5YmFja1JhdGU7XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0UXVhbGl0eUxhYmVsID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5xdWFsaXR5TGFiZWw7XG4gICAgfTtcbiAgICB0aGF0LnNldFF1YWxpdHlMYWJlbCA9IChuZXdMYWJlbCkgPT4ge1xuICAgICAgICBzcGVjLnF1YWxpdHlMYWJlbCA9IG5ld0xhYmVsO1xuICAgIH07XG5cbiAgICB0aGF0LmlzQ3VycmVudFByb3RvY29sT25seSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudFByb3RvY29sT25seTtcbiAgICB9O1xuICAgIC8qdGhhdC5nZXRTb3VyY2VMYWJlbCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuc291cmNlTGFiZWw7XG4gICAgfTtcbiAgICB0aGF0LnNldFNvdXJjZUxhYmVsID0gKG5ld0xhYmVsKSA9PiB7XG4gICAgICAgIHNwZWMuc291cmNlTGFiZWwgPSBuZXdMYWJlbDtcbiAgICB9OyovXG5cbiAgICB0aGF0LmdldFNvdXJjZUluZGV4ID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5zb3VyY2VJbmRleDtcbiAgICB9O1xuICAgIHRoYXQuc2V0U291cmNlSW5kZXggPSAoaW5kZXgpID0+IHtcbiAgICAgICAgc3BlYy5zb3VyY2VJbmRleCA9IGluZGV4O1xuICAgIH07XG4gICAgdGhhdC5zZXRUaW1lY29kZU1vZGUgPSAodGltZWNvZGUpID0+IHtcbiAgICAgICAgaWYoc3BlYy50aW1lY29kZSAhPT0gdGltZWNvZGUpe1xuICAgICAgICAgICAgc3BlYy50aW1lY29kZSA9IHRpbWVjb2RlO1xuICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihDT05URU5UX1RJTUVfTU9ERV9DSEFOR0VELCB0aW1lY29kZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQuaXNUaW1lY29kZU1vZGUgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLnRpbWVjb2RlO1xuICAgIH07XG4gICAgdGhhdC5nZXRSdG1wQnVmZmVyVGltZSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMucnRtcEJ1ZmZlclRpbWU7XG4gICAgfTtcbiAgICB0aGF0LmdldFJ0bXBCdWZmZXJUaW1lTWF4ID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5ydG1wQnVmZmVyVGltZU1heDtcbiAgICB9O1xuXG4gICAgdGhhdC5pc011dGUgPSAoKSA9PntcbiAgICAgICAgcmV0dXJuIHNwZWMubXV0ZTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Vm9sdW1lID0gKCkgPT57XG4gICAgICAgIHJldHVybiBzcGVjLnZvbHVtZTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Vm9sdW1lID0gKHZvbHVtZSkgPT57XG4gICAgICAgIHNwZWMudm9sdW1lID0gdm9sdW1lO1xuICAgIH07XG4gICAgdGhhdC5pc0xvb3AgPSAoKSA9PntcbiAgICAgICAgcmV0dXJuIHNwZWMubG9vcDtcbiAgICB9O1xuICAgIHRoYXQuaXNBdXRvU3RhcnQgPSAoKSA9PntcbiAgICAgICAgcmV0dXJuIHNwZWMuYXV0b1N0YXJ0O1xuICAgIH07XG4gICAgdGhhdC5pc0NvbnRyb2xzID0gKCkgPT57XG4gICAgICAgIHJldHVybiBzcGVjLmNvbnRyb2xzO1xuICAgIH07XG5cbiAgICB0aGF0LmdldFBsYXliYWNrUmF0ZXMgPSgpPT57XG4gICAgICAgIHJldHVybiBzcGVjLnBsYXliYWNrUmF0ZXM7XG4gICAgfTtcbiAgICB0aGF0LmdldEJyb3dzZXIgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmJyb3dzZXI7XG4gICAgfTtcbiAgICB0aGF0LmdldFN5c3RlbVRleHQgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLnN5c3RlbVRleHQ7XG4gICAgfTtcbiAgICB0aGF0LmdldExhbmd1YWdlID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5sYW5nO1xuICAgIH07XG5cbiAgICB0aGF0LmdldFBsYXlsaXN0ID0oKT0+e1xuICAgICAgICByZXR1cm4gc3BlYy5wbGF5bGlzdDtcbiAgICB9O1xuICAgIHRoYXQuc2V0UGxheWxpc3QgPShwbGF5bGlzdCk9PntcbiAgICAgICAgaWYoXy5pc0FycmF5KHBsYXlsaXN0KSl7XG4gICAgICAgICAgICBzcGVjLnBsYXlsaXN0ID0gcGxheWxpc3Q7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgc3BlYy5wbGF5bGlzdCA9IFtwbGF5bGlzdF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNwZWMucGxheWxpc3Q7XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29uZmlndXJhdG9yO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMy4uXG4gKi9cblxuLyoqXG4gKiBAYnJpZWYgICBUaGlzIG1vZHVsZSBwcm92aWRlIGN1c3RvbSBldmVudHMuXG4gKiBAcGFyYW0gICBvYmplY3QgICAgQW4gb2JqZWN0IHRoYXQgcmVxdWlyZXMgY3VzdG9tIGV2ZW50cy5cbiAqXG4gKiAqL1xuXG5jb25zdCBFdmVudEVtaXR0ZXIgPSBmdW5jdGlvbihvYmplY3Qpe1xuICAgIGxldCB0aGF0ID0gb2JqZWN0O1xuICAgIGxldCBfZXZlbnRzID1bXTtcblxuICAgIGNvbnN0IHRyaWdnZXJFdmVudHMgPSBmdW5jdGlvbihldmVudHMsIGFyZ3MsIGNvbnRleHQpe1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIGxldCBsZW5ndGggPSBldmVudHMubGVuZ3RoO1xuICAgICAgICBmb3IoaSA9IDA7IGkgPCBsZW5ndGg7IGkgKyspe1xuICAgICAgICAgICAgbGV0IGV2ZW50ID0gZXZlbnRzW2ldO1xuICAgICAgICAgICAgZXZlbnQubGlzdGVuZXIuYXBwbHkoICggZXZlbnQuY29udGV4dCB8fCBjb250ZXh0ICksIGFyZ3MpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoYXQub24gPSBmdW5jdGlvbihuYW1lLCBsaXN0ZW5lciwgY29udGV4dCl7XG4gICAgICAgIChfZXZlbnRzW25hbWVdIHx8IChfZXZlbnRzW25hbWVdPVtdKSApLnB1c2goeyBsaXN0ZW5lcjogbGlzdGVuZXIgICwgY29udGV4dCA6IGNvbnRleHR9KTtcbiAgICAgICAgcmV0dXJuIHRoYXQ7XG4gICAgfTtcbiAgICB0aGF0LnRyaWdnZXIgPSBmdW5jdGlvbihuYW1lKXtcbiAgICAgICAgaWYoIV9ldmVudHMpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIGNvbnN0IGV2ZW50cyA9IF9ldmVudHNbbmFtZV07XG4gICAgICAgIGNvbnN0IGFsbEV2ZW50cyA9IF9ldmVudHMuYWxsO1xuXG4gICAgICAgIGlmKGV2ZW50cyl7XG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnRzKGV2ZW50cywgYXJncywgdGhhdCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoYWxsRXZlbnRzKXtcbiAgICAgICAgICAgIHRyaWdnZXJFdmVudHMoYWxsRXZlbnRzLCBhcmd1bWVudHMsIHRoYXQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0Lm9mZiA9IGZ1bmN0aW9uKG5hbWUsIGxpc3RlbmVyLCBjb250ZXh0KXtcbiAgICAgICAgaWYoIV9ldmVudHMpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFuYW1lICYmICFsaXN0ZW5lciAmJiAhY29udGV4dCkgIHtcbiAgICAgICAgICAgIF9ldmVudHMgPSBbXTtcbiAgICAgICAgICAgIHJldHVybiB0aGF0O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbmFtZXMgPSBuYW1lID8gW25hbWVdIDogT2JqZWN0LmtleXMoX2V2ZW50cyk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBuYW1lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lc1tpXTtcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50cyA9IF9ldmVudHNbbmFtZV07XG4gICAgICAgICAgICBpZiAoZXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmV0YWluID0gX2V2ZW50c1tuYW1lXSA9IFtdO1xuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lciAgfHwgY29udGV4dCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMCwgayA9IGV2ZW50cy5sZW5ndGg7IGogPCBrOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gZXZlbnRzW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChsaXN0ZW5lciAmJiBsaXN0ZW5lciAhPT0gZXZlbnQubGlzdGVuZXIgJiYgbGlzdGVuZXIgIT09IGV2ZW50Lmxpc3RlbmVyLmxpc3RlbmVyICAmJiBsaXN0ZW5lciAhPT0gZXZlbnQubGlzdGVuZXIuX2xpc3RlbmVyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8KGNvbnRleHQgJiYgY29udGV4dCAhPT0gZXZlbnQuY29udGV4dClcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldGFpbi5wdXNoKGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXJldGFpbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIF9ldmVudHNbbmFtZV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGF0O1xuICAgIH07XG4gICAgdGhhdC5vbmNlID0gZnVuY3Rpb24obmFtZSwgbGlzdGVuZXIsIGNvbnRleHQpe1xuICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICBjb25zdCBvbmNlQ2FsbGJhY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChjb3VudCsrKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhhdC5vZmYobmFtZSwgb25jZUNhbGxiYWNrKTtcbiAgICAgICAgICAgIGxpc3RlbmVyLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgICAgIG9uY2VDYWxsYmFjay5fbGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgICAgICAgcmV0dXJuIHRoYXQub24obmFtZSwgb25jZUNhbGxiYWNrLCBjb250ZXh0KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IEV2ZW50RW1pdHRlcjtcbiIsImltcG9ydCBfIGZyb20gJ3V0aWxzL3VuZGVyc2NvcmUnO1xuXG4vKipcbiAqIEBicmllZiAgIFRoaXMgZXhlY3V0ZXMgdGhlIGlucHV0IGNvbW1hbmRzIGF0IGEgc3BlY2lmaWMgcG9pbnQgaW4gdGltZS5cbiAqIEBwYXJhbSAgIGluc3RhbmNlXG4gKiBAcGFyYW0gICBxdWV1ZWRDb21tYW5kc1xuICogKi9cbmNvbnN0IExhenlDb21tYW5kRXhlY3V0b3IgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIHF1ZXVlZENvbW1hbmRzKSB7XG4gICAgbGV0IGNvbW1hbmRRdWV1ZSA9IFtdO1xuICAgIGxldCB1bmRlY29yYXRlZE1ldGhvZHMgPSB7fTtcbiAgICBsZXQgZXhlY3V0ZU1vZGUgPSBmYWxzZTtcbiAgICBsZXQgdGhhdCA9IHt9O1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgbG9hZGVkLlwiKTtcbiAgICBxdWV1ZWRDb21tYW5kcy5mb3JFYWNoKChjb21tYW5kKSA9PiB7XG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IGluc3RhbmNlW2NvbW1hbmRdO1xuICAgICAgICB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF0gPSBtZXRob2QgfHwgZnVuY3Rpb24oKXt9O1xuXG4gICAgICAgIGluc3RhbmNlW2NvbW1hbmRdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgICAgICAgICAgICAgaWYgKCFleGVjdXRlTW9kZSkge1xuICAgICAgICAgICAgICAgIC8vY29tbWFuZFF1ZXVlLnB1c2goeyBjb21tYW5kLCBhcmdzIH0pO1xuICAgICAgICAgICAgICAgIHRoYXQuYWRkUXVldWUoY29tbWFuZCwgYXJncylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZXhlY3V0ZVF1ZXVlZENvbW1hbmRzKCk7XG4gICAgICAgICAgICAgICAgaWYgKG1ldGhvZCkge1xuICAgICAgICAgICAgICAgICAgICBtZXRob2QuYXBwbHkodGhhdCwgYXJncyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0pO1xuICAgIHZhciBleGVjdXRlUXVldWVkQ29tbWFuZHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHdoaWxlIChjb21tYW5kUXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgeyBjb21tYW5kLCBhcmdzIH0gPSBjb21tYW5kUXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgICh1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF0gfHwgaW5zdGFuY2VbY29tbWFuZF0pLmFwcGx5KGluc3RhbmNlLCBhcmdzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRoYXQuc2V0RXhlY3V0ZU1vZGUgPSAobW9kZSkgPT4ge1xuICAgICAgICBleGVjdXRlTW9kZSA9IG1vZGU7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBzZXRFeGVjdXRlTW9kZSgpXCIsIG1vZGUpO1xuICAgIH07XG4gICAgdGhhdC5nZXRVbmRlY29yYXRlZE1ldGhvZHMgPSBmdW5jdGlvbigpe1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZ2V0VW5kZWNvcmF0ZWRNZXRob2RzKClcIiwgdW5kZWNvcmF0ZWRNZXRob2RzKTtcbiAgICAgICAgcmV0dXJuIHVuZGVjb3JhdGVkTWV0aG9kcztcbiAgICB9XG4gICAgdGhhdC5nZXRRdWV1ZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBnZXRRdWV1ZSgpXCIsIGdldFF1ZXVlKTtcbiAgICAgICAgcmV0dXJuIGNvbW1hbmRRdWV1ZTtcbiAgICB9XG4gICAgdGhhdC5hZGRRdWV1ZSA9IGZ1bmN0aW9uKGNvbW1hbmQsIGFyZ3Mpe1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogYWRkUXVldWUoKVwiLCBjb21tYW5kLCBhcmdzKTtcbiAgICAgICAgY29tbWFuZFF1ZXVlLnB1c2goeyBjb21tYW5kLCBhcmdzIH0pO1xuICAgIH1cblxuICAgIHRoYXQuZmx1c2ggPSBmdW5jdGlvbigpe1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogZmx1c2goKVwiKTtcbiAgICAgICAgZXhlY3V0ZVF1ZXVlZENvbW1hbmRzKCk7XG4gICAgfTtcbiAgICB0aGF0LmVtcHR5ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBlbXB0eSgpXCIpO1xuICAgICAgICBjb21tYW5kUXVldWUubGVuZ3RoID0gMDtcbiAgICB9O1xuICAgIHRoYXQub2ZmID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBvZmYoKVwiKTtcbiAgICAgICAgcXVldWVkQ29tbWFuZHMuZm9yRWFjaCgoY29tbWFuZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWV0aG9kID0gdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRdO1xuICAgICAgICAgICAgaWYgKG1ldGhvZCkge1xuICAgICAgICAgICAgICAgIGluc3RhbmNlW2NvbW1hbmRdID0gbWV0aG9kO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cblxuICAgIC8vUnVuIG9uY2UgYXQgdGhlIGVuZFxuICAgIHRoYXQucmVtb3ZlQW5kRXhjdXRlT25jZSA9IGZ1bmN0aW9uKGNvbW1hbmRfKXtcbiAgICAgICAgbGV0IGNvbW1hbmRRdWV1ZUl0ZW0gPSBfLmZpbmRXaGVyZShjb21tYW5kUXVldWUsIHtjb21tYW5kIDogY29tbWFuZF99KTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IHJlbW92ZUFuZEV4Y3V0ZU9uY2UoKVwiLCBjb21tYW5kXyk7XG4gICAgICAgIGNvbW1hbmRRdWV1ZS5zcGxpY2UoXy5maW5kSW5kZXgoY29tbWFuZFF1ZXVlLCB7Y29tbWFuZCA6IGNvbW1hbmRffSksIDEpO1xuXG4gICAgICAgIGNvbnN0IG1ldGhvZCA9IHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kX107XG4gICAgICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcInJlbW92ZUNvbW1hbmQoKVwiKTtcbiAgICAgICAgICAgIGlmKGNvbW1hbmRRdWV1ZUl0ZW0pe1xuICAgICAgICAgICAgICAgIChtZXRob2R8fCBpbnN0YW5jZVtjb21tYW5kX10pLmFwcGx5KGluc3RhbmNlLCBjb21tYW5kUXVldWVJdGVtLmFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5zdGFuY2VbY29tbWFuZF9dID0gbWV0aG9kO1xuICAgICAgICAgICAgZGVsZXRlIHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kX107XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhhdC5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBkZXN0cm95KClcIik7XG4gICAgICAgIHRoYXQub2ZmKCk7XG4gICAgICAgIHRoYXQuZW1wdHkoKTtcbiAgICB9O1xuICAgIHJldHVybiB0aGF0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBMYXp5Q29tbWFuZEV4ZWN1dG9yOyIsImltcG9ydCB7aXNSdG1wLCBpc1dlYlJUQywgaXNEYXNoLCBpc0hsc30gZnJvbSBcInV0aWxzL3ZhbGlkYXRvclwiO1xuaW1wb3J0IHthbmFsVXNlckFnZW50fSBmcm9tIFwidXRpbHMvYnJvd3NlclwiO1xuLyoqXG4gKiBAYnJpZWYgICBUaGlzIGZpbmRzIHRoZSBwcm92aWRlciB0aGF0IG1hdGNoZXMgdGhlIGlucHV0IHNvdXJjZS5cbiAqIEBwYXJhbVxuICogKi9cblxuY29uc3QgU3VwcG9ydENoZWNrZXIgPSBmdW5jdGlvbigpe1xuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJTdXBwb3J0Q2hlY2tlciBsb2FkZWQuXCIpO1xuICAgIGxldCB1c2VyQWdlbnRPYmplY3QgPSBhbmFsVXNlckFnZW50KCk7XG5cbiAgICBjb25zdCBzdXBwb3J0TGlzdCA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ2h0bWw1JyxcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IE1pbWVUeXBlcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgYWFjOiAnYXVkaW8vbXA0JyxcbiAgICAgICAgICAgICAgICAgICAgbXA0OiAndmlkZW8vbXA0JyxcbiAgICAgICAgICAgICAgICAgICAgZjR2OiAndmlkZW8vbXA0JyxcbiAgICAgICAgICAgICAgICAgICAgbTR2OiAndmlkZW8vbXA0JyxcbiAgICAgICAgICAgICAgICAgICAgbW92OiAndmlkZW8vbXA0JyxcbiAgICAgICAgICAgICAgICAgICAgbXAzOiAnYXVkaW8vbXBlZycsXG4gICAgICAgICAgICAgICAgICAgIG1wZWc6ICdhdWRpby9tcGVnJyxcbiAgICAgICAgICAgICAgICAgICAgb2d2OiAndmlkZW8vb2dnJyxcbiAgICAgICAgICAgICAgICAgICAgb2dnOiAndmlkZW8vb2dnJyxcbiAgICAgICAgICAgICAgICAgICAgb2dhOiAndmlkZW8vb2dnJyxcbiAgICAgICAgICAgICAgICAgICAgdm9yYmlzOiAndmlkZW8vb2dnJyxcbiAgICAgICAgICAgICAgICAgICAgd2VibTogJ3ZpZGVvL3dlYm0nLFxuICAgICAgICAgICAgICAgICAgICBmNGE6ICd2aWRlby9hYWMnLFxuICAgICAgICAgICAgICAgICAgICBtM3U4OiAnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnLFxuICAgICAgICAgICAgICAgICAgICBtM3U6ICdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcsXG4gICAgICAgICAgICAgICAgICAgIGhsczogJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJ1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBjb25zdCB2aWRlbyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpXG4gICAgICAgICAgICAgICAgfSgpO1xuICAgICAgICAgICAgICAgIGlmICghdmlkZW8uY2FuUGxheVR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IHNvdXJjZS5maWxlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBzb3VyY2UudHlwZTtcblxuICAgICAgICAgICAgICAgIGlmKCF0eXBlKXtyZXR1cm4gZmFsc2U7fVxuICAgICAgICAgICAgICAgIGNvbnN0IG1pbWVUeXBlID0gc291cmNlLm1pbWVUeXBlIHx8IE1pbWVUeXBlc1t0eXBlXTtcblxuICAgICAgICAgICAgICAgIGlmKGlzSGxzKGZpbGUsIHR5cGUpICYmIHVzZXJBZ2VudE9iamVjdC5icm93c2VyID09PSBcIk1pY3Jvc29mdCBFZGdlXCIgKXtcbiAgICAgICAgICAgICAgICAgICAgLy9FZGdlIHN1cHBvcnRzIGhscyBuYXRpdmUgYnV0IHRoYXQncyBzdWNrcy5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChpc1J0bXAoZmlsZSwgdHlwZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKGlzV2ViUlRDKGZpbGUsIHR5cGUpKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghbWltZVR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAhIXZpZGVvLmNhblBsYXlUeXBlKG1pbWVUeXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ3dlYnJ0YycsXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2aWRlbyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpXG4gICAgICAgICAgICAgICAgfSgpO1xuICAgICAgICAgICAgICAgIGlmICghdmlkZW8uY2FuUGxheVR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaXNSdG1wKGZpbGUsIHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gc291cmNlLmZpbGU7XG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNvdXJjZS50eXBlO1xuXG4gICAgICAgICAgICAgICAgaWYoaXNXZWJSVEMoZmlsZSwgdHlwZSkpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ2Rhc2gnLFxuICAgICAgICAgICAgY2hlY2tTdXBwb3J0OiBmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IHNvdXJjZS5maWxlO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNvdXJjZS50eXBlO1xuICAgICAgICAgICAgICAgIGlmIChpc1J0bXAoZmlsZSwgdHlwZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgKCB3aW5kb3cuTWVkaWFTb3VyY2UgfHwgd2luZG93LldlYktpdE1lZGlhU291cmNlICkgPT09IFwiZnVuY3Rpb25cIiAmJiBpc0Rhc2goZmlsZSwgdHlwZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdobHMnLFxuICAgICAgICAgICAgY2hlY2tTdXBwb3J0OiBmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmlkZW8gPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKVxuICAgICAgICAgICAgICAgIH0oKTtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gc291cmNlLmZpbGU7XG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNvdXJjZS50eXBlO1xuICAgICAgICAgICAgICAgIGlmIChpc1J0bXAoZmlsZSwgdHlwZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vdGhpcyBtZXRob2QgZnJvbSBobHMuanNcbiAgICAgICAgICAgICAgICBjb25zdCBpc0hsc1N1cHBvcnQgPSAoKSA9PntcbiAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGdldE1lZGlhU291cmNlKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5NZWRpYVNvdXJjZSB8fCB3aW5kb3cuV2ViS2l0TWVkaWFTb3VyY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIG1lZGlhU291cmNlID0gZ2V0TWVkaWFTb3VyY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNvdXJjZUJ1ZmZlciA9IHdpbmRvdy5Tb3VyY2VCdWZmZXIgfHwgd2luZG93LldlYktpdFNvdXJjZUJ1ZmZlcjtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlzVHlwZVN1cHBvcnRlZCA9IG1lZGlhU291cmNlICYmIHR5cGVvZiBtZWRpYVNvdXJjZS5pc1R5cGVTdXBwb3J0ZWQgPT09ICdmdW5jdGlvbicgJiYgbWVkaWFTb3VyY2UuaXNUeXBlU3VwcG9ydGVkKCd2aWRlby9tcDQ7IGNvZGVjcz1cImF2YzEuNDJFMDFFLG1wNGEuNDAuMlwiJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgU291cmNlQnVmZmVyIGlzIGV4cG9zZWQgZW5zdXJlIGl0cyBBUEkgaXMgdmFsaWRcbiAgICAgICAgICAgICAgICAgICAgLy8gc2FmYXJpIGFuZCBvbGQgdmVyc2lvbiBvZiBDaHJvbWUgZG9lIG5vdCBleHBvc2UgU291cmNlQnVmZmVyIGdsb2JhbGx5IHNvIGNoZWNraW5nIFNvdXJjZUJ1ZmZlci5wcm90b3R5cGUgaXMgaW1wb3NzaWJsZVxuICAgICAgICAgICAgICAgICAgICB2YXIgc291cmNlQnVmZmVyVmFsaWRBUEkgPSAhc291cmNlQnVmZmVyIHx8IHNvdXJjZUJ1ZmZlci5wcm90b3R5cGUgJiYgdHlwZW9mIHNvdXJjZUJ1ZmZlci5wcm90b3R5cGUuYXBwZW5kQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBzb3VyY2VCdWZmZXIucHJvdG90eXBlLnJlbW92ZSA9PT0gJ2Z1bmN0aW9uJztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEhaXNUeXBlU3VwcG9ydGVkICYmICEhc291cmNlQnVmZmVyVmFsaWRBUEk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvL1JlbW92ZSB0aGlzICchIXZpZGVvLmNhblBsYXlUeXBlKCdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcpJyBpZiB5b3Ugd2FudCB0byB1c2UgaGxzanMuXG4gICAgICAgICAgICAgICAgLy9ZZXMgSSBuZWVkIGhsc2pzLiAyMDE5LTA2LTEyICYmICEhdmlkZW8uY2FuUGxheVR5cGUoJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzSGxzU3VwcG9ydCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAncnRtcCcsXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gc291cmNlLmZpbGU7XG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNvdXJjZS50eXBlO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHRlc3RGbGFzaCgpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VwcG9ydCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vSUUgb25seVxuICAgICAgICAgICAgICAgICAgICBpZihcIkFjdGl2ZVhPYmplY3RcIiBpbiB3aW5kb3cpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1cHBvcnQgPSAhIShuZXcgQWN0aXZlWE9iamVjdChcIlNob2Nrd2F2ZUZsYXNoLlNob2Nrd2F2ZUZsYXNoXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1jYXRjaChlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdXBwb3J0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vVzNDLCBiZXR0ZXIgc3VwcG9ydCBpbiBsZWdhY3kgYnJvd3NlclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzdXBwb3J0ID0gISFuYXZpZ2F0b3IubWltZVR5cGVzWydhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaCddO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3VwcG9ydDtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBjaGVja1N1cHBvcnQoKXtcbiAgICAgICAgICAgICAgICAgICAgaWYodXNlckFnZW50T2JqZWN0LmJyb3dzZXIgPT09IFwiTWljcm9zb2Z0IEVkZ2VcIiB8fCB1c2VyQWdlbnRPYmplY3Qub3MgPT09IFwiQW5kcm9pZFwiIHx8IHVzZXJBZ2VudE9iamVjdC5vcyA9PT0gXCJpT1NcIiAgfHwgdXNlckFnZW50T2JqZWN0LmJyb3dzZXIgPT09IFwiU2FmYXJpXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpc1J0bXAoZmlsZSwgdHlwZSkgJiYgdGVzdEZsYXNoKCkgJiYgY2hlY2tTdXBwb3J0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICBdO1xuXG4gICAgdGhhdC5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UgPSAoc29ydWNlXykgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJTdXBwb3J0Q2hlY2tlciA6IGZpbmRQcm92aWRlck5hbWVCeVNvdXJjZSgpXCIsIHNvcnVjZV8pO1xuICAgICAgICBjb25zdCBzb3VyY2UgPSAoc29ydWNlXyA9PT0gT2JqZWN0KHNvcnVjZV8pKSA/IHNvcnVjZV8gOiB7fTtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHN1cHBvcnRMaXN0Lmxlbmd0aDsgaSArKyl7XG4gICAgICAgICAgICBpZihzdXBwb3J0TGlzdFtpXS5jaGVja1N1cHBvcnQoc291cmNlKSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1cHBvcnRMaXN0W2ldLm5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQuZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0ID0gKHBsYXlsaXN0SXRlbSkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJTdXBwb3J0Q2hlY2tlciA6IGZpbmRQcm92aWRlck5hbWVzQnlQbGF5bGlzdCgpXCIsIHBsYXlsaXN0SXRlbSk7XG4gICAgICAgIGxldCBzdXBwb3J0TmFtZXMgPSBbXTtcbiAgICAgICAgLypmb3IgKGxldCBpID0gcGxheWxpc3RfLmxlbmd0aDsgaS0tOykge1xuXG5cbiAgICAgICAgfSovXG4gICAgICAgIGNvbnN0IGl0ZW0gPSBwbGF5bGlzdEl0ZW07XG5cbiAgICAgICAgaWYoaXRlbSAmJiBpdGVtLnNvdXJjZXMpe1xuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IGl0ZW0uc291cmNlcy5sZW5ndGg7IGogKyspe1xuICAgICAgICAgICAgICAgIGxldCBzb3VyY2UgPSBpdGVtLnNvdXJjZXNbal07XG4gICAgICAgICAgICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdXBwb3J0ZWQgPSB0aGF0LmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShzb3VyY2UpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3VwcG9ydGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdXBwb3J0TmFtZXMucHVzaChzdXBwb3J0ZWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gc3VwcG9ydE5hbWVzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgfTtcbiAgICByZXR1cm4gdGhhdDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFN1cHBvcnRDaGVja2VyO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gNC4uXG4gKi9cbmltcG9ydCBTcnRQYXJzZXIgZnJvbSBcImFwaS9jYXB0aW9uL3BhcnNlci9TcnRQYXJzZXJcIjtcbmltcG9ydCBWVFRDdWUgZnJvbSBcInV0aWxzL2NhcHRpb25zL3Z0dEN1ZVwiO1xuLy9pbXBvcnQgUmVxdWVzdCBmcm9tIFwidXRpbHMvZG93bmxvYWRlclwiO1xuXG5jb25zdCBMb2FkZXIgPSBmdW5jdGlvbigpe1xuICAgIGNvbnN0IHRoYXQgPSB7fTtcblxuICAgIGNvbnN0IGNvbnZlcnRUb1ZUVEN1ZXMgPSBmdW5jdGlvbiAoY3Vlcykge1xuICAgICAgICByZXR1cm4gY3Vlcy5tYXAoY3VlID0+IG5ldyBWVFRDdWUoY3VlLnN0YXJ0LCBjdWUuZW5kLCBjdWUudGV4dCkpO1xuICAgIH1cbiAgICAvL2xhbmd1YWdlIDogZm9yIFNNSSBmb3JtYXQuXG4gICAgdGhhdC5sb2FkID0gKHRyYWNrLCBsYW5ndWFnZSwgc3VjY2Vzc0NhbGxiYWNrLCBlcnJvckNhbGxiYWNrKSA9PiB7XG5cbiAgICAgICAgdmFyIHJlcXVlc3RPcHRpb25zICA9IHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgICAgIHVybCA6IHRyYWNrLmZpbGUsXG4gICAgICAgICAgICBlbmNvZGluZzogbnVsbFxuICAgICAgICB9O1xuXG4gICAgICAgIGxvYWRSZXF1ZXN0RG93bmxvZGVyKCkudGhlbihSZXF1ZXN0ID0+IHtcbiAgICAgICAgICAgIFJlcXVlc3QocmVxdWVzdE9wdGlvbnMsIGZ1bmN0aW9uKGVycm9yLCByZXNwb25zZSwgYm9keSkge1xuICAgICAgICAgICAgICAgIGlmKGVycm9yKXtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JDYWxsYmFjayhlcnJvcik7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjdWVzID0gW107XG4gICAgICAgICAgICAgICAgICAgIGxldCB2dHRDdWVzID0gW107XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGJvZHkuaW5kZXhPZignV0VCVlRUJykgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiV0VCVlRUIExPQURFRFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRWdHRQYXJzZXIoKS50aGVuKFdlYlZUVCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBhcnNlciA9IG5ldyBXZWJWVFQuUGFyc2VyKHdpbmRvdywgV2ViVlRULlN0cmluZ0RlY29kZXIoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdnR0Q3VlcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlci5vbmN1ZSA9IGZ1bmN0aW9uKGN1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2dHRDdWVzLnB1c2goY3VlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlci5vbmZsdXNoID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVsZXRlIHRyYWNrLnhocjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc0NhbGxiYWNrKHZ0dEN1ZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUGFyc2UgY2FsbHMgb25mbHVzaCBpbnRlcm5hbGx5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VyLnBhcnNlKGJvZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVsZXRlIHRyYWNrLnhocjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvckNhbGxiYWNrKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZSBpZihib2R5LmluZGV4T2YoJ1NBTUknKSA+PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlNBTUkgTE9BREVEXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9hZFNtaVBhcnNlcigpLnRoZW4oU21pUGFyc2VyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGFyc2VkRGF0YSA9IFNtaVBhcnNlcihib2R5LCB7Zml4ZWRMYW5nIDogbGFuZ3VhZ2V9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2dHRDdWVzID0gY29udmVydFRvVlRUQ3VlcyhwYXJzZWREYXRhLnJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc0NhbGxiYWNrKHZ0dEN1ZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vZGVsZXRlIHRyYWNrLnhocjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvckNhbGxiYWNrKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJTUlQgTE9BREVEXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VlcyA9IFNydFBhcnNlcihib2R5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZ0dEN1ZXMgPSBjb252ZXJ0VG9WVFRDdWVzKGN1ZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2Vzc0NhbGxiYWNrKHZ0dEN1ZXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgLy9kZWxldGUgdHJhY2sueGhyO1xuICAgICAgICAgICAgZXJyb3JDYWxsYmFjayhlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5mdW5jdGlvbiBsb2FkUmVxdWVzdERvd25sb2Rlcigpe1xuICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ3V0aWxzL2Rvd25sb2FkZXInXSwgZnVuY3Rpb24gKHJlcXVpcmUpIHtcbiAgICAgICAgcmV0dXJuIHJlcXVpcmUoJ3V0aWxzL2Rvd25sb2FkZXInKS5kZWZhdWx0O1xuICAgIH0sIGZ1bmN0aW9uKGVycil7Y29uc29sZS5sb2coZXJyKTt9LCAnZG93bmxvYWRlcicpO1xufTtcbmZ1bmN0aW9uIGxvYWRWdHRQYXJzZXIoKSB7XG4gICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL2NhcHRpb24vcGFyc2VyL1Z0dFBhcnNlciddLCBmdW5jdGlvbiAocmVxdWlyZSkge1xuICAgICAgICByZXR1cm4gcmVxdWlyZSgnYXBpL2NhcHRpb24vcGFyc2VyL1Z0dFBhcnNlcicpLmRlZmF1bHQ7XG4gICAgfSwgZnVuY3Rpb24oZXJyKXtjb25zb2xlLmxvZyhlcnIpO30sICd2dHRwYXJzZXInKTtcbn1cbmZ1bmN0aW9uIGxvYWRTbWlQYXJzZXIoKSB7XG4gICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL2NhcHRpb24vcGFyc2VyL1NtaVBhcnNlciddLCBmdW5jdGlvbiAocmVxdWlyZSkge1xuICAgICAgICByZXR1cm4gcmVxdWlyZSgnYXBpL2NhcHRpb24vcGFyc2VyL1NtaVBhcnNlcicpLmRlZmF1bHQ7XG4gICAgfSwgZnVuY3Rpb24oZXJyKXtjb25zb2xlLmxvZyhlcnIpO30sICdzbWlwYXJzZXInKTtcbn1cbmV4cG9ydCBkZWZhdWx0IExvYWRlcjtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDUuIDE3Li5cbiAqL1xuaW1wb3J0IENhcHRpb25Mb2FkZXIgZnJvbSAnYXBpL2NhcHRpb24vTG9hZGVyJztcbmltcG9ydCB7UkVBRFksIEVSUk9SUywgRVJST1IsIFBMQVlFUl9DQVBUSU9OX0VSUk9SLCBDT05URU5UX01FVEEsIENPTlRFTlRfVElNRSwgQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VELCBDT05URU5UX0NBUFRJT05fQ0hBTkdFRH0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcbmltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XG5cbmNvbnN0IGlzU3VwcG9ydCA9IGZ1bmN0aW9uKGtpbmQpe1xuICAgIHJldHVybiBraW5kID09PSAnc3VidGl0bGVzJyB8fCBraW5kID09PSAnY2FwdGlvbnMnO1xufTtcblxuY29uc3QgTWFuYWdlciA9IGZ1bmN0aW9uKGFwaSwgcGxheWxpc3RJbmRleCl7XG5cbiAgICBjb25zdCB0aGF0ID0ge307XG4gICAgbGV0IGNhcHRpb25MaXN0ID0gW107XG4gICAgbGV0IGN1cnJlbnRDYXB0aW9uSW5kZXggPSAtMTtcblxuICAgIGxldCBjYXB0aW9uTG9hZGVyID0gQ2FwdGlvbkxvYWRlcigpO1xuICAgIGxldCBpc0Zpc3J0TG9hZCA9IHRydWU7XG4gICAgbGV0IGlzU2hvd2luZyA9IGZhbHNlO1xuXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQ2FwdGlvbiBNYW5hZ2VyID4+IFwiLCBwbGF5bGlzdEluZGV4KTtcblxuXG4gICAgbGV0IGJpbmRUcmFjayA9IGZ1bmN0aW9uKHRyYWNrLCB2dHRDdWVzKXtcbiAgICAgICAgdHJhY2suZGF0YSA9IHZ0dEN1ZXMgfHwgW107XG4gICAgICAgIHRyYWNrLm5hbWUgPSB0cmFjay5sYWJlbCB8fCB0cmFjay5uYW1lIHx8IHRyYWNrLmxhbmd1YWdlO1xuICAgICAgICB0cmFjay5pZCA9IChmdW5jdGlvbih0cmFjaywgdHJhY2tzQ291bnQpIHtcbiAgICAgICAgICAgIHZhciB0cmFja0lkO1xuICAgICAgICAgICAgdmFyIHByZWZpeCA9IHRyYWNrLmtpbmQgfHwgJ2NjJztcbiAgICAgICAgICAgIGlmICh0cmFjay5kZWZhdWx0IHx8IHRyYWNrLmRlZmF1bHR0cmFjaykge1xuICAgICAgICAgICAgICAgIHRyYWNrSWQgPSAnZGVmYXVsdCc7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdHJhY2tJZCA9IHRyYWNrLmlkIHx8IChwcmVmaXggKyB0cmFja3NDb3VudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihpc0Zpc3J0TG9hZCl7XG4gICAgICAgICAgICAgICAgLy9UaGlzIGV4ZWN1dGUgb25seSBvbi4gYW5kIHRoZW4gdXNlIGZsdXNoQ2FwdGlvbkxpc3QobGFzdENhcHRpb25JbmRleCk7XG4gICAgICAgICAgICAgICAgY2hhbmdlQ3VycmVudENhcHRpb24oY2FwdGlvbkxpc3QubGVuZ3RofHwwKTtcbiAgICAgICAgICAgICAgICBpc0Zpc3J0TG9hZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJhY2tJZDtcbiAgICAgICAgfSkodHJhY2ssIGNhcHRpb25MaXN0Lmxlbmd0aCk7XG5cbiAgICAgICAgY2FwdGlvbkxpc3QucHVzaCh0cmFjayk7XG4gICAgICAgIHJldHVybiB0cmFjay5pZDtcbiAgICB9O1xuICAgIGxldCBjaGFuZ2VDdXJyZW50Q2FwdGlvbiA9IGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgY3VycmVudENhcHRpb25JbmRleCA9IGluZGV4O1xuICAgICAgICBhcGkudHJpZ2dlcihDT05URU5UX0NBUFRJT05fQ0hBTkdFRCwgY3VycmVudENhcHRpb25JbmRleCk7XG4gICAgfTtcbiAgICBpZihhcGkuZ2V0Q29uZmlnKCkucGxheWxpc3QgJiYgYXBpLmdldENvbmZpZygpLnBsYXlsaXN0Lmxlbmd0aCA+IDApe1xuICAgICAgICBsZXQgcGxheWxpc3QgPSBhcGkuZ2V0Q29uZmlnKCkucGxheWxpc3RbcGxheWxpc3RJbmRleF07XG5cbiAgICAgICAgaWYocGxheWxpc3QgJiYgcGxheWxpc3QudHJhY2tzICYmIHBsYXlsaXN0LnRyYWNrcy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBwbGF5bGlzdC50cmFja3MubGVuZ3RoOyBpICsrKXtcbiAgICAgICAgICAgICAgICBjb25zdCB0cmFjayA9IHBsYXlsaXN0LnRyYWNrc1tpXTtcblxuICAgICAgICAgICAgICAgIGlmKGlzU3VwcG9ydCh0cmFjay5raW5kKSAmJiAhIF8uZmluZFdoZXJlKHRyYWNrLCB7ZmlsZSA6IHRyYWNrLmZpbGV9KSl7XG4gICAgICAgICAgICAgICAgICAgIC8vdGhhdC5mbHVzaENhcHRpb25MaXN0KGN1cnJlbnRDYXB0aW9uSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBjYXB0aW9uTG9hZGVyLmxvYWQodHJhY2ssIHRyYWNrLmxhbmcsIGZ1bmN0aW9uKHZ0dEN1ZXMpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodnR0Q3VlcyAmJiB2dHRDdWVzLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjYXB0aW9uSWQgPSBiaW5kVHJhY2sodHJhY2ssIHZ0dEN1ZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnJvcil7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9DQVBUSU9OX0VSUk9SXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXBpLnRyaWdnZXIoRVJST1IsIHRlbXBFcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXBpLm9uKENPTlRFTlRfVElNRSwgZnVuY3Rpb24obWV0YSl7XG4gICAgICAgIGxldCBwb3NpdGlvbiA9IG1ldGEucG9zaXRpb247XG4gICAgICAgIGlmKGN1cnJlbnRDYXB0aW9uSW5kZXggPiAtMSAmJiBjYXB0aW9uTGlzdFtjdXJyZW50Q2FwdGlvbkluZGV4XSl7XG4gICAgICAgICAgICBsZXQgY3VycmVudEN1ZXMgPSBfLmZpbHRlcihjYXB0aW9uTGlzdFtjdXJyZW50Q2FwdGlvbkluZGV4XS5kYXRhLCBmdW5jdGlvbiAoY3VlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvc2l0aW9uID49IChjdWUuc3RhcnRUaW1lKSAmJiAoICghY3VlLmVuZFRpbWUgfHwgcG9zaXRpb24pIDw9IGN1ZS5lbmRUaW1lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYoY3VycmVudEN1ZXMgJiYgY3VycmVudEN1ZXMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgYXBpLnRyaWdnZXIoQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VELCBjdXJyZW50Q3Vlc1swXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH0pO1xuICAgIHRoYXQuZmx1c2hDYXB0aW9uTGlzdCA9IChsYXN0Q2FwdGlvbkluZGV4KSA9PntcbiAgICAgICAgY2FwdGlvbkxpc3QgPSBbXTtcbiAgICAgICAgY2hhbmdlQ3VycmVudENhcHRpb24obGFzdENhcHRpb25JbmRleCk7XG4gICAgICAgIC8vY3VycmVudENhcHRpb25JbmRleCA9IGxhc3RDYXB0aW9uSW5kZXg7XG4gICAgfTtcbiAgICB0aGF0LmdldENhcHRpb25MaXN0ID0gKCkgPT57XG4gICAgICAgIHJldHVybiBjYXB0aW9uTGlzdHx8W107XG4gICAgfTtcbiAgICB0aGF0LmdldEN1cnJlbnRDYXB0aW9uID0gKCkgPT57XG4gICAgICAgIHJldHVybiBjdXJyZW50Q2FwdGlvbkluZGV4O1xuICAgIH07XG4gICAgdGhhdC5zZXRDdXJyZW50Q2FwdGlvbiA9IChfaW5kZXgpID0+e1xuICAgICAgICBpZihfaW5kZXggPiAtMiAmJiBfaW5kZXggPCBjYXB0aW9uTGlzdC5sZW5ndGgpe1xuICAgICAgICAgICAgY2hhbmdlQ3VycmVudENhcHRpb24oX2luZGV4KTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhhdC5hZGRDYXB0aW9uID0gKHRyYWNrKSA9PntcbiAgICAgICAgaWYoaXNTdXBwb3J0KHRyYWNrLmtpbmQpICYmICEgXy5maW5kV2hlcmUoY2FwdGlvbkxvYWRlciwge2ZpbGUgOiB0cmFjay5maWxlfSkpe1xuICAgICAgICAgICAgY2FwdGlvbkxvYWRlci5sb2FkKHRyYWNrLCBmdW5jdGlvbih2dHRDdWVzKXtcbiAgICAgICAgICAgICAgICBpZih2dHRDdWVzICYmIHZ0dEN1ZXMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIGJpbmRUcmFjayh0cmFjaywgdnR0Q3Vlcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3Ipe1xuICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBlcnJvcnNbUExBWUVSX0NBUFRJT05fRVJST1JdO1xuICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgICAgIGFwaS50cmlnZ2VyKEVSUk9SLCB0ZW1wRXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQucmVtb3ZlQ2FwdGlvbiA9IChpbmRleCkgPT4ge1xuICAgICAgICBpZihpbmRleCA+IC0xICYmIGluZGV4IDwgY2FwdGlvbkxpc3QubGVuZ3RoKXtcbiAgICAgICAgICAgIGNhcHRpb25MaXN0LnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICByZXR1cm4gY2FwdGlvbkxpc3Q7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+IHtcbiAgICAgICAgY2FwdGlvbkxpc3QgPSBbXTtcbiAgICAgICAgY2FwdGlvbkxvYWRlciA9IG51bGw7XG4gICAgICAgIGFwaS5vZmYoQ09OVEVOVF9USU1FLCBudWxsLCB0aGF0KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cblxuXG5leHBvcnQgZGVmYXVsdCBNYW5hZ2VyO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNS4gMjkuLlxuICovXG5pbXBvcnQgeyBobXNUb1NlY29uZCwgdHJpbSB9IGZyb20gXCJ1dGlscy9zdHJpbmdzXCJcblxuZnVuY3Rpb24gX2VudHJ5KGRhdGEpIHtcbiAgICB2YXIgZW50cnkgPSB7fTtcbiAgICB2YXIgYXJyYXkgPSBkYXRhLnNwbGl0KCdcXHJcXG4nKTtcbiAgICBpZiAoYXJyYXkubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGFycmF5ID0gZGF0YS5zcGxpdCgnXFxuJyk7XG4gICAgfVxuICAgIHZhciBpZHggPSAxO1xuICAgIGlmIChhcnJheVswXS5pbmRleE9mKCcgLS0+ICcpID4gMCkge1xuICAgICAgICBpZHggPSAwO1xuICAgIH1cbiAgICBpZiAoYXJyYXkubGVuZ3RoID4gaWR4ICsgMSAmJiBhcnJheVtpZHggKyAxXSkge1xuICAgICAgICAvLyBUaGlzIGxpbmUgY29udGFpbnMgdGhlIHN0YXJ0IGFuZCBlbmQuXG4gICAgICAgIHZhciBsaW5lID0gYXJyYXlbaWR4XTtcbiAgICAgICAgdmFyIGluZGV4ID0gbGluZS5pbmRleE9mKCcgLS0+ICcpO1xuICAgICAgICBpZiAoaW5kZXggPiAwKSB7XG4gICAgICAgICAgICBlbnRyeS5zdGFydCA9IGhtc1RvU2Vjb25kKGxpbmUuc3Vic3RyKDAsIGluZGV4KSk7XG4gICAgICAgICAgICBlbnRyeS5lbmQgPSBobXNUb1NlY29uZChsaW5lLnN1YnN0cihpbmRleCArIDUpKTtcbiAgICAgICAgICAgIGVudHJ5LnRleHQgPSBhcnJheS5zbGljZShpZHggKyAxKS5qb2luKCdcXHJcXG4nKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZW50cnk7XG5cbn1cblxuY29uc3QgU3J0UGFyc2VyID0gZnVuY3Rpb24oZGF0YSkge1xuICAgIHZhciBjYXB0aW9ucyA9IFtdO1xuXG4gICAgZGF0YSA9IHRyaW0oZGF0YSk7XG5cbiAgICB2YXIgbGlzdCA9IGRhdGEuc3BsaXQoJ1xcclxcblxcclxcbicpO1xuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBsaXN0ID0gZGF0YS5zcGxpdCgnXFxuXFxuJyk7XG4gICAgfVxuXG5cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAobGlzdFtpXSA9PT0gJ1dFQlZUVCcpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlbnRyeSA9IF9lbnRyeShsaXN0W2ldKTtcbiAgICAgICAgaWYgKGVudHJ5LnRleHQpIHtcbiAgICAgICAgICAgIGNhcHRpb25zLnB1c2goZW50cnkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNhcHRpb25zO1xufVxuXG5cblxuZXhwb3J0IGRlZmF1bHQgU3J0UGFyc2VyOyIsIi8vIFNUQVRFXG5leHBvcnQgY29uc3QgU1RBVEVfQlVGRkVSSU5HID0gXCJidWZmZXJpbmdcIjtcbmV4cG9ydCBjb25zdCBTVEFURV9JRExFID0gXCJpZGxlXCI7XG5leHBvcnQgY29uc3QgU1RBVEVfQ09NUExFVEUgPSBcImNvbXBsZXRlXCI7XG5leHBvcnQgY29uc3QgU1RBVEVfUEFVU0VEID0gXCJwYXVzZWRcIjtcbmV4cG9ydCBjb25zdCBTVEFURV9QTEFZSU5HID0gXCJwbGF5aW5nXCI7XG5leHBvcnQgY29uc3QgU1RBVEVfRVJST1IgPSBcImVycm9yXCI7XG5leHBvcnQgY29uc3QgU1RBVEVfTE9BRElORyA9IFwibG9hZGluZ1wiO1xuZXhwb3J0IGNvbnN0IFNUQVRFX1NUQUxMRUQgPSBcInN0YWxsZWRcIjtcblxuZXhwb3J0IGNvbnN0IFNUQVRFX0FEX0xPQURJTkcgPSBcImFkTG9hZGluZ1wiO1xuZXhwb3J0IGNvbnN0IFNUQVRFX0FEX0xPQURFRCA9IFwiYWRMb2FkZWRcIjtcbmV4cG9ydCBjb25zdCBTVEFURV9BRF9QTEFZSU5HID0gXCJhZFBsYXlpbmdcIjtcbmV4cG9ydCBjb25zdCBTVEFURV9BRF9QQVVTRUQgPSBcImFkUGF1c2VkXCI7XG5leHBvcnQgY29uc3QgU1RBVEVfQURfQ09NUExFVEUgPSBcImFkQ29tcGxldGVcIjtcbmV4cG9ydCBjb25zdCBTVEFURV9BRF9FUlJPUiA9IFwiYWRFcnJvclwiO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9BRF9DTElDSyA9IFwiYWRjbGlja1wiO1xuXG4vLyBQUk9WSURFUlxuZXhwb3J0IGNvbnN0IFBST1ZJREVSX0hUTUw1ID0gXCJodG1sNVwiO1xuZXhwb3J0IGNvbnN0IFBST1ZJREVSX1dFQlJUQyA9IFwid2VicnRjXCI7XG5leHBvcnQgY29uc3QgUFJPVklERVJfREFTSCA9IFwiZGFzaFwiO1xuZXhwb3J0IGNvbnN0IFBST1ZJREVSX0hMUyA9IFwiaGxzXCI7XG5leHBvcnQgY29uc3QgUFJPVklERVJfUlRNUCA9IFwicnRtcFwiO1xuXG4vLyBFVkVOVFNcbmV4cG9ydCBjb25zdCBDT05URU5UX0NPTVBMRVRFID0gU1RBVEVfQ09NUExFVEU7XG5leHBvcnQgY29uc3QgUkVBRFkgPSBcInJlYWR5XCI7XG5leHBvcnQgY29uc3QgREVTVFJPWSA9IFwiZGVzdHJveVwiO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfU0VFSyA9IFwic2Vla1wiO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfQlVGRkVSX0ZVTEwgPSBcImJ1ZmZlckZ1bGxcIjtcbmV4cG9ydCBjb25zdCBESVNQTEFZX0NMSUNLID0gXCJkaXNwbGF5Q2xpY2tcIjtcbmV4cG9ydCBjb25zdCBDT05URU5UX0xPQURFRCA9IFwibG9hZGVkXCI7XG5leHBvcnQgY29uc3QgUExBWUxJU1RfQ0hBTkdFRCA9IFwicGxheWxpc3RDaGFuZ2VkXCI7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9TRUVLRUQgPSBcInNlZWtlZFwiO1xuZXhwb3J0IGNvbnN0IEFMTF9QTEFZTElTVF9FTkRFRCA9IFwiYWxsUGxheWxpc3RFbmRlZFwiO1xuZXhwb3J0IGNvbnN0IE5FVFdPUktfVU5TVEFCTEVEID0gXCJ1bnN0YWJsZU5ldHdvcmtcIjtcblxuXG5cbmV4cG9ydCBjb25zdCBFUlJPUiA9IFwiZXJyb3JcIjtcblxuLy8gU1RBVEUgT0YgUExBWUVSXG5leHBvcnQgY29uc3QgUExBWUVSX1NUQVRFID0gXCJzdGF0ZUNoYW5nZWRcIjtcbmV4cG9ydCBjb25zdCBQTEFZRVJfQ09NUExFVEUgPSBTVEFURV9DT01QTEVURTtcbmV4cG9ydCBjb25zdCBQTEFZRVJfUEFVU0UgPSBcInBhdXNlXCI7XG5leHBvcnQgY29uc3QgUExBWUVSX1BMQVkgPSBcInBsYXlcIjtcblxuZXhwb3J0IGNvbnN0IFBMQVlFUl9DTElDS0VEID0gXCJjbGlja2VkXCI7XG5leHBvcnQgY29uc3QgUExBWUVSX1JFU0laRUQgPSBcInJlc2l6ZWRcIjtcbmV4cG9ydCBjb25zdCBQTEFZRVJfTE9BRElORyA9IFwibG9hZGluZ1wiO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9GVUxMU0NSRUVOX1JFUVVFU1QgPSBcImZ1bGxzY3JlZW5SZXF1ZXN0ZWRcIjtcbmV4cG9ydCBjb25zdCBQTEFZRVJfRlVMTFNDUkVFTl9DSEFOR0VEID0gXCJmdWxsc2NyZWVuQ2hhbmdlZFwiO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XQVJOSU5HID0gXCJ3YXJuaW5nXCI7XG5cbmV4cG9ydCBjb25zdCBBRF9DSEFOR0VEID0gXCJhZENoYW5nZWRcIjtcbmV4cG9ydCBjb25zdCBBRF9USU1FID0gXCJhZFRpbWVcIjtcbmV4cG9ydCBjb25zdCBDT05URU5UX0JVRkZFUiA9IFwiYnVmZmVyQ2hhbmdlZFwiO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfVElNRSA9IFwidGltZVwiO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfUkFURV9DSEFOR0UgPSBcInJhdGVjaGFuZ2VcIjtcbmV4cG9ydCBjb25zdCBDT05URU5UX1ZPTFVNRSA9IFwidm9sdW1lQ2hhbmdlZFwiO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfTVVURSA9IFwibXV0ZVwiO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfTUVUQSA9IFwibWV0YUNoYW5nZWRcIjtcbmV4cG9ydCBjb25zdCBDT05URU5UX1NPVVJDRV9DSEFOR0VEID0gXCJzb3VyY2VDaGFuZ2VkXCI7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9MRVZFTF9DSEFOR0VEID0gXCJxdWFsaXR5TGV2ZWxDaGFuZ2VkXCI7XG5leHBvcnQgY29uc3QgUExBWUJBQ0tfUkFURV9DSEFOR0VEID0gXCJwbGF5YmFja1JhdGVDaGFuZ2VkXCI7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9DQVBUSU9OX0NVRV9DSEFOR0VEID0gXCJjdWVDaGFuZ2VkXCI7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9DQVBUSU9OX0NIQU5HRUQgPSBcImNhcHRpb25DaGFuZ2VkXCI7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9USU1FX01PREVfQ0hBTkdFRCA9IFwidGltZURpc3BsYXlNb2RlQ2hhbmdlZFwiO1xuZXhwb3J0IGNvbnN0IE9NRV9QMlBfTU9ERSA9IFwicDJwTW9kZVwiO1xuXG5cbmV4cG9ydCBjb25zdCBBRF9DTElFTlRfR09PR0xFSU1BID0gXCJnb29nbGVpbWFcIjtcbmV4cG9ydCBjb25zdCBBRF9DTElFTlRfVkFTVCA9IFwidmFzdFwiO1xuXG5cbmV4cG9ydCBjb25zdCBJTklUX1VOS05XT05fRVJST1IgPSAxMDA7XG5leHBvcnQgY29uc3QgSU5JVF9VTlNVUFBPUlRfRVJST1IgPSAxMDE7XG5leHBvcnQgY29uc3QgSU5JVF9SVE1QX1NFVFVQX0VSUk9SID0gMTAyO1xuZXhwb3J0IGNvbnN0IElOSVRfREFTSF9VTlNVUFBPUlQgPSAxMDM7XG5leHBvcnQgY29uc3QgSU5JVF9BRFNfRVJST1IgPSAxMDQ7XG5leHBvcnQgY29uc3QgSU5JVF9EQVNIX05PVEZPVU5EID0gMTA1O1xuZXhwb3J0IGNvbnN0IElOSVRfSExTSlNfTk9URk9VTkQgPSAxMDY7XG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fRVJST1IgPSAzMDA7XG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SID0gMzAxO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX05FVFdPUktfRVJST1IgPSAzMDI7XG5leHBvcnQgY29uc3QgUExBWUVSX1VOS05XT05fREVDT0RFX0VSUk9SID0gMzAzO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9GSUxFX0VSUk9SID0gMzA0O1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9DQVBUSU9OX0VSUk9SID0gMzA1O1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9CQURfUkVRVUVTVF9FUlJPUiA9IDMwNjtcbmV4cG9ydCBjb25zdCBQTEFZRVJfQVVUSF9GQUlMRURfRVJST1IgPSAzMDc7XG5leHBvcnQgY29uc3QgUExBWUVSX05PVF9BQ0NFUFRBQkxFX0VSUk9SID0gMzA4O1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfV1NfRVJST1IgPSA1MDE7XG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SID0gNTAyO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SID0gNTAzO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUiA9IDUwNDtcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SID0gNTA1O1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfTkVUV09SS19TTE9XID0gNTEwO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfVU5FWFBFQ1RFRF9ESVNDT05ORUNUID0gNTExO1xuXG5leHBvcnQgY29uc3QgV0FSTl9NU0dfTVVURURQTEFZID0gXCJQbGVhc2UgdG91Y2ggaGVyZSB0byB0dXJuIG9uIHRoZSBzb3VuZC5cIjtcblxuXG5leHBvcnQgY29uc3QgVUlfSUNPTlMgPSB7XG4gICAgdm9sdW1lX211dGUgOiBcInZvbHVtZS1tdXRlXCIsXG4gICAgb3Bfd2FybmluZyA6IFwib3Atd2FybmluZ1wiXG59O1xuXG5cbmV4cG9ydCBjb25zdCBFUlJPUlMgPSB7Y29kZXMgOiBcIlwifTtcblxuXG5leHBvcnQgY29uc3QgU1lTVEVNX1RFWFQgPSBbXG4gICAge1xuICAgICAgICBcImxhbmdcIiA6IFwiZW5cIixcbiAgICAgICAgXCJ1aVwiIDoge1xuICAgICAgICAgICAgXCJjb250ZXh0XCIgOiBcIkFib3V0IE92ZW5QbGF5ZXJcIixcbiAgICAgICAgICAgIFwiY29udHJvbHNcIiA6IHtcbiAgICAgICAgICAgICAgICBcImxpdmVcIiA6IFwibGl2ZVwiLFxuICAgICAgICAgICAgICAgIFwibG93X2xhdGVuY3lfbGl2ZVwiIDogXCJsb3cgbGF0ZW5jeSBsaXZlXCIsXG4gICAgICAgICAgICAgICAgXCJsb3dfbGF0ZW5jeV9wMnBcIiA6IFwibG93IGxhdGVuY3kgcDJwXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwbGF5bGlzdFwiIDogXCJQbGF5bGlzdFwiLFxuICAgICAgICAgICAgXCJzZXR0aW5nXCIgOiB7XG4gICAgICAgICAgICAgICAgXCJ0aXRsZVwiIDogXCJTZXR0aW5nc1wiLFxuICAgICAgICAgICAgICAgIFwic3BlZWRcIiA6IFwiU3BlZWRcIixcbiAgICAgICAgICAgICAgICBcInNvdXJjZVwiIDogXCJTb3VyY2VcIixcbiAgICAgICAgICAgICAgICBcInF1YWxpdHlcIiA6IFwiUXVhbGl0eVwiLFxuICAgICAgICAgICAgICAgIFwiY2FwdGlvblwiIDogXCJDYXB0aW9uXCIsXG4gICAgICAgICAgICAgICAgXCJkaXNwbGF5XCIgOiBcIkRpc3BsYXlcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImFwaVwiIDoge1xuICAgICAgICAgICAgXCJtZXNzYWdlXCIgOiB7XG4gICAgICAgICAgICAgICAgXCJtdXRlZF9wbGF5XCIgOiBcIlBsZWFzZSB0b3VjaCBoZXJlIHRvIHR1cm4gb24gdGhlIHNvdW5kLlwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJlcnJvclwiOiB7XG4gICAgICAgICAgICAgICAgMTAwOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAxMDAsXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNhbiBub3QgbG9hZCBkdWUgdG8gdW5rbm93biByZWFzb25zLlwiLFxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIkNhbiBub3QgbG9hZCBkdWUgdG8gdW5rbm93biByZWFzb25zLlwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAxMDE6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDEwMSxcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiQ2FuIG5vdCBsb2FkIGR1ZSB0byB1bnN1cHBvcnRlZCBtZWRpYS5cIixcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJDYW4gbm90IGxvYWQgZHVlIHRvIHVuc3VwcG9ydGVkIG1lZGlhLlwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAxMDI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDEwMixcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiRmxhc2ggZmV0Y2hpbmcgcHJvY2VzcyBhYm9ydGVkLiA8L2JyPjxhIGhyZWY9J2h0dHA6Ly93d3cuYWRvYmUuY29tL2dvL2dldGZsYXNocGxheWVyJyB0YXJnZXQ9J19zZWxmJz48aW1nIHNyYz0naHR0cDovL3d3dy5hZG9iZS5jb20vaW1hZ2VzL3NoYXJlZC9kb3dubG9hZF9idXR0b25zL2dldF9mbGFzaF9wbGF5ZXIuZ2lmJyBhbHQ9J0dldCBBZG9iZSBGbGFzaCBwbGF5ZXInPjwvYT5cIixcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJJdCBsb29rcyBsaWtlIG5vdCBmb3VuZCBzd2Ygb3IgeW91ciBlbnZpcm9ubWVudCBpcyBsb2NhbGhvc3QuXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDEwMzoge1xuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMTAzLFxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJDYW4gbm90IGxvYWQgZHVlIHRvIGRhc2hqcy4gUGxlYXNlIGNoZWNrIHRoZSBsYXN0ZXN0IHZlcnNpb24uXCIsXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiZGFzaC5qcyB2ZXJzaW9uIGlzIG9sZC4gUGxlYXNlIGNoZWNrIHRoZSBsYXN0ZXN0LlwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAxMDQ6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDEwNCxcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiQ2FuIG5vdCBsb2FkIGR1ZSB0byBnb29nbGUgaW1hIGZvciBBZHMuIFwiLFxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIlBsZWFzZSBjaGVjayB0aGUgZ29vZ2xlIGltYSBsaWJyYXJ5LlwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAxMDU6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDEwNSxcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiQ2FuIG5vdCBmaW5kIHRoZSBkYXNoanMuIFBsZWFzZSBjaGVjayB0aGUgZGFzaGpzLlwiLFxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIk5vdCBmb3VuZCBkYXNoanMuXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDEwNjoge1xuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMTA2LFxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJDYW4gbm90IGZpbmQgdGhlIGhsc2pzLiBQbGVhc2UgY2hlY2sgdGhlIGhsc2pzLlwiLFxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIk5vdCBmb3VuZCBobHNqcy5cIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgMzAwOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDAsXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNhbiBub3QgcGxheSBkdWUgdG8gdW5rbm93biByZWFzb25zLlwiLFxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIkNhbiBub3QgcGxheSBkdWUgdG8gdW5rbm93biByZWFzb25zLlwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAzMDE6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwMSxcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiRmV0Y2hpbmcgcHJvY2VzcyBhYm9ydGVkIGJ5IHVzZXIuXCIsXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiRmV0Y2hpbmcgcHJvY2VzcyBhYm9ydGVkIGJ5IHVzZXIuXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDMwMjoge1xuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMzAyLFxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJTb21lIG9mIHRoZSBtZWRpYSBjb3VsZCBub3QgYmUgZG93bmxvYWRlZCBkdWUgdG8gYSBuZXR3b3JrIGVycm9yLlwiLFxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIkVycm9yIG9jY3VycmVkIHdoZW4gZG93bmxvYWRpbmcuXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDMwMzoge1xuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMzAzLFxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJVbmFibGUgdG8gbG9hZCBtZWRpYS4gVGhpcyBtYXkgYmUgZHVlIHRvIGEgc2VydmVyIG9yIG5ldHdvcmsgZXJyb3IsIG9yIGR1ZSB0byBhbiB1bnN1cHBvcnRlZCBmb3JtYXQuXCIsXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiRXJyb3Igb2NjdXJyZWQgd2hlbiBkZWNvZGluZy5cIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgMzA0OiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDQsXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIk1lZGlhIHBsYXliYWNrIGhhcyBiZWVuIGNhbmNlbGVkLiBJdCBsb29rcyBsaWtlIHlvdXIgbWVkaWEgaXMgY29ycnVwdGVkIG9yIHlvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHRoZSBmZWF0dXJlcyB5b3VyIG1lZGlhIHVzZXMuXCIsXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiTWVkaWEgcGxheWJhY2sgbm90IHN1cHBvcnRlZC5cIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgMzA1OiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDUsXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNhbiBub3QgbG9hZCBjYXB0aW9ucyBkdWUgdG8gdW5rbm93biByZWFzb25zLlwiLFxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIkNhbiBub3QgbG9hZCBjYXB0aW9ucyBkdWUgdG8gdW5rbm93biByZWFzb25zLlwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAzMDY6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwNixcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiVW5hYmxlIHRvIGxvYWQgbWVkaWEuIFRoaXMgbWF5IGJlIGR1ZSB0byBhIHNlcnZlciBvciBuZXR3b3JrIGVycm9yLCBvciBkdWUgdG8gYW4gdW5zdXBwb3J0ZWQgZm9ybWF0LlwiLFxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIlRoZSBzZXJ2ZXIgY2Fubm90IG9yIHdpbGwgbm90IHByb2Nlc3MgdGhlIHJlcXVlc3QuXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDMwNzoge1xuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMzA3LFxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJVbmFibGUgdG8gbG9hZCBtZWRpYS4gVGhpcyBtYXkgYmUgZHVlIHRvIGEgc2VydmVyIG9yIG5ldHdvcmsgZXJyb3IsIG9yIGR1ZSB0byBhbiB1bnN1cHBvcnRlZCBmb3JtYXQuXCIsXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiVGhlIHNlcnZlciByZWZ1c2VkIHRoZSByZXF1ZXN0LlwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAzMDg6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwOCxcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiVW5hYmxlIHRvIGxvYWQgbWVkaWEuIFRoaXMgbWF5IGJlIGR1ZSB0byBhIHNlcnZlciBvciBuZXR3b3JrIGVycm9yLCBvciBkdWUgdG8gYW4gdW5zdXBwb3J0ZWQgZm9ybWF0LlwiLFxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIlRoZSBzZXJ2ZXIgZG8gbm90IGFjY2VwdCB0aGUgcmVxdWVzdC5cIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgNTAxOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiA1MDEsXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNvbm5lY3Rpb24gd2l0aCBsb3ctbGF0ZW5jeShPTUUpIHNlcnZlciBmYWlsZWQuXCIsXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiV2ViU29ja2V0IGNvbm5lY3Rpb24gZmFpbGVkLlwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICA1MDI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDUwMixcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiQ29ubmVjdGlvbiB3aXRoIGxvdy1sYXRlbmN5KE9NRSkgc2VydmVyIGZhaWxlZC5cIixcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJXZWJSVEMgYWRkSWNlQ2FuZGlkYXRlIGZhaWxlZC5cIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgNTAzOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiA1MDMsXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNvbm5lY3Rpb24gd2l0aCBsb3ctbGF0ZW5jeShPTUUpIHNlcnZlciBmYWlsZWQuXCIsXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiV2ViUlRDIHNldFJlbW90ZURlc2NyaXB0aW9uIGZhaWxlZC5cIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgNTA0OiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiA1MDQsXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkNvbm5lY3Rpb24gd2l0aCBsb3ctbGF0ZW5jeShPTUUpIHNlcnZlciBmYWlsZWQuXCIsXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiV2ViUlRDIHBlZXIgY3JlYXRlT2ZmZXIgZmFpbGVkLlwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICA1MDU6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDUwNSxcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiQ29ubmVjdGlvbiB3aXRoIGxvdy1sYXRlbmN5KE9NRSkgc2VydmVyIGZhaWxlZC5cIixcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJXZWJSVEMgc2V0TG9jYWxEZXNjcmlwdGlvbiBmYWlsZWQuXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDUxMDoge1xuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogNTEwLFxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJOZXR3b3JrIGNvbm5lY3Rpb24gaXMgdW5zdGFibGUuIENoZWNrIHRoZSBuZXR3b3JrIGNvbm5lY3Rpb24uXCIsXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiTmV0d29yayBpcyBzbG93LlwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICA1MTE6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDUxMSxcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiQ29ubmVjdGlvbiB3aXRoIGxvdy1sYXRlbmN5KE9NRSkgdGVybWluYXRlZCB1bmV4cGVjdGVkbHkuXCIsXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiVW5leHBlY3RlZCBlbmQgb2YgY29ubmVjdGlvbi5cIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgICBcImxhbmdcIiA6IFwia29cIixcbiAgICAgICAgXCJ1aVwiIDoge1xuICAgICAgICAgICAgXCJjb250ZXh0XCIgOiBcIuyYpOu4kO2UjOugiOydtOyWtOyXkCDqtIDtlZjsl6xcIixcbiAgICAgICAgICAgIFwiY29udHJvbHNcIiA6IHtcbiAgICAgICAgICAgICAgICBcImxpdmVcIiA6IFwi65287J2067iMXCIsXG4gICAgICAgICAgICAgICAgXCJsb3dfbGF0ZW5jeV9saXZlXCIgOiBcIuy0iOyggOyngOyXsCDrnbzsnbTruIxcIixcbiAgICAgICAgICAgICAgICBcImxvd19sYXRlbmN5X3AycFwiIDogXCLstIjsoIDsp4Dsl7AgUDJQXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJwbGF5bGlzdFwiIDogXCLtlIzroIjsnbTrpqzsiqTtirhcIixcbiAgICAgICAgICAgIFwic2V0dGluZ1wiIDoge1xuICAgICAgICAgICAgICAgIFwidGl0bGVcIiA6IFwi7ISk7KCVXCIsXG4gICAgICAgICAgICAgICAgXCJzcGVlZFwiIDogXCLsnqzsg50g7IaN64+EXCIsXG4gICAgICAgICAgICAgICAgXCJzb3VyY2VcIiA6IFwi7IaM7IqkXCIsXG4gICAgICAgICAgICAgICAgXCJxdWFsaXR5XCIgOiBcIu2SiOyniFwiLFxuICAgICAgICAgICAgICAgIFwiY2FwdGlvblwiIDogXCLsnpDrp4lcIixcbiAgICAgICAgICAgICAgICBcImRpc3BsYXlcIiA6IFwi7ZGc7IucXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJhcGlcIiA6IHtcbiAgICAgICAgICAgIFwibWVzc2FnZVwiIDoge1xuICAgICAgICAgICAgICAgIFwibXV0ZWRfcGxheVwiIDogXCLriIzrn6zshJwg7IaM66asIOy8nOq4sFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJlcnJvclwiOiB7XG4gICAgICAgICAgICAgICAgMTAwOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAxMDAsXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIuyVjCDsiJgg7JeG64qUIOydtOycoOuhnCDroZzrk5wg7ZWgIOyImCDsl4bsirXri4jri6QuXCIsXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwi7JWMIOyImCDsl4bripQg7J207Jyg66GcIOuhnOuTnCDtlaAg7IiYIOyXhuyKteuLiOuLpC5cIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgMTAxOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAxMDEsXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIuyngOybkOuQmOyngCDslYrripQg66+465SU7Ja066GcIOyduO2VtCDroZzrk5wg7ZWgIOyImCDsl4bsirXri4jri6QuXCIsXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiQ2FuIG5vdCBsb2FkIGR1ZSB0byB1bnN1cHBvcnRlZCBtZWRpYS5cIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgMTAyOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAxMDIsXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIu2UjOugiOyLnCDroZzrk5zqsIAg7KSR64uoIOuQmOyXiOyKteuLiOuLpC4gPC9icj48YSBocmVmPSdodHRwOi8vd3d3LmFkb2JlLmNvbS9nby9nZXRmbGFzaHBsYXllcicgdGFyZ2V0PSdfc2VsZic+PGltZyBzcmM9J2h0dHA6Ly93d3cuYWRvYmUuY29tL2ltYWdlcy9zaGFyZWQvZG93bmxvYWRfYnV0dG9ucy9nZXRfZmxhc2hfcGxheWVyLmdpZicgYWx0PSdHZXQgQWRvYmUgRmxhc2ggcGxheWVyJz48L2E+XCIsXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiSXQgbG9va3MgbGlrZSBub3QgZm91bmQgc3dmIG9yIHlvdXIgZW52aXJvbm1lbnQgaXMgbG9jYWxob3N0LlwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAxMDM6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDEwMyxcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwiRGFzaEpT66GcIOyduO2VtCDroZzrk5wg7ZWgIOyImCDsl4bsirXri4jri6QuIGRhc2hqcyDrsoTsoITsnYQg7ZmV7J247ZW07KO87IS47JqULlwiLFxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcImRhc2guanMgdmVyc2lvbiBpcyBvbGQuIFBsZWFzZSBjaGVjayB0aGUgbGFzdGVzdC5cIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgMTA0OiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAxMDQsXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkdvb2dsZSBJTUEg65287J2067iM65+s66as6rCAIOyXhuyWtCDroZzrk5wg7ZWgIOyImCDsl4bsirXri4jri6QuXCIsXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiUGxlYXNlIGNoZWNrIHRoZSBnb29nbGUgaW1hIGxpYnJhcnkuXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDEwNToge1xuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMTA1LFxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJEYXNoSlMg65287J2067iM65+s66as6rCAIOyXhuyWtCDroZzrk5wg7ZWgIOyImCDsl4bsirXri4jri6QuXCIsXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiTm90IGZvdW5kIGRhc2hqcy5cIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgMTA2OiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAxMDYsXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIkhMU0pTIOudvOydtOu4jOufrOumrOqwgCDsl4bslrQg66Gc65OcIO2VoCDsiJgg7JeG7Iq164uI64ukLlwiLFxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIk5vdCBmb3VuZCBobHNqcy5cIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgMzAwOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDAsXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIuyVjCDsiJgg7JeG64qUIOydtOycoOuhnCDsnqzsg53tlaAg7IiYIOyXhuyKteuLiOuLpC5cIixcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJDYW4gbm90IHBsYXkgZHVlIHRvIHVua25vd24gcmVhc29ucy5cIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgMzAxOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDEsXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIuyCrOyaqeyekOyXkCDsnZjtlZwg7ZSE66Gc7IS47IqkIOykkeuLqC5cIixcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJGZXRjaGluZyBwcm9jZXNzIGFib3J0ZWQgYnkgdXNlci5cIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgMzAyOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiAzMDIsXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIuuEpO2KuOybjO2BrCDsmKTrpZjroZwg7J247ZW0IOydvOu2gCDrr7jrlJTslrTrpbwg64uk7Jq066Gc65OcIO2VoCDsiJgg7JeG7Iq164uI64ukLlwiLFxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIkVycm9yIG9jY3VycmVkIHdoZW4gZG93bmxvYWRpbmcuXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDMwMzoge1xuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMzAzLFxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCLrr7jrlJTslrTrpbwg66Gc65OcIO2VoCDsiJgg7JeG7Iq164uI64ukLiDshJzrsoQg65iQ64qUIOuEpO2KuOybjO2BrCDsmKTrpZgg65iQ64qUIOyngOybkOuQmOyngCDslYrripQg7ZiV7Iud7Jy866GcIOyduO2VtCDrsJzsg53tlaAg7IiYIOyeiOyKteuLiOuLpC5cIixcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJFcnJvciBvY2N1cnJlZCB3aGVuIGRlY29kaW5nLlwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAzMDQ6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwNCxcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi66+465SU7Ja0IOyerOyDneydtCDst6jshozrkJjsl4jsirXri4jri6QuIOuvuOuUlOyWtOqwgCDshpDsg4HrkJjsl4jqsbDrgpgg67iM65287Jqw7KCA6rCAIOuvuOuUlOyWtOyXkOyEnCDsgqzsmqntlZjripQg6riw64ql7J2EIOyngOybkO2VmOyngCDslYrripQg6rKDIOqwmeyKteuLiOuLpC5cIixcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJNZWRpYSBwbGF5YmFjayBub3Qgc3VwcG9ydGVkLlwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAzMDU6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwNSxcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi7JWMIOyImCDsl4bripQg7J207Jyg66GcIOyekOunieydhCDroZzrk5wg7ZWgIOyImCDsl4bsirXri4jri6QuXCIsXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiQ2FuIG5vdCBsb2FkIGNhcHRpb25zIGR1ZSB0byB1bmtub3duIHJlYXNvbnMuXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDMwNjoge1xuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogMzA2LFxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCLrr7jrlJTslrTrpbwg66Gc65OcIO2VoCDsiJgg7JeG7Iq164uI64ukLiDshJzrsoQg65iQ64qUIOuEpO2KuOybjO2BrCDsmKTrpZgg65iQ64qUIOyngOybkOuQmOyngCDslYrripQg7ZiV7Iud7Jy866GcIOyduO2VtCDrsJzsg53tlaAg7IiYIOyeiOyKteuLiOuLpC5cIixcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJUaGUgc2VydmVyIGNhbm5vdCBvciB3aWxsIG5vdCBwcm9jZXNzIHRoZSByZXF1ZXN0LlwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAzMDc6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwNyxcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi66+465SU7Ja066W8IOuhnOuTnCDtlaAg7IiYIOyXhuyKteuLiOuLpC4g7ISc67KEIOuYkOuKlCDrhKTtirjsm4ztgawg7Jik66WYIOuYkOuKlCDsp4Dsm5DrkJjsp4Ag7JWK64qUIO2YleyLneycvOuhnCDsnbjtlbQg67Cc7IOd7ZWgIOyImCDsnojsirXri4jri6QuXCIsXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiVGhlIHNlcnZlciByZWZ1c2VkIHRoZSByZXF1ZXN0LlwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAzMDg6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDMwOCxcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi66+465SU7Ja066W8IOuhnOuTnCDtlaAg7IiYIOyXhuyKteuLiOuLpC4g7ISc67KEIOuYkOuKlCDrhKTtirjsm4ztgawg7Jik66WYIOuYkOuKlCDsp4Dsm5DrkJjsp4Ag7JWK64qUIO2YleyLneycvOuhnCDsnbjtlbQg67Cc7IOd7ZWgIOyImCDsnojsirXri4jri6QuXCIsXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiVGhlIHNlcnZlciBkbyBub3QgYWNjZXB0IHRoZSByZXF1ZXN0LlwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICA1MDE6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2RlXCI6IDUwMSxcbiAgICAgICAgICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwi7Ju57IaM7LyTIOyXsOqysCDsi6TtjKhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJXZWJTb2NrZXQgY29ubmVjdGlvbiBmYWlsZWQuXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDUwMjoge1xuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogNTAyLFxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCLsoIDsp4Dsl7AoT01FKSDshJzrsoTsmYAg7Jew6rKw7JeQIOyLpO2MqO2WiOyKteuLiOuLpC5cIixcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJXZWJSVEMgYWRkSWNlQ2FuZGlkYXRlIGZhaWxlZC5cIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgNTAzOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiY29kZVwiOiA1MDMsXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZVwiOiBcIuyggOyngOyXsChPTUUpIOyEnOuyhOyZgCDsl7DqsrDsl5Ag7Iuk7Yyo7ZaI7Iq164uI64ukLlwiLFxuICAgICAgICAgICAgICAgICAgICBcInJlYXNvblwiOiBcIldlYlJUQyBzZXRSZW1vdGVEZXNjcmlwdGlvbiBmYWlsZWQuXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDUwNDoge1xuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogNTA0LFxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCLsoIDsp4Dsl7AoT01FKSDshJzrsoTsmYAg7Jew6rKw7JeQIOyLpO2MqO2WiOyKteuLiOuLpC5cIixcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJXZWJSVEMgcGVlciBjcmVhdGVPZmZlciBmYWlsZWQuXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDUwNToge1xuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogNTA1LFxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCLsoIDsp4Dsl7AoT01FKSDshJzrsoTsmYAg7Jew6rKw7JeQIOyLpO2MqO2WiOyKteuLiOuLpC5cIixcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFzb25cIjogXCJXZWJSVEMgc2V0TG9jYWxEZXNjcmlwdGlvbiBmYWlsZWQuXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDUxMDoge1xuICAgICAgICAgICAgICAgICAgICBcImNvZGVcIjogNTEwLFxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCLrhKTtirjsm4ztgawg7Jew6rKw7J20IOu2iOyViOygle2VqeuLiOuLpC4g64Sk7Yq47JuM7YGsIOyXsOqysOydhCDtmZXsnbjtlZjsi63si5zsmKQuXCIsXG4gICAgICAgICAgICAgICAgICAgIFwicmVhc29uXCI6IFwiTmV0d29yayBpcyBzbG93LlwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXTsiLCIvKipcbiAqIEBicmllZiAgIOuvuOuUlOyWtCDsl5jrpqzrqLztirjrpbwg6rSA66as7ZWY64qUIOqwneyytC4g7ZiE7J6s64qUIO2VmOuKlCDsnbzsnbQg66eO7KeAIOyViuuLpC5cbiAqIEBwYXJhbSAgIHtlbGVtZW50fSAgIGNvbnRhaW5lciAgIGRvbSBlbGVtZW50XG4gKlxuICogKi9cbmltcG9ydCB7Z2V0QnJvd3Nlcn0gZnJvbSBcInV0aWxzL2Jyb3dzZXJcIjtcbmltcG9ydCB7UFJPVklERVJfREFTSCwgUFJPVklERVJfSExTLCBQUk9WSURFUl9XRUJSVEMsIFBST1ZJREVSX0hUTUw1LCBQUk9WSURFUl9SVE1QfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuaW1wb3J0IExBJCBmcm9tIFwidXRpbHMvbGlrZUEkLmpzXCI7XG5pbXBvcnQge2dldFNjcmlwdFBhdGh9IGZyb20gJ3V0aWxzL3dlYnBhY2snO1xuaW1wb3J0IHt2ZXJzaW9ufSBmcm9tICd2ZXJzaW9uJztcbi8vVG9EbyA6IFJlc3RydWN0dXJpbmdcblxuY29uc3QgTWFuYWdlciA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgYnJvd3NlckluZm8pe1xuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICBjb25zdCBTV0ZQYXRoID0gZ2V0U2NyaXB0UGF0aCgnb3ZlbnBsYXllci5qcycpK1wiT3ZlblBsYXllckZsYXNoLnN3Zj92PVwiK3ZlcnNpb247XG4gICAgbGV0IHJvb3RJZCA9IGNvbnRhaW5lci5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBhcmVudC1pZFwiKTtcbiAgICBsZXQgJGNvbnRhaW5lciA9IExBJChjb250YWluZXIpO1xuICAgIGxldCB2aWRlb0VsZW1lbnQgPSBcIlwiO1xuXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTWVkaWFNYW5hZ2VyIGxvYWRlZC4gYnJvd3NlciA6IFwiLCBicm93c2VySW5mbyApO1xuXG4gICAgY29uc3QgY3JlYXRlSHRtbFZpZGVvID0gZnVuY3Rpb24oaXNMb29wKXtcbiAgICAgICAgdmlkZW9FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbiAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnZGlzYWJsZXJlbW90ZXBsYXliYWNrJywgJycpO1xuICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCd3ZWJraXQtcGxheXNpbmxpbmUnLCAndHJ1ZScpO1xuICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCdwbGF5c2lubGluZScsICd0cnVlJyk7XG4gICAgICAgIGlmKGlzTG9vcCl7XG4gICAgICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCdsb29wJywgJycpO1xuICAgICAgICB9XG4gICAgICAgICRjb250YWluZXIuYXBwZW5kKHZpZGVvRWxlbWVudCk7XG5cbiAgICAgICAgcmV0dXJuIHZpZGVvRWxlbWVudDtcbiAgICB9O1xuICAgIGNvbnN0IGNyZWF0ZUZsYXNoVmlkZW8gPSBmdW5jdGlvbihpc0xvb3AsIGJ1ZmZlclRpbWUsIGJ1ZmZlclRpbWVNYXgpe1xuICAgICAgICBsZXQgbW92aWUsIGZsYXNodmFycywgYWxsb3dzY3JpcHRhY2Nlc3MsIGFsbG93ZnVsbHNjcmVlbiwgcXVhbGl0eSwgbmFtZSwgbWVudSwgcXVhbCwgYmdjb2xvciwgbG9vcCwgd21vZGUgO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJNZWRpYU1hbmFnZXIgRmxhc2ggYnVmZmVyIHNldHRpbmcgOiBcIiwgYnVmZmVyVGltZSwgYnVmZmVyVGltZU1heCk7XG4gICAgICAgIG1vdmllID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcbiAgICAgICAgbW92aWUuc2V0QXR0cmlidXRlKCduYW1lJywgJ21vdmllJyk7XG4gICAgICAgIG1vdmllLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBTV0ZQYXRoKTtcblxuICAgICAgICBmbGFzaHZhcnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xuICAgICAgICBmbGFzaHZhcnMuc2V0QXR0cmlidXRlKCduYW1lJywgJ2ZsYXNodmFycycpO1xuICAgICAgICAvL3BsYXllcklkIGlzIHRvIHVzZSBTV0YgZm9yIEV4dGVybmFsSW50ZXJmYWNlLmNhbGwoKS5cbiAgICAgICAgZmxhc2h2YXJzLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBgcGxheWVySWQ9JHtyb290SWR9JmJ1ZmZlclRpbWU9JHtidWZmZXJUaW1lfSZidWZmZXJNYXhUaW1lPSR7YnVmZmVyVGltZU1heH1gKTtcblxuICAgICAgICBhbGxvd3NjcmlwdGFjY2VzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XG4gICAgICAgIGFsbG93c2NyaXB0YWNjZXNzLnNldEF0dHJpYnV0ZSgnbmFtZScsICdhbGxvd3NjcmlwdGFjY2VzcycpO1xuICAgICAgICBhbGxvd3NjcmlwdGFjY2Vzcy5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ2Fsd2F5cycpO1xuXG4gICAgICAgIGFsbG93ZnVsbHNjcmVlbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XG4gICAgICAgIGFsbG93ZnVsbHNjcmVlbi5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnYWxsb3dmdWxsc2NyZWVuJyk7XG4gICAgICAgIGFsbG93ZnVsbHNjcmVlbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ3RydWUnKTtcblxuICAgICAgICBxdWFsaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcbiAgICAgICAgcXVhbGl0eS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAncXVhbGl0eScpO1xuICAgICAgICBxdWFsaXR5LnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnaGVpZ2h0Jyk7XG5cbiAgICAgICAgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XG4gICAgICAgIG5hbWUuc2V0QXR0cmlidXRlKCduYW1lJywgJ25hbWUnKTtcbiAgICAgICAgbmFtZS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgcm9vdElkK1wiLWZsYXNoXCIpO1xuXG4gICAgICAgIG1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xuICAgICAgICBtZW51LnNldEF0dHJpYnV0ZSgnbmFtZScsICdtZW51Jyk7XG4gICAgICAgIG1lbnUuc2V0QXR0cmlidXRlKCd2YWx1ZScsICdmYWxzZScpO1xuXG4gICAgICAgIHF1YWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xuICAgICAgICBxdWFsLnNldEF0dHJpYnV0ZSgnbmFtZScsICdxdWFsaXR5Jyk7XG4gICAgICAgIHF1YWwuc2V0QXR0cmlidXRlKCd2YWx1ZScsICdoaWdoJyk7XG5cbiAgICAgICAgYmdjb2xvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XG4gICAgICAgIGJnY29sb3Iuc2V0QXR0cmlidXRlKCduYW1lJywgJ2JnY29sb3InKTtcbiAgICAgICAgYmdjb2xvci5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJyMwMDAwMDAnKTtcblxuICAgICAgICB3bW9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XG4gICAgICAgIHdtb2RlLnNldEF0dHJpYnV0ZSgnbmFtZScsICd3bW9kZScpO1xuICAgICAgICB3bW9kZS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ29wYXF1ZScpO1xuXG4gICAgICAgIC8qbGV0IGFsbG93QnV0dG9uID0gYDxhIGhyZWY9XCJodHRwOi8vd3d3LmFkb2JlLmNvbS9nby9nZXRmbGFzaHBsYXllclwiPjxpbWcgc3JjPVwiaHR0cDovL3d3dy5hZG9iZS5jb20vaW1hZ2VzL3NoYXJlZC9kb3dubG9hZF9idXR0b25zL2dldF9mbGFzaF9wbGF5ZXIuZ2lmXCIgYWx0PVwiR2V0IEFkb2JlIEZsYXNoIHBsYXllclwiPjwvYT5gO1xuICAgICAgICBtZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgbWVzc2FnZS5pbm5lckhUTUwgPSBhbGxvd0J1dHRvbjsqL1xuXG4gICAgICAgIGlmKGlzTG9vcCl7XG4gICAgICAgICAgICBsb29wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcbiAgICAgICAgICAgIGxvb3Auc2V0QXR0cmlidXRlKCduYW1lJywgJ2xvb3AnKTtcbiAgICAgICAgICAgIGxvb3Auc2V0QXR0cmlidXRlKCd2YWx1ZScsICd0cnVlJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2aWRlb0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvYmplY3QnKTtcbiAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCByb290SWQrXCItZmxhc2hcIik7XG4gICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCByb290SWQrXCItZmxhc2hcIik7XG4gICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzEwMCUnKTtcbiAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgJzEwMCUnKTtcbiAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnc2NhbGUnLCAnZGVmYXVsdCcpO1xuICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCd3bW9kZScsICdvcGFxdWUnKTtcblxuICAgICAgICBpZihicm93c2VySW5mby5icm93c2VyID09PSBcIk1pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3JlclwiICYmIGJyb3dzZXJJbmZvLmJyb3dzZXJNYWpvclZlcnNpb24gPD0gOSApe1xuICAgICAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnY2xhc3NpZCcsICdjbHNpZDpEMjdDREI2RS1BRTZELTExY2YtOTZCOC00NDQ1NTM1NDAwMDAnKTtcbiAgICAgICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChtb3ZpZSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YScsIFNXRlBhdGgpO1xuICAgICAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgndHlwZScsICdhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmKGlzTG9vcCl7XG4gICAgICAgICAgICB2aWRlb0VsZW1lbnQuYXBwZW5kQ2hpbGQobG9vcCk7XG4gICAgICAgIH1cblxuICAgICAgICB2aWRlb0VsZW1lbnQuYXBwZW5kQ2hpbGQod21vZGUpO1xuICAgICAgICB2aWRlb0VsZW1lbnQuYXBwZW5kQ2hpbGQoYmdjb2xvcik7XG4gICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChxdWFsKTtcbiAgICAgICAgdmlkZW9FbGVtZW50LmFwcGVuZENoaWxkKGFsbG93ZnVsbHNjcmVlbik7XG4gICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChhbGxvd3NjcmlwdGFjY2Vzcyk7XG4gICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChmbGFzaHZhcnMpO1xuICAgICAgICAvL3ZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChtZXNzYWdlKTtcblxuICAgICAgICAkY29udGFpbmVyLmFwcGVuZCh2aWRlb0VsZW1lbnQpO1xuXG4gICAgICAgIHJldHVybiB2aWRlb0VsZW1lbnQ7XG4gICAgfTtcblxuICAgIHRoYXQuY3JlYXRlTWVkaWEgPSAocHJvdmlkZXJOYW1lICwgcGxheWVyQ29uZmlnKSAgPT4ge1xuICAgICAgICBpZiggcHJvdmlkZXJOYW1lID09PSBQUk9WSURFUl9SVE1QICl7XG4gICAgICAgICAgICBpZih2aWRlb0VsZW1lbnQpe1xuICAgICAgICAgICAgICAgIHRoYXQuZW1wdHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVGbGFzaFZpZGVvKHBsYXllckNvbmZpZy5pc0xvb3AoKSwgcGxheWVyQ29uZmlnLmdldFJ0bXBCdWZmZXJUaW1lKCksIHBsYXllckNvbmZpZy5nZXRSdG1wQnVmZmVyVGltZU1heCgpKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBpZih2aWRlb0VsZW1lbnQpe1xuICAgICAgICAgICAgICAgIC8vdGhhdC5lbXB0eSgpO1xuICAgICAgICAgICAgICAgIC8vcmV1c2UgdmlkZW8gZWxlbWVudC5cbiAgICAgICAgICAgICAgICAvL2JlY3Vhc2UgcGxheWxpc3QgaXMgYXV0byBuZXh0IHBsYXlpbmcuXG4gICAgICAgICAgICAgICAgLy9Pbmx5IHNhbWUgdmlkZW8gZWxlbWVudCBkb2VzIG5vdCByZXF1aXJlIFVzZXIgSW50ZXJhY3Rpb24gRXJyb3IuXG4gICAgICAgICAgICAgICAgLy9Ub0RvIDogcmVmYWN0b3JpbmdcbiAgICAgICAgICAgICAgICByZXR1cm4gdmlkZW9FbGVtZW50O1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUh0bWxWaWRlbyhwbGF5ZXJDb25maWcuaXNMb29wKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhhdC5jcmVhdGVBZENvbnRhaW5lciA9ICgpID0+IHtcbiAgICAgICAgbGV0IGFkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGFkQ29udGFpbmVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnb3AtYWRzJyk7XG4gICAgICAgICRjb250YWluZXIuYXBwZW5kKGFkQ29udGFpbmVyKTtcblxuICAgICAgICByZXR1cm4gYWRDb250YWluZXI7XG4gICAgfTtcblxuXG4gICAgdGhhdC5lbXB0eSA9ICgpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJNZWRpYU1hbmFnZXIgcmVtb3ZlRWxlbWVudCgpXCIpO1xuICAgICAgICAkY29udGFpbmVyLnJlbW92ZUNoaWxkKHZpZGVvRWxlbWVudCk7XG4gICAgICAgIHZpZGVvRWxlbWVudCA9IG51bGw7XG4gICAgfTtcblxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xuICAgICAgICAkY29udGFpbmVyLnJlbW92ZUNoaWxkKCk7XG4gICAgICAgICRjb250YWluZXIgPSBudWxsO1xuICAgICAgICB2aWRlb0VsZW1lbnQgPSBudWxsO1xuICAgICAgICByb290SWQgPSBudWxsO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE1hbmFnZXI7XG4iLCJpbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xuaW1wb3J0IHtpc1J0bXAsIGlzV2ViUlRDLCBpc0Rhc2ggfSBmcm9tIFwidXRpbHMvdmFsaWRhdG9yXCI7XG5pbXBvcnQge2V4dHJhY3RFeHRlbnNpb24gLHRyaW19IGZyb20gXCIuLi8uLi91dGlscy9zdHJpbmdzXCI7XG5pbXBvcnQgU3VwcG9ydENoZWNrZXIgZnJvbSBcIi4uL1N1cHBvcnRDaGVja2VyXCI7XG5pbXBvcnQge1BMQVlMSVNUX0NIQU5HRUR9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5cbi8qKlxuICogQGJyaWVmICAgVGhpcyBtYW5hZ2VzIFBsYXlsaXN0IG9yIFNvdXJjZXMuXG4gKiBAcGFyYW1cbiAqXG4gKiAqL1xuY29uc3QgTWFuYWdlciA9IGZ1bmN0aW9uKHByb3ZpZGVyKXtcbiAgICBjb25zdCB0aGF0ID0ge307XG4gICAgbGV0IGN1cnJlbnRQbGF5bGlzdEl0ZW0gPSBbXTtcbiAgICBsZXQgc3BlYyA9IHtcbiAgICAgICAgcGxheWxpc3QgOiBbXSxcbiAgICAgICAgY3VycmVudEluZGV4IDogMFxuICAgIH07XG4gICAgbGV0IHN1cHBvcnRDaGVja2VyID0gU3VwcG9ydENoZWNrZXIoKTtcblxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBsb2FkZWQuXCIpO1xuXG4gICAgY29uc3QgbWFrZVByZXR0eVNvdXJjZSA9IGZ1bmN0aW9uKHNvdXJjZV8pe1xuICAgICAgICBpZiAoIXNvdXJjZV8gfHwgIXNvdXJjZV8uZmlsZSAmJiAhKHNvdXJjZV8uaG9zdCB8fCBzb3VyY2VfLmFwcGxpY2F0aW9uIHx8IHNvdXJjZV8uc3RyZWFtKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNvdXJjZSA9IE9iamVjdC5hc3NpZ24oe30sIHsgJ2RlZmF1bHQnOiBmYWxzZSB9LCBzb3VyY2VfKTtcbiAgICAgICAgc291cmNlLmZpbGUgPSB0cmltKCcnICsgc291cmNlLmZpbGUpO1xuXG4gICAgICAgIGlmKHNvdXJjZS5ob3N0ICYmIHNvdXJjZS5hcHBsaWNhdGlvbiAmJiBzb3VyY2Uuc3RyZWFtKXtcbiAgICAgICAgICAgIHNvdXJjZS5maWxlID0gc291cmNlLmhvc3QgKyBcIi9cIiArIHNvdXJjZS5hcHBsaWNhdGlvbiArIFwiL3N0cmVhbS9cIiArIHNvdXJjZS5zdHJlYW07XG4gICAgICAgICAgICBkZWxldGUgc291cmNlLmhvc3Q7XG4gICAgICAgICAgICBkZWxldGUgc291cmNlLmFwcGxpY2F0aW9uO1xuICAgICAgICAgICAgZGVsZXRlIHNvdXJjZS5zdHJlYW07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtaW1ldHlwZVJlZ0V4ID0gL15bXi9dK1xcLyg/OngtKT8oW14vXSspJC87XG5cbiAgICAgICAgaWYgKG1pbWV0eXBlUmVnRXgudGVzdChzb3VyY2UudHlwZSkpIHtcbiAgICAgICAgICAgIC8vIGlmIHR5cGUgaXMgZ2l2ZW4gYXMgYSBtaW1ldHlwZVxuICAgICAgICAgICAgc291cmNlLm1pbWVUeXBlID0gc291cmNlLnR5cGU7XG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9IHNvdXJjZS50eXBlLnJlcGxhY2UobWltZXR5cGVSZWdFeCwgJyQxJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihpc1J0bXAoc291cmNlLmZpbGUpKXtcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ3J0bXAnO1xuICAgICAgICB9ZWxzZSBpZihpc1dlYlJUQyhzb3VyY2UuZmlsZSkpe1xuICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnd2VicnRjJztcbiAgICAgICAgfWVsc2UgaWYoaXNEYXNoKHNvdXJjZS5maWxlLCBzb3VyY2UudHlwZSkpe1xuICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnZGFzaCc7XG4gICAgICAgIH1lbHNlIGlmICghc291cmNlLnR5cGUpIHtcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gZXh0cmFjdEV4dGVuc2lvbihzb3VyY2UuZmlsZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc291cmNlLmxvd0xhdGVuY3kpIHtcbiAgICAgICAgICAgIHNvdXJjZS5sb3dMYXRlbmN5ID0gc291cmNlLmxvd0xhdGVuY3k7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXNvdXJjZS50eXBlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBub3JtYWxpemUgdHlwZXNcbiAgICAgICAgc3dpdGNoIChzb3VyY2UudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnbTN1OCc6XG4gICAgICAgICAgICBjYXNlICd2bmQuYXBwbGUubXBlZ3VybCc6XG4gICAgICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnaGxzJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ200YSc6XG4gICAgICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnYWFjJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3NtaWwnOlxuICAgICAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ3J0bXAnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgIGlmIChzb3VyY2Vba2V5XSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgc291cmNlW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzb3VyY2U7XG5cbiAgICB9XG5cbiAgICB0aGF0LmluaXRQbGF5bGlzdCA9KHBsYXlsaXN0LCBwbGF5ZXJDb25maWcpID0+e1xuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBzZXRQbGF5bGlzdCgpIFwiLCBwbGF5bGlzdCk7XG4gICAgICAgIGNvbnN0IHByZXR0aWVkUGxheWxpc3QgPSAoXy5pc0FycmF5KHBsYXlsaXN0KSA/IHBsYXlsaXN0IDogW3BsYXlsaXN0XSkubWFwKGZ1bmN0aW9uKGl0ZW0pe1xuICAgICAgICAgICAgaWYoIV8uaXNBcnJheShpdGVtLnRyYWNrcykpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgaXRlbS50cmFja3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgcGxheWxpc3RJdGVtID0gT2JqZWN0LmFzc2lnbih7fSx7XG4gICAgICAgICAgICAgICAgc291cmNlczogW10sXG4gICAgICAgICAgICAgICAgdHJhY2tzOiBbXSxcbiAgICAgICAgICAgICAgICB0aXRsZSA6IFwiXCJcbiAgICAgICAgICAgIH0sIGl0ZW0gKTtcblxuICAgICAgICAgICAgaWYoKHBsYXlsaXN0SXRlbS5zb3VyY2VzID09PSBPYmplY3QocGxheWxpc3RJdGVtLnNvdXJjZXMpKSAmJiAhXy5pc0FycmF5KHBsYXlsaXN0SXRlbS5zb3VyY2VzKSkge1xuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gW21ha2VQcmV0dHlTb3VyY2UocGxheWxpc3RJdGVtLnNvdXJjZXMpXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFfLmlzQXJyYXkocGxheWxpc3RJdGVtLnNvdXJjZXMpIHx8IHBsYXlsaXN0SXRlbS5zb3VyY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gW21ha2VQcmV0dHlTb3VyY2UocGxheWxpc3RJdGVtKV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKCFfLmlzQXJyYXkocGxheWxpc3RJdGVtLnNvdXJjZXMpIHx8IHBsYXlsaXN0SXRlbS5zb3VyY2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmxldmVscykge1xuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IGl0ZW0ubGV2ZWxzO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gW21ha2VQcmV0dHlTb3VyY2UoaXRlbSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcGxheWxpc3RJdGVtLnNvdXJjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgc291cmNlID0gcGxheWxpc3RJdGVtLnNvdXJjZXNbaV07XG4gICAgICAgICAgICAgICAgbGV0IHByZXR0eVNvdXJjZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgaWYgKCFzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGRlZmF1bHRTb3VyY2UgPSBzb3VyY2UuZGVmYXVsdDtcbiAgICAgICAgICAgICAgICBpZiAoZGVmYXVsdFNvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2UuZGVmYXVsdCA9IChkZWZhdWx0U291cmNlLnRvU3RyaW5nKCkgPT09ICd0cnVlJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlLmRlZmF1bHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgc291cmNlIGRvZXNuJ3QgaGF2ZSBhIGxhYmVsLCBudW1iZXIgaXRcbiAgICAgICAgICAgICAgICBpZiAoIXBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldLmxhYmVsID0gcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0udHlwZStcIi1cIitpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcHJldHR5U291cmNlID0gbWFrZVByZXR0eVNvdXJjZShwbGF5bGlzdEl0ZW0uc291cmNlc1tpXSk7XG4gICAgICAgICAgICAgICAgaWYoc3VwcG9ydENoZWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKHByZXR0eVNvdXJjZSkpe1xuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXSA9IHByZXR0eVNvdXJjZTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0gPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBwbGF5bGlzdEl0ZW0uc291cmNlcy5maWx0ZXIoc291cmNlID0+ICEhc291cmNlKTtcblxuICAgICAgICAgICAgaWYoIXBsYXlsaXN0SXRlbS50aXRsZSAmJiAgcGxheWxpc3RJdGVtLnNvdXJjZXNbMF0gJiYgcGxheWxpc3RJdGVtLnNvdXJjZXNbMF0ubGFiZWwpe1xuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS50aXRsZSA9IHBsYXlsaXN0SXRlbS5zb3VyY2VzWzBdLmxhYmVsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBkZWZhdWx0IOqwgCDsl4bsnYTrlYwgd2VicnRj6rCAIOyeiOuLpOuptCB3ZWJydGMgZGVmYXVsdCA6IHRydWXroZwg7J6Q64+ZIOyEpOyglVxuICAgICAgICAgICAgLypsZXQgaGF2ZURlZmF1bHQgPSBfLmZpbmQocGxheWxpc3RJdGVtLnNvdXJjZXMsIGZ1bmN0aW9uKHNvdXJjZSl7cmV0dXJuIHNvdXJjZS5kZWZhdWx0ID09IHRydWU7fSk7XG4gICAgICAgICAgICBsZXQgd2VicnRjU291cmNlID0gW107XG4gICAgICAgICAgICBpZighaGF2ZURlZmF1bHQpe1xuICAgICAgICAgICAgICAgIHdlYnJ0Y1NvdXJjZSA9IF8uZmluZChwbGF5bGlzdEl0ZW0uc291cmNlcywgZnVuY3Rpb24oc291cmNlKXtyZXR1cm4gc291cmNlLnR5cGUgPT0gXCJ3ZWJydGNcIjt9KTtcbiAgICAgICAgICAgICAgICBpZih3ZWJydGNTb3VyY2Upe1xuICAgICAgICAgICAgICAgICAgICB3ZWJydGNTb3VyY2UuZGVmYXVsdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSovXG5cblxuICAgICAgICAgICAgZnVuY3Rpb24gZXh0cmFjdE9ubHlPbmVQcm90b2NvbChzb3VyY2VzKXtcbiAgICAgICAgICAgICAgICBpZighIXNvdXJjZXMpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgaGlnaFByaW9yaXR5VHlwZSA9IHBsYXlsaXN0SXRlbS5zb3VyY2VzWzBdLnR5cGU7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF8uZmlsdGVyKHNvdXJjZXMsIHt0eXBlIDogaGlnaFByaW9yaXR5VHlwZX0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmlzQ3VycmVudFByb3RvY29sT25seSgpKXtcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IGV4dHJhY3RPbmx5T25lUHJvdG9jb2wocGxheWxpc3RJdGVtLnNvdXJjZXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZighXy5pc0FycmF5KHBsYXlsaXN0SXRlbS50cmFja3MpKXtcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0udHJhY2tzID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihfLmlzQXJyYXkocGxheWxpc3RJdGVtLmNhcHRpb25zKSl7XG4gICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnRyYWNrcyA9IHBsYXlsaXN0SXRlbS50cmFja3MuY29uY2F0KHBsYXlsaXN0SXRlbS5jYXB0aW9ucyk7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHBsYXlsaXN0SXRlbS5jYXB0aW9ucztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcGxheWxpc3RJdGVtLnRyYWNrcyA9IHBsYXlsaXN0SXRlbS50cmFja3MubWFwKGZ1bmN0aW9uKHRyYWNrKXtcbiAgICAgICAgICAgICAgICBpZighdHJhY2sgfHwgIXRyYWNrLmZpbGUpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB7XG4gICAgICAgICAgICAgICAgICAgICdraW5kJzogJ2NhcHRpb25zJyxcbiAgICAgICAgICAgICAgICAgICAgJ2RlZmF1bHQnOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sIHRyYWNrKTtcbiAgICAgICAgICAgIH0pLmZpbHRlcih0cmFjayA9PiAhIXRyYWNrKTtcbiAgICAgICAgICAgIHJldHVybiBwbGF5bGlzdEl0ZW07XG4gICAgICAgIH0pLmZpbHRlcihmdW5jdGlvbihpdGVtKXtyZXR1cm4gaXRlbS5zb3VyY2VzICYmIGl0ZW0uc291cmNlcy5sZW5ndGggPiAwO30pfHxbXTtcbiAgICAgICAgc3BlYy5wbGF5bGlzdCA9IHByZXR0aWVkUGxheWxpc3Q7XG4gICAgICAgIHJldHVybiBwcmV0dGllZFBsYXlsaXN0O1xuICAgIH07XG4gICAgdGhhdC5nZXRQbGF5bGlzdCA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIGdldFBsYXlsaXN0KCkgXCIsIHNwZWMucGxheWxpc3QpO1xuICAgICAgICByZXR1cm4gc3BlYy5wbGF5bGlzdDtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Q3VycmVudFBsYXlMaXN0ID0gKCkgPT4ge1xuICAgICAgICBpZihzcGVjLnBsYXlsaXN0W3NwZWMuY3VycmVudEluZGV4XSl7XG4gICAgICAgICAgICByZXR1cm4gc3BlYy5wbGF5bGlzdFtzcGVjLmN1cnJlbnRJbmRleF07XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LmdldEN1cnJlbnRQbGF5bGlzdEluZGV4ID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5jdXJyZW50SW5kZXg7XG4gICAgfTtcbiAgICB0aGF0LnNldEN1cnJlbnRQbGF5bGlzdCA9IChpbmRleCkgPT4ge1xuICAgICAgICBpZihzcGVjLnBsYXlsaXN0W2luZGV4XSl7XG4gICAgICAgICAgICBzcGVjLmN1cnJlbnRJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihQTEFZTElTVF9DSEFOR0VELCBzcGVjLmN1cnJlbnRJbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudEluZGV4O1xuICAgIH07XG4gICAgdGhhdC5nZXRDdXJyZW50U291cmNlcyA9ICgpID0+IHtcbiAgICAgICAgaWYoc3BlYy5wbGF5bGlzdFtzcGVjLmN1cnJlbnRJbmRleF0pe1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIGdldEN1cnJlbnRTb3VyY2VzKCkgXCIsIHNwZWMucGxheWxpc3Rbc3BlYy5jdXJyZW50SW5kZXhdLnNvdXJjZXMpO1xuICAgICAgICAgICAgcmV0dXJuIHNwZWMucGxheWxpc3Rbc3BlYy5jdXJyZW50SW5kZXhdLnNvdXJjZXM7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgIH07XG4gICAgdGhhdC5nZXRDdXJyZW50QWRUYWcgPSAoKSA9PiB7XG4gICAgICAgIGlmKHNwZWMucGxheWxpc3Rbc3BlYy5jdXJyZW50SW5kZXhdKXtcbiAgICAgICAgICAgIHJldHVybiBzcGVjLnBsYXlsaXN0W3NwZWMuY3VycmVudEluZGV4XS5hZFRhZ1VybCB8fCBcIlwiO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCBNYW5hZ2VyO1xuIiwiaW1wb3J0IFN1cHBvcnRDaGVja2VyIGZyb20gXCJhcGkvU3VwcG9ydENoZWNrZXJcIjtcbmltcG9ydCB7QXBpUnRtcEV4cGFuc2lvbn0gZnJvbSAnYXBpL0FwaUV4cGFuc2lvbnMnO1xuaW1wb3J0IHtcbiAgICBQUk9WSURFUl9IVE1MNSwgUFJPVklERVJfV0VCUlRDLCBQUk9WSURFUl9EQVNILCBQUk9WSURFUl9ITFMsIFBST1ZJREVSX1JUTVAsIEVSUk9SUywgSU5JVF9VTlNVUFBPUlRfRVJST1Jcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBUaGlzIG1hbmFnZXMgcHJvdmlkZXIuXG4gKiBAcGFyYW1cbiAqICovXG5jb25zdCBDb250cm9sbGVyID0gZnVuY3Rpb24gKCkge1xuICAgIGxldCBzdXBwb3J0Q2hhY2tlciA9IFN1cHBvcnRDaGVja2VyKCk7XG4gICAgY29uc3QgUHJvdmlkZXJzID0ge307XG5cbiAgICBjb25zdCB0aGF0ID0ge307XG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGxvYWRlZC5cIik7XG5cbiAgICBjb25zdCByZWdpc3RlUHJvdmlkZXIgPSAobmFtZSwgcHJvdmlkZXIpID0+IHtcbiAgICAgICAgaWYgKFByb3ZpZGVyc1tuYW1lXSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBfcmVnaXN0ZXJQcm92aWRlcigpIFwiLCBuYW1lKTtcbiAgICAgICAgUHJvdmlkZXJzW25hbWVdID0gcHJvdmlkZXI7XG4gICAgfTtcblxuICAgIGNvbnN0IFByb3ZpZGVyTG9hZGVyID0ge1xuICAgICAgICBodG1sNTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IdG1sNSddLCBmdW5jdGlvbiAocmVxdWlyZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvSHRtbDUnKS5kZWZhdWx0O1xuICAgICAgICAgICAgICAgICAgICByZWdpc3RlUHJvdmlkZXIoUFJPVklERVJfSFRNTDUsIHByb3ZpZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtuYW1lOiBQUk9WSURFUl9IVE1MNSwgcHJvdmlkZXI6IHByb3ZpZGVyfTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xuICAgICAgICAgICAgICAgIH0sICdvdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1J1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgd2VicnRjOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvaHRtbDUvcHJvdmlkZXJzL1dlYlJUQyddLCBmdW5jdGlvbiAocmVxdWlyZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvV2ViUlRDJykuZGVmYXVsdDtcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFBST1ZJREVSX1dFQlJUQywgcHJvdmlkZXIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge25hbWU6IFBST1ZJREVSX1dFQlJUQywgcHJvdmlkZXI6IHByb3ZpZGVyfTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xuICAgICAgICAgICAgICAgIH0sICdvdmVucGxheWVyLnByb3ZpZGVyLldlYlJUQ1Byb3ZpZGVyJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgZGFzaDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9EYXNoJ10sIGZ1bmN0aW9uIChyZXF1aXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9EYXNoJykuZGVmYXVsdDtcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFBST1ZJREVSX0RBU0gsIHByb3ZpZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtuYW1lOiBQUk9WSURFUl9EQVNILCBwcm92aWRlcjogcHJvdmlkZXJ9O1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XG4gICAgICAgICAgICAgICAgfSwgJ292ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgaGxzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvaHRtbDUvcHJvdmlkZXJzL0hscyddLCBmdW5jdGlvbiAocmVxdWlyZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvSGxzJykuZGVmYXVsdDtcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFBST1ZJREVSX0hMUywgcHJvdmlkZXIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge25hbWU6IFBST1ZJREVSX0hMUywgcHJvdmlkZXI6IHByb3ZpZGVyfTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xuICAgICAgICAgICAgICAgIH0sICdvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgcnRtcDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2ZsYXNoL3Byb3ZpZGVycy9SdG1wJ10sIGZ1bmN0aW9uIChyZXF1aXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2ZsYXNoL3Byb3ZpZGVycy9SdG1wJykuZGVmYXVsdDtcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFBST1ZJREVSX1JUTVAsIHByb3ZpZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtuYW1lOiBQUk9WSURFUl9SVE1QLCBwcm92aWRlcjogcHJvdmlkZXJ9O1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZXR3b3JrIGVycm9yJyk7XG4gICAgICAgICAgICAgICAgfSwgJ292ZW5wbGF5ZXIucHJvdmlkZXIuUnRtcFByb3ZpZGVyJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIHRoYXQubG9hZFByb3ZpZGVycyA9IChwbGF5bGlzdEl0ZW0pID0+IHtcbiAgICAgICAgY29uc3Qgc3VwcG9ydGVkUHJvdmlkZXJOYW1lcyA9IHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVzQnlQbGF5bGlzdChwbGF5bGlzdEl0ZW0pO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgbG9hZFByb3ZpZGVycygpIFwiLCBzdXBwb3J0ZWRQcm92aWRlck5hbWVzKTtcbiAgICAgICAgaWYgKCFzdXBwb3J0ZWRQcm92aWRlck5hbWVzKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRVJST1JTLmNvZGVzW0lOSVRfVU5TVVBQT1JUX0VSUk9SXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoXG4gICAgICAgICAgICAgICAgc3VwcG9ydGVkUHJvdmlkZXJOYW1lcy5maWx0ZXIoZnVuY3Rpb24gKHByb3ZpZGVyTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gISFQcm92aWRlckxvYWRlcltwcm92aWRlck5hbWVdO1xuICAgICAgICAgICAgICAgIH0pLm1hcChmdW5jdGlvbiAocHJvdmlkZXJOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm92aWRlckxvYWRlcltwcm92aWRlck5hbWVdKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICB0aGF0LmZpbmRCeU5hbWUgPSAobmFtZSkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgZmluZEJ5TmFtZSgpIFwiLCBuYW1lKTtcbiAgICAgICAgcmV0dXJuIFByb3ZpZGVyc1tuYW1lXTtcbiAgICB9O1xuXG4gICAgdGhhdC5nZXRQcm92aWRlckJ5U291cmNlID0gKHNvdXJjZSkgPT4ge1xuICAgICAgICBjb25zdCBzdXBwb3J0ZWRQcm92aWRlck5hbWUgPSBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2Uoc291cmNlKTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGdldFByb3ZpZGVyQnlTb3VyY2UoKSBcIiwgc3VwcG9ydGVkUHJvdmlkZXJOYW1lKTtcbiAgICAgICAgcmV0dXJuIHRoYXQuZmluZEJ5TmFtZShzdXBwb3J0ZWRQcm92aWRlck5hbWUpO1xuICAgIH07XG5cbiAgICB0aGF0LmlzU2FtZVByb3ZpZGVyID0gKGN1cnJlbnRTb3VyY2UsIG5ld1NvdXJjZSkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgaXNTYW1lUHJvdmlkZXIoKSBcIiwgc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKGN1cnJlbnRTb3VyY2UpLCBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UobmV3U291cmNlKSk7XG4gICAgICAgIHJldHVybiBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UoY3VycmVudFNvdXJjZSkgPT09IHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShuZXdTb3VyY2UpO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbnRyb2xsZXI7XG4iLCJpbXBvcnQgQVBJIGZyb20gJ2FwaS9BcGknO1xuaW1wb3J0IHtpc1dlYlJUQ30gZnJvbSAndXRpbHMvdmFsaWRhdG9yJztcbmltcG9ydCBfIGZyb20gJ3V0aWxzL3VuZGVyc2NvcmUnO1xuaW1wb3J0IExhJCBmcm9tICd1dGlscy9saWtlQSQnO1xuaW1wb3J0IHtnZXRTY3JpcHRQYXRofSBmcm9tICd1dGlscy93ZWJwYWNrJztcblxuXG5fX3dlYnBhY2tfcHVibGljX3BhdGhfXyA9IGdldFNjcmlwdFBhdGgoJ292ZW5wbGF5ZXIuc2RrLmpzJyk7XG5cbi8qKlxuICogTWFpbiBPdmVuUGxheWVyU0RLIG9iamVjdFxuICovXG5jb25zdCBPdmVuUGxheWVyU0RLID0gd2luZG93Lk92ZW5QbGF5ZXJTREsgPSB7fTtcblxuY29uc3QgcGxheWVyTGlzdCA9IE92ZW5QbGF5ZXJTREsucGxheWVyTGlzdCA9IFtdO1xuXG5leHBvcnQgY29uc3QgY2hlY2tBbmRHZXRDb250YWluZXJFbGVtZW50ID0gZnVuY3Rpb24oY29udGFpbmVyKSB7XG4gICAgaWYgKCFjb250YWluZXIpIHtcblxuICAgICAgICAvLyBUT0RPKHJvY2spOiBTaG91bGQgY2F1c2UgYW4gZXJyb3IuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGxldCBjb250YWluZXJFbGVtZW50ID0gbnVsbDtcblxuICAgIGlmICh0eXBlb2YgY29udGFpbmVyID09PSAnc3RyaW5nJykge1xuXG4gICAgICAgIGNvbnRhaW5lckVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb250YWluZXIpO1xuICAgIH0gZWxzZSBpZiAoY29udGFpbmVyLm5vZGVUeXBlKSB7XG5cbiAgICAgICAgY29udGFpbmVyRWxlbWVudCA9IGNvbnRhaW5lcjtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBUT0RPKHJvY2spOiBTaG91bGQgY2F1c2UgYW4gZXJyb3IuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBjb250YWluZXJFbGVtZW50O1xufVxuXG4vKipcbiAqIENyZWF0ZSBwbGF5ZXIgaW5zdGFuY2UgYW5kIHJldHVybiBpdC5cbiAqXG4gKiBAcGFyYW0gICAgICB7c3RyaW5nIHwgZG9tIGVsZW1lbnR9IGNvbnRhaW5lciAgSWQgb2YgY29udGFpbmVyIGVsZW1lbnQgb3IgY29udGFpbmVyIGVsZW1lbnRcbiAqIEBwYXJhbSAgICAgIHtvYmplY3R9IG9wdGlvbnMgIFRoZSBvcHRpb25zXG4gKi9cbk92ZW5QbGF5ZXJTREsuY3JlYXRlID0gZnVuY3Rpb24oY29udGFpbmVyLCBvcHRpb25zKSB7XG5cbiAgICBsZXQgY29udGFpbmVyRWxlbWVudCA9IGNoZWNrQW5kR2V0Q29udGFpbmVyRWxlbWVudChjb250YWluZXIpO1xuXG4gICAgY29uc3QgcGxheWVySW5zdGFuY2UgPSBBUEkoY29udGFpbmVyRWxlbWVudCk7XG4gICAgcGxheWVySW5zdGFuY2UuaW5pdChvcHRpb25zKTtcblxuICAgIHBsYXllckxpc3QucHVzaChwbGF5ZXJJbnN0YW5jZSk7XG5cbiAgICByZXR1cm4gcGxheWVySW5zdGFuY2U7XG59O1xuXG4vKipcbiAqIEdldHMgdGhlIHBsYXllciBpbnN0YW5jZSBsaXN0LlxuICpcbiAqIEByZXR1cm4gICAgIHthcnJheX0gIFRoZSBwbGF5ZXIgbGlzdC5cbiAqL1xuT3ZlblBsYXllclNESy5nZXRQbGF5ZXJMaXN0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICByZXR1cm4gcGxheWVyTGlzdDtcbn07XG5cbi8qKlxuICogR2V0cyB0aGUgcGxheWVyIGluc3RhbmNlIGJ5IGNvbnRhaW5lciBpZC5cbiAqXG4gKiBAcGFyYW0gICAgICB7c3RyaW5nfSAgY29udGFpbmVySWQgIFRoZSBjb250YWluZXIgaWRlbnRpZmllclxuICogQHJldHVybiAgICAge29iZWplY3QgfCBudWxsfSAgVGhlIHBsYXllciBpbnN0YW5jZS5cbiAqL1xuT3ZlblBsYXllclNESy5nZXRQbGF5ZXJCeUNvbnRhaW5lcklkID0gZnVuY3Rpb24oY29udGFpbmVySWQpIHtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxheWVyTGlzdC5sZW5ndGg7IGkgKyspIHtcblxuICAgICAgICBpZiAocGxheWVyTGlzdFtpXS5nZXRDb250YWluZXJJZCgpID09PSBjb250YWluZXJJZCkge1xuXG4gICAgICAgICAgICByZXR1cm4gcGxheWVyTGlzdFtpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xufTtcblxuLyoqXG4gKiBHZXRzIHRoZSBwbGF5ZXIgaW5zdGFuY2UgYnkgaW5kZXguXG4gKlxuICogQHBhcmFtICAgICAge251bWJlcn0gIGluZGV4ICAgVGhlIGluZGV4XG4gKiBAcmV0dXJuICAgICB7b2JqZWN0IHwgbnVsbH0gIFRoZSBwbGF5ZXIgaW5zdGFuY2UuXG4gKi9cbk92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyQnlJbmRleCA9IGZ1bmN0aW9uKGluZGV4KSB7XG5cbiAgICBjb25zdCBwbGF5ZXJJbnN0YW5jZSA9IHBsYXllckxpc3RbaW5kZXhdO1xuXG4gICAgaWYgKHBsYXllckluc3RhbmNlKSB7XG5cbiAgICAgICAgcmV0dXJuIHBsYXllckluc3RhbmNlO1xuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufTtcblxuLyoqXG4gKiBSZW1vdmUgdGhlIHBsYXllciBpbnN0YW5jZSBieSBwbGF5ZXJJZC5cbiAqXG4gKiBAcGFyYW0gICAgICB7cGxheWVySWR9ICBpZFxuICogQHJldHVybiAgICAge251bGx9XG4gKi9cbk92ZW5QbGF5ZXJTREsucmVtb3ZlUGxheWVyID0gZnVuY3Rpb24ocGxheWVySWQpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBsYXllckxpc3QubGVuZ3RoOyBpICsrKSB7XG5cbiAgICAgICAgaWYgKHBsYXllckxpc3RbaV0uZ2V0Q29udGFpbmVySWQoKSA9PT0gcGxheWVySWQpIHtcblxuICAgICAgICAgICAgcGxheWVyTGlzdC5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn07XG5cbi8qKlxuICogR2VuZXJhdGUgd2VicnRjIHNvdXJjZSBmb3IgcGxheWVyIHNvdXJjZSB0eXBlLlxuICpcbiAqIEBwYXJhbSAgICAgIHtPYmplY3QgfCBBcnJheX0gIHNvdXJjZSAgIHdlYnJ0YyBzb3VyY2VcbiAqIEByZXR1cm4gICAgIHtBcnJheX0gIFBsYXllciBzb3VyY2UgT2JqZWN0LlxuICovXG5PdmVuUGxheWVyU0RLLmdlbmVyYXRlV2VicnRjVXJscyA9IGZ1bmN0aW9uKHNvdXJjZXMpIHtcbiAgICByZXR1cm4gKF8uaXNBcnJheShzb3VyY2VzKSA/IHNvdXJjZXMgOiBbc291cmNlc10pLm1hcChmdW5jdGlvbihzb3VyY2UsIGluZGV4KXtcbiAgICAgICAgaWYoc291cmNlLmhvc3QgJiYgaXNXZWJSVEMoc291cmNlLmhvc3QpICYmIHNvdXJjZS5hcHBsaWNhdGlvbiAmJiBzb3VyY2Uuc3RyZWFtKXtcbiAgICAgICAgICAgIHJldHVybiB7ZmlsZSA6IHNvdXJjZS5ob3N0ICsgXCIvXCIgKyBzb3VyY2UuYXBwbGljYXRpb24gKyBcIi9cIiArIHNvdXJjZS5zdHJlYW0sIHR5cGUgOiBcIndlYnJ0Y1wiLCBsYWJlbCA6IHNvdXJjZS5sYWJlbCA/IHNvdXJjZS5sYWJlbCA6IFwid2VicnRjLVwiKyhpbmRleCsxKSB9O1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFdoZXRoZXIgc2hvdyB0aGUgcGxheWVyIGNvcmUgbG9nIG9yIG5vdC5cbiAqXG4gKiBAcGFyYW0gICAgICB7Ym9vbGVhbn0gIGJvb2xlYW4gICBydW4gZGVidWcgbW9kZSBvciBub3QuXG4gKiBAcmV0dXJuICAgICB7Ym9vbGVhbn0gIHJ1biBkZWJ1ZyBtb2RlIG9yIG5vdC5cbiAqL1xuT3ZlblBsYXllclNESy5kZWJ1ZyA9IGZ1bmN0aW9uKGlzRGVidWdNb2RlKSB7XG4gICAgaWYoaXNEZWJ1Z01vZGUpe1xuICAgICAgICB3aW5kb3cuT3ZlblBsYXllckNvbnNvbGUgPSB7bG9nIDogd2luZG93Wydjb25zb2xlJ11bJ2xvZyddfTtcbiAgICB9ZWxzZXtcbiAgICAgICAgd2luZG93Lk92ZW5QbGF5ZXJDb25zb2xlID0ge2xvZyA6ICBmdW5jdGlvbigpe319O1xuICAgIH1cbiAgICByZXR1cm4gaXNEZWJ1Z01vZGU7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBPdmVuUGxheWVyU0RLO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gOC4gMjQuLlxuICovXG5cbmV4cG9ydCBjb25zdCBnZXRCcm93c2VyTGFuZ3VhZ2UgPSBmdW5jdGlvbigpe1xuICAgIGxldCBuYXYgPSB3aW5kb3cubmF2aWdhdG9yLFxuICAgICAgICBicm93c2VyTGFuZ3VhZ2VQcm9wZXJ0eUtleXMgPSBbJ2xhbmd1YWdlJywgJ2Jyb3dzZXJMYW5ndWFnZScsICdzeXN0ZW1MYW5ndWFnZScsICd1c2VyTGFuZ3VhZ2UnXSxcbiAgICAgICAgaSxcbiAgICAgICAgbGFuZ3VhZ2U7XG5cbiAgICAvLyBzdXBwb3J0IGZvciBIVE1MIDUuMSBcIm5hdmlnYXRvci5sYW5ndWFnZXNcIlxuICAgIGlmIChBcnJheS5pc0FycmF5KG5hdi5sYW5ndWFnZXMpKSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBuYXYubGFuZ3VhZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsYW5ndWFnZSA9IG5hdi5sYW5ndWFnZXNbaV07XG4gICAgICAgICAgICBpZiAobGFuZ3VhZ2UgJiYgbGFuZ3VhZ2UubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxhbmd1YWdlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gc3VwcG9ydCBmb3Igb3RoZXIgd2VsbCBrbm93biBwcm9wZXJ0aWVzIGluIGJyb3dzZXJzXG4gICAgZm9yIChpID0gMDsgaSA8IGJyb3dzZXJMYW5ndWFnZVByb3BlcnR5S2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsYW5ndWFnZSA9IG5hdlticm93c2VyTGFuZ3VhZ2VQcm9wZXJ0eUtleXNbaV1dO1xuICAgICAgICBpZiAobGFuZ3VhZ2UgJiYgbGFuZ3VhZ2UubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gbGFuZ3VhZ2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbn07XG5leHBvcnQgY29uc3QgYW5hbFVzZXJBZ2VudCA9IGZ1bmN0aW9uKCl7XG4gICAgbGV0IHVua25vd24gPSAnLSc7XG5cbiAgICAvLyBzY3JlZW5cbiAgICBsZXQgc2NyZWVuU2l6ZSA9ICcnO1xuICAgIGlmIChzY3JlZW4ud2lkdGgpIHtcbiAgICAgICAgbGV0IHdpZHRoID0gKHNjcmVlbi53aWR0aCkgPyBzY3JlZW4ud2lkdGggOiAnJztcbiAgICAgICAgbGV0IGhlaWdodCA9IChzY3JlZW4uaGVpZ2h0KSA/IHNjcmVlbi5oZWlnaHQgOiAnJztcbiAgICAgICAgc2NyZWVuU2l6ZSArPSAnJyArIHdpZHRoICsgXCIgeCBcIiArIGhlaWdodDtcbiAgICB9XG5cbiAgICAvLyBicm93c2VyXG4gICAgbGV0IG5WZXIgPSBuYXZpZ2F0b3IuYXBwVmVyc2lvbjtcbiAgICBsZXQgbkFndCA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG4gICAgbGV0IGJyb3dzZXIgPSBuYXZpZ2F0b3IuYXBwTmFtZTtcbiAgICBsZXQgdmVyc2lvbiA9ICcnICsgcGFyc2VGbG9hdChuYXZpZ2F0b3IuYXBwVmVyc2lvbik7XG4gICAgbGV0IG1ham9yVmVyc2lvbiA9IHBhcnNlSW50KG5hdmlnYXRvci5hcHBWZXJzaW9uLCAxMCk7XG4gICAgbGV0IGlzV2VidmlldyA9IGZhbHNlO1xuICAgIGxldCBuYW1lT2Zmc2V0LCB2ZXJPZmZzZXQsIGl4O1xuXG4gICAgLy8gT3BlcmFcbiAgICBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignT3BlcmEnKSkgIT0gLTEpIHtcbiAgICAgICAgYnJvd3NlciA9ICdPcGVyYSc7XG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA2KTtcbiAgICAgICAgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ1ZlcnNpb24nKSkgIT0gLTEpIHtcbiAgICAgICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBPcGVyYSBOZXh0XG4gICAgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ09QUicpKSAhPSAtMSkge1xuICAgICAgICBicm93c2VyID0gJ09wZXJhJztcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDQpO1xuICAgIH1cbiAgICAvL+yCvOyEsSDruIzrnbzsmrDsoIBcbiAgICBlbHNlIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdTYW1zdW5nQnJvd3NlcicpKSAhPSAtMSkge1xuICAgICAgICBicm93c2VyID0gJ1NhbXN1bmdCcm93c2VyJztcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDE1KTtcbiAgICB9XG4gICAgLy8gRWRnZVxuICAgIGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ0VkZ2UnKSkgIT0gLTEpIHtcbiAgICAgICAgYnJvd3NlciA9ICdNaWNyb3NvZnQgRWRnZSc7XG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA1KTtcbiAgICB9XG4gICAgLy8gTVNJRVxuICAgIGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ01TSUUnKSkgIT0gLTEpIHtcbiAgICAgICAgYnJvd3NlciA9ICdNaWNyb3NvZnQgSW50ZXJuZXQgRXhwbG9yZXInO1xuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNSk7XG5cblxuICAgICAgICAvL3dpbjcgSUUxMSB1c2VyQWdlbnQgaXMgdWdseS4uLi5cbiAgICAgICAgaWYoIChuQWd0LmluZGV4T2YoJ1RyaWRlbnQvJykgIT09IC0xKSAmJiAobkFndC5pbmRleE9mKCdydjonKSAhPT0gLTEpICApe1xuICAgICAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKG5BZ3QuaW5kZXhPZigncnY6JykgKyAzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBDaHJvbWVcbiAgICBlbHNlIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdDaHJvbWUnKSkgIT0gLTEpIHtcbiAgICAgICAgYnJvd3NlciA9ICdDaHJvbWUnO1xuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ0NyaU9TJykpICE9IC0xKSB7ICAgLy9pcGhvbmUgLSBjaHJvbWVcbiAgICAgICAgYnJvd3NlciA9ICdDaHJvbWUnO1xuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNik7XG4gICAgfVxuICAgIC8vIEZpcmVmb3hcbiAgICBlbHNlIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdGaXJlZm94JykpICE9IC0xKSB7XG4gICAgICAgIGJyb3dzZXIgPSAnRmlyZWZveCc7XG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA4KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignRnhpT1MnKSkgIT0gLTEpIHtcbiAgICAgICAgYnJvd3NlciA9ICdGaXJlZm94JztcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDYpO1xuICAgIH1cbiAgICAvLyBTYWZhcmlcbiAgICBlbHNlIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdTYWZhcmknKSkgIT0gLTEpIHtcbiAgICAgICAgYnJvd3NlciA9ICdTYWZhcmknO1xuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNyk7XG4gICAgICAgIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdWZXJzaW9uJykpICE9IC0xKSB7XG4gICAgICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgOCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vIE1TSUUgMTErXG4gICAgZWxzZSBpZiAobkFndC5pbmRleE9mKCdUcmlkZW50LycpICE9PSAtMSkge1xuICAgICAgICBicm93c2VyID0gJ01pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3Jlcic7XG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyhuQWd0LmluZGV4T2YoJ3J2OicpICsgMyk7XG4gICAgfVxuICAgIC8vIE90aGVyIGJyb3dzZXJzXG4gICAgZWxzZSBpZiAoKG5hbWVPZmZzZXQgPSBuQWd0Lmxhc3RJbmRleE9mKCcgJykgKyAxKSA8ICh2ZXJPZmZzZXQgPSBuQWd0Lmxhc3RJbmRleE9mKCcvJykpKSB7XG4gICAgICAgIGJyb3dzZXIgPSBuQWd0LnN1YnN0cmluZyhuYW1lT2Zmc2V0LCB2ZXJPZmZzZXQpO1xuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgMSk7XG4gICAgICAgIGlmIChicm93c2VyLnRvTG93ZXJDYXNlKCkgPT0gYnJvd3Nlci50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICAgICAgICBicm93c2VyID0gbmF2aWdhdG9yLmFwcE5hbWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYobkFndC5pbmRleE9mKCcgd3YnKSA+IDApe1xuICAgICAgICBpc1dlYnZpZXcgPSB0cnVlO1xuICAgIH1cbiAgICAvLyB0cmltIHRoZSB2ZXJzaW9uIHN0cmluZ1xuICAgIGlmICgoaXggPSB2ZXJzaW9uLmluZGV4T2YoJzsnKSkgIT0gLTEpIHZlcnNpb24gPSB2ZXJzaW9uLnN1YnN0cmluZygwLCBpeCk7XG4gICAgaWYgKChpeCA9IHZlcnNpb24uaW5kZXhPZignICcpKSAhPSAtMSkgdmVyc2lvbiA9IHZlcnNpb24uc3Vic3RyaW5nKDAsIGl4KTtcbiAgICBpZiAoKGl4ID0gdmVyc2lvbi5pbmRleE9mKCcpJykpICE9IC0xKSB2ZXJzaW9uID0gdmVyc2lvbi5zdWJzdHJpbmcoMCwgaXgpO1xuXG4gICAgbWFqb3JWZXJzaW9uID0gcGFyc2VJbnQoJycgKyB2ZXJzaW9uLCAxMCk7XG4gICAgaWYgKGlzTmFOKG1ham9yVmVyc2lvbikpIHtcbiAgICAgICAgdmVyc2lvbiA9ICcnICsgcGFyc2VGbG9hdChuYXZpZ2F0b3IuYXBwVmVyc2lvbik7XG4gICAgICAgIG1ham9yVmVyc2lvbiA9IHBhcnNlSW50KG5hdmlnYXRvci5hcHBWZXJzaW9uLCAxMCk7XG4gICAgfVxuXG4gICAgLy8gbW9iaWxlIHZlcnNpb25cbiAgICB2YXIgbW9iaWxlID0gL01vYmlsZXxtaW5pfEZlbm5lY3xBbmRyb2lkfGlQKGFkfG9kfGhvbmUpLy50ZXN0KG5WZXIpO1xuXG4gICAgLy8gY29va2llXG4gICAgdmFyIGNvb2tpZUVuYWJsZWQgPSAobmF2aWdhdG9yLmNvb2tpZUVuYWJsZWQpID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IuY29va2llRW5hYmxlZCA9PSAndW5kZWZpbmVkJyAmJiAhY29va2llRW5hYmxlZCkge1xuICAgICAgICBkb2N1bWVudC5jb29raWUgPSAndGVzdGNvb2tpZSc7XG4gICAgICAgIGNvb2tpZUVuYWJsZWQgPSAoZG9jdW1lbnQuY29va2llLmluZGV4T2YoJ3Rlc3Rjb29raWUnKSAhPSAtMSkgPyB0cnVlIDogZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gc3lzdGVtXG4gICAgdmFyIG9zID0gdW5rbm93bjtcbiAgICB2YXIgY2xpZW50U3RyaW5ncyA9IFtcbiAgICAgICAge3M6J1dpbmRvd3MgMTAnLCByOi8oV2luZG93cyAxMC4wfFdpbmRvd3MgTlQgMTAuMCkvfSxcbiAgICAgICAge3M6J1dpbmRvd3MgOC4xJywgcjovKFdpbmRvd3MgOC4xfFdpbmRvd3MgTlQgNi4zKS99LFxuICAgICAgICB7czonV2luZG93cyA4JywgcjovKFdpbmRvd3MgOHxXaW5kb3dzIE5UIDYuMikvfSxcbiAgICAgICAge3M6J1dpbmRvd3MgNycsIHI6LyhXaW5kb3dzIDd8V2luZG93cyBOVCA2LjEpL30sXG4gICAgICAgIHtzOidXaW5kb3dzIFZpc3RhJywgcjovV2luZG93cyBOVCA2LjAvfSxcbiAgICAgICAge3M6J1dpbmRvd3MgU2VydmVyIDIwMDMnLCByOi9XaW5kb3dzIE5UIDUuMi99LFxuICAgICAgICB7czonV2luZG93cyBYUCcsIHI6LyhXaW5kb3dzIE5UIDUuMXxXaW5kb3dzIFhQKS99LFxuICAgICAgICB7czonV2luZG93cyAyMDAwJywgcjovKFdpbmRvd3MgTlQgNS4wfFdpbmRvd3MgMjAwMCkvfSxcbiAgICAgICAge3M6J1dpbmRvd3MgTUUnLCByOi8oV2luIDl4IDQuOTB8V2luZG93cyBNRSkvfSxcbiAgICAgICAge3M6J1dpbmRvd3MgOTgnLCByOi8oV2luZG93cyA5OHxXaW45OCkvfSxcbiAgICAgICAge3M6J1dpbmRvd3MgOTUnLCByOi8oV2luZG93cyA5NXxXaW45NXxXaW5kb3dzXzk1KS99LFxuICAgICAgICB7czonV2luZG93cyBOVCA0LjAnLCByOi8oV2luZG93cyBOVCA0LjB8V2luTlQ0LjB8V2luTlR8V2luZG93cyBOVCkvfSxcbiAgICAgICAge3M6J1dpbmRvd3MgQ0UnLCByOi9XaW5kb3dzIENFL30sXG4gICAgICAgIHtzOidXaW5kb3dzIDMuMTEnLCByOi9XaW4xNi99LFxuICAgICAgICB7czonQW5kcm9pZCcsIHI6L0FuZHJvaWQvfSxcbiAgICAgICAge3M6J09wZW4gQlNEJywgcjovT3BlbkJTRC99LFxuICAgICAgICB7czonU3VuIE9TJywgcjovU3VuT1MvfSxcbiAgICAgICAge3M6J0xpbnV4JywgcjovKExpbnV4fFgxMSkvfSxcbiAgICAgICAge3M6J2lPUycsIHI6LyhpUGhvbmV8aVBhZHxpUG9kKS99LFxuICAgICAgICB7czonTWFjIE9TIFgnLCByOi9NYWMgT1MgWC99LFxuICAgICAgICB7czonTWFjIE9TJywgcjovKE1hY1BQQ3xNYWNJbnRlbHxNYWNfUG93ZXJQQ3xNYWNpbnRvc2gpL30sXG4gICAgICAgIHtzOidRTlgnLCByOi9RTlgvfSxcbiAgICAgICAge3M6J1VOSVgnLCByOi9VTklYL30sXG4gICAgICAgIHtzOidCZU9TJywgcjovQmVPUy99LFxuICAgICAgICB7czonT1MvMicsIHI6L09TXFwvMi99LFxuICAgICAgICB7czonU2VhcmNoIEJvdCcsIHI6LyhudWhrfEdvb2dsZWJvdHxZYW1teWJvdHxPcGVuYm90fFNsdXJwfE1TTkJvdHxBc2sgSmVldmVzXFwvVGVvbWF8aWFfYXJjaGl2ZXIpL31cbiAgICBdO1xuICAgIGZvciAodmFyIGlkIGluIGNsaWVudFN0cmluZ3MpIHtcbiAgICAgICAgdmFyIGNzID0gY2xpZW50U3RyaW5nc1tpZF07XG4gICAgICAgIGlmIChjcy5yLnRlc3QobkFndCkpIHtcbiAgICAgICAgICAgIG9zID0gY3MucztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIG9zVmVyc2lvbiA9IHVua25vd247XG5cbiAgICBpZiAoL1dpbmRvd3MvLnRlc3Qob3MpKSB7XG4gICAgICAgIG9zVmVyc2lvbiA9IC9XaW5kb3dzICguKikvLmV4ZWMob3MpWzFdO1xuICAgICAgICBvcyA9ICdXaW5kb3dzJztcbiAgICB9XG5cbiAgICBzd2l0Y2ggKG9zKSB7XG4gICAgICAgIGNhc2UgJ01hYyBPUyBYJzpcbiAgICAgICAgICAgIG9zVmVyc2lvbiA9IC9NYWMgT1MgWCAoMTBbXFwuXFxfXFxkXSspLy5leGVjKG5BZ3QpWzFdO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnQW5kcm9pZCc6XG4gICAgICAgICAgICBvc1ZlcnNpb24gPSAvQW5kcm9pZCAoW1xcLlxcX1xcZF0rKS8uZXhlYyhuQWd0KVsxXTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ2lPUyc6XG4gICAgICAgICAgICBvc1ZlcnNpb24gPSAvT1MgKFxcZCspXyhcXGQrKV8/KFxcZCspPy8uZXhlYyhuVmVyKTtcbiAgICAgICAgICAgIG9zVmVyc2lvbiA9IG9zVmVyc2lvblsxXSArICcuJyArIG9zVmVyc2lvblsyXSArICcuJyArIChvc1ZlcnNpb25bM10gfCAwKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHNjcmVlbjogc2NyZWVuU2l6ZSxcbiAgICAgICAgYnJvd3NlcjogYnJvd3NlcixcbiAgICAgICAgYnJvd3NlclZlcnNpb246IHZlcnNpb24sXG4gICAgICAgIGJyb3dzZXJNYWpvclZlcnNpb246IG1ham9yVmVyc2lvbixcbiAgICAgICAgbW9iaWxlOiBtb2JpbGUsXG4gICAgICAgIHVhIDogbkFndCxcbiAgICAgICAgb3M6IG9zLFxuICAgICAgICBvc1ZlcnNpb246IG9zVmVyc2lvbixcbiAgICAgICAgY29va2llczogY29va2llRW5hYmxlZFxuICAgIH07XG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMyB2dHQuanMgQ29udHJpYnV0b3JzXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xubGV0IFZUVEN1ZSA9IHdpbmRvdy5WVFRDdWU7XG5cbnZhciBhdXRvS2V5d29yZCA9IFwiYXV0b1wiO1xudmFyIGRpcmVjdGlvblNldHRpbmcgPSB7XG4gICAgXCJcIjogdHJ1ZSxcbiAgICBcImxyXCI6IHRydWUsXG4gICAgXCJybFwiOiB0cnVlXG59O1xudmFyIGFsaWduU2V0dGluZyA9IHtcbiAgICBcInN0YXJ0XCI6IHRydWUsXG4gICAgXCJtaWRkbGVcIjogdHJ1ZSxcbiAgICBcImVuZFwiOiB0cnVlLFxuICAgIFwibGVmdFwiOiB0cnVlLFxuICAgIFwicmlnaHRcIjogdHJ1ZVxufTtcblxuZnVuY3Rpb24gZmluZERpcmVjdGlvblNldHRpbmcodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIGRpciA9IGRpcmVjdGlvblNldHRpbmdbdmFsdWUudG9Mb3dlckNhc2UoKV07XG4gICAgcmV0dXJuIGRpciA/IHZhbHVlLnRvTG93ZXJDYXNlKCkgOiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZmluZEFsaWduU2V0dGluZyh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgYWxpZ24gPSBhbGlnblNldHRpbmdbdmFsdWUudG9Mb3dlckNhc2UoKV07XG4gICAgcmV0dXJuIGFsaWduID8gdmFsdWUudG9Mb3dlckNhc2UoKSA6IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBleHRlbmQob2JqKSB7XG4gICAgdmFyIGkgPSAxO1xuICAgIGZvciAoOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjb2JqID0gYXJndW1lbnRzW2ldO1xuICAgICAgICBmb3IgKHZhciBwIGluIGNvYmopIHtcbiAgICAgICAgICAgIG9ialtwXSA9IGNvYmpbcF07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xufVxuaWYoIVZUVEN1ZSl7XG4gICAgVlRUQ3VlID0gZnVuY3Rpb24gKHN0YXJ0VGltZSwgZW5kVGltZSwgdGV4dCkge1xuICAgICAgICB2YXIgY3VlID0gdGhpcztcbiAgICAgICAgdmFyIGlzSUU4ID0gKC9NU0lFXFxzOFxcLjAvKS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgICAgICB2YXIgYmFzZU9iaiA9IHt9O1xuXG4gICAgICAgIGlmIChpc0lFOCkge1xuICAgICAgICAgICAgY3VlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY3VzdG9tJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBiYXNlT2JqLmVudW1lcmFibGUgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNoaW0gaW1wbGVtZW50YXRpb24gc3BlY2lmaWMgcHJvcGVydGllcy4gVGhlc2UgcHJvcGVydGllcyBhcmUgbm90IGluXG4gICAgICAgICAqIHRoZSBzcGVjLlxuICAgICAgICAgKi9cblxuICAgICAgICAgICAgLy8gTGV0cyB1cyBrbm93IHdoZW4gdGhlIFZUVEN1ZSdzIGRhdGEgaGFzIGNoYW5nZWQgaW4gc3VjaCBhIHdheSB0aGF0IHdlIG5lZWRcbiAgICAgICAgICAgIC8vIHRvIHJlY29tcHV0ZSBpdHMgZGlzcGxheSBzdGF0ZS4gVGhpcyBsZXRzIHVzIGNvbXB1dGUgaXRzIGRpc3BsYXkgc3RhdGVcbiAgICAgICAgICAgIC8vIGxhemlseS5cbiAgICAgICAgY3VlLmhhc0JlZW5SZXNldCA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBWVFRDdWUgYW5kIFRleHRUcmFja0N1ZSBwcm9wZXJ0aWVzXG4gICAgICAgICAqIGh0dHA6Ly9kZXYudzMub3JnL2h0bWw1L3dlYnZ0dC8jdnR0Y3VlLWludGVyZmFjZVxuICAgICAgICAgKi9cblxuICAgICAgICB2YXIgX2lkID0gXCJcIjtcbiAgICAgICAgdmFyIF9wYXVzZU9uRXhpdCA9IGZhbHNlO1xuICAgICAgICB2YXIgX3N0YXJ0VGltZSA9IHN0YXJ0VGltZTtcbiAgICAgICAgdmFyIF9lbmRUaW1lID0gZW5kVGltZTtcbiAgICAgICAgdmFyIF90ZXh0ID0gdGV4dDtcbiAgICAgICAgdmFyIF9yZWdpb24gPSBudWxsO1xuICAgICAgICB2YXIgX3ZlcnRpY2FsID0gXCJcIjtcbiAgICAgICAgdmFyIF9zbmFwVG9MaW5lcyA9IHRydWU7XG4gICAgICAgIHZhciBfbGluZSA9IFwiYXV0b1wiO1xuICAgICAgICB2YXIgX2xpbmVBbGlnbiA9IFwic3RhcnRcIjtcbiAgICAgICAgdmFyIF9wb3NpdGlvbiA9IDUwO1xuICAgICAgICB2YXIgX3Bvc2l0aW9uQWxpZ24gPSBcIm1pZGRsZVwiO1xuICAgICAgICB2YXIgX3NpemUgPSA1MDtcbiAgICAgICAgdmFyIF9hbGlnbiA9IFwibWlkZGxlXCI7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcbiAgICAgICAgICAgIFwiaWRcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9pZDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgX2lkID0gXCJcIiArIHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxuICAgICAgICAgICAgXCJwYXVzZU9uRXhpdFwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3BhdXNlT25FeGl0O1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBfcGF1c2VPbkV4aXQgPSAhIXZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxuICAgICAgICAgICAgXCJzdGFydFRpbWVcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9zdGFydFRpbWU7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdGFydCB0aW1lIG11c3QgYmUgc2V0IHRvIGEgbnVtYmVyLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfc3RhcnRUaW1lID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcbiAgICAgICAgICAgIFwiZW5kVGltZVwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2VuZFRpbWU7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJFbmQgdGltZSBtdXN0IGJlIHNldCB0byBhIG51bWJlci5cIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgX2VuZFRpbWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxuICAgICAgICAgICAgXCJ0ZXh0XCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGV4dDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RleHQgPSBcIlwiICsgdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcbiAgICAgICAgICAgIFwicmVnaW9uXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVnaW9uO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBfcmVnaW9uID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcbiAgICAgICAgICAgIFwidmVydGljYWxcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92ZXJ0aWNhbDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNldHRpbmcgPSBmaW5kRGlyZWN0aW9uU2V0dGluZyh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIEhhdmUgdG8gY2hlY2sgZm9yIGZhbHNlIGJlY2F1c2UgdGhlIHNldHRpbmcgYW4gYmUgYW4gZW1wdHkgc3RyaW5nLlxuICAgICAgICAgICAgICAgICAgICBpZiAoc2V0dGluZyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihcIkFuIGludmFsaWQgb3IgaWxsZWdhbCBzdHJpbmcgd2FzIHNwZWNpZmllZC5cIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgX3ZlcnRpY2FsID0gc2V0dGluZztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxuICAgICAgICAgICAgXCJzbmFwVG9MaW5lc1wiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3NuYXBUb0xpbmVzO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBfc25hcFRvTGluZXMgPSAhIXZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXG4gICAgICAgICAgICBcImxpbmVcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9saW5lO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm51bWJlclwiICYmIHZhbHVlICE9PSBhdXRvS2V5d29yZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKFwiQW4gaW52YWxpZCBudW1iZXIgb3IgaWxsZWdhbCBzdHJpbmcgd2FzIHNwZWNpZmllZC5cIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgX2xpbmUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxuICAgICAgICAgICAgXCJsaW5lQWxpZ25cIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9saW5lQWxpZ247XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzZXR0aW5nID0gZmluZEFsaWduU2V0dGluZyh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghc2V0dGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKFwiQW4gaW52YWxpZCBvciBpbGxlZ2FsIHN0cmluZyB3YXMgc3BlY2lmaWVkLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfbGluZUFsaWduID0gc2V0dGluZztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxuICAgICAgICAgICAgXCJwb3NpdGlvblwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3Bvc2l0aW9uO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPCAwIHx8IHZhbHVlID4gMTAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQb3NpdGlvbiBtdXN0IGJlIGJldHdlZW4gMCBhbmQgMTAwLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfcG9zaXRpb24gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxuICAgICAgICAgICAgXCJwb3NpdGlvbkFsaWduXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcG9zaXRpb25BbGlnbjtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNldHRpbmcgPSBmaW5kQWxpZ25TZXR0aW5nKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzZXR0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJBbiBpbnZhbGlkIG9yIGlsbGVnYWwgc3RyaW5nIHdhcyBzcGVjaWZpZWQuXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF9wb3NpdGlvbkFsaWduID0gc2V0dGluZztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxuICAgICAgICAgICAgXCJzaXplXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfc2l6ZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlIDwgMCB8fCB2YWx1ZSA+IDEwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2l6ZSBtdXN0IGJlIGJldHdlZW4gMCBhbmQgMTAwLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfc2l6ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXG4gICAgICAgICAgICBcImFsaWduXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfYWxpZ247XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzZXR0aW5nID0gZmluZEFsaWduU2V0dGluZyh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghc2V0dGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKFwiQW4gaW52YWxpZCBvciBpbGxlZ2FsIHN0cmluZyB3YXMgc3BlY2lmaWVkLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfYWxpZ24gPSBzZXR0aW5nO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBPdGhlciA8dHJhY2s+IHNwZWMgZGVmaW5lZCBwcm9wZXJ0aWVzXG4gICAgICAgICAqL1xuXG4gICAgICAgICAgICAvLyBodHRwOi8vd3d3LndoYXR3Zy5vcmcvc3BlY3Mvd2ViLWFwcHMvY3VycmVudC13b3JrL211bHRpcGFnZS90aGUtdmlkZW8tZWxlbWVudC5odG1sI3RleHQtdHJhY2stY3VlLWRpc3BsYXktc3RhdGVcbiAgICAgICAgY3VlLmRpc3BsYXlTdGF0ZSA9IHVuZGVmaW5lZDtcblxuICAgICAgICBpZiAoaXNJRTgpIHtcbiAgICAgICAgICAgIHJldHVybiBjdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBWVFRDdWUgbWV0aG9kc1xuICAgICAqL1xuXG4gICAgVlRUQ3VlLnByb3RvdHlwZS5nZXRDdWVBc0hUTUwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gQXNzdW1lIFdlYlZUVC5jb252ZXJ0Q3VlVG9ET01UcmVlIGlzIG9uIHRoZSBnbG9iYWwuXG4gICAgICAgIHJldHVybiBXZWJWVFQuY29udmVydEN1ZVRvRE9NVHJlZSh3aW5kb3csIHRoaXMudGV4dCk7XG4gICAgfTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgVlRUQ3VlOyIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDcuIDIzLi5cbiAqL1xuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBJdCB3YXMgcmVwbGFjZSBqcXVlcnkncyBzZWxlY3Rvci4gSXQgT2Z0ZW4gdXNlZCBieSBPdmVuVGVtcGxhdGUuICgvdmlldy9lbmdpbmUvT3ZlblRlbXBsYXRlLmpzKVxuICogQHBhcmFtICAgc2VsZWN0b3JPckVsZW1lbnQgIHN0cmluZyBvciBlbGVtZW50XG4gKlxuICogKi9cblxuXG5jb25zdCBMYSQgPSBmdW5jdGlvbihzZWxlY3Rvck9yRWxlbWVudCl7XG4gICAgY29uc3QgdGhhdCA9IHt9O1xuICAgIGNvbnN0IHJldHVybk5vZGUgPSBmdW5jdGlvbigkZWxlbWVudCAsIHNlbGVjdG9yKXtcbiAgICAgICAgbGV0IG5vZGVMaXN0ID0gICRlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgICAgICBpZihub2RlTGlzdC5sZW5ndGggPiAxKXtcbiAgICAgICAgICAgIHJldHVybiBub2RlTGlzdDtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gbm9kZUxpc3RbMF07XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBsZXQgJGVsZW1lbnQgPSBcIlwiO1xuXG4gICAgaWYoIF8uaXNFbGVtZW50KHNlbGVjdG9yT3JFbGVtZW50KSB8fCBfLmV2ZXJ5KHNlbGVjdG9yT3JFbGVtZW50LCBmdW5jdGlvbihpdGVtKXtyZXR1cm4gXy5pc0VsZW1lbnQoaXRlbSl9KSl7XG4gICAgICAgICRlbGVtZW50ID0gc2VsZWN0b3JPckVsZW1lbnQ7XG4gICAgfWVsc2UgaWYoc2VsZWN0b3JPckVsZW1lbnQgPT09IFwiZG9jdW1lbnRcIil7XG4gICAgICAgICRlbGVtZW50ID0gZG9jdW1lbnQ7XG4gICAgfWVsc2UgaWYoc2VsZWN0b3JPckVsZW1lbnQgPT09IFwid2luZG93XCIpe1xuICAgICAgICAkZWxlbWVudCA9IHdpbmRvdztcbiAgICB9ZWxzZXtcbiAgICAgICAgJGVsZW1lbnQgPSByZXR1cm5Ob2RlKGRvY3VtZW50LCBzZWxlY3Rvck9yRWxlbWVudCk7XG4gICAgfVxuXG5cbiAgICBpZighJGVsZW1lbnQpe1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvKkVGRkVDVFMqL1xuXG4gICAgdGhhdC5zaG93ID0gKCkgPT57XG4gICAgICAgICRlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH07XG5cbiAgICB0aGF0LmhpZGUgPSAoKSA9PntcbiAgICAgICAgJGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9O1xuXG4gICAgLypFTEVNRU5UUyovXG5cbiAgICB0aGF0LmFkZENsYXNzID0gKG5hbWUpID0+e1xuICAgICAgICBpZigkZWxlbWVudC5jbGFzc0xpc3Qpe1xuICAgICAgICAgICAgJGVsZW1lbnQuY2xhc3NMaXN0LmFkZChuYW1lKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBsZXQgY2xhc3NOYW1lcyA9ICRlbGVtZW50LmNsYXNzTmFtZS5zcGxpdChcIiBcIik7XG4gICAgICAgICAgICBpZihjbGFzc05hbWVzLmluZGV4T2YobmFtZSkgPT09IC0xKXtcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5jbGFzc05hbWUgKz0gXCIgXCIgKyBuYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoYXQuYWZ0ZXIgPSAoaHRtbFN0cmluZykgPT4ge1xuICAgICAgICAkZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyZW5kJywgaHRtbFN0cmluZyk7XG4gICAgfTtcblxuICAgIHRoYXQuYXBwZW5kID0gKGh0bWxTdHJpbmcpID0+IHtcbiAgICAgICAgJGVsZW1lbnQuYXBwZW5kQ2hpbGQoaHRtbFN0cmluZyk7XG4gICAgfTtcblxuICAgIHRoYXQuYmVmb3JlID0gKGh0bWxTdHJpbmcpID0+IHtcbiAgICAgICAgJGVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmViZWdpbicsIGh0bWxTdHJpbmcpO1xuICAgIH07XG5cbiAgICB0aGF0LmNoaWxkcmVuID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gJGVsZW1lbnQuY2hpbGRyZW4gfHwgW107XG4gICAgfTtcblxuICAgIC8vVGhlIGNvbnRhaW5zKCkgbWV0aG9kIHJldHVybnMgYSBCb29sZWFuIHZhbHVlIGluZGljYXRpbmcgd2hldGhlciBhIG5vZGUgaXMgYSBkZXNjZW5kYW50IG9mIGEgc3BlY2lmaWVkIG5vZGUuXG4gICAgLy9BIGRlc2NlbmRhbnQgY2FuIGJlIGEgY2hpbGQsIGdyYW5kY2hpbGQsIGdyZWF0LWdyYW5kY2hpbGQsIGFuZCBzbyBvbi5cbiAgICB0aGF0LmNvbnRhaW5zID0gKGVsQ2hpbGQpID0+IHtcbiAgICAgICAgcmV0dXJuICRlbGVtZW50ICE9PSBlbENoaWxkICYmICRlbGVtZW50LmNvbnRhaW5zKGVsQ2hpbGQpO1xuICAgIH07XG5cbiAgICB0aGF0LmVtcHR5ID0gKCkgPT4ge1xuICAgICAgICAkZWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIH07XG5cblxuICAgIHRoYXQuZmluZCA9IChzZWxlY3RvcikgPT57XG4gICAgICAgIHJldHVybiBMYSQocmV0dXJuTm9kZSgkZWxlbWVudCwgc2VsZWN0b3IpKTtcbiAgICB9O1xuXG4gICAgdGhhdC5jc3MgPSAobmFtZSwgdmFsdWUpID0+IHtcbiAgICAgICAgaWYodmFsdWUpe1xuICAgICAgICAgICAgaWYoJGVsZW1lbnQubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50KXtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZVtuYW1lXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5zdHlsZVtuYW1lXSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiAkZWxlbWVudC5zdHlsZVtuYW1lXTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuXG5cbiAgICB0aGF0LnJlbW92ZUNsYXNzID0gKG5hbWUpID0+e1xuICAgICAgICBpZiAoJGVsZW1lbnQuY2xhc3NMaXN0KXtcbiAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUobmFtZSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgJGVsZW1lbnQuY2xhc3NOYW1lID0gJGVsZW1lbnQuY2xhc3NOYW1lLnJlcGxhY2UobmV3IFJlZ0V4cCgnKF58XFxcXGIpJyArIG5hbWUuc3BsaXQoJyAnKS5qb2luKCd8JykgKyAnKFxcXFxifCQpJywgJ2dpJyksICcgJyk7XG5cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0LnJlbW92ZUF0dHJpYnV0ZSA9IChhdHRyTmFtZSkgPT4ge1xuICAgICAgICAkZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0ck5hbWUpO1xuICAgIH07XG5cblxuXG4gICAgLyp0aGF0LmFwcGVuZCA9IChodG1sQ29kZSkgPT57XG4gICAgICAgICRlbGVtZW50LmlubmVySFRNTCArPSBodG1sQ29kZTtcbiAgICB9OyovXG5cbiAgICB0aGF0LnRleHQgPSAodGV4dCkgPT4geyAvL0lFOCtcbiAgICAgICAgaWYodGV4dCA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIHJldHVybiAkZWxlbWVudC50ZXh0Q29udGVudDtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAkZWxlbWVudC50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQuaHRtbCA9IChodG1sU3RyaW5nKSA9PiB7XG4gICAgICAgICRlbGVtZW50LmlubmVySFRNTCA9IGh0bWxTdHJpbmc7XG4gICAgfTtcbiAgICB0aGF0Lmhhc0NsYXNzID0gKG5hbWUpID0+IHsgLy9JRTgrXG4gICAgICAgIGlmKCRlbGVtZW50LmNsYXNzTGlzdCl7XG4gICAgICAgICAgICByZXR1cm4gJGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKG5hbWUpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVnRXhwKCcoXnwgKScgKyBuYW1lICsgJyggfCQpJywgJ2dpJykudGVzdCgkZWxlbWVudC5uYW1lKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0LmlzID0gKCR0YXJnZXRFbGVtZW50KSA9PiB7XG4gICAgICAgIC8qdmFyIG1hdGNoZXMgPSBmdW5jdGlvbihlbCwgc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIHJldHVybiAoZWwubWF0Y2hlcyB8fCBlbC5tYXRjaGVzU2VsZWN0b3IgfHwgZWwubXNNYXRjaGVzU2VsZWN0b3IgfHwgZWwubW96TWF0Y2hlc1NlbGVjdG9yIHx8IGVsLndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fCBlbC5vTWF0Y2hlc1NlbGVjdG9yKS5jYWxsKGVsLCBzZWxlY3Rvcik7XG4gICAgICAgIH07XG5cbiAgICAgICAgbWF0Y2hlcyhlbCwgJy5teS1jbGFzcycpOyovXG4gICAgICAgIHJldHVybiAkZWxlbWVudCA9PT0gJHRhcmdldEVsZW1lbnQ7XG4gICAgfTtcblxuICAgIHRoYXQub2Zmc2V0ID0gKCkgPT57ICAgIC8vSUU4K1xuICAgICAgICB2YXIgcmVjdCA9ICRlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0b3A6IHJlY3QudG9wICsgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AsXG4gICAgICAgICAgICBsZWZ0OiByZWN0LmxlZnQgKyBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnRcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0LndpZHRoID0gKCkgPT4geyAgICAvL0lFOCtcbiAgICAgICAgcmV0dXJuICRlbGVtZW50LmNsaWVudFdpZHRoO1xuICAgIH07XG5cbiAgICB0aGF0LmhlaWdodCA9ICgpID0+IHsgICAvL0lFOCtcbiAgICAgICAgcmV0dXJuICRlbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICB9O1xuXG4gICAgdGhhdC5hdHRyID0gKGF0dHIpID0+IHtcbiAgICAgICAgcmV0dXJuICRlbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyKTtcbiAgICB9O1xuXG4gICAgdGhhdC5yZXBsYWNlID0gKGh0bWwpID0+IHtcbiAgICAgICAgJGVsZW1lbnQucmVwbGFjZVdpdGgoaHRtbCk7XG4gICAgfTtcblxuXG4gICAgdGhhdC5yZW1vdmUgPSAoKSA9PiB7XG4gICAgICAgIGlmKCRlbGVtZW50Lmxlbmd0aCA+IDEpe1xuICAgICAgICAgICAgJGVsZW1lbnQucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZCgkZWxlbWVudCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICB0aGF0LnJlbW92ZUNoaWxkID0gKGVsZW1lbnQpID0+IHtcbiAgICAgICAgaWYoZWxlbWVudCl7XG4gICAgICAgICAgICAkZWxlbWVudC5yZW1vdmVDaGlsZChlbGVtZW50KTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB3aGlsZSAoJGVsZW1lbnQuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlQ2hpbGQoJGVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICB0aGF0LmdldCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuICRlbGVtZW50O1xuICAgIH07XG5cbiAgICB0aGF0LmNsb3Nlc3QgPSAoc2VsZWN0b3JTdHJpbmcpID0+IHtcbiAgICAgICAgbGV0IGNsb3Nlc3RFbGVtZW50ID0gJGVsZW1lbnQuY2xvc2VzdChzZWxlY3RvclN0cmluZyk7XG4gICAgICAgIGlmKGNsb3Nlc3RFbGVtZW50KXtcbiAgICAgICAgICAgIHJldHVybiBMYSQoY2xvc2VzdEVsZW1lbnQpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTGEkO1xuIiwiaW1wb3J0IF8gZnJvbSAnLi91bmRlcnNjb3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIHRyaW0oc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZyA/IHN0cmluZy5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJykgOiBcIlwiO1xufVxuXG4vKipcbiAqIGV4dHJhY3RFeHRlbnNpb25cbiAqXG4gKiBAcGFyYW0gICAgICB7c3RyaW5nfSBwYXRoIGZvciB1cmxcbiAqIEByZXR1cm4gICAgIHtzdHJpbmd9ICBFeHRlbnNpb25cbiAqL1xuZXhwb3J0IGNvbnN0IGV4dHJhY3RFeHRlbnNpb24gPSBmdW5jdGlvbihwYXRoKSB7XG4gICAgaWYoIXBhdGggfHwgcGF0aC5zdWJzdHIoMCw0KT09J3J0bXAnKSB7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRBenVyZUZpbGVGb3JtYXQocGF0aCkge1xuICAgICAgICBsZXQgZXh0ZW5zaW9uID0gXCJcIjtcbiAgICAgICAgaWYgKCgvWygsXWZvcm1hdD1tcGQtL2kpLnRlc3QocGF0aCkpIHtcbiAgICAgICAgICAgIGV4dGVuc2lvbiA9ICdtcGQnO1xuICAgICAgICB9ZWxzZSBpZiAoKC9bKCxdZm9ybWF0PW0zdTgtL2kpLnRlc3QocGF0aCkpIHtcbiAgICAgICAgICAgIGV4dGVuc2lvbiA9ICdtM3U4JztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXh0ZW5zaW9uO1xuICAgIH1cblxuICAgIGxldCBhenVyZWRGb3JtYXQgPSBnZXRBenVyZUZpbGVGb3JtYXQocGF0aCk7XG4gICAgaWYoYXp1cmVkRm9ybWF0KSB7XG4gICAgICAgIHJldHVybiBhenVyZWRGb3JtYXQ7XG4gICAgfVxuICAgIHBhdGggPSBwYXRoLnNwbGl0KCc/JylbMF0uc3BsaXQoJyMnKVswXTtcbiAgICBpZihwYXRoLmxhc3RJbmRleE9mKCcuJykgPiAtMSkge1xuICAgICAgICByZXR1cm4gcGF0aC5zdWJzdHIocGF0aC5sYXN0SW5kZXhPZignLicpICsgMSwgcGF0aC5sZW5ndGgpLnRvTG93ZXJDYXNlKCk7XG4gICAgfWVsc2V7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cbn07XG5cblxuLyoqXG4gKiBuYXR1cmFsSG1zXG4gKlxuICogQHBhcmFtICAgICAge251bWJlciB8IHN0cmluZ30gIHNlY29uZCAgVGhlIHNlY29uZFxuICogQHJldHVybiAgICAge3N0cmluZ30gIGZvcm1hdHRlZCBTdHJpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5hdHVyYWxIbXMoc2Vjb25kKSB7XG4gICAgbGV0IHNlY051bSA9IHBhcnNlSW50KHNlY29uZCwgMTApO1xuICAgIGlmKCFzZWNvbmQpe1xuICAgICAgICByZXR1cm4gXCIwMDowMFwiO1xuICAgIH1cbiAgICBsZXQgaG91cnMgICA9IE1hdGguZmxvb3Ioc2VjTnVtIC8gMzYwMCk7XG4gICAgbGV0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKChzZWNOdW0gLSAoaG91cnMgKiAzNjAwKSkgLyA2MCk7XG4gICAgbGV0IHNlY29uZHMgPSBzZWNOdW0gLSAoaG91cnMgKiAzNjAwKSAtIChtaW51dGVzICogNjApO1xuXG4gICAgLy9pZiAoaG91cnMgPiAwKSB7bWludXRlcyA9IFwiMFwiK21pbnV0ZXM7fVxuICAgIGlmIChtaW51dGVzIDwgMTApIHttaW51dGVzID0gXCIwXCIrbWludXRlczt9XG4gICAgaWYgKHNlY29uZHMgPCAxMCkge3NlY29uZHMgPSBcIjBcIitzZWNvbmRzO31cblxuICAgIGlmIChob3VycyA+IDApIHtcbiAgICAgICAgcmV0dXJuIGhvdXJzKyc6JyttaW51dGVzKyc6JytzZWNvbmRzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBtaW51dGVzKyc6JytzZWNvbmRzO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gaG1zVG9TZWNvbmQoc3RyLCBmcmFtZVJhdGUpIHtcbiAgICBpZighc3RyKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBpZihfLmlzTnVtYmVyKHN0cikgJiYgIV8uaXNOYU4oc3RyKSl7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuICAgIHN0ciA9IHN0ci5yZXBsYWNlKCcsJywgJy4nKTtcbiAgICBsZXQgYXJyID0gc3RyLnNwbGl0KCc6Jyk7XG4gICAgbGV0IGFyckxlbmd0aCA9IGFyci5sZW5ndGg7XG4gICAgbGV0IHNlYyA9IDA7XG4gICAgaWYgKHN0ci5zbGljZSgtMSkgPT09ICdzJyl7XG4gICAgICAgIHNlYyA9IHBhcnNlRmxvYXQoc3RyKTtcbiAgICB9ZWxzZSBpZiAoc3RyLnNsaWNlKC0xKSA9PT0gJ20nKXtcbiAgICAgICAgc2VjID0gcGFyc2VGbG9hdChzdHIpICogNjA7XG4gICAgfWVsc2UgaWYgKHN0ci5zbGljZSgtMSkgPT09ICdoJyl7XG4gICAgICAgIHNlYyA9IHBhcnNlRmxvYXQoc3RyKSAqIDM2MDA7XG4gICAgfWVsc2UgaWYgKGFyckxlbmd0aCA+IDEpIHtcbiAgICAgICAgdmFyIHNlY0luZGV4ID0gYXJyTGVuZ3RoIC0gMTtcbiAgICAgICAgaWYgKGFyckxlbmd0aCA9PT0gNCkge1xuICAgICAgICAgICAgaWYgKGZyYW1lUmF0ZSkge1xuICAgICAgICAgICAgICAgIHNlYyA9IHBhcnNlRmxvYXQoYXJyW3NlY0luZGV4XSkgLyBmcmFtZVJhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWNJbmRleCAtPSAxO1xuICAgICAgICB9XG4gICAgICAgIHNlYyArPSBwYXJzZUZsb2F0KGFycltzZWNJbmRleF0pO1xuICAgICAgICBzZWMgKz0gcGFyc2VGbG9hdChhcnJbc2VjSW5kZXggLSAxXSkgKiA2MDtcbiAgICAgICAgaWYgKGFyckxlbmd0aCA+PSAzKSB7XG4gICAgICAgICAgICBzZWMgKz0gcGFyc2VGbG9hdChhcnJbc2VjSW5kZXggLSAyXSkgKiAzNjAwO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc2VjID0gcGFyc2VGbG9hdChzdHIpO1xuICAgIH1cbiAgICBpZiAoXy5pc05hTihzZWMpKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICByZXR1cm4gc2VjO1xufSIsIi8vICAgICBVbmRlcnNjb3JlLmpzIDEuOS4xXG4vLyAgICAgaHR0cDovL3VuZGVyc2NvcmVqcy5vcmdcbi8vICAgICAoYykgMjAwOS0yMDE4IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4vLyAgICAgVW5kZXJzY29yZSBtYXkgYmUgZnJlZWx5IGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiFmdW5jdGlvbigpe3ZhciBuPVwib2JqZWN0XCI9PXR5cGVvZiBzZWxmJiZzZWxmLnNlbGY9PT1zZWxmJiZzZWxmfHxcIm9iamVjdFwiPT10eXBlb2YgZ2xvYmFsJiZnbG9iYWwuZ2xvYmFsPT09Z2xvYmFsJiZnbG9iYWx8fHRoaXN8fHt9LHI9bi5fLGU9QXJyYXkucHJvdG90eXBlLG89T2JqZWN0LnByb3RvdHlwZSxzPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBTeW1ib2w/U3ltYm9sLnByb3RvdHlwZTpudWxsLHU9ZS5wdXNoLGM9ZS5zbGljZSxwPW8udG9TdHJpbmcsaT1vLmhhc093blByb3BlcnR5LHQ9QXJyYXkuaXNBcnJheSxhPU9iamVjdC5rZXlzLGw9T2JqZWN0LmNyZWF0ZSxmPWZ1bmN0aW9uKCl7fSxoPWZ1bmN0aW9uKG4pe3JldHVybiBuIGluc3RhbmNlb2YgaD9uOnRoaXMgaW5zdGFuY2VvZiBoP3ZvaWQodGhpcy5fd3JhcHBlZD1uKTpuZXcgaChuKX07XCJ1bmRlZmluZWRcIj09dHlwZW9mIGV4cG9ydHN8fGV4cG9ydHMubm9kZVR5cGU/bi5fPWg6KFwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGUmJiFtb2R1bGUubm9kZVR5cGUmJm1vZHVsZS5leHBvcnRzJiYoZXhwb3J0cz1tb2R1bGUuZXhwb3J0cz1oKSxleHBvcnRzLl89aCksaC5WRVJTSU9OPVwiMS45LjFcIjt2YXIgdix5PWZ1bmN0aW9uKHUsaSxuKXtpZih2b2lkIDA9PT1pKXJldHVybiB1O3N3aXRjaChudWxsPT1uPzM6bil7Y2FzZSAxOnJldHVybiBmdW5jdGlvbihuKXtyZXR1cm4gdS5jYWxsKGksbil9O2Nhc2UgMzpyZXR1cm4gZnVuY3Rpb24obixyLHQpe3JldHVybiB1LmNhbGwoaSxuLHIsdCl9O2Nhc2UgNDpyZXR1cm4gZnVuY3Rpb24obixyLHQsZSl7cmV0dXJuIHUuY2FsbChpLG4scix0LGUpfX1yZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gdS5hcHBseShpLGFyZ3VtZW50cyl9fSxkPWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gaC5pdGVyYXRlZSE9PXY/aC5pdGVyYXRlZShuLHIpOm51bGw9PW4/aC5pZGVudGl0eTpoLmlzRnVuY3Rpb24obik/eShuLHIsdCk6aC5pc09iamVjdChuKSYmIWguaXNBcnJheShuKT9oLm1hdGNoZXIobik6aC5wcm9wZXJ0eShuKX07aC5pdGVyYXRlZT12PWZ1bmN0aW9uKG4scil7cmV0dXJuIGQobixyLDEvMCl9O3ZhciBnPWZ1bmN0aW9uKHUsaSl7cmV0dXJuIGk9bnVsbD09aT91Lmxlbmd0aC0xOitpLGZ1bmN0aW9uKCl7Zm9yKHZhciBuPU1hdGgubWF4KGFyZ3VtZW50cy5sZW5ndGgtaSwwKSxyPUFycmF5KG4pLHQ9MDt0PG47dCsrKXJbdF09YXJndW1lbnRzW3QraV07c3dpdGNoKGkpe2Nhc2UgMDpyZXR1cm4gdS5jYWxsKHRoaXMscik7Y2FzZSAxOnJldHVybiB1LmNhbGwodGhpcyxhcmd1bWVudHNbMF0scik7Y2FzZSAyOnJldHVybiB1LmNhbGwodGhpcyxhcmd1bWVudHNbMF0sYXJndW1lbnRzWzFdLHIpfXZhciBlPUFycmF5KGkrMSk7Zm9yKHQ9MDt0PGk7dCsrKWVbdF09YXJndW1lbnRzW3RdO3JldHVybiBlW2ldPXIsdS5hcHBseSh0aGlzLGUpfX0sbT1mdW5jdGlvbihuKXtpZighaC5pc09iamVjdChuKSlyZXR1cm57fTtpZihsKXJldHVybiBsKG4pO2YucHJvdG90eXBlPW47dmFyIHI9bmV3IGY7cmV0dXJuIGYucHJvdG90eXBlPW51bGwscn0sYj1mdW5jdGlvbihyKXtyZXR1cm4gZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PW4/dm9pZCAwOm5bcl19fSxqPWZ1bmN0aW9uKG4scil7cmV0dXJuIG51bGwhPW4mJmkuY2FsbChuLHIpfSx4PWZ1bmN0aW9uKG4scil7Zm9yKHZhciB0PXIubGVuZ3RoLGU9MDtlPHQ7ZSsrKXtpZihudWxsPT1uKXJldHVybjtuPW5bcltlXV19cmV0dXJuIHQ/bjp2b2lkIDB9LF89TWF0aC5wb3coMiw1MyktMSxBPWIoXCJsZW5ndGhcIiksdz1mdW5jdGlvbihuKXt2YXIgcj1BKG4pO3JldHVyblwibnVtYmVyXCI9PXR5cGVvZiByJiYwPD1yJiZyPD1ffTtoLmVhY2g9aC5mb3JFYWNoPWZ1bmN0aW9uKG4scix0KXt2YXIgZSx1O2lmKHI9eShyLHQpLHcobikpZm9yKGU9MCx1PW4ubGVuZ3RoO2U8dTtlKyspcihuW2VdLGUsbik7ZWxzZXt2YXIgaT1oLmtleXMobik7Zm9yKGU9MCx1PWkubGVuZ3RoO2U8dTtlKyspcihuW2lbZV1dLGlbZV0sbil9cmV0dXJuIG59LGgubWFwPWguY29sbGVjdD1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPSF3KG4pJiZoLmtleXMobiksdT0oZXx8bikubGVuZ3RoLGk9QXJyYXkodSksbz0wO288dTtvKyspe3ZhciBhPWU/ZVtvXTpvO2lbb109cihuW2FdLGEsbil9cmV0dXJuIGl9O3ZhciBPPWZ1bmN0aW9uKGMpe3JldHVybiBmdW5jdGlvbihuLHIsdCxlKXt2YXIgdT0zPD1hcmd1bWVudHMubGVuZ3RoO3JldHVybiBmdW5jdGlvbihuLHIsdCxlKXt2YXIgdT0hdyhuKSYmaC5rZXlzKG4pLGk9KHV8fG4pLmxlbmd0aCxvPTA8Yz8wOmktMTtmb3IoZXx8KHQ9blt1P3Vbb106b10sbys9Yyk7MDw9byYmbzxpO28rPWMpe3ZhciBhPXU/dVtvXTpvO3Q9cih0LG5bYV0sYSxuKX1yZXR1cm4gdH0obix5KHIsZSw0KSx0LHUpfX07aC5yZWR1Y2U9aC5mb2xkbD1oLmluamVjdD1PKDEpLGgucmVkdWNlUmlnaHQ9aC5mb2xkcj1PKC0xKSxoLmZpbmQ9aC5kZXRlY3Q9ZnVuY3Rpb24obixyLHQpe3ZhciBlPSh3KG4pP2guZmluZEluZGV4OmguZmluZEtleSkobixyLHQpO2lmKHZvaWQgMCE9PWUmJi0xIT09ZSlyZXR1cm4gbltlXX0saC5maWx0ZXI9aC5zZWxlY3Q9ZnVuY3Rpb24obixlLHIpe3ZhciB1PVtdO3JldHVybiBlPWQoZSxyKSxoLmVhY2gobixmdW5jdGlvbihuLHIsdCl7ZShuLHIsdCkmJnUucHVzaChuKX0pLHV9LGgucmVqZWN0PWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gaC5maWx0ZXIobixoLm5lZ2F0ZShkKHIpKSx0KX0saC5ldmVyeT1oLmFsbD1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPSF3KG4pJiZoLmtleXMobiksdT0oZXx8bikubGVuZ3RoLGk9MDtpPHU7aSsrKXt2YXIgbz1lP2VbaV06aTtpZighcihuW29dLG8sbikpcmV0dXJuITF9cmV0dXJuITB9LGguc29tZT1oLmFueT1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPSF3KG4pJiZoLmtleXMobiksdT0oZXx8bikubGVuZ3RoLGk9MDtpPHU7aSsrKXt2YXIgbz1lP2VbaV06aTtpZihyKG5bb10sbyxuKSlyZXR1cm4hMH1yZXR1cm4hMX0saC5jb250YWlucz1oLmluY2x1ZGVzPWguaW5jbHVkZT1mdW5jdGlvbihuLHIsdCxlKXtyZXR1cm4gdyhuKXx8KG49aC52YWx1ZXMobikpLChcIm51bWJlclwiIT10eXBlb2YgdHx8ZSkmJih0PTApLDA8PWguaW5kZXhPZihuLHIsdCl9LGguaW52b2tlPWcoZnVuY3Rpb24obix0LGUpe3ZhciB1LGk7cmV0dXJuIGguaXNGdW5jdGlvbih0KT9pPXQ6aC5pc0FycmF5KHQpJiYodT10LnNsaWNlKDAsLTEpLHQ9dFt0Lmxlbmd0aC0xXSksaC5tYXAobixmdW5jdGlvbihuKXt2YXIgcj1pO2lmKCFyKXtpZih1JiZ1Lmxlbmd0aCYmKG49eChuLHUpKSxudWxsPT1uKXJldHVybjtyPW5bdF19cmV0dXJuIG51bGw9PXI/cjpyLmFwcGx5KG4sZSl9KX0pLGgucGx1Y2s9ZnVuY3Rpb24obixyKXtyZXR1cm4gaC5tYXAobixoLnByb3BlcnR5KHIpKX0saC53aGVyZT1mdW5jdGlvbihuLHIpe3JldHVybiBoLmZpbHRlcihuLGgubWF0Y2hlcihyKSl9LGguZmluZFdoZXJlPWZ1bmN0aW9uKG4scil7cmV0dXJuIGguZmluZChuLGgubWF0Y2hlcihyKSl9LGgubWF4PWZ1bmN0aW9uKG4sZSxyKXt2YXIgdCx1LGk9LTEvMCxvPS0xLzA7aWYobnVsbD09ZXx8XCJudW1iZXJcIj09dHlwZW9mIGUmJlwib2JqZWN0XCIhPXR5cGVvZiBuWzBdJiZudWxsIT1uKWZvcih2YXIgYT0wLGM9KG49dyhuKT9uOmgudmFsdWVzKG4pKS5sZW5ndGg7YTxjO2ErKyludWxsIT0odD1uW2FdKSYmaTx0JiYoaT10KTtlbHNlIGU9ZChlLHIpLGguZWFjaChuLGZ1bmN0aW9uKG4scix0KXt1PWUobixyLHQpLChvPHV8fHU9PT0tMS8wJiZpPT09LTEvMCkmJihpPW4sbz11KX0pO3JldHVybiBpfSxoLm1pbj1mdW5jdGlvbihuLGUscil7dmFyIHQsdSxpPTEvMCxvPTEvMDtpZihudWxsPT1lfHxcIm51bWJlclwiPT10eXBlb2YgZSYmXCJvYmplY3RcIiE9dHlwZW9mIG5bMF0mJm51bGwhPW4pZm9yKHZhciBhPTAsYz0obj13KG4pP246aC52YWx1ZXMobikpLmxlbmd0aDthPGM7YSsrKW51bGwhPSh0PW5bYV0pJiZ0PGkmJihpPXQpO2Vsc2UgZT1kKGUsciksaC5lYWNoKG4sZnVuY3Rpb24obixyLHQpeygodT1lKG4scix0KSk8b3x8dT09PTEvMCYmaT09PTEvMCkmJihpPW4sbz11KX0pO3JldHVybiBpfSxoLnNodWZmbGU9ZnVuY3Rpb24obil7cmV0dXJuIGguc2FtcGxlKG4sMS8wKX0saC5zYW1wbGU9ZnVuY3Rpb24obixyLHQpe2lmKG51bGw9PXJ8fHQpcmV0dXJuIHcobil8fChuPWgudmFsdWVzKG4pKSxuW2gucmFuZG9tKG4ubGVuZ3RoLTEpXTt2YXIgZT13KG4pP2guY2xvbmUobik6aC52YWx1ZXMobiksdT1BKGUpO3I9TWF0aC5tYXgoTWF0aC5taW4ocix1KSwwKTtmb3IodmFyIGk9dS0xLG89MDtvPHI7bysrKXt2YXIgYT1oLnJhbmRvbShvLGkpLGM9ZVtvXTtlW29dPWVbYV0sZVthXT1jfXJldHVybiBlLnNsaWNlKDAscil9LGguc29ydEJ5PWZ1bmN0aW9uKG4sZSxyKXt2YXIgdT0wO3JldHVybiBlPWQoZSxyKSxoLnBsdWNrKGgubWFwKG4sZnVuY3Rpb24obixyLHQpe3JldHVybnt2YWx1ZTpuLGluZGV4OnUrKyxjcml0ZXJpYTplKG4scix0KX19KS5zb3J0KGZ1bmN0aW9uKG4scil7dmFyIHQ9bi5jcml0ZXJpYSxlPXIuY3JpdGVyaWE7aWYodCE9PWUpe2lmKGU8dHx8dm9pZCAwPT09dClyZXR1cm4gMTtpZih0PGV8fHZvaWQgMD09PWUpcmV0dXJuLTF9cmV0dXJuIG4uaW5kZXgtci5pbmRleH0pLFwidmFsdWVcIil9O3ZhciBrPWZ1bmN0aW9uKG8scil7cmV0dXJuIGZ1bmN0aW9uKGUsdSxuKXt2YXIgaT1yP1tbXSxbXV06e307cmV0dXJuIHU9ZCh1LG4pLGguZWFjaChlLGZ1bmN0aW9uKG4scil7dmFyIHQ9dShuLHIsZSk7byhpLG4sdCl9KSxpfX07aC5ncm91cEJ5PWsoZnVuY3Rpb24obixyLHQpe2oobix0KT9uW3RdLnB1c2gocik6blt0XT1bcl19KSxoLmluZGV4Qnk9ayhmdW5jdGlvbihuLHIsdCl7blt0XT1yfSksaC5jb3VudEJ5PWsoZnVuY3Rpb24obixyLHQpe2oobix0KT9uW3RdKys6blt0XT0xfSk7dmFyIFM9L1teXFx1ZDgwMC1cXHVkZmZmXXxbXFx1ZDgwMC1cXHVkYmZmXVtcXHVkYzAwLVxcdWRmZmZdfFtcXHVkODAwLVxcdWRmZmZdL2c7aC50b0FycmF5PWZ1bmN0aW9uKG4pe3JldHVybiBuP2guaXNBcnJheShuKT9jLmNhbGwobik6aC5pc1N0cmluZyhuKT9uLm1hdGNoKFMpOncobik/aC5tYXAobixoLmlkZW50aXR5KTpoLnZhbHVlcyhuKTpbXX0saC5zaXplPWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT1uPzA6dyhuKT9uLmxlbmd0aDpoLmtleXMobikubGVuZ3RofSxoLnBhcnRpdGlvbj1rKGZ1bmN0aW9uKG4scix0KXtuW3Q/MDoxXS5wdXNoKHIpfSwhMCksaC5maXJzdD1oLmhlYWQ9aC50YWtlPWZ1bmN0aW9uKG4scix0KXtyZXR1cm4gbnVsbD09bnx8bi5sZW5ndGg8MT9udWxsPT1yP3ZvaWQgMDpbXTpudWxsPT1yfHx0P25bMF06aC5pbml0aWFsKG4sbi5sZW5ndGgtcil9LGguaW5pdGlhbD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGMuY2FsbChuLDAsTWF0aC5tYXgoMCxuLmxlbmd0aC0obnVsbD09cnx8dD8xOnIpKSl9LGgubGFzdD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIG51bGw9PW58fG4ubGVuZ3RoPDE/bnVsbD09cj92b2lkIDA6W106bnVsbD09cnx8dD9uW24ubGVuZ3RoLTFdOmgucmVzdChuLE1hdGgubWF4KDAsbi5sZW5ndGgtcikpfSxoLnJlc3Q9aC50YWlsPWguZHJvcD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGMuY2FsbChuLG51bGw9PXJ8fHQ/MTpyKX0saC5jb21wYWN0PWZ1bmN0aW9uKG4pe3JldHVybiBoLmZpbHRlcihuLEJvb2xlYW4pfTt2YXIgTT1mdW5jdGlvbihuLHIsdCxlKXtmb3IodmFyIHU9KGU9ZXx8W10pLmxlbmd0aCxpPTAsbz1BKG4pO2k8bztpKyspe3ZhciBhPW5baV07aWYodyhhKSYmKGguaXNBcnJheShhKXx8aC5pc0FyZ3VtZW50cyhhKSkpaWYocilmb3IodmFyIGM9MCxsPWEubGVuZ3RoO2M8bDspZVt1KytdPWFbYysrXTtlbHNlIE0oYSxyLHQsZSksdT1lLmxlbmd0aDtlbHNlIHR8fChlW3UrK109YSl9cmV0dXJuIGV9O2guZmxhdHRlbj1mdW5jdGlvbihuLHIpe3JldHVybiBNKG4sciwhMSl9LGgud2l0aG91dD1nKGZ1bmN0aW9uKG4scil7cmV0dXJuIGguZGlmZmVyZW5jZShuLHIpfSksaC51bmlxPWgudW5pcXVlPWZ1bmN0aW9uKG4scix0LGUpe2guaXNCb29sZWFuKHIpfHwoZT10LHQ9cixyPSExKSxudWxsIT10JiYodD1kKHQsZSkpO2Zvcih2YXIgdT1bXSxpPVtdLG89MCxhPUEobik7bzxhO28rKyl7dmFyIGM9bltvXSxsPXQ/dChjLG8sbik6YztyJiYhdD8obyYmaT09PWx8fHUucHVzaChjKSxpPWwpOnQ/aC5jb250YWlucyhpLGwpfHwoaS5wdXNoKGwpLHUucHVzaChjKSk6aC5jb250YWlucyh1LGMpfHx1LnB1c2goYyl9cmV0dXJuIHV9LGgudW5pb249ZyhmdW5jdGlvbihuKXtyZXR1cm4gaC51bmlxKE0obiwhMCwhMCkpfSksaC5pbnRlcnNlY3Rpb249ZnVuY3Rpb24obil7Zm9yKHZhciByPVtdLHQ9YXJndW1lbnRzLmxlbmd0aCxlPTAsdT1BKG4pO2U8dTtlKyspe3ZhciBpPW5bZV07aWYoIWguY29udGFpbnMocixpKSl7dmFyIG87Zm9yKG89MTtvPHQmJmguY29udGFpbnMoYXJndW1lbnRzW29dLGkpO28rKyk7bz09PXQmJnIucHVzaChpKX19cmV0dXJuIHJ9LGguZGlmZmVyZW5jZT1nKGZ1bmN0aW9uKG4scil7cmV0dXJuIHI9TShyLCEwLCEwKSxoLmZpbHRlcihuLGZ1bmN0aW9uKG4pe3JldHVybiFoLmNvbnRhaW5zKHIsbil9KX0pLGgudW56aXA9ZnVuY3Rpb24obil7Zm9yKHZhciByPW4mJmgubWF4KG4sQSkubGVuZ3RofHwwLHQ9QXJyYXkociksZT0wO2U8cjtlKyspdFtlXT1oLnBsdWNrKG4sZSk7cmV0dXJuIHR9LGguemlwPWcoaC51bnppcCksaC5vYmplY3Q9ZnVuY3Rpb24obixyKXtmb3IodmFyIHQ9e30sZT0wLHU9QShuKTtlPHU7ZSsrKXI/dFtuW2VdXT1yW2VdOnRbbltlXVswXV09bltlXVsxXTtyZXR1cm4gdH07dmFyIEY9ZnVuY3Rpb24oaSl7cmV0dXJuIGZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGU9QShuKSx1PTA8aT8wOmUtMTswPD11JiZ1PGU7dSs9aSlpZihyKG5bdV0sdSxuKSlyZXR1cm4gdTtyZXR1cm4tMX19O2guZmluZEluZGV4PUYoMSksaC5maW5kTGFzdEluZGV4PUYoLTEpLGguc29ydGVkSW5kZXg9ZnVuY3Rpb24obixyLHQsZSl7Zm9yKHZhciB1PSh0PWQodCxlLDEpKShyKSxpPTAsbz1BKG4pO2k8bzspe3ZhciBhPU1hdGguZmxvb3IoKGkrbykvMik7dChuW2FdKTx1P2k9YSsxOm89YX1yZXR1cm4gaX07dmFyIEU9ZnVuY3Rpb24oaSxvLGEpe3JldHVybiBmdW5jdGlvbihuLHIsdCl7dmFyIGU9MCx1PUEobik7aWYoXCJudW1iZXJcIj09dHlwZW9mIHQpMDxpP2U9MDw9dD90Ok1hdGgubWF4KHQrdSxlKTp1PTA8PXQ/TWF0aC5taW4odCsxLHUpOnQrdSsxO2Vsc2UgaWYoYSYmdCYmdSlyZXR1cm4gblt0PWEobixyKV09PT1yP3Q6LTE7aWYociE9cilyZXR1cm4gMDw9KHQ9byhjLmNhbGwobixlLHUpLGguaXNOYU4pKT90K2U6LTE7Zm9yKHQ9MDxpP2U6dS0xOzA8PXQmJnQ8dTt0Kz1pKWlmKG5bdF09PT1yKXJldHVybiB0O3JldHVybi0xfX07aC5pbmRleE9mPUUoMSxoLmZpbmRJbmRleCxoLnNvcnRlZEluZGV4KSxoLmxhc3RJbmRleE9mPUUoLTEsaC5maW5kTGFzdEluZGV4KSxoLnJhbmdlPWZ1bmN0aW9uKG4scix0KXtudWxsPT1yJiYocj1ufHwwLG49MCksdHx8KHQ9cjxuPy0xOjEpO2Zvcih2YXIgZT1NYXRoLm1heChNYXRoLmNlaWwoKHItbikvdCksMCksdT1BcnJheShlKSxpPTA7aTxlO2krKyxuKz10KXVbaV09bjtyZXR1cm4gdX0saC5jaHVuaz1mdW5jdGlvbihuLHIpe2lmKG51bGw9PXJ8fHI8MSlyZXR1cm5bXTtmb3IodmFyIHQ9W10sZT0wLHU9bi5sZW5ndGg7ZTx1Oyl0LnB1c2goYy5jYWxsKG4sZSxlKz1yKSk7cmV0dXJuIHR9O3ZhciBOPWZ1bmN0aW9uKG4scix0LGUsdSl7aWYoIShlIGluc3RhbmNlb2YgcikpcmV0dXJuIG4uYXBwbHkodCx1KTt2YXIgaT1tKG4ucHJvdG90eXBlKSxvPW4uYXBwbHkoaSx1KTtyZXR1cm4gaC5pc09iamVjdChvKT9vOml9O2guYmluZD1nKGZ1bmN0aW9uKHIsdCxlKXtpZighaC5pc0Z1bmN0aW9uKHIpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJCaW5kIG11c3QgYmUgY2FsbGVkIG9uIGEgZnVuY3Rpb25cIik7dmFyIHU9ZyhmdW5jdGlvbihuKXtyZXR1cm4gTihyLHUsdCx0aGlzLGUuY29uY2F0KG4pKX0pO3JldHVybiB1fSksaC5wYXJ0aWFsPWcoZnVuY3Rpb24odSxpKXt2YXIgbz1oLnBhcnRpYWwucGxhY2Vob2xkZXIsYT1mdW5jdGlvbigpe2Zvcih2YXIgbj0wLHI9aS5sZW5ndGgsdD1BcnJheShyKSxlPTA7ZTxyO2UrKyl0W2VdPWlbZV09PT1vP2FyZ3VtZW50c1tuKytdOmlbZV07Zm9yKDtuPGFyZ3VtZW50cy5sZW5ndGg7KXQucHVzaChhcmd1bWVudHNbbisrXSk7cmV0dXJuIE4odSxhLHRoaXMsdGhpcyx0KX07cmV0dXJuIGF9KSwoaC5wYXJ0aWFsLnBsYWNlaG9sZGVyPWgpLmJpbmRBbGw9ZyhmdW5jdGlvbihuLHIpe3ZhciB0PShyPU0ociwhMSwhMSkpLmxlbmd0aDtpZih0PDEpdGhyb3cgbmV3IEVycm9yKFwiYmluZEFsbCBtdXN0IGJlIHBhc3NlZCBmdW5jdGlvbiBuYW1lc1wiKTtmb3IoO3QtLTspe3ZhciBlPXJbdF07bltlXT1oLmJpbmQobltlXSxuKX19KSxoLm1lbW9pemU9ZnVuY3Rpb24oZSx1KXt2YXIgaT1mdW5jdGlvbihuKXt2YXIgcj1pLmNhY2hlLHQ9XCJcIisodT91LmFwcGx5KHRoaXMsYXJndW1lbnRzKTpuKTtyZXR1cm4gaihyLHQpfHwoclt0XT1lLmFwcGx5KHRoaXMsYXJndW1lbnRzKSksclt0XX07cmV0dXJuIGkuY2FjaGU9e30saX0saC5kZWxheT1nKGZ1bmN0aW9uKG4scix0KXtyZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpe3JldHVybiBuLmFwcGx5KG51bGwsdCl9LHIpfSksaC5kZWZlcj1oLnBhcnRpYWwoaC5kZWxheSxoLDEpLGgudGhyb3R0bGU9ZnVuY3Rpb24odCxlLHUpe3ZhciBpLG8sYSxjLGw9MDt1fHwodT17fSk7dmFyIGY9ZnVuY3Rpb24oKXtsPSExPT09dS5sZWFkaW5nPzA6aC5ub3coKSxpPW51bGwsYz10LmFwcGx5KG8sYSksaXx8KG89YT1udWxsKX0sbj1mdW5jdGlvbigpe3ZhciBuPWgubm93KCk7bHx8ITEhPT11LmxlYWRpbmd8fChsPW4pO3ZhciByPWUtKG4tbCk7cmV0dXJuIG89dGhpcyxhPWFyZ3VtZW50cyxyPD0wfHxlPHI/KGkmJihjbGVhclRpbWVvdXQoaSksaT1udWxsKSxsPW4sYz10LmFwcGx5KG8sYSksaXx8KG89YT1udWxsKSk6aXx8ITE9PT11LnRyYWlsaW5nfHwoaT1zZXRUaW1lb3V0KGYscikpLGN9O3JldHVybiBuLmNhbmNlbD1mdW5jdGlvbigpe2NsZWFyVGltZW91dChpKSxsPTAsaT1vPWE9bnVsbH0sbn0saC5kZWJvdW5jZT1mdW5jdGlvbih0LGUsdSl7dmFyIGksbyxhPWZ1bmN0aW9uKG4scil7aT1udWxsLHImJihvPXQuYXBwbHkobixyKSl9LG49ZyhmdW5jdGlvbihuKXtpZihpJiZjbGVhclRpbWVvdXQoaSksdSl7dmFyIHI9IWk7aT1zZXRUaW1lb3V0KGEsZSksciYmKG89dC5hcHBseSh0aGlzLG4pKX1lbHNlIGk9aC5kZWxheShhLGUsdGhpcyxuKTtyZXR1cm4gb30pO3JldHVybiBuLmNhbmNlbD1mdW5jdGlvbigpe2NsZWFyVGltZW91dChpKSxpPW51bGx9LG59LGgud3JhcD1mdW5jdGlvbihuLHIpe3JldHVybiBoLnBhcnRpYWwocixuKX0saC5uZWdhdGU9ZnVuY3Rpb24obil7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIW4uYXBwbHkodGhpcyxhcmd1bWVudHMpfX0saC5jb21wb3NlPWZ1bmN0aW9uKCl7dmFyIHQ9YXJndW1lbnRzLGU9dC5sZW5ndGgtMTtyZXR1cm4gZnVuY3Rpb24oKXtmb3IodmFyIG49ZSxyPXRbZV0uYXBwbHkodGhpcyxhcmd1bWVudHMpO24tLTspcj10W25dLmNhbGwodGhpcyxyKTtyZXR1cm4gcn19LGguYWZ0ZXI9ZnVuY3Rpb24obixyKXtyZXR1cm4gZnVuY3Rpb24oKXtpZigtLW48MSlyZXR1cm4gci5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fSxoLmJlZm9yZT1mdW5jdGlvbihuLHIpe3ZhciB0O3JldHVybiBmdW5jdGlvbigpe3JldHVybiAwPC0tbiYmKHQ9ci5hcHBseSh0aGlzLGFyZ3VtZW50cykpLG48PTEmJihyPW51bGwpLHR9fSxoLm9uY2U9aC5wYXJ0aWFsKGguYmVmb3JlLDIpLGgucmVzdEFyZ3VtZW50cz1nO3ZhciBJPSF7dG9TdHJpbmc6bnVsbH0ucHJvcGVydHlJc0VudW1lcmFibGUoXCJ0b1N0cmluZ1wiKSxUPVtcInZhbHVlT2ZcIixcImlzUHJvdG90eXBlT2ZcIixcInRvU3RyaW5nXCIsXCJwcm9wZXJ0eUlzRW51bWVyYWJsZVwiLFwiaGFzT3duUHJvcGVydHlcIixcInRvTG9jYWxlU3RyaW5nXCJdLEI9ZnVuY3Rpb24obixyKXt2YXIgdD1ULmxlbmd0aCxlPW4uY29uc3RydWN0b3IsdT1oLmlzRnVuY3Rpb24oZSkmJmUucHJvdG90eXBlfHxvLGk9XCJjb25zdHJ1Y3RvclwiO2ZvcihqKG4saSkmJiFoLmNvbnRhaW5zKHIsaSkmJnIucHVzaChpKTt0LS07KShpPVRbdF0paW4gbiYmbltpXSE9PXVbaV0mJiFoLmNvbnRhaW5zKHIsaSkmJnIucHVzaChpKX07aC5rZXlzPWZ1bmN0aW9uKG4pe2lmKCFoLmlzT2JqZWN0KG4pKXJldHVybltdO2lmKGEpcmV0dXJuIGEobik7dmFyIHI9W107Zm9yKHZhciB0IGluIG4paihuLHQpJiZyLnB1c2godCk7cmV0dXJuIEkmJkIobixyKSxyfSxoLmFsbEtleXM9ZnVuY3Rpb24obil7aWYoIWguaXNPYmplY3QobikpcmV0dXJuW107dmFyIHI9W107Zm9yKHZhciB0IGluIG4pci5wdXNoKHQpO3JldHVybiBJJiZCKG4scikscn0saC52YWx1ZXM9ZnVuY3Rpb24obil7Zm9yKHZhciByPWgua2V5cyhuKSx0PXIubGVuZ3RoLGU9QXJyYXkodCksdT0wO3U8dDt1KyspZVt1XT1uW3JbdV1dO3JldHVybiBlfSxoLm1hcE9iamVjdD1mdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPWgua2V5cyhuKSx1PWUubGVuZ3RoLGk9e30sbz0wO288dTtvKyspe3ZhciBhPWVbb107aVthXT1yKG5bYV0sYSxuKX1yZXR1cm4gaX0saC5wYWlycz1mdW5jdGlvbihuKXtmb3IodmFyIHI9aC5rZXlzKG4pLHQ9ci5sZW5ndGgsZT1BcnJheSh0KSx1PTA7dTx0O3UrKyllW3VdPVtyW3VdLG5bclt1XV1dO3JldHVybiBlfSxoLmludmVydD1mdW5jdGlvbihuKXtmb3IodmFyIHI9e30sdD1oLmtleXMobiksZT0wLHU9dC5sZW5ndGg7ZTx1O2UrKylyW25bdFtlXV1dPXRbZV07cmV0dXJuIHJ9LGguZnVuY3Rpb25zPWgubWV0aG9kcz1mdW5jdGlvbihuKXt2YXIgcj1bXTtmb3IodmFyIHQgaW4gbiloLmlzRnVuY3Rpb24oblt0XSkmJnIucHVzaCh0KTtyZXR1cm4gci5zb3J0KCl9O3ZhciBSPWZ1bmN0aW9uKGMsbCl7cmV0dXJuIGZ1bmN0aW9uKG4pe3ZhciByPWFyZ3VtZW50cy5sZW5ndGg7aWYobCYmKG49T2JqZWN0KG4pKSxyPDJ8fG51bGw9PW4pcmV0dXJuIG47Zm9yKHZhciB0PTE7dDxyO3QrKylmb3IodmFyIGU9YXJndW1lbnRzW3RdLHU9YyhlKSxpPXUubGVuZ3RoLG89MDtvPGk7bysrKXt2YXIgYT11W29dO2wmJnZvaWQgMCE9PW5bYV18fChuW2FdPWVbYV0pfXJldHVybiBufX07aC5leHRlbmQ9UihoLmFsbEtleXMpLGguZXh0ZW5kT3duPWguYXNzaWduPVIoaC5rZXlzKSxoLmZpbmRLZXk9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZSx1PWgua2V5cyhuKSxpPTAsbz11Lmxlbmd0aDtpPG87aSsrKWlmKHIobltlPXVbaV1dLGUsbikpcmV0dXJuIGV9O3ZhciBxLEssej1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIHIgaW4gdH07aC5waWNrPWcoZnVuY3Rpb24obixyKXt2YXIgdD17fSxlPXJbMF07aWYobnVsbD09bilyZXR1cm4gdDtoLmlzRnVuY3Rpb24oZSk/KDE8ci5sZW5ndGgmJihlPXkoZSxyWzFdKSkscj1oLmFsbEtleXMobikpOihlPXoscj1NKHIsITEsITEpLG49T2JqZWN0KG4pKTtmb3IodmFyIHU9MCxpPXIubGVuZ3RoO3U8aTt1Kyspe3ZhciBvPXJbdV0sYT1uW29dO2UoYSxvLG4pJiYodFtvXT1hKX1yZXR1cm4gdH0pLGgub21pdD1nKGZ1bmN0aW9uKG4sdCl7dmFyIHIsZT10WzBdO3JldHVybiBoLmlzRnVuY3Rpb24oZSk/KGU9aC5uZWdhdGUoZSksMTx0Lmxlbmd0aCYmKHI9dFsxXSkpOih0PWgubWFwKE0odCwhMSwhMSksU3RyaW5nKSxlPWZ1bmN0aW9uKG4scil7cmV0dXJuIWguY29udGFpbnModCxyKX0pLGgucGljayhuLGUscil9KSxoLmRlZmF1bHRzPVIoaC5hbGxLZXlzLCEwKSxoLmNyZWF0ZT1mdW5jdGlvbihuLHIpe3ZhciB0PW0obik7cmV0dXJuIHImJmguZXh0ZW5kT3duKHQsciksdH0saC5jbG9uZT1mdW5jdGlvbihuKXtyZXR1cm4gaC5pc09iamVjdChuKT9oLmlzQXJyYXkobik/bi5zbGljZSgpOmguZXh0ZW5kKHt9LG4pOm59LGgudGFwPWZ1bmN0aW9uKG4scil7cmV0dXJuIHIobiksbn0saC5pc01hdGNoPWZ1bmN0aW9uKG4scil7dmFyIHQ9aC5rZXlzKHIpLGU9dC5sZW5ndGg7aWYobnVsbD09bilyZXR1cm4hZTtmb3IodmFyIHU9T2JqZWN0KG4pLGk9MDtpPGU7aSsrKXt2YXIgbz10W2ldO2lmKHJbb10hPT11W29dfHwhKG8gaW4gdSkpcmV0dXJuITF9cmV0dXJuITB9LHE9ZnVuY3Rpb24obixyLHQsZSl7aWYobj09PXIpcmV0dXJuIDAhPT1ufHwxL249PTEvcjtpZihudWxsPT1ufHxudWxsPT1yKXJldHVybiExO2lmKG4hPW4pcmV0dXJuIHIhPXI7dmFyIHU9dHlwZW9mIG47cmV0dXJuKFwiZnVuY3Rpb25cIj09PXV8fFwib2JqZWN0XCI9PT11fHxcIm9iamVjdFwiPT10eXBlb2YgcikmJksobixyLHQsZSl9LEs9ZnVuY3Rpb24obixyLHQsZSl7biBpbnN0YW5jZW9mIGgmJihuPW4uX3dyYXBwZWQpLHIgaW5zdGFuY2VvZiBoJiYocj1yLl93cmFwcGVkKTt2YXIgdT1wLmNhbGwobik7aWYodSE9PXAuY2FsbChyKSlyZXR1cm4hMTtzd2l0Y2godSl7Y2FzZVwiW29iamVjdCBSZWdFeHBdXCI6Y2FzZVwiW29iamVjdCBTdHJpbmddXCI6cmV0dXJuXCJcIituPT1cIlwiK3I7Y2FzZVwiW29iamVjdCBOdW1iZXJdXCI6cmV0dXJuK24hPStuPytyIT0rcjowPT0rbj8xLytuPT0xL3I6K249PStyO2Nhc2VcIltvYmplY3QgRGF0ZV1cIjpjYXNlXCJbb2JqZWN0IEJvb2xlYW5dXCI6cmV0dXJuK249PStyO2Nhc2VcIltvYmplY3QgU3ltYm9sXVwiOnJldHVybiBzLnZhbHVlT2YuY2FsbChuKT09PXMudmFsdWVPZi5jYWxsKHIpfXZhciBpPVwiW29iamVjdCBBcnJheV1cIj09PXU7aWYoIWkpe2lmKFwib2JqZWN0XCIhPXR5cGVvZiBufHxcIm9iamVjdFwiIT10eXBlb2YgcilyZXR1cm4hMTt2YXIgbz1uLmNvbnN0cnVjdG9yLGE9ci5jb25zdHJ1Y3RvcjtpZihvIT09YSYmIShoLmlzRnVuY3Rpb24obykmJm8gaW5zdGFuY2VvZiBvJiZoLmlzRnVuY3Rpb24oYSkmJmEgaW5zdGFuY2VvZiBhKSYmXCJjb25zdHJ1Y3RvclwiaW4gbiYmXCJjb25zdHJ1Y3RvclwiaW4gcilyZXR1cm4hMX1lPWV8fFtdO2Zvcih2YXIgYz0odD10fHxbXSkubGVuZ3RoO2MtLTspaWYodFtjXT09PW4pcmV0dXJuIGVbY109PT1yO2lmKHQucHVzaChuKSxlLnB1c2gociksaSl7aWYoKGM9bi5sZW5ndGgpIT09ci5sZW5ndGgpcmV0dXJuITE7Zm9yKDtjLS07KWlmKCFxKG5bY10scltjXSx0LGUpKXJldHVybiExfWVsc2V7dmFyIGwsZj1oLmtleXMobik7aWYoYz1mLmxlbmd0aCxoLmtleXMocikubGVuZ3RoIT09YylyZXR1cm4hMTtmb3IoO2MtLTspaWYobD1mW2NdLCFqKHIsbCl8fCFxKG5bbF0scltsXSx0LGUpKXJldHVybiExfXJldHVybiB0LnBvcCgpLGUucG9wKCksITB9LGguaXNFcXVhbD1mdW5jdGlvbihuLHIpe3JldHVybiBxKG4scil9LGguaXNFbXB0eT1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09bnx8KHcobikmJihoLmlzQXJyYXkobil8fGguaXNTdHJpbmcobil8fGguaXNBcmd1bWVudHMobikpPzA9PT1uLmxlbmd0aDowPT09aC5rZXlzKG4pLmxlbmd0aCl9LGguaXNFbGVtZW50PWZ1bmN0aW9uKG4pe3JldHVybiEoIW58fDEhPT1uLm5vZGVUeXBlKX0saC5pc0FycmF5PXR8fGZ1bmN0aW9uKG4pe3JldHVyblwiW29iamVjdCBBcnJheV1cIj09PXAuY2FsbChuKX0saC5pc09iamVjdD1mdW5jdGlvbihuKXt2YXIgcj10eXBlb2YgbjtyZXR1cm5cImZ1bmN0aW9uXCI9PT1yfHxcIm9iamVjdFwiPT09ciYmISFufSxoLmVhY2goW1wiQXJndW1lbnRzXCIsXCJGdW5jdGlvblwiLFwiU3RyaW5nXCIsXCJOdW1iZXJcIixcIkRhdGVcIixcIlJlZ0V4cFwiLFwiRXJyb3JcIixcIlN5bWJvbFwiLFwiTWFwXCIsXCJXZWFrTWFwXCIsXCJTZXRcIixcIldlYWtTZXRcIl0sZnVuY3Rpb24ocil7aFtcImlzXCIrcl09ZnVuY3Rpb24obil7cmV0dXJuIHAuY2FsbChuKT09PVwiW29iamVjdCBcIityK1wiXVwifX0pLGguaXNBcmd1bWVudHMoYXJndW1lbnRzKXx8KGguaXNBcmd1bWVudHM9ZnVuY3Rpb24obil7cmV0dXJuIGoobixcImNhbGxlZVwiKX0pO3ZhciBEPW4uZG9jdW1lbnQmJm4uZG9jdW1lbnQuY2hpbGROb2RlcztcImZ1bmN0aW9uXCIhPXR5cGVvZi8uLyYmXCJvYmplY3RcIiE9dHlwZW9mIEludDhBcnJheSYmXCJmdW5jdGlvblwiIT10eXBlb2YgRCYmKGguaXNGdW5jdGlvbj1mdW5jdGlvbihuKXtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBufHwhMX0pLGguaXNGaW5pdGU9ZnVuY3Rpb24obil7cmV0dXJuIWguaXNTeW1ib2wobikmJmlzRmluaXRlKG4pJiYhaXNOYU4ocGFyc2VGbG9hdChuKSl9LGguaXNOYU49ZnVuY3Rpb24obil7cmV0dXJuIGguaXNOdW1iZXIobikmJmlzTmFOKG4pfSxoLmlzQm9vbGVhbj1mdW5jdGlvbihuKXtyZXR1cm4hMD09PW58fCExPT09bnx8XCJbb2JqZWN0IEJvb2xlYW5dXCI9PT1wLmNhbGwobil9LGguaXNOdWxsPWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT09bn0saC5pc1VuZGVmaW5lZD1mdW5jdGlvbihuKXtyZXR1cm4gdm9pZCAwPT09bn0saC5oYXM9ZnVuY3Rpb24obixyKXtpZighaC5pc0FycmF5KHIpKXJldHVybiBqKG4scik7Zm9yKHZhciB0PXIubGVuZ3RoLGU9MDtlPHQ7ZSsrKXt2YXIgdT1yW2VdO2lmKG51bGw9PW58fCFpLmNhbGwobix1KSlyZXR1cm4hMTtuPW5bdV19cmV0dXJuISF0fSxoLm5vQ29uZmxpY3Q9ZnVuY3Rpb24oKXtyZXR1cm4gbi5fPXIsdGhpc30saC5pZGVudGl0eT1mdW5jdGlvbihuKXtyZXR1cm4gbn0saC5jb25zdGFudD1mdW5jdGlvbihuKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gbn19LGgubm9vcD1mdW5jdGlvbigpe30saC5wcm9wZXJ0eT1mdW5jdGlvbihyKXtyZXR1cm4gaC5pc0FycmF5KHIpP2Z1bmN0aW9uKG4pe3JldHVybiB4KG4scil9OmIocil9LGgucHJvcGVydHlPZj1mdW5jdGlvbihyKXtyZXR1cm4gbnVsbD09cj9mdW5jdGlvbigpe306ZnVuY3Rpb24obil7cmV0dXJuIGguaXNBcnJheShuKT94KHIsbik6cltuXX19LGgubWF0Y2hlcj1oLm1hdGNoZXM9ZnVuY3Rpb24ocil7cmV0dXJuIHI9aC5leHRlbmRPd24oe30sciksZnVuY3Rpb24obil7cmV0dXJuIGguaXNNYXRjaChuLHIpfX0saC50aW1lcz1mdW5jdGlvbihuLHIsdCl7dmFyIGU9QXJyYXkoTWF0aC5tYXgoMCxuKSk7cj15KHIsdCwxKTtmb3IodmFyIHU9MDt1PG47dSsrKWVbdV09cih1KTtyZXR1cm4gZX0saC5yYW5kb209ZnVuY3Rpb24obixyKXtyZXR1cm4gbnVsbD09ciYmKHI9bixuPTApLG4rTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKihyLW4rMSkpfSxoLm5vdz1EYXRlLm5vd3x8ZnVuY3Rpb24oKXtyZXR1cm4obmV3IERhdGUpLmdldFRpbWUoKX07dmFyIEw9e1wiJlwiOlwiJmFtcDtcIixcIjxcIjpcIiZsdDtcIixcIj5cIjpcIiZndDtcIiwnXCInOlwiJnF1b3Q7XCIsXCInXCI6XCImI3gyNztcIixcImBcIjpcIiYjeDYwO1wifSxQPWguaW52ZXJ0KEwpLFc9ZnVuY3Rpb24ocil7dmFyIHQ9ZnVuY3Rpb24obil7cmV0dXJuIHJbbl19LG49XCIoPzpcIitoLmtleXMocikuam9pbihcInxcIikrXCIpXCIsZT1SZWdFeHAobiksdT1SZWdFeHAobixcImdcIik7cmV0dXJuIGZ1bmN0aW9uKG4pe3JldHVybiBuPW51bGw9PW4/XCJcIjpcIlwiK24sZS50ZXN0KG4pP24ucmVwbGFjZSh1LHQpOm59fTtoLmVzY2FwZT1XKEwpLGgudW5lc2NhcGU9VyhQKSxoLnJlc3VsdD1mdW5jdGlvbihuLHIsdCl7aC5pc0FycmF5KHIpfHwocj1bcl0pO3ZhciBlPXIubGVuZ3RoO2lmKCFlKXJldHVybiBoLmlzRnVuY3Rpb24odCk/dC5jYWxsKG4pOnQ7Zm9yKHZhciB1PTA7dTxlO3UrKyl7dmFyIGk9bnVsbD09bj92b2lkIDA6bltyW3VdXTt2b2lkIDA9PT1pJiYoaT10LHU9ZSksbj1oLmlzRnVuY3Rpb24oaSk/aS5jYWxsKG4pOml9cmV0dXJuIG59O3ZhciBDPTA7aC51bmlxdWVJZD1mdW5jdGlvbihuKXt2YXIgcj0rK0MrXCJcIjtyZXR1cm4gbj9uK3I6cn0saC50ZW1wbGF0ZVNldHRpbmdzPXtldmFsdWF0ZTovPCUoW1xcc1xcU10rPyklPi9nLGludGVycG9sYXRlOi88JT0oW1xcc1xcU10rPyklPi9nLGVzY2FwZTovPCUtKFtcXHNcXFNdKz8pJT4vZ307dmFyIEo9LyguKV4vLFU9e1wiJ1wiOlwiJ1wiLFwiXFxcXFwiOlwiXFxcXFwiLFwiXFxyXCI6XCJyXCIsXCJcXG5cIjpcIm5cIixcIlxcdTIwMjhcIjpcInUyMDI4XCIsXCJcXHUyMDI5XCI6XCJ1MjAyOVwifSxWPS9cXFxcfCd8XFxyfFxcbnxcXHUyMDI4fFxcdTIwMjkvZywkPWZ1bmN0aW9uKG4pe3JldHVyblwiXFxcXFwiK1Vbbl19O2gudGVtcGxhdGU9ZnVuY3Rpb24oaSxuLHIpeyFuJiZyJiYobj1yKSxuPWguZGVmYXVsdHMoe30sbixoLnRlbXBsYXRlU2V0dGluZ3MpO3ZhciB0LGU9UmVnRXhwKFsobi5lc2NhcGV8fEopLnNvdXJjZSwobi5pbnRlcnBvbGF0ZXx8Sikuc291cmNlLChuLmV2YWx1YXRlfHxKKS5zb3VyY2VdLmpvaW4oXCJ8XCIpK1wifCRcIixcImdcIiksbz0wLGE9XCJfX3ArPSdcIjtpLnJlcGxhY2UoZSxmdW5jdGlvbihuLHIsdCxlLHUpe3JldHVybiBhKz1pLnNsaWNlKG8sdSkucmVwbGFjZShWLCQpLG89dStuLmxlbmd0aCxyP2ErPVwiJytcXG4oKF9fdD0oXCIrcitcIikpPT1udWxsPycnOl8uZXNjYXBlKF9fdCkpK1xcbidcIjp0P2ErPVwiJytcXG4oKF9fdD0oXCIrdCtcIikpPT1udWxsPycnOl9fdCkrXFxuJ1wiOmUmJihhKz1cIic7XFxuXCIrZStcIlxcbl9fcCs9J1wiKSxufSksYSs9XCInO1xcblwiLG4udmFyaWFibGV8fChhPVwid2l0aChvYmp8fHt9KXtcXG5cIithK1wifVxcblwiKSxhPVwidmFyIF9fdCxfX3A9JycsX19qPUFycmF5LnByb3RvdHlwZS5qb2luLFwiK1wicHJpbnQ9ZnVuY3Rpb24oKXtfX3ArPV9fai5jYWxsKGFyZ3VtZW50cywnJyk7fTtcXG5cIithK1wicmV0dXJuIF9fcDtcXG5cIjt0cnl7dD1uZXcgRnVuY3Rpb24obi52YXJpYWJsZXx8XCJvYmpcIixcIl9cIixhKX1jYXRjaChuKXt0aHJvdyBuLnNvdXJjZT1hLG59dmFyIHU9ZnVuY3Rpb24obil7cmV0dXJuIHQuY2FsbCh0aGlzLG4saCl9LGM9bi52YXJpYWJsZXx8XCJvYmpcIjtyZXR1cm4gdS5zb3VyY2U9XCJmdW5jdGlvbihcIitjK1wiKXtcXG5cIithK1wifVwiLHV9LGguY2hhaW49ZnVuY3Rpb24obil7dmFyIHI9aChuKTtyZXR1cm4gci5fY2hhaW49ITAscn07dmFyIEc9ZnVuY3Rpb24obixyKXtyZXR1cm4gbi5fY2hhaW4/aChyKS5jaGFpbigpOnJ9O2gubWl4aW49ZnVuY3Rpb24odCl7cmV0dXJuIGguZWFjaChoLmZ1bmN0aW9ucyh0KSxmdW5jdGlvbihuKXt2YXIgcj1oW25dPXRbbl07aC5wcm90b3R5cGVbbl09ZnVuY3Rpb24oKXt2YXIgbj1bdGhpcy5fd3JhcHBlZF07cmV0dXJuIHUuYXBwbHkobixhcmd1bWVudHMpLEcodGhpcyxyLmFwcGx5KGgsbikpfX0pLGh9LGgubWl4aW4oaCksaC5lYWNoKFtcInBvcFwiLFwicHVzaFwiLFwicmV2ZXJzZVwiLFwic2hpZnRcIixcInNvcnRcIixcInNwbGljZVwiLFwidW5zaGlmdFwiXSxmdW5jdGlvbihyKXt2YXIgdD1lW3JdO2gucHJvdG90eXBlW3JdPWZ1bmN0aW9uKCl7dmFyIG49dGhpcy5fd3JhcHBlZDtyZXR1cm4gdC5hcHBseShuLGFyZ3VtZW50cyksXCJzaGlmdFwiIT09ciYmXCJzcGxpY2VcIiE9PXJ8fDAhPT1uLmxlbmd0aHx8ZGVsZXRlIG5bMF0sRyh0aGlzLG4pfX0pLGguZWFjaChbXCJjb25jYXRcIixcImpvaW5cIixcInNsaWNlXCJdLGZ1bmN0aW9uKG4pe3ZhciByPWVbbl07aC5wcm90b3R5cGVbbl09ZnVuY3Rpb24oKXtyZXR1cm4gRyh0aGlzLHIuYXBwbHkodGhpcy5fd3JhcHBlZCxhcmd1bWVudHMpKX19KSxoLnByb3RvdHlwZS52YWx1ZT1mdW5jdGlvbigpe3JldHVybiB0aGlzLl93cmFwcGVkfSxoLnByb3RvdHlwZS52YWx1ZU9mPWgucHJvdG90eXBlLnRvSlNPTj1oLnByb3RvdHlwZS52YWx1ZSxoLnByb3RvdHlwZS50b1N0cmluZz1mdW5jdGlvbigpe3JldHVybiBTdHJpbmcodGhpcy5fd3JhcHBlZCl9LFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZCYmZGVmaW5lKFwidW5kZXJzY29yZVwiLFtdLGZ1bmN0aW9uKCl7cmV0dXJuIGh9KX0oKTtcbiIsImltcG9ydCB7ZXh0cmFjdEV4dGVuc2lvbn0gZnJvbSBcInV0aWxzL3N0cmluZ3NcIjtcblxuZXhwb3J0IGNvbnN0IGlzUnRtcCA9IGZ1bmN0aW9uIChmaWxlLCB0eXBlKSB7XG4gICAgaWYoZmlsZSl7XG4gICAgICAgIHJldHVybiAoZmlsZS5pbmRleE9mKCdydG1wOicpID09IDAgfHwgdHlwZSA9PSAncnRtcCcpO1xuICAgIH1cbn07XG5leHBvcnQgY29uc3QgaXNXZWJSVEMgPSBmdW5jdGlvbiAoZmlsZSwgdHlwZSkge1xuICAgIGlmKGZpbGUpe1xuICAgICAgICByZXR1cm4gKGZpbGUuaW5kZXhPZignd3M6JykgPT09IDAgfHwgZmlsZS5pbmRleE9mKCd3c3M6JykgPT09IDAgfHwgdHlwZSA9PT0gJ3dlYnJ0YycpO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuZXhwb3J0IGNvbnN0IGlzSGxzID0gZnVuY3Rpb24gKGZpbGUsIHR5cGUpIHtcbiAgICBpZihmaWxlKXtcbiAgICAgICAgcmV0dXJuICggdHlwZSA9PT0gJ2hscycgfHwgIHR5cGUgPT09ICdtM3U4JyB8fCB0eXBlID09PSAnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnIHx8IGV4dHJhY3RFeHRlbnNpb24oZmlsZSkgPT0gJ20zdTgnKTtcblxuICAgIH1cbn07XG5leHBvcnQgY29uc3QgaXNEYXNoID0gZnVuY3Rpb24gKGZpbGUsIHR5cGUpIHtcbiAgICBpZihmaWxlKXtcbiAgICAgICAgcmV0dXJuICggdHlwZSA9PT0gJ21wZCcgfHwgIHR5cGUgPT09ICdkYXNoJyB8fCB0eXBlID09PSAnYXBwbGljYXRpb24vZGFzaCt4bWwnIHx8IGV4dHJhY3RFeHRlbnNpb24oZmlsZSkgPT0gJ21wZCcpO1xuXG4gICAgfVxufTtcbiIsIi8qKlxuICogdXRpbHMgZm9yIHdlYnBhY2tcbiAqL1xuXG5leHBvcnQgY29uc3QgZ2V0U2NyaXB0UGF0aCA9IGZ1bmN0aW9uKHNjcmlwdE5hbWUpIHtcbiAgICBjb25zdCBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2NyaXB0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBzcmMgPSBzY3JpcHRzW2ldLnNyYztcbiAgICAgICAgaWYgKHNyYykge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBzcmMubGFzdEluZGV4T2YoJy8nICsgc2NyaXB0TmFtZSk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzcmMuc3Vic3RyKDAsIGluZGV4ICsgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuICcnO1xufTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDYuIDI5Li5cbiAqL1xuZXhwb3J0IGNvbnN0IHZlcnNpb24gPSBfX1ZFUlNJT05fXztcbiJdLCJzb3VyY2VSb290IjoiIn0=