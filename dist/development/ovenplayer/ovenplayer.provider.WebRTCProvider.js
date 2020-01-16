/*! OvenPlayerv0.9.850 | (c)2020 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
                    that.play();
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

        function handleCreateOfferError(event) {
            // console.log('createOffer() error: ', event);
        }

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

    //This is temporary function. we can't build STRUN server.
    var copyCandidate = function copyCandidate(basicCandidate) {
        var cloneCandidate = _underscore2["default"].clone(basicCandidate);
        function generateDomainFromUrl(url) {
            var result = void 0;
            var match = void 0;
            if (match = url.match(/^(?:wss?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im)) {
                result = match[1];
                /*if (match = result.match(/^[^\.]+\.(.+\..+)$/)) {
                 result = match[1]
                 }*/
            }
            return result;
        }
        function findIp(candidate) {
            var result = "";
            var match = "";
            if (match = candidate.match(new RegExp("\\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b", 'gi'))) {
                result = match[0];
            }

            return result;
        }

        var newDomain = generateDomainFromUrl(webSocketUrl);
        var ip = findIp(cloneCandidate.candidate);
        if (ip === newDomain) {
            return null;
        }
        //cloneCandidate.candidate.replace(cloneCandidate.address, newDomain);
        cloneCandidate.candidate = cloneCandidate.candidate.replace(ip, newDomain);
        //cloneCandidate.candidate = cloneCandidate.candidate.replace(new RegExp("\\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b", 'gi'), newDomain)

        return cloneCandidate;
    };

    function addIceCandidate(peerConnection, candidates) {

        for (var i = 0; i < candidates.length; i++) {
            if (candidates[i] && candidates[i].candidate) {

                var basicCandidate = candidates[i];

                var cloneCandidate = copyCandidate(basicCandidate);

                peerConnection.addIceCandidate(new RTCIceCandidate(basicCandidate)).then(function (e) {
                    OvenPlayerConsole.log("addIceCandidate : success");
                })["catch"](function (error) {
                    var tempError = _constants.ERRORS.codes[_constants.PLAYER_WEBRTC_ADD_ICECANDIDATE_ERROR];
                    tempError.error = error;
                    closePeer(tempError);
                });

                if (cloneCandidate) {
                    peerConnection.addIceCandidate(new RTCIceCandidate(cloneCandidate)).then(function () {
                        // console.log("cloneCandidate addIceCandidate : success");
                    })["catch"](function (error) {
                        var tempError = _constants.ERRORS.codes[_constants.PLAYER_WEBRTC_ADD_ICECANDIDATE_ERROR];
                        tempError.error = error;
                        closePeer(tempError);
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

            mainStream = null;

            OvenPlayerConsole.log('Closing main peer connection...');
            if (statisticsTimer) {
                clearTimeout(statisticsTimer);
            }

            mainPeerConnectionInfo.peerConnection.close();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9XZWJSVEMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvV2ViUlRDTG9hZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9hZGFwdGVyLmpzIl0sIm5hbWVzIjpbIldlYlJUQyIsImVsZW1lbnQiLCJwbGF5ZXJDb25maWciLCJhZFRhZ1VybCIsInRoYXQiLCJ3ZWJydGNMb2FkZXIiLCJzdXBlckRlc3Ryb3lfZnVuYyIsInNwZWMiLCJuYW1lIiwiUFJPVklERVJfV0VCUlRDIiwibXNlIiwibGlzdGVuZXIiLCJpc0xvYWRlZCIsImNhblNlZWsiLCJpc0xpdmUiLCJzZWVraW5nIiwic3RhdGUiLCJTVEFURV9JRExFIiwiYnVmZmVyIiwiZnJhbWVyYXRlIiwiY3VycmVudFF1YWxpdHkiLCJjdXJyZW50U291cmNlIiwicXVhbGl0eUxldmVscyIsInNvdXJjZXMiLCJzb3VyY2UiLCJmaWxlIiwidHlwZSIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwiZGVzdHJveSIsImxvYWRDYWxsYmFjayIsInN0cmVhbSIsInNyY09iamVjdCIsImVycm9yVHJpZ2dlciIsImNvbm5lY3QiLCJlcnJvciIsIm9uIiwiQ09OVEVOVF9NRVRBIiwiaXNBdXRvU3RhcnQiLCJwbGF5Iiwib2ZmIiwiV2ViUlRDTG9hZGVyIiwicHJvdmlkZXIiLCJ3ZWJTb2NrZXRVcmwiLCJwZWVyQ29ubmVjdGlvbkNvbmZpZyIsImdldENvbmZpZyIsIndlYnJ0Y0NvbmZpZyIsImljZVNlcnZlcnMiLCJpY2VUcmFuc3BvcnRQb2xpY3kiLCJ3cyIsIndzUGluZyIsIm1haW5TdHJlYW0iLCJtYWluUGVlckNvbm5lY3Rpb25JbmZvIiwiY2xpZW50UGVlckNvbm5lY3Rpb25zIiwid3NDbG9zZWRCeVBsYXllciIsInN0YXRpc3RpY3NUaW1lciIsImV4aXN0aW5nSGFuZGxlciIsIndpbmRvdyIsIm9uYmVmb3JldW5sb2FkIiwiZXZlbnQiLCJjbG9zZVBlZXIiLCJnZXRQZWVyQ29ubmVjdGlvbkJ5SWQiLCJpZCIsInBlZXJDb25uZWN0aW9uIiwiZXh0cmFjdExvc3NQYWNrZXRzT25OZXR3b3JrU3RhdHVzIiwicGVlckNvbm5lY3Rpb25JbmZvIiwiY2xlYXJUaW1lb3V0Iiwic3RhdHVzIiwibG9zdFBhY2tldHNBcnIiLCJzbG90TGVuZ3RoIiwicHJldlBhY2tldHNMb3N0IiwiYXZnOExvc3NlcyIsImF2Z01vcmVUaGFuVGhyZXNob2xkQ291bnQiLCJ0aHJlc2hvbGQiLCJzZXRUaW1lb3V0IiwiZ2V0U3RhdHMiLCJ0aGVuIiwic3RhdHMiLCJhdXRvRmFsbGJhY2siLCJmb3JFYWNoIiwia2luZCIsImlzUmVtb3RlIiwiYWN0dWFsUGFja2V0TG9zdCIsInBhcnNlSW50IiwicGFja2V0c0xvc3QiLCJwdXNoIiwibGVuZ3RoIiwic2hpZnQiLCJfIiwicmVkdWNlIiwibWVtbyIsIm51bSIsInRlbXBFcnJvciIsIkVSUk9SUyIsImNvZGVzIiwiUExBWUVSX1dFQlJUQ19ORVRXT1JLX1NMT1ciLCJjcmVhdGVNYWluUGVlckNvbm5lY3Rpb24iLCJwZWVySWQiLCJzZHAiLCJjYW5kaWRhdGVzIiwicmVzb2x2ZSIsIlJUQ1BlZXJDb25uZWN0aW9uIiwic2V0UmVtb3RlRGVzY3JpcHRpb24iLCJSVENTZXNzaW9uRGVzY3JpcHRpb24iLCJjcmVhdGVBbnN3ZXIiLCJkZXNjIiwic2V0TG9jYWxEZXNjcmlwdGlvbiIsImxvY2FsU0RQIiwibG9jYWxEZXNjcmlwdGlvbiIsInNlbmRNZXNzYWdlIiwicGVlcl9pZCIsImNvbW1hbmQiLCJQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19DUkVBVEVfQU5TV0VSX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19TRVRfUkVNT1RFX0RFU0NfRVJST1IiLCJhZGRJY2VDYW5kaWRhdGUiLCJvbmljZWNhbmRpZGF0ZSIsImUiLCJjYW5kaWRhdGUiLCJvbmNvbm5lY3Rpb25zdGF0ZWNoYW5nZSIsImNvbm5lY3Rpb25TdGF0ZSIsIm9uaWNlY29ubmVjdGlvbnN0YXRlY2hhbmdlIiwiaWNlQ29ubmVjdGlvblN0YXRlIiwiUExBWUVSX1dFQlJUQ19VTkVYUEVDVEVEX0RJU0NPTk5FQ1QiLCJvbnRyYWNrIiwic3RyZWFtcyIsImNyZWF0ZUNsaWVudFBlZXJDb25uZWN0aW9uIiwiaG9zdElkIiwiY2xpZW50SWQiLCJhZGRTdHJlYW0iLCJjcmVhdGVPZmZlciIsInNldExvY2FsQW5kU2VuZE1lc3NhZ2UiLCJoYW5kbGVDcmVhdGVPZmZlckVycm9yIiwic2Vzc2lvbkRlc2NyaXB0aW9uIiwiY29weUNhbmRpZGF0ZSIsImJhc2ljQ2FuZGlkYXRlIiwiY2xvbmVDYW5kaWRhdGUiLCJjbG9uZSIsImdlbmVyYXRlRG9tYWluRnJvbVVybCIsInVybCIsInJlc3VsdCIsIm1hdGNoIiwiZmluZElwIiwiUmVnRXhwIiwibmV3RG9tYWluIiwiaXAiLCJyZXBsYWNlIiwiaSIsIlJUQ0ljZUNhbmRpZGF0ZSIsIlBMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUiIsImluaXRXZWJTb2NrZXQiLCJyZWplY3QiLCJXZWJTb2NrZXQiLCJvbm9wZW4iLCJvbm1lc3NhZ2UiLCJtZXNzYWdlIiwiSlNPTiIsInBhcnNlIiwiZGF0YSIsIlBMQVlFUl9XRUJSVENfV1NfRVJST1IiLCJPYmplY3QiLCJrZXlzIiwiY29uc3RydWN0b3IiLCJ0cmlnZ2VyIiwiT01FX1AyUF9NT0RFIiwicGVlckNvbm5lY3Rpb24xIiwicGVlckNvbm5lY3Rpb24yIiwicGVlckNvbm5lY3Rpb24zIiwiY2xvc2UiLCJwYXVzZSIsIm9uY2xvc2UiLCJvbmVycm9yIiwiaW5pdGlhbGl6ZSIsIlByb21pc2UiLCJjbGllbnRQZWVyQ29ubmVjdGlvbiIsImNsZWFySW50ZXJ2YWwiLCJyZWFkeVN0YXRlIiwic2VuZCIsInN0cmluZ2lmeSIsImYiLCJleHBvcnRzIiwibW9kdWxlIiwiZGVmaW5lIiwidCIsIm4iLCJyIiwicyIsIm8iLCJ1IiwiYSIsInJlcXVpcmUiLCJFcnJvciIsImNvZGUiLCJsIiwiY2FsbCIsIlNEUFV0aWxzIiwid3JpdGVNZWRpYVNlY3Rpb24iLCJ0cmFuc2NlaXZlciIsImNhcHMiLCJkdGxzUm9sZSIsIndyaXRlUnRwRGVzY3JpcHRpb24iLCJ3cml0ZUljZVBhcmFtZXRlcnMiLCJpY2VHYXRoZXJlciIsImdldExvY2FsUGFyYW1ldGVycyIsIndyaXRlRHRsc1BhcmFtZXRlcnMiLCJkdGxzVHJhbnNwb3J0IiwibWlkIiwicnRwU2VuZGVyIiwicnRwUmVjZWl2ZXIiLCJ0cmFja0lkIiwiX2luaXRpYWxUcmFja0lkIiwidHJhY2siLCJtc2lkIiwic2VuZEVuY29kaW5nUGFyYW1ldGVycyIsInNzcmMiLCJydHgiLCJsb2NhbENOYW1lIiwiZmlsdGVySWNlU2VydmVycyIsImVkZ2VWZXJzaW9uIiwiaGFzVHVybiIsImZpbHRlciIsInNlcnZlciIsInVybHMiLCJjb25zb2xlIiwid2FybiIsImlzU3RyaW5nIiwidmFsaWRUdXJuIiwiaW5kZXhPZiIsImdldENvbW1vbkNhcGFiaWxpdGllcyIsImxvY2FsQ2FwYWJpbGl0aWVzIiwicmVtb3RlQ2FwYWJpbGl0aWVzIiwiY29tbW9uQ2FwYWJpbGl0aWVzIiwiY29kZWNzIiwiaGVhZGVyRXh0ZW5zaW9ucyIsImZlY01lY2hhbmlzbXMiLCJmaW5kQ29kZWNCeVBheWxvYWRUeXBlIiwicHQiLCJwYXlsb2FkVHlwZSIsInByZWZlcnJlZFBheWxvYWRUeXBlIiwicnR4Q2FwYWJpbGl0eU1hdGNoZXMiLCJsUnR4IiwiclJ0eCIsImxDb2RlY3MiLCJyQ29kZWNzIiwibENvZGVjIiwicGFyYW1ldGVycyIsImFwdCIsInJDb2RlYyIsInRvTG93ZXJDYXNlIiwiY2xvY2tSYXRlIiwibnVtQ2hhbm5lbHMiLCJNYXRoIiwibWluIiwicnRjcEZlZWRiYWNrIiwiZmIiLCJqIiwicGFyYW1ldGVyIiwibEhlYWRlckV4dGVuc2lvbiIsInJIZWFkZXJFeHRlbnNpb24iLCJ1cmkiLCJpc0FjdGlvbkFsbG93ZWRJblNpZ25hbGluZ1N0YXRlIiwiYWN0aW9uIiwic2lnbmFsaW5nU3RhdGUiLCJvZmZlciIsImFuc3dlciIsIm1heWJlQWRkQ2FuZGlkYXRlIiwiaWNlVHJhbnNwb3J0IiwiYWxyZWFkeUFkZGVkIiwiZ2V0UmVtb3RlQ2FuZGlkYXRlcyIsImZpbmQiLCJyZW1vdGVDYW5kaWRhdGUiLCJmb3VuZGF0aW9uIiwicG9ydCIsInByaW9yaXR5IiwicHJvdG9jb2wiLCJhZGRSZW1vdGVDYW5kaWRhdGUiLCJtYWtlRXJyb3IiLCJkZXNjcmlwdGlvbiIsIk5vdFN1cHBvcnRlZEVycm9yIiwiSW52YWxpZFN0YXRlRXJyb3IiLCJJbnZhbGlkQWNjZXNzRXJyb3IiLCJUeXBlRXJyb3IiLCJ1bmRlZmluZWQiLCJPcGVyYXRpb25FcnJvciIsImFkZFRyYWNrVG9TdHJlYW1BbmRGaXJlRXZlbnQiLCJhZGRUcmFjayIsImRpc3BhdGNoRXZlbnQiLCJNZWRpYVN0cmVhbVRyYWNrRXZlbnQiLCJyZW1vdmVUcmFja0Zyb21TdHJlYW1BbmRGaXJlRXZlbnQiLCJyZW1vdmVUcmFjayIsImZpcmVBZGRUcmFjayIsInBjIiwicmVjZWl2ZXIiLCJ0cmFja0V2ZW50IiwiRXZlbnQiLCJfZGlzcGF0Y2hFdmVudCIsImNvbmZpZyIsIl9ldmVudFRhcmdldCIsImRvY3VtZW50IiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsIm1ldGhvZCIsImJpbmQiLCJjYW5Ucmlja2xlSWNlQ2FuZGlkYXRlcyIsIm5lZWROZWdvdGlhdGlvbiIsImxvY2FsU3RyZWFtcyIsInJlbW90ZVN0cmVhbXMiLCJyZW1vdGVEZXNjcmlwdGlvbiIsImljZUdhdGhlcmluZ1N0YXRlIiwidXNpbmdCdW5kbGUiLCJidW5kbGVQb2xpY3kiLCJydGNwTXV4UG9saWN5IiwiX2ljZUdhdGhlcmVycyIsImljZUNhbmRpZGF0ZVBvb2xTaXplIiwiUlRDSWNlR2F0aGVyZXIiLCJnYXRoZXJQb2xpY3kiLCJfY29uZmlnIiwidHJhbnNjZWl2ZXJzIiwiX3NkcFNlc3Npb25JZCIsImdlbmVyYXRlU2Vzc2lvbklkIiwiX3NkcFNlc3Npb25WZXJzaW9uIiwiX2R0bHNSb2xlIiwiX2lzQ2xvc2VkIiwicHJvdG90eXBlIiwib25hZGRzdHJlYW0iLCJvbnJlbW92ZXN0cmVhbSIsIm9uc2lnbmFsaW5nc3RhdGVjaGFuZ2UiLCJvbmljZWdhdGhlcmluZ3N0YXRlY2hhbmdlIiwib25uZWdvdGlhdGlvbm5lZWRlZCIsIm9uZGF0YWNoYW5uZWwiLCJfZW1pdEdhdGhlcmluZ1N0YXRlQ2hhbmdlIiwiZ2V0Q29uZmlndXJhdGlvbiIsImdldExvY2FsU3RyZWFtcyIsImdldFJlbW90ZVN0cmVhbXMiLCJfY3JlYXRlVHJhbnNjZWl2ZXIiLCJkb05vdEFkZCIsImhhc0J1bmRsZVRyYW5zcG9ydCIsInJlY3ZFbmNvZGluZ1BhcmFtZXRlcnMiLCJhc3NvY2lhdGVkUmVtb3RlTWVkaWFTdHJlYW1zIiwid2FudFJlY2VpdmUiLCJ0cmFuc3BvcnRzIiwiX2NyZWF0ZUljZUFuZER0bHNUcmFuc3BvcnRzIiwiYWxyZWFkeUV4aXN0cyIsIl9tYXliZUZpcmVOZWdvdGlhdGlvbk5lZWRlZCIsIlJUQ1J0cFNlbmRlciIsImdldFRyYWNrcyIsImNsb25lZFN0cmVhbSIsImlkeCIsImNsb25lZFRyYWNrIiwiYWRkRXZlbnRMaXN0ZW5lciIsImVuYWJsZWQiLCJzZW5kZXIiLCJzdG9wIiwibWFwIiwic3BsaWNlIiwicmVtb3ZlU3RyZWFtIiwiZ2V0U2VuZGVycyIsImdldFJlY2VpdmVycyIsIl9jcmVhdGVJY2VHYXRoZXJlciIsInNkcE1MaW5lSW5kZXgiLCJkZWZpbmVQcm9wZXJ0eSIsInZhbHVlIiwid3JpdGFibGUiLCJidWZmZXJlZENhbmRpZGF0ZUV2ZW50cyIsImJ1ZmZlckNhbmRpZGF0ZXMiLCJlbmQiLCJfZ2F0aGVyIiwib25sb2NhbGNhbmRpZGF0ZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJldnQiLCJzZHBNaWQiLCJjYW5kIiwiY29tcG9uZW50IiwidWZyYWciLCJ1c2VybmFtZUZyYWdtZW50Iiwic2VyaWFsaXplZENhbmRpZGF0ZSIsIndyaXRlQ2FuZGlkYXRlIiwicGFyc2VDYW5kaWRhdGUiLCJ0b0pTT04iLCJzZWN0aW9ucyIsImdldE1lZGlhU2VjdGlvbnMiLCJnZXREZXNjcmlwdGlvbiIsImpvaW4iLCJjb21wbGV0ZSIsImV2ZXJ5IiwiUlRDSWNlVHJhbnNwb3J0Iiwib25pY2VzdGF0ZWNoYW5nZSIsIl91cGRhdGVJY2VDb25uZWN0aW9uU3RhdGUiLCJfdXBkYXRlQ29ubmVjdGlvblN0YXRlIiwiUlRDRHRsc1RyYW5zcG9ydCIsIm9uZHRsc3N0YXRlY2hhbmdlIiwiX2Rpc3Bvc2VJY2VBbmREdGxzVHJhbnNwb3J0cyIsIl90cmFuc2NlaXZlIiwicmVjdiIsInBhcmFtcyIsImVuY29kaW5ncyIsInJ0Y3AiLCJjbmFtZSIsImNvbXBvdW5kIiwicnRjcFBhcmFtZXRlcnMiLCJwIiwicmVjZWl2ZSIsInNlc3Npb25wYXJ0Iiwic3BsaXRTZWN0aW9ucyIsIm1lZGlhU2VjdGlvbiIsInBhcnNlUnRwUGFyYW1ldGVycyIsImlzSWNlTGl0ZSIsIm1hdGNoUHJlZml4IiwicmVqZWN0ZWQiLCJpc1JlamVjdGVkIiwicmVtb3RlSWNlUGFyYW1ldGVycyIsImdldEljZVBhcmFtZXRlcnMiLCJyZW1vdGVEdGxzUGFyYW1ldGVycyIsImdldER0bHNQYXJhbWV0ZXJzIiwicm9sZSIsInN0YXJ0IiwiX3VwZGF0ZVNpZ25hbGluZ1N0YXRlIiwicmVjZWl2ZXJMaXN0IiwiaWNlT3B0aW9ucyIsInN1YnN0ciIsInNwbGl0IiwibGluZXMiLCJzcGxpdExpbmVzIiwiZ2V0S2luZCIsImRpcmVjdGlvbiIsImdldERpcmVjdGlvbiIsInJlbW90ZU1zaWQiLCJwYXJzZU1zaWQiLCJnZXRNaWQiLCJnZW5lcmF0ZUlkZW50aWZpZXIiLCJwYXJzZVJ0cEVuY29kaW5nUGFyYW1ldGVycyIsInBhcnNlUnRjcFBhcmFtZXRlcnMiLCJpc0NvbXBsZXRlIiwiY2FuZHMiLCJzZXRUcmFuc3BvcnQiLCJzZXRSZW1vdGVDYW5kaWRhdGVzIiwiUlRDUnRwUmVjZWl2ZXIiLCJnZXRDYXBhYmlsaXRpZXMiLCJjb2RlYyIsImlzTmV3VHJhY2siLCJNZWRpYVN0cmVhbSIsImdldCIsIm5hdGl2ZVRyYWNrIiwic2lkIiwiaXRlbSIsIm5ld1N0YXRlIiwic3RhdGVzIiwiY2xvc2VkIiwiY2hlY2tpbmciLCJjb25uZWN0ZWQiLCJjb21wbGV0ZWQiLCJkaXNjb25uZWN0ZWQiLCJmYWlsZWQiLCJjb25uZWN0aW5nIiwibnVtQXVkaW9UcmFja3MiLCJudW1WaWRlb1RyYWNrcyIsIm9mZmVyT3B0aW9ucyIsImFyZ3VtZW50cyIsIm1hbmRhdG9yeSIsIm9wdGlvbmFsIiwib2ZmZXJUb1JlY2VpdmVBdWRpbyIsIm9mZmVyVG9SZWNlaXZlVmlkZW8iLCJ3cml0ZVNlc3Npb25Cb2lsZXJwbGF0ZSIsInJlbW90ZUNvZGVjIiwiaGRyRXh0IiwicmVtb3RlRXh0ZW5zaW9ucyIsInJIZHJFeHQiLCJnZXRMb2NhbENhbmRpZGF0ZXMiLCJtZWRpYVNlY3Rpb25zSW5PZmZlciIsImxvY2FsVHJhY2siLCJnZXRBdWRpb1RyYWNrcyIsImdldFZpZGVvVHJhY2tzIiwiaGFzUnR4IiwiYyIsInJlZHVjZWRTaXplIiwiY2FuZGlkYXRlU3RyaW5nIiwidHJpbSIsInByb21pc2VzIiwiZml4U3RhdHNUeXBlIiwic3RhdCIsImluYm91bmRydHAiLCJvdXRib3VuZHJ0cCIsImNhbmRpZGF0ZXBhaXIiLCJsb2NhbGNhbmRpZGF0ZSIsInJlbW90ZWNhbmRpZGF0ZSIsInJlc3VsdHMiLCJNYXAiLCJhbGwiLCJyZXMiLCJzZXQiLCJtZXRob2RzIiwibmF0aXZlTWV0aG9kIiwiYXJncyIsImFwcGx5IiwicmFuZG9tIiwidG9TdHJpbmciLCJibG9iIiwibGluZSIsInBhcnRzIiwicGFydCIsImluZGV4IiwicHJlZml4Iiwic3Vic3RyaW5nIiwicmVsYXRlZEFkZHJlc3MiLCJyZWxhdGVkUG9ydCIsInRjcFR5cGUiLCJ0b1VwcGVyQ2FzZSIsInBhcnNlSWNlT3B0aW9ucyIsInBhcnNlUnRwTWFwIiwicGFyc2VkIiwid3JpdGVSdHBNYXAiLCJwYXJzZUV4dG1hcCIsIndyaXRlRXh0bWFwIiwiaGVhZGVyRXh0ZW5zaW9uIiwicHJlZmVycmVkSWQiLCJwYXJzZUZtdHAiLCJrdiIsIndyaXRlRm10cCIsInBhcmFtIiwicGFyc2VSdGNwRmIiLCJ3cml0ZVJ0Y3BGYiIsInBhcnNlU3NyY01lZGlhIiwic3AiLCJjb2xvbiIsImF0dHJpYnV0ZSIsInBhcnNlRmluZ2VycHJpbnQiLCJhbGdvcml0aG0iLCJmaW5nZXJwcmludHMiLCJzZXR1cFR5cGUiLCJmcCIsImNvbmNhdCIsImljZVBhcmFtZXRlcnMiLCJwYXNzd29yZCIsIm1saW5lIiwicnRwbWFwbGluZSIsImZtdHBzIiwibWF4cHRpbWUiLCJleHRlbnNpb24iLCJlbmNvZGluZ1BhcmFtZXRlcnMiLCJoYXNSZWQiLCJoYXNVbHBmZWMiLCJzc3JjcyIsInByaW1hcnlTc3JjIiwic2Vjb25kYXJ5U3NyYyIsImZsb3dzIiwiZW5jUGFyYW0iLCJjb2RlY1BheWxvYWRUeXBlIiwiZmVjIiwibWVjaGFuaXNtIiwiYmFuZHdpZHRoIiwibWF4Qml0cmF0ZSIsInJlbW90ZVNzcmMiLCJvYmoiLCJyc2l6ZSIsIm11eCIsInBsYW5CIiwic2Vzc0lkIiwic2Vzc1ZlciIsInNlc3Npb25JZCIsInZlcnNpb24iLCJwYXJzZU1MaW5lIiwiZm10Iiwic2xpY2UiLCJwYXJzZU9MaW5lIiwidXNlcm5hbWUiLCJzZXNzaW9uVmVyc2lvbiIsIm5ldFR5cGUiLCJhZGRyZXNzVHlwZSIsImFkZHJlc3MiLCJnbG9iYWwiLCJhZGFwdGVyRmFjdG9yeSIsInNlbGYiLCJ1dGlscyIsImRlcGVuZGVuY2llcyIsIm9wdHMiLCJvcHRpb25zIiwic2hpbUNocm9tZSIsInNoaW1GaXJlZm94Iiwic2hpbUVkZ2UiLCJzaGltU2FmYXJpIiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJsb2dnaW5nIiwiYnJvd3NlckRldGFpbHMiLCJkZXRlY3RCcm93c2VyIiwiY2hyb21lU2hpbSIsImVkZ2VTaGltIiwiZmlyZWZveFNoaW0iLCJzYWZhcmlTaGltIiwiY29tbW9uU2hpbSIsImFkYXB0ZXIiLCJleHRyYWN0VmVyc2lvbiIsImRpc2FibGVMb2ciLCJkaXNhYmxlV2FybmluZ3MiLCJicm93c2VyIiwic2hpbVBlZXJDb25uZWN0aW9uIiwiYnJvd3NlclNoaW0iLCJzaGltQ3JlYXRlT2JqZWN0VVJMIiwic2hpbUdldFVzZXJNZWRpYSIsInNoaW1NZWRpYVN0cmVhbSIsInNoaW1Tb3VyY2VPYmplY3QiLCJzaGltT25UcmFjayIsInNoaW1BZGRUcmFja1JlbW92ZVRyYWNrIiwic2hpbUdldFNlbmRlcnNXaXRoRHRtZiIsInNoaW1SVENJY2VDYW5kaWRhdGUiLCJzaGltTWF4TWVzc2FnZVNpemUiLCJzaGltU2VuZFRocm93VHlwZUVycm9yIiwic2hpbVJlbW92ZVN0cmVhbSIsInNoaW1SZXBsYWNlVHJhY2siLCJzaGltUlRDSWNlU2VydmVyVXJscyIsInNoaW1DYWxsYmFja3NBUEkiLCJzaGltTG9jYWxTdHJlYW1zQVBJIiwic2hpbVJlbW90ZVN0cmVhbXNBUEkiLCJzaGltVHJhY2tFdmVudFRyYW5zY2VpdmVyIiwic2hpbUNyZWF0ZU9mZmVyTGVnYWN5Iiwid2Via2l0TWVkaWFTdHJlYW0iLCJfb250cmFjayIsIm9yaWdTZXRSZW1vdGVEZXNjcmlwdGlvbiIsIl9vbnRyYWNrcG9seSIsInRlIiwid3JhcFBlZXJDb25uZWN0aW9uRXZlbnQiLCJzaGltU2VuZGVyV2l0aER0bWYiLCJkdG1mIiwiX2R0bWYiLCJjcmVhdGVEVE1GU2VuZGVyIiwiX3BjIiwiX3NlbmRlcnMiLCJvcmlnQWRkVHJhY2siLCJvcmlnUmVtb3ZlVHJhY2siLCJvcmlnQWRkU3RyZWFtIiwib3JpZ1JlbW92ZVN0cmVhbSIsIm9yaWdHZXRTZW5kZXJzIiwic2VuZGVycyIsIlVSTCIsIkhUTUxNZWRpYUVsZW1lbnQiLCJfc3JjT2JqZWN0Iiwic3JjIiwicmV2b2tlT2JqZWN0VVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwic2hpbUFkZFRyYWNrUmVtb3ZlVHJhY2tXaXRoTmF0aXZlIiwiX3NoaW1tZWRMb2NhbFN0cmVhbXMiLCJzdHJlYW1JZCIsIkRPTUV4Y2VwdGlvbiIsImV4aXN0aW5nU2VuZGVycyIsIm5ld1NlbmRlcnMiLCJuZXdTZW5kZXIiLCJvcmlnR2V0TG9jYWxTdHJlYW1zIiwibmF0aXZlU3RyZWFtcyIsIl9yZXZlcnNlU3RyZWFtcyIsIl9zdHJlYW1zIiwibmV3U3RyZWFtIiwib2xkU3RyZWFtIiwicmVwbGFjZUludGVybmFsU3RyZWFtSWQiLCJpbnRlcm5hbElkIiwiZXh0ZXJuYWxTdHJlYW0iLCJpbnRlcm5hbFN0cmVhbSIsInJlcGxhY2VFeHRlcm5hbFN0cmVhbUlkIiwiaXNMZWdhY3lDYWxsIiwiZXJyIiwib3JpZ1NldExvY2FsRGVzY3JpcHRpb24iLCJvcmlnTG9jYWxEZXNjcmlwdGlvbiIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImlzTG9jYWwiLCJzdHJlYW1pZCIsImhhc1RyYWNrIiwid2Via2l0UlRDUGVlckNvbm5lY3Rpb24iLCJwY0NvbmZpZyIsInBjQ29uc3RyYWludHMiLCJpY2VUcmFuc3BvcnRzIiwiZ2VuZXJhdGVDZXJ0aWZpY2F0ZSIsIk9yaWdQZWVyQ29ubmVjdGlvbiIsIm5ld0ljZVNlcnZlcnMiLCJkZXByZWNhdGVkIiwib3JpZ0dldFN0YXRzIiwic2VsZWN0b3IiLCJzdWNjZXNzQ2FsbGJhY2siLCJlcnJvckNhbGxiYWNrIiwiZml4Q2hyb21lU3RhdHNfIiwicmVzcG9uc2UiLCJzdGFuZGFyZFJlcG9ydCIsInJlcG9ydHMiLCJyZXBvcnQiLCJzdGFuZGFyZFN0YXRzIiwidGltZXN0YW1wIiwibmFtZXMiLCJtYWtlTWFwU3RhdHMiLCJzdWNjZXNzQ2FsbGJhY2tXcmFwcGVyXyIsInByb21pc2UiLCJuYXRpdmVBZGRJY2VDYW5kaWRhdGUiLCJuYXZpZ2F0b3IiLCJjb25zdHJhaW50c1RvQ2hyb21lXyIsImNjIiwiaWRlYWwiLCJleGFjdCIsIm1heCIsIm9sZG5hbWVfIiwiY2hhckF0Iiwib2MiLCJtaXgiLCJhZHZhbmNlZCIsInNoaW1Db25zdHJhaW50c18iLCJjb25zdHJhaW50cyIsImZ1bmMiLCJhdWRpbyIsInJlbWFwIiwiYiIsInZpZGVvIiwiZmFjZSIsImZhY2luZ01vZGUiLCJnZXRTdXBwb3J0ZWRGYWNpbmdNb2RlTGllcyIsIm1lZGlhRGV2aWNlcyIsImdldFN1cHBvcnRlZENvbnN0cmFpbnRzIiwibWF0Y2hlcyIsImVudW1lcmF0ZURldmljZXMiLCJkZXZpY2VzIiwiZCIsImRldiIsInNvbWUiLCJsYWJlbCIsImRldmljZUlkIiwic2hpbUVycm9yXyIsIlBlcm1pc3Npb25EZW5pZWRFcnJvciIsIlBlcm1pc3Npb25EaXNtaXNzZWRFcnJvciIsIkRldmljZXNOb3RGb3VuZEVycm9yIiwiQ29uc3RyYWludE5vdFNhdGlzZmllZEVycm9yIiwiVHJhY2tTdGFydEVycm9yIiwiTWVkaWFEZXZpY2VGYWlsZWREdWVUb1NodXRkb3duIiwiTWVkaWFEZXZpY2VLaWxsU3dpdGNoT24iLCJUYWJDYXB0dXJlRXJyb3IiLCJTY3JlZW5DYXB0dXJlRXJyb3IiLCJEZXZpY2VDYXB0dXJlRXJyb3IiLCJjb25zdHJhaW50IiwiY29uc3RyYWludE5hbWUiLCJnZXRVc2VyTWVkaWFfIiwib25TdWNjZXNzIiwib25FcnJvciIsIndlYmtpdEdldFVzZXJNZWRpYSIsImdldFVzZXJNZWRpYSIsImdldFVzZXJNZWRpYVByb21pc2VfIiwia2luZHMiLCJNZWRpYVN0cmVhbVRyYWNrIiwiZ2V0U291cmNlcyIsImRldmljZSIsImdyb3VwSWQiLCJlY2hvQ2FuY2VsbGF0aW9uIiwiZnJhbWVSYXRlIiwiaGVpZ2h0Iiwid2lkdGgiLCJvcmlnR2V0VXNlck1lZGlhIiwiY3MiLCJOYXRpdmVSVENJY2VDYW5kaWRhdGUiLCJuYXRpdmVDYW5kaWRhdGUiLCJwYXJzZWRDYW5kaWRhdGUiLCJhdWdtZW50ZWRDYW5kaWRhdGUiLCJuYXRpdmVDcmVhdGVPYmplY3RVUkwiLCJuYXRpdmVSZXZva2VPYmplY3RVUkwiLCJuZXdJZCIsImRzYyIsIm5hdGl2ZVNldEF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsIlJUQ1NjdHBUcmFuc3BvcnQiLCJfc2N0cCIsInNjdHBJbkRlc2NyaXB0aW9uIiwibUxpbmUiLCJnZXRSZW1vdGVGaXJlZm94VmVyc2lvbiIsImdldENhblNlbmRNYXhNZXNzYWdlU2l6ZSIsInJlbW90ZUlzRmlyZWZveCIsImNhblNlbmRNYXhNZXNzYWdlU2l6ZSIsImdldE1heE1lc3NhZ2VTaXplIiwibWF4TWVzc2FnZVNpemUiLCJpc0ZpcmVmb3giLCJjYW5TZW5kTU1TIiwicmVtb3RlTU1TIiwiTnVtYmVyIiwiUE9TSVRJVkVfSU5GSU5JVFkiLCJzY3RwIiwib3JpZ0NyZWF0ZURhdGFDaGFubmVsIiwiY3JlYXRlRGF0YUNoYW5uZWwiLCJkYXRhQ2hhbm5lbCIsIm9yaWdEYXRhQ2hhbm5lbFNlbmQiLCJkYyIsInNpemUiLCJieXRlTGVuZ3RoIiwic2hpbVJUQ1BlZXJDb25uZWN0aW9uIiwib3JpZ01TVEVuYWJsZWQiLCJldiIsIlJUQ0R0bWZTZW5kZXIiLCJSVENEVE1GU2VuZGVyIiwicmVwbGFjZVRyYWNrIiwic2V0VHJhY2siLCJSVENUcmFja0V2ZW50IiwibW96U3JjT2JqZWN0IiwibW96UlRDUGVlckNvbm5lY3Rpb24iLCJuZXdTZXJ2ZXIiLCJjcmVkZW50aWFsIiwibW96UlRDU2Vzc2lvbkRlc2NyaXB0aW9uIiwibW96UlRDSWNlQ2FuZGlkYXRlIiwibW9kZXJuU3RhdHNUeXBlcyIsIm5hdGl2ZUdldFN0YXRzIiwib25TdWNjIiwib25FcnIiLCJJbnRlcm5hbEVycm9yIiwiU2VjdXJpdHlFcnJvciIsImNvbnN0cmFpbnRzVG9GRjM3XyIsIm1vekdldFVzZXJNZWRpYSIsImluZm9zIiwib3JnRW51bWVyYXRlRGV2aWNlcyIsIm5hdGl2ZUdldFVzZXJNZWRpYSIsImdldFNldHRpbmdzIiwibmF0aXZlR2V0U2V0dGluZ3MiLCJhcHBseUNvbnN0cmFpbnRzIiwibmF0aXZlQXBwbHlDb25zdHJhaW50cyIsIl9sb2NhbFN0cmVhbXMiLCJnZXRTdHJlYW1CeUlkIiwiX3JlbW90ZVN0cmVhbXMiLCJfYWRkVHJhY2siLCJ0cmFja3MiLCJfb25hZGRzdHJlYW0iLCJfb25hZGRzdHJlYW1wb2x5IiwiZmFpbHVyZUNhbGxiYWNrIiwid2l0aENhbGxiYWNrIiwiY2IiLCJlcnJjYiIsIlJUQ1RyYW5zY2VpdmVyIiwib3JpZ0NyZWF0ZU9mZmVyIiwiYXVkaW9UcmFuc2NlaXZlciIsImdldFRyYW5zY2VpdmVycyIsInNldERpcmVjdGlvbiIsImFkZFRyYW5zY2VpdmVyIiwidmlkZW9UcmFuc2NlaXZlciIsImxvZ0Rpc2FibGVkXyIsImRlcHJlY2F0aW9uV2FybmluZ3NfIiwidWFzdHJpbmciLCJleHByIiwicG9zIiwiZXZlbnROYW1lVG9XcmFwIiwid3JhcHBlciIsInByb3RvIiwibmF0aXZlQWRkRXZlbnRMaXN0ZW5lciIsIm5hdGl2ZUV2ZW50TmFtZSIsIndyYXBwZWRDYWxsYmFjayIsIl9ldmVudE1hcCIsIm5hdGl2ZVJlbW92ZUV2ZW50TGlzdGVuZXIiLCJ1bndyYXBwZWRDYiIsImJvb2wiLCJvbGRNZXRob2QiLCJuZXdNZXRob2QiLCJ1c2VyQWdlbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7OztBQU1BLElBQU1BLFNBQVMsU0FBVEEsTUFBUyxDQUFTQyxPQUFULEVBQWtCQyxZQUFsQixFQUFnQ0MsUUFBaEMsRUFBeUM7QUFDcEQsUUFBSUMsT0FBTyxFQUFYO0FBQ0EsUUFBSUMsZUFBZSxJQUFuQjtBQUNBLFFBQUlDLG9CQUFxQixJQUF6Qjs7QUFFQSxRQUFJQyxPQUFPO0FBQ1BDLGNBQU9DLDBCQURBO0FBRVBSLGlCQUFVQSxPQUZIO0FBR1BTLGFBQU0sSUFIQztBQUlQQyxrQkFBVyxJQUpKO0FBS1BDLGtCQUFXLEtBTEo7QUFNUEMsaUJBQVUsS0FOSDtBQU9QQyxnQkFBUyxL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cWMsT0FBUCxHQUFpQixRQUFqQjtBQUNBcmMsbUJBQU9rYSxPQUFQLEdBQWlCZ0MsZUFBZWtHLFVBQVU4SixTQUF6QixFQUNiLHNCQURhLEVBQ1csQ0FEWCxDQUFqQjtBQUVELFdBTE0sTUFLQTtBQUFFO0FBQ1Bsc0IsbUJBQU9xYyxPQUFQLEdBQWlCLDBCQUFqQjtBQUNBLG1CQUFPcmMsTUFBUDtBQUNEOztBQUVELGlCQUFPQSxNQUFQO0FBQ0Q7QUE5RmMsT0FBakI7QUFpR0MsS0FoTHFCLEVBZ0xwQixFQWhMb0IsQ0E5cEpveEIsRUFBM2IsRUE4MEp4VyxFQTkwSndXLEVBODBKclcsQ0FBQyxDQUFELENBOTBKcVcsRUE4MEpoVyxDQTkwSmdXLENBQVA7QUErMEp2VyxDQS8wSkQsRSIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLldlYlJUQ1Byb3ZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gMTEuLlxuICovXG5pbXBvcnQgUHJvdmlkZXIgZnJvbSBcImFwaS9wcm92aWRlci9odG1sNS9Qcm92aWRlclwiO1xuaW1wb3J0IFdlYlJUQ0xvYWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9XZWJSVENMb2FkZXJcIjtcbmltcG9ydCB7aXNXZWJSVEN9IGZyb20gXCJ1dGlscy92YWxpZGF0b3JcIjtcbmltcG9ydCB7ZXJyb3JUcmlnZ2VyfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XG5pbXBvcnQge1BST1ZJREVSX1dFQlJUQywgU1RBVEVfSURMRSwgQ09OVEVOVF9NRVRBLCBTVEFURV9QTEFZSU5HfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG4vKipcbiAqIEBicmllZiAgIHdlYnJ0YyBwcm92aWRlciBleHRlbmRlZCBjb3JlLlxuICogQHBhcmFtICAgY29udGFpbmVyIHBsYXllciBlbGVtZW50LlxuICogQHBhcmFtICAgcGxheWVyQ29uZmlnICAgIGNvbmZpZy5cbiAqICovXG5cbmNvbnN0IFdlYlJUQyA9IGZ1bmN0aW9uKGVsZW1lbnQsIHBsYXllckNvbmZpZywgYWRUYWdVcmwpe1xuICAgIGxldCB0aGF0ID0ge307XG4gICAgbGV0IHdlYnJ0Y0xvYWRlciA9IG51bGw7XG4gICAgbGV0IHN1cGVyRGVzdHJveV9mdW5jICA9IG51bGw7XG5cbiAgICBsZXQgc3BlYyA9IHtcbiAgICAgICAgbmFtZSA6IFBST1ZJREVSX1dFQlJUQyxcbiAgICAgICAgZWxlbWVudCA6IGVsZW1lbnQsXG4gICAgICAgIG1zZSA6IG51bGwsXG4gICAgICAgIGxpc3RlbmVyIDogbnVsbCxcbiAgICAgICAgaXNMb2FkZWQgOiBmYWxzZSxcbiAgICAgICAgY2FuU2VlayA6IGZhbHNlLFxuICAgICAgICBpc0xpdmUgOiBmYWxzZSxcbiAgICAgICAgc2Vla2luZyA6IGZhbHNlLFxuICAgICAgICBzdGF0ZSA6IFNUQVRFX0lETEUsXG4gICAgICAgIGJ1ZmZlciA6IDAsXG4gICAgICAgIGZyYW1lcmF0ZSA6IDAsXG4gICAgICAgIGN1cnJlbnRRdWFsaXR5IDogLTEsXG4gICAgICAgIGN1cnJlbnRTb3VyY2UgOiAtMSxcbiAgICAgICAgcXVhbGl0eUxldmVscyA6IFtdLFxuICAgICAgICBzb3VyY2VzIDogW10sXG4gICAgICAgIGFkVGFnVXJsIDogYWRUYWdVcmxcbiAgICB9O1xuXG4gICAgdGhhdCA9IFByb3ZpZGVyKHNwZWMsIHBsYXllckNvbmZpZywgZnVuY3Rpb24oc291cmNlKXtcbiAgICAgICAgaWYoaXNXZWJSVEMoc291cmNlLmZpbGUsIHNvdXJjZS50eXBlKSl7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJXRUJSVEMgOiBvbkJlZm9yZUxvYWQgOiBcIiwgc291cmNlKTtcbiAgICAgICAgICAgIGlmKHdlYnJ0Y0xvYWRlcil7XG4gICAgICAgICAgICAgICAgd2VicnRjTG9hZGVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB3ZWJydGNMb2FkZXIgPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgbG9hZENhbGxiYWNrID0gZnVuY3Rpb24oc3RyZWFtKXtcblxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LnNyY09iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnNyY09iamVjdCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zcmNPYmplY3QgPSBzdHJlYW07XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB3ZWJydGNMb2FkZXIgPSBXZWJSVENMb2FkZXIodGhhdCwgc291cmNlLmZpbGUsIGxvYWRDYWxsYmFjaywgZXJyb3JUcmlnZ2VyLCBwbGF5ZXJDb25maWcpO1xuXG4gICAgICAgICAgICB3ZWJydGNMb2FkZXIuY29ubmVjdChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIC8vVG9EbyA6IHJlc29sdmUgbm90IHdva3JpbmdcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKXtcbiAgICAgICAgICAgICAgICAvL3RoYXQuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIC8vRG8gbm90aGluZ1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoYXQub24oQ09OVEVOVF9NRVRBLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpKXtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdGhhdCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBzdXBlckRlc3Ryb3lfZnVuYyA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTtcblxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldFQlJUQyBQUk9WSURFUiBMT0FERUQuXCIpO1xuXG5cbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcbiAgICAgICAgaWYod2VicnRjTG9hZGVyKXtcbiAgICAgICAgICAgIHdlYnJ0Y0xvYWRlci5kZXN0cm95KCk7XG4gICAgICAgICAgICBlbGVtZW50LnNyY09iamVjdCA9IG51bGw7XG4gICAgICAgICAgICB3ZWJydGNMb2FkZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQub2ZmKENPTlRFTlRfTUVUQSwgbnVsbCwgdGhhdCk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldFQlJUQyA6ICBQUk9WSURFUiBERVNUUk9ZRUQuXCIpO1xuXG4gICAgICAgIHN1cGVyRGVzdHJveV9mdW5jKCk7XG5cbiAgICB9O1xuICAgIHJldHVybiB0aGF0O1xufTtcblxuXG5leHBvcnQgZGVmYXVsdCBXZWJSVEM7XG4iLCJpbXBvcnQgYWRhcHRlciBmcm9tICd1dGlscy9hZGFwdGVyJztcbmltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XG5pbXBvcnQge1xuICAgIEVSUk9SUyxcbiAgICBQTEFZRVJfV0VCUlRDX1dTX0VSUk9SLFxuICAgIFBMQVlFUl9XRUJSVENfV1NfQ0xPU0VELFxuICAgIFBMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUixcbiAgICBQTEFZRVJfV0VCUlRDX1NFVF9SRU1PVEVfREVTQ19FUlJPUixcbiAgICBQTEFZRVJfV0VCUlRDX0NSRUFURV9BTlNXRVJfRVJST1IsXG4gICAgUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUixcbiAgICBQTEFZRVJfV0VCUlRDX05FVFdPUktfU0xPVyxcbiAgICBQTEFZRVJfV0VCUlRDX1VORVhQRUNURURfRElTQ09OTkVDVCxcbiAgICBPTUVfUDJQX01PREVcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuXG5jb25zdCBXZWJSVENMb2FkZXIgPSBmdW5jdGlvbiAocHJvdmlkZXIsIHdlYlNvY2tldFVybCwgbG9hZENhbGxiYWNrLCBlcnJvclRyaWdnZXIsIHBsYXllckNvbmZpZykge1xuXG4gICAgbGV0IHBlZXJDb25uZWN0aW9uQ29uZmlnID0ge1xuICAgICAgICAnaWNlU2VydmVycyc6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAndXJscyc6ICdzdHVuOnN0dW4ubC5nb29nbGUuY29tOjE5MzAyJ1xuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcblxuICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkud2VicnRjQ29uZmlnKSB7XG5cbiAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRDb25maWcoKS53ZWJydGNDb25maWcuaWNlU2VydmVycykge1xuXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkNvbmZpZy5pY2VTZXJ2ZXJzID0gcGxheWVyQ29uZmlnLmdldENvbmZpZygpLndlYnJ0Y0NvbmZpZy5pY2VTZXJ2ZXJzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRDb25maWcoKS53ZWJydGNDb25maWcuaWNlVHJhbnNwb3J0UG9saWN5KSB7XG5cbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uQ29uZmlnLmljZVRyYW5zcG9ydFBvbGljeSA9IHBsYXllckNvbmZpZy5nZXRDb25maWcoKS53ZWJydGNDb25maWcuaWNlVHJhbnNwb3J0UG9saWN5O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHRoYXQgPSB7fTtcblxuICAgIGxldCB3cyA9IG51bGw7XG5cbiAgICBsZXQgd3NQaW5nID0gbnVsbDtcblxuICAgIGxldCBtYWluU3RyZWFtID0gbnVsbDtcblxuICAgIC8vIHVzZWQgZm9yIGdldHRpbmcgbWVkaWEgc3RyZWFtIGZyb20gT01FIG9yIGhvc3QgcGVlclxuICAgIGxldCBtYWluUGVlckNvbm5lY3Rpb25JbmZvID0gbnVsbDtcblxuICAgIC8vIHVzZWQgZm9yIHNlbmQgbWVkaWEgc3RyZWFtIHRvIGNsaWVudCBwZWVyLlxuICAgIGxldCBjbGllbnRQZWVyQ29ubmVjdGlvbnMgPSB7fTtcblxuICAgIC8vY2xvc2VkIHdlYnNvY2tldCBieSBvbWUgb3IgY2xpZW50LlxuICAgIGxldCB3c0Nsb3NlZEJ5UGxheWVyID0gZmFsc2U7XG5cbiAgICBsZXQgc3RhdGlzdGljc1RpbWVyID0gbnVsbDtcblxuICAgIChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBleGlzdGluZ0hhbmRsZXIgPSB3aW5kb3cub25iZWZvcmV1bmxvYWQ7XG4gICAgICAgIHdpbmRvdy5vbmJlZm9yZXVubG9hZCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgaWYgKGV4aXN0aW5nSGFuZGxlcikge1xuICAgICAgICAgICAgICAgIGV4aXN0aW5nSGFuZGxlcihldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJUaGlzIGNhbGxzIGF1dG8gd2hlbiBicm93c2VyIGNsb3NlZC5cIik7XG4gICAgICAgICAgICBjbG9zZVBlZXIoKTtcbiAgICAgICAgfVxuICAgIH0pKCk7XG5cbiAgICBmdW5jdGlvbiBnZXRQZWVyQ29ubmVjdGlvbkJ5SWQoaWQpIHtcblxuICAgICAgICBsZXQgcGVlckNvbm5lY3Rpb24gPSBudWxsO1xuXG4gICAgICAgIGlmIChtYWluUGVlckNvbm5lY3Rpb25JbmZvICYmIGlkID09PSBtYWluUGVlckNvbm5lY3Rpb25JbmZvLmlkKSB7XG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbiA9IG1haW5QZWVyQ29ubmVjdGlvbkluZm8ucGVlckNvbm5lY3Rpb247XG4gICAgICAgIH0gZWxzZSBpZiAoY2xpZW50UGVlckNvbm5lY3Rpb25zW2lkXSkge1xuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24gPSBjbGllbnRQZWVyQ29ubmVjdGlvbnNbaWRdLnBlZXJDb25uZWN0aW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBlZXJDb25uZWN0aW9uO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4dHJhY3RMb3NzUGFja2V0c09uTmV0d29ya1N0YXR1cyhwZWVyQ29ubmVjdGlvbkluZm8pIHtcblxuICAgICAgICBpZiAocGVlckNvbm5lY3Rpb25JbmZvLnN0YXRpc3RpY3NUaW1lcikge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHBlZXJDb25uZWN0aW9uSW5mby5zdGF0aXN0aWNzVGltZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzKSB7XG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzID0ge307XG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLmxvc3RQYWNrZXRzQXJyID0gW107XG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLnNsb3RMZW5ndGggPSA4OyAvLzggc3RhdGlzdGljcy4gZXZlcnkgMiBzZWNvbmRzXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLnByZXZQYWNrZXRzTG9zdCA9IDA7XG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLmF2ZzhMb3NzZXMgPSAwO1xuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5hdmdNb3JlVGhhblRocmVzaG9sZENvdW50ID0gMDsgIC8vSWYgYXZnOExvc3MgbW9yZSB0aGFuIHRocmVzaG9sZC5cbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMudGhyZXNob2xkID0gNDA7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbG9zdFBhY2tldHNBcnIgPSBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLmxvc3RQYWNrZXRzQXJyLFxuICAgICAgICAgICAgc2xvdExlbmd0aCA9IHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMuc2xvdExlbmd0aCwgLy84IHN0YXRpc3RpY3MuIGV2ZXJ5IDIgc2Vjb25kc1xuICAgICAgICAgICAgcHJldlBhY2tldHNMb3N0ID0gcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5wcmV2UGFja2V0c0xvc3QsXG4gICAgICAgICAgICBhdmc4TG9zc2VzID0gcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5hdmc4TG9zc2VzLFxuICAgICAgICAgICAgLy8gYXZnTW9yZVRoYW5UaHJlc2hvbGRDb3VudCA9IHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMuYXZnTW9yZVRoYW5UaHJlc2hvbGRDb3VudCwgIC8vSWYgYXZnOExvc3MgbW9yZSB0aGFuIHRocmVzaG9sZC5cbiAgICAgICAgICAgIHRocmVzaG9sZCA9IHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMudGhyZXNob2xkO1xuXG4gICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5zdGF0aXN0aWNzVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghcGVlckNvbm5lY3Rpb25JbmZvLnBlZXJDb25uZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkluZm8ucGVlckNvbm5lY3Rpb24uZ2V0U3RhdHMoKS50aGVuKGZ1bmN0aW9uIChzdGF0cykge1xuXG4gICAgICAgICAgICAgICAgaWYgKCFzdGF0cykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRDb25maWcoKS5hdXRvRmFsbGJhY2sgJiYgc3RhdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHMuZm9yRWFjaChmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGF0ZS50eXBlID09PSBcImluYm91bmQtcnRwXCIgJiYgc3RhdGUua2luZCA9PT0gJ3ZpZGVvJyAmJiAhc3RhdGUuaXNSZW1vdGUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vKHN0YXRlLnBhY2tldHNMb3N0IC0gcHJldlBhY2tldHNMb3N0KSBpcyByZWFsIGN1cnJlbnQgbG9zdC5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhY3R1YWxQYWNrZXRMb3N0ID0gcGFyc2VJbnQoc3RhdGUucGFja2V0c0xvc3QpIC0gcGFyc2VJbnQocHJldlBhY2tldHNMb3N0KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvc3RQYWNrZXRzQXJyLnB1c2gocGFyc2VJbnQoc3RhdGUucGFja2V0c0xvc3QpIC0gcGFyc2VJbnQocHJldlBhY2tldHNMb3N0KSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9zdFBhY2tldHNBcnIubGVuZ3RoID4gc2xvdExlbmd0aCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvc3RQYWNrZXRzQXJyLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvc3RQYWNrZXRzQXJyLmxlbmd0aCA9PT0gc2xvdExlbmd0aCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF2ZzhMb3NzZXMgPSBfLnJlZHVjZShsb3N0UGFja2V0c0FyciwgZnVuY3Rpb24gKG1lbW8sIG51bSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1lbW8gKyBudW07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDApIC8gc2xvdExlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGFzdDggTE9TVCBQQUNLRVQgQVZHICA6IFwiICsgKGF2ZzhMb3NzZXMpLCBcIkN1cnJlbnQgUGFja2V0IExPU1Q6IFwiICsgIGFjdHVhbFBhY2tldExvc3QsIFwiVG90YWwgUGFja2V0IExvc3Q6IFwiICsgc3RhdGUucGFja2V0c0xvc3QsIGxvc3RQYWNrZXRzQXJyKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXZnOExvc3NlcyA+IHRocmVzaG9sZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5hdmdNb3JlVGhhblRocmVzaG9sZENvdW50ID0gcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5hdmdNb3JlVGhhblRocmVzaG9sZENvdW50ICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLmF2Z01vcmVUaGFuVGhyZXNob2xkQ291bnQgPj0gNjApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJORVRXT1JLIFVOU1RBQkxFRCEhISBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfV0VCUlRDX05FVFdPUktfU0xPV107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLmF2Z01vcmVUaGFuVGhyZXNob2xkQ291bnQgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMucHJldlBhY2tldHNMb3N0ID0gc3RhdGUucGFja2V0c0xvc3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGV4dHJhY3RMb3NzUGFja2V0c09uTmV0d29ya1N0YXR1cyhwZWVyQ29ubmVjdGlvbkluZm8pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sIDIwMDApO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlTWFpblBlZXJDb25uZWN0aW9uKGlkLCBwZWVySWQsIHNkcCwgY2FuZGlkYXRlcywgcmVzb2x2ZSkge1xuXG4gICAgICAgIGxldCBwZWVyQ29ubmVjdGlvbiA9IG5ldyBSVENQZWVyQ29ubmVjdGlvbihwZWVyQ29ubmVjdGlvbkNvbmZpZyk7XG5cbiAgICAgICAgbWFpblBlZXJDb25uZWN0aW9uSW5mbyA9IHtcbiAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgIHBlZXJJZDogcGVlcklkLFxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb246IHBlZXJDb25uZWN0aW9uXG4gICAgICAgIH07XG5cblxuICAgICAgICAvL1NldCByZW1vdGUgZGVzY3JpcHRpb24gd2hlbiBJIHJlY2VpdmVkIHNkcCBmcm9tIHNlcnZlci5cbiAgICAgICAgcGVlckNvbm5lY3Rpb24uc2V0UmVtb3RlRGVzY3JpcHRpb24obmV3IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbihzZHApKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24uY3JlYXRlQW5zd2VyKClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRlc2MpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiY3JlYXRlIEhvc3QgQW5zd2VyIDogc3VjY2Vzc1wiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24uc2V0TG9jYWxEZXNjcmlwdGlvbihkZXNjKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBteSBTRFAgY3JlYXRlZC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbG9jYWxTRFAgPSBwZWVyQ29ubmVjdGlvbi5sb2NhbERlc2NyaXB0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZygnTG9jYWwgU0RQJywgbG9jYWxTRFApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VuZE1lc3NhZ2Uod3MsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZWVyX2lkOiBwZWVySWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmQ6ICdhbnN3ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZHA6IGxvY2FsU0RQXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUl07XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcih0ZW1wRXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfV0VCUlRDX1NFVF9SRU1PVEVfREVTQ19FUlJPUl07XG4gICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBpZiAoY2FuZGlkYXRlcykge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJbTWVzc2FnZSBjYW5kaWRhdGVzXVwiLCBjYW5kaWRhdGVzKTtcbiAgICAgICAgICAgIGFkZEljZUNhbmRpZGF0ZShwZWVyQ29ubmVjdGlvbiwgY2FuZGlkYXRlcyk7XG4gICAgICAgIH1cblxuICAgICAgICBwZWVyQ29ubmVjdGlvbi5vbmljZWNhbmRpZGF0ZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoZS5jYW5kaWRhdGUpIHtcblxuICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldlYlJUQ0xvYWRlciBzZW5kIGNhbmRpZGF0ZSB0byBzZXJ2ZXIgOiBcIiArIGUuY2FuZGlkYXRlKTtcblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdNYWluIFBlZXIgQ29ubmVjdGlvbiBjYW5kaWRhdGUnLCBlLmNhbmRpZGF0ZSk7XG5cbiAgICAgICAgICAgICAgICBzZW5kTWVzc2FnZSh3cywge1xuICAgICAgICAgICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICAgICAgICAgIHBlZXJfaWQ6IHBlZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZDogXCJjYW5kaWRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgY2FuZGlkYXRlczogW2UuY2FuZGlkYXRlXVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBwZWVyQ29ubmVjdGlvbi5vbmNvbm5lY3Rpb25zdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAvL2ljZUNvbm5lY3Rpb25TdGF0ZVxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiW29uIGNvbm5lY3Rpb24gc3RhdGUgY2hhbmdlXVwiLCBwZWVyQ29ubmVjdGlvbi5jb25uZWN0aW9uU3RhdGUgLGUpO1xuXG4gICAgICAgIH07XG4gICAgICAgIHBlZXJDb25uZWN0aW9uLm9uaWNlY29ubmVjdGlvbnN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIltvbiBpY2UgY29ubmVjdGlvbiBzdGF0ZSBjaGFuZ2VdXCIsIHBlZXJDb25uZWN0aW9uLmljZUNvbm5lY3Rpb25TdGF0ZSAsZSk7XG5cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9SVENQZWVyQ29ubmVjdGlvbi9pY2VDb25uZWN0aW9uU3RhdGVcbiAgICAgICAgICAgICogQ2hlY2tzIHRvIGVuc3VyZSB0aGF0IGNvbXBvbmVudHMgYXJlIHN0aWxsIGNvbm5lY3RlZCBmYWlsZWQgZm9yIGF0IGxlYXN0IG9uZSBjb21wb25lbnQgb2YgdGhlIFJUQ1BlZXJDb25uZWN0aW9uLiBUaGlzIGlzIGEgbGVzcyBzdHJpbmdlbnQgdGVzdCB0aGFuIFwiZmFpbGVkXCIgYW5kIG1heSB0cmlnZ2VyIGludGVybWl0dGVudGx5IGFuZCByZXNvbHZlIGp1c3QgYXMgc3BvbnRhbmVvdXNseSBvbiBsZXNzIHJlbGlhYmxlIG5ldHdvcmtzLCBvciBkdXJpbmcgdGVtcG9yYXJ5IGRpc2Nvbm5lY3Rpb25zLiBXaGVuIHRoZSBwcm9ibGVtIHJlc29sdmVzLCB0aGUgY29ubmVjdGlvbiBtYXkgcmV0dXJuIHRvIHRoZSBcImNvbm5lY3RlZFwiIHN0YXRlLlxuICAgICAgICAgICAgKiAqL1xuICAgICAgICAgICAgLy9UaGlzIHByb2Nlc3MgaXMgbXkgaW1hZ2luYXRpb24uIEkgZG8gbm90IGtub3cgaG93IHRvIHJlcHJvZHVjZS5cbiAgICAgICAgICAgIC8vU2l0dWF0aW9uIDogT01FIGlzIGRlYWQgYnV0IG9tZSBjYW4ndCBzZW5kICdzdG9wJyBtZXNzYWdlLlxuICAgICAgICAgICAgaWYgKHBlZXJDb25uZWN0aW9uLmljZUNvbm5lY3Rpb25TdGF0ZSA9PT0gJ2Rpc2Nvbm5lY3RlZCcgfHwgcGVlckNvbm5lY3Rpb24uaWNlQ29ubmVjdGlvblN0YXRlID09PSAnY2xvc2VkJykge1xuICAgICAgICAgICAgICAgIGlmICghd3NDbG9zZWRCeVBsYXllcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAobWFpblBlZXJDb25uZWN0aW9uSW5mbykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfV0VCUlRDX1VORVhQRUNURURfRElTQ09OTkVDVF07XG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcGVlckNvbm5lY3Rpb24ub250cmFjayA9IGZ1bmN0aW9uIChlKSB7XG5cbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcInN0cmVhbSByZWNlaXZlZC5cIik7XG5cbiAgICAgICAgICAgIGV4dHJhY3RMb3NzUGFja2V0c09uTmV0d29ya1N0YXR1cyhtYWluUGVlckNvbm5lY3Rpb25JbmZvKTtcbiAgICAgICAgICAgIG1haW5TdHJlYW0gPSBlLnN0cmVhbXNbMF07XG4gICAgICAgICAgICBsb2FkQ2FsbGJhY2soZS5zdHJlYW1zWzBdKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVDbGllbnRQZWVyQ29ubmVjdGlvbihob3N0SWQsIGNsaWVudElkKSB7XG5cbiAgICAgICAgaWYgKCFtYWluU3RyZWFtKSB7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgY3JlYXRlQ2xpZW50UGVlckNvbm5lY3Rpb24oaG9zdElkLCBjbGllbnRJZCk7XG4gICAgICAgICAgICB9LCAxMDApO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcGVlckNvbm5lY3Rpb24gPSBuZXcgUlRDUGVlckNvbm5lY3Rpb24ocGVlckNvbm5lY3Rpb25Db25maWcpO1xuXG4gICAgICAgIGNsaWVudFBlZXJDb25uZWN0aW9uc1tjbGllbnRJZF0gPSB7XG4gICAgICAgICAgICBpZDogY2xpZW50SWQsXG4gICAgICAgICAgICBwZWVySWQ6IGhvc3RJZCxcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uOiBwZWVyQ29ubmVjdGlvblxuICAgICAgICB9O1xuXG4gICAgICAgIHBlZXJDb25uZWN0aW9uLmFkZFN0cmVhbShtYWluU3RyZWFtKTtcblxuICAgICAgICAvLyBsZXQgb2ZmZXJPcHRpb24gPSB7XG4gICAgICAgIC8vICAgICBvZmZlclRvUmVjZWl2ZUF1ZGlvOiAxLFxuICAgICAgICAvLyAgICAgb2ZmZXJUb1JlY2VpdmVWaWRlbzogMVxuICAgICAgICAvLyB9O1xuXG4gICAgICAgIHBlZXJDb25uZWN0aW9uLmNyZWF0ZU9mZmVyKHNldExvY2FsQW5kU2VuZE1lc3NhZ2UsIGhhbmRsZUNyZWF0ZU9mZmVyRXJyb3IsIHt9KTtcblxuICAgICAgICBmdW5jdGlvbiBzZXRMb2NhbEFuZFNlbmRNZXNzYWdlKHNlc3Npb25EZXNjcmlwdGlvbikge1xuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24uc2V0TG9jYWxEZXNjcmlwdGlvbihzZXNzaW9uRGVzY3JpcHRpb24pO1xuXG4gICAgICAgICAgICBzZW5kTWVzc2FnZSh3cywge1xuICAgICAgICAgICAgICAgIGlkOiBob3N0SWQsXG4gICAgICAgICAgICAgICAgcGVlcl9pZDogY2xpZW50SWQsXG4gICAgICAgICAgICAgICAgc2RwOiBzZXNzaW9uRGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgY29tbWFuZDogJ29mZmVyX3AycCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlQ3JlYXRlT2ZmZXJFcnJvcihldmVudCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2NyZWF0ZU9mZmVyKCkgZXJyb3I6ICcsIGV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBlZXJDb25uZWN0aW9uLm9uaWNlY2FuZGlkYXRlID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmIChlLmNhbmRpZGF0ZSkge1xuICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldlYlJUQ0xvYWRlciBzZW5kIGNhbmRpZGF0ZSB0byBzZXJ2ZXIgOiBcIiArIGUuY2FuZGlkYXRlKTtcblxuXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ0NsaWVudCBQZWVyIENvbm5lY3Rpb24gY2FuZGlkYXRlJywgZS5jYW5kaWRhdGUpO1xuXG4gICAgICAgICAgICAgICAgc2VuZE1lc3NhZ2Uod3MsIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGhvc3RJZCxcbiAgICAgICAgICAgICAgICAgICAgcGVlcl9pZDogY2xpZW50SWQsXG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmQ6IFwiY2FuZGlkYXRlX3AycFwiLFxuICAgICAgICAgICAgICAgICAgICBjYW5kaWRhdGVzOiBbZS5jYW5kaWRhdGVdXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvL1RoaXMgaXMgdGVtcG9yYXJ5IGZ1bmN0aW9uLiB3ZSBjYW4ndCBidWlsZCBTVFJVTiBzZXJ2ZXIuXG4gICAgbGV0IGNvcHlDYW5kaWRhdGUgPSBmdW5jdGlvbihiYXNpY0NhbmRpZGF0ZSl7XG4gICAgICAgIGxldCBjbG9uZUNhbmRpZGF0ZSA9IF8uY2xvbmUoYmFzaWNDYW5kaWRhdGUpO1xuICAgICAgICBmdW5jdGlvbiBnZW5lcmF0ZURvbWFpbkZyb21VcmwodXJsKSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0O1xuICAgICAgICAgICAgbGV0IG1hdGNoO1xuICAgICAgICAgICAgaWYgKG1hdGNoID0gdXJsLm1hdGNoKC9eKD86d3NzPzpcXC9cXC8pPyg/OlteQFxcbl0rQCk/KD86d3d3XFwuKT8oW146XFwvXFxuXFw/XFw9XSspL2ltKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG1hdGNoWzFdO1xuICAgICAgICAgICAgICAgIC8qaWYgKG1hdGNoID0gcmVzdWx0Lm1hdGNoKC9eW15cXC5dK1xcLiguK1xcLi4rKSQvKSkge1xuICAgICAgICAgICAgICAgICByZXN1bHQgPSBtYXRjaFsxXVxuICAgICAgICAgICAgICAgICB9Ki9cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZmluZElwIChjYW5kaWRhdGUpe1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IFwiXCI7XG4gICAgICAgICAgICBsZXQgbWF0Y2ggPSBcIlwiO1xuICAgICAgICAgICAgaWYobWF0Y2ggPSBjYW5kaWRhdGUubWF0Y2gobmV3IFJlZ0V4cChcIlxcXFxiKDI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPylcXFxcLigyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT8pXFxcXC4oMjVbMC01XXwyWzAtNF1bMC05XXxbMDFdP1swLTldWzAtOV0/KVxcXFwuKDI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPylcXFxcYlwiLCAnZ2knKSkpe1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG1hdGNoWzBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG5ld0RvbWFpbiA9IGdlbmVyYXRlRG9tYWluRnJvbVVybCh3ZWJTb2NrZXRVcmwpO1xuICAgICAgICBsZXQgaXAgPSBmaW5kSXAoY2xvbmVDYW5kaWRhdGUuY2FuZGlkYXRlKTtcbiAgICAgICAgaWYoaXAgPT09IG5ld0RvbWFpbil7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICAvL2Nsb25lQ2FuZGlkYXRlLmNhbmRpZGF0ZS5yZXBsYWNlKGNsb25lQ2FuZGlkYXRlLmFkZHJlc3MsIG5ld0RvbWFpbik7XG4gICAgICAgIGNsb25lQ2FuZGlkYXRlLmNhbmRpZGF0ZSA9IGNsb25lQ2FuZGlkYXRlLmNhbmRpZGF0ZS5yZXBsYWNlKGlwLCBuZXdEb21haW4pO1xuICAgICAgICAvL2Nsb25lQ2FuZGlkYXRlLmNhbmRpZGF0ZSA9IGNsb25lQ2FuZGlkYXRlLmNhbmRpZGF0ZS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJcXFxcYigyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT8pXFxcXC4oMjVbMC01XXwyWzAtNF1bMC05XXxbMDFdP1swLTldWzAtOV0/KVxcXFwuKDI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPylcXFxcLigyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT8pXFxcXGJcIiwgJ2dpJyksIG5ld0RvbWFpbilcblxuICAgICAgICByZXR1cm4gY2xvbmVDYW5kaWRhdGU7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGFkZEljZUNhbmRpZGF0ZShwZWVyQ29ubmVjdGlvbiwgY2FuZGlkYXRlcykge1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FuZGlkYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGNhbmRpZGF0ZXNbaV0gJiYgY2FuZGlkYXRlc1tpXS5jYW5kaWRhdGUpIHtcblxuICAgICAgICAgICAgICAgIGxldCBiYXNpY0NhbmRpZGF0ZSA9IGNhbmRpZGF0ZXNbaV07XG5cbiAgICAgICAgICAgICAgICBsZXQgY2xvbmVDYW5kaWRhdGUgPSBjb3B5Q2FuZGlkYXRlKGJhc2ljQ2FuZGlkYXRlKTtcblxuICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uLmFkZEljZUNhbmRpZGF0ZShuZXcgUlRDSWNlQ2FuZGlkYXRlKGJhc2ljQ2FuZGlkYXRlKSkudGhlbihmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJhZGRJY2VDYW5kaWRhdGUgOiBzdWNjZXNzXCIpO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUl07XG4gICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmKGNsb25lQ2FuZGlkYXRlKXtcbiAgICAgICAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24uYWRkSWNlQ2FuZGlkYXRlKG5ldyBSVENJY2VDYW5kaWRhdGUoY2xvbmVDYW5kaWRhdGUpKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiY2xvbmVDYW5kaWRhdGUgYWRkSWNlQ2FuZGlkYXRlIDogc3VjY2Vzc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUl07XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcih0ZW1wRXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXRXZWJTb2NrZXQocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgdHJ5IHtcblxuICAgICAgICAgICAgd3MgPSBuZXcgV2ViU29ja2V0KHdlYlNvY2tldFVybCk7XG5cbiAgICAgICAgICAgIHdzLm9ub3BlbiA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgIHNlbmRNZXNzYWdlKHdzLCB7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmQ6IFwicmVxdWVzdF9vZmZlclwiXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyB3c1BpbmcgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAvLyAgICAgc2VuZE1lc3NhZ2Uod3MsIHtjb21tYW5kOiBcInBpbmdcIn0pO1xuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgLy8gfSwgMjAgKiAxMDAwKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHdzLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChlKSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gSlNPTi5wYXJzZShlLmRhdGEpO1xuXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfV0VCUlRDX1dTX0VSUk9SXTtcbiAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gbWVzc2FnZS5lcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMobWVzc2FnZSkubGVuZ3RoID09PSAwICYmIG1lc3NhZ2UuY29uc3RydWN0b3IgPT09IE9iamVjdCkge1xuXG4gICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZygnRW1wdHkgTWVzc2FnZScpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UuY29tbWFuZCA9PT0gJ3BpbmcnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgc2VuZE1lc3NhZ2Uod3MsIHtjb21tYW5kOiAncG9uZyd9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghbWVzc2FnZS5pZCkge1xuXG4gICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZygnSUQgbXVzdCBiZSBub3QgbnVsbCcpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UuY29tbWFuZCA9PT0gJ29mZmVyJykge1xuXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZU1haW5QZWVyQ29ubmVjdGlvbihtZXNzYWdlLmlkLCBtZXNzYWdlLnBlZXJfaWQsIG1lc3NhZ2Uuc2RwLCBtZXNzYWdlLmNhbmRpZGF0ZXMsIHJlc29sdmUpO1xuICAgICAgICAgICAgICAgICAgICBpZihtZXNzYWdlLnBlZXJfaWQgPT09IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihPTUVfUDJQX01PREUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlci50cmlnZ2VyKE9NRV9QMlBfTU9ERSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5jb21tYW5kID09PSAncmVxdWVzdF9vZmZlcl9wMnAnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlQ2xpZW50UGVlckNvbm5lY3Rpb24obWVzc2FnZS5pZCwgbWVzc2FnZS5wZWVyX2lkKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5jb21tYW5kID09PSAnYW5zd2VyX3AycCcpIHtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgcGVlckNvbm5lY3Rpb24xID0gZ2V0UGVlckNvbm5lY3Rpb25CeUlkKG1lc3NhZ2UucGVlcl9pZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24xLnNldFJlbW90ZURlc2NyaXB0aW9uKG5ldyBSVENTZXNzaW9uRGVzY3JpcHRpb24obWVzc2FnZS5zZHApKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRlc2MpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLmNvbW1hbmQgPT09ICdjYW5kaWRhdGUnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQ2FuZGlkYXRlcyBmb3IgbmV3IGNsaWVudCBwZWVyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwZWVyQ29ubmVjdGlvbjIgPSBnZXRQZWVyQ29ubmVjdGlvbkJ5SWQobWVzc2FnZS5pZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgYWRkSWNlQ2FuZGlkYXRlKHBlZXJDb25uZWN0aW9uMiwgbWVzc2FnZS5jYW5kaWRhdGVzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5jb21tYW5kID09PSAnY2FuZGlkYXRlX3AycCcpIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBDYW5kaWRhdGVzIGZvciBuZXcgY2xpZW50IHBlZXJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBlZXJDb25uZWN0aW9uMyA9IGdldFBlZXJDb25uZWN0aW9uQnlJZChtZXNzYWdlLnBlZXJfaWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGFkZEljZUNhbmRpZGF0ZShwZWVyQ29ubmVjdGlvbjMsIG1lc3NhZ2UuY2FuZGlkYXRlcyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UuY29tbWFuZCA9PT0gJ3N0b3AnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG1haW5QZWVyQ29ubmVjdGlvbkluZm8ucGVlcklkID09PSBtZXNzYWdlLnBlZXJfaWQpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9NeSBwYXJlbnQgd2FzIGRlYWQuIEFuZCB0aGVuIEkgd2lsbCByZXRyeS5cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2xvc2UgY29ubmVjdGlvbiB3aXRoIGhvc3QgYW5kIHJldHJ5XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnY2xvc2UgY29ubmVjdGlvbiB3aXRoIGhvc3QnKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgbWFpblN0cmVhbSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluUGVlckNvbm5lY3Rpb25JbmZvLnBlZXJDb25uZWN0aW9uLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluUGVlckNvbm5lY3Rpb25JbmZvID0gbnVsbDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXNldENhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlci5wYXVzZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzZW5kTWVzc2FnZSh3cywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmQ6ICdyZXF1ZXN0X29mZmVyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2xvc2UgY29ubmVjdGlvbiB3aXRoIGNsaWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsaWVudFBlZXJDb25uZWN0aW9uc1ttZXNzYWdlLnBlZXJfaWRdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2Nsb3NlIGNvbm5lY3Rpb24gd2l0aCBjbGllbnQ6ICcsIG1lc3NhZ2UucGVlcl9pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50UGVlckNvbm5lY3Rpb25zW21lc3NhZ2UucGVlcl9pZF0ucGVlckNvbm5lY3Rpb24uY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgY2xpZW50UGVlckNvbm5lY3Rpb25zW21lc3NhZ2UucGVlcl9pZF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd3Mub25jbG9zZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgIGlmKCF3c0Nsb3NlZEJ5UGxheWVyKXtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9XRUJSVENfV1NfRVJST1JdO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChtYWluUGVlckNvbm5lY3Rpb25JbmZvKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbUExBWUVSX1dFQlJUQ19VTkVYUEVDVEVEX0RJU0NPTk5FQ1RdO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgd3Mub25lcnJvciA9IGZ1bmN0aW9uIChlcnJvcikge1xuXG4gICAgICAgICAgICAgICAgLy9XaHkgRWRnZSBCcm93c2VyIGNhbGxzIG9uZXJyb3IoKSB3aGVuIHdzLmNsb3NlKCk/XG4gICAgICAgICAgICAgICAgaWYoIXdzQ2xvc2VkQnlQbGF5ZXIpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9XRUJSVENfV1NfRVJST1JdO1xuICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIC8vIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuXG4gICAgICAgICAgICBjbG9zZVBlZXIoZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJXZWJSVENMb2FkZXIgY29ubmVjdGluZy4uLlwiKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJXZWJSVENMb2FkZXIgdXJsIDogXCIgKyB3ZWJTb2NrZXRVcmwpO1xuXG4gICAgICAgICAgICBpbml0V2ViU29ja2V0KHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb3NlUGVlcihlcnJvcikge1xuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZygnV2ViUlRDIExvYWRlciBjbG9zZVBlZXIoKScpO1xuXG4gICAgICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgICAgIHdzQ2xvc2VkQnlQbGF5ZXIgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1haW5QZWVyQ29ubmVjdGlvbkluZm8pIHtcblxuICAgICAgICAgICAgbWFpblN0cmVhbSA9IG51bGw7XG5cbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZygnQ2xvc2luZyBtYWluIHBlZXIgY29ubmVjdGlvbi4uLicpO1xuICAgICAgICAgICAgaWYgKHN0YXRpc3RpY3NUaW1lcikge1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChzdGF0aXN0aWNzVGltZXIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtYWluUGVlckNvbm5lY3Rpb25JbmZvLnBlZXJDb25uZWN0aW9uLmNsb3NlKCk7XG4gICAgICAgICAgICBtYWluUGVlckNvbm5lY3Rpb25JbmZvID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhjbGllbnRQZWVyQ29ubmVjdGlvbnMpLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgZm9yIChsZXQgY2xpZW50SWQgaW4gY2xpZW50UGVlckNvbm5lY3Rpb25zKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgY2xpZW50UGVlckNvbm5lY3Rpb24gPSBjbGllbnRQZWVyQ29ubmVjdGlvbnNbY2xpZW50SWRdLnBlZXJDb25uZWN0aW9uO1xuXG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKCdDbG9zaW5nIGNsaWVudCBwZWVyIGNvbm5lY3Rpb24uLi4nKTtcbiAgICAgICAgICAgICAgICBjbGllbnRQZWVyQ29ubmVjdGlvbi5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIGNsaWVudFBlZXJDb25uZWN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2xpZW50UGVlckNvbm5lY3Rpb25zID0ge307XG4gICAgICAgIH1cblxuICAgICAgICBjbGVhckludGVydmFsKHdzUGluZyk7XG4gICAgICAgIHdzUGluZyA9IG51bGw7XG5cbiAgICAgICAgaWYgKHdzKSB7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coJ0Nsb3Npbmcgd2Vic29ja2V0IGNvbm5lY3Rpb24uLi4nKTtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlNlbmQgU2lnbmFsaW5nIDogU3RvcC5cIik7XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgMCAoQ09OTkVDVElORylcbiAgICAgICAgICAgIDEgKE9QRU4pXG4gICAgICAgICAgICAyIChDTE9TSU5HKVxuICAgICAgICAgICAgMyAoQ0xPU0VEKVxuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmICh3cy5yZWFkeVN0YXRlID09PSAwIHx8IHdzLnJlYWR5U3RhdGUgPT09IDEpIHtcblxuICAgICAgICAgICAgICAgIHdzQ2xvc2VkQnlQbGF5ZXIgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKG1haW5QZWVyQ29ubmVjdGlvbkluZm8pIHtcbiAgICAgICAgICAgICAgICAgICAgc2VuZE1lc3NhZ2Uod3MsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmQ6ICdzdG9wJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBtYWluUGVlckNvbm5lY3Rpb25JbmZvLmlkXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHdzLmNsb3NlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB3c0Nsb3NlZEJ5UGxheWVyID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB3cyA9IG51bGw7XG5cbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICBlcnJvclRyaWdnZXIoZXJyb3IsIHByb3ZpZGVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNlbmRNZXNzYWdlKHdzLCBtZXNzYWdlKSB7XG5cbiAgICAgICAgaWYgKHdzKSB7XG4gICAgICAgICAgICB3cy5zZW5kKEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgdGhhdC5jb25uZWN0ID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gaW5pdGlhbGl6ZSgpO1xuICAgIH07XG5cbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgICAgIGNsb3NlUGVlcigpO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFdlYlJUQ0xvYWRlcjtcbiIsIihmdW5jdGlvbihmKXtpZih0eXBlb2YgZXhwb3J0cz09PVwib2JqZWN0XCImJnR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiKXttb2R1bGUuZXhwb3J0cz1mKCl9ZWxzZSBpZih0eXBlb2YgZGVmaW5lPT09XCJmdW5jdGlvblwiJiZkZWZpbmUuYW1kKXtkZWZpbmUoW10sZil9ZWxzZXt2YXIgZztpZih0eXBlb2Ygd2luZG93IT09XCJ1bmRlZmluZWRcIil7Zz13aW5kb3d9ZWxzZSBpZih0eXBlb2YgZ2xvYmFsIT09XCJ1bmRlZmluZWRcIil7Zz1nbG9iYWx9ZWxzZSBpZih0eXBlb2Ygc2VsZiE9PVwidW5kZWZpbmVkXCIpe2c9c2VsZn1lbHNle2c9dGhpc31nLmFkYXB0ZXIgPSBmKCl9fSkoZnVuY3Rpb24oKXt2YXIgZGVmaW5lLG1vZHVsZSxleHBvcnRzO3JldHVybiAoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vKlxuICogIENvcHlyaWdodCAoYykgMjAxNyBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxuICogIHRyZWUuXG4gKi9cbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIFNEUFV0aWxzID0gcmVxdWlyZSgnc2RwJyk7XG5cbmZ1bmN0aW9uIHdyaXRlTWVkaWFTZWN0aW9uKHRyYW5zY2VpdmVyLCBjYXBzLCB0eXBlLCBzdHJlYW0sIGR0bHNSb2xlKSB7XG4gIHZhciBzZHAgPSBTRFBVdGlscy53cml0ZVJ0cERlc2NyaXB0aW9uKHRyYW5zY2VpdmVyLmtpbmQsIGNhcHMpO1xuXG4gIC8vIE1hcCBJQ0UgcGFyYW1ldGVycyAodWZyYWcsIHB3ZCkgdG8gU0RQLlxuICBzZHAgKz0gU0RQVXRpbHMud3JpdGVJY2VQYXJhbWV0ZXJzKFxuICAgICAgdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIuZ2V0TG9jYWxQYXJhbWV0ZXJzKCkpO1xuXG4gIC8vIE1hcCBEVExTIHBhcmFtZXRlcnMgdG8gU0RQLlxuICBzZHAgKz0gU0RQVXRpbHMud3JpdGVEdGxzUGFyYW1ldGVycyhcbiAgICAgIHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQuZ2V0TG9jYWxQYXJhbWV0ZXJzKCksXG4gICAgICB0eXBlID09PSAnb2ZmZXInID8gJ2FjdHBhc3MnIDogZHRsc1JvbGUgfHwgJ2FjdGl2ZScpO1xuXG4gIHNkcCArPSAnYT1taWQ6JyArIHRyYW5zY2VpdmVyLm1pZCArICdcXHJcXG4nO1xuXG4gIGlmICh0cmFuc2NlaXZlci5ydHBTZW5kZXIgJiYgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIpIHtcbiAgICBzZHAgKz0gJ2E9c2VuZHJlY3ZcXHJcXG4nO1xuICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlcikge1xuICAgIHNkcCArPSAnYT1zZW5kb25seVxcclxcbic7XG4gIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIpIHtcbiAgICBzZHAgKz0gJ2E9cmVjdm9ubHlcXHJcXG4nO1xuICB9IGVsc2Uge1xuICAgIHNkcCArPSAnYT1pbmFjdGl2ZVxcclxcbic7XG4gIH1cblxuICBpZiAodHJhbnNjZWl2ZXIucnRwU2VuZGVyKSB7XG4gICAgdmFyIHRyYWNrSWQgPSB0cmFuc2NlaXZlci5ydHBTZW5kZXIuX2luaXRpYWxUcmFja0lkIHx8XG4gICAgICAgIHRyYW5zY2VpdmVyLnJ0cFNlbmRlci50cmFjay5pZDtcbiAgICB0cmFuc2NlaXZlci5ydHBTZW5kZXIuX2luaXRpYWxUcmFja0lkID0gdHJhY2tJZDtcbiAgICAvLyBzcGVjLlxuICAgIHZhciBtc2lkID0gJ21zaWQ6JyArIChzdHJlYW0gPyBzdHJlYW0uaWQgOiAnLScpICsgJyAnICtcbiAgICAgICAgdHJhY2tJZCArICdcXHJcXG4nO1xuICAgIHNkcCArPSAnYT0nICsgbXNpZDtcbiAgICAvLyBmb3IgQ2hyb21lLiBMZWdhY3kgc2hvdWxkIG5vIGxvbmdlciBiZSByZXF1aXJlZC5cbiAgICBzZHAgKz0gJ2E9c3NyYzonICsgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjICtcbiAgICAgICAgJyAnICsgbXNpZDtcblxuICAgIC8vIFJUWFxuICAgIGlmICh0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCkge1xuICAgICAgc2RwICs9ICdhPXNzcmM6JyArIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4LnNzcmMgK1xuICAgICAgICAgICcgJyArIG1zaWQ7XG4gICAgICBzZHAgKz0gJ2E9c3NyYy1ncm91cDpGSUQgJyArXG4gICAgICAgICAgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjICsgJyAnICtcbiAgICAgICAgICB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eC5zc3JjICtcbiAgICAgICAgICAnXFxyXFxuJztcbiAgICB9XG4gIH1cbiAgLy8gRklYTUU6IHRoaXMgc2hvdWxkIGJlIHdyaXR0ZW4gYnkgd3JpdGVSdHBEZXNjcmlwdGlvbi5cbiAgc2RwICs9ICdhPXNzcmM6JyArIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYyArXG4gICAgICAnIGNuYW1lOicgKyBTRFBVdGlscy5sb2NhbENOYW1lICsgJ1xcclxcbic7XG4gIGlmICh0cmFuc2NlaXZlci5ydHBTZW5kZXIgJiYgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHgpIHtcbiAgICBzZHAgKz0gJ2E9c3NyYzonICsgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHguc3NyYyArXG4gICAgICAgICcgY25hbWU6JyArIFNEUFV0aWxzLmxvY2FsQ05hbWUgKyAnXFxyXFxuJztcbiAgfVxuICByZXR1cm4gc2RwO1xufVxuXG4vLyBFZGdlIGRvZXMgbm90IGxpa2Vcbi8vIDEpIHN0dW46IGZpbHRlcmVkIGFmdGVyIDE0MzkzIHVubGVzcyA/dHJhbnNwb3J0PXVkcCBpcyBwcmVzZW50XG4vLyAyKSB0dXJuOiB0aGF0IGRvZXMgbm90IGhhdmUgYWxsIG9mIHR1cm46aG9zdDpwb3J0P3RyYW5zcG9ydD11ZHBcbi8vIDMpIHR1cm46IHdpdGggaXB2NiBhZGRyZXNzZXNcbi8vIDQpIHR1cm46IG9jY3VycmluZyBtdWxpcGxlIHRpbWVzXG5mdW5jdGlvbiBmaWx0ZXJJY2VTZXJ2ZXJzKGljZVNlcnZlcnMsIGVkZ2VWZXJzaW9uKSB7XG4gIHZhciBoYXNUdXJuID0gZmFsc2U7XG4gIGljZVNlcnZlcnMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGljZVNlcnZlcnMpKTtcbiAgcmV0dXJuIGljZVNlcnZlcnMuZmlsdGVyKGZ1bmN0aW9uKHNlcnZlcikge1xuICAgIGlmIChzZXJ2ZXIgJiYgKHNlcnZlci51cmxzIHx8IHNlcnZlci51cmwpKSB7XG4gICAgICB2YXIgdXJscyA9IHNlcnZlci51cmxzIHx8IHNlcnZlci51cmw7XG4gICAgICBpZiAoc2VydmVyLnVybCAmJiAhc2VydmVyLnVybHMpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdSVENJY2VTZXJ2ZXIudXJsIGlzIGRlcHJlY2F0ZWQhIFVzZSB1cmxzIGluc3RlYWQuJyk7XG4gICAgICB9XG4gICAgICB2YXIgaXNTdHJpbmcgPSB0eXBlb2YgdXJscyA9PT0gJ3N0cmluZyc7XG4gICAgICBpZiAoaXNTdHJpbmcpIHtcbiAgICAgICAgdXJscyA9IFt1cmxzXTtcbiAgICAgIH1cbiAgICAgIHVybHMgPSB1cmxzLmZpbHRlcihmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgdmFyIHZhbGlkVHVybiA9IHVybC5pbmRleE9mKCd0dXJuOicpID09PSAwICYmXG4gICAgICAgICAgICB1cmwuaW5kZXhPZigndHJhbnNwb3J0PXVkcCcpICE9PSAtMSAmJlxuICAgICAgICAgICAgdXJsLmluZGV4T2YoJ3R1cm46WycpID09PSAtMSAmJlxuICAgICAgICAgICAgIWhhc1R1cm47XG5cbiAgICAgICAgaWYgKHZhbGlkVHVybikge1xuICAgICAgICAgIGhhc1R1cm4gPSB0cnVlO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1cmwuaW5kZXhPZignc3R1bjonKSA9PT0gMCAmJiBlZGdlVmVyc2lvbiA+PSAxNDM5MyAmJlxuICAgICAgICAgICAgdXJsLmluZGV4T2YoJz90cmFuc3BvcnQ9dWRwJykgPT09IC0xO1xuICAgICAgfSk7XG5cbiAgICAgIGRlbGV0ZSBzZXJ2ZXIudXJsO1xuICAgICAgc2VydmVyLnVybHMgPSBpc1N0cmluZyA/IHVybHNbMF0gOiB1cmxzO1xuICAgICAgcmV0dXJuICEhdXJscy5sZW5ndGg7XG4gICAgfVxuICB9KTtcbn1cblxuLy8gRGV0ZXJtaW5lcyB0aGUgaW50ZXJzZWN0aW9uIG9mIGxvY2FsIGFuZCByZW1vdGUgY2FwYWJpbGl0aWVzLlxuZnVuY3Rpb24gZ2V0Q29tbW9uQ2FwYWJpbGl0aWVzKGxvY2FsQ2FwYWJpbGl0aWVzLCByZW1vdGVDYXBhYmlsaXRpZXMpIHtcbiAgdmFyIGNvbW1vbkNhcGFiaWxpdGllcyA9IHtcbiAgICBjb2RlY3M6IFtdLFxuICAgIGhlYWRlckV4dGVuc2lvbnM6IFtdLFxuICAgIGZlY01lY2hhbmlzbXM6IFtdXG4gIH07XG5cbiAgdmFyIGZpbmRDb2RlY0J5UGF5bG9hZFR5cGUgPSBmdW5jdGlvbihwdCwgY29kZWNzKSB7XG4gICAgcHQgPSBwYXJzZUludChwdCwgMTApO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29kZWNzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoY29kZWNzW2ldLnBheWxvYWRUeXBlID09PSBwdCB8fFxuICAgICAgICAgIGNvZGVjc1tpXS5wcmVmZXJyZWRQYXlsb2FkVHlwZSA9PT0gcHQpIHtcbiAgICAgICAgcmV0dXJuIGNvZGVjc1tpXTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFyIHJ0eENhcGFiaWxpdHlNYXRjaGVzID0gZnVuY3Rpb24obFJ0eCwgclJ0eCwgbENvZGVjcywgckNvZGVjcykge1xuICAgIHZhciBsQ29kZWMgPSBmaW5kQ29kZWNCeVBheWxvYWRUeXBlKGxSdHgucGFyYW1ldGVycy5hcHQsIGxDb2RlY3MpO1xuICAgIHZhciByQ29kZWMgPSBmaW5kQ29kZWNCeVBheWxvYWRUeXBlKHJSdHgucGFyYW1ldGVycy5hcHQsIHJDb2RlY3MpO1xuICAgIHJldHVybiBsQ29kZWMgJiYgckNvZGVjICYmXG4gICAgICAgIGxDb2RlYy5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IHJDb2RlYy5uYW1lLnRvTG93ZXJDYXNlKCk7XG4gIH07XG5cbiAgbG9jYWxDYXBhYmlsaXRpZXMuY29kZWNzLmZvckVhY2goZnVuY3Rpb24obENvZGVjKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZW1vdGVDYXBhYmlsaXRpZXMuY29kZWNzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgckNvZGVjID0gcmVtb3RlQ2FwYWJpbGl0aWVzLmNvZGVjc1tpXTtcbiAgICAgIGlmIChsQ29kZWMubmFtZS50b0xvd2VyQ2FzZSgpID09PSByQ29kZWMubmFtZS50b0xvd2VyQ2FzZSgpICYmXG4gICAgICAgICAgbENvZGVjLmNsb2NrUmF0ZSA9PT0gckNvZGVjLmNsb2NrUmF0ZSkge1xuICAgICAgICBpZiAobENvZGVjLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3J0eCcgJiZcbiAgICAgICAgICAgIGxDb2RlYy5wYXJhbWV0ZXJzICYmIHJDb2RlYy5wYXJhbWV0ZXJzLmFwdCkge1xuICAgICAgICAgIC8vIGZvciBSVFggd2UgbmVlZCB0byBmaW5kIHRoZSBsb2NhbCBydHggdGhhdCBoYXMgYSBhcHRcbiAgICAgICAgICAvLyB3aGljaCBwb2ludHMgdG8gdGhlIHNhbWUgbG9jYWwgY29kZWMgYXMgdGhlIHJlbW90ZSBvbmUuXG4gICAgICAgICAgaWYgKCFydHhDYXBhYmlsaXR5TWF0Y2hlcyhsQ29kZWMsIHJDb2RlYyxcbiAgICAgICAgICAgICAgbG9jYWxDYXBhYmlsaXRpZXMuY29kZWNzLCByZW1vdGVDYXBhYmlsaXRpZXMuY29kZWNzKSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJDb2RlYyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkockNvZGVjKSk7IC8vIGRlZXBjb3B5XG4gICAgICAgIC8vIG51bWJlciBvZiBjaGFubmVscyBpcyB0aGUgaGlnaGVzdCBjb21tb24gbnVtYmVyIG9mIGNoYW5uZWxzXG4gICAgICAgIHJDb2RlYy5udW1DaGFubmVscyA9IE1hdGgubWluKGxDb2RlYy5udW1DaGFubmVscyxcbiAgICAgICAgICAgIHJDb2RlYy5udW1DaGFubmVscyk7XG4gICAgICAgIC8vIHB1c2ggckNvZGVjIHNvIHdlIHJlcGx5IHdpdGggb2ZmZXJlciBwYXlsb2FkIHR5cGVcbiAgICAgICAgY29tbW9uQ2FwYWJpbGl0aWVzLmNvZGVjcy5wdXNoKHJDb2RlYyk7XG5cbiAgICAgICAgLy8gZGV0ZXJtaW5lIGNvbW1vbiBmZWVkYmFjayBtZWNoYW5pc21zXG4gICAgICAgIHJDb2RlYy5ydGNwRmVlZGJhY2sgPSByQ29kZWMucnRjcEZlZWRiYWNrLmZpbHRlcihmdW5jdGlvbihmYikge1xuICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbENvZGVjLnJ0Y3BGZWVkYmFjay5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgaWYgKGxDb2RlYy5ydGNwRmVlZGJhY2tbal0udHlwZSA9PT0gZmIudHlwZSAmJlxuICAgICAgICAgICAgICAgIGxDb2RlYy5ydGNwRmVlZGJhY2tbal0ucGFyYW1ldGVyID09PSBmYi5wYXJhbWV0ZXIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIEZJWE1FOiBhbHNvIG5lZWQgdG8gZGV0ZXJtaW5lIC5wYXJhbWV0ZXJzXG4gICAgICAgIC8vICBzZWUgaHR0cHM6Ly9naXRodWIuY29tL29wZW5wZWVyL29ydGMvaXNzdWVzLzU2OVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIGxvY2FsQ2FwYWJpbGl0aWVzLmhlYWRlckV4dGVuc2lvbnMuZm9yRWFjaChmdW5jdGlvbihsSGVhZGVyRXh0ZW5zaW9uKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZW1vdGVDYXBhYmlsaXRpZXMuaGVhZGVyRXh0ZW5zaW9ucy5sZW5ndGg7XG4gICAgICAgICBpKyspIHtcbiAgICAgIHZhciBySGVhZGVyRXh0ZW5zaW9uID0gcmVtb3RlQ2FwYWJpbGl0aWVzLmhlYWRlckV4dGVuc2lvbnNbaV07XG4gICAgICBpZiAobEhlYWRlckV4dGVuc2lvbi51cmkgPT09IHJIZWFkZXJFeHRlbnNpb24udXJpKSB7XG4gICAgICAgIGNvbW1vbkNhcGFiaWxpdGllcy5oZWFkZXJFeHRlbnNpb25zLnB1c2gockhlYWRlckV4dGVuc2lvbik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgLy8gRklYTUU6IGZlY01lY2hhbmlzbXNcbiAgcmV0dXJuIGNvbW1vbkNhcGFiaWxpdGllcztcbn1cblxuLy8gaXMgYWN0aW9uPXNldExvY2FsRGVzY3JpcHRpb24gd2l0aCB0eXBlIGFsbG93ZWQgaW4gc2lnbmFsaW5nU3RhdGVcbmZ1bmN0aW9uIGlzQWN0aW9uQWxsb3dlZEluU2lnbmFsaW5nU3RhdGUoYWN0aW9uLCB0eXBlLCBzaWduYWxpbmdTdGF0ZSkge1xuICByZXR1cm4ge1xuICAgIG9mZmVyOiB7XG4gICAgICBzZXRMb2NhbERlc2NyaXB0aW9uOiBbJ3N0YWJsZScsICdoYXZlLWxvY2FsLW9mZmVyJ10sXG4gICAgICBzZXRSZW1vdGVEZXNjcmlwdGlvbjogWydzdGFibGUnLCAnaGF2ZS1yZW1vdGUtb2ZmZXInXVxuICAgIH0sXG4gICAgYW5zd2VyOiB7XG4gICAgICBzZXRMb2NhbERlc2NyaXB0aW9uOiBbJ2hhdmUtcmVtb3RlLW9mZmVyJywgJ2hhdmUtbG9jYWwtcHJhbnN3ZXInXSxcbiAgICAgIHNldFJlbW90ZURlc2NyaXB0aW9uOiBbJ2hhdmUtbG9jYWwtb2ZmZXInLCAnaGF2ZS1yZW1vdGUtcHJhbnN3ZXInXVxuICAgIH1cbiAgfVt0eXBlXVthY3Rpb25dLmluZGV4T2Yoc2lnbmFsaW5nU3RhdGUpICE9PSAtMTtcbn1cblxuZnVuY3Rpb24gbWF5YmVBZGRDYW5kaWRhdGUoaWNlVHJhbnNwb3J0LCBjYW5kaWRhdGUpIHtcbiAgLy8gRWRnZSdzIGludGVybmFsIHJlcHJlc2VudGF0aW9uIGFkZHMgc29tZSBmaWVsZHMgdGhlcmVmb3JlXG4gIC8vIG5vdCBhbGwgZmllbGTRlSBhcmUgdGFrZW4gaW50byBhY2NvdW50LlxuICB2YXIgYWxyZWFkeUFkZGVkID0gaWNlVHJhbnNwb3J0LmdldFJlbW90ZUNhbmRpZGF0ZXMoKVxuICAgICAgLmZpbmQoZnVuY3Rpb24ocmVtb3RlQ2FuZGlkYXRlKSB7XG4gICAgICAgIHJldHVybiBjYW5kaWRhdGUuZm91bmRhdGlvbiA9PT0gcmVtb3RlQ2FuZGlkYXRlLmZvdW5kYXRpb24gJiZcbiAgICAgICAgICAgIGNhbmRpZGF0ZS5pcCA9PT0gcmVtb3RlQ2FuZGlkYXRlLmlwICYmXG4gICAgICAgICAgICBjYW5kaWRhdGUucG9ydCA9PT0gcmVtb3RlQ2FuZGlkYXRlLnBvcnQgJiZcbiAgICAgICAgICAgIGNhbmRpZGF0ZS5wcmlvcml0eSA9PT0gcmVtb3RlQ2FuZGlkYXRlLnByaW9yaXR5ICYmXG4gICAgICAgICAgICBjYW5kaWRhdGUucHJvdG9jb2wgPT09IHJlbW90ZUNhbmRpZGF0ZS5wcm90b2NvbCAmJlxuICAgICAgICAgICAgY2FuZGlkYXRlLnR5cGUgPT09IHJlbW90ZUNhbmRpZGF0ZS50eXBlO1xuICAgICAgfSk7XG4gIGlmICghYWxyZWFkeUFkZGVkKSB7XG4gICAgaWNlVHJhbnNwb3J0LmFkZFJlbW90ZUNhbmRpZGF0ZShjYW5kaWRhdGUpO1xuICB9XG4gIHJldHVybiAhYWxyZWFkeUFkZGVkO1xufVxuXG5cbmZ1bmN0aW9uIG1ha2VFcnJvcihuYW1lLCBkZXNjcmlwdGlvbikge1xuICB2YXIgZSA9IG5ldyBFcnJvcihkZXNjcmlwdGlvbik7XG4gIGUubmFtZSA9IG5hbWU7XG4gIC8vIGxlZ2FjeSBlcnJvciBjb2RlcyBmcm9tIGh0dHBzOi8vaGV5Y2FtLmdpdGh1Yi5pby93ZWJpZGwvI2lkbC1ET01FeGNlcHRpb24tZXJyb3ItbmFtZXNcbiAgZS5jb2RlID0ge1xuICAgIE5vdFN1cHBvcnRlZEVycm9yOiA5LFxuICAgIEludmFsaWRTdGF0ZUVycm9yOiAxMSxcbiAgICBJbnZhbGlkQWNjZXNzRXJyb3I6IDE1LFxuICAgIFR5cGVFcnJvcjogdW5kZWZpbmVkLFxuICAgIE9wZXJhdGlvbkVycm9yOiB1bmRlZmluZWRcbiAgfVtuYW1lXTtcbiAgcmV0dXJuIGU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24od2luZG93LCBlZGdlVmVyc2lvbikge1xuICAvLyBodHRwczovL3czYy5naXRodWIuaW8vbWVkaWFjYXB0dXJlLW1haW4vI21lZGlhc3RyZWFtXG4gIC8vIEhlbHBlciBmdW5jdGlvbiB0byBhZGQgdGhlIHRyYWNrIHRvIHRoZSBzdHJlYW0gYW5kXG4gIC8vIGRpc3BhdGNoIHRoZSBldmVudCBvdXJzZWx2ZXMuXG4gIGZ1bmN0aW9uIGFkZFRyYWNrVG9TdHJlYW1BbmRGaXJlRXZlbnQodHJhY2ssIHN0cmVhbSkge1xuICAgIHN0cmVhbS5hZGRUcmFjayh0cmFjayk7XG4gICAgc3RyZWFtLmRpc3BhdGNoRXZlbnQobmV3IHdpbmRvdy5NZWRpYVN0cmVhbVRyYWNrRXZlbnQoJ2FkZHRyYWNrJyxcbiAgICAgICAge3RyYWNrOiB0cmFja30pKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZVRyYWNrRnJvbVN0cmVhbUFuZEZpcmVFdmVudCh0cmFjaywgc3RyZWFtKSB7XG4gICAgc3RyZWFtLnJlbW92ZVRyYWNrKHRyYWNrKTtcbiAgICBzdHJlYW0uZGlzcGF0Y2hFdmVudChuZXcgd2luZG93Lk1lZGlhU3RyZWFtVHJhY2tFdmVudCgncmVtb3ZldHJhY2snLFxuICAgICAgICB7dHJhY2s6IHRyYWNrfSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZmlyZUFkZFRyYWNrKHBjLCB0cmFjaywgcmVjZWl2ZXIsIHN0cmVhbXMpIHtcbiAgICB2YXIgdHJhY2tFdmVudCA9IG5ldyBFdmVudCgndHJhY2snKTtcbiAgICB0cmFja0V2ZW50LnRyYWNrID0gdHJhY2s7XG4gICAgdHJhY2tFdmVudC5yZWNlaXZlciA9IHJlY2VpdmVyO1xuICAgIHRyYWNrRXZlbnQudHJhbnNjZWl2ZXIgPSB7cmVjZWl2ZXI6IHJlY2VpdmVyfTtcbiAgICB0cmFja0V2ZW50LnN0cmVhbXMgPSBzdHJlYW1zO1xuICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgcGMuX2Rpc3BhdGNoRXZlbnQoJ3RyYWNrJywgdHJhY2tFdmVudCk7XG4gICAgfSk7XG4gIH1cblxuICB2YXIgUlRDUGVlckNvbm5lY3Rpb24gPSBmdW5jdGlvbihjb25maWcpIHtcbiAgICB2YXIgcGMgPSB0aGlzO1xuXG4gICAgdmFyIF9ldmVudFRhcmdldCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICBbJ2FkZEV2ZW50TGlzdGVuZXInLCAncmVtb3ZlRXZlbnRMaXN0ZW5lcicsICdkaXNwYXRjaEV2ZW50J11cbiAgICAgICAgLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgICAgcGNbbWV0aG9kXSA9IF9ldmVudFRhcmdldFttZXRob2RdLmJpbmQoX2V2ZW50VGFyZ2V0KTtcbiAgICAgICAgfSk7XG5cbiAgICB0aGlzLmNhblRyaWNrbGVJY2VDYW5kaWRhdGVzID0gbnVsbDtcblxuICAgIHRoaXMubmVlZE5lZ290aWF0aW9uID0gZmFsc2U7XG5cbiAgICB0aGlzLmxvY2FsU3RyZWFtcyA9IFtdO1xuICAgIHRoaXMucmVtb3RlU3RyZWFtcyA9IFtdO1xuXG4gICAgdGhpcy5sb2NhbERlc2NyaXB0aW9uID0gbnVsbDtcbiAgICB0aGlzLnJlbW90ZURlc2NyaXB0aW9uID0gbnVsbDtcblxuICAgIHRoaXMuc2lnbmFsaW5nU3RhdGUgPSAnc3RhYmxlJztcbiAgICB0aGlzLmljZUNvbm5lY3Rpb25TdGF0ZSA9ICduZXcnO1xuICAgIHRoaXMuY29ubmVjdGlvblN0YXRlID0gJ25ldyc7XG4gICAgdGhpcy5pY2VHYXRoZXJpbmdTdGF0ZSA9ICduZXcnO1xuXG4gICAgY29uZmlnID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShjb25maWcgfHwge30pKTtcblxuICAgIHRoaXMudXNpbmdCdW5kbGUgPSBjb25maWcuYnVuZGxlUG9saWN5ID09PSAnbWF4LWJ1bmRsZSc7XG4gICAgaWYgKGNvbmZpZy5ydGNwTXV4UG9saWN5ID09PSAnbmVnb3RpYXRlJykge1xuICAgICAgdGhyb3cobWFrZUVycm9yKCdOb3RTdXBwb3J0ZWRFcnJvcicsXG4gICAgICAgICAgJ3J0Y3BNdXhQb2xpY3kgXFwnbmVnb3RpYXRlXFwnIGlzIG5vdCBzdXBwb3J0ZWQnKSk7XG4gICAgfSBlbHNlIGlmICghY29uZmlnLnJ0Y3BNdXhQb2xpY3kpIHtcbiAgICAgIGNvbmZpZy5ydGNwTXV4UG9saWN5ID0gJ3JlcXVpcmUnO1xuICAgIH1cblxuICAgIHN3aXRjaCAoY29uZmlnLmljZVRyYW5zcG9ydFBvbGljeSkge1xuICAgICAgY2FzZSAnYWxsJzpcbiAgICAgIGNhc2UgJ3JlbGF5JzpcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25maWcuaWNlVHJhbnNwb3J0UG9saWN5ID0gJ2FsbCc7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHN3aXRjaCAoY29uZmlnLmJ1bmRsZVBvbGljeSkge1xuICAgICAgY2FzZSAnYmFsYW5jZWQnOlxuICAgICAgY2FzZSAnbWF4LWNvbXBhdCc6XG4gICAgICBjYXNlICdtYXgtYnVuZGxlJzpcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25maWcuYnVuZGxlUG9saWN5ID0gJ2JhbGFuY2VkJztcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY29uZmlnLmljZVNlcnZlcnMgPSBmaWx0ZXJJY2VTZXJ2ZXJzKGNvbmZpZy5pY2VTZXJ2ZXJzIHx8IFtdLCBlZGdlVmVyc2lvbik7XG5cbiAgICB0aGlzLl9pY2VHYXRoZXJlcnMgPSBbXTtcbiAgICBpZiAoY29uZmlnLmljZUNhbmRpZGF0ZVBvb2xTaXplKSB7XG4gICAgICBmb3IgKHZhciBpID0gY29uZmlnLmljZUNhbmRpZGF0ZVBvb2xTaXplOyBpID4gMDsgaS0tKSB7XG4gICAgICAgIHRoaXMuX2ljZUdhdGhlcmVycy5wdXNoKG5ldyB3aW5kb3cuUlRDSWNlR2F0aGVyZXIoe1xuICAgICAgICAgIGljZVNlcnZlcnM6IGNvbmZpZy5pY2VTZXJ2ZXJzLFxuICAgICAgICAgIGdhdGhlclBvbGljeTogY29uZmlnLmljZVRyYW5zcG9ydFBvbGljeVxuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbmZpZy5pY2VDYW5kaWRhdGVQb29sU2l6ZSA9IDA7XG4gICAgfVxuXG4gICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xuXG4gICAgLy8gcGVyLXRyYWNrIGljZUdhdGhlcnMsIGljZVRyYW5zcG9ydHMsIGR0bHNUcmFuc3BvcnRzLCBydHBTZW5kZXJzLCAuLi5cbiAgICAvLyBldmVyeXRoaW5nIHRoYXQgaXMgbmVlZGVkIHRvIGRlc2NyaWJlIGEgU0RQIG0tbGluZS5cbiAgICB0aGlzLnRyYW5zY2VpdmVycyA9IFtdO1xuXG4gICAgdGhpcy5fc2RwU2Vzc2lvbklkID0gU0RQVXRpbHMuZ2VuZXJhdGVTZXNzaW9uSWQoKTtcbiAgICB0aGlzLl9zZHBTZXNzaW9uVmVyc2lvbiA9IDA7XG5cbiAgICB0aGlzLl9kdGxzUm9sZSA9IHVuZGVmaW5lZDsgLy8gcm9sZSBmb3IgYT1zZXR1cCB0byB1c2UgaW4gYW5zd2Vycy5cblxuICAgIHRoaXMuX2lzQ2xvc2VkID0gZmFsc2U7XG4gIH07XG5cbiAgLy8gc2V0IHVwIGV2ZW50IGhhbmRsZXJzIG9uIHByb3RvdHlwZVxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub25pY2VjYW5kaWRhdGUgPSBudWxsO1xuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub25hZGRzdHJlYW0gPSBudWxsO1xuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub250cmFjayA9IG51bGw7XG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5vbnJlbW92ZXN0cmVhbSA9IG51bGw7XG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5vbnNpZ25hbGluZ3N0YXRlY2hhbmdlID0gbnVsbDtcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9uaWNlY29ubmVjdGlvbnN0YXRlY2hhbmdlID0gbnVsbDtcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9uY29ubmVjdGlvbnN0YXRlY2hhbmdlID0gbnVsbDtcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9uaWNlZ2F0aGVyaW5nc3RhdGVjaGFuZ2UgPSBudWxsO1xuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub25uZWdvdGlhdGlvbm5lZWRlZCA9IG51bGw7XG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5vbmRhdGFjaGFubmVsID0gbnVsbDtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX2Rpc3BhdGNoRXZlbnQgPSBmdW5jdGlvbihuYW1lLCBldmVudCkge1xuICAgIGlmICh0aGlzLl9pc0Nsb3NlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIGlmICh0eXBlb2YgdGhpc1snb24nICsgbmFtZV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXNbJ29uJyArIG5hbWVdKGV2ZW50KTtcbiAgICB9XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl9lbWl0R2F0aGVyaW5nU3RhdGVDaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ2ljZWdhdGhlcmluZ3N0YXRlY2hhbmdlJyk7XG4gICAgdGhpcy5fZGlzcGF0Y2hFdmVudCgnaWNlZ2F0aGVyaW5nc3RhdGVjaGFuZ2UnLCBldmVudCk7XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldENvbmZpZ3VyYXRpb24gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRMb2NhbFN0cmVhbXMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5sb2NhbFN0cmVhbXM7XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFJlbW90ZVN0cmVhbXMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5yZW1vdGVTdHJlYW1zO1xuICB9O1xuXG4gIC8vIGludGVybmFsIGhlbHBlciB0byBjcmVhdGUgYSB0cmFuc2NlaXZlciBvYmplY3QuXG4gIC8vICh3aGljaCBpcyBub3QgeWV0IHRoZSBzYW1lIGFzIHRoZSBXZWJSVEMgMS4wIHRyYW5zY2VpdmVyKVxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX2NyZWF0ZVRyYW5zY2VpdmVyID0gZnVuY3Rpb24oa2luZCwgZG9Ob3RBZGQpIHtcbiAgICB2YXIgaGFzQnVuZGxlVHJhbnNwb3J0ID0gdGhpcy50cmFuc2NlaXZlcnMubGVuZ3RoID4gMDtcbiAgICB2YXIgdHJhbnNjZWl2ZXIgPSB7XG4gICAgICB0cmFjazogbnVsbCxcbiAgICAgIGljZUdhdGhlcmVyOiBudWxsLFxuICAgICAgaWNlVHJhbnNwb3J0OiBudWxsLFxuICAgICAgZHRsc1RyYW5zcG9ydDogbnVsbCxcbiAgICAgIGxvY2FsQ2FwYWJpbGl0aWVzOiBudWxsLFxuICAgICAgcmVtb3RlQ2FwYWJpbGl0aWVzOiBudWxsLFxuICAgICAgcnRwU2VuZGVyOiBudWxsLFxuICAgICAgcnRwUmVjZWl2ZXI6IG51bGwsXG4gICAgICBraW5kOiBraW5kLFxuICAgICAgbWlkOiBudWxsLFxuICAgICAgc2VuZEVuY29kaW5nUGFyYW1ldGVyczogbnVsbCxcbiAgICAgIHJlY3ZFbmNvZGluZ1BhcmFtZXRlcnM6IG51bGwsXG4gICAgICBzdHJlYW06IG51bGwsXG4gICAgICBhc3NvY2lhdGVkUmVtb3RlTWVkaWFTdHJlYW1zOiBbXSxcbiAgICAgIHdhbnRSZWNlaXZlOiB0cnVlXG4gICAgfTtcbiAgICBpZiAodGhpcy51c2luZ0J1bmRsZSAmJiBoYXNCdW5kbGVUcmFuc3BvcnQpIHtcbiAgICAgIHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydCA9IHRoaXMudHJhbnNjZWl2ZXJzWzBdLmljZVRyYW5zcG9ydDtcbiAgICAgIHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQgPSB0aGlzLnRyYW5zY2VpdmVyc1swXS5kdGxzVHJhbnNwb3J0O1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdHJhbnNwb3J0cyA9IHRoaXMuX2NyZWF0ZUljZUFuZER0bHNUcmFuc3BvcnRzKCk7XG4gICAgICB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQgPSB0cmFuc3BvcnRzLmljZVRyYW5zcG9ydDtcbiAgICAgIHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQgPSB0cmFuc3BvcnRzLmR0bHNUcmFuc3BvcnQ7XG4gICAgfVxuICAgIGlmICghZG9Ob3RBZGQpIHtcbiAgICAgIHRoaXMudHJhbnNjZWl2ZXJzLnB1c2godHJhbnNjZWl2ZXIpO1xuICAgIH1cbiAgICByZXR1cm4gdHJhbnNjZWl2ZXI7XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFRyYWNrID0gZnVuY3Rpb24odHJhY2ssIHN0cmVhbSkge1xuICAgIGlmICh0aGlzLl9pc0Nsb3NlZCkge1xuICAgICAgdGhyb3cgbWFrZUVycm9yKCdJbnZhbGlkU3RhdGVFcnJvcicsXG4gICAgICAgICAgJ0F0dGVtcHRlZCB0byBjYWxsIGFkZFRyYWNrIG9uIGEgY2xvc2VkIHBlZXJjb25uZWN0aW9uLicpO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5RXhpc3RzID0gdGhpcy50cmFuc2NlaXZlcnMuZmluZChmdW5jdGlvbihzKSB7XG4gICAgICByZXR1cm4gcy50cmFjayA9PT0gdHJhY2s7XG4gICAgfSk7XG5cbiAgICBpZiAoYWxyZWFkeUV4aXN0cykge1xuICAgICAgdGhyb3cgbWFrZUVycm9yKCdJbnZhbGlkQWNjZXNzRXJyb3InLCAnVHJhY2sgYWxyZWFkeSBleGlzdHMuJyk7XG4gICAgfVxuXG4gICAgdmFyIHRyYW5zY2VpdmVyO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50cmFuc2NlaXZlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICghdGhpcy50cmFuc2NlaXZlcnNbaV0udHJhY2sgJiZcbiAgICAgICAgICB0aGlzLnRyYW5zY2VpdmVyc1tpXS5raW5kID09PSB0cmFjay5raW5kKSB7XG4gICAgICAgIHRyYW5zY2VpdmVyID0gdGhpcy50cmFuc2NlaXZlcnNbaV07XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghdHJhbnNjZWl2ZXIpIHtcbiAgICAgIHRyYW5zY2VpdmVyID0gdGhpcy5fY3JlYXRlVHJhbnNjZWl2ZXIodHJhY2sua2luZCk7XG4gICAgfVxuXG4gICAgdGhpcy5fbWF5YmVGaXJlTmVnb3RpYXRpb25OZWVkZWQoKTtcblxuICAgIGlmICh0aGlzLmxvY2FsU3RyZWFtcy5pbmRleE9mKHN0cmVhbSkgPT09IC0xKSB7XG4gICAgICB0aGlzLmxvY2FsU3RyZWFtcy5wdXNoKHN0cmVhbSk7XG4gICAgfVxuXG4gICAgdHJhbnNjZWl2ZXIudHJhY2sgPSB0cmFjaztcbiAgICB0cmFuc2NlaXZlci5zdHJlYW0gPSBzdHJlYW07XG4gICAgdHJhbnNjZWl2ZXIucnRwU2VuZGVyID0gbmV3IHdpbmRvdy5SVENSdHBTZW5kZXIodHJhY2ssXG4gICAgICAgIHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQpO1xuICAgIHJldHVybiB0cmFuc2NlaXZlci5ydHBTZW5kZXI7XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgIHZhciBwYyA9IHRoaXM7XG4gICAgaWYgKGVkZ2VWZXJzaW9uID49IDE1MDI1KSB7XG4gICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xuICAgICAgICBwYy5hZGRUcmFjayh0cmFjaywgc3RyZWFtKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBDbG9uZSBpcyBuZWNlc3NhcnkgZm9yIGxvY2FsIGRlbW9zIG1vc3RseSwgYXR0YWNoaW5nIGRpcmVjdGx5XG4gICAgICAvLyB0byB0d28gZGlmZmVyZW50IHNlbmRlcnMgZG9lcyBub3Qgd29yayAoYnVpbGQgMTA1NDcpLlxuICAgICAgLy8gRml4ZWQgaW4gMTUwMjUgKG9yIGVhcmxpZXIpXG4gICAgICB2YXIgY2xvbmVkU3RyZWFtID0gc3RyZWFtLmNsb25lKCk7XG4gICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaywgaWR4KSB7XG4gICAgICAgIHZhciBjbG9uZWRUcmFjayA9IGNsb25lZFN0cmVhbS5nZXRUcmFja3MoKVtpZHhdO1xuICAgICAgICB0cmFjay5hZGRFdmVudExpc3RlbmVyKCdlbmFibGVkJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBjbG9uZWRUcmFjay5lbmFibGVkID0gZXZlbnQuZW5hYmxlZDtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIGNsb25lZFN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XG4gICAgICAgIHBjLmFkZFRyYWNrKHRyYWNrLCBjbG9uZWRTdHJlYW0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVUcmFjayA9IGZ1bmN0aW9uKHNlbmRlcikge1xuICAgIGlmICh0aGlzLl9pc0Nsb3NlZCkge1xuICAgICAgdGhyb3cgbWFrZUVycm9yKCdJbnZhbGlkU3RhdGVFcnJvcicsXG4gICAgICAgICAgJ0F0dGVtcHRlZCB0byBjYWxsIHJlbW92ZVRyYWNrIG9uIGEgY2xvc2VkIHBlZXJjb25uZWN0aW9uLicpO1xuICAgIH1cblxuICAgIGlmICghKHNlbmRlciBpbnN0YW5jZW9mIHdpbmRvdy5SVENSdHBTZW5kZXIpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCAxIG9mIFJUQ1BlZXJDb25uZWN0aW9uLnJlbW92ZVRyYWNrICcgK1xuICAgICAgICAgICdkb2VzIG5vdCBpbXBsZW1lbnQgaW50ZXJmYWNlIFJUQ1J0cFNlbmRlci4nKTtcbiAgICB9XG5cbiAgICB2YXIgdHJhbnNjZWl2ZXIgPSB0aGlzLnRyYW5zY2VpdmVycy5maW5kKGZ1bmN0aW9uKHQpIHtcbiAgICAgIHJldHVybiB0LnJ0cFNlbmRlciA9PT0gc2VuZGVyO1xuICAgIH0pO1xuXG4gICAgaWYgKCF0cmFuc2NlaXZlcikge1xuICAgICAgdGhyb3cgbWFrZUVycm9yKCdJbnZhbGlkQWNjZXNzRXJyb3InLFxuICAgICAgICAgICdTZW5kZXIgd2FzIG5vdCBjcmVhdGVkIGJ5IHRoaXMgY29ubmVjdGlvbi4nKTtcbiAgICB9XG4gICAgdmFyIHN0cmVhbSA9IHRyYW5zY2VpdmVyLnN0cmVhbTtcblxuICAgIHRyYW5zY2VpdmVyLnJ0cFNlbmRlci5zdG9wKCk7XG4gICAgdHJhbnNjZWl2ZXIucnRwU2VuZGVyID0gbnVsbDtcbiAgICB0cmFuc2NlaXZlci50cmFjayA9IG51bGw7XG4gICAgdHJhbnNjZWl2ZXIuc3RyZWFtID0gbnVsbDtcblxuICAgIC8vIHJlbW92ZSB0aGUgc3RyZWFtIGZyb20gdGhlIHNldCBvZiBsb2NhbCBzdHJlYW1zXG4gICAgdmFyIGxvY2FsU3RyZWFtcyA9IHRoaXMudHJhbnNjZWl2ZXJzLm1hcChmdW5jdGlvbih0KSB7XG4gICAgICByZXR1cm4gdC5zdHJlYW07XG4gICAgfSk7XG4gICAgaWYgKGxvY2FsU3RyZWFtcy5pbmRleE9mKHN0cmVhbSkgPT09IC0xICYmXG4gICAgICAgIHRoaXMubG9jYWxTdHJlYW1zLmluZGV4T2Yoc3RyZWFtKSA+IC0xKSB7XG4gICAgICB0aGlzLmxvY2FsU3RyZWFtcy5zcGxpY2UodGhpcy5sb2NhbFN0cmVhbXMuaW5kZXhPZihzdHJlYW0pLCAxKTtcbiAgICB9XG5cbiAgICB0aGlzLl9tYXliZUZpcmVOZWdvdGlhdGlvbk5lZWRlZCgpO1xuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICB2YXIgcGMgPSB0aGlzO1xuICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XG4gICAgICB2YXIgc2VuZGVyID0gcGMuZ2V0U2VuZGVycygpLmZpbmQoZnVuY3Rpb24ocykge1xuICAgICAgICByZXR1cm4gcy50cmFjayA9PT0gdHJhY2s7XG4gICAgICB9KTtcbiAgICAgIGlmIChzZW5kZXIpIHtcbiAgICAgICAgcGMucmVtb3ZlVHJhY2soc2VuZGVyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U2VuZGVycyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnRyYW5zY2VpdmVycy5maWx0ZXIoZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcbiAgICAgIHJldHVybiAhIXRyYW5zY2VpdmVyLnJ0cFNlbmRlcjtcbiAgICB9KVxuICAgIC5tYXAoZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcbiAgICAgIHJldHVybiB0cmFuc2NlaXZlci5ydHBTZW5kZXI7XG4gICAgfSk7XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFJlY2VpdmVycyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnRyYW5zY2VpdmVycy5maWx0ZXIoZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcbiAgICAgIHJldHVybiAhIXRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyO1xuICAgIH0pXG4gICAgLm1hcChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xuICAgICAgcmV0dXJuIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyO1xuICAgIH0pO1xuICB9O1xuXG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl9jcmVhdGVJY2VHYXRoZXJlciA9IGZ1bmN0aW9uKHNkcE1MaW5lSW5kZXgsXG4gICAgICB1c2luZ0J1bmRsZSkge1xuICAgIHZhciBwYyA9IHRoaXM7XG4gICAgaWYgKHVzaW5nQnVuZGxlICYmIHNkcE1MaW5lSW5kZXggPiAwKSB7XG4gICAgICByZXR1cm4gdGhpcy50cmFuc2NlaXZlcnNbMF0uaWNlR2F0aGVyZXI7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9pY2VHYXRoZXJlcnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdGhpcy5faWNlR2F0aGVyZXJzLnNoaWZ0KCk7XG4gICAgfVxuICAgIHZhciBpY2VHYXRoZXJlciA9IG5ldyB3aW5kb3cuUlRDSWNlR2F0aGVyZXIoe1xuICAgICAgaWNlU2VydmVyczogdGhpcy5fY29uZmlnLmljZVNlcnZlcnMsXG4gICAgICBnYXRoZXJQb2xpY3k6IHRoaXMuX2NvbmZpZy5pY2VUcmFuc3BvcnRQb2xpY3lcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoaWNlR2F0aGVyZXIsICdzdGF0ZScsXG4gICAgICAgIHt2YWx1ZTogJ25ldycsIHdyaXRhYmxlOiB0cnVlfVxuICAgICk7XG5cbiAgICB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5idWZmZXJlZENhbmRpZGF0ZUV2ZW50cyA9IFtdO1xuICAgIHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmJ1ZmZlckNhbmRpZGF0ZXMgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgdmFyIGVuZCA9ICFldmVudC5jYW5kaWRhdGUgfHwgT2JqZWN0LmtleXMoZXZlbnQuY2FuZGlkYXRlKS5sZW5ndGggPT09IDA7XG4gICAgICAvLyBwb2x5ZmlsbCBzaW5jZSBSVENJY2VHYXRoZXJlci5zdGF0ZSBpcyBub3QgaW1wbGVtZW50ZWQgaW5cbiAgICAgIC8vIEVkZ2UgMTA1NDcgeWV0LlxuICAgICAgaWNlR2F0aGVyZXIuc3RhdGUgPSBlbmQgPyAnY29tcGxldGVkJyA6ICdnYXRoZXJpbmcnO1xuICAgICAgaWYgKHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5idWZmZXJlZENhbmRpZGF0ZUV2ZW50cyAhPT0gbnVsbCkge1xuICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uYnVmZmVyZWRDYW5kaWRhdGVFdmVudHMucHVzaChldmVudCk7XG4gICAgICB9XG4gICAgfTtcbiAgICBpY2VHYXRoZXJlci5hZGRFdmVudExpc3RlbmVyKCdsb2NhbGNhbmRpZGF0ZScsXG4gICAgICB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5idWZmZXJDYW5kaWRhdGVzKTtcbiAgICByZXR1cm4gaWNlR2F0aGVyZXI7XG4gIH07XG5cbiAgLy8gc3RhcnQgZ2F0aGVyaW5nIGZyb20gYW4gUlRDSWNlR2F0aGVyZXIuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fZ2F0aGVyID0gZnVuY3Rpb24obWlkLCBzZHBNTGluZUluZGV4KSB7XG4gICAgdmFyIHBjID0gdGhpcztcbiAgICB2YXIgaWNlR2F0aGVyZXIgPSB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5pY2VHYXRoZXJlcjtcbiAgICBpZiAoaWNlR2F0aGVyZXIub25sb2NhbGNhbmRpZGF0ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgYnVmZmVyZWRDYW5kaWRhdGVFdmVudHMgPVxuICAgICAgdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uYnVmZmVyZWRDYW5kaWRhdGVFdmVudHM7XG4gICAgdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uYnVmZmVyZWRDYW5kaWRhdGVFdmVudHMgPSBudWxsO1xuICAgIGljZUdhdGhlcmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xvY2FsY2FuZGlkYXRlJyxcbiAgICAgIHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmJ1ZmZlckNhbmRpZGF0ZXMpO1xuICAgIGljZUdhdGhlcmVyLm9ubG9jYWxjYW5kaWRhdGUgPSBmdW5jdGlvbihldnQpIHtcbiAgICAgIGlmIChwYy51c2luZ0J1bmRsZSAmJiBzZHBNTGluZUluZGV4ID4gMCkge1xuICAgICAgICAvLyBpZiB3ZSBrbm93IHRoYXQgd2UgdXNlIGJ1bmRsZSB3ZSBjYW4gZHJvcCBjYW5kaWRhdGVzIHdpdGhcbiAgICAgICAgLy8g0ZVkcE1MaW5lSW5kZXggPiAwLiBJZiB3ZSBkb24ndCBkbyB0aGlzIHRoZW4gb3VyIHN0YXRlIGdldHNcbiAgICAgICAgLy8gY29uZnVzZWQgc2luY2Ugd2UgZGlzcG9zZSB0aGUgZXh0cmEgaWNlIGdhdGhlcmVyLlxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ2ljZWNhbmRpZGF0ZScpO1xuICAgICAgZXZlbnQuY2FuZGlkYXRlID0ge3NkcE1pZDogbWlkLCBzZHBNTGluZUluZGV4OiBzZHBNTGluZUluZGV4fTtcblxuICAgICAgdmFyIGNhbmQgPSBldnQuY2FuZGlkYXRlO1xuICAgICAgLy8gRWRnZSBlbWl0cyBhbiBlbXB0eSBvYmplY3QgZm9yIFJUQ0ljZUNhbmRpZGF0ZUNvbXBsZXRl4oClXG4gICAgICB2YXIgZW5kID0gIWNhbmQgfHwgT2JqZWN0LmtleXMoY2FuZCkubGVuZ3RoID09PSAwO1xuICAgICAgaWYgKGVuZCkge1xuICAgICAgICAvLyBwb2x5ZmlsbCBzaW5jZSBSVENJY2VHYXRoZXJlci5zdGF0ZSBpcyBub3QgaW1wbGVtZW50ZWQgaW5cbiAgICAgICAgLy8gRWRnZSAxMDU0NyB5ZXQuXG4gICAgICAgIGlmIChpY2VHYXRoZXJlci5zdGF0ZSA9PT0gJ25ldycgfHwgaWNlR2F0aGVyZXIuc3RhdGUgPT09ICdnYXRoZXJpbmcnKSB7XG4gICAgICAgICAgaWNlR2F0aGVyZXIuc3RhdGUgPSAnY29tcGxldGVkJztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGljZUdhdGhlcmVyLnN0YXRlID09PSAnbmV3Jykge1xuICAgICAgICAgIGljZUdhdGhlcmVyLnN0YXRlID0gJ2dhdGhlcmluZyc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUlRDSWNlQ2FuZGlkYXRlIGRvZXNuJ3QgaGF2ZSBhIGNvbXBvbmVudCwgbmVlZHMgdG8gYmUgYWRkZWRcbiAgICAgICAgY2FuZC5jb21wb25lbnQgPSAxO1xuICAgICAgICAvLyBhbHNvIHRoZSB1c2VybmFtZUZyYWdtZW50LiBUT0RPOiB1cGRhdGUgU0RQIHRvIHRha2UgYm90aCB2YXJpYW50cy5cbiAgICAgICAgY2FuZC51ZnJhZyA9IGljZUdhdGhlcmVyLmdldExvY2FsUGFyYW1ldGVycygpLnVzZXJuYW1lRnJhZ21lbnQ7XG5cbiAgICAgICAgdmFyIHNlcmlhbGl6ZWRDYW5kaWRhdGUgPSBTRFBVdGlscy53cml0ZUNhbmRpZGF0ZShjYW5kKTtcbiAgICAgICAgZXZlbnQuY2FuZGlkYXRlID0gT2JqZWN0LmFzc2lnbihldmVudC5jYW5kaWRhdGUsXG4gICAgICAgICAgICBTRFBVdGlscy5wYXJzZUNhbmRpZGF0ZShzZXJpYWxpemVkQ2FuZGlkYXRlKSk7XG5cbiAgICAgICAgZXZlbnQuY2FuZGlkYXRlLmNhbmRpZGF0ZSA9IHNlcmlhbGl6ZWRDYW5kaWRhdGU7XG4gICAgICAgIGV2ZW50LmNhbmRpZGF0ZS50b0pTT04gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY2FuZGlkYXRlOiBldmVudC5jYW5kaWRhdGUuY2FuZGlkYXRlLFxuICAgICAgICAgICAgc2RwTWlkOiBldmVudC5jYW5kaWRhdGUuc2RwTWlkLFxuICAgICAgICAgICAgc2RwTUxpbmVJbmRleDogZXZlbnQuY2FuZGlkYXRlLnNkcE1MaW5lSW5kZXgsXG4gICAgICAgICAgICB1c2VybmFtZUZyYWdtZW50OiBldmVudC5jYW5kaWRhdGUudXNlcm5hbWVGcmFnbWVudFxuICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIC8vIHVwZGF0ZSBsb2NhbCBkZXNjcmlwdGlvbi5cbiAgICAgIHZhciBzZWN0aW9ucyA9IFNEUFV0aWxzLmdldE1lZGlhU2VjdGlvbnMocGMubG9jYWxEZXNjcmlwdGlvbi5zZHApO1xuICAgICAgaWYgKCFlbmQpIHtcbiAgICAgICAgc2VjdGlvbnNbZXZlbnQuY2FuZGlkYXRlLnNkcE1MaW5lSW5kZXhdICs9XG4gICAgICAgICAgICAnYT0nICsgZXZlbnQuY2FuZGlkYXRlLmNhbmRpZGF0ZSArICdcXHJcXG4nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VjdGlvbnNbZXZlbnQuY2FuZGlkYXRlLnNkcE1MaW5lSW5kZXhdICs9XG4gICAgICAgICAgICAnYT1lbmQtb2YtY2FuZGlkYXRlc1xcclxcbic7XG4gICAgICB9XG4gICAgICBwYy5sb2NhbERlc2NyaXB0aW9uLnNkcCA9XG4gICAgICAgICAgU0RQVXRpbHMuZ2V0RGVzY3JpcHRpb24ocGMubG9jYWxEZXNjcmlwdGlvbi5zZHApICtcbiAgICAgICAgICBzZWN0aW9ucy5qb2luKCcnKTtcbiAgICAgIHZhciBjb21wbGV0ZSA9IHBjLnRyYW5zY2VpdmVycy5ldmVyeShmdW5jdGlvbih0cmFuc2NlaXZlcikge1xuICAgICAgICByZXR1cm4gdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIgJiZcbiAgICAgICAgICAgIHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyLnN0YXRlID09PSAnY29tcGxldGVkJztcbiAgICAgIH0pO1xuXG4gICAgICBpZiAocGMuaWNlR2F0aGVyaW5nU3RhdGUgIT09ICdnYXRoZXJpbmcnKSB7XG4gICAgICAgIHBjLmljZUdhdGhlcmluZ1N0YXRlID0gJ2dhdGhlcmluZyc7XG4gICAgICAgIHBjLl9lbWl0R2F0aGVyaW5nU3RhdGVDaGFuZ2UoKTtcbiAgICAgIH1cblxuICAgICAgLy8gRW1pdCBjYW5kaWRhdGUuIEFsc28gZW1pdCBudWxsIGNhbmRpZGF0ZSB3aGVuIGFsbCBnYXRoZXJlcnMgYXJlXG4gICAgICAvLyBjb21wbGV0ZS5cbiAgICAgIGlmICghZW5kKSB7XG4gICAgICAgIHBjLl9kaXNwYXRjaEV2ZW50KCdpY2VjYW5kaWRhdGUnLCBldmVudCk7XG4gICAgICB9XG4gICAgICBpZiAoY29tcGxldGUpIHtcbiAgICAgICAgcGMuX2Rpc3BhdGNoRXZlbnQoJ2ljZWNhbmRpZGF0ZScsIG5ldyBFdmVudCgnaWNlY2FuZGlkYXRlJykpO1xuICAgICAgICBwYy5pY2VHYXRoZXJpbmdTdGF0ZSA9ICdjb21wbGV0ZSc7XG4gICAgICAgIHBjLl9lbWl0R2F0aGVyaW5nU3RhdGVDaGFuZ2UoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gZW1pdCBhbHJlYWR5IGdhdGhlcmVkIGNhbmRpZGF0ZXMuXG4gICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBidWZmZXJlZENhbmRpZGF0ZUV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWNlR2F0aGVyZXIub25sb2NhbGNhbmRpZGF0ZShlKTtcbiAgICAgIH0pO1xuICAgIH0sIDApO1xuICB9O1xuXG4gIC8vIENyZWF0ZSBJQ0UgdHJhbnNwb3J0IGFuZCBEVExTIHRyYW5zcG9ydC5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl9jcmVhdGVJY2VBbmREdGxzVHJhbnNwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBwYyA9IHRoaXM7XG4gICAgdmFyIGljZVRyYW5zcG9ydCA9IG5ldyB3aW5kb3cuUlRDSWNlVHJhbnNwb3J0KG51bGwpO1xuICAgIGljZVRyYW5zcG9ydC5vbmljZXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICBwYy5fdXBkYXRlSWNlQ29ubmVjdGlvblN0YXRlKCk7XG4gICAgICBwYy5fdXBkYXRlQ29ubmVjdGlvblN0YXRlKCk7XG4gICAgfTtcblxuICAgIHZhciBkdGxzVHJhbnNwb3J0ID0gbmV3IHdpbmRvdy5SVENEdGxzVHJhbnNwb3J0KGljZVRyYW5zcG9ydCk7XG4gICAgZHRsc1RyYW5zcG9ydC5vbmR0bHNzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcGMuX3VwZGF0ZUNvbm5lY3Rpb25TdGF0ZSgpO1xuICAgIH07XG4gICAgZHRsc1RyYW5zcG9ydC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAvLyBvbmVycm9yIGRvZXMgbm90IHNldCBzdGF0ZSB0byBmYWlsZWQgYnkgaXRzZWxmLlxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGR0bHNUcmFuc3BvcnQsICdzdGF0ZScsXG4gICAgICAgICAge3ZhbHVlOiAnZmFpbGVkJywgd3JpdGFibGU6IHRydWV9KTtcbiAgICAgIHBjLl91cGRhdGVDb25uZWN0aW9uU3RhdGUoKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGljZVRyYW5zcG9ydDogaWNlVHJhbnNwb3J0LFxuICAgICAgZHRsc1RyYW5zcG9ydDogZHRsc1RyYW5zcG9ydFxuICAgIH07XG4gIH07XG5cbiAgLy8gRGVzdHJveSBJQ0UgZ2F0aGVyZXIsIElDRSB0cmFuc3BvcnQgYW5kIERUTFMgdHJhbnNwb3J0LlxuICAvLyBXaXRob3V0IHRyaWdnZXJpbmcgdGhlIGNhbGxiYWNrcy5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl9kaXNwb3NlSWNlQW5kRHRsc1RyYW5zcG9ydHMgPSBmdW5jdGlvbihcbiAgICAgIHNkcE1MaW5lSW5kZXgpIHtcbiAgICB2YXIgaWNlR2F0aGVyZXIgPSB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5pY2VHYXRoZXJlcjtcbiAgICBpZiAoaWNlR2F0aGVyZXIpIHtcbiAgICAgIGRlbGV0ZSBpY2VHYXRoZXJlci5vbmxvY2FsY2FuZGlkYXRlO1xuICAgICAgZGVsZXRlIHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmljZUdhdGhlcmVyO1xuICAgIH1cbiAgICB2YXIgaWNlVHJhbnNwb3J0ID0gdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uaWNlVHJhbnNwb3J0O1xuICAgIGlmIChpY2VUcmFuc3BvcnQpIHtcbiAgICAgIGRlbGV0ZSBpY2VUcmFuc3BvcnQub25pY2VzdGF0ZWNoYW5nZTtcbiAgICAgIGRlbGV0ZSB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5pY2VUcmFuc3BvcnQ7XG4gICAgfVxuICAgIHZhciBkdGxzVHJhbnNwb3J0ID0gdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uZHRsc1RyYW5zcG9ydDtcbiAgICBpZiAoZHRsc1RyYW5zcG9ydCkge1xuICAgICAgZGVsZXRlIGR0bHNUcmFuc3BvcnQub25kdGxzc3RhdGVjaGFuZ2U7XG4gICAgICBkZWxldGUgZHRsc1RyYW5zcG9ydC5vbmVycm9yO1xuICAgICAgZGVsZXRlIHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmR0bHNUcmFuc3BvcnQ7XG4gICAgfVxuICB9O1xuXG4gIC8vIFN0YXJ0IHRoZSBSVFAgU2VuZGVyIGFuZCBSZWNlaXZlciBmb3IgYSB0cmFuc2NlaXZlci5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl90cmFuc2NlaXZlID0gZnVuY3Rpb24odHJhbnNjZWl2ZXIsXG4gICAgICBzZW5kLCByZWN2KSB7XG4gICAgdmFyIHBhcmFtcyA9IGdldENvbW1vbkNhcGFiaWxpdGllcyh0cmFuc2NlaXZlci5sb2NhbENhcGFiaWxpdGllcyxcbiAgICAgICAgdHJhbnNjZWl2ZXIucmVtb3RlQ2FwYWJpbGl0aWVzKTtcbiAgICBpZiAoc2VuZCAmJiB0cmFuc2NlaXZlci5ydHBTZW5kZXIpIHtcbiAgICAgIHBhcmFtcy5lbmNvZGluZ3MgPSB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzO1xuICAgICAgcGFyYW1zLnJ0Y3AgPSB7XG4gICAgICAgIGNuYW1lOiBTRFBVdGlscy5sb2NhbENOYW1lLFxuICAgICAgICBjb21wb3VuZDogdHJhbnNjZWl2ZXIucnRjcFBhcmFtZXRlcnMuY29tcG91bmRcbiAgICAgIH07XG4gICAgICBpZiAodHJhbnNjZWl2ZXIucmVjdkVuY29kaW5nUGFyYW1ldGVycy5sZW5ndGgpIHtcbiAgICAgICAgcGFyYW1zLnJ0Y3Auc3NyYyA9IHRyYW5zY2VpdmVyLnJlY3ZFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYztcbiAgICAgIH1cbiAgICAgIHRyYW5zY2VpdmVyLnJ0cFNlbmRlci5zZW5kKHBhcmFtcyk7XG4gICAgfVxuICAgIGlmIChyZWN2ICYmIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyICYmIHBhcmFtcy5jb2RlY3MubGVuZ3RoID4gMCkge1xuICAgICAgLy8gcmVtb3ZlIFJUWCBmaWVsZCBpbiBFZGdlIDE0OTQyXG4gICAgICBpZiAodHJhbnNjZWl2ZXIua2luZCA9PT0gJ3ZpZGVvJ1xuICAgICAgICAgICYmIHRyYW5zY2VpdmVyLnJlY3ZFbmNvZGluZ1BhcmFtZXRlcnNcbiAgICAgICAgICAmJiBlZGdlVmVyc2lvbiA8IDE1MDE5KSB7XG4gICAgICAgIHRyYW5zY2VpdmVyLnJlY3ZFbmNvZGluZ1BhcmFtZXRlcnMuZm9yRWFjaChmdW5jdGlvbihwKSB7XG4gICAgICAgICAgZGVsZXRlIHAucnR4O1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmICh0cmFuc2NlaXZlci5yZWN2RW5jb2RpbmdQYXJhbWV0ZXJzLmxlbmd0aCkge1xuICAgICAgICBwYXJhbXMuZW5jb2RpbmdzID0gdHJhbnNjZWl2ZXIucmVjdkVuY29kaW5nUGFyYW1ldGVycztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcmFtcy5lbmNvZGluZ3MgPSBbe31dO1xuICAgICAgfVxuICAgICAgcGFyYW1zLnJ0Y3AgPSB7XG4gICAgICAgIGNvbXBvdW5kOiB0cmFuc2NlaXZlci5ydGNwUGFyYW1ldGVycy5jb21wb3VuZFxuICAgICAgfTtcbiAgICAgIGlmICh0cmFuc2NlaXZlci5ydGNwUGFyYW1ldGVycy5jbmFtZSkge1xuICAgICAgICBwYXJhbXMucnRjcC5jbmFtZSA9IHRyYW5zY2VpdmVyLnJ0Y3BQYXJhbWV0ZXJzLmNuYW1lO1xuICAgICAgfVxuICAgICAgaWYgKHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnMubGVuZ3RoKSB7XG4gICAgICAgIHBhcmFtcy5ydGNwLnNzcmMgPSB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmM7XG4gICAgICB9XG4gICAgICB0cmFuc2NlaXZlci5ydHBSZWNlaXZlci5yZWNlaXZlKHBhcmFtcyk7XG4gICAgfVxuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5zZXRMb2NhbERlc2NyaXB0aW9uID0gZnVuY3Rpb24oZGVzY3JpcHRpb24pIHtcbiAgICB2YXIgcGMgPSB0aGlzO1xuXG4gICAgLy8gTm90ZTogcHJhbnN3ZXIgaXMgbm90IHN1cHBvcnRlZC5cbiAgICBpZiAoWydvZmZlcicsICdhbnN3ZXInXS5pbmRleE9mKGRlc2NyaXB0aW9uLnR5cGUpID09PSAtMSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG1ha2VFcnJvcignVHlwZUVycm9yJyxcbiAgICAgICAgICAnVW5zdXBwb3J0ZWQgdHlwZSBcIicgKyBkZXNjcmlwdGlvbi50eXBlICsgJ1wiJykpO1xuICAgIH1cblxuICAgIGlmICghaXNBY3Rpb25BbGxvd2VkSW5TaWduYWxpbmdTdGF0ZSgnc2V0TG9jYWxEZXNjcmlwdGlvbicsXG4gICAgICAgIGRlc2NyaXB0aW9uLnR5cGUsIHBjLnNpZ25hbGluZ1N0YXRlKSB8fCBwYy5faXNDbG9zZWQpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChtYWtlRXJyb3IoJ0ludmFsaWRTdGF0ZUVycm9yJyxcbiAgICAgICAgICAnQ2FuIG5vdCBzZXQgbG9jYWwgJyArIGRlc2NyaXB0aW9uLnR5cGUgK1xuICAgICAgICAgICcgaW4gc3RhdGUgJyArIHBjLnNpZ25hbGluZ1N0YXRlKSk7XG4gICAgfVxuXG4gICAgdmFyIHNlY3Rpb25zO1xuICAgIHZhciBzZXNzaW9ucGFydDtcbiAgICBpZiAoZGVzY3JpcHRpb24udHlwZSA9PT0gJ29mZmVyJykge1xuICAgICAgLy8gVkVSWSBsaW1pdGVkIHN1cHBvcnQgZm9yIFNEUCBtdW5naW5nLiBMaW1pdGVkIHRvOlxuICAgICAgLy8gKiBjaGFuZ2luZyB0aGUgb3JkZXIgb2YgY29kZWNzXG4gICAgICBzZWN0aW9ucyA9IFNEUFV0aWxzLnNwbGl0U2VjdGlvbnMoZGVzY3JpcHRpb24uc2RwKTtcbiAgICAgIHNlc3Npb25wYXJ0ID0gc2VjdGlvbnMuc2hpZnQoKTtcbiAgICAgIHNlY3Rpb25zLmZvckVhY2goZnVuY3Rpb24obWVkaWFTZWN0aW9uLCBzZHBNTGluZUluZGV4KSB7XG4gICAgICAgIHZhciBjYXBzID0gU0RQVXRpbHMucGFyc2VSdHBQYXJhbWV0ZXJzKG1lZGlhU2VjdGlvbik7XG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5sb2NhbENhcGFiaWxpdGllcyA9IGNhcHM7XG4gICAgICB9KTtcblxuICAgICAgcGMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIsIHNkcE1MaW5lSW5kZXgpIHtcbiAgICAgICAgcGMuX2dhdGhlcih0cmFuc2NlaXZlci5taWQsIHNkcE1MaW5lSW5kZXgpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChkZXNjcmlwdGlvbi50eXBlID09PSAnYW5zd2VyJykge1xuICAgICAgc2VjdGlvbnMgPSBTRFBVdGlscy5zcGxpdFNlY3Rpb25zKHBjLnJlbW90ZURlc2NyaXB0aW9uLnNkcCk7XG4gICAgICBzZXNzaW9ucGFydCA9IHNlY3Rpb25zLnNoaWZ0KCk7XG4gICAgICB2YXIgaXNJY2VMaXRlID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgoc2Vzc2lvbnBhcnQsXG4gICAgICAgICAgJ2E9aWNlLWxpdGUnKS5sZW5ndGggPiAwO1xuICAgICAgc2VjdGlvbnMuZm9yRWFjaChmdW5jdGlvbihtZWRpYVNlY3Rpb24sIHNkcE1MaW5lSW5kZXgpIHtcbiAgICAgICAgdmFyIHRyYW5zY2VpdmVyID0gcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdO1xuICAgICAgICB2YXIgaWNlR2F0aGVyZXIgPSB0cmFuc2NlaXZlci5pY2VHYXRoZXJlcjtcbiAgICAgICAgdmFyIGljZVRyYW5zcG9ydCA9IHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydDtcbiAgICAgICAgdmFyIGR0bHNUcmFuc3BvcnQgPSB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0O1xuICAgICAgICB2YXIgbG9jYWxDYXBhYmlsaXRpZXMgPSB0cmFuc2NlaXZlci5sb2NhbENhcGFiaWxpdGllcztcbiAgICAgICAgdmFyIHJlbW90ZUNhcGFiaWxpdGllcyA9IHRyYW5zY2VpdmVyLnJlbW90ZUNhcGFiaWxpdGllcztcblxuICAgICAgICAvLyB0cmVhdCBidW5kbGUtb25seSBhcyBub3QtcmVqZWN0ZWQuXG4gICAgICAgIHZhciByZWplY3RlZCA9IFNEUFV0aWxzLmlzUmVqZWN0ZWQobWVkaWFTZWN0aW9uKSAmJlxuICAgICAgICAgICAgU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1idW5kbGUtb25seScpLmxlbmd0aCA9PT0gMDtcblxuICAgICAgICBpZiAoIXJlamVjdGVkICYmICF0cmFuc2NlaXZlci5yZWplY3RlZCkge1xuICAgICAgICAgIHZhciByZW1vdGVJY2VQYXJhbWV0ZXJzID0gU0RQVXRpbHMuZ2V0SWNlUGFyYW1ldGVycyhcbiAgICAgICAgICAgICAgbWVkaWFTZWN0aW9uLCBzZXNzaW9ucGFydCk7XG4gICAgICAgICAgdmFyIHJlbW90ZUR0bHNQYXJhbWV0ZXJzID0gU0RQVXRpbHMuZ2V0RHRsc1BhcmFtZXRlcnMoXG4gICAgICAgICAgICAgIG1lZGlhU2VjdGlvbiwgc2Vzc2lvbnBhcnQpO1xuICAgICAgICAgIGlmIChpc0ljZUxpdGUpIHtcbiAgICAgICAgICAgIHJlbW90ZUR0bHNQYXJhbWV0ZXJzLnJvbGUgPSAnc2VydmVyJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIXBjLnVzaW5nQnVuZGxlIHx8IHNkcE1MaW5lSW5kZXggPT09IDApIHtcbiAgICAgICAgICAgIHBjLl9nYXRoZXIodHJhbnNjZWl2ZXIubWlkLCBzZHBNTGluZUluZGV4KTtcbiAgICAgICAgICAgIGlmIChpY2VUcmFuc3BvcnQuc3RhdGUgPT09ICduZXcnKSB7XG4gICAgICAgICAgICAgIGljZVRyYW5zcG9ydC5zdGFydChpY2VHYXRoZXJlciwgcmVtb3RlSWNlUGFyYW1ldGVycyxcbiAgICAgICAgICAgICAgICAgIGlzSWNlTGl0ZSA/ICdjb250cm9sbGluZycgOiAnY29udHJvbGxlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGR0bHNUcmFuc3BvcnQuc3RhdGUgPT09ICduZXcnKSB7XG4gICAgICAgICAgICAgIGR0bHNUcmFuc3BvcnQuc3RhcnQocmVtb3RlRHRsc1BhcmFtZXRlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIENhbGN1bGF0ZSBpbnRlcnNlY3Rpb24gb2YgY2FwYWJpbGl0aWVzLlxuICAgICAgICAgIHZhciBwYXJhbXMgPSBnZXRDb21tb25DYXBhYmlsaXRpZXMobG9jYWxDYXBhYmlsaXRpZXMsXG4gICAgICAgICAgICAgIHJlbW90ZUNhcGFiaWxpdGllcyk7XG5cbiAgICAgICAgICAvLyBTdGFydCB0aGUgUlRDUnRwU2VuZGVyLiBUaGUgUlRDUnRwUmVjZWl2ZXIgZm9yIHRoaXNcbiAgICAgICAgICAvLyB0cmFuc2NlaXZlciBoYXMgYWxyZWFkeSBiZWVuIHN0YXJ0ZWQgaW4gc2V0UmVtb3RlRGVzY3JpcHRpb24uXG4gICAgICAgICAgcGMuX3RyYW5zY2VpdmUodHJhbnNjZWl2ZXIsXG4gICAgICAgICAgICAgIHBhcmFtcy5jb2RlY3MubGVuZ3RoID4gMCxcbiAgICAgICAgICAgICAgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBwYy5sb2NhbERlc2NyaXB0aW9uID0ge1xuICAgICAgdHlwZTogZGVzY3JpcHRpb24udHlwZSxcbiAgICAgIHNkcDogZGVzY3JpcHRpb24uc2RwXG4gICAgfTtcbiAgICBpZiAoZGVzY3JpcHRpb24udHlwZSA9PT0gJ29mZmVyJykge1xuICAgICAgcGMuX3VwZGF0ZVNpZ25hbGluZ1N0YXRlKCdoYXZlLWxvY2FsLW9mZmVyJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBjLl91cGRhdGVTaWduYWxpbmdTdGF0ZSgnc3RhYmxlJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5zZXRSZW1vdGVEZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKGRlc2NyaXB0aW9uKSB7XG4gICAgdmFyIHBjID0gdGhpcztcblxuICAgIC8vIE5vdGU6IHByYW5zd2VyIGlzIG5vdCBzdXBwb3J0ZWQuXG4gICAgaWYgKFsnb2ZmZXInLCAnYW5zd2VyJ10uaW5kZXhPZihkZXNjcmlwdGlvbi50eXBlKSA9PT0gLTEpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChtYWtlRXJyb3IoJ1R5cGVFcnJvcicsXG4gICAgICAgICAgJ1Vuc3VwcG9ydGVkIHR5cGUgXCInICsgZGVzY3JpcHRpb24udHlwZSArICdcIicpKTtcbiAgICB9XG5cbiAgICBpZiAoIWlzQWN0aW9uQWxsb3dlZEluU2lnbmFsaW5nU3RhdGUoJ3NldFJlbW90ZURlc2NyaXB0aW9uJyxcbiAgICAgICAgZGVzY3JpcHRpb24udHlwZSwgcGMuc2lnbmFsaW5nU3RhdGUpIHx8IHBjLl9pc0Nsb3NlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG1ha2VFcnJvcignSW52YWxpZFN0YXRlRXJyb3InLFxuICAgICAgICAgICdDYW4gbm90IHNldCByZW1vdGUgJyArIGRlc2NyaXB0aW9uLnR5cGUgK1xuICAgICAgICAgICcgaW4gc3RhdGUgJyArIHBjLnNpZ25hbGluZ1N0YXRlKSk7XG4gICAgfVxuXG4gICAgdmFyIHN0cmVhbXMgPSB7fTtcbiAgICBwYy5yZW1vdGVTdHJlYW1zLmZvckVhY2goZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICBzdHJlYW1zW3N0cmVhbS5pZF0gPSBzdHJlYW07XG4gICAgfSk7XG4gICAgdmFyIHJlY2VpdmVyTGlzdCA9IFtdO1xuICAgIHZhciBzZWN0aW9ucyA9IFNEUFV0aWxzLnNwbGl0U2VjdGlvbnMoZGVzY3JpcHRpb24uc2RwKTtcbiAgICB2YXIgc2Vzc2lvbnBhcnQgPSBzZWN0aW9ucy5zaGlmdCgpO1xuICAgIHZhciBpc0ljZUxpdGUgPSBTRFBVdGlscy5tYXRjaFByZWZpeChzZXNzaW9ucGFydCxcbiAgICAgICAgJ2E9aWNlLWxpdGUnKS5sZW5ndGggPiAwO1xuICAgIHZhciB1c2luZ0J1bmRsZSA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KHNlc3Npb25wYXJ0LFxuICAgICAgICAnYT1ncm91cDpCVU5ETEUgJykubGVuZ3RoID4gMDtcbiAgICBwYy51c2luZ0J1bmRsZSA9IHVzaW5nQnVuZGxlO1xuICAgIHZhciBpY2VPcHRpb25zID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgoc2Vzc2lvbnBhcnQsXG4gICAgICAgICdhPWljZS1vcHRpb25zOicpWzBdO1xuICAgIGlmIChpY2VPcHRpb25zKSB7XG4gICAgICBwYy5jYW5Ucmlja2xlSWNlQ2FuZGlkYXRlcyA9IGljZU9wdGlvbnMuc3Vic3RyKDE0KS5zcGxpdCgnICcpXG4gICAgICAgICAgLmluZGV4T2YoJ3RyaWNrbGUnKSA+PSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYy5jYW5Ucmlja2xlSWNlQ2FuZGlkYXRlcyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHNlY3Rpb25zLmZvckVhY2goZnVuY3Rpb24obWVkaWFTZWN0aW9uLCBzZHBNTGluZUluZGV4KSB7XG4gICAgICB2YXIgbGluZXMgPSBTRFBVdGlscy5zcGxpdExpbmVzKG1lZGlhU2VjdGlvbik7XG4gICAgICB2YXIga2luZCA9IFNEUFV0aWxzLmdldEtpbmQobWVkaWFTZWN0aW9uKTtcbiAgICAgIC8vIHRyZWF0IGJ1bmRsZS1vbmx5IGFzIG5vdC1yZWplY3RlZC5cbiAgICAgIHZhciByZWplY3RlZCA9IFNEUFV0aWxzLmlzUmVqZWN0ZWQobWVkaWFTZWN0aW9uKSAmJlxuICAgICAgICAgIFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9YnVuZGxlLW9ubHknKS5sZW5ndGggPT09IDA7XG4gICAgICB2YXIgcHJvdG9jb2wgPSBsaW5lc1swXS5zdWJzdHIoMikuc3BsaXQoJyAnKVsyXTtcblxuICAgICAgdmFyIGRpcmVjdGlvbiA9IFNEUFV0aWxzLmdldERpcmVjdGlvbihtZWRpYVNlY3Rpb24sIHNlc3Npb25wYXJ0KTtcbiAgICAgIHZhciByZW1vdGVNc2lkID0gU0RQVXRpbHMucGFyc2VNc2lkKG1lZGlhU2VjdGlvbik7XG5cbiAgICAgIHZhciBtaWQgPSBTRFBVdGlscy5nZXRNaWQobWVkaWFTZWN0aW9uKSB8fCBTRFBVdGlscy5nZW5lcmF0ZUlkZW50aWZpZXIoKTtcblxuICAgICAgLy8gUmVqZWN0IGRhdGFjaGFubmVscyB3aGljaCBhcmUgbm90IGltcGxlbWVudGVkIHlldC5cbiAgICAgIGlmICgoa2luZCA9PT0gJ2FwcGxpY2F0aW9uJyAmJiBwcm90b2NvbCA9PT0gJ0RUTFMvU0NUUCcpIHx8IHJlamVjdGVkKSB7XG4gICAgICAgIC8vIFRPRE86IHRoaXMgaXMgZGFuZ2Vyb3VzIGluIHRoZSBjYXNlIHdoZXJlIGEgbm9uLXJlamVjdGVkIG0tbGluZVxuICAgICAgICAvLyAgICAgYmVjb21lcyByZWplY3RlZC5cbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdID0ge1xuICAgICAgICAgIG1pZDogbWlkLFxuICAgICAgICAgIGtpbmQ6IGtpbmQsXG4gICAgICAgICAgcmVqZWN0ZWQ6IHRydWVcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXJlamVjdGVkICYmIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XSAmJlxuICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5yZWplY3RlZCkge1xuICAgICAgICAvLyByZWN5Y2xlIGEgcmVqZWN0ZWQgdHJhbnNjZWl2ZXIuXG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XSA9IHBjLl9jcmVhdGVUcmFuc2NlaXZlcihraW5kLCB0cnVlKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHRyYW5zY2VpdmVyO1xuICAgICAgdmFyIGljZUdhdGhlcmVyO1xuICAgICAgdmFyIGljZVRyYW5zcG9ydDtcbiAgICAgIHZhciBkdGxzVHJhbnNwb3J0O1xuICAgICAgdmFyIHJ0cFJlY2VpdmVyO1xuICAgICAgdmFyIHNlbmRFbmNvZGluZ1BhcmFtZXRlcnM7XG4gICAgICB2YXIgcmVjdkVuY29kaW5nUGFyYW1ldGVycztcbiAgICAgIHZhciBsb2NhbENhcGFiaWxpdGllcztcblxuICAgICAgdmFyIHRyYWNrO1xuICAgICAgLy8gRklYTUU6IGVuc3VyZSB0aGUgbWVkaWFTZWN0aW9uIGhhcyBydGNwLW11eCBzZXQuXG4gICAgICB2YXIgcmVtb3RlQ2FwYWJpbGl0aWVzID0gU0RQVXRpbHMucGFyc2VSdHBQYXJhbWV0ZXJzKG1lZGlhU2VjdGlvbik7XG4gICAgICB2YXIgcmVtb3RlSWNlUGFyYW1ldGVycztcbiAgICAgIHZhciByZW1vdGVEdGxzUGFyYW1ldGVycztcbiAgICAgIGlmICghcmVqZWN0ZWQpIHtcbiAgICAgICAgcmVtb3RlSWNlUGFyYW1ldGVycyA9IFNEUFV0aWxzLmdldEljZVBhcmFtZXRlcnMobWVkaWFTZWN0aW9uLFxuICAgICAgICAgICAgc2Vzc2lvbnBhcnQpO1xuICAgICAgICByZW1vdGVEdGxzUGFyYW1ldGVycyA9IFNEUFV0aWxzLmdldER0bHNQYXJhbWV0ZXJzKG1lZGlhU2VjdGlvbixcbiAgICAgICAgICAgIHNlc3Npb25wYXJ0KTtcbiAgICAgICAgcmVtb3RlRHRsc1BhcmFtZXRlcnMucm9sZSA9ICdjbGllbnQnO1xuICAgICAgfVxuICAgICAgcmVjdkVuY29kaW5nUGFyYW1ldGVycyA9XG4gICAgICAgICAgU0RQVXRpbHMucGFyc2VSdHBFbmNvZGluZ1BhcmFtZXRlcnMobWVkaWFTZWN0aW9uKTtcblxuICAgICAgdmFyIHJ0Y3BQYXJhbWV0ZXJzID0gU0RQVXRpbHMucGFyc2VSdGNwUGFyYW1ldGVycyhtZWRpYVNlY3Rpb24pO1xuXG4gICAgICB2YXIgaXNDb21wbGV0ZSA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbixcbiAgICAgICAgICAnYT1lbmQtb2YtY2FuZGlkYXRlcycsIHNlc3Npb25wYXJ0KS5sZW5ndGggPiAwO1xuICAgICAgdmFyIGNhbmRzID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1jYW5kaWRhdGU6JylcbiAgICAgICAgICAubWFwKGZ1bmN0aW9uKGNhbmQpIHtcbiAgICAgICAgICAgIHJldHVybiBTRFBVdGlscy5wYXJzZUNhbmRpZGF0ZShjYW5kKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24oY2FuZCkge1xuICAgICAgICAgICAgcmV0dXJuIGNhbmQuY29tcG9uZW50ID09PSAxO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAvLyBDaGVjayBpZiB3ZSBjYW4gdXNlIEJVTkRMRSBhbmQgZGlzcG9zZSB0cmFuc3BvcnRzLlxuICAgICAgaWYgKChkZXNjcmlwdGlvbi50eXBlID09PSAnb2ZmZXInIHx8IGRlc2NyaXB0aW9uLnR5cGUgPT09ICdhbnN3ZXInKSAmJlxuICAgICAgICAgICFyZWplY3RlZCAmJiB1c2luZ0J1bmRsZSAmJiBzZHBNTGluZUluZGV4ID4gMCAmJlxuICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XSkge1xuICAgICAgICBwYy5fZGlzcG9zZUljZUFuZER0bHNUcmFuc3BvcnRzKHNkcE1MaW5lSW5kZXgpO1xuICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uaWNlR2F0aGVyZXIgPVxuICAgICAgICAgICAgcGMudHJhbnNjZWl2ZXJzWzBdLmljZUdhdGhlcmVyO1xuICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uaWNlVHJhbnNwb3J0ID1cbiAgICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1swXS5pY2VUcmFuc3BvcnQ7XG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5kdGxzVHJhbnNwb3J0ID1cbiAgICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1swXS5kdGxzVHJhbnNwb3J0O1xuICAgICAgICBpZiAocGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLnJ0cFNlbmRlcikge1xuICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5ydHBTZW5kZXIuc2V0VHJhbnNwb3J0KFxuICAgICAgICAgICAgICBwYy50cmFuc2NlaXZlcnNbMF0uZHRsc1RyYW5zcG9ydCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5ydHBSZWNlaXZlcikge1xuICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5ydHBSZWNlaXZlci5zZXRUcmFuc3BvcnQoXG4gICAgICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1swXS5kdGxzVHJhbnNwb3J0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGRlc2NyaXB0aW9uLnR5cGUgPT09ICdvZmZlcicgJiYgIXJlamVjdGVkKSB7XG4gICAgICAgIHRyYW5zY2VpdmVyID0gcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdIHx8XG4gICAgICAgICAgICBwYy5fY3JlYXRlVHJhbnNjZWl2ZXIoa2luZCk7XG4gICAgICAgIHRyYW5zY2VpdmVyLm1pZCA9IG1pZDtcblxuICAgICAgICBpZiAoIXRyYW5zY2VpdmVyLmljZUdhdGhlcmVyKSB7XG4gICAgICAgICAgdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIgPSBwYy5fY3JlYXRlSWNlR2F0aGVyZXIoc2RwTUxpbmVJbmRleCxcbiAgICAgICAgICAgICAgdXNpbmdCdW5kbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNhbmRzLmxlbmd0aCAmJiB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQuc3RhdGUgPT09ICduZXcnKSB7XG4gICAgICAgICAgaWYgKGlzQ29tcGxldGUgJiYgKCF1c2luZ0J1bmRsZSB8fCBzZHBNTGluZUluZGV4ID09PSAwKSkge1xuICAgICAgICAgICAgdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LnNldFJlbW90ZUNhbmRpZGF0ZXMoY2FuZHMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYW5kcy5mb3JFYWNoKGZ1bmN0aW9uKGNhbmRpZGF0ZSkge1xuICAgICAgICAgICAgICBtYXliZUFkZENhbmRpZGF0ZSh0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQsIGNhbmRpZGF0ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsb2NhbENhcGFiaWxpdGllcyA9IHdpbmRvdy5SVENSdHBSZWNlaXZlci5nZXRDYXBhYmlsaXRpZXMoa2luZCk7XG5cbiAgICAgICAgLy8gZmlsdGVyIFJUWCB1bnRpbCBhZGRpdGlvbmFsIHN0dWZmIG5lZWRlZCBmb3IgUlRYIGlzIGltcGxlbWVudGVkXG4gICAgICAgIC8vIGluIGFkYXB0ZXIuanNcbiAgICAgICAgaWYgKGVkZ2VWZXJzaW9uIDwgMTUwMTkpIHtcbiAgICAgICAgICBsb2NhbENhcGFiaWxpdGllcy5jb2RlY3MgPSBsb2NhbENhcGFiaWxpdGllcy5jb2RlY3MuZmlsdGVyKFxuICAgICAgICAgICAgICBmdW5jdGlvbihjb2RlYykge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb2RlYy5uYW1lICE9PSAncnR4JztcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzID0gdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVycyB8fCBbe1xuICAgICAgICAgIHNzcmM6ICgyICogc2RwTUxpbmVJbmRleCArIDIpICogMTAwMVxuICAgICAgICB9XTtcblxuICAgICAgICAvLyBUT0RPOiByZXdyaXRlIHRvIHVzZSBodHRwOi8vdzNjLmdpdGh1Yi5pby93ZWJydGMtcGMvI3NldC1hc3NvY2lhdGVkLXJlbW90ZS1zdHJlYW1zXG4gICAgICAgIHZhciBpc05ld1RyYWNrID0gZmFsc2U7XG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdzZW5kcmVjdicgfHwgZGlyZWN0aW9uID09PSAnc2VuZG9ubHknKSB7XG4gICAgICAgICAgaXNOZXdUcmFjayA9ICF0cmFuc2NlaXZlci5ydHBSZWNlaXZlcjtcbiAgICAgICAgICBydHBSZWNlaXZlciA9IHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyIHx8XG4gICAgICAgICAgICAgIG5ldyB3aW5kb3cuUlRDUnRwUmVjZWl2ZXIodHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydCwga2luZCk7XG5cbiAgICAgICAgICBpZiAoaXNOZXdUcmFjaykge1xuICAgICAgICAgICAgdmFyIHN0cmVhbTtcbiAgICAgICAgICAgIHRyYWNrID0gcnRwUmVjZWl2ZXIudHJhY2s7XG4gICAgICAgICAgICAvLyBGSVhNRTogZG9lcyBub3Qgd29yayB3aXRoIFBsYW4gQi5cbiAgICAgICAgICAgIGlmIChyZW1vdGVNc2lkICYmIHJlbW90ZU1zaWQuc3RyZWFtID09PSAnLScpIHtcbiAgICAgICAgICAgICAgLy8gbm8tb3AuIGEgc3RyZWFtIGlkIG9mICctJyBtZWFuczogbm8gYXNzb2NpYXRlZCBzdHJlYW0uXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlbW90ZU1zaWQpIHtcbiAgICAgICAgICAgICAgaWYgKCFzdHJlYW1zW3JlbW90ZU1zaWQuc3RyZWFtXSkge1xuICAgICAgICAgICAgICAgIHN0cmVhbXNbcmVtb3RlTXNpZC5zdHJlYW1dID0gbmV3IHdpbmRvdy5NZWRpYVN0cmVhbSgpO1xuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzdHJlYW1zW3JlbW90ZU1zaWQuc3RyZWFtXSwgJ2lkJywge1xuICAgICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlbW90ZU1zaWQuc3RyZWFtO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0cmFjaywgJ2lkJywge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gcmVtb3RlTXNpZC50cmFjaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBzdHJlYW0gPSBzdHJlYW1zW3JlbW90ZU1zaWQuc3RyZWFtXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmICghc3RyZWFtcy5kZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgc3RyZWFtcy5kZWZhdWx0ID0gbmV3IHdpbmRvdy5NZWRpYVN0cmVhbSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHN0cmVhbSA9IHN0cmVhbXMuZGVmYXVsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzdHJlYW0pIHtcbiAgICAgICAgICAgICAgYWRkVHJhY2tUb1N0cmVhbUFuZEZpcmVFdmVudCh0cmFjaywgc3RyZWFtKTtcbiAgICAgICAgICAgICAgdHJhbnNjZWl2ZXIuYXNzb2NpYXRlZFJlbW90ZU1lZGlhU3RyZWFtcy5wdXNoKHN0cmVhbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZWNlaXZlckxpc3QucHVzaChbdHJhY2ssIHJ0cFJlY2VpdmVyLCBzdHJlYW1dKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIgJiYgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIudHJhY2spIHtcbiAgICAgICAgICB0cmFuc2NlaXZlci5hc3NvY2lhdGVkUmVtb3RlTWVkaWFTdHJlYW1zLmZvckVhY2goZnVuY3Rpb24ocykge1xuICAgICAgICAgICAgdmFyIG5hdGl2ZVRyYWNrID0gcy5nZXRUcmFja3MoKS5maW5kKGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHQuaWQgPT09IHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyLnRyYWNrLmlkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAobmF0aXZlVHJhY2spIHtcbiAgICAgICAgICAgICAgcmVtb3ZlVHJhY2tGcm9tU3RyZWFtQW5kRmlyZUV2ZW50KG5hdGl2ZVRyYWNrLCBzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0cmFuc2NlaXZlci5hc3NvY2lhdGVkUmVtb3RlTWVkaWFTdHJlYW1zID0gW107XG4gICAgICAgIH1cblxuICAgICAgICB0cmFuc2NlaXZlci5sb2NhbENhcGFiaWxpdGllcyA9IGxvY2FsQ2FwYWJpbGl0aWVzO1xuICAgICAgICB0cmFuc2NlaXZlci5yZW1vdGVDYXBhYmlsaXRpZXMgPSByZW1vdGVDYXBhYmlsaXRpZXM7XG4gICAgICAgIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyID0gcnRwUmVjZWl2ZXI7XG4gICAgICAgIHRyYW5zY2VpdmVyLnJ0Y3BQYXJhbWV0ZXJzID0gcnRjcFBhcmFtZXRlcnM7XG4gICAgICAgIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnMgPSBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzO1xuICAgICAgICB0cmFuc2NlaXZlci5yZWN2RW5jb2RpbmdQYXJhbWV0ZXJzID0gcmVjdkVuY29kaW5nUGFyYW1ldGVycztcblxuICAgICAgICAvLyBTdGFydCB0aGUgUlRDUnRwUmVjZWl2ZXIgbm93LiBUaGUgUlRQU2VuZGVyIGlzIHN0YXJ0ZWQgaW5cbiAgICAgICAgLy8gc2V0TG9jYWxEZXNjcmlwdGlvbi5cbiAgICAgICAgcGMuX3RyYW5zY2VpdmUocGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLFxuICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICBpc05ld1RyYWNrKTtcbiAgICAgIH0gZWxzZSBpZiAoZGVzY3JpcHRpb24udHlwZSA9PT0gJ2Fuc3dlcicgJiYgIXJlamVjdGVkKSB7XG4gICAgICAgIHRyYW5zY2VpdmVyID0gcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdO1xuICAgICAgICBpY2VHYXRoZXJlciA9IHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyO1xuICAgICAgICBpY2VUcmFuc3BvcnQgPSB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQ7XG4gICAgICAgIGR0bHNUcmFuc3BvcnQgPSB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0O1xuICAgICAgICBydHBSZWNlaXZlciA9IHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyO1xuICAgICAgICBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzID0gdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVycztcbiAgICAgICAgbG9jYWxDYXBhYmlsaXRpZXMgPSB0cmFuc2NlaXZlci5sb2NhbENhcGFiaWxpdGllcztcblxuICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0ucmVjdkVuY29kaW5nUGFyYW1ldGVycyA9XG4gICAgICAgICAgICByZWN2RW5jb2RpbmdQYXJhbWV0ZXJzO1xuICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0ucmVtb3RlQ2FwYWJpbGl0aWVzID1cbiAgICAgICAgICAgIHJlbW90ZUNhcGFiaWxpdGllcztcbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLnJ0Y3BQYXJhbWV0ZXJzID0gcnRjcFBhcmFtZXRlcnM7XG5cbiAgICAgICAgaWYgKGNhbmRzLmxlbmd0aCAmJiBpY2VUcmFuc3BvcnQuc3RhdGUgPT09ICduZXcnKSB7XG4gICAgICAgICAgaWYgKChpc0ljZUxpdGUgfHwgaXNDb21wbGV0ZSkgJiZcbiAgICAgICAgICAgICAgKCF1c2luZ0J1bmRsZSB8fCBzZHBNTGluZUluZGV4ID09PSAwKSkge1xuICAgICAgICAgICAgaWNlVHJhbnNwb3J0LnNldFJlbW90ZUNhbmRpZGF0ZXMoY2FuZHMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYW5kcy5mb3JFYWNoKGZ1bmN0aW9uKGNhbmRpZGF0ZSkge1xuICAgICAgICAgICAgICBtYXliZUFkZENhbmRpZGF0ZSh0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQsIGNhbmRpZGF0ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXVzaW5nQnVuZGxlIHx8IHNkcE1MaW5lSW5kZXggPT09IDApIHtcbiAgICAgICAgICBpZiAoaWNlVHJhbnNwb3J0LnN0YXRlID09PSAnbmV3Jykge1xuICAgICAgICAgICAgaWNlVHJhbnNwb3J0LnN0YXJ0KGljZUdhdGhlcmVyLCByZW1vdGVJY2VQYXJhbWV0ZXJzLFxuICAgICAgICAgICAgICAgICdjb250cm9sbGluZycpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZHRsc1RyYW5zcG9ydC5zdGF0ZSA9PT0gJ25ldycpIHtcbiAgICAgICAgICAgIGR0bHNUcmFuc3BvcnQuc3RhcnQocmVtb3RlRHRsc1BhcmFtZXRlcnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHBjLl90cmFuc2NlaXZlKHRyYW5zY2VpdmVyLFxuICAgICAgICAgICAgZGlyZWN0aW9uID09PSAnc2VuZHJlY3YnIHx8IGRpcmVjdGlvbiA9PT0gJ3JlY3Zvbmx5JyxcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9PT0gJ3NlbmRyZWN2JyB8fCBkaXJlY3Rpb24gPT09ICdzZW5kb25seScpO1xuXG4gICAgICAgIC8vIFRPRE86IHJld3JpdGUgdG8gdXNlIGh0dHA6Ly93M2MuZ2l0aHViLmlvL3dlYnJ0Yy1wYy8jc2V0LWFzc29jaWF0ZWQtcmVtb3RlLXN0cmVhbXNcbiAgICAgICAgaWYgKHJ0cFJlY2VpdmVyICYmXG4gICAgICAgICAgICAoZGlyZWN0aW9uID09PSAnc2VuZHJlY3YnIHx8IGRpcmVjdGlvbiA9PT0gJ3NlbmRvbmx5JykpIHtcbiAgICAgICAgICB0cmFjayA9IHJ0cFJlY2VpdmVyLnRyYWNrO1xuICAgICAgICAgIGlmIChyZW1vdGVNc2lkKSB7XG4gICAgICAgICAgICBpZiAoIXN0cmVhbXNbcmVtb3RlTXNpZC5zdHJlYW1dKSB7XG4gICAgICAgICAgICAgIHN0cmVhbXNbcmVtb3RlTXNpZC5zdHJlYW1dID0gbmV3IHdpbmRvdy5NZWRpYVN0cmVhbSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWRkVHJhY2tUb1N0cmVhbUFuZEZpcmVFdmVudCh0cmFjaywgc3RyZWFtc1tyZW1vdGVNc2lkLnN0cmVhbV0pO1xuICAgICAgICAgICAgcmVjZWl2ZXJMaXN0LnB1c2goW3RyYWNrLCBydHBSZWNlaXZlciwgc3RyZWFtc1tyZW1vdGVNc2lkLnN0cmVhbV1dKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFzdHJlYW1zLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICAgc3RyZWFtcy5kZWZhdWx0ID0gbmV3IHdpbmRvdy5NZWRpYVN0cmVhbSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWRkVHJhY2tUb1N0cmVhbUFuZEZpcmVFdmVudCh0cmFjaywgc3RyZWFtcy5kZWZhdWx0KTtcbiAgICAgICAgICAgIHJlY2VpdmVyTGlzdC5wdXNoKFt0cmFjaywgcnRwUmVjZWl2ZXIsIHN0cmVhbXMuZGVmYXVsdF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBGSVhNRTogYWN0dWFsbHkgdGhlIHJlY2VpdmVyIHNob3VsZCBiZSBjcmVhdGVkIGxhdGVyLlxuICAgICAgICAgIGRlbGV0ZSB0cmFuc2NlaXZlci5ydHBSZWNlaXZlcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHBjLl9kdGxzUm9sZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBwYy5fZHRsc1JvbGUgPSBkZXNjcmlwdGlvbi50eXBlID09PSAnb2ZmZXInID8gJ2FjdGl2ZScgOiAncGFzc2l2ZSc7XG4gICAgfVxuXG4gICAgcGMucmVtb3RlRGVzY3JpcHRpb24gPSB7XG4gICAgICB0eXBlOiBkZXNjcmlwdGlvbi50eXBlLFxuICAgICAgc2RwOiBkZXNjcmlwdGlvbi5zZHBcbiAgICB9O1xuICAgIGlmIChkZXNjcmlwdGlvbi50eXBlID09PSAnb2ZmZXInKSB7XG4gICAgICBwYy5fdXBkYXRlU2lnbmFsaW5nU3RhdGUoJ2hhdmUtcmVtb3RlLW9mZmVyJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBjLl91cGRhdGVTaWduYWxpbmdTdGF0ZSgnc3RhYmxlJyk7XG4gICAgfVxuICAgIE9iamVjdC5rZXlzKHN0cmVhbXMpLmZvckVhY2goZnVuY3Rpb24oc2lkKSB7XG4gICAgICB2YXIgc3RyZWFtID0gc3RyZWFtc1tzaWRdO1xuICAgICAgaWYgKHN0cmVhbS5nZXRUcmFja3MoKS5sZW5ndGgpIHtcbiAgICAgICAgaWYgKHBjLnJlbW90ZVN0cmVhbXMuaW5kZXhPZihzdHJlYW0pID09PSAtMSkge1xuICAgICAgICAgIHBjLnJlbW90ZVN0cmVhbXMucHVzaChzdHJlYW0pO1xuICAgICAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgnYWRkc3RyZWFtJyk7XG4gICAgICAgICAgZXZlbnQuc3RyZWFtID0gc3RyZWFtO1xuICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcGMuX2Rpc3BhdGNoRXZlbnQoJ2FkZHN0cmVhbScsIGV2ZW50KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlY2VpdmVyTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICB2YXIgdHJhY2sgPSBpdGVtWzBdO1xuICAgICAgICAgIHZhciByZWNlaXZlciA9IGl0ZW1bMV07XG4gICAgICAgICAgaWYgKHN0cmVhbS5pZCAhPT0gaXRlbVsyXS5pZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBmaXJlQWRkVHJhY2socGMsIHRyYWNrLCByZWNlaXZlciwgW3N0cmVhbV0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZWNlaXZlckxpc3QuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBmaXJlQWRkVHJhY2socGMsIGl0ZW1bMF0sIGl0ZW1bMV0sIFtdKTtcbiAgICB9KTtcblxuICAgIC8vIGNoZWNrIHdoZXRoZXIgYWRkSWNlQ2FuZGlkYXRlKHt9KSB3YXMgY2FsbGVkIHdpdGhpbiBmb3VyIHNlY29uZHMgYWZ0ZXJcbiAgICAvLyBzZXRSZW1vdGVEZXNjcmlwdGlvbi5cbiAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIGlmICghKHBjICYmIHBjLnRyYW5zY2VpdmVycykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgcGMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcbiAgICAgICAgaWYgKHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydCAmJlxuICAgICAgICAgICAgdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LnN0YXRlID09PSAnbmV3JyAmJlxuICAgICAgICAgICAgdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LmdldFJlbW90ZUNhbmRpZGF0ZXMoKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdUaW1lb3V0IGZvciBhZGRSZW1vdGVDYW5kaWRhdGUuIENvbnNpZGVyIHNlbmRpbmcgJyArXG4gICAgICAgICAgICAgICdhbiBlbmQtb2YtY2FuZGlkYXRlcyBub3RpZmljYXRpb24nKTtcbiAgICAgICAgICB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQuYWRkUmVtb3RlQ2FuZGlkYXRlKHt9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgNDAwMCk7XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xuICAgICAgLyogbm90IHlldFxuICAgICAgaWYgKHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyKSB7XG4gICAgICAgIHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyLmNsb3NlKCk7XG4gICAgICB9XG4gICAgICAqL1xuICAgICAgaWYgKHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydCkge1xuICAgICAgICB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQuc3RvcCgpO1xuICAgICAgfVxuICAgICAgaWYgKHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQpIHtcbiAgICAgICAgdHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydC5zdG9wKCk7XG4gICAgICB9XG4gICAgICBpZiAodHJhbnNjZWl2ZXIucnRwU2VuZGVyKSB7XG4gICAgICAgIHRyYW5zY2VpdmVyLnJ0cFNlbmRlci5zdG9wKCk7XG4gICAgICB9XG4gICAgICBpZiAodHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIpIHtcbiAgICAgICAgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIuc3RvcCgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIC8vIEZJWE1FOiBjbGVhbiB1cCB0cmFja3MsIGxvY2FsIHN0cmVhbXMsIHJlbW90ZSBzdHJlYW1zLCBldGNcbiAgICB0aGlzLl9pc0Nsb3NlZCA9IHRydWU7XG4gICAgdGhpcy5fdXBkYXRlU2lnbmFsaW5nU3RhdGUoJ2Nsb3NlZCcpO1xuICB9O1xuXG4gIC8vIFVwZGF0ZSB0aGUgc2lnbmFsaW5nIHN0YXRlLlxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX3VwZGF0ZVNpZ25hbGluZ1N0YXRlID0gZnVuY3Rpb24obmV3U3RhdGUpIHtcbiAgICB0aGlzLnNpZ25hbGluZ1N0YXRlID0gbmV3U3RhdGU7XG4gICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdzaWduYWxpbmdzdGF0ZWNoYW5nZScpO1xuICAgIHRoaXMuX2Rpc3BhdGNoRXZlbnQoJ3NpZ25hbGluZ3N0YXRlY2hhbmdlJywgZXZlbnQpO1xuICB9O1xuXG4gIC8vIERldGVybWluZSB3aGV0aGVyIHRvIGZpcmUgdGhlIG5lZ290aWF0aW9ubmVlZGVkIGV2ZW50LlxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX21heWJlRmlyZU5lZ290aWF0aW9uTmVlZGVkID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHBjID0gdGhpcztcbiAgICBpZiAodGhpcy5zaWduYWxpbmdTdGF0ZSAhPT0gJ3N0YWJsZScgfHwgdGhpcy5uZWVkTmVnb3RpYXRpb24gPT09IHRydWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5uZWVkTmVnb3RpYXRpb24gPSB0cnVlO1xuICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHBjLm5lZWROZWdvdGlhdGlvbikge1xuICAgICAgICBwYy5uZWVkTmVnb3RpYXRpb24gPSBmYWxzZTtcbiAgICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCduZWdvdGlhdGlvbm5lZWRlZCcpO1xuICAgICAgICBwYy5fZGlzcGF0Y2hFdmVudCgnbmVnb3RpYXRpb25uZWVkZWQnLCBldmVudCk7XG4gICAgICB9XG4gICAgfSwgMCk7XG4gIH07XG5cbiAgLy8gVXBkYXRlIHRoZSBpY2UgY29ubmVjdGlvbiBzdGF0ZS5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl91cGRhdGVJY2VDb25uZWN0aW9uU3RhdGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgbmV3U3RhdGU7XG4gICAgdmFyIHN0YXRlcyA9IHtcbiAgICAgICduZXcnOiAwLFxuICAgICAgY2xvc2VkOiAwLFxuICAgICAgY2hlY2tpbmc6IDAsXG4gICAgICBjb25uZWN0ZWQ6IDAsXG4gICAgICBjb21wbGV0ZWQ6IDAsXG4gICAgICBkaXNjb25uZWN0ZWQ6IDAsXG4gICAgICBmYWlsZWQ6IDBcbiAgICB9O1xuICAgIHRoaXMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcbiAgICAgIHN0YXRlc1t0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQuc3RhdGVdKys7XG4gICAgfSk7XG5cbiAgICBuZXdTdGF0ZSA9ICduZXcnO1xuICAgIGlmIChzdGF0ZXMuZmFpbGVkID4gMCkge1xuICAgICAgbmV3U3RhdGUgPSAnZmFpbGVkJztcbiAgICB9IGVsc2UgaWYgKHN0YXRlcy5jaGVja2luZyA+IDApIHtcbiAgICAgIG5ld1N0YXRlID0gJ2NoZWNraW5nJztcbiAgICB9IGVsc2UgaWYgKHN0YXRlcy5kaXNjb25uZWN0ZWQgPiAwKSB7XG4gICAgICBuZXdTdGF0ZSA9ICdkaXNjb25uZWN0ZWQnO1xuICAgIH0gZWxzZSBpZiAoc3RhdGVzLm5ldyA+IDApIHtcbiAgICAgIG5ld1N0YXRlID0gJ25ldyc7XG4gICAgfSBlbHNlIGlmIChzdGF0ZXMuY29ubmVjdGVkID4gMCkge1xuICAgICAgbmV3U3RhdGUgPSAnY29ubmVjdGVkJztcbiAgICB9IGVsc2UgaWYgKHN0YXRlcy5jb21wbGV0ZWQgPiAwKSB7XG4gICAgICBuZXdTdGF0ZSA9ICdjb21wbGV0ZWQnO1xuICAgIH1cblxuICAgIGlmIChuZXdTdGF0ZSAhPT0gdGhpcy5pY2VDb25uZWN0aW9uU3RhdGUpIHtcbiAgICAgIHRoaXMuaWNlQ29ubmVjdGlvblN0YXRlID0gbmV3U3RhdGU7XG4gICAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ2ljZWNvbm5lY3Rpb25zdGF0ZWNoYW5nZScpO1xuICAgICAgdGhpcy5fZGlzcGF0Y2hFdmVudCgnaWNlY29ubmVjdGlvbnN0YXRlY2hhbmdlJywgZXZlbnQpO1xuICAgIH1cbiAgfTtcblxuICAvLyBVcGRhdGUgdGhlIGNvbm5lY3Rpb24gc3RhdGUuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fdXBkYXRlQ29ubmVjdGlvblN0YXRlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG5ld1N0YXRlO1xuICAgIHZhciBzdGF0ZXMgPSB7XG4gICAgICAnbmV3JzogMCxcbiAgICAgIGNsb3NlZDogMCxcbiAgICAgIGNvbm5lY3Rpbmc6IDAsXG4gICAgICBjb25uZWN0ZWQ6IDAsXG4gICAgICBjb21wbGV0ZWQ6IDAsXG4gICAgICBkaXNjb25uZWN0ZWQ6IDAsXG4gICAgICBmYWlsZWQ6IDBcbiAgICB9O1xuICAgIHRoaXMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcbiAgICAgIHN0YXRlc1t0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQuc3RhdGVdKys7XG4gICAgICBzdGF0ZXNbdHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydC5zdGF0ZV0rKztcbiAgICB9KTtcbiAgICAvLyBJQ0VUcmFuc3BvcnQuY29tcGxldGVkIGFuZCBjb25uZWN0ZWQgYXJlIHRoZSBzYW1lIGZvciB0aGlzIHB1cnBvc2UuXG4gICAgc3RhdGVzLmNvbm5lY3RlZCArPSBzdGF0ZXMuY29tcGxldGVkO1xuXG4gICAgbmV3U3RhdGUgPSAnbmV3JztcbiAgICBpZiAoc3RhdGVzLmZhaWxlZCA+IDApIHtcbiAgICAgIG5ld1N0YXRlID0gJ2ZhaWxlZCc7XG4gICAgfSBlbHNlIGlmIChzdGF0ZXMuY29ubmVjdGluZyA+IDApIHtcbiAgICAgIG5ld1N0YXRlID0gJ2Nvbm5lY3RpbmcnO1xuICAgIH0gZWxzZSBpZiAoc3RhdGVzLmRpc2Nvbm5lY3RlZCA+IDApIHtcbiAgICAgIG5ld1N0YXRlID0gJ2Rpc2Nvbm5lY3RlZCc7XG4gICAgfSBlbHNlIGlmIChzdGF0ZXMubmV3ID4gMCkge1xuICAgICAgbmV3U3RhdGUgPSAnbmV3JztcbiAgICB9IGVsc2UgaWYgKHN0YXRlcy5jb25uZWN0ZWQgPiAwKSB7XG4gICAgICBuZXdTdGF0ZSA9ICdjb25uZWN0ZWQnO1xuICAgIH1cblxuICAgIGlmIChuZXdTdGF0ZSAhPT0gdGhpcy5jb25uZWN0aW9uU3RhdGUpIHtcbiAgICAgIHRoaXMuY29ubmVjdGlvblN0YXRlID0gbmV3U3RhdGU7XG4gICAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ2Nvbm5lY3Rpb25zdGF0ZWNoYW5nZScpO1xuICAgICAgdGhpcy5fZGlzcGF0Y2hFdmVudCgnY29ubmVjdGlvbnN0YXRlY2hhbmdlJywgZXZlbnQpO1xuICAgIH1cbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlT2ZmZXIgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcGMgPSB0aGlzO1xuXG4gICAgaWYgKHBjLl9pc0Nsb3NlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG1ha2VFcnJvcignSW52YWxpZFN0YXRlRXJyb3InLFxuICAgICAgICAgICdDYW4gbm90IGNhbGwgY3JlYXRlT2ZmZXIgYWZ0ZXIgY2xvc2UnKSk7XG4gICAgfVxuXG4gICAgdmFyIG51bUF1ZGlvVHJhY2tzID0gcGMudHJhbnNjZWl2ZXJzLmZpbHRlcihmdW5jdGlvbih0KSB7XG4gICAgICByZXR1cm4gdC5raW5kID09PSAnYXVkaW8nO1xuICAgIH0pLmxlbmd0aDtcbiAgICB2YXIgbnVtVmlkZW9UcmFja3MgPSBwYy50cmFuc2NlaXZlcnMuZmlsdGVyKGZ1bmN0aW9uKHQpIHtcbiAgICAgIHJldHVybiB0LmtpbmQgPT09ICd2aWRlbyc7XG4gICAgfSkubGVuZ3RoO1xuXG4gICAgLy8gRGV0ZXJtaW5lIG51bWJlciBvZiBhdWRpbyBhbmQgdmlkZW8gdHJhY2tzIHdlIG5lZWQgdG8gc2VuZC9yZWN2LlxuICAgIHZhciBvZmZlck9wdGlvbnMgPSBhcmd1bWVudHNbMF07XG4gICAgaWYgKG9mZmVyT3B0aW9ucykge1xuICAgICAgLy8gUmVqZWN0IENocm9tZSBsZWdhY3kgY29uc3RyYWludHMuXG4gICAgICBpZiAob2ZmZXJPcHRpb25zLm1hbmRhdG9yeSB8fCBvZmZlck9wdGlvbnMub3B0aW9uYWwpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICAgICdMZWdhY3kgbWFuZGF0b3J5L29wdGlvbmFsIGNvbnN0cmFpbnRzIG5vdCBzdXBwb3J0ZWQuJyk7XG4gICAgICB9XG4gICAgICBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW8gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW8gPT09IHRydWUpIHtcbiAgICAgICAgICBudW1BdWRpb1RyYWNrcyA9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW8gPT09IGZhbHNlKSB7XG4gICAgICAgICAgbnVtQXVkaW9UcmFja3MgPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG51bUF1ZGlvVHJhY2tzID0gb2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW87XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVWaWRlbyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVWaWRlbyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIG51bVZpZGVvVHJhY2tzID0gMTtcbiAgICAgICAgfSBlbHNlIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVWaWRlbyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBudW1WaWRlb1RyYWNrcyA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbnVtVmlkZW9UcmFja3MgPSBvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVWaWRlbztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHBjLnRyYW5zY2VpdmVycy5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XG4gICAgICBpZiAodHJhbnNjZWl2ZXIua2luZCA9PT0gJ2F1ZGlvJykge1xuICAgICAgICBudW1BdWRpb1RyYWNrcy0tO1xuICAgICAgICBpZiAobnVtQXVkaW9UcmFja3MgPCAwKSB7XG4gICAgICAgICAgdHJhbnNjZWl2ZXIud2FudFJlY2VpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0cmFuc2NlaXZlci5raW5kID09PSAndmlkZW8nKSB7XG4gICAgICAgIG51bVZpZGVvVHJhY2tzLS07XG4gICAgICAgIGlmIChudW1WaWRlb1RyYWNrcyA8IDApIHtcbiAgICAgICAgICB0cmFuc2NlaXZlci53YW50UmVjZWl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBDcmVhdGUgTS1saW5lcyBmb3IgcmVjdm9ubHkgc3RyZWFtcy5cbiAgICB3aGlsZSAobnVtQXVkaW9UcmFja3MgPiAwIHx8IG51bVZpZGVvVHJhY2tzID4gMCkge1xuICAgICAgaWYgKG51bUF1ZGlvVHJhY2tzID4gMCkge1xuICAgICAgICBwYy5fY3JlYXRlVHJhbnNjZWl2ZXIoJ2F1ZGlvJyk7XG4gICAgICAgIG51bUF1ZGlvVHJhY2tzLS07XG4gICAgICB9XG4gICAgICBpZiAobnVtVmlkZW9UcmFja3MgPiAwKSB7XG4gICAgICAgIHBjLl9jcmVhdGVUcmFuc2NlaXZlcigndmlkZW8nKTtcbiAgICAgICAgbnVtVmlkZW9UcmFja3MtLTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgc2RwID0gU0RQVXRpbHMud3JpdGVTZXNzaW9uQm9pbGVycGxhdGUocGMuX3NkcFNlc3Npb25JZCxcbiAgICAgICAgcGMuX3NkcFNlc3Npb25WZXJzaW9uKyspO1xuICAgIHBjLnRyYW5zY2VpdmVycy5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zY2VpdmVyLCBzZHBNTGluZUluZGV4KSB7XG4gICAgICAvLyBGb3IgZWFjaCB0cmFjaywgY3JlYXRlIGFuIGljZSBnYXRoZXJlciwgaWNlIHRyYW5zcG9ydCxcbiAgICAgIC8vIGR0bHMgdHJhbnNwb3J0LCBwb3RlbnRpYWxseSBydHBzZW5kZXIgYW5kIHJ0cHJlY2VpdmVyLlxuICAgICAgdmFyIHRyYWNrID0gdHJhbnNjZWl2ZXIudHJhY2s7XG4gICAgICB2YXIga2luZCA9IHRyYW5zY2VpdmVyLmtpbmQ7XG4gICAgICB2YXIgbWlkID0gdHJhbnNjZWl2ZXIubWlkIHx8IFNEUFV0aWxzLmdlbmVyYXRlSWRlbnRpZmllcigpO1xuICAgICAgdHJhbnNjZWl2ZXIubWlkID0gbWlkO1xuXG4gICAgICBpZiAoIXRyYW5zY2VpdmVyLmljZUdhdGhlcmVyKSB7XG4gICAgICAgIHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyID0gcGMuX2NyZWF0ZUljZUdhdGhlcmVyKHNkcE1MaW5lSW5kZXgsXG4gICAgICAgICAgICBwYy51c2luZ0J1bmRsZSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBsb2NhbENhcGFiaWxpdGllcyA9IHdpbmRvdy5SVENSdHBTZW5kZXIuZ2V0Q2FwYWJpbGl0aWVzKGtpbmQpO1xuICAgICAgLy8gZmlsdGVyIFJUWCB1bnRpbCBhZGRpdGlvbmFsIHN0dWZmIG5lZWRlZCBmb3IgUlRYIGlzIGltcGxlbWVudGVkXG4gICAgICAvLyBpbiBhZGFwdGVyLmpzXG4gICAgICBpZiAoZWRnZVZlcnNpb24gPCAxNTAxOSkge1xuICAgICAgICBsb2NhbENhcGFiaWxpdGllcy5jb2RlY3MgPSBsb2NhbENhcGFiaWxpdGllcy5jb2RlY3MuZmlsdGVyKFxuICAgICAgICAgICAgZnVuY3Rpb24oY29kZWMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNvZGVjLm5hbWUgIT09ICdydHgnO1xuICAgICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBsb2NhbENhcGFiaWxpdGllcy5jb2RlY3MuZm9yRWFjaChmdW5jdGlvbihjb2RlYykge1xuICAgICAgICAvLyB3b3JrIGFyb3VuZCBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3Avd2VicnRjL2lzc3Vlcy9kZXRhaWw/aWQ9NjU1MlxuICAgICAgICAvLyBieSBhZGRpbmcgbGV2ZWwtYXN5bW1ldHJ5LWFsbG93ZWQ9MVxuICAgICAgICBpZiAoY29kZWMubmFtZSA9PT0gJ0gyNjQnICYmXG4gICAgICAgICAgICBjb2RlYy5wYXJhbWV0ZXJzWydsZXZlbC1hc3ltbWV0cnktYWxsb3dlZCddID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjb2RlYy5wYXJhbWV0ZXJzWydsZXZlbC1hc3ltbWV0cnktYWxsb3dlZCddID0gJzEnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZm9yIHN1YnNlcXVlbnQgb2ZmZXJzLCB3ZSBtaWdodCBoYXZlIHRvIHJlLXVzZSB0aGUgcGF5bG9hZFxuICAgICAgICAvLyB0eXBlIG9mIHRoZSBsYXN0IG9mZmVyLlxuICAgICAgICBpZiAodHJhbnNjZWl2ZXIucmVtb3RlQ2FwYWJpbGl0aWVzICYmXG4gICAgICAgICAgICB0cmFuc2NlaXZlci5yZW1vdGVDYXBhYmlsaXRpZXMuY29kZWNzKSB7XG4gICAgICAgICAgdHJhbnNjZWl2ZXIucmVtb3RlQ2FwYWJpbGl0aWVzLmNvZGVjcy5mb3JFYWNoKGZ1bmN0aW9uKHJlbW90ZUNvZGVjKSB7XG4gICAgICAgICAgICBpZiAoY29kZWMubmFtZS50b0xvd2VyQ2FzZSgpID09PSByZW1vdGVDb2RlYy5uYW1lLnRvTG93ZXJDYXNlKCkgJiZcbiAgICAgICAgICAgICAgICBjb2RlYy5jbG9ja1JhdGUgPT09IHJlbW90ZUNvZGVjLmNsb2NrUmF0ZSkge1xuICAgICAgICAgICAgICBjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZSA9IHJlbW90ZUNvZGVjLnBheWxvYWRUeXBlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGxvY2FsQ2FwYWJpbGl0aWVzLmhlYWRlckV4dGVuc2lvbnMuZm9yRWFjaChmdW5jdGlvbihoZHJFeHQpIHtcbiAgICAgICAgdmFyIHJlbW90ZUV4dGVuc2lvbnMgPSB0cmFuc2NlaXZlci5yZW1vdGVDYXBhYmlsaXRpZXMgJiZcbiAgICAgICAgICAgIHRyYW5zY2VpdmVyLnJlbW90ZUNhcGFiaWxpdGllcy5oZWFkZXJFeHRlbnNpb25zIHx8IFtdO1xuICAgICAgICByZW1vdGVFeHRlbnNpb25zLmZvckVhY2goZnVuY3Rpb24ockhkckV4dCkge1xuICAgICAgICAgIGlmIChoZHJFeHQudXJpID09PSBySGRyRXh0LnVyaSkge1xuICAgICAgICAgICAgaGRyRXh0LmlkID0gckhkckV4dC5pZDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIGdlbmVyYXRlIGFuIHNzcmMgbm93LCB0byBiZSB1c2VkIGxhdGVyIGluIHJ0cFNlbmRlci5zZW5kXG4gICAgICB2YXIgc2VuZEVuY29kaW5nUGFyYW1ldGVycyA9IHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnMgfHwgW3tcbiAgICAgICAgc3NyYzogKDIgKiBzZHBNTGluZUluZGV4ICsgMSkgKiAxMDAxXG4gICAgICB9XTtcbiAgICAgIGlmICh0cmFjaykge1xuICAgICAgICAvLyBhZGQgUlRYXG4gICAgICAgIGlmIChlZGdlVmVyc2lvbiA+PSAxNTAxOSAmJiBraW5kID09PSAndmlkZW8nICYmXG4gICAgICAgICAgICAhc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHgpIHtcbiAgICAgICAgICBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCA9IHtcbiAgICAgICAgICAgIHNzcmM6IHNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYyArIDFcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0cmFuc2NlaXZlci53YW50UmVjZWl2ZSkge1xuICAgICAgICB0cmFuc2NlaXZlci5ydHBSZWNlaXZlciA9IG5ldyB3aW5kb3cuUlRDUnRwUmVjZWl2ZXIoXG4gICAgICAgICAgICB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0LCBraW5kKTtcbiAgICAgIH1cblxuICAgICAgdHJhbnNjZWl2ZXIubG9jYWxDYXBhYmlsaXRpZXMgPSBsb2NhbENhcGFiaWxpdGllcztcbiAgICAgIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnMgPSBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzO1xuICAgIH0pO1xuXG4gICAgLy8gYWx3YXlzIG9mZmVyIEJVTkRMRSBhbmQgZGlzcG9zZSBvbiByZXR1cm4gaWYgbm90IHN1cHBvcnRlZC5cbiAgICBpZiAocGMuX2NvbmZpZy5idW5kbGVQb2xpY3kgIT09ICdtYXgtY29tcGF0Jykge1xuICAgICAgc2RwICs9ICdhPWdyb3VwOkJVTkRMRSAnICsgcGMudHJhbnNjZWl2ZXJzLm1hcChmdW5jdGlvbih0KSB7XG4gICAgICAgIHJldHVybiB0Lm1pZDtcbiAgICAgIH0pLmpvaW4oJyAnKSArICdcXHJcXG4nO1xuICAgIH1cbiAgICBzZHAgKz0gJ2E9aWNlLW9wdGlvbnM6dHJpY2tsZVxcclxcbic7XG5cbiAgICBwYy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlciwgc2RwTUxpbmVJbmRleCkge1xuICAgICAgc2RwICs9IHdyaXRlTWVkaWFTZWN0aW9uKHRyYW5zY2VpdmVyLCB0cmFuc2NlaXZlci5sb2NhbENhcGFiaWxpdGllcyxcbiAgICAgICAgICAnb2ZmZXInLCB0cmFuc2NlaXZlci5zdHJlYW0sIHBjLl9kdGxzUm9sZSk7XG4gICAgICBzZHAgKz0gJ2E9cnRjcC1yc2l6ZVxcclxcbic7XG5cbiAgICAgIGlmICh0cmFuc2NlaXZlci5pY2VHYXRoZXJlciAmJiBwYy5pY2VHYXRoZXJpbmdTdGF0ZSAhPT0gJ25ldycgJiZcbiAgICAgICAgICAoc2RwTUxpbmVJbmRleCA9PT0gMCB8fCAhcGMudXNpbmdCdW5kbGUpKSB7XG4gICAgICAgIHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyLmdldExvY2FsQ2FuZGlkYXRlcygpLmZvckVhY2goZnVuY3Rpb24oY2FuZCkge1xuICAgICAgICAgIGNhbmQuY29tcG9uZW50ID0gMTtcbiAgICAgICAgICBzZHAgKz0gJ2E9JyArIFNEUFV0aWxzLndyaXRlQ2FuZGlkYXRlKGNhbmQpICsgJ1xcclxcbic7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0cmFuc2NlaXZlci5pY2VHYXRoZXJlci5zdGF0ZSA9PT0gJ2NvbXBsZXRlZCcpIHtcbiAgICAgICAgICBzZHAgKz0gJ2E9ZW5kLW9mLWNhbmRpZGF0ZXNcXHJcXG4nO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB2YXIgZGVzYyA9IG5ldyB3aW5kb3cuUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKHtcbiAgICAgIHR5cGU6ICdvZmZlcicsXG4gICAgICBzZHA6IHNkcFxuICAgIH0pO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZGVzYyk7XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmNyZWF0ZUFuc3dlciA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBwYyA9IHRoaXM7XG5cbiAgICBpZiAocGMuX2lzQ2xvc2VkKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobWFrZUVycm9yKCdJbnZhbGlkU3RhdGVFcnJvcicsXG4gICAgICAgICAgJ0NhbiBub3QgY2FsbCBjcmVhdGVBbnN3ZXIgYWZ0ZXIgY2xvc2UnKSk7XG4gICAgfVxuXG4gICAgaWYgKCEocGMuc2lnbmFsaW5nU3RhdGUgPT09ICdoYXZlLXJlbW90ZS1vZmZlcicgfHxcbiAgICAgICAgcGMuc2lnbmFsaW5nU3RhdGUgPT09ICdoYXZlLWxvY2FsLXByYW5zd2VyJykpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChtYWtlRXJyb3IoJ0ludmFsaWRTdGF0ZUVycm9yJyxcbiAgICAgICAgICAnQ2FuIG5vdCBjYWxsIGNyZWF0ZUFuc3dlciBpbiBzaWduYWxpbmdTdGF0ZSAnICsgcGMuc2lnbmFsaW5nU3RhdGUpKTtcbiAgICB9XG5cbiAgICB2YXIgc2RwID0gU0RQVXRpbHMud3JpdGVTZXNzaW9uQm9pbGVycGxhdGUocGMuX3NkcFNlc3Npb25JZCxcbiAgICAgICAgcGMuX3NkcFNlc3Npb25WZXJzaW9uKyspO1xuICAgIGlmIChwYy51c2luZ0J1bmRsZSkge1xuICAgICAgc2RwICs9ICdhPWdyb3VwOkJVTkRMRSAnICsgcGMudHJhbnNjZWl2ZXJzLm1hcChmdW5jdGlvbih0KSB7XG4gICAgICAgIHJldHVybiB0Lm1pZDtcbiAgICAgIH0pLmpvaW4oJyAnKSArICdcXHJcXG4nO1xuICAgIH1cbiAgICB2YXIgbWVkaWFTZWN0aW9uc0luT2ZmZXIgPSBTRFBVdGlscy5nZXRNZWRpYVNlY3Rpb25zKFxuICAgICAgICBwYy5yZW1vdGVEZXNjcmlwdGlvbi5zZHApLmxlbmd0aDtcbiAgICBwYy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlciwgc2RwTUxpbmVJbmRleCkge1xuICAgICAgaWYgKHNkcE1MaW5lSW5kZXggKyAxID4gbWVkaWFTZWN0aW9uc0luT2ZmZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHRyYW5zY2VpdmVyLnJlamVjdGVkKSB7XG4gICAgICAgIGlmICh0cmFuc2NlaXZlci5raW5kID09PSAnYXBwbGljYXRpb24nKSB7XG4gICAgICAgICAgc2RwICs9ICdtPWFwcGxpY2F0aW9uIDAgRFRMUy9TQ1RQIDUwMDBcXHJcXG4nO1xuICAgICAgICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLmtpbmQgPT09ICdhdWRpbycpIHtcbiAgICAgICAgICBzZHAgKz0gJ209YXVkaW8gMCBVRFAvVExTL1JUUC9TQVZQRiAwXFxyXFxuJyArXG4gICAgICAgICAgICAgICdhPXJ0cG1hcDowIFBDTVUvODAwMFxcclxcbic7XG4gICAgICAgIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIua2luZCA9PT0gJ3ZpZGVvJykge1xuICAgICAgICAgIHNkcCArPSAnbT12aWRlbyAwIFVEUC9UTFMvUlRQL1NBVlBGIDEyMFxcclxcbicgK1xuICAgICAgICAgICAgICAnYT1ydHBtYXA6MTIwIFZQOC85MDAwMFxcclxcbic7XG4gICAgICAgIH1cbiAgICAgICAgc2RwICs9ICdjPUlOIElQNCAwLjAuMC4wXFxyXFxuJyArXG4gICAgICAgICAgICAnYT1pbmFjdGl2ZVxcclxcbicgK1xuICAgICAgICAgICAgJ2E9bWlkOicgKyB0cmFuc2NlaXZlci5taWQgKyAnXFxyXFxuJztcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBGSVhNRTogbG9vayBhdCBkaXJlY3Rpb24uXG4gICAgICBpZiAodHJhbnNjZWl2ZXIuc3RyZWFtKSB7XG4gICAgICAgIHZhciBsb2NhbFRyYWNrO1xuICAgICAgICBpZiAodHJhbnNjZWl2ZXIua2luZCA9PT0gJ2F1ZGlvJykge1xuICAgICAgICAgIGxvY2FsVHJhY2sgPSB0cmFuc2NlaXZlci5zdHJlYW0uZ2V0QXVkaW9UcmFja3MoKVswXTtcbiAgICAgICAgfSBlbHNlIGlmICh0cmFuc2NlaXZlci5raW5kID09PSAndmlkZW8nKSB7XG4gICAgICAgICAgbG9jYWxUcmFjayA9IHRyYW5zY2VpdmVyLnN0cmVhbS5nZXRWaWRlb1RyYWNrcygpWzBdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsb2NhbFRyYWNrKSB7XG4gICAgICAgICAgLy8gYWRkIFJUWFxuICAgICAgICAgIGlmIChlZGdlVmVyc2lvbiA+PSAxNTAxOSAmJiB0cmFuc2NlaXZlci5raW5kID09PSAndmlkZW8nICYmXG4gICAgICAgICAgICAgICF0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCkge1xuICAgICAgICAgICAgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHggPSB7XG4gICAgICAgICAgICAgIHNzcmM6IHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYyArIDFcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIENhbGN1bGF0ZSBpbnRlcnNlY3Rpb24gb2YgY2FwYWJpbGl0aWVzLlxuICAgICAgdmFyIGNvbW1vbkNhcGFiaWxpdGllcyA9IGdldENvbW1vbkNhcGFiaWxpdGllcyhcbiAgICAgICAgICB0cmFuc2NlaXZlci5sb2NhbENhcGFiaWxpdGllcyxcbiAgICAgICAgICB0cmFuc2NlaXZlci5yZW1vdGVDYXBhYmlsaXRpZXMpO1xuXG4gICAgICB2YXIgaGFzUnR4ID0gY29tbW9uQ2FwYWJpbGl0aWVzLmNvZGVjcy5maWx0ZXIoZnVuY3Rpb24oYykge1xuICAgICAgICByZXR1cm4gYy5uYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdydHgnO1xuICAgICAgfSkubGVuZ3RoO1xuICAgICAgaWYgKCFoYXNSdHggJiYgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHgpIHtcbiAgICAgICAgZGVsZXRlIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4O1xuICAgICAgfVxuXG4gICAgICBzZHAgKz0gd3JpdGVNZWRpYVNlY3Rpb24odHJhbnNjZWl2ZXIsIGNvbW1vbkNhcGFiaWxpdGllcyxcbiAgICAgICAgICAnYW5zd2VyJywgdHJhbnNjZWl2ZXIuc3RyZWFtLCBwYy5fZHRsc1JvbGUpO1xuICAgICAgaWYgKHRyYW5zY2VpdmVyLnJ0Y3BQYXJhbWV0ZXJzICYmXG4gICAgICAgICAgdHJhbnNjZWl2ZXIucnRjcFBhcmFtZXRlcnMucmVkdWNlZFNpemUpIHtcbiAgICAgICAgc2RwICs9ICdhPXJ0Y3AtcnNpemVcXHJcXG4nO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIGRlc2MgPSBuZXcgd2luZG93LlJUQ1Nlc3Npb25EZXNjcmlwdGlvbih7XG4gICAgICB0eXBlOiAnYW5zd2VyJyxcbiAgICAgIHNkcDogc2RwXG4gICAgfSk7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShkZXNjKTtcbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkSWNlQ2FuZGlkYXRlID0gZnVuY3Rpb24oY2FuZGlkYXRlKSB7XG4gICAgdmFyIHBjID0gdGhpcztcbiAgICB2YXIgc2VjdGlvbnM7XG4gICAgaWYgKGNhbmRpZGF0ZSAmJiAhKGNhbmRpZGF0ZS5zZHBNTGluZUluZGV4ICE9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgY2FuZGlkYXRlLnNkcE1pZCkpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgVHlwZUVycm9yKCdzZHBNTGluZUluZGV4IG9yIHNkcE1pZCByZXF1aXJlZCcpKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBuZWVkcyB0byBnbyBpbnRvIG9wcyBxdWV1ZS5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBpZiAoIXBjLnJlbW90ZURlc2NyaXB0aW9uKSB7XG4gICAgICAgIHJldHVybiByZWplY3QobWFrZUVycm9yKCdJbnZhbGlkU3RhdGVFcnJvcicsXG4gICAgICAgICAgICAnQ2FuIG5vdCBhZGQgSUNFIGNhbmRpZGF0ZSB3aXRob3V0IGEgcmVtb3RlIGRlc2NyaXB0aW9uJykpO1xuICAgICAgfSBlbHNlIGlmICghY2FuZGlkYXRlIHx8IGNhbmRpZGF0ZS5jYW5kaWRhdGUgPT09ICcnKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcGMudHJhbnNjZWl2ZXJzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgaWYgKHBjLnRyYW5zY2VpdmVyc1tqXS5yZWplY3RlZCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1tqXS5pY2VUcmFuc3BvcnQuYWRkUmVtb3RlQ2FuZGlkYXRlKHt9KTtcbiAgICAgICAgICBzZWN0aW9ucyA9IFNEUFV0aWxzLmdldE1lZGlhU2VjdGlvbnMocGMucmVtb3RlRGVzY3JpcHRpb24uc2RwKTtcbiAgICAgICAgICBzZWN0aW9uc1tqXSArPSAnYT1lbmQtb2YtY2FuZGlkYXRlc1xcclxcbic7XG4gICAgICAgICAgcGMucmVtb3RlRGVzY3JpcHRpb24uc2RwID1cbiAgICAgICAgICAgICAgU0RQVXRpbHMuZ2V0RGVzY3JpcHRpb24ocGMucmVtb3RlRGVzY3JpcHRpb24uc2RwKSArXG4gICAgICAgICAgICAgIHNlY3Rpb25zLmpvaW4oJycpO1xuICAgICAgICAgIGlmIChwYy51c2luZ0J1bmRsZSkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgc2RwTUxpbmVJbmRleCA9IGNhbmRpZGF0ZS5zZHBNTGluZUluZGV4O1xuICAgICAgICBpZiAoY2FuZGlkYXRlLnNkcE1pZCkge1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGMudHJhbnNjZWl2ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocGMudHJhbnNjZWl2ZXJzW2ldLm1pZCA9PT0gY2FuZGlkYXRlLnNkcE1pZCkge1xuICAgICAgICAgICAgICBzZHBNTGluZUluZGV4ID0gaTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciB0cmFuc2NlaXZlciA9IHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XTtcbiAgICAgICAgaWYgKHRyYW5zY2VpdmVyKSB7XG4gICAgICAgICAgaWYgKHRyYW5zY2VpdmVyLnJlamVjdGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgY2FuZCA9IE9iamVjdC5rZXlzKGNhbmRpZGF0ZS5jYW5kaWRhdGUpLmxlbmd0aCA+IDAgP1xuICAgICAgICAgICAgICBTRFBVdGlscy5wYXJzZUNhbmRpZGF0ZShjYW5kaWRhdGUuY2FuZGlkYXRlKSA6IHt9O1xuICAgICAgICAgIC8vIElnbm9yZSBDaHJvbWUncyBpbnZhbGlkIGNhbmRpZGF0ZXMgc2luY2UgRWRnZSBkb2VzIG5vdCBsaWtlIHRoZW0uXG4gICAgICAgICAgaWYgKGNhbmQucHJvdG9jb2wgPT09ICd0Y3AnICYmIChjYW5kLnBvcnQgPT09IDAgfHwgY2FuZC5wb3J0ID09PSA5KSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gSWdub3JlIFJUQ1AgY2FuZGlkYXRlcywgd2UgYXNzdW1lIFJUQ1AtTVVYLlxuICAgICAgICAgIGlmIChjYW5kLmNvbXBvbmVudCAmJiBjYW5kLmNvbXBvbmVudCAhPT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gd2hlbiB1c2luZyBidW5kbGUsIGF2b2lkIGFkZGluZyBjYW5kaWRhdGVzIHRvIHRoZSB3cm9uZ1xuICAgICAgICAgIC8vIGljZSB0cmFuc3BvcnQuIEFuZCBhdm9pZCBhZGRpbmcgY2FuZGlkYXRlcyBhZGRlZCBpbiB0aGUgU0RQLlxuICAgICAgICAgIGlmIChzZHBNTGluZUluZGV4ID09PSAwIHx8IChzZHBNTGluZUluZGV4ID4gMCAmJlxuICAgICAgICAgICAgICB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQgIT09IHBjLnRyYW5zY2VpdmVyc1swXS5pY2VUcmFuc3BvcnQpKSB7XG4gICAgICAgICAgICBpZiAoIW1heWJlQWRkQ2FuZGlkYXRlKHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydCwgY2FuZCkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChtYWtlRXJyb3IoJ09wZXJhdGlvbkVycm9yJyxcbiAgICAgICAgICAgICAgICAgICdDYW4gbm90IGFkZCBJQ0UgY2FuZGlkYXRlJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgcmVtb3RlRGVzY3JpcHRpb24uXG4gICAgICAgICAgdmFyIGNhbmRpZGF0ZVN0cmluZyA9IGNhbmRpZGF0ZS5jYW5kaWRhdGUudHJpbSgpO1xuICAgICAgICAgIGlmIChjYW5kaWRhdGVTdHJpbmcuaW5kZXhPZignYT0nKSA9PT0gMCkge1xuICAgICAgICAgICAgY2FuZGlkYXRlU3RyaW5nID0gY2FuZGlkYXRlU3RyaW5nLnN1YnN0cigyKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2VjdGlvbnMgPSBTRFBVdGlscy5nZXRNZWRpYVNlY3Rpb25zKHBjLnJlbW90ZURlc2NyaXB0aW9uLnNkcCk7XG4gICAgICAgICAgc2VjdGlvbnNbc2RwTUxpbmVJbmRleF0gKz0gJ2E9JyArXG4gICAgICAgICAgICAgIChjYW5kLnR5cGUgPyBjYW5kaWRhdGVTdHJpbmcgOiAnZW5kLW9mLWNhbmRpZGF0ZXMnKVxuICAgICAgICAgICAgICArICdcXHJcXG4nO1xuICAgICAgICAgIHBjLnJlbW90ZURlc2NyaXB0aW9uLnNkcCA9XG4gICAgICAgICAgICAgIFNEUFV0aWxzLmdldERlc2NyaXB0aW9uKHBjLnJlbW90ZURlc2NyaXB0aW9uLnNkcCkgK1xuICAgICAgICAgICAgICBzZWN0aW9ucy5qb2luKCcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0KG1ha2VFcnJvcignT3BlcmF0aW9uRXJyb3InLFxuICAgICAgICAgICAgICAnQ2FuIG5vdCBhZGQgSUNFIGNhbmRpZGF0ZScpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTdGF0cyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBwcm9taXNlcyA9IFtdO1xuICAgIHRoaXMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcbiAgICAgIFsncnRwU2VuZGVyJywgJ3J0cFJlY2VpdmVyJywgJ2ljZUdhdGhlcmVyJywgJ2ljZVRyYW5zcG9ydCcsXG4gICAgICAgICAgJ2R0bHNUcmFuc3BvcnQnXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgICAgICAgaWYgKHRyYW5zY2VpdmVyW21ldGhvZF0pIHtcbiAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaCh0cmFuc2NlaXZlclttZXRob2RdLmdldFN0YXRzKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgIH0pO1xuICAgIHZhciBmaXhTdGF0c1R5cGUgPSBmdW5jdGlvbihzdGF0KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpbmJvdW5kcnRwOiAnaW5ib3VuZC1ydHAnLFxuICAgICAgICBvdXRib3VuZHJ0cDogJ291dGJvdW5kLXJ0cCcsXG4gICAgICAgIGNhbmRpZGF0ZXBhaXI6ICdjYW5kaWRhdGUtcGFpcicsXG4gICAgICAgIGxvY2FsY2FuZGlkYXRlOiAnbG9jYWwtY2FuZGlkYXRlJyxcbiAgICAgICAgcmVtb3RlY2FuZGlkYXRlOiAncmVtb3RlLWNhbmRpZGF0ZSdcbiAgICAgIH1bc3RhdC50eXBlXSB8fCBzdGF0LnR5cGU7XG4gICAgfTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuICAgICAgLy8gc2hpbSBnZXRTdGF0cyB3aXRoIG1hcGxpa2Ugc3VwcG9ydFxuICAgICAgdmFyIHJlc3VsdHMgPSBuZXcgTWFwKCk7XG4gICAgICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgcmVzLmZvckVhY2goZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgT2JqZWN0LmtleXMocmVzdWx0KS5mb3JFYWNoKGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgICAgICByZXN1bHRbaWRdLnR5cGUgPSBmaXhTdGF0c1R5cGUocmVzdWx0W2lkXSk7XG4gICAgICAgICAgICByZXN1bHRzLnNldChpZCwgcmVzdWx0W2lkXSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXNvbHZlKHJlc3VsdHMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gbGVnYWN5IGNhbGxiYWNrIHNoaW1zLiBTaG91bGQgYmUgbW92ZWQgdG8gYWRhcHRlci5qcyBzb21lIGRheXMuXG4gIHZhciBtZXRob2RzID0gWydjcmVhdGVPZmZlcicsICdjcmVhdGVBbnN3ZXInXTtcbiAgbWV0aG9kcy5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgIHZhciBuYXRpdmVNZXRob2QgPSBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXTtcbiAgICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICBpZiAodHlwZW9mIGFyZ3NbMF0gPT09ICdmdW5jdGlvbicgfHxcbiAgICAgICAgICB0eXBlb2YgYXJnc1sxXSA9PT0gJ2Z1bmN0aW9uJykgeyAvLyBsZWdhY3lcbiAgICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseSh0aGlzLCBbYXJndW1lbnRzWzJdXSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oZGVzY3JpcHRpb24pIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGFyZ3NbMF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGFyZ3NbMF0uYXBwbHkobnVsbCwgW2Rlc2NyaXB0aW9uXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgIGlmICh0eXBlb2YgYXJnc1sxXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgYXJnc1sxXS5hcHBseShudWxsLCBbZXJyb3JdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH0pO1xuXG4gIG1ldGhvZHMgPSBbJ3NldExvY2FsRGVzY3JpcHRpb24nLCAnc2V0UmVtb3RlRGVzY3JpcHRpb24nLCAnYWRkSWNlQ2FuZGlkYXRlJ107XG4gIG1ldGhvZHMuZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICB2YXIgbmF0aXZlTWV0aG9kID0gUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF07XG4gICAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgaWYgKHR5cGVvZiBhcmdzWzFdID09PSAnZnVuY3Rpb24nIHx8XG4gICAgICAgICAgdHlwZW9mIGFyZ3NbMl0gPT09ICdmdW5jdGlvbicpIHsgLy8gbGVnYWN5XG4gICAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGFyZ3NbMV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGFyZ3NbMV0uYXBwbHkobnVsbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgIGlmICh0eXBlb2YgYXJnc1syXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgYXJnc1syXS5hcHBseShudWxsLCBbZXJyb3JdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH0pO1xuXG4gIC8vIGdldFN0YXRzIGlzIHNwZWNpYWwuIEl0IGRvZXNuJ3QgaGF2ZSBhIHNwZWMgbGVnYWN5IG1ldGhvZCB5ZXQgd2Ugc3VwcG9ydFxuICAvLyBnZXRTdGF0cyhzb21ldGhpbmcsIGNiKSB3aXRob3V0IGVycm9yIGNhbGxiYWNrcy5cbiAgWydnZXRTdGF0cyddLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgdmFyIG5hdGl2ZU1ldGhvZCA9IFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdO1xuICAgIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIGlmICh0eXBlb2YgYXJnc1sxXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBhcmdzWzFdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBhcmdzWzFdLmFwcGx5KG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfSk7XG5cbiAgcmV0dXJuIFJUQ1BlZXJDb25uZWN0aW9uO1xufTtcblxufSx7XCJzZHBcIjoyfV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4gLyogZXNsaW50LWVudiBub2RlICovXG4ndXNlIHN0cmljdCc7XG5cbi8vIFNEUCBoZWxwZXJzLlxudmFyIFNEUFV0aWxzID0ge307XG5cbi8vIEdlbmVyYXRlIGFuIGFscGhhbnVtZXJpYyBpZGVudGlmaWVyIGZvciBjbmFtZSBvciBtaWRzLlxuLy8gVE9ETzogdXNlIFVVSURzIGluc3RlYWQ/IGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2plZC85ODI4ODNcblNEUFV0aWxzLmdlbmVyYXRlSWRlbnRpZmllciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsIDEwKTtcbn07XG5cbi8vIFRoZSBSVENQIENOQU1FIHVzZWQgYnkgYWxsIHBlZXJjb25uZWN0aW9ucyBmcm9tIHRoZSBzYW1lIEpTLlxuU0RQVXRpbHMubG9jYWxDTmFtZSA9IFNEUFV0aWxzLmdlbmVyYXRlSWRlbnRpZmllcigpO1xuXG4vLyBTcGxpdHMgU0RQIGludG8gbGluZXMsIGRlYWxpbmcgd2l0aCBib3RoIENSTEYgYW5kIExGLlxuU0RQVXRpbHMuc3BsaXRMaW5lcyA9IGZ1bmN0aW9uKGJsb2IpIHtcbiAgcmV0dXJuIGJsb2IudHJpbSgpLnNwbGl0KCdcXG4nKS5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgIHJldHVybiBsaW5lLnRyaW0oKTtcbiAgfSk7XG59O1xuLy8gU3BsaXRzIFNEUCBpbnRvIHNlc3Npb25wYXJ0IGFuZCBtZWRpYXNlY3Rpb25zLiBFbnN1cmVzIENSTEYuXG5TRFBVdGlscy5zcGxpdFNlY3Rpb25zID0gZnVuY3Rpb24oYmxvYikge1xuICB2YXIgcGFydHMgPSBibG9iLnNwbGl0KCdcXG5tPScpO1xuICByZXR1cm4gcGFydHMubWFwKGZ1bmN0aW9uKHBhcnQsIGluZGV4KSB7XG4gICAgcmV0dXJuIChpbmRleCA+IDAgPyAnbT0nICsgcGFydCA6IHBhcnQpLnRyaW0oKSArICdcXHJcXG4nO1xuICB9KTtcbn07XG5cbi8vIHJldHVybnMgdGhlIHNlc3Npb24gZGVzY3JpcHRpb24uXG5TRFBVdGlscy5nZXREZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKGJsb2IpIHtcbiAgdmFyIHNlY3Rpb25zID0gU0RQVXRpbHMuc3BsaXRTZWN0aW9ucyhibG9iKTtcbiAgcmV0dXJuIHNlY3Rpb25zICYmIHNlY3Rpb25zWzBdO1xufTtcblxuLy8gcmV0dXJucyB0aGUgaW5kaXZpZHVhbCBtZWRpYSBzZWN0aW9ucy5cblNEUFV0aWxzLmdldE1lZGlhU2VjdGlvbnMgPSBmdW5jdGlvbihibG9iKSB7XG4gIHZhciBzZWN0aW9ucyA9IFNEUFV0aWxzLnNwbGl0U2VjdGlvbnMoYmxvYik7XG4gIHNlY3Rpb25zLnNoaWZ0KCk7XG4gIHJldHVybiBzZWN0aW9ucztcbn07XG5cbi8vIFJldHVybnMgbGluZXMgdGhhdCBzdGFydCB3aXRoIGEgY2VydGFpbiBwcmVmaXguXG5TRFBVdGlscy5tYXRjaFByZWZpeCA9IGZ1bmN0aW9uKGJsb2IsIHByZWZpeCkge1xuICByZXR1cm4gU0RQVXRpbHMuc3BsaXRMaW5lcyhibG9iKS5maWx0ZXIoZnVuY3Rpb24obGluZSkge1xuICAgIHJldHVybiBsaW5lLmluZGV4T2YocHJlZml4KSA9PT0gMDtcbiAgfSk7XG59O1xuXG4vLyBQYXJzZXMgYW4gSUNFIGNhbmRpZGF0ZSBsaW5lLiBTYW1wbGUgaW5wdXQ6XG4vLyBjYW5kaWRhdGU6NzAyNzg2MzUwIDIgdWRwIDQxODE5OTAyIDguOC44LjggNjA3NjkgdHlwIHJlbGF5IHJhZGRyIDguOC44Ljhcbi8vIHJwb3J0IDU1OTk2XCJcblNEUFV0aWxzLnBhcnNlQ2FuZGlkYXRlID0gZnVuY3Rpb24obGluZSkge1xuICB2YXIgcGFydHM7XG4gIC8vIFBhcnNlIGJvdGggdmFyaWFudHMuXG4gIGlmIChsaW5lLmluZGV4T2YoJ2E9Y2FuZGlkYXRlOicpID09PSAwKSB7XG4gICAgcGFydHMgPSBsaW5lLnN1YnN0cmluZygxMikuc3BsaXQoJyAnKTtcbiAgfSBlbHNlIHtcbiAgICBwYXJ0cyA9IGxpbmUuc3Vic3RyaW5nKDEwKS5zcGxpdCgnICcpO1xuICB9XG5cbiAgdmFyIGNhbmRpZGF0ZSA9IHtcbiAgICBmb3VuZGF0aW9uOiBwYXJ0c1swXSxcbiAgICBjb21wb25lbnQ6IHBhcnNlSW50KHBhcnRzWzFdLCAxMCksXG4gICAgcHJvdG9jb2w6IHBhcnRzWzJdLnRvTG93ZXJDYXNlKCksXG4gICAgcHJpb3JpdHk6IHBhcnNlSW50KHBhcnRzWzNdLCAxMCksXG4gICAgaXA6IHBhcnRzWzRdLFxuICAgIHBvcnQ6IHBhcnNlSW50KHBhcnRzWzVdLCAxMCksXG4gICAgLy8gc2tpcCBwYXJ0c1s2XSA9PSAndHlwJ1xuICAgIHR5cGU6IHBhcnRzWzddXG4gIH07XG5cbiAgZm9yICh2YXIgaSA9IDg7IGkgPCBwYXJ0cy5sZW5ndGg7IGkgKz0gMikge1xuICAgIHN3aXRjaCAocGFydHNbaV0pIHtcbiAgICAgIGNhc2UgJ3JhZGRyJzpcbiAgICAgICAgY2FuZGlkYXRlLnJlbGF0ZWRBZGRyZXNzID0gcGFydHNbaSArIDFdO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3Jwb3J0JzpcbiAgICAgICAgY2FuZGlkYXRlLnJlbGF0ZWRQb3J0ID0gcGFyc2VJbnQocGFydHNbaSArIDFdLCAxMCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndGNwdHlwZSc6XG4gICAgICAgIGNhbmRpZGF0ZS50Y3BUeXBlID0gcGFydHNbaSArIDFdO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3VmcmFnJzpcbiAgICAgICAgY2FuZGlkYXRlLnVmcmFnID0gcGFydHNbaSArIDFdOyAvLyBmb3IgYmFja3dhcmQgY29tcGFiaWxpdHkuXG4gICAgICAgIGNhbmRpZGF0ZS51c2VybmFtZUZyYWdtZW50ID0gcGFydHNbaSArIDFdO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6IC8vIGV4dGVuc2lvbiBoYW5kbGluZywgaW4gcGFydGljdWxhciB1ZnJhZ1xuICAgICAgICBjYW5kaWRhdGVbcGFydHNbaV1dID0gcGFydHNbaSArIDFdO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNhbmRpZGF0ZTtcbn07XG5cbi8vIFRyYW5zbGF0ZXMgYSBjYW5kaWRhdGUgb2JqZWN0IGludG8gU0RQIGNhbmRpZGF0ZSBhdHRyaWJ1dGUuXG5TRFBVdGlscy53cml0ZUNhbmRpZGF0ZSA9IGZ1bmN0aW9uKGNhbmRpZGF0ZSkge1xuICB2YXIgc2RwID0gW107XG4gIHNkcC5wdXNoKGNhbmRpZGF0ZS5mb3VuZGF0aW9uKTtcbiAgc2RwLnB1c2goY2FuZGlkYXRlLmNvbXBvbmVudCk7XG4gIHNkcC5wdXNoKGNhbmRpZGF0ZS5wcm90b2NvbC50b1VwcGVyQ2FzZSgpKTtcbiAgc2RwLnB1c2goY2FuZGlkYXRlLnByaW9yaXR5KTtcbiAgc2RwLnB1c2goY2FuZGlkYXRlLmlwKTtcbiAgc2RwLnB1c2goY2FuZGlkYXRlLnBvcnQpO1xuXG4gIHZhciB0eXBlID0gY2FuZGlkYXRlLnR5cGU7XG4gIHNkcC5wdXNoKCd0eXAnKTtcbiAgc2RwLnB1c2godHlwZSk7XG4gIGlmICh0eXBlICE9PSAnaG9zdCcgJiYgY2FuZGlkYXRlLnJlbGF0ZWRBZGRyZXNzICYmXG4gICAgICBjYW5kaWRhdGUucmVsYXRlZFBvcnQpIHtcbiAgICBzZHAucHVzaCgncmFkZHInKTtcbiAgICBzZHAucHVzaChjYW5kaWRhdGUucmVsYXRlZEFkZHJlc3MpOyAvLyB3YXM6IHJlbEFkZHJcbiAgICBzZHAucHVzaCgncnBvcnQnKTtcbiAgICBzZHAucHVzaChjYW5kaWRhdGUucmVsYXRlZFBvcnQpOyAvLyB3YXM6IHJlbFBvcnRcbiAgfVxuICBpZiAoY2FuZGlkYXRlLnRjcFR5cGUgJiYgY2FuZGlkYXRlLnByb3RvY29sLnRvTG93ZXJDYXNlKCkgPT09ICd0Y3AnKSB7XG4gICAgc2RwLnB1c2goJ3RjcHR5cGUnKTtcbiAgICBzZHAucHVzaChjYW5kaWRhdGUudGNwVHlwZSk7XG4gIH1cbiAgaWYgKGNhbmRpZGF0ZS51c2VybmFtZUZyYWdtZW50IHx8IGNhbmRpZGF0ZS51ZnJhZykge1xuICAgIHNkcC5wdXNoKCd1ZnJhZycpO1xuICAgIHNkcC5wdXNoKGNhbmRpZGF0ZS51c2VybmFtZUZyYWdtZW50IHx8IGNhbmRpZGF0ZS51ZnJhZyk7XG4gIH1cbiAgcmV0dXJuICdjYW5kaWRhdGU6JyArIHNkcC5qb2luKCcgJyk7XG59O1xuXG4vLyBQYXJzZXMgYW4gaWNlLW9wdGlvbnMgbGluZSwgcmV0dXJucyBhbiBhcnJheSBvZiBvcHRpb24gdGFncy5cbi8vIGE9aWNlLW9wdGlvbnM6Zm9vIGJhclxuU0RQVXRpbHMucGFyc2VJY2VPcHRpb25zID0gZnVuY3Rpb24obGluZSkge1xuICByZXR1cm4gbGluZS5zdWJzdHIoMTQpLnNwbGl0KCcgJyk7XG59XG5cbi8vIFBhcnNlcyBhbiBydHBtYXAgbGluZSwgcmV0dXJucyBSVENSdHBDb2RkZWNQYXJhbWV0ZXJzLiBTYW1wbGUgaW5wdXQ6XG4vLyBhPXJ0cG1hcDoxMTEgb3B1cy80ODAwMC8yXG5TRFBVdGlscy5wYXJzZVJ0cE1hcCA9IGZ1bmN0aW9uKGxpbmUpIHtcbiAgdmFyIHBhcnRzID0gbGluZS5zdWJzdHIoOSkuc3BsaXQoJyAnKTtcbiAgdmFyIHBhcnNlZCA9IHtcbiAgICBwYXlsb2FkVHlwZTogcGFyc2VJbnQocGFydHMuc2hpZnQoKSwgMTApIC8vIHdhczogaWRcbiAgfTtcblxuICBwYXJ0cyA9IHBhcnRzWzBdLnNwbGl0KCcvJyk7XG5cbiAgcGFyc2VkLm5hbWUgPSBwYXJ0c1swXTtcbiAgcGFyc2VkLmNsb2NrUmF0ZSA9IHBhcnNlSW50KHBhcnRzWzFdLCAxMCk7IC8vIHdhczogY2xvY2tyYXRlXG4gIC8vIHdhczogY2hhbm5lbHNcbiAgcGFyc2VkLm51bUNoYW5uZWxzID0gcGFydHMubGVuZ3RoID09PSAzID8gcGFyc2VJbnQocGFydHNbMl0sIDEwKSA6IDE7XG4gIHJldHVybiBwYXJzZWQ7XG59O1xuXG4vLyBHZW5lcmF0ZSBhbiBhPXJ0cG1hcCBsaW5lIGZyb20gUlRDUnRwQ29kZWNDYXBhYmlsaXR5IG9yXG4vLyBSVENSdHBDb2RlY1BhcmFtZXRlcnMuXG5TRFBVdGlscy53cml0ZVJ0cE1hcCA9IGZ1bmN0aW9uKGNvZGVjKSB7XG4gIHZhciBwdCA9IGNvZGVjLnBheWxvYWRUeXBlO1xuICBpZiAoY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgIHB0ID0gY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGU7XG4gIH1cbiAgcmV0dXJuICdhPXJ0cG1hcDonICsgcHQgKyAnICcgKyBjb2RlYy5uYW1lICsgJy8nICsgY29kZWMuY2xvY2tSYXRlICtcbiAgICAgIChjb2RlYy5udW1DaGFubmVscyAhPT0gMSA/ICcvJyArIGNvZGVjLm51bUNoYW5uZWxzIDogJycpICsgJ1xcclxcbic7XG59O1xuXG4vLyBQYXJzZXMgYW4gYT1leHRtYXAgbGluZSAoaGVhZGVyZXh0ZW5zaW9uIGZyb20gUkZDIDUyODUpLiBTYW1wbGUgaW5wdXQ6XG4vLyBhPWV4dG1hcDoyIHVybjppZXRmOnBhcmFtczpydHAtaGRyZXh0OnRvZmZzZXRcbi8vIGE9ZXh0bWFwOjIvc2VuZG9ubHkgdXJuOmlldGY6cGFyYW1zOnJ0cC1oZHJleHQ6dG9mZnNldFxuU0RQVXRpbHMucGFyc2VFeHRtYXAgPSBmdW5jdGlvbihsaW5lKSB7XG4gIHZhciBwYXJ0cyA9IGxpbmUuc3Vic3RyKDkpLnNwbGl0KCcgJyk7XG4gIHJldHVybiB7XG4gICAgaWQ6IHBhcnNlSW50KHBhcnRzWzBdLCAxMCksXG4gICAgZGlyZWN0aW9uOiBwYXJ0c1swXS5pbmRleE9mKCcvJykgPiAwID8gcGFydHNbMF0uc3BsaXQoJy8nKVsxXSA6ICdzZW5kcmVjdicsXG4gICAgdXJpOiBwYXJ0c1sxXVxuICB9O1xufTtcblxuLy8gR2VuZXJhdGVzIGE9ZXh0bWFwIGxpbmUgZnJvbSBSVENSdHBIZWFkZXJFeHRlbnNpb25QYXJhbWV0ZXJzIG9yXG4vLyBSVENSdHBIZWFkZXJFeHRlbnNpb24uXG5TRFBVdGlscy53cml0ZUV4dG1hcCA9IGZ1bmN0aW9uKGhlYWRlckV4dGVuc2lvbikge1xuICByZXR1cm4gJ2E9ZXh0bWFwOicgKyAoaGVhZGVyRXh0ZW5zaW9uLmlkIHx8IGhlYWRlckV4dGVuc2lvbi5wcmVmZXJyZWRJZCkgK1xuICAgICAgKGhlYWRlckV4dGVuc2lvbi5kaXJlY3Rpb24gJiYgaGVhZGVyRXh0ZW5zaW9uLmRpcmVjdGlvbiAhPT0gJ3NlbmRyZWN2J1xuICAgICAgICAgID8gJy8nICsgaGVhZGVyRXh0ZW5zaW9uLmRpcmVjdGlvblxuICAgICAgICAgIDogJycpICtcbiAgICAgICcgJyArIGhlYWRlckV4dGVuc2lvbi51cmkgKyAnXFxyXFxuJztcbn07XG5cbi8vIFBhcnNlcyBhbiBmdG1wIGxpbmUsIHJldHVybnMgZGljdGlvbmFyeS4gU2FtcGxlIGlucHV0OlxuLy8gYT1mbXRwOjk2IHZicj1vbjtjbmc9b25cbi8vIEFsc28gZGVhbHMgd2l0aCB2YnI9b247IGNuZz1vblxuU0RQVXRpbHMucGFyc2VGbXRwID0gZnVuY3Rpb24obGluZSkge1xuICB2YXIgcGFyc2VkID0ge307XG4gIHZhciBrdjtcbiAgdmFyIHBhcnRzID0gbGluZS5zdWJzdHIobGluZS5pbmRleE9mKCcgJykgKyAxKS5zcGxpdCgnOycpO1xuICBmb3IgKHZhciBqID0gMDsgaiA8IHBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAga3YgPSBwYXJ0c1tqXS50cmltKCkuc3BsaXQoJz0nKTtcbiAgICBwYXJzZWRba3ZbMF0udHJpbSgpXSA9IGt2WzFdO1xuICB9XG4gIHJldHVybiBwYXJzZWQ7XG59O1xuXG4vLyBHZW5lcmF0ZXMgYW4gYT1mdG1wIGxpbmUgZnJvbSBSVENSdHBDb2RlY0NhcGFiaWxpdHkgb3IgUlRDUnRwQ29kZWNQYXJhbWV0ZXJzLlxuU0RQVXRpbHMud3JpdGVGbXRwID0gZnVuY3Rpb24oY29kZWMpIHtcbiAgdmFyIGxpbmUgPSAnJztcbiAgdmFyIHB0ID0gY29kZWMucGF5bG9hZFR5cGU7XG4gIGlmIChjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcHQgPSBjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZTtcbiAgfVxuICBpZiAoY29kZWMucGFyYW1ldGVycyAmJiBPYmplY3Qua2V5cyhjb2RlYy5wYXJhbWV0ZXJzKS5sZW5ndGgpIHtcbiAgICB2YXIgcGFyYW1zID0gW107XG4gICAgT2JqZWN0LmtleXMoY29kZWMucGFyYW1ldGVycykuZm9yRWFjaChmdW5jdGlvbihwYXJhbSkge1xuICAgICAgcGFyYW1zLnB1c2gocGFyYW0gKyAnPScgKyBjb2RlYy5wYXJhbWV0ZXJzW3BhcmFtXSk7XG4gICAgfSk7XG4gICAgbGluZSArPSAnYT1mbXRwOicgKyBwdCArICcgJyArIHBhcmFtcy5qb2luKCc7JykgKyAnXFxyXFxuJztcbiAgfVxuICByZXR1cm4gbGluZTtcbn07XG5cbi8vIFBhcnNlcyBhbiBydGNwLWZiIGxpbmUsIHJldHVybnMgUlRDUFJ0Y3BGZWVkYmFjayBvYmplY3QuIFNhbXBsZSBpbnB1dDpcbi8vIGE9cnRjcC1mYjo5OCBuYWNrIHJwc2lcblNEUFV0aWxzLnBhcnNlUnRjcEZiID0gZnVuY3Rpb24obGluZSkge1xuICB2YXIgcGFydHMgPSBsaW5lLnN1YnN0cihsaW5lLmluZGV4T2YoJyAnKSArIDEpLnNwbGl0KCcgJyk7XG4gIHJldHVybiB7XG4gICAgdHlwZTogcGFydHMuc2hpZnQoKSxcbiAgICBwYXJhbWV0ZXI6IHBhcnRzLmpvaW4oJyAnKVxuICB9O1xufTtcbi8vIEdlbmVyYXRlIGE9cnRjcC1mYiBsaW5lcyBmcm9tIFJUQ1J0cENvZGVjQ2FwYWJpbGl0eSBvciBSVENSdHBDb2RlY1BhcmFtZXRlcnMuXG5TRFBVdGlscy53cml0ZVJ0Y3BGYiA9IGZ1bmN0aW9uKGNvZGVjKSB7XG4gIHZhciBsaW5lcyA9ICcnO1xuICB2YXIgcHQgPSBjb2RlYy5wYXlsb2FkVHlwZTtcbiAgaWYgKGNvZGVjLnByZWZlcnJlZFBheWxvYWRUeXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICBwdCA9IGNvZGVjLnByZWZlcnJlZFBheWxvYWRUeXBlO1xuICB9XG4gIGlmIChjb2RlYy5ydGNwRmVlZGJhY2sgJiYgY29kZWMucnRjcEZlZWRiYWNrLmxlbmd0aCkge1xuICAgIC8vIEZJWE1FOiBzcGVjaWFsIGhhbmRsaW5nIGZvciB0cnItaW50P1xuICAgIGNvZGVjLnJ0Y3BGZWVkYmFjay5mb3JFYWNoKGZ1bmN0aW9uKGZiKSB7XG4gICAgICBsaW5lcyArPSAnYT1ydGNwLWZiOicgKyBwdCArICcgJyArIGZiLnR5cGUgK1xuICAgICAgKGZiLnBhcmFtZXRlciAmJiBmYi5wYXJhbWV0ZXIubGVuZ3RoID8gJyAnICsgZmIucGFyYW1ldGVyIDogJycpICtcbiAgICAgICAgICAnXFxyXFxuJztcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gbGluZXM7XG59O1xuXG4vLyBQYXJzZXMgYW4gUkZDIDU1NzYgc3NyYyBtZWRpYSBhdHRyaWJ1dGUuIFNhbXBsZSBpbnB1dDpcbi8vIGE9c3NyYzozNzM1OTI4NTU5IGNuYW1lOnNvbWV0aGluZ1xuU0RQVXRpbHMucGFyc2VTc3JjTWVkaWEgPSBmdW5jdGlvbihsaW5lKSB7XG4gIHZhciBzcCA9IGxpbmUuaW5kZXhPZignICcpO1xuICB2YXIgcGFydHMgPSB7XG4gICAgc3NyYzogcGFyc2VJbnQobGluZS5zdWJzdHIoNywgc3AgLSA3KSwgMTApXG4gIH07XG4gIHZhciBjb2xvbiA9IGxpbmUuaW5kZXhPZignOicsIHNwKTtcbiAgaWYgKGNvbG9uID4gLTEpIHtcbiAgICBwYXJ0cy5hdHRyaWJ1dGUgPSBsaW5lLnN1YnN0cihzcCArIDEsIGNvbG9uIC0gc3AgLSAxKTtcbiAgICBwYXJ0cy52YWx1ZSA9IGxpbmUuc3Vic3RyKGNvbG9uICsgMSk7XG4gIH0gZWxzZSB7XG4gICAgcGFydHMuYXR0cmlidXRlID0gbGluZS5zdWJzdHIoc3AgKyAxKTtcbiAgfVxuICByZXR1cm4gcGFydHM7XG59O1xuXG4vLyBFeHRyYWN0cyB0aGUgTUlEIChSRkMgNTg4OCkgZnJvbSBhIG1lZGlhIHNlY3Rpb24uXG4vLyByZXR1cm5zIHRoZSBNSUQgb3IgdW5kZWZpbmVkIGlmIG5vIG1pZCBsaW5lIHdhcyBmb3VuZC5cblNEUFV0aWxzLmdldE1pZCA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbikge1xuICB2YXIgbWlkID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1taWQ6JylbMF07XG4gIGlmIChtaWQpIHtcbiAgICByZXR1cm4gbWlkLnN1YnN0cig2KTtcbiAgfVxufVxuXG5TRFBVdGlscy5wYXJzZUZpbmdlcnByaW50ID0gZnVuY3Rpb24obGluZSkge1xuICB2YXIgcGFydHMgPSBsaW5lLnN1YnN0cigxNCkuc3BsaXQoJyAnKTtcbiAgcmV0dXJuIHtcbiAgICBhbGdvcml0aG06IHBhcnRzWzBdLnRvTG93ZXJDYXNlKCksIC8vIGFsZ29yaXRobSBpcyBjYXNlLXNlbnNpdGl2ZSBpbiBFZGdlLlxuICAgIHZhbHVlOiBwYXJ0c1sxXVxuICB9O1xufTtcblxuLy8gRXh0cmFjdHMgRFRMUyBwYXJhbWV0ZXJzIGZyb20gU0RQIG1lZGlhIHNlY3Rpb24gb3Igc2Vzc2lvbnBhcnQuXG4vLyBGSVhNRTogZm9yIGNvbnNpc3RlbmN5IHdpdGggb3RoZXIgZnVuY3Rpb25zIHRoaXMgc2hvdWxkIG9ubHlcbi8vICAgZ2V0IHRoZSBmaW5nZXJwcmludCBsaW5lIGFzIGlucHV0LiBTZWUgYWxzbyBnZXRJY2VQYXJhbWV0ZXJzLlxuU0RQVXRpbHMuZ2V0RHRsc1BhcmFtZXRlcnMgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24sIHNlc3Npb25wYXJ0KSB7XG4gIHZhciBsaW5lcyA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiArIHNlc3Npb25wYXJ0LFxuICAgICAgJ2E9ZmluZ2VycHJpbnQ6Jyk7XG4gIC8vIE5vdGU6IGE9c2V0dXAgbGluZSBpcyBpZ25vcmVkIHNpbmNlIHdlIHVzZSB0aGUgJ2F1dG8nIHJvbGUuXG4gIC8vIE5vdGUyOiAnYWxnb3JpdGhtJyBpcyBub3QgY2FzZSBzZW5zaXRpdmUgZXhjZXB0IGluIEVkZ2UuXG4gIHJldHVybiB7XG4gICAgcm9sZTogJ2F1dG8nLFxuICAgIGZpbmdlcnByaW50czogbGluZXMubWFwKFNEUFV0aWxzLnBhcnNlRmluZ2VycHJpbnQpXG4gIH07XG59O1xuXG4vLyBTZXJpYWxpemVzIERUTFMgcGFyYW1ldGVycyB0byBTRFAuXG5TRFBVdGlscy53cml0ZUR0bHNQYXJhbWV0ZXJzID0gZnVuY3Rpb24ocGFyYW1zLCBzZXR1cFR5cGUpIHtcbiAgdmFyIHNkcCA9ICdhPXNldHVwOicgKyBzZXR1cFR5cGUgKyAnXFxyXFxuJztcbiAgcGFyYW1zLmZpbmdlcnByaW50cy5mb3JFYWNoKGZ1bmN0aW9uKGZwKSB7XG4gICAgc2RwICs9ICdhPWZpbmdlcnByaW50OicgKyBmcC5hbGdvcml0aG0gKyAnICcgKyBmcC52YWx1ZSArICdcXHJcXG4nO1xuICB9KTtcbiAgcmV0dXJuIHNkcDtcbn07XG4vLyBQYXJzZXMgSUNFIGluZm9ybWF0aW9uIGZyb20gU0RQIG1lZGlhIHNlY3Rpb24gb3Igc2Vzc2lvbnBhcnQuXG4vLyBGSVhNRTogZm9yIGNvbnNpc3RlbmN5IHdpdGggb3RoZXIgZnVuY3Rpb25zIHRoaXMgc2hvdWxkIG9ubHlcbi8vICAgZ2V0IHRoZSBpY2UtdWZyYWcgYW5kIGljZS1wd2QgbGluZXMgYXMgaW5wdXQuXG5TRFBVdGlscy5nZXRJY2VQYXJhbWV0ZXJzID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uLCBzZXNzaW9ucGFydCkge1xuICB2YXIgbGluZXMgPSBTRFBVdGlscy5zcGxpdExpbmVzKG1lZGlhU2VjdGlvbik7XG4gIC8vIFNlYXJjaCBpbiBzZXNzaW9uIHBhcnQsIHRvby5cbiAgbGluZXMgPSBsaW5lcy5jb25jYXQoU0RQVXRpbHMuc3BsaXRMaW5lcyhzZXNzaW9ucGFydCkpO1xuICB2YXIgaWNlUGFyYW1ldGVycyA9IHtcbiAgICB1c2VybmFtZUZyYWdtZW50OiBsaW5lcy5maWx0ZXIoZnVuY3Rpb24obGluZSkge1xuICAgICAgcmV0dXJuIGxpbmUuaW5kZXhPZignYT1pY2UtdWZyYWc6JykgPT09IDA7XG4gICAgfSlbMF0uc3Vic3RyKDEyKSxcbiAgICBwYXNzd29yZDogbGluZXMuZmlsdGVyKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgIHJldHVybiBsaW5lLmluZGV4T2YoJ2E9aWNlLXB3ZDonKSA9PT0gMDtcbiAgICB9KVswXS5zdWJzdHIoMTApXG4gIH07XG4gIHJldHVybiBpY2VQYXJhbWV0ZXJzO1xufTtcblxuLy8gU2VyaWFsaXplcyBJQ0UgcGFyYW1ldGVycyB0byBTRFAuXG5TRFBVdGlscy53cml0ZUljZVBhcmFtZXRlcnMgPSBmdW5jdGlvbihwYXJhbXMpIHtcbiAgcmV0dXJuICdhPWljZS11ZnJhZzonICsgcGFyYW1zLnVzZXJuYW1lRnJhZ21lbnQgKyAnXFxyXFxuJyArXG4gICAgICAnYT1pY2UtcHdkOicgKyBwYXJhbXMucGFzc3dvcmQgKyAnXFxyXFxuJztcbn07XG5cbi8vIFBhcnNlcyB0aGUgU0RQIG1lZGlhIHNlY3Rpb24gYW5kIHJldHVybnMgUlRDUnRwUGFyYW1ldGVycy5cblNEUFV0aWxzLnBhcnNlUnRwUGFyYW1ldGVycyA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbikge1xuICB2YXIgZGVzY3JpcHRpb24gPSB7XG4gICAgY29kZWNzOiBbXSxcbiAgICBoZWFkZXJFeHRlbnNpb25zOiBbXSxcbiAgICBmZWNNZWNoYW5pc21zOiBbXSxcbiAgICBydGNwOiBbXVxuICB9O1xuICB2YXIgbGluZXMgPSBTRFBVdGlscy5zcGxpdExpbmVzKG1lZGlhU2VjdGlvbik7XG4gIHZhciBtbGluZSA9IGxpbmVzWzBdLnNwbGl0KCcgJyk7XG4gIGZvciAodmFyIGkgPSAzOyBpIDwgbWxpbmUubGVuZ3RoOyBpKyspIHsgLy8gZmluZCBhbGwgY29kZWNzIGZyb20gbWxpbmVbMy4uXVxuICAgIHZhciBwdCA9IG1saW5lW2ldO1xuICAgIHZhciBydHBtYXBsaW5lID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgoXG4gICAgICAgIG1lZGlhU2VjdGlvbiwgJ2E9cnRwbWFwOicgKyBwdCArICcgJylbMF07XG4gICAgaWYgKHJ0cG1hcGxpbmUpIHtcbiAgICAgIHZhciBjb2RlYyA9IFNEUFV0aWxzLnBhcnNlUnRwTWFwKHJ0cG1hcGxpbmUpO1xuICAgICAgdmFyIGZtdHBzID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgoXG4gICAgICAgICAgbWVkaWFTZWN0aW9uLCAnYT1mbXRwOicgKyBwdCArICcgJyk7XG4gICAgICAvLyBPbmx5IHRoZSBmaXJzdCBhPWZtdHA6PHB0PiBpcyBjb25zaWRlcmVkLlxuICAgICAgY29kZWMucGFyYW1ldGVycyA9IGZtdHBzLmxlbmd0aCA/IFNEUFV0aWxzLnBhcnNlRm10cChmbXRwc1swXSkgOiB7fTtcbiAgICAgIGNvZGVjLnJ0Y3BGZWVkYmFjayA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KFxuICAgICAgICAgIG1lZGlhU2VjdGlvbiwgJ2E9cnRjcC1mYjonICsgcHQgKyAnICcpXG4gICAgICAgIC5tYXAoU0RQVXRpbHMucGFyc2VSdGNwRmIpO1xuICAgICAgZGVzY3JpcHRpb24uY29kZWNzLnB1c2goY29kZWMpO1xuICAgICAgLy8gcGFyc2UgRkVDIG1lY2hhbmlzbXMgZnJvbSBydHBtYXAgbGluZXMuXG4gICAgICBzd2l0Y2ggKGNvZGVjLm5hbWUudG9VcHBlckNhc2UoKSkge1xuICAgICAgICBjYXNlICdSRUQnOlxuICAgICAgICBjYXNlICdVTFBGRUMnOlxuICAgICAgICAgIGRlc2NyaXB0aW9uLmZlY01lY2hhbmlzbXMucHVzaChjb2RlYy5uYW1lLnRvVXBwZXJDYXNlKCkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OiAvLyBvbmx5IFJFRCBhbmQgVUxQRkVDIGFyZSByZWNvZ25pemVkIGFzIEZFQyBtZWNoYW5pc21zLlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPWV4dG1hcDonKS5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICBkZXNjcmlwdGlvbi5oZWFkZXJFeHRlbnNpb25zLnB1c2goU0RQVXRpbHMucGFyc2VFeHRtYXAobGluZSkpO1xuICB9KTtcbiAgLy8gRklYTUU6IHBhcnNlIHJ0Y3AuXG4gIHJldHVybiBkZXNjcmlwdGlvbjtcbn07XG5cbi8vIEdlbmVyYXRlcyBwYXJ0cyBvZiB0aGUgU0RQIG1lZGlhIHNlY3Rpb24gZGVzY3JpYmluZyB0aGUgY2FwYWJpbGl0aWVzIC9cbi8vIHBhcmFtZXRlcnMuXG5TRFBVdGlscy53cml0ZVJ0cERlc2NyaXB0aW9uID0gZnVuY3Rpb24oa2luZCwgY2Fwcykge1xuICB2YXIgc2RwID0gJyc7XG5cbiAgLy8gQnVpbGQgdGhlIG1saW5lLlxuICBzZHAgKz0gJ209JyArIGtpbmQgKyAnICc7XG4gIHNkcCArPSBjYXBzLmNvZGVjcy5sZW5ndGggPiAwID8gJzknIDogJzAnOyAvLyByZWplY3QgaWYgbm8gY29kZWNzLlxuICBzZHAgKz0gJyBVRFAvVExTL1JUUC9TQVZQRiAnO1xuICBzZHAgKz0gY2Fwcy5jb2RlY3MubWFwKGZ1bmN0aW9uKGNvZGVjKSB7XG4gICAgaWYgKGNvZGVjLnByZWZlcnJlZFBheWxvYWRUeXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZTtcbiAgICB9XG4gICAgcmV0dXJuIGNvZGVjLnBheWxvYWRUeXBlO1xuICB9KS5qb2luKCcgJykgKyAnXFxyXFxuJztcblxuICBzZHAgKz0gJ2M9SU4gSVA0IDAuMC4wLjBcXHJcXG4nO1xuICBzZHAgKz0gJ2E9cnRjcDo5IElOIElQNCAwLjAuMC4wXFxyXFxuJztcblxuICAvLyBBZGQgYT1ydHBtYXAgbGluZXMgZm9yIGVhY2ggY29kZWMuIEFsc28gZm10cCBhbmQgcnRjcC1mYi5cbiAgY2Fwcy5jb2RlY3MuZm9yRWFjaChmdW5jdGlvbihjb2RlYykge1xuICAgIHNkcCArPSBTRFBVdGlscy53cml0ZVJ0cE1hcChjb2RlYyk7XG4gICAgc2RwICs9IFNEUFV0aWxzLndyaXRlRm10cChjb2RlYyk7XG4gICAgc2RwICs9IFNEUFV0aWxzLndyaXRlUnRjcEZiKGNvZGVjKTtcbiAgfSk7XG4gIHZhciBtYXhwdGltZSA9IDA7XG4gIGNhcHMuY29kZWNzLmZvckVhY2goZnVuY3Rpb24oY29kZWMpIHtcbiAgICBpZiAoY29kZWMubWF4cHRpbWUgPiBtYXhwdGltZSkge1xuICAgICAgbWF4cHRpbWUgPSBjb2RlYy5tYXhwdGltZTtcbiAgICB9XG4gIH0pO1xuICBpZiAobWF4cHRpbWUgPiAwKSB7XG4gICAgc2RwICs9ICdhPW1heHB0aW1lOicgKyBtYXhwdGltZSArICdcXHJcXG4nO1xuICB9XG4gIHNkcCArPSAnYT1ydGNwLW11eFxcclxcbic7XG5cbiAgY2Fwcy5oZWFkZXJFeHRlbnNpb25zLmZvckVhY2goZnVuY3Rpb24oZXh0ZW5zaW9uKSB7XG4gICAgc2RwICs9IFNEUFV0aWxzLndyaXRlRXh0bWFwKGV4dGVuc2lvbik7XG4gIH0pO1xuICAvLyBGSVhNRTogd3JpdGUgZmVjTWVjaGFuaXNtcy5cbiAgcmV0dXJuIHNkcDtcbn07XG5cbi8vIFBhcnNlcyB0aGUgU0RQIG1lZGlhIHNlY3Rpb24gYW5kIHJldHVybnMgYW4gYXJyYXkgb2Zcbi8vIFJUQ1J0cEVuY29kaW5nUGFyYW1ldGVycy5cblNEUFV0aWxzLnBhcnNlUnRwRW5jb2RpbmdQYXJhbWV0ZXJzID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XG4gIHZhciBlbmNvZGluZ1BhcmFtZXRlcnMgPSBbXTtcbiAgdmFyIGRlc2NyaXB0aW9uID0gU0RQVXRpbHMucGFyc2VSdHBQYXJhbWV0ZXJzKG1lZGlhU2VjdGlvbik7XG4gIHZhciBoYXNSZWQgPSBkZXNjcmlwdGlvbi5mZWNNZWNoYW5pc21zLmluZGV4T2YoJ1JFRCcpICE9PSAtMTtcbiAgdmFyIGhhc1VscGZlYyA9IGRlc2NyaXB0aW9uLmZlY01lY2hhbmlzbXMuaW5kZXhPZignVUxQRkVDJykgIT09IC0xO1xuXG4gIC8vIGZpbHRlciBhPXNzcmM6Li4uIGNuYW1lOiwgaWdub3JlIFBsYW5CLW1zaWRcbiAgdmFyIHNzcmNzID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1zc3JjOicpXG4gIC5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgIHJldHVybiBTRFBVdGlscy5wYXJzZVNzcmNNZWRpYShsaW5lKTtcbiAgfSlcbiAgLmZpbHRlcihmdW5jdGlvbihwYXJ0cykge1xuICAgIHJldHVybiBwYXJ0cy5hdHRyaWJ1dGUgPT09ICdjbmFtZSc7XG4gIH0pO1xuICB2YXIgcHJpbWFyeVNzcmMgPSBzc3Jjcy5sZW5ndGggPiAwICYmIHNzcmNzWzBdLnNzcmM7XG4gIHZhciBzZWNvbmRhcnlTc3JjO1xuXG4gIHZhciBmbG93cyA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9c3NyYy1ncm91cDpGSUQnKVxuICAubWFwKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICB2YXIgcGFydHMgPSBsaW5lLnNwbGl0KCcgJyk7XG4gICAgcGFydHMuc2hpZnQoKTtcbiAgICByZXR1cm4gcGFydHMubWFwKGZ1bmN0aW9uKHBhcnQpIHtcbiAgICAgIHJldHVybiBwYXJzZUludChwYXJ0LCAxMCk7XG4gICAgfSk7XG4gIH0pO1xuICBpZiAoZmxvd3MubGVuZ3RoID4gMCAmJiBmbG93c1swXS5sZW5ndGggPiAxICYmIGZsb3dzWzBdWzBdID09PSBwcmltYXJ5U3NyYykge1xuICAgIHNlY29uZGFyeVNzcmMgPSBmbG93c1swXVsxXTtcbiAgfVxuXG4gIGRlc2NyaXB0aW9uLmNvZGVjcy5mb3JFYWNoKGZ1bmN0aW9uKGNvZGVjKSB7XG4gICAgaWYgKGNvZGVjLm5hbWUudG9VcHBlckNhc2UoKSA9PT0gJ1JUWCcgJiYgY29kZWMucGFyYW1ldGVycy5hcHQpIHtcbiAgICAgIHZhciBlbmNQYXJhbSA9IHtcbiAgICAgICAgc3NyYzogcHJpbWFyeVNzcmMsXG4gICAgICAgIGNvZGVjUGF5bG9hZFR5cGU6IHBhcnNlSW50KGNvZGVjLnBhcmFtZXRlcnMuYXB0LCAxMCksXG4gICAgICAgIHJ0eDoge1xuICAgICAgICAgIHNzcmM6IHNlY29uZGFyeVNzcmNcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGVuY29kaW5nUGFyYW1ldGVycy5wdXNoKGVuY1BhcmFtKTtcbiAgICAgIGlmIChoYXNSZWQpIHtcbiAgICAgICAgZW5jUGFyYW0gPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGVuY1BhcmFtKSk7XG4gICAgICAgIGVuY1BhcmFtLmZlYyA9IHtcbiAgICAgICAgICBzc3JjOiBzZWNvbmRhcnlTc3JjLFxuICAgICAgICAgIG1lY2hhbmlzbTogaGFzVWxwZmVjID8gJ3JlZCt1bHBmZWMnIDogJ3JlZCdcbiAgICAgICAgfTtcbiAgICAgICAgZW5jb2RpbmdQYXJhbWV0ZXJzLnB1c2goZW5jUGFyYW0pO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIGlmIChlbmNvZGluZ1BhcmFtZXRlcnMubGVuZ3RoID09PSAwICYmIHByaW1hcnlTc3JjKSB7XG4gICAgZW5jb2RpbmdQYXJhbWV0ZXJzLnB1c2goe1xuICAgICAgc3NyYzogcHJpbWFyeVNzcmNcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHdlIHN1cHBvcnQgYm90aCBiPUFTIGFuZCBiPVRJQVMgYnV0IGludGVycHJldCBBUyBhcyBUSUFTLlxuICB2YXIgYmFuZHdpZHRoID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYj0nKTtcbiAgaWYgKGJhbmR3aWR0aC5sZW5ndGgpIHtcbiAgICBpZiAoYmFuZHdpZHRoWzBdLmluZGV4T2YoJ2I9VElBUzonKSA9PT0gMCkge1xuICAgICAgYmFuZHdpZHRoID0gcGFyc2VJbnQoYmFuZHdpZHRoWzBdLnN1YnN0cig3KSwgMTApO1xuICAgIH0gZWxzZSBpZiAoYmFuZHdpZHRoWzBdLmluZGV4T2YoJ2I9QVM6JykgPT09IDApIHtcbiAgICAgIC8vIHVzZSBmb3JtdWxhIGZyb20gSlNFUCB0byBjb252ZXJ0IGI9QVMgdG8gVElBUyB2YWx1ZS5cbiAgICAgIGJhbmR3aWR0aCA9IHBhcnNlSW50KGJhbmR3aWR0aFswXS5zdWJzdHIoNSksIDEwKSAqIDEwMDAgKiAwLjk1XG4gICAgICAgICAgLSAoNTAgKiA0MCAqIDgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBiYW5kd2lkdGggPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGVuY29kaW5nUGFyYW1ldGVycy5mb3JFYWNoKGZ1bmN0aW9uKHBhcmFtcykge1xuICAgICAgcGFyYW1zLm1heEJpdHJhdGUgPSBiYW5kd2lkdGg7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIGVuY29kaW5nUGFyYW1ldGVycztcbn07XG5cbi8vIHBhcnNlcyBodHRwOi8vZHJhZnQub3J0Yy5vcmcvI3J0Y3J0Y3BwYXJhbWV0ZXJzKlxuU0RQVXRpbHMucGFyc2VSdGNwUGFyYW1ldGVycyA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbikge1xuICB2YXIgcnRjcFBhcmFtZXRlcnMgPSB7fTtcblxuICB2YXIgY25hbWU7XG4gIC8vIEdldHMgdGhlIGZpcnN0IFNTUkMuIE5vdGUgdGhhdCB3aXRoIFJUWCB0aGVyZSBtaWdodCBiZSBtdWx0aXBsZVxuICAvLyBTU1JDcy5cbiAgdmFyIHJlbW90ZVNzcmMgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPXNzcmM6JylcbiAgICAgIC5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgICAgICByZXR1cm4gU0RQVXRpbHMucGFyc2VTc3JjTWVkaWEobGluZSk7XG4gICAgICB9KVxuICAgICAgLmZpbHRlcihmdW5jdGlvbihvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iai5hdHRyaWJ1dGUgPT09ICdjbmFtZSc7XG4gICAgICB9KVswXTtcbiAgaWYgKHJlbW90ZVNzcmMpIHtcbiAgICBydGNwUGFyYW1ldGVycy5jbmFtZSA9IHJlbW90ZVNzcmMudmFsdWU7XG4gICAgcnRjcFBhcmFtZXRlcnMuc3NyYyA9IHJlbW90ZVNzcmMuc3NyYztcbiAgfVxuXG4gIC8vIEVkZ2UgdXNlcyB0aGUgY29tcG91bmQgYXR0cmlidXRlIGluc3RlYWQgb2YgcmVkdWNlZFNpemVcbiAgLy8gY29tcG91bmQgaXMgIXJlZHVjZWRTaXplXG4gIHZhciByc2l6ZSA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9cnRjcC1yc2l6ZScpO1xuICBydGNwUGFyYW1ldGVycy5yZWR1Y2VkU2l6ZSA9IHJzaXplLmxlbmd0aCA+IDA7XG4gIHJ0Y3BQYXJhbWV0ZXJzLmNvbXBvdW5kID0gcnNpemUubGVuZ3RoID09PSAwO1xuXG4gIC8vIHBhcnNlcyB0aGUgcnRjcC1tdXggYXR0ctGWYnV0ZS5cbiAgLy8gTm90ZSB0aGF0IEVkZ2UgZG9lcyBub3Qgc3VwcG9ydCB1bm11eGVkIFJUQ1AuXG4gIHZhciBtdXggPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPXJ0Y3AtbXV4Jyk7XG4gIHJ0Y3BQYXJhbWV0ZXJzLm11eCA9IG11eC5sZW5ndGggPiAwO1xuXG4gIHJldHVybiBydGNwUGFyYW1ldGVycztcbn07XG5cbi8vIHBhcnNlcyBlaXRoZXIgYT1tc2lkOiBvciBhPXNzcmM6Li4uIG1zaWQgbGluZXMgYW5kIHJldHVybnNcbi8vIHRoZSBpZCBvZiB0aGUgTWVkaWFTdHJlYW0gYW5kIE1lZGlhU3RyZWFtVHJhY2suXG5TRFBVdGlscy5wYXJzZU1zaWQgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcbiAgdmFyIHBhcnRzO1xuICB2YXIgc3BlYyA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9bXNpZDonKTtcbiAgaWYgKHNwZWMubGVuZ3RoID09PSAxKSB7XG4gICAgcGFydHMgPSBzcGVjWzBdLnN1YnN0cig3KS5zcGxpdCgnICcpO1xuICAgIHJldHVybiB7c3RyZWFtOiBwYXJ0c1swXSwgdHJhY2s6IHBhcnRzWzFdfTtcbiAgfVxuICB2YXIgcGxhbkIgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPXNzcmM6JylcbiAgLm1hcChmdW5jdGlvbihsaW5lKSB7XG4gICAgcmV0dXJuIFNEUFV0aWxzLnBhcnNlU3NyY01lZGlhKGxpbmUpO1xuICB9KVxuICAuZmlsdGVyKGZ1bmN0aW9uKHBhcnRzKSB7XG4gICAgcmV0dXJuIHBhcnRzLmF0dHJpYnV0ZSA9PT0gJ21zaWQnO1xuICB9KTtcbiAgaWYgKHBsYW5CLmxlbmd0aCA+IDApIHtcbiAgICBwYXJ0cyA9IHBsYW5CWzBdLnZhbHVlLnNwbGl0KCcgJyk7XG4gICAgcmV0dXJuIHtzdHJlYW06IHBhcnRzWzBdLCB0cmFjazogcGFydHNbMV19O1xuICB9XG59O1xuXG4vLyBHZW5lcmF0ZSBhIHNlc3Npb24gSUQgZm9yIFNEUC5cbi8vIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9kcmFmdC1pZXRmLXJ0Y3dlYi1qc2VwLTIwI3NlY3Rpb24tNS4yLjFcbi8vIHJlY29tbWVuZHMgdXNpbmcgYSBjcnlwdG9ncmFwaGljYWxseSByYW5kb20gK3ZlIDY0LWJpdCB2YWx1ZVxuLy8gYnV0IHJpZ2h0IG5vdyB0aGlzIHNob3VsZCBiZSBhY2NlcHRhYmxlIGFuZCB3aXRoaW4gdGhlIHJpZ2h0IHJhbmdlXG5TRFBVdGlscy5nZW5lcmF0ZVNlc3Npb25JZCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygpLnN1YnN0cigyLCAyMSk7XG59O1xuXG4vLyBXcml0ZSBib2lsZGVyIHBsYXRlIGZvciBzdGFydCBvZiBTRFBcbi8vIHNlc3NJZCBhcmd1bWVudCBpcyBvcHRpb25hbCAtIGlmIG5vdCBzdXBwbGllZCBpdCB3aWxsXG4vLyBiZSBnZW5lcmF0ZWQgcmFuZG9tbHlcbi8vIHNlc3NWZXJzaW9uIGlzIG9wdGlvbmFsIGFuZCBkZWZhdWx0cyB0byAyXG5TRFBVdGlscy53cml0ZVNlc3Npb25Cb2lsZXJwbGF0ZSA9IGZ1bmN0aW9uKHNlc3NJZCwgc2Vzc1Zlcikge1xuICB2YXIgc2Vzc2lvbklkO1xuICB2YXIgdmVyc2lvbiA9IHNlc3NWZXIgIT09IHVuZGVmaW5lZCA/IHNlc3NWZXIgOiAyO1xuICBpZiAoc2Vzc0lkKSB7XG4gICAgc2Vzc2lvbklkID0gc2Vzc0lkO1xuICB9IGVsc2Uge1xuICAgIHNlc3Npb25JZCA9IFNEUFV0aWxzLmdlbmVyYXRlU2Vzc2lvbklkKCk7XG4gIH1cbiAgLy8gRklYTUU6IHNlc3MtaWQgc2hvdWxkIGJlIGFuIE5UUCB0aW1lc3RhbXAuXG4gIHJldHVybiAndj0wXFxyXFxuJyArXG4gICAgICAnbz10aGlzaXNhZGFwdGVyb3J0YyAnICsgc2Vzc2lvbklkICsgJyAnICsgdmVyc2lvbiArICcgSU4gSVA0IDEyNy4wLjAuMVxcclxcbicgK1xuICAgICAgJ3M9LVxcclxcbicgK1xuICAgICAgJ3Q9MCAwXFxyXFxuJztcbn07XG5cblNEUFV0aWxzLndyaXRlTWVkaWFTZWN0aW9uID0gZnVuY3Rpb24odHJhbnNjZWl2ZXIsIGNhcHMsIHR5cGUsIHN0cmVhbSkge1xuICB2YXIgc2RwID0gU0RQVXRpbHMud3JpdGVSdHBEZXNjcmlwdGlvbih0cmFuc2NlaXZlci5raW5kLCBjYXBzKTtcblxuICAvLyBNYXAgSUNFIHBhcmFtZXRlcnMgKHVmcmFnLCBwd2QpIHRvIFNEUC5cbiAgc2RwICs9IFNEUFV0aWxzLndyaXRlSWNlUGFyYW1ldGVycyhcbiAgICAgIHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyLmdldExvY2FsUGFyYW1ldGVycygpKTtcblxuICAvLyBNYXAgRFRMUyBwYXJhbWV0ZXJzIHRvIFNEUC5cbiAgc2RwICs9IFNEUFV0aWxzLndyaXRlRHRsc1BhcmFtZXRlcnMoXG4gICAgICB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0LmdldExvY2FsUGFyYW1ldGVycygpLFxuICAgICAgdHlwZSA9PT0gJ29mZmVyJyA/ICdhY3RwYXNzJyA6ICdhY3RpdmUnKTtcblxuICBzZHAgKz0gJ2E9bWlkOicgKyB0cmFuc2NlaXZlci5taWQgKyAnXFxyXFxuJztcblxuICBpZiAodHJhbnNjZWl2ZXIuZGlyZWN0aW9uKSB7XG4gICAgc2RwICs9ICdhPScgKyB0cmFuc2NlaXZlci5kaXJlY3Rpb24gKyAnXFxyXFxuJztcbiAgfSBlbHNlIGlmICh0cmFuc2NlaXZlci5ydHBTZW5kZXIgJiYgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIpIHtcbiAgICBzZHAgKz0gJ2E9c2VuZHJlY3ZcXHJcXG4nO1xuICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlcikge1xuICAgIHNkcCArPSAnYT1zZW5kb25seVxcclxcbic7XG4gIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIpIHtcbiAgICBzZHAgKz0gJ2E9cmVjdm9ubHlcXHJcXG4nO1xuICB9IGVsc2Uge1xuICAgIHNkcCArPSAnYT1pbmFjdGl2ZVxcclxcbic7XG4gIH1cblxuICBpZiAodHJhbnNjZWl2ZXIucnRwU2VuZGVyKSB7XG4gICAgLy8gc3BlYy5cbiAgICB2YXIgbXNpZCA9ICdtc2lkOicgKyBzdHJlYW0uaWQgKyAnICcgK1xuICAgICAgICB0cmFuc2NlaXZlci5ydHBTZW5kZXIudHJhY2suaWQgKyAnXFxyXFxuJztcbiAgICBzZHAgKz0gJ2E9JyArIG1zaWQ7XG5cbiAgICAvLyBmb3IgQ2hyb21lLlxuICAgIHNkcCArPSAnYT1zc3JjOicgKyB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmMgK1xuICAgICAgICAnICcgKyBtc2lkO1xuICAgIGlmICh0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCkge1xuICAgICAgc2RwICs9ICdhPXNzcmM6JyArIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4LnNzcmMgK1xuICAgICAgICAgICcgJyArIG1zaWQ7XG4gICAgICBzZHAgKz0gJ2E9c3NyYy1ncm91cDpGSUQgJyArXG4gICAgICAgICAgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjICsgJyAnICtcbiAgICAgICAgICB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eC5zc3JjICtcbiAgICAgICAgICAnXFxyXFxuJztcbiAgICB9XG4gIH1cbiAgLy8gRklYTUU6IHRoaXMgc2hvdWxkIGJlIHdyaXR0ZW4gYnkgd3JpdGVSdHBEZXNjcmlwdGlvbi5cbiAgc2RwICs9ICdhPXNzcmM6JyArIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYyArXG4gICAgICAnIGNuYW1lOicgKyBTRFBVdGlscy5sb2NhbENOYW1lICsgJ1xcclxcbic7XG4gIGlmICh0cmFuc2NlaXZlci5ydHBTZW5kZXIgJiYgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHgpIHtcbiAgICBzZHAgKz0gJ2E9c3NyYzonICsgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHguc3NyYyArXG4gICAgICAgICcgY25hbWU6JyArIFNEUFV0aWxzLmxvY2FsQ05hbWUgKyAnXFxyXFxuJztcbiAgfVxuICByZXR1cm4gc2RwO1xufTtcblxuLy8gR2V0cyB0aGUgZGlyZWN0aW9uIGZyb20gdGhlIG1lZGlhU2VjdGlvbiBvciB0aGUgc2Vzc2lvbnBhcnQuXG5TRFBVdGlscy5nZXREaXJlY3Rpb24gPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24sIHNlc3Npb25wYXJ0KSB7XG4gIC8vIExvb2sgZm9yIHNlbmRyZWN2LCBzZW5kb25seSwgcmVjdm9ubHksIGluYWN0aXZlLCBkZWZhdWx0IHRvIHNlbmRyZWN2LlxuICB2YXIgbGluZXMgPSBTRFBVdGlscy5zcGxpdExpbmVzKG1lZGlhU2VjdGlvbik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICBzd2l0Y2ggKGxpbmVzW2ldKSB7XG4gICAgICBjYXNlICdhPXNlbmRyZWN2JzpcbiAgICAgIGNhc2UgJ2E9c2VuZG9ubHknOlxuICAgICAgY2FzZSAnYT1yZWN2b25seSc6XG4gICAgICBjYXNlICdhPWluYWN0aXZlJzpcbiAgICAgICAgcmV0dXJuIGxpbmVzW2ldLnN1YnN0cigyKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIEZJWE1FOiBXaGF0IHNob3VsZCBoYXBwZW4gaGVyZT9cbiAgICB9XG4gIH1cbiAgaWYgKHNlc3Npb25wYXJ0KSB7XG4gICAgcmV0dXJuIFNEUFV0aWxzLmdldERpcmVjdGlvbihzZXNzaW9ucGFydCk7XG4gIH1cbiAgcmV0dXJuICdzZW5kcmVjdic7XG59O1xuXG5TRFBVdGlscy5nZXRLaW5kID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XG4gIHZhciBsaW5lcyA9IFNEUFV0aWxzLnNwbGl0TGluZXMobWVkaWFTZWN0aW9uKTtcbiAgdmFyIG1saW5lID0gbGluZXNbMF0uc3BsaXQoJyAnKTtcbiAgcmV0dXJuIG1saW5lWzBdLnN1YnN0cigyKTtcbn07XG5cblNEUFV0aWxzLmlzUmVqZWN0ZWQgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcbiAgcmV0dXJuIG1lZGlhU2VjdGlvbi5zcGxpdCgnICcsIDIpWzFdID09PSAnMCc7XG59O1xuXG5TRFBVdGlscy5wYXJzZU1MaW5lID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XG4gIHZhciBsaW5lcyA9IFNEUFV0aWxzLnNwbGl0TGluZXMobWVkaWFTZWN0aW9uKTtcbiAgdmFyIHBhcnRzID0gbGluZXNbMF0uc3Vic3RyKDIpLnNwbGl0KCcgJyk7XG4gIHJldHVybiB7XG4gICAga2luZDogcGFydHNbMF0sXG4gICAgcG9ydDogcGFyc2VJbnQocGFydHNbMV0sIDEwKSxcbiAgICBwcm90b2NvbDogcGFydHNbMl0sXG4gICAgZm10OiBwYXJ0cy5zbGljZSgzKS5qb2luKCcgJylcbiAgfTtcbn07XG5cblNEUFV0aWxzLnBhcnNlT0xpbmUgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcbiAgdmFyIGxpbmUgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdvPScpWzBdO1xuICB2YXIgcGFydHMgPSBsaW5lLnN1YnN0cigyKS5zcGxpdCgnICcpO1xuICByZXR1cm4ge1xuICAgIHVzZXJuYW1lOiBwYXJ0c1swXSxcbiAgICBzZXNzaW9uSWQ6IHBhcnRzWzFdLFxuICAgIHNlc3Npb25WZXJzaW9uOiBwYXJzZUludChwYXJ0c1syXSwgMTApLFxuICAgIG5ldFR5cGU6IHBhcnRzWzNdLFxuICAgIGFkZHJlc3NUeXBlOiBwYXJ0c1s0XSxcbiAgICBhZGRyZXNzOiBwYXJ0c1s1XSxcbiAgfTtcbn1cblxuLy8gRXhwb3NlIHB1YmxpYyBtZXRob2RzLlxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gU0RQVXRpbHM7XG59XG5cbn0se31dLDM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uIChnbG9iYWwpe1xuLypcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcbiAqICB0cmVlLlxuICovXG4gLyogZXNsaW50LWVudiBub2RlICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGFkYXB0ZXJGYWN0b3J5ID0gcmVxdWlyZSgnLi9hZGFwdGVyX2ZhY3RvcnkuanMnKTtcbm1vZHVsZS5leHBvcnRzID0gYWRhcHRlckZhY3Rvcnkoe3dpbmRvdzogZ2xvYmFsLndpbmRvd30pO1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbn0se1wiLi9hZGFwdGVyX2ZhY3RvcnkuanNcIjo0fV0sNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vKlxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxuICogIHRyZWUuXG4gKi9cbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG4vLyBTaGltbWluZyBzdGFydHMgaGVyZS5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZGVwZW5kZW5jaWVzLCBvcHRzKSB7XG4gIHZhciB3aW5kb3cgPSBkZXBlbmRlbmNpZXMgJiYgZGVwZW5kZW5jaWVzLndpbmRvdztcblxuICB2YXIgb3B0aW9ucyA9IHtcbiAgICBzaGltQ2hyb21lOiB0cnVlLFxuICAgIHNoaW1GaXJlZm94OiB0cnVlLFxuICAgIHNoaW1FZGdlOiB0cnVlLFxuICAgIHNoaW1TYWZhcmk6IHRydWUsXG4gIH07XG5cbiAgZm9yICh2YXIga2V5IGluIG9wdHMpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvcHRzLCBrZXkpKSB7XG4gICAgICBvcHRpb25zW2tleV0gPSBvcHRzW2tleV07XG4gICAgfVxuICB9XG5cbiAgLy8gVXRpbHMuXG4gIHZhciBsb2dnaW5nID0gdXRpbHMubG9nO1xuICB2YXIgYnJvd3NlckRldGFpbHMgPSB1dGlscy5kZXRlY3RCcm93c2VyKHdpbmRvdyk7XG5cbiAgLy8gVW5jb21tZW50IHRoZSBsaW5lIGJlbG93IGlmIHlvdSB3YW50IGxvZ2dpbmcgdG8gb2NjdXIsIGluY2x1ZGluZyBsb2dnaW5nXG4gIC8vIGZvciB0aGUgc3dpdGNoIHN0YXRlbWVudCBiZWxvdy4gQ2FuIGFsc28gYmUgdHVybmVkIG9uIGluIHRoZSBicm93c2VyIHZpYVxuICAvLyBhZGFwdGVyLmRpc2FibGVMb2coZmFsc2UpLCBidXQgdGhlbiBsb2dnaW5nIGZyb20gdGhlIHN3aXRjaCBzdGF0ZW1lbnQgYmVsb3dcbiAgLy8gd2lsbCBub3QgYXBwZWFyLlxuICAvLyByZXF1aXJlKCcuL3V0aWxzJykuZGlzYWJsZUxvZyhmYWxzZSk7XG5cbiAgLy8gQnJvd3NlciBzaGltcy5cbiAgdmFyIGNocm9tZVNoaW0gPSByZXF1aXJlKCcuL2Nocm9tZS9jaHJvbWVfc2hpbScpIHx8IG51bGw7XG4gIHZhciBlZGdlU2hpbSA9IHJlcXVpcmUoJy4vZWRnZS9lZGdlX3NoaW0nKSB8fCBudWxsO1xuICB2YXIgZmlyZWZveFNoaW0gPSByZXF1aXJlKCcuL2ZpcmVmb3gvZmlyZWZveF9zaGltJykgfHwgbnVsbDtcbiAgdmFyIHNhZmFyaVNoaW0gPSByZXF1aXJlKCcuL3NhZmFyaS9zYWZhcmlfc2hpbScpIHx8IG51bGw7XG4gIHZhciBjb21tb25TaGltID0gcmVxdWlyZSgnLi9jb21tb25fc2hpbScpIHx8IG51bGw7XG5cbiAgLy8gRXhwb3J0IHRvIHRoZSBhZGFwdGVyIGdsb2JhbCBvYmplY3QgdmlzaWJsZSBpbiB0aGUgYnJvd3Nlci5cbiAgdmFyIGFkYXB0ZXIgPSB7XG4gICAgYnJvd3NlckRldGFpbHM6IGJyb3dzZXJEZXRhaWxzLFxuICAgIGNvbW1vblNoaW06IGNvbW1vblNoaW0sXG4gICAgZXh0cmFjdFZlcnNpb246IHV0aWxzLmV4dHJhY3RWZXJzaW9uLFxuICAgIGRpc2FibGVMb2c6IHV0aWxzLmRpc2FibGVMb2csXG4gICAgZGlzYWJsZVdhcm5pbmdzOiB1dGlscy5kaXNhYmxlV2FybmluZ3NcbiAgfTtcblxuICAvLyBTaGltIGJyb3dzZXIgaWYgZm91bmQuXG4gIHN3aXRjaCAoYnJvd3NlckRldGFpbHMuYnJvd3Nlcikge1xuICAgIGNhc2UgJ2Nocm9tZSc6XG4gICAgICBpZiAoIWNocm9tZVNoaW0gfHwgIWNocm9tZVNoaW0uc2hpbVBlZXJDb25uZWN0aW9uIHx8XG4gICAgICAgICAgIW9wdGlvbnMuc2hpbUNocm9tZSkge1xuICAgICAgICBsb2dnaW5nKCdDaHJvbWUgc2hpbSBpcyBub3QgaW5jbHVkZWQgaW4gdGhpcyBhZGFwdGVyIHJlbGVhc2UuJyk7XG4gICAgICAgIHJldHVybiBhZGFwdGVyO1xuICAgICAgfVxuICAgICAgbG9nZ2luZygnYWRhcHRlci5qcyBzaGltbWluZyBjaHJvbWUuJyk7XG4gICAgICAvLyBFeHBvcnQgdG8gdGhlIGFkYXB0ZXIgZ2xvYmFsIG9iamVjdCB2aXNpYmxlIGluIHRoZSBicm93c2VyLlxuICAgICAgYWRhcHRlci5icm93c2VyU2hpbSA9IGNocm9tZVNoaW07XG4gICAgICBjb21tb25TaGltLnNoaW1DcmVhdGVPYmplY3RVUkwod2luZG93KTtcblxuICAgICAgY2hyb21lU2hpbS5zaGltR2V0VXNlck1lZGlhKHdpbmRvdyk7XG4gICAgICBjaHJvbWVTaGltLnNoaW1NZWRpYVN0cmVhbSh3aW5kb3cpO1xuICAgICAgY2hyb21lU2hpbS5zaGltU291cmNlT2JqZWN0KHdpbmRvdyk7XG4gICAgICBjaHJvbWVTaGltLnNoaW1QZWVyQ29ubmVjdGlvbih3aW5kb3cpO1xuICAgICAgY2hyb21lU2hpbS5zaGltT25UcmFjayh3aW5kb3cpO1xuICAgICAgY2hyb21lU2hpbS5zaGltQWRkVHJhY2tSZW1vdmVUcmFjayh3aW5kb3cpO1xuICAgICAgY2hyb21lU2hpbS5zaGltR2V0U2VuZGVyc1dpdGhEdG1mKHdpbmRvdyk7XG5cbiAgICAgIGNvbW1vblNoaW0uc2hpbVJUQ0ljZUNhbmRpZGF0ZSh3aW5kb3cpO1xuICAgICAgY29tbW9uU2hpbS5zaGltTWF4TWVzc2FnZVNpemUod2luZG93KTtcbiAgICAgIGNvbW1vblNoaW0uc2hpbVNlbmRUaHJvd1R5cGVFcnJvcih3aW5kb3cpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnZmlyZWZveCc6XG4gICAgICBpZiAoIWZpcmVmb3hTaGltIHx8ICFmaXJlZm94U2hpbS5zaGltUGVlckNvbm5lY3Rpb24gfHxcbiAgICAgICAgICAhb3B0aW9ucy5zaGltRmlyZWZveCkge1xuICAgICAgICBsb2dnaW5nKCdGaXJlZm94IHNoaW0gaXMgbm90IGluY2x1ZGVkIGluIHRoaXMgYWRhcHRlciByZWxlYXNlLicpO1xuICAgICAgICByZXR1cm4gYWRhcHRlcjtcbiAgICAgIH1cbiAgICAgIGxvZ2dpbmcoJ2FkYXB0ZXIuanMgc2hpbW1pbmcgZmlyZWZveC4nKTtcbiAgICAgIC8vIEV4cG9ydCB0byB0aGUgYWRhcHRlciBnbG9iYWwgb2JqZWN0IHZpc2libGUgaW4gdGhlIGJyb3dzZXIuXG4gICAgICBhZGFwdGVyLmJyb3dzZXJTaGltID0gZmlyZWZveFNoaW07XG4gICAgICBjb21tb25TaGltLnNoaW1DcmVhdGVPYmplY3RVUkwod2luZG93KTtcblxuICAgICAgZmlyZWZveFNoaW0uc2hpbUdldFVzZXJNZWRpYSh3aW5kb3cpO1xuICAgICAgZmlyZWZveFNoaW0uc2hpbVNvdXJjZU9iamVjdCh3aW5kb3cpO1xuICAgICAgZmlyZWZveFNoaW0uc2hpbVBlZXJDb25uZWN0aW9uKHdpbmRvdyk7XG4gICAgICBmaXJlZm94U2hpbS5zaGltT25UcmFjayh3aW5kb3cpO1xuICAgICAgZmlyZWZveFNoaW0uc2hpbVJlbW92ZVN0cmVhbSh3aW5kb3cpO1xuXG4gICAgICBjb21tb25TaGltLnNoaW1SVENJY2VDYW5kaWRhdGUod2luZG93KTtcbiAgICAgIGNvbW1vblNoaW0uc2hpbU1heE1lc3NhZ2VTaXplKHdpbmRvdyk7XG4gICAgICBjb21tb25TaGltLnNoaW1TZW5kVGhyb3dUeXBlRXJyb3Iod2luZG93KTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2VkZ2UnOlxuICAgICAgaWYgKCFlZGdlU2hpbSB8fCAhZWRnZVNoaW0uc2hpbVBlZXJDb25uZWN0aW9uIHx8ICFvcHRpb25zLnNoaW1FZGdlKSB7XG4gICAgICAgIGxvZ2dpbmcoJ01TIGVkZ2Ugc2hpbSBpcyBub3QgaW5jbHVkZWQgaW4gdGhpcyBhZGFwdGVyIHJlbGVhc2UuJyk7XG4gICAgICAgIHJldHVybiBhZGFwdGVyO1xuICAgICAgfVxuICAgICAgbG9nZ2luZygnYWRhcHRlci5qcyBzaGltbWluZyBlZGdlLicpO1xuICAgICAgLy8gRXhwb3J0IHRvIHRoZSBhZGFwdGVyIGdsb2JhbCBvYmplY3QgdmlzaWJsZSBpbiB0aGUgYnJvd3Nlci5cbiAgICAgIGFkYXB0ZXIuYnJvd3NlclNoaW0gPSBlZGdlU2hpbTtcbiAgICAgIGNvbW1vblNoaW0uc2hpbUNyZWF0ZU9iamVjdFVSTCh3aW5kb3cpO1xuXG4gICAgICBlZGdlU2hpbS5zaGltR2V0VXNlck1lZGlhKHdpbmRvdyk7XG4gICAgICBlZGdlU2hpbS5zaGltUGVlckNvbm5lY3Rpb24od2luZG93KTtcbiAgICAgIGVkZ2VTaGltLnNoaW1SZXBsYWNlVHJhY2sod2luZG93KTtcblxuICAgICAgLy8gdGhlIGVkZ2Ugc2hpbSBpbXBsZW1lbnRzIHRoZSBmdWxsIFJUQ0ljZUNhbmRpZGF0ZSBvYmplY3QuXG5cbiAgICAgIGNvbW1vblNoaW0uc2hpbU1heE1lc3NhZ2VTaXplKHdpbmRvdyk7XG4gICAgICBjb21tb25TaGltLnNoaW1TZW5kVGhyb3dUeXBlRXJyb3Iod2luZG93KTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3NhZmFyaSc6XG4gICAgICBpZiAoIXNhZmFyaVNoaW0gfHwgIW9wdGlvbnMuc2hpbVNhZmFyaSkge1xuICAgICAgICBsb2dnaW5nKCdTYWZhcmkgc2hpbSBpcyBub3QgaW5jbHVkZWQgaW4gdGhpcyBhZGFwdGVyIHJlbGVhc2UuJyk7XG4gICAgICAgIHJldHVybiBhZGFwdGVyO1xuICAgICAgfVxuICAgICAgbG9nZ2luZygnYWRhcHRlci5qcyBzaGltbWluZyBzYWZhcmkuJyk7XG4gICAgICAvLyBFeHBvcnQgdG8gdGhlIGFkYXB0ZXIgZ2xvYmFsIG9iamVjdCB2aXNpYmxlIGluIHRoZSBicm93c2VyLlxuICAgICAgYWRhcHRlci5icm93c2VyU2hpbSA9IHNhZmFyaVNoaW07XG4gICAgICBjb21tb25TaGltLnNoaW1DcmVhdGVPYmplY3RVUkwod2luZG93KTtcblxuICAgICAgc2FmYXJpU2hpbS5zaGltUlRDSWNlU2VydmVyVXJscyh3aW5kb3cpO1xuICAgICAgc2FmYXJpU2hpbS5zaGltQ2FsbGJhY2tzQVBJKHdpbmRvdyk7XG4gICAgICBzYWZhcmlTaGltLnNoaW1Mb2NhbFN0cmVhbXNBUEkod2luZG93KTtcbiAgICAgIHNhZmFyaVNoaW0uc2hpbVJlbW90ZVN0cmVhbXNBUEkod2luZG93KTtcbiAgICAgIHNhZmFyaVNoaW0uc2hpbVRyYWNrRXZlbnRUcmFuc2NlaXZlcih3aW5kb3cpO1xuICAgICAgc2FmYXJpU2hpbS5zaGltR2V0VXNlck1lZGlhKHdpbmRvdyk7XG4gICAgICBzYWZhcmlTaGltLnNoaW1DcmVhdGVPZmZlckxlZ2FjeSh3aW5kb3cpO1xuXG4gICAgICBjb21tb25TaGltLnNoaW1SVENJY2VDYW5kaWRhdGUod2luZG93KTtcbiAgICAgIGNvbW1vblNoaW0uc2hpbU1heE1lc3NhZ2VTaXplKHdpbmRvdyk7XG4gICAgICBjb21tb25TaGltLnNoaW1TZW5kVGhyb3dUeXBlRXJyb3Iod2luZG93KTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBsb2dnaW5nKCdVbnN1cHBvcnRlZCBicm93c2VyIScpO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICByZXR1cm4gYWRhcHRlcjtcbn07XG5cbn0se1wiLi9jaHJvbWUvY2hyb21lX3NoaW1cIjo1LFwiLi9jb21tb25fc2hpbVwiOjcsXCIuL2VkZ2UvZWRnZV9zaGltXCI6OCxcIi4vZmlyZWZveC9maXJlZm94X3NoaW1cIjoxMCxcIi4vc2FmYXJpL3NhZmFyaV9zaGltXCI6MTIsXCIuL3V0aWxzXCI6MTN9XSw1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxuLypcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcbiAqICB0cmVlLlxuICovXG4gLyogZXNsaW50LWVudiBub2RlICovXG4ndXNlIHN0cmljdCc7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscy5qcycpO1xudmFyIGxvZ2dpbmcgPSB1dGlscy5sb2c7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzaGltR2V0VXNlck1lZGlhOiByZXF1aXJlKCcuL2dldHVzZXJtZWRpYScpLFxuICBzaGltTWVkaWFTdHJlYW06IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIHdpbmRvdy5NZWRpYVN0cmVhbSA9IHdpbmRvdy5NZWRpYVN0cmVhbSB8fCB3aW5kb3cud2Via2l0TWVkaWFTdHJlYW07XG4gIH0sXG5cbiAgc2hpbU9uVHJhY2s6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gJiYgISgnb250cmFjaycgaW5cbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLCAnb250cmFjaycsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fb250cmFjaztcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbihmKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX29udHJhY2spIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhY2snLCB0aGlzLl9vbnRyYWNrKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCd0cmFjaycsIHRoaXMuX29udHJhY2sgPSBmKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB2YXIgb3JpZ1NldFJlbW90ZURlc2NyaXB0aW9uID1cbiAgICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnNldFJlbW90ZURlc2NyaXB0aW9uO1xuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5zZXRSZW1vdGVEZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgICBpZiAoIXBjLl9vbnRyYWNrcG9seSkge1xuICAgICAgICAgIHBjLl9vbnRyYWNrcG9seSA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIC8vIG9uYWRkc3RyZWFtIGRvZXMgbm90IGZpcmUgd2hlbiBhIHRyYWNrIGlzIGFkZGVkIHRvIGFuIGV4aXN0aW5nXG4gICAgICAgICAgICAvLyBzdHJlYW0uIEJ1dCBzdHJlYW0ub25hZGR0cmFjayBpcyBpbXBsZW1lbnRlZCBzbyB3ZSB1c2UgdGhhdC5cbiAgICAgICAgICAgIGUuc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoJ2FkZHRyYWNrJywgZnVuY3Rpb24odGUpIHtcbiAgICAgICAgICAgICAgdmFyIHJlY2VpdmVyO1xuICAgICAgICAgICAgICBpZiAod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRSZWNlaXZlcnMpIHtcbiAgICAgICAgICAgICAgICByZWNlaXZlciA9IHBjLmdldFJlY2VpdmVycygpLmZpbmQoZnVuY3Rpb24ocikge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHIudHJhY2sgJiYgci50cmFjay5pZCA9PT0gdGUudHJhY2suaWQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVjZWl2ZXIgPSB7dHJhY2s6IHRlLnRyYWNrfTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgndHJhY2snKTtcbiAgICAgICAgICAgICAgZXZlbnQudHJhY2sgPSB0ZS50cmFjaztcbiAgICAgICAgICAgICAgZXZlbnQucmVjZWl2ZXIgPSByZWNlaXZlcjtcbiAgICAgICAgICAgICAgZXZlbnQudHJhbnNjZWl2ZXIgPSB7cmVjZWl2ZXI6IHJlY2VpdmVyfTtcbiAgICAgICAgICAgICAgZXZlbnQuc3RyZWFtcyA9IFtlLnN0cmVhbV07XG4gICAgICAgICAgICAgIHBjLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBlLnN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XG4gICAgICAgICAgICAgIHZhciByZWNlaXZlcjtcbiAgICAgICAgICAgICAgaWYgKHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0UmVjZWl2ZXJzKSB7XG4gICAgICAgICAgICAgICAgcmVjZWl2ZXIgPSBwYy5nZXRSZWNlaXZlcnMoKS5maW5kKGZ1bmN0aW9uKHIpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiByLnRyYWNrICYmIHIudHJhY2suaWQgPT09IHRyYWNrLmlkO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlY2VpdmVyID0ge3RyYWNrOiB0cmFja307XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCd0cmFjaycpO1xuICAgICAgICAgICAgICBldmVudC50cmFjayA9IHRyYWNrO1xuICAgICAgICAgICAgICBldmVudC5yZWNlaXZlciA9IHJlY2VpdmVyO1xuICAgICAgICAgICAgICBldmVudC50cmFuc2NlaXZlciA9IHtyZWNlaXZlcjogcmVjZWl2ZXJ9O1xuICAgICAgICAgICAgICBldmVudC5zdHJlYW1zID0gW2Uuc3RyZWFtXTtcbiAgICAgICAgICAgICAgcGMuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHBjLmFkZEV2ZW50TGlzdGVuZXIoJ2FkZHN0cmVhbScsIHBjLl9vbnRyYWNrcG9seSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9yaWdTZXRSZW1vdGVEZXNjcmlwdGlvbi5hcHBseShwYywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmICghKCdSVENSdHBUcmFuc2NlaXZlcicgaW4gd2luZG93KSkge1xuICAgICAgdXRpbHMud3JhcFBlZXJDb25uZWN0aW9uRXZlbnQod2luZG93LCAndHJhY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICghZS50cmFuc2NlaXZlcikge1xuICAgICAgICAgIGUudHJhbnNjZWl2ZXIgPSB7cmVjZWl2ZXI6IGUucmVjZWl2ZXJ9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlO1xuICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIHNoaW1HZXRTZW5kZXJzV2l0aER0bWY6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIC8vIE92ZXJyaWRlcyBhZGRUcmFjay9yZW1vdmVUcmFjaywgZGVwZW5kcyBvbiBzaGltQWRkVHJhY2tSZW1vdmVUcmFjay5cbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uICYmXG4gICAgICAgICEoJ2dldFNlbmRlcnMnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpICYmXG4gICAgICAgICdjcmVhdGVEVE1GU2VuZGVyJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSB7XG4gICAgICB2YXIgc2hpbVNlbmRlcldpdGhEdG1mID0gZnVuY3Rpb24ocGMsIHRyYWNrKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdHJhY2s6IHRyYWNrLFxuICAgICAgICAgIGdldCBkdG1mKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2R0bWYgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBpZiAodHJhY2sua2luZCA9PT0gJ2F1ZGlvJykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2R0bWYgPSBwYy5jcmVhdGVEVE1GU2VuZGVyKHRyYWNrKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kdG1mID0gbnVsbDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2R0bWY7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBfcGM6IHBjXG4gICAgICAgIH07XG4gICAgICB9O1xuXG4gICAgICAvLyBhdWdtZW50IGFkZFRyYWNrIHdoZW4gZ2V0U2VuZGVycyBpcyBub3QgYXZhaWxhYmxlLlxuICAgICAgaWYgKCF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFNlbmRlcnMpIHtcbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTZW5kZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGhpcy5fc2VuZGVycyA9IHRoaXMuX3NlbmRlcnMgfHwgW107XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX3NlbmRlcnMuc2xpY2UoKTsgLy8gcmV0dXJuIGEgY29weSBvZiB0aGUgaW50ZXJuYWwgc3RhdGUuXG4gICAgICAgIH07XG4gICAgICAgIHZhciBvcmlnQWRkVHJhY2sgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFRyYWNrO1xuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFRyYWNrID0gZnVuY3Rpb24odHJhY2ssIHN0cmVhbSkge1xuICAgICAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICAgICAgdmFyIHNlbmRlciA9IG9yaWdBZGRUcmFjay5hcHBseShwYywgYXJndW1lbnRzKTtcbiAgICAgICAgICBpZiAoIXNlbmRlcikge1xuICAgICAgICAgICAgc2VuZGVyID0gc2hpbVNlbmRlcldpdGhEdG1mKHBjLCB0cmFjayk7XG4gICAgICAgICAgICBwYy5fc2VuZGVycy5wdXNoKHNlbmRlcik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBzZW5kZXI7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIG9yaWdSZW1vdmVUcmFjayA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlVHJhY2s7XG4gICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlVHJhY2sgPSBmdW5jdGlvbihzZW5kZXIpIHtcbiAgICAgICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgICAgIG9yaWdSZW1vdmVUcmFjay5hcHBseShwYywgYXJndW1lbnRzKTtcbiAgICAgICAgICB2YXIgaWR4ID0gcGMuX3NlbmRlcnMuaW5kZXhPZihzZW5kZXIpO1xuICAgICAgICAgIGlmIChpZHggIT09IC0xKSB7XG4gICAgICAgICAgICBwYy5fc2VuZGVycy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICB2YXIgb3JpZ0FkZFN0cmVhbSA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkU3RyZWFtO1xuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgICAgcGMuX3NlbmRlcnMgPSBwYy5fc2VuZGVycyB8fCBbXTtcbiAgICAgICAgb3JpZ0FkZFN0cmVhbS5hcHBseShwYywgW3N0cmVhbV0pO1xuICAgICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xuICAgICAgICAgIHBjLl9zZW5kZXJzLnB1c2goc2hpbVNlbmRlcldpdGhEdG1mKHBjLCB0cmFjaykpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIHZhciBvcmlnUmVtb3ZlU3RyZWFtID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVTdHJlYW07XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgICBwYy5fc2VuZGVycyA9IHBjLl9zZW5kZXJzIHx8IFtdO1xuICAgICAgICBvcmlnUmVtb3ZlU3RyZWFtLmFwcGx5KHBjLCBbc3RyZWFtXSk7XG5cbiAgICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcbiAgICAgICAgICB2YXIgc2VuZGVyID0gcGMuX3NlbmRlcnMuZmluZChmdW5jdGlvbihzKSB7XG4gICAgICAgICAgICByZXR1cm4gcy50cmFjayA9PT0gdHJhY2s7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKHNlbmRlcikge1xuICAgICAgICAgICAgcGMuX3NlbmRlcnMuc3BsaWNlKHBjLl9zZW5kZXJzLmluZGV4T2Yoc2VuZGVyKSwgMSk7IC8vIHJlbW92ZSBzZW5kZXJcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiAmJlxuICAgICAgICAgICAgICAgJ2dldFNlbmRlcnMnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUgJiZcbiAgICAgICAgICAgICAgICdjcmVhdGVEVE1GU2VuZGVyJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlICYmXG4gICAgICAgICAgICAgICB3aW5kb3cuUlRDUnRwU2VuZGVyICYmXG4gICAgICAgICAgICAgICAhKCdkdG1mJyBpbiB3aW5kb3cuUlRDUnRwU2VuZGVyLnByb3RvdHlwZSkpIHtcbiAgICAgIHZhciBvcmlnR2V0U2VuZGVycyA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U2VuZGVycztcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U2VuZGVycyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgICB2YXIgc2VuZGVycyA9IG9yaWdHZXRTZW5kZXJzLmFwcGx5KHBjLCBbXSk7XG4gICAgICAgIHNlbmRlcnMuZm9yRWFjaChmdW5jdGlvbihzZW5kZXIpIHtcbiAgICAgICAgICBzZW5kZXIuX3BjID0gcGM7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc2VuZGVycztcbiAgICAgIH07XG5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUnRwU2VuZGVyLnByb3RvdHlwZSwgJ2R0bWYnLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX2R0bWYgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMudHJhY2sua2luZCA9PT0gJ2F1ZGlvJykge1xuICAgICAgICAgICAgICB0aGlzLl9kdG1mID0gdGhpcy5fcGMuY3JlYXRlRFRNRlNlbmRlcih0aGlzLnRyYWNrKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuX2R0bWYgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhpcy5fZHRtZjtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIHNoaW1Tb3VyY2VPYmplY3Q6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIHZhciBVUkwgPSB3aW5kb3cgJiYgd2luZG93LlVSTDtcblxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50ICYmXG4gICAgICAgICEoJ3NyY09iamVjdCcgaW4gd2luZG93LkhUTUxNZWRpYUVsZW1lbnQucHJvdG90eXBlKSkge1xuICAgICAgICAvLyBTaGltIHRoZSBzcmNPYmplY3QgcHJvcGVydHksIG9uY2UsIHdoZW4gSFRNTE1lZGlhRWxlbWVudCBpcyBmb3VuZC5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50LnByb3RvdHlwZSwgJ3NyY09iamVjdCcsIHtcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NyY09iamVjdDtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNldDogZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAvLyBVc2UgX3NyY09iamVjdCBhcyBhIHByaXZhdGUgcHJvcGVydHkgZm9yIHRoaXMgc2hpbVxuICAgICAgICAgICAgdGhpcy5fc3JjT2JqZWN0ID0gc3RyZWFtO1xuICAgICAgICAgICAgaWYgKHRoaXMuc3JjKSB7XG4gICAgICAgICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwodGhpcy5zcmMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXN0cmVhbSkge1xuICAgICAgICAgICAgICB0aGlzLnNyYyA9ICcnO1xuICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKHN0cmVhbSk7XG4gICAgICAgICAgICAvLyBXZSBuZWVkIHRvIHJlY3JlYXRlIHRoZSBibG9iIHVybCB3aGVuIGEgdHJhY2sgaXMgYWRkZWQgb3JcbiAgICAgICAgICAgIC8vIHJlbW92ZWQuIERvaW5nIGl0IG1hbnVhbGx5IHNpbmNlIHdlIHdhbnQgdG8gYXZvaWQgYSByZWN1cnNpb24uXG4gICAgICAgICAgICBzdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcignYWRkdHJhY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYgKHNlbGYuc3JjKSB7XG4gICAgICAgICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChzZWxmLnNyYyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2VsZi5zcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKHN0cmVhbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHN0cmVhbS5hZGRFdmVudExpc3RlbmVyKCdyZW1vdmV0cmFjaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBpZiAoc2VsZi5zcmMpIHtcbiAgICAgICAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHNlbGYuc3JjKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzZWxmLnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoc3RyZWFtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHNoaW1BZGRUcmFja1JlbW92ZVRyYWNrV2l0aE5hdGl2ZTogZnVuY3Rpb24od2luZG93KSB7XG4gICAgLy8gc2hpbSBhZGRUcmFjay9yZW1vdmVUcmFjayB3aXRoIG5hdGl2ZSB2YXJpYW50cyBpbiBvcmRlciB0byBtYWtlXG4gICAgLy8gdGhlIGludGVyYWN0aW9ucyB3aXRoIGxlZ2FjeSBnZXRMb2NhbFN0cmVhbXMgYmVoYXZlIGFzIGluIG90aGVyIGJyb3dzZXJzLlxuICAgIC8vIEtlZXBzIGEgbWFwcGluZyBzdHJlYW0uaWQgPT4gW3N0cmVhbSwgcnRwc2VuZGVycy4uLl1cbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldExvY2FsU3RyZWFtcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgIHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMgPSB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zIHx8IHt9O1xuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMpLm1hcChmdW5jdGlvbihzdHJlYW1JZCkge1xuICAgICAgICByZXR1cm4gcGMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtSWRdWzBdO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBvcmlnQWRkVHJhY2sgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFRyYWNrO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2sgPSBmdW5jdGlvbih0cmFjaywgc3RyZWFtKSB7XG4gICAgICBpZiAoIXN0cmVhbSkge1xuICAgICAgICByZXR1cm4gb3JpZ0FkZFRyYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgICB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zID0gdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcyB8fCB7fTtcblxuICAgICAgdmFyIHNlbmRlciA9IG9yaWdBZGRUcmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgaWYgKCF0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbS5pZF0pIHtcbiAgICAgICAgdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW0uaWRdID0gW3N0cmVhbSwgc2VuZGVyXTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW0uaWRdLmluZGV4T2Yoc2VuZGVyKSA9PT0gLTEpIHtcbiAgICAgICAgdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW0uaWRdLnB1c2goc2VuZGVyKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZW5kZXI7XG4gICAgfTtcblxuICAgIHZhciBvcmlnQWRkU3RyZWFtID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRTdHJlYW07XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zID0gdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcyB8fCB7fTtcblxuICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcbiAgICAgICAgdmFyIGFscmVhZHlFeGlzdHMgPSBwYy5nZXRTZW5kZXJzKCkuZmluZChmdW5jdGlvbihzKSB7XG4gICAgICAgICAgcmV0dXJuIHMudHJhY2sgPT09IHRyYWNrO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGFscmVhZHlFeGlzdHMpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKCdUcmFjayBhbHJlYWR5IGV4aXN0cy4nLFxuICAgICAgICAgICAgICAnSW52YWxpZEFjY2Vzc0Vycm9yJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdmFyIGV4aXN0aW5nU2VuZGVycyA9IHBjLmdldFNlbmRlcnMoKTtcbiAgICAgIG9yaWdBZGRTdHJlYW0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIHZhciBuZXdTZW5kZXJzID0gcGMuZ2V0U2VuZGVycygpLmZpbHRlcihmdW5jdGlvbihuZXdTZW5kZXIpIHtcbiAgICAgICAgcmV0dXJuIGV4aXN0aW5nU2VuZGVycy5pbmRleE9mKG5ld1NlbmRlcikgPT09IC0xO1xuICAgICAgfSk7XG4gICAgICB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbS5pZF0gPSBbc3RyZWFtXS5jb25jYXQobmV3U2VuZGVycyk7XG4gICAgfTtcblxuICAgIHZhciBvcmlnUmVtb3ZlU3RyZWFtID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVTdHJlYW07XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgIHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMgPSB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zIHx8IHt9O1xuICAgICAgZGVsZXRlIHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtLmlkXTtcbiAgICAgIHJldHVybiBvcmlnUmVtb3ZlU3RyZWFtLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcblxuICAgIHZhciBvcmlnUmVtb3ZlVHJhY2sgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVRyYWNrO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlVHJhY2sgPSBmdW5jdGlvbihzZW5kZXIpIHtcbiAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zID0gdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcyB8fCB7fTtcbiAgICAgIGlmIChzZW5kZXIpIHtcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcykuZm9yRWFjaChmdW5jdGlvbihzdHJlYW1JZCkge1xuICAgICAgICAgIHZhciBpZHggPSBwYy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW1JZF0uaW5kZXhPZihzZW5kZXIpO1xuICAgICAgICAgIGlmIChpZHggIT09IC0xKSB7XG4gICAgICAgICAgICBwYy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW1JZF0uc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChwYy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW1JZF0ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBkZWxldGUgcGMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtSWRdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gb3JpZ1JlbW92ZVRyYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfSxcblxuICBzaGltQWRkVHJhY2tSZW1vdmVUcmFjazogZnVuY3Rpb24od2luZG93KSB7XG4gICAgdmFyIGJyb3dzZXJEZXRhaWxzID0gdXRpbHMuZGV0ZWN0QnJvd3Nlcih3aW5kb3cpO1xuICAgIC8vIHNoaW0gYWRkVHJhY2sgYW5kIHJlbW92ZVRyYWNrLlxuICAgIGlmICh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFRyYWNrICYmXG4gICAgICAgIGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPj0gNjUpIHtcbiAgICAgIHJldHVybiB0aGlzLnNoaW1BZGRUcmFja1JlbW92ZVRyYWNrV2l0aE5hdGl2ZSh3aW5kb3cpO1xuICAgIH1cblxuICAgIC8vIGFsc28gc2hpbSBwYy5nZXRMb2NhbFN0cmVhbXMgd2hlbiBhZGRUcmFjayBpcyBzaGltbWVkXG4gICAgLy8gdG8gcmV0dXJuIHRoZSBvcmlnaW5hbCBzdHJlYW1zLlxuICAgIHZhciBvcmlnR2V0TG9jYWxTdHJlYW1zID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVxuICAgICAgICAuZ2V0TG9jYWxTdHJlYW1zO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0TG9jYWxTdHJlYW1zID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgdmFyIG5hdGl2ZVN0cmVhbXMgPSBvcmlnR2V0TG9jYWxTdHJlYW1zLmFwcGx5KHRoaXMpO1xuICAgICAgcGMuX3JldmVyc2VTdHJlYW1zID0gcGMuX3JldmVyc2VTdHJlYW1zIHx8IHt9O1xuICAgICAgcmV0dXJuIG5hdGl2ZVN0cmVhbXMubWFwKGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgICByZXR1cm4gcGMuX3JldmVyc2VTdHJlYW1zW3N0cmVhbS5pZF07XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIG9yaWdBZGRTdHJlYW0gPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFN0cmVhbTtcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgIHBjLl9zdHJlYW1zID0gcGMuX3N0cmVhbXMgfHwge307XG4gICAgICBwYy5fcmV2ZXJzZVN0cmVhbXMgPSBwYy5fcmV2ZXJzZVN0cmVhbXMgfHwge307XG5cbiAgICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XG4gICAgICAgIHZhciBhbHJlYWR5RXhpc3RzID0gcGMuZ2V0U2VuZGVycygpLmZpbmQoZnVuY3Rpb24ocykge1xuICAgICAgICAgIHJldHVybiBzLnRyYWNrID09PSB0cmFjaztcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChhbHJlYWR5RXhpc3RzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbignVHJhY2sgYWxyZWFkeSBleGlzdHMuJyxcbiAgICAgICAgICAgICAgJ0ludmFsaWRBY2Nlc3NFcnJvcicpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIC8vIEFkZCBpZGVudGl0eSBtYXBwaW5nIGZvciBjb25zaXN0ZW5jeSB3aXRoIGFkZFRyYWNrLlxuICAgICAgLy8gVW5sZXNzIHRoaXMgaXMgYmVpbmcgdXNlZCB3aXRoIGEgc3RyZWFtIGZyb20gYWRkVHJhY2suXG4gICAgICBpZiAoIXBjLl9yZXZlcnNlU3RyZWFtc1tzdHJlYW0uaWRdKSB7XG4gICAgICAgIHZhciBuZXdTdHJlYW0gPSBuZXcgd2luZG93Lk1lZGlhU3RyZWFtKHN0cmVhbS5nZXRUcmFja3MoKSk7XG4gICAgICAgIHBjLl9zdHJlYW1zW3N0cmVhbS5pZF0gPSBuZXdTdHJlYW07XG4gICAgICAgIHBjLl9yZXZlcnNlU3RyZWFtc1tuZXdTdHJlYW0uaWRdID0gc3RyZWFtO1xuICAgICAgICBzdHJlYW0gPSBuZXdTdHJlYW07XG4gICAgICB9XG4gICAgICBvcmlnQWRkU3RyZWFtLmFwcGx5KHBjLCBbc3RyZWFtXSk7XG4gICAgfTtcblxuICAgIHZhciBvcmlnUmVtb3ZlU3RyZWFtID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVTdHJlYW07XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICBwYy5fc3RyZWFtcyA9IHBjLl9zdHJlYW1zIHx8IHt9O1xuICAgICAgcGMuX3JldmVyc2VTdHJlYW1zID0gcGMuX3JldmVyc2VTdHJlYW1zIHx8IHt9O1xuXG4gICAgICBvcmlnUmVtb3ZlU3RyZWFtLmFwcGx5KHBjLCBbKHBjLl9zdHJlYW1zW3N0cmVhbS5pZF0gfHwgc3RyZWFtKV0pO1xuICAgICAgZGVsZXRlIHBjLl9yZXZlcnNlU3RyZWFtc1socGMuX3N0cmVhbXNbc3RyZWFtLmlkXSA/XG4gICAgICAgICAgcGMuX3N0cmVhbXNbc3RyZWFtLmlkXS5pZCA6IHN0cmVhbS5pZCldO1xuICAgICAgZGVsZXRlIHBjLl9zdHJlYW1zW3N0cmVhbS5pZF07XG4gICAgfTtcblxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2sgPSBmdW5jdGlvbih0cmFjaywgc3RyZWFtKSB7XG4gICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgaWYgKHBjLnNpZ25hbGluZ1N0YXRlID09PSAnY2xvc2VkJykge1xuICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKFxuICAgICAgICAgICdUaGUgUlRDUGVlckNvbm5lY3Rpb25cXCdzIHNpZ25hbGluZ1N0YXRlIGlzIFxcJ2Nsb3NlZFxcJy4nLFxuICAgICAgICAgICdJbnZhbGlkU3RhdGVFcnJvcicpO1xuICAgICAgfVxuICAgICAgdmFyIHN0cmVhbXMgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICBpZiAoc3RyZWFtcy5sZW5ndGggIT09IDEgfHxcbiAgICAgICAgICAhc3RyZWFtc1swXS5nZXRUcmFja3MoKS5maW5kKGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgIHJldHVybiB0ID09PSB0cmFjaztcbiAgICAgICAgICB9KSkge1xuICAgICAgICAvLyB0aGlzIGlzIG5vdCBmdWxseSBjb3JyZWN0IGJ1dCBhbGwgd2UgY2FuIG1hbmFnZSB3aXRob3V0XG4gICAgICAgIC8vIFtbYXNzb2NpYXRlZCBNZWRpYVN0cmVhbXNdXSBpbnRlcm5hbCBzbG90LlxuICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKFxuICAgICAgICAgICdUaGUgYWRhcHRlci5qcyBhZGRUcmFjayBwb2x5ZmlsbCBvbmx5IHN1cHBvcnRzIGEgc2luZ2xlICcgK1xuICAgICAgICAgICcgc3RyZWFtIHdoaWNoIGlzIGFzc29jaWF0ZWQgd2l0aCB0aGUgc3BlY2lmaWVkIHRyYWNrLicsXG4gICAgICAgICAgJ05vdFN1cHBvcnRlZEVycm9yJyk7XG4gICAgICB9XG5cbiAgICAgIHZhciBhbHJlYWR5RXhpc3RzID0gcGMuZ2V0U2VuZGVycygpLmZpbmQoZnVuY3Rpb24ocykge1xuICAgICAgICByZXR1cm4gcy50cmFjayA9PT0gdHJhY2s7XG4gICAgICB9KTtcbiAgICAgIGlmIChhbHJlYWR5RXhpc3RzKSB7XG4gICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oJ1RyYWNrIGFscmVhZHkgZXhpc3RzLicsXG4gICAgICAgICAgICAnSW52YWxpZEFjY2Vzc0Vycm9yJyk7XG4gICAgICB9XG5cbiAgICAgIHBjLl9zdHJlYW1zID0gcGMuX3N0cmVhbXMgfHwge307XG4gICAgICBwYy5fcmV2ZXJzZVN0cmVhbXMgPSBwYy5fcmV2ZXJzZVN0cmVhbXMgfHwge307XG4gICAgICB2YXIgb2xkU3RyZWFtID0gcGMuX3N0cmVhbXNbc3RyZWFtLmlkXTtcbiAgICAgIGlmIChvbGRTdHJlYW0pIHtcbiAgICAgICAgLy8gdGhpcyBpcyB1c2luZyBvZGQgQ2hyb21lIGJlaGF2aW91ciwgdXNlIHdpdGggY2F1dGlvbjpcbiAgICAgICAgLy8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3dlYnJ0Yy9pc3N1ZXMvZGV0YWlsP2lkPTc4MTVcbiAgICAgICAgLy8gTm90ZTogd2UgcmVseSBvbiB0aGUgaGlnaC1sZXZlbCBhZGRUcmFjay9kdG1mIHNoaW0gdG9cbiAgICAgICAgLy8gY3JlYXRlIHRoZSBzZW5kZXIgd2l0aCBhIGR0bWYgc2VuZGVyLlxuICAgICAgICBvbGRTdHJlYW0uYWRkVHJhY2sodHJhY2spO1xuXG4gICAgICAgIC8vIFRyaWdnZXIgT05OIGFzeW5jLlxuICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHBjLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCduZWdvdGlhdGlvbm5lZWRlZCcpKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgbmV3U3RyZWFtID0gbmV3IHdpbmRvdy5NZWRpYVN0cmVhbShbdHJhY2tdKTtcbiAgICAgICAgcGMuX3N0cmVhbXNbc3RyZWFtLmlkXSA9IG5ld1N0cmVhbTtcbiAgICAgICAgcGMuX3JldmVyc2VTdHJlYW1zW25ld1N0cmVhbS5pZF0gPSBzdHJlYW07XG4gICAgICAgIHBjLmFkZFN0cmVhbShuZXdTdHJlYW0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHBjLmdldFNlbmRlcnMoKS5maW5kKGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgcmV0dXJuIHMudHJhY2sgPT09IHRyYWNrO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIHJlcGxhY2UgdGhlIGludGVybmFsIHN0cmVhbSBpZCB3aXRoIHRoZSBleHRlcm5hbCBvbmUgYW5kXG4gICAgLy8gdmljZSB2ZXJzYS5cbiAgICBmdW5jdGlvbiByZXBsYWNlSW50ZXJuYWxTdHJlYW1JZChwYywgZGVzY3JpcHRpb24pIHtcbiAgICAgIHZhciBzZHAgPSBkZXNjcmlwdGlvbi5zZHA7XG4gICAgICBPYmplY3Qua2V5cyhwYy5fcmV2ZXJzZVN0cmVhbXMgfHwgW10pLmZvckVhY2goZnVuY3Rpb24oaW50ZXJuYWxJZCkge1xuICAgICAgICB2YXIgZXh0ZXJuYWxTdHJlYW0gPSBwYy5fcmV2ZXJzZVN0cmVhbXNbaW50ZXJuYWxJZF07XG4gICAgICAgIHZhciBpbnRlcm5hbFN0cmVhbSA9IHBjLl9zdHJlYW1zW2V4dGVybmFsU3RyZWFtLmlkXTtcbiAgICAgICAgc2RwID0gc2RwLnJlcGxhY2UobmV3IFJlZ0V4cChpbnRlcm5hbFN0cmVhbS5pZCwgJ2cnKSxcbiAgICAgICAgICAgIGV4dGVybmFsU3RyZWFtLmlkKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5ldyBSVENTZXNzaW9uRGVzY3JpcHRpb24oe1xuICAgICAgICB0eXBlOiBkZXNjcmlwdGlvbi50eXBlLFxuICAgICAgICBzZHA6IHNkcFxuICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlcGxhY2VFeHRlcm5hbFN0cmVhbUlkKHBjLCBkZXNjcmlwdGlvbikge1xuICAgICAgdmFyIHNkcCA9IGRlc2NyaXB0aW9uLnNkcDtcbiAgICAgIE9iamVjdC5rZXlzKHBjLl9yZXZlcnNlU3RyZWFtcyB8fCBbXSkuZm9yRWFjaChmdW5jdGlvbihpbnRlcm5hbElkKSB7XG4gICAgICAgIHZhciBleHRlcm5hbFN0cmVhbSA9IHBjLl9yZXZlcnNlU3RyZWFtc1tpbnRlcm5hbElkXTtcbiAgICAgICAgdmFyIGludGVybmFsU3RyZWFtID0gcGMuX3N0cmVhbXNbZXh0ZXJuYWxTdHJlYW0uaWRdO1xuICAgICAgICBzZHAgPSBzZHAucmVwbGFjZShuZXcgUmVnRXhwKGV4dGVybmFsU3RyZWFtLmlkLCAnZycpLFxuICAgICAgICAgICAgaW50ZXJuYWxTdHJlYW0uaWQpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbmV3IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbih7XG4gICAgICAgIHR5cGU6IGRlc2NyaXB0aW9uLnR5cGUsXG4gICAgICAgIHNkcDogc2RwXG4gICAgICB9KTtcbiAgICB9XG4gICAgWydjcmVhdGVPZmZlcicsICdjcmVhdGVBbnN3ZXInXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgdmFyIG5hdGl2ZU1ldGhvZCA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXTtcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgdmFyIGlzTGVnYWN5Q2FsbCA9IGFyZ3VtZW50cy5sZW5ndGggJiZcbiAgICAgICAgICAgIHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdmdW5jdGlvbic7XG4gICAgICAgIGlmIChpc0xlZ2FjeUNhbGwpIHtcbiAgICAgICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHBjLCBbXG4gICAgICAgICAgICBmdW5jdGlvbihkZXNjcmlwdGlvbikge1xuICAgICAgICAgICAgICB2YXIgZGVzYyA9IHJlcGxhY2VJbnRlcm5hbFN0cmVhbUlkKHBjLCBkZXNjcmlwdGlvbik7XG4gICAgICAgICAgICAgIGFyZ3NbMF0uYXBwbHkobnVsbCwgW2Rlc2NdKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgaWYgKGFyZ3NbMV0pIHtcbiAgICAgICAgICAgICAgICBhcmdzWzFdLmFwcGx5KG51bGwsIGVycik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGFyZ3VtZW50c1syXVxuICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkocGMsIGFyZ3VtZW50cylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oZGVzY3JpcHRpb24pIHtcbiAgICAgICAgICByZXR1cm4gcmVwbGFjZUludGVybmFsU3RyZWFtSWQocGMsIGRlc2NyaXB0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgdmFyIG9yaWdTZXRMb2NhbERlc2NyaXB0aW9uID1cbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5zZXRMb2NhbERlc2NyaXB0aW9uO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0TG9jYWxEZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCB8fCAhYXJndW1lbnRzWzBdLnR5cGUpIHtcbiAgICAgICAgcmV0dXJuIG9yaWdTZXRMb2NhbERlc2NyaXB0aW9uLmFwcGx5KHBjLCBhcmd1bWVudHMpO1xuICAgICAgfVxuICAgICAgYXJndW1lbnRzWzBdID0gcmVwbGFjZUV4dGVybmFsU3RyZWFtSWQocGMsIGFyZ3VtZW50c1swXSk7XG4gICAgICByZXR1cm4gb3JpZ1NldExvY2FsRGVzY3JpcHRpb24uYXBwbHkocGMsIGFyZ3VtZW50cyk7XG4gICAgfTtcblxuICAgIC8vIFRPRE86IG1hbmdsZSBnZXRTdGF0czogaHR0cHM6Ly93M2MuZ2l0aHViLmlvL3dlYnJ0Yy1zdGF0cy8jZG9tLXJ0Y21lZGlhc3RyZWFtc3RhdHMtc3RyZWFtaWRlbnRpZmllclxuXG4gICAgdmFyIG9yaWdMb2NhbERlc2NyaXB0aW9uID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihcbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSwgJ2xvY2FsRGVzY3JpcHRpb24nKTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSxcbiAgICAgICAgJ2xvY2FsRGVzY3JpcHRpb24nLCB7XG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgZGVzY3JpcHRpb24gPSBvcmlnTG9jYWxEZXNjcmlwdGlvbi5nZXQuYXBwbHkodGhpcyk7XG4gICAgICAgICAgICBpZiAoZGVzY3JpcHRpb24udHlwZSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlcGxhY2VJbnRlcm5hbFN0cmVhbUlkKHBjLCBkZXNjcmlwdGlvbik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlVHJhY2sgPSBmdW5jdGlvbihzZW5kZXIpIHtcbiAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICBpZiAocGMuc2lnbmFsaW5nU3RhdGUgPT09ICdjbG9zZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oXG4gICAgICAgICAgJ1RoZSBSVENQZWVyQ29ubmVjdGlvblxcJ3Mgc2lnbmFsaW5nU3RhdGUgaXMgXFwnY2xvc2VkXFwnLicsXG4gICAgICAgICAgJ0ludmFsaWRTdGF0ZUVycm9yJyk7XG4gICAgICB9XG4gICAgICAvLyBXZSBjYW4gbm90IHlldCBjaGVjayBmb3Igc2VuZGVyIGluc3RhbmNlb2YgUlRDUnRwU2VuZGVyXG4gICAgICAvLyBzaW5jZSB3ZSBzaGltIFJUUFNlbmRlci4gU28gd2UgY2hlY2sgaWYgc2VuZGVyLl9wYyBpcyBzZXQuXG4gICAgICBpZiAoIXNlbmRlci5fcGMpIHtcbiAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbignQXJndW1lbnQgMSBvZiBSVENQZWVyQ29ubmVjdGlvbi5yZW1vdmVUcmFjayAnICtcbiAgICAgICAgICAgICdkb2VzIG5vdCBpbXBsZW1lbnQgaW50ZXJmYWNlIFJUQ1J0cFNlbmRlci4nLCAnVHlwZUVycm9yJyk7XG4gICAgICB9XG4gICAgICB2YXIgaXNMb2NhbCA9IHNlbmRlci5fcGMgPT09IHBjO1xuICAgICAgaWYgKCFpc0xvY2FsKSB7XG4gICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oJ1NlbmRlciB3YXMgbm90IGNyZWF0ZWQgYnkgdGhpcyBjb25uZWN0aW9uLicsXG4gICAgICAgICAgICAnSW52YWxpZEFjY2Vzc0Vycm9yJyk7XG4gICAgICB9XG5cbiAgICAgIC8vIFNlYXJjaCBmb3IgdGhlIG5hdGl2ZSBzdHJlYW0gdGhlIHNlbmRlcnMgdHJhY2sgYmVsb25ncyB0by5cbiAgICAgIHBjLl9zdHJlYW1zID0gcGMuX3N0cmVhbXMgfHwge307XG4gICAgICB2YXIgc3RyZWFtO1xuICAgICAgT2JqZWN0LmtleXMocGMuX3N0cmVhbXMpLmZvckVhY2goZnVuY3Rpb24oc3RyZWFtaWQpIHtcbiAgICAgICAgdmFyIGhhc1RyYWNrID0gcGMuX3N0cmVhbXNbc3RyZWFtaWRdLmdldFRyYWNrcygpLmZpbmQoZnVuY3Rpb24odHJhY2spIHtcbiAgICAgICAgICByZXR1cm4gc2VuZGVyLnRyYWNrID09PSB0cmFjaztcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChoYXNUcmFjaykge1xuICAgICAgICAgIHN0cmVhbSA9IHBjLl9zdHJlYW1zW3N0cmVhbWlkXTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGlmIChzdHJlYW0pIHtcbiAgICAgICAgaWYgKHN0cmVhbS5nZXRUcmFja3MoKS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAvLyBpZiB0aGlzIGlzIHRoZSBsYXN0IHRyYWNrIG9mIHRoZSBzdHJlYW0sIHJlbW92ZSB0aGUgc3RyZWFtLiBUaGlzXG4gICAgICAgICAgLy8gdGFrZXMgY2FyZSBvZiBhbnkgc2hpbW1lZCBfc2VuZGVycy5cbiAgICAgICAgICBwYy5yZW1vdmVTdHJlYW0ocGMuX3JldmVyc2VTdHJlYW1zW3N0cmVhbS5pZF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIHJlbHlpbmcgb24gdGhlIHNhbWUgb2RkIGNocm9tZSBiZWhhdmlvdXIgYXMgYWJvdmUuXG4gICAgICAgICAgc3RyZWFtLnJlbW92ZVRyYWNrKHNlbmRlci50cmFjayk7XG4gICAgICAgIH1cbiAgICAgICAgcGMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ25lZ290aWF0aW9ubmVlZGVkJykpO1xuICAgICAgfVxuICAgIH07XG4gIH0sXG5cbiAgc2hpbVBlZXJDb25uZWN0aW9uOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICB2YXIgYnJvd3NlckRldGFpbHMgPSB1dGlscy5kZXRlY3RCcm93c2VyKHdpbmRvdyk7XG5cbiAgICAvLyBUaGUgUlRDUGVlckNvbm5lY3Rpb24gb2JqZWN0LlxuICAgIGlmICghd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uICYmIHdpbmRvdy53ZWJraXRSVENQZWVyQ29ubmVjdGlvbikge1xuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uID0gZnVuY3Rpb24ocGNDb25maWcsIHBjQ29uc3RyYWludHMpIHtcbiAgICAgICAgLy8gVHJhbnNsYXRlIGljZVRyYW5zcG9ydFBvbGljeSB0byBpY2VUcmFuc3BvcnRzLFxuICAgICAgICAvLyBzZWUgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC93ZWJydGMvaXNzdWVzL2RldGFpbD9pZD00ODY5XG4gICAgICAgIC8vIHRoaXMgd2FzIGZpeGVkIGluIE01NiBhbG9uZyB3aXRoIHVucHJlZml4aW5nIFJUQ1BlZXJDb25uZWN0aW9uLlxuICAgICAgICBsb2dnaW5nKCdQZWVyQ29ubmVjdGlvbicpO1xuICAgICAgICBpZiAocGNDb25maWcgJiYgcGNDb25maWcuaWNlVHJhbnNwb3J0UG9saWN5KSB7XG4gICAgICAgICAgcGNDb25maWcuaWNlVHJhbnNwb3J0cyA9IHBjQ29uZmlnLmljZVRyYW5zcG9ydFBvbGljeTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgd2luZG93LndlYmtpdFJUQ1BlZXJDb25uZWN0aW9uKHBjQ29uZmlnLCBwY0NvbnN0cmFpbnRzKTtcbiAgICAgIH07XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlID1cbiAgICAgICAgICB3aW5kb3cud2Via2l0UlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlO1xuICAgICAgLy8gd3JhcCBzdGF0aWMgbWV0aG9kcy4gQ3VycmVudGx5IGp1c3QgZ2VuZXJhdGVDZXJ0aWZpY2F0ZS5cbiAgICAgIGlmICh3aW5kb3cud2Via2l0UlRDUGVlckNvbm5lY3Rpb24uZ2VuZXJhdGVDZXJ0aWZpY2F0ZSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLCAnZ2VuZXJhdGVDZXJ0aWZpY2F0ZScsIHtcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy53ZWJraXRSVENQZWVyQ29ubmVjdGlvbi5nZW5lcmF0ZUNlcnRpZmljYXRlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIG1pZ3JhdGUgZnJvbSBub24tc3BlYyBSVENJY2VTZXJ2ZXIudXJsIHRvIFJUQ0ljZVNlcnZlci51cmxzXG4gICAgICB2YXIgT3JpZ1BlZXJDb25uZWN0aW9uID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uO1xuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uID0gZnVuY3Rpb24ocGNDb25maWcsIHBjQ29uc3RyYWludHMpIHtcbiAgICAgICAgaWYgKHBjQ29uZmlnICYmIHBjQ29uZmlnLmljZVNlcnZlcnMpIHtcbiAgICAgICAgICB2YXIgbmV3SWNlU2VydmVycyA9IFtdO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGNDb25maWcuaWNlU2VydmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHNlcnZlciA9IHBjQ29uZmlnLmljZVNlcnZlcnNbaV07XG4gICAgICAgICAgICBpZiAoIXNlcnZlci5oYXNPd25Qcm9wZXJ0eSgndXJscycpICYmXG4gICAgICAgICAgICAgICAgc2VydmVyLmhhc093blByb3BlcnR5KCd1cmwnKSkge1xuICAgICAgICAgICAgICB1dGlscy5kZXByZWNhdGVkKCdSVENJY2VTZXJ2ZXIudXJsJywgJ1JUQ0ljZVNlcnZlci51cmxzJyk7XG4gICAgICAgICAgICAgIHNlcnZlciA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoc2VydmVyKSk7XG4gICAgICAgICAgICAgIHNlcnZlci51cmxzID0gc2VydmVyLnVybDtcbiAgICAgICAgICAgICAgbmV3SWNlU2VydmVycy5wdXNoKHNlcnZlcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBuZXdJY2VTZXJ2ZXJzLnB1c2gocGNDb25maWcuaWNlU2VydmVyc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHBjQ29uZmlnLmljZVNlcnZlcnMgPSBuZXdJY2VTZXJ2ZXJzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgT3JpZ1BlZXJDb25uZWN0aW9uKHBjQ29uZmlnLCBwY0NvbnN0cmFpbnRzKTtcbiAgICAgIH07XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlID0gT3JpZ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZTtcbiAgICAgIC8vIHdyYXAgc3RhdGljIG1ldGhvZHMuIEN1cnJlbnRseSBqdXN0IGdlbmVyYXRlQ2VydGlmaWNhdGUuXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLCAnZ2VuZXJhdGVDZXJ0aWZpY2F0ZScsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gT3JpZ1BlZXJDb25uZWN0aW9uLmdlbmVyYXRlQ2VydGlmaWNhdGU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhciBvcmlnR2V0U3RhdHMgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFN0YXRzO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U3RhdHMgPSBmdW5jdGlvbihzZWxlY3RvcixcbiAgICAgICAgc3VjY2Vzc0NhbGxiYWNrLCBlcnJvckNhbGxiYWNrKSB7XG4gICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG5cbiAgICAgIC8vIElmIHNlbGVjdG9yIGlzIGEgZnVuY3Rpb24gdGhlbiB3ZSBhcmUgaW4gdGhlIG9sZCBzdHlsZSBzdGF0cyBzbyBqdXN0XG4gICAgICAvLyBwYXNzIGJhY2sgdGhlIG9yaWdpbmFsIGdldFN0YXRzIGZvcm1hdCB0byBhdm9pZCBicmVha2luZyBvbGQgdXNlcnMuXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgdHlwZW9mIHNlbGVjdG9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBvcmlnR2V0U3RhdHMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgLy8gV2hlbiBzcGVjLXN0eWxlIGdldFN0YXRzIGlzIHN1cHBvcnRlZCwgcmV0dXJuIHRob3NlIHdoZW4gY2FsbGVkIHdpdGhcbiAgICAgIC8vIGVpdGhlciBubyBhcmd1bWVudHMgb3IgdGhlIHNlbGVjdG9yIGFyZ3VtZW50IGlzIG51bGwuXG4gICAgICBpZiAob3JpZ0dldFN0YXRzLmxlbmd0aCA9PT0gMCAmJiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCB8fFxuICAgICAgICAgIHR5cGVvZiBhcmd1bWVudHNbMF0gIT09ICdmdW5jdGlvbicpKSB7XG4gICAgICAgIHJldHVybiBvcmlnR2V0U3RhdHMuYXBwbHkodGhpcywgW10pO1xuICAgICAgfVxuXG4gICAgICB2YXIgZml4Q2hyb21lU3RhdHNfID0gZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgdmFyIHN0YW5kYXJkUmVwb3J0ID0ge307XG4gICAgICAgIHZhciByZXBvcnRzID0gcmVzcG9uc2UucmVzdWx0KCk7XG4gICAgICAgIHJlcG9ydHMuZm9yRWFjaChmdW5jdGlvbihyZXBvcnQpIHtcbiAgICAgICAgICB2YXIgc3RhbmRhcmRTdGF0cyA9IHtcbiAgICAgICAgICAgIGlkOiByZXBvcnQuaWQsXG4gICAgICAgICAgICB0aW1lc3RhbXA6IHJlcG9ydC50aW1lc3RhbXAsXG4gICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgIGxvY2FsY2FuZGlkYXRlOiAnbG9jYWwtY2FuZGlkYXRlJyxcbiAgICAgICAgICAgICAgcmVtb3RlY2FuZGlkYXRlOiAncmVtb3RlLWNhbmRpZGF0ZSdcbiAgICAgICAgICAgIH1bcmVwb3J0LnR5cGVdIHx8IHJlcG9ydC50eXBlXG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXBvcnQubmFtZXMoKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgICAgIHN0YW5kYXJkU3RhdHNbbmFtZV0gPSByZXBvcnQuc3RhdChuYW1lKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBzdGFuZGFyZFJlcG9ydFtzdGFuZGFyZFN0YXRzLmlkXSA9IHN0YW5kYXJkU3RhdHM7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzdGFuZGFyZFJlcG9ydDtcbiAgICAgIH07XG5cbiAgICAgIC8vIHNoaW0gZ2V0U3RhdHMgd2l0aCBtYXBsaWtlIHN1cHBvcnRcbiAgICAgIHZhciBtYWtlTWFwU3RhdHMgPSBmdW5jdGlvbihzdGF0cykge1xuICAgICAgICByZXR1cm4gbmV3IE1hcChPYmplY3Qua2V5cyhzdGF0cykubWFwKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgIHJldHVybiBba2V5LCBzdGF0c1trZXldXTtcbiAgICAgICAgfSkpO1xuICAgICAgfTtcblxuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gMikge1xuICAgICAgICB2YXIgc3VjY2Vzc0NhbGxiYWNrV3JhcHBlcl8gPSBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgIGFyZ3NbMV0obWFrZU1hcFN0YXRzKGZpeENocm9tZVN0YXRzXyhyZXNwb25zZSkpKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gb3JpZ0dldFN0YXRzLmFwcGx5KHRoaXMsIFtzdWNjZXNzQ2FsbGJhY2tXcmFwcGVyXyxcbiAgICAgICAgICBhcmd1bWVudHNbMF1dKTtcbiAgICAgIH1cblxuICAgICAgLy8gcHJvbWlzZS1zdXBwb3J0XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIG9yaWdHZXRTdGF0cy5hcHBseShwYywgW1xuICAgICAgICAgIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXNvbHZlKG1ha2VNYXBTdGF0cyhmaXhDaHJvbWVTdGF0c18ocmVzcG9uc2UpKSk7XG4gICAgICAgICAgfSwgcmVqZWN0XSk7XG4gICAgICB9KS50aGVuKHN1Y2Nlc3NDYWxsYmFjaywgZXJyb3JDYWxsYmFjayk7XG4gICAgfTtcblxuICAgIC8vIGFkZCBwcm9taXNlIHN1cHBvcnQgLS0gbmF0aXZlbHkgYXZhaWxhYmxlIGluIENocm9tZSA1MVxuICAgIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgNTEpIHtcbiAgICAgIFsnc2V0TG9jYWxEZXNjcmlwdGlvbicsICdzZXRSZW1vdGVEZXNjcmlwdGlvbicsICdhZGRJY2VDYW5kaWRhdGUnXVxuICAgICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgICAgICAgdmFyIG5hdGl2ZU1ldGhvZCA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXTtcbiAgICAgICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgICAgICAgICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICBuYXRpdmVNZXRob2QuYXBwbHkocGMsIFthcmdzWzBdLCByZXNvbHZlLCByZWplY3RdKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGFyZ3NbMV0uYXBwbHkobnVsbCwgW10pO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPj0gMykge1xuICAgICAgICAgICAgICAgICAgYXJnc1syXS5hcHBseShudWxsLCBbZXJyXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gcHJvbWlzZSBzdXBwb3J0IGZvciBjcmVhdGVPZmZlciBhbmQgY3JlYXRlQW5zd2VyLiBBdmFpbGFibGUgKHdpdGhvdXRcbiAgICAvLyBidWdzKSBzaW5jZSBNNTI6IGNyYnVnLzYxOTI4OVxuICAgIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgNTIpIHtcbiAgICAgIFsnY3JlYXRlT2ZmZXInLCAnY3JlYXRlQW5zd2VyJ10uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgICAgdmFyIG5hdGl2ZU1ldGhvZCA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXTtcbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDEgfHwgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiZcbiAgICAgICAgICAgICAgdHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ29iamVjdCcpKSB7XG4gICAgICAgICAgICB2YXIgb3B0cyA9IGFyZ3VtZW50cy5sZW5ndGggPT09IDEgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgIG5hdGl2ZU1ldGhvZC5hcHBseShwYywgW3Jlc29sdmUsIHJlamVjdCwgb3B0c10pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIHNoaW0gaW1wbGljaXQgY3JlYXRpb24gb2YgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uL1JUQ0ljZUNhbmRpZGF0ZVxuICAgIFsnc2V0TG9jYWxEZXNjcmlwdGlvbicsICdzZXRSZW1vdGVEZXNjcmlwdGlvbicsICdhZGRJY2VDYW5kaWRhdGUnXVxuICAgICAgICAuZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgICAgICB2YXIgbmF0aXZlTWV0aG9kID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdO1xuICAgICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYXJndW1lbnRzWzBdID0gbmV3ICgobWV0aG9kID09PSAnYWRkSWNlQ2FuZGlkYXRlJykgP1xuICAgICAgICAgICAgICAgIHdpbmRvdy5SVENJY2VDYW5kaWRhdGUgOlxuICAgICAgICAgICAgICAgIHdpbmRvdy5SVENTZXNzaW9uRGVzY3JpcHRpb24pKGFyZ3VtZW50c1swXSk7XG4gICAgICAgICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAvLyBzdXBwb3J0IGZvciBhZGRJY2VDYW5kaWRhdGUobnVsbCBvciB1bmRlZmluZWQpXG4gICAgdmFyIG5hdGl2ZUFkZEljZUNhbmRpZGF0ZSA9XG4gICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkSWNlQ2FuZGlkYXRlO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkSWNlQ2FuZGlkYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50c1swXSkge1xuICAgICAgICBpZiAoYXJndW1lbnRzWzFdKSB7XG4gICAgICAgICAgYXJndW1lbnRzWzFdLmFwcGx5KG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuYXRpdmVBZGRJY2VDYW5kaWRhdGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG59O1xuXG59LHtcIi4uL3V0aWxzLmpzXCI6MTMsXCIuL2dldHVzZXJtZWRpYVwiOjZ9XSw2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8qXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXG4gKiAgdHJlZS5cbiAqL1xuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xuJ3VzZSBzdHJpY3QnO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMuanMnKTtcbnZhciBsb2dnaW5nID0gdXRpbHMubG9nO1xuXG4vLyBFeHBvc2UgcHVibGljIG1ldGhvZHMuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHdpbmRvdykge1xuICB2YXIgYnJvd3NlckRldGFpbHMgPSB1dGlscy5kZXRlY3RCcm93c2VyKHdpbmRvdyk7XG4gIHZhciBuYXZpZ2F0b3IgPSB3aW5kb3cgJiYgd2luZG93Lm5hdmlnYXRvcjtcblxuICB2YXIgY29uc3RyYWludHNUb0Nocm9tZV8gPSBmdW5jdGlvbihjKSB7XG4gICAgaWYgKHR5cGVvZiBjICE9PSAnb2JqZWN0JyB8fCBjLm1hbmRhdG9yeSB8fCBjLm9wdGlvbmFsKSB7XG4gICAgICByZXR1cm4gYztcbiAgICB9XG4gICAgdmFyIGNjID0ge307XG4gICAgT2JqZWN0LmtleXMoYykuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICAgIGlmIChrZXkgPT09ICdyZXF1aXJlJyB8fCBrZXkgPT09ICdhZHZhbmNlZCcgfHwga2V5ID09PSAnbWVkaWFTb3VyY2UnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciByID0gKHR5cGVvZiBjW2tleV0gPT09ICdvYmplY3QnKSA/IGNba2V5XSA6IHtpZGVhbDogY1trZXldfTtcbiAgICAgIGlmIChyLmV4YWN0ICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIHIuZXhhY3QgPT09ICdudW1iZXInKSB7XG4gICAgICAgIHIubWluID0gci5tYXggPSByLmV4YWN0O1xuICAgICAgfVxuICAgICAgdmFyIG9sZG5hbWVfID0gZnVuY3Rpb24ocHJlZml4LCBuYW1lKSB7XG4gICAgICAgIGlmIChwcmVmaXgpIHtcbiAgICAgICAgICByZXR1cm4gcHJlZml4ICsgbmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIG5hbWUuc2xpY2UoMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChuYW1lID09PSAnZGV2aWNlSWQnKSA/ICdzb3VyY2VJZCcgOiBuYW1lO1xuICAgICAgfTtcbiAgICAgIGlmIChyLmlkZWFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY2Mub3B0aW9uYWwgPSBjYy5vcHRpb25hbCB8fCBbXTtcbiAgICAgICAgdmFyIG9jID0ge307XG4gICAgICAgIGlmICh0eXBlb2Ygci5pZGVhbCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICBvY1tvbGRuYW1lXygnbWluJywga2V5KV0gPSByLmlkZWFsO1xuICAgICAgICAgIGNjLm9wdGlvbmFsLnB1c2gob2MpO1xuICAgICAgICAgIG9jID0ge307XG4gICAgICAgICAgb2Nbb2xkbmFtZV8oJ21heCcsIGtleSldID0gci5pZGVhbDtcbiAgICAgICAgICBjYy5vcHRpb25hbC5wdXNoKG9jKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvY1tvbGRuYW1lXygnJywga2V5KV0gPSByLmlkZWFsO1xuICAgICAgICAgIGNjLm9wdGlvbmFsLnB1c2gob2MpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoci5leGFjdCAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiByLmV4YWN0ICE9PSAnbnVtYmVyJykge1xuICAgICAgICBjYy5tYW5kYXRvcnkgPSBjYy5tYW5kYXRvcnkgfHwge307XG4gICAgICAgIGNjLm1hbmRhdG9yeVtvbGRuYW1lXygnJywga2V5KV0gPSByLmV4YWN0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgWydtaW4nLCAnbWF4J10uZm9yRWFjaChmdW5jdGlvbihtaXgpIHtcbiAgICAgICAgICBpZiAoclttaXhdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNjLm1hbmRhdG9yeSA9IGNjLm1hbmRhdG9yeSB8fCB7fTtcbiAgICAgICAgICAgIGNjLm1hbmRhdG9yeVtvbGRuYW1lXyhtaXgsIGtleSldID0gclttaXhdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGMuYWR2YW5jZWQpIHtcbiAgICAgIGNjLm9wdGlvbmFsID0gKGNjLm9wdGlvbmFsIHx8IFtdKS5jb25jYXQoYy5hZHZhbmNlZCk7XG4gICAgfVxuICAgIHJldHVybiBjYztcbiAgfTtcblxuICB2YXIgc2hpbUNvbnN0cmFpbnRzXyA9IGZ1bmN0aW9uKGNvbnN0cmFpbnRzLCBmdW5jKSB7XG4gICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPj0gNjEpIHtcbiAgICAgIHJldHVybiBmdW5jKGNvbnN0cmFpbnRzKTtcbiAgICB9XG4gICAgY29uc3RyYWludHMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGNvbnN0cmFpbnRzKSk7XG4gICAgaWYgKGNvbnN0cmFpbnRzICYmIHR5cGVvZiBjb25zdHJhaW50cy5hdWRpbyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHZhciByZW1hcCA9IGZ1bmN0aW9uKG9iaiwgYSwgYikge1xuICAgICAgICBpZiAoYSBpbiBvYmogJiYgIShiIGluIG9iaikpIHtcbiAgICAgICAgICBvYmpbYl0gPSBvYmpbYV07XG4gICAgICAgICAgZGVsZXRlIG9ialthXTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGNvbnN0cmFpbnRzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShjb25zdHJhaW50cykpO1xuICAgICAgcmVtYXAoY29uc3RyYWludHMuYXVkaW8sICdhdXRvR2FpbkNvbnRyb2wnLCAnZ29vZ0F1dG9HYWluQ29udHJvbCcpO1xuICAgICAgcmVtYXAoY29uc3RyYWludHMuYXVkaW8sICdub2lzZVN1cHByZXNzaW9uJywgJ2dvb2dOb2lzZVN1cHByZXNzaW9uJyk7XG4gICAgICBjb25zdHJhaW50cy5hdWRpbyA9IGNvbnN0cmFpbnRzVG9DaHJvbWVfKGNvbnN0cmFpbnRzLmF1ZGlvKTtcbiAgICB9XG4gICAgaWYgKGNvbnN0cmFpbnRzICYmIHR5cGVvZiBjb25zdHJhaW50cy52aWRlbyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIC8vIFNoaW0gZmFjaW5nTW9kZSBmb3IgbW9iaWxlICYgc3VyZmFjZSBwcm8uXG4gICAgICB2YXIgZmFjZSA9IGNvbnN0cmFpbnRzLnZpZGVvLmZhY2luZ01vZGU7XG4gICAgICBmYWNlID0gZmFjZSAmJiAoKHR5cGVvZiBmYWNlID09PSAnb2JqZWN0JykgPyBmYWNlIDoge2lkZWFsOiBmYWNlfSk7XG4gICAgICB2YXIgZ2V0U3VwcG9ydGVkRmFjaW5nTW9kZUxpZXMgPSBicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgNjY7XG5cbiAgICAgIGlmICgoZmFjZSAmJiAoZmFjZS5leGFjdCA9PT0gJ3VzZXInIHx8IGZhY2UuZXhhY3QgPT09ICdlbnZpcm9ubWVudCcgfHxcbiAgICAgICAgICAgICAgICAgICAgZmFjZS5pZGVhbCA9PT0gJ3VzZXInIHx8IGZhY2UuaWRlYWwgPT09ICdlbnZpcm9ubWVudCcpKSAmJlxuICAgICAgICAgICEobmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRTdXBwb3J0ZWRDb25zdHJhaW50cyAmJlxuICAgICAgICAgICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRTdXBwb3J0ZWRDb25zdHJhaW50cygpLmZhY2luZ01vZGUgJiZcbiAgICAgICAgICAgICFnZXRTdXBwb3J0ZWRGYWNpbmdNb2RlTGllcykpIHtcbiAgICAgICAgZGVsZXRlIGNvbnN0cmFpbnRzLnZpZGVvLmZhY2luZ01vZGU7XG4gICAgICAgIHZhciBtYXRjaGVzO1xuICAgICAgICBpZiAoZmFjZS5leGFjdCA9PT0gJ2Vudmlyb25tZW50JyB8fCBmYWNlLmlkZWFsID09PSAnZW52aXJvbm1lbnQnKSB7XG4gICAgICAgICAgbWF0Y2hlcyA9IFsnYmFjaycsICdyZWFyJ107XG4gICAgICAgIH0gZWxzZSBpZiAoZmFjZS5leGFjdCA9PT0gJ3VzZXInIHx8IGZhY2UuaWRlYWwgPT09ICd1c2VyJykge1xuICAgICAgICAgIG1hdGNoZXMgPSBbJ2Zyb250J107XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgICAgICAvLyBMb29rIGZvciBtYXRjaGVzIGluIGxhYmVsLCBvciB1c2UgbGFzdCBjYW0gZm9yIGJhY2sgKHR5cGljYWwpLlxuICAgICAgICAgIHJldHVybiBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmVudW1lcmF0ZURldmljZXMoKVxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGRldmljZXMpIHtcbiAgICAgICAgICAgIGRldmljZXMgPSBkZXZpY2VzLmZpbHRlcihmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgIHJldHVybiBkLmtpbmQgPT09ICd2aWRlb2lucHV0JztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIGRldiA9IGRldmljZXMuZmluZChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgIHJldHVybiBtYXRjaGVzLnNvbWUoZnVuY3Rpb24obWF0Y2gpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5sYWJlbC50b0xvd2VyQ2FzZSgpLmluZGV4T2YobWF0Y2gpICE9PSAtMTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghZGV2ICYmIGRldmljZXMubGVuZ3RoICYmIG1hdGNoZXMuaW5kZXhPZignYmFjaycpICE9PSAtMSkge1xuICAgICAgICAgICAgICBkZXYgPSBkZXZpY2VzW2RldmljZXMubGVuZ3RoIC0gMV07IC8vIG1vcmUgbGlrZWx5IHRoZSBiYWNrIGNhbVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRldikge1xuICAgICAgICAgICAgICBjb25zdHJhaW50cy52aWRlby5kZXZpY2VJZCA9IGZhY2UuZXhhY3QgPyB7ZXhhY3Q6IGRldi5kZXZpY2VJZH0gOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aWRlYWw6IGRldi5kZXZpY2VJZH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdHJhaW50cy52aWRlbyA9IGNvbnN0cmFpbnRzVG9DaHJvbWVfKGNvbnN0cmFpbnRzLnZpZGVvKTtcbiAgICAgICAgICAgIGxvZ2dpbmcoJ2Nocm9tZTogJyArIEpTT04uc3RyaW5naWZ5KGNvbnN0cmFpbnRzKSk7XG4gICAgICAgICAgICByZXR1cm4gZnVuYyhjb25zdHJhaW50cyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnN0cmFpbnRzLnZpZGVvID0gY29uc3RyYWludHNUb0Nocm9tZV8oY29uc3RyYWludHMudmlkZW8pO1xuICAgIH1cbiAgICBsb2dnaW5nKCdjaHJvbWU6ICcgKyBKU09OLnN0cmluZ2lmeShjb25zdHJhaW50cykpO1xuICAgIHJldHVybiBmdW5jKGNvbnN0cmFpbnRzKTtcbiAgfTtcblxuICB2YXIgc2hpbUVycm9yXyA9IGZ1bmN0aW9uKGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZToge1xuICAgICAgICBQZXJtaXNzaW9uRGVuaWVkRXJyb3I6ICdOb3RBbGxvd2VkRXJyb3InLFxuICAgICAgICBQZXJtaXNzaW9uRGlzbWlzc2VkRXJyb3I6ICdOb3RBbGxvd2VkRXJyb3InLFxuICAgICAgICBJbnZhbGlkU3RhdGVFcnJvcjogJ05vdEFsbG93ZWRFcnJvcicsXG4gICAgICAgIERldmljZXNOb3RGb3VuZEVycm9yOiAnTm90Rm91bmRFcnJvcicsXG4gICAgICAgIENvbnN0cmFpbnROb3RTYXRpc2ZpZWRFcnJvcjogJ092ZXJjb25zdHJhaW5lZEVycm9yJyxcbiAgICAgICAgVHJhY2tTdGFydEVycm9yOiAnTm90UmVhZGFibGVFcnJvcicsXG4gICAgICAgIE1lZGlhRGV2aWNlRmFpbGVkRHVlVG9TaHV0ZG93bjogJ05vdEFsbG93ZWRFcnJvcicsXG4gICAgICAgIE1lZGlhRGV2aWNlS2lsbFN3aXRjaE9uOiAnTm90QWxsb3dlZEVycm9yJyxcbiAgICAgICAgVGFiQ2FwdHVyZUVycm9yOiAnQWJvcnRFcnJvcicsXG4gICAgICAgIFNjcmVlbkNhcHR1cmVFcnJvcjogJ0Fib3J0RXJyb3InLFxuICAgICAgICBEZXZpY2VDYXB0dXJlRXJyb3I6ICdBYm9ydEVycm9yJ1xuICAgICAgfVtlLm5hbWVdIHx8IGUubmFtZSxcbiAgICAgIG1lc3NhZ2U6IGUubWVzc2FnZSxcbiAgICAgIGNvbnN0cmFpbnQ6IGUuY29uc3RyYWludE5hbWUsXG4gICAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWUgKyAodGhpcy5tZXNzYWdlICYmICc6ICcpICsgdGhpcy5tZXNzYWdlO1xuICAgICAgfVxuICAgIH07XG4gIH07XG5cbiAgdmFyIGdldFVzZXJNZWRpYV8gPSBmdW5jdGlvbihjb25zdHJhaW50cywgb25TdWNjZXNzLCBvbkVycm9yKSB7XG4gICAgc2hpbUNvbnN0cmFpbnRzXyhjb25zdHJhaW50cywgZnVuY3Rpb24oYykge1xuICAgICAgbmF2aWdhdG9yLndlYmtpdEdldFVzZXJNZWRpYShjLCBvblN1Y2Nlc3MsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKG9uRXJyb3IpIHtcbiAgICAgICAgICBvbkVycm9yKHNoaW1FcnJvcl8oZSkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhID0gZ2V0VXNlck1lZGlhXztcblxuICAvLyBSZXR1cm5zIHRoZSByZXN1bHQgb2YgZ2V0VXNlck1lZGlhIGFzIGEgUHJvbWlzZS5cbiAgdmFyIGdldFVzZXJNZWRpYVByb21pc2VfID0gZnVuY3Rpb24oY29uc3RyYWludHMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzLCByZXNvbHZlLCByZWplY3QpO1xuICAgIH0pO1xuICB9O1xuXG4gIGlmICghbmF2aWdhdG9yLm1lZGlhRGV2aWNlcykge1xuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMgPSB7XG4gICAgICBnZXRVc2VyTWVkaWE6IGdldFVzZXJNZWRpYVByb21pc2VfLFxuICAgICAgZW51bWVyYXRlRGV2aWNlczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICAgICAgdmFyIGtpbmRzID0ge2F1ZGlvOiAnYXVkaW9pbnB1dCcsIHZpZGVvOiAndmlkZW9pbnB1dCd9O1xuICAgICAgICAgIHJldHVybiB3aW5kb3cuTWVkaWFTdHJlYW1UcmFjay5nZXRTb3VyY2VzKGZ1bmN0aW9uKGRldmljZXMpIHtcbiAgICAgICAgICAgIHJlc29sdmUoZGV2aWNlcy5tYXAoZnVuY3Rpb24oZGV2aWNlKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7bGFiZWw6IGRldmljZS5sYWJlbCxcbiAgICAgICAgICAgICAgICBraW5kOiBraW5kc1tkZXZpY2Uua2luZF0sXG4gICAgICAgICAgICAgICAgZGV2aWNlSWQ6IGRldmljZS5pZCxcbiAgICAgICAgICAgICAgICBncm91cElkOiAnJ307XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGdldFN1cHBvcnRlZENvbnN0cmFpbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBkZXZpY2VJZDogdHJ1ZSwgZWNob0NhbmNlbGxhdGlvbjogdHJ1ZSwgZmFjaW5nTW9kZTogdHJ1ZSxcbiAgICAgICAgICBmcmFtZVJhdGU6IHRydWUsIGhlaWdodDogdHJ1ZSwgd2lkdGg6IHRydWVcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gQSBzaGltIGZvciBnZXRVc2VyTWVkaWEgbWV0aG9kIG9uIHRoZSBtZWRpYURldmljZXMgb2JqZWN0LlxuICAvLyBUT0RPKEthcHRlbkphbnNzb24pIHJlbW92ZSBvbmNlIGltcGxlbWVudGVkIGluIENocm9tZSBzdGFibGUuXG4gIGlmICghbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEpIHtcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSA9IGZ1bmN0aW9uKGNvbnN0cmFpbnRzKSB7XG4gICAgICByZXR1cm4gZ2V0VXNlck1lZGlhUHJvbWlzZV8oY29uc3RyYWludHMpO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgLy8gRXZlbiB0aG91Z2ggQ2hyb21lIDQ1IGhhcyBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzIGFuZCBhIGdldFVzZXJNZWRpYVxuICAgIC8vIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYSBQcm9taXNlLCBpdCBkb2VzIG5vdCBhY2NlcHQgc3BlYy1zdHlsZVxuICAgIC8vIGNvbnN0cmFpbnRzLlxuICAgIHZhciBvcmlnR2V0VXNlck1lZGlhID0gbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEuXG4gICAgICAgIGJpbmQobmF2aWdhdG9yLm1lZGlhRGV2aWNlcyk7XG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEgPSBmdW5jdGlvbihjcykge1xuICAgICAgcmV0dXJuIHNoaW1Db25zdHJhaW50c18oY3MsIGZ1bmN0aW9uKGMpIHtcbiAgICAgICAgcmV0dXJuIG9yaWdHZXRVc2VyTWVkaWEoYykudGhlbihmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgICAgICBpZiAoYy5hdWRpbyAmJiAhc3RyZWFtLmdldEF1ZGlvVHJhY2tzKCkubGVuZ3RoIHx8XG4gICAgICAgICAgICAgIGMudmlkZW8gJiYgIXN0cmVhbS5nZXRWaWRlb1RyYWNrcygpLmxlbmd0aCkge1xuICAgICAgICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcbiAgICAgICAgICAgICAgdHJhY2suc3RvcCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKCcnLCAnTm90Rm91bmRFcnJvcicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gc3RyZWFtO1xuICAgICAgICB9LCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHNoaW1FcnJvcl8oZSkpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cblxuICAvLyBEdW1teSBkZXZpY2VjaGFuZ2UgZXZlbnQgbWV0aG9kcy5cbiAgLy8gVE9ETyhLYXB0ZW5KYW5zc29uKSByZW1vdmUgb25jZSBpbXBsZW1lbnRlZCBpbiBDaHJvbWUgc3RhYmxlLlxuICBpZiAodHlwZW9mIG5hdmlnYXRvci5tZWRpYURldmljZXMuYWRkRXZlbnRMaXN0ZW5lciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIGxvZ2dpbmcoJ0R1bW15IG1lZGlhRGV2aWNlcy5hZGRFdmVudExpc3RlbmVyIGNhbGxlZC4nKTtcbiAgICB9O1xuICB9XG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5yZW1vdmVFdmVudExpc3RlbmVyID09PSAndW5kZWZpbmVkJykge1xuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xuICAgICAgbG9nZ2luZygnRHVtbXkgbWVkaWFEZXZpY2VzLnJlbW92ZUV2ZW50TGlzdGVuZXIgY2FsbGVkLicpO1xuICAgIH07XG4gIH1cbn07XG5cbn0se1wiLi4vdXRpbHMuanNcIjoxM31dLDc6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLypcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTcgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcbiAqICB0cmVlLlxuICovXG4gLyogZXNsaW50LWVudiBub2RlICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBTRFBVdGlscyA9IHJlcXVpcmUoJ3NkcCcpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2hpbVJUQ0ljZUNhbmRpZGF0ZTogZnVuY3Rpb24od2luZG93KSB7XG4gICAgLy8gZm91bmRhdGlvbiBpcyBhcmJpdHJhcmlseSBjaG9zZW4gYXMgYW4gaW5kaWNhdG9yIGZvciBmdWxsIHN1cHBvcnQgZm9yXG4gICAgLy8gaHR0cHM6Ly93M2MuZ2l0aHViLmlvL3dlYnJ0Yy1wYy8jcnRjaWNlY2FuZGlkYXRlLWludGVyZmFjZVxuICAgIGlmICghd2luZG93LlJUQ0ljZUNhbmRpZGF0ZSB8fCAod2luZG93LlJUQ0ljZUNhbmRpZGF0ZSAmJiAnZm91bmRhdGlvbicgaW5cbiAgICAgICAgd2luZG93LlJUQ0ljZUNhbmRpZGF0ZS5wcm90b3R5cGUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIE5hdGl2ZVJUQ0ljZUNhbmRpZGF0ZSA9IHdpbmRvdy5SVENJY2VDYW5kaWRhdGU7XG4gICAgd2luZG93LlJUQ0ljZUNhbmRpZGF0ZSA9IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICAgIC8vIFJlbW92ZSB0aGUgYT0gd2hpY2ggc2hvdWxkbid0IGJlIHBhcnQgb2YgdGhlIGNhbmRpZGF0ZSBzdHJpbmcuXG4gICAgICBpZiAodHlwZW9mIGFyZ3MgPT09ICdvYmplY3QnICYmIGFyZ3MuY2FuZGlkYXRlICYmXG4gICAgICAgICAgYXJncy5jYW5kaWRhdGUuaW5kZXhPZignYT0nKSA9PT0gMCkge1xuICAgICAgICBhcmdzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShhcmdzKSk7XG4gICAgICAgIGFyZ3MuY2FuZGlkYXRlID0gYXJncy5jYW5kaWRhdGUuc3Vic3RyKDIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoYXJncy5jYW5kaWRhdGUgJiYgYXJncy5jYW5kaWRhdGUubGVuZ3RoKSB7XG4gICAgICAgIC8vIEF1Z21lbnQgdGhlIG5hdGl2ZSBjYW5kaWRhdGUgd2l0aCB0aGUgcGFyc2VkIGZpZWxkcy5cbiAgICAgICAgdmFyIG5hdGl2ZUNhbmRpZGF0ZSA9IG5ldyBOYXRpdmVSVENJY2VDYW5kaWRhdGUoYXJncyk7XG4gICAgICAgIHZhciBwYXJzZWRDYW5kaWRhdGUgPSBTRFBVdGlscy5wYXJzZUNhbmRpZGF0ZShhcmdzLmNhbmRpZGF0ZSk7XG4gICAgICAgIHZhciBhdWdtZW50ZWRDYW5kaWRhdGUgPSBPYmplY3QuYXNzaWduKG5hdGl2ZUNhbmRpZGF0ZSxcbiAgICAgICAgICAgIHBhcnNlZENhbmRpZGF0ZSk7XG5cbiAgICAgICAgLy8gQWRkIGEgc2VyaWFsaXplciB0aGF0IGRvZXMgbm90IHNlcmlhbGl6ZSB0aGUgZXh0cmEgYXR0cmlidXRlcy5cbiAgICAgICAgYXVnbWVudGVkQ2FuZGlkYXRlLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjYW5kaWRhdGU6IGF1Z21lbnRlZENhbmRpZGF0ZS5jYW5kaWRhdGUsXG4gICAgICAgICAgICBzZHBNaWQ6IGF1Z21lbnRlZENhbmRpZGF0ZS5zZHBNaWQsXG4gICAgICAgICAgICBzZHBNTGluZUluZGV4OiBhdWdtZW50ZWRDYW5kaWRhdGUuc2RwTUxpbmVJbmRleCxcbiAgICAgICAgICAgIHVzZXJuYW1lRnJhZ21lbnQ6IGF1Z21lbnRlZENhbmRpZGF0ZS51c2VybmFtZUZyYWdtZW50LFxuICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBhdWdtZW50ZWRDYW5kaWRhdGU7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IE5hdGl2ZVJUQ0ljZUNhbmRpZGF0ZShhcmdzKTtcbiAgICB9O1xuICAgIHdpbmRvdy5SVENJY2VDYW5kaWRhdGUucHJvdG90eXBlID0gTmF0aXZlUlRDSWNlQ2FuZGlkYXRlLnByb3RvdHlwZTtcblxuICAgIC8vIEhvb2sgdXAgdGhlIGF1Z21lbnRlZCBjYW5kaWRhdGUgaW4gb25pY2VjYW5kaWRhdGUgYW5kXG4gICAgLy8gYWRkRXZlbnRMaXN0ZW5lcignaWNlY2FuZGlkYXRlJywgLi4uKVxuICAgIHV0aWxzLndyYXBQZWVyQ29ubmVjdGlvbkV2ZW50KHdpbmRvdywgJ2ljZWNhbmRpZGF0ZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGlmIChlLmNhbmRpZGF0ZSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgJ2NhbmRpZGF0ZScsIHtcbiAgICAgICAgICB2YWx1ZTogbmV3IHdpbmRvdy5SVENJY2VDYW5kaWRhdGUoZS5jYW5kaWRhdGUpLFxuICAgICAgICAgIHdyaXRhYmxlOiAnZmFsc2UnXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGU7XG4gICAgfSk7XG4gIH0sXG5cbiAgLy8gc2hpbUNyZWF0ZU9iamVjdFVSTCBtdXN0IGJlIGNhbGxlZCBiZWZvcmUgc2hpbVNvdXJjZU9iamVjdCB0byBhdm9pZCBsb29wLlxuXG4gIHNoaW1DcmVhdGVPYmplY3RVUkw6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIHZhciBVUkwgPSB3aW5kb3cgJiYgd2luZG93LlVSTDtcblxuICAgIGlmICghKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50ICYmXG4gICAgICAgICAgJ3NyY09iamVjdCcgaW4gd2luZG93LkhUTUxNZWRpYUVsZW1lbnQucHJvdG90eXBlICYmXG4gICAgICAgIFVSTC5jcmVhdGVPYmplY3RVUkwgJiYgVVJMLnJldm9rZU9iamVjdFVSTCkpIHtcbiAgICAgIC8vIE9ubHkgc2hpbSBDcmVhdGVPYmplY3RVUkwgdXNpbmcgc3JjT2JqZWN0IGlmIHNyY09iamVjdCBleGlzdHMuXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHZhciBuYXRpdmVDcmVhdGVPYmplY3RVUkwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMLmJpbmQoVVJMKTtcbiAgICB2YXIgbmF0aXZlUmV2b2tlT2JqZWN0VVJMID0gVVJMLnJldm9rZU9iamVjdFVSTC5iaW5kKFVSTCk7XG4gICAgdmFyIHN0cmVhbXMgPSBuZXcgTWFwKCksIG5ld0lkID0gMDtcblxuICAgIFVSTC5jcmVhdGVPYmplY3RVUkwgPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgIGlmICgnZ2V0VHJhY2tzJyBpbiBzdHJlYW0pIHtcbiAgICAgICAgdmFyIHVybCA9ICdwb2x5YmxvYjonICsgKCsrbmV3SWQpO1xuICAgICAgICBzdHJlYW1zLnNldCh1cmwsIHN0cmVhbSk7XG4gICAgICAgIHV0aWxzLmRlcHJlY2F0ZWQoJ1VSTC5jcmVhdGVPYmplY3RVUkwoc3RyZWFtKScsXG4gICAgICAgICAgICAnZWxlbS5zcmNPYmplY3QgPSBzdHJlYW0nKTtcbiAgICAgICAgcmV0dXJuIHVybDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuYXRpdmVDcmVhdGVPYmplY3RVUkwoc3RyZWFtKTtcbiAgICB9O1xuICAgIFVSTC5yZXZva2VPYmplY3RVUkwgPSBmdW5jdGlvbih1cmwpIHtcbiAgICAgIG5hdGl2ZVJldm9rZU9iamVjdFVSTCh1cmwpO1xuICAgICAgc3RyZWFtcy5kZWxldGUodXJsKTtcbiAgICB9O1xuXG4gICAgdmFyIGRzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iod2luZG93LkhUTUxNZWRpYUVsZW1lbnQucHJvdG90eXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzcmMnKTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LkhUTUxNZWRpYUVsZW1lbnQucHJvdG90eXBlLCAnc3JjJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGRzYy5nZXQuYXBwbHkodGhpcyk7XG4gICAgICB9LFxuICAgICAgc2V0OiBmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgdGhpcy5zcmNPYmplY3QgPSBzdHJlYW1zLmdldCh1cmwpIHx8IG51bGw7XG4gICAgICAgIHJldHVybiBkc2Muc2V0LmFwcGx5KHRoaXMsIFt1cmxdKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHZhciBuYXRpdmVTZXRBdHRyaWJ1dGUgPSB3aW5kb3cuSFRNTE1lZGlhRWxlbWVudC5wcm90b3R5cGUuc2V0QXR0cmlidXRlO1xuICAgIHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50LnByb3RvdHlwZS5zZXRBdHRyaWJ1dGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyICYmXG4gICAgICAgICAgKCcnICsgYXJndW1lbnRzWzBdKS50b0xvd2VyQ2FzZSgpID09PSAnc3JjJykge1xuICAgICAgICB0aGlzLnNyY09iamVjdCA9IHN0cmVhbXMuZ2V0KGFyZ3VtZW50c1sxXSkgfHwgbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuYXRpdmVTZXRBdHRyaWJ1dGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9LFxuXG4gIHNoaW1NYXhNZXNzYWdlU2l6ZTogZnVuY3Rpb24od2luZG93KSB7XG4gICAgaWYgKHdpbmRvdy5SVENTY3RwVHJhbnNwb3J0IHx8ICF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGJyb3dzZXJEZXRhaWxzID0gdXRpbHMuZGV0ZWN0QnJvd3Nlcih3aW5kb3cpO1xuXG4gICAgaWYgKCEoJ3NjdHAnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSwgJ3NjdHAnLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLl9zY3RwID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiB0aGlzLl9zY3RwO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB2YXIgc2N0cEluRGVzY3JpcHRpb24gPSBmdW5jdGlvbihkZXNjcmlwdGlvbikge1xuICAgICAgdmFyIHNlY3Rpb25zID0gU0RQVXRpbHMuc3BsaXRTZWN0aW9ucyhkZXNjcmlwdGlvbi5zZHApO1xuICAgICAgc2VjdGlvbnMuc2hpZnQoKTtcbiAgICAgIHJldHVybiBzZWN0aW9ucy5zb21lKGZ1bmN0aW9uKG1lZGlhU2VjdGlvbikge1xuICAgICAgICB2YXIgbUxpbmUgPSBTRFBVdGlscy5wYXJzZU1MaW5lKG1lZGlhU2VjdGlvbik7XG4gICAgICAgIHJldHVybiBtTGluZSAmJiBtTGluZS5raW5kID09PSAnYXBwbGljYXRpb24nXG4gICAgICAgICAgICAmJiBtTGluZS5wcm90b2NvbC5pbmRleE9mKCdTQ1RQJykgIT09IC0xO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBnZXRSZW1vdGVGaXJlZm94VmVyc2lvbiA9IGZ1bmN0aW9uKGRlc2NyaXB0aW9uKSB7XG4gICAgICAvLyBUT0RPOiBJcyB0aGVyZSBhIGJldHRlciBzb2x1dGlvbiBmb3IgZGV0ZWN0aW5nIEZpcmVmb3g/XG4gICAgICB2YXIgbWF0Y2ggPSBkZXNjcmlwdGlvbi5zZHAubWF0Y2goL21vemlsbGEuLi5USElTX0lTX1NEUEFSVEEtKFxcZCspLyk7XG4gICAgICBpZiAobWF0Y2ggPT09IG51bGwgfHwgbWF0Y2gubGVuZ3RoIDwgMikge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgICB9XG4gICAgICB2YXIgdmVyc2lvbiA9IHBhcnNlSW50KG1hdGNoWzFdLCAxMCk7XG4gICAgICAvLyBUZXN0IGZvciBOYU4gKHllcywgdGhpcyBpcyB1Z2x5KVxuICAgICAgcmV0dXJuIHZlcnNpb24gIT09IHZlcnNpb24gPyAtMSA6IHZlcnNpb247XG4gICAgfTtcblxuICAgIHZhciBnZXRDYW5TZW5kTWF4TWVzc2FnZVNpemUgPSBmdW5jdGlvbihyZW1vdGVJc0ZpcmVmb3gpIHtcbiAgICAgIC8vIEV2ZXJ5IGltcGxlbWVudGF0aW9uIHdlIGtub3cgY2FuIHNlbmQgYXQgbGVhc3QgNjQgS2lCLlxuICAgICAgLy8gTm90ZTogQWx0aG91Z2ggQ2hyb21lIGlzIHRlY2huaWNhbGx5IGFibGUgdG8gc2VuZCB1cCB0byAyNTYgS2lCLCB0aGVcbiAgICAgIC8vICAgICAgIGRhdGEgZG9lcyBub3QgcmVhY2ggdGhlIG90aGVyIHBlZXIgcmVsaWFibHkuXG4gICAgICAvLyAgICAgICBTZWU6IGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC93ZWJydGMvaXNzdWVzL2RldGFpbD9pZD04NDE5XG4gICAgICB2YXIgY2FuU2VuZE1heE1lc3NhZ2VTaXplID0gNjU1MzY7XG4gICAgICBpZiAoYnJvd3NlckRldGFpbHMuYnJvd3NlciA9PT0gJ2ZpcmVmb3gnKSB7XG4gICAgICAgIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgNTcpIHtcbiAgICAgICAgICBpZiAocmVtb3RlSXNGaXJlZm94ID09PSAtMSkge1xuICAgICAgICAgICAgLy8gRkYgPCA1NyB3aWxsIHNlbmQgaW4gMTYgS2lCIGNodW5rcyB1c2luZyB0aGUgZGVwcmVjYXRlZCBQUElEXG4gICAgICAgICAgICAvLyBmcmFnbWVudGF0aW9uLlxuICAgICAgICAgICAgY2FuU2VuZE1heE1lc3NhZ2VTaXplID0gMTYzODQ7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEhvd2V2ZXIsIG90aGVyIEZGIChhbmQgUkFXUlRDKSBjYW4gcmVhc3NlbWJsZSBQUElELWZyYWdtZW50ZWRcbiAgICAgICAgICAgIC8vIG1lc3NhZ2VzLiBUaHVzLCBzdXBwb3J0aW5nIH4yIEdpQiB3aGVuIHNlbmRpbmcuXG4gICAgICAgICAgICBjYW5TZW5kTWF4TWVzc2FnZVNpemUgPSAyMTQ3NDgzNjM3O1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBDdXJyZW50bHksIGFsbCBGRiA+PSA1NyB3aWxsIHJlc2V0IHRoZSByZW1vdGUgbWF4aW11bSBtZXNzYWdlIHNpemVcbiAgICAgICAgICAvLyB0byB0aGUgZGVmYXVsdCB2YWx1ZSB3aGVuIGEgZGF0YSBjaGFubmVsIGlzIGNyZWF0ZWQgYXQgYSBsYXRlclxuICAgICAgICAgIC8vIHN0YWdlLiA6KFxuICAgICAgICAgIC8vIFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTQyNjgzMVxuICAgICAgICAgIGNhblNlbmRNYXhNZXNzYWdlU2l6ZSA9XG4gICAgICAgICAgICBicm93c2VyRGV0YWlscy52ZXJzaW9uID09PSA1NyA/IDY1NTM1IDogNjU1MzY7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBjYW5TZW5kTWF4TWVzc2FnZVNpemU7XG4gICAgfTtcblxuICAgIHZhciBnZXRNYXhNZXNzYWdlU2l6ZSA9IGZ1bmN0aW9uKGRlc2NyaXB0aW9uLCByZW1vdGVJc0ZpcmVmb3gpIHtcbiAgICAgIC8vIE5vdGU6IDY1NTM2IGJ5dGVzIGlzIHRoZSBkZWZhdWx0IHZhbHVlIGZyb20gdGhlIFNEUCBzcGVjLiBBbHNvLFxuICAgICAgLy8gICAgICAgZXZlcnkgaW1wbGVtZW50YXRpb24gd2Uga25vdyBzdXBwb3J0cyByZWNlaXZpbmcgNjU1MzYgYnl0ZXMuXG4gICAgICB2YXIgbWF4TWVzc2FnZVNpemUgPSA2NTUzNjtcblxuICAgICAgLy8gRkYgNTcgaGFzIGEgc2xpZ2h0bHkgaW5jb3JyZWN0IGRlZmF1bHQgcmVtb3RlIG1heCBtZXNzYWdlIHNpemUsIHNvXG4gICAgICAvLyB3ZSBuZWVkIHRvIGFkanVzdCBpdCBoZXJlIHRvIGF2b2lkIGEgZmFpbHVyZSB3aGVuIHNlbmRpbmcuXG4gICAgICAvLyBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTE0MjU2OTdcbiAgICAgIGlmIChicm93c2VyRGV0YWlscy5icm93c2VyID09PSAnZmlyZWZveCdcbiAgICAgICAgICAgJiYgYnJvd3NlckRldGFpbHMudmVyc2lvbiA9PT0gNTcpIHtcbiAgICAgICAgbWF4TWVzc2FnZVNpemUgPSA2NTUzNTtcbiAgICAgIH1cblxuICAgICAgdmFyIG1hdGNoID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgoZGVzY3JpcHRpb24uc2RwLCAnYT1tYXgtbWVzc2FnZS1zaXplOicpO1xuICAgICAgaWYgKG1hdGNoLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbWF4TWVzc2FnZVNpemUgPSBwYXJzZUludChtYXRjaFswXS5zdWJzdHIoMTkpLCAxMCk7XG4gICAgICB9IGVsc2UgaWYgKGJyb3dzZXJEZXRhaWxzLmJyb3dzZXIgPT09ICdmaXJlZm94JyAmJlxuICAgICAgICAgICAgICAgICAgcmVtb3RlSXNGaXJlZm94ICE9PSAtMSkge1xuICAgICAgICAvLyBJZiB0aGUgbWF4aW11bSBtZXNzYWdlIHNpemUgaXMgbm90IHByZXNlbnQgaW4gdGhlIHJlbW90ZSBTRFAgYW5kXG4gICAgICAgIC8vIGJvdGggbG9jYWwgYW5kIHJlbW90ZSBhcmUgRmlyZWZveCwgdGhlIHJlbW90ZSBwZWVyIGNhbiByZWNlaXZlXG4gICAgICAgIC8vIH4yIEdpQi5cbiAgICAgICAgbWF4TWVzc2FnZVNpemUgPSAyMTQ3NDgzNjM3O1xuICAgICAgfVxuICAgICAgcmV0dXJuIG1heE1lc3NhZ2VTaXplO1xuICAgIH07XG5cbiAgICB2YXIgb3JpZ1NldFJlbW90ZURlc2NyaXB0aW9uID1cbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5zZXRSZW1vdGVEZXNjcmlwdGlvbjtcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnNldFJlbW90ZURlc2NyaXB0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgcGMuX3NjdHAgPSBudWxsO1xuXG4gICAgICBpZiAoc2N0cEluRGVzY3JpcHRpb24oYXJndW1lbnRzWzBdKSkge1xuICAgICAgICAvLyBDaGVjayBpZiB0aGUgcmVtb3RlIGlzIEZGLlxuICAgICAgICB2YXIgaXNGaXJlZm94ID0gZ2V0UmVtb3RlRmlyZWZveFZlcnNpb24oYXJndW1lbnRzWzBdKTtcblxuICAgICAgICAvLyBHZXQgdGhlIG1heGltdW0gbWVzc2FnZSBzaXplIHRoZSBsb2NhbCBwZWVyIGlzIGNhcGFibGUgb2Ygc2VuZGluZ1xuICAgICAgICB2YXIgY2FuU2VuZE1NUyA9IGdldENhblNlbmRNYXhNZXNzYWdlU2l6ZShpc0ZpcmVmb3gpO1xuXG4gICAgICAgIC8vIEdldCB0aGUgbWF4aW11bSBtZXNzYWdlIHNpemUgb2YgdGhlIHJlbW90ZSBwZWVyLlxuICAgICAgICB2YXIgcmVtb3RlTU1TID0gZ2V0TWF4TWVzc2FnZVNpemUoYXJndW1lbnRzWzBdLCBpc0ZpcmVmb3gpO1xuXG4gICAgICAgIC8vIERldGVybWluZSBmaW5hbCBtYXhpbXVtIG1lc3NhZ2Ugc2l6ZVxuICAgICAgICB2YXIgbWF4TWVzc2FnZVNpemU7XG4gICAgICAgIGlmIChjYW5TZW5kTU1TID09PSAwICYmIHJlbW90ZU1NUyA9PT0gMCkge1xuICAgICAgICAgIG1heE1lc3NhZ2VTaXplID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuICAgICAgICB9IGVsc2UgaWYgKGNhblNlbmRNTVMgPT09IDAgfHwgcmVtb3RlTU1TID09PSAwKSB7XG4gICAgICAgICAgbWF4TWVzc2FnZVNpemUgPSBNYXRoLm1heChjYW5TZW5kTU1TLCByZW1vdGVNTVMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1heE1lc3NhZ2VTaXplID0gTWF0aC5taW4oY2FuU2VuZE1NUywgcmVtb3RlTU1TKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENyZWF0ZSBhIGR1bW15IFJUQ1NjdHBUcmFuc3BvcnQgb2JqZWN0IGFuZCB0aGUgJ21heE1lc3NhZ2VTaXplJ1xuICAgICAgICAvLyBhdHRyaWJ1dGUuXG4gICAgICAgIHZhciBzY3RwID0ge307XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzY3RwLCAnbWF4TWVzc2FnZVNpemUnLCB7XG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBtYXhNZXNzYWdlU2l6ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBwYy5fc2N0cCA9IHNjdHA7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvcmlnU2V0UmVtb3RlRGVzY3JpcHRpb24uYXBwbHkocGMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfSxcblxuICBzaGltU2VuZFRocm93VHlwZUVycm9yOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICBpZiAoISh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gJiZcbiAgICAgICAgJ2NyZWF0ZURhdGFDaGFubmVsJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIE5vdGU6IEFsdGhvdWdoIEZpcmVmb3ggPj0gNTcgaGFzIGEgbmF0aXZlIGltcGxlbWVudGF0aW9uLCB0aGUgbWF4aW11bVxuICAgIC8vICAgICAgIG1lc3NhZ2Ugc2l6ZSBjYW4gYmUgcmVzZXQgZm9yIGFsbCBkYXRhIGNoYW5uZWxzIGF0IGEgbGF0ZXIgc3RhZ2UuXG4gICAgLy8gICAgICAgU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xNDI2ODMxXG5cbiAgICB2YXIgb3JpZ0NyZWF0ZURhdGFDaGFubmVsID1cbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlRGF0YUNoYW5uZWw7XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5jcmVhdGVEYXRhQ2hhbm5lbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgIHZhciBkYXRhQ2hhbm5lbCA9IG9yaWdDcmVhdGVEYXRhQ2hhbm5lbC5hcHBseShwYywgYXJndW1lbnRzKTtcbiAgICAgIHZhciBvcmlnRGF0YUNoYW5uZWxTZW5kID0gZGF0YUNoYW5uZWwuc2VuZDtcblxuICAgICAgLy8gUGF0Y2ggJ3NlbmQnIG1ldGhvZFxuICAgICAgZGF0YUNoYW5uZWwuc2VuZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZGMgPSB0aGlzO1xuICAgICAgICB2YXIgZGF0YSA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgdmFyIGxlbmd0aCA9IGRhdGEubGVuZ3RoIHx8IGRhdGEuc2l6ZSB8fCBkYXRhLmJ5dGVMZW5ndGg7XG4gICAgICAgIGlmIChsZW5ndGggPiBwYy5zY3RwLm1heE1lc3NhZ2VTaXplKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbignTWVzc2FnZSB0b28gbGFyZ2UgKGNhbiBzZW5kIGEgbWF4aW11bSBvZiAnICtcbiAgICAgICAgICAgIHBjLnNjdHAubWF4TWVzc2FnZVNpemUgKyAnIGJ5dGVzKScsICdUeXBlRXJyb3InKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3JpZ0RhdGFDaGFubmVsU2VuZC5hcHBseShkYywgYXJndW1lbnRzKTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBkYXRhQ2hhbm5lbDtcbiAgICB9O1xuICB9XG59O1xuXG59LHtcIi4vdXRpbHNcIjoxMyxcInNkcFwiOjJ9XSw4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8qXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXG4gKiAgdHJlZS5cbiAqL1xuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xudmFyIHNoaW1SVENQZWVyQ29ubmVjdGlvbiA9IHJlcXVpcmUoJ3J0Y3BlZXJjb25uZWN0aW9uLXNoaW0nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNoaW1HZXRVc2VyTWVkaWE6IHJlcXVpcmUoJy4vZ2V0dXNlcm1lZGlhJyksXG4gIHNoaW1QZWVyQ29ubmVjdGlvbjogZnVuY3Rpb24od2luZG93KSB7XG4gICAgdmFyIGJyb3dzZXJEZXRhaWxzID0gdXRpbHMuZGV0ZWN0QnJvd3Nlcih3aW5kb3cpO1xuXG4gICAgaWYgKHdpbmRvdy5SVENJY2VHYXRoZXJlcikge1xuICAgICAgaWYgKCF3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlKSB7XG4gICAgICAgIHdpbmRvdy5SVENJY2VDYW5kaWRhdGUgPSBmdW5jdGlvbihhcmdzKSB7XG4gICAgICAgICAgcmV0dXJuIGFyZ3M7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBpZiAoIXdpbmRvdy5SVENTZXNzaW9uRGVzY3JpcHRpb24pIHtcbiAgICAgICAgd2luZG93LlJUQ1Nlc3Npb25EZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICAgICAgICByZXR1cm4gYXJncztcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIC8vIHRoaXMgYWRkcyBhbiBhZGRpdGlvbmFsIGV2ZW50IGxpc3RlbmVyIHRvIE1lZGlhU3RyYWNrVHJhY2sgdGhhdCBzaWduYWxzXG4gICAgICAvLyB3aGVuIGEgdHJhY2tzIGVuYWJsZWQgcHJvcGVydHkgd2FzIGNoYW5nZWQuIFdvcmthcm91bmQgZm9yIGEgYnVnIGluXG4gICAgICAvLyBhZGRTdHJlYW0sIHNlZSBiZWxvdy4gTm8gbG9uZ2VyIHJlcXVpcmVkIGluIDE1MDI1K1xuICAgICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCAxNTAyNSkge1xuICAgICAgICB2YXIgb3JpZ01TVEVuYWJsZWQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKFxuICAgICAgICAgICAgd2luZG93Lk1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLCAnZW5hYmxlZCcpO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93Lk1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLCAnZW5hYmxlZCcsIHtcbiAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICBvcmlnTVNURW5hYmxlZC5zZXQuY2FsbCh0aGlzLCB2YWx1ZSk7XG4gICAgICAgICAgICB2YXIgZXYgPSBuZXcgRXZlbnQoJ2VuYWJsZWQnKTtcbiAgICAgICAgICAgIGV2LmVuYWJsZWQgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBPUlRDIGRlZmluZXMgdGhlIERUTUYgc2VuZGVyIGEgYml0IGRpZmZlcmVudC5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdzNjL29ydGMvaXNzdWVzLzcxNFxuICAgIGlmICh3aW5kb3cuUlRDUnRwU2VuZGVyICYmICEoJ2R0bWYnIGluIHdpbmRvdy5SVENSdHBTZW5kZXIucHJvdG90eXBlKSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENSdHBTZW5kZXIucHJvdG90eXBlLCAnZHRtZicsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAodGhpcy5fZHRtZiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50cmFjay5raW5kID09PSAnYXVkaW8nKSB7XG4gICAgICAgICAgICAgIHRoaXMuX2R0bWYgPSBuZXcgd2luZG93LlJUQ0R0bWZTZW5kZXIodGhpcyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHJhY2sua2luZCA9PT0gJ3ZpZGVvJykge1xuICAgICAgICAgICAgICB0aGlzLl9kdG1mID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2R0bWY7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBFZGdlIGN1cnJlbnRseSBvbmx5IGltcGxlbWVudHMgdGhlIFJUQ0R0bWZTZW5kZXIsIG5vdCB0aGVcbiAgICAvLyBSVENEVE1GU2VuZGVyIGFsaWFzLiBTZWUgaHR0cDovL2RyYWZ0Lm9ydGMub3JnLyNydGNkdG1mc2VuZGVyMipcbiAgICBpZiAod2luZG93LlJUQ0R0bWZTZW5kZXIgJiYgIXdpbmRvdy5SVENEVE1GU2VuZGVyKSB7XG4gICAgICB3aW5kb3cuUlRDRFRNRlNlbmRlciA9IHdpbmRvdy5SVENEdG1mU2VuZGVyO1xuICAgIH1cblxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiA9XG4gICAgICAgIHNoaW1SVENQZWVyQ29ubmVjdGlvbih3aW5kb3csIGJyb3dzZXJEZXRhaWxzLnZlcnNpb24pO1xuICB9LFxuICBzaGltUmVwbGFjZVRyYWNrOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICAvLyBPUlRDIGhhcyByZXBsYWNlVHJhY2sgLS0gaHR0cHM6Ly9naXRodWIuY29tL3czYy9vcnRjL2lzc3Vlcy82MTRcbiAgICBpZiAod2luZG93LlJUQ1J0cFNlbmRlciAmJlxuICAgICAgICAhKCdyZXBsYWNlVHJhY2snIGluIHdpbmRvdy5SVENSdHBTZW5kZXIucHJvdG90eXBlKSkge1xuICAgICAgd2luZG93LlJUQ1J0cFNlbmRlci5wcm90b3R5cGUucmVwbGFjZVRyYWNrID1cbiAgICAgICAgICB3aW5kb3cuUlRDUnRwU2VuZGVyLnByb3RvdHlwZS5zZXRUcmFjaztcbiAgICB9XG4gIH1cbn07XG5cbn0se1wiLi4vdXRpbHNcIjoxMyxcIi4vZ2V0dXNlcm1lZGlhXCI6OSxcInJ0Y3BlZXJjb25uZWN0aW9uLXNoaW1cIjoxfV0sOTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vKlxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxuICogIHRyZWUuXG4gKi9cbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cbid1c2Ugc3RyaWN0JztcblxuLy8gRXhwb3NlIHB1YmxpYyBtZXRob2RzLlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih3aW5kb3cpIHtcbiAgdmFyIG5hdmlnYXRvciA9IHdpbmRvdyAmJiB3aW5kb3cubmF2aWdhdG9yO1xuXG4gIHZhciBzaGltRXJyb3JfID0gZnVuY3Rpb24oZSkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiB7UGVybWlzc2lvbkRlbmllZEVycm9yOiAnTm90QWxsb3dlZEVycm9yJ31bZS5uYW1lXSB8fCBlLm5hbWUsXG4gICAgICBtZXNzYWdlOiBlLm1lc3NhZ2UsXG4gICAgICBjb25zdHJhaW50OiBlLmNvbnN0cmFpbnQsXG4gICAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWU7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICAvLyBnZXRVc2VyTWVkaWEgZXJyb3Igc2hpbS5cbiAgdmFyIG9yaWdHZXRVc2VyTWVkaWEgPSBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYS5cbiAgICAgIGJpbmQobmF2aWdhdG9yLm1lZGlhRGV2aWNlcyk7XG4gIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhID0gZnVuY3Rpb24oYykge1xuICAgIHJldHVybiBvcmlnR2V0VXNlck1lZGlhKGMpLmNhdGNoKGZ1bmN0aW9uKGUpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChzaGltRXJyb3JfKGUpKTtcbiAgICB9KTtcbiAgfTtcbn07XG5cbn0se31dLDEwOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8qXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXG4gKiAgdHJlZS5cbiAqL1xuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2hpbUdldFVzZXJNZWRpYTogcmVxdWlyZSgnLi9nZXR1c2VybWVkaWEnKSxcbiAgc2hpbU9uVHJhY2s6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gJiYgISgnb250cmFjaycgaW5cbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLCAnb250cmFjaycsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fb250cmFjaztcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbihmKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX29udHJhY2spIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhY2snLCB0aGlzLl9vbnRyYWNrKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWRkc3RyZWFtJywgdGhpcy5fb250cmFja3BvbHkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYWNrJywgdGhpcy5fb250cmFjayA9IGYpO1xuICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignYWRkc3RyZWFtJywgdGhpcy5fb250cmFja3BvbHkgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XG4gICAgICAgICAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgndHJhY2snKTtcbiAgICAgICAgICAgICAgZXZlbnQudHJhY2sgPSB0cmFjaztcbiAgICAgICAgICAgICAgZXZlbnQucmVjZWl2ZXIgPSB7dHJhY2s6IHRyYWNrfTtcbiAgICAgICAgICAgICAgZXZlbnQudHJhbnNjZWl2ZXIgPSB7cmVjZWl2ZXI6IGV2ZW50LnJlY2VpdmVyfTtcbiAgICAgICAgICAgICAgZXZlbnQuc3RyZWFtcyA9IFtlLnN0cmVhbV07XG4gICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgd2luZG93LlJUQ1RyYWNrRXZlbnQgJiZcbiAgICAgICAgKCdyZWNlaXZlcicgaW4gd2luZG93LlJUQ1RyYWNrRXZlbnQucHJvdG90eXBlKSAmJlxuICAgICAgICAhKCd0cmFuc2NlaXZlcicgaW4gd2luZG93LlJUQ1RyYWNrRXZlbnQucHJvdG90eXBlKSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENUcmFja0V2ZW50LnByb3RvdHlwZSwgJ3RyYW5zY2VpdmVyJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB7cmVjZWl2ZXI6IHRoaXMucmVjZWl2ZXJ9O1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgc2hpbVNvdXJjZU9iamVjdDogZnVuY3Rpb24od2luZG93KSB7XG4gICAgLy8gRmlyZWZveCBoYXMgc3VwcG9ydGVkIG1velNyY09iamVjdCBzaW5jZSBGRjIyLCB1bnByZWZpeGVkIGluIDQyLlxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50ICYmXG4gICAgICAgICEoJ3NyY09iamVjdCcgaW4gd2luZG93LkhUTUxNZWRpYUVsZW1lbnQucHJvdG90eXBlKSkge1xuICAgICAgICAvLyBTaGltIHRoZSBzcmNPYmplY3QgcHJvcGVydHksIG9uY2UsIHdoZW4gSFRNTE1lZGlhRWxlbWVudCBpcyBmb3VuZC5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50LnByb3RvdHlwZSwgJ3NyY09iamVjdCcsIHtcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW96U3JjT2JqZWN0O1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc2V0OiBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgICAgICAgIHRoaXMubW96U3JjT2JqZWN0ID0gc3RyZWFtO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHNoaW1QZWVyQ29ubmVjdGlvbjogZnVuY3Rpb24od2luZG93KSB7XG4gICAgdmFyIGJyb3dzZXJEZXRhaWxzID0gdXRpbHMuZGV0ZWN0QnJvd3Nlcih3aW5kb3cpO1xuXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICdvYmplY3QnIHx8ICEod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uIHx8XG4gICAgICAgIHdpbmRvdy5tb3pSVENQZWVyQ29ubmVjdGlvbikpIHtcbiAgICAgIHJldHVybjsgLy8gcHJvYmFibHkgbWVkaWEucGVlcmNvbm5lY3Rpb24uZW5hYmxlZD1mYWxzZSBpbiBhYm91dDpjb25maWdcbiAgICB9XG4gICAgLy8gVGhlIFJUQ1BlZXJDb25uZWN0aW9uIG9iamVjdC5cbiAgICBpZiAoIXdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbikge1xuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uID0gZnVuY3Rpb24ocGNDb25maWcsIHBjQ29uc3RyYWludHMpIHtcbiAgICAgICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCAzOCkge1xuICAgICAgICAgIC8vIC51cmxzIGlzIG5vdCBzdXBwb3J0ZWQgaW4gRkYgPCAzOC5cbiAgICAgICAgICAvLyBjcmVhdGUgUlRDSWNlU2VydmVycyB3aXRoIGEgc2luZ2xlIHVybC5cbiAgICAgICAgICBpZiAocGNDb25maWcgJiYgcGNDb25maWcuaWNlU2VydmVycykge1xuICAgICAgICAgICAgdmFyIG5ld0ljZVNlcnZlcnMgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGNDb25maWcuaWNlU2VydmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICB2YXIgc2VydmVyID0gcGNDb25maWcuaWNlU2VydmVyc1tpXTtcbiAgICAgICAgICAgICAgaWYgKHNlcnZlci5oYXNPd25Qcm9wZXJ0eSgndXJscycpKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzZXJ2ZXIudXJscy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgdmFyIG5ld1NlcnZlciA9IHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBzZXJ2ZXIudXJsc1tqXVxuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgIGlmIChzZXJ2ZXIudXJsc1tqXS5pbmRleE9mKCd0dXJuJykgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3U2VydmVyLnVzZXJuYW1lID0gc2VydmVyLnVzZXJuYW1lO1xuICAgICAgICAgICAgICAgICAgICBuZXdTZXJ2ZXIuY3JlZGVudGlhbCA9IHNlcnZlci5jcmVkZW50aWFsO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgbmV3SWNlU2VydmVycy5wdXNoKG5ld1NlcnZlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld0ljZVNlcnZlcnMucHVzaChwY0NvbmZpZy5pY2VTZXJ2ZXJzW2ldKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGNDb25maWcuaWNlU2VydmVycyA9IG5ld0ljZVNlcnZlcnM7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgd2luZG93Lm1velJUQ1BlZXJDb25uZWN0aW9uKHBjQ29uZmlnLCBwY0NvbnN0cmFpbnRzKTtcbiAgICAgIH07XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlID1cbiAgICAgICAgICB3aW5kb3cubW96UlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlO1xuXG4gICAgICAvLyB3cmFwIHN0YXRpYyBtZXRob2RzLiBDdXJyZW50bHkganVzdCBnZW5lcmF0ZUNlcnRpZmljYXRlLlxuICAgICAgaWYgKHdpbmRvdy5tb3pSVENQZWVyQ29ubmVjdGlvbi5nZW5lcmF0ZUNlcnRpZmljYXRlKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24sICdnZW5lcmF0ZUNlcnRpZmljYXRlJywge1xuICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93Lm1velJUQ1BlZXJDb25uZWN0aW9uLmdlbmVyYXRlQ2VydGlmaWNhdGU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgd2luZG93LlJUQ1Nlc3Npb25EZXNjcmlwdGlvbiA9IHdpbmRvdy5tb3pSVENTZXNzaW9uRGVzY3JpcHRpb247XG4gICAgICB3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlID0gd2luZG93Lm1velJUQ0ljZUNhbmRpZGF0ZTtcbiAgICB9XG5cbiAgICAvLyBzaGltIGF3YXkgbmVlZCBmb3Igb2Jzb2xldGUgUlRDSWNlQ2FuZGlkYXRlL1JUQ1Nlc3Npb25EZXNjcmlwdGlvbi5cbiAgICBbJ3NldExvY2FsRGVzY3JpcHRpb24nLCAnc2V0UmVtb3RlRGVzY3JpcHRpb24nLCAnYWRkSWNlQ2FuZGlkYXRlJ11cbiAgICAgICAgLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgICAgdmFyIG5hdGl2ZU1ldGhvZCA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXTtcbiAgICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGFyZ3VtZW50c1swXSA9IG5ldyAoKG1ldGhvZCA9PT0gJ2FkZEljZUNhbmRpZGF0ZScpID9cbiAgICAgICAgICAgICAgICB3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlIDpcbiAgICAgICAgICAgICAgICB3aW5kb3cuUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKShhcmd1bWVudHNbMF0pO1xuICAgICAgICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgLy8gc3VwcG9ydCBmb3IgYWRkSWNlQ2FuZGlkYXRlKG51bGwgb3IgdW5kZWZpbmVkKVxuICAgIHZhciBuYXRpdmVBZGRJY2VDYW5kaWRhdGUgPVxuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZEljZUNhbmRpZGF0ZTtcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZEljZUNhbmRpZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCFhcmd1bWVudHNbMF0pIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50c1sxXSkge1xuICAgICAgICAgIGFyZ3VtZW50c1sxXS5hcHBseShudWxsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmF0aXZlQWRkSWNlQ2FuZGlkYXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcblxuICAgIC8vIHNoaW0gZ2V0U3RhdHMgd2l0aCBtYXBsaWtlIHN1cHBvcnRcbiAgICB2YXIgbWFrZU1hcFN0YXRzID0gZnVuY3Rpb24oc3RhdHMpIHtcbiAgICAgIHZhciBtYXAgPSBuZXcgTWFwKCk7XG4gICAgICBPYmplY3Qua2V5cyhzdGF0cykuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgbWFwLnNldChrZXksIHN0YXRzW2tleV0pO1xuICAgICAgICBtYXBba2V5XSA9IHN0YXRzW2tleV07XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBtYXA7XG4gICAgfTtcblxuICAgIHZhciBtb2Rlcm5TdGF0c1R5cGVzID0ge1xuICAgICAgaW5ib3VuZHJ0cDogJ2luYm91bmQtcnRwJyxcbiAgICAgIG91dGJvdW5kcnRwOiAnb3V0Ym91bmQtcnRwJyxcbiAgICAgIGNhbmRpZGF0ZXBhaXI6ICdjYW5kaWRhdGUtcGFpcicsXG4gICAgICBsb2NhbGNhbmRpZGF0ZTogJ2xvY2FsLWNhbmRpZGF0ZScsXG4gICAgICByZW1vdGVjYW5kaWRhdGU6ICdyZW1vdGUtY2FuZGlkYXRlJ1xuICAgIH07XG5cbiAgICB2YXIgbmF0aXZlR2V0U3RhdHMgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFN0YXRzO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U3RhdHMgPSBmdW5jdGlvbihcbiAgICAgIHNlbGVjdG9yLFxuICAgICAgb25TdWNjLFxuICAgICAgb25FcnJcbiAgICApIHtcbiAgICAgIHJldHVybiBuYXRpdmVHZXRTdGF0cy5hcHBseSh0aGlzLCBbc2VsZWN0b3IgfHwgbnVsbF0pXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKHN0YXRzKSB7XG4gICAgICAgICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCA0OCkge1xuICAgICAgICAgICAgc3RhdHMgPSBtYWtlTWFwU3RhdHMoc3RhdHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDUzICYmICFvblN1Y2MpIHtcbiAgICAgICAgICAgIC8vIFNoaW0gb25seSBwcm9taXNlIGdldFN0YXRzIHdpdGggc3BlYy1oeXBoZW5zIGluIHR5cGUgbmFtZXNcbiAgICAgICAgICAgIC8vIExlYXZlIGNhbGxiYWNrIHZlcnNpb24gYWxvbmU7IG1pc2Mgb2xkIHVzZXMgb2YgZm9yRWFjaCBiZWZvcmUgTWFwXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBzdGF0cy5mb3JFYWNoKGZ1bmN0aW9uKHN0YXQpIHtcbiAgICAgICAgICAgICAgICBzdGF0LnR5cGUgPSBtb2Rlcm5TdGF0c1R5cGVzW3N0YXQudHlwZV0gfHwgc3RhdC50eXBlO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgaWYgKGUubmFtZSAhPT0gJ1R5cGVFcnJvcicpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vIEF2b2lkIFR5cGVFcnJvcjogXCJ0eXBlXCIgaXMgcmVhZC1vbmx5LCBpbiBvbGQgdmVyc2lvbnMuIDM0LTQzaXNoXG4gICAgICAgICAgICAgIHN0YXRzLmZvckVhY2goZnVuY3Rpb24oc3RhdCwgaSkge1xuICAgICAgICAgICAgICAgIHN0YXRzLnNldChpLCBPYmplY3QuYXNzaWduKHt9LCBzdGF0LCB7XG4gICAgICAgICAgICAgICAgICB0eXBlOiBtb2Rlcm5TdGF0c1R5cGVzW3N0YXQudHlwZV0gfHwgc3RhdC50eXBlXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHN0YXRzO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihvblN1Y2MsIG9uRXJyKTtcbiAgICB9O1xuICB9LFxuXG4gIHNoaW1SZW1vdmVTdHJlYW06IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIGlmICghd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uIHx8XG4gICAgICAgICdyZW1vdmVTdHJlYW0nIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICB1dGlscy5kZXByZWNhdGVkKCdyZW1vdmVTdHJlYW0nLCAncmVtb3ZlVHJhY2snKTtcbiAgICAgIHRoaXMuZ2V0U2VuZGVycygpLmZvckVhY2goZnVuY3Rpb24oc2VuZGVyKSB7XG4gICAgICAgIGlmIChzZW5kZXIudHJhY2sgJiYgc3RyZWFtLmdldFRyYWNrcygpLmluZGV4T2Yoc2VuZGVyLnRyYWNrKSAhPT0gLTEpIHtcbiAgICAgICAgICBwYy5yZW1vdmVUcmFjayhzZW5kZXIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG59O1xuXG59LHtcIi4uL3V0aWxzXCI6MTMsXCIuL2dldHVzZXJtZWRpYVwiOjExfV0sMTE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLypcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcbiAqICB0cmVlLlxuICovXG4gLyogZXNsaW50LWVudiBub2RlICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG52YXIgbG9nZ2luZyA9IHV0aWxzLmxvZztcblxuLy8gRXhwb3NlIHB1YmxpYyBtZXRob2RzLlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih3aW5kb3cpIHtcbiAgdmFyIGJyb3dzZXJEZXRhaWxzID0gdXRpbHMuZGV0ZWN0QnJvd3Nlcih3aW5kb3cpO1xuICB2YXIgbmF2aWdhdG9yID0gd2luZG93ICYmIHdpbmRvdy5uYXZpZ2F0b3I7XG4gIHZhciBNZWRpYVN0cmVhbVRyYWNrID0gd2luZG93ICYmIHdpbmRvdy5NZWRpYVN0cmVhbVRyYWNrO1xuXG4gIHZhciBzaGltRXJyb3JfID0gZnVuY3Rpb24oZSkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiB7XG4gICAgICAgIEludGVybmFsRXJyb3I6ICdOb3RSZWFkYWJsZUVycm9yJyxcbiAgICAgICAgTm90U3VwcG9ydGVkRXJyb3I6ICdUeXBlRXJyb3InLFxuICAgICAgICBQZXJtaXNzaW9uRGVuaWVkRXJyb3I6ICdOb3RBbGxvd2VkRXJyb3InLFxuICAgICAgICBTZWN1cml0eUVycm9yOiAnTm90QWxsb3dlZEVycm9yJ1xuICAgICAgfVtlLm5hbWVdIHx8IGUubmFtZSxcbiAgICAgIG1lc3NhZ2U6IHtcbiAgICAgICAgJ1RoZSBvcGVyYXRpb24gaXMgaW5zZWN1cmUuJzogJ1RoZSByZXF1ZXN0IGlzIG5vdCBhbGxvd2VkIGJ5IHRoZSAnICtcbiAgICAgICAgJ3VzZXIgYWdlbnQgb3IgdGhlIHBsYXRmb3JtIGluIHRoZSBjdXJyZW50IGNvbnRleHQuJ1xuICAgICAgfVtlLm1lc3NhZ2VdIHx8IGUubWVzc2FnZSxcbiAgICAgIGNvbnN0cmFpbnQ6IGUuY29uc3RyYWludCxcbiAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZSArICh0aGlzLm1lc3NhZ2UgJiYgJzogJykgKyB0aGlzLm1lc3NhZ2U7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICAvLyBnZXRVc2VyTWVkaWEgY29uc3RyYWludHMgc2hpbS5cbiAgdmFyIGdldFVzZXJNZWRpYV8gPSBmdW5jdGlvbihjb25zdHJhaW50cywgb25TdWNjZXNzLCBvbkVycm9yKSB7XG4gICAgdmFyIGNvbnN0cmFpbnRzVG9GRjM3XyA9IGZ1bmN0aW9uKGMpIHtcbiAgICAgIGlmICh0eXBlb2YgYyAhPT0gJ29iamVjdCcgfHwgYy5yZXF1aXJlKSB7XG4gICAgICAgIHJldHVybiBjO1xuICAgICAgfVxuICAgICAgdmFyIHJlcXVpcmUgPSBbXTtcbiAgICAgIE9iamVjdC5rZXlzKGMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIGlmIChrZXkgPT09ICdyZXF1aXJlJyB8fCBrZXkgPT09ICdhZHZhbmNlZCcgfHwga2V5ID09PSAnbWVkaWFTb3VyY2UnKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciByID0gY1trZXldID0gKHR5cGVvZiBjW2tleV0gPT09ICdvYmplY3QnKSA/XG4gICAgICAgICAgICBjW2tleV0gOiB7aWRlYWw6IGNba2V5XX07XG4gICAgICAgIGlmIChyLm1pbiAhPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICByLm1heCAhPT0gdW5kZWZpbmVkIHx8IHIuZXhhY3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJlcXVpcmUucHVzaChrZXkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyLmV4YWN0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHIuZXhhY3QgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByLiBtaW4gPSByLm1heCA9IHIuZXhhY3Q7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNba2V5XSA9IHIuZXhhY3Q7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRlbGV0ZSByLmV4YWN0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChyLmlkZWFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjLmFkdmFuY2VkID0gYy5hZHZhbmNlZCB8fCBbXTtcbiAgICAgICAgICB2YXIgb2MgPSB7fTtcbiAgICAgICAgICBpZiAodHlwZW9mIHIuaWRlYWwgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBvY1trZXldID0ge21pbjogci5pZGVhbCwgbWF4OiByLmlkZWFsfTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb2Nba2V5XSA9IHIuaWRlYWw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGMuYWR2YW5jZWQucHVzaChvYyk7XG4gICAgICAgICAgZGVsZXRlIHIuaWRlYWw7XG4gICAgICAgICAgaWYgKCFPYmplY3Qua2V5cyhyKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBjW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChyZXF1aXJlLmxlbmd0aCkge1xuICAgICAgICBjLnJlcXVpcmUgPSByZXF1aXJlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGM7XG4gICAgfTtcbiAgICBjb25zdHJhaW50cyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoY29uc3RyYWludHMpKTtcbiAgICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDM4KSB7XG4gICAgICBsb2dnaW5nKCdzcGVjOiAnICsgSlNPTi5zdHJpbmdpZnkoY29uc3RyYWludHMpKTtcbiAgICAgIGlmIChjb25zdHJhaW50cy5hdWRpbykge1xuICAgICAgICBjb25zdHJhaW50cy5hdWRpbyA9IGNvbnN0cmFpbnRzVG9GRjM3Xyhjb25zdHJhaW50cy5hdWRpbyk7XG4gICAgICB9XG4gICAgICBpZiAoY29uc3RyYWludHMudmlkZW8pIHtcbiAgICAgICAgY29uc3RyYWludHMudmlkZW8gPSBjb25zdHJhaW50c1RvRkYzN18oY29uc3RyYWludHMudmlkZW8pO1xuICAgICAgfVxuICAgICAgbG9nZ2luZygnZmYzNzogJyArIEpTT04uc3RyaW5naWZ5KGNvbnN0cmFpbnRzKSk7XG4gICAgfVxuICAgIHJldHVybiBuYXZpZ2F0b3IubW96R2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzLCBvblN1Y2Nlc3MsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIG9uRXJyb3Ioc2hpbUVycm9yXyhlKSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gUmV0dXJucyB0aGUgcmVzdWx0IG9mIGdldFVzZXJNZWRpYSBhcyBhIFByb21pc2UuXG4gIHZhciBnZXRVc2VyTWVkaWFQcm9taXNlXyA9IGZ1bmN0aW9uKGNvbnN0cmFpbnRzKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgZ2V0VXNlck1lZGlhXyhjb25zdHJhaW50cywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBTaGltIGZvciBtZWRpYURldmljZXMgb24gb2xkZXIgdmVyc2lvbnMuXG4gIGlmICghbmF2aWdhdG9yLm1lZGlhRGV2aWNlcykge1xuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMgPSB7Z2V0VXNlck1lZGlhOiBnZXRVc2VyTWVkaWFQcm9taXNlXyxcbiAgICAgIGFkZEV2ZW50TGlzdGVuZXI6IGZ1bmN0aW9uKCkgeyB9LFxuICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcjogZnVuY3Rpb24oKSB7IH1cbiAgICB9O1xuICB9XG4gIG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlcyA9XG4gICAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmVudW1lcmF0ZURldmljZXMgfHwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICAgICAgdmFyIGluZm9zID0gW1xuICAgICAgICAgICAge2tpbmQ6ICdhdWRpb2lucHV0JywgZGV2aWNlSWQ6ICdkZWZhdWx0JywgbGFiZWw6ICcnLCBncm91cElkOiAnJ30sXG4gICAgICAgICAgICB7a2luZDogJ3ZpZGVvaW5wdXQnLCBkZXZpY2VJZDogJ2RlZmF1bHQnLCBsYWJlbDogJycsIGdyb3VwSWQ6ICcnfVxuICAgICAgICAgIF07XG4gICAgICAgICAgcmVzb2x2ZShpbmZvcyk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDQxKSB7XG4gICAgLy8gV29yayBhcm91bmQgaHR0cDovL2J1Z3ppbC5sYS8xMTY5NjY1XG4gICAgdmFyIG9yZ0VudW1lcmF0ZURldmljZXMgPVxuICAgICAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmVudW1lcmF0ZURldmljZXMuYmluZChuYXZpZ2F0b3IubWVkaWFEZXZpY2VzKTtcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmVudW1lcmF0ZURldmljZXMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBvcmdFbnVtZXJhdGVEZXZpY2VzKCkudGhlbih1bmRlZmluZWQsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKGUubmFtZSA9PT0gJ05vdEZvdW5kRXJyb3InKSB7XG4gICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG4gIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgNDkpIHtcbiAgICB2YXIgb3JpZ0dldFVzZXJNZWRpYSA9IG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhLlxuICAgICAgICBiaW5kKG5hdmlnYXRvci5tZWRpYURldmljZXMpO1xuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhID0gZnVuY3Rpb24oYykge1xuICAgICAgcmV0dXJuIG9yaWdHZXRVc2VyTWVkaWEoYykudGhlbihmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgICAgLy8gV29yayBhcm91bmQgaHR0cHM6Ly9idWd6aWwubGEvODAyMzI2XG4gICAgICAgIGlmIChjLmF1ZGlvICYmICFzdHJlYW0uZ2V0QXVkaW9UcmFja3MoKS5sZW5ndGggfHxcbiAgICAgICAgICAgIGMudmlkZW8gJiYgIXN0cmVhbS5nZXRWaWRlb1RyYWNrcygpLmxlbmd0aCkge1xuICAgICAgICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XG4gICAgICAgICAgICB0cmFjay5zdG9wKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbignVGhlIG9iamVjdCBjYW4gbm90IGJlIGZvdW5kIGhlcmUuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdOb3RGb3VuZEVycm9yJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0cmVhbTtcbiAgICAgIH0sIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHNoaW1FcnJvcl8oZSkpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfVxuICBpZiAoIShicm93c2VyRGV0YWlscy52ZXJzaW9uID4gNTUgJiZcbiAgICAgICdhdXRvR2FpbkNvbnRyb2wnIGluIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0U3VwcG9ydGVkQ29uc3RyYWludHMoKSkpIHtcbiAgICB2YXIgcmVtYXAgPSBmdW5jdGlvbihvYmosIGEsIGIpIHtcbiAgICAgIGlmIChhIGluIG9iaiAmJiAhKGIgaW4gb2JqKSkge1xuICAgICAgICBvYmpbYl0gPSBvYmpbYV07XG4gICAgICAgIGRlbGV0ZSBvYmpbYV07XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBuYXRpdmVHZXRVc2VyTWVkaWEgPSBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYS5cbiAgICAgICAgYmluZChuYXZpZ2F0b3IubWVkaWFEZXZpY2VzKTtcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSA9IGZ1bmN0aW9uKGMpIHtcbiAgICAgIGlmICh0eXBlb2YgYyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIGMuYXVkaW8gPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGMpKTtcbiAgICAgICAgcmVtYXAoYy5hdWRpbywgJ2F1dG9HYWluQ29udHJvbCcsICdtb3pBdXRvR2FpbkNvbnRyb2wnKTtcbiAgICAgICAgcmVtYXAoYy5hdWRpbywgJ25vaXNlU3VwcHJlc3Npb24nLCAnbW96Tm9pc2VTdXBwcmVzc2lvbicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5hdGl2ZUdldFVzZXJNZWRpYShjKTtcbiAgICB9O1xuXG4gICAgaWYgKE1lZGlhU3RyZWFtVHJhY2sgJiYgTWVkaWFTdHJlYW1UcmFjay5wcm90b3R5cGUuZ2V0U2V0dGluZ3MpIHtcbiAgICAgIHZhciBuYXRpdmVHZXRTZXR0aW5ncyA9IE1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLmdldFNldHRpbmdzO1xuICAgICAgTWVkaWFTdHJlYW1UcmFjay5wcm90b3R5cGUuZ2V0U2V0dGluZ3MgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG9iaiA9IG5hdGl2ZUdldFNldHRpbmdzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIHJlbWFwKG9iaiwgJ21vekF1dG9HYWluQ29udHJvbCcsICdhdXRvR2FpbkNvbnRyb2wnKTtcbiAgICAgICAgcmVtYXAob2JqLCAnbW96Tm9pc2VTdXBwcmVzc2lvbicsICdub2lzZVN1cHByZXNzaW9uJyk7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmIChNZWRpYVN0cmVhbVRyYWNrICYmIE1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLmFwcGx5Q29uc3RyYWludHMpIHtcbiAgICAgIHZhciBuYXRpdmVBcHBseUNvbnN0cmFpbnRzID0gTWVkaWFTdHJlYW1UcmFjay5wcm90b3R5cGUuYXBwbHlDb25zdHJhaW50cztcbiAgICAgIE1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLmFwcGx5Q29uc3RyYWludHMgPSBmdW5jdGlvbihjKSB7XG4gICAgICAgIGlmICh0aGlzLmtpbmQgPT09ICdhdWRpbycgJiYgdHlwZW9mIGMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgYyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYykpO1xuICAgICAgICAgIHJlbWFwKGMsICdhdXRvR2FpbkNvbnRyb2wnLCAnbW96QXV0b0dhaW5Db250cm9sJyk7XG4gICAgICAgICAgcmVtYXAoYywgJ25vaXNlU3VwcHJlc3Npb24nLCAnbW96Tm9pc2VTdXBwcmVzc2lvbicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuYXRpdmVBcHBseUNvbnN0cmFpbnRzLmFwcGx5KHRoaXMsIFtjXSk7XG4gICAgICB9O1xuICAgIH1cbiAgfVxuICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhID0gZnVuY3Rpb24oY29uc3RyYWludHMsIG9uU3VjY2Vzcywgb25FcnJvcikge1xuICAgIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgNDQpIHtcbiAgICAgIHJldHVybiBnZXRVc2VyTWVkaWFfKGNvbnN0cmFpbnRzLCBvblN1Y2Nlc3MsIG9uRXJyb3IpO1xuICAgIH1cbiAgICAvLyBSZXBsYWNlIEZpcmVmb3ggNDQrJ3MgZGVwcmVjYXRpb24gd2FybmluZyB3aXRoIHVucHJlZml4ZWQgdmVyc2lvbi5cbiAgICB1dGlscy5kZXByZWNhdGVkKCduYXZpZ2F0b3IuZ2V0VXNlck1lZGlhJyxcbiAgICAgICAgJ25hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhJyk7XG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoY29uc3RyYWludHMpLnRoZW4ob25TdWNjZXNzLCBvbkVycm9yKTtcbiAgfTtcbn07XG5cbn0se1wiLi4vdXRpbHNcIjoxM31dLDEyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8qXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXG4gKiAgdHJlZS5cbiAqL1xuJ3VzZSBzdHJpY3QnO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNoaW1Mb2NhbFN0cmVhbXNBUEk6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAnb2JqZWN0JyB8fCAhd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghKCdnZXRMb2NhbFN0cmVhbXMnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldExvY2FsU3RyZWFtcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2xvY2FsU3RyZWFtcykge1xuICAgICAgICAgIHRoaXMuX2xvY2FsU3RyZWFtcyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9sb2NhbFN0cmVhbXM7XG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAoISgnZ2V0U3RyZWFtQnlJZCcgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkpIHtcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U3RyZWFtQnlJZCA9IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBudWxsO1xuICAgICAgICBpZiAodGhpcy5fbG9jYWxTdHJlYW1zKSB7XG4gICAgICAgICAgdGhpcy5fbG9jYWxTdHJlYW1zLmZvckVhY2goZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICAgICAgICBpZiAoc3RyZWFtLmlkID09PSBpZCkge1xuICAgICAgICAgICAgICByZXN1bHQgPSBzdHJlYW07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3JlbW90ZVN0cmVhbXMpIHtcbiAgICAgICAgICB0aGlzLl9yZW1vdGVTdHJlYW1zLmZvckVhY2goZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICAgICAgICBpZiAoc3RyZWFtLmlkID09PSBpZCkge1xuICAgICAgICAgICAgICByZXN1bHQgPSBzdHJlYW07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH07XG4gICAgfVxuICAgIGlmICghKCdhZGRTdHJlYW0nIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XG4gICAgICB2YXIgX2FkZFRyYWNrID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjaztcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICAgIGlmICghdGhpcy5fbG9jYWxTdHJlYW1zKSB7XG4gICAgICAgICAgdGhpcy5fbG9jYWxTdHJlYW1zID0gW107XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2xvY2FsU3RyZWFtcy5pbmRleE9mKHN0cmVhbSkgPT09IC0xKSB7XG4gICAgICAgICAgdGhpcy5fbG9jYWxTdHJlYW1zLnB1c2goc3RyZWFtKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xuICAgICAgICAgIF9hZGRUcmFjay5jYWxsKHBjLCB0cmFjaywgc3RyZWFtKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFRyYWNrID0gZnVuY3Rpb24odHJhY2ssIHN0cmVhbSkge1xuICAgICAgICBpZiAoc3RyZWFtKSB7XG4gICAgICAgICAgaWYgKCF0aGlzLl9sb2NhbFN0cmVhbXMpIHtcbiAgICAgICAgICAgIHRoaXMuX2xvY2FsU3RyZWFtcyA9IFtzdHJlYW1dO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fbG9jYWxTdHJlYW1zLmluZGV4T2Yoc3RyZWFtKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuX2xvY2FsU3RyZWFtcy5wdXNoKHN0cmVhbSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfYWRkVHJhY2suY2FsbCh0aGlzLCB0cmFjaywgc3RyZWFtKTtcbiAgICAgIH07XG4gICAgfVxuICAgIGlmICghKCdyZW1vdmVTdHJlYW0nIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgICBpZiAoIXRoaXMuX2xvY2FsU3RyZWFtcykge1xuICAgICAgICAgIHRoaXMuX2xvY2FsU3RyZWFtcyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuX2xvY2FsU3RyZWFtcy5pbmRleE9mKHN0cmVhbSk7XG4gICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbG9jYWxTdHJlYW1zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICAgIHZhciB0cmFja3MgPSBzdHJlYW0uZ2V0VHJhY2tzKCk7XG4gICAgICAgIHRoaXMuZ2V0U2VuZGVycygpLmZvckVhY2goZnVuY3Rpb24oc2VuZGVyKSB7XG4gICAgICAgICAgaWYgKHRyYWNrcy5pbmRleE9mKHNlbmRlci50cmFjaykgIT09IC0xKSB7XG4gICAgICAgICAgICBwYy5yZW1vdmVUcmFjayhzZW5kZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH1cbiAgfSxcbiAgc2hpbVJlbW90ZVN0cmVhbXNBUEk6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAnb2JqZWN0JyB8fCAhd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghKCdnZXRSZW1vdGVTdHJlYW1zJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRSZW1vdGVTdHJlYW1zID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZW1vdGVTdHJlYW1zID8gdGhpcy5fcmVtb3RlU3RyZWFtcyA6IFtdO1xuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKCEoJ29uYWRkc3RyZWFtJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUsICdvbmFkZHN0cmVhbScsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fb25hZGRzdHJlYW07XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24oZikge1xuICAgICAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICAgICAgaWYgKHRoaXMuX29uYWRkc3RyZWFtKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2FkZHN0cmVhbScsIHRoaXMuX29uYWRkc3RyZWFtKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhY2snLCB0aGlzLl9vbmFkZHN0cmVhbXBvbHkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2FkZHN0cmVhbScsIHRoaXMuX29uYWRkc3RyZWFtID0gZik7XG4gICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCd0cmFjaycsIHRoaXMuX29uYWRkc3RyZWFtcG9seSA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUuc3RyZWFtcy5mb3JFYWNoKGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgICAgICAgICBpZiAoIXBjLl9yZW1vdGVTdHJlYW1zKSB7XG4gICAgICAgICAgICAgICAgcGMuX3JlbW90ZVN0cmVhbXMgPSBbXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAocGMuX3JlbW90ZVN0cmVhbXMuaW5kZXhPZihzdHJlYW0pID49IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcGMuX3JlbW90ZVN0cmVhbXMucHVzaChzdHJlYW0pO1xuICAgICAgICAgICAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ2FkZHN0cmVhbScpO1xuICAgICAgICAgICAgICBldmVudC5zdHJlYW0gPSBzdHJlYW07XG4gICAgICAgICAgICAgIHBjLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgc2hpbUNhbGxiYWNrc0FQSTogZnVuY3Rpb24od2luZG93KSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICdvYmplY3QnIHx8ICF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHByb3RvdHlwZSA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGU7XG4gICAgdmFyIGNyZWF0ZU9mZmVyID0gcHJvdG90eXBlLmNyZWF0ZU9mZmVyO1xuICAgIHZhciBjcmVhdGVBbnN3ZXIgPSBwcm90b3R5cGUuY3JlYXRlQW5zd2VyO1xuICAgIHZhciBzZXRMb2NhbERlc2NyaXB0aW9uID0gcHJvdG90eXBlLnNldExvY2FsRGVzY3JpcHRpb247XG4gICAgdmFyIHNldFJlbW90ZURlc2NyaXB0aW9uID0gcHJvdG90eXBlLnNldFJlbW90ZURlc2NyaXB0aW9uO1xuICAgIHZhciBhZGRJY2VDYW5kaWRhdGUgPSBwcm90b3R5cGUuYWRkSWNlQ2FuZGlkYXRlO1xuXG4gICAgcHJvdG90eXBlLmNyZWF0ZU9mZmVyID0gZnVuY3Rpb24oc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spIHtcbiAgICAgIHZhciBvcHRpb25zID0gKGFyZ3VtZW50cy5sZW5ndGggPj0gMikgPyBhcmd1bWVudHNbMl0gOiBhcmd1bWVudHNbMF07XG4gICAgICB2YXIgcHJvbWlzZSA9IGNyZWF0ZU9mZmVyLmFwcGx5KHRoaXMsIFtvcHRpb25zXSk7XG4gICAgICBpZiAoIWZhaWx1cmVDYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgIH1cbiAgICAgIHByb21pc2UudGhlbihzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjayk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfTtcblxuICAgIHByb3RvdHlwZS5jcmVhdGVBbnN3ZXIgPSBmdW5jdGlvbihzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjaykge1xuICAgICAgdmFyIG9wdGlvbnMgPSAoYXJndW1lbnRzLmxlbmd0aCA+PSAyKSA/IGFyZ3VtZW50c1syXSA6IGFyZ3VtZW50c1swXTtcbiAgICAgIHZhciBwcm9taXNlID0gY3JlYXRlQW5zd2VyLmFwcGx5KHRoaXMsIFtvcHRpb25zXSk7XG4gICAgICBpZiAoIWZhaWx1cmVDYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgIH1cbiAgICAgIHByb21pc2UudGhlbihzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjayk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfTtcblxuICAgIHZhciB3aXRoQ2FsbGJhY2sgPSBmdW5jdGlvbihkZXNjcmlwdGlvbiwgc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spIHtcbiAgICAgIHZhciBwcm9taXNlID0gc2V0TG9jYWxEZXNjcmlwdGlvbi5hcHBseSh0aGlzLCBbZGVzY3JpcHRpb25dKTtcbiAgICAgIGlmICghZmFpbHVyZUNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgICAgfVxuICAgICAgcHJvbWlzZS50aGVuKHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9O1xuICAgIHByb3RvdHlwZS5zZXRMb2NhbERlc2NyaXB0aW9uID0gd2l0aENhbGxiYWNrO1xuXG4gICAgd2l0aENhbGxiYWNrID0gZnVuY3Rpb24oZGVzY3JpcHRpb24sIHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKSB7XG4gICAgICB2YXIgcHJvbWlzZSA9IHNldFJlbW90ZURlc2NyaXB0aW9uLmFwcGx5KHRoaXMsIFtkZXNjcmlwdGlvbl0pO1xuICAgICAgaWYgKCFmYWlsdXJlQ2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgICB9XG4gICAgICBwcm9taXNlLnRoZW4oc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH07XG4gICAgcHJvdG90eXBlLnNldFJlbW90ZURlc2NyaXB0aW9uID0gd2l0aENhbGxiYWNrO1xuXG4gICAgd2l0aENhbGxiYWNrID0gZnVuY3Rpb24oY2FuZGlkYXRlLCBzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjaykge1xuICAgICAgdmFyIHByb21pc2UgPSBhZGRJY2VDYW5kaWRhdGUuYXBwbHkodGhpcywgW2NhbmRpZGF0ZV0pO1xuICAgICAgaWYgKCFmYWlsdXJlQ2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgICB9XG4gICAgICBwcm9taXNlLnRoZW4oc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH07XG4gICAgcHJvdG90eXBlLmFkZEljZUNhbmRpZGF0ZSA9IHdpdGhDYWxsYmFjaztcbiAgfSxcbiAgc2hpbUdldFVzZXJNZWRpYTogZnVuY3Rpb24od2luZG93KSB7XG4gICAgdmFyIG5hdmlnYXRvciA9IHdpbmRvdyAmJiB3aW5kb3cubmF2aWdhdG9yO1xuXG4gICAgaWYgKCFuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhKSB7XG4gICAgICBpZiAobmF2aWdhdG9yLndlYmtpdEdldFVzZXJNZWRpYSkge1xuICAgICAgICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhID0gbmF2aWdhdG9yLndlYmtpdEdldFVzZXJNZWRpYS5iaW5kKG5hdmlnYXRvcik7XG4gICAgICB9IGVsc2UgaWYgKG5hdmlnYXRvci5tZWRpYURldmljZXMgJiZcbiAgICAgICAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSkge1xuICAgICAgICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhID0gZnVuY3Rpb24oY29uc3RyYWludHMsIGNiLCBlcnJjYikge1xuICAgICAgICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzKVxuICAgICAgICAgIC50aGVuKGNiLCBlcnJjYik7XG4gICAgICAgIH0uYmluZChuYXZpZ2F0b3IpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgc2hpbVJUQ0ljZVNlcnZlclVybHM6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIC8vIG1pZ3JhdGUgZnJvbSBub24tc3BlYyBSVENJY2VTZXJ2ZXIudXJsIHRvIFJUQ0ljZVNlcnZlci51cmxzXG4gICAgdmFyIE9yaWdQZWVyQ29ubmVjdGlvbiA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbjtcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gPSBmdW5jdGlvbihwY0NvbmZpZywgcGNDb25zdHJhaW50cykge1xuICAgICAgaWYgKHBjQ29uZmlnICYmIHBjQ29uZmlnLmljZVNlcnZlcnMpIHtcbiAgICAgICAgdmFyIG5ld0ljZVNlcnZlcnMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwY0NvbmZpZy5pY2VTZXJ2ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIHNlcnZlciA9IHBjQ29uZmlnLmljZVNlcnZlcnNbaV07XG4gICAgICAgICAgaWYgKCFzZXJ2ZXIuaGFzT3duUHJvcGVydHkoJ3VybHMnKSAmJlxuICAgICAgICAgICAgICBzZXJ2ZXIuaGFzT3duUHJvcGVydHkoJ3VybCcpKSB7XG4gICAgICAgICAgICB1dGlscy5kZXByZWNhdGVkKCdSVENJY2VTZXJ2ZXIudXJsJywgJ1JUQ0ljZVNlcnZlci51cmxzJyk7XG4gICAgICAgICAgICBzZXJ2ZXIgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHNlcnZlcikpO1xuICAgICAgICAgICAgc2VydmVyLnVybHMgPSBzZXJ2ZXIudXJsO1xuICAgICAgICAgICAgZGVsZXRlIHNlcnZlci51cmw7XG4gICAgICAgICAgICBuZXdJY2VTZXJ2ZXJzLnB1c2goc2VydmVyKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3SWNlU2VydmVycy5wdXNoKHBjQ29uZmlnLmljZVNlcnZlcnNbaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwY0NvbmZpZy5pY2VTZXJ2ZXJzID0gbmV3SWNlU2VydmVycztcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgT3JpZ1BlZXJDb25uZWN0aW9uKHBjQ29uZmlnLCBwY0NvbnN0cmFpbnRzKTtcbiAgICB9O1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUgPSBPcmlnUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlO1xuICAgIC8vIHdyYXAgc3RhdGljIG1ldGhvZHMuIEN1cnJlbnRseSBqdXN0IGdlbmVyYXRlQ2VydGlmaWNhdGUuXG4gICAgaWYgKCdnZW5lcmF0ZUNlcnRpZmljYXRlJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24pIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24sICdnZW5lcmF0ZUNlcnRpZmljYXRlJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBPcmlnUGVlckNvbm5lY3Rpb24uZ2VuZXJhdGVDZXJ0aWZpY2F0ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9LFxuICBzaGltVHJhY2tFdmVudFRyYW5zY2VpdmVyOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICAvLyBBZGQgZXZlbnQudHJhbnNjZWl2ZXIgbWVtYmVyIG92ZXIgZGVwcmVjYXRlZCBldmVudC5yZWNlaXZlclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gJiZcbiAgICAgICAgKCdyZWNlaXZlcicgaW4gd2luZG93LlJUQ1RyYWNrRXZlbnQucHJvdG90eXBlKSAmJlxuICAgICAgICAvLyBjYW4ndCBjaGVjayAndHJhbnNjZWl2ZXInIGluIHdpbmRvdy5SVENUcmFja0V2ZW50LnByb3RvdHlwZSwgYXMgaXQgaXNcbiAgICAgICAgLy8gZGVmaW5lZCBmb3Igc29tZSByZWFzb24gZXZlbiB3aGVuIHdpbmRvdy5SVENUcmFuc2NlaXZlciBpcyBub3QuXG4gICAgICAgICF3aW5kb3cuUlRDVHJhbnNjZWl2ZXIpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDVHJhY2tFdmVudC5wcm90b3R5cGUsICd0cmFuc2NlaXZlcicsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4ge3JlY2VpdmVyOiB0aGlzLnJlY2VpdmVyfTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIHNoaW1DcmVhdGVPZmZlckxlZ2FjeTogZnVuY3Rpb24od2luZG93KSB7XG4gICAgdmFyIG9yaWdDcmVhdGVPZmZlciA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlT2ZmZXI7XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5jcmVhdGVPZmZlciA9IGZ1bmN0aW9uKG9mZmVyT3B0aW9ucykge1xuICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgIGlmIChvZmZlck9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAvLyBzdXBwb3J0IGJpdCB2YWx1ZXNcbiAgICAgICAgICBvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbyA9ICEhb2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW87XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGF1ZGlvVHJhbnNjZWl2ZXIgPSBwYy5nZXRUcmFuc2NlaXZlcnMoKS5maW5kKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XG4gICAgICAgICAgcmV0dXJuIHRyYW5zY2VpdmVyLnNlbmRlci50cmFjayAmJlxuICAgICAgICAgICAgICB0cmFuc2NlaXZlci5zZW5kZXIudHJhY2sua2luZCA9PT0gJ2F1ZGlvJztcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbyA9PT0gZmFsc2UgJiYgYXVkaW9UcmFuc2NlaXZlcikge1xuICAgICAgICAgIGlmIChhdWRpb1RyYW5zY2VpdmVyLmRpcmVjdGlvbiA9PT0gJ3NlbmRyZWN2Jykge1xuICAgICAgICAgICAgaWYgKGF1ZGlvVHJhbnNjZWl2ZXIuc2V0RGlyZWN0aW9uKSB7XG4gICAgICAgICAgICAgIGF1ZGlvVHJhbnNjZWl2ZXIuc2V0RGlyZWN0aW9uKCdzZW5kb25seScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgYXVkaW9UcmFuc2NlaXZlci5kaXJlY3Rpb24gPSAnc2VuZG9ubHknO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoYXVkaW9UcmFuc2NlaXZlci5kaXJlY3Rpb24gPT09ICdyZWN2b25seScpIHtcbiAgICAgICAgICAgIGlmIChhdWRpb1RyYW5zY2VpdmVyLnNldERpcmVjdGlvbikge1xuICAgICAgICAgICAgICBhdWRpb1RyYW5zY2VpdmVyLnNldERpcmVjdGlvbignaW5hY3RpdmUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGF1ZGlvVHJhbnNjZWl2ZXIuZGlyZWN0aW9uID0gJ2luYWN0aXZlJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW8gPT09IHRydWUgJiZcbiAgICAgICAgICAgICFhdWRpb1RyYW5zY2VpdmVyKSB7XG4gICAgICAgICAgcGMuYWRkVHJhbnNjZWl2ZXIoJ2F1ZGlvJyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmICh0eXBlb2Ygb2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW8gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgLy8gc3VwcG9ydCBiaXQgdmFsdWVzXG4gICAgICAgICAgb2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlVmlkZW8gPSAhIW9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvO1xuICAgICAgICB9XG4gICAgICAgIHZhciB2aWRlb1RyYW5zY2VpdmVyID0gcGMuZ2V0VHJhbnNjZWl2ZXJzKCkuZmluZChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xuICAgICAgICAgIHJldHVybiB0cmFuc2NlaXZlci5zZW5kZXIudHJhY2sgJiZcbiAgICAgICAgICAgICAgdHJhbnNjZWl2ZXIuc2VuZGVyLnRyYWNrLmtpbmQgPT09ICd2aWRlbyc7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlVmlkZW8gPT09IGZhbHNlICYmIHZpZGVvVHJhbnNjZWl2ZXIpIHtcbiAgICAgICAgICBpZiAodmlkZW9UcmFuc2NlaXZlci5kaXJlY3Rpb24gPT09ICdzZW5kcmVjdicpIHtcbiAgICAgICAgICAgIHZpZGVvVHJhbnNjZWl2ZXIuc2V0RGlyZWN0aW9uKCdzZW5kb25seScpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodmlkZW9UcmFuc2NlaXZlci5kaXJlY3Rpb24gPT09ICdyZWN2b25seScpIHtcbiAgICAgICAgICAgIHZpZGVvVHJhbnNjZWl2ZXIuc2V0RGlyZWN0aW9uKCdpbmFjdGl2ZScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVWaWRlbyA9PT0gdHJ1ZSAmJlxuICAgICAgICAgICAgIXZpZGVvVHJhbnNjZWl2ZXIpIHtcbiAgICAgICAgICBwYy5hZGRUcmFuc2NlaXZlcigndmlkZW8nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG9yaWdDcmVhdGVPZmZlci5hcHBseShwYywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG59O1xuXG59LHtcIi4uL3V0aWxzXCI6MTN9XSwxMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vKlxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxuICogIHRyZWUuXG4gKi9cbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIGxvZ0Rpc2FibGVkXyA9IHRydWU7XG52YXIgZGVwcmVjYXRpb25XYXJuaW5nc18gPSB0cnVlO1xuXG4vKipcbiAqIEV4dHJhY3QgYnJvd3NlciB2ZXJzaW9uIG91dCBvZiB0aGUgcHJvdmlkZWQgdXNlciBhZ2VudCBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHshc3RyaW5nfSB1YXN0cmluZyB1c2VyQWdlbnQgc3RyaW5nLlxuICogQHBhcmFtIHshc3RyaW5nfSBleHByIFJlZ3VsYXIgZXhwcmVzc2lvbiB1c2VkIGFzIG1hdGNoIGNyaXRlcmlhLlxuICogQHBhcmFtIHshbnVtYmVyfSBwb3MgcG9zaXRpb24gaW4gdGhlIHZlcnNpb24gc3RyaW5nIHRvIGJlIHJldHVybmVkLlxuICogQHJldHVybiB7IW51bWJlcn0gYnJvd3NlciB2ZXJzaW9uLlxuICovXG5mdW5jdGlvbiBleHRyYWN0VmVyc2lvbih1YXN0cmluZywgZXhwciwgcG9zKSB7XG4gIHZhciBtYXRjaCA9IHVhc3RyaW5nLm1hdGNoKGV4cHIpO1xuICByZXR1cm4gbWF0Y2ggJiYgbWF0Y2gubGVuZ3RoID49IHBvcyAmJiBwYXJzZUludChtYXRjaFtwb3NdLCAxMCk7XG59XG5cbi8vIFdyYXBzIHRoZSBwZWVyY29ubmVjdGlvbiBldmVudCBldmVudE5hbWVUb1dyYXAgaW4gYSBmdW5jdGlvblxuLy8gd2hpY2ggcmV0dXJucyB0aGUgbW9kaWZpZWQgZXZlbnQgb2JqZWN0LlxuZnVuY3Rpb24gd3JhcFBlZXJDb25uZWN0aW9uRXZlbnQod2luZG93LCBldmVudE5hbWVUb1dyYXAsIHdyYXBwZXIpIHtcbiAgaWYgKCF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIHByb3RvID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZTtcbiAgdmFyIG5hdGl2ZUFkZEV2ZW50TGlzdGVuZXIgPSBwcm90by5hZGRFdmVudExpc3RlbmVyO1xuICBwcm90by5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24obmF0aXZlRXZlbnROYW1lLCBjYikge1xuICAgIGlmIChuYXRpdmVFdmVudE5hbWUgIT09IGV2ZW50TmFtZVRvV3JhcCkge1xuICAgICAgcmV0dXJuIG5hdGl2ZUFkZEV2ZW50TGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gICAgdmFyIHdyYXBwZWRDYWxsYmFjayA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIGNiKHdyYXBwZXIoZSkpO1xuICAgIH07XG4gICAgdGhpcy5fZXZlbnRNYXAgPSB0aGlzLl9ldmVudE1hcCB8fCB7fTtcbiAgICB0aGlzLl9ldmVudE1hcFtjYl0gPSB3cmFwcGVkQ2FsbGJhY2s7XG4gICAgcmV0dXJuIG5hdGl2ZUFkZEV2ZW50TGlzdGVuZXIuYXBwbHkodGhpcywgW25hdGl2ZUV2ZW50TmFtZSxcbiAgICAgIHdyYXBwZWRDYWxsYmFja10pO1xuICB9O1xuXG4gIHZhciBuYXRpdmVSZW1vdmVFdmVudExpc3RlbmVyID0gcHJvdG8ucmVtb3ZlRXZlbnRMaXN0ZW5lcjtcbiAgcHJvdG8ucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKG5hdGl2ZUV2ZW50TmFtZSwgY2IpIHtcbiAgICBpZiAobmF0aXZlRXZlbnROYW1lICE9PSBldmVudE5hbWVUb1dyYXAgfHwgIXRoaXMuX2V2ZW50TWFwXG4gICAgICAgIHx8ICF0aGlzLl9ldmVudE1hcFtjYl0pIHtcbiAgICAgIHJldHVybiBuYXRpdmVSZW1vdmVFdmVudExpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICAgIHZhciB1bndyYXBwZWRDYiA9IHRoaXMuX2V2ZW50TWFwW2NiXTtcbiAgICBkZWxldGUgdGhpcy5fZXZlbnRNYXBbY2JdO1xuICAgIHJldHVybiBuYXRpdmVSZW1vdmVFdmVudExpc3RlbmVyLmFwcGx5KHRoaXMsIFtuYXRpdmVFdmVudE5hbWUsXG4gICAgICB1bndyYXBwZWRDYl0pO1xuICB9O1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgJ29uJyArIGV2ZW50TmFtZVRvV3JhcCwge1xuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpc1snX29uJyArIGV2ZW50TmFtZVRvV3JhcF07XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKGNiKSB7XG4gICAgICBpZiAodGhpc1snX29uJyArIGV2ZW50TmFtZVRvV3JhcF0pIHtcbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZVRvV3JhcCxcbiAgICAgICAgICAgIHRoaXNbJ19vbicgKyBldmVudE5hbWVUb1dyYXBdKTtcbiAgICAgICAgZGVsZXRlIHRoaXNbJ19vbicgKyBldmVudE5hbWVUb1dyYXBdO1xuICAgICAgfVxuICAgICAgaWYgKGNiKSB7XG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWVUb1dyYXAsXG4gICAgICAgICAgICB0aGlzWydfb24nICsgZXZlbnROYW1lVG9XcmFwXSA9IGNiKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuXG4vLyBVdGlsaXR5IG1ldGhvZHMuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZXh0cmFjdFZlcnNpb246IGV4dHJhY3RWZXJzaW9uLFxuICB3cmFwUGVlckNvbm5lY3Rpb25FdmVudDogd3JhcFBlZXJDb25uZWN0aW9uRXZlbnQsXG4gIGRpc2FibGVMb2c6IGZ1bmN0aW9uKGJvb2wpIHtcbiAgICBpZiAodHlwZW9mIGJvb2wgIT09ICdib29sZWFuJykge1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcignQXJndW1lbnQgdHlwZTogJyArIHR5cGVvZiBib29sICtcbiAgICAgICAgICAnLiBQbGVhc2UgdXNlIGEgYm9vbGVhbi4nKTtcbiAgICB9XG4gICAgbG9nRGlzYWJsZWRfID0gYm9vbDtcbiAgICByZXR1cm4gKGJvb2wpID8gJ2FkYXB0ZXIuanMgbG9nZ2luZyBkaXNhYmxlZCcgOlxuICAgICAgICAnYWRhcHRlci5qcyBsb2dnaW5nIGVuYWJsZWQnO1xuICB9LFxuXG4gIC8qKlxuICAgKiBEaXNhYmxlIG9yIGVuYWJsZSBkZXByZWNhdGlvbiB3YXJuaW5nc1xuICAgKiBAcGFyYW0geyFib29sZWFufSBib29sIHNldCB0byB0cnVlIHRvIGRpc2FibGUgd2FybmluZ3MuXG4gICAqL1xuICBkaXNhYmxlV2FybmluZ3M6IGZ1bmN0aW9uKGJvb2wpIHtcbiAgICBpZiAodHlwZW9mIGJvb2wgIT09ICdib29sZWFuJykge1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcignQXJndW1lbnQgdHlwZTogJyArIHR5cGVvZiBib29sICtcbiAgICAgICAgICAnLiBQbGVhc2UgdXNlIGEgYm9vbGVhbi4nKTtcbiAgICB9XG4gICAgZGVwcmVjYXRpb25XYXJuaW5nc18gPSAhYm9vbDtcbiAgICByZXR1cm4gJ2FkYXB0ZXIuanMgZGVwcmVjYXRpb24gd2FybmluZ3MgJyArIChib29sID8gJ2Rpc2FibGVkJyA6ICdlbmFibGVkJyk7XG4gIH0sXG5cbiAgbG9nOiBmdW5jdGlvbigpIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChsb2dEaXNhYmxlZF8pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgY29uc29sZS5sb2cgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIFNob3dzIGEgZGVwcmVjYXRpb24gd2FybmluZyBzdWdnZXN0aW5nIHRoZSBtb2Rlcm4gYW5kIHNwZWMtY29tcGF0aWJsZSBBUEkuXG4gICAqL1xuICBkZXByZWNhdGVkOiBmdW5jdGlvbihvbGRNZXRob2QsIG5ld01ldGhvZCkge1xuICAgIGlmICghZGVwcmVjYXRpb25XYXJuaW5nc18pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc29sZS53YXJuKG9sZE1ldGhvZCArICcgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSAnICsgbmV3TWV0aG9kICtcbiAgICAgICAgJyBpbnN0ZWFkLicpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBCcm93c2VyIGRldGVjdG9yLlxuICAgKlxuICAgKiBAcmV0dXJuIHtvYmplY3R9IHJlc3VsdCBjb250YWluaW5nIGJyb3dzZXIgYW5kIHZlcnNpb25cbiAgICogICAgIHByb3BlcnRpZXMuXG4gICAqL1xuICBkZXRlY3RCcm93c2VyOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICB2YXIgbmF2aWdhdG9yID0gd2luZG93ICYmIHdpbmRvdy5uYXZpZ2F0b3I7XG5cbiAgICAvLyBSZXR1cm5lZCByZXN1bHQgb2JqZWN0LlxuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICByZXN1bHQuYnJvd3NlciA9IG51bGw7XG4gICAgcmVzdWx0LnZlcnNpb24gPSBudWxsO1xuXG4gICAgLy8gRmFpbCBlYXJseSBpZiBpdCdzIG5vdCBhIGJyb3dzZXJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgfHwgIXdpbmRvdy5uYXZpZ2F0b3IpIHtcbiAgICAgIHJlc3VsdC5icm93c2VyID0gJ05vdCBhIGJyb3dzZXIuJztcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgaWYgKG5hdmlnYXRvci5tb3pHZXRVc2VyTWVkaWEpIHsgLy8gRmlyZWZveC5cbiAgICAgIHJlc3VsdC5icm93c2VyID0gJ2ZpcmVmb3gnO1xuICAgICAgcmVzdWx0LnZlcnNpb24gPSBleHRyYWN0VmVyc2lvbihuYXZpZ2F0b3IudXNlckFnZW50LFxuICAgICAgICAgIC9GaXJlZm94XFwvKFxcZCspXFwuLywgMSk7XG4gICAgfSBlbHNlIGlmIChuYXZpZ2F0b3Iud2Via2l0R2V0VXNlck1lZGlhKSB7XG4gICAgICAvLyBDaHJvbWUsIENocm9taXVtLCBXZWJ2aWV3LCBPcGVyYS5cbiAgICAgIC8vIFZlcnNpb24gbWF0Y2hlcyBDaHJvbWUvV2ViUlRDIHZlcnNpb24uXG4gICAgICByZXN1bHQuYnJvd3NlciA9ICdjaHJvbWUnO1xuICAgICAgcmVzdWx0LnZlcnNpb24gPSBleHRyYWN0VmVyc2lvbihuYXZpZ2F0b3IudXNlckFnZW50LFxuICAgICAgICAgIC9DaHJvbShlfGl1bSlcXC8oXFxkKylcXC4vLCAyKTtcbiAgICB9IGVsc2UgaWYgKG5hdmlnYXRvci5tZWRpYURldmljZXMgJiZcbiAgICAgICAgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvRWRnZVxcLyhcXGQrKS4oXFxkKykkLykpIHsgLy8gRWRnZS5cbiAgICAgIHJlc3VsdC5icm93c2VyID0gJ2VkZ2UnO1xuICAgICAgcmVzdWx0LnZlcnNpb24gPSBleHRyYWN0VmVyc2lvbihuYXZpZ2F0b3IudXNlckFnZW50LFxuICAgICAgICAgIC9FZGdlXFwvKFxcZCspLihcXGQrKSQvLCAyKTtcbiAgICB9IGVsc2UgaWYgKHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiAmJlxuICAgICAgICBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9BcHBsZVdlYktpdFxcLyhcXGQrKVxcLi8pKSB7IC8vIFNhZmFyaS5cbiAgICAgIHJlc3VsdC5icm93c2VyID0gJ3NhZmFyaSc7XG4gICAgICByZXN1bHQudmVyc2lvbiA9IGV4dHJhY3RWZXJzaW9uKG5hdmlnYXRvci51c2VyQWdlbnQsXG4gICAgICAgICAgL0FwcGxlV2ViS2l0XFwvKFxcZCspXFwuLywgMSk7XG4gICAgfSBlbHNlIHsgLy8gRGVmYXVsdCBmYWxsdGhyb3VnaDogbm90IHN1cHBvcnRlZC5cbiAgICAgIHJlc3VsdC5icm93c2VyID0gJ05vdCBhIHN1cHBvcnRlZCBicm93c2VyLic7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5cbn0se31dfSx7fSxbM10pKDMpXG59KTsiXSwic291cmNlUm9vdCI6IiJ9