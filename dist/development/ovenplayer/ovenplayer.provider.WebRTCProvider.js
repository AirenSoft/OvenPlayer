/*! OvenPlayerv0.9.0 | (c)2020 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ovenplayer.provider.WebRTCProvider"],{

/***/ "./src/js/api/provider/html5/providers/WebRTC.js":
/*!*******************************************************!*\
  !*** ./src/js/api/provider/html5/providers/WebRTC.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Provider = __webpack_require__(/*! api/provider/html5/Provider */ "./src/js/api/provider/html5/Provider.js");

var _Provider2 = _interopRequireDefault(_Provider);

var _WebRTCLoader = __webpack_require__(/*! api/provider/html5/providers/WebRTCLoader */ "./src/js/api/provider/html5/providers/WebRTCLoader.js");

var _WebRTCLoader2 = _interopRequireDefault(_WebRTCLoader);

var _validator = __webpack_require__(/*! utils/validator */ "./src/js/utils/validator.js");

var _utils = __webpack_require__(/*! api/provider/utils */ "./src/js/api/provider/utils.js");

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   webrtc provider extended core.
 * @param   container player element.
 * @param   playerConfig    config.
 * */

var WebRTC = function WebRTC(element, playerConfig, adTagUrl) {
    var that = {};
    var webrtcLoader = null;
    var superDestroy_func = null;

    var spec = {
        name: _constants.PROVIDER_WEBRTC,
        element: element,
        mse: null,
        listener: null,
        isLoaded: false,
        canSeek: false,
        isLive: false,
        seeking: false,
        state: _constants.STATE_IDLE,
        buffer: 0,
        framerate: 0,
        currentQuality: -1,
        currentSource: -1,
        qualityLevels: [],
        sources: [],
        adTagUrl: adTagUrl
    };

    that = (0, _Provider2["default"])(spec, playerConfig, function (source) {
        if ((0, _validator.isWebRTC)(source.file, source.type)) {
            OvenPlayerConsole.log("WEBRTC : onBeforeLoad : ", source);
            if (webrtcLoader) {
                webrtcLoader.destroy();
                webrtcLoader = null;
            }

            var loadCallback = function loadCallback(stream) {

                if (element.srcObject) {
                    element.srcObject = null;
                }

                element.srcObject = stream;
            };

            webrtcLoader = (0, _WebRTCLoader2["default"])(that, source.file, loadCallback, _utils.errorTrigger, playerConfig);

            webrtcLoader.connect(function () {
                //ToDo : resolve not wokring
            })["catch"](function (error) {
                //that.destroy();
                //Do nothing
            });

            that.on(_constants.CONTENT_META, function () {
                if (playerConfig.isAutoStart()) {
                    if (that.getState() !== 'error') {
                        that.play();
                    }
                }
            }, that);
        }
    });
    superDestroy_func = that["super"]('destroy');

    OvenPlayerConsole.log("WEBRTC PROVIDER LOADED.");

    that.destroy = function () {
        if (webrtcLoader) {
            webrtcLoader.destroy();
            element.srcObject = null;
            webrtcLoader = null;
        }
        that.off(_constants.CONTENT_META, null, that);
        OvenPlayerConsole.log("WEBRTC :  PROVIDER DESTROYED.");

        superDestroy_func();
    };
    return that;
}; /**
    * Created by hoho on 2018. 6. 11..
    */
exports["default"] = WebRTC;

/***/ }),

/***/ "./src/js/api/provider/html5/providers/WebRTCLoader.js":
/*!*************************************************************!*\
  !*** ./src/js/api/provider/html5/providers/WebRTCLoader.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _adapter = __webpack_require__(/*! utils/adapter */ "./src/js/utils/adapter.js");

var _adapter2 = _interopRequireDefault(_adapter);

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

var _browser = __webpack_require__(/*! utils/browser */ "./src/js/utils/browser.js");

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var WebRTCLoader = function WebRTCLoader(provider, webSocketUrl, loadCallback, errorTrigger, playerConfig) {

    var peerConnectionConfig = {
        'iceServers': [{
            'urls': 'stun:stun.l.google.com:19302'
        }]
    };

    if (playerConfig.getConfig().webrtcConfig) {

        if (playerConfig.getConfig().webrtcConfig.iceServers) {

            peerConnectionConfig.iceServers = playerConfig.getConfig().webrtcConfig.iceServers;
        }

        if (playerConfig.getConfig().webrtcConfig.iceTransportPolicy) {

            peerConnectionConfig.iceTransportPolicy = playerConfig.getConfig().webrtcConfig.iceTransportPolicy;
        }
    }

    var that = {};

    var ws = null;

    var wsPing = null;

    var mainStream = null;

    // used for getting media stream from OME or host peer
    var mainPeerConnectionInfo = null;

    // used for send media stream to client peer.
    var clientPeerConnections = {};

    //closed websocket by ome or client.
    var wsClosedByPlayer = false;

    var statisticsTimer = null;

    var currentBrowser = (0, _browser.analUserAgent)();

    (function () {
        var existingHandler = window.onbeforeunload;
        window.onbeforeunload = function (event) {
            if (existingHandler) {
                existingHandler(event);
            }
            OvenPlayerConsole.log("This calls auto when browser closed.");
            closePeer();
        };
    })();

    function getPeerConnectionById(id) {

        var peerConnection = null;

        if (mainPeerConnectionInfo && id === mainPeerConnectionInfo.id) {
            peerConnection = mainPeerConnectionInfo.peerConnection;
        } else if (clientPeerConnections[id]) {
            peerConnection = clientPeerConnections[id].peerConnection;
        }

        return peerConnection;
    }

    function extractLossPacketsOnNetworkStatus(peerConnectionInfo) {

        if (peerConnectionInfo.statisticsTimer) {
            clearTimeout(peerConnectionInfo.statisticsTimer);
        }

        if (!peerConnectionInfo.status) {
            peerConnectionInfo.status = {};
            peerConnectionInfo.status.lostPacketsArr = [];
            peerConnectionInfo.status.slotLength = 8; //8 statistics. every 2 seconds
            peerConnectionInfo.status.prevPacketsLost = 0;
            peerConnectionInfo.status.avg8Losses = 0;
            peerConnectionInfo.status.avgMoreThanThresholdCount = 0; //If avg8Loss more than threshold.
            peerConnectionInfo.status.threshold = 40;
        }

        var lostPacketsArr = peerConnectionInfo.status.lostPacketsArr,
            slotLength = peerConnectionInfo.status.slotLength,
            //8 statistics. every 2 seconds
        prevPacketsLost = peerConnectionInfo.status.prevPacketsLost,
            avg8Losses = peerConnectionInfo.status.avg8Losses,

        // avgMoreThanThresholdCount = peerConnectionInfo.status.avgMoreThanThresholdCount,  //If avg8Loss more than threshold.
        threshold = peerConnectionInfo.status.threshold;

        peerConnectionInfo.statisticsTimer = setTimeout(function () {
            if (!peerConnectionInfo.peerConnection) {
                return false;
            }

            peerConnectionInfo.peerConnection.getStats().then(function (stats) {

                if (!stats) {
                    return;
                }

                if (playerConfig.getConfig().autoFallback && stats) {

                    stats.forEach(function (state) {

                        if (state.type === "inbound-rtp" && state.kind === 'video' && !state.isRemote) {

                            //(state.packetsLost - prevPacketsLost) is real current lost.

                            var actualPacketLost = parseInt(state.packetsLost) - parseInt(prevPacketsLost);

                            lostPacketsArr.push(parseInt(state.packetsLost) - parseInt(prevPacketsLost));

                            if (lostPacketsArr.length > slotLength) {

                                lostPacketsArr.shift();
                            }

                            if (lostPacketsArr.length === slotLength) {

                                avg8Losses = _underscore2["default"].reduce(lostPacketsArr, function (memo, num) {
                                    return memo + num;
                                }, 0) / slotLength;
                                OvenPlayerConsole.log("Last8 LOST PACKET AVG  : " + avg8Losses, "Current Packet LOST: " + actualPacketLost, "Total Packet Lost: " + state.packetsLost, lostPacketsArr);

                                if (avg8Losses > threshold) {
                                    peerConnectionInfo.status.avgMoreThanThresholdCount = peerConnectionInfo.status.avgMoreThanThresholdCount + 1;
                                    if (peerConnectionInfo.status.avgMoreThanThresholdCount >= 60) {
                                        OvenPlayerConsole.log("NETWORK UNSTABLED!!! ");
                                        var tempError = _constants.ERRORS.codes[_constants.PLAYER_WEBRTC_NETWORK_SLOW];
                                        closePeer(tempError);
                                    }
                                } else {
                                    peerConnectionInfo.status.avgMoreThanThresholdCount = 0;
                                }
                            }
                            peerConnectionInfo.status.prevPacketsLost = state.packetsLost;
                        }
                    });

                    extractLossPacketsOnNetworkStatus(peerConnectionInfo);
                }
            });
        }, 2000);
    }

    function createMainPeerConnection(id, peerId, sdp, candidates, resolve) {

        var peerConnection = new RTCPeerConnection(peerConnectionConfig);
        mainPeerConnectionInfo = {
            id: id,
            peerId: peerId,
            peerConnection: peerConnection
        };

        //Set remote description when I received sdp from server.
        peerConnection.setRemoteDescription(new RTCSessionDescription(sdp)).then(function () {

            peerConnection.createAnswer().then(function (desc) {

                OvenPlayerConsole.log("create Host Answer : success");

                peerConnection.setLocalDescription(desc).then(function () {
                    // my SDP created.
                    var localSDP = peerConnection.localDescription;
                    OvenPlayerConsole.log('Local SDP', localSDP);

                    sendMessage(ws, {
                        id: id,
                        peer_id: peerId,
                        command: 'answer',
                        sdp: localSDP
                    });
                })["catch"](function (error) {

                    var tempError = _constants.ERRORS.codes[_constants.PLAYER_WEBRTC_SET_LOCAL_DESC_ERROR];
                    tempError.error = error;
                    closePeer(tempError);
                });
            })["catch"](function (error) {
                var tempError = _constants.ERRORS.codes[_constants.PLAYER_WEBRTC_CREATE_ANSWER_ERROR];
                tempError.error = error;
                closePeer(tempError);
            });
        })["catch"](function (error) {
            var tempError = _constants.ERRORS.codes[_constants.PLAYER_WEBRTC_SET_REMOTE_DESC_ERROR];
            tempError.error = error;
            closePeer(tempError);
        });

        if (candidates) {
            // console.log("[Message candidates]", candidates);
            addIceCandidate(peerConnection, candidates);
        }

        peerConnection.onicecandidate = function (e) {
            if (e.candidate) {

                OvenPlayerConsole.log("WebRTCLoader send candidate to server : " + e.candidate);

                // console.log('Main Peer Connection candidate', e.candidate);

                sendMessage(ws, {
                    id: id,
                    peer_id: peerId,
                    command: "candidate",
                    candidates: [e.candidate]
                });
            }
        };
        peerConnection.onconnectionstatechange = function (e) {
            //iceConnectionState
            OvenPlayerConsole.log("[on connection state change]", peerConnection.connectionState, e);
        };
        peerConnection.oniceconnectionstatechange = function (e) {
            OvenPlayerConsole.log("[on ice connection state change]", peerConnection.iceConnectionState, e);

            /*
            * https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/iceConnectionState
            * Checks to ensure that components are still connected failed for at least one component of the RTCPeerConnection. This is a less stringent test than "failed" and may trigger intermittently and resolve just as spontaneously on less reliable networks, or during temporary disconnections. When the problem resolves, the connection may return to the "connected" state.
            * */
            //This process is my imagination. I do not know how to reproduce.
            //Situation : OME is dead but ome can't send 'stop' message.
            if (peerConnection.iceConnectionState === 'disconnected' || peerConnection.iceConnectionState === 'closed') {
                if (!wsClosedByPlayer) {
                    if (mainPeerConnectionInfo) {
                        var tempError = _constants.ERRORS.codes[_constants.PLAYER_WEBRTC_UNEXPECTED_DISCONNECT];
                        closePeer(tempError);
                    }
                }
            }
        };
        peerConnection.ontrack = function (e) {

            OvenPlayerConsole.log("stream received.");

            extractLossPacketsOnNetworkStatus(mainPeerConnectionInfo);
            mainStream = e.streams[0];
            loadCallback(e.streams[0]);
        };
    }

    function createClientPeerConnection(hostId, clientId) {

        if (!mainStream) {

            setTimeout(function () {

                createClientPeerConnection(hostId, clientId);
            }, 100);

            return;
        }

        var peerConnection = new RTCPeerConnection(peerConnectionConfig);

        clientPeerConnections[clientId] = {
            id: clientId,
            peerId: hostId,
            peerConnection: peerConnection
        };

        peerConnection.addStream(mainStream);

        // let offerOption = {
        //     offerToReceiveAudio: 1,
        //     offerToReceiveVideo: 1
        // };

        peerConnection.createOffer(setLocalAndSendMessage, handleCreateOfferError, {});

        function setLocalAndSendMessage(sessionDescription) {
            peerConnection.setLocalDescription(sessionDescription);

            sendMessage(ws, {
                id: hostId,
                peer_id: clientId,
                sdp: sessionDescription,
                command: 'offer_p2p'
            });
        }

        function handleCreateOfferError(event) {}

        peerConnection.onicecandidate = function (e) {
            if (e.candidate) {
                OvenPlayerConsole.log("WebRTCLoader send candidate to server : " + e.candidate);

                // console.log('Client Peer Connection candidate', e.candidate);

                sendMessage(ws, {
                    id: hostId,
                    peer_id: clientId,
                    command: "candidate_p2p",
                    candidates: [e.candidate]
                });
            }
        };
    }

    var copyCandidate = function copyCandidate(basicCandidate) {

        var cloneCandidate = _underscore2["default"].clone(basicCandidate);

        function generateDomainFromUrl(url) {
            var result = '';
            var match = void 0;
            if (match = url.match(/^(?:wss?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im)) {
                result = match[1];
            }
            return result;
        }

        function findIp(candidate) {

            var result = '';
            var match = void 0;

            if (match = candidate.match(new RegExp("\\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b", 'gi'))) {
                result = match[0];
            }

            return result;
        }

        var newDomain = generateDomainFromUrl(webSocketUrl);
        var ip = findIp(cloneCandidate.candidate);

        if (ip === '' || ip === newDomain) {

            return null;
        }

        return new Promise(function (resolve, reject) {

            // firefox browser throws a candidate parsing exception when a domain name is set at the address property. So we resolve the dns using google dns resolve api.
            if (currentBrowser.browser === 'Firefox' && !findIp(newDomain)) {

                fetch('https://dns.google.com/resolve?name=' + newDomain).then(function (resp) {
                    return resp.json();
                }).then(function (data) {

                    if (data && data.Answer && data.Answer.length > 0) {

                        if (data.Answer[0].data) {

                            var relsolvedIp = data.Answer[0].data;

                            cloneCandidate.candidate = cloneCandidate.candidate.replace(ip, relsolvedIp);
                            resolve(cloneCandidate);
                        } else {

                            return null;
                        }
                    } else {

                        return null;
                    }
                });
            } else {

                cloneCandidate.candidate = cloneCandidate.candidate.replace(ip, newDomain);
                resolve(cloneCandidate);
            }
        });
    };

    function addIceCandidate(peerConnection, candidates) {

        for (var i = 0; i < candidates.length; i++) {
            if (candidates[i] && candidates[i].candidate) {

                var basicCandidate = candidates[i];

                var cloneCandidatePromise = copyCandidate(basicCandidate);

                peerConnection.addIceCandidate(new RTCIceCandidate(basicCandidate)).then(function () {
                    OvenPlayerConsole.log("addIceCandidate : success");
                })["catch"](function (error) {
                    var tempError = _constants.ERRORS.codes[_constants.PLAYER_WEBRTC_ADD_ICECANDIDATE_ERROR];
                    tempError.error = error;
                    closePeer(tempError);
                });

                if (cloneCandidatePromise) {
                    cloneCandidatePromise.then(function (cloneCandidate) {

                        if (cloneCandidate) {

                            peerConnection.addIceCandidate(new RTCIceCandidate(cloneCandidate)).then(function () {
                                OvenPlayerConsole.log("cloned addIceCandidate : success");
                            })["catch"](function (error) {

                                var tempError = _constants.ERRORS.codes[_constants.PLAYER_WEBRTC_ADD_ICECANDIDATE_ERROR];
                                tempError.error = error;
                                closePeer(tempError);
                            });
                        }
                    });
                }
            }
        }
    }

    function initWebSocket(resolve, reject) {

        try {

            ws = new WebSocket(webSocketUrl);

            ws.onopen = function () {

                sendMessage(ws, {
                    command: "request_offer"
                });

                // wsPing = setInterval(function () {
                //
                //     sendMessage(ws, {command: "ping"});
                //
                // }, 20 * 1000);
            };

            ws.onmessage = function (e) {

                var message = JSON.parse(e.data);

                if (message.error) {
                    var tempError = _constants.ERRORS.codes[_constants.PLAYER_WEBRTC_WS_ERROR];
                    tempError.error = message.error;
                    closePeer(tempError);
                    return;
                }

                if (Object.keys(message).length === 0 && message.constructor === Object) {

                    OvenPlayerConsole.log('Empty Message');
                    return;
                }

                if (message.command === 'ping') {

                    sendMessage(ws, { command: 'pong' });
                    return;
                }

                if (!message.id) {

                    OvenPlayerConsole.log('ID must be not null');
                    return;
                }

                if (message.command === 'offer') {

                    createMainPeerConnection(message.id, message.peer_id, message.sdp, message.candidates, resolve);
                    if (message.peer_id === 0) {
                        provider.trigger(_constants.OME_P2P_MODE, false);
                    } else {
                        provider.trigger(_constants.OME_P2P_MODE, true);
                    }
                }

                if (message.command === 'request_offer_p2p') {

                    createClientPeerConnection(message.id, message.peer_id);
                }

                if (message.command === 'answer_p2p') {

                    var peerConnection1 = getPeerConnectionById(message.peer_id);

                    peerConnection1.setRemoteDescription(new RTCSessionDescription(message.sdp)).then(function (desc) {})["catch"](function (error) {
                        var tempError = _constants.ERRORS.codes[_constants.PLAYER_WEBRTC_SET_REMOTE_DESC_ERROR];
                        tempError.error = error;
                        closePeer(tempError);
                    });
                }

                if (message.command === 'candidate') {

                    // Candidates for new client peer
                    var peerConnection2 = getPeerConnectionById(message.id);

                    addIceCandidate(peerConnection2, message.candidates);
                }

                if (message.command === 'candidate_p2p') {

                    // Candidates for new client peer
                    var peerConnection3 = getPeerConnectionById(message.peer_id);

                    addIceCandidate(peerConnection3, message.candidates);
                }

                if (message.command === 'stop') {

                    if (mainPeerConnectionInfo.peerId === message.peer_id) {

                        //My parent was dead. And then I will retry.

                        // close connection with host and retry
                        // console.log('close connection with host');

                        mainStream = null;
                        mainPeerConnectionInfo.peerConnection.close();
                        mainPeerConnectionInfo = null;

                        //resetCallback();
                        provider.pause();

                        sendMessage(ws, {
                            command: 'request_offer'
                        });
                    } else {

                        // close connection with client
                        if (clientPeerConnections[message.peer_id]) {
                            // console.log('close connection with client: ', message.peer_id);
                            clientPeerConnections[message.peer_id].peerConnection.close();
                            delete clientPeerConnections[message.peer_id];
                        }
                    }
                }
            };
            ws.onclose = function () {

                if (!wsClosedByPlayer) {

                    var tempError = _constants.ERRORS.codes[_constants.PLAYER_WEBRTC_WS_ERROR];

                    if (mainPeerConnectionInfo) {
                        tempError = _constants.ERRORS.codes[_constants.PLAYER_WEBRTC_UNEXPECTED_DISCONNECT];
                    }

                    closePeer(tempError);
                }
            };

            ws.onerror = function (error) {

                //Why Edge Browser calls onerror() when ws.close()?
                if (!wsClosedByPlayer) {
                    var tempError = _constants.ERRORS.codes[_constants.PLAYER_WEBRTC_WS_ERROR];
                    tempError.error = error;
                    closePeer(tempError);
                    // reject(error);
                }
            };
        } catch (error) {

            closePeer(error);
        }
    }

    function initialize() {

        OvenPlayerConsole.log("WebRTCLoader connecting...");

        return new Promise(function (resolve, reject) {

            OvenPlayerConsole.log("WebRTCLoader url : " + webSocketUrl);

            initWebSocket(resolve, reject);
        });
    }

    function closePeer(error) {

        OvenPlayerConsole.log('WebRTC Loader closePeer()');

        if (!error) {
            wsClosedByPlayer = true;
        }

        if (mainPeerConnectionInfo) {

            if (mainPeerConnectionInfo.statisticsTimer) {
                clearTimeout(mainPeerConnectionInfo.statisticsTimer);
            }

            mainStream = null;

            OvenPlayerConsole.log('Closing main peer connection...');
            if (statisticsTimer) {
                clearTimeout(statisticsTimer);
            }

            mainPeerConnectionInfo.peerConnection.close();
            mainPeerConnectionInfo.peerConnection = null;
            mainPeerConnectionInfo = null;
        }

        if (Object.keys(clientPeerConnections).length > 0) {

            for (var clientId in clientPeerConnections) {

                var clientPeerConnection = clientPeerConnections[clientId].peerConnection;

                OvenPlayerConsole.log('Closing client peer connection...');
                clientPeerConnection.close();
                clientPeerConnection = null;
            }

            clientPeerConnections = {};
        }

        clearInterval(wsPing);
        wsPing = null;

        if (ws) {
            OvenPlayerConsole.log('Closing websocket connection...');
            OvenPlayerConsole.log("Send Signaling : Stop.");
            /*
            0 (CONNECTING)
            1 (OPEN)
            2 (CLOSING)
            3 (CLOSED)
            */
            if (ws.readyState === 0 || ws.readyState === 1) {

                wsClosedByPlayer = true;

                if (mainPeerConnectionInfo) {
                    sendMessage(ws, {
                        command: 'stop',
                        id: mainPeerConnectionInfo.id
                    });
                }

                ws.close();
            }
        } else {
            wsClosedByPlayer = false;
        }

        ws = null;

        if (error) {
            errorTrigger(error, provider);
        }
    }

    function sendMessage(ws, message) {

        if (ws) {
            ws.send(JSON.stringify(message));
        }
    }

    that.connect = function () {
        return initialize();
    };

    that.destroy = function () {
        closePeer();
    };

    return that;
};

exports["default"] = WebRTCLoader;

/***/ }),

/***/ "./src/js/utils/adapter.js":
/*!*********************************!*\
  !*** ./src/js/utils/adapter.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var require;var require;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (f) {
  if (( false ? undefined : _typeof(exports)) === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (f),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var g; }
})(function () {
  var define, module, exports;return function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = typeof require == "function" && require;if (!u && a) return require(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
        }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
          var n = t[o][1][e];return s(n ? n : e);
        }, l, l.exports, e, t, n, r);
      }return n[o].exports;
    }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
      s(r[o]);
    }return s;
  }({ 1: [function (require, module, exports) {
      /*
       *  Copyright (c) 2017 The WebRTC project authors. All Rights Reserved.
       *
       *  Use of this source code is governed by a BSD-style license
       *  that can be found in the LICENSE file in the root of the source
       *  tree.
       */
      /* eslint-env node */
      'use strict';

      var SDPUtils = require('sdp');

      function writeMediaSection(transceiver, caps, type, stream, dtlsRole) {
        var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps);

        // Map ICE parameters (ufrag, pwd) to SDP.
        sdp += SDPUtils.writeIceParameters(transceiver.iceGatherer.getLocalParameters());

        // Map DTLS parameters to SDP.
        sdp += SDPUtils.writeDtlsParameters(transceiver.dtlsTransport.getLocalParameters(), type === 'offer' ? 'actpass' : dtlsRole || 'active');

        sdp += 'a=mid:' + transceiver.mid + '\r\n';

        if (transceiver.rtpSender && transceiver.rtpReceiver) {
          sdp += 'a=sendrecv\r\n';
        } else if (transceiver.rtpSender) {
          sdp += 'a=sendonly\r\n';
        } else if (transceiver.rtpReceiver) {
          sdp += 'a=recvonly\r\n';
        } else {
          sdp += 'a=inactive\r\n';
        }

        if (transceiver.rtpSender) {
          var trackId = transceiver.rtpSender._initialTrackId || transceiver.rtpSender.track.id;
          transceiver.rtpSender._initialTrackId = trackId;
          // spec.
          var msid = 'msid:' + (stream ? stream.id : '-') + ' ' + trackId + '\r\n';
          sdp += 'a=' + msid;
          // for Chrome. Legacy should no longer be required.
          sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc + ' ' + msid;

          // RTX
          if (transceiver.sendEncodingParameters[0].rtx) {
            sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc + ' ' + msid;
            sdp += 'a=ssrc-group:FID ' + transceiver.sendEncodingParameters[0].ssrc + ' ' + transceiver.sendEncodingParameters[0].rtx.ssrc + '\r\n';
          }
        }
        // FIXME: this should be written by writeRtpDescription.
        sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc + ' cname:' + SDPUtils.localCName + '\r\n';
        if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) {
          sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc + ' cname:' + SDPUtils.localCName + '\r\n';
        }
        return sdp;
      }

      // Edge does not like
      // 1) stun: filtered after 14393 unless ?transport=udp is present
      // 2) turn: that does not have all of turn:host:port?transport=udp
      // 3) turn: with ipv6 addresses
      // 4) turn: occurring muliple times
      function filterIceServers(iceServers, edgeVersion) {
        var hasTurn = false;
        iceServers = JSON.parse(JSON.stringify(iceServers));
        return iceServers.filter(function (server) {
          if (server && (server.urls || server.url)) {
            var urls = server.urls || server.url;
            if (server.url && !server.urls) {
              console.warn('RTCIceServer.url is deprecated! Use urls instead.');
            }
            var isString = typeof urls === 'string';
            if (isString) {
              urls = [urls];
            }
            urls = urls.filter(function (url) {
              var validTurn = url.indexOf('turn:') === 0 && url.indexOf('transport=udp') !== -1 && url.indexOf('turn:[') === -1 && !hasTurn;

              if (validTurn) {
                hasTurn = true;
                return true;
              }
              return url.indexOf('stun:') === 0 && edgeVersion >= 14393 && url.indexOf('?transport=udp') === -1;
            });

            delete server.url;
            server.urls = isString ? urls[0] : urls;
            return !!urls.length;
          }
        });
      }

      // Determines the intersection of local and remote capabilities.
      function getCommonCapabilities(localCapabilities, remoteCapabilities) {
        var commonCapabilities = {
          codecs: [],
          headerExtensions: [],
          fecMechanisms: []
        };

        var findCodecByPayloadType = function findCodecByPayloadType(pt, codecs) {
          pt = parseInt(pt, 10);
          for (var i = 0; i < codecs.length; i++) {
            if (codecs[i].payloadType === pt || codecs[i].preferredPayloadType === pt) {
              return codecs[i];
            }
          }
        };

        var rtxCapabilityMatches = function rtxCapabilityMatches(lRtx, rRtx, lCodecs, rCodecs) {
          var lCodec = findCodecByPayloadType(lRtx.parameters.apt, lCodecs);
          var rCodec = findCodecByPayloadType(rRtx.parameters.apt, rCodecs);
          return lCodec && rCodec && lCodec.name.toLowerCase() === rCodec.name.toLowerCase();
        };

        localCapabilities.codecs.forEach(function (lCodec) {
          for (var i = 0; i < remoteCapabilities.codecs.length; i++) {
            var rCodec = remoteCapabilities.codecs[i];
            if (lCodec.name.toLowerCase() === rCodec.name.toLowerCase() && lCodec.clockRate === rCodec.clockRate) {
              if (lCodec.name.toLowerCase() === 'rtx' && lCodec.parameters && rCodec.parameters.apt) {
                // for RTX we need to find the local rtx that has a apt
                // which points to the same local codec as the remote one.
                if (!rtxCapabilityMatches(lCodec, rCodec, localCapabilities.codecs, remoteCapabilities.codecs)) {
                  continue;
                }
              }
              rCodec = JSON.parse(JSON.stringify(rCodec)); // deepcopy
              // number of channels is the highest common number of channels
              rCodec.numChannels = Math.min(lCodec.numChannels, rCodec.numChannels);
              // push rCodec so we reply with offerer payload type
              commonCapabilities.codecs.push(rCodec);

              // determine common feedback mechanisms
              rCodec.rtcpFeedback = rCodec.rtcpFeedback.filter(function (fb) {
                for (var j = 0; j < lCodec.rtcpFeedback.length; j++) {
                  if (lCodec.rtcpFeedback[j].type === fb.type && lCodec.rtcpFeedback[j].parameter === fb.parameter) {
                    return true;
                  }
                }
                return false;
              });
              // FIXME: also need to determine .parameters
              //  see https://github.com/openpeer/ortc/issues/569
              break;
            }
          }
        });

        localCapabilities.headerExtensions.forEach(function (lHeaderExtension) {
          for (var i = 0; i < remoteCapabilities.headerExtensions.length; i++) {
            var rHeaderExtension = remoteCapabilities.headerExtensions[i];
            if (lHeaderExtension.uri === rHeaderExtension.uri) {
              commonCapabilities.headerExtensions.push(rHeaderExtension);
              break;
            }
          }
        });

        // FIXME: fecMechanisms
        return commonCapabilities;
      }

      // is action=setLocalDescription with type allowed in signalingState
      function isActionAllowedInSignalingState(action, type, signalingState) {
        return {
          offer: {
            setLocalDescription: ['stable', 'have-local-offer'],
            setRemoteDescription: ['stable', 'have-remote-offer']
          },
          answer: {
            setLocalDescription: ['have-remote-offer', 'have-local-pranswer'],
            setRemoteDescription: ['have-local-offer', 'have-remote-pranswer']
          }
        }[type][action].indexOf(signalingState) !== -1;
      }

      function maybeAddCandidate(iceTransport, candidate) {
        // Edge's internal representation adds some fields therefore
        // not all fieldѕ are taken into account.
        var alreadyAdded = iceTransport.getRemoteCandidates().find(function (remoteCandidate) {
          return candidate.foundation === remoteCandidate.foundation && candidate.ip === remoteCandidate.ip && candidate.port === remoteCandidate.port && candidate.priority === remoteCandidate.priority && candidate.protocol === remoteCandidate.protocol && candidate.type === remoteCandidate.type;
        });
        if (!alreadyAdded) {
          iceTransport.addRemoteCandidate(candidate);
        }
        return !alreadyAdded;
      }

      function makeError(name, description) {
        var e = new Error(description);
        e.name = name;
        // legacy error codes from https://heycam.github.io/webidl/#idl-DOMException-error-names
        e.code = {
          NotSupportedError: 9,
          InvalidStateError: 11,
          InvalidAccessError: 15,
          TypeError: undefined,
          OperationError: undefined
        }[name];
        return e;
      }

      module.exports = function (window, edgeVersion) {
        // https://w3c.github.io/mediacapture-main/#mediastream
        // Helper function to add the track to the stream and
        // dispatch the event ourselves.
        function addTrackToStreamAndFireEvent(track, stream) {
          stream.addTrack(track);
          stream.dispatchEvent(new window.MediaStreamTrackEvent('addtrack', { track: track }));
        }

        function removeTrackFromStreamAndFireEvent(track, stream) {
          stream.removeTrack(track);
          stream.dispatchEvent(new window.MediaStreamTrackEvent('removetrack', { track: track }));
        }

        function fireAddTrack(pc, track, receiver, streams) {
          var trackEvent = new Event('track');
          trackEvent.track = track;
          trackEvent.receiver = receiver;
          trackEvent.transceiver = { receiver: receiver };
          trackEvent.streams = streams;
          window.setTimeout(function () {
            pc._dispatchEvent('track', trackEvent);
          });
        }

        var RTCPeerConnection = function RTCPeerConnection(config) {
          var pc = this;

          var _eventTarget = document.createDocumentFragment();
          ['addEventListener', 'removeEventListener', 'dispatchEvent'].forEach(function (method) {
            pc[method] = _eventTarget[method].bind(_eventTarget);
          });

          this.canTrickleIceCandidates = null;

          this.needNegotiation = false;

          this.localStreams = [];
          this.remoteStreams = [];

          this.localDescription = null;
          this.remoteDescription = null;

          this.signalingState = 'stable';
          this.iceConnectionState = 'new';
          this.connectionState = 'new';
          this.iceGatheringState = 'new';

          config = JSON.parse(JSON.stringify(config || {}));

          this.usingBundle = config.bundlePolicy === 'max-bundle';
          if (config.rtcpMuxPolicy === 'negotiate') {
            throw makeError('NotSupportedError', 'rtcpMuxPolicy \'negotiate\' is not supported');
          } else if (!config.rtcpMuxPolicy) {
            config.rtcpMuxPolicy = 'require';
          }

          switch (config.iceTransportPolicy) {
            case 'all':
            case 'relay':
              break;
            default:
              config.iceTransportPolicy = 'all';
              break;
          }

          switch (config.bundlePolicy) {
            case 'balanced':
            case 'max-compat':
            case 'max-bundle':
              break;
            default:
              config.bundlePolicy = 'balanced';
              break;
          }

          config.iceServers = filterIceServers(config.iceServers || [], edgeVersion);

          this._iceGatherers = [];
          if (config.iceCandidatePoolSize) {
            for (var i = config.iceCandidatePoolSize; i > 0; i--) {
              this._iceGatherers.push(new window.RTCIceGatherer({
                iceServers: config.iceServers,
                gatherPolicy: config.iceTransportPolicy
              }));
            }
          } else {
            config.iceCandidatePoolSize = 0;
          }

          this._config = config;

          // per-track iceGathers, iceTransports, dtlsTransports, rtpSenders, ...
          // everything that is needed to describe a SDP m-line.
          this.transceivers = [];

          this._sdpSessionId = SDPUtils.generateSessionId();
          this._sdpSessionVersion = 0;

          this._dtlsRole = undefined; // role for a=setup to use in answers.

          this._isClosed = false;
        };

        // set up event handlers on prototype
        RTCPeerConnection.prototype.onicecandidate = null;
        RTCPeerConnection.prototype.onaddstream = null;
        RTCPeerConnection.prototype.ontrack = null;
        RTCPeerConnection.prototype.onremovestream = null;
        RTCPeerConnection.prototype.onsignalingstatechange = null;
        RTCPeerConnection.prototype.oniceconnectionstatechange = null;
        RTCPeerConnection.prototype.onconnectionstatechange = null;
        RTCPeerConnection.prototype.onicegatheringstatechange = null;
        RTCPeerConnection.prototype.onnegotiationneeded = null;
        RTCPeerConnection.prototype.ondatachannel = null;

        RTCPeerConnection.prototype._dispatchEvent = function (name, event) {
          if (this._isClosed) {
            return;
          }
          this.dispatchEvent(event);
          if (typeof this['on' + name] === 'function') {
            this['on' + name](event);
          }
        };

        RTCPeerConnection.prototype._emitGatheringStateChange = function () {
          var event = new Event('icegatheringstatechange');
          this._dispatchEvent('icegatheringstatechange', event);
        };

        RTCPeerConnection.prototype.getConfiguration = function () {
          return this._config;
        };

        RTCPeerConnection.prototype.getLocalStreams = function () {
          return this.localStreams;
        };

        RTCPeerConnection.prototype.getRemoteStreams = function () {
          return this.remoteStreams;
        };

        // internal helper to create a transceiver object.
        // (which is not yet the same as the WebRTC 1.0 transceiver)
        RTCPeerConnection.prototype._createTransceiver = function (kind, doNotAdd) {
          var hasBundleTransport = this.transceivers.length > 0;
          var transceiver = {
            track: null,
            iceGatherer: null,
            iceTransport: null,
            dtlsTransport: null,
            localCapabilities: null,
            remoteCapabilities: null,
            rtpSender: null,
            rtpReceiver: null,
            kind: kind,
            mid: null,
            sendEncodingParameters: null,
            recvEncodingParameters: null,
            stream: null,
            associatedRemoteMediaStreams: [],
            wantReceive: true
          };
          if (this.usingBundle && hasBundleTransport) {
            transceiver.iceTransport = this.transceivers[0].iceTransport;
            transceiver.dtlsTransport = this.transceivers[0].dtlsTransport;
          } else {
            var transports = this._createIceAndDtlsTransports();
            transceiver.iceTransport = transports.iceTransport;
            transceiver.dtlsTransport = transports.dtlsTransport;
          }
          if (!doNotAdd) {
            this.transceivers.push(transceiver);
          }
          return transceiver;
        };

        RTCPeerConnection.prototype.addTrack = function (track, stream) {
          if (this._isClosed) {
            throw makeError('InvalidStateError', 'Attempted to call addTrack on a closed peerconnection.');
          }

          var alreadyExists = this.transceivers.find(function (s) {
            return s.track === track;
          });

          if (alreadyExists) {
            throw makeError('InvalidAccessError', 'Track already exists.');
          }

          var transceiver;
          for (var i = 0; i < this.transceivers.length; i++) {
            if (!this.transceivers[i].track && this.transceivers[i].kind === track.kind) {
              transceiver = this.transceivers[i];
            }
          }
          if (!transceiver) {
            transceiver = this._createTransceiver(track.kind);
          }

          this._maybeFireNegotiationNeeded();

          if (this.localStreams.indexOf(stream) === -1) {
            this.localStreams.push(stream);
          }

          transceiver.track = track;
          transceiver.stream = stream;
          transceiver.rtpSender = new window.RTCRtpSender(track, transceiver.dtlsTransport);
          return transceiver.rtpSender;
        };

        RTCPeerConnection.prototype.addStream = function (stream) {
          var pc = this;
          if (edgeVersion >= 15025) {
            stream.getTracks().forEach(function (track) {
              pc.addTrack(track, stream);
            });
          } else {
            // Clone is necessary for local demos mostly, attaching directly
            // to two different senders does not work (build 10547).
            // Fixed in 15025 (or earlier)
            var clonedStream = stream.clone();
            stream.getTracks().forEach(function (track, idx) {
              var clonedTrack = clonedStream.getTracks()[idx];
              track.addEventListener('enabled', function (event) {
                clonedTrack.enabled = event.enabled;
              });
            });
            clonedStream.getTracks().forEach(function (track) {
              pc.addTrack(track, clonedStream);
            });
          }
        };

        RTCPeerConnection.prototype.removeTrack = function (sender) {
          if (this._isClosed) {
            throw makeError('InvalidStateError', 'Attempted to call removeTrack on a closed peerconnection.');
          }

          if (!(sender instanceof window.RTCRtpSender)) {
            throw new TypeError('Argument 1 of RTCPeerConnection.removeTrack ' + 'does not implement interface RTCRtpSender.');
          }

          var transceiver = this.transceivers.find(function (t) {
            return t.rtpSender === sender;
          });

          if (!transceiver) {
            throw makeError('InvalidAccessError', 'Sender was not created by this connection.');
          }
          var stream = transceiver.stream;

          transceiver.rtpSender.stop();
          transceiver.rtpSender = null;
          transceiver.track = null;
          transceiver.stream = null;

          // remove the stream from the set of local streams
          var localStreams = this.transceivers.map(function (t) {
            return t.stream;
          });
          if (localStreams.indexOf(stream) === -1 && this.localStreams.indexOf(stream) > -1) {
            this.localStreams.splice(this.localStreams.indexOf(stream), 1);
          }

          this._maybeFireNegotiationNeeded();
        };

        RTCPeerConnection.prototype.removeStream = function (stream) {
          var pc = this;
          stream.getTracks().forEach(function (track) {
            var sender = pc.getSenders().find(function (s) {
              return s.track === track;
            });
            if (sender) {
              pc.removeTrack(sender);
            }
          });
        };

        RTCPeerConnection.prototype.getSenders = function () {
          return this.transceivers.filter(function (transceiver) {
            return !!transceiver.rtpSender;
          }).map(function (transceiver) {
            return transceiver.rtpSender;
          });
        };

        RTCPeerConnection.prototype.getReceivers = function () {
          return this.transceivers.filter(function (transceiver) {
            return !!transceiver.rtpReceiver;
          }).map(function (transceiver) {
            return transceiver.rtpReceiver;
          });
        };

        RTCPeerConnection.prototype._createIceGatherer = function (sdpMLineIndex, usingBundle) {
          var pc = this;
          if (usingBundle && sdpMLineIndex > 0) {
            return this.transceivers[0].iceGatherer;
          } else if (this._iceGatherers.length) {
            return this._iceGatherers.shift();
          }
          var iceGatherer = new window.RTCIceGatherer({
            iceServers: this._config.iceServers,
            gatherPolicy: this._config.iceTransportPolicy
          });
          Object.defineProperty(iceGatherer, 'state', { value: 'new', writable: true });

          this.transceivers[sdpMLineIndex].bufferedCandidateEvents = [];
          this.transceivers[sdpMLineIndex].bufferCandidates = function (event) {
            var end = !event.candidate || Object.keys(event.candidate).length === 0;
            // polyfill since RTCIceGatherer.state is not implemented in
            // Edge 10547 yet.
            iceGatherer.state = end ? 'completed' : 'gathering';
            if (pc.transceivers[sdpMLineIndex].bufferedCandidateEvents !== null) {
              pc.transceivers[sdpMLineIndex].bufferedCandidateEvents.push(event);
            }
          };
          iceGatherer.addEventListener('localcandidate', this.transceivers[sdpMLineIndex].bufferCandidates);
          return iceGatherer;
        };

        // start gathering from an RTCIceGatherer.
        RTCPeerConnection.prototype._gather = function (mid, sdpMLineIndex) {
          var pc = this;
          var iceGatherer = this.transceivers[sdpMLineIndex].iceGatherer;
          if (iceGatherer.onlocalcandidate) {
            return;
          }
          var bufferedCandidateEvents = this.transceivers[sdpMLineIndex].bufferedCandidateEvents;
          this.transceivers[sdpMLineIndex].bufferedCandidateEvents = null;
          iceGatherer.removeEventListener('localcandidate', this.transceivers[sdpMLineIndex].bufferCandidates);
          iceGatherer.onlocalcandidate = function (evt) {
            if (pc.usingBundle && sdpMLineIndex > 0) {
              // if we know that we use bundle we can drop candidates with
              // ѕdpMLineIndex > 0. If we don't do this then our state gets
              // confused since we dispose the extra ice gatherer.
              return;
            }
            var event = new Event('icecandidate');
            event.candidate = { sdpMid: mid, sdpMLineIndex: sdpMLineIndex };

            var cand = evt.candidate;
            // Edge emits an empty object for RTCIceCandidateComplete‥
            var end = !cand || Object.keys(cand).length === 0;
            if (end) {
              // polyfill since RTCIceGatherer.state is not implemented in
              // Edge 10547 yet.
              if (iceGatherer.state === 'new' || iceGatherer.state === 'gathering') {
                iceGatherer.state = 'completed';
              }
            } else {
              if (iceGatherer.state === 'new') {
                iceGatherer.state = 'gathering';
              }
              // RTCIceCandidate doesn't have a component, needs to be added
              cand.component = 1;
              // also the usernameFragment. TODO: update SDP to take both variants.
              cand.ufrag = iceGatherer.getLocalParameters().usernameFragment;

              var serializedCandidate = SDPUtils.writeCandidate(cand);
              event.candidate = _extends(event.candidate, SDPUtils.parseCandidate(serializedCandidate));

              event.candidate.candidate = serializedCandidate;
              event.candidate.toJSON = function () {
                return {
                  candidate: event.candidate.candidate,
                  sdpMid: event.candidate.sdpMid,
                  sdpMLineIndex: event.candidate.sdpMLineIndex,
                  usernameFragment: event.candidate.usernameFragment
                };
              };
            }

            // update local description.
            var sections = SDPUtils.getMediaSections(pc.localDescription.sdp);
            if (!end) {
              sections[event.candidate.sdpMLineIndex] += 'a=' + event.candidate.candidate + '\r\n';
            } else {
              sections[event.candidate.sdpMLineIndex] += 'a=end-of-candidates\r\n';
            }
            pc.localDescription.sdp = SDPUtils.getDescription(pc.localDescription.sdp) + sections.join('');
            var complete = pc.transceivers.every(function (transceiver) {
              return transceiver.iceGatherer && transceiver.iceGatherer.state === 'completed';
            });

            if (pc.iceGatheringState !== 'gathering') {
              pc.iceGatheringState = 'gathering';
              pc._emitGatheringStateChange();
            }

            // Emit candidate. Also emit null candidate when all gatherers are
            // complete.
            if (!end) {
              pc._dispatchEvent('icecandidate', event);
            }
            if (complete) {
              pc._dispatchEvent('icecandidate', new Event('icecandidate'));
              pc.iceGatheringState = 'complete';
              pc._emitGatheringStateChange();
            }
          };

          // emit already gathered candidates.
          window.setTimeout(function () {
            bufferedCandidateEvents.forEach(function (e) {
              iceGatherer.onlocalcandidate(e);
            });
          }, 0);
        };

        // Create ICE transport and DTLS transport.
        RTCPeerConnection.prototype._createIceAndDtlsTransports = function () {
          var pc = this;
          var iceTransport = new window.RTCIceTransport(null);
          iceTransport.onicestatechange = function () {
            pc._updateIceConnectionState();
            pc._updateConnectionState();
          };

          var dtlsTransport = new window.RTCDtlsTransport(iceTransport);
          dtlsTransport.ondtlsstatechange = function () {
            pc._updateConnectionState();
          };
          dtlsTransport.onerror = function () {
            // onerror does not set state to failed by itself.
            Object.defineProperty(dtlsTransport, 'state', { value: 'failed', writable: true });
            pc._updateConnectionState();
          };

          return {
            iceTransport: iceTransport,
            dtlsTransport: dtlsTransport
          };
        };

        // Destroy ICE gatherer, ICE transport and DTLS transport.
        // Without triggering the callbacks.
        RTCPeerConnection.prototype._disposeIceAndDtlsTransports = function (sdpMLineIndex) {
          var iceGatherer = this.transceivers[sdpMLineIndex].iceGatherer;
          if (iceGatherer) {
            delete iceGatherer.onlocalcandidate;
            delete this.transceivers[sdpMLineIndex].iceGatherer;
          }
          var iceTransport = this.transceivers[sdpMLineIndex].iceTransport;
          if (iceTransport) {
            delete iceTransport.onicestatechange;
            delete this.transceivers[sdpMLineIndex].iceTransport;
          }
          var dtlsTransport = this.transceivers[sdpMLineIndex].dtlsTransport;
          if (dtlsTransport) {
            delete dtlsTransport.ondtlsstatechange;
            delete dtlsTransport.onerror;
            delete this.transceivers[sdpMLineIndex].dtlsTransport;
          }
        };

        // Start the RTP Sender and Receiver for a transceiver.
        RTCPeerConnection.prototype._transceive = function (transceiver, send, recv) {
          var params = getCommonCapabilities(transceiver.localCapabilities, transceiver.remoteCapabilities);
          if (send && transceiver.rtpSender) {
            params.encodings = transceiver.sendEncodingParameters;
            params.rtcp = {
              cname: SDPUtils.localCName,
              compound: transceiver.rtcpParameters.compound
            };
            if (transceiver.recvEncodingParameters.length) {
              params.rtcp.ssrc = transceiver.recvEncodingParameters[0].ssrc;
            }
            transceiver.rtpSender.send(params);
          }
          if (recv && transceiver.rtpReceiver && params.codecs.length > 0) {
            // remove RTX field in Edge 14942
            if (transceiver.kind === 'video' && transceiver.recvEncodingParameters && edgeVersion < 15019) {
              transceiver.recvEncodingParameters.forEach(function (p) {
                delete p.rtx;
              });
            }
            if (transceiver.recvEncodingParameters.length) {
              params.encodings = transceiver.recvEncodingParameters;
            } else {
              params.encodings = [{}];
            }
            params.rtcp = {
              compound: transceiver.rtcpParameters.compound
            };
            if (transceiver.rtcpParameters.cname) {
              params.rtcp.cname = transceiver.rtcpParameters.cname;
            }
            if (transceiver.sendEncodingParameters.length) {
              params.rtcp.ssrc = transceiver.sendEncodingParameters[0].ssrc;
            }
            transceiver.rtpReceiver.receive(params);
          }
        };

        RTCPeerConnection.prototype.setLocalDescription = function (description) {
          var pc = this;

          // Note: pranswer is not supported.
          if (['offer', 'answer'].indexOf(description.type) === -1) {
            return Promise.reject(makeError('TypeError', 'Unsupported type "' + description.type + '"'));
          }

          if (!isActionAllowedInSignalingState('setLocalDescription', description.type, pc.signalingState) || pc._isClosed) {
            return Promise.reject(makeError('InvalidStateError', 'Can not set local ' + description.type + ' in state ' + pc.signalingState));
          }

          var sections;
          var sessionpart;
          if (description.type === 'offer') {
            // VERY limited support for SDP munging. Limited to:
            // * changing the order of codecs
            sections = SDPUtils.splitSections(description.sdp);
            sessionpart = sections.shift();
            sections.forEach(function (mediaSection, sdpMLineIndex) {
              var caps = SDPUtils.parseRtpParameters(mediaSection);
              pc.transceivers[sdpMLineIndex].localCapabilities = caps;
            });

            pc.transceivers.forEach(function (transceiver, sdpMLineIndex) {
              pc._gather(transceiver.mid, sdpMLineIndex);
            });
          } else if (description.type === 'answer') {
            sections = SDPUtils.splitSections(pc.remoteDescription.sdp);
            sessionpart = sections.shift();
            var isIceLite = SDPUtils.matchPrefix(sessionpart, 'a=ice-lite').length > 0;
            sections.forEach(function (mediaSection, sdpMLineIndex) {
              var transceiver = pc.transceivers[sdpMLineIndex];
              var iceGatherer = transceiver.iceGatherer;
              var iceTransport = transceiver.iceTransport;
              var dtlsTransport = transceiver.dtlsTransport;
              var localCapabilities = transceiver.localCapabilities;
              var remoteCapabilities = transceiver.remoteCapabilities;

              // treat bundle-only as not-rejected.
              var rejected = SDPUtils.isRejected(mediaSection) && SDPUtils.matchPrefix(mediaSection, 'a=bundle-only').length === 0;

              if (!rejected && !transceiver.rejected) {
                var remoteIceParameters = SDPUtils.getIceParameters(mediaSection, sessionpart);
                var remoteDtlsParameters = SDPUtils.getDtlsParameters(mediaSection, sessionpart);
                if (isIceLite) {
                  remoteDtlsParameters.role = 'server';
                }

                if (!pc.usingBundle || sdpMLineIndex === 0) {
                  pc._gather(transceiver.mid, sdpMLineIndex);
                  if (iceTransport.state === 'new') {
                    iceTransport.start(iceGatherer, remoteIceParameters, isIceLite ? 'controlling' : 'controlled');
                  }
                  if (dtlsTransport.state === 'new') {
                    dtlsTransport.start(remoteDtlsParameters);
                  }
                }

                // Calculate intersection of capabilities.
                var params = getCommonCapabilities(localCapabilities, remoteCapabilities);

                // Start the RTCRtpSender. The RTCRtpReceiver for this
                // transceiver has already been started in setRemoteDescription.
                pc._transceive(transceiver, params.codecs.length > 0, false);
              }
            });
          }

          pc.localDescription = {
            type: description.type,
            sdp: description.sdp
          };
          if (description.type === 'offer') {
            pc._updateSignalingState('have-local-offer');
          } else {
            pc._updateSignalingState('stable');
          }

          return Promise.resolve();
        };

        RTCPeerConnection.prototype.setRemoteDescription = function (description) {
          var pc = this;

          // Note: pranswer is not supported.
          if (['offer', 'answer'].indexOf(description.type) === -1) {
            return Promise.reject(makeError('TypeError', 'Unsupported type "' + description.type + '"'));
          }

          if (!isActionAllowedInSignalingState('setRemoteDescription', description.type, pc.signalingState) || pc._isClosed) {
            return Promise.reject(makeError('InvalidStateError', 'Can not set remote ' + description.type + ' in state ' + pc.signalingState));
          }

          var streams = {};
          pc.remoteStreams.forEach(function (stream) {
            streams[stream.id] = stream;
          });
          var receiverList = [];
          var sections = SDPUtils.splitSections(description.sdp);
          var sessionpart = sections.shift();
          var isIceLite = SDPUtils.matchPrefix(sessionpart, 'a=ice-lite').length > 0;
          var usingBundle = SDPUtils.matchPrefix(sessionpart, 'a=group:BUNDLE ').length > 0;
          pc.usingBundle = usingBundle;
          var iceOptions = SDPUtils.matchPrefix(sessionpart, 'a=ice-options:')[0];
          if (iceOptions) {
            pc.canTrickleIceCandidates = iceOptions.substr(14).split(' ').indexOf('trickle') >= 0;
          } else {
            pc.canTrickleIceCandidates = false;
          }

          sections.forEach(function (mediaSection, sdpMLineIndex) {
            var lines = SDPUtils.splitLines(mediaSection);
            var kind = SDPUtils.getKind(mediaSection);
            // treat bundle-only as not-rejected.
            var rejected = SDPUtils.isRejected(mediaSection) && SDPUtils.matchPrefix(mediaSection, 'a=bundle-only').length === 0;
            var protocol = lines[0].substr(2).split(' ')[2];

            var direction = SDPUtils.getDirection(mediaSection, sessionpart);
            var remoteMsid = SDPUtils.parseMsid(mediaSection);

            var mid = SDPUtils.getMid(mediaSection) || SDPUtils.generateIdentifier();

            // Reject datachannels which are not implemented yet.
            if (kind === 'application' && protocol === 'DTLS/SCTP' || rejected) {
              // TODO: this is dangerous in the case where a non-rejected m-line
              //     becomes rejected.
              pc.transceivers[sdpMLineIndex] = {
                mid: mid,
                kind: kind,
                rejected: true
              };
              return;
            }

            if (!rejected && pc.transceivers[sdpMLineIndex] && pc.transceivers[sdpMLineIndex].rejected) {
              // recycle a rejected transceiver.
              pc.transceivers[sdpMLineIndex] = pc._createTransceiver(kind, true);
            }

            var transceiver;
            var iceGatherer;
            var iceTransport;
            var dtlsTransport;
            var rtpReceiver;
            var sendEncodingParameters;
            var recvEncodingParameters;
            var localCapabilities;

            var track;
            // FIXME: ensure the mediaSection has rtcp-mux set.
            var remoteCapabilities = SDPUtils.parseRtpParameters(mediaSection);
            var remoteIceParameters;
            var remoteDtlsParameters;
            if (!rejected) {
              remoteIceParameters = SDPUtils.getIceParameters(mediaSection, sessionpart);
              remoteDtlsParameters = SDPUtils.getDtlsParameters(mediaSection, sessionpart);
              remoteDtlsParameters.role = 'client';
            }
            recvEncodingParameters = SDPUtils.parseRtpEncodingParameters(mediaSection);

            var rtcpParameters = SDPUtils.parseRtcpParameters(mediaSection);

            var isComplete = SDPUtils.matchPrefix(mediaSection, 'a=end-of-candidates', sessionpart).length > 0;
            var cands = SDPUtils.matchPrefix(mediaSection, 'a=candidate:').map(function (cand) {
              return SDPUtils.parseCandidate(cand);
            }).filter(function (cand) {
              return cand.component === 1;
            });

            // Check if we can use BUNDLE and dispose transports.
            if ((description.type === 'offer' || description.type === 'answer') && !rejected && usingBundle && sdpMLineIndex > 0 && pc.transceivers[sdpMLineIndex]) {
              pc._disposeIceAndDtlsTransports(sdpMLineIndex);
              pc.transceivers[sdpMLineIndex].iceGatherer = pc.transceivers[0].iceGatherer;
              pc.transceivers[sdpMLineIndex].iceTransport = pc.transceivers[0].iceTransport;
              pc.transceivers[sdpMLineIndex].dtlsTransport = pc.transceivers[0].dtlsTransport;
              if (pc.transceivers[sdpMLineIndex].rtpSender) {
                pc.transceivers[sdpMLineIndex].rtpSender.setTransport(pc.transceivers[0].dtlsTransport);
              }
              if (pc.transceivers[sdpMLineIndex].rtpReceiver) {
                pc.transceivers[sdpMLineIndex].rtpReceiver.setTransport(pc.transceivers[0].dtlsTransport);
              }
            }
            if (description.type === 'offer' && !rejected) {
              transceiver = pc.transceivers[sdpMLineIndex] || pc._createTransceiver(kind);
              transceiver.mid = mid;

              if (!transceiver.iceGatherer) {
                transceiver.iceGatherer = pc._createIceGatherer(sdpMLineIndex, usingBundle);
              }

              if (cands.length && transceiver.iceTransport.state === 'new') {
                if (isComplete && (!usingBundle || sdpMLineIndex === 0)) {
                  transceiver.iceTransport.setRemoteCandidates(cands);
                } else {
                  cands.forEach(function (candidate) {
                    maybeAddCandidate(transceiver.iceTransport, candidate);
                  });
                }
              }

              localCapabilities = window.RTCRtpReceiver.getCapabilities(kind);

              // filter RTX until additional stuff needed for RTX is implemented
              // in adapter.js
              if (edgeVersion < 15019) {
                localCapabilities.codecs = localCapabilities.codecs.filter(function (codec) {
                  return codec.name !== 'rtx';
                });
              }

              sendEncodingParameters = transceiver.sendEncodingParameters || [{
                ssrc: (2 * sdpMLineIndex + 2) * 1001
              }];

              // TODO: rewrite to use http://w3c.github.io/webrtc-pc/#set-associated-remote-streams
              var isNewTrack = false;
              if (direction === 'sendrecv' || direction === 'sendonly') {
                isNewTrack = !transceiver.rtpReceiver;
                rtpReceiver = transceiver.rtpReceiver || new window.RTCRtpReceiver(transceiver.dtlsTransport, kind);

                if (isNewTrack) {
                  var stream;
                  track = rtpReceiver.track;
                  // FIXME: does not work with Plan B.
                  if (remoteMsid && remoteMsid.stream === '-') {
                    // no-op. a stream id of '-' means: no associated stream.
                  } else if (remoteMsid) {
                    if (!streams[remoteMsid.stream]) {
                      streams[remoteMsid.stream] = new window.MediaStream();
                      Object.defineProperty(streams[remoteMsid.stream], 'id', {
                        get: function get() {
                          return remoteMsid.stream;
                        }
                      });
                    }
                    Object.defineProperty(track, 'id', {
                      get: function get() {
                        return remoteMsid.track;
                      }
                    });
                    stream = streams[remoteMsid.stream];
                  } else {
                    if (!streams["default"]) {
                      streams["default"] = new window.MediaStream();
                    }
                    stream = streams["default"];
                  }
                  if (stream) {
                    addTrackToStreamAndFireEvent(track, stream);
                    transceiver.associatedRemoteMediaStreams.push(stream);
                  }
                  receiverList.push([track, rtpReceiver, stream]);
                }
              } else if (transceiver.rtpReceiver && transceiver.rtpReceiver.track) {
                transceiver.associatedRemoteMediaStreams.forEach(function (s) {
                  var nativeTrack = s.getTracks().find(function (t) {
                    return t.id === transceiver.rtpReceiver.track.id;
                  });
                  if (nativeTrack) {
                    removeTrackFromStreamAndFireEvent(nativeTrack, s);
                  }
                });
                transceiver.associatedRemoteMediaStreams = [];
              }

              transceiver.localCapabilities = localCapabilities;
              transceiver.remoteCapabilities = remoteCapabilities;
              transceiver.rtpReceiver = rtpReceiver;
              transceiver.rtcpParameters = rtcpParameters;
              transceiver.sendEncodingParameters = sendEncodingParameters;
              transceiver.recvEncodingParameters = recvEncodingParameters;

              // Start the RTCRtpReceiver now. The RTPSender is started in
              // setLocalDescription.
              pc._transceive(pc.transceivers[sdpMLineIndex], false, isNewTrack);
            } else if (description.type === 'answer' && !rejected) {
              transceiver = pc.transceivers[sdpMLineIndex];
              iceGatherer = transceiver.iceGatherer;
              iceTransport = transceiver.iceTransport;
              dtlsTransport = transceiver.dtlsTransport;
              rtpReceiver = transceiver.rtpReceiver;
              sendEncodingParameters = transceiver.sendEncodingParameters;
              localCapabilities = transceiver.localCapabilities;

              pc.transceivers[sdpMLineIndex].recvEncodingParameters = recvEncodingParameters;
              pc.transceivers[sdpMLineIndex].remoteCapabilities = remoteCapabilities;
              pc.transceivers[sdpMLineIndex].rtcpParameters = rtcpParameters;

              if (cands.length && iceTransport.state === 'new') {
                if ((isIceLite || isComplete) && (!usingBundle || sdpMLineIndex === 0)) {
                  iceTransport.setRemoteCandidates(cands);
                } else {
                  cands.forEach(function (candidate) {
                    maybeAddCandidate(transceiver.iceTransport, candidate);
                  });
                }
              }

              if (!usingBundle || sdpMLineIndex === 0) {
                if (iceTransport.state === 'new') {
                  iceTransport.start(iceGatherer, remoteIceParameters, 'controlling');
                }
                if (dtlsTransport.state === 'new') {
                  dtlsTransport.start(remoteDtlsParameters);
                }
              }

              pc._transceive(transceiver, direction === 'sendrecv' || direction === 'recvonly', direction === 'sendrecv' || direction === 'sendonly');

              // TODO: rewrite to use http://w3c.github.io/webrtc-pc/#set-associated-remote-streams
              if (rtpReceiver && (direction === 'sendrecv' || direction === 'sendonly')) {
                track = rtpReceiver.track;
                if (remoteMsid) {
                  if (!streams[remoteMsid.stream]) {
                    streams[remoteMsid.stream] = new window.MediaStream();
                  }
                  addTrackToStreamAndFireEvent(track, streams[remoteMsid.stream]);
                  receiverList.push([track, rtpReceiver, streams[remoteMsid.stream]]);
                } else {
                  if (!streams["default"]) {
                    streams["default"] = new window.MediaStream();
                  }
                  addTrackToStreamAndFireEvent(track, streams["default"]);
                  receiverList.push([track, rtpReceiver, streams["default"]]);
                }
              } else {
                // FIXME: actually the receiver should be created later.
                delete transceiver.rtpReceiver;
              }
            }
          });

          if (pc._dtlsRole === undefined) {
            pc._dtlsRole = description.type === 'offer' ? 'active' : 'passive';
          }

          pc.remoteDescription = {
            type: description.type,
            sdp: description.sdp
          };
          if (description.type === 'offer') {
            pc._updateSignalingState('have-remote-offer');
          } else {
            pc._updateSignalingState('stable');
          }
          Object.keys(streams).forEach(function (sid) {
            var stream = streams[sid];
            if (stream.getTracks().length) {
              if (pc.remoteStreams.indexOf(stream) === -1) {
                pc.remoteStreams.push(stream);
                var event = new Event('addstream');
                event.stream = stream;
                window.setTimeout(function () {
                  pc._dispatchEvent('addstream', event);
                });
              }

              receiverList.forEach(function (item) {
                var track = item[0];
                var receiver = item[1];
                if (stream.id !== item[2].id) {
                  return;
                }
                fireAddTrack(pc, track, receiver, [stream]);
              });
            }
          });
          receiverList.forEach(function (item) {
            if (item[2]) {
              return;
            }
            fireAddTrack(pc, item[0], item[1], []);
          });

          // check whether addIceCandidate({}) was called within four seconds after
          // setRemoteDescription.
          window.setTimeout(function () {
            if (!(pc && pc.transceivers)) {
              return;
            }
            pc.transceivers.forEach(function (transceiver) {
              if (transceiver.iceTransport && transceiver.iceTransport.state === 'new' && transceiver.iceTransport.getRemoteCandidates().length > 0) {
                console.warn('Timeout for addRemoteCandidate. Consider sending ' + 'an end-of-candidates notification');
                transceiver.iceTransport.addRemoteCandidate({});
              }
            });
          }, 4000);

          return Promise.resolve();
        };

        RTCPeerConnection.prototype.close = function () {
          this.transceivers.forEach(function (transceiver) {
            /* not yet
            if (transceiver.iceGatherer) {
              transceiver.iceGatherer.close();
            }
            */
            if (transceiver.iceTransport) {
              transceiver.iceTransport.stop();
            }
            if (transceiver.dtlsTransport) {
              transceiver.dtlsTransport.stop();
            }
            if (transceiver.rtpSender) {
              transceiver.rtpSender.stop();
            }
            if (transceiver.rtpReceiver) {
              transceiver.rtpReceiver.stop();
            }
          });
          // FIXME: clean up tracks, local streams, remote streams, etc
          this._isClosed = true;
          this._updateSignalingState('closed');
        };

        // Update the signaling state.
        RTCPeerConnection.prototype._updateSignalingState = function (newState) {
          this.signalingState = newState;
          var event = new Event('signalingstatechange');
          this._dispatchEvent('signalingstatechange', event);
        };

        // Determine whether to fire the negotiationneeded event.
        RTCPeerConnection.prototype._maybeFireNegotiationNeeded = function () {
          var pc = this;
          if (this.signalingState !== 'stable' || this.needNegotiation === true) {
            return;
          }
          this.needNegotiation = true;
          window.setTimeout(function () {
            if (pc.needNegotiation) {
              pc.needNegotiation = false;
              var event = new Event('negotiationneeded');
              pc._dispatchEvent('negotiationneeded', event);
            }
          }, 0);
        };

        // Update the ice connection state.
        RTCPeerConnection.prototype._updateIceConnectionState = function () {
          var newState;
          var states = {
            'new': 0,
            closed: 0,
            checking: 0,
            connected: 0,
            completed: 0,
            disconnected: 0,
            failed: 0
          };
          this.transceivers.forEach(function (transceiver) {
            states[transceiver.iceTransport.state]++;
          });

          newState = 'new';
          if (states.failed > 0) {
            newState = 'failed';
          } else if (states.checking > 0) {
            newState = 'checking';
          } else if (states.disconnected > 0) {
            newState = 'disconnected';
          } else if (states["new"] > 0) {
            newState = 'new';
          } else if (states.connected > 0) {
            newState = 'connected';
          } else if (states.completed > 0) {
            newState = 'completed';
          }

          if (newState !== this.iceConnectionState) {
            this.iceConnectionState = newState;
            var event = new Event('iceconnectionstatechange');
            this._dispatchEvent('iceconnectionstatechange', event);
          }
        };

        // Update the connection state.
        RTCPeerConnection.prototype._updateConnectionState = function () {
          var newState;
          var states = {
            'new': 0,
            closed: 0,
            connecting: 0,
            connected: 0,
            completed: 0,
            disconnected: 0,
            failed: 0
          };
          this.transceivers.forEach(function (transceiver) {
            states[transceiver.iceTransport.state]++;
            states[transceiver.dtlsTransport.state]++;
          });
          // ICETransport.completed and connected are the same for this purpose.
          states.connected += states.completed;

          newState = 'new';
          if (states.failed > 0) {
            newState = 'failed';
          } else if (states.connecting > 0) {
            newState = 'connecting';
          } else if (states.disconnected > 0) {
            newState = 'disconnected';
          } else if (states["new"] > 0) {
            newState = 'new';
          } else if (states.connected > 0) {
            newState = 'connected';
          }

          if (newState !== this.connectionState) {
            this.connectionState = newState;
            var event = new Event('connectionstatechange');
            this._dispatchEvent('connectionstatechange', event);
          }
        };

        RTCPeerConnection.prototype.createOffer = function () {
          var pc = this;

          if (pc._isClosed) {
            return Promise.reject(makeError('InvalidStateError', 'Can not call createOffer after close'));
          }

          var numAudioTracks = pc.transceivers.filter(function (t) {
            return t.kind === 'audio';
          }).length;
          var numVideoTracks = pc.transceivers.filter(function (t) {
            return t.kind === 'video';
          }).length;

          // Determine number of audio and video tracks we need to send/recv.
          var offerOptions = arguments[0];
          if (offerOptions) {
            // Reject Chrome legacy constraints.
            if (offerOptions.mandatory || offerOptions.optional) {
              throw new TypeError('Legacy mandatory/optional constraints not supported.');
            }
            if (offerOptions.offerToReceiveAudio !== undefined) {
              if (offerOptions.offerToReceiveAudio === true) {
                numAudioTracks = 1;
              } else if (offerOptions.offerToReceiveAudio === false) {
                numAudioTracks = 0;
              } else {
                numAudioTracks = offerOptions.offerToReceiveAudio;
              }
            }
            if (offerOptions.offerToReceiveVideo !== undefined) {
              if (offerOptions.offerToReceiveVideo === true) {
                numVideoTracks = 1;
              } else if (offerOptions.offerToReceiveVideo === false) {
                numVideoTracks = 0;
              } else {
                numVideoTracks = offerOptions.offerToReceiveVideo;
              }
            }
          }

          pc.transceivers.forEach(function (transceiver) {
            if (transceiver.kind === 'audio') {
              numAudioTracks--;
              if (numAudioTracks < 0) {
                transceiver.wantReceive = false;
              }
            } else if (transceiver.kind === 'video') {
              numVideoTracks--;
              if (numVideoTracks < 0) {
                transceiver.wantReceive = false;
              }
            }
          });

          // Create M-lines for recvonly streams.
          while (numAudioTracks > 0 || numVideoTracks > 0) {
            if (numAudioTracks > 0) {
              pc._createTransceiver('audio');
              numAudioTracks--;
            }
            if (numVideoTracks > 0) {
              pc._createTransceiver('video');
              numVideoTracks--;
            }
          }

          var sdp = SDPUtils.writeSessionBoilerplate(pc._sdpSessionId, pc._sdpSessionVersion++);
          pc.transceivers.forEach(function (transceiver, sdpMLineIndex) {
            // For each track, create an ice gatherer, ice transport,
            // dtls transport, potentially rtpsender and rtpreceiver.
            var track = transceiver.track;
            var kind = transceiver.kind;
            var mid = transceiver.mid || SDPUtils.generateIdentifier();
            transceiver.mid = mid;

            if (!transceiver.iceGatherer) {
              transceiver.iceGatherer = pc._createIceGatherer(sdpMLineIndex, pc.usingBundle);
            }

            var localCapabilities = window.RTCRtpSender.getCapabilities(kind);
            // filter RTX until additional stuff needed for RTX is implemented
            // in adapter.js
            if (edgeVersion < 15019) {
              localCapabilities.codecs = localCapabilities.codecs.filter(function (codec) {
                return codec.name !== 'rtx';
              });
            }
            localCapabilities.codecs.forEach(function (codec) {
              // work around https://bugs.chromium.org/p/webrtc/issues/detail?id=6552
              // by adding level-asymmetry-allowed=1
              if (codec.name === 'H264' && codec.parameters['level-asymmetry-allowed'] === undefined) {
                codec.parameters['level-asymmetry-allowed'] = '1';
              }

              // for subsequent offers, we might have to re-use the payload
              // type of the last offer.
              if (transceiver.remoteCapabilities && transceiver.remoteCapabilities.codecs) {
                transceiver.remoteCapabilities.codecs.forEach(function (remoteCodec) {
                  if (codec.name.toLowerCase() === remoteCodec.name.toLowerCase() && codec.clockRate === remoteCodec.clockRate) {
                    codec.preferredPayloadType = remoteCodec.payloadType;
                  }
                });
              }
            });
            localCapabilities.headerExtensions.forEach(function (hdrExt) {
              var remoteExtensions = transceiver.remoteCapabilities && transceiver.remoteCapabilities.headerExtensions || [];
              remoteExtensions.forEach(function (rHdrExt) {
                if (hdrExt.uri === rHdrExt.uri) {
                  hdrExt.id = rHdrExt.id;
                }
              });
            });

            // generate an ssrc now, to be used later in rtpSender.send
            var sendEncodingParameters = transceiver.sendEncodingParameters || [{
              ssrc: (2 * sdpMLineIndex + 1) * 1001
            }];
            if (track) {
              // add RTX
              if (edgeVersion >= 15019 && kind === 'video' && !sendEncodingParameters[0].rtx) {
                sendEncodingParameters[0].rtx = {
                  ssrc: sendEncodingParameters[0].ssrc + 1
                };
              }
            }

            if (transceiver.wantReceive) {
              transceiver.rtpReceiver = new window.RTCRtpReceiver(transceiver.dtlsTransport, kind);
            }

            transceiver.localCapabilities = localCapabilities;
            transceiver.sendEncodingParameters = sendEncodingParameters;
          });

          // always offer BUNDLE and dispose on return if not supported.
          if (pc._config.bundlePolicy !== 'max-compat') {
            sdp += 'a=group:BUNDLE ' + pc.transceivers.map(function (t) {
              return t.mid;
            }).join(' ') + '\r\n';
          }
          sdp += 'a=ice-options:trickle\r\n';

          pc.transceivers.forEach(function (transceiver, sdpMLineIndex) {
            sdp += writeMediaSection(transceiver, transceiver.localCapabilities, 'offer', transceiver.stream, pc._dtlsRole);
            sdp += 'a=rtcp-rsize\r\n';

            if (transceiver.iceGatherer && pc.iceGatheringState !== 'new' && (sdpMLineIndex === 0 || !pc.usingBundle)) {
              transceiver.iceGatherer.getLocalCandidates().forEach(function (cand) {
                cand.component = 1;
                sdp += 'a=' + SDPUtils.writeCandidate(cand) + '\r\n';
              });

              if (transceiver.iceGatherer.state === 'completed') {
                sdp += 'a=end-of-candidates\r\n';
              }
            }
          });

          var desc = new window.RTCSessionDescription({
            type: 'offer',
            sdp: sdp
          });
          return Promise.resolve(desc);
        };

        RTCPeerConnection.prototype.createAnswer = function () {
          var pc = this;

          if (pc._isClosed) {
            return Promise.reject(makeError('InvalidStateError', 'Can not call createAnswer after close'));
          }

          if (!(pc.signalingState === 'have-remote-offer' || pc.signalingState === 'have-local-pranswer')) {
            return Promise.reject(makeError('InvalidStateError', 'Can not call createAnswer in signalingState ' + pc.signalingState));
          }

          var sdp = SDPUtils.writeSessionBoilerplate(pc._sdpSessionId, pc._sdpSessionVersion++);
          if (pc.usingBundle) {
            sdp += 'a=group:BUNDLE ' + pc.transceivers.map(function (t) {
              return t.mid;
            }).join(' ') + '\r\n';
          }
          var mediaSectionsInOffer = SDPUtils.getMediaSections(pc.remoteDescription.sdp).length;
          pc.transceivers.forEach(function (transceiver, sdpMLineIndex) {
            if (sdpMLineIndex + 1 > mediaSectionsInOffer) {
              return;
            }
            if (transceiver.rejected) {
              if (transceiver.kind === 'application') {
                sdp += 'm=application 0 DTLS/SCTP 5000\r\n';
              } else if (transceiver.kind === 'audio') {
                sdp += 'm=audio 0 UDP/TLS/RTP/SAVPF 0\r\n' + 'a=rtpmap:0 PCMU/8000\r\n';
              } else if (transceiver.kind === 'video') {
                sdp += 'm=video 0 UDP/TLS/RTP/SAVPF 120\r\n' + 'a=rtpmap:120 VP8/90000\r\n';
              }
              sdp += 'c=IN IP4 0.0.0.0\r\n' + 'a=inactive\r\n' + 'a=mid:' + transceiver.mid + '\r\n';
              return;
            }

            // FIXME: look at direction.
            if (transceiver.stream) {
              var localTrack;
              if (transceiver.kind === 'audio') {
                localTrack = transceiver.stream.getAudioTracks()[0];
              } else if (transceiver.kind === 'video') {
                localTrack = transceiver.stream.getVideoTracks()[0];
              }
              if (localTrack) {
                // add RTX
                if (edgeVersion >= 15019 && transceiver.kind === 'video' && !transceiver.sendEncodingParameters[0].rtx) {
                  transceiver.sendEncodingParameters[0].rtx = {
                    ssrc: transceiver.sendEncodingParameters[0].ssrc + 1
                  };
                }
              }
            }

            // Calculate intersection of capabilities.
            var commonCapabilities = getCommonCapabilities(transceiver.localCapabilities, transceiver.remoteCapabilities);

            var hasRtx = commonCapabilities.codecs.filter(function (c) {
              return c.name.toLowerCase() === 'rtx';
            }).length;
            if (!hasRtx && transceiver.sendEncodingParameters[0].rtx) {
              delete transceiver.sendEncodingParameters[0].rtx;
            }

            sdp += writeMediaSection(transceiver, commonCapabilities, 'answer', transceiver.stream, pc._dtlsRole);
            if (transceiver.rtcpParameters && transceiver.rtcpParameters.reducedSize) {
              sdp += 'a=rtcp-rsize\r\n';
            }
          });

          var desc = new window.RTCSessionDescription({
            type: 'answer',
            sdp: sdp
          });
          return Promise.resolve(desc);
        };

        RTCPeerConnection.prototype.addIceCandidate = function (candidate) {
          var pc = this;
          var sections;
          if (candidate && !(candidate.sdpMLineIndex !== undefined || candidate.sdpMid)) {
            return Promise.reject(new TypeError('sdpMLineIndex or sdpMid required'));
          }

          // TODO: needs to go into ops queue.
          return new Promise(function (resolve, reject) {
            if (!pc.remoteDescription) {
              return reject(makeError('InvalidStateError', 'Can not add ICE candidate without a remote description'));
            } else if (!candidate || candidate.candidate === '') {
              for (var j = 0; j < pc.transceivers.length; j++) {
                if (pc.transceivers[j].rejected) {
                  continue;
                }
                pc.transceivers[j].iceTransport.addRemoteCandidate({});
                sections = SDPUtils.getMediaSections(pc.remoteDescription.sdp);
                sections[j] += 'a=end-of-candidates\r\n';
                pc.remoteDescription.sdp = SDPUtils.getDescription(pc.remoteDescription.sdp) + sections.join('');
                if (pc.usingBundle) {
                  break;
                }
              }
            } else {
              var sdpMLineIndex = candidate.sdpMLineIndex;
              if (candidate.sdpMid) {
                for (var i = 0; i < pc.transceivers.length; i++) {
                  if (pc.transceivers[i].mid === candidate.sdpMid) {
                    sdpMLineIndex = i;
                    break;
                  }
                }
              }
              var transceiver = pc.transceivers[sdpMLineIndex];
              if (transceiver) {
                if (transceiver.rejected) {
                  return resolve();
                }
                var cand = Object.keys(candidate.candidate).length > 0 ? SDPUtils.parseCandidate(candidate.candidate) : {};
                // Ignore Chrome's invalid candidates since Edge does not like them.
                if (cand.protocol === 'tcp' && (cand.port === 0 || cand.port === 9)) {
                  return resolve();
                }
                // Ignore RTCP candidates, we assume RTCP-MUX.
                if (cand.component && cand.component !== 1) {
                  return resolve();
                }
                // when using bundle, avoid adding candidates to the wrong
                // ice transport. And avoid adding candidates added in the SDP.
                if (sdpMLineIndex === 0 || sdpMLineIndex > 0 && transceiver.iceTransport !== pc.transceivers[0].iceTransport) {
                  if (!maybeAddCandidate(transceiver.iceTransport, cand)) {
                    return reject(makeError('OperationError', 'Can not add ICE candidate'));
                  }
                }

                // update the remoteDescription.
                var candidateString = candidate.candidate.trim();
                if (candidateString.indexOf('a=') === 0) {
                  candidateString = candidateString.substr(2);
                }
                sections = SDPUtils.getMediaSections(pc.remoteDescription.sdp);
                sections[sdpMLineIndex] += 'a=' + (cand.type ? candidateString : 'end-of-candidates') + '\r\n';
                pc.remoteDescription.sdp = SDPUtils.getDescription(pc.remoteDescription.sdp) + sections.join('');
              } else {
                return reject(makeError('OperationError', 'Can not add ICE candidate'));
              }
            }
            resolve();
          });
        };

        RTCPeerConnection.prototype.getStats = function () {
          var promises = [];
          this.transceivers.forEach(function (transceiver) {
            ['rtpSender', 'rtpReceiver', 'iceGatherer', 'iceTransport', 'dtlsTransport'].forEach(function (method) {
              if (transceiver[method]) {
                promises.push(transceiver[method].getStats());
              }
            });
          });
          var fixStatsType = function fixStatsType(stat) {
            return {
              inboundrtp: 'inbound-rtp',
              outboundrtp: 'outbound-rtp',
              candidatepair: 'candidate-pair',
              localcandidate: 'local-candidate',
              remotecandidate: 'remote-candidate'
            }[stat.type] || stat.type;
          };
          return new Promise(function (resolve) {
            // shim getStats with maplike support
            var results = new Map();
            Promise.all(promises).then(function (res) {
              res.forEach(function (result) {
                Object.keys(result).forEach(function (id) {
                  result[id].type = fixStatsType(result[id]);
                  results.set(id, result[id]);
                });
              });
              resolve(results);
            });
          });
        };

        // legacy callback shims. Should be moved to adapter.js some days.
        var methods = ['createOffer', 'createAnswer'];
        methods.forEach(function (method) {
          var nativeMethod = RTCPeerConnection.prototype[method];
          RTCPeerConnection.prototype[method] = function () {
            var args = arguments;
            if (typeof args[0] === 'function' || typeof args[1] === 'function') {
              // legacy
              return nativeMethod.apply(this, [arguments[2]]).then(function (description) {
                if (typeof args[0] === 'function') {
                  args[0].apply(null, [description]);
                }
              }, function (error) {
                if (typeof args[1] === 'function') {
                  args[1].apply(null, [error]);
                }
              });
            }
            return nativeMethod.apply(this, arguments);
          };
        });

        methods = ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'];
        methods.forEach(function (method) {
          var nativeMethod = RTCPeerConnection.prototype[method];
          RTCPeerConnection.prototype[method] = function () {
            var args = arguments;
            if (typeof args[1] === 'function' || typeof args[2] === 'function') {
              // legacy
              return nativeMethod.apply(this, arguments).then(function () {
                if (typeof args[1] === 'function') {
                  args[1].apply(null);
                }
              }, function (error) {
                if (typeof args[2] === 'function') {
                  args[2].apply(null, [error]);
                }
              });
            }
            return nativeMethod.apply(this, arguments);
          };
        });

        // getStats is special. It doesn't have a spec legacy method yet we support
        // getStats(something, cb) without error callbacks.
        ['getStats'].forEach(function (method) {
          var nativeMethod = RTCPeerConnection.prototype[method];
          RTCPeerConnection.prototype[method] = function () {
            var args = arguments;
            if (typeof args[1] === 'function') {
              return nativeMethod.apply(this, arguments).then(function () {
                if (typeof args[1] === 'function') {
                  args[1].apply(null);
                }
              });
            }
            return nativeMethod.apply(this, arguments);
          };
        });

        return RTCPeerConnection;
      };
    }, { "sdp": 2 }], 2: [function (require, module, exports) {
      /* eslint-env node */
      'use strict';

      // SDP helpers.

      var SDPUtils = {};

      // Generate an alphanumeric identifier for cname or mids.
      // TODO: use UUIDs instead? https://gist.github.com/jed/982883
      SDPUtils.generateIdentifier = function () {
        return Math.random().toString(36).substr(2, 10);
      };

      // The RTCP CNAME used by all peerconnections from the same JS.
      SDPUtils.localCName = SDPUtils.generateIdentifier();

      // Splits SDP into lines, dealing with both CRLF and LF.
      SDPUtils.splitLines = function (blob) {
        return blob.trim().split('\n').map(function (line) {
          return line.trim();
        });
      };
      // Splits SDP into sessionpart and mediasections. Ensures CRLF.
      SDPUtils.splitSections = function (blob) {
        var parts = blob.split('\nm=');
        return parts.map(function (part, index) {
          return (index > 0 ? 'm=' + part : part).trim() + '\r\n';
        });
      };

      // returns the session description.
      SDPUtils.getDescription = function (blob) {
        var sections = SDPUtils.splitSections(blob);
        return sections && sections[0];
      };

      // returns the individual media sections.
      SDPUtils.getMediaSections = function (blob) {
        var sections = SDPUtils.splitSections(blob);
        sections.shift();
        return sections;
      };

      // Returns lines that start with a certain prefix.
      SDPUtils.matchPrefix = function (blob, prefix) {
        return SDPUtils.splitLines(blob).filter(function (line) {
          return line.indexOf(prefix) === 0;
        });
      };

      // Parses an ICE candidate line. Sample input:
      // candidate:702786350 2 udp 41819902 8.8.8.8 60769 typ relay raddr 8.8.8.8
      // rport 55996"
      SDPUtils.parseCandidate = function (line) {
        var parts;
        // Parse both variants.
        if (line.indexOf('a=candidate:') === 0) {
          parts = line.substring(12).split(' ');
        } else {
          parts = line.substring(10).split(' ');
        }

        var candidate = {
          foundation: parts[0],
          component: parseInt(parts[1], 10),
          protocol: parts[2].toLowerCase(),
          priority: parseInt(parts[3], 10),
          ip: parts[4],
          port: parseInt(parts[5], 10),
          // skip parts[6] == 'typ'
          type: parts[7]
        };

        for (var i = 8; i < parts.length; i += 2) {
          switch (parts[i]) {
            case 'raddr':
              candidate.relatedAddress = parts[i + 1];
              break;
            case 'rport':
              candidate.relatedPort = parseInt(parts[i + 1], 10);
              break;
            case 'tcptype':
              candidate.tcpType = parts[i + 1];
              break;
            case 'ufrag':
              candidate.ufrag = parts[i + 1]; // for backward compability.
              candidate.usernameFragment = parts[i + 1];
              break;
            default:
              // extension handling, in particular ufrag
              candidate[parts[i]] = parts[i + 1];
              break;
          }
        }
        return candidate;
      };

      // Translates a candidate object into SDP candidate attribute.
      SDPUtils.writeCandidate = function (candidate) {
        var sdp = [];
        sdp.push(candidate.foundation);
        sdp.push(candidate.component);
        sdp.push(candidate.protocol.toUpperCase());
        sdp.push(candidate.priority);
        sdp.push(candidate.ip);
        sdp.push(candidate.port);

        var type = candidate.type;
        sdp.push('typ');
        sdp.push(type);
        if (type !== 'host' && candidate.relatedAddress && candidate.relatedPort) {
          sdp.push('raddr');
          sdp.push(candidate.relatedAddress); // was: relAddr
          sdp.push('rport');
          sdp.push(candidate.relatedPort); // was: relPort
        }
        if (candidate.tcpType && candidate.protocol.toLowerCase() === 'tcp') {
          sdp.push('tcptype');
          sdp.push(candidate.tcpType);
        }
        if (candidate.usernameFragment || candidate.ufrag) {
          sdp.push('ufrag');
          sdp.push(candidate.usernameFragment || candidate.ufrag);
        }
        return 'candidate:' + sdp.join(' ');
      };

      // Parses an ice-options line, returns an array of option tags.
      // a=ice-options:foo bar
      SDPUtils.parseIceOptions = function (line) {
        return line.substr(14).split(' ');
      };

      // Parses an rtpmap line, returns RTCRtpCoddecParameters. Sample input:
      // a=rtpmap:111 opus/48000/2
      SDPUtils.parseRtpMap = function (line) {
        var parts = line.substr(9).split(' ');
        var parsed = {
          payloadType: parseInt(parts.shift(), 10) // was: id
        };

        parts = parts[0].split('/');

        parsed.name = parts[0];
        parsed.clockRate = parseInt(parts[1], 10); // was: clockrate
        // was: channels
        parsed.numChannels = parts.length === 3 ? parseInt(parts[2], 10) : 1;
        return parsed;
      };

      // Generate an a=rtpmap line from RTCRtpCodecCapability or
      // RTCRtpCodecParameters.
      SDPUtils.writeRtpMap = function (codec) {
        var pt = codec.payloadType;
        if (codec.preferredPayloadType !== undefined) {
          pt = codec.preferredPayloadType;
        }
        return 'a=rtpmap:' + pt + ' ' + codec.name + '/' + codec.clockRate + (codec.numChannels !== 1 ? '/' + codec.numChannels : '') + '\r\n';
      };

      // Parses an a=extmap line (headerextension from RFC 5285). Sample input:
      // a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
      // a=extmap:2/sendonly urn:ietf:params:rtp-hdrext:toffset
      SDPUtils.parseExtmap = function (line) {
        var parts = line.substr(9).split(' ');
        return {
          id: parseInt(parts[0], 10),
          direction: parts[0].indexOf('/') > 0 ? parts[0].split('/')[1] : 'sendrecv',
          uri: parts[1]
        };
      };

      // Generates a=extmap line from RTCRtpHeaderExtensionParameters or
      // RTCRtpHeaderExtension.
      SDPUtils.writeExtmap = function (headerExtension) {
        return 'a=extmap:' + (headerExtension.id || headerExtension.preferredId) + (headerExtension.direction && headerExtension.direction !== 'sendrecv' ? '/' + headerExtension.direction : '') + ' ' + headerExtension.uri + '\r\n';
      };

      // Parses an ftmp line, returns dictionary. Sample input:
      // a=fmtp:96 vbr=on;cng=on
      // Also deals with vbr=on; cng=on
      SDPUtils.parseFmtp = function (line) {
        var parsed = {};
        var kv;
        var parts = line.substr(line.indexOf(' ') + 1).split(';');
        for (var j = 0; j < parts.length; j++) {
          kv = parts[j].trim().split('=');
          parsed[kv[0].trim()] = kv[1];
        }
        return parsed;
      };

      // Generates an a=ftmp line from RTCRtpCodecCapability or RTCRtpCodecParameters.
      SDPUtils.writeFmtp = function (codec) {
        var line = '';
        var pt = codec.payloadType;
        if (codec.preferredPayloadType !== undefined) {
          pt = codec.preferredPayloadType;
        }
        if (codec.parameters && Object.keys(codec.parameters).length) {
          var params = [];
          Object.keys(codec.parameters).forEach(function (param) {
            params.push(param + '=' + codec.parameters[param]);
          });
          line += 'a=fmtp:' + pt + ' ' + params.join(';') + '\r\n';
        }
        return line;
      };

      // Parses an rtcp-fb line, returns RTCPRtcpFeedback object. Sample input:
      // a=rtcp-fb:98 nack rpsi
      SDPUtils.parseRtcpFb = function (line) {
        var parts = line.substr(line.indexOf(' ') + 1).split(' ');
        return {
          type: parts.shift(),
          parameter: parts.join(' ')
        };
      };
      // Generate a=rtcp-fb lines from RTCRtpCodecCapability or RTCRtpCodecParameters.
      SDPUtils.writeRtcpFb = function (codec) {
        var lines = '';
        var pt = codec.payloadType;
        if (codec.preferredPayloadType !== undefined) {
          pt = codec.preferredPayloadType;
        }
        if (codec.rtcpFeedback && codec.rtcpFeedback.length) {
          // FIXME: special handling for trr-int?
          codec.rtcpFeedback.forEach(function (fb) {
            lines += 'a=rtcp-fb:' + pt + ' ' + fb.type + (fb.parameter && fb.parameter.length ? ' ' + fb.parameter : '') + '\r\n';
          });
        }
        return lines;
      };

      // Parses an RFC 5576 ssrc media attribute. Sample input:
      // a=ssrc:3735928559 cname:something
      SDPUtils.parseSsrcMedia = function (line) {
        var sp = line.indexOf(' ');
        var parts = {
          ssrc: parseInt(line.substr(7, sp - 7), 10)
        };
        var colon = line.indexOf(':', sp);
        if (colon > -1) {
          parts.attribute = line.substr(sp + 1, colon - sp - 1);
          parts.value = line.substr(colon + 1);
        } else {
          parts.attribute = line.substr(sp + 1);
        }
        return parts;
      };

      // Extracts the MID (RFC 5888) from a media section.
      // returns the MID or undefined if no mid line was found.
      SDPUtils.getMid = function (mediaSection) {
        var mid = SDPUtils.matchPrefix(mediaSection, 'a=mid:')[0];
        if (mid) {
          return mid.substr(6);
        }
      };

      SDPUtils.parseFingerprint = function (line) {
        var parts = line.substr(14).split(' ');
        return {
          algorithm: parts[0].toLowerCase(), // algorithm is case-sensitive in Edge.
          value: parts[1]
        };
      };

      // Extracts DTLS parameters from SDP media section or sessionpart.
      // FIXME: for consistency with other functions this should only
      //   get the fingerprint line as input. See also getIceParameters.
      SDPUtils.getDtlsParameters = function (mediaSection, sessionpart) {
        var lines = SDPUtils.matchPrefix(mediaSection + sessionpart, 'a=fingerprint:');
        // Note: a=setup line is ignored since we use the 'auto' role.
        // Note2: 'algorithm' is not case sensitive except in Edge.
        return {
          role: 'auto',
          fingerprints: lines.map(SDPUtils.parseFingerprint)
        };
      };

      // Serializes DTLS parameters to SDP.
      SDPUtils.writeDtlsParameters = function (params, setupType) {
        var sdp = 'a=setup:' + setupType + '\r\n';
        params.fingerprints.forEach(function (fp) {
          sdp += 'a=fingerprint:' + fp.algorithm + ' ' + fp.value + '\r\n';
        });
        return sdp;
      };
      // Parses ICE information from SDP media section or sessionpart.
      // FIXME: for consistency with other functions this should only
      //   get the ice-ufrag and ice-pwd lines as input.
      SDPUtils.getIceParameters = function (mediaSection, sessionpart) {
        var lines = SDPUtils.splitLines(mediaSection);
        // Search in session part, too.
        lines = lines.concat(SDPUtils.splitLines(sessionpart));
        var iceParameters = {
          usernameFragment: lines.filter(function (line) {
            return line.indexOf('a=ice-ufrag:') === 0;
          })[0].substr(12),
          password: lines.filter(function (line) {
            return line.indexOf('a=ice-pwd:') === 0;
          })[0].substr(10)
        };
        return iceParameters;
      };

      // Serializes ICE parameters to SDP.
      SDPUtils.writeIceParameters = function (params) {
        return 'a=ice-ufrag:' + params.usernameFragment + '\r\n' + 'a=ice-pwd:' + params.password + '\r\n';
      };

      // Parses the SDP media section and returns RTCRtpParameters.
      SDPUtils.parseRtpParameters = function (mediaSection) {
        var description = {
          codecs: [],
          headerExtensions: [],
          fecMechanisms: [],
          rtcp: []
        };
        var lines = SDPUtils.splitLines(mediaSection);
        var mline = lines[0].split(' ');
        for (var i = 3; i < mline.length; i++) {
          // find all codecs from mline[3..]
          var pt = mline[i];
          var rtpmapline = SDPUtils.matchPrefix(mediaSection, 'a=rtpmap:' + pt + ' ')[0];
          if (rtpmapline) {
            var codec = SDPUtils.parseRtpMap(rtpmapline);
            var fmtps = SDPUtils.matchPrefix(mediaSection, 'a=fmtp:' + pt + ' ');
            // Only the first a=fmtp:<pt> is considered.
            codec.parameters = fmtps.length ? SDPUtils.parseFmtp(fmtps[0]) : {};
            codec.rtcpFeedback = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-fb:' + pt + ' ').map(SDPUtils.parseRtcpFb);
            description.codecs.push(codec);
            // parse FEC mechanisms from rtpmap lines.
            switch (codec.name.toUpperCase()) {
              case 'RED':
              case 'ULPFEC':
                description.fecMechanisms.push(codec.name.toUpperCase());
                break;
              default:
                // only RED and ULPFEC are recognized as FEC mechanisms.
                break;
            }
          }
        }
        SDPUtils.matchPrefix(mediaSection, 'a=extmap:').forEach(function (line) {
          description.headerExtensions.push(SDPUtils.parseExtmap(line));
        });
        // FIXME: parse rtcp.
        return description;
      };

      // Generates parts of the SDP media section describing the capabilities /
      // parameters.
      SDPUtils.writeRtpDescription = function (kind, caps) {
        var sdp = '';

        // Build the mline.
        sdp += 'm=' + kind + ' ';
        sdp += caps.codecs.length > 0 ? '9' : '0'; // reject if no codecs.
        sdp += ' UDP/TLS/RTP/SAVPF ';
        sdp += caps.codecs.map(function (codec) {
          if (codec.preferredPayloadType !== undefined) {
            return codec.preferredPayloadType;
          }
          return codec.payloadType;
        }).join(' ') + '\r\n';

        sdp += 'c=IN IP4 0.0.0.0\r\n';
        sdp += 'a=rtcp:9 IN IP4 0.0.0.0\r\n';

        // Add a=rtpmap lines for each codec. Also fmtp and rtcp-fb.
        caps.codecs.forEach(function (codec) {
          sdp += SDPUtils.writeRtpMap(codec);
          sdp += SDPUtils.writeFmtp(codec);
          sdp += SDPUtils.writeRtcpFb(codec);
        });
        var maxptime = 0;
        caps.codecs.forEach(function (codec) {
          if (codec.maxptime > maxptime) {
            maxptime = codec.maxptime;
          }
        });
        if (maxptime > 0) {
          sdp += 'a=maxptime:' + maxptime + '\r\n';
        }
        sdp += 'a=rtcp-mux\r\n';

        caps.headerExtensions.forEach(function (extension) {
          sdp += SDPUtils.writeExtmap(extension);
        });
        // FIXME: write fecMechanisms.
        return sdp;
      };

      // Parses the SDP media section and returns an array of
      // RTCRtpEncodingParameters.
      SDPUtils.parseRtpEncodingParameters = function (mediaSection) {
        var encodingParameters = [];
        var description = SDPUtils.parseRtpParameters(mediaSection);
        var hasRed = description.fecMechanisms.indexOf('RED') !== -1;
        var hasUlpfec = description.fecMechanisms.indexOf('ULPFEC') !== -1;

        // filter a=ssrc:... cname:, ignore PlanB-msid
        var ssrcs = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:').map(function (line) {
          return SDPUtils.parseSsrcMedia(line);
        }).filter(function (parts) {
          return parts.attribute === 'cname';
        });
        var primarySsrc = ssrcs.length > 0 && ssrcs[0].ssrc;
        var secondarySsrc;

        var flows = SDPUtils.matchPrefix(mediaSection, 'a=ssrc-group:FID').map(function (line) {
          var parts = line.split(' ');
          parts.shift();
          return parts.map(function (part) {
            return parseInt(part, 10);
          });
        });
        if (flows.length > 0 && flows[0].length > 1 && flows[0][0] === primarySsrc) {
          secondarySsrc = flows[0][1];
        }

        description.codecs.forEach(function (codec) {
          if (codec.name.toUpperCase() === 'RTX' && codec.parameters.apt) {
            var encParam = {
              ssrc: primarySsrc,
              codecPayloadType: parseInt(codec.parameters.apt, 10),
              rtx: {
                ssrc: secondarySsrc
              }
            };
            encodingParameters.push(encParam);
            if (hasRed) {
              encParam = JSON.parse(JSON.stringify(encParam));
              encParam.fec = {
                ssrc: secondarySsrc,
                mechanism: hasUlpfec ? 'red+ulpfec' : 'red'
              };
              encodingParameters.push(encParam);
            }
          }
        });
        if (encodingParameters.length === 0 && primarySsrc) {
          encodingParameters.push({
            ssrc: primarySsrc
          });
        }

        // we support both b=AS and b=TIAS but interpret AS as TIAS.
        var bandwidth = SDPUtils.matchPrefix(mediaSection, 'b=');
        if (bandwidth.length) {
          if (bandwidth[0].indexOf('b=TIAS:') === 0) {
            bandwidth = parseInt(bandwidth[0].substr(7), 10);
          } else if (bandwidth[0].indexOf('b=AS:') === 0) {
            // use formula from JSEP to convert b=AS to TIAS value.
            bandwidth = parseInt(bandwidth[0].substr(5), 10) * 1000 * 0.95 - 50 * 40 * 8;
          } else {
            bandwidth = undefined;
          }
          encodingParameters.forEach(function (params) {
            params.maxBitrate = bandwidth;
          });
        }
        return encodingParameters;
      };

      // parses http://draft.ortc.org/#rtcrtcpparameters*
      SDPUtils.parseRtcpParameters = function (mediaSection) {
        var rtcpParameters = {};

        var cname;
        // Gets the first SSRC. Note that with RTX there might be multiple
        // SSRCs.
        var remoteSsrc = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:').map(function (line) {
          return SDPUtils.parseSsrcMedia(line);
        }).filter(function (obj) {
          return obj.attribute === 'cname';
        })[0];
        if (remoteSsrc) {
          rtcpParameters.cname = remoteSsrc.value;
          rtcpParameters.ssrc = remoteSsrc.ssrc;
        }

        // Edge uses the compound attribute instead of reducedSize
        // compound is !reducedSize
        var rsize = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-rsize');
        rtcpParameters.reducedSize = rsize.length > 0;
        rtcpParameters.compound = rsize.length === 0;

        // parses the rtcp-mux attrіbute.
        // Note that Edge does not support unmuxed RTCP.
        var mux = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-mux');
        rtcpParameters.mux = mux.length > 0;

        return rtcpParameters;
      };

      // parses either a=msid: or a=ssrc:... msid lines and returns
      // the id of the MediaStream and MediaStreamTrack.
      SDPUtils.parseMsid = function (mediaSection) {
        var parts;
        var spec = SDPUtils.matchPrefix(mediaSection, 'a=msid:');
        if (spec.length === 1) {
          parts = spec[0].substr(7).split(' ');
          return { stream: parts[0], track: parts[1] };
        }
        var planB = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:').map(function (line) {
          return SDPUtils.parseSsrcMedia(line);
        }).filter(function (parts) {
          return parts.attribute === 'msid';
        });
        if (planB.length > 0) {
          parts = planB[0].value.split(' ');
          return { stream: parts[0], track: parts[1] };
        }
      };

      // Generate a session ID for SDP.
      // https://tools.ietf.org/html/draft-ietf-rtcweb-jsep-20#section-5.2.1
      // recommends using a cryptographically random +ve 64-bit value
      // but right now this should be acceptable and within the right range
      SDPUtils.generateSessionId = function () {
        return Math.random().toString().substr(2, 21);
      };

      // Write boilder plate for start of SDP
      // sessId argument is optional - if not supplied it will
      // be generated randomly
      // sessVersion is optional and defaults to 2
      SDPUtils.writeSessionBoilerplate = function (sessId, sessVer) {
        var sessionId;
        var version = sessVer !== undefined ? sessVer : 2;
        if (sessId) {
          sessionId = sessId;
        } else {
          sessionId = SDPUtils.generateSessionId();
        }
        // FIXME: sess-id should be an NTP timestamp.
        return 'v=0\r\n' + 'o=thisisadapterortc ' + sessionId + ' ' + version + ' IN IP4 127.0.0.1\r\n' + 's=-\r\n' + 't=0 0\r\n';
      };

      SDPUtils.writeMediaSection = function (transceiver, caps, type, stream) {
        var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps);

        // Map ICE parameters (ufrag, pwd) to SDP.
        sdp += SDPUtils.writeIceParameters(transceiver.iceGatherer.getLocalParameters());

        // Map DTLS parameters to SDP.
        sdp += SDPUtils.writeDtlsParameters(transceiver.dtlsTransport.getLocalParameters(), type === 'offer' ? 'actpass' : 'active');

        sdp += 'a=mid:' + transceiver.mid + '\r\n';

        if (transceiver.direction) {
          sdp += 'a=' + transceiver.direction + '\r\n';
        } else if (transceiver.rtpSender && transceiver.rtpReceiver) {
          sdp += 'a=sendrecv\r\n';
        } else if (transceiver.rtpSender) {
          sdp += 'a=sendonly\r\n';
        } else if (transceiver.rtpReceiver) {
          sdp += 'a=recvonly\r\n';
        } else {
          sdp += 'a=inactive\r\n';
        }

        if (transceiver.rtpSender) {
          // spec.
          var msid = 'msid:' + stream.id + ' ' + transceiver.rtpSender.track.id + '\r\n';
          sdp += 'a=' + msid;

          // for Chrome.
          sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc + ' ' + msid;
          if (transceiver.sendEncodingParameters[0].rtx) {
            sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc + ' ' + msid;
            sdp += 'a=ssrc-group:FID ' + transceiver.sendEncodingParameters[0].ssrc + ' ' + transceiver.sendEncodingParameters[0].rtx.ssrc + '\r\n';
          }
        }
        // FIXME: this should be written by writeRtpDescription.
        sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc + ' cname:' + SDPUtils.localCName + '\r\n';
        if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) {
          sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc + ' cname:' + SDPUtils.localCName + '\r\n';
        }
        return sdp;
      };

      // Gets the direction from the mediaSection or the sessionpart.
      SDPUtils.getDirection = function (mediaSection, sessionpart) {
        // Look for sendrecv, sendonly, recvonly, inactive, default to sendrecv.
        var lines = SDPUtils.splitLines(mediaSection);
        for (var i = 0; i < lines.length; i++) {
          switch (lines[i]) {
            case 'a=sendrecv':
            case 'a=sendonly':
            case 'a=recvonly':
            case 'a=inactive':
              return lines[i].substr(2);
            default:
            // FIXME: What should happen here?
          }
        }
        if (sessionpart) {
          return SDPUtils.getDirection(sessionpart);
        }
        return 'sendrecv';
      };

      SDPUtils.getKind = function (mediaSection) {
        var lines = SDPUtils.splitLines(mediaSection);
        var mline = lines[0].split(' ');
        return mline[0].substr(2);
      };

      SDPUtils.isRejected = function (mediaSection) {
        return mediaSection.split(' ', 2)[1] === '0';
      };

      SDPUtils.parseMLine = function (mediaSection) {
        var lines = SDPUtils.splitLines(mediaSection);
        var parts = lines[0].substr(2).split(' ');
        return {
          kind: parts[0],
          port: parseInt(parts[1], 10),
          protocol: parts[2],
          fmt: parts.slice(3).join(' ')
        };
      };

      SDPUtils.parseOLine = function (mediaSection) {
        var line = SDPUtils.matchPrefix(mediaSection, 'o=')[0];
        var parts = line.substr(2).split(' ');
        return {
          username: parts[0],
          sessionId: parts[1],
          sessionVersion: parseInt(parts[2], 10),
          netType: parts[3],
          addressType: parts[4],
          address: parts[5]
        };
      };

      // Expose public methods.
      if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object') {
        module.exports = SDPUtils;
      }
    }, {}], 3: [function (require, module, exports) {
      (function (global) {
        /*
         *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
         *
         *  Use of this source code is governed by a BSD-style license
         *  that can be found in the LICENSE file in the root of the source
         *  tree.
         */
        /* eslint-env node */

        'use strict';

        var adapterFactory = require('./adapter_factory.js');
        module.exports = adapterFactory({ window: global.window });
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, { "./adapter_factory.js": 4 }], 4: [function (require, module, exports) {
      /*
       *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
       *
       *  Use of this source code is governed by a BSD-style license
       *  that can be found in the LICENSE file in the root of the source
       *  tree.
       */
      /* eslint-env node */

      'use strict';

      var utils = require('./utils');
      // Shimming starts here.
      module.exports = function (dependencies, opts) {
        var window = dependencies && dependencies.window;

        var options = {
          shimChrome: true,
          shimFirefox: true,
          shimEdge: true,
          shimSafari: true
        };

        for (var key in opts) {
          if (hasOwnProperty.call(opts, key)) {
            options[key] = opts[key];
          }
        }

        // Utils.
        var logging = utils.log;
        var browserDetails = utils.detectBrowser(window);

        // Uncomment the line below if you want logging to occur, including logging
        // for the switch statement below. Can also be turned on in the browser via
        // adapter.disableLog(false), but then logging from the switch statement below
        // will not appear.
        // require('./utils').disableLog(false);

        // Browser shims.
        var chromeShim = require('./chrome/chrome_shim') || null;
        var edgeShim = require('./edge/edge_shim') || null;
        var firefoxShim = require('./firefox/firefox_shim') || null;
        var safariShim = require('./safari/safari_shim') || null;
        var commonShim = require('./common_shim') || null;

        // Export to the adapter global object visible in the browser.
        var adapter = {
          browserDetails: browserDetails,
          commonShim: commonShim,
          extractVersion: utils.extractVersion,
          disableLog: utils.disableLog,
          disableWarnings: utils.disableWarnings
        };

        // Shim browser if found.
        switch (browserDetails.browser) {
          case 'chrome':
            if (!chromeShim || !chromeShim.shimPeerConnection || !options.shimChrome) {
              logging('Chrome shim is not included in this adapter release.');
              return adapter;
            }
            logging('adapter.js shimming chrome.');
            // Export to the adapter global object visible in the browser.
            adapter.browserShim = chromeShim;
            commonShim.shimCreateObjectURL(window);

            chromeShim.shimGetUserMedia(window);
            chromeShim.shimMediaStream(window);
            chromeShim.shimSourceObject(window);
            chromeShim.shimPeerConnection(window);
            chromeShim.shimOnTrack(window);
            chromeShim.shimAddTrackRemoveTrack(window);
            chromeShim.shimGetSendersWithDtmf(window);

            commonShim.shimRTCIceCandidate(window);
            commonShim.shimMaxMessageSize(window);
            commonShim.shimSendThrowTypeError(window);
            break;
          case 'firefox':
            if (!firefoxShim || !firefoxShim.shimPeerConnection || !options.shimFirefox) {
              logging('Firefox shim is not included in this adapter release.');
              return adapter;
            }
            logging('adapter.js shimming firefox.');
            // Export to the adapter global object visible in the browser.
            adapter.browserShim = firefoxShim;
            commonShim.shimCreateObjectURL(window);

            firefoxShim.shimGetUserMedia(window);
            firefoxShim.shimSourceObject(window);
            firefoxShim.shimPeerConnection(window);
            firefoxShim.shimOnTrack(window);
            firefoxShim.shimRemoveStream(window);

            commonShim.shimRTCIceCandidate(window);
            commonShim.shimMaxMessageSize(window);
            commonShim.shimSendThrowTypeError(window);
            break;
          case 'edge':
            if (!edgeShim || !edgeShim.shimPeerConnection || !options.shimEdge) {
              logging('MS edge shim is not included in this adapter release.');
              return adapter;
            }
            logging('adapter.js shimming edge.');
            // Export to the adapter global object visible in the browser.
            adapter.browserShim = edgeShim;
            commonShim.shimCreateObjectURL(window);

            edgeShim.shimGetUserMedia(window);
            edgeShim.shimPeerConnection(window);
            edgeShim.shimReplaceTrack(window);

            // the edge shim implements the full RTCIceCandidate object.

            commonShim.shimMaxMessageSize(window);
            commonShim.shimSendThrowTypeError(window);
            break;
          case 'safari':
            if (!safariShim || !options.shimSafari) {
              logging('Safari shim is not included in this adapter release.');
              return adapter;
            }
            logging('adapter.js shimming safari.');
            // Export to the adapter global object visible in the browser.
            adapter.browserShim = safariShim;
            commonShim.shimCreateObjectURL(window);

            safariShim.shimRTCIceServerUrls(window);
            safariShim.shimCallbacksAPI(window);
            safariShim.shimLocalStreamsAPI(window);
            safariShim.shimRemoteStreamsAPI(window);
            safariShim.shimTrackEventTransceiver(window);
            safariShim.shimGetUserMedia(window);
            safariShim.shimCreateOfferLegacy(window);

            commonShim.shimRTCIceCandidate(window);
            commonShim.shimMaxMessageSize(window);
            commonShim.shimSendThrowTypeError(window);
            break;
          default:
            logging('Unsupported browser!');
            break;
        }

        return adapter;
      };
    }, { "./chrome/chrome_shim": 5, "./common_shim": 7, "./edge/edge_shim": 8, "./firefox/firefox_shim": 10, "./safari/safari_shim": 12, "./utils": 13 }], 5: [function (require, module, exports) {

      /*
       *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
       *
       *  Use of this source code is governed by a BSD-style license
       *  that can be found in the LICENSE file in the root of the source
       *  tree.
       */
      /* eslint-env node */
      'use strict';

      var utils = require('../utils.js');
      var logging = utils.log;

      module.exports = {
        shimGetUserMedia: require('./getusermedia'),
        shimMediaStream: function shimMediaStream(window) {
          window.MediaStream = window.MediaStream || window.webkitMediaStream;
        },

        shimOnTrack: function shimOnTrack(window) {
          if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && window.RTCPeerConnection && !('ontrack' in window.RTCPeerConnection.prototype)) {
            Object.defineProperty(window.RTCPeerConnection.prototype, 'ontrack', {
              get: function get() {
                return this._ontrack;
              },
              set: function set(f) {
                if (this._ontrack) {
                  this.removeEventListener('track', this._ontrack);
                }
                this.addEventListener('track', this._ontrack = f);
              }
            });
            var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
            window.RTCPeerConnection.prototype.setRemoteDescription = function () {
              var pc = this;
              if (!pc._ontrackpoly) {
                pc._ontrackpoly = function (e) {
                  // onaddstream does not fire when a track is added to an existing
                  // stream. But stream.onaddtrack is implemented so we use that.
                  e.stream.addEventListener('addtrack', function (te) {
                    var receiver;
                    if (window.RTCPeerConnection.prototype.getReceivers) {
                      receiver = pc.getReceivers().find(function (r) {
                        return r.track && r.track.id === te.track.id;
                      });
                    } else {
                      receiver = { track: te.track };
                    }

                    var event = new Event('track');
                    event.track = te.track;
                    event.receiver = receiver;
                    event.transceiver = { receiver: receiver };
                    event.streams = [e.stream];
                    pc.dispatchEvent(event);
                  });
                  e.stream.getTracks().forEach(function (track) {
                    var receiver;
                    if (window.RTCPeerConnection.prototype.getReceivers) {
                      receiver = pc.getReceivers().find(function (r) {
                        return r.track && r.track.id === track.id;
                      });
                    } else {
                      receiver = { track: track };
                    }
                    var event = new Event('track');
                    event.track = track;
                    event.receiver = receiver;
                    event.transceiver = { receiver: receiver };
                    event.streams = [e.stream];
                    pc.dispatchEvent(event);
                  });
                };
                pc.addEventListener('addstream', pc._ontrackpoly);
              }
              return origSetRemoteDescription.apply(pc, arguments);
            };
          } else if (!('RTCRtpTransceiver' in window)) {
            utils.wrapPeerConnectionEvent(window, 'track', function (e) {
              if (!e.transceiver) {
                e.transceiver = { receiver: e.receiver };
              }
              return e;
            });
          }
        },

        shimGetSendersWithDtmf: function shimGetSendersWithDtmf(window) {
          // Overrides addTrack/removeTrack, depends on shimAddTrackRemoveTrack.
          if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && window.RTCPeerConnection && !('getSenders' in window.RTCPeerConnection.prototype) && 'createDTMFSender' in window.RTCPeerConnection.prototype) {
            var shimSenderWithDtmf = function shimSenderWithDtmf(pc, track) {
              return {
                track: track,
                get dtmf() {
                  if (this._dtmf === undefined) {
                    if (track.kind === 'audio') {
                      this._dtmf = pc.createDTMFSender(track);
                    } else {
                      this._dtmf = null;
                    }
                  }
                  return this._dtmf;
                },
                _pc: pc
              };
            };

            // augment addTrack when getSenders is not available.
            if (!window.RTCPeerConnection.prototype.getSenders) {
              window.RTCPeerConnection.prototype.getSenders = function () {
                this._senders = this._senders || [];
                return this._senders.slice(); // return a copy of the internal state.
              };
              var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
              window.RTCPeerConnection.prototype.addTrack = function (track, stream) {
                var pc = this;
                var sender = origAddTrack.apply(pc, arguments);
                if (!sender) {
                  sender = shimSenderWithDtmf(pc, track);
                  pc._senders.push(sender);
                }
                return sender;
              };

              var origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
              window.RTCPeerConnection.prototype.removeTrack = function (sender) {
                var pc = this;
                origRemoveTrack.apply(pc, arguments);
                var idx = pc._senders.indexOf(sender);
                if (idx !== -1) {
                  pc._senders.splice(idx, 1);
                }
              };
            }
            var origAddStream = window.RTCPeerConnection.prototype.addStream;
            window.RTCPeerConnection.prototype.addStream = function (stream) {
              var pc = this;
              pc._senders = pc._senders || [];
              origAddStream.apply(pc, [stream]);
              stream.getTracks().forEach(function (track) {
                pc._senders.push(shimSenderWithDtmf(pc, track));
              });
            };

            var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
            window.RTCPeerConnection.prototype.removeStream = function (stream) {
              var pc = this;
              pc._senders = pc._senders || [];
              origRemoveStream.apply(pc, [stream]);

              stream.getTracks().forEach(function (track) {
                var sender = pc._senders.find(function (s) {
                  return s.track === track;
                });
                if (sender) {
                  pc._senders.splice(pc._senders.indexOf(sender), 1); // remove sender
                }
              });
            };
          } else if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && window.RTCPeerConnection && 'getSenders' in window.RTCPeerConnection.prototype && 'createDTMFSender' in window.RTCPeerConnection.prototype && window.RTCRtpSender && !('dtmf' in window.RTCRtpSender.prototype)) {
            var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
            window.RTCPeerConnection.prototype.getSenders = function () {
              var pc = this;
              var senders = origGetSenders.apply(pc, []);
              senders.forEach(function (sender) {
                sender._pc = pc;
              });
              return senders;
            };

            Object.defineProperty(window.RTCRtpSender.prototype, 'dtmf', {
              get: function get() {
                if (this._dtmf === undefined) {
                  if (this.track.kind === 'audio') {
                    this._dtmf = this._pc.createDTMFSender(this.track);
                  } else {
                    this._dtmf = null;
                  }
                }
                return this._dtmf;
              }
            });
          }
        },

        shimSourceObject: function shimSourceObject(window) {
          var URL = window && window.URL;

          if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
            if (window.HTMLMediaElement && !('srcObject' in window.HTMLMediaElement.prototype)) {
              // Shim the srcObject property, once, when HTMLMediaElement is found.
              Object.defineProperty(window.HTMLMediaElement.prototype, 'srcObject', {
                get: function get() {
                  return this._srcObject;
                },
                set: function set(stream) {
                  var self = this;
                  // Use _srcObject as a private property for this shim
                  this._srcObject = stream;
                  if (this.src) {
                    URL.revokeObjectURL(this.src);
                  }

                  if (!stream) {
                    this.src = '';
                    return undefined;
                  }
                  this.src = URL.createObjectURL(stream);
                  // We need to recreate the blob url when a track is added or
                  // removed. Doing it manually since we want to avoid a recursion.
                  stream.addEventListener('addtrack', function () {
                    if (self.src) {
                      URL.revokeObjectURL(self.src);
                    }
                    self.src = URL.createObjectURL(stream);
                  });
                  stream.addEventListener('removetrack', function () {
                    if (self.src) {
                      URL.revokeObjectURL(self.src);
                    }
                    self.src = URL.createObjectURL(stream);
                  });
                }
              });
            }
          }
        },

        shimAddTrackRemoveTrackWithNative: function shimAddTrackRemoveTrackWithNative(window) {
          // shim addTrack/removeTrack with native variants in order to make
          // the interactions with legacy getLocalStreams behave as in other browsers.
          // Keeps a mapping stream.id => [stream, rtpsenders...]
          window.RTCPeerConnection.prototype.getLocalStreams = function () {
            var pc = this;
            this._shimmedLocalStreams = this._shimmedLocalStreams || {};
            return Object.keys(this._shimmedLocalStreams).map(function (streamId) {
              return pc._shimmedLocalStreams[streamId][0];
            });
          };

          var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
          window.RTCPeerConnection.prototype.addTrack = function (track, stream) {
            if (!stream) {
              return origAddTrack.apply(this, arguments);
            }
            this._shimmedLocalStreams = this._shimmedLocalStreams || {};

            var sender = origAddTrack.apply(this, arguments);
            if (!this._shimmedLocalStreams[stream.id]) {
              this._shimmedLocalStreams[stream.id] = [stream, sender];
            } else if (this._shimmedLocalStreams[stream.id].indexOf(sender) === -1) {
              this._shimmedLocalStreams[stream.id].push(sender);
            }
            return sender;
          };

          var origAddStream = window.RTCPeerConnection.prototype.addStream;
          window.RTCPeerConnection.prototype.addStream = function (stream) {
            var pc = this;
            this._shimmedLocalStreams = this._shimmedLocalStreams || {};

            stream.getTracks().forEach(function (track) {
              var alreadyExists = pc.getSenders().find(function (s) {
                return s.track === track;
              });
              if (alreadyExists) {
                throw new DOMException('Track already exists.', 'InvalidAccessError');
              }
            });
            var existingSenders = pc.getSenders();
            origAddStream.apply(this, arguments);
            var newSenders = pc.getSenders().filter(function (newSender) {
              return existingSenders.indexOf(newSender) === -1;
            });
            this._shimmedLocalStreams[stream.id] = [stream].concat(newSenders);
          };

          var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
          window.RTCPeerConnection.prototype.removeStream = function (stream) {
            this._shimmedLocalStreams = this._shimmedLocalStreams || {};
            delete this._shimmedLocalStreams[stream.id];
            return origRemoveStream.apply(this, arguments);
          };

          var origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
          window.RTCPeerConnection.prototype.removeTrack = function (sender) {
            var pc = this;
            this._shimmedLocalStreams = this._shimmedLocalStreams || {};
            if (sender) {
              Object.keys(this._shimmedLocalStreams).forEach(function (streamId) {
                var idx = pc._shimmedLocalStreams[streamId].indexOf(sender);
                if (idx !== -1) {
                  pc._shimmedLocalStreams[streamId].splice(idx, 1);
                }
                if (pc._shimmedLocalStreams[streamId].length === 1) {
                  delete pc._shimmedLocalStreams[streamId];
                }
              });
            }
            return origRemoveTrack.apply(this, arguments);
          };
        },

        shimAddTrackRemoveTrack: function shimAddTrackRemoveTrack(window) {
          var browserDetails = utils.detectBrowser(window);
          // shim addTrack and removeTrack.
          if (window.RTCPeerConnection.prototype.addTrack && browserDetails.version >= 65) {
            return this.shimAddTrackRemoveTrackWithNative(window);
          }

          // also shim pc.getLocalStreams when addTrack is shimmed
          // to return the original streams.
          var origGetLocalStreams = window.RTCPeerConnection.prototype.getLocalStreams;
          window.RTCPeerConnection.prototype.getLocalStreams = function () {
            var pc = this;
            var nativeStreams = origGetLocalStreams.apply(this);
            pc._reverseStreams = pc._reverseStreams || {};
            return nativeStreams.map(function (stream) {
              return pc._reverseStreams[stream.id];
            });
          };

          var origAddStream = window.RTCPeerConnection.prototype.addStream;
          window.RTCPeerConnection.prototype.addStream = function (stream) {
            var pc = this;
            pc._streams = pc._streams || {};
            pc._reverseStreams = pc._reverseStreams || {};

            stream.getTracks().forEach(function (track) {
              var alreadyExists = pc.getSenders().find(function (s) {
                return s.track === track;
              });
              if (alreadyExists) {
                throw new DOMException('Track already exists.', 'InvalidAccessError');
              }
            });
            // Add identity mapping for consistency with addTrack.
            // Unless this is being used with a stream from addTrack.
            if (!pc._reverseStreams[stream.id]) {
              var newStream = new window.MediaStream(stream.getTracks());
              pc._streams[stream.id] = newStream;
              pc._reverseStreams[newStream.id] = stream;
              stream = newStream;
            }
            origAddStream.apply(pc, [stream]);
          };

          var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
          window.RTCPeerConnection.prototype.removeStream = function (stream) {
            var pc = this;
            pc._streams = pc._streams || {};
            pc._reverseStreams = pc._reverseStreams || {};

            origRemoveStream.apply(pc, [pc._streams[stream.id] || stream]);
            delete pc._reverseStreams[pc._streams[stream.id] ? pc._streams[stream.id].id : stream.id];
            delete pc._streams[stream.id];
          };

          window.RTCPeerConnection.prototype.addTrack = function (track, stream) {
            var pc = this;
            if (pc.signalingState === 'closed') {
              throw new DOMException('The RTCPeerConnection\'s signalingState is \'closed\'.', 'InvalidStateError');
            }
            var streams = [].slice.call(arguments, 1);
            if (streams.length !== 1 || !streams[0].getTracks().find(function (t) {
              return t === track;
            })) {
              // this is not fully correct but all we can manage without
              // [[associated MediaStreams]] internal slot.
              throw new DOMException('The adapter.js addTrack polyfill only supports a single ' + ' stream which is associated with the specified track.', 'NotSupportedError');
            }

            var alreadyExists = pc.getSenders().find(function (s) {
              return s.track === track;
            });
            if (alreadyExists) {
              throw new DOMException('Track already exists.', 'InvalidAccessError');
            }

            pc._streams = pc._streams || {};
            pc._reverseStreams = pc._reverseStreams || {};
            var oldStream = pc._streams[stream.id];
            if (oldStream) {
              // this is using odd Chrome behaviour, use with caution:
              // https://bugs.chromium.org/p/webrtc/issues/detail?id=7815
              // Note: we rely on the high-level addTrack/dtmf shim to
              // create the sender with a dtmf sender.
              oldStream.addTrack(track);

              // Trigger ONN async.
              Promise.resolve().then(function () {
                pc.dispatchEvent(new Event('negotiationneeded'));
              });
            } else {
              var newStream = new window.MediaStream([track]);
              pc._streams[stream.id] = newStream;
              pc._reverseStreams[newStream.id] = stream;
              pc.addStream(newStream);
            }
            return pc.getSenders().find(function (s) {
              return s.track === track;
            });
          };

          // replace the internal stream id with the external one and
          // vice versa.
          function replaceInternalStreamId(pc, description) {
            var sdp = description.sdp;
            Object.keys(pc._reverseStreams || []).forEach(function (internalId) {
              var externalStream = pc._reverseStreams[internalId];
              var internalStream = pc._streams[externalStream.id];
              sdp = sdp.replace(new RegExp(internalStream.id, 'g'), externalStream.id);
            });
            return new RTCSessionDescription({
              type: description.type,
              sdp: sdp
            });
          }
          function replaceExternalStreamId(pc, description) {
            var sdp = description.sdp;
            Object.keys(pc._reverseStreams || []).forEach(function (internalId) {
              var externalStream = pc._reverseStreams[internalId];
              var internalStream = pc._streams[externalStream.id];
              sdp = sdp.replace(new RegExp(externalStream.id, 'g'), internalStream.id);
            });
            return new RTCSessionDescription({
              type: description.type,
              sdp: sdp
            });
          }
          ['createOffer', 'createAnswer'].forEach(function (method) {
            var nativeMethod = window.RTCPeerConnection.prototype[method];
            window.RTCPeerConnection.prototype[method] = function () {
              var pc = this;
              var args = arguments;
              var isLegacyCall = arguments.length && typeof arguments[0] === 'function';
              if (isLegacyCall) {
                return nativeMethod.apply(pc, [function (description) {
                  var desc = replaceInternalStreamId(pc, description);
                  args[0].apply(null, [desc]);
                }, function (err) {
                  if (args[1]) {
                    args[1].apply(null, err);
                  }
                }, arguments[2]]);
              }
              return nativeMethod.apply(pc, arguments).then(function (description) {
                return replaceInternalStreamId(pc, description);
              });
            };
          });

          var origSetLocalDescription = window.RTCPeerConnection.prototype.setLocalDescription;
          window.RTCPeerConnection.prototype.setLocalDescription = function () {
            var pc = this;
            if (!arguments.length || !arguments[0].type) {
              return origSetLocalDescription.apply(pc, arguments);
            }
            arguments[0] = replaceExternalStreamId(pc, arguments[0]);
            return origSetLocalDescription.apply(pc, arguments);
          };

          // TODO: mangle getStats: https://w3c.github.io/webrtc-stats/#dom-rtcmediastreamstats-streamidentifier

          var origLocalDescription = Object.getOwnPropertyDescriptor(window.RTCPeerConnection.prototype, 'localDescription');
          Object.defineProperty(window.RTCPeerConnection.prototype, 'localDescription', {
            get: function get() {
              var pc = this;
              var description = origLocalDescription.get.apply(this);
              if (description.type === '') {
                return description;
              }
              return replaceInternalStreamId(pc, description);
            }
          });

          window.RTCPeerConnection.prototype.removeTrack = function (sender) {
            var pc = this;
            if (pc.signalingState === 'closed') {
              throw new DOMException('The RTCPeerConnection\'s signalingState is \'closed\'.', 'InvalidStateError');
            }
            // We can not yet check for sender instanceof RTCRtpSender
            // since we shim RTPSender. So we check if sender._pc is set.
            if (!sender._pc) {
              throw new DOMException('Argument 1 of RTCPeerConnection.removeTrack ' + 'does not implement interface RTCRtpSender.', 'TypeError');
            }
            var isLocal = sender._pc === pc;
            if (!isLocal) {
              throw new DOMException('Sender was not created by this connection.', 'InvalidAccessError');
            }

            // Search for the native stream the senders track belongs to.
            pc._streams = pc._streams || {};
            var stream;
            Object.keys(pc._streams).forEach(function (streamid) {
              var hasTrack = pc._streams[streamid].getTracks().find(function (track) {
                return sender.track === track;
              });
              if (hasTrack) {
                stream = pc._streams[streamid];
              }
            });

            if (stream) {
              if (stream.getTracks().length === 1) {
                // if this is the last track of the stream, remove the stream. This
                // takes care of any shimmed _senders.
                pc.removeStream(pc._reverseStreams[stream.id]);
              } else {
                // relying on the same odd chrome behaviour as above.
                stream.removeTrack(sender.track);
              }
              pc.dispatchEvent(new Event('negotiationneeded'));
            }
          };
        },

        shimPeerConnection: function shimPeerConnection(window) {
          var browserDetails = utils.detectBrowser(window);

          // The RTCPeerConnection object.
          if (!window.RTCPeerConnection && window.webkitRTCPeerConnection) {
            window.RTCPeerConnection = function (pcConfig, pcConstraints) {
              // Translate iceTransportPolicy to iceTransports,
              // see https://code.google.com/p/webrtc/issues/detail?id=4869
              // this was fixed in M56 along with unprefixing RTCPeerConnection.
              logging('PeerConnection');
              if (pcConfig && pcConfig.iceTransportPolicy) {
                pcConfig.iceTransports = pcConfig.iceTransportPolicy;
              }

              return new window.webkitRTCPeerConnection(pcConfig, pcConstraints);
            };
            window.RTCPeerConnection.prototype = window.webkitRTCPeerConnection.prototype;
            // wrap static methods. Currently just generateCertificate.
            if (window.webkitRTCPeerConnection.generateCertificate) {
              Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
                get: function get() {
                  return window.webkitRTCPeerConnection.generateCertificate;
                }
              });
            }
          } else {
            // migrate from non-spec RTCIceServer.url to RTCIceServer.urls
            var OrigPeerConnection = window.RTCPeerConnection;
            window.RTCPeerConnection = function (pcConfig, pcConstraints) {
              if (pcConfig && pcConfig.iceServers) {
                var newIceServers = [];
                for (var i = 0; i < pcConfig.iceServers.length; i++) {
                  var server = pcConfig.iceServers[i];
                  if (!server.hasOwnProperty('urls') && server.hasOwnProperty('url')) {
                    utils.deprecated('RTCIceServer.url', 'RTCIceServer.urls');
                    server = JSON.parse(JSON.stringify(server));
                    server.urls = server.url;
                    newIceServers.push(server);
                  } else {
                    newIceServers.push(pcConfig.iceServers[i]);
                  }
                }
                pcConfig.iceServers = newIceServers;
              }
              return new OrigPeerConnection(pcConfig, pcConstraints);
            };
            window.RTCPeerConnection.prototype = OrigPeerConnection.prototype;
            // wrap static methods. Currently just generateCertificate.
            Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
              get: function get() {
                return OrigPeerConnection.generateCertificate;
              }
            });
          }

          var origGetStats = window.RTCPeerConnection.prototype.getStats;
          window.RTCPeerConnection.prototype.getStats = function (selector, successCallback, errorCallback) {
            var pc = this;
            var args = arguments;

            // If selector is a function then we are in the old style stats so just
            // pass back the original getStats format to avoid breaking old users.
            if (arguments.length > 0 && typeof selector === 'function') {
              return origGetStats.apply(this, arguments);
            }

            // When spec-style getStats is supported, return those when called with
            // either no arguments or the selector argument is null.
            if (origGetStats.length === 0 && (arguments.length === 0 || typeof arguments[0] !== 'function')) {
              return origGetStats.apply(this, []);
            }

            var fixChromeStats_ = function fixChromeStats_(response) {
              var standardReport = {};
              var reports = response.result();
              reports.forEach(function (report) {
                var standardStats = {
                  id: report.id,
                  timestamp: report.timestamp,
                  type: {
                    localcandidate: 'local-candidate',
                    remotecandidate: 'remote-candidate'
                  }[report.type] || report.type
                };
                report.names().forEach(function (name) {
                  standardStats[name] = report.stat(name);
                });
                standardReport[standardStats.id] = standardStats;
              });

              return standardReport;
            };

            // shim getStats with maplike support
            var makeMapStats = function makeMapStats(stats) {
              return new Map(Object.keys(stats).map(function (key) {
                return [key, stats[key]];
              }));
            };

            if (arguments.length >= 2) {
              var successCallbackWrapper_ = function successCallbackWrapper_(response) {
                args[1](makeMapStats(fixChromeStats_(response)));
              };

              return origGetStats.apply(this, [successCallbackWrapper_, arguments[0]]);
            }

            // promise-support
            return new Promise(function (resolve, reject) {
              origGetStats.apply(pc, [function (response) {
                resolve(makeMapStats(fixChromeStats_(response)));
              }, reject]);
            }).then(successCallback, errorCallback);
          };

          // add promise support -- natively available in Chrome 51
          if (browserDetails.version < 51) {
            ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function (method) {
              var nativeMethod = window.RTCPeerConnection.prototype[method];
              window.RTCPeerConnection.prototype[method] = function () {
                var args = arguments;
                var pc = this;
                var promise = new Promise(function (resolve, reject) {
                  nativeMethod.apply(pc, [args[0], resolve, reject]);
                });
                if (args.length < 2) {
                  return promise;
                }
                return promise.then(function () {
                  args[1].apply(null, []);
                }, function (err) {
                  if (args.length >= 3) {
                    args[2].apply(null, [err]);
                  }
                });
              };
            });
          }

          // promise support for createOffer and createAnswer. Available (without
          // bugs) since M52: crbug/619289
          if (browserDetails.version < 52) {
            ['createOffer', 'createAnswer'].forEach(function (method) {
              var nativeMethod = window.RTCPeerConnection.prototype[method];
              window.RTCPeerConnection.prototype[method] = function () {
                var pc = this;
                if (arguments.length < 1 || arguments.length === 1 && _typeof(arguments[0]) === 'object') {
                  var opts = arguments.length === 1 ? arguments[0] : undefined;
                  return new Promise(function (resolve, reject) {
                    nativeMethod.apply(pc, [resolve, reject, opts]);
                  });
                }
                return nativeMethod.apply(this, arguments);
              };
            });
          }

          // shim implicit creation of RTCSessionDescription/RTCIceCandidate
          ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function (method) {
            var nativeMethod = window.RTCPeerConnection.prototype[method];
            window.RTCPeerConnection.prototype[method] = function () {
              arguments[0] = new (method === 'addIceCandidate' ? window.RTCIceCandidate : window.RTCSessionDescription)(arguments[0]);
              return nativeMethod.apply(this, arguments);
            };
          });

          // support for addIceCandidate(null or undefined)
          var nativeAddIceCandidate = window.RTCPeerConnection.prototype.addIceCandidate;
          window.RTCPeerConnection.prototype.addIceCandidate = function () {
            if (!arguments[0]) {
              if (arguments[1]) {
                arguments[1].apply(null);
              }
              return Promise.resolve();
            }
            return nativeAddIceCandidate.apply(this, arguments);
          };
        }
      };
    }, { "../utils.js": 13, "./getusermedia": 6 }], 6: [function (require, module, exports) {
      /*
       *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
       *
       *  Use of this source code is governed by a BSD-style license
       *  that can be found in the LICENSE file in the root of the source
       *  tree.
       */
      /* eslint-env node */
      'use strict';

      var utils = require('../utils.js');
      var logging = utils.log;

      // Expose public methods.
      module.exports = function (window) {
        var browserDetails = utils.detectBrowser(window);
        var navigator = window && window.navigator;

        var constraintsToChrome_ = function constraintsToChrome_(c) {
          if ((typeof c === "undefined" ? "undefined" : _typeof(c)) !== 'object' || c.mandatory || c.optional) {
            return c;
          }
          var cc = {};
          Object.keys(c).forEach(function (key) {
            if (key === 'require' || key === 'advanced' || key === 'mediaSource') {
              return;
            }
            var r = _typeof(c[key]) === 'object' ? c[key] : { ideal: c[key] };
            if (r.exact !== undefined && typeof r.exact === 'number') {
              r.min = r.max = r.exact;
            }
            var oldname_ = function oldname_(prefix, name) {
              if (prefix) {
                return prefix + name.charAt(0).toUpperCase() + name.slice(1);
              }
              return name === 'deviceId' ? 'sourceId' : name;
            };
            if (r.ideal !== undefined) {
              cc.optional = cc.optional || [];
              var oc = {};
              if (typeof r.ideal === 'number') {
                oc[oldname_('min', key)] = r.ideal;
                cc.optional.push(oc);
                oc = {};
                oc[oldname_('max', key)] = r.ideal;
                cc.optional.push(oc);
              } else {
                oc[oldname_('', key)] = r.ideal;
                cc.optional.push(oc);
              }
            }
            if (r.exact !== undefined && typeof r.exact !== 'number') {
              cc.mandatory = cc.mandatory || {};
              cc.mandatory[oldname_('', key)] = r.exact;
            } else {
              ['min', 'max'].forEach(function (mix) {
                if (r[mix] !== undefined) {
                  cc.mandatory = cc.mandatory || {};
                  cc.mandatory[oldname_(mix, key)] = r[mix];
                }
              });
            }
          });
          if (c.advanced) {
            cc.optional = (cc.optional || []).concat(c.advanced);
          }
          return cc;
        };

        var shimConstraints_ = function shimConstraints_(constraints, func) {
          if (browserDetails.version >= 61) {
            return func(constraints);
          }
          constraints = JSON.parse(JSON.stringify(constraints));
          if (constraints && _typeof(constraints.audio) === 'object') {
            var remap = function remap(obj, a, b) {
              if (a in obj && !(b in obj)) {
                obj[b] = obj[a];
                delete obj[a];
              }
            };
            constraints = JSON.parse(JSON.stringify(constraints));
            remap(constraints.audio, 'autoGainControl', 'googAutoGainControl');
            remap(constraints.audio, 'noiseSuppression', 'googNoiseSuppression');
            constraints.audio = constraintsToChrome_(constraints.audio);
          }
          if (constraints && _typeof(constraints.video) === 'object') {
            // Shim facingMode for mobile & surface pro.
            var face = constraints.video.facingMode;
            face = face && ((typeof face === "undefined" ? "undefined" : _typeof(face)) === 'object' ? face : { ideal: face });
            var getSupportedFacingModeLies = browserDetails.version < 66;

            if (face && (face.exact === 'user' || face.exact === 'environment' || face.ideal === 'user' || face.ideal === 'environment') && !(navigator.mediaDevices.getSupportedConstraints && navigator.mediaDevices.getSupportedConstraints().facingMode && !getSupportedFacingModeLies)) {
              delete constraints.video.facingMode;
              var matches;
              if (face.exact === 'environment' || face.ideal === 'environment') {
                matches = ['back', 'rear'];
              } else if (face.exact === 'user' || face.ideal === 'user') {
                matches = ['front'];
              }
              if (matches) {
                // Look for matches in label, or use last cam for back (typical).
                return navigator.mediaDevices.enumerateDevices().then(function (devices) {
                  devices = devices.filter(function (d) {
                    return d.kind === 'videoinput';
                  });
                  var dev = devices.find(function (d) {
                    return matches.some(function (match) {
                      return d.label.toLowerCase().indexOf(match) !== -1;
                    });
                  });
                  if (!dev && devices.length && matches.indexOf('back') !== -1) {
                    dev = devices[devices.length - 1]; // more likely the back cam
                  }
                  if (dev) {
                    constraints.video.deviceId = face.exact ? { exact: dev.deviceId } : { ideal: dev.deviceId };
                  }
                  constraints.video = constraintsToChrome_(constraints.video);
                  logging('chrome: ' + JSON.stringify(constraints));
                  return func(constraints);
                });
              }
            }
            constraints.video = constraintsToChrome_(constraints.video);
          }
          logging('chrome: ' + JSON.stringify(constraints));
          return func(constraints);
        };

        var shimError_ = function shimError_(e) {
          return {
            name: {
              PermissionDeniedError: 'NotAllowedError',
              PermissionDismissedError: 'NotAllowedError',
              InvalidStateError: 'NotAllowedError',
              DevicesNotFoundError: 'NotFoundError',
              ConstraintNotSatisfiedError: 'OverconstrainedError',
              TrackStartError: 'NotReadableError',
              MediaDeviceFailedDueToShutdown: 'NotAllowedError',
              MediaDeviceKillSwitchOn: 'NotAllowedError',
              TabCaptureError: 'AbortError',
              ScreenCaptureError: 'AbortError',
              DeviceCaptureError: 'AbortError'
            }[e.name] || e.name,
            message: e.message,
            constraint: e.constraintName,
            toString: function toString() {
              return this.name + (this.message && ': ') + this.message;
            }
          };
        };

        var getUserMedia_ = function getUserMedia_(constraints, onSuccess, onError) {
          shimConstraints_(constraints, function (c) {
            navigator.webkitGetUserMedia(c, onSuccess, function (e) {
              if (onError) {
                onError(shimError_(e));
              }
            });
          });
        };

        navigator.getUserMedia = getUserMedia_;

        // Returns the result of getUserMedia as a Promise.
        var getUserMediaPromise_ = function getUserMediaPromise_(constraints) {
          return new Promise(function (resolve, reject) {
            navigator.getUserMedia(constraints, resolve, reject);
          });
        };

        if (!navigator.mediaDevices) {
          navigator.mediaDevices = {
            getUserMedia: getUserMediaPromise_,
            enumerateDevices: function enumerateDevices() {
              return new Promise(function (resolve) {
                var kinds = { audio: 'audioinput', video: 'videoinput' };
                return window.MediaStreamTrack.getSources(function (devices) {
                  resolve(devices.map(function (device) {
                    return { label: device.label,
                      kind: kinds[device.kind],
                      deviceId: device.id,
                      groupId: '' };
                  }));
                });
              });
            },
            getSupportedConstraints: function getSupportedConstraints() {
              return {
                deviceId: true, echoCancellation: true, facingMode: true,
                frameRate: true, height: true, width: true
              };
            }
          };
        }

        // A shim for getUserMedia method on the mediaDevices object.
        // TODO(KaptenJansson) remove once implemented in Chrome stable.
        if (!navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia = function (constraints) {
            return getUserMediaPromise_(constraints);
          };
        } else {
          // Even though Chrome 45 has navigator.mediaDevices and a getUserMedia
          // function which returns a Promise, it does not accept spec-style
          // constraints.
          var origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
          navigator.mediaDevices.getUserMedia = function (cs) {
            return shimConstraints_(cs, function (c) {
              return origGetUserMedia(c).then(function (stream) {
                if (c.audio && !stream.getAudioTracks().length || c.video && !stream.getVideoTracks().length) {
                  stream.getTracks().forEach(function (track) {
                    track.stop();
                  });
                  throw new DOMException('', 'NotFoundError');
                }
                return stream;
              }, function (e) {
                return Promise.reject(shimError_(e));
              });
            });
          };
        }

        // Dummy devicechange event methods.
        // TODO(KaptenJansson) remove once implemented in Chrome stable.
        if (typeof navigator.mediaDevices.addEventListener === 'undefined') {
          navigator.mediaDevices.addEventListener = function () {
            logging('Dummy mediaDevices.addEventListener called.');
          };
        }
        if (typeof navigator.mediaDevices.removeEventListener === 'undefined') {
          navigator.mediaDevices.removeEventListener = function () {
            logging('Dummy mediaDevices.removeEventListener called.');
          };
        }
      };
    }, { "../utils.js": 13 }], 7: [function (require, module, exports) {
      /*
       *  Copyright (c) 2017 The WebRTC project authors. All Rights Reserved.
       *
       *  Use of this source code is governed by a BSD-style license
       *  that can be found in the LICENSE file in the root of the source
       *  tree.
       */
      /* eslint-env node */
      'use strict';

      var SDPUtils = require('sdp');
      var utils = require('./utils');

      module.exports = {
        shimRTCIceCandidate: function shimRTCIceCandidate(window) {
          // foundation is arbitrarily chosen as an indicator for full support for
          // https://w3c.github.io/webrtc-pc/#rtcicecandidate-interface
          if (!window.RTCIceCandidate || window.RTCIceCandidate && 'foundation' in window.RTCIceCandidate.prototype) {
            return;
          }

          var NativeRTCIceCandidate = window.RTCIceCandidate;
          window.RTCIceCandidate = function (args) {
            // Remove the a= which shouldn't be part of the candidate string.
            if ((typeof args === "undefined" ? "undefined" : _typeof(args)) === 'object' && args.candidate && args.candidate.indexOf('a=') === 0) {
              args = JSON.parse(JSON.stringify(args));
              args.candidate = args.candidate.substr(2);
            }

            if (args.candidate && args.candidate.length) {
              // Augment the native candidate with the parsed fields.
              var nativeCandidate = new NativeRTCIceCandidate(args);
              var parsedCandidate = SDPUtils.parseCandidate(args.candidate);
              var augmentedCandidate = _extends(nativeCandidate, parsedCandidate);

              // Add a serializer that does not serialize the extra attributes.
              augmentedCandidate.toJSON = function () {
                return {
                  candidate: augmentedCandidate.candidate,
                  sdpMid: augmentedCandidate.sdpMid,
                  sdpMLineIndex: augmentedCandidate.sdpMLineIndex,
                  usernameFragment: augmentedCandidate.usernameFragment
                };
              };
              return augmentedCandidate;
            }
            return new NativeRTCIceCandidate(args);
          };
          window.RTCIceCandidate.prototype = NativeRTCIceCandidate.prototype;

          // Hook up the augmented candidate in onicecandidate and
          // addEventListener('icecandidate', ...)
          utils.wrapPeerConnectionEvent(window, 'icecandidate', function (e) {
            if (e.candidate) {
              Object.defineProperty(e, 'candidate', {
                value: new window.RTCIceCandidate(e.candidate),
                writable: 'false'
              });
            }
            return e;
          });
        },

        // shimCreateObjectURL must be called before shimSourceObject to avoid loop.

        shimCreateObjectURL: function shimCreateObjectURL(window) {
          var URL = window && window.URL;

          if (!((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && window.HTMLMediaElement && 'srcObject' in window.HTMLMediaElement.prototype && URL.createObjectURL && URL.revokeObjectURL)) {
            // Only shim CreateObjectURL using srcObject if srcObject exists.
            return undefined;
          }

          var nativeCreateObjectURL = URL.createObjectURL.bind(URL);
          var nativeRevokeObjectURL = URL.revokeObjectURL.bind(URL);
          var streams = new Map(),
              newId = 0;

          URL.createObjectURL = function (stream) {
            if ('getTracks' in stream) {
              var url = 'polyblob:' + ++newId;
              streams.set(url, stream);
              utils.deprecated('URL.createObjectURL(stream)', 'elem.srcObject = stream');
              return url;
            }
            return nativeCreateObjectURL(stream);
          };
          URL.revokeObjectURL = function (url) {
            nativeRevokeObjectURL(url);
            streams["delete"](url);
          };

          var dsc = Object.getOwnPropertyDescriptor(window.HTMLMediaElement.prototype, 'src');
          Object.defineProperty(window.HTMLMediaElement.prototype, 'src', {
            get: function get() {
              return dsc.get.apply(this);
            },
            set: function set(url) {
              this.srcObject = streams.get(url) || null;
              return dsc.set.apply(this, [url]);
            }
          });

          var nativeSetAttribute = window.HTMLMediaElement.prototype.setAttribute;
          window.HTMLMediaElement.prototype.setAttribute = function () {
            if (arguments.length === 2 && ('' + arguments[0]).toLowerCase() === 'src') {
              this.srcObject = streams.get(arguments[1]) || null;
            }
            return nativeSetAttribute.apply(this, arguments);
          };
        },

        shimMaxMessageSize: function shimMaxMessageSize(window) {
          if (window.RTCSctpTransport || !window.RTCPeerConnection) {
            return;
          }
          var browserDetails = utils.detectBrowser(window);

          if (!('sctp' in window.RTCPeerConnection.prototype)) {
            Object.defineProperty(window.RTCPeerConnection.prototype, 'sctp', {
              get: function get() {
                return typeof this._sctp === 'undefined' ? null : this._sctp;
              }
            });
          }

          var sctpInDescription = function sctpInDescription(description) {
            var sections = SDPUtils.splitSections(description.sdp);
            sections.shift();
            return sections.some(function (mediaSection) {
              var mLine = SDPUtils.parseMLine(mediaSection);
              return mLine && mLine.kind === 'application' && mLine.protocol.indexOf('SCTP') !== -1;
            });
          };

          var getRemoteFirefoxVersion = function getRemoteFirefoxVersion(description) {
            // TODO: Is there a better solution for detecting Firefox?
            var match = description.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
            if (match === null || match.length < 2) {
              return -1;
            }
            var version = parseInt(match[1], 10);
            // Test for NaN (yes, this is ugly)
            return version !== version ? -1 : version;
          };

          var getCanSendMaxMessageSize = function getCanSendMaxMessageSize(remoteIsFirefox) {
            // Every implementation we know can send at least 64 KiB.
            // Note: Although Chrome is technically able to send up to 256 KiB, the
            //       data does not reach the other peer reliably.
            //       See: https://bugs.chromium.org/p/webrtc/issues/detail?id=8419
            var canSendMaxMessageSize = 65536;
            if (browserDetails.browser === 'firefox') {
              if (browserDetails.version < 57) {
                if (remoteIsFirefox === -1) {
                  // FF < 57 will send in 16 KiB chunks using the deprecated PPID
                  // fragmentation.
                  canSendMaxMessageSize = 16384;
                } else {
                  // However, other FF (and RAWRTC) can reassemble PPID-fragmented
                  // messages. Thus, supporting ~2 GiB when sending.
                  canSendMaxMessageSize = 2147483637;
                }
              } else {
                // Currently, all FF >= 57 will reset the remote maximum message size
                // to the default value when a data channel is created at a later
                // stage. :(
                // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831
                canSendMaxMessageSize = browserDetails.version === 57 ? 65535 : 65536;
              }
            }
            return canSendMaxMessageSize;
          };

          var getMaxMessageSize = function getMaxMessageSize(description, remoteIsFirefox) {
            // Note: 65536 bytes is the default value from the SDP spec. Also,
            //       every implementation we know supports receiving 65536 bytes.
            var maxMessageSize = 65536;

            // FF 57 has a slightly incorrect default remote max message size, so
            // we need to adjust it here to avoid a failure when sending.
            // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1425697
            if (browserDetails.browser === 'firefox' && browserDetails.version === 57) {
              maxMessageSize = 65535;
            }

            var match = SDPUtils.matchPrefix(description.sdp, 'a=max-message-size:');
            if (match.length > 0) {
              maxMessageSize = parseInt(match[0].substr(19), 10);
            } else if (browserDetails.browser === 'firefox' && remoteIsFirefox !== -1) {
              // If the maximum message size is not present in the remote SDP and
              // both local and remote are Firefox, the remote peer can receive
              // ~2 GiB.
              maxMessageSize = 2147483637;
            }
            return maxMessageSize;
          };

          var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
          window.RTCPeerConnection.prototype.setRemoteDescription = function () {
            var pc = this;
            pc._sctp = null;

            if (sctpInDescription(arguments[0])) {
              // Check if the remote is FF.
              var isFirefox = getRemoteFirefoxVersion(arguments[0]);

              // Get the maximum message size the local peer is capable of sending
              var canSendMMS = getCanSendMaxMessageSize(isFirefox);

              // Get the maximum message size of the remote peer.
              var remoteMMS = getMaxMessageSize(arguments[0], isFirefox);

              // Determine final maximum message size
              var maxMessageSize;
              if (canSendMMS === 0 && remoteMMS === 0) {
                maxMessageSize = Number.POSITIVE_INFINITY;
              } else if (canSendMMS === 0 || remoteMMS === 0) {
                maxMessageSize = Math.max(canSendMMS, remoteMMS);
              } else {
                maxMessageSize = Math.min(canSendMMS, remoteMMS);
              }

              // Create a dummy RTCSctpTransport object and the 'maxMessageSize'
              // attribute.
              var sctp = {};
              Object.defineProperty(sctp, 'maxMessageSize', {
                get: function get() {
                  return maxMessageSize;
                }
              });
              pc._sctp = sctp;
            }

            return origSetRemoteDescription.apply(pc, arguments);
          };
        },

        shimSendThrowTypeError: function shimSendThrowTypeError(window) {
          if (!(window.RTCPeerConnection && 'createDataChannel' in window.RTCPeerConnection.prototype)) {
            return;
          }

          // Note: Although Firefox >= 57 has a native implementation, the maximum
          //       message size can be reset for all data channels at a later stage.
          //       See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831

          var origCreateDataChannel = window.RTCPeerConnection.prototype.createDataChannel;
          window.RTCPeerConnection.prototype.createDataChannel = function () {
            var pc = this;
            var dataChannel = origCreateDataChannel.apply(pc, arguments);
            var origDataChannelSend = dataChannel.send;

            // Patch 'send' method
            dataChannel.send = function () {
              var dc = this;
              var data = arguments[0];
              var length = data.length || data.size || data.byteLength;
              if (length > pc.sctp.maxMessageSize) {
                throw new DOMException('Message too large (can send a maximum of ' + pc.sctp.maxMessageSize + ' bytes)', 'TypeError');
              }
              return origDataChannelSend.apply(dc, arguments);
            };

            return dataChannel;
          };
        }
      };
    }, { "./utils": 13, "sdp": 2 }], 8: [function (require, module, exports) {
      /*
       *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
       *
       *  Use of this source code is governed by a BSD-style license
       *  that can be found in the LICENSE file in the root of the source
       *  tree.
       */
      /* eslint-env node */
      'use strict';

      var utils = require('../utils');
      var shimRTCPeerConnection = require('rtcpeerconnection-shim');

      module.exports = {
        shimGetUserMedia: require('./getusermedia'),
        shimPeerConnection: function shimPeerConnection(window) {
          var browserDetails = utils.detectBrowser(window);

          if (window.RTCIceGatherer) {
            if (!window.RTCIceCandidate) {
              window.RTCIceCandidate = function (args) {
                return args;
              };
            }
            if (!window.RTCSessionDescription) {
              window.RTCSessionDescription = function (args) {
                return args;
              };
            }
            // this adds an additional event listener to MediaStrackTrack that signals
            // when a tracks enabled property was changed. Workaround for a bug in
            // addStream, see below. No longer required in 15025+
            if (browserDetails.version < 15025) {
              var origMSTEnabled = Object.getOwnPropertyDescriptor(window.MediaStreamTrack.prototype, 'enabled');
              Object.defineProperty(window.MediaStreamTrack.prototype, 'enabled', {
                set: function set(value) {
                  origMSTEnabled.set.call(this, value);
                  var ev = new Event('enabled');
                  ev.enabled = value;
                  this.dispatchEvent(ev);
                }
              });
            }
          }

          // ORTC defines the DTMF sender a bit different.
          // https://github.com/w3c/ortc/issues/714
          if (window.RTCRtpSender && !('dtmf' in window.RTCRtpSender.prototype)) {
            Object.defineProperty(window.RTCRtpSender.prototype, 'dtmf', {
              get: function get() {
                if (this._dtmf === undefined) {
                  if (this.track.kind === 'audio') {
                    this._dtmf = new window.RTCDtmfSender(this);
                  } else if (this.track.kind === 'video') {
                    this._dtmf = null;
                  }
                }
                return this._dtmf;
              }
            });
          }
          // Edge currently only implements the RTCDtmfSender, not the
          // RTCDTMFSender alias. See http://draft.ortc.org/#rtcdtmfsender2*
          if (window.RTCDtmfSender && !window.RTCDTMFSender) {
            window.RTCDTMFSender = window.RTCDtmfSender;
          }

          window.RTCPeerConnection = shimRTCPeerConnection(window, browserDetails.version);
        },
        shimReplaceTrack: function shimReplaceTrack(window) {
          // ORTC has replaceTrack -- https://github.com/w3c/ortc/issues/614
          if (window.RTCRtpSender && !('replaceTrack' in window.RTCRtpSender.prototype)) {
            window.RTCRtpSender.prototype.replaceTrack = window.RTCRtpSender.prototype.setTrack;
          }
        }
      };
    }, { "../utils": 13, "./getusermedia": 9, "rtcpeerconnection-shim": 1 }], 9: [function (require, module, exports) {
      /*
       *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
       *
       *  Use of this source code is governed by a BSD-style license
       *  that can be found in the LICENSE file in the root of the source
       *  tree.
       */
      /* eslint-env node */
      'use strict';

      // Expose public methods.

      module.exports = function (window) {
        var navigator = window && window.navigator;

        var shimError_ = function shimError_(e) {
          return {
            name: { PermissionDeniedError: 'NotAllowedError' }[e.name] || e.name,
            message: e.message,
            constraint: e.constraint,
            toString: function toString() {
              return this.name;
            }
          };
        };

        // getUserMedia error shim.
        var origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
        navigator.mediaDevices.getUserMedia = function (c) {
          return origGetUserMedia(c)["catch"](function (e) {
            return Promise.reject(shimError_(e));
          });
        };
      };
    }, {}], 10: [function (require, module, exports) {
      /*
       *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
       *
       *  Use of this source code is governed by a BSD-style license
       *  that can be found in the LICENSE file in the root of the source
       *  tree.
       */
      /* eslint-env node */
      'use strict';

      var utils = require('../utils');

      module.exports = {
        shimGetUserMedia: require('./getusermedia'),
        shimOnTrack: function shimOnTrack(window) {
          if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && window.RTCPeerConnection && !('ontrack' in window.RTCPeerConnection.prototype)) {
            Object.defineProperty(window.RTCPeerConnection.prototype, 'ontrack', {
              get: function get() {
                return this._ontrack;
              },
              set: function set(f) {
                if (this._ontrack) {
                  this.removeEventListener('track', this._ontrack);
                  this.removeEventListener('addstream', this._ontrackpoly);
                }
                this.addEventListener('track', this._ontrack = f);
                this.addEventListener('addstream', this._ontrackpoly = function (e) {
                  e.stream.getTracks().forEach(function (track) {
                    var event = new Event('track');
                    event.track = track;
                    event.receiver = { track: track };
                    event.transceiver = { receiver: event.receiver };
                    event.streams = [e.stream];
                    this.dispatchEvent(event);
                  }.bind(this));
                }.bind(this));
              }
            });
          }
          if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && window.RTCTrackEvent && 'receiver' in window.RTCTrackEvent.prototype && !('transceiver' in window.RTCTrackEvent.prototype)) {
            Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
              get: function get() {
                return { receiver: this.receiver };
              }
            });
          }
        },

        shimSourceObject: function shimSourceObject(window) {
          // Firefox has supported mozSrcObject since FF22, unprefixed in 42.
          if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
            if (window.HTMLMediaElement && !('srcObject' in window.HTMLMediaElement.prototype)) {
              // Shim the srcObject property, once, when HTMLMediaElement is found.
              Object.defineProperty(window.HTMLMediaElement.prototype, 'srcObject', {
                get: function get() {
                  return this.mozSrcObject;
                },
                set: function set(stream) {
                  this.mozSrcObject = stream;
                }
              });
            }
          }
        },

        shimPeerConnection: function shimPeerConnection(window) {
          var browserDetails = utils.detectBrowser(window);

          if ((typeof window === "undefined" ? "undefined" : _typeof(window)) !== 'object' || !(window.RTCPeerConnection || window.mozRTCPeerConnection)) {
            return; // probably media.peerconnection.enabled=false in about:config
          }
          // The RTCPeerConnection object.
          if (!window.RTCPeerConnection) {
            window.RTCPeerConnection = function (pcConfig, pcConstraints) {
              if (browserDetails.version < 38) {
                // .urls is not supported in FF < 38.
                // create RTCIceServers with a single url.
                if (pcConfig && pcConfig.iceServers) {
                  var newIceServers = [];
                  for (var i = 0; i < pcConfig.iceServers.length; i++) {
                    var server = pcConfig.iceServers[i];
                    if (server.hasOwnProperty('urls')) {
                      for (var j = 0; j < server.urls.length; j++) {
                        var newServer = {
                          url: server.urls[j]
                        };
                        if (server.urls[j].indexOf('turn') === 0) {
                          newServer.username = server.username;
                          newServer.credential = server.credential;
                        }
                        newIceServers.push(newServer);
                      }
                    } else {
                      newIceServers.push(pcConfig.iceServers[i]);
                    }
                  }
                  pcConfig.iceServers = newIceServers;
                }
              }
              return new window.mozRTCPeerConnection(pcConfig, pcConstraints);
            };
            window.RTCPeerConnection.prototype = window.mozRTCPeerConnection.prototype;

            // wrap static methods. Currently just generateCertificate.
            if (window.mozRTCPeerConnection.generateCertificate) {
              Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
                get: function get() {
                  return window.mozRTCPeerConnection.generateCertificate;
                }
              });
            }

            window.RTCSessionDescription = window.mozRTCSessionDescription;
            window.RTCIceCandidate = window.mozRTCIceCandidate;
          }

          // shim away need for obsolete RTCIceCandidate/RTCSessionDescription.
          ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function (method) {
            var nativeMethod = window.RTCPeerConnection.prototype[method];
            window.RTCPeerConnection.prototype[method] = function () {
              arguments[0] = new (method === 'addIceCandidate' ? window.RTCIceCandidate : window.RTCSessionDescription)(arguments[0]);
              return nativeMethod.apply(this, arguments);
            };
          });

          // support for addIceCandidate(null or undefined)
          var nativeAddIceCandidate = window.RTCPeerConnection.prototype.addIceCandidate;
          window.RTCPeerConnection.prototype.addIceCandidate = function () {
            if (!arguments[0]) {
              if (arguments[1]) {
                arguments[1].apply(null);
              }
              return Promise.resolve();
            }
            return nativeAddIceCandidate.apply(this, arguments);
          };

          // shim getStats with maplike support
          var makeMapStats = function makeMapStats(stats) {
            var map = new Map();
            Object.keys(stats).forEach(function (key) {
              map.set(key, stats[key]);
              map[key] = stats[key];
            });
            return map;
          };

          var modernStatsTypes = {
            inboundrtp: 'inbound-rtp',
            outboundrtp: 'outbound-rtp',
            candidatepair: 'candidate-pair',
            localcandidate: 'local-candidate',
            remotecandidate: 'remote-candidate'
          };

          var nativeGetStats = window.RTCPeerConnection.prototype.getStats;
          window.RTCPeerConnection.prototype.getStats = function (selector, onSucc, onErr) {
            return nativeGetStats.apply(this, [selector || null]).then(function (stats) {
              if (browserDetails.version < 48) {
                stats = makeMapStats(stats);
              }
              if (browserDetails.version < 53 && !onSucc) {
                // Shim only promise getStats with spec-hyphens in type names
                // Leave callback version alone; misc old uses of forEach before Map
                try {
                  stats.forEach(function (stat) {
                    stat.type = modernStatsTypes[stat.type] || stat.type;
                  });
                } catch (e) {
                  if (e.name !== 'TypeError') {
                    throw e;
                  }
                  // Avoid TypeError: "type" is read-only, in old versions. 34-43ish
                  stats.forEach(function (stat, i) {
                    stats.set(i, _extends({}, stat, {
                      type: modernStatsTypes[stat.type] || stat.type
                    }));
                  });
                }
              }
              return stats;
            }).then(onSucc, onErr);
          };
        },

        shimRemoveStream: function shimRemoveStream(window) {
          if (!window.RTCPeerConnection || 'removeStream' in window.RTCPeerConnection.prototype) {
            return;
          }
          window.RTCPeerConnection.prototype.removeStream = function (stream) {
            var pc = this;
            utils.deprecated('removeStream', 'removeTrack');
            this.getSenders().forEach(function (sender) {
              if (sender.track && stream.getTracks().indexOf(sender.track) !== -1) {
                pc.removeTrack(sender);
              }
            });
          };
        }
      };
    }, { "../utils": 13, "./getusermedia": 11 }], 11: [function (require, module, exports) {
      /*
       *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
       *
       *  Use of this source code is governed by a BSD-style license
       *  that can be found in the LICENSE file in the root of the source
       *  tree.
       */
      /* eslint-env node */
      'use strict';

      var utils = require('../utils');
      var logging = utils.log;

      // Expose public methods.
      module.exports = function (window) {
        var browserDetails = utils.detectBrowser(window);
        var navigator = window && window.navigator;
        var MediaStreamTrack = window && window.MediaStreamTrack;

        var shimError_ = function shimError_(e) {
          return {
            name: {
              InternalError: 'NotReadableError',
              NotSupportedError: 'TypeError',
              PermissionDeniedError: 'NotAllowedError',
              SecurityError: 'NotAllowedError'
            }[e.name] || e.name,
            message: {
              'The operation is insecure.': 'The request is not allowed by the ' + 'user agent or the platform in the current context.'
            }[e.message] || e.message,
            constraint: e.constraint,
            toString: function toString() {
              return this.name + (this.message && ': ') + this.message;
            }
          };
        };

        // getUserMedia constraints shim.
        var getUserMedia_ = function getUserMedia_(constraints, onSuccess, onError) {
          var constraintsToFF37_ = function constraintsToFF37_(c) {
            if ((typeof c === "undefined" ? "undefined" : _typeof(c)) !== 'object' || c.require) {
              return c;
            }
            var require = [];
            Object.keys(c).forEach(function (key) {
              if (key === 'require' || key === 'advanced' || key === 'mediaSource') {
                return;
              }
              var r = c[key] = _typeof(c[key]) === 'object' ? c[key] : { ideal: c[key] };
              if (r.min !== undefined || r.max !== undefined || r.exact !== undefined) {
                require.push(key);
              }
              if (r.exact !== undefined) {
                if (typeof r.exact === 'number') {
                  r.min = r.max = r.exact;
                } else {
                  c[key] = r.exact;
                }
                delete r.exact;
              }
              if (r.ideal !== undefined) {
                c.advanced = c.advanced || [];
                var oc = {};
                if (typeof r.ideal === 'number') {
                  oc[key] = { min: r.ideal, max: r.ideal };
                } else {
                  oc[key] = r.ideal;
                }
                c.advanced.push(oc);
                delete r.ideal;
                if (!Object.keys(r).length) {
                  delete c[key];
                }
              }
            });
            if (require.length) {
              c.require = require;
            }
            return c;
          };
          constraints = JSON.parse(JSON.stringify(constraints));
          if (browserDetails.version < 38) {
            logging('spec: ' + JSON.stringify(constraints));
            if (constraints.audio) {
              constraints.audio = constraintsToFF37_(constraints.audio);
            }
            if (constraints.video) {
              constraints.video = constraintsToFF37_(constraints.video);
            }
            logging('ff37: ' + JSON.stringify(constraints));
          }
          return navigator.mozGetUserMedia(constraints, onSuccess, function (e) {
            onError(shimError_(e));
          });
        };

        // Returns the result of getUserMedia as a Promise.
        var getUserMediaPromise_ = function getUserMediaPromise_(constraints) {
          return new Promise(function (resolve, reject) {
            getUserMedia_(constraints, resolve, reject);
          });
        };

        // Shim for mediaDevices on older versions.
        if (!navigator.mediaDevices) {
          navigator.mediaDevices = { getUserMedia: getUserMediaPromise_,
            addEventListener: function addEventListener() {},
            removeEventListener: function removeEventListener() {}
          };
        }
        navigator.mediaDevices.enumerateDevices = navigator.mediaDevices.enumerateDevices || function () {
          return new Promise(function (resolve) {
            var infos = [{ kind: 'audioinput', deviceId: 'default', label: '', groupId: '' }, { kind: 'videoinput', deviceId: 'default', label: '', groupId: '' }];
            resolve(infos);
          });
        };

        if (browserDetails.version < 41) {
          // Work around http://bugzil.la/1169665
          var orgEnumerateDevices = navigator.mediaDevices.enumerateDevices.bind(navigator.mediaDevices);
          navigator.mediaDevices.enumerateDevices = function () {
            return orgEnumerateDevices().then(undefined, function (e) {
              if (e.name === 'NotFoundError') {
                return [];
              }
              throw e;
            });
          };
        }
        if (browserDetails.version < 49) {
          var origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
          navigator.mediaDevices.getUserMedia = function (c) {
            return origGetUserMedia(c).then(function (stream) {
              // Work around https://bugzil.la/802326
              if (c.audio && !stream.getAudioTracks().length || c.video && !stream.getVideoTracks().length) {
                stream.getTracks().forEach(function (track) {
                  track.stop();
                });
                throw new DOMException('The object can not be found here.', 'NotFoundError');
              }
              return stream;
            }, function (e) {
              return Promise.reject(shimError_(e));
            });
          };
        }
        if (!(browserDetails.version > 55 && 'autoGainControl' in navigator.mediaDevices.getSupportedConstraints())) {
          var remap = function remap(obj, a, b) {
            if (a in obj && !(b in obj)) {
              obj[b] = obj[a];
              delete obj[a];
            }
          };

          var nativeGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
          navigator.mediaDevices.getUserMedia = function (c) {
            if ((typeof c === "undefined" ? "undefined" : _typeof(c)) === 'object' && _typeof(c.audio) === 'object') {
              c = JSON.parse(JSON.stringify(c));
              remap(c.audio, 'autoGainControl', 'mozAutoGainControl');
              remap(c.audio, 'noiseSuppression', 'mozNoiseSuppression');
            }
            return nativeGetUserMedia(c);
          };

          if (MediaStreamTrack && MediaStreamTrack.prototype.getSettings) {
            var nativeGetSettings = MediaStreamTrack.prototype.getSettings;
            MediaStreamTrack.prototype.getSettings = function () {
              var obj = nativeGetSettings.apply(this, arguments);
              remap(obj, 'mozAutoGainControl', 'autoGainControl');
              remap(obj, 'mozNoiseSuppression', 'noiseSuppression');
              return obj;
            };
          }

          if (MediaStreamTrack && MediaStreamTrack.prototype.applyConstraints) {
            var nativeApplyConstraints = MediaStreamTrack.prototype.applyConstraints;
            MediaStreamTrack.prototype.applyConstraints = function (c) {
              if (this.kind === 'audio' && (typeof c === "undefined" ? "undefined" : _typeof(c)) === 'object') {
                c = JSON.parse(JSON.stringify(c));
                remap(c, 'autoGainControl', 'mozAutoGainControl');
                remap(c, 'noiseSuppression', 'mozNoiseSuppression');
              }
              return nativeApplyConstraints.apply(this, [c]);
            };
          }
        }
        navigator.getUserMedia = function (constraints, onSuccess, onError) {
          if (browserDetails.version < 44) {
            return getUserMedia_(constraints, onSuccess, onError);
          }
          // Replace Firefox 44+'s deprecation warning with unprefixed version.
          utils.deprecated('navigator.getUserMedia', 'navigator.mediaDevices.getUserMedia');
          navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
        };
      };
    }, { "../utils": 13 }], 12: [function (require, module, exports) {
      /*
       *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
       *
       *  Use of this source code is governed by a BSD-style license
       *  that can be found in the LICENSE file in the root of the source
       *  tree.
       */
      'use strict';

      var utils = require('../utils');

      module.exports = {
        shimLocalStreamsAPI: function shimLocalStreamsAPI(window) {
          if ((typeof window === "undefined" ? "undefined" : _typeof(window)) !== 'object' || !window.RTCPeerConnection) {
            return;
          }
          if (!('getLocalStreams' in window.RTCPeerConnection.prototype)) {
            window.RTCPeerConnection.prototype.getLocalStreams = function () {
              if (!this._localStreams) {
                this._localStreams = [];
              }
              return this._localStreams;
            };
          }
          if (!('getStreamById' in window.RTCPeerConnection.prototype)) {
            window.RTCPeerConnection.prototype.getStreamById = function (id) {
              var result = null;
              if (this._localStreams) {
                this._localStreams.forEach(function (stream) {
                  if (stream.id === id) {
                    result = stream;
                  }
                });
              }
              if (this._remoteStreams) {
                this._remoteStreams.forEach(function (stream) {
                  if (stream.id === id) {
                    result = stream;
                  }
                });
              }
              return result;
            };
          }
          if (!('addStream' in window.RTCPeerConnection.prototype)) {
            var _addTrack = window.RTCPeerConnection.prototype.addTrack;
            window.RTCPeerConnection.prototype.addStream = function (stream) {
              if (!this._localStreams) {
                this._localStreams = [];
              }
              if (this._localStreams.indexOf(stream) === -1) {
                this._localStreams.push(stream);
              }
              var pc = this;
              stream.getTracks().forEach(function (track) {
                _addTrack.call(pc, track, stream);
              });
            };

            window.RTCPeerConnection.prototype.addTrack = function (track, stream) {
              if (stream) {
                if (!this._localStreams) {
                  this._localStreams = [stream];
                } else if (this._localStreams.indexOf(stream) === -1) {
                  this._localStreams.push(stream);
                }
              }
              return _addTrack.call(this, track, stream);
            };
          }
          if (!('removeStream' in window.RTCPeerConnection.prototype)) {
            window.RTCPeerConnection.prototype.removeStream = function (stream) {
              if (!this._localStreams) {
                this._localStreams = [];
              }
              var index = this._localStreams.indexOf(stream);
              if (index === -1) {
                return;
              }
              this._localStreams.splice(index, 1);
              var pc = this;
              var tracks = stream.getTracks();
              this.getSenders().forEach(function (sender) {
                if (tracks.indexOf(sender.track) !== -1) {
                  pc.removeTrack(sender);
                }
              });
            };
          }
        },
        shimRemoteStreamsAPI: function shimRemoteStreamsAPI(window) {
          if ((typeof window === "undefined" ? "undefined" : _typeof(window)) !== 'object' || !window.RTCPeerConnection) {
            return;
          }
          if (!('getRemoteStreams' in window.RTCPeerConnection.prototype)) {
            window.RTCPeerConnection.prototype.getRemoteStreams = function () {
              return this._remoteStreams ? this._remoteStreams : [];
            };
          }
          if (!('onaddstream' in window.RTCPeerConnection.prototype)) {
            Object.defineProperty(window.RTCPeerConnection.prototype, 'onaddstream', {
              get: function get() {
                return this._onaddstream;
              },
              set: function set(f) {
                var pc = this;
                if (this._onaddstream) {
                  this.removeEventListener('addstream', this._onaddstream);
                  this.removeEventListener('track', this._onaddstreampoly);
                }
                this.addEventListener('addstream', this._onaddstream = f);
                this.addEventListener('track', this._onaddstreampoly = function (e) {
                  e.streams.forEach(function (stream) {
                    if (!pc._remoteStreams) {
                      pc._remoteStreams = [];
                    }
                    if (pc._remoteStreams.indexOf(stream) >= 0) {
                      return;
                    }
                    pc._remoteStreams.push(stream);
                    var event = new Event('addstream');
                    event.stream = stream;
                    pc.dispatchEvent(event);
                  });
                });
              }
            });
          }
        },
        shimCallbacksAPI: function shimCallbacksAPI(window) {
          if ((typeof window === "undefined" ? "undefined" : _typeof(window)) !== 'object' || !window.RTCPeerConnection) {
            return;
          }
          var prototype = window.RTCPeerConnection.prototype;
          var createOffer = prototype.createOffer;
          var createAnswer = prototype.createAnswer;
          var setLocalDescription = prototype.setLocalDescription;
          var setRemoteDescription = prototype.setRemoteDescription;
          var addIceCandidate = prototype.addIceCandidate;

          prototype.createOffer = function (successCallback, failureCallback) {
            var options = arguments.length >= 2 ? arguments[2] : arguments[0];
            var promise = createOffer.apply(this, [options]);
            if (!failureCallback) {
              return promise;
            }
            promise.then(successCallback, failureCallback);
            return Promise.resolve();
          };

          prototype.createAnswer = function (successCallback, failureCallback) {
            var options = arguments.length >= 2 ? arguments[2] : arguments[0];
            var promise = createAnswer.apply(this, [options]);
            if (!failureCallback) {
              return promise;
            }
            promise.then(successCallback, failureCallback);
            return Promise.resolve();
          };

          var withCallback = function withCallback(description, successCallback, failureCallback) {
            var promise = setLocalDescription.apply(this, [description]);
            if (!failureCallback) {
              return promise;
            }
            promise.then(successCallback, failureCallback);
            return Promise.resolve();
          };
          prototype.setLocalDescription = withCallback;

          withCallback = function withCallback(description, successCallback, failureCallback) {
            var promise = setRemoteDescription.apply(this, [description]);
            if (!failureCallback) {
              return promise;
            }
            promise.then(successCallback, failureCallback);
            return Promise.resolve();
          };
          prototype.setRemoteDescription = withCallback;

          withCallback = function withCallback(candidate, successCallback, failureCallback) {
            var promise = addIceCandidate.apply(this, [candidate]);
            if (!failureCallback) {
              return promise;
            }
            promise.then(successCallback, failureCallback);
            return Promise.resolve();
          };
          prototype.addIceCandidate = withCallback;
        },
        shimGetUserMedia: function shimGetUserMedia(window) {
          var navigator = window && window.navigator;

          if (!navigator.getUserMedia) {
            if (navigator.webkitGetUserMedia) {
              navigator.getUserMedia = navigator.webkitGetUserMedia.bind(navigator);
            } else if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
              navigator.getUserMedia = function (constraints, cb, errcb) {
                navigator.mediaDevices.getUserMedia(constraints).then(cb, errcb);
              }.bind(navigator);
            }
          }
        },
        shimRTCIceServerUrls: function shimRTCIceServerUrls(window) {
          // migrate from non-spec RTCIceServer.url to RTCIceServer.urls
          var OrigPeerConnection = window.RTCPeerConnection;
          window.RTCPeerConnection = function (pcConfig, pcConstraints) {
            if (pcConfig && pcConfig.iceServers) {
              var newIceServers = [];
              for (var i = 0; i < pcConfig.iceServers.length; i++) {
                var server = pcConfig.iceServers[i];
                if (!server.hasOwnProperty('urls') && server.hasOwnProperty('url')) {
                  utils.deprecated('RTCIceServer.url', 'RTCIceServer.urls');
                  server = JSON.parse(JSON.stringify(server));
                  server.urls = server.url;
                  delete server.url;
                  newIceServers.push(server);
                } else {
                  newIceServers.push(pcConfig.iceServers[i]);
                }
              }
              pcConfig.iceServers = newIceServers;
            }
            return new OrigPeerConnection(pcConfig, pcConstraints);
          };
          window.RTCPeerConnection.prototype = OrigPeerConnection.prototype;
          // wrap static methods. Currently just generateCertificate.
          if ('generateCertificate' in window.RTCPeerConnection) {
            Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
              get: function get() {
                return OrigPeerConnection.generateCertificate;
              }
            });
          }
        },
        shimTrackEventTransceiver: function shimTrackEventTransceiver(window) {
          // Add event.transceiver member over deprecated event.receiver
          if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && window.RTCPeerConnection && 'receiver' in window.RTCTrackEvent.prototype &&
          // can't check 'transceiver' in window.RTCTrackEvent.prototype, as it is
          // defined for some reason even when window.RTCTransceiver is not.
          !window.RTCTransceiver) {
            Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
              get: function get() {
                return { receiver: this.receiver };
              }
            });
          }
        },

        shimCreateOfferLegacy: function shimCreateOfferLegacy(window) {
          var origCreateOffer = window.RTCPeerConnection.prototype.createOffer;
          window.RTCPeerConnection.prototype.createOffer = function (offerOptions) {
            var pc = this;
            if (offerOptions) {
              if (typeof offerOptions.offerToReceiveAudio !== 'undefined') {
                // support bit values
                offerOptions.offerToReceiveAudio = !!offerOptions.offerToReceiveAudio;
              }
              var audioTransceiver = pc.getTransceivers().find(function (transceiver) {
                return transceiver.sender.track && transceiver.sender.track.kind === 'audio';
              });
              if (offerOptions.offerToReceiveAudio === false && audioTransceiver) {
                if (audioTransceiver.direction === 'sendrecv') {
                  if (audioTransceiver.setDirection) {
                    audioTransceiver.setDirection('sendonly');
                  } else {
                    audioTransceiver.direction = 'sendonly';
                  }
                } else if (audioTransceiver.direction === 'recvonly') {
                  if (audioTransceiver.setDirection) {
                    audioTransceiver.setDirection('inactive');
                  } else {
                    audioTransceiver.direction = 'inactive';
                  }
                }
              } else if (offerOptions.offerToReceiveAudio === true && !audioTransceiver) {
                pc.addTransceiver('audio');
              }

              if (typeof offerOptions.offerToReceiveAudio !== 'undefined') {
                // support bit values
                offerOptions.offerToReceiveVideo = !!offerOptions.offerToReceiveVideo;
              }
              var videoTransceiver = pc.getTransceivers().find(function (transceiver) {
                return transceiver.sender.track && transceiver.sender.track.kind === 'video';
              });
              if (offerOptions.offerToReceiveVideo === false && videoTransceiver) {
                if (videoTransceiver.direction === 'sendrecv') {
                  videoTransceiver.setDirection('sendonly');
                } else if (videoTransceiver.direction === 'recvonly') {
                  videoTransceiver.setDirection('inactive');
                }
              } else if (offerOptions.offerToReceiveVideo === true && !videoTransceiver) {
                pc.addTransceiver('video');
              }
            }
            return origCreateOffer.apply(pc, arguments);
          };
        }
      };
    }, { "../utils": 13 }], 13: [function (require, module, exports) {
      /*
       *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
       *
       *  Use of this source code is governed by a BSD-style license
       *  that can be found in the LICENSE file in the root of the source
       *  tree.
       */
      /* eslint-env node */
      'use strict';

      var logDisabled_ = true;
      var deprecationWarnings_ = true;

      /**
       * Extract browser version out of the provided user agent string.
       *
       * @param {!string} uastring userAgent string.
       * @param {!string} expr Regular expression used as match criteria.
       * @param {!number} pos position in the version string to be returned.
       * @return {!number} browser version.
       */
      function extractVersion(uastring, expr, pos) {
        var match = uastring.match(expr);
        return match && match.length >= pos && parseInt(match[pos], 10);
      }

      // Wraps the peerconnection event eventNameToWrap in a function
      // which returns the modified event object.
      function wrapPeerConnectionEvent(window, eventNameToWrap, wrapper) {
        if (!window.RTCPeerConnection) {
          return;
        }
        var proto = window.RTCPeerConnection.prototype;
        var nativeAddEventListener = proto.addEventListener;
        proto.addEventListener = function (nativeEventName, cb) {
          if (nativeEventName !== eventNameToWrap) {
            return nativeAddEventListener.apply(this, arguments);
          }
          var wrappedCallback = function wrappedCallback(e) {
            cb(wrapper(e));
          };
          this._eventMap = this._eventMap || {};
          this._eventMap[cb] = wrappedCallback;
          return nativeAddEventListener.apply(this, [nativeEventName, wrappedCallback]);
        };

        var nativeRemoveEventListener = proto.removeEventListener;
        proto.removeEventListener = function (nativeEventName, cb) {
          if (nativeEventName !== eventNameToWrap || !this._eventMap || !this._eventMap[cb]) {
            return nativeRemoveEventListener.apply(this, arguments);
          }
          var unwrappedCb = this._eventMap[cb];
          delete this._eventMap[cb];
          return nativeRemoveEventListener.apply(this, [nativeEventName, unwrappedCb]);
        };

        Object.defineProperty(proto, 'on' + eventNameToWrap, {
          get: function get() {
            return this['_on' + eventNameToWrap];
          },
          set: function set(cb) {
            if (this['_on' + eventNameToWrap]) {
              this.removeEventListener(eventNameToWrap, this['_on' + eventNameToWrap]);
              delete this['_on' + eventNameToWrap];
            }
            if (cb) {
              this.addEventListener(eventNameToWrap, this['_on' + eventNameToWrap] = cb);
            }
          }
        });
      }

      // Utility methods.
      module.exports = {
        extractVersion: extractVersion,
        wrapPeerConnectionEvent: wrapPeerConnectionEvent,
        disableLog: function disableLog(bool) {
          if (typeof bool !== 'boolean') {
            return new Error('Argument type: ' + (typeof bool === "undefined" ? "undefined" : _typeof(bool)) + '. Please use a boolean.');
          }
          logDisabled_ = bool;
          return bool ? 'adapter.js logging disabled' : 'adapter.js logging enabled';
        },

        /**
         * Disable or enable deprecation warnings
         * @param {!boolean} bool set to true to disable warnings.
         */
        disableWarnings: function disableWarnings(bool) {
          if (typeof bool !== 'boolean') {
            return new Error('Argument type: ' + (typeof bool === "undefined" ? "undefined" : _typeof(bool)) + '. Please use a boolean.');
          }
          deprecationWarnings_ = !bool;
          return 'adapter.js deprecation warnings ' + (bool ? 'disabled' : 'enabled');
        },

        log: function log() {
          if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
            if (logDisabled_) {
              return;
            }
            if (typeof console !== 'undefined' && typeof console.log === 'function') {
              console.log.apply(console, arguments);
            }
          }
        },

        /**
         * Shows a deprecation warning suggesting the modern and spec-compatible API.
         */
        deprecated: function deprecated(oldMethod, newMethod) {
          if (!deprecationWarnings_) {
            return;
          }
          console.warn(oldMethod + ' is deprecated, please use ' + newMethod + ' instead.');
        },

        /**
         * Browser detector.
         *
         * @return {object} result containing browser and version
         *     properties.
         */
        detectBrowser: function detectBrowser(window) {
          var navigator = window && window.navigator;

          // Returned result object.
          var result = {};
          result.browser = null;
          result.version = null;

          // Fail early if it's not a browser
          if (typeof window === 'undefined' || !window.navigator) {
            result.browser = 'Not a browser.';
            return result;
          }

          if (navigator.mozGetUserMedia) {
            // Firefox.
            result.browser = 'firefox';
            result.version = extractVersion(navigator.userAgent, /Firefox\/(\d+)\./, 1);
          } else if (navigator.webkitGetUserMedia) {
            // Chrome, Chromium, Webview, Opera.
            // Version matches Chrome/WebRTC version.
            result.browser = 'chrome';
            result.version = extractVersion(navigator.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
          } else if (navigator.mediaDevices && navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)) {
            // Edge.
            result.browser = 'edge';
            result.version = extractVersion(navigator.userAgent, /Edge\/(\d+).(\d+)$/, 2);
          } else if (window.RTCPeerConnection && navigator.userAgent.match(/AppleWebKit\/(\d+)\./)) {
            // Safari.
            result.browser = 'safari';
            result.version = extractVersion(navigator.userAgent, /AppleWebKit\/(\d+)\./, 1);
          } else {
            // Default fallthrough: not supported.
            result.browser = 'Not a supported browser.';
            return result;
          }

          return result;
        }
      };
    }, {}] }, {}, [3])(3);
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9XZWJSVEMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvV2ViUlRDTG9hZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9hZGFwdGVyLmpzIl0sIm5hbWVzIjpbIldlYlJUQyIsImVsZW1lbnQiLCJwbGF5ZXJDb25maWciLCJhZFRhZ1VybCIsInRoYXQiLCJ3ZWJydGNMb2FkZXIiLCJzdXBlckRlc3Ryb3lfZnVuYyIsInNwZWMiLCJuYW1lIiwiUFJPVklERVJfV0VCUlRDIiwibXNlIiwibGlzdGVuZXIiLCJpc0xvYWRlZCIsImNhblNlZWsiLCJpc0xpdmUiLCJzZWVraW5nIiwic3RhdGUiLCJTVEFURV9JRExFIiwiYnVmZmVyIiwiZnJhbWVyYXRlIiwiY3VycmVudFF1YWxpdHkiLCJjdXJyZW50U291cmNlIiwicXVhbGl0eUxldmVscyIsInNvdXJjZXMiLCJzb3VyY2UiLCJmaWxlIiwidHlwZSIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwiZGVzdHJveSIsImxvYWRDYWxsYmFjayIsInN0cmVhbSIsInNyY09iamVjdCIsImVycm9yVHJpZ2dlciIsImNvbm5lY3QiLCJlcnJvciIsIm9uIiwiQ09OVEVOVF9NRVRBIiwiaXNBdXRvU3RhcnQiLCJnZXRTdGF0ZSIsInBsYXkiLCJvZmYiLCJXZWJSVENMb2FkZXIiLCJwcm92aWRlciIsIndlYlNvY2tldFVybCIsInBlZXJDb25uZWN0aW9uQ29uZmlnIiwiZ2V0Q29uZmlnIiwid2VicnRjQ29uZmlnIiwiaWNlU2VydmVycyIsImljZVRyYW5zcG9ydFBvbGljeSIsIndzIiwid3NQaW5nIiwibWFpblN0cmVhbSIsIm1haW5QZWVyQ29ubmVjdGlvbkluZm8iLCJjbGllbnRQZWVyQ29ubmVjdGlvbnMiLCJ3c0Nsb3NlZEJ5UGxheWVyIiwic3RhdGlzdGljc1RpbWVyIiwiY3VycmVudEJyb3dzZXIiLCJleGlzdGluZ0hhbmRsZXIiLCJ3aW5kb3ciLCJvbmJlZm9yZXVubG9hZCIsImV2ZW50IiwiY2xvc2VQZWVyIiwiZ2V0UGVlckNvbm5lY3Rpb25CeUlkIiwiaWQiLCJwZWVyQ29ubmVjdGlvbiIsImV4dHJhY3RMb3NzUGFja2V0c09uTmV0d29ya1N0YXR1cyIsInBlZXJDb25uZWN0aW9uSW5mbyIsImNsZWFyVGltZW91dCIsInN0YXR1cyIsImxvc3RQYWNrZXRzQXJyIiwic2xvdExlbmd0aCIsInByZXZQYWNrZXRzTG9zdCIsImF2ZzhMb3NzZXMiLCJhdmdNb3JlVGhhblRocmVzaG9sZENvdW50IiwidGhyZXNob2xkIiwic2V0VGltZW91dCIsImdldFN0YXRzIiwidGhlbiIsInN0YXRzIiwiYXV0b0ZhbGxiYWNrIiwiZm9yRWFjaCIsImtpbmQiLCJpc1JlbW90ZSIsImFjdHVhbFBhY2tldExvc3QiLCJwYXJzZUludCIsInBhY2tldHNMb3N0IiwicHVzaCIsImxlbmd0aCIsInNoaWZ0IiwiXyIsInJlZHVjZSIsIm1lbW8iLCJudW0iLCJ0ZW1wRXJyb3IiLCJFUlJPUlMiLCJjb2RlcyIsIlBMQVlFUl9XRUJSVENfTkVUV09SS19TTE9XIiwiY3JlYXRlTWFpblBlZXJDb25uZWN0aW9uIiwicGVlcklkIiwic2RwIiwiY2FuZGlkYXRlcyIsInJlc29sdmUiLCJSVENQZWVyQ29ubmVjdGlvbiIsInNldFJlbW90ZURlc2NyaXB0aW9uIiwiUlRDU2Vzc2lvbkRlc2NyaXB0aW9uIiwiY3JlYXRlQW5zd2VyIiwiZGVzYyIsInNldExvY2FsRGVzY3JpcHRpb24iLCJsb2NhbFNEUCIsImxvY2FsRGVzY3JpcHRpb24iLCJzZW5kTWVzc2FnZSIsInBlZXJfaWQiLCJjb21tYW5kIiwiUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUiIsIlBMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUiIsIlBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SIiwiYWRkSWNlQ2FuZGlkYXRlIiwib25pY2VjYW5kaWRhdGUiLCJlIiwiY2FuZGlkYXRlIiwib25jb25uZWN0aW9uc3RhdGVjaGFuZ2UiLCJjb25uZWN0aW9uU3RhdGUiLCJvbmljZWNvbm5lY3Rpb25zdGF0ZWNoYW5nZSIsImljZUNvbm5lY3Rpb25TdGF0ZSIsIlBMQVlFUl9XRUJSVENfVU5FWFBFQ1RFRF9ESVNDT05ORUNUIiwib250cmFjayIsInN0cmVhbXMiLCJjcmVhdGVDbGllbnRQZWVyQ29ubmVjdGlvbiIsImhvc3RJZCIsImNsaWVudElkIiwiYWRkU3RyZWFtIiwiY3JlYXRlT2ZmZXIiLCJzZXRMb2NhbEFuZFNlbmRNZXNzYWdlIiwiaGFuZGxlQ3JlYXRlT2ZmZXJFcnJvciIsInNlc3Npb25EZXNjcmlwdGlvbiIsImNvcHlDYW5kaWRhdGUiLCJiYXNpY0NhbmRpZGF0ZSIsImNsb25lQ2FuZGlkYXRlIiwiY2xvbmUiLCJnZW5lcmF0ZURvbWFpbkZyb21VcmwiLCJ1cmwiLCJyZXN1bHQiLCJtYXRjaCIsImZpbmRJcCIsIlJlZ0V4cCIsIm5ld0RvbWFpbiIsImlwIiwiUHJvbWlzZSIsInJlamVjdCIsImJyb3dzZXIiLCJmZXRjaCIsInJlc3AiLCJqc29uIiwiZGF0YSIsIkFuc3dlciIsInJlbHNvbHZlZElwIiwicmVwbGFjZSIsImkiLCJjbG9uZUNhbmRpZGF0ZVByb21pc2UiLCJSVENJY2VDYW5kaWRhdGUiLCJQTEFZRVJfV0VCUlRDX0FERF9JQ0VDQU5ESURBVEVfRVJST1IiLCJpbml0V2ViU29ja2V0IiwiV2ViU29ja2V0Iiwib25vcGVuIiwib25tZXNzYWdlIiwibWVzc2FnZSIsIkpTT04iLCJwYXJzZSIsIlBMQVlFUl9XRUJSVENfV1NfRVJST1IiLCJPYmplY3QiLCJrZXlzIiwiY29uc3RydWN0b3IiLCJ0cmlnZ2VyIiwiT01FX1AyUF9NT0RFIiwicGVlckNvbm5lY3Rpb24xIiwicGVlckNvbm5lY3Rpb24yIiwicGVlckNvbm5lY3Rpb24zIiwiY2xvc2UiLCJwYXVzZSIsIm9uY2xvc2UiLCJvbmVycm9yIiwiaW5pdGlhbGl6ZSIsImNsaWVudFBlZXJDb25uZWN0aW9uIiwiY2xlYXJJbnRlcnZhbCIsInJlYWR5U3RhdGUiLCJzZW5kIiwic3RyaW5naWZ5IiwiZiIsImV4cG9ydHMiLCJtb2R1bGUiLCJkZWZpbmUiLCJ0IiwibiIsInIiLCJzIiwibyIsInUiLCJhIiwicmVxdWlyZSIsIkVycm9yIiwiY29kZSIsImwiLCJjYWxsIiwiU0RQVXRpbHMiLCJ3cml0ZU1lZGlhU2VjdGlvbiIsInRyYW5zY2VpdmVyIiwiY2FwcyIsImR0bHNSb2xlIiwid3JpdGVSdHBEZXNjcmlwdGlvbiIsIndyaXRlSWNlUGFyYW1ldGVycyIsImljZUdhdGhlcmVyIiwiZ2V0TG9jYWxQYXJhbWV0ZXJzIiwid3JpdGVEdGxzUGFyYW1ldGVycyIsImR0bHNUcmFuc3BvcnQiLCJtaWQiLCJydHBTZW5kZXIiLCJydHBSZWNlaXZlciIsInRyYWNrSWQiLCJfaW5pdGlhbFRyYWNrSWQiLCJ0cmFjayIsIm1zaWQiLCJzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzIiwic3NyYyIsInJ0eCIsImxvY2FsQ05hbWUiLCJmaWx0ZXJJY2VTZXJ2ZXJzIiwiZWRnZVZlcnNpb24iLCJoYXNUdXJuIiwiZmlsdGVyIiwic2VydmVyIiwidXJscyIsImNvbnNvbGUiLCJ3YXJuIiwiaXNTdHJpbmciLCJ2YWxpZFR1cm4iLCJpbmRleE9mIiwiZ2V0Q29tbW9uQ2FwYWJpbGl0aWVzIiwibG9jYWxDYXBhYmlsaXRpZXMiLCJyZW1vdGVDYXBhYmlsaXRpZXMiLCJjb21tb25DYXBhYmlsaXRpZXMiLCJjb2RlY3MiLCJoZWFkZXJFeHRlbnNpb25zIiwiZmVjTWVjaGFuaXNtcyIsImZpbmRDb2RlY0J5UGF5bG9hZFR5cGUiLCJwdCIsInBheWxvYWRUeXBlIiwicHJlZmVycmVkUGF5bG9hZFR5cGUiLCJydHhDYXBhYmlsaXR5TWF0Y2hlcyIsImxSdHgiLCJyUnR4IiwibENvZGVjcyIsInJDb2RlY3MiLCJsQ29kZWMiLCJwYXJhbWV0ZXJzIiwiYXB0IiwickNvZGVjIiwidG9Mb3dlckNhc2UiLCJjbG9ja1JhdGUiLCJudW1DaGFubmVscyIsIk1hdGgiLCJtaW4iLCJydGNwRmVlZGJhY2siLCJmYiIsImoiLCJwYXJhbWV0ZXIiLCJsSGVhZGVyRXh0ZW5zaW9uIiwickhlYWRlckV4dGVuc2lvbiIsInVyaSIsImlzQWN0aW9uQWxsb3dlZEluU2lnbmFsaW5nU3RhdGUiLCJhY3Rpb24iLCJzaWduYWxpbmdTdGF0ZSIsIm9mZmVyIiwiYW5zd2VyIiwibWF5YmVBZGRDYW5kaWRhdGUiLCJpY2VUcmFuc3BvcnQiLCJhbHJlYWR5QWRkZWQiLCJnZXRSZW1vdGVDYW5kaWRhdGVzIiwiZmluZCIsInJlbW90ZUNhbmRpZGF0ZSIsImZvdW5kYXRpb24iLCJwb3J0IiwicHJpb3JpdHkiLCJwcm90b2NvbCIsImFkZFJlbW90ZUNhbmRpZGF0ZSIsIm1ha2VFcnJvciIsImRlc2NyaXB0aW9uIiwiTm90U3VwcG9ydGVkRXJyb3IiLCJJbnZhbGlkU3RhdGVFcnJvciIsIkludmFsaWRBY2Nlc3NFcnJvciIsIlR5cGVFcnJvciIsInVuZGVmaW5lZCIsIk9wZXJhdGlvbkVycm9yIiwiYWRkVHJhY2tUb1N0cmVhbUFuZEZpcmVFdmVudCIsImFkZFRyYWNrIiwiZGlzcGF0Y2hFdmVudCIsIk1lZGlhU3RyZWFtVHJhY2tFdmVudCIsInJlbW92ZVRyYWNrRnJvbVN0cmVhbUFuZEZpcmVFdmVudCIsInJlbW92ZVRyYWNrIiwiZmlyZUFkZFRyYWNrIiwicGMiLCJyZWNlaXZlciIsInRyYWNrRXZlbnQiLCJFdmVudCIsIl9kaXNwYXRjaEV2ZW50IiwiY29uZmlnIiwiX2V2ZW50VGFyZ2V0IiwiZG9jdW1lbnQiLCJjcmVhdGVEb2N1bWVudEZyYWdtZW50IiwibWV0aG9kIiwiYmluZCIsImNhblRyaWNrbGVJY2VDYW5kaWRhdGVzIiwibmVlZE5lZ290aWF0aW9uIiwibG9jYWxTdHJlYW1zIiwicmVtb3RlU3RyZWFtcyIsInJlbW90ZURlc2NyaXB0aW9uIiwiaWNlR2F0aGVyaW5nU3RhdGUiLCJ1c2luZ0J1bmRsZSIsImJ1bmRsZVBvbGljeSIsInJ0Y3BNdXhQb2xpY3kiLCJfaWNlR2F0aGVyZXJzIiwiaWNlQ2FuZGlkYXRlUG9vbFNpemUiLCJSVENJY2VHYXRoZXJlciIsImdhdGhlclBvbGljeSIsIl9jb25maWciLCJ0cmFuc2NlaXZlcnMiLCJfc2RwU2Vzc2lvbklkIiwiZ2VuZXJhdGVTZXNzaW9uSWQiLCJfc2RwU2Vzc2lvblZlcnNpb24iLCJfZHRsc1JvbGUiLCJfaXNDbG9zZWQiLCJwcm90b3R5cGUiLCJvbmFkZHN0cmVhbSIsIm9ucmVtb3Zlc3RyZWFtIiwib25zaWduYWxpbmdzdGF0ZWNoYW5nZSIsIm9uaWNlZ2F0aGVyaW5nc3RhdGVjaGFuZ2UiLCJvbm5lZ290aWF0aW9ubmVlZGVkIiwib25kYXRhY2hhbm5lbCIsIl9lbWl0R2F0aGVyaW5nU3RhdGVDaGFuZ2UiLCJnZXRDb25maWd1cmF0aW9uIiwiZ2V0TG9jYWxTdHJlYW1zIiwiZ2V0UmVtb3RlU3RyZWFtcyIsIl9jcmVhdGVUcmFuc2NlaXZlciIsImRvTm90QWRkIiwiaGFzQnVuZGxlVHJhbnNwb3J0IiwicmVjdkVuY29kaW5nUGFyYW1ldGVycyIsImFzc29jaWF0ZWRSZW1vdGVNZWRpYVN0cmVhbXMiLCJ3YW50UmVjZWl2ZSIsInRyYW5zcG9ydHMiLCJfY3JlYXRlSWNlQW5kRHRsc1RyYW5zcG9ydHMiLCJhbHJlYWR5RXhpc3RzIiwiX21heWJlRmlyZU5lZ290aWF0aW9uTmVlZGVkIiwiUlRDUnRwU2VuZGVyIiwiZ2V0VHJhY2tzIiwiY2xvbmVkU3RyZWFtIiwiaWR4IiwiY2xvbmVkVHJhY2siLCJhZGRFdmVudExpc3RlbmVyIiwiZW5hYmxlZCIsInNlbmRlciIsInN0b3AiLCJtYXAiLCJzcGxpY2UiLCJyZW1vdmVTdHJlYW0iLCJnZXRTZW5kZXJzIiwiZ2V0UmVjZWl2ZXJzIiwiX2NyZWF0ZUljZUdhdGhlcmVyIiwic2RwTUxpbmVJbmRleCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJ3cml0YWJsZSIsImJ1ZmZlcmVkQ2FuZGlkYXRlRXZlbnRzIiwiYnVmZmVyQ2FuZGlkYXRlcyIsImVuZCIsIl9nYXRoZXIiLCJvbmxvY2FsY2FuZGlkYXRlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImV2dCIsInNkcE1pZCIsImNhbmQiLCJjb21wb25lbnQiLCJ1ZnJhZyIsInVzZXJuYW1lRnJhZ21lbnQiLCJzZXJpYWxpemVkQ2FuZGlkYXRlIiwid3JpdGVDYW5kaWRhdGUiLCJwYXJzZUNhbmRpZGF0ZSIsInRvSlNPTiIsInNlY3Rpb25zIiwiZ2V0TWVkaWFTZWN0aW9ucyIsImdldERlc2NyaXB0aW9uIiwiam9pbiIsImNvbXBsZXRlIiwiZXZlcnkiLCJSVENJY2VUcmFuc3BvcnQiLCJvbmljZXN0YXRlY2hhbmdlIiwiX3VwZGF0ZUljZUNvbm5lY3Rpb25TdGF0ZSIsIl91cGRhdGVDb25uZWN0aW9uU3RhdGUiLCJSVENEdGxzVHJhbnNwb3J0Iiwib25kdGxzc3RhdGVjaGFuZ2UiLCJfZGlzcG9zZUljZUFuZER0bHNUcmFuc3BvcnRzIiwiX3RyYW5zY2VpdmUiLCJyZWN2IiwicGFyYW1zIiwiZW5jb2RpbmdzIiwicnRjcCIsImNuYW1lIiwiY29tcG91bmQiLCJydGNwUGFyYW1ldGVycyIsInAiLCJyZWNlaXZlIiwic2Vzc2lvbnBhcnQiLCJzcGxpdFNlY3Rpb25zIiwibWVkaWFTZWN0aW9uIiwicGFyc2VSdHBQYXJhbWV0ZXJzIiwiaXNJY2VMaXRlIiwibWF0Y2hQcmVmaXgiLCJyZWplY3RlZCIsImlzUmVqZWN0ZWQiLCJyZW1vdGVJY2VQYXJhbWV0ZXJzIiwiZ2V0SWNlUGFyYW1ldGVycyIsInJlbW90ZUR0bHNQYXJhbWV0ZXJzIiwiZ2V0RHRsc1BhcmFtZXRlcnMiLCJyb2xlIiwic3RhcnQiLCJfdXBkYXRlU2lnbmFsaW5nU3RhdGUiLCJyZWNlaXZlckxpc3QiLCJpY2VPcHRpb25zIiwic3Vic3RyIiwic3BsaXQiLCJsaW5lcyIsInNwbGl0TGluZXMiLCJnZXRLaW5kIiwiZGlyZWN0aW9uIiwiZ2V0RGlyZWN0aW9uIiwicmVtb3RlTXNpZCIsInBhcnNlTXNpZCIsImdldE1pZCIsImdlbmVyYXRlSWRlbnRpZmllciIsInBhcnNlUnRwRW5jb2RpbmdQYXJhbWV0ZXJzIiwicGFyc2VSdGNwUGFyYW1ldGVycyIsImlzQ29tcGxldGUiLCJjYW5kcyIsInNldFRyYW5zcG9ydCIsInNldFJlbW90ZUNhbmRpZGF0ZXMiLCJSVENSdHBSZWNlaXZlciIsImdldENhcGFiaWxpdGllcyIsImNvZGVjIiwiaXNOZXdUcmFjayIsIk1lZGlhU3RyZWFtIiwiZ2V0IiwibmF0aXZlVHJhY2siLCJzaWQiLCJpdGVtIiwibmV3U3RhdGUiLCJzdGF0ZXMiLCJjbG9zZWQiLCJjaGVja2luZyIsImNvbm5lY3RlZCIsImNvbXBsZXRlZCIsImRpc2Nvbm5lY3RlZCIsImZhaWxlZCIsImNvbm5lY3RpbmciLCJudW1BdWRpb1RyYWNrcyIsIm51bVZpZGVvVHJhY2tzIiwib2ZmZXJPcHRpb25zIiwiYXJndW1lbnRzIiwibWFuZGF0b3J5Iiwib3B0aW9uYWwiLCJvZmZlclRvUmVjZWl2ZUF1ZGlvIiwib2ZmZXJUb1JlY2VpdmVWaWRlbyIsIndyaXRlU2Vzc2lvbkJvaWxlcnBsYXRlIiwicmVtb3RlQ29kZWMiLCJoZHJFeHQiLCJyZW1vdGVFeHRlbnNpb25zIiwickhkckV4dCIsImdldExvY2FsQ2FuZGlkYXRlcyIsIm1lZGlhU2VjdGlvbnNJbk9mZmVyIiwibG9jYWxUcmFjayIsImdldEF1ZGlvVHJhY2tzIiwiZ2V0VmlkZW9UcmFja3MiLCJoYXNSdHgiLCJjIiwicmVkdWNlZFNpemUiLCJjYW5kaWRhdGVTdHJpbmciLCJ0cmltIiwicHJvbWlzZXMiLCJmaXhTdGF0c1R5cGUiLCJzdGF0IiwiaW5ib3VuZHJ0cCIsIm91dGJvdW5kcnRwIiwiY2FuZGlkYXRlcGFpciIsImxvY2FsY2FuZGlkYXRlIiwicmVtb3RlY2FuZGlkYXRlIiwicmVzdWx0cyIsIk1hcCIsImFsbCIsInJlcyIsInNldCIsIm1ldGhvZHMiLCJuYXRpdmVNZXRob2QiLCJhcmdzIiwiYXBwbHkiLCJyYW5kb20iLCJ0b1N0cmluZyIsImJsb2IiLCJsaW5lIiwicGFydHMiLCJwYXJ0IiwiaW5kZXgiLCJwcmVmaXgiLCJzdWJzdHJpbmciLCJyZWxhdGVkQWRkcmVzcyIsInJlbGF0ZWRQb3J0IiwidGNwVHlwZSIsInRvVXBwZXJDYXNlIiwicGFyc2VJY2VPcHRpb25zIiwicGFyc2VSdHBNYXAiLCJwYXJzZWQiLCJ3cml0ZVJ0cE1hcCIsInBhcnNlRXh0bWFwIiwid3JpdGVFeHRtYXAiLCJoZWFkZXJFeHRlbnNpb24iLCJwcmVmZXJyZWRJZCIsInBhcnNlRm10cCIsImt2Iiwid3JpdGVGbXRwIiwicGFyYW0iLCJwYXJzZVJ0Y3BGYiIsIndyaXRlUnRjcEZiIiwicGFyc2VTc3JjTWVkaWEiLCJzcCIsImNvbG9uIiwiYXR0cmlidXRlIiwicGFyc2VGaW5nZXJwcmludCIsImFsZ29yaXRobSIsImZpbmdlcnByaW50cyIsInNldHVwVHlwZSIsImZwIiwiY29uY2F0IiwiaWNlUGFyYW1ldGVycyIsInBhc3N3b3JkIiwibWxpbmUiLCJydHBtYXBsaW5lIiwiZm10cHMiLCJtYXhwdGltZSIsImV4dGVuc2lvbiIsImVuY29kaW5nUGFyYW1ldGVycyIsImhhc1JlZCIsImhhc1VscGZlYyIsInNzcmNzIiwicHJpbWFyeVNzcmMiLCJzZWNvbmRhcnlTc3JjIiwiZmxvd3MiLCJlbmNQYXJhbSIsImNvZGVjUGF5bG9hZFR5cGUiLCJmZWMiLCJtZWNoYW5pc20iLCJiYW5kd2lkdGgiLCJtYXhCaXRyYXRlIiwicmVtb3RlU3NyYyIsIm9iaiIsInJzaXplIiwibXV4IiwicGxhbkIiLCJzZXNzSWQiLCJzZXNzVmVyIiwic2Vzc2lvbklkIiwidmVyc2lvbiIsInBhcnNlTUxpbmUiLCJmbXQiLCJzbGljZSIsInBhcnNlT0xpbmUiLCJ1c2VybmFtZSIsInNlc3Npb25WZXJzaW9uIiwibmV0VHlwZSIsImFkZHJlc3NUeXBlIiwiYWRkcmVzcyIsImdsb2JhbCIsImFkYXB0ZXJGYWN0b3J5Iiwic2VsZiIsInV0aWxzIiwiZGVwZW5kZW5jaWVzIiwib3B0cyIsIm9wdGlvbnMiLCJzaGltQ2hyb21lIiwic2hpbUZpcmVmb3giLCJzaGltRWRnZSIsInNoaW1TYWZhcmkiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsImxvZ2dpbmciLCJicm93c2VyRGV0YWlscyIsImRldGVjdEJyb3dzZXIiLCJjaHJvbWVTaGltIiwiZWRnZVNoaW0iLCJmaXJlZm94U2hpbSIsInNhZmFyaVNoaW0iLCJjb21tb25TaGltIiwiYWRhcHRlciIsImV4dHJhY3RWZXJzaW9uIiwiZGlzYWJsZUxvZyIsImRpc2FibGVXYXJuaW5ncyIsInNoaW1QZWVyQ29ubmVjdGlvbiIsImJyb3dzZXJTaGltIiwic2hpbUNyZWF0ZU9iamVjdFVSTCIsInNoaW1HZXRVc2VyTWVkaWEiLCJzaGltTWVkaWFTdHJlYW0iLCJzaGltU291cmNlT2JqZWN0Iiwic2hpbU9uVHJhY2siLCJzaGltQWRkVHJhY2tSZW1vdmVUcmFjayIsInNoaW1HZXRTZW5kZXJzV2l0aER0bWYiLCJzaGltUlRDSWNlQ2FuZGlkYXRlIiwic2hpbU1heE1lc3NhZ2VTaXplIiwic2hpbVNlbmRUaHJvd1R5cGVFcnJvciIsInNoaW1SZW1vdmVTdHJlYW0iLCJzaGltUmVwbGFjZVRyYWNrIiwic2hpbVJUQ0ljZVNlcnZlclVybHMiLCJzaGltQ2FsbGJhY2tzQVBJIiwic2hpbUxvY2FsU3RyZWFtc0FQSSIsInNoaW1SZW1vdGVTdHJlYW1zQVBJIiwic2hpbVRyYWNrRXZlbnRUcmFuc2NlaXZlciIsInNoaW1DcmVhdGVPZmZlckxlZ2FjeSIsIndlYmtpdE1lZGlhU3RyZWFtIiwiX29udHJhY2siLCJvcmlnU2V0UmVtb3RlRGVzY3JpcHRpb24iLCJfb250cmFja3BvbHkiLCJ0ZSIsIndyYXBQZWVyQ29ubmVjdGlvbkV2ZW50Iiwic2hpbVNlbmRlcldpdGhEdG1mIiwiZHRtZiIsIl9kdG1mIiwiY3JlYXRlRFRNRlNlbmRlciIsIl9wYyIsIl9zZW5kZXJzIiwib3JpZ0FkZFRyYWNrIiwib3JpZ1JlbW92ZVRyYWNrIiwib3JpZ0FkZFN0cmVhbSIsIm9yaWdSZW1vdmVTdHJlYW0iLCJvcmlnR2V0U2VuZGVycyIsInNlbmRlcnMiLCJVUkwiLCJIVE1MTWVkaWFFbGVtZW50IiwiX3NyY09iamVjdCIsInNyYyIsInJldm9rZU9iamVjdFVSTCIsImNyZWF0ZU9iamVjdFVSTCIsInNoaW1BZGRUcmFja1JlbW92ZVRyYWNrV2l0aE5hdGl2ZSIsIl9zaGltbWVkTG9jYWxTdHJlYW1zIiwic3RyZWFtSWQiLCJET01FeGNlcHRpb24iLCJleGlzdGluZ1NlbmRlcnMiLCJuZXdTZW5kZXJzIiwibmV3U2VuZGVyIiwib3JpZ0dldExvY2FsU3RyZWFtcyIsIm5hdGl2ZVN0cmVhbXMiLCJfcmV2ZXJzZVN0cmVhbXMiLCJfc3RyZWFtcyIsIm5ld1N0cmVhbSIsIm9sZFN0cmVhbSIsInJlcGxhY2VJbnRlcm5hbFN0cmVhbUlkIiwiaW50ZXJuYWxJZCIsImV4dGVybmFsU3RyZWFtIiwiaW50ZXJuYWxTdHJlYW0iLCJyZXBsYWNlRXh0ZXJuYWxTdHJlYW1JZCIsImlzTGVnYWN5Q2FsbCIsImVyciIsIm9yaWdTZXRMb2NhbERlc2NyaXB0aW9uIiwib3JpZ0xvY2FsRGVzY3JpcHRpb24iLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJpc0xvY2FsIiwic3RyZWFtaWQiLCJoYXNUcmFjayIsIndlYmtpdFJUQ1BlZXJDb25uZWN0aW9uIiwicGNDb25maWciLCJwY0NvbnN0cmFpbnRzIiwiaWNlVHJhbnNwb3J0cyIsImdlbmVyYXRlQ2VydGlmaWNhdGUiLCJPcmlnUGVlckNvbm5lY3Rpb24iLCJuZXdJY2VTZXJ2ZXJzIiwiZGVwcmVjYXRlZCIsIm9yaWdHZXRTdGF0cyIsInNlbGVjdG9yIiwic3VjY2Vzc0NhbGxiYWNrIiwiZXJyb3JDYWxsYmFjayIsImZpeENocm9tZVN0YXRzXyIsInJlc3BvbnNlIiwic3RhbmRhcmRSZXBvcnQiLCJyZXBvcnRzIiwicmVwb3J0Iiwic3RhbmRhcmRTdGF0cyIsInRpbWVzdGFtcCIsIm5hbWVzIiwibWFrZU1hcFN0YXRzIiwic3VjY2Vzc0NhbGxiYWNrV3JhcHBlcl8iLCJwcm9taXNlIiwibmF0aXZlQWRkSWNlQ2FuZGlkYXRlIiwibmF2aWdhdG9yIiwiY29uc3RyYWludHNUb0Nocm9tZV8iLCJjYyIsImlkZWFsIiwiZXhhY3QiLCJtYXgiLCJvbGRuYW1lXyIsImNoYXJBdCIsIm9jIiwibWl4IiwiYWR2YW5jZWQiLCJzaGltQ29uc3RyYWludHNfIiwiY29uc3RyYWludHMiLCJmdW5jIiwiYXVkaW8iLCJyZW1hcCIsImIiLCJ2aWRlbyIsImZhY2UiLCJmYWNpbmdNb2RlIiwiZ2V0U3VwcG9ydGVkRmFjaW5nTW9kZUxpZXMiLCJtZWRpYURldmljZXMiLCJnZXRTdXBwb3J0ZWRDb25zdHJhaW50cyIsIm1hdGNoZXMiLCJlbnVtZXJhdGVEZXZpY2VzIiwiZGV2aWNlcyIsImQiLCJkZXYiLCJzb21lIiwibGFiZWwiLCJkZXZpY2VJZCIsInNoaW1FcnJvcl8iLCJQZXJtaXNzaW9uRGVuaWVkRXJyb3IiLCJQZXJtaXNzaW9uRGlzbWlzc2VkRXJyb3IiLCJEZXZpY2VzTm90Rm91bmRFcnJvciIsIkNvbnN0cmFpbnROb3RTYXRpc2ZpZWRFcnJvciIsIlRyYWNrU3RhcnRFcnJvciIsIk1lZGlhRGV2aWNlRmFpbGVkRHVlVG9TaHV0ZG93biIsIk1lZGlhRGV2aWNlS2lsbFN3aXRjaE9uIiwiVGFiQ2FwdHVyZUVycm9yIiwiU2NyZWVuQ2FwdHVyZUVycm9yIiwiRGV2aWNlQ2FwdHVyZUVycm9yIiwiY29uc3RyYWludCIsImNvbnN0cmFpbnROYW1lIiwiZ2V0VXNlck1lZGlhXyIsIm9uU3VjY2VzcyIsIm9uRXJyb3IiLCJ3ZWJraXRHZXRVc2VyTWVkaWEiLCJnZXRVc2VyTWVkaWEiLCJnZXRVc2VyTWVkaWFQcm9taXNlXyIsImtpbmRzIiwiTWVkaWFTdHJlYW1UcmFjayIsImdldFNvdXJjZXMiLCJkZXZpY2UiLCJncm91cElkIiwiZWNob0NhbmNlbGxhdGlvbiIsImZyYW1lUmF0ZSIsImhlaWdodCIsIndpZHRoIiwib3JpZ0dldFVzZXJNZWRpYSIsImNzIiwiTmF0aXZlUlRDSWNlQ2FuZGlkYXRlIiwibmF0aXZlQ2FuZGlkYXRlIiwicGFyc2VkQ2FuZGlkYXRlIiwiYXVnbWVudGVkQ2FuZGlkYXRlIiwibmF0aXZlQ3JlYXRlT2JqZWN0VVJMIiwibmF0aXZlUmV2b2tlT2JqZWN0VVJMIiwibmV3SWQiLCJkc2MiLCJuYXRpdmVTZXRBdHRyaWJ1dGUiLCJzZXRBdHRyaWJ1dGUiLCJSVENTY3RwVHJhbnNwb3J0IiwiX3NjdHAiLCJzY3RwSW5EZXNjcmlwdGlvbiIsIm1MaW5lIiwiZ2V0UmVtb3RlRmlyZWZveFZlcnNpb24iLCJnZXRDYW5TZW5kTWF4TWVzc2FnZVNpemUiLCJyZW1vdGVJc0ZpcmVmb3giLCJjYW5TZW5kTWF4TWVzc2FnZVNpemUiLCJnZXRNYXhNZXNzYWdlU2l6ZSIsIm1heE1lc3NhZ2VTaXplIiwiaXNGaXJlZm94IiwiY2FuU2VuZE1NUyIsInJlbW90ZU1NUyIsIk51bWJlciIsIlBPU0lUSVZFX0lORklOSVRZIiwic2N0cCIsIm9yaWdDcmVhdGVEYXRhQ2hhbm5lbCIsImNyZWF0ZURhdGFDaGFubmVsIiwiZGF0YUNoYW5uZWwiLCJvcmlnRGF0YUNoYW5uZWxTZW5kIiwiZGMiLCJzaXplIiwiYnl0ZUxlbmd0aCIsInNoaW1SVENQZWVyQ29ubmVjdGlvbiIsIm9yaWdNU1RFbmFibGVkIiwiZXYiLCJSVENEdG1mU2VuZGVyIiwiUlRDRFRNRlNlbmRlciIsInJlcGxhY2VUcmFjayIsInNldFRyYWNrIiwiUlRDVHJhY2tFdmVudCIsIm1velNyY09iamVjdCIsIm1velJUQ1BlZXJDb25uZWN0aW9uIiwibmV3U2VydmVyIiwiY3JlZGVudGlhbCIsIm1velJUQ1Nlc3Npb25EZXNjcmlwdGlvbiIsIm1velJUQ0ljZUNhbmRpZGF0ZSIsIm1vZGVyblN0YXRzVHlwZXMiLCJuYXRpdmVHZXRTdGF0cyIsIm9uU3VjYyIsIm9uRXJyIiwiSW50ZXJuYWxFcnJvciIsIlNlY3VyaXR5RXJyb3IiLCJjb25zdHJhaW50c1RvRkYzN18iLCJtb3pHZXRVc2VyTWVkaWEiLCJpbmZvcyIsIm9yZ0VudW1lcmF0ZURldmljZXMiLCJuYXRpdmVHZXRVc2VyTWVkaWEiLCJnZXRTZXR0aW5ncyIsIm5hdGl2ZUdldFNldHRpbmdzIiwiYXBwbHlDb25zdHJhaW50cyIsIm5hdGl2ZUFwcGx5Q29uc3RyYWludHMiLCJfbG9jYWxTdHJlYW1zIiwiZ2V0U3RyZWFtQnlJZCIsIl9yZW1vdGVTdHJlYW1zIiwiX2FkZFRyYWNrIiwidHJhY2tzIiwiX29uYWRkc3RyZWFtIiwiX29uYWRkc3RyZWFtcG9seSIsImZhaWx1cmVDYWxsYmFjayIsIndpdGhDYWxsYmFjayIsImNiIiwiZXJyY2IiLCJSVENUcmFuc2NlaXZlciIsIm9yaWdDcmVhdGVPZmZlciIsImF1ZGlvVHJhbnNjZWl2ZXIiLCJnZXRUcmFuc2NlaXZlcnMiLCJzZXREaXJlY3Rpb24iLCJhZGRUcmFuc2NlaXZlciIsInZpZGVvVHJhbnNjZWl2ZXIiLCJsb2dEaXNhYmxlZF8iLCJkZXByZWNhdGlvbldhcm5pbmdzXyIsInVhc3RyaW5nIiwiZXhwciIsInBvcyIsImV2ZW50TmFtZVRvV3JhcCIsIndyYXBwZXIiLCJwcm90byIsIm5hdGl2ZUFkZEV2ZW50TGlzdGVuZXIiLCJuYXRpdmVFdmVudE5hbWUiLCJ3cmFwcGVkQ2FsbGJhY2siLCJfZXZlbnRNYXAiLCJuYXRpdmVSZW1vdmVFdmVudExpc3RlbmVyIiwidW53cmFwcGVkQ2IiLCJib29sIiwib2xkTWV0aG9kIiwibmV3TWV0aG9kIiwidXNlckFnZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBOzs7Ozs7QUFNQSxJQUFNQSxTQUFTLFNBQVRBLE1BQVMsQ0FBU0MsT0FBVCxFQUFrQkMsWUFBbEIsRUFBZ0NDLFFBQWhDLEVBQXlDO0FBQ3BELFFBQUlDLE9BQU8sRUFBWDtBQUNBLFFBQUlDLGVBQWUsSUFBbkI7QUFDQSxRQUFJQyxvQkFBcUIsSUFBekI7O0FBRUEsUUFBSUMsT0FBTztBQUNQQyxjQUFPQywwQkFEQTtB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ekIsRUFDYixvQkFEYSxFQUNTLENBRFQsQ0FBakI7QUFFRCxXQUxNLE1BS0EsSUFBSTN4QixPQUFPNEMsaUJBQVAsSUFDUGlsQixVQUFVOEosU0FBVixDQUFvQnZzQixLQUFwQixDQUEwQixzQkFBMUIsQ0FERyxFQUNnRDtBQUFFO0FBQ3ZERCxtQkFBT1EsT0FBUCxHQUFpQixRQUFqQjtBQUNBUixtQkFBT3lhLE9BQVAsR0FBaUJnQyxlQUFlaUcsVUFBVThKLFNBQXpCLEVBQ2Isc0JBRGEsRUFDVyxDQURYLENBQWpCO0FBRUQsV0FMTSxNQUtBO0FBQUU7QUFDUHhzQixtQkFBT1EsT0FBUCxHQUFpQiwwQkFBakI7QUFDQSxtQkFBT1IsTUFBUDtBQUNEOztBQUVELGlCQUFPQSxNQUFQO0FBQ0Q7QUE5RmMsT0FBakI7QUFpR0MsS0FoTHFCLEVBZ0xwQixFQWhMb0IsQ0E5cEpveEIsRUFBM2IsRUE4MEp4VyxFQTkwSndXLEVBODBKclcsQ0FBQyxDQUFELENBOTBKcVcsRUE4MEpoVyxDQTkwSmdXLENBQVA7QUErMEp2VyxDQS8wSkQsRSIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLldlYlJUQ1Byb3ZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gMTEuLlxuICovXG5pbXBvcnQgUHJvdmlkZXIgZnJvbSBcImFwaS9wcm92aWRlci9odG1sNS9Qcm92aWRlclwiO1xuaW1wb3J0IFdlYlJUQ0xvYWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9XZWJSVENMb2FkZXJcIjtcbmltcG9ydCB7aXNXZWJSVEN9IGZyb20gXCJ1dGlscy92YWxpZGF0b3JcIjtcbmltcG9ydCB7ZXJyb3JUcmlnZ2VyfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XG5pbXBvcnQge1BST1ZJREVSX1dFQlJUQywgU1RBVEVfSURMRSwgQ09OVEVOVF9NRVRBLCBTVEFURV9QTEFZSU5HfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG4vKipcbiAqIEBicmllZiAgIHdlYnJ0YyBwcm92aWRlciBleHRlbmRlZCBjb3JlLlxuICogQHBhcmFtICAgY29udGFpbmVyIHBsYXllciBlbGVtZW50LlxuICogQHBhcmFtICAgcGxheWVyQ29uZmlnICAgIGNvbmZpZy5cbiAqICovXG5cbmNvbnN0IFdlYlJUQyA9IGZ1bmN0aW9uKGVsZW1lbnQsIHBsYXllckNvbmZpZywgYWRUYWdVcmwpe1xuICAgIGxldCB0aGF0ID0ge307XG4gICAgbGV0IHdlYnJ0Y0xvYWRlciA9IG51bGw7XG4gICAgbGV0IHN1cGVyRGVzdHJveV9mdW5jICA9IG51bGw7XG5cbiAgICBsZXQgc3BlYyA9IHtcbiAgICAgICAgbmFtZSA6IFBST1ZJREVSX1dFQlJUQyxcbiAgICAgICAgZWxlbWVudCA6IGVsZW1lbnQsXG4gICAgICAgIG1zZSA6IG51bGwsXG4gICAgICAgIGxpc3RlbmVyIDogbnVsbCxcbiAgICAgICAgaXNMb2FkZWQgOiBmYWxzZSxcbiAgICAgICAgY2FuU2VlayA6IGZhbHNlLFxuICAgICAgICBpc0xpdmUgOiBmYWxzZSxcbiAgICAgICAgc2Vla2luZyA6IGZhbHNlLFxuICAgICAgICBzdGF0ZSA6IFNUQVRFX0lETEUsXG4gICAgICAgIGJ1ZmZlciA6IDAsXG4gICAgICAgIGZyYW1lcmF0ZSA6IDAsXG4gICAgICAgIGN1cnJlbnRRdWFsaXR5IDogLTEsXG4gICAgICAgIGN1cnJlbnRTb3VyY2UgOiAtMSxcbiAgICAgICAgcXVhbGl0eUxldmVscyA6IFtdLFxuICAgICAgICBzb3VyY2VzIDogW10sXG4gICAgICAgIGFkVGFnVXJsIDogYWRUYWdVcmxcbiAgICB9O1xuXG4gICAgdGhhdCA9IFByb3ZpZGVyKHNwZWMsIHBsYXllckNvbmZpZywgZnVuY3Rpb24oc291cmNlKXtcbiAgICAgICAgaWYoaXNXZWJSVEMoc291cmNlLmZpbGUsIHNvdXJjZS50eXBlKSl7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJXRUJSVEMgOiBvbkJlZm9yZUxvYWQgOiBcIiwgc291cmNlKTtcbiAgICAgICAgICAgIGlmKHdlYnJ0Y0xvYWRlcil7XG4gICAgICAgICAgICAgICAgd2VicnRjTG9hZGVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB3ZWJydGNMb2FkZXIgPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgbG9hZENhbGxiYWNrID0gZnVuY3Rpb24oc3RyZWFtKXtcblxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LnNyY09iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnNyY09iamVjdCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zcmNPYmplY3QgPSBzdHJlYW07XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB3ZWJydGNMb2FkZXIgPSBXZWJSVENMb2FkZXIodGhhdCwgc291cmNlLmZpbGUsIGxvYWRDYWxsYmFjaywgZXJyb3JUcmlnZ2VyLCBwbGF5ZXJDb25maWcpO1xuXG4gICAgICAgICAgICB3ZWJydGNMb2FkZXIuY29ubmVjdChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIC8vVG9EbyA6IHJlc29sdmUgbm90IHdva3JpbmdcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKXtcbiAgICAgICAgICAgICAgICAvL3RoYXQuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIC8vRG8gbm90aGluZ1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoYXQub24oQ09OVEVOVF9NRVRBLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpKXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoYXQuZ2V0U3RhdGUoKSAhPT0gJ2Vycm9yJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB0aGF0KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHN1cGVyRGVzdHJveV9mdW5jID0gdGhhdC5zdXBlcignZGVzdHJveScpO1xuXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiV0VCUlRDIFBST1ZJREVSIExPQURFRC5cIik7XG5cblxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xuICAgICAgICBpZih3ZWJydGNMb2FkZXIpe1xuICAgICAgICAgICAgd2VicnRjTG9hZGVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIGVsZW1lbnQuc3JjT2JqZWN0ID0gbnVsbDtcbiAgICAgICAgICAgIHdlYnJ0Y0xvYWRlciA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhhdC5vZmYoQ09OVEVOVF9NRVRBLCBudWxsLCB0aGF0KTtcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiV0VCUlRDIDogIFBST1ZJREVSIERFU1RST1lFRC5cIik7XG5cbiAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMoKTtcblxuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IFdlYlJUQztcbiIsImltcG9ydCBhZGFwdGVyIGZyb20gJ3V0aWxzL2FkYXB0ZXInO1xuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcbmltcG9ydCB7YW5hbFVzZXJBZ2VudH0gZnJvbSBcInV0aWxzL2Jyb3dzZXJcIjtcbmltcG9ydCB7XG4gICAgRVJST1JTLFxuICAgIFBMQVlFUl9XRUJSVENfV1NfRVJST1IsXG4gICAgUExBWUVSX1dFQlJUQ19XU19DTE9TRUQsXG4gICAgUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SLFxuICAgIFBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SLFxuICAgIFBMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUixcbiAgICBQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SLFxuICAgIFBMQVlFUl9XRUJSVENfTkVUV09SS19TTE9XLFxuICAgIFBMQVlFUl9XRUJSVENfVU5FWFBFQ1RFRF9ESVNDT05ORUNULFxuICAgIE9NRV9QMlBfTU9ERVxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG5cbmNvbnN0IFdlYlJUQ0xvYWRlciA9IGZ1bmN0aW9uIChwcm92aWRlciwgd2ViU29ja2V0VXJsLCBsb2FkQ2FsbGJhY2ssIGVycm9yVHJpZ2dlciwgcGxheWVyQ29uZmlnKSB7XG5cbiAgICBsZXQgcGVlckNvbm5lY3Rpb25Db25maWcgPSB7XG4gICAgICAgICdpY2VTZXJ2ZXJzJzogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICd1cmxzJzogJ3N0dW46c3R1bi5sLmdvb2dsZS5jb206MTkzMDInXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xuXG4gICAgaWYgKHBsYXllckNvbmZpZy5nZXRDb25maWcoKS53ZWJydGNDb25maWcpIHtcblxuICAgICAgICBpZiAocGxheWVyQ29uZmlnLmdldENvbmZpZygpLndlYnJ0Y0NvbmZpZy5pY2VTZXJ2ZXJzKSB7XG5cbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uQ29uZmlnLmljZVNlcnZlcnMgPSBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkud2VicnRjQ29uZmlnLmljZVNlcnZlcnM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGxheWVyQ29uZmlnLmdldENvbmZpZygpLndlYnJ0Y0NvbmZpZy5pY2VUcmFuc3BvcnRQb2xpY3kpIHtcblxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25Db25maWcuaWNlVHJhbnNwb3J0UG9saWN5ID0gcGxheWVyQ29uZmlnLmdldENvbmZpZygpLndlYnJ0Y0NvbmZpZy5pY2VUcmFuc3BvcnRQb2xpY3k7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgdGhhdCA9IHt9O1xuXG4gICAgbGV0IHdzID0gbnVsbDtcblxuICAgIGxldCB3c1BpbmcgPSBudWxsO1xuXG4gICAgbGV0IG1haW5TdHJlYW0gPSBudWxsO1xuXG4gICAgLy8gdXNlZCBmb3IgZ2V0dGluZyBtZWRpYSBzdHJlYW0gZnJvbSBPTUUgb3IgaG9zdCBwZWVyXG4gICAgbGV0IG1haW5QZWVyQ29ubmVjdGlvbkluZm8gPSBudWxsO1xuXG4gICAgLy8gdXNlZCBmb3Igc2VuZCBtZWRpYSBzdHJlYW0gdG8gY2xpZW50IHBlZXIuXG4gICAgbGV0IGNsaWVudFBlZXJDb25uZWN0aW9ucyA9IHt9O1xuXG4gICAgLy9jbG9zZWQgd2Vic29ja2V0IGJ5IG9tZSBvciBjbGllbnQuXG4gICAgbGV0IHdzQ2xvc2VkQnlQbGF5ZXIgPSBmYWxzZTtcblxuICAgIGxldCBzdGF0aXN0aWNzVGltZXIgPSBudWxsO1xuXG4gICAgbGV0IGN1cnJlbnRCcm93c2VyID0gYW5hbFVzZXJBZ2VudCgpO1xuXG4gICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IGV4aXN0aW5nSGFuZGxlciA9IHdpbmRvdy5vbmJlZm9yZXVubG9hZDtcbiAgICAgICAgd2luZG93Lm9uYmVmb3JldW5sb2FkID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdIYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgZXhpc3RpbmdIYW5kbGVyKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlRoaXMgY2FsbHMgYXV0byB3aGVuIGJyb3dzZXIgY2xvc2VkLlwiKTtcbiAgICAgICAgICAgIGNsb3NlUGVlcigpO1xuICAgICAgICB9XG4gICAgfSkoKTtcblxuICAgIGZ1bmN0aW9uIGdldFBlZXJDb25uZWN0aW9uQnlJZChpZCkge1xuXG4gICAgICAgIGxldCBwZWVyQ29ubmVjdGlvbiA9IG51bGw7XG5cbiAgICAgICAgaWYgKG1haW5QZWVyQ29ubmVjdGlvbkluZm8gJiYgaWQgPT09IG1haW5QZWVyQ29ubmVjdGlvbkluZm8uaWQpIHtcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uID0gbWFpblBlZXJDb25uZWN0aW9uSW5mby5wZWVyQ29ubmVjdGlvbjtcbiAgICAgICAgfSBlbHNlIGlmIChjbGllbnRQZWVyQ29ubmVjdGlvbnNbaWRdKSB7XG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbiA9IGNsaWVudFBlZXJDb25uZWN0aW9uc1tpZF0ucGVlckNvbm5lY3Rpb247XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGVlckNvbm5lY3Rpb247XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXh0cmFjdExvc3NQYWNrZXRzT25OZXR3b3JrU3RhdHVzKHBlZXJDb25uZWN0aW9uSW5mbykge1xuXG4gICAgICAgIGlmIChwZWVyQ29ubmVjdGlvbkluZm8uc3RhdGlzdGljc1RpbWVyKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQocGVlckNvbm5lY3Rpb25JbmZvLnN0YXRpc3RpY3NUaW1lcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMpIHtcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMgPSB7fTtcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMubG9zdFBhY2tldHNBcnIgPSBbXTtcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMuc2xvdExlbmd0aCA9IDg7IC8vOCBzdGF0aXN0aWNzLiBldmVyeSAyIHNlY29uZHNcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMucHJldlBhY2tldHNMb3N0ID0gMDtcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMuYXZnOExvc3NlcyA9IDA7XG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLmF2Z01vcmVUaGFuVGhyZXNob2xkQ291bnQgPSAwOyAgLy9JZiBhdmc4TG9zcyBtb3JlIHRoYW4gdGhyZXNob2xkLlxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy50aHJlc2hvbGQgPSA0MDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBsb3N0UGFja2V0c0FyciA9IHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMubG9zdFBhY2tldHNBcnIsXG4gICAgICAgICAgICBzbG90TGVuZ3RoID0gcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5zbG90TGVuZ3RoLCAvLzggc3RhdGlzdGljcy4gZXZlcnkgMiBzZWNvbmRzXG4gICAgICAgICAgICBwcmV2UGFja2V0c0xvc3QgPSBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLnByZXZQYWNrZXRzTG9zdCxcbiAgICAgICAgICAgIGF2ZzhMb3NzZXMgPSBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLmF2ZzhMb3NzZXMsXG4gICAgICAgICAgICAvLyBhdmdNb3JlVGhhblRocmVzaG9sZENvdW50ID0gcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5hdmdNb3JlVGhhblRocmVzaG9sZENvdW50LCAgLy9JZiBhdmc4TG9zcyBtb3JlIHRoYW4gdGhyZXNob2xkLlxuICAgICAgICAgICAgdGhyZXNob2xkID0gcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy50aHJlc2hvbGQ7XG5cbiAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXRpc3RpY3NUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCFwZWVyQ29ubmVjdGlvbkluZm8ucGVlckNvbm5lY3Rpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5wZWVyQ29ubmVjdGlvbi5nZXRTdGF0cygpLnRoZW4oZnVuY3Rpb24gKHN0YXRzKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXN0YXRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocGxheWVyQ29uZmlnLmdldENvbmZpZygpLmF1dG9GYWxsYmFjayAmJiBzdGF0cykge1xuXG4gICAgICAgICAgICAgICAgICAgIHN0YXRzLmZvckVhY2goZnVuY3Rpb24gKHN0YXRlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGF0ZS50eXBlID09PSBcImluYm91bmQtcnRwXCIgJiYgc3RhdGUua2luZCA9PT0gJ3ZpZGVvJyAmJiAhc3RhdGUuaXNSZW1vdGUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vKHN0YXRlLnBhY2tldHNMb3N0IC0gcHJldlBhY2tldHNMb3N0KSBpcyByZWFsIGN1cnJlbnQgbG9zdC5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhY3R1YWxQYWNrZXRMb3N0ID0gcGFyc2VJbnQoc3RhdGUucGFja2V0c0xvc3QpIC0gcGFyc2VJbnQocHJldlBhY2tldHNMb3N0KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvc3RQYWNrZXRzQXJyLnB1c2gocGFyc2VJbnQoc3RhdGUucGFja2V0c0xvc3QpIC0gcGFyc2VJbnQocHJldlBhY2tldHNMb3N0KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9zdFBhY2tldHNBcnIubGVuZ3RoID4gc2xvdExlbmd0aCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvc3RQYWNrZXRzQXJyLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvc3RQYWNrZXRzQXJyLmxlbmd0aCA9PT0gc2xvdExlbmd0aCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF2ZzhMb3NzZXMgPSBfLnJlZHVjZShsb3N0UGFja2V0c0FyciwgZnVuY3Rpb24gKG1lbW8sIG51bSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1lbW8gKyBudW07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDApIC8gc2xvdExlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGFzdDggTE9TVCBQQUNLRVQgQVZHICA6IFwiICsgKGF2ZzhMb3NzZXMpLCBcIkN1cnJlbnQgUGFja2V0IExPU1Q6IFwiICsgIGFjdHVhbFBhY2tldExvc3QsIFwiVG90YWwgUGFja2V0IExvc3Q6IFwiICsgc3RhdGUucGFja2V0c0xvc3QsIGxvc3RQYWNrZXRzQXJyKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXZnOExvc3NlcyA+IHRocmVzaG9sZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5hdmdNb3JlVGhhblRocmVzaG9sZENvdW50ID0gcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5hdmdNb3JlVGhhblRocmVzaG9sZENvdW50ICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLmF2Z01vcmVUaGFuVGhyZXNob2xkQ291bnQgPj0gNjApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJORVRXT1JLIFVOU1RBQkxFRCEhISBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfV0VCUlRDX05FVFdPUktfU0xPV107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLmF2Z01vcmVUaGFuVGhyZXNob2xkQ291bnQgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMucHJldlBhY2tldHNMb3N0ID0gc3RhdGUucGFja2V0c0xvc3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGV4dHJhY3RMb3NzUGFja2V0c09uTmV0d29ya1N0YXR1cyhwZWVyQ29ubmVjdGlvbkluZm8pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sIDIwMDApO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlTWFpblBlZXJDb25uZWN0aW9uKGlkLCBwZWVySWQsIHNkcCwgY2FuZGlkYXRlcywgcmVzb2x2ZSkge1xuXG4gICAgICAgIGxldCBwZWVyQ29ubmVjdGlvbiA9IG5ldyBSVENQZWVyQ29ubmVjdGlvbihwZWVyQ29ubmVjdGlvbkNvbmZpZyk7XG4gICAgICAgIG1haW5QZWVyQ29ubmVjdGlvbkluZm8gPSB7XG4gICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICBwZWVySWQ6IHBlZXJJZCxcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uOiBwZWVyQ29ubmVjdGlvblxuICAgICAgICB9O1xuXG5cbiAgICAgICAgLy9TZXQgcmVtb3RlIGRlc2NyaXB0aW9uIHdoZW4gSSByZWNlaXZlZCBzZHAgZnJvbSBzZXJ2ZXIuXG4gICAgICAgIHBlZXJDb25uZWN0aW9uLnNldFJlbW90ZURlc2NyaXB0aW9uKG5ldyBSVENTZXNzaW9uRGVzY3JpcHRpb24oc2RwKSlcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uLmNyZWF0ZUFuc3dlcigpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkZXNjKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcImNyZWF0ZSBIb3N0IEFuc3dlciA6IHN1Y2Nlc3NcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uLnNldExvY2FsRGVzY3JpcHRpb24oZGVzYykudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbXkgU0RQIGNyZWF0ZWQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxvY2FsU0RQID0gcGVlckNvbm5lY3Rpb24ubG9jYWxEZXNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coJ0xvY2FsIFNEUCcsIGxvY2FsU0RQKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbmRNZXNzYWdlKHdzLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVlcl9pZDogcGVlcklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kOiAnYW5zd2VyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2RwOiBsb2NhbFNEUFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfV0VCUlRDX0NSRUFURV9BTlNXRVJfRVJST1JdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbUExBWUVSX1dFQlJUQ19TRVRfUkVNT1RFX0RFU0NfRVJST1JdO1xuICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgICAgIGNsb3NlUGVlcih0ZW1wRXJyb3IpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGNhbmRpZGF0ZXMpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiW01lc3NhZ2UgY2FuZGlkYXRlc11cIiwgY2FuZGlkYXRlcyk7XG4gICAgICAgICAgICBhZGRJY2VDYW5kaWRhdGUocGVlckNvbm5lY3Rpb24sIGNhbmRpZGF0ZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcGVlckNvbm5lY3Rpb24ub25pY2VjYW5kaWRhdGUgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKGUuY2FuZGlkYXRlKSB7XG5cbiAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJXZWJSVENMb2FkZXIgc2VuZCBjYW5kaWRhdGUgdG8gc2VydmVyIDogXCIgKyBlLmNhbmRpZGF0ZSk7XG5cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnTWFpbiBQZWVyIENvbm5lY3Rpb24gY2FuZGlkYXRlJywgZS5jYW5kaWRhdGUpO1xuXG4gICAgICAgICAgICAgICAgc2VuZE1lc3NhZ2Uod3MsIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgICAgICAgICBwZWVyX2lkOiBwZWVySWQsXG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmQ6IFwiY2FuZGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIGNhbmRpZGF0ZXM6IFtlLmNhbmRpZGF0ZV1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcGVlckNvbm5lY3Rpb24ub25jb25uZWN0aW9uc3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgLy9pY2VDb25uZWN0aW9uU3RhdGVcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIltvbiBjb25uZWN0aW9uIHN0YXRlIGNoYW5nZV1cIiwgcGVlckNvbm5lY3Rpb24uY29ubmVjdGlvblN0YXRlICxlKTtcblxuICAgICAgICB9O1xuICAgICAgICBwZWVyQ29ubmVjdGlvbi5vbmljZWNvbm5lY3Rpb25zdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJbb24gaWNlIGNvbm5lY3Rpb24gc3RhdGUgY2hhbmdlXVwiLCBwZWVyQ29ubmVjdGlvbi5pY2VDb25uZWN0aW9uU3RhdGUgLGUpO1xuXG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvUlRDUGVlckNvbm5lY3Rpb24vaWNlQ29ubmVjdGlvblN0YXRlXG4gICAgICAgICAgICAqIENoZWNrcyB0byBlbnN1cmUgdGhhdCBjb21wb25lbnRzIGFyZSBzdGlsbCBjb25uZWN0ZWQgZmFpbGVkIGZvciBhdCBsZWFzdCBvbmUgY29tcG9uZW50IG9mIHRoZSBSVENQZWVyQ29ubmVjdGlvbi4gVGhpcyBpcyBhIGxlc3Mgc3RyaW5nZW50IHRlc3QgdGhhbiBcImZhaWxlZFwiIGFuZCBtYXkgdHJpZ2dlciBpbnRlcm1pdHRlbnRseSBhbmQgcmVzb2x2ZSBqdXN0IGFzIHNwb250YW5lb3VzbHkgb24gbGVzcyByZWxpYWJsZSBuZXR3b3Jrcywgb3IgZHVyaW5nIHRlbXBvcmFyeSBkaXNjb25uZWN0aW9ucy4gV2hlbiB0aGUgcHJvYmxlbSByZXNvbHZlcywgdGhlIGNvbm5lY3Rpb24gbWF5IHJldHVybiB0byB0aGUgXCJjb25uZWN0ZWRcIiBzdGF0ZS5cbiAgICAgICAgICAgICogKi9cbiAgICAgICAgICAgIC8vVGhpcyBwcm9jZXNzIGlzIG15IGltYWdpbmF0aW9uLiBJIGRvIG5vdCBrbm93IGhvdyB0byByZXByb2R1Y2UuXG4gICAgICAgICAgICAvL1NpdHVhdGlvbiA6IE9NRSBpcyBkZWFkIGJ1dCBvbWUgY2FuJ3Qgc2VuZCAnc3RvcCcgbWVzc2FnZS5cbiAgICAgICAgICAgIGlmIChwZWVyQ29ubmVjdGlvbi5pY2VDb25uZWN0aW9uU3RhdGUgPT09ICdkaXNjb25uZWN0ZWQnIHx8IHBlZXJDb25uZWN0aW9uLmljZUNvbm5lY3Rpb25TdGF0ZSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXdzQ2xvc2VkQnlQbGF5ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1haW5QZWVyQ29ubmVjdGlvbkluZm8pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbUExBWUVSX1dFQlJUQ19VTkVYUEVDVEVEX0RJU0NPTk5FQ1RdO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHBlZXJDb25uZWN0aW9uLm9udHJhY2sgPSBmdW5jdGlvbiAoZSkge1xuXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJzdHJlYW0gcmVjZWl2ZWQuXCIpO1xuXG4gICAgICAgICAgICBleHRyYWN0TG9zc1BhY2tldHNPbk5ldHdvcmtTdGF0dXMobWFpblBlZXJDb25uZWN0aW9uSW5mbyk7XG4gICAgICAgICAgICBtYWluU3RyZWFtID0gZS5zdHJlYW1zWzBdO1xuICAgICAgICAgICAgbG9hZENhbGxiYWNrKGUuc3RyZWFtc1swXSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlQ2xpZW50UGVlckNvbm5lY3Rpb24oaG9zdElkLCBjbGllbnRJZCkge1xuXG4gICAgICAgIGlmICghbWFpblN0cmVhbSkge1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgIGNyZWF0ZUNsaWVudFBlZXJDb25uZWN0aW9uKGhvc3RJZCwgY2xpZW50SWQpO1xuICAgICAgICAgICAgfSwgMTAwKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHBlZXJDb25uZWN0aW9uID0gbmV3IFJUQ1BlZXJDb25uZWN0aW9uKHBlZXJDb25uZWN0aW9uQ29uZmlnKTtcblxuICAgICAgICBjbGllbnRQZWVyQ29ubmVjdGlvbnNbY2xpZW50SWRdID0ge1xuICAgICAgICAgICAgaWQ6IGNsaWVudElkLFxuICAgICAgICAgICAgcGVlcklkOiBob3N0SWQsXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbjogcGVlckNvbm5lY3Rpb25cbiAgICAgICAgfTtcblxuICAgICAgICBwZWVyQ29ubmVjdGlvbi5hZGRTdHJlYW0obWFpblN0cmVhbSk7XG5cbiAgICAgICAgLy8gbGV0IG9mZmVyT3B0aW9uID0ge1xuICAgICAgICAvLyAgICAgb2ZmZXJUb1JlY2VpdmVBdWRpbzogMSxcbiAgICAgICAgLy8gICAgIG9mZmVyVG9SZWNlaXZlVmlkZW86IDFcbiAgICAgICAgLy8gfTtcblxuICAgICAgICBwZWVyQ29ubmVjdGlvbi5jcmVhdGVPZmZlcihzZXRMb2NhbEFuZFNlbmRNZXNzYWdlLCBoYW5kbGVDcmVhdGVPZmZlckVycm9yLCB7fSk7XG5cbiAgICAgICAgZnVuY3Rpb24gc2V0TG9jYWxBbmRTZW5kTWVzc2FnZShzZXNzaW9uRGVzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uLnNldExvY2FsRGVzY3JpcHRpb24oc2Vzc2lvbkRlc2NyaXB0aW9uKTtcblxuICAgICAgICAgICAgc2VuZE1lc3NhZ2Uod3MsIHtcbiAgICAgICAgICAgICAgICBpZDogaG9zdElkLFxuICAgICAgICAgICAgICAgIHBlZXJfaWQ6IGNsaWVudElkLFxuICAgICAgICAgICAgICAgIHNkcDogc2Vzc2lvbkRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgIGNvbW1hbmQ6ICdvZmZlcl9wMnAnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZUNyZWF0ZU9mZmVyRXJyb3IoZXZlbnQpIHtcblxuICAgICAgICB9XG5cbiAgICAgICAgcGVlckNvbm5lY3Rpb24ub25pY2VjYW5kaWRhdGUgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKGUuY2FuZGlkYXRlKSB7XG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiV2ViUlRDTG9hZGVyIHNlbmQgY2FuZGlkYXRlIHRvIHNlcnZlciA6IFwiICsgZS5jYW5kaWRhdGUpO1xuXG5cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnQ2xpZW50IFBlZXIgQ29ubmVjdGlvbiBjYW5kaWRhdGUnLCBlLmNhbmRpZGF0ZSk7XG5cbiAgICAgICAgICAgICAgICBzZW5kTWVzc2FnZSh3cywge1xuICAgICAgICAgICAgICAgICAgICBpZDogaG9zdElkLFxuICAgICAgICAgICAgICAgICAgICBwZWVyX2lkOiBjbGllbnRJZCxcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZDogXCJjYW5kaWRhdGVfcDJwXCIsXG4gICAgICAgICAgICAgICAgICAgIGNhbmRpZGF0ZXM6IFtlLmNhbmRpZGF0ZV1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGxldCBjb3B5Q2FuZGlkYXRlID0gZnVuY3Rpb24oYmFzaWNDYW5kaWRhdGUpe1xuXG4gICAgICAgIGxldCBjbG9uZUNhbmRpZGF0ZSA9IF8uY2xvbmUoYmFzaWNDYW5kaWRhdGUpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGdlbmVyYXRlRG9tYWluRnJvbVVybCh1cmwpIHtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSAnJztcbiAgICAgICAgICAgIGxldCBtYXRjaDtcbiAgICAgICAgICAgIGlmIChtYXRjaCA9IHVybC5tYXRjaCgvXig/Ondzcz86XFwvXFwvKT8oPzpbXkBcXG5dK0ApPyg/Ond3d1xcLik/KFteOlxcL1xcblxcP1xcPV0rKS9pbSkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBtYXRjaFsxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBmaW5kSXAgKGNhbmRpZGF0ZSl7XG5cbiAgICAgICAgICAgIGxldCByZXN1bHQgPSAnJztcbiAgICAgICAgICAgIGxldCBtYXRjaDtcblxuICAgICAgICAgICAgaWYobWF0Y2ggPSBjYW5kaWRhdGUubWF0Y2gobmV3IFJlZ0V4cChcIlxcXFxiKDI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPylcXFxcLigyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT8pXFxcXC4oMjVbMC01XXwyWzAtNF1bMC05XXxbMDFdP1swLTldWzAtOV0/KVxcXFwuKDI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPylcXFxcYlwiLCAnZ2knKSkpe1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG1hdGNoWzBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG5ld0RvbWFpbiA9IGdlbmVyYXRlRG9tYWluRnJvbVVybCh3ZWJTb2NrZXRVcmwpO1xuICAgICAgICBsZXQgaXAgPSBmaW5kSXAoY2xvbmVDYW5kaWRhdGUuY2FuZGlkYXRlKTtcblxuICAgICAgICBpZihpcCA9PT0gJycgfHwgaXAgPT09IG5ld0RvbWFpbil7XG5cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgLy8gZmlyZWZveCBicm93c2VyIHRocm93cyBhIGNhbmRpZGF0ZSBwYXJzaW5nIGV4Y2VwdGlvbiB3aGVuIGEgZG9tYWluIG5hbWUgaXMgc2V0IGF0IHRoZSBhZGRyZXNzIHByb3BlcnR5LiBTbyB3ZSByZXNvbHZlIHRoZSBkbnMgdXNpbmcgZ29vZ2xlIGRucyByZXNvbHZlIGFwaS5cbiAgICAgICAgICAgIGlmIChjdXJyZW50QnJvd3Nlci5icm93c2VyID09PSAnRmlyZWZveCcgJiYgIWZpbmRJcChuZXdEb21haW4pKSB7XG5cbiAgICAgICAgICAgICAgICBmZXRjaCgnaHR0cHM6Ly9kbnMuZ29vZ2xlLmNvbS9yZXNvbHZlP25hbWU9JyArIG5ld0RvbWFpbilcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzcCA9PiByZXNwLmpzb24oKSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEuQW5zd2VyICYmIGRhdGEuQW5zd2VyLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLkFuc3dlclswXS5kYXRhKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlbHNvbHZlZElwID0gZGF0YS5BbnN3ZXJbMF0uZGF0YTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9uZUNhbmRpZGF0ZS5jYW5kaWRhdGUgPSBjbG9uZUNhbmRpZGF0ZS5jYW5kaWRhdGUucmVwbGFjZShpcCwgcmVsc29sdmVkSXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGNsb25lQ2FuZGlkYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBjbG9uZUNhbmRpZGF0ZS5jYW5kaWRhdGUgPSBjbG9uZUNhbmRpZGF0ZS5jYW5kaWRhdGUucmVwbGFjZShpcCwgbmV3RG9tYWluKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGNsb25lQ2FuZGlkYXRlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gYWRkSWNlQ2FuZGlkYXRlKHBlZXJDb25uZWN0aW9uLCBjYW5kaWRhdGVzKSB7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYW5kaWRhdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoY2FuZGlkYXRlc1tpXSAmJiBjYW5kaWRhdGVzW2ldLmNhbmRpZGF0ZSkge1xuXG4gICAgICAgICAgICAgICAgbGV0IGJhc2ljQ2FuZGlkYXRlID0gY2FuZGlkYXRlc1tpXTtcblxuICAgICAgICAgICAgICAgIGxldCBjbG9uZUNhbmRpZGF0ZVByb21pc2UgPSBjb3B5Q2FuZGlkYXRlKGJhc2ljQ2FuZGlkYXRlKTtcblxuICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uLmFkZEljZUNhbmRpZGF0ZShuZXcgUlRDSWNlQ2FuZGlkYXRlKGJhc2ljQ2FuZGlkYXRlKSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcImFkZEljZUNhbmRpZGF0ZSA6IHN1Y2Nlc3NcIik7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SXTtcbiAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcih0ZW1wRXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYoY2xvbmVDYW5kaWRhdGVQcm9taXNlKXtcbiAgICAgICAgICAgICAgICAgICAgY2xvbmVDYW5kaWRhdGVQcm9taXNlLnRoZW4oZnVuY3Rpb24gKGNsb25lQ2FuZGlkYXRlKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbG9uZUNhbmRpZGF0ZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24uYWRkSWNlQ2FuZGlkYXRlKG5ldyBSVENJY2VDYW5kaWRhdGUoY2xvbmVDYW5kaWRhdGUpKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJjbG9uZWQgYWRkSWNlQ2FuZGlkYXRlIDogc3VjY2Vzc1wiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcih0ZW1wRXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0V2ViU29ja2V0KHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgIHdzID0gbmV3IFdlYlNvY2tldCh3ZWJTb2NrZXRVcmwpO1xuXG4gICAgICAgICAgICB3cy5vbm9wZW4gPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICBzZW5kTWVzc2FnZSh3cywge1xuICAgICAgICAgICAgICAgICAgICBjb21tYW5kOiBcInJlcXVlc3Rfb2ZmZXJcIlxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8gd3NQaW5nID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgLy8gICAgIHNlbmRNZXNzYWdlKHdzLCB7Y29tbWFuZDogXCJwaW5nXCJ9KTtcbiAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgIC8vIH0sIDIwICogMTAwMCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB3cy5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZSkge1xuXG4gICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IEpTT04ucGFyc2UoZS5kYXRhKTtcblxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbUExBWUVSX1dFQlJUQ19XU19FUlJPUl07XG4gICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IG1lc3NhZ2UuZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcih0ZW1wRXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKG1lc3NhZ2UpLmxlbmd0aCA9PT0gMCAmJiBtZXNzYWdlLmNvbnN0cnVjdG9yID09PSBPYmplY3QpIHtcblxuICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coJ0VtcHR5IE1lc3NhZ2UnKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLmNvbW1hbmQgPT09ICdwaW5nJykge1xuXG4gICAgICAgICAgICAgICAgICAgIHNlbmRNZXNzYWdlKHdzLCB7Y29tbWFuZDogJ3BvbmcnfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIW1lc3NhZ2UuaWQpIHtcblxuICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coJ0lEIG11c3QgYmUgbm90IG51bGwnKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLmNvbW1hbmQgPT09ICdvZmZlcicpIHtcblxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVNYWluUGVlckNvbm5lY3Rpb24obWVzc2FnZS5pZCwgbWVzc2FnZS5wZWVyX2lkLCBtZXNzYWdlLnNkcCwgbWVzc2FnZS5jYW5kaWRhdGVzLCByZXNvbHZlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYobWVzc2FnZS5wZWVyX2lkID09PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoT01FX1AyUF9NT0RFLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihPTUVfUDJQX01PREUsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UuY29tbWFuZCA9PT0gJ3JlcXVlc3Rfb2ZmZXJfcDJwJykge1xuXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUNsaWVudFBlZXJDb25uZWN0aW9uKG1lc3NhZ2UuaWQsIG1lc3NhZ2UucGVlcl9pZCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UuY29tbWFuZCA9PT0gJ2Fuc3dlcl9wMnAnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHBlZXJDb25uZWN0aW9uMSA9IGdldFBlZXJDb25uZWN0aW9uQnlJZChtZXNzYWdlLnBlZXJfaWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uMS5zZXRSZW1vdGVEZXNjcmlwdGlvbihuZXcgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKG1lc3NhZ2Uuc2RwKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkZXNjKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfV0VCUlRDX1NFVF9SRU1PVEVfREVTQ19FUlJPUl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5jb21tYW5kID09PSAnY2FuZGlkYXRlJykge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIENhbmRpZGF0ZXMgZm9yIG5ldyBjbGllbnQgcGVlclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGVlckNvbm5lY3Rpb24yID0gZ2V0UGVlckNvbm5lY3Rpb25CeUlkKG1lc3NhZ2UuaWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGFkZEljZUNhbmRpZGF0ZShwZWVyQ29ubmVjdGlvbjIsIG1lc3NhZ2UuY2FuZGlkYXRlcyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UuY29tbWFuZCA9PT0gJ2NhbmRpZGF0ZV9wMnAnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQ2FuZGlkYXRlcyBmb3IgbmV3IGNsaWVudCBwZWVyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwZWVyQ29ubmVjdGlvbjMgPSBnZXRQZWVyQ29ubmVjdGlvbkJ5SWQobWVzc2FnZS5wZWVyX2lkKTtcblxuICAgICAgICAgICAgICAgICAgICBhZGRJY2VDYW5kaWRhdGUocGVlckNvbm5lY3Rpb24zLCBtZXNzYWdlLmNhbmRpZGF0ZXMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLmNvbW1hbmQgPT09ICdzdG9wJykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChtYWluUGVlckNvbm5lY3Rpb25JbmZvLnBlZXJJZCA9PT0gbWVzc2FnZS5wZWVyX2lkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vTXkgcGFyZW50IHdhcyBkZWFkLiBBbmQgdGhlbiBJIHdpbGwgcmV0cnkuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNsb3NlIGNvbm5lY3Rpb24gd2l0aCBob3N0IGFuZCByZXRyeVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2Nsb3NlIGNvbm5lY3Rpb24gd2l0aCBob3N0Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5TdHJlYW0gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFpblBlZXJDb25uZWN0aW9uSW5mby5wZWVyQ29ubmVjdGlvbi5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFpblBlZXJDb25uZWN0aW9uSW5mbyA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVzZXRDYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIucGF1c2UoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc2VuZE1lc3NhZ2Uod3MsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kOiAncmVxdWVzdF9vZmZlcidcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNsb3NlIGNvbm5lY3Rpb24gd2l0aCBjbGllbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbGllbnRQZWVyQ29ubmVjdGlvbnNbbWVzc2FnZS5wZWVyX2lkXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdjbG9zZSBjb25uZWN0aW9uIHdpdGggY2xpZW50OiAnLCBtZXNzYWdlLnBlZXJfaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudFBlZXJDb25uZWN0aW9uc1ttZXNzYWdlLnBlZXJfaWRdLnBlZXJDb25uZWN0aW9uLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGNsaWVudFBlZXJDb25uZWN0aW9uc1ttZXNzYWdlLnBlZXJfaWRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdzLm9uY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICBpZighd3NDbG9zZWRCeVBsYXllcil7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfV0VCUlRDX1dTX0VSUk9SXTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobWFpblBlZXJDb25uZWN0aW9uSW5mbykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9XRUJSVENfVU5FWFBFQ1RFRF9ESVNDT05ORUNUXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcih0ZW1wRXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHdzLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXJyb3IpIHtcblxuICAgICAgICAgICAgICAgIC8vV2h5IEVkZ2UgQnJvd3NlciBjYWxscyBvbmVycm9yKCkgd2hlbiB3cy5jbG9zZSgpP1xuICAgICAgICAgICAgICAgIGlmKCF3c0Nsb3NlZEJ5UGxheWVyKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfV0VCUlRDX1dTX0VSUk9SXTtcbiAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcih0ZW1wRXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAvLyByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcblxuICAgICAgICAgICAgY2xvc2VQZWVyKGVycm9yKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiV2ViUlRDTG9hZGVyIGNvbm5lY3RpbmcuLi5cIik7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiV2ViUlRDTG9hZGVyIHVybCA6IFwiICsgd2ViU29ja2V0VXJsKTtcblxuICAgICAgICAgICAgaW5pdFdlYlNvY2tldChyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9zZVBlZXIoZXJyb3IpIHtcblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coJ1dlYlJUQyBMb2FkZXIgY2xvc2VQZWVyKCknKTtcblxuICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgICB3c0Nsb3NlZEJ5UGxheWVyID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtYWluUGVlckNvbm5lY3Rpb25JbmZvKSB7XG5cbiAgICAgICAgICAgIGlmIChtYWluUGVlckNvbm5lY3Rpb25JbmZvLnN0YXRpc3RpY3NUaW1lcikge1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChtYWluUGVlckNvbm5lY3Rpb25JbmZvLnN0YXRpc3RpY3NUaW1lcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1haW5TdHJlYW0gPSBudWxsO1xuXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coJ0Nsb3NpbmcgbWFpbiBwZWVyIGNvbm5lY3Rpb24uLi4nKTtcbiAgICAgICAgICAgIGlmIChzdGF0aXN0aWNzVGltZXIpIHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoc3RhdGlzdGljc1RpbWVyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbWFpblBlZXJDb25uZWN0aW9uSW5mby5wZWVyQ29ubmVjdGlvbi5jbG9zZSgpO1xuICAgICAgICAgICAgbWFpblBlZXJDb25uZWN0aW9uSW5mby5wZWVyQ29ubmVjdGlvbiA9IG51bGw7XG4gICAgICAgICAgICBtYWluUGVlckNvbm5lY3Rpb25JbmZvID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhjbGllbnRQZWVyQ29ubmVjdGlvbnMpLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgZm9yIChsZXQgY2xpZW50SWQgaW4gY2xpZW50UGVlckNvbm5lY3Rpb25zKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgY2xpZW50UGVlckNvbm5lY3Rpb24gPSBjbGllbnRQZWVyQ29ubmVjdGlvbnNbY2xpZW50SWRdLnBlZXJDb25uZWN0aW9uO1xuXG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKCdDbG9zaW5nIGNsaWVudCBwZWVyIGNvbm5lY3Rpb24uLi4nKTtcbiAgICAgICAgICAgICAgICBjbGllbnRQZWVyQ29ubmVjdGlvbi5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIGNsaWVudFBlZXJDb25uZWN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2xpZW50UGVlckNvbm5lY3Rpb25zID0ge307XG4gICAgICAgIH1cblxuICAgICAgICBjbGVhckludGVydmFsKHdzUGluZyk7XG4gICAgICAgIHdzUGluZyA9IG51bGw7XG5cbiAgICAgICAgaWYgKHdzKSB7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coJ0Nsb3Npbmcgd2Vic29ja2V0IGNvbm5lY3Rpb24uLi4nKTtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlNlbmQgU2lnbmFsaW5nIDogU3RvcC5cIik7XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgMCAoQ09OTkVDVElORylcbiAgICAgICAgICAgIDEgKE9QRU4pXG4gICAgICAgICAgICAyIChDTE9TSU5HKVxuICAgICAgICAgICAgMyAoQ0xPU0VEKVxuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmICh3cy5yZWFkeVN0YXRlID09PSAwIHx8IHdzLnJlYWR5U3RhdGUgPT09IDEpIHtcblxuICAgICAgICAgICAgICAgIHdzQ2xvc2VkQnlQbGF5ZXIgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKG1haW5QZWVyQ29ubmVjdGlvbkluZm8pIHtcbiAgICAgICAgICAgICAgICAgICAgc2VuZE1lc3NhZ2Uod3MsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmQ6ICdzdG9wJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBtYWluUGVlckNvbm5lY3Rpb25JbmZvLmlkXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHdzLmNsb3NlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB3c0Nsb3NlZEJ5UGxheWVyID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB3cyA9IG51bGw7XG5cbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICBlcnJvclRyaWdnZXIoZXJyb3IsIHByb3ZpZGVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNlbmRNZXNzYWdlKHdzLCBtZXNzYWdlKSB7XG5cbiAgICAgICAgaWYgKHdzKSB7XG4gICAgICAgICAgICB3cy5zZW5kKEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgdGhhdC5jb25uZWN0ID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gaW5pdGlhbGl6ZSgpO1xuICAgIH07XG5cbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgICAgIGNsb3NlUGVlcigpO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFdlYlJUQ0xvYWRlcjtcbiIsIihmdW5jdGlvbihmKXtpZih0eXBlb2YgZXhwb3J0cz09PVwib2JqZWN0XCImJnR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiKXttb2R1bGUuZXhwb3J0cz1mKCl9ZWxzZSBpZih0eXBlb2YgZGVmaW5lPT09XCJmdW5jdGlvblwiJiZkZWZpbmUuYW1kKXtkZWZpbmUoW10sZil9ZWxzZXt2YXIgZztpZih0eXBlb2Ygd2luZG93IT09XCJ1bmRlZmluZWRcIil7Zz13aW5kb3d9ZWxzZSBpZih0eXBlb2YgZ2xvYmFsIT09XCJ1bmRlZmluZWRcIil7Zz1nbG9iYWx9ZWxzZSBpZih0eXBlb2Ygc2VsZiE9PVwidW5kZWZpbmVkXCIpe2c9c2VsZn1lbHNle2c9dGhpc31nLmFkYXB0ZXIgPSBmKCl9fSkoZnVuY3Rpb24oKXt2YXIgZGVmaW5lLG1vZHVsZSxleHBvcnRzO3JldHVybiAoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vKlxuICogIENvcHlyaWdodCAoYykgMjAxNyBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxuICogIHRyZWUuXG4gKi9cbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIFNEUFV0aWxzID0gcmVxdWlyZSgnc2RwJyk7XG5cbmZ1bmN0aW9uIHdyaXRlTWVkaWFTZWN0aW9uKHRyYW5zY2VpdmVyLCBjYXBzLCB0eXBlLCBzdHJlYW0sIGR0bHNSb2xlKSB7XG4gIHZhciBzZHAgPSBTRFBVdGlscy53cml0ZVJ0cERlc2NyaXB0aW9uKHRyYW5zY2VpdmVyLmtpbmQsIGNhcHMpO1xuXG4gIC8vIE1hcCBJQ0UgcGFyYW1ldGVycyAodWZyYWcsIHB3ZCkgdG8gU0RQLlxuICBzZHAgKz0gU0RQVXRpbHMud3JpdGVJY2VQYXJhbWV0ZXJzKFxuICAgICAgdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIuZ2V0TG9jYWxQYXJhbWV0ZXJzKCkpO1xuXG4gIC8vIE1hcCBEVExTIHBhcmFtZXRlcnMgdG8gU0RQLlxuICBzZHAgKz0gU0RQVXRpbHMud3JpdGVEdGxzUGFyYW1ldGVycyhcbiAgICAgIHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQuZ2V0TG9jYWxQYXJhbWV0ZXJzKCksXG4gICAgICB0eXBlID09PSAnb2ZmZXInID8gJ2FjdHBhc3MnIDogZHRsc1JvbGUgfHwgJ2FjdGl2ZScpO1xuXG4gIHNkcCArPSAnYT1taWQ6JyArIHRyYW5zY2VpdmVyLm1pZCArICdcXHJcXG4nO1xuXG4gIGlmICh0cmFuc2NlaXZlci5ydHBTZW5kZXIgJiYgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIpIHtcbiAgICBzZHAgKz0gJ2E9c2VuZHJlY3ZcXHJcXG4nO1xuICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlcikge1xuICAgIHNkcCArPSAnYT1zZW5kb25seVxcclxcbic7XG4gIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIpIHtcbiAgICBzZHAgKz0gJ2E9cmVjdm9ubHlcXHJcXG4nO1xuICB9IGVsc2Uge1xuICAgIHNkcCArPSAnYT1pbmFjdGl2ZVxcclxcbic7XG4gIH1cblxuICBpZiAodHJhbnNjZWl2ZXIucnRwU2VuZGVyKSB7XG4gICAgdmFyIHRyYWNrSWQgPSB0cmFuc2NlaXZlci5ydHBTZW5kZXIuX2luaXRpYWxUcmFja0lkIHx8XG4gICAgICAgIHRyYW5zY2VpdmVyLnJ0cFNlbmRlci50cmFjay5pZDtcbiAgICB0cmFuc2NlaXZlci5ydHBTZW5kZXIuX2luaXRpYWxUcmFja0lkID0gdHJhY2tJZDtcbiAgICAvLyBzcGVjLlxuICAgIHZhciBtc2lkID0gJ21zaWQ6JyArIChzdHJlYW0gPyBzdHJlYW0uaWQgOiAnLScpICsgJyAnICtcbiAgICAgICAgdHJhY2tJZCArICdcXHJcXG4nO1xuICAgIHNkcCArPSAnYT0nICsgbXNpZDtcbiAgICAvLyBmb3IgQ2hyb21lLiBMZWdhY3kgc2hvdWxkIG5vIGxvbmdlciBiZSByZXF1aXJlZC5cbiAgICBzZHAgKz0gJ2E9c3NyYzonICsgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjICtcbiAgICAgICAgJyAnICsgbXNpZDtcblxuICAgIC8vIFJUWFxuICAgIGlmICh0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCkge1xuICAgICAgc2RwICs9ICdhPXNzcmM6JyArIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4LnNzcmMgK1xuICAgICAgICAgICcgJyArIG1zaWQ7XG4gICAgICBzZHAgKz0gJ2E9c3NyYy1ncm91cDpGSUQgJyArXG4gICAgICAgICAgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjICsgJyAnICtcbiAgICAgICAgICB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eC5zc3JjICtcbiAgICAgICAgICAnXFxyXFxuJztcbiAgICB9XG4gIH1cbiAgLy8gRklYTUU6IHRoaXMgc2hvdWxkIGJlIHdyaXR0ZW4gYnkgd3JpdGVSdHBEZXNjcmlwdGlvbi5cbiAgc2RwICs9ICdhPXNzcmM6JyArIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYyArXG4gICAgICAnIGNuYW1lOicgKyBTRFBVdGlscy5sb2NhbENOYW1lICsgJ1xcclxcbic7XG4gIGlmICh0cmFuc2NlaXZlci5ydHBTZW5kZXIgJiYgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHgpIHtcbiAgICBzZHAgKz0gJ2E9c3NyYzonICsgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHguc3NyYyArXG4gICAgICAgICcgY25hbWU6JyArIFNEUFV0aWxzLmxvY2FsQ05hbWUgKyAnXFxyXFxuJztcbiAgfVxuICByZXR1cm4gc2RwO1xufVxuXG4vLyBFZGdlIGRvZXMgbm90IGxpa2Vcbi8vIDEpIHN0dW46IGZpbHRlcmVkIGFmdGVyIDE0MzkzIHVubGVzcyA/dHJhbnNwb3J0PXVkcCBpcyBwcmVzZW50XG4vLyAyKSB0dXJuOiB0aGF0IGRvZXMgbm90IGhhdmUgYWxsIG9mIHR1cm46aG9zdDpwb3J0P3RyYW5zcG9ydD11ZHBcbi8vIDMpIHR1cm46IHdpdGggaXB2NiBhZGRyZXNzZXNcbi8vIDQpIHR1cm46IG9jY3VycmluZyBtdWxpcGxlIHRpbWVzXG5mdW5jdGlvbiBmaWx0ZXJJY2VTZXJ2ZXJzKGljZVNlcnZlcnMsIGVkZ2VWZXJzaW9uKSB7XG4gIHZhciBoYXNUdXJuID0gZmFsc2U7XG4gIGljZVNlcnZlcnMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGljZVNlcnZlcnMpKTtcbiAgcmV0dXJuIGljZVNlcnZlcnMuZmlsdGVyKGZ1bmN0aW9uKHNlcnZlcikge1xuICAgIGlmIChzZXJ2ZXIgJiYgKHNlcnZlci51cmxzIHx8IHNlcnZlci51cmwpKSB7XG4gICAgICB2YXIgdXJscyA9IHNlcnZlci51cmxzIHx8IHNlcnZlci51cmw7XG4gICAgICBpZiAoc2VydmVyLnVybCAmJiAhc2VydmVyLnVybHMpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdSVENJY2VTZXJ2ZXIudXJsIGlzIGRlcHJlY2F0ZWQhIFVzZSB1cmxzIGluc3RlYWQuJyk7XG4gICAgICB9XG4gICAgICB2YXIgaXNTdHJpbmcgPSB0eXBlb2YgdXJscyA9PT0gJ3N0cmluZyc7XG4gICAgICBpZiAoaXNTdHJpbmcpIHtcbiAgICAgICAgdXJscyA9IFt1cmxzXTtcbiAgICAgIH1cbiAgICAgIHVybHMgPSB1cmxzLmZpbHRlcihmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgdmFyIHZhbGlkVHVybiA9IHVybC5pbmRleE9mKCd0dXJuOicpID09PSAwICYmXG4gICAgICAgICAgICB1cmwuaW5kZXhPZigndHJhbnNwb3J0PXVkcCcpICE9PSAtMSAmJlxuICAgICAgICAgICAgdXJsLmluZGV4T2YoJ3R1cm46WycpID09PSAtMSAmJlxuICAgICAgICAgICAgIWhhc1R1cm47XG5cbiAgICAgICAgaWYgKHZhbGlkVHVybikge1xuICAgICAgICAgIGhhc1R1cm4gPSB0cnVlO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1cmwuaW5kZXhPZignc3R1bjonKSA9PT0gMCAmJiBlZGdlVmVyc2lvbiA+PSAxNDM5MyAmJlxuICAgICAgICAgICAgdXJsLmluZGV4T2YoJz90cmFuc3BvcnQ9dWRwJykgPT09IC0xO1xuICAgICAgfSk7XG5cbiAgICAgIGRlbGV0ZSBzZXJ2ZXIudXJsO1xuICAgICAgc2VydmVyLnVybHMgPSBpc1N0cmluZyA/IHVybHNbMF0gOiB1cmxzO1xuICAgICAgcmV0dXJuICEhdXJscy5sZW5ndGg7XG4gICAgfVxuICB9KTtcbn1cblxuLy8gRGV0ZXJtaW5lcyB0aGUgaW50ZXJzZWN0aW9uIG9mIGxvY2FsIGFuZCByZW1vdGUgY2FwYWJpbGl0aWVzLlxuZnVuY3Rpb24gZ2V0Q29tbW9uQ2FwYWJpbGl0aWVzKGxvY2FsQ2FwYWJpbGl0aWVzLCByZW1vdGVDYXBhYmlsaXRpZXMpIHtcbiAgdmFyIGNvbW1vbkNhcGFiaWxpdGllcyA9IHtcbiAgICBjb2RlY3M6IFtdLFxuICAgIGhlYWRlckV4dGVuc2lvbnM6IFtdLFxuICAgIGZlY01lY2hhbmlzbXM6IFtdXG4gIH07XG5cbiAgdmFyIGZpbmRDb2RlY0J5UGF5bG9hZFR5cGUgPSBmdW5jdGlvbihwdCwgY29kZWNzKSB7XG4gICAgcHQgPSBwYXJzZUludChwdCwgMTApO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29kZWNzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoY29kZWNzW2ldLnBheWxvYWRUeXBlID09PSBwdCB8fFxuICAgICAgICAgIGNvZGVjc1tpXS5wcmVmZXJyZWRQYXlsb2FkVHlwZSA9PT0gcHQpIHtcbiAgICAgICAgcmV0dXJuIGNvZGVjc1tpXTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFyIHJ0eENhcGFiaWxpdHlNYXRjaGVzID0gZnVuY3Rpb24obFJ0eCwgclJ0eCwgbENvZGVjcywgckNvZGVjcykge1xuICAgIHZhciBsQ29kZWMgPSBmaW5kQ29kZWNCeVBheWxvYWRUeXBlKGxSdHgucGFyYW1ldGVycy5hcHQsIGxDb2RlY3MpO1xuICAgIHZhciByQ29kZWMgPSBmaW5kQ29kZWNCeVBheWxvYWRUeXBlKHJSdHgucGFyYW1ldGVycy5hcHQsIHJDb2RlY3MpO1xuICAgIHJldHVybiBsQ29kZWMgJiYgckNvZGVjICYmXG4gICAgICAgIGxDb2RlYy5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IHJDb2RlYy5uYW1lLnRvTG93ZXJDYXNlKCk7XG4gIH07XG5cbiAgbG9jYWxDYXBhYmlsaXRpZXMuY29kZWNzLmZvckVhY2goZnVuY3Rpb24obENvZGVjKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZW1vdGVDYXBhYmlsaXRpZXMuY29kZWNzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgckNvZGVjID0gcmVtb3RlQ2FwYWJpbGl0aWVzLmNvZGVjc1tpXTtcbiAgICAgIGlmIChsQ29kZWMubmFtZS50b0xvd2VyQ2FzZSgpID09PSByQ29kZWMubmFtZS50b0xvd2VyQ2FzZSgpICYmXG4gICAgICAgICAgbENvZGVjLmNsb2NrUmF0ZSA9PT0gckNvZGVjLmNsb2NrUmF0ZSkge1xuICAgICAgICBpZiAobENvZGVjLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3J0eCcgJiZcbiAgICAgICAgICAgIGxDb2RlYy5wYXJhbWV0ZXJzICYmIHJDb2RlYy5wYXJhbWV0ZXJzLmFwdCkge1xuICAgICAgICAgIC8vIGZvciBSVFggd2UgbmVlZCB0byBmaW5kIHRoZSBsb2NhbCBydHggdGhhdCBoYXMgYSBhcHRcbiAgICAgICAgICAvLyB3aGljaCBwb2ludHMgdG8gdGhlIHNhbWUgbG9jYWwgY29kZWMgYXMgdGhlIHJlbW90ZSBvbmUuXG4gICAgICAgICAgaWYgKCFydHhDYXBhYmlsaXR5TWF0Y2hlcyhsQ29kZWMsIHJDb2RlYyxcbiAgICAgICAgICAgICAgbG9jYWxDYXBhYmlsaXRpZXMuY29kZWNzLCByZW1vdGVDYXBhYmlsaXRpZXMuY29kZWNzKSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJDb2RlYyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkockNvZGVjKSk7IC8vIGRlZXBjb3B5XG4gICAgICAgIC8vIG51bWJlciBvZiBjaGFubmVscyBpcyB0aGUgaGlnaGVzdCBjb21tb24gbnVtYmVyIG9mIGNoYW5uZWxzXG4gICAgICAgIHJDb2RlYy5udW1DaGFubmVscyA9IE1hdGgubWluKGxDb2RlYy5udW1DaGFubmVscyxcbiAgICAgICAgICAgIHJDb2RlYy5udW1DaGFubmVscyk7XG4gICAgICAgIC8vIHB1c2ggckNvZGVjIHNvIHdlIHJlcGx5IHdpdGggb2ZmZXJlciBwYXlsb2FkIHR5cGVcbiAgICAgICAgY29tbW9uQ2FwYWJpbGl0aWVzLmNvZGVjcy5wdXNoKHJDb2RlYyk7XG5cbiAgICAgICAgLy8gZGV0ZXJtaW5lIGNvbW1vbiBmZWVkYmFjayBtZWNoYW5pc21zXG4gICAgICAgIHJDb2RlYy5ydGNwRmVlZGJhY2sgPSByQ29kZWMucnRjcEZlZWRiYWNrLmZpbHRlcihmdW5jdGlvbihmYikge1xuICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbENvZGVjLnJ0Y3BGZWVkYmFjay5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgaWYgKGxDb2RlYy5ydGNwRmVlZGJhY2tbal0udHlwZSA9PT0gZmIudHlwZSAmJlxuICAgICAgICAgICAgICAgIGxDb2RlYy5ydGNwRmVlZGJhY2tbal0ucGFyYW1ldGVyID09PSBmYi5wYXJhbWV0ZXIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIEZJWE1FOiBhbHNvIG5lZWQgdG8gZGV0ZXJtaW5lIC5wYXJhbWV0ZXJzXG4gICAgICAgIC8vICBzZWUgaHR0cHM6Ly9naXRodWIuY29tL29wZW5wZWVyL29ydGMvaXNzdWVzLzU2OVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIGxvY2FsQ2FwYWJpbGl0aWVzLmhlYWRlckV4dGVuc2lvbnMuZm9yRWFjaChmdW5jdGlvbihsSGVhZGVyRXh0ZW5zaW9uKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZW1vdGVDYXBhYmlsaXRpZXMuaGVhZGVyRXh0ZW5zaW9ucy5sZW5ndGg7XG4gICAgICAgICBpKyspIHtcbiAgICAgIHZhciBySGVhZGVyRXh0ZW5zaW9uID0gcmVtb3RlQ2FwYWJpbGl0aWVzLmhlYWRlckV4dGVuc2lvbnNbaV07XG4gICAgICBpZiAobEhlYWRlckV4dGVuc2lvbi51cmkgPT09IHJIZWFkZXJFeHRlbnNpb24udXJpKSB7XG4gICAgICAgIGNvbW1vbkNhcGFiaWxpdGllcy5oZWFkZXJFeHRlbnNpb25zLnB1c2gockhlYWRlckV4dGVuc2lvbik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgLy8gRklYTUU6IGZlY01lY2hhbmlzbXNcbiAgcmV0dXJuIGNvbW1vbkNhcGFiaWxpdGllcztcbn1cblxuLy8gaXMgYWN0aW9uPXNldExvY2FsRGVzY3JpcHRpb24gd2l0aCB0eXBlIGFsbG93ZWQgaW4gc2lnbmFsaW5nU3RhdGVcbmZ1bmN0aW9uIGlzQWN0aW9uQWxsb3dlZEluU2lnbmFsaW5nU3RhdGUoYWN0aW9uLCB0eXBlLCBzaWduYWxpbmdTdGF0ZSkge1xuICByZXR1cm4ge1xuICAgIG9mZmVyOiB7XG4gICAgICBzZXRMb2NhbERlc2NyaXB0aW9uOiBbJ3N0YWJsZScsICdoYXZlLWxvY2FsLW9mZmVyJ10sXG4gICAgICBzZXRSZW1vdGVEZXNjcmlwdGlvbjogWydzdGFibGUnLCAnaGF2ZS1yZW1vdGUtb2ZmZXInXVxuICAgIH0sXG4gICAgYW5zd2VyOiB7XG4gICAgICBzZXRMb2NhbERlc2NyaXB0aW9uOiBbJ2hhdmUtcmVtb3RlLW9mZmVyJywgJ2hhdmUtbG9jYWwtcHJhbnN3ZXInXSxcbiAgICAgIHNldFJlbW90ZURlc2NyaXB0aW9uOiBbJ2hhdmUtbG9jYWwtb2ZmZXInLCAnaGF2ZS1yZW1vdGUtcHJhbnN3ZXInXVxuICAgIH1cbiAgfVt0eXBlXVthY3Rpb25dLmluZGV4T2Yoc2lnbmFsaW5nU3RhdGUpICE9PSAtMTtcbn1cblxuZnVuY3Rpb24gbWF5YmVBZGRDYW5kaWRhdGUoaWNlVHJhbnNwb3J0LCBjYW5kaWRhdGUpIHtcbiAgLy8gRWRnZSdzIGludGVybmFsIHJlcHJlc2VudGF0aW9uIGFkZHMgc29tZSBmaWVsZHMgdGhlcmVmb3JlXG4gIC8vIG5vdCBhbGwgZmllbGTRlSBhcmUgdGFrZW4gaW50byBhY2NvdW50LlxuICB2YXIgYWxyZWFkeUFkZGVkID0gaWNlVHJhbnNwb3J0LmdldFJlbW90ZUNhbmRpZGF0ZXMoKVxuICAgICAgLmZpbmQoZnVuY3Rpb24ocmVtb3RlQ2FuZGlkYXRlKSB7XG4gICAgICAgIHJldHVybiBjYW5kaWRhdGUuZm91bmRhdGlvbiA9PT0gcmVtb3RlQ2FuZGlkYXRlLmZvdW5kYXRpb24gJiZcbiAgICAgICAgICAgIGNhbmRpZGF0ZS5pcCA9PT0gcmVtb3RlQ2FuZGlkYXRlLmlwICYmXG4gICAgICAgICAgICBjYW5kaWRhdGUucG9ydCA9PT0gcmVtb3RlQ2FuZGlkYXRlLnBvcnQgJiZcbiAgICAgICAgICAgIGNhbmRpZGF0ZS5wcmlvcml0eSA9PT0gcmVtb3RlQ2FuZGlkYXRlLnByaW9yaXR5ICYmXG4gICAgICAgICAgICBjYW5kaWRhdGUucHJvdG9jb2wgPT09IHJlbW90ZUNhbmRpZGF0ZS5wcm90b2NvbCAmJlxuICAgICAgICAgICAgY2FuZGlkYXRlLnR5cGUgPT09IHJlbW90ZUNhbmRpZGF0ZS50eXBlO1xuICAgICAgfSk7XG4gIGlmICghYWxyZWFkeUFkZGVkKSB7XG4gICAgaWNlVHJhbnNwb3J0LmFkZFJlbW90ZUNhbmRpZGF0ZShjYW5kaWRhdGUpO1xuICB9XG4gIHJldHVybiAhYWxyZWFkeUFkZGVkO1xufVxuXG5cbmZ1bmN0aW9uIG1ha2VFcnJvcihuYW1lLCBkZXNjcmlwdGlvbikge1xuICB2YXIgZSA9IG5ldyBFcnJvcihkZXNjcmlwdGlvbik7XG4gIGUubmFtZSA9IG5hbWU7XG4gIC8vIGxlZ2FjeSBlcnJvciBjb2RlcyBmcm9tIGh0dHBzOi8vaGV5Y2FtLmdpdGh1Yi5pby93ZWJpZGwvI2lkbC1ET01FeGNlcHRpb24tZXJyb3ItbmFtZXNcbiAgZS5jb2RlID0ge1xuICAgIE5vdFN1cHBvcnRlZEVycm9yOiA5LFxuICAgIEludmFsaWRTdGF0ZUVycm9yOiAxMSxcbiAgICBJbnZhbGlkQWNjZXNzRXJyb3I6IDE1LFxuICAgIFR5cGVFcnJvcjogdW5kZWZpbmVkLFxuICAgIE9wZXJhdGlvbkVycm9yOiB1bmRlZmluZWRcbiAgfVtuYW1lXTtcbiAgcmV0dXJuIGU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24od2luZG93LCBlZGdlVmVyc2lvbikge1xuICAvLyBodHRwczovL3czYy5naXRodWIuaW8vbWVkaWFjYXB0dXJlLW1haW4vI21lZGlhc3RyZWFtXG4gIC8vIEhlbHBlciBmdW5jdGlvbiB0byBhZGQgdGhlIHRyYWNrIHRvIHRoZSBzdHJlYW0gYW5kXG4gIC8vIGRpc3BhdGNoIHRoZSBldmVudCBvdXJzZWx2ZXMuXG4gIGZ1bmN0aW9uIGFkZFRyYWNrVG9TdHJlYW1BbmRGaXJlRXZlbnQodHJhY2ssIHN0cmVhbSkge1xuICAgIHN0cmVhbS5hZGRUcmFjayh0cmFjayk7XG4gICAgc3RyZWFtLmRpc3BhdGNoRXZlbnQobmV3IHdpbmRvdy5NZWRpYVN0cmVhbVRyYWNrRXZlbnQoJ2FkZHRyYWNrJyxcbiAgICAgICAge3RyYWNrOiB0cmFja30pKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZVRyYWNrRnJvbVN0cmVhbUFuZEZpcmVFdmVudCh0cmFjaywgc3RyZWFtKSB7XG4gICAgc3RyZWFtLnJlbW92ZVRyYWNrKHRyYWNrKTtcbiAgICBzdHJlYW0uZGlzcGF0Y2hFdmVudChuZXcgd2luZG93Lk1lZGlhU3RyZWFtVHJhY2tFdmVudCgncmVtb3ZldHJhY2snLFxuICAgICAgICB7dHJhY2s6IHRyYWNrfSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZmlyZUFkZFRyYWNrKHBjLCB0cmFjaywgcmVjZWl2ZXIsIHN0cmVhbXMpIHtcbiAgICB2YXIgdHJhY2tFdmVudCA9IG5ldyBFdmVudCgndHJhY2snKTtcbiAgICB0cmFja0V2ZW50LnRyYWNrID0gdHJhY2s7XG4gICAgdHJhY2tFdmVudC5yZWNlaXZlciA9IHJlY2VpdmVyO1xuICAgIHRyYWNrRXZlbnQudHJhbnNjZWl2ZXIgPSB7cmVjZWl2ZXI6IHJlY2VpdmVyfTtcbiAgICB0cmFja0V2ZW50LnN0cmVhbXMgPSBzdHJlYW1zO1xuICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgcGMuX2Rpc3BhdGNoRXZlbnQoJ3RyYWNrJywgdHJhY2tFdmVudCk7XG4gICAgfSk7XG4gIH1cblxuICB2YXIgUlRDUGVlckNvbm5lY3Rpb24gPSBmdW5jdGlvbihjb25maWcpIHtcbiAgICB2YXIgcGMgPSB0aGlzO1xuXG4gICAgdmFyIF9ldmVudFRhcmdldCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICBbJ2FkZEV2ZW50TGlzdGVuZXInLCAncmVtb3ZlRXZlbnRMaXN0ZW5lcicsICdkaXNwYXRjaEV2ZW50J11cbiAgICAgICAgLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgICAgcGNbbWV0aG9kXSA9IF9ldmVudFRhcmdldFttZXRob2RdLmJpbmQoX2V2ZW50VGFyZ2V0KTtcbiAgICAgICAgfSk7XG5cbiAgICB0aGlzLmNhblRyaWNrbGVJY2VDYW5kaWRhdGVzID0gbnVsbDtcblxuICAgIHRoaXMubmVlZE5lZ290aWF0aW9uID0gZmFsc2U7XG5cbiAgICB0aGlzLmxvY2FsU3RyZWFtcyA9IFtdO1xuICAgIHRoaXMucmVtb3RlU3RyZWFtcyA9IFtdO1xuXG4gICAgdGhpcy5sb2NhbERlc2NyaXB0aW9uID0gbnVsbDtcbiAgICB0aGlzLnJlbW90ZURlc2NyaXB0aW9uID0gbnVsbDtcblxuICAgIHRoaXMuc2lnbmFsaW5nU3RhdGUgPSAnc3RhYmxlJztcbiAgICB0aGlzLmljZUNvbm5lY3Rpb25TdGF0ZSA9ICduZXcnO1xuICAgIHRoaXMuY29ubmVjdGlvblN0YXRlID0gJ25ldyc7XG4gICAgdGhpcy5pY2VHYXRoZXJpbmdTdGF0ZSA9ICduZXcnO1xuXG4gICAgY29uZmlnID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShjb25maWcgfHwge30pKTtcblxuICAgIHRoaXMudXNpbmdCdW5kbGUgPSBjb25maWcuYnVuZGxlUG9saWN5ID09PSAnbWF4LWJ1bmRsZSc7XG4gICAgaWYgKGNvbmZpZy5ydGNwTXV4UG9saWN5ID09PSAnbmVnb3RpYXRlJykge1xuICAgICAgdGhyb3cobWFrZUVycm9yKCdOb3RTdXBwb3J0ZWRFcnJvcicsXG4gICAgICAgICAgJ3J0Y3BNdXhQb2xpY3kgXFwnbmVnb3RpYXRlXFwnIGlzIG5vdCBzdXBwb3J0ZWQnKSk7XG4gICAgfSBlbHNlIGlmICghY29uZmlnLnJ0Y3BNdXhQb2xpY3kpIHtcbiAgICAgIGNvbmZpZy5ydGNwTXV4UG9saWN5ID0gJ3JlcXVpcmUnO1xuICAgIH1cblxuICAgIHN3aXRjaCAoY29uZmlnLmljZVRyYW5zcG9ydFBvbGljeSkge1xuICAgICAgY2FzZSAnYWxsJzpcbiAgICAgIGNhc2UgJ3JlbGF5JzpcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25maWcuaWNlVHJhbnNwb3J0UG9saWN5ID0gJ2FsbCc7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHN3aXRjaCAoY29uZmlnLmJ1bmRsZVBvbGljeSkge1xuICAgICAgY2FzZSAnYmFsYW5jZWQnOlxuICAgICAgY2FzZSAnbWF4LWNvbXBhdCc6XG4gICAgICBjYXNlICdtYXgtYnVuZGxlJzpcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25maWcuYnVuZGxlUG9saWN5ID0gJ2JhbGFuY2VkJztcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY29uZmlnLmljZVNlcnZlcnMgPSBmaWx0ZXJJY2VTZXJ2ZXJzKGNvbmZpZy5pY2VTZXJ2ZXJzIHx8IFtdLCBlZGdlVmVyc2lvbik7XG5cbiAgICB0aGlzLl9pY2VHYXRoZXJlcnMgPSBbXTtcbiAgICBpZiAoY29uZmlnLmljZUNhbmRpZGF0ZVBvb2xTaXplKSB7XG4gICAgICBmb3IgKHZhciBpID0gY29uZmlnLmljZUNhbmRpZGF0ZVBvb2xTaXplOyBpID4gMDsgaS0tKSB7XG4gICAgICAgIHRoaXMuX2ljZUdhdGhlcmVycy5wdXNoKG5ldyB3aW5kb3cuUlRDSWNlR2F0aGVyZXIoe1xuICAgICAgICAgIGljZVNlcnZlcnM6IGNvbmZpZy5pY2VTZXJ2ZXJzLFxuICAgICAgICAgIGdhdGhlclBvbGljeTogY29uZmlnLmljZVRyYW5zcG9ydFBvbGljeVxuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbmZpZy5pY2VDYW5kaWRhdGVQb29sU2l6ZSA9IDA7XG4gICAgfVxuXG4gICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xuXG4gICAgLy8gcGVyLXRyYWNrIGljZUdhdGhlcnMsIGljZVRyYW5zcG9ydHMsIGR0bHNUcmFuc3BvcnRzLCBydHBTZW5kZXJzLCAuLi5cbiAgICAvLyBldmVyeXRoaW5nIHRoYXQgaXMgbmVlZGVkIHRvIGRlc2NyaWJlIGEgU0RQIG0tbGluZS5cbiAgICB0aGlzLnRyYW5zY2VpdmVycyA9IFtdO1xuXG4gICAgdGhpcy5fc2RwU2Vzc2lvbklkID0gU0RQVXRpbHMuZ2VuZXJhdGVTZXNzaW9uSWQoKTtcbiAgICB0aGlzLl9zZHBTZXNzaW9uVmVyc2lvbiA9IDA7XG5cbiAgICB0aGlzLl9kdGxzUm9sZSA9IHVuZGVmaW5lZDsgLy8gcm9sZSBmb3IgYT1zZXR1cCB0byB1c2UgaW4gYW5zd2Vycy5cblxuICAgIHRoaXMuX2lzQ2xvc2VkID0gZmFsc2U7XG4gIH07XG5cbiAgLy8gc2V0IHVwIGV2ZW50IGhhbmRsZXJzIG9uIHByb3RvdHlwZVxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub25pY2VjYW5kaWRhdGUgPSBudWxsO1xuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub25hZGRzdHJlYW0gPSBudWxsO1xuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub250cmFjayA9IG51bGw7XG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5vbnJlbW92ZXN0cmVhbSA9IG51bGw7XG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5vbnNpZ25hbGluZ3N0YXRlY2hhbmdlID0gbnVsbDtcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9uaWNlY29ubmVjdGlvbnN0YXRlY2hhbmdlID0gbnVsbDtcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9uY29ubmVjdGlvbnN0YXRlY2hhbmdlID0gbnVsbDtcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9uaWNlZ2F0aGVyaW5nc3RhdGVjaGFuZ2UgPSBudWxsO1xuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub25uZWdvdGlhdGlvbm5lZWRlZCA9IG51bGw7XG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5vbmRhdGFjaGFubmVsID0gbnVsbDtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX2Rpc3BhdGNoRXZlbnQgPSBmdW5jdGlvbihuYW1lLCBldmVudCkge1xuICAgIGlmICh0aGlzLl9pc0Nsb3NlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIGlmICh0eXBlb2YgdGhpc1snb24nICsgbmFtZV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXNbJ29uJyArIG5hbWVdKGV2ZW50KTtcbiAgICB9XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl9lbWl0R2F0aGVyaW5nU3RhdGVDaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ2ljZWdhdGhlcmluZ3N0YXRlY2hhbmdlJyk7XG4gICAgdGhpcy5fZGlzcGF0Y2hFdmVudCgnaWNlZ2F0aGVyaW5nc3RhdGVjaGFuZ2UnLCBldmVudCk7XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldENvbmZpZ3VyYXRpb24gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRMb2NhbFN0cmVhbXMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5sb2NhbFN0cmVhbXM7XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFJlbW90ZVN0cmVhbXMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5yZW1vdGVTdHJlYW1zO1xuICB9O1xuXG4gIC8vIGludGVybmFsIGhlbHBlciB0byBjcmVhdGUgYSB0cmFuc2NlaXZlciBvYmplY3QuXG4gIC8vICh3aGljaCBpcyBub3QgeWV0IHRoZSBzYW1lIGFzIHRoZSBXZWJSVEMgMS4wIHRyYW5zY2VpdmVyKVxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX2NyZWF0ZVRyYW5zY2VpdmVyID0gZnVuY3Rpb24oa2luZCwgZG9Ob3RBZGQpIHtcbiAgICB2YXIgaGFzQnVuZGxlVHJhbnNwb3J0ID0gdGhpcy50cmFuc2NlaXZlcnMubGVuZ3RoID4gMDtcbiAgICB2YXIgdHJhbnNjZWl2ZXIgPSB7XG4gICAgICB0cmFjazogbnVsbCxcbiAgICAgIGljZUdhdGhlcmVyOiBudWxsLFxuICAgICAgaWNlVHJhbnNwb3J0OiBudWxsLFxuICAgICAgZHRsc1RyYW5zcG9ydDogbnVsbCxcbiAgICAgIGxvY2FsQ2FwYWJpbGl0aWVzOiBudWxsLFxuICAgICAgcmVtb3RlQ2FwYWJpbGl0aWVzOiBudWxsLFxuICAgICAgcnRwU2VuZGVyOiBudWxsLFxuICAgICAgcnRwUmVjZWl2ZXI6IG51bGwsXG4gICAgICBraW5kOiBraW5kLFxuICAgICAgbWlkOiBudWxsLFxuICAgICAgc2VuZEVuY29kaW5nUGFyYW1ldGVyczogbnVsbCxcbiAgICAgIHJlY3ZFbmNvZGluZ1BhcmFtZXRlcnM6IG51bGwsXG4gICAgICBzdHJlYW06IG51bGwsXG4gICAgICBhc3NvY2lhdGVkUmVtb3RlTWVkaWFTdHJlYW1zOiBbXSxcbiAgICAgIHdhbnRSZWNlaXZlOiB0cnVlXG4gICAgfTtcbiAgICBpZiAodGhpcy51c2luZ0J1bmRsZSAmJiBoYXNCdW5kbGVUcmFuc3BvcnQpIHtcbiAgICAgIHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydCA9IHRoaXMudHJhbnNjZWl2ZXJzWzBdLmljZVRyYW5zcG9ydDtcbiAgICAgIHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQgPSB0aGlzLnRyYW5zY2VpdmVyc1swXS5kdGxzVHJhbnNwb3J0O1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdHJhbnNwb3J0cyA9IHRoaXMuX2NyZWF0ZUljZUFuZER0bHNUcmFuc3BvcnRzKCk7XG4gICAgICB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQgPSB0cmFuc3BvcnRzLmljZVRyYW5zcG9ydDtcbiAgICAgIHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQgPSB0cmFuc3BvcnRzLmR0bHNUcmFuc3BvcnQ7XG4gICAgfVxuICAgIGlmICghZG9Ob3RBZGQpIHtcbiAgICAgIHRoaXMudHJhbnNjZWl2ZXJzLnB1c2godHJhbnNjZWl2ZXIpO1xuICAgIH1cbiAgICByZXR1cm4gdHJhbnNjZWl2ZXI7XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFRyYWNrID0gZnVuY3Rpb24odHJhY2ssIHN0cmVhbSkge1xuICAgIGlmICh0aGlzLl9pc0Nsb3NlZCkge1xuICAgICAgdGhyb3cgbWFrZUVycm9yKCdJbnZhbGlkU3RhdGVFcnJvcicsXG4gICAgICAgICAgJ0F0dGVtcHRlZCB0byBjYWxsIGFkZFRyYWNrIG9uIGEgY2xvc2VkIHBlZXJjb25uZWN0aW9uLicpO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5RXhpc3RzID0gdGhpcy50cmFuc2NlaXZlcnMuZmluZChmdW5jdGlvbihzKSB7XG4gICAgICByZXR1cm4gcy50cmFjayA9PT0gdHJhY2s7XG4gICAgfSk7XG5cbiAgICBpZiAoYWxyZWFkeUV4aXN0cykge1xuICAgICAgdGhyb3cgbWFrZUVycm9yKCdJbnZhbGlkQWNjZXNzRXJyb3InLCAnVHJhY2sgYWxyZWFkeSBleGlzdHMuJyk7XG4gICAgfVxuXG4gICAgdmFyIHRyYW5zY2VpdmVyO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50cmFuc2NlaXZlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICghdGhpcy50cmFuc2NlaXZlcnNbaV0udHJhY2sgJiZcbiAgICAgICAgICB0aGlzLnRyYW5zY2VpdmVyc1tpXS5raW5kID09PSB0cmFjay5raW5kKSB7XG4gICAgICAgIHRyYW5zY2VpdmVyID0gdGhpcy50cmFuc2NlaXZlcnNbaV07XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghdHJhbnNjZWl2ZXIpIHtcbiAgICAgIHRyYW5zY2VpdmVyID0gdGhpcy5fY3JlYXRlVHJhbnNjZWl2ZXIodHJhY2sua2luZCk7XG4gICAgfVxuXG4gICAgdGhpcy5fbWF5YmVGaXJlTmVnb3RpYXRpb25OZWVkZWQoKTtcblxuICAgIGlmICh0aGlzLmxvY2FsU3RyZWFtcy5pbmRleE9mKHN0cmVhbSkgPT09IC0xKSB7XG4gICAgICB0aGlzLmxvY2FsU3RyZWFtcy5wdXNoKHN0cmVhbSk7XG4gICAgfVxuXG4gICAgdHJhbnNjZWl2ZXIudHJhY2sgPSB0cmFjaztcbiAgICB0cmFuc2NlaXZlci5zdHJlYW0gPSBzdHJlYW07XG4gICAgdHJhbnNjZWl2ZXIucnRwU2VuZGVyID0gbmV3IHdpbmRvdy5SVENSdHBTZW5kZXIodHJhY2ssXG4gICAgICAgIHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQpO1xuICAgIHJldHVybiB0cmFuc2NlaXZlci5ydHBTZW5kZXI7XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgIHZhciBwYyA9IHRoaXM7XG4gICAgaWYgKGVkZ2VWZXJzaW9uID49IDE1MDI1KSB7XG4gICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xuICAgICAgICBwYy5hZGRUcmFjayh0cmFjaywgc3RyZWFtKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBDbG9uZSBpcyBuZWNlc3NhcnkgZm9yIGxvY2FsIGRlbW9zIG1vc3RseSwgYXR0YWNoaW5nIGRpcmVjdGx5XG4gICAgICAvLyB0byB0d28gZGlmZmVyZW50IHNlbmRlcnMgZG9lcyBub3Qgd29yayAoYnVpbGQgMTA1NDcpLlxuICAgICAgLy8gRml4ZWQgaW4gMTUwMjUgKG9yIGVhcmxpZXIpXG4gICAgICB2YXIgY2xvbmVkU3RyZWFtID0gc3RyZWFtLmNsb25lKCk7XG4gICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaywgaWR4KSB7XG4gICAgICAgIHZhciBjbG9uZWRUcmFjayA9IGNsb25lZFN0cmVhbS5nZXRUcmFja3MoKVtpZHhdO1xuICAgICAgICB0cmFjay5hZGRFdmVudExpc3RlbmVyKCdlbmFibGVkJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBjbG9uZWRUcmFjay5lbmFibGVkID0gZXZlbnQuZW5hYmxlZDtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIGNsb25lZFN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XG4gICAgICAgIHBjLmFkZFRyYWNrKHRyYWNrLCBjbG9uZWRTdHJlYW0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVUcmFjayA9IGZ1bmN0aW9uKHNlbmRlcikge1xuICAgIGlmICh0aGlzLl9pc0Nsb3NlZCkge1xuICAgICAgdGhyb3cgbWFrZUVycm9yKCdJbnZhbGlkU3RhdGVFcnJvcicsXG4gICAgICAgICAgJ0F0dGVtcHRlZCB0byBjYWxsIHJlbW92ZVRyYWNrIG9uIGEgY2xvc2VkIHBlZXJjb25uZWN0aW9uLicpO1xuICAgIH1cblxuICAgIGlmICghKHNlbmRlciBpbnN0YW5jZW9mIHdpbmRvdy5SVENSdHBTZW5kZXIpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCAxIG9mIFJUQ1BlZXJDb25uZWN0aW9uLnJlbW92ZVRyYWNrICcgK1xuICAgICAgICAgICdkb2VzIG5vdCBpbXBsZW1lbnQgaW50ZXJmYWNlIFJUQ1J0cFNlbmRlci4nKTtcbiAgICB9XG5cbiAgICB2YXIgdHJhbnNjZWl2ZXIgPSB0aGlzLnRyYW5zY2VpdmVycy5maW5kKGZ1bmN0aW9uKHQpIHtcbiAgICAgIHJldHVybiB0LnJ0cFNlbmRlciA9PT0gc2VuZGVyO1xuICAgIH0pO1xuXG4gICAgaWYgKCF0cmFuc2NlaXZlcikge1xuICAgICAgdGhyb3cgbWFrZUVycm9yKCdJbnZhbGlkQWNjZXNzRXJyb3InLFxuICAgICAgICAgICdTZW5kZXIgd2FzIG5vdCBjcmVhdGVkIGJ5IHRoaXMgY29ubmVjdGlvbi4nKTtcbiAgICB9XG4gICAgdmFyIHN0cmVhbSA9IHRyYW5zY2VpdmVyLnN0cmVhbTtcblxuICAgIHRyYW5zY2VpdmVyLnJ0cFNlbmRlci5zdG9wKCk7XG4gICAgdHJhbnNjZWl2ZXIucnRwU2VuZGVyID0gbnVsbDtcbiAgICB0cmFuc2NlaXZlci50cmFjayA9IG51bGw7XG4gICAgdHJhbnNjZWl2ZXIuc3RyZWFtID0gbnVsbDtcblxuICAgIC8vIHJlbW92ZSB0aGUgc3RyZWFtIGZyb20gdGhlIHNldCBvZiBsb2NhbCBzdHJlYW1zXG4gICAgdmFyIGxvY2FsU3RyZWFtcyA9IHRoaXMudHJhbnNjZWl2ZXJzLm1hcChmdW5jdGlvbih0KSB7XG4gICAgICByZXR1cm4gdC5zdHJlYW07XG4gICAgfSk7XG4gICAgaWYgKGxvY2FsU3RyZWFtcy5pbmRleE9mKHN0cmVhbSkgPT09IC0xICYmXG4gICAgICAgIHRoaXMubG9jYWxTdHJlYW1zLmluZGV4T2Yoc3RyZWFtKSA+IC0xKSB7XG4gICAgICB0aGlzLmxvY2FsU3RyZWFtcy5zcGxpY2UodGhpcy5sb2NhbFN0cmVhbXMuaW5kZXhPZihzdHJlYW0pLCAxKTtcbiAgICB9XG5cbiAgICB0aGlzLl9tYXliZUZpcmVOZWdvdGlhdGlvbk5lZWRlZCgpO1xuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICB2YXIgcGMgPSB0aGlzO1xuICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XG4gICAgICB2YXIgc2VuZGVyID0gcGMuZ2V0U2VuZGVycygpLmZpbmQoZnVuY3Rpb24ocykge1xuICAgICAgICByZXR1cm4gcy50cmFjayA9PT0gdHJhY2s7XG4gICAgICB9KTtcbiAgICAgIGlmIChzZW5kZXIpIHtcbiAgICAgICAgcGMucmVtb3ZlVHJhY2soc2VuZGVyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U2VuZGVycyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnRyYW5zY2VpdmVycy5maWx0ZXIoZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcbiAgICAgIHJldHVybiAhIXRyYW5zY2VpdmVyLnJ0cFNlbmRlcjtcbiAgICB9KVxuICAgIC5tYXAoZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcbiAgICAgIHJldHVybiB0cmFuc2NlaXZlci5ydHBTZW5kZXI7XG4gICAgfSk7XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFJlY2VpdmVycyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnRyYW5zY2VpdmVycy5maWx0ZXIoZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcbiAgICAgIHJldHVybiAhIXRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyO1xuICAgIH0pXG4gICAgLm1hcChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xuICAgICAgcmV0dXJuIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyO1xuICAgIH0pO1xuICB9O1xuXG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl9jcmVhdGVJY2VHYXRoZXJlciA9IGZ1bmN0aW9uKHNkcE1MaW5lSW5kZXgsXG4gICAgICB1c2luZ0J1bmRsZSkge1xuICAgIHZhciBwYyA9IHRoaXM7XG4gICAgaWYgKHVzaW5nQnVuZGxlICYmIHNkcE1MaW5lSW5kZXggPiAwKSB7XG4gICAgICByZXR1cm4gdGhpcy50cmFuc2NlaXZlcnNbMF0uaWNlR2F0aGVyZXI7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9pY2VHYXRoZXJlcnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdGhpcy5faWNlR2F0aGVyZXJzLnNoaWZ0KCk7XG4gICAgfVxuICAgIHZhciBpY2VHYXRoZXJlciA9IG5ldyB3aW5kb3cuUlRDSWNlR2F0aGVyZXIoe1xuICAgICAgaWNlU2VydmVyczogdGhpcy5fY29uZmlnLmljZVNlcnZlcnMsXG4gICAgICBnYXRoZXJQb2xpY3k6IHRoaXMuX2NvbmZpZy5pY2VUcmFuc3BvcnRQb2xpY3lcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoaWNlR2F0aGVyZXIsICdzdGF0ZScsXG4gICAgICAgIHt2YWx1ZTogJ25ldycsIHdyaXRhYmxlOiB0cnVlfVxuICAgICk7XG5cbiAgICB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5idWZmZXJlZENhbmRpZGF0ZUV2ZW50cyA9IFtdO1xuICAgIHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmJ1ZmZlckNhbmRpZGF0ZXMgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgdmFyIGVuZCA9ICFldmVudC5jYW5kaWRhdGUgfHwgT2JqZWN0LmtleXMoZXZlbnQuY2FuZGlkYXRlKS5sZW5ndGggPT09IDA7XG4gICAgICAvLyBwb2x5ZmlsbCBzaW5jZSBSVENJY2VHYXRoZXJlci5zdGF0ZSBpcyBub3QgaW1wbGVtZW50ZWQgaW5cbiAgICAgIC8vIEVkZ2UgMTA1NDcgeWV0LlxuICAgICAgaWNlR2F0aGVyZXIuc3RhdGUgPSBlbmQgPyAnY29tcGxldGVkJyA6ICdnYXRoZXJpbmcnO1xuICAgICAgaWYgKHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5idWZmZXJlZENhbmRpZGF0ZUV2ZW50cyAhPT0gbnVsbCkge1xuICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uYnVmZmVyZWRDYW5kaWRhdGVFdmVudHMucHVzaChldmVudCk7XG4gICAgICB9XG4gICAgfTtcbiAgICBpY2VHYXRoZXJlci5hZGRFdmVudExpc3RlbmVyKCdsb2NhbGNhbmRpZGF0ZScsXG4gICAgICB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5idWZmZXJDYW5kaWRhdGVzKTtcbiAgICByZXR1cm4gaWNlR2F0aGVyZXI7XG4gIH07XG5cbiAgLy8gc3RhcnQgZ2F0aGVyaW5nIGZyb20gYW4gUlRDSWNlR2F0aGVyZXIuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fZ2F0aGVyID0gZnVuY3Rpb24obWlkLCBzZHBNTGluZUluZGV4KSB7XG4gICAgdmFyIHBjID0gdGhpcztcbiAgICB2YXIgaWNlR2F0aGVyZXIgPSB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5pY2VHYXRoZXJlcjtcbiAgICBpZiAoaWNlR2F0aGVyZXIub25sb2NhbGNhbmRpZGF0ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgYnVmZmVyZWRDYW5kaWRhdGVFdmVudHMgPVxuICAgICAgdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uYnVmZmVyZWRDYW5kaWRhdGVFdmVudHM7XG4gICAgdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uYnVmZmVyZWRDYW5kaWRhdGVFdmVudHMgPSBudWxsO1xuICAgIGljZUdhdGhlcmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xvY2FsY2FuZGlkYXRlJyxcbiAgICAgIHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmJ1ZmZlckNhbmRpZGF0ZXMpO1xuICAgIGljZUdhdGhlcmVyLm9ubG9jYWxjYW5kaWRhdGUgPSBmdW5jdGlvbihldnQpIHtcbiAgICAgIGlmIChwYy51c2luZ0J1bmRsZSAmJiBzZHBNTGluZUluZGV4ID4gMCkge1xuICAgICAgICAvLyBpZiB3ZSBrbm93IHRoYXQgd2UgdXNlIGJ1bmRsZSB3ZSBjYW4gZHJvcCBjYW5kaWRhdGVzIHdpdGhcbiAgICAgICAgLy8g0ZVkcE1MaW5lSW5kZXggPiAwLiBJZiB3ZSBkb24ndCBkbyB0aGlzIHRoZW4gb3VyIHN0YXRlIGdldHNcbiAgICAgICAgLy8gY29uZnVzZWQgc2luY2Ugd2UgZGlzcG9zZSB0aGUgZXh0cmEgaWNlIGdhdGhlcmVyLlxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ2ljZWNhbmRpZGF0ZScpO1xuICAgICAgZXZlbnQuY2FuZGlkYXRlID0ge3NkcE1pZDogbWlkLCBzZHBNTGluZUluZGV4OiBzZHBNTGluZUluZGV4fTtcblxuICAgICAgdmFyIGNhbmQgPSBldnQuY2FuZGlkYXRlO1xuICAgICAgLy8gRWRnZSBlbWl0cyBhbiBlbXB0eSBvYmplY3QgZm9yIFJUQ0ljZUNhbmRpZGF0ZUNvbXBsZXRl4oClXG4gICAgICB2YXIgZW5kID0gIWNhbmQgfHwgT2JqZWN0LmtleXMoY2FuZCkubGVuZ3RoID09PSAwO1xuICAgICAgaWYgKGVuZCkge1xuICAgICAgICAvLyBwb2x5ZmlsbCBzaW5jZSBSVENJY2VHYXRoZXJlci5zdGF0ZSBpcyBub3QgaW1wbGVtZW50ZWQgaW5cbiAgICAgICAgLy8gRWRnZSAxMDU0NyB5ZXQuXG4gICAgICAgIGlmIChpY2VHYXRoZXJlci5zdGF0ZSA9PT0gJ25ldycgfHwgaWNlR2F0aGVyZXIuc3RhdGUgPT09ICdnYXRoZXJpbmcnKSB7XG4gICAgICAgICAgaWNlR2F0aGVyZXIuc3RhdGUgPSAnY29tcGxldGVkJztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGljZUdhdGhlcmVyLnN0YXRlID09PSAnbmV3Jykge1xuICAgICAgICAgIGljZUdhdGhlcmVyLnN0YXRlID0gJ2dhdGhlcmluZyc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUlRDSWNlQ2FuZGlkYXRlIGRvZXNuJ3QgaGF2ZSBhIGNvbXBvbmVudCwgbmVlZHMgdG8gYmUgYWRkZWRcbiAgICAgICAgY2FuZC5jb21wb25lbnQgPSAxO1xuICAgICAgICAvLyBhbHNvIHRoZSB1c2VybmFtZUZyYWdtZW50LiBUT0RPOiB1cGRhdGUgU0RQIHRvIHRha2UgYm90aCB2YXJpYW50cy5cbiAgICAgICAgY2FuZC51ZnJhZyA9IGljZUdhdGhlcmVyLmdldExvY2FsUGFyYW1ldGVycygpLnVzZXJuYW1lRnJhZ21lbnQ7XG5cbiAgICAgICAgdmFyIHNlcmlhbGl6ZWRDYW5kaWRhdGUgPSBTRFBVdGlscy53cml0ZUNhbmRpZGF0ZShjYW5kKTtcbiAgICAgICAgZXZlbnQuY2FuZGlkYXRlID0gT2JqZWN0LmFzc2lnbihldmVudC5jYW5kaWRhdGUsXG4gICAgICAgICAgICBTRFBVdGlscy5wYXJzZUNhbmRpZGF0ZShzZXJpYWxpemVkQ2FuZGlkYXRlKSk7XG5cbiAgICAgICAgZXZlbnQuY2FuZGlkYXRlLmNhbmRpZGF0ZSA9IHNlcmlhbGl6ZWRDYW5kaWRhdGU7XG4gICAgICAgIGV2ZW50LmNhbmRpZGF0ZS50b0pTT04gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY2FuZGlkYXRlOiBldmVudC5jYW5kaWRhdGUuY2FuZGlkYXRlLFxuICAgICAgICAgICAgc2RwTWlkOiBldmVudC5jYW5kaWRhdGUuc2RwTWlkLFxuICAgICAgICAgICAgc2RwTUxpbmVJbmRleDogZXZlbnQuY2FuZGlkYXRlLnNkcE1MaW5lSW5kZXgsXG4gICAgICAgICAgICB1c2VybmFtZUZyYWdtZW50OiBldmVudC5jYW5kaWRhdGUudXNlcm5hbWVGcmFnbWVudFxuICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIC8vIHVwZGF0ZSBsb2NhbCBkZXNjcmlwdGlvbi5cbiAgICAgIHZhciBzZWN0aW9ucyA9IFNEUFV0aWxzLmdldE1lZGlhU2VjdGlvbnMocGMubG9jYWxEZXNjcmlwdGlvbi5zZHApO1xuICAgICAgaWYgKCFlbmQpIHtcbiAgICAgICAgc2VjdGlvbnNbZXZlbnQuY2FuZGlkYXRlLnNkcE1MaW5lSW5kZXhdICs9XG4gICAgICAgICAgICAnYT0nICsgZXZlbnQuY2FuZGlkYXRlLmNhbmRpZGF0ZSArICdcXHJcXG4nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VjdGlvbnNbZXZlbnQuY2FuZGlkYXRlLnNkcE1MaW5lSW5kZXhdICs9XG4gICAgICAgICAgICAnYT1lbmQtb2YtY2FuZGlkYXRlc1xcclxcbic7XG4gICAgICB9XG4gICAgICBwYy5sb2NhbERlc2NyaXB0aW9uLnNkcCA9XG4gICAgICAgICAgU0RQVXRpbHMuZ2V0RGVzY3JpcHRpb24ocGMubG9jYWxEZXNjcmlwdGlvbi5zZHApICtcbiAgICAgICAgICBzZWN0aW9ucy5qb2luKCcnKTtcbiAgICAgIHZhciBjb21wbGV0ZSA9IHBjLnRyYW5zY2VpdmVycy5ldmVyeShmdW5jdGlvbih0cmFuc2NlaXZlcikge1xuICAgICAgICByZXR1cm4gdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIgJiZcbiAgICAgICAgICAgIHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyLnN0YXRlID09PSAnY29tcGxldGVkJztcbiAgICAgIH0pO1xuXG4gICAgICBpZiAocGMuaWNlR2F0aGVyaW5nU3RhdGUgIT09ICdnYXRoZXJpbmcnKSB7XG4gICAgICAgIHBjLmljZUdhdGhlcmluZ1N0YXRlID0gJ2dhdGhlcmluZyc7XG4gICAgICAgIHBjLl9lbWl0R2F0aGVyaW5nU3RhdGVDaGFuZ2UoKTtcbiAgICAgIH1cblxuICAgICAgLy8gRW1pdCBjYW5kaWRhdGUuIEFsc28gZW1pdCBudWxsIGNhbmRpZGF0ZSB3aGVuIGFsbCBnYXRoZXJlcnMgYXJlXG4gICAgICAvLyBjb21wbGV0ZS5cbiAgICAgIGlmICghZW5kKSB7XG4gICAgICAgIHBjLl9kaXNwYXRjaEV2ZW50KCdpY2VjYW5kaWRhdGUnLCBldmVudCk7XG4gICAgICB9XG4gICAgICBpZiAoY29tcGxldGUpIHtcbiAgICAgICAgcGMuX2Rpc3BhdGNoRXZlbnQoJ2ljZWNhbmRpZGF0ZScsIG5ldyBFdmVudCgnaWNlY2FuZGlkYXRlJykpO1xuICAgICAgICBwYy5pY2VHYXRoZXJpbmdTdGF0ZSA9ICdjb21wbGV0ZSc7XG4gICAgICAgIHBjLl9lbWl0R2F0aGVyaW5nU3RhdGVDaGFuZ2UoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gZW1pdCBhbHJlYWR5IGdhdGhlcmVkIGNhbmRpZGF0ZXMuXG4gICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBidWZmZXJlZENhbmRpZGF0ZUV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWNlR2F0aGVyZXIub25sb2NhbGNhbmRpZGF0ZShlKTtcbiAgICAgIH0pO1xuICAgIH0sIDApO1xuICB9O1xuXG4gIC8vIENyZWF0ZSBJQ0UgdHJhbnNwb3J0IGFuZCBEVExTIHRyYW5zcG9ydC5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl9jcmVhdGVJY2VBbmREdGxzVHJhbnNwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBwYyA9IHRoaXM7XG4gICAgdmFyIGljZVRyYW5zcG9ydCA9IG5ldyB3aW5kb3cuUlRDSWNlVHJhbnNwb3J0KG51bGwpO1xuICAgIGljZVRyYW5zcG9ydC5vbmljZXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICBwYy5fdXBkYXRlSWNlQ29ubmVjdGlvblN0YXRlKCk7XG4gICAgICBwYy5fdXBkYXRlQ29ubmVjdGlvblN0YXRlKCk7XG4gICAgfTtcblxuICAgIHZhciBkdGxzVHJhbnNwb3J0ID0gbmV3IHdpbmRvdy5SVENEdGxzVHJhbnNwb3J0KGljZVRyYW5zcG9ydCk7XG4gICAgZHRsc1RyYW5zcG9ydC5vbmR0bHNzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcGMuX3VwZGF0ZUNvbm5lY3Rpb25TdGF0ZSgpO1xuICAgIH07XG4gICAgZHRsc1RyYW5zcG9ydC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAvLyBvbmVycm9yIGRvZXMgbm90IHNldCBzdGF0ZSB0byBmYWlsZWQgYnkgaXRzZWxmLlxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGR0bHNUcmFuc3BvcnQsICdzdGF0ZScsXG4gICAgICAgICAge3ZhbHVlOiAnZmFpbGVkJywgd3JpdGFibGU6IHRydWV9KTtcbiAgICAgIHBjLl91cGRhdGVDb25uZWN0aW9uU3RhdGUoKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGljZVRyYW5zcG9ydDogaWNlVHJhbnNwb3J0LFxuICAgICAgZHRsc1RyYW5zcG9ydDogZHRsc1RyYW5zcG9ydFxuICAgIH07XG4gIH07XG5cbiAgLy8gRGVzdHJveSBJQ0UgZ2F0aGVyZXIsIElDRSB0cmFuc3BvcnQgYW5kIERUTFMgdHJhbnNwb3J0LlxuICAvLyBXaXRob3V0IHRyaWdnZXJpbmcgdGhlIGNhbGxiYWNrcy5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl9kaXNwb3NlSWNlQW5kRHRsc1RyYW5zcG9ydHMgPSBmdW5jdGlvbihcbiAgICAgIHNkcE1MaW5lSW5kZXgpIHtcbiAgICB2YXIgaWNlR2F0aGVyZXIgPSB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5pY2VHYXRoZXJlcjtcbiAgICBpZiAoaWNlR2F0aGVyZXIpIHtcbiAgICAgIGRlbGV0ZSBpY2VHYXRoZXJlci5vbmxvY2FsY2FuZGlkYXRlO1xuICAgICAgZGVsZXRlIHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmljZUdhdGhlcmVyO1xuICAgIH1cbiAgICB2YXIgaWNlVHJhbnNwb3J0ID0gdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uaWNlVHJhbnNwb3J0O1xuICAgIGlmIChpY2VUcmFuc3BvcnQpIHtcbiAgICAgIGRlbGV0ZSBpY2VUcmFuc3BvcnQub25pY2VzdGF0ZWNoYW5nZTtcbiAgICAgIGRlbGV0ZSB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5pY2VUcmFuc3BvcnQ7XG4gICAgfVxuICAgIHZhciBkdGxzVHJhbnNwb3J0ID0gdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uZHRsc1RyYW5zcG9ydDtcbiAgICBpZiAoZHRsc1RyYW5zcG9ydCkge1xuICAgICAgZGVsZXRlIGR0bHNUcmFuc3BvcnQub25kdGxzc3RhdGVjaGFuZ2U7XG4gICAgICBkZWxldGUgZHRsc1RyYW5zcG9ydC5vbmVycm9yO1xuICAgICAgZGVsZXRlIHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmR0bHNUcmFuc3BvcnQ7XG4gICAgfVxuICB9O1xuXG4gIC8vIFN0YXJ0IHRoZSBSVFAgU2VuZGVyIGFuZCBSZWNlaXZlciBmb3IgYSB0cmFuc2NlaXZlci5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl90cmFuc2NlaXZlID0gZnVuY3Rpb24odHJhbnNjZWl2ZXIsXG4gICAgICBzZW5kLCByZWN2KSB7XG4gICAgdmFyIHBhcmFtcyA9IGdldENvbW1vbkNhcGFiaWxpdGllcyh0cmFuc2NlaXZlci5sb2NhbENhcGFiaWxpdGllcyxcbiAgICAgICAgdHJhbnNjZWl2ZXIucmVtb3RlQ2FwYWJpbGl0aWVzKTtcbiAgICBpZiAoc2VuZCAmJiB0cmFuc2NlaXZlci5ydHBTZW5kZXIpIHtcbiAgICAgIHBhcmFtcy5lbmNvZGluZ3MgPSB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzO1xuICAgICAgcGFyYW1zLnJ0Y3AgPSB7XG4gICAgICAgIGNuYW1lOiBTRFBVdGlscy5sb2NhbENOYW1lLFxuICAgICAgICBjb21wb3VuZDogdHJhbnNjZWl2ZXIucnRjcFBhcmFtZXRlcnMuY29tcG91bmRcbiAgICAgIH07XG4gICAgICBpZiAodHJhbnNjZWl2ZXIucmVjdkVuY29kaW5nUGFyYW1ldGVycy5sZW5ndGgpIHtcbiAgICAgICAgcGFyYW1zLnJ0Y3Auc3NyYyA9IHRyYW5zY2VpdmVyLnJlY3ZFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYztcbiAgICAgIH1cbiAgICAgIHRyYW5zY2VpdmVyLnJ0cFNlbmRlci5zZW5kKHBhcmFtcyk7XG4gICAgfVxuICAgIGlmIChyZWN2ICYmIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyICYmIHBhcmFtcy5jb2RlY3MubGVuZ3RoID4gMCkge1xuICAgICAgLy8gcmVtb3ZlIFJUWCBmaWVsZCBpbiBFZGdlIDE0OTQyXG4gICAgICBpZiAodHJhbnNjZWl2ZXIua2luZCA9PT0gJ3ZpZGVvJ1xuICAgICAgICAgICYmIHRyYW5zY2VpdmVyLnJlY3ZFbmNvZGluZ1BhcmFtZXRlcnNcbiAgICAgICAgICAmJiBlZGdlVmVyc2lvbiA8IDE1MDE5KSB7XG4gICAgICAgIHRyYW5zY2VpdmVyLnJlY3ZFbmNvZGluZ1BhcmFtZXRlcnMuZm9yRWFjaChmdW5jdGlvbihwKSB7XG4gICAgICAgICAgZGVsZXRlIHAucnR4O1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmICh0cmFuc2NlaXZlci5yZWN2RW5jb2RpbmdQYXJhbWV0ZXJzLmxlbmd0aCkge1xuICAgICAgICBwYXJhbXMuZW5jb2RpbmdzID0gdHJhbnNjZWl2ZXIucmVjdkVuY29kaW5nUGFyYW1ldGVycztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcmFtcy5lbmNvZGluZ3MgPSBbe31dO1xuICAgICAgfVxuICAgICAgcGFyYW1zLnJ0Y3AgPSB7XG4gICAgICAgIGNvbXBvdW5kOiB0cmFuc2NlaXZlci5ydGNwUGFyYW1ldGVycy5jb21wb3VuZFxuICAgICAgfTtcbiAgICAgIGlmICh0cmFuc2NlaXZlci5ydGNwUGFyYW1ldGVycy5jbmFtZSkge1xuICAgICAgICBwYXJhbXMucnRjcC5jbmFtZSA9IHRyYW5zY2VpdmVyLnJ0Y3BQYXJhbWV0ZXJzLmNuYW1lO1xuICAgICAgfVxuICAgICAgaWYgKHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnMubGVuZ3RoKSB7XG4gICAgICAgIHBhcmFtcy5ydGNwLnNzcmMgPSB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmM7XG4gICAgICB9XG4gICAgICB0cmFuc2NlaXZlci5ydHBSZWNlaXZlci5yZWNlaXZlKHBhcmFtcyk7XG4gICAgfVxuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5zZXRMb2NhbERlc2NyaXB0aW9uID0gZnVuY3Rpb24oZGVzY3JpcHRpb24pIHtcbiAgICB2YXIgcGMgPSB0aGlzO1xuXG4gICAgLy8gTm90ZTogcHJhbnN3ZXIgaXMgbm90IHN1cHBvcnRlZC5cbiAgICBpZiAoWydvZmZlcicsICdhbnN3ZXInXS5pbmRleE9mKGRlc2NyaXB0aW9uLnR5cGUpID09PSAtMSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG1ha2VFcnJvcignVHlwZUVycm9yJyxcbiAgICAgICAgICAnVW5zdXBwb3J0ZWQgdHlwZSBcIicgKyBkZXNjcmlwdGlvbi50eXBlICsgJ1wiJykpO1xuICAgIH1cblxuICAgIGlmICghaXNBY3Rpb25BbGxvd2VkSW5TaWduYWxpbmdTdGF0ZSgnc2V0TG9jYWxEZXNjcmlwdGlvbicsXG4gICAgICAgIGRlc2NyaXB0aW9uLnR5cGUsIHBjLnNpZ25hbGluZ1N0YXRlKSB8fCBwYy5faXNDbG9zZWQpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChtYWtlRXJyb3IoJ0ludmFsaWRTdGF0ZUVycm9yJyxcbiAgICAgICAgICAnQ2FuIG5vdCBzZXQgbG9jYWwgJyArIGRlc2NyaXB0aW9uLnR5cGUgK1xuICAgICAgICAgICcgaW4gc3RhdGUgJyArIHBjLnNpZ25hbGluZ1N0YXRlKSk7XG4gICAgfVxuXG4gICAgdmFyIHNlY3Rpb25zO1xuICAgIHZhciBzZXNzaW9ucGFydDtcbiAgICBpZiAoZGVzY3JpcHRpb24udHlwZSA9PT0gJ29mZmVyJykge1xuICAgICAgLy8gVkVSWSBsaW1pdGVkIHN1cHBvcnQgZm9yIFNEUCBtdW5naW5nLiBMaW1pdGVkIHRvOlxuICAgICAgLy8gKiBjaGFuZ2luZyB0aGUgb3JkZXIgb2YgY29kZWNzXG4gICAgICBzZWN0aW9ucyA9IFNEUFV0aWxzLnNwbGl0U2VjdGlvbnMoZGVzY3JpcHRpb24uc2RwKTtcbiAgICAgIHNlc3Npb25wYXJ0ID0gc2VjdGlvbnMuc2hpZnQoKTtcbiAgICAgIHNlY3Rpb25zLmZvckVhY2goZnVuY3Rpb24obWVkaWFTZWN0aW9uLCBzZHBNTGluZUluZGV4KSB7XG4gICAgICAgIHZhciBjYXBzID0gU0RQVXRpbHMucGFyc2VSdHBQYXJhbWV0ZXJzKG1lZGlhU2VjdGlvbik7XG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5sb2NhbENhcGFiaWxpdGllcyA9IGNhcHM7XG4gICAgICB9KTtcblxuICAgICAgcGMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIsIHNkcE1MaW5lSW5kZXgpIHtcbiAgICAgICAgcGMuX2dhdGhlcih0cmFuc2NlaXZlci5taWQsIHNkcE1MaW5lSW5kZXgpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChkZXNjcmlwdGlvbi50eXBlID09PSAnYW5zd2VyJykge1xuICAgICAgc2VjdGlvbnMgPSBTRFBVdGlscy5zcGxpdFNlY3Rpb25zKHBjLnJlbW90ZURlc2NyaXB0aW9uLnNkcCk7XG4gICAgICBzZXNzaW9ucGFydCA9IHNlY3Rpb25zLnNoaWZ0KCk7XG4gICAgICB2YXIgaXNJY2VMaXRlID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgoc2Vzc2lvbnBhcnQsXG4gICAgICAgICAgJ2E9aWNlLWxpdGUnKS5sZW5ndGggPiAwO1xuICAgICAgc2VjdGlvbnMuZm9yRWFjaChmdW5jdGlvbihtZWRpYVNlY3Rpb24sIHNkcE1MaW5lSW5kZXgpIHtcbiAgICAgICAgdmFyIHRyYW5zY2VpdmVyID0gcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdO1xuICAgICAgICB2YXIgaWNlR2F0aGVyZXIgPSB0cmFuc2NlaXZlci5pY2VHYXRoZXJlcjtcbiAgICAgICAgdmFyIGljZVRyYW5zcG9ydCA9IHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydDtcbiAgICAgICAgdmFyIGR0bHNUcmFuc3BvcnQgPSB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0O1xuICAgICAgICB2YXIgbG9jYWxDYXBhYmlsaXRpZXMgPSB0cmFuc2NlaXZlci5sb2NhbENhcGFiaWxpdGllcztcbiAgICAgICAgdmFyIHJlbW90ZUNhcGFiaWxpdGllcyA9IHRyYW5zY2VpdmVyLnJlbW90ZUNhcGFiaWxpdGllcztcblxuICAgICAgICAvLyB0cmVhdCBidW5kbGUtb25seSBhcyBub3QtcmVqZWN0ZWQuXG4gICAgICAgIHZhciByZWplY3RlZCA9IFNEUFV0aWxzLmlzUmVqZWN0ZWQobWVkaWFTZWN0aW9uKSAmJlxuICAgICAgICAgICAgU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1idW5kbGUtb25seScpLmxlbmd0aCA9PT0gMDtcblxuICAgICAgICBpZiAoIXJlamVjdGVkICYmICF0cmFuc2NlaXZlci5yZWplY3RlZCkge1xuICAgICAgICAgIHZhciByZW1vdGVJY2VQYXJhbWV0ZXJzID0gU0RQVXRpbHMuZ2V0SWNlUGFyYW1ldGVycyhcbiAgICAgICAgICAgICAgbWVkaWFTZWN0aW9uLCBzZXNzaW9ucGFydCk7XG4gICAgICAgICAgdmFyIHJlbW90ZUR0bHNQYXJhbWV0ZXJzID0gU0RQVXRpbHMuZ2V0RHRsc1BhcmFtZXRlcnMoXG4gICAgICAgICAgICAgIG1lZGlhU2VjdGlvbiwgc2Vzc2lvbnBhcnQpO1xuICAgICAgICAgIGlmIChpc0ljZUxpdGUpIHtcbiAgICAgICAgICAgIHJlbW90ZUR0bHNQYXJhbWV0ZXJzLnJvbGUgPSAnc2VydmVyJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIXBjLnVzaW5nQnVuZGxlIHx8IHNkcE1MaW5lSW5kZXggPT09IDApIHtcbiAgICAgICAgICAgIHBjLl9nYXRoZXIodHJhbnNjZWl2ZXIubWlkLCBzZHBNTGluZUluZGV4KTtcbiAgICAgICAgICAgIGlmIChpY2VUcmFuc3BvcnQuc3RhdGUgPT09ICduZXcnKSB7XG4gICAgICAgICAgICAgIGljZVRyYW5zcG9ydC5zdGFydChpY2VHYXRoZXJlciwgcmVtb3RlSWNlUGFyYW1ldGVycyxcbiAgICAgICAgICAgICAgICAgIGlzSWNlTGl0ZSA/ICdjb250cm9sbGluZycgOiAnY29udHJvbGxlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGR0bHNUcmFuc3BvcnQuc3RhdGUgPT09ICduZXcnKSB7XG4gICAgICAgICAgICAgIGR0bHNUcmFuc3BvcnQuc3RhcnQocmVtb3RlRHRsc1BhcmFtZXRlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIENhbGN1bGF0ZSBpbnRlcnNlY3Rpb24gb2YgY2FwYWJpbGl0aWVzLlxuICAgICAgICAgIHZhciBwYXJhbXMgPSBnZXRDb21tb25DYXBhYmlsaXRpZXMobG9jYWxDYXBhYmlsaXRpZXMsXG4gICAgICAgICAgICAgIHJlbW90ZUNhcGFiaWxpdGllcyk7XG5cbiAgICAgICAgICAvLyBTdGFydCB0aGUgUlRDUnRwU2VuZGVyLiBUaGUgUlRDUnRwUmVjZWl2ZXIgZm9yIHRoaXNcbiAgICAgICAgICAvLyB0cmFuc2NlaXZlciBoYXMgYWxyZWFkeSBiZWVuIHN0YXJ0ZWQgaW4gc2V0UmVtb3RlRGVzY3JpcHRpb24uXG4gICAgICAgICAgcGMuX3RyYW5zY2VpdmUodHJhbnNjZWl2ZXIsXG4gICAgICAgICAgICAgIHBhcmFtcy5jb2RlY3MubGVuZ3RoID4gMCxcbiAgICAgICAgICAgICAgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBwYy5sb2NhbERlc2NyaXB0aW9uID0ge1xuICAgICAgdHlwZTogZGVzY3JpcHRpb24udHlwZSxcbiAgICAgIHNkcDogZGVzY3JpcHRpb24uc2RwXG4gICAgfTtcbiAgICBpZiAoZGVzY3JpcHRpb24udHlwZSA9PT0gJ29mZmVyJykge1xuICAgICAgcGMuX3VwZGF0ZVNpZ25hbGluZ1N0YXRlKCdoYXZlLWxvY2FsLW9mZmVyJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBjLl91cGRhdGVTaWduYWxpbmdTdGF0ZSgnc3RhYmxlJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5zZXRSZW1vdGVEZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKGRlc2NyaXB0aW9uKSB7XG4gICAgdmFyIHBjID0gdGhpcztcblxuICAgIC8vIE5vdGU6IHByYW5zd2VyIGlzIG5vdCBzdXBwb3J0ZWQuXG4gICAgaWYgKFsnb2ZmZXInLCAnYW5zd2VyJ10uaW5kZXhPZihkZXNjcmlwdGlvbi50eXBlKSA9PT0gLTEpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChtYWtlRXJyb3IoJ1R5cGVFcnJvcicsXG4gICAgICAgICAgJ1Vuc3VwcG9ydGVkIHR5cGUgXCInICsgZGVzY3JpcHRpb24udHlwZSArICdcIicpKTtcbiAgICB9XG5cbiAgICBpZiAoIWlzQWN0aW9uQWxsb3dlZEluU2lnbmFsaW5nU3RhdGUoJ3NldFJlbW90ZURlc2NyaXB0aW9uJyxcbiAgICAgICAgZGVzY3JpcHRpb24udHlwZSwgcGMuc2lnbmFsaW5nU3RhdGUpIHx8IHBjLl9pc0Nsb3NlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG1ha2VFcnJvcignSW52YWxpZFN0YXRlRXJyb3InLFxuICAgICAgICAgICdDYW4gbm90IHNldCByZW1vdGUgJyArIGRlc2NyaXB0aW9uLnR5cGUgK1xuICAgICAgICAgICcgaW4gc3RhdGUgJyArIHBjLnNpZ25hbGluZ1N0YXRlKSk7XG4gICAgfVxuXG4gICAgdmFyIHN0cmVhbXMgPSB7fTtcbiAgICBwYy5yZW1vdGVTdHJlYW1zLmZvckVhY2goZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICBzdHJlYW1zW3N0cmVhbS5pZF0gPSBzdHJlYW07XG4gICAgfSk7XG4gICAgdmFyIHJlY2VpdmVyTGlzdCA9IFtdO1xuICAgIHZhciBzZWN0aW9ucyA9IFNEUFV0aWxzLnNwbGl0U2VjdGlvbnMoZGVzY3JpcHRpb24uc2RwKTtcbiAgICB2YXIgc2Vzc2lvbnBhcnQgPSBzZWN0aW9ucy5zaGlmdCgpO1xuICAgIHZhciBpc0ljZUxpdGUgPSBTRFBVdGlscy5tYXRjaFByZWZpeChzZXNzaW9ucGFydCxcbiAgICAgICAgJ2E9aWNlLWxpdGUnKS5sZW5ndGggPiAwO1xuICAgIHZhciB1c2luZ0J1bmRsZSA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KHNlc3Npb25wYXJ0LFxuICAgICAgICAnYT1ncm91cDpCVU5ETEUgJykubGVuZ3RoID4gMDtcbiAgICBwYy51c2luZ0J1bmRsZSA9IHVzaW5nQnVuZGxlO1xuICAgIHZhciBpY2VPcHRpb25zID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgoc2Vzc2lvbnBhcnQsXG4gICAgICAgICdhPWljZS1vcHRpb25zOicpWzBdO1xuICAgIGlmIChpY2VPcHRpb25zKSB7XG4gICAgICBwYy5jYW5Ucmlja2xlSWNlQ2FuZGlkYXRlcyA9IGljZU9wdGlvbnMuc3Vic3RyKDE0KS5zcGxpdCgnICcpXG4gICAgICAgICAgLmluZGV4T2YoJ3RyaWNrbGUnKSA+PSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYy5jYW5Ucmlja2xlSWNlQ2FuZGlkYXRlcyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHNlY3Rpb25zLmZvckVhY2goZnVuY3Rpb24obWVkaWFTZWN0aW9uLCBzZHBNTGluZUluZGV4KSB7XG4gICAgICB2YXIgbGluZXMgPSBTRFBVdGlscy5zcGxpdExpbmVzKG1lZGlhU2VjdGlvbik7XG4gICAgICB2YXIga2luZCA9IFNEUFV0aWxzLmdldEtpbmQobWVkaWFTZWN0aW9uKTtcbiAgICAgIC8vIHRyZWF0IGJ1bmRsZS1vbmx5IGFzIG5vdC1yZWplY3RlZC5cbiAgICAgIHZhciByZWplY3RlZCA9IFNEUFV0aWxzLmlzUmVqZWN0ZWQobWVkaWFTZWN0aW9uKSAmJlxuICAgICAgICAgIFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9YnVuZGxlLW9ubHknKS5sZW5ndGggPT09IDA7XG4gICAgICB2YXIgcHJvdG9jb2wgPSBsaW5lc1swXS5zdWJzdHIoMikuc3BsaXQoJyAnKVsyXTtcblxuICAgICAgdmFyIGRpcmVjdGlvbiA9IFNEUFV0aWxzLmdldERpcmVjdGlvbihtZWRpYVNlY3Rpb24sIHNlc3Npb25wYXJ0KTtcbiAgICAgIHZhciByZW1vdGVNc2lkID0gU0RQVXRpbHMucGFyc2VNc2lkKG1lZGlhU2VjdGlvbik7XG5cbiAgICAgIHZhciBtaWQgPSBTRFBVdGlscy5nZXRNaWQobWVkaWFTZWN0aW9uKSB8fCBTRFBVdGlscy5nZW5lcmF0ZUlkZW50aWZpZXIoKTtcblxuICAgICAgLy8gUmVqZWN0IGRhdGFjaGFubmVscyB3aGljaCBhcmUgbm90IGltcGxlbWVudGVkIHlldC5cbiAgICAgIGlmICgoa2luZCA9PT0gJ2FwcGxpY2F0aW9uJyAmJiBwcm90b2NvbCA9PT0gJ0RUTFMvU0NUUCcpIHx8IHJlamVjdGVkKSB7XG4gICAgICAgIC8vIFRPRE86IHRoaXMgaXMgZGFuZ2Vyb3VzIGluIHRoZSBjYXNlIHdoZXJlIGEgbm9uLXJlamVjdGVkIG0tbGluZVxuICAgICAgICAvLyAgICAgYmVjb21lcyByZWplY3RlZC5cbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdID0ge1xuICAgICAgICAgIG1pZDogbWlkLFxuICAgICAgICAgIGtpbmQ6IGtpbmQsXG4gICAgICAgICAgcmVqZWN0ZWQ6IHRydWVcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXJlamVjdGVkICYmIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XSAmJlxuICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5yZWplY3RlZCkge1xuICAgICAgICAvLyByZWN5Y2xlIGEgcmVqZWN0ZWQgdHJhbnNjZWl2ZXIuXG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XSA9IHBjLl9jcmVhdGVUcmFuc2NlaXZlcihraW5kLCB0cnVlKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHRyYW5zY2VpdmVyO1xuICAgICAgdmFyIGljZUdhdGhlcmVyO1xuICAgICAgdmFyIGljZVRyYW5zcG9ydDtcbiAgICAgIHZhciBkdGxzVHJhbnNwb3J0O1xuICAgICAgdmFyIHJ0cFJlY2VpdmVyO1xuICAgICAgdmFyIHNlbmRFbmNvZGluZ1BhcmFtZXRlcnM7XG4gICAgICB2YXIgcmVjdkVuY29kaW5nUGFyYW1ldGVycztcbiAgICAgIHZhciBsb2NhbENhcGFiaWxpdGllcztcblxuICAgICAgdmFyIHRyYWNrO1xuICAgICAgLy8gRklYTUU6IGVuc3VyZSB0aGUgbWVkaWFTZWN0aW9uIGhhcyBydGNwLW11eCBzZXQuXG4gICAgICB2YXIgcmVtb3RlQ2FwYWJpbGl0aWVzID0gU0RQVXRpbHMucGFyc2VSdHBQYXJhbWV0ZXJzKG1lZGlhU2VjdGlvbik7XG4gICAgICB2YXIgcmVtb3RlSWNlUGFyYW1ldGVycztcbiAgICAgIHZhciByZW1vdGVEdGxzUGFyYW1ldGVycztcbiAgICAgIGlmICghcmVqZWN0ZWQpIHtcbiAgICAgICAgcmVtb3RlSWNlUGFyYW1ldGVycyA9IFNEUFV0aWxzLmdldEljZVBhcmFtZXRlcnMobWVkaWFTZWN0aW9uLFxuICAgICAgICAgICAgc2Vzc2lvbnBhcnQpO1xuICAgICAgICByZW1vdGVEdGxzUGFyYW1ldGVycyA9IFNEUFV0aWxzLmdldER0bHNQYXJhbWV0ZXJzKG1lZGlhU2VjdGlvbixcbiAgICAgICAgICAgIHNlc3Npb25wYXJ0KTtcbiAgICAgICAgcmVtb3RlRHRsc1BhcmFtZXRlcnMucm9sZSA9ICdjbGllbnQnO1xuICAgICAgfVxuICAgICAgcmVjdkVuY29kaW5nUGFyYW1ldGVycyA9XG4gICAgICAgICAgU0RQVXRpbHMucGFyc2VSdHBFbmNvZGluZ1BhcmFtZXRlcnMobWVkaWFTZWN0aW9uKTtcblxuICAgICAgdmFyIHJ0Y3BQYXJhbWV0ZXJzID0gU0RQVXRpbHMucGFyc2VSdGNwUGFyYW1ldGVycyhtZWRpYVNlY3Rpb24pO1xuXG4gICAgICB2YXIgaXNDb21wbGV0ZSA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbixcbiAgICAgICAgICAnYT1lbmQtb2YtY2FuZGlkYXRlcycsIHNlc3Npb25wYXJ0KS5sZW5ndGggPiAwO1xuICAgICAgdmFyIGNhbmRzID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1jYW5kaWRhdGU6JylcbiAgICAgICAgICAubWFwKGZ1bmN0aW9uKGNhbmQpIHtcbiAgICAgICAgICAgIHJldHVybiBTRFBVdGlscy5wYXJzZUNhbmRpZGF0ZShjYW5kKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24oY2FuZCkge1xuICAgICAgICAgICAgcmV0dXJuIGNhbmQuY29tcG9uZW50ID09PSAxO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAvLyBDaGVjayBpZiB3ZSBjYW4gdXNlIEJVTkRMRSBhbmQgZGlzcG9zZSB0cmFuc3BvcnRzLlxuICAgICAgaWYgKChkZXNjcmlwdGlvbi50eXBlID09PSAnb2ZmZXInIHx8IGRlc2NyaXB0aW9uLnR5cGUgPT09ICdhbnN3ZXInKSAmJlxuICAgICAgICAgICFyZWplY3RlZCAmJiB1c2luZ0J1bmRsZSAmJiBzZHBNTGluZUluZGV4ID4gMCAmJlxuICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XSkge1xuICAgICAgICBwYy5fZGlzcG9zZUljZUFuZER0bHNUcmFuc3BvcnRzKHNkcE1MaW5lSW5kZXgpO1xuICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uaWNlR2F0aGVyZXIgPVxuICAgICAgICAgICAgcGMudHJhbnNjZWl2ZXJzWzBdLmljZUdhdGhlcmVyO1xuICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uaWNlVHJhbnNwb3J0ID1cbiAgICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1swXS5pY2VUcmFuc3BvcnQ7XG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5kdGxzVHJhbnNwb3J0ID1cbiAgICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1swXS5kdGxzVHJhbnNwb3J0O1xuICAgICAgICBpZiAocGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLnJ0cFNlbmRlcikge1xuICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5ydHBTZW5kZXIuc2V0VHJhbnNwb3J0KFxuICAgICAgICAgICAgICBwYy50cmFuc2NlaXZlcnNbMF0uZHRsc1RyYW5zcG9ydCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5ydHBSZWNlaXZlcikge1xuICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5ydHBSZWNlaXZlci5zZXRUcmFuc3BvcnQoXG4gICAgICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1swXS5kdGxzVHJhbnNwb3J0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGRlc2NyaXB0aW9uLnR5cGUgPT09ICdvZmZlcicgJiYgIXJlamVjdGVkKSB7XG4gICAgICAgIHRyYW5zY2VpdmVyID0gcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdIHx8XG4gICAgICAgICAgICBwYy5fY3JlYXRlVHJhbnNjZWl2ZXIoa2luZCk7XG4gICAgICAgIHRyYW5zY2VpdmVyLm1pZCA9IG1pZDtcblxuICAgICAgICBpZiAoIXRyYW5zY2VpdmVyLmljZUdhdGhlcmVyKSB7XG4gICAgICAgICAgdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIgPSBwYy5fY3JlYXRlSWNlR2F0aGVyZXIoc2RwTUxpbmVJbmRleCxcbiAgICAgICAgICAgICAgdXNpbmdCdW5kbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNhbmRzLmxlbmd0aCAmJiB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQuc3RhdGUgPT09ICduZXcnKSB7XG4gICAgICAgICAgaWYgKGlzQ29tcGxldGUgJiYgKCF1c2luZ0J1bmRsZSB8fCBzZHBNTGluZUluZGV4ID09PSAwKSkge1xuICAgICAgICAgICAgdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LnNldFJlbW90ZUNhbmRpZGF0ZXMoY2FuZHMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYW5kcy5mb3JFYWNoKGZ1bmN0aW9uKGNhbmRpZGF0ZSkge1xuICAgICAgICAgICAgICBtYXliZUFkZENhbmRpZGF0ZSh0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQsIGNhbmRpZGF0ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsb2NhbENhcGFiaWxpdGllcyA9IHdpbmRvdy5SVENSdHBSZWNlaXZlci5nZXRDYXBhYmlsaXRpZXMoa2luZCk7XG5cbiAgICAgICAgLy8gZmlsdGVyIFJUWCB1bnRpbCBhZGRpdGlvbmFsIHN0dWZmIG5lZWRlZCBmb3IgUlRYIGlzIGltcGxlbWVudGVkXG4gICAgICAgIC8vIGluIGFkYXB0ZXIuanNcbiAgICAgICAgaWYgKGVkZ2VWZXJzaW9uIDwgMTUwMTkpIHtcbiAgICAgICAgICBsb2NhbENhcGFiaWxpdGllcy5jb2RlY3MgPSBsb2NhbENhcGFiaWxpdGllcy5jb2RlY3MuZmlsdGVyKFxuICAgICAgICAgICAgICBmdW5jdGlvbihjb2RlYykge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb2RlYy5uYW1lICE9PSAncnR4JztcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzID0gdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVycyB8fCBbe1xuICAgICAgICAgIHNzcmM6ICgyICogc2RwTUxpbmVJbmRleCArIDIpICogMTAwMVxuICAgICAgICB9XTtcblxuICAgICAgICAvLyBUT0RPOiByZXdyaXRlIHRvIHVzZSBodHRwOi8vdzNjLmdpdGh1Yi5pby93ZWJydGMtcGMvI3NldC1hc3NvY2lhdGVkLXJlbW90ZS1zdHJlYW1zXG4gICAgICAgIHZhciBpc05ld1RyYWNrID0gZmFsc2U7XG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdzZW5kcmVjdicgfHwgZGlyZWN0aW9uID09PSAnc2VuZG9ubHknKSB7XG4gICAgICAgICAgaXNOZXdUcmFjayA9ICF0cmFuc2NlaXZlci5ydHBSZWNlaXZlcjtcbiAgICAgICAgICBydHBSZWNlaXZlciA9IHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyIHx8XG4gICAgICAgICAgICAgIG5ldyB3aW5kb3cuUlRDUnRwUmVjZWl2ZXIodHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydCwga2luZCk7XG5cbiAgICAgICAgICBpZiAoaXNOZXdUcmFjaykge1xuICAgICAgICAgICAgdmFyIHN0cmVhbTtcbiAgICAgICAgICAgIHRyYWNrID0gcnRwUmVjZWl2ZXIudHJhY2s7XG4gICAgICAgICAgICAvLyBGSVhNRTogZG9lcyBub3Qgd29yayB3aXRoIFBsYW4gQi5cbiAgICAgICAgICAgIGlmIChyZW1vdGVNc2lkICYmIHJlbW90ZU1zaWQuc3RyZWFtID09PSAnLScpIHtcbiAgICAgICAgICAgICAgLy8gbm8tb3AuIGEgc3RyZWFtIGlkIG9mICctJyBtZWFuczogbm8gYXNzb2NpYXRlZCBzdHJlYW0uXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlbW90ZU1zaWQpIHtcbiAgICAgICAgICAgICAgaWYgKCFzdHJlYW1zW3JlbW90ZU1zaWQuc3RyZWFtXSkge1xuICAgICAgICAgICAgICAgIHN0cmVhbXNbcmVtb3RlTXNpZC5zdHJlYW1dID0gbmV3IHdpbmRvdy5NZWRpYVN0cmVhbSgpO1xuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzdHJlYW1zW3JlbW90ZU1zaWQuc3RyZWFtXSwgJ2lkJywge1xuICAgICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlbW90ZU1zaWQuc3RyZWFtO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0cmFjaywgJ2lkJywge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gcmVtb3RlTXNpZC50cmFjaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBzdHJlYW0gPSBzdHJlYW1zW3JlbW90ZU1zaWQuc3RyZWFtXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmICghc3RyZWFtcy5kZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgc3RyZWFtcy5kZWZhdWx0ID0gbmV3IHdpbmRvdy5NZWRpYVN0cmVhbSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHN0cmVhbSA9IHN0cmVhbXMuZGVmYXVsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzdHJlYW0pIHtcbiAgICAgICAgICAgICAgYWRkVHJhY2tUb1N0cmVhbUFuZEZpcmVFdmVudCh0cmFjaywgc3RyZWFtKTtcbiAgICAgICAgICAgICAgdHJhbnNjZWl2ZXIuYXNzb2NpYXRlZFJlbW90ZU1lZGlhU3RyZWFtcy5wdXNoKHN0cmVhbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZWNlaXZlckxpc3QucHVzaChbdHJhY2ssIHJ0cFJlY2VpdmVyLCBzdHJlYW1dKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIgJiYgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIudHJhY2spIHtcbiAgICAgICAgICB0cmFuc2NlaXZlci5hc3NvY2lhdGVkUmVtb3RlTWVkaWFTdHJlYW1zLmZvckVhY2goZnVuY3Rpb24ocykge1xuICAgICAgICAgICAgdmFyIG5hdGl2ZVRyYWNrID0gcy5nZXRUcmFja3MoKS5maW5kKGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHQuaWQgPT09IHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyLnRyYWNrLmlkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAobmF0aXZlVHJhY2spIHtcbiAgICAgICAgICAgICAgcmVtb3ZlVHJhY2tGcm9tU3RyZWFtQW5kRmlyZUV2ZW50KG5hdGl2ZVRyYWNrLCBzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0cmFuc2NlaXZlci5hc3NvY2lhdGVkUmVtb3RlTWVkaWFTdHJlYW1zID0gW107XG4gICAgICAgIH1cblxuICAgICAgICB0cmFuc2NlaXZlci5sb2NhbENhcGFiaWxpdGllcyA9IGxvY2FsQ2FwYWJpbGl0aWVzO1xuICAgICAgICB0cmFuc2NlaXZlci5yZW1vdGVDYXBhYmlsaXRpZXMgPSByZW1vdGVDYXBhYmlsaXRpZXM7XG4gICAgICAgIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyID0gcnRwUmVjZWl2ZXI7XG4gICAgICAgIHRyYW5zY2VpdmVyLnJ0Y3BQYXJhbWV0ZXJzID0gcnRjcFBhcmFtZXRlcnM7XG4gICAgICAgIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnMgPSBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzO1xuICAgICAgICB0cmFuc2NlaXZlci5yZWN2RW5jb2RpbmdQYXJhbWV0ZXJzID0gcmVjdkVuY29kaW5nUGFyYW1ldGVycztcblxuICAgICAgICAvLyBTdGFydCB0aGUgUlRDUnRwUmVjZWl2ZXIgbm93LiBUaGUgUlRQU2VuZGVyIGlzIHN0YXJ0ZWQgaW5cbiAgICAgICAgLy8gc2V0TG9jYWxEZXNjcmlwdGlvbi5cbiAgICAgICAgcGMuX3RyYW5zY2VpdmUocGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLFxuICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICBpc05ld1RyYWNrKTtcbiAgICAgIH0gZWxzZSBpZiAoZGVzY3JpcHRpb24udHlwZSA9PT0gJ2Fuc3dlcicgJiYgIXJlamVjdGVkKSB7XG4gICAgICAgIHRyYW5zY2VpdmVyID0gcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdO1xuICAgICAgICBpY2VHYXRoZXJlciA9IHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyO1xuICAgICAgICBpY2VUcmFuc3BvcnQgPSB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQ7XG4gICAgICAgIGR0bHNUcmFuc3BvcnQgPSB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0O1xuICAgICAgICBydHBSZWNlaXZlciA9IHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyO1xuICAgICAgICBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzID0gdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVycztcbiAgICAgICAgbG9jYWxDYXBhYmlsaXRpZXMgPSB0cmFuc2NlaXZlci5sb2NhbENhcGFiaWxpdGllcztcblxuICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0ucmVjdkVuY29kaW5nUGFyYW1ldGVycyA9XG4gICAgICAgICAgICByZWN2RW5jb2RpbmdQYXJhbWV0ZXJzO1xuICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0ucmVtb3RlQ2FwYWJpbGl0aWVzID1cbiAgICAgICAgICAgIHJlbW90ZUNhcGFiaWxpdGllcztcbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLnJ0Y3BQYXJhbWV0ZXJzID0gcnRjcFBhcmFtZXRlcnM7XG5cbiAgICAgICAgaWYgKGNhbmRzLmxlbmd0aCAmJiBpY2VUcmFuc3BvcnQuc3RhdGUgPT09ICduZXcnKSB7XG4gICAgICAgICAgaWYgKChpc0ljZUxpdGUgfHwgaXNDb21wbGV0ZSkgJiZcbiAgICAgICAgICAgICAgKCF1c2luZ0J1bmRsZSB8fCBzZHBNTGluZUluZGV4ID09PSAwKSkge1xuICAgICAgICAgICAgaWNlVHJhbnNwb3J0LnNldFJlbW90ZUNhbmRpZGF0ZXMoY2FuZHMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYW5kcy5mb3JFYWNoKGZ1bmN0aW9uKGNhbmRpZGF0ZSkge1xuICAgICAgICAgICAgICBtYXliZUFkZENhbmRpZGF0ZSh0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQsIGNhbmRpZGF0ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXVzaW5nQnVuZGxlIHx8IHNkcE1MaW5lSW5kZXggPT09IDApIHtcbiAgICAgICAgICBpZiAoaWNlVHJhbnNwb3J0LnN0YXRlID09PSAnbmV3Jykge1xuICAgICAgICAgICAgaWNlVHJhbnNwb3J0LnN0YXJ0KGljZUdhdGhlcmVyLCByZW1vdGVJY2VQYXJhbWV0ZXJzLFxuICAgICAgICAgICAgICAgICdjb250cm9sbGluZycpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZHRsc1RyYW5zcG9ydC5zdGF0ZSA9PT0gJ25ldycpIHtcbiAgICAgICAgICAgIGR0bHNUcmFuc3BvcnQuc3RhcnQocmVtb3RlRHRsc1BhcmFtZXRlcnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHBjLl90cmFuc2NlaXZlKHRyYW5zY2VpdmVyLFxuICAgICAgICAgICAgZGlyZWN0aW9uID09PSAnc2VuZHJlY3YnIHx8IGRpcmVjdGlvbiA9PT0gJ3JlY3Zvbmx5JyxcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9PT0gJ3NlbmRyZWN2JyB8fCBkaXJlY3Rpb24gPT09ICdzZW5kb25seScpO1xuXG4gICAgICAgIC8vIFRPRE86IHJld3JpdGUgdG8gdXNlIGh0dHA6Ly93M2MuZ2l0aHViLmlvL3dlYnJ0Yy1wYy8jc2V0LWFzc29jaWF0ZWQtcmVtb3RlLXN0cmVhbXNcbiAgICAgICAgaWYgKHJ0cFJlY2VpdmVyICYmXG4gICAgICAgICAgICAoZGlyZWN0aW9uID09PSAnc2VuZHJlY3YnIHx8IGRpcmVjdGlvbiA9PT0gJ3NlbmRvbmx5JykpIHtcbiAgICAgICAgICB0cmFjayA9IHJ0cFJlY2VpdmVyLnRyYWNrO1xuICAgICAgICAgIGlmIChyZW1vdGVNc2lkKSB7XG4gICAgICAgICAgICBpZiAoIXN0cmVhbXNbcmVtb3RlTXNpZC5zdHJlYW1dKSB7XG4gICAgICAgICAgICAgIHN0cmVhbXNbcmVtb3RlTXNpZC5zdHJlYW1dID0gbmV3IHdpbmRvdy5NZWRpYVN0cmVhbSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWRkVHJhY2tUb1N0cmVhbUFuZEZpcmVFdmVudCh0cmFjaywgc3RyZWFtc1tyZW1vdGVNc2lkLnN0cmVhbV0pO1xuICAgICAgICAgICAgcmVjZWl2ZXJMaXN0LnB1c2goW3RyYWNrLCBydHBSZWNlaXZlciwgc3RyZWFtc1tyZW1vdGVNc2lkLnN0cmVhbV1dKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFzdHJlYW1zLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICAgc3RyZWFtcy5kZWZhdWx0ID0gbmV3IHdpbmRvdy5NZWRpYVN0cmVhbSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWRkVHJhY2tUb1N0cmVhbUFuZEZpcmVFdmVudCh0cmFjaywgc3RyZWFtcy5kZWZhdWx0KTtcbiAgICAgICAgICAgIHJlY2VpdmVyTGlzdC5wdXNoKFt0cmFjaywgcnRwUmVjZWl2ZXIsIHN0cmVhbXMuZGVmYXVsdF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBGSVhNRTogYWN0dWFsbHkgdGhlIHJlY2VpdmVyIHNob3VsZCBiZSBjcmVhdGVkIGxhdGVyLlxuICAgICAgICAgIGRlbGV0ZSB0cmFuc2NlaXZlci5ydHBSZWNlaXZlcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHBjLl9kdGxzUm9sZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBwYy5fZHRsc1JvbGUgPSBkZXNjcmlwdGlvbi50eXBlID09PSAnb2ZmZXInID8gJ2FjdGl2ZScgOiAncGFzc2l2ZSc7XG4gICAgfVxuXG4gICAgcGMucmVtb3RlRGVzY3JpcHRpb24gPSB7XG4gICAgICB0eXBlOiBkZXNjcmlwdGlvbi50eXBlLFxuICAgICAgc2RwOiBkZXNjcmlwdGlvbi5zZHBcbiAgICB9O1xuICAgIGlmIChkZXNjcmlwdGlvbi50eXBlID09PSAnb2ZmZXInKSB7XG4gICAgICBwYy5fdXBkYXRlU2lnbmFsaW5nU3RhdGUoJ2hhdmUtcmVtb3RlLW9mZmVyJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBjLl91cGRhdGVTaWduYWxpbmdTdGF0ZSgnc3RhYmxlJyk7XG4gICAgfVxuICAgIE9iamVjdC5rZXlzKHN0cmVhbXMpLmZvckVhY2goZnVuY3Rpb24oc2lkKSB7XG4gICAgICB2YXIgc3RyZWFtID0gc3RyZWFtc1tzaWRdO1xuICAgICAgaWYgKHN0cmVhbS5nZXRUcmFja3MoKS5sZW5ndGgpIHtcbiAgICAgICAgaWYgKHBjLnJlbW90ZVN0cmVhbXMuaW5kZXhPZihzdHJlYW0pID09PSAtMSkge1xuICAgICAgICAgIHBjLnJlbW90ZVN0cmVhbXMucHVzaChzdHJlYW0pO1xuICAgICAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgnYWRkc3RyZWFtJyk7XG4gICAgICAgICAgZXZlbnQuc3RyZWFtID0gc3RyZWFtO1xuICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcGMuX2Rpc3BhdGNoRXZlbnQoJ2FkZHN0cmVhbScsIGV2ZW50KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlY2VpdmVyTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICB2YXIgdHJhY2sgPSBpdGVtWzBdO1xuICAgICAgICAgIHZhciByZWNlaXZlciA9IGl0ZW1bMV07XG4gICAgICAgICAgaWYgKHN0cmVhbS5pZCAhPT0gaXRlbVsyXS5pZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBmaXJlQWRkVHJhY2socGMsIHRyYWNrLCByZWNlaXZlciwgW3N0cmVhbV0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZWNlaXZlckxpc3QuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBmaXJlQWRkVHJhY2socGMsIGl0ZW1bMF0sIGl0ZW1bMV0sIFtdKTtcbiAgICB9KTtcblxuICAgIC8vIGNoZWNrIHdoZXRoZXIgYWRkSWNlQ2FuZGlkYXRlKHt9KSB3YXMgY2FsbGVkIHdpdGhpbiBmb3VyIHNlY29uZHMgYWZ0ZXJcbiAgICAvLyBzZXRSZW1vdGVEZXNjcmlwdGlvbi5cbiAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIGlmICghKHBjICYmIHBjLnRyYW5zY2VpdmVycykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgcGMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcbiAgICAgICAgaWYgKHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydCAmJlxuICAgICAgICAgICAgdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LnN0YXRlID09PSAnbmV3JyAmJlxuICAgICAgICAgICAgdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LmdldFJlbW90ZUNhbmRpZGF0ZXMoKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdUaW1lb3V0IGZvciBhZGRSZW1vdGVDYW5kaWRhdGUuIENvbnNpZGVyIHNlbmRpbmcgJyArXG4gICAgICAgICAgICAgICdhbiBlbmQtb2YtY2FuZGlkYXRlcyBub3RpZmljYXRpb24nKTtcbiAgICAgICAgICB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQuYWRkUmVtb3RlQ2FuZGlkYXRlKHt9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgNDAwMCk7XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xuICAgICAgLyogbm90IHlldFxuICAgICAgaWYgKHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyKSB7XG4gICAgICAgIHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyLmNsb3NlKCk7XG4gICAgICB9XG4gICAgICAqL1xuICAgICAgaWYgKHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydCkge1xuICAgICAgICB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQuc3RvcCgpO1xuICAgICAgfVxuICAgICAgaWYgKHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQpIHtcbiAgICAgICAgdHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydC5zdG9wKCk7XG4gICAgICB9XG4gICAgICBpZiAodHJhbnNjZWl2ZXIucnRwU2VuZGVyKSB7XG4gICAgICAgIHRyYW5zY2VpdmVyLnJ0cFNlbmRlci5zdG9wKCk7XG4gICAgICB9XG4gICAgICBpZiAodHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIpIHtcbiAgICAgICAgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIuc3RvcCgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIC8vIEZJWE1FOiBjbGVhbiB1cCB0cmFja3MsIGxvY2FsIHN0cmVhbXMsIHJlbW90ZSBzdHJlYW1zLCBldGNcbiAgICB0aGlzLl9pc0Nsb3NlZCA9IHRydWU7XG4gICAgdGhpcy5fdXBkYXRlU2lnbmFsaW5nU3RhdGUoJ2Nsb3NlZCcpO1xuICB9O1xuXG4gIC8vIFVwZGF0ZSB0aGUgc2lnbmFsaW5nIHN0YXRlLlxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX3VwZGF0ZVNpZ25hbGluZ1N0YXRlID0gZnVuY3Rpb24obmV3U3RhdGUpIHtcbiAgICB0aGlzLnNpZ25hbGluZ1N0YXRlID0gbmV3U3RhdGU7XG4gICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdzaWduYWxpbmdzdGF0ZWNoYW5nZScpO1xuICAgIHRoaXMuX2Rpc3BhdGNoRXZlbnQoJ3NpZ25hbGluZ3N0YXRlY2hhbmdlJywgZXZlbnQpO1xuICB9O1xuXG4gIC8vIERldGVybWluZSB3aGV0aGVyIHRvIGZpcmUgdGhlIG5lZ290aWF0aW9ubmVlZGVkIGV2ZW50LlxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX21heWJlRmlyZU5lZ290aWF0aW9uTmVlZGVkID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHBjID0gdGhpcztcbiAgICBpZiAodGhpcy5zaWduYWxpbmdTdGF0ZSAhPT0gJ3N0YWJsZScgfHwgdGhpcy5uZWVkTmVnb3RpYXRpb24gPT09IHRydWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5uZWVkTmVnb3RpYXRpb24gPSB0cnVlO1xuICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHBjLm5lZWROZWdvdGlhdGlvbikge1xuICAgICAgICBwYy5uZWVkTmVnb3RpYXRpb24gPSBmYWxzZTtcbiAgICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCduZWdvdGlhdGlvbm5lZWRlZCcpO1xuICAgICAgICBwYy5fZGlzcGF0Y2hFdmVudCgnbmVnb3RpYXRpb25uZWVkZWQnLCBldmVudCk7XG4gICAgICB9XG4gICAgfSwgMCk7XG4gIH07XG5cbiAgLy8gVXBkYXRlIHRoZSBpY2UgY29ubmVjdGlvbiBzdGF0ZS5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl91cGRhdGVJY2VDb25uZWN0aW9uU3RhdGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgbmV3U3RhdGU7XG4gICAgdmFyIHN0YXRlcyA9IHtcbiAgICAgICduZXcnOiAwLFxuICAgICAgY2xvc2VkOiAwLFxuICAgICAgY2hlY2tpbmc6IDAsXG4gICAgICBjb25uZWN0ZWQ6IDAsXG4gICAgICBjb21wbGV0ZWQ6IDAsXG4gICAgICBkaXNjb25uZWN0ZWQ6IDAsXG4gICAgICBmYWlsZWQ6IDBcbiAgICB9O1xuICAgIHRoaXMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcbiAgICAgIHN0YXRlc1t0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQuc3RhdGVdKys7XG4gICAgfSk7XG5cbiAgICBuZXdTdGF0ZSA9ICduZXcnO1xuICAgIGlmIChzdGF0ZXMuZmFpbGVkID4gMCkge1xuICAgICAgbmV3U3RhdGUgPSAnZmFpbGVkJztcbiAgICB9IGVsc2UgaWYgKHN0YXRlcy5jaGVja2luZyA+IDApIHtcbiAgICAgIG5ld1N0YXRlID0gJ2NoZWNraW5nJztcbiAgICB9IGVsc2UgaWYgKHN0YXRlcy5kaXNjb25uZWN0ZWQgPiAwKSB7XG4gICAgICBuZXdTdGF0ZSA9ICdkaXNjb25uZWN0ZWQnO1xuICAgIH0gZWxzZSBpZiAoc3RhdGVzLm5ldyA+IDApIHtcbiAgICAgIG5ld1N0YXRlID0gJ25ldyc7XG4gICAgfSBlbHNlIGlmIChzdGF0ZXMuY29ubmVjdGVkID4gMCkge1xuICAgICAgbmV3U3RhdGUgPSAnY29ubmVjdGVkJztcbiAgICB9IGVsc2UgaWYgKHN0YXRlcy5jb21wbGV0ZWQgPiAwKSB7XG4gICAgICBuZXdTdGF0ZSA9ICdjb21wbGV0ZWQnO1xuICAgIH1cblxuICAgIGlmIChuZXdTdGF0ZSAhPT0gdGhpcy5pY2VDb25uZWN0aW9uU3RhdGUpIHtcbiAgICAgIHRoaXMuaWNlQ29ubmVjdGlvblN0YXRlID0gbmV3U3RhdGU7XG4gICAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ2ljZWNvbm5lY3Rpb25zdGF0ZWNoYW5nZScpO1xuICAgICAgdGhpcy5fZGlzcGF0Y2hFdmVudCgnaWNlY29ubmVjdGlvbnN0YXRlY2hhbmdlJywgZXZlbnQpO1xuICAgIH1cbiAgfTtcblxuICAvLyBVcGRhdGUgdGhlIGNvbm5lY3Rpb24gc3RhdGUuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fdXBkYXRlQ29ubmVjdGlvblN0YXRlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG5ld1N0YXRlO1xuICAgIHZhciBzdGF0ZXMgPSB7XG4gICAgICAnbmV3JzogMCxcbiAgICAgIGNsb3NlZDogMCxcbiAgICAgIGNvbm5lY3Rpbmc6IDAsXG4gICAgICBjb25uZWN0ZWQ6IDAsXG4gICAgICBjb21wbGV0ZWQ6IDAsXG4gICAgICBkaXNjb25uZWN0ZWQ6IDAsXG4gICAgICBmYWlsZWQ6IDBcbiAgICB9O1xuICAgIHRoaXMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcbiAgICAgIHN0YXRlc1t0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQuc3RhdGVdKys7XG4gICAgICBzdGF0ZXNbdHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydC5zdGF0ZV0rKztcbiAgICB9KTtcbiAgICAvLyBJQ0VUcmFuc3BvcnQuY29tcGxldGVkIGFuZCBjb25uZWN0ZWQgYXJlIHRoZSBzYW1lIGZvciB0aGlzIHB1cnBvc2UuXG4gICAgc3RhdGVzLmNvbm5lY3RlZCArPSBzdGF0ZXMuY29tcGxldGVkO1xuXG4gICAgbmV3U3RhdGUgPSAnbmV3JztcbiAgICBpZiAoc3RhdGVzLmZhaWxlZCA+IDApIHtcbiAgICAgIG5ld1N0YXRlID0gJ2ZhaWxlZCc7XG4gICAgfSBlbHNlIGlmIChzdGF0ZXMuY29ubmVjdGluZyA+IDApIHtcbiAgICAgIG5ld1N0YXRlID0gJ2Nvbm5lY3RpbmcnO1xuICAgIH0gZWxzZSBpZiAoc3RhdGVzLmRpc2Nvbm5lY3RlZCA+IDApIHtcbiAgICAgIG5ld1N0YXRlID0gJ2Rpc2Nvbm5lY3RlZCc7XG4gICAgfSBlbHNlIGlmIChzdGF0ZXMubmV3ID4gMCkge1xuICAgICAgbmV3U3RhdGUgPSAnbmV3JztcbiAgICB9IGVsc2UgaWYgKHN0YXRlcy5jb25uZWN0ZWQgPiAwKSB7XG4gICAgICBuZXdTdGF0ZSA9ICdjb25uZWN0ZWQnO1xuICAgIH1cblxuICAgIGlmIChuZXdTdGF0ZSAhPT0gdGhpcy5jb25uZWN0aW9uU3RhdGUpIHtcbiAgICAgIHRoaXMuY29ubmVjdGlvblN0YXRlID0gbmV3U3RhdGU7XG4gICAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ2Nvbm5lY3Rpb25zdGF0ZWNoYW5nZScpO1xuICAgICAgdGhpcy5fZGlzcGF0Y2hFdmVudCgnY29ubmVjdGlvbnN0YXRlY2hhbmdlJywgZXZlbnQpO1xuICAgIH1cbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlT2ZmZXIgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcGMgPSB0aGlzO1xuXG4gICAgaWYgKHBjLl9pc0Nsb3NlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG1ha2VFcnJvcignSW52YWxpZFN0YXRlRXJyb3InLFxuICAgICAgICAgICdDYW4gbm90IGNhbGwgY3JlYXRlT2ZmZXIgYWZ0ZXIgY2xvc2UnKSk7XG4gICAgfVxuXG4gICAgdmFyIG51bUF1ZGlvVHJhY2tzID0gcGMudHJhbnNjZWl2ZXJzLmZpbHRlcihmdW5jdGlvbih0KSB7XG4gICAgICByZXR1cm4gdC5raW5kID09PSAnYXVkaW8nO1xuICAgIH0pLmxlbmd0aDtcbiAgICB2YXIgbnVtVmlkZW9UcmFja3MgPSBwYy50cmFuc2NlaXZlcnMuZmlsdGVyKGZ1bmN0aW9uKHQpIHtcbiAgICAgIHJldHVybiB0LmtpbmQgPT09ICd2aWRlbyc7XG4gICAgfSkubGVuZ3RoO1xuXG4gICAgLy8gRGV0ZXJtaW5lIG51bWJlciBvZiBhdWRpbyBhbmQgdmlkZW8gdHJhY2tzIHdlIG5lZWQgdG8gc2VuZC9yZWN2LlxuICAgIHZhciBvZmZlck9wdGlvbnMgPSBhcmd1bWVudHNbMF07XG4gICAgaWYgKG9mZmVyT3B0aW9ucykge1xuICAgICAgLy8gUmVqZWN0IENocm9tZSBsZWdhY3kgY29uc3RyYWludHMuXG4gICAgICBpZiAob2ZmZXJPcHRpb25zLm1hbmRhdG9yeSB8fCBvZmZlck9wdGlvbnMub3B0aW9uYWwpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICAgICdMZWdhY3kgbWFuZGF0b3J5L29wdGlvbmFsIGNvbnN0cmFpbnRzIG5vdCBzdXBwb3J0ZWQuJyk7XG4gICAgICB9XG4gICAgICBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW8gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW8gPT09IHRydWUpIHtcbiAgICAgICAgICBudW1BdWRpb1RyYWNrcyA9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW8gPT09IGZhbHNlKSB7XG4gICAgICAgICAgbnVtQXVkaW9UcmFja3MgPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG51bUF1ZGlvVHJhY2tzID0gb2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW87XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVWaWRlbyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVWaWRlbyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIG51bVZpZGVvVHJhY2tzID0gMTtcbiAgICAgICAgfSBlbHNlIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVWaWRlbyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBudW1WaWRlb1RyYWNrcyA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbnVtVmlkZW9UcmFja3MgPSBvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVWaWRlbztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHBjLnRyYW5zY2VpdmVycy5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XG4gICAgICBpZiAodHJhbnNjZWl2ZXIua2luZCA9PT0gJ2F1ZGlvJykge1xuICAgICAgICBudW1BdWRpb1RyYWNrcy0tO1xuICAgICAgICBpZiAobnVtQXVkaW9UcmFja3MgPCAwKSB7XG4gICAgICAgICAgdHJhbnNjZWl2ZXIud2FudFJlY2VpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0cmFuc2NlaXZlci5raW5kID09PSAndmlkZW8nKSB7XG4gICAgICAgIG51bVZpZGVvVHJhY2tzLS07XG4gICAgICAgIGlmIChudW1WaWRlb1RyYWNrcyA8IDApIHtcbiAgICAgICAgICB0cmFuc2NlaXZlci53YW50UmVjZWl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBDcmVhdGUgTS1saW5lcyBmb3IgcmVjdm9ubHkgc3RyZWFtcy5cbiAgICB3aGlsZSAobnVtQXVkaW9UcmFja3MgPiAwIHx8IG51bVZpZGVvVHJhY2tzID4gMCkge1xuICAgICAgaWYgKG51bUF1ZGlvVHJhY2tzID4gMCkge1xuICAgICAgICBwYy5fY3JlYXRlVHJhbnNjZWl2ZXIoJ2F1ZGlvJyk7XG4gICAgICAgIG51bUF1ZGlvVHJhY2tzLS07XG4gICAgICB9XG4gICAgICBpZiAobnVtVmlkZW9UcmFja3MgPiAwKSB7XG4gICAgICAgIHBjLl9jcmVhdGVUcmFuc2NlaXZlcigndmlkZW8nKTtcbiAgICAgICAgbnVtVmlkZW9UcmFja3MtLTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgc2RwID0gU0RQVXRpbHMud3JpdGVTZXNzaW9uQm9pbGVycGxhdGUocGMuX3NkcFNlc3Npb25JZCxcbiAgICAgICAgcGMuX3NkcFNlc3Npb25WZXJzaW9uKyspO1xuICAgIHBjLnRyYW5zY2VpdmVycy5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zY2VpdmVyLCBzZHBNTGluZUluZGV4KSB7XG4gICAgICAvLyBGb3IgZWFjaCB0cmFjaywgY3JlYXRlIGFuIGljZSBnYXRoZXJlciwgaWNlIHRyYW5zcG9ydCxcbiAgICAgIC8vIGR0bHMgdHJhbnNwb3J0LCBwb3RlbnRpYWxseSBydHBzZW5kZXIgYW5kIHJ0cHJlY2VpdmVyLlxuICAgICAgdmFyIHRyYWNrID0gdHJhbnNjZWl2ZXIudHJhY2s7XG4gICAgICB2YXIga2luZCA9IHRyYW5zY2VpdmVyLmtpbmQ7XG4gICAgICB2YXIgbWlkID0gdHJhbnNjZWl2ZXIubWlkIHx8IFNEUFV0aWxzLmdlbmVyYXRlSWRlbnRpZmllcigpO1xuICAgICAgdHJhbnNjZWl2ZXIubWlkID0gbWlkO1xuXG4gICAgICBpZiAoIXRyYW5zY2VpdmVyLmljZUdhdGhlcmVyKSB7XG4gICAgICAgIHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyID0gcGMuX2NyZWF0ZUljZUdhdGhlcmVyKHNkcE1MaW5lSW5kZXgsXG4gICAgICAgICAgICBwYy51c2luZ0J1bmRsZSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBsb2NhbENhcGFiaWxpdGllcyA9IHdpbmRvdy5SVENSdHBTZW5kZXIuZ2V0Q2FwYWJpbGl0aWVzKGtpbmQpO1xuICAgICAgLy8gZmlsdGVyIFJUWCB1bnRpbCBhZGRpdGlvbmFsIHN0dWZmIG5lZWRlZCBmb3IgUlRYIGlzIGltcGxlbWVudGVkXG4gICAgICAvLyBpbiBhZGFwdGVyLmpzXG4gICAgICBpZiAoZWRnZVZlcnNpb24gPCAxNTAxOSkge1xuICAgICAgICBsb2NhbENhcGFiaWxpdGllcy5jb2RlY3MgPSBsb2NhbENhcGFiaWxpdGllcy5jb2RlY3MuZmlsdGVyKFxuICAgICAgICAgICAgZnVuY3Rpb24oY29kZWMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNvZGVjLm5hbWUgIT09ICdydHgnO1xuICAgICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBsb2NhbENhcGFiaWxpdGllcy5jb2RlY3MuZm9yRWFjaChmdW5jdGlvbihjb2RlYykge1xuICAgICAgICAvLyB3b3JrIGFyb3VuZCBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3Avd2VicnRjL2lzc3Vlcy9kZXRhaWw/aWQ9NjU1MlxuICAgICAgICAvLyBieSBhZGRpbmcgbGV2ZWwtYXN5bW1ldHJ5LWFsbG93ZWQ9MVxuICAgICAgICBpZiAoY29kZWMubmFtZSA9PT0gJ0gyNjQnICYmXG4gICAgICAgICAgICBjb2RlYy5wYXJhbWV0ZXJzWydsZXZlbC1hc3ltbWV0cnktYWxsb3dlZCddID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjb2RlYy5wYXJhbWV0ZXJzWydsZXZlbC1hc3ltbWV0cnktYWxsb3dlZCddID0gJzEnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZm9yIHN1YnNlcXVlbnQgb2ZmZXJzLCB3ZSBtaWdodCBoYXZlIHRvIHJlLXVzZSB0aGUgcGF5bG9hZFxuICAgICAgICAvLyB0eXBlIG9mIHRoZSBsYXN0IG9mZmVyLlxuICAgICAgICBpZiAodHJhbnNjZWl2ZXIucmVtb3RlQ2FwYWJpbGl0aWVzICYmXG4gICAgICAgICAgICB0cmFuc2NlaXZlci5yZW1vdGVDYXBhYmlsaXRpZXMuY29kZWNzKSB7XG4gICAgICAgICAgdHJhbnNjZWl2ZXIucmVtb3RlQ2FwYWJpbGl0aWVzLmNvZGVjcy5mb3JFYWNoKGZ1bmN0aW9uKHJlbW90ZUNvZGVjKSB7XG4gICAgICAgICAgICBpZiAoY29kZWMubmFtZS50b0xvd2VyQ2FzZSgpID09PSByZW1vdGVDb2RlYy5uYW1lLnRvTG93ZXJDYXNlKCkgJiZcbiAgICAgICAgICAgICAgICBjb2RlYy5jbG9ja1JhdGUgPT09IHJlbW90ZUNvZGVjLmNsb2NrUmF0ZSkge1xuICAgICAgICAgICAgICBjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZSA9IHJlbW90ZUNvZGVjLnBheWxvYWRUeXBlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGxvY2FsQ2FwYWJpbGl0aWVzLmhlYWRlckV4dGVuc2lvbnMuZm9yRWFjaChmdW5jdGlvbihoZHJFeHQpIHtcbiAgICAgICAgdmFyIHJlbW90ZUV4dGVuc2lvbnMgPSB0cmFuc2NlaXZlci5yZW1vdGVDYXBhYmlsaXRpZXMgJiZcbiAgICAgICAgICAgIHRyYW5zY2VpdmVyLnJlbW90ZUNhcGFiaWxpdGllcy5oZWFkZXJFeHRlbnNpb25zIHx8IFtdO1xuICAgICAgICByZW1vdGVFeHRlbnNpb25zLmZvckVhY2goZnVuY3Rpb24ockhkckV4dCkge1xuICAgICAgICAgIGlmIChoZHJFeHQudXJpID09PSBySGRyRXh0LnVyaSkge1xuICAgICAgICAgICAgaGRyRXh0LmlkID0gckhkckV4dC5pZDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIGdlbmVyYXRlIGFuIHNzcmMgbm93LCB0byBiZSB1c2VkIGxhdGVyIGluIHJ0cFNlbmRlci5zZW5kXG4gICAgICB2YXIgc2VuZEVuY29kaW5nUGFyYW1ldGVycyA9IHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnMgfHwgW3tcbiAgICAgICAgc3NyYzogKDIgKiBzZHBNTGluZUluZGV4ICsgMSkgKiAxMDAxXG4gICAgICB9XTtcbiAgICAgIGlmICh0cmFjaykge1xuICAgICAgICAvLyBhZGQgUlRYXG4gICAgICAgIGlmIChlZGdlVmVyc2lvbiA+PSAxNTAxOSAmJiBraW5kID09PSAndmlkZW8nICYmXG4gICAgICAgICAgICAhc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHgpIHtcbiAgICAgICAgICBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCA9IHtcbiAgICAgICAgICAgIHNzcmM6IHNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYyArIDFcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0cmFuc2NlaXZlci53YW50UmVjZWl2ZSkge1xuICAgICAgICB0cmFuc2NlaXZlci5ydHBSZWNlaXZlciA9IG5ldyB3aW5kb3cuUlRDUnRwUmVjZWl2ZXIoXG4gICAgICAgICAgICB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0LCBraW5kKTtcbiAgICAgIH1cblxuICAgICAgdHJhbnNjZWl2ZXIubG9jYWxDYXBhYmlsaXRpZXMgPSBsb2NhbENhcGFiaWxpdGllcztcbiAgICAgIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnMgPSBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzO1xuICAgIH0pO1xuXG4gICAgLy8gYWx3YXlzIG9mZmVyIEJVTkRMRSBhbmQgZGlzcG9zZSBvbiByZXR1cm4gaWYgbm90IHN1cHBvcnRlZC5cbiAgICBpZiAocGMuX2NvbmZpZy5idW5kbGVQb2xpY3kgIT09ICdtYXgtY29tcGF0Jykge1xuICAgICAgc2RwICs9ICdhPWdyb3VwOkJVTkRMRSAnICsgcGMudHJhbnNjZWl2ZXJzLm1hcChmdW5jdGlvbih0KSB7XG4gICAgICAgIHJldHVybiB0Lm1pZDtcbiAgICAgIH0pLmpvaW4oJyAnKSArICdcXHJcXG4nO1xuICAgIH1cbiAgICBzZHAgKz0gJ2E9aWNlLW9wdGlvbnM6dHJpY2tsZVxcclxcbic7XG5cbiAgICBwYy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlciwgc2RwTUxpbmVJbmRleCkge1xuICAgICAgc2RwICs9IHdyaXRlTWVkaWFTZWN0aW9uKHRyYW5zY2VpdmVyLCB0cmFuc2NlaXZlci5sb2NhbENhcGFiaWxpdGllcyxcbiAgICAgICAgICAnb2ZmZXInLCB0cmFuc2NlaXZlci5zdHJlYW0sIHBjLl9kdGxzUm9sZSk7XG4gICAgICBzZHAgKz0gJ2E9cnRjcC1yc2l6ZVxcclxcbic7XG5cbiAgICAgIGlmICh0cmFuc2NlaXZlci5pY2VHYXRoZXJlciAmJiBwYy5pY2VHYXRoZXJpbmdTdGF0ZSAhPT0gJ25ldycgJiZcbiAgICAgICAgICAoc2RwTUxpbmVJbmRleCA9PT0gMCB8fCAhcGMudXNpbmdCdW5kbGUpKSB7XG4gICAgICAgIHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyLmdldExvY2FsQ2FuZGlkYXRlcygpLmZvckVhY2goZnVuY3Rpb24oY2FuZCkge1xuICAgICAgICAgIGNhbmQuY29tcG9uZW50ID0gMTtcbiAgICAgICAgICBzZHAgKz0gJ2E9JyArIFNEUFV0aWxzLndyaXRlQ2FuZGlkYXRlKGNhbmQpICsgJ1xcclxcbic7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0cmFuc2NlaXZlci5pY2VHYXRoZXJlci5zdGF0ZSA9PT0gJ2NvbXBsZXRlZCcpIHtcbiAgICAgICAgICBzZHAgKz0gJ2E9ZW5kLW9mLWNhbmRpZGF0ZXNcXHJcXG4nO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB2YXIgZGVzYyA9IG5ldyB3aW5kb3cuUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKHtcbiAgICAgIHR5cGU6ICdvZmZlcicsXG4gICAgICBzZHA6IHNkcFxuICAgIH0pO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZGVzYyk7XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmNyZWF0ZUFuc3dlciA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBwYyA9IHRoaXM7XG5cbiAgICBpZiAocGMuX2lzQ2xvc2VkKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobWFrZUVycm9yKCdJbnZhbGlkU3RhdGVFcnJvcicsXG4gICAgICAgICAgJ0NhbiBub3QgY2FsbCBjcmVhdGVBbnN3ZXIgYWZ0ZXIgY2xvc2UnKSk7XG4gICAgfVxuXG4gICAgaWYgKCEocGMuc2lnbmFsaW5nU3RhdGUgPT09ICdoYXZlLXJlbW90ZS1vZmZlcicgfHxcbiAgICAgICAgcGMuc2lnbmFsaW5nU3RhdGUgPT09ICdoYXZlLWxvY2FsLXByYW5zd2VyJykpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChtYWtlRXJyb3IoJ0ludmFsaWRTdGF0ZUVycm9yJyxcbiAgICAgICAgICAnQ2FuIG5vdCBjYWxsIGNyZWF0ZUFuc3dlciBpbiBzaWduYWxpbmdTdGF0ZSAnICsgcGMuc2lnbmFsaW5nU3RhdGUpKTtcbiAgICB9XG5cbiAgICB2YXIgc2RwID0gU0RQVXRpbHMud3JpdGVTZXNzaW9uQm9pbGVycGxhdGUocGMuX3NkcFNlc3Npb25JZCxcbiAgICAgICAgcGMuX3NkcFNlc3Npb25WZXJzaW9uKyspO1xuICAgIGlmIChwYy51c2luZ0J1bmRsZSkge1xuICAgICAgc2RwICs9ICdhPWdyb3VwOkJVTkRMRSAnICsgcGMudHJhbnNjZWl2ZXJzLm1hcChmdW5jdGlvbih0KSB7XG4gICAgICAgIHJldHVybiB0Lm1pZDtcbiAgICAgIH0pLmpvaW4oJyAnKSArICdcXHJcXG4nO1xuICAgIH1cbiAgICB2YXIgbWVkaWFTZWN0aW9uc0luT2ZmZXIgPSBTRFBVdGlscy5nZXRNZWRpYVNlY3Rpb25zKFxuICAgICAgICBwYy5yZW1vdGVEZXNjcmlwdGlvbi5zZHApLmxlbmd0aDtcbiAgICBwYy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlciwgc2RwTUxpbmVJbmRleCkge1xuICAgICAgaWYgKHNkcE1MaW5lSW5kZXggKyAxID4gbWVkaWFTZWN0aW9uc0luT2ZmZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHRyYW5zY2VpdmVyLnJlamVjdGVkKSB7XG4gICAgICAgIGlmICh0cmFuc2NlaXZlci5raW5kID09PSAnYXBwbGljYXRpb24nKSB7XG4gICAgICAgICAgc2RwICs9ICdtPWFwcGxpY2F0aW9uIDAgRFRMUy9TQ1RQIDUwMDBcXHJcXG4nO1xuICAgICAgICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLmtpbmQgPT09ICdhdWRpbycpIHtcbiAgICAgICAgICBzZHAgKz0gJ209YXVkaW8gMCBVRFAvVExTL1JUUC9TQVZQRiAwXFxyXFxuJyArXG4gICAgICAgICAgICAgICdhPXJ0cG1hcDowIFBDTVUvODAwMFxcclxcbic7XG4gICAgICAgIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIua2luZCA9PT0gJ3ZpZGVvJykge1xuICAgICAgICAgIHNkcCArPSAnbT12aWRlbyAwIFVEUC9UTFMvUlRQL1NBVlBGIDEyMFxcclxcbicgK1xuICAgICAgICAgICAgICAnYT1ydHBtYXA6MTIwIFZQOC85MDAwMFxcclxcbic7XG4gICAgICAgIH1cbiAgICAgICAgc2RwICs9ICdjPUlOIElQNCAwLjAuMC4wXFxyXFxuJyArXG4gICAgICAgICAgICAnYT1pbmFjdGl2ZVxcclxcbicgK1xuICAgICAgICAgICAgJ2E9bWlkOicgKyB0cmFuc2NlaXZlci5taWQgKyAnXFxyXFxuJztcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBGSVhNRTogbG9vayBhdCBkaXJlY3Rpb24uXG4gICAgICBpZiAodHJhbnNjZWl2ZXIuc3RyZWFtKSB7XG4gICAgICAgIHZhciBsb2NhbFRyYWNrO1xuICAgICAgICBpZiAodHJhbnNjZWl2ZXIua2luZCA9PT0gJ2F1ZGlvJykge1xuICAgICAgICAgIGxvY2FsVHJhY2sgPSB0cmFuc2NlaXZlci5zdHJlYW0uZ2V0QXVkaW9UcmFja3MoKVswXTtcbiAgICAgICAgfSBlbHNlIGlmICh0cmFuc2NlaXZlci5raW5kID09PSAndmlkZW8nKSB7XG4gICAgICAgICAgbG9jYWxUcmFjayA9IHRyYW5zY2VpdmVyLnN0cmVhbS5nZXRWaWRlb1RyYWNrcygpWzBdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsb2NhbFRyYWNrKSB7XG4gICAgICAgICAgLy8gYWRkIFJUWFxuICAgICAgICAgIGlmIChlZGdlVmVyc2lvbiA+PSAxNTAxOSAmJiB0cmFuc2NlaXZlci5raW5kID09PSAndmlkZW8nICYmXG4gICAgICAgICAgICAgICF0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCkge1xuICAgICAgICAgICAgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHggPSB7XG4gICAgICAgICAgICAgIHNzcmM6IHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYyArIDFcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIENhbGN1bGF0ZSBpbnRlcnNlY3Rpb24gb2YgY2FwYWJpbGl0aWVzLlxuICAgICAgdmFyIGNvbW1vbkNhcGFiaWxpdGllcyA9IGdldENvbW1vbkNhcGFiaWxpdGllcyhcbiAgICAgICAgICB0cmFuc2NlaXZlci5sb2NhbENhcGFiaWxpdGllcyxcbiAgICAgICAgICB0cmFuc2NlaXZlci5yZW1vdGVDYXBhYmlsaXRpZXMpO1xuXG4gICAgICB2YXIgaGFzUnR4ID0gY29tbW9uQ2FwYWJpbGl0aWVzLmNvZGVjcy5maWx0ZXIoZnVuY3Rpb24oYykge1xuICAgICAgICByZXR1cm4gYy5uYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdydHgnO1xuICAgICAgfSkubGVuZ3RoO1xuICAgICAgaWYgKCFoYXNSdHggJiYgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHgpIHtcbiAgICAgICAgZGVsZXRlIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4O1xuICAgICAgfVxuXG4gICAgICBzZHAgKz0gd3JpdGVNZWRpYVNlY3Rpb24odHJhbnNjZWl2ZXIsIGNvbW1vbkNhcGFiaWxpdGllcyxcbiAgICAgICAgICAnYW5zd2VyJywgdHJhbnNjZWl2ZXIuc3RyZWFtLCBwYy5fZHRsc1JvbGUpO1xuICAgICAgaWYgKHRyYW5zY2VpdmVyLnJ0Y3BQYXJhbWV0ZXJzICYmXG4gICAgICAgICAgdHJhbnNjZWl2ZXIucnRjcFBhcmFtZXRlcnMucmVkdWNlZFNpemUpIHtcbiAgICAgICAgc2RwICs9ICdhPXJ0Y3AtcnNpemVcXHJcXG4nO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIGRlc2MgPSBuZXcgd2luZG93LlJUQ1Nlc3Npb25EZXNjcmlwdGlvbih7XG4gICAgICB0eXBlOiAnYW5zd2VyJyxcbiAgICAgIHNkcDogc2RwXG4gICAgfSk7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShkZXNjKTtcbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkSWNlQ2FuZGlkYXRlID0gZnVuY3Rpb24oY2FuZGlkYXRlKSB7XG4gICAgdmFyIHBjID0gdGhpcztcbiAgICB2YXIgc2VjdGlvbnM7XG4gICAgaWYgKGNhbmRpZGF0ZSAmJiAhKGNhbmRpZGF0ZS5zZHBNTGluZUluZGV4ICE9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgY2FuZGlkYXRlLnNkcE1pZCkpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgVHlwZUVycm9yKCdzZHBNTGluZUluZGV4IG9yIHNkcE1pZCByZXF1aXJlZCcpKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBuZWVkcyB0byBnbyBpbnRvIG9wcyBxdWV1ZS5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBpZiAoIXBjLnJlbW90ZURlc2NyaXB0aW9uKSB7XG4gICAgICAgIHJldHVybiByZWplY3QobWFrZUVycm9yKCdJbnZhbGlkU3RhdGVFcnJvcicsXG4gICAgICAgICAgICAnQ2FuIG5vdCBhZGQgSUNFIGNhbmRpZGF0ZSB3aXRob3V0IGEgcmVtb3RlIGRlc2NyaXB0aW9uJykpO1xuICAgICAgfSBlbHNlIGlmICghY2FuZGlkYXRlIHx8IGNhbmRpZGF0ZS5jYW5kaWRhdGUgPT09ICcnKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcGMudHJhbnNjZWl2ZXJzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgaWYgKHBjLnRyYW5zY2VpdmVyc1tqXS5yZWplY3RlZCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1tqXS5pY2VUcmFuc3BvcnQuYWRkUmVtb3RlQ2FuZGlkYXRlKHt9KTtcbiAgICAgICAgICBzZWN0aW9ucyA9IFNEUFV0aWxzLmdldE1lZGlhU2VjdGlvbnMocGMucmVtb3RlRGVzY3JpcHRpb24uc2RwKTtcbiAgICAgICAgICBzZWN0aW9uc1tqXSArPSAnYT1lbmQtb2YtY2FuZGlkYXRlc1xcclxcbic7XG4gICAgICAgICAgcGMucmVtb3RlRGVzY3JpcHRpb24uc2RwID1cbiAgICAgICAgICAgICAgU0RQVXRpbHMuZ2V0RGVzY3JpcHRpb24ocGMucmVtb3RlRGVzY3JpcHRpb24uc2RwKSArXG4gICAgICAgICAgICAgIHNlY3Rpb25zLmpvaW4oJycpO1xuICAgICAgICAgIGlmIChwYy51c2luZ0J1bmRsZSkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgc2RwTUxpbmVJbmRleCA9IGNhbmRpZGF0ZS5zZHBNTGluZUluZGV4O1xuICAgICAgICBpZiAoY2FuZGlkYXRlLnNkcE1pZCkge1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGMudHJhbnNjZWl2ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocGMudHJhbnNjZWl2ZXJzW2ldLm1pZCA9PT0gY2FuZGlkYXRlLnNkcE1pZCkge1xuICAgICAgICAgICAgICBzZHBNTGluZUluZGV4ID0gaTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciB0cmFuc2NlaXZlciA9IHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XTtcbiAgICAgICAgaWYgKHRyYW5zY2VpdmVyKSB7XG4gICAgICAgICAgaWYgKHRyYW5zY2VpdmVyLnJlamVjdGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgY2FuZCA9IE9iamVjdC5rZXlzKGNhbmRpZGF0ZS5jYW5kaWRhdGUpLmxlbmd0aCA+IDAgP1xuICAgICAgICAgICAgICBTRFBVdGlscy5wYXJzZUNhbmRpZGF0ZShjYW5kaWRhdGUuY2FuZGlkYXRlKSA6IHt9O1xuICAgICAgICAgIC8vIElnbm9yZSBDaHJvbWUncyBpbnZhbGlkIGNhbmRpZGF0ZXMgc2luY2UgRWRnZSBkb2VzIG5vdCBsaWtlIHRoZW0uXG4gICAgICAgICAgaWYgKGNhbmQucHJvdG9jb2wgPT09ICd0Y3AnICYmIChjYW5kLnBvcnQgPT09IDAgfHwgY2FuZC5wb3J0ID09PSA5KSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gSWdub3JlIFJUQ1AgY2FuZGlkYXRlcywgd2UgYXNzdW1lIFJUQ1AtTVVYLlxuICAgICAgICAgIGlmIChjYW5kLmNvbXBvbmVudCAmJiBjYW5kLmNvbXBvbmVudCAhPT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gd2hlbiB1c2luZyBidW5kbGUsIGF2b2lkIGFkZGluZyBjYW5kaWRhdGVzIHRvIHRoZSB3cm9uZ1xuICAgICAgICAgIC8vIGljZSB0cmFuc3BvcnQuIEFuZCBhdm9pZCBhZGRpbmcgY2FuZGlkYXRlcyBhZGRlZCBpbiB0aGUgU0RQLlxuICAgICAgICAgIGlmIChzZHBNTGluZUluZGV4ID09PSAwIHx8IChzZHBNTGluZUluZGV4ID4gMCAmJlxuICAgICAgICAgICAgICB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQgIT09IHBjLnRyYW5zY2VpdmVyc1swXS5pY2VUcmFuc3BvcnQpKSB7XG4gICAgICAgICAgICBpZiAoIW1heWJlQWRkQ2FuZGlkYXRlKHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydCwgY2FuZCkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChtYWtlRXJyb3IoJ09wZXJhdGlvbkVycm9yJyxcbiAgICAgICAgICAgICAgICAgICdDYW4gbm90IGFkZCBJQ0UgY2FuZGlkYXRlJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgcmVtb3RlRGVzY3JpcHRpb24uXG4gICAgICAgICAgdmFyIGNhbmRpZGF0ZVN0cmluZyA9IGNhbmRpZGF0ZS5jYW5kaWRhdGUudHJpbSgpO1xuICAgICAgICAgIGlmIChjYW5kaWRhdGVTdHJpbmcuaW5kZXhPZignYT0nKSA9PT0gMCkge1xuICAgICAgICAgICAgY2FuZGlkYXRlU3RyaW5nID0gY2FuZGlkYXRlU3RyaW5nLnN1YnN0cigyKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2VjdGlvbnMgPSBTRFBVdGlscy5nZXRNZWRpYVNlY3Rpb25zKHBjLnJlbW90ZURlc2NyaXB0aW9uLnNkcCk7XG4gICAgICAgICAgc2VjdGlvbnNbc2RwTUxpbmVJbmRleF0gKz0gJ2E9JyArXG4gICAgICAgICAgICAgIChjYW5kLnR5cGUgPyBjYW5kaWRhdGVTdHJpbmcgOiAnZW5kLW9mLWNhbmRpZGF0ZXMnKVxuICAgICAgICAgICAgICArICdcXHJcXG4nO1xuICAgICAgICAgIHBjLnJlbW90ZURlc2NyaXB0aW9uLnNkcCA9XG4gICAgICAgICAgICAgIFNEUFV0aWxzLmdldERlc2NyaXB0aW9uKHBjLnJlbW90ZURlc2NyaXB0aW9uLnNkcCkgK1xuICAgICAgICAgICAgICBzZWN0aW9ucy5qb2luKCcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0KG1ha2VFcnJvcignT3BlcmF0aW9uRXJyb3InLFxuICAgICAgICAgICAgICAnQ2FuIG5vdCBhZGQgSUNFIGNhbmRpZGF0ZScpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTdGF0cyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBwcm9taXNlcyA9IFtdO1xuICAgIHRoaXMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcbiAgICAgIFsncnRwU2VuZGVyJywgJ3J0cFJlY2VpdmVyJywgJ2ljZUdhdGhlcmVyJywgJ2ljZVRyYW5zcG9ydCcsXG4gICAgICAgICAgJ2R0bHNUcmFuc3BvcnQnXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgICAgICAgaWYgKHRyYW5zY2VpdmVyW21ldGhvZF0pIHtcbiAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaCh0cmFuc2NlaXZlclttZXRob2RdLmdldFN0YXRzKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgIH0pO1xuICAgIHZhciBmaXhTdGF0c1R5cGUgPSBmdW5jdGlvbihzdGF0KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpbmJvdW5kcnRwOiAnaW5ib3VuZC1ydHAnLFxuICAgICAgICBvdXRib3VuZHJ0cDogJ291dGJvdW5kLXJ0cCcsXG4gICAgICAgIGNhbmRpZGF0ZXBhaXI6ICdjYW5kaWRhdGUtcGFpcicsXG4gICAgICAgIGxvY2FsY2FuZGlkYXRlOiAnbG9jYWwtY2FuZGlkYXRlJyxcbiAgICAgICAgcmVtb3RlY2FuZGlkYXRlOiAncmVtb3RlLWNhbmRpZGF0ZSdcbiAgICAgIH1bc3RhdC50eXBlXSB8fCBzdGF0LnR5cGU7XG4gICAgfTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuICAgICAgLy8gc2hpbSBnZXRTdGF0cyB3aXRoIG1hcGxpa2Ugc3VwcG9ydFxuICAgICAgdmFyIHJlc3VsdHMgPSBuZXcgTWFwKCk7XG4gICAgICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgcmVzLmZvckVhY2goZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgT2JqZWN0LmtleXMocmVzdWx0KS5mb3JFYWNoKGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgICAgICByZXN1bHRbaWRdLnR5cGUgPSBmaXhTdGF0c1R5cGUocmVzdWx0W2lkXSk7XG4gICAgICAgICAgICByZXN1bHRzLnNldChpZCwgcmVzdWx0W2lkXSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXNvbHZlKHJlc3VsdHMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gbGVnYWN5IGNhbGxiYWNrIHNoaW1zLiBTaG91bGQgYmUgbW92ZWQgdG8gYWRhcHRlci5qcyBzb21lIGRheXMuXG4gIHZhciBtZXRob2RzID0gWydjcmVhdGVPZmZlcicsICdjcmVhdGVBbnN3ZXInXTtcbiAgbWV0aG9kcy5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgIHZhciBuYXRpdmVNZXRob2QgPSBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXTtcbiAgICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICBpZiAodHlwZW9mIGFyZ3NbMF0gPT09ICdmdW5jdGlvbicgfHxcbiAgICAgICAgICB0eXBlb2YgYXJnc1sxXSA9PT0gJ2Z1bmN0aW9uJykgeyAvLyBsZWdhY3lcbiAgICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseSh0aGlzLCBbYXJndW1lbnRzWzJdXSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oZGVzY3JpcHRpb24pIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGFyZ3NbMF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGFyZ3NbMF0uYXBwbHkobnVsbCwgW2Rlc2NyaXB0aW9uXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgIGlmICh0eXBlb2YgYXJnc1sxXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgYXJnc1sxXS5hcHBseShudWxsLCBbZXJyb3JdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH0pO1xuXG4gIG1ldGhvZHMgPSBbJ3NldExvY2FsRGVzY3JpcHRpb24nLCAnc2V0UmVtb3RlRGVzY3JpcHRpb24nLCAnYWRkSWNlQ2FuZGlkYXRlJ107XG4gIG1ldGhvZHMuZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICB2YXIgbmF0aXZlTWV0aG9kID0gUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF07XG4gICAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgaWYgKHR5cGVvZiBhcmdzWzFdID09PSAnZnVuY3Rpb24nIHx8XG4gICAgICAgICAgdHlwZW9mIGFyZ3NbMl0gPT09ICdmdW5jdGlvbicpIHsgLy8gbGVnYWN5XG4gICAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGFyZ3NbMV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGFyZ3NbMV0uYXBwbHkobnVsbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgIGlmICh0eXBlb2YgYXJnc1syXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgYXJnc1syXS5hcHBseShudWxsLCBbZXJyb3JdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH0pO1xuXG4gIC8vIGdldFN0YXRzIGlzIHNwZWNpYWwuIEl0IGRvZXNuJ3QgaGF2ZSBhIHNwZWMgbGVnYWN5IG1ldGhvZCB5ZXQgd2Ugc3VwcG9ydFxuICAvLyBnZXRTdGF0cyhzb21ldGhpbmcsIGNiKSB3aXRob3V0IGVycm9yIGNhbGxiYWNrcy5cbiAgWydnZXRTdGF0cyddLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgdmFyIG5hdGl2ZU1ldGhvZCA9IFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdO1xuICAgIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIGlmICh0eXBlb2YgYXJnc1sxXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBhcmdzWzFdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBhcmdzWzFdLmFwcGx5KG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfSk7XG5cbiAgcmV0dXJuIFJUQ1BlZXJDb25uZWN0aW9uO1xufTtcblxufSx7XCJzZHBcIjoyfV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4gLyogZXNsaW50LWVudiBub2RlICovXG4ndXNlIHN0cmljdCc7XG5cbi8vIFNEUCBoZWxwZXJzLlxudmFyIFNEUFV0aWxzID0ge307XG5cbi8vIEdlbmVyYXRlIGFuIGFscGhhbnVtZXJpYyBpZGVudGlmaWVyIGZvciBjbmFtZSBvciBtaWRzLlxuLy8gVE9ETzogdXNlIFVVSURzIGluc3RlYWQ/IGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2plZC85ODI4ODNcblNEUFV0aWxzLmdlbmVyYXRlSWRlbnRpZmllciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsIDEwKTtcbn07XG5cbi8vIFRoZSBSVENQIENOQU1FIHVzZWQgYnkgYWxsIHBlZXJjb25uZWN0aW9ucyBmcm9tIHRoZSBzYW1lIEpTLlxuU0RQVXRpbHMubG9jYWxDTmFtZSA9IFNEUFV0aWxzLmdlbmVyYXRlSWRlbnRpZmllcigpO1xuXG4vLyBTcGxpdHMgU0RQIGludG8gbGluZXMsIGRlYWxpbmcgd2l0aCBib3RoIENSTEYgYW5kIExGLlxuU0RQVXRpbHMuc3BsaXRMaW5lcyA9IGZ1bmN0aW9uKGJsb2IpIHtcbiAgcmV0dXJuIGJsb2IudHJpbSgpLnNwbGl0KCdcXG4nKS5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgIHJldHVybiBsaW5lLnRyaW0oKTtcbiAgfSk7XG59O1xuLy8gU3BsaXRzIFNEUCBpbnRvIHNlc3Npb25wYXJ0IGFuZCBtZWRpYXNlY3Rpb25zLiBFbnN1cmVzIENSTEYuXG5TRFBVdGlscy5zcGxpdFNlY3Rpb25zID0gZnVuY3Rpb24oYmxvYikge1xuICB2YXIgcGFydHMgPSBibG9iLnNwbGl0KCdcXG5tPScpO1xuICByZXR1cm4gcGFydHMubWFwKGZ1bmN0aW9uKHBhcnQsIGluZGV4KSB7XG4gICAgcmV0dXJuIChpbmRleCA+IDAgPyAnbT0nICsgcGFydCA6IHBhcnQpLnRyaW0oKSArICdcXHJcXG4nO1xuICB9KTtcbn07XG5cbi8vIHJldHVybnMgdGhlIHNlc3Npb24gZGVzY3JpcHRpb24uXG5TRFBVdGlscy5nZXREZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKGJsb2IpIHtcbiAgdmFyIHNlY3Rpb25zID0gU0RQVXRpbHMuc3BsaXRTZWN0aW9ucyhibG9iKTtcbiAgcmV0dXJuIHNlY3Rpb25zICYmIHNlY3Rpb25zWzBdO1xufTtcblxuLy8gcmV0dXJucyB0aGUgaW5kaXZpZHVhbCBtZWRpYSBzZWN0aW9ucy5cblNEUFV0aWxzLmdldE1lZGlhU2VjdGlvbnMgPSBmdW5jdGlvbihibG9iKSB7XG4gIHZhciBzZWN0aW9ucyA9IFNEUFV0aWxzLnNwbGl0U2VjdGlvbnMoYmxvYik7XG4gIHNlY3Rpb25zLnNoaWZ0KCk7XG4gIHJldHVybiBzZWN0aW9ucztcbn07XG5cbi8vIFJldHVybnMgbGluZXMgdGhhdCBzdGFydCB3aXRoIGEgY2VydGFpbiBwcmVmaXguXG5TRFBVdGlscy5tYXRjaFByZWZpeCA9IGZ1bmN0aW9uKGJsb2IsIHByZWZpeCkge1xuICByZXR1cm4gU0RQVXRpbHMuc3BsaXRMaW5lcyhibG9iKS5maWx0ZXIoZnVuY3Rpb24obGluZSkge1xuICAgIHJldHVybiBsaW5lLmluZGV4T2YocHJlZml4KSA9PT0gMDtcbiAgfSk7XG59O1xuXG4vLyBQYXJzZXMgYW4gSUNFIGNhbmRpZGF0ZSBsaW5lLiBTYW1wbGUgaW5wdXQ6XG4vLyBjYW5kaWRhdGU6NzAyNzg2MzUwIDIgdWRwIDQxODE5OTAyIDguOC44LjggNjA3NjkgdHlwIHJlbGF5IHJhZGRyIDguOC44Ljhcbi8vIHJwb3J0IDU1OTk2XCJcblNEUFV0aWxzLnBhcnNlQ2FuZGlkYXRlID0gZnVuY3Rpb24obGluZSkge1xuICB2YXIgcGFydHM7XG4gIC8vIFBhcnNlIGJvdGggdmFyaWFudHMuXG4gIGlmIChsaW5lLmluZGV4T2YoJ2E9Y2FuZGlkYXRlOicpID09PSAwKSB7XG4gICAgcGFydHMgPSBsaW5lLnN1YnN0cmluZygxMikuc3BsaXQoJyAnKTtcbiAgfSBlbHNlIHtcbiAgICBwYXJ0cyA9IGxpbmUuc3Vic3RyaW5nKDEwKS5zcGxpdCgnICcpO1xuICB9XG5cbiAgdmFyIGNhbmRpZGF0ZSA9IHtcbiAgICBmb3VuZGF0aW9uOiBwYXJ0c1swXSxcbiAgICBjb21wb25lbnQ6IHBhcnNlSW50KHBhcnRzWzFdLCAxMCksXG4gICAgcHJvdG9jb2w6IHBhcnRzWzJdLnRvTG93ZXJDYXNlKCksXG4gICAgcHJpb3JpdHk6IHBhcnNlSW50KHBhcnRzWzNdLCAxMCksXG4gICAgaXA6IHBhcnRzWzRdLFxuICAgIHBvcnQ6IHBhcnNlSW50KHBhcnRzWzVdLCAxMCksXG4gICAgLy8gc2tpcCBwYXJ0c1s2XSA9PSAndHlwJ1xuICAgIHR5cGU6IHBhcnRzWzddXG4gIH07XG5cbiAgZm9yICh2YXIgaSA9IDg7IGkgPCBwYXJ0cy5sZW5ndGg7IGkgKz0gMikge1xuICAgIHN3aXRjaCAocGFydHNbaV0pIHtcbiAgICAgIGNhc2UgJ3JhZGRyJzpcbiAgICAgICAgY2FuZGlkYXRlLnJlbGF0ZWRBZGRyZXNzID0gcGFydHNbaSArIDFdO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3Jwb3J0JzpcbiAgICAgICAgY2FuZGlkYXRlLnJlbGF0ZWRQb3J0ID0gcGFyc2VJbnQocGFydHNbaSArIDFdLCAxMCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndGNwdHlwZSc6XG4gICAgICAgIGNhbmRpZGF0ZS50Y3BUeXBlID0gcGFydHNbaSArIDFdO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3VmcmFnJzpcbiAgICAgICAgY2FuZGlkYXRlLnVmcmFnID0gcGFydHNbaSArIDFdOyAvLyBmb3IgYmFja3dhcmQgY29tcGFiaWxpdHkuXG4gICAgICAgIGNhbmRpZGF0ZS51c2VybmFtZUZyYWdtZW50ID0gcGFydHNbaSArIDFdO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6IC8vIGV4dGVuc2lvbiBoYW5kbGluZywgaW4gcGFydGljdWxhciB1ZnJhZ1xuICAgICAgICBjYW5kaWRhdGVbcGFydHNbaV1dID0gcGFydHNbaSArIDFdO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNhbmRpZGF0ZTtcbn07XG5cbi8vIFRyYW5zbGF0ZXMgYSBjYW5kaWRhdGUgb2JqZWN0IGludG8gU0RQIGNhbmRpZGF0ZSBhdHRyaWJ1dGUuXG5TRFBVdGlscy53cml0ZUNhbmRpZGF0ZSA9IGZ1bmN0aW9uKGNhbmRpZGF0ZSkge1xuICB2YXIgc2RwID0gW107XG4gIHNkcC5wdXNoKGNhbmRpZGF0ZS5mb3VuZGF0aW9uKTtcbiAgc2RwLnB1c2goY2FuZGlkYXRlLmNvbXBvbmVudCk7XG4gIHNkcC5wdXNoKGNhbmRpZGF0ZS5wcm90b2NvbC50b1VwcGVyQ2FzZSgpKTtcbiAgc2RwLnB1c2goY2FuZGlkYXRlLnByaW9yaXR5KTtcbiAgc2RwLnB1c2goY2FuZGlkYXRlLmlwKTtcbiAgc2RwLnB1c2goY2FuZGlkYXRlLnBvcnQpO1xuXG4gIHZhciB0eXBlID0gY2FuZGlkYXRlLnR5cGU7XG4gIHNkcC5wdXNoKCd0eXAnKTtcbiAgc2RwLnB1c2godHlwZSk7XG4gIGlmICh0eXBlICE9PSAnaG9zdCcgJiYgY2FuZGlkYXRlLnJlbGF0ZWRBZGRyZXNzICYmXG4gICAgICBjYW5kaWRhdGUucmVsYXRlZFBvcnQpIHtcbiAgICBzZHAucHVzaCgncmFkZHInKTtcbiAgICBzZHAucHVzaChjYW5kaWRhdGUucmVsYXRlZEFkZHJlc3MpOyAvLyB3YXM6IHJlbEFkZHJcbiAgICBzZHAucHVzaCgncnBvcnQnKTtcbiAgICBzZHAucHVzaChjYW5kaWRhdGUucmVsYXRlZFBvcnQpOyAvLyB3YXM6IHJlbFBvcnRcbiAgfVxuICBpZiAoY2FuZGlkYXRlLnRjcFR5cGUgJiYgY2FuZGlkYXRlLnByb3RvY29sLnRvTG93ZXJDYXNlKCkgPT09ICd0Y3AnKSB7XG4gICAgc2RwLnB1c2goJ3RjcHR5cGUnKTtcbiAgICBzZHAucHVzaChjYW5kaWRhdGUudGNwVHlwZSk7XG4gIH1cbiAgaWYgKGNhbmRpZGF0ZS51c2VybmFtZUZyYWdtZW50IHx8IGNhbmRpZGF0ZS51ZnJhZykge1xuICAgIHNkcC5wdXNoKCd1ZnJhZycpO1xuICAgIHNkcC5wdXNoKGNhbmRpZGF0ZS51c2VybmFtZUZyYWdtZW50IHx8IGNhbmRpZGF0ZS51ZnJhZyk7XG4gIH1cbiAgcmV0dXJuICdjYW5kaWRhdGU6JyArIHNkcC5qb2luKCcgJyk7XG59O1xuXG4vLyBQYXJzZXMgYW4gaWNlLW9wdGlvbnMgbGluZSwgcmV0dXJucyBhbiBhcnJheSBvZiBvcHRpb24gdGFncy5cbi8vIGE9aWNlLW9wdGlvbnM6Zm9vIGJhclxuU0RQVXRpbHMucGFyc2VJY2VPcHRpb25zID0gZnVuY3Rpb24obGluZSkge1xuICByZXR1cm4gbGluZS5zdWJzdHIoMTQpLnNwbGl0KCcgJyk7XG59XG5cbi8vIFBhcnNlcyBhbiBydHBtYXAgbGluZSwgcmV0dXJucyBSVENSdHBDb2RkZWNQYXJhbWV0ZXJzLiBTYW1wbGUgaW5wdXQ6XG4vLyBhPXJ0cG1hcDoxMTEgb3B1cy80ODAwMC8yXG5TRFBVdGlscy5wYXJzZVJ0cE1hcCA9IGZ1bmN0aW9uKGxpbmUpIHtcbiAgdmFyIHBhcnRzID0gbGluZS5zdWJzdHIoOSkuc3BsaXQoJyAnKTtcbiAgdmFyIHBhcnNlZCA9IHtcbiAgICBwYXlsb2FkVHlwZTogcGFyc2VJbnQocGFydHMuc2hpZnQoKSwgMTApIC8vIHdhczogaWRcbiAgfTtcblxuICBwYXJ0cyA9IHBhcnRzWzBdLnNwbGl0KCcvJyk7XG5cbiAgcGFyc2VkLm5hbWUgPSBwYXJ0c1swXTtcbiAgcGFyc2VkLmNsb2NrUmF0ZSA9IHBhcnNlSW50KHBhcnRzWzFdLCAxMCk7IC8vIHdhczogY2xvY2tyYXRlXG4gIC8vIHdhczogY2hhbm5lbHNcbiAgcGFyc2VkLm51bUNoYW5uZWxzID0gcGFydHMubGVuZ3RoID09PSAzID8gcGFyc2VJbnQocGFydHNbMl0sIDEwKSA6IDE7XG4gIHJldHVybiBwYXJzZWQ7XG59O1xuXG4vLyBHZW5lcmF0ZSBhbiBhPXJ0cG1hcCBsaW5lIGZyb20gUlRDUnRwQ29kZWNDYXBhYmlsaXR5IG9yXG4vLyBSVENSdHBDb2RlY1BhcmFtZXRlcnMuXG5TRFBVdGlscy53cml0ZVJ0cE1hcCA9IGZ1bmN0aW9uKGNvZGVjKSB7XG4gIHZhciBwdCA9IGNvZGVjLnBheWxvYWRUeXBlO1xuICBpZiAoY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgIHB0ID0gY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGU7XG4gIH1cbiAgcmV0dXJuICdhPXJ0cG1hcDonICsgcHQgKyAnICcgKyBjb2RlYy5uYW1lICsgJy8nICsgY29kZWMuY2xvY2tSYXRlICtcbiAgICAgIChjb2RlYy5udW1DaGFubmVscyAhPT0gMSA/ICcvJyArIGNvZGVjLm51bUNoYW5uZWxzIDogJycpICsgJ1xcclxcbic7XG59O1xuXG4vLyBQYXJzZXMgYW4gYT1leHRtYXAgbGluZSAoaGVhZGVyZXh0ZW5zaW9uIGZyb20gUkZDIDUyODUpLiBTYW1wbGUgaW5wdXQ6XG4vLyBhPWV4dG1hcDoyIHVybjppZXRmOnBhcmFtczpydHAtaGRyZXh0OnRvZmZzZXRcbi8vIGE9ZXh0bWFwOjIvc2VuZG9ubHkgdXJuOmlldGY6cGFyYW1zOnJ0cC1oZHJleHQ6dG9mZnNldFxuU0RQVXRpbHMucGFyc2VFeHRtYXAgPSBmdW5jdGlvbihsaW5lKSB7XG4gIHZhciBwYXJ0cyA9IGxpbmUuc3Vic3RyKDkpLnNwbGl0KCcgJyk7XG4gIHJldHVybiB7XG4gICAgaWQ6IHBhcnNlSW50KHBhcnRzWzBdLCAxMCksXG4gICAgZGlyZWN0aW9uOiBwYXJ0c1swXS5pbmRleE9mKCcvJykgPiAwID8gcGFydHNbMF0uc3BsaXQoJy8nKVsxXSA6ICdzZW5kcmVjdicsXG4gICAgdXJpOiBwYXJ0c1sxXVxuICB9O1xufTtcblxuLy8gR2VuZXJhdGVzIGE9ZXh0bWFwIGxpbmUgZnJvbSBSVENSdHBIZWFkZXJFeHRlbnNpb25QYXJhbWV0ZXJzIG9yXG4vLyBSVENSdHBIZWFkZXJFeHRlbnNpb24uXG5TRFBVdGlscy53cml0ZUV4dG1hcCA9IGZ1bmN0aW9uKGhlYWRlckV4dGVuc2lvbikge1xuICByZXR1cm4gJ2E9ZXh0bWFwOicgKyAoaGVhZGVyRXh0ZW5zaW9uLmlkIHx8IGhlYWRlckV4dGVuc2lvbi5wcmVmZXJyZWRJZCkgK1xuICAgICAgKGhlYWRlckV4dGVuc2lvbi5kaXJlY3Rpb24gJiYgaGVhZGVyRXh0ZW5zaW9uLmRpcmVjdGlvbiAhPT0gJ3NlbmRyZWN2J1xuICAgICAgICAgID8gJy8nICsgaGVhZGVyRXh0ZW5zaW9uLmRpcmVjdGlvblxuICAgICAgICAgIDogJycpICtcbiAgICAgICcgJyArIGhlYWRlckV4dGVuc2lvbi51cmkgKyAnXFxyXFxuJztcbn07XG5cbi8vIFBhcnNlcyBhbiBmdG1wIGxpbmUsIHJldHVybnMgZGljdGlvbmFyeS4gU2FtcGxlIGlucHV0OlxuLy8gYT1mbXRwOjk2IHZicj1vbjtjbmc9b25cbi8vIEFsc28gZGVhbHMgd2l0aCB2YnI9b247IGNuZz1vblxuU0RQVXRpbHMucGFyc2VGbXRwID0gZnVuY3Rpb24obGluZSkge1xuICB2YXIgcGFyc2VkID0ge307XG4gIHZhciBrdjtcbiAgdmFyIHBhcnRzID0gbGluZS5zdWJzdHIobGluZS5pbmRleE9mKCcgJykgKyAxKS5zcGxpdCgnOycpO1xuICBmb3IgKHZhciBqID0gMDsgaiA8IHBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAga3YgPSBwYXJ0c1tqXS50cmltKCkuc3BsaXQoJz0nKTtcbiAgICBwYXJzZWRba3ZbMF0udHJpbSgpXSA9IGt2WzFdO1xuICB9XG4gIHJldHVybiBwYXJzZWQ7XG59O1xuXG4vLyBHZW5lcmF0ZXMgYW4gYT1mdG1wIGxpbmUgZnJvbSBSVENSdHBDb2RlY0NhcGFiaWxpdHkgb3IgUlRDUnRwQ29kZWNQYXJhbWV0ZXJzLlxuU0RQVXRpbHMud3JpdGVGbXRwID0gZnVuY3Rpb24oY29kZWMpIHtcbiAgdmFyIGxpbmUgPSAnJztcbiAgdmFyIHB0ID0gY29kZWMucGF5bG9hZFR5cGU7XG4gIGlmIChjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcHQgPSBjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZTtcbiAgfVxuICBpZiAoY29kZWMucGFyYW1ldGVycyAmJiBPYmplY3Qua2V5cyhjb2RlYy5wYXJhbWV0ZXJzKS5sZW5ndGgpIHtcbiAgICB2YXIgcGFyYW1zID0gW107XG4gICAgT2JqZWN0LmtleXMoY29kZWMucGFyYW1ldGVycykuZm9yRWFjaChmdW5jdGlvbihwYXJhbSkge1xuICAgICAgcGFyYW1zLnB1c2gocGFyYW0gKyAnPScgKyBjb2RlYy5wYXJhbWV0ZXJzW3BhcmFtXSk7XG4gICAgfSk7XG4gICAgbGluZSArPSAnYT1mbXRwOicgKyBwdCArICcgJyArIHBhcmFtcy5qb2luKCc7JykgKyAnXFxyXFxuJztcbiAgfVxuICByZXR1cm4gbGluZTtcbn07XG5cbi8vIFBhcnNlcyBhbiBydGNwLWZiIGxpbmUsIHJldHVybnMgUlRDUFJ0Y3BGZWVkYmFjayBvYmplY3QuIFNhbXBsZSBpbnB1dDpcbi8vIGE9cnRjcC1mYjo5OCBuYWNrIHJwc2lcblNEUFV0aWxzLnBhcnNlUnRjcEZiID0gZnVuY3Rpb24obGluZSkge1xuICB2YXIgcGFydHMgPSBsaW5lLnN1YnN0cihsaW5lLmluZGV4T2YoJyAnKSArIDEpLnNwbGl0KCcgJyk7XG4gIHJldHVybiB7XG4gICAgdHlwZTogcGFydHMuc2hpZnQoKSxcbiAgICBwYXJhbWV0ZXI6IHBhcnRzLmpvaW4oJyAnKVxuICB9O1xufTtcbi8vIEdlbmVyYXRlIGE9cnRjcC1mYiBsaW5lcyBmcm9tIFJUQ1J0cENvZGVjQ2FwYWJpbGl0eSBvciBSVENSdHBDb2RlY1BhcmFtZXRlcnMuXG5TRFBVdGlscy53cml0ZVJ0Y3BGYiA9IGZ1bmN0aW9uKGNvZGVjKSB7XG4gIHZhciBsaW5lcyA9ICcnO1xuICB2YXIgcHQgPSBjb2RlYy5wYXlsb2FkVHlwZTtcbiAgaWYgKGNvZGVjLnByZWZlcnJlZFBheWxvYWRUeXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICBwdCA9IGNvZGVjLnByZWZlcnJlZFBheWxvYWRUeXBlO1xuICB9XG4gIGlmIChjb2RlYy5ydGNwRmVlZGJhY2sgJiYgY29kZWMucnRjcEZlZWRiYWNrLmxlbmd0aCkge1xuICAgIC8vIEZJWE1FOiBzcGVjaWFsIGhhbmRsaW5nIGZvciB0cnItaW50P1xuICAgIGNvZGVjLnJ0Y3BGZWVkYmFjay5mb3JFYWNoKGZ1bmN0aW9uKGZiKSB7XG4gICAgICBsaW5lcyArPSAnYT1ydGNwLWZiOicgKyBwdCArICcgJyArIGZiLnR5cGUgK1xuICAgICAgKGZiLnBhcmFtZXRlciAmJiBmYi5wYXJhbWV0ZXIubGVuZ3RoID8gJyAnICsgZmIucGFyYW1ldGVyIDogJycpICtcbiAgICAgICAgICAnXFxyXFxuJztcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gbGluZXM7XG59O1xuXG4vLyBQYXJzZXMgYW4gUkZDIDU1NzYgc3NyYyBtZWRpYSBhdHRyaWJ1dGUuIFNhbXBsZSBpbnB1dDpcbi8vIGE9c3NyYzozNzM1OTI4NTU5IGNuYW1lOnNvbWV0aGluZ1xuU0RQVXRpbHMucGFyc2VTc3JjTWVkaWEgPSBmdW5jdGlvbihsaW5lKSB7XG4gIHZhciBzcCA9IGxpbmUuaW5kZXhPZignICcpO1xuICB2YXIgcGFydHMgPSB7XG4gICAgc3NyYzogcGFyc2VJbnQobGluZS5zdWJzdHIoNywgc3AgLSA3KSwgMTApXG4gIH07XG4gIHZhciBjb2xvbiA9IGxpbmUuaW5kZXhPZignOicsIHNwKTtcbiAgaWYgKGNvbG9uID4gLTEpIHtcbiAgICBwYXJ0cy5hdHRyaWJ1dGUgPSBsaW5lLnN1YnN0cihzcCArIDEsIGNvbG9uIC0gc3AgLSAxKTtcbiAgICBwYXJ0cy52YWx1ZSA9IGxpbmUuc3Vic3RyKGNvbG9uICsgMSk7XG4gIH0gZWxzZSB7XG4gICAgcGFydHMuYXR0cmlidXRlID0gbGluZS5zdWJzdHIoc3AgKyAxKTtcbiAgfVxuICByZXR1cm4gcGFydHM7XG59O1xuXG4vLyBFeHRyYWN0cyB0aGUgTUlEIChSRkMgNTg4OCkgZnJvbSBhIG1lZGlhIHNlY3Rpb24uXG4vLyByZXR1cm5zIHRoZSBNSUQgb3IgdW5kZWZpbmVkIGlmIG5vIG1pZCBsaW5lIHdhcyBmb3VuZC5cblNEUFV0aWxzLmdldE1pZCA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbikge1xuICB2YXIgbWlkID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1taWQ6JylbMF07XG4gIGlmIChtaWQpIHtcbiAgICByZXR1cm4gbWlkLnN1YnN0cig2KTtcbiAgfVxufVxuXG5TRFBVdGlscy5wYXJzZUZpbmdlcnByaW50ID0gZnVuY3Rpb24obGluZSkge1xuICB2YXIgcGFydHMgPSBsaW5lLnN1YnN0cigxNCkuc3BsaXQoJyAnKTtcbiAgcmV0dXJuIHtcbiAgICBhbGdvcml0aG06IHBhcnRzWzBdLnRvTG93ZXJDYXNlKCksIC8vIGFsZ29yaXRobSBpcyBjYXNlLXNlbnNpdGl2ZSBpbiBFZGdlLlxuICAgIHZhbHVlOiBwYXJ0c1sxXVxuICB9O1xufTtcblxuLy8gRXh0cmFjdHMgRFRMUyBwYXJhbWV0ZXJzIGZyb20gU0RQIG1lZGlhIHNlY3Rpb24gb3Igc2Vzc2lvbnBhcnQuXG4vLyBGSVhNRTogZm9yIGNvbnNpc3RlbmN5IHdpdGggb3RoZXIgZnVuY3Rpb25zIHRoaXMgc2hvdWxkIG9ubHlcbi8vICAgZ2V0IHRoZSBmaW5nZXJwcmludCBsaW5lIGFzIGlucHV0LiBTZWUgYWxzbyBnZXRJY2VQYXJhbWV0ZXJzLlxuU0RQVXRpbHMuZ2V0RHRsc1BhcmFtZXRlcnMgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24sIHNlc3Npb25wYXJ0KSB7XG4gIHZhciBsaW5lcyA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiArIHNlc3Npb25wYXJ0LFxuICAgICAgJ2E9ZmluZ2VycHJpbnQ6Jyk7XG4gIC8vIE5vdGU6IGE9c2V0dXAgbGluZSBpcyBpZ25vcmVkIHNpbmNlIHdlIHVzZSB0aGUgJ2F1dG8nIHJvbGUuXG4gIC8vIE5vdGUyOiAnYWxnb3JpdGhtJyBpcyBub3QgY2FzZSBzZW5zaXRpdmUgZXhjZXB0IGluIEVkZ2UuXG4gIHJldHVybiB7XG4gICAgcm9sZTogJ2F1dG8nLFxuICAgIGZpbmdlcnByaW50czogbGluZXMubWFwKFNEUFV0aWxzLnBhcnNlRmluZ2VycHJpbnQpXG4gIH07XG59O1xuXG4vLyBTZXJpYWxpemVzIERUTFMgcGFyYW1ldGVycyB0byBTRFAuXG5TRFBVdGlscy53cml0ZUR0bHNQYXJhbWV0ZXJzID0gZnVuY3Rpb24ocGFyYW1zLCBzZXR1cFR5cGUpIHtcbiAgdmFyIHNkcCA9ICdhPXNldHVwOicgKyBzZXR1cFR5cGUgKyAnXFxyXFxuJztcbiAgcGFyYW1zLmZpbmdlcnByaW50cy5mb3JFYWNoKGZ1bmN0aW9uKGZwKSB7XG4gICAgc2RwICs9ICdhPWZpbmdlcnByaW50OicgKyBmcC5hbGdvcml0aG0gKyAnICcgKyBmcC52YWx1ZSArICdcXHJcXG4nO1xuICB9KTtcbiAgcmV0dXJuIHNkcDtcbn07XG4vLyBQYXJzZXMgSUNFIGluZm9ybWF0aW9uIGZyb20gU0RQIG1lZGlhIHNlY3Rpb24gb3Igc2Vzc2lvbnBhcnQuXG4vLyBGSVhNRTogZm9yIGNvbnNpc3RlbmN5IHdpdGggb3RoZXIgZnVuY3Rpb25zIHRoaXMgc2hvdWxkIG9ubHlcbi8vICAgZ2V0IHRoZSBpY2UtdWZyYWcgYW5kIGljZS1wd2QgbGluZXMgYXMgaW5wdXQuXG5TRFBVdGlscy5nZXRJY2VQYXJhbWV0ZXJzID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uLCBzZXNzaW9ucGFydCkge1xuICB2YXIgbGluZXMgPSBTRFBVdGlscy5zcGxpdExpbmVzKG1lZGlhU2VjdGlvbik7XG4gIC8vIFNlYXJjaCBpbiBzZXNzaW9uIHBhcnQsIHRvby5cbiAgbGluZXMgPSBsaW5lcy5jb25jYXQoU0RQVXRpbHMuc3BsaXRMaW5lcyhzZXNzaW9ucGFydCkpO1xuICB2YXIgaWNlUGFyYW1ldGVycyA9IHtcbiAgICB1c2VybmFtZUZyYWdtZW50OiBsaW5lcy5maWx0ZXIoZnVuY3Rpb24obGluZSkge1xuICAgICAgcmV0dXJuIGxpbmUuaW5kZXhPZignYT1pY2UtdWZyYWc6JykgPT09IDA7XG4gICAgfSlbMF0uc3Vic3RyKDEyKSxcbiAgICBwYXNzd29yZDogbGluZXMuZmlsdGVyKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgIHJldHVybiBsaW5lLmluZGV4T2YoJ2E9aWNlLXB3ZDonKSA9PT0gMDtcbiAgICB9KVswXS5zdWJzdHIoMTApXG4gIH07XG4gIHJldHVybiBpY2VQYXJhbWV0ZXJzO1xufTtcblxuLy8gU2VyaWFsaXplcyBJQ0UgcGFyYW1ldGVycyB0byBTRFAuXG5TRFBVdGlscy53cml0ZUljZVBhcmFtZXRlcnMgPSBmdW5jdGlvbihwYXJhbXMpIHtcbiAgcmV0dXJuICdhPWljZS11ZnJhZzonICsgcGFyYW1zLnVzZXJuYW1lRnJhZ21lbnQgKyAnXFxyXFxuJyArXG4gICAgICAnYT1pY2UtcHdkOicgKyBwYXJhbXMucGFzc3dvcmQgKyAnXFxyXFxuJztcbn07XG5cbi8vIFBhcnNlcyB0aGUgU0RQIG1lZGlhIHNlY3Rpb24gYW5kIHJldHVybnMgUlRDUnRwUGFyYW1ldGVycy5cblNEUFV0aWxzLnBhcnNlUnRwUGFyYW1ldGVycyA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbikge1xuICB2YXIgZGVzY3JpcHRpb24gPSB7XG4gICAgY29kZWNzOiBbXSxcbiAgICBoZWFkZXJFeHRlbnNpb25zOiBbXSxcbiAgICBmZWNNZWNoYW5pc21zOiBbXSxcbiAgICBydGNwOiBbXVxuICB9O1xuICB2YXIgbGluZXMgPSBTRFBVdGlscy5zcGxpdExpbmVzKG1lZGlhU2VjdGlvbik7XG4gIHZhciBtbGluZSA9IGxpbmVzWzBdLnNwbGl0KCcgJyk7XG4gIGZvciAodmFyIGkgPSAzOyBpIDwgbWxpbmUubGVuZ3RoOyBpKyspIHsgLy8gZmluZCBhbGwgY29kZWNzIGZyb20gbWxpbmVbMy4uXVxuICAgIHZhciBwdCA9IG1saW5lW2ldO1xuICAgIHZhciBydHBtYXBsaW5lID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgoXG4gICAgICAgIG1lZGlhU2VjdGlvbiwgJ2E9cnRwbWFwOicgKyBwdCArICcgJylbMF07XG4gICAgaWYgKHJ0cG1hcGxpbmUpIHtcbiAgICAgIHZhciBjb2RlYyA9IFNEUFV0aWxzLnBhcnNlUnRwTWFwKHJ0cG1hcGxpbmUpO1xuICAgICAgdmFyIGZtdHBzID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgoXG4gICAgICAgICAgbWVkaWFTZWN0aW9uLCAnYT1mbXRwOicgKyBwdCArICcgJyk7XG4gICAgICAvLyBPbmx5IHRoZSBmaXJzdCBhPWZtdHA6PHB0PiBpcyBjb25zaWRlcmVkLlxuICAgICAgY29kZWMucGFyYW1ldGVycyA9IGZtdHBzLmxlbmd0aCA/IFNEUFV0aWxzLnBhcnNlRm10cChmbXRwc1swXSkgOiB7fTtcbiAgICAgIGNvZGVjLnJ0Y3BGZWVkYmFjayA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KFxuICAgICAgICAgIG1lZGlhU2VjdGlvbiwgJ2E9cnRjcC1mYjonICsgcHQgKyAnICcpXG4gICAgICAgIC5tYXAoU0RQVXRpbHMucGFyc2VSdGNwRmIpO1xuICAgICAgZGVzY3JpcHRpb24uY29kZWNzLnB1c2goY29kZWMpO1xuICAgICAgLy8gcGFyc2UgRkVDIG1lY2hhbmlzbXMgZnJvbSBydHBtYXAgbGluZXMuXG4gICAgICBzd2l0Y2ggKGNvZGVjLm5hbWUudG9VcHBlckNhc2UoKSkge1xuICAgICAgICBjYXNlICdSRUQnOlxuICAgICAgICBjYXNlICdVTFBGRUMnOlxuICAgICAgICAgIGRlc2NyaXB0aW9uLmZlY01lY2hhbmlzbXMucHVzaChjb2RlYy5uYW1lLnRvVXBwZXJDYXNlKCkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OiAvLyBvbmx5IFJFRCBhbmQgVUxQRkVDIGFyZSByZWNvZ25pemVkIGFzIEZFQyBtZWNoYW5pc21zLlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPWV4dG1hcDonKS5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICBkZXNjcmlwdGlvbi5oZWFkZXJFeHRlbnNpb25zLnB1c2goU0RQVXRpbHMucGFyc2VFeHRtYXAobGluZSkpO1xuICB9KTtcbiAgLy8gRklYTUU6IHBhcnNlIHJ0Y3AuXG4gIHJldHVybiBkZXNjcmlwdGlvbjtcbn07XG5cbi8vIEdlbmVyYXRlcyBwYXJ0cyBvZiB0aGUgU0RQIG1lZGlhIHNlY3Rpb24gZGVzY3JpYmluZyB0aGUgY2FwYWJpbGl0aWVzIC9cbi8vIHBhcmFtZXRlcnMuXG5TRFBVdGlscy53cml0ZVJ0cERlc2NyaXB0aW9uID0gZnVuY3Rpb24oa2luZCwgY2Fwcykge1xuICB2YXIgc2RwID0gJyc7XG5cbiAgLy8gQnVpbGQgdGhlIG1saW5lLlxuICBzZHAgKz0gJ209JyArIGtpbmQgKyAnICc7XG4gIHNkcCArPSBjYXBzLmNvZGVjcy5sZW5ndGggPiAwID8gJzknIDogJzAnOyAvLyByZWplY3QgaWYgbm8gY29kZWNzLlxuICBzZHAgKz0gJyBVRFAvVExTL1JUUC9TQVZQRiAnO1xuICBzZHAgKz0gY2Fwcy5jb2RlY3MubWFwKGZ1bmN0aW9uKGNvZGVjKSB7XG4gICAgaWYgKGNvZGVjLnByZWZlcnJlZFBheWxvYWRUeXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZTtcbiAgICB9XG4gICAgcmV0dXJuIGNvZGVjLnBheWxvYWRUeXBlO1xuICB9KS5qb2luKCcgJykgKyAnXFxyXFxuJztcblxuICBzZHAgKz0gJ2M9SU4gSVA0IDAuMC4wLjBcXHJcXG4nO1xuICBzZHAgKz0gJ2E9cnRjcDo5IElOIElQNCAwLjAuMC4wXFxyXFxuJztcblxuICAvLyBBZGQgYT1ydHBtYXAgbGluZXMgZm9yIGVhY2ggY29kZWMuIEFsc28gZm10cCBhbmQgcnRjcC1mYi5cbiAgY2Fwcy5jb2RlY3MuZm9yRWFjaChmdW5jdGlvbihjb2RlYykge1xuICAgIHNkcCArPSBTRFBVdGlscy53cml0ZVJ0cE1hcChjb2RlYyk7XG4gICAgc2RwICs9IFNEUFV0aWxzLndyaXRlRm10cChjb2RlYyk7XG4gICAgc2RwICs9IFNEUFV0aWxzLndyaXRlUnRjcEZiKGNvZGVjKTtcbiAgfSk7XG4gIHZhciBtYXhwdGltZSA9IDA7XG4gIGNhcHMuY29kZWNzLmZvckVhY2goZnVuY3Rpb24oY29kZWMpIHtcbiAgICBpZiAoY29kZWMubWF4cHRpbWUgPiBtYXhwdGltZSkge1xuICAgICAgbWF4cHRpbWUgPSBjb2RlYy5tYXhwdGltZTtcbiAgICB9XG4gIH0pO1xuICBpZiAobWF4cHRpbWUgPiAwKSB7XG4gICAgc2RwICs9ICdhPW1heHB0aW1lOicgKyBtYXhwdGltZSArICdcXHJcXG4nO1xuICB9XG4gIHNkcCArPSAnYT1ydGNwLW11eFxcclxcbic7XG5cbiAgY2Fwcy5oZWFkZXJFeHRlbnNpb25zLmZvckVhY2goZnVuY3Rpb24oZXh0ZW5zaW9uKSB7XG4gICAgc2RwICs9IFNEUFV0aWxzLndyaXRlRXh0bWFwKGV4dGVuc2lvbik7XG4gIH0pO1xuICAvLyBGSVhNRTogd3JpdGUgZmVjTWVjaGFuaXNtcy5cbiAgcmV0dXJuIHNkcDtcbn07XG5cbi8vIFBhcnNlcyB0aGUgU0RQIG1lZGlhIHNlY3Rpb24gYW5kIHJldHVybnMgYW4gYXJyYXkgb2Zcbi8vIFJUQ1J0cEVuY29kaW5nUGFyYW1ldGVycy5cblNEUFV0aWxzLnBhcnNlUnRwRW5jb2RpbmdQYXJhbWV0ZXJzID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XG4gIHZhciBlbmNvZGluZ1BhcmFtZXRlcnMgPSBbXTtcbiAgdmFyIGRlc2NyaXB0aW9uID0gU0RQVXRpbHMucGFyc2VSdHBQYXJhbWV0ZXJzKG1lZGlhU2VjdGlvbik7XG4gIHZhciBoYXNSZWQgPSBkZXNjcmlwdGlvbi5mZWNNZWNoYW5pc21zLmluZGV4T2YoJ1JFRCcpICE9PSAtMTtcbiAgdmFyIGhhc1VscGZlYyA9IGRlc2NyaXB0aW9uLmZlY01lY2hhbmlzbXMuaW5kZXhPZignVUxQRkVDJykgIT09IC0xO1xuXG4gIC8vIGZpbHRlciBhPXNzcmM6Li4uIGNuYW1lOiwgaWdub3JlIFBsYW5CLW1zaWRcbiAgdmFyIHNzcmNzID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1zc3JjOicpXG4gIC5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgIHJldHVybiBTRFBVdGlscy5wYXJzZVNzcmNNZWRpYShsaW5lKTtcbiAgfSlcbiAgLmZpbHRlcihmdW5jdGlvbihwYXJ0cykge1xuICAgIHJldHVybiBwYXJ0cy5hdHRyaWJ1dGUgPT09ICdjbmFtZSc7XG4gIH0pO1xuICB2YXIgcHJpbWFyeVNzcmMgPSBzc3Jjcy5sZW5ndGggPiAwICYmIHNzcmNzWzBdLnNzcmM7XG4gIHZhciBzZWNvbmRhcnlTc3JjO1xuXG4gIHZhciBmbG93cyA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9c3NyYy1ncm91cDpGSUQnKVxuICAubWFwKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICB2YXIgcGFydHMgPSBsaW5lLnNwbGl0KCcgJyk7XG4gICAgcGFydHMuc2hpZnQoKTtcbiAgICByZXR1cm4gcGFydHMubWFwKGZ1bmN0aW9uKHBhcnQpIHtcbiAgICAgIHJldHVybiBwYXJzZUludChwYXJ0LCAxMCk7XG4gICAgfSk7XG4gIH0pO1xuICBpZiAoZmxvd3MubGVuZ3RoID4gMCAmJiBmbG93c1swXS5sZW5ndGggPiAxICYmIGZsb3dzWzBdWzBdID09PSBwcmltYXJ5U3NyYykge1xuICAgIHNlY29uZGFyeVNzcmMgPSBmbG93c1swXVsxXTtcbiAgfVxuXG4gIGRlc2NyaXB0aW9uLmNvZGVjcy5mb3JFYWNoKGZ1bmN0aW9uKGNvZGVjKSB7XG4gICAgaWYgKGNvZGVjLm5hbWUudG9VcHBlckNhc2UoKSA9PT0gJ1JUWCcgJiYgY29kZWMucGFyYW1ldGVycy5hcHQpIHtcbiAgICAgIHZhciBlbmNQYXJhbSA9IHtcbiAgICAgICAgc3NyYzogcHJpbWFyeVNzcmMsXG4gICAgICAgIGNvZGVjUGF5bG9hZFR5cGU6IHBhcnNlSW50KGNvZGVjLnBhcmFtZXRlcnMuYXB0LCAxMCksXG4gICAgICAgIHJ0eDoge1xuICAgICAgICAgIHNzcmM6IHNlY29uZGFyeVNzcmNcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGVuY29kaW5nUGFyYW1ldGVycy5wdXNoKGVuY1BhcmFtKTtcbiAgICAgIGlmIChoYXNSZWQpIHtcbiAgICAgICAgZW5jUGFyYW0gPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGVuY1BhcmFtKSk7XG4gICAgICAgIGVuY1BhcmFtLmZlYyA9IHtcbiAgICAgICAgICBzc3JjOiBzZWNvbmRhcnlTc3JjLFxuICAgICAgICAgIG1lY2hhbmlzbTogaGFzVWxwZmVjID8gJ3JlZCt1bHBmZWMnIDogJ3JlZCdcbiAgICAgICAgfTtcbiAgICAgICAgZW5jb2RpbmdQYXJhbWV0ZXJzLnB1c2goZW5jUGFyYW0pO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIGlmIChlbmNvZGluZ1BhcmFtZXRlcnMubGVuZ3RoID09PSAwICYmIHByaW1hcnlTc3JjKSB7XG4gICAgZW5jb2RpbmdQYXJhbWV0ZXJzLnB1c2goe1xuICAgICAgc3NyYzogcHJpbWFyeVNzcmNcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHdlIHN1cHBvcnQgYm90aCBiPUFTIGFuZCBiPVRJQVMgYnV0IGludGVycHJldCBBUyBhcyBUSUFTLlxuICB2YXIgYmFuZHdpZHRoID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYj0nKTtcbiAgaWYgKGJhbmR3aWR0aC5sZW5ndGgpIHtcbiAgICBpZiAoYmFuZHdpZHRoWzBdLmluZGV4T2YoJ2I9VElBUzonKSA9PT0gMCkge1xuICAgICAgYmFuZHdpZHRoID0gcGFyc2VJbnQoYmFuZHdpZHRoWzBdLnN1YnN0cig3KSwgMTApO1xuICAgIH0gZWxzZSBpZiAoYmFuZHdpZHRoWzBdLmluZGV4T2YoJ2I9QVM6JykgPT09IDApIHtcbiAgICAgIC8vIHVzZSBmb3JtdWxhIGZyb20gSlNFUCB0byBjb252ZXJ0IGI9QVMgdG8gVElBUyB2YWx1ZS5cbiAgICAgIGJhbmR3aWR0aCA9IHBhcnNlSW50KGJhbmR3aWR0aFswXS5zdWJzdHIoNSksIDEwKSAqIDEwMDAgKiAwLjk1XG4gICAgICAgICAgLSAoNTAgKiA0MCAqIDgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBiYW5kd2lkdGggPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGVuY29kaW5nUGFyYW1ldGVycy5mb3JFYWNoKGZ1bmN0aW9uKHBhcmFtcykge1xuICAgICAgcGFyYW1zLm1heEJpdHJhdGUgPSBiYW5kd2lkdGg7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIGVuY29kaW5nUGFyYW1ldGVycztcbn07XG5cbi8vIHBhcnNlcyBodHRwOi8vZHJhZnQub3J0Yy5vcmcvI3J0Y3J0Y3BwYXJhbWV0ZXJzKlxuU0RQVXRpbHMucGFyc2VSdGNwUGFyYW1ldGVycyA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbikge1xuICB2YXIgcnRjcFBhcmFtZXRlcnMgPSB7fTtcblxuICB2YXIgY25hbWU7XG4gIC8vIEdldHMgdGhlIGZpcnN0IFNTUkMuIE5vdGUgdGhhdCB3aXRoIFJUWCB0aGVyZSBtaWdodCBiZSBtdWx0aXBsZVxuICAvLyBTU1JDcy5cbiAgdmFyIHJlbW90ZVNzcmMgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPXNzcmM6JylcbiAgICAgIC5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgICAgICByZXR1cm4gU0RQVXRpbHMucGFyc2VTc3JjTWVkaWEobGluZSk7XG4gICAgICB9KVxuICAgICAgLmZpbHRlcihmdW5jdGlvbihvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iai5hdHRyaWJ1dGUgPT09ICdjbmFtZSc7XG4gICAgICB9KVswXTtcbiAgaWYgKHJlbW90ZVNzcmMpIHtcbiAgICBydGNwUGFyYW1ldGVycy5jbmFtZSA9IHJlbW90ZVNzcmMudmFsdWU7XG4gICAgcnRjcFBhcmFtZXRlcnMuc3NyYyA9IHJlbW90ZVNzcmMuc3NyYztcbiAgfVxuXG4gIC8vIEVkZ2UgdXNlcyB0aGUgY29tcG91bmQgYXR0cmlidXRlIGluc3RlYWQgb2YgcmVkdWNlZFNpemVcbiAgLy8gY29tcG91bmQgaXMgIXJlZHVjZWRTaXplXG4gIHZhciByc2l6ZSA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9cnRjcC1yc2l6ZScpO1xuICBydGNwUGFyYW1ldGVycy5yZWR1Y2VkU2l6ZSA9IHJzaXplLmxlbmd0aCA+IDA7XG4gIHJ0Y3BQYXJhbWV0ZXJzLmNvbXBvdW5kID0gcnNpemUubGVuZ3RoID09PSAwO1xuXG4gIC8vIHBhcnNlcyB0aGUgcnRjcC1tdXggYXR0ctGWYnV0ZS5cbiAgLy8gTm90ZSB0aGF0IEVkZ2UgZG9lcyBub3Qgc3VwcG9ydCB1bm11eGVkIFJUQ1AuXG4gIHZhciBtdXggPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPXJ0Y3AtbXV4Jyk7XG4gIHJ0Y3BQYXJhbWV0ZXJzLm11eCA9IG11eC5sZW5ndGggPiAwO1xuXG4gIHJldHVybiBydGNwUGFyYW1ldGVycztcbn07XG5cbi8vIHBhcnNlcyBlaXRoZXIgYT1tc2lkOiBvciBhPXNzcmM6Li4uIG1zaWQgbGluZXMgYW5kIHJldHVybnNcbi8vIHRoZSBpZCBvZiB0aGUgTWVkaWFTdHJlYW0gYW5kIE1lZGlhU3RyZWFtVHJhY2suXG5TRFBVdGlscy5wYXJzZU1zaWQgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcbiAgdmFyIHBhcnRzO1xuICB2YXIgc3BlYyA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9bXNpZDonKTtcbiAgaWYgKHNwZWMubGVuZ3RoID09PSAxKSB7XG4gICAgcGFydHMgPSBzcGVjWzBdLnN1YnN0cig3KS5zcGxpdCgnICcpO1xuICAgIHJldHVybiB7c3RyZWFtOiBwYXJ0c1swXSwgdHJhY2s6IHBhcnRzWzFdfTtcbiAgfVxuICB2YXIgcGxhbkIgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPXNzcmM6JylcbiAgLm1hcChmdW5jdGlvbihsaW5lKSB7XG4gICAgcmV0dXJuIFNEUFV0aWxzLnBhcnNlU3NyY01lZGlhKGxpbmUpO1xuICB9KVxuICAuZmlsdGVyKGZ1bmN0aW9uKHBhcnRzKSB7XG4gICAgcmV0dXJuIHBhcnRzLmF0dHJpYnV0ZSA9PT0gJ21zaWQnO1xuICB9KTtcbiAgaWYgKHBsYW5CLmxlbmd0aCA+IDApIHtcbiAgICBwYXJ0cyA9IHBsYW5CWzBdLnZhbHVlLnNwbGl0KCcgJyk7XG4gICAgcmV0dXJuIHtzdHJlYW06IHBhcnRzWzBdLCB0cmFjazogcGFydHNbMV19O1xuICB9XG59O1xuXG4vLyBHZW5lcmF0ZSBhIHNlc3Npb24gSUQgZm9yIFNEUC5cbi8vIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9kcmFmdC1pZXRmLXJ0Y3dlYi1qc2VwLTIwI3NlY3Rpb24tNS4yLjFcbi8vIHJlY29tbWVuZHMgdXNpbmcgYSBjcnlwdG9ncmFwaGljYWxseSByYW5kb20gK3ZlIDY0LWJpdCB2YWx1ZVxuLy8gYnV0IHJpZ2h0IG5vdyB0aGlzIHNob3VsZCBiZSBhY2NlcHRhYmxlIGFuZCB3aXRoaW4gdGhlIHJpZ2h0IHJhbmdlXG5TRFBVdGlscy5nZW5lcmF0ZVNlc3Npb25JZCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygpLnN1YnN0cigyLCAyMSk7XG59O1xuXG4vLyBXcml0ZSBib2lsZGVyIHBsYXRlIGZvciBzdGFydCBvZiBTRFBcbi8vIHNlc3NJZCBhcmd1bWVudCBpcyBvcHRpb25hbCAtIGlmIG5vdCBzdXBwbGllZCBpdCB3aWxsXG4vLyBiZSBnZW5lcmF0ZWQgcmFuZG9tbHlcbi8vIHNlc3NWZXJzaW9uIGlzIG9wdGlvbmFsIGFuZCBkZWZhdWx0cyB0byAyXG5TRFBVdGlscy53cml0ZVNlc3Npb25Cb2lsZXJwbGF0ZSA9IGZ1bmN0aW9uKHNlc3NJZCwgc2Vzc1Zlcikge1xuICB2YXIgc2Vzc2lvbklkO1xuICB2YXIgdmVyc2lvbiA9IHNlc3NWZXIgIT09IHVuZGVmaW5lZCA/IHNlc3NWZXIgOiAyO1xuICBpZiAoc2Vzc0lkKSB7XG4gICAgc2Vzc2lvbklkID0gc2Vzc0lkO1xuICB9IGVsc2Uge1xuICAgIHNlc3Npb25JZCA9IFNEUFV0aWxzLmdlbmVyYXRlU2Vzc2lvbklkKCk7XG4gIH1cbiAgLy8gRklYTUU6IHNlc3MtaWQgc2hvdWxkIGJlIGFuIE5UUCB0aW1lc3RhbXAuXG4gIHJldHVybiAndj0wXFxyXFxuJyArXG4gICAgICAnbz10aGlzaXNhZGFwdGVyb3J0YyAnICsgc2Vzc2lvbklkICsgJyAnICsgdmVyc2lvbiArICcgSU4gSVA0IDEyNy4wLjAuMVxcclxcbicgK1xuICAgICAgJ3M9LVxcclxcbicgK1xuICAgICAgJ3Q9MCAwXFxyXFxuJztcbn07XG5cblNEUFV0aWxzLndyaXRlTWVkaWFTZWN0aW9uID0gZnVuY3Rpb24odHJhbnNjZWl2ZXIsIGNhcHMsIHR5cGUsIHN0cmVhbSkge1xuICB2YXIgc2RwID0gU0RQVXRpbHMud3JpdGVSdHBEZXNjcmlwdGlvbih0cmFuc2NlaXZlci5raW5kLCBjYXBzKTtcblxuICAvLyBNYXAgSUNFIHBhcmFtZXRlcnMgKHVmcmFnLCBwd2QpIHRvIFNEUC5cbiAgc2RwICs9IFNEUFV0aWxzLndyaXRlSWNlUGFyYW1ldGVycyhcbiAgICAgIHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyLmdldExvY2FsUGFyYW1ldGVycygpKTtcblxuICAvLyBNYXAgRFRMUyBwYXJhbWV0ZXJzIHRvIFNEUC5cbiAgc2RwICs9IFNEUFV0aWxzLndyaXRlRHRsc1BhcmFtZXRlcnMoXG4gICAgICB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0LmdldExvY2FsUGFyYW1ldGVycygpLFxuICAgICAgdHlwZSA9PT0gJ29mZmVyJyA/ICdhY3RwYXNzJyA6ICdhY3RpdmUnKTtcblxuICBzZHAgKz0gJ2E9bWlkOicgKyB0cmFuc2NlaXZlci5taWQgKyAnXFxyXFxuJztcblxuICBpZiAodHJhbnNjZWl2ZXIuZGlyZWN0aW9uKSB7XG4gICAgc2RwICs9ICdhPScgKyB0cmFuc2NlaXZlci5kaXJlY3Rpb24gKyAnXFxyXFxuJztcbiAgfSBlbHNlIGlmICh0cmFuc2NlaXZlci5ydHBTZW5kZXIgJiYgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIpIHtcbiAgICBzZHAgKz0gJ2E9c2VuZHJlY3ZcXHJcXG4nO1xuICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlcikge1xuICAgIHNkcCArPSAnYT1zZW5kb25seVxcclxcbic7XG4gIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIpIHtcbiAgICBzZHAgKz0gJ2E9cmVjdm9ubHlcXHJcXG4nO1xuICB9IGVsc2Uge1xuICAgIHNkcCArPSAnYT1pbmFjdGl2ZVxcclxcbic7XG4gIH1cblxuICBpZiAodHJhbnNjZWl2ZXIucnRwU2VuZGVyKSB7XG4gICAgLy8gc3BlYy5cbiAgICB2YXIgbXNpZCA9ICdtc2lkOicgKyBzdHJlYW0uaWQgKyAnICcgK1xuICAgICAgICB0cmFuc2NlaXZlci5ydHBTZW5kZXIudHJhY2suaWQgKyAnXFxyXFxuJztcbiAgICBzZHAgKz0gJ2E9JyArIG1zaWQ7XG5cbiAgICAvLyBmb3IgQ2hyb21lLlxuICAgIHNkcCArPSAnYT1zc3JjOicgKyB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmMgK1xuICAgICAgICAnICcgKyBtc2lkO1xuICAgIGlmICh0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCkge1xuICAgICAgc2RwICs9ICdhPXNzcmM6JyArIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4LnNzcmMgK1xuICAgICAgICAgICcgJyArIG1zaWQ7XG4gICAgICBzZHAgKz0gJ2E9c3NyYy1ncm91cDpGSUQgJyArXG4gICAgICAgICAgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjICsgJyAnICtcbiAgICAgICAgICB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eC5zc3JjICtcbiAgICAgICAgICAnXFxyXFxuJztcbiAgICB9XG4gIH1cbiAgLy8gRklYTUU6IHRoaXMgc2hvdWxkIGJlIHdyaXR0ZW4gYnkgd3JpdGVSdHBEZXNjcmlwdGlvbi5cbiAgc2RwICs9ICdhPXNzcmM6JyArIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYyArXG4gICAgICAnIGNuYW1lOicgKyBTRFBVdGlscy5sb2NhbENOYW1lICsgJ1xcclxcbic7XG4gIGlmICh0cmFuc2NlaXZlci5ydHBTZW5kZXIgJiYgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHgpIHtcbiAgICBzZHAgKz0gJ2E9c3NyYzonICsgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHguc3NyYyArXG4gICAgICAgICcgY25hbWU6JyArIFNEUFV0aWxzLmxvY2FsQ05hbWUgKyAnXFxyXFxuJztcbiAgfVxuICByZXR1cm4gc2RwO1xufTtcblxuLy8gR2V0cyB0aGUgZGlyZWN0aW9uIGZyb20gdGhlIG1lZGlhU2VjdGlvbiBvciB0aGUgc2Vzc2lvbnBhcnQuXG5TRFBVdGlscy5nZXREaXJlY3Rpb24gPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24sIHNlc3Npb25wYXJ0KSB7XG4gIC8vIExvb2sgZm9yIHNlbmRyZWN2LCBzZW5kb25seSwgcmVjdm9ubHksIGluYWN0aXZlLCBkZWZhdWx0IHRvIHNlbmRyZWN2LlxuICB2YXIgbGluZXMgPSBTRFBVdGlscy5zcGxpdExpbmVzKG1lZGlhU2VjdGlvbik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICBzd2l0Y2ggKGxpbmVzW2ldKSB7XG4gICAgICBjYXNlICdhPXNlbmRyZWN2JzpcbiAgICAgIGNhc2UgJ2E9c2VuZG9ubHknOlxuICAgICAgY2FzZSAnYT1yZWN2b25seSc6XG4gICAgICBjYXNlICdhPWluYWN0aXZlJzpcbiAgICAgICAgcmV0dXJuIGxpbmVzW2ldLnN1YnN0cigyKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIEZJWE1FOiBXaGF0IHNob3VsZCBoYXBwZW4gaGVyZT9cbiAgICB9XG4gIH1cbiAgaWYgKHNlc3Npb25wYXJ0KSB7XG4gICAgcmV0dXJuIFNEUFV0aWxzLmdldERpcmVjdGlvbihzZXNzaW9ucGFydCk7XG4gIH1cbiAgcmV0dXJuICdzZW5kcmVjdic7XG59O1xuXG5TRFBVdGlscy5nZXRLaW5kID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XG4gIHZhciBsaW5lcyA9IFNEUFV0aWxzLnNwbGl0TGluZXMobWVkaWFTZWN0aW9uKTtcbiAgdmFyIG1saW5lID0gbGluZXNbMF0uc3BsaXQoJyAnKTtcbiAgcmV0dXJuIG1saW5lWzBdLnN1YnN0cigyKTtcbn07XG5cblNEUFV0aWxzLmlzUmVqZWN0ZWQgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcbiAgcmV0dXJuIG1lZGlhU2VjdGlvbi5zcGxpdCgnICcsIDIpWzFdID09PSAnMCc7XG59O1xuXG5TRFBVdGlscy5wYXJzZU1MaW5lID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XG4gIHZhciBsaW5lcyA9IFNEUFV0aWxzLnNwbGl0TGluZXMobWVkaWFTZWN0aW9uKTtcbiAgdmFyIHBhcnRzID0gbGluZXNbMF0uc3Vic3RyKDIpLnNwbGl0KCcgJyk7XG4gIHJldHVybiB7XG4gICAga2luZDogcGFydHNbMF0sXG4gICAgcG9ydDogcGFyc2VJbnQocGFydHNbMV0sIDEwKSxcbiAgICBwcm90b2NvbDogcGFydHNbMl0sXG4gICAgZm10OiBwYXJ0cy5zbGljZSgzKS5qb2luKCcgJylcbiAgfTtcbn07XG5cblNEUFV0aWxzLnBhcnNlT0xpbmUgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcbiAgdmFyIGxpbmUgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdvPScpWzBdO1xuICB2YXIgcGFydHMgPSBsaW5lLnN1YnN0cigyKS5zcGxpdCgnICcpO1xuICByZXR1cm4ge1xuICAgIHVzZXJuYW1lOiBwYXJ0c1swXSxcbiAgICBzZXNzaW9uSWQ6IHBhcnRzWzFdLFxuICAgIHNlc3Npb25WZXJzaW9uOiBwYXJzZUludChwYXJ0c1syXSwgMTApLFxuICAgIG5ldFR5cGU6IHBhcnRzWzNdLFxuICAgIGFkZHJlc3NUeXBlOiBwYXJ0c1s0XSxcbiAgICBhZGRyZXNzOiBwYXJ0c1s1XSxcbiAgfTtcbn1cblxuLy8gRXhwb3NlIHB1YmxpYyBtZXRob2RzLlxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gU0RQVXRpbHM7XG59XG5cbn0se31dLDM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uIChnbG9iYWwpe1xuLypcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcbiAqICB0cmVlLlxuICovXG4gLyogZXNsaW50LWVudiBub2RlICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGFkYXB0ZXJGYWN0b3J5ID0gcmVxdWlyZSgnLi9hZGFwdGVyX2ZhY3RvcnkuanMnKTtcbm1vZHVsZS5leHBvcnRzID0gYWRhcHRlckZhY3Rvcnkoe3dpbmRvdzogZ2xvYmFsLndpbmRvd30pO1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbn0se1wiLi9hZGFwdGVyX2ZhY3RvcnkuanNcIjo0fV0sNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vKlxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxuICogIHRyZWUuXG4gKi9cbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG4vLyBTaGltbWluZyBzdGFydHMgaGVyZS5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZGVwZW5kZW5jaWVzLCBvcHRzKSB7XG4gIHZhciB3aW5kb3cgPSBkZXBlbmRlbmNpZXMgJiYgZGVwZW5kZW5jaWVzLndpbmRvdztcblxuICB2YXIgb3B0aW9ucyA9IHtcbiAgICBzaGltQ2hyb21lOiB0cnVlLFxuICAgIHNoaW1GaXJlZm94OiB0cnVlLFxuICAgIHNoaW1FZGdlOiB0cnVlLFxuICAgIHNoaW1TYWZhcmk6IHRydWUsXG4gIH07XG5cbiAgZm9yICh2YXIga2V5IGluIG9wdHMpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvcHRzLCBrZXkpKSB7XG4gICAgICBvcHRpb25zW2tleV0gPSBvcHRzW2tleV07XG4gICAgfVxuICB9XG5cbiAgLy8gVXRpbHMuXG4gIHZhciBsb2dnaW5nID0gdXRpbHMubG9nO1xuICB2YXIgYnJvd3NlckRldGFpbHMgPSB1dGlscy5kZXRlY3RCcm93c2VyKHdpbmRvdyk7XG5cbiAgLy8gVW5jb21tZW50IHRoZSBsaW5lIGJlbG93IGlmIHlvdSB3YW50IGxvZ2dpbmcgdG8gb2NjdXIsIGluY2x1ZGluZyBsb2dnaW5nXG4gIC8vIGZvciB0aGUgc3dpdGNoIHN0YXRlbWVudCBiZWxvdy4gQ2FuIGFsc28gYmUgdHVybmVkIG9uIGluIHRoZSBicm93c2VyIHZpYVxuICAvLyBhZGFwdGVyLmRpc2FibGVMb2coZmFsc2UpLCBidXQgdGhlbiBsb2dnaW5nIGZyb20gdGhlIHN3aXRjaCBzdGF0ZW1lbnQgYmVsb3dcbiAgLy8gd2lsbCBub3QgYXBwZWFyLlxuICAvLyByZXF1aXJlKCcuL3V0aWxzJykuZGlzYWJsZUxvZyhmYWxzZSk7XG5cbiAgLy8gQnJvd3NlciBzaGltcy5cbiAgdmFyIGNocm9tZVNoaW0gPSByZXF1aXJlKCcuL2Nocm9tZS9jaHJvbWVfc2hpbScpIHx8IG51bGw7XG4gIHZhciBlZGdlU2hpbSA9IHJlcXVpcmUoJy4vZWRnZS9lZGdlX3NoaW0nKSB8fCBudWxsO1xuICB2YXIgZmlyZWZveFNoaW0gPSByZXF1aXJlKCcuL2ZpcmVmb3gvZmlyZWZveF9zaGltJykgfHwgbnVsbDtcbiAgdmFyIHNhZmFyaVNoaW0gPSByZXF1aXJlKCcuL3NhZmFyaS9zYWZhcmlfc2hpbScpIHx8IG51bGw7XG4gIHZhciBjb21tb25TaGltID0gcmVxdWlyZSgnLi9jb21tb25fc2hpbScpIHx8IG51bGw7XG5cbiAgLy8gRXhwb3J0IHRvIHRoZSBhZGFwdGVyIGdsb2JhbCBvYmplY3QgdmlzaWJsZSBpbiB0aGUgYnJvd3Nlci5cbiAgdmFyIGFkYXB0ZXIgPSB7XG4gICAgYnJvd3NlckRldGFpbHM6IGJyb3dzZXJEZXRhaWxzLFxuICAgIGNvbW1vblNoaW06IGNvbW1vblNoaW0sXG4gICAgZXh0cmFjdFZlcnNpb246IHV0aWxzLmV4dHJhY3RWZXJzaW9uLFxuICAgIGRpc2FibGVMb2c6IHV0aWxzLmRpc2FibGVMb2csXG4gICAgZGlzYWJsZVdhcm5pbmdzOiB1dGlscy5kaXNhYmxlV2FybmluZ3NcbiAgfTtcblxuICAvLyBTaGltIGJyb3dzZXIgaWYgZm91bmQuXG4gIHN3aXRjaCAoYnJvd3NlckRldGFpbHMuYnJvd3Nlcikge1xuICAgIGNhc2UgJ2Nocm9tZSc6XG4gICAgICBpZiAoIWNocm9tZVNoaW0gfHwgIWNocm9tZVNoaW0uc2hpbVBlZXJDb25uZWN0aW9uIHx8XG4gICAgICAgICAgIW9wdGlvbnMuc2hpbUNocm9tZSkge1xuICAgICAgICBsb2dnaW5nKCdDaHJvbWUgc2hpbSBpcyBub3QgaW5jbHVkZWQgaW4gdGhpcyBhZGFwdGVyIHJlbGVhc2UuJyk7XG4gICAgICAgIHJldHVybiBhZGFwdGVyO1xuICAgICAgfVxuICAgICAgbG9nZ2luZygnYWRhcHRlci5qcyBzaGltbWluZyBjaHJvbWUuJyk7XG4gICAgICAvLyBFeHBvcnQgdG8gdGhlIGFkYXB0ZXIgZ2xvYmFsIG9iamVjdCB2aXNpYmxlIGluIHRoZSBicm93c2VyLlxuICAgICAgYWRhcHRlci5icm93c2VyU2hpbSA9IGNocm9tZVNoaW07XG4gICAgICBjb21tb25TaGltLnNoaW1DcmVhdGVPYmplY3RVUkwod2luZG93KTtcblxuICAgICAgY2hyb21lU2hpbS5zaGltR2V0VXNlck1lZGlhKHdpbmRvdyk7XG4gICAgICBjaHJvbWVTaGltLnNoaW1NZWRpYVN0cmVhbSh3aW5kb3cpO1xuICAgICAgY2hyb21lU2hpbS5zaGltU291cmNlT2JqZWN0KHdpbmRvdyk7XG4gICAgICBjaHJvbWVTaGltLnNoaW1QZWVyQ29ubmVjdGlvbih3aW5kb3cpO1xuICAgICAgY2hyb21lU2hpbS5zaGltT25UcmFjayh3aW5kb3cpO1xuICAgICAgY2hyb21lU2hpbS5zaGltQWRkVHJhY2tSZW1vdmVUcmFjayh3aW5kb3cpO1xuICAgICAgY2hyb21lU2hpbS5zaGltR2V0U2VuZGVyc1dpdGhEdG1mKHdpbmRvdyk7XG5cbiAgICAgIGNvbW1vblNoaW0uc2hpbVJUQ0ljZUNhbmRpZGF0ZSh3aW5kb3cpO1xuICAgICAgY29tbW9uU2hpbS5zaGltTWF4TWVzc2FnZVNpemUod2luZG93KTtcbiAgICAgIGNvbW1vblNoaW0uc2hpbVNlbmRUaHJvd1R5cGVFcnJvcih3aW5kb3cpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnZmlyZWZveCc6XG4gICAgICBpZiAoIWZpcmVmb3hTaGltIHx8ICFmaXJlZm94U2hpbS5zaGltUGVlckNvbm5lY3Rpb24gfHxcbiAgICAgICAgICAhb3B0aW9ucy5zaGltRmlyZWZveCkge1xuICAgICAgICBsb2dnaW5nKCdGaXJlZm94IHNoaW0gaXMgbm90IGluY2x1ZGVkIGluIHRoaXMgYWRhcHRlciByZWxlYXNlLicpO1xuICAgICAgICByZXR1cm4gYWRhcHRlcjtcbiAgICAgIH1cbiAgICAgIGxvZ2dpbmcoJ2FkYXB0ZXIuanMgc2hpbW1pbmcgZmlyZWZveC4nKTtcbiAgICAgIC8vIEV4cG9ydCB0byB0aGUgYWRhcHRlciBnbG9iYWwgb2JqZWN0IHZpc2libGUgaW4gdGhlIGJyb3dzZXIuXG4gICAgICBhZGFwdGVyLmJyb3dzZXJTaGltID0gZmlyZWZveFNoaW07XG4gICAgICBjb21tb25TaGltLnNoaW1DcmVhdGVPYmplY3RVUkwod2luZG93KTtcblxuICAgICAgZmlyZWZveFNoaW0uc2hpbUdldFVzZXJNZWRpYSh3aW5kb3cpO1xuICAgICAgZmlyZWZveFNoaW0uc2hpbVNvdXJjZU9iamVjdCh3aW5kb3cpO1xuICAgICAgZmlyZWZveFNoaW0uc2hpbVBlZXJDb25uZWN0aW9uKHdpbmRvdyk7XG4gICAgICBmaXJlZm94U2hpbS5zaGltT25UcmFjayh3aW5kb3cpO1xuICAgICAgZmlyZWZveFNoaW0uc2hpbVJlbW92ZVN0cmVhbSh3aW5kb3cpO1xuXG4gICAgICBjb21tb25TaGltLnNoaW1SVENJY2VDYW5kaWRhdGUod2luZG93KTtcbiAgICAgIGNvbW1vblNoaW0uc2hpbU1heE1lc3NhZ2VTaXplKHdpbmRvdyk7XG4gICAgICBjb21tb25TaGltLnNoaW1TZW5kVGhyb3dUeXBlRXJyb3Iod2luZG93KTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2VkZ2UnOlxuICAgICAgaWYgKCFlZGdlU2hpbSB8fCAhZWRnZVNoaW0uc2hpbVBlZXJDb25uZWN0aW9uIHx8ICFvcHRpb25zLnNoaW1FZGdlKSB7XG4gICAgICAgIGxvZ2dpbmcoJ01TIGVkZ2Ugc2hpbSBpcyBub3QgaW5jbHVkZWQgaW4gdGhpcyBhZGFwdGVyIHJlbGVhc2UuJyk7XG4gICAgICAgIHJldHVybiBhZGFwdGVyO1xuICAgICAgfVxuICAgICAgbG9nZ2luZygnYWRhcHRlci5qcyBzaGltbWluZyBlZGdlLicpO1xuICAgICAgLy8gRXhwb3J0IHRvIHRoZSBhZGFwdGVyIGdsb2JhbCBvYmplY3QgdmlzaWJsZSBpbiB0aGUgYnJvd3Nlci5cbiAgICAgIGFkYXB0ZXIuYnJvd3NlclNoaW0gPSBlZGdlU2hpbTtcbiAgICAgIGNvbW1vblNoaW0uc2hpbUNyZWF0ZU9iamVjdFVSTCh3aW5kb3cpO1xuXG4gICAgICBlZGdlU2hpbS5zaGltR2V0VXNlck1lZGlhKHdpbmRvdyk7XG4gICAgICBlZGdlU2hpbS5zaGltUGVlckNvbm5lY3Rpb24od2luZG93KTtcbiAgICAgIGVkZ2VTaGltLnNoaW1SZXBsYWNlVHJhY2sod2luZG93KTtcblxuICAgICAgLy8gdGhlIGVkZ2Ugc2hpbSBpbXBsZW1lbnRzIHRoZSBmdWxsIFJUQ0ljZUNhbmRpZGF0ZSBvYmplY3QuXG5cbiAgICAgIGNvbW1vblNoaW0uc2hpbU1heE1lc3NhZ2VTaXplKHdpbmRvdyk7XG4gICAgICBjb21tb25TaGltLnNoaW1TZW5kVGhyb3dUeXBlRXJyb3Iod2luZG93KTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3NhZmFyaSc6XG4gICAgICBpZiAoIXNhZmFyaVNoaW0gfHwgIW9wdGlvbnMuc2hpbVNhZmFyaSkge1xuICAgICAgICBsb2dnaW5nKCdTYWZhcmkgc2hpbSBpcyBub3QgaW5jbHVkZWQgaW4gdGhpcyBhZGFwdGVyIHJlbGVhc2UuJyk7XG4gICAgICAgIHJldHVybiBhZGFwdGVyO1xuICAgICAgfVxuICAgICAgbG9nZ2luZygnYWRhcHRlci5qcyBzaGltbWluZyBzYWZhcmkuJyk7XG4gICAgICAvLyBFeHBvcnQgdG8gdGhlIGFkYXB0ZXIgZ2xvYmFsIG9iamVjdCB2aXNpYmxlIGluIHRoZSBicm93c2VyLlxuICAgICAgYWRhcHRlci5icm93c2VyU2hpbSA9IHNhZmFyaVNoaW07XG4gICAgICBjb21tb25TaGltLnNoaW1DcmVhdGVPYmplY3RVUkwod2luZG93KTtcblxuICAgICAgc2FmYXJpU2hpbS5zaGltUlRDSWNlU2VydmVyVXJscyh3aW5kb3cpO1xuICAgICAgc2FmYXJpU2hpbS5zaGltQ2FsbGJhY2tzQVBJKHdpbmRvdyk7XG4gICAgICBzYWZhcmlTaGltLnNoaW1Mb2NhbFN0cmVhbXNBUEkod2luZG93KTtcbiAgICAgIHNhZmFyaVNoaW0uc2hpbVJlbW90ZVN0cmVhbXNBUEkod2luZG93KTtcbiAgICAgIHNhZmFyaVNoaW0uc2hpbVRyYWNrRXZlbnRUcmFuc2NlaXZlcih3aW5kb3cpO1xuICAgICAgc2FmYXJpU2hpbS5zaGltR2V0VXNlck1lZGlhKHdpbmRvdyk7XG4gICAgICBzYWZhcmlTaGltLnNoaW1DcmVhdGVPZmZlckxlZ2FjeSh3aW5kb3cpO1xuXG4gICAgICBjb21tb25TaGltLnNoaW1SVENJY2VDYW5kaWRhdGUod2luZG93KTtcbiAgICAgIGNvbW1vblNoaW0uc2hpbU1heE1lc3NhZ2VTaXplKHdpbmRvdyk7XG4gICAgICBjb21tb25TaGltLnNoaW1TZW5kVGhyb3dUeXBlRXJyb3Iod2luZG93KTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBsb2dnaW5nKCdVbnN1cHBvcnRlZCBicm93c2VyIScpO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICByZXR1cm4gYWRhcHRlcjtcbn07XG5cbn0se1wiLi9jaHJvbWUvY2hyb21lX3NoaW1cIjo1LFwiLi9jb21tb25fc2hpbVwiOjcsXCIuL2VkZ2UvZWRnZV9zaGltXCI6OCxcIi4vZmlyZWZveC9maXJlZm94X3NoaW1cIjoxMCxcIi4vc2FmYXJpL3NhZmFyaV9zaGltXCI6MTIsXCIuL3V0aWxzXCI6MTN9XSw1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxuLypcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcbiAqICB0cmVlLlxuICovXG4gLyogZXNsaW50LWVudiBub2RlICovXG4ndXNlIHN0cmljdCc7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscy5qcycpO1xudmFyIGxvZ2dpbmcgPSB1dGlscy5sb2c7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzaGltR2V0VXNlck1lZGlhOiByZXF1aXJlKCcuL2dldHVzZXJtZWRpYScpLFxuICBzaGltTWVkaWFTdHJlYW06IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIHdpbmRvdy5NZWRpYVN0cmVhbSA9IHdpbmRvdy5NZWRpYVN0cmVhbSB8fCB3aW5kb3cud2Via2l0TWVkaWFTdHJlYW07XG4gIH0sXG5cbiAgc2hpbU9uVHJhY2s6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gJiYgISgnb250cmFjaycgaW5cbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLCAnb250cmFjaycsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fb250cmFjaztcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbihmKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX29udHJhY2spIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhY2snLCB0aGlzLl9vbnRyYWNrKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCd0cmFjaycsIHRoaXMuX29udHJhY2sgPSBmKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB2YXIgb3JpZ1NldFJlbW90ZURlc2NyaXB0aW9uID1cbiAgICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnNldFJlbW90ZURlc2NyaXB0aW9uO1xuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5zZXRSZW1vdGVEZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgICBpZiAoIXBjLl9vbnRyYWNrcG9seSkge1xuICAgICAgICAgIHBjLl9vbnRyYWNrcG9seSA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIC8vIG9uYWRkc3RyZWFtIGRvZXMgbm90IGZpcmUgd2hlbiBhIHRyYWNrIGlzIGFkZGVkIHRvIGFuIGV4aXN0aW5nXG4gICAgICAgICAgICAvLyBzdHJlYW0uIEJ1dCBzdHJlYW0ub25hZGR0cmFjayBpcyBpbXBsZW1lbnRlZCBzbyB3ZSB1c2UgdGhhdC5cbiAgICAgICAgICAgIGUuc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoJ2FkZHRyYWNrJywgZnVuY3Rpb24odGUpIHtcbiAgICAgICAgICAgICAgdmFyIHJlY2VpdmVyO1xuICAgICAgICAgICAgICBpZiAod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRSZWNlaXZlcnMpIHtcbiAgICAgICAgICAgICAgICByZWNlaXZlciA9IHBjLmdldFJlY2VpdmVycygpLmZpbmQoZnVuY3Rpb24ocikge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHIudHJhY2sgJiYgci50cmFjay5pZCA9PT0gdGUudHJhY2suaWQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVjZWl2ZXIgPSB7dHJhY2s6IHRlLnRyYWNrfTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgndHJhY2snKTtcbiAgICAgICAgICAgICAgZXZlbnQudHJhY2sgPSB0ZS50cmFjaztcbiAgICAgICAgICAgICAgZXZlbnQucmVjZWl2ZXIgPSByZWNlaXZlcjtcbiAgICAgICAgICAgICAgZXZlbnQudHJhbnNjZWl2ZXIgPSB7cmVjZWl2ZXI6IHJlY2VpdmVyfTtcbiAgICAgICAgICAgICAgZXZlbnQuc3RyZWFtcyA9IFtlLnN0cmVhbV07XG4gICAgICAgICAgICAgIHBjLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBlLnN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XG4gICAgICAgICAgICAgIHZhciByZWNlaXZlcjtcbiAgICAgICAgICAgICAgaWYgKHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0UmVjZWl2ZXJzKSB7XG4gICAgICAgICAgICAgICAgcmVjZWl2ZXIgPSBwYy5nZXRSZWNlaXZlcnMoKS5maW5kKGZ1bmN0aW9uKHIpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiByLnRyYWNrICYmIHIudHJhY2suaWQgPT09IHRyYWNrLmlkO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlY2VpdmVyID0ge3RyYWNrOiB0cmFja307XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCd0cmFjaycpO1xuICAgICAgICAgICAgICBldmVudC50cmFjayA9IHRyYWNrO1xuICAgICAgICAgICAgICBldmVudC5yZWNlaXZlciA9IHJlY2VpdmVyO1xuICAgICAgICAgICAgICBldmVudC50cmFuc2NlaXZlciA9IHtyZWNlaXZlcjogcmVjZWl2ZXJ9O1xuICAgICAgICAgICAgICBldmVudC5zdHJlYW1zID0gW2Uuc3RyZWFtXTtcbiAgICAgICAgICAgICAgcGMuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHBjLmFkZEV2ZW50TGlzdGVuZXIoJ2FkZHN0cmVhbScsIHBjLl9vbnRyYWNrcG9seSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9yaWdTZXRSZW1vdGVEZXNjcmlwdGlvbi5hcHBseShwYywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmICghKCdSVENSdHBUcmFuc2NlaXZlcicgaW4gd2luZG93KSkge1xuICAgICAgdXRpbHMud3JhcFBlZXJDb25uZWN0aW9uRXZlbnQod2luZG93LCAndHJhY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICghZS50cmFuc2NlaXZlcikge1xuICAgICAgICAgIGUudHJhbnNjZWl2ZXIgPSB7cmVjZWl2ZXI6IGUucmVjZWl2ZXJ9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlO1xuICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIHNoaW1HZXRTZW5kZXJzV2l0aER0bWY6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIC8vIE92ZXJyaWRlcyBhZGRUcmFjay9yZW1vdmVUcmFjaywgZGVwZW5kcyBvbiBzaGltQWRkVHJhY2tSZW1vdmVUcmFjay5cbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uICYmXG4gICAgICAgICEoJ2dldFNlbmRlcnMnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpICYmXG4gICAgICAgICdjcmVhdGVEVE1GU2VuZGVyJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSB7XG4gICAgICB2YXIgc2hpbVNlbmRlcldpdGhEdG1mID0gZnVuY3Rpb24ocGMsIHRyYWNrKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdHJhY2s6IHRyYWNrLFxuICAgICAgICAgIGdldCBkdG1mKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2R0bWYgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBpZiAodHJhY2sua2luZCA9PT0gJ2F1ZGlvJykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2R0bWYgPSBwYy5jcmVhdGVEVE1GU2VuZGVyKHRyYWNrKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kdG1mID0gbnVsbDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2R0bWY7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBfcGM6IHBjXG4gICAgICAgIH07XG4gICAgICB9O1xuXG4gICAgICAvLyBhdWdtZW50IGFkZFRyYWNrIHdoZW4gZ2V0U2VuZGVycyBpcyBub3QgYXZhaWxhYmxlLlxuICAgICAgaWYgKCF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFNlbmRlcnMpIHtcbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTZW5kZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGhpcy5fc2VuZGVycyA9IHRoaXMuX3NlbmRlcnMgfHwgW107XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX3NlbmRlcnMuc2xpY2UoKTsgLy8gcmV0dXJuIGEgY29weSBvZiB0aGUgaW50ZXJuYWwgc3RhdGUuXG4gICAgICAgIH07XG4gICAgICAgIHZhciBvcmlnQWRkVHJhY2sgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFRyYWNrO1xuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFRyYWNrID0gZnVuY3Rpb24odHJhY2ssIHN0cmVhbSkge1xuICAgICAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICAgICAgdmFyIHNlbmRlciA9IG9yaWdBZGRUcmFjay5hcHBseShwYywgYXJndW1lbnRzKTtcbiAgICAgICAgICBpZiAoIXNlbmRlcikge1xuICAgICAgICAgICAgc2VuZGVyID0gc2hpbVNlbmRlcldpdGhEdG1mKHBjLCB0cmFjayk7XG4gICAgICAgICAgICBwYy5fc2VuZGVycy5wdXNoKHNlbmRlcik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBzZW5kZXI7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIG9yaWdSZW1vdmVUcmFjayA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlVHJhY2s7XG4gICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlVHJhY2sgPSBmdW5jdGlvbihzZW5kZXIpIHtcbiAgICAgICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgICAgIG9yaWdSZW1vdmVUcmFjay5hcHBseShwYywgYXJndW1lbnRzKTtcbiAgICAgICAgICB2YXIgaWR4ID0gcGMuX3NlbmRlcnMuaW5kZXhPZihzZW5kZXIpO1xuICAgICAgICAgIGlmIChpZHggIT09IC0xKSB7XG4gICAgICAgICAgICBwYy5fc2VuZGVycy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICB2YXIgb3JpZ0FkZFN0cmVhbSA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkU3RyZWFtO1xuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgICAgcGMuX3NlbmRlcnMgPSBwYy5fc2VuZGVycyB8fCBbXTtcbiAgICAgICAgb3JpZ0FkZFN0cmVhbS5hcHBseShwYywgW3N0cmVhbV0pO1xuICAgICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xuICAgICAgICAgIHBjLl9zZW5kZXJzLnB1c2goc2hpbVNlbmRlcldpdGhEdG1mKHBjLCB0cmFjaykpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIHZhciBvcmlnUmVtb3ZlU3RyZWFtID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVTdHJlYW07XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgICBwYy5fc2VuZGVycyA9IHBjLl9zZW5kZXJzIHx8IFtdO1xuICAgICAgICBvcmlnUmVtb3ZlU3RyZWFtLmFwcGx5KHBjLCBbc3RyZWFtXSk7XG5cbiAgICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcbiAgICAgICAgICB2YXIgc2VuZGVyID0gcGMuX3NlbmRlcnMuZmluZChmdW5jdGlvbihzKSB7XG4gICAgICAgICAgICByZXR1cm4gcy50cmFjayA9PT0gdHJhY2s7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKHNlbmRlcikge1xuICAgICAgICAgICAgcGMuX3NlbmRlcnMuc3BsaWNlKHBjLl9zZW5kZXJzLmluZGV4T2Yoc2VuZGVyKSwgMSk7IC8vIHJlbW92ZSBzZW5kZXJcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiAmJlxuICAgICAgICAgICAgICAgJ2dldFNlbmRlcnMnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUgJiZcbiAgICAgICAgICAgICAgICdjcmVhdGVEVE1GU2VuZGVyJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlICYmXG4gICAgICAgICAgICAgICB3aW5kb3cuUlRDUnRwU2VuZGVyICYmXG4gICAgICAgICAgICAgICAhKCdkdG1mJyBpbiB3aW5kb3cuUlRDUnRwU2VuZGVyLnByb3RvdHlwZSkpIHtcbiAgICAgIHZhciBvcmlnR2V0U2VuZGVycyA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U2VuZGVycztcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U2VuZGVycyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgICB2YXIgc2VuZGVycyA9IG9yaWdHZXRTZW5kZXJzLmFwcGx5KHBjLCBbXSk7XG4gICAgICAgIHNlbmRlcnMuZm9yRWFjaChmdW5jdGlvbihzZW5kZXIpIHtcbiAgICAgICAgICBzZW5kZXIuX3BjID0gcGM7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc2VuZGVycztcbiAgICAgIH07XG5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUnRwU2VuZGVyLnByb3RvdHlwZSwgJ2R0bWYnLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX2R0bWYgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMudHJhY2sua2luZCA9PT0gJ2F1ZGlvJykge1xuICAgICAgICAgICAgICB0aGlzLl9kdG1mID0gdGhpcy5fcGMuY3JlYXRlRFRNRlNlbmRlcih0aGlzLnRyYWNrKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuX2R0bWYgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhpcy5fZHRtZjtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIHNoaW1Tb3VyY2VPYmplY3Q6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIHZhciBVUkwgPSB3aW5kb3cgJiYgd2luZG93LlVSTDtcblxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50ICYmXG4gICAgICAgICEoJ3NyY09iamVjdCcgaW4gd2luZG93LkhUTUxNZWRpYUVsZW1lbnQucHJvdG90eXBlKSkge1xuICAgICAgICAvLyBTaGltIHRoZSBzcmNPYmplY3QgcHJvcGVydHksIG9uY2UsIHdoZW4gSFRNTE1lZGlhRWxlbWVudCBpcyBmb3VuZC5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50LnByb3RvdHlwZSwgJ3NyY09iamVjdCcsIHtcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NyY09iamVjdDtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNldDogZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAvLyBVc2UgX3NyY09iamVjdCBhcyBhIHByaXZhdGUgcHJvcGVydHkgZm9yIHRoaXMgc2hpbVxuICAgICAgICAgICAgdGhpcy5fc3JjT2JqZWN0ID0gc3RyZWFtO1xuICAgICAgICAgICAgaWYgKHRoaXMuc3JjKSB7XG4gICAgICAgICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwodGhpcy5zcmMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXN0cmVhbSkge1xuICAgICAgICAgICAgICB0aGlzLnNyYyA9ICcnO1xuICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKHN0cmVhbSk7XG4gICAgICAgICAgICAvLyBXZSBuZWVkIHRvIHJlY3JlYXRlIHRoZSBibG9iIHVybCB3aGVuIGEgdHJhY2sgaXMgYWRkZWQgb3JcbiAgICAgICAgICAgIC8vIHJlbW92ZWQuIERvaW5nIGl0IG1hbnVhbGx5IHNpbmNlIHdlIHdhbnQgdG8gYXZvaWQgYSByZWN1cnNpb24uXG4gICAgICAgICAgICBzdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcignYWRkdHJhY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYgKHNlbGYuc3JjKSB7XG4gICAgICAgICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChzZWxmLnNyYyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2VsZi5zcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKHN0cmVhbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHN0cmVhbS5hZGRFdmVudExpc3RlbmVyKCdyZW1vdmV0cmFjaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBpZiAoc2VsZi5zcmMpIHtcbiAgICAgICAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHNlbGYuc3JjKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzZWxmLnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoc3RyZWFtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHNoaW1BZGRUcmFja1JlbW92ZVRyYWNrV2l0aE5hdGl2ZTogZnVuY3Rpb24od2luZG93KSB7XG4gICAgLy8gc2hpbSBhZGRUcmFjay9yZW1vdmVUcmFjayB3aXRoIG5hdGl2ZSB2YXJpYW50cyBpbiBvcmRlciB0byBtYWtlXG4gICAgLy8gdGhlIGludGVyYWN0aW9ucyB3aXRoIGxlZ2FjeSBnZXRMb2NhbFN0cmVhbXMgYmVoYXZlIGFzIGluIG90aGVyIGJyb3dzZXJzLlxuICAgIC8vIEtlZXBzIGEgbWFwcGluZyBzdHJlYW0uaWQgPT4gW3N0cmVhbSwgcnRwc2VuZGVycy4uLl1cbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldExvY2FsU3RyZWFtcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgIHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMgPSB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zIHx8IHt9O1xuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMpLm1hcChmdW5jdGlvbihzdHJlYW1JZCkge1xuICAgICAgICByZXR1cm4gcGMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtSWRdWzBdO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBvcmlnQWRkVHJhY2sgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFRyYWNrO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2sgPSBmdW5jdGlvbih0cmFjaywgc3RyZWFtKSB7XG4gICAgICBpZiAoIXN0cmVhbSkge1xuICAgICAgICByZXR1cm4gb3JpZ0FkZFRyYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgICB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zID0gdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcyB8fCB7fTtcblxuICAgICAgdmFyIHNlbmRlciA9IG9yaWdBZGRUcmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgaWYgKCF0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbS5pZF0pIHtcbiAgICAgICAgdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW0uaWRdID0gW3N0cmVhbSwgc2VuZGVyXTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW0uaWRdLmluZGV4T2Yoc2VuZGVyKSA9PT0gLTEpIHtcbiAgICAgICAgdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW0uaWRdLnB1c2goc2VuZGVyKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZW5kZXI7XG4gICAgfTtcblxuICAgIHZhciBvcmlnQWRkU3RyZWFtID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRTdHJlYW07XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zID0gdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcyB8fCB7fTtcblxuICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcbiAgICAgICAgdmFyIGFscmVhZHlFeGlzdHMgPSBwYy5nZXRTZW5kZXJzKCkuZmluZChmdW5jdGlvbihzKSB7XG4gICAgICAgICAgcmV0dXJuIHMudHJhY2sgPT09IHRyYWNrO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGFscmVhZHlFeGlzdHMpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKCdUcmFjayBhbHJlYWR5IGV4aXN0cy4nLFxuICAgICAgICAgICAgICAnSW52YWxpZEFjY2Vzc0Vycm9yJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdmFyIGV4aXN0aW5nU2VuZGVycyA9IHBjLmdldFNlbmRlcnMoKTtcbiAgICAgIG9yaWdBZGRTdHJlYW0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIHZhciBuZXdTZW5kZXJzID0gcGMuZ2V0U2VuZGVycygpLmZpbHRlcihmdW5jdGlvbihuZXdTZW5kZXIpIHtcbiAgICAgICAgcmV0dXJuIGV4aXN0aW5nU2VuZGVycy5pbmRleE9mKG5ld1NlbmRlcikgPT09IC0xO1xuICAgICAgfSk7XG4gICAgICB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbS5pZF0gPSBbc3RyZWFtXS5jb25jYXQobmV3U2VuZGVycyk7XG4gICAgfTtcblxuICAgIHZhciBvcmlnUmVtb3ZlU3RyZWFtID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVTdHJlYW07XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgIHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMgPSB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zIHx8IHt9O1xuICAgICAgZGVsZXRlIHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtLmlkXTtcbiAgICAgIHJldHVybiBvcmlnUmVtb3ZlU3RyZWFtLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcblxuICAgIHZhciBvcmlnUmVtb3ZlVHJhY2sgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVRyYWNrO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlVHJhY2sgPSBmdW5jdGlvbihzZW5kZXIpIHtcbiAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zID0gdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcyB8fCB7fTtcbiAgICAgIGlmIChzZW5kZXIpIHtcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcykuZm9yRWFjaChmdW5jdGlvbihzdHJlYW1JZCkge1xuICAgICAgICAgIHZhciBpZHggPSBwYy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW1JZF0uaW5kZXhPZihzZW5kZXIpO1xuICAgICAgICAgIGlmIChpZHggIT09IC0xKSB7XG4gICAgICAgICAgICBwYy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW1JZF0uc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChwYy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW1JZF0ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBkZWxldGUgcGMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtSWRdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gb3JpZ1JlbW92ZVRyYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfSxcblxuICBzaGltQWRkVHJhY2tSZW1vdmVUcmFjazogZnVuY3Rpb24od2luZG93KSB7XG4gICAgdmFyIGJyb3dzZXJEZXRhaWxzID0gdXRpbHMuZGV0ZWN0QnJvd3Nlcih3aW5kb3cpO1xuICAgIC8vIHNoaW0gYWRkVHJhY2sgYW5kIHJlbW92ZVRyYWNrLlxuICAgIGlmICh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFRyYWNrICYmXG4gICAgICAgIGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPj0gNjUpIHtcbiAgICAgIHJldHVybiB0aGlzLnNoaW1BZGRUcmFja1JlbW92ZVRyYWNrV2l0aE5hdGl2ZSh3aW5kb3cpO1xuICAgIH1cblxuICAgIC8vIGFsc28gc2hpbSBwYy5nZXRMb2NhbFN0cmVhbXMgd2hlbiBhZGRUcmFjayBpcyBzaGltbWVkXG4gICAgLy8gdG8gcmV0dXJuIHRoZSBvcmlnaW5hbCBzdHJlYW1zLlxuICAgIHZhciBvcmlnR2V0TG9jYWxTdHJlYW1zID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVxuICAgICAgICAuZ2V0TG9jYWxTdHJlYW1zO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0TG9jYWxTdHJlYW1zID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgdmFyIG5hdGl2ZVN0cmVhbXMgPSBvcmlnR2V0TG9jYWxTdHJlYW1zLmFwcGx5KHRoaXMpO1xuICAgICAgcGMuX3JldmVyc2VTdHJlYW1zID0gcGMuX3JldmVyc2VTdHJlYW1zIHx8IHt9O1xuICAgICAgcmV0dXJuIG5hdGl2ZVN0cmVhbXMubWFwKGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgICByZXR1cm4gcGMuX3JldmVyc2VTdHJlYW1zW3N0cmVhbS5pZF07XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIG9yaWdBZGRTdHJlYW0gPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFN0cmVhbTtcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgIHBjLl9zdHJlYW1zID0gcGMuX3N0cmVhbXMgfHwge307XG4gICAgICBwYy5fcmV2ZXJzZVN0cmVhbXMgPSBwYy5fcmV2ZXJzZVN0cmVhbXMgfHwge307XG5cbiAgICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XG4gICAgICAgIHZhciBhbHJlYWR5RXhpc3RzID0gcGMuZ2V0U2VuZGVycygpLmZpbmQoZnVuY3Rpb24ocykge1xuICAgICAgICAgIHJldHVybiBzLnRyYWNrID09PSB0cmFjaztcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChhbHJlYWR5RXhpc3RzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbignVHJhY2sgYWxyZWFkeSBleGlzdHMuJyxcbiAgICAgICAgICAgICAgJ0ludmFsaWRBY2Nlc3NFcnJvcicpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIC8vIEFkZCBpZGVudGl0eSBtYXBwaW5nIGZvciBjb25zaXN0ZW5jeSB3aXRoIGFkZFRyYWNrLlxuICAgICAgLy8gVW5sZXNzIHRoaXMgaXMgYmVpbmcgdXNlZCB3aXRoIGEgc3RyZWFtIGZyb20gYWRkVHJhY2suXG4gICAgICBpZiAoIXBjLl9yZXZlcnNlU3RyZWFtc1tzdHJlYW0uaWRdKSB7XG4gICAgICAgIHZhciBuZXdTdHJlYW0gPSBuZXcgd2luZG93Lk1lZGlhU3RyZWFtKHN0cmVhbS5nZXRUcmFja3MoKSk7XG4gICAgICAgIHBjLl9zdHJlYW1zW3N0cmVhbS5pZF0gPSBuZXdTdHJlYW07XG4gICAgICAgIHBjLl9yZXZlcnNlU3RyZWFtc1tuZXdTdHJlYW0uaWRdID0gc3RyZWFtO1xuICAgICAgICBzdHJlYW0gPSBuZXdTdHJlYW07XG4gICAgICB9XG4gICAgICBvcmlnQWRkU3RyZWFtLmFwcGx5KHBjLCBbc3RyZWFtXSk7XG4gICAgfTtcblxuICAgIHZhciBvcmlnUmVtb3ZlU3RyZWFtID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVTdHJlYW07XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICBwYy5fc3RyZWFtcyA9IHBjLl9zdHJlYW1zIHx8IHt9O1xuICAgICAgcGMuX3JldmVyc2VTdHJlYW1zID0gcGMuX3JldmVyc2VTdHJlYW1zIHx8IHt9O1xuXG4gICAgICBvcmlnUmVtb3ZlU3RyZWFtLmFwcGx5KHBjLCBbKHBjLl9zdHJlYW1zW3N0cmVhbS5pZF0gfHwgc3RyZWFtKV0pO1xuICAgICAgZGVsZXRlIHBjLl9yZXZlcnNlU3RyZWFtc1socGMuX3N0cmVhbXNbc3RyZWFtLmlkXSA/XG4gICAgICAgICAgcGMuX3N0cmVhbXNbc3RyZWFtLmlkXS5pZCA6IHN0cmVhbS5pZCldO1xuICAgICAgZGVsZXRlIHBjLl9zdHJlYW1zW3N0cmVhbS5pZF07XG4gICAgfTtcblxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2sgPSBmdW5jdGlvbih0cmFjaywgc3RyZWFtKSB7XG4gICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgaWYgKHBjLnNpZ25hbGluZ1N0YXRlID09PSAnY2xvc2VkJykge1xuICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKFxuICAgICAgICAgICdUaGUgUlRDUGVlckNvbm5lY3Rpb25cXCdzIHNpZ25hbGluZ1N0YXRlIGlzIFxcJ2Nsb3NlZFxcJy4nLFxuICAgICAgICAgICdJbnZhbGlkU3RhdGVFcnJvcicpO1xuICAgICAgfVxuICAgICAgdmFyIHN0cmVhbXMgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICBpZiAoc3RyZWFtcy5sZW5ndGggIT09IDEgfHxcbiAgICAgICAgICAhc3RyZWFtc1swXS5nZXRUcmFja3MoKS5maW5kKGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgIHJldHVybiB0ID09PSB0cmFjaztcbiAgICAgICAgICB9KSkge1xuICAgICAgICAvLyB0aGlzIGlzIG5vdCBmdWxseSBjb3JyZWN0IGJ1dCBhbGwgd2UgY2FuIG1hbmFnZSB3aXRob3V0XG4gICAgICAgIC8vIFtbYXNzb2NpYXRlZCBNZWRpYVN0cmVhbXNdXSBpbnRlcm5hbCBzbG90LlxuICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKFxuICAgICAgICAgICdUaGUgYWRhcHRlci5qcyBhZGRUcmFjayBwb2x5ZmlsbCBvbmx5IHN1cHBvcnRzIGEgc2luZ2xlICcgK1xuICAgICAgICAgICcgc3RyZWFtIHdoaWNoIGlzIGFzc29jaWF0ZWQgd2l0aCB0aGUgc3BlY2lmaWVkIHRyYWNrLicsXG4gICAgICAgICAgJ05vdFN1cHBvcnRlZEVycm9yJyk7XG4gICAgICB9XG5cbiAgICAgIHZhciBhbHJlYWR5RXhpc3RzID0gcGMuZ2V0U2VuZGVycygpLmZpbmQoZnVuY3Rpb24ocykge1xuICAgICAgICByZXR1cm4gcy50cmFjayA9PT0gdHJhY2s7XG4gICAgICB9KTtcbiAgICAgIGlmIChhbHJlYWR5RXhpc3RzKSB7XG4gICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oJ1RyYWNrIGFscmVhZHkgZXhpc3RzLicsXG4gICAgICAgICAgICAnSW52YWxpZEFjY2Vzc0Vycm9yJyk7XG4gICAgICB9XG5cbiAgICAgIHBjLl9zdHJlYW1zID0gcGMuX3N0cmVhbXMgfHwge307XG4gICAgICBwYy5fcmV2ZXJzZVN0cmVhbXMgPSBwYy5fcmV2ZXJzZVN0cmVhbXMgfHwge307XG4gICAgICB2YXIgb2xkU3RyZWFtID0gcGMuX3N0cmVhbXNbc3RyZWFtLmlkXTtcbiAgICAgIGlmIChvbGRTdHJlYW0pIHtcbiAgICAgICAgLy8gdGhpcyBpcyB1c2luZyBvZGQgQ2hyb21lIGJlaGF2aW91ciwgdXNlIHdpdGggY2F1dGlvbjpcbiAgICAgICAgLy8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3dlYnJ0Yy9pc3N1ZXMvZGV0YWlsP2lkPTc4MTVcbiAgICAgICAgLy8gTm90ZTogd2UgcmVseSBvbiB0aGUgaGlnaC1sZXZlbCBhZGRUcmFjay9kdG1mIHNoaW0gdG9cbiAgICAgICAgLy8gY3JlYXRlIHRoZSBzZW5kZXIgd2l0aCBhIGR0bWYgc2VuZGVyLlxuICAgICAgICBvbGRTdHJlYW0uYWRkVHJhY2sodHJhY2spO1xuXG4gICAgICAgIC8vIFRyaWdnZXIgT05OIGFzeW5jLlxuICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHBjLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCduZWdvdGlhdGlvbm5lZWRlZCcpKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgbmV3U3RyZWFtID0gbmV3IHdpbmRvdy5NZWRpYVN0cmVhbShbdHJhY2tdKTtcbiAgICAgICAgcGMuX3N0cmVhbXNbc3RyZWFtLmlkXSA9IG5ld1N0cmVhbTtcbiAgICAgICAgcGMuX3JldmVyc2VTdHJlYW1zW25ld1N0cmVhbS5pZF0gPSBzdHJlYW07XG4gICAgICAgIHBjLmFkZFN0cmVhbShuZXdTdHJlYW0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHBjLmdldFNlbmRlcnMoKS5maW5kKGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgcmV0dXJuIHMudHJhY2sgPT09IHRyYWNrO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIHJlcGxhY2UgdGhlIGludGVybmFsIHN0cmVhbSBpZCB3aXRoIHRoZSBleHRlcm5hbCBvbmUgYW5kXG4gICAgLy8gdmljZSB2ZXJzYS5cbiAgICBmdW5jdGlvbiByZXBsYWNlSW50ZXJuYWxTdHJlYW1JZChwYywgZGVzY3JpcHRpb24pIHtcbiAgICAgIHZhciBzZHAgPSBkZXNjcmlwdGlvbi5zZHA7XG4gICAgICBPYmplY3Qua2V5cyhwYy5fcmV2ZXJzZVN0cmVhbXMgfHwgW10pLmZvckVhY2goZnVuY3Rpb24oaW50ZXJuYWxJZCkge1xuICAgICAgICB2YXIgZXh0ZXJuYWxTdHJlYW0gPSBwYy5fcmV2ZXJzZVN0cmVhbXNbaW50ZXJuYWxJZF07XG4gICAgICAgIHZhciBpbnRlcm5hbFN0cmVhbSA9IHBjLl9zdHJlYW1zW2V4dGVybmFsU3RyZWFtLmlkXTtcbiAgICAgICAgc2RwID0gc2RwLnJlcGxhY2UobmV3IFJlZ0V4cChpbnRlcm5hbFN0cmVhbS5pZCwgJ2cnKSxcbiAgICAgICAgICAgIGV4dGVybmFsU3RyZWFtLmlkKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5ldyBSVENTZXNzaW9uRGVzY3JpcHRpb24oe1xuICAgICAgICB0eXBlOiBkZXNjcmlwdGlvbi50eXBlLFxuICAgICAgICBzZHA6IHNkcFxuICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlcGxhY2VFeHRlcm5hbFN0cmVhbUlkKHBjLCBkZXNjcmlwdGlvbikge1xuICAgICAgdmFyIHNkcCA9IGRlc2NyaXB0aW9uLnNkcDtcbiAgICAgIE9iamVjdC5rZXlzKHBjLl9yZXZlcnNlU3RyZWFtcyB8fCBbXSkuZm9yRWFjaChmdW5jdGlvbihpbnRlcm5hbElkKSB7XG4gICAgICAgIHZhciBleHRlcm5hbFN0cmVhbSA9IHBjLl9yZXZlcnNlU3RyZWFtc1tpbnRlcm5hbElkXTtcbiAgICAgICAgdmFyIGludGVybmFsU3RyZWFtID0gcGMuX3N0cmVhbXNbZXh0ZXJuYWxTdHJlYW0uaWRdO1xuICAgICAgICBzZHAgPSBzZHAucmVwbGFjZShuZXcgUmVnRXhwKGV4dGVybmFsU3RyZWFtLmlkLCAnZycpLFxuICAgICAgICAgICAgaW50ZXJuYWxTdHJlYW0uaWQpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbmV3IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbih7XG4gICAgICAgIHR5cGU6IGRlc2NyaXB0aW9uLnR5cGUsXG4gICAgICAgIHNkcDogc2RwXG4gICAgICB9KTtcbiAgICB9XG4gICAgWydjcmVhdGVPZmZlcicsICdjcmVhdGVBbnN3ZXInXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgdmFyIG5hdGl2ZU1ldGhvZCA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXTtcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgdmFyIGlzTGVnYWN5Q2FsbCA9IGFyZ3VtZW50cy5sZW5ndGggJiZcbiAgICAgICAgICAgIHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdmdW5jdGlvbic7XG4gICAgICAgIGlmIChpc0xlZ2FjeUNhbGwpIHtcbiAgICAgICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHBjLCBbXG4gICAgICAgICAgICBmdW5jdGlvbihkZXNjcmlwdGlvbikge1xuICAgICAgICAgICAgICB2YXIgZGVzYyA9IHJlcGxhY2VJbnRlcm5hbFN0cmVhbUlkKHBjLCBkZXNjcmlwdGlvbik7XG4gICAgICAgICAgICAgIGFyZ3NbMF0uYXBwbHkobnVsbCwgW2Rlc2NdKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgaWYgKGFyZ3NbMV0pIHtcbiAgICAgICAgICAgICAgICBhcmdzWzFdLmFwcGx5KG51bGwsIGVycik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGFyZ3VtZW50c1syXVxuICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkocGMsIGFyZ3VtZW50cylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oZGVzY3JpcHRpb24pIHtcbiAgICAgICAgICByZXR1cm4gcmVwbGFjZUludGVybmFsU3RyZWFtSWQocGMsIGRlc2NyaXB0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgdmFyIG9yaWdTZXRMb2NhbERlc2NyaXB0aW9uID1cbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5zZXRMb2NhbERlc2NyaXB0aW9uO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0TG9jYWxEZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCB8fCAhYXJndW1lbnRzWzBdLnR5cGUpIHtcbiAgICAgICAgcmV0dXJuIG9yaWdTZXRMb2NhbERlc2NyaXB0aW9uLmFwcGx5KHBjLCBhcmd1bWVudHMpO1xuICAgICAgfVxuICAgICAgYXJndW1lbnRzWzBdID0gcmVwbGFjZUV4dGVybmFsU3RyZWFtSWQocGMsIGFyZ3VtZW50c1swXSk7XG4gICAgICByZXR1cm4gb3JpZ1NldExvY2FsRGVzY3JpcHRpb24uYXBwbHkocGMsIGFyZ3VtZW50cyk7XG4gICAgfTtcblxuICAgIC8vIFRPRE86IG1hbmdsZSBnZXRTdGF0czogaHR0cHM6Ly93M2MuZ2l0aHViLmlvL3dlYnJ0Yy1zdGF0cy8jZG9tLXJ0Y21lZGlhc3RyZWFtc3RhdHMtc3RyZWFtaWRlbnRpZmllclxuXG4gICAgdmFyIG9yaWdMb2NhbERlc2NyaXB0aW9uID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihcbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSwgJ2xvY2FsRGVzY3JpcHRpb24nKTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSxcbiAgICAgICAgJ2xvY2FsRGVzY3JpcHRpb24nLCB7XG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgZGVzY3JpcHRpb24gPSBvcmlnTG9jYWxEZXNjcmlwdGlvbi5nZXQuYXBwbHkodGhpcyk7XG4gICAgICAgICAgICBpZiAoZGVzY3JpcHRpb24udHlwZSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlcGxhY2VJbnRlcm5hbFN0cmVhbUlkKHBjLCBkZXNjcmlwdGlvbik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlVHJhY2sgPSBmdW5jdGlvbihzZW5kZXIpIHtcbiAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICBpZiAocGMuc2lnbmFsaW5nU3RhdGUgPT09ICdjbG9zZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oXG4gICAgICAgICAgJ1RoZSBSVENQZWVyQ29ubmVjdGlvblxcJ3Mgc2lnbmFsaW5nU3RhdGUgaXMgXFwnY2xvc2VkXFwnLicsXG4gICAgICAgICAgJ0ludmFsaWRTdGF0ZUVycm9yJyk7XG4gICAgICB9XG4gICAgICAvLyBXZSBjYW4gbm90IHlldCBjaGVjayBmb3Igc2VuZGVyIGluc3RhbmNlb2YgUlRDUnRwU2VuZGVyXG4gICAgICAvLyBzaW5jZSB3ZSBzaGltIFJUUFNlbmRlci4gU28gd2UgY2hlY2sgaWYgc2VuZGVyLl9wYyBpcyBzZXQuXG4gICAgICBpZiAoIXNlbmRlci5fcGMpIHtcbiAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbignQXJndW1lbnQgMSBvZiBSVENQZWVyQ29ubmVjdGlvbi5yZW1vdmVUcmFjayAnICtcbiAgICAgICAgICAgICdkb2VzIG5vdCBpbXBsZW1lbnQgaW50ZXJmYWNlIFJUQ1J0cFNlbmRlci4nLCAnVHlwZUVycm9yJyk7XG4gICAgICB9XG4gICAgICB2YXIgaXNMb2NhbCA9IHNlbmRlci5fcGMgPT09IHBjO1xuICAgICAgaWYgKCFpc0xvY2FsKSB7XG4gICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oJ1NlbmRlciB3YXMgbm90IGNyZWF0ZWQgYnkgdGhpcyBjb25uZWN0aW9uLicsXG4gICAgICAgICAgICAnSW52YWxpZEFjY2Vzc0Vycm9yJyk7XG4gICAgICB9XG5cbiAgICAgIC8vIFNlYXJjaCBmb3IgdGhlIG5hdGl2ZSBzdHJlYW0gdGhlIHNlbmRlcnMgdHJhY2sgYmVsb25ncyB0by5cbiAgICAgIHBjLl9zdHJlYW1zID0gcGMuX3N0cmVhbXMgfHwge307XG4gICAgICB2YXIgc3RyZWFtO1xuICAgICAgT2JqZWN0LmtleXMocGMuX3N0cmVhbXMpLmZvckVhY2goZnVuY3Rpb24oc3RyZWFtaWQpIHtcbiAgICAgICAgdmFyIGhhc1RyYWNrID0gcGMuX3N0cmVhbXNbc3RyZWFtaWRdLmdldFRyYWNrcygpLmZpbmQoZnVuY3Rpb24odHJhY2spIHtcbiAgICAgICAgICByZXR1cm4gc2VuZGVyLnRyYWNrID09PSB0cmFjaztcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChoYXNUcmFjaykge1xuICAgICAgICAgIHN0cmVhbSA9IHBjLl9zdHJlYW1zW3N0cmVhbWlkXTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGlmIChzdHJlYW0pIHtcbiAgICAgICAgaWYgKHN0cmVhbS5nZXRUcmFja3MoKS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAvLyBpZiB0aGlzIGlzIHRoZSBsYXN0IHRyYWNrIG9mIHRoZSBzdHJlYW0sIHJlbW92ZSB0aGUgc3RyZWFtLiBUaGlzXG4gICAgICAgICAgLy8gdGFrZXMgY2FyZSBvZiBhbnkgc2hpbW1lZCBfc2VuZGVycy5cbiAgICAgICAgICBwYy5yZW1vdmVTdHJlYW0ocGMuX3JldmVyc2VTdHJlYW1zW3N0cmVhbS5pZF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIHJlbHlpbmcgb24gdGhlIHNhbWUgb2RkIGNocm9tZSBiZWhhdmlvdXIgYXMgYWJvdmUuXG4gICAgICAgICAgc3RyZWFtLnJlbW92ZVRyYWNrKHNlbmRlci50cmFjayk7XG4gICAgICAgIH1cbiAgICAgICAgcGMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ25lZ290aWF0aW9ubmVlZGVkJykpO1xuICAgICAgfVxuICAgIH07XG4gIH0sXG5cbiAgc2hpbVBlZXJDb25uZWN0aW9uOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICB2YXIgYnJvd3NlckRldGFpbHMgPSB1dGlscy5kZXRlY3RCcm93c2VyKHdpbmRvdyk7XG5cbiAgICAvLyBUaGUgUlRDUGVlckNvbm5lY3Rpb24gb2JqZWN0LlxuICAgIGlmICghd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uICYmIHdpbmRvdy53ZWJraXRSVENQZWVyQ29ubmVjdGlvbikge1xuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uID0gZnVuY3Rpb24ocGNDb25maWcsIHBjQ29uc3RyYWludHMpIHtcbiAgICAgICAgLy8gVHJhbnNsYXRlIGljZVRyYW5zcG9ydFBvbGljeSB0byBpY2VUcmFuc3BvcnRzLFxuICAgICAgICAvLyBzZWUgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC93ZWJydGMvaXNzdWVzL2RldGFpbD9pZD00ODY5XG4gICAgICAgIC8vIHRoaXMgd2FzIGZpeGVkIGluIE01NiBhbG9uZyB3aXRoIHVucHJlZml4aW5nIFJUQ1BlZXJDb25uZWN0aW9uLlxuICAgICAgICBsb2dnaW5nKCdQZWVyQ29ubmVjdGlvbicpO1xuICAgICAgICBpZiAocGNDb25maWcgJiYgcGNDb25maWcuaWNlVHJhbnNwb3J0UG9saWN5KSB7XG4gICAgICAgICAgcGNDb25maWcuaWNlVHJhbnNwb3J0cyA9IHBjQ29uZmlnLmljZVRyYW5zcG9ydFBvbGljeTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgd2luZG93LndlYmtpdFJUQ1BlZXJDb25uZWN0aW9uKHBjQ29uZmlnLCBwY0NvbnN0cmFpbnRzKTtcbiAgICAgIH07XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlID1cbiAgICAgICAgICB3aW5kb3cud2Via2l0UlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlO1xuICAgICAgLy8gd3JhcCBzdGF0aWMgbWV0aG9kcy4gQ3VycmVudGx5IGp1c3QgZ2VuZXJhdGVDZXJ0aWZpY2F0ZS5cbiAgICAgIGlmICh3aW5kb3cud2Via2l0UlRDUGVlckNvbm5lY3Rpb24uZ2VuZXJhdGVDZXJ0aWZpY2F0ZSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLCAnZ2VuZXJhdGVDZXJ0aWZpY2F0ZScsIHtcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy53ZWJraXRSVENQZWVyQ29ubmVjdGlvbi5nZW5lcmF0ZUNlcnRpZmljYXRlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIG1pZ3JhdGUgZnJvbSBub24tc3BlYyBSVENJY2VTZXJ2ZXIudXJsIHRvIFJUQ0ljZVNlcnZlci51cmxzXG4gICAgICB2YXIgT3JpZ1BlZXJDb25uZWN0aW9uID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uO1xuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uID0gZnVuY3Rpb24ocGNDb25maWcsIHBjQ29uc3RyYWludHMpIHtcbiAgICAgICAgaWYgKHBjQ29uZmlnICYmIHBjQ29uZmlnLmljZVNlcnZlcnMpIHtcbiAgICAgICAgICB2YXIgbmV3SWNlU2VydmVycyA9IFtdO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGNDb25maWcuaWNlU2VydmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHNlcnZlciA9IHBjQ29uZmlnLmljZVNlcnZlcnNbaV07XG4gICAgICAgICAgICBpZiAoIXNlcnZlci5oYXNPd25Qcm9wZXJ0eSgndXJscycpICYmXG4gICAgICAgICAgICAgICAgc2VydmVyLmhhc093blByb3BlcnR5KCd1cmwnKSkge1xuICAgICAgICAgICAgICB1dGlscy5kZXByZWNhdGVkKCdSVENJY2VTZXJ2ZXIudXJsJywgJ1JUQ0ljZVNlcnZlci51cmxzJyk7XG4gICAgICAgICAgICAgIHNlcnZlciA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoc2VydmVyKSk7XG4gICAgICAgICAgICAgIHNlcnZlci51cmxzID0gc2VydmVyLnVybDtcbiAgICAgICAgICAgICAgbmV3SWNlU2VydmVycy5wdXNoKHNlcnZlcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBuZXdJY2VTZXJ2ZXJzLnB1c2gocGNDb25maWcuaWNlU2VydmVyc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHBjQ29uZmlnLmljZVNlcnZlcnMgPSBuZXdJY2VTZXJ2ZXJzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgT3JpZ1BlZXJDb25uZWN0aW9uKHBjQ29uZmlnLCBwY0NvbnN0cmFpbnRzKTtcbiAgICAgIH07XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlID0gT3JpZ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZTtcbiAgICAgIC8vIHdyYXAgc3RhdGljIG1ldGhvZHMuIEN1cnJlbnRseSBqdXN0IGdlbmVyYXRlQ2VydGlmaWNhdGUuXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLCAnZ2VuZXJhdGVDZXJ0aWZpY2F0ZScsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gT3JpZ1BlZXJDb25uZWN0aW9uLmdlbmVyYXRlQ2VydGlmaWNhdGU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhciBvcmlnR2V0U3RhdHMgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFN0YXRzO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U3RhdHMgPSBmdW5jdGlvbihzZWxlY3RvcixcbiAgICAgICAgc3VjY2Vzc0NhbGxiYWNrLCBlcnJvckNhbGxiYWNrKSB7XG4gICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG5cbiAgICAgIC8vIElmIHNlbGVjdG9yIGlzIGEgZnVuY3Rpb24gdGhlbiB3ZSBhcmUgaW4gdGhlIG9sZCBzdHlsZSBzdGF0cyBzbyBqdXN0XG4gICAgICAvLyBwYXNzIGJhY2sgdGhlIG9yaWdpbmFsIGdldFN0YXRzIGZvcm1hdCB0byBhdm9pZCBicmVha2luZyBvbGQgdXNlcnMuXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgdHlwZW9mIHNlbGVjdG9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBvcmlnR2V0U3RhdHMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgLy8gV2hlbiBzcGVjLXN0eWxlIGdldFN0YXRzIGlzIHN1cHBvcnRlZCwgcmV0dXJuIHRob3NlIHdoZW4gY2FsbGVkIHdpdGhcbiAgICAgIC8vIGVpdGhlciBubyBhcmd1bWVudHMgb3IgdGhlIHNlbGVjdG9yIGFyZ3VtZW50IGlzIG51bGwuXG4gICAgICBpZiAob3JpZ0dldFN0YXRzLmxlbmd0aCA9PT0gMCAmJiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCB8fFxuICAgICAgICAgIHR5cGVvZiBhcmd1bWVudHNbMF0gIT09ICdmdW5jdGlvbicpKSB7XG4gICAgICAgIHJldHVybiBvcmlnR2V0U3RhdHMuYXBwbHkodGhpcywgW10pO1xuICAgICAgfVxuXG4gICAgICB2YXIgZml4Q2hyb21lU3RhdHNfID0gZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgdmFyIHN0YW5kYXJkUmVwb3J0ID0ge307XG4gICAgICAgIHZhciByZXBvcnRzID0gcmVzcG9uc2UucmVzdWx0KCk7XG4gICAgICAgIHJlcG9ydHMuZm9yRWFjaChmdW5jdGlvbihyZXBvcnQpIHtcbiAgICAgICAgICB2YXIgc3RhbmRhcmRTdGF0cyA9IHtcbiAgICAgICAgICAgIGlkOiByZXBvcnQuaWQsXG4gICAgICAgICAgICB0aW1lc3RhbXA6IHJlcG9ydC50aW1lc3RhbXAsXG4gICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgIGxvY2FsY2FuZGlkYXRlOiAnbG9jYWwtY2FuZGlkYXRlJyxcbiAgICAgICAgICAgICAgcmVtb3RlY2FuZGlkYXRlOiAncmVtb3RlLWNhbmRpZGF0ZSdcbiAgICAgICAgICAgIH1bcmVwb3J0LnR5cGVdIHx8IHJlcG9ydC50eXBlXG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXBvcnQubmFtZXMoKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgICAgIHN0YW5kYXJkU3RhdHNbbmFtZV0gPSByZXBvcnQuc3RhdChuYW1lKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBzdGFuZGFyZFJlcG9ydFtzdGFuZGFyZFN0YXRzLmlkXSA9IHN0YW5kYXJkU3RhdHM7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzdGFuZGFyZFJlcG9ydDtcbiAgICAgIH07XG5cbiAgICAgIC8vIHNoaW0gZ2V0U3RhdHMgd2l0aCBtYXBsaWtlIHN1cHBvcnRcbiAgICAgIHZhciBtYWtlTWFwU3RhdHMgPSBmdW5jdGlvbihzdGF0cykge1xuICAgICAgICByZXR1cm4gbmV3IE1hcChPYmplY3Qua2V5cyhzdGF0cykubWFwKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgIHJldHVybiBba2V5LCBzdGF0c1trZXldXTtcbiAgICAgICAgfSkpO1xuICAgICAgfTtcblxuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gMikge1xuICAgICAgICB2YXIgc3VjY2Vzc0NhbGxiYWNrV3JhcHBlcl8gPSBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgIGFyZ3NbMV0obWFrZU1hcFN0YXRzKGZpeENocm9tZVN0YXRzXyhyZXNwb25zZSkpKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gb3JpZ0dldFN0YXRzLmFwcGx5KHRoaXMsIFtzdWNjZXNzQ2FsbGJhY2tXcmFwcGVyXyxcbiAgICAgICAgICBhcmd1bWVudHNbMF1dKTtcbiAgICAgIH1cblxuICAgICAgLy8gcHJvbWlzZS1zdXBwb3J0XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIG9yaWdHZXRTdGF0cy5hcHBseShwYywgW1xuICAgICAgICAgIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXNvbHZlKG1ha2VNYXBTdGF0cyhmaXhDaHJvbWVTdGF0c18ocmVzcG9uc2UpKSk7XG4gICAgICAgICAgfSwgcmVqZWN0XSk7XG4gICAgICB9KS50aGVuKHN1Y2Nlc3NDYWxsYmFjaywgZXJyb3JDYWxsYmFjayk7XG4gICAgfTtcblxuICAgIC8vIGFkZCBwcm9taXNlIHN1cHBvcnQgLS0gbmF0aXZlbHkgYXZhaWxhYmxlIGluIENocm9tZSA1MVxuICAgIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgNTEpIHtcbiAgICAgIFsnc2V0TG9jYWxEZXNjcmlwdGlvbicsICdzZXRSZW1vdGVEZXNjcmlwdGlvbicsICdhZGRJY2VDYW5kaWRhdGUnXVxuICAgICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgICAgICAgdmFyIG5hdGl2ZU1ldGhvZCA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXTtcbiAgICAgICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgICAgICAgICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICBuYXRpdmVNZXRob2QuYXBwbHkocGMsIFthcmdzWzBdLCByZXNvbHZlLCByZWplY3RdKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGFyZ3NbMV0uYXBwbHkobnVsbCwgW10pO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPj0gMykge1xuICAgICAgICAgICAgICAgICAgYXJnc1syXS5hcHBseShudWxsLCBbZXJyXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gcHJvbWlzZSBzdXBwb3J0IGZvciBjcmVhdGVPZmZlciBhbmQgY3JlYXRlQW5zd2VyLiBBdmFpbGFibGUgKHdpdGhvdXRcbiAgICAvLyBidWdzKSBzaW5jZSBNNTI6IGNyYnVnLzYxOTI4OVxuICAgIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgNTIpIHtcbiAgICAgIFsnY3JlYXRlT2ZmZXInLCAnY3JlYXRlQW5zd2VyJ10uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgICAgdmFyIG5hdGl2ZU1ldGhvZCA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXTtcbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDEgfHwgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiZcbiAgICAgICAgICAgICAgdHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ29iamVjdCcpKSB7XG4gICAgICAgICAgICB2YXIgb3B0cyA9IGFyZ3VtZW50cy5sZW5ndGggPT09IDEgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgIG5hdGl2ZU1ldGhvZC5hcHBseShwYywgW3Jlc29sdmUsIHJlamVjdCwgb3B0c10pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIHNoaW0gaW1wbGljaXQgY3JlYXRpb24gb2YgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uL1JUQ0ljZUNhbmRpZGF0ZVxuICAgIFsnc2V0TG9jYWxEZXNjcmlwdGlvbicsICdzZXRSZW1vdGVEZXNjcmlwdGlvbicsICdhZGRJY2VDYW5kaWRhdGUnXVxuICAgICAgICAuZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgICAgICB2YXIgbmF0aXZlTWV0aG9kID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdO1xuICAgICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYXJndW1lbnRzWzBdID0gbmV3ICgobWV0aG9kID09PSAnYWRkSWNlQ2FuZGlkYXRlJykgP1xuICAgICAgICAgICAgICAgIHdpbmRvdy5SVENJY2VDYW5kaWRhdGUgOlxuICAgICAgICAgICAgICAgIHdpbmRvdy5SVENTZXNzaW9uRGVzY3JpcHRpb24pKGFyZ3VtZW50c1swXSk7XG4gICAgICAgICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAvLyBzdXBwb3J0IGZvciBhZGRJY2VDYW5kaWRhdGUobnVsbCBvciB1bmRlZmluZWQpXG4gICAgdmFyIG5hdGl2ZUFkZEljZUNhbmRpZGF0ZSA9XG4gICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkSWNlQ2FuZGlkYXRlO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkSWNlQ2FuZGlkYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50c1swXSkge1xuICAgICAgICBpZiAoYXJndW1lbnRzWzFdKSB7XG4gICAgICAgICAgYXJndW1lbnRzWzFdLmFwcGx5KG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuYXRpdmVBZGRJY2VDYW5kaWRhdGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG59O1xuXG59LHtcIi4uL3V0aWxzLmpzXCI6MTMsXCIuL2dldHVzZXJtZWRpYVwiOjZ9XSw2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8qXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXG4gKiAgdHJlZS5cbiAqL1xuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xuJ3VzZSBzdHJpY3QnO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMuanMnKTtcbnZhciBsb2dnaW5nID0gdXRpbHMubG9nO1xuXG4vLyBFeHBvc2UgcHVibGljIG1ldGhvZHMuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHdpbmRvdykge1xuICB2YXIgYnJvd3NlckRldGFpbHMgPSB1dGlscy5kZXRlY3RCcm93c2VyKHdpbmRvdyk7XG4gIHZhciBuYXZpZ2F0b3IgPSB3aW5kb3cgJiYgd2luZG93Lm5hdmlnYXRvcjtcblxuICB2YXIgY29uc3RyYWludHNUb0Nocm9tZV8gPSBmdW5jdGlvbihjKSB7XG4gICAgaWYgKHR5cGVvZiBjICE9PSAnb2JqZWN0JyB8fCBjLm1hbmRhdG9yeSB8fCBjLm9wdGlvbmFsKSB7XG4gICAgICByZXR1cm4gYztcbiAgICB9XG4gICAgdmFyIGNjID0ge307XG4gICAgT2JqZWN0LmtleXMoYykuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICAgIGlmIChrZXkgPT09ICdyZXF1aXJlJyB8fCBrZXkgPT09ICdhZHZhbmNlZCcgfHwga2V5ID09PSAnbWVkaWFTb3VyY2UnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciByID0gKHR5cGVvZiBjW2tleV0gPT09ICdvYmplY3QnKSA/IGNba2V5XSA6IHtpZGVhbDogY1trZXldfTtcbiAgICAgIGlmIChyLmV4YWN0ICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIHIuZXhhY3QgPT09ICdudW1iZXInKSB7XG4gICAgICAgIHIubWluID0gci5tYXggPSByLmV4YWN0O1xuICAgICAgfVxuICAgICAgdmFyIG9sZG5hbWVfID0gZnVuY3Rpb24ocHJlZml4LCBuYW1lKSB7XG4gICAgICAgIGlmIChwcmVmaXgpIHtcbiAgICAgICAgICByZXR1cm4gcHJlZml4ICsgbmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIG5hbWUuc2xpY2UoMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChuYW1lID09PSAnZGV2aWNlSWQnKSA/ICdzb3VyY2VJZCcgOiBuYW1lO1xuICAgICAgfTtcbiAgICAgIGlmIChyLmlkZWFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY2Mub3B0aW9uYWwgPSBjYy5vcHRpb25hbCB8fCBbXTtcbiAgICAgICAgdmFyIG9jID0ge307XG4gICAgICAgIGlmICh0eXBlb2Ygci5pZGVhbCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICBvY1tvbGRuYW1lXygnbWluJywga2V5KV0gPSByLmlkZWFsO1xuICAgICAgICAgIGNjLm9wdGlvbmFsLnB1c2gob2MpO1xuICAgICAgICAgIG9jID0ge307XG4gICAgICAgICAgb2Nbb2xkbmFtZV8oJ21heCcsIGtleSldID0gci5pZGVhbDtcbiAgICAgICAgICBjYy5vcHRpb25hbC5wdXNoKG9jKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvY1tvbGRuYW1lXygnJywga2V5KV0gPSByLmlkZWFsO1xuICAgICAgICAgIGNjLm9wdGlvbmFsLnB1c2gob2MpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoci5leGFjdCAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiByLmV4YWN0ICE9PSAnbnVtYmVyJykge1xuICAgICAgICBjYy5tYW5kYXRvcnkgPSBjYy5tYW5kYXRvcnkgfHwge307XG4gICAgICAgIGNjLm1hbmRhdG9yeVtvbGRuYW1lXygnJywga2V5KV0gPSByLmV4YWN0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgWydtaW4nLCAnbWF4J10uZm9yRWFjaChmdW5jdGlvbihtaXgpIHtcbiAgICAgICAgICBpZiAoclttaXhdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNjLm1hbmRhdG9yeSA9IGNjLm1hbmRhdG9yeSB8fCB7fTtcbiAgICAgICAgICAgIGNjLm1hbmRhdG9yeVtvbGRuYW1lXyhtaXgsIGtleSldID0gclttaXhdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGMuYWR2YW5jZWQpIHtcbiAgICAgIGNjLm9wdGlvbmFsID0gKGNjLm9wdGlvbmFsIHx8IFtdKS5jb25jYXQoYy5hZHZhbmNlZCk7XG4gICAgfVxuICAgIHJldHVybiBjYztcbiAgfTtcblxuICB2YXIgc2hpbUNvbnN0cmFpbnRzXyA9IGZ1bmN0aW9uKGNvbnN0cmFpbnRzLCBmdW5jKSB7XG4gICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPj0gNjEpIHtcbiAgICAgIHJldHVybiBmdW5jKGNvbnN0cmFpbnRzKTtcbiAgICB9XG4gICAgY29uc3RyYWludHMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGNvbnN0cmFpbnRzKSk7XG4gICAgaWYgKGNvbnN0cmFpbnRzICYmIHR5cGVvZiBjb25zdHJhaW50cy5hdWRpbyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHZhciByZW1hcCA9IGZ1bmN0aW9uKG9iaiwgYSwgYikge1xuICAgICAgICBpZiAoYSBpbiBvYmogJiYgIShiIGluIG9iaikpIHtcbiAgICAgICAgICBvYmpbYl0gPSBvYmpbYV07XG4gICAgICAgICAgZGVsZXRlIG9ialthXTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGNvbnN0cmFpbnRzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShjb25zdHJhaW50cykpO1xuICAgICAgcmVtYXAoY29uc3RyYWludHMuYXVkaW8sICdhdXRvR2FpbkNvbnRyb2wnLCAnZ29vZ0F1dG9HYWluQ29udHJvbCcpO1xuICAgICAgcmVtYXAoY29uc3RyYWludHMuYXVkaW8sICdub2lzZVN1cHByZXNzaW9uJywgJ2dvb2dOb2lzZVN1cHByZXNzaW9uJyk7XG4gICAgICBjb25zdHJhaW50cy5hdWRpbyA9IGNvbnN0cmFpbnRzVG9DaHJvbWVfKGNvbnN0cmFpbnRzLmF1ZGlvKTtcbiAgICB9XG4gICAgaWYgKGNvbnN0cmFpbnRzICYmIHR5cGVvZiBjb25zdHJhaW50cy52aWRlbyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIC8vIFNoaW0gZmFjaW5nTW9kZSBmb3IgbW9iaWxlICYgc3VyZmFjZSBwcm8uXG4gICAgICB2YXIgZmFjZSA9IGNvbnN0cmFpbnRzLnZpZGVvLmZhY2luZ01vZGU7XG4gICAgICBmYWNlID0gZmFjZSAmJiAoKHR5cGVvZiBmYWNlID09PSAnb2JqZWN0JykgPyBmYWNlIDoge2lkZWFsOiBmYWNlfSk7XG4gICAgICB2YXIgZ2V0U3VwcG9ydGVkRmFjaW5nTW9kZUxpZXMgPSBicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgNjY7XG5cbiAgICAgIGlmICgoZmFjZSAmJiAoZmFjZS5leGFjdCA9PT0gJ3VzZXInIHx8IGZhY2UuZXhhY3QgPT09ICdlbnZpcm9ubWVudCcgfHxcbiAgICAgICAgICAgICAgICAgICAgZmFjZS5pZGVhbCA9PT0gJ3VzZXInIHx8IGZhY2UuaWRlYWwgPT09ICdlbnZpcm9ubWVudCcpKSAmJlxuICAgICAgICAgICEobmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRTdXBwb3J0ZWRDb25zdHJhaW50cyAmJlxuICAgICAgICAgICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRTdXBwb3J0ZWRDb25zdHJhaW50cygpLmZhY2luZ01vZGUgJiZcbiAgICAgICAgICAgICFnZXRTdXBwb3J0ZWRGYWNpbmdNb2RlTGllcykpIHtcbiAgICAgICAgZGVsZXRlIGNvbnN0cmFpbnRzLnZpZGVvLmZhY2luZ01vZGU7XG4gICAgICAgIHZhciBtYXRjaGVzO1xuICAgICAgICBpZiAoZmFjZS5leGFjdCA9PT0gJ2Vudmlyb25tZW50JyB8fCBmYWNlLmlkZWFsID09PSAnZW52aXJvbm1lbnQnKSB7XG4gICAgICAgICAgbWF0Y2hlcyA9IFsnYmFjaycsICdyZWFyJ107XG4gICAgICAgIH0gZWxzZSBpZiAoZmFjZS5leGFjdCA9PT0gJ3VzZXInIHx8IGZhY2UuaWRlYWwgPT09ICd1c2VyJykge1xuICAgICAgICAgIG1hdGNoZXMgPSBbJ2Zyb250J107XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgICAgICAvLyBMb29rIGZvciBtYXRjaGVzIGluIGxhYmVsLCBvciB1c2UgbGFzdCBjYW0gZm9yIGJhY2sgKHR5cGljYWwpLlxuICAgICAgICAgIHJldHVybiBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmVudW1lcmF0ZURldmljZXMoKVxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGRldmljZXMpIHtcbiAgICAgICAgICAgIGRldmljZXMgPSBkZXZpY2VzLmZpbHRlcihmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgIHJldHVybiBkLmtpbmQgPT09ICd2aWRlb2lucHV0JztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIGRldiA9IGRldmljZXMuZmluZChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgIHJldHVybiBtYXRjaGVzLnNvbWUoZnVuY3Rpb24obWF0Y2gpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5sYWJlbC50b0xvd2VyQ2FzZSgpLmluZGV4T2YobWF0Y2gpICE9PSAtMTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghZGV2ICYmIGRldmljZXMubGVuZ3RoICYmIG1hdGNoZXMuaW5kZXhPZignYmFjaycpICE9PSAtMSkge1xuICAgICAgICAgICAgICBkZXYgPSBkZXZpY2VzW2RldmljZXMubGVuZ3RoIC0gMV07IC8vIG1vcmUgbGlrZWx5IHRoZSBiYWNrIGNhbVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRldikge1xuICAgICAgICAgICAgICBjb25zdHJhaW50cy52aWRlby5kZXZpY2VJZCA9IGZhY2UuZXhhY3QgPyB7ZXhhY3Q6IGRldi5kZXZpY2VJZH0gOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aWRlYWw6IGRldi5kZXZpY2VJZH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdHJhaW50cy52aWRlbyA9IGNvbnN0cmFpbnRzVG9DaHJvbWVfKGNvbnN0cmFpbnRzLnZpZGVvKTtcbiAgICAgICAgICAgIGxvZ2dpbmcoJ2Nocm9tZTogJyArIEpTT04uc3RyaW5naWZ5KGNvbnN0cmFpbnRzKSk7XG4gICAgICAgICAgICByZXR1cm4gZnVuYyhjb25zdHJhaW50cyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnN0cmFpbnRzLnZpZGVvID0gY29uc3RyYWludHNUb0Nocm9tZV8oY29uc3RyYWludHMudmlkZW8pO1xuICAgIH1cbiAgICBsb2dnaW5nKCdjaHJvbWU6ICcgKyBKU09OLnN0cmluZ2lmeShjb25zdHJhaW50cykpO1xuICAgIHJldHVybiBmdW5jKGNvbnN0cmFpbnRzKTtcbiAgfTtcblxuICB2YXIgc2hpbUVycm9yXyA9IGZ1bmN0aW9uKGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZToge1xuICAgICAgICBQZXJtaXNzaW9uRGVuaWVkRXJyb3I6ICdOb3RBbGxvd2VkRXJyb3InLFxuICAgICAgICBQZXJtaXNzaW9uRGlzbWlzc2VkRXJyb3I6ICdOb3RBbGxvd2VkRXJyb3InLFxuICAgICAgICBJbnZhbGlkU3RhdGVFcnJvcjogJ05vdEFsbG93ZWRFcnJvcicsXG4gICAgICAgIERldmljZXNOb3RGb3VuZEVycm9yOiAnTm90Rm91bmRFcnJvcicsXG4gICAgICAgIENvbnN0cmFpbnROb3RTYXRpc2ZpZWRFcnJvcjogJ092ZXJjb25zdHJhaW5lZEVycm9yJyxcbiAgICAgICAgVHJhY2tTdGFydEVycm9yOiAnTm90UmVhZGFibGVFcnJvcicsXG4gICAgICAgIE1lZGlhRGV2aWNlRmFpbGVkRHVlVG9TaHV0ZG93bjogJ05vdEFsbG93ZWRFcnJvcicsXG4gICAgICAgIE1lZGlhRGV2aWNlS2lsbFN3aXRjaE9uOiAnTm90QWxsb3dlZEVycm9yJyxcbiAgICAgICAgVGFiQ2FwdHVyZUVycm9yOiAnQWJvcnRFcnJvcicsXG4gICAgICAgIFNjcmVlbkNhcHR1cmVFcnJvcjogJ0Fib3J0RXJyb3InLFxuICAgICAgICBEZXZpY2VDYXB0dXJlRXJyb3I6ICdBYm9ydEVycm9yJ1xuICAgICAgfVtlLm5hbWVdIHx8IGUubmFtZSxcbiAgICAgIG1lc3NhZ2U6IGUubWVzc2FnZSxcbiAgICAgIGNvbnN0cmFpbnQ6IGUuY29uc3RyYWludE5hbWUsXG4gICAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWUgKyAodGhpcy5tZXNzYWdlICYmICc6ICcpICsgdGhpcy5tZXNzYWdlO1xuICAgICAgfVxuICAgIH07XG4gIH07XG5cbiAgdmFyIGdldFVzZXJNZWRpYV8gPSBmdW5jdGlvbihjb25zdHJhaW50cywgb25TdWNjZXNzLCBvbkVycm9yKSB7XG4gICAgc2hpbUNvbnN0cmFpbnRzXyhjb25zdHJhaW50cywgZnVuY3Rpb24oYykge1xuICAgICAgbmF2aWdhdG9yLndlYmtpdEdldFVzZXJNZWRpYShjLCBvblN1Y2Nlc3MsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKG9uRXJyb3IpIHtcbiAgICAgICAgICBvbkVycm9yKHNoaW1FcnJvcl8oZSkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhID0gZ2V0VXNlck1lZGlhXztcblxuICAvLyBSZXR1cm5zIHRoZSByZXN1bHQgb2YgZ2V0VXNlck1lZGlhIGFzIGEgUHJvbWlzZS5cbiAgdmFyIGdldFVzZXJNZWRpYVByb21pc2VfID0gZnVuY3Rpb24oY29uc3RyYWludHMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzLCByZXNvbHZlLCByZWplY3QpO1xuICAgIH0pO1xuICB9O1xuXG4gIGlmICghbmF2aWdhdG9yLm1lZGlhRGV2aWNlcykge1xuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMgPSB7XG4gICAgICBnZXRVc2VyTWVkaWE6IGdldFVzZXJNZWRpYVByb21pc2VfLFxuICAgICAgZW51bWVyYXRlRGV2aWNlczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICAgICAgdmFyIGtpbmRzID0ge2F1ZGlvOiAnYXVkaW9pbnB1dCcsIHZpZGVvOiAndmlkZW9pbnB1dCd9O1xuICAgICAgICAgIHJldHVybiB3aW5kb3cuTWVkaWFTdHJlYW1UcmFjay5nZXRTb3VyY2VzKGZ1bmN0aW9uKGRldmljZXMpIHtcbiAgICAgICAgICAgIHJlc29sdmUoZGV2aWNlcy5tYXAoZnVuY3Rpb24oZGV2aWNlKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7bGFiZWw6IGRldmljZS5sYWJlbCxcbiAgICAgICAgICAgICAgICBraW5kOiBraW5kc1tkZXZpY2Uua2luZF0sXG4gICAgICAgICAgICAgICAgZGV2aWNlSWQ6IGRldmljZS5pZCxcbiAgICAgICAgICAgICAgICBncm91cElkOiAnJ307XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGdldFN1cHBvcnRlZENvbnN0cmFpbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBkZXZpY2VJZDogdHJ1ZSwgZWNob0NhbmNlbGxhdGlvbjogdHJ1ZSwgZmFjaW5nTW9kZTogdHJ1ZSxcbiAgICAgICAgICBmcmFtZVJhdGU6IHRydWUsIGhlaWdodDogdHJ1ZSwgd2lkdGg6IHRydWVcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gQSBzaGltIGZvciBnZXRVc2VyTWVkaWEgbWV0aG9kIG9uIHRoZSBtZWRpYURldmljZXMgb2JqZWN0LlxuICAvLyBUT0RPKEthcHRlbkphbnNzb24pIHJlbW92ZSBvbmNlIGltcGxlbWVudGVkIGluIENocm9tZSBzdGFibGUuXG4gIGlmICghbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEpIHtcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSA9IGZ1bmN0aW9uKGNvbnN0cmFpbnRzKSB7XG4gICAgICByZXR1cm4gZ2V0VXNlck1lZGlhUHJvbWlzZV8oY29uc3RyYWludHMpO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgLy8gRXZlbiB0aG91Z2ggQ2hyb21lIDQ1IGhhcyBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzIGFuZCBhIGdldFVzZXJNZWRpYVxuICAgIC8vIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYSBQcm9taXNlLCBpdCBkb2VzIG5vdCBhY2NlcHQgc3BlYy1zdHlsZVxuICAgIC8vIGNvbnN0cmFpbnRzLlxuICAgIHZhciBvcmlnR2V0VXNlck1lZGlhID0gbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEuXG4gICAgICAgIGJpbmQobmF2aWdhdG9yLm1lZGlhRGV2aWNlcyk7XG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEgPSBmdW5jdGlvbihjcykge1xuICAgICAgcmV0dXJuIHNoaW1Db25zdHJhaW50c18oY3MsIGZ1bmN0aW9uKGMpIHtcbiAgICAgICAgcmV0dXJuIG9yaWdHZXRVc2VyTWVkaWEoYykudGhlbihmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgICAgICBpZiAoYy5hdWRpbyAmJiAhc3RyZWFtLmdldEF1ZGlvVHJhY2tzKCkubGVuZ3RoIHx8XG4gICAgICAgICAgICAgIGMudmlkZW8gJiYgIXN0cmVhbS5nZXRWaWRlb1RyYWNrcygpLmxlbmd0aCkge1xuICAgICAgICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcbiAgICAgICAgICAgICAgdHJhY2suc3RvcCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKCcnLCAnTm90Rm91bmRFcnJvcicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gc3RyZWFtO1xuICAgICAgICB9LCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHNoaW1FcnJvcl8oZSkpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cblxuICAvLyBEdW1teSBkZXZpY2VjaGFuZ2UgZXZlbnQgbWV0aG9kcy5cbiAgLy8gVE9ETyhLYXB0ZW5KYW5zc29uKSByZW1vdmUgb25jZSBpbXBsZW1lbnRlZCBpbiBDaHJvbWUgc3RhYmxlLlxuICBpZiAodHlwZW9mIG5hdmlnYXRvci5tZWRpYURldmljZXMuYWRkRXZlbnRMaXN0ZW5lciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIGxvZ2dpbmcoJ0R1bW15IG1lZGlhRGV2aWNlcy5hZGRFdmVudExpc3RlbmVyIGNhbGxlZC4nKTtcbiAgICB9O1xuICB9XG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5yZW1vdmVFdmVudExpc3RlbmVyID09PSAndW5kZWZpbmVkJykge1xuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xuICAgICAgbG9nZ2luZygnRHVtbXkgbWVkaWFEZXZpY2VzLnJlbW92ZUV2ZW50TGlzdGVuZXIgY2FsbGVkLicpO1xuICAgIH07XG4gIH1cbn07XG5cbn0se1wiLi4vdXRpbHMuanNcIjoxM31dLDc6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLypcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTcgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcbiAqICB0cmVlLlxuICovXG4gLyogZXNsaW50LWVudiBub2RlICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBTRFBVdGlscyA9IHJlcXVpcmUoJ3NkcCcpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2hpbVJUQ0ljZUNhbmRpZGF0ZTogZnVuY3Rpb24od2luZG93KSB7XG4gICAgLy8gZm91bmRhdGlvbiBpcyBhcmJpdHJhcmlseSBjaG9zZW4gYXMgYW4gaW5kaWNhdG9yIGZvciBmdWxsIHN1cHBvcnQgZm9yXG4gICAgLy8gaHR0cHM6Ly93M2MuZ2l0aHViLmlvL3dlYnJ0Yy1wYy8jcnRjaWNlY2FuZGlkYXRlLWludGVyZmFjZVxuICAgIGlmICghd2luZG93LlJUQ0ljZUNhbmRpZGF0ZSB8fCAod2luZG93LlJUQ0ljZUNhbmRpZGF0ZSAmJiAnZm91bmRhdGlvbicgaW5cbiAgICAgICAgd2luZG93LlJUQ0ljZUNhbmRpZGF0ZS5wcm90b3R5cGUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIE5hdGl2ZVJUQ0ljZUNhbmRpZGF0ZSA9IHdpbmRvdy5SVENJY2VDYW5kaWRhdGU7XG4gICAgd2luZG93LlJUQ0ljZUNhbmRpZGF0ZSA9IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICAgIC8vIFJlbW92ZSB0aGUgYT0gd2hpY2ggc2hvdWxkbid0IGJlIHBhcnQgb2YgdGhlIGNhbmRpZGF0ZSBzdHJpbmcuXG4gICAgICBpZiAodHlwZW9mIGFyZ3MgPT09ICdvYmplY3QnICYmIGFyZ3MuY2FuZGlkYXRlICYmXG4gICAgICAgICAgYXJncy5jYW5kaWRhdGUuaW5kZXhPZignYT0nKSA9PT0gMCkge1xuICAgICAgICBhcmdzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShhcmdzKSk7XG4gICAgICAgIGFyZ3MuY2FuZGlkYXRlID0gYXJncy5jYW5kaWRhdGUuc3Vic3RyKDIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoYXJncy5jYW5kaWRhdGUgJiYgYXJncy5jYW5kaWRhdGUubGVuZ3RoKSB7XG4gICAgICAgIC8vIEF1Z21lbnQgdGhlIG5hdGl2ZSBjYW5kaWRhdGUgd2l0aCB0aGUgcGFyc2VkIGZpZWxkcy5cbiAgICAgICAgdmFyIG5hdGl2ZUNhbmRpZGF0ZSA9IG5ldyBOYXRpdmVSVENJY2VDYW5kaWRhdGUoYXJncyk7XG4gICAgICAgIHZhciBwYXJzZWRDYW5kaWRhdGUgPSBTRFBVdGlscy5wYXJzZUNhbmRpZGF0ZShhcmdzLmNhbmRpZGF0ZSk7XG4gICAgICAgIHZhciBhdWdtZW50ZWRDYW5kaWRhdGUgPSBPYmplY3QuYXNzaWduKG5hdGl2ZUNhbmRpZGF0ZSxcbiAgICAgICAgICAgIHBhcnNlZENhbmRpZGF0ZSk7XG5cbiAgICAgICAgLy8gQWRkIGEgc2VyaWFsaXplciB0aGF0IGRvZXMgbm90IHNlcmlhbGl6ZSB0aGUgZXh0cmEgYXR0cmlidXRlcy5cbiAgICAgICAgYXVnbWVudGVkQ2FuZGlkYXRlLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjYW5kaWRhdGU6IGF1Z21lbnRlZENhbmRpZGF0ZS5jYW5kaWRhdGUsXG4gICAgICAgICAgICBzZHBNaWQ6IGF1Z21lbnRlZENhbmRpZGF0ZS5zZHBNaWQsXG4gICAgICAgICAgICBzZHBNTGluZUluZGV4OiBhdWdtZW50ZWRDYW5kaWRhdGUuc2RwTUxpbmVJbmRleCxcbiAgICAgICAgICAgIHVzZXJuYW1lRnJhZ21lbnQ6IGF1Z21lbnRlZENhbmRpZGF0ZS51c2VybmFtZUZyYWdtZW50LFxuICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBhdWdtZW50ZWRDYW5kaWRhdGU7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IE5hdGl2ZVJUQ0ljZUNhbmRpZGF0ZShhcmdzKTtcbiAgICB9O1xuICAgIHdpbmRvdy5SVENJY2VDYW5kaWRhdGUucHJvdG90eXBlID0gTmF0aXZlUlRDSWNlQ2FuZGlkYXRlLnByb3RvdHlwZTtcblxuICAgIC8vIEhvb2sgdXAgdGhlIGF1Z21lbnRlZCBjYW5kaWRhdGUgaW4gb25pY2VjYW5kaWRhdGUgYW5kXG4gICAgLy8gYWRkRXZlbnRMaXN0ZW5lcignaWNlY2FuZGlkYXRlJywgLi4uKVxuICAgIHV0aWxzLndyYXBQZWVyQ29ubmVjdGlvbkV2ZW50KHdpbmRvdywgJ2ljZWNhbmRpZGF0ZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGlmIChlLmNhbmRpZGF0ZSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgJ2NhbmRpZGF0ZScsIHtcbiAgICAgICAgICB2YWx1ZTogbmV3IHdpbmRvdy5SVENJY2VDYW5kaWRhdGUoZS5jYW5kaWRhdGUpLFxuICAgICAgICAgIHdyaXRhYmxlOiAnZmFsc2UnXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGU7XG4gICAgfSk7XG4gIH0sXG5cbiAgLy8gc2hpbUNyZWF0ZU9iamVjdFVSTCBtdXN0IGJlIGNhbGxlZCBiZWZvcmUgc2hpbVNvdXJjZU9iamVjdCB0byBhdm9pZCBsb29wLlxuXG4gIHNoaW1DcmVhdGVPYmplY3RVUkw6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIHZhciBVUkwgPSB3aW5kb3cgJiYgd2luZG93LlVSTDtcblxuICAgIGlmICghKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50ICYmXG4gICAgICAgICAgJ3NyY09iamVjdCcgaW4gd2luZG93LkhUTUxNZWRpYUVsZW1lbnQucHJvdG90eXBlICYmXG4gICAgICAgIFVSTC5jcmVhdGVPYmplY3RVUkwgJiYgVVJMLnJldm9rZU9iamVjdFVSTCkpIHtcbiAgICAgIC8vIE9ubHkgc2hpbSBDcmVhdGVPYmplY3RVUkwgdXNpbmcgc3JjT2JqZWN0IGlmIHNyY09iamVjdCBleGlzdHMuXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHZhciBuYXRpdmVDcmVhdGVPYmplY3RVUkwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMLmJpbmQoVVJMKTtcbiAgICB2YXIgbmF0aXZlUmV2b2tlT2JqZWN0VVJMID0gVVJMLnJldm9rZU9iamVjdFVSTC5iaW5kKFVSTCk7XG4gICAgdmFyIHN0cmVhbXMgPSBuZXcgTWFwKCksIG5ld0lkID0gMDtcblxuICAgIFVSTC5jcmVhdGVPYmplY3RVUkwgPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgIGlmICgnZ2V0VHJhY2tzJyBpbiBzdHJlYW0pIHtcbiAgICAgICAgdmFyIHVybCA9ICdwb2x5YmxvYjonICsgKCsrbmV3SWQpO1xuICAgICAgICBzdHJlYW1zLnNldCh1cmwsIHN0cmVhbSk7XG4gICAgICAgIHV0aWxzLmRlcHJlY2F0ZWQoJ1VSTC5jcmVhdGVPYmplY3RVUkwoc3RyZWFtKScsXG4gICAgICAgICAgICAnZWxlbS5zcmNPYmplY3QgPSBzdHJlYW0nKTtcbiAgICAgICAgcmV0dXJuIHVybDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuYXRpdmVDcmVhdGVPYmplY3RVUkwoc3RyZWFtKTtcbiAgICB9O1xuICAgIFVSTC5yZXZva2VPYmplY3RVUkwgPSBmdW5jdGlvbih1cmwpIHtcbiAgICAgIG5hdGl2ZVJldm9rZU9iamVjdFVSTCh1cmwpO1xuICAgICAgc3RyZWFtcy5kZWxldGUodXJsKTtcbiAgICB9O1xuXG4gICAgdmFyIGRzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iod2luZG93LkhUTUxNZWRpYUVsZW1lbnQucHJvdG90eXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzcmMnKTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LkhUTUxNZWRpYUVsZW1lbnQucHJvdG90eXBlLCAnc3JjJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGRzYy5nZXQuYXBwbHkodGhpcyk7XG4gICAgICB9LFxuICAgICAgc2V0OiBmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgdGhpcy5zcmNPYmplY3QgPSBzdHJlYW1zLmdldCh1cmwpIHx8IG51bGw7XG4gICAgICAgIHJldHVybiBkc2Muc2V0LmFwcGx5KHRoaXMsIFt1cmxdKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHZhciBuYXRpdmVTZXRBdHRyaWJ1dGUgPSB3aW5kb3cuSFRNTE1lZGlhRWxlbWVudC5wcm90b3R5cGUuc2V0QXR0cmlidXRlO1xuICAgIHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50LnByb3RvdHlwZS5zZXRBdHRyaWJ1dGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyICYmXG4gICAgICAgICAgKCcnICsgYXJndW1lbnRzWzBdKS50b0xvd2VyQ2FzZSgpID09PSAnc3JjJykge1xuICAgICAgICB0aGlzLnNyY09iamVjdCA9IHN0cmVhbXMuZ2V0KGFyZ3VtZW50c1sxXSkgfHwgbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuYXRpdmVTZXRBdHRyaWJ1dGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9LFxuXG4gIHNoaW1NYXhNZXNzYWdlU2l6ZTogZnVuY3Rpb24od2luZG93KSB7XG4gICAgaWYgKHdpbmRvdy5SVENTY3RwVHJhbnNwb3J0IHx8ICF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGJyb3dzZXJEZXRhaWxzID0gdXRpbHMuZGV0ZWN0QnJvd3Nlcih3aW5kb3cpO1xuXG4gICAgaWYgKCEoJ3NjdHAnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSwgJ3NjdHAnLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLl9zY3RwID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiB0aGlzLl9zY3RwO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB2YXIgc2N0cEluRGVzY3JpcHRpb24gPSBmdW5jdGlvbihkZXNjcmlwdGlvbikge1xuICAgICAgdmFyIHNlY3Rpb25zID0gU0RQVXRpbHMuc3BsaXRTZWN0aW9ucyhkZXNjcmlwdGlvbi5zZHApO1xuICAgICAgc2VjdGlvbnMuc2hpZnQoKTtcbiAgICAgIHJldHVybiBzZWN0aW9ucy5zb21lKGZ1bmN0aW9uKG1lZGlhU2VjdGlvbikge1xuICAgICAgICB2YXIgbUxpbmUgPSBTRFBVdGlscy5wYXJzZU1MaW5lKG1lZGlhU2VjdGlvbik7XG4gICAgICAgIHJldHVybiBtTGluZSAmJiBtTGluZS5raW5kID09PSAnYXBwbGljYXRpb24nXG4gICAgICAgICAgICAmJiBtTGluZS5wcm90b2NvbC5pbmRleE9mKCdTQ1RQJykgIT09IC0xO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBnZXRSZW1vdGVGaXJlZm94VmVyc2lvbiA9IGZ1bmN0aW9uKGRlc2NyaXB0aW9uKSB7XG4gICAgICAvLyBUT0RPOiBJcyB0aGVyZSBhIGJldHRlciBzb2x1dGlvbiBmb3IgZGV0ZWN0aW5nIEZpcmVmb3g/XG4gICAgICB2YXIgbWF0Y2ggPSBkZXNjcmlwdGlvbi5zZHAubWF0Y2goL21vemlsbGEuLi5USElTX0lTX1NEUEFSVEEtKFxcZCspLyk7XG4gICAgICBpZiAobWF0Y2ggPT09IG51bGwgfHwgbWF0Y2gubGVuZ3RoIDwgMikge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgICB9XG4gICAgICB2YXIgdmVyc2lvbiA9IHBhcnNlSW50KG1hdGNoWzFdLCAxMCk7XG4gICAgICAvLyBUZXN0IGZvciBOYU4gKHllcywgdGhpcyBpcyB1Z2x5KVxuICAgICAgcmV0dXJuIHZlcnNpb24gIT09IHZlcnNpb24gPyAtMSA6IHZlcnNpb247XG4gICAgfTtcblxuICAgIHZhciBnZXRDYW5TZW5kTWF4TWVzc2FnZVNpemUgPSBmdW5jdGlvbihyZW1vdGVJc0ZpcmVmb3gpIHtcbiAgICAgIC8vIEV2ZXJ5IGltcGxlbWVudGF0aW9uIHdlIGtub3cgY2FuIHNlbmQgYXQgbGVhc3QgNjQgS2lCLlxuICAgICAgLy8gTm90ZTogQWx0aG91Z2ggQ2hyb21lIGlzIHRlY2huaWNhbGx5IGFibGUgdG8gc2VuZCB1cCB0byAyNTYgS2lCLCB0aGVcbiAgICAgIC8vICAgICAgIGRhdGEgZG9lcyBub3QgcmVhY2ggdGhlIG90aGVyIHBlZXIgcmVsaWFibHkuXG4gICAgICAvLyAgICAgICBTZWU6IGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC93ZWJydGMvaXNzdWVzL2RldGFpbD9pZD04NDE5XG4gICAgICB2YXIgY2FuU2VuZE1heE1lc3NhZ2VTaXplID0gNjU1MzY7XG4gICAgICBpZiAoYnJvd3NlckRldGFpbHMuYnJvd3NlciA9PT0gJ2ZpcmVmb3gnKSB7XG4gICAgICAgIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgNTcpIHtcbiAgICAgICAgICBpZiAocmVtb3RlSXNGaXJlZm94ID09PSAtMSkge1xuICAgICAgICAgICAgLy8gRkYgPCA1NyB3aWxsIHNlbmQgaW4gMTYgS2lCIGNodW5rcyB1c2luZyB0aGUgZGVwcmVjYXRlZCBQUElEXG4gICAgICAgICAgICAvLyBmcmFnbWVudGF0aW9uLlxuICAgICAgICAgICAgY2FuU2VuZE1heE1lc3NhZ2VTaXplID0gMTYzODQ7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEhvd2V2ZXIsIG90aGVyIEZGIChhbmQgUkFXUlRDKSBjYW4gcmVhc3NlbWJsZSBQUElELWZyYWdtZW50ZWRcbiAgICAgICAgICAgIC8vIG1lc3NhZ2VzLiBUaHVzLCBzdXBwb3J0aW5nIH4yIEdpQiB3aGVuIHNlbmRpbmcuXG4gICAgICAgICAgICBjYW5TZW5kTWF4TWVzc2FnZVNpemUgPSAyMTQ3NDgzNjM3O1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBDdXJyZW50bHksIGFsbCBGRiA+PSA1NyB3aWxsIHJlc2V0IHRoZSByZW1vdGUgbWF4aW11bSBtZXNzYWdlIHNpemVcbiAgICAgICAgICAvLyB0byB0aGUgZGVmYXVsdCB2YWx1ZSB3aGVuIGEgZGF0YSBjaGFubmVsIGlzIGNyZWF0ZWQgYXQgYSBsYXRlclxuICAgICAgICAgIC8vIHN0YWdlLiA6KFxuICAgICAgICAgIC8vIFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTQyNjgzMVxuICAgICAgICAgIGNhblNlbmRNYXhNZXNzYWdlU2l6ZSA9XG4gICAgICAgICAgICBicm93c2VyRGV0YWlscy52ZXJzaW9uID09PSA1NyA/IDY1NTM1IDogNjU1MzY7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBjYW5TZW5kTWF4TWVzc2FnZVNpemU7XG4gICAgfTtcblxuICAgIHZhciBnZXRNYXhNZXNzYWdlU2l6ZSA9IGZ1bmN0aW9uKGRlc2NyaXB0aW9uLCByZW1vdGVJc0ZpcmVmb3gpIHtcbiAgICAgIC8vIE5vdGU6IDY1NTM2IGJ5dGVzIGlzIHRoZSBkZWZhdWx0IHZhbHVlIGZyb20gdGhlIFNEUCBzcGVjLiBBbHNvLFxuICAgICAgLy8gICAgICAgZXZlcnkgaW1wbGVtZW50YXRpb24gd2Uga25vdyBzdXBwb3J0cyByZWNlaXZpbmcgNjU1MzYgYnl0ZXMuXG4gICAgICB2YXIgbWF4TWVzc2FnZVNpemUgPSA2NTUzNjtcblxuICAgICAgLy8gRkYgNTcgaGFzIGEgc2xpZ2h0bHkgaW5jb3JyZWN0IGRlZmF1bHQgcmVtb3RlIG1heCBtZXNzYWdlIHNpemUsIHNvXG4gICAgICAvLyB3ZSBuZWVkIHRvIGFkanVzdCBpdCBoZXJlIHRvIGF2b2lkIGEgZmFpbHVyZSB3aGVuIHNlbmRpbmcuXG4gICAgICAvLyBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTE0MjU2OTdcbiAgICAgIGlmIChicm93c2VyRGV0YWlscy5icm93c2VyID09PSAnZmlyZWZveCdcbiAgICAgICAgICAgJiYgYnJvd3NlckRldGFpbHMudmVyc2lvbiA9PT0gNTcpIHtcbiAgICAgICAgbWF4TWVzc2FnZVNpemUgPSA2NTUzNTtcbiAgICAgIH1cblxuICAgICAgdmFyIG1hdGNoID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgoZGVzY3JpcHRpb24uc2RwLCAnYT1tYXgtbWVzc2FnZS1zaXplOicpO1xuICAgICAgaWYgKG1hdGNoLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbWF4TWVzc2FnZVNpemUgPSBwYXJzZUludChtYXRjaFswXS5zdWJzdHIoMTkpLCAxMCk7XG4gICAgICB9IGVsc2UgaWYgKGJyb3dzZXJEZXRhaWxzLmJyb3dzZXIgPT09ICdmaXJlZm94JyAmJlxuICAgICAgICAgICAgICAgICAgcmVtb3RlSXNGaXJlZm94ICE9PSAtMSkge1xuICAgICAgICAvLyBJZiB0aGUgbWF4aW11bSBtZXNzYWdlIHNpemUgaXMgbm90IHByZXNlbnQgaW4gdGhlIHJlbW90ZSBTRFAgYW5kXG4gICAgICAgIC8vIGJvdGggbG9jYWwgYW5kIHJlbW90ZSBhcmUgRmlyZWZveCwgdGhlIHJlbW90ZSBwZWVyIGNhbiByZWNlaXZlXG4gICAgICAgIC8vIH4yIEdpQi5cbiAgICAgICAgbWF4TWVzc2FnZVNpemUgPSAyMTQ3NDgzNjM3O1xuICAgICAgfVxuICAgICAgcmV0dXJuIG1heE1lc3NhZ2VTaXplO1xuICAgIH07XG5cbiAgICB2YXIgb3JpZ1NldFJlbW90ZURlc2NyaXB0aW9uID1cbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5zZXRSZW1vdGVEZXNjcmlwdGlvbjtcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnNldFJlbW90ZURlc2NyaXB0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgcGMuX3NjdHAgPSBudWxsO1xuXG4gICAgICBpZiAoc2N0cEluRGVzY3JpcHRpb24oYXJndW1lbnRzWzBdKSkge1xuICAgICAgICAvLyBDaGVjayBpZiB0aGUgcmVtb3RlIGlzIEZGLlxuICAgICAgICB2YXIgaXNGaXJlZm94ID0gZ2V0UmVtb3RlRmlyZWZveFZlcnNpb24oYXJndW1lbnRzWzBdKTtcblxuICAgICAgICAvLyBHZXQgdGhlIG1heGltdW0gbWVzc2FnZSBzaXplIHRoZSBsb2NhbCBwZWVyIGlzIGNhcGFibGUgb2Ygc2VuZGluZ1xuICAgICAgICB2YXIgY2FuU2VuZE1NUyA9IGdldENhblNlbmRNYXhNZXNzYWdlU2l6ZShpc0ZpcmVmb3gpO1xuXG4gICAgICAgIC8vIEdldCB0aGUgbWF4aW11bSBtZXNzYWdlIHNpemUgb2YgdGhlIHJlbW90ZSBwZWVyLlxuICAgICAgICB2YXIgcmVtb3RlTU1TID0gZ2V0TWF4TWVzc2FnZVNpemUoYXJndW1lbnRzWzBdLCBpc0ZpcmVmb3gpO1xuXG4gICAgICAgIC8vIERldGVybWluZSBmaW5hbCBtYXhpbXVtIG1lc3NhZ2Ugc2l6ZVxuICAgICAgICB2YXIgbWF4TWVzc2FnZVNpemU7XG4gICAgICAgIGlmIChjYW5TZW5kTU1TID09PSAwICYmIHJlbW90ZU1NUyA9PT0gMCkge1xuICAgICAgICAgIG1heE1lc3NhZ2VTaXplID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuICAgICAgICB9IGVsc2UgaWYgKGNhblNlbmRNTVMgPT09IDAgfHwgcmVtb3RlTU1TID09PSAwKSB7XG4gICAgICAgICAgbWF4TWVzc2FnZVNpemUgPSBNYXRoLm1heChjYW5TZW5kTU1TLCByZW1vdGVNTVMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1heE1lc3NhZ2VTaXplID0gTWF0aC5taW4oY2FuU2VuZE1NUywgcmVtb3RlTU1TKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENyZWF0ZSBhIGR1bW15IFJUQ1NjdHBUcmFuc3BvcnQgb2JqZWN0IGFuZCB0aGUgJ21heE1lc3NhZ2VTaXplJ1xuICAgICAgICAvLyBhdHRyaWJ1dGUuXG4gICAgICAgIHZhciBzY3RwID0ge307XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzY3RwLCAnbWF4TWVzc2FnZVNpemUnLCB7XG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBtYXhNZXNzYWdlU2l6ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBwYy5fc2N0cCA9IHNjdHA7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvcmlnU2V0UmVtb3RlRGVzY3JpcHRpb24uYXBwbHkocGMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfSxcblxuICBzaGltU2VuZFRocm93VHlwZUVycm9yOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICBpZiAoISh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gJiZcbiAgICAgICAgJ2NyZWF0ZURhdGFDaGFubmVsJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIE5vdGU6IEFsdGhvdWdoIEZpcmVmb3ggPj0gNTcgaGFzIGEgbmF0aXZlIGltcGxlbWVudGF0aW9uLCB0aGUgbWF4aW11bVxuICAgIC8vICAgICAgIG1lc3NhZ2Ugc2l6ZSBjYW4gYmUgcmVzZXQgZm9yIGFsbCBkYXRhIGNoYW5uZWxzIGF0IGEgbGF0ZXIgc3RhZ2UuXG4gICAgLy8gICAgICAgU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xNDI2ODMxXG5cbiAgICB2YXIgb3JpZ0NyZWF0ZURhdGFDaGFubmVsID1cbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlRGF0YUNoYW5uZWw7XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5jcmVhdGVEYXRhQ2hhbm5lbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgIHZhciBkYXRhQ2hhbm5lbCA9IG9yaWdDcmVhdGVEYXRhQ2hhbm5lbC5hcHBseShwYywgYXJndW1lbnRzKTtcbiAgICAgIHZhciBvcmlnRGF0YUNoYW5uZWxTZW5kID0gZGF0YUNoYW5uZWwuc2VuZDtcblxuICAgICAgLy8gUGF0Y2ggJ3NlbmQnIG1ldGhvZFxuICAgICAgZGF0YUNoYW5uZWwuc2VuZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZGMgPSB0aGlzO1xuICAgICAgICB2YXIgZGF0YSA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgdmFyIGxlbmd0aCA9IGRhdGEubGVuZ3RoIHx8IGRhdGEuc2l6ZSB8fCBkYXRhLmJ5dGVMZW5ndGg7XG4gICAgICAgIGlmIChsZW5ndGggPiBwYy5zY3RwLm1heE1lc3NhZ2VTaXplKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbignTWVzc2FnZSB0b28gbGFyZ2UgKGNhbiBzZW5kIGEgbWF4aW11bSBvZiAnICtcbiAgICAgICAgICAgIHBjLnNjdHAubWF4TWVzc2FnZVNpemUgKyAnIGJ5dGVzKScsICdUeXBlRXJyb3InKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3JpZ0RhdGFDaGFubmVsU2VuZC5hcHBseShkYywgYXJndW1lbnRzKTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBkYXRhQ2hhbm5lbDtcbiAgICB9O1xuICB9XG59O1xuXG59LHtcIi4vdXRpbHNcIjoxMyxcInNkcFwiOjJ9XSw4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8qXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXG4gKiAgdHJlZS5cbiAqL1xuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xudmFyIHNoaW1SVENQZWVyQ29ubmVjdGlvbiA9IHJlcXVpcmUoJ3J0Y3BlZXJjb25uZWN0aW9uLXNoaW0nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNoaW1HZXRVc2VyTWVkaWE6IHJlcXVpcmUoJy4vZ2V0dXNlcm1lZGlhJyksXG4gIHNoaW1QZWVyQ29ubmVjdGlvbjogZnVuY3Rpb24od2luZG93KSB7XG4gICAgdmFyIGJyb3dzZXJEZXRhaWxzID0gdXRpbHMuZGV0ZWN0QnJvd3Nlcih3aW5kb3cpO1xuXG4gICAgaWYgKHdpbmRvdy5SVENJY2VHYXRoZXJlcikge1xuICAgICAgaWYgKCF3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlKSB7XG4gICAgICAgIHdpbmRvdy5SVENJY2VDYW5kaWRhdGUgPSBmdW5jdGlvbihhcmdzKSB7XG4gICAgICAgICAgcmV0dXJuIGFyZ3M7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBpZiAoIXdpbmRvdy5SVENTZXNzaW9uRGVzY3JpcHRpb24pIHtcbiAgICAgICAgd2luZG93LlJUQ1Nlc3Npb25EZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICAgICAgICByZXR1cm4gYXJncztcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIC8vIHRoaXMgYWRkcyBhbiBhZGRpdGlvbmFsIGV2ZW50IGxpc3RlbmVyIHRvIE1lZGlhU3RyYWNrVHJhY2sgdGhhdCBzaWduYWxzXG4gICAgICAvLyB3aGVuIGEgdHJhY2tzIGVuYWJsZWQgcHJvcGVydHkgd2FzIGNoYW5nZWQuIFdvcmthcm91bmQgZm9yIGEgYnVnIGluXG4gICAgICAvLyBhZGRTdHJlYW0sIHNlZSBiZWxvdy4gTm8gbG9uZ2VyIHJlcXVpcmVkIGluIDE1MDI1K1xuICAgICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCAxNTAyNSkge1xuICAgICAgICB2YXIgb3JpZ01TVEVuYWJsZWQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKFxuICAgICAgICAgICAgd2luZG93Lk1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLCAnZW5hYmxlZCcpO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93Lk1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLCAnZW5hYmxlZCcsIHtcbiAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICBvcmlnTVNURW5hYmxlZC5zZXQuY2FsbCh0aGlzLCB2YWx1ZSk7XG4gICAgICAgICAgICB2YXIgZXYgPSBuZXcgRXZlbnQoJ2VuYWJsZWQnKTtcbiAgICAgICAgICAgIGV2LmVuYWJsZWQgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBPUlRDIGRlZmluZXMgdGhlIERUTUYgc2VuZGVyIGEgYml0IGRpZmZlcmVudC5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdzNjL29ydGMvaXNzdWVzLzcxNFxuICAgIGlmICh3aW5kb3cuUlRDUnRwU2VuZGVyICYmICEoJ2R0bWYnIGluIHdpbmRvdy5SVENSdHBTZW5kZXIucHJvdG90eXBlKSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENSdHBTZW5kZXIucHJvdG90eXBlLCAnZHRtZicsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAodGhpcy5fZHRtZiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50cmFjay5raW5kID09PSAnYXVkaW8nKSB7XG4gICAgICAgICAgICAgIHRoaXMuX2R0bWYgPSBuZXcgd2luZG93LlJUQ0R0bWZTZW5kZXIodGhpcyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHJhY2sua2luZCA9PT0gJ3ZpZGVvJykge1xuICAgICAgICAgICAgICB0aGlzLl9kdG1mID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2R0bWY7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBFZGdlIGN1cnJlbnRseSBvbmx5IGltcGxlbWVudHMgdGhlIFJUQ0R0bWZTZW5kZXIsIG5vdCB0aGVcbiAgICAvLyBSVENEVE1GU2VuZGVyIGFsaWFzLiBTZWUgaHR0cDovL2RyYWZ0Lm9ydGMub3JnLyNydGNkdG1mc2VuZGVyMipcbiAgICBpZiAod2luZG93LlJUQ0R0bWZTZW5kZXIgJiYgIXdpbmRvdy5SVENEVE1GU2VuZGVyKSB7XG4gICAgICB3aW5kb3cuUlRDRFRNRlNlbmRlciA9IHdpbmRvdy5SVENEdG1mU2VuZGVyO1xuICAgIH1cblxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiA9XG4gICAgICAgIHNoaW1SVENQZWVyQ29ubmVjdGlvbih3aW5kb3csIGJyb3dzZXJEZXRhaWxzLnZlcnNpb24pO1xuICB9LFxuICBzaGltUmVwbGFjZVRyYWNrOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICAvLyBPUlRDIGhhcyByZXBsYWNlVHJhY2sgLS0gaHR0cHM6Ly9naXRodWIuY29tL3czYy9vcnRjL2lzc3Vlcy82MTRcbiAgICBpZiAod2luZG93LlJUQ1J0cFNlbmRlciAmJlxuICAgICAgICAhKCdyZXBsYWNlVHJhY2snIGluIHdpbmRvdy5SVENSdHBTZW5kZXIucHJvdG90eXBlKSkge1xuICAgICAgd2luZG93LlJUQ1J0cFNlbmRlci5wcm90b3R5cGUucmVwbGFjZVRyYWNrID1cbiAgICAgICAgICB3aW5kb3cuUlRDUnRwU2VuZGVyLnByb3RvdHlwZS5zZXRUcmFjaztcbiAgICB9XG4gIH1cbn07XG5cbn0se1wiLi4vdXRpbHNcIjoxMyxcIi4vZ2V0dXNlcm1lZGlhXCI6OSxcInJ0Y3BlZXJjb25uZWN0aW9uLXNoaW1cIjoxfV0sOTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vKlxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxuICogIHRyZWUuXG4gKi9cbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cbid1c2Ugc3RyaWN0JztcblxuLy8gRXhwb3NlIHB1YmxpYyBtZXRob2RzLlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih3aW5kb3cpIHtcbiAgdmFyIG5hdmlnYXRvciA9IHdpbmRvdyAmJiB3aW5kb3cubmF2aWdhdG9yO1xuXG4gIHZhciBzaGltRXJyb3JfID0gZnVuY3Rpb24oZSkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiB7UGVybWlzc2lvbkRlbmllZEVycm9yOiAnTm90QWxsb3dlZEVycm9yJ31bZS5uYW1lXSB8fCBlLm5hbWUsXG4gICAgICBtZXNzYWdlOiBlLm1lc3NhZ2UsXG4gICAgICBjb25zdHJhaW50OiBlLmNvbnN0cmFpbnQsXG4gICAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWU7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICAvLyBnZXRVc2VyTWVkaWEgZXJyb3Igc2hpbS5cbiAgdmFyIG9yaWdHZXRVc2VyTWVkaWEgPSBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYS5cbiAgICAgIGJpbmQobmF2aWdhdG9yLm1lZGlhRGV2aWNlcyk7XG4gIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhID0gZnVuY3Rpb24oYykge1xuICAgIHJldHVybiBvcmlnR2V0VXNlck1lZGlhKGMpLmNhdGNoKGZ1bmN0aW9uKGUpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChzaGltRXJyb3JfKGUpKTtcbiAgICB9KTtcbiAgfTtcbn07XG5cbn0se31dLDEwOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8qXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXG4gKiAgdHJlZS5cbiAqL1xuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2hpbUdldFVzZXJNZWRpYTogcmVxdWlyZSgnLi9nZXR1c2VybWVkaWEnKSxcbiAgc2hpbU9uVHJhY2s6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gJiYgISgnb250cmFjaycgaW5cbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLCAnb250cmFjaycsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fb250cmFjaztcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbihmKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX29udHJhY2spIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhY2snLCB0aGlzLl9vbnRyYWNrKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWRkc3RyZWFtJywgdGhpcy5fb250cmFja3BvbHkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYWNrJywgdGhpcy5fb250cmFjayA9IGYpO1xuICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignYWRkc3RyZWFtJywgdGhpcy5fb250cmFja3BvbHkgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XG4gICAgICAgICAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgndHJhY2snKTtcbiAgICAgICAgICAgICAgZXZlbnQudHJhY2sgPSB0cmFjaztcbiAgICAgICAgICAgICAgZXZlbnQucmVjZWl2ZXIgPSB7dHJhY2s6IHRyYWNrfTtcbiAgICAgICAgICAgICAgZXZlbnQudHJhbnNjZWl2ZXIgPSB7cmVjZWl2ZXI6IGV2ZW50LnJlY2VpdmVyfTtcbiAgICAgICAgICAgICAgZXZlbnQuc3RyZWFtcyA9IFtlLnN0cmVhbV07XG4gICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgd2luZG93LlJUQ1RyYWNrRXZlbnQgJiZcbiAgICAgICAgKCdyZWNlaXZlcicgaW4gd2luZG93LlJUQ1RyYWNrRXZlbnQucHJvdG90eXBlKSAmJlxuICAgICAgICAhKCd0cmFuc2NlaXZlcicgaW4gd2luZG93LlJUQ1RyYWNrRXZlbnQucHJvdG90eXBlKSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENUcmFja0V2ZW50LnByb3RvdHlwZSwgJ3RyYW5zY2VpdmVyJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB7cmVjZWl2ZXI6IHRoaXMucmVjZWl2ZXJ9O1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgc2hpbVNvdXJjZU9iamVjdDogZnVuY3Rpb24od2luZG93KSB7XG4gICAgLy8gRmlyZWZveCBoYXMgc3VwcG9ydGVkIG1velNyY09iamVjdCBzaW5jZSBGRjIyLCB1bnByZWZpeGVkIGluIDQyLlxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50ICYmXG4gICAgICAgICEoJ3NyY09iamVjdCcgaW4gd2luZG93LkhUTUxNZWRpYUVsZW1lbnQucHJvdG90eXBlKSkge1xuICAgICAgICAvLyBTaGltIHRoZSBzcmNPYmplY3QgcHJvcGVydHksIG9uY2UsIHdoZW4gSFRNTE1lZGlhRWxlbWVudCBpcyBmb3VuZC5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50LnByb3RvdHlwZSwgJ3NyY09iamVjdCcsIHtcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW96U3JjT2JqZWN0O1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc2V0OiBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgICAgICAgIHRoaXMubW96U3JjT2JqZWN0ID0gc3RyZWFtO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHNoaW1QZWVyQ29ubmVjdGlvbjogZnVuY3Rpb24od2luZG93KSB7XG4gICAgdmFyIGJyb3dzZXJEZXRhaWxzID0gdXRpbHMuZGV0ZWN0QnJvd3Nlcih3aW5kb3cpO1xuXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICdvYmplY3QnIHx8ICEod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uIHx8XG4gICAgICAgIHdpbmRvdy5tb3pSVENQZWVyQ29ubmVjdGlvbikpIHtcbiAgICAgIHJldHVybjsgLy8gcHJvYmFibHkgbWVkaWEucGVlcmNvbm5lY3Rpb24uZW5hYmxlZD1mYWxzZSBpbiBhYm91dDpjb25maWdcbiAgICB9XG4gICAgLy8gVGhlIFJUQ1BlZXJDb25uZWN0aW9uIG9iamVjdC5cbiAgICBpZiAoIXdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbikge1xuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uID0gZnVuY3Rpb24ocGNDb25maWcsIHBjQ29uc3RyYWludHMpIHtcbiAgICAgICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCAzOCkge1xuICAgICAgICAgIC8vIC51cmxzIGlzIG5vdCBzdXBwb3J0ZWQgaW4gRkYgPCAzOC5cbiAgICAgICAgICAvLyBjcmVhdGUgUlRDSWNlU2VydmVycyB3aXRoIGEgc2luZ2xlIHVybC5cbiAgICAgICAgICBpZiAocGNDb25maWcgJiYgcGNDb25maWcuaWNlU2VydmVycykge1xuICAgICAgICAgICAgdmFyIG5ld0ljZVNlcnZlcnMgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGNDb25maWcuaWNlU2VydmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICB2YXIgc2VydmVyID0gcGNDb25maWcuaWNlU2VydmVyc1tpXTtcbiAgICAgICAgICAgICAgaWYgKHNlcnZlci5oYXNPd25Qcm9wZXJ0eSgndXJscycpKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzZXJ2ZXIudXJscy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgdmFyIG5ld1NlcnZlciA9IHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBzZXJ2ZXIudXJsc1tqXVxuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgIGlmIChzZXJ2ZXIudXJsc1tqXS5pbmRleE9mKCd0dXJuJykgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3U2VydmVyLnVzZXJuYW1lID0gc2VydmVyLnVzZXJuYW1lO1xuICAgICAgICAgICAgICAgICAgICBuZXdTZXJ2ZXIuY3JlZGVudGlhbCA9IHNlcnZlci5jcmVkZW50aWFsO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgbmV3SWNlU2VydmVycy5wdXNoKG5ld1NlcnZlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld0ljZVNlcnZlcnMucHVzaChwY0NvbmZpZy5pY2VTZXJ2ZXJzW2ldKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGNDb25maWcuaWNlU2VydmVycyA9IG5ld0ljZVNlcnZlcnM7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgd2luZG93Lm1velJUQ1BlZXJDb25uZWN0aW9uKHBjQ29uZmlnLCBwY0NvbnN0cmFpbnRzKTtcbiAgICAgIH07XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlID1cbiAgICAgICAgICB3aW5kb3cubW96UlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlO1xuXG4gICAgICAvLyB3cmFwIHN0YXRpYyBtZXRob2RzLiBDdXJyZW50bHkganVzdCBnZW5lcmF0ZUNlcnRpZmljYXRlLlxuICAgICAgaWYgKHdpbmRvdy5tb3pSVENQZWVyQ29ubmVjdGlvbi5nZW5lcmF0ZUNlcnRpZmljYXRlKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24sICdnZW5lcmF0ZUNlcnRpZmljYXRlJywge1xuICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93Lm1velJUQ1BlZXJDb25uZWN0aW9uLmdlbmVyYXRlQ2VydGlmaWNhdGU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgd2luZG93LlJUQ1Nlc3Npb25EZXNjcmlwdGlvbiA9IHdpbmRvdy5tb3pSVENTZXNzaW9uRGVzY3JpcHRpb247XG4gICAgICB3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlID0gd2luZG93Lm1velJUQ0ljZUNhbmRpZGF0ZTtcbiAgICB9XG5cbiAgICAvLyBzaGltIGF3YXkgbmVlZCBmb3Igb2Jzb2xldGUgUlRDSWNlQ2FuZGlkYXRlL1JUQ1Nlc3Npb25EZXNjcmlwdGlvbi5cbiAgICBbJ3NldExvY2FsRGVzY3JpcHRpb24nLCAnc2V0UmVtb3RlRGVzY3JpcHRpb24nLCAnYWRkSWNlQ2FuZGlkYXRlJ11cbiAgICAgICAgLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgICAgdmFyIG5hdGl2ZU1ldGhvZCA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXTtcbiAgICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGFyZ3VtZW50c1swXSA9IG5ldyAoKG1ldGhvZCA9PT0gJ2FkZEljZUNhbmRpZGF0ZScpID9cbiAgICAgICAgICAgICAgICB3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlIDpcbiAgICAgICAgICAgICAgICB3aW5kb3cuUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKShhcmd1bWVudHNbMF0pO1xuICAgICAgICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgLy8gc3VwcG9ydCBmb3IgYWRkSWNlQ2FuZGlkYXRlKG51bGwgb3IgdW5kZWZpbmVkKVxuICAgIHZhciBuYXRpdmVBZGRJY2VDYW5kaWRhdGUgPVxuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZEljZUNhbmRpZGF0ZTtcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZEljZUNhbmRpZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCFhcmd1bWVudHNbMF0pIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50c1sxXSkge1xuICAgICAgICAgIGFyZ3VtZW50c1sxXS5hcHBseShudWxsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmF0aXZlQWRkSWNlQ2FuZGlkYXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcblxuICAgIC8vIHNoaW0gZ2V0U3RhdHMgd2l0aCBtYXBsaWtlIHN1cHBvcnRcbiAgICB2YXIgbWFrZU1hcFN0YXRzID0gZnVuY3Rpb24oc3RhdHMpIHtcbiAgICAgIHZhciBtYXAgPSBuZXcgTWFwKCk7XG4gICAgICBPYmplY3Qua2V5cyhzdGF0cykuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgbWFwLnNldChrZXksIHN0YXRzW2tleV0pO1xuICAgICAgICBtYXBba2V5XSA9IHN0YXRzW2tleV07XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBtYXA7XG4gICAgfTtcblxuICAgIHZhciBtb2Rlcm5TdGF0c1R5cGVzID0ge1xuICAgICAgaW5ib3VuZHJ0cDogJ2luYm91bmQtcnRwJyxcbiAgICAgIG91dGJvdW5kcnRwOiAnb3V0Ym91bmQtcnRwJyxcbiAgICAgIGNhbmRpZGF0ZXBhaXI6ICdjYW5kaWRhdGUtcGFpcicsXG4gICAgICBsb2NhbGNhbmRpZGF0ZTogJ2xvY2FsLWNhbmRpZGF0ZScsXG4gICAgICByZW1vdGVjYW5kaWRhdGU6ICdyZW1vdGUtY2FuZGlkYXRlJ1xuICAgIH07XG5cbiAgICB2YXIgbmF0aXZlR2V0U3RhdHMgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFN0YXRzO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U3RhdHMgPSBmdW5jdGlvbihcbiAgICAgIHNlbGVjdG9yLFxuICAgICAgb25TdWNjLFxuICAgICAgb25FcnJcbiAgICApIHtcbiAgICAgIHJldHVybiBuYXRpdmVHZXRTdGF0cy5hcHBseSh0aGlzLCBbc2VsZWN0b3IgfHwgbnVsbF0pXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKHN0YXRzKSB7XG4gICAgICAgICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCA0OCkge1xuICAgICAgICAgICAgc3RhdHMgPSBtYWtlTWFwU3RhdHMoc3RhdHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDUzICYmICFvblN1Y2MpIHtcbiAgICAgICAgICAgIC8vIFNoaW0gb25seSBwcm9taXNlIGdldFN0YXRzIHdpdGggc3BlYy1oeXBoZW5zIGluIHR5cGUgbmFtZXNcbiAgICAgICAgICAgIC8vIExlYXZlIGNhbGxiYWNrIHZlcnNpb24gYWxvbmU7IG1pc2Mgb2xkIHVzZXMgb2YgZm9yRWFjaCBiZWZvcmUgTWFwXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBzdGF0cy5mb3JFYWNoKGZ1bmN0aW9uKHN0YXQpIHtcbiAgICAgICAgICAgICAgICBzdGF0LnR5cGUgPSBtb2Rlcm5TdGF0c1R5cGVzW3N0YXQudHlwZV0gfHwgc3RhdC50eXBlO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgaWYgKGUubmFtZSAhPT0gJ1R5cGVFcnJvcicpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vIEF2b2lkIFR5cGVFcnJvcjogXCJ0eXBlXCIgaXMgcmVhZC1vbmx5LCBpbiBvbGQgdmVyc2lvbnMuIDM0LTQzaXNoXG4gICAgICAgICAgICAgIHN0YXRzLmZvckVhY2goZnVuY3Rpb24oc3RhdCwgaSkge1xuICAgICAgICAgICAgICAgIHN0YXRzLnNldChpLCBPYmplY3QuYXNzaWduKHt9LCBzdGF0LCB7XG4gICAgICAgICAgICAgICAgICB0eXBlOiBtb2Rlcm5TdGF0c1R5cGVzW3N0YXQudHlwZV0gfHwgc3RhdC50eXBlXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHN0YXRzO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihvblN1Y2MsIG9uRXJyKTtcbiAgICB9O1xuICB9LFxuXG4gIHNoaW1SZW1vdmVTdHJlYW06IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIGlmICghd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uIHx8XG4gICAgICAgICdyZW1vdmVTdHJlYW0nIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICB1dGlscy5kZXByZWNhdGVkKCdyZW1vdmVTdHJlYW0nLCAncmVtb3ZlVHJhY2snKTtcbiAgICAgIHRoaXMuZ2V0U2VuZGVycygpLmZvckVhY2goZnVuY3Rpb24oc2VuZGVyKSB7XG4gICAgICAgIGlmIChzZW5kZXIudHJhY2sgJiYgc3RyZWFtLmdldFRyYWNrcygpLmluZGV4T2Yoc2VuZGVyLnRyYWNrKSAhPT0gLTEpIHtcbiAgICAgICAgICBwYy5yZW1vdmVUcmFjayhzZW5kZXIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG59O1xuXG59LHtcIi4uL3V0aWxzXCI6MTMsXCIuL2dldHVzZXJtZWRpYVwiOjExfV0sMTE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLypcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcbiAqICB0cmVlLlxuICovXG4gLyogZXNsaW50LWVudiBub2RlICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG52YXIgbG9nZ2luZyA9IHV0aWxzLmxvZztcblxuLy8gRXhwb3NlIHB1YmxpYyBtZXRob2RzLlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih3aW5kb3cpIHtcbiAgdmFyIGJyb3dzZXJEZXRhaWxzID0gdXRpbHMuZGV0ZWN0QnJvd3Nlcih3aW5kb3cpO1xuICB2YXIgbmF2aWdhdG9yID0gd2luZG93ICYmIHdpbmRvdy5uYXZpZ2F0b3I7XG4gIHZhciBNZWRpYVN0cmVhbVRyYWNrID0gd2luZG93ICYmIHdpbmRvdy5NZWRpYVN0cmVhbVRyYWNrO1xuXG4gIHZhciBzaGltRXJyb3JfID0gZnVuY3Rpb24oZSkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiB7XG4gICAgICAgIEludGVybmFsRXJyb3I6ICdOb3RSZWFkYWJsZUVycm9yJyxcbiAgICAgICAgTm90U3VwcG9ydGVkRXJyb3I6ICdUeXBlRXJyb3InLFxuICAgICAgICBQZXJtaXNzaW9uRGVuaWVkRXJyb3I6ICdOb3RBbGxvd2VkRXJyb3InLFxuICAgICAgICBTZWN1cml0eUVycm9yOiAnTm90QWxsb3dlZEVycm9yJ1xuICAgICAgfVtlLm5hbWVdIHx8IGUubmFtZSxcbiAgICAgIG1lc3NhZ2U6IHtcbiAgICAgICAgJ1RoZSBvcGVyYXRpb24gaXMgaW5zZWN1cmUuJzogJ1RoZSByZXF1ZXN0IGlzIG5vdCBhbGxvd2VkIGJ5IHRoZSAnICtcbiAgICAgICAgJ3VzZXIgYWdlbnQgb3IgdGhlIHBsYXRmb3JtIGluIHRoZSBjdXJyZW50IGNvbnRleHQuJ1xuICAgICAgfVtlLm1lc3NhZ2VdIHx8IGUubWVzc2FnZSxcbiAgICAgIGNvbnN0cmFpbnQ6IGUuY29uc3RyYWludCxcbiAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZSArICh0aGlzLm1lc3NhZ2UgJiYgJzogJykgKyB0aGlzLm1lc3NhZ2U7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICAvLyBnZXRVc2VyTWVkaWEgY29uc3RyYWludHMgc2hpbS5cbiAgdmFyIGdldFVzZXJNZWRpYV8gPSBmdW5jdGlvbihjb25zdHJhaW50cywgb25TdWNjZXNzLCBvbkVycm9yKSB7XG4gICAgdmFyIGNvbnN0cmFpbnRzVG9GRjM3XyA9IGZ1bmN0aW9uKGMpIHtcbiAgICAgIGlmICh0eXBlb2YgYyAhPT0gJ29iamVjdCcgfHwgYy5yZXF1aXJlKSB7XG4gICAgICAgIHJldHVybiBjO1xuICAgICAgfVxuICAgICAgdmFyIHJlcXVpcmUgPSBbXTtcbiAgICAgIE9iamVjdC5rZXlzKGMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIGlmIChrZXkgPT09ICdyZXF1aXJlJyB8fCBrZXkgPT09ICdhZHZhbmNlZCcgfHwga2V5ID09PSAnbWVkaWFTb3VyY2UnKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciByID0gY1trZXldID0gKHR5cGVvZiBjW2tleV0gPT09ICdvYmplY3QnKSA/XG4gICAgICAgICAgICBjW2tleV0gOiB7aWRlYWw6IGNba2V5XX07XG4gICAgICAgIGlmIChyLm1pbiAhPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICByLm1heCAhPT0gdW5kZWZpbmVkIHx8IHIuZXhhY3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJlcXVpcmUucHVzaChrZXkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyLmV4YWN0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHIuZXhhY3QgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByLiBtaW4gPSByLm1heCA9IHIuZXhhY3Q7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNba2V5XSA9IHIuZXhhY3Q7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRlbGV0ZSByLmV4YWN0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChyLmlkZWFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjLmFkdmFuY2VkID0gYy5hZHZhbmNlZCB8fCBbXTtcbiAgICAgICAgICB2YXIgb2MgPSB7fTtcbiAgICAgICAgICBpZiAodHlwZW9mIHIuaWRlYWwgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBvY1trZXldID0ge21pbjogci5pZGVhbCwgbWF4OiByLmlkZWFsfTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb2Nba2V5XSA9IHIuaWRlYWw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGMuYWR2YW5jZWQucHVzaChvYyk7XG4gICAgICAgICAgZGVsZXRlIHIuaWRlYWw7XG4gICAgICAgICAgaWYgKCFPYmplY3Qua2V5cyhyKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBjW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChyZXF1aXJlLmxlbmd0aCkge1xuICAgICAgICBjLnJlcXVpcmUgPSByZXF1aXJlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGM7XG4gICAgfTtcbiAgICBjb25zdHJhaW50cyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoY29uc3RyYWludHMpKTtcbiAgICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDM4KSB7XG4gICAgICBsb2dnaW5nKCdzcGVjOiAnICsgSlNPTi5zdHJpbmdpZnkoY29uc3RyYWludHMpKTtcbiAgICAgIGlmIChjb25zdHJhaW50cy5hdWRpbykge1xuICAgICAgICBjb25zdHJhaW50cy5hdWRpbyA9IGNvbnN0cmFpbnRzVG9GRjM3Xyhjb25zdHJhaW50cy5hdWRpbyk7XG4gICAgICB9XG4gICAgICBpZiAoY29uc3RyYWludHMudmlkZW8pIHtcbiAgICAgICAgY29uc3RyYWludHMudmlkZW8gPSBjb25zdHJhaW50c1RvRkYzN18oY29uc3RyYWludHMudmlkZW8pO1xuICAgICAgfVxuICAgICAgbG9nZ2luZygnZmYzNzogJyArIEpTT04uc3RyaW5naWZ5KGNvbnN0cmFpbnRzKSk7XG4gICAgfVxuICAgIHJldHVybiBuYXZpZ2F0b3IubW96R2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzLCBvblN1Y2Nlc3MsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIG9uRXJyb3Ioc2hpbUVycm9yXyhlKSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gUmV0dXJucyB0aGUgcmVzdWx0IG9mIGdldFVzZXJNZWRpYSBhcyBhIFByb21pc2UuXG4gIHZhciBnZXRVc2VyTWVkaWFQcm9taXNlXyA9IGZ1bmN0aW9uKGNvbnN0cmFpbnRzKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgZ2V0VXNlck1lZGlhXyhjb25zdHJhaW50cywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBTaGltIGZvciBtZWRpYURldmljZXMgb24gb2xkZXIgdmVyc2lvbnMuXG4gIGlmICghbmF2aWdhdG9yLm1lZGlhRGV2aWNlcykge1xuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMgPSB7Z2V0VXNlck1lZGlhOiBnZXRVc2VyTWVkaWFQcm9taXNlXyxcbiAgICAgIGFkZEV2ZW50TGlzdGVuZXI6IGZ1bmN0aW9uKCkgeyB9LFxuICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcjogZnVuY3Rpb24oKSB7IH1cbiAgICB9O1xuICB9XG4gIG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlcyA9XG4gICAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmVudW1lcmF0ZURldmljZXMgfHwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICAgICAgdmFyIGluZm9zID0gW1xuICAgICAgICAgICAge2tpbmQ6ICdhdWRpb2lucHV0JywgZGV2aWNlSWQ6ICdkZWZhdWx0JywgbGFiZWw6ICcnLCBncm91cElkOiAnJ30sXG4gICAgICAgICAgICB7a2luZDogJ3ZpZGVvaW5wdXQnLCBkZXZpY2VJZDogJ2RlZmF1bHQnLCBsYWJlbDogJycsIGdyb3VwSWQ6ICcnfVxuICAgICAgICAgIF07XG4gICAgICAgICAgcmVzb2x2ZShpbmZvcyk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDQxKSB7XG4gICAgLy8gV29yayBhcm91bmQgaHR0cDovL2J1Z3ppbC5sYS8xMTY5NjY1XG4gICAgdmFyIG9yZ0VudW1lcmF0ZURldmljZXMgPVxuICAgICAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmVudW1lcmF0ZURldmljZXMuYmluZChuYXZpZ2F0b3IubWVkaWFEZXZpY2VzKTtcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmVudW1lcmF0ZURldmljZXMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBvcmdFbnVtZXJhdGVEZXZpY2VzKCkudGhlbih1bmRlZmluZWQsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKGUubmFtZSA9PT0gJ05vdEZvdW5kRXJyb3InKSB7XG4gICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG4gIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgNDkpIHtcbiAgICB2YXIgb3JpZ0dldFVzZXJNZWRpYSA9IG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhLlxuICAgICAgICBiaW5kKG5hdmlnYXRvci5tZWRpYURldmljZXMpO1xuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhID0gZnVuY3Rpb24oYykge1xuICAgICAgcmV0dXJuIG9yaWdHZXRVc2VyTWVkaWEoYykudGhlbihmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgICAgLy8gV29yayBhcm91bmQgaHR0cHM6Ly9idWd6aWwubGEvODAyMzI2XG4gICAgICAgIGlmIChjLmF1ZGlvICYmICFzdHJlYW0uZ2V0QXVkaW9UcmFja3MoKS5sZW5ndGggfHxcbiAgICAgICAgICAgIGMudmlkZW8gJiYgIXN0cmVhbS5nZXRWaWRlb1RyYWNrcygpLmxlbmd0aCkge1xuICAgICAgICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XG4gICAgICAgICAgICB0cmFjay5zdG9wKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbignVGhlIG9iamVjdCBjYW4gbm90IGJlIGZvdW5kIGhlcmUuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdOb3RGb3VuZEVycm9yJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0cmVhbTtcbiAgICAgIH0sIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHNoaW1FcnJvcl8oZSkpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfVxuICBpZiAoIShicm93c2VyRGV0YWlscy52ZXJzaW9uID4gNTUgJiZcbiAgICAgICdhdXRvR2FpbkNvbnRyb2wnIGluIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0U3VwcG9ydGVkQ29uc3RyYWludHMoKSkpIHtcbiAgICB2YXIgcmVtYXAgPSBmdW5jdGlvbihvYmosIGEsIGIpIHtcbiAgICAgIGlmIChhIGluIG9iaiAmJiAhKGIgaW4gb2JqKSkge1xuICAgICAgICBvYmpbYl0gPSBvYmpbYV07XG4gICAgICAgIGRlbGV0ZSBvYmpbYV07XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBuYXRpdmVHZXRVc2VyTWVkaWEgPSBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYS5cbiAgICAgICAgYmluZChuYXZpZ2F0b3IubWVkaWFEZXZpY2VzKTtcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSA9IGZ1bmN0aW9uKGMpIHtcbiAgICAgIGlmICh0eXBlb2YgYyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIGMuYXVkaW8gPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGMpKTtcbiAgICAgICAgcmVtYXAoYy5hdWRpbywgJ2F1dG9HYWluQ29udHJvbCcsICdtb3pBdXRvR2FpbkNvbnRyb2wnKTtcbiAgICAgICAgcmVtYXAoYy5hdWRpbywgJ25vaXNlU3VwcHJlc3Npb24nLCAnbW96Tm9pc2VTdXBwcmVzc2lvbicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5hdGl2ZUdldFVzZXJNZWRpYShjKTtcbiAgICB9O1xuXG4gICAgaWYgKE1lZGlhU3RyZWFtVHJhY2sgJiYgTWVkaWFTdHJlYW1UcmFjay5wcm90b3R5cGUuZ2V0U2V0dGluZ3MpIHtcbiAgICAgIHZhciBuYXRpdmVHZXRTZXR0aW5ncyA9IE1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLmdldFNldHRpbmdzO1xuICAgICAgTWVkaWFTdHJlYW1UcmFjay5wcm90b3R5cGUuZ2V0U2V0dGluZ3MgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG9iaiA9IG5hdGl2ZUdldFNldHRpbmdzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIHJlbWFwKG9iaiwgJ21vekF1dG9HYWluQ29udHJvbCcsICdhdXRvR2FpbkNvbnRyb2wnKTtcbiAgICAgICAgcmVtYXAob2JqLCAnbW96Tm9pc2VTdXBwcmVzc2lvbicsICdub2lzZVN1cHByZXNzaW9uJyk7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmIChNZWRpYVN0cmVhbVRyYWNrICYmIE1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLmFwcGx5Q29uc3RyYWludHMpIHtcbiAgICAgIHZhciBuYXRpdmVBcHBseUNvbnN0cmFpbnRzID0gTWVkaWFTdHJlYW1UcmFjay5wcm90b3R5cGUuYXBwbHlDb25zdHJhaW50cztcbiAgICAgIE1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLmFwcGx5Q29uc3RyYWludHMgPSBmdW5jdGlvbihjKSB7XG4gICAgICAgIGlmICh0aGlzLmtpbmQgPT09ICdhdWRpbycgJiYgdHlwZW9mIGMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgYyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYykpO1xuICAgICAgICAgIHJlbWFwKGMsICdhdXRvR2FpbkNvbnRyb2wnLCAnbW96QXV0b0dhaW5Db250cm9sJyk7XG4gICAgICAgICAgcmVtYXAoYywgJ25vaXNlU3VwcHJlc3Npb24nLCAnbW96Tm9pc2VTdXBwcmVzc2lvbicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuYXRpdmVBcHBseUNvbnN0cmFpbnRzLmFwcGx5KHRoaXMsIFtjXSk7XG4gICAgICB9O1xuICAgIH1cbiAgfVxuICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhID0gZnVuY3Rpb24oY29uc3RyYWludHMsIG9uU3VjY2Vzcywgb25FcnJvcikge1xuICAgIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgNDQpIHtcbiAgICAgIHJldHVybiBnZXRVc2VyTWVkaWFfKGNvbnN0cmFpbnRzLCBvblN1Y2Nlc3MsIG9uRXJyb3IpO1xuICAgIH1cbiAgICAvLyBSZXBsYWNlIEZpcmVmb3ggNDQrJ3MgZGVwcmVjYXRpb24gd2FybmluZyB3aXRoIHVucHJlZml4ZWQgdmVyc2lvbi5cbiAgICB1dGlscy5kZXByZWNhdGVkKCduYXZpZ2F0b3IuZ2V0VXNlck1lZGlhJyxcbiAgICAgICAgJ25hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhJyk7XG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoY29uc3RyYWludHMpLnRoZW4ob25TdWNjZXNzLCBvbkVycm9yKTtcbiAgfTtcbn07XG5cbn0se1wiLi4vdXRpbHNcIjoxM31dLDEyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8qXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXG4gKiAgdHJlZS5cbiAqL1xuJ3VzZSBzdHJpY3QnO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNoaW1Mb2NhbFN0cmVhbXNBUEk6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAnb2JqZWN0JyB8fCAhd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghKCdnZXRMb2NhbFN0cmVhbXMnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldExvY2FsU3RyZWFtcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2xvY2FsU3RyZWFtcykge1xuICAgICAgICAgIHRoaXMuX2xvY2FsU3RyZWFtcyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9sb2NhbFN0cmVhbXM7XG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAoISgnZ2V0U3RyZWFtQnlJZCcgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkpIHtcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U3RyZWFtQnlJZCA9IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBudWxsO1xuICAgICAgICBpZiAodGhpcy5fbG9jYWxTdHJlYW1zKSB7XG4gICAgICAgICAgdGhpcy5fbG9jYWxTdHJlYW1zLmZvckVhY2goZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICAgICAgICBpZiAoc3RyZWFtLmlkID09PSBpZCkge1xuICAgICAgICAgICAgICByZXN1bHQgPSBzdHJlYW07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3JlbW90ZVN0cmVhbXMpIHtcbiAgICAgICAgICB0aGlzLl9yZW1vdGVTdHJlYW1zLmZvckVhY2goZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICAgICAgICBpZiAoc3RyZWFtLmlkID09PSBpZCkge1xuICAgICAgICAgICAgICByZXN1bHQgPSBzdHJlYW07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH07XG4gICAgfVxuICAgIGlmICghKCdhZGRTdHJlYW0nIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XG4gICAgICB2YXIgX2FkZFRyYWNrID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjaztcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICAgIGlmICghdGhpcy5fbG9jYWxTdHJlYW1zKSB7XG4gICAgICAgICAgdGhpcy5fbG9jYWxTdHJlYW1zID0gW107XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2xvY2FsU3RyZWFtcy5pbmRleE9mKHN0cmVhbSkgPT09IC0xKSB7XG4gICAgICAgICAgdGhpcy5fbG9jYWxTdHJlYW1zLnB1c2goc3RyZWFtKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xuICAgICAgICAgIF9hZGRUcmFjay5jYWxsKHBjLCB0cmFjaywgc3RyZWFtKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFRyYWNrID0gZnVuY3Rpb24odHJhY2ssIHN0cmVhbSkge1xuICAgICAgICBpZiAoc3RyZWFtKSB7XG4gICAgICAgICAgaWYgKCF0aGlzLl9sb2NhbFN0cmVhbXMpIHtcbiAgICAgICAgICAgIHRoaXMuX2xvY2FsU3RyZWFtcyA9IFtzdHJlYW1dO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fbG9jYWxTdHJlYW1zLmluZGV4T2Yoc3RyZWFtKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuX2xvY2FsU3RyZWFtcy5wdXNoKHN0cmVhbSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfYWRkVHJhY2suY2FsbCh0aGlzLCB0cmFjaywgc3RyZWFtKTtcbiAgICAgIH07XG4gICAgfVxuICAgIGlmICghKCdyZW1vdmVTdHJlYW0nIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgICBpZiAoIXRoaXMuX2xvY2FsU3RyZWFtcykge1xuICAgICAgICAgIHRoaXMuX2xvY2FsU3RyZWFtcyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuX2xvY2FsU3RyZWFtcy5pbmRleE9mKHN0cmVhbSk7XG4gICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbG9jYWxTdHJlYW1zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICAgIHZhciB0cmFja3MgPSBzdHJlYW0uZ2V0VHJhY2tzKCk7XG4gICAgICAgIHRoaXMuZ2V0U2VuZGVycygpLmZvckVhY2goZnVuY3Rpb24oc2VuZGVyKSB7XG4gICAgICAgICAgaWYgKHRyYWNrcy5pbmRleE9mKHNlbmRlci50cmFjaykgIT09IC0xKSB7XG4gICAgICAgICAgICBwYy5yZW1vdmVUcmFjayhzZW5kZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH1cbiAgfSxcbiAgc2hpbVJlbW90ZVN0cmVhbXNBUEk6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAnb2JqZWN0JyB8fCAhd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghKCdnZXRSZW1vdGVTdHJlYW1zJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRSZW1vdGVTdHJlYW1zID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZW1vdGVTdHJlYW1zID8gdGhpcy5fcmVtb3RlU3RyZWFtcyA6IFtdO1xuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKCEoJ29uYWRkc3RyZWFtJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUsICdvbmFkZHN0cmVhbScsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fb25hZGRzdHJlYW07XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24oZikge1xuICAgICAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICAgICAgaWYgKHRoaXMuX29uYWRkc3RyZWFtKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2FkZHN0cmVhbScsIHRoaXMuX29uYWRkc3RyZWFtKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhY2snLCB0aGlzLl9vbmFkZHN0cmVhbXBvbHkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2FkZHN0cmVhbScsIHRoaXMuX29uYWRkc3RyZWFtID0gZik7XG4gICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCd0cmFjaycsIHRoaXMuX29uYWRkc3RyZWFtcG9seSA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUuc3RyZWFtcy5mb3JFYWNoKGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgICAgICAgICBpZiAoIXBjLl9yZW1vdGVTdHJlYW1zKSB7XG4gICAgICAgICAgICAgICAgcGMuX3JlbW90ZVN0cmVhbXMgPSBbXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAocGMuX3JlbW90ZVN0cmVhbXMuaW5kZXhPZihzdHJlYW0pID49IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcGMuX3JlbW90ZVN0cmVhbXMucHVzaChzdHJlYW0pO1xuICAgICAgICAgICAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ2FkZHN0cmVhbScpO1xuICAgICAgICAgICAgICBldmVudC5zdHJlYW0gPSBzdHJlYW07XG4gICAgICAgICAgICAgIHBjLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgc2hpbUNhbGxiYWNrc0FQSTogZnVuY3Rpb24od2luZG93KSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICdvYmplY3QnIHx8ICF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHByb3RvdHlwZSA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGU7XG4gICAgdmFyIGNyZWF0ZU9mZmVyID0gcHJvdG90eXBlLmNyZWF0ZU9mZmVyO1xuICAgIHZhciBjcmVhdGVBbnN3ZXIgPSBwcm90b3R5cGUuY3JlYXRlQW5zd2VyO1xuICAgIHZhciBzZXRMb2NhbERlc2NyaXB0aW9uID0gcHJvdG90eXBlLnNldExvY2FsRGVzY3JpcHRpb247XG4gICAgdmFyIHNldFJlbW90ZURlc2NyaXB0aW9uID0gcHJvdG90eXBlLnNldFJlbW90ZURlc2NyaXB0aW9uO1xuICAgIHZhciBhZGRJY2VDYW5kaWRhdGUgPSBwcm90b3R5cGUuYWRkSWNlQ2FuZGlkYXRlO1xuXG4gICAgcHJvdG90eXBlLmNyZWF0ZU9mZmVyID0gZnVuY3Rpb24oc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spIHtcbiAgICAgIHZhciBvcHRpb25zID0gKGFyZ3VtZW50cy5sZW5ndGggPj0gMikgPyBhcmd1bWVudHNbMl0gOiBhcmd1bWVudHNbMF07XG4gICAgICB2YXIgcHJvbWlzZSA9IGNyZWF0ZU9mZmVyLmFwcGx5KHRoaXMsIFtvcHRpb25zXSk7XG4gICAgICBpZiAoIWZhaWx1cmVDYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgIH1cbiAgICAgIHByb21pc2UudGhlbihzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjayk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfTtcblxuICAgIHByb3RvdHlwZS5jcmVhdGVBbnN3ZXIgPSBmdW5jdGlvbihzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjaykge1xuICAgICAgdmFyIG9wdGlvbnMgPSAoYXJndW1lbnRzLmxlbmd0aCA+PSAyKSA/IGFyZ3VtZW50c1syXSA6IGFyZ3VtZW50c1swXTtcbiAgICAgIHZhciBwcm9taXNlID0gY3JlYXRlQW5zd2VyLmFwcGx5KHRoaXMsIFtvcHRpb25zXSk7XG4gICAgICBpZiAoIWZhaWx1cmVDYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgIH1cbiAgICAgIHByb21pc2UudGhlbihzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjayk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfTtcblxuICAgIHZhciB3aXRoQ2FsbGJhY2sgPSBmdW5jdGlvbihkZXNjcmlwdGlvbiwgc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spIHtcbiAgICAgIHZhciBwcm9taXNlID0gc2V0TG9jYWxEZXNjcmlwdGlvbi5hcHBseSh0aGlzLCBbZGVzY3JpcHRpb25dKTtcbiAgICAgIGlmICghZmFpbHVyZUNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgICAgfVxuICAgICAgcHJvbWlzZS50aGVuKHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9O1xuICAgIHByb3RvdHlwZS5zZXRMb2NhbERlc2NyaXB0aW9uID0gd2l0aENhbGxiYWNrO1xuXG4gICAgd2l0aENhbGxiYWNrID0gZnVuY3Rpb24oZGVzY3JpcHRpb24sIHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKSB7XG4gICAgICB2YXIgcHJvbWlzZSA9IHNldFJlbW90ZURlc2NyaXB0aW9uLmFwcGx5KHRoaXMsIFtkZXNjcmlwdGlvbl0pO1xuICAgICAgaWYgKCFmYWlsdXJlQ2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgICB9XG4gICAgICBwcm9taXNlLnRoZW4oc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH07XG4gICAgcHJvdG90eXBlLnNldFJlbW90ZURlc2NyaXB0aW9uID0gd2l0aENhbGxiYWNrO1xuXG4gICAgd2l0aENhbGxiYWNrID0gZnVuY3Rpb24oY2FuZGlkYXRlLCBzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjaykge1xuICAgICAgdmFyIHByb21pc2UgPSBhZGRJY2VDYW5kaWRhdGUuYXBwbHkodGhpcywgW2NhbmRpZGF0ZV0pO1xuICAgICAgaWYgKCFmYWlsdXJlQ2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgICB9XG4gICAgICBwcm9taXNlLnRoZW4oc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH07XG4gICAgcHJvdG90eXBlLmFkZEljZUNhbmRpZGF0ZSA9IHdpdGhDYWxsYmFjaztcbiAgfSxcbiAgc2hpbUdldFVzZXJNZWRpYTogZnVuY3Rpb24od2luZG93KSB7XG4gICAgdmFyIG5hdmlnYXRvciA9IHdpbmRvdyAmJiB3aW5kb3cubmF2aWdhdG9yO1xuXG4gICAgaWYgKCFuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhKSB7XG4gICAgICBpZiAobmF2aWdhdG9yLndlYmtpdEdldFVzZXJNZWRpYSkge1xuICAgICAgICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhID0gbmF2aWdhdG9yLndlYmtpdEdldFVzZXJNZWRpYS5iaW5kKG5hdmlnYXRvcik7XG4gICAgICB9IGVsc2UgaWYgKG5hdmlnYXRvci5tZWRpYURldmljZXMgJiZcbiAgICAgICAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSkge1xuICAgICAgICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhID0gZnVuY3Rpb24oY29uc3RyYWludHMsIGNiLCBlcnJjYikge1xuICAgICAgICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzKVxuICAgICAgICAgIC50aGVuKGNiLCBlcnJjYik7XG4gICAgICAgIH0uYmluZChuYXZpZ2F0b3IpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgc2hpbVJUQ0ljZVNlcnZlclVybHM6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIC8vIG1pZ3JhdGUgZnJvbSBub24tc3BlYyBSVENJY2VTZXJ2ZXIudXJsIHRvIFJUQ0ljZVNlcnZlci51cmxzXG4gICAgdmFyIE9yaWdQZWVyQ29ubmVjdGlvbiA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbjtcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gPSBmdW5jdGlvbihwY0NvbmZpZywgcGNDb25zdHJhaW50cykge1xuICAgICAgaWYgKHBjQ29uZmlnICYmIHBjQ29uZmlnLmljZVNlcnZlcnMpIHtcbiAgICAgICAgdmFyIG5ld0ljZVNlcnZlcnMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwY0NvbmZpZy5pY2VTZXJ2ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIHNlcnZlciA9IHBjQ29uZmlnLmljZVNlcnZlcnNbaV07XG4gICAgICAgICAgaWYgKCFzZXJ2ZXIuaGFzT3duUHJvcGVydHkoJ3VybHMnKSAmJlxuICAgICAgICAgICAgICBzZXJ2ZXIuaGFzT3duUHJvcGVydHkoJ3VybCcpKSB7XG4gICAgICAgICAgICB1dGlscy5kZXByZWNhdGVkKCdSVENJY2VTZXJ2ZXIudXJsJywgJ1JUQ0ljZVNlcnZlci51cmxzJyk7XG4gICAgICAgICAgICBzZXJ2ZXIgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHNlcnZlcikpO1xuICAgICAgICAgICAgc2VydmVyLnVybHMgPSBzZXJ2ZXIudXJsO1xuICAgICAgICAgICAgZGVsZXRlIHNlcnZlci51cmw7XG4gICAgICAgICAgICBuZXdJY2VTZXJ2ZXJzLnB1c2goc2VydmVyKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3SWNlU2VydmVycy5wdXNoKHBjQ29uZmlnLmljZVNlcnZlcnNbaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwY0NvbmZpZy5pY2VTZXJ2ZXJzID0gbmV3SWNlU2VydmVycztcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgT3JpZ1BlZXJDb25uZWN0aW9uKHBjQ29uZmlnLCBwY0NvbnN0cmFpbnRzKTtcbiAgICB9O1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUgPSBPcmlnUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlO1xuICAgIC8vIHdyYXAgc3RhdGljIG1ldGhvZHMuIEN1cnJlbnRseSBqdXN0IGdlbmVyYXRlQ2VydGlmaWNhdGUuXG4gICAgaWYgKCdnZW5lcmF0ZUNlcnRpZmljYXRlJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24pIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24sICdnZW5lcmF0ZUNlcnRpZmljYXRlJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBPcmlnUGVlckNvbm5lY3Rpb24uZ2VuZXJhdGVDZXJ0aWZpY2F0ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9LFxuICBzaGltVHJhY2tFdmVudFRyYW5zY2VpdmVyOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICAvLyBBZGQgZXZlbnQudHJhbnNjZWl2ZXIgbWVtYmVyIG92ZXIgZGVwcmVjYXRlZCBldmVudC5yZWNlaXZlclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gJiZcbiAgICAgICAgKCdyZWNlaXZlcicgaW4gd2luZG93LlJUQ1RyYWNrRXZlbnQucHJvdG90eXBlKSAmJlxuICAgICAgICAvLyBjYW4ndCBjaGVjayAndHJhbnNjZWl2ZXInIGluIHdpbmRvdy5SVENUcmFja0V2ZW50LnByb3RvdHlwZSwgYXMgaXQgaXNcbiAgICAgICAgLy8gZGVmaW5lZCBmb3Igc29tZSByZWFzb24gZXZlbiB3aGVuIHdpbmRvdy5SVENUcmFuc2NlaXZlciBpcyBub3QuXG4gICAgICAgICF3aW5kb3cuUlRDVHJhbnNjZWl2ZXIpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDVHJhY2tFdmVudC5wcm90b3R5cGUsICd0cmFuc2NlaXZlcicsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4ge3JlY2VpdmVyOiB0aGlzLnJlY2VpdmVyfTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIHNoaW1DcmVhdGVPZmZlckxlZ2FjeTogZnVuY3Rpb24od2luZG93KSB7XG4gICAgdmFyIG9yaWdDcmVhdGVPZmZlciA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlT2ZmZXI7XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5jcmVhdGVPZmZlciA9IGZ1bmN0aW9uKG9mZmVyT3B0aW9ucykge1xuICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgIGlmIChvZmZlck9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAvLyBzdXBwb3J0IGJpdCB2YWx1ZXNcbiAgICAgICAgICBvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbyA9ICEhb2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW87XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGF1ZGlvVHJhbnNjZWl2ZXIgPSBwYy5nZXRUcmFuc2NlaXZlcnMoKS5maW5kKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XG4gICAgICAgICAgcmV0dXJuIHRyYW5zY2VpdmVyLnNlbmRlci50cmFjayAmJlxuICAgICAgICAgICAgICB0cmFuc2NlaXZlci5zZW5kZXIudHJhY2sua2luZCA9PT0gJ2F1ZGlvJztcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbyA9PT0gZmFsc2UgJiYgYXVkaW9UcmFuc2NlaXZlcikge1xuICAgICAgICAgIGlmIChhdWRpb1RyYW5zY2VpdmVyLmRpcmVjdGlvbiA9PT0gJ3NlbmRyZWN2Jykge1xuICAgICAgICAgICAgaWYgKGF1ZGlvVHJhbnNjZWl2ZXIuc2V0RGlyZWN0aW9uKSB7XG4gICAgICAgICAgICAgIGF1ZGlvVHJhbnNjZWl2ZXIuc2V0RGlyZWN0aW9uKCdzZW5kb25seScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgYXVkaW9UcmFuc2NlaXZlci5kaXJlY3Rpb24gPSAnc2VuZG9ubHknO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoYXVkaW9UcmFuc2NlaXZlci5kaXJlY3Rpb24gPT09ICdyZWN2b25seScpIHtcbiAgICAgICAgICAgIGlmIChhdWRpb1RyYW5zY2VpdmVyLnNldERpcmVjdGlvbikge1xuICAgICAgICAgICAgICBhdWRpb1RyYW5zY2VpdmVyLnNldERpcmVjdGlvbignaW5hY3RpdmUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGF1ZGlvVHJhbnNjZWl2ZXIuZGlyZWN0aW9uID0gJ2luYWN0aXZlJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW8gPT09IHRydWUgJiZcbiAgICAgICAgICAgICFhdWRpb1RyYW5zY2VpdmVyKSB7XG4gICAgICAgICAgcGMuYWRkVHJhbnNjZWl2ZXIoJ2F1ZGlvJyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmICh0eXBlb2Ygb2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW8gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgLy8gc3VwcG9ydCBiaXQgdmFsdWVzXG4gICAgICAgICAgb2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlVmlkZW8gPSAhIW9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvO1xuICAgICAgICB9XG4gICAgICAgIHZhciB2aWRlb1RyYW5zY2VpdmVyID0gcGMuZ2V0VHJhbnNjZWl2ZXJzKCkuZmluZChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xuICAgICAgICAgIHJldHVybiB0cmFuc2NlaXZlci5zZW5kZXIudHJhY2sgJiZcbiAgICAgICAgICAgICAgdHJhbnNjZWl2ZXIuc2VuZGVyLnRyYWNrLmtpbmQgPT09ICd2aWRlbyc7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlVmlkZW8gPT09IGZhbHNlICYmIHZpZGVvVHJhbnNjZWl2ZXIpIHtcbiAgICAgICAgICBpZiAodmlkZW9UcmFuc2NlaXZlci5kaXJlY3Rpb24gPT09ICdzZW5kcmVjdicpIHtcbiAgICAgICAgICAgIHZpZGVvVHJhbnNjZWl2ZXIuc2V0RGlyZWN0aW9uKCdzZW5kb25seScpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodmlkZW9UcmFuc2NlaXZlci5kaXJlY3Rpb24gPT09ICdyZWN2b25seScpIHtcbiAgICAgICAgICAgIHZpZGVvVHJhbnNjZWl2ZXIuc2V0RGlyZWN0aW9uKCdpbmFjdGl2ZScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVWaWRlbyA9PT0gdHJ1ZSAmJlxuICAgICAgICAgICAgIXZpZGVvVHJhbnNjZWl2ZXIpIHtcbiAgICAgICAgICBwYy5hZGRUcmFuc2NlaXZlcigndmlkZW8nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG9yaWdDcmVhdGVPZmZlci5hcHBseShwYywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG59O1xuXG59LHtcIi4uL3V0aWxzXCI6MTN9XSwxMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vKlxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxuICogIHRyZWUuXG4gKi9cbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIGxvZ0Rpc2FibGVkXyA9IHRydWU7XG52YXIgZGVwcmVjYXRpb25XYXJuaW5nc18gPSB0cnVlO1xuXG4vKipcbiAqIEV4dHJhY3QgYnJvd3NlciB2ZXJzaW9uIG91dCBvZiB0aGUgcHJvdmlkZWQgdXNlciBhZ2VudCBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHshc3RyaW5nfSB1YXN0cmluZyB1c2VyQWdlbnQgc3RyaW5nLlxuICogQHBhcmFtIHshc3RyaW5nfSBleHByIFJlZ3VsYXIgZXhwcmVzc2lvbiB1c2VkIGFzIG1hdGNoIGNyaXRlcmlhLlxuICogQHBhcmFtIHshbnVtYmVyfSBwb3MgcG9zaXRpb24gaW4gdGhlIHZlcnNpb24gc3RyaW5nIHRvIGJlIHJldHVybmVkLlxuICogQHJldHVybiB7IW51bWJlcn0gYnJvd3NlciB2ZXJzaW9uLlxuICovXG5mdW5jdGlvbiBleHRyYWN0VmVyc2lvbih1YXN0cmluZywgZXhwciwgcG9zKSB7XG4gIHZhciBtYXRjaCA9IHVhc3RyaW5nLm1hdGNoKGV4cHIpO1xuICByZXR1cm4gbWF0Y2ggJiYgbWF0Y2gubGVuZ3RoID49IHBvcyAmJiBwYXJzZUludChtYXRjaFtwb3NdLCAxMCk7XG59XG5cbi8vIFdyYXBzIHRoZSBwZWVyY29ubmVjdGlvbiBldmVudCBldmVudE5hbWVUb1dyYXAgaW4gYSBmdW5jdGlvblxuLy8gd2hpY2ggcmV0dXJucyB0aGUgbW9kaWZpZWQgZXZlbnQgb2JqZWN0LlxuZnVuY3Rpb24gd3JhcFBlZXJDb25uZWN0aW9uRXZlbnQod2luZG93LCBldmVudE5hbWVUb1dyYXAsIHdyYXBwZXIpIHtcbiAgaWYgKCF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIHByb3RvID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZTtcbiAgdmFyIG5hdGl2ZUFkZEV2ZW50TGlzdGVuZXIgPSBwcm90by5hZGRFdmVudExpc3RlbmVyO1xuICBwcm90by5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24obmF0aXZlRXZlbnROYW1lLCBjYikge1xuICAgIGlmIChuYXRpdmVFdmVudE5hbWUgIT09IGV2ZW50TmFtZVRvV3JhcCkge1xuICAgICAgcmV0dXJuIG5hdGl2ZUFkZEV2ZW50TGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gICAgdmFyIHdyYXBwZWRDYWxsYmFjayA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIGNiKHdyYXBwZXIoZSkpO1xuICAgIH07XG4gICAgdGhpcy5fZXZlbnRNYXAgPSB0aGlzLl9ldmVudE1hcCB8fCB7fTtcbiAgICB0aGlzLl9ldmVudE1hcFtjYl0gPSB3cmFwcGVkQ2FsbGJhY2s7XG4gICAgcmV0dXJuIG5hdGl2ZUFkZEV2ZW50TGlzdGVuZXIuYXBwbHkodGhpcywgW25hdGl2ZUV2ZW50TmFtZSxcbiAgICAgIHdyYXBwZWRDYWxsYmFja10pO1xuICB9O1xuXG4gIHZhciBuYXRpdmVSZW1vdmVFdmVudExpc3RlbmVyID0gcHJvdG8ucmVtb3ZlRXZlbnRMaXN0ZW5lcjtcbiAgcHJvdG8ucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKG5hdGl2ZUV2ZW50TmFtZSwgY2IpIHtcbiAgICBpZiAobmF0aXZlRXZlbnROYW1lICE9PSBldmVudE5hbWVUb1dyYXAgfHwgIXRoaXMuX2V2ZW50TWFwXG4gICAgICAgIHx8ICF0aGlzLl9ldmVudE1hcFtjYl0pIHtcbiAgICAgIHJldHVybiBuYXRpdmVSZW1vdmVFdmVudExpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICAgIHZhciB1bndyYXBwZWRDYiA9IHRoaXMuX2V2ZW50TWFwW2NiXTtcbiAgICBkZWxldGUgdGhpcy5fZXZlbnRNYXBbY2JdO1xuICAgIHJldHVybiBuYXRpdmVSZW1vdmVFdmVudExpc3RlbmVyLmFwcGx5KHRoaXMsIFtuYXRpdmVFdmVudE5hbWUsXG4gICAgICB1bndyYXBwZWRDYl0pO1xuICB9O1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgJ29uJyArIGV2ZW50TmFtZVRvV3JhcCwge1xuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpc1snX29uJyArIGV2ZW50TmFtZVRvV3JhcF07XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKGNiKSB7XG4gICAgICBpZiAodGhpc1snX29uJyArIGV2ZW50TmFtZVRvV3JhcF0pIHtcbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZVRvV3JhcCxcbiAgICAgICAgICAgIHRoaXNbJ19vbicgKyBldmVudE5hbWVUb1dyYXBdKTtcbiAgICAgICAgZGVsZXRlIHRoaXNbJ19vbicgKyBldmVudE5hbWVUb1dyYXBdO1xuICAgICAgfVxuICAgICAgaWYgKGNiKSB7XG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWVUb1dyYXAsXG4gICAgICAgICAgICB0aGlzWydfb24nICsgZXZlbnROYW1lVG9XcmFwXSA9IGNiKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuXG4vLyBVdGlsaXR5IG1ldGhvZHMuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZXh0cmFjdFZlcnNpb246IGV4dHJhY3RWZXJzaW9uLFxuICB3cmFwUGVlckNvbm5lY3Rpb25FdmVudDogd3JhcFBlZXJDb25uZWN0aW9uRXZlbnQsXG4gIGRpc2FibGVMb2c6IGZ1bmN0aW9uKGJvb2wpIHtcbiAgICBpZiAodHlwZW9mIGJvb2wgIT09ICdib29sZWFuJykge1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcignQXJndW1lbnQgdHlwZTogJyArIHR5cGVvZiBib29sICtcbiAgICAgICAgICAnLiBQbGVhc2UgdXNlIGEgYm9vbGVhbi4nKTtcbiAgICB9XG4gICAgbG9nRGlzYWJsZWRfID0gYm9vbDtcbiAgICByZXR1cm4gKGJvb2wpID8gJ2FkYXB0ZXIuanMgbG9nZ2luZyBkaXNhYmxlZCcgOlxuICAgICAgICAnYWRhcHRlci5qcyBsb2dnaW5nIGVuYWJsZWQnO1xuICB9LFxuXG4gIC8qKlxuICAgKiBEaXNhYmxlIG9yIGVuYWJsZSBkZXByZWNhdGlvbiB3YXJuaW5nc1xuICAgKiBAcGFyYW0geyFib29sZWFufSBib29sIHNldCB0byB0cnVlIHRvIGRpc2FibGUgd2FybmluZ3MuXG4gICAqL1xuICBkaXNhYmxlV2FybmluZ3M6IGZ1bmN0aW9uKGJvb2wpIHtcbiAgICBpZiAodHlwZW9mIGJvb2wgIT09ICdib29sZWFuJykge1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcignQXJndW1lbnQgdHlwZTogJyArIHR5cGVvZiBib29sICtcbiAgICAgICAgICAnLiBQbGVhc2UgdXNlIGEgYm9vbGVhbi4nKTtcbiAgICB9XG4gICAgZGVwcmVjYXRpb25XYXJuaW5nc18gPSAhYm9vbDtcbiAgICByZXR1cm4gJ2FkYXB0ZXIuanMgZGVwcmVjYXRpb24gd2FybmluZ3MgJyArIChib29sID8gJ2Rpc2FibGVkJyA6ICdlbmFibGVkJyk7XG4gIH0sXG5cbiAgbG9nOiBmdW5jdGlvbigpIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChsb2dEaXNhYmxlZF8pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgY29uc29sZS5sb2cgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIFNob3dzIGEgZGVwcmVjYXRpb24gd2FybmluZyBzdWdnZXN0aW5nIHRoZSBtb2Rlcm4gYW5kIHNwZWMtY29tcGF0aWJsZSBBUEkuXG4gICAqL1xuICBkZXByZWNhdGVkOiBmdW5jdGlvbihvbGRNZXRob2QsIG5ld01ldGhvZCkge1xuICAgIGlmICghZGVwcmVjYXRpb25XYXJuaW5nc18pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc29sZS53YXJuKG9sZE1ldGhvZCArICcgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSAnICsgbmV3TWV0aG9kICtcbiAgICAgICAgJyBpbnN0ZWFkLicpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBCcm93c2VyIGRldGVjdG9yLlxuICAgKlxuICAgKiBAcmV0dXJuIHtvYmplY3R9IHJlc3VsdCBjb250YWluaW5nIGJyb3dzZXIgYW5kIHZlcnNpb25cbiAgICogICAgIHByb3BlcnRpZXMuXG4gICAqL1xuICBkZXRlY3RCcm93c2VyOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICB2YXIgbmF2aWdhdG9yID0gd2luZG93ICYmIHdpbmRvdy5uYXZpZ2F0b3I7XG5cbiAgICAvLyBSZXR1cm5lZCByZXN1bHQgb2JqZWN0LlxuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICByZXN1bHQuYnJvd3NlciA9IG51bGw7XG4gICAgcmVzdWx0LnZlcnNpb24gPSBudWxsO1xuXG4gICAgLy8gRmFpbCBlYXJseSBpZiBpdCdzIG5vdCBhIGJyb3dzZXJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgfHwgIXdpbmRvdy5uYXZpZ2F0b3IpIHtcbiAgICAgIHJlc3VsdC5icm93c2VyID0gJ05vdCBhIGJyb3dzZXIuJztcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgaWYgKG5hdmlnYXRvci5tb3pHZXRVc2VyTWVkaWEpIHsgLy8gRmlyZWZveC5cbiAgICAgIHJlc3VsdC5icm93c2VyID0gJ2ZpcmVmb3gnO1xuICAgICAgcmVzdWx0LnZlcnNpb24gPSBleHRyYWN0VmVyc2lvbihuYXZpZ2F0b3IudXNlckFnZW50LFxuICAgICAgICAgIC9GaXJlZm94XFwvKFxcZCspXFwuLywgMSk7XG4gICAgfSBlbHNlIGlmIChuYXZpZ2F0b3Iud2Via2l0R2V0VXNlck1lZGlhKSB7XG4gICAgICAvLyBDaHJvbWUsIENocm9taXVtLCBXZWJ2aWV3LCBPcGVyYS5cbiAgICAgIC8vIFZlcnNpb24gbWF0Y2hlcyBDaHJvbWUvV2ViUlRDIHZlcnNpb24uXG4gICAgICByZXN1bHQuYnJvd3NlciA9ICdjaHJvbWUnO1xuICAgICAgcmVzdWx0LnZlcnNpb24gPSBleHRyYWN0VmVyc2lvbihuYXZpZ2F0b3IudXNlckFnZW50LFxuICAgICAgICAgIC9DaHJvbShlfGl1bSlcXC8oXFxkKylcXC4vLCAyKTtcbiAgICB9IGVsc2UgaWYgKG5hdmlnYXRvci5tZWRpYURldmljZXMgJiZcbiAgICAgICAgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvRWRnZVxcLyhcXGQrKS4oXFxkKykkLykpIHsgLy8gRWRnZS5cbiAgICAgIHJlc3VsdC5icm93c2VyID0gJ2VkZ2UnO1xuICAgICAgcmVzdWx0LnZlcnNpb24gPSBleHRyYWN0VmVyc2lvbihuYXZpZ2F0b3IudXNlckFnZW50LFxuICAgICAgICAgIC9FZGdlXFwvKFxcZCspLihcXGQrKSQvLCAyKTtcbiAgICB9IGVsc2UgaWYgKHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiAmJlxuICAgICAgICBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9BcHBsZVdlYktpdFxcLyhcXGQrKVxcLi8pKSB7IC8vIFNhZmFyaS5cbiAgICAgIHJlc3VsdC5icm93c2VyID0gJ3NhZmFyaSc7XG4gICAgICByZXN1bHQudmVyc2lvbiA9IGV4dHJhY3RWZXJzaW9uKG5hdmlnYXRvci51c2VyQWdlbnQsXG4gICAgICAgICAgL0FwcGxlV2ViS2l0XFwvKFxcZCspXFwuLywgMSk7XG4gICAgfSBlbHNlIHsgLy8gRGVmYXVsdCBmYWxsdGhyb3VnaDogbm90IHN1cHBvcnRlZC5cbiAgICAgIHJlc3VsdC5icm93c2VyID0gJ05vdCBhIHN1cHBvcnRlZCBicm93c2VyLic7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5cbn0se31dfSx7fSxbM10pKDMpXG59KTsiXSwic291cmNlUm9vdCI6IiJ9