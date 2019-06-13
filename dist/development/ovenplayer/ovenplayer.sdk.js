/*! OvenPlayerv0.9.599 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
        var nextPlaylistIndex = index;

        var playlist = playlistManager.getPlaylist();
        var hasNextPlaylist = !!playlist[nextPlaylistIndex];

        var nextPlaylistFirstSource = null;
        var currentPlaylistSource = null;

        //init source index
        playerConfig.setSourceIndex(0);
        if (hasNextPlaylist) {
            currentPlaylistSource = playlistManager.getCurrentSources()[currentProvider.getCurrentSource()];
            if (playlist[nextPlaylistIndex].sources && playlist[nextPlaylistIndex].sources.length > 0) {
                nextPlaylistFirstSource = playlist[nextPlaylistIndex].sources[0];
            }

            var isSameProvider = providerController.isSameProvider(currentPlaylistSource, nextPlaylistFirstSource);
            console.log(currentPlaylistSource, nextPlaylistFirstSource);

            /*if(isSameProvider){
                //currentProvider.setCurrentSource(0, isSameProvider);
                currentProvider.load(playlist[nextPlaylistIndex].sources);
            }else{
             }*/
            playlistManager.setCurrentPlaylist(nextPlaylistIndex);
            lazyQueue = (0, _LazyCommandExecutor2["default"])(that, ['play', 'seek', 'stop']);
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
            //that.empty();
            //reuse video element.
            //becuase playlist is auto next playing.
            //Only same video element does not require User Interaction Error.
            //ToDo : refactoring
            return videoElement;
        } else {
            return providerName === _constants.PROVIDER_RTMP ? createFlashVideo(playerConfig.isLoop(), playerConfig.getRtmpBufferTime(), playerConfig.getRtmpBufferTimeMax()) : createHtmlVideo(playerConfig.isLoop());
        }
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
var version = exports.version = '0.9.599-localbuild';

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvQXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvQXBpRXhwYW5zaW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0NvbmZpZ3VyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0V2ZW50RW1pdHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL0xhenlDb21tYW5kRXhlY3V0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9TdXBwb3J0Q2hlY2tlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2NhcHRpb24vTG9hZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvY2FwdGlvbi9NYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvY2FwdGlvbi9wYXJzZXIvU3J0UGFyc2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvY29uc3RhbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvbWVkaWEvTWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3BsYXlsaXN0L01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9Db250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9vdmVucGxheWVyLnNkay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvY2FwdGlvbnMvdnR0Q3VlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9saWtlQSQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3N0cmluZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3VuZGVyc2NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3V0aWxzL3ZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvd2VicGFjay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmVyc2lvbi5qcyJdLCJuYW1lcyI6WyJBcGkiLCJjb250YWluZXIiLCJ0aGF0IiwiY29uc29sZSIsImxvZyIsInZlcnNpb24iLCJPdmVuUGxheWVyQ29uc29sZSIsInBsYXlsaXN0TWFuYWdlciIsInByb3ZpZGVyQ29udHJvbGxlciIsInVzZXJBZ2VudE9iamVjdCIsIm1lZGlhTWFuYWdlciIsImN1cnJlbnRQcm92aWRlciIsInBsYXllckNvbmZpZyIsImxhenlRdWV1ZSIsImNhcHRpb25NYW5hZ2VyIiwicnVuTmV4dFBsYXlsaXN0IiwiaW5kZXgiLCJuZXh0UGxheWxpc3RJbmRleCIsInBsYXlsaXN0IiwiZ2V0UGxheWxpc3QiLCJoYXNOZXh0UGxheWxpc3QiLCJuZXh0UGxheWxpc3RGaXJzdFNvdXJjZSIsImN1cnJlbnRQbGF5bGlzdFNvdXJjZSIsInNldFNvdXJjZUluZGV4IiwiZ2V0Q3VycmVudFNvdXJjZXMiLCJnZXRDdXJyZW50U291cmNlIiwic291cmNlcyIsImxlbmd0aCIsImlzU2FtZVByb3ZpZGVyIiwic2V0Q3VycmVudFBsYXlsaXN0IiwiaW5pdFByb3ZpZGVyIiwiaXNBdXRvU3RhcnQiLCJwbGF5IiwidHJpZ2dlciIsIkFMTF9QTEFZTElTVF9FTkRFRCIsImxhc3RQbGF5UG9zaXRpb24iLCJwaWNrUXVhbGl0eUZyb21Tb3VyY2UiLCJxdWFsaXR5IiwiaSIsImdldFNvdXJjZUluZGV4IiwibG9hZFByb3ZpZGVycyIsImdldEN1cnJlbnRQbGF5TGlzdCIsInRoZW4iLCJQcm92aWRlcnMiLCJFUlJPUlMiLCJJTklUX1VOU1VQUE9SVF9FUlJPUiIsImRlc3Ryb3kiLCJnZXRDdXJyZW50UGxheWxpc3RJbmRleCIsImN1cnJlbnRTb3VyY2VJbmRleCIsInByb3ZpZGVyTmFtZSIsInByb3ZpZGVyIiwiY3JlYXRlTWVkaWEiLCJnZXRDdXJyZW50QWRUYWciLCJQUk9WSURFUl9SVE1QIiwib24iLCJuYW1lIiwiZGF0YSIsIkVSUk9SIiwiTkVUV09SS19VTlNUQUJMRUQiLCJnZXRTb3VyY2VzIiwicGF1c2UiLCJzZXRDdXJyZW50U291cmNlIiwicHJlbG9hZCIsIlJFQURZIiwiZmx1c2giLCJlcnJvciIsIm9mZiIsImNvZGUiLCJ0ZW1wRXJyb3IiLCJJTklUX1VOS05XT05fRVJST1IiLCJpbml0Iiwib3B0aW9ucyIsIm1lZGlhQ29udGFpbmVyIiwiYnJvd3NlciIsImluaXRQbGF5bGlzdCIsImdldFByb3ZpZGVyTmFtZSIsImdldE5hbWUiLCJnZXRDb25maWciLCJnZXRCcm93c2VyIiwic2V0VGltZWNvZGVNb2RlIiwiaXNTaG93IiwiaXNUaW1lY29kZU1vZGUiLCJnZXRGcmFtZXJhdGUiLCJzZWVrRnJhbWUiLCJmcmFtZUNvdW50IiwiZ2V0RHVyYXRpb24iLCJnZXRQb3NpdGlvbiIsImdldFZvbHVtZSIsInNldFZvbHVtZSIsInZvbHVtZSIsInNldE11dGUiLCJzdGF0ZSIsImdldE11dGUiLCJsb2FkIiwic2V0Q3VycmVudFF1YWxpdHkiLCJzZWVrIiwicG9zaXRpb24iLCJzZXRQbGF5YmFja1JhdGUiLCJwbGF5YmFja1JhdGUiLCJnZXRQbGF5YmFja1JhdGUiLCJnZXRDdXJyZW50UGxheWxpc3QiLCJjdXJyZW50U291cmNlIiwibmV3U291cmNlIiwicmVzdWx0U291cmNlSW5kZXgiLCJQUk9WSURFUl9ITFMiLCJnZXRRdWFsaXR5TGV2ZWxzIiwiZ2V0Q3VycmVudFF1YWxpdHkiLCJxdWFsaXR5SW5kZXgiLCJpc0F1dG9RdWFsaXR5Iiwic2V0QXV0b1F1YWxpdHkiLCJpc0F1dG8iLCJnZXRDYXB0aW9uTGlzdCIsImdldEN1cnJlbnRDYXB0aW9uIiwic2V0Q3VycmVudENhcHRpb24iLCJhZGRDYXB0aW9uIiwidHJhY2siLCJyZW1vdmVDYXB0aW9uIiwiZ2V0QnVmZmVyIiwiZ2V0U3RhdGUiLCJzdG9wIiwicmVtb3ZlIiwiREVTVFJPWSIsIk92ZW5QbGF5ZXJTREsiLCJyZW1vdmVQbGF5ZXIiLCJnZXRDb250YWluZXJJZCIsImdldFBsYXllckxpc3QiLCJnZXRWZXJzaW9uIiwiQXBpUnRtcEV4cGFuc2lvbiIsImV4dGVybmFsQ2FsbGJhY2tDcmVlcCIsInJlc3VsdCIsInRyaWdnZXJFdmVudEZyb21FeHRlcm5hbCIsIkNvbmZpZ3VyYXRvciIsImNvbXBvc2VTb3VyY2VPcHRpb25zIiwiRGVmYXVsdHMiLCJwbGF5YmFja1JhdGVzIiwibXV0ZSIsImxvb3AiLCJjb250cm9scyIsImF1dG9TdGFydCIsInRpbWVjb2RlIiwic291cmNlSW5kZXgiLCJoaWRlUGxheWxpc3RJY29uIiwicnRtcEJ1ZmZlclRpbWUiLCJydG1wQnVmZmVyVGltZU1heCIsInNlcmlhbGl6ZSIsInZhbCIsInVuZGVmaW5lZCIsImxvd2VyY2FzZVZhbCIsInRvTG93ZXJDYXNlIiwiaXNOYU4iLCJOdW1iZXIiLCJwYXJzZUZsb2F0IiwiZGVzZXJpYWxpemUiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImtleSIsImNvbmZpZyIsImZpbHRlciIsIl8iLCJpc051bWJlciIsInJhdGUiLCJtYXAiLCJNYXRoIiwicm91bmQiLCJpbmRleE9mIiwicHVzaCIsInNvcnQiLCJjb25maWdQbGF5bGlzdCIsIm9iaiIsInBpY2siLCJpc0FycmF5IiwiZmVlZERhdGEiLCJkdXJhdGlvbiIsInNwZWMiLCJzZXRDb25maWciLCJ2YWx1ZSIsImdldENvbnRhaW5lciIsImdldFF1YWxpdHlMYWJlbCIsInF1YWxpdHlMYWJlbCIsInNldFF1YWxpdHlMYWJlbCIsIm5ld0xhYmVsIiwiQ09OVEVOVF9USU1FX01PREVfQ0hBTkdFRCIsImdldFJ0bXBCdWZmZXJUaW1lIiwiZ2V0UnRtcEJ1ZmZlclRpbWVNYXgiLCJpc011dGUiLCJpc0xvb3AiLCJpc0NvbnRyb2xzIiwiZ2V0UGxheWJhY2tSYXRlcyIsInNldFBsYXlsaXN0IiwiRXZlbnRFbWl0dGVyIiwib2JqZWN0IiwiX2V2ZW50cyIsInRyaWdnZXJFdmVudHMiLCJldmVudHMiLCJhcmdzIiwiY29udGV4dCIsImV2ZW50IiwibGlzdGVuZXIiLCJhcHBseSIsInNsaWNlIiwiY2FsbCIsImFyZ3VtZW50cyIsImFsbEV2ZW50cyIsImFsbCIsIm5hbWVzIiwibCIsInJldGFpbiIsImoiLCJrIiwiX2xpc3RlbmVyIiwib25jZSIsImNvdW50Iiwib25jZUNhbGxiYWNrIiwiTGF6eUNvbW1hbmRFeGVjdXRvciIsImluc3RhbmNlIiwicXVldWVkQ29tbWFuZHMiLCJjb21tYW5kUXVldWUiLCJ1bmRlY29yYXRlZE1ldGhvZHMiLCJleGVjdXRlTW9kZSIsImNvbW1hbmQiLCJtZXRob2QiLCJBcnJheSIsInByb3RvdHlwZSIsImFkZFF1ZXVlIiwiZXhlY3V0ZVF1ZXVlZENvbW1hbmRzIiwic2hpZnQiLCJzZXRFeGVjdXRlTW9kZSIsIm1vZGUiLCJnZXRVbmRlY29yYXRlZE1ldGhvZHMiLCJnZXRRdWV1ZSIsImVtcHR5IiwicmVtb3ZlQW5kRXhjdXRlT25jZSIsImNvbW1hbmRfIiwiY29tbWFuZFF1ZXVlSXRlbSIsImZpbmRXaGVyZSIsInNwbGljZSIsImZpbmRJbmRleCIsIlN1cHBvcnRDaGVja2VyIiwic3VwcG9ydExpc3QiLCJjaGVja1N1cHBvcnQiLCJzb3VyY2UiLCJNaW1lVHlwZXMiLCJhYWMiLCJtcDQiLCJmNHYiLCJtNHYiLCJtb3YiLCJtcDMiLCJtcGVnIiwib2d2Iiwib2dnIiwib2dhIiwidm9yYmlzIiwid2VibSIsImY0YSIsIm0zdTgiLCJtM3UiLCJobHMiLCJ2aWRlbyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNhblBsYXlUeXBlIiwiZmlsZSIsInR5cGUiLCJtaW1lVHlwZSIsIndpbmRvdyIsIk1lZGlhU291cmNlIiwiV2ViS2l0TWVkaWFTb3VyY2UiLCJpc0hsc1N1cHBvcnQiLCJnZXRNZWRpYVNvdXJjZSIsIm1lZGlhU291cmNlIiwic291cmNlQnVmZmVyIiwiU291cmNlQnVmZmVyIiwiV2ViS2l0U291cmNlQnVmZmVyIiwiaXNUeXBlU3VwcG9ydGVkIiwic291cmNlQnVmZmVyVmFsaWRBUEkiLCJhcHBlbmRCdWZmZXIiLCJ0ZXN0Rmxhc2giLCJzdXBwb3J0IiwiQWN0aXZlWE9iamVjdCIsImUiLCJuYXZpZ2F0b3IiLCJtaW1lVHlwZXMiLCJvcyIsImZpbmRQcm92aWRlck5hbWVCeVNvdXJjZSIsInNvcnVjZV8iLCJmaW5kUHJvdmlkZXJOYW1lc0J5UGxheWxpc3QiLCJwbGF5bGlzdEl0ZW0iLCJzdXBwb3J0TmFtZXMiLCJpdGVtIiwic3VwcG9ydGVkIiwiTG9hZGVyIiwiY29udmVydFRvVlRUQ3VlcyIsImN1ZXMiLCJWVFRDdWUiLCJjdWUiLCJzdGFydCIsImVuZCIsInRleHQiLCJsYW5ndWFnZSIsInN1Y2Nlc3NDYWxsYmFjayIsImVycm9yQ2FsbGJhY2siLCJyZXF1ZXN0T3B0aW9ucyIsInVybCIsImVuY29kaW5nIiwibG9hZFJlcXVlc3REb3dubG9kZXIiLCJSZXF1ZXN0IiwicmVzcG9uc2UiLCJib2R5IiwidnR0Q3VlcyIsImxvYWRWdHRQYXJzZXIiLCJwYXJzZXIiLCJXZWJWVFQiLCJQYXJzZXIiLCJTdHJpbmdEZWNvZGVyIiwib25jdWUiLCJvbmZsdXNoIiwicGFyc2UiLCJsb2FkU21pUGFyc2VyIiwicGFyc2VkRGF0YSIsIlNtaVBhcnNlciIsImZpeGVkTGFuZyIsInJlcXVpcmUiLCJlcnIiLCJpc1N1cHBvcnQiLCJraW5kIiwiTWFuYWdlciIsImFwaSIsInBsYXlsaXN0SW5kZXgiLCJjYXB0aW9uTGlzdCIsImN1cnJlbnRDYXB0aW9uSW5kZXgiLCJjYXB0aW9uTG9hZGVyIiwiaXNGaXNydExvYWQiLCJpc1Nob3dpbmciLCJiaW5kVHJhY2siLCJsYWJlbCIsImlkIiwidHJhY2tzQ291bnQiLCJ0cmFja0lkIiwicHJlZml4IiwiZGVmYXVsdHRyYWNrIiwiY2hhbmdlQ3VycmVudENhcHRpb24iLCJDT05URU5UX0NBUFRJT05fQ0hBTkdFRCIsInRyYWNrcyIsImxhbmciLCJjYXB0aW9uSWQiLCJQTEFZRVJfQ0FQVElPTl9FUlJPUiIsIkNPTlRFTlRfVElNRSIsIm1ldGEiLCJjdXJyZW50Q3VlcyIsInN0YXJ0VGltZSIsImVuZFRpbWUiLCJDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQiLCJmbHVzaENhcHRpb25MaXN0IiwibGFzdENhcHRpb25JbmRleCIsIl9pbmRleCIsIl9lbnRyeSIsImVudHJ5IiwiYXJyYXkiLCJzcGxpdCIsImlkeCIsImxpbmUiLCJzdWJzdHIiLCJqb2luIiwiU3J0UGFyc2VyIiwiY2FwdGlvbnMiLCJsaXN0IiwiU1RBVEVfQlVGRkVSSU5HIiwiU1RBVEVfSURMRSIsIlNUQVRFX0NPTVBMRVRFIiwiU1RBVEVfUEFVU0VEIiwiU1RBVEVfUExBWUlORyIsIlNUQVRFX0VSUk9SIiwiU1RBVEVfTE9BRElORyIsIlNUQVRFX1NUQUxMRUQiLCJTVEFURV9BRF9MT0FESU5HIiwiU1RBVEVfQURfTE9BREVEIiwiU1RBVEVfQURfUExBWUlORyIsIlNUQVRFX0FEX1BBVVNFRCIsIlNUQVRFX0FEX0NPTVBMRVRFIiwiU1RBVEVfQURfRVJST1IiLCJQTEFZRVJfQURfQ0xJQ0siLCJQUk9WSURFUl9IVE1MNSIsIlBST1ZJREVSX1dFQlJUQyIsIlBST1ZJREVSX0RBU0giLCJDT05URU5UX0NPTVBMRVRFIiwiQ09OVEVOVF9TRUVLIiwiQ09OVEVOVF9CVUZGRVJfRlVMTCIsIkRJU1BMQVlfQ0xJQ0siLCJDT05URU5UX0xPQURFRCIsIlBMQVlMSVNUX0NIQU5HRUQiLCJDT05URU5UX1NFRUtFRCIsIlBMQVlFUl9TVEFURSIsIlBMQVlFUl9DT01QTEVURSIsIlBMQVlFUl9QQVVTRSIsIlBMQVlFUl9QTEFZIiwiUExBWUVSX0NMSUNLRUQiLCJQTEFZRVJfUkVTSVpFRCIsIlBMQVlFUl9MT0FESU5HIiwiUExBWUVSX0ZVTExTQ1JFRU5fUkVRVUVTVCIsIlBMQVlFUl9GVUxMU0NSRUVOX0NIQU5HRUQiLCJQTEFZRVJfV0FSTklORyIsIkFEX0NIQU5HRUQiLCJBRF9USU1FIiwiQ09OVEVOVF9CVUZGRVIiLCJDT05URU5UX1JBVEVfQ0hBTkdFIiwiQ09OVEVOVF9WT0xVTUUiLCJDT05URU5UX01VVEUiLCJDT05URU5UX01FVEEiLCJDT05URU5UX1NPVVJDRV9DSEFOR0VEIiwiQ09OVEVOVF9MRVZFTF9DSEFOR0VEIiwiUExBWUJBQ0tfUkFURV9DSEFOR0VEIiwiT01FX1AyUF9NT0RFIiwiSU5JVF9SVE1QX1NFVFVQX0VSUk9SIiwiSU5JVF9EQVNIX1VOU1VQUE9SVCIsIklOSVRfQURTX0VSUk9SIiwiSU5JVF9EQVNIX05PVEZPVU5EIiwiSU5JVF9ITFNKU19OT1RGT1VORCIsIlBMQVlFUl9VTktOV09OX0VSUk9SIiwiUExBWUVSX1VOS05XT05fT1BFUkFUSU9OX0VSUk9SIiwiUExBWUVSX1VOS05XT05fTkVXV09SS19FUlJPUiIsIlBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUiIsIlBMQVlFUl9GSUxFX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19XU19FUlJPUiIsIlBMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUiIsIlBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19DUkVBVEVfQU5TV0VSX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUiIsIlBMQVlFUl9XRUJSVENfTkVUV09SS19TTE9XIiwiV0FSTl9NU0dfTVVURURQTEFZIiwibWVzc2FnZSIsInJlYXNvbiIsIlVJX0lDT05TIiwidm9sdW1lX211dGUiLCJicm93c2VySW5mbyIsIlNXRlBhdGgiLCJyb290SWQiLCJnZXRBdHRyaWJ1dGUiLCIkY29udGFpbmVyIiwidmlkZW9FbGVtZW50IiwiY3JlYXRlSHRtbFZpZGVvIiwic2V0QXR0cmlidXRlIiwiYXBwZW5kIiwiY3JlYXRlRmxhc2hWaWRlbyIsImJ1ZmZlclRpbWUiLCJidWZmZXJUaW1lTWF4IiwibW92aWUiLCJmbGFzaHZhcnMiLCJhbGxvd3NjcmlwdGFjY2VzcyIsImFsbG93ZnVsbHNjcmVlbiIsIm1lbnUiLCJxdWFsIiwiYmdjb2xvciIsIndtb2RlIiwiYnJvd3Nlck1ham9yVmVyc2lvbiIsImFwcGVuZENoaWxkIiwiY3JlYXRlQWRDb250YWluZXIiLCJhZENvbnRhaW5lciIsInJlbW92ZUNoaWxkIiwiY3VycmVudFBsYXlsaXN0SXRlbSIsImN1cnJlbnRJbmRleCIsInN1cHBvcnRDaGVja2VyIiwibWFrZVByZXR0eVNvdXJjZSIsInNvdXJjZV8iLCJob3N0IiwiYXBwbGljYXRpb24iLCJzdHJlYW0iLCJtaW1ldHlwZVJlZ0V4IiwidGVzdCIsInJlcGxhY2UiLCJwcmV0dGllZFBsYXlsaXN0IiwidGl0bGUiLCJsZXZlbHMiLCJwcmV0dHlTb3VyY2UiLCJkZWZhdWx0U291cmNlIiwidG9TdHJpbmciLCJjb25jYXQiLCJhZFRhZ1VybCIsIkNvbnRyb2xsZXIiLCJzdXBwb3J0Q2hhY2tlciIsInJlZ2lzdGVQcm92aWRlciIsIlByb3ZpZGVyTG9hZGVyIiwiaHRtbDUiLCJFcnJvciIsIndlYnJ0YyIsImRhc2giLCJydG1wIiwic3VwcG9ydGVkUHJvdmlkZXJOYW1lcyIsIlByb21pc2UiLCJyZWplY3QiLCJmaW5kQnlOYW1lIiwiZ2V0UHJvdmlkZXJCeVNvdXJjZSIsInN1cHBvcnRlZFByb3ZpZGVyTmFtZSIsIl9fd2VicGFja19wdWJsaWNfcGF0aF9fIiwicGxheWVyTGlzdCIsImNoZWNrQW5kR2V0Q29udGFpbmVyRWxlbWVudCIsImNvbnRhaW5lckVsZW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIm5vZGVUeXBlIiwiY3JlYXRlIiwicGxheWVySW5zdGFuY2UiLCJnZXRQbGF5ZXJCeUNvbnRhaW5lcklkIiwiY29udGFpbmVySWQiLCJnZXRQbGF5ZXJCeUluZGV4IiwicGxheWVySWQiLCJnZW5lcmF0ZVdlYnJ0Y1VybHMiLCJkZWJ1ZyIsImlzRGVidWdNb2RlIiwiZ2V0QnJvd3Nlckxhbmd1YWdlIiwibmF2IiwiYnJvd3Nlckxhbmd1YWdlUHJvcGVydHlLZXlzIiwibGFuZ3VhZ2VzIiwiYW5hbFVzZXJBZ2VudCIsInVua25vd24iLCJzY3JlZW5TaXplIiwic2NyZWVuIiwid2lkdGgiLCJoZWlnaHQiLCJuVmVyIiwiYXBwVmVyc2lvbiIsIm5BZ3QiLCJ1c2VyQWdlbnQiLCJhcHBOYW1lIiwibWFqb3JWZXJzaW9uIiwicGFyc2VJbnQiLCJpc1dlYnZpZXciLCJuYW1lT2Zmc2V0IiwidmVyT2Zmc2V0IiwiaXgiLCJzdWJzdHJpbmciLCJsYXN0SW5kZXhPZiIsInRvVXBwZXJDYXNlIiwibW9iaWxlIiwiY29va2llRW5hYmxlZCIsImNvb2tpZSIsImNsaWVudFN0cmluZ3MiLCJzIiwiciIsImNzIiwib3NWZXJzaW9uIiwiZXhlYyIsImJyb3dzZXJWZXJzaW9uIiwidWEiLCJjb29raWVzIiwiYXV0b0tleXdvcmQiLCJkaXJlY3Rpb25TZXR0aW5nIiwiYWxpZ25TZXR0aW5nIiwiZmluZERpcmVjdGlvblNldHRpbmciLCJkaXIiLCJmaW5kQWxpZ25TZXR0aW5nIiwiYWxpZ24iLCJleHRlbmQiLCJjb2JqIiwicCIsImlzSUU4IiwiYmFzZU9iaiIsImVudW1lcmFibGUiLCJoYXNCZWVuUmVzZXQiLCJfaWQiLCJfcGF1c2VPbkV4aXQiLCJfc3RhcnRUaW1lIiwiX2VuZFRpbWUiLCJfdGV4dCIsIl9yZWdpb24iLCJfdmVydGljYWwiLCJfc25hcFRvTGluZXMiLCJfbGluZSIsIl9saW5lQWxpZ24iLCJfcG9zaXRpb24iLCJfcG9zaXRpb25BbGlnbiIsIl9zaXplIiwiX2FsaWduIiwiZGVmaW5lUHJvcGVydHkiLCJnZXQiLCJzZXQiLCJUeXBlRXJyb3IiLCJzZXR0aW5nIiwiU3ludGF4RXJyb3IiLCJkaXNwbGF5U3RhdGUiLCJnZXRDdWVBc0hUTUwiLCJjb252ZXJ0Q3VlVG9ET01UcmVlIiwiTGEkIiwic2VsZWN0b3JPckVsZW1lbnQiLCJyZXR1cm5Ob2RlIiwiJGVsZW1lbnQiLCJzZWxlY3RvciIsIm5vZGVMaXN0IiwicXVlcnlTZWxlY3RvckFsbCIsImlzRWxlbWVudCIsImV2ZXJ5IiwiZmluZCIsImNzcyIsImVsZW1lbnQiLCJzdHlsZSIsImFkZENsYXNzIiwiY2xhc3NMaXN0IiwiYWRkIiwiY2xhc3NOYW1lcyIsImNsYXNzTmFtZSIsInJlbW92ZUNsYXNzIiwiUmVnRXhwIiwicmVtb3ZlQXR0cmlidXRlIiwiYXR0ck5hbWUiLCJzaG93IiwiZGlzcGxheSIsImhpZGUiLCJ0ZXh0Q29udGVudCIsImh0bWwiLCJpbm5lckhUTUwiLCJoYXNDbGFzcyIsImNvbnRhaW5zIiwiaXMiLCIkdGFyZ2V0RWxlbWVudCIsIm9mZnNldCIsInJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0b3AiLCJzY3JvbGxUb3AiLCJsZWZ0Iiwic2Nyb2xsTGVmdCIsImNsaWVudFdpZHRoIiwiY2xpZW50SGVpZ2h0IiwiYXR0ciIsInJlcGxhY2VXaXRoIiwicGFyZW50RWxlbWVudCIsImhhc0NoaWxkTm9kZXMiLCJmaXJzdENoaWxkIiwiY2xvc2VzdCIsInNlbGVjdG9yU3RyaW5nIiwiY2xvc2VzdEVsZW1lbnQiLCJ0cmltIiwibmF0dXJhbEhtcyIsImhtc1RvU2Vjb25kIiwic3RyaW5nIiwiZXh0cmFjdEV4dGVuc2lvbiIsInBhdGgiLCJnZXRBenVyZUZpbGVGb3JtYXQiLCJleHRlbnNpb24iLCJhenVyZWRGb3JtYXQiLCJzZWNvbmQiLCJzZWNOdW0iLCJob3VycyIsImZsb29yIiwibWludXRlcyIsInNlY29uZHMiLCJzdHIiLCJmcmFtZVJhdGUiLCJhcnIiLCJhcnJMZW5ndGgiLCJzZWMiLCJzZWNJbmRleCIsIm4iLCJzZWxmIiwiZ2xvYmFsIiwibyIsIlN5bWJvbCIsInUiLCJjIiwiaGFzT3duUHJvcGVydHkiLCJ0IiwiYSIsImYiLCJoIiwiX3dyYXBwZWQiLCJleHBvcnRzIiwibW9kdWxlIiwiVkVSU0lPTiIsInYiLCJ5IiwiZCIsIml0ZXJhdGVlIiwiaWRlbnRpdHkiLCJpc0Z1bmN0aW9uIiwiaXNPYmplY3QiLCJtYXRjaGVyIiwicHJvcGVydHkiLCJnIiwibWF4IiwibSIsImIiLCJ4IiwicG93IiwiQSIsInciLCJlYWNoIiwiY29sbGVjdCIsIk8iLCJyZWR1Y2UiLCJmb2xkbCIsImluamVjdCIsInJlZHVjZVJpZ2h0IiwiZm9sZHIiLCJkZXRlY3QiLCJmaW5kS2V5Iiwic2VsZWN0IiwibmVnYXRlIiwic29tZSIsImFueSIsImluY2x1ZGVzIiwiaW5jbHVkZSIsInZhbHVlcyIsImludm9rZSIsInBsdWNrIiwid2hlcmUiLCJtaW4iLCJzaHVmZmxlIiwic2FtcGxlIiwicmFuZG9tIiwiY2xvbmUiLCJzb3J0QnkiLCJjcml0ZXJpYSIsImdyb3VwQnkiLCJpbmRleEJ5IiwiY291bnRCeSIsIlMiLCJ0b0FycmF5IiwiaXNTdHJpbmciLCJtYXRjaCIsInNpemUiLCJwYXJ0aXRpb24iLCJmaXJzdCIsImhlYWQiLCJ0YWtlIiwiaW5pdGlhbCIsImxhc3QiLCJyZXN0IiwidGFpbCIsImRyb3AiLCJjb21wYWN0IiwiQm9vbGVhbiIsIk0iLCJpc0FyZ3VtZW50cyIsImZsYXR0ZW4iLCJ3aXRob3V0IiwiZGlmZmVyZW5jZSIsInVuaXEiLCJ1bmlxdWUiLCJpc0Jvb2xlYW4iLCJ1bmlvbiIsImludGVyc2VjdGlvbiIsInVuemlwIiwiemlwIiwiRiIsImZpbmRMYXN0SW5kZXgiLCJzb3J0ZWRJbmRleCIsIkUiLCJyYW5nZSIsImNlaWwiLCJjaHVuayIsIk4iLCJiaW5kIiwicGFydGlhbCIsInBsYWNlaG9sZGVyIiwiYmluZEFsbCIsIm1lbW9pemUiLCJjYWNoZSIsImRlbGF5Iiwic2V0VGltZW91dCIsImRlZmVyIiwidGhyb3R0bGUiLCJsZWFkaW5nIiwibm93IiwiY2xlYXJUaW1lb3V0IiwidHJhaWxpbmciLCJjYW5jZWwiLCJkZWJvdW5jZSIsIndyYXAiLCJjb21wb3NlIiwiYWZ0ZXIiLCJiZWZvcmUiLCJyZXN0QXJndW1lbnRzIiwiSSIsInByb3BlcnR5SXNFbnVtZXJhYmxlIiwiVCIsIkIiLCJjb25zdHJ1Y3RvciIsImFsbEtleXMiLCJtYXBPYmplY3QiLCJwYWlycyIsImludmVydCIsImZ1bmN0aW9ucyIsIm1ldGhvZHMiLCJSIiwiZXh0ZW5kT3duIiwiYXNzaWduIiwicSIsIksiLCJ6Iiwib21pdCIsIlN0cmluZyIsImRlZmF1bHRzIiwidGFwIiwiaXNNYXRjaCIsInZhbHVlT2YiLCJwb3AiLCJpc0VxdWFsIiwiaXNFbXB0eSIsIkQiLCJjaGlsZE5vZGVzIiwiSW50OEFycmF5IiwiaXNGaW5pdGUiLCJpc1N5bWJvbCIsImlzTnVsbCIsImlzVW5kZWZpbmVkIiwiaGFzIiwibm9Db25mbGljdCIsImNvbnN0YW50Iiwibm9vcCIsInByb3BlcnR5T2YiLCJtYXRjaGVzIiwidGltZXMiLCJEYXRlIiwiZ2V0VGltZSIsIkwiLCJQIiwiVyIsImVzY2FwZSIsInVuZXNjYXBlIiwiQyIsInVuaXF1ZUlkIiwidGVtcGxhdGVTZXR0aW5ncyIsImV2YWx1YXRlIiwiaW50ZXJwb2xhdGUiLCJKIiwiVSIsIlYiLCIkIiwidGVtcGxhdGUiLCJ2YXJpYWJsZSIsIkZ1bmN0aW9uIiwiY2hhaW4iLCJfY2hhaW4iLCJHIiwibWl4aW4iLCJ0b0pTT04iLCJkZWZpbmUiLCJpc1J0bXAiLCJpc1dlYlJUQyIsImlzSGxzIiwiaXNEYXNoIiwiZ2V0U2NyaXB0UGF0aCIsInNjcmlwdE5hbWUiLCJzY3JpcHRzIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJzcmMiLCJfX1ZFUlNJT05fXyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQVEsb0JBQW9CO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBLGlEQUF5QyxzNEJBQXM0QjtBQUMvNkI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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LENBTE0sQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQlA7Ozs7QUFJTyxJQUFNa2tCLHdDQUFnQixTQUFoQkEsYUFBZ0IsQ0FBU0MsVUFBVCxFQUFxQjtBQUM5QyxRQUFNQyxVQUFVdmtCLFNBQVN3a0Isb0JBQVQsQ0FBOEIsUUFBOUIsQ0FBaEI7QUFDQSxTQUFLLElBQUl0eUIsSUFBSSxDQUFiLEVBQWdCQSxJQUFJcXlCLFFBQVFoekIsTUFBNUIsRUFBb0NXLEdBQXBDLEVBQXlDO0FBQ3JDLFlBQU11eUIsTUFBTUYsUUFBUXJ5QixDQUFSLEVBQVd1eUIsR0FBdkI7QUFDQSxZQUFJQSxHQUFKLEVBQVM7QUFDTCxnQkFBTTd6QixRQUFRNnpCLElBQUkxVCxXQUFKLENBQWdCLE1BQU11VCxVQUF0QixDQUFkO0FBQ0EsZ0JBQUkxekIsU0FBUyxDQUFiLEVBQWdCO0FBQ1osdUJBQU82ekIsSUFBSWxlLE1BQUosQ0FBVyxDQUFYLEVBQWMzVixRQUFRLENBQXRCLENBQVA7QUFDSDtBQUNKO0FBQ0o7QUFDRCxXQUFPLEVBQVA7QUFDSCxDQVpNLEM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSlA7OztBQUdPLElBQU1YLDRCQUFVeTBCLG9CQUFoQixDIiwiZmlsZSI6Im92ZW5wbGF5ZXIuc2RrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG5cblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0fTtcblxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJvdmVucGxheWVyLnNka1wiOiAwXG4gXHR9O1xuXG5cblxuIFx0Ly8gc2NyaXB0IHBhdGggZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIGpzb25wU2NyaXB0U3JjKGNodW5rSWQpIHtcbiBcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyAoe1wib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1fm92ZW5wbGF5ZX4yZWMxOTNhY1wiOlwib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1fm92ZW5wbGF5ZX4yZWMxOTNhY1wiLFwib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1fm92ZW5wbGF5ZX43YWZkNjhjZlwiOlwib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJ+b3ZlbnBsYXllci5wcm92aWRlci5IbHNQcm92aWRlcn5vdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1fm92ZW5wbGF5ZX43YWZkNjhjZlwiLFwib3ZlbnBsYXllci5wcm92aWRlci5EYXNoUHJvdmlkZXJcIjpcIm92ZW5wbGF5ZXIucHJvdmlkZXIuRGFzaFByb3ZpZGVyXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1XCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1XCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLldlYlJUQ1Byb3ZpZGVyXCI6XCJvdmVucGxheWVyLnByb3ZpZGVyLldlYlJUQ1Byb3ZpZGVyXCIsXCJvdmVucGxheWVyLnByb3ZpZGVyLlJ0bXBQcm92aWRlclwiOlwib3ZlbnBsYXllci5wcm92aWRlci5SdG1wUHJvdmlkZXJcIixcInNtaXBhcnNlclwiOlwic21pcGFyc2VyXCIsXCJ2ZW5kb3JzfmRvd25sb2FkZXJcIjpcInZlbmRvcnN+ZG93bmxvYWRlclwiLFwiZG93bmxvYWRlclwiOlwiZG93bmxvYWRlclwiLFwidnR0cGFyc2VyXCI6XCJ2dHRwYXJzZXJcIn1bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuanNcIlxuIFx0fVxuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lID0gZnVuY3Rpb24gcmVxdWlyZUVuc3VyZShjaHVua0lkKSB7XG4gXHRcdHZhciBwcm9taXNlcyA9IFtdO1xuXG5cbiBcdFx0Ly8gSlNPTlAgY2h1bmsgbG9hZGluZyBmb3IgamF2YXNjcmlwdFxuXG4gXHRcdHZhciBpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgeyAvLyAwIG1lYW5zIFwiYWxyZWFkeSBpbnN0YWxsZWRcIi5cblxuIFx0XHRcdC8vIGEgUHJvbWlzZSBtZWFucyBcImN1cnJlbnRseSBsb2FkaW5nXCIuXG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSk7XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdC8vIHNldHVwIFByb21pc2UgaW4gY2h1bmsgY2FjaGVcbiBcdFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRcdGluc3RhbGxlZENodW5rRGF0YSA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IFtyZXNvbHZlLCByZWplY3RdO1xuIFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSA9IHByb21pc2UpO1xuXG4gXHRcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG4gXHRcdFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gXHRcdFx0XHR2YXIgb25TY3JpcHRDb21wbGV0ZTtcblxuIFx0XHRcdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuIFx0XHRcdFx0c2NyaXB0LnRpbWVvdXQgPSAxMjA7XG4gXHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuIFx0XHRcdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzY3JpcHQuc3JjID0ganNvbnBTY3JpcHRTcmMoY2h1bmtJZCk7XG5cbiBcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiBcdFx0XHRcdFx0Ly8gYXZvaWQgbWVtIGxlYWtzIGluIElFLlxuIFx0XHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuIFx0XHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG4gXHRcdFx0XHRcdHZhciBjaHVuayA9IGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdFx0XHRcdFx0aWYoY2h1bmsgIT09IDApIHtcbiBcdFx0XHRcdFx0XHRpZihjaHVuaykge1xuIFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcbiBcdFx0XHRcdFx0XHRcdHZhciByZWFsU3JjID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmM7XG4gXHRcdFx0XHRcdFx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoJ0xvYWRpbmcgY2h1bmsgJyArIGNodW5rSWQgKyAnIGZhaWxlZC5cXG4oJyArIGVycm9yVHlwZSArICc6ICcgKyByZWFsU3JjICsgJyknKTtcbiBcdFx0XHRcdFx0XHRcdGVycm9yLnR5cGUgPSBlcnJvclR5cGU7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcbiBcdFx0XHRcdFx0XHRcdGNodW5rWzFdKGVycm9yKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gdW5kZWZpbmVkO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9O1xuIFx0XHRcdFx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gXHRcdFx0XHRcdG9uU2NyaXB0Q29tcGxldGUoeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pO1xuIFx0XHRcdFx0fSwgMTIwMDAwKTtcbiBcdFx0XHRcdHNjcmlwdC5vbmVycm9yID0gc2NyaXB0Lm9ubG9hZCA9IG9uU2NyaXB0Q29tcGxldGU7XG4gXHRcdFx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gXHR9O1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIG9uIGVycm9yIGZ1bmN0aW9uIGZvciBhc3luYyBsb2FkaW5nXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm9lID0gZnVuY3Rpb24oZXJyKSB7IGNvbnNvbGUuZXJyb3IoZXJyKTsgdGhyb3cgZXJyOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2pzL292ZW5wbGF5ZXIuc2RrLmpzXCIpO1xuIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0aWYgKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XG5cdFx0bW9kdWxlLnBhdGhzID0gW107XG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XG5cdFx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xuXHR9XG5cdHJldHVybiBtb2R1bGU7XG59O1xuIiwiaW1wb3J0IENhcHRpb25NYW5hZ2VyIGZyb20gXCJhcGkvY2FwdGlvbi9NYW5hZ2VyXCI7XG5pbXBvcnQgQ29uZmlndXJhdG9yIGZyb20gXCJhcGkvQ29uZmlndXJhdG9yXCI7XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJhcGkvRXZlbnRFbWl0dGVyXCI7XG5pbXBvcnQgTGF6eUNvbW1hbmRFeGVjdXRvciBmcm9tIFwiYXBpL0xhenlDb21tYW5kRXhlY3V0b3JcIjtcbmltcG9ydCBNZWRpYU1hbmFnZXIgZnJvbSBcImFwaS9tZWRpYS9NYW5hZ2VyXCI7XG5pbXBvcnQgUGxheWxpc3RNYW5hZ2VyIGZyb20gXCJhcGkvcGxheWxpc3QvTWFuYWdlclwiO1xuaW1wb3J0IFByb3ZpZGVyQ29udHJvbGxlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL0NvbnRyb2xsZXJcIjtcbmltcG9ydCB7UkVBRFksIEVSUk9SUywgRVJST1IsIENPTlRFTlRfVElNRV9NT0RFX0NIQU5HRUQsIElOSVRfVU5LTldPTl9FUlJPUiwgSU5JVF9VTlNVUFBPUlRfRVJST1IsIERFU1RST1ksIE5FVFdPUktfVU5TVEFCTEVELFxuICAgIFBMQVlFUl9GSUxFX0VSUk9SLCBQUk9WSURFUl9EQVNILCBQUk9WSURFUl9ITFMsIFBST1ZJREVSX1dFQlJUQywgUFJPVklERVJfSFRNTDUsIFBST1ZJREVSX1JUTVAsIEFMTF9QTEFZTElTVF9FTkRFRH0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcbmltcG9ydCB7dmVyc2lvbn0gZnJvbSAndmVyc2lvbic7XG5pbXBvcnQge0FwaVJ0bXBFeHBhbnNpb259IGZyb20gJ2FwaS9BcGlFeHBhbnNpb25zJztcbmltcG9ydCB7YW5hbFVzZXJBZ2VudH0gZnJvbSBcInV0aWxzL2Jyb3dzZXJcIjtcbmltcG9ydCBMQSQgZnJvbSAndXRpbHMvbGlrZUEkJztcblxuLyoqXG4gKiBAYnJpZWYgICBUaGlzIG9iamVjdCBjb25uZWN0cyBVSSB0byB0aGUgcHJvdmlkZXIuXG4gKiBAcGFyYW0gICB7b2JqZWN0fSAgICBjb250YWluZXIgIGRvbSBlbGVtZW50XG4gKlxuICogKi9cblxuY29uc3QgQXBpID0gZnVuY3Rpb24oY29udGFpbmVyKXtcbiAgICBjb25zdCB0aGF0ID0ge307XG4gICAgRXZlbnRFbWl0dGVyKHRoYXQpO1xuXG5cbiAgICBjb25zb2xlLmxvZyhcIltbT3ZlblBsYXllcl1dIHYuXCIrIHZlcnNpb24pO1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSBsb2FkZWQuXCIpO1xuXG4gICAgbGV0IHBsYXlsaXN0TWFuYWdlciA9IFBsYXlsaXN0TWFuYWdlcih0aGF0KTtcbiAgICBsZXQgcHJvdmlkZXJDb250cm9sbGVyID0gUHJvdmlkZXJDb250cm9sbGVyKCk7XG4gICAgbGV0IHVzZXJBZ2VudE9iamVjdCA9IGFuYWxVc2VyQWdlbnQoKTtcbiAgICBsZXQgbWVkaWFNYW5hZ2VyID0gTWVkaWFNYW5hZ2VyKGNvbnRhaW5lciwgdXNlckFnZW50T2JqZWN0KTtcbiAgICBsZXQgY3VycmVudFByb3ZpZGVyID0gXCJcIjtcbiAgICBsZXQgcGxheWVyQ29uZmlnID0gXCJcIjtcbiAgICBsZXQgbGF6eVF1ZXVlID0gXCJcIjtcbiAgICBsZXQgY2FwdGlvbk1hbmFnZXIgPSBcIlwiO1xuXG5cbiAgICBjb25zdCBydW5OZXh0UGxheWxpc3QgPSBmdW5jdGlvbihpbmRleCl7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcInJ1bk5leHRQbGF5bGlzdFwiKTtcbiAgICAgICAgbGV0IG5leHRQbGF5bGlzdEluZGV4ID0gaW5kZXg7XG5cbiAgICAgICAgbGV0IHBsYXlsaXN0ID0gcGxheWxpc3RNYW5hZ2VyLmdldFBsYXlsaXN0KCk7XG4gICAgICAgIGxldCBoYXNOZXh0UGxheWxpc3QgPSAhIXBsYXlsaXN0W25leHRQbGF5bGlzdEluZGV4XTtcblxuICAgICAgICBsZXQgbmV4dFBsYXlsaXN0Rmlyc3RTb3VyY2UgPSBudWxsO1xuICAgICAgICBsZXQgY3VycmVudFBsYXlsaXN0U291cmNlID0gbnVsbDtcblxuICAgICAgICAvL2luaXQgc291cmNlIGluZGV4XG4gICAgICAgIHBsYXllckNvbmZpZy5zZXRTb3VyY2VJbmRleCgwKTtcbiAgICAgICAgaWYoaGFzTmV4dFBsYXlsaXN0KXtcbiAgICAgICAgICAgIGN1cnJlbnRQbGF5bGlzdFNvdXJjZSA9IHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50U291cmNlcygpW2N1cnJlbnRQcm92aWRlci5nZXRDdXJyZW50U291cmNlKCldO1xuICAgICAgICAgICAgaWYocGxheWxpc3RbbmV4dFBsYXlsaXN0SW5kZXhdLnNvdXJjZXMgJiYgcGxheWxpc3RbbmV4dFBsYXlsaXN0SW5kZXhdLnNvdXJjZXMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgbmV4dFBsYXlsaXN0Rmlyc3RTb3VyY2UgID0gcGxheWxpc3RbbmV4dFBsYXlsaXN0SW5kZXhdLnNvdXJjZXNbMF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBpc1NhbWVQcm92aWRlciA9IHByb3ZpZGVyQ29udHJvbGxlci5pc1NhbWVQcm92aWRlcihjdXJyZW50UGxheWxpc3RTb3VyY2UsIG5leHRQbGF5bGlzdEZpcnN0U291cmNlKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRQbGF5bGlzdFNvdXJjZSwgbmV4dFBsYXlsaXN0Rmlyc3RTb3VyY2UpO1xuXG4gICAgICAgICAgICAvKmlmKGlzU2FtZVByb3ZpZGVyKXtcbiAgICAgICAgICAgICAgICAvL2N1cnJlbnRQcm92aWRlci5zZXRDdXJyZW50U291cmNlKDAsIGlzU2FtZVByb3ZpZGVyKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIubG9hZChwbGF5bGlzdFtuZXh0UGxheWxpc3RJbmRleF0uc291cmNlcyk7XG4gICAgICAgICAgICB9ZWxzZXtcblxuICAgICAgICAgICAgfSovXG4gICAgICAgICAgICBwbGF5bGlzdE1hbmFnZXIuc2V0Q3VycmVudFBsYXlsaXN0KG5leHRQbGF5bGlzdEluZGV4KTtcbiAgICAgICAgICAgIGxhenlRdWV1ZSA9IExhenlDb21tYW5kRXhlY3V0b3IodGhhdCwgWydwbGF5Jywnc2VlaycsJ3N0b3AnXSk7XG4gICAgICAgICAgICBpbml0UHJvdmlkZXIoKTtcbiAgICAgICAgICAgIGlmKCFwbGF5ZXJDb25maWcuaXNBdXRvU3RhcnQoKSl7XG4gICAgICAgICAgICAgICAgLy9Bbnl3YXkgbmV4dHBsYXlsaXN0IHJ1bnMgYXV0b1N0YXJ0IS5cbiAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAvL0FsbCBQbGF5bGlzdCBFbmRlZC5cbiAgICAgICAgICAgIHRoYXQudHJpZ2dlcihBTExfUExBWUxJU1RfRU5ERUQsIG51bGwpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBpbml0UHJvdmlkZXIgPSBmdW5jdGlvbihsYXN0UGxheVBvc2l0aW9uKXtcbiAgICAgICAgY29uc3QgcGlja1F1YWxpdHlGcm9tU291cmNlID0gKHNvdXJjZXMpID0+e1xuICAgICAgICAgICAgdmFyIHF1YWxpdHkgPSAwO1xuICAgICAgICAgICAgaWYgKHNvdXJjZXMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZXNbaV0uZGVmYXVsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVhbGl0eSA9IGk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRTb3VyY2VJbmRleCgpID09PSBpICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLyppZiAocGxheWVyQ29uZmlnLmdldFNvdXJjZUxhYmVsKCkgJiYgc291cmNlc1tpXS5sYWJlbCA9PT0gcGxheWVyQ29uZmlnLmdldFNvdXJjZUxhYmVsKCkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgICAgICAgICAgfSovXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHF1YWxpdHk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHByb3ZpZGVyQ29udHJvbGxlci5sb2FkUHJvdmlkZXJzKHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50UGxheUxpc3QoKSkudGhlbihQcm92aWRlcnMgPT4ge1xuICAgICAgICAgICAgaWYoUHJvdmlkZXJzLmxlbmd0aCA8IDEpe1xuICAgICAgICAgICAgICAgIHRocm93IEVSUk9SU1tJTklUX1VOU1VQUE9SVF9FUlJPUl07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGN1cnJlbnRQcm92aWRlcil7XG4gICAgICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoY2FwdGlvbk1hbmFnZXIpe1xuICAgICAgICAgICAgICAgIGNhcHRpb25NYW5hZ2VyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICBjYXB0aW9uTWFuYWdlciA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXB0aW9uTWFuYWdlciA9IENhcHRpb25NYW5hZ2VyKHRoYXQsIHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50UGxheWxpc3RJbmRleCgpKTtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGluaXQoKSBjYXB0aW9uc1wiKTtcblxuICAgICAgICAgICAgbGV0IGN1cnJlbnRTb3VyY2VJbmRleCA9IHBpY2tRdWFsaXR5RnJvbVNvdXJjZShwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKSk7XG4gICAgICAgICAgICBsZXQgcHJvdmlkZXJOYW1lID0gUHJvdmlkZXJzW2N1cnJlbnRTb3VyY2VJbmRleF1bXCJuYW1lXCJdO1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaW5pdCgpIHByb3ZpZGVyXCIsIHByb3ZpZGVyTmFtZSk7XG4gICAgICAgICAgICAvL0luaXQgUHJvdmlkZXIuXG4gICAgICAgICAgICBjdXJyZW50UHJvdmlkZXIgPSAgUHJvdmlkZXJzW2N1cnJlbnRTb3VyY2VJbmRleF0ucHJvdmlkZXIoXG4gICAgICAgICAgICAgICAgbWVkaWFNYW5hZ2VyLmNyZWF0ZU1lZGlhKHByb3ZpZGVyTmFtZSwgcGxheWVyQ29uZmlnKSxcbiAgICAgICAgICAgICAgICBwbGF5ZXJDb25maWcsXG4gICAgICAgICAgICAgICAgcGxheWxpc3RNYW5hZ2VyLmdldEN1cnJlbnRBZFRhZygpXG4gICAgICAgICAgICApO1xuXG5cblxuICAgICAgICAgICAgaWYocHJvdmlkZXJOYW1lID09PSBQUk9WSURFUl9SVE1QKXtcbiAgICAgICAgICAgICAgICAvL0lmIHByb3ZpZGVyIHR5cGUgaXMgUlRNUCwgd2UgYWNjZXB0cyBSdG1wRXhwYW5zaW9uLlxuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhhdCwgQXBpUnRtcEV4cGFuc2lvbihjdXJyZW50UHJvdmlkZXIpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9UaGlzIHBhc3NlcyB0aGUgZXZlbnQgY3JlYXRlZCBieSB0aGUgUHJvdmlkZXIgdG8gQVBJLlxuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLm9uKFwiYWxsXCIsIGZ1bmN0aW9uKG5hbWUsIGRhdGEpe1xuXG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKG5hbWUsIGRhdGEpO1xuXG4gICAgICAgICAgICAgICAgaWYobmFtZSA9PT0gXCJjb21wbGV0ZVwiKXtcbiAgICAgICAgICAgICAgICAgICAgcnVuTmV4dFBsYXlsaXN0KHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50UGxheWxpc3RJbmRleCgpICsgMSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy9BdXRvIHN3aXRjaGluZyBuZXh0IHNvdXJjZSB3aGVuIHBsYXllciBsb2FkIGZhaWxlZCBieSBhbWlzcyBzb3VyY2UuXG4gICAgICAgICAgICAgICAgLy9kYXRhLmNvZGUgPT09IFBMQVlFUl9GSUxFX0VSUk9SXG4gICAgICAgICAgICAgICAgaWYoIG5hbWUgPT09IEVSUk9SIHx8IG5hbWUgPT09IE5FVFdPUktfVU5TVEFCTEVEICl7XG4gICAgICAgICAgICAgICAgICAgIC8vbGV0IGN1cnJlbnRTb3VyY2VJbmRleCA9IHRoYXQuZ2V0Q3VycmVudFNvdXJjZSgpO1xuICAgICAgICAgICAgICAgICAgICBpZihwbGF5ZXJDb25maWcuZ2V0U291cmNlSW5kZXgoKSsxIDwgdGhhdC5nZXRTb3VyY2VzKCkubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcyBzZXF1ZW50aWFsIGhhcyBhdmFpbGFibGUgc291cmNlLlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wYXVzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRDdXJyZW50U291cmNlKHBsYXllckNvbmZpZy5nZXRTb3VyY2VJbmRleCgpKzEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSkudGhlbigoKT0+e1xuXG4gICAgICAgICAgICAvL3Byb3ZpZGVyJ3MgcHJlbG9hZCgpIGhhdmUgdG8gbWFkZSBQcm9taXNlLiBDdXogaXQgb3ZlcmNvbWVzICdmbGFzaCBsb2FkaW5nIHRpbWluZyBwcm9ibGVtJy5cbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5wcmVsb2FkKHBsYXlsaXN0TWFuYWdlci5nZXRDdXJyZW50U291cmNlcygpLCBsYXN0UGxheVBvc2l0aW9uKS50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKFJFQURZKTtcblxuICAgICAgICAgICAgICAgIGxhenlRdWV1ZS5mbHVzaCgpO1xuICAgICAgICAgICAgICAgIC8vVGhpcyBpcyBubyByZWFzb24gdG8gZXhpc3QgYW55bW9yZS5cbiAgICAgICAgICAgICAgICBsYXp5UXVldWUuZGVzdHJveSgpO1xuXG4gICAgICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBsYXp5UXVldWUub2ZmKCk7XG4gICAgICAgICAgICAgICAgaWYoZXJyb3IgJiYgZXJyb3IuY29kZSAmJiBFUlJPUlNbZXJyb3IuY29kZV0pe1xuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoRVJST1IsIEVSUk9SU1tlcnJvci5jb2RlXSk7XG4gICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTW0lOSVRfVU5LTldPTl9FUlJPUl07XG4gICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoRVJST1IsIHRlbXBFcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgLy9JTklUIEVSUk9SXG4gICAgICAgICAgICBpZihlcnJvciAmJiBlcnJvci5jb2RlICYmIEVSUk9SU1tlcnJvci5jb2RlXSl7XG4gICAgICAgICAgICAgICAgdGhhdC50cmlnZ2VyKEVSUk9SLCBFUlJPUlNbZXJyb3IuY29kZV0pO1xuICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlNbSU5JVF9VTktOV09OX0VSUk9SXTtcbiAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICB0aGF0LnRyaWdnZXIoRVJST1IsIHRlbXBFcnJvcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8veHh4IDogSWYgeW91IGluaXQgZW1wdHkgc291cmNlcy4gKEkgdGhpbmsgdGhpcyBpcyBzdHJhbmdlIGNhc2UuKVxuICAgICAgICAgICAgLy9UaGlzIHdvcmtzIGZvciB0aGlzIGNhc2UuXG4gICAgICAgICAgICAvL3BsYXllciA9IE92ZW5QbGF5ZXIuY3JlYXRlKFwiZWxJZFwiLCB7fSk7XG4gICAgICAgICAgICAvL3BsYXllci5sb2FkKHNvcnVjZXMpO1xuICAgICAgICAgICAgbGF6eVF1ZXVlLm9mZigpO1xuICAgICAgICAgICAgLy9sYXp5UXVldWUucmVtb3ZlQW5kRXhjdXRlT25jZShcImxvYWRcIik7XG4gICAgICAgIH0pO1xuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIEFQSSDstIjquLDtmZQg7ZWo7IiYXG4gICAgICogaW5pdFxuICAgICAqIEBwYXJhbSAgICAgIHtvYmplY3R9IG9wdGlvbnMgcGxheWVyIGluaXRpYWwgb3B0aW9uIHZhbHVlLlxuICAgICAqIEByZXR1cm5zXG4gICAgICoqL1xuICAgIHRoYXQuaW5pdCA9IChvcHRpb25zKSA9PntcbiAgICAgICAgLy9JdCBjb2xsZWN0cyB0aGUgY29tbWFuZHMgYW5kIGV4ZWN1dGVzIHRoZW0gYXQgdGhlIHRpbWUgd2hlbiB0aGV5IGFyZSBleGVjdXRhYmxlLlxuICAgICAgICBsYXp5UXVldWUgPSBMYXp5Q29tbWFuZEV4ZWN1dG9yKHRoYXQsIFtcbiAgICAgICAgICAgICdsb2FkJywncGxheScsJ3BhdXNlJywnc2VlaycsJ3N0b3AnLCAnZ2V0RHVyYXRpb24nLCAnZ2V0UG9zaXRpb24nLCAnZ2V0Vm9sdW1lJ1xuICAgICAgICAgICAgLCAnZ2V0TXV0ZScsICdnZXRCdWZmZXInLCAnZ2V0U3RhdGUnICwgJ2dldFF1YWxpdHlMZXZlbHMnXG4gICAgICAgIF0pO1xuICAgICAgICBvcHRpb25zLm1lZGlhQ29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICBvcHRpb25zLmJyb3dzZXIgPSB1c2VyQWdlbnRPYmplY3Q7XG4gICAgICAgIHBsYXllckNvbmZpZyA9IENvbmZpZ3VyYXRvcihvcHRpb25zLCB0aGF0KTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaW5pdCgpXCIpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpbml0KCkgY29uZmlnIDogXCIsIHBsYXllckNvbmZpZyk7XG5cbiAgICAgICAgcGxheWxpc3RNYW5hZ2VyLmluaXRQbGF5bGlzdChwbGF5ZXJDb25maWcuZ2V0UGxheWxpc3QoKSk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGluaXQoKSBzb3VyY2VzIDogXCIgLCBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFNvdXJjZXMoKSk7XG5cbiAgICAgICAgaW5pdFByb3ZpZGVyKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldFByb3ZpZGVyTmFtZSA9ICgpID0+IHtcbiAgICAgICAgaWYoY3VycmVudFByb3ZpZGVyKXtcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0TmFtZSgpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgdGhhdC5nZXRDb25maWcgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldENvbmZpZygpXCIsIHBsYXllckNvbmZpZy5nZXRDb25maWcoKSk7XG4gICAgICAgIHJldHVybiBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldEJyb3dzZXIgPSAoKSA9PiB7XG5cbiAgICAgICAgcmV0dXJuIHBsYXllckNvbmZpZy5nZXRCcm93c2VyKCk7XG4gICAgfTtcbiAgICB0aGF0LnNldFRpbWVjb2RlTW9kZSA9IChpc1Nob3cpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRUaW1lY29kZU1vZGUoKVwiLCBpc1Nob3cpO1xuICAgICAgICBwbGF5ZXJDb25maWcuc2V0VGltZWNvZGVNb2RlKGlzU2hvdyk7XG4gICAgfTtcbiAgICB0aGF0LmlzVGltZWNvZGVNb2RlID0gKCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBpc1RpbWVjb2RlTW9kZSgpXCIpO1xuICAgICAgICByZXR1cm4gcGxheWVyQ29uZmlnLmlzVGltZWNvZGVNb2RlKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldEZyYW1lcmF0ZSA9ICgpID0+IHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0RnJhbWVyYXRlKClcIik7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0RnJhbWVyYXRlKCk7XG4gICAgfTtcbiAgICB0aGF0LnNlZWtGcmFtZSA9IChmcmFtZUNvdW50KSA9PiB7XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2Vla0ZyYW1lKClcIiwgZnJhbWVDb3VudCk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2Vla0ZyYW1lKGZyYW1lQ291bnQpO1xuICAgIH07XG5cbiAgICB0aGF0LmdldER1cmF0aW9uID0gKCkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldER1cmF0aW9uKClcIiwgY3VycmVudFByb3ZpZGVyLmdldER1cmF0aW9uKCkpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldER1cmF0aW9uKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldFBvc2l0aW9uID0gKCkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0UG9zaXRpb24oKVwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0UG9zaXRpb24oKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0UG9zaXRpb24oKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Vm9sdW1lID0gKCkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0Vm9sdW1lKClcIiwgY3VycmVudFByb3ZpZGVyLmdldFZvbHVtZSgpKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRWb2x1bWUoKTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Vm9sdW1lID0gKHZvbHVtZSkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Vm9sdW1lKCkgXCIgKyB2b2x1bWUpO1xuICAgICAgICBjdXJyZW50UHJvdmlkZXIuc2V0Vm9sdW1lKHZvbHVtZSk7XG4gICAgfTtcbiAgICB0aGF0LnNldE11dGUgPSAoc3RhdGUpID0+IHtcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldE11dGUoKSBcIiArIHN0YXRlKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5zZXRNdXRlKHN0YXRlKTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0TXV0ZSA9ICgpID0+IHtcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldE11dGUoKSBcIiArIGN1cnJlbnRQcm92aWRlci5nZXRNdXRlKCkpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldE11dGUoKTtcbiAgICB9O1xuICAgIHRoYXQubG9hZCA9IChwbGF5bGlzdCkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBsb2FkKCkgXCIsIHBsYXlsaXN0KTtcbiAgICAgICAgbGF6eVF1ZXVlID0gTGF6eUNvbW1hbmRFeGVjdXRvcih0aGF0LCBbJ3BsYXknLCdzZWVrJywnc3RvcCddKTtcblxuICAgICAgICBpZihwbGF5bGlzdCl7XG4gICAgICAgICAgICBpZihjdXJyZW50UHJvdmlkZXIpe1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlci5zZXRDdXJyZW50UXVhbGl0eSgwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBsYXlsaXN0TWFuYWdlci5pbml0UGxheWxpc3QocGxheWxpc3QpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbml0UHJvdmlkZXIoKTtcblxuICAgIH07XG4gICAgdGhhdC5wbGF5ID0gKCkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHBsYXkoKSBcIik7XG4gICAgICAgIGN1cnJlbnRQcm92aWRlci5wbGF5KCk7XG4gICAgfVxuICAgIHRoYXQucGF1c2UgPSAoKSA9PiB7XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBwYXVzZSgpIFwiKTtcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnBhdXNlKCk7XG4gICAgfTtcbiAgICB0aGF0LnNlZWsgPSAocG9zaXRpb24pID0+IHtcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNlZWsoKSBcIisgcG9zaXRpb24pO1xuICAgICAgICBjdXJyZW50UHJvdmlkZXIuc2Vlayhwb3NpdGlvbik7XG4gICAgfTtcbiAgICB0aGF0LnNldFBsYXliYWNrUmF0ZSA9IChwbGF5YmFja1JhdGUpID0+e1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0UGxheWJhY2tSYXRlKCkgXCIsIHBsYXliYWNrUmF0ZSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuc2V0UGxheWJhY2tSYXRlKHBsYXllckNvbmZpZy5zZXRQbGF5YmFja1JhdGUocGxheWJhY2tSYXRlKSk7XG4gICAgfTtcbiAgICB0aGF0LmdldFBsYXliYWNrUmF0ZSA9ICgpID0+e1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0UGxheWJhY2tSYXRlKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRQbGF5YmFja1JhdGUoKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0UGxheWJhY2tSYXRlKCk7XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0UGxheWxpc3QgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFBsYXlsaXN0KCkgXCIsIHBsYXlsaXN0TWFuYWdlci5nZXRQbGF5bGlzdCgpKTtcbiAgICAgICAgcmV0dXJuIHBsYXlsaXN0TWFuYWdlci5nZXRQbGF5bGlzdCgpO1xuICAgIH07XG4gICAgdGhhdC5nZXRDdXJyZW50UGxheWxpc3QgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEN1cnJlbnRQbGF5bGlzdCgpIFwiLCBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFBsYXlsaXN0SW5kZXgoKSk7XG4gICAgICAgIHJldHVybiBwbGF5bGlzdE1hbmFnZXIuZ2V0Q3VycmVudFBsYXlsaXN0SW5kZXgoKTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Q3VycmVudFBsYXlsaXN0ID0gKGluZGV4KSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEN1cnJlbnRQbGF5bGlzdCgpIFwiLCBpbmRleCk7XG4gICAgICAgIHJ1bk5leHRQbGF5bGlzdChpbmRleCk7XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0U291cmNlcyA9ICgpID0+IHtcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFNvdXJjZXMoKSBcIiwgY3VycmVudFByb3ZpZGVyLmdldFNvdXJjZXMoKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0U291cmNlcygpO1xuICAgIH07XG4gICAgdGhhdC5nZXRDdXJyZW50U291cmNlID0gKCkgPT57XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRDdXJyZW50U291cmNlKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRDdXJyZW50U291cmNlKCkpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmdldEN1cnJlbnRTb3VyY2UoKTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Q3VycmVudFNvdXJjZSA9IChpbmRleCkgPT57XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRDdXJyZW50U291cmNlKCkgXCIsIGluZGV4KTtcblxuICAgICAgICBsZXQgc291cmNlcyA9IGN1cnJlbnRQcm92aWRlci5nZXRTb3VyY2VzKCk7XG4gICAgICAgIGxldCBjdXJyZW50U291cmNlID0gc291cmNlc1tjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFNvdXJjZSgpXTtcbiAgICAgICAgbGV0IG5ld1NvdXJjZSA9IHNvdXJjZXNbaW5kZXhdO1xuICAgICAgICBsZXQgbGFzdFBsYXlQb3NpdGlvbiA9IGN1cnJlbnRQcm92aWRlci5nZXRQb3NpdGlvbigpO1xuICAgICAgICBsZXQgaXNTYW1lUHJvdmlkZXIgPSBwcm92aWRlckNvbnRyb2xsZXIuaXNTYW1lUHJvdmlkZXIoY3VycmVudFNvdXJjZSwgbmV3U291cmNlKTtcbiAgICAgICAgLy8gcHJvdmlkZXIuc2VyQ3VycmVudFF1YWxpdHkgLT4gcGxheWVyQ29uZmlnIHNldHRpbmcgLT4gbG9hZFxuICAgICAgICBsZXQgcmVzdWx0U291cmNlSW5kZXggPSBjdXJyZW50UHJvdmlkZXIuc2V0Q3VycmVudFNvdXJjZShpbmRleCwgaXNTYW1lUHJvdmlkZXIpO1xuXG4gICAgICAgIGlmKCFuZXdTb3VyY2Upe1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRDdXJyZW50UXVhbGl0eSgpIGlzU2FtZVByb3ZpZGVyXCIsIGlzU2FtZVByb3ZpZGVyKTtcblxuXG4gICAgICAgIC8vc3dpdGNoaW5nIGJldHdlZW4gc3RyZWFtcyBvbiBITFMuIHd0aD8gaHR0cHM6Ly92aWRlby1kZXYuZ2l0aHViLmlvL2hscy5qcy9sYXRlc3QvZG9jcy9BUEkuaHRtbCNmaW5hbC1zdGVwLWRlc3Ryb3lpbmctc3dpdGNoaW5nLWJldHdlZW4tc3RyZWFtc1xuICAgICAgICBpZighaXNTYW1lUHJvdmlkZXIgfHwgY3VycmVudFByb3ZpZGVyLmdldE5hbWUoKSA9PT0gUFJPVklERVJfSExTKXtcbiAgICAgICAgICAgIGxhenlRdWV1ZSA9IExhenlDb21tYW5kRXhlY3V0b3IodGhhdCwgWydwbGF5Jywnc2VlayddKTtcbiAgICAgICAgICAgIGluaXRQcm92aWRlcihsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHRTb3VyY2VJbmRleDtcbiAgICB9O1xuXG5cblxuICAgIHRoYXQuZ2V0UXVhbGl0eUxldmVscyA9ICgpID0+e1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogZ2V0UXVhbGl0eUxldmVscygpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0UXVhbGl0eUxldmVscygpKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRRdWFsaXR5TGV2ZWxzKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldEN1cnJlbnRRdWFsaXR5ID0gKCkgPT57XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBnZXRDdXJyZW50UXVhbGl0eSgpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFF1YWxpdHkoKSk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvdmlkZXIuZ2V0Q3VycmVudFF1YWxpdHkoKTtcbiAgICB9O1xuICAgIHRoYXQuc2V0Q3VycmVudFF1YWxpdHkgPSAocXVhbGl0eUluZGV4KSA9PntcbiAgICAgICAgaWYoIWN1cnJlbnRQcm92aWRlcil7cmV0dXJuIG51bGw7fVxuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IHNldEN1cnJlbnRRdWFsaXR5KCkgXCIsIHF1YWxpdHlJbmRleCk7XG5cbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5zZXRDdXJyZW50UXVhbGl0eShxdWFsaXR5SW5kZXgpO1xuICAgIH07XG4gICAgdGhhdC5pc0F1dG9RdWFsaXR5ID0gKCkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogaXNBdXRvUXVhbGl0eSgpXCIpO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLmlzQXV0b1F1YWxpdHkoKTtcbiAgICB9O1xuICAgIHRoYXQuc2V0QXV0b1F1YWxpdHkgPSAoaXNBdXRvKSA9PiB7XG4gICAgICAgIGlmKCFjdXJyZW50UHJvdmlkZXIpe3JldHVybiBudWxsO31cblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJBUEkgOiBzZXRBdXRvUXVhbGl0eSgpIFwiLCBpc0F1dG8pO1xuICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLnNldEF1dG9RdWFsaXR5KGlzQXV0byk7XG4gICAgfVxuXG4gICAgdGhhdC5nZXRDYXB0aW9uTGlzdCA9ICgpID0+IHtcbiAgICAgICAgaWYoIWNhcHRpb25NYW5hZ2VyKXtyZXR1cm4gbnVsbDt9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldENhcHRpb25MaXN0KCkgXCIsIGNhcHRpb25NYW5hZ2VyLmdldENhcHRpb25MaXN0KCkpO1xuICAgICAgICByZXR1cm4gY2FwdGlvbk1hbmFnZXIuZ2V0Q2FwdGlvbkxpc3QoKTtcbiAgICB9XG4gICAgdGhhdC5nZXRDdXJyZW50Q2FwdGlvbiA9ICgpID0+IHtcbiAgICAgICAgaWYoIWNhcHRpb25NYW5hZ2VyKXtyZXR1cm4gbnVsbDt9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEN1cnJlbnRDYXB0aW9uKCkgXCIsIGNhcHRpb25NYW5hZ2VyLmdldEN1cnJlbnRDYXB0aW9uKCkpO1xuICAgICAgICByZXR1cm4gY2FwdGlvbk1hbmFnZXIuZ2V0Q3VycmVudENhcHRpb24oKTtcbiAgICB9XG4gICAgdGhhdC5zZXRDdXJyZW50Q2FwdGlvbiA9IChpbmRleCkgPT4ge1xuICAgICAgICBpZighY2FwdGlvbk1hbmFnZXIpe3JldHVybiBudWxsO31cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc2V0Q3VycmVudENhcHRpb24oKSBcIiwgaW5kZXgpO1xuICAgICAgICBjYXB0aW9uTWFuYWdlci5zZXRDdXJyZW50Q2FwdGlvbihpbmRleCk7XG4gICAgfVxuICAgIHRoYXQuYWRkQ2FwdGlvbiA9ICh0cmFjaykgPT4ge1xuICAgICAgICBpZighY2FwdGlvbk1hbmFnZXIpe3JldHVybiBudWxsO31cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogYWRkQ2FwdGlvbigpIFwiKVxuICAgICAgICByZXR1cm4gY2FwdGlvbk1hbmFnZXIuYWRkQ2FwdGlvbih0cmFjayk7XG4gICAgfVxuICAgIHRoYXQucmVtb3ZlQ2FwdGlvbiA9IChpbmRleCkgPT4ge1xuICAgICAgICBpZighY2FwdGlvbk1hbmFnZXIpe3JldHVybiBudWxsO31cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcmVtb3ZlQ2FwdGlvbigpIFwiLCBpbmRleClcbiAgICAgICAgcmV0dXJuIGNhcHRpb25NYW5hZ2VyLnJlbW92ZUNhcHRpb24oaW5kZXgpO1xuICAgIH1cblxuICAgIHRoYXQuZ2V0QnVmZmVyID0gKCkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldEJ1ZmZlcigpIFwiLCBjdXJyZW50UHJvdmlkZXIuZ2V0QnVmZmVyKCkpO1xuICAgICAgICBjdXJyZW50UHJvdmlkZXIuZ2V0QnVmZmVyKCk7XG4gICAgfTtcbiAgICB0aGF0LmdldFN0YXRlID0gKCkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkFQSSA6IGdldFN0YXRlKCkgXCIsIGN1cnJlbnRQcm92aWRlci5nZXRTdGF0ZSgpKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm92aWRlci5nZXRTdGF0ZSgpO1xuICAgIH07XG4gICAgdGhhdC5zdG9wID0gKCkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogc3RvcCgpIFwiKTtcbiAgICAgICAgY3VycmVudFByb3ZpZGVyLnN0b3AoKTtcbiAgICB9O1xuICAgIHRoYXQucmVtb3ZlID0gKCkgPT4ge1xuICAgICAgICBpZighY3VycmVudFByb3ZpZGVyKXtyZXR1cm4gbnVsbDt9XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcmVtb3ZlKCkgXCIpO1xuICAgICAgICBsYXp5UXVldWUuZGVzdHJveSgpO1xuICAgICAgICBpZihjYXB0aW9uTWFuYWdlcil7XG4gICAgICAgICAgICBjYXB0aW9uTWFuYWdlci5kZXN0cm95KCk7XG4gICAgICAgICAgICBjYXB0aW9uTWFuYWdlciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZihjdXJyZW50UHJvdmlkZXIpe1xuICAgICAgICAgICAgY3VycmVudFByb3ZpZGVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIGN1cnJlbnRQcm92aWRlciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZihtZWRpYU1hbmFnZXIpe1xuICAgICAgICAgICAgbWVkaWFNYW5hZ2VyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIG1lZGlhTWFuYWdlciA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcHJvdmlkZXJDb250cm9sbGVyID0gbnVsbDtcbiAgICAgICAgcGxheWxpc3RNYW5hZ2VyID0gbnVsbDtcbiAgICAgICAgcGxheWVyQ29uZmlnID0gbnVsbDtcbiAgICAgICAgbGF6eVF1ZXVlID0gbnVsbDtcblxuICAgICAgICB0aGF0LnRyaWdnZXIoREVTVFJPWSk7XG4gICAgICAgIHRoYXQub2ZmKCk7XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiQVBJIDogcmVtb3ZlKCkgLSBsYXp5UXVldWUsIGN1cnJlbnRQcm92aWRlciwgcHJvdmlkZXJDb250cm9sbGVyLCBwbGF5bGlzdE1hbmFnZXIsIHBsYXllckNvbmZpZywgYXBpIGV2ZW50IGRlc3Ryb2VkLiBcIik7XG4gICAgICAgIE92ZW5QbGF5ZXJTREsucmVtb3ZlUGxheWVyKHRoYXQuZ2V0Q29udGFpbmVySWQoKSk7XG4gICAgICAgIGlmKE92ZW5QbGF5ZXJTREsuZ2V0UGxheWVyTGlzdCgpLmxlbmd0aCAgPT09IDApe1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiT3ZlblBsYXllclNESy5wbGF5ZXJMaXN0XCIsICBPdmVuUGxheWVyU0RLLmdldFBsYXllckxpc3QoKSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhhdC5nZXRWZXJzaW9uID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gXCJ2LlwiK3ZlcnNpb247XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuXG5cbmV4cG9ydCBkZWZhdWx0IEFwaTtcblxuXG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyNC4uXG4gKi9cblxuZXhwb3J0IGNvbnN0IEFwaVJ0bXBFeHBhbnNpb24gPSBmdW5jdGlvbihjdXJyZW50UHJvdmlkZXIpe1xuICAgIHJldHVybiB7XG4gICAgICAgIGV4dGVybmFsQ2FsbGJhY2tDcmVlcCA6IChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGlmKHJlc3VsdC5uYW1lICYmIHJlc3VsdC5kYXRhKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudFByb3ZpZGVyLnRyaWdnZXJFdmVudEZyb21FeHRlcm5hbChyZXN1bHQubmFtZSwgcmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufTtcbiIsImltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XG5cbmltcG9ydCB7XG4gICAgQ09OVEVOVF9USU1FX01PREVfQ0hBTkdFRFxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG4vKipcbiAqIEBicmllZiAgIFRoaXMgaW5pdGlhbGl6ZXMgdGhlIGlucHV0IG9wdGlvbnMuXG4gKiBAcGFyYW0gICBvcHRpb25zXG4gKlxuICogKi9cbmNvbnN0IENvbmZpZ3VyYXRvciA9IGZ1bmN0aW9uKG9wdGlvbnMsIHByb3ZpZGVyKXtcbiAgICAvL3NvdXJjZXMsIHRyYWNrcyxcblxuXG4gICAgY29uc3QgY29tcG9zZVNvdXJjZU9wdGlvbnMgPSBmdW5jdGlvbihvcHRpb25zKXtcbiAgICAgICAgY29uc3QgRGVmYXVsdHMgPSB7XG4gICAgICAgICAgICBtZWRpYUNvbnRhaW5lciA6IFwiXCIsXG4gICAgICAgICAgICBwbGF5YmFja1JhdGVzOiBbMiwgMS41LCAxLCAwLjUsIDAuMjVdLFxuICAgICAgICAgICAgcGxheWJhY2tSYXRlOiAxLFxuICAgICAgICAgICAgbXV0ZTogZmFsc2UsXG4gICAgICAgICAgICB2b2x1bWU6IDEwMCxcbiAgICAgICAgICAgIGxvb3AgOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbnRyb2xzIDogdHJ1ZSxcbiAgICAgICAgICAgIGF1dG9TdGFydCA6IGZhbHNlLFxuICAgICAgICAgICAgdGltZWNvZGUgOiB0cnVlLFxuICAgICAgICAgICAgc291cmNlSW5kZXggOiAwLFxuICAgICAgICAgICAgYnJvd3NlciA6IFwiXCIsXG4gICAgICAgICAgICBoaWRlUGxheWxpc3RJY29uIDogZmFsc2UsXG4gICAgICAgICAgICBydG1wQnVmZmVyVGltZSA6IDEsXG4gICAgICAgICAgICBydG1wQnVmZmVyVGltZU1heCA6IDMsXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHNlcmlhbGl6ZSA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnICYmIHZhbC5sZW5ndGggPCA2KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbG93ZXJjYXNlVmFsID0gdmFsLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgaWYgKGxvd2VyY2FzZVZhbCA9PT0gJ3RydWUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAobG93ZXJjYXNlVmFsID09PSAnZmFsc2UnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFpc05hTihOdW1iZXIodmFsKSkgJiYgIWlzTmFOKHBhcnNlRmxvYXQodmFsKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE51bWJlcih2YWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGVzZXJpYWxpemUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gJ2lkJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9wdGlvbnNba2V5XSA9IHNlcmlhbGl6ZShvcHRpb25zW2tleV0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBkZXNlcmlhbGl6ZShvcHRpb25zKTtcbiAgICAgICAgbGV0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIERlZmF1bHRzLCBvcHRpb25zKTtcblxuICAgICAgICBsZXQgcGxheWJhY2tSYXRlcyA9IGNvbmZpZy5wbGF5YmFja1JhdGVzO1xuXG4gICAgICAgIHBsYXliYWNrUmF0ZXMgPSBwbGF5YmFja1JhdGVzLmZpbHRlcihyYXRlID0+IF8uaXNOdW1iZXIocmF0ZSkgJiYgcmF0ZSA+PSAwLjI1ICYmIHJhdGUgPD0gNCkubWFwKHJhdGUgPT4gTWF0aC5yb3VuZChyYXRlICogNCkgLyA0KTtcblxuICAgICAgICBpZiAocGxheWJhY2tSYXRlcy5pbmRleE9mKDEpIDwgMCkge1xuICAgICAgICAgICAgcGxheWJhY2tSYXRlcy5wdXNoKDEpO1xuICAgICAgICB9XG4gICAgICAgIHBsYXliYWNrUmF0ZXMuc29ydCgpO1xuXG4gICAgICAgIGNvbmZpZy5wbGF5YmFja1JhdGVzID0gcGxheWJhY2tSYXRlcztcblxuICAgICAgICBjb25maWcucnRtcEJ1ZmZlclRpbWUgPSBjb25maWcucnRtcEJ1ZmZlclRpbWUgPiAxMCA/IDEwIDogY29uZmlnLnJ0bXBCdWZmZXJUaW1lO1xuICAgICAgICBjb25maWcucnRtcEJ1ZmZlclRpbWVNYXggPSBjb25maWcucnRtcEJ1ZmZlclRpbWVNYXggPiA1MCA/IDUwIDogY29uZmlnLnJ0bXBCdWZmZXJUaW1lTWF4O1xuXG5cbiAgICAgICAgaWYgKGNvbmZpZy5wbGF5YmFja1JhdGVzLmluZGV4T2YoY29uZmlnLnBsYXliYWNrUmF0ZSkgPCAwKSB7XG4gICAgICAgICAgICBjb25maWcucGxheWJhY2tSYXRlID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbmZpZ1BsYXlsaXN0ID0gY29uZmlnLnBsYXlsaXN0O1xuICAgICAgICBpZiAoIWNvbmZpZ1BsYXlsaXN0KSB7XG4gICAgICAgICAgICBjb25zdCBvYmogPSBfLnBpY2soY29uZmlnLCBbXG4gICAgICAgICAgICAgICAgJ3RpdGxlJyxcbiAgICAgICAgICAgICAgICAnZGVzY3JpcHRpb24nLFxuICAgICAgICAgICAgICAgICd0eXBlJyxcbiAgICAgICAgICAgICAgICAnaW1hZ2UnLFxuICAgICAgICAgICAgICAgICdmaWxlJyxcbiAgICAgICAgICAgICAgICAnc291cmNlcycsXG4gICAgICAgICAgICAgICAgJ3RyYWNrcycsXG4gICAgICAgICAgICAgICAgJ2hvc3QnLFxuICAgICAgICAgICAgICAgICdhcHBsaWNhdGlvbicsXG4gICAgICAgICAgICAgICAgJ3N0cmVhbScsXG4gICAgICAgICAgICAgICAgJ2FkVGFnVXJsJ1xuICAgICAgICAgICAgXSk7XG5cbiAgICAgICAgICAgIGNvbmZpZy5wbGF5bGlzdCA9IFsgb2JqIF07XG4gICAgICAgIH0gZWxzZSBpZiAoXy5pc0FycmF5KGNvbmZpZ1BsYXlsaXN0LnBsYXlsaXN0KSkge1xuICAgICAgICAgICAgY29uZmlnLmZlZWREYXRhID0gY29uZmlnUGxheWxpc3Q7XG4gICAgICAgICAgICBjb25maWcucGxheWxpc3QgPSBjb25maWdQbGF5bGlzdC5wbGF5bGlzdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGRlbGV0ZSBjb25maWcuZHVyYXRpb247XG4gICAgICAgIHJldHVybiBjb25maWc7XG4gICAgfTtcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJDb25maWd1cmF0b3IgbG9hZGVkLlwiLCBvcHRpb25zKTtcbiAgICBsZXQgc3BlYyA9IGNvbXBvc2VTb3VyY2VPcHRpb25zKG9wdGlvbnMpO1xuXG5cbiAgICBjb25zdCB0aGF0ID0ge307XG4gICAgdGhhdC5nZXRDb25maWcgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjO1xuICAgIH07XG4gICAgdGhhdC5zZXRDb25maWcgPSAoY29uZmlnLCB2YWx1ZSkgPT4ge1xuICAgICAgICBzcGVjW2NvbmZpZ10gPSB2YWx1ZTtcbiAgICB9O1xuXG4gICAgdGhhdC5nZXRDb250YWluZXIgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLm1lZGlhQ29udGFpbmVyO1xuICAgIH07XG5cbiAgICB0aGF0LmdldFBsYXliYWNrUmF0ZSA9KCk9PntcbiAgICAgICAgcmV0dXJuIHNwZWMucGxheWJhY2tSYXRlO1xuICAgIH07XG4gICAgdGhhdC5zZXRQbGF5YmFja1JhdGUgPShwbGF5YmFja1JhdGUpPT57XG4gICAgICAgIHNwZWMucGxheWJhY2tSYXRlID0gcGxheWJhY2tSYXRlO1xuICAgICAgICByZXR1cm4gcGxheWJhY2tSYXRlO1xuICAgIH07XG5cbiAgICB0aGF0LmdldFF1YWxpdHlMYWJlbCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMucXVhbGl0eUxhYmVsO1xuICAgIH07XG4gICAgdGhhdC5zZXRRdWFsaXR5TGFiZWwgPSAobmV3TGFiZWwpID0+IHtcbiAgICAgICAgc3BlYy5xdWFsaXR5TGFiZWwgPSBuZXdMYWJlbDtcbiAgICB9O1xuXG4gICAgLyp0aGF0LmdldFNvdXJjZUxhYmVsID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5zb3VyY2VMYWJlbDtcbiAgICB9O1xuICAgIHRoYXQuc2V0U291cmNlTGFiZWwgPSAobmV3TGFiZWwpID0+IHtcbiAgICAgICAgc3BlYy5zb3VyY2VMYWJlbCA9IG5ld0xhYmVsO1xuICAgIH07Ki9cblxuICAgIHRoYXQuZ2V0U291cmNlSW5kZXggPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLnNvdXJjZUluZGV4O1xuICAgIH07XG4gICAgdGhhdC5zZXRTb3VyY2VJbmRleCA9IChpbmRleCkgPT4ge1xuICAgICAgICBzcGVjLnNvdXJjZUluZGV4ID0gaW5kZXg7XG4gICAgfTtcbiAgICB0aGF0LnNldFRpbWVjb2RlTW9kZSA9ICh0aW1lY29kZSkgPT4ge1xuICAgICAgICBpZihzcGVjLnRpbWVjb2RlICE9PSB0aW1lY29kZSl7XG4gICAgICAgICAgICBzcGVjLnRpbWVjb2RlID0gdGltZWNvZGU7XG4gICAgICAgICAgICBwcm92aWRlci50cmlnZ2VyKENPTlRFTlRfVElNRV9NT0RFX0NIQU5HRUQsIHRpbWVjb2RlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhhdC5pc1RpbWVjb2RlTW9kZSA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMudGltZWNvZGU7XG4gICAgfTtcbiAgICB0aGF0LmdldFJ0bXBCdWZmZXJUaW1lID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gc3BlYy5ydG1wQnVmZmVyVGltZTtcbiAgICB9O1xuICAgIHRoYXQuZ2V0UnRtcEJ1ZmZlclRpbWVNYXggPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLnJ0bXBCdWZmZXJUaW1lTWF4O1xuICAgIH07XG5cbiAgICB0aGF0LmlzTXV0ZSA9ICgpID0+e1xuICAgICAgICByZXR1cm4gc3BlYy5tdXRlO1xuICAgIH07XG4gICAgdGhhdC5nZXRWb2x1bWUgPSAoKSA9PntcbiAgICAgICAgcmV0dXJuIHNwZWMudm9sdW1lO1xuICAgIH07XG4gICAgdGhhdC5pc0xvb3AgPSAoKSA9PntcbiAgICAgICAgcmV0dXJuIHNwZWMubG9vcDtcbiAgICB9O1xuICAgIHRoYXQuaXNBdXRvU3RhcnQgPSAoKSA9PntcbiAgICAgICAgcmV0dXJuIHNwZWMuYXV0b1N0YXJ0O1xuICAgIH07XG4gICAgdGhhdC5pc0NvbnRyb2xzID0gKCkgPT57XG4gICAgICAgIHJldHVybiBzcGVjLmNvbnRyb2xzO1xuICAgIH07XG5cbiAgICB0aGF0LmdldFBsYXliYWNrUmF0ZXMgPSgpPT57XG4gICAgICAgIHJldHVybiBzcGVjLnBsYXliYWNrUmF0ZXM7XG4gICAgfTtcbiAgICB0aGF0LmdldEJyb3dzZXIgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBzcGVjLmJyb3dzZXI7XG4gICAgfTtcblxuICAgIHRoYXQuZ2V0UGxheWxpc3QgPSgpPT57XG4gICAgICAgIHJldHVybiBzcGVjLnBsYXlsaXN0O1xuICAgIH07XG4gICAgdGhhdC5zZXRQbGF5bGlzdCA9KHBsYXlsaXN0KT0+e1xuICAgICAgICBpZihfLmlzQXJyYXkocGxheWxpc3QpKXtcbiAgICAgICAgICAgIHNwZWMucGxheWxpc3QgPSBwbGF5bGlzdDtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBzcGVjLnBsYXlsaXN0ID0gW3BsYXlsaXN0XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3BlYy5wbGF5bGlzdDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb25maWd1cmF0b3I7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiAzLi5cbiAqL1xuXG4vKipcbiAqIEBicmllZiAgIFRoaXMgbW9kdWxlIHByb3ZpZGUgY3VzdG9tIGV2ZW50cy5cbiAqIEBwYXJhbSAgIG9iamVjdCAgICBBbiBvYmplY3QgdGhhdCByZXF1aXJlcyBjdXN0b20gZXZlbnRzLlxuICpcbiAqICovXG5cbmNvbnN0IEV2ZW50RW1pdHRlciA9IGZ1bmN0aW9uKG9iamVjdCl7XG4gICAgbGV0IHRoYXQgPSBvYmplY3Q7XG4gICAgbGV0IF9ldmVudHMgPVtdO1xuXG4gICAgY29uc3QgdHJpZ2dlckV2ZW50cyA9IGZ1bmN0aW9uKGV2ZW50cywgYXJncywgY29udGV4dCl7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgbGV0IGxlbmd0aCA9IGV2ZW50cy5sZW5ndGg7XG4gICAgICAgIGZvcihpID0gMDsgaSA8IGxlbmd0aDsgaSArKyl7XG4gICAgICAgICAgICBsZXQgZXZlbnQgPSBldmVudHNbaV07XG4gICAgICAgICAgICBldmVudC5saXN0ZW5lci5hcHBseSggKCBldmVudC5jb250ZXh0IHx8IGNvbnRleHQgKSwgYXJncyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhhdC5vbiA9IGZ1bmN0aW9uKG5hbWUsIGxpc3RlbmVyLCBjb250ZXh0KXtcbiAgICAgICAgKF9ldmVudHNbbmFtZV0gfHwgKF9ldmVudHNbbmFtZV09W10pICkucHVzaCh7IGxpc3RlbmVyOiBsaXN0ZW5lciAgLCBjb250ZXh0IDogY29udGV4dH0pO1xuICAgICAgICByZXR1cm4gdGhhdDtcbiAgICB9O1xuICAgIHRoYXQudHJpZ2dlciA9IGZ1bmN0aW9uKG5hbWUpe1xuICAgICAgICBpZighX2V2ZW50cyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgY29uc3QgZXZlbnRzID0gX2V2ZW50c1tuYW1lXTtcbiAgICAgICAgY29uc3QgYWxsRXZlbnRzID0gX2V2ZW50cy5hbGw7XG5cbiAgICAgICAgaWYoZXZlbnRzKXtcbiAgICAgICAgICAgIHRyaWdnZXJFdmVudHMoZXZlbnRzLCBhcmdzLCB0aGF0KTtcbiAgICAgICAgfVxuICAgICAgICBpZihhbGxFdmVudHMpe1xuICAgICAgICAgICAgdHJpZ2dlckV2ZW50cyhhbGxFdmVudHMsIGFyZ3VtZW50cywgdGhhdCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQub2ZmID0gZnVuY3Rpb24obmFtZSwgbGlzdGVuZXIsIGNvbnRleHQpe1xuICAgICAgICBpZighX2V2ZW50cyl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW5hbWUgJiYgIWxpc3RlbmVyICYmICFjb250ZXh0KSAge1xuICAgICAgICAgICAgX2V2ZW50cyA9IFtdO1xuICAgICAgICAgICAgcmV0dXJuIHRoYXQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuYW1lcyA9IG5hbWUgPyBbbmFtZV0gOiBPYmplY3Qua2V5cyhfZXZlbnRzKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IG5hbWVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgbmFtZSA9IG5hbWVzW2ldO1xuICAgICAgICAgICAgY29uc3QgZXZlbnRzID0gX2V2ZW50c1tuYW1lXTtcbiAgICAgICAgICAgIGlmIChldmVudHMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXRhaW4gPSBfZXZlbnRzW25hbWVdID0gW107XG4gICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyICB8fCBjb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwLCBrID0gZXZlbnRzLmxlbmd0aDsgaiA8IGs7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXZlbnQgPSBldmVudHNbal07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGxpc3RlbmVyICYmIGxpc3RlbmVyICE9PSBldmVudC5saXN0ZW5lciAmJiBsaXN0ZW5lciAhPT0gZXZlbnQubGlzdGVuZXIubGlzdGVuZXIgICYmIGxpc3RlbmVyICE9PSBldmVudC5saXN0ZW5lci5fbGlzdGVuZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwoY29udGV4dCAmJiBjb250ZXh0ICE9PSBldmVudC5jb250ZXh0KVxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0YWluLnB1c2goZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghcmV0YWluLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgX2V2ZW50c1tuYW1lXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoYXQ7XG4gICAgfTtcbiAgICB0aGF0Lm9uY2UgPSBmdW5jdGlvbihuYW1lLCBsaXN0ZW5lciwgY29udGV4dCl7XG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgIGNvbnN0IG9uY2VDYWxsYmFjayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKGNvdW50KyspIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGF0Lm9mZihuYW1lLCBvbmNlQ2FsbGJhY2spO1xuICAgICAgICAgICAgbGlzdGVuZXIuYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICAgICAgb25jZUNhbGxiYWNrLl9saXN0ZW5lciA9IGxpc3RlbmVyO1xuICAgICAgICByZXR1cm4gdGhhdC5vbihuYW1lLCBvbmNlQ2FsbGJhY2ssIGNvbnRleHQpO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgRXZlbnRFbWl0dGVyO1xuIiwiaW1wb3J0IF8gZnJvbSAndXRpbHMvdW5kZXJzY29yZSc7XG5cbi8qKlxuICogQGJyaWVmICAgVGhpcyBleGVjdXRlcyB0aGUgaW5wdXQgY29tbWFuZHMgYXQgYSBzcGVjaWZpYyBwb2ludCBpbiB0aW1lLlxuICogQHBhcmFtICAgaW5zdGFuY2VcbiAqIEBwYXJhbSAgIHF1ZXVlZENvbW1hbmRzXG4gKiAqL1xuY29uc3QgTGF6eUNvbW1hbmRFeGVjdXRvciA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgcXVldWVkQ29tbWFuZHMpIHtcbiAgICBsZXQgY29tbWFuZFF1ZXVlID0gW107XG4gICAgbGV0IHVuZGVjb3JhdGVkTWV0aG9kcyA9IHt9O1xuICAgIGxldCBleGVjdXRlTW9kZSA9IGZhbHNlO1xuICAgIGxldCB0aGF0ID0ge307XG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciBsb2FkZWQuXCIpO1xuICAgIHF1ZXVlZENvbW1hbmRzLmZvckVhY2goKGNvbW1hbmQpID0+IHtcbiAgICAgICAgY29uc3QgbWV0aG9kID0gaW5zdGFuY2VbY29tbWFuZF07XG4gICAgICAgIHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXSA9IG1ldGhvZCB8fCBmdW5jdGlvbigpe307XG5cbiAgICAgICAgaW5zdGFuY2VbY29tbWFuZF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICAgICAgICAgICAgICBpZiAoIWV4ZWN1dGVNb2RlKSB7XG4gICAgICAgICAgICAgICAgLy9jb21tYW5kUXVldWUucHVzaCh7IGNvbW1hbmQsIGFyZ3MgfSk7XG4gICAgICAgICAgICAgICAgdGhhdC5hZGRRdWV1ZShjb21tYW5kLCBhcmdzKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBleGVjdXRlUXVldWVkQ29tbWFuZHMoKTtcbiAgICAgICAgICAgICAgICBpZiAobWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZC5hcHBseSh0aGF0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7XG4gICAgdmFyIGV4ZWN1dGVRdWV1ZWRDb21tYW5kcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2hpbGUgKGNvbW1hbmRRdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjb25zdCB7IGNvbW1hbmQsIGFyZ3MgfSA9IGNvbW1hbmRRdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgICAgKHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXSB8fCBpbnN0YW5jZVtjb21tYW5kXSkuYXBwbHkoaW5zdGFuY2UsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhhdC5zZXRFeGVjdXRlTW9kZSA9IChtb2RlKSA9PiB7XG4gICAgICAgIGV4ZWN1dGVNb2RlID0gbW9kZTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IHNldEV4ZWN1dGVNb2RlKClcIiwgbW9kZSk7XG4gICAgfTtcbiAgICB0aGF0LmdldFVuZGVjb3JhdGVkTWV0aG9kcyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBnZXRVbmRlY29yYXRlZE1ldGhvZHMoKVwiLCB1bmRlY29yYXRlZE1ldGhvZHMpO1xuICAgICAgICByZXR1cm4gdW5kZWNvcmF0ZWRNZXRob2RzO1xuICAgIH1cbiAgICB0aGF0LmdldFF1ZXVlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGdldFF1ZXVlKClcIiwgZ2V0UXVldWUpO1xuICAgICAgICByZXR1cm4gY29tbWFuZFF1ZXVlO1xuICAgIH1cbiAgICB0aGF0LmFkZFF1ZXVlID0gZnVuY3Rpb24oY29tbWFuZCwgYXJncyl7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBhZGRRdWV1ZSgpXCIsIGNvbW1hbmQsIGFyZ3MpO1xuICAgICAgICBjb21tYW5kUXVldWUucHVzaCh7IGNvbW1hbmQsIGFyZ3MgfSk7XG4gICAgfVxuXG4gICAgdGhhdC5mbHVzaCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhenlDb21tYW5kRXhlY3V0b3IgOiBmbHVzaCgpXCIpO1xuICAgICAgICBleGVjdXRlUXVldWVkQ29tbWFuZHMoKTtcbiAgICB9O1xuICAgIHRoYXQuZW1wdHkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGVtcHR5KClcIik7XG4gICAgICAgIGNvbW1hbmRRdWV1ZS5sZW5ndGggPSAwO1xuICAgIH07XG4gICAgdGhhdC5vZmYgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IG9mZigpXCIpO1xuICAgICAgICBxdWV1ZWRDb21tYW5kcy5mb3JFYWNoKChjb21tYW5kKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtZXRob2QgPSB1bmRlY29yYXRlZE1ldGhvZHNbY29tbWFuZF07XG4gICAgICAgICAgICBpZiAobWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VbY29tbWFuZF0gPSBtZXRob2Q7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHVuZGVjb3JhdGVkTWV0aG9kc1tjb21tYW5kXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuXG4gICAgLy9SdW4gb25jZSBhdCB0aGUgZW5kXG4gICAgdGhhdC5yZW1vdmVBbmRFeGN1dGVPbmNlID0gZnVuY3Rpb24oY29tbWFuZF8pe1xuICAgICAgICBsZXQgY29tbWFuZFF1ZXVlSXRlbSA9IF8uZmluZFdoZXJlKGNvbW1hbmRRdWV1ZSwge2NvbW1hbmQgOiBjb21tYW5kX30pO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXp5Q29tbWFuZEV4ZWN1dG9yIDogcmVtb3ZlQW5kRXhjdXRlT25jZSgpXCIsIGNvbW1hbmRfKTtcbiAgICAgICAgY29tbWFuZFF1ZXVlLnNwbGljZShfLmZpbmRJbmRleChjb21tYW5kUXVldWUsIHtjb21tYW5kIDogY29tbWFuZF99KSwgMSk7XG5cbiAgICAgICAgY29uc3QgbWV0aG9kID0gdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRfXTtcbiAgICAgICAgaWYgKG1ldGhvZCkge1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwicmVtb3ZlQ29tbWFuZCgpXCIpO1xuICAgICAgICAgICAgaWYoY29tbWFuZFF1ZXVlSXRlbSl7XG4gICAgICAgICAgICAgICAgKG1ldGhvZHx8IGluc3RhbmNlW2NvbW1hbmRfXSkuYXBwbHkoaW5zdGFuY2UsIGNvbW1hbmRRdWV1ZUl0ZW0uYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbnN0YW5jZVtjb21tYW5kX10gPSBtZXRob2Q7XG4gICAgICAgICAgICBkZWxldGUgdW5kZWNvcmF0ZWRNZXRob2RzW2NvbW1hbmRfXTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0LmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGF6eUNvbW1hbmRFeGVjdXRvciA6IGRlc3Ryb3koKVwiKTtcbiAgICAgICAgdGhhdC5vZmYoKTtcbiAgICAgICAgdGhhdC5lbXB0eSgpO1xuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IExhenlDb21tYW5kRXhlY3V0b3I7IiwiaW1wb3J0IHtpc1J0bXAsIGlzV2ViUlRDLCBpc0Rhc2gsIGlzSGxzfSBmcm9tIFwidXRpbHMvdmFsaWRhdG9yXCI7XG5pbXBvcnQge2FuYWxVc2VyQWdlbnR9IGZyb20gXCJ1dGlscy9icm93c2VyXCI7XG4vKipcbiAqIEBicmllZiAgIFRoaXMgZmluZHMgdGhlIHByb3ZpZGVyIHRoYXQgbWF0Y2hlcyB0aGUgaW5wdXQgc291cmNlLlxuICogQHBhcmFtXG4gKiAqL1xuXG5jb25zdCBTdXBwb3J0Q2hlY2tlciA9IGZ1bmN0aW9uKCl7XG4gICAgY29uc3QgdGhhdCA9IHt9O1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlN1cHBvcnRDaGVja2VyIGxvYWRlZC5cIik7XG4gICAgbGV0IHVzZXJBZ2VudE9iamVjdCA9IGFuYWxVc2VyQWdlbnQoKTtcblxuICAgIGNvbnN0IHN1cHBvcnRMaXN0ID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnaHRtbDUnLFxuICAgICAgICAgICAgY2hlY2tTdXBwb3J0OiBmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgTWltZVR5cGVzID0ge1xuICAgICAgICAgICAgICAgICAgICBhYWM6ICdhdWRpby9tcDQnLFxuICAgICAgICAgICAgICAgICAgICBtcDQ6ICd2aWRlby9tcDQnLFxuICAgICAgICAgICAgICAgICAgICBmNHY6ICd2aWRlby9tcDQnLFxuICAgICAgICAgICAgICAgICAgICBtNHY6ICd2aWRlby9tcDQnLFxuICAgICAgICAgICAgICAgICAgICBtb3Y6ICd2aWRlby9tcDQnLFxuICAgICAgICAgICAgICAgICAgICBtcDM6ICdhdWRpby9tcGVnJyxcbiAgICAgICAgICAgICAgICAgICAgbXBlZzogJ2F1ZGlvL21wZWcnLFxuICAgICAgICAgICAgICAgICAgICBvZ3Y6ICd2aWRlby9vZ2cnLFxuICAgICAgICAgICAgICAgICAgICBvZ2c6ICd2aWRlby9vZ2cnLFxuICAgICAgICAgICAgICAgICAgICBvZ2E6ICd2aWRlby9vZ2cnLFxuICAgICAgICAgICAgICAgICAgICB2b3JiaXM6ICd2aWRlby9vZ2cnLFxuICAgICAgICAgICAgICAgICAgICB3ZWJtOiAndmlkZW8vd2VibScsXG4gICAgICAgICAgICAgICAgICAgIGY0YTogJ3ZpZGVvL2FhYycsXG4gICAgICAgICAgICAgICAgICAgIG0zdTg6ICdhcHBsaWNhdGlvbi92bmQuYXBwbGUubXBlZ3VybCcsXG4gICAgICAgICAgICAgICAgICAgIG0zdTogJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyxcbiAgICAgICAgICAgICAgICAgICAgaGxzOiAnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHZpZGVvID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJylcbiAgICAgICAgICAgICAgICB9KCk7XG4gICAgICAgICAgICAgICAgaWYgKCF2aWRlby5jYW5QbGF5VHlwZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gc291cmNlLmZpbGU7XG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IHNvdXJjZS50eXBlO1xuXG4gICAgICAgICAgICAgICAgaWYoIXR5cGUpe3JldHVybiBmYWxzZTt9XG4gICAgICAgICAgICAgICAgY29uc3QgbWltZVR5cGUgPSBzb3VyY2UubWltZVR5cGUgfHwgTWltZVR5cGVzW3R5cGVdO1xuXG4gICAgICAgICAgICAgICAgaWYoaXNIbHMoZmlsZSwgdHlwZSkgJiYgdXNlckFnZW50T2JqZWN0LmJyb3dzZXIgPT09IFwiTWljcm9zb2Z0IEVkZ2VcIiApe1xuICAgICAgICAgICAgICAgICAgICAvL0VkZ2Ugc3VwcG9ydHMgaGxzIG5hdGl2ZSBidXQgdGhhdCdzIHN1Y2tzLlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGlzUnRtcChmaWxlLCB0eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoaXNXZWJSVEMoZmlsZSwgdHlwZSkpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFtaW1lVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuICEhdmlkZW8uY2FuUGxheVR5cGUobWltZVR5cGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnd2VicnRjJyxcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZpZGVvID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJylcbiAgICAgICAgICAgICAgICB9KCk7XG4gICAgICAgICAgICAgICAgaWYgKCF2aWRlby5jYW5QbGF5VHlwZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpc1J0bXAoZmlsZSwgdHlwZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc291cmNlLnR5cGU7XG5cbiAgICAgICAgICAgICAgICBpZihpc1dlYlJUQyhmaWxlLCB0eXBlKSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnZGFzaCcsXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gc291cmNlLmZpbGU7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc291cmNlLnR5cGU7XG4gICAgICAgICAgICAgICAgaWYgKGlzUnRtcChmaWxlLCB0eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAoIHdpbmRvdy5NZWRpYVNvdXJjZSB8fCB3aW5kb3cuV2ViS2l0TWVkaWFTb3VyY2UgKSA9PT0gXCJmdW5jdGlvblwiICYmIGlzRGFzaChmaWxlLCB0eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ2hscycsXG4gICAgICAgICAgICBjaGVja1N1cHBvcnQ6IGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2aWRlbyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpXG4gICAgICAgICAgICAgICAgfSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc291cmNlLnR5cGU7XG4gICAgICAgICAgICAgICAgaWYgKGlzUnRtcChmaWxlLCB0eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy90aGlzIG1ldGhvZCBmcm9tIGhscy5qc1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzSGxzU3VwcG9ydCA9ICgpID0+e1xuICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gZ2V0TWVkaWFTb3VyY2UoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93Lk1lZGlhU291cmNlIHx8IHdpbmRvdy5XZWJLaXRNZWRpYVNvdXJjZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YXIgbWVkaWFTb3VyY2UgPSBnZXRNZWRpYVNvdXJjZSgpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc291cmNlQnVmZmVyID0gd2luZG93LlNvdXJjZUJ1ZmZlciB8fCB3aW5kb3cuV2ViS2l0U291cmNlQnVmZmVyO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXNUeXBlU3VwcG9ydGVkID0gbWVkaWFTb3VyY2UgJiYgdHlwZW9mIG1lZGlhU291cmNlLmlzVHlwZVN1cHBvcnRlZCA9PT0gJ2Z1bmN0aW9uJyAmJiBtZWRpYVNvdXJjZS5pc1R5cGVTdXBwb3J0ZWQoJ3ZpZGVvL21wNDsgY29kZWNzPVwiYXZjMS40MkUwMUUsbXA0YS40MC4yXCInKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBTb3VyY2VCdWZmZXIgaXMgZXhwb3NlZCBlbnN1cmUgaXRzIEFQSSBpcyB2YWxpZFxuICAgICAgICAgICAgICAgICAgICAvLyBzYWZhcmkgYW5kIG9sZCB2ZXJzaW9uIG9mIENocm9tZSBkb2Ugbm90IGV4cG9zZSBTb3VyY2VCdWZmZXIgZ2xvYmFsbHkgc28gY2hlY2tpbmcgU291cmNlQnVmZmVyLnByb3RvdHlwZSBpcyBpbXBvc3NpYmxlXG4gICAgICAgICAgICAgICAgICAgIHZhciBzb3VyY2VCdWZmZXJWYWxpZEFQSSA9ICFzb3VyY2VCdWZmZXIgfHwgc291cmNlQnVmZmVyLnByb3RvdHlwZSAmJiB0eXBlb2Ygc291cmNlQnVmZmVyLnByb3RvdHlwZS5hcHBlbmRCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHNvdXJjZUJ1ZmZlci5wcm90b3R5cGUucmVtb3ZlID09PSAnZnVuY3Rpb24nO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gISFpc1R5cGVTdXBwb3J0ZWQgJiYgISFzb3VyY2VCdWZmZXJWYWxpZEFQSTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8vUmVtb3ZlIHRoaXMgJyEhdmlkZW8uY2FuUGxheVR5cGUoJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyknIGlmIHlvdSB3YW50IHRvIHVzZSBobHNqcy5cbiAgICAgICAgICAgICAgICAvL1llcyBJIG5lZWQgaGxzanMuIDIwMTktMDYtMTIgJiYgISF2aWRlby5jYW5QbGF5VHlwZSgnYXBwbGljYXRpb24vdm5kLmFwcGxlLm1wZWd1cmwnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNIbHNTdXBwb3J0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdydG1wJyxcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydDogZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBzb3VyY2UuZmlsZTtcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gc291cmNlLnR5cGU7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gdGVzdEZsYXNoKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdXBwb3J0ID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9JRSBvbmx5XG4gICAgICAgICAgICAgICAgICAgIGlmKFwiQWN0aXZlWE9iamVjdFwiIGluIHdpbmRvdykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0cnl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VwcG9ydCA9ICEhKG5ldyBBY3RpdmVYT2JqZWN0KFwiU2hvY2t3YXZlRmxhc2guU2hvY2t3YXZlRmxhc2hcIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfWNhdGNoKGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1cHBvcnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9XM0MsIGJldHRlciBzdXBwb3J0IGluIGxlZ2FjeSBicm93c2VyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN1cHBvcnQgPSAhIW5hdmlnYXRvci5taW1lVHlwZXNbJ2FwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoJ107XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdXBwb3J0O1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGNoZWNrU3VwcG9ydCgpe1xuICAgICAgICAgICAgICAgICAgICBpZih1c2VyQWdlbnRPYmplY3QuYnJvd3NlciA9PT0gXCJNaWNyb3NvZnQgRWRnZVwiIHx8IHVzZXJBZ2VudE9iamVjdC5vcyA9PT0gXCJBbmRyb2lkXCIgfHwgdXNlckFnZW50T2JqZWN0Lm9zID09PSBcImlPU1wiICB8fCB1c2VyQWdlbnRPYmplY3QuYnJvd3NlciA9PT0gXCJTYWZhcmlcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlzUnRtcChmaWxlLCB0eXBlKSAmJiB0ZXN0Rmxhc2goKSAmJiBjaGVja1N1cHBvcnQoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIF07XG5cbiAgICB0aGF0LmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZSA9IChzb3J1Y2VfKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlN1cHBvcnRDaGVja2VyIDogZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKClcIiwgc29ydWNlXyk7XG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IChzb3J1Y2VfID09PSBPYmplY3Qoc29ydWNlXykpID8gc29ydWNlXyA6IHt9O1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgc3VwcG9ydExpc3QubGVuZ3RoOyBpICsrKXtcbiAgICAgICAgICAgIGlmKHN1cHBvcnRMaXN0W2ldLmNoZWNrU3VwcG9ydChzb3VyY2UpKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VwcG9ydExpc3RbaV0ubmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhhdC5maW5kUHJvdmlkZXJOYW1lc0J5UGxheWxpc3QgPSAocGxheWxpc3RJdGVtKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlN1cHBvcnRDaGVja2VyIDogZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0KClcIiwgcGxheWxpc3RJdGVtKTtcbiAgICAgICAgbGV0IHN1cHBvcnROYW1lcyA9IFtdO1xuICAgICAgICAvKmZvciAobGV0IGkgPSBwbGF5bGlzdF8ubGVuZ3RoOyBpLS07KSB7XG5cblxuICAgICAgICB9Ki9cbiAgICAgICAgY29uc3QgaXRlbSA9IHBsYXlsaXN0SXRlbTtcblxuICAgICAgICBpZihpdGVtICYmIGl0ZW0uc291cmNlcyl7XG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgaXRlbS5zb3VyY2VzLmxlbmd0aDsgaiArKyl7XG4gICAgICAgICAgICAgICAgbGV0IHNvdXJjZSA9IGl0ZW0uc291cmNlc1tqXTtcbiAgICAgICAgICAgICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1cHBvcnRlZCA9IHRoYXQuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKHNvdXJjZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdXBwb3J0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1cHBvcnROYW1lcy5wdXNoKHN1cHBvcnRlZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBzdXBwb3J0TmFtZXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICB9O1xuICAgIHJldHVybiB0aGF0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU3VwcG9ydENoZWNrZXI7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA3LiA0Li5cbiAqL1xuaW1wb3J0IFNydFBhcnNlciBmcm9tIFwiYXBpL2NhcHRpb24vcGFyc2VyL1NydFBhcnNlclwiO1xuaW1wb3J0IFZUVEN1ZSBmcm9tIFwidXRpbHMvY2FwdGlvbnMvdnR0Q3VlXCI7XG4vL2ltcG9ydCBSZXF1ZXN0IGZyb20gXCJ1dGlscy9kb3dubG9hZGVyXCI7XG5cbmNvbnN0IExvYWRlciA9IGZ1bmN0aW9uKCl7XG4gICAgY29uc3QgdGhhdCA9IHt9O1xuXG4gICAgY29uc3QgY29udmVydFRvVlRUQ3VlcyA9IGZ1bmN0aW9uIChjdWVzKSB7XG4gICAgICAgIHJldHVybiBjdWVzLm1hcChjdWUgPT4gbmV3IFZUVEN1ZShjdWUuc3RhcnQsIGN1ZS5lbmQsIGN1ZS50ZXh0KSk7XG4gICAgfVxuICAgIC8vbGFuZ3VhZ2UgOiBmb3IgU01JIGZvcm1hdC5cbiAgICB0aGF0LmxvYWQgPSAodHJhY2ssIGxhbmd1YWdlLCBzdWNjZXNzQ2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spID0+IHtcblxuICAgICAgICB2YXIgcmVxdWVzdE9wdGlvbnMgID0ge1xuICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICAgICAgdXJsIDogdHJhY2suZmlsZSxcbiAgICAgICAgICAgIGVuY29kaW5nOiBudWxsXG4gICAgICAgIH07XG5cbiAgICAgICAgbG9hZFJlcXVlc3REb3dubG9kZXIoKS50aGVuKFJlcXVlc3QgPT4ge1xuICAgICAgICAgICAgUmVxdWVzdChyZXF1ZXN0T3B0aW9ucywgZnVuY3Rpb24oZXJyb3IsIHJlc3BvbnNlLCBib2R5KSB7XG4gICAgICAgICAgICAgICAgaWYoZXJyb3Ipe1xuICAgICAgICAgICAgICAgICAgICBlcnJvckNhbGxiYWNrKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1ZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZ0dEN1ZXMgPSBbXTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoYm9keS5pbmRleE9mKCdXRUJWVFQnKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJXRUJWVFQgTE9BREVEXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9hZFZ0dFBhcnNlcigpLnRoZW4oV2ViVlRUID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGFyc2VyID0gbmV3IFdlYlZUVC5QYXJzZXIod2luZG93LCBXZWJWVFQuU3RyaW5nRGVjb2RlcigpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2dHRDdWVzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VyLm9uY3VlID0gZnVuY3Rpb24oY3VlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZ0dEN1ZXMucHVzaChjdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VyLm9uZmx1c2ggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWxldGUgdHJhY2sueGhyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzQ2FsbGJhY2sodnR0Q3Vlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQYXJzZSBjYWxscyBvbmZsdXNoIGludGVybmFsbHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZXIucGFyc2UoYm9keSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWxldGUgdHJhY2sueGhyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yQ2FsbGJhY2soZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKGJvZHkuaW5kZXhPZignU0FNSScpID49IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU0FNSSBMT0FERURcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkU21pUGFyc2VyKCkudGhlbihTbWlQYXJzZXIgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwYXJzZWREYXRhID0gU21pUGFyc2VyKGJvZHksIHtmaXhlZExhbmcgOiBsYW5ndWFnZX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZ0dEN1ZXMgPSBjb252ZXJ0VG9WVFRDdWVzKHBhcnNlZERhdGEucmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzQ2FsbGJhY2sodnR0Q3Vlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9kZWxldGUgdHJhY2sueGhyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yQ2FsbGJhY2soZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlNSVCBMT0FERURcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdWVzID0gU3J0UGFyc2VyKGJvZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdnR0Q3VlcyA9IGNvbnZlcnRUb1ZUVEN1ZXMoY3Vlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzQ2FsbGJhY2sodnR0Q3Vlcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAvL2RlbGV0ZSB0cmFjay54aHI7XG4gICAgICAgICAgICBlcnJvckNhbGxiYWNrKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufTtcbmZ1bmN0aW9uIGxvYWRSZXF1ZXN0RG93bmxvZGVyKCl7XG4gICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsndXRpbHMvZG93bmxvYWRlciddLCBmdW5jdGlvbiAocmVxdWlyZSkge1xuICAgICAgICByZXR1cm4gcmVxdWlyZSgndXRpbHMvZG93bmxvYWRlcicpLmRlZmF1bHQ7XG4gICAgfSwgZnVuY3Rpb24oZXJyKXtjb25zb2xlLmxvZyhlcnIpO30sICdkb3dubG9hZGVyJyk7XG59O1xuZnVuY3Rpb24gbG9hZFZ0dFBhcnNlcigpIHtcbiAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvY2FwdGlvbi9wYXJzZXIvVnR0UGFyc2VyJ10sIGZ1bmN0aW9uIChyZXF1aXJlKSB7XG4gICAgICAgIHJldHVybiByZXF1aXJlKCdhcGkvY2FwdGlvbi9wYXJzZXIvVnR0UGFyc2VyJykuZGVmYXVsdDtcbiAgICB9LCBmdW5jdGlvbihlcnIpe2NvbnNvbGUubG9nKGVycik7fSwgJ3Z0dHBhcnNlcicpO1xufVxuZnVuY3Rpb24gbG9hZFNtaVBhcnNlcigpIHtcbiAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvY2FwdGlvbi9wYXJzZXIvU21pUGFyc2VyJ10sIGZ1bmN0aW9uIChyZXF1aXJlKSB7XG4gICAgICAgIHJldHVybiByZXF1aXJlKCdhcGkvY2FwdGlvbi9wYXJzZXIvU21pUGFyc2VyJykuZGVmYXVsdDtcbiAgICB9LCBmdW5jdGlvbihlcnIpe2NvbnNvbGUubG9nKGVycik7fSwgJ3NtaXBhcnNlcicpO1xufVxuZXhwb3J0IGRlZmF1bHQgTG9hZGVyO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNS4gMTcuLlxuICovXG5pbXBvcnQgQ2FwdGlvbkxvYWRlciBmcm9tICdhcGkvY2FwdGlvbi9Mb2FkZXInO1xuaW1wb3J0IHtSRUFEWSwgRVJST1JTLCBFUlJPUiwgUExBWUVSX0NBUFRJT05fRVJST1IsIENPTlRFTlRfTUVUQSwgQ09OVEVOVF9USU1FLCBDT05URU5UX0NBUFRJT05fQ1VFX0NIQU5HRUQsIENPTlRFTlRfQ0FQVElPTl9DSEFOR0VEfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcblxuY29uc3QgaXNTdXBwb3J0ID0gZnVuY3Rpb24oa2luZCl7XG4gICAgcmV0dXJuIGtpbmQgPT09ICdzdWJ0aXRsZXMnIHx8IGtpbmQgPT09ICdjYXB0aW9ucyc7XG59O1xuXG5jb25zdCBNYW5hZ2VyID0gZnVuY3Rpb24oYXBpLCBwbGF5bGlzdEluZGV4KXtcblxuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICBsZXQgY2FwdGlvbkxpc3QgPSBbXTtcbiAgICBsZXQgY3VycmVudENhcHRpb25JbmRleCA9IC0xO1xuXG4gICAgbGV0IGNhcHRpb25Mb2FkZXIgPSBDYXB0aW9uTG9hZGVyKCk7XG4gICAgbGV0IGlzRmlzcnRMb2FkID0gdHJ1ZTtcbiAgICBsZXQgaXNTaG93aW5nID0gZmFsc2U7XG5cblxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkNhcHRpb24gTWFuYWdlciA+PiBcIiwgcGxheWxpc3RJbmRleCk7XG5cblxuICAgIGxldCBiaW5kVHJhY2sgPSBmdW5jdGlvbih0cmFjaywgdnR0Q3Vlcyl7XG4gICAgICAgIHRyYWNrLmRhdGEgPSB2dHRDdWVzIHx8IFtdO1xuICAgICAgICB0cmFjay5uYW1lID0gdHJhY2subGFiZWwgfHwgdHJhY2submFtZSB8fCB0cmFjay5sYW5ndWFnZTtcbiAgICAgICAgdHJhY2suaWQgPSAoZnVuY3Rpb24odHJhY2ssIHRyYWNrc0NvdW50KSB7XG4gICAgICAgICAgICB2YXIgdHJhY2tJZDtcbiAgICAgICAgICAgIHZhciBwcmVmaXggPSB0cmFjay5raW5kIHx8ICdjYyc7XG4gICAgICAgICAgICBpZiAodHJhY2suZGVmYXVsdCB8fCB0cmFjay5kZWZhdWx0dHJhY2spIHtcbiAgICAgICAgICAgICAgICB0cmFja0lkID0gJ2RlZmF1bHQnO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRyYWNrSWQgPSB0cmFjay5pZCB8fCAocHJlZml4ICsgdHJhY2tzQ291bnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoaXNGaXNydExvYWQpe1xuICAgICAgICAgICAgICAgIC8vVGhpcyBleGVjdXRlIG9ubHkgb24uIGFuZCB0aGVuIHVzZSBmbHVzaENhcHRpb25MaXN0KGxhc3RDYXB0aW9uSW5kZXgpO1xuICAgICAgICAgICAgICAgIGNoYW5nZUN1cnJlbnRDYXB0aW9uKGNhcHRpb25MaXN0Lmxlbmd0aHx8MCk7XG4gICAgICAgICAgICAgICAgaXNGaXNydExvYWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRyYWNrSWQ7XG4gICAgICAgIH0pKHRyYWNrLCBjYXB0aW9uTGlzdC5sZW5ndGgpO1xuXG4gICAgICAgIGNhcHRpb25MaXN0LnB1c2godHJhY2spO1xuICAgICAgICByZXR1cm4gdHJhY2suaWQ7XG4gICAgfTtcbiAgICBsZXQgY2hhbmdlQ3VycmVudENhcHRpb24gPSBmdW5jdGlvbihpbmRleCl7XG4gICAgICAgIGN1cnJlbnRDYXB0aW9uSW5kZXggPSBpbmRleDtcbiAgICAgICAgYXBpLnRyaWdnZXIoQ09OVEVOVF9DQVBUSU9OX0NIQU5HRUQsIGN1cnJlbnRDYXB0aW9uSW5kZXgpO1xuICAgIH07XG4gICAgaWYoYXBpLmdldENvbmZpZygpLnBsYXlsaXN0ICYmIGFwaS5nZXRDb25maWcoKS5wbGF5bGlzdC5sZW5ndGggPiAwKXtcbiAgICAgICAgbGV0IHBsYXlsaXN0ID0gYXBpLmdldENvbmZpZygpLnBsYXlsaXN0W3BsYXlsaXN0SW5kZXhdO1xuXG4gICAgICAgIGlmKHBsYXlsaXN0ICYmIHBsYXlsaXN0LnRyYWNrcyAmJiBwbGF5bGlzdC50cmFja3MubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcGxheWxpc3QudHJhY2tzLmxlbmd0aDsgaSArKyl7XG4gICAgICAgICAgICAgICAgY29uc3QgdHJhY2sgPSBwbGF5bGlzdC50cmFja3NbaV07XG5cbiAgICAgICAgICAgICAgICBpZihpc1N1cHBvcnQodHJhY2sua2luZCkgJiYgISBfLmZpbmRXaGVyZSh0cmFjaywge2ZpbGUgOiB0cmFjay5maWxlfSkpe1xuICAgICAgICAgICAgICAgICAgICAvL3RoYXQuZmx1c2hDYXB0aW9uTGlzdChjdXJyZW50Q2FwdGlvbkluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgY2FwdGlvbkxvYWRlci5sb2FkKHRyYWNrLCB0cmFjay5sYW5nLCBmdW5jdGlvbih2dHRDdWVzKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHZ0dEN1ZXMgJiYgdnR0Q3Vlcy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2FwdGlvbklkID0gYmluZFRyYWNrKHRyYWNrLCB2dHRDdWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3Ipe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SU1tQTEFZRVJfQ0FQVElPTl9FUlJPUl07XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwaS50cmlnZ2VyKEVSUk9SLCB0ZW1wRXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFwaS5vbihDT05URU5UX1RJTUUsIGZ1bmN0aW9uKG1ldGEpe1xuICAgICAgICBsZXQgcG9zaXRpb24gPSBtZXRhLnBvc2l0aW9uO1xuICAgICAgICBpZihjdXJyZW50Q2FwdGlvbkluZGV4ID4gLTEgJiYgY2FwdGlvbkxpc3RbY3VycmVudENhcHRpb25JbmRleF0pe1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRDdWVzID0gXy5maWx0ZXIoY2FwdGlvbkxpc3RbY3VycmVudENhcHRpb25JbmRleF0uZGF0YSwgZnVuY3Rpb24gKGN1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwb3NpdGlvbiA+PSAoY3VlLnN0YXJ0VGltZSkgJiYgKCAoIWN1ZS5lbmRUaW1lIHx8IHBvc2l0aW9uKSA8PSBjdWUuZW5kVGltZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmKGN1cnJlbnRDdWVzICYmIGN1cnJlbnRDdWVzLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIGFwaS50cmlnZ2VyKENPTlRFTlRfQ0FQVElPTl9DVUVfQ0hBTkdFRCwgY3VycmVudEN1ZXNbMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9KTtcbiAgICB0aGF0LmZsdXNoQ2FwdGlvbkxpc3QgPSAobGFzdENhcHRpb25JbmRleCkgPT57XG4gICAgICAgIGNhcHRpb25MaXN0ID0gW107XG4gICAgICAgIGNoYW5nZUN1cnJlbnRDYXB0aW9uKGxhc3RDYXB0aW9uSW5kZXgpO1xuICAgICAgICAvL2N1cnJlbnRDYXB0aW9uSW5kZXggPSBsYXN0Q2FwdGlvbkluZGV4O1xuICAgIH07XG4gICAgdGhhdC5nZXRDYXB0aW9uTGlzdCA9ICgpID0+e1xuICAgICAgICByZXR1cm4gY2FwdGlvbkxpc3R8fFtdO1xuICAgIH07XG4gICAgdGhhdC5nZXRDdXJyZW50Q2FwdGlvbiA9ICgpID0+e1xuICAgICAgICByZXR1cm4gY3VycmVudENhcHRpb25JbmRleDtcbiAgICB9O1xuICAgIHRoYXQuc2V0Q3VycmVudENhcHRpb24gPSAoX2luZGV4KSA9PntcbiAgICAgICAgaWYoX2luZGV4ID4gLTIgJiYgX2luZGV4IDwgY2FwdGlvbkxpc3QubGVuZ3RoKXtcbiAgICAgICAgICAgIGNoYW5nZUN1cnJlbnRDYXB0aW9uKF9pbmRleCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQuYWRkQ2FwdGlvbiA9ICh0cmFjaykgPT57XG4gICAgICAgIGlmKGlzU3VwcG9ydCh0cmFjay5raW5kKSAmJiAhIF8uZmluZFdoZXJlKGNhcHRpb25Mb2FkZXIsIHtmaWxlIDogdHJhY2suZmlsZX0pKXtcbiAgICAgICAgICAgIGNhcHRpb25Mb2FkZXIubG9hZCh0cmFjaywgZnVuY3Rpb24odnR0Q3Vlcyl7XG4gICAgICAgICAgICAgICAgaWYodnR0Q3VlcyAmJiB2dHRDdWVzLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgICAgICBiaW5kVHJhY2sodHJhY2ssIHZ0dEN1ZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKXtcbiAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTW1BMQVlFUl9DQVBUSU9OX0VSUk9SXTtcbiAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICBhcGkudHJpZ2dlcihFUlJPUiwgdGVtcEVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LnJlbW92ZUNhcHRpb24gPSAoaW5kZXgpID0+IHtcbiAgICAgICAgaWYoaW5kZXggPiAtMSAmJiBpbmRleCA8IGNhcHRpb25MaXN0Lmxlbmd0aCl7XG4gICAgICAgICAgICBjYXB0aW9uTGlzdC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgcmV0dXJuIGNhcHRpb25MaXN0O1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgICAgIGNhcHRpb25MaXN0ID0gW107XG4gICAgICAgIGNhcHRpb25Mb2FkZXIgPSBudWxsO1xuICAgICAgICBhcGkub2ZmKENPTlRFTlRfVElNRSwgbnVsbCwgdGhhdCk7XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuXG5cblxuZXhwb3J0IGRlZmF1bHQgTWFuYWdlcjtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDUuIDI5Li5cbiAqL1xuaW1wb3J0IHsgaG1zVG9TZWNvbmQsIHRyaW0gfSBmcm9tIFwidXRpbHMvc3RyaW5nc1wiXG5cbmZ1bmN0aW9uIF9lbnRyeShkYXRhKSB7XG4gICAgdmFyIGVudHJ5ID0ge307XG4gICAgdmFyIGFycmF5ID0gZGF0YS5zcGxpdCgnXFxyXFxuJyk7XG4gICAgaWYgKGFycmF5Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBhcnJheSA9IGRhdGEuc3BsaXQoJ1xcbicpO1xuICAgIH1cbiAgICB2YXIgaWR4ID0gMTtcbiAgICBpZiAoYXJyYXlbMF0uaW5kZXhPZignIC0tPiAnKSA+IDApIHtcbiAgICAgICAgaWR4ID0gMDtcbiAgICB9XG4gICAgaWYgKGFycmF5Lmxlbmd0aCA+IGlkeCArIDEgJiYgYXJyYXlbaWR4ICsgMV0pIHtcbiAgICAgICAgLy8gVGhpcyBsaW5lIGNvbnRhaW5zIHRoZSBzdGFydCBhbmQgZW5kLlxuICAgICAgICB2YXIgbGluZSA9IGFycmF5W2lkeF07XG4gICAgICAgIHZhciBpbmRleCA9IGxpbmUuaW5kZXhPZignIC0tPiAnKTtcbiAgICAgICAgaWYgKGluZGV4ID4gMCkge1xuICAgICAgICAgICAgZW50cnkuc3RhcnQgPSBobXNUb1NlY29uZChsaW5lLnN1YnN0cigwLCBpbmRleCkpO1xuICAgICAgICAgICAgZW50cnkuZW5kID0gaG1zVG9TZWNvbmQobGluZS5zdWJzdHIoaW5kZXggKyA1KSk7XG4gICAgICAgICAgICBlbnRyeS50ZXh0ID0gYXJyYXkuc2xpY2UoaWR4ICsgMSkuam9pbignXFxyXFxuJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGVudHJ5O1xuXG59XG5cbmNvbnN0IFNydFBhcnNlciA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICB2YXIgY2FwdGlvbnMgPSBbXTtcblxuICAgIGRhdGEgPSB0cmltKGRhdGEpO1xuXG4gICAgdmFyIGxpc3QgPSBkYXRhLnNwbGl0KCdcXHJcXG5cXHJcXG4nKTtcbiAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgbGlzdCA9IGRhdGEuc3BsaXQoJ1xcblxcbicpO1xuICAgIH1cblxuXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGxpc3RbaV0gPT09ICdXRUJWVFQnKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZW50cnkgPSBfZW50cnkobGlzdFtpXSk7XG4gICAgICAgIGlmIChlbnRyeS50ZXh0KSB7XG4gICAgICAgICAgICBjYXB0aW9ucy5wdXNoKGVudHJ5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjYXB0aW9ucztcbn1cblxuXG5cbmV4cG9ydCBkZWZhdWx0IFNydFBhcnNlcjsiLCIvLyBTVEFURVxuZXhwb3J0IGNvbnN0IFNUQVRFX0JVRkZFUklORyA9IFwiYnVmZmVyaW5nXCI7XG5leHBvcnQgY29uc3QgU1RBVEVfSURMRSA9IFwiaWRsZVwiO1xuZXhwb3J0IGNvbnN0IFNUQVRFX0NPTVBMRVRFID0gXCJjb21wbGV0ZVwiO1xuZXhwb3J0IGNvbnN0IFNUQVRFX1BBVVNFRCA9IFwicGF1c2VkXCI7XG5leHBvcnQgY29uc3QgU1RBVEVfUExBWUlORyA9IFwicGxheWluZ1wiO1xuZXhwb3J0IGNvbnN0IFNUQVRFX0VSUk9SID0gXCJlcnJvclwiO1xuZXhwb3J0IGNvbnN0IFNUQVRFX0xPQURJTkcgPSBcImxvYWRpbmdcIjtcbmV4cG9ydCBjb25zdCBTVEFURV9TVEFMTEVEID0gXCJzdGFsbGVkXCI7XG5cbmV4cG9ydCBjb25zdCBTVEFURV9BRF9MT0FESU5HID0gXCJhZExvYWRpbmdcIjtcbmV4cG9ydCBjb25zdCBTVEFURV9BRF9MT0FERUQgPSBcImFkTG9hZGVkXCI7XG5leHBvcnQgY29uc3QgU1RBVEVfQURfUExBWUlORyA9IFwiYWRQbGF5aW5nXCI7XG5leHBvcnQgY29uc3QgU1RBVEVfQURfUEFVU0VEID0gXCJhZFBhdXNlZFwiO1xuZXhwb3J0IGNvbnN0IFNUQVRFX0FEX0NPTVBMRVRFID0gXCJhZENvbXBsZXRlXCI7XG5leHBvcnQgY29uc3QgU1RBVEVfQURfRVJST1IgPSBcImFkRXJyb3JcIjtcbmV4cG9ydCBjb25zdCBQTEFZRVJfQURfQ0xJQ0sgPSBcImFkY2xpY2tcIjtcblxuLy8gUFJPVklERVJcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9IVE1MNSA9IFwiaHRtbDVcIjtcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9XRUJSVEMgPSBcIndlYnJ0Y1wiO1xuZXhwb3J0IGNvbnN0IFBST1ZJREVSX0RBU0ggPSBcImRhc2hcIjtcbmV4cG9ydCBjb25zdCBQUk9WSURFUl9ITFMgPSBcImhsc1wiO1xuZXhwb3J0IGNvbnN0IFBST1ZJREVSX1JUTVAgPSBcInJ0bXBcIjtcblxuLy8gRVZFTlRTXG5leHBvcnQgY29uc3QgQ09OVEVOVF9DT01QTEVURSA9IFNUQVRFX0NPTVBMRVRFO1xuZXhwb3J0IGNvbnN0IFJFQURZID0gXCJyZWFkeVwiO1xuZXhwb3J0IGNvbnN0IERFU1RST1kgPSBcImRlc3Ryb3lcIjtcbmV4cG9ydCBjb25zdCBDT05URU5UX1NFRUsgPSBcInNlZWtcIjtcbmV4cG9ydCBjb25zdCBDT05URU5UX0JVRkZFUl9GVUxMID0gXCJidWZmZXJGdWxsXCI7XG5leHBvcnQgY29uc3QgRElTUExBWV9DTElDSyA9IFwiZGlzcGxheUNsaWNrXCI7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9MT0FERUQgPSBcImxvYWRlZFwiO1xuZXhwb3J0IGNvbnN0IFBMQVlMSVNUX0NIQU5HRUQgPSBcInBsYXlsaXN0Q2hhbmdlZFwiO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfU0VFS0VEID0gXCJzZWVrZWRcIjtcbmV4cG9ydCBjb25zdCBBTExfUExBWUxJU1RfRU5ERUQgPSBcImFsbFBsYXlsaXN0RW5kZWRcIjtcbmV4cG9ydCBjb25zdCBORVRXT1JLX1VOU1RBQkxFRCA9IFwidW5zdGFibGVOZXR3b3JrXCI7XG5cblxuXG5leHBvcnQgY29uc3QgRVJST1IgPSBcImVycm9yXCI7XG5cbi8vIFNUQVRFIE9GIFBMQVlFUlxuZXhwb3J0IGNvbnN0IFBMQVlFUl9TVEFURSA9IFwic3RhdGVDaGFuZ2VkXCI7XG5leHBvcnQgY29uc3QgUExBWUVSX0NPTVBMRVRFID0gU1RBVEVfQ09NUExFVEU7XG5leHBvcnQgY29uc3QgUExBWUVSX1BBVVNFID0gXCJwYXVzZVwiO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9QTEFZID0gXCJwbGF5XCI7XG5cbmV4cG9ydCBjb25zdCBQTEFZRVJfQ0xJQ0tFRCA9IFwiY2xpY2tlZFwiO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9SRVNJWkVEID0gXCJyZXNpemVkXCI7XG5leHBvcnQgY29uc3QgUExBWUVSX0xPQURJTkcgPSBcImxvYWRpbmdcIjtcbmV4cG9ydCBjb25zdCBQTEFZRVJfRlVMTFNDUkVFTl9SRVFVRVNUID0gXCJmdWxsc2NyZWVuUmVxdWVzdGVkXCI7XG5leHBvcnQgY29uc3QgUExBWUVSX0ZVTExTQ1JFRU5fQ0hBTkdFRCA9IFwiZnVsbHNjcmVlbkNoYW5nZWRcIjtcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0FSTklORyA9IFwid2FybmluZ1wiO1xuXG5leHBvcnQgY29uc3QgQURfQ0hBTkdFRCA9IFwiYWRDaGFuZ2VkXCI7XG5leHBvcnQgY29uc3QgQURfVElNRSA9IFwiYWRUaW1lXCI7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9CVUZGRVIgPSBcImJ1ZmZlckNoYW5nZWRcIjtcbmV4cG9ydCBjb25zdCBDT05URU5UX1RJTUUgPSBcInRpbWVcIjtcbmV4cG9ydCBjb25zdCBDT05URU5UX1JBVEVfQ0hBTkdFID0gXCJyYXRlY2hhbmdlXCI7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9WT0xVTUUgPSBcInZvbHVtZUNoYW5nZWRcIjtcbmV4cG9ydCBjb25zdCBDT05URU5UX01VVEUgPSBcIm11dGVcIjtcbmV4cG9ydCBjb25zdCBDT05URU5UX01FVEEgPSBcIm1ldGFDaGFuZ2VkXCI7XG5leHBvcnQgY29uc3QgQ09OVEVOVF9TT1VSQ0VfQ0hBTkdFRCA9IFwic291cmNlQ2hhbmdlZFwiO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfTEVWRUxfQ0hBTkdFRCA9IFwicXVhbGl0eUxldmVsQ2hhbmdlZFwiO1xuZXhwb3J0IGNvbnN0IFBMQVlCQUNLX1JBVEVfQ0hBTkdFRCA9IFwicGxheWJhY2tSYXRlQ2hhbmdlZFwiO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfQ0FQVElPTl9DVUVfQ0hBTkdFRCA9IFwiY3VlQ2hhbmdlZFwiO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfQ0FQVElPTl9DSEFOR0VEID0gXCJjYXB0aW9uQ2hhbmdlZFwiO1xuZXhwb3J0IGNvbnN0IENPTlRFTlRfVElNRV9NT0RFX0NIQU5HRUQgPSBcInRpbWVEaXNwbGF5TW9kZUNoYW5nZWRcIjtcbmV4cG9ydCBjb25zdCBPTUVfUDJQX01PREUgPSBcInAycE1vZGVcIjtcblxuXG5leHBvcnQgY29uc3QgSU5JVF9VTktOV09OX0VSUk9SID0gMTAwO1xuZXhwb3J0IGNvbnN0IElOSVRfVU5TVVBQT1JUX0VSUk9SID0gMTAxO1xuZXhwb3J0IGNvbnN0IElOSVRfUlRNUF9TRVRVUF9FUlJPUiA9IDEwMjtcbmV4cG9ydCBjb25zdCBJTklUX0RBU0hfVU5TVVBQT1JUID0gMTAzO1xuZXhwb3J0IGNvbnN0IElOSVRfQURTX0VSUk9SID0gMTA0O1xuZXhwb3J0IGNvbnN0IElOSVRfREFTSF9OT1RGT1VORCA9IDEwNTtcbmV4cG9ydCBjb25zdCBJTklUX0hMU0pTX05PVEZPVU5EID0gMTA2O1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX0VSUk9SID0gMzAwO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX09QRVJBVElPTl9FUlJPUiA9IDMwMTtcbmV4cG9ydCBjb25zdCBQTEFZRVJfVU5LTldPTl9ORVdXT1JLX0VSUk9SID0gMzAyO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9VTktOV09OX0RFQ09ERV9FUlJPUiA9IDMwMztcbmV4cG9ydCBjb25zdCBQTEFZRVJfRklMRV9FUlJPUiA9IDMwNDtcbmV4cG9ydCBjb25zdCBQTEFZRVJfQ0FQVElPTl9FUlJPUiA9IDMwNTtcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1dTX0VSUk9SID0gNTAxO1xuZXhwb3J0IGNvbnN0IFBMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUiA9IDUwMjtcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX1NFVF9SRU1PVEVfREVTQ19FUlJPUiA9IDUwMztcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX0NSRUFURV9BTlNXRVJfRVJST1IgPSA1MDQ7XG5leHBvcnQgY29uc3QgUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUiA9IDUwNTtcbmV4cG9ydCBjb25zdCBQTEFZRVJfV0VCUlRDX05FVFdPUktfU0xPVyA9IDUxMDtcblxuZXhwb3J0IGNvbnN0IFdBUk5fTVNHX01VVEVEUExBWSA9IFwiUGxlYXNlIHRvdWNoIGhlcmUgdG8gdHVybiBvbiB0aGUgc291bmQuXCI7XG5cbmV4cG9ydCBjb25zdCBFUlJPUlMgPSB7XG4gICAgMTAwIDoge2NvZGUgOiAxMDAgLCBtZXNzYWdlIDogXCJDYW4gbm90IGxvYWQgZHVlIHRvIHVua25vd24gcmVhc29ucy5cIiwgcmVhc29uIDpcIkNhbiBub3QgbG9hZCBkdWUgdG8gdW5rbm93biByZWFzb25zLlwifSxcbiAgICAxMDEgOiB7Y29kZSA6IDEwMSAsIG1lc3NhZ2UgOiBcIkNhbiBub3QgbG9hZCBkdWUgdG8gdW5zdXBwb3J0ZWQgbWVkaWEuXCIsIHJlYXNvbiA6XCJDYW4gbm90IGxvYWQgZHVlIHRvIHVuc3VwcG9ydGVkIG1lZGlhLlwifSxcbiAgICAxMDIgOiB7Y29kZSA6IDEwMiAsIG1lc3NhZ2UgOiBcIkZsYXNoIGZldGNoaW5nIHByb2Nlc3MgYWJvcnRlZC4gPC9icj48YSBocmVmPSdodHRwOi8vd3d3LmFkb2JlLmNvbS9nby9nZXRmbGFzaHBsYXllcicgdGFyZ2V0PSdfc2VsZic+PGltZyBzcmM9J2h0dHA6Ly93d3cuYWRvYmUuY29tL2ltYWdlcy9zaGFyZWQvZG93bmxvYWRfYnV0dG9ucy9nZXRfZmxhc2hfcGxheWVyLmdpZicgYWx0PSdHZXQgQWRvYmUgRmxhc2ggcGxheWVyJz48L2E+XCIsIHJlYXNvbiA6XCJJdCBsb29rcyBsaWtlIG5vdCBmb3VuZCBzd2Ygb3IgeW91ciBlbnZpcm9ubWVudCBpcyBsb2NhbGhvc3QuXCJ9LFxuICAgIDEwMyA6IHtjb2RlIDogMTAzICwgbWVzc2FnZSA6IFwiQ2FuIG5vdCBsb2FkIGR1ZSB0byBkYXNoanMuIFBsZWFzZSBjaGVjayB0aGUgbGFzdGVzdCB2ZXJzaW9uLlwiLCByZWFzb24gOlwiZGFzaC5qcyB2ZXJzaW9uIGlzIG9sZC4gUGxlYXNlIGNoZWNrIHRoZSBsYXN0ZXN0LlwifSxcbiAgICAxMDQgOiB7Y29kZSA6IDEwNCAsIG1lc3NhZ2UgOiBcIkNhbiBub3QgbG9hZCBkdWUgdG8gZ29vZ2xlIGltYSBmb3IgQWRzLiBcIiwgcmVhc29uIDpcIlBsZWFzZSBjaGVjayB0aGUgZ29vZ2xlIGltYSBsaWJyYXJ5LlwifSxcbiAgICAxMDUgOiB7Y29kZSA6IDEwNSAsIG1lc3NhZ2UgOiBcIkNhbiBub3QgZmluZCB0aGUgZGFzaGpzLiBQbGVhc2UgY2hlY2sgdGhlIGRhc2hqcy5cIiwgcmVhc29uIDpcIk5vdCBmb3VuZCBkYXNoanMuXCJ9LFxuICAgIDEwNiA6IHtjb2RlIDogMTA2ICwgbWVzc2FnZSA6IFwiQ2FuIG5vdCBmaW5kIHRoZSBobHNqcy4gUGxlYXNlIGNoZWNrIHRoZSBobHNqcy5cIiwgcmVhc29uIDpcIk5vdCBmb3VuZCBobHNqcy5cIn0sXG4gICAgMzAwIDoge2NvZGUgOiAzMDAgLCBtZXNzYWdlIDogXCJDYW4gbm90IHBsYXkgZHVlIHRvIHVua25vd24gcmVhc29ucy5cIiwgcmVhc29uIDpcIkNhbiBub3QgcGxheSBkdWUgdG8gdW5rbm93biByZWFzb25zLlwifSxcbiAgICAzMDEgOiB7Y29kZSA6IDMwMSAsIG1lc3NhZ2UgOiBcIkZldGNoaW5nIHByb2Nlc3MgYWJvcnRlZCBieSB1c2VyLlwiLCByZWFzb24gOlwiRmV0Y2hpbmcgcHJvY2VzcyBhYm9ydGVkIGJ5IHVzZXIuXCJ9LFxuICAgIDMwMiA6IHtjb2RlIDogMzAyICwgbWVzc2FnZSA6IFwiU29tZSBvZiB0aGUgbWVkaWEgY291bGQgbm90IGJlIGRvd25sb2FkZWQgZHVlIHRvIGEgbmV0d29yayBlcnJvci5cIiwgcmVhc29uIDpcIkVycm9yIG9jY3VycmVkIHdoZW4gZG93bmxvYWRpbmcuXCJ9LFxuICAgIDMwMyA6IHtjb2RlIDogMzAzICwgbWVzc2FnZSA6IFwiVW5hYmxlIHRvIGxvYWQgbWVkaWEuIFRoaXMgbWF5IGJlIGR1ZSB0byBhIHNlcnZlciBvciBuZXR3b3JrIGVycm9yLCBvciBkdWUgdG8gYW4gdW5zdXBwb3J0ZWQgZm9ybWF0LlwiLCByZWFzb24gOlwiRXJyb3Igb2NjdXJyZWQgd2hlbiBkZWNvZGluZy5cIn0sXG4gICAgMzA0IDoge2NvZGUgOiAzMDQgLCBtZXNzYWdlIDogXCJNZWRpYSBwbGF5YmFjayBoYXMgYmVlbiBjYW5jZWxlZC4gSXQgbG9va3MgbGlrZSB5b3VyIG1lZGlhIGlzIGNvcnJ1cHRlZCBvciB5b3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCB0aGUgZmVhdHVyZXMgeW91ciBtZWRpYSB1c2VzLlwiLCByZWFzb24gOlwiTWVkaWEgcGxheWJhY2sgbm90IHN1cHBvcnRlZC5cIn0sXG4gICAgMzA1IDoge2NvZGUgOiAzMDUgLCBtZXNzYWdlIDogXCJDYW4gbm90IGxvYWQgY2FwdGlvbnMgZHVlIHRvIHVua25vd24gcmVhc29ucy5cIiwgcmVhc29uIDpcIkNhbiBub3QgbG9hZCBjYXB0aW9ucyBkdWUgdG8gdW5rbm93biByZWFzb25zLlwifSxcbiAgICA1MDEgOiB7Y29kZSA6IDUwMSAsIG1lc3NhZ2UgOiBcIkNvbm5lY3Rpb24gd2l0aCBsb3ctbGF0ZW5jeShPTUUpIHNlcnZlciBmYWlsZWQuXCIsIHJlYXNvbiA6XCJXZWJTb2NrZXQgY29ubmVjdGlvbiBmYWlsZWQuXCJ9LFxuICAgIDUwMiA6IHtjb2RlIDogNTAyICwgbWVzc2FnZSA6IFwiQ29ubmVjdGlvbiB3aXRoIGxvdy1sYXRlbmN5KE9NRSkgc2VydmVyIGZhaWxlZC5cIiwgcmVhc29uIDpcIldlYlJUQyBhZGRJY2VDYW5kaWRhdGUgZmFpbGVkLlwifSxcbiAgICA1MDMgOiB7Y29kZSA6IDUwMyAsIG1lc3NhZ2UgOiBcIkNvbm5lY3Rpb24gd2l0aCBsb3ctbGF0ZW5jeShPTUUpIHNlcnZlciBmYWlsZWQuXCIsIHJlYXNvbiA6XCJXZWJSVEMgc2V0UmVtb3RlRGVzY3JpcHRpb24gZmFpbGVkLlwifSxcbiAgICA1MDQgOiB7Y29kZSA6IDUwNCAsIG1lc3NhZ2UgOiBcIkNvbm5lY3Rpb24gd2l0aCBsb3ctbGF0ZW5jeShPTUUpIHNlcnZlciBmYWlsZWQuXCIsIHJlYXNvbiA6XCJXZWJSVEMgcGVlciBjcmVhdGVPZmZlciBmYWlsZWQuXCJ9LFxuICAgIDUwNSA6IHtjb2RlIDogNTA1ICwgbWVzc2FnZSA6IFwiQ29ubmVjdGlvbiB3aXRoIGxvdy1sYXRlbmN5KE9NRSkgc2VydmVyIGZhaWxlZC5cIiwgcmVhc29uIDpcIldlYlJUQyBzZXRMb2NhbERlc2NyaXB0aW9uIGZhaWxlZC5cIn0sXG4gICAgNTEwIDoge2NvZGUgOiA1MTAgLCBtZXNzYWdlIDogXCJOZXR3b3JrIGNvbm5lY3Rpb24gaXMgdW5zdGFibGUuIENoZWNrIHRoZSBuZXR3b3JrIGNvbm5lY3Rpb24uXCIsIHJlYXNvbiA6XCJOZXR3b3JrIGlzIHNsb3cuXCJ9XG59O1xuXG5leHBvcnQgY29uc3QgVUlfSUNPTlMgPSB7XG4gICAgdm9sdW1lX211dGUgOiBcInZvbHVtZS1tdXRlXCJcbn07XG4iLCIvKipcbiAqIEBicmllZiAgIOuvuOuUlOyWtCDsl5jrpqzrqLztirjrpbwg6rSA66as7ZWY64qUIOqwneyytC4g7ZiE7J6s64qUIO2VmOuKlCDsnbzsnbQg66eO7KeAIOyViuuLpC5cbiAqIEBwYXJhbSAgIHtlbGVtZW50fSAgIGNvbnRhaW5lciAgIGRvbSBlbGVtZW50XG4gKlxuICogKi9cbmltcG9ydCB7Z2V0QnJvd3Nlcn0gZnJvbSBcInV0aWxzL2Jyb3dzZXJcIjtcbmltcG9ydCB7UFJPVklERVJfREFTSCwgUFJPVklERVJfSExTLCBQUk9WSURFUl9XRUJSVEMsIFBST1ZJREVSX0hUTUw1LCBQUk9WSURFUl9SVE1QfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuaW1wb3J0IExBJCBmcm9tIFwidXRpbHMvbGlrZUEkLmpzXCI7XG5pbXBvcnQge2dldFNjcmlwdFBhdGh9IGZyb20gJ3V0aWxzL3dlYnBhY2snO1xuaW1wb3J0IHt2ZXJzaW9ufSBmcm9tICd2ZXJzaW9uJztcbi8vVG9EbyA6IFJlc3RydWN0dXJpbmdcblxuY29uc3QgTWFuYWdlciA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgYnJvd3NlckluZm8pe1xuICAgIGNvbnN0IHRoYXQgPSB7fTtcbiAgICBjb25zdCBTV0ZQYXRoID0gZ2V0U2NyaXB0UGF0aCgnb3ZlbnBsYXllci5qcycpK1wiT3ZlblBsYXllckZsYXNoLnN3Zj92PVwiK3ZlcnNpb247XG4gICAgbGV0IHJvb3RJZCA9IGNvbnRhaW5lci5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBhcmVudC1pZFwiKTtcbiAgICBsZXQgJGNvbnRhaW5lciA9IExBJChjb250YWluZXIpO1xuICAgIGxldCB2aWRlb0VsZW1lbnQgPSBcIlwiO1xuXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTWVkaWFNYW5hZ2VyIGxvYWRlZC4gYnJvd3NlciA6IFwiLCBicm93c2VySW5mbyApO1xuXG4gICAgY29uc3QgY3JlYXRlSHRtbFZpZGVvID0gZnVuY3Rpb24oaXNMb29wKXtcbiAgICAgICAgdmlkZW9FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbiAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnZGlzYWJsZXJlbW90ZXBsYXliYWNrJywgJycpO1xuICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCd3ZWJraXQtcGxheXNpbmxpbmUnLCAndHJ1ZScpO1xuICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCdwbGF5c2lubGluZScsICd0cnVlJyk7XG4gICAgICAgIGlmKGlzTG9vcCl7XG4gICAgICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCdsb29wJywgJycpO1xuICAgICAgICB9XG4gICAgICAgICRjb250YWluZXIuYXBwZW5kKHZpZGVvRWxlbWVudCk7XG5cbiAgICAgICAgcmV0dXJuIHZpZGVvRWxlbWVudDtcbiAgICB9O1xuICAgIGNvbnN0IGNyZWF0ZUZsYXNoVmlkZW8gPSBmdW5jdGlvbihpc0xvb3AsIGJ1ZmZlclRpbWUsIGJ1ZmZlclRpbWVNYXgpe1xuICAgICAgICBsZXQgbW92aWUsIGZsYXNodmFycywgYWxsb3dzY3JpcHRhY2Nlc3MsIGFsbG93ZnVsbHNjcmVlbiwgcXVhbGl0eSwgbmFtZSwgbWVudSwgcXVhbCwgYmdjb2xvciwgbG9vcCwgd21vZGUgO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJNZWRpYU1hbmFnZXIgRmxhc2ggYnVmZmVyIHNldHRpbmcgOiBcIiwgYnVmZmVyVGltZSwgYnVmZmVyVGltZU1heCk7XG4gICAgICAgIG1vdmllID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcbiAgICAgICAgbW92aWUuc2V0QXR0cmlidXRlKCduYW1lJywgJ21vdmllJyk7XG4gICAgICAgIG1vdmllLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBTV0ZQYXRoKTtcblxuICAgICAgICBmbGFzaHZhcnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xuICAgICAgICBmbGFzaHZhcnMuc2V0QXR0cmlidXRlKCduYW1lJywgJ2ZsYXNodmFycycpO1xuICAgICAgICAvL3BsYXllcklkIGlzIHRvIHVzZSBTV0YgZm9yIEV4dGVybmFsSW50ZXJmYWNlLmNhbGwoKS5cbiAgICAgICAgZmxhc2h2YXJzLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBgcGxheWVySWQ9JHtyb290SWR9JmJ1ZmZlclRpbWU9JHtidWZmZXJUaW1lfSZidWZmZXJNYXhUaW1lPSR7YnVmZmVyVGltZU1heH1gKTtcblxuICAgICAgICBhbGxvd3NjcmlwdGFjY2VzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XG4gICAgICAgIGFsbG93c2NyaXB0YWNjZXNzLnNldEF0dHJpYnV0ZSgnbmFtZScsICdhbGxvd3NjcmlwdGFjY2VzcycpO1xuICAgICAgICBhbGxvd3NjcmlwdGFjY2Vzcy5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ2Fsd2F5cycpO1xuXG4gICAgICAgIGFsbG93ZnVsbHNjcmVlbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XG4gICAgICAgIGFsbG93ZnVsbHNjcmVlbi5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnYWxsb3dmdWxsc2NyZWVuJyk7XG4gICAgICAgIGFsbG93ZnVsbHNjcmVlbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ3RydWUnKTtcblxuICAgICAgICBxdWFsaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcbiAgICAgICAgcXVhbGl0eS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAncXVhbGl0eScpO1xuICAgICAgICBxdWFsaXR5LnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnaGVpZ2h0Jyk7XG5cbiAgICAgICAgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XG4gICAgICAgIG5hbWUuc2V0QXR0cmlidXRlKCduYW1lJywgJ25hbWUnKTtcbiAgICAgICAgbmFtZS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgcm9vdElkK1wiLWZsYXNoXCIpO1xuXG4gICAgICAgIG1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xuICAgICAgICBtZW51LnNldEF0dHJpYnV0ZSgnbmFtZScsICdtZW51Jyk7XG4gICAgICAgIG1lbnUuc2V0QXR0cmlidXRlKCd2YWx1ZScsICdmYWxzZScpO1xuXG4gICAgICAgIHF1YWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwYXJhbScpO1xuICAgICAgICBxdWFsLnNldEF0dHJpYnV0ZSgnbmFtZScsICdxdWFsaXR5Jyk7XG4gICAgICAgIHF1YWwuc2V0QXR0cmlidXRlKCd2YWx1ZScsICdoaWdoJyk7XG5cbiAgICAgICAgYmdjb2xvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XG4gICAgICAgIGJnY29sb3Iuc2V0QXR0cmlidXRlKCduYW1lJywgJ2JnY29sb3InKTtcbiAgICAgICAgYmdjb2xvci5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJyMwMDAwMDAnKTtcblxuICAgICAgICB3bW9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhcmFtJyk7XG4gICAgICAgIHdtb2RlLnNldEF0dHJpYnV0ZSgnbmFtZScsICd3bW9kZScpO1xuICAgICAgICB3bW9kZS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgJ29wYXF1ZScpO1xuXG4gICAgICAgIC8qbGV0IGFsbG93QnV0dG9uID0gYDxhIGhyZWY9XCJodHRwOi8vd3d3LmFkb2JlLmNvbS9nby9nZXRmbGFzaHBsYXllclwiPjxpbWcgc3JjPVwiaHR0cDovL3d3dy5hZG9iZS5jb20vaW1hZ2VzL3NoYXJlZC9kb3dubG9hZF9idXR0b25zL2dldF9mbGFzaF9wbGF5ZXIuZ2lmXCIgYWx0PVwiR2V0IEFkb2JlIEZsYXNoIHBsYXllclwiPjwvYT5gO1xuICAgICAgICBtZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgbWVzc2FnZS5pbm5lckhUTUwgPSBhbGxvd0J1dHRvbjsqL1xuXG4gICAgICAgIGlmKGlzTG9vcCl7XG4gICAgICAgICAgICBsb29wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGFyYW0nKTtcbiAgICAgICAgICAgIGxvb3Auc2V0QXR0cmlidXRlKCduYW1lJywgJ2xvb3AnKTtcbiAgICAgICAgICAgIGxvb3Auc2V0QXR0cmlidXRlKCd2YWx1ZScsICd0cnVlJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2aWRlb0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvYmplY3QnKTtcbiAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCByb290SWQrXCItZmxhc2hcIik7XG4gICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCByb290SWQrXCItZmxhc2hcIik7XG4gICAgICAgIHZpZGVvRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzEwMCUnKTtcbiAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgJzEwMCUnKTtcbiAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnc2NhbGUnLCAnZGVmYXVsdCcpO1xuICAgICAgICB2aWRlb0VsZW1lbnQuc2V0QXR0cmlidXRlKCd3bW9kZScsICdvcGFxdWUnKTtcblxuICAgICAgICBpZihicm93c2VySW5mby5icm93c2VyID09PSBcIk1pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3JlclwiICYmIGJyb3dzZXJJbmZvLmJyb3dzZXJNYWpvclZlcnNpb24gPD0gOSApe1xuICAgICAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnY2xhc3NpZCcsICdjbHNpZDpEMjdDREI2RS1BRTZELTExY2YtOTZCOC00NDQ1NTM1NDAwMDAnKTtcbiAgICAgICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChtb3ZpZSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YScsIFNXRlBhdGgpO1xuICAgICAgICAgICAgdmlkZW9FbGVtZW50LnNldEF0dHJpYnV0ZSgndHlwZScsICdhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmKGlzTG9vcCl7XG4gICAgICAgICAgICB2aWRlb0VsZW1lbnQuYXBwZW5kQ2hpbGQobG9vcCk7XG4gICAgICAgIH1cblxuICAgICAgICB2aWRlb0VsZW1lbnQuYXBwZW5kQ2hpbGQod21vZGUpO1xuICAgICAgICB2aWRlb0VsZW1lbnQuYXBwZW5kQ2hpbGQoYmdjb2xvcik7XG4gICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChxdWFsKTtcbiAgICAgICAgdmlkZW9FbGVtZW50LmFwcGVuZENoaWxkKGFsbG93ZnVsbHNjcmVlbik7XG4gICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChhbGxvd3NjcmlwdGFjY2Vzcyk7XG4gICAgICAgIHZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChmbGFzaHZhcnMpO1xuICAgICAgICAvL3ZpZGVvRWxlbWVudC5hcHBlbmRDaGlsZChtZXNzYWdlKTtcblxuICAgICAgICAkY29udGFpbmVyLmFwcGVuZCh2aWRlb0VsZW1lbnQpO1xuXG4gICAgICAgIHJldHVybiB2aWRlb0VsZW1lbnQ7XG4gICAgfTtcblxuICAgIHRoYXQuY3JlYXRlTWVkaWEgPSAocHJvdmlkZXJOYW1lICwgcGxheWVyQ29uZmlnKSAgPT4ge1xuICAgICAgICBpZih2aWRlb0VsZW1lbnQpe1xuICAgICAgICAgICAgLy90aGF0LmVtcHR5KCk7XG4gICAgICAgICAgICAvL3JldXNlIHZpZGVvIGVsZW1lbnQuXG4gICAgICAgICAgICAvL2JlY3Vhc2UgcGxheWxpc3QgaXMgYXV0byBuZXh0IHBsYXlpbmcuXG4gICAgICAgICAgICAvL09ubHkgc2FtZSB2aWRlbyBlbGVtZW50IGRvZXMgbm90IHJlcXVpcmUgVXNlciBJbnRlcmFjdGlvbiBFcnJvci5cbiAgICAgICAgICAgIC8vVG9EbyA6IHJlZmFjdG9yaW5nXG4gICAgICAgICAgICByZXR1cm4gdmlkZW9FbGVtZW50O1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBwcm92aWRlck5hbWUgPT09IFBST1ZJREVSX1JUTVAgPyBjcmVhdGVGbGFzaFZpZGVvKHBsYXllckNvbmZpZy5pc0xvb3AoKSwgcGxheWVyQ29uZmlnLmdldFJ0bXBCdWZmZXJUaW1lKCksIHBsYXllckNvbmZpZy5nZXRSdG1wQnVmZmVyVGltZU1heCgpKVxuICAgICAgICAgICAgICAgIDogY3JlYXRlSHRtbFZpZGVvKHBsYXllckNvbmZpZy5pc0xvb3AoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGF0LmNyZWF0ZUFkQ29udGFpbmVyID0gKCkgPT4ge1xuICAgICAgICBsZXQgYWRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYWRDb250YWluZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsICdvdnAtYWRzJyk7XG4gICAgICAgICRjb250YWluZXIuYXBwZW5kKGFkQ29udGFpbmVyKTtcblxuICAgICAgICByZXR1cm4gYWRDb250YWluZXI7XG4gICAgfTtcblxuXG4gICAgdGhhdC5lbXB0eSA9ICgpID0+e1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJNZWRpYU1hbmFnZXIgcmVtb3ZlRWxlbWVudCgpXCIpO1xuICAgICAgICAkY29udGFpbmVyLnJlbW92ZUNoaWxkKHZpZGVvRWxlbWVudCk7XG4gICAgICAgIHZpZGVvRWxlbWVudCA9IG51bGw7XG4gICAgfTtcblxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xuICAgICAgICAkY29udGFpbmVyLnJlbW92ZUNoaWxkKCk7XG4gICAgICAgICRjb250YWluZXIgPSBudWxsO1xuICAgICAgICB2aWRlb0VsZW1lbnQgPSBudWxsO1xuICAgICAgICByb290SWQgPSBudWxsO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE1hbmFnZXI7XG4iLCJpbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xuaW1wb3J0IHtpc1J0bXAsIGlzV2ViUlRDLCBpc0Rhc2ggfSBmcm9tIFwidXRpbHMvdmFsaWRhdG9yXCI7XG5pbXBvcnQge2V4dHJhY3RFeHRlbnNpb24gLHRyaW19IGZyb20gXCIuLi8uLi91dGlscy9zdHJpbmdzXCI7XG5pbXBvcnQgU3VwcG9ydENoZWNrZXIgZnJvbSBcIi4uL1N1cHBvcnRDaGVja2VyXCI7XG5pbXBvcnQge1BMQVlMSVNUX0NIQU5HRUR9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5cbi8qKlxuICogQGJyaWVmICAgVGhpcyBtYW5hZ2VzIFBsYXlsaXN0IG9yIFNvdXJjZXMuXG4gKiBAcGFyYW1cbiAqXG4gKiAqL1xuY29uc3QgTWFuYWdlciA9IGZ1bmN0aW9uKHByb3ZpZGVyKXtcbiAgICBjb25zdCB0aGF0ID0ge307XG4gICAgbGV0IGN1cnJlbnRQbGF5bGlzdEl0ZW0gPSBbXTtcbiAgICBsZXQgc3BlYyA9IHtcbiAgICAgICAgcGxheWxpc3QgOiBbXSxcbiAgICAgICAgY3VycmVudEluZGV4IDogMFxuICAgIH07XG4gICAgbGV0IHN1cHBvcnRDaGVja2VyID0gU3VwcG9ydENoZWNrZXIoKTtcblxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBsb2FkZWQuXCIpO1xuXG4gICAgY29uc3QgbWFrZVByZXR0eVNvdXJjZSA9IGZ1bmN0aW9uKHNvdXJjZV8pe1xuICAgICAgICBpZiAoIXNvdXJjZV8gfHwgIXNvdXJjZV8uZmlsZSAmJiAhKHNvdXJjZV8uaG9zdCB8fCBzb3VyY2VfLmFwcGxpY2F0aW9uIHx8IHNvdXJjZV8uc3RyZWFtKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNvdXJjZSA9IE9iamVjdC5hc3NpZ24oe30sIHsgJ2RlZmF1bHQnOiBmYWxzZSB9LCBzb3VyY2VfKTtcbiAgICAgICAgc291cmNlLmZpbGUgPSB0cmltKCcnICsgc291cmNlLmZpbGUpO1xuXG4gICAgICAgIGlmKHNvdXJjZS5ob3N0ICYmIHNvdXJjZS5hcHBsaWNhdGlvbiAmJiBzb3VyY2Uuc3RyZWFtKXtcbiAgICAgICAgICAgIHNvdXJjZS5maWxlID0gc291cmNlLmhvc3QgKyBcIi9cIiArIHNvdXJjZS5hcHBsaWNhdGlvbiArIFwiL3N0cmVhbS9cIiArIHNvdXJjZS5zdHJlYW07XG4gICAgICAgICAgICBkZWxldGUgc291cmNlLmhvc3Q7XG4gICAgICAgICAgICBkZWxldGUgc291cmNlLmFwcGxpY2F0aW9uO1xuICAgICAgICAgICAgZGVsZXRlIHNvdXJjZS5zdHJlYW07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtaW1ldHlwZVJlZ0V4ID0gL15bXi9dK1xcLyg/OngtKT8oW14vXSspJC87XG5cbiAgICAgICAgaWYgKG1pbWV0eXBlUmVnRXgudGVzdChzb3VyY2UudHlwZSkpIHtcbiAgICAgICAgICAgIC8vIGlmIHR5cGUgaXMgZ2l2ZW4gYXMgYSBtaW1ldHlwZVxuICAgICAgICAgICAgc291cmNlLm1pbWVUeXBlID0gc291cmNlLnR5cGU7XG4gICAgICAgICAgICBzb3VyY2UudHlwZSA9IHNvdXJjZS50eXBlLnJlcGxhY2UobWltZXR5cGVSZWdFeCwgJyQxJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihpc1J0bXAoc291cmNlLmZpbGUpKXtcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ3J0bXAnO1xuICAgICAgICB9ZWxzZSBpZihpc1dlYlJUQyhzb3VyY2UuZmlsZSkpe1xuICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnd2VicnRjJztcbiAgICAgICAgfWVsc2UgaWYoaXNEYXNoKHNvdXJjZS5maWxlLCBzb3VyY2UudHlwZSkpe1xuICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnZGFzaCc7XG4gICAgICAgIH1lbHNlIGlmICghc291cmNlLnR5cGUpIHtcbiAgICAgICAgICAgIHNvdXJjZS50eXBlID0gZXh0cmFjdEV4dGVuc2lvbihzb3VyY2UuZmlsZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXNvdXJjZS50eXBlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBub3JtYWxpemUgdHlwZXNcbiAgICAgICAgc3dpdGNoIChzb3VyY2UudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnbTN1OCc6XG4gICAgICAgICAgICBjYXNlICd2bmQuYXBwbGUubXBlZ3VybCc6XG4gICAgICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnaGxzJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ200YSc6XG4gICAgICAgICAgICAgICAgc291cmNlLnR5cGUgPSAnYWFjJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3NtaWwnOlxuICAgICAgICAgICAgICAgIHNvdXJjZS50eXBlID0gJ3J0bXAnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgIGlmIChzb3VyY2Vba2V5XSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgc291cmNlW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzb3VyY2U7XG5cbiAgICB9XG5cbiAgICB0aGF0LmluaXRQbGF5bGlzdCA9KHBsYXlsaXN0KSA9PntcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUGxheWxpc3RNYW5hZ2VyIHNldFBsYXlsaXN0KCkgXCIsIHBsYXlsaXN0KTtcbiAgICAgICAgY29uc3QgcHJldHRpZWRQbGF5bGlzdCA9IChfLmlzQXJyYXkocGxheWxpc3QpID8gcGxheWxpc3QgOiBbcGxheWxpc3RdKS5tYXAoZnVuY3Rpb24oaXRlbSl7XG4gICAgICAgICAgICBpZighXy5pc0FycmF5KGl0ZW0udHJhY2tzKSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBpdGVtLnRyYWNrcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBwbGF5bGlzdEl0ZW0gPSBPYmplY3QuYXNzaWduKHt9LHtcbiAgICAgICAgICAgICAgICBzb3VyY2VzOiBbXSxcbiAgICAgICAgICAgICAgICB0cmFja3M6IFtdLFxuICAgICAgICAgICAgICAgIHRpdGxlIDogXCJcIlxuICAgICAgICAgICAgfSwgaXRlbSApO1xuXG4gICAgICAgICAgICBpZigocGxheWxpc3RJdGVtLnNvdXJjZXMgPT09IE9iamVjdChwbGF5bGlzdEl0ZW0uc291cmNlcykpICYmICFfLmlzQXJyYXkocGxheWxpc3RJdGVtLnNvdXJjZXMpKSB7XG4gICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBbbWFrZVByZXR0eVNvdXJjZShwbGF5bGlzdEl0ZW0uc291cmNlcyldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIV8uaXNBcnJheShwbGF5bGlzdEl0ZW0uc291cmNlcykgfHwgcGxheWxpc3RJdGVtLnNvdXJjZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBbbWFrZVByZXR0eVNvdXJjZShwbGF5bGlzdEl0ZW0pXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoIV8uaXNBcnJheShwbGF5bGlzdEl0ZW0uc291cmNlcykgfHwgcGxheWxpc3RJdGVtLnNvdXJjZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ubGV2ZWxzKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzID0gaXRlbS5sZXZlbHM7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXMgPSBbbWFrZVByZXR0eVNvdXJjZShpdGVtKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBwbGF5bGlzdEl0ZW0uc291cmNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBzb3VyY2UgPSBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXTtcbiAgICAgICAgICAgICAgICBsZXQgcHJldHR5U291cmNlID0gXCJcIjtcbiAgICAgICAgICAgICAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgZGVmYXVsdFNvdXJjZSA9IHNvdXJjZS5kZWZhdWx0O1xuICAgICAgICAgICAgICAgIGlmIChkZWZhdWx0U291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZS5kZWZhdWx0ID0gKGRlZmF1bHRTb3VyY2UudG9TdHJpbmcoKSA9PT0gJ3RydWUnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2UuZGVmYXVsdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBzb3VyY2UgZG9lc24ndCBoYXZlIGEgbGFiZWwsIG51bWJlciBpdFxuICAgICAgICAgICAgICAgIGlmICghcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0ubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnNvdXJjZXNbaV0ubGFiZWwgPSBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXS50eXBlK1wiLVwiK2kudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBwcmV0dHlTb3VyY2UgPSBtYWtlUHJldHR5U291cmNlKHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldKTtcbiAgICAgICAgICAgICAgICBpZihzdXBwb3J0Q2hlY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2UocHJldHR5U291cmNlKSl7XG4gICAgICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS5zb3VyY2VzW2ldID0gcHJldHR5U291cmNlO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlc1tpXSA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwbGF5bGlzdEl0ZW0uc291cmNlcyA9IHBsYXlsaXN0SXRlbS5zb3VyY2VzLmZpbHRlcihzb3VyY2UgPT4gISFzb3VyY2UpO1xuXG4gICAgICAgICAgICBpZighcGxheWxpc3RJdGVtLnRpdGxlICYmICBwbGF5bGlzdEl0ZW0uc291cmNlc1swXSAmJiBwbGF5bGlzdEl0ZW0uc291cmNlc1swXS5sYWJlbCl7XG4gICAgICAgICAgICAgICAgcGxheWxpc3RJdGVtLnRpdGxlID0gcGxheWxpc3RJdGVtLnNvdXJjZXNbMF0ubGFiZWw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGRlZmF1bHQg6rCAIOyXhuydhOuVjCB3ZWJydGPqsIAg7J6I64uk66m0IHdlYnJ0YyBkZWZhdWx0IDogdHJ1ZeuhnCDsnpDrj5kg7ISk7KCVXG4gICAgICAgICAgICAvKmxldCBoYXZlRGVmYXVsdCA9IF8uZmluZChwbGF5bGlzdEl0ZW0uc291cmNlcywgZnVuY3Rpb24oc291cmNlKXtyZXR1cm4gc291cmNlLmRlZmF1bHQgPT0gdHJ1ZTt9KTtcbiAgICAgICAgICAgIGxldCB3ZWJydGNTb3VyY2UgPSBbXTtcbiAgICAgICAgICAgIGlmKCFoYXZlRGVmYXVsdCl7XG4gICAgICAgICAgICAgICAgd2VicnRjU291cmNlID0gXy5maW5kKHBsYXlsaXN0SXRlbS5zb3VyY2VzLCBmdW5jdGlvbihzb3VyY2Upe3JldHVybiBzb3VyY2UudHlwZSA9PSBcIndlYnJ0Y1wiO30pO1xuICAgICAgICAgICAgICAgIGlmKHdlYnJ0Y1NvdXJjZSl7XG4gICAgICAgICAgICAgICAgICAgIHdlYnJ0Y1NvdXJjZS5kZWZhdWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9Ki9cblxuXG5cbiAgICAgICAgICAgIGlmKCFfLmlzQXJyYXkocGxheWxpc3RJdGVtLnRyYWNrcykpe1xuICAgICAgICAgICAgICAgIHBsYXlsaXN0SXRlbS50cmFja3MgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKF8uaXNBcnJheShwbGF5bGlzdEl0ZW0uY2FwdGlvbnMpKXtcbiAgICAgICAgICAgICAgICBwbGF5bGlzdEl0ZW0udHJhY2tzID0gcGxheWxpc3RJdGVtLnRyYWNrcy5jb25jYXQocGxheWxpc3RJdGVtLmNhcHRpb25zKTtcbiAgICAgICAgICAgICAgICBkZWxldGUgcGxheWxpc3RJdGVtLmNhcHRpb25zO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwbGF5bGlzdEl0ZW0udHJhY2tzID0gcGxheWxpc3RJdGVtLnRyYWNrcy5tYXAoZnVuY3Rpb24odHJhY2spe1xuICAgICAgICAgICAgICAgIGlmKCF0cmFjayB8fCAhdHJhY2suZmlsZSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHtcbiAgICAgICAgICAgICAgICAgICAgJ2tpbmQnOiAnY2FwdGlvbnMnLFxuICAgICAgICAgICAgICAgICAgICAnZGVmYXVsdCc6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSwgdHJhY2spO1xuICAgICAgICAgICAgfSkuZmlsdGVyKHRyYWNrID0+ICEhdHJhY2spO1xuXG4gICAgICAgICAgICByZXR1cm4gcGxheWxpc3RJdGVtO1xuICAgICAgICB9KS5maWx0ZXIoZnVuY3Rpb24oaXRlbSl7cmV0dXJuIGl0ZW0uc291cmNlcyAmJiBpdGVtLnNvdXJjZXMubGVuZ3RoID4gMDt9KXx8W107XG4gICAgICAgIHNwZWMucGxheWxpc3QgPSBwcmV0dGllZFBsYXlsaXN0O1xuICAgICAgICByZXR1cm4gcHJldHRpZWRQbGF5bGlzdDtcbiAgICB9O1xuICAgIHRoYXQuZ2V0UGxheWxpc3QgPSAoKSA9PiB7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBnZXRQbGF5bGlzdCgpIFwiLCBzcGVjLnBsYXlsaXN0KTtcbiAgICAgICAgcmV0dXJuIHNwZWMucGxheWxpc3Q7XG4gICAgfTtcbiAgICB0aGF0LmdldEN1cnJlbnRQbGF5TGlzdCA9ICgpID0+IHtcbiAgICAgICAgaWYoc3BlYy5wbGF5bGlzdFtzcGVjLmN1cnJlbnRJbmRleF0pe1xuICAgICAgICAgICAgcmV0dXJuIHNwZWMucGxheWxpc3Rbc3BlYy5jdXJyZW50SW5kZXhdO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhhdC5nZXRDdXJyZW50UGxheWxpc3RJbmRleCA9ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHNwZWMuY3VycmVudEluZGV4O1xuICAgIH07XG4gICAgdGhhdC5zZXRDdXJyZW50UGxheWxpc3QgPSAoaW5kZXgpID0+IHtcbiAgICAgICAgaWYoc3BlYy5wbGF5bGlzdFtpbmRleF0pe1xuICAgICAgICAgICAgc3BlYy5jdXJyZW50SW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoUExBWUxJU1RfQ0hBTkdFRCwgc3BlYy5jdXJyZW50SW5kZXgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcGVjLmN1cnJlbnRJbmRleDtcbiAgICB9O1xuICAgIHRoYXQuZ2V0Q3VycmVudFNvdXJjZXMgPSAoKSA9PiB7XG4gICAgICAgIGlmKHNwZWMucGxheWxpc3Rbc3BlYy5jdXJyZW50SW5kZXhdKXtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlBsYXlsaXN0TWFuYWdlciBnZXRDdXJyZW50U291cmNlcygpIFwiLCBzcGVjLnBsYXlsaXN0W3NwZWMuY3VycmVudEluZGV4XS5zb3VyY2VzKTtcbiAgICAgICAgICAgIHJldHVybiBzcGVjLnBsYXlsaXN0W3NwZWMuY3VycmVudEluZGV4XS5zb3VyY2VzO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICB9O1xuICAgIHRoYXQuZ2V0Q3VycmVudEFkVGFnID0gKCkgPT4ge1xuICAgICAgICBpZihzcGVjLnBsYXlsaXN0W3NwZWMuY3VycmVudEluZGV4XSl7XG4gICAgICAgICAgICByZXR1cm4gc3BlYy5wbGF5bGlzdFtzcGVjLmN1cnJlbnRJbmRleF0uYWRUYWdVcmwgfHwgXCJcIjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgTWFuYWdlcjtcbiIsImltcG9ydCBTdXBwb3J0Q2hlY2tlciBmcm9tIFwiYXBpL1N1cHBvcnRDaGVja2VyXCI7XG5pbXBvcnQge0FwaVJ0bXBFeHBhbnNpb259IGZyb20gJ2FwaS9BcGlFeHBhbnNpb25zJztcbmltcG9ydCB7XG4gICAgUFJPVklERVJfSFRNTDUsIFBST1ZJREVSX1dFQlJUQywgUFJPVklERVJfREFTSCwgUFJPVklERVJfSExTLCBQUk9WSURFUl9SVE1QLFxuICAgIEVSUk9SUywgSU5JVF9VTlNVUFBPUlRfRVJST1Jcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBUaGlzIG1hbmFnZXMgcHJvdmlkZXIuXG4gKiBAcGFyYW1cbiAqICovXG5jb25zdCBDb250cm9sbGVyID0gZnVuY3Rpb24oKXtcbiAgICBsZXQgc3VwcG9ydENoYWNrZXIgPSBTdXBwb3J0Q2hlY2tlcigpO1xuICAgIGNvbnN0IFByb3ZpZGVycyA9IHt9O1xuXG4gICAgY29uc3QgdGhhdCA9IHt9O1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBsb2FkZWQuXCIpO1xuXG4gICAgY29uc3QgcmVnaXN0ZVByb3ZpZGVyID0gKG5hbWUsIHByb3ZpZGVyKSA9PntcbiAgICAgICAgaWYoUHJvdmlkZXJzW25hbWVdKXtcbiAgICAgICAgICAgIHJldHVybiA7XG4gICAgICAgIH1cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIF9yZWdpc3RlclByb3ZpZGVyKCkgXCIsIG5hbWUpO1xuICAgICAgICBQcm92aWRlcnNbbmFtZV0gPSBwcm92aWRlcjtcbiAgICB9O1xuXG4gICAgY29uc3QgUHJvdmlkZXJMb2FkZXIgPXtcbiAgICAgICAgaHRtbDU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcXVpcmUuZW5zdXJlKFsnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IdG1sNSddLCBmdW5jdGlvbihyZXF1aXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IdG1sNScpLmRlZmF1bHQ7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVQcm92aWRlcihQUk9WSURFUl9IVE1MNSwgcHJvdmlkZXIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7bmFtZSA6IFBST1ZJREVSX0hUTUw1LCBwcm92aWRlciA6IHByb3ZpZGVyfTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcbiAgICAgICAgICAgICAgICB9LCdvdmVucGxheWVyLnByb3ZpZGVyLkh0bWw1J1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgd2VicnRjIDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvV2ViUlRDJ10sIGZ1bmN0aW9uKHJlcXVpcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdmlkZXIgPSByZXF1aXJlKCdhcGkvcHJvdmlkZXIvaHRtbDUvcHJvdmlkZXJzL1dlYlJUQycpLmRlZmF1bHQ7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVQcm92aWRlcihQUk9WSURFUl9XRUJSVEMsIHByb3ZpZGVyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge25hbWUgOiBQUk9WSURFUl9XRUJSVEMsIHByb3ZpZGVyIDogcHJvdmlkZXJ9O1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xuICAgICAgICAgICAgICAgIH0sJ292ZW5wbGF5ZXIucHJvdmlkZXIuV2ViUlRDUHJvdmlkZXInXG4gICAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgICBkYXNoIDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHJldHVybiByZXF1aXJlLmVuc3VyZShbJ2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvRGFzaCddLCBmdW5jdGlvbihyZXF1aXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9EYXNoJykuZGVmYXVsdDtcbiAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZVByb3ZpZGVyKFBST1ZJREVSX0RBU0gsIHByb3ZpZGVyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge25hbWUgOiBQUk9WSURFUl9EQVNILCBwcm92aWRlciA6IHByb3ZpZGVyfTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcbiAgICAgICAgICAgICAgICB9LCdvdmVucGxheWVyLnByb3ZpZGVyLkRhc2hQcm92aWRlcidcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIGhscyA6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvaHRtbDUvcHJvdmlkZXJzL0hscyddLCBmdW5jdGlvbihyZXF1aXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3ZpZGVyID0gcmVxdWlyZSgnYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9IbHMnKS5kZWZhdWx0O1xuICAgICAgICAgICAgICAgICAgICByZWdpc3RlUHJvdmlkZXIoUFJPVklERVJfSExTLCBwcm92aWRlcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtuYW1lIDogUFJPVklERVJfSExTLCBwcm92aWRlciA6IHByb3ZpZGVyfTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05ldHdvcmsgZXJyb3InKTtcbiAgICAgICAgICAgICAgICB9LCdvdmVucGxheWVyLnByb3ZpZGVyLkhsc1Byb3ZpZGVyJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfSxcbiAgICAgICAgcnRtcCA6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gcmVxdWlyZS5lbnN1cmUoWydhcGkvcHJvdmlkZXIvZmxhc2gvcHJvdmlkZXJzL1J0bXAnXSwgZnVuY3Rpb24ocmVxdWlyZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IHJlcXVpcmUoJ2FwaS9wcm92aWRlci9mbGFzaC9wcm92aWRlcnMvUnRtcCcpLmRlZmF1bHQ7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVQcm92aWRlcihQUk9WSURFUl9SVE1QLCBwcm92aWRlcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7bmFtZSA6IFBST1ZJREVSX1JUTVAsIHByb3ZpZGVyIDogcHJvdmlkZXJ9O1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycil7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTmV0d29yayBlcnJvcicpO1xuICAgICAgICAgICAgICAgIH0sJ292ZW5wbGF5ZXIucHJvdmlkZXIuUnRtcFByb3ZpZGVyJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIHRoYXQubG9hZFByb3ZpZGVycyA9IChwbGF5bGlzdEl0ZW0pID0+e1xuICAgICAgICBjb25zdCBzdXBwb3J0ZWRQcm92aWRlck5hbWVzID0gc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZXNCeVBsYXlsaXN0KHBsYXlsaXN0SXRlbSk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlByb3ZpZGVyQ29udHJvbGxlciBsb2FkUHJvdmlkZXJzKCkgXCIsIHN1cHBvcnRlZFByb3ZpZGVyTmFtZXMpO1xuICAgICAgICBpZighc3VwcG9ydGVkUHJvdmlkZXJOYW1lcyl7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoRVJST1JTW0lOSVRfVU5TVVBQT1JUX0VSUk9SXSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFxuICAgICAgICAgICAgICAgIHN1cHBvcnRlZFByb3ZpZGVyTmFtZXMuZmlsdGVyKGZ1bmN0aW9uKHByb3ZpZGVyTmFtZSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhIVByb3ZpZGVyTG9hZGVyW3Byb3ZpZGVyTmFtZV07XG4gICAgICAgICAgICAgICAgfSkubWFwKGZ1bmN0aW9uKHByb3ZpZGVyTmFtZSl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm92aWRlckxvYWRlcltwcm92aWRlck5hbWVdKCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICB0aGF0LmZpbmRCeU5hbWUgPSAobmFtZSkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgZmluZEJ5TmFtZSgpIFwiLCBuYW1lKTtcbiAgICAgICAgcmV0dXJuIFByb3ZpZGVyc1tuYW1lXTtcbiAgICB9O1xuXG4gICAgdGhhdC5nZXRQcm92aWRlckJ5U291cmNlID0gKHNvdXJjZSkgPT4ge1xuICAgICAgICBjb25zdCBzdXBwb3J0ZWRQcm92aWRlck5hbWUgPSBzdXBwb3J0Q2hhY2tlci5maW5kUHJvdmlkZXJOYW1lQnlTb3VyY2Uoc291cmNlKTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiUHJvdmlkZXJDb250cm9sbGVyIGdldFByb3ZpZGVyQnlTb3VyY2UoKSBcIiwgc3VwcG9ydGVkUHJvdmlkZXJOYW1lKTtcbiAgICAgICAgcmV0dXJuIHRoYXQuZmluZEJ5TmFtZShzdXBwb3J0ZWRQcm92aWRlck5hbWUpO1xuICAgIH07XG5cbiAgICB0aGF0LmlzU2FtZVByb3ZpZGVyID0gKGN1cnJlbnRTb3VyY2UsIG5ld1NvdXJjZSkgPT4ge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJQcm92aWRlckNvbnRyb2xsZXIgaXNTYW1lUHJvdmlkZXIoKSBcIiwgc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKGN1cnJlbnRTb3VyY2UpICwgc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKG5ld1NvdXJjZSkgKTtcbiAgICAgICAgcmV0dXJuIHN1cHBvcnRDaGFja2VyLmZpbmRQcm92aWRlck5hbWVCeVNvdXJjZShjdXJyZW50U291cmNlKSA9PT0gc3VwcG9ydENoYWNrZXIuZmluZFByb3ZpZGVyTmFtZUJ5U291cmNlKG5ld1NvdXJjZSk7XG4gICAgfTtcblxuICAgIHJldHVybiB0aGF0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29udHJvbGxlcjtcbiIsImltcG9ydCBBUEkgZnJvbSAnYXBpL0FwaSc7XG5pbXBvcnQge2lzV2ViUlRDfSBmcm9tICd1dGlscy92YWxpZGF0b3InO1xuaW1wb3J0IF8gZnJvbSAndXRpbHMvdW5kZXJzY29yZSc7XG5pbXBvcnQgTGEkIGZyb20gJ3V0aWxzL2xpa2VBJCc7XG5pbXBvcnQge2dldFNjcmlwdFBhdGh9IGZyb20gJ3V0aWxzL3dlYnBhY2snO1xuXG5cbl9fd2VicGFja19wdWJsaWNfcGF0aF9fID0gZ2V0U2NyaXB0UGF0aCgnb3ZlbnBsYXllci5zZGsuanMnKTtcblxuLyoqXG4gKiBNYWluIE92ZW5QbGF5ZXJTREsgb2JqZWN0XG4gKi9cbmNvbnN0IE92ZW5QbGF5ZXJTREsgPSB3aW5kb3cuT3ZlblBsYXllclNESyA9IHt9O1xuXG5jb25zdCBwbGF5ZXJMaXN0ID0gT3ZlblBsYXllclNESy5wbGF5ZXJMaXN0ID0gW107XG5cbmV4cG9ydCBjb25zdCBjaGVja0FuZEdldENvbnRhaW5lckVsZW1lbnQgPSBmdW5jdGlvbihjb250YWluZXIpIHtcbiAgICBpZiAoIWNvbnRhaW5lcikge1xuXG4gICAgICAgIC8vIFRPRE8ocm9jayk6IFNob3VsZCBjYXVzZSBhbiBlcnJvci5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgbGV0IGNvbnRhaW5lckVsZW1lbnQgPSBudWxsO1xuXG4gICAgaWYgKHR5cGVvZiBjb250YWluZXIgPT09ICdzdHJpbmcnKSB7XG5cbiAgICAgICAgY29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvbnRhaW5lcik7XG4gICAgfSBlbHNlIGlmIChjb250YWluZXIubm9kZVR5cGUpIHtcblxuICAgICAgICBjb250YWluZXJFbGVtZW50ID0gY29udGFpbmVyO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFRPRE8ocm9jayk6IFNob3VsZCBjYXVzZSBhbiBlcnJvci5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnRhaW5lckVsZW1lbnQ7XG59XG5cbi8qKlxuICogQ3JlYXRlIHBsYXllciBpbnN0YW5jZSBhbmQgcmV0dXJuIGl0LlxuICpcbiAqIEBwYXJhbSAgICAgIHtzdHJpbmcgfCBkb20gZWxlbWVudH0gY29udGFpbmVyICBJZCBvZiBjb250YWluZXIgZWxlbWVudCBvciBjb250YWluZXIgZWxlbWVudFxuICogQHBhcmFtICAgICAge29iamVjdH0gb3B0aW9ucyAgVGhlIG9wdGlvbnNcbiAqL1xuT3ZlblBsYXllclNESy5jcmVhdGUgPSBmdW5jdGlvbihjb250YWluZXIsIG9wdGlvbnMpIHtcblxuICAgIGxldCBjb250YWluZXJFbGVtZW50ID0gY2hlY2tBbmRHZXRDb250YWluZXJFbGVtZW50KGNvbnRhaW5lcik7XG5cbiAgICBjb25zdCBwbGF5ZXJJbnN0YW5jZSA9IEFQSShjb250YWluZXJFbGVtZW50KTtcbiAgICBwbGF5ZXJJbnN0YW5jZS5pbml0KG9wdGlvbnMpO1xuXG4gICAgcGxheWVyTGlzdC5wdXNoKHBsYXllckluc3RhbmNlKTtcblxuICAgIHJldHVybiBwbGF5ZXJJbnN0YW5jZTtcbn07XG5cbi8qKlxuICogR2V0cyB0aGUgcGxheWVyIGluc3RhbmNlIGxpc3QuXG4gKlxuICogQHJldHVybiAgICAge2FycmF5fSAgVGhlIHBsYXllciBsaXN0LlxuICovXG5PdmVuUGxheWVyU0RLLmdldFBsYXllckxpc3QgPSBmdW5jdGlvbigpIHtcblxuICAgIHJldHVybiBwbGF5ZXJMaXN0O1xufTtcblxuLyoqXG4gKiBHZXRzIHRoZSBwbGF5ZXIgaW5zdGFuY2UgYnkgY29udGFpbmVyIGlkLlxuICpcbiAqIEBwYXJhbSAgICAgIHtzdHJpbmd9ICBjb250YWluZXJJZCAgVGhlIGNvbnRhaW5lciBpZGVudGlmaWVyXG4gKiBAcmV0dXJuICAgICB7b2JlamVjdCB8IG51bGx9ICBUaGUgcGxheWVyIGluc3RhbmNlLlxuICovXG5PdmVuUGxheWVyU0RLLmdldFBsYXllckJ5Q29udGFpbmVySWQgPSBmdW5jdGlvbihjb250YWluZXJJZCkge1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwbGF5ZXJMaXN0Lmxlbmd0aDsgaSArKykge1xuXG4gICAgICAgIGlmIChwbGF5ZXJMaXN0W2ldLmdldENvbnRhaW5lcklkKCkgPT09IGNvbnRhaW5lcklkKSB7XG5cbiAgICAgICAgICAgIHJldHVybiBwbGF5ZXJMaXN0W2ldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG59O1xuXG4vKipcbiAqIEdldHMgdGhlIHBsYXllciBpbnN0YW5jZSBieSBpbmRleC5cbiAqXG4gKiBAcGFyYW0gICAgICB7bnVtYmVyfSAgaW5kZXggICBUaGUgaW5kZXhcbiAqIEByZXR1cm4gICAgIHtvYmplY3QgfCBudWxsfSAgVGhlIHBsYXllciBpbnN0YW5jZS5cbiAqL1xuT3ZlblBsYXllclNESy5nZXRQbGF5ZXJCeUluZGV4ID0gZnVuY3Rpb24oaW5kZXgpIHtcblxuICAgIGNvbnN0IHBsYXllckluc3RhbmNlID0gcGxheWVyTGlzdFtpbmRleF07XG5cbiAgICBpZiAocGxheWVySW5zdGFuY2UpIHtcblxuICAgICAgICByZXR1cm4gcGxheWVySW5zdGFuY2U7XG4gICAgfSBlbHNlIHtcblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59O1xuXG4vKipcbiAqIFJlbW92ZSB0aGUgcGxheWVyIGluc3RhbmNlIGJ5IHBsYXllcklkLlxuICpcbiAqIEBwYXJhbSAgICAgIHtwbGF5ZXJJZH0gIGlkXG4gKiBAcmV0dXJuICAgICB7bnVsbH1cbiAqL1xuT3ZlblBsYXllclNESy5yZW1vdmVQbGF5ZXIgPSBmdW5jdGlvbihwbGF5ZXJJZCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGxheWVyTGlzdC5sZW5ndGg7IGkgKyspIHtcblxuICAgICAgICBpZiAocGxheWVyTGlzdFtpXS5nZXRDb250YWluZXJJZCgpID09PSBwbGF5ZXJJZCkge1xuXG4gICAgICAgICAgICBwbGF5ZXJMaXN0LnNwbGljZShpLCAxKTtcbiAgICAgICAgfVxuICAgIH1cblxufTtcblxuLyoqXG4gKiBHZW5lcmF0ZSB3ZWJydGMgc291cmNlIGZvciBwbGF5ZXIgc291cmNlIHR5cGUuXG4gKlxuICogQHBhcmFtICAgICAge09iamVjdCB8IEFycmF5fSAgc291cmNlICAgd2VicnRjIHNvdXJjZVxuICogQHJldHVybiAgICAge0FycmF5fSAgUGxheWVyIHNvdXJjZSBPYmplY3QuXG4gKi9cbk92ZW5QbGF5ZXJTREsuZ2VuZXJhdGVXZWJydGNVcmxzID0gZnVuY3Rpb24oc291cmNlcykge1xuICAgIHJldHVybiAoXy5pc0FycmF5KHNvdXJjZXMpID8gc291cmNlcyA6IFtzb3VyY2VzXSkubWFwKGZ1bmN0aW9uKHNvdXJjZSwgaW5kZXgpe1xuICAgICAgICBpZihzb3VyY2UuaG9zdCAmJiBpc1dlYlJUQyhzb3VyY2UuaG9zdCkgJiYgc291cmNlLmFwcGxpY2F0aW9uICYmIHNvdXJjZS5zdHJlYW0pe1xuICAgICAgICAgICAgcmV0dXJuIHtmaWxlIDogc291cmNlLmhvc3QgKyBcIi9cIiArIHNvdXJjZS5hcHBsaWNhdGlvbiArIFwiL1wiICsgc291cmNlLnN0cmVhbSwgdHlwZSA6IFwid2VicnRjXCIsIGxhYmVsIDogc291cmNlLmxhYmVsID8gc291cmNlLmxhYmVsIDogXCJ3ZWJydGMtXCIrKGluZGV4KzEpIH07XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbi8qKlxuICogV2hldGhlciBzaG93IHRoZSBwbGF5ZXIgY29yZSBsb2cgb3Igbm90LlxuICpcbiAqIEBwYXJhbSAgICAgIHtib29sZWFufSAgYm9vbGVhbiAgIHJ1biBkZWJ1ZyBtb2RlIG9yIG5vdC5cbiAqIEByZXR1cm4gICAgIHtib29sZWFufSAgcnVuIGRlYnVnIG1vZGUgb3Igbm90LlxuICovXG5PdmVuUGxheWVyU0RLLmRlYnVnID0gZnVuY3Rpb24oaXNEZWJ1Z01vZGUpIHtcbiAgICBpZihpc0RlYnVnTW9kZSl7XG4gICAgICAgIHdpbmRvdy5PdmVuUGxheWVyQ29uc29sZSA9IHtsb2cgOiB3aW5kb3dbJ2NvbnNvbGUnXVsnbG9nJ119O1xuICAgIH1lbHNle1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZVsnbG9nJ10gPSBmdW5jdGlvbigpe307XG4gICAgfVxuICAgIHJldHVybiBpc0RlYnVnTW9kZTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE92ZW5QbGF5ZXJTREs7XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA4LiAyNC4uXG4gKi9cblxuZXhwb3J0IGNvbnN0IGdldEJyb3dzZXJMYW5ndWFnZSA9IGZ1bmN0aW9uKCl7XG4gICAgbGV0IG5hdiA9IHdpbmRvdy5uYXZpZ2F0b3IsXG4gICAgICAgIGJyb3dzZXJMYW5ndWFnZVByb3BlcnR5S2V5cyA9IFsnbGFuZ3VhZ2UnLCAnYnJvd3Nlckxhbmd1YWdlJywgJ3N5c3RlbUxhbmd1YWdlJywgJ3VzZXJMYW5ndWFnZSddLFxuICAgICAgICBpLFxuICAgICAgICBsYW5ndWFnZTtcblxuICAgIC8vIHN1cHBvcnQgZm9yIEhUTUwgNS4xIFwibmF2aWdhdG9yLmxhbmd1YWdlc1wiXG4gICAgaWYgKEFycmF5LmlzQXJyYXkobmF2Lmxhbmd1YWdlcykpIHtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IG5hdi5sYW5ndWFnZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxhbmd1YWdlID0gbmF2Lmxhbmd1YWdlc1tpXTtcbiAgICAgICAgICAgIGlmIChsYW5ndWFnZSAmJiBsYW5ndWFnZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGFuZ3VhZ2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzdXBwb3J0IGZvciBvdGhlciB3ZWxsIGtub3duIHByb3BlcnRpZXMgaW4gYnJvd3NlcnNcbiAgICBmb3IgKGkgPSAwOyBpIDwgYnJvd3Nlckxhbmd1YWdlUHJvcGVydHlLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxhbmd1YWdlID0gbmF2W2Jyb3dzZXJMYW5ndWFnZVByb3BlcnR5S2V5c1tpXV07XG4gICAgICAgIGlmIChsYW5ndWFnZSAmJiBsYW5ndWFnZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBsYW5ndWFnZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xufTtcbmV4cG9ydCBjb25zdCBhbmFsVXNlckFnZW50ID0gZnVuY3Rpb24oKXtcbiAgICBsZXQgdW5rbm93biA9ICctJztcblxuICAgIC8vIHNjcmVlblxuICAgIGxldCBzY3JlZW5TaXplID0gJyc7XG4gICAgaWYgKHNjcmVlbi53aWR0aCkge1xuICAgICAgICBsZXQgd2lkdGggPSAoc2NyZWVuLndpZHRoKSA/IHNjcmVlbi53aWR0aCA6ICcnO1xuICAgICAgICBsZXQgaGVpZ2h0ID0gKHNjcmVlbi5oZWlnaHQpID8gc2NyZWVuLmhlaWdodCA6ICcnO1xuICAgICAgICBzY3JlZW5TaXplICs9ICcnICsgd2lkdGggKyBcIiB4IFwiICsgaGVpZ2h0O1xuICAgIH1cblxuICAgIC8vIGJyb3dzZXJcbiAgICBsZXQgblZlciA9IG5hdmlnYXRvci5hcHBWZXJzaW9uO1xuICAgIGxldCBuQWd0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgICBsZXQgYnJvd3NlciA9IG5hdmlnYXRvci5hcHBOYW1lO1xuICAgIGxldCB2ZXJzaW9uID0gJycgKyBwYXJzZUZsb2F0KG5hdmlnYXRvci5hcHBWZXJzaW9uKTtcbiAgICBsZXQgbWFqb3JWZXJzaW9uID0gcGFyc2VJbnQobmF2aWdhdG9yLmFwcFZlcnNpb24sIDEwKTtcbiAgICBsZXQgaXNXZWJ2aWV3ID0gZmFsc2U7XG4gICAgbGV0IG5hbWVPZmZzZXQsIHZlck9mZnNldCwgaXg7XG5cbiAgICAvLyBPcGVyYVxuICAgIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdPcGVyYScpKSAhPSAtMSkge1xuICAgICAgICBicm93c2VyID0gJ09wZXJhJztcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDYpO1xuICAgICAgICBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignVmVyc2lvbicpKSAhPSAtMSkge1xuICAgICAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIE9wZXJhIE5leHRcbiAgICBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignT1BSJykpICE9IC0xKSB7XG4gICAgICAgIGJyb3dzZXIgPSAnT3BlcmEnO1xuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNCk7XG4gICAgfVxuICAgIC8v7IK87ISxIOu4jOudvOyasOyggFxuICAgIGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ1NhbXN1bmdCcm93c2VyJykpICE9IC0xKSB7XG4gICAgICAgIGJyb3dzZXIgPSAnU2Ftc3VuZ0Jyb3dzZXInO1xuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgMTUpO1xuICAgIH1cbiAgICAvLyBFZGdlXG4gICAgZWxzZSBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignRWRnZScpKSAhPSAtMSkge1xuICAgICAgICBicm93c2VyID0gJ01pY3Jvc29mdCBFZGdlJztcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDUpO1xuICAgIH1cbiAgICAvLyBNU0lFXG4gICAgZWxzZSBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignTVNJRScpKSAhPSAtMSkge1xuICAgICAgICBicm93c2VyID0gJ01pY3Jvc29mdCBJbnRlcm5ldCBFeHBsb3Jlcic7XG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA1KTtcblxuXG4gICAgICAgIC8vd2luNyBJRTExIHVzZXJBZ2VudCBpcyB1Z2x5Li4uLlxuICAgICAgICBpZiggKG5BZ3QuaW5kZXhPZignVHJpZGVudC8nKSAhPT0gLTEpICYmIChuQWd0LmluZGV4T2YoJ3J2OicpICE9PSAtMSkgICl7XG4gICAgICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcobkFndC5pbmRleE9mKCdydjonKSArIDMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIENocm9tZVxuICAgIGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ0Nocm9tZScpKSAhPSAtMSkge1xuICAgICAgICBicm93c2VyID0gJ0Nocm9tZSc7XG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA3KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoKHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignQ3JpT1MnKSkgIT0gLTEpIHsgICAvL2lwaG9uZSAtIGNocm9tZVxuICAgICAgICBicm93c2VyID0gJ0Nocm9tZSc7XG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA2KTtcbiAgICB9XG4gICAgLy8gRmlyZWZveFxuICAgIGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ0ZpcmVmb3gnKSkgIT0gLTEpIHtcbiAgICAgICAgYnJvd3NlciA9ICdGaXJlZm94JztcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKHZlck9mZnNldCArIDgpO1xuICAgIH1cbiAgICBlbHNlIGlmICgodmVyT2Zmc2V0ID0gbkFndC5pbmRleE9mKCdGeGlPUycpKSAhPSAtMSkge1xuICAgICAgICBicm93c2VyID0gJ0ZpcmVmb3gnO1xuICAgICAgICB2ZXJzaW9uID0gbkFndC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNik7XG4gICAgfVxuICAgIC8vIFNhZmFyaVxuICAgIGVsc2UgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ1NhZmFyaScpKSAhPSAtMSkge1xuICAgICAgICBicm93c2VyID0gJ1NhZmFyaSc7XG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA3KTtcbiAgICAgICAgaWYgKCh2ZXJPZmZzZXQgPSBuQWd0LmluZGV4T2YoJ1ZlcnNpb24nKSkgIT0gLTEpIHtcbiAgICAgICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA4KTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8gTVNJRSAxMStcbiAgICBlbHNlIGlmIChuQWd0LmluZGV4T2YoJ1RyaWRlbnQvJykgIT09IC0xKSB7XG4gICAgICAgIGJyb3dzZXIgPSAnTWljcm9zb2Z0IEludGVybmV0IEV4cGxvcmVyJztcbiAgICAgICAgdmVyc2lvbiA9IG5BZ3Quc3Vic3RyaW5nKG5BZ3QuaW5kZXhPZigncnY6JykgKyAzKTtcbiAgICB9XG4gICAgLy8gT3RoZXIgYnJvd3NlcnNcbiAgICBlbHNlIGlmICgobmFtZU9mZnNldCA9IG5BZ3QubGFzdEluZGV4T2YoJyAnKSArIDEpIDwgKHZlck9mZnNldCA9IG5BZ3QubGFzdEluZGV4T2YoJy8nKSkpIHtcbiAgICAgICAgYnJvd3NlciA9IG5BZ3Quc3Vic3RyaW5nKG5hbWVPZmZzZXQsIHZlck9mZnNldCk7XG4gICAgICAgIHZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyAxKTtcbiAgICAgICAgaWYgKGJyb3dzZXIudG9Mb3dlckNhc2UoKSA9PSBicm93c2VyLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgICAgICAgIGJyb3dzZXIgPSBuYXZpZ2F0b3IuYXBwTmFtZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZihuQWd0LmluZGV4T2YoJyB3dicpID4gMCl7XG4gICAgICAgIGlzV2VidmlldyA9IHRydWU7XG4gICAgfVxuICAgIC8vIHRyaW0gdGhlIHZlcnNpb24gc3RyaW5nXG4gICAgaWYgKChpeCA9IHZlcnNpb24uaW5kZXhPZignOycpKSAhPSAtMSkgdmVyc2lvbiA9IHZlcnNpb24uc3Vic3RyaW5nKDAsIGl4KTtcbiAgICBpZiAoKGl4ID0gdmVyc2lvbi5pbmRleE9mKCcgJykpICE9IC0xKSB2ZXJzaW9uID0gdmVyc2lvbi5zdWJzdHJpbmcoMCwgaXgpO1xuICAgIGlmICgoaXggPSB2ZXJzaW9uLmluZGV4T2YoJyknKSkgIT0gLTEpIHZlcnNpb24gPSB2ZXJzaW9uLnN1YnN0cmluZygwLCBpeCk7XG5cbiAgICBtYWpvclZlcnNpb24gPSBwYXJzZUludCgnJyArIHZlcnNpb24sIDEwKTtcbiAgICBpZiAoaXNOYU4obWFqb3JWZXJzaW9uKSkge1xuICAgICAgICB2ZXJzaW9uID0gJycgKyBwYXJzZUZsb2F0KG5hdmlnYXRvci5hcHBWZXJzaW9uKTtcbiAgICAgICAgbWFqb3JWZXJzaW9uID0gcGFyc2VJbnQobmF2aWdhdG9yLmFwcFZlcnNpb24sIDEwKTtcbiAgICB9XG5cbiAgICAvLyBtb2JpbGUgdmVyc2lvblxuICAgIHZhciBtb2JpbGUgPSAvTW9iaWxlfG1pbml8RmVubmVjfEFuZHJvaWR8aVAoYWR8b2R8aG9uZSkvLnRlc3QoblZlcik7XG5cbiAgICAvLyBjb29raWVcbiAgICB2YXIgY29va2llRW5hYmxlZCA9IChuYXZpZ2F0b3IuY29va2llRW5hYmxlZCkgPyB0cnVlIDogZmFsc2U7XG5cbiAgICBpZiAodHlwZW9mIG5hdmlnYXRvci5jb29raWVFbmFibGVkID09ICd1bmRlZmluZWQnICYmICFjb29raWVFbmFibGVkKSB7XG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9ICd0ZXN0Y29va2llJztcbiAgICAgICAgY29va2llRW5hYmxlZCA9IChkb2N1bWVudC5jb29raWUuaW5kZXhPZigndGVzdGNvb2tpZScpICE9IC0xKSA/IHRydWUgOiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBzeXN0ZW1cbiAgICB2YXIgb3MgPSB1bmtub3duO1xuICAgIHZhciBjbGllbnRTdHJpbmdzID0gW1xuICAgICAgICB7czonV2luZG93cyAxMCcsIHI6LyhXaW5kb3dzIDEwLjB8V2luZG93cyBOVCAxMC4wKS99LFxuICAgICAgICB7czonV2luZG93cyA4LjEnLCByOi8oV2luZG93cyA4LjF8V2luZG93cyBOVCA2LjMpL30sXG4gICAgICAgIHtzOidXaW5kb3dzIDgnLCByOi8oV2luZG93cyA4fFdpbmRvd3MgTlQgNi4yKS99LFxuICAgICAgICB7czonV2luZG93cyA3JywgcjovKFdpbmRvd3MgN3xXaW5kb3dzIE5UIDYuMSkvfSxcbiAgICAgICAge3M6J1dpbmRvd3MgVmlzdGEnLCByOi9XaW5kb3dzIE5UIDYuMC99LFxuICAgICAgICB7czonV2luZG93cyBTZXJ2ZXIgMjAwMycsIHI6L1dpbmRvd3MgTlQgNS4yL30sXG4gICAgICAgIHtzOidXaW5kb3dzIFhQJywgcjovKFdpbmRvd3MgTlQgNS4xfFdpbmRvd3MgWFApL30sXG4gICAgICAgIHtzOidXaW5kb3dzIDIwMDAnLCByOi8oV2luZG93cyBOVCA1LjB8V2luZG93cyAyMDAwKS99LFxuICAgICAgICB7czonV2luZG93cyBNRScsIHI6LyhXaW4gOXggNC45MHxXaW5kb3dzIE1FKS99LFxuICAgICAgICB7czonV2luZG93cyA5OCcsIHI6LyhXaW5kb3dzIDk4fFdpbjk4KS99LFxuICAgICAgICB7czonV2luZG93cyA5NScsIHI6LyhXaW5kb3dzIDk1fFdpbjk1fFdpbmRvd3NfOTUpL30sXG4gICAgICAgIHtzOidXaW5kb3dzIE5UIDQuMCcsIHI6LyhXaW5kb3dzIE5UIDQuMHxXaW5OVDQuMHxXaW5OVHxXaW5kb3dzIE5UKS99LFxuICAgICAgICB7czonV2luZG93cyBDRScsIHI6L1dpbmRvd3MgQ0UvfSxcbiAgICAgICAge3M6J1dpbmRvd3MgMy4xMScsIHI6L1dpbjE2L30sXG4gICAgICAgIHtzOidBbmRyb2lkJywgcjovQW5kcm9pZC99LFxuICAgICAgICB7czonT3BlbiBCU0QnLCByOi9PcGVuQlNEL30sXG4gICAgICAgIHtzOidTdW4gT1MnLCByOi9TdW5PUy99LFxuICAgICAgICB7czonTGludXgnLCByOi8oTGludXh8WDExKS99LFxuICAgICAgICB7czonaU9TJywgcjovKGlQaG9uZXxpUGFkfGlQb2QpL30sXG4gICAgICAgIHtzOidNYWMgT1MgWCcsIHI6L01hYyBPUyBYL30sXG4gICAgICAgIHtzOidNYWMgT1MnLCByOi8oTWFjUFBDfE1hY0ludGVsfE1hY19Qb3dlclBDfE1hY2ludG9zaCkvfSxcbiAgICAgICAge3M6J1FOWCcsIHI6L1FOWC99LFxuICAgICAgICB7czonVU5JWCcsIHI6L1VOSVgvfSxcbiAgICAgICAge3M6J0JlT1MnLCByOi9CZU9TL30sXG4gICAgICAgIHtzOidPUy8yJywgcjovT1NcXC8yL30sXG4gICAgICAgIHtzOidTZWFyY2ggQm90JywgcjovKG51aGt8R29vZ2xlYm90fFlhbW15Ym90fE9wZW5ib3R8U2x1cnB8TVNOQm90fEFzayBKZWV2ZXNcXC9UZW9tYXxpYV9hcmNoaXZlcikvfVxuICAgIF07XG4gICAgZm9yICh2YXIgaWQgaW4gY2xpZW50U3RyaW5ncykge1xuICAgICAgICB2YXIgY3MgPSBjbGllbnRTdHJpbmdzW2lkXTtcbiAgICAgICAgaWYgKGNzLnIudGVzdChuQWd0KSkge1xuICAgICAgICAgICAgb3MgPSBjcy5zO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgb3NWZXJzaW9uID0gdW5rbm93bjtcblxuICAgIGlmICgvV2luZG93cy8udGVzdChvcykpIHtcbiAgICAgICAgb3NWZXJzaW9uID0gL1dpbmRvd3MgKC4qKS8uZXhlYyhvcylbMV07XG4gICAgICAgIG9zID0gJ1dpbmRvd3MnO1xuICAgIH1cblxuICAgIHN3aXRjaCAob3MpIHtcbiAgICAgICAgY2FzZSAnTWFjIE9TIFgnOlxuICAgICAgICAgICAgb3NWZXJzaW9uID0gL01hYyBPUyBYICgxMFtcXC5cXF9cXGRdKykvLmV4ZWMobkFndClbMV07XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdBbmRyb2lkJzpcbiAgICAgICAgICAgIG9zVmVyc2lvbiA9IC9BbmRyb2lkIChbXFwuXFxfXFxkXSspLy5leGVjKG5BZ3QpWzFdO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnaU9TJzpcbiAgICAgICAgICAgIG9zVmVyc2lvbiA9IC9PUyAoXFxkKylfKFxcZCspXz8oXFxkKyk/Ly5leGVjKG5WZXIpO1xuICAgICAgICAgICAgb3NWZXJzaW9uID0gb3NWZXJzaW9uWzFdICsgJy4nICsgb3NWZXJzaW9uWzJdICsgJy4nICsgKG9zVmVyc2lvblszXSB8IDApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2NyZWVuOiBzY3JlZW5TaXplLFxuICAgICAgICBicm93c2VyOiBicm93c2VyLFxuICAgICAgICBicm93c2VyVmVyc2lvbjogdmVyc2lvbixcbiAgICAgICAgYnJvd3Nlck1ham9yVmVyc2lvbjogbWFqb3JWZXJzaW9uLFxuICAgICAgICBtb2JpbGU6IG1vYmlsZSxcbiAgICAgICAgdWEgOiBuQWd0LFxuICAgICAgICBvczogb3MsXG4gICAgICAgIG9zVmVyc2lvbjogb3NWZXJzaW9uLFxuICAgICAgICBjb29raWVzOiBjb29raWVFbmFibGVkXG4gICAgfTtcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzIHZ0dC5qcyBDb250cmlidXRvcnNcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5sZXQgVlRUQ3VlID0gd2luZG93LlZUVEN1ZTtcblxudmFyIGF1dG9LZXl3b3JkID0gXCJhdXRvXCI7XG52YXIgZGlyZWN0aW9uU2V0dGluZyA9IHtcbiAgICBcIlwiOiB0cnVlLFxuICAgIFwibHJcIjogdHJ1ZSxcbiAgICBcInJsXCI6IHRydWVcbn07XG52YXIgYWxpZ25TZXR0aW5nID0ge1xuICAgIFwic3RhcnRcIjogdHJ1ZSxcbiAgICBcIm1pZGRsZVwiOiB0cnVlLFxuICAgIFwiZW5kXCI6IHRydWUsXG4gICAgXCJsZWZ0XCI6IHRydWUsXG4gICAgXCJyaWdodFwiOiB0cnVlXG59O1xuXG5mdW5jdGlvbiBmaW5kRGlyZWN0aW9uU2V0dGluZyh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgZGlyID0gZGlyZWN0aW9uU2V0dGluZ1t2YWx1ZS50b0xvd2VyQ2FzZSgpXTtcbiAgICByZXR1cm4gZGlyID8gdmFsdWUudG9Mb3dlckNhc2UoKSA6IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBmaW5kQWxpZ25TZXR0aW5nKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciBhbGlnbiA9IGFsaWduU2V0dGluZ1t2YWx1ZS50b0xvd2VyQ2FzZSgpXTtcbiAgICByZXR1cm4gYWxpZ24gPyB2YWx1ZS50b0xvd2VyQ2FzZSgpIDogZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGV4dGVuZChvYmopIHtcbiAgICB2YXIgaSA9IDE7XG4gICAgZm9yICg7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNvYmogPSBhcmd1bWVudHNbaV07XG4gICAgICAgIGZvciAodmFyIHAgaW4gY29iaikge1xuICAgICAgICAgICAgb2JqW3BdID0gY29ialtwXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvYmo7XG59XG5pZighVlRUQ3VlKXtcbiAgICBWVFRDdWUgPSBmdW5jdGlvbiAoc3RhcnRUaW1lLCBlbmRUaW1lLCB0ZXh0KSB7XG4gICAgICAgIHZhciBjdWUgPSB0aGlzO1xuICAgICAgICB2YXIgaXNJRTggPSAoL01TSUVcXHM4XFwuMC8pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgICAgIHZhciBiYXNlT2JqID0ge307XG5cbiAgICAgICAgaWYgKGlzSUU4KSB7XG4gICAgICAgICAgICBjdWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjdXN0b20nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJhc2VPYmouZW51bWVyYWJsZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogU2hpbSBpbXBsZW1lbnRhdGlvbiBzcGVjaWZpYyBwcm9wZXJ0aWVzLiBUaGVzZSBwcm9wZXJ0aWVzIGFyZSBub3QgaW5cbiAgICAgICAgICogdGhlIHNwZWMuXG4gICAgICAgICAqL1xuXG4gICAgICAgICAgICAvLyBMZXRzIHVzIGtub3cgd2hlbiB0aGUgVlRUQ3VlJ3MgZGF0YSBoYXMgY2hhbmdlZCBpbiBzdWNoIGEgd2F5IHRoYXQgd2UgbmVlZFxuICAgICAgICAgICAgLy8gdG8gcmVjb21wdXRlIGl0cyBkaXNwbGF5IHN0YXRlLiBUaGlzIGxldHMgdXMgY29tcHV0ZSBpdHMgZGlzcGxheSBzdGF0ZVxuICAgICAgICAgICAgLy8gbGF6aWx5LlxuICAgICAgICBjdWUuaGFzQmVlblJlc2V0ID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFZUVEN1ZSBhbmQgVGV4dFRyYWNrQ3VlIHByb3BlcnRpZXNcbiAgICAgICAgICogaHR0cDovL2Rldi53My5vcmcvaHRtbDUvd2VidnR0LyN2dHRjdWUtaW50ZXJmYWNlXG4gICAgICAgICAqL1xuXG4gICAgICAgIHZhciBfaWQgPSBcIlwiO1xuICAgICAgICB2YXIgX3BhdXNlT25FeGl0ID0gZmFsc2U7XG4gICAgICAgIHZhciBfc3RhcnRUaW1lID0gc3RhcnRUaW1lO1xuICAgICAgICB2YXIgX2VuZFRpbWUgPSBlbmRUaW1lO1xuICAgICAgICB2YXIgX3RleHQgPSB0ZXh0O1xuICAgICAgICB2YXIgX3JlZ2lvbiA9IG51bGw7XG4gICAgICAgIHZhciBfdmVydGljYWwgPSBcIlwiO1xuICAgICAgICB2YXIgX3NuYXBUb0xpbmVzID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9saW5lID0gXCJhdXRvXCI7XG4gICAgICAgIHZhciBfbGluZUFsaWduID0gXCJzdGFydFwiO1xuICAgICAgICB2YXIgX3Bvc2l0aW9uID0gNTA7XG4gICAgICAgIHZhciBfcG9zaXRpb25BbGlnbiA9IFwibWlkZGxlXCI7XG4gICAgICAgIHZhciBfc2l6ZSA9IDUwO1xuICAgICAgICB2YXIgX2FsaWduID0gXCJtaWRkbGVcIjtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxuICAgICAgICAgICAgXCJpZFwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2lkO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBfaWQgPSBcIlwiICsgdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXG4gICAgICAgICAgICBcInBhdXNlT25FeGl0XCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcGF1c2VPbkV4aXQ7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIF9wYXVzZU9uRXhpdCA9ICEhdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXG4gICAgICAgICAgICBcInN0YXJ0VGltZVwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3N0YXJ0VGltZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN0YXJ0IHRpbWUgbXVzdCBiZSBzZXQgdG8gYSBudW1iZXIuXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF9zdGFydFRpbWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxuICAgICAgICAgICAgXCJlbmRUaW1lXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfZW5kVGltZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkVuZCB0aW1lIG11c3QgYmUgc2V0IHRvIGEgbnVtYmVyLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfZW5kVGltZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXG4gICAgICAgICAgICBcInRleHRcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF90ZXh0O1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBfdGV4dCA9IFwiXCIgKyB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxuICAgICAgICAgICAgXCJyZWdpb25cIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZWdpb247XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIF9yZWdpb24gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYXNCZWVuUmVzZXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3VlLFxuICAgICAgICAgICAgXCJ2ZXJ0aWNhbFwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZlcnRpY2FsO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2V0dGluZyA9IGZpbmREaXJlY3Rpb25TZXR0aW5nKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gSGF2ZSB0byBjaGVjayBmb3IgZmFsc2UgYmVjYXVzZSB0aGUgc2V0dGluZyBhbiBiZSBhbiBlbXB0eSBzdHJpbmcuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXR0aW5nID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKFwiQW4gaW52YWxpZCBvciBpbGxlZ2FsIHN0cmluZyB3YXMgc3BlY2lmaWVkLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfdmVydGljYWwgPSBzZXR0aW5nO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXG4gICAgICAgICAgICBcInNuYXBUb0xpbmVzXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfc25hcFRvTGluZXM7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIF9zbmFwVG9MaW5lcyA9ICEhdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcbiAgICAgICAgICAgIFwibGluZVwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2xpbmU7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwibnVtYmVyXCIgJiYgdmFsdWUgIT09IGF1dG9LZXl3b3JkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJBbiBpbnZhbGlkIG51bWJlciBvciBpbGxlZ2FsIHN0cmluZyB3YXMgc3BlY2lmaWVkLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfbGluZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXG4gICAgICAgICAgICBcImxpbmVBbGlnblwiLCBleHRlbmQoe30sIGJhc2VPYmosIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2xpbmVBbGlnbjtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNldHRpbmcgPSBmaW5kQWxpZ25TZXR0aW5nKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzZXR0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJBbiBpbnZhbGlkIG9yIGlsbGVnYWwgc3RyaW5nIHdhcyBzcGVjaWZpZWQuXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF9saW5lQWxpZ24gPSBzZXR0aW5nO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXG4gICAgICAgICAgICBcInBvc2l0aW9uXCIsIGV4dGVuZCh7fSwgYmFzZU9iaiwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfcG9zaXRpb247XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA8IDAgfHwgdmFsdWUgPiAxMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBvc2l0aW9uIG11c3QgYmUgYmV0d2VlbiAwIGFuZCAxMDAuXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF9wb3NpdGlvbiA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXG4gICAgICAgICAgICBcInBvc2l0aW9uQWxpZ25cIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9wb3NpdGlvbkFsaWduO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2V0dGluZyA9IGZpbmRBbGlnblNldHRpbmcodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXNldHRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihcIkFuIGludmFsaWQgb3IgaWxsZWdhbCBzdHJpbmcgd2FzIHNwZWNpZmllZC5cIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgX3Bvc2l0aW9uQWxpZ24gPSBzZXR0aW5nO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhhc0JlZW5SZXNldCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdWUsXG4gICAgICAgICAgICBcInNpemVcIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9zaXplO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPCAwIHx8IHZhbHVlID4gMTAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTaXplIG11c3QgYmUgYmV0d2VlbiAwIGFuZCAxMDAuXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF9zaXplID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN1ZSxcbiAgICAgICAgICAgIFwiYWxpZ25cIiwgZXh0ZW5kKHt9LCBiYXNlT2JqLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9hbGlnbjtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNldHRpbmcgPSBmaW5kQWxpZ25TZXR0aW5nKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzZXR0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJBbiBpbnZhbGlkIG9yIGlsbGVnYWwgc3RyaW5nIHdhcyBzcGVjaWZpZWQuXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF9hbGlnbiA9IHNldHRpbmc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzQmVlblJlc2V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE90aGVyIDx0cmFjaz4gc3BlYyBkZWZpbmVkIHByb3BlcnRpZXNcbiAgICAgICAgICovXG5cbiAgICAgICAgICAgIC8vIGh0dHA6Ly93d3cud2hhdHdnLm9yZy9zcGVjcy93ZWItYXBwcy9jdXJyZW50LXdvcmsvbXVsdGlwYWdlL3RoZS12aWRlby1lbGVtZW50Lmh0bWwjdGV4dC10cmFjay1jdWUtZGlzcGxheS1zdGF0ZVxuICAgICAgICBjdWUuZGlzcGxheVN0YXRlID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIGlmIChpc0lFOCkge1xuICAgICAgICAgICAgcmV0dXJuIGN1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFZUVEN1ZSBtZXRob2RzXG4gICAgICovXG5cbiAgICBWVFRDdWUucHJvdG90eXBlLmdldEN1ZUFzSFRNTCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBBc3N1bWUgV2ViVlRULmNvbnZlcnRDdWVUb0RPTVRyZWUgaXMgb24gdGhlIGdsb2JhbC5cbiAgICAgICAgcmV0dXJuIFdlYlZUVC5jb252ZXJ0Q3VlVG9ET01UcmVlKHdpbmRvdywgdGhpcy50ZXh0KTtcbiAgICB9O1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBWVFRDdWU7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNy4gMjMuLlxuICovXG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xuXG4vKipcbiAqIEBicmllZiAgIEl0IHdhcyByZXBsYWNlIGpxdWVyeSdzIHNlbGVjdG9yLiBJdCBPZnRlbiB1c2VkIGJ5IE92ZW5UZW1wbGF0ZS4gKC92aWV3L2VuZ2luZS9PdmVuVGVtcGxhdGUuanMpXG4gKiBAcGFyYW0gICBzZWxlY3Rvck9yRWxlbWVudCAgc3RyaW5nIG9yIGVsZW1lbnRcbiAqXG4gKiAqL1xuXG5cbmNvbnN0IExhJCA9IGZ1bmN0aW9uKHNlbGVjdG9yT3JFbGVtZW50KXtcbiAgICBjb25zdCB0aGF0ID0ge307XG4gICAgY29uc3QgcmV0dXJuTm9kZSA9IGZ1bmN0aW9uKCRlbGVtZW50ICwgc2VsZWN0b3Ipe1xuICAgICAgICBsZXQgbm9kZUxpc3QgPSAgJGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgICAgIGlmKG5vZGVMaXN0Lmxlbmd0aCA+IDEpe1xuICAgICAgICAgICAgcmV0dXJuIG5vZGVMaXN0O1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBub2RlTGlzdFswXTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIGxldCAkZWxlbWVudCA9IFwiXCI7XG5cbiAgICBpZiggXy5pc0VsZW1lbnQoc2VsZWN0b3JPckVsZW1lbnQpIHx8IF8uZXZlcnkoc2VsZWN0b3JPckVsZW1lbnQsIGZ1bmN0aW9uKGl0ZW0pe3JldHVybiBfLmlzRWxlbWVudChpdGVtKX0pKXtcbiAgICAgICAgJGVsZW1lbnQgPSBzZWxlY3Rvck9yRWxlbWVudDtcbiAgICB9ZWxzZSBpZihzZWxlY3Rvck9yRWxlbWVudCA9PT0gXCJkb2N1bWVudFwiKXtcbiAgICAgICAgJGVsZW1lbnQgPSBkb2N1bWVudDtcbiAgICB9ZWxzZSBpZihzZWxlY3Rvck9yRWxlbWVudCA9PT0gXCJ3aW5kb3dcIil7XG4gICAgICAgICRlbGVtZW50ID0gd2luZG93O1xuICAgIH1lbHNle1xuICAgICAgICAkZWxlbWVudCA9IHJldHVybk5vZGUoZG9jdW1lbnQsIHNlbGVjdG9yT3JFbGVtZW50KTtcbiAgICB9XG5cblxuICAgIGlmKCEkZWxlbWVudCl7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHRoYXQuZmluZCA9IChzZWxlY3RvcikgPT57XG4gICAgICAgIHJldHVybiBMYSQocmV0dXJuTm9kZSgkZWxlbWVudCwgc2VsZWN0b3IpKTtcbiAgICB9O1xuXG4gICAgdGhhdC5jc3MgPSAobmFtZSwgdmFsdWUpID0+IHtcbiAgICAgICAgaWYoJGVsZW1lbnQubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAkZWxlbWVudC5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQpe1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGVbbmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgJGVsZW1lbnQuc3R5bGVbbmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0LmFkZENsYXNzID0gKG5hbWUpID0+e1xuICAgICAgICBpZigkZWxlbWVudC5jbGFzc0xpc3Qpe1xuICAgICAgICAgICAgJGVsZW1lbnQuY2xhc3NMaXN0LmFkZChuYW1lKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBsZXQgY2xhc3NOYW1lcyA9ICRlbGVtZW50LmNsYXNzTmFtZS5zcGxpdChcIiBcIik7XG4gICAgICAgICAgICBpZihjbGFzc05hbWVzLmluZGV4T2YobmFtZSkgPT09IC0xKXtcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5jbGFzc05hbWUgKz0gXCIgXCIgKyBuYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgdGhhdC5yZW1vdmVDbGFzcyA9IChuYW1lKSA9PntcbiAgICAgICAgaWYgKCRlbGVtZW50LmNsYXNzTGlzdCl7XG4gICAgICAgICAgICAkZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKG5hbWUpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICRlbGVtZW50LmNsYXNzTmFtZSA9ICRlbGVtZW50LmNsYXNzTmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAoJyhefFxcXFxiKScgKyBuYW1lLnNwbGl0KCcgJykuam9pbignfCcpICsgJyhcXFxcYnwkKScsICdnaScpLCAnICcpO1xuXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhhdC5yZW1vdmVBdHRyaWJ1dGUgPSAoYXR0ck5hbWUpID0+IHtcbiAgICAgICAgJGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKTtcbiAgICB9O1xuXG4gICAgdGhhdC5zaG93ID0gKCkgPT57XG4gICAgICAgICRlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH07XG5cbiAgICB0aGF0LmhpZGUgPSAoKSA9PntcbiAgICAgICAgJGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9O1xuXG4gICAgLyp0aGF0LmFwcGVuZCA9IChodG1sQ29kZSkgPT57XG4gICAgICAgICRlbGVtZW50LmlubmVySFRNTCArPSBodG1sQ29kZTtcbiAgICB9OyovXG5cbiAgICB0aGF0LnRleHQgPSAodGV4dCkgPT4geyAvL0lFOCtcbiAgICAgICAgaWYodGV4dCA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIHJldHVybiAkZWxlbWVudC50ZXh0Q29udGVudDtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAkZWxlbWVudC50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHRoYXQuaHRtbCA9ICh0ZXh0KSA9PiB7XG4gICAgICAgICRlbGVtZW50LmlubmVySFRNTCA9IHRleHQ7XG4gICAgfTtcbiAgICB0aGF0Lmhhc0NsYXNzID0gKG5hbWUpID0+IHsgLy9JRTgrXG4gICAgICAgIGlmKCRlbGVtZW50LmNsYXNzTGlzdCl7XG4gICAgICAgICAgICByZXR1cm4gJGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKG5hbWUpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVnRXhwKCcoXnwgKScgKyBuYW1lICsgJyggfCQpJywgJ2dpJykudGVzdCgkZWxlbWVudC5uYW1lKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0LmlzID0gKCR0YXJnZXRFbGVtZW50KSA9PiB7XG4gICAgICAgIHJldHVybiAkZWxlbWVudCA9PT0gJHRhcmdldEVsZW1lbnQ7XG4gICAgfTtcblxuICAgIHRoYXQub2Zmc2V0ID0gKCkgPT57ICAgIC8vSUU4K1xuICAgICAgICB2YXIgcmVjdCA9ICRlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0b3A6IHJlY3QudG9wICsgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AsXG4gICAgICAgICAgICBsZWZ0OiByZWN0LmxlZnQgKyBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnRcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0LndpZHRoID0gKCkgPT4geyAgICAvL0lFOCtcbiAgICAgICAgcmV0dXJuICRlbGVtZW50LmNsaWVudFdpZHRoO1xuICAgIH07XG5cbiAgICB0aGF0LmhlaWdodCA9ICgpID0+IHsgICAvL0lFOCtcbiAgICAgICAgcmV0dXJuICRlbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICB9O1xuXG4gICAgdGhhdC5hdHRyID0gKGF0dHIpID0+IHtcbiAgICAgICAgcmV0dXJuICRlbGVtZW50LmdldEF0dHJpYnV0ZShhdHRyKTtcbiAgICB9O1xuXG4gICAgdGhhdC5yZXBsYWNlID0gKGh0bWwpID0+IHtcbiAgICAgICAgJGVsZW1lbnQucmVwbGFjZVdpdGgoaHRtbCk7XG4gICAgfTtcblxuICAgIHRoYXQuYXBwZW5kID0gKGh0bWwpID0+IHtcbiAgICAgICAgJGVsZW1lbnQuYXBwZW5kQ2hpbGQoaHRtbCk7XG4gICAgfTtcblxuICAgIHRoYXQucmVtb3ZlID0gKCkgPT4ge1xuICAgICAgICBpZigkZWxlbWVudC5sZW5ndGggPiAxKXtcbiAgICAgICAgICAgICRlbGVtZW50LnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoJGVsZW1lbnQpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgdGhhdC5yZW1vdmVDaGlsZCA9IChlbGVtZW50KSA9PiB7XG4gICAgICAgIGlmKGVsZW1lbnQpe1xuICAgICAgICAgICAgJGVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgd2hpbGUgKCRlbGVtZW50Lmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgICAgICAgICAgICRlbGVtZW50LnJlbW92ZUNoaWxkKCRlbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgdGhhdC5nZXQgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiAkZWxlbWVudDtcbiAgICB9O1xuXG4gICAgdGhhdC5jbG9zZXN0ID0gKHNlbGVjdG9yU3RyaW5nKSA9PiB7XG4gICAgICAgIGxldCBjbG9zZXN0RWxlbWVudCA9ICRlbGVtZW50LmNsb3Nlc3Qoc2VsZWN0b3JTdHJpbmcpO1xuICAgICAgICBpZihjbG9zZXN0RWxlbWVudCl7XG4gICAgICAgICAgICByZXR1cm4gTGEkKGNsb3Nlc3RFbGVtZW50KTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IExhJDtcbiIsImltcG9ydCBfIGZyb20gJy4vdW5kZXJzY29yZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiB0cmltKHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcgPyBzdHJpbmcucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpIDogXCJcIjtcbn1cblxuLyoqXG4gKiBleHRyYWN0RXh0ZW5zaW9uXG4gKlxuICogQHBhcmFtICAgICAge3N0cmluZ30gcGF0aCBmb3IgdXJsXG4gKiBAcmV0dXJuICAgICB7c3RyaW5nfSAgRXh0ZW5zaW9uXG4gKi9cbmV4cG9ydCBjb25zdCBleHRyYWN0RXh0ZW5zaW9uID0gZnVuY3Rpb24ocGF0aCkge1xuICAgIGlmKCFwYXRoIHx8IHBhdGguc3Vic3RyKDAsNCk9PSdydG1wJykge1xuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0QXp1cmVGaWxlRm9ybWF0KHBhdGgpIHtcbiAgICAgICAgbGV0IGV4dGVuc2lvbiA9IFwiXCI7XG4gICAgICAgIGlmICgoL1soLF1mb3JtYXQ9bXBkLS9pKS50ZXN0KHBhdGgpKSB7XG4gICAgICAgICAgICBleHRlbnNpb24gPSAnbXBkJztcbiAgICAgICAgfWVsc2UgaWYgKCgvWygsXWZvcm1hdD1tM3U4LS9pKS50ZXN0KHBhdGgpKSB7XG4gICAgICAgICAgICBleHRlbnNpb24gPSAnbTN1OCc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV4dGVuc2lvbjtcbiAgICB9XG5cbiAgICBsZXQgYXp1cmVkRm9ybWF0ID0gZ2V0QXp1cmVGaWxlRm9ybWF0KHBhdGgpO1xuICAgIGlmKGF6dXJlZEZvcm1hdCkge1xuICAgICAgICByZXR1cm4gYXp1cmVkRm9ybWF0O1xuICAgIH1cbiAgICBwYXRoID0gcGF0aC5zcGxpdCgnPycpWzBdLnNwbGl0KCcjJylbMF07XG4gICAgaWYocGF0aC5sYXN0SW5kZXhPZignLicpID4gLTEpIHtcbiAgICAgICAgcmV0dXJuIHBhdGguc3Vic3RyKHBhdGgubGFzdEluZGV4T2YoJy4nKSArIDEsIHBhdGgubGVuZ3RoKS50b0xvd2VyQ2FzZSgpO1xuICAgIH1lbHNle1xuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG59O1xuXG5cbi8qKlxuICogbmF0dXJhbEhtc1xuICpcbiAqIEBwYXJhbSAgICAgIHtudW1iZXIgfCBzdHJpbmd9ICBzZWNvbmQgIFRoZSBzZWNvbmRcbiAqIEByZXR1cm4gICAgIHtzdHJpbmd9ICBmb3JtYXR0ZWQgU3RyaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBuYXR1cmFsSG1zKHNlY29uZCkge1xuICAgIGxldCBzZWNOdW0gPSBwYXJzZUludChzZWNvbmQsIDEwKTtcbiAgICBpZighc2Vjb25kKXtcbiAgICAgICAgcmV0dXJuIFwiMDA6MDBcIjtcbiAgICB9XG4gICAgbGV0IGhvdXJzICAgPSBNYXRoLmZsb29yKHNlY051bSAvIDM2MDApO1xuICAgIGxldCBtaW51dGVzID0gTWF0aC5mbG9vcigoc2VjTnVtIC0gKGhvdXJzICogMzYwMCkpIC8gNjApO1xuICAgIGxldCBzZWNvbmRzID0gc2VjTnVtIC0gKGhvdXJzICogMzYwMCkgLSAobWludXRlcyAqIDYwKTtcblxuICAgIC8vaWYgKGhvdXJzID4gMCkge21pbnV0ZXMgPSBcIjBcIittaW51dGVzO31cbiAgICBpZiAobWludXRlcyA8IDEwKSB7bWludXRlcyA9IFwiMFwiK21pbnV0ZXM7fVxuICAgIGlmIChzZWNvbmRzIDwgMTApIHtzZWNvbmRzID0gXCIwXCIrc2Vjb25kczt9XG5cbiAgICBpZiAoaG91cnMgPiAwKSB7XG4gICAgICAgIHJldHVybiBob3VycysnOicrbWludXRlcysnOicrc2Vjb25kcztcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbWludXRlcysnOicrc2Vjb25kcztcbiAgICB9XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGhtc1RvU2Vjb25kKHN0ciwgZnJhbWVSYXRlKSB7XG4gICAgaWYoIXN0cikge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgaWYoXy5pc051bWJlcihzdHIpICYmICFfLmlzTmFOKHN0cikpe1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgICBzdHIgPSBzdHIucmVwbGFjZSgnLCcsICcuJyk7XG4gICAgbGV0IGFyciA9IHN0ci5zcGxpdCgnOicpO1xuICAgIGxldCBhcnJMZW5ndGggPSBhcnIubGVuZ3RoO1xuICAgIGxldCBzZWMgPSAwO1xuICAgIGlmIChzdHIuc2xpY2UoLTEpID09PSAncycpe1xuICAgICAgICBzZWMgPSBwYXJzZUZsb2F0KHN0cik7XG4gICAgfWVsc2UgaWYgKHN0ci5zbGljZSgtMSkgPT09ICdtJyl7XG4gICAgICAgIHNlYyA9IHBhcnNlRmxvYXQoc3RyKSAqIDYwO1xuICAgIH1lbHNlIGlmIChzdHIuc2xpY2UoLTEpID09PSAnaCcpe1xuICAgICAgICBzZWMgPSBwYXJzZUZsb2F0KHN0cikgKiAzNjAwO1xuICAgIH1lbHNlIGlmIChhcnJMZW5ndGggPiAxKSB7XG4gICAgICAgIHZhciBzZWNJbmRleCA9IGFyckxlbmd0aCAtIDE7XG4gICAgICAgIGlmIChhcnJMZW5ndGggPT09IDQpIHtcbiAgICAgICAgICAgIGlmIChmcmFtZVJhdGUpIHtcbiAgICAgICAgICAgICAgICBzZWMgPSBwYXJzZUZsb2F0KGFycltzZWNJbmRleF0pIC8gZnJhbWVSYXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VjSW5kZXggLT0gMTtcbiAgICAgICAgfVxuICAgICAgICBzZWMgKz0gcGFyc2VGbG9hdChhcnJbc2VjSW5kZXhdKTtcbiAgICAgICAgc2VjICs9IHBhcnNlRmxvYXQoYXJyW3NlY0luZGV4IC0gMV0pICogNjA7XG4gICAgICAgIGlmIChhcnJMZW5ndGggPj0gMykge1xuICAgICAgICAgICAgc2VjICs9IHBhcnNlRmxvYXQoYXJyW3NlY0luZGV4IC0gMl0pICogMzYwMDtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHNlYyA9IHBhcnNlRmxvYXQoc3RyKTtcbiAgICB9XG4gICAgaWYgKF8uaXNOYU4oc2VjKSkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgcmV0dXJuIHNlYztcbn0iLCIvLyAgICAgVW5kZXJzY29yZS5qcyAxLjkuMVxuLy8gICAgIGh0dHA6Ly91bmRlcnNjb3JlanMub3JnXG4vLyAgICAgKGMpIDIwMDktMjAxOCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuLy8gICAgIFVuZGVyc2NvcmUgbWF5IGJlIGZyZWVseSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4hZnVuY3Rpb24oKXt2YXIgbj1cIm9iamVjdFwiPT10eXBlb2Ygc2VsZiYmc2VsZi5zZWxmPT09c2VsZiYmc2VsZnx8XCJvYmplY3RcIj09dHlwZW9mIGdsb2JhbCYmZ2xvYmFsLmdsb2JhbD09PWdsb2JhbCYmZ2xvYmFsfHx0aGlzfHx7fSxyPW4uXyxlPUFycmF5LnByb3RvdHlwZSxvPU9iamVjdC5wcm90b3R5cGUscz1cInVuZGVmaW5lZFwiIT10eXBlb2YgU3ltYm9sP1N5bWJvbC5wcm90b3R5cGU6bnVsbCx1PWUucHVzaCxjPWUuc2xpY2UscD1vLnRvU3RyaW5nLGk9by5oYXNPd25Qcm9wZXJ0eSx0PUFycmF5LmlzQXJyYXksYT1PYmplY3Qua2V5cyxsPU9iamVjdC5jcmVhdGUsZj1mdW5jdGlvbigpe30saD1mdW5jdGlvbihuKXtyZXR1cm4gbiBpbnN0YW5jZW9mIGg/bjp0aGlzIGluc3RhbmNlb2YgaD92b2lkKHRoaXMuX3dyYXBwZWQ9bik6bmV3IGgobil9O1widW5kZWZpbmVkXCI9PXR5cGVvZiBleHBvcnRzfHxleHBvcnRzLm5vZGVUeXBlP24uXz1oOihcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlJiYhbW9kdWxlLm5vZGVUeXBlJiZtb2R1bGUuZXhwb3J0cyYmKGV4cG9ydHM9bW9kdWxlLmV4cG9ydHM9aCksZXhwb3J0cy5fPWgpLGguVkVSU0lPTj1cIjEuOS4xXCI7dmFyIHYseT1mdW5jdGlvbih1LGksbil7aWYodm9pZCAwPT09aSlyZXR1cm4gdTtzd2l0Y2gobnVsbD09bj8zOm4pe2Nhc2UgMTpyZXR1cm4gZnVuY3Rpb24obil7cmV0dXJuIHUuY2FsbChpLG4pfTtjYXNlIDM6cmV0dXJuIGZ1bmN0aW9uKG4scix0KXtyZXR1cm4gdS5jYWxsKGksbixyLHQpfTtjYXNlIDQ6cmV0dXJuIGZ1bmN0aW9uKG4scix0LGUpe3JldHVybiB1LmNhbGwoaSxuLHIsdCxlKX19cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIHUuYXBwbHkoaSxhcmd1bWVudHMpfX0sZD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGguaXRlcmF0ZWUhPT12P2guaXRlcmF0ZWUobixyKTpudWxsPT1uP2guaWRlbnRpdHk6aC5pc0Z1bmN0aW9uKG4pP3kobixyLHQpOmguaXNPYmplY3QobikmJiFoLmlzQXJyYXkobik/aC5tYXRjaGVyKG4pOmgucHJvcGVydHkobil9O2guaXRlcmF0ZWU9dj1mdW5jdGlvbihuLHIpe3JldHVybiBkKG4sciwxLzApfTt2YXIgZz1mdW5jdGlvbih1LGkpe3JldHVybiBpPW51bGw9PWk/dS5sZW5ndGgtMToraSxmdW5jdGlvbigpe2Zvcih2YXIgbj1NYXRoLm1heChhcmd1bWVudHMubGVuZ3RoLWksMCkscj1BcnJheShuKSx0PTA7dDxuO3QrKylyW3RdPWFyZ3VtZW50c1t0K2ldO3N3aXRjaChpKXtjYXNlIDA6cmV0dXJuIHUuY2FsbCh0aGlzLHIpO2Nhc2UgMTpyZXR1cm4gdS5jYWxsKHRoaXMsYXJndW1lbnRzWzBdLHIpO2Nhc2UgMjpyZXR1cm4gdS5jYWxsKHRoaXMsYXJndW1lbnRzWzBdLGFyZ3VtZW50c1sxXSxyKX12YXIgZT1BcnJheShpKzEpO2Zvcih0PTA7dDxpO3QrKyllW3RdPWFyZ3VtZW50c1t0XTtyZXR1cm4gZVtpXT1yLHUuYXBwbHkodGhpcyxlKX19LG09ZnVuY3Rpb24obil7aWYoIWguaXNPYmplY3QobikpcmV0dXJue307aWYobClyZXR1cm4gbChuKTtmLnByb3RvdHlwZT1uO3ZhciByPW5ldyBmO3JldHVybiBmLnByb3RvdHlwZT1udWxsLHJ9LGI9ZnVuY3Rpb24ocil7cmV0dXJuIGZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT1uP3ZvaWQgMDpuW3JdfX0saj1mdW5jdGlvbihuLHIpe3JldHVybiBudWxsIT1uJiZpLmNhbGwobixyKX0seD1mdW5jdGlvbihuLHIpe2Zvcih2YXIgdD1yLmxlbmd0aCxlPTA7ZTx0O2UrKyl7aWYobnVsbD09bilyZXR1cm47bj1uW3JbZV1dfXJldHVybiB0P246dm9pZCAwfSxfPU1hdGgucG93KDIsNTMpLTEsQT1iKFwibGVuZ3RoXCIpLHc9ZnVuY3Rpb24obil7dmFyIHI9QShuKTtyZXR1cm5cIm51bWJlclwiPT10eXBlb2YgciYmMDw9ciYmcjw9X307aC5lYWNoPWguZm9yRWFjaD1mdW5jdGlvbihuLHIsdCl7dmFyIGUsdTtpZihyPXkocix0KSx3KG4pKWZvcihlPTAsdT1uLmxlbmd0aDtlPHU7ZSsrKXIobltlXSxlLG4pO2Vsc2V7dmFyIGk9aC5rZXlzKG4pO2ZvcihlPTAsdT1pLmxlbmd0aDtlPHU7ZSsrKXIobltpW2VdXSxpW2VdLG4pfXJldHVybiBufSxoLm1hcD1oLmNvbGxlY3Q9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT0hdyhuKSYmaC5rZXlzKG4pLHU9KGV8fG4pLmxlbmd0aCxpPUFycmF5KHUpLG89MDtvPHU7bysrKXt2YXIgYT1lP2Vbb106bztpW29dPXIoblthXSxhLG4pfXJldHVybiBpfTt2YXIgTz1mdW5jdGlvbihjKXtyZXR1cm4gZnVuY3Rpb24obixyLHQsZSl7dmFyIHU9Mzw9YXJndW1lbnRzLmxlbmd0aDtyZXR1cm4gZnVuY3Rpb24obixyLHQsZSl7dmFyIHU9IXcobikmJmgua2V5cyhuKSxpPSh1fHxuKS5sZW5ndGgsbz0wPGM/MDppLTE7Zm9yKGV8fCh0PW5bdT91W29dOm9dLG8rPWMpOzA8PW8mJm88aTtvKz1jKXt2YXIgYT11P3Vbb106bzt0PXIodCxuW2FdLGEsbil9cmV0dXJuIHR9KG4seShyLGUsNCksdCx1KX19O2gucmVkdWNlPWguZm9sZGw9aC5pbmplY3Q9TygxKSxoLnJlZHVjZVJpZ2h0PWguZm9sZHI9TygtMSksaC5maW5kPWguZGV0ZWN0PWZ1bmN0aW9uKG4scix0KXt2YXIgZT0odyhuKT9oLmZpbmRJbmRleDpoLmZpbmRLZXkpKG4scix0KTtpZih2b2lkIDAhPT1lJiYtMSE9PWUpcmV0dXJuIG5bZV19LGguZmlsdGVyPWguc2VsZWN0PWZ1bmN0aW9uKG4sZSxyKXt2YXIgdT1bXTtyZXR1cm4gZT1kKGUsciksaC5lYWNoKG4sZnVuY3Rpb24obixyLHQpe2UobixyLHQpJiZ1LnB1c2gobil9KSx1fSxoLnJlamVjdD1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIGguZmlsdGVyKG4saC5uZWdhdGUoZChyKSksdCl9LGguZXZlcnk9aC5hbGw9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT0hdyhuKSYmaC5rZXlzKG4pLHU9KGV8fG4pLmxlbmd0aCxpPTA7aTx1O2krKyl7dmFyIG89ZT9lW2ldOmk7aWYoIXIobltvXSxvLG4pKXJldHVybiExfXJldHVybiEwfSxoLnNvbWU9aC5hbnk9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT0hdyhuKSYmaC5rZXlzKG4pLHU9KGV8fG4pLmxlbmd0aCxpPTA7aTx1O2krKyl7dmFyIG89ZT9lW2ldOmk7aWYocihuW29dLG8sbikpcmV0dXJuITB9cmV0dXJuITF9LGguY29udGFpbnM9aC5pbmNsdWRlcz1oLmluY2x1ZGU9ZnVuY3Rpb24obixyLHQsZSl7cmV0dXJuIHcobil8fChuPWgudmFsdWVzKG4pKSwoXCJudW1iZXJcIiE9dHlwZW9mIHR8fGUpJiYodD0wKSwwPD1oLmluZGV4T2YobixyLHQpfSxoLmludm9rZT1nKGZ1bmN0aW9uKG4sdCxlKXt2YXIgdSxpO3JldHVybiBoLmlzRnVuY3Rpb24odCk/aT10OmguaXNBcnJheSh0KSYmKHU9dC5zbGljZSgwLC0xKSx0PXRbdC5sZW5ndGgtMV0pLGgubWFwKG4sZnVuY3Rpb24obil7dmFyIHI9aTtpZighcil7aWYodSYmdS5sZW5ndGgmJihuPXgobix1KSksbnVsbD09bilyZXR1cm47cj1uW3RdfXJldHVybiBudWxsPT1yP3I6ci5hcHBseShuLGUpfSl9KSxoLnBsdWNrPWZ1bmN0aW9uKG4scil7cmV0dXJuIGgubWFwKG4saC5wcm9wZXJ0eShyKSl9LGgud2hlcmU9ZnVuY3Rpb24obixyKXtyZXR1cm4gaC5maWx0ZXIobixoLm1hdGNoZXIocikpfSxoLmZpbmRXaGVyZT1mdW5jdGlvbihuLHIpe3JldHVybiBoLmZpbmQobixoLm1hdGNoZXIocikpfSxoLm1heD1mdW5jdGlvbihuLGUscil7dmFyIHQsdSxpPS0xLzAsbz0tMS8wO2lmKG51bGw9PWV8fFwibnVtYmVyXCI9PXR5cGVvZiBlJiZcIm9iamVjdFwiIT10eXBlb2YgblswXSYmbnVsbCE9bilmb3IodmFyIGE9MCxjPShuPXcobik/bjpoLnZhbHVlcyhuKSkubGVuZ3RoO2E8YzthKyspbnVsbCE9KHQ9blthXSkmJmk8dCYmKGk9dCk7ZWxzZSBlPWQoZSxyKSxoLmVhY2gobixmdW5jdGlvbihuLHIsdCl7dT1lKG4scix0KSwobzx1fHx1PT09LTEvMCYmaT09PS0xLzApJiYoaT1uLG89dSl9KTtyZXR1cm4gaX0saC5taW49ZnVuY3Rpb24obixlLHIpe3ZhciB0LHUsaT0xLzAsbz0xLzA7aWYobnVsbD09ZXx8XCJudW1iZXJcIj09dHlwZW9mIGUmJlwib2JqZWN0XCIhPXR5cGVvZiBuWzBdJiZudWxsIT1uKWZvcih2YXIgYT0wLGM9KG49dyhuKT9uOmgudmFsdWVzKG4pKS5sZW5ndGg7YTxjO2ErKyludWxsIT0odD1uW2FdKSYmdDxpJiYoaT10KTtlbHNlIGU9ZChlLHIpLGguZWFjaChuLGZ1bmN0aW9uKG4scix0KXsoKHU9ZShuLHIsdCkpPG98fHU9PT0xLzAmJmk9PT0xLzApJiYoaT1uLG89dSl9KTtyZXR1cm4gaX0saC5zaHVmZmxlPWZ1bmN0aW9uKG4pe3JldHVybiBoLnNhbXBsZShuLDEvMCl9LGguc2FtcGxlPWZ1bmN0aW9uKG4scix0KXtpZihudWxsPT1yfHx0KXJldHVybiB3KG4pfHwobj1oLnZhbHVlcyhuKSksbltoLnJhbmRvbShuLmxlbmd0aC0xKV07dmFyIGU9dyhuKT9oLmNsb25lKG4pOmgudmFsdWVzKG4pLHU9QShlKTtyPU1hdGgubWF4KE1hdGgubWluKHIsdSksMCk7Zm9yKHZhciBpPXUtMSxvPTA7bzxyO28rKyl7dmFyIGE9aC5yYW5kb20obyxpKSxjPWVbb107ZVtvXT1lW2FdLGVbYV09Y31yZXR1cm4gZS5zbGljZSgwLHIpfSxoLnNvcnRCeT1mdW5jdGlvbihuLGUscil7dmFyIHU9MDtyZXR1cm4gZT1kKGUsciksaC5wbHVjayhoLm1hcChuLGZ1bmN0aW9uKG4scix0KXtyZXR1cm57dmFsdWU6bixpbmRleDp1KyssY3JpdGVyaWE6ZShuLHIsdCl9fSkuc29ydChmdW5jdGlvbihuLHIpe3ZhciB0PW4uY3JpdGVyaWEsZT1yLmNyaXRlcmlhO2lmKHQhPT1lKXtpZihlPHR8fHZvaWQgMD09PXQpcmV0dXJuIDE7aWYodDxlfHx2b2lkIDA9PT1lKXJldHVybi0xfXJldHVybiBuLmluZGV4LXIuaW5kZXh9KSxcInZhbHVlXCIpfTt2YXIgaz1mdW5jdGlvbihvLHIpe3JldHVybiBmdW5jdGlvbihlLHUsbil7dmFyIGk9cj9bW10sW11dOnt9O3JldHVybiB1PWQodSxuKSxoLmVhY2goZSxmdW5jdGlvbihuLHIpe3ZhciB0PXUobixyLGUpO28oaSxuLHQpfSksaX19O2guZ3JvdXBCeT1rKGZ1bmN0aW9uKG4scix0KXtqKG4sdCk/blt0XS5wdXNoKHIpOm5bdF09W3JdfSksaC5pbmRleEJ5PWsoZnVuY3Rpb24obixyLHQpe25bdF09cn0pLGguY291bnRCeT1rKGZ1bmN0aW9uKG4scix0KXtqKG4sdCk/blt0XSsrOm5bdF09MX0pO3ZhciBTPS9bXlxcdWQ4MDAtXFx1ZGZmZl18W1xcdWQ4MDAtXFx1ZGJmZl1bXFx1ZGMwMC1cXHVkZmZmXXxbXFx1ZDgwMC1cXHVkZmZmXS9nO2gudG9BcnJheT1mdW5jdGlvbihuKXtyZXR1cm4gbj9oLmlzQXJyYXkobik/Yy5jYWxsKG4pOmguaXNTdHJpbmcobik/bi5tYXRjaChTKTp3KG4pP2gubWFwKG4saC5pZGVudGl0eSk6aC52YWx1ZXMobik6W119LGguc2l6ZT1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09bj8wOncobik/bi5sZW5ndGg6aC5rZXlzKG4pLmxlbmd0aH0saC5wYXJ0aXRpb249ayhmdW5jdGlvbihuLHIsdCl7blt0PzA6MV0ucHVzaChyKX0sITApLGguZmlyc3Q9aC5oZWFkPWgudGFrZT1mdW5jdGlvbihuLHIsdCl7cmV0dXJuIG51bGw9PW58fG4ubGVuZ3RoPDE/bnVsbD09cj92b2lkIDA6W106bnVsbD09cnx8dD9uWzBdOmguaW5pdGlhbChuLG4ubGVuZ3RoLXIpfSxoLmluaXRpYWw9ZnVuY3Rpb24obixyLHQpe3JldHVybiBjLmNhbGwobiwwLE1hdGgubWF4KDAsbi5sZW5ndGgtKG51bGw9PXJ8fHQ/MTpyKSkpfSxoLmxhc3Q9ZnVuY3Rpb24obixyLHQpe3JldHVybiBudWxsPT1ufHxuLmxlbmd0aDwxP251bGw9PXI/dm9pZCAwOltdOm51bGw9PXJ8fHQ/bltuLmxlbmd0aC0xXTpoLnJlc3QobixNYXRoLm1heCgwLG4ubGVuZ3RoLXIpKX0saC5yZXN0PWgudGFpbD1oLmRyb3A9ZnVuY3Rpb24obixyLHQpe3JldHVybiBjLmNhbGwobixudWxsPT1yfHx0PzE6cil9LGguY29tcGFjdD1mdW5jdGlvbihuKXtyZXR1cm4gaC5maWx0ZXIobixCb29sZWFuKX07dmFyIE09ZnVuY3Rpb24obixyLHQsZSl7Zm9yKHZhciB1PShlPWV8fFtdKS5sZW5ndGgsaT0wLG89QShuKTtpPG87aSsrKXt2YXIgYT1uW2ldO2lmKHcoYSkmJihoLmlzQXJyYXkoYSl8fGguaXNBcmd1bWVudHMoYSkpKWlmKHIpZm9yKHZhciBjPTAsbD1hLmxlbmd0aDtjPGw7KWVbdSsrXT1hW2MrK107ZWxzZSBNKGEscix0LGUpLHU9ZS5sZW5ndGg7ZWxzZSB0fHwoZVt1KytdPWEpfXJldHVybiBlfTtoLmZsYXR0ZW49ZnVuY3Rpb24obixyKXtyZXR1cm4gTShuLHIsITEpfSxoLndpdGhvdXQ9ZyhmdW5jdGlvbihuLHIpe3JldHVybiBoLmRpZmZlcmVuY2UobixyKX0pLGgudW5pcT1oLnVuaXF1ZT1mdW5jdGlvbihuLHIsdCxlKXtoLmlzQm9vbGVhbihyKXx8KGU9dCx0PXIscj0hMSksbnVsbCE9dCYmKHQ9ZCh0LGUpKTtmb3IodmFyIHU9W10saT1bXSxvPTAsYT1BKG4pO288YTtvKyspe3ZhciBjPW5bb10sbD10P3QoYyxvLG4pOmM7ciYmIXQ/KG8mJmk9PT1sfHx1LnB1c2goYyksaT1sKTp0P2guY29udGFpbnMoaSxsKXx8KGkucHVzaChsKSx1LnB1c2goYykpOmguY29udGFpbnModSxjKXx8dS5wdXNoKGMpfXJldHVybiB1fSxoLnVuaW9uPWcoZnVuY3Rpb24obil7cmV0dXJuIGgudW5pcShNKG4sITAsITApKX0pLGguaW50ZXJzZWN0aW9uPWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj1bXSx0PWFyZ3VtZW50cy5sZW5ndGgsZT0wLHU9QShuKTtlPHU7ZSsrKXt2YXIgaT1uW2VdO2lmKCFoLmNvbnRhaW5zKHIsaSkpe3ZhciBvO2ZvcihvPTE7bzx0JiZoLmNvbnRhaW5zKGFyZ3VtZW50c1tvXSxpKTtvKyspO289PT10JiZyLnB1c2goaSl9fXJldHVybiByfSxoLmRpZmZlcmVuY2U9ZyhmdW5jdGlvbihuLHIpe3JldHVybiByPU0ociwhMCwhMCksaC5maWx0ZXIobixmdW5jdGlvbihuKXtyZXR1cm4haC5jb250YWlucyhyLG4pfSl9KSxoLnVuemlwPWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj1uJiZoLm1heChuLEEpLmxlbmd0aHx8MCx0PUFycmF5KHIpLGU9MDtlPHI7ZSsrKXRbZV09aC5wbHVjayhuLGUpO3JldHVybiB0fSxoLnppcD1nKGgudW56aXApLGgub2JqZWN0PWZ1bmN0aW9uKG4scil7Zm9yKHZhciB0PXt9LGU9MCx1PUEobik7ZTx1O2UrKylyP3RbbltlXV09cltlXTp0W25bZV1bMF1dPW5bZV1bMV07cmV0dXJuIHR9O3ZhciBGPWZ1bmN0aW9uKGkpe3JldHVybiBmdW5jdGlvbihuLHIsdCl7cj1kKHIsdCk7Zm9yKHZhciBlPUEobiksdT0wPGk/MDplLTE7MDw9dSYmdTxlO3UrPWkpaWYocihuW3VdLHUsbikpcmV0dXJuIHU7cmV0dXJuLTF9fTtoLmZpbmRJbmRleD1GKDEpLGguZmluZExhc3RJbmRleD1GKC0xKSxoLnNvcnRlZEluZGV4PWZ1bmN0aW9uKG4scix0LGUpe2Zvcih2YXIgdT0odD1kKHQsZSwxKSkociksaT0wLG89QShuKTtpPG87KXt2YXIgYT1NYXRoLmZsb29yKChpK28pLzIpO3QoblthXSk8dT9pPWErMTpvPWF9cmV0dXJuIGl9O3ZhciBFPWZ1bmN0aW9uKGksbyxhKXtyZXR1cm4gZnVuY3Rpb24obixyLHQpe3ZhciBlPTAsdT1BKG4pO2lmKFwibnVtYmVyXCI9PXR5cGVvZiB0KTA8aT9lPTA8PXQ/dDpNYXRoLm1heCh0K3UsZSk6dT0wPD10P01hdGgubWluKHQrMSx1KTp0K3UrMTtlbHNlIGlmKGEmJnQmJnUpcmV0dXJuIG5bdD1hKG4scildPT09cj90Oi0xO2lmKHIhPXIpcmV0dXJuIDA8PSh0PW8oYy5jYWxsKG4sZSx1KSxoLmlzTmFOKSk/dCtlOi0xO2Zvcih0PTA8aT9lOnUtMTswPD10JiZ0PHU7dCs9aSlpZihuW3RdPT09cilyZXR1cm4gdDtyZXR1cm4tMX19O2guaW5kZXhPZj1FKDEsaC5maW5kSW5kZXgsaC5zb3J0ZWRJbmRleCksaC5sYXN0SW5kZXhPZj1FKC0xLGguZmluZExhc3RJbmRleCksaC5yYW5nZT1mdW5jdGlvbihuLHIsdCl7bnVsbD09ciYmKHI9bnx8MCxuPTApLHR8fCh0PXI8bj8tMToxKTtmb3IodmFyIGU9TWF0aC5tYXgoTWF0aC5jZWlsKChyLW4pL3QpLDApLHU9QXJyYXkoZSksaT0wO2k8ZTtpKyssbis9dCl1W2ldPW47cmV0dXJuIHV9LGguY2h1bms9ZnVuY3Rpb24obixyKXtpZihudWxsPT1yfHxyPDEpcmV0dXJuW107Zm9yKHZhciB0PVtdLGU9MCx1PW4ubGVuZ3RoO2U8dTspdC5wdXNoKGMuY2FsbChuLGUsZSs9cikpO3JldHVybiB0fTt2YXIgTj1mdW5jdGlvbihuLHIsdCxlLHUpe2lmKCEoZSBpbnN0YW5jZW9mIHIpKXJldHVybiBuLmFwcGx5KHQsdSk7dmFyIGk9bShuLnByb3RvdHlwZSksbz1uLmFwcGx5KGksdSk7cmV0dXJuIGguaXNPYmplY3Qobyk/bzppfTtoLmJpbmQ9ZyhmdW5jdGlvbihyLHQsZSl7aWYoIWguaXNGdW5jdGlvbihyKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiQmluZCBtdXN0IGJlIGNhbGxlZCBvbiBhIGZ1bmN0aW9uXCIpO3ZhciB1PWcoZnVuY3Rpb24obil7cmV0dXJuIE4ocix1LHQsdGhpcyxlLmNvbmNhdChuKSl9KTtyZXR1cm4gdX0pLGgucGFydGlhbD1nKGZ1bmN0aW9uKHUsaSl7dmFyIG89aC5wYXJ0aWFsLnBsYWNlaG9sZGVyLGE9ZnVuY3Rpb24oKXtmb3IodmFyIG49MCxyPWkubGVuZ3RoLHQ9QXJyYXkociksZT0wO2U8cjtlKyspdFtlXT1pW2VdPT09bz9hcmd1bWVudHNbbisrXTppW2VdO2Zvcig7bjxhcmd1bWVudHMubGVuZ3RoOyl0LnB1c2goYXJndW1lbnRzW24rK10pO3JldHVybiBOKHUsYSx0aGlzLHRoaXMsdCl9O3JldHVybiBhfSksKGgucGFydGlhbC5wbGFjZWhvbGRlcj1oKS5iaW5kQWxsPWcoZnVuY3Rpb24obixyKXt2YXIgdD0ocj1NKHIsITEsITEpKS5sZW5ndGg7aWYodDwxKXRocm93IG5ldyBFcnJvcihcImJpbmRBbGwgbXVzdCBiZSBwYXNzZWQgZnVuY3Rpb24gbmFtZXNcIik7Zm9yKDt0LS07KXt2YXIgZT1yW3RdO25bZV09aC5iaW5kKG5bZV0sbil9fSksaC5tZW1vaXplPWZ1bmN0aW9uKGUsdSl7dmFyIGk9ZnVuY3Rpb24obil7dmFyIHI9aS5jYWNoZSx0PVwiXCIrKHU/dS5hcHBseSh0aGlzLGFyZ3VtZW50cyk6bik7cmV0dXJuIGoocix0KXx8KHJbdF09ZS5hcHBseSh0aGlzLGFyZ3VtZW50cykpLHJbdF19O3JldHVybiBpLmNhY2hlPXt9LGl9LGguZGVsYXk9ZyhmdW5jdGlvbihuLHIsdCl7cmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtyZXR1cm4gbi5hcHBseShudWxsLHQpfSxyKX0pLGguZGVmZXI9aC5wYXJ0aWFsKGguZGVsYXksaCwxKSxoLnRocm90dGxlPWZ1bmN0aW9uKHQsZSx1KXt2YXIgaSxvLGEsYyxsPTA7dXx8KHU9e30pO3ZhciBmPWZ1bmN0aW9uKCl7bD0hMT09PXUubGVhZGluZz8wOmgubm93KCksaT1udWxsLGM9dC5hcHBseShvLGEpLGl8fChvPWE9bnVsbCl9LG49ZnVuY3Rpb24oKXt2YXIgbj1oLm5vdygpO2x8fCExIT09dS5sZWFkaW5nfHwobD1uKTt2YXIgcj1lLShuLWwpO3JldHVybiBvPXRoaXMsYT1hcmd1bWVudHMscjw9MHx8ZTxyPyhpJiYoY2xlYXJUaW1lb3V0KGkpLGk9bnVsbCksbD1uLGM9dC5hcHBseShvLGEpLGl8fChvPWE9bnVsbCkpOml8fCExPT09dS50cmFpbGluZ3x8KGk9c2V0VGltZW91dChmLHIpKSxjfTtyZXR1cm4gbi5jYW5jZWw9ZnVuY3Rpb24oKXtjbGVhclRpbWVvdXQoaSksbD0wLGk9bz1hPW51bGx9LG59LGguZGVib3VuY2U9ZnVuY3Rpb24odCxlLHUpe3ZhciBpLG8sYT1mdW5jdGlvbihuLHIpe2k9bnVsbCxyJiYobz10LmFwcGx5KG4scikpfSxuPWcoZnVuY3Rpb24obil7aWYoaSYmY2xlYXJUaW1lb3V0KGkpLHUpe3ZhciByPSFpO2k9c2V0VGltZW91dChhLGUpLHImJihvPXQuYXBwbHkodGhpcyxuKSl9ZWxzZSBpPWguZGVsYXkoYSxlLHRoaXMsbik7cmV0dXJuIG99KTtyZXR1cm4gbi5jYW5jZWw9ZnVuY3Rpb24oKXtjbGVhclRpbWVvdXQoaSksaT1udWxsfSxufSxoLndyYXA9ZnVuY3Rpb24obixyKXtyZXR1cm4gaC5wYXJ0aWFsKHIsbil9LGgubmVnYXRlPWZ1bmN0aW9uKG4pe3JldHVybiBmdW5jdGlvbigpe3JldHVybiFuLmFwcGx5KHRoaXMsYXJndW1lbnRzKX19LGguY29tcG9zZT1mdW5jdGlvbigpe3ZhciB0PWFyZ3VtZW50cyxlPXQubGVuZ3RoLTE7cmV0dXJuIGZ1bmN0aW9uKCl7Zm9yKHZhciBuPWUscj10W2VdLmFwcGx5KHRoaXMsYXJndW1lbnRzKTtuLS07KXI9dFtuXS5jYWxsKHRoaXMscik7cmV0dXJuIHJ9fSxoLmFmdGVyPWZ1bmN0aW9uKG4scil7cmV0dXJuIGZ1bmN0aW9uKCl7aWYoLS1uPDEpcmV0dXJuIHIuYXBwbHkodGhpcyxhcmd1bWVudHMpfX0saC5iZWZvcmU9ZnVuY3Rpb24obixyKXt2YXIgdDtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gMDwtLW4mJih0PXIuYXBwbHkodGhpcyxhcmd1bWVudHMpKSxuPD0xJiYocj1udWxsKSx0fX0saC5vbmNlPWgucGFydGlhbChoLmJlZm9yZSwyKSxoLnJlc3RBcmd1bWVudHM9Zzt2YXIgST0he3RvU3RyaW5nOm51bGx9LnByb3BlcnR5SXNFbnVtZXJhYmxlKFwidG9TdHJpbmdcIiksVD1bXCJ2YWx1ZU9mXCIsXCJpc1Byb3RvdHlwZU9mXCIsXCJ0b1N0cmluZ1wiLFwicHJvcGVydHlJc0VudW1lcmFibGVcIixcImhhc093blByb3BlcnR5XCIsXCJ0b0xvY2FsZVN0cmluZ1wiXSxCPWZ1bmN0aW9uKG4scil7dmFyIHQ9VC5sZW5ndGgsZT1uLmNvbnN0cnVjdG9yLHU9aC5pc0Z1bmN0aW9uKGUpJiZlLnByb3RvdHlwZXx8byxpPVwiY29uc3RydWN0b3JcIjtmb3IoaihuLGkpJiYhaC5jb250YWlucyhyLGkpJiZyLnB1c2goaSk7dC0tOykoaT1UW3RdKWluIG4mJm5baV0hPT11W2ldJiYhaC5jb250YWlucyhyLGkpJiZyLnB1c2goaSl9O2gua2V5cz1mdW5jdGlvbihuKXtpZighaC5pc09iamVjdChuKSlyZXR1cm5bXTtpZihhKXJldHVybiBhKG4pO3ZhciByPVtdO2Zvcih2YXIgdCBpbiBuKWoobix0KSYmci5wdXNoKHQpO3JldHVybiBJJiZCKG4scikscn0saC5hbGxLZXlzPWZ1bmN0aW9uKG4pe2lmKCFoLmlzT2JqZWN0KG4pKXJldHVybltdO3ZhciByPVtdO2Zvcih2YXIgdCBpbiBuKXIucHVzaCh0KTtyZXR1cm4gSSYmQihuLHIpLHJ9LGgudmFsdWVzPWZ1bmN0aW9uKG4pe2Zvcih2YXIgcj1oLmtleXMobiksdD1yLmxlbmd0aCxlPUFycmF5KHQpLHU9MDt1PHQ7dSsrKWVbdV09bltyW3VdXTtyZXR1cm4gZX0saC5tYXBPYmplY3Q9ZnVuY3Rpb24obixyLHQpe3I9ZChyLHQpO2Zvcih2YXIgZT1oLmtleXMobiksdT1lLmxlbmd0aCxpPXt9LG89MDtvPHU7bysrKXt2YXIgYT1lW29dO2lbYV09cihuW2FdLGEsbil9cmV0dXJuIGl9LGgucGFpcnM9ZnVuY3Rpb24obil7Zm9yKHZhciByPWgua2V5cyhuKSx0PXIubGVuZ3RoLGU9QXJyYXkodCksdT0wO3U8dDt1KyspZVt1XT1bclt1XSxuW3JbdV1dXTtyZXR1cm4gZX0saC5pbnZlcnQ9ZnVuY3Rpb24obil7Zm9yKHZhciByPXt9LHQ9aC5rZXlzKG4pLGU9MCx1PXQubGVuZ3RoO2U8dTtlKyspcltuW3RbZV1dXT10W2VdO3JldHVybiByfSxoLmZ1bmN0aW9ucz1oLm1ldGhvZHM9ZnVuY3Rpb24obil7dmFyIHI9W107Zm9yKHZhciB0IGluIG4paC5pc0Z1bmN0aW9uKG5bdF0pJiZyLnB1c2godCk7cmV0dXJuIHIuc29ydCgpfTt2YXIgUj1mdW5jdGlvbihjLGwpe3JldHVybiBmdW5jdGlvbihuKXt2YXIgcj1hcmd1bWVudHMubGVuZ3RoO2lmKGwmJihuPU9iamVjdChuKSkscjwyfHxudWxsPT1uKXJldHVybiBuO2Zvcih2YXIgdD0xO3Q8cjt0KyspZm9yKHZhciBlPWFyZ3VtZW50c1t0XSx1PWMoZSksaT11Lmxlbmd0aCxvPTA7bzxpO28rKyl7dmFyIGE9dVtvXTtsJiZ2b2lkIDAhPT1uW2FdfHwoblthXT1lW2FdKX1yZXR1cm4gbn19O2guZXh0ZW5kPVIoaC5hbGxLZXlzKSxoLmV4dGVuZE93bj1oLmFzc2lnbj1SKGgua2V5cyksaC5maW5kS2V5PWZ1bmN0aW9uKG4scix0KXtyPWQocix0KTtmb3IodmFyIGUsdT1oLmtleXMobiksaT0wLG89dS5sZW5ndGg7aTxvO2krKylpZihyKG5bZT11W2ldXSxlLG4pKXJldHVybiBlfTt2YXIgcSxLLHo9ZnVuY3Rpb24obixyLHQpe3JldHVybiByIGluIHR9O2gucGljaz1nKGZ1bmN0aW9uKG4scil7dmFyIHQ9e30sZT1yWzBdO2lmKG51bGw9PW4pcmV0dXJuIHQ7aC5pc0Z1bmN0aW9uKGUpPygxPHIubGVuZ3RoJiYoZT15KGUsclsxXSkpLHI9aC5hbGxLZXlzKG4pKTooZT16LHI9TShyLCExLCExKSxuPU9iamVjdChuKSk7Zm9yKHZhciB1PTAsaT1yLmxlbmd0aDt1PGk7dSsrKXt2YXIgbz1yW3VdLGE9bltvXTtlKGEsbyxuKSYmKHRbb109YSl9cmV0dXJuIHR9KSxoLm9taXQ9ZyhmdW5jdGlvbihuLHQpe3ZhciByLGU9dFswXTtyZXR1cm4gaC5pc0Z1bmN0aW9uKGUpPyhlPWgubmVnYXRlKGUpLDE8dC5sZW5ndGgmJihyPXRbMV0pKToodD1oLm1hcChNKHQsITEsITEpLFN0cmluZyksZT1mdW5jdGlvbihuLHIpe3JldHVybiFoLmNvbnRhaW5zKHQscil9KSxoLnBpY2sobixlLHIpfSksaC5kZWZhdWx0cz1SKGguYWxsS2V5cywhMCksaC5jcmVhdGU9ZnVuY3Rpb24obixyKXt2YXIgdD1tKG4pO3JldHVybiByJiZoLmV4dGVuZE93bih0LHIpLHR9LGguY2xvbmU9ZnVuY3Rpb24obil7cmV0dXJuIGguaXNPYmplY3Qobik/aC5pc0FycmF5KG4pP24uc2xpY2UoKTpoLmV4dGVuZCh7fSxuKTpufSxoLnRhcD1mdW5jdGlvbihuLHIpe3JldHVybiByKG4pLG59LGguaXNNYXRjaD1mdW5jdGlvbihuLHIpe3ZhciB0PWgua2V5cyhyKSxlPXQubGVuZ3RoO2lmKG51bGw9PW4pcmV0dXJuIWU7Zm9yKHZhciB1PU9iamVjdChuKSxpPTA7aTxlO2krKyl7dmFyIG89dFtpXTtpZihyW29dIT09dVtvXXx8IShvIGluIHUpKXJldHVybiExfXJldHVybiEwfSxxPWZ1bmN0aW9uKG4scix0LGUpe2lmKG49PT1yKXJldHVybiAwIT09bnx8MS9uPT0xL3I7aWYobnVsbD09bnx8bnVsbD09cilyZXR1cm4hMTtpZihuIT1uKXJldHVybiByIT1yO3ZhciB1PXR5cGVvZiBuO3JldHVybihcImZ1bmN0aW9uXCI9PT11fHxcIm9iamVjdFwiPT09dXx8XCJvYmplY3RcIj09dHlwZW9mIHIpJiZLKG4scix0LGUpfSxLPWZ1bmN0aW9uKG4scix0LGUpe24gaW5zdGFuY2VvZiBoJiYobj1uLl93cmFwcGVkKSxyIGluc3RhbmNlb2YgaCYmKHI9ci5fd3JhcHBlZCk7dmFyIHU9cC5jYWxsKG4pO2lmKHUhPT1wLmNhbGwocikpcmV0dXJuITE7c3dpdGNoKHUpe2Nhc2VcIltvYmplY3QgUmVnRXhwXVwiOmNhc2VcIltvYmplY3QgU3RyaW5nXVwiOnJldHVyblwiXCIrbj09XCJcIityO2Nhc2VcIltvYmplY3QgTnVtYmVyXVwiOnJldHVybituIT0rbj8rciE9K3I6MD09K24/MS8rbj09MS9yOituPT0rcjtjYXNlXCJbb2JqZWN0IERhdGVdXCI6Y2FzZVwiW29iamVjdCBCb29sZWFuXVwiOnJldHVybituPT0rcjtjYXNlXCJbb2JqZWN0IFN5bWJvbF1cIjpyZXR1cm4gcy52YWx1ZU9mLmNhbGwobik9PT1zLnZhbHVlT2YuY2FsbChyKX12YXIgaT1cIltvYmplY3QgQXJyYXldXCI9PT11O2lmKCFpKXtpZihcIm9iamVjdFwiIT10eXBlb2Ygbnx8XCJvYmplY3RcIiE9dHlwZW9mIHIpcmV0dXJuITE7dmFyIG89bi5jb25zdHJ1Y3RvcixhPXIuY29uc3RydWN0b3I7aWYobyE9PWEmJiEoaC5pc0Z1bmN0aW9uKG8pJiZvIGluc3RhbmNlb2YgbyYmaC5pc0Z1bmN0aW9uKGEpJiZhIGluc3RhbmNlb2YgYSkmJlwiY29uc3RydWN0b3JcImluIG4mJlwiY29uc3RydWN0b3JcImluIHIpcmV0dXJuITF9ZT1lfHxbXTtmb3IodmFyIGM9KHQ9dHx8W10pLmxlbmd0aDtjLS07KWlmKHRbY109PT1uKXJldHVybiBlW2NdPT09cjtpZih0LnB1c2gobiksZS5wdXNoKHIpLGkpe2lmKChjPW4ubGVuZ3RoKSE9PXIubGVuZ3RoKXJldHVybiExO2Zvcig7Yy0tOylpZighcShuW2NdLHJbY10sdCxlKSlyZXR1cm4hMX1lbHNle3ZhciBsLGY9aC5rZXlzKG4pO2lmKGM9Zi5sZW5ndGgsaC5rZXlzKHIpLmxlbmd0aCE9PWMpcmV0dXJuITE7Zm9yKDtjLS07KWlmKGw9ZltjXSwhaihyLGwpfHwhcShuW2xdLHJbbF0sdCxlKSlyZXR1cm4hMX1yZXR1cm4gdC5wb3AoKSxlLnBvcCgpLCEwfSxoLmlzRXF1YWw9ZnVuY3Rpb24obixyKXtyZXR1cm4gcShuLHIpfSxoLmlzRW1wdHk9ZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PW58fCh3KG4pJiYoaC5pc0FycmF5KG4pfHxoLmlzU3RyaW5nKG4pfHxoLmlzQXJndW1lbnRzKG4pKT8wPT09bi5sZW5ndGg6MD09PWgua2V5cyhuKS5sZW5ndGgpfSxoLmlzRWxlbWVudD1mdW5jdGlvbihuKXtyZXR1cm4hKCFufHwxIT09bi5ub2RlVHlwZSl9LGguaXNBcnJheT10fHxmdW5jdGlvbihuKXtyZXR1cm5cIltvYmplY3QgQXJyYXldXCI9PT1wLmNhbGwobil9LGguaXNPYmplY3Q9ZnVuY3Rpb24obil7dmFyIHI9dHlwZW9mIG47cmV0dXJuXCJmdW5jdGlvblwiPT09cnx8XCJvYmplY3RcIj09PXImJiEhbn0saC5lYWNoKFtcIkFyZ3VtZW50c1wiLFwiRnVuY3Rpb25cIixcIlN0cmluZ1wiLFwiTnVtYmVyXCIsXCJEYXRlXCIsXCJSZWdFeHBcIixcIkVycm9yXCIsXCJTeW1ib2xcIixcIk1hcFwiLFwiV2Vha01hcFwiLFwiU2V0XCIsXCJXZWFrU2V0XCJdLGZ1bmN0aW9uKHIpe2hbXCJpc1wiK3JdPWZ1bmN0aW9uKG4pe3JldHVybiBwLmNhbGwobik9PT1cIltvYmplY3QgXCIrcitcIl1cIn19KSxoLmlzQXJndW1lbnRzKGFyZ3VtZW50cyl8fChoLmlzQXJndW1lbnRzPWZ1bmN0aW9uKG4pe3JldHVybiBqKG4sXCJjYWxsZWVcIil9KTt2YXIgRD1uLmRvY3VtZW50JiZuLmRvY3VtZW50LmNoaWxkTm9kZXM7XCJmdW5jdGlvblwiIT10eXBlb2YvLi8mJlwib2JqZWN0XCIhPXR5cGVvZiBJbnQ4QXJyYXkmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIEQmJihoLmlzRnVuY3Rpb249ZnVuY3Rpb24obil7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2Ygbnx8ITF9KSxoLmlzRmluaXRlPWZ1bmN0aW9uKG4pe3JldHVybiFoLmlzU3ltYm9sKG4pJiZpc0Zpbml0ZShuKSYmIWlzTmFOKHBhcnNlRmxvYXQobikpfSxoLmlzTmFOPWZ1bmN0aW9uKG4pe3JldHVybiBoLmlzTnVtYmVyKG4pJiZpc05hTihuKX0saC5pc0Jvb2xlYW49ZnVuY3Rpb24obil7cmV0dXJuITA9PT1ufHwhMT09PW58fFwiW29iamVjdCBCb29sZWFuXVwiPT09cC5jYWxsKG4pfSxoLmlzTnVsbD1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09PW59LGguaXNVbmRlZmluZWQ9ZnVuY3Rpb24obil7cmV0dXJuIHZvaWQgMD09PW59LGguaGFzPWZ1bmN0aW9uKG4scil7aWYoIWguaXNBcnJheShyKSlyZXR1cm4gaihuLHIpO2Zvcih2YXIgdD1yLmxlbmd0aCxlPTA7ZTx0O2UrKyl7dmFyIHU9cltlXTtpZihudWxsPT1ufHwhaS5jYWxsKG4sdSkpcmV0dXJuITE7bj1uW3VdfXJldHVybiEhdH0saC5ub0NvbmZsaWN0PWZ1bmN0aW9uKCl7cmV0dXJuIG4uXz1yLHRoaXN9LGguaWRlbnRpdHk9ZnVuY3Rpb24obil7cmV0dXJuIG59LGguY29uc3RhbnQ9ZnVuY3Rpb24obil7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIG59fSxoLm5vb3A9ZnVuY3Rpb24oKXt9LGgucHJvcGVydHk9ZnVuY3Rpb24ocil7cmV0dXJuIGguaXNBcnJheShyKT9mdW5jdGlvbihuKXtyZXR1cm4geChuLHIpfTpiKHIpfSxoLnByb3BlcnR5T2Y9ZnVuY3Rpb24ocil7cmV0dXJuIG51bGw9PXI/ZnVuY3Rpb24oKXt9OmZ1bmN0aW9uKG4pe3JldHVybiBoLmlzQXJyYXkobik/eChyLG4pOnJbbl19fSxoLm1hdGNoZXI9aC5tYXRjaGVzPWZ1bmN0aW9uKHIpe3JldHVybiByPWguZXh0ZW5kT3duKHt9LHIpLGZ1bmN0aW9uKG4pe3JldHVybiBoLmlzTWF0Y2gobixyKX19LGgudGltZXM9ZnVuY3Rpb24obixyLHQpe3ZhciBlPUFycmF5KE1hdGgubWF4KDAsbikpO3I9eShyLHQsMSk7Zm9yKHZhciB1PTA7dTxuO3UrKyllW3VdPXIodSk7cmV0dXJuIGV9LGgucmFuZG9tPWZ1bmN0aW9uKG4scil7cmV0dXJuIG51bGw9PXImJihyPW4sbj0wKSxuK01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSooci1uKzEpKX0saC5ub3c9RGF0ZS5ub3d8fGZ1bmN0aW9uKCl7cmV0dXJuKG5ldyBEYXRlKS5nZXRUaW1lKCl9O3ZhciBMPXtcIiZcIjpcIiZhbXA7XCIsXCI8XCI6XCImbHQ7XCIsXCI+XCI6XCImZ3Q7XCIsJ1wiJzpcIiZxdW90O1wiLFwiJ1wiOlwiJiN4Mjc7XCIsXCJgXCI6XCImI3g2MDtcIn0sUD1oLmludmVydChMKSxXPWZ1bmN0aW9uKHIpe3ZhciB0PWZ1bmN0aW9uKG4pe3JldHVybiByW25dfSxuPVwiKD86XCIraC5rZXlzKHIpLmpvaW4oXCJ8XCIpK1wiKVwiLGU9UmVnRXhwKG4pLHU9UmVnRXhwKG4sXCJnXCIpO3JldHVybiBmdW5jdGlvbihuKXtyZXR1cm4gbj1udWxsPT1uP1wiXCI6XCJcIituLGUudGVzdChuKT9uLnJlcGxhY2UodSx0KTpufX07aC5lc2NhcGU9VyhMKSxoLnVuZXNjYXBlPVcoUCksaC5yZXN1bHQ9ZnVuY3Rpb24obixyLHQpe2guaXNBcnJheShyKXx8KHI9W3JdKTt2YXIgZT1yLmxlbmd0aDtpZighZSlyZXR1cm4gaC5pc0Z1bmN0aW9uKHQpP3QuY2FsbChuKTp0O2Zvcih2YXIgdT0wO3U8ZTt1Kyspe3ZhciBpPW51bGw9PW4/dm9pZCAwOm5bclt1XV07dm9pZCAwPT09aSYmKGk9dCx1PWUpLG49aC5pc0Z1bmN0aW9uKGkpP2kuY2FsbChuKTppfXJldHVybiBufTt2YXIgQz0wO2gudW5pcXVlSWQ9ZnVuY3Rpb24obil7dmFyIHI9KytDK1wiXCI7cmV0dXJuIG4/bityOnJ9LGgudGVtcGxhdGVTZXR0aW5ncz17ZXZhbHVhdGU6LzwlKFtcXHNcXFNdKz8pJT4vZyxpbnRlcnBvbGF0ZTovPCU9KFtcXHNcXFNdKz8pJT4vZyxlc2NhcGU6LzwlLShbXFxzXFxTXSs/KSU+L2d9O3ZhciBKPS8oLileLyxVPXtcIidcIjpcIidcIixcIlxcXFxcIjpcIlxcXFxcIixcIlxcclwiOlwiclwiLFwiXFxuXCI6XCJuXCIsXCJcXHUyMDI4XCI6XCJ1MjAyOFwiLFwiXFx1MjAyOVwiOlwidTIwMjlcIn0sVj0vXFxcXHwnfFxccnxcXG58XFx1MjAyOHxcXHUyMDI5L2csJD1mdW5jdGlvbihuKXtyZXR1cm5cIlxcXFxcIitVW25dfTtoLnRlbXBsYXRlPWZ1bmN0aW9uKGksbixyKXshbiYmciYmKG49ciksbj1oLmRlZmF1bHRzKHt9LG4saC50ZW1wbGF0ZVNldHRpbmdzKTt2YXIgdCxlPVJlZ0V4cChbKG4uZXNjYXBlfHxKKS5zb3VyY2UsKG4uaW50ZXJwb2xhdGV8fEopLnNvdXJjZSwobi5ldmFsdWF0ZXx8Sikuc291cmNlXS5qb2luKFwifFwiKStcInwkXCIsXCJnXCIpLG89MCxhPVwiX19wKz0nXCI7aS5yZXBsYWNlKGUsZnVuY3Rpb24obixyLHQsZSx1KXtyZXR1cm4gYSs9aS5zbGljZShvLHUpLnJlcGxhY2UoViwkKSxvPXUrbi5sZW5ndGgscj9hKz1cIicrXFxuKChfX3Q9KFwiK3IrXCIpKT09bnVsbD8nJzpfLmVzY2FwZShfX3QpKStcXG4nXCI6dD9hKz1cIicrXFxuKChfX3Q9KFwiK3QrXCIpKT09bnVsbD8nJzpfX3QpK1xcbidcIjplJiYoYSs9XCInO1xcblwiK2UrXCJcXG5fX3ArPSdcIiksbn0pLGErPVwiJztcXG5cIixuLnZhcmlhYmxlfHwoYT1cIndpdGgob2JqfHx7fSl7XFxuXCIrYStcIn1cXG5cIiksYT1cInZhciBfX3QsX19wPScnLF9faj1BcnJheS5wcm90b3R5cGUuam9pbixcIitcInByaW50PWZ1bmN0aW9uKCl7X19wKz1fX2ouY2FsbChhcmd1bWVudHMsJycpO307XFxuXCIrYStcInJldHVybiBfX3A7XFxuXCI7dHJ5e3Q9bmV3IEZ1bmN0aW9uKG4udmFyaWFibGV8fFwib2JqXCIsXCJfXCIsYSl9Y2F0Y2gobil7dGhyb3cgbi5zb3VyY2U9YSxufXZhciB1PWZ1bmN0aW9uKG4pe3JldHVybiB0LmNhbGwodGhpcyxuLGgpfSxjPW4udmFyaWFibGV8fFwib2JqXCI7cmV0dXJuIHUuc291cmNlPVwiZnVuY3Rpb24oXCIrYytcIil7XFxuXCIrYStcIn1cIix1fSxoLmNoYWluPWZ1bmN0aW9uKG4pe3ZhciByPWgobik7cmV0dXJuIHIuX2NoYWluPSEwLHJ9O3ZhciBHPWZ1bmN0aW9uKG4scil7cmV0dXJuIG4uX2NoYWluP2gocikuY2hhaW4oKTpyfTtoLm1peGluPWZ1bmN0aW9uKHQpe3JldHVybiBoLmVhY2goaC5mdW5jdGlvbnModCksZnVuY3Rpb24obil7dmFyIHI9aFtuXT10W25dO2gucHJvdG90eXBlW25dPWZ1bmN0aW9uKCl7dmFyIG49W3RoaXMuX3dyYXBwZWRdO3JldHVybiB1LmFwcGx5KG4sYXJndW1lbnRzKSxHKHRoaXMsci5hcHBseShoLG4pKX19KSxofSxoLm1peGluKGgpLGguZWFjaChbXCJwb3BcIixcInB1c2hcIixcInJldmVyc2VcIixcInNoaWZ0XCIsXCJzb3J0XCIsXCJzcGxpY2VcIixcInVuc2hpZnRcIl0sZnVuY3Rpb24ocil7dmFyIHQ9ZVtyXTtoLnByb3RvdHlwZVtyXT1mdW5jdGlvbigpe3ZhciBuPXRoaXMuX3dyYXBwZWQ7cmV0dXJuIHQuYXBwbHkobixhcmd1bWVudHMpLFwic2hpZnRcIiE9PXImJlwic3BsaWNlXCIhPT1yfHwwIT09bi5sZW5ndGh8fGRlbGV0ZSBuWzBdLEcodGhpcyxuKX19KSxoLmVhY2goW1wiY29uY2F0XCIsXCJqb2luXCIsXCJzbGljZVwiXSxmdW5jdGlvbihuKXt2YXIgcj1lW25dO2gucHJvdG90eXBlW25dPWZ1bmN0aW9uKCl7cmV0dXJuIEcodGhpcyxyLmFwcGx5KHRoaXMuX3dyYXBwZWQsYXJndW1lbnRzKSl9fSksaC5wcm90b3R5cGUudmFsdWU9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fd3JhcHBlZH0saC5wcm90b3R5cGUudmFsdWVPZj1oLnByb3RvdHlwZS50b0pTT049aC5wcm90b3R5cGUudmFsdWUsaC5wcm90b3R5cGUudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gU3RyaW5nKHRoaXMuX3dyYXBwZWQpfSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQmJmRlZmluZShcInVuZGVyc2NvcmVcIixbXSxmdW5jdGlvbigpe3JldHVybiBofSl9KCk7XG4iLCJpbXBvcnQge2V4dHJhY3RFeHRlbnNpb259IGZyb20gXCJ1dGlscy9zdHJpbmdzXCI7XG5cbmV4cG9ydCBjb25zdCBpc1J0bXAgPSBmdW5jdGlvbiAoZmlsZSwgdHlwZSkge1xuICAgIGlmKGZpbGUpe1xuICAgICAgICByZXR1cm4gKGZpbGUuaW5kZXhPZigncnRtcDonKSA9PSAwIHx8IHR5cGUgPT0gJ3J0bXAnKTtcbiAgICB9XG59O1xuZXhwb3J0IGNvbnN0IGlzV2ViUlRDID0gZnVuY3Rpb24gKGZpbGUsIHR5cGUpIHtcbiAgICBpZihmaWxlKXtcbiAgICAgICAgcmV0dXJuIChmaWxlLmluZGV4T2YoJ3dzOicpID09PSAwIHx8IGZpbGUuaW5kZXhPZignd3NzOicpID09PSAwIHx8IHR5cGUgPT09ICd3ZWJydGMnKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcbmV4cG9ydCBjb25zdCBpc0hscyA9IGZ1bmN0aW9uIChmaWxlLCB0eXBlKSB7XG4gICAgaWYoZmlsZSl7XG4gICAgICAgIHJldHVybiAoIHR5cGUgPT09ICdobHMnIHx8ICB0eXBlID09PSAnbTN1OCcgfHwgdHlwZSA9PT0gJ2FwcGxpY2F0aW9uL3ZuZC5hcHBsZS5tcGVndXJsJyB8fCBleHRyYWN0RXh0ZW5zaW9uKGZpbGUpID09ICdtM3U4Jyk7XG5cbiAgICB9XG59O1xuZXhwb3J0IGNvbnN0IGlzRGFzaCA9IGZ1bmN0aW9uIChmaWxlLCB0eXBlKSB7XG4gICAgaWYoZmlsZSl7XG4gICAgICAgIHJldHVybiAoIHR5cGUgPT09ICdtcGQnIHx8ICB0eXBlID09PSAnZGFzaCcgfHwgdHlwZSA9PT0gJ2FwcGxpY2F0aW9uL2Rhc2greG1sJyB8fCBleHRyYWN0RXh0ZW5zaW9uKGZpbGUpID09ICdtcGQnKTtcblxuICAgIH1cbn07XG4iLCIvKipcbiAqIHV0aWxzIGZvciB3ZWJwYWNrXG4gKi9cblxuZXhwb3J0IGNvbnN0IGdldFNjcmlwdFBhdGggPSBmdW5jdGlvbihzY3JpcHROYW1lKSB7XG4gICAgY29uc3Qgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNjcmlwdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3JjID0gc2NyaXB0c1tpXS5zcmM7XG4gICAgICAgIGlmIChzcmMpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gc3JjLmxhc3RJbmRleE9mKCcvJyArIHNjcmlwdE5hbWUpO1xuICAgICAgICAgICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3JjLnN1YnN0cigwLCBpbmRleCArIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAnJztcbn07XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiAyOS4uXG4gKi9cbmV4cG9ydCBjb25zdCB2ZXJzaW9uID0gX19WRVJTSU9OX187XG4iXSwic291cmNlUm9vdCI6IiJ9