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
                //ToDo : resolve not workring
            })["catch"](function (error) {
                //that.destroy();
                //Do nothing
            });

            that.on(_constants.CONTENT_META, function () {
                if (playerConfig.isAutoStart()) {
                    // if (that.getState() !== 'error') {
                    //     that.play();
                    // }
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

            if (mainPeerConnectionInfo.peerConnection) {

                mainPeerConnectionInfo.peerConnection.close();
            }

            mainPeerConnectionInfo.peerConnection = null;
            mainPeerConnectionInfo = null;
        }

        if (Object.keys(clientPeerConnections).length > 0) {

            for (var clientId in clientPeerConnections) {

                var clientPeerConnection = clientPeerConnections[clientId].peerConnection;

                if (clientPeerConnection) {
                    OvenPlayerConsole.log('Closing client peer connection...');
                    clientPeerConnection.close();
                    clientPeerConnection = null;
                }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9XZWJSVEMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvV2ViUlRDTG9hZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9hZGFwdGVyLmpzIl0sIm5hbWVzIjpbIldlYlJUQyIsImVsZW1lbnQiLCJwbGF5ZXJDb25maWciLCJhZFRhZ1VybCIsInRoYXQiLCJ3ZWJydGNMb2FkZXIiLCJzdXBlckRlc3Ryb3lfZnVuYyIsInNwZWMiLCJuYW1lIiwiUFJPVklERVJfV0VCUlRDIiwibXNlIiwibGlzdGVuZXIiLCJpc0xvYWRlZCIsImNhblNlZWsiLCJpc0xpdmUiLCJzZWVraW5nIiwic3RhdGUiLCJTVEFURV9JRExFIiwiYnVmZmVyIiwiZnJhbWVyYXRlIiwiY3VycmVudFF1YWxpdHkiLCJjdXJyZW50U291cmNlIiwicXVhbGl0eUxldmVscyIsInNvdXJjZXMiLCJzb3VyY2UiLCJmaWxlIiwidHlwZSIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwiZGVzdHJveSIsImxvYWRDYWxsYmFjayIsInN0cmVhbSIsInNyY09iamVjdCIsImVycm9yVHJpZ2dlciIsImNvbm5lY3QiLCJlcnJvciIsIm9uIiwiQ09OVEVOVF9NRVRBIiwiaXNBdXRvU3RhcnQiLCJvZmYiLCJXZWJSVENMb2FkZXIiLCJwcm92aWRlciIsIndlYlNvY2tldFVybCIsInBlZXJDb25uZWN0aW9uQ29uZmlnIiwiZ2V0Q29uZmlnIiwid2VicnRjQ29uZmlnIiwiaWNlU2VydmVycyIsImljZVRyYW5zcG9ydFBvbGljeSIsIndzIiwid3NQaW5nIiwibWFpblN0cmVhbSIsIm1haW5QZWVyQ29ubmVjdGlvbkluZm8iLCJjbGllbnRQZWVyQ29ubmVjdGlvbnMiLCJ3c0Nsb3NlZEJ5UGxheWVyIiwic3RhdGlzdGljc1RpbWVyIiwiY3VycmVudEJyb3dzZXIiLCJleGlzdGluZ0hhbmRsZXIiLCJ3aW5kb3ciLCJvbmJlZm9yZXVubG9hZCIsImV2ZW50IiwiY2xvc2VQZWVyIiwiZ2V0UGVlckNvbm5lY3Rpb25CeUlkIiwiaWQiLCJwZWVyQ29ubmVjdGlvbiIsImV4dHJhY3RMb3NzUGFja2V0c09uTmV0d29ya1N0YXR1cyIsInBlZXJDb25uZWN0aW9uSW5mbyIsImNsZWFyVGltZW91dCIsInN0YXR1cyIsImxvc3RQYWNrZXRzQXJyIiwic2xvdExlbmd0aCIsInByZXZQYWNrZXRzTG9zdCIsImF2ZzhMb3NzZXMiLCJhdmdNb3JlVGhhblRocmVzaG9sZENvdW50IiwidGhyZXNob2xkIiwic2V0VGltZW91dCIsImdldFN0YXRzIiwidGhlbiIsInN0YXRzIiwiYXV0b0ZhbGxiYWNrIiwiZm9yRWFjaCIsImtpbmQiLCJpc1JlbW90ZSIsImFjdHVhbFBhY2tldExvc3QiLCJwYXJzZUludCIsInBhY2tldHNMb3N0IiwicHVzaCIsImxlbmd0aCIsInNoaWZ0IiwiXyIsInJlZHVjZSIsIm1lbW8iLCJudW0iLCJ0ZW1wRXJyb3IiLCJFUlJPUlMiLCJjb2RlcyIsIlBMQVlFUl9XRUJSVENfTkVUV09SS19TTE9XIiwiY3JlYXRlTWFpblBlZXJDb25uZWN0aW9uIiwicGVlcklkIiwic2RwIiwiY2FuZGlkYXRlcyIsInJlc29sdmUiLCJSVENQZWVyQ29ubmVjdGlvbiIsInNldFJlbW90ZURlc2NyaXB0aW9uIiwiUlRDU2Vzc2lvbkRlc2NyaXB0aW9uIiwiY3JlYXRlQW5zd2VyIiwiZGVzYyIsInNldExvY2FsRGVzY3JpcHRpb24iLCJsb2NhbFNEUCIsImxvY2FsRGVzY3JpcHRpb24iLCJzZW5kTWVzc2FnZSIsInBlZXJfaWQiLCJjb21tYW5kIiwiUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUiIsIlBMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUiIsIlBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SIiwiYWRkSWNlQ2FuZGlkYXRlIiwib25pY2VjYW5kaWRhdGUiLCJlIiwiY2FuZGlkYXRlIiwib25jb25uZWN0aW9uc3RhdGVjaGFuZ2UiLCJjb25uZWN0aW9uU3RhdGUiLCJvbmljZWNvbm5lY3Rpb25zdGF0ZWNoYW5nZSIsImljZUNvbm5lY3Rpb25TdGF0ZSIsIlBMQVlFUl9XRUJSVENfVU5FWFBFQ1RFRF9ESVNDT05ORUNUIiwib250cmFjayIsInN0cmVhbXMiLCJjcmVhdGVDbGllbnRQZWVyQ29ubmVjdGlvbiIsImhvc3RJZCIsImNsaWVudElkIiwiYWRkU3RyZWFtIiwiY3JlYXRlT2ZmZXIiLCJzZXRMb2NhbEFuZFNlbmRNZXNzYWdlIiwiaGFuZGxlQ3JlYXRlT2ZmZXJFcnJvciIsInNlc3Npb25EZXNjcmlwdGlvbiIsImNvcHlDYW5kaWRhdGUiLCJiYXNpY0NhbmRpZGF0ZSIsImNsb25lQ2FuZGlkYXRlIiwiY2xvbmUiLCJnZW5lcmF0ZURvbWFpbkZyb21VcmwiLCJ1cmwiLCJyZXN1bHQiLCJtYXRjaCIsImZpbmRJcCIsIlJlZ0V4cCIsIm5ld0RvbWFpbiIsImlwIiwiUHJvbWlzZSIsInJlamVjdCIsImJyb3dzZXIiLCJmZXRjaCIsInJlc3AiLCJqc29uIiwiZGF0YSIsIkFuc3dlciIsInJlbHNvbHZlZElwIiwicmVwbGFjZSIsImkiLCJjbG9uZUNhbmRpZGF0ZVByb21pc2UiLCJSVENJY2VDYW5kaWRhdGUiLCJQTEFZRVJfV0VCUlRDX0FERF9JQ0VDQU5ESURBVEVfRVJST1IiLCJpbml0V2ViU29ja2V0IiwiV2ViU29ja2V0Iiwib25vcGVuIiwib25tZXNzYWdlIiwibWVzc2FnZSIsIkpTT04iLCJwYXJzZSIsIlBMQVlFUl9XRUJSVENfV1NfRVJST1IiLCJPYmplY3QiLCJrZXlzIiwiY29uc3RydWN0b3IiLCJ0cmlnZ2VyIiwiT01FX1AyUF9NT0RFIiwicGVlckNvbm5lY3Rpb24xIiwicGVlckNvbm5lY3Rpb24yIiwicGVlckNvbm5lY3Rpb24zIiwiY2xvc2UiLCJwYXVzZSIsIm9uY2xvc2UiLCJvbmVycm9yIiwiaW5pdGlhbGl6ZSIsImNsaWVudFBlZXJDb25uZWN0aW9uIiwiY2xlYXJJbnRlcnZhbCIsInJlYWR5U3RhdGUiLCJzZW5kIiwic3RyaW5naWZ5IiwiZiIsImV4cG9ydHMiLCJtb2R1bGUiLCJkZWZpbmUiLCJ0IiwibiIsInIiLCJzIiwibyIsInUiLCJhIiwicmVxdWlyZSIsIkVycm9yIiwiY29kZSIsImwiLCJjYWxsIiwiU0RQVXRpbHMiLCJ3cml0ZU1lZGlhU2VjdGlvbiIsInRyYW5zY2VpdmVyIiwiY2FwcyIsImR0bHNSb2xlIiwid3JpdGVSdHBEZXNjcmlwdGlvbiIsIndyaXRlSWNlUGFyYW1ldGVycyIsImljZUdhdGhlcmVyIiwiZ2V0TG9jYWxQYXJhbWV0ZXJzIiwid3JpdGVEdGxzUGFyYW1ldGVycyIsImR0bHNUcmFuc3BvcnQiLCJtaWQiLCJydHBTZW5kZXIiLCJydHBSZWNlaXZlciIsInRyYWNrSWQiLCJfaW5pdGlhbFRyYWNrSWQiLCJ0cmFjayIsIm1zaWQiLCJzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzIiwic3NyYyIsInJ0eCIsImxvY2FsQ05hbWUiLCJmaWx0ZXJJY2VTZXJ2ZXJzIiwiZWRnZVZlcnNpb24iLCJoYXNUdXJuIiwiZmlsdGVyIiwic2VydmVyIiwidXJscyIsImNvbnNvbGUiLCJ3YXJuIiwiaXNTdHJpbmciLCJ2YWxpZFR1cm4iLCJpbmRleE9mIiwiZ2V0Q29tbW9uQ2FwYWJpbGl0aWVzIiwibG9jYWxDYXBhYmlsaXRpZXMiLCJyZW1vdGVDYXBhYmlsaXRpZXMiLCJjb21tb25DYXBhYmlsaXRpZXMiLCJjb2RlY3MiLCJoZWFkZXJFeHRlbnNpb25zIiwiZmVjTWVjaGFuaXNtcyIsImZpbmRDb2RlY0J5UGF5bG9hZFR5cGUiLCJwdCIsInBheWxvYWRUeXBlIiwicHJlZmVycmVkUGF5bG9hZFR5cGUiLCJydHhDYXBhYmlsaXR5TWF0Y2hlcyIsImxSdHgiLCJyUnR4IiwibENvZGVjcyIsInJDb2RlY3MiLCJsQ29kZWMiLCJwYXJhbWV0ZXJzIiwiYXB0IiwickNvZGVjIiwidG9Mb3dlckNhc2UiLCJjbG9ja1JhdGUiLCJudW1DaGFubmVscyIsIk1hdGgiLCJtaW4iLCJydGNwRmVlZGJhY2siLCJmYiIsImoiLCJwYXJhbWV0ZXIiLCJsSGVhZGVyRXh0ZW5zaW9uIiwickhlYWRlckV4dGVuc2lvbiIsInVyaSIsImlzQWN0aW9uQWxsb3dlZEluU2lnbmFsaW5nU3RhdGUiLCJhY3Rpb24iLCJzaWduYWxpbmdTdGF0ZSIsIm9mZmVyIiwiYW5zd2VyIiwibWF5YmVBZGRDYW5kaWRhdGUiLCJpY2VUcmFuc3BvcnQiLCJhbHJlYWR5QWRkZWQiLCJnZXRSZW1vdGVDYW5kaWRhdGVzIiwiZmluZCIsInJlbW90ZUNhbmRpZGF0ZSIsImZvdW5kYXRpb24iLCJwb3J0IiwicHJpb3JpdHkiLCJwcm90b2NvbCIsImFkZFJlbW90ZUNhbmRpZGF0ZSIsIm1ha2VFcnJvciIsImRlc2NyaXB0aW9uIiwiTm90U3VwcG9ydGVkRXJyb3IiLCJJbnZhbGlkU3RhdGVFcnJvciIsIkludmFsaWRBY2Nlc3NFcnJvciIsIlR5cGVFcnJvciIsInVuZGVmaW5lZCIsIk9wZXJhdGlvbkVycm9yIiwiYWRkVHJhY2tUb1N0cmVhbUFuZEZpcmVFdmVudCIsImFkZFRyYWNrIiwiZGlzcGF0Y2hFdmVudCIsIk1lZGlhU3RyZWFtVHJhY2tFdmVudCIsInJlbW92ZVRyYWNrRnJvbVN0cmVhbUFuZEZpcmVFdmVudCIsInJlbW92ZVRyYWNrIiwiZmlyZUFkZFRyYWNrIiwicGMiLCJyZWNlaXZlciIsInRyYWNrRXZlbnQiLCJFdmVudCIsIl9kaXNwYXRjaEV2ZW50IiwiY29uZmlnIiwiX2V2ZW50VGFyZ2V0IiwiZG9jdW1lbnQiLCJjcmVhdGVEb2N1bWVudEZyYWdtZW50IiwibWV0aG9kIiwiYmluZCIsImNhblRyaWNrbGVJY2VDYW5kaWRhdGVzIiwibmVlZE5lZ290aWF0aW9uIiwibG9jYWxTdHJlYW1zIiwicmVtb3RlU3RyZWFtcyIsInJlbW90ZURlc2NyaXB0aW9uIiwiaWNlR2F0aGVyaW5nU3RhdGUiLCJ1c2luZ0J1bmRsZSIsImJ1bmRsZVBvbGljeSIsInJ0Y3BNdXhQb2xpY3kiLCJfaWNlR2F0aGVyZXJzIiwiaWNlQ2FuZGlkYXRlUG9vbFNpemUiLCJSVENJY2VHYXRoZXJlciIsImdhdGhlclBvbGljeSIsIl9jb25maWciLCJ0cmFuc2NlaXZlcnMiLCJfc2RwU2Vzc2lvbklkIiwiZ2VuZXJhdGVTZXNzaW9uSWQiLCJfc2RwU2Vzc2lvblZlcnNpb24iLCJfZHRsc1JvbGUiLCJfaXNDbG9zZWQiLCJwcm90b3R5cGUiLCJvbmFkZHN0cmVhbSIsIm9ucmVtb3Zlc3RyZWFtIiwib25zaWduYWxpbmdzdGF0ZWNoYW5nZSIsIm9uaWNlZ2F0aGVyaW5nc3RhdGVjaGFuZ2UiLCJvbm5lZ290aWF0aW9ubmVlZGVkIiwib25kYXRhY2hhbm5lbCIsIl9lbWl0R2F0aGVyaW5nU3RhdGVDaGFuZ2UiLCJnZXRDb25maWd1cmF0aW9uIiwiZ2V0TG9jYWxTdHJlYW1zIiwiZ2V0UmVtb3RlU3RyZWFtcyIsIl9jcmVhdGVUcmFuc2NlaXZlciIsImRvTm90QWRkIiwiaGFzQnVuZGxlVHJhbnNwb3J0IiwicmVjdkVuY29kaW5nUGFyYW1ldGVycyIsImFzc29jaWF0ZWRSZW1vdGVNZWRpYVN0cmVhbXMiLCJ3YW50UmVjZWl2ZSIsInRyYW5zcG9ydHMiLCJfY3JlYXRlSWNlQW5kRHRsc1RyYW5zcG9ydHMiLCJhbHJlYWR5RXhpc3RzIiwiX21heWJlRmlyZU5lZ290aWF0aW9uTmVlZGVkIiwiUlRDUnRwU2VuZGVyIiwiZ2V0VHJhY2tzIiwiY2xvbmVkU3RyZWFtIiwiaWR4IiwiY2xvbmVkVHJhY2siLCJhZGRFdmVudExpc3RlbmVyIiwiZW5hYmxlZCIsInNlbmRlciIsInN0b3AiLCJtYXAiLCJzcGxpY2UiLCJyZW1vdmVTdHJlYW0iLCJnZXRTZW5kZXJzIiwiZ2V0UmVjZWl2ZXJzIiwiX2NyZWF0ZUljZUdhdGhlcmVyIiwic2RwTUxpbmVJbmRleCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJ3cml0YWJsZSIsImJ1ZmZlcmVkQ2FuZGlkYXRlRXZlbnRzIiwiYnVmZmVyQ2FuZGlkYXRlcyIsImVuZCIsIl9nYXRoZXIiLCJvbmxvY2FsY2FuZGlkYXRlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImV2dCIsInNkcE1pZCIsImNhbmQiLCJjb21wb25lbnQiLCJ1ZnJhZyIsInVzZXJuYW1lRnJhZ21lbnQiLCJzZXJpYWxpemVkQ2FuZGlkYXRlIiwid3JpdGVDYW5kaWRhdGUiLCJwYXJzZUNhbmRpZGF0ZSIsInRvSlNPTiIsInNlY3Rpb25zIiwiZ2V0TWVkaWFTZWN0aW9ucyIsImdldERlc2NyaXB0aW9uIiwiam9pbiIsImNvbXBsZXRlIiwiZXZlcnkiLCJSVENJY2VUcmFuc3BvcnQiLCJvbmljZXN0YXRlY2hhbmdlIiwiX3VwZGF0ZUljZUNvbm5lY3Rpb25TdGF0ZSIsIl91cGRhdGVDb25uZWN0aW9uU3RhdGUiLCJSVENEdGxzVHJhbnNwb3J0Iiwib25kdGxzc3RhdGVjaGFuZ2UiLCJfZGlzcG9zZUljZUFuZER0bHNUcmFuc3BvcnRzIiwiX3RyYW5zY2VpdmUiLCJyZWN2IiwicGFyYW1zIiwiZW5jb2RpbmdzIiwicnRjcCIsImNuYW1lIiwiY29tcG91bmQiLCJydGNwUGFyYW1ldGVycyIsInAiLCJyZWNlaXZlIiwic2Vzc2lvbnBhcnQiLCJzcGxpdFNlY3Rpb25zIiwibWVkaWFTZWN0aW9uIiwicGFyc2VSdHBQYXJhbWV0ZXJzIiwiaXNJY2VMaXRlIiwibWF0Y2hQcmVmaXgiLCJyZWplY3RlZCIsImlzUmVqZWN0ZWQiLCJyZW1vdGVJY2VQYXJhbWV0ZXJzIiwiZ2V0SWNlUGFyYW1ldGVycyIsInJlbW90ZUR0bHNQYXJhbWV0ZXJzIiwiZ2V0RHRsc1BhcmFtZXRlcnMiLCJyb2xlIiwic3RhcnQiLCJfdXBkYXRlU2lnbmFsaW5nU3RhdGUiLCJyZWNlaXZlckxpc3QiLCJpY2VPcHRpb25zIiwic3Vic3RyIiwic3BsaXQiLCJsaW5lcyIsInNwbGl0TGluZXMiLCJnZXRLaW5kIiwiZGlyZWN0aW9uIiwiZ2V0RGlyZWN0aW9uIiwicmVtb3RlTXNpZCIsInBhcnNlTXNpZCIsImdldE1pZCIsImdlbmVyYXRlSWRlbnRpZmllciIsInBhcnNlUnRwRW5jb2RpbmdQYXJhbWV0ZXJzIiwicGFyc2VSdGNwUGFyYW1ldGVycyIsImlzQ29tcGxldGUiLCJjYW5kcyIsInNldFRyYW5zcG9ydCIsInNldFJlbW90ZUNhbmRpZGF0ZXMiLCJSVENSdHBSZWNlaXZlciIsImdldENhcGFiaWxpdGllcyIsImNvZGVjIiwiaXNOZXdUcmFjayIsIk1lZGlhU3RyZWFtIiwiZ2V0IiwibmF0aXZlVHJhY2siLCJzaWQiLCJpdGVtIiwibmV3U3RhdGUiLCJzdGF0ZXMiLCJjbG9zZWQiLCJjaGVja2luZyIsImNvbm5lY3RlZCIsImNvbXBsZXRlZCIsImRpc2Nvbm5lY3RlZCIsImZhaWxlZCIsImNvbm5lY3RpbmciLCJudW1BdWRpb1RyYWNrcyIsIm51bVZpZGVvVHJhY2tzIiwib2ZmZXJPcHRpb25zIiwiYXJndW1lbnRzIiwibWFuZGF0b3J5Iiwib3B0aW9uYWwiLCJvZmZlclRvUmVjZWl2ZUF1ZGlvIiwib2ZmZXJUb1JlY2VpdmVWaWRlbyIsIndyaXRlU2Vzc2lvbkJvaWxlcnBsYXRlIiwicmVtb3RlQ29kZWMiLCJoZHJFeHQiLCJyZW1vdGVFeHRlbnNpb25zIiwickhkckV4dCIsImdldExvY2FsQ2FuZGlkYXRlcyIsIm1lZGlhU2VjdGlvbnNJbk9mZmVyIiwibG9jYWxUcmFjayIsImdldEF1ZGlvVHJhY2tzIiwiZ2V0VmlkZW9UcmFja3MiLCJoYXNSdHgiLCJjIiwicmVkdWNlZFNpemUiLCJjYW5kaWRhdGVTdHJpbmciLCJ0cmltIiwicHJvbWlzZXMiLCJmaXhTdGF0c1R5cGUiLCJzdGF0IiwiaW5ib3VuZHJ0cCIsIm91dGJvdW5kcnRwIiwiY2FuZGlkYXRlcGFpciIsImxvY2FsY2FuZGlkYXRlIiwicmVtb3RlY2FuZGlkYXRlIiwicmVzdWx0cyIsIk1hcCIsImFsbCIsInJlcyIsInNldCIsIm1ldGhvZHMiLCJuYXRpdmVNZXRob2QiLCJhcmdzIiwiYXBwbHkiLCJyYW5kb20iLCJ0b1N0cmluZyIsImJsb2IiLCJsaW5lIiwicGFydHMiLCJwYXJ0IiwiaW5kZXgiLCJwcmVmaXgiLCJzdWJzdHJpbmciLCJyZWxhdGVkQWRkcmVzcyIsInJlbGF0ZWRQb3J0IiwidGNwVHlwZSIsInRvVXBwZXJDYXNlIiwicGFyc2VJY2VPcHRpb25zIiwicGFyc2VSdHBNYXAiLCJwYXJzZWQiLCJ3cml0ZVJ0cE1hcCIsInBhcnNlRXh0bWFwIiwid3JpdGVFeHRtYXAiLCJoZWFkZXJFeHRlbnNpb24iLCJwcmVmZXJyZWRJZCIsInBhcnNlRm10cCIsImt2Iiwid3JpdGVGbXRwIiwicGFyYW0iLCJwYXJzZVJ0Y3BGYiIsIndyaXRlUnRjcEZiIiwicGFyc2VTc3JjTWVkaWEiLCJzcCIsImNvbG9uIiwiYXR0cmlidXRlIiwicGFyc2VGaW5nZXJwcmludCIsImFsZ29yaXRobSIsImZpbmdlcnByaW50cyIsInNldHVwVHlwZSIsImZwIiwiY29uY2F0IiwiaWNlUGFyYW1ldGVycyIsInBhc3N3b3JkIiwibWxpbmUiLCJydHBtYXBsaW5lIiwiZm10cHMiLCJtYXhwdGltZSIsImV4dGVuc2lvbiIsImVuY29kaW5nUGFyYW1ldGVycyIsImhhc1JlZCIsImhhc1VscGZlYyIsInNzcmNzIiwicHJpbWFyeVNzcmMiLCJzZWNvbmRhcnlTc3JjIiwiZmxvd3MiLCJlbmNQYXJhbSIsImNvZGVjUGF5bG9hZFR5cGUiLCJmZWMiLCJtZWNoYW5pc20iLCJiYW5kd2lkdGgiLCJtYXhCaXRyYXRlIiwicmVtb3RlU3NyYyIsIm9iaiIsInJzaXplIiwibXV4IiwicGxhbkIiLCJzZXNzSWQiLCJzZXNzVmVyIiwic2Vzc2lvbklkIiwidmVyc2lvbiIsInBhcnNlTUxpbmUiLCJmbXQiLCJzbGljZSIsInBhcnNlT0xpbmUiLCJ1c2VybmFtZSIsInNlc3Npb25WZXJzaW9uIiwibmV0VHlwZSIsImFkZHJlc3NUeXBlIiwiYWRkcmVzcyIsImdsb2JhbCIsImFkYXB0ZXJGYWN0b3J5Iiwic2VsZiIsInV0aWxzIiwiZGVwZW5kZW5jaWVzIiwib3B0cyIsIm9wdGlvbnMiLCJzaGltQ2hyb21lIiwic2hpbUZpcmVmb3giLCJzaGltRWRnZSIsInNoaW1TYWZhcmkiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsImxvZ2dpbmciLCJicm93c2VyRGV0YWlscyIsImRldGVjdEJyb3dzZXIiLCJjaHJvbWVTaGltIiwiZWRnZVNoaW0iLCJmaXJlZm94U2hpbSIsInNhZmFyaVNoaW0iLCJjb21tb25TaGltIiwiYWRhcHRlciIsImV4dHJhY3RWZXJzaW9uIiwiZGlzYWJsZUxvZyIsImRpc2FibGVXYXJuaW5ncyIsInNoaW1QZWVyQ29ubmVjdGlvbiIsImJyb3dzZXJTaGltIiwic2hpbUNyZWF0ZU9iamVjdFVSTCIsInNoaW1HZXRVc2VyTWVkaWEiLCJzaGltTWVkaWFTdHJlYW0iLCJzaGltU291cmNlT2JqZWN0Iiwic2hpbU9uVHJhY2siLCJzaGltQWRkVHJhY2tSZW1vdmVUcmFjayIsInNoaW1HZXRTZW5kZXJzV2l0aER0bWYiLCJzaGltUlRDSWNlQ2FuZGlkYXRlIiwic2hpbU1heE1lc3NhZ2VTaXplIiwic2hpbVNlbmRUaHJvd1R5cGVFcnJvciIsInNoaW1SZW1vdmVTdHJlYW0iLCJzaGltUmVwbGFjZVRyYWNrIiwic2hpbVJUQ0ljZVNlcnZlclVybHMiLCJzaGltQ2FsbGJhY2tzQVBJIiwic2hpbUxvY2FsU3RyZWFtc0FQSSIsInNoaW1SZW1vdGVTdHJlYW1zQVBJIiwic2hpbVRyYWNrRXZlbnRUcmFuc2NlaXZlciIsInNoaW1DcmVhdGVPZmZlckxlZ2FjeSIsIndlYmtpdE1lZGlhU3RyZWFtIiwiX29udHJhY2siLCJvcmlnU2V0UmVtb3RlRGVzY3JpcHRpb24iLCJfb250cmFja3BvbHkiLCJ0ZSIsIndyYXBQZWVyQ29ubmVjdGlvbkV2ZW50Iiwic2hpbVNlbmRlcldpdGhEdG1mIiwiZHRtZiIsIl9kdG1mIiwiY3JlYXRlRFRNRlNlbmRlciIsIl9wYyIsIl9zZW5kZXJzIiwib3JpZ0FkZFRyYWNrIiwib3JpZ1JlbW92ZVRyYWNrIiwib3JpZ0FkZFN0cmVhbSIsIm9yaWdSZW1vdmVTdHJlYW0iLCJvcmlnR2V0U2VuZGVycyIsInNlbmRlcnMiLCJVUkwiLCJIVE1MTWVkaWFFbGVtZW50IiwiX3NyY09iamVjdCIsInNyYyIsInJldm9rZU9iamVjdFVSTCIsImNyZWF0ZU9iamVjdFVSTCIsInNoaW1BZGRUcmFja1JlbW92ZVRyYWNrV2l0aE5hdGl2ZSIsIl9zaGltbWVkTG9jYWxTdHJlYW1zIiwic3RyZWFtSWQiLCJET01FeGNlcHRpb24iLCJleGlzdGluZ1NlbmRlcnMiLCJuZXdTZW5kZXJzIiwibmV3U2VuZGVyIiwib3JpZ0dldExvY2FsU3RyZWFtcyIsIm5hdGl2ZVN0cmVhbXMiLCJfcmV2ZXJzZVN0cmVhbXMiLCJfc3RyZWFtcyIsIm5ld1N0cmVhbSIsIm9sZFN0cmVhbSIsInJlcGxhY2VJbnRlcm5hbFN0cmVhbUlkIiwiaW50ZXJuYWxJZCIsImV4dGVybmFsU3RyZWFtIiwiaW50ZXJuYWxTdHJlYW0iLCJyZXBsYWNlRXh0ZXJuYWxTdHJlYW1JZCIsImlzTGVnYWN5Q2FsbCIsImVyciIsIm9yaWdTZXRMb2NhbERlc2NyaXB0aW9uIiwib3JpZ0xvY2FsRGVzY3JpcHRpb24iLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJpc0xvY2FsIiwic3RyZWFtaWQiLCJoYXNUcmFjayIsIndlYmtpdFJUQ1BlZXJDb25uZWN0aW9uIiwicGNDb25maWciLCJwY0NvbnN0cmFpbnRzIiwiaWNlVHJhbnNwb3J0cyIsImdlbmVyYXRlQ2VydGlmaWNhdGUiLCJPcmlnUGVlckNvbm5lY3Rpb24iLCJuZXdJY2VTZXJ2ZXJzIiwiZGVwcmVjYXRlZCIsIm9yaWdHZXRTdGF0cyIsInNlbGVjdG9yIiwic3VjY2Vzc0NhbGxiYWNrIiwiZXJyb3JDYWxsYmFjayIsImZpeENocm9tZVN0YXRzXyIsInJlc3BvbnNlIiwic3RhbmRhcmRSZXBvcnQiLCJyZXBvcnRzIiwicmVwb3J0Iiwic3RhbmRhcmRTdGF0cyIsInRpbWVzdGFtcCIsIm5hbWVzIiwibWFrZU1hcFN0YXRzIiwic3VjY2Vzc0NhbGxiYWNrV3JhcHBlcl8iLCJwcm9taXNlIiwibmF0aXZlQWRkSWNlQ2FuZGlkYXRlIiwibmF2aWdhdG9yIiwiY29uc3RyYWludHNUb0Nocm9tZV8iLCJjYyIsImlkZWFsIiwiZXhhY3QiLCJtYXgiLCJvbGRuYW1lXyIsImNoYXJBdCIsIm9jIiwibWl4IiwiYWR2YW5jZWQiLCJzaGltQ29uc3RyYWludHNfIiwiY29uc3RyYWludHMiLCJmdW5jIiwiYXVkaW8iLCJyZW1hcCIsImIiLCJ2aWRlbyIsImZhY2UiLCJmYWNpbmdNb2RlIiwiZ2V0U3VwcG9ydGVkRmFjaW5nTW9kZUxpZXMiLCJtZWRpYURldmljZXMiLCJnZXRTdXBwb3J0ZWRDb25zdHJhaW50cyIsIm1hdGNoZXMiLCJlbnVtZXJhdGVEZXZpY2VzIiwiZGV2aWNlcyIsImQiLCJkZXYiLCJzb21lIiwibGFiZWwiLCJkZXZpY2VJZCIsInNoaW1FcnJvcl8iLCJQZXJtaXNzaW9uRGVuaWVkRXJyb3IiLCJQZXJtaXNzaW9uRGlzbWlzc2VkRXJyb3IiLCJEZXZpY2VzTm90Rm91bmRFcnJvciIsIkNvbnN0cmFpbnROb3RTYXRpc2ZpZWRFcnJvciIsIlRyYWNrU3RhcnRFcnJvciIsIk1lZGlhRGV2aWNlRmFpbGVkRHVlVG9TaHV0ZG93biIsIk1lZGlhRGV2aWNlS2lsbFN3aXRjaE9uIiwiVGFiQ2FwdHVyZUVycm9yIiwiU2NyZWVuQ2FwdHVyZUVycm9yIiwiRGV2aWNlQ2FwdHVyZUVycm9yIiwiY29uc3RyYWludCIsImNvbnN0cmFpbnROYW1lIiwiZ2V0VXNlck1lZGlhXyIsIm9uU3VjY2VzcyIsIm9uRXJyb3IiLCJ3ZWJraXRHZXRVc2VyTWVkaWEiLCJnZXRVc2VyTWVkaWEiLCJnZXRVc2VyTWVkaWFQcm9taXNlXyIsImtpbmRzIiwiTWVkaWFTdHJlYW1UcmFjayIsImdldFNvdXJjZXMiLCJkZXZpY2UiLCJncm91cElkIiwiZWNob0NhbmNlbGxhdGlvbiIsImZyYW1lUmF0ZSIsImhlaWdodCIsIndpZHRoIiwib3JpZ0dldFVzZXJNZWRpYSIsImNzIiwiTmF0aXZlUlRDSWNlQ2FuZGlkYXRlIiwibmF0aXZlQ2FuZGlkYXRlIiwicGFyc2VkQ2FuZGlkYXRlIiwiYXVnbWVudGVkQ2FuZGlkYXRlIiwibmF0aXZlQ3JlYXRlT2JqZWN0VVJMIiwibmF0aXZlUmV2b2tlT2JqZWN0VVJMIiwibmV3SWQiLCJkc2MiLCJuYXRpdmVTZXRBdHRyaWJ1dGUiLCJzZXRBdHRyaWJ1dGUiLCJSVENTY3RwVHJhbnNwb3J0IiwiX3NjdHAiLCJzY3RwSW5EZXNjcmlwdGlvbiIsIm1MaW5lIiwiZ2V0UmVtb3RlRmlyZWZveFZlcnNpb24iLCJnZXRDYW5TZW5kTWF4TWVzc2FnZVNpemUiLCJyZW1vdGVJc0ZpcmVmb3giLCJjYW5TZW5kTWF4TWVzc2FnZVNpemUiLCJnZXRNYXhNZXNzYWdlU2l6ZSIsIm1heE1lc3NhZ2VTaXplIiwiaXNGaXJlZm94IiwiY2FuU2VuZE1NUyIsInJlbW90ZU1NUyIsIk51bWJlciIsIlBPU0lUSVZFX0lORklOSVRZIiwic2N0cCIsIm9yaWdDcmVhdGVEYXRhQ2hhbm5lbCIsImNyZWF0ZURhdGFDaGFubmVsIiwiZGF0YUNoYW5uZWwiLCJvcmlnRGF0YUNoYW5uZWxTZW5kIiwiZGMiLCJzaXplIiwiYnl0ZUxlbmd0aCIsInNoaW1SVENQZWVyQ29ubmVjdGlvbiIsIm9yaWdNU1RFbmFibGVkIiwiZXYiLCJSVENEdG1mU2VuZGVyIiwiUlRDRFRNRlNlbmRlciIsInJlcGxhY2VUcmFjayIsInNldFRyYWNrIiwiUlRDVHJhY2tFdmVudCIsIm1velNyY09iamVjdCIsIm1velJUQ1BlZXJDb25uZWN0aW9uIiwibmV3U2VydmVyIiwiY3JlZGVudGlhbCIsIm1velJUQ1Nlc3Npb25EZXNjcmlwdGlvbiIsIm1velJUQ0ljZUNhbmRpZGF0ZSIsIm1vZGVyblN0YXRzVHlwZXMiLCJuYXRpdmVHZXRTdGF0cyIsIm9uU3VjYyIsIm9uRXJyIiwiSW50ZXJuYWxFcnJvciIsIlNlY3VyaXR5RXJyb3IiLCJjb25zdHJhaW50c1RvRkYzN18iLCJtb3pHZXRVc2VyTWVkaWEiLCJpbmZvcyIsIm9yZ0VudW1lcmF0ZURldmljZXMiLCJuYXRpdmVHZXRVc2VyTWVkaWEiLCJnZXRTZXR0aW5ncyIsIm5hdGl2ZUdldFNldHRpbmdzIiwiYXBwbHlDb25zdHJhaW50cyIsIm5hdGl2ZUFwcGx5Q29uc3RyYWludHMiLCJfbG9jYWxTdHJlYW1zIiwiZ2V0U3RyZWFtQnlJZCIsIl9yZW1vdGVTdHJlYW1zIiwiX2FkZFRyYWNrIiwidHJhY2tzIiwiX29uYWRkc3RyZWFtIiwiX29uYWRkc3RyZWFtcG9seSIsImZhaWx1cmVDYWxsYmFjayIsIndpdGhDYWxsYmFjayIsImNiIiwiZXJyY2IiLCJSVENUcmFuc2NlaXZlciIsIm9yaWdDcmVhdGVPZmZlciIsImF1ZGlvVHJhbnNjZWl2ZXIiLCJnZXRUcmFuc2NlaXZlcnMiLCJzZXREaXJlY3Rpb24iLCJhZGRUcmFuc2NlaXZlciIsInZpZGVvVHJhbnNjZWl2ZXIiLCJsb2dEaXNhYmxlZF8iLCJkZXByZWNhdGlvbldhcm5pbmdzXyIsInVhc3RyaW5nIiwiZXhwciIsInBvcyIsImV2ZW50TmFtZVRvV3JhcCIsIndyYXBwZXIiLCJwcm90byIsIm5hdGl2ZUFkZEV2ZW50TGlzdGVuZXIiLCJuYXRpdmVFdmVudE5hbWUiLCJ3cmFwcGVkQ2FsbGJhY2siLCJfZXZlbnRNYXAiLCJuYXRpdmVSZW1vdmVFdmVudExpc3RlbmVyIiwidW53cmFwcGVkQ2IiLCJib29sIiwib2xkTWV0aG9kIiwibmV3TWV0aG9kIiwidXNlckFnZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBOzs7Ozs7QUFNQSxJQUFNQSxTQUFTLFNBQVRBLE1BQVMsQ0FBU0MsT0FBVCxFQUFrQkMsWUFBbEIsRUFBZ0NDLFFBQWhDLEVBQXlDO0FBQ3BELFFBQUlDLE9BQU8sRUFBWDtBQUNBLFFBQUlDLGVBQWUsSUFBbkI7QUFDQSxRQUFJQyxvQkFBcUIsSUFBekI7O0FBRUEsUUFBSUMsT0FBTztBQUNQQyxjQUFPQywwQkFEQTtBQUVQUixpQkFBVUEsT0FGSDtBQUdQUyxhQUFNLElBSEM7QUFJUEMsa0JBQVcsSUFKSjtBQUtQQyxrQkFBVyxLQUxKO0FBTVBDLGlCQUFVLEtBTkg7QUFPUEMsZ0JBQVMsS0FQRjtBQVFQQyxpQkFBVSxLQVJIO0FBU1BDLGVBQVFDLHFCQVREO0FBVVBDLGdCQUFTLENBVkY7QUFXUEMsbUJBQVksQ0FYTDtBQVlQQyx3QkFBaUIsQ0FBQyxDQVpYO0FBYVBDLHVCQUFnQixDQUFDLENBYlY7QUFjUEMsdUJBQWdCLEVBZFQ7QUFlUEMsaUJBQVUsRUFmSDtBQWdCUHBCLGtCQUFXQTtBQWhCSixLQUFYOztBQW1CQUMsV0FBTywyQkFBU0csSUFBVCxFQUFlTCxZQUFmLEVBQTZCLFVBQVNzQixNQUFULEVBQWdCO0FBQ2hELFlBQUcseUJBQVNBLE9BQU9DLElBQWhCLEVBQXNCRCxPQUFPRSxJQUE3QixDQUFILEVBQXNDO0FBQ2xDQyw4QkFBa0JDLEdBQWxCLENBQXNCLDBCQUF0QixFQUFrREosTUFBbEQ7QUFDQSxnQkFBR25CLFlBQUgsRUFBZ0I7QUFDWkEsNkJBQWF3QixPQUFiO0FBQ0F4QiwrQkFBZSxJQUFmO0FBQ0g7O0FBRUQsZ0JBQUl5QixlQUFlLFNBQWZBLFlBQWUsQ0FBU0MsTUFBVCxFQUFnQjs7QUFFL0Isb0JBQUk5QixRQUFRK0IsU0FBWixFQUF1QjtBQUNuQi9CLDRCQUFRK0IsU0FBUixHQUFvQixJQUFwQjtBQUNIOztBQUVEL0Isd0JBQVErQixTQUFSLEdBQW9CRCxNQUFwQjtBQUNILGFBUEQ7O0FBU0ExQiwyQkFBZSwrQkFBYUQsSUFBYixFQUFtQm9CLE9BQU9DLElBQTFCLEVBQWdDSyxZQUFoQyxFQUE4Q0csbUJBQTlDLEVBQTREL0IsWUFBNUQsQ0FBZjs7QUFFQUcseUJBQWE2QixPQUFiLENBQXFCLFlBQVU7QUFDM0I7QUFDSCxhQUZELFdBRVMsVUFBU0MsS0FBVCxFQUFlO0FBQ3BCO0FBQ0E7QUFDSCxhQUxEOztBQU9BL0IsaUJBQUtnQyxFQUFMLENBQVFDLHVCQUFSLEVBQXNCLFlBQVU7QUFDNUIsb0JBQUduQyxhQUFhb0MsV0FBYixFQUFILEVBQThCO0FBQzFCO0FBQ0E7QUFDQTtBQUNIO0FBQ0osYUFORCxFQU1HbEMsSUFOSDtBQU9IO0FBQ0osS0FsQ00sQ0FBUDtBQW1DQUUsd0JBQW9CRixjQUFXLFNBQVgsQ0FBcEI7O0FBRUF1QixzQkFBa0JDLEdBQWxCLENBQXNCLHlCQUF0Qjs7QUFHQXhCLFNBQUt5QixPQUFMLEdBQWUsWUFBSztBQUNoQixZQUFHeEIsWUFBSCxFQUFnQjtBQUNaQSx5QkFBYXdCLE9BQWI7QUFDQTVCLG9CQUFRK0IsU0FBUixHQUFvQixJQUFwQjtBQUNBM0IsMkJBQWUsSUFBZjtBQUNIO0FBQ0RELGFBQUttQyxHQUFMLENBQVNGLHVCQUFULEVBQXVCLElBQXZCLEVBQTZCakMsSUFBN0I7QUFDQXVCLDBCQUFrQkMsR0FBbEIsQ0FBc0IsK0JBQXRCOztBQUVBdEI7QUFFSCxLQVhEO0FBWUEsV0FBT0YsSUFBUDtBQUNILENBN0VELEMsQ0FmQTs7O3FCQStGZUosTTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0ZmOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQWNBLElBQU13QyxlQUFlLFNBQWZBLFlBQWUsQ0FBVUMsUUFBVixFQUFvQkMsWUFBcEIsRUFBa0NaLFlBQWxDLEVBQWdERyxZQUFoRCxFQUE4RC9CLFlBQTlELEVBQTRFOztBQUU3RixRQUFJeUMsdUJBQXVCO0FBQ3ZCLHNCQUFjLENBQ1Y7QUFDSSxvQkFBUTtBQURaLFNBRFU7QUFEUyxLQUEzQjs7QUFRQSxRQUFJekMsYUFBYTBDLFNBQWIsR0FBeUJDLFlBQTdCLEVBQTJDOztBQUV2QyxZQUFJM0MsYUFBYTBDLFNBQWIsR0FBeUJDLFlBQXpCLENBQXNDQyxVQUExQyxFQUFzRDs7QUFFbERILGlDQUFxQkcsVUFBckIsR0FBa0M1QyxhQUFhMEMsU0FBYixHQUF5QkMsWUFBekIsQ0FBc0NDLFVBQXhFO0FBQ0g7O0FBRUQsWUFBSTVDLGFBQWEwQyxTQUFiLEdBQXlCQyxZQUF6QixDQUFzQ0Usa0JBQTFDLEVBQThEOztBQUUxREosaUNBQXFCSSxrQkFBckIsR0FBMEM3QyxhQUFhMEMsU0FBYixHQUF5QkMsWUFBekIsQ0FBc0NFLGtCQUFoRjtBQUNIO0FBQ0o7O0FBRUQsUUFBSTNDLE9BQU8sRUFBWDs7QUFFQSxRQUFJNEMsS0FBSyxJQUFUOztBQUVBLFFBQUlDLFNBQVMsSUFBYjs7QUFFQSxRQUFJQyxhQUFhLElBQWpCOztBQUVBO0FBQ0EsUUFBSUMseUJBQXlCLElBQTdCOztBQUVBO0FBQ0EsUUFBSUMsd0JBQXdCLEVBQTVCOztBQUVBO0FBQ0EsUUFBSUMsbUJBQW1CLEtBQXZCOztBQUVBLFFBQUlDLGtCQUFrQixJQUF0Qjs7QUFFQSxRQUFJQyxpQkFBaUIsNkJBQXJCOztBQUVBLEtBQUMsWUFBWTtBQUNULFlBQUlDLGtCQUFrQkMsT0FBT0MsY0FBN0I7QUFDQUQsZUFBT0MsY0FBUCxHQUF3QixVQUFVQyxLQUFWLEVBQWlCO0FBQ3JDLGdCQUFJSCxlQUFKLEVBQXFCO0FBQ2pCQSxnQ0FBZ0JHLEtBQWhCO0FBQ0g7QUFDRGhDLDhCQUFrQkMsR0FBbEIsQ0FBc0Isc0NBQXRCO0FBQ0FnQztBQUNILFNBTkQ7QUFPSCxLQVREOztBQVdBLGFBQVNDLHFCQUFULENBQStCQyxFQUEvQixFQUFtQzs7QUFFL0IsWUFBSUMsaUJBQWlCLElBQXJCOztBQUVBLFlBQUlaLDBCQUEwQlcsT0FBT1gsdUJBQXVCVyxFQUE1RCxFQUFnRTtBQUM1REMsNkJBQWlCWix1QkFBdUJZLGNBQXhDO0FBQ0gsU0FGRCxNQUVPLElBQUlYLHNCQUFzQlUsRUFBdEIsQ0FBSixFQUErQjtBQUNsQ0MsNkJBQWlCWCxzQkFBc0JVLEVBQXRCLEVBQTBCQyxjQUEzQztBQUNIOztBQUVELGVBQU9BLGNBQVA7QUFDSDs7QUFFRCxhQUFTQyxpQ0FBVCxDQUEyQ0Msa0JBQTNDLEVBQStEOztBQUUzRCxZQUFJQSxtQkFBbUJYLGVBQXZCLEVBQXdDO0FBQ3BDWSx5QkFBYUQsbUJBQW1CWCxlQUFoQztBQUNIOztBQUVELFlBQUksQ0FBQ1csbUJBQW1CRSxNQUF4QixFQUFnQztBQUM1QkYsK0JBQW1CRSxNQUFuQixHQUE0QixFQUE1QjtBQUNBRiwrQkFBbUJFLE1BQW5CLENBQTBCQyxjQUExQixHQUEyQyxFQUEzQztBQUNBSCwrQkFBbUJFLE1BQW5CLENBQTBCRSxVQUExQixHQUF1QyxDQUF2QyxDQUg0QixDQUdjO0FBQzFDSiwrQkFBbUJFLE1BQW5CLENBQTBCRyxlQUExQixHQUE0QyxDQUE1QztBQUNBTCwrQkFBbUJFLE1BQW5CLENBQTBCSSxVQUExQixHQUF1QyxDQUF2QztBQUNBTiwrQkFBbUJFLE1BQW5CLENBQTBCSyx5QkFBMUIsR0FBc0QsQ0FBdEQsQ0FONEIsQ0FNOEI7QUFDMURQLCtCQUFtQkUsTUFBbkIsQ0FBMEJNLFNBQTFCLEdBQXNDLEVBQXRDO0FBQ0g7O0FBRUQsWUFBSUwsaUJBQWlCSCxtQkFBbUJFLE1BQW5CLENBQTBCQyxjQUEvQztBQUFBLFlBQ0lDLGFBQWFKLG1CQUFtQkUsTUFBbkIsQ0FBMEJFLFVBRDNDO0FBQUEsWUFDdUQ7QUFDbkRDLDBCQUFrQkwsbUJBQW1CRSxNQUFuQixDQUEwQkcsZUFGaEQ7QUFBQSxZQUdJQyxhQUFhTixtQkFBbUJFLE1BQW5CLENBQTBCSSxVQUgzQzs7QUFJSTtBQUNBRSxvQkFBWVIsbUJBQW1CRSxNQUFuQixDQUEwQk0sU0FMMUM7O0FBT0FSLDJCQUFtQlgsZUFBbkIsR0FBcUNvQixXQUFXLFlBQVk7QUFDeEQsZ0JBQUksQ0FBQ1QsbUJBQW1CRixjQUF4QixFQUF3QztBQUNwQyx1QkFBTyxLQUFQO0FBQ0g7O0FBRURFLCtCQUFtQkYsY0FBbkIsQ0FBa0NZLFFBQWxDLEdBQTZDQyxJQUE3QyxDQUFrRCxVQUFVQyxLQUFWLEVBQWlCOztBQUUvRCxvQkFBSSxDQUFDQSxLQUFMLEVBQVk7QUFDUjtBQUNIOztBQUVELG9CQUFJM0UsYUFBYTBDLFNBQWIsR0FBeUJrQyxZQUF6QixJQUF5Q0QsS0FBN0MsRUFBb0Q7O0FBRWhEQSwwQkFBTUUsT0FBTixDQUFjLFVBQVUvRCxLQUFWLEVBQWlCOztBQUUzQiw0QkFBSUEsTUFBTVUsSUFBTixLQUFlLGFBQWYsSUFBZ0NWLE1BQU1nRSxJQUFOLEtBQWUsT0FBL0MsSUFBMEQsQ0FBQ2hFLE1BQU1pRSxRQUFyRSxFQUErRTs7QUFFM0U7O0FBRUEsZ0NBQUlDLG1CQUFtQkMsU0FBU25FLE1BQU1vRSxXQUFmLElBQThCRCxTQUFTYixlQUFULENBQXJEOztBQUVBRiwyQ0FBZWlCLElBQWYsQ0FBb0JGLFNBQVNuRSxNQUFNb0UsV0FBZixJQUE4QkQsU0FBU2IsZUFBVCxDQUFsRDs7QUFFQSxnQ0FBSUYsZUFBZWtCLE1BQWYsR0FBd0JqQixVQUE1QixFQUF3Qzs7QUFFcENELCtDQUFlbUIsS0FBZjtBQUNIOztBQUVELGdDQUFJbkIsZUFBZWtCLE1BQWYsS0FBMEJqQixVQUE5QixFQUEwQzs7QUFFdENFLDZDQUFhaUIsd0JBQUVDLE1BQUYsQ0FBU3JCLGNBQVQsRUFBeUIsVUFBVXNCLElBQVYsRUFBZ0JDLEdBQWhCLEVBQXFCO0FBQ3ZELDJDQUFPRCxPQUFPQyxHQUFkO0FBQ0gsaUNBRlksRUFFVixDQUZVLElBRUx0QixVQUZSO0FBR0ExQyxrREFBa0JDLEdBQWxCLENBQXNCLDhCQUErQjJDLFVBQXJELEVBQWtFLDBCQUEyQlcsZ0JBQTdGLEVBQStHLHdCQUF3QmxFLE1BQU1vRSxXQUE3SSxFQUEwSmhCLGNBQTFKOztBQUVBLG9DQUFJRyxhQUFhRSxTQUFqQixFQUE0QjtBQUN4QlIsdURBQW1CRSxNQUFuQixDQUEwQksseUJBQTFCLEdBQXNEUCxtQkFBbUJFLE1BQW5CLENBQTBCSyx5QkFBMUIsR0FBc0QsQ0FBNUc7QUFDQSx3Q0FBSVAsbUJBQW1CRSxNQUFuQixDQUEwQksseUJBQTFCLElBQXVELEVBQTNELEVBQStEO0FBQzNEN0MsMERBQWtCQyxHQUFsQixDQUFzQix1QkFBdEI7QUFDQSw0Q0FBSWdFLFlBQVlDLGtCQUFPQyxLQUFQLENBQWFDLHFDQUFiLENBQWhCO0FBQ0FuQyxrREFBVWdDLFNBQVY7QUFDSDtBQUNKLGlDQVBELE1BT087QUFDSDNCLHVEQUFtQkUsTUFBbkIsQ0FBMEJLLHlCQUExQixHQUFzRCxDQUF0RDtBQUNIO0FBQ0o7QUFDRFAsK0NBQW1CRSxNQUFuQixDQUEwQkcsZUFBMUIsR0FBNEN0RCxNQUFNb0UsV0FBbEQ7QUFDSDtBQUNKLHFCQW5DRDs7QUFxQ0FwQixzREFBa0NDLGtCQUFsQztBQUNIO0FBQ0osYUEvQ0Q7QUFpREgsU0F0RG9DLEVBc0RsQyxJQXREa0MsQ0FBckM7QUF3REg7O0FBRUQsYUFBUytCLHdCQUFULENBQWtDbEMsRUFBbEMsRUFBc0NtQyxNQUF0QyxFQUE4Q0MsR0FBOUMsRUFBbURDLFVBQW5ELEVBQStEQyxPQUEvRCxFQUF3RTs7QUFFcEUsWUFBSXJDLGlCQUFpQixJQUFJc0MsaUJBQUosQ0FBc0IxRCxvQkFBdEIsQ0FBckI7QUFDQVEsaUNBQXlCO0FBQ3JCVyxnQkFBSUEsRUFEaUI7QUFFckJtQyxvQkFBUUEsTUFGYTtBQUdyQmxDLDRCQUFnQkE7QUFISyxTQUF6Qjs7QUFPQTtBQUNBQSx1QkFBZXVDLG9CQUFmLENBQW9DLElBQUlDLHFCQUFKLENBQTBCTCxHQUExQixDQUFwQyxFQUNLdEIsSUFETCxDQUNVLFlBQVk7O0FBRWRiLDJCQUFleUMsWUFBZixHQUNLNUIsSUFETCxDQUNVLFVBQVU2QixJQUFWLEVBQWdCOztBQUVsQjlFLGtDQUFrQkMsR0FBbEIsQ0FBc0IsOEJBQXRCOztBQUVBbUMsK0JBQWUyQyxtQkFBZixDQUFtQ0QsSUFBbkMsRUFBeUM3QixJQUF6QyxDQUE4QyxZQUFZO0FBQ3REO0FBQ0Esd0JBQUkrQixXQUFXNUMsZUFBZTZDLGdCQUE5QjtBQUNBakYsc0NBQWtCQyxHQUFsQixDQUFzQixXQUF0QixFQUFtQytFLFFBQW5DOztBQUVBRSxnQ0FBWTdELEVBQVosRUFBZ0I7QUFDWmMsNEJBQUlBLEVBRFE7QUFFWmdELGlDQUFTYixNQUZHO0FBR1pjLGlDQUFTLFFBSEc7QUFJWmIsNkJBQUtTO0FBSk8scUJBQWhCO0FBT0gsaUJBWkQsV0FZUyxVQUFVeEUsS0FBVixFQUFpQjs7QUFFdEIsd0JBQUl5RCxZQUFZQyxrQkFBT0MsS0FBUCxDQUFha0IsNkNBQWIsQ0FBaEI7QUFDQXBCLDhCQUFVekQsS0FBVixHQUFrQkEsS0FBbEI7QUFDQXlCLDhCQUFVZ0MsU0FBVjtBQUNILGlCQWpCRDtBQWtCSCxhQXZCTCxXQXdCVyxVQUFVekQsS0FBVixFQUFpQjtBQUNwQixvQkFBSXlELFlBQVlDLGtCQUFPQyxLQUFQLENBQWFtQiw0Q0FBYixDQUFoQjtBQUNBckIsMEJBQVV6RCxLQUFWLEdBQWtCQSxLQUFsQjtBQUNBeUIsMEJBQVVnQyxTQUFWO0FBQ0gsYUE1Qkw7QUE2QkgsU0FoQ0wsV0FpQ1csVUFBVXpELEtBQVYsRUFBaUI7QUFDcEIsZ0JBQUl5RCxZQUFZQyxrQkFBT0MsS0FBUCxDQUFhb0IsOENBQWIsQ0FBaEI7QUFDQXRCLHNCQUFVekQsS0FBVixHQUFrQkEsS0FBbEI7QUFDQXlCLHNCQUFVZ0MsU0FBVjtBQUNILFNBckNMOztBQXVDQSxZQUFJTyxVQUFKLEVBQWdCO0FBQ1o7QUFDQWdCLDRCQUFnQnBELGNBQWhCLEVBQWdDb0MsVUFBaEM7QUFDSDs7QUFFRHBDLHVCQUFlcUQsY0FBZixHQUFnQyxVQUFVQyxDQUFWLEVBQWE7QUFDekMsZ0JBQUlBLEVBQUVDLFNBQU4sRUFBaUI7O0FBRWIzRixrQ0FBa0JDLEdBQWxCLENBQXNCLDZDQUE2Q3lGLEVBQUVDLFNBQXJFOztBQUVBOztBQUVBVCw0QkFBWTdELEVBQVosRUFBZ0I7QUFDWmMsd0JBQUlBLEVBRFE7QUFFWmdELDZCQUFTYixNQUZHO0FBR1pjLDZCQUFTLFdBSEc7QUFJWlosZ0NBQVksQ0FBQ2tCLEVBQUVDLFNBQUg7QUFKQSxpQkFBaEI7QUFNSDtBQUNKLFNBZEQ7QUFlQXZELHVCQUFld0QsdUJBQWYsR0FBeUMsVUFBVUYsQ0FBVixFQUFhO0FBQ2xEO0FBQ0ExRiw4QkFBa0JDLEdBQWxCLENBQXNCLDhCQUF0QixFQUFzRG1DLGVBQWV5RCxlQUFyRSxFQUFzRkgsQ0FBdEY7QUFFSCxTQUpEO0FBS0F0RCx1QkFBZTBELDBCQUFmLEdBQTRDLFVBQVVKLENBQVYsRUFBYTtBQUNyRDFGLDhCQUFrQkMsR0FBbEIsQ0FBc0Isa0NBQXRCLEVBQTBEbUMsZUFBZTJELGtCQUF6RSxFQUE2RkwsQ0FBN0Y7O0FBRUE7Ozs7QUFJQTtBQUNBO0FBQ0EsZ0JBQUl0RCxlQUFlMkQsa0JBQWYsS0FBc0MsY0FBdEMsSUFBd0QzRCxlQUFlMkQsa0JBQWYsS0FBc0MsUUFBbEcsRUFBNEc7QUFDeEcsb0JBQUksQ0FBQ3JFLGdCQUFMLEVBQXVCO0FBQ25CLHdCQUFJRixzQkFBSixFQUE0QjtBQUN4Qiw0QkFBSXlDLFlBQVlDLGtCQUFPQyxLQUFQLENBQWE2Qiw4Q0FBYixDQUFoQjtBQUNBL0Qsa0NBQVVnQyxTQUFWO0FBQ0g7QUFDSjtBQUNKO0FBQ0osU0FqQkQ7QUFrQkE3Qix1QkFBZTZELE9BQWYsR0FBeUIsVUFBVVAsQ0FBVixFQUFhOztBQUVsQzFGLDhCQUFrQkMsR0FBbEIsQ0FBc0Isa0JBQXRCOztBQUVBb0MsOENBQWtDYixzQkFBbEM7QUFDQUQseUJBQWFtRSxFQUFFUSxPQUFGLENBQVUsQ0FBVixDQUFiO0FBQ0EvRix5QkFBYXVGLEVBQUVRLE9BQUYsQ0FBVSxDQUFWLENBQWI7QUFDSCxTQVBEO0FBUUg7O0FBRUQsYUFBU0MsMEJBQVQsQ0FBb0NDLE1BQXBDLEVBQTRDQyxRQUE1QyxFQUFzRDs7QUFFbEQsWUFBSSxDQUFDOUUsVUFBTCxFQUFpQjs7QUFFYndCLHVCQUFXLFlBQVk7O0FBRW5Cb0QsMkNBQTJCQyxNQUEzQixFQUFtQ0MsUUFBbkM7QUFDSCxhQUhELEVBR0csR0FISDs7QUFLQTtBQUNIOztBQUVELFlBQUlqRSxpQkFBaUIsSUFBSXNDLGlCQUFKLENBQXNCMUQsb0JBQXRCLENBQXJCOztBQUVBUyw4QkFBc0I0RSxRQUF0QixJQUFrQztBQUM5QmxFLGdCQUFJa0UsUUFEMEI7QUFFOUIvQixvQkFBUThCLE1BRnNCO0FBRzlCaEUsNEJBQWdCQTtBQUhjLFNBQWxDOztBQU1BQSx1QkFBZWtFLFNBQWYsQ0FBeUIvRSxVQUF6Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQWEsdUJBQWVtRSxXQUFmLENBQTJCQyxzQkFBM0IsRUFBbURDLHNCQUFuRCxFQUEyRSxFQUEzRTs7QUFFQSxpQkFBU0Qsc0JBQVQsQ0FBZ0NFLGtCQUFoQyxFQUFvRDtBQUNoRHRFLDJCQUFlMkMsbUJBQWYsQ0FBbUMyQixrQkFBbkM7O0FBRUF4Qix3QkFBWTdELEVBQVosRUFBZ0I7QUFDWmMsb0JBQUlpRSxNQURRO0FBRVpqQix5QkFBU2tCLFFBRkc7QUFHWjlCLHFCQUFLbUMsa0JBSE87QUFJWnRCLHlCQUFTO0FBSkcsYUFBaEI7QUFNSDs7QUFFRCxpQkFBU3FCLHNCQUFULENBQWdDekUsS0FBaEMsRUFBdUMsQ0FFdEM7O0FBRURJLHVCQUFlcUQsY0FBZixHQUFnQyxVQUFVQyxDQUFWLEVBQWE7QUFDekMsZ0JBQUlBLEVBQUVDLFNBQU4sRUFBaUI7QUFDYjNGLGtDQUFrQkMsR0FBbEIsQ0FBc0IsNkNBQTZDeUYsRUFBRUMsU0FBckU7O0FBR0E7O0FBRUFULDRCQUFZN0QsRUFBWixFQUFnQjtBQUNaYyx3QkFBSWlFLE1BRFE7QUFFWmpCLDZCQUFTa0IsUUFGRztBQUdaakIsNkJBQVMsZUFIRztBQUlaWixnQ0FBWSxDQUFDa0IsRUFBRUMsU0FBSDtBQUpBLGlCQUFoQjtBQU9IO0FBQ0osU0FmRDtBQWdCSDs7QUFFRCxRQUFJZ0IsZ0JBQWdCLFNBQWhCQSxhQUFnQixDQUFTQyxjQUFULEVBQXdCOztBQUV4QyxZQUFJQyxpQkFBaUJoRCx3QkFBRWlELEtBQUYsQ0FBUUYsY0FBUixDQUFyQjs7QUFFQSxpQkFBU0cscUJBQVQsQ0FBK0JDLEdBQS9CLEVBQW9DO0FBQ2hDLGdCQUFJQyxTQUFTLEVBQWI7QUFDQSxnQkFBSUMsY0FBSjtBQUNBLGdCQUFJQSxRQUFRRixJQUFJRSxLQUFKLENBQVUseURBQVYsQ0FBWixFQUFrRjtBQUM5RUQseUJBQVNDLE1BQU0sQ0FBTixDQUFUO0FBQ0g7QUFDRCxtQkFBT0QsTUFBUDtBQUNIOztBQUVELGlCQUFTRSxNQUFULENBQWlCeEIsU0FBakIsRUFBMkI7O0FBRXZCLGdCQUFJc0IsU0FBUyxFQUFiO0FBQ0EsZ0JBQUlDLGNBQUo7O0FBRUEsZ0JBQUdBLFFBQVF2QixVQUFVdUIsS0FBVixDQUFnQixJQUFJRSxNQUFKLENBQVcseUtBQVgsRUFBc0wsSUFBdEwsQ0FBaEIsQ0FBWCxFQUF3TjtBQUNwTkgseUJBQVNDLE1BQU0sQ0FBTixDQUFUO0FBQ0g7O0FBRUQsbUJBQU9ELE1BQVA7QUFDSDs7QUFFRCxZQUFJSSxZQUFZTixzQkFBc0JoRyxZQUF0QixDQUFoQjtBQUNBLFlBQUl1RyxLQUFLSCxPQUFPTixlQUFlbEIsU0FBdEIsQ0FBVDs7QUFFQSxZQUFHMkIsT0FBTyxFQUFQLElBQWFBLE9BQU9ELFNBQXZCLEVBQWlDOztBQUU3QixtQkFBTyxJQUFQO0FBQ0g7O0FBRUQsZUFBTyxJQUFJRSxPQUFKLENBQVksVUFBVTlDLE9BQVYsRUFBbUIrQyxNQUFuQixFQUEyQjs7QUFFMUM7QUFDQSxnQkFBSTVGLGVBQWU2RixPQUFmLEtBQTJCLFNBQTNCLElBQXdDLENBQUNOLE9BQU9FLFNBQVAsQ0FBN0MsRUFBZ0U7O0FBRTVESyxzQkFBTSx5Q0FBeUNMLFNBQS9DLEVBQ0twRSxJQURMLENBQ1U7QUFBQSwyQkFBUTBFLEtBQUtDLElBQUwsRUFBUjtBQUFBLGlCQURWLEVBRUszRSxJQUZMLENBRVUsZ0JBQVE7O0FBRVYsd0JBQUk0RSxRQUFRQSxLQUFLQyxNQUFiLElBQXVCRCxLQUFLQyxNQUFMLENBQVluRSxNQUFaLEdBQXFCLENBQWhELEVBQW1EOztBQUUvQyw0QkFBSWtFLEtBQUtDLE1BQUwsQ0FBWSxDQUFaLEVBQWVELElBQW5CLEVBQXlCOztBQUVyQixnQ0FBSUUsY0FBY0YsS0FBS0MsTUFBTCxDQUFZLENBQVosRUFBZUQsSUFBakM7O0FBRUFoQiwyQ0FBZWxCLFNBQWYsR0FBMkJrQixlQUFlbEIsU0FBZixDQUF5QnFDLE9BQXpCLENBQWlDVixFQUFqQyxFQUFxQ1MsV0FBckMsQ0FBM0I7QUFDQXRELG9DQUFRb0MsY0FBUjtBQUNILHlCQU5ELE1BTU87O0FBRUgsbUNBQU8sSUFBUDtBQUNIO0FBQ0oscUJBWkQsTUFZTzs7QUFFSCwrQkFBTyxJQUFQO0FBQ0g7QUFDSixpQkFwQkw7QUFzQkgsYUF4QkQsTUF3Qk87O0FBRUhBLCtCQUFlbEIsU0FBZixHQUEyQmtCLGVBQWVsQixTQUFmLENBQXlCcUMsT0FBekIsQ0FBaUNWLEVBQWpDLEVBQXFDRCxTQUFyQyxDQUEzQjtBQUNBNUMsd0JBQVFvQyxjQUFSO0FBQ0g7QUFFSixTQWpDTSxDQUFQO0FBa0NILEtBbkVEOztBQXFFQSxhQUFTckIsZUFBVCxDQUF5QnBELGNBQXpCLEVBQXlDb0MsVUFBekMsRUFBcUQ7O0FBRWpELGFBQUssSUFBSXlELElBQUksQ0FBYixFQUFnQkEsSUFBSXpELFdBQVdiLE1BQS9CLEVBQXVDc0UsR0FBdkMsRUFBNEM7QUFDeEMsZ0JBQUl6RCxXQUFXeUQsQ0FBWCxLQUFpQnpELFdBQVd5RCxDQUFYLEVBQWN0QyxTQUFuQyxFQUE4Qzs7QUFFMUMsb0JBQUlpQixpQkFBaUJwQyxXQUFXeUQsQ0FBWCxDQUFyQjs7QUFFQSxvQkFBSUMsd0JBQXdCdkIsY0FBY0MsY0FBZCxDQUE1Qjs7QUFFQXhFLCtCQUFlb0QsZUFBZixDQUErQixJQUFJMkMsZUFBSixDQUFvQnZCLGNBQXBCLENBQS9CLEVBQW9FM0QsSUFBcEUsQ0FBeUUsWUFBWTtBQUNqRmpELHNDQUFrQkMsR0FBbEIsQ0FBc0IsMkJBQXRCO0FBQ0gsaUJBRkQsV0FFUyxVQUFVTyxLQUFWLEVBQWlCO0FBQ3RCLHdCQUFJeUQsWUFBWUMsa0JBQU9DLEtBQVAsQ0FBYWlFLCtDQUFiLENBQWhCO0FBQ0FuRSw4QkFBVXpELEtBQVYsR0FBa0JBLEtBQWxCO0FBQ0F5Qiw4QkFBVWdDLFNBQVY7QUFDSCxpQkFORDs7QUFRQSxvQkFBR2lFLHFCQUFILEVBQXlCO0FBQ3JCQSwwQ0FBc0JqRixJQUF0QixDQUEyQixVQUFVNEQsY0FBVixFQUEwQjs7QUFFakQsNEJBQUlBLGNBQUosRUFBb0I7O0FBRWhCekUsMkNBQWVvRCxlQUFmLENBQStCLElBQUkyQyxlQUFKLENBQW9CdEIsY0FBcEIsQ0FBL0IsRUFBb0U1RCxJQUFwRSxDQUF5RSxZQUFZO0FBQ3JGakQsa0RBQWtCQyxHQUFsQixDQUFzQixrQ0FBdEI7QUFFQyw2QkFIRCxXQUdTLFVBQVVPLEtBQVYsRUFBaUI7O0FBRXRCLG9DQUFJeUQsWUFBWUMsa0JBQU9DLEtBQVAsQ0FBYWlFLCtDQUFiLENBQWhCO0FBQ0FuRSwwQ0FBVXpELEtBQVYsR0FBa0JBLEtBQWxCO0FBQ0F5QiwwQ0FBVWdDLFNBQVY7QUFDSCw2QkFSRDtBQVNIO0FBQ0oscUJBZEQ7QUFlSDtBQUNKO0FBQ0o7QUFDSjs7QUFFRCxhQUFTb0UsYUFBVCxDQUF1QjVELE9BQXZCLEVBQWdDK0MsTUFBaEMsRUFBd0M7O0FBRXBDLFlBQUk7O0FBRUFuRyxpQkFBSyxJQUFJaUgsU0FBSixDQUFjdkgsWUFBZCxDQUFMOztBQUVBTSxlQUFHa0gsTUFBSCxHQUFZLFlBQVk7O0FBRXBCckQsNEJBQVk3RCxFQUFaLEVBQWdCO0FBQ1orRCw2QkFBUztBQURHLGlCQUFoQjs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0gsYUFYRDs7QUFhQS9ELGVBQUdtSCxTQUFILEdBQWUsVUFBVTlDLENBQVYsRUFBYTs7QUFFeEIsb0JBQU0rQyxVQUFVQyxLQUFLQyxLQUFMLENBQVdqRCxFQUFFbUMsSUFBYixDQUFoQjs7QUFFQSxvQkFBSVksUUFBUWpJLEtBQVosRUFBbUI7QUFDZix3QkFBSXlELFlBQVlDLGtCQUFPQyxLQUFQLENBQWF5RSxpQ0FBYixDQUFoQjtBQUNBM0UsOEJBQVV6RCxLQUFWLEdBQWtCaUksUUFBUWpJLEtBQTFCO0FBQ0F5Qiw4QkFBVWdDLFNBQVY7QUFDQTtBQUNIOztBQUVELG9CQUFJNEUsT0FBT0MsSUFBUCxDQUFZTCxPQUFaLEVBQXFCOUUsTUFBckIsS0FBZ0MsQ0FBaEMsSUFBcUM4RSxRQUFRTSxXQUFSLEtBQXdCRixNQUFqRSxFQUF5RTs7QUFFckU3SSxzQ0FBa0JDLEdBQWxCLENBQXNCLGVBQXRCO0FBQ0E7QUFDSDs7QUFFRCxvQkFBSXdJLFFBQVFyRCxPQUFSLEtBQW9CLE1BQXhCLEVBQWdDOztBQUU1QkYsZ0NBQVk3RCxFQUFaLEVBQWdCLEVBQUMrRCxTQUFTLE1BQVYsRUFBaEI7QUFDQTtBQUNIOztBQUVELG9CQUFJLENBQUNxRCxRQUFRdEcsRUFBYixFQUFpQjs7QUFFYm5DLHNDQUFrQkMsR0FBbEIsQ0FBc0IscUJBQXRCO0FBQ0E7QUFDSDs7QUFFRCxvQkFBSXdJLFFBQVFyRCxPQUFSLEtBQW9CLE9BQXhCLEVBQWlDOztBQUU3QmYsNkNBQXlCb0UsUUFBUXRHLEVBQWpDLEVBQXFDc0csUUFBUXRELE9BQTdDLEVBQXNEc0QsUUFBUWxFLEdBQTlELEVBQW1Fa0UsUUFBUWpFLFVBQTNFLEVBQXVGQyxPQUF2RjtBQUNBLHdCQUFHZ0UsUUFBUXRELE9BQVIsS0FBb0IsQ0FBdkIsRUFBeUI7QUFDckJyRSxpQ0FBU2tJLE9BQVQsQ0FBaUJDLHVCQUFqQixFQUErQixLQUEvQjtBQUNILHFCQUZELE1BRUs7QUFDRG5JLGlDQUFTa0ksT0FBVCxDQUFpQkMsdUJBQWpCLEVBQStCLElBQS9CO0FBQ0g7QUFDSjs7QUFFRCxvQkFBSVIsUUFBUXJELE9BQVIsS0FBb0IsbUJBQXhCLEVBQTZDOztBQUV6Q2UsK0NBQTJCc0MsUUFBUXRHLEVBQW5DLEVBQXVDc0csUUFBUXRELE9BQS9DO0FBQ0g7O0FBRUQsb0JBQUlzRCxRQUFRckQsT0FBUixLQUFvQixZQUF4QixFQUFzQzs7QUFFbEMsd0JBQUk4RCxrQkFBa0JoSCxzQkFBc0J1RyxRQUFRdEQsT0FBOUIsQ0FBdEI7O0FBRUErRCxvQ0FBZ0J2RSxvQkFBaEIsQ0FBcUMsSUFBSUMscUJBQUosQ0FBMEI2RCxRQUFRbEUsR0FBbEMsQ0FBckMsRUFDS3RCLElBREwsQ0FDVSxVQUFVNkIsSUFBVixFQUFnQixDQUVyQixDQUhMLFdBSVcsVUFBVXRFLEtBQVYsRUFBaUI7QUFDcEIsNEJBQUl5RCxZQUFZQyxrQkFBT0MsS0FBUCxDQUFhb0IsOENBQWIsQ0FBaEI7QUFDQXRCLGtDQUFVekQsS0FBVixHQUFrQkEsS0FBbEI7QUFDQXlCLGtDQUFVZ0MsU0FBVjtBQUNILHFCQVJMO0FBU0g7O0FBRUQsb0JBQUl3RSxRQUFRckQsT0FBUixLQUFvQixXQUF4QixFQUFxQzs7QUFFakM7QUFDQSx3QkFBSStELGtCQUFrQmpILHNCQUFzQnVHLFFBQVF0RyxFQUE5QixDQUF0Qjs7QUFFQXFELG9DQUFnQjJELGVBQWhCLEVBQWlDVixRQUFRakUsVUFBekM7QUFDSDs7QUFFRCxvQkFBSWlFLFFBQVFyRCxPQUFSLEtBQW9CLGVBQXhCLEVBQXlDOztBQUVyQztBQUNBLHdCQUFJZ0Usa0JBQWtCbEgsc0JBQXNCdUcsUUFBUXRELE9BQTlCLENBQXRCOztBQUVBSyxvQ0FBZ0I0RCxlQUFoQixFQUFpQ1gsUUFBUWpFLFVBQXpDO0FBQ0g7O0FBRUQsb0JBQUlpRSxRQUFRckQsT0FBUixLQUFvQixNQUF4QixFQUFnQzs7QUFFNUIsd0JBQUk1RCx1QkFBdUI4QyxNQUF2QixLQUFrQ21FLFFBQVF0RCxPQUE5QyxFQUF1RDs7QUFFbkQ7O0FBRUE7QUFDQTs7QUFFQTVELHFDQUFhLElBQWI7QUFDQUMsK0NBQXVCWSxjQUF2QixDQUFzQ2lILEtBQXRDO0FBQ0E3SCxpREFBeUIsSUFBekI7O0FBRUE7QUFDQVYsaUNBQVN3SSxLQUFUOztBQUVBcEUsb0NBQVk3RCxFQUFaLEVBQWdCO0FBQ1orRCxxQ0FBUztBQURHLHlCQUFoQjtBQUlILHFCQWxCRCxNQWtCTzs7QUFFSDtBQUNBLDRCQUFJM0Qsc0JBQXNCZ0gsUUFBUXRELE9BQTlCLENBQUosRUFBNEM7QUFDeEM7QUFDQTFELGtEQUFzQmdILFFBQVF0RCxPQUE5QixFQUF1Qy9DLGNBQXZDLENBQXNEaUgsS0FBdEQ7QUFDQSxtQ0FBTzVILHNCQUFzQmdILFFBQVF0RCxPQUE5QixDQUFQO0FBQ0g7QUFDSjtBQUNKO0FBQ0osYUF6R0Q7QUEwR0E5RCxlQUFHa0ksT0FBSCxHQUFhLFlBQVk7O0FBRXJCLG9CQUFHLENBQUM3SCxnQkFBSixFQUFxQjs7QUFFakIsd0JBQUl1QyxZQUFZQyxrQkFBT0MsS0FBUCxDQUFheUUsaUNBQWIsQ0FBaEI7O0FBRUEsd0JBQUlwSCxzQkFBSixFQUE0QjtBQUN4QnlDLG9DQUFZQyxrQkFBT0MsS0FBUCxDQUFhNkIsOENBQWIsQ0FBWjtBQUNIOztBQUVEL0QsOEJBQVVnQyxTQUFWO0FBQ0g7QUFDSixhQVpEOztBQWNBNUMsZUFBR21JLE9BQUgsR0FBYSxVQUFVaEosS0FBVixFQUFpQjs7QUFFMUI7QUFDQSxvQkFBRyxDQUFDa0IsZ0JBQUosRUFBcUI7QUFDakIsd0JBQUl1QyxZQUFZQyxrQkFBT0MsS0FBUCxDQUFheUUsaUNBQWIsQ0FBaEI7QUFDQTNFLDhCQUFVekQsS0FBVixHQUFrQkEsS0FBbEI7QUFDQXlCLDhCQUFVZ0MsU0FBVjtBQUNBO0FBQ0g7QUFDSixhQVREO0FBV0gsU0FwSkQsQ0FvSkUsT0FBT3pELEtBQVAsRUFBYzs7QUFFWnlCLHNCQUFVekIsS0FBVjtBQUNIO0FBQ0o7O0FBRUQsYUFBU2lKLFVBQVQsR0FBc0I7O0FBRWxCekosMEJBQWtCQyxHQUFsQixDQUFzQiw0QkFBdEI7O0FBRUEsZUFBTyxJQUFJc0gsT0FBSixDQUFZLFVBQVU5QyxPQUFWLEVBQW1CK0MsTUFBbkIsRUFBMkI7O0FBRTFDeEgsOEJBQWtCQyxHQUFsQixDQUFzQix3QkFBd0JjLFlBQTlDOztBQUVBc0gsMEJBQWM1RCxPQUFkLEVBQXVCK0MsTUFBdkI7QUFDSCxTQUxNLENBQVA7QUFNSDs7QUFFRCxhQUFTdkYsU0FBVCxDQUFtQnpCLEtBQW5CLEVBQTBCOztBQUV0QlIsMEJBQWtCQyxHQUFsQixDQUFzQiwyQkFBdEI7O0FBRUEsWUFBSSxDQUFDTyxLQUFMLEVBQVk7QUFDUmtCLCtCQUFtQixJQUFuQjtBQUNIOztBQUVELFlBQUlGLHNCQUFKLEVBQTRCOztBQUV4QixnQkFBSUEsdUJBQXVCRyxlQUEzQixFQUE0QztBQUN4Q1ksNkJBQWFmLHVCQUF1QkcsZUFBcEM7QUFDSDs7QUFFREoseUJBQWEsSUFBYjs7QUFFQXZCLDhCQUFrQkMsR0FBbEIsQ0FBc0IsaUNBQXRCO0FBQ0EsZ0JBQUkwQixlQUFKLEVBQXFCO0FBQ2pCWSw2QkFBYVosZUFBYjtBQUNIOztBQUVELGdCQUFJSCx1QkFBdUJZLGNBQTNCLEVBQTJDOztBQUV2Q1osdUNBQXVCWSxjQUF2QixDQUFzQ2lILEtBQXRDO0FBQ0g7O0FBRUQ3SCxtQ0FBdUJZLGNBQXZCLEdBQXdDLElBQXhDO0FBQ0FaLHFDQUF5QixJQUF6QjtBQUNIOztBQUVELFlBQUlxSCxPQUFPQyxJQUFQLENBQVlySCxxQkFBWixFQUFtQ2tDLE1BQW5DLEdBQTRDLENBQWhELEVBQW1EOztBQUUvQyxpQkFBSyxJQUFJMEMsUUFBVCxJQUFxQjVFLHFCQUFyQixFQUE0Qzs7QUFFeEMsb0JBQUlpSSx1QkFBdUJqSSxzQkFBc0I0RSxRQUF0QixFQUFnQ2pFLGNBQTNEOztBQUVBLG9CQUFJc0gsb0JBQUosRUFBMEI7QUFDdEIxSixzQ0FBa0JDLEdBQWxCLENBQXNCLG1DQUF0QjtBQUNBeUoseUNBQXFCTCxLQUFyQjtBQUNBSywyQ0FBdUIsSUFBdkI7QUFDSDtBQUNKOztBQUVEakksb0NBQXdCLEVBQXhCO0FBQ0g7O0FBRURrSSxzQkFBY3JJLE1BQWQ7QUFDQUEsaUJBQVMsSUFBVDs7QUFFQSxZQUFJRCxFQUFKLEVBQVE7QUFDSnJCLDhCQUFrQkMsR0FBbEIsQ0FBc0IsaUNBQXRCO0FBQ0FELDhCQUFrQkMsR0FBbEIsQ0FBc0Isd0JBQXRCO0FBQ0E7Ozs7OztBQU1BLGdCQUFJb0IsR0FBR3VJLFVBQUgsS0FBa0IsQ0FBbEIsSUFBdUJ2SSxHQUFHdUksVUFBSCxLQUFrQixDQUE3QyxFQUFnRDs7QUFFNUNsSSxtQ0FBbUIsSUFBbkI7O0FBRUEsb0JBQUlGLHNCQUFKLEVBQTRCO0FBQ3hCMEQsZ0NBQVk3RCxFQUFaLEVBQWdCO0FBQ1orRCxpQ0FBUyxNQURHO0FBRVpqRCw0QkFBSVgsdUJBQXVCVztBQUZmLHFCQUFoQjtBQUlIOztBQUVEZCxtQkFBR2dJLEtBQUg7QUFDSDtBQUVKLFNBdkJELE1BdUJLO0FBQ0QzSCwrQkFBbUIsS0FBbkI7QUFDSDs7QUFFREwsYUFBSyxJQUFMOztBQUVBLFlBQUliLEtBQUosRUFBVztBQUNQRix5QkFBYUUsS0FBYixFQUFvQk0sUUFBcEI7QUFDSDtBQUNKOztBQUVELGFBQVNvRSxXQUFULENBQXFCN0QsRUFBckIsRUFBeUJvSCxPQUF6QixFQUFrQzs7QUFFOUIsWUFBSXBILEVBQUosRUFBUTtBQUNKQSxlQUFHd0ksSUFBSCxDQUFRbkIsS0FBS29CLFNBQUwsQ0FBZXJCLE9BQWYsQ0FBUjtBQUNIO0FBRUo7O0FBRURoSyxTQUFLOEIsT0FBTCxHQUFlLFlBQU07QUFDakIsZUFBT2tKLFlBQVA7QUFDSCxLQUZEOztBQUlBaEwsU0FBS3lCLE9BQUwsR0FBZSxZQUFNO0FBQ2pCK0I7QUFDSCxLQUZEOztBQUlBLFdBQU94RCxJQUFQO0FBQ0gsQ0FqckJEOztxQkFtckJlb0MsWTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcHNCZixDQUFDLFVBQVNrSixDQUFULEVBQVc7QUFBQyxNQUFHLDhCQUFPQyxPQUFQLE9BQWlCLFFBQWpCLElBQTJCLE9BQU9DLE1BQVAsS0FBZ0IsV0FBOUMsRUFBMEQ7QUFBQ0EsV0FBT0QsT0FBUCxHQUFlRCxHQUFmO0FBQW1CLEdBQTlFLE1BQW1GLElBQUcsSUFBSCxFQUEwQztBQUFDRyxxQ0FBTyxFQUFQLG9DQUFVSCxDQUFWO0FBQUE7QUFBQTtBQUFBO0FBQWEsR0FBeEQsTUFBNEQsVUFBb0s7QUFBQyxDQUFqVSxFQUFtVSxZQUFVO0FBQUMsTUFBSUcsTUFBSixFQUFXRCxNQUFYLEVBQWtCRCxPQUFsQixDQUEwQixPQUFRLFNBQVN0RSxDQUFULENBQVd5RSxDQUFYLEVBQWFDLENBQWIsRUFBZUMsQ0FBZixFQUFpQjtBQUFDLGFBQVNDLENBQVQsQ0FBV0MsQ0FBWCxFQUFhQyxDQUFiLEVBQWU7QUFBQyxVQUFHLENBQUNKLEVBQUVHLENBQUYsQ0FBSixFQUFTO0FBQUMsWUFBRyxDQUFDSixFQUFFSSxDQUFGLENBQUosRUFBUztBQUFDLGNBQUlFLElBQUUsT0FBT0MsT0FBUCxJQUFnQixVQUFoQixJQUE0QkEsT0FBbEMsQ0FBMEMsSUFBRyxDQUFDRixDQUFELElBQUlDLENBQVAsRUFBUyxPQUFPQSxPQUFDQSxDQUFDRixDQUFGLEVBQUksQ0FBQyxDQUFMLENBQVAsQ0FBZSxJQUFHdEMsQ0FBSCxFQUFLLE9BQU9BLEVBQUVzQyxDQUFGLEVBQUksQ0FBQyxDQUFMLENBQVAsQ0FBZSxJQUFJUixJQUFFLElBQUlZLEtBQUosQ0FBVSx5QkFBdUJKLENBQXZCLEdBQXlCLEdBQW5DLENBQU4sQ0FBOEMsTUFBTVIsRUFBRWEsSUFBRixHQUFPLGtCQUFQLEVBQTBCYixDQUFoQztBQUFrQyxhQUFJYyxJQUFFVCxFQUFFRyxDQUFGLElBQUssRUFBQ1AsU0FBUSxFQUFULEVBQVgsQ0FBd0JHLEVBQUVJLENBQUYsRUFBSyxDQUFMLEVBQVFPLElBQVIsQ0FBYUQsRUFBRWIsT0FBZixFQUF1QixVQUFTdEUsQ0FBVCxFQUFXO0FBQUMsY0FBSTBFLElBQUVELEVBQUVJLENBQUYsRUFBSyxDQUFMLEVBQVE3RSxDQUFSLENBQU4sQ0FBaUIsT0FBTzRFLEVBQUVGLElBQUVBLENBQUYsR0FBSTFFLENBQU4sQ0FBUDtBQUFnQixTQUFwRSxFQUFxRW1GLENBQXJFLEVBQXVFQSxFQUFFYixPQUF6RSxFQUFpRnRFLENBQWpGLEVBQW1GeUUsQ0FBbkYsRUFBcUZDLENBQXJGLEVBQXVGQyxDQUF2RjtBQUEwRixjQUFPRCxFQUFFRyxDQUFGLEVBQUtQLE9BQVo7QUFBb0IsU0FBSS9CLElBQUUsT0FBT3lDLE9BQVAsSUFBZ0IsVUFBaEIsSUFBNEJBLE9BQWxDLENBQTBDLEtBQUksSUFBSUgsSUFBRSxDQUFWLEVBQVlBLElBQUVGLEVBQUUxRyxNQUFoQixFQUF1QjRHLEdBQXZCO0FBQTJCRCxRQUFFRCxFQUFFRSxDQUFGLENBQUY7QUFBM0IsS0FBbUMsT0FBT0QsQ0FBUDtBQUFTLEdBQXpiLENBQTJiLEVBQUMsR0FBRSxDQUFDLFVBQVNJLE9BQVQsRUFBaUJULE1BQWpCLEVBQXdCRCxPQUF4QixFQUFnQztBQUM5MEI7Ozs7Ozs7QUFPQztBQUNEOztBQUVBLFVBQUllLFdBQVdMLFFBQVEsS0FBUixDQUFmOztBQUVBLGVBQVNNLGlCQUFULENBQTJCQyxXQUEzQixFQUF3Q0MsSUFBeEMsRUFBOENuTCxJQUE5QyxFQUFvREssTUFBcEQsRUFBNEQrSyxRQUE1RCxFQUFzRTtBQUNwRSxZQUFJNUcsTUFBTXdHLFNBQVNLLG1CQUFULENBQTZCSCxZQUFZNUgsSUFBekMsRUFBK0M2SCxJQUEvQyxDQUFWOztBQUVBO0FBQ0EzRyxlQUFPd0csU0FBU00sa0JBQVQsQ0FDSEosWUFBWUssV0FBWixDQUF3QkMsa0JBQXhCLEVBREcsQ0FBUDs7QUFHQTtBQUNBaEgsZUFBT3dHLFNBQVNTLG1CQUFULENBQ0hQLFlBQVlRLGFBQVosQ0FBMEJGLGtCQUExQixFQURHLEVBRUh4TCxTQUFTLE9BQVQsR0FBbUIsU0FBbkIsR0FBK0JvTCxZQUFZLFFBRnhDLENBQVA7O0FBSUE1RyxlQUFPLFdBQVcwRyxZQUFZUyxHQUF2QixHQUE2QixNQUFwQzs7QUFFQSxZQUFJVCxZQUFZVSxTQUFaLElBQXlCVixZQUFZVyxXQUF6QyxFQUFzRDtBQUNwRHJILGlCQUFPLGdCQUFQO0FBQ0QsU0FGRCxNQUVPLElBQUkwRyxZQUFZVSxTQUFoQixFQUEyQjtBQUNoQ3BILGlCQUFPLGdCQUFQO0FBQ0QsU0FGTSxNQUVBLElBQUkwRyxZQUFZVyxXQUFoQixFQUE2QjtBQUNsQ3JILGlCQUFPLGdCQUFQO0FBQ0QsU0FGTSxNQUVBO0FBQ0xBLGlCQUFPLGdCQUFQO0FBQ0Q7O0FBRUQsWUFBSTBHLFlBQVlVLFNBQWhCLEVBQTJCO0FBQ3pCLGNBQUlFLFVBQVVaLFlBQVlVLFNBQVosQ0FBc0JHLGVBQXRCLElBQ1ZiLFlBQVlVLFNBQVosQ0FBc0JJLEtBQXRCLENBQTRCNUosRUFEaEM7QUFFQThJLHNCQUFZVSxTQUFaLENBQXNCRyxlQUF0QixHQUF3Q0QsT0FBeEM7QUFDQTtBQUNBLGNBQUlHLE9BQU8sV0FBVzVMLFNBQVNBLE9BQU8rQixFQUFoQixHQUFxQixHQUFoQyxJQUF1QyxHQUF2QyxHQUNQMEosT0FETyxHQUNHLE1BRGQ7QUFFQXRILGlCQUFPLE9BQU95SCxJQUFkO0FBQ0E7QUFDQXpILGlCQUFPLFlBQVkwRyxZQUFZZ0Isc0JBQVosQ0FBbUMsQ0FBbkMsRUFBc0NDLElBQWxELEdBQ0gsR0FERyxHQUNHRixJQURWOztBQUdBO0FBQ0EsY0FBSWYsWUFBWWdCLHNCQUFaLENBQW1DLENBQW5DLEVBQXNDRSxHQUExQyxFQUErQztBQUM3QzVILG1CQUFPLFlBQVkwRyxZQUFZZ0Isc0JBQVosQ0FBbUMsQ0FBbkMsRUFBc0NFLEdBQXRDLENBQTBDRCxJQUF0RCxHQUNILEdBREcsR0FDR0YsSUFEVjtBQUVBekgsbUJBQU8sc0JBQ0gwRyxZQUFZZ0Isc0JBQVosQ0FBbUMsQ0FBbkMsRUFBc0NDLElBRG5DLEdBQzBDLEdBRDFDLEdBRUhqQixZQUFZZ0Isc0JBQVosQ0FBbUMsQ0FBbkMsRUFBc0NFLEdBQXRDLENBQTBDRCxJQUZ2QyxHQUdILE1BSEo7QUFJRDtBQUNGO0FBQ0Q7QUFDQTNILGVBQU8sWUFBWTBHLFlBQVlnQixzQkFBWixDQUFtQyxDQUFuQyxFQUFzQ0MsSUFBbEQsR0FDSCxTQURHLEdBQ1NuQixTQUFTcUIsVUFEbEIsR0FDK0IsTUFEdEM7QUFFQSxZQUFJbkIsWUFBWVUsU0FBWixJQUF5QlYsWUFBWWdCLHNCQUFaLENBQW1DLENBQW5DLEVBQXNDRSxHQUFuRSxFQUF3RTtBQUN0RTVILGlCQUFPLFlBQVkwRyxZQUFZZ0Isc0JBQVosQ0FBbUMsQ0FBbkMsRUFBc0NFLEdBQXRDLENBQTBDRCxJQUF0RCxHQUNILFNBREcsR0FDU25CLFNBQVNxQixVQURsQixHQUMrQixNQUR0QztBQUVEO0FBQ0QsZUFBTzdILEdBQVA7QUFDRDs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBUzhILGdCQUFULENBQTBCbEwsVUFBMUIsRUFBc0NtTCxXQUF0QyxFQUFtRDtBQUNqRCxZQUFJQyxVQUFVLEtBQWQ7QUFDQXBMLHFCQUFhdUgsS0FBS0MsS0FBTCxDQUFXRCxLQUFLb0IsU0FBTCxDQUFlM0ksVUFBZixDQUFYLENBQWI7QUFDQSxlQUFPQSxXQUFXcUwsTUFBWCxDQUFrQixVQUFTQyxNQUFULEVBQWlCO0FBQ3hDLGNBQUlBLFdBQVdBLE9BQU9DLElBQVAsSUFBZUQsT0FBT3pGLEdBQWpDLENBQUosRUFBMkM7QUFDekMsZ0JBQUkwRixPQUFPRCxPQUFPQyxJQUFQLElBQWVELE9BQU96RixHQUFqQztBQUNBLGdCQUFJeUYsT0FBT3pGLEdBQVAsSUFBYyxDQUFDeUYsT0FBT0MsSUFBMUIsRUFBZ0M7QUFDOUJDLHNCQUFRQyxJQUFSLENBQWEsbURBQWI7QUFDRDtBQUNELGdCQUFJQyxXQUFXLE9BQU9ILElBQVAsS0FBZ0IsUUFBL0I7QUFDQSxnQkFBSUcsUUFBSixFQUFjO0FBQ1pILHFCQUFPLENBQUNBLElBQUQsQ0FBUDtBQUNEO0FBQ0RBLG1CQUFPQSxLQUFLRixNQUFMLENBQVksVUFBU3hGLEdBQVQsRUFBYztBQUMvQixrQkFBSThGLFlBQVk5RixJQUFJK0YsT0FBSixDQUFZLE9BQVosTUFBeUIsQ0FBekIsSUFDWi9GLElBQUkrRixPQUFKLENBQVksZUFBWixNQUFpQyxDQUFDLENBRHRCLElBRVovRixJQUFJK0YsT0FBSixDQUFZLFFBQVosTUFBMEIsQ0FBQyxDQUZmLElBR1osQ0FBQ1IsT0FITDs7QUFLQSxrQkFBSU8sU0FBSixFQUFlO0FBQ2JQLDBCQUFVLElBQVY7QUFDQSx1QkFBTyxJQUFQO0FBQ0Q7QUFDRCxxQkFBT3ZGLElBQUkrRixPQUFKLENBQVksT0FBWixNQUF5QixDQUF6QixJQUE4QlQsZUFBZSxLQUE3QyxJQUNIdEYsSUFBSStGLE9BQUosQ0FBWSxnQkFBWixNQUFrQyxDQUFDLENBRHZDO0FBRUQsYUFaTSxDQUFQOztBQWNBLG1CQUFPTixPQUFPekYsR0FBZDtBQUNBeUYsbUJBQU9DLElBQVAsR0FBY0csV0FBV0gsS0FBSyxDQUFMLENBQVgsR0FBcUJBLElBQW5DO0FBQ0EsbUJBQU8sQ0FBQyxDQUFDQSxLQUFLL0ksTUFBZDtBQUNEO0FBQ0YsU0E1Qk0sQ0FBUDtBQTZCRDs7QUFFRDtBQUNBLGVBQVNxSixxQkFBVCxDQUErQkMsaUJBQS9CLEVBQWtEQyxrQkFBbEQsRUFBc0U7QUFDcEUsWUFBSUMscUJBQXFCO0FBQ3ZCQyxrQkFBUSxFQURlO0FBRXZCQyw0QkFBa0IsRUFGSztBQUd2QkMseUJBQWU7QUFIUSxTQUF6Qjs7QUFNQSxZQUFJQyx5QkFBeUIsU0FBekJBLHNCQUF5QixDQUFTQyxFQUFULEVBQWFKLE1BQWIsRUFBcUI7QUFDaERJLGVBQUtoSyxTQUFTZ0ssRUFBVCxFQUFhLEVBQWIsQ0FBTDtBQUNBLGVBQUssSUFBSXZGLElBQUksQ0FBYixFQUFnQkEsSUFBSW1GLE9BQU96SixNQUEzQixFQUFtQ3NFLEdBQW5DLEVBQXdDO0FBQ3RDLGdCQUFJbUYsT0FBT25GLENBQVAsRUFBVXdGLFdBQVYsS0FBMEJELEVBQTFCLElBQ0FKLE9BQU9uRixDQUFQLEVBQVV5RixvQkFBVixLQUFtQ0YsRUFEdkMsRUFDMkM7QUFDekMscUJBQU9KLE9BQU9uRixDQUFQLENBQVA7QUFDRDtBQUNGO0FBQ0YsU0FSRDs7QUFVQSxZQUFJMEYsdUJBQXVCLFNBQXZCQSxvQkFBdUIsQ0FBU0MsSUFBVCxFQUFlQyxJQUFmLEVBQXFCQyxPQUFyQixFQUE4QkMsT0FBOUIsRUFBdUM7QUFDaEUsY0FBSUMsU0FBU1QsdUJBQXVCSyxLQUFLSyxVQUFMLENBQWdCQyxHQUF2QyxFQUE0Q0osT0FBNUMsQ0FBYjtBQUNBLGNBQUlLLFNBQVNaLHVCQUF1Qk0sS0FBS0ksVUFBTCxDQUFnQkMsR0FBdkMsRUFBNENILE9BQTVDLENBQWI7QUFDQSxpQkFBT0MsVUFBVUcsTUFBVixJQUNISCxPQUFPblAsSUFBUCxDQUFZdVAsV0FBWixPQUE4QkQsT0FBT3RQLElBQVAsQ0FBWXVQLFdBQVosRUFEbEM7QUFFRCxTQUxEOztBQU9BbkIsMEJBQWtCRyxNQUFsQixDQUF5QmhLLE9BQXpCLENBQWlDLFVBQVM0SyxNQUFULEVBQWlCO0FBQ2hELGVBQUssSUFBSS9GLElBQUksQ0FBYixFQUFnQkEsSUFBSWlGLG1CQUFtQkUsTUFBbkIsQ0FBMEJ6SixNQUE5QyxFQUFzRHNFLEdBQXRELEVBQTJEO0FBQ3pELGdCQUFJa0csU0FBU2pCLG1CQUFtQkUsTUFBbkIsQ0FBMEJuRixDQUExQixDQUFiO0FBQ0EsZ0JBQUkrRixPQUFPblAsSUFBUCxDQUFZdVAsV0FBWixPQUE4QkQsT0FBT3RQLElBQVAsQ0FBWXVQLFdBQVosRUFBOUIsSUFDQUosT0FBT0ssU0FBUCxLQUFxQkYsT0FBT0UsU0FEaEMsRUFDMkM7QUFDekMsa0JBQUlMLE9BQU9uUCxJQUFQLENBQVl1UCxXQUFaLE9BQThCLEtBQTlCLElBQ0FKLE9BQU9DLFVBRFAsSUFDcUJFLE9BQU9GLFVBQVAsQ0FBa0JDLEdBRDNDLEVBQ2dEO0FBQzlDO0FBQ0E7QUFDQSxvQkFBSSxDQUFDUCxxQkFBcUJLLE1BQXJCLEVBQTZCRyxNQUE3QixFQUNEbEIsa0JBQWtCRyxNQURqQixFQUN5QkYsbUJBQW1CRSxNQUQ1QyxDQUFMLEVBQzBEO0FBQ3hEO0FBQ0Q7QUFDRjtBQUNEZSx1QkFBU3pGLEtBQUtDLEtBQUwsQ0FBV0QsS0FBS29CLFNBQUwsQ0FBZXFFLE1BQWYsQ0FBWCxDQUFULENBVnlDLENBVUk7QUFDN0M7QUFDQUEscUJBQU9HLFdBQVAsR0FBcUJDLEtBQUtDLEdBQUwsQ0FBU1IsT0FBT00sV0FBaEIsRUFDakJILE9BQU9HLFdBRFUsQ0FBckI7QUFFQTtBQUNBbkIsaUNBQW1CQyxNQUFuQixDQUEwQjFKLElBQTFCLENBQStCeUssTUFBL0I7O0FBRUE7QUFDQUEscUJBQU9NLFlBQVAsR0FBc0JOLE9BQU9NLFlBQVAsQ0FBb0JqQyxNQUFwQixDQUEyQixVQUFTa0MsRUFBVCxFQUFhO0FBQzVELHFCQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSVgsT0FBT1MsWUFBUCxDQUFvQjlLLE1BQXhDLEVBQWdEZ0wsR0FBaEQsRUFBcUQ7QUFDbkQsc0JBQUlYLE9BQU9TLFlBQVAsQ0FBb0JFLENBQXBCLEVBQXVCNU8sSUFBdkIsS0FBZ0MyTyxHQUFHM08sSUFBbkMsSUFDQWlPLE9BQU9TLFlBQVAsQ0FBb0JFLENBQXBCLEVBQXVCQyxTQUF2QixLQUFxQ0YsR0FBR0UsU0FENUMsRUFDdUQ7QUFDckQsMkJBQU8sSUFBUDtBQUNEO0FBQ0Y7QUFDRCx1QkFBTyxLQUFQO0FBQ0QsZUFScUIsQ0FBdEI7QUFTQTtBQUNBO0FBQ0E7QUFDRDtBQUNGO0FBQ0YsU0FwQ0Q7O0FBc0NBM0IsMEJBQWtCSSxnQkFBbEIsQ0FBbUNqSyxPQUFuQyxDQUEyQyxVQUFTeUwsZ0JBQVQsRUFBMkI7QUFDcEUsZUFBSyxJQUFJNUcsSUFBSSxDQUFiLEVBQWdCQSxJQUFJaUYsbUJBQW1CRyxnQkFBbkIsQ0FBb0MxSixNQUF4RCxFQUNLc0UsR0FETCxFQUNVO0FBQ1IsZ0JBQUk2RyxtQkFBbUI1QixtQkFBbUJHLGdCQUFuQixDQUFvQ3BGLENBQXBDLENBQXZCO0FBQ0EsZ0JBQUk0RyxpQkFBaUJFLEdBQWpCLEtBQXlCRCxpQkFBaUJDLEdBQTlDLEVBQW1EO0FBQ2pENUIsaUNBQW1CRSxnQkFBbkIsQ0FBb0MzSixJQUFwQyxDQUF5Q29MLGdCQUF6QztBQUNBO0FBQ0Q7QUFDRjtBQUNGLFNBVEQ7O0FBV0E7QUFDQSxlQUFPM0Isa0JBQVA7QUFDRDs7QUFFRDtBQUNBLGVBQVM2QiwrQkFBVCxDQUF5Q0MsTUFBekMsRUFBaURsUCxJQUFqRCxFQUF1RG1QLGNBQXZELEVBQXVFO0FBQ3JFLGVBQU87QUFDTEMsaUJBQU87QUFDTHBLLGlDQUFxQixDQUFDLFFBQUQsRUFBVyxrQkFBWCxDQURoQjtBQUVMSixrQ0FBc0IsQ0FBQyxRQUFELEVBQVcsbUJBQVg7QUFGakIsV0FERjtBQUtMeUssa0JBQVE7QUFDTnJLLGlDQUFxQixDQUFDLG1CQUFELEVBQXNCLHFCQUF0QixDQURmO0FBRU5KLGtDQUFzQixDQUFDLGtCQUFELEVBQXFCLHNCQUFyQjtBQUZoQjtBQUxILFVBU0w1RSxJQVRLLEVBU0NrUCxNQVRELEVBU1NsQyxPQVRULENBU2lCbUMsY0FUakIsTUFTcUMsQ0FBQyxDQVQ3QztBQVVEOztBQUVELGVBQVNHLGlCQUFULENBQTJCQyxZQUEzQixFQUF5QzNKLFNBQXpDLEVBQW9EO0FBQ2xEO0FBQ0E7QUFDQSxZQUFJNEosZUFBZUQsYUFBYUUsbUJBQWIsR0FDZEMsSUFEYyxDQUNULFVBQVNDLGVBQVQsRUFBMEI7QUFDOUIsaUJBQU8vSixVQUFVZ0ssVUFBVixLQUF5QkQsZ0JBQWdCQyxVQUF6QyxJQUNIaEssVUFBVTJCLEVBQVYsS0FBaUJvSSxnQkFBZ0JwSSxFQUQ5QixJQUVIM0IsVUFBVWlLLElBQVYsS0FBbUJGLGdCQUFnQkUsSUFGaEMsSUFHSGpLLFVBQVVrSyxRQUFWLEtBQXVCSCxnQkFBZ0JHLFFBSHBDLElBSUhsSyxVQUFVbUssUUFBVixLQUF1QkosZ0JBQWdCSSxRQUpwQyxJQUtIbkssVUFBVTVGLElBQVYsS0FBbUIyUCxnQkFBZ0IzUCxJQUx2QztBQU1ELFNBUmMsQ0FBbkI7QUFTQSxZQUFJLENBQUN3UCxZQUFMLEVBQW1CO0FBQ2pCRCx1QkFBYVMsa0JBQWIsQ0FBZ0NwSyxTQUFoQztBQUNEO0FBQ0QsZUFBTyxDQUFDNEosWUFBUjtBQUNEOztBQUdELGVBQVNTLFNBQVQsQ0FBbUJuUixJQUFuQixFQUF5Qm9SLFdBQXpCLEVBQXNDO0FBQ3BDLFlBQUl2SyxJQUFJLElBQUlpRixLQUFKLENBQVVzRixXQUFWLENBQVI7QUFDQXZLLFVBQUU3RyxJQUFGLEdBQVNBLElBQVQ7QUFDQTtBQUNBNkcsVUFBRWtGLElBQUYsR0FBUztBQUNQc0YsNkJBQW1CLENBRFo7QUFFUEMsNkJBQW1CLEVBRlo7QUFHUEMsOEJBQW9CLEVBSGI7QUFJUEMscUJBQVdDLFNBSko7QUFLUEMsMEJBQWdCRDtBQUxULFVBTVB6UixJQU5PLENBQVQ7QUFPQSxlQUFPNkcsQ0FBUDtBQUNEOztBQUVEdUUsYUFBT0QsT0FBUCxHQUFpQixVQUFTbEksTUFBVCxFQUFpQndLLFdBQWpCLEVBQThCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBLGlCQUFTa0UsNEJBQVQsQ0FBc0N6RSxLQUF0QyxFQUE2QzNMLE1BQTdDLEVBQXFEO0FBQ25EQSxpQkFBT3FRLFFBQVAsQ0FBZ0IxRSxLQUFoQjtBQUNBM0wsaUJBQU9zUSxhQUFQLENBQXFCLElBQUk1TyxPQUFPNk8scUJBQVgsQ0FBaUMsVUFBakMsRUFDakIsRUFBQzVFLE9BQU9BLEtBQVIsRUFEaUIsQ0FBckI7QUFFRDs7QUFFRCxpQkFBUzZFLGlDQUFULENBQTJDN0UsS0FBM0MsRUFBa0QzTCxNQUFsRCxFQUEwRDtBQUN4REEsaUJBQU95USxXQUFQLENBQW1COUUsS0FBbkI7QUFDQTNMLGlCQUFPc1EsYUFBUCxDQUFxQixJQUFJNU8sT0FBTzZPLHFCQUFYLENBQWlDLGFBQWpDLEVBQ2pCLEVBQUM1RSxPQUFPQSxLQUFSLEVBRGlCLENBQXJCO0FBRUQ7O0FBRUQsaUJBQVMrRSxZQUFULENBQXNCQyxFQUF0QixFQUEwQmhGLEtBQTFCLEVBQWlDaUYsUUFBakMsRUFBMkM5SyxPQUEzQyxFQUFvRDtBQUNsRCxjQUFJK0ssYUFBYSxJQUFJQyxLQUFKLENBQVUsT0FBVixDQUFqQjtBQUNBRCxxQkFBV2xGLEtBQVgsR0FBbUJBLEtBQW5CO0FBQ0FrRixxQkFBV0QsUUFBWCxHQUFzQkEsUUFBdEI7QUFDQUMscUJBQVdoRyxXQUFYLEdBQXlCLEVBQUMrRixVQUFVQSxRQUFYLEVBQXpCO0FBQ0FDLHFCQUFXL0ssT0FBWCxHQUFxQkEsT0FBckI7QUFDQXBFLGlCQUFPaUIsVUFBUCxDQUFrQixZQUFXO0FBQzNCZ08sZUFBR0ksY0FBSCxDQUFrQixPQUFsQixFQUEyQkYsVUFBM0I7QUFDRCxXQUZEO0FBR0Q7O0FBRUQsWUFBSXZNLG9CQUFvQixTQUFwQkEsaUJBQW9CLENBQVMwTSxNQUFULEVBQWlCO0FBQ3ZDLGNBQUlMLEtBQUssSUFBVDs7QUFFQSxjQUFJTSxlQUFlQyxTQUFTQyxzQkFBVCxFQUFuQjtBQUNBLFdBQUMsa0JBQUQsRUFBcUIscUJBQXJCLEVBQTRDLGVBQTVDLEVBQ0tuTyxPQURMLENBQ2EsVUFBU29PLE1BQVQsRUFBaUI7QUFDeEJULGVBQUdTLE1BQUgsSUFBYUgsYUFBYUcsTUFBYixFQUFxQkMsSUFBckIsQ0FBMEJKLFlBQTFCLENBQWI7QUFDRCxXQUhMOztBQUtBLGVBQUtLLHVCQUFMLEdBQStCLElBQS9COztBQUVBLGVBQUtDLGVBQUwsR0FBdUIsS0FBdkI7O0FBRUEsZUFBS0MsWUFBTCxHQUFvQixFQUFwQjtBQUNBLGVBQUtDLGFBQUwsR0FBcUIsRUFBckI7O0FBRUEsZUFBSzVNLGdCQUFMLEdBQXdCLElBQXhCO0FBQ0EsZUFBSzZNLGlCQUFMLEdBQXlCLElBQXpCOztBQUVBLGVBQUs1QyxjQUFMLEdBQXNCLFFBQXRCO0FBQ0EsZUFBS25KLGtCQUFMLEdBQTBCLEtBQTFCO0FBQ0EsZUFBS0YsZUFBTCxHQUF1QixLQUF2QjtBQUNBLGVBQUtrTSxpQkFBTCxHQUF5QixLQUF6Qjs7QUFFQVgsbUJBQVMxSSxLQUFLQyxLQUFMLENBQVdELEtBQUtvQixTQUFMLENBQWVzSCxVQUFVLEVBQXpCLENBQVgsQ0FBVDs7QUFFQSxlQUFLWSxXQUFMLEdBQW1CWixPQUFPYSxZQUFQLEtBQXdCLFlBQTNDO0FBQ0EsY0FBSWIsT0FBT2MsYUFBUCxLQUF5QixXQUE3QixFQUEwQztBQUN4QyxrQkFBTWxDLFVBQVUsbUJBQVYsRUFDRiw4Q0FERSxDQUFOO0FBRUQsV0FIRCxNQUdPLElBQUksQ0FBQ29CLE9BQU9jLGFBQVosRUFBMkI7QUFDaENkLG1CQUFPYyxhQUFQLEdBQXVCLFNBQXZCO0FBQ0Q7O0FBRUQsa0JBQVFkLE9BQU9oUSxrQkFBZjtBQUNFLGlCQUFLLEtBQUw7QUFDQSxpQkFBSyxPQUFMO0FBQ0U7QUFDRjtBQUNFZ1EscUJBQU9oUSxrQkFBUCxHQUE0QixLQUE1QjtBQUNBO0FBTko7O0FBU0Esa0JBQVFnUSxPQUFPYSxZQUFmO0FBQ0UsaUJBQUssVUFBTDtBQUNBLGlCQUFLLFlBQUw7QUFDQSxpQkFBSyxZQUFMO0FBQ0U7QUFDRjtBQUNFYixxQkFBT2EsWUFBUCxHQUFzQixVQUF0QjtBQUNBO0FBUEo7O0FBVUFiLGlCQUFPalEsVUFBUCxHQUFvQmtMLGlCQUFpQitFLE9BQU9qUSxVQUFQLElBQXFCLEVBQXRDLEVBQTBDbUwsV0FBMUMsQ0FBcEI7O0FBRUEsZUFBSzZGLGFBQUwsR0FBcUIsRUFBckI7QUFDQSxjQUFJZixPQUFPZ0Isb0JBQVgsRUFBaUM7QUFDL0IsaUJBQUssSUFBSW5LLElBQUltSixPQUFPZ0Isb0JBQXBCLEVBQTBDbkssSUFBSSxDQUE5QyxFQUFpREEsR0FBakQsRUFBc0Q7QUFDcEQsbUJBQUtrSyxhQUFMLENBQW1Cek8sSUFBbkIsQ0FBd0IsSUFBSTVCLE9BQU91USxjQUFYLENBQTBCO0FBQ2hEbFIsNEJBQVlpUSxPQUFPalEsVUFENkI7QUFFaERtUiw4QkFBY2xCLE9BQU9oUTtBQUYyQixlQUExQixDQUF4QjtBQUlEO0FBQ0YsV0FQRCxNQU9PO0FBQ0xnUSxtQkFBT2dCLG9CQUFQLEdBQThCLENBQTlCO0FBQ0Q7O0FBRUQsZUFBS0csT0FBTCxHQUFlbkIsTUFBZjs7QUFFQTtBQUNBO0FBQ0EsZUFBS29CLFlBQUwsR0FBb0IsRUFBcEI7O0FBRUEsZUFBS0MsYUFBTCxHQUFxQjFILFNBQVMySCxpQkFBVCxFQUFyQjtBQUNBLGVBQUtDLGtCQUFMLEdBQTBCLENBQTFCOztBQUVBLGVBQUtDLFNBQUwsR0FBaUJ0QyxTQUFqQixDQTVFdUMsQ0E0RVg7O0FBRTVCLGVBQUt1QyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0QsU0EvRUQ7O0FBaUZBO0FBQ0FuTywwQkFBa0JvTyxTQUFsQixDQUE0QnJOLGNBQTVCLEdBQTZDLElBQTdDO0FBQ0FmLDBCQUFrQm9PLFNBQWxCLENBQTRCQyxXQUE1QixHQUEwQyxJQUExQztBQUNBck8sMEJBQWtCb08sU0FBbEIsQ0FBNEI3TSxPQUE1QixHQUFzQyxJQUF0QztBQUNBdkIsMEJBQWtCb08sU0FBbEIsQ0FBNEJFLGNBQTVCLEdBQTZDLElBQTdDO0FBQ0F0TywwQkFBa0JvTyxTQUFsQixDQUE0Qkcsc0JBQTVCLEdBQXFELElBQXJEO0FBQ0F2TywwQkFBa0JvTyxTQUFsQixDQUE0QmhOLDBCQUE1QixHQUF5RCxJQUF6RDtBQUNBcEIsMEJBQWtCb08sU0FBbEIsQ0FBNEJsTix1QkFBNUIsR0FBc0QsSUFBdEQ7QUFDQWxCLDBCQUFrQm9PLFNBQWxCLENBQTRCSSx5QkFBNUIsR0FBd0QsSUFBeEQ7QUFDQXhPLDBCQUFrQm9PLFNBQWxCLENBQTRCSyxtQkFBNUIsR0FBa0QsSUFBbEQ7QUFDQXpPLDBCQUFrQm9PLFNBQWxCLENBQTRCTSxhQUE1QixHQUE0QyxJQUE1Qzs7QUFFQTFPLDBCQUFrQm9PLFNBQWxCLENBQTRCM0IsY0FBNUIsR0FBNkMsVUFBU3RTLElBQVQsRUFBZW1ELEtBQWYsRUFBc0I7QUFDakUsY0FBSSxLQUFLNlEsU0FBVCxFQUFvQjtBQUNsQjtBQUNEO0FBQ0QsZUFBS25DLGFBQUwsQ0FBbUIxTyxLQUFuQjtBQUNBLGNBQUksT0FBTyxLQUFLLE9BQU9uRCxJQUFaLENBQVAsS0FBNkIsVUFBakMsRUFBNkM7QUFDM0MsaUJBQUssT0FBT0EsSUFBWixFQUFrQm1ELEtBQWxCO0FBQ0Q7QUFDRixTQVJEOztBQVVBMEMsMEJBQWtCb08sU0FBbEIsQ0FBNEJPLHlCQUE1QixHQUF3RCxZQUFXO0FBQ2pFLGNBQUlyUixRQUFRLElBQUlrUCxLQUFKLENBQVUseUJBQVYsQ0FBWjtBQUNBLGVBQUtDLGNBQUwsQ0FBb0IseUJBQXBCLEVBQStDblAsS0FBL0M7QUFDRCxTQUhEOztBQUtBMEMsMEJBQWtCb08sU0FBbEIsQ0FBNEJRLGdCQUE1QixHQUErQyxZQUFXO0FBQ3hELGlCQUFPLEtBQUtmLE9BQVo7QUFDRCxTQUZEOztBQUlBN04sMEJBQWtCb08sU0FBbEIsQ0FBNEJTLGVBQTVCLEdBQThDLFlBQVc7QUFDdkQsaUJBQU8sS0FBSzNCLFlBQVo7QUFDRCxTQUZEOztBQUlBbE4sMEJBQWtCb08sU0FBbEIsQ0FBNEJVLGdCQUE1QixHQUErQyxZQUFXO0FBQ3hELGlCQUFPLEtBQUszQixhQUFaO0FBQ0QsU0FGRDs7QUFJQTtBQUNBO0FBQ0FuTiwwQkFBa0JvTyxTQUFsQixDQUE0Qlcsa0JBQTVCLEdBQWlELFVBQVNwUSxJQUFULEVBQWVxUSxRQUFmLEVBQXlCO0FBQ3hFLGNBQUlDLHFCQUFxQixLQUFLbkIsWUFBTCxDQUFrQjdPLE1BQWxCLEdBQTJCLENBQXBEO0FBQ0EsY0FBSXNILGNBQWM7QUFDaEJjLG1CQUFPLElBRFM7QUFFaEJULHlCQUFhLElBRkc7QUFHaEJnRSwwQkFBYyxJQUhFO0FBSWhCN0QsMkJBQWUsSUFKQztBQUtoQndCLCtCQUFtQixJQUxIO0FBTWhCQyxnQ0FBb0IsSUFOSjtBQU9oQnZCLHVCQUFXLElBUEs7QUFRaEJDLHlCQUFhLElBUkc7QUFTaEJ2SSxrQkFBTUEsSUFUVTtBQVVoQnFJLGlCQUFLLElBVlc7QUFXaEJPLG9DQUF3QixJQVhSO0FBWWhCMkgsb0NBQXdCLElBWlI7QUFhaEJ4VCxvQkFBUSxJQWJRO0FBY2hCeVQsMENBQThCLEVBZGQ7QUFlaEJDLHlCQUFhO0FBZkcsV0FBbEI7QUFpQkEsY0FBSSxLQUFLOUIsV0FBTCxJQUFvQjJCLGtCQUF4QixFQUE0QztBQUMxQzFJLHdCQUFZcUUsWUFBWixHQUEyQixLQUFLa0QsWUFBTCxDQUFrQixDQUFsQixFQUFxQmxELFlBQWhEO0FBQ0FyRSx3QkFBWVEsYUFBWixHQUE0QixLQUFLK0csWUFBTCxDQUFrQixDQUFsQixFQUFxQi9HLGFBQWpEO0FBQ0QsV0FIRCxNQUdPO0FBQ0wsZ0JBQUlzSSxhQUFhLEtBQUtDLDJCQUFMLEVBQWpCO0FBQ0EvSSx3QkFBWXFFLFlBQVosR0FBMkJ5RSxXQUFXekUsWUFBdEM7QUFDQXJFLHdCQUFZUSxhQUFaLEdBQTRCc0ksV0FBV3RJLGFBQXZDO0FBQ0Q7QUFDRCxjQUFJLENBQUNpSSxRQUFMLEVBQWU7QUFDYixpQkFBS2xCLFlBQUwsQ0FBa0I5TyxJQUFsQixDQUF1QnVILFdBQXZCO0FBQ0Q7QUFDRCxpQkFBT0EsV0FBUDtBQUNELFNBL0JEOztBQWlDQXZHLDBCQUFrQm9PLFNBQWxCLENBQTRCckMsUUFBNUIsR0FBdUMsVUFBUzFFLEtBQVQsRUFBZ0IzTCxNQUFoQixFQUF3QjtBQUM3RCxjQUFJLEtBQUt5UyxTQUFULEVBQW9CO0FBQ2xCLGtCQUFNN0MsVUFBVSxtQkFBVixFQUNGLHdEQURFLENBQU47QUFFRDs7QUFFRCxjQUFJaUUsZ0JBQWdCLEtBQUt6QixZQUFMLENBQWtCL0MsSUFBbEIsQ0FBdUIsVUFBU25GLENBQVQsRUFBWTtBQUNyRCxtQkFBT0EsRUFBRXlCLEtBQUYsS0FBWUEsS0FBbkI7QUFDRCxXQUZtQixDQUFwQjs7QUFJQSxjQUFJa0ksYUFBSixFQUFtQjtBQUNqQixrQkFBTWpFLFVBQVUsb0JBQVYsRUFBZ0MsdUJBQWhDLENBQU47QUFDRDs7QUFFRCxjQUFJL0UsV0FBSjtBQUNBLGVBQUssSUFBSWhELElBQUksQ0FBYixFQUFnQkEsSUFBSSxLQUFLdUssWUFBTCxDQUFrQjdPLE1BQXRDLEVBQThDc0UsR0FBOUMsRUFBbUQ7QUFDakQsZ0JBQUksQ0FBQyxLQUFLdUssWUFBTCxDQUFrQnZLLENBQWxCLEVBQXFCOEQsS0FBdEIsSUFDQSxLQUFLeUcsWUFBTCxDQUFrQnZLLENBQWxCLEVBQXFCNUUsSUFBckIsS0FBOEIwSSxNQUFNMUksSUFEeEMsRUFDOEM7QUFDNUM0SCw0QkFBYyxLQUFLdUgsWUFBTCxDQUFrQnZLLENBQWxCLENBQWQ7QUFDRDtBQUNGO0FBQ0QsY0FBSSxDQUFDZ0QsV0FBTCxFQUFrQjtBQUNoQkEsMEJBQWMsS0FBS3dJLGtCQUFMLENBQXdCMUgsTUFBTTFJLElBQTlCLENBQWQ7QUFDRDs7QUFFRCxlQUFLNlEsMkJBQUw7O0FBRUEsY0FBSSxLQUFLdEMsWUFBTCxDQUFrQjdFLE9BQWxCLENBQTBCM00sTUFBMUIsTUFBc0MsQ0FBQyxDQUEzQyxFQUE4QztBQUM1QyxpQkFBS3dSLFlBQUwsQ0FBa0JsTyxJQUFsQixDQUF1QnRELE1BQXZCO0FBQ0Q7O0FBRUQ2SyxzQkFBWWMsS0FBWixHQUFvQkEsS0FBcEI7QUFDQWQsc0JBQVk3SyxNQUFaLEdBQXFCQSxNQUFyQjtBQUNBNkssc0JBQVlVLFNBQVosR0FBd0IsSUFBSTdKLE9BQU9xUyxZQUFYLENBQXdCcEksS0FBeEIsRUFDcEJkLFlBQVlRLGFBRFEsQ0FBeEI7QUFFQSxpQkFBT1IsWUFBWVUsU0FBbkI7QUFDRCxTQXBDRDs7QUFzQ0FqSCwwQkFBa0JvTyxTQUFsQixDQUE0QnhNLFNBQTVCLEdBQXdDLFVBQVNsRyxNQUFULEVBQWlCO0FBQ3ZELGNBQUkyUSxLQUFLLElBQVQ7QUFDQSxjQUFJekUsZUFBZSxLQUFuQixFQUEwQjtBQUN4QmxNLG1CQUFPZ1UsU0FBUCxHQUFtQmhSLE9BQW5CLENBQTJCLFVBQVMySSxLQUFULEVBQWdCO0FBQ3pDZ0YsaUJBQUdOLFFBQUgsQ0FBWTFFLEtBQVosRUFBbUIzTCxNQUFuQjtBQUNELGFBRkQ7QUFHRCxXQUpELE1BSU87QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBSWlVLGVBQWVqVSxPQUFPMEcsS0FBUCxFQUFuQjtBQUNBMUcsbUJBQU9nVSxTQUFQLEdBQW1CaFIsT0FBbkIsQ0FBMkIsVUFBUzJJLEtBQVQsRUFBZ0J1SSxHQUFoQixFQUFxQjtBQUM5QyxrQkFBSUMsY0FBY0YsYUFBYUQsU0FBYixHQUF5QkUsR0FBekIsQ0FBbEI7QUFDQXZJLG9CQUFNeUksZ0JBQU4sQ0FBdUIsU0FBdkIsRUFBa0MsVUFBU3hTLEtBQVQsRUFBZ0I7QUFDaER1Uyw0QkFBWUUsT0FBWixHQUFzQnpTLE1BQU15UyxPQUE1QjtBQUNELGVBRkQ7QUFHRCxhQUxEO0FBTUFKLHlCQUFhRCxTQUFiLEdBQXlCaFIsT0FBekIsQ0FBaUMsVUFBUzJJLEtBQVQsRUFBZ0I7QUFDL0NnRixpQkFBR04sUUFBSCxDQUFZMUUsS0FBWixFQUFtQnNJLFlBQW5CO0FBQ0QsYUFGRDtBQUdEO0FBQ0YsU0FyQkQ7O0FBdUJBM1AsMEJBQWtCb08sU0FBbEIsQ0FBNEJqQyxXQUE1QixHQUEwQyxVQUFTNkQsTUFBVCxFQUFpQjtBQUN6RCxjQUFJLEtBQUs3QixTQUFULEVBQW9CO0FBQ2xCLGtCQUFNN0MsVUFBVSxtQkFBVixFQUNGLDJEQURFLENBQU47QUFFRDs7QUFFRCxjQUFJLEVBQUUwRSxrQkFBa0I1UyxPQUFPcVMsWUFBM0IsQ0FBSixFQUE4QztBQUM1QyxrQkFBTSxJQUFJOUQsU0FBSixDQUFjLGlEQUNoQiw0Q0FERSxDQUFOO0FBRUQ7O0FBRUQsY0FBSXBGLGNBQWMsS0FBS3VILFlBQUwsQ0FBa0IvQyxJQUFsQixDQUF1QixVQUFTdEYsQ0FBVCxFQUFZO0FBQ25ELG1CQUFPQSxFQUFFd0IsU0FBRixLQUFnQitJLE1BQXZCO0FBQ0QsV0FGaUIsQ0FBbEI7O0FBSUEsY0FBSSxDQUFDekosV0FBTCxFQUFrQjtBQUNoQixrQkFBTStFLFVBQVUsb0JBQVYsRUFDRiw0Q0FERSxDQUFOO0FBRUQ7QUFDRCxjQUFJNVAsU0FBUzZLLFlBQVk3SyxNQUF6Qjs7QUFFQTZLLHNCQUFZVSxTQUFaLENBQXNCZ0osSUFBdEI7QUFDQTFKLHNCQUFZVSxTQUFaLEdBQXdCLElBQXhCO0FBQ0FWLHNCQUFZYyxLQUFaLEdBQW9CLElBQXBCO0FBQ0FkLHNCQUFZN0ssTUFBWixHQUFxQixJQUFyQjs7QUFFQTtBQUNBLGNBQUl3UixlQUFlLEtBQUtZLFlBQUwsQ0FBa0JvQyxHQUFsQixDQUFzQixVQUFTekssQ0FBVCxFQUFZO0FBQ25ELG1CQUFPQSxFQUFFL0osTUFBVDtBQUNELFdBRmtCLENBQW5CO0FBR0EsY0FBSXdSLGFBQWE3RSxPQUFiLENBQXFCM00sTUFBckIsTUFBaUMsQ0FBQyxDQUFsQyxJQUNBLEtBQUt3UixZQUFMLENBQWtCN0UsT0FBbEIsQ0FBMEIzTSxNQUExQixJQUFvQyxDQUFDLENBRHpDLEVBQzRDO0FBQzFDLGlCQUFLd1IsWUFBTCxDQUFrQmlELE1BQWxCLENBQXlCLEtBQUtqRCxZQUFMLENBQWtCN0UsT0FBbEIsQ0FBMEIzTSxNQUExQixDQUF6QixFQUE0RCxDQUE1RDtBQUNEOztBQUVELGVBQUs4VCwyQkFBTDtBQUNELFNBcENEOztBQXNDQXhQLDBCQUFrQm9PLFNBQWxCLENBQTRCZ0MsWUFBNUIsR0FBMkMsVUFBUzFVLE1BQVQsRUFBaUI7QUFDMUQsY0FBSTJRLEtBQUssSUFBVDtBQUNBM1EsaUJBQU9nVSxTQUFQLEdBQW1CaFIsT0FBbkIsQ0FBMkIsVUFBUzJJLEtBQVQsRUFBZ0I7QUFDekMsZ0JBQUkySSxTQUFTM0QsR0FBR2dFLFVBQUgsR0FBZ0J0RixJQUFoQixDQUFxQixVQUFTbkYsQ0FBVCxFQUFZO0FBQzVDLHFCQUFPQSxFQUFFeUIsS0FBRixLQUFZQSxLQUFuQjtBQUNELGFBRlksQ0FBYjtBQUdBLGdCQUFJMkksTUFBSixFQUFZO0FBQ1YzRCxpQkFBR0YsV0FBSCxDQUFlNkQsTUFBZjtBQUNEO0FBQ0YsV0FQRDtBQVFELFNBVkQ7O0FBWUFoUSwwQkFBa0JvTyxTQUFsQixDQUE0QmlDLFVBQTVCLEdBQXlDLFlBQVc7QUFDbEQsaUJBQU8sS0FBS3ZDLFlBQUwsQ0FBa0JoRyxNQUFsQixDQUF5QixVQUFTdkIsV0FBVCxFQUFzQjtBQUNwRCxtQkFBTyxDQUFDLENBQUNBLFlBQVlVLFNBQXJCO0FBQ0QsV0FGTSxFQUdOaUosR0FITSxDQUdGLFVBQVMzSixXQUFULEVBQXNCO0FBQ3pCLG1CQUFPQSxZQUFZVSxTQUFuQjtBQUNELFdBTE0sQ0FBUDtBQU1ELFNBUEQ7O0FBU0FqSCwwQkFBa0JvTyxTQUFsQixDQUE0QmtDLFlBQTVCLEdBQTJDLFlBQVc7QUFDcEQsaUJBQU8sS0FBS3hDLFlBQUwsQ0FBa0JoRyxNQUFsQixDQUF5QixVQUFTdkIsV0FBVCxFQUFzQjtBQUNwRCxtQkFBTyxDQUFDLENBQUNBLFlBQVlXLFdBQXJCO0FBQ0QsV0FGTSxFQUdOZ0osR0FITSxDQUdGLFVBQVMzSixXQUFULEVBQXNCO0FBQ3pCLG1CQUFPQSxZQUFZVyxXQUFuQjtBQUNELFdBTE0sQ0FBUDtBQU1ELFNBUEQ7O0FBVUFsSCwwQkFBa0JvTyxTQUFsQixDQUE0Qm1DLGtCQUE1QixHQUFpRCxVQUFTQyxhQUFULEVBQzdDbEQsV0FENkMsRUFDaEM7QUFDZixjQUFJakIsS0FBSyxJQUFUO0FBQ0EsY0FBSWlCLGVBQWVrRCxnQkFBZ0IsQ0FBbkMsRUFBc0M7QUFDcEMsbUJBQU8sS0FBSzFDLFlBQUwsQ0FBa0IsQ0FBbEIsRUFBcUJsSCxXQUE1QjtBQUNELFdBRkQsTUFFTyxJQUFJLEtBQUs2RyxhQUFMLENBQW1CeE8sTUFBdkIsRUFBK0I7QUFDcEMsbUJBQU8sS0FBS3dPLGFBQUwsQ0FBbUJ2TyxLQUFuQixFQUFQO0FBQ0Q7QUFDRCxjQUFJMEgsY0FBYyxJQUFJeEosT0FBT3VRLGNBQVgsQ0FBMEI7QUFDMUNsUix3QkFBWSxLQUFLb1IsT0FBTCxDQUFhcFIsVUFEaUI7QUFFMUNtUiwwQkFBYyxLQUFLQyxPQUFMLENBQWFuUjtBQUZlLFdBQTFCLENBQWxCO0FBSUF5SCxpQkFBT3NNLGNBQVAsQ0FBc0I3SixXQUF0QixFQUFtQyxPQUFuQyxFQUNJLEVBQUM4SixPQUFPLEtBQVIsRUFBZUMsVUFBVSxJQUF6QixFQURKOztBQUlBLGVBQUs3QyxZQUFMLENBQWtCMEMsYUFBbEIsRUFBaUNJLHVCQUFqQyxHQUEyRCxFQUEzRDtBQUNBLGVBQUs5QyxZQUFMLENBQWtCMEMsYUFBbEIsRUFBaUNLLGdCQUFqQyxHQUFvRCxVQUFTdlQsS0FBVCxFQUFnQjtBQUNsRSxnQkFBSXdULE1BQU0sQ0FBQ3hULE1BQU0yRCxTQUFQLElBQW9Ca0QsT0FBT0MsSUFBUCxDQUFZOUcsTUFBTTJELFNBQWxCLEVBQTZCaEMsTUFBN0IsS0FBd0MsQ0FBdEU7QUFDQTtBQUNBO0FBQ0EySCx3QkFBWWpNLEtBQVosR0FBb0JtVyxNQUFNLFdBQU4sR0FBb0IsV0FBeEM7QUFDQSxnQkFBSXpFLEdBQUd5QixZQUFILENBQWdCMEMsYUFBaEIsRUFBK0JJLHVCQUEvQixLQUEyRCxJQUEvRCxFQUFxRTtBQUNuRXZFLGlCQUFHeUIsWUFBSCxDQUFnQjBDLGFBQWhCLEVBQStCSSx1QkFBL0IsQ0FBdUQ1UixJQUF2RCxDQUE0RDFCLEtBQTVEO0FBQ0Q7QUFDRixXQVJEO0FBU0FzSixzQkFBWWtKLGdCQUFaLENBQTZCLGdCQUE3QixFQUNFLEtBQUtoQyxZQUFMLENBQWtCMEMsYUFBbEIsRUFBaUNLLGdCQURuQztBQUVBLGlCQUFPakssV0FBUDtBQUNELFNBN0JEOztBQStCQTtBQUNBNUcsMEJBQWtCb08sU0FBbEIsQ0FBNEIyQyxPQUE1QixHQUFzQyxVQUFTL0osR0FBVCxFQUFjd0osYUFBZCxFQUE2QjtBQUNqRSxjQUFJbkUsS0FBSyxJQUFUO0FBQ0EsY0FBSXpGLGNBQWMsS0FBS2tILFlBQUwsQ0FBa0IwQyxhQUFsQixFQUFpQzVKLFdBQW5EO0FBQ0EsY0FBSUEsWUFBWW9LLGdCQUFoQixFQUFrQztBQUNoQztBQUNEO0FBQ0QsY0FBSUosMEJBQ0YsS0FBSzlDLFlBQUwsQ0FBa0IwQyxhQUFsQixFQUFpQ0ksdUJBRG5DO0FBRUEsZUFBSzlDLFlBQUwsQ0FBa0IwQyxhQUFsQixFQUFpQ0ksdUJBQWpDLEdBQTJELElBQTNEO0FBQ0FoSyxzQkFBWXFLLG1CQUFaLENBQWdDLGdCQUFoQyxFQUNFLEtBQUtuRCxZQUFMLENBQWtCMEMsYUFBbEIsRUFBaUNLLGdCQURuQztBQUVBakssc0JBQVlvSyxnQkFBWixHQUErQixVQUFTRSxHQUFULEVBQWM7QUFDM0MsZ0JBQUk3RSxHQUFHaUIsV0FBSCxJQUFrQmtELGdCQUFnQixDQUF0QyxFQUF5QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNEO0FBQ0QsZ0JBQUlsVCxRQUFRLElBQUlrUCxLQUFKLENBQVUsY0FBVixDQUFaO0FBQ0FsUCxrQkFBTTJELFNBQU4sR0FBa0IsRUFBQ2tRLFFBQVFuSyxHQUFULEVBQWN3SixlQUFlQSxhQUE3QixFQUFsQjs7QUFFQSxnQkFBSVksT0FBT0YsSUFBSWpRLFNBQWY7QUFDQTtBQUNBLGdCQUFJNlAsTUFBTSxDQUFDTSxJQUFELElBQVNqTixPQUFPQyxJQUFQLENBQVlnTixJQUFaLEVBQWtCblMsTUFBbEIsS0FBNkIsQ0FBaEQ7QUFDQSxnQkFBSTZSLEdBQUosRUFBUztBQUNQO0FBQ0E7QUFDQSxrQkFBSWxLLFlBQVlqTSxLQUFaLEtBQXNCLEtBQXRCLElBQStCaU0sWUFBWWpNLEtBQVosS0FBc0IsV0FBekQsRUFBc0U7QUFDcEVpTSw0QkFBWWpNLEtBQVosR0FBb0IsV0FBcEI7QUFDRDtBQUNGLGFBTkQsTUFNTztBQUNMLGtCQUFJaU0sWUFBWWpNLEtBQVosS0FBc0IsS0FBMUIsRUFBaUM7QUFDL0JpTSw0QkFBWWpNLEtBQVosR0FBb0IsV0FBcEI7QUFDRDtBQUNEO0FBQ0F5VyxtQkFBS0MsU0FBTCxHQUFpQixDQUFqQjtBQUNBO0FBQ0FELG1CQUFLRSxLQUFMLEdBQWExSyxZQUFZQyxrQkFBWixHQUFpQzBLLGdCQUE5Qzs7QUFFQSxrQkFBSUMsc0JBQXNCbkwsU0FBU29MLGNBQVQsQ0FBd0JMLElBQXhCLENBQTFCO0FBQ0E5VCxvQkFBTTJELFNBQU4sR0FBa0IsU0FBYzNELE1BQU0yRCxTQUFwQixFQUNkb0YsU0FBU3FMLGNBQVQsQ0FBd0JGLG1CQUF4QixDQURjLENBQWxCOztBQUdBbFUsb0JBQU0yRCxTQUFOLENBQWdCQSxTQUFoQixHQUE0QnVRLG1CQUE1QjtBQUNBbFUsb0JBQU0yRCxTQUFOLENBQWdCMFEsTUFBaEIsR0FBeUIsWUFBVztBQUNsQyx1QkFBTztBQUNMMVEsNkJBQVczRCxNQUFNMkQsU0FBTixDQUFnQkEsU0FEdEI7QUFFTGtRLDBCQUFRN1QsTUFBTTJELFNBQU4sQ0FBZ0JrUSxNQUZuQjtBQUdMWCxpQ0FBZWxULE1BQU0yRCxTQUFOLENBQWdCdVAsYUFIMUI7QUFJTGUsb0NBQWtCalUsTUFBTTJELFNBQU4sQ0FBZ0JzUTtBQUo3QixpQkFBUDtBQU1ELGVBUEQ7QUFRRDs7QUFFRDtBQUNBLGdCQUFJSyxXQUFXdkwsU0FBU3dMLGdCQUFULENBQTBCeEYsR0FBRzlMLGdCQUFILENBQW9CVixHQUE5QyxDQUFmO0FBQ0EsZ0JBQUksQ0FBQ2lSLEdBQUwsRUFBVTtBQUNSYyx1QkFBU3RVLE1BQU0yRCxTQUFOLENBQWdCdVAsYUFBekIsS0FDSSxPQUFPbFQsTUFBTTJELFNBQU4sQ0FBZ0JBLFNBQXZCLEdBQW1DLE1BRHZDO0FBRUQsYUFIRCxNQUdPO0FBQ0wyUSx1QkFBU3RVLE1BQU0yRCxTQUFOLENBQWdCdVAsYUFBekIsS0FDSSx5QkFESjtBQUVEO0FBQ0RuRSxlQUFHOUwsZ0JBQUgsQ0FBb0JWLEdBQXBCLEdBQ0l3RyxTQUFTeUwsY0FBVCxDQUF3QnpGLEdBQUc5TCxnQkFBSCxDQUFvQlYsR0FBNUMsSUFDQStSLFNBQVNHLElBQVQsQ0FBYyxFQUFkLENBRko7QUFHQSxnQkFBSUMsV0FBVzNGLEdBQUd5QixZQUFILENBQWdCbUUsS0FBaEIsQ0FBc0IsVUFBUzFMLFdBQVQsRUFBc0I7QUFDekQscUJBQU9BLFlBQVlLLFdBQVosSUFDSEwsWUFBWUssV0FBWixDQUF3QmpNLEtBQXhCLEtBQWtDLFdBRHRDO0FBRUQsYUFIYyxDQUFmOztBQUtBLGdCQUFJMFIsR0FBR2dCLGlCQUFILEtBQXlCLFdBQTdCLEVBQTBDO0FBQ3hDaEIsaUJBQUdnQixpQkFBSCxHQUF1QixXQUF2QjtBQUNBaEIsaUJBQUdzQyx5QkFBSDtBQUNEOztBQUVEO0FBQ0E7QUFDQSxnQkFBSSxDQUFDbUMsR0FBTCxFQUFVO0FBQ1J6RSxpQkFBR0ksY0FBSCxDQUFrQixjQUFsQixFQUFrQ25QLEtBQWxDO0FBQ0Q7QUFDRCxnQkFBSTBVLFFBQUosRUFBYztBQUNaM0YsaUJBQUdJLGNBQUgsQ0FBa0IsY0FBbEIsRUFBa0MsSUFBSUQsS0FBSixDQUFVLGNBQVYsQ0FBbEM7QUFDQUgsaUJBQUdnQixpQkFBSCxHQUF1QixVQUF2QjtBQUNBaEIsaUJBQUdzQyx5QkFBSDtBQUNEO0FBQ0YsV0EzRUQ7O0FBNkVBO0FBQ0F2UixpQkFBT2lCLFVBQVAsQ0FBa0IsWUFBVztBQUMzQnVTLG9DQUF3QmxTLE9BQXhCLENBQWdDLFVBQVNzQyxDQUFULEVBQVk7QUFDMUM0RiwwQkFBWW9LLGdCQUFaLENBQTZCaFEsQ0FBN0I7QUFDRCxhQUZEO0FBR0QsV0FKRCxFQUlHLENBSkg7QUFLRCxTQTlGRDs7QUFnR0E7QUFDQWhCLDBCQUFrQm9PLFNBQWxCLENBQTRCa0IsMkJBQTVCLEdBQTBELFlBQVc7QUFDbkUsY0FBSWpELEtBQUssSUFBVDtBQUNBLGNBQUl6QixlQUFlLElBQUl4TixPQUFPOFUsZUFBWCxDQUEyQixJQUEzQixDQUFuQjtBQUNBdEgsdUJBQWF1SCxnQkFBYixHQUFnQyxZQUFXO0FBQ3pDOUYsZUFBRytGLHlCQUFIO0FBQ0EvRixlQUFHZ0csc0JBQUg7QUFDRCxXQUhEOztBQUtBLGNBQUl0TCxnQkFBZ0IsSUFBSTNKLE9BQU9rVixnQkFBWCxDQUE0QjFILFlBQTVCLENBQXBCO0FBQ0E3RCx3QkFBY3dMLGlCQUFkLEdBQWtDLFlBQVc7QUFDM0NsRyxlQUFHZ0csc0JBQUg7QUFDRCxXQUZEO0FBR0F0TCx3QkFBY2pDLE9BQWQsR0FBd0IsWUFBVztBQUNqQztBQUNBWCxtQkFBT3NNLGNBQVAsQ0FBc0IxSixhQUF0QixFQUFxQyxPQUFyQyxFQUNJLEVBQUMySixPQUFPLFFBQVIsRUFBa0JDLFVBQVUsSUFBNUIsRUFESjtBQUVBdEUsZUFBR2dHLHNCQUFIO0FBQ0QsV0FMRDs7QUFPQSxpQkFBTztBQUNMekgsMEJBQWNBLFlBRFQ7QUFFTDdELDJCQUFlQTtBQUZWLFdBQVA7QUFJRCxTQXZCRDs7QUF5QkE7QUFDQTtBQUNBL0csMEJBQWtCb08sU0FBbEIsQ0FBNEJvRSw0QkFBNUIsR0FBMkQsVUFDdkRoQyxhQUR1RCxFQUN4QztBQUNqQixjQUFJNUosY0FBYyxLQUFLa0gsWUFBTCxDQUFrQjBDLGFBQWxCLEVBQWlDNUosV0FBbkQ7QUFDQSxjQUFJQSxXQUFKLEVBQWlCO0FBQ2YsbUJBQU9BLFlBQVlvSyxnQkFBbkI7QUFDQSxtQkFBTyxLQUFLbEQsWUFBTCxDQUFrQjBDLGFBQWxCLEVBQWlDNUosV0FBeEM7QUFDRDtBQUNELGNBQUlnRSxlQUFlLEtBQUtrRCxZQUFMLENBQWtCMEMsYUFBbEIsRUFBaUM1RixZQUFwRDtBQUNBLGNBQUlBLFlBQUosRUFBa0I7QUFDaEIsbUJBQU9BLGFBQWF1SCxnQkFBcEI7QUFDQSxtQkFBTyxLQUFLckUsWUFBTCxDQUFrQjBDLGFBQWxCLEVBQWlDNUYsWUFBeEM7QUFDRDtBQUNELGNBQUk3RCxnQkFBZ0IsS0FBSytHLFlBQUwsQ0FBa0IwQyxhQUFsQixFQUFpQ3pKLGFBQXJEO0FBQ0EsY0FBSUEsYUFBSixFQUFtQjtBQUNqQixtQkFBT0EsY0FBY3dMLGlCQUFyQjtBQUNBLG1CQUFPeEwsY0FBY2pDLE9BQXJCO0FBQ0EsbUJBQU8sS0FBS2dKLFlBQUwsQ0FBa0IwQyxhQUFsQixFQUFpQ3pKLGFBQXhDO0FBQ0Q7QUFDRixTQWxCRDs7QUFvQkE7QUFDQS9HLDBCQUFrQm9PLFNBQWxCLENBQTRCcUUsV0FBNUIsR0FBMEMsVUFBU2xNLFdBQVQsRUFDdENwQixJQURzQyxFQUNoQ3VOLElBRGdDLEVBQzFCO0FBQ2QsY0FBSUMsU0FBU3JLLHNCQUFzQi9CLFlBQVlnQyxpQkFBbEMsRUFDVGhDLFlBQVlpQyxrQkFESCxDQUFiO0FBRUEsY0FBSXJELFFBQVFvQixZQUFZVSxTQUF4QixFQUFtQztBQUNqQzBMLG1CQUFPQyxTQUFQLEdBQW1Cck0sWUFBWWdCLHNCQUEvQjtBQUNBb0wsbUJBQU9FLElBQVAsR0FBYztBQUNaQyxxQkFBT3pNLFNBQVNxQixVQURKO0FBRVpxTCx3QkFBVXhNLFlBQVl5TSxjQUFaLENBQTJCRDtBQUZ6QixhQUFkO0FBSUEsZ0JBQUl4TSxZQUFZMkksc0JBQVosQ0FBbUNqUSxNQUF2QyxFQUErQztBQUM3QzBULHFCQUFPRSxJQUFQLENBQVlyTCxJQUFaLEdBQW1CakIsWUFBWTJJLHNCQUFaLENBQW1DLENBQW5DLEVBQXNDMUgsSUFBekQ7QUFDRDtBQUNEakIsd0JBQVlVLFNBQVosQ0FBc0I5QixJQUF0QixDQUEyQndOLE1BQTNCO0FBQ0Q7QUFDRCxjQUFJRCxRQUFRbk0sWUFBWVcsV0FBcEIsSUFBbUN5TCxPQUFPakssTUFBUCxDQUFjekosTUFBZCxHQUF1QixDQUE5RCxFQUFpRTtBQUMvRDtBQUNBLGdCQUFJc0gsWUFBWTVILElBQVosS0FBcUIsT0FBckIsSUFDRzRILFlBQVkySSxzQkFEZixJQUVHdEgsY0FBYyxLQUZyQixFQUU0QjtBQUMxQnJCLDBCQUFZMkksc0JBQVosQ0FBbUN4USxPQUFuQyxDQUEyQyxVQUFTdVUsQ0FBVCxFQUFZO0FBQ3JELHVCQUFPQSxFQUFFeEwsR0FBVDtBQUNELGVBRkQ7QUFHRDtBQUNELGdCQUFJbEIsWUFBWTJJLHNCQUFaLENBQW1DalEsTUFBdkMsRUFBK0M7QUFDN0MwVCxxQkFBT0MsU0FBUCxHQUFtQnJNLFlBQVkySSxzQkFBL0I7QUFDRCxhQUZELE1BRU87QUFDTHlELHFCQUFPQyxTQUFQLEdBQW1CLENBQUMsRUFBRCxDQUFuQjtBQUNEO0FBQ0RELG1CQUFPRSxJQUFQLEdBQWM7QUFDWkUsd0JBQVV4TSxZQUFZeU0sY0FBWixDQUEyQkQ7QUFEekIsYUFBZDtBQUdBLGdCQUFJeE0sWUFBWXlNLGNBQVosQ0FBMkJGLEtBQS9CLEVBQXNDO0FBQ3BDSCxxQkFBT0UsSUFBUCxDQUFZQyxLQUFaLEdBQW9Cdk0sWUFBWXlNLGNBQVosQ0FBMkJGLEtBQS9DO0FBQ0Q7QUFDRCxnQkFBSXZNLFlBQVlnQixzQkFBWixDQUFtQ3RJLE1BQXZDLEVBQStDO0FBQzdDMFQscUJBQU9FLElBQVAsQ0FBWXJMLElBQVosR0FBbUJqQixZQUFZZ0Isc0JBQVosQ0FBbUMsQ0FBbkMsRUFBc0NDLElBQXpEO0FBQ0Q7QUFDRGpCLHdCQUFZVyxXQUFaLENBQXdCZ00sT0FBeEIsQ0FBZ0NQLE1BQWhDO0FBQ0Q7QUFDRixTQXhDRDs7QUEwQ0EzUywwQkFBa0JvTyxTQUFsQixDQUE0Qi9OLG1CQUE1QixHQUFrRCxVQUFTa0wsV0FBVCxFQUFzQjtBQUN0RSxjQUFJYyxLQUFLLElBQVQ7O0FBRUE7QUFDQSxjQUFJLENBQUMsT0FBRCxFQUFVLFFBQVYsRUFBb0JoRSxPQUFwQixDQUE0QmtELFlBQVlsUSxJQUF4QyxNQUFrRCxDQUFDLENBQXZELEVBQTBEO0FBQ3hELG1CQUFPd0gsUUFBUUMsTUFBUixDQUFld0ksVUFBVSxXQUFWLEVBQ2xCLHVCQUF1QkMsWUFBWWxRLElBQW5DLEdBQTBDLEdBRHhCLENBQWYsQ0FBUDtBQUVEOztBQUVELGNBQUksQ0FBQ2lQLGdDQUFnQyxxQkFBaEMsRUFDRGlCLFlBQVlsUSxJQURYLEVBQ2lCZ1IsR0FBRzdCLGNBRHBCLENBQUQsSUFDd0M2QixHQUFHOEIsU0FEL0MsRUFDMEQ7QUFDeEQsbUJBQU90TCxRQUFRQyxNQUFSLENBQWV3SSxVQUFVLG1CQUFWLEVBQ2xCLHVCQUF1QkMsWUFBWWxRLElBQW5DLEdBQ0EsWUFEQSxHQUNlZ1IsR0FBRzdCLGNBRkEsQ0FBZixDQUFQO0FBR0Q7O0FBRUQsY0FBSW9ILFFBQUo7QUFDQSxjQUFJdUIsV0FBSjtBQUNBLGNBQUk1SCxZQUFZbFEsSUFBWixLQUFxQixPQUF6QixFQUFrQztBQUNoQztBQUNBO0FBQ0F1Vyx1QkFBV3ZMLFNBQVMrTSxhQUFULENBQXVCN0gsWUFBWTFMLEdBQW5DLENBQVg7QUFDQXNULDBCQUFjdkIsU0FBUzFTLEtBQVQsRUFBZDtBQUNBMFMscUJBQVNsVCxPQUFULENBQWlCLFVBQVMyVSxZQUFULEVBQXVCN0MsYUFBdkIsRUFBc0M7QUFDckQsa0JBQUloSyxPQUFPSCxTQUFTaU4sa0JBQVQsQ0FBNEJELFlBQTVCLENBQVg7QUFDQWhILGlCQUFHeUIsWUFBSCxDQUFnQjBDLGFBQWhCLEVBQStCakksaUJBQS9CLEdBQW1EL0IsSUFBbkQ7QUFDRCxhQUhEOztBQUtBNkYsZUFBR3lCLFlBQUgsQ0FBZ0JwUCxPQUFoQixDQUF3QixVQUFTNkgsV0FBVCxFQUFzQmlLLGFBQXRCLEVBQXFDO0FBQzNEbkUsaUJBQUcwRSxPQUFILENBQVd4SyxZQUFZUyxHQUF2QixFQUE0QndKLGFBQTVCO0FBQ0QsYUFGRDtBQUdELFdBYkQsTUFhTyxJQUFJakYsWUFBWWxRLElBQVosS0FBcUIsUUFBekIsRUFBbUM7QUFDeEN1Vyx1QkFBV3ZMLFNBQVMrTSxhQUFULENBQXVCL0csR0FBR2UsaUJBQUgsQ0FBcUJ2TixHQUE1QyxDQUFYO0FBQ0FzVCwwQkFBY3ZCLFNBQVMxUyxLQUFULEVBQWQ7QUFDQSxnQkFBSXFVLFlBQVlsTixTQUFTbU4sV0FBVCxDQUFxQkwsV0FBckIsRUFDWixZQURZLEVBQ0VsVSxNQURGLEdBQ1csQ0FEM0I7QUFFQTJTLHFCQUFTbFQsT0FBVCxDQUFpQixVQUFTMlUsWUFBVCxFQUF1QjdDLGFBQXZCLEVBQXNDO0FBQ3JELGtCQUFJakssY0FBYzhGLEdBQUd5QixZQUFILENBQWdCMEMsYUFBaEIsQ0FBbEI7QUFDQSxrQkFBSTVKLGNBQWNMLFlBQVlLLFdBQTlCO0FBQ0Esa0JBQUlnRSxlQUFlckUsWUFBWXFFLFlBQS9CO0FBQ0Esa0JBQUk3RCxnQkFBZ0JSLFlBQVlRLGFBQWhDO0FBQ0Esa0JBQUl3QixvQkFBb0JoQyxZQUFZZ0MsaUJBQXBDO0FBQ0Esa0JBQUlDLHFCQUFxQmpDLFlBQVlpQyxrQkFBckM7O0FBRUE7QUFDQSxrQkFBSWlMLFdBQVdwTixTQUFTcU4sVUFBVCxDQUFvQkwsWUFBcEIsS0FDWGhOLFNBQVNtTixXQUFULENBQXFCSCxZQUFyQixFQUFtQyxlQUFuQyxFQUFvRHBVLE1BQXBELEtBQStELENBRG5FOztBQUdBLGtCQUFJLENBQUN3VSxRQUFELElBQWEsQ0FBQ2xOLFlBQVlrTixRQUE5QixFQUF3QztBQUN0QyxvQkFBSUUsc0JBQXNCdE4sU0FBU3VOLGdCQUFULENBQ3RCUCxZQURzQixFQUNSRixXQURRLENBQTFCO0FBRUEsb0JBQUlVLHVCQUF1QnhOLFNBQVN5TixpQkFBVCxDQUN2QlQsWUFEdUIsRUFDVEYsV0FEUyxDQUEzQjtBQUVBLG9CQUFJSSxTQUFKLEVBQWU7QUFDYk0sdUNBQXFCRSxJQUFyQixHQUE0QixRQUE1QjtBQUNEOztBQUVELG9CQUFJLENBQUMxSCxHQUFHaUIsV0FBSixJQUFtQmtELGtCQUFrQixDQUF6QyxFQUE0QztBQUMxQ25FLHFCQUFHMEUsT0FBSCxDQUFXeEssWUFBWVMsR0FBdkIsRUFBNEJ3SixhQUE1QjtBQUNBLHNCQUFJNUYsYUFBYWpRLEtBQWIsS0FBdUIsS0FBM0IsRUFBa0M7QUFDaENpUSxpQ0FBYW9KLEtBQWIsQ0FBbUJwTixXQUFuQixFQUFnQytNLG1CQUFoQyxFQUNJSixZQUFZLGFBQVosR0FBNEIsWUFEaEM7QUFFRDtBQUNELHNCQUFJeE0sY0FBY3BNLEtBQWQsS0FBd0IsS0FBNUIsRUFBbUM7QUFDakNvTSxrQ0FBY2lOLEtBQWQsQ0FBb0JILG9CQUFwQjtBQUNEO0FBQ0Y7O0FBRUQ7QUFDQSxvQkFBSWxCLFNBQVNySyxzQkFBc0JDLGlCQUF0QixFQUNUQyxrQkFEUyxDQUFiOztBQUdBO0FBQ0E7QUFDQTZELG1CQUFHb0csV0FBSCxDQUFlbE0sV0FBZixFQUNJb00sT0FBT2pLLE1BQVAsQ0FBY3pKLE1BQWQsR0FBdUIsQ0FEM0IsRUFFSSxLQUZKO0FBR0Q7QUFDRixhQTFDRDtBQTJDRDs7QUFFRG9OLGFBQUc5TCxnQkFBSCxHQUFzQjtBQUNwQmxGLGtCQUFNa1EsWUFBWWxRLElBREU7QUFFcEJ3RSxpQkFBSzBMLFlBQVkxTDtBQUZHLFdBQXRCO0FBSUEsY0FBSTBMLFlBQVlsUSxJQUFaLEtBQXFCLE9BQXpCLEVBQWtDO0FBQ2hDZ1IsZUFBRzRILHFCQUFILENBQXlCLGtCQUF6QjtBQUNELFdBRkQsTUFFTztBQUNMNUgsZUFBRzRILHFCQUFILENBQXlCLFFBQXpCO0FBQ0Q7O0FBRUQsaUJBQU9wUixRQUFROUMsT0FBUixFQUFQO0FBQ0QsU0E1RkQ7O0FBOEZBQywwQkFBa0JvTyxTQUFsQixDQUE0Qm5PLG9CQUE1QixHQUFtRCxVQUFTc0wsV0FBVCxFQUFzQjtBQUN2RSxjQUFJYyxLQUFLLElBQVQ7O0FBRUE7QUFDQSxjQUFJLENBQUMsT0FBRCxFQUFVLFFBQVYsRUFBb0JoRSxPQUFwQixDQUE0QmtELFlBQVlsUSxJQUF4QyxNQUFrRCxDQUFDLENBQXZELEVBQTBEO0FBQ3hELG1CQUFPd0gsUUFBUUMsTUFBUixDQUFld0ksVUFBVSxXQUFWLEVBQ2xCLHVCQUF1QkMsWUFBWWxRLElBQW5DLEdBQTBDLEdBRHhCLENBQWYsQ0FBUDtBQUVEOztBQUVELGNBQUksQ0FBQ2lQLGdDQUFnQyxzQkFBaEMsRUFDRGlCLFlBQVlsUSxJQURYLEVBQ2lCZ1IsR0FBRzdCLGNBRHBCLENBQUQsSUFDd0M2QixHQUFHOEIsU0FEL0MsRUFDMEQ7QUFDeEQsbUJBQU90TCxRQUFRQyxNQUFSLENBQWV3SSxVQUFVLG1CQUFWLEVBQ2xCLHdCQUF3QkMsWUFBWWxRLElBQXBDLEdBQ0EsWUFEQSxHQUNlZ1IsR0FBRzdCLGNBRkEsQ0FBZixDQUFQO0FBR0Q7O0FBRUQsY0FBSWhKLFVBQVUsRUFBZDtBQUNBNkssYUFBR2MsYUFBSCxDQUFpQnpPLE9BQWpCLENBQXlCLFVBQVNoRCxNQUFULEVBQWlCO0FBQ3hDOEYsb0JBQVE5RixPQUFPK0IsRUFBZixJQUFxQi9CLE1BQXJCO0FBQ0QsV0FGRDtBQUdBLGNBQUl3WSxlQUFlLEVBQW5CO0FBQ0EsY0FBSXRDLFdBQVd2TCxTQUFTK00sYUFBVCxDQUF1QjdILFlBQVkxTCxHQUFuQyxDQUFmO0FBQ0EsY0FBSXNULGNBQWN2QixTQUFTMVMsS0FBVCxFQUFsQjtBQUNBLGNBQUlxVSxZQUFZbE4sU0FBU21OLFdBQVQsQ0FBcUJMLFdBQXJCLEVBQ1osWUFEWSxFQUNFbFUsTUFERixHQUNXLENBRDNCO0FBRUEsY0FBSXFPLGNBQWNqSCxTQUFTbU4sV0FBVCxDQUFxQkwsV0FBckIsRUFDZCxpQkFEYyxFQUNLbFUsTUFETCxHQUNjLENBRGhDO0FBRUFvTixhQUFHaUIsV0FBSCxHQUFpQkEsV0FBakI7QUFDQSxjQUFJNkcsYUFBYTlOLFNBQVNtTixXQUFULENBQXFCTCxXQUFyQixFQUNiLGdCQURhLEVBQ0ssQ0FETCxDQUFqQjtBQUVBLGNBQUlnQixVQUFKLEVBQWdCO0FBQ2Q5SCxlQUFHVyx1QkFBSCxHQUE2Qm1ILFdBQVdDLE1BQVgsQ0FBa0IsRUFBbEIsRUFBc0JDLEtBQXRCLENBQTRCLEdBQTVCLEVBQ3hCaE0sT0FEd0IsQ0FDaEIsU0FEZ0IsS0FDRixDQUQzQjtBQUVELFdBSEQsTUFHTztBQUNMZ0UsZUFBR1csdUJBQUgsR0FBNkIsS0FBN0I7QUFDRDs7QUFFRDRFLG1CQUFTbFQsT0FBVCxDQUFpQixVQUFTMlUsWUFBVCxFQUF1QjdDLGFBQXZCLEVBQXNDO0FBQ3JELGdCQUFJOEQsUUFBUWpPLFNBQVNrTyxVQUFULENBQW9CbEIsWUFBcEIsQ0FBWjtBQUNBLGdCQUFJMVUsT0FBTzBILFNBQVNtTyxPQUFULENBQWlCbkIsWUFBakIsQ0FBWDtBQUNBO0FBQ0EsZ0JBQUlJLFdBQVdwTixTQUFTcU4sVUFBVCxDQUFvQkwsWUFBcEIsS0FDWGhOLFNBQVNtTixXQUFULENBQXFCSCxZQUFyQixFQUFtQyxlQUFuQyxFQUFvRHBVLE1BQXBELEtBQStELENBRG5FO0FBRUEsZ0JBQUltTSxXQUFXa0osTUFBTSxDQUFOLEVBQVNGLE1BQVQsQ0FBZ0IsQ0FBaEIsRUFBbUJDLEtBQW5CLENBQXlCLEdBQXpCLEVBQThCLENBQTlCLENBQWY7O0FBRUEsZ0JBQUlJLFlBQVlwTyxTQUFTcU8sWUFBVCxDQUFzQnJCLFlBQXRCLEVBQW9DRixXQUFwQyxDQUFoQjtBQUNBLGdCQUFJd0IsYUFBYXRPLFNBQVN1TyxTQUFULENBQW1CdkIsWUFBbkIsQ0FBakI7O0FBRUEsZ0JBQUlyTSxNQUFNWCxTQUFTd08sTUFBVCxDQUFnQnhCLFlBQWhCLEtBQWlDaE4sU0FBU3lPLGtCQUFULEVBQTNDOztBQUVBO0FBQ0EsZ0JBQUtuVyxTQUFTLGFBQVQsSUFBMEJ5TSxhQUFhLFdBQXhDLElBQXdEcUksUUFBNUQsRUFBc0U7QUFDcEU7QUFDQTtBQUNBcEgsaUJBQUd5QixZQUFILENBQWdCMEMsYUFBaEIsSUFBaUM7QUFDL0J4SixxQkFBS0EsR0FEMEI7QUFFL0JySSxzQkFBTUEsSUFGeUI7QUFHL0I4VSwwQkFBVTtBQUhxQixlQUFqQztBQUtBO0FBQ0Q7O0FBRUQsZ0JBQUksQ0FBQ0EsUUFBRCxJQUFhcEgsR0FBR3lCLFlBQUgsQ0FBZ0IwQyxhQUFoQixDQUFiLElBQ0FuRSxHQUFHeUIsWUFBSCxDQUFnQjBDLGFBQWhCLEVBQStCaUQsUUFEbkMsRUFDNkM7QUFDM0M7QUFDQXBILGlCQUFHeUIsWUFBSCxDQUFnQjBDLGFBQWhCLElBQWlDbkUsR0FBRzBDLGtCQUFILENBQXNCcFEsSUFBdEIsRUFBNEIsSUFBNUIsQ0FBakM7QUFDRDs7QUFFRCxnQkFBSTRILFdBQUo7QUFDQSxnQkFBSUssV0FBSjtBQUNBLGdCQUFJZ0UsWUFBSjtBQUNBLGdCQUFJN0QsYUFBSjtBQUNBLGdCQUFJRyxXQUFKO0FBQ0EsZ0JBQUlLLHNCQUFKO0FBQ0EsZ0JBQUkySCxzQkFBSjtBQUNBLGdCQUFJM0csaUJBQUo7O0FBRUEsZ0JBQUlsQixLQUFKO0FBQ0E7QUFDQSxnQkFBSW1CLHFCQUFxQm5DLFNBQVNpTixrQkFBVCxDQUE0QkQsWUFBNUIsQ0FBekI7QUFDQSxnQkFBSU0sbUJBQUo7QUFDQSxnQkFBSUUsb0JBQUo7QUFDQSxnQkFBSSxDQUFDSixRQUFMLEVBQWU7QUFDYkUsb0NBQXNCdE4sU0FBU3VOLGdCQUFULENBQTBCUCxZQUExQixFQUNsQkYsV0FEa0IsQ0FBdEI7QUFFQVUscUNBQXVCeE4sU0FBU3lOLGlCQUFULENBQTJCVCxZQUEzQixFQUNuQkYsV0FEbUIsQ0FBdkI7QUFFQVUsbUNBQXFCRSxJQUFyQixHQUE0QixRQUE1QjtBQUNEO0FBQ0Q3RSxxQ0FDSTdJLFNBQVMwTywwQkFBVCxDQUFvQzFCLFlBQXBDLENBREo7O0FBR0EsZ0JBQUlMLGlCQUFpQjNNLFNBQVMyTyxtQkFBVCxDQUE2QjNCLFlBQTdCLENBQXJCOztBQUVBLGdCQUFJNEIsYUFBYTVPLFNBQVNtTixXQUFULENBQXFCSCxZQUFyQixFQUNiLHFCQURhLEVBQ1VGLFdBRFYsRUFDdUJsVSxNQUR2QixHQUNnQyxDQURqRDtBQUVBLGdCQUFJaVcsUUFBUTdPLFNBQVNtTixXQUFULENBQXFCSCxZQUFyQixFQUFtQyxjQUFuQyxFQUNQbkQsR0FETyxDQUNILFVBQVNrQixJQUFULEVBQWU7QUFDbEIscUJBQU8vSyxTQUFTcUwsY0FBVCxDQUF3Qk4sSUFBeEIsQ0FBUDtBQUNELGFBSE8sRUFJUHRKLE1BSk8sQ0FJQSxVQUFTc0osSUFBVCxFQUFlO0FBQ3JCLHFCQUFPQSxLQUFLQyxTQUFMLEtBQW1CLENBQTFCO0FBQ0QsYUFOTyxDQUFaOztBQVFBO0FBQ0EsZ0JBQUksQ0FBQzlGLFlBQVlsUSxJQUFaLEtBQXFCLE9BQXJCLElBQWdDa1EsWUFBWWxRLElBQVosS0FBcUIsUUFBdEQsS0FDQSxDQUFDb1ksUUFERCxJQUNhbkcsV0FEYixJQUM0QmtELGdCQUFnQixDQUQ1QyxJQUVBbkUsR0FBR3lCLFlBQUgsQ0FBZ0IwQyxhQUFoQixDQUZKLEVBRW9DO0FBQ2xDbkUsaUJBQUdtRyw0QkFBSCxDQUFnQ2hDLGFBQWhDO0FBQ0FuRSxpQkFBR3lCLFlBQUgsQ0FBZ0IwQyxhQUFoQixFQUErQjVKLFdBQS9CLEdBQ0l5RixHQUFHeUIsWUFBSCxDQUFnQixDQUFoQixFQUFtQmxILFdBRHZCO0FBRUF5RixpQkFBR3lCLFlBQUgsQ0FBZ0IwQyxhQUFoQixFQUErQjVGLFlBQS9CLEdBQ0l5QixHQUFHeUIsWUFBSCxDQUFnQixDQUFoQixFQUFtQmxELFlBRHZCO0FBRUF5QixpQkFBR3lCLFlBQUgsQ0FBZ0IwQyxhQUFoQixFQUErQnpKLGFBQS9CLEdBQ0lzRixHQUFHeUIsWUFBSCxDQUFnQixDQUFoQixFQUFtQi9HLGFBRHZCO0FBRUEsa0JBQUlzRixHQUFHeUIsWUFBSCxDQUFnQjBDLGFBQWhCLEVBQStCdkosU0FBbkMsRUFBOEM7QUFDNUNvRixtQkFBR3lCLFlBQUgsQ0FBZ0IwQyxhQUFoQixFQUErQnZKLFNBQS9CLENBQXlDa08sWUFBekMsQ0FDSTlJLEdBQUd5QixZQUFILENBQWdCLENBQWhCLEVBQW1CL0csYUFEdkI7QUFFRDtBQUNELGtCQUFJc0YsR0FBR3lCLFlBQUgsQ0FBZ0IwQyxhQUFoQixFQUErQnRKLFdBQW5DLEVBQWdEO0FBQzlDbUYsbUJBQUd5QixZQUFILENBQWdCMEMsYUFBaEIsRUFBK0J0SixXQUEvQixDQUEyQ2lPLFlBQTNDLENBQ0k5SSxHQUFHeUIsWUFBSCxDQUFnQixDQUFoQixFQUFtQi9HLGFBRHZCO0FBRUQ7QUFDRjtBQUNELGdCQUFJd0UsWUFBWWxRLElBQVosS0FBcUIsT0FBckIsSUFBZ0MsQ0FBQ29ZLFFBQXJDLEVBQStDO0FBQzdDbE4sNEJBQWM4RixHQUFHeUIsWUFBSCxDQUFnQjBDLGFBQWhCLEtBQ1ZuRSxHQUFHMEMsa0JBQUgsQ0FBc0JwUSxJQUF0QixDQURKO0FBRUE0SCwwQkFBWVMsR0FBWixHQUFrQkEsR0FBbEI7O0FBRUEsa0JBQUksQ0FBQ1QsWUFBWUssV0FBakIsRUFBOEI7QUFDNUJMLDRCQUFZSyxXQUFaLEdBQTBCeUYsR0FBR2tFLGtCQUFILENBQXNCQyxhQUF0QixFQUN0QmxELFdBRHNCLENBQTFCO0FBRUQ7O0FBRUQsa0JBQUk0SCxNQUFNalcsTUFBTixJQUFnQnNILFlBQVlxRSxZQUFaLENBQXlCalEsS0FBekIsS0FBbUMsS0FBdkQsRUFBOEQ7QUFDNUQsb0JBQUlzYSxlQUFlLENBQUMzSCxXQUFELElBQWdCa0Qsa0JBQWtCLENBQWpELENBQUosRUFBeUQ7QUFDdkRqSyw4QkFBWXFFLFlBQVosQ0FBeUJ3SyxtQkFBekIsQ0FBNkNGLEtBQTdDO0FBQ0QsaUJBRkQsTUFFTztBQUNMQSx3QkFBTXhXLE9BQU4sQ0FBYyxVQUFTdUMsU0FBVCxFQUFvQjtBQUNoQzBKLHNDQUFrQnBFLFlBQVlxRSxZQUE5QixFQUE0QzNKLFNBQTVDO0FBQ0QsbUJBRkQ7QUFHRDtBQUNGOztBQUVEc0gsa0NBQW9CbkwsT0FBT2lZLGNBQVAsQ0FBc0JDLGVBQXRCLENBQXNDM1csSUFBdEMsQ0FBcEI7O0FBRUE7QUFDQTtBQUNBLGtCQUFJaUosY0FBYyxLQUFsQixFQUF5QjtBQUN2Qlcsa0NBQWtCRyxNQUFsQixHQUEyQkgsa0JBQWtCRyxNQUFsQixDQUF5QlosTUFBekIsQ0FDdkIsVUFBU3lOLEtBQVQsRUFBZ0I7QUFDZCx5QkFBT0EsTUFBTXBiLElBQU4sS0FBZSxLQUF0QjtBQUNELGlCQUhzQixDQUEzQjtBQUlEOztBQUVEb04sdUNBQXlCaEIsWUFBWWdCLHNCQUFaLElBQXNDLENBQUM7QUFDOURDLHNCQUFNLENBQUMsSUFBSWdKLGFBQUosR0FBb0IsQ0FBckIsSUFBMEI7QUFEOEIsZUFBRCxDQUEvRDs7QUFJQTtBQUNBLGtCQUFJZ0YsYUFBYSxLQUFqQjtBQUNBLGtCQUFJZixjQUFjLFVBQWQsSUFBNEJBLGNBQWMsVUFBOUMsRUFBMEQ7QUFDeERlLDZCQUFhLENBQUNqUCxZQUFZVyxXQUExQjtBQUNBQSw4QkFBY1gsWUFBWVcsV0FBWixJQUNWLElBQUk5SixPQUFPaVksY0FBWCxDQUEwQjlPLFlBQVlRLGFBQXRDLEVBQXFEcEksSUFBckQsQ0FESjs7QUFHQSxvQkFBSTZXLFVBQUosRUFBZ0I7QUFDZCxzQkFBSTlaLE1BQUo7QUFDQTJMLDBCQUFRSCxZQUFZRyxLQUFwQjtBQUNBO0FBQ0Esc0JBQUlzTixjQUFjQSxXQUFXalosTUFBWCxLQUFzQixHQUF4QyxFQUE2QztBQUMzQztBQUNELG1CQUZELE1BRU8sSUFBSWlaLFVBQUosRUFBZ0I7QUFDckIsd0JBQUksQ0FBQ25ULFFBQVFtVCxXQUFXalosTUFBbkIsQ0FBTCxFQUFpQztBQUMvQjhGLDhCQUFRbVQsV0FBV2paLE1BQW5CLElBQTZCLElBQUkwQixPQUFPcVksV0FBWCxFQUE3QjtBQUNBdFIsNkJBQU9zTSxjQUFQLENBQXNCalAsUUFBUW1ULFdBQVdqWixNQUFuQixDQUF0QixFQUFrRCxJQUFsRCxFQUF3RDtBQUN0RGdhLDZCQUFLLGVBQVc7QUFDZCxpQ0FBT2YsV0FBV2paLE1BQWxCO0FBQ0Q7QUFIcUQsdUJBQXhEO0FBS0Q7QUFDRHlJLDJCQUFPc00sY0FBUCxDQUFzQnBKLEtBQXRCLEVBQTZCLElBQTdCLEVBQW1DO0FBQ2pDcU8sMkJBQUssZUFBVztBQUNkLCtCQUFPZixXQUFXdE4sS0FBbEI7QUFDRDtBQUhnQyxxQkFBbkM7QUFLQTNMLDZCQUFTOEYsUUFBUW1ULFdBQVdqWixNQUFuQixDQUFUO0FBQ0QsbUJBZk0sTUFlQTtBQUNMLHdCQUFJLENBQUM4RixrQkFBTCxFQUFzQjtBQUNwQkEsMkNBQWtCLElBQUlwRSxPQUFPcVksV0FBWCxFQUFsQjtBQUNEO0FBQ0QvWiw2QkFBUzhGLGtCQUFUO0FBQ0Q7QUFDRCxzQkFBSTlGLE1BQUosRUFBWTtBQUNWb1EsaURBQTZCekUsS0FBN0IsRUFBb0MzTCxNQUFwQztBQUNBNkssZ0NBQVk0SSw0QkFBWixDQUF5Q25RLElBQXpDLENBQThDdEQsTUFBOUM7QUFDRDtBQUNEd1ksK0JBQWFsVixJQUFiLENBQWtCLENBQUNxSSxLQUFELEVBQVFILFdBQVIsRUFBcUJ4TCxNQUFyQixDQUFsQjtBQUNEO0FBQ0YsZUF0Q0QsTUFzQ08sSUFBSTZLLFlBQVlXLFdBQVosSUFBMkJYLFlBQVlXLFdBQVosQ0FBd0JHLEtBQXZELEVBQThEO0FBQ25FZCw0QkFBWTRJLDRCQUFaLENBQXlDelEsT0FBekMsQ0FBaUQsVUFBU2tILENBQVQsRUFBWTtBQUMzRCxzQkFBSStQLGNBQWMvUCxFQUFFOEosU0FBRixHQUFjM0UsSUFBZCxDQUFtQixVQUFTdEYsQ0FBVCxFQUFZO0FBQy9DLDJCQUFPQSxFQUFFaEksRUFBRixLQUFTOEksWUFBWVcsV0FBWixDQUF3QkcsS0FBeEIsQ0FBOEI1SixFQUE5QztBQUNELG1CQUZpQixDQUFsQjtBQUdBLHNCQUFJa1ksV0FBSixFQUFpQjtBQUNmekosc0RBQWtDeUosV0FBbEMsRUFBK0MvUCxDQUEvQztBQUNEO0FBQ0YsaUJBUEQ7QUFRQVcsNEJBQVk0SSw0QkFBWixHQUEyQyxFQUEzQztBQUNEOztBQUVENUksMEJBQVlnQyxpQkFBWixHQUFnQ0EsaUJBQWhDO0FBQ0FoQywwQkFBWWlDLGtCQUFaLEdBQWlDQSxrQkFBakM7QUFDQWpDLDBCQUFZVyxXQUFaLEdBQTBCQSxXQUExQjtBQUNBWCwwQkFBWXlNLGNBQVosR0FBNkJBLGNBQTdCO0FBQ0F6TSwwQkFBWWdCLHNCQUFaLEdBQXFDQSxzQkFBckM7QUFDQWhCLDBCQUFZMkksc0JBQVosR0FBcUNBLHNCQUFyQzs7QUFFQTtBQUNBO0FBQ0E3QyxpQkFBR29HLFdBQUgsQ0FBZXBHLEdBQUd5QixZQUFILENBQWdCMEMsYUFBaEIsQ0FBZixFQUNJLEtBREosRUFFSWdGLFVBRko7QUFHRCxhQW5HRCxNQW1HTyxJQUFJakssWUFBWWxRLElBQVosS0FBcUIsUUFBckIsSUFBaUMsQ0FBQ29ZLFFBQXRDLEVBQWdEO0FBQ3JEbE4sNEJBQWM4RixHQUFHeUIsWUFBSCxDQUFnQjBDLGFBQWhCLENBQWQ7QUFDQTVKLDRCQUFjTCxZQUFZSyxXQUExQjtBQUNBZ0UsNkJBQWVyRSxZQUFZcUUsWUFBM0I7QUFDQTdELDhCQUFnQlIsWUFBWVEsYUFBNUI7QUFDQUcsNEJBQWNYLFlBQVlXLFdBQTFCO0FBQ0FLLHVDQUF5QmhCLFlBQVlnQixzQkFBckM7QUFDQWdCLGtDQUFvQmhDLFlBQVlnQyxpQkFBaEM7O0FBRUE4RCxpQkFBR3lCLFlBQUgsQ0FBZ0IwQyxhQUFoQixFQUErQnRCLHNCQUEvQixHQUNJQSxzQkFESjtBQUVBN0MsaUJBQUd5QixZQUFILENBQWdCMEMsYUFBaEIsRUFBK0JoSSxrQkFBL0IsR0FDSUEsa0JBREo7QUFFQTZELGlCQUFHeUIsWUFBSCxDQUFnQjBDLGFBQWhCLEVBQStCd0MsY0FBL0IsR0FBZ0RBLGNBQWhEOztBQUVBLGtCQUFJa0MsTUFBTWpXLE1BQU4sSUFBZ0IyTCxhQUFhalEsS0FBYixLQUF1QixLQUEzQyxFQUFrRDtBQUNoRCxvQkFBSSxDQUFDNFksYUFBYTBCLFVBQWQsTUFDQyxDQUFDM0gsV0FBRCxJQUFnQmtELGtCQUFrQixDQURuQyxDQUFKLEVBQzJDO0FBQ3pDNUYsK0JBQWF3SyxtQkFBYixDQUFpQ0YsS0FBakM7QUFDRCxpQkFIRCxNQUdPO0FBQ0xBLHdCQUFNeFcsT0FBTixDQUFjLFVBQVN1QyxTQUFULEVBQW9CO0FBQ2hDMEosc0NBQWtCcEUsWUFBWXFFLFlBQTlCLEVBQTRDM0osU0FBNUM7QUFDRCxtQkFGRDtBQUdEO0FBQ0Y7O0FBRUQsa0JBQUksQ0FBQ3FNLFdBQUQsSUFBZ0JrRCxrQkFBa0IsQ0FBdEMsRUFBeUM7QUFDdkMsb0JBQUk1RixhQUFhalEsS0FBYixLQUF1QixLQUEzQixFQUFrQztBQUNoQ2lRLCtCQUFhb0osS0FBYixDQUFtQnBOLFdBQW5CLEVBQWdDK00sbUJBQWhDLEVBQ0ksYUFESjtBQUVEO0FBQ0Qsb0JBQUk1TSxjQUFjcE0sS0FBZCxLQUF3QixLQUE1QixFQUFtQztBQUNqQ29NLGdDQUFjaU4sS0FBZCxDQUFvQkgsb0JBQXBCO0FBQ0Q7QUFDRjs7QUFFRHhILGlCQUFHb0csV0FBSCxDQUFlbE0sV0FBZixFQUNJa08sY0FBYyxVQUFkLElBQTRCQSxjQUFjLFVBRDlDLEVBRUlBLGNBQWMsVUFBZCxJQUE0QkEsY0FBYyxVQUY5Qzs7QUFJQTtBQUNBLGtCQUFJdk4sZ0JBQ0N1TixjQUFjLFVBQWQsSUFBNEJBLGNBQWMsVUFEM0MsQ0FBSixFQUM0RDtBQUMxRHBOLHdCQUFRSCxZQUFZRyxLQUFwQjtBQUNBLG9CQUFJc04sVUFBSixFQUFnQjtBQUNkLHNCQUFJLENBQUNuVCxRQUFRbVQsV0FBV2paLE1BQW5CLENBQUwsRUFBaUM7QUFDL0I4Riw0QkFBUW1ULFdBQVdqWixNQUFuQixJQUE2QixJQUFJMEIsT0FBT3FZLFdBQVgsRUFBN0I7QUFDRDtBQUNEM0osK0NBQTZCekUsS0FBN0IsRUFBb0M3RixRQUFRbVQsV0FBV2paLE1BQW5CLENBQXBDO0FBQ0F3WSwrQkFBYWxWLElBQWIsQ0FBa0IsQ0FBQ3FJLEtBQUQsRUFBUUgsV0FBUixFQUFxQjFGLFFBQVFtVCxXQUFXalosTUFBbkIsQ0FBckIsQ0FBbEI7QUFDRCxpQkFORCxNQU1PO0FBQ0wsc0JBQUksQ0FBQzhGLGtCQUFMLEVBQXNCO0FBQ3BCQSx5Q0FBa0IsSUFBSXBFLE9BQU9xWSxXQUFYLEVBQWxCO0FBQ0Q7QUFDRDNKLCtDQUE2QnpFLEtBQTdCLEVBQW9DN0Ysa0JBQXBDO0FBQ0EwUywrQkFBYWxWLElBQWIsQ0FBa0IsQ0FBQ3FJLEtBQUQsRUFBUUgsV0FBUixFQUFxQjFGLGtCQUFyQixDQUFsQjtBQUNEO0FBQ0YsZUFoQkQsTUFnQk87QUFDTDtBQUNBLHVCQUFPK0UsWUFBWVcsV0FBbkI7QUFDRDtBQUNGO0FBQ0YsV0F4UEQ7O0FBMFBBLGNBQUltRixHQUFHNkIsU0FBSCxLQUFpQnRDLFNBQXJCLEVBQWdDO0FBQzlCUyxlQUFHNkIsU0FBSCxHQUFlM0MsWUFBWWxRLElBQVosS0FBcUIsT0FBckIsR0FBK0IsUUFBL0IsR0FBMEMsU0FBekQ7QUFDRDs7QUFFRGdSLGFBQUdlLGlCQUFILEdBQXVCO0FBQ3JCL1Isa0JBQU1rUSxZQUFZbFEsSUFERztBQUVyQndFLGlCQUFLMEwsWUFBWTFMO0FBRkksV0FBdkI7QUFJQSxjQUFJMEwsWUFBWWxRLElBQVosS0FBcUIsT0FBekIsRUFBa0M7QUFDaENnUixlQUFHNEgscUJBQUgsQ0FBeUIsbUJBQXpCO0FBQ0QsV0FGRCxNQUVPO0FBQ0w1SCxlQUFHNEgscUJBQUgsQ0FBeUIsUUFBekI7QUFDRDtBQUNEOVAsaUJBQU9DLElBQVAsQ0FBWTVDLE9BQVosRUFBcUI5QyxPQUFyQixDQUE2QixVQUFTa1gsR0FBVCxFQUFjO0FBQ3pDLGdCQUFJbGEsU0FBUzhGLFFBQVFvVSxHQUFSLENBQWI7QUFDQSxnQkFBSWxhLE9BQU9nVSxTQUFQLEdBQW1CelEsTUFBdkIsRUFBK0I7QUFDN0Isa0JBQUlvTixHQUFHYyxhQUFILENBQWlCOUUsT0FBakIsQ0FBeUIzTSxNQUF6QixNQUFxQyxDQUFDLENBQTFDLEVBQTZDO0FBQzNDMlEsbUJBQUdjLGFBQUgsQ0FBaUJuTyxJQUFqQixDQUFzQnRELE1BQXRCO0FBQ0Esb0JBQUk0QixRQUFRLElBQUlrUCxLQUFKLENBQVUsV0FBVixDQUFaO0FBQ0FsUCxzQkFBTTVCLE1BQU4sR0FBZUEsTUFBZjtBQUNBMEIsdUJBQU9pQixVQUFQLENBQWtCLFlBQVc7QUFDM0JnTyxxQkFBR0ksY0FBSCxDQUFrQixXQUFsQixFQUErQm5QLEtBQS9CO0FBQ0QsaUJBRkQ7QUFHRDs7QUFFRDRXLDJCQUFheFYsT0FBYixDQUFxQixVQUFTbVgsSUFBVCxFQUFlO0FBQ2xDLG9CQUFJeE8sUUFBUXdPLEtBQUssQ0FBTCxDQUFaO0FBQ0Esb0JBQUl2SixXQUFXdUosS0FBSyxDQUFMLENBQWY7QUFDQSxvQkFBSW5hLE9BQU8rQixFQUFQLEtBQWNvWSxLQUFLLENBQUwsRUFBUXBZLEVBQTFCLEVBQThCO0FBQzVCO0FBQ0Q7QUFDRDJPLDZCQUFhQyxFQUFiLEVBQWlCaEYsS0FBakIsRUFBd0JpRixRQUF4QixFQUFrQyxDQUFDNVEsTUFBRCxDQUFsQztBQUNELGVBUEQ7QUFRRDtBQUNGLFdBckJEO0FBc0JBd1ksdUJBQWF4VixPQUFiLENBQXFCLFVBQVNtWCxJQUFULEVBQWU7QUFDbEMsZ0JBQUlBLEtBQUssQ0FBTCxDQUFKLEVBQWE7QUFDWDtBQUNEO0FBQ0R6Six5QkFBYUMsRUFBYixFQUFpQndKLEtBQUssQ0FBTCxDQUFqQixFQUEwQkEsS0FBSyxDQUFMLENBQTFCLEVBQW1DLEVBQW5DO0FBQ0QsV0FMRDs7QUFPQTtBQUNBO0FBQ0F6WSxpQkFBT2lCLFVBQVAsQ0FBa0IsWUFBVztBQUMzQixnQkFBSSxFQUFFZ08sTUFBTUEsR0FBR3lCLFlBQVgsQ0FBSixFQUE4QjtBQUM1QjtBQUNEO0FBQ0R6QixlQUFHeUIsWUFBSCxDQUFnQnBQLE9BQWhCLENBQXdCLFVBQVM2SCxXQUFULEVBQXNCO0FBQzVDLGtCQUFJQSxZQUFZcUUsWUFBWixJQUNBckUsWUFBWXFFLFlBQVosQ0FBeUJqUSxLQUF6QixLQUFtQyxLQURuQyxJQUVBNEwsWUFBWXFFLFlBQVosQ0FBeUJFLG1CQUF6QixHQUErQzdMLE1BQS9DLEdBQXdELENBRjVELEVBRStEO0FBQzdEZ0osd0JBQVFDLElBQVIsQ0FBYSxzREFDVCxtQ0FESjtBQUVBM0IsNEJBQVlxRSxZQUFaLENBQXlCUyxrQkFBekIsQ0FBNEMsRUFBNUM7QUFDRDtBQUNGLGFBUkQ7QUFTRCxXQWJELEVBYUcsSUFiSDs7QUFlQSxpQkFBT3hJLFFBQVE5QyxPQUFSLEVBQVA7QUFDRCxTQTNWRDs7QUE2VkFDLDBCQUFrQm9PLFNBQWxCLENBQTRCekosS0FBNUIsR0FBb0MsWUFBVztBQUM3QyxlQUFLbUosWUFBTCxDQUFrQnBQLE9BQWxCLENBQTBCLFVBQVM2SCxXQUFULEVBQXNCO0FBQzlDOzs7OztBQUtBLGdCQUFJQSxZQUFZcUUsWUFBaEIsRUFBOEI7QUFDNUJyRSwwQkFBWXFFLFlBQVosQ0FBeUJxRixJQUF6QjtBQUNEO0FBQ0QsZ0JBQUkxSixZQUFZUSxhQUFoQixFQUErQjtBQUM3QlIsMEJBQVlRLGFBQVosQ0FBMEJrSixJQUExQjtBQUNEO0FBQ0QsZ0JBQUkxSixZQUFZVSxTQUFoQixFQUEyQjtBQUN6QlYsMEJBQVlVLFNBQVosQ0FBc0JnSixJQUF0QjtBQUNEO0FBQ0QsZ0JBQUkxSixZQUFZVyxXQUFoQixFQUE2QjtBQUMzQlgsMEJBQVlXLFdBQVosQ0FBd0IrSSxJQUF4QjtBQUNEO0FBQ0YsV0FsQkQ7QUFtQkE7QUFDQSxlQUFLOUIsU0FBTCxHQUFpQixJQUFqQjtBQUNBLGVBQUs4RixxQkFBTCxDQUEyQixRQUEzQjtBQUNELFNBdkJEOztBQXlCQTtBQUNBalUsMEJBQWtCb08sU0FBbEIsQ0FBNEI2RixxQkFBNUIsR0FBb0QsVUFBUzZCLFFBQVQsRUFBbUI7QUFDckUsZUFBS3RMLGNBQUwsR0FBc0JzTCxRQUF0QjtBQUNBLGNBQUl4WSxRQUFRLElBQUlrUCxLQUFKLENBQVUsc0JBQVYsQ0FBWjtBQUNBLGVBQUtDLGNBQUwsQ0FBb0Isc0JBQXBCLEVBQTRDblAsS0FBNUM7QUFDRCxTQUpEOztBQU1BO0FBQ0EwQywwQkFBa0JvTyxTQUFsQixDQUE0Qm9CLDJCQUE1QixHQUEwRCxZQUFXO0FBQ25FLGNBQUluRCxLQUFLLElBQVQ7QUFDQSxjQUFJLEtBQUs3QixjQUFMLEtBQXdCLFFBQXhCLElBQW9DLEtBQUt5QyxlQUFMLEtBQXlCLElBQWpFLEVBQXVFO0FBQ3JFO0FBQ0Q7QUFDRCxlQUFLQSxlQUFMLEdBQXVCLElBQXZCO0FBQ0E3UCxpQkFBT2lCLFVBQVAsQ0FBa0IsWUFBVztBQUMzQixnQkFBSWdPLEdBQUdZLGVBQVAsRUFBd0I7QUFDdEJaLGlCQUFHWSxlQUFILEdBQXFCLEtBQXJCO0FBQ0Esa0JBQUkzUCxRQUFRLElBQUlrUCxLQUFKLENBQVUsbUJBQVYsQ0FBWjtBQUNBSCxpQkFBR0ksY0FBSCxDQUFrQixtQkFBbEIsRUFBdUNuUCxLQUF2QztBQUNEO0FBQ0YsV0FORCxFQU1HLENBTkg7QUFPRCxTQWJEOztBQWVBO0FBQ0EwQywwQkFBa0JvTyxTQUFsQixDQUE0QmdFLHlCQUE1QixHQUF3RCxZQUFXO0FBQ2pFLGNBQUkwRCxRQUFKO0FBQ0EsY0FBSUMsU0FBUztBQUNYLG1CQUFPLENBREk7QUFFWEMsb0JBQVEsQ0FGRztBQUdYQyxzQkFBVSxDQUhDO0FBSVhDLHVCQUFXLENBSkE7QUFLWEMsdUJBQVcsQ0FMQTtBQU1YQywwQkFBYyxDQU5IO0FBT1hDLG9CQUFRO0FBUEcsV0FBYjtBQVNBLGVBQUt2SSxZQUFMLENBQWtCcFAsT0FBbEIsQ0FBMEIsVUFBUzZILFdBQVQsRUFBc0I7QUFDOUN3UCxtQkFBT3hQLFlBQVlxRSxZQUFaLENBQXlCalEsS0FBaEM7QUFDRCxXQUZEOztBQUlBbWIscUJBQVcsS0FBWDtBQUNBLGNBQUlDLE9BQU9NLE1BQVAsR0FBZ0IsQ0FBcEIsRUFBdUI7QUFDckJQLHVCQUFXLFFBQVg7QUFDRCxXQUZELE1BRU8sSUFBSUMsT0FBT0UsUUFBUCxHQUFrQixDQUF0QixFQUF5QjtBQUM5QkgsdUJBQVcsVUFBWDtBQUNELFdBRk0sTUFFQSxJQUFJQyxPQUFPSyxZQUFQLEdBQXNCLENBQTFCLEVBQTZCO0FBQ2xDTix1QkFBVyxjQUFYO0FBQ0QsV0FGTSxNQUVBLElBQUlDLGdCQUFhLENBQWpCLEVBQW9CO0FBQ3pCRCx1QkFBVyxLQUFYO0FBQ0QsV0FGTSxNQUVBLElBQUlDLE9BQU9HLFNBQVAsR0FBbUIsQ0FBdkIsRUFBMEI7QUFDL0JKLHVCQUFXLFdBQVg7QUFDRCxXQUZNLE1BRUEsSUFBSUMsT0FBT0ksU0FBUCxHQUFtQixDQUF2QixFQUEwQjtBQUMvQkwsdUJBQVcsV0FBWDtBQUNEOztBQUVELGNBQUlBLGFBQWEsS0FBS3pVLGtCQUF0QixFQUEwQztBQUN4QyxpQkFBS0Esa0JBQUwsR0FBMEJ5VSxRQUExQjtBQUNBLGdCQUFJeFksUUFBUSxJQUFJa1AsS0FBSixDQUFVLDBCQUFWLENBQVo7QUFDQSxpQkFBS0MsY0FBTCxDQUFvQiwwQkFBcEIsRUFBZ0RuUCxLQUFoRDtBQUNEO0FBQ0YsU0FuQ0Q7O0FBcUNBO0FBQ0EwQywwQkFBa0JvTyxTQUFsQixDQUE0QmlFLHNCQUE1QixHQUFxRCxZQUFXO0FBQzlELGNBQUl5RCxRQUFKO0FBQ0EsY0FBSUMsU0FBUztBQUNYLG1CQUFPLENBREk7QUFFWEMsb0JBQVEsQ0FGRztBQUdYTSx3QkFBWSxDQUhEO0FBSVhKLHVCQUFXLENBSkE7QUFLWEMsdUJBQVcsQ0FMQTtBQU1YQywwQkFBYyxDQU5IO0FBT1hDLG9CQUFRO0FBUEcsV0FBYjtBQVNBLGVBQUt2SSxZQUFMLENBQWtCcFAsT0FBbEIsQ0FBMEIsVUFBUzZILFdBQVQsRUFBc0I7QUFDOUN3UCxtQkFBT3hQLFlBQVlxRSxZQUFaLENBQXlCalEsS0FBaEM7QUFDQW9iLG1CQUFPeFAsWUFBWVEsYUFBWixDQUEwQnBNLEtBQWpDO0FBQ0QsV0FIRDtBQUlBO0FBQ0FvYixpQkFBT0csU0FBUCxJQUFvQkgsT0FBT0ksU0FBM0I7O0FBRUFMLHFCQUFXLEtBQVg7QUFDQSxjQUFJQyxPQUFPTSxNQUFQLEdBQWdCLENBQXBCLEVBQXVCO0FBQ3JCUCx1QkFBVyxRQUFYO0FBQ0QsV0FGRCxNQUVPLElBQUlDLE9BQU9PLFVBQVAsR0FBb0IsQ0FBeEIsRUFBMkI7QUFDaENSLHVCQUFXLFlBQVg7QUFDRCxXQUZNLE1BRUEsSUFBSUMsT0FBT0ssWUFBUCxHQUFzQixDQUExQixFQUE2QjtBQUNsQ04sdUJBQVcsY0FBWDtBQUNELFdBRk0sTUFFQSxJQUFJQyxnQkFBYSxDQUFqQixFQUFvQjtBQUN6QkQsdUJBQVcsS0FBWDtBQUNELFdBRk0sTUFFQSxJQUFJQyxPQUFPRyxTQUFQLEdBQW1CLENBQXZCLEVBQTBCO0FBQy9CSix1QkFBVyxXQUFYO0FBQ0Q7O0FBRUQsY0FBSUEsYUFBYSxLQUFLM1UsZUFBdEIsRUFBdUM7QUFDckMsaUJBQUtBLGVBQUwsR0FBdUIyVSxRQUF2QjtBQUNBLGdCQUFJeFksUUFBUSxJQUFJa1AsS0FBSixDQUFVLHVCQUFWLENBQVo7QUFDQSxpQkFBS0MsY0FBTCxDQUFvQix1QkFBcEIsRUFBNkNuUCxLQUE3QztBQUNEO0FBQ0YsU0FwQ0Q7O0FBc0NBMEMsMEJBQWtCb08sU0FBbEIsQ0FBNEJ2TSxXQUE1QixHQUEwQyxZQUFXO0FBQ25ELGNBQUl3SyxLQUFLLElBQVQ7O0FBRUEsY0FBSUEsR0FBRzhCLFNBQVAsRUFBa0I7QUFDaEIsbUJBQU90TCxRQUFRQyxNQUFSLENBQWV3SSxVQUFVLG1CQUFWLEVBQ2xCLHNDQURrQixDQUFmLENBQVA7QUFFRDs7QUFFRCxjQUFJaUwsaUJBQWlCbEssR0FBR3lCLFlBQUgsQ0FBZ0JoRyxNQUFoQixDQUF1QixVQUFTckMsQ0FBVCxFQUFZO0FBQ3RELG1CQUFPQSxFQUFFOUcsSUFBRixLQUFXLE9BQWxCO0FBQ0QsV0FGb0IsRUFFbEJNLE1BRkg7QUFHQSxjQUFJdVgsaUJBQWlCbkssR0FBR3lCLFlBQUgsQ0FBZ0JoRyxNQUFoQixDQUF1QixVQUFTckMsQ0FBVCxFQUFZO0FBQ3RELG1CQUFPQSxFQUFFOUcsSUFBRixLQUFXLE9BQWxCO0FBQ0QsV0FGb0IsRUFFbEJNLE1BRkg7O0FBSUE7QUFDQSxjQUFJd1gsZUFBZUMsVUFBVSxDQUFWLENBQW5CO0FBQ0EsY0FBSUQsWUFBSixFQUFrQjtBQUNoQjtBQUNBLGdCQUFJQSxhQUFhRSxTQUFiLElBQTBCRixhQUFhRyxRQUEzQyxFQUFxRDtBQUNuRCxvQkFBTSxJQUFJakwsU0FBSixDQUNGLHNEQURFLENBQU47QUFFRDtBQUNELGdCQUFJOEssYUFBYUksbUJBQWIsS0FBcUNqTCxTQUF6QyxFQUFvRDtBQUNsRCxrQkFBSTZLLGFBQWFJLG1CQUFiLEtBQXFDLElBQXpDLEVBQStDO0FBQzdDTixpQ0FBaUIsQ0FBakI7QUFDRCxlQUZELE1BRU8sSUFBSUUsYUFBYUksbUJBQWIsS0FBcUMsS0FBekMsRUFBZ0Q7QUFDckROLGlDQUFpQixDQUFqQjtBQUNELGVBRk0sTUFFQTtBQUNMQSxpQ0FBaUJFLGFBQWFJLG1CQUE5QjtBQUNEO0FBQ0Y7QUFDRCxnQkFBSUosYUFBYUssbUJBQWIsS0FBcUNsTCxTQUF6QyxFQUFvRDtBQUNsRCxrQkFBSTZLLGFBQWFLLG1CQUFiLEtBQXFDLElBQXpDLEVBQStDO0FBQzdDTixpQ0FBaUIsQ0FBakI7QUFDRCxlQUZELE1BRU8sSUFBSUMsYUFBYUssbUJBQWIsS0FBcUMsS0FBekMsRUFBZ0Q7QUFDckROLGlDQUFpQixDQUFqQjtBQUNELGVBRk0sTUFFQTtBQUNMQSxpQ0FBaUJDLGFBQWFLLG1CQUE5QjtBQUNEO0FBQ0Y7QUFDRjs7QUFFRHpLLGFBQUd5QixZQUFILENBQWdCcFAsT0FBaEIsQ0FBd0IsVUFBUzZILFdBQVQsRUFBc0I7QUFDNUMsZ0JBQUlBLFlBQVk1SCxJQUFaLEtBQXFCLE9BQXpCLEVBQWtDO0FBQ2hDNFg7QUFDQSxrQkFBSUEsaUJBQWlCLENBQXJCLEVBQXdCO0FBQ3RCaFEsNEJBQVk2SSxXQUFaLEdBQTBCLEtBQTFCO0FBQ0Q7QUFDRixhQUxELE1BS08sSUFBSTdJLFlBQVk1SCxJQUFaLEtBQXFCLE9BQXpCLEVBQWtDO0FBQ3ZDNlg7QUFDQSxrQkFBSUEsaUJBQWlCLENBQXJCLEVBQXdCO0FBQ3RCalEsNEJBQVk2SSxXQUFaLEdBQTBCLEtBQTFCO0FBQ0Q7QUFDRjtBQUNGLFdBWkQ7O0FBY0E7QUFDQSxpQkFBT21ILGlCQUFpQixDQUFqQixJQUFzQkMsaUJBQWlCLENBQTlDLEVBQWlEO0FBQy9DLGdCQUFJRCxpQkFBaUIsQ0FBckIsRUFBd0I7QUFDdEJsSyxpQkFBRzBDLGtCQUFILENBQXNCLE9BQXRCO0FBQ0F3SDtBQUNEO0FBQ0QsZ0JBQUlDLGlCQUFpQixDQUFyQixFQUF3QjtBQUN0Qm5LLGlCQUFHMEMsa0JBQUgsQ0FBc0IsT0FBdEI7QUFDQXlIO0FBQ0Q7QUFDRjs7QUFFRCxjQUFJM1csTUFBTXdHLFNBQVMwUSx1QkFBVCxDQUFpQzFLLEdBQUcwQixhQUFwQyxFQUNOMUIsR0FBRzRCLGtCQUFILEVBRE0sQ0FBVjtBQUVBNUIsYUFBR3lCLFlBQUgsQ0FBZ0JwUCxPQUFoQixDQUF3QixVQUFTNkgsV0FBVCxFQUFzQmlLLGFBQXRCLEVBQXFDO0FBQzNEO0FBQ0E7QUFDQSxnQkFBSW5KLFFBQVFkLFlBQVljLEtBQXhCO0FBQ0EsZ0JBQUkxSSxPQUFPNEgsWUFBWTVILElBQXZCO0FBQ0EsZ0JBQUlxSSxNQUFNVCxZQUFZUyxHQUFaLElBQW1CWCxTQUFTeU8sa0JBQVQsRUFBN0I7QUFDQXZPLHdCQUFZUyxHQUFaLEdBQWtCQSxHQUFsQjs7QUFFQSxnQkFBSSxDQUFDVCxZQUFZSyxXQUFqQixFQUE4QjtBQUM1QkwsMEJBQVlLLFdBQVosR0FBMEJ5RixHQUFHa0Usa0JBQUgsQ0FBc0JDLGFBQXRCLEVBQ3RCbkUsR0FBR2lCLFdBRG1CLENBQTFCO0FBRUQ7O0FBRUQsZ0JBQUkvRSxvQkFBb0JuTCxPQUFPcVMsWUFBUCxDQUFvQjZGLGVBQXBCLENBQW9DM1csSUFBcEMsQ0FBeEI7QUFDQTtBQUNBO0FBQ0EsZ0JBQUlpSixjQUFjLEtBQWxCLEVBQXlCO0FBQ3ZCVyxnQ0FBa0JHLE1BQWxCLEdBQTJCSCxrQkFBa0JHLE1BQWxCLENBQXlCWixNQUF6QixDQUN2QixVQUFTeU4sS0FBVCxFQUFnQjtBQUNkLHVCQUFPQSxNQUFNcGIsSUFBTixLQUFlLEtBQXRCO0FBQ0QsZUFIc0IsQ0FBM0I7QUFJRDtBQUNEb08sOEJBQWtCRyxNQUFsQixDQUF5QmhLLE9BQXpCLENBQWlDLFVBQVM2VyxLQUFULEVBQWdCO0FBQy9DO0FBQ0E7QUFDQSxrQkFBSUEsTUFBTXBiLElBQU4sS0FBZSxNQUFmLElBQ0FvYixNQUFNaE0sVUFBTixDQUFpQix5QkFBakIsTUFBZ0RxQyxTQURwRCxFQUMrRDtBQUM3RDJKLHNCQUFNaE0sVUFBTixDQUFpQix5QkFBakIsSUFBOEMsR0FBOUM7QUFDRDs7QUFFRDtBQUNBO0FBQ0Esa0JBQUloRCxZQUFZaUMsa0JBQVosSUFDQWpDLFlBQVlpQyxrQkFBWixDQUErQkUsTUFEbkMsRUFDMkM7QUFDekNuQyw0QkFBWWlDLGtCQUFaLENBQStCRSxNQUEvQixDQUFzQ2hLLE9BQXRDLENBQThDLFVBQVNzWSxXQUFULEVBQXNCO0FBQ2xFLHNCQUFJekIsTUFBTXBiLElBQU4sQ0FBV3VQLFdBQVgsT0FBNkJzTixZQUFZN2MsSUFBWixDQUFpQnVQLFdBQWpCLEVBQTdCLElBQ0E2TCxNQUFNNUwsU0FBTixLQUFvQnFOLFlBQVlyTixTQURwQyxFQUMrQztBQUM3QzRMLDBCQUFNdk0sb0JBQU4sR0FBNkJnTyxZQUFZak8sV0FBekM7QUFDRDtBQUNGLGlCQUxEO0FBTUQ7QUFDRixhQW5CRDtBQW9CQVIsOEJBQWtCSSxnQkFBbEIsQ0FBbUNqSyxPQUFuQyxDQUEyQyxVQUFTdVksTUFBVCxFQUFpQjtBQUMxRCxrQkFBSUMsbUJBQW1CM1EsWUFBWWlDLGtCQUFaLElBQ25CakMsWUFBWWlDLGtCQUFaLENBQStCRyxnQkFEWixJQUNnQyxFQUR2RDtBQUVBdU8sK0JBQWlCeFksT0FBakIsQ0FBeUIsVUFBU3lZLE9BQVQsRUFBa0I7QUFDekMsb0JBQUlGLE9BQU81TSxHQUFQLEtBQWU4TSxRQUFROU0sR0FBM0IsRUFBZ0M7QUFDOUI0TSx5QkFBT3haLEVBQVAsR0FBWTBaLFFBQVExWixFQUFwQjtBQUNEO0FBQ0YsZUFKRDtBQUtELGFBUkQ7O0FBVUE7QUFDQSxnQkFBSThKLHlCQUF5QmhCLFlBQVlnQixzQkFBWixJQUFzQyxDQUFDO0FBQ2xFQyxvQkFBTSxDQUFDLElBQUlnSixhQUFKLEdBQW9CLENBQXJCLElBQTBCO0FBRGtDLGFBQUQsQ0FBbkU7QUFHQSxnQkFBSW5KLEtBQUosRUFBVztBQUNUO0FBQ0Esa0JBQUlPLGVBQWUsS0FBZixJQUF3QmpKLFNBQVMsT0FBakMsSUFDQSxDQUFDNEksdUJBQXVCLENBQXZCLEVBQTBCRSxHQUQvQixFQUNvQztBQUNsQ0YsdUNBQXVCLENBQXZCLEVBQTBCRSxHQUExQixHQUFnQztBQUM5QkQsd0JBQU1ELHVCQUF1QixDQUF2QixFQUEwQkMsSUFBMUIsR0FBaUM7QUFEVCxpQkFBaEM7QUFHRDtBQUNGOztBQUVELGdCQUFJakIsWUFBWTZJLFdBQWhCLEVBQTZCO0FBQzNCN0ksMEJBQVlXLFdBQVosR0FBMEIsSUFBSTlKLE9BQU9pWSxjQUFYLENBQ3RCOU8sWUFBWVEsYUFEVSxFQUNLcEksSUFETCxDQUExQjtBQUVEOztBQUVENEgsd0JBQVlnQyxpQkFBWixHQUFnQ0EsaUJBQWhDO0FBQ0FoQyx3QkFBWWdCLHNCQUFaLEdBQXFDQSxzQkFBckM7QUFDRCxXQXpFRDs7QUEyRUE7QUFDQSxjQUFJOEUsR0FBR3dCLE9BQUgsQ0FBV04sWUFBWCxLQUE0QixZQUFoQyxFQUE4QztBQUM1QzFOLG1CQUFPLG9CQUFvQndNLEdBQUd5QixZQUFILENBQWdCb0MsR0FBaEIsQ0FBb0IsVUFBU3pLLENBQVQsRUFBWTtBQUN6RCxxQkFBT0EsRUFBRXVCLEdBQVQ7QUFDRCxhQUYwQixFQUV4QitLLElBRndCLENBRW5CLEdBRm1CLENBQXBCLEdBRVEsTUFGZjtBQUdEO0FBQ0RsUyxpQkFBTywyQkFBUDs7QUFFQXdNLGFBQUd5QixZQUFILENBQWdCcFAsT0FBaEIsQ0FBd0IsVUFBUzZILFdBQVQsRUFBc0JpSyxhQUF0QixFQUFxQztBQUMzRDNRLG1CQUFPeUcsa0JBQWtCQyxXQUFsQixFQUErQkEsWUFBWWdDLGlCQUEzQyxFQUNILE9BREcsRUFDTWhDLFlBQVk3SyxNQURsQixFQUMwQjJRLEdBQUc2QixTQUQ3QixDQUFQO0FBRUFyTyxtQkFBTyxrQkFBUDs7QUFFQSxnQkFBSTBHLFlBQVlLLFdBQVosSUFBMkJ5RixHQUFHZ0IsaUJBQUgsS0FBeUIsS0FBcEQsS0FDQ21ELGtCQUFrQixDQUFsQixJQUF1QixDQUFDbkUsR0FBR2lCLFdBRDVCLENBQUosRUFDOEM7QUFDNUMvRywwQkFBWUssV0FBWixDQUF3QndRLGtCQUF4QixHQUE2QzFZLE9BQTdDLENBQXFELFVBQVMwUyxJQUFULEVBQWU7QUFDbEVBLHFCQUFLQyxTQUFMLEdBQWlCLENBQWpCO0FBQ0F4Uix1QkFBTyxPQUFPd0csU0FBU29MLGNBQVQsQ0FBd0JMLElBQXhCLENBQVAsR0FBdUMsTUFBOUM7QUFDRCxlQUhEOztBQUtBLGtCQUFJN0ssWUFBWUssV0FBWixDQUF3QmpNLEtBQXhCLEtBQWtDLFdBQXRDLEVBQW1EO0FBQ2pEa0YsdUJBQU8seUJBQVA7QUFDRDtBQUNGO0FBQ0YsV0FoQkQ7O0FBa0JBLGNBQUlPLE9BQU8sSUFBSWhELE9BQU84QyxxQkFBWCxDQUFpQztBQUMxQzdFLGtCQUFNLE9BRG9DO0FBRTFDd0UsaUJBQUtBO0FBRnFDLFdBQWpDLENBQVg7QUFJQSxpQkFBT2dELFFBQVE5QyxPQUFSLENBQWdCSyxJQUFoQixDQUFQO0FBQ0QsU0FqTEQ7O0FBbUxBSiwwQkFBa0JvTyxTQUFsQixDQUE0QmpPLFlBQTVCLEdBQTJDLFlBQVc7QUFDcEQsY0FBSWtNLEtBQUssSUFBVDs7QUFFQSxjQUFJQSxHQUFHOEIsU0FBUCxFQUFrQjtBQUNoQixtQkFBT3RMLFFBQVFDLE1BQVIsQ0FBZXdJLFVBQVUsbUJBQVYsRUFDbEIsdUNBRGtCLENBQWYsQ0FBUDtBQUVEOztBQUVELGNBQUksRUFBRWUsR0FBRzdCLGNBQUgsS0FBc0IsbUJBQXRCLElBQ0Y2QixHQUFHN0IsY0FBSCxLQUFzQixxQkFEdEIsQ0FBSixFQUNrRDtBQUNoRCxtQkFBTzNILFFBQVFDLE1BQVIsQ0FBZXdJLFVBQVUsbUJBQVYsRUFDbEIsaURBQWlEZSxHQUFHN0IsY0FEbEMsQ0FBZixDQUFQO0FBRUQ7O0FBRUQsY0FBSTNLLE1BQU13RyxTQUFTMFEsdUJBQVQsQ0FBaUMxSyxHQUFHMEIsYUFBcEMsRUFDTjFCLEdBQUc0QixrQkFBSCxFQURNLENBQVY7QUFFQSxjQUFJNUIsR0FBR2lCLFdBQVAsRUFBb0I7QUFDbEJ6TixtQkFBTyxvQkFBb0J3TSxHQUFHeUIsWUFBSCxDQUFnQm9DLEdBQWhCLENBQW9CLFVBQVN6SyxDQUFULEVBQVk7QUFDekQscUJBQU9BLEVBQUV1QixHQUFUO0FBQ0QsYUFGMEIsRUFFeEIrSyxJQUZ3QixDQUVuQixHQUZtQixDQUFwQixHQUVRLE1BRmY7QUFHRDtBQUNELGNBQUlzRix1QkFBdUJoUixTQUFTd0wsZ0JBQVQsQ0FDdkJ4RixHQUFHZSxpQkFBSCxDQUFxQnZOLEdBREUsRUFDR1osTUFEOUI7QUFFQW9OLGFBQUd5QixZQUFILENBQWdCcFAsT0FBaEIsQ0FBd0IsVUFBUzZILFdBQVQsRUFBc0JpSyxhQUF0QixFQUFxQztBQUMzRCxnQkFBSUEsZ0JBQWdCLENBQWhCLEdBQW9CNkcsb0JBQXhCLEVBQThDO0FBQzVDO0FBQ0Q7QUFDRCxnQkFBSTlRLFlBQVlrTixRQUFoQixFQUEwQjtBQUN4QixrQkFBSWxOLFlBQVk1SCxJQUFaLEtBQXFCLGFBQXpCLEVBQXdDO0FBQ3RDa0IsdUJBQU8sb0NBQVA7QUFDRCxlQUZELE1BRU8sSUFBSTBHLFlBQVk1SCxJQUFaLEtBQXFCLE9BQXpCLEVBQWtDO0FBQ3ZDa0IsdUJBQU8sc0NBQ0gsMEJBREo7QUFFRCxlQUhNLE1BR0EsSUFBSTBHLFlBQVk1SCxJQUFaLEtBQXFCLE9BQXpCLEVBQWtDO0FBQ3ZDa0IsdUJBQU8sd0NBQ0gsNEJBREo7QUFFRDtBQUNEQSxxQkFBTyx5QkFDSCxnQkFERyxHQUVILFFBRkcsR0FFUTBHLFlBQVlTLEdBRnBCLEdBRTBCLE1BRmpDO0FBR0E7QUFDRDs7QUFFRDtBQUNBLGdCQUFJVCxZQUFZN0ssTUFBaEIsRUFBd0I7QUFDdEIsa0JBQUk0YixVQUFKO0FBQ0Esa0JBQUkvUSxZQUFZNUgsSUFBWixLQUFxQixPQUF6QixFQUFrQztBQUNoQzJZLDZCQUFhL1EsWUFBWTdLLE1BQVosQ0FBbUI2YixjQUFuQixHQUFvQyxDQUFwQyxDQUFiO0FBQ0QsZUFGRCxNQUVPLElBQUloUixZQUFZNUgsSUFBWixLQUFxQixPQUF6QixFQUFrQztBQUN2QzJZLDZCQUFhL1EsWUFBWTdLLE1BQVosQ0FBbUI4YixjQUFuQixHQUFvQyxDQUFwQyxDQUFiO0FBQ0Q7QUFDRCxrQkFBSUYsVUFBSixFQUFnQjtBQUNkO0FBQ0Esb0JBQUkxUCxlQUFlLEtBQWYsSUFBd0JyQixZQUFZNUgsSUFBWixLQUFxQixPQUE3QyxJQUNBLENBQUM0SCxZQUFZZ0Isc0JBQVosQ0FBbUMsQ0FBbkMsRUFBc0NFLEdBRDNDLEVBQ2dEO0FBQzlDbEIsOEJBQVlnQixzQkFBWixDQUFtQyxDQUFuQyxFQUFzQ0UsR0FBdEMsR0FBNEM7QUFDMUNELDBCQUFNakIsWUFBWWdCLHNCQUFaLENBQW1DLENBQW5DLEVBQXNDQyxJQUF0QyxHQUE2QztBQURULG1CQUE1QztBQUdEO0FBQ0Y7QUFDRjs7QUFFRDtBQUNBLGdCQUFJaUIscUJBQXFCSCxzQkFDckIvQixZQUFZZ0MsaUJBRFMsRUFFckJoQyxZQUFZaUMsa0JBRlMsQ0FBekI7O0FBSUEsZ0JBQUlpUCxTQUFTaFAsbUJBQW1CQyxNQUFuQixDQUEwQlosTUFBMUIsQ0FBaUMsVUFBUzRQLENBQVQsRUFBWTtBQUN4RCxxQkFBT0EsRUFBRXZkLElBQUYsQ0FBT3VQLFdBQVAsT0FBeUIsS0FBaEM7QUFDRCxhQUZZLEVBRVZ6SyxNQUZIO0FBR0EsZ0JBQUksQ0FBQ3dZLE1BQUQsSUFBV2xSLFlBQVlnQixzQkFBWixDQUFtQyxDQUFuQyxFQUFzQ0UsR0FBckQsRUFBMEQ7QUFDeEQscUJBQU9sQixZQUFZZ0Isc0JBQVosQ0FBbUMsQ0FBbkMsRUFBc0NFLEdBQTdDO0FBQ0Q7O0FBRUQ1SCxtQkFBT3lHLGtCQUFrQkMsV0FBbEIsRUFBK0JrQyxrQkFBL0IsRUFDSCxRQURHLEVBQ09sQyxZQUFZN0ssTUFEbkIsRUFDMkIyUSxHQUFHNkIsU0FEOUIsQ0FBUDtBQUVBLGdCQUFJM0gsWUFBWXlNLGNBQVosSUFDQXpNLFlBQVl5TSxjQUFaLENBQTJCMkUsV0FEL0IsRUFDNEM7QUFDMUM5WCxxQkFBTyxrQkFBUDtBQUNEO0FBQ0YsV0F6REQ7O0FBMkRBLGNBQUlPLE9BQU8sSUFBSWhELE9BQU84QyxxQkFBWCxDQUFpQztBQUMxQzdFLGtCQUFNLFFBRG9DO0FBRTFDd0UsaUJBQUtBO0FBRnFDLFdBQWpDLENBQVg7QUFJQSxpQkFBT2dELFFBQVE5QyxPQUFSLENBQWdCSyxJQUFoQixDQUFQO0FBQ0QsU0F2RkQ7O0FBeUZBSiwwQkFBa0JvTyxTQUFsQixDQUE0QnROLGVBQTVCLEdBQThDLFVBQVNHLFNBQVQsRUFBb0I7QUFDaEUsY0FBSW9MLEtBQUssSUFBVDtBQUNBLGNBQUl1RixRQUFKO0FBQ0EsY0FBSTNRLGFBQWEsRUFBRUEsVUFBVXVQLGFBQVYsS0FBNEI1RSxTQUE1QixJQUNmM0ssVUFBVWtRLE1BREcsQ0FBakIsRUFDdUI7QUFDckIsbUJBQU90TyxRQUFRQyxNQUFSLENBQWUsSUFBSTZJLFNBQUosQ0FBYyxrQ0FBZCxDQUFmLENBQVA7QUFDRDs7QUFFRDtBQUNBLGlCQUFPLElBQUk5SSxPQUFKLENBQVksVUFBUzlDLE9BQVQsRUFBa0IrQyxNQUFsQixFQUEwQjtBQUMzQyxnQkFBSSxDQUFDdUosR0FBR2UsaUJBQVIsRUFBMkI7QUFDekIscUJBQU90SyxPQUFPd0ksVUFBVSxtQkFBVixFQUNWLHdEQURVLENBQVAsQ0FBUDtBQUVELGFBSEQsTUFHTyxJQUFJLENBQUNySyxTQUFELElBQWNBLFVBQVVBLFNBQVYsS0FBd0IsRUFBMUMsRUFBOEM7QUFDbkQsbUJBQUssSUFBSWdKLElBQUksQ0FBYixFQUFnQkEsSUFBSW9DLEdBQUd5QixZQUFILENBQWdCN08sTUFBcEMsRUFBNENnTCxHQUE1QyxFQUFpRDtBQUMvQyxvQkFBSW9DLEdBQUd5QixZQUFILENBQWdCN0QsQ0FBaEIsRUFBbUJ3SixRQUF2QixFQUFpQztBQUMvQjtBQUNEO0FBQ0RwSCxtQkFBR3lCLFlBQUgsQ0FBZ0I3RCxDQUFoQixFQUFtQlcsWUFBbkIsQ0FBZ0NTLGtCQUFoQyxDQUFtRCxFQUFuRDtBQUNBdUcsMkJBQVd2TCxTQUFTd0wsZ0JBQVQsQ0FBMEJ4RixHQUFHZSxpQkFBSCxDQUFxQnZOLEdBQS9DLENBQVg7QUFDQStSLHlCQUFTM0gsQ0FBVCxLQUFlLHlCQUFmO0FBQ0FvQyxtQkFBR2UsaUJBQUgsQ0FBcUJ2TixHQUFyQixHQUNJd0csU0FBU3lMLGNBQVQsQ0FBd0J6RixHQUFHZSxpQkFBSCxDQUFxQnZOLEdBQTdDLElBQ0ErUixTQUFTRyxJQUFULENBQWMsRUFBZCxDQUZKO0FBR0Esb0JBQUkxRixHQUFHaUIsV0FBUCxFQUFvQjtBQUNsQjtBQUNEO0FBQ0Y7QUFDRixhQWZNLE1BZUE7QUFDTCxrQkFBSWtELGdCQUFnQnZQLFVBQVV1UCxhQUE5QjtBQUNBLGtCQUFJdlAsVUFBVWtRLE1BQWQsRUFBc0I7QUFDcEIscUJBQUssSUFBSTVOLElBQUksQ0FBYixFQUFnQkEsSUFBSThJLEdBQUd5QixZQUFILENBQWdCN08sTUFBcEMsRUFBNENzRSxHQUE1QyxFQUFpRDtBQUMvQyxzQkFBSThJLEdBQUd5QixZQUFILENBQWdCdkssQ0FBaEIsRUFBbUJ5RCxHQUFuQixLQUEyQi9GLFVBQVVrUSxNQUF6QyxFQUFpRDtBQUMvQ1gsb0NBQWdCak4sQ0FBaEI7QUFDQTtBQUNEO0FBQ0Y7QUFDRjtBQUNELGtCQUFJZ0QsY0FBYzhGLEdBQUd5QixZQUFILENBQWdCMEMsYUFBaEIsQ0FBbEI7QUFDQSxrQkFBSWpLLFdBQUosRUFBaUI7QUFDZixvQkFBSUEsWUFBWWtOLFFBQWhCLEVBQTBCO0FBQ3hCLHlCQUFPMVQsU0FBUDtBQUNEO0FBQ0Qsb0JBQUlxUixPQUFPak4sT0FBT0MsSUFBUCxDQUFZbkQsVUFBVUEsU0FBdEIsRUFBaUNoQyxNQUFqQyxHQUEwQyxDQUExQyxHQUNQb0gsU0FBU3FMLGNBQVQsQ0FBd0J6USxVQUFVQSxTQUFsQyxDQURPLEdBQ3dDLEVBRG5EO0FBRUE7QUFDQSxvQkFBSW1RLEtBQUtoRyxRQUFMLEtBQWtCLEtBQWxCLEtBQTRCZ0csS0FBS2xHLElBQUwsS0FBYyxDQUFkLElBQW1Ca0csS0FBS2xHLElBQUwsS0FBYyxDQUE3RCxDQUFKLEVBQXFFO0FBQ25FLHlCQUFPbkwsU0FBUDtBQUNEO0FBQ0Q7QUFDQSxvQkFBSXFSLEtBQUtDLFNBQUwsSUFBa0JELEtBQUtDLFNBQUwsS0FBbUIsQ0FBekMsRUFBNEM7QUFDMUMseUJBQU90UixTQUFQO0FBQ0Q7QUFDRDtBQUNBO0FBQ0Esb0JBQUl5USxrQkFBa0IsQ0FBbEIsSUFBd0JBLGdCQUFnQixDQUFoQixJQUN4QmpLLFlBQVlxRSxZQUFaLEtBQTZCeUIsR0FBR3lCLFlBQUgsQ0FBZ0IsQ0FBaEIsRUFBbUJsRCxZQURwRCxFQUNtRTtBQUNqRSxzQkFBSSxDQUFDRCxrQkFBa0JwRSxZQUFZcUUsWUFBOUIsRUFBNEN3RyxJQUE1QyxDQUFMLEVBQXdEO0FBQ3RELDJCQUFPdE8sT0FBT3dJLFVBQVUsZ0JBQVYsRUFDViwyQkFEVSxDQUFQLENBQVA7QUFFRDtBQUNGOztBQUVEO0FBQ0Esb0JBQUlzTSxrQkFBa0IzVyxVQUFVQSxTQUFWLENBQW9CNFcsSUFBcEIsRUFBdEI7QUFDQSxvQkFBSUQsZ0JBQWdCdlAsT0FBaEIsQ0FBd0IsSUFBeEIsTUFBa0MsQ0FBdEMsRUFBeUM7QUFDdkN1UCxvQ0FBa0JBLGdCQUFnQnhELE1BQWhCLENBQXVCLENBQXZCLENBQWxCO0FBQ0Q7QUFDRHhDLDJCQUFXdkwsU0FBU3dMLGdCQUFULENBQTBCeEYsR0FBR2UsaUJBQUgsQ0FBcUJ2TixHQUEvQyxDQUFYO0FBQ0ErUix5QkFBU3BCLGFBQVQsS0FBMkIsUUFDdEJZLEtBQUsvVixJQUFMLEdBQVl1YyxlQUFaLEdBQThCLG1CQURSLElBRXJCLE1BRk47QUFHQXZMLG1CQUFHZSxpQkFBSCxDQUFxQnZOLEdBQXJCLEdBQ0l3RyxTQUFTeUwsY0FBVCxDQUF3QnpGLEdBQUdlLGlCQUFILENBQXFCdk4sR0FBN0MsSUFDQStSLFNBQVNHLElBQVQsQ0FBYyxFQUFkLENBRko7QUFHRCxlQXBDRCxNQW9DTztBQUNMLHVCQUFPalAsT0FBT3dJLFVBQVUsZ0JBQVYsRUFDViwyQkFEVSxDQUFQLENBQVA7QUFFRDtBQUNGO0FBQ0R2TDtBQUNELFdBeEVNLENBQVA7QUF5RUQsU0FsRkQ7O0FBb0ZBQywwQkFBa0JvTyxTQUFsQixDQUE0QjlQLFFBQTVCLEdBQXVDLFlBQVc7QUFDaEQsY0FBSXdaLFdBQVcsRUFBZjtBQUNBLGVBQUtoSyxZQUFMLENBQWtCcFAsT0FBbEIsQ0FBMEIsVUFBUzZILFdBQVQsRUFBc0I7QUFDOUMsYUFBQyxXQUFELEVBQWMsYUFBZCxFQUE2QixhQUE3QixFQUE0QyxjQUE1QyxFQUNJLGVBREosRUFDcUI3SCxPQURyQixDQUM2QixVQUFTb08sTUFBVCxFQUFpQjtBQUN4QyxrQkFBSXZHLFlBQVl1RyxNQUFaLENBQUosRUFBeUI7QUFDdkJnTCx5QkFBUzlZLElBQVQsQ0FBY3VILFlBQVl1RyxNQUFaLEVBQW9CeE8sUUFBcEIsRUFBZDtBQUNEO0FBQ0YsYUFMTDtBQU1ELFdBUEQ7QUFRQSxjQUFJeVosZUFBZSxTQUFmQSxZQUFlLENBQVNDLElBQVQsRUFBZTtBQUNoQyxtQkFBTztBQUNMQywwQkFBWSxhQURQO0FBRUxDLDJCQUFhLGNBRlI7QUFHTEMsNkJBQWUsZ0JBSFY7QUFJTEMsOEJBQWdCLGlCQUpYO0FBS0xDLCtCQUFpQjtBQUxaLGNBTUxMLEtBQUszYyxJQU5BLEtBTVMyYyxLQUFLM2MsSUFOckI7QUFPRCxXQVJEO0FBU0EsaUJBQU8sSUFBSXdILE9BQUosQ0FBWSxVQUFTOUMsT0FBVCxFQUFrQjtBQUNuQztBQUNBLGdCQUFJdVksVUFBVSxJQUFJQyxHQUFKLEVBQWQ7QUFDQTFWLG9CQUFRMlYsR0FBUixDQUFZVixRQUFaLEVBQXNCdlosSUFBdEIsQ0FBMkIsVUFBU2thLEdBQVQsRUFBYztBQUN2Q0Esa0JBQUkvWixPQUFKLENBQVksVUFBUzZELE1BQVQsRUFBaUI7QUFDM0I0Qix1QkFBT0MsSUFBUCxDQUFZN0IsTUFBWixFQUFvQjdELE9BQXBCLENBQTRCLFVBQVNqQixFQUFULEVBQWE7QUFDdkM4RSx5QkFBTzlFLEVBQVAsRUFBV3BDLElBQVgsR0FBa0IwYyxhQUFheFYsT0FBTzlFLEVBQVAsQ0FBYixDQUFsQjtBQUNBNmEsMEJBQVFJLEdBQVIsQ0FBWWpiLEVBQVosRUFBZ0I4RSxPQUFPOUUsRUFBUCxDQUFoQjtBQUNELGlCQUhEO0FBSUQsZUFMRDtBQU1Bc0Msc0JBQVF1WSxPQUFSO0FBQ0QsYUFSRDtBQVNELFdBWk0sQ0FBUDtBQWFELFNBaENEOztBQWtDQTtBQUNBLFlBQUlLLFVBQVUsQ0FBQyxhQUFELEVBQWdCLGNBQWhCLENBQWQ7QUFDQUEsZ0JBQVFqYSxPQUFSLENBQWdCLFVBQVNvTyxNQUFULEVBQWlCO0FBQy9CLGNBQUk4TCxlQUFlNVksa0JBQWtCb08sU0FBbEIsQ0FBNEJ0QixNQUE1QixDQUFuQjtBQUNBOU0sNEJBQWtCb08sU0FBbEIsQ0FBNEJ0QixNQUE1QixJQUFzQyxZQUFXO0FBQy9DLGdCQUFJK0wsT0FBT25DLFNBQVg7QUFDQSxnQkFBSSxPQUFPbUMsS0FBSyxDQUFMLENBQVAsS0FBbUIsVUFBbkIsSUFDQSxPQUFPQSxLQUFLLENBQUwsQ0FBUCxLQUFtQixVQUR2QixFQUNtQztBQUFFO0FBQ25DLHFCQUFPRCxhQUFhRSxLQUFiLENBQW1CLElBQW5CLEVBQXlCLENBQUNwQyxVQUFVLENBQVYsQ0FBRCxDQUF6QixFQUNOblksSUFETSxDQUNELFVBQVNnTixXQUFULEVBQXNCO0FBQzFCLG9CQUFJLE9BQU9zTixLQUFLLENBQUwsQ0FBUCxLQUFtQixVQUF2QixFQUFtQztBQUNqQ0EsdUJBQUssQ0FBTCxFQUFRQyxLQUFSLENBQWMsSUFBZCxFQUFvQixDQUFDdk4sV0FBRCxDQUFwQjtBQUNEO0FBQ0YsZUFMTSxFQUtKLFVBQVN6UCxLQUFULEVBQWdCO0FBQ2pCLG9CQUFJLE9BQU8rYyxLQUFLLENBQUwsQ0FBUCxLQUFtQixVQUF2QixFQUFtQztBQUNqQ0EsdUJBQUssQ0FBTCxFQUFRQyxLQUFSLENBQWMsSUFBZCxFQUFvQixDQUFDaGQsS0FBRCxDQUFwQjtBQUNEO0FBQ0YsZUFUTSxDQUFQO0FBVUQ7QUFDRCxtQkFBTzhjLGFBQWFFLEtBQWIsQ0FBbUIsSUFBbkIsRUFBeUJwQyxTQUF6QixDQUFQO0FBQ0QsV0FoQkQ7QUFpQkQsU0FuQkQ7O0FBcUJBaUMsa0JBQVUsQ0FBQyxxQkFBRCxFQUF3QixzQkFBeEIsRUFBZ0QsaUJBQWhELENBQVY7QUFDQUEsZ0JBQVFqYSxPQUFSLENBQWdCLFVBQVNvTyxNQUFULEVBQWlCO0FBQy9CLGNBQUk4TCxlQUFlNVksa0JBQWtCb08sU0FBbEIsQ0FBNEJ0QixNQUE1QixDQUFuQjtBQUNBOU0sNEJBQWtCb08sU0FBbEIsQ0FBNEJ0QixNQUE1QixJQUFzQyxZQUFXO0FBQy9DLGdCQUFJK0wsT0FBT25DLFNBQVg7QUFDQSxnQkFBSSxPQUFPbUMsS0FBSyxDQUFMLENBQVAsS0FBbUIsVUFBbkIsSUFDQSxPQUFPQSxLQUFLLENBQUwsQ0FBUCxLQUFtQixVQUR2QixFQUNtQztBQUFFO0FBQ25DLHFCQUFPRCxhQUFhRSxLQUFiLENBQW1CLElBQW5CLEVBQXlCcEMsU0FBekIsRUFDTm5ZLElBRE0sQ0FDRCxZQUFXO0FBQ2Ysb0JBQUksT0FBT3NhLEtBQUssQ0FBTCxDQUFQLEtBQW1CLFVBQXZCLEVBQW1DO0FBQ2pDQSx1QkFBSyxDQUFMLEVBQVFDLEtBQVIsQ0FBYyxJQUFkO0FBQ0Q7QUFDRixlQUxNLEVBS0osVUFBU2hkLEtBQVQsRUFBZ0I7QUFDakIsb0JBQUksT0FBTytjLEtBQUssQ0FBTCxDQUFQLEtBQW1CLFVBQXZCLEVBQW1DO0FBQ2pDQSx1QkFBSyxDQUFMLEVBQVFDLEtBQVIsQ0FBYyxJQUFkLEVBQW9CLENBQUNoZCxLQUFELENBQXBCO0FBQ0Q7QUFDRixlQVRNLENBQVA7QUFVRDtBQUNELG1CQUFPOGMsYUFBYUUsS0FBYixDQUFtQixJQUFuQixFQUF5QnBDLFNBQXpCLENBQVA7QUFDRCxXQWhCRDtBQWlCRCxTQW5CRDs7QUFxQkE7QUFDQTtBQUNBLFNBQUMsVUFBRCxFQUFhaFksT0FBYixDQUFxQixVQUFTb08sTUFBVCxFQUFpQjtBQUNwQyxjQUFJOEwsZUFBZTVZLGtCQUFrQm9PLFNBQWxCLENBQTRCdEIsTUFBNUIsQ0FBbkI7QUFDQTlNLDRCQUFrQm9PLFNBQWxCLENBQTRCdEIsTUFBNUIsSUFBc0MsWUFBVztBQUMvQyxnQkFBSStMLE9BQU9uQyxTQUFYO0FBQ0EsZ0JBQUksT0FBT21DLEtBQUssQ0FBTCxDQUFQLEtBQW1CLFVBQXZCLEVBQW1DO0FBQ2pDLHFCQUFPRCxhQUFhRSxLQUFiLENBQW1CLElBQW5CLEVBQXlCcEMsU0FBekIsRUFDTm5ZLElBRE0sQ0FDRCxZQUFXO0FBQ2Ysb0JBQUksT0FBT3NhLEtBQUssQ0FBTCxDQUFQLEtBQW1CLFVBQXZCLEVBQW1DO0FBQ2pDQSx1QkFBSyxDQUFMLEVBQVFDLEtBQVIsQ0FBYyxJQUFkO0FBQ0Q7QUFDRixlQUxNLENBQVA7QUFNRDtBQUNELG1CQUFPRixhQUFhRSxLQUFiLENBQW1CLElBQW5CLEVBQXlCcEMsU0FBekIsQ0FBUDtBQUNELFdBWEQ7QUFZRCxTQWREOztBQWdCQSxlQUFPMVcsaUJBQVA7QUFDRCxPQTdnREQ7QUErZ0RDLEtBeHZENHlCLEVBd3ZEM3lCLEVBQUMsT0FBTSxDQUFQLEVBeHZEMnlCLENBQUgsRUF3dkQ3eEIsR0FBRSxDQUFDLFVBQVNnRyxPQUFULEVBQWlCVCxNQUFqQixFQUF3QkQsT0FBeEIsRUFBZ0M7QUFDL0M7QUFDRDs7QUFFQTs7QUFDQSxVQUFJZSxXQUFXLEVBQWY7O0FBRUE7QUFDQTtBQUNBQSxlQUFTeU8sa0JBQVQsR0FBOEIsWUFBVztBQUN2QyxlQUFPakwsS0FBS2tQLE1BQUwsR0FBY0MsUUFBZCxDQUF1QixFQUF2QixFQUEyQjVFLE1BQTNCLENBQWtDLENBQWxDLEVBQXFDLEVBQXJDLENBQVA7QUFDRCxPQUZEOztBQUlBO0FBQ0EvTixlQUFTcUIsVUFBVCxHQUFzQnJCLFNBQVN5TyxrQkFBVCxFQUF0Qjs7QUFFQTtBQUNBek8sZUFBU2tPLFVBQVQsR0FBc0IsVUFBUzBFLElBQVQsRUFBZTtBQUNuQyxlQUFPQSxLQUFLcEIsSUFBTCxHQUFZeEQsS0FBWixDQUFrQixJQUFsQixFQUF3Qm5FLEdBQXhCLENBQTRCLFVBQVNnSixJQUFULEVBQWU7QUFDaEQsaUJBQU9BLEtBQUtyQixJQUFMLEVBQVA7QUFDRCxTQUZNLENBQVA7QUFHRCxPQUpEO0FBS0E7QUFDQXhSLGVBQVMrTSxhQUFULEdBQXlCLFVBQVM2RixJQUFULEVBQWU7QUFDdEMsWUFBSUUsUUFBUUYsS0FBSzVFLEtBQUwsQ0FBVyxNQUFYLENBQVo7QUFDQSxlQUFPOEUsTUFBTWpKLEdBQU4sQ0FBVSxVQUFTa0osSUFBVCxFQUFlQyxLQUFmLEVBQXNCO0FBQ3JDLGlCQUFPLENBQUNBLFFBQVEsQ0FBUixHQUFZLE9BQU9ELElBQW5CLEdBQTBCQSxJQUEzQixFQUFpQ3ZCLElBQWpDLEtBQTBDLE1BQWpEO0FBQ0QsU0FGTSxDQUFQO0FBR0QsT0FMRDs7QUFPQTtBQUNBeFIsZUFBU3lMLGNBQVQsR0FBMEIsVUFBU21ILElBQVQsRUFBZTtBQUN2QyxZQUFJckgsV0FBV3ZMLFNBQVMrTSxhQUFULENBQXVCNkYsSUFBdkIsQ0FBZjtBQUNBLGVBQU9ySCxZQUFZQSxTQUFTLENBQVQsQ0FBbkI7QUFDRCxPQUhEOztBQUtBO0FBQ0F2TCxlQUFTd0wsZ0JBQVQsR0FBNEIsVUFBU29ILElBQVQsRUFBZTtBQUN6QyxZQUFJckgsV0FBV3ZMLFNBQVMrTSxhQUFULENBQXVCNkYsSUFBdkIsQ0FBZjtBQUNBckgsaUJBQVMxUyxLQUFUO0FBQ0EsZUFBTzBTLFFBQVA7QUFDRCxPQUpEOztBQU1BO0FBQ0F2TCxlQUFTbU4sV0FBVCxHQUF1QixVQUFTeUYsSUFBVCxFQUFlSyxNQUFmLEVBQXVCO0FBQzVDLGVBQU9qVCxTQUFTa08sVUFBVCxDQUFvQjBFLElBQXBCLEVBQTBCblIsTUFBMUIsQ0FBaUMsVUFBU29SLElBQVQsRUFBZTtBQUNyRCxpQkFBT0EsS0FBSzdRLE9BQUwsQ0FBYWlSLE1BQWIsTUFBeUIsQ0FBaEM7QUFDRCxTQUZNLENBQVA7QUFHRCxPQUpEOztBQU1BO0FBQ0E7QUFDQTtBQUNBalQsZUFBU3FMLGNBQVQsR0FBMEIsVUFBU3dILElBQVQsRUFBZTtBQUN2QyxZQUFJQyxLQUFKO0FBQ0E7QUFDQSxZQUFJRCxLQUFLN1EsT0FBTCxDQUFhLGNBQWIsTUFBaUMsQ0FBckMsRUFBd0M7QUFDdEM4USxrQkFBUUQsS0FBS0ssU0FBTCxDQUFlLEVBQWYsRUFBbUJsRixLQUFuQixDQUF5QixHQUF6QixDQUFSO0FBQ0QsU0FGRCxNQUVPO0FBQ0w4RSxrQkFBUUQsS0FBS0ssU0FBTCxDQUFlLEVBQWYsRUFBbUJsRixLQUFuQixDQUF5QixHQUF6QixDQUFSO0FBQ0Q7O0FBRUQsWUFBSXBULFlBQVk7QUFDZGdLLHNCQUFZa08sTUFBTSxDQUFOLENBREU7QUFFZDlILHFCQUFXdlMsU0FBU3FhLE1BQU0sQ0FBTixDQUFULEVBQW1CLEVBQW5CLENBRkc7QUFHZC9OLG9CQUFVK04sTUFBTSxDQUFOLEVBQVN6UCxXQUFULEVBSEk7QUFJZHlCLG9CQUFVck0sU0FBU3FhLE1BQU0sQ0FBTixDQUFULEVBQW1CLEVBQW5CLENBSkk7QUFLZHZXLGNBQUl1VyxNQUFNLENBQU4sQ0FMVTtBQU1kak8sZ0JBQU1wTSxTQUFTcWEsTUFBTSxDQUFOLENBQVQsRUFBbUIsRUFBbkIsQ0FOUTtBQU9kO0FBQ0E5ZCxnQkFBTThkLE1BQU0sQ0FBTjtBQVJRLFNBQWhCOztBQVdBLGFBQUssSUFBSTVWLElBQUksQ0FBYixFQUFnQkEsSUFBSTRWLE1BQU1sYSxNQUExQixFQUFrQ3NFLEtBQUssQ0FBdkMsRUFBMEM7QUFDeEMsa0JBQVE0VixNQUFNNVYsQ0FBTixDQUFSO0FBQ0UsaUJBQUssT0FBTDtBQUNFdEMsd0JBQVV1WSxjQUFWLEdBQTJCTCxNQUFNNVYsSUFBSSxDQUFWLENBQTNCO0FBQ0E7QUFDRixpQkFBSyxPQUFMO0FBQ0V0Qyx3QkFBVXdZLFdBQVYsR0FBd0IzYSxTQUFTcWEsTUFBTTVWLElBQUksQ0FBVixDQUFULEVBQXVCLEVBQXZCLENBQXhCO0FBQ0E7QUFDRixpQkFBSyxTQUFMO0FBQ0V0Qyx3QkFBVXlZLE9BQVYsR0FBb0JQLE1BQU01VixJQUFJLENBQVYsQ0FBcEI7QUFDQTtBQUNGLGlCQUFLLE9BQUw7QUFDRXRDLHdCQUFVcVEsS0FBVixHQUFrQjZILE1BQU01VixJQUFJLENBQVYsQ0FBbEIsQ0FERixDQUNrQztBQUNoQ3RDLHdCQUFVc1EsZ0JBQVYsR0FBNkI0SCxNQUFNNVYsSUFBSSxDQUFWLENBQTdCO0FBQ0E7QUFDRjtBQUFTO0FBQ1B0Qyx3QkFBVWtZLE1BQU01VixDQUFOLENBQVYsSUFBc0I0VixNQUFNNVYsSUFBSSxDQUFWLENBQXRCO0FBQ0E7QUFoQko7QUFrQkQ7QUFDRCxlQUFPdEMsU0FBUDtBQUNELE9BekNEOztBQTJDQTtBQUNBb0YsZUFBU29MLGNBQVQsR0FBMEIsVUFBU3hRLFNBQVQsRUFBb0I7QUFDNUMsWUFBSXBCLE1BQU0sRUFBVjtBQUNBQSxZQUFJYixJQUFKLENBQVNpQyxVQUFVZ0ssVUFBbkI7QUFDQXBMLFlBQUliLElBQUosQ0FBU2lDLFVBQVVvUSxTQUFuQjtBQUNBeFIsWUFBSWIsSUFBSixDQUFTaUMsVUFBVW1LLFFBQVYsQ0FBbUJ1TyxXQUFuQixFQUFUO0FBQ0E5WixZQUFJYixJQUFKLENBQVNpQyxVQUFVa0ssUUFBbkI7QUFDQXRMLFlBQUliLElBQUosQ0FBU2lDLFVBQVUyQixFQUFuQjtBQUNBL0MsWUFBSWIsSUFBSixDQUFTaUMsVUFBVWlLLElBQW5COztBQUVBLFlBQUk3UCxPQUFPNEYsVUFBVTVGLElBQXJCO0FBQ0F3RSxZQUFJYixJQUFKLENBQVMsS0FBVDtBQUNBYSxZQUFJYixJQUFKLENBQVMzRCxJQUFUO0FBQ0EsWUFBSUEsU0FBUyxNQUFULElBQW1CNEYsVUFBVXVZLGNBQTdCLElBQ0F2WSxVQUFVd1ksV0FEZCxFQUMyQjtBQUN6QjVaLGNBQUliLElBQUosQ0FBUyxPQUFUO0FBQ0FhLGNBQUliLElBQUosQ0FBU2lDLFVBQVV1WSxjQUFuQixFQUZ5QixDQUVXO0FBQ3BDM1osY0FBSWIsSUFBSixDQUFTLE9BQVQ7QUFDQWEsY0FBSWIsSUFBSixDQUFTaUMsVUFBVXdZLFdBQW5CLEVBSnlCLENBSVE7QUFDbEM7QUFDRCxZQUFJeFksVUFBVXlZLE9BQVYsSUFBcUJ6WSxVQUFVbUssUUFBVixDQUFtQjFCLFdBQW5CLE9BQXFDLEtBQTlELEVBQXFFO0FBQ25FN0osY0FBSWIsSUFBSixDQUFTLFNBQVQ7QUFDQWEsY0FBSWIsSUFBSixDQUFTaUMsVUFBVXlZLE9BQW5CO0FBQ0Q7QUFDRCxZQUFJelksVUFBVXNRLGdCQUFWLElBQThCdFEsVUFBVXFRLEtBQTVDLEVBQW1EO0FBQ2pEelIsY0FBSWIsSUFBSixDQUFTLE9BQVQ7QUFDQWEsY0FBSWIsSUFBSixDQUFTaUMsVUFBVXNRLGdCQUFWLElBQThCdFEsVUFBVXFRLEtBQWpEO0FBQ0Q7QUFDRCxlQUFPLGVBQWV6UixJQUFJa1MsSUFBSixDQUFTLEdBQVQsQ0FBdEI7QUFDRCxPQTVCRDs7QUE4QkE7QUFDQTtBQUNBMUwsZUFBU3VULGVBQVQsR0FBMkIsVUFBU1YsSUFBVCxFQUFlO0FBQ3hDLGVBQU9BLEtBQUs5RSxNQUFMLENBQVksRUFBWixFQUFnQkMsS0FBaEIsQ0FBc0IsR0FBdEIsQ0FBUDtBQUNELE9BRkQ7O0FBSUE7QUFDQTtBQUNBaE8sZUFBU3dULFdBQVQsR0FBdUIsVUFBU1gsSUFBVCxFQUFlO0FBQ3BDLFlBQUlDLFFBQVFELEtBQUs5RSxNQUFMLENBQVksQ0FBWixFQUFlQyxLQUFmLENBQXFCLEdBQXJCLENBQVo7QUFDQSxZQUFJeUYsU0FBUztBQUNYL1EsdUJBQWFqSyxTQUFTcWEsTUFBTWphLEtBQU4sRUFBVCxFQUF3QixFQUF4QixDQURGLENBQzhCO0FBRDlCLFNBQWI7O0FBSUFpYSxnQkFBUUEsTUFBTSxDQUFOLEVBQVM5RSxLQUFULENBQWUsR0FBZixDQUFSOztBQUVBeUYsZUFBTzNmLElBQVAsR0FBY2dmLE1BQU0sQ0FBTixDQUFkO0FBQ0FXLGVBQU9uUSxTQUFQLEdBQW1CN0ssU0FBU3FhLE1BQU0sQ0FBTixDQUFULEVBQW1CLEVBQW5CLENBQW5CLENBVG9DLENBU087QUFDM0M7QUFDQVcsZUFBT2xRLFdBQVAsR0FBcUJ1UCxNQUFNbGEsTUFBTixLQUFpQixDQUFqQixHQUFxQkgsU0FBU3FhLE1BQU0sQ0FBTixDQUFULEVBQW1CLEVBQW5CLENBQXJCLEdBQThDLENBQW5FO0FBQ0EsZUFBT1csTUFBUDtBQUNELE9BYkQ7O0FBZUE7QUFDQTtBQUNBelQsZUFBUzBULFdBQVQsR0FBdUIsVUFBU3hFLEtBQVQsRUFBZ0I7QUFDckMsWUFBSXpNLEtBQUt5TSxNQUFNeE0sV0FBZjtBQUNBLFlBQUl3TSxNQUFNdk0sb0JBQU4sS0FBK0I0QyxTQUFuQyxFQUE4QztBQUM1QzlDLGVBQUt5TSxNQUFNdk0sb0JBQVg7QUFDRDtBQUNELGVBQU8sY0FBY0YsRUFBZCxHQUFtQixHQUFuQixHQUF5QnlNLE1BQU1wYixJQUEvQixHQUFzQyxHQUF0QyxHQUE0Q29iLE1BQU01TCxTQUFsRCxJQUNGNEwsTUFBTTNMLFdBQU4sS0FBc0IsQ0FBdEIsR0FBMEIsTUFBTTJMLE1BQU0zTCxXQUF0QyxHQUFvRCxFQURsRCxJQUN3RCxNQUQvRDtBQUVELE9BUEQ7O0FBU0E7QUFDQTtBQUNBO0FBQ0F2RCxlQUFTMlQsV0FBVCxHQUF1QixVQUFTZCxJQUFULEVBQWU7QUFDcEMsWUFBSUMsUUFBUUQsS0FBSzlFLE1BQUwsQ0FBWSxDQUFaLEVBQWVDLEtBQWYsQ0FBcUIsR0FBckIsQ0FBWjtBQUNBLGVBQU87QUFDTDVXLGNBQUlxQixTQUFTcWEsTUFBTSxDQUFOLENBQVQsRUFBbUIsRUFBbkIsQ0FEQztBQUVMMUUscUJBQVcwRSxNQUFNLENBQU4sRUFBUzlRLE9BQVQsQ0FBaUIsR0FBakIsSUFBd0IsQ0FBeEIsR0FBNEI4USxNQUFNLENBQU4sRUFBUzlFLEtBQVQsQ0FBZSxHQUFmLEVBQW9CLENBQXBCLENBQTVCLEdBQXFELFVBRjNEO0FBR0xoSyxlQUFLOE8sTUFBTSxDQUFOO0FBSEEsU0FBUDtBQUtELE9BUEQ7O0FBU0E7QUFDQTtBQUNBOVMsZUFBUzRULFdBQVQsR0FBdUIsVUFBU0MsZUFBVCxFQUEwQjtBQUMvQyxlQUFPLGVBQWVBLGdCQUFnQnpjLEVBQWhCLElBQXNCeWMsZ0JBQWdCQyxXQUFyRCxLQUNGRCxnQkFBZ0J6RixTQUFoQixJQUE2QnlGLGdCQUFnQnpGLFNBQWhCLEtBQThCLFVBQTNELEdBQ0ssTUFBTXlGLGdCQUFnQnpGLFNBRDNCLEdBRUssRUFISCxJQUlILEdBSkcsR0FJR3lGLGdCQUFnQjdQLEdBSm5CLEdBSXlCLE1BSmhDO0FBS0QsT0FORDs7QUFRQTtBQUNBO0FBQ0E7QUFDQWhFLGVBQVMrVCxTQUFULEdBQXFCLFVBQVNsQixJQUFULEVBQWU7QUFDbEMsWUFBSVksU0FBUyxFQUFiO0FBQ0EsWUFBSU8sRUFBSjtBQUNBLFlBQUlsQixRQUFRRCxLQUFLOUUsTUFBTCxDQUFZOEUsS0FBSzdRLE9BQUwsQ0FBYSxHQUFiLElBQW9CLENBQWhDLEVBQW1DZ00sS0FBbkMsQ0FBeUMsR0FBekMsQ0FBWjtBQUNBLGFBQUssSUFBSXBLLElBQUksQ0FBYixFQUFnQkEsSUFBSWtQLE1BQU1sYSxNQUExQixFQUFrQ2dMLEdBQWxDLEVBQXVDO0FBQ3JDb1EsZUFBS2xCLE1BQU1sUCxDQUFOLEVBQVM0TixJQUFULEdBQWdCeEQsS0FBaEIsQ0FBc0IsR0FBdEIsQ0FBTDtBQUNBeUYsaUJBQU9PLEdBQUcsQ0FBSCxFQUFNeEMsSUFBTixFQUFQLElBQXVCd0MsR0FBRyxDQUFILENBQXZCO0FBQ0Q7QUFDRCxlQUFPUCxNQUFQO0FBQ0QsT0FURDs7QUFXQTtBQUNBelQsZUFBU2lVLFNBQVQsR0FBcUIsVUFBUy9FLEtBQVQsRUFBZ0I7QUFDbkMsWUFBSTJELE9BQU8sRUFBWDtBQUNBLFlBQUlwUSxLQUFLeU0sTUFBTXhNLFdBQWY7QUFDQSxZQUFJd00sTUFBTXZNLG9CQUFOLEtBQStCNEMsU0FBbkMsRUFBOEM7QUFDNUM5QyxlQUFLeU0sTUFBTXZNLG9CQUFYO0FBQ0Q7QUFDRCxZQUFJdU0sTUFBTWhNLFVBQU4sSUFBb0JwRixPQUFPQyxJQUFQLENBQVltUixNQUFNaE0sVUFBbEIsRUFBOEJ0SyxNQUF0RCxFQUE4RDtBQUM1RCxjQUFJMFQsU0FBUyxFQUFiO0FBQ0F4TyxpQkFBT0MsSUFBUCxDQUFZbVIsTUFBTWhNLFVBQWxCLEVBQThCN0ssT0FBOUIsQ0FBc0MsVUFBUzZiLEtBQVQsRUFBZ0I7QUFDcEQ1SCxtQkFBTzNULElBQVAsQ0FBWXViLFFBQVEsR0FBUixHQUFjaEYsTUFBTWhNLFVBQU4sQ0FBaUJnUixLQUFqQixDQUExQjtBQUNELFdBRkQ7QUFHQXJCLGtCQUFRLFlBQVlwUSxFQUFaLEdBQWlCLEdBQWpCLEdBQXVCNkosT0FBT1osSUFBUCxDQUFZLEdBQVosQ0FBdkIsR0FBMEMsTUFBbEQ7QUFDRDtBQUNELGVBQU9tSCxJQUFQO0FBQ0QsT0FkRDs7QUFnQkE7QUFDQTtBQUNBN1MsZUFBU21VLFdBQVQsR0FBdUIsVUFBU3RCLElBQVQsRUFBZTtBQUNwQyxZQUFJQyxRQUFRRCxLQUFLOUUsTUFBTCxDQUFZOEUsS0FBSzdRLE9BQUwsQ0FBYSxHQUFiLElBQW9CLENBQWhDLEVBQW1DZ00sS0FBbkMsQ0FBeUMsR0FBekMsQ0FBWjtBQUNBLGVBQU87QUFDTGhaLGdCQUFNOGQsTUFBTWphLEtBQU4sRUFERDtBQUVMZ0wscUJBQVdpUCxNQUFNcEgsSUFBTixDQUFXLEdBQVg7QUFGTixTQUFQO0FBSUQsT0FORDtBQU9BO0FBQ0ExTCxlQUFTb1UsV0FBVCxHQUF1QixVQUFTbEYsS0FBVCxFQUFnQjtBQUNyQyxZQUFJakIsUUFBUSxFQUFaO0FBQ0EsWUFBSXhMLEtBQUt5TSxNQUFNeE0sV0FBZjtBQUNBLFlBQUl3TSxNQUFNdk0sb0JBQU4sS0FBK0I0QyxTQUFuQyxFQUE4QztBQUM1QzlDLGVBQUt5TSxNQUFNdk0sb0JBQVg7QUFDRDtBQUNELFlBQUl1TSxNQUFNeEwsWUFBTixJQUFzQndMLE1BQU14TCxZQUFOLENBQW1COUssTUFBN0MsRUFBcUQ7QUFDbkQ7QUFDQXNXLGdCQUFNeEwsWUFBTixDQUFtQnJMLE9BQW5CLENBQTJCLFVBQVNzTCxFQUFULEVBQWE7QUFDdENzSyxxQkFBUyxlQUFleEwsRUFBZixHQUFvQixHQUFwQixHQUEwQmtCLEdBQUczTyxJQUE3QixJQUNSMk8sR0FBR0UsU0FBSCxJQUFnQkYsR0FBR0UsU0FBSCxDQUFhakwsTUFBN0IsR0FBc0MsTUFBTStLLEdBQUdFLFNBQS9DLEdBQTJELEVBRG5ELElBRUwsTUFGSjtBQUdELFdBSkQ7QUFLRDtBQUNELGVBQU9vSyxLQUFQO0FBQ0QsT0FmRDs7QUFpQkE7QUFDQTtBQUNBak8sZUFBU3FVLGNBQVQsR0FBMEIsVUFBU3hCLElBQVQsRUFBZTtBQUN2QyxZQUFJeUIsS0FBS3pCLEtBQUs3USxPQUFMLENBQWEsR0FBYixDQUFUO0FBQ0EsWUFBSThRLFFBQVE7QUFDVjNSLGdCQUFNMUksU0FBU29hLEtBQUs5RSxNQUFMLENBQVksQ0FBWixFQUFldUcsS0FBSyxDQUFwQixDQUFULEVBQWlDLEVBQWpDO0FBREksU0FBWjtBQUdBLFlBQUlDLFFBQVExQixLQUFLN1EsT0FBTCxDQUFhLEdBQWIsRUFBa0JzUyxFQUFsQixDQUFaO0FBQ0EsWUFBSUMsUUFBUSxDQUFDLENBQWIsRUFBZ0I7QUFDZHpCLGdCQUFNMEIsU0FBTixHQUFrQjNCLEtBQUs5RSxNQUFMLENBQVl1RyxLQUFLLENBQWpCLEVBQW9CQyxRQUFRRCxFQUFSLEdBQWEsQ0FBakMsQ0FBbEI7QUFDQXhCLGdCQUFNekksS0FBTixHQUFjd0ksS0FBSzlFLE1BQUwsQ0FBWXdHLFFBQVEsQ0FBcEIsQ0FBZDtBQUNELFNBSEQsTUFHTztBQUNMekIsZ0JBQU0wQixTQUFOLEdBQWtCM0IsS0FBSzlFLE1BQUwsQ0FBWXVHLEtBQUssQ0FBakIsQ0FBbEI7QUFDRDtBQUNELGVBQU94QixLQUFQO0FBQ0QsT0FiRDs7QUFlQTtBQUNBO0FBQ0E5UyxlQUFTd08sTUFBVCxHQUFrQixVQUFTeEIsWUFBVCxFQUF1QjtBQUN2QyxZQUFJck0sTUFBTVgsU0FBU21OLFdBQVQsQ0FBcUJILFlBQXJCLEVBQW1DLFFBQW5DLEVBQTZDLENBQTdDLENBQVY7QUFDQSxZQUFJck0sR0FBSixFQUFTO0FBQ1AsaUJBQU9BLElBQUlvTixNQUFKLENBQVcsQ0FBWCxDQUFQO0FBQ0Q7QUFDRixPQUxEOztBQU9BL04sZUFBU3lVLGdCQUFULEdBQTRCLFVBQVM1QixJQUFULEVBQWU7QUFDekMsWUFBSUMsUUFBUUQsS0FBSzlFLE1BQUwsQ0FBWSxFQUFaLEVBQWdCQyxLQUFoQixDQUFzQixHQUF0QixDQUFaO0FBQ0EsZUFBTztBQUNMMEcscUJBQVc1QixNQUFNLENBQU4sRUFBU3pQLFdBQVQsRUFETixFQUM4QjtBQUNuQ2dILGlCQUFPeUksTUFBTSxDQUFOO0FBRkYsU0FBUDtBQUlELE9BTkQ7O0FBUUE7QUFDQTtBQUNBO0FBQ0E5UyxlQUFTeU4saUJBQVQsR0FBNkIsVUFBU1QsWUFBVCxFQUF1QkYsV0FBdkIsRUFBb0M7QUFDL0QsWUFBSW1CLFFBQVFqTyxTQUFTbU4sV0FBVCxDQUFxQkgsZUFBZUYsV0FBcEMsRUFDUixnQkFEUSxDQUFaO0FBRUE7QUFDQTtBQUNBLGVBQU87QUFDTFksZ0JBQU0sTUFERDtBQUVMaUgsd0JBQWMxRyxNQUFNcEUsR0FBTixDQUFVN0osU0FBU3lVLGdCQUFuQjtBQUZULFNBQVA7QUFJRCxPQVREOztBQVdBO0FBQ0F6VSxlQUFTUyxtQkFBVCxHQUErQixVQUFTNkwsTUFBVCxFQUFpQnNJLFNBQWpCLEVBQTRCO0FBQ3pELFlBQUlwYixNQUFNLGFBQWFvYixTQUFiLEdBQXlCLE1BQW5DO0FBQ0F0SSxlQUFPcUksWUFBUCxDQUFvQnRjLE9BQXBCLENBQTRCLFVBQVN3YyxFQUFULEVBQWE7QUFDdkNyYixpQkFBTyxtQkFBbUJxYixHQUFHSCxTQUF0QixHQUFrQyxHQUFsQyxHQUF3Q0csR0FBR3hLLEtBQTNDLEdBQW1ELE1BQTFEO0FBQ0QsU0FGRDtBQUdBLGVBQU83USxHQUFQO0FBQ0QsT0FORDtBQU9BO0FBQ0E7QUFDQTtBQUNBd0csZUFBU3VOLGdCQUFULEdBQTRCLFVBQVNQLFlBQVQsRUFBdUJGLFdBQXZCLEVBQW9DO0FBQzlELFlBQUltQixRQUFRak8sU0FBU2tPLFVBQVQsQ0FBb0JsQixZQUFwQixDQUFaO0FBQ0E7QUFDQWlCLGdCQUFRQSxNQUFNNkcsTUFBTixDQUFhOVUsU0FBU2tPLFVBQVQsQ0FBb0JwQixXQUFwQixDQUFiLENBQVI7QUFDQSxZQUFJaUksZ0JBQWdCO0FBQ2xCN0osNEJBQWtCK0MsTUFBTXhNLE1BQU4sQ0FBYSxVQUFTb1IsSUFBVCxFQUFlO0FBQzVDLG1CQUFPQSxLQUFLN1EsT0FBTCxDQUFhLGNBQWIsTUFBaUMsQ0FBeEM7QUFDRCxXQUZpQixFQUVmLENBRmUsRUFFWitMLE1BRlksQ0FFTCxFQUZLLENBREE7QUFJbEJpSCxvQkFBVS9HLE1BQU14TSxNQUFOLENBQWEsVUFBU29SLElBQVQsRUFBZTtBQUNwQyxtQkFBT0EsS0FBSzdRLE9BQUwsQ0FBYSxZQUFiLE1BQStCLENBQXRDO0FBQ0QsV0FGUyxFQUVQLENBRk8sRUFFSitMLE1BRkksQ0FFRyxFQUZIO0FBSlEsU0FBcEI7QUFRQSxlQUFPZ0gsYUFBUDtBQUNELE9BYkQ7O0FBZUE7QUFDQS9VLGVBQVNNLGtCQUFULEdBQThCLFVBQVNnTSxNQUFULEVBQWlCO0FBQzdDLGVBQU8saUJBQWlCQSxPQUFPcEIsZ0JBQXhCLEdBQTJDLE1BQTNDLEdBQ0gsWUFERyxHQUNZb0IsT0FBTzBJLFFBRG5CLEdBQzhCLE1BRHJDO0FBRUQsT0FIRDs7QUFLQTtBQUNBaFYsZUFBU2lOLGtCQUFULEdBQThCLFVBQVNELFlBQVQsRUFBdUI7QUFDbkQsWUFBSTlILGNBQWM7QUFDaEI3QyxrQkFBUSxFQURRO0FBRWhCQyw0QkFBa0IsRUFGRjtBQUdoQkMseUJBQWUsRUFIQztBQUloQmlLLGdCQUFNO0FBSlUsU0FBbEI7QUFNQSxZQUFJeUIsUUFBUWpPLFNBQVNrTyxVQUFULENBQW9CbEIsWUFBcEIsQ0FBWjtBQUNBLFlBQUlpSSxRQUFRaEgsTUFBTSxDQUFOLEVBQVNELEtBQVQsQ0FBZSxHQUFmLENBQVo7QUFDQSxhQUFLLElBQUk5USxJQUFJLENBQWIsRUFBZ0JBLElBQUkrWCxNQUFNcmMsTUFBMUIsRUFBa0NzRSxHQUFsQyxFQUF1QztBQUFFO0FBQ3ZDLGNBQUl1RixLQUFLd1MsTUFBTS9YLENBQU4sQ0FBVDtBQUNBLGNBQUlnWSxhQUFhbFYsU0FBU21OLFdBQVQsQ0FDYkgsWUFEYSxFQUNDLGNBQWN2SyxFQUFkLEdBQW1CLEdBRHBCLEVBQ3lCLENBRHpCLENBQWpCO0FBRUEsY0FBSXlTLFVBQUosRUFBZ0I7QUFDZCxnQkFBSWhHLFFBQVFsUCxTQUFTd1QsV0FBVCxDQUFxQjBCLFVBQXJCLENBQVo7QUFDQSxnQkFBSUMsUUFBUW5WLFNBQVNtTixXQUFULENBQ1JILFlBRFEsRUFDTSxZQUFZdkssRUFBWixHQUFpQixHQUR2QixDQUFaO0FBRUE7QUFDQXlNLGtCQUFNaE0sVUFBTixHQUFtQmlTLE1BQU12YyxNQUFOLEdBQWVvSCxTQUFTK1QsU0FBVCxDQUFtQm9CLE1BQU0sQ0FBTixDQUFuQixDQUFmLEdBQThDLEVBQWpFO0FBQ0FqRyxrQkFBTXhMLFlBQU4sR0FBcUIxRCxTQUFTbU4sV0FBVCxDQUNqQkgsWUFEaUIsRUFDSCxlQUFldkssRUFBZixHQUFvQixHQURqQixFQUVsQm9ILEdBRmtCLENBRWQ3SixTQUFTbVUsV0FGSyxDQUFyQjtBQUdBalAsd0JBQVk3QyxNQUFaLENBQW1CMUosSUFBbkIsQ0FBd0J1VyxLQUF4QjtBQUNBO0FBQ0Esb0JBQVFBLE1BQU1wYixJQUFOLENBQVd3ZixXQUFYLEVBQVI7QUFDRSxtQkFBSyxLQUFMO0FBQ0EsbUJBQUssUUFBTDtBQUNFcE8sNEJBQVkzQyxhQUFaLENBQTBCNUosSUFBMUIsQ0FBK0J1VyxNQUFNcGIsSUFBTixDQUFXd2YsV0FBWCxFQUEvQjtBQUNBO0FBQ0Y7QUFBUztBQUNQO0FBTko7QUFRRDtBQUNGO0FBQ0R0VCxpQkFBU21OLFdBQVQsQ0FBcUJILFlBQXJCLEVBQW1DLFdBQW5DLEVBQWdEM1UsT0FBaEQsQ0FBd0QsVUFBU3dhLElBQVQsRUFBZTtBQUNyRTNOLHNCQUFZNUMsZ0JBQVosQ0FBNkIzSixJQUE3QixDQUFrQ3FILFNBQVMyVCxXQUFULENBQXFCZCxJQUFyQixDQUFsQztBQUNELFNBRkQ7QUFHQTtBQUNBLGVBQU8zTixXQUFQO0FBQ0QsT0F2Q0Q7O0FBeUNBO0FBQ0E7QUFDQWxGLGVBQVNLLG1CQUFULEdBQStCLFVBQVMvSCxJQUFULEVBQWU2SCxJQUFmLEVBQXFCO0FBQ2xELFlBQUkzRyxNQUFNLEVBQVY7O0FBRUE7QUFDQUEsZUFBTyxPQUFPbEIsSUFBUCxHQUFjLEdBQXJCO0FBQ0FrQixlQUFPMkcsS0FBS2tDLE1BQUwsQ0FBWXpKLE1BQVosR0FBcUIsQ0FBckIsR0FBeUIsR0FBekIsR0FBK0IsR0FBdEMsQ0FMa0QsQ0FLUDtBQUMzQ1ksZUFBTyxxQkFBUDtBQUNBQSxlQUFPMkcsS0FBS2tDLE1BQUwsQ0FBWXdILEdBQVosQ0FBZ0IsVUFBU3FGLEtBQVQsRUFBZ0I7QUFDckMsY0FBSUEsTUFBTXZNLG9CQUFOLEtBQStCNEMsU0FBbkMsRUFBOEM7QUFDNUMsbUJBQU8ySixNQUFNdk0sb0JBQWI7QUFDRDtBQUNELGlCQUFPdU0sTUFBTXhNLFdBQWI7QUFDRCxTQUxNLEVBS0pnSixJQUxJLENBS0MsR0FMRCxJQUtRLE1BTGY7O0FBT0FsUyxlQUFPLHNCQUFQO0FBQ0FBLGVBQU8sNkJBQVA7O0FBRUE7QUFDQTJHLGFBQUtrQyxNQUFMLENBQVloSyxPQUFaLENBQW9CLFVBQVM2VyxLQUFULEVBQWdCO0FBQ2xDMVYsaUJBQU93RyxTQUFTMFQsV0FBVCxDQUFxQnhFLEtBQXJCLENBQVA7QUFDQTFWLGlCQUFPd0csU0FBU2lVLFNBQVQsQ0FBbUIvRSxLQUFuQixDQUFQO0FBQ0ExVixpQkFBT3dHLFNBQVNvVSxXQUFULENBQXFCbEYsS0FBckIsQ0FBUDtBQUNELFNBSkQ7QUFLQSxZQUFJa0csV0FBVyxDQUFmO0FBQ0FqVixhQUFLa0MsTUFBTCxDQUFZaEssT0FBWixDQUFvQixVQUFTNlcsS0FBVCxFQUFnQjtBQUNsQyxjQUFJQSxNQUFNa0csUUFBTixHQUFpQkEsUUFBckIsRUFBK0I7QUFDN0JBLHVCQUFXbEcsTUFBTWtHLFFBQWpCO0FBQ0Q7QUFDRixTQUpEO0FBS0EsWUFBSUEsV0FBVyxDQUFmLEVBQWtCO0FBQ2hCNWIsaUJBQU8sZ0JBQWdCNGIsUUFBaEIsR0FBMkIsTUFBbEM7QUFDRDtBQUNENWIsZUFBTyxnQkFBUDs7QUFFQTJHLGFBQUttQyxnQkFBTCxDQUFzQmpLLE9BQXRCLENBQThCLFVBQVNnZCxTQUFULEVBQW9CO0FBQ2hEN2IsaUJBQU93RyxTQUFTNFQsV0FBVCxDQUFxQnlCLFNBQXJCLENBQVA7QUFDRCxTQUZEO0FBR0E7QUFDQSxlQUFPN2IsR0FBUDtBQUNELE9BdkNEOztBQXlDQTtBQUNBO0FBQ0F3RyxlQUFTME8sMEJBQVQsR0FBc0MsVUFBUzFCLFlBQVQsRUFBdUI7QUFDM0QsWUFBSXNJLHFCQUFxQixFQUF6QjtBQUNBLFlBQUlwUSxjQUFjbEYsU0FBU2lOLGtCQUFULENBQTRCRCxZQUE1QixDQUFsQjtBQUNBLFlBQUl1SSxTQUFTclEsWUFBWTNDLGFBQVosQ0FBMEJQLE9BQTFCLENBQWtDLEtBQWxDLE1BQTZDLENBQUMsQ0FBM0Q7QUFDQSxZQUFJd1QsWUFBWXRRLFlBQVkzQyxhQUFaLENBQTBCUCxPQUExQixDQUFrQyxRQUFsQyxNQUFnRCxDQUFDLENBQWpFOztBQUVBO0FBQ0EsWUFBSXlULFFBQVF6VixTQUFTbU4sV0FBVCxDQUFxQkgsWUFBckIsRUFBbUMsU0FBbkMsRUFDWG5ELEdBRFcsQ0FDUCxVQUFTZ0osSUFBVCxFQUFlO0FBQ2xCLGlCQUFPN1MsU0FBU3FVLGNBQVQsQ0FBd0J4QixJQUF4QixDQUFQO0FBQ0QsU0FIVyxFQUlYcFIsTUFKVyxDQUlKLFVBQVNxUixLQUFULEVBQWdCO0FBQ3RCLGlCQUFPQSxNQUFNMEIsU0FBTixLQUFvQixPQUEzQjtBQUNELFNBTlcsQ0FBWjtBQU9BLFlBQUlrQixjQUFjRCxNQUFNN2MsTUFBTixHQUFlLENBQWYsSUFBb0I2YyxNQUFNLENBQU4sRUFBU3RVLElBQS9DO0FBQ0EsWUFBSXdVLGFBQUo7O0FBRUEsWUFBSUMsUUFBUTVWLFNBQVNtTixXQUFULENBQXFCSCxZQUFyQixFQUFtQyxrQkFBbkMsRUFDWG5ELEdBRFcsQ0FDUCxVQUFTZ0osSUFBVCxFQUFlO0FBQ2xCLGNBQUlDLFFBQVFELEtBQUs3RSxLQUFMLENBQVcsR0FBWCxDQUFaO0FBQ0E4RSxnQkFBTWphLEtBQU47QUFDQSxpQkFBT2lhLE1BQU1qSixHQUFOLENBQVUsVUFBU2tKLElBQVQsRUFBZTtBQUM5QixtQkFBT3RhLFNBQVNzYSxJQUFULEVBQWUsRUFBZixDQUFQO0FBQ0QsV0FGTSxDQUFQO0FBR0QsU0FQVyxDQUFaO0FBUUEsWUFBSTZDLE1BQU1oZCxNQUFOLEdBQWUsQ0FBZixJQUFvQmdkLE1BQU0sQ0FBTixFQUFTaGQsTUFBVCxHQUFrQixDQUF0QyxJQUEyQ2dkLE1BQU0sQ0FBTixFQUFTLENBQVQsTUFBZ0JGLFdBQS9ELEVBQTRFO0FBQzFFQywwQkFBZ0JDLE1BQU0sQ0FBTixFQUFTLENBQVQsQ0FBaEI7QUFDRDs7QUFFRDFRLG9CQUFZN0MsTUFBWixDQUFtQmhLLE9BQW5CLENBQTJCLFVBQVM2VyxLQUFULEVBQWdCO0FBQ3pDLGNBQUlBLE1BQU1wYixJQUFOLENBQVd3ZixXQUFYLE9BQTZCLEtBQTdCLElBQXNDcEUsTUFBTWhNLFVBQU4sQ0FBaUJDLEdBQTNELEVBQWdFO0FBQzlELGdCQUFJMFMsV0FBVztBQUNiMVUsb0JBQU11VSxXQURPO0FBRWJJLGdDQUFrQnJkLFNBQVN5VyxNQUFNaE0sVUFBTixDQUFpQkMsR0FBMUIsRUFBK0IsRUFBL0IsQ0FGTDtBQUdiL0IsbUJBQUs7QUFDSEQsc0JBQU13VTtBQURIO0FBSFEsYUFBZjtBQU9BTCwrQkFBbUIzYyxJQUFuQixDQUF3QmtkLFFBQXhCO0FBQ0EsZ0JBQUlOLE1BQUosRUFBWTtBQUNWTSx5QkFBV2xZLEtBQUtDLEtBQUwsQ0FBV0QsS0FBS29CLFNBQUwsQ0FBZThXLFFBQWYsQ0FBWCxDQUFYO0FBQ0FBLHVCQUFTRSxHQUFULEdBQWU7QUFDYjVVLHNCQUFNd1UsYUFETztBQUViSywyQkFBV1IsWUFBWSxZQUFaLEdBQTJCO0FBRnpCLGVBQWY7QUFJQUYsaUNBQW1CM2MsSUFBbkIsQ0FBd0JrZCxRQUF4QjtBQUNEO0FBQ0Y7QUFDRixTQW5CRDtBQW9CQSxZQUFJUCxtQkFBbUIxYyxNQUFuQixLQUE4QixDQUE5QixJQUFtQzhjLFdBQXZDLEVBQW9EO0FBQ2xESiw2QkFBbUIzYyxJQUFuQixDQUF3QjtBQUN0QndJLGtCQUFNdVU7QUFEZ0IsV0FBeEI7QUFHRDs7QUFFRDtBQUNBLFlBQUlPLFlBQVlqVyxTQUFTbU4sV0FBVCxDQUFxQkgsWUFBckIsRUFBbUMsSUFBbkMsQ0FBaEI7QUFDQSxZQUFJaUosVUFBVXJkLE1BQWQsRUFBc0I7QUFDcEIsY0FBSXFkLFVBQVUsQ0FBVixFQUFhalUsT0FBYixDQUFxQixTQUFyQixNQUFvQyxDQUF4QyxFQUEyQztBQUN6Q2lVLHdCQUFZeGQsU0FBU3dkLFVBQVUsQ0FBVixFQUFhbEksTUFBYixDQUFvQixDQUFwQixDQUFULEVBQWlDLEVBQWpDLENBQVo7QUFDRCxXQUZELE1BRU8sSUFBSWtJLFVBQVUsQ0FBVixFQUFhalUsT0FBYixDQUFxQixPQUFyQixNQUFrQyxDQUF0QyxFQUF5QztBQUM5QztBQUNBaVUsd0JBQVl4ZCxTQUFTd2QsVUFBVSxDQUFWLEVBQWFsSSxNQUFiLENBQW9CLENBQXBCLENBQVQsRUFBaUMsRUFBakMsSUFBdUMsSUFBdkMsR0FBOEMsSUFBOUMsR0FDTCxLQUFLLEVBQUwsR0FBVSxDQURqQjtBQUVELFdBSk0sTUFJQTtBQUNMa0ksd0JBQVkxUSxTQUFaO0FBQ0Q7QUFDRCtQLDZCQUFtQmpkLE9BQW5CLENBQTJCLFVBQVNpVSxNQUFULEVBQWlCO0FBQzFDQSxtQkFBTzRKLFVBQVAsR0FBb0JELFNBQXBCO0FBQ0QsV0FGRDtBQUdEO0FBQ0QsZUFBT1gsa0JBQVA7QUFDRCxPQXhFRDs7QUEwRUE7QUFDQXRWLGVBQVMyTyxtQkFBVCxHQUErQixVQUFTM0IsWUFBVCxFQUF1QjtBQUNwRCxZQUFJTCxpQkFBaUIsRUFBckI7O0FBRUEsWUFBSUYsS0FBSjtBQUNBO0FBQ0E7QUFDQSxZQUFJMEosYUFBYW5XLFNBQVNtTixXQUFULENBQXFCSCxZQUFyQixFQUFtQyxTQUFuQyxFQUNabkQsR0FEWSxDQUNSLFVBQVNnSixJQUFULEVBQWU7QUFDbEIsaUJBQU83UyxTQUFTcVUsY0FBVCxDQUF3QnhCLElBQXhCLENBQVA7QUFDRCxTQUhZLEVBSVpwUixNQUpZLENBSUwsVUFBUzJVLEdBQVQsRUFBYztBQUNwQixpQkFBT0EsSUFBSTVCLFNBQUosS0FBa0IsT0FBekI7QUFDRCxTQU5ZLEVBTVYsQ0FOVSxDQUFqQjtBQU9BLFlBQUkyQixVQUFKLEVBQWdCO0FBQ2R4Six5QkFBZUYsS0FBZixHQUF1QjBKLFdBQVc5TCxLQUFsQztBQUNBc0MseUJBQWV4TCxJQUFmLEdBQXNCZ1YsV0FBV2hWLElBQWpDO0FBQ0Q7O0FBRUQ7QUFDQTtBQUNBLFlBQUlrVixRQUFRclcsU0FBU21OLFdBQVQsQ0FBcUJILFlBQXJCLEVBQW1DLGNBQW5DLENBQVo7QUFDQUwsdUJBQWUyRSxXQUFmLEdBQTZCK0UsTUFBTXpkLE1BQU4sR0FBZSxDQUE1QztBQUNBK1QsdUJBQWVELFFBQWYsR0FBMEIySixNQUFNemQsTUFBTixLQUFpQixDQUEzQzs7QUFFQTtBQUNBO0FBQ0EsWUFBSTBkLE1BQU10VyxTQUFTbU4sV0FBVCxDQUFxQkgsWUFBckIsRUFBbUMsWUFBbkMsQ0FBVjtBQUNBTCx1QkFBZTJKLEdBQWYsR0FBcUJBLElBQUkxZCxNQUFKLEdBQWEsQ0FBbEM7O0FBRUEsZUFBTytULGNBQVA7QUFDRCxPQTlCRDs7QUFnQ0E7QUFDQTtBQUNBM00sZUFBU3VPLFNBQVQsR0FBcUIsVUFBU3ZCLFlBQVQsRUFBdUI7QUFDMUMsWUFBSThGLEtBQUo7QUFDQSxZQUFJamYsT0FBT21NLFNBQVNtTixXQUFULENBQXFCSCxZQUFyQixFQUFtQyxTQUFuQyxDQUFYO0FBQ0EsWUFBSW5aLEtBQUsrRSxNQUFMLEtBQWdCLENBQXBCLEVBQXVCO0FBQ3JCa2Esa0JBQVFqZixLQUFLLENBQUwsRUFBUWthLE1BQVIsQ0FBZSxDQUFmLEVBQWtCQyxLQUFsQixDQUF3QixHQUF4QixDQUFSO0FBQ0EsaUJBQU8sRUFBQzNZLFFBQVF5ZCxNQUFNLENBQU4sQ0FBVCxFQUFtQjlSLE9BQU84UixNQUFNLENBQU4sQ0FBMUIsRUFBUDtBQUNEO0FBQ0QsWUFBSXlELFFBQVF2VyxTQUFTbU4sV0FBVCxDQUFxQkgsWUFBckIsRUFBbUMsU0FBbkMsRUFDWG5ELEdBRFcsQ0FDUCxVQUFTZ0osSUFBVCxFQUFlO0FBQ2xCLGlCQUFPN1MsU0FBU3FVLGNBQVQsQ0FBd0J4QixJQUF4QixDQUFQO0FBQ0QsU0FIVyxFQUlYcFIsTUFKVyxDQUlKLFVBQVNxUixLQUFULEVBQWdCO0FBQ3RCLGlCQUFPQSxNQUFNMEIsU0FBTixLQUFvQixNQUEzQjtBQUNELFNBTlcsQ0FBWjtBQU9BLFlBQUkrQixNQUFNM2QsTUFBTixHQUFlLENBQW5CLEVBQXNCO0FBQ3BCa2Esa0JBQVF5RCxNQUFNLENBQU4sRUFBU2xNLEtBQVQsQ0FBZTJELEtBQWYsQ0FBcUIsR0FBckIsQ0FBUjtBQUNBLGlCQUFPLEVBQUMzWSxRQUFReWQsTUFBTSxDQUFOLENBQVQsRUFBbUI5UixPQUFPOFIsTUFBTSxDQUFOLENBQTFCLEVBQVA7QUFDRDtBQUNGLE9BbEJEOztBQW9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOVMsZUFBUzJILGlCQUFULEdBQTZCLFlBQVc7QUFDdEMsZUFBT25FLEtBQUtrUCxNQUFMLEdBQWNDLFFBQWQsR0FBeUI1RSxNQUF6QixDQUFnQyxDQUFoQyxFQUFtQyxFQUFuQyxDQUFQO0FBQ0QsT0FGRDs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBL04sZUFBUzBRLHVCQUFULEdBQW1DLFVBQVM4RixNQUFULEVBQWlCQyxPQUFqQixFQUEwQjtBQUMzRCxZQUFJQyxTQUFKO0FBQ0EsWUFBSUMsVUFBVUYsWUFBWWxSLFNBQVosR0FBd0JrUixPQUF4QixHQUFrQyxDQUFoRDtBQUNBLFlBQUlELE1BQUosRUFBWTtBQUNWRSxzQkFBWUYsTUFBWjtBQUNELFNBRkQsTUFFTztBQUNMRSxzQkFBWTFXLFNBQVMySCxpQkFBVCxFQUFaO0FBQ0Q7QUFDRDtBQUNBLGVBQU8sWUFDSCxzQkFERyxHQUNzQitPLFNBRHRCLEdBQ2tDLEdBRGxDLEdBQ3dDQyxPQUR4QyxHQUNrRCx1QkFEbEQsR0FFSCxTQUZHLEdBR0gsV0FISjtBQUlELE9BYkQ7O0FBZUEzVyxlQUFTQyxpQkFBVCxHQUE2QixVQUFTQyxXQUFULEVBQXNCQyxJQUF0QixFQUE0Qm5MLElBQTVCLEVBQWtDSyxNQUFsQyxFQUEwQztBQUNyRSxZQUFJbUUsTUFBTXdHLFNBQVNLLG1CQUFULENBQTZCSCxZQUFZNUgsSUFBekMsRUFBK0M2SCxJQUEvQyxDQUFWOztBQUVBO0FBQ0EzRyxlQUFPd0csU0FBU00sa0JBQVQsQ0FDSEosWUFBWUssV0FBWixDQUF3QkMsa0JBQXhCLEVBREcsQ0FBUDs7QUFHQTtBQUNBaEgsZUFBT3dHLFNBQVNTLG1CQUFULENBQ0hQLFlBQVlRLGFBQVosQ0FBMEJGLGtCQUExQixFQURHLEVBRUh4TCxTQUFTLE9BQVQsR0FBbUIsU0FBbkIsR0FBK0IsUUFGNUIsQ0FBUDs7QUFJQXdFLGVBQU8sV0FBVzBHLFlBQVlTLEdBQXZCLEdBQTZCLE1BQXBDOztBQUVBLFlBQUlULFlBQVlrTyxTQUFoQixFQUEyQjtBQUN6QjVVLGlCQUFPLE9BQU8wRyxZQUFZa08sU0FBbkIsR0FBK0IsTUFBdEM7QUFDRCxTQUZELE1BRU8sSUFBSWxPLFlBQVlVLFNBQVosSUFBeUJWLFlBQVlXLFdBQXpDLEVBQXNEO0FBQzNEckgsaUJBQU8sZ0JBQVA7QUFDRCxTQUZNLE1BRUEsSUFBSTBHLFlBQVlVLFNBQWhCLEVBQTJCO0FBQ2hDcEgsaUJBQU8sZ0JBQVA7QUFDRCxTQUZNLE1BRUEsSUFBSTBHLFlBQVlXLFdBQWhCLEVBQTZCO0FBQ2xDckgsaUJBQU8sZ0JBQVA7QUFDRCxTQUZNLE1BRUE7QUFDTEEsaUJBQU8sZ0JBQVA7QUFDRDs7QUFFRCxZQUFJMEcsWUFBWVUsU0FBaEIsRUFBMkI7QUFDekI7QUFDQSxjQUFJSyxPQUFPLFVBQVU1TCxPQUFPK0IsRUFBakIsR0FBc0IsR0FBdEIsR0FDUDhJLFlBQVlVLFNBQVosQ0FBc0JJLEtBQXRCLENBQTRCNUosRUFEckIsR0FDMEIsTUFEckM7QUFFQW9DLGlCQUFPLE9BQU95SCxJQUFkOztBQUVBO0FBQ0F6SCxpQkFBTyxZQUFZMEcsWUFBWWdCLHNCQUFaLENBQW1DLENBQW5DLEVBQXNDQyxJQUFsRCxHQUNILEdBREcsR0FDR0YsSUFEVjtBQUVBLGNBQUlmLFlBQVlnQixzQkFBWixDQUFtQyxDQUFuQyxFQUFzQ0UsR0FBMUMsRUFBK0M7QUFDN0M1SCxtQkFBTyxZQUFZMEcsWUFBWWdCLHNCQUFaLENBQW1DLENBQW5DLEVBQXNDRSxHQUF0QyxDQUEwQ0QsSUFBdEQsR0FDSCxHQURHLEdBQ0dGLElBRFY7QUFFQXpILG1CQUFPLHNCQUNIMEcsWUFBWWdCLHNCQUFaLENBQW1DLENBQW5DLEVBQXNDQyxJQURuQyxHQUMwQyxHQUQxQyxHQUVIakIsWUFBWWdCLHNCQUFaLENBQW1DLENBQW5DLEVBQXNDRSxHQUF0QyxDQUEwQ0QsSUFGdkMsR0FHSCxNQUhKO0FBSUQ7QUFDRjtBQUNEO0FBQ0EzSCxlQUFPLFlBQVkwRyxZQUFZZ0Isc0JBQVosQ0FBbUMsQ0FBbkMsRUFBc0NDLElBQWxELEdBQ0gsU0FERyxHQUNTbkIsU0FBU3FCLFVBRGxCLEdBQytCLE1BRHRDO0FBRUEsWUFBSW5CLFlBQVlVLFNBQVosSUFBeUJWLFlBQVlnQixzQkFBWixDQUFtQyxDQUFuQyxFQUFzQ0UsR0FBbkUsRUFBd0U7QUFDdEU1SCxpQkFBTyxZQUFZMEcsWUFBWWdCLHNCQUFaLENBQW1DLENBQW5DLEVBQXNDRSxHQUF0QyxDQUEwQ0QsSUFBdEQsR0FDSCxTQURHLEdBQ1NuQixTQUFTcUIsVUFEbEIsR0FDK0IsTUFEdEM7QUFFRDtBQUNELGVBQU83SCxHQUFQO0FBQ0QsT0FwREQ7O0FBc0RBO0FBQ0F3RyxlQUFTcU8sWUFBVCxHQUF3QixVQUFTckIsWUFBVCxFQUF1QkYsV0FBdkIsRUFBb0M7QUFDMUQ7QUFDQSxZQUFJbUIsUUFBUWpPLFNBQVNrTyxVQUFULENBQW9CbEIsWUFBcEIsQ0FBWjtBQUNBLGFBQUssSUFBSTlQLElBQUksQ0FBYixFQUFnQkEsSUFBSStRLE1BQU1yVixNQUExQixFQUFrQ3NFLEdBQWxDLEVBQXVDO0FBQ3JDLGtCQUFRK1EsTUFBTS9RLENBQU4sQ0FBUjtBQUNFLGlCQUFLLFlBQUw7QUFDQSxpQkFBSyxZQUFMO0FBQ0EsaUJBQUssWUFBTDtBQUNBLGlCQUFLLFlBQUw7QUFDRSxxQkFBTytRLE1BQU0vUSxDQUFOLEVBQVM2USxNQUFULENBQWdCLENBQWhCLENBQVA7QUFDRjtBQUNFO0FBUEo7QUFTRDtBQUNELFlBQUlqQixXQUFKLEVBQWlCO0FBQ2YsaUJBQU85TSxTQUFTcU8sWUFBVCxDQUFzQnZCLFdBQXRCLENBQVA7QUFDRDtBQUNELGVBQU8sVUFBUDtBQUNELE9BbEJEOztBQW9CQTlNLGVBQVNtTyxPQUFULEdBQW1CLFVBQVNuQixZQUFULEVBQXVCO0FBQ3hDLFlBQUlpQixRQUFRak8sU0FBU2tPLFVBQVQsQ0FBb0JsQixZQUFwQixDQUFaO0FBQ0EsWUFBSWlJLFFBQVFoSCxNQUFNLENBQU4sRUFBU0QsS0FBVCxDQUFlLEdBQWYsQ0FBWjtBQUNBLGVBQU9pSCxNQUFNLENBQU4sRUFBU2xILE1BQVQsQ0FBZ0IsQ0FBaEIsQ0FBUDtBQUNELE9BSkQ7O0FBTUEvTixlQUFTcU4sVUFBVCxHQUFzQixVQUFTTCxZQUFULEVBQXVCO0FBQzNDLGVBQU9BLGFBQWFnQixLQUFiLENBQW1CLEdBQW5CLEVBQXdCLENBQXhCLEVBQTJCLENBQTNCLE1BQWtDLEdBQXpDO0FBQ0QsT0FGRDs7QUFJQWhPLGVBQVM0VyxVQUFULEdBQXNCLFVBQVM1SixZQUFULEVBQXVCO0FBQzNDLFlBQUlpQixRQUFRak8sU0FBU2tPLFVBQVQsQ0FBb0JsQixZQUFwQixDQUFaO0FBQ0EsWUFBSThGLFFBQVE3RSxNQUFNLENBQU4sRUFBU0YsTUFBVCxDQUFnQixDQUFoQixFQUFtQkMsS0FBbkIsQ0FBeUIsR0FBekIsQ0FBWjtBQUNBLGVBQU87QUFDTDFWLGdCQUFNd2EsTUFBTSxDQUFOLENBREQ7QUFFTGpPLGdCQUFNcE0sU0FBU3FhLE1BQU0sQ0FBTixDQUFULEVBQW1CLEVBQW5CLENBRkQ7QUFHTC9OLG9CQUFVK04sTUFBTSxDQUFOLENBSEw7QUFJTCtELGVBQUsvRCxNQUFNZ0UsS0FBTixDQUFZLENBQVosRUFBZXBMLElBQWYsQ0FBb0IsR0FBcEI7QUFKQSxTQUFQO0FBTUQsT0FURDs7QUFXQTFMLGVBQVMrVyxVQUFULEdBQXNCLFVBQVMvSixZQUFULEVBQXVCO0FBQzNDLFlBQUk2RixPQUFPN1MsU0FBU21OLFdBQVQsQ0FBcUJILFlBQXJCLEVBQW1DLElBQW5DLEVBQXlDLENBQXpDLENBQVg7QUFDQSxZQUFJOEYsUUFBUUQsS0FBSzlFLE1BQUwsQ0FBWSxDQUFaLEVBQWVDLEtBQWYsQ0FBcUIsR0FBckIsQ0FBWjtBQUNBLGVBQU87QUFDTGdKLG9CQUFVbEUsTUFBTSxDQUFOLENBREw7QUFFTDRELHFCQUFXNUQsTUFBTSxDQUFOLENBRk47QUFHTG1FLDBCQUFnQnhlLFNBQVNxYSxNQUFNLENBQU4sQ0FBVCxFQUFtQixFQUFuQixDQUhYO0FBSUxvRSxtQkFBU3BFLE1BQU0sQ0FBTixDQUpKO0FBS0xxRSx1QkFBYXJFLE1BQU0sQ0FBTixDQUxSO0FBTUxzRSxtQkFBU3RFLE1BQU0sQ0FBTjtBQU5KLFNBQVA7QUFRRCxPQVhEOztBQWFBO0FBQ0EsVUFBSSxRQUFPNVQsTUFBUCx5Q0FBT0EsTUFBUCxPQUFrQixRQUF0QixFQUFnQztBQUM5QkEsZUFBT0QsT0FBUCxHQUFpQmUsUUFBakI7QUFDRDtBQUVBLEtBdHFCYyxFQXNxQmIsRUF0cUJhLENBeHZEMnhCLEVBODVFcHlCLEdBQUUsQ0FBQyxVQUFTTCxPQUFULEVBQWlCVCxNQUFqQixFQUF3QkQsT0FBeEIsRUFBZ0M7QUFDekMsT0FBQyxVQUFVb1ksTUFBVixFQUFpQjtBQUNsQjs7Ozs7OztBQU9DOztBQUVEOztBQUVBLFlBQUlDLGlCQUFpQjNYLFFBQVEsc0JBQVIsQ0FBckI7QUFDQVQsZUFBT0QsT0FBUCxHQUFpQnFZLGVBQWUsRUFBQ3ZnQixRQUFRc2dCLE9BQU90Z0IsTUFBaEIsRUFBZixDQUFqQjtBQUVDLE9BZkQsRUFlR2dKLElBZkgsQ0FlUSxJQWZSLEVBZWEsT0FBT3NYLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0NBLE1BQWhDLEdBQXlDLE9BQU9FLElBQVAsS0FBZ0IsV0FBaEIsR0FBOEJBLElBQTlCLEdBQXFDLE9BQU94Z0IsTUFBUCxLQUFrQixXQUFsQixHQUFnQ0EsTUFBaEMsR0FBeUMsRUFmcEk7QUFnQkMsS0FqQk8sRUFpQk4sRUFBQyx3QkFBdUIsQ0FBeEIsRUFqQk0sQ0E5NUVreUIsRUErNkU1d0IsR0FBRSxDQUFDLFVBQVM0SSxPQUFULEVBQWlCVCxNQUFqQixFQUF3QkQsT0FBeEIsRUFBZ0M7QUFDakU7Ozs7Ozs7QUFPQzs7QUFFRDs7QUFFQSxVQUFJdVksUUFBUTdYLFFBQVEsU0FBUixDQUFaO0FBQ0E7QUFDQVQsYUFBT0QsT0FBUCxHQUFpQixVQUFTd1ksWUFBVCxFQUF1QkMsSUFBdkIsRUFBNkI7QUFDNUMsWUFBSTNnQixTQUFTMGdCLGdCQUFnQkEsYUFBYTFnQixNQUExQzs7QUFFQSxZQUFJNGdCLFVBQVU7QUFDWkMsc0JBQVksSUFEQTtBQUVaQyx1QkFBYSxJQUZEO0FBR1pDLG9CQUFVLElBSEU7QUFJWkMsc0JBQVk7QUFKQSxTQUFkOztBQU9BLGFBQUssSUFBSUMsR0FBVCxJQUFnQk4sSUFBaEIsRUFBc0I7QUFDcEIsY0FBSU8sZUFBZWxZLElBQWYsQ0FBb0IyWCxJQUFwQixFQUEwQk0sR0FBMUIsQ0FBSixFQUFvQztBQUNsQ0wsb0JBQVFLLEdBQVIsSUFBZU4sS0FBS00sR0FBTCxDQUFmO0FBQ0Q7QUFDRjs7QUFFRDtBQUNBLFlBQUlFLFVBQVVWLE1BQU10aUIsR0FBcEI7QUFDQSxZQUFJaWpCLGlCQUFpQlgsTUFBTVksYUFBTixDQUFvQnJoQixNQUFwQixDQUFyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBSXNoQixhQUFhMVksUUFBUSxzQkFBUixLQUFtQyxJQUFwRDtBQUNBLFlBQUkyWSxXQUFXM1ksUUFBUSxrQkFBUixLQUErQixJQUE5QztBQUNBLFlBQUk0WSxjQUFjNVksUUFBUSx3QkFBUixLQUFxQyxJQUF2RDtBQUNBLFlBQUk2WSxhQUFhN1ksUUFBUSxzQkFBUixLQUFtQyxJQUFwRDtBQUNBLFlBQUk4WSxhQUFhOVksUUFBUSxlQUFSLEtBQTRCLElBQTdDOztBQUVBO0FBQ0EsWUFBSStZLFVBQVU7QUFDWlAsMEJBQWdCQSxjQURKO0FBRVpNLHNCQUFZQSxVQUZBO0FBR1pFLDBCQUFnQm5CLE1BQU1tQixjQUhWO0FBSVpDLHNCQUFZcEIsTUFBTW9CLFVBSk47QUFLWkMsMkJBQWlCckIsTUFBTXFCO0FBTFgsU0FBZDs7QUFRQTtBQUNBLGdCQUFRVixlQUFlemIsT0FBdkI7QUFDRSxlQUFLLFFBQUw7QUFDRSxnQkFBSSxDQUFDMmIsVUFBRCxJQUFlLENBQUNBLFdBQVdTLGtCQUEzQixJQUNBLENBQUNuQixRQUFRQyxVQURiLEVBQ3lCO0FBQ3ZCTSxzQkFBUSxzREFBUjtBQUNBLHFCQUFPUSxPQUFQO0FBQ0Q7QUFDRFIsb0JBQVEsNkJBQVI7QUFDQTtBQUNBUSxvQkFBUUssV0FBUixHQUFzQlYsVUFBdEI7QUFDQUksdUJBQVdPLG1CQUFYLENBQStCamlCLE1BQS9COztBQUVBc2hCLHVCQUFXWSxnQkFBWCxDQUE0QmxpQixNQUE1QjtBQUNBc2hCLHVCQUFXYSxlQUFYLENBQTJCbmlCLE1BQTNCO0FBQ0FzaEIsdUJBQVdjLGdCQUFYLENBQTRCcGlCLE1BQTVCO0FBQ0FzaEIsdUJBQVdTLGtCQUFYLENBQThCL2hCLE1BQTlCO0FBQ0FzaEIsdUJBQVdlLFdBQVgsQ0FBdUJyaUIsTUFBdkI7QUFDQXNoQix1QkFBV2dCLHVCQUFYLENBQW1DdGlCLE1BQW5DO0FBQ0FzaEIsdUJBQVdpQixzQkFBWCxDQUFrQ3ZpQixNQUFsQzs7QUFFQTBoQix1QkFBV2MsbUJBQVgsQ0FBK0J4aUIsTUFBL0I7QUFDQTBoQix1QkFBV2Usa0JBQVgsQ0FBOEJ6aUIsTUFBOUI7QUFDQTBoQix1QkFBV2dCLHNCQUFYLENBQWtDMWlCLE1BQWxDO0FBQ0E7QUFDRixlQUFLLFNBQUw7QUFDRSxnQkFBSSxDQUFDd2hCLFdBQUQsSUFBZ0IsQ0FBQ0EsWUFBWU8sa0JBQTdCLElBQ0EsQ0FBQ25CLFFBQVFFLFdBRGIsRUFDMEI7QUFDeEJLLHNCQUFRLHVEQUFSO0FBQ0EscUJBQU9RLE9BQVA7QUFDRDtBQUNEUixvQkFBUSw4QkFBUjtBQUNBO0FBQ0FRLG9CQUFRSyxXQUFSLEdBQXNCUixXQUF0QjtBQUNBRSx1QkFBV08sbUJBQVgsQ0FBK0JqaUIsTUFBL0I7O0FBRUF3aEIsd0JBQVlVLGdCQUFaLENBQTZCbGlCLE1BQTdCO0FBQ0F3aEIsd0JBQVlZLGdCQUFaLENBQTZCcGlCLE1BQTdCO0FBQ0F3aEIsd0JBQVlPLGtCQUFaLENBQStCL2hCLE1BQS9CO0FBQ0F3aEIsd0JBQVlhLFdBQVosQ0FBd0JyaUIsTUFBeEI7QUFDQXdoQix3QkFBWW1CLGdCQUFaLENBQTZCM2lCLE1BQTdCOztBQUVBMGhCLHVCQUFXYyxtQkFBWCxDQUErQnhpQixNQUEvQjtBQUNBMGhCLHVCQUFXZSxrQkFBWCxDQUE4QnppQixNQUE5QjtBQUNBMGhCLHVCQUFXZ0Isc0JBQVgsQ0FBa0MxaUIsTUFBbEM7QUFDQTtBQUNGLGVBQUssTUFBTDtBQUNFLGdCQUFJLENBQUN1aEIsUUFBRCxJQUFhLENBQUNBLFNBQVNRLGtCQUF2QixJQUE2QyxDQUFDbkIsUUFBUUcsUUFBMUQsRUFBb0U7QUFDbEVJLHNCQUFRLHVEQUFSO0FBQ0EscUJBQU9RLE9BQVA7QUFDRDtBQUNEUixvQkFBUSwyQkFBUjtBQUNBO0FBQ0FRLG9CQUFRSyxXQUFSLEdBQXNCVCxRQUF0QjtBQUNBRyx1QkFBV08sbUJBQVgsQ0FBK0JqaUIsTUFBL0I7O0FBRUF1aEIscUJBQVNXLGdCQUFULENBQTBCbGlCLE1BQTFCO0FBQ0F1aEIscUJBQVNRLGtCQUFULENBQTRCL2hCLE1BQTVCO0FBQ0F1aEIscUJBQVNxQixnQkFBVCxDQUEwQjVpQixNQUExQjs7QUFFQTs7QUFFQTBoQix1QkFBV2Usa0JBQVgsQ0FBOEJ6aUIsTUFBOUI7QUFDQTBoQix1QkFBV2dCLHNCQUFYLENBQWtDMWlCLE1BQWxDO0FBQ0E7QUFDRixlQUFLLFFBQUw7QUFDRSxnQkFBSSxDQUFDeWhCLFVBQUQsSUFBZSxDQUFDYixRQUFRSSxVQUE1QixFQUF3QztBQUN0Q0csc0JBQVEsc0RBQVI7QUFDQSxxQkFBT1EsT0FBUDtBQUNEO0FBQ0RSLG9CQUFRLDZCQUFSO0FBQ0E7QUFDQVEsb0JBQVFLLFdBQVIsR0FBc0JQLFVBQXRCO0FBQ0FDLHVCQUFXTyxtQkFBWCxDQUErQmppQixNQUEvQjs7QUFFQXloQix1QkFBV29CLG9CQUFYLENBQWdDN2lCLE1BQWhDO0FBQ0F5aEIsdUJBQVdxQixnQkFBWCxDQUE0QjlpQixNQUE1QjtBQUNBeWhCLHVCQUFXc0IsbUJBQVgsQ0FBK0IvaUIsTUFBL0I7QUFDQXloQix1QkFBV3VCLG9CQUFYLENBQWdDaGpCLE1BQWhDO0FBQ0F5aEIsdUJBQVd3Qix5QkFBWCxDQUFxQ2pqQixNQUFyQztBQUNBeWhCLHVCQUFXUyxnQkFBWCxDQUE0QmxpQixNQUE1QjtBQUNBeWhCLHVCQUFXeUIscUJBQVgsQ0FBaUNsakIsTUFBakM7O0FBRUEwaEIsdUJBQVdjLG1CQUFYLENBQStCeGlCLE1BQS9CO0FBQ0EwaEIsdUJBQVdlLGtCQUFYLENBQThCemlCLE1BQTlCO0FBQ0EwaEIsdUJBQVdnQixzQkFBWCxDQUFrQzFpQixNQUFsQztBQUNBO0FBQ0Y7QUFDRW1oQixvQkFBUSxzQkFBUjtBQUNBO0FBeEZKOztBQTJGQSxlQUFPUSxPQUFQO0FBQ0QsT0F2SUQ7QUF5SUMsS0F2SitCLEVBdUo5QixFQUFDLHdCQUF1QixDQUF4QixFQUEwQixpQkFBZ0IsQ0FBMUMsRUFBNEMsb0JBQW1CLENBQS9ELEVBQWlFLDBCQUF5QixFQUExRixFQUE2Rix3QkFBdUIsRUFBcEgsRUFBdUgsV0FBVSxFQUFqSSxFQXZKOEIsQ0EvNkUwd0IsRUFza0ZscUIsR0FBRSxDQUFDLFVBQVMvWSxPQUFULEVBQWlCVCxNQUFqQixFQUF3QkQsT0FBeEIsRUFBZ0M7O0FBRTNLOzs7Ozs7O0FBT0M7QUFDRDs7QUFDQSxVQUFJdVksUUFBUTdYLFFBQVEsYUFBUixDQUFaO0FBQ0EsVUFBSXVZLFVBQVVWLE1BQU10aUIsR0FBcEI7O0FBRUFnSyxhQUFPRCxPQUFQLEdBQWlCO0FBQ2ZnYSwwQkFBa0J0WixRQUFRLGdCQUFSLENBREg7QUFFZnVaLHlCQUFpQix5QkFBU25pQixNQUFULEVBQWlCO0FBQ2hDQSxpQkFBT3FZLFdBQVAsR0FBcUJyWSxPQUFPcVksV0FBUCxJQUFzQnJZLE9BQU9takIsaUJBQWxEO0FBQ0QsU0FKYzs7QUFNZmQscUJBQWEscUJBQVNyaUIsTUFBVCxFQUFpQjtBQUM1QixjQUFJLFFBQU9BLE1BQVAseUNBQU9BLE1BQVAsT0FBa0IsUUFBbEIsSUFBOEJBLE9BQU80QyxpQkFBckMsSUFBMEQsRUFBRSxhQUM1RDVDLE9BQU80QyxpQkFBUCxDQUF5Qm9PLFNBRGlDLENBQTlELEVBQ3lDO0FBQ3ZDakssbUJBQU9zTSxjQUFQLENBQXNCclQsT0FBTzRDLGlCQUFQLENBQXlCb08sU0FBL0MsRUFBMEQsU0FBMUQsRUFBcUU7QUFDbkVzSCxtQkFBSyxlQUFXO0FBQ2QsdUJBQU8sS0FBSzhLLFFBQVo7QUFDRCxlQUhrRTtBQUluRTlILG1CQUFLLGFBQVNyVCxDQUFULEVBQVk7QUFDZixvQkFBSSxLQUFLbWIsUUFBVCxFQUFtQjtBQUNqQix1QkFBS3ZQLG1CQUFMLENBQXlCLE9BQXpCLEVBQWtDLEtBQUt1UCxRQUF2QztBQUNEO0FBQ0QscUJBQUsxUSxnQkFBTCxDQUFzQixPQUF0QixFQUErQixLQUFLMFEsUUFBTCxHQUFnQm5iLENBQS9DO0FBQ0Q7QUFUa0UsYUFBckU7QUFXQSxnQkFBSW9iLDJCQUNBcmpCLE9BQU80QyxpQkFBUCxDQUF5Qm9PLFNBQXpCLENBQW1Dbk8sb0JBRHZDO0FBRUE3QyxtQkFBTzRDLGlCQUFQLENBQXlCb08sU0FBekIsQ0FBbUNuTyxvQkFBbkMsR0FBMEQsWUFBVztBQUNuRSxrQkFBSW9NLEtBQUssSUFBVDtBQUNBLGtCQUFJLENBQUNBLEdBQUdxVSxZQUFSLEVBQXNCO0FBQ3BCclUsbUJBQUdxVSxZQUFILEdBQWtCLFVBQVMxZixDQUFULEVBQVk7QUFDNUI7QUFDQTtBQUNBQSxvQkFBRXRGLE1BQUYsQ0FBU29VLGdCQUFULENBQTBCLFVBQTFCLEVBQXNDLFVBQVM2USxFQUFULEVBQWE7QUFDakQsd0JBQUlyVSxRQUFKO0FBQ0Esd0JBQUlsUCxPQUFPNEMsaUJBQVAsQ0FBeUJvTyxTQUF6QixDQUFtQ2tDLFlBQXZDLEVBQXFEO0FBQ25EaEUsaUNBQVdELEdBQUdpRSxZQUFILEdBQWtCdkYsSUFBbEIsQ0FBdUIsVUFBU3BGLENBQVQsRUFBWTtBQUM1QywrQkFBT0EsRUFBRTBCLEtBQUYsSUFBVzFCLEVBQUUwQixLQUFGLENBQVE1SixFQUFSLEtBQWVrakIsR0FBR3RaLEtBQUgsQ0FBUzVKLEVBQTFDO0FBQ0QsdUJBRlUsQ0FBWDtBQUdELHFCQUpELE1BSU87QUFDTDZPLGlDQUFXLEVBQUNqRixPQUFPc1osR0FBR3RaLEtBQVgsRUFBWDtBQUNEOztBQUVELHdCQUFJL0osUUFBUSxJQUFJa1AsS0FBSixDQUFVLE9BQVYsQ0FBWjtBQUNBbFAsMEJBQU0rSixLQUFOLEdBQWNzWixHQUFHdFosS0FBakI7QUFDQS9KLDBCQUFNZ1AsUUFBTixHQUFpQkEsUUFBakI7QUFDQWhQLDBCQUFNaUosV0FBTixHQUFvQixFQUFDK0YsVUFBVUEsUUFBWCxFQUFwQjtBQUNBaFAsMEJBQU1rRSxPQUFOLEdBQWdCLENBQUNSLEVBQUV0RixNQUFILENBQWhCO0FBQ0EyUSx1QkFBR0wsYUFBSCxDQUFpQjFPLEtBQWpCO0FBQ0QsbUJBaEJEO0FBaUJBMEQsb0JBQUV0RixNQUFGLENBQVNnVSxTQUFULEdBQXFCaFIsT0FBckIsQ0FBNkIsVUFBUzJJLEtBQVQsRUFBZ0I7QUFDM0Msd0JBQUlpRixRQUFKO0FBQ0Esd0JBQUlsUCxPQUFPNEMsaUJBQVAsQ0FBeUJvTyxTQUF6QixDQUFtQ2tDLFlBQXZDLEVBQXFEO0FBQ25EaEUsaUNBQVdELEdBQUdpRSxZQUFILEdBQWtCdkYsSUFBbEIsQ0FBdUIsVUFBU3BGLENBQVQsRUFBWTtBQUM1QywrQkFBT0EsRUFBRTBCLEtBQUYsSUFBVzFCLEVBQUUwQixLQUFGLENBQVE1SixFQUFSLEtBQWU0SixNQUFNNUosRUFBdkM7QUFDRCx1QkFGVSxDQUFYO0FBR0QscUJBSkQsTUFJTztBQUNMNk8saUNBQVcsRUFBQ2pGLE9BQU9BLEtBQVIsRUFBWDtBQUNEO0FBQ0Qsd0JBQUkvSixRQUFRLElBQUlrUCxLQUFKLENBQVUsT0FBVixDQUFaO0FBQ0FsUCwwQkFBTStKLEtBQU4sR0FBY0EsS0FBZDtBQUNBL0osMEJBQU1nUCxRQUFOLEdBQWlCQSxRQUFqQjtBQUNBaFAsMEJBQU1pSixXQUFOLEdBQW9CLEVBQUMrRixVQUFVQSxRQUFYLEVBQXBCO0FBQ0FoUCwwQkFBTWtFLE9BQU4sR0FBZ0IsQ0FBQ1IsRUFBRXRGLE1BQUgsQ0FBaEI7QUFDQTJRLHVCQUFHTCxhQUFILENBQWlCMU8sS0FBakI7QUFDRCxtQkFmRDtBQWdCRCxpQkFwQ0Q7QUFxQ0ErTyxtQkFBR3lELGdCQUFILENBQW9CLFdBQXBCLEVBQWlDekQsR0FBR3FVLFlBQXBDO0FBQ0Q7QUFDRCxxQkFBT0QseUJBQXlCM0gsS0FBekIsQ0FBK0J6TSxFQUEvQixFQUFtQ3FLLFNBQW5DLENBQVA7QUFDRCxhQTNDRDtBQTRDRCxXQTNERCxNQTJETyxJQUFJLEVBQUUsdUJBQXVCdFosTUFBekIsQ0FBSixFQUFzQztBQUMzQ3lnQixrQkFBTStDLHVCQUFOLENBQThCeGpCLE1BQTlCLEVBQXNDLE9BQXRDLEVBQStDLFVBQVM0RCxDQUFULEVBQVk7QUFDekQsa0JBQUksQ0FBQ0EsRUFBRXVGLFdBQVAsRUFBb0I7QUFDbEJ2RixrQkFBRXVGLFdBQUYsR0FBZ0IsRUFBQytGLFVBQVV0TCxFQUFFc0wsUUFBYixFQUFoQjtBQUNEO0FBQ0QscUJBQU90TCxDQUFQO0FBQ0QsYUFMRDtBQU1EO0FBQ0YsU0ExRWM7O0FBNEVmMmUsZ0NBQXdCLGdDQUFTdmlCLE1BQVQsRUFBaUI7QUFDdkM7QUFDQSxjQUFJLFFBQU9BLE1BQVAseUNBQU9BLE1BQVAsT0FBa0IsUUFBbEIsSUFBOEJBLE9BQU80QyxpQkFBckMsSUFDQSxFQUFFLGdCQUFnQjVDLE9BQU80QyxpQkFBUCxDQUF5Qm9PLFNBQTNDLENBREEsSUFFQSxzQkFBc0JoUixPQUFPNEMsaUJBQVAsQ0FBeUJvTyxTQUZuRCxFQUU4RDtBQUM1RCxnQkFBSXlTLHFCQUFxQixTQUFyQkEsa0JBQXFCLENBQVN4VSxFQUFULEVBQWFoRixLQUFiLEVBQW9CO0FBQzNDLHFCQUFPO0FBQ0xBLHVCQUFPQSxLQURGO0FBRUwsb0JBQUl5WixJQUFKLEdBQVc7QUFDVCxzQkFBSSxLQUFLQyxLQUFMLEtBQWVuVixTQUFuQixFQUE4QjtBQUM1Qix3QkFBSXZFLE1BQU0xSSxJQUFOLEtBQWUsT0FBbkIsRUFBNEI7QUFDMUIsMkJBQUtvaUIsS0FBTCxHQUFhMVUsR0FBRzJVLGdCQUFILENBQW9CM1osS0FBcEIsQ0FBYjtBQUNELHFCQUZELE1BRU87QUFDTCwyQkFBSzBaLEtBQUwsR0FBYSxJQUFiO0FBQ0Q7QUFDRjtBQUNELHlCQUFPLEtBQUtBLEtBQVo7QUFDRCxpQkFYSTtBQVlMRSxxQkFBSzVVO0FBWkEsZUFBUDtBQWNELGFBZkQ7O0FBaUJBO0FBQ0EsZ0JBQUksQ0FBQ2pQLE9BQU80QyxpQkFBUCxDQUF5Qm9PLFNBQXpCLENBQW1DaUMsVUFBeEMsRUFBb0Q7QUFDbERqVCxxQkFBTzRDLGlCQUFQLENBQXlCb08sU0FBekIsQ0FBbUNpQyxVQUFuQyxHQUFnRCxZQUFXO0FBQ3pELHFCQUFLNlEsUUFBTCxHQUFnQixLQUFLQSxRQUFMLElBQWlCLEVBQWpDO0FBQ0EsdUJBQU8sS0FBS0EsUUFBTCxDQUFjL0QsS0FBZCxFQUFQLENBRnlELENBRTNCO0FBQy9CLGVBSEQ7QUFJQSxrQkFBSWdFLGVBQWUvakIsT0FBTzRDLGlCQUFQLENBQXlCb08sU0FBekIsQ0FBbUNyQyxRQUF0RDtBQUNBM08scUJBQU80QyxpQkFBUCxDQUF5Qm9PLFNBQXpCLENBQW1DckMsUUFBbkMsR0FBOEMsVUFBUzFFLEtBQVQsRUFBZ0IzTCxNQUFoQixFQUF3QjtBQUNwRSxvQkFBSTJRLEtBQUssSUFBVDtBQUNBLG9CQUFJMkQsU0FBU21SLGFBQWFySSxLQUFiLENBQW1Cek0sRUFBbkIsRUFBdUJxSyxTQUF2QixDQUFiO0FBQ0Esb0JBQUksQ0FBQzFHLE1BQUwsRUFBYTtBQUNYQSwyQkFBUzZRLG1CQUFtQnhVLEVBQW5CLEVBQXVCaEYsS0FBdkIsQ0FBVDtBQUNBZ0YscUJBQUc2VSxRQUFILENBQVlsaUIsSUFBWixDQUFpQmdSLE1BQWpCO0FBQ0Q7QUFDRCx1QkFBT0EsTUFBUDtBQUNELGVBUkQ7O0FBVUEsa0JBQUlvUixrQkFBa0Joa0IsT0FBTzRDLGlCQUFQLENBQXlCb08sU0FBekIsQ0FBbUNqQyxXQUF6RDtBQUNBL08scUJBQU80QyxpQkFBUCxDQUF5Qm9PLFNBQXpCLENBQW1DakMsV0FBbkMsR0FBaUQsVUFBUzZELE1BQVQsRUFBaUI7QUFDaEUsb0JBQUkzRCxLQUFLLElBQVQ7QUFDQStVLGdDQUFnQnRJLEtBQWhCLENBQXNCek0sRUFBdEIsRUFBMEJxSyxTQUExQjtBQUNBLG9CQUFJOUcsTUFBTXZELEdBQUc2VSxRQUFILENBQVk3WSxPQUFaLENBQW9CMkgsTUFBcEIsQ0FBVjtBQUNBLG9CQUFJSixRQUFRLENBQUMsQ0FBYixFQUFnQjtBQUNkdkQscUJBQUc2VSxRQUFILENBQVkvUSxNQUFaLENBQW1CUCxHQUFuQixFQUF3QixDQUF4QjtBQUNEO0FBQ0YsZUFQRDtBQVFEO0FBQ0QsZ0JBQUl5UixnQkFBZ0Jqa0IsT0FBTzRDLGlCQUFQLENBQXlCb08sU0FBekIsQ0FBbUN4TSxTQUF2RDtBQUNBeEUsbUJBQU80QyxpQkFBUCxDQUF5Qm9PLFNBQXpCLENBQW1DeE0sU0FBbkMsR0FBK0MsVUFBU2xHLE1BQVQsRUFBaUI7QUFDOUQsa0JBQUkyUSxLQUFLLElBQVQ7QUFDQUEsaUJBQUc2VSxRQUFILEdBQWM3VSxHQUFHNlUsUUFBSCxJQUFlLEVBQTdCO0FBQ0FHLDRCQUFjdkksS0FBZCxDQUFvQnpNLEVBQXBCLEVBQXdCLENBQUMzUSxNQUFELENBQXhCO0FBQ0FBLHFCQUFPZ1UsU0FBUCxHQUFtQmhSLE9BQW5CLENBQTJCLFVBQVMySSxLQUFULEVBQWdCO0FBQ3pDZ0YsbUJBQUc2VSxRQUFILENBQVlsaUIsSUFBWixDQUFpQjZoQixtQkFBbUJ4VSxFQUFuQixFQUF1QmhGLEtBQXZCLENBQWpCO0FBQ0QsZUFGRDtBQUdELGFBUEQ7O0FBU0EsZ0JBQUlpYSxtQkFBbUJsa0IsT0FBTzRDLGlCQUFQLENBQXlCb08sU0FBekIsQ0FBbUNnQyxZQUExRDtBQUNBaFQsbUJBQU80QyxpQkFBUCxDQUF5Qm9PLFNBQXpCLENBQW1DZ0MsWUFBbkMsR0FBa0QsVUFBUzFVLE1BQVQsRUFBaUI7QUFDakUsa0JBQUkyUSxLQUFLLElBQVQ7QUFDQUEsaUJBQUc2VSxRQUFILEdBQWM3VSxHQUFHNlUsUUFBSCxJQUFlLEVBQTdCO0FBQ0FJLCtCQUFpQnhJLEtBQWpCLENBQXVCek0sRUFBdkIsRUFBMkIsQ0FBQzNRLE1BQUQsQ0FBM0I7O0FBRUFBLHFCQUFPZ1UsU0FBUCxHQUFtQmhSLE9BQW5CLENBQTJCLFVBQVMySSxLQUFULEVBQWdCO0FBQ3pDLG9CQUFJMkksU0FBUzNELEdBQUc2VSxRQUFILENBQVluVyxJQUFaLENBQWlCLFVBQVNuRixDQUFULEVBQVk7QUFDeEMseUJBQU9BLEVBQUV5QixLQUFGLEtBQVlBLEtBQW5CO0FBQ0QsaUJBRlksQ0FBYjtBQUdBLG9CQUFJMkksTUFBSixFQUFZO0FBQ1YzRCxxQkFBRzZVLFFBQUgsQ0FBWS9RLE1BQVosQ0FBbUI5RCxHQUFHNlUsUUFBSCxDQUFZN1ksT0FBWixDQUFvQjJILE1BQXBCLENBQW5CLEVBQWdELENBQWhELEVBRFUsQ0FDMEM7QUFDckQ7QUFDRixlQVBEO0FBUUQsYUFiRDtBQWNELFdBeEVELE1Bd0VPLElBQUksUUFBTzVTLE1BQVAseUNBQU9BLE1BQVAsT0FBa0IsUUFBbEIsSUFBOEJBLE9BQU80QyxpQkFBckMsSUFDQSxnQkFBZ0I1QyxPQUFPNEMsaUJBQVAsQ0FBeUJvTyxTQUR6QyxJQUVBLHNCQUFzQmhSLE9BQU80QyxpQkFBUCxDQUF5Qm9PLFNBRi9DLElBR0FoUixPQUFPcVMsWUFIUCxJQUlBLEVBQUUsVUFBVXJTLE9BQU9xUyxZQUFQLENBQW9CckIsU0FBaEMsQ0FKSixFQUlnRDtBQUNyRCxnQkFBSW1ULGlCQUFpQm5rQixPQUFPNEMsaUJBQVAsQ0FBeUJvTyxTQUF6QixDQUFtQ2lDLFVBQXhEO0FBQ0FqVCxtQkFBTzRDLGlCQUFQLENBQXlCb08sU0FBekIsQ0FBbUNpQyxVQUFuQyxHQUFnRCxZQUFXO0FBQ3pELGtCQUFJaEUsS0FBSyxJQUFUO0FBQ0Esa0JBQUltVixVQUFVRCxlQUFlekksS0FBZixDQUFxQnpNLEVBQXJCLEVBQXlCLEVBQXpCLENBQWQ7QUFDQW1WLHNCQUFROWlCLE9BQVIsQ0FBZ0IsVUFBU3NSLE1BQVQsRUFBaUI7QUFDL0JBLHVCQUFPaVIsR0FBUCxHQUFhNVUsRUFBYjtBQUNELGVBRkQ7QUFHQSxxQkFBT21WLE9BQVA7QUFDRCxhQVBEOztBQVNBcmQsbUJBQU9zTSxjQUFQLENBQXNCclQsT0FBT3FTLFlBQVAsQ0FBb0JyQixTQUExQyxFQUFxRCxNQUFyRCxFQUE2RDtBQUMzRHNILG1CQUFLLGVBQVc7QUFDZCxvQkFBSSxLQUFLcUwsS0FBTCxLQUFlblYsU0FBbkIsRUFBOEI7QUFDNUIsc0JBQUksS0FBS3ZFLEtBQUwsQ0FBVzFJLElBQVgsS0FBb0IsT0FBeEIsRUFBaUM7QUFDL0IseUJBQUtvaUIsS0FBTCxHQUFhLEtBQUtFLEdBQUwsQ0FBU0QsZ0JBQVQsQ0FBMEIsS0FBSzNaLEtBQS9CLENBQWI7QUFDRCxtQkFGRCxNQUVPO0FBQ0wseUJBQUswWixLQUFMLEdBQWEsSUFBYjtBQUNEO0FBQ0Y7QUFDRCx1QkFBTyxLQUFLQSxLQUFaO0FBQ0Q7QUFWMEQsYUFBN0Q7QUFZRDtBQUNGLFNBbExjOztBQW9MZnZCLDBCQUFrQiwwQkFBU3BpQixNQUFULEVBQWlCO0FBQ2pDLGNBQUlxa0IsTUFBTXJrQixVQUFVQSxPQUFPcWtCLEdBQTNCOztBQUVBLGNBQUksUUFBT3JrQixNQUFQLHlDQUFPQSxNQUFQLE9BQWtCLFFBQXRCLEVBQWdDO0FBQzlCLGdCQUFJQSxPQUFPc2tCLGdCQUFQLElBQ0YsRUFBRSxlQUFldGtCLE9BQU9za0IsZ0JBQVAsQ0FBd0J0VCxTQUF6QyxDQURGLEVBQ3VEO0FBQ3JEO0FBQ0FqSyxxQkFBT3NNLGNBQVAsQ0FBc0JyVCxPQUFPc2tCLGdCQUFQLENBQXdCdFQsU0FBOUMsRUFBeUQsV0FBekQsRUFBc0U7QUFDcEVzSCxxQkFBSyxlQUFXO0FBQ2QseUJBQU8sS0FBS2lNLFVBQVo7QUFDRCxpQkFIbUU7QUFJcEVqSixxQkFBSyxhQUFTaGQsTUFBVCxFQUFpQjtBQUNwQixzQkFBSWtpQixPQUFPLElBQVg7QUFDQTtBQUNBLHVCQUFLK0QsVUFBTCxHQUFrQmptQixNQUFsQjtBQUNBLHNCQUFJLEtBQUtrbUIsR0FBVCxFQUFjO0FBQ1pILHdCQUFJSSxlQUFKLENBQW9CLEtBQUtELEdBQXpCO0FBQ0Q7O0FBRUQsc0JBQUksQ0FBQ2xtQixNQUFMLEVBQWE7QUFDWCx5QkFBS2ttQixHQUFMLEdBQVcsRUFBWDtBQUNBLDJCQUFPaFcsU0FBUDtBQUNEO0FBQ0QsdUJBQUtnVyxHQUFMLEdBQVdILElBQUlLLGVBQUosQ0FBb0JwbUIsTUFBcEIsQ0FBWDtBQUNBO0FBQ0E7QUFDQUEseUJBQU9vVSxnQkFBUCxDQUF3QixVQUF4QixFQUFvQyxZQUFXO0FBQzdDLHdCQUFJOE4sS0FBS2dFLEdBQVQsRUFBYztBQUNaSCwwQkFBSUksZUFBSixDQUFvQmpFLEtBQUtnRSxHQUF6QjtBQUNEO0FBQ0RoRSx5QkFBS2dFLEdBQUwsR0FBV0gsSUFBSUssZUFBSixDQUFvQnBtQixNQUFwQixDQUFYO0FBQ0QsbUJBTEQ7QUFNQUEseUJBQU9vVSxnQkFBUCxDQUF3QixhQUF4QixFQUF1QyxZQUFXO0FBQ2hELHdCQUFJOE4sS0FBS2dFLEdBQVQsRUFBYztBQUNaSCwwQkFBSUksZUFBSixDQUFvQmpFLEtBQUtnRSxHQUF6QjtBQUNEO0FBQ0RoRSx5QkFBS2dFLEdBQUwsR0FBV0gsSUFBSUssZUFBSixDQUFvQnBtQixNQUFwQixDQUFYO0FBQ0QsbUJBTEQ7QUFNRDtBQS9CbUUsZUFBdEU7QUFpQ0Q7QUFDRjtBQUNGLFNBOU5jOztBQWdPZnFtQiwyQ0FBbUMsMkNBQVMza0IsTUFBVCxFQUFpQjtBQUNsRDtBQUNBO0FBQ0E7QUFDQUEsaUJBQU80QyxpQkFBUCxDQUF5Qm9PLFNBQXpCLENBQW1DUyxlQUFuQyxHQUFxRCxZQUFXO0FBQzlELGdCQUFJeEMsS0FBSyxJQUFUO0FBQ0EsaUJBQUsyVixvQkFBTCxHQUE0QixLQUFLQSxvQkFBTCxJQUE2QixFQUF6RDtBQUNBLG1CQUFPN2QsT0FBT0MsSUFBUCxDQUFZLEtBQUs0ZCxvQkFBakIsRUFBdUM5UixHQUF2QyxDQUEyQyxVQUFTK1IsUUFBVCxFQUFtQjtBQUNuRSxxQkFBTzVWLEdBQUcyVixvQkFBSCxDQUF3QkMsUUFBeEIsRUFBa0MsQ0FBbEMsQ0FBUDtBQUNELGFBRk0sQ0FBUDtBQUdELFdBTkQ7O0FBUUEsY0FBSWQsZUFBZS9qQixPQUFPNEMsaUJBQVAsQ0FBeUJvTyxTQUF6QixDQUFtQ3JDLFFBQXREO0FBQ0EzTyxpQkFBTzRDLGlCQUFQLENBQXlCb08sU0FBekIsQ0FBbUNyQyxRQUFuQyxHQUE4QyxVQUFTMUUsS0FBVCxFQUFnQjNMLE1BQWhCLEVBQXdCO0FBQ3BFLGdCQUFJLENBQUNBLE1BQUwsRUFBYTtBQUNYLHFCQUFPeWxCLGFBQWFySSxLQUFiLENBQW1CLElBQW5CLEVBQXlCcEMsU0FBekIsQ0FBUDtBQUNEO0FBQ0QsaUJBQUtzTCxvQkFBTCxHQUE0QixLQUFLQSxvQkFBTCxJQUE2QixFQUF6RDs7QUFFQSxnQkFBSWhTLFNBQVNtUixhQUFhckksS0FBYixDQUFtQixJQUFuQixFQUF5QnBDLFNBQXpCLENBQWI7QUFDQSxnQkFBSSxDQUFDLEtBQUtzTCxvQkFBTCxDQUEwQnRtQixPQUFPK0IsRUFBakMsQ0FBTCxFQUEyQztBQUN6QyxtQkFBS3VrQixvQkFBTCxDQUEwQnRtQixPQUFPK0IsRUFBakMsSUFBdUMsQ0FBQy9CLE1BQUQsRUFBU3NVLE1BQVQsQ0FBdkM7QUFDRCxhQUZELE1BRU8sSUFBSSxLQUFLZ1Msb0JBQUwsQ0FBMEJ0bUIsT0FBTytCLEVBQWpDLEVBQXFDNEssT0FBckMsQ0FBNkMySCxNQUE3QyxNQUF5RCxDQUFDLENBQTlELEVBQWlFO0FBQ3RFLG1CQUFLZ1Msb0JBQUwsQ0FBMEJ0bUIsT0FBTytCLEVBQWpDLEVBQXFDdUIsSUFBckMsQ0FBMENnUixNQUExQztBQUNEO0FBQ0QsbUJBQU9BLE1BQVA7QUFDRCxXQWJEOztBQWVBLGNBQUlxUixnQkFBZ0Jqa0IsT0FBTzRDLGlCQUFQLENBQXlCb08sU0FBekIsQ0FBbUN4TSxTQUF2RDtBQUNBeEUsaUJBQU80QyxpQkFBUCxDQUF5Qm9PLFNBQXpCLENBQW1DeE0sU0FBbkMsR0FBK0MsVUFBU2xHLE1BQVQsRUFBaUI7QUFDOUQsZ0JBQUkyUSxLQUFLLElBQVQ7QUFDQSxpQkFBSzJWLG9CQUFMLEdBQTRCLEtBQUtBLG9CQUFMLElBQTZCLEVBQXpEOztBQUVBdG1CLG1CQUFPZ1UsU0FBUCxHQUFtQmhSLE9BQW5CLENBQTJCLFVBQVMySSxLQUFULEVBQWdCO0FBQ3pDLGtCQUFJa0ksZ0JBQWdCbEQsR0FBR2dFLFVBQUgsR0FBZ0J0RixJQUFoQixDQUFxQixVQUFTbkYsQ0FBVCxFQUFZO0FBQ25ELHVCQUFPQSxFQUFFeUIsS0FBRixLQUFZQSxLQUFuQjtBQUNELGVBRm1CLENBQXBCO0FBR0Esa0JBQUlrSSxhQUFKLEVBQW1CO0FBQ2pCLHNCQUFNLElBQUkyUyxZQUFKLENBQWlCLHVCQUFqQixFQUNGLG9CQURFLENBQU47QUFFRDtBQUNGLGFBUkQ7QUFTQSxnQkFBSUMsa0JBQWtCOVYsR0FBR2dFLFVBQUgsRUFBdEI7QUFDQWdSLDBCQUFjdkksS0FBZCxDQUFvQixJQUFwQixFQUEwQnBDLFNBQTFCO0FBQ0EsZ0JBQUkwTCxhQUFhL1YsR0FBR2dFLFVBQUgsR0FBZ0J2SSxNQUFoQixDQUF1QixVQUFTdWEsU0FBVCxFQUFvQjtBQUMxRCxxQkFBT0YsZ0JBQWdCOVosT0FBaEIsQ0FBd0JnYSxTQUF4QixNQUF1QyxDQUFDLENBQS9DO0FBQ0QsYUFGZ0IsQ0FBakI7QUFHQSxpQkFBS0wsb0JBQUwsQ0FBMEJ0bUIsT0FBTytCLEVBQWpDLElBQXVDLENBQUMvQixNQUFELEVBQVN5ZixNQUFULENBQWdCaUgsVUFBaEIsQ0FBdkM7QUFDRCxXQW5CRDs7QUFxQkEsY0FBSWQsbUJBQW1CbGtCLE9BQU80QyxpQkFBUCxDQUF5Qm9PLFNBQXpCLENBQW1DZ0MsWUFBMUQ7QUFDQWhULGlCQUFPNEMsaUJBQVAsQ0FBeUJvTyxTQUF6QixDQUFtQ2dDLFlBQW5DLEdBQWtELFVBQVMxVSxNQUFULEVBQWlCO0FBQ2pFLGlCQUFLc21CLG9CQUFMLEdBQTRCLEtBQUtBLG9CQUFMLElBQTZCLEVBQXpEO0FBQ0EsbUJBQU8sS0FBS0Esb0JBQUwsQ0FBMEJ0bUIsT0FBTytCLEVBQWpDLENBQVA7QUFDQSxtQkFBTzZqQixpQkFBaUJ4SSxLQUFqQixDQUF1QixJQUF2QixFQUE2QnBDLFNBQTdCLENBQVA7QUFDRCxXQUpEOztBQU1BLGNBQUkwSyxrQkFBa0Joa0IsT0FBTzRDLGlCQUFQLENBQXlCb08sU0FBekIsQ0FBbUNqQyxXQUF6RDtBQUNBL08saUJBQU80QyxpQkFBUCxDQUF5Qm9PLFNBQXpCLENBQW1DakMsV0FBbkMsR0FBaUQsVUFBUzZELE1BQVQsRUFBaUI7QUFDaEUsZ0JBQUkzRCxLQUFLLElBQVQ7QUFDQSxpQkFBSzJWLG9CQUFMLEdBQTRCLEtBQUtBLG9CQUFMLElBQTZCLEVBQXpEO0FBQ0EsZ0JBQUloUyxNQUFKLEVBQVk7QUFDVjdMLHFCQUFPQyxJQUFQLENBQVksS0FBSzRkLG9CQUFqQixFQUF1Q3RqQixPQUF2QyxDQUErQyxVQUFTdWpCLFFBQVQsRUFBbUI7QUFDaEUsb0JBQUlyUyxNQUFNdkQsR0FBRzJWLG9CQUFILENBQXdCQyxRQUF4QixFQUFrQzVaLE9BQWxDLENBQTBDMkgsTUFBMUMsQ0FBVjtBQUNBLG9CQUFJSixRQUFRLENBQUMsQ0FBYixFQUFnQjtBQUNkdkQscUJBQUcyVixvQkFBSCxDQUF3QkMsUUFBeEIsRUFBa0M5UixNQUFsQyxDQUF5Q1AsR0FBekMsRUFBOEMsQ0FBOUM7QUFDRDtBQUNELG9CQUFJdkQsR0FBRzJWLG9CQUFILENBQXdCQyxRQUF4QixFQUFrQ2hqQixNQUFsQyxLQUE2QyxDQUFqRCxFQUFvRDtBQUNsRCx5QkFBT29OLEdBQUcyVixvQkFBSCxDQUF3QkMsUUFBeEIsQ0FBUDtBQUNEO0FBQ0YsZUFSRDtBQVNEO0FBQ0QsbUJBQU9iLGdCQUFnQnRJLEtBQWhCLENBQXNCLElBQXRCLEVBQTRCcEMsU0FBNUIsQ0FBUDtBQUNELFdBZkQ7QUFnQkQsU0ExU2M7O0FBNFNmZ0osaUNBQXlCLGlDQUFTdGlCLE1BQVQsRUFBaUI7QUFDeEMsY0FBSW9oQixpQkFBaUJYLE1BQU1ZLGFBQU4sQ0FBb0JyaEIsTUFBcEIsQ0FBckI7QUFDQTtBQUNBLGNBQUlBLE9BQU80QyxpQkFBUCxDQUF5Qm9PLFNBQXpCLENBQW1DckMsUUFBbkMsSUFDQXlTLGVBQWV4QixPQUFmLElBQTBCLEVBRDlCLEVBQ2tDO0FBQ2hDLG1CQUFPLEtBQUsrRSxpQ0FBTCxDQUF1QzNrQixNQUF2QyxDQUFQO0FBQ0Q7O0FBRUQ7QUFDQTtBQUNBLGNBQUlrbEIsc0JBQXNCbGxCLE9BQU80QyxpQkFBUCxDQUF5Qm9PLFNBQXpCLENBQ3JCUyxlQURMO0FBRUF6UixpQkFBTzRDLGlCQUFQLENBQXlCb08sU0FBekIsQ0FBbUNTLGVBQW5DLEdBQXFELFlBQVc7QUFDOUQsZ0JBQUl4QyxLQUFLLElBQVQ7QUFDQSxnQkFBSWtXLGdCQUFnQkQsb0JBQW9CeEosS0FBcEIsQ0FBMEIsSUFBMUIsQ0FBcEI7QUFDQXpNLGVBQUdtVyxlQUFILEdBQXFCblcsR0FBR21XLGVBQUgsSUFBc0IsRUFBM0M7QUFDQSxtQkFBT0QsY0FBY3JTLEdBQWQsQ0FBa0IsVUFBU3hVLE1BQVQsRUFBaUI7QUFDeEMscUJBQU8yUSxHQUFHbVcsZUFBSCxDQUFtQjltQixPQUFPK0IsRUFBMUIsQ0FBUDtBQUNELGFBRk0sQ0FBUDtBQUdELFdBUEQ7O0FBU0EsY0FBSTRqQixnQkFBZ0Jqa0IsT0FBTzRDLGlCQUFQLENBQXlCb08sU0FBekIsQ0FBbUN4TSxTQUF2RDtBQUNBeEUsaUJBQU80QyxpQkFBUCxDQUF5Qm9PLFNBQXpCLENBQW1DeE0sU0FBbkMsR0FBK0MsVUFBU2xHLE1BQVQsRUFBaUI7QUFDOUQsZ0JBQUkyUSxLQUFLLElBQVQ7QUFDQUEsZUFBR29XLFFBQUgsR0FBY3BXLEdBQUdvVyxRQUFILElBQWUsRUFBN0I7QUFDQXBXLGVBQUdtVyxlQUFILEdBQXFCblcsR0FBR21XLGVBQUgsSUFBc0IsRUFBM0M7O0FBRUE5bUIsbUJBQU9nVSxTQUFQLEdBQW1CaFIsT0FBbkIsQ0FBMkIsVUFBUzJJLEtBQVQsRUFBZ0I7QUFDekMsa0JBQUlrSSxnQkFBZ0JsRCxHQUFHZ0UsVUFBSCxHQUFnQnRGLElBQWhCLENBQXFCLFVBQVNuRixDQUFULEVBQVk7QUFDbkQsdUJBQU9BLEVBQUV5QixLQUFGLEtBQVlBLEtBQW5CO0FBQ0QsZUFGbUIsQ0FBcEI7QUFHQSxrQkFBSWtJLGFBQUosRUFBbUI7QUFDakIsc0JBQU0sSUFBSTJTLFlBQUosQ0FBaUIsdUJBQWpCLEVBQ0Ysb0JBREUsQ0FBTjtBQUVEO0FBQ0YsYUFSRDtBQVNBO0FBQ0E7QUFDQSxnQkFBSSxDQUFDN1YsR0FBR21XLGVBQUgsQ0FBbUI5bUIsT0FBTytCLEVBQTFCLENBQUwsRUFBb0M7QUFDbEMsa0JBQUlpbEIsWUFBWSxJQUFJdGxCLE9BQU9xWSxXQUFYLENBQXVCL1osT0FBT2dVLFNBQVAsRUFBdkIsQ0FBaEI7QUFDQXJELGlCQUFHb1csUUFBSCxDQUFZL21CLE9BQU8rQixFQUFuQixJQUF5QmlsQixTQUF6QjtBQUNBclcsaUJBQUdtVyxlQUFILENBQW1CRSxVQUFVamxCLEVBQTdCLElBQW1DL0IsTUFBbkM7QUFDQUEsdUJBQVNnbkIsU0FBVDtBQUNEO0FBQ0RyQiwwQkFBY3ZJLEtBQWQsQ0FBb0J6TSxFQUFwQixFQUF3QixDQUFDM1EsTUFBRCxDQUF4QjtBQUNELFdBdkJEOztBQXlCQSxjQUFJNGxCLG1CQUFtQmxrQixPQUFPNEMsaUJBQVAsQ0FBeUJvTyxTQUF6QixDQUFtQ2dDLFlBQTFEO0FBQ0FoVCxpQkFBTzRDLGlCQUFQLENBQXlCb08sU0FBekIsQ0FBbUNnQyxZQUFuQyxHQUFrRCxVQUFTMVUsTUFBVCxFQUFpQjtBQUNqRSxnQkFBSTJRLEtBQUssSUFBVDtBQUNBQSxlQUFHb1csUUFBSCxHQUFjcFcsR0FBR29XLFFBQUgsSUFBZSxFQUE3QjtBQUNBcFcsZUFBR21XLGVBQUgsR0FBcUJuVyxHQUFHbVcsZUFBSCxJQUFzQixFQUEzQzs7QUFFQWxCLDZCQUFpQnhJLEtBQWpCLENBQXVCek0sRUFBdkIsRUFBMkIsQ0FBRUEsR0FBR29XLFFBQUgsQ0FBWS9tQixPQUFPK0IsRUFBbkIsS0FBMEIvQixNQUE1QixDQUEzQjtBQUNBLG1CQUFPMlEsR0FBR21XLGVBQUgsQ0FBb0JuVyxHQUFHb1csUUFBSCxDQUFZL21CLE9BQU8rQixFQUFuQixJQUN2QjRPLEdBQUdvVyxRQUFILENBQVkvbUIsT0FBTytCLEVBQW5CLEVBQXVCQSxFQURBLEdBQ0svQixPQUFPK0IsRUFEaEMsQ0FBUDtBQUVBLG1CQUFPNE8sR0FBR29XLFFBQUgsQ0FBWS9tQixPQUFPK0IsRUFBbkIsQ0FBUDtBQUNELFdBVEQ7O0FBV0FMLGlCQUFPNEMsaUJBQVAsQ0FBeUJvTyxTQUF6QixDQUFtQ3JDLFFBQW5DLEdBQThDLFVBQVMxRSxLQUFULEVBQWdCM0wsTUFBaEIsRUFBd0I7QUFDcEUsZ0JBQUkyUSxLQUFLLElBQVQ7QUFDQSxnQkFBSUEsR0FBRzdCLGNBQUgsS0FBc0IsUUFBMUIsRUFBb0M7QUFDbEMsb0JBQU0sSUFBSTBYLFlBQUosQ0FDSix3REFESSxFQUVKLG1CQUZJLENBQU47QUFHRDtBQUNELGdCQUFJMWdCLFVBQVUsR0FBRzJiLEtBQUgsQ0FBUy9XLElBQVQsQ0FBY3NRLFNBQWQsRUFBeUIsQ0FBekIsQ0FBZDtBQUNBLGdCQUFJbFYsUUFBUXZDLE1BQVIsS0FBbUIsQ0FBbkIsSUFDQSxDQUFDdUMsUUFBUSxDQUFSLEVBQVdrTyxTQUFYLEdBQXVCM0UsSUFBdkIsQ0FBNEIsVUFBU3RGLENBQVQsRUFBWTtBQUN2QyxxQkFBT0EsTUFBTTRCLEtBQWI7QUFDRCxhQUZBLENBREwsRUFHUTtBQUNOO0FBQ0E7QUFDQSxvQkFBTSxJQUFJNmEsWUFBSixDQUNKLDZEQUNBLHVEQUZJLEVBR0osbUJBSEksQ0FBTjtBQUlEOztBQUVELGdCQUFJM1MsZ0JBQWdCbEQsR0FBR2dFLFVBQUgsR0FBZ0J0RixJQUFoQixDQUFxQixVQUFTbkYsQ0FBVCxFQUFZO0FBQ25ELHFCQUFPQSxFQUFFeUIsS0FBRixLQUFZQSxLQUFuQjtBQUNELGFBRm1CLENBQXBCO0FBR0EsZ0JBQUlrSSxhQUFKLEVBQW1CO0FBQ2pCLG9CQUFNLElBQUkyUyxZQUFKLENBQWlCLHVCQUFqQixFQUNGLG9CQURFLENBQU47QUFFRDs7QUFFRDdWLGVBQUdvVyxRQUFILEdBQWNwVyxHQUFHb1csUUFBSCxJQUFlLEVBQTdCO0FBQ0FwVyxlQUFHbVcsZUFBSCxHQUFxQm5XLEdBQUdtVyxlQUFILElBQXNCLEVBQTNDO0FBQ0EsZ0JBQUlHLFlBQVl0VyxHQUFHb1csUUFBSCxDQUFZL21CLE9BQU8rQixFQUFuQixDQUFoQjtBQUNBLGdCQUFJa2xCLFNBQUosRUFBZTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0FBLHdCQUFVNVcsUUFBVixDQUFtQjFFLEtBQW5COztBQUVBO0FBQ0F4RSxzQkFBUTlDLE9BQVIsR0FBa0J4QixJQUFsQixDQUF1QixZQUFXO0FBQ2hDOE4sbUJBQUdMLGFBQUgsQ0FBaUIsSUFBSVEsS0FBSixDQUFVLG1CQUFWLENBQWpCO0FBQ0QsZUFGRDtBQUdELGFBWEQsTUFXTztBQUNMLGtCQUFJa1csWUFBWSxJQUFJdGxCLE9BQU9xWSxXQUFYLENBQXVCLENBQUNwTyxLQUFELENBQXZCLENBQWhCO0FBQ0FnRixpQkFBR29XLFFBQUgsQ0FBWS9tQixPQUFPK0IsRUFBbkIsSUFBeUJpbEIsU0FBekI7QUFDQXJXLGlCQUFHbVcsZUFBSCxDQUFtQkUsVUFBVWpsQixFQUE3QixJQUFtQy9CLE1BQW5DO0FBQ0EyUSxpQkFBR3pLLFNBQUgsQ0FBYThnQixTQUFiO0FBQ0Q7QUFDRCxtQkFBT3JXLEdBQUdnRSxVQUFILEdBQWdCdEYsSUFBaEIsQ0FBcUIsVUFBU25GLENBQVQsRUFBWTtBQUN0QyxxQkFBT0EsRUFBRXlCLEtBQUYsS0FBWUEsS0FBbkI7QUFDRCxhQUZNLENBQVA7QUFHRCxXQW5ERDs7QUFxREE7QUFDQTtBQUNBLG1CQUFTdWIsdUJBQVQsQ0FBaUN2VyxFQUFqQyxFQUFxQ2QsV0FBckMsRUFBa0Q7QUFDaEQsZ0JBQUkxTCxNQUFNMEwsWUFBWTFMLEdBQXRCO0FBQ0FzRSxtQkFBT0MsSUFBUCxDQUFZaUksR0FBR21XLGVBQUgsSUFBc0IsRUFBbEMsRUFBc0M5akIsT0FBdEMsQ0FBOEMsVUFBU21rQixVQUFULEVBQXFCO0FBQ2pFLGtCQUFJQyxpQkFBaUJ6VyxHQUFHbVcsZUFBSCxDQUFtQkssVUFBbkIsQ0FBckI7QUFDQSxrQkFBSUUsaUJBQWlCMVcsR0FBR29XLFFBQUgsQ0FBWUssZUFBZXJsQixFQUEzQixDQUFyQjtBQUNBb0Msb0JBQU1BLElBQUl5RCxPQUFKLENBQVksSUFBSVosTUFBSixDQUFXcWdCLGVBQWV0bEIsRUFBMUIsRUFBOEIsR0FBOUIsQ0FBWixFQUNGcWxCLGVBQWVybEIsRUFEYixDQUFOO0FBRUQsYUFMRDtBQU1BLG1CQUFPLElBQUl5QyxxQkFBSixDQUEwQjtBQUMvQjdFLG9CQUFNa1EsWUFBWWxRLElBRGE7QUFFL0J3RSxtQkFBS0E7QUFGMEIsYUFBMUIsQ0FBUDtBQUlEO0FBQ0QsbUJBQVNtakIsdUJBQVQsQ0FBaUMzVyxFQUFqQyxFQUFxQ2QsV0FBckMsRUFBa0Q7QUFDaEQsZ0JBQUkxTCxNQUFNMEwsWUFBWTFMLEdBQXRCO0FBQ0FzRSxtQkFBT0MsSUFBUCxDQUFZaUksR0FBR21XLGVBQUgsSUFBc0IsRUFBbEMsRUFBc0M5akIsT0FBdEMsQ0FBOEMsVUFBU21rQixVQUFULEVBQXFCO0FBQ2pFLGtCQUFJQyxpQkFBaUJ6VyxHQUFHbVcsZUFBSCxDQUFtQkssVUFBbkIsQ0FBckI7QUFDQSxrQkFBSUUsaUJBQWlCMVcsR0FBR29XLFFBQUgsQ0FBWUssZUFBZXJsQixFQUEzQixDQUFyQjtBQUNBb0Msb0JBQU1BLElBQUl5RCxPQUFKLENBQVksSUFBSVosTUFBSixDQUFXb2dCLGVBQWVybEIsRUFBMUIsRUFBOEIsR0FBOUIsQ0FBWixFQUNGc2xCLGVBQWV0bEIsRUFEYixDQUFOO0FBRUQsYUFMRDtBQU1BLG1CQUFPLElBQUl5QyxxQkFBSixDQUEwQjtBQUMvQjdFLG9CQUFNa1EsWUFBWWxRLElBRGE7QUFFL0J3RSxtQkFBS0E7QUFGMEIsYUFBMUIsQ0FBUDtBQUlEO0FBQ0QsV0FBQyxhQUFELEVBQWdCLGNBQWhCLEVBQWdDbkIsT0FBaEMsQ0FBd0MsVUFBU29PLE1BQVQsRUFBaUI7QUFDdkQsZ0JBQUk4TCxlQUFleGIsT0FBTzRDLGlCQUFQLENBQXlCb08sU0FBekIsQ0FBbUN0QixNQUFuQyxDQUFuQjtBQUNBMVAsbUJBQU80QyxpQkFBUCxDQUF5Qm9PLFNBQXpCLENBQW1DdEIsTUFBbkMsSUFBNkMsWUFBVztBQUN0RCxrQkFBSVQsS0FBSyxJQUFUO0FBQ0Esa0JBQUl3TSxPQUFPbkMsU0FBWDtBQUNBLGtCQUFJdU0sZUFBZXZNLFVBQVV6WCxNQUFWLElBQ2YsT0FBT3lYLFVBQVUsQ0FBVixDQUFQLEtBQXdCLFVBRDVCO0FBRUEsa0JBQUl1TSxZQUFKLEVBQWtCO0FBQ2hCLHVCQUFPckssYUFBYUUsS0FBYixDQUFtQnpNLEVBQW5CLEVBQXVCLENBQzVCLFVBQVNkLFdBQVQsRUFBc0I7QUFDcEIsc0JBQUluTCxPQUFPd2lCLHdCQUF3QnZXLEVBQXhCLEVBQTRCZCxXQUE1QixDQUFYO0FBQ0FzTix1QkFBSyxDQUFMLEVBQVFDLEtBQVIsQ0FBYyxJQUFkLEVBQW9CLENBQUMxWSxJQUFELENBQXBCO0FBQ0QsaUJBSjJCLEVBSzVCLFVBQVM4aUIsR0FBVCxFQUFjO0FBQ1osc0JBQUlySyxLQUFLLENBQUwsQ0FBSixFQUFhO0FBQ1hBLHlCQUFLLENBQUwsRUFBUUMsS0FBUixDQUFjLElBQWQsRUFBb0JvSyxHQUFwQjtBQUNEO0FBQ0YsaUJBVDJCLEVBU3pCeE0sVUFBVSxDQUFWLENBVHlCLENBQXZCLENBQVA7QUFXRDtBQUNELHFCQUFPa0MsYUFBYUUsS0FBYixDQUFtQnpNLEVBQW5CLEVBQXVCcUssU0FBdkIsRUFDTm5ZLElBRE0sQ0FDRCxVQUFTZ04sV0FBVCxFQUFzQjtBQUMxQix1QkFBT3FYLHdCQUF3QnZXLEVBQXhCLEVBQTRCZCxXQUE1QixDQUFQO0FBQ0QsZUFITSxDQUFQO0FBSUQsYUF0QkQ7QUF1QkQsV0F6QkQ7O0FBMkJBLGNBQUk0WCwwQkFDQS9sQixPQUFPNEMsaUJBQVAsQ0FBeUJvTyxTQUF6QixDQUFtQy9OLG1CQUR2QztBQUVBakQsaUJBQU80QyxpQkFBUCxDQUF5Qm9PLFNBQXpCLENBQW1DL04sbUJBQW5DLEdBQXlELFlBQVc7QUFDbEUsZ0JBQUlnTSxLQUFLLElBQVQ7QUFDQSxnQkFBSSxDQUFDcUssVUFBVXpYLE1BQVgsSUFBcUIsQ0FBQ3lYLFVBQVUsQ0FBVixFQUFhcmIsSUFBdkMsRUFBNkM7QUFDM0MscUJBQU84bkIsd0JBQXdCckssS0FBeEIsQ0FBOEJ6TSxFQUE5QixFQUFrQ3FLLFNBQWxDLENBQVA7QUFDRDtBQUNEQSxzQkFBVSxDQUFWLElBQWVzTSx3QkFBd0IzVyxFQUF4QixFQUE0QnFLLFVBQVUsQ0FBVixDQUE1QixDQUFmO0FBQ0EsbUJBQU95TSx3QkFBd0JySyxLQUF4QixDQUE4QnpNLEVBQTlCLEVBQWtDcUssU0FBbEMsQ0FBUDtBQUNELFdBUEQ7O0FBU0E7O0FBRUEsY0FBSTBNLHVCQUF1QmpmLE9BQU9rZix3QkFBUCxDQUN2QmptQixPQUFPNEMsaUJBQVAsQ0FBeUJvTyxTQURGLEVBQ2Esa0JBRGIsQ0FBM0I7QUFFQWpLLGlCQUFPc00sY0FBUCxDQUFzQnJULE9BQU80QyxpQkFBUCxDQUF5Qm9PLFNBQS9DLEVBQ0ksa0JBREosRUFDd0I7QUFDbEJzSCxpQkFBSyxlQUFXO0FBQ2Qsa0JBQUlySixLQUFLLElBQVQ7QUFDQSxrQkFBSWQsY0FBYzZYLHFCQUFxQjFOLEdBQXJCLENBQXlCb0QsS0FBekIsQ0FBK0IsSUFBL0IsQ0FBbEI7QUFDQSxrQkFBSXZOLFlBQVlsUSxJQUFaLEtBQXFCLEVBQXpCLEVBQTZCO0FBQzNCLHVCQUFPa1EsV0FBUDtBQUNEO0FBQ0QscUJBQU9xWCx3QkFBd0J2VyxFQUF4QixFQUE0QmQsV0FBNUIsQ0FBUDtBQUNEO0FBUmlCLFdBRHhCOztBQVlBbk8saUJBQU80QyxpQkFBUCxDQUF5Qm9PLFNBQXpCLENBQW1DakMsV0FBbkMsR0FBaUQsVUFBUzZELE1BQVQsRUFBaUI7QUFDaEUsZ0JBQUkzRCxLQUFLLElBQVQ7QUFDQSxnQkFBSUEsR0FBRzdCLGNBQUgsS0FBc0IsUUFBMUIsRUFBb0M7QUFDbEMsb0JBQU0sSUFBSTBYLFlBQUosQ0FDSix3REFESSxFQUVKLG1CQUZJLENBQU47QUFHRDtBQUNEO0FBQ0E7QUFDQSxnQkFBSSxDQUFDbFMsT0FBT2lSLEdBQVosRUFBaUI7QUFDZixvQkFBTSxJQUFJaUIsWUFBSixDQUFpQixpREFDbkIsNENBREUsRUFDNEMsV0FENUMsQ0FBTjtBQUVEO0FBQ0QsZ0JBQUlvQixVQUFVdFQsT0FBT2lSLEdBQVAsS0FBZTVVLEVBQTdCO0FBQ0EsZ0JBQUksQ0FBQ2lYLE9BQUwsRUFBYztBQUNaLG9CQUFNLElBQUlwQixZQUFKLENBQWlCLDRDQUFqQixFQUNGLG9CQURFLENBQU47QUFFRDs7QUFFRDtBQUNBN1YsZUFBR29XLFFBQUgsR0FBY3BXLEdBQUdvVyxRQUFILElBQWUsRUFBN0I7QUFDQSxnQkFBSS9tQixNQUFKO0FBQ0F5SSxtQkFBT0MsSUFBUCxDQUFZaUksR0FBR29XLFFBQWYsRUFBeUIvakIsT0FBekIsQ0FBaUMsVUFBUzZrQixRQUFULEVBQW1CO0FBQ2xELGtCQUFJQyxXQUFXblgsR0FBR29XLFFBQUgsQ0FBWWMsUUFBWixFQUFzQjdULFNBQXRCLEdBQWtDM0UsSUFBbEMsQ0FBdUMsVUFBUzFELEtBQVQsRUFBZ0I7QUFDcEUsdUJBQU8ySSxPQUFPM0ksS0FBUCxLQUFpQkEsS0FBeEI7QUFDRCxlQUZjLENBQWY7QUFHQSxrQkFBSW1jLFFBQUosRUFBYztBQUNaOW5CLHlCQUFTMlEsR0FBR29XLFFBQUgsQ0FBWWMsUUFBWixDQUFUO0FBQ0Q7QUFDRixhQVBEOztBQVNBLGdCQUFJN25CLE1BQUosRUFBWTtBQUNWLGtCQUFJQSxPQUFPZ1UsU0FBUCxHQUFtQnpRLE1BQW5CLEtBQThCLENBQWxDLEVBQXFDO0FBQ25DO0FBQ0E7QUFDQW9OLG1CQUFHK0QsWUFBSCxDQUFnQi9ELEdBQUdtVyxlQUFILENBQW1COW1CLE9BQU8rQixFQUExQixDQUFoQjtBQUNELGVBSkQsTUFJTztBQUNMO0FBQ0EvQix1QkFBT3lRLFdBQVAsQ0FBbUI2RCxPQUFPM0ksS0FBMUI7QUFDRDtBQUNEZ0YsaUJBQUdMLGFBQUgsQ0FBaUIsSUFBSVEsS0FBSixDQUFVLG1CQUFWLENBQWpCO0FBQ0Q7QUFDRixXQTFDRDtBQTJDRCxTQXpoQmM7O0FBMmhCZjJTLDRCQUFvQiw0QkFBUy9oQixNQUFULEVBQWlCO0FBQ25DLGNBQUlvaEIsaUJBQWlCWCxNQUFNWSxhQUFOLENBQW9CcmhCLE1BQXBCLENBQXJCOztBQUVBO0FBQ0EsY0FBSSxDQUFDQSxPQUFPNEMsaUJBQVIsSUFBNkI1QyxPQUFPcW1CLHVCQUF4QyxFQUFpRTtBQUMvRHJtQixtQkFBTzRDLGlCQUFQLEdBQTJCLFVBQVMwakIsUUFBVCxFQUFtQkMsYUFBbkIsRUFBa0M7QUFDM0Q7QUFDQTtBQUNBO0FBQ0FwRixzQkFBUSxnQkFBUjtBQUNBLGtCQUFJbUYsWUFBWUEsU0FBU2huQixrQkFBekIsRUFBNkM7QUFDM0NnbkIseUJBQVNFLGFBQVQsR0FBeUJGLFNBQVNobkIsa0JBQWxDO0FBQ0Q7O0FBRUQscUJBQU8sSUFBSVUsT0FBT3FtQix1QkFBWCxDQUFtQ0MsUUFBbkMsRUFBNkNDLGFBQTdDLENBQVA7QUFDRCxhQVZEO0FBV0F2bUIsbUJBQU80QyxpQkFBUCxDQUF5Qm9PLFNBQXpCLEdBQ0loUixPQUFPcW1CLHVCQUFQLENBQStCclYsU0FEbkM7QUFFQTtBQUNBLGdCQUFJaFIsT0FBT3FtQix1QkFBUCxDQUErQkksbUJBQW5DLEVBQXdEO0FBQ3REMWYscUJBQU9zTSxjQUFQLENBQXNCclQsT0FBTzRDLGlCQUE3QixFQUFnRCxxQkFBaEQsRUFBdUU7QUFDckUwVixxQkFBSyxlQUFXO0FBQ2QseUJBQU90WSxPQUFPcW1CLHVCQUFQLENBQStCSSxtQkFBdEM7QUFDRDtBQUhvRSxlQUF2RTtBQUtEO0FBQ0YsV0F0QkQsTUFzQk87QUFDTDtBQUNBLGdCQUFJQyxxQkFBcUIxbUIsT0FBTzRDLGlCQUFoQztBQUNBNUMsbUJBQU80QyxpQkFBUCxHQUEyQixVQUFTMGpCLFFBQVQsRUFBbUJDLGFBQW5CLEVBQWtDO0FBQzNELGtCQUFJRCxZQUFZQSxTQUFTam5CLFVBQXpCLEVBQXFDO0FBQ25DLG9CQUFJc25CLGdCQUFnQixFQUFwQjtBQUNBLHFCQUFLLElBQUl4Z0IsSUFBSSxDQUFiLEVBQWdCQSxJQUFJbWdCLFNBQVNqbkIsVUFBVCxDQUFvQndDLE1BQXhDLEVBQWdEc0UsR0FBaEQsRUFBcUQ7QUFDbkQsc0JBQUl3RSxTQUFTMmIsU0FBU2puQixVQUFULENBQW9COEcsQ0FBcEIsQ0FBYjtBQUNBLHNCQUFJLENBQUN3RSxPQUFPdVcsY0FBUCxDQUFzQixNQUF0QixDQUFELElBQ0F2VyxPQUFPdVcsY0FBUCxDQUFzQixLQUF0QixDQURKLEVBQ2tDO0FBQ2hDVCwwQkFBTW1HLFVBQU4sQ0FBaUIsa0JBQWpCLEVBQXFDLG1CQUFyQztBQUNBamMsNkJBQVMvRCxLQUFLQyxLQUFMLENBQVdELEtBQUtvQixTQUFMLENBQWUyQyxNQUFmLENBQVgsQ0FBVDtBQUNBQSwyQkFBT0MsSUFBUCxHQUFjRCxPQUFPekYsR0FBckI7QUFDQXloQixrQ0FBYy9rQixJQUFkLENBQW1CK0ksTUFBbkI7QUFDRCxtQkFORCxNQU1PO0FBQ0xnYyxrQ0FBYy9rQixJQUFkLENBQW1CMGtCLFNBQVNqbkIsVUFBVCxDQUFvQjhHLENBQXBCLENBQW5CO0FBQ0Q7QUFDRjtBQUNEbWdCLHlCQUFTam5CLFVBQVQsR0FBc0JzbkIsYUFBdEI7QUFDRDtBQUNELHFCQUFPLElBQUlELGtCQUFKLENBQXVCSixRQUF2QixFQUFpQ0MsYUFBakMsQ0FBUDtBQUNELGFBbEJEO0FBbUJBdm1CLG1CQUFPNEMsaUJBQVAsQ0FBeUJvTyxTQUF6QixHQUFxQzBWLG1CQUFtQjFWLFNBQXhEO0FBQ0E7QUFDQWpLLG1CQUFPc00sY0FBUCxDQUFzQnJULE9BQU80QyxpQkFBN0IsRUFBZ0QscUJBQWhELEVBQXVFO0FBQ3JFMFYsbUJBQUssZUFBVztBQUNkLHVCQUFPb08sbUJBQW1CRCxtQkFBMUI7QUFDRDtBQUhvRSxhQUF2RTtBQUtEOztBQUVELGNBQUlJLGVBQWU3bUIsT0FBTzRDLGlCQUFQLENBQXlCb08sU0FBekIsQ0FBbUM5UCxRQUF0RDtBQUNBbEIsaUJBQU80QyxpQkFBUCxDQUF5Qm9PLFNBQXpCLENBQW1DOVAsUUFBbkMsR0FBOEMsVUFBUzRsQixRQUFULEVBQzFDQyxlQUQwQyxFQUN6QkMsYUFEeUIsRUFDVjtBQUNsQyxnQkFBSS9YLEtBQUssSUFBVDtBQUNBLGdCQUFJd00sT0FBT25DLFNBQVg7O0FBRUE7QUFDQTtBQUNBLGdCQUFJQSxVQUFVelgsTUFBVixHQUFtQixDQUFuQixJQUF3QixPQUFPaWxCLFFBQVAsS0FBb0IsVUFBaEQsRUFBNEQ7QUFDMUQscUJBQU9ELGFBQWFuTCxLQUFiLENBQW1CLElBQW5CLEVBQXlCcEMsU0FBekIsQ0FBUDtBQUNEOztBQUVEO0FBQ0E7QUFDQSxnQkFBSXVOLGFBQWFobEIsTUFBYixLQUF3QixDQUF4QixLQUE4QnlYLFVBQVV6WCxNQUFWLEtBQXFCLENBQXJCLElBQzlCLE9BQU95WCxVQUFVLENBQVYsQ0FBUCxLQUF3QixVQUR4QixDQUFKLEVBQ3lDO0FBQ3ZDLHFCQUFPdU4sYUFBYW5MLEtBQWIsQ0FBbUIsSUFBbkIsRUFBeUIsRUFBekIsQ0FBUDtBQUNEOztBQUVELGdCQUFJdUwsa0JBQWtCLFNBQWxCQSxlQUFrQixDQUFTQyxRQUFULEVBQW1CO0FBQ3ZDLGtCQUFJQyxpQkFBaUIsRUFBckI7QUFDQSxrQkFBSUMsVUFBVUYsU0FBUy9oQixNQUFULEVBQWQ7QUFDQWlpQixzQkFBUTlsQixPQUFSLENBQWdCLFVBQVMrbEIsTUFBVCxFQUFpQjtBQUMvQixvQkFBSUMsZ0JBQWdCO0FBQ2xCam5CLHNCQUFJZ25CLE9BQU9obkIsRUFETztBQUVsQmtuQiw2QkFBV0YsT0FBT0UsU0FGQTtBQUdsQnRwQix3QkFBTTtBQUNKK2Msb0NBQWdCLGlCQURaO0FBRUpDLHFDQUFpQjtBQUZiLG9CQUdKb00sT0FBT3BwQixJQUhILEtBR1lvcEIsT0FBT3BwQjtBQU5QLGlCQUFwQjtBQVFBb3BCLHVCQUFPRyxLQUFQLEdBQWVsbUIsT0FBZixDQUF1QixVQUFTdkUsSUFBVCxFQUFlO0FBQ3BDdXFCLGdDQUFjdnFCLElBQWQsSUFBc0JzcUIsT0FBT3pNLElBQVAsQ0FBWTdkLElBQVosQ0FBdEI7QUFDRCxpQkFGRDtBQUdBb3FCLCtCQUFlRyxjQUFjam5CLEVBQTdCLElBQW1DaW5CLGFBQW5DO0FBQ0QsZUFiRDs7QUFlQSxxQkFBT0gsY0FBUDtBQUNELGFBbkJEOztBQXFCQTtBQUNBLGdCQUFJTSxlQUFlLFNBQWZBLFlBQWUsQ0FBU3JtQixLQUFULEVBQWdCO0FBQ2pDLHFCQUFPLElBQUkrWixHQUFKLENBQVFwVSxPQUFPQyxJQUFQLENBQVk1RixLQUFaLEVBQW1CMFIsR0FBbkIsQ0FBdUIsVUFBU21PLEdBQVQsRUFBYztBQUNsRCx1QkFBTyxDQUFDQSxHQUFELEVBQU03ZixNQUFNNmYsR0FBTixDQUFOLENBQVA7QUFDRCxlQUZjLENBQVIsQ0FBUDtBQUdELGFBSkQ7O0FBTUEsZ0JBQUkzSCxVQUFVelgsTUFBVixJQUFvQixDQUF4QixFQUEyQjtBQUN6QixrQkFBSTZsQiwwQkFBMEIsU0FBMUJBLHVCQUEwQixDQUFTUixRQUFULEVBQW1CO0FBQy9DekwscUJBQUssQ0FBTCxFQUFRZ00sYUFBYVIsZ0JBQWdCQyxRQUFoQixDQUFiLENBQVI7QUFDRCxlQUZEOztBQUlBLHFCQUFPTCxhQUFhbkwsS0FBYixDQUFtQixJQUFuQixFQUF5QixDQUFDZ00sdUJBQUQsRUFDOUJwTyxVQUFVLENBQVYsQ0FEOEIsQ0FBekIsQ0FBUDtBQUVEOztBQUVEO0FBQ0EsbUJBQU8sSUFBSTdULE9BQUosQ0FBWSxVQUFTOUMsT0FBVCxFQUFrQitDLE1BQWxCLEVBQTBCO0FBQzNDbWhCLDJCQUFhbkwsS0FBYixDQUFtQnpNLEVBQW5CLEVBQXVCLENBQ3JCLFVBQVNpWSxRQUFULEVBQW1CO0FBQ2pCdmtCLHdCQUFROGtCLGFBQWFSLGdCQUFnQkMsUUFBaEIsQ0FBYixDQUFSO0FBQ0QsZUFIb0IsRUFHbEJ4aEIsTUFIa0IsQ0FBdkI7QUFJRCxhQUxNLEVBS0p2RSxJQUxJLENBS0M0bEIsZUFMRCxFQUtrQkMsYUFMbEIsQ0FBUDtBQU1ELFdBOUREOztBQWdFQTtBQUNBLGNBQUk1RixlQUFleEIsT0FBZixHQUF5QixFQUE3QixFQUFpQztBQUMvQixhQUFDLHFCQUFELEVBQXdCLHNCQUF4QixFQUFnRCxpQkFBaEQsRUFDS3RlLE9BREwsQ0FDYSxVQUFTb08sTUFBVCxFQUFpQjtBQUN4QixrQkFBSThMLGVBQWV4YixPQUFPNEMsaUJBQVAsQ0FBeUJvTyxTQUF6QixDQUFtQ3RCLE1BQW5DLENBQW5CO0FBQ0ExUCxxQkFBTzRDLGlCQUFQLENBQXlCb08sU0FBekIsQ0FBbUN0QixNQUFuQyxJQUE2QyxZQUFXO0FBQ3RELG9CQUFJK0wsT0FBT25DLFNBQVg7QUFDQSxvQkFBSXJLLEtBQUssSUFBVDtBQUNBLG9CQUFJMFksVUFBVSxJQUFJbGlCLE9BQUosQ0FBWSxVQUFTOUMsT0FBVCxFQUFrQitDLE1BQWxCLEVBQTBCO0FBQ2xEOFYsK0JBQWFFLEtBQWIsQ0FBbUJ6TSxFQUFuQixFQUF1QixDQUFDd00sS0FBSyxDQUFMLENBQUQsRUFBVTlZLE9BQVYsRUFBbUIrQyxNQUFuQixDQUF2QjtBQUNELGlCQUZhLENBQWQ7QUFHQSxvQkFBSStWLEtBQUs1WixNQUFMLEdBQWMsQ0FBbEIsRUFBcUI7QUFDbkIseUJBQU84bEIsT0FBUDtBQUNEO0FBQ0QsdUJBQU9BLFFBQVF4bUIsSUFBUixDQUFhLFlBQVc7QUFDN0JzYSx1QkFBSyxDQUFMLEVBQVFDLEtBQVIsQ0FBYyxJQUFkLEVBQW9CLEVBQXBCO0FBQ0QsaUJBRk0sRUFHUCxVQUFTb0ssR0FBVCxFQUFjO0FBQ1osc0JBQUlySyxLQUFLNVosTUFBTCxJQUFlLENBQW5CLEVBQXNCO0FBQ3BCNFoseUJBQUssQ0FBTCxFQUFRQyxLQUFSLENBQWMsSUFBZCxFQUFvQixDQUFDb0ssR0FBRCxDQUFwQjtBQUNEO0FBQ0YsaUJBUE0sQ0FBUDtBQVFELGVBakJEO0FBa0JELGFBckJMO0FBc0JEOztBQUVEO0FBQ0E7QUFDQSxjQUFJMUUsZUFBZXhCLE9BQWYsR0FBeUIsRUFBN0IsRUFBaUM7QUFDL0IsYUFBQyxhQUFELEVBQWdCLGNBQWhCLEVBQWdDdGUsT0FBaEMsQ0FBd0MsVUFBU29PLE1BQVQsRUFBaUI7QUFDdkQsa0JBQUk4TCxlQUFleGIsT0FBTzRDLGlCQUFQLENBQXlCb08sU0FBekIsQ0FBbUN0QixNQUFuQyxDQUFuQjtBQUNBMVAscUJBQU80QyxpQkFBUCxDQUF5Qm9PLFNBQXpCLENBQW1DdEIsTUFBbkMsSUFBNkMsWUFBVztBQUN0RCxvQkFBSVQsS0FBSyxJQUFUO0FBQ0Esb0JBQUlxSyxVQUFVelgsTUFBVixHQUFtQixDQUFuQixJQUF5QnlYLFVBQVV6WCxNQUFWLEtBQXFCLENBQXJCLElBQ3pCLFFBQU95WCxVQUFVLENBQVYsQ0FBUCxNQUF3QixRQUQ1QixFQUN1QztBQUNyQyxzQkFBSXFILE9BQU9ySCxVQUFVelgsTUFBVixLQUFxQixDQUFyQixHQUF5QnlYLFVBQVUsQ0FBVixDQUF6QixHQUF3QzlLLFNBQW5EO0FBQ0EseUJBQU8sSUFBSS9JLE9BQUosQ0FBWSxVQUFTOUMsT0FBVCxFQUFrQitDLE1BQWxCLEVBQTBCO0FBQzNDOFYsaUNBQWFFLEtBQWIsQ0FBbUJ6TSxFQUFuQixFQUF1QixDQUFDdE0sT0FBRCxFQUFVK0MsTUFBVixFQUFrQmliLElBQWxCLENBQXZCO0FBQ0QsbUJBRk0sQ0FBUDtBQUdEO0FBQ0QsdUJBQU9uRixhQUFhRSxLQUFiLENBQW1CLElBQW5CLEVBQXlCcEMsU0FBekIsQ0FBUDtBQUNELGVBVkQ7QUFXRCxhQWJEO0FBY0Q7O0FBRUQ7QUFDQSxXQUFDLHFCQUFELEVBQXdCLHNCQUF4QixFQUFnRCxpQkFBaEQsRUFDS2hZLE9BREwsQ0FDYSxVQUFTb08sTUFBVCxFQUFpQjtBQUN4QixnQkFBSThMLGVBQWV4YixPQUFPNEMsaUJBQVAsQ0FBeUJvTyxTQUF6QixDQUFtQ3RCLE1BQW5DLENBQW5CO0FBQ0ExUCxtQkFBTzRDLGlCQUFQLENBQXlCb08sU0FBekIsQ0FBbUN0QixNQUFuQyxJQUE2QyxZQUFXO0FBQ3RENEosd0JBQVUsQ0FBVixJQUFlLEtBQU01SixXQUFXLGlCQUFaLEdBQ2hCMVAsT0FBT3FHLGVBRFMsR0FFaEJyRyxPQUFPOEMscUJBRkksRUFFbUJ3VyxVQUFVLENBQVYsQ0FGbkIsQ0FBZjtBQUdBLHFCQUFPa0MsYUFBYUUsS0FBYixDQUFtQixJQUFuQixFQUF5QnBDLFNBQXpCLENBQVA7QUFDRCxhQUxEO0FBTUQsV0FUTDs7QUFXQTtBQUNBLGNBQUlzTyx3QkFDQTVuQixPQUFPNEMsaUJBQVAsQ0FBeUJvTyxTQUF6QixDQUFtQ3ROLGVBRHZDO0FBRUExRCxpQkFBTzRDLGlCQUFQLENBQXlCb08sU0FBekIsQ0FBbUN0TixlQUFuQyxHQUFxRCxZQUFXO0FBQzlELGdCQUFJLENBQUM0VixVQUFVLENBQVYsQ0FBTCxFQUFtQjtBQUNqQixrQkFBSUEsVUFBVSxDQUFWLENBQUosRUFBa0I7QUFDaEJBLDBCQUFVLENBQVYsRUFBYW9DLEtBQWIsQ0FBbUIsSUFBbkI7QUFDRDtBQUNELHFCQUFPalcsUUFBUTlDLE9BQVIsRUFBUDtBQUNEO0FBQ0QsbUJBQU9pbEIsc0JBQXNCbE0sS0FBdEIsQ0FBNEIsSUFBNUIsRUFBa0NwQyxTQUFsQyxDQUFQO0FBQ0QsV0FSRDtBQVNEO0FBMXRCYyxPQUFqQjtBQTZ0QkMsS0EzdUJ5SSxFQTJ1QnhJLEVBQUMsZUFBYyxFQUFmLEVBQWtCLGtCQUFpQixDQUFuQyxFQTN1QndJLENBdGtGZ3FCLEVBaXpHandCLEdBQUUsQ0FBQyxVQUFTMVEsT0FBVCxFQUFpQlQsTUFBakIsRUFBd0JELE9BQXhCLEVBQWdDO0FBQzVFOzs7Ozs7O0FBT0M7QUFDRDs7QUFDQSxVQUFJdVksUUFBUTdYLFFBQVEsYUFBUixDQUFaO0FBQ0EsVUFBSXVZLFVBQVVWLE1BQU10aUIsR0FBcEI7O0FBRUE7QUFDQWdLLGFBQU9ELE9BQVAsR0FBaUIsVUFBU2xJLE1BQVQsRUFBaUI7QUFDaEMsWUFBSW9oQixpQkFBaUJYLE1BQU1ZLGFBQU4sQ0FBb0JyaEIsTUFBcEIsQ0FBckI7QUFDQSxZQUFJNm5CLFlBQVk3bkIsVUFBVUEsT0FBTzZuQixTQUFqQzs7QUFFQSxZQUFJQyx1QkFBdUIsU0FBdkJBLG9CQUF1QixDQUFTeE4sQ0FBVCxFQUFZO0FBQ3JDLGNBQUksUUFBT0EsQ0FBUCx5Q0FBT0EsQ0FBUCxPQUFhLFFBQWIsSUFBeUJBLEVBQUVmLFNBQTNCLElBQXdDZSxFQUFFZCxRQUE5QyxFQUF3RDtBQUN0RCxtQkFBT2MsQ0FBUDtBQUNEO0FBQ0QsY0FBSXlOLEtBQUssRUFBVDtBQUNBaGhCLGlCQUFPQyxJQUFQLENBQVlzVCxDQUFaLEVBQWVoWixPQUFmLENBQXVCLFVBQVMyZixHQUFULEVBQWM7QUFDbkMsZ0JBQUlBLFFBQVEsU0FBUixJQUFxQkEsUUFBUSxVQUE3QixJQUEyQ0EsUUFBUSxhQUF2RCxFQUFzRTtBQUNwRTtBQUNEO0FBQ0QsZ0JBQUkxWSxJQUFLLFFBQU8rUixFQUFFMkcsR0FBRixDQUFQLE1BQWtCLFFBQW5CLEdBQStCM0csRUFBRTJHLEdBQUYsQ0FBL0IsR0FBd0MsRUFBQytHLE9BQU8xTixFQUFFMkcsR0FBRixDQUFSLEVBQWhEO0FBQ0EsZ0JBQUkxWSxFQUFFMGYsS0FBRixLQUFZelosU0FBWixJQUF5QixPQUFPakcsRUFBRTBmLEtBQVQsS0FBbUIsUUFBaEQsRUFBMEQ7QUFDeEQxZixnQkFBRW1FLEdBQUYsR0FBUW5FLEVBQUUyZixHQUFGLEdBQVEzZixFQUFFMGYsS0FBbEI7QUFDRDtBQUNELGdCQUFJRSxXQUFXLFNBQVhBLFFBQVcsQ0FBU2pNLE1BQVQsRUFBaUJuZixJQUFqQixFQUF1QjtBQUNwQyxrQkFBSW1mLE1BQUosRUFBWTtBQUNWLHVCQUFPQSxTQUFTbmYsS0FBS3FyQixNQUFMLENBQVksQ0FBWixFQUFlN0wsV0FBZixFQUFULEdBQXdDeGYsS0FBS2dqQixLQUFMLENBQVcsQ0FBWCxDQUEvQztBQUNEO0FBQ0QscUJBQVFoakIsU0FBUyxVQUFWLEdBQXdCLFVBQXhCLEdBQXFDQSxJQUE1QztBQUNELGFBTEQ7QUFNQSxnQkFBSXdMLEVBQUV5ZixLQUFGLEtBQVl4WixTQUFoQixFQUEyQjtBQUN6QnVaLGlCQUFHdk8sUUFBSCxHQUFjdU8sR0FBR3ZPLFFBQUgsSUFBZSxFQUE3QjtBQUNBLGtCQUFJNk8sS0FBSyxFQUFUO0FBQ0Esa0JBQUksT0FBTzlmLEVBQUV5ZixLQUFULEtBQW1CLFFBQXZCLEVBQWlDO0FBQy9CSyxtQkFBR0YsU0FBUyxLQUFULEVBQWdCbEgsR0FBaEIsQ0FBSCxJQUEyQjFZLEVBQUV5ZixLQUE3QjtBQUNBRCxtQkFBR3ZPLFFBQUgsQ0FBWTVYLElBQVosQ0FBaUJ5bUIsRUFBakI7QUFDQUEscUJBQUssRUFBTDtBQUNBQSxtQkFBR0YsU0FBUyxLQUFULEVBQWdCbEgsR0FBaEIsQ0FBSCxJQUEyQjFZLEVBQUV5ZixLQUE3QjtBQUNBRCxtQkFBR3ZPLFFBQUgsQ0FBWTVYLElBQVosQ0FBaUJ5bUIsRUFBakI7QUFDRCxlQU5ELE1BTU87QUFDTEEsbUJBQUdGLFNBQVMsRUFBVCxFQUFhbEgsR0FBYixDQUFILElBQXdCMVksRUFBRXlmLEtBQTFCO0FBQ0FELG1CQUFHdk8sUUFBSCxDQUFZNVgsSUFBWixDQUFpQnltQixFQUFqQjtBQUNEO0FBQ0Y7QUFDRCxnQkFBSTlmLEVBQUUwZixLQUFGLEtBQVl6WixTQUFaLElBQXlCLE9BQU9qRyxFQUFFMGYsS0FBVCxLQUFtQixRQUFoRCxFQUEwRDtBQUN4REYsaUJBQUd4TyxTQUFILEdBQWV3TyxHQUFHeE8sU0FBSCxJQUFnQixFQUEvQjtBQUNBd08saUJBQUd4TyxTQUFILENBQWE0TyxTQUFTLEVBQVQsRUFBYWxILEdBQWIsQ0FBYixJQUFrQzFZLEVBQUUwZixLQUFwQztBQUNELGFBSEQsTUFHTztBQUNMLGVBQUMsS0FBRCxFQUFRLEtBQVIsRUFBZTNtQixPQUFmLENBQXVCLFVBQVNnbkIsR0FBVCxFQUFjO0FBQ25DLG9CQUFJL2YsRUFBRStmLEdBQUYsTUFBVzlaLFNBQWYsRUFBMEI7QUFDeEJ1WixxQkFBR3hPLFNBQUgsR0FBZXdPLEdBQUd4TyxTQUFILElBQWdCLEVBQS9CO0FBQ0F3TyxxQkFBR3hPLFNBQUgsQ0FBYTRPLFNBQVNHLEdBQVQsRUFBY3JILEdBQWQsQ0FBYixJQUFtQzFZLEVBQUUrZixHQUFGLENBQW5DO0FBQ0Q7QUFDRixlQUxEO0FBTUQ7QUFDRixXQXZDRDtBQXdDQSxjQUFJaE8sRUFBRWlPLFFBQU4sRUFBZ0I7QUFDZFIsZUFBR3ZPLFFBQUgsR0FBYyxDQUFDdU8sR0FBR3ZPLFFBQUgsSUFBZSxFQUFoQixFQUFvQnVFLE1BQXBCLENBQTJCekQsRUFBRWlPLFFBQTdCLENBQWQ7QUFDRDtBQUNELGlCQUFPUixFQUFQO0FBQ0QsU0FqREQ7O0FBbURBLFlBQUlTLG1CQUFtQixTQUFuQkEsZ0JBQW1CLENBQVNDLFdBQVQsRUFBc0JDLElBQXRCLEVBQTRCO0FBQ2pELGNBQUl0SCxlQUFleEIsT0FBZixJQUEwQixFQUE5QixFQUFrQztBQUNoQyxtQkFBTzhJLEtBQUtELFdBQUwsQ0FBUDtBQUNEO0FBQ0RBLHdCQUFjN2hCLEtBQUtDLEtBQUwsQ0FBV0QsS0FBS29CLFNBQUwsQ0FBZXlnQixXQUFmLENBQVgsQ0FBZDtBQUNBLGNBQUlBLGVBQWUsUUFBT0EsWUFBWUUsS0FBbkIsTUFBNkIsUUFBaEQsRUFBMEQ7QUFDeEQsZ0JBQUlDLFFBQVEsU0FBUkEsS0FBUSxDQUFTdkosR0FBVCxFQUFjMVcsQ0FBZCxFQUFpQmtnQixDQUFqQixFQUFvQjtBQUM5QixrQkFBSWxnQixLQUFLMFcsR0FBTCxJQUFZLEVBQUV3SixLQUFLeEosR0FBUCxDQUFoQixFQUE2QjtBQUMzQkEsb0JBQUl3SixDQUFKLElBQVN4SixJQUFJMVcsQ0FBSixDQUFUO0FBQ0EsdUJBQU8wVyxJQUFJMVcsQ0FBSixDQUFQO0FBQ0Q7QUFDRixhQUxEO0FBTUE4ZiwwQkFBYzdoQixLQUFLQyxLQUFMLENBQVdELEtBQUtvQixTQUFMLENBQWV5Z0IsV0FBZixDQUFYLENBQWQ7QUFDQUcsa0JBQU1ILFlBQVlFLEtBQWxCLEVBQXlCLGlCQUF6QixFQUE0QyxxQkFBNUM7QUFDQUMsa0JBQU1ILFlBQVlFLEtBQWxCLEVBQXlCLGtCQUF6QixFQUE2QyxzQkFBN0M7QUFDQUYsd0JBQVlFLEtBQVosR0FBb0JiLHFCQUFxQlcsWUFBWUUsS0FBakMsQ0FBcEI7QUFDRDtBQUNELGNBQUlGLGVBQWUsUUFBT0EsWUFBWUssS0FBbkIsTUFBNkIsUUFBaEQsRUFBMEQ7QUFDeEQ7QUFDQSxnQkFBSUMsT0FBT04sWUFBWUssS0FBWixDQUFrQkUsVUFBN0I7QUFDQUQsbUJBQU9BLFNBQVUsUUFBT0EsSUFBUCx5Q0FBT0EsSUFBUCxPQUFnQixRQUFqQixHQUE2QkEsSUFBN0IsR0FBb0MsRUFBQ2YsT0FBT2UsSUFBUixFQUE3QyxDQUFQO0FBQ0EsZ0JBQUlFLDZCQUE2QjdILGVBQWV4QixPQUFmLEdBQXlCLEVBQTFEOztBQUVBLGdCQUFLbUosU0FBU0EsS0FBS2QsS0FBTCxLQUFlLE1BQWYsSUFBeUJjLEtBQUtkLEtBQUwsS0FBZSxhQUF4QyxJQUNBYyxLQUFLZixLQUFMLEtBQWUsTUFEZixJQUN5QmUsS0FBS2YsS0FBTCxLQUFlLGFBRGpELENBQUQsSUFFQSxFQUFFSCxVQUFVcUIsWUFBVixDQUF1QkMsdUJBQXZCLElBQ0F0QixVQUFVcUIsWUFBVixDQUF1QkMsdUJBQXZCLEdBQWlESCxVQURqRCxJQUVBLENBQUNDLDBCQUZILENBRkosRUFJb0M7QUFDbEMscUJBQU9SLFlBQVlLLEtBQVosQ0FBa0JFLFVBQXpCO0FBQ0Esa0JBQUlJLE9BQUo7QUFDQSxrQkFBSUwsS0FBS2QsS0FBTCxLQUFlLGFBQWYsSUFBZ0NjLEtBQUtmLEtBQUwsS0FBZSxhQUFuRCxFQUFrRTtBQUNoRW9CLDBCQUFVLENBQUMsTUFBRCxFQUFTLE1BQVQsQ0FBVjtBQUNELGVBRkQsTUFFTyxJQUFJTCxLQUFLZCxLQUFMLEtBQWUsTUFBZixJQUF5QmMsS0FBS2YsS0FBTCxLQUFlLE1BQTVDLEVBQW9EO0FBQ3pEb0IsMEJBQVUsQ0FBQyxPQUFELENBQVY7QUFDRDtBQUNELGtCQUFJQSxPQUFKLEVBQWE7QUFDWDtBQUNBLHVCQUFPdkIsVUFBVXFCLFlBQVYsQ0FBdUJHLGdCQUF2QixHQUNObG9CLElBRE0sQ0FDRCxVQUFTbW9CLE9BQVQsRUFBa0I7QUFDdEJBLDRCQUFVQSxRQUFRNWUsTUFBUixDQUFlLFVBQVM2ZSxDQUFULEVBQVk7QUFDbkMsMkJBQU9BLEVBQUVob0IsSUFBRixLQUFXLFlBQWxCO0FBQ0QsbUJBRlMsQ0FBVjtBQUdBLHNCQUFJaW9CLE1BQU1GLFFBQVEzYixJQUFSLENBQWEsVUFBUzRiLENBQVQsRUFBWTtBQUNqQywyQkFBT0gsUUFBUUssSUFBUixDQUFhLFVBQVNya0IsS0FBVCxFQUFnQjtBQUNsQyw2QkFBT21rQixFQUFFRyxLQUFGLENBQVFwZCxXQUFSLEdBQXNCckIsT0FBdEIsQ0FBOEI3RixLQUE5QixNQUF5QyxDQUFDLENBQWpEO0FBQ0QscUJBRk0sQ0FBUDtBQUdELG1CQUpTLENBQVY7QUFLQSxzQkFBSSxDQUFDb2tCLEdBQUQsSUFBUUYsUUFBUXpuQixNQUFoQixJQUEwQnVuQixRQUFRbmUsT0FBUixDQUFnQixNQUFoQixNQUE0QixDQUFDLENBQTNELEVBQThEO0FBQzVEdWUsMEJBQU1GLFFBQVFBLFFBQVF6bkIsTUFBUixHQUFpQixDQUF6QixDQUFOLENBRDRELENBQ3pCO0FBQ3BDO0FBQ0Qsc0JBQUkybkIsR0FBSixFQUFTO0FBQ1BmLGdDQUFZSyxLQUFaLENBQWtCYSxRQUFsQixHQUE2QlosS0FBS2QsS0FBTCxHQUFhLEVBQUNBLE9BQU91QixJQUFJRyxRQUFaLEVBQWIsR0FDYSxFQUFDM0IsT0FBT3dCLElBQUlHLFFBQVosRUFEMUM7QUFFRDtBQUNEbEIsOEJBQVlLLEtBQVosR0FBb0JoQixxQkFBcUJXLFlBQVlLLEtBQWpDLENBQXBCO0FBQ0EzSCwwQkFBUSxhQUFhdmEsS0FBS29CLFNBQUwsQ0FBZXlnQixXQUFmLENBQXJCO0FBQ0EseUJBQU9DLEtBQUtELFdBQUwsQ0FBUDtBQUNELGlCQXBCTSxDQUFQO0FBcUJEO0FBQ0Y7QUFDREEsd0JBQVlLLEtBQVosR0FBb0JoQixxQkFBcUJXLFlBQVlLLEtBQWpDLENBQXBCO0FBQ0Q7QUFDRDNILGtCQUFRLGFBQWF2YSxLQUFLb0IsU0FBTCxDQUFleWdCLFdBQWYsQ0FBckI7QUFDQSxpQkFBT0MsS0FBS0QsV0FBTCxDQUFQO0FBQ0QsU0FoRUQ7O0FBa0VBLFlBQUltQixhQUFhLFNBQWJBLFVBQWEsQ0FBU2htQixDQUFULEVBQVk7QUFDM0IsaUJBQU87QUFDTDdHLGtCQUFNO0FBQ0o4c0IscUNBQXVCLGlCQURuQjtBQUVKQyx3Q0FBMEIsaUJBRnRCO0FBR0p6YixpQ0FBbUIsaUJBSGY7QUFJSjBiLG9DQUFzQixlQUpsQjtBQUtKQywyQ0FBNkIsc0JBTHpCO0FBTUpDLCtCQUFpQixrQkFOYjtBQU9KQyw4Q0FBZ0MsaUJBUDVCO0FBUUpDLHVDQUF5QixpQkFSckI7QUFTSkMsK0JBQWlCLFlBVGI7QUFVSkMsa0NBQW9CLFlBVmhCO0FBV0pDLGtDQUFvQjtBQVhoQixjQVlKMW1CLEVBQUU3RyxJQVpFLEtBWU82RyxFQUFFN0csSUFiVjtBQWNMNEoscUJBQVMvQyxFQUFFK0MsT0FkTjtBQWVMNGpCLHdCQUFZM21CLEVBQUU0bUIsY0FmVDtBQWdCTDVPLHNCQUFVLG9CQUFXO0FBQ25CLHFCQUFPLEtBQUs3ZSxJQUFMLElBQWEsS0FBSzRKLE9BQUwsSUFBZ0IsSUFBN0IsSUFBcUMsS0FBS0EsT0FBakQ7QUFDRDtBQWxCSSxXQUFQO0FBb0JELFNBckJEOztBQXVCQSxZQUFJOGpCLGdCQUFnQixTQUFoQkEsYUFBZ0IsQ0FBU2hDLFdBQVQsRUFBc0JpQyxTQUF0QixFQUFpQ0MsT0FBakMsRUFBMEM7QUFDNURuQywyQkFBaUJDLFdBQWpCLEVBQThCLFVBQVNuTyxDQUFULEVBQVk7QUFDeEN1TixzQkFBVStDLGtCQUFWLENBQTZCdFEsQ0FBN0IsRUFBZ0NvUSxTQUFoQyxFQUEyQyxVQUFTOW1CLENBQVQsRUFBWTtBQUNyRCxrQkFBSSttQixPQUFKLEVBQWE7QUFDWEEsd0JBQVFmLFdBQVdobUIsQ0FBWCxDQUFSO0FBQ0Q7QUFDRixhQUpEO0FBS0QsV0FORDtBQU9ELFNBUkQ7O0FBVUFpa0Isa0JBQVVnRCxZQUFWLEdBQXlCSixhQUF6Qjs7QUFFQTtBQUNBLFlBQUlLLHVCQUF1QixTQUF2QkEsb0JBQXVCLENBQVNyQyxXQUFULEVBQXNCO0FBQy9DLGlCQUFPLElBQUloakIsT0FBSixDQUFZLFVBQVM5QyxPQUFULEVBQWtCK0MsTUFBbEIsRUFBMEI7QUFDM0NtaUIsc0JBQVVnRCxZQUFWLENBQXVCcEMsV0FBdkIsRUFBb0M5bEIsT0FBcEMsRUFBNkMrQyxNQUE3QztBQUNELFdBRk0sQ0FBUDtBQUdELFNBSkQ7O0FBTUEsWUFBSSxDQUFDbWlCLFVBQVVxQixZQUFmLEVBQTZCO0FBQzNCckIsb0JBQVVxQixZQUFWLEdBQXlCO0FBQ3ZCMkIsMEJBQWNDLG9CQURTO0FBRXZCekIsOEJBQWtCLDRCQUFXO0FBQzNCLHFCQUFPLElBQUk1akIsT0FBSixDQUFZLFVBQVM5QyxPQUFULEVBQWtCO0FBQ25DLG9CQUFJb29CLFFBQVEsRUFBQ3BDLE9BQU8sWUFBUixFQUFzQkcsT0FBTyxZQUE3QixFQUFaO0FBQ0EsdUJBQU85b0IsT0FBT2dyQixnQkFBUCxDQUF3QkMsVUFBeEIsQ0FBbUMsVUFBUzNCLE9BQVQsRUFBa0I7QUFDMUQzbUIsMEJBQVEybUIsUUFBUXhXLEdBQVIsQ0FBWSxVQUFTb1ksTUFBVCxFQUFpQjtBQUNuQywyQkFBTyxFQUFDeEIsT0FBT3dCLE9BQU94QixLQUFmO0FBQ0xub0IsNEJBQU13cEIsTUFBTUcsT0FBTzNwQixJQUFiLENBREQ7QUFFTG9vQixnQ0FBVXVCLE9BQU83cUIsRUFGWjtBQUdMOHFCLCtCQUFTLEVBSEosRUFBUDtBQUlELG1CQUxPLENBQVI7QUFNRCxpQkFQTSxDQUFQO0FBUUQsZUFWTSxDQUFQO0FBV0QsYUFkc0I7QUFldkJoQyxxQ0FBeUIsbUNBQVc7QUFDbEMscUJBQU87QUFDTFEsMEJBQVUsSUFETCxFQUNXeUIsa0JBQWtCLElBRDdCLEVBQ21DcEMsWUFBWSxJQUQvQztBQUVMcUMsMkJBQVcsSUFGTixFQUVZQyxRQUFRLElBRnBCLEVBRTBCQyxPQUFPO0FBRmpDLGVBQVA7QUFJRDtBQXBCc0IsV0FBekI7QUFzQkQ7O0FBRUQ7QUFDQTtBQUNBLFlBQUksQ0FBQzFELFVBQVVxQixZQUFWLENBQXVCMkIsWUFBNUIsRUFBMEM7QUFDeENoRCxvQkFBVXFCLFlBQVYsQ0FBdUIyQixZQUF2QixHQUFzQyxVQUFTcEMsV0FBVCxFQUFzQjtBQUMxRCxtQkFBT3FDLHFCQUFxQnJDLFdBQXJCLENBQVA7QUFDRCxXQUZEO0FBR0QsU0FKRCxNQUlPO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsY0FBSStDLG1CQUFtQjNELFVBQVVxQixZQUFWLENBQXVCMkIsWUFBdkIsQ0FDbkJsYixJQURtQixDQUNka1ksVUFBVXFCLFlBREksQ0FBdkI7QUFFQXJCLG9CQUFVcUIsWUFBVixDQUF1QjJCLFlBQXZCLEdBQXNDLFVBQVNZLEVBQVQsRUFBYTtBQUNqRCxtQkFBT2pELGlCQUFpQmlELEVBQWpCLEVBQXFCLFVBQVNuUixDQUFULEVBQVk7QUFDdEMscUJBQU9rUixpQkFBaUJsUixDQUFqQixFQUFvQm5aLElBQXBCLENBQXlCLFVBQVM3QyxNQUFULEVBQWlCO0FBQy9DLG9CQUFJZ2MsRUFBRXFPLEtBQUYsSUFBVyxDQUFDcnFCLE9BQU82YixjQUFQLEdBQXdCdFksTUFBcEMsSUFDQXlZLEVBQUV3TyxLQUFGLElBQVcsQ0FBQ3hxQixPQUFPOGIsY0FBUCxHQUF3QnZZLE1BRHhDLEVBQ2dEO0FBQzlDdkQseUJBQU9nVSxTQUFQLEdBQW1CaFIsT0FBbkIsQ0FBMkIsVUFBUzJJLEtBQVQsRUFBZ0I7QUFDekNBLDBCQUFNNEksSUFBTjtBQUNELG1CQUZEO0FBR0Esd0JBQU0sSUFBSWlTLFlBQUosQ0FBaUIsRUFBakIsRUFBcUIsZUFBckIsQ0FBTjtBQUNEO0FBQ0QsdUJBQU94bUIsTUFBUDtBQUNELGVBVE0sRUFTSixVQUFTc0YsQ0FBVCxFQUFZO0FBQ2IsdUJBQU82QixRQUFRQyxNQUFSLENBQWVra0IsV0FBV2htQixDQUFYLENBQWYsQ0FBUDtBQUNELGVBWE0sQ0FBUDtBQVlELGFBYk0sQ0FBUDtBQWNELFdBZkQ7QUFnQkQ7O0FBRUQ7QUFDQTtBQUNBLFlBQUksT0FBT2lrQixVQUFVcUIsWUFBVixDQUF1QnhXLGdCQUE5QixLQUFtRCxXQUF2RCxFQUFvRTtBQUNsRW1WLG9CQUFVcUIsWUFBVixDQUF1QnhXLGdCQUF2QixHQUEwQyxZQUFXO0FBQ25EeU8sb0JBQVEsNkNBQVI7QUFDRCxXQUZEO0FBR0Q7QUFDRCxZQUFJLE9BQU8wRyxVQUFVcUIsWUFBVixDQUF1QnJWLG1CQUE5QixLQUFzRCxXQUExRCxFQUF1RTtBQUNyRWdVLG9CQUFVcUIsWUFBVixDQUF1QnJWLG1CQUF2QixHQUE2QyxZQUFXO0FBQ3REc04sb0JBQVEsZ0RBQVI7QUFDRCxXQUZEO0FBR0Q7QUFDRixPQXRPRDtBQXdPQyxLQXRQMEMsRUFzUHpDLEVBQUMsZUFBYyxFQUFmLEVBdFB5QyxDQWp6Ryt2QixFQXVpSHB4QixHQUFFLENBQUMsVUFBU3ZZLE9BQVQsRUFBaUJULE1BQWpCLEVBQXdCRCxPQUF4QixFQUFnQztBQUN6RDs7Ozs7OztBQU9DO0FBQ0Q7O0FBRUEsVUFBSWUsV0FBV0wsUUFBUSxLQUFSLENBQWY7QUFDQSxVQUFJNlgsUUFBUTdYLFFBQVEsU0FBUixDQUFaOztBQUVBVCxhQUFPRCxPQUFQLEdBQWlCO0FBQ2ZzYSw2QkFBcUIsNkJBQVN4aUIsTUFBVCxFQUFpQjtBQUNwQztBQUNBO0FBQ0EsY0FBSSxDQUFDQSxPQUFPcUcsZUFBUixJQUE0QnJHLE9BQU9xRyxlQUFQLElBQTBCLGdCQUN0RHJHLE9BQU9xRyxlQUFQLENBQXVCMkssU0FEM0IsRUFDdUM7QUFDckM7QUFDRDs7QUFFRCxjQUFJMGEsd0JBQXdCMXJCLE9BQU9xRyxlQUFuQztBQUNBckcsaUJBQU9xRyxlQUFQLEdBQXlCLFVBQVNvVixJQUFULEVBQWU7QUFDdEM7QUFDQSxnQkFBSSxRQUFPQSxJQUFQLHlDQUFPQSxJQUFQLE9BQWdCLFFBQWhCLElBQTRCQSxLQUFLNVgsU0FBakMsSUFDQTRYLEtBQUs1WCxTQUFMLENBQWVvSCxPQUFmLENBQXVCLElBQXZCLE1BQWlDLENBRHJDLEVBQ3dDO0FBQ3RDd1EscUJBQU83VSxLQUFLQyxLQUFMLENBQVdELEtBQUtvQixTQUFMLENBQWV5VCxJQUFmLENBQVgsQ0FBUDtBQUNBQSxtQkFBSzVYLFNBQUwsR0FBaUI0WCxLQUFLNVgsU0FBTCxDQUFlbVQsTUFBZixDQUFzQixDQUF0QixDQUFqQjtBQUNEOztBQUVELGdCQUFJeUUsS0FBSzVYLFNBQUwsSUFBa0I0WCxLQUFLNVgsU0FBTCxDQUFlaEMsTUFBckMsRUFBNkM7QUFDM0M7QUFDQSxrQkFBSThwQixrQkFBa0IsSUFBSUQscUJBQUosQ0FBMEJqUSxJQUExQixDQUF0QjtBQUNBLGtCQUFJbVEsa0JBQWtCM2lCLFNBQVNxTCxjQUFULENBQXdCbUgsS0FBSzVYLFNBQTdCLENBQXRCO0FBQ0Esa0JBQUlnb0IscUJBQXFCLFNBQWNGLGVBQWQsRUFDckJDLGVBRHFCLENBQXpCOztBQUdBO0FBQ0FDLGlDQUFtQnRYLE1BQW5CLEdBQTRCLFlBQVc7QUFDckMsdUJBQU87QUFDTDFRLDZCQUFXZ29CLG1CQUFtQmhvQixTQUR6QjtBQUVMa1EsMEJBQVE4WCxtQkFBbUI5WCxNQUZ0QjtBQUdMWCxpQ0FBZXlZLG1CQUFtQnpZLGFBSDdCO0FBSUxlLG9DQUFrQjBYLG1CQUFtQjFYO0FBSmhDLGlCQUFQO0FBTUQsZUFQRDtBQVFBLHFCQUFPMFgsa0JBQVA7QUFDRDtBQUNELG1CQUFPLElBQUlILHFCQUFKLENBQTBCalEsSUFBMUIsQ0FBUDtBQUNELFdBM0JEO0FBNEJBemIsaUJBQU9xRyxlQUFQLENBQXVCMkssU0FBdkIsR0FBbUMwYSxzQkFBc0IxYSxTQUF6RDs7QUFFQTtBQUNBO0FBQ0F5UCxnQkFBTStDLHVCQUFOLENBQThCeGpCLE1BQTlCLEVBQXNDLGNBQXRDLEVBQXNELFVBQVM0RCxDQUFULEVBQVk7QUFDaEUsZ0JBQUlBLEVBQUVDLFNBQU4sRUFBaUI7QUFDZmtELHFCQUFPc00sY0FBUCxDQUFzQnpQLENBQXRCLEVBQXlCLFdBQXpCLEVBQXNDO0FBQ3BDMFAsdUJBQU8sSUFBSXRULE9BQU9xRyxlQUFYLENBQTJCekMsRUFBRUMsU0FBN0IsQ0FENkI7QUFFcEMwUCwwQkFBVTtBQUYwQixlQUF0QztBQUlEO0FBQ0QsbUJBQU8zUCxDQUFQO0FBQ0QsV0FSRDtBQVNELFNBbkRjOztBQXFEZjs7QUFFQXFlLDZCQUFxQiw2QkFBU2ppQixNQUFULEVBQWlCO0FBQ3BDLGNBQUlxa0IsTUFBTXJrQixVQUFVQSxPQUFPcWtCLEdBQTNCOztBQUVBLGNBQUksRUFBRSxRQUFPcmtCLE1BQVAseUNBQU9BLE1BQVAsT0FBa0IsUUFBbEIsSUFBOEJBLE9BQU9za0IsZ0JBQXJDLElBQ0EsZUFBZXRrQixPQUFPc2tCLGdCQUFQLENBQXdCdFQsU0FEdkMsSUFFRnFULElBQUlLLGVBRkYsSUFFcUJMLElBQUlJLGVBRjNCLENBQUosRUFFaUQ7QUFDL0M7QUFDQSxtQkFBT2pXLFNBQVA7QUFDRDs7QUFFRCxjQUFJc2Qsd0JBQXdCekgsSUFBSUssZUFBSixDQUFvQi9VLElBQXBCLENBQXlCMFUsR0FBekIsQ0FBNUI7QUFDQSxjQUFJMEgsd0JBQXdCMUgsSUFBSUksZUFBSixDQUFvQjlVLElBQXBCLENBQXlCMFUsR0FBekIsQ0FBNUI7QUFDQSxjQUFJamdCLFVBQVUsSUFBSStXLEdBQUosRUFBZDtBQUFBLGNBQXlCNlEsUUFBUSxDQUFqQzs7QUFFQTNILGNBQUlLLGVBQUosR0FBc0IsVUFBU3BtQixNQUFULEVBQWlCO0FBQ3JDLGdCQUFJLGVBQWVBLE1BQW5CLEVBQTJCO0FBQ3pCLGtCQUFJNEcsTUFBTSxjQUFlLEVBQUU4bUIsS0FBM0I7QUFDQTVuQixzQkFBUWtYLEdBQVIsQ0FBWXBXLEdBQVosRUFBaUI1RyxNQUFqQjtBQUNBbWlCLG9CQUFNbUcsVUFBTixDQUFpQiw2QkFBakIsRUFDSSx5QkFESjtBQUVBLHFCQUFPMWhCLEdBQVA7QUFDRDtBQUNELG1CQUFPNG1CLHNCQUFzQnh0QixNQUF0QixDQUFQO0FBQ0QsV0FURDtBQVVBK2xCLGNBQUlJLGVBQUosR0FBc0IsVUFBU3ZmLEdBQVQsRUFBYztBQUNsQzZtQixrQ0FBc0I3bUIsR0FBdEI7QUFDQWQsOEJBQWVjLEdBQWY7QUFDRCxXQUhEOztBQUtBLGNBQUkrbUIsTUFBTWxsQixPQUFPa2Ysd0JBQVAsQ0FBZ0NqbUIsT0FBT3NrQixnQkFBUCxDQUF3QnRULFNBQXhELEVBQ2dDLEtBRGhDLENBQVY7QUFFQWpLLGlCQUFPc00sY0FBUCxDQUFzQnJULE9BQU9za0IsZ0JBQVAsQ0FBd0J0VCxTQUE5QyxFQUF5RCxLQUF6RCxFQUFnRTtBQUM5RHNILGlCQUFLLGVBQVc7QUFDZCxxQkFBTzJULElBQUkzVCxHQUFKLENBQVFvRCxLQUFSLENBQWMsSUFBZCxDQUFQO0FBQ0QsYUFINkQ7QUFJOURKLGlCQUFLLGFBQVNwVyxHQUFULEVBQWM7QUFDakIsbUJBQUszRyxTQUFMLEdBQWlCNkYsUUFBUWtVLEdBQVIsQ0FBWXBULEdBQVosS0FBb0IsSUFBckM7QUFDQSxxQkFBTyttQixJQUFJM1EsR0FBSixDQUFRSSxLQUFSLENBQWMsSUFBZCxFQUFvQixDQUFDeFcsR0FBRCxDQUFwQixDQUFQO0FBQ0Q7QUFQNkQsV0FBaEU7O0FBVUEsY0FBSWduQixxQkFBcUJsc0IsT0FBT3NrQixnQkFBUCxDQUF3QnRULFNBQXhCLENBQWtDbWIsWUFBM0Q7QUFDQW5zQixpQkFBT3NrQixnQkFBUCxDQUF3QnRULFNBQXhCLENBQWtDbWIsWUFBbEMsR0FBaUQsWUFBVztBQUMxRCxnQkFBSTdTLFVBQVV6WCxNQUFWLEtBQXFCLENBQXJCLElBQ0EsQ0FBQyxLQUFLeVgsVUFBVSxDQUFWLENBQU4sRUFBb0JoTixXQUFwQixPQUFzQyxLQUQxQyxFQUNpRDtBQUMvQyxtQkFBSy9OLFNBQUwsR0FBaUI2RixRQUFRa1UsR0FBUixDQUFZZ0IsVUFBVSxDQUFWLENBQVosS0FBNkIsSUFBOUM7QUFDRDtBQUNELG1CQUFPNFMsbUJBQW1CeFEsS0FBbkIsQ0FBeUIsSUFBekIsRUFBK0JwQyxTQUEvQixDQUFQO0FBQ0QsV0FORDtBQU9ELFNBeEdjOztBQTBHZm1KLDRCQUFvQiw0QkFBU3ppQixNQUFULEVBQWlCO0FBQ25DLGNBQUlBLE9BQU9vc0IsZ0JBQVAsSUFBMkIsQ0FBQ3BzQixPQUFPNEMsaUJBQXZDLEVBQTBEO0FBQ3hEO0FBQ0Q7QUFDRCxjQUFJd2UsaUJBQWlCWCxNQUFNWSxhQUFOLENBQW9CcmhCLE1BQXBCLENBQXJCOztBQUVBLGNBQUksRUFBRSxVQUFVQSxPQUFPNEMsaUJBQVAsQ0FBeUJvTyxTQUFyQyxDQUFKLEVBQXFEO0FBQ25EakssbUJBQU9zTSxjQUFQLENBQXNCclQsT0FBTzRDLGlCQUFQLENBQXlCb08sU0FBL0MsRUFBMEQsTUFBMUQsRUFBa0U7QUFDaEVzSCxtQkFBSyxlQUFXO0FBQ2QsdUJBQU8sT0FBTyxLQUFLK1QsS0FBWixLQUFzQixXQUF0QixHQUFvQyxJQUFwQyxHQUEyQyxLQUFLQSxLQUF2RDtBQUNEO0FBSCtELGFBQWxFO0FBS0Q7O0FBRUQsY0FBSUMsb0JBQW9CLFNBQXBCQSxpQkFBb0IsQ0FBU25lLFdBQVQsRUFBc0I7QUFDNUMsZ0JBQUlxRyxXQUFXdkwsU0FBUytNLGFBQVQsQ0FBdUI3SCxZQUFZMUwsR0FBbkMsQ0FBZjtBQUNBK1IscUJBQVMxUyxLQUFUO0FBQ0EsbUJBQU8wUyxTQUFTaVYsSUFBVCxDQUFjLFVBQVN4VCxZQUFULEVBQXVCO0FBQzFDLGtCQUFJc1csUUFBUXRqQixTQUFTNFcsVUFBVCxDQUFvQjVKLFlBQXBCLENBQVo7QUFDQSxxQkFBT3NXLFNBQVNBLE1BQU1ockIsSUFBTixLQUFlLGFBQXhCLElBQ0FnckIsTUFBTXZlLFFBQU4sQ0FBZS9DLE9BQWYsQ0FBdUIsTUFBdkIsTUFBbUMsQ0FBQyxDQUQzQztBQUVELGFBSk0sQ0FBUDtBQUtELFdBUkQ7O0FBVUEsY0FBSXVoQiwwQkFBMEIsU0FBMUJBLHVCQUEwQixDQUFTcmUsV0FBVCxFQUFzQjtBQUNsRDtBQUNBLGdCQUFJL0ksUUFBUStJLFlBQVkxTCxHQUFaLENBQWdCMkMsS0FBaEIsQ0FBc0IsaUNBQXRCLENBQVo7QUFDQSxnQkFBSUEsVUFBVSxJQUFWLElBQWtCQSxNQUFNdkQsTUFBTixHQUFlLENBQXJDLEVBQXdDO0FBQ3RDLHFCQUFPLENBQUMsQ0FBUjtBQUNEO0FBQ0QsZ0JBQUkrZCxVQUFVbGUsU0FBUzBELE1BQU0sQ0FBTixDQUFULEVBQW1CLEVBQW5CLENBQWQ7QUFDQTtBQUNBLG1CQUFPd2EsWUFBWUEsT0FBWixHQUFzQixDQUFDLENBQXZCLEdBQTJCQSxPQUFsQztBQUNELFdBVEQ7O0FBV0EsY0FBSTZNLDJCQUEyQixTQUEzQkEsd0JBQTJCLENBQVNDLGVBQVQsRUFBMEI7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBSUMsd0JBQXdCLEtBQTVCO0FBQ0EsZ0JBQUl2TCxlQUFlemIsT0FBZixLQUEyQixTQUEvQixFQUEwQztBQUN4QyxrQkFBSXliLGVBQWV4QixPQUFmLEdBQXlCLEVBQTdCLEVBQWlDO0FBQy9CLG9CQUFJOE0sb0JBQW9CLENBQUMsQ0FBekIsRUFBNEI7QUFDMUI7QUFDQTtBQUNBQywwQ0FBd0IsS0FBeEI7QUFDRCxpQkFKRCxNQUlPO0FBQ0w7QUFDQTtBQUNBQSwwQ0FBd0IsVUFBeEI7QUFDRDtBQUNGLGVBVkQsTUFVTztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0FBLHdDQUNFdkwsZUFBZXhCLE9BQWYsS0FBMkIsRUFBM0IsR0FBZ0MsS0FBaEMsR0FBd0MsS0FEMUM7QUFFRDtBQUNGO0FBQ0QsbUJBQU8rTSxxQkFBUDtBQUNELFdBM0JEOztBQTZCQSxjQUFJQyxvQkFBb0IsU0FBcEJBLGlCQUFvQixDQUFTemUsV0FBVCxFQUFzQnVlLGVBQXRCLEVBQXVDO0FBQzdEO0FBQ0E7QUFDQSxnQkFBSUcsaUJBQWlCLEtBQXJCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFJekwsZUFBZXpiLE9BQWYsS0FBMkIsU0FBM0IsSUFDSXliLGVBQWV4QixPQUFmLEtBQTJCLEVBRG5DLEVBQ3VDO0FBQ3JDaU4sK0JBQWlCLEtBQWpCO0FBQ0Q7O0FBRUQsZ0JBQUl6bkIsUUFBUTZELFNBQVNtTixXQUFULENBQXFCakksWUFBWTFMLEdBQWpDLEVBQXNDLHFCQUF0QyxDQUFaO0FBQ0EsZ0JBQUkyQyxNQUFNdkQsTUFBTixHQUFlLENBQW5CLEVBQXNCO0FBQ3BCZ3JCLCtCQUFpQm5yQixTQUFTMEQsTUFBTSxDQUFOLEVBQVM0UixNQUFULENBQWdCLEVBQWhCLENBQVQsRUFBOEIsRUFBOUIsQ0FBakI7QUFDRCxhQUZELE1BRU8sSUFBSW9LLGVBQWV6YixPQUFmLEtBQTJCLFNBQTNCLElBQ0MrbUIsb0JBQW9CLENBQUMsQ0FEMUIsRUFDNkI7QUFDbEM7QUFDQTtBQUNBO0FBQ0FHLCtCQUFpQixVQUFqQjtBQUNEO0FBQ0QsbUJBQU9BLGNBQVA7QUFDRCxXQXhCRDs7QUEwQkEsY0FBSXhKLDJCQUNBcmpCLE9BQU80QyxpQkFBUCxDQUF5Qm9PLFNBQXpCLENBQW1Dbk8sb0JBRHZDO0FBRUE3QyxpQkFBTzRDLGlCQUFQLENBQXlCb08sU0FBekIsQ0FBbUNuTyxvQkFBbkMsR0FBMEQsWUFBVztBQUNuRSxnQkFBSW9NLEtBQUssSUFBVDtBQUNBQSxlQUFHb2QsS0FBSCxHQUFXLElBQVg7O0FBRUEsZ0JBQUlDLGtCQUFrQmhULFVBQVUsQ0FBVixDQUFsQixDQUFKLEVBQXFDO0FBQ25DO0FBQ0Esa0JBQUl3VCxZQUFZTix3QkFBd0JsVCxVQUFVLENBQVYsQ0FBeEIsQ0FBaEI7O0FBRUE7QUFDQSxrQkFBSXlULGFBQWFOLHlCQUF5QkssU0FBekIsQ0FBakI7O0FBRUE7QUFDQSxrQkFBSUUsWUFBWUosa0JBQWtCdFQsVUFBVSxDQUFWLENBQWxCLEVBQWdDd1QsU0FBaEMsQ0FBaEI7O0FBRUE7QUFDQSxrQkFBSUQsY0FBSjtBQUNBLGtCQUFJRSxlQUFlLENBQWYsSUFBb0JDLGNBQWMsQ0FBdEMsRUFBeUM7QUFDdkNILGlDQUFpQkksT0FBT0MsaUJBQXhCO0FBQ0QsZUFGRCxNQUVPLElBQUlILGVBQWUsQ0FBZixJQUFvQkMsY0FBYyxDQUF0QyxFQUF5QztBQUM5Q0gsaUNBQWlCcGdCLEtBQUt5YixHQUFMLENBQVM2RSxVQUFULEVBQXFCQyxTQUFyQixDQUFqQjtBQUNELGVBRk0sTUFFQTtBQUNMSCxpQ0FBaUJwZ0IsS0FBS0MsR0FBTCxDQUFTcWdCLFVBQVQsRUFBcUJDLFNBQXJCLENBQWpCO0FBQ0Q7O0FBRUQ7QUFDQTtBQUNBLGtCQUFJRyxPQUFPLEVBQVg7QUFDQXBtQixxQkFBT3NNLGNBQVAsQ0FBc0I4WixJQUF0QixFQUE0QixnQkFBNUIsRUFBOEM7QUFDNUM3VSxxQkFBSyxlQUFXO0FBQ2QseUJBQU91VSxjQUFQO0FBQ0Q7QUFIMkMsZUFBOUM7QUFLQTVkLGlCQUFHb2QsS0FBSCxHQUFXYyxJQUFYO0FBQ0Q7O0FBRUQsbUJBQU85Six5QkFBeUIzSCxLQUF6QixDQUErQnpNLEVBQS9CLEVBQW1DcUssU0FBbkMsQ0FBUDtBQUNELFdBcENEO0FBcUNELFNBM09jOztBQTZPZm9KLGdDQUF3QixnQ0FBUzFpQixNQUFULEVBQWlCO0FBQ3ZDLGNBQUksRUFBRUEsT0FBTzRDLGlCQUFQLElBQ0YsdUJBQXVCNUMsT0FBTzRDLGlCQUFQLENBQXlCb08sU0FEaEQsQ0FBSixFQUNnRTtBQUM5RDtBQUNEOztBQUVEO0FBQ0E7QUFDQTs7QUFFQSxjQUFJb2Msd0JBQ0ZwdEIsT0FBTzRDLGlCQUFQLENBQXlCb08sU0FBekIsQ0FBbUNxYyxpQkFEckM7QUFFQXJ0QixpQkFBTzRDLGlCQUFQLENBQXlCb08sU0FBekIsQ0FBbUNxYyxpQkFBbkMsR0FBdUQsWUFBVztBQUNoRSxnQkFBSXBlLEtBQUssSUFBVDtBQUNBLGdCQUFJcWUsY0FBY0Ysc0JBQXNCMVIsS0FBdEIsQ0FBNEJ6TSxFQUE1QixFQUFnQ3FLLFNBQWhDLENBQWxCO0FBQ0EsZ0JBQUlpVSxzQkFBc0JELFlBQVl2bEIsSUFBdEM7O0FBRUE7QUFDQXVsQix3QkFBWXZsQixJQUFaLEdBQW1CLFlBQVc7QUFDNUIsa0JBQUl5bEIsS0FBSyxJQUFUO0FBQ0Esa0JBQUl6bkIsT0FBT3VULFVBQVUsQ0FBVixDQUFYO0FBQ0Esa0JBQUl6WCxTQUFTa0UsS0FBS2xFLE1BQUwsSUFBZWtFLEtBQUswbkIsSUFBcEIsSUFBNEIxbkIsS0FBSzJuQixVQUE5QztBQUNBLGtCQUFJN3JCLFNBQVNvTixHQUFHa2UsSUFBSCxDQUFRTixjQUFyQixFQUFxQztBQUNuQyxzQkFBTSxJQUFJL0gsWUFBSixDQUFpQiw4Q0FDckI3VixHQUFHa2UsSUFBSCxDQUFRTixjQURhLEdBQ0ksU0FEckIsRUFDZ0MsV0FEaEMsQ0FBTjtBQUVEO0FBQ0QscUJBQU9VLG9CQUFvQjdSLEtBQXBCLENBQTBCOFIsRUFBMUIsRUFBOEJsVSxTQUE5QixDQUFQO0FBQ0QsYUFURDs7QUFXQSxtQkFBT2dVLFdBQVA7QUFDRCxXQWxCRDtBQW1CRDtBQTVRYyxPQUFqQjtBQStRQyxLQTdSdUIsRUE2UnRCLEVBQUMsV0FBVSxFQUFYLEVBQWMsT0FBTSxDQUFwQixFQTdSc0IsQ0F2aUhreEIsRUFvMEhoeEIsR0FBRSxDQUFDLFVBQVMxa0IsT0FBVCxFQUFpQlQsTUFBakIsRUFBd0JELE9BQXhCLEVBQWdDO0FBQzdEOzs7Ozs7O0FBT0M7QUFDRDs7QUFFQSxVQUFJdVksUUFBUTdYLFFBQVEsVUFBUixDQUFaO0FBQ0EsVUFBSStrQix3QkFBd0Iva0IsUUFBUSx3QkFBUixDQUE1Qjs7QUFFQVQsYUFBT0QsT0FBUCxHQUFpQjtBQUNmZ2EsMEJBQWtCdFosUUFBUSxnQkFBUixDQURIO0FBRWZtWiw0QkFBb0IsNEJBQVMvaEIsTUFBVCxFQUFpQjtBQUNuQyxjQUFJb2hCLGlCQUFpQlgsTUFBTVksYUFBTixDQUFvQnJoQixNQUFwQixDQUFyQjs7QUFFQSxjQUFJQSxPQUFPdVEsY0FBWCxFQUEyQjtBQUN6QixnQkFBSSxDQUFDdlEsT0FBT3FHLGVBQVosRUFBNkI7QUFDM0JyRyxxQkFBT3FHLGVBQVAsR0FBeUIsVUFBU29WLElBQVQsRUFBZTtBQUN0Qyx1QkFBT0EsSUFBUDtBQUNELGVBRkQ7QUFHRDtBQUNELGdCQUFJLENBQUN6YixPQUFPOEMscUJBQVosRUFBbUM7QUFDakM5QyxxQkFBTzhDLHFCQUFQLEdBQStCLFVBQVMyWSxJQUFULEVBQWU7QUFDNUMsdUJBQU9BLElBQVA7QUFDRCxlQUZEO0FBR0Q7QUFDRDtBQUNBO0FBQ0E7QUFDQSxnQkFBSTJGLGVBQWV4QixPQUFmLEdBQXlCLEtBQTdCLEVBQW9DO0FBQ2xDLGtCQUFJZ08saUJBQWlCN21CLE9BQU9rZix3QkFBUCxDQUNqQmptQixPQUFPZ3JCLGdCQUFQLENBQXdCaGEsU0FEUCxFQUNrQixTQURsQixDQUFyQjtBQUVBaksscUJBQU9zTSxjQUFQLENBQXNCclQsT0FBT2dyQixnQkFBUCxDQUF3QmhhLFNBQTlDLEVBQXlELFNBQXpELEVBQW9FO0FBQ2xFc0sscUJBQUssYUFBU2hJLEtBQVQsRUFBZ0I7QUFDbkJzYSxpQ0FBZXRTLEdBQWYsQ0FBbUJ0UyxJQUFuQixDQUF3QixJQUF4QixFQUE4QnNLLEtBQTlCO0FBQ0Esc0JBQUl1YSxLQUFLLElBQUl6ZSxLQUFKLENBQVUsU0FBVixDQUFUO0FBQ0F5ZSxxQkFBR2xiLE9BQUgsR0FBYVcsS0FBYjtBQUNBLHVCQUFLMUUsYUFBTCxDQUFtQmlmLEVBQW5CO0FBQ0Q7QUFOaUUsZUFBcEU7QUFRRDtBQUNGOztBQUVEO0FBQ0E7QUFDQSxjQUFJN3RCLE9BQU9xUyxZQUFQLElBQXVCLEVBQUUsVUFBVXJTLE9BQU9xUyxZQUFQLENBQW9CckIsU0FBaEMsQ0FBM0IsRUFBdUU7QUFDckVqSyxtQkFBT3NNLGNBQVAsQ0FBc0JyVCxPQUFPcVMsWUFBUCxDQUFvQnJCLFNBQTFDLEVBQXFELE1BQXJELEVBQTZEO0FBQzNEc0gsbUJBQUssZUFBVztBQUNkLG9CQUFJLEtBQUtxTCxLQUFMLEtBQWVuVixTQUFuQixFQUE4QjtBQUM1QixzQkFBSSxLQUFLdkUsS0FBTCxDQUFXMUksSUFBWCxLQUFvQixPQUF4QixFQUFpQztBQUMvQix5QkFBS29pQixLQUFMLEdBQWEsSUFBSTNqQixPQUFPOHRCLGFBQVgsQ0FBeUIsSUFBekIsQ0FBYjtBQUNELG1CQUZELE1BRU8sSUFBSSxLQUFLN2pCLEtBQUwsQ0FBVzFJLElBQVgsS0FBb0IsT0FBeEIsRUFBaUM7QUFDdEMseUJBQUtvaUIsS0FBTCxHQUFhLElBQWI7QUFDRDtBQUNGO0FBQ0QsdUJBQU8sS0FBS0EsS0FBWjtBQUNEO0FBVjBELGFBQTdEO0FBWUQ7QUFDRDtBQUNBO0FBQ0EsY0FBSTNqQixPQUFPOHRCLGFBQVAsSUFBd0IsQ0FBQzl0QixPQUFPK3RCLGFBQXBDLEVBQW1EO0FBQ2pEL3RCLG1CQUFPK3RCLGFBQVAsR0FBdUIvdEIsT0FBTzh0QixhQUE5QjtBQUNEOztBQUVEOXRCLGlCQUFPNEMsaUJBQVAsR0FDSStxQixzQkFBc0IzdEIsTUFBdEIsRUFBOEJvaEIsZUFBZXhCLE9BQTdDLENBREo7QUFFRCxTQXpEYztBQTBEZmdELDBCQUFrQiwwQkFBUzVpQixNQUFULEVBQWlCO0FBQ2pDO0FBQ0EsY0FBSUEsT0FBT3FTLFlBQVAsSUFDQSxFQUFFLGtCQUFrQnJTLE9BQU9xUyxZQUFQLENBQW9CckIsU0FBeEMsQ0FESixFQUN3RDtBQUN0RGhSLG1CQUFPcVMsWUFBUCxDQUFvQnJCLFNBQXBCLENBQThCZ2QsWUFBOUIsR0FDSWh1QixPQUFPcVMsWUFBUCxDQUFvQnJCLFNBQXBCLENBQThCaWQsUUFEbEM7QUFFRDtBQUNGO0FBakVjLE9BQWpCO0FBb0VDLEtBbEYyQixFQWtGMUIsRUFBQyxZQUFXLEVBQVosRUFBZSxrQkFBaUIsQ0FBaEMsRUFBa0MsMEJBQXlCLENBQTNELEVBbEYwQixDQXAwSDh3QixFQXM1SHp1QixHQUFFLENBQUMsVUFBU3JsQixPQUFULEVBQWlCVCxNQUFqQixFQUF3QkQsT0FBeEIsRUFBZ0M7QUFDcEc7Ozs7Ozs7QUFPQztBQUNEOztBQUVBOztBQUNBQyxhQUFPRCxPQUFQLEdBQWlCLFVBQVNsSSxNQUFULEVBQWlCO0FBQ2hDLFlBQUk2bkIsWUFBWTduQixVQUFVQSxPQUFPNm5CLFNBQWpDOztBQUVBLFlBQUkrQixhQUFhLFNBQWJBLFVBQWEsQ0FBU2htQixDQUFULEVBQVk7QUFDM0IsaUJBQU87QUFDTDdHLGtCQUFNLEVBQUM4c0IsdUJBQXVCLGlCQUF4QixHQUEyQ2ptQixFQUFFN0csSUFBN0MsS0FBc0Q2RyxFQUFFN0csSUFEekQ7QUFFTDRKLHFCQUFTL0MsRUFBRStDLE9BRk47QUFHTDRqQix3QkFBWTNtQixFQUFFMm1CLFVBSFQ7QUFJTDNPLHNCQUFVLG9CQUFXO0FBQ25CLHFCQUFPLEtBQUs3ZSxJQUFaO0FBQ0Q7QUFOSSxXQUFQO0FBUUQsU0FURDs7QUFXQTtBQUNBLFlBQUl5dUIsbUJBQW1CM0QsVUFBVXFCLFlBQVYsQ0FBdUIyQixZQUF2QixDQUNuQmxiLElBRG1CLENBQ2RrWSxVQUFVcUIsWUFESSxDQUF2QjtBQUVBckIsa0JBQVVxQixZQUFWLENBQXVCMkIsWUFBdkIsR0FBc0MsVUFBU3ZRLENBQVQsRUFBWTtBQUNoRCxpQkFBT2tSLGlCQUFpQmxSLENBQWpCLFdBQTBCLFVBQVMxVyxDQUFULEVBQVk7QUFDM0MsbUJBQU82QixRQUFRQyxNQUFSLENBQWVra0IsV0FBV2htQixDQUFYLENBQWYsQ0FBUDtBQUNELFdBRk0sQ0FBUDtBQUdELFNBSkQ7QUFLRCxPQXRCRDtBQXdCQyxLQXBDa0UsRUFvQ2pFLEVBcENpRSxDQXQ1SHV1QixFQTA3SHB5QixJQUFHLENBQUMsVUFBU2dGLE9BQVQsRUFBaUJULE1BQWpCLEVBQXdCRCxPQUF4QixFQUFnQztBQUMxQzs7Ozs7OztBQU9DO0FBQ0Q7O0FBRUEsVUFBSXVZLFFBQVE3WCxRQUFRLFVBQVIsQ0FBWjs7QUFFQVQsYUFBT0QsT0FBUCxHQUFpQjtBQUNmZ2EsMEJBQWtCdFosUUFBUSxnQkFBUixDQURIO0FBRWZ5WixxQkFBYSxxQkFBU3JpQixNQUFULEVBQWlCO0FBQzVCLGNBQUksUUFBT0EsTUFBUCx5Q0FBT0EsTUFBUCxPQUFrQixRQUFsQixJQUE4QkEsT0FBTzRDLGlCQUFyQyxJQUEwRCxFQUFFLGFBQzVENUMsT0FBTzRDLGlCQUFQLENBQXlCb08sU0FEaUMsQ0FBOUQsRUFDeUM7QUFDdkNqSyxtQkFBT3NNLGNBQVAsQ0FBc0JyVCxPQUFPNEMsaUJBQVAsQ0FBeUJvTyxTQUEvQyxFQUEwRCxTQUExRCxFQUFxRTtBQUNuRXNILG1CQUFLLGVBQVc7QUFDZCx1QkFBTyxLQUFLOEssUUFBWjtBQUNELGVBSGtFO0FBSW5FOUgsbUJBQUssYUFBU3JULENBQVQsRUFBWTtBQUNmLG9CQUFJLEtBQUttYixRQUFULEVBQW1CO0FBQ2pCLHVCQUFLdlAsbUJBQUwsQ0FBeUIsT0FBekIsRUFBa0MsS0FBS3VQLFFBQXZDO0FBQ0EsdUJBQUt2UCxtQkFBTCxDQUF5QixXQUF6QixFQUFzQyxLQUFLeVAsWUFBM0M7QUFDRDtBQUNELHFCQUFLNVEsZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0IsS0FBSzBRLFFBQUwsR0FBZ0JuYixDQUEvQztBQUNBLHFCQUFLeUssZ0JBQUwsQ0FBc0IsV0FBdEIsRUFBbUMsS0FBSzRRLFlBQUwsR0FBb0IsVUFBUzFmLENBQVQsRUFBWTtBQUNqRUEsb0JBQUV0RixNQUFGLENBQVNnVSxTQUFULEdBQXFCaFIsT0FBckIsQ0FBNkIsVUFBUzJJLEtBQVQsRUFBZ0I7QUFDM0Msd0JBQUkvSixRQUFRLElBQUlrUCxLQUFKLENBQVUsT0FBVixDQUFaO0FBQ0FsUCwwQkFBTStKLEtBQU4sR0FBY0EsS0FBZDtBQUNBL0osMEJBQU1nUCxRQUFOLEdBQWlCLEVBQUNqRixPQUFPQSxLQUFSLEVBQWpCO0FBQ0EvSiwwQkFBTWlKLFdBQU4sR0FBb0IsRUFBQytGLFVBQVVoUCxNQUFNZ1AsUUFBakIsRUFBcEI7QUFDQWhQLDBCQUFNa0UsT0FBTixHQUFnQixDQUFDUixFQUFFdEYsTUFBSCxDQUFoQjtBQUNBLHlCQUFLc1EsYUFBTCxDQUFtQjFPLEtBQW5CO0FBQ0QsbUJBUDRCLENBTzNCeVAsSUFQMkIsQ0FPdEIsSUFQc0IsQ0FBN0I7QUFRRCxpQkFUc0QsQ0FTckRBLElBVHFELENBU2hELElBVGdELENBQXZEO0FBVUQ7QUFwQmtFLGFBQXJFO0FBc0JEO0FBQ0QsY0FBSSxRQUFPM1AsTUFBUCx5Q0FBT0EsTUFBUCxPQUFrQixRQUFsQixJQUE4QkEsT0FBT2t1QixhQUFyQyxJQUNDLGNBQWNsdUIsT0FBT2t1QixhQUFQLENBQXFCbGQsU0FEcEMsSUFFQSxFQUFFLGlCQUFpQmhSLE9BQU9rdUIsYUFBUCxDQUFxQmxkLFNBQXhDLENBRkosRUFFd0Q7QUFDdERqSyxtQkFBT3NNLGNBQVAsQ0FBc0JyVCxPQUFPa3VCLGFBQVAsQ0FBcUJsZCxTQUEzQyxFQUFzRCxhQUF0RCxFQUFxRTtBQUNuRXNILG1CQUFLLGVBQVc7QUFDZCx1QkFBTyxFQUFDcEosVUFBVSxLQUFLQSxRQUFoQixFQUFQO0FBQ0Q7QUFIa0UsYUFBckU7QUFLRDtBQUNGLFNBckNjOztBQXVDZmtULDBCQUFrQiwwQkFBU3BpQixNQUFULEVBQWlCO0FBQ2pDO0FBQ0EsY0FBSSxRQUFPQSxNQUFQLHlDQUFPQSxNQUFQLE9BQWtCLFFBQXRCLEVBQWdDO0FBQzlCLGdCQUFJQSxPQUFPc2tCLGdCQUFQLElBQ0YsRUFBRSxlQUFldGtCLE9BQU9za0IsZ0JBQVAsQ0FBd0J0VCxTQUF6QyxDQURGLEVBQ3VEO0FBQ3JEO0FBQ0FqSyxxQkFBT3NNLGNBQVAsQ0FBc0JyVCxPQUFPc2tCLGdCQUFQLENBQXdCdFQsU0FBOUMsRUFBeUQsV0FBekQsRUFBc0U7QUFDcEVzSCxxQkFBSyxlQUFXO0FBQ2QseUJBQU8sS0FBSzZWLFlBQVo7QUFDRCxpQkFIbUU7QUFJcEU3UyxxQkFBSyxhQUFTaGQsTUFBVCxFQUFpQjtBQUNwQix1QkFBSzZ2QixZQUFMLEdBQW9CN3ZCLE1BQXBCO0FBQ0Q7QUFObUUsZUFBdEU7QUFRRDtBQUNGO0FBQ0YsU0F2RGM7O0FBeURmeWpCLDRCQUFvQiw0QkFBUy9oQixNQUFULEVBQWlCO0FBQ25DLGNBQUlvaEIsaUJBQWlCWCxNQUFNWSxhQUFOLENBQW9CcmhCLE1BQXBCLENBQXJCOztBQUVBLGNBQUksUUFBT0EsTUFBUCx5Q0FBT0EsTUFBUCxPQUFrQixRQUFsQixJQUE4QixFQUFFQSxPQUFPNEMsaUJBQVAsSUFDaEM1QyxPQUFPb3VCLG9CQUR1QixDQUFsQyxFQUNrQztBQUNoQyxtQkFEZ0MsQ0FDeEI7QUFDVDtBQUNEO0FBQ0EsY0FBSSxDQUFDcHVCLE9BQU80QyxpQkFBWixFQUErQjtBQUM3QjVDLG1CQUFPNEMsaUJBQVAsR0FBMkIsVUFBUzBqQixRQUFULEVBQW1CQyxhQUFuQixFQUFrQztBQUMzRCxrQkFBSW5GLGVBQWV4QixPQUFmLEdBQXlCLEVBQTdCLEVBQWlDO0FBQy9CO0FBQ0E7QUFDQSxvQkFBSTBHLFlBQVlBLFNBQVNqbkIsVUFBekIsRUFBcUM7QUFDbkMsc0JBQUlzbkIsZ0JBQWdCLEVBQXBCO0FBQ0EsdUJBQUssSUFBSXhnQixJQUFJLENBQWIsRUFBZ0JBLElBQUltZ0IsU0FBU2puQixVQUFULENBQW9Cd0MsTUFBeEMsRUFBZ0RzRSxHQUFoRCxFQUFxRDtBQUNuRCx3QkFBSXdFLFNBQVMyYixTQUFTam5CLFVBQVQsQ0FBb0I4RyxDQUFwQixDQUFiO0FBQ0Esd0JBQUl3RSxPQUFPdVcsY0FBUCxDQUFzQixNQUF0QixDQUFKLEVBQW1DO0FBQ2pDLDJCQUFLLElBQUlyVSxJQUFJLENBQWIsRUFBZ0JBLElBQUlsQyxPQUFPQyxJQUFQLENBQVkvSSxNQUFoQyxFQUF3Q2dMLEdBQXhDLEVBQTZDO0FBQzNDLDRCQUFJd2hCLFlBQVk7QUFDZG5wQiwrQkFBS3lGLE9BQU9DLElBQVAsQ0FBWWlDLENBQVo7QUFEUyx5QkFBaEI7QUFHQSw0QkFBSWxDLE9BQU9DLElBQVAsQ0FBWWlDLENBQVosRUFBZTVCLE9BQWYsQ0FBdUIsTUFBdkIsTUFBbUMsQ0FBdkMsRUFBMEM7QUFDeENvakIsb0NBQVVwTyxRQUFWLEdBQXFCdFYsT0FBT3NWLFFBQTVCO0FBQ0FvTyxvQ0FBVUMsVUFBVixHQUF1QjNqQixPQUFPMmpCLFVBQTlCO0FBQ0Q7QUFDRDNILHNDQUFjL2tCLElBQWQsQ0FBbUJ5c0IsU0FBbkI7QUFDRDtBQUNGLHFCQVhELE1BV087QUFDTDFILG9DQUFjL2tCLElBQWQsQ0FBbUIwa0IsU0FBU2puQixVQUFULENBQW9COEcsQ0FBcEIsQ0FBbkI7QUFDRDtBQUNGO0FBQ0RtZ0IsMkJBQVNqbkIsVUFBVCxHQUFzQnNuQixhQUF0QjtBQUNEO0FBQ0Y7QUFDRCxxQkFBTyxJQUFJM21CLE9BQU9vdUIsb0JBQVgsQ0FBZ0M5SCxRQUFoQyxFQUEwQ0MsYUFBMUMsQ0FBUDtBQUNELGFBM0JEO0FBNEJBdm1CLG1CQUFPNEMsaUJBQVAsQ0FBeUJvTyxTQUF6QixHQUNJaFIsT0FBT291QixvQkFBUCxDQUE0QnBkLFNBRGhDOztBQUdBO0FBQ0EsZ0JBQUloUixPQUFPb3VCLG9CQUFQLENBQTRCM0gsbUJBQWhDLEVBQXFEO0FBQ25EMWYscUJBQU9zTSxjQUFQLENBQXNCclQsT0FBTzRDLGlCQUE3QixFQUFnRCxxQkFBaEQsRUFBdUU7QUFDckUwVixxQkFBSyxlQUFXO0FBQ2QseUJBQU90WSxPQUFPb3VCLG9CQUFQLENBQTRCM0gsbUJBQW5DO0FBQ0Q7QUFIb0UsZUFBdkU7QUFLRDs7QUFFRHptQixtQkFBTzhDLHFCQUFQLEdBQStCOUMsT0FBT3V1Qix3QkFBdEM7QUFDQXZ1QixtQkFBT3FHLGVBQVAsR0FBeUJyRyxPQUFPd3VCLGtCQUFoQztBQUNEOztBQUVEO0FBQ0EsV0FBQyxxQkFBRCxFQUF3QixzQkFBeEIsRUFBZ0QsaUJBQWhELEVBQ0tsdEIsT0FETCxDQUNhLFVBQVNvTyxNQUFULEVBQWlCO0FBQ3hCLGdCQUFJOEwsZUFBZXhiLE9BQU80QyxpQkFBUCxDQUF5Qm9PLFNBQXpCLENBQW1DdEIsTUFBbkMsQ0FBbkI7QUFDQTFQLG1CQUFPNEMsaUJBQVAsQ0FBeUJvTyxTQUF6QixDQUFtQ3RCLE1BQW5DLElBQTZDLFlBQVc7QUFDdEQ0Six3QkFBVSxDQUFWLElBQWUsS0FBTTVKLFdBQVcsaUJBQVosR0FDaEIxUCxPQUFPcUcsZUFEUyxHQUVoQnJHLE9BQU84QyxxQkFGSSxFQUVtQndXLFVBQVUsQ0FBVixDQUZuQixDQUFmO0FBR0EscUJBQU9rQyxhQUFhRSxLQUFiLENBQW1CLElBQW5CLEVBQXlCcEMsU0FBekIsQ0FBUDtBQUNELGFBTEQ7QUFNRCxXQVRMOztBQVdBO0FBQ0EsY0FBSXNPLHdCQUNBNW5CLE9BQU80QyxpQkFBUCxDQUF5Qm9PLFNBQXpCLENBQW1DdE4sZUFEdkM7QUFFQTFELGlCQUFPNEMsaUJBQVAsQ0FBeUJvTyxTQUF6QixDQUFtQ3ROLGVBQW5DLEdBQXFELFlBQVc7QUFDOUQsZ0JBQUksQ0FBQzRWLFVBQVUsQ0FBVixDQUFMLEVBQW1CO0FBQ2pCLGtCQUFJQSxVQUFVLENBQVYsQ0FBSixFQUFrQjtBQUNoQkEsMEJBQVUsQ0FBVixFQUFhb0MsS0FBYixDQUFtQixJQUFuQjtBQUNEO0FBQ0QscUJBQU9qVyxRQUFROUMsT0FBUixFQUFQO0FBQ0Q7QUFDRCxtQkFBT2lsQixzQkFBc0JsTSxLQUF0QixDQUE0QixJQUE1QixFQUFrQ3BDLFNBQWxDLENBQVA7QUFDRCxXQVJEOztBQVVBO0FBQ0EsY0FBSW1PLGVBQWUsU0FBZkEsWUFBZSxDQUFTcm1CLEtBQVQsRUFBZ0I7QUFDakMsZ0JBQUkwUixNQUFNLElBQUlxSSxHQUFKLEVBQVY7QUFDQXBVLG1CQUFPQyxJQUFQLENBQVk1RixLQUFaLEVBQW1CRSxPQUFuQixDQUEyQixVQUFTMmYsR0FBVCxFQUFjO0FBQ3ZDbk8sa0JBQUl3SSxHQUFKLENBQVEyRixHQUFSLEVBQWE3ZixNQUFNNmYsR0FBTixDQUFiO0FBQ0FuTyxrQkFBSW1PLEdBQUosSUFBVzdmLE1BQU02ZixHQUFOLENBQVg7QUFDRCxhQUhEO0FBSUEsbUJBQU9uTyxHQUFQO0FBQ0QsV0FQRDs7QUFTQSxjQUFJMmIsbUJBQW1CO0FBQ3JCNVQsd0JBQVksYUFEUztBQUVyQkMseUJBQWEsY0FGUTtBQUdyQkMsMkJBQWUsZ0JBSE07QUFJckJDLDRCQUFnQixpQkFKSztBQUtyQkMsNkJBQWlCO0FBTEksV0FBdkI7O0FBUUEsY0FBSXlULGlCQUFpQjF1QixPQUFPNEMsaUJBQVAsQ0FBeUJvTyxTQUF6QixDQUFtQzlQLFFBQXhEO0FBQ0FsQixpQkFBTzRDLGlCQUFQLENBQXlCb08sU0FBekIsQ0FBbUM5UCxRQUFuQyxHQUE4QyxVQUM1QzRsQixRQUQ0QyxFQUU1QzZILE1BRjRDLEVBRzVDQyxLQUg0QyxFQUk1QztBQUNBLG1CQUFPRixlQUFlaFQsS0FBZixDQUFxQixJQUFyQixFQUEyQixDQUFDb0wsWUFBWSxJQUFiLENBQTNCLEVBQ0ozbEIsSUFESSxDQUNDLFVBQVNDLEtBQVQsRUFBZ0I7QUFDcEIsa0JBQUlnZ0IsZUFBZXhCLE9BQWYsR0FBeUIsRUFBN0IsRUFBaUM7QUFDL0J4ZSx3QkFBUXFtQixhQUFhcm1CLEtBQWIsQ0FBUjtBQUNEO0FBQ0Qsa0JBQUlnZ0IsZUFBZXhCLE9BQWYsR0FBeUIsRUFBekIsSUFBK0IsQ0FBQytPLE1BQXBDLEVBQTRDO0FBQzFDO0FBQ0E7QUFDQSxvQkFBSTtBQUNGdnRCLHdCQUFNRSxPQUFOLENBQWMsVUFBU3NaLElBQVQsRUFBZTtBQUMzQkEseUJBQUszYyxJQUFMLEdBQVl3d0IsaUJBQWlCN1QsS0FBSzNjLElBQXRCLEtBQStCMmMsS0FBSzNjLElBQWhEO0FBQ0QsbUJBRkQ7QUFHRCxpQkFKRCxDQUlFLE9BQU8yRixDQUFQLEVBQVU7QUFDVixzQkFBSUEsRUFBRTdHLElBQUYsS0FBVyxXQUFmLEVBQTRCO0FBQzFCLDBCQUFNNkcsQ0FBTjtBQUNEO0FBQ0Q7QUFDQXhDLHdCQUFNRSxPQUFOLENBQWMsVUFBU3NaLElBQVQsRUFBZXpVLENBQWYsRUFBa0I7QUFDOUIvRSwwQkFBTWthLEdBQU4sQ0FBVW5WLENBQVYsRUFBYSxTQUFjLEVBQWQsRUFBa0J5VSxJQUFsQixFQUF3QjtBQUNuQzNjLDRCQUFNd3dCLGlCQUFpQjdULEtBQUszYyxJQUF0QixLQUErQjJjLEtBQUszYztBQURQLHFCQUF4QixDQUFiO0FBR0QsbUJBSkQ7QUFLRDtBQUNGO0FBQ0QscUJBQU9tRCxLQUFQO0FBQ0QsYUF6QkksRUEwQkpELElBMUJJLENBMEJDd3RCLE1BMUJELEVBMEJTQyxLQTFCVCxDQUFQO0FBMkJELFdBaENEO0FBaUNELFNBM0xjOztBQTZMZmpNLDBCQUFrQiwwQkFBUzNpQixNQUFULEVBQWlCO0FBQ2pDLGNBQUksQ0FBQ0EsT0FBTzRDLGlCQUFSLElBQ0Esa0JBQWtCNUMsT0FBTzRDLGlCQUFQLENBQXlCb08sU0FEL0MsRUFDMEQ7QUFDeEQ7QUFDRDtBQUNEaFIsaUJBQU80QyxpQkFBUCxDQUF5Qm9PLFNBQXpCLENBQW1DZ0MsWUFBbkMsR0FBa0QsVUFBUzFVLE1BQVQsRUFBaUI7QUFDakUsZ0JBQUkyUSxLQUFLLElBQVQ7QUFDQXdSLGtCQUFNbUcsVUFBTixDQUFpQixjQUFqQixFQUFpQyxhQUFqQztBQUNBLGlCQUFLM1QsVUFBTCxHQUFrQjNSLE9BQWxCLENBQTBCLFVBQVNzUixNQUFULEVBQWlCO0FBQ3pDLGtCQUFJQSxPQUFPM0ksS0FBUCxJQUFnQjNMLE9BQU9nVSxTQUFQLEdBQW1CckgsT0FBbkIsQ0FBMkIySCxPQUFPM0ksS0FBbEMsTUFBNkMsQ0FBQyxDQUFsRSxFQUFxRTtBQUNuRWdGLG1CQUFHRixXQUFILENBQWU2RCxNQUFmO0FBQ0Q7QUFDRixhQUpEO0FBS0QsV0FSRDtBQVNEO0FBM01jLE9BQWpCO0FBOE1DLEtBM05RLEVBMk5QLEVBQUMsWUFBVyxFQUFaLEVBQWUsa0JBQWlCLEVBQWhDLEVBM05PLENBMTdIaXlCLEVBcXBJbndCLElBQUcsQ0FBQyxVQUFTaEssT0FBVCxFQUFpQlQsTUFBakIsRUFBd0JELE9BQXhCLEVBQWdDO0FBQzNFOzs7Ozs7O0FBT0M7QUFDRDs7QUFFQSxVQUFJdVksUUFBUTdYLFFBQVEsVUFBUixDQUFaO0FBQ0EsVUFBSXVZLFVBQVVWLE1BQU10aUIsR0FBcEI7O0FBRUE7QUFDQWdLLGFBQU9ELE9BQVAsR0FBaUIsVUFBU2xJLE1BQVQsRUFBaUI7QUFDaEMsWUFBSW9oQixpQkFBaUJYLE1BQU1ZLGFBQU4sQ0FBb0JyaEIsTUFBcEIsQ0FBckI7QUFDQSxZQUFJNm5CLFlBQVk3bkIsVUFBVUEsT0FBTzZuQixTQUFqQztBQUNBLFlBQUltRCxtQkFBbUJockIsVUFBVUEsT0FBT2dyQixnQkFBeEM7O0FBRUEsWUFBSXBCLGFBQWEsU0FBYkEsVUFBYSxDQUFTaG1CLENBQVQsRUFBWTtBQUMzQixpQkFBTztBQUNMN0csa0JBQU07QUFDSjh4Qiw2QkFBZSxrQkFEWDtBQUVKemdCLGlDQUFtQixXQUZmO0FBR0p5YixxQ0FBdUIsaUJBSG5CO0FBSUppRiw2QkFBZTtBQUpYLGNBS0psckIsRUFBRTdHLElBTEUsS0FLTzZHLEVBQUU3RyxJQU5WO0FBT0w0SixxQkFBUztBQUNQLDRDQUE4Qix1Q0FDOUI7QUFGTyxjQUdQL0MsRUFBRStDLE9BSEssS0FHTy9DLEVBQUUrQyxPQVZiO0FBV0w0akIsd0JBQVkzbUIsRUFBRTJtQixVQVhUO0FBWUwzTyxzQkFBVSxvQkFBVztBQUNuQixxQkFBTyxLQUFLN2UsSUFBTCxJQUFhLEtBQUs0SixPQUFMLElBQWdCLElBQTdCLElBQXFDLEtBQUtBLE9BQWpEO0FBQ0Q7QUFkSSxXQUFQO0FBZ0JELFNBakJEOztBQW1CQTtBQUNBLFlBQUk4akIsZ0JBQWdCLFNBQWhCQSxhQUFnQixDQUFTaEMsV0FBVCxFQUFzQmlDLFNBQXRCLEVBQWlDQyxPQUFqQyxFQUEwQztBQUM1RCxjQUFJb0UscUJBQXFCLFNBQXJCQSxrQkFBcUIsQ0FBU3pVLENBQVQsRUFBWTtBQUNuQyxnQkFBSSxRQUFPQSxDQUFQLHlDQUFPQSxDQUFQLE9BQWEsUUFBYixJQUF5QkEsRUFBRTFSLE9BQS9CLEVBQXdDO0FBQ3RDLHFCQUFPMFIsQ0FBUDtBQUNEO0FBQ0QsZ0JBQUkxUixVQUFVLEVBQWQ7QUFDQTdCLG1CQUFPQyxJQUFQLENBQVlzVCxDQUFaLEVBQWVoWixPQUFmLENBQXVCLFVBQVMyZixHQUFULEVBQWM7QUFDbkMsa0JBQUlBLFFBQVEsU0FBUixJQUFxQkEsUUFBUSxVQUE3QixJQUEyQ0EsUUFBUSxhQUF2RCxFQUFzRTtBQUNwRTtBQUNEO0FBQ0Qsa0JBQUkxWSxJQUFJK1IsRUFBRTJHLEdBQUYsSUFBVSxRQUFPM0csRUFBRTJHLEdBQUYsQ0FBUCxNQUFrQixRQUFuQixHQUNiM0csRUFBRTJHLEdBQUYsQ0FEYSxHQUNKLEVBQUMrRyxPQUFPMU4sRUFBRTJHLEdBQUYsQ0FBUixFQURiO0FBRUEsa0JBQUkxWSxFQUFFbUUsR0FBRixLQUFVOEIsU0FBVixJQUNBakcsRUFBRTJmLEdBQUYsS0FBVTFaLFNBRFYsSUFDdUJqRyxFQUFFMGYsS0FBRixLQUFZelosU0FEdkMsRUFDa0Q7QUFDaEQ1Rix3QkFBUWhILElBQVIsQ0FBYXFmLEdBQWI7QUFDRDtBQUNELGtCQUFJMVksRUFBRTBmLEtBQUYsS0FBWXpaLFNBQWhCLEVBQTJCO0FBQ3pCLG9CQUFJLE9BQU9qRyxFQUFFMGYsS0FBVCxLQUFtQixRQUF2QixFQUFpQztBQUMvQjFmLG9CQUFHbUUsR0FBSCxHQUFTbkUsRUFBRTJmLEdBQUYsR0FBUTNmLEVBQUUwZixLQUFuQjtBQUNELGlCQUZELE1BRU87QUFDTDNOLG9CQUFFMkcsR0FBRixJQUFTMVksRUFBRTBmLEtBQVg7QUFDRDtBQUNELHVCQUFPMWYsRUFBRTBmLEtBQVQ7QUFDRDtBQUNELGtCQUFJMWYsRUFBRXlmLEtBQUYsS0FBWXhaLFNBQWhCLEVBQTJCO0FBQ3pCOEwsa0JBQUVpTyxRQUFGLEdBQWFqTyxFQUFFaU8sUUFBRixJQUFjLEVBQTNCO0FBQ0Esb0JBQUlGLEtBQUssRUFBVDtBQUNBLG9CQUFJLE9BQU85ZixFQUFFeWYsS0FBVCxLQUFtQixRQUF2QixFQUFpQztBQUMvQksscUJBQUdwSCxHQUFILElBQVUsRUFBQ3ZVLEtBQUtuRSxFQUFFeWYsS0FBUixFQUFlRSxLQUFLM2YsRUFBRXlmLEtBQXRCLEVBQVY7QUFDRCxpQkFGRCxNQUVPO0FBQ0xLLHFCQUFHcEgsR0FBSCxJQUFVMVksRUFBRXlmLEtBQVo7QUFDRDtBQUNEMU4sa0JBQUVpTyxRQUFGLENBQVczbUIsSUFBWCxDQUFnQnltQixFQUFoQjtBQUNBLHVCQUFPOWYsRUFBRXlmLEtBQVQ7QUFDQSxvQkFBSSxDQUFDamhCLE9BQU9DLElBQVAsQ0FBWXVCLENBQVosRUFBZTFHLE1BQXBCLEVBQTRCO0FBQzFCLHlCQUFPeVksRUFBRTJHLEdBQUYsQ0FBUDtBQUNEO0FBQ0Y7QUFDRixhQWhDRDtBQWlDQSxnQkFBSXJZLFFBQVEvRyxNQUFaLEVBQW9CO0FBQ2xCeVksZ0JBQUUxUixPQUFGLEdBQVlBLE9BQVo7QUFDRDtBQUNELG1CQUFPMFIsQ0FBUDtBQUNELFdBMUNEO0FBMkNBbU8sd0JBQWM3aEIsS0FBS0MsS0FBTCxDQUFXRCxLQUFLb0IsU0FBTCxDQUFleWdCLFdBQWYsQ0FBWCxDQUFkO0FBQ0EsY0FBSXJILGVBQWV4QixPQUFmLEdBQXlCLEVBQTdCLEVBQWlDO0FBQy9CdUIsb0JBQVEsV0FBV3ZhLEtBQUtvQixTQUFMLENBQWV5Z0IsV0FBZixDQUFuQjtBQUNBLGdCQUFJQSxZQUFZRSxLQUFoQixFQUF1QjtBQUNyQkYsMEJBQVlFLEtBQVosR0FBb0JvRyxtQkFBbUJ0RyxZQUFZRSxLQUEvQixDQUFwQjtBQUNEO0FBQ0QsZ0JBQUlGLFlBQVlLLEtBQWhCLEVBQXVCO0FBQ3JCTCwwQkFBWUssS0FBWixHQUFvQmlHLG1CQUFtQnRHLFlBQVlLLEtBQS9CLENBQXBCO0FBQ0Q7QUFDRDNILG9CQUFRLFdBQVd2YSxLQUFLb0IsU0FBTCxDQUFleWdCLFdBQWYsQ0FBbkI7QUFDRDtBQUNELGlCQUFPWixVQUFVbUgsZUFBVixDQUEwQnZHLFdBQTFCLEVBQXVDaUMsU0FBdkMsRUFBa0QsVUFBUzltQixDQUFULEVBQVk7QUFDbkUrbUIsb0JBQVFmLFdBQVdobUIsQ0FBWCxDQUFSO0FBQ0QsV0FGTSxDQUFQO0FBR0QsU0ExREQ7O0FBNERBO0FBQ0EsWUFBSWtuQix1QkFBdUIsU0FBdkJBLG9CQUF1QixDQUFTckMsV0FBVCxFQUFzQjtBQUMvQyxpQkFBTyxJQUFJaGpCLE9BQUosQ0FBWSxVQUFTOUMsT0FBVCxFQUFrQitDLE1BQWxCLEVBQTBCO0FBQzNDK2tCLDBCQUFjaEMsV0FBZCxFQUEyQjlsQixPQUEzQixFQUFvQytDLE1BQXBDO0FBQ0QsV0FGTSxDQUFQO0FBR0QsU0FKRDs7QUFNQTtBQUNBLFlBQUksQ0FBQ21pQixVQUFVcUIsWUFBZixFQUE2QjtBQUMzQnJCLG9CQUFVcUIsWUFBVixHQUF5QixFQUFDMkIsY0FBY0Msb0JBQWY7QUFDdkJwWSw4QkFBa0IsNEJBQVcsQ0FBRyxDQURUO0FBRXZCbUIsaUNBQXFCLCtCQUFXLENBQUc7QUFGWixXQUF6QjtBQUlEO0FBQ0RnVSxrQkFBVXFCLFlBQVYsQ0FBdUJHLGdCQUF2QixHQUNJeEIsVUFBVXFCLFlBQVYsQ0FBdUJHLGdCQUF2QixJQUEyQyxZQUFXO0FBQ3BELGlCQUFPLElBQUk1akIsT0FBSixDQUFZLFVBQVM5QyxPQUFULEVBQWtCO0FBQ25DLGdCQUFJc3NCLFFBQVEsQ0FDVixFQUFDMXRCLE1BQU0sWUFBUCxFQUFxQm9vQixVQUFVLFNBQS9CLEVBQTBDRCxPQUFPLEVBQWpELEVBQXFEeUIsU0FBUyxFQUE5RCxFQURVLEVBRVYsRUFBQzVwQixNQUFNLFlBQVAsRUFBcUJvb0IsVUFBVSxTQUEvQixFQUEwQ0QsT0FBTyxFQUFqRCxFQUFxRHlCLFNBQVMsRUFBOUQsRUFGVSxDQUFaO0FBSUF4b0Isb0JBQVFzc0IsS0FBUjtBQUNELFdBTk0sQ0FBUDtBQU9ELFNBVEw7O0FBV0EsWUFBSTdOLGVBQWV4QixPQUFmLEdBQXlCLEVBQTdCLEVBQWlDO0FBQy9CO0FBQ0EsY0FBSXNQLHNCQUNBckgsVUFBVXFCLFlBQVYsQ0FBdUJHLGdCQUF2QixDQUF3QzFaLElBQXhDLENBQTZDa1ksVUFBVXFCLFlBQXZELENBREo7QUFFQXJCLG9CQUFVcUIsWUFBVixDQUF1QkcsZ0JBQXZCLEdBQTBDLFlBQVc7QUFDbkQsbUJBQU82RixzQkFBc0IvdEIsSUFBdEIsQ0FBMkJxTixTQUEzQixFQUFzQyxVQUFTNUssQ0FBVCxFQUFZO0FBQ3ZELGtCQUFJQSxFQUFFN0csSUFBRixLQUFXLGVBQWYsRUFBZ0M7QUFDOUIsdUJBQU8sRUFBUDtBQUNEO0FBQ0Qsb0JBQU02RyxDQUFOO0FBQ0QsYUFMTSxDQUFQO0FBTUQsV0FQRDtBQVFEO0FBQ0QsWUFBSXdkLGVBQWV4QixPQUFmLEdBQXlCLEVBQTdCLEVBQWlDO0FBQy9CLGNBQUk0TCxtQkFBbUIzRCxVQUFVcUIsWUFBVixDQUF1QjJCLFlBQXZCLENBQ25CbGIsSUFEbUIsQ0FDZGtZLFVBQVVxQixZQURJLENBQXZCO0FBRUFyQixvQkFBVXFCLFlBQVYsQ0FBdUIyQixZQUF2QixHQUFzQyxVQUFTdlEsQ0FBVCxFQUFZO0FBQ2hELG1CQUFPa1IsaUJBQWlCbFIsQ0FBakIsRUFBb0JuWixJQUFwQixDQUF5QixVQUFTN0MsTUFBVCxFQUFpQjtBQUMvQztBQUNBLGtCQUFJZ2MsRUFBRXFPLEtBQUYsSUFBVyxDQUFDcnFCLE9BQU82YixjQUFQLEdBQXdCdFksTUFBcEMsSUFDQXlZLEVBQUV3TyxLQUFGLElBQVcsQ0FBQ3hxQixPQUFPOGIsY0FBUCxHQUF3QnZZLE1BRHhDLEVBQ2dEO0FBQzlDdkQsdUJBQU9nVSxTQUFQLEdBQW1CaFIsT0FBbkIsQ0FBMkIsVUFBUzJJLEtBQVQsRUFBZ0I7QUFDekNBLHdCQUFNNEksSUFBTjtBQUNELGlCQUZEO0FBR0Esc0JBQU0sSUFBSWlTLFlBQUosQ0FBaUIsbUNBQWpCLEVBQ2lCLGVBRGpCLENBQU47QUFFRDtBQUNELHFCQUFPeG1CLE1BQVA7QUFDRCxhQVhNLEVBV0osVUFBU3NGLENBQVQsRUFBWTtBQUNiLHFCQUFPNkIsUUFBUUMsTUFBUixDQUFla2tCLFdBQVdobUIsQ0FBWCxDQUFmLENBQVA7QUFDRCxhQWJNLENBQVA7QUFjRCxXQWZEO0FBZ0JEO0FBQ0QsWUFBSSxFQUFFd2QsZUFBZXhCLE9BQWYsR0FBeUIsRUFBekIsSUFDRixxQkFBcUJpSSxVQUFVcUIsWUFBVixDQUF1QkMsdUJBQXZCLEVBRHJCLENBQUosRUFDNEU7QUFDMUUsY0FBSVAsUUFBUSxTQUFSQSxLQUFRLENBQVN2SixHQUFULEVBQWMxVyxDQUFkLEVBQWlCa2dCLENBQWpCLEVBQW9CO0FBQzlCLGdCQUFJbGdCLEtBQUswVyxHQUFMLElBQVksRUFBRXdKLEtBQUt4SixHQUFQLENBQWhCLEVBQTZCO0FBQzNCQSxrQkFBSXdKLENBQUosSUFBU3hKLElBQUkxVyxDQUFKLENBQVQ7QUFDQSxxQkFBTzBXLElBQUkxVyxDQUFKLENBQVA7QUFDRDtBQUNGLFdBTEQ7O0FBT0EsY0FBSXdtQixxQkFBcUJ0SCxVQUFVcUIsWUFBVixDQUF1QjJCLFlBQXZCLENBQ3JCbGIsSUFEcUIsQ0FDaEJrWSxVQUFVcUIsWUFETSxDQUF6QjtBQUVBckIsb0JBQVVxQixZQUFWLENBQXVCMkIsWUFBdkIsR0FBc0MsVUFBU3ZRLENBQVQsRUFBWTtBQUNoRCxnQkFBSSxRQUFPQSxDQUFQLHlDQUFPQSxDQUFQLE9BQWEsUUFBYixJQUF5QixRQUFPQSxFQUFFcU8sS0FBVCxNQUFtQixRQUFoRCxFQUEwRDtBQUN4RHJPLGtCQUFJMVQsS0FBS0MsS0FBTCxDQUFXRCxLQUFLb0IsU0FBTCxDQUFlc1MsQ0FBZixDQUFYLENBQUo7QUFDQXNPLG9CQUFNdE8sRUFBRXFPLEtBQVIsRUFBZSxpQkFBZixFQUFrQyxvQkFBbEM7QUFDQUMsb0JBQU10TyxFQUFFcU8sS0FBUixFQUFlLGtCQUFmLEVBQW1DLHFCQUFuQztBQUNEO0FBQ0QsbUJBQU93RyxtQkFBbUI3VSxDQUFuQixDQUFQO0FBQ0QsV0FQRDs7QUFTQSxjQUFJMFEsb0JBQW9CQSxpQkFBaUJoYSxTQUFqQixDQUEyQm9lLFdBQW5ELEVBQWdFO0FBQzlELGdCQUFJQyxvQkFBb0JyRSxpQkFBaUJoYSxTQUFqQixDQUEyQm9lLFdBQW5EO0FBQ0FwRSw2QkFBaUJoYSxTQUFqQixDQUEyQm9lLFdBQTNCLEdBQXlDLFlBQVc7QUFDbEQsa0JBQUkvUCxNQUFNZ1Esa0JBQWtCM1QsS0FBbEIsQ0FBd0IsSUFBeEIsRUFBOEJwQyxTQUE5QixDQUFWO0FBQ0FzUCxvQkFBTXZKLEdBQU4sRUFBVyxvQkFBWCxFQUFpQyxpQkFBakM7QUFDQXVKLG9CQUFNdkosR0FBTixFQUFXLHFCQUFYLEVBQWtDLGtCQUFsQztBQUNBLHFCQUFPQSxHQUFQO0FBQ0QsYUFMRDtBQU1EOztBQUVELGNBQUkyTCxvQkFBb0JBLGlCQUFpQmhhLFNBQWpCLENBQTJCc2UsZ0JBQW5ELEVBQXFFO0FBQ25FLGdCQUFJQyx5QkFBeUJ2RSxpQkFBaUJoYSxTQUFqQixDQUEyQnNlLGdCQUF4RDtBQUNBdEUsNkJBQWlCaGEsU0FBakIsQ0FBMkJzZSxnQkFBM0IsR0FBOEMsVUFBU2hWLENBQVQsRUFBWTtBQUN4RCxrQkFBSSxLQUFLL1ksSUFBTCxLQUFjLE9BQWQsSUFBeUIsUUFBTytZLENBQVAseUNBQU9BLENBQVAsT0FBYSxRQUExQyxFQUFvRDtBQUNsREEsb0JBQUkxVCxLQUFLQyxLQUFMLENBQVdELEtBQUtvQixTQUFMLENBQWVzUyxDQUFmLENBQVgsQ0FBSjtBQUNBc08sc0JBQU10TyxDQUFOLEVBQVMsaUJBQVQsRUFBNEIsb0JBQTVCO0FBQ0FzTyxzQkFBTXRPLENBQU4sRUFBUyxrQkFBVCxFQUE2QixxQkFBN0I7QUFDRDtBQUNELHFCQUFPaVYsdUJBQXVCN1QsS0FBdkIsQ0FBNkIsSUFBN0IsRUFBbUMsQ0FBQ3BCLENBQUQsQ0FBbkMsQ0FBUDtBQUNELGFBUEQ7QUFRRDtBQUNGO0FBQ0R1TixrQkFBVWdELFlBQVYsR0FBeUIsVUFBU3BDLFdBQVQsRUFBc0JpQyxTQUF0QixFQUFpQ0MsT0FBakMsRUFBMEM7QUFDakUsY0FBSXZKLGVBQWV4QixPQUFmLEdBQXlCLEVBQTdCLEVBQWlDO0FBQy9CLG1CQUFPNkssY0FBY2hDLFdBQWQsRUFBMkJpQyxTQUEzQixFQUFzQ0MsT0FBdEMsQ0FBUDtBQUNEO0FBQ0Q7QUFDQWxLLGdCQUFNbUcsVUFBTixDQUFpQix3QkFBakIsRUFDSSxxQ0FESjtBQUVBaUIsb0JBQVVxQixZQUFWLENBQXVCMkIsWUFBdkIsQ0FBb0NwQyxXQUFwQyxFQUFpRHRuQixJQUFqRCxDQUFzRHVwQixTQUF0RCxFQUFpRUMsT0FBakU7QUFDRCxTQVJEO0FBU0QsT0FsTUQ7QUFvTUMsS0FuTnlDLEVBbU54QyxFQUFDLFlBQVcsRUFBWixFQW5Od0MsQ0FycElnd0IsRUF3Mkl2eEIsSUFBRyxDQUFDLFVBQVMvaEIsT0FBVCxFQUFpQlQsTUFBakIsRUFBd0JELE9BQXhCLEVBQWdDO0FBQ3ZEOzs7Ozs7O0FBT0E7O0FBQ0EsVUFBSXVZLFFBQVE3WCxRQUFRLFVBQVIsQ0FBWjs7QUFFQVQsYUFBT0QsT0FBUCxHQUFpQjtBQUNmNmEsNkJBQXFCLDZCQUFTL2lCLE1BQVQsRUFBaUI7QUFDcEMsY0FBSSxRQUFPQSxNQUFQLHlDQUFPQSxNQUFQLE9BQWtCLFFBQWxCLElBQThCLENBQUNBLE9BQU80QyxpQkFBMUMsRUFBNkQ7QUFDM0Q7QUFDRDtBQUNELGNBQUksRUFBRSxxQkFBcUI1QyxPQUFPNEMsaUJBQVAsQ0FBeUJvTyxTQUFoRCxDQUFKLEVBQWdFO0FBQzlEaFIsbUJBQU80QyxpQkFBUCxDQUF5Qm9PLFNBQXpCLENBQW1DUyxlQUFuQyxHQUFxRCxZQUFXO0FBQzlELGtCQUFJLENBQUMsS0FBSytkLGFBQVYsRUFBeUI7QUFDdkIscUJBQUtBLGFBQUwsR0FBcUIsRUFBckI7QUFDRDtBQUNELHFCQUFPLEtBQUtBLGFBQVo7QUFDRCxhQUxEO0FBTUQ7QUFDRCxjQUFJLEVBQUUsbUJBQW1CeHZCLE9BQU80QyxpQkFBUCxDQUF5Qm9PLFNBQTlDLENBQUosRUFBOEQ7QUFDNURoUixtQkFBTzRDLGlCQUFQLENBQXlCb08sU0FBekIsQ0FBbUN5ZSxhQUFuQyxHQUFtRCxVQUFTcHZCLEVBQVQsRUFBYTtBQUM5RCxrQkFBSThFLFNBQVMsSUFBYjtBQUNBLGtCQUFJLEtBQUtxcUIsYUFBVCxFQUF3QjtBQUN0QixxQkFBS0EsYUFBTCxDQUFtQmx1QixPQUFuQixDQUEyQixVQUFTaEQsTUFBVCxFQUFpQjtBQUMxQyxzQkFBSUEsT0FBTytCLEVBQVAsS0FBY0EsRUFBbEIsRUFBc0I7QUFDcEI4RSw2QkFBUzdHLE1BQVQ7QUFDRDtBQUNGLGlCQUpEO0FBS0Q7QUFDRCxrQkFBSSxLQUFLb3hCLGNBQVQsRUFBeUI7QUFDdkIscUJBQUtBLGNBQUwsQ0FBb0JwdUIsT0FBcEIsQ0FBNEIsVUFBU2hELE1BQVQsRUFBaUI7QUFDM0Msc0JBQUlBLE9BQU8rQixFQUFQLEtBQWNBLEVBQWxCLEVBQXNCO0FBQ3BCOEUsNkJBQVM3RyxNQUFUO0FBQ0Q7QUFDRixpQkFKRDtBQUtEO0FBQ0QscUJBQU82RyxNQUFQO0FBQ0QsYUFqQkQ7QUFrQkQ7QUFDRCxjQUFJLEVBQUUsZUFBZW5GLE9BQU80QyxpQkFBUCxDQUF5Qm9PLFNBQTFDLENBQUosRUFBMEQ7QUFDeEQsZ0JBQUkyZSxZQUFZM3ZCLE9BQU80QyxpQkFBUCxDQUF5Qm9PLFNBQXpCLENBQW1DckMsUUFBbkQ7QUFDQTNPLG1CQUFPNEMsaUJBQVAsQ0FBeUJvTyxTQUF6QixDQUFtQ3hNLFNBQW5DLEdBQStDLFVBQVNsRyxNQUFULEVBQWlCO0FBQzlELGtCQUFJLENBQUMsS0FBS2t4QixhQUFWLEVBQXlCO0FBQ3ZCLHFCQUFLQSxhQUFMLEdBQXFCLEVBQXJCO0FBQ0Q7QUFDRCxrQkFBSSxLQUFLQSxhQUFMLENBQW1CdmtCLE9BQW5CLENBQTJCM00sTUFBM0IsTUFBdUMsQ0FBQyxDQUE1QyxFQUErQztBQUM3QyxxQkFBS2t4QixhQUFMLENBQW1CNXRCLElBQW5CLENBQXdCdEQsTUFBeEI7QUFDRDtBQUNELGtCQUFJMlEsS0FBSyxJQUFUO0FBQ0EzUSxxQkFBT2dVLFNBQVAsR0FBbUJoUixPQUFuQixDQUEyQixVQUFTMkksS0FBVCxFQUFnQjtBQUN6QzBsQiwwQkFBVTNtQixJQUFWLENBQWVpRyxFQUFmLEVBQW1CaEYsS0FBbkIsRUFBMEIzTCxNQUExQjtBQUNELGVBRkQ7QUFHRCxhQVhEOztBQWFBMEIsbUJBQU80QyxpQkFBUCxDQUF5Qm9PLFNBQXpCLENBQW1DckMsUUFBbkMsR0FBOEMsVUFBUzFFLEtBQVQsRUFBZ0IzTCxNQUFoQixFQUF3QjtBQUNwRSxrQkFBSUEsTUFBSixFQUFZO0FBQ1Ysb0JBQUksQ0FBQyxLQUFLa3hCLGFBQVYsRUFBeUI7QUFDdkIsdUJBQUtBLGFBQUwsR0FBcUIsQ0FBQ2x4QixNQUFELENBQXJCO0FBQ0QsaUJBRkQsTUFFTyxJQUFJLEtBQUtreEIsYUFBTCxDQUFtQnZrQixPQUFuQixDQUEyQjNNLE1BQTNCLE1BQXVDLENBQUMsQ0FBNUMsRUFBK0M7QUFDcEQsdUJBQUtreEIsYUFBTCxDQUFtQjV0QixJQUFuQixDQUF3QnRELE1BQXhCO0FBQ0Q7QUFDRjtBQUNELHFCQUFPcXhCLFVBQVUzbUIsSUFBVixDQUFlLElBQWYsRUFBcUJpQixLQUFyQixFQUE0QjNMLE1BQTVCLENBQVA7QUFDRCxhQVREO0FBVUQ7QUFDRCxjQUFJLEVBQUUsa0JBQWtCMEIsT0FBTzRDLGlCQUFQLENBQXlCb08sU0FBN0MsQ0FBSixFQUE2RDtBQUMzRGhSLG1CQUFPNEMsaUJBQVAsQ0FBeUJvTyxTQUF6QixDQUFtQ2dDLFlBQW5DLEdBQWtELFVBQVMxVSxNQUFULEVBQWlCO0FBQ2pFLGtCQUFJLENBQUMsS0FBS2t4QixhQUFWLEVBQXlCO0FBQ3ZCLHFCQUFLQSxhQUFMLEdBQXFCLEVBQXJCO0FBQ0Q7QUFDRCxrQkFBSXZULFFBQVEsS0FBS3VULGFBQUwsQ0FBbUJ2a0IsT0FBbkIsQ0FBMkIzTSxNQUEzQixDQUFaO0FBQ0Esa0JBQUkyZCxVQUFVLENBQUMsQ0FBZixFQUFrQjtBQUNoQjtBQUNEO0FBQ0QsbUJBQUt1VCxhQUFMLENBQW1CemMsTUFBbkIsQ0FBMEJrSixLQUExQixFQUFpQyxDQUFqQztBQUNBLGtCQUFJaE4sS0FBSyxJQUFUO0FBQ0Esa0JBQUkyZ0IsU0FBU3R4QixPQUFPZ1UsU0FBUCxFQUFiO0FBQ0EsbUJBQUtXLFVBQUwsR0FBa0IzUixPQUFsQixDQUEwQixVQUFTc1IsTUFBVCxFQUFpQjtBQUN6QyxvQkFBSWdkLE9BQU8za0IsT0FBUCxDQUFlMkgsT0FBTzNJLEtBQXRCLE1BQWlDLENBQUMsQ0FBdEMsRUFBeUM7QUFDdkNnRixxQkFBR0YsV0FBSCxDQUFlNkQsTUFBZjtBQUNEO0FBQ0YsZUFKRDtBQUtELGFBaEJEO0FBaUJEO0FBQ0YsU0E5RWM7QUErRWZvUSw4QkFBc0IsOEJBQVNoakIsTUFBVCxFQUFpQjtBQUNyQyxjQUFJLFFBQU9BLE1BQVAseUNBQU9BLE1BQVAsT0FBa0IsUUFBbEIsSUFBOEIsQ0FBQ0EsT0FBTzRDLGlCQUExQyxFQUE2RDtBQUMzRDtBQUNEO0FBQ0QsY0FBSSxFQUFFLHNCQUFzQjVDLE9BQU80QyxpQkFBUCxDQUF5Qm9PLFNBQWpELENBQUosRUFBaUU7QUFDL0RoUixtQkFBTzRDLGlCQUFQLENBQXlCb08sU0FBekIsQ0FBbUNVLGdCQUFuQyxHQUFzRCxZQUFXO0FBQy9ELHFCQUFPLEtBQUtnZSxjQUFMLEdBQXNCLEtBQUtBLGNBQTNCLEdBQTRDLEVBQW5EO0FBQ0QsYUFGRDtBQUdEO0FBQ0QsY0FBSSxFQUFFLGlCQUFpQjF2QixPQUFPNEMsaUJBQVAsQ0FBeUJvTyxTQUE1QyxDQUFKLEVBQTREO0FBQzFEakssbUJBQU9zTSxjQUFQLENBQXNCclQsT0FBTzRDLGlCQUFQLENBQXlCb08sU0FBL0MsRUFBMEQsYUFBMUQsRUFBeUU7QUFDdkVzSCxtQkFBSyxlQUFXO0FBQ2QsdUJBQU8sS0FBS3VYLFlBQVo7QUFDRCxlQUhzRTtBQUl2RXZVLG1CQUFLLGFBQVNyVCxDQUFULEVBQVk7QUFDZixvQkFBSWdILEtBQUssSUFBVDtBQUNBLG9CQUFJLEtBQUs0Z0IsWUFBVCxFQUF1QjtBQUNyQix1QkFBS2hjLG1CQUFMLENBQXlCLFdBQXpCLEVBQXNDLEtBQUtnYyxZQUEzQztBQUNBLHVCQUFLaGMsbUJBQUwsQ0FBeUIsT0FBekIsRUFBa0MsS0FBS2ljLGdCQUF2QztBQUNEO0FBQ0QscUJBQUtwZCxnQkFBTCxDQUFzQixXQUF0QixFQUFtQyxLQUFLbWQsWUFBTCxHQUFvQjVuQixDQUF2RDtBQUNBLHFCQUFLeUssZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0IsS0FBS29kLGdCQUFMLEdBQXdCLFVBQVNsc0IsQ0FBVCxFQUFZO0FBQ2pFQSxvQkFBRVEsT0FBRixDQUFVOUMsT0FBVixDQUFrQixVQUFTaEQsTUFBVCxFQUFpQjtBQUNqQyx3QkFBSSxDQUFDMlEsR0FBR3lnQixjQUFSLEVBQXdCO0FBQ3RCemdCLHlCQUFHeWdCLGNBQUgsR0FBb0IsRUFBcEI7QUFDRDtBQUNELHdCQUFJemdCLEdBQUd5Z0IsY0FBSCxDQUFrQnprQixPQUFsQixDQUEwQjNNLE1BQTFCLEtBQXFDLENBQXpDLEVBQTRDO0FBQzFDO0FBQ0Q7QUFDRDJRLHVCQUFHeWdCLGNBQUgsQ0FBa0I5dEIsSUFBbEIsQ0FBdUJ0RCxNQUF2QjtBQUNBLHdCQUFJNEIsUUFBUSxJQUFJa1AsS0FBSixDQUFVLFdBQVYsQ0FBWjtBQUNBbFAsMEJBQU01QixNQUFOLEdBQWVBLE1BQWY7QUFDQTJRLHVCQUFHTCxhQUFILENBQWlCMU8sS0FBakI7QUFDRCxtQkFYRDtBQVlELGlCQWJEO0FBY0Q7QUF6QnNFLGFBQXpFO0FBMkJEO0FBQ0YsU0FySGM7QUFzSGY0aUIsMEJBQWtCLDBCQUFTOWlCLE1BQVQsRUFBaUI7QUFDakMsY0FBSSxRQUFPQSxNQUFQLHlDQUFPQSxNQUFQLE9BQWtCLFFBQWxCLElBQThCLENBQUNBLE9BQU80QyxpQkFBMUMsRUFBNkQ7QUFDM0Q7QUFDRDtBQUNELGNBQUlvTyxZQUFZaFIsT0FBTzRDLGlCQUFQLENBQXlCb08sU0FBekM7QUFDQSxjQUFJdk0sY0FBY3VNLFVBQVV2TSxXQUE1QjtBQUNBLGNBQUkxQixlQUFlaU8sVUFBVWpPLFlBQTdCO0FBQ0EsY0FBSUUsc0JBQXNCK04sVUFBVS9OLG1CQUFwQztBQUNBLGNBQUlKLHVCQUF1Qm1PLFVBQVVuTyxvQkFBckM7QUFDQSxjQUFJYSxrQkFBa0JzTixVQUFVdE4sZUFBaEM7O0FBRUFzTixvQkFBVXZNLFdBQVYsR0FBd0IsVUFBU3NpQixlQUFULEVBQTBCZ0osZUFBMUIsRUFBMkM7QUFDakUsZ0JBQUluUCxVQUFXdEgsVUFBVXpYLE1BQVYsSUFBb0IsQ0FBckIsR0FBMEJ5WCxVQUFVLENBQVYsQ0FBMUIsR0FBeUNBLFVBQVUsQ0FBVixDQUF2RDtBQUNBLGdCQUFJcU8sVUFBVWxqQixZQUFZaVgsS0FBWixDQUFrQixJQUFsQixFQUF3QixDQUFDa0YsT0FBRCxDQUF4QixDQUFkO0FBQ0EsZ0JBQUksQ0FBQ21QLGVBQUwsRUFBc0I7QUFDcEIscUJBQU9wSSxPQUFQO0FBQ0Q7QUFDREEsb0JBQVF4bUIsSUFBUixDQUFhNGxCLGVBQWIsRUFBOEJnSixlQUE5QjtBQUNBLG1CQUFPdHFCLFFBQVE5QyxPQUFSLEVBQVA7QUFDRCxXQVJEOztBQVVBcU8sb0JBQVVqTyxZQUFWLEdBQXlCLFVBQVNna0IsZUFBVCxFQUEwQmdKLGVBQTFCLEVBQTJDO0FBQ2xFLGdCQUFJblAsVUFBV3RILFVBQVV6WCxNQUFWLElBQW9CLENBQXJCLEdBQTBCeVgsVUFBVSxDQUFWLENBQTFCLEdBQXlDQSxVQUFVLENBQVYsQ0FBdkQ7QUFDQSxnQkFBSXFPLFVBQVU1a0IsYUFBYTJZLEtBQWIsQ0FBbUIsSUFBbkIsRUFBeUIsQ0FBQ2tGLE9BQUQsQ0FBekIsQ0FBZDtBQUNBLGdCQUFJLENBQUNtUCxlQUFMLEVBQXNCO0FBQ3BCLHFCQUFPcEksT0FBUDtBQUNEO0FBQ0RBLG9CQUFReG1CLElBQVIsQ0FBYTRsQixlQUFiLEVBQThCZ0osZUFBOUI7QUFDQSxtQkFBT3RxQixRQUFROUMsT0FBUixFQUFQO0FBQ0QsV0FSRDs7QUFVQSxjQUFJcXRCLGVBQWUsc0JBQVM3aEIsV0FBVCxFQUFzQjRZLGVBQXRCLEVBQXVDZ0osZUFBdkMsRUFBd0Q7QUFDekUsZ0JBQUlwSSxVQUFVMWtCLG9CQUFvQnlZLEtBQXBCLENBQTBCLElBQTFCLEVBQWdDLENBQUN2TixXQUFELENBQWhDLENBQWQ7QUFDQSxnQkFBSSxDQUFDNGhCLGVBQUwsRUFBc0I7QUFDcEIscUJBQU9wSSxPQUFQO0FBQ0Q7QUFDREEsb0JBQVF4bUIsSUFBUixDQUFhNGxCLGVBQWIsRUFBOEJnSixlQUE5QjtBQUNBLG1CQUFPdHFCLFFBQVE5QyxPQUFSLEVBQVA7QUFDRCxXQVBEO0FBUUFxTyxvQkFBVS9OLG1CQUFWLEdBQWdDK3NCLFlBQWhDOztBQUVBQSx5QkFBZSxzQkFBUzdoQixXQUFULEVBQXNCNFksZUFBdEIsRUFBdUNnSixlQUF2QyxFQUF3RDtBQUNyRSxnQkFBSXBJLFVBQVU5a0IscUJBQXFCNlksS0FBckIsQ0FBMkIsSUFBM0IsRUFBaUMsQ0FBQ3ZOLFdBQUQsQ0FBakMsQ0FBZDtBQUNBLGdCQUFJLENBQUM0aEIsZUFBTCxFQUFzQjtBQUNwQixxQkFBT3BJLE9BQVA7QUFDRDtBQUNEQSxvQkFBUXhtQixJQUFSLENBQWE0bEIsZUFBYixFQUE4QmdKLGVBQTlCO0FBQ0EsbUJBQU90cUIsUUFBUTlDLE9BQVIsRUFBUDtBQUNELFdBUEQ7QUFRQXFPLG9CQUFVbk8sb0JBQVYsR0FBaUNtdEIsWUFBakM7O0FBRUFBLHlCQUFlLHNCQUFTbnNCLFNBQVQsRUFBb0JrakIsZUFBcEIsRUFBcUNnSixlQUFyQyxFQUFzRDtBQUNuRSxnQkFBSXBJLFVBQVVqa0IsZ0JBQWdCZ1ksS0FBaEIsQ0FBc0IsSUFBdEIsRUFBNEIsQ0FBQzdYLFNBQUQsQ0FBNUIsQ0FBZDtBQUNBLGdCQUFJLENBQUNrc0IsZUFBTCxFQUFzQjtBQUNwQixxQkFBT3BJLE9BQVA7QUFDRDtBQUNEQSxvQkFBUXhtQixJQUFSLENBQWE0bEIsZUFBYixFQUE4QmdKLGVBQTlCO0FBQ0EsbUJBQU90cUIsUUFBUTlDLE9BQVIsRUFBUDtBQUNELFdBUEQ7QUFRQXFPLG9CQUFVdE4sZUFBVixHQUE0QnNzQixZQUE1QjtBQUNELFNBbExjO0FBbUxmOU4sMEJBQWtCLDBCQUFTbGlCLE1BQVQsRUFBaUI7QUFDakMsY0FBSTZuQixZQUFZN25CLFVBQVVBLE9BQU82bkIsU0FBakM7O0FBRUEsY0FBSSxDQUFDQSxVQUFVZ0QsWUFBZixFQUE2QjtBQUMzQixnQkFBSWhELFVBQVUrQyxrQkFBZCxFQUFrQztBQUNoQy9DLHdCQUFVZ0QsWUFBVixHQUF5QmhELFVBQVUrQyxrQkFBVixDQUE2QmpiLElBQTdCLENBQWtDa1ksU0FBbEMsQ0FBekI7QUFDRCxhQUZELE1BRU8sSUFBSUEsVUFBVXFCLFlBQVYsSUFDUHJCLFVBQVVxQixZQUFWLENBQXVCMkIsWUFEcEIsRUFDa0M7QUFDdkNoRCx3QkFBVWdELFlBQVYsR0FBeUIsVUFBU3BDLFdBQVQsRUFBc0J3SCxFQUF0QixFQUEwQkMsS0FBMUIsRUFBaUM7QUFDeERySSwwQkFBVXFCLFlBQVYsQ0FBdUIyQixZQUF2QixDQUFvQ3BDLFdBQXBDLEVBQ0N0bkIsSUFERCxDQUNNOHVCLEVBRE4sRUFDVUMsS0FEVjtBQUVELGVBSHdCLENBR3ZCdmdCLElBSHVCLENBR2xCa1ksU0FIa0IsQ0FBekI7QUFJRDtBQUNGO0FBQ0YsU0FqTWM7QUFrTWZoRiw4QkFBc0IsOEJBQVM3aUIsTUFBVCxFQUFpQjtBQUNyQztBQUNBLGNBQUkwbUIscUJBQXFCMW1CLE9BQU80QyxpQkFBaEM7QUFDQTVDLGlCQUFPNEMsaUJBQVAsR0FBMkIsVUFBUzBqQixRQUFULEVBQW1CQyxhQUFuQixFQUFrQztBQUMzRCxnQkFBSUQsWUFBWUEsU0FBU2puQixVQUF6QixFQUFxQztBQUNuQyxrQkFBSXNuQixnQkFBZ0IsRUFBcEI7QUFDQSxtQkFBSyxJQUFJeGdCLElBQUksQ0FBYixFQUFnQkEsSUFBSW1nQixTQUFTam5CLFVBQVQsQ0FBb0J3QyxNQUF4QyxFQUFnRHNFLEdBQWhELEVBQXFEO0FBQ25ELG9CQUFJd0UsU0FBUzJiLFNBQVNqbkIsVUFBVCxDQUFvQjhHLENBQXBCLENBQWI7QUFDQSxvQkFBSSxDQUFDd0UsT0FBT3VXLGNBQVAsQ0FBc0IsTUFBdEIsQ0FBRCxJQUNBdlcsT0FBT3VXLGNBQVAsQ0FBc0IsS0FBdEIsQ0FESixFQUNrQztBQUNoQ1Qsd0JBQU1tRyxVQUFOLENBQWlCLGtCQUFqQixFQUFxQyxtQkFBckM7QUFDQWpjLDJCQUFTL0QsS0FBS0MsS0FBTCxDQUFXRCxLQUFLb0IsU0FBTCxDQUFlMkMsTUFBZixDQUFYLENBQVQ7QUFDQUEseUJBQU9DLElBQVAsR0FBY0QsT0FBT3pGLEdBQXJCO0FBQ0EseUJBQU95RixPQUFPekYsR0FBZDtBQUNBeWhCLGdDQUFjL2tCLElBQWQsQ0FBbUIrSSxNQUFuQjtBQUNELGlCQVBELE1BT087QUFDTGdjLGdDQUFjL2tCLElBQWQsQ0FBbUIwa0IsU0FBU2puQixVQUFULENBQW9COEcsQ0FBcEIsQ0FBbkI7QUFDRDtBQUNGO0FBQ0RtZ0IsdUJBQVNqbkIsVUFBVCxHQUFzQnNuQixhQUF0QjtBQUNEO0FBQ0QsbUJBQU8sSUFBSUQsa0JBQUosQ0FBdUJKLFFBQXZCLEVBQWlDQyxhQUFqQyxDQUFQO0FBQ0QsV0FuQkQ7QUFvQkF2bUIsaUJBQU80QyxpQkFBUCxDQUF5Qm9PLFNBQXpCLEdBQXFDMFYsbUJBQW1CMVYsU0FBeEQ7QUFDQTtBQUNBLGNBQUkseUJBQXlCaFIsT0FBTzRDLGlCQUFwQyxFQUF1RDtBQUNyRG1FLG1CQUFPc00sY0FBUCxDQUFzQnJULE9BQU80QyxpQkFBN0IsRUFBZ0QscUJBQWhELEVBQXVFO0FBQ3JFMFYsbUJBQUssZUFBVztBQUNkLHVCQUFPb08sbUJBQW1CRCxtQkFBMUI7QUFDRDtBQUhvRSxhQUF2RTtBQUtEO0FBQ0YsU0FsT2M7QUFtT2Z4RCxtQ0FBMkIsbUNBQVNqakIsTUFBVCxFQUFpQjtBQUMxQztBQUNBLGNBQUksUUFBT0EsTUFBUCx5Q0FBT0EsTUFBUCxPQUFrQixRQUFsQixJQUE4QkEsT0FBTzRDLGlCQUFyQyxJQUNDLGNBQWM1QyxPQUFPa3VCLGFBQVAsQ0FBcUJsZCxTQURwQztBQUVBO0FBQ0E7QUFDQSxXQUFDaFIsT0FBT213QixjQUpaLEVBSTRCO0FBQzFCcHBCLG1CQUFPc00sY0FBUCxDQUFzQnJULE9BQU9rdUIsYUFBUCxDQUFxQmxkLFNBQTNDLEVBQXNELGFBQXRELEVBQXFFO0FBQ25Fc0gsbUJBQUssZUFBVztBQUNkLHVCQUFPLEVBQUNwSixVQUFVLEtBQUtBLFFBQWhCLEVBQVA7QUFDRDtBQUhrRSxhQUFyRTtBQUtEO0FBQ0YsU0FoUGM7O0FBa1BmZ1UsK0JBQXVCLCtCQUFTbGpCLE1BQVQsRUFBaUI7QUFDdEMsY0FBSW93QixrQkFBa0Jwd0IsT0FBTzRDLGlCQUFQLENBQXlCb08sU0FBekIsQ0FBbUN2TSxXQUF6RDtBQUNBekUsaUJBQU80QyxpQkFBUCxDQUF5Qm9PLFNBQXpCLENBQW1Ddk0sV0FBbkMsR0FBaUQsVUFBUzRVLFlBQVQsRUFBdUI7QUFDdEUsZ0JBQUlwSyxLQUFLLElBQVQ7QUFDQSxnQkFBSW9LLFlBQUosRUFBa0I7QUFDaEIsa0JBQUksT0FBT0EsYUFBYUksbUJBQXBCLEtBQTRDLFdBQWhELEVBQTZEO0FBQzNEO0FBQ0FKLDZCQUFhSSxtQkFBYixHQUFtQyxDQUFDLENBQUNKLGFBQWFJLG1CQUFsRDtBQUNEO0FBQ0Qsa0JBQUk0VyxtQkFBbUJwaEIsR0FBR3FoQixlQUFILEdBQXFCM2lCLElBQXJCLENBQTBCLFVBQVN4RSxXQUFULEVBQXNCO0FBQ3JFLHVCQUFPQSxZQUFZeUosTUFBWixDQUFtQjNJLEtBQW5CLElBQ0hkLFlBQVl5SixNQUFaLENBQW1CM0ksS0FBbkIsQ0FBeUIxSSxJQUF6QixLQUFrQyxPQUR0QztBQUVELGVBSHNCLENBQXZCO0FBSUEsa0JBQUk4WCxhQUFhSSxtQkFBYixLQUFxQyxLQUFyQyxJQUE4QzRXLGdCQUFsRCxFQUFvRTtBQUNsRSxvQkFBSUEsaUJBQWlCaFosU0FBakIsS0FBK0IsVUFBbkMsRUFBK0M7QUFDN0Msc0JBQUlnWixpQkFBaUJFLFlBQXJCLEVBQW1DO0FBQ2pDRixxQ0FBaUJFLFlBQWpCLENBQThCLFVBQTlCO0FBQ0QsbUJBRkQsTUFFTztBQUNMRixxQ0FBaUJoWixTQUFqQixHQUE2QixVQUE3QjtBQUNEO0FBQ0YsaUJBTkQsTUFNTyxJQUFJZ1osaUJBQWlCaFosU0FBakIsS0FBK0IsVUFBbkMsRUFBK0M7QUFDcEQsc0JBQUlnWixpQkFBaUJFLFlBQXJCLEVBQW1DO0FBQ2pDRixxQ0FBaUJFLFlBQWpCLENBQThCLFVBQTlCO0FBQ0QsbUJBRkQsTUFFTztBQUNMRixxQ0FBaUJoWixTQUFqQixHQUE2QixVQUE3QjtBQUNEO0FBQ0Y7QUFDRixlQWRELE1BY08sSUFBSWdDLGFBQWFJLG1CQUFiLEtBQXFDLElBQXJDLElBQ1AsQ0FBQzRXLGdCQURFLEVBQ2dCO0FBQ3JCcGhCLG1CQUFHdWhCLGNBQUgsQ0FBa0IsT0FBbEI7QUFDRDs7QUFHRCxrQkFBSSxPQUFPblgsYUFBYUksbUJBQXBCLEtBQTRDLFdBQWhELEVBQTZEO0FBQzNEO0FBQ0FKLDZCQUFhSyxtQkFBYixHQUFtQyxDQUFDLENBQUNMLGFBQWFLLG1CQUFsRDtBQUNEO0FBQ0Qsa0JBQUkrVyxtQkFBbUJ4aEIsR0FBR3FoQixlQUFILEdBQXFCM2lCLElBQXJCLENBQTBCLFVBQVN4RSxXQUFULEVBQXNCO0FBQ3JFLHVCQUFPQSxZQUFZeUosTUFBWixDQUFtQjNJLEtBQW5CLElBQ0hkLFlBQVl5SixNQUFaLENBQW1CM0ksS0FBbkIsQ0FBeUIxSSxJQUF6QixLQUFrQyxPQUR0QztBQUVELGVBSHNCLENBQXZCO0FBSUEsa0JBQUk4WCxhQUFhSyxtQkFBYixLQUFxQyxLQUFyQyxJQUE4QytXLGdCQUFsRCxFQUFvRTtBQUNsRSxvQkFBSUEsaUJBQWlCcFosU0FBakIsS0FBK0IsVUFBbkMsRUFBK0M7QUFDN0NvWixtQ0FBaUJGLFlBQWpCLENBQThCLFVBQTlCO0FBQ0QsaUJBRkQsTUFFTyxJQUFJRSxpQkFBaUJwWixTQUFqQixLQUErQixVQUFuQyxFQUErQztBQUNwRG9aLG1DQUFpQkYsWUFBakIsQ0FBOEIsVUFBOUI7QUFDRDtBQUNGLGVBTkQsTUFNTyxJQUFJbFgsYUFBYUssbUJBQWIsS0FBcUMsSUFBckMsSUFDUCxDQUFDK1csZ0JBREUsRUFDZ0I7QUFDckJ4aEIsbUJBQUd1aEIsY0FBSCxDQUFrQixPQUFsQjtBQUNEO0FBQ0Y7QUFDRCxtQkFBT0osZ0JBQWdCMVUsS0FBaEIsQ0FBc0J6TSxFQUF0QixFQUEwQnFLLFNBQTFCLENBQVA7QUFDRCxXQW5ERDtBQW9ERDtBQXhTYyxPQUFqQjtBQTJTQyxLQXRUcUIsRUFzVHBCLEVBQUMsWUFBVyxFQUFaLEVBdFRvQixDQXgySW94QixFQThwSnZ4QixJQUFHLENBQUMsVUFBUzFRLE9BQVQsRUFBaUJULE1BQWpCLEVBQXdCRCxPQUF4QixFQUFnQztBQUN2RDs7Ozs7OztBQU9DO0FBQ0Q7O0FBRUEsVUFBSXdvQixlQUFlLElBQW5CO0FBQ0EsVUFBSUMsdUJBQXVCLElBQTNCOztBQUVBOzs7Ozs7OztBQVFBLGVBQVMvTyxjQUFULENBQXdCZ1AsUUFBeEIsRUFBa0NDLElBQWxDLEVBQXdDQyxHQUF4QyxFQUE2QztBQUMzQyxZQUFJMXJCLFFBQVF3ckIsU0FBU3hyQixLQUFULENBQWV5ckIsSUFBZixDQUFaO0FBQ0EsZUFBT3pyQixTQUFTQSxNQUFNdkQsTUFBTixJQUFnQml2QixHQUF6QixJQUFnQ3B2QixTQUFTMEQsTUFBTTByQixHQUFOLENBQVQsRUFBcUIsRUFBckIsQ0FBdkM7QUFDRDs7QUFFRDtBQUNBO0FBQ0EsZUFBU3ROLHVCQUFULENBQWlDeGpCLE1BQWpDLEVBQXlDK3dCLGVBQXpDLEVBQTBEQyxPQUExRCxFQUFtRTtBQUNqRSxZQUFJLENBQUNoeEIsT0FBTzRDLGlCQUFaLEVBQStCO0FBQzdCO0FBQ0Q7QUFDRCxZQUFJcXVCLFFBQVFqeEIsT0FBTzRDLGlCQUFQLENBQXlCb08sU0FBckM7QUFDQSxZQUFJa2dCLHlCQUF5QkQsTUFBTXZlLGdCQUFuQztBQUNBdWUsY0FBTXZlLGdCQUFOLEdBQXlCLFVBQVN5ZSxlQUFULEVBQTBCbEIsRUFBMUIsRUFBOEI7QUFDckQsY0FBSWtCLG9CQUFvQkosZUFBeEIsRUFBeUM7QUFDdkMsbUJBQU9HLHVCQUF1QnhWLEtBQXZCLENBQTZCLElBQTdCLEVBQW1DcEMsU0FBbkMsQ0FBUDtBQUNEO0FBQ0QsY0FBSThYLGtCQUFrQixTQUFsQkEsZUFBa0IsQ0FBU3h0QixDQUFULEVBQVk7QUFDaENxc0IsZUFBR2UsUUFBUXB0QixDQUFSLENBQUg7QUFDRCxXQUZEO0FBR0EsZUFBS3l0QixTQUFMLEdBQWlCLEtBQUtBLFNBQUwsSUFBa0IsRUFBbkM7QUFDQSxlQUFLQSxTQUFMLENBQWVwQixFQUFmLElBQXFCbUIsZUFBckI7QUFDQSxpQkFBT0YsdUJBQXVCeFYsS0FBdkIsQ0FBNkIsSUFBN0IsRUFBbUMsQ0FBQ3lWLGVBQUQsRUFDeENDLGVBRHdDLENBQW5DLENBQVA7QUFFRCxTQVhEOztBQWFBLFlBQUlFLDRCQUE0QkwsTUFBTXBkLG1CQUF0QztBQUNBb2QsY0FBTXBkLG1CQUFOLEdBQTRCLFVBQVNzZCxlQUFULEVBQTBCbEIsRUFBMUIsRUFBOEI7QUFDeEQsY0FBSWtCLG9CQUFvQkosZUFBcEIsSUFBdUMsQ0FBQyxLQUFLTSxTQUE3QyxJQUNHLENBQUMsS0FBS0EsU0FBTCxDQUFlcEIsRUFBZixDQURSLEVBQzRCO0FBQzFCLG1CQUFPcUIsMEJBQTBCNVYsS0FBMUIsQ0FBZ0MsSUFBaEMsRUFBc0NwQyxTQUF0QyxDQUFQO0FBQ0Q7QUFDRCxjQUFJaVksY0FBYyxLQUFLRixTQUFMLENBQWVwQixFQUFmLENBQWxCO0FBQ0EsaUJBQU8sS0FBS29CLFNBQUwsQ0FBZXBCLEVBQWYsQ0FBUDtBQUNBLGlCQUFPcUIsMEJBQTBCNVYsS0FBMUIsQ0FBZ0MsSUFBaEMsRUFBc0MsQ0FBQ3lWLGVBQUQsRUFDM0NJLFdBRDJDLENBQXRDLENBQVA7QUFFRCxTQVREOztBQVdBeHFCLGVBQU9zTSxjQUFQLENBQXNCNGQsS0FBdEIsRUFBNkIsT0FBT0YsZUFBcEMsRUFBcUQ7QUFDbkR6WSxlQUFLLGVBQVc7QUFDZCxtQkFBTyxLQUFLLFFBQVF5WSxlQUFiLENBQVA7QUFDRCxXQUhrRDtBQUluRHpWLGVBQUssYUFBUzJVLEVBQVQsRUFBYTtBQUNoQixnQkFBSSxLQUFLLFFBQVFjLGVBQWIsQ0FBSixFQUFtQztBQUNqQyxtQkFBS2xkLG1CQUFMLENBQXlCa2QsZUFBekIsRUFDSSxLQUFLLFFBQVFBLGVBQWIsQ0FESjtBQUVBLHFCQUFPLEtBQUssUUFBUUEsZUFBYixDQUFQO0FBQ0Q7QUFDRCxnQkFBSWQsRUFBSixFQUFRO0FBQ04sbUJBQUt2ZCxnQkFBTCxDQUFzQnFlLGVBQXRCLEVBQ0ksS0FBSyxRQUFRQSxlQUFiLElBQWdDZCxFQURwQztBQUVEO0FBQ0Y7QUFka0QsU0FBckQ7QUFnQkQ7O0FBRUQ7QUFDQTluQixhQUFPRCxPQUFQLEdBQWlCO0FBQ2YwWix3QkFBZ0JBLGNBREQ7QUFFZjRCLGlDQUF5QkEsdUJBRlY7QUFHZjNCLG9CQUFZLG9CQUFTMlAsSUFBVCxFQUFlO0FBQ3pCLGNBQUksT0FBT0EsSUFBUCxLQUFnQixTQUFwQixFQUErQjtBQUM3QixtQkFBTyxJQUFJM29CLEtBQUosQ0FBVSw0QkFBMkIyb0IsSUFBM0IseUNBQTJCQSxJQUEzQixLQUNiLHlCQURHLENBQVA7QUFFRDtBQUNEZCx5QkFBZWMsSUFBZjtBQUNBLGlCQUFRQSxJQUFELEdBQVMsNkJBQVQsR0FDSCw0QkFESjtBQUVELFNBWGM7O0FBYWY7Ozs7QUFJQTFQLHlCQUFpQix5QkFBUzBQLElBQVQsRUFBZTtBQUM5QixjQUFJLE9BQU9BLElBQVAsS0FBZ0IsU0FBcEIsRUFBK0I7QUFDN0IsbUJBQU8sSUFBSTNvQixLQUFKLENBQVUsNEJBQTJCMm9CLElBQTNCLHlDQUEyQkEsSUFBM0IsS0FDYix5QkFERyxDQUFQO0FBRUQ7QUFDRGIsaUNBQXVCLENBQUNhLElBQXhCO0FBQ0EsaUJBQU8sc0NBQXNDQSxPQUFPLFVBQVAsR0FBb0IsU0FBMUQsQ0FBUDtBQUNELFNBeEJjOztBQTBCZnJ6QixhQUFLLGVBQVc7QUFDZCxjQUFJLFFBQU82QixNQUFQLHlDQUFPQSxNQUFQLE9BQWtCLFFBQXRCLEVBQWdDO0FBQzlCLGdCQUFJMHdCLFlBQUosRUFBa0I7QUFDaEI7QUFDRDtBQUNELGdCQUFJLE9BQU83bEIsT0FBUCxLQUFtQixXQUFuQixJQUFrQyxPQUFPQSxRQUFRMU0sR0FBZixLQUF1QixVQUE3RCxFQUF5RTtBQUN2RTBNLHNCQUFRMU0sR0FBUixDQUFZdWQsS0FBWixDQUFrQjdRLE9BQWxCLEVBQTJCeU8sU0FBM0I7QUFDRDtBQUNGO0FBQ0YsU0FuQ2M7O0FBcUNmOzs7QUFHQXNOLG9CQUFZLG9CQUFTNkssU0FBVCxFQUFvQkMsU0FBcEIsRUFBK0I7QUFDekMsY0FBSSxDQUFDZixvQkFBTCxFQUEyQjtBQUN6QjtBQUNEO0FBQ0Q5bEIsa0JBQVFDLElBQVIsQ0FBYTJtQixZQUFZLDZCQUFaLEdBQTRDQyxTQUE1QyxHQUNULFdBREo7QUFFRCxTQTlDYzs7QUFnRGY7Ozs7OztBQU1BclEsdUJBQWUsdUJBQVNyaEIsTUFBVCxFQUFpQjtBQUM5QixjQUFJNm5CLFlBQVk3bkIsVUFBVUEsT0FBTzZuQixTQUFqQzs7QUFFQTtBQUNBLGNBQUkxaUIsU0FBUyxFQUFiO0FBQ0FBLGlCQUFPUSxPQUFQLEdBQWlCLElBQWpCO0FBQ0FSLGlCQUFPeWEsT0FBUCxHQUFpQixJQUFqQjs7QUFFQTtBQUNBLGNBQUksT0FBTzVmLE1BQVAsS0FBa0IsV0FBbEIsSUFBaUMsQ0FBQ0EsT0FBTzZuQixTQUE3QyxFQUF3RDtBQUN0RDFpQixtQkFBT1EsT0FBUCxHQUFpQixnQkFBakI7QUFDQSxtQkFBT1IsTUFBUDtBQUNEOztBQUVELGNBQUkwaUIsVUFBVW1ILGVBQWQsRUFBK0I7QUFBRTtBQUMvQjdwQixtQkFBT1EsT0FBUCxHQUFpQixTQUFqQjtBQUNBUixtQkFBT3lhLE9BQVAsR0FBaUJnQyxlQUFlaUcsVUFBVThKLFNBQXpCLEVBQ2Isa0JBRGEsRUFDTyxDQURQLENBQWpCO0FBRUQsV0FKRCxNQUlPLElBQUk5SixVQUFVK0Msa0JBQWQsRUFBa0M7QUFDdkM7QUFDQTtBQUNBemxCLG1CQUFPUSxPQUFQLEdBQWlCLFFBQWpCO0FBQ0FSLG1CQUFPeWEsT0FBUCxHQUFpQmdDLGVBQWVpRyxVQUFVOEosU0FBekIsRUFDYix1QkFEYSxFQUNZLENBRFosQ0FBakI7QUFFRCxXQU5NLE1BTUEsSUFBSTlKLFVBQVVxQixZQUFWLElBQ1ByQixVQUFVOEosU0FBVixDQUFvQnZzQixLQUFwQixDQUEwQixvQkFBMUIsQ0FERyxFQUM4QztBQUFFO0FBQ3JERCxtQkFBT1EsT0FBUCxHQUFpQixNQUFqQjtBQUNBUixtQkFBT3lhLE9BQVAsR0FBaUJnQyxlQUFlaUcsVUFBVThKLFNBQXpCLEVBQ2Isb0JBRGEsRUFDUyxDQURULENBQWpCO0FBRUQsV0FMTSxNQUtBLElBQUkzeEIsT0FBTzRDLGlCQUFQLElBQ1BpbEIsVUFBVThKLFNBQVYsQ0FBb0J2c0IsS0FBcEIsQ0FBMEIsc0JBQTFCLENBREcsRUFDZ0Q7QUFBRTtBQUN2REQsbUJBQU9RLE9BQVAsR0FBaUIsUUFBakI7QUFDQVIsbUJBQU95YSxPQUFQLEdBQWlCZ0MsZUFBZWlHLFVBQVU4SixTQUF6QixFQUNiLHNCQURhLEVBQ1csQ0FEWCxDQUFqQjtBQUVELFdBTE0sTUFLQTtBQUFFO0FBQ1B4c0IsbUJBQU9RLE9BQVAsR0FBaUIsMEJBQWpCO0FBQ0EsbUJBQU9SLE1BQVA7QUFDRDs7QUFFRCxpQkFBT0EsTUFBUDtBQUNEO0FBOUZjLE9BQWpCO0FBaUdDLEtBaExxQixFQWdMcEIsRUFoTG9CLENBOXBKb3hCLEVBQTNiLEVBODBKeFcsRUE5MEp3VyxFQTgwSnJXLENBQUMsQ0FBRCxDQTkwSnFXLEVBODBKaFcsQ0E5MEpnVyxDQUFQO0FBKzBKdlcsQ0EvMEpELEUiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5XZWJSVENQcm92aWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gMTEuLlxyXG4gKi9cclxuaW1wb3J0IFByb3ZpZGVyIGZyb20gXCJhcGkvcHJvdmlkZXIvaHRtbDUvUHJvdmlkZXJcIjtcclxuaW1wb3J0IFdlYlJUQ0xvYWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9XZWJSVENMb2FkZXJcIjtcclxuaW1wb3J0IHtpc1dlYlJUQ30gZnJvbSBcInV0aWxzL3ZhbGlkYXRvclwiO1xyXG5pbXBvcnQge2Vycm9yVHJpZ2dlcn0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xyXG5pbXBvcnQge1BST1ZJREVSX1dFQlJUQywgU1RBVEVfSURMRSwgQ09OVEVOVF9NRVRBLCBTVEFURV9QTEFZSU5HfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIHdlYnJ0YyBwcm92aWRlciBleHRlbmRlZCBjb3JlLlxyXG4gKiBAcGFyYW0gICBjb250YWluZXIgcGxheWVyIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXHJcbiAqICovXHJcblxyXG5jb25zdCBXZWJSVEMgPSBmdW5jdGlvbihlbGVtZW50LCBwbGF5ZXJDb25maWcsIGFkVGFnVXJsKXtcclxuICAgIGxldCB0aGF0ID0ge307XHJcbiAgICBsZXQgd2VicnRjTG9hZGVyID0gbnVsbDtcclxuICAgIGxldCBzdXBlckRlc3Ryb3lfZnVuYyAgPSBudWxsO1xyXG5cclxuICAgIGxldCBzcGVjID0ge1xyXG4gICAgICAgIG5hbWUgOiBQUk9WSURFUl9XRUJSVEMsXHJcbiAgICAgICAgZWxlbWVudCA6IGVsZW1lbnQsXHJcbiAgICAgICAgbXNlIDogbnVsbCxcclxuICAgICAgICBsaXN0ZW5lciA6IG51bGwsXHJcbiAgICAgICAgaXNMb2FkZWQgOiBmYWxzZSxcclxuICAgICAgICBjYW5TZWVrIDogZmFsc2UsXHJcbiAgICAgICAgaXNMaXZlIDogZmFsc2UsXHJcbiAgICAgICAgc2Vla2luZyA6IGZhbHNlLFxyXG4gICAgICAgIHN0YXRlIDogU1RBVEVfSURMRSxcclxuICAgICAgICBidWZmZXIgOiAwLFxyXG4gICAgICAgIGZyYW1lcmF0ZSA6IDAsXHJcbiAgICAgICAgY3VycmVudFF1YWxpdHkgOiAtMSxcclxuICAgICAgICBjdXJyZW50U291cmNlIDogLTEsXHJcbiAgICAgICAgcXVhbGl0eUxldmVscyA6IFtdLFxyXG4gICAgICAgIHNvdXJjZXMgOiBbXSxcclxuICAgICAgICBhZFRhZ1VybCA6IGFkVGFnVXJsXHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQgPSBQcm92aWRlcihzcGVjLCBwbGF5ZXJDb25maWcsIGZ1bmN0aW9uKHNvdXJjZSl7XHJcbiAgICAgICAgaWYoaXNXZWJSVEMoc291cmNlLmZpbGUsIHNvdXJjZS50eXBlKSl7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldFQlJUQyA6IG9uQmVmb3JlTG9hZCA6IFwiLCBzb3VyY2UpO1xyXG4gICAgICAgICAgICBpZih3ZWJydGNMb2FkZXIpe1xyXG4gICAgICAgICAgICAgICAgd2VicnRjTG9hZGVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIHdlYnJ0Y0xvYWRlciA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBsb2FkQ2FsbGJhY2sgPSBmdW5jdGlvbihzdHJlYW0pe1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LnNyY09iamVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc3JjT2JqZWN0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnNyY09iamVjdCA9IHN0cmVhbTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHdlYnJ0Y0xvYWRlciA9IFdlYlJUQ0xvYWRlcih0aGF0LCBzb3VyY2UuZmlsZSwgbG9hZENhbGxiYWNrLCBlcnJvclRyaWdnZXIsIHBsYXllckNvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICB3ZWJydGNMb2FkZXIuY29ubmVjdChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgLy9Ub0RvIDogcmVzb2x2ZSBub3Qgd29ya3JpbmdcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgLy90aGF0LmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIC8vRG8gbm90aGluZ1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQub24oQ09OVEVOVF9NRVRBLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmICh0aGF0LmdldFN0YXRlKCkgIT09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGhhdC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCB0aGF0KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHN1cGVyRGVzdHJveV9mdW5jID0gdGhhdC5zdXBlcignZGVzdHJveScpO1xyXG5cclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldFQlJUQyBQUk9WSURFUiBMT0FERUQuXCIpO1xyXG5cclxuXHJcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcclxuICAgICAgICBpZih3ZWJydGNMb2FkZXIpe1xyXG4gICAgICAgICAgICB3ZWJydGNMb2FkZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICBlbGVtZW50LnNyY09iamVjdCA9IG51bGw7XHJcbiAgICAgICAgICAgIHdlYnJ0Y0xvYWRlciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoYXQub2ZmKENPTlRFTlRfTUVUQSwgbnVsbCwgdGhhdCk7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiV0VCUlRDIDogIFBST1ZJREVSIERFU1RST1lFRC5cIik7XHJcblxyXG4gICAgICAgIHN1cGVyRGVzdHJveV9mdW5jKCk7XHJcblxyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFdlYlJUQztcclxuIiwiaW1wb3J0IGFkYXB0ZXIgZnJvbSAndXRpbHMvYWRhcHRlcic7XHJcbmltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XHJcbmltcG9ydCB7YW5hbFVzZXJBZ2VudH0gZnJvbSBcInV0aWxzL2Jyb3dzZXJcIjtcclxuaW1wb3J0IHtcclxuICAgIEVSUk9SUyxcclxuICAgIFBMQVlFUl9XRUJSVENfV1NfRVJST1IsXHJcbiAgICBQTEFZRVJfV0VCUlRDX1dTX0NMT1NFRCxcclxuICAgIFBMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUixcclxuICAgIFBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SLFxyXG4gICAgUExBWUVSX1dFQlJUQ19DUkVBVEVfQU5TV0VSX0VSUk9SLFxyXG4gICAgUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUixcclxuICAgIFBMQVlFUl9XRUJSVENfTkVUV09SS19TTE9XLFxyXG4gICAgUExBWUVSX1dFQlJUQ19VTkVYUEVDVEVEX0RJU0NPTk5FQ1QsXHJcbiAgICBPTUVfUDJQX01PREVcclxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuXHJcbmNvbnN0IFdlYlJUQ0xvYWRlciA9IGZ1bmN0aW9uIChwcm92aWRlciwgd2ViU29ja2V0VXJsLCBsb2FkQ2FsbGJhY2ssIGVycm9yVHJpZ2dlciwgcGxheWVyQ29uZmlnKSB7XHJcblxyXG4gICAgbGV0IHBlZXJDb25uZWN0aW9uQ29uZmlnID0ge1xyXG4gICAgICAgICdpY2VTZXJ2ZXJzJzogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAndXJscyc6ICdzdHVuOnN0dW4ubC5nb29nbGUuY29tOjE5MzAyJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAocGxheWVyQ29uZmlnLmdldENvbmZpZygpLndlYnJ0Y0NvbmZpZykge1xyXG5cclxuICAgICAgICBpZiAocGxheWVyQ29uZmlnLmdldENvbmZpZygpLndlYnJ0Y0NvbmZpZy5pY2VTZXJ2ZXJzKSB7XHJcblxyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkNvbmZpZy5pY2VTZXJ2ZXJzID0gcGxheWVyQ29uZmlnLmdldENvbmZpZygpLndlYnJ0Y0NvbmZpZy5pY2VTZXJ2ZXJzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRDb25maWcoKS53ZWJydGNDb25maWcuaWNlVHJhbnNwb3J0UG9saWN5KSB7XHJcblxyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkNvbmZpZy5pY2VUcmFuc3BvcnRQb2xpY3kgPSBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkud2VicnRjQ29uZmlnLmljZVRyYW5zcG9ydFBvbGljeTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHRoYXQgPSB7fTtcclxuXHJcbiAgICBsZXQgd3MgPSBudWxsO1xyXG5cclxuICAgIGxldCB3c1BpbmcgPSBudWxsO1xyXG5cclxuICAgIGxldCBtYWluU3RyZWFtID0gbnVsbDtcclxuXHJcbiAgICAvLyB1c2VkIGZvciBnZXR0aW5nIG1lZGlhIHN0cmVhbSBmcm9tIE9NRSBvciBob3N0IHBlZXJcclxuICAgIGxldCBtYWluUGVlckNvbm5lY3Rpb25JbmZvID0gbnVsbDtcclxuXHJcbiAgICAvLyB1c2VkIGZvciBzZW5kIG1lZGlhIHN0cmVhbSB0byBjbGllbnQgcGVlci5cclxuICAgIGxldCBjbGllbnRQZWVyQ29ubmVjdGlvbnMgPSB7fTtcclxuXHJcbiAgICAvL2Nsb3NlZCB3ZWJzb2NrZXQgYnkgb21lIG9yIGNsaWVudC5cclxuICAgIGxldCB3c0Nsb3NlZEJ5UGxheWVyID0gZmFsc2U7XHJcblxyXG4gICAgbGV0IHN0YXRpc3RpY3NUaW1lciA9IG51bGw7XHJcblxyXG4gICAgbGV0IGN1cnJlbnRCcm93c2VyID0gYW5hbFVzZXJBZ2VudCgpO1xyXG5cclxuICAgIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGV4aXN0aW5nSGFuZGxlciA9IHdpbmRvdy5vbmJlZm9yZXVubG9hZDtcclxuICAgICAgICB3aW5kb3cub25iZWZvcmV1bmxvYWQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKGV4aXN0aW5nSGFuZGxlcikge1xyXG4gICAgICAgICAgICAgICAgZXhpc3RpbmdIYW5kbGVyKGV2ZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJUaGlzIGNhbGxzIGF1dG8gd2hlbiBicm93c2VyIGNsb3NlZC5cIik7XHJcbiAgICAgICAgICAgIGNsb3NlUGVlcigpO1xyXG4gICAgICAgIH1cclxuICAgIH0pKCk7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0UGVlckNvbm5lY3Rpb25CeUlkKGlkKSB7XHJcblxyXG4gICAgICAgIGxldCBwZWVyQ29ubmVjdGlvbiA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmIChtYWluUGVlckNvbm5lY3Rpb25JbmZvICYmIGlkID09PSBtYWluUGVlckNvbm5lY3Rpb25JbmZvLmlkKSB7XHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uID0gbWFpblBlZXJDb25uZWN0aW9uSW5mby5wZWVyQ29ubmVjdGlvbjtcclxuICAgICAgICB9IGVsc2UgaWYgKGNsaWVudFBlZXJDb25uZWN0aW9uc1tpZF0pIHtcclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24gPSBjbGllbnRQZWVyQ29ubmVjdGlvbnNbaWRdLnBlZXJDb25uZWN0aW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHBlZXJDb25uZWN0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGV4dHJhY3RMb3NzUGFja2V0c09uTmV0d29ya1N0YXR1cyhwZWVyQ29ubmVjdGlvbkluZm8pIHtcclxuXHJcbiAgICAgICAgaWYgKHBlZXJDb25uZWN0aW9uSW5mby5zdGF0aXN0aWNzVGltZXIpIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHBlZXJDb25uZWN0aW9uSW5mby5zdGF0aXN0aWNzVGltZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzKSB7XHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMgPSB7fTtcclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5sb3N0UGFja2V0c0FyciA9IFtdO1xyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLnNsb3RMZW5ndGggPSA4OyAvLzggc3RhdGlzdGljcy4gZXZlcnkgMiBzZWNvbmRzXHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMucHJldlBhY2tldHNMb3N0ID0gMDtcclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5hdmc4TG9zc2VzID0gMDtcclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5hdmdNb3JlVGhhblRocmVzaG9sZENvdW50ID0gMDsgIC8vSWYgYXZnOExvc3MgbW9yZSB0aGFuIHRocmVzaG9sZC5cclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy50aHJlc2hvbGQgPSA0MDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBsb3N0UGFja2V0c0FyciA9IHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMubG9zdFBhY2tldHNBcnIsXHJcbiAgICAgICAgICAgIHNsb3RMZW5ndGggPSBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLnNsb3RMZW5ndGgsIC8vOCBzdGF0aXN0aWNzLiBldmVyeSAyIHNlY29uZHNcclxuICAgICAgICAgICAgcHJldlBhY2tldHNMb3N0ID0gcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5wcmV2UGFja2V0c0xvc3QsXHJcbiAgICAgICAgICAgIGF2ZzhMb3NzZXMgPSBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLmF2ZzhMb3NzZXMsXHJcbiAgICAgICAgICAgIC8vIGF2Z01vcmVUaGFuVGhyZXNob2xkQ291bnQgPSBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLmF2Z01vcmVUaGFuVGhyZXNob2xkQ291bnQsICAvL0lmIGF2ZzhMb3NzIG1vcmUgdGhhbiB0aHJlc2hvbGQuXHJcbiAgICAgICAgICAgIHRocmVzaG9sZCA9IHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMudGhyZXNob2xkO1xyXG5cclxuICAgICAgICBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdGlzdGljc1RpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICghcGVlckNvbm5lY3Rpb25JbmZvLnBlZXJDb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5wZWVyQ29ubmVjdGlvbi5nZXRTdGF0cygpLnRoZW4oZnVuY3Rpb24gKHN0YXRzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFzdGF0cykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGxheWVyQ29uZmlnLmdldENvbmZpZygpLmF1dG9GYWxsYmFjayAmJiBzdGF0cykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzdGF0cy5mb3JFYWNoKGZ1bmN0aW9uIChzdGF0ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlLnR5cGUgPT09IFwiaW5ib3VuZC1ydHBcIiAmJiBzdGF0ZS5raW5kID09PSAndmlkZW8nICYmICFzdGF0ZS5pc1JlbW90ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vKHN0YXRlLnBhY2tldHNMb3N0IC0gcHJldlBhY2tldHNMb3N0KSBpcyByZWFsIGN1cnJlbnQgbG9zdC5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYWN0dWFsUGFja2V0TG9zdCA9IHBhcnNlSW50KHN0YXRlLnBhY2tldHNMb3N0KSAtIHBhcnNlSW50KHByZXZQYWNrZXRzTG9zdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9zdFBhY2tldHNBcnIucHVzaChwYXJzZUludChzdGF0ZS5wYWNrZXRzTG9zdCkgLSBwYXJzZUludChwcmV2UGFja2V0c0xvc3QpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9zdFBhY2tldHNBcnIubGVuZ3RoID4gc2xvdExlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb3N0UGFja2V0c0Fyci5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb3N0UGFja2V0c0Fyci5sZW5ndGggPT09IHNsb3RMZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXZnOExvc3NlcyA9IF8ucmVkdWNlKGxvc3RQYWNrZXRzQXJyLCBmdW5jdGlvbiAobWVtbywgbnVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtZW1vICsgbnVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDApIC8gc2xvdExlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXN0OCBMT1NUIFBBQ0tFVCBBVkcgIDogXCIgKyAoYXZnOExvc3NlcyksIFwiQ3VycmVudCBQYWNrZXQgTE9TVDogXCIgKyAgYWN0dWFsUGFja2V0TG9zdCwgXCJUb3RhbCBQYWNrZXQgTG9zdDogXCIgKyBzdGF0ZS5wYWNrZXRzTG9zdCwgbG9zdFBhY2tldHNBcnIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXZnOExvc3NlcyA+IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLmF2Z01vcmVUaGFuVGhyZXNob2xkQ291bnQgPSBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLmF2Z01vcmVUaGFuVGhyZXNob2xkQ291bnQgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5hdmdNb3JlVGhhblRocmVzaG9sZENvdW50ID49IDYwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJORVRXT1JLIFVOU1RBQkxFRCEhISBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9XRUJSVENfTkVUV09SS19TTE9XXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcih0ZW1wRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5hdmdNb3JlVGhhblRocmVzaG9sZENvdW50ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLnByZXZQYWNrZXRzTG9zdCA9IHN0YXRlLnBhY2tldHNMb3N0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGV4dHJhY3RMb3NzUGFja2V0c09uTmV0d29ya1N0YXR1cyhwZWVyQ29ubmVjdGlvbkluZm8pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSwgMjAwMCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZU1haW5QZWVyQ29ubmVjdGlvbihpZCwgcGVlcklkLCBzZHAsIGNhbmRpZGF0ZXMsIHJlc29sdmUpIHtcclxuXHJcbiAgICAgICAgbGV0IHBlZXJDb25uZWN0aW9uID0gbmV3IFJUQ1BlZXJDb25uZWN0aW9uKHBlZXJDb25uZWN0aW9uQ29uZmlnKTtcclxuICAgICAgICBtYWluUGVlckNvbm5lY3Rpb25JbmZvID0ge1xyXG4gICAgICAgICAgICBpZDogaWQsXHJcbiAgICAgICAgICAgIHBlZXJJZDogcGVlcklkLFxyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbjogcGVlckNvbm5lY3Rpb25cclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgLy9TZXQgcmVtb3RlIGRlc2NyaXB0aW9uIHdoZW4gSSByZWNlaXZlZCBzZHAgZnJvbSBzZXJ2ZXIuXHJcbiAgICAgICAgcGVlckNvbm5lY3Rpb24uc2V0UmVtb3RlRGVzY3JpcHRpb24obmV3IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbihzZHApKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24uY3JlYXRlQW5zd2VyKClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGVzYykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiY3JlYXRlIEhvc3QgQW5zd2VyIDogc3VjY2Vzc1wiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uLnNldExvY2FsRGVzY3JpcHRpb24oZGVzYykudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBteSBTRFAgY3JlYXRlZC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsb2NhbFNEUCA9IHBlZXJDb25uZWN0aW9uLmxvY2FsRGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coJ0xvY2FsIFNEUCcsIGxvY2FsU0RQKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZW5kTWVzc2FnZSh3cywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZWVyX2lkOiBwZWVySWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZDogJ2Fuc3dlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2RwOiBsb2NhbFNEUFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9XRUJSVENfU0VUX0xPQ0FMX0RFU0NfRVJST1JdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbUExBWUVSX1dFQlJUQ19DUkVBVEVfQU5TV0VSX0VSUk9SXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcih0ZW1wRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SXTtcclxuICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoY2FuZGlkYXRlcykge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIltNZXNzYWdlIGNhbmRpZGF0ZXNdXCIsIGNhbmRpZGF0ZXMpO1xyXG4gICAgICAgICAgICBhZGRJY2VDYW5kaWRhdGUocGVlckNvbm5lY3Rpb24sIGNhbmRpZGF0ZXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcGVlckNvbm5lY3Rpb24ub25pY2VjYW5kaWRhdGUgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAoZS5jYW5kaWRhdGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJXZWJSVENMb2FkZXIgc2VuZCBjYW5kaWRhdGUgdG8gc2VydmVyIDogXCIgKyBlLmNhbmRpZGF0ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ01haW4gUGVlciBDb25uZWN0aW9uIGNhbmRpZGF0ZScsIGUuY2FuZGlkYXRlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZW5kTWVzc2FnZSh3cywge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBpZCxcclxuICAgICAgICAgICAgICAgICAgICBwZWVyX2lkOiBwZWVySWQsXHJcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZDogXCJjYW5kaWRhdGVcIixcclxuICAgICAgICAgICAgICAgICAgICBjYW5kaWRhdGVzOiBbZS5jYW5kaWRhdGVdXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcGVlckNvbm5lY3Rpb24ub25jb25uZWN0aW9uc3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAvL2ljZUNvbm5lY3Rpb25TdGF0ZVxyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJbb24gY29ubmVjdGlvbiBzdGF0ZSBjaGFuZ2VdXCIsIHBlZXJDb25uZWN0aW9uLmNvbm5lY3Rpb25TdGF0ZSAsZSk7XHJcblxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcGVlckNvbm5lY3Rpb24ub25pY2Vjb25uZWN0aW9uc3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJbb24gaWNlIGNvbm5lY3Rpb24gc3RhdGUgY2hhbmdlXVwiLCBwZWVyQ29ubmVjdGlvbi5pY2VDb25uZWN0aW9uU3RhdGUgLGUpO1xyXG5cclxuICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvUlRDUGVlckNvbm5lY3Rpb24vaWNlQ29ubmVjdGlvblN0YXRlXHJcbiAgICAgICAgICAgICogQ2hlY2tzIHRvIGVuc3VyZSB0aGF0IGNvbXBvbmVudHMgYXJlIHN0aWxsIGNvbm5lY3RlZCBmYWlsZWQgZm9yIGF0IGxlYXN0IG9uZSBjb21wb25lbnQgb2YgdGhlIFJUQ1BlZXJDb25uZWN0aW9uLiBUaGlzIGlzIGEgbGVzcyBzdHJpbmdlbnQgdGVzdCB0aGFuIFwiZmFpbGVkXCIgYW5kIG1heSB0cmlnZ2VyIGludGVybWl0dGVudGx5IGFuZCByZXNvbHZlIGp1c3QgYXMgc3BvbnRhbmVvdXNseSBvbiBsZXNzIHJlbGlhYmxlIG5ldHdvcmtzLCBvciBkdXJpbmcgdGVtcG9yYXJ5IGRpc2Nvbm5lY3Rpb25zLiBXaGVuIHRoZSBwcm9ibGVtIHJlc29sdmVzLCB0aGUgY29ubmVjdGlvbiBtYXkgcmV0dXJuIHRvIHRoZSBcImNvbm5lY3RlZFwiIHN0YXRlLlxyXG4gICAgICAgICAgICAqICovXHJcbiAgICAgICAgICAgIC8vVGhpcyBwcm9jZXNzIGlzIG15IGltYWdpbmF0aW9uLiBJIGRvIG5vdCBrbm93IGhvdyB0byByZXByb2R1Y2UuXHJcbiAgICAgICAgICAgIC8vU2l0dWF0aW9uIDogT01FIGlzIGRlYWQgYnV0IG9tZSBjYW4ndCBzZW5kICdzdG9wJyBtZXNzYWdlLlxyXG4gICAgICAgICAgICBpZiAocGVlckNvbm5lY3Rpb24uaWNlQ29ubmVjdGlvblN0YXRlID09PSAnZGlzY29ubmVjdGVkJyB8fCBwZWVyQ29ubmVjdGlvbi5pY2VDb25uZWN0aW9uU3RhdGUgPT09ICdjbG9zZWQnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXdzQ2xvc2VkQnlQbGF5ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWFpblBlZXJDb25uZWN0aW9uSW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9XRUJSVENfVU5FWFBFQ1RFRF9ESVNDT05ORUNUXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBwZWVyQ29ubmVjdGlvbi5vbnRyYWNrID0gZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcInN0cmVhbSByZWNlaXZlZC5cIik7XHJcblxyXG4gICAgICAgICAgICBleHRyYWN0TG9zc1BhY2tldHNPbk5ldHdvcmtTdGF0dXMobWFpblBlZXJDb25uZWN0aW9uSW5mbyk7XHJcbiAgICAgICAgICAgIG1haW5TdHJlYW0gPSBlLnN0cmVhbXNbMF07XHJcbiAgICAgICAgICAgIGxvYWRDYWxsYmFjayhlLnN0cmVhbXNbMF0pO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlQ2xpZW50UGVlckNvbm5lY3Rpb24oaG9zdElkLCBjbGllbnRJZCkge1xyXG5cclxuICAgICAgICBpZiAoIW1haW5TdHJlYW0pIHtcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGNyZWF0ZUNsaWVudFBlZXJDb25uZWN0aW9uKGhvc3RJZCwgY2xpZW50SWQpO1xyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBlZXJDb25uZWN0aW9uID0gbmV3IFJUQ1BlZXJDb25uZWN0aW9uKHBlZXJDb25uZWN0aW9uQ29uZmlnKTtcclxuXHJcbiAgICAgICAgY2xpZW50UGVlckNvbm5lY3Rpb25zW2NsaWVudElkXSA9IHtcclxuICAgICAgICAgICAgaWQ6IGNsaWVudElkLFxyXG4gICAgICAgICAgICBwZWVySWQ6IGhvc3RJZCxcclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb246IHBlZXJDb25uZWN0aW9uXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcGVlckNvbm5lY3Rpb24uYWRkU3RyZWFtKG1haW5TdHJlYW0pO1xyXG5cclxuICAgICAgICAvLyBsZXQgb2ZmZXJPcHRpb24gPSB7XHJcbiAgICAgICAgLy8gICAgIG9mZmVyVG9SZWNlaXZlQXVkaW86IDEsXHJcbiAgICAgICAgLy8gICAgIG9mZmVyVG9SZWNlaXZlVmlkZW86IDFcclxuICAgICAgICAvLyB9O1xyXG5cclxuICAgICAgICBwZWVyQ29ubmVjdGlvbi5jcmVhdGVPZmZlcihzZXRMb2NhbEFuZFNlbmRNZXNzYWdlLCBoYW5kbGVDcmVhdGVPZmZlckVycm9yLCB7fSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldExvY2FsQW5kU2VuZE1lc3NhZ2Uoc2Vzc2lvbkRlc2NyaXB0aW9uKSB7XHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uLnNldExvY2FsRGVzY3JpcHRpb24oc2Vzc2lvbkRlc2NyaXB0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIHNlbmRNZXNzYWdlKHdzLCB7XHJcbiAgICAgICAgICAgICAgICBpZDogaG9zdElkLFxyXG4gICAgICAgICAgICAgICAgcGVlcl9pZDogY2xpZW50SWQsXHJcbiAgICAgICAgICAgICAgICBzZHA6IHNlc3Npb25EZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgICAgIGNvbW1hbmQ6ICdvZmZlcl9wMnAnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlQ3JlYXRlT2ZmZXJFcnJvcihldmVudCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHBlZXJDb25uZWN0aW9uLm9uaWNlY2FuZGlkYXRlID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUuY2FuZGlkYXRlKSB7XHJcbiAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJXZWJSVENMb2FkZXIgc2VuZCBjYW5kaWRhdGUgdG8gc2VydmVyIDogXCIgKyBlLmNhbmRpZGF0ZSk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdDbGllbnQgUGVlciBDb25uZWN0aW9uIGNhbmRpZGF0ZScsIGUuY2FuZGlkYXRlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZW5kTWVzc2FnZSh3cywge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBob3N0SWQsXHJcbiAgICAgICAgICAgICAgICAgICAgcGVlcl9pZDogY2xpZW50SWQsXHJcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZDogXCJjYW5kaWRhdGVfcDJwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FuZGlkYXRlczogW2UuY2FuZGlkYXRlXVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgY29weUNhbmRpZGF0ZSA9IGZ1bmN0aW9uKGJhc2ljQ2FuZGlkYXRlKXtcclxuXHJcbiAgICAgICAgbGV0IGNsb25lQ2FuZGlkYXRlID0gXy5jbG9uZShiYXNpY0NhbmRpZGF0ZSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdlbmVyYXRlRG9tYWluRnJvbVVybCh1cmwpIHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9ICcnO1xyXG4gICAgICAgICAgICBsZXQgbWF0Y2g7XHJcbiAgICAgICAgICAgIGlmIChtYXRjaCA9IHVybC5tYXRjaCgvXig/Ondzcz86XFwvXFwvKT8oPzpbXkBcXG5dK0ApPyg/Ond3d1xcLik/KFteOlxcL1xcblxcP1xcPV0rKS9pbSkpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG1hdGNoWzFdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBmaW5kSXAgKGNhbmRpZGF0ZSl7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gJyc7XHJcbiAgICAgICAgICAgIGxldCBtYXRjaDtcclxuXHJcbiAgICAgICAgICAgIGlmKG1hdGNoID0gY2FuZGlkYXRlLm1hdGNoKG5ldyBSZWdFeHAoXCJcXFxcYigyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT8pXFxcXC4oMjVbMC01XXwyWzAtNF1bMC05XXxbMDFdP1swLTldWzAtOV0/KVxcXFwuKDI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPylcXFxcLigyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT8pXFxcXGJcIiwgJ2dpJykpKXtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG1hdGNoWzBdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG5ld0RvbWFpbiA9IGdlbmVyYXRlRG9tYWluRnJvbVVybCh3ZWJTb2NrZXRVcmwpO1xyXG4gICAgICAgIGxldCBpcCA9IGZpbmRJcChjbG9uZUNhbmRpZGF0ZS5jYW5kaWRhdGUpO1xyXG5cclxuICAgICAgICBpZihpcCA9PT0gJycgfHwgaXAgPT09IG5ld0RvbWFpbil7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgICAgICAvLyBmaXJlZm94IGJyb3dzZXIgdGhyb3dzIGEgY2FuZGlkYXRlIHBhcnNpbmcgZXhjZXB0aW9uIHdoZW4gYSBkb21haW4gbmFtZSBpcyBzZXQgYXQgdGhlIGFkZHJlc3MgcHJvcGVydHkuIFNvIHdlIHJlc29sdmUgdGhlIGRucyB1c2luZyBnb29nbGUgZG5zIHJlc29sdmUgYXBpLlxyXG4gICAgICAgICAgICBpZiAoY3VycmVudEJyb3dzZXIuYnJvd3NlciA9PT0gJ0ZpcmVmb3gnICYmICFmaW5kSXAobmV3RG9tYWluKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGZldGNoKCdodHRwczovL2Rucy5nb29nbGUuY29tL3Jlc29sdmU/bmFtZT0nICsgbmV3RG9tYWluKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlc3AgPT4gcmVzcC5qc29uKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLkFuc3dlciAmJiBkYXRhLkFuc3dlci5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuQW5zd2VyWzBdLmRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlbHNvbHZlZElwID0gZGF0YS5BbnN3ZXJbMF0uZGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmVDYW5kaWRhdGUuY2FuZGlkYXRlID0gY2xvbmVDYW5kaWRhdGUuY2FuZGlkYXRlLnJlcGxhY2UoaXAsIHJlbHNvbHZlZElwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGNsb25lQ2FuZGlkYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIGNsb25lQ2FuZGlkYXRlLmNhbmRpZGF0ZSA9IGNsb25lQ2FuZGlkYXRlLmNhbmRpZGF0ZS5yZXBsYWNlKGlwLCBuZXdEb21haW4pO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShjbG9uZUNhbmRpZGF0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGFkZEljZUNhbmRpZGF0ZShwZWVyQ29ubmVjdGlvbiwgY2FuZGlkYXRlcykge1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhbmRpZGF0ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGNhbmRpZGF0ZXNbaV0gJiYgY2FuZGlkYXRlc1tpXS5jYW5kaWRhdGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgYmFzaWNDYW5kaWRhdGUgPSBjYW5kaWRhdGVzW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBjbG9uZUNhbmRpZGF0ZVByb21pc2UgPSBjb3B5Q2FuZGlkYXRlKGJhc2ljQ2FuZGlkYXRlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbi5hZGRJY2VDYW5kaWRhdGUobmV3IFJUQ0ljZUNhbmRpZGF0ZShiYXNpY0NhbmRpZGF0ZSkpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcImFkZEljZUNhbmRpZGF0ZSA6IHN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUl07XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihjbG9uZUNhbmRpZGF0ZVByb21pc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIGNsb25lQ2FuZGlkYXRlUHJvbWlzZS50aGVuKGZ1bmN0aW9uIChjbG9uZUNhbmRpZGF0ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsb25lQ2FuZGlkYXRlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24uYWRkSWNlQ2FuZGlkYXRlKG5ldyBSVENJY2VDYW5kaWRhdGUoY2xvbmVDYW5kaWRhdGUpKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcImNsb25lZCBhZGRJY2VDYW5kaWRhdGUgOiBzdWNjZXNzXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRXZWJTb2NrZXQocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcblxyXG4gICAgICAgICAgICB3cyA9IG5ldyBXZWJTb2NrZXQod2ViU29ja2V0VXJsKTtcclxuXHJcbiAgICAgICAgICAgIHdzLm9ub3BlbiA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBzZW5kTWVzc2FnZSh3cywge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmQ6IFwicmVxdWVzdF9vZmZlclwiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB3c1BpbmcgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHNlbmRNZXNzYWdlKHdzLCB7Y29tbWFuZDogXCJwaW5nXCJ9KTtcclxuICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICAvLyB9LCAyMCAqIDEwMDApO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgd3Mub25tZXNzYWdlID0gZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gSlNPTi5wYXJzZShlLmRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfV0VCUlRDX1dTX0VSUk9SXTtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBtZXNzYWdlLmVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcih0ZW1wRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMobWVzc2FnZSkubGVuZ3RoID09PSAwICYmIG1lc3NhZ2UuY29uc3RydWN0b3IgPT09IE9iamVjdCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coJ0VtcHR5IE1lc3NhZ2UnKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UuY29tbWFuZCA9PT0gJ3BpbmcnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNlbmRNZXNzYWdlKHdzLCB7Y29tbWFuZDogJ3BvbmcnfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghbWVzc2FnZS5pZCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coJ0lEIG11c3QgYmUgbm90IG51bGwnKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UuY29tbWFuZCA9PT0gJ29mZmVyJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVNYWluUGVlckNvbm5lY3Rpb24obWVzc2FnZS5pZCwgbWVzc2FnZS5wZWVyX2lkLCBtZXNzYWdlLnNkcCwgbWVzc2FnZS5jYW5kaWRhdGVzLCByZXNvbHZlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihtZXNzYWdlLnBlZXJfaWQgPT09IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlci50cmlnZ2VyKE9NRV9QMlBfTU9ERSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlci50cmlnZ2VyKE9NRV9QMlBfTU9ERSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLmNvbW1hbmQgPT09ICdyZXF1ZXN0X29mZmVyX3AycCcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlQ2xpZW50UGVlckNvbm5lY3Rpb24obWVzc2FnZS5pZCwgbWVzc2FnZS5wZWVyX2lkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5jb21tYW5kID09PSAnYW5zd2VyX3AycCcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBlZXJDb25uZWN0aW9uMSA9IGdldFBlZXJDb25uZWN0aW9uQnlJZChtZXNzYWdlLnBlZXJfaWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbjEuc2V0UmVtb3RlRGVzY3JpcHRpb24obmV3IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbihtZXNzYWdlLnNkcCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkZXNjKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLmNvbW1hbmQgPT09ICdjYW5kaWRhdGUnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIENhbmRpZGF0ZXMgZm9yIG5ldyBjbGllbnQgcGVlclxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwZWVyQ29ubmVjdGlvbjIgPSBnZXRQZWVyQ29ubmVjdGlvbkJ5SWQobWVzc2FnZS5pZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGFkZEljZUNhbmRpZGF0ZShwZWVyQ29ubmVjdGlvbjIsIG1lc3NhZ2UuY2FuZGlkYXRlcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UuY29tbWFuZCA9PT0gJ2NhbmRpZGF0ZV9wMnAnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIENhbmRpZGF0ZXMgZm9yIG5ldyBjbGllbnQgcGVlclxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwZWVyQ29ubmVjdGlvbjMgPSBnZXRQZWVyQ29ubmVjdGlvbkJ5SWQobWVzc2FnZS5wZWVyX2lkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYWRkSWNlQ2FuZGlkYXRlKHBlZXJDb25uZWN0aW9uMywgbWVzc2FnZS5jYW5kaWRhdGVzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5jb21tYW5kID09PSAnc3RvcCcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1haW5QZWVyQ29ubmVjdGlvbkluZm8ucGVlcklkID09PSBtZXNzYWdlLnBlZXJfaWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vTXkgcGFyZW50IHdhcyBkZWFkLiBBbmQgdGhlbiBJIHdpbGwgcmV0cnkuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjbG9zZSBjb25uZWN0aW9uIHdpdGggaG9zdCBhbmQgcmV0cnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2Nsb3NlIGNvbm5lY3Rpb24gd2l0aCBob3N0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluU3RyZWFtID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFpblBlZXJDb25uZWN0aW9uSW5mby5wZWVyQ29ubmVjdGlvbi5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluUGVlckNvbm5lY3Rpb25JbmZvID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVzZXRDYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlci5wYXVzZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VuZE1lc3NhZ2Uod3MsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmQ6ICdyZXF1ZXN0X29mZmVyJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNsb3NlIGNvbm5lY3Rpb24gd2l0aCBjbGllbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsaWVudFBlZXJDb25uZWN0aW9uc1ttZXNzYWdlLnBlZXJfaWRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnY2xvc2UgY29ubmVjdGlvbiB3aXRoIGNsaWVudDogJywgbWVzc2FnZS5wZWVyX2lkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudFBlZXJDb25uZWN0aW9uc1ttZXNzYWdlLnBlZXJfaWRdLnBlZXJDb25uZWN0aW9uLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgY2xpZW50UGVlckNvbm5lY3Rpb25zW21lc3NhZ2UucGVlcl9pZF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHdzLm9uY2xvc2UgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoIXdzQ2xvc2VkQnlQbGF5ZXIpe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9XRUJSVENfV1NfRVJST1JdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAobWFpblBlZXJDb25uZWN0aW9uSW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbUExBWUVSX1dFQlJUQ19VTkVYUEVDVEVEX0RJU0NPTk5FQ1RdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB3cy5vbmVycm9yID0gZnVuY3Rpb24gKGVycm9yKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9XaHkgRWRnZSBCcm93c2VyIGNhbGxzIG9uZXJyb3IoKSB3aGVuIHdzLmNsb3NlKCk/XHJcbiAgICAgICAgICAgICAgICBpZighd3NDbG9zZWRCeVBsYXllcil7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfV0VCUlRDX1dTX0VSUk9SXTtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG5cclxuICAgICAgICAgICAgY2xvc2VQZWVyKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiV2ViUlRDTG9hZGVyIGNvbm5lY3RpbmcuLi5cIik7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJXZWJSVENMb2FkZXIgdXJsIDogXCIgKyB3ZWJTb2NrZXRVcmwpO1xyXG5cclxuICAgICAgICAgICAgaW5pdFdlYlNvY2tldChyZXNvbHZlLCByZWplY3QpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlUGVlcihlcnJvcikge1xyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coJ1dlYlJUQyBMb2FkZXIgY2xvc2VQZWVyKCknKTtcclxuXHJcbiAgICAgICAgaWYgKCFlcnJvcikge1xyXG4gICAgICAgICAgICB3c0Nsb3NlZEJ5UGxheWVyID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChtYWluUGVlckNvbm5lY3Rpb25JbmZvKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAobWFpblBlZXJDb25uZWN0aW9uSW5mby5zdGF0aXN0aWNzVGltZXIpIHtcclxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChtYWluUGVlckNvbm5lY3Rpb25JbmZvLnN0YXRpc3RpY3NUaW1lcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG1haW5TdHJlYW0gPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKCdDbG9zaW5nIG1haW4gcGVlciBjb25uZWN0aW9uLi4uJyk7XHJcbiAgICAgICAgICAgIGlmIChzdGF0aXN0aWNzVGltZXIpIHtcclxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChzdGF0aXN0aWNzVGltZXIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobWFpblBlZXJDb25uZWN0aW9uSW5mby5wZWVyQ29ubmVjdGlvbikge1xyXG5cclxuICAgICAgICAgICAgICAgIG1haW5QZWVyQ29ubmVjdGlvbkluZm8ucGVlckNvbm5lY3Rpb24uY2xvc2UoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbWFpblBlZXJDb25uZWN0aW9uSW5mby5wZWVyQ29ubmVjdGlvbiA9IG51bGw7XHJcbiAgICAgICAgICAgIG1haW5QZWVyQ29ubmVjdGlvbkluZm8gPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGNsaWVudFBlZXJDb25uZWN0aW9ucykubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgY2xpZW50SWQgaW4gY2xpZW50UGVlckNvbm5lY3Rpb25zKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGNsaWVudFBlZXJDb25uZWN0aW9uID0gY2xpZW50UGVlckNvbm5lY3Rpb25zW2NsaWVudElkXS5wZWVyQ29ubmVjdGlvbjtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2xpZW50UGVlckNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coJ0Nsb3NpbmcgY2xpZW50IHBlZXIgY29ubmVjdGlvbi4uLicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsaWVudFBlZXJDb25uZWN0aW9uLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xpZW50UGVlckNvbm5lY3Rpb24gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjbGllbnRQZWVyQ29ubmVjdGlvbnMgPSB7fTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwod3NQaW5nKTtcclxuICAgICAgICB3c1BpbmcgPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAod3MpIHtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKCdDbG9zaW5nIHdlYnNvY2tldCBjb25uZWN0aW9uLi4uJyk7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlNlbmQgU2lnbmFsaW5nIDogU3RvcC5cIik7XHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgIDAgKENPTk5FQ1RJTkcpXHJcbiAgICAgICAgICAgIDEgKE9QRU4pXHJcbiAgICAgICAgICAgIDIgKENMT1NJTkcpXHJcbiAgICAgICAgICAgIDMgKENMT1NFRClcclxuICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgaWYgKHdzLnJlYWR5U3RhdGUgPT09IDAgfHwgd3MucmVhZHlTdGF0ZSA9PT0gMSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHdzQ2xvc2VkQnlQbGF5ZXIgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtYWluUGVlckNvbm5lY3Rpb25JbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VuZE1lc3NhZ2Uod3MsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZDogJ3N0b3AnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogbWFpblBlZXJDb25uZWN0aW9uSW5mby5pZFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHdzLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHdzQ2xvc2VkQnlQbGF5ZXIgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHdzID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGVycm9yVHJpZ2dlcihlcnJvciwgcHJvdmlkZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZW5kTWVzc2FnZSh3cywgbWVzc2FnZSkge1xyXG5cclxuICAgICAgICBpZiAod3MpIHtcclxuICAgICAgICAgICAgd3Muc2VuZChKU09OLnN0cmluZ2lmeShtZXNzYWdlKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICB0aGF0LmNvbm5lY3QgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGluaXRpYWxpemUoKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT4ge1xyXG4gICAgICAgIGNsb3NlUGVlcigpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFdlYlJUQ0xvYWRlcjtcclxuIiwiKGZ1bmN0aW9uKGYpe2lmKHR5cGVvZiBleHBvcnRzPT09XCJvYmplY3RcIiYmdHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCIpe21vZHVsZS5leHBvcnRzPWYoKX1lbHNlIGlmKHR5cGVvZiBkZWZpbmU9PT1cImZ1bmN0aW9uXCImJmRlZmluZS5hbWQpe2RlZmluZShbXSxmKX1lbHNle3ZhciBnO2lmKHR5cGVvZiB3aW5kb3chPT1cInVuZGVmaW5lZFwiKXtnPXdpbmRvd31lbHNlIGlmKHR5cGVvZiBnbG9iYWwhPT1cInVuZGVmaW5lZFwiKXtnPWdsb2JhbH1lbHNlIGlmKHR5cGVvZiBzZWxmIT09XCJ1bmRlZmluZWRcIil7Zz1zZWxmfWVsc2V7Zz10aGlzfWcuYWRhcHRlciA9IGYoKX19KShmdW5jdGlvbigpe3ZhciBkZWZpbmUsbW9kdWxlLGV4cG9ydHM7cmV0dXJuIChmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuLypcclxuICogIENvcHlyaWdodCAoYykgMjAxNyBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcclxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxyXG4gKiAgdHJlZS5cclxuICovXHJcbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIFNEUFV0aWxzID0gcmVxdWlyZSgnc2RwJyk7XHJcblxyXG5mdW5jdGlvbiB3cml0ZU1lZGlhU2VjdGlvbih0cmFuc2NlaXZlciwgY2FwcywgdHlwZSwgc3RyZWFtLCBkdGxzUm9sZSkge1xyXG4gIHZhciBzZHAgPSBTRFBVdGlscy53cml0ZVJ0cERlc2NyaXB0aW9uKHRyYW5zY2VpdmVyLmtpbmQsIGNhcHMpO1xyXG5cclxuICAvLyBNYXAgSUNFIHBhcmFtZXRlcnMgKHVmcmFnLCBwd2QpIHRvIFNEUC5cclxuICBzZHAgKz0gU0RQVXRpbHMud3JpdGVJY2VQYXJhbWV0ZXJzKFxyXG4gICAgICB0cmFuc2NlaXZlci5pY2VHYXRoZXJlci5nZXRMb2NhbFBhcmFtZXRlcnMoKSk7XHJcblxyXG4gIC8vIE1hcCBEVExTIHBhcmFtZXRlcnMgdG8gU0RQLlxyXG4gIHNkcCArPSBTRFBVdGlscy53cml0ZUR0bHNQYXJhbWV0ZXJzKFxyXG4gICAgICB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0LmdldExvY2FsUGFyYW1ldGVycygpLFxyXG4gICAgICB0eXBlID09PSAnb2ZmZXInID8gJ2FjdHBhc3MnIDogZHRsc1JvbGUgfHwgJ2FjdGl2ZScpO1xyXG5cclxuICBzZHAgKz0gJ2E9bWlkOicgKyB0cmFuc2NlaXZlci5taWQgKyAnXFxyXFxuJztcclxuXHJcbiAgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlciAmJiB0cmFuc2NlaXZlci5ydHBSZWNlaXZlcikge1xyXG4gICAgc2RwICs9ICdhPXNlbmRyZWN2XFxyXFxuJztcclxuICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlcikge1xyXG4gICAgc2RwICs9ICdhPXNlbmRvbmx5XFxyXFxuJztcclxuICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyKSB7XHJcbiAgICBzZHAgKz0gJ2E9cmVjdm9ubHlcXHJcXG4nO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBzZHAgKz0gJ2E9aW5hY3RpdmVcXHJcXG4nO1xyXG4gIH1cclxuXHJcbiAgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlcikge1xyXG4gICAgdmFyIHRyYWNrSWQgPSB0cmFuc2NlaXZlci5ydHBTZW5kZXIuX2luaXRpYWxUcmFja0lkIHx8XHJcbiAgICAgICAgdHJhbnNjZWl2ZXIucnRwU2VuZGVyLnRyYWNrLmlkO1xyXG4gICAgdHJhbnNjZWl2ZXIucnRwU2VuZGVyLl9pbml0aWFsVHJhY2tJZCA9IHRyYWNrSWQ7XHJcbiAgICAvLyBzcGVjLlxyXG4gICAgdmFyIG1zaWQgPSAnbXNpZDonICsgKHN0cmVhbSA/IHN0cmVhbS5pZCA6ICctJykgKyAnICcgK1xyXG4gICAgICAgIHRyYWNrSWQgKyAnXFxyXFxuJztcclxuICAgIHNkcCArPSAnYT0nICsgbXNpZDtcclxuICAgIC8vIGZvciBDaHJvbWUuIExlZ2FjeSBzaG91bGQgbm8gbG9uZ2VyIGJlIHJlcXVpcmVkLlxyXG4gICAgc2RwICs9ICdhPXNzcmM6JyArIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYyArXHJcbiAgICAgICAgJyAnICsgbXNpZDtcclxuXHJcbiAgICAvLyBSVFhcclxuICAgIGlmICh0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCkge1xyXG4gICAgICBzZHAgKz0gJ2E9c3NyYzonICsgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHguc3NyYyArXHJcbiAgICAgICAgICAnICcgKyBtc2lkO1xyXG4gICAgICBzZHAgKz0gJ2E9c3NyYy1ncm91cDpGSUQgJyArXHJcbiAgICAgICAgICB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmMgKyAnICcgK1xyXG4gICAgICAgICAgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHguc3NyYyArXHJcbiAgICAgICAgICAnXFxyXFxuJztcclxuICAgIH1cclxuICB9XHJcbiAgLy8gRklYTUU6IHRoaXMgc2hvdWxkIGJlIHdyaXR0ZW4gYnkgd3JpdGVSdHBEZXNjcmlwdGlvbi5cclxuICBzZHAgKz0gJ2E9c3NyYzonICsgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjICtcclxuICAgICAgJyBjbmFtZTonICsgU0RQVXRpbHMubG9jYWxDTmFtZSArICdcXHJcXG4nO1xyXG4gIGlmICh0cmFuc2NlaXZlci5ydHBTZW5kZXIgJiYgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHgpIHtcclxuICAgIHNkcCArPSAnYT1zc3JjOicgKyB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eC5zc3JjICtcclxuICAgICAgICAnIGNuYW1lOicgKyBTRFBVdGlscy5sb2NhbENOYW1lICsgJ1xcclxcbic7XHJcbiAgfVxyXG4gIHJldHVybiBzZHA7XHJcbn1cclxuXHJcbi8vIEVkZ2UgZG9lcyBub3QgbGlrZVxyXG4vLyAxKSBzdHVuOiBmaWx0ZXJlZCBhZnRlciAxNDM5MyB1bmxlc3MgP3RyYW5zcG9ydD11ZHAgaXMgcHJlc2VudFxyXG4vLyAyKSB0dXJuOiB0aGF0IGRvZXMgbm90IGhhdmUgYWxsIG9mIHR1cm46aG9zdDpwb3J0P3RyYW5zcG9ydD11ZHBcclxuLy8gMykgdHVybjogd2l0aCBpcHY2IGFkZHJlc3Nlc1xyXG4vLyA0KSB0dXJuOiBvY2N1cnJpbmcgbXVsaXBsZSB0aW1lc1xyXG5mdW5jdGlvbiBmaWx0ZXJJY2VTZXJ2ZXJzKGljZVNlcnZlcnMsIGVkZ2VWZXJzaW9uKSB7XHJcbiAgdmFyIGhhc1R1cm4gPSBmYWxzZTtcclxuICBpY2VTZXJ2ZXJzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShpY2VTZXJ2ZXJzKSk7XHJcbiAgcmV0dXJuIGljZVNlcnZlcnMuZmlsdGVyKGZ1bmN0aW9uKHNlcnZlcikge1xyXG4gICAgaWYgKHNlcnZlciAmJiAoc2VydmVyLnVybHMgfHwgc2VydmVyLnVybCkpIHtcclxuICAgICAgdmFyIHVybHMgPSBzZXJ2ZXIudXJscyB8fCBzZXJ2ZXIudXJsO1xyXG4gICAgICBpZiAoc2VydmVyLnVybCAmJiAhc2VydmVyLnVybHMpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oJ1JUQ0ljZVNlcnZlci51cmwgaXMgZGVwcmVjYXRlZCEgVXNlIHVybHMgaW5zdGVhZC4nKTtcclxuICAgICAgfVxyXG4gICAgICB2YXIgaXNTdHJpbmcgPSB0eXBlb2YgdXJscyA9PT0gJ3N0cmluZyc7XHJcbiAgICAgIGlmIChpc1N0cmluZykge1xyXG4gICAgICAgIHVybHMgPSBbdXJsc107XHJcbiAgICAgIH1cclxuICAgICAgdXJscyA9IHVybHMuZmlsdGVyKGZ1bmN0aW9uKHVybCkge1xyXG4gICAgICAgIHZhciB2YWxpZFR1cm4gPSB1cmwuaW5kZXhPZigndHVybjonKSA9PT0gMCAmJlxyXG4gICAgICAgICAgICB1cmwuaW5kZXhPZigndHJhbnNwb3J0PXVkcCcpICE9PSAtMSAmJlxyXG4gICAgICAgICAgICB1cmwuaW5kZXhPZigndHVybjpbJykgPT09IC0xICYmXHJcbiAgICAgICAgICAgICFoYXNUdXJuO1xyXG5cclxuICAgICAgICBpZiAodmFsaWRUdXJuKSB7XHJcbiAgICAgICAgICBoYXNUdXJuID0gdHJ1ZTtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdXJsLmluZGV4T2YoJ3N0dW46JykgPT09IDAgJiYgZWRnZVZlcnNpb24gPj0gMTQzOTMgJiZcclxuICAgICAgICAgICAgdXJsLmluZGV4T2YoJz90cmFuc3BvcnQ9dWRwJykgPT09IC0xO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGRlbGV0ZSBzZXJ2ZXIudXJsO1xyXG4gICAgICBzZXJ2ZXIudXJscyA9IGlzU3RyaW5nID8gdXJsc1swXSA6IHVybHM7XHJcbiAgICAgIHJldHVybiAhIXVybHMubGVuZ3RoO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG4vLyBEZXRlcm1pbmVzIHRoZSBpbnRlcnNlY3Rpb24gb2YgbG9jYWwgYW5kIHJlbW90ZSBjYXBhYmlsaXRpZXMuXHJcbmZ1bmN0aW9uIGdldENvbW1vbkNhcGFiaWxpdGllcyhsb2NhbENhcGFiaWxpdGllcywgcmVtb3RlQ2FwYWJpbGl0aWVzKSB7XHJcbiAgdmFyIGNvbW1vbkNhcGFiaWxpdGllcyA9IHtcclxuICAgIGNvZGVjczogW10sXHJcbiAgICBoZWFkZXJFeHRlbnNpb25zOiBbXSxcclxuICAgIGZlY01lY2hhbmlzbXM6IFtdXHJcbiAgfTtcclxuXHJcbiAgdmFyIGZpbmRDb2RlY0J5UGF5bG9hZFR5cGUgPSBmdW5jdGlvbihwdCwgY29kZWNzKSB7XHJcbiAgICBwdCA9IHBhcnNlSW50KHB0LCAxMCk7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvZGVjcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAoY29kZWNzW2ldLnBheWxvYWRUeXBlID09PSBwdCB8fFxyXG4gICAgICAgICAgY29kZWNzW2ldLnByZWZlcnJlZFBheWxvYWRUeXBlID09PSBwdCkge1xyXG4gICAgICAgIHJldHVybiBjb2RlY3NbaV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICB2YXIgcnR4Q2FwYWJpbGl0eU1hdGNoZXMgPSBmdW5jdGlvbihsUnR4LCByUnR4LCBsQ29kZWNzLCByQ29kZWNzKSB7XHJcbiAgICB2YXIgbENvZGVjID0gZmluZENvZGVjQnlQYXlsb2FkVHlwZShsUnR4LnBhcmFtZXRlcnMuYXB0LCBsQ29kZWNzKTtcclxuICAgIHZhciByQ29kZWMgPSBmaW5kQ29kZWNCeVBheWxvYWRUeXBlKHJSdHgucGFyYW1ldGVycy5hcHQsIHJDb2RlY3MpO1xyXG4gICAgcmV0dXJuIGxDb2RlYyAmJiByQ29kZWMgJiZcclxuICAgICAgICBsQ29kZWMubmFtZS50b0xvd2VyQ2FzZSgpID09PSByQ29kZWMubmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gIH07XHJcblxyXG4gIGxvY2FsQ2FwYWJpbGl0aWVzLmNvZGVjcy5mb3JFYWNoKGZ1bmN0aW9uKGxDb2RlYykge1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZW1vdGVDYXBhYmlsaXRpZXMuY29kZWNzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHZhciByQ29kZWMgPSByZW1vdGVDYXBhYmlsaXRpZXMuY29kZWNzW2ldO1xyXG4gICAgICBpZiAobENvZGVjLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gckNvZGVjLm5hbWUudG9Mb3dlckNhc2UoKSAmJlxyXG4gICAgICAgICAgbENvZGVjLmNsb2NrUmF0ZSA9PT0gckNvZGVjLmNsb2NrUmF0ZSkge1xyXG4gICAgICAgIGlmIChsQ29kZWMubmFtZS50b0xvd2VyQ2FzZSgpID09PSAncnR4JyAmJlxyXG4gICAgICAgICAgICBsQ29kZWMucGFyYW1ldGVycyAmJiByQ29kZWMucGFyYW1ldGVycy5hcHQpIHtcclxuICAgICAgICAgIC8vIGZvciBSVFggd2UgbmVlZCB0byBmaW5kIHRoZSBsb2NhbCBydHggdGhhdCBoYXMgYSBhcHRcclxuICAgICAgICAgIC8vIHdoaWNoIHBvaW50cyB0byB0aGUgc2FtZSBsb2NhbCBjb2RlYyBhcyB0aGUgcmVtb3RlIG9uZS5cclxuICAgICAgICAgIGlmICghcnR4Q2FwYWJpbGl0eU1hdGNoZXMobENvZGVjLCByQ29kZWMsXHJcbiAgICAgICAgICAgICAgbG9jYWxDYXBhYmlsaXRpZXMuY29kZWNzLCByZW1vdGVDYXBhYmlsaXRpZXMuY29kZWNzKSkge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgckNvZGVjID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShyQ29kZWMpKTsgLy8gZGVlcGNvcHlcclxuICAgICAgICAvLyBudW1iZXIgb2YgY2hhbm5lbHMgaXMgdGhlIGhpZ2hlc3QgY29tbW9uIG51bWJlciBvZiBjaGFubmVsc1xyXG4gICAgICAgIHJDb2RlYy5udW1DaGFubmVscyA9IE1hdGgubWluKGxDb2RlYy5udW1DaGFubmVscyxcclxuICAgICAgICAgICAgckNvZGVjLm51bUNoYW5uZWxzKTtcclxuICAgICAgICAvLyBwdXNoIHJDb2RlYyBzbyB3ZSByZXBseSB3aXRoIG9mZmVyZXIgcGF5bG9hZCB0eXBlXHJcbiAgICAgICAgY29tbW9uQ2FwYWJpbGl0aWVzLmNvZGVjcy5wdXNoKHJDb2RlYyk7XHJcblxyXG4gICAgICAgIC8vIGRldGVybWluZSBjb21tb24gZmVlZGJhY2sgbWVjaGFuaXNtc1xyXG4gICAgICAgIHJDb2RlYy5ydGNwRmVlZGJhY2sgPSByQ29kZWMucnRjcEZlZWRiYWNrLmZpbHRlcihmdW5jdGlvbihmYikge1xyXG4gICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBsQ29kZWMucnRjcEZlZWRiYWNrLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIGlmIChsQ29kZWMucnRjcEZlZWRiYWNrW2pdLnR5cGUgPT09IGZiLnR5cGUgJiZcclxuICAgICAgICAgICAgICAgIGxDb2RlYy5ydGNwRmVlZGJhY2tbal0ucGFyYW1ldGVyID09PSBmYi5wYXJhbWV0ZXIpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIEZJWE1FOiBhbHNvIG5lZWQgdG8gZGV0ZXJtaW5lIC5wYXJhbWV0ZXJzXHJcbiAgICAgICAgLy8gIHNlZSBodHRwczovL2dpdGh1Yi5jb20vb3BlbnBlZXIvb3J0Yy9pc3N1ZXMvNTY5XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgbG9jYWxDYXBhYmlsaXRpZXMuaGVhZGVyRXh0ZW5zaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGxIZWFkZXJFeHRlbnNpb24pIHtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVtb3RlQ2FwYWJpbGl0aWVzLmhlYWRlckV4dGVuc2lvbnMubGVuZ3RoO1xyXG4gICAgICAgICBpKyspIHtcclxuICAgICAgdmFyIHJIZWFkZXJFeHRlbnNpb24gPSByZW1vdGVDYXBhYmlsaXRpZXMuaGVhZGVyRXh0ZW5zaW9uc1tpXTtcclxuICAgICAgaWYgKGxIZWFkZXJFeHRlbnNpb24udXJpID09PSBySGVhZGVyRXh0ZW5zaW9uLnVyaSkge1xyXG4gICAgICAgIGNvbW1vbkNhcGFiaWxpdGllcy5oZWFkZXJFeHRlbnNpb25zLnB1c2gockhlYWRlckV4dGVuc2lvbik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gRklYTUU6IGZlY01lY2hhbmlzbXNcclxuICByZXR1cm4gY29tbW9uQ2FwYWJpbGl0aWVzO1xyXG59XHJcblxyXG4vLyBpcyBhY3Rpb249c2V0TG9jYWxEZXNjcmlwdGlvbiB3aXRoIHR5cGUgYWxsb3dlZCBpbiBzaWduYWxpbmdTdGF0ZVxyXG5mdW5jdGlvbiBpc0FjdGlvbkFsbG93ZWRJblNpZ25hbGluZ1N0YXRlKGFjdGlvbiwgdHlwZSwgc2lnbmFsaW5nU3RhdGUpIHtcclxuICByZXR1cm4ge1xyXG4gICAgb2ZmZXI6IHtcclxuICAgICAgc2V0TG9jYWxEZXNjcmlwdGlvbjogWydzdGFibGUnLCAnaGF2ZS1sb2NhbC1vZmZlciddLFxyXG4gICAgICBzZXRSZW1vdGVEZXNjcmlwdGlvbjogWydzdGFibGUnLCAnaGF2ZS1yZW1vdGUtb2ZmZXInXVxyXG4gICAgfSxcclxuICAgIGFuc3dlcjoge1xyXG4gICAgICBzZXRMb2NhbERlc2NyaXB0aW9uOiBbJ2hhdmUtcmVtb3RlLW9mZmVyJywgJ2hhdmUtbG9jYWwtcHJhbnN3ZXInXSxcclxuICAgICAgc2V0UmVtb3RlRGVzY3JpcHRpb246IFsnaGF2ZS1sb2NhbC1vZmZlcicsICdoYXZlLXJlbW90ZS1wcmFuc3dlciddXHJcbiAgICB9XHJcbiAgfVt0eXBlXVthY3Rpb25dLmluZGV4T2Yoc2lnbmFsaW5nU3RhdGUpICE9PSAtMTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWF5YmVBZGRDYW5kaWRhdGUoaWNlVHJhbnNwb3J0LCBjYW5kaWRhdGUpIHtcclxuICAvLyBFZGdlJ3MgaW50ZXJuYWwgcmVwcmVzZW50YXRpb24gYWRkcyBzb21lIGZpZWxkcyB0aGVyZWZvcmVcclxuICAvLyBub3QgYWxsIGZpZWxk0ZUgYXJlIHRha2VuIGludG8gYWNjb3VudC5cclxuICB2YXIgYWxyZWFkeUFkZGVkID0gaWNlVHJhbnNwb3J0LmdldFJlbW90ZUNhbmRpZGF0ZXMoKVxyXG4gICAgICAuZmluZChmdW5jdGlvbihyZW1vdGVDYW5kaWRhdGUpIHtcclxuICAgICAgICByZXR1cm4gY2FuZGlkYXRlLmZvdW5kYXRpb24gPT09IHJlbW90ZUNhbmRpZGF0ZS5mb3VuZGF0aW9uICYmXHJcbiAgICAgICAgICAgIGNhbmRpZGF0ZS5pcCA9PT0gcmVtb3RlQ2FuZGlkYXRlLmlwICYmXHJcbiAgICAgICAgICAgIGNhbmRpZGF0ZS5wb3J0ID09PSByZW1vdGVDYW5kaWRhdGUucG9ydCAmJlxyXG4gICAgICAgICAgICBjYW5kaWRhdGUucHJpb3JpdHkgPT09IHJlbW90ZUNhbmRpZGF0ZS5wcmlvcml0eSAmJlxyXG4gICAgICAgICAgICBjYW5kaWRhdGUucHJvdG9jb2wgPT09IHJlbW90ZUNhbmRpZGF0ZS5wcm90b2NvbCAmJlxyXG4gICAgICAgICAgICBjYW5kaWRhdGUudHlwZSA9PT0gcmVtb3RlQ2FuZGlkYXRlLnR5cGU7XHJcbiAgICAgIH0pO1xyXG4gIGlmICghYWxyZWFkeUFkZGVkKSB7XHJcbiAgICBpY2VUcmFuc3BvcnQuYWRkUmVtb3RlQ2FuZGlkYXRlKGNhbmRpZGF0ZSk7XHJcbiAgfVxyXG4gIHJldHVybiAhYWxyZWFkeUFkZGVkO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gbWFrZUVycm9yKG5hbWUsIGRlc2NyaXB0aW9uKSB7XHJcbiAgdmFyIGUgPSBuZXcgRXJyb3IoZGVzY3JpcHRpb24pO1xyXG4gIGUubmFtZSA9IG5hbWU7XHJcbiAgLy8gbGVnYWN5IGVycm9yIGNvZGVzIGZyb20gaHR0cHM6Ly9oZXljYW0uZ2l0aHViLmlvL3dlYmlkbC8jaWRsLURPTUV4Y2VwdGlvbi1lcnJvci1uYW1lc1xyXG4gIGUuY29kZSA9IHtcclxuICAgIE5vdFN1cHBvcnRlZEVycm9yOiA5LFxyXG4gICAgSW52YWxpZFN0YXRlRXJyb3I6IDExLFxyXG4gICAgSW52YWxpZEFjY2Vzc0Vycm9yOiAxNSxcclxuICAgIFR5cGVFcnJvcjogdW5kZWZpbmVkLFxyXG4gICAgT3BlcmF0aW9uRXJyb3I6IHVuZGVmaW5lZFxyXG4gIH1bbmFtZV07XHJcbiAgcmV0dXJuIGU7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24od2luZG93LCBlZGdlVmVyc2lvbikge1xyXG4gIC8vIGh0dHBzOi8vdzNjLmdpdGh1Yi5pby9tZWRpYWNhcHR1cmUtbWFpbi8jbWVkaWFzdHJlYW1cclxuICAvLyBIZWxwZXIgZnVuY3Rpb24gdG8gYWRkIHRoZSB0cmFjayB0byB0aGUgc3RyZWFtIGFuZFxyXG4gIC8vIGRpc3BhdGNoIHRoZSBldmVudCBvdXJzZWx2ZXMuXHJcbiAgZnVuY3Rpb24gYWRkVHJhY2tUb1N0cmVhbUFuZEZpcmVFdmVudCh0cmFjaywgc3RyZWFtKSB7XHJcbiAgICBzdHJlYW0uYWRkVHJhY2sodHJhY2spO1xyXG4gICAgc3RyZWFtLmRpc3BhdGNoRXZlbnQobmV3IHdpbmRvdy5NZWRpYVN0cmVhbVRyYWNrRXZlbnQoJ2FkZHRyYWNrJyxcclxuICAgICAgICB7dHJhY2s6IHRyYWNrfSkpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVtb3ZlVHJhY2tGcm9tU3RyZWFtQW5kRmlyZUV2ZW50KHRyYWNrLCBzdHJlYW0pIHtcclxuICAgIHN0cmVhbS5yZW1vdmVUcmFjayh0cmFjayk7XHJcbiAgICBzdHJlYW0uZGlzcGF0Y2hFdmVudChuZXcgd2luZG93Lk1lZGlhU3RyZWFtVHJhY2tFdmVudCgncmVtb3ZldHJhY2snLFxyXG4gICAgICAgIHt0cmFjazogdHJhY2t9KSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBmaXJlQWRkVHJhY2socGMsIHRyYWNrLCByZWNlaXZlciwgc3RyZWFtcykge1xyXG4gICAgdmFyIHRyYWNrRXZlbnQgPSBuZXcgRXZlbnQoJ3RyYWNrJyk7XHJcbiAgICB0cmFja0V2ZW50LnRyYWNrID0gdHJhY2s7XHJcbiAgICB0cmFja0V2ZW50LnJlY2VpdmVyID0gcmVjZWl2ZXI7XHJcbiAgICB0cmFja0V2ZW50LnRyYW5zY2VpdmVyID0ge3JlY2VpdmVyOiByZWNlaXZlcn07XHJcbiAgICB0cmFja0V2ZW50LnN0cmVhbXMgPSBzdHJlYW1zO1xyXG4gICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgIHBjLl9kaXNwYXRjaEV2ZW50KCd0cmFjaycsIHRyYWNrRXZlbnQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB2YXIgUlRDUGVlckNvbm5lY3Rpb24gPSBmdW5jdGlvbihjb25maWcpIHtcclxuICAgIHZhciBwYyA9IHRoaXM7XHJcblxyXG4gICAgdmFyIF9ldmVudFRhcmdldCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICAgIFsnYWRkRXZlbnRMaXN0ZW5lcicsICdyZW1vdmVFdmVudExpc3RlbmVyJywgJ2Rpc3BhdGNoRXZlbnQnXVxyXG4gICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xyXG4gICAgICAgICAgcGNbbWV0aG9kXSA9IF9ldmVudFRhcmdldFttZXRob2RdLmJpbmQoX2V2ZW50VGFyZ2V0KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB0aGlzLmNhblRyaWNrbGVJY2VDYW5kaWRhdGVzID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLm5lZWROZWdvdGlhdGlvbiA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMubG9jYWxTdHJlYW1zID0gW107XHJcbiAgICB0aGlzLnJlbW90ZVN0cmVhbXMgPSBbXTtcclxuXHJcbiAgICB0aGlzLmxvY2FsRGVzY3JpcHRpb24gPSBudWxsO1xyXG4gICAgdGhpcy5yZW1vdGVEZXNjcmlwdGlvbiA9IG51bGw7XHJcblxyXG4gICAgdGhpcy5zaWduYWxpbmdTdGF0ZSA9ICdzdGFibGUnO1xyXG4gICAgdGhpcy5pY2VDb25uZWN0aW9uU3RhdGUgPSAnbmV3JztcclxuICAgIHRoaXMuY29ubmVjdGlvblN0YXRlID0gJ25ldyc7XHJcbiAgICB0aGlzLmljZUdhdGhlcmluZ1N0YXRlID0gJ25ldyc7XHJcblxyXG4gICAgY29uZmlnID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShjb25maWcgfHwge30pKTtcclxuXHJcbiAgICB0aGlzLnVzaW5nQnVuZGxlID0gY29uZmlnLmJ1bmRsZVBvbGljeSA9PT0gJ21heC1idW5kbGUnO1xyXG4gICAgaWYgKGNvbmZpZy5ydGNwTXV4UG9saWN5ID09PSAnbmVnb3RpYXRlJykge1xyXG4gICAgICB0aHJvdyhtYWtlRXJyb3IoJ05vdFN1cHBvcnRlZEVycm9yJyxcclxuICAgICAgICAgICdydGNwTXV4UG9saWN5IFxcJ25lZ290aWF0ZVxcJyBpcyBub3Qgc3VwcG9ydGVkJykpO1xyXG4gICAgfSBlbHNlIGlmICghY29uZmlnLnJ0Y3BNdXhQb2xpY3kpIHtcclxuICAgICAgY29uZmlnLnJ0Y3BNdXhQb2xpY3kgPSAncmVxdWlyZSc7XHJcbiAgICB9XHJcblxyXG4gICAgc3dpdGNoIChjb25maWcuaWNlVHJhbnNwb3J0UG9saWN5KSB7XHJcbiAgICAgIGNhc2UgJ2FsbCc6XHJcbiAgICAgIGNhc2UgJ3JlbGF5JzpcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBjb25maWcuaWNlVHJhbnNwb3J0UG9saWN5ID0gJ2FsbCc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgc3dpdGNoIChjb25maWcuYnVuZGxlUG9saWN5KSB7XHJcbiAgICAgIGNhc2UgJ2JhbGFuY2VkJzpcclxuICAgICAgY2FzZSAnbWF4LWNvbXBhdCc6XHJcbiAgICAgIGNhc2UgJ21heC1idW5kbGUnOlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGNvbmZpZy5idW5kbGVQb2xpY3kgPSAnYmFsYW5jZWQnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbmZpZy5pY2VTZXJ2ZXJzID0gZmlsdGVySWNlU2VydmVycyhjb25maWcuaWNlU2VydmVycyB8fCBbXSwgZWRnZVZlcnNpb24pO1xyXG5cclxuICAgIHRoaXMuX2ljZUdhdGhlcmVycyA9IFtdO1xyXG4gICAgaWYgKGNvbmZpZy5pY2VDYW5kaWRhdGVQb29sU2l6ZSkge1xyXG4gICAgICBmb3IgKHZhciBpID0gY29uZmlnLmljZUNhbmRpZGF0ZVBvb2xTaXplOyBpID4gMDsgaS0tKSB7XHJcbiAgICAgICAgdGhpcy5faWNlR2F0aGVyZXJzLnB1c2gobmV3IHdpbmRvdy5SVENJY2VHYXRoZXJlcih7XHJcbiAgICAgICAgICBpY2VTZXJ2ZXJzOiBjb25maWcuaWNlU2VydmVycyxcclxuICAgICAgICAgIGdhdGhlclBvbGljeTogY29uZmlnLmljZVRyYW5zcG9ydFBvbGljeVxyXG4gICAgICAgIH0pKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uZmlnLmljZUNhbmRpZGF0ZVBvb2xTaXplID0gMDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XHJcblxyXG4gICAgLy8gcGVyLXRyYWNrIGljZUdhdGhlcnMsIGljZVRyYW5zcG9ydHMsIGR0bHNUcmFuc3BvcnRzLCBydHBTZW5kZXJzLCAuLi5cclxuICAgIC8vIGV2ZXJ5dGhpbmcgdGhhdCBpcyBuZWVkZWQgdG8gZGVzY3JpYmUgYSBTRFAgbS1saW5lLlxyXG4gICAgdGhpcy50cmFuc2NlaXZlcnMgPSBbXTtcclxuXHJcbiAgICB0aGlzLl9zZHBTZXNzaW9uSWQgPSBTRFBVdGlscy5nZW5lcmF0ZVNlc3Npb25JZCgpO1xyXG4gICAgdGhpcy5fc2RwU2Vzc2lvblZlcnNpb24gPSAwO1xyXG5cclxuICAgIHRoaXMuX2R0bHNSb2xlID0gdW5kZWZpbmVkOyAvLyByb2xlIGZvciBhPXNldHVwIHRvIHVzZSBpbiBhbnN3ZXJzLlxyXG5cclxuICAgIHRoaXMuX2lzQ2xvc2VkID0gZmFsc2U7XHJcbiAgfTtcclxuXHJcbiAgLy8gc2V0IHVwIGV2ZW50IGhhbmRsZXJzIG9uIHByb3RvdHlwZVxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5vbmljZWNhbmRpZGF0ZSA9IG51bGw7XHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9uYWRkc3RyZWFtID0gbnVsbDtcclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub250cmFjayA9IG51bGw7XHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9ucmVtb3Zlc3RyZWFtID0gbnVsbDtcclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub25zaWduYWxpbmdzdGF0ZWNoYW5nZSA9IG51bGw7XHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9uaWNlY29ubmVjdGlvbnN0YXRlY2hhbmdlID0gbnVsbDtcclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub25jb25uZWN0aW9uc3RhdGVjaGFuZ2UgPSBudWxsO1xyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5vbmljZWdhdGhlcmluZ3N0YXRlY2hhbmdlID0gbnVsbDtcclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub25uZWdvdGlhdGlvbm5lZWRlZCA9IG51bGw7XHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9uZGF0YWNoYW5uZWwgPSBudWxsO1xyXG5cclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX2Rpc3BhdGNoRXZlbnQgPSBmdW5jdGlvbihuYW1lLCBldmVudCkge1xyXG4gICAgaWYgKHRoaXMuX2lzQ2xvc2VkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbiAgICBpZiAodHlwZW9mIHRoaXNbJ29uJyArIG5hbWVdID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHRoaXNbJ29uJyArIG5hbWVdKGV2ZW50KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX2VtaXRHYXRoZXJpbmdTdGF0ZUNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdpY2VnYXRoZXJpbmdzdGF0ZWNoYW5nZScpO1xyXG4gICAgdGhpcy5fZGlzcGF0Y2hFdmVudCgnaWNlZ2F0aGVyaW5nc3RhdGVjaGFuZ2UnLCBldmVudCk7XHJcbiAgfTtcclxuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldENvbmZpZ3VyYXRpb24gPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLl9jb25maWc7XHJcbiAgfTtcclxuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldExvY2FsU3RyZWFtcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubG9jYWxTdHJlYW1zO1xyXG4gIH07XHJcblxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRSZW1vdGVTdHJlYW1zID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yZW1vdGVTdHJlYW1zO1xyXG4gIH07XHJcblxyXG4gIC8vIGludGVybmFsIGhlbHBlciB0byBjcmVhdGUgYSB0cmFuc2NlaXZlciBvYmplY3QuXHJcbiAgLy8gKHdoaWNoIGlzIG5vdCB5ZXQgdGhlIHNhbWUgYXMgdGhlIFdlYlJUQyAxLjAgdHJhbnNjZWl2ZXIpXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl9jcmVhdGVUcmFuc2NlaXZlciA9IGZ1bmN0aW9uKGtpbmQsIGRvTm90QWRkKSB7XHJcbiAgICB2YXIgaGFzQnVuZGxlVHJhbnNwb3J0ID0gdGhpcy50cmFuc2NlaXZlcnMubGVuZ3RoID4gMDtcclxuICAgIHZhciB0cmFuc2NlaXZlciA9IHtcclxuICAgICAgdHJhY2s6IG51bGwsXHJcbiAgICAgIGljZUdhdGhlcmVyOiBudWxsLFxyXG4gICAgICBpY2VUcmFuc3BvcnQ6IG51bGwsXHJcbiAgICAgIGR0bHNUcmFuc3BvcnQ6IG51bGwsXHJcbiAgICAgIGxvY2FsQ2FwYWJpbGl0aWVzOiBudWxsLFxyXG4gICAgICByZW1vdGVDYXBhYmlsaXRpZXM6IG51bGwsXHJcbiAgICAgIHJ0cFNlbmRlcjogbnVsbCxcclxuICAgICAgcnRwUmVjZWl2ZXI6IG51bGwsXHJcbiAgICAgIGtpbmQ6IGtpbmQsXHJcbiAgICAgIG1pZDogbnVsbCxcclxuICAgICAgc2VuZEVuY29kaW5nUGFyYW1ldGVyczogbnVsbCxcclxuICAgICAgcmVjdkVuY29kaW5nUGFyYW1ldGVyczogbnVsbCxcclxuICAgICAgc3RyZWFtOiBudWxsLFxyXG4gICAgICBhc3NvY2lhdGVkUmVtb3RlTWVkaWFTdHJlYW1zOiBbXSxcclxuICAgICAgd2FudFJlY2VpdmU6IHRydWVcclxuICAgIH07XHJcbiAgICBpZiAodGhpcy51c2luZ0J1bmRsZSAmJiBoYXNCdW5kbGVUcmFuc3BvcnQpIHtcclxuICAgICAgdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0ID0gdGhpcy50cmFuc2NlaXZlcnNbMF0uaWNlVHJhbnNwb3J0O1xyXG4gICAgICB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0ID0gdGhpcy50cmFuc2NlaXZlcnNbMF0uZHRsc1RyYW5zcG9ydDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciB0cmFuc3BvcnRzID0gdGhpcy5fY3JlYXRlSWNlQW5kRHRsc1RyYW5zcG9ydHMoKTtcclxuICAgICAgdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0ID0gdHJhbnNwb3J0cy5pY2VUcmFuc3BvcnQ7XHJcbiAgICAgIHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQgPSB0cmFuc3BvcnRzLmR0bHNUcmFuc3BvcnQ7XHJcbiAgICB9XHJcbiAgICBpZiAoIWRvTm90QWRkKSB7XHJcbiAgICAgIHRoaXMudHJhbnNjZWl2ZXJzLnB1c2godHJhbnNjZWl2ZXIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRyYW5zY2VpdmVyO1xyXG4gIH07XHJcblxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjayA9IGZ1bmN0aW9uKHRyYWNrLCBzdHJlYW0pIHtcclxuICAgIGlmICh0aGlzLl9pc0Nsb3NlZCkge1xyXG4gICAgICB0aHJvdyBtYWtlRXJyb3IoJ0ludmFsaWRTdGF0ZUVycm9yJyxcclxuICAgICAgICAgICdBdHRlbXB0ZWQgdG8gY2FsbCBhZGRUcmFjayBvbiBhIGNsb3NlZCBwZWVyY29ubmVjdGlvbi4nKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgYWxyZWFkeUV4aXN0cyA9IHRoaXMudHJhbnNjZWl2ZXJzLmZpbmQoZnVuY3Rpb24ocykge1xyXG4gICAgICByZXR1cm4gcy50cmFjayA9PT0gdHJhY2s7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICB0aHJvdyBtYWtlRXJyb3IoJ0ludmFsaWRBY2Nlc3NFcnJvcicsICdUcmFjayBhbHJlYWR5IGV4aXN0cy4nKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgdHJhbnNjZWl2ZXI7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudHJhbnNjZWl2ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmICghdGhpcy50cmFuc2NlaXZlcnNbaV0udHJhY2sgJiZcclxuICAgICAgICAgIHRoaXMudHJhbnNjZWl2ZXJzW2ldLmtpbmQgPT09IHRyYWNrLmtpbmQpIHtcclxuICAgICAgICB0cmFuc2NlaXZlciA9IHRoaXMudHJhbnNjZWl2ZXJzW2ldO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoIXRyYW5zY2VpdmVyKSB7XHJcbiAgICAgIHRyYW5zY2VpdmVyID0gdGhpcy5fY3JlYXRlVHJhbnNjZWl2ZXIodHJhY2sua2luZCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fbWF5YmVGaXJlTmVnb3RpYXRpb25OZWVkZWQoKTtcclxuXHJcbiAgICBpZiAodGhpcy5sb2NhbFN0cmVhbXMuaW5kZXhPZihzdHJlYW0pID09PSAtMSkge1xyXG4gICAgICB0aGlzLmxvY2FsU3RyZWFtcy5wdXNoKHN0cmVhbSk7XHJcbiAgICB9XHJcblxyXG4gICAgdHJhbnNjZWl2ZXIudHJhY2sgPSB0cmFjaztcclxuICAgIHRyYW5zY2VpdmVyLnN0cmVhbSA9IHN0cmVhbTtcclxuICAgIHRyYW5zY2VpdmVyLnJ0cFNlbmRlciA9IG5ldyB3aW5kb3cuUlRDUnRwU2VuZGVyKHRyYWNrLFxyXG4gICAgICAgIHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQpO1xyXG4gICAgcmV0dXJuIHRyYW5zY2VpdmVyLnJ0cFNlbmRlcjtcclxuICB9O1xyXG5cclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgaWYgKGVkZ2VWZXJzaW9uID49IDE1MDI1KSB7XHJcbiAgICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XHJcbiAgICAgICAgcGMuYWRkVHJhY2sodHJhY2ssIHN0cmVhbSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gQ2xvbmUgaXMgbmVjZXNzYXJ5IGZvciBsb2NhbCBkZW1vcyBtb3N0bHksIGF0dGFjaGluZyBkaXJlY3RseVxyXG4gICAgICAvLyB0byB0d28gZGlmZmVyZW50IHNlbmRlcnMgZG9lcyBub3Qgd29yayAoYnVpbGQgMTA1NDcpLlxyXG4gICAgICAvLyBGaXhlZCBpbiAxNTAyNSAob3IgZWFybGllcilcclxuICAgICAgdmFyIGNsb25lZFN0cmVhbSA9IHN0cmVhbS5jbG9uZSgpO1xyXG4gICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaywgaWR4KSB7XHJcbiAgICAgICAgdmFyIGNsb25lZFRyYWNrID0gY2xvbmVkU3RyZWFtLmdldFRyYWNrcygpW2lkeF07XHJcbiAgICAgICAgdHJhY2suYWRkRXZlbnRMaXN0ZW5lcignZW5hYmxlZCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICBjbG9uZWRUcmFjay5lbmFibGVkID0gZXZlbnQuZW5hYmxlZDtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICAgIGNsb25lZFN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XHJcbiAgICAgICAgcGMuYWRkVHJhY2sodHJhY2ssIGNsb25lZFN0cmVhbSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVUcmFjayA9IGZ1bmN0aW9uKHNlbmRlcikge1xyXG4gICAgaWYgKHRoaXMuX2lzQ2xvc2VkKSB7XHJcbiAgICAgIHRocm93IG1ha2VFcnJvcignSW52YWxpZFN0YXRlRXJyb3InLFxyXG4gICAgICAgICAgJ0F0dGVtcHRlZCB0byBjYWxsIHJlbW92ZVRyYWNrIG9uIGEgY2xvc2VkIHBlZXJjb25uZWN0aW9uLicpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghKHNlbmRlciBpbnN0YW5jZW9mIHdpbmRvdy5SVENSdHBTZW5kZXIpKSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IDEgb2YgUlRDUGVlckNvbm5lY3Rpb24ucmVtb3ZlVHJhY2sgJyArXHJcbiAgICAgICAgICAnZG9lcyBub3QgaW1wbGVtZW50IGludGVyZmFjZSBSVENSdHBTZW5kZXIuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHRyYW5zY2VpdmVyID0gdGhpcy50cmFuc2NlaXZlcnMuZmluZChmdW5jdGlvbih0KSB7XHJcbiAgICAgIHJldHVybiB0LnJ0cFNlbmRlciA9PT0gc2VuZGVyO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCF0cmFuc2NlaXZlcikge1xyXG4gICAgICB0aHJvdyBtYWtlRXJyb3IoJ0ludmFsaWRBY2Nlc3NFcnJvcicsXHJcbiAgICAgICAgICAnU2VuZGVyIHdhcyBub3QgY3JlYXRlZCBieSB0aGlzIGNvbm5lY3Rpb24uJyk7XHJcbiAgICB9XHJcbiAgICB2YXIgc3RyZWFtID0gdHJhbnNjZWl2ZXIuc3RyZWFtO1xyXG5cclxuICAgIHRyYW5zY2VpdmVyLnJ0cFNlbmRlci5zdG9wKCk7XHJcbiAgICB0cmFuc2NlaXZlci5ydHBTZW5kZXIgPSBudWxsO1xyXG4gICAgdHJhbnNjZWl2ZXIudHJhY2sgPSBudWxsO1xyXG4gICAgdHJhbnNjZWl2ZXIuc3RyZWFtID0gbnVsbDtcclxuXHJcbiAgICAvLyByZW1vdmUgdGhlIHN0cmVhbSBmcm9tIHRoZSBzZXQgb2YgbG9jYWwgc3RyZWFtc1xyXG4gICAgdmFyIGxvY2FsU3RyZWFtcyA9IHRoaXMudHJhbnNjZWl2ZXJzLm1hcChmdW5jdGlvbih0KSB7XHJcbiAgICAgIHJldHVybiB0LnN0cmVhbTtcclxuICAgIH0pO1xyXG4gICAgaWYgKGxvY2FsU3RyZWFtcy5pbmRleE9mKHN0cmVhbSkgPT09IC0xICYmXHJcbiAgICAgICAgdGhpcy5sb2NhbFN0cmVhbXMuaW5kZXhPZihzdHJlYW0pID4gLTEpIHtcclxuICAgICAgdGhpcy5sb2NhbFN0cmVhbXMuc3BsaWNlKHRoaXMubG9jYWxTdHJlYW1zLmluZGV4T2Yoc3RyZWFtKSwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fbWF5YmVGaXJlTmVnb3RpYXRpb25OZWVkZWQoKTtcclxuICB9O1xyXG5cclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcclxuICAgICAgdmFyIHNlbmRlciA9IHBjLmdldFNlbmRlcnMoKS5maW5kKGZ1bmN0aW9uKHMpIHtcclxuICAgICAgICByZXR1cm4gcy50cmFjayA9PT0gdHJhY2s7XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAoc2VuZGVyKSB7XHJcbiAgICAgICAgcGMucmVtb3ZlVHJhY2soc2VuZGVyKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFNlbmRlcnMgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLnRyYW5zY2VpdmVycy5maWx0ZXIoZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcclxuICAgICAgcmV0dXJuICEhdHJhbnNjZWl2ZXIucnRwU2VuZGVyO1xyXG4gICAgfSlcclxuICAgIC5tYXAoZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcclxuICAgICAgcmV0dXJuIHRyYW5zY2VpdmVyLnJ0cFNlbmRlcjtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRSZWNlaXZlcnMgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLnRyYW5zY2VpdmVycy5maWx0ZXIoZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcclxuICAgICAgcmV0dXJuICEhdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXI7XHJcbiAgICB9KVxyXG4gICAgLm1hcChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xyXG4gICAgICByZXR1cm4gdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXI7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl9jcmVhdGVJY2VHYXRoZXJlciA9IGZ1bmN0aW9uKHNkcE1MaW5lSW5kZXgsXHJcbiAgICAgIHVzaW5nQnVuZGxlKSB7XHJcbiAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgaWYgKHVzaW5nQnVuZGxlICYmIHNkcE1MaW5lSW5kZXggPiAwKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnRyYW5zY2VpdmVyc1swXS5pY2VHYXRoZXJlcjtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5faWNlR2F0aGVyZXJzLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5faWNlR2F0aGVyZXJzLnNoaWZ0KCk7XHJcbiAgICB9XHJcbiAgICB2YXIgaWNlR2F0aGVyZXIgPSBuZXcgd2luZG93LlJUQ0ljZUdhdGhlcmVyKHtcclxuICAgICAgaWNlU2VydmVyczogdGhpcy5fY29uZmlnLmljZVNlcnZlcnMsXHJcbiAgICAgIGdhdGhlclBvbGljeTogdGhpcy5fY29uZmlnLmljZVRyYW5zcG9ydFBvbGljeVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoaWNlR2F0aGVyZXIsICdzdGF0ZScsXHJcbiAgICAgICAge3ZhbHVlOiAnbmV3Jywgd3JpdGFibGU6IHRydWV9XHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmJ1ZmZlcmVkQ2FuZGlkYXRlRXZlbnRzID0gW107XHJcbiAgICB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5idWZmZXJDYW5kaWRhdGVzID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgdmFyIGVuZCA9ICFldmVudC5jYW5kaWRhdGUgfHwgT2JqZWN0LmtleXMoZXZlbnQuY2FuZGlkYXRlKS5sZW5ndGggPT09IDA7XHJcbiAgICAgIC8vIHBvbHlmaWxsIHNpbmNlIFJUQ0ljZUdhdGhlcmVyLnN0YXRlIGlzIG5vdCBpbXBsZW1lbnRlZCBpblxyXG4gICAgICAvLyBFZGdlIDEwNTQ3IHlldC5cclxuICAgICAgaWNlR2F0aGVyZXIuc3RhdGUgPSBlbmQgPyAnY29tcGxldGVkJyA6ICdnYXRoZXJpbmcnO1xyXG4gICAgICBpZiAocGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmJ1ZmZlcmVkQ2FuZGlkYXRlRXZlbnRzICE9PSBudWxsKSB7XHJcbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmJ1ZmZlcmVkQ2FuZGlkYXRlRXZlbnRzLnB1c2goZXZlbnQpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgaWNlR2F0aGVyZXIuYWRkRXZlbnRMaXN0ZW5lcignbG9jYWxjYW5kaWRhdGUnLFxyXG4gICAgICB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5idWZmZXJDYW5kaWRhdGVzKTtcclxuICAgIHJldHVybiBpY2VHYXRoZXJlcjtcclxuICB9O1xyXG5cclxuICAvLyBzdGFydCBnYXRoZXJpbmcgZnJvbSBhbiBSVENJY2VHYXRoZXJlci5cclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX2dhdGhlciA9IGZ1bmN0aW9uKG1pZCwgc2RwTUxpbmVJbmRleCkge1xyXG4gICAgdmFyIHBjID0gdGhpcztcclxuICAgIHZhciBpY2VHYXRoZXJlciA9IHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmljZUdhdGhlcmVyO1xyXG4gICAgaWYgKGljZUdhdGhlcmVyLm9ubG9jYWxjYW5kaWRhdGUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdmFyIGJ1ZmZlcmVkQ2FuZGlkYXRlRXZlbnRzID1cclxuICAgICAgdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uYnVmZmVyZWRDYW5kaWRhdGVFdmVudHM7XHJcbiAgICB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5idWZmZXJlZENhbmRpZGF0ZUV2ZW50cyA9IG51bGw7XHJcbiAgICBpY2VHYXRoZXJlci5yZW1vdmVFdmVudExpc3RlbmVyKCdsb2NhbGNhbmRpZGF0ZScsXHJcbiAgICAgIHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmJ1ZmZlckNhbmRpZGF0ZXMpO1xyXG4gICAgaWNlR2F0aGVyZXIub25sb2NhbGNhbmRpZGF0ZSA9IGZ1bmN0aW9uKGV2dCkge1xyXG4gICAgICBpZiAocGMudXNpbmdCdW5kbGUgJiYgc2RwTUxpbmVJbmRleCA+IDApIHtcclxuICAgICAgICAvLyBpZiB3ZSBrbm93IHRoYXQgd2UgdXNlIGJ1bmRsZSB3ZSBjYW4gZHJvcCBjYW5kaWRhdGVzIHdpdGhcclxuICAgICAgICAvLyDRlWRwTUxpbmVJbmRleCA+IDAuIElmIHdlIGRvbid0IGRvIHRoaXMgdGhlbiBvdXIgc3RhdGUgZ2V0c1xyXG4gICAgICAgIC8vIGNvbmZ1c2VkIHNpbmNlIHdlIGRpc3Bvc2UgdGhlIGV4dHJhIGljZSBnYXRoZXJlci5cclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdpY2VjYW5kaWRhdGUnKTtcclxuICAgICAgZXZlbnQuY2FuZGlkYXRlID0ge3NkcE1pZDogbWlkLCBzZHBNTGluZUluZGV4OiBzZHBNTGluZUluZGV4fTtcclxuXHJcbiAgICAgIHZhciBjYW5kID0gZXZ0LmNhbmRpZGF0ZTtcclxuICAgICAgLy8gRWRnZSBlbWl0cyBhbiBlbXB0eSBvYmplY3QgZm9yIFJUQ0ljZUNhbmRpZGF0ZUNvbXBsZXRl4oClXHJcbiAgICAgIHZhciBlbmQgPSAhY2FuZCB8fCBPYmplY3Qua2V5cyhjYW5kKS5sZW5ndGggPT09IDA7XHJcbiAgICAgIGlmIChlbmQpIHtcclxuICAgICAgICAvLyBwb2x5ZmlsbCBzaW5jZSBSVENJY2VHYXRoZXJlci5zdGF0ZSBpcyBub3QgaW1wbGVtZW50ZWQgaW5cclxuICAgICAgICAvLyBFZGdlIDEwNTQ3IHlldC5cclxuICAgICAgICBpZiAoaWNlR2F0aGVyZXIuc3RhdGUgPT09ICduZXcnIHx8IGljZUdhdGhlcmVyLnN0YXRlID09PSAnZ2F0aGVyaW5nJykge1xyXG4gICAgICAgICAgaWNlR2F0aGVyZXIuc3RhdGUgPSAnY29tcGxldGVkJztcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGljZUdhdGhlcmVyLnN0YXRlID09PSAnbmV3Jykge1xyXG4gICAgICAgICAgaWNlR2F0aGVyZXIuc3RhdGUgPSAnZ2F0aGVyaW5nJztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUlRDSWNlQ2FuZGlkYXRlIGRvZXNuJ3QgaGF2ZSBhIGNvbXBvbmVudCwgbmVlZHMgdG8gYmUgYWRkZWRcclxuICAgICAgICBjYW5kLmNvbXBvbmVudCA9IDE7XHJcbiAgICAgICAgLy8gYWxzbyB0aGUgdXNlcm5hbWVGcmFnbWVudC4gVE9ETzogdXBkYXRlIFNEUCB0byB0YWtlIGJvdGggdmFyaWFudHMuXHJcbiAgICAgICAgY2FuZC51ZnJhZyA9IGljZUdhdGhlcmVyLmdldExvY2FsUGFyYW1ldGVycygpLnVzZXJuYW1lRnJhZ21lbnQ7XHJcblxyXG4gICAgICAgIHZhciBzZXJpYWxpemVkQ2FuZGlkYXRlID0gU0RQVXRpbHMud3JpdGVDYW5kaWRhdGUoY2FuZCk7XHJcbiAgICAgICAgZXZlbnQuY2FuZGlkYXRlID0gT2JqZWN0LmFzc2lnbihldmVudC5jYW5kaWRhdGUsXHJcbiAgICAgICAgICAgIFNEUFV0aWxzLnBhcnNlQ2FuZGlkYXRlKHNlcmlhbGl6ZWRDYW5kaWRhdGUpKTtcclxuXHJcbiAgICAgICAgZXZlbnQuY2FuZGlkYXRlLmNhbmRpZGF0ZSA9IHNlcmlhbGl6ZWRDYW5kaWRhdGU7XHJcbiAgICAgICAgZXZlbnQuY2FuZGlkYXRlLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY2FuZGlkYXRlOiBldmVudC5jYW5kaWRhdGUuY2FuZGlkYXRlLFxyXG4gICAgICAgICAgICBzZHBNaWQ6IGV2ZW50LmNhbmRpZGF0ZS5zZHBNaWQsXHJcbiAgICAgICAgICAgIHNkcE1MaW5lSW5kZXg6IGV2ZW50LmNhbmRpZGF0ZS5zZHBNTGluZUluZGV4LFxyXG4gICAgICAgICAgICB1c2VybmFtZUZyYWdtZW50OiBldmVudC5jYW5kaWRhdGUudXNlcm5hbWVGcmFnbWVudFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyB1cGRhdGUgbG9jYWwgZGVzY3JpcHRpb24uXHJcbiAgICAgIHZhciBzZWN0aW9ucyA9IFNEUFV0aWxzLmdldE1lZGlhU2VjdGlvbnMocGMubG9jYWxEZXNjcmlwdGlvbi5zZHApO1xyXG4gICAgICBpZiAoIWVuZCkge1xyXG4gICAgICAgIHNlY3Rpb25zW2V2ZW50LmNhbmRpZGF0ZS5zZHBNTGluZUluZGV4XSArPVxyXG4gICAgICAgICAgICAnYT0nICsgZXZlbnQuY2FuZGlkYXRlLmNhbmRpZGF0ZSArICdcXHJcXG4nO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNlY3Rpb25zW2V2ZW50LmNhbmRpZGF0ZS5zZHBNTGluZUluZGV4XSArPVxyXG4gICAgICAgICAgICAnYT1lbmQtb2YtY2FuZGlkYXRlc1xcclxcbic7XHJcbiAgICAgIH1cclxuICAgICAgcGMubG9jYWxEZXNjcmlwdGlvbi5zZHAgPVxyXG4gICAgICAgICAgU0RQVXRpbHMuZ2V0RGVzY3JpcHRpb24ocGMubG9jYWxEZXNjcmlwdGlvbi5zZHApICtcclxuICAgICAgICAgIHNlY3Rpb25zLmpvaW4oJycpO1xyXG4gICAgICB2YXIgY29tcGxldGUgPSBwYy50cmFuc2NlaXZlcnMuZXZlcnkoZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcclxuICAgICAgICByZXR1cm4gdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIgJiZcclxuICAgICAgICAgICAgdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIuc3RhdGUgPT09ICdjb21wbGV0ZWQnO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChwYy5pY2VHYXRoZXJpbmdTdGF0ZSAhPT0gJ2dhdGhlcmluZycpIHtcclxuICAgICAgICBwYy5pY2VHYXRoZXJpbmdTdGF0ZSA9ICdnYXRoZXJpbmcnO1xyXG4gICAgICAgIHBjLl9lbWl0R2F0aGVyaW5nU3RhdGVDaGFuZ2UoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gRW1pdCBjYW5kaWRhdGUuIEFsc28gZW1pdCBudWxsIGNhbmRpZGF0ZSB3aGVuIGFsbCBnYXRoZXJlcnMgYXJlXHJcbiAgICAgIC8vIGNvbXBsZXRlLlxyXG4gICAgICBpZiAoIWVuZCkge1xyXG4gICAgICAgIHBjLl9kaXNwYXRjaEV2ZW50KCdpY2VjYW5kaWRhdGUnLCBldmVudCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNvbXBsZXRlKSB7XHJcbiAgICAgICAgcGMuX2Rpc3BhdGNoRXZlbnQoJ2ljZWNhbmRpZGF0ZScsIG5ldyBFdmVudCgnaWNlY2FuZGlkYXRlJykpO1xyXG4gICAgICAgIHBjLmljZUdhdGhlcmluZ1N0YXRlID0gJ2NvbXBsZXRlJztcclxuICAgICAgICBwYy5fZW1pdEdhdGhlcmluZ1N0YXRlQ2hhbmdlKCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy8gZW1pdCBhbHJlYWR5IGdhdGhlcmVkIGNhbmRpZGF0ZXMuXHJcbiAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgYnVmZmVyZWRDYW5kaWRhdGVFdmVudHMuZm9yRWFjaChmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWNlR2F0aGVyZXIub25sb2NhbGNhbmRpZGF0ZShlKTtcclxuICAgICAgfSk7XHJcbiAgICB9LCAwKTtcclxuICB9O1xyXG5cclxuICAvLyBDcmVhdGUgSUNFIHRyYW5zcG9ydCBhbmQgRFRMUyB0cmFuc3BvcnQuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl9jcmVhdGVJY2VBbmREdGxzVHJhbnNwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHBjID0gdGhpcztcclxuICAgIHZhciBpY2VUcmFuc3BvcnQgPSBuZXcgd2luZG93LlJUQ0ljZVRyYW5zcG9ydChudWxsKTtcclxuICAgIGljZVRyYW5zcG9ydC5vbmljZXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHBjLl91cGRhdGVJY2VDb25uZWN0aW9uU3RhdGUoKTtcclxuICAgICAgcGMuX3VwZGF0ZUNvbm5lY3Rpb25TdGF0ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgZHRsc1RyYW5zcG9ydCA9IG5ldyB3aW5kb3cuUlRDRHRsc1RyYW5zcG9ydChpY2VUcmFuc3BvcnQpO1xyXG4gICAgZHRsc1RyYW5zcG9ydC5vbmR0bHNzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBwYy5fdXBkYXRlQ29ubmVjdGlvblN0YXRlKCk7XHJcbiAgICB9O1xyXG4gICAgZHRsc1RyYW5zcG9ydC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIC8vIG9uZXJyb3IgZG9lcyBub3Qgc2V0IHN0YXRlIHRvIGZhaWxlZCBieSBpdHNlbGYuXHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkdGxzVHJhbnNwb3J0LCAnc3RhdGUnLFxyXG4gICAgICAgICAge3ZhbHVlOiAnZmFpbGVkJywgd3JpdGFibGU6IHRydWV9KTtcclxuICAgICAgcGMuX3VwZGF0ZUNvbm5lY3Rpb25TdGF0ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBpY2VUcmFuc3BvcnQ6IGljZVRyYW5zcG9ydCxcclxuICAgICAgZHRsc1RyYW5zcG9ydDogZHRsc1RyYW5zcG9ydFxyXG4gICAgfTtcclxuICB9O1xyXG5cclxuICAvLyBEZXN0cm95IElDRSBnYXRoZXJlciwgSUNFIHRyYW5zcG9ydCBhbmQgRFRMUyB0cmFuc3BvcnQuXHJcbiAgLy8gV2l0aG91dCB0cmlnZ2VyaW5nIHRoZSBjYWxsYmFja3MuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl9kaXNwb3NlSWNlQW5kRHRsc1RyYW5zcG9ydHMgPSBmdW5jdGlvbihcclxuICAgICAgc2RwTUxpbmVJbmRleCkge1xyXG4gICAgdmFyIGljZUdhdGhlcmVyID0gdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uaWNlR2F0aGVyZXI7XHJcbiAgICBpZiAoaWNlR2F0aGVyZXIpIHtcclxuICAgICAgZGVsZXRlIGljZUdhdGhlcmVyLm9ubG9jYWxjYW5kaWRhdGU7XHJcbiAgICAgIGRlbGV0ZSB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5pY2VHYXRoZXJlcjtcclxuICAgIH1cclxuICAgIHZhciBpY2VUcmFuc3BvcnQgPSB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5pY2VUcmFuc3BvcnQ7XHJcbiAgICBpZiAoaWNlVHJhbnNwb3J0KSB7XHJcbiAgICAgIGRlbGV0ZSBpY2VUcmFuc3BvcnQub25pY2VzdGF0ZWNoYW5nZTtcclxuICAgICAgZGVsZXRlIHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmljZVRyYW5zcG9ydDtcclxuICAgIH1cclxuICAgIHZhciBkdGxzVHJhbnNwb3J0ID0gdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uZHRsc1RyYW5zcG9ydDtcclxuICAgIGlmIChkdGxzVHJhbnNwb3J0KSB7XHJcbiAgICAgIGRlbGV0ZSBkdGxzVHJhbnNwb3J0Lm9uZHRsc3N0YXRlY2hhbmdlO1xyXG4gICAgICBkZWxldGUgZHRsc1RyYW5zcG9ydC5vbmVycm9yO1xyXG4gICAgICBkZWxldGUgdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uZHRsc1RyYW5zcG9ydDtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvLyBTdGFydCB0aGUgUlRQIFNlbmRlciBhbmQgUmVjZWl2ZXIgZm9yIGEgdHJhbnNjZWl2ZXIuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl90cmFuc2NlaXZlID0gZnVuY3Rpb24odHJhbnNjZWl2ZXIsXHJcbiAgICAgIHNlbmQsIHJlY3YpIHtcclxuICAgIHZhciBwYXJhbXMgPSBnZXRDb21tb25DYXBhYmlsaXRpZXModHJhbnNjZWl2ZXIubG9jYWxDYXBhYmlsaXRpZXMsXHJcbiAgICAgICAgdHJhbnNjZWl2ZXIucmVtb3RlQ2FwYWJpbGl0aWVzKTtcclxuICAgIGlmIChzZW5kICYmIHRyYW5zY2VpdmVyLnJ0cFNlbmRlcikge1xyXG4gICAgICBwYXJhbXMuZW5jb2RpbmdzID0gdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVycztcclxuICAgICAgcGFyYW1zLnJ0Y3AgPSB7XHJcbiAgICAgICAgY25hbWU6IFNEUFV0aWxzLmxvY2FsQ05hbWUsXHJcbiAgICAgICAgY29tcG91bmQ6IHRyYW5zY2VpdmVyLnJ0Y3BQYXJhbWV0ZXJzLmNvbXBvdW5kXHJcbiAgICAgIH07XHJcbiAgICAgIGlmICh0cmFuc2NlaXZlci5yZWN2RW5jb2RpbmdQYXJhbWV0ZXJzLmxlbmd0aCkge1xyXG4gICAgICAgIHBhcmFtcy5ydGNwLnNzcmMgPSB0cmFuc2NlaXZlci5yZWN2RW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmM7XHJcbiAgICAgIH1cclxuICAgICAgdHJhbnNjZWl2ZXIucnRwU2VuZGVyLnNlbmQocGFyYW1zKTtcclxuICAgIH1cclxuICAgIGlmIChyZWN2ICYmIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyICYmIHBhcmFtcy5jb2RlY3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAvLyByZW1vdmUgUlRYIGZpZWxkIGluIEVkZ2UgMTQ5NDJcclxuICAgICAgaWYgKHRyYW5zY2VpdmVyLmtpbmQgPT09ICd2aWRlbydcclxuICAgICAgICAgICYmIHRyYW5zY2VpdmVyLnJlY3ZFbmNvZGluZ1BhcmFtZXRlcnNcclxuICAgICAgICAgICYmIGVkZ2VWZXJzaW9uIDwgMTUwMTkpIHtcclxuICAgICAgICB0cmFuc2NlaXZlci5yZWN2RW5jb2RpbmdQYXJhbWV0ZXJzLmZvckVhY2goZnVuY3Rpb24ocCkge1xyXG4gICAgICAgICAgZGVsZXRlIHAucnR4O1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0cmFuc2NlaXZlci5yZWN2RW5jb2RpbmdQYXJhbWV0ZXJzLmxlbmd0aCkge1xyXG4gICAgICAgIHBhcmFtcy5lbmNvZGluZ3MgPSB0cmFuc2NlaXZlci5yZWN2RW5jb2RpbmdQYXJhbWV0ZXJzO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHBhcmFtcy5lbmNvZGluZ3MgPSBbe31dO1xyXG4gICAgICB9XHJcbiAgICAgIHBhcmFtcy5ydGNwID0ge1xyXG4gICAgICAgIGNvbXBvdW5kOiB0cmFuc2NlaXZlci5ydGNwUGFyYW1ldGVycy5jb21wb3VuZFxyXG4gICAgICB9O1xyXG4gICAgICBpZiAodHJhbnNjZWl2ZXIucnRjcFBhcmFtZXRlcnMuY25hbWUpIHtcclxuICAgICAgICBwYXJhbXMucnRjcC5jbmFtZSA9IHRyYW5zY2VpdmVyLnJ0Y3BQYXJhbWV0ZXJzLmNuYW1lO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzLmxlbmd0aCkge1xyXG4gICAgICAgIHBhcmFtcy5ydGNwLnNzcmMgPSB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmM7XHJcbiAgICAgIH1cclxuICAgICAgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIucmVjZWl2ZShwYXJhbXMpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5zZXRMb2NhbERlc2NyaXB0aW9uID0gZnVuY3Rpb24oZGVzY3JpcHRpb24pIHtcclxuICAgIHZhciBwYyA9IHRoaXM7XHJcblxyXG4gICAgLy8gTm90ZTogcHJhbnN3ZXIgaXMgbm90IHN1cHBvcnRlZC5cclxuICAgIGlmIChbJ29mZmVyJywgJ2Fuc3dlciddLmluZGV4T2YoZGVzY3JpcHRpb24udHlwZSkgPT09IC0xKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChtYWtlRXJyb3IoJ1R5cGVFcnJvcicsXHJcbiAgICAgICAgICAnVW5zdXBwb3J0ZWQgdHlwZSBcIicgKyBkZXNjcmlwdGlvbi50eXBlICsgJ1wiJykpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghaXNBY3Rpb25BbGxvd2VkSW5TaWduYWxpbmdTdGF0ZSgnc2V0TG9jYWxEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgZGVzY3JpcHRpb24udHlwZSwgcGMuc2lnbmFsaW5nU3RhdGUpIHx8IHBjLl9pc0Nsb3NlZCkge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobWFrZUVycm9yKCdJbnZhbGlkU3RhdGVFcnJvcicsXHJcbiAgICAgICAgICAnQ2FuIG5vdCBzZXQgbG9jYWwgJyArIGRlc2NyaXB0aW9uLnR5cGUgK1xyXG4gICAgICAgICAgJyBpbiBzdGF0ZSAnICsgcGMuc2lnbmFsaW5nU3RhdGUpKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgc2VjdGlvbnM7XHJcbiAgICB2YXIgc2Vzc2lvbnBhcnQ7XHJcbiAgICBpZiAoZGVzY3JpcHRpb24udHlwZSA9PT0gJ29mZmVyJykge1xyXG4gICAgICAvLyBWRVJZIGxpbWl0ZWQgc3VwcG9ydCBmb3IgU0RQIG11bmdpbmcuIExpbWl0ZWQgdG86XHJcbiAgICAgIC8vICogY2hhbmdpbmcgdGhlIG9yZGVyIG9mIGNvZGVjc1xyXG4gICAgICBzZWN0aW9ucyA9IFNEUFV0aWxzLnNwbGl0U2VjdGlvbnMoZGVzY3JpcHRpb24uc2RwKTtcclxuICAgICAgc2Vzc2lvbnBhcnQgPSBzZWN0aW9ucy5zaGlmdCgpO1xyXG4gICAgICBzZWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKG1lZGlhU2VjdGlvbiwgc2RwTUxpbmVJbmRleCkge1xyXG4gICAgICAgIHZhciBjYXBzID0gU0RQVXRpbHMucGFyc2VSdHBQYXJhbWV0ZXJzKG1lZGlhU2VjdGlvbik7XHJcbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmxvY2FsQ2FwYWJpbGl0aWVzID0gY2FwcztcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBwYy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlciwgc2RwTUxpbmVJbmRleCkge1xyXG4gICAgICAgIHBjLl9nYXRoZXIodHJhbnNjZWl2ZXIubWlkLCBzZHBNTGluZUluZGV4KTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2UgaWYgKGRlc2NyaXB0aW9uLnR5cGUgPT09ICdhbnN3ZXInKSB7XHJcbiAgICAgIHNlY3Rpb25zID0gU0RQVXRpbHMuc3BsaXRTZWN0aW9ucyhwYy5yZW1vdGVEZXNjcmlwdGlvbi5zZHApO1xyXG4gICAgICBzZXNzaW9ucGFydCA9IHNlY3Rpb25zLnNoaWZ0KCk7XHJcbiAgICAgIHZhciBpc0ljZUxpdGUgPSBTRFBVdGlscy5tYXRjaFByZWZpeChzZXNzaW9ucGFydCxcclxuICAgICAgICAgICdhPWljZS1saXRlJykubGVuZ3RoID4gMDtcclxuICAgICAgc2VjdGlvbnMuZm9yRWFjaChmdW5jdGlvbihtZWRpYVNlY3Rpb24sIHNkcE1MaW5lSW5kZXgpIHtcclxuICAgICAgICB2YXIgdHJhbnNjZWl2ZXIgPSBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF07XHJcbiAgICAgICAgdmFyIGljZUdhdGhlcmVyID0gdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXI7XHJcbiAgICAgICAgdmFyIGljZVRyYW5zcG9ydCA9IHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydDtcclxuICAgICAgICB2YXIgZHRsc1RyYW5zcG9ydCA9IHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQ7XHJcbiAgICAgICAgdmFyIGxvY2FsQ2FwYWJpbGl0aWVzID0gdHJhbnNjZWl2ZXIubG9jYWxDYXBhYmlsaXRpZXM7XHJcbiAgICAgICAgdmFyIHJlbW90ZUNhcGFiaWxpdGllcyA9IHRyYW5zY2VpdmVyLnJlbW90ZUNhcGFiaWxpdGllcztcclxuXHJcbiAgICAgICAgLy8gdHJlYXQgYnVuZGxlLW9ubHkgYXMgbm90LXJlamVjdGVkLlxyXG4gICAgICAgIHZhciByZWplY3RlZCA9IFNEUFV0aWxzLmlzUmVqZWN0ZWQobWVkaWFTZWN0aW9uKSAmJlxyXG4gICAgICAgICAgICBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPWJ1bmRsZS1vbmx5JykubGVuZ3RoID09PSAwO1xyXG5cclxuICAgICAgICBpZiAoIXJlamVjdGVkICYmICF0cmFuc2NlaXZlci5yZWplY3RlZCkge1xyXG4gICAgICAgICAgdmFyIHJlbW90ZUljZVBhcmFtZXRlcnMgPSBTRFBVdGlscy5nZXRJY2VQYXJhbWV0ZXJzKFxyXG4gICAgICAgICAgICAgIG1lZGlhU2VjdGlvbiwgc2Vzc2lvbnBhcnQpO1xyXG4gICAgICAgICAgdmFyIHJlbW90ZUR0bHNQYXJhbWV0ZXJzID0gU0RQVXRpbHMuZ2V0RHRsc1BhcmFtZXRlcnMoXHJcbiAgICAgICAgICAgICAgbWVkaWFTZWN0aW9uLCBzZXNzaW9ucGFydCk7XHJcbiAgICAgICAgICBpZiAoaXNJY2VMaXRlKSB7XHJcbiAgICAgICAgICAgIHJlbW90ZUR0bHNQYXJhbWV0ZXJzLnJvbGUgPSAnc2VydmVyJztcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoIXBjLnVzaW5nQnVuZGxlIHx8IHNkcE1MaW5lSW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgcGMuX2dhdGhlcih0cmFuc2NlaXZlci5taWQsIHNkcE1MaW5lSW5kZXgpO1xyXG4gICAgICAgICAgICBpZiAoaWNlVHJhbnNwb3J0LnN0YXRlID09PSAnbmV3Jykge1xyXG4gICAgICAgICAgICAgIGljZVRyYW5zcG9ydC5zdGFydChpY2VHYXRoZXJlciwgcmVtb3RlSWNlUGFyYW1ldGVycyxcclxuICAgICAgICAgICAgICAgICAgaXNJY2VMaXRlID8gJ2NvbnRyb2xsaW5nJyA6ICdjb250cm9sbGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGR0bHNUcmFuc3BvcnQuc3RhdGUgPT09ICduZXcnKSB7XHJcbiAgICAgICAgICAgICAgZHRsc1RyYW5zcG9ydC5zdGFydChyZW1vdGVEdGxzUGFyYW1ldGVycyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBDYWxjdWxhdGUgaW50ZXJzZWN0aW9uIG9mIGNhcGFiaWxpdGllcy5cclxuICAgICAgICAgIHZhciBwYXJhbXMgPSBnZXRDb21tb25DYXBhYmlsaXRpZXMobG9jYWxDYXBhYmlsaXRpZXMsXHJcbiAgICAgICAgICAgICAgcmVtb3RlQ2FwYWJpbGl0aWVzKTtcclxuXHJcbiAgICAgICAgICAvLyBTdGFydCB0aGUgUlRDUnRwU2VuZGVyLiBUaGUgUlRDUnRwUmVjZWl2ZXIgZm9yIHRoaXNcclxuICAgICAgICAgIC8vIHRyYW5zY2VpdmVyIGhhcyBhbHJlYWR5IGJlZW4gc3RhcnRlZCBpbiBzZXRSZW1vdGVEZXNjcmlwdGlvbi5cclxuICAgICAgICAgIHBjLl90cmFuc2NlaXZlKHRyYW5zY2VpdmVyLFxyXG4gICAgICAgICAgICAgIHBhcmFtcy5jb2RlY3MubGVuZ3RoID4gMCxcclxuICAgICAgICAgICAgICBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwYy5sb2NhbERlc2NyaXB0aW9uID0ge1xyXG4gICAgICB0eXBlOiBkZXNjcmlwdGlvbi50eXBlLFxyXG4gICAgICBzZHA6IGRlc2NyaXB0aW9uLnNkcFxyXG4gICAgfTtcclxuICAgIGlmIChkZXNjcmlwdGlvbi50eXBlID09PSAnb2ZmZXInKSB7XHJcbiAgICAgIHBjLl91cGRhdGVTaWduYWxpbmdTdGF0ZSgnaGF2ZS1sb2NhbC1vZmZlcicpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcGMuX3VwZGF0ZVNpZ25hbGluZ1N0YXRlKCdzdGFibGUnKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgfTtcclxuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnNldFJlbW90ZURlc2NyaXB0aW9uID0gZnVuY3Rpb24oZGVzY3JpcHRpb24pIHtcclxuICAgIHZhciBwYyA9IHRoaXM7XHJcblxyXG4gICAgLy8gTm90ZTogcHJhbnN3ZXIgaXMgbm90IHN1cHBvcnRlZC5cclxuICAgIGlmIChbJ29mZmVyJywgJ2Fuc3dlciddLmluZGV4T2YoZGVzY3JpcHRpb24udHlwZSkgPT09IC0xKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChtYWtlRXJyb3IoJ1R5cGVFcnJvcicsXHJcbiAgICAgICAgICAnVW5zdXBwb3J0ZWQgdHlwZSBcIicgKyBkZXNjcmlwdGlvbi50eXBlICsgJ1wiJykpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghaXNBY3Rpb25BbGxvd2VkSW5TaWduYWxpbmdTdGF0ZSgnc2V0UmVtb3RlRGVzY3JpcHRpb24nLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uLnR5cGUsIHBjLnNpZ25hbGluZ1N0YXRlKSB8fCBwYy5faXNDbG9zZWQpIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG1ha2VFcnJvcignSW52YWxpZFN0YXRlRXJyb3InLFxyXG4gICAgICAgICAgJ0NhbiBub3Qgc2V0IHJlbW90ZSAnICsgZGVzY3JpcHRpb24udHlwZSArXHJcbiAgICAgICAgICAnIGluIHN0YXRlICcgKyBwYy5zaWduYWxpbmdTdGF0ZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBzdHJlYW1zID0ge307XHJcbiAgICBwYy5yZW1vdGVTdHJlYW1zLmZvckVhY2goZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICAgIHN0cmVhbXNbc3RyZWFtLmlkXSA9IHN0cmVhbTtcclxuICAgIH0pO1xyXG4gICAgdmFyIHJlY2VpdmVyTGlzdCA9IFtdO1xyXG4gICAgdmFyIHNlY3Rpb25zID0gU0RQVXRpbHMuc3BsaXRTZWN0aW9ucyhkZXNjcmlwdGlvbi5zZHApO1xyXG4gICAgdmFyIHNlc3Npb25wYXJ0ID0gc2VjdGlvbnMuc2hpZnQoKTtcclxuICAgIHZhciBpc0ljZUxpdGUgPSBTRFBVdGlscy5tYXRjaFByZWZpeChzZXNzaW9ucGFydCxcclxuICAgICAgICAnYT1pY2UtbGl0ZScpLmxlbmd0aCA+IDA7XHJcbiAgICB2YXIgdXNpbmdCdW5kbGUgPSBTRFBVdGlscy5tYXRjaFByZWZpeChzZXNzaW9ucGFydCxcclxuICAgICAgICAnYT1ncm91cDpCVU5ETEUgJykubGVuZ3RoID4gMDtcclxuICAgIHBjLnVzaW5nQnVuZGxlID0gdXNpbmdCdW5kbGU7XHJcbiAgICB2YXIgaWNlT3B0aW9ucyA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KHNlc3Npb25wYXJ0LFxyXG4gICAgICAgICdhPWljZS1vcHRpb25zOicpWzBdO1xyXG4gICAgaWYgKGljZU9wdGlvbnMpIHtcclxuICAgICAgcGMuY2FuVHJpY2tsZUljZUNhbmRpZGF0ZXMgPSBpY2VPcHRpb25zLnN1YnN0cigxNCkuc3BsaXQoJyAnKVxyXG4gICAgICAgICAgLmluZGV4T2YoJ3RyaWNrbGUnKSA+PSAwO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcGMuY2FuVHJpY2tsZUljZUNhbmRpZGF0ZXMgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBzZWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKG1lZGlhU2VjdGlvbiwgc2RwTUxpbmVJbmRleCkge1xyXG4gICAgICB2YXIgbGluZXMgPSBTRFBVdGlscy5zcGxpdExpbmVzKG1lZGlhU2VjdGlvbik7XHJcbiAgICAgIHZhciBraW5kID0gU0RQVXRpbHMuZ2V0S2luZChtZWRpYVNlY3Rpb24pO1xyXG4gICAgICAvLyB0cmVhdCBidW5kbGUtb25seSBhcyBub3QtcmVqZWN0ZWQuXHJcbiAgICAgIHZhciByZWplY3RlZCA9IFNEUFV0aWxzLmlzUmVqZWN0ZWQobWVkaWFTZWN0aW9uKSAmJlxyXG4gICAgICAgICAgU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1idW5kbGUtb25seScpLmxlbmd0aCA9PT0gMDtcclxuICAgICAgdmFyIHByb3RvY29sID0gbGluZXNbMF0uc3Vic3RyKDIpLnNwbGl0KCcgJylbMl07XHJcblxyXG4gICAgICB2YXIgZGlyZWN0aW9uID0gU0RQVXRpbHMuZ2V0RGlyZWN0aW9uKG1lZGlhU2VjdGlvbiwgc2Vzc2lvbnBhcnQpO1xyXG4gICAgICB2YXIgcmVtb3RlTXNpZCA9IFNEUFV0aWxzLnBhcnNlTXNpZChtZWRpYVNlY3Rpb24pO1xyXG5cclxuICAgICAgdmFyIG1pZCA9IFNEUFV0aWxzLmdldE1pZChtZWRpYVNlY3Rpb24pIHx8IFNEUFV0aWxzLmdlbmVyYXRlSWRlbnRpZmllcigpO1xyXG5cclxuICAgICAgLy8gUmVqZWN0IGRhdGFjaGFubmVscyB3aGljaCBhcmUgbm90IGltcGxlbWVudGVkIHlldC5cclxuICAgICAgaWYgKChraW5kID09PSAnYXBwbGljYXRpb24nICYmIHByb3RvY29sID09PSAnRFRMUy9TQ1RQJykgfHwgcmVqZWN0ZWQpIHtcclxuICAgICAgICAvLyBUT0RPOiB0aGlzIGlzIGRhbmdlcm91cyBpbiB0aGUgY2FzZSB3aGVyZSBhIG5vbi1yZWplY3RlZCBtLWxpbmVcclxuICAgICAgICAvLyAgICAgYmVjb21lcyByZWplY3RlZC5cclxuICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0gPSB7XHJcbiAgICAgICAgICBtaWQ6IG1pZCxcclxuICAgICAgICAgIGtpbmQ6IGtpbmQsXHJcbiAgICAgICAgICByZWplY3RlZDogdHJ1ZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIXJlamVjdGVkICYmIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XSAmJlxyXG4gICAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLnJlamVjdGVkKSB7XHJcbiAgICAgICAgLy8gcmVjeWNsZSBhIHJlamVjdGVkIHRyYW5zY2VpdmVyLlxyXG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XSA9IHBjLl9jcmVhdGVUcmFuc2NlaXZlcihraW5kLCB0cnVlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIHRyYW5zY2VpdmVyO1xyXG4gICAgICB2YXIgaWNlR2F0aGVyZXI7XHJcbiAgICAgIHZhciBpY2VUcmFuc3BvcnQ7XHJcbiAgICAgIHZhciBkdGxzVHJhbnNwb3J0O1xyXG4gICAgICB2YXIgcnRwUmVjZWl2ZXI7XHJcbiAgICAgIHZhciBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzO1xyXG4gICAgICB2YXIgcmVjdkVuY29kaW5nUGFyYW1ldGVycztcclxuICAgICAgdmFyIGxvY2FsQ2FwYWJpbGl0aWVzO1xyXG5cclxuICAgICAgdmFyIHRyYWNrO1xyXG4gICAgICAvLyBGSVhNRTogZW5zdXJlIHRoZSBtZWRpYVNlY3Rpb24gaGFzIHJ0Y3AtbXV4IHNldC5cclxuICAgICAgdmFyIHJlbW90ZUNhcGFiaWxpdGllcyA9IFNEUFV0aWxzLnBhcnNlUnRwUGFyYW1ldGVycyhtZWRpYVNlY3Rpb24pO1xyXG4gICAgICB2YXIgcmVtb3RlSWNlUGFyYW1ldGVycztcclxuICAgICAgdmFyIHJlbW90ZUR0bHNQYXJhbWV0ZXJzO1xyXG4gICAgICBpZiAoIXJlamVjdGVkKSB7XHJcbiAgICAgICAgcmVtb3RlSWNlUGFyYW1ldGVycyA9IFNEUFV0aWxzLmdldEljZVBhcmFtZXRlcnMobWVkaWFTZWN0aW9uLFxyXG4gICAgICAgICAgICBzZXNzaW9ucGFydCk7XHJcbiAgICAgICAgcmVtb3RlRHRsc1BhcmFtZXRlcnMgPSBTRFBVdGlscy5nZXREdGxzUGFyYW1ldGVycyhtZWRpYVNlY3Rpb24sXHJcbiAgICAgICAgICAgIHNlc3Npb25wYXJ0KTtcclxuICAgICAgICByZW1vdGVEdGxzUGFyYW1ldGVycy5yb2xlID0gJ2NsaWVudCc7XHJcbiAgICAgIH1cclxuICAgICAgcmVjdkVuY29kaW5nUGFyYW1ldGVycyA9XHJcbiAgICAgICAgICBTRFBVdGlscy5wYXJzZVJ0cEVuY29kaW5nUGFyYW1ldGVycyhtZWRpYVNlY3Rpb24pO1xyXG5cclxuICAgICAgdmFyIHJ0Y3BQYXJhbWV0ZXJzID0gU0RQVXRpbHMucGFyc2VSdGNwUGFyYW1ldGVycyhtZWRpYVNlY3Rpb24pO1xyXG5cclxuICAgICAgdmFyIGlzQ29tcGxldGUgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sXHJcbiAgICAgICAgICAnYT1lbmQtb2YtY2FuZGlkYXRlcycsIHNlc3Npb25wYXJ0KS5sZW5ndGggPiAwO1xyXG4gICAgICB2YXIgY2FuZHMgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPWNhbmRpZGF0ZTonKVxyXG4gICAgICAgICAgLm1hcChmdW5jdGlvbihjYW5kKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBTRFBVdGlscy5wYXJzZUNhbmRpZGF0ZShjYW5kKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uKGNhbmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNhbmQuY29tcG9uZW50ID09PSAxO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBDaGVjayBpZiB3ZSBjYW4gdXNlIEJVTkRMRSBhbmQgZGlzcG9zZSB0cmFuc3BvcnRzLlxyXG4gICAgICBpZiAoKGRlc2NyaXB0aW9uLnR5cGUgPT09ICdvZmZlcicgfHwgZGVzY3JpcHRpb24udHlwZSA9PT0gJ2Fuc3dlcicpICYmXHJcbiAgICAgICAgICAhcmVqZWN0ZWQgJiYgdXNpbmdCdW5kbGUgJiYgc2RwTUxpbmVJbmRleCA+IDAgJiZcclxuICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XSkge1xyXG4gICAgICAgIHBjLl9kaXNwb3NlSWNlQW5kRHRsc1RyYW5zcG9ydHMoc2RwTUxpbmVJbmRleCk7XHJcbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmljZUdhdGhlcmVyID1cclxuICAgICAgICAgICAgcGMudHJhbnNjZWl2ZXJzWzBdLmljZUdhdGhlcmVyO1xyXG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5pY2VUcmFuc3BvcnQgPVxyXG4gICAgICAgICAgICBwYy50cmFuc2NlaXZlcnNbMF0uaWNlVHJhbnNwb3J0O1xyXG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5kdGxzVHJhbnNwb3J0ID1cclxuICAgICAgICAgICAgcGMudHJhbnNjZWl2ZXJzWzBdLmR0bHNUcmFuc3BvcnQ7XHJcbiAgICAgICAgaWYgKHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5ydHBTZW5kZXIpIHtcclxuICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5ydHBTZW5kZXIuc2V0VHJhbnNwb3J0KFxyXG4gICAgICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1swXS5kdGxzVHJhbnNwb3J0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5ydHBSZWNlaXZlcikge1xyXG4gICAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLnJ0cFJlY2VpdmVyLnNldFRyYW5zcG9ydChcclxuICAgICAgICAgICAgICBwYy50cmFuc2NlaXZlcnNbMF0uZHRsc1RyYW5zcG9ydCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChkZXNjcmlwdGlvbi50eXBlID09PSAnb2ZmZXInICYmICFyZWplY3RlZCkge1xyXG4gICAgICAgIHRyYW5zY2VpdmVyID0gcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdIHx8XHJcbiAgICAgICAgICAgIHBjLl9jcmVhdGVUcmFuc2NlaXZlcihraW5kKTtcclxuICAgICAgICB0cmFuc2NlaXZlci5taWQgPSBtaWQ7XHJcblxyXG4gICAgICAgIGlmICghdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIpIHtcclxuICAgICAgICAgIHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyID0gcGMuX2NyZWF0ZUljZUdhdGhlcmVyKHNkcE1MaW5lSW5kZXgsXHJcbiAgICAgICAgICAgICAgdXNpbmdCdW5kbGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNhbmRzLmxlbmd0aCAmJiB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQuc3RhdGUgPT09ICduZXcnKSB7XHJcbiAgICAgICAgICBpZiAoaXNDb21wbGV0ZSAmJiAoIXVzaW5nQnVuZGxlIHx8IHNkcE1MaW5lSW5kZXggPT09IDApKSB7XHJcbiAgICAgICAgICAgIHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydC5zZXRSZW1vdGVDYW5kaWRhdGVzKGNhbmRzKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNhbmRzLmZvckVhY2goZnVuY3Rpb24oY2FuZGlkYXRlKSB7XHJcbiAgICAgICAgICAgICAgbWF5YmVBZGRDYW5kaWRhdGUodHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LCBjYW5kaWRhdGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxvY2FsQ2FwYWJpbGl0aWVzID0gd2luZG93LlJUQ1J0cFJlY2VpdmVyLmdldENhcGFiaWxpdGllcyhraW5kKTtcclxuXHJcbiAgICAgICAgLy8gZmlsdGVyIFJUWCB1bnRpbCBhZGRpdGlvbmFsIHN0dWZmIG5lZWRlZCBmb3IgUlRYIGlzIGltcGxlbWVudGVkXHJcbiAgICAgICAgLy8gaW4gYWRhcHRlci5qc1xyXG4gICAgICAgIGlmIChlZGdlVmVyc2lvbiA8IDE1MDE5KSB7XHJcbiAgICAgICAgICBsb2NhbENhcGFiaWxpdGllcy5jb2RlY3MgPSBsb2NhbENhcGFiaWxpdGllcy5jb2RlY3MuZmlsdGVyKFxyXG4gICAgICAgICAgICAgIGZ1bmN0aW9uKGNvZGVjKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29kZWMubmFtZSAhPT0gJ3J0eCc7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzID0gdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVycyB8fCBbe1xyXG4gICAgICAgICAgc3NyYzogKDIgKiBzZHBNTGluZUluZGV4ICsgMikgKiAxMDAxXHJcbiAgICAgICAgfV07XHJcblxyXG4gICAgICAgIC8vIFRPRE86IHJld3JpdGUgdG8gdXNlIGh0dHA6Ly93M2MuZ2l0aHViLmlvL3dlYnJ0Yy1wYy8jc2V0LWFzc29jaWF0ZWQtcmVtb3RlLXN0cmVhbXNcclxuICAgICAgICB2YXIgaXNOZXdUcmFjayA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdzZW5kcmVjdicgfHwgZGlyZWN0aW9uID09PSAnc2VuZG9ubHknKSB7XHJcbiAgICAgICAgICBpc05ld1RyYWNrID0gIXRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyO1xyXG4gICAgICAgICAgcnRwUmVjZWl2ZXIgPSB0cmFuc2NlaXZlci5ydHBSZWNlaXZlciB8fFxyXG4gICAgICAgICAgICAgIG5ldyB3aW5kb3cuUlRDUnRwUmVjZWl2ZXIodHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydCwga2luZCk7XHJcblxyXG4gICAgICAgICAgaWYgKGlzTmV3VHJhY2spIHtcclxuICAgICAgICAgICAgdmFyIHN0cmVhbTtcclxuICAgICAgICAgICAgdHJhY2sgPSBydHBSZWNlaXZlci50cmFjaztcclxuICAgICAgICAgICAgLy8gRklYTUU6IGRvZXMgbm90IHdvcmsgd2l0aCBQbGFuIEIuXHJcbiAgICAgICAgICAgIGlmIChyZW1vdGVNc2lkICYmIHJlbW90ZU1zaWQuc3RyZWFtID09PSAnLScpIHtcclxuICAgICAgICAgICAgICAvLyBuby1vcC4gYSBzdHJlYW0gaWQgb2YgJy0nIG1lYW5zOiBubyBhc3NvY2lhdGVkIHN0cmVhbS5cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChyZW1vdGVNc2lkKSB7XHJcbiAgICAgICAgICAgICAgaWYgKCFzdHJlYW1zW3JlbW90ZU1zaWQuc3RyZWFtXSkge1xyXG4gICAgICAgICAgICAgICAgc3RyZWFtc1tyZW1vdGVNc2lkLnN0cmVhbV0gPSBuZXcgd2luZG93Lk1lZGlhU3RyZWFtKCk7XHJcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc3RyZWFtc1tyZW1vdGVNc2lkLnN0cmVhbV0sICdpZCcsIHtcclxuICAgICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVtb3RlTXNpZC5zdHJlYW07XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodHJhY2ssICdpZCcsIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiByZW1vdGVNc2lkLnRyYWNrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIHN0cmVhbSA9IHN0cmVhbXNbcmVtb3RlTXNpZC5zdHJlYW1dO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGlmICghc3RyZWFtcy5kZWZhdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBzdHJlYW1zLmRlZmF1bHQgPSBuZXcgd2luZG93Lk1lZGlhU3RyZWFtKCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHN0cmVhbSA9IHN0cmVhbXMuZGVmYXVsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc3RyZWFtKSB7XHJcbiAgICAgICAgICAgICAgYWRkVHJhY2tUb1N0cmVhbUFuZEZpcmVFdmVudCh0cmFjaywgc3RyZWFtKTtcclxuICAgICAgICAgICAgICB0cmFuc2NlaXZlci5hc3NvY2lhdGVkUmVtb3RlTWVkaWFTdHJlYW1zLnB1c2goc3RyZWFtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZWNlaXZlckxpc3QucHVzaChbdHJhY2ssIHJ0cFJlY2VpdmVyLCBzdHJlYW1dKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyICYmIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyLnRyYWNrKSB7XHJcbiAgICAgICAgICB0cmFuc2NlaXZlci5hc3NvY2lhdGVkUmVtb3RlTWVkaWFTdHJlYW1zLmZvckVhY2goZnVuY3Rpb24ocykge1xyXG4gICAgICAgICAgICB2YXIgbmF0aXZlVHJhY2sgPSBzLmdldFRyYWNrcygpLmZpbmQoZnVuY3Rpb24odCkge1xyXG4gICAgICAgICAgICAgIHJldHVybiB0LmlkID09PSB0cmFuc2NlaXZlci5ydHBSZWNlaXZlci50cmFjay5pZDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmIChuYXRpdmVUcmFjaykge1xyXG4gICAgICAgICAgICAgIHJlbW92ZVRyYWNrRnJvbVN0cmVhbUFuZEZpcmVFdmVudChuYXRpdmVUcmFjaywgcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdHJhbnNjZWl2ZXIuYXNzb2NpYXRlZFJlbW90ZU1lZGlhU3RyZWFtcyA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdHJhbnNjZWl2ZXIubG9jYWxDYXBhYmlsaXRpZXMgPSBsb2NhbENhcGFiaWxpdGllcztcclxuICAgICAgICB0cmFuc2NlaXZlci5yZW1vdGVDYXBhYmlsaXRpZXMgPSByZW1vdGVDYXBhYmlsaXRpZXM7XHJcbiAgICAgICAgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIgPSBydHBSZWNlaXZlcjtcclxuICAgICAgICB0cmFuc2NlaXZlci5ydGNwUGFyYW1ldGVycyA9IHJ0Y3BQYXJhbWV0ZXJzO1xyXG4gICAgICAgIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnMgPSBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzO1xyXG4gICAgICAgIHRyYW5zY2VpdmVyLnJlY3ZFbmNvZGluZ1BhcmFtZXRlcnMgPSByZWN2RW5jb2RpbmdQYXJhbWV0ZXJzO1xyXG5cclxuICAgICAgICAvLyBTdGFydCB0aGUgUlRDUnRwUmVjZWl2ZXIgbm93LiBUaGUgUlRQU2VuZGVyIGlzIHN0YXJ0ZWQgaW5cclxuICAgICAgICAvLyBzZXRMb2NhbERlc2NyaXB0aW9uLlxyXG4gICAgICAgIHBjLl90cmFuc2NlaXZlKHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XSxcclxuICAgICAgICAgICAgZmFsc2UsXHJcbiAgICAgICAgICAgIGlzTmV3VHJhY2spO1xyXG4gICAgICB9IGVsc2UgaWYgKGRlc2NyaXB0aW9uLnR5cGUgPT09ICdhbnN3ZXInICYmICFyZWplY3RlZCkge1xyXG4gICAgICAgIHRyYW5zY2VpdmVyID0gcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdO1xyXG4gICAgICAgIGljZUdhdGhlcmVyID0gdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXI7XHJcbiAgICAgICAgaWNlVHJhbnNwb3J0ID0gdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0O1xyXG4gICAgICAgIGR0bHNUcmFuc3BvcnQgPSB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0O1xyXG4gICAgICAgIHJ0cFJlY2VpdmVyID0gdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXI7XHJcbiAgICAgICAgc2VuZEVuY29kaW5nUGFyYW1ldGVycyA9IHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnM7XHJcbiAgICAgICAgbG9jYWxDYXBhYmlsaXRpZXMgPSB0cmFuc2NlaXZlci5sb2NhbENhcGFiaWxpdGllcztcclxuXHJcbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLnJlY3ZFbmNvZGluZ1BhcmFtZXRlcnMgPVxyXG4gICAgICAgICAgICByZWN2RW5jb2RpbmdQYXJhbWV0ZXJzO1xyXG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5yZW1vdGVDYXBhYmlsaXRpZXMgPVxyXG4gICAgICAgICAgICByZW1vdGVDYXBhYmlsaXRpZXM7XHJcbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLnJ0Y3BQYXJhbWV0ZXJzID0gcnRjcFBhcmFtZXRlcnM7XHJcblxyXG4gICAgICAgIGlmIChjYW5kcy5sZW5ndGggJiYgaWNlVHJhbnNwb3J0LnN0YXRlID09PSAnbmV3Jykge1xyXG4gICAgICAgICAgaWYgKChpc0ljZUxpdGUgfHwgaXNDb21wbGV0ZSkgJiZcclxuICAgICAgICAgICAgICAoIXVzaW5nQnVuZGxlIHx8IHNkcE1MaW5lSW5kZXggPT09IDApKSB7XHJcbiAgICAgICAgICAgIGljZVRyYW5zcG9ydC5zZXRSZW1vdGVDYW5kaWRhdGVzKGNhbmRzKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNhbmRzLmZvckVhY2goZnVuY3Rpb24oY2FuZGlkYXRlKSB7XHJcbiAgICAgICAgICAgICAgbWF5YmVBZGRDYW5kaWRhdGUodHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LCBjYW5kaWRhdGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdXNpbmdCdW5kbGUgfHwgc2RwTUxpbmVJbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgaWYgKGljZVRyYW5zcG9ydC5zdGF0ZSA9PT0gJ25ldycpIHtcclxuICAgICAgICAgICAgaWNlVHJhbnNwb3J0LnN0YXJ0KGljZUdhdGhlcmVyLCByZW1vdGVJY2VQYXJhbWV0ZXJzLFxyXG4gICAgICAgICAgICAgICAgJ2NvbnRyb2xsaW5nJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoZHRsc1RyYW5zcG9ydC5zdGF0ZSA9PT0gJ25ldycpIHtcclxuICAgICAgICAgICAgZHRsc1RyYW5zcG9ydC5zdGFydChyZW1vdGVEdGxzUGFyYW1ldGVycyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwYy5fdHJhbnNjZWl2ZSh0cmFuc2NlaXZlcixcclxuICAgICAgICAgICAgZGlyZWN0aW9uID09PSAnc2VuZHJlY3YnIHx8IGRpcmVjdGlvbiA9PT0gJ3JlY3Zvbmx5JyxcclxuICAgICAgICAgICAgZGlyZWN0aW9uID09PSAnc2VuZHJlY3YnIHx8IGRpcmVjdGlvbiA9PT0gJ3NlbmRvbmx5Jyk7XHJcblxyXG4gICAgICAgIC8vIFRPRE86IHJld3JpdGUgdG8gdXNlIGh0dHA6Ly93M2MuZ2l0aHViLmlvL3dlYnJ0Yy1wYy8jc2V0LWFzc29jaWF0ZWQtcmVtb3RlLXN0cmVhbXNcclxuICAgICAgICBpZiAocnRwUmVjZWl2ZXIgJiZcclxuICAgICAgICAgICAgKGRpcmVjdGlvbiA9PT0gJ3NlbmRyZWN2JyB8fCBkaXJlY3Rpb24gPT09ICdzZW5kb25seScpKSB7XHJcbiAgICAgICAgICB0cmFjayA9IHJ0cFJlY2VpdmVyLnRyYWNrO1xyXG4gICAgICAgICAgaWYgKHJlbW90ZU1zaWQpIHtcclxuICAgICAgICAgICAgaWYgKCFzdHJlYW1zW3JlbW90ZU1zaWQuc3RyZWFtXSkge1xyXG4gICAgICAgICAgICAgIHN0cmVhbXNbcmVtb3RlTXNpZC5zdHJlYW1dID0gbmV3IHdpbmRvdy5NZWRpYVN0cmVhbSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFkZFRyYWNrVG9TdHJlYW1BbmRGaXJlRXZlbnQodHJhY2ssIHN0cmVhbXNbcmVtb3RlTXNpZC5zdHJlYW1dKTtcclxuICAgICAgICAgICAgcmVjZWl2ZXJMaXN0LnB1c2goW3RyYWNrLCBydHBSZWNlaXZlciwgc3RyZWFtc1tyZW1vdGVNc2lkLnN0cmVhbV1dKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICghc3RyZWFtcy5kZWZhdWx0KSB7XHJcbiAgICAgICAgICAgICAgc3RyZWFtcy5kZWZhdWx0ID0gbmV3IHdpbmRvdy5NZWRpYVN0cmVhbSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFkZFRyYWNrVG9TdHJlYW1BbmRGaXJlRXZlbnQodHJhY2ssIHN0cmVhbXMuZGVmYXVsdCk7XHJcbiAgICAgICAgICAgIHJlY2VpdmVyTGlzdC5wdXNoKFt0cmFjaywgcnRwUmVjZWl2ZXIsIHN0cmVhbXMuZGVmYXVsdF0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyBGSVhNRTogYWN0dWFsbHkgdGhlIHJlY2VpdmVyIHNob3VsZCBiZSBjcmVhdGVkIGxhdGVyLlxyXG4gICAgICAgICAgZGVsZXRlIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHBjLl9kdGxzUm9sZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHBjLl9kdGxzUm9sZSA9IGRlc2NyaXB0aW9uLnR5cGUgPT09ICdvZmZlcicgPyAnYWN0aXZlJyA6ICdwYXNzaXZlJztcclxuICAgIH1cclxuXHJcbiAgICBwYy5yZW1vdGVEZXNjcmlwdGlvbiA9IHtcclxuICAgICAgdHlwZTogZGVzY3JpcHRpb24udHlwZSxcclxuICAgICAgc2RwOiBkZXNjcmlwdGlvbi5zZHBcclxuICAgIH07XHJcbiAgICBpZiAoZGVzY3JpcHRpb24udHlwZSA9PT0gJ29mZmVyJykge1xyXG4gICAgICBwYy5fdXBkYXRlU2lnbmFsaW5nU3RhdGUoJ2hhdmUtcmVtb3RlLW9mZmVyJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBwYy5fdXBkYXRlU2lnbmFsaW5nU3RhdGUoJ3N0YWJsZScpO1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmtleXMoc3RyZWFtcykuZm9yRWFjaChmdW5jdGlvbihzaWQpIHtcclxuICAgICAgdmFyIHN0cmVhbSA9IHN0cmVhbXNbc2lkXTtcclxuICAgICAgaWYgKHN0cmVhbS5nZXRUcmFja3MoKS5sZW5ndGgpIHtcclxuICAgICAgICBpZiAocGMucmVtb3RlU3RyZWFtcy5pbmRleE9mKHN0cmVhbSkgPT09IC0xKSB7XHJcbiAgICAgICAgICBwYy5yZW1vdGVTdHJlYW1zLnB1c2goc3RyZWFtKTtcclxuICAgICAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgnYWRkc3RyZWFtJyk7XHJcbiAgICAgICAgICBldmVudC5zdHJlYW0gPSBzdHJlYW07XHJcbiAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcGMuX2Rpc3BhdGNoRXZlbnQoJ2FkZHN0cmVhbScsIGV2ZW50KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVjZWl2ZXJMaXN0LmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgICAgICAgdmFyIHRyYWNrID0gaXRlbVswXTtcclxuICAgICAgICAgIHZhciByZWNlaXZlciA9IGl0ZW1bMV07XHJcbiAgICAgICAgICBpZiAoc3RyZWFtLmlkICE9PSBpdGVtWzJdLmlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGZpcmVBZGRUcmFjayhwYywgdHJhY2ssIHJlY2VpdmVyLCBbc3RyZWFtXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmVjZWl2ZXJMaXN0LmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgICBpZiAoaXRlbVsyXSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBmaXJlQWRkVHJhY2socGMsIGl0ZW1bMF0sIGl0ZW1bMV0sIFtdKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIGNoZWNrIHdoZXRoZXIgYWRkSWNlQ2FuZGlkYXRlKHt9KSB3YXMgY2FsbGVkIHdpdGhpbiBmb3VyIHNlY29uZHMgYWZ0ZXJcclxuICAgIC8vIHNldFJlbW90ZURlc2NyaXB0aW9uLlxyXG4gICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmICghKHBjICYmIHBjLnRyYW5zY2VpdmVycykpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgcGMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcclxuICAgICAgICBpZiAodHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0ICYmXHJcbiAgICAgICAgICAgIHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydC5zdGF0ZSA9PT0gJ25ldycgJiZcclxuICAgICAgICAgICAgdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LmdldFJlbW90ZUNhbmRpZGF0ZXMoKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ1RpbWVvdXQgZm9yIGFkZFJlbW90ZUNhbmRpZGF0ZS4gQ29uc2lkZXIgc2VuZGluZyAnICtcclxuICAgICAgICAgICAgICAnYW4gZW5kLW9mLWNhbmRpZGF0ZXMgbm90aWZpY2F0aW9uJyk7XHJcbiAgICAgICAgICB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQuYWRkUmVtb3RlQ2FuZGlkYXRlKHt9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSwgNDAwMCk7XHJcblxyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gIH07XHJcblxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xyXG4gICAgICAvKiBub3QgeWV0XHJcbiAgICAgIGlmICh0cmFuc2NlaXZlci5pY2VHYXRoZXJlcikge1xyXG4gICAgICAgIHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyLmNsb3NlKCk7XHJcbiAgICAgIH1cclxuICAgICAgKi9cclxuICAgICAgaWYgKHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydCkge1xyXG4gICAgICAgIHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydC5zdG9wKCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQpIHtcclxuICAgICAgICB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0LnN0b3AoKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodHJhbnNjZWl2ZXIucnRwU2VuZGVyKSB7XHJcbiAgICAgICAgdHJhbnNjZWl2ZXIucnRwU2VuZGVyLnN0b3AoKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIpIHtcclxuICAgICAgICB0cmFuc2NlaXZlci5ydHBSZWNlaXZlci5zdG9wKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgLy8gRklYTUU6IGNsZWFuIHVwIHRyYWNrcywgbG9jYWwgc3RyZWFtcywgcmVtb3RlIHN0cmVhbXMsIGV0Y1xyXG4gICAgdGhpcy5faXNDbG9zZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5fdXBkYXRlU2lnbmFsaW5nU3RhdGUoJ2Nsb3NlZCcpO1xyXG4gIH07XHJcblxyXG4gIC8vIFVwZGF0ZSB0aGUgc2lnbmFsaW5nIHN0YXRlLlxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fdXBkYXRlU2lnbmFsaW5nU3RhdGUgPSBmdW5jdGlvbihuZXdTdGF0ZSkge1xyXG4gICAgdGhpcy5zaWduYWxpbmdTdGF0ZSA9IG5ld1N0YXRlO1xyXG4gICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdzaWduYWxpbmdzdGF0ZWNoYW5nZScpO1xyXG4gICAgdGhpcy5fZGlzcGF0Y2hFdmVudCgnc2lnbmFsaW5nc3RhdGVjaGFuZ2UnLCBldmVudCk7XHJcbiAgfTtcclxuXHJcbiAgLy8gRGV0ZXJtaW5lIHdoZXRoZXIgdG8gZmlyZSB0aGUgbmVnb3RpYXRpb25uZWVkZWQgZXZlbnQuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl9tYXliZUZpcmVOZWdvdGlhdGlvbk5lZWRlZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHBjID0gdGhpcztcclxuICAgIGlmICh0aGlzLnNpZ25hbGluZ1N0YXRlICE9PSAnc3RhYmxlJyB8fCB0aGlzLm5lZWROZWdvdGlhdGlvbiA9PT0gdHJ1ZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLm5lZWROZWdvdGlhdGlvbiA9IHRydWU7XHJcbiAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgaWYgKHBjLm5lZWROZWdvdGlhdGlvbikge1xyXG4gICAgICAgIHBjLm5lZWROZWdvdGlhdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgnbmVnb3RpYXRpb25uZWVkZWQnKTtcclxuICAgICAgICBwYy5fZGlzcGF0Y2hFdmVudCgnbmVnb3RpYXRpb25uZWVkZWQnLCBldmVudCk7XHJcbiAgICAgIH1cclxuICAgIH0sIDApO1xyXG4gIH07XHJcblxyXG4gIC8vIFVwZGF0ZSB0aGUgaWNlIGNvbm5lY3Rpb24gc3RhdGUuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl91cGRhdGVJY2VDb25uZWN0aW9uU3RhdGUgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBuZXdTdGF0ZTtcclxuICAgIHZhciBzdGF0ZXMgPSB7XHJcbiAgICAgICduZXcnOiAwLFxyXG4gICAgICBjbG9zZWQ6IDAsXHJcbiAgICAgIGNoZWNraW5nOiAwLFxyXG4gICAgICBjb25uZWN0ZWQ6IDAsXHJcbiAgICAgIGNvbXBsZXRlZDogMCxcclxuICAgICAgZGlzY29ubmVjdGVkOiAwLFxyXG4gICAgICBmYWlsZWQ6IDBcclxuICAgIH07XHJcbiAgICB0aGlzLnRyYW5zY2VpdmVycy5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XHJcbiAgICAgIHN0YXRlc1t0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQuc3RhdGVdKys7XHJcbiAgICB9KTtcclxuXHJcbiAgICBuZXdTdGF0ZSA9ICduZXcnO1xyXG4gICAgaWYgKHN0YXRlcy5mYWlsZWQgPiAwKSB7XHJcbiAgICAgIG5ld1N0YXRlID0gJ2ZhaWxlZCc7XHJcbiAgICB9IGVsc2UgaWYgKHN0YXRlcy5jaGVja2luZyA+IDApIHtcclxuICAgICAgbmV3U3RhdGUgPSAnY2hlY2tpbmcnO1xyXG4gICAgfSBlbHNlIGlmIChzdGF0ZXMuZGlzY29ubmVjdGVkID4gMCkge1xyXG4gICAgICBuZXdTdGF0ZSA9ICdkaXNjb25uZWN0ZWQnO1xyXG4gICAgfSBlbHNlIGlmIChzdGF0ZXMubmV3ID4gMCkge1xyXG4gICAgICBuZXdTdGF0ZSA9ICduZXcnO1xyXG4gICAgfSBlbHNlIGlmIChzdGF0ZXMuY29ubmVjdGVkID4gMCkge1xyXG4gICAgICBuZXdTdGF0ZSA9ICdjb25uZWN0ZWQnO1xyXG4gICAgfSBlbHNlIGlmIChzdGF0ZXMuY29tcGxldGVkID4gMCkge1xyXG4gICAgICBuZXdTdGF0ZSA9ICdjb21wbGV0ZWQnO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChuZXdTdGF0ZSAhPT0gdGhpcy5pY2VDb25uZWN0aW9uU3RhdGUpIHtcclxuICAgICAgdGhpcy5pY2VDb25uZWN0aW9uU3RhdGUgPSBuZXdTdGF0ZTtcclxuICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdpY2Vjb25uZWN0aW9uc3RhdGVjaGFuZ2UnKTtcclxuICAgICAgdGhpcy5fZGlzcGF0Y2hFdmVudCgnaWNlY29ubmVjdGlvbnN0YXRlY2hhbmdlJywgZXZlbnQpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8vIFVwZGF0ZSB0aGUgY29ubmVjdGlvbiBzdGF0ZS5cclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX3VwZGF0ZUNvbm5lY3Rpb25TdGF0ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIG5ld1N0YXRlO1xyXG4gICAgdmFyIHN0YXRlcyA9IHtcclxuICAgICAgJ25ldyc6IDAsXHJcbiAgICAgIGNsb3NlZDogMCxcclxuICAgICAgY29ubmVjdGluZzogMCxcclxuICAgICAgY29ubmVjdGVkOiAwLFxyXG4gICAgICBjb21wbGV0ZWQ6IDAsXHJcbiAgICAgIGRpc2Nvbm5lY3RlZDogMCxcclxuICAgICAgZmFpbGVkOiAwXHJcbiAgICB9O1xyXG4gICAgdGhpcy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xyXG4gICAgICBzdGF0ZXNbdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LnN0YXRlXSsrO1xyXG4gICAgICBzdGF0ZXNbdHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydC5zdGF0ZV0rKztcclxuICAgIH0pO1xyXG4gICAgLy8gSUNFVHJhbnNwb3J0LmNvbXBsZXRlZCBhbmQgY29ubmVjdGVkIGFyZSB0aGUgc2FtZSBmb3IgdGhpcyBwdXJwb3NlLlxyXG4gICAgc3RhdGVzLmNvbm5lY3RlZCArPSBzdGF0ZXMuY29tcGxldGVkO1xyXG5cclxuICAgIG5ld1N0YXRlID0gJ25ldyc7XHJcbiAgICBpZiAoc3RhdGVzLmZhaWxlZCA+IDApIHtcclxuICAgICAgbmV3U3RhdGUgPSAnZmFpbGVkJztcclxuICAgIH0gZWxzZSBpZiAoc3RhdGVzLmNvbm5lY3RpbmcgPiAwKSB7XHJcbiAgICAgIG5ld1N0YXRlID0gJ2Nvbm5lY3RpbmcnO1xyXG4gICAgfSBlbHNlIGlmIChzdGF0ZXMuZGlzY29ubmVjdGVkID4gMCkge1xyXG4gICAgICBuZXdTdGF0ZSA9ICdkaXNjb25uZWN0ZWQnO1xyXG4gICAgfSBlbHNlIGlmIChzdGF0ZXMubmV3ID4gMCkge1xyXG4gICAgICBuZXdTdGF0ZSA9ICduZXcnO1xyXG4gICAgfSBlbHNlIGlmIChzdGF0ZXMuY29ubmVjdGVkID4gMCkge1xyXG4gICAgICBuZXdTdGF0ZSA9ICdjb25uZWN0ZWQnO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChuZXdTdGF0ZSAhPT0gdGhpcy5jb25uZWN0aW9uU3RhdGUpIHtcclxuICAgICAgdGhpcy5jb25uZWN0aW9uU3RhdGUgPSBuZXdTdGF0ZTtcclxuICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdjb25uZWN0aW9uc3RhdGVjaGFuZ2UnKTtcclxuICAgICAgdGhpcy5fZGlzcGF0Y2hFdmVudCgnY29ubmVjdGlvbnN0YXRlY2hhbmdlJywgZXZlbnQpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5jcmVhdGVPZmZlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHBjID0gdGhpcztcclxuXHJcbiAgICBpZiAocGMuX2lzQ2xvc2VkKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChtYWtlRXJyb3IoJ0ludmFsaWRTdGF0ZUVycm9yJyxcclxuICAgICAgICAgICdDYW4gbm90IGNhbGwgY3JlYXRlT2ZmZXIgYWZ0ZXIgY2xvc2UnKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG51bUF1ZGlvVHJhY2tzID0gcGMudHJhbnNjZWl2ZXJzLmZpbHRlcihmdW5jdGlvbih0KSB7XHJcbiAgICAgIHJldHVybiB0LmtpbmQgPT09ICdhdWRpbyc7XHJcbiAgICB9KS5sZW5ndGg7XHJcbiAgICB2YXIgbnVtVmlkZW9UcmFja3MgPSBwYy50cmFuc2NlaXZlcnMuZmlsdGVyKGZ1bmN0aW9uKHQpIHtcclxuICAgICAgcmV0dXJuIHQua2luZCA9PT0gJ3ZpZGVvJztcclxuICAgIH0pLmxlbmd0aDtcclxuXHJcbiAgICAvLyBEZXRlcm1pbmUgbnVtYmVyIG9mIGF1ZGlvIGFuZCB2aWRlbyB0cmFja3Mgd2UgbmVlZCB0byBzZW5kL3JlY3YuXHJcbiAgICB2YXIgb2ZmZXJPcHRpb25zID0gYXJndW1lbnRzWzBdO1xyXG4gICAgaWYgKG9mZmVyT3B0aW9ucykge1xyXG4gICAgICAvLyBSZWplY3QgQ2hyb21lIGxlZ2FjeSBjb25zdHJhaW50cy5cclxuICAgICAgaWYgKG9mZmVyT3B0aW9ucy5tYW5kYXRvcnkgfHwgb2ZmZXJPcHRpb25zLm9wdGlvbmFsKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcclxuICAgICAgICAgICAgJ0xlZ2FjeSBtYW5kYXRvcnkvb3B0aW9uYWwgY29uc3RyYWludHMgbm90IHN1cHBvcnRlZC4nKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW8gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbyA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgbnVtQXVkaW9UcmFja3MgPSAxO1xyXG4gICAgICAgIH0gZWxzZSBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW8gPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICBudW1BdWRpb1RyYWNrcyA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG51bUF1ZGlvVHJhY2tzID0gb2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW87XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVWaWRlbyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvID09PSB0cnVlKSB7XHJcbiAgICAgICAgICBudW1WaWRlb1RyYWNrcyA9IDE7XHJcbiAgICAgICAgfSBlbHNlIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVWaWRlbyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgIG51bVZpZGVvVHJhY2tzID0gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbnVtVmlkZW9UcmFja3MgPSBvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVWaWRlbztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwYy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xyXG4gICAgICBpZiAodHJhbnNjZWl2ZXIua2luZCA9PT0gJ2F1ZGlvJykge1xyXG4gICAgICAgIG51bUF1ZGlvVHJhY2tzLS07XHJcbiAgICAgICAgaWYgKG51bUF1ZGlvVHJhY2tzIDwgMCkge1xyXG4gICAgICAgICAgdHJhbnNjZWl2ZXIud2FudFJlY2VpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIua2luZCA9PT0gJ3ZpZGVvJykge1xyXG4gICAgICAgIG51bVZpZGVvVHJhY2tzLS07XHJcbiAgICAgICAgaWYgKG51bVZpZGVvVHJhY2tzIDwgMCkge1xyXG4gICAgICAgICAgdHJhbnNjZWl2ZXIud2FudFJlY2VpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIENyZWF0ZSBNLWxpbmVzIGZvciByZWN2b25seSBzdHJlYW1zLlxyXG4gICAgd2hpbGUgKG51bUF1ZGlvVHJhY2tzID4gMCB8fCBudW1WaWRlb1RyYWNrcyA+IDApIHtcclxuICAgICAgaWYgKG51bUF1ZGlvVHJhY2tzID4gMCkge1xyXG4gICAgICAgIHBjLl9jcmVhdGVUcmFuc2NlaXZlcignYXVkaW8nKTtcclxuICAgICAgICBudW1BdWRpb1RyYWNrcy0tO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChudW1WaWRlb1RyYWNrcyA+IDApIHtcclxuICAgICAgICBwYy5fY3JlYXRlVHJhbnNjZWl2ZXIoJ3ZpZGVvJyk7XHJcbiAgICAgICAgbnVtVmlkZW9UcmFja3MtLTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBzZHAgPSBTRFBVdGlscy53cml0ZVNlc3Npb25Cb2lsZXJwbGF0ZShwYy5fc2RwU2Vzc2lvbklkLFxyXG4gICAgICAgIHBjLl9zZHBTZXNzaW9uVmVyc2lvbisrKTtcclxuICAgIHBjLnRyYW5zY2VpdmVycy5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zY2VpdmVyLCBzZHBNTGluZUluZGV4KSB7XHJcbiAgICAgIC8vIEZvciBlYWNoIHRyYWNrLCBjcmVhdGUgYW4gaWNlIGdhdGhlcmVyLCBpY2UgdHJhbnNwb3J0LFxyXG4gICAgICAvLyBkdGxzIHRyYW5zcG9ydCwgcG90ZW50aWFsbHkgcnRwc2VuZGVyIGFuZCBydHByZWNlaXZlci5cclxuICAgICAgdmFyIHRyYWNrID0gdHJhbnNjZWl2ZXIudHJhY2s7XHJcbiAgICAgIHZhciBraW5kID0gdHJhbnNjZWl2ZXIua2luZDtcclxuICAgICAgdmFyIG1pZCA9IHRyYW5zY2VpdmVyLm1pZCB8fCBTRFBVdGlscy5nZW5lcmF0ZUlkZW50aWZpZXIoKTtcclxuICAgICAgdHJhbnNjZWl2ZXIubWlkID0gbWlkO1xyXG5cclxuICAgICAgaWYgKCF0cmFuc2NlaXZlci5pY2VHYXRoZXJlcikge1xyXG4gICAgICAgIHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyID0gcGMuX2NyZWF0ZUljZUdhdGhlcmVyKHNkcE1MaW5lSW5kZXgsXHJcbiAgICAgICAgICAgIHBjLnVzaW5nQnVuZGxlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIGxvY2FsQ2FwYWJpbGl0aWVzID0gd2luZG93LlJUQ1J0cFNlbmRlci5nZXRDYXBhYmlsaXRpZXMoa2luZCk7XHJcbiAgICAgIC8vIGZpbHRlciBSVFggdW50aWwgYWRkaXRpb25hbCBzdHVmZiBuZWVkZWQgZm9yIFJUWCBpcyBpbXBsZW1lbnRlZFxyXG4gICAgICAvLyBpbiBhZGFwdGVyLmpzXHJcbiAgICAgIGlmIChlZGdlVmVyc2lvbiA8IDE1MDE5KSB7XHJcbiAgICAgICAgbG9jYWxDYXBhYmlsaXRpZXMuY29kZWNzID0gbG9jYWxDYXBhYmlsaXRpZXMuY29kZWNzLmZpbHRlcihcclxuICAgICAgICAgICAgZnVuY3Rpb24oY29kZWMpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gY29kZWMubmFtZSAhPT0gJ3J0eCc7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGxvY2FsQ2FwYWJpbGl0aWVzLmNvZGVjcy5mb3JFYWNoKGZ1bmN0aW9uKGNvZGVjKSB7XHJcbiAgICAgICAgLy8gd29yayBhcm91bmQgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3dlYnJ0Yy9pc3N1ZXMvZGV0YWlsP2lkPTY1NTJcclxuICAgICAgICAvLyBieSBhZGRpbmcgbGV2ZWwtYXN5bW1ldHJ5LWFsbG93ZWQ9MVxyXG4gICAgICAgIGlmIChjb2RlYy5uYW1lID09PSAnSDI2NCcgJiZcclxuICAgICAgICAgICAgY29kZWMucGFyYW1ldGVyc1snbGV2ZWwtYXN5bW1ldHJ5LWFsbG93ZWQnXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBjb2RlYy5wYXJhbWV0ZXJzWydsZXZlbC1hc3ltbWV0cnktYWxsb3dlZCddID0gJzEnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZm9yIHN1YnNlcXVlbnQgb2ZmZXJzLCB3ZSBtaWdodCBoYXZlIHRvIHJlLXVzZSB0aGUgcGF5bG9hZFxyXG4gICAgICAgIC8vIHR5cGUgb2YgdGhlIGxhc3Qgb2ZmZXIuXHJcbiAgICAgICAgaWYgKHRyYW5zY2VpdmVyLnJlbW90ZUNhcGFiaWxpdGllcyAmJlxyXG4gICAgICAgICAgICB0cmFuc2NlaXZlci5yZW1vdGVDYXBhYmlsaXRpZXMuY29kZWNzKSB7XHJcbiAgICAgICAgICB0cmFuc2NlaXZlci5yZW1vdGVDYXBhYmlsaXRpZXMuY29kZWNzLmZvckVhY2goZnVuY3Rpb24ocmVtb3RlQ29kZWMpIHtcclxuICAgICAgICAgICAgaWYgKGNvZGVjLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gcmVtb3RlQ29kZWMubmFtZS50b0xvd2VyQ2FzZSgpICYmXHJcbiAgICAgICAgICAgICAgICBjb2RlYy5jbG9ja1JhdGUgPT09IHJlbW90ZUNvZGVjLmNsb2NrUmF0ZSkge1xyXG4gICAgICAgICAgICAgIGNvZGVjLnByZWZlcnJlZFBheWxvYWRUeXBlID0gcmVtb3RlQ29kZWMucGF5bG9hZFR5cGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIGxvY2FsQ2FwYWJpbGl0aWVzLmhlYWRlckV4dGVuc2lvbnMuZm9yRWFjaChmdW5jdGlvbihoZHJFeHQpIHtcclxuICAgICAgICB2YXIgcmVtb3RlRXh0ZW5zaW9ucyA9IHRyYW5zY2VpdmVyLnJlbW90ZUNhcGFiaWxpdGllcyAmJlxyXG4gICAgICAgICAgICB0cmFuc2NlaXZlci5yZW1vdGVDYXBhYmlsaXRpZXMuaGVhZGVyRXh0ZW5zaW9ucyB8fCBbXTtcclxuICAgICAgICByZW1vdGVFeHRlbnNpb25zLmZvckVhY2goZnVuY3Rpb24ockhkckV4dCkge1xyXG4gICAgICAgICAgaWYgKGhkckV4dC51cmkgPT09IHJIZHJFeHQudXJpKSB7XHJcbiAgICAgICAgICAgIGhkckV4dC5pZCA9IHJIZHJFeHQuaWQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gZ2VuZXJhdGUgYW4gc3NyYyBub3csIHRvIGJlIHVzZWQgbGF0ZXIgaW4gcnRwU2VuZGVyLnNlbmRcclxuICAgICAgdmFyIHNlbmRFbmNvZGluZ1BhcmFtZXRlcnMgPSB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzIHx8IFt7XHJcbiAgICAgICAgc3NyYzogKDIgKiBzZHBNTGluZUluZGV4ICsgMSkgKiAxMDAxXHJcbiAgICAgIH1dO1xyXG4gICAgICBpZiAodHJhY2spIHtcclxuICAgICAgICAvLyBhZGQgUlRYXHJcbiAgICAgICAgaWYgKGVkZ2VWZXJzaW9uID49IDE1MDE5ICYmIGtpbmQgPT09ICd2aWRlbycgJiZcclxuICAgICAgICAgICAgIXNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4KSB7XHJcbiAgICAgICAgICBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCA9IHtcclxuICAgICAgICAgICAgc3NyYzogc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjICsgMVxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0cmFuc2NlaXZlci53YW50UmVjZWl2ZSkge1xyXG4gICAgICAgIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyID0gbmV3IHdpbmRvdy5SVENSdHBSZWNlaXZlcihcclxuICAgICAgICAgICAgdHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydCwga2luZCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRyYW5zY2VpdmVyLmxvY2FsQ2FwYWJpbGl0aWVzID0gbG9jYWxDYXBhYmlsaXRpZXM7XHJcbiAgICAgIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnMgPSBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gYWx3YXlzIG9mZmVyIEJVTkRMRSBhbmQgZGlzcG9zZSBvbiByZXR1cm4gaWYgbm90IHN1cHBvcnRlZC5cclxuICAgIGlmIChwYy5fY29uZmlnLmJ1bmRsZVBvbGljeSAhPT0gJ21heC1jb21wYXQnKSB7XHJcbiAgICAgIHNkcCArPSAnYT1ncm91cDpCVU5ETEUgJyArIHBjLnRyYW5zY2VpdmVycy5tYXAoZnVuY3Rpb24odCkge1xyXG4gICAgICAgIHJldHVybiB0Lm1pZDtcclxuICAgICAgfSkuam9pbignICcpICsgJ1xcclxcbic7XHJcbiAgICB9XHJcbiAgICBzZHAgKz0gJ2E9aWNlLW9wdGlvbnM6dHJpY2tsZVxcclxcbic7XHJcblxyXG4gICAgcGMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIsIHNkcE1MaW5lSW5kZXgpIHtcclxuICAgICAgc2RwICs9IHdyaXRlTWVkaWFTZWN0aW9uKHRyYW5zY2VpdmVyLCB0cmFuc2NlaXZlci5sb2NhbENhcGFiaWxpdGllcyxcclxuICAgICAgICAgICdvZmZlcicsIHRyYW5zY2VpdmVyLnN0cmVhbSwgcGMuX2R0bHNSb2xlKTtcclxuICAgICAgc2RwICs9ICdhPXJ0Y3AtcnNpemVcXHJcXG4nO1xyXG5cclxuICAgICAgaWYgKHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyICYmIHBjLmljZUdhdGhlcmluZ1N0YXRlICE9PSAnbmV3JyAmJlxyXG4gICAgICAgICAgKHNkcE1MaW5lSW5kZXggPT09IDAgfHwgIXBjLnVzaW5nQnVuZGxlKSkge1xyXG4gICAgICAgIHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyLmdldExvY2FsQ2FuZGlkYXRlcygpLmZvckVhY2goZnVuY3Rpb24oY2FuZCkge1xyXG4gICAgICAgICAgY2FuZC5jb21wb25lbnQgPSAxO1xyXG4gICAgICAgICAgc2RwICs9ICdhPScgKyBTRFBVdGlscy53cml0ZUNhbmRpZGF0ZShjYW5kKSArICdcXHJcXG4nO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAodHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIuc3RhdGUgPT09ICdjb21wbGV0ZWQnKSB7XHJcbiAgICAgICAgICBzZHAgKz0gJ2E9ZW5kLW9mLWNhbmRpZGF0ZXNcXHJcXG4nO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIGRlc2MgPSBuZXcgd2luZG93LlJUQ1Nlc3Npb25EZXNjcmlwdGlvbih7XHJcbiAgICAgIHR5cGU6ICdvZmZlcicsXHJcbiAgICAgIHNkcDogc2RwXHJcbiAgICB9KTtcclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZGVzYyk7XHJcbiAgfTtcclxuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmNyZWF0ZUFuc3dlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHBjID0gdGhpcztcclxuXHJcbiAgICBpZiAocGMuX2lzQ2xvc2VkKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChtYWtlRXJyb3IoJ0ludmFsaWRTdGF0ZUVycm9yJyxcclxuICAgICAgICAgICdDYW4gbm90IGNhbGwgY3JlYXRlQW5zd2VyIGFmdGVyIGNsb3NlJykpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghKHBjLnNpZ25hbGluZ1N0YXRlID09PSAnaGF2ZS1yZW1vdGUtb2ZmZXInIHx8XHJcbiAgICAgICAgcGMuc2lnbmFsaW5nU3RhdGUgPT09ICdoYXZlLWxvY2FsLXByYW5zd2VyJykpIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG1ha2VFcnJvcignSW52YWxpZFN0YXRlRXJyb3InLFxyXG4gICAgICAgICAgJ0NhbiBub3QgY2FsbCBjcmVhdGVBbnN3ZXIgaW4gc2lnbmFsaW5nU3RhdGUgJyArIHBjLnNpZ25hbGluZ1N0YXRlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHNkcCA9IFNEUFV0aWxzLndyaXRlU2Vzc2lvbkJvaWxlcnBsYXRlKHBjLl9zZHBTZXNzaW9uSWQsXHJcbiAgICAgICAgcGMuX3NkcFNlc3Npb25WZXJzaW9uKyspO1xyXG4gICAgaWYgKHBjLnVzaW5nQnVuZGxlKSB7XHJcbiAgICAgIHNkcCArPSAnYT1ncm91cDpCVU5ETEUgJyArIHBjLnRyYW5zY2VpdmVycy5tYXAoZnVuY3Rpb24odCkge1xyXG4gICAgICAgIHJldHVybiB0Lm1pZDtcclxuICAgICAgfSkuam9pbignICcpICsgJ1xcclxcbic7XHJcbiAgICB9XHJcbiAgICB2YXIgbWVkaWFTZWN0aW9uc0luT2ZmZXIgPSBTRFBVdGlscy5nZXRNZWRpYVNlY3Rpb25zKFxyXG4gICAgICAgIHBjLnJlbW90ZURlc2NyaXB0aW9uLnNkcCkubGVuZ3RoO1xyXG4gICAgcGMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIsIHNkcE1MaW5lSW5kZXgpIHtcclxuICAgICAgaWYgKHNkcE1MaW5lSW5kZXggKyAxID4gbWVkaWFTZWN0aW9uc0luT2ZmZXIpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRyYW5zY2VpdmVyLnJlamVjdGVkKSB7XHJcbiAgICAgICAgaWYgKHRyYW5zY2VpdmVyLmtpbmQgPT09ICdhcHBsaWNhdGlvbicpIHtcclxuICAgICAgICAgIHNkcCArPSAnbT1hcHBsaWNhdGlvbiAwIERUTFMvU0NUUCA1MDAwXFxyXFxuJztcclxuICAgICAgICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLmtpbmQgPT09ICdhdWRpbycpIHtcclxuICAgICAgICAgIHNkcCArPSAnbT1hdWRpbyAwIFVEUC9UTFMvUlRQL1NBVlBGIDBcXHJcXG4nICtcclxuICAgICAgICAgICAgICAnYT1ydHBtYXA6MCBQQ01VLzgwMDBcXHJcXG4nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIua2luZCA9PT0gJ3ZpZGVvJykge1xyXG4gICAgICAgICAgc2RwICs9ICdtPXZpZGVvIDAgVURQL1RMUy9SVFAvU0FWUEYgMTIwXFxyXFxuJyArXHJcbiAgICAgICAgICAgICAgJ2E9cnRwbWFwOjEyMCBWUDgvOTAwMDBcXHJcXG4nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZHAgKz0gJ2M9SU4gSVA0IDAuMC4wLjBcXHJcXG4nICtcclxuICAgICAgICAgICAgJ2E9aW5hY3RpdmVcXHJcXG4nICtcclxuICAgICAgICAgICAgJ2E9bWlkOicgKyB0cmFuc2NlaXZlci5taWQgKyAnXFxyXFxuJztcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEZJWE1FOiBsb29rIGF0IGRpcmVjdGlvbi5cclxuICAgICAgaWYgKHRyYW5zY2VpdmVyLnN0cmVhbSkge1xyXG4gICAgICAgIHZhciBsb2NhbFRyYWNrO1xyXG4gICAgICAgIGlmICh0cmFuc2NlaXZlci5raW5kID09PSAnYXVkaW8nKSB7XHJcbiAgICAgICAgICBsb2NhbFRyYWNrID0gdHJhbnNjZWl2ZXIuc3RyZWFtLmdldEF1ZGlvVHJhY2tzKClbMF07XHJcbiAgICAgICAgfSBlbHNlIGlmICh0cmFuc2NlaXZlci5raW5kID09PSAndmlkZW8nKSB7XHJcbiAgICAgICAgICBsb2NhbFRyYWNrID0gdHJhbnNjZWl2ZXIuc3RyZWFtLmdldFZpZGVvVHJhY2tzKClbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChsb2NhbFRyYWNrKSB7XHJcbiAgICAgICAgICAvLyBhZGQgUlRYXHJcbiAgICAgICAgICBpZiAoZWRnZVZlcnNpb24gPj0gMTUwMTkgJiYgdHJhbnNjZWl2ZXIua2luZCA9PT0gJ3ZpZGVvJyAmJlxyXG4gICAgICAgICAgICAgICF0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCkge1xyXG4gICAgICAgICAgICB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCA9IHtcclxuICAgICAgICAgICAgICBzc3JjOiB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmMgKyAxXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBDYWxjdWxhdGUgaW50ZXJzZWN0aW9uIG9mIGNhcGFiaWxpdGllcy5cclxuICAgICAgdmFyIGNvbW1vbkNhcGFiaWxpdGllcyA9IGdldENvbW1vbkNhcGFiaWxpdGllcyhcclxuICAgICAgICAgIHRyYW5zY2VpdmVyLmxvY2FsQ2FwYWJpbGl0aWVzLFxyXG4gICAgICAgICAgdHJhbnNjZWl2ZXIucmVtb3RlQ2FwYWJpbGl0aWVzKTtcclxuXHJcbiAgICAgIHZhciBoYXNSdHggPSBjb21tb25DYXBhYmlsaXRpZXMuY29kZWNzLmZpbHRlcihmdW5jdGlvbihjKSB7XHJcbiAgICAgICAgcmV0dXJuIGMubmFtZS50b0xvd2VyQ2FzZSgpID09PSAncnR4JztcclxuICAgICAgfSkubGVuZ3RoO1xyXG4gICAgICBpZiAoIWhhc1J0eCAmJiB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCkge1xyXG4gICAgICAgIGRlbGV0ZSB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eDtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2RwICs9IHdyaXRlTWVkaWFTZWN0aW9uKHRyYW5zY2VpdmVyLCBjb21tb25DYXBhYmlsaXRpZXMsXHJcbiAgICAgICAgICAnYW5zd2VyJywgdHJhbnNjZWl2ZXIuc3RyZWFtLCBwYy5fZHRsc1JvbGUpO1xyXG4gICAgICBpZiAodHJhbnNjZWl2ZXIucnRjcFBhcmFtZXRlcnMgJiZcclxuICAgICAgICAgIHRyYW5zY2VpdmVyLnJ0Y3BQYXJhbWV0ZXJzLnJlZHVjZWRTaXplKSB7XHJcbiAgICAgICAgc2RwICs9ICdhPXJ0Y3AtcnNpemVcXHJcXG4nO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgZGVzYyA9IG5ldyB3aW5kb3cuUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKHtcclxuICAgICAgdHlwZTogJ2Fuc3dlcicsXHJcbiAgICAgIHNkcDogc2RwXHJcbiAgICB9KTtcclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZGVzYyk7XHJcbiAgfTtcclxuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZEljZUNhbmRpZGF0ZSA9IGZ1bmN0aW9uKGNhbmRpZGF0ZSkge1xyXG4gICAgdmFyIHBjID0gdGhpcztcclxuICAgIHZhciBzZWN0aW9ucztcclxuICAgIGlmIChjYW5kaWRhdGUgJiYgIShjYW5kaWRhdGUuc2RwTUxpbmVJbmRleCAhPT0gdW5kZWZpbmVkIHx8XHJcbiAgICAgICAgY2FuZGlkYXRlLnNkcE1pZCkpIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoJ3NkcE1MaW5lSW5kZXggb3Igc2RwTWlkIHJlcXVpcmVkJykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRPRE86IG5lZWRzIHRvIGdvIGludG8gb3BzIHF1ZXVlLlxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICBpZiAoIXBjLnJlbW90ZURlc2NyaXB0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlamVjdChtYWtlRXJyb3IoJ0ludmFsaWRTdGF0ZUVycm9yJyxcclxuICAgICAgICAgICAgJ0NhbiBub3QgYWRkIElDRSBjYW5kaWRhdGUgd2l0aG91dCBhIHJlbW90ZSBkZXNjcmlwdGlvbicpKTtcclxuICAgICAgfSBlbHNlIGlmICghY2FuZGlkYXRlIHx8IGNhbmRpZGF0ZS5jYW5kaWRhdGUgPT09ICcnKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBwYy50cmFuc2NlaXZlcnMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgIGlmIChwYy50cmFuc2NlaXZlcnNbal0ucmVqZWN0ZWQpIHtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBwYy50cmFuc2NlaXZlcnNbal0uaWNlVHJhbnNwb3J0LmFkZFJlbW90ZUNhbmRpZGF0ZSh7fSk7XHJcbiAgICAgICAgICBzZWN0aW9ucyA9IFNEUFV0aWxzLmdldE1lZGlhU2VjdGlvbnMocGMucmVtb3RlRGVzY3JpcHRpb24uc2RwKTtcclxuICAgICAgICAgIHNlY3Rpb25zW2pdICs9ICdhPWVuZC1vZi1jYW5kaWRhdGVzXFxyXFxuJztcclxuICAgICAgICAgIHBjLnJlbW90ZURlc2NyaXB0aW9uLnNkcCA9XHJcbiAgICAgICAgICAgICAgU0RQVXRpbHMuZ2V0RGVzY3JpcHRpb24ocGMucmVtb3RlRGVzY3JpcHRpb24uc2RwKSArXHJcbiAgICAgICAgICAgICAgc2VjdGlvbnMuam9pbignJyk7XHJcbiAgICAgICAgICBpZiAocGMudXNpbmdCdW5kbGUpIHtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBzZHBNTGluZUluZGV4ID0gY2FuZGlkYXRlLnNkcE1MaW5lSW5kZXg7XHJcbiAgICAgICAgaWYgKGNhbmRpZGF0ZS5zZHBNaWQpIHtcclxuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGMudHJhbnNjZWl2ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChwYy50cmFuc2NlaXZlcnNbaV0ubWlkID09PSBjYW5kaWRhdGUuc2RwTWlkKSB7XHJcbiAgICAgICAgICAgICAgc2RwTUxpbmVJbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHRyYW5zY2VpdmVyID0gcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdO1xyXG4gICAgICAgIGlmICh0cmFuc2NlaXZlcikge1xyXG4gICAgICAgICAgaWYgKHRyYW5zY2VpdmVyLnJlamVjdGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB2YXIgY2FuZCA9IE9iamVjdC5rZXlzKGNhbmRpZGF0ZS5jYW5kaWRhdGUpLmxlbmd0aCA+IDAgP1xyXG4gICAgICAgICAgICAgIFNEUFV0aWxzLnBhcnNlQ2FuZGlkYXRlKGNhbmRpZGF0ZS5jYW5kaWRhdGUpIDoge307XHJcbiAgICAgICAgICAvLyBJZ25vcmUgQ2hyb21lJ3MgaW52YWxpZCBjYW5kaWRhdGVzIHNpbmNlIEVkZ2UgZG9lcyBub3QgbGlrZSB0aGVtLlxyXG4gICAgICAgICAgaWYgKGNhbmQucHJvdG9jb2wgPT09ICd0Y3AnICYmIChjYW5kLnBvcnQgPT09IDAgfHwgY2FuZC5wb3J0ID09PSA5KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgLy8gSWdub3JlIFJUQ1AgY2FuZGlkYXRlcywgd2UgYXNzdW1lIFJUQ1AtTVVYLlxyXG4gICAgICAgICAgaWYgKGNhbmQuY29tcG9uZW50ICYmIGNhbmQuY29tcG9uZW50ICE9PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAvLyB3aGVuIHVzaW5nIGJ1bmRsZSwgYXZvaWQgYWRkaW5nIGNhbmRpZGF0ZXMgdG8gdGhlIHdyb25nXHJcbiAgICAgICAgICAvLyBpY2UgdHJhbnNwb3J0LiBBbmQgYXZvaWQgYWRkaW5nIGNhbmRpZGF0ZXMgYWRkZWQgaW4gdGhlIFNEUC5cclxuICAgICAgICAgIGlmIChzZHBNTGluZUluZGV4ID09PSAwIHx8IChzZHBNTGluZUluZGV4ID4gMCAmJlxyXG4gICAgICAgICAgICAgIHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydCAhPT0gcGMudHJhbnNjZWl2ZXJzWzBdLmljZVRyYW5zcG9ydCkpIHtcclxuICAgICAgICAgICAgaWYgKCFtYXliZUFkZENhbmRpZGF0ZSh0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQsIGNhbmQpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChtYWtlRXJyb3IoJ09wZXJhdGlvbkVycm9yJyxcclxuICAgICAgICAgICAgICAgICAgJ0NhbiBub3QgYWRkIElDRSBjYW5kaWRhdGUnKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyB1cGRhdGUgdGhlIHJlbW90ZURlc2NyaXB0aW9uLlxyXG4gICAgICAgICAgdmFyIGNhbmRpZGF0ZVN0cmluZyA9IGNhbmRpZGF0ZS5jYW5kaWRhdGUudHJpbSgpO1xyXG4gICAgICAgICAgaWYgKGNhbmRpZGF0ZVN0cmluZy5pbmRleE9mKCdhPScpID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNhbmRpZGF0ZVN0cmluZyA9IGNhbmRpZGF0ZVN0cmluZy5zdWJzdHIoMik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBzZWN0aW9ucyA9IFNEUFV0aWxzLmdldE1lZGlhU2VjdGlvbnMocGMucmVtb3RlRGVzY3JpcHRpb24uc2RwKTtcclxuICAgICAgICAgIHNlY3Rpb25zW3NkcE1MaW5lSW5kZXhdICs9ICdhPScgK1xyXG4gICAgICAgICAgICAgIChjYW5kLnR5cGUgPyBjYW5kaWRhdGVTdHJpbmcgOiAnZW5kLW9mLWNhbmRpZGF0ZXMnKVxyXG4gICAgICAgICAgICAgICsgJ1xcclxcbic7XHJcbiAgICAgICAgICBwYy5yZW1vdGVEZXNjcmlwdGlvbi5zZHAgPVxyXG4gICAgICAgICAgICAgIFNEUFV0aWxzLmdldERlc2NyaXB0aW9uKHBjLnJlbW90ZURlc2NyaXB0aW9uLnNkcCkgK1xyXG4gICAgICAgICAgICAgIHNlY3Rpb25zLmpvaW4oJycpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gcmVqZWN0KG1ha2VFcnJvcignT3BlcmF0aW9uRXJyb3InLFxyXG4gICAgICAgICAgICAgICdDYW4gbm90IGFkZCBJQ0UgY2FuZGlkYXRlJykpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXNvbHZlKCk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U3RhdHMgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBwcm9taXNlcyA9IFtdO1xyXG4gICAgdGhpcy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xyXG4gICAgICBbJ3J0cFNlbmRlcicsICdydHBSZWNlaXZlcicsICdpY2VHYXRoZXJlcicsICdpY2VUcmFuc3BvcnQnLFxyXG4gICAgICAgICAgJ2R0bHNUcmFuc3BvcnQnXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xyXG4gICAgICAgICAgICBpZiAodHJhbnNjZWl2ZXJbbWV0aG9kXSkge1xyXG4gICAgICAgICAgICAgIHByb21pc2VzLnB1c2godHJhbnNjZWl2ZXJbbWV0aG9kXS5nZXRTdGF0cygpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIHZhciBmaXhTdGF0c1R5cGUgPSBmdW5jdGlvbihzdGF0KSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgaW5ib3VuZHJ0cDogJ2luYm91bmQtcnRwJyxcclxuICAgICAgICBvdXRib3VuZHJ0cDogJ291dGJvdW5kLXJ0cCcsXHJcbiAgICAgICAgY2FuZGlkYXRlcGFpcjogJ2NhbmRpZGF0ZS1wYWlyJyxcclxuICAgICAgICBsb2NhbGNhbmRpZGF0ZTogJ2xvY2FsLWNhbmRpZGF0ZScsXHJcbiAgICAgICAgcmVtb3RlY2FuZGlkYXRlOiAncmVtb3RlLWNhbmRpZGF0ZSdcclxuICAgICAgfVtzdGF0LnR5cGVdIHx8IHN0YXQudHlwZTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xyXG4gICAgICAvLyBzaGltIGdldFN0YXRzIHdpdGggbWFwbGlrZSBzdXBwb3J0XHJcbiAgICAgIHZhciByZXN1bHRzID0gbmV3IE1hcCgpO1xyXG4gICAgICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICByZXMuZm9yRWFjaChmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgIE9iamVjdC5rZXlzKHJlc3VsdCkuZm9yRWFjaChmdW5jdGlvbihpZCkge1xyXG4gICAgICAgICAgICByZXN1bHRbaWRdLnR5cGUgPSBmaXhTdGF0c1R5cGUocmVzdWx0W2lkXSk7XHJcbiAgICAgICAgICAgIHJlc3VsdHMuc2V0KGlkLCByZXN1bHRbaWRdKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJlc29sdmUocmVzdWx0cyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgLy8gbGVnYWN5IGNhbGxiYWNrIHNoaW1zLiBTaG91bGQgYmUgbW92ZWQgdG8gYWRhcHRlci5qcyBzb21lIGRheXMuXHJcbiAgdmFyIG1ldGhvZHMgPSBbJ2NyZWF0ZU9mZmVyJywgJ2NyZWF0ZUFuc3dlciddO1xyXG4gIG1ldGhvZHMuZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcclxuICAgIHZhciBuYXRpdmVNZXRob2QgPSBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXTtcclxuICAgIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xyXG4gICAgICBpZiAodHlwZW9mIGFyZ3NbMF0gPT09ICdmdW5jdGlvbicgfHxcclxuICAgICAgICAgIHR5cGVvZiBhcmdzWzFdID09PSAnZnVuY3Rpb24nKSB7IC8vIGxlZ2FjeVxyXG4gICAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkodGhpcywgW2FyZ3VtZW50c1syXV0pXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oZGVzY3JpcHRpb24pIHtcclxuICAgICAgICAgIGlmICh0eXBlb2YgYXJnc1swXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICBhcmdzWzBdLmFwcGx5KG51bGwsIFtkZXNjcmlwdGlvbl0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIGFyZ3NbMV0gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgYXJnc1sxXS5hcHBseShudWxsLCBbZXJyb3JdKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xyXG4gIH0pO1xyXG5cclxuICBtZXRob2RzID0gWydzZXRMb2NhbERlc2NyaXB0aW9uJywgJ3NldFJlbW90ZURlc2NyaXB0aW9uJywgJ2FkZEljZUNhbmRpZGF0ZSddO1xyXG4gIG1ldGhvZHMuZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcclxuICAgIHZhciBuYXRpdmVNZXRob2QgPSBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXTtcclxuICAgIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xyXG4gICAgICBpZiAodHlwZW9mIGFyZ3NbMV0gPT09ICdmdW5jdGlvbicgfHxcclxuICAgICAgICAgIHR5cGVvZiBhcmdzWzJdID09PSAnZnVuY3Rpb24nKSB7IC8vIGxlZ2FjeVxyXG4gICAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBhcmdzWzFdID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIGFyZ3NbMV0uYXBwbHkobnVsbCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcclxuICAgICAgICAgIGlmICh0eXBlb2YgYXJnc1syXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICBhcmdzWzJdLmFwcGx5KG51bGwsIFtlcnJvcl0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIH07XHJcbiAgfSk7XHJcblxyXG4gIC8vIGdldFN0YXRzIGlzIHNwZWNpYWwuIEl0IGRvZXNuJ3QgaGF2ZSBhIHNwZWMgbGVnYWN5IG1ldGhvZCB5ZXQgd2Ugc3VwcG9ydFxyXG4gIC8vIGdldFN0YXRzKHNvbWV0aGluZywgY2IpIHdpdGhvdXQgZXJyb3IgY2FsbGJhY2tzLlxyXG4gIFsnZ2V0U3RhdHMnXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xyXG4gICAgdmFyIG5hdGl2ZU1ldGhvZCA9IFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdO1xyXG4gICAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XHJcbiAgICAgIGlmICh0eXBlb2YgYXJnc1sxXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBhcmdzWzFdID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIGFyZ3NbMV0uYXBwbHkobnVsbCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgfTtcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIFJUQ1BlZXJDb25uZWN0aW9uO1xyXG59O1xyXG5cclxufSx7XCJzZHBcIjoyfV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gU0RQIGhlbHBlcnMuXHJcbnZhciBTRFBVdGlscyA9IHt9O1xyXG5cclxuLy8gR2VuZXJhdGUgYW4gYWxwaGFudW1lcmljIGlkZW50aWZpZXIgZm9yIGNuYW1lIG9yIG1pZHMuXHJcbi8vIFRPRE86IHVzZSBVVUlEcyBpbnN0ZWFkPyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9qZWQvOTgyODgzXHJcblNEUFV0aWxzLmdlbmVyYXRlSWRlbnRpZmllciA9IGZ1bmN0aW9uKCkge1xyXG4gIHJldHVybiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgMTApO1xyXG59O1xyXG5cclxuLy8gVGhlIFJUQ1AgQ05BTUUgdXNlZCBieSBhbGwgcGVlcmNvbm5lY3Rpb25zIGZyb20gdGhlIHNhbWUgSlMuXHJcblNEUFV0aWxzLmxvY2FsQ05hbWUgPSBTRFBVdGlscy5nZW5lcmF0ZUlkZW50aWZpZXIoKTtcclxuXHJcbi8vIFNwbGl0cyBTRFAgaW50byBsaW5lcywgZGVhbGluZyB3aXRoIGJvdGggQ1JMRiBhbmQgTEYuXHJcblNEUFV0aWxzLnNwbGl0TGluZXMgPSBmdW5jdGlvbihibG9iKSB7XHJcbiAgcmV0dXJuIGJsb2IudHJpbSgpLnNwbGl0KCdcXG4nKS5tYXAoZnVuY3Rpb24obGluZSkge1xyXG4gICAgcmV0dXJuIGxpbmUudHJpbSgpO1xyXG4gIH0pO1xyXG59O1xyXG4vLyBTcGxpdHMgU0RQIGludG8gc2Vzc2lvbnBhcnQgYW5kIG1lZGlhc2VjdGlvbnMuIEVuc3VyZXMgQ1JMRi5cclxuU0RQVXRpbHMuc3BsaXRTZWN0aW9ucyA9IGZ1bmN0aW9uKGJsb2IpIHtcclxuICB2YXIgcGFydHMgPSBibG9iLnNwbGl0KCdcXG5tPScpO1xyXG4gIHJldHVybiBwYXJ0cy5tYXAoZnVuY3Rpb24ocGFydCwgaW5kZXgpIHtcclxuICAgIHJldHVybiAoaW5kZXggPiAwID8gJ209JyArIHBhcnQgOiBwYXJ0KS50cmltKCkgKyAnXFxyXFxuJztcclxuICB9KTtcclxufTtcclxuXHJcbi8vIHJldHVybnMgdGhlIHNlc3Npb24gZGVzY3JpcHRpb24uXHJcblNEUFV0aWxzLmdldERlc2NyaXB0aW9uID0gZnVuY3Rpb24oYmxvYikge1xyXG4gIHZhciBzZWN0aW9ucyA9IFNEUFV0aWxzLnNwbGl0U2VjdGlvbnMoYmxvYik7XHJcbiAgcmV0dXJuIHNlY3Rpb25zICYmIHNlY3Rpb25zWzBdO1xyXG59O1xyXG5cclxuLy8gcmV0dXJucyB0aGUgaW5kaXZpZHVhbCBtZWRpYSBzZWN0aW9ucy5cclxuU0RQVXRpbHMuZ2V0TWVkaWFTZWN0aW9ucyA9IGZ1bmN0aW9uKGJsb2IpIHtcclxuICB2YXIgc2VjdGlvbnMgPSBTRFBVdGlscy5zcGxpdFNlY3Rpb25zKGJsb2IpO1xyXG4gIHNlY3Rpb25zLnNoaWZ0KCk7XHJcbiAgcmV0dXJuIHNlY3Rpb25zO1xyXG59O1xyXG5cclxuLy8gUmV0dXJucyBsaW5lcyB0aGF0IHN0YXJ0IHdpdGggYSBjZXJ0YWluIHByZWZpeC5cclxuU0RQVXRpbHMubWF0Y2hQcmVmaXggPSBmdW5jdGlvbihibG9iLCBwcmVmaXgpIHtcclxuICByZXR1cm4gU0RQVXRpbHMuc3BsaXRMaW5lcyhibG9iKS5maWx0ZXIoZnVuY3Rpb24obGluZSkge1xyXG4gICAgcmV0dXJuIGxpbmUuaW5kZXhPZihwcmVmaXgpID09PSAwO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuLy8gUGFyc2VzIGFuIElDRSBjYW5kaWRhdGUgbGluZS4gU2FtcGxlIGlucHV0OlxyXG4vLyBjYW5kaWRhdGU6NzAyNzg2MzUwIDIgdWRwIDQxODE5OTAyIDguOC44LjggNjA3NjkgdHlwIHJlbGF5IHJhZGRyIDguOC44LjhcclxuLy8gcnBvcnQgNTU5OTZcIlxyXG5TRFBVdGlscy5wYXJzZUNhbmRpZGF0ZSA9IGZ1bmN0aW9uKGxpbmUpIHtcclxuICB2YXIgcGFydHM7XHJcbiAgLy8gUGFyc2UgYm90aCB2YXJpYW50cy5cclxuICBpZiAobGluZS5pbmRleE9mKCdhPWNhbmRpZGF0ZTonKSA9PT0gMCkge1xyXG4gICAgcGFydHMgPSBsaW5lLnN1YnN0cmluZygxMikuc3BsaXQoJyAnKTtcclxuICB9IGVsc2Uge1xyXG4gICAgcGFydHMgPSBsaW5lLnN1YnN0cmluZygxMCkuc3BsaXQoJyAnKTtcclxuICB9XHJcblxyXG4gIHZhciBjYW5kaWRhdGUgPSB7XHJcbiAgICBmb3VuZGF0aW9uOiBwYXJ0c1swXSxcclxuICAgIGNvbXBvbmVudDogcGFyc2VJbnQocGFydHNbMV0sIDEwKSxcclxuICAgIHByb3RvY29sOiBwYXJ0c1syXS50b0xvd2VyQ2FzZSgpLFxyXG4gICAgcHJpb3JpdHk6IHBhcnNlSW50KHBhcnRzWzNdLCAxMCksXHJcbiAgICBpcDogcGFydHNbNF0sXHJcbiAgICBwb3J0OiBwYXJzZUludChwYXJ0c1s1XSwgMTApLFxyXG4gICAgLy8gc2tpcCBwYXJ0c1s2XSA9PSAndHlwJ1xyXG4gICAgdHlwZTogcGFydHNbN11cclxuICB9O1xyXG5cclxuICBmb3IgKHZhciBpID0gODsgaSA8IHBhcnRzLmxlbmd0aDsgaSArPSAyKSB7XHJcbiAgICBzd2l0Y2ggKHBhcnRzW2ldKSB7XHJcbiAgICAgIGNhc2UgJ3JhZGRyJzpcclxuICAgICAgICBjYW5kaWRhdGUucmVsYXRlZEFkZHJlc3MgPSBwYXJ0c1tpICsgMV07XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3Jwb3J0JzpcclxuICAgICAgICBjYW5kaWRhdGUucmVsYXRlZFBvcnQgPSBwYXJzZUludChwYXJ0c1tpICsgMV0sIDEwKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAndGNwdHlwZSc6XHJcbiAgICAgICAgY2FuZGlkYXRlLnRjcFR5cGUgPSBwYXJ0c1tpICsgMV07XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3VmcmFnJzpcclxuICAgICAgICBjYW5kaWRhdGUudWZyYWcgPSBwYXJ0c1tpICsgMV07IC8vIGZvciBiYWNrd2FyZCBjb21wYWJpbGl0eS5cclxuICAgICAgICBjYW5kaWRhdGUudXNlcm5hbWVGcmFnbWVudCA9IHBhcnRzW2kgKyAxXTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDogLy8gZXh0ZW5zaW9uIGhhbmRsaW5nLCBpbiBwYXJ0aWN1bGFyIHVmcmFnXHJcbiAgICAgICAgY2FuZGlkYXRlW3BhcnRzW2ldXSA9IHBhcnRzW2kgKyAxXTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIGNhbmRpZGF0ZTtcclxufTtcclxuXHJcbi8vIFRyYW5zbGF0ZXMgYSBjYW5kaWRhdGUgb2JqZWN0IGludG8gU0RQIGNhbmRpZGF0ZSBhdHRyaWJ1dGUuXHJcblNEUFV0aWxzLndyaXRlQ2FuZGlkYXRlID0gZnVuY3Rpb24oY2FuZGlkYXRlKSB7XHJcbiAgdmFyIHNkcCA9IFtdO1xyXG4gIHNkcC5wdXNoKGNhbmRpZGF0ZS5mb3VuZGF0aW9uKTtcclxuICBzZHAucHVzaChjYW5kaWRhdGUuY29tcG9uZW50KTtcclxuICBzZHAucHVzaChjYW5kaWRhdGUucHJvdG9jb2wudG9VcHBlckNhc2UoKSk7XHJcbiAgc2RwLnB1c2goY2FuZGlkYXRlLnByaW9yaXR5KTtcclxuICBzZHAucHVzaChjYW5kaWRhdGUuaXApO1xyXG4gIHNkcC5wdXNoKGNhbmRpZGF0ZS5wb3J0KTtcclxuXHJcbiAgdmFyIHR5cGUgPSBjYW5kaWRhdGUudHlwZTtcclxuICBzZHAucHVzaCgndHlwJyk7XHJcbiAgc2RwLnB1c2godHlwZSk7XHJcbiAgaWYgKHR5cGUgIT09ICdob3N0JyAmJiBjYW5kaWRhdGUucmVsYXRlZEFkZHJlc3MgJiZcclxuICAgICAgY2FuZGlkYXRlLnJlbGF0ZWRQb3J0KSB7XHJcbiAgICBzZHAucHVzaCgncmFkZHInKTtcclxuICAgIHNkcC5wdXNoKGNhbmRpZGF0ZS5yZWxhdGVkQWRkcmVzcyk7IC8vIHdhczogcmVsQWRkclxyXG4gICAgc2RwLnB1c2goJ3Jwb3J0Jyk7XHJcbiAgICBzZHAucHVzaChjYW5kaWRhdGUucmVsYXRlZFBvcnQpOyAvLyB3YXM6IHJlbFBvcnRcclxuICB9XHJcbiAgaWYgKGNhbmRpZGF0ZS50Y3BUeXBlICYmIGNhbmRpZGF0ZS5wcm90b2NvbC50b0xvd2VyQ2FzZSgpID09PSAndGNwJykge1xyXG4gICAgc2RwLnB1c2goJ3RjcHR5cGUnKTtcclxuICAgIHNkcC5wdXNoKGNhbmRpZGF0ZS50Y3BUeXBlKTtcclxuICB9XHJcbiAgaWYgKGNhbmRpZGF0ZS51c2VybmFtZUZyYWdtZW50IHx8IGNhbmRpZGF0ZS51ZnJhZykge1xyXG4gICAgc2RwLnB1c2goJ3VmcmFnJyk7XHJcbiAgICBzZHAucHVzaChjYW5kaWRhdGUudXNlcm5hbWVGcmFnbWVudCB8fCBjYW5kaWRhdGUudWZyYWcpO1xyXG4gIH1cclxuICByZXR1cm4gJ2NhbmRpZGF0ZTonICsgc2RwLmpvaW4oJyAnKTtcclxufTtcclxuXHJcbi8vIFBhcnNlcyBhbiBpY2Utb3B0aW9ucyBsaW5lLCByZXR1cm5zIGFuIGFycmF5IG9mIG9wdGlvbiB0YWdzLlxyXG4vLyBhPWljZS1vcHRpb25zOmZvbyBiYXJcclxuU0RQVXRpbHMucGFyc2VJY2VPcHRpb25zID0gZnVuY3Rpb24obGluZSkge1xyXG4gIHJldHVybiBsaW5lLnN1YnN0cigxNCkuc3BsaXQoJyAnKTtcclxufVxyXG5cclxuLy8gUGFyc2VzIGFuIHJ0cG1hcCBsaW5lLCByZXR1cm5zIFJUQ1J0cENvZGRlY1BhcmFtZXRlcnMuIFNhbXBsZSBpbnB1dDpcclxuLy8gYT1ydHBtYXA6MTExIG9wdXMvNDgwMDAvMlxyXG5TRFBVdGlscy5wYXJzZVJ0cE1hcCA9IGZ1bmN0aW9uKGxpbmUpIHtcclxuICB2YXIgcGFydHMgPSBsaW5lLnN1YnN0cig5KS5zcGxpdCgnICcpO1xyXG4gIHZhciBwYXJzZWQgPSB7XHJcbiAgICBwYXlsb2FkVHlwZTogcGFyc2VJbnQocGFydHMuc2hpZnQoKSwgMTApIC8vIHdhczogaWRcclxuICB9O1xyXG5cclxuICBwYXJ0cyA9IHBhcnRzWzBdLnNwbGl0KCcvJyk7XHJcblxyXG4gIHBhcnNlZC5uYW1lID0gcGFydHNbMF07XHJcbiAgcGFyc2VkLmNsb2NrUmF0ZSA9IHBhcnNlSW50KHBhcnRzWzFdLCAxMCk7IC8vIHdhczogY2xvY2tyYXRlXHJcbiAgLy8gd2FzOiBjaGFubmVsc1xyXG4gIHBhcnNlZC5udW1DaGFubmVscyA9IHBhcnRzLmxlbmd0aCA9PT0gMyA/IHBhcnNlSW50KHBhcnRzWzJdLCAxMCkgOiAxO1xyXG4gIHJldHVybiBwYXJzZWQ7XHJcbn07XHJcblxyXG4vLyBHZW5lcmF0ZSBhbiBhPXJ0cG1hcCBsaW5lIGZyb20gUlRDUnRwQ29kZWNDYXBhYmlsaXR5IG9yXHJcbi8vIFJUQ1J0cENvZGVjUGFyYW1ldGVycy5cclxuU0RQVXRpbHMud3JpdGVSdHBNYXAgPSBmdW5jdGlvbihjb2RlYykge1xyXG4gIHZhciBwdCA9IGNvZGVjLnBheWxvYWRUeXBlO1xyXG4gIGlmIChjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBwdCA9IGNvZGVjLnByZWZlcnJlZFBheWxvYWRUeXBlO1xyXG4gIH1cclxuICByZXR1cm4gJ2E9cnRwbWFwOicgKyBwdCArICcgJyArIGNvZGVjLm5hbWUgKyAnLycgKyBjb2RlYy5jbG9ja1JhdGUgK1xyXG4gICAgICAoY29kZWMubnVtQ2hhbm5lbHMgIT09IDEgPyAnLycgKyBjb2RlYy5udW1DaGFubmVscyA6ICcnKSArICdcXHJcXG4nO1xyXG59O1xyXG5cclxuLy8gUGFyc2VzIGFuIGE9ZXh0bWFwIGxpbmUgKGhlYWRlcmV4dGVuc2lvbiBmcm9tIFJGQyA1Mjg1KS4gU2FtcGxlIGlucHV0OlxyXG4vLyBhPWV4dG1hcDoyIHVybjppZXRmOnBhcmFtczpydHAtaGRyZXh0OnRvZmZzZXRcclxuLy8gYT1leHRtYXA6Mi9zZW5kb25seSB1cm46aWV0ZjpwYXJhbXM6cnRwLWhkcmV4dDp0b2Zmc2V0XHJcblNEUFV0aWxzLnBhcnNlRXh0bWFwID0gZnVuY3Rpb24obGluZSkge1xyXG4gIHZhciBwYXJ0cyA9IGxpbmUuc3Vic3RyKDkpLnNwbGl0KCcgJyk7XHJcbiAgcmV0dXJuIHtcclxuICAgIGlkOiBwYXJzZUludChwYXJ0c1swXSwgMTApLFxyXG4gICAgZGlyZWN0aW9uOiBwYXJ0c1swXS5pbmRleE9mKCcvJykgPiAwID8gcGFydHNbMF0uc3BsaXQoJy8nKVsxXSA6ICdzZW5kcmVjdicsXHJcbiAgICB1cmk6IHBhcnRzWzFdXHJcbiAgfTtcclxufTtcclxuXHJcbi8vIEdlbmVyYXRlcyBhPWV4dG1hcCBsaW5lIGZyb20gUlRDUnRwSGVhZGVyRXh0ZW5zaW9uUGFyYW1ldGVycyBvclxyXG4vLyBSVENSdHBIZWFkZXJFeHRlbnNpb24uXHJcblNEUFV0aWxzLndyaXRlRXh0bWFwID0gZnVuY3Rpb24oaGVhZGVyRXh0ZW5zaW9uKSB7XHJcbiAgcmV0dXJuICdhPWV4dG1hcDonICsgKGhlYWRlckV4dGVuc2lvbi5pZCB8fCBoZWFkZXJFeHRlbnNpb24ucHJlZmVycmVkSWQpICtcclxuICAgICAgKGhlYWRlckV4dGVuc2lvbi5kaXJlY3Rpb24gJiYgaGVhZGVyRXh0ZW5zaW9uLmRpcmVjdGlvbiAhPT0gJ3NlbmRyZWN2J1xyXG4gICAgICAgICAgPyAnLycgKyBoZWFkZXJFeHRlbnNpb24uZGlyZWN0aW9uXHJcbiAgICAgICAgICA6ICcnKSArXHJcbiAgICAgICcgJyArIGhlYWRlckV4dGVuc2lvbi51cmkgKyAnXFxyXFxuJztcclxufTtcclxuXHJcbi8vIFBhcnNlcyBhbiBmdG1wIGxpbmUsIHJldHVybnMgZGljdGlvbmFyeS4gU2FtcGxlIGlucHV0OlxyXG4vLyBhPWZtdHA6OTYgdmJyPW9uO2NuZz1vblxyXG4vLyBBbHNvIGRlYWxzIHdpdGggdmJyPW9uOyBjbmc9b25cclxuU0RQVXRpbHMucGFyc2VGbXRwID0gZnVuY3Rpb24obGluZSkge1xyXG4gIHZhciBwYXJzZWQgPSB7fTtcclxuICB2YXIga3Y7XHJcbiAgdmFyIHBhcnRzID0gbGluZS5zdWJzdHIobGluZS5pbmRleE9mKCcgJykgKyAxKS5zcGxpdCgnOycpO1xyXG4gIGZvciAodmFyIGogPSAwOyBqIDwgcGFydHMubGVuZ3RoOyBqKyspIHtcclxuICAgIGt2ID0gcGFydHNbal0udHJpbSgpLnNwbGl0KCc9Jyk7XHJcbiAgICBwYXJzZWRba3ZbMF0udHJpbSgpXSA9IGt2WzFdO1xyXG4gIH1cclxuICByZXR1cm4gcGFyc2VkO1xyXG59O1xyXG5cclxuLy8gR2VuZXJhdGVzIGFuIGE9ZnRtcCBsaW5lIGZyb20gUlRDUnRwQ29kZWNDYXBhYmlsaXR5IG9yIFJUQ1J0cENvZGVjUGFyYW1ldGVycy5cclxuU0RQVXRpbHMud3JpdGVGbXRwID0gZnVuY3Rpb24oY29kZWMpIHtcclxuICB2YXIgbGluZSA9ICcnO1xyXG4gIHZhciBwdCA9IGNvZGVjLnBheWxvYWRUeXBlO1xyXG4gIGlmIChjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBwdCA9IGNvZGVjLnByZWZlcnJlZFBheWxvYWRUeXBlO1xyXG4gIH1cclxuICBpZiAoY29kZWMucGFyYW1ldGVycyAmJiBPYmplY3Qua2V5cyhjb2RlYy5wYXJhbWV0ZXJzKS5sZW5ndGgpIHtcclxuICAgIHZhciBwYXJhbXMgPSBbXTtcclxuICAgIE9iamVjdC5rZXlzKGNvZGVjLnBhcmFtZXRlcnMpLmZvckVhY2goZnVuY3Rpb24ocGFyYW0pIHtcclxuICAgICAgcGFyYW1zLnB1c2gocGFyYW0gKyAnPScgKyBjb2RlYy5wYXJhbWV0ZXJzW3BhcmFtXSk7XHJcbiAgICB9KTtcclxuICAgIGxpbmUgKz0gJ2E9Zm10cDonICsgcHQgKyAnICcgKyBwYXJhbXMuam9pbignOycpICsgJ1xcclxcbic7XHJcbiAgfVxyXG4gIHJldHVybiBsaW5lO1xyXG59O1xyXG5cclxuLy8gUGFyc2VzIGFuIHJ0Y3AtZmIgbGluZSwgcmV0dXJucyBSVENQUnRjcEZlZWRiYWNrIG9iamVjdC4gU2FtcGxlIGlucHV0OlxyXG4vLyBhPXJ0Y3AtZmI6OTggbmFjayBycHNpXHJcblNEUFV0aWxzLnBhcnNlUnRjcEZiID0gZnVuY3Rpb24obGluZSkge1xyXG4gIHZhciBwYXJ0cyA9IGxpbmUuc3Vic3RyKGxpbmUuaW5kZXhPZignICcpICsgMSkuc3BsaXQoJyAnKTtcclxuICByZXR1cm4ge1xyXG4gICAgdHlwZTogcGFydHMuc2hpZnQoKSxcclxuICAgIHBhcmFtZXRlcjogcGFydHMuam9pbignICcpXHJcbiAgfTtcclxufTtcclxuLy8gR2VuZXJhdGUgYT1ydGNwLWZiIGxpbmVzIGZyb20gUlRDUnRwQ29kZWNDYXBhYmlsaXR5IG9yIFJUQ1J0cENvZGVjUGFyYW1ldGVycy5cclxuU0RQVXRpbHMud3JpdGVSdGNwRmIgPSBmdW5jdGlvbihjb2RlYykge1xyXG4gIHZhciBsaW5lcyA9ICcnO1xyXG4gIHZhciBwdCA9IGNvZGVjLnBheWxvYWRUeXBlO1xyXG4gIGlmIChjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBwdCA9IGNvZGVjLnByZWZlcnJlZFBheWxvYWRUeXBlO1xyXG4gIH1cclxuICBpZiAoY29kZWMucnRjcEZlZWRiYWNrICYmIGNvZGVjLnJ0Y3BGZWVkYmFjay5sZW5ndGgpIHtcclxuICAgIC8vIEZJWE1FOiBzcGVjaWFsIGhhbmRsaW5nIGZvciB0cnItaW50P1xyXG4gICAgY29kZWMucnRjcEZlZWRiYWNrLmZvckVhY2goZnVuY3Rpb24oZmIpIHtcclxuICAgICAgbGluZXMgKz0gJ2E9cnRjcC1mYjonICsgcHQgKyAnICcgKyBmYi50eXBlICtcclxuICAgICAgKGZiLnBhcmFtZXRlciAmJiBmYi5wYXJhbWV0ZXIubGVuZ3RoID8gJyAnICsgZmIucGFyYW1ldGVyIDogJycpICtcclxuICAgICAgICAgICdcXHJcXG4nO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHJldHVybiBsaW5lcztcclxufTtcclxuXHJcbi8vIFBhcnNlcyBhbiBSRkMgNTU3NiBzc3JjIG1lZGlhIGF0dHJpYnV0ZS4gU2FtcGxlIGlucHV0OlxyXG4vLyBhPXNzcmM6MzczNTkyODU1OSBjbmFtZTpzb21ldGhpbmdcclxuU0RQVXRpbHMucGFyc2VTc3JjTWVkaWEgPSBmdW5jdGlvbihsaW5lKSB7XHJcbiAgdmFyIHNwID0gbGluZS5pbmRleE9mKCcgJyk7XHJcbiAgdmFyIHBhcnRzID0ge1xyXG4gICAgc3NyYzogcGFyc2VJbnQobGluZS5zdWJzdHIoNywgc3AgLSA3KSwgMTApXHJcbiAgfTtcclxuICB2YXIgY29sb24gPSBsaW5lLmluZGV4T2YoJzonLCBzcCk7XHJcbiAgaWYgKGNvbG9uID4gLTEpIHtcclxuICAgIHBhcnRzLmF0dHJpYnV0ZSA9IGxpbmUuc3Vic3RyKHNwICsgMSwgY29sb24gLSBzcCAtIDEpO1xyXG4gICAgcGFydHMudmFsdWUgPSBsaW5lLnN1YnN0cihjb2xvbiArIDEpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBwYXJ0cy5hdHRyaWJ1dGUgPSBsaW5lLnN1YnN0cihzcCArIDEpO1xyXG4gIH1cclxuICByZXR1cm4gcGFydHM7XHJcbn07XHJcblxyXG4vLyBFeHRyYWN0cyB0aGUgTUlEIChSRkMgNTg4OCkgZnJvbSBhIG1lZGlhIHNlY3Rpb24uXHJcbi8vIHJldHVybnMgdGhlIE1JRCBvciB1bmRlZmluZWQgaWYgbm8gbWlkIGxpbmUgd2FzIGZvdW5kLlxyXG5TRFBVdGlscy5nZXRNaWQgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcclxuICB2YXIgbWlkID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1taWQ6JylbMF07XHJcbiAgaWYgKG1pZCkge1xyXG4gICAgcmV0dXJuIG1pZC5zdWJzdHIoNik7XHJcbiAgfVxyXG59XHJcblxyXG5TRFBVdGlscy5wYXJzZUZpbmdlcnByaW50ID0gZnVuY3Rpb24obGluZSkge1xyXG4gIHZhciBwYXJ0cyA9IGxpbmUuc3Vic3RyKDE0KS5zcGxpdCgnICcpO1xyXG4gIHJldHVybiB7XHJcbiAgICBhbGdvcml0aG06IHBhcnRzWzBdLnRvTG93ZXJDYXNlKCksIC8vIGFsZ29yaXRobSBpcyBjYXNlLXNlbnNpdGl2ZSBpbiBFZGdlLlxyXG4gICAgdmFsdWU6IHBhcnRzWzFdXHJcbiAgfTtcclxufTtcclxuXHJcbi8vIEV4dHJhY3RzIERUTFMgcGFyYW1ldGVycyBmcm9tIFNEUCBtZWRpYSBzZWN0aW9uIG9yIHNlc3Npb25wYXJ0LlxyXG4vLyBGSVhNRTogZm9yIGNvbnNpc3RlbmN5IHdpdGggb3RoZXIgZnVuY3Rpb25zIHRoaXMgc2hvdWxkIG9ubHlcclxuLy8gICBnZXQgdGhlIGZpbmdlcnByaW50IGxpbmUgYXMgaW5wdXQuIFNlZSBhbHNvIGdldEljZVBhcmFtZXRlcnMuXHJcblNEUFV0aWxzLmdldER0bHNQYXJhbWV0ZXJzID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uLCBzZXNzaW9ucGFydCkge1xyXG4gIHZhciBsaW5lcyA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiArIHNlc3Npb25wYXJ0LFxyXG4gICAgICAnYT1maW5nZXJwcmludDonKTtcclxuICAvLyBOb3RlOiBhPXNldHVwIGxpbmUgaXMgaWdub3JlZCBzaW5jZSB3ZSB1c2UgdGhlICdhdXRvJyByb2xlLlxyXG4gIC8vIE5vdGUyOiAnYWxnb3JpdGhtJyBpcyBub3QgY2FzZSBzZW5zaXRpdmUgZXhjZXB0IGluIEVkZ2UuXHJcbiAgcmV0dXJuIHtcclxuICAgIHJvbGU6ICdhdXRvJyxcclxuICAgIGZpbmdlcnByaW50czogbGluZXMubWFwKFNEUFV0aWxzLnBhcnNlRmluZ2VycHJpbnQpXHJcbiAgfTtcclxufTtcclxuXHJcbi8vIFNlcmlhbGl6ZXMgRFRMUyBwYXJhbWV0ZXJzIHRvIFNEUC5cclxuU0RQVXRpbHMud3JpdGVEdGxzUGFyYW1ldGVycyA9IGZ1bmN0aW9uKHBhcmFtcywgc2V0dXBUeXBlKSB7XHJcbiAgdmFyIHNkcCA9ICdhPXNldHVwOicgKyBzZXR1cFR5cGUgKyAnXFxyXFxuJztcclxuICBwYXJhbXMuZmluZ2VycHJpbnRzLmZvckVhY2goZnVuY3Rpb24oZnApIHtcclxuICAgIHNkcCArPSAnYT1maW5nZXJwcmludDonICsgZnAuYWxnb3JpdGhtICsgJyAnICsgZnAudmFsdWUgKyAnXFxyXFxuJztcclxuICB9KTtcclxuICByZXR1cm4gc2RwO1xyXG59O1xyXG4vLyBQYXJzZXMgSUNFIGluZm9ybWF0aW9uIGZyb20gU0RQIG1lZGlhIHNlY3Rpb24gb3Igc2Vzc2lvbnBhcnQuXHJcbi8vIEZJWE1FOiBmb3IgY29uc2lzdGVuY3kgd2l0aCBvdGhlciBmdW5jdGlvbnMgdGhpcyBzaG91bGQgb25seVxyXG4vLyAgIGdldCB0aGUgaWNlLXVmcmFnIGFuZCBpY2UtcHdkIGxpbmVzIGFzIGlucHV0LlxyXG5TRFBVdGlscy5nZXRJY2VQYXJhbWV0ZXJzID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uLCBzZXNzaW9ucGFydCkge1xyXG4gIHZhciBsaW5lcyA9IFNEUFV0aWxzLnNwbGl0TGluZXMobWVkaWFTZWN0aW9uKTtcclxuICAvLyBTZWFyY2ggaW4gc2Vzc2lvbiBwYXJ0LCB0b28uXHJcbiAgbGluZXMgPSBsaW5lcy5jb25jYXQoU0RQVXRpbHMuc3BsaXRMaW5lcyhzZXNzaW9ucGFydCkpO1xyXG4gIHZhciBpY2VQYXJhbWV0ZXJzID0ge1xyXG4gICAgdXNlcm5hbWVGcmFnbWVudDogbGluZXMuZmlsdGVyKGZ1bmN0aW9uKGxpbmUpIHtcclxuICAgICAgcmV0dXJuIGxpbmUuaW5kZXhPZignYT1pY2UtdWZyYWc6JykgPT09IDA7XHJcbiAgICB9KVswXS5zdWJzdHIoMTIpLFxyXG4gICAgcGFzc3dvcmQ6IGxpbmVzLmZpbHRlcihmdW5jdGlvbihsaW5lKSB7XHJcbiAgICAgIHJldHVybiBsaW5lLmluZGV4T2YoJ2E9aWNlLXB3ZDonKSA9PT0gMDtcclxuICAgIH0pWzBdLnN1YnN0cigxMClcclxuICB9O1xyXG4gIHJldHVybiBpY2VQYXJhbWV0ZXJzO1xyXG59O1xyXG5cclxuLy8gU2VyaWFsaXplcyBJQ0UgcGFyYW1ldGVycyB0byBTRFAuXHJcblNEUFV0aWxzLndyaXRlSWNlUGFyYW1ldGVycyA9IGZ1bmN0aW9uKHBhcmFtcykge1xyXG4gIHJldHVybiAnYT1pY2UtdWZyYWc6JyArIHBhcmFtcy51c2VybmFtZUZyYWdtZW50ICsgJ1xcclxcbicgK1xyXG4gICAgICAnYT1pY2UtcHdkOicgKyBwYXJhbXMucGFzc3dvcmQgKyAnXFxyXFxuJztcclxufTtcclxuXHJcbi8vIFBhcnNlcyB0aGUgU0RQIG1lZGlhIHNlY3Rpb24gYW5kIHJldHVybnMgUlRDUnRwUGFyYW1ldGVycy5cclxuU0RQVXRpbHMucGFyc2VSdHBQYXJhbWV0ZXJzID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XHJcbiAgdmFyIGRlc2NyaXB0aW9uID0ge1xyXG4gICAgY29kZWNzOiBbXSxcclxuICAgIGhlYWRlckV4dGVuc2lvbnM6IFtdLFxyXG4gICAgZmVjTWVjaGFuaXNtczogW10sXHJcbiAgICBydGNwOiBbXVxyXG4gIH07XHJcbiAgdmFyIGxpbmVzID0gU0RQVXRpbHMuc3BsaXRMaW5lcyhtZWRpYVNlY3Rpb24pO1xyXG4gIHZhciBtbGluZSA9IGxpbmVzWzBdLnNwbGl0KCcgJyk7XHJcbiAgZm9yICh2YXIgaSA9IDM7IGkgPCBtbGluZS5sZW5ndGg7IGkrKykgeyAvLyBmaW5kIGFsbCBjb2RlY3MgZnJvbSBtbGluZVszLi5dXHJcbiAgICB2YXIgcHQgPSBtbGluZVtpXTtcclxuICAgIHZhciBydHBtYXBsaW5lID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgoXHJcbiAgICAgICAgbWVkaWFTZWN0aW9uLCAnYT1ydHBtYXA6JyArIHB0ICsgJyAnKVswXTtcclxuICAgIGlmIChydHBtYXBsaW5lKSB7XHJcbiAgICAgIHZhciBjb2RlYyA9IFNEUFV0aWxzLnBhcnNlUnRwTWFwKHJ0cG1hcGxpbmUpO1xyXG4gICAgICB2YXIgZm10cHMgPSBTRFBVdGlscy5tYXRjaFByZWZpeChcclxuICAgICAgICAgIG1lZGlhU2VjdGlvbiwgJ2E9Zm10cDonICsgcHQgKyAnICcpO1xyXG4gICAgICAvLyBPbmx5IHRoZSBmaXJzdCBhPWZtdHA6PHB0PiBpcyBjb25zaWRlcmVkLlxyXG4gICAgICBjb2RlYy5wYXJhbWV0ZXJzID0gZm10cHMubGVuZ3RoID8gU0RQVXRpbHMucGFyc2VGbXRwKGZtdHBzWzBdKSA6IHt9O1xyXG4gICAgICBjb2RlYy5ydGNwRmVlZGJhY2sgPSBTRFBVdGlscy5tYXRjaFByZWZpeChcclxuICAgICAgICAgIG1lZGlhU2VjdGlvbiwgJ2E9cnRjcC1mYjonICsgcHQgKyAnICcpXHJcbiAgICAgICAgLm1hcChTRFBVdGlscy5wYXJzZVJ0Y3BGYik7XHJcbiAgICAgIGRlc2NyaXB0aW9uLmNvZGVjcy5wdXNoKGNvZGVjKTtcclxuICAgICAgLy8gcGFyc2UgRkVDIG1lY2hhbmlzbXMgZnJvbSBydHBtYXAgbGluZXMuXHJcbiAgICAgIHN3aXRjaCAoY29kZWMubmFtZS50b1VwcGVyQ2FzZSgpKSB7XHJcbiAgICAgICAgY2FzZSAnUkVEJzpcclxuICAgICAgICBjYXNlICdVTFBGRUMnOlxyXG4gICAgICAgICAgZGVzY3JpcHRpb24uZmVjTWVjaGFuaXNtcy5wdXNoKGNvZGVjLm5hbWUudG9VcHBlckNhc2UoKSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OiAvLyBvbmx5IFJFRCBhbmQgVUxQRkVDIGFyZSByZWNvZ25pemVkIGFzIEZFQyBtZWNoYW5pc21zLlxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1leHRtYXA6JykuZm9yRWFjaChmdW5jdGlvbihsaW5lKSB7XHJcbiAgICBkZXNjcmlwdGlvbi5oZWFkZXJFeHRlbnNpb25zLnB1c2goU0RQVXRpbHMucGFyc2VFeHRtYXAobGluZSkpO1xyXG4gIH0pO1xyXG4gIC8vIEZJWE1FOiBwYXJzZSBydGNwLlxyXG4gIHJldHVybiBkZXNjcmlwdGlvbjtcclxufTtcclxuXHJcbi8vIEdlbmVyYXRlcyBwYXJ0cyBvZiB0aGUgU0RQIG1lZGlhIHNlY3Rpb24gZGVzY3JpYmluZyB0aGUgY2FwYWJpbGl0aWVzIC9cclxuLy8gcGFyYW1ldGVycy5cclxuU0RQVXRpbHMud3JpdGVSdHBEZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKGtpbmQsIGNhcHMpIHtcclxuICB2YXIgc2RwID0gJyc7XHJcblxyXG4gIC8vIEJ1aWxkIHRoZSBtbGluZS5cclxuICBzZHAgKz0gJ209JyArIGtpbmQgKyAnICc7XHJcbiAgc2RwICs9IGNhcHMuY29kZWNzLmxlbmd0aCA+IDAgPyAnOScgOiAnMCc7IC8vIHJlamVjdCBpZiBubyBjb2RlY3MuXHJcbiAgc2RwICs9ICcgVURQL1RMUy9SVFAvU0FWUEYgJztcclxuICBzZHAgKz0gY2Fwcy5jb2RlY3MubWFwKGZ1bmN0aW9uKGNvZGVjKSB7XHJcbiAgICBpZiAoY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4gY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY29kZWMucGF5bG9hZFR5cGU7XHJcbiAgfSkuam9pbignICcpICsgJ1xcclxcbic7XHJcblxyXG4gIHNkcCArPSAnYz1JTiBJUDQgMC4wLjAuMFxcclxcbic7XHJcbiAgc2RwICs9ICdhPXJ0Y3A6OSBJTiBJUDQgMC4wLjAuMFxcclxcbic7XHJcblxyXG4gIC8vIEFkZCBhPXJ0cG1hcCBsaW5lcyBmb3IgZWFjaCBjb2RlYy4gQWxzbyBmbXRwIGFuZCBydGNwLWZiLlxyXG4gIGNhcHMuY29kZWNzLmZvckVhY2goZnVuY3Rpb24oY29kZWMpIHtcclxuICAgIHNkcCArPSBTRFBVdGlscy53cml0ZVJ0cE1hcChjb2RlYyk7XHJcbiAgICBzZHAgKz0gU0RQVXRpbHMud3JpdGVGbXRwKGNvZGVjKTtcclxuICAgIHNkcCArPSBTRFBVdGlscy53cml0ZVJ0Y3BGYihjb2RlYyk7XHJcbiAgfSk7XHJcbiAgdmFyIG1heHB0aW1lID0gMDtcclxuICBjYXBzLmNvZGVjcy5mb3JFYWNoKGZ1bmN0aW9uKGNvZGVjKSB7XHJcbiAgICBpZiAoY29kZWMubWF4cHRpbWUgPiBtYXhwdGltZSkge1xyXG4gICAgICBtYXhwdGltZSA9IGNvZGVjLm1heHB0aW1lO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIGlmIChtYXhwdGltZSA+IDApIHtcclxuICAgIHNkcCArPSAnYT1tYXhwdGltZTonICsgbWF4cHRpbWUgKyAnXFxyXFxuJztcclxuICB9XHJcbiAgc2RwICs9ICdhPXJ0Y3AtbXV4XFxyXFxuJztcclxuXHJcbiAgY2Fwcy5oZWFkZXJFeHRlbnNpb25zLmZvckVhY2goZnVuY3Rpb24oZXh0ZW5zaW9uKSB7XHJcbiAgICBzZHAgKz0gU0RQVXRpbHMud3JpdGVFeHRtYXAoZXh0ZW5zaW9uKTtcclxuICB9KTtcclxuICAvLyBGSVhNRTogd3JpdGUgZmVjTWVjaGFuaXNtcy5cclxuICByZXR1cm4gc2RwO1xyXG59O1xyXG5cclxuLy8gUGFyc2VzIHRoZSBTRFAgbWVkaWEgc2VjdGlvbiBhbmQgcmV0dXJucyBhbiBhcnJheSBvZlxyXG4vLyBSVENSdHBFbmNvZGluZ1BhcmFtZXRlcnMuXHJcblNEUFV0aWxzLnBhcnNlUnRwRW5jb2RpbmdQYXJhbWV0ZXJzID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XHJcbiAgdmFyIGVuY29kaW5nUGFyYW1ldGVycyA9IFtdO1xyXG4gIHZhciBkZXNjcmlwdGlvbiA9IFNEUFV0aWxzLnBhcnNlUnRwUGFyYW1ldGVycyhtZWRpYVNlY3Rpb24pO1xyXG4gIHZhciBoYXNSZWQgPSBkZXNjcmlwdGlvbi5mZWNNZWNoYW5pc21zLmluZGV4T2YoJ1JFRCcpICE9PSAtMTtcclxuICB2YXIgaGFzVWxwZmVjID0gZGVzY3JpcHRpb24uZmVjTWVjaGFuaXNtcy5pbmRleE9mKCdVTFBGRUMnKSAhPT0gLTE7XHJcblxyXG4gIC8vIGZpbHRlciBhPXNzcmM6Li4uIGNuYW1lOiwgaWdub3JlIFBsYW5CLW1zaWRcclxuICB2YXIgc3NyY3MgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPXNzcmM6JylcclxuICAubWFwKGZ1bmN0aW9uKGxpbmUpIHtcclxuICAgIHJldHVybiBTRFBVdGlscy5wYXJzZVNzcmNNZWRpYShsaW5lKTtcclxuICB9KVxyXG4gIC5maWx0ZXIoZnVuY3Rpb24ocGFydHMpIHtcclxuICAgIHJldHVybiBwYXJ0cy5hdHRyaWJ1dGUgPT09ICdjbmFtZSc7XHJcbiAgfSk7XHJcbiAgdmFyIHByaW1hcnlTc3JjID0gc3NyY3MubGVuZ3RoID4gMCAmJiBzc3Jjc1swXS5zc3JjO1xyXG4gIHZhciBzZWNvbmRhcnlTc3JjO1xyXG5cclxuICB2YXIgZmxvd3MgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPXNzcmMtZ3JvdXA6RklEJylcclxuICAubWFwKGZ1bmN0aW9uKGxpbmUpIHtcclxuICAgIHZhciBwYXJ0cyA9IGxpbmUuc3BsaXQoJyAnKTtcclxuICAgIHBhcnRzLnNoaWZ0KCk7XHJcbiAgICByZXR1cm4gcGFydHMubWFwKGZ1bmN0aW9uKHBhcnQpIHtcclxuICAgICAgcmV0dXJuIHBhcnNlSW50KHBhcnQsIDEwKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGlmIChmbG93cy5sZW5ndGggPiAwICYmIGZsb3dzWzBdLmxlbmd0aCA+IDEgJiYgZmxvd3NbMF1bMF0gPT09IHByaW1hcnlTc3JjKSB7XHJcbiAgICBzZWNvbmRhcnlTc3JjID0gZmxvd3NbMF1bMV07XHJcbiAgfVxyXG5cclxuICBkZXNjcmlwdGlvbi5jb2RlY3MuZm9yRWFjaChmdW5jdGlvbihjb2RlYykge1xyXG4gICAgaWYgKGNvZGVjLm5hbWUudG9VcHBlckNhc2UoKSA9PT0gJ1JUWCcgJiYgY29kZWMucGFyYW1ldGVycy5hcHQpIHtcclxuICAgICAgdmFyIGVuY1BhcmFtID0ge1xyXG4gICAgICAgIHNzcmM6IHByaW1hcnlTc3JjLFxyXG4gICAgICAgIGNvZGVjUGF5bG9hZFR5cGU6IHBhcnNlSW50KGNvZGVjLnBhcmFtZXRlcnMuYXB0LCAxMCksXHJcbiAgICAgICAgcnR4OiB7XHJcbiAgICAgICAgICBzc3JjOiBzZWNvbmRhcnlTc3JjXHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgICBlbmNvZGluZ1BhcmFtZXRlcnMucHVzaChlbmNQYXJhbSk7XHJcbiAgICAgIGlmIChoYXNSZWQpIHtcclxuICAgICAgICBlbmNQYXJhbSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZW5jUGFyYW0pKTtcclxuICAgICAgICBlbmNQYXJhbS5mZWMgPSB7XHJcbiAgICAgICAgICBzc3JjOiBzZWNvbmRhcnlTc3JjLFxyXG4gICAgICAgICAgbWVjaGFuaXNtOiBoYXNVbHBmZWMgPyAncmVkK3VscGZlYycgOiAncmVkJ1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgZW5jb2RpbmdQYXJhbWV0ZXJzLnB1c2goZW5jUGFyYW0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgaWYgKGVuY29kaW5nUGFyYW1ldGVycy5sZW5ndGggPT09IDAgJiYgcHJpbWFyeVNzcmMpIHtcclxuICAgIGVuY29kaW5nUGFyYW1ldGVycy5wdXNoKHtcclxuICAgICAgc3NyYzogcHJpbWFyeVNzcmNcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gd2Ugc3VwcG9ydCBib3RoIGI9QVMgYW5kIGI9VElBUyBidXQgaW50ZXJwcmV0IEFTIGFzIFRJQVMuXHJcbiAgdmFyIGJhbmR3aWR0aCA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2I9Jyk7XHJcbiAgaWYgKGJhbmR3aWR0aC5sZW5ndGgpIHtcclxuICAgIGlmIChiYW5kd2lkdGhbMF0uaW5kZXhPZignYj1USUFTOicpID09PSAwKSB7XHJcbiAgICAgIGJhbmR3aWR0aCA9IHBhcnNlSW50KGJhbmR3aWR0aFswXS5zdWJzdHIoNyksIDEwKTtcclxuICAgIH0gZWxzZSBpZiAoYmFuZHdpZHRoWzBdLmluZGV4T2YoJ2I9QVM6JykgPT09IDApIHtcclxuICAgICAgLy8gdXNlIGZvcm11bGEgZnJvbSBKU0VQIHRvIGNvbnZlcnQgYj1BUyB0byBUSUFTIHZhbHVlLlxyXG4gICAgICBiYW5kd2lkdGggPSBwYXJzZUludChiYW5kd2lkdGhbMF0uc3Vic3RyKDUpLCAxMCkgKiAxMDAwICogMC45NVxyXG4gICAgICAgICAgLSAoNTAgKiA0MCAqIDgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYmFuZHdpZHRoID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgZW5jb2RpbmdQYXJhbWV0ZXJzLmZvckVhY2goZnVuY3Rpb24ocGFyYW1zKSB7XHJcbiAgICAgIHBhcmFtcy5tYXhCaXRyYXRlID0gYmFuZHdpZHRoO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHJldHVybiBlbmNvZGluZ1BhcmFtZXRlcnM7XHJcbn07XHJcblxyXG4vLyBwYXJzZXMgaHR0cDovL2RyYWZ0Lm9ydGMub3JnLyNydGNydGNwcGFyYW1ldGVycypcclxuU0RQVXRpbHMucGFyc2VSdGNwUGFyYW1ldGVycyA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbikge1xyXG4gIHZhciBydGNwUGFyYW1ldGVycyA9IHt9O1xyXG5cclxuICB2YXIgY25hbWU7XHJcbiAgLy8gR2V0cyB0aGUgZmlyc3QgU1NSQy4gTm90ZSB0aGF0IHdpdGggUlRYIHRoZXJlIG1pZ2h0IGJlIG11bHRpcGxlXHJcbiAgLy8gU1NSQ3MuXHJcbiAgdmFyIHJlbW90ZVNzcmMgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPXNzcmM6JylcclxuICAgICAgLm1hcChmdW5jdGlvbihsaW5lKSB7XHJcbiAgICAgICAgcmV0dXJuIFNEUFV0aWxzLnBhcnNlU3NyY01lZGlhKGxpbmUpO1xyXG4gICAgICB9KVxyXG4gICAgICAuZmlsdGVyKGZ1bmN0aW9uKG9iaikge1xyXG4gICAgICAgIHJldHVybiBvYmouYXR0cmlidXRlID09PSAnY25hbWUnO1xyXG4gICAgICB9KVswXTtcclxuICBpZiAocmVtb3RlU3NyYykge1xyXG4gICAgcnRjcFBhcmFtZXRlcnMuY25hbWUgPSByZW1vdGVTc3JjLnZhbHVlO1xyXG4gICAgcnRjcFBhcmFtZXRlcnMuc3NyYyA9IHJlbW90ZVNzcmMuc3NyYztcclxuICB9XHJcblxyXG4gIC8vIEVkZ2UgdXNlcyB0aGUgY29tcG91bmQgYXR0cmlidXRlIGluc3RlYWQgb2YgcmVkdWNlZFNpemVcclxuICAvLyBjb21wb3VuZCBpcyAhcmVkdWNlZFNpemVcclxuICB2YXIgcnNpemUgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPXJ0Y3AtcnNpemUnKTtcclxuICBydGNwUGFyYW1ldGVycy5yZWR1Y2VkU2l6ZSA9IHJzaXplLmxlbmd0aCA+IDA7XHJcbiAgcnRjcFBhcmFtZXRlcnMuY29tcG91bmQgPSByc2l6ZS5sZW5ndGggPT09IDA7XHJcblxyXG4gIC8vIHBhcnNlcyB0aGUgcnRjcC1tdXggYXR0ctGWYnV0ZS5cclxuICAvLyBOb3RlIHRoYXQgRWRnZSBkb2VzIG5vdCBzdXBwb3J0IHVubXV4ZWQgUlRDUC5cclxuICB2YXIgbXV4ID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1ydGNwLW11eCcpO1xyXG4gIHJ0Y3BQYXJhbWV0ZXJzLm11eCA9IG11eC5sZW5ndGggPiAwO1xyXG5cclxuICByZXR1cm4gcnRjcFBhcmFtZXRlcnM7XHJcbn07XHJcblxyXG4vLyBwYXJzZXMgZWl0aGVyIGE9bXNpZDogb3IgYT1zc3JjOi4uLiBtc2lkIGxpbmVzIGFuZCByZXR1cm5zXHJcbi8vIHRoZSBpZCBvZiB0aGUgTWVkaWFTdHJlYW0gYW5kIE1lZGlhU3RyZWFtVHJhY2suXHJcblNEUFV0aWxzLnBhcnNlTXNpZCA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbikge1xyXG4gIHZhciBwYXJ0cztcclxuICB2YXIgc3BlYyA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9bXNpZDonKTtcclxuICBpZiAoc3BlYy5sZW5ndGggPT09IDEpIHtcclxuICAgIHBhcnRzID0gc3BlY1swXS5zdWJzdHIoNykuc3BsaXQoJyAnKTtcclxuICAgIHJldHVybiB7c3RyZWFtOiBwYXJ0c1swXSwgdHJhY2s6IHBhcnRzWzFdfTtcclxuICB9XHJcbiAgdmFyIHBsYW5CID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1zc3JjOicpXHJcbiAgLm1hcChmdW5jdGlvbihsaW5lKSB7XHJcbiAgICByZXR1cm4gU0RQVXRpbHMucGFyc2VTc3JjTWVkaWEobGluZSk7XHJcbiAgfSlcclxuICAuZmlsdGVyKGZ1bmN0aW9uKHBhcnRzKSB7XHJcbiAgICByZXR1cm4gcGFydHMuYXR0cmlidXRlID09PSAnbXNpZCc7XHJcbiAgfSk7XHJcbiAgaWYgKHBsYW5CLmxlbmd0aCA+IDApIHtcclxuICAgIHBhcnRzID0gcGxhbkJbMF0udmFsdWUuc3BsaXQoJyAnKTtcclxuICAgIHJldHVybiB7c3RyZWFtOiBwYXJ0c1swXSwgdHJhY2s6IHBhcnRzWzFdfTtcclxuICB9XHJcbn07XHJcblxyXG4vLyBHZW5lcmF0ZSBhIHNlc3Npb24gSUQgZm9yIFNEUC5cclxuLy8gaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL2RyYWZ0LWlldGYtcnRjd2ViLWpzZXAtMjAjc2VjdGlvbi01LjIuMVxyXG4vLyByZWNvbW1lbmRzIHVzaW5nIGEgY3J5cHRvZ3JhcGhpY2FsbHkgcmFuZG9tICt2ZSA2NC1iaXQgdmFsdWVcclxuLy8gYnV0IHJpZ2h0IG5vdyB0aGlzIHNob3VsZCBiZSBhY2NlcHRhYmxlIGFuZCB3aXRoaW4gdGhlIHJpZ2h0IHJhbmdlXHJcblNEUFV0aWxzLmdlbmVyYXRlU2Vzc2lvbklkID0gZnVuY3Rpb24oKSB7XHJcbiAgcmV0dXJuIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKS5zdWJzdHIoMiwgMjEpO1xyXG59O1xyXG5cclxuLy8gV3JpdGUgYm9pbGRlciBwbGF0ZSBmb3Igc3RhcnQgb2YgU0RQXHJcbi8vIHNlc3NJZCBhcmd1bWVudCBpcyBvcHRpb25hbCAtIGlmIG5vdCBzdXBwbGllZCBpdCB3aWxsXHJcbi8vIGJlIGdlbmVyYXRlZCByYW5kb21seVxyXG4vLyBzZXNzVmVyc2lvbiBpcyBvcHRpb25hbCBhbmQgZGVmYXVsdHMgdG8gMlxyXG5TRFBVdGlscy53cml0ZVNlc3Npb25Cb2lsZXJwbGF0ZSA9IGZ1bmN0aW9uKHNlc3NJZCwgc2Vzc1Zlcikge1xyXG4gIHZhciBzZXNzaW9uSWQ7XHJcbiAgdmFyIHZlcnNpb24gPSBzZXNzVmVyICE9PSB1bmRlZmluZWQgPyBzZXNzVmVyIDogMjtcclxuICBpZiAoc2Vzc0lkKSB7XHJcbiAgICBzZXNzaW9uSWQgPSBzZXNzSWQ7XHJcbiAgfSBlbHNlIHtcclxuICAgIHNlc3Npb25JZCA9IFNEUFV0aWxzLmdlbmVyYXRlU2Vzc2lvbklkKCk7XHJcbiAgfVxyXG4gIC8vIEZJWE1FOiBzZXNzLWlkIHNob3VsZCBiZSBhbiBOVFAgdGltZXN0YW1wLlxyXG4gIHJldHVybiAndj0wXFxyXFxuJyArXHJcbiAgICAgICdvPXRoaXNpc2FkYXB0ZXJvcnRjICcgKyBzZXNzaW9uSWQgKyAnICcgKyB2ZXJzaW9uICsgJyBJTiBJUDQgMTI3LjAuMC4xXFxyXFxuJyArXHJcbiAgICAgICdzPS1cXHJcXG4nICtcclxuICAgICAgJ3Q9MCAwXFxyXFxuJztcclxufTtcclxuXHJcblNEUFV0aWxzLndyaXRlTWVkaWFTZWN0aW9uID0gZnVuY3Rpb24odHJhbnNjZWl2ZXIsIGNhcHMsIHR5cGUsIHN0cmVhbSkge1xyXG4gIHZhciBzZHAgPSBTRFBVdGlscy53cml0ZVJ0cERlc2NyaXB0aW9uKHRyYW5zY2VpdmVyLmtpbmQsIGNhcHMpO1xyXG5cclxuICAvLyBNYXAgSUNFIHBhcmFtZXRlcnMgKHVmcmFnLCBwd2QpIHRvIFNEUC5cclxuICBzZHAgKz0gU0RQVXRpbHMud3JpdGVJY2VQYXJhbWV0ZXJzKFxyXG4gICAgICB0cmFuc2NlaXZlci5pY2VHYXRoZXJlci5nZXRMb2NhbFBhcmFtZXRlcnMoKSk7XHJcblxyXG4gIC8vIE1hcCBEVExTIHBhcmFtZXRlcnMgdG8gU0RQLlxyXG4gIHNkcCArPSBTRFBVdGlscy53cml0ZUR0bHNQYXJhbWV0ZXJzKFxyXG4gICAgICB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0LmdldExvY2FsUGFyYW1ldGVycygpLFxyXG4gICAgICB0eXBlID09PSAnb2ZmZXInID8gJ2FjdHBhc3MnIDogJ2FjdGl2ZScpO1xyXG5cclxuICBzZHAgKz0gJ2E9bWlkOicgKyB0cmFuc2NlaXZlci5taWQgKyAnXFxyXFxuJztcclxuXHJcbiAgaWYgKHRyYW5zY2VpdmVyLmRpcmVjdGlvbikge1xyXG4gICAgc2RwICs9ICdhPScgKyB0cmFuc2NlaXZlci5kaXJlY3Rpb24gKyAnXFxyXFxuJztcclxuICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlciAmJiB0cmFuc2NlaXZlci5ydHBSZWNlaXZlcikge1xyXG4gICAgc2RwICs9ICdhPXNlbmRyZWN2XFxyXFxuJztcclxuICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlcikge1xyXG4gICAgc2RwICs9ICdhPXNlbmRvbmx5XFxyXFxuJztcclxuICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyKSB7XHJcbiAgICBzZHAgKz0gJ2E9cmVjdm9ubHlcXHJcXG4nO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBzZHAgKz0gJ2E9aW5hY3RpdmVcXHJcXG4nO1xyXG4gIH1cclxuXHJcbiAgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlcikge1xyXG4gICAgLy8gc3BlYy5cclxuICAgIHZhciBtc2lkID0gJ21zaWQ6JyArIHN0cmVhbS5pZCArICcgJyArXHJcbiAgICAgICAgdHJhbnNjZWl2ZXIucnRwU2VuZGVyLnRyYWNrLmlkICsgJ1xcclxcbic7XHJcbiAgICBzZHAgKz0gJ2E9JyArIG1zaWQ7XHJcblxyXG4gICAgLy8gZm9yIENocm9tZS5cclxuICAgIHNkcCArPSAnYT1zc3JjOicgKyB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmMgK1xyXG4gICAgICAgICcgJyArIG1zaWQ7XHJcbiAgICBpZiAodHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHgpIHtcclxuICAgICAgc2RwICs9ICdhPXNzcmM6JyArIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4LnNzcmMgK1xyXG4gICAgICAgICAgJyAnICsgbXNpZDtcclxuICAgICAgc2RwICs9ICdhPXNzcmMtZ3JvdXA6RklEICcgK1xyXG4gICAgICAgICAgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjICsgJyAnICtcclxuICAgICAgICAgIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4LnNzcmMgK1xyXG4gICAgICAgICAgJ1xcclxcbic7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8vIEZJWE1FOiB0aGlzIHNob3VsZCBiZSB3cml0dGVuIGJ5IHdyaXRlUnRwRGVzY3JpcHRpb24uXHJcbiAgc2RwICs9ICdhPXNzcmM6JyArIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYyArXHJcbiAgICAgICcgY25hbWU6JyArIFNEUFV0aWxzLmxvY2FsQ05hbWUgKyAnXFxyXFxuJztcclxuICBpZiAodHJhbnNjZWl2ZXIucnRwU2VuZGVyICYmIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4KSB7XHJcbiAgICBzZHAgKz0gJ2E9c3NyYzonICsgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHguc3NyYyArXHJcbiAgICAgICAgJyBjbmFtZTonICsgU0RQVXRpbHMubG9jYWxDTmFtZSArICdcXHJcXG4nO1xyXG4gIH1cclxuICByZXR1cm4gc2RwO1xyXG59O1xyXG5cclxuLy8gR2V0cyB0aGUgZGlyZWN0aW9uIGZyb20gdGhlIG1lZGlhU2VjdGlvbiBvciB0aGUgc2Vzc2lvbnBhcnQuXHJcblNEUFV0aWxzLmdldERpcmVjdGlvbiA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbiwgc2Vzc2lvbnBhcnQpIHtcclxuICAvLyBMb29rIGZvciBzZW5kcmVjdiwgc2VuZG9ubHksIHJlY3Zvbmx5LCBpbmFjdGl2ZSwgZGVmYXVsdCB0byBzZW5kcmVjdi5cclxuICB2YXIgbGluZXMgPSBTRFBVdGlscy5zcGxpdExpbmVzKG1lZGlhU2VjdGlvbik7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgc3dpdGNoIChsaW5lc1tpXSkge1xyXG4gICAgICBjYXNlICdhPXNlbmRyZWN2JzpcclxuICAgICAgY2FzZSAnYT1zZW5kb25seSc6XHJcbiAgICAgIGNhc2UgJ2E9cmVjdm9ubHknOlxyXG4gICAgICBjYXNlICdhPWluYWN0aXZlJzpcclxuICAgICAgICByZXR1cm4gbGluZXNbaV0uc3Vic3RyKDIpO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIC8vIEZJWE1FOiBXaGF0IHNob3VsZCBoYXBwZW4gaGVyZT9cclxuICAgIH1cclxuICB9XHJcbiAgaWYgKHNlc3Npb25wYXJ0KSB7XHJcbiAgICByZXR1cm4gU0RQVXRpbHMuZ2V0RGlyZWN0aW9uKHNlc3Npb25wYXJ0KTtcclxuICB9XHJcbiAgcmV0dXJuICdzZW5kcmVjdic7XHJcbn07XHJcblxyXG5TRFBVdGlscy5nZXRLaW5kID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XHJcbiAgdmFyIGxpbmVzID0gU0RQVXRpbHMuc3BsaXRMaW5lcyhtZWRpYVNlY3Rpb24pO1xyXG4gIHZhciBtbGluZSA9IGxpbmVzWzBdLnNwbGl0KCcgJyk7XHJcbiAgcmV0dXJuIG1saW5lWzBdLnN1YnN0cigyKTtcclxufTtcclxuXHJcblNEUFV0aWxzLmlzUmVqZWN0ZWQgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcclxuICByZXR1cm4gbWVkaWFTZWN0aW9uLnNwbGl0KCcgJywgMilbMV0gPT09ICcwJztcclxufTtcclxuXHJcblNEUFV0aWxzLnBhcnNlTUxpbmUgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcclxuICB2YXIgbGluZXMgPSBTRFBVdGlscy5zcGxpdExpbmVzKG1lZGlhU2VjdGlvbik7XHJcbiAgdmFyIHBhcnRzID0gbGluZXNbMF0uc3Vic3RyKDIpLnNwbGl0KCcgJyk7XHJcbiAgcmV0dXJuIHtcclxuICAgIGtpbmQ6IHBhcnRzWzBdLFxyXG4gICAgcG9ydDogcGFyc2VJbnQocGFydHNbMV0sIDEwKSxcclxuICAgIHByb3RvY29sOiBwYXJ0c1syXSxcclxuICAgIGZtdDogcGFydHMuc2xpY2UoMykuam9pbignICcpXHJcbiAgfTtcclxufTtcclxuXHJcblNEUFV0aWxzLnBhcnNlT0xpbmUgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcclxuICB2YXIgbGluZSA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ289JylbMF07XHJcbiAgdmFyIHBhcnRzID0gbGluZS5zdWJzdHIoMikuc3BsaXQoJyAnKTtcclxuICByZXR1cm4ge1xyXG4gICAgdXNlcm5hbWU6IHBhcnRzWzBdLFxyXG4gICAgc2Vzc2lvbklkOiBwYXJ0c1sxXSxcclxuICAgIHNlc3Npb25WZXJzaW9uOiBwYXJzZUludChwYXJ0c1syXSwgMTApLFxyXG4gICAgbmV0VHlwZTogcGFydHNbM10sXHJcbiAgICBhZGRyZXNzVHlwZTogcGFydHNbNF0sXHJcbiAgICBhZGRyZXNzOiBwYXJ0c1s1XSxcclxuICB9O1xyXG59XHJcblxyXG4vLyBFeHBvc2UgcHVibGljIG1ldGhvZHMuXHJcbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jykge1xyXG4gIG1vZHVsZS5leHBvcnRzID0gU0RQVXRpbHM7XHJcbn1cclxuXHJcbn0se31dLDM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG4oZnVuY3Rpb24gKGdsb2JhbCl7XHJcbi8qXHJcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXHJcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcclxuICogIHRyZWUuXHJcbiAqL1xyXG4gLyogZXNsaW50LWVudiBub2RlICovXHJcblxyXG4ndXNlIHN0cmljdCc7XHJcblxyXG52YXIgYWRhcHRlckZhY3RvcnkgPSByZXF1aXJlKCcuL2FkYXB0ZXJfZmFjdG9yeS5qcycpO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGFkYXB0ZXJGYWN0b3J5KHt3aW5kb3c6IGdsb2JhbC53aW5kb3d9KTtcclxuXHJcbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxyXG59LHtcIi4vYWRhcHRlcl9mYWN0b3J5LmpzXCI6NH1dLDQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG4vKlxyXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKlxyXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxyXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXHJcbiAqICB0cmVlLlxyXG4gKi9cclxuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xyXG4vLyBTaGltbWluZyBzdGFydHMgaGVyZS5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkZXBlbmRlbmNpZXMsIG9wdHMpIHtcclxuICB2YXIgd2luZG93ID0gZGVwZW5kZW5jaWVzICYmIGRlcGVuZGVuY2llcy53aW5kb3c7XHJcblxyXG4gIHZhciBvcHRpb25zID0ge1xyXG4gICAgc2hpbUNocm9tZTogdHJ1ZSxcclxuICAgIHNoaW1GaXJlZm94OiB0cnVlLFxyXG4gICAgc2hpbUVkZ2U6IHRydWUsXHJcbiAgICBzaGltU2FmYXJpOiB0cnVlLFxyXG4gIH07XHJcblxyXG4gIGZvciAodmFyIGtleSBpbiBvcHRzKSB7XHJcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvcHRzLCBrZXkpKSB7XHJcbiAgICAgIG9wdGlvbnNba2V5XSA9IG9wdHNba2V5XTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIFV0aWxzLlxyXG4gIHZhciBsb2dnaW5nID0gdXRpbHMubG9nO1xyXG4gIHZhciBicm93c2VyRGV0YWlscyA9IHV0aWxzLmRldGVjdEJyb3dzZXIod2luZG93KTtcclxuXHJcbiAgLy8gVW5jb21tZW50IHRoZSBsaW5lIGJlbG93IGlmIHlvdSB3YW50IGxvZ2dpbmcgdG8gb2NjdXIsIGluY2x1ZGluZyBsb2dnaW5nXHJcbiAgLy8gZm9yIHRoZSBzd2l0Y2ggc3RhdGVtZW50IGJlbG93LiBDYW4gYWxzbyBiZSB0dXJuZWQgb24gaW4gdGhlIGJyb3dzZXIgdmlhXHJcbiAgLy8gYWRhcHRlci5kaXNhYmxlTG9nKGZhbHNlKSwgYnV0IHRoZW4gbG9nZ2luZyBmcm9tIHRoZSBzd2l0Y2ggc3RhdGVtZW50IGJlbG93XHJcbiAgLy8gd2lsbCBub3QgYXBwZWFyLlxyXG4gIC8vIHJlcXVpcmUoJy4vdXRpbHMnKS5kaXNhYmxlTG9nKGZhbHNlKTtcclxuXHJcbiAgLy8gQnJvd3NlciBzaGltcy5cclxuICB2YXIgY2hyb21lU2hpbSA9IHJlcXVpcmUoJy4vY2hyb21lL2Nocm9tZV9zaGltJykgfHwgbnVsbDtcclxuICB2YXIgZWRnZVNoaW0gPSByZXF1aXJlKCcuL2VkZ2UvZWRnZV9zaGltJykgfHwgbnVsbDtcclxuICB2YXIgZmlyZWZveFNoaW0gPSByZXF1aXJlKCcuL2ZpcmVmb3gvZmlyZWZveF9zaGltJykgfHwgbnVsbDtcclxuICB2YXIgc2FmYXJpU2hpbSA9IHJlcXVpcmUoJy4vc2FmYXJpL3NhZmFyaV9zaGltJykgfHwgbnVsbDtcclxuICB2YXIgY29tbW9uU2hpbSA9IHJlcXVpcmUoJy4vY29tbW9uX3NoaW0nKSB8fCBudWxsO1xyXG5cclxuICAvLyBFeHBvcnQgdG8gdGhlIGFkYXB0ZXIgZ2xvYmFsIG9iamVjdCB2aXNpYmxlIGluIHRoZSBicm93c2VyLlxyXG4gIHZhciBhZGFwdGVyID0ge1xyXG4gICAgYnJvd3NlckRldGFpbHM6IGJyb3dzZXJEZXRhaWxzLFxyXG4gICAgY29tbW9uU2hpbTogY29tbW9uU2hpbSxcclxuICAgIGV4dHJhY3RWZXJzaW9uOiB1dGlscy5leHRyYWN0VmVyc2lvbixcclxuICAgIGRpc2FibGVMb2c6IHV0aWxzLmRpc2FibGVMb2csXHJcbiAgICBkaXNhYmxlV2FybmluZ3M6IHV0aWxzLmRpc2FibGVXYXJuaW5nc1xyXG4gIH07XHJcblxyXG4gIC8vIFNoaW0gYnJvd3NlciBpZiBmb3VuZC5cclxuICBzd2l0Y2ggKGJyb3dzZXJEZXRhaWxzLmJyb3dzZXIpIHtcclxuICAgIGNhc2UgJ2Nocm9tZSc6XHJcbiAgICAgIGlmICghY2hyb21lU2hpbSB8fCAhY2hyb21lU2hpbS5zaGltUGVlckNvbm5lY3Rpb24gfHxcclxuICAgICAgICAgICFvcHRpb25zLnNoaW1DaHJvbWUpIHtcclxuICAgICAgICBsb2dnaW5nKCdDaHJvbWUgc2hpbSBpcyBub3QgaW5jbHVkZWQgaW4gdGhpcyBhZGFwdGVyIHJlbGVhc2UuJyk7XHJcbiAgICAgICAgcmV0dXJuIGFkYXB0ZXI7XHJcbiAgICAgIH1cclxuICAgICAgbG9nZ2luZygnYWRhcHRlci5qcyBzaGltbWluZyBjaHJvbWUuJyk7XHJcbiAgICAgIC8vIEV4cG9ydCB0byB0aGUgYWRhcHRlciBnbG9iYWwgb2JqZWN0IHZpc2libGUgaW4gdGhlIGJyb3dzZXIuXHJcbiAgICAgIGFkYXB0ZXIuYnJvd3NlclNoaW0gPSBjaHJvbWVTaGltO1xyXG4gICAgICBjb21tb25TaGltLnNoaW1DcmVhdGVPYmplY3RVUkwod2luZG93KTtcclxuXHJcbiAgICAgIGNocm9tZVNoaW0uc2hpbUdldFVzZXJNZWRpYSh3aW5kb3cpO1xyXG4gICAgICBjaHJvbWVTaGltLnNoaW1NZWRpYVN0cmVhbSh3aW5kb3cpO1xyXG4gICAgICBjaHJvbWVTaGltLnNoaW1Tb3VyY2VPYmplY3Qod2luZG93KTtcclxuICAgICAgY2hyb21lU2hpbS5zaGltUGVlckNvbm5lY3Rpb24od2luZG93KTtcclxuICAgICAgY2hyb21lU2hpbS5zaGltT25UcmFjayh3aW5kb3cpO1xyXG4gICAgICBjaHJvbWVTaGltLnNoaW1BZGRUcmFja1JlbW92ZVRyYWNrKHdpbmRvdyk7XHJcbiAgICAgIGNocm9tZVNoaW0uc2hpbUdldFNlbmRlcnNXaXRoRHRtZih3aW5kb3cpO1xyXG5cclxuICAgICAgY29tbW9uU2hpbS5zaGltUlRDSWNlQ2FuZGlkYXRlKHdpbmRvdyk7XHJcbiAgICAgIGNvbW1vblNoaW0uc2hpbU1heE1lc3NhZ2VTaXplKHdpbmRvdyk7XHJcbiAgICAgIGNvbW1vblNoaW0uc2hpbVNlbmRUaHJvd1R5cGVFcnJvcih3aW5kb3cpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ2ZpcmVmb3gnOlxyXG4gICAgICBpZiAoIWZpcmVmb3hTaGltIHx8ICFmaXJlZm94U2hpbS5zaGltUGVlckNvbm5lY3Rpb24gfHxcclxuICAgICAgICAgICFvcHRpb25zLnNoaW1GaXJlZm94KSB7XHJcbiAgICAgICAgbG9nZ2luZygnRmlyZWZveCBzaGltIGlzIG5vdCBpbmNsdWRlZCBpbiB0aGlzIGFkYXB0ZXIgcmVsZWFzZS4nKTtcclxuICAgICAgICByZXR1cm4gYWRhcHRlcjtcclxuICAgICAgfVxyXG4gICAgICBsb2dnaW5nKCdhZGFwdGVyLmpzIHNoaW1taW5nIGZpcmVmb3guJyk7XHJcbiAgICAgIC8vIEV4cG9ydCB0byB0aGUgYWRhcHRlciBnbG9iYWwgb2JqZWN0IHZpc2libGUgaW4gdGhlIGJyb3dzZXIuXHJcbiAgICAgIGFkYXB0ZXIuYnJvd3NlclNoaW0gPSBmaXJlZm94U2hpbTtcclxuICAgICAgY29tbW9uU2hpbS5zaGltQ3JlYXRlT2JqZWN0VVJMKHdpbmRvdyk7XHJcblxyXG4gICAgICBmaXJlZm94U2hpbS5zaGltR2V0VXNlck1lZGlhKHdpbmRvdyk7XHJcbiAgICAgIGZpcmVmb3hTaGltLnNoaW1Tb3VyY2VPYmplY3Qod2luZG93KTtcclxuICAgICAgZmlyZWZveFNoaW0uc2hpbVBlZXJDb25uZWN0aW9uKHdpbmRvdyk7XHJcbiAgICAgIGZpcmVmb3hTaGltLnNoaW1PblRyYWNrKHdpbmRvdyk7XHJcbiAgICAgIGZpcmVmb3hTaGltLnNoaW1SZW1vdmVTdHJlYW0od2luZG93KTtcclxuXHJcbiAgICAgIGNvbW1vblNoaW0uc2hpbVJUQ0ljZUNhbmRpZGF0ZSh3aW5kb3cpO1xyXG4gICAgICBjb21tb25TaGltLnNoaW1NYXhNZXNzYWdlU2l6ZSh3aW5kb3cpO1xyXG4gICAgICBjb21tb25TaGltLnNoaW1TZW5kVGhyb3dUeXBlRXJyb3Iod2luZG93KTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdlZGdlJzpcclxuICAgICAgaWYgKCFlZGdlU2hpbSB8fCAhZWRnZVNoaW0uc2hpbVBlZXJDb25uZWN0aW9uIHx8ICFvcHRpb25zLnNoaW1FZGdlKSB7XHJcbiAgICAgICAgbG9nZ2luZygnTVMgZWRnZSBzaGltIGlzIG5vdCBpbmNsdWRlZCBpbiB0aGlzIGFkYXB0ZXIgcmVsZWFzZS4nKTtcclxuICAgICAgICByZXR1cm4gYWRhcHRlcjtcclxuICAgICAgfVxyXG4gICAgICBsb2dnaW5nKCdhZGFwdGVyLmpzIHNoaW1taW5nIGVkZ2UuJyk7XHJcbiAgICAgIC8vIEV4cG9ydCB0byB0aGUgYWRhcHRlciBnbG9iYWwgb2JqZWN0IHZpc2libGUgaW4gdGhlIGJyb3dzZXIuXHJcbiAgICAgIGFkYXB0ZXIuYnJvd3NlclNoaW0gPSBlZGdlU2hpbTtcclxuICAgICAgY29tbW9uU2hpbS5zaGltQ3JlYXRlT2JqZWN0VVJMKHdpbmRvdyk7XHJcblxyXG4gICAgICBlZGdlU2hpbS5zaGltR2V0VXNlck1lZGlhKHdpbmRvdyk7XHJcbiAgICAgIGVkZ2VTaGltLnNoaW1QZWVyQ29ubmVjdGlvbih3aW5kb3cpO1xyXG4gICAgICBlZGdlU2hpbS5zaGltUmVwbGFjZVRyYWNrKHdpbmRvdyk7XHJcblxyXG4gICAgICAvLyB0aGUgZWRnZSBzaGltIGltcGxlbWVudHMgdGhlIGZ1bGwgUlRDSWNlQ2FuZGlkYXRlIG9iamVjdC5cclxuXHJcbiAgICAgIGNvbW1vblNoaW0uc2hpbU1heE1lc3NhZ2VTaXplKHdpbmRvdyk7XHJcbiAgICAgIGNvbW1vblNoaW0uc2hpbVNlbmRUaHJvd1R5cGVFcnJvcih3aW5kb3cpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ3NhZmFyaSc6XHJcbiAgICAgIGlmICghc2FmYXJpU2hpbSB8fCAhb3B0aW9ucy5zaGltU2FmYXJpKSB7XHJcbiAgICAgICAgbG9nZ2luZygnU2FmYXJpIHNoaW0gaXMgbm90IGluY2x1ZGVkIGluIHRoaXMgYWRhcHRlciByZWxlYXNlLicpO1xyXG4gICAgICAgIHJldHVybiBhZGFwdGVyO1xyXG4gICAgICB9XHJcbiAgICAgIGxvZ2dpbmcoJ2FkYXB0ZXIuanMgc2hpbW1pbmcgc2FmYXJpLicpO1xyXG4gICAgICAvLyBFeHBvcnQgdG8gdGhlIGFkYXB0ZXIgZ2xvYmFsIG9iamVjdCB2aXNpYmxlIGluIHRoZSBicm93c2VyLlxyXG4gICAgICBhZGFwdGVyLmJyb3dzZXJTaGltID0gc2FmYXJpU2hpbTtcclxuICAgICAgY29tbW9uU2hpbS5zaGltQ3JlYXRlT2JqZWN0VVJMKHdpbmRvdyk7XHJcblxyXG4gICAgICBzYWZhcmlTaGltLnNoaW1SVENJY2VTZXJ2ZXJVcmxzKHdpbmRvdyk7XHJcbiAgICAgIHNhZmFyaVNoaW0uc2hpbUNhbGxiYWNrc0FQSSh3aW5kb3cpO1xyXG4gICAgICBzYWZhcmlTaGltLnNoaW1Mb2NhbFN0cmVhbXNBUEkod2luZG93KTtcclxuICAgICAgc2FmYXJpU2hpbS5zaGltUmVtb3RlU3RyZWFtc0FQSSh3aW5kb3cpO1xyXG4gICAgICBzYWZhcmlTaGltLnNoaW1UcmFja0V2ZW50VHJhbnNjZWl2ZXIod2luZG93KTtcclxuICAgICAgc2FmYXJpU2hpbS5zaGltR2V0VXNlck1lZGlhKHdpbmRvdyk7XHJcbiAgICAgIHNhZmFyaVNoaW0uc2hpbUNyZWF0ZU9mZmVyTGVnYWN5KHdpbmRvdyk7XHJcblxyXG4gICAgICBjb21tb25TaGltLnNoaW1SVENJY2VDYW5kaWRhdGUod2luZG93KTtcclxuICAgICAgY29tbW9uU2hpbS5zaGltTWF4TWVzc2FnZVNpemUod2luZG93KTtcclxuICAgICAgY29tbW9uU2hpbS5zaGltU2VuZFRocm93VHlwZUVycm9yKHdpbmRvdyk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgbG9nZ2luZygnVW5zdXBwb3J0ZWQgYnJvd3NlciEnKTtcclxuICAgICAgYnJlYWs7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gYWRhcHRlcjtcclxufTtcclxuXHJcbn0se1wiLi9jaHJvbWUvY2hyb21lX3NoaW1cIjo1LFwiLi9jb21tb25fc2hpbVwiOjcsXCIuL2VkZ2UvZWRnZV9zaGltXCI6OCxcIi4vZmlyZWZveC9maXJlZm94X3NoaW1cIjoxMCxcIi4vc2FmYXJpL3NhZmFyaV9zaGltXCI6MTIsXCIuL3V0aWxzXCI6MTN9XSw1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuXHJcbi8qXHJcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXHJcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcclxuICogIHRyZWUuXHJcbiAqL1xyXG4gLyogZXNsaW50LWVudiBub2RlICovXHJcbid1c2Ugc3RyaWN0JztcclxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMuanMnKTtcclxudmFyIGxvZ2dpbmcgPSB1dGlscy5sb2c7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBzaGltR2V0VXNlck1lZGlhOiByZXF1aXJlKCcuL2dldHVzZXJtZWRpYScpLFxyXG4gIHNoaW1NZWRpYVN0cmVhbTogZnVuY3Rpb24od2luZG93KSB7XHJcbiAgICB3aW5kb3cuTWVkaWFTdHJlYW0gPSB3aW5kb3cuTWVkaWFTdHJlYW0gfHwgd2luZG93LndlYmtpdE1lZGlhU3RyZWFtO1xyXG4gIH0sXHJcblxyXG4gIHNoaW1PblRyYWNrOiBmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gJiYgISgnb250cmFjaycgaW5cclxuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSwgJ29udHJhY2snLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLl9vbnRyYWNrO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbihmKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5fb250cmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYWNrJywgdGhpcy5fb250cmFjayk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYWNrJywgdGhpcy5fb250cmFjayA9IGYpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHZhciBvcmlnU2V0UmVtb3RlRGVzY3JpcHRpb24gPVxyXG4gICAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5zZXRSZW1vdGVEZXNjcmlwdGlvbjtcclxuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5zZXRSZW1vdGVEZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgICAgaWYgKCFwYy5fb250cmFja3BvbHkpIHtcclxuICAgICAgICAgIHBjLl9vbnRyYWNrcG9seSA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgLy8gb25hZGRzdHJlYW0gZG9lcyBub3QgZmlyZSB3aGVuIGEgdHJhY2sgaXMgYWRkZWQgdG8gYW4gZXhpc3RpbmdcclxuICAgICAgICAgICAgLy8gc3RyZWFtLiBCdXQgc3RyZWFtLm9uYWRkdHJhY2sgaXMgaW1wbGVtZW50ZWQgc28gd2UgdXNlIHRoYXQuXHJcbiAgICAgICAgICAgIGUuc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoJ2FkZHRyYWNrJywgZnVuY3Rpb24odGUpIHtcclxuICAgICAgICAgICAgICB2YXIgcmVjZWl2ZXI7XHJcbiAgICAgICAgICAgICAgaWYgKHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0UmVjZWl2ZXJzKSB7XHJcbiAgICAgICAgICAgICAgICByZWNlaXZlciA9IHBjLmdldFJlY2VpdmVycygpLmZpbmQoZnVuY3Rpb24ocikge1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gci50cmFjayAmJiByLnRyYWNrLmlkID09PSB0ZS50cmFjay5pZDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZWNlaXZlciA9IHt0cmFjazogdGUudHJhY2t9O1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCd0cmFjaycpO1xyXG4gICAgICAgICAgICAgIGV2ZW50LnRyYWNrID0gdGUudHJhY2s7XHJcbiAgICAgICAgICAgICAgZXZlbnQucmVjZWl2ZXIgPSByZWNlaXZlcjtcclxuICAgICAgICAgICAgICBldmVudC50cmFuc2NlaXZlciA9IHtyZWNlaXZlcjogcmVjZWl2ZXJ9O1xyXG4gICAgICAgICAgICAgIGV2ZW50LnN0cmVhbXMgPSBbZS5zdHJlYW1dO1xyXG4gICAgICAgICAgICAgIHBjLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZS5zdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xyXG4gICAgICAgICAgICAgIHZhciByZWNlaXZlcjtcclxuICAgICAgICAgICAgICBpZiAod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRSZWNlaXZlcnMpIHtcclxuICAgICAgICAgICAgICAgIHJlY2VpdmVyID0gcGMuZ2V0UmVjZWl2ZXJzKCkuZmluZChmdW5jdGlvbihyKSB7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiByLnRyYWNrICYmIHIudHJhY2suaWQgPT09IHRyYWNrLmlkO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlY2VpdmVyID0ge3RyYWNrOiB0cmFja307XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgndHJhY2snKTtcclxuICAgICAgICAgICAgICBldmVudC50cmFjayA9IHRyYWNrO1xyXG4gICAgICAgICAgICAgIGV2ZW50LnJlY2VpdmVyID0gcmVjZWl2ZXI7XHJcbiAgICAgICAgICAgICAgZXZlbnQudHJhbnNjZWl2ZXIgPSB7cmVjZWl2ZXI6IHJlY2VpdmVyfTtcclxuICAgICAgICAgICAgICBldmVudC5zdHJlYW1zID0gW2Uuc3RyZWFtXTtcclxuICAgICAgICAgICAgICBwYy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgcGMuYWRkRXZlbnRMaXN0ZW5lcignYWRkc3RyZWFtJywgcGMuX29udHJhY2twb2x5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9yaWdTZXRSZW1vdGVEZXNjcmlwdGlvbi5hcHBseShwYywgYXJndW1lbnRzKTtcclxuICAgICAgfTtcclxuICAgIH0gZWxzZSBpZiAoISgnUlRDUnRwVHJhbnNjZWl2ZXInIGluIHdpbmRvdykpIHtcclxuICAgICAgdXRpbHMud3JhcFBlZXJDb25uZWN0aW9uRXZlbnQod2luZG93LCAndHJhY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWYgKCFlLnRyYW5zY2VpdmVyKSB7XHJcbiAgICAgICAgICBlLnRyYW5zY2VpdmVyID0ge3JlY2VpdmVyOiBlLnJlY2VpdmVyfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGU7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHNoaW1HZXRTZW5kZXJzV2l0aER0bWY6IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgLy8gT3ZlcnJpZGVzIGFkZFRyYWNrL3JlbW92ZVRyYWNrLCBkZXBlbmRzIG9uIHNoaW1BZGRUcmFja1JlbW92ZVRyYWNrLlxyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiAmJlxyXG4gICAgICAgICEoJ2dldFNlbmRlcnMnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpICYmXHJcbiAgICAgICAgJ2NyZWF0ZURUTUZTZW5kZXInIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpIHtcclxuICAgICAgdmFyIHNoaW1TZW5kZXJXaXRoRHRtZiA9IGZ1bmN0aW9uKHBjLCB0cmFjaykge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0cmFjazogdHJhY2ssXHJcbiAgICAgICAgICBnZXQgZHRtZigpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2R0bWYgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgIGlmICh0cmFjay5raW5kID09PSAnYXVkaW8nKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kdG1mID0gcGMuY3JlYXRlRFRNRlNlbmRlcih0cmFjayk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2R0bWYgPSBudWxsO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZHRtZjtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBfcGM6IHBjXHJcbiAgICAgICAgfTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIGF1Z21lbnQgYWRkVHJhY2sgd2hlbiBnZXRTZW5kZXJzIGlzIG5vdCBhdmFpbGFibGUuXHJcbiAgICAgIGlmICghd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTZW5kZXJzKSB7XHJcbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTZW5kZXJzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB0aGlzLl9zZW5kZXJzID0gdGhpcy5fc2VuZGVycyB8fCBbXTtcclxuICAgICAgICAgIHJldHVybiB0aGlzLl9zZW5kZXJzLnNsaWNlKCk7IC8vIHJldHVybiBhIGNvcHkgb2YgdGhlIGludGVybmFsIHN0YXRlLlxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIG9yaWdBZGRUcmFjayA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2s7XHJcbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjayA9IGZ1bmN0aW9uKHRyYWNrLCBzdHJlYW0pIHtcclxuICAgICAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyID0gb3JpZ0FkZFRyYWNrLmFwcGx5KHBjLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgaWYgKCFzZW5kZXIpIHtcclxuICAgICAgICAgICAgc2VuZGVyID0gc2hpbVNlbmRlcldpdGhEdG1mKHBjLCB0cmFjayk7XHJcbiAgICAgICAgICAgIHBjLl9zZW5kZXJzLnB1c2goc2VuZGVyKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBzZW5kZXI7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmFyIG9yaWdSZW1vdmVUcmFjayA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlVHJhY2s7XHJcbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVUcmFjayA9IGZ1bmN0aW9uKHNlbmRlcikge1xyXG4gICAgICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgICAgIG9yaWdSZW1vdmVUcmFjay5hcHBseShwYywgYXJndW1lbnRzKTtcclxuICAgICAgICAgIHZhciBpZHggPSBwYy5fc2VuZGVycy5pbmRleE9mKHNlbmRlcik7XHJcbiAgICAgICAgICBpZiAoaWR4ICE9PSAtMSkge1xyXG4gICAgICAgICAgICBwYy5fc2VuZGVycy5zcGxpY2UoaWR4LCAxKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICAgIHZhciBvcmlnQWRkU3RyZWFtID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRTdHJlYW07XHJcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgICBwYy5fc2VuZGVycyA9IHBjLl9zZW5kZXJzIHx8IFtdO1xyXG4gICAgICAgIG9yaWdBZGRTdHJlYW0uYXBwbHkocGMsIFtzdHJlYW1dKTtcclxuICAgICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xyXG4gICAgICAgICAgcGMuX3NlbmRlcnMucHVzaChzaGltU2VuZGVyV2l0aER0bWYocGMsIHRyYWNrKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICB2YXIgb3JpZ1JlbW92ZVN0cmVhbSA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlU3RyZWFtO1xyXG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xyXG4gICAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgICAgcGMuX3NlbmRlcnMgPSBwYy5fc2VuZGVycyB8fCBbXTtcclxuICAgICAgICBvcmlnUmVtb3ZlU3RyZWFtLmFwcGx5KHBjLCBbc3RyZWFtXSk7XHJcblxyXG4gICAgICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyID0gcGMuX3NlbmRlcnMuZmluZChmdW5jdGlvbihzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzLnRyYWNrID09PSB0cmFjaztcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgaWYgKHNlbmRlcikge1xyXG4gICAgICAgICAgICBwYy5fc2VuZGVycy5zcGxpY2UocGMuX3NlbmRlcnMuaW5kZXhPZihzZW5kZXIpLCAxKTsgLy8gcmVtb3ZlIHNlbmRlclxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9O1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gJiZcclxuICAgICAgICAgICAgICAgJ2dldFNlbmRlcnMnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUgJiZcclxuICAgICAgICAgICAgICAgJ2NyZWF0ZURUTUZTZW5kZXInIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUgJiZcclxuICAgICAgICAgICAgICAgd2luZG93LlJUQ1J0cFNlbmRlciAmJlxyXG4gICAgICAgICAgICAgICAhKCdkdG1mJyBpbiB3aW5kb3cuUlRDUnRwU2VuZGVyLnByb3RvdHlwZSkpIHtcclxuICAgICAgdmFyIG9yaWdHZXRTZW5kZXJzID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTZW5kZXJzO1xyXG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFNlbmRlcnMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBzZW5kZXJzID0gb3JpZ0dldFNlbmRlcnMuYXBwbHkocGMsIFtdKTtcclxuICAgICAgICBzZW5kZXJzLmZvckVhY2goZnVuY3Rpb24oc2VuZGVyKSB7XHJcbiAgICAgICAgICBzZW5kZXIuX3BjID0gcGM7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHNlbmRlcnM7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1J0cFNlbmRlci5wcm90b3R5cGUsICdkdG1mJywge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5fZHRtZiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRyYWNrLmtpbmQgPT09ICdhdWRpbycpIHtcclxuICAgICAgICAgICAgICB0aGlzLl9kdG1mID0gdGhpcy5fcGMuY3JlYXRlRFRNRlNlbmRlcih0aGlzLnRyYWNrKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB0aGlzLl9kdG1mID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2R0bWY7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBzaGltU291cmNlT2JqZWN0OiBmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIHZhciBVUkwgPSB3aW5kb3cgJiYgd2luZG93LlVSTDtcclxuXHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgaWYgKHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50ICYmXHJcbiAgICAgICAgISgnc3JjT2JqZWN0JyBpbiB3aW5kb3cuSFRNTE1lZGlhRWxlbWVudC5wcm90b3R5cGUpKSB7XHJcbiAgICAgICAgLy8gU2hpbSB0aGUgc3JjT2JqZWN0IHByb3BlcnR5LCBvbmNlLCB3aGVuIEhUTUxNZWRpYUVsZW1lbnQgaXMgZm91bmQuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50LnByb3RvdHlwZSwgJ3NyY09iamVjdCcsIHtcclxuICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zcmNPYmplY3Q7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgc2V0OiBmdW5jdGlvbihzdHJlYW0pIHtcclxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICAvLyBVc2UgX3NyY09iamVjdCBhcyBhIHByaXZhdGUgcHJvcGVydHkgZm9yIHRoaXMgc2hpbVxyXG4gICAgICAgICAgICB0aGlzLl9zcmNPYmplY3QgPSBzdHJlYW07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNyYykge1xyXG4gICAgICAgICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwodGhpcy5zcmMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIXN0cmVhbSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuc3JjID0gJyc7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoc3RyZWFtKTtcclxuICAgICAgICAgICAgLy8gV2UgbmVlZCB0byByZWNyZWF0ZSB0aGUgYmxvYiB1cmwgd2hlbiBhIHRyYWNrIGlzIGFkZGVkIG9yXHJcbiAgICAgICAgICAgIC8vIHJlbW92ZWQuIERvaW5nIGl0IG1hbnVhbGx5IHNpbmNlIHdlIHdhbnQgdG8gYXZvaWQgYSByZWN1cnNpb24uXHJcbiAgICAgICAgICAgIHN0cmVhbS5hZGRFdmVudExpc3RlbmVyKCdhZGR0cmFjaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgIGlmIChzZWxmLnNyYykge1xyXG4gICAgICAgICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChzZWxmLnNyYyk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHNlbGYuc3JjID0gVVJMLmNyZWF0ZU9iamVjdFVSTChzdHJlYW0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoJ3JlbW92ZXRyYWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgaWYgKHNlbGYuc3JjKSB7XHJcbiAgICAgICAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHNlbGYuc3JjKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgc2VsZi5zcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKHN0cmVhbSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgc2hpbUFkZFRyYWNrUmVtb3ZlVHJhY2tXaXRoTmF0aXZlOiBmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIC8vIHNoaW0gYWRkVHJhY2svcmVtb3ZlVHJhY2sgd2l0aCBuYXRpdmUgdmFyaWFudHMgaW4gb3JkZXIgdG8gbWFrZVxyXG4gICAgLy8gdGhlIGludGVyYWN0aW9ucyB3aXRoIGxlZ2FjeSBnZXRMb2NhbFN0cmVhbXMgYmVoYXZlIGFzIGluIG90aGVyIGJyb3dzZXJzLlxyXG4gICAgLy8gS2VlcHMgYSBtYXBwaW5nIHN0cmVhbS5pZCA9PiBbc3RyZWFtLCBydHBzZW5kZXJzLi4uXVxyXG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRMb2NhbFN0cmVhbXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcyA9IHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMgfHwge307XHJcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zKS5tYXAoZnVuY3Rpb24oc3RyZWFtSWQpIHtcclxuICAgICAgICByZXR1cm4gcGMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtSWRdWzBdO1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIG9yaWdBZGRUcmFjayA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2s7XHJcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFRyYWNrID0gZnVuY3Rpb24odHJhY2ssIHN0cmVhbSkge1xyXG4gICAgICBpZiAoIXN0cmVhbSkge1xyXG4gICAgICAgIHJldHVybiBvcmlnQWRkVHJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zID0gdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcyB8fCB7fTtcclxuXHJcbiAgICAgIHZhciBzZW5kZXIgPSBvcmlnQWRkVHJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgaWYgKCF0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbS5pZF0pIHtcclxuICAgICAgICB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbS5pZF0gPSBbc3RyZWFtLCBzZW5kZXJdO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtLmlkXS5pbmRleE9mKHNlbmRlcikgPT09IC0xKSB7XHJcbiAgICAgICAgdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW0uaWRdLnB1c2goc2VuZGVyKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc2VuZGVyO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgb3JpZ0FkZFN0cmVhbSA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkU3RyZWFtO1xyXG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcclxuICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcyA9IHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMgfHwge307XHJcblxyXG4gICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xyXG4gICAgICAgIHZhciBhbHJlYWR5RXhpc3RzID0gcGMuZ2V0U2VuZGVycygpLmZpbmQoZnVuY3Rpb24ocykge1xyXG4gICAgICAgICAgcmV0dXJuIHMudHJhY2sgPT09IHRyYWNrO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChhbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKCdUcmFjayBhbHJlYWR5IGV4aXN0cy4nLFxyXG4gICAgICAgICAgICAgICdJbnZhbGlkQWNjZXNzRXJyb3InKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICB2YXIgZXhpc3RpbmdTZW5kZXJzID0gcGMuZ2V0U2VuZGVycygpO1xyXG4gICAgICBvcmlnQWRkU3RyZWFtLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgIHZhciBuZXdTZW5kZXJzID0gcGMuZ2V0U2VuZGVycygpLmZpbHRlcihmdW5jdGlvbihuZXdTZW5kZXIpIHtcclxuICAgICAgICByZXR1cm4gZXhpc3RpbmdTZW5kZXJzLmluZGV4T2YobmV3U2VuZGVyKSA9PT0gLTE7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbS5pZF0gPSBbc3RyZWFtXS5jb25jYXQobmV3U2VuZGVycyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBvcmlnUmVtb3ZlU3RyZWFtID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVTdHJlYW07XHJcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xyXG4gICAgICB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zID0gdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcyB8fCB7fTtcclxuICAgICAgZGVsZXRlIHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtLmlkXTtcclxuICAgICAgcmV0dXJuIG9yaWdSZW1vdmVTdHJlYW0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIG9yaWdSZW1vdmVUcmFjayA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlVHJhY2s7XHJcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVRyYWNrID0gZnVuY3Rpb24oc2VuZGVyKSB7XHJcbiAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgIHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMgPSB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zIHx8IHt9O1xyXG4gICAgICBpZiAoc2VuZGVyKSB7XHJcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcykuZm9yRWFjaChmdW5jdGlvbihzdHJlYW1JZCkge1xyXG4gICAgICAgICAgdmFyIGlkeCA9IHBjLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbUlkXS5pbmRleE9mKHNlbmRlcik7XHJcbiAgICAgICAgICBpZiAoaWR4ICE9PSAtMSkge1xyXG4gICAgICAgICAgICBwYy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW1JZF0uc3BsaWNlKGlkeCwgMSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAocGMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtSWRdLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICBkZWxldGUgcGMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtSWRdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBvcmlnUmVtb3ZlVHJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIH07XHJcbiAgfSxcclxuXHJcbiAgc2hpbUFkZFRyYWNrUmVtb3ZlVHJhY2s6IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgdmFyIGJyb3dzZXJEZXRhaWxzID0gdXRpbHMuZGV0ZWN0QnJvd3Nlcih3aW5kb3cpO1xyXG4gICAgLy8gc2hpbSBhZGRUcmFjayBhbmQgcmVtb3ZlVHJhY2suXHJcbiAgICBpZiAod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjayAmJlxyXG4gICAgICAgIGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPj0gNjUpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuc2hpbUFkZFRyYWNrUmVtb3ZlVHJhY2tXaXRoTmF0aXZlKHdpbmRvdyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYWxzbyBzaGltIHBjLmdldExvY2FsU3RyZWFtcyB3aGVuIGFkZFRyYWNrIGlzIHNoaW1tZWRcclxuICAgIC8vIHRvIHJldHVybiB0aGUgb3JpZ2luYWwgc3RyZWFtcy5cclxuICAgIHZhciBvcmlnR2V0TG9jYWxTdHJlYW1zID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVxyXG4gICAgICAgIC5nZXRMb2NhbFN0cmVhbXM7XHJcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldExvY2FsU3RyZWFtcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICB2YXIgbmF0aXZlU3RyZWFtcyA9IG9yaWdHZXRMb2NhbFN0cmVhbXMuYXBwbHkodGhpcyk7XHJcbiAgICAgIHBjLl9yZXZlcnNlU3RyZWFtcyA9IHBjLl9yZXZlcnNlU3RyZWFtcyB8fCB7fTtcclxuICAgICAgcmV0dXJuIG5hdGl2ZVN0cmVhbXMubWFwKGZ1bmN0aW9uKHN0cmVhbSkge1xyXG4gICAgICAgIHJldHVybiBwYy5fcmV2ZXJzZVN0cmVhbXNbc3RyZWFtLmlkXTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBvcmlnQWRkU3RyZWFtID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRTdHJlYW07XHJcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xyXG4gICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICBwYy5fc3RyZWFtcyA9IHBjLl9zdHJlYW1zIHx8IHt9O1xyXG4gICAgICBwYy5fcmV2ZXJzZVN0cmVhbXMgPSBwYy5fcmV2ZXJzZVN0cmVhbXMgfHwge307XHJcblxyXG4gICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xyXG4gICAgICAgIHZhciBhbHJlYWR5RXhpc3RzID0gcGMuZ2V0U2VuZGVycygpLmZpbmQoZnVuY3Rpb24ocykge1xyXG4gICAgICAgICAgcmV0dXJuIHMudHJhY2sgPT09IHRyYWNrO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChhbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKCdUcmFjayBhbHJlYWR5IGV4aXN0cy4nLFxyXG4gICAgICAgICAgICAgICdJbnZhbGlkQWNjZXNzRXJyb3InKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBBZGQgaWRlbnRpdHkgbWFwcGluZyBmb3IgY29uc2lzdGVuY3kgd2l0aCBhZGRUcmFjay5cclxuICAgICAgLy8gVW5sZXNzIHRoaXMgaXMgYmVpbmcgdXNlZCB3aXRoIGEgc3RyZWFtIGZyb20gYWRkVHJhY2suXHJcbiAgICAgIGlmICghcGMuX3JldmVyc2VTdHJlYW1zW3N0cmVhbS5pZF0pIHtcclxuICAgICAgICB2YXIgbmV3U3RyZWFtID0gbmV3IHdpbmRvdy5NZWRpYVN0cmVhbShzdHJlYW0uZ2V0VHJhY2tzKCkpO1xyXG4gICAgICAgIHBjLl9zdHJlYW1zW3N0cmVhbS5pZF0gPSBuZXdTdHJlYW07XHJcbiAgICAgICAgcGMuX3JldmVyc2VTdHJlYW1zW25ld1N0cmVhbS5pZF0gPSBzdHJlYW07XHJcbiAgICAgICAgc3RyZWFtID0gbmV3U3RyZWFtO1xyXG4gICAgICB9XHJcbiAgICAgIG9yaWdBZGRTdHJlYW0uYXBwbHkocGMsIFtzdHJlYW1dKTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIG9yaWdSZW1vdmVTdHJlYW0gPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVN0cmVhbTtcclxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgIHBjLl9zdHJlYW1zID0gcGMuX3N0cmVhbXMgfHwge307XHJcbiAgICAgIHBjLl9yZXZlcnNlU3RyZWFtcyA9IHBjLl9yZXZlcnNlU3RyZWFtcyB8fCB7fTtcclxuXHJcbiAgICAgIG9yaWdSZW1vdmVTdHJlYW0uYXBwbHkocGMsIFsocGMuX3N0cmVhbXNbc3RyZWFtLmlkXSB8fCBzdHJlYW0pXSk7XHJcbiAgICAgIGRlbGV0ZSBwYy5fcmV2ZXJzZVN0cmVhbXNbKHBjLl9zdHJlYW1zW3N0cmVhbS5pZF0gP1xyXG4gICAgICAgICAgcGMuX3N0cmVhbXNbc3RyZWFtLmlkXS5pZCA6IHN0cmVhbS5pZCldO1xyXG4gICAgICBkZWxldGUgcGMuX3N0cmVhbXNbc3RyZWFtLmlkXTtcclxuICAgIH07XHJcblxyXG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjayA9IGZ1bmN0aW9uKHRyYWNrLCBzdHJlYW0pIHtcclxuICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgaWYgKHBjLnNpZ25hbGluZ1N0YXRlID09PSAnY2xvc2VkJykge1xyXG4gICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oXHJcbiAgICAgICAgICAnVGhlIFJUQ1BlZXJDb25uZWN0aW9uXFwncyBzaWduYWxpbmdTdGF0ZSBpcyBcXCdjbG9zZWRcXCcuJyxcclxuICAgICAgICAgICdJbnZhbGlkU3RhdGVFcnJvcicpO1xyXG4gICAgICB9XHJcbiAgICAgIHZhciBzdHJlYW1zID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xyXG4gICAgICBpZiAoc3RyZWFtcy5sZW5ndGggIT09IDEgfHxcclxuICAgICAgICAgICFzdHJlYW1zWzBdLmdldFRyYWNrcygpLmZpbmQoZnVuY3Rpb24odCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdCA9PT0gdHJhY2s7XHJcbiAgICAgICAgICB9KSkge1xyXG4gICAgICAgIC8vIHRoaXMgaXMgbm90IGZ1bGx5IGNvcnJlY3QgYnV0IGFsbCB3ZSBjYW4gbWFuYWdlIHdpdGhvdXRcclxuICAgICAgICAvLyBbW2Fzc29jaWF0ZWQgTWVkaWFTdHJlYW1zXV0gaW50ZXJuYWwgc2xvdC5cclxuICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKFxyXG4gICAgICAgICAgJ1RoZSBhZGFwdGVyLmpzIGFkZFRyYWNrIHBvbHlmaWxsIG9ubHkgc3VwcG9ydHMgYSBzaW5nbGUgJyArXHJcbiAgICAgICAgICAnIHN0cmVhbSB3aGljaCBpcyBhc3NvY2lhdGVkIHdpdGggdGhlIHNwZWNpZmllZCB0cmFjay4nLFxyXG4gICAgICAgICAgJ05vdFN1cHBvcnRlZEVycm9yJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBhbHJlYWR5RXhpc3RzID0gcGMuZ2V0U2VuZGVycygpLmZpbmQoZnVuY3Rpb24ocykge1xyXG4gICAgICAgIHJldHVybiBzLnRyYWNrID09PSB0cmFjaztcclxuICAgICAgfSk7XHJcbiAgICAgIGlmIChhbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbignVHJhY2sgYWxyZWFkeSBleGlzdHMuJyxcclxuICAgICAgICAgICAgJ0ludmFsaWRBY2Nlc3NFcnJvcicpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwYy5fc3RyZWFtcyA9IHBjLl9zdHJlYW1zIHx8IHt9O1xyXG4gICAgICBwYy5fcmV2ZXJzZVN0cmVhbXMgPSBwYy5fcmV2ZXJzZVN0cmVhbXMgfHwge307XHJcbiAgICAgIHZhciBvbGRTdHJlYW0gPSBwYy5fc3RyZWFtc1tzdHJlYW0uaWRdO1xyXG4gICAgICBpZiAob2xkU3RyZWFtKSB7XHJcbiAgICAgICAgLy8gdGhpcyBpcyB1c2luZyBvZGQgQ2hyb21lIGJlaGF2aW91ciwgdXNlIHdpdGggY2F1dGlvbjpcclxuICAgICAgICAvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3Avd2VicnRjL2lzc3Vlcy9kZXRhaWw/aWQ9NzgxNVxyXG4gICAgICAgIC8vIE5vdGU6IHdlIHJlbHkgb24gdGhlIGhpZ2gtbGV2ZWwgYWRkVHJhY2svZHRtZiBzaGltIHRvXHJcbiAgICAgICAgLy8gY3JlYXRlIHRoZSBzZW5kZXIgd2l0aCBhIGR0bWYgc2VuZGVyLlxyXG4gICAgICAgIG9sZFN0cmVhbS5hZGRUcmFjayh0cmFjayk7XHJcblxyXG4gICAgICAgIC8vIFRyaWdnZXIgT05OIGFzeW5jLlxyXG4gICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBwYy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnbmVnb3RpYXRpb25uZWVkZWQnKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIG5ld1N0cmVhbSA9IG5ldyB3aW5kb3cuTWVkaWFTdHJlYW0oW3RyYWNrXSk7XHJcbiAgICAgICAgcGMuX3N0cmVhbXNbc3RyZWFtLmlkXSA9IG5ld1N0cmVhbTtcclxuICAgICAgICBwYy5fcmV2ZXJzZVN0cmVhbXNbbmV3U3RyZWFtLmlkXSA9IHN0cmVhbTtcclxuICAgICAgICBwYy5hZGRTdHJlYW0obmV3U3RyZWFtKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcGMuZ2V0U2VuZGVycygpLmZpbmQoZnVuY3Rpb24ocykge1xyXG4gICAgICAgIHJldHVybiBzLnRyYWNrID09PSB0cmFjaztcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIHJlcGxhY2UgdGhlIGludGVybmFsIHN0cmVhbSBpZCB3aXRoIHRoZSBleHRlcm5hbCBvbmUgYW5kXHJcbiAgICAvLyB2aWNlIHZlcnNhLlxyXG4gICAgZnVuY3Rpb24gcmVwbGFjZUludGVybmFsU3RyZWFtSWQocGMsIGRlc2NyaXB0aW9uKSB7XHJcbiAgICAgIHZhciBzZHAgPSBkZXNjcmlwdGlvbi5zZHA7XHJcbiAgICAgIE9iamVjdC5rZXlzKHBjLl9yZXZlcnNlU3RyZWFtcyB8fCBbXSkuZm9yRWFjaChmdW5jdGlvbihpbnRlcm5hbElkKSB7XHJcbiAgICAgICAgdmFyIGV4dGVybmFsU3RyZWFtID0gcGMuX3JldmVyc2VTdHJlYW1zW2ludGVybmFsSWRdO1xyXG4gICAgICAgIHZhciBpbnRlcm5hbFN0cmVhbSA9IHBjLl9zdHJlYW1zW2V4dGVybmFsU3RyZWFtLmlkXTtcclxuICAgICAgICBzZHAgPSBzZHAucmVwbGFjZShuZXcgUmVnRXhwKGludGVybmFsU3RyZWFtLmlkLCAnZycpLFxyXG4gICAgICAgICAgICBleHRlcm5hbFN0cmVhbS5pZCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gbmV3IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbih7XHJcbiAgICAgICAgdHlwZTogZGVzY3JpcHRpb24udHlwZSxcclxuICAgICAgICBzZHA6IHNkcFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHJlcGxhY2VFeHRlcm5hbFN0cmVhbUlkKHBjLCBkZXNjcmlwdGlvbikge1xyXG4gICAgICB2YXIgc2RwID0gZGVzY3JpcHRpb24uc2RwO1xyXG4gICAgICBPYmplY3Qua2V5cyhwYy5fcmV2ZXJzZVN0cmVhbXMgfHwgW10pLmZvckVhY2goZnVuY3Rpb24oaW50ZXJuYWxJZCkge1xyXG4gICAgICAgIHZhciBleHRlcm5hbFN0cmVhbSA9IHBjLl9yZXZlcnNlU3RyZWFtc1tpbnRlcm5hbElkXTtcclxuICAgICAgICB2YXIgaW50ZXJuYWxTdHJlYW0gPSBwYy5fc3RyZWFtc1tleHRlcm5hbFN0cmVhbS5pZF07XHJcbiAgICAgICAgc2RwID0gc2RwLnJlcGxhY2UobmV3IFJlZ0V4cChleHRlcm5hbFN0cmVhbS5pZCwgJ2cnKSxcclxuICAgICAgICAgICAgaW50ZXJuYWxTdHJlYW0uaWQpO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIG5ldyBSVENTZXNzaW9uRGVzY3JpcHRpb24oe1xyXG4gICAgICAgIHR5cGU6IGRlc2NyaXB0aW9uLnR5cGUsXHJcbiAgICAgICAgc2RwOiBzZHBcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBbJ2NyZWF0ZU9mZmVyJywgJ2NyZWF0ZUFuc3dlciddLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XHJcbiAgICAgIHZhciBuYXRpdmVNZXRob2QgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF07XHJcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XHJcbiAgICAgICAgdmFyIGlzTGVnYWN5Q2FsbCA9IGFyZ3VtZW50cy5sZW5ndGggJiZcclxuICAgICAgICAgICAgdHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ2Z1bmN0aW9uJztcclxuICAgICAgICBpZiAoaXNMZWdhY3lDYWxsKSB7XHJcbiAgICAgICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHBjLCBbXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uKGRlc2NyaXB0aW9uKSB7XHJcbiAgICAgICAgICAgICAgdmFyIGRlc2MgPSByZXBsYWNlSW50ZXJuYWxTdHJlYW1JZChwYywgZGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgIGFyZ3NbMF0uYXBwbHkobnVsbCwgW2Rlc2NdKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgaWYgKGFyZ3NbMV0pIHtcclxuICAgICAgICAgICAgICAgIGFyZ3NbMV0uYXBwbHkobnVsbCwgZXJyKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGFyZ3VtZW50c1syXVxyXG4gICAgICAgICAgXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkocGMsIGFyZ3VtZW50cylcclxuICAgICAgICAudGhlbihmdW5jdGlvbihkZXNjcmlwdGlvbikge1xyXG4gICAgICAgICAgcmV0dXJuIHJlcGxhY2VJbnRlcm5hbFN0cmVhbUlkKHBjLCBkZXNjcmlwdGlvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgb3JpZ1NldExvY2FsRGVzY3JpcHRpb24gPVxyXG4gICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0TG9jYWxEZXNjcmlwdGlvbjtcclxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0TG9jYWxEZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGggfHwgIWFyZ3VtZW50c1swXS50eXBlKSB7XHJcbiAgICAgICAgcmV0dXJuIG9yaWdTZXRMb2NhbERlc2NyaXB0aW9uLmFwcGx5KHBjLCBhcmd1bWVudHMpO1xyXG4gICAgICB9XHJcbiAgICAgIGFyZ3VtZW50c1swXSA9IHJlcGxhY2VFeHRlcm5hbFN0cmVhbUlkKHBjLCBhcmd1bWVudHNbMF0pO1xyXG4gICAgICByZXR1cm4gb3JpZ1NldExvY2FsRGVzY3JpcHRpb24uYXBwbHkocGMsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIFRPRE86IG1hbmdsZSBnZXRTdGF0czogaHR0cHM6Ly93M2MuZ2l0aHViLmlvL3dlYnJ0Yy1zdGF0cy8jZG9tLXJ0Y21lZGlhc3RyZWFtc3RhdHMtc3RyZWFtaWRlbnRpZmllclxyXG5cclxuICAgIHZhciBvcmlnTG9jYWxEZXNjcmlwdGlvbiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoXHJcbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSwgJ2xvY2FsRGVzY3JpcHRpb24nKTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLFxyXG4gICAgICAgICdsb2NhbERlc2NyaXB0aW9uJywge1xyXG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGRlc2NyaXB0aW9uID0gb3JpZ0xvY2FsRGVzY3JpcHRpb24uZ2V0LmFwcGx5KHRoaXMpO1xyXG4gICAgICAgICAgICBpZiAoZGVzY3JpcHRpb24udHlwZSA9PT0gJycpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gZGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJlcGxhY2VJbnRlcm5hbFN0cmVhbUlkKHBjLCBkZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVUcmFjayA9IGZ1bmN0aW9uKHNlbmRlcikge1xyXG4gICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICBpZiAocGMuc2lnbmFsaW5nU3RhdGUgPT09ICdjbG9zZWQnKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbihcclxuICAgICAgICAgICdUaGUgUlRDUGVlckNvbm5lY3Rpb25cXCdzIHNpZ25hbGluZ1N0YXRlIGlzIFxcJ2Nsb3NlZFxcJy4nLFxyXG4gICAgICAgICAgJ0ludmFsaWRTdGF0ZUVycm9yJyk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gV2UgY2FuIG5vdCB5ZXQgY2hlY2sgZm9yIHNlbmRlciBpbnN0YW5jZW9mIFJUQ1J0cFNlbmRlclxyXG4gICAgICAvLyBzaW5jZSB3ZSBzaGltIFJUUFNlbmRlci4gU28gd2UgY2hlY2sgaWYgc2VuZGVyLl9wYyBpcyBzZXQuXHJcbiAgICAgIGlmICghc2VuZGVyLl9wYykge1xyXG4gICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oJ0FyZ3VtZW50IDEgb2YgUlRDUGVlckNvbm5lY3Rpb24ucmVtb3ZlVHJhY2sgJyArXHJcbiAgICAgICAgICAgICdkb2VzIG5vdCBpbXBsZW1lbnQgaW50ZXJmYWNlIFJUQ1J0cFNlbmRlci4nLCAnVHlwZUVycm9yJyk7XHJcbiAgICAgIH1cclxuICAgICAgdmFyIGlzTG9jYWwgPSBzZW5kZXIuX3BjID09PSBwYztcclxuICAgICAgaWYgKCFpc0xvY2FsKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbignU2VuZGVyIHdhcyBub3QgY3JlYXRlZCBieSB0aGlzIGNvbm5lY3Rpb24uJyxcclxuICAgICAgICAgICAgJ0ludmFsaWRBY2Nlc3NFcnJvcicpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBTZWFyY2ggZm9yIHRoZSBuYXRpdmUgc3RyZWFtIHRoZSBzZW5kZXJzIHRyYWNrIGJlbG9uZ3MgdG8uXHJcbiAgICAgIHBjLl9zdHJlYW1zID0gcGMuX3N0cmVhbXMgfHwge307XHJcbiAgICAgIHZhciBzdHJlYW07XHJcbiAgICAgIE9iamVjdC5rZXlzKHBjLl9zdHJlYW1zKS5mb3JFYWNoKGZ1bmN0aW9uKHN0cmVhbWlkKSB7XHJcbiAgICAgICAgdmFyIGhhc1RyYWNrID0gcGMuX3N0cmVhbXNbc3RyZWFtaWRdLmdldFRyYWNrcygpLmZpbmQoZnVuY3Rpb24odHJhY2spIHtcclxuICAgICAgICAgIHJldHVybiBzZW5kZXIudHJhY2sgPT09IHRyYWNrO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChoYXNUcmFjaykge1xyXG4gICAgICAgICAgc3RyZWFtID0gcGMuX3N0cmVhbXNbc3RyZWFtaWRdO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoc3RyZWFtKSB7XHJcbiAgICAgICAgaWYgKHN0cmVhbS5nZXRUcmFja3MoKS5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgIC8vIGlmIHRoaXMgaXMgdGhlIGxhc3QgdHJhY2sgb2YgdGhlIHN0cmVhbSwgcmVtb3ZlIHRoZSBzdHJlYW0uIFRoaXNcclxuICAgICAgICAgIC8vIHRha2VzIGNhcmUgb2YgYW55IHNoaW1tZWQgX3NlbmRlcnMuXHJcbiAgICAgICAgICBwYy5yZW1vdmVTdHJlYW0ocGMuX3JldmVyc2VTdHJlYW1zW3N0cmVhbS5pZF0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyByZWx5aW5nIG9uIHRoZSBzYW1lIG9kZCBjaHJvbWUgYmVoYXZpb3VyIGFzIGFib3ZlLlxyXG4gICAgICAgICAgc3RyZWFtLnJlbW92ZVRyYWNrKHNlbmRlci50cmFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBjLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCduZWdvdGlhdGlvbm5lZWRlZCcpKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9LFxyXG5cclxuICBzaGltUGVlckNvbm5lY3Rpb246IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgdmFyIGJyb3dzZXJEZXRhaWxzID0gdXRpbHMuZGV0ZWN0QnJvd3Nlcih3aW5kb3cpO1xyXG5cclxuICAgIC8vIFRoZSBSVENQZWVyQ29ubmVjdGlvbiBvYmplY3QuXHJcbiAgICBpZiAoIXdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiAmJiB3aW5kb3cud2Via2l0UlRDUGVlckNvbm5lY3Rpb24pIHtcclxuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uID0gZnVuY3Rpb24ocGNDb25maWcsIHBjQ29uc3RyYWludHMpIHtcclxuICAgICAgICAvLyBUcmFuc2xhdGUgaWNlVHJhbnNwb3J0UG9saWN5IHRvIGljZVRyYW5zcG9ydHMsXHJcbiAgICAgICAgLy8gc2VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3Avd2VicnRjL2lzc3Vlcy9kZXRhaWw/aWQ9NDg2OVxyXG4gICAgICAgIC8vIHRoaXMgd2FzIGZpeGVkIGluIE01NiBhbG9uZyB3aXRoIHVucHJlZml4aW5nIFJUQ1BlZXJDb25uZWN0aW9uLlxyXG4gICAgICAgIGxvZ2dpbmcoJ1BlZXJDb25uZWN0aW9uJyk7XHJcbiAgICAgICAgaWYgKHBjQ29uZmlnICYmIHBjQ29uZmlnLmljZVRyYW5zcG9ydFBvbGljeSkge1xyXG4gICAgICAgICAgcGNDb25maWcuaWNlVHJhbnNwb3J0cyA9IHBjQ29uZmlnLmljZVRyYW5zcG9ydFBvbGljeTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgd2luZG93LndlYmtpdFJUQ1BlZXJDb25uZWN0aW9uKHBjQ29uZmlnLCBwY0NvbnN0cmFpbnRzKTtcclxuICAgICAgfTtcclxuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSA9XHJcbiAgICAgICAgICB3aW5kb3cud2Via2l0UlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlO1xyXG4gICAgICAvLyB3cmFwIHN0YXRpYyBtZXRob2RzLiBDdXJyZW50bHkganVzdCBnZW5lcmF0ZUNlcnRpZmljYXRlLlxyXG4gICAgICBpZiAod2luZG93LndlYmtpdFJUQ1BlZXJDb25uZWN0aW9uLmdlbmVyYXRlQ2VydGlmaWNhdGUpIHtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLCAnZ2VuZXJhdGVDZXJ0aWZpY2F0ZScsIHtcclxuICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cud2Via2l0UlRDUGVlckNvbm5lY3Rpb24uZ2VuZXJhdGVDZXJ0aWZpY2F0ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gbWlncmF0ZSBmcm9tIG5vbi1zcGVjIFJUQ0ljZVNlcnZlci51cmwgdG8gUlRDSWNlU2VydmVyLnVybHNcclxuICAgICAgdmFyIE9yaWdQZWVyQ29ubmVjdGlvbiA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbjtcclxuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uID0gZnVuY3Rpb24ocGNDb25maWcsIHBjQ29uc3RyYWludHMpIHtcclxuICAgICAgICBpZiAocGNDb25maWcgJiYgcGNDb25maWcuaWNlU2VydmVycykge1xyXG4gICAgICAgICAgdmFyIG5ld0ljZVNlcnZlcnMgPSBbXTtcclxuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGNDb25maWcuaWNlU2VydmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgc2VydmVyID0gcGNDb25maWcuaWNlU2VydmVyc1tpXTtcclxuICAgICAgICAgICAgaWYgKCFzZXJ2ZXIuaGFzT3duUHJvcGVydHkoJ3VybHMnKSAmJlxyXG4gICAgICAgICAgICAgICAgc2VydmVyLmhhc093blByb3BlcnR5KCd1cmwnKSkge1xyXG4gICAgICAgICAgICAgIHV0aWxzLmRlcHJlY2F0ZWQoJ1JUQ0ljZVNlcnZlci51cmwnLCAnUlRDSWNlU2VydmVyLnVybHMnKTtcclxuICAgICAgICAgICAgICBzZXJ2ZXIgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHNlcnZlcikpO1xyXG4gICAgICAgICAgICAgIHNlcnZlci51cmxzID0gc2VydmVyLnVybDtcclxuICAgICAgICAgICAgICBuZXdJY2VTZXJ2ZXJzLnB1c2goc2VydmVyKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBuZXdJY2VTZXJ2ZXJzLnB1c2gocGNDb25maWcuaWNlU2VydmVyc1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHBjQ29uZmlnLmljZVNlcnZlcnMgPSBuZXdJY2VTZXJ2ZXJzO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IE9yaWdQZWVyQ29ubmVjdGlvbihwY0NvbmZpZywgcGNDb25zdHJhaW50cyk7XHJcbiAgICAgIH07XHJcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUgPSBPcmlnUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlO1xyXG4gICAgICAvLyB3cmFwIHN0YXRpYyBtZXRob2RzLiBDdXJyZW50bHkganVzdCBnZW5lcmF0ZUNlcnRpZmljYXRlLlxyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLCAnZ2VuZXJhdGVDZXJ0aWZpY2F0ZScsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmV0dXJuIE9yaWdQZWVyQ29ubmVjdGlvbi5nZW5lcmF0ZUNlcnRpZmljYXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG9yaWdHZXRTdGF0cyA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U3RhdHM7XHJcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFN0YXRzID0gZnVuY3Rpb24oc2VsZWN0b3IsXHJcbiAgICAgICAgc3VjY2Vzc0NhbGxiYWNrLCBlcnJvckNhbGxiYWNrKSB7XHJcbiAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xyXG5cclxuICAgICAgLy8gSWYgc2VsZWN0b3IgaXMgYSBmdW5jdGlvbiB0aGVuIHdlIGFyZSBpbiB0aGUgb2xkIHN0eWxlIHN0YXRzIHNvIGp1c3RcclxuICAgICAgLy8gcGFzcyBiYWNrIHRoZSBvcmlnaW5hbCBnZXRTdGF0cyBmb3JtYXQgdG8gYXZvaWQgYnJlYWtpbmcgb2xkIHVzZXJzLlxyXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgdHlwZW9mIHNlbGVjdG9yID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgcmV0dXJuIG9yaWdHZXRTdGF0cy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBXaGVuIHNwZWMtc3R5bGUgZ2V0U3RhdHMgaXMgc3VwcG9ydGVkLCByZXR1cm4gdGhvc2Ugd2hlbiBjYWxsZWQgd2l0aFxyXG4gICAgICAvLyBlaXRoZXIgbm8gYXJndW1lbnRzIG9yIHRoZSBzZWxlY3RvciBhcmd1bWVudCBpcyBudWxsLlxyXG4gICAgICBpZiAob3JpZ0dldFN0YXRzLmxlbmd0aCA9PT0gMCAmJiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCB8fFxyXG4gICAgICAgICAgdHlwZW9mIGFyZ3VtZW50c1swXSAhPT0gJ2Z1bmN0aW9uJykpIHtcclxuICAgICAgICByZXR1cm4gb3JpZ0dldFN0YXRzLmFwcGx5KHRoaXMsIFtdKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIGZpeENocm9tZVN0YXRzXyA9IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgdmFyIHN0YW5kYXJkUmVwb3J0ID0ge307XHJcbiAgICAgICAgdmFyIHJlcG9ydHMgPSByZXNwb25zZS5yZXN1bHQoKTtcclxuICAgICAgICByZXBvcnRzLmZvckVhY2goZnVuY3Rpb24ocmVwb3J0KSB7XHJcbiAgICAgICAgICB2YXIgc3RhbmRhcmRTdGF0cyA9IHtcclxuICAgICAgICAgICAgaWQ6IHJlcG9ydC5pZCxcclxuICAgICAgICAgICAgdGltZXN0YW1wOiByZXBvcnQudGltZXN0YW1wLFxyXG4gICAgICAgICAgICB0eXBlOiB7XHJcbiAgICAgICAgICAgICAgbG9jYWxjYW5kaWRhdGU6ICdsb2NhbC1jYW5kaWRhdGUnLFxyXG4gICAgICAgICAgICAgIHJlbW90ZWNhbmRpZGF0ZTogJ3JlbW90ZS1jYW5kaWRhdGUnXHJcbiAgICAgICAgICAgIH1bcmVwb3J0LnR5cGVdIHx8IHJlcG9ydC50eXBlXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgcmVwb3J0Lm5hbWVzKCkuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgICAgIHN0YW5kYXJkU3RhdHNbbmFtZV0gPSByZXBvcnQuc3RhdChuYW1lKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgc3RhbmRhcmRSZXBvcnRbc3RhbmRhcmRTdGF0cy5pZF0gPSBzdGFuZGFyZFN0YXRzO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gc3RhbmRhcmRSZXBvcnQ7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBzaGltIGdldFN0YXRzIHdpdGggbWFwbGlrZSBzdXBwb3J0XHJcbiAgICAgIHZhciBtYWtlTWFwU3RhdHMgPSBmdW5jdGlvbihzdGF0cykge1xyXG4gICAgICAgIHJldHVybiBuZXcgTWFwKE9iamVjdC5rZXlzKHN0YXRzKS5tYXAoZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgICByZXR1cm4gW2tleSwgc3RhdHNba2V5XV07XHJcbiAgICAgICAgfSkpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gMikge1xyXG4gICAgICAgIHZhciBzdWNjZXNzQ2FsbGJhY2tXcmFwcGVyXyA9IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICBhcmdzWzFdKG1ha2VNYXBTdGF0cyhmaXhDaHJvbWVTdGF0c18ocmVzcG9uc2UpKSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG9yaWdHZXRTdGF0cy5hcHBseSh0aGlzLCBbc3VjY2Vzc0NhbGxiYWNrV3JhcHBlcl8sXHJcbiAgICAgICAgICBhcmd1bWVudHNbMF1dKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gcHJvbWlzZS1zdXBwb3J0XHJcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBvcmlnR2V0U3RhdHMuYXBwbHkocGMsIFtcclxuICAgICAgICAgIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUobWFrZU1hcFN0YXRzKGZpeENocm9tZVN0YXRzXyhyZXNwb25zZSkpKTtcclxuICAgICAgICAgIH0sIHJlamVjdF0pO1xyXG4gICAgICB9KS50aGVuKHN1Y2Nlc3NDYWxsYmFjaywgZXJyb3JDYWxsYmFjayk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIGFkZCBwcm9taXNlIHN1cHBvcnQgLS0gbmF0aXZlbHkgYXZhaWxhYmxlIGluIENocm9tZSA1MVxyXG4gICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCA1MSkge1xyXG4gICAgICBbJ3NldExvY2FsRGVzY3JpcHRpb24nLCAnc2V0UmVtb3RlRGVzY3JpcHRpb24nLCAnYWRkSWNlQ2FuZGlkYXRlJ11cclxuICAgICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xyXG4gICAgICAgICAgICB2YXIgbmF0aXZlTWV0aG9kID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdO1xyXG4gICAgICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcclxuICAgICAgICAgICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICAgICAgICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgICAgICBuYXRpdmVNZXRob2QuYXBwbHkocGMsIFthcmdzWzBdLCByZXNvbHZlLCByZWplY3RdKTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGFyZ3NbMV0uYXBwbHkobnVsbCwgW10pO1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPj0gMykge1xyXG4gICAgICAgICAgICAgICAgICBhcmdzWzJdLmFwcGx5KG51bGwsIFtlcnJdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHByb21pc2Ugc3VwcG9ydCBmb3IgY3JlYXRlT2ZmZXIgYW5kIGNyZWF0ZUFuc3dlci4gQXZhaWxhYmxlICh3aXRob3V0XHJcbiAgICAvLyBidWdzKSBzaW5jZSBNNTI6IGNyYnVnLzYxOTI4OVxyXG4gICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCA1Mikge1xyXG4gICAgICBbJ2NyZWF0ZU9mZmVyJywgJ2NyZWF0ZUFuc3dlciddLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XHJcbiAgICAgICAgdmFyIG5hdGl2ZU1ldGhvZCA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXTtcclxuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDEgfHwgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiZcclxuICAgICAgICAgICAgICB0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnb2JqZWN0JykpIHtcclxuICAgICAgICAgICAgdmFyIG9wdHMgPSBhcmd1bWVudHMubGVuZ3RoID09PSAxID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgICAgbmF0aXZlTWV0aG9kLmFwcGx5KHBjLCBbcmVzb2x2ZSwgcmVqZWN0LCBvcHRzXSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHNoaW0gaW1wbGljaXQgY3JlYXRpb24gb2YgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uL1JUQ0ljZUNhbmRpZGF0ZVxyXG4gICAgWydzZXRMb2NhbERlc2NyaXB0aW9uJywgJ3NldFJlbW90ZURlc2NyaXB0aW9uJywgJ2FkZEljZUNhbmRpZGF0ZSddXHJcbiAgICAgICAgLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XHJcbiAgICAgICAgICB2YXIgbmF0aXZlTWV0aG9kID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdO1xyXG4gICAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGFyZ3VtZW50c1swXSA9IG5ldyAoKG1ldGhvZCA9PT0gJ2FkZEljZUNhbmRpZGF0ZScpID9cclxuICAgICAgICAgICAgICAgIHdpbmRvdy5SVENJY2VDYW5kaWRhdGUgOlxyXG4gICAgICAgICAgICAgICAgd2luZG93LlJUQ1Nlc3Npb25EZXNjcmlwdGlvbikoYXJndW1lbnRzWzBdKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyBzdXBwb3J0IGZvciBhZGRJY2VDYW5kaWRhdGUobnVsbCBvciB1bmRlZmluZWQpXHJcbiAgICB2YXIgbmF0aXZlQWRkSWNlQ2FuZGlkYXRlID1cclxuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZEljZUNhbmRpZGF0ZTtcclxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkSWNlQ2FuZGlkYXRlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmICghYXJndW1lbnRzWzBdKSB7XHJcbiAgICAgICAgaWYgKGFyZ3VtZW50c1sxXSkge1xyXG4gICAgICAgICAgYXJndW1lbnRzWzFdLmFwcGx5KG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG5hdGl2ZUFkZEljZUNhbmRpZGF0ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgfTtcclxuICB9XHJcbn07XHJcblxyXG59LHtcIi4uL3V0aWxzLmpzXCI6MTMsXCIuL2dldHVzZXJtZWRpYVwiOjZ9XSw2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuLypcclxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcclxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxyXG4gKiAgdHJlZS5cclxuICovXHJcbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscy5qcycpO1xyXG52YXIgbG9nZ2luZyA9IHV0aWxzLmxvZztcclxuXHJcbi8vIEV4cG9zZSBwdWJsaWMgbWV0aG9kcy5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih3aW5kb3cpIHtcclxuICB2YXIgYnJvd3NlckRldGFpbHMgPSB1dGlscy5kZXRlY3RCcm93c2VyKHdpbmRvdyk7XHJcbiAgdmFyIG5hdmlnYXRvciA9IHdpbmRvdyAmJiB3aW5kb3cubmF2aWdhdG9yO1xyXG5cclxuICB2YXIgY29uc3RyYWludHNUb0Nocm9tZV8gPSBmdW5jdGlvbihjKSB7XHJcbiAgICBpZiAodHlwZW9mIGMgIT09ICdvYmplY3QnIHx8IGMubWFuZGF0b3J5IHx8IGMub3B0aW9uYWwpIHtcclxuICAgICAgcmV0dXJuIGM7XHJcbiAgICB9XHJcbiAgICB2YXIgY2MgPSB7fTtcclxuICAgIE9iamVjdC5rZXlzKGMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgIGlmIChrZXkgPT09ICdyZXF1aXJlJyB8fCBrZXkgPT09ICdhZHZhbmNlZCcgfHwga2V5ID09PSAnbWVkaWFTb3VyY2UnKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHZhciByID0gKHR5cGVvZiBjW2tleV0gPT09ICdvYmplY3QnKSA/IGNba2V5XSA6IHtpZGVhbDogY1trZXldfTtcclxuICAgICAgaWYgKHIuZXhhY3QgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygci5leGFjdCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICByLm1pbiA9IHIubWF4ID0gci5leGFjdDtcclxuICAgICAgfVxyXG4gICAgICB2YXIgb2xkbmFtZV8gPSBmdW5jdGlvbihwcmVmaXgsIG5hbWUpIHtcclxuICAgICAgICBpZiAocHJlZml4KSB7XHJcbiAgICAgICAgICByZXR1cm4gcHJlZml4ICsgbmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIG5hbWUuc2xpY2UoMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAobmFtZSA9PT0gJ2RldmljZUlkJykgPyAnc291cmNlSWQnIDogbmFtZTtcclxuICAgICAgfTtcclxuICAgICAgaWYgKHIuaWRlYWwgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGNjLm9wdGlvbmFsID0gY2Mub3B0aW9uYWwgfHwgW107XHJcbiAgICAgICAgdmFyIG9jID0ge307XHJcbiAgICAgICAgaWYgKHR5cGVvZiByLmlkZWFsID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgb2Nbb2xkbmFtZV8oJ21pbicsIGtleSldID0gci5pZGVhbDtcclxuICAgICAgICAgIGNjLm9wdGlvbmFsLnB1c2gob2MpO1xyXG4gICAgICAgICAgb2MgPSB7fTtcclxuICAgICAgICAgIG9jW29sZG5hbWVfKCdtYXgnLCBrZXkpXSA9IHIuaWRlYWw7XHJcbiAgICAgICAgICBjYy5vcHRpb25hbC5wdXNoKG9jKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgb2Nbb2xkbmFtZV8oJycsIGtleSldID0gci5pZGVhbDtcclxuICAgICAgICAgIGNjLm9wdGlvbmFsLnB1c2gob2MpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAoci5leGFjdCAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiByLmV4YWN0ICE9PSAnbnVtYmVyJykge1xyXG4gICAgICAgIGNjLm1hbmRhdG9yeSA9IGNjLm1hbmRhdG9yeSB8fCB7fTtcclxuICAgICAgICBjYy5tYW5kYXRvcnlbb2xkbmFtZV8oJycsIGtleSldID0gci5leGFjdDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBbJ21pbicsICdtYXgnXS5mb3JFYWNoKGZ1bmN0aW9uKG1peCkge1xyXG4gICAgICAgICAgaWYgKHJbbWl4XSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGNjLm1hbmRhdG9yeSA9IGNjLm1hbmRhdG9yeSB8fCB7fTtcclxuICAgICAgICAgICAgY2MubWFuZGF0b3J5W29sZG5hbWVfKG1peCwga2V5KV0gPSByW21peF07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgaWYgKGMuYWR2YW5jZWQpIHtcclxuICAgICAgY2Mub3B0aW9uYWwgPSAoY2Mub3B0aW9uYWwgfHwgW10pLmNvbmNhdChjLmFkdmFuY2VkKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjYztcclxuICB9O1xyXG5cclxuICB2YXIgc2hpbUNvbnN0cmFpbnRzXyA9IGZ1bmN0aW9uKGNvbnN0cmFpbnRzLCBmdW5jKSB7XHJcbiAgICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA+PSA2MSkge1xyXG4gICAgICByZXR1cm4gZnVuYyhjb25zdHJhaW50cyk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJhaW50cyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoY29uc3RyYWludHMpKTtcclxuICAgIGlmIChjb25zdHJhaW50cyAmJiB0eXBlb2YgY29uc3RyYWludHMuYXVkaW8gPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIHZhciByZW1hcCA9IGZ1bmN0aW9uKG9iaiwgYSwgYikge1xyXG4gICAgICAgIGlmIChhIGluIG9iaiAmJiAhKGIgaW4gb2JqKSkge1xyXG4gICAgICAgICAgb2JqW2JdID0gb2JqW2FdO1xyXG4gICAgICAgICAgZGVsZXRlIG9ialthXTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICAgIGNvbnN0cmFpbnRzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShjb25zdHJhaW50cykpO1xyXG4gICAgICByZW1hcChjb25zdHJhaW50cy5hdWRpbywgJ2F1dG9HYWluQ29udHJvbCcsICdnb29nQXV0b0dhaW5Db250cm9sJyk7XHJcbiAgICAgIHJlbWFwKGNvbnN0cmFpbnRzLmF1ZGlvLCAnbm9pc2VTdXBwcmVzc2lvbicsICdnb29nTm9pc2VTdXBwcmVzc2lvbicpO1xyXG4gICAgICBjb25zdHJhaW50cy5hdWRpbyA9IGNvbnN0cmFpbnRzVG9DaHJvbWVfKGNvbnN0cmFpbnRzLmF1ZGlvKTtcclxuICAgIH1cclxuICAgIGlmIChjb25zdHJhaW50cyAmJiB0eXBlb2YgY29uc3RyYWludHMudmlkZW8gPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIC8vIFNoaW0gZmFjaW5nTW9kZSBmb3IgbW9iaWxlICYgc3VyZmFjZSBwcm8uXHJcbiAgICAgIHZhciBmYWNlID0gY29uc3RyYWludHMudmlkZW8uZmFjaW5nTW9kZTtcclxuICAgICAgZmFjZSA9IGZhY2UgJiYgKCh0eXBlb2YgZmFjZSA9PT0gJ29iamVjdCcpID8gZmFjZSA6IHtpZGVhbDogZmFjZX0pO1xyXG4gICAgICB2YXIgZ2V0U3VwcG9ydGVkRmFjaW5nTW9kZUxpZXMgPSBicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgNjY7XHJcblxyXG4gICAgICBpZiAoKGZhY2UgJiYgKGZhY2UuZXhhY3QgPT09ICd1c2VyJyB8fCBmYWNlLmV4YWN0ID09PSAnZW52aXJvbm1lbnQnIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgZmFjZS5pZGVhbCA9PT0gJ3VzZXInIHx8IGZhY2UuaWRlYWwgPT09ICdlbnZpcm9ubWVudCcpKSAmJlxyXG4gICAgICAgICAgIShuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFN1cHBvcnRlZENvbnN0cmFpbnRzICYmXHJcbiAgICAgICAgICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0U3VwcG9ydGVkQ29uc3RyYWludHMoKS5mYWNpbmdNb2RlICYmXHJcbiAgICAgICAgICAgICFnZXRTdXBwb3J0ZWRGYWNpbmdNb2RlTGllcykpIHtcclxuICAgICAgICBkZWxldGUgY29uc3RyYWludHMudmlkZW8uZmFjaW5nTW9kZTtcclxuICAgICAgICB2YXIgbWF0Y2hlcztcclxuICAgICAgICBpZiAoZmFjZS5leGFjdCA9PT0gJ2Vudmlyb25tZW50JyB8fCBmYWNlLmlkZWFsID09PSAnZW52aXJvbm1lbnQnKSB7XHJcbiAgICAgICAgICBtYXRjaGVzID0gWydiYWNrJywgJ3JlYXInXTtcclxuICAgICAgICB9IGVsc2UgaWYgKGZhY2UuZXhhY3QgPT09ICd1c2VyJyB8fCBmYWNlLmlkZWFsID09PSAndXNlcicpIHtcclxuICAgICAgICAgIG1hdGNoZXMgPSBbJ2Zyb250J107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtYXRjaGVzKSB7XHJcbiAgICAgICAgICAvLyBMb29rIGZvciBtYXRjaGVzIGluIGxhYmVsLCBvciB1c2UgbGFzdCBjYW0gZm9yIGJhY2sgKHR5cGljYWwpLlxyXG4gICAgICAgICAgcmV0dXJuIG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlcygpXHJcbiAgICAgICAgICAudGhlbihmdW5jdGlvbihkZXZpY2VzKSB7XHJcbiAgICAgICAgICAgIGRldmljZXMgPSBkZXZpY2VzLmZpbHRlcihmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGQua2luZCA9PT0gJ3ZpZGVvaW5wdXQnO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIGRldiA9IGRldmljZXMuZmluZChmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXMuc29tZShmdW5jdGlvbihtYXRjaCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGQubGFiZWwudG9Mb3dlckNhc2UoKS5pbmRleE9mKG1hdGNoKSAhPT0gLTE7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoIWRldiAmJiBkZXZpY2VzLmxlbmd0aCAmJiBtYXRjaGVzLmluZGV4T2YoJ2JhY2snKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICBkZXYgPSBkZXZpY2VzW2RldmljZXMubGVuZ3RoIC0gMV07IC8vIG1vcmUgbGlrZWx5IHRoZSBiYWNrIGNhbVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkZXYpIHtcclxuICAgICAgICAgICAgICBjb25zdHJhaW50cy52aWRlby5kZXZpY2VJZCA9IGZhY2UuZXhhY3QgPyB7ZXhhY3Q6IGRldi5kZXZpY2VJZH0gOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpZGVhbDogZGV2LmRldmljZUlkfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdHJhaW50cy52aWRlbyA9IGNvbnN0cmFpbnRzVG9DaHJvbWVfKGNvbnN0cmFpbnRzLnZpZGVvKTtcclxuICAgICAgICAgICAgbG9nZ2luZygnY2hyb21lOiAnICsgSlNPTi5zdHJpbmdpZnkoY29uc3RyYWludHMpKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmMoY29uc3RyYWludHMpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0cmFpbnRzLnZpZGVvID0gY29uc3RyYWludHNUb0Nocm9tZV8oY29uc3RyYWludHMudmlkZW8pO1xyXG4gICAgfVxyXG4gICAgbG9nZ2luZygnY2hyb21lOiAnICsgSlNPTi5zdHJpbmdpZnkoY29uc3RyYWludHMpKTtcclxuICAgIHJldHVybiBmdW5jKGNvbnN0cmFpbnRzKTtcclxuICB9O1xyXG5cclxuICB2YXIgc2hpbUVycm9yXyA9IGZ1bmN0aW9uKGUpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5hbWU6IHtcclxuICAgICAgICBQZXJtaXNzaW9uRGVuaWVkRXJyb3I6ICdOb3RBbGxvd2VkRXJyb3InLFxyXG4gICAgICAgIFBlcm1pc3Npb25EaXNtaXNzZWRFcnJvcjogJ05vdEFsbG93ZWRFcnJvcicsXHJcbiAgICAgICAgSW52YWxpZFN0YXRlRXJyb3I6ICdOb3RBbGxvd2VkRXJyb3InLFxyXG4gICAgICAgIERldmljZXNOb3RGb3VuZEVycm9yOiAnTm90Rm91bmRFcnJvcicsXHJcbiAgICAgICAgQ29uc3RyYWludE5vdFNhdGlzZmllZEVycm9yOiAnT3ZlcmNvbnN0cmFpbmVkRXJyb3InLFxyXG4gICAgICAgIFRyYWNrU3RhcnRFcnJvcjogJ05vdFJlYWRhYmxlRXJyb3InLFxyXG4gICAgICAgIE1lZGlhRGV2aWNlRmFpbGVkRHVlVG9TaHV0ZG93bjogJ05vdEFsbG93ZWRFcnJvcicsXHJcbiAgICAgICAgTWVkaWFEZXZpY2VLaWxsU3dpdGNoT246ICdOb3RBbGxvd2VkRXJyb3InLFxyXG4gICAgICAgIFRhYkNhcHR1cmVFcnJvcjogJ0Fib3J0RXJyb3InLFxyXG4gICAgICAgIFNjcmVlbkNhcHR1cmVFcnJvcjogJ0Fib3J0RXJyb3InLFxyXG4gICAgICAgIERldmljZUNhcHR1cmVFcnJvcjogJ0Fib3J0RXJyb3InXHJcbiAgICAgIH1bZS5uYW1lXSB8fCBlLm5hbWUsXHJcbiAgICAgIG1lc3NhZ2U6IGUubWVzc2FnZSxcclxuICAgICAgY29uc3RyYWludDogZS5jb25zdHJhaW50TmFtZSxcclxuICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5hbWUgKyAodGhpcy5tZXNzYWdlICYmICc6ICcpICsgdGhpcy5tZXNzYWdlO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH07XHJcblxyXG4gIHZhciBnZXRVc2VyTWVkaWFfID0gZnVuY3Rpb24oY29uc3RyYWludHMsIG9uU3VjY2Vzcywgb25FcnJvcikge1xyXG4gICAgc2hpbUNvbnN0cmFpbnRzXyhjb25zdHJhaW50cywgZnVuY3Rpb24oYykge1xyXG4gICAgICBuYXZpZ2F0b3Iud2Via2l0R2V0VXNlck1lZGlhKGMsIG9uU3VjY2VzcywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmIChvbkVycm9yKSB7XHJcbiAgICAgICAgICBvbkVycm9yKHNoaW1FcnJvcl8oZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhID0gZ2V0VXNlck1lZGlhXztcclxuXHJcbiAgLy8gUmV0dXJucyB0aGUgcmVzdWx0IG9mIGdldFVzZXJNZWRpYSBhcyBhIFByb21pc2UuXHJcbiAgdmFyIGdldFVzZXJNZWRpYVByb21pc2VfID0gZnVuY3Rpb24oY29uc3RyYWludHMpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgbmF2aWdhdG9yLmdldFVzZXJNZWRpYShjb25zdHJhaW50cywgcmVzb2x2ZSwgcmVqZWN0KTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIGlmICghbmF2aWdhdG9yLm1lZGlhRGV2aWNlcykge1xyXG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcyA9IHtcclxuICAgICAgZ2V0VXNlck1lZGlhOiBnZXRVc2VyTWVkaWFQcm9taXNlXyxcclxuICAgICAgZW51bWVyYXRlRGV2aWNlczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcclxuICAgICAgICAgIHZhciBraW5kcyA9IHthdWRpbzogJ2F1ZGlvaW5wdXQnLCB2aWRlbzogJ3ZpZGVvaW5wdXQnfTtcclxuICAgICAgICAgIHJldHVybiB3aW5kb3cuTWVkaWFTdHJlYW1UcmFjay5nZXRTb3VyY2VzKGZ1bmN0aW9uKGRldmljZXMpIHtcclxuICAgICAgICAgICAgcmVzb2x2ZShkZXZpY2VzLm1hcChmdW5jdGlvbihkZXZpY2UpIHtcclxuICAgICAgICAgICAgICByZXR1cm4ge2xhYmVsOiBkZXZpY2UubGFiZWwsXHJcbiAgICAgICAgICAgICAgICBraW5kOiBraW5kc1tkZXZpY2Uua2luZF0sXHJcbiAgICAgICAgICAgICAgICBkZXZpY2VJZDogZGV2aWNlLmlkLFxyXG4gICAgICAgICAgICAgICAgZ3JvdXBJZDogJyd9O1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSxcclxuICAgICAgZ2V0U3VwcG9ydGVkQ29uc3RyYWludHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBkZXZpY2VJZDogdHJ1ZSwgZWNob0NhbmNlbGxhdGlvbjogdHJ1ZSwgZmFjaW5nTW9kZTogdHJ1ZSxcclxuICAgICAgICAgIGZyYW1lUmF0ZTogdHJ1ZSwgaGVpZ2h0OiB0cnVlLCB3aWR0aDogdHJ1ZVxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvLyBBIHNoaW0gZm9yIGdldFVzZXJNZWRpYSBtZXRob2Qgb24gdGhlIG1lZGlhRGV2aWNlcyBvYmplY3QuXHJcbiAgLy8gVE9ETyhLYXB0ZW5KYW5zc29uKSByZW1vdmUgb25jZSBpbXBsZW1lbnRlZCBpbiBDaHJvbWUgc3RhYmxlLlxyXG4gIGlmICghbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEpIHtcclxuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhID0gZnVuY3Rpb24oY29uc3RyYWludHMpIHtcclxuICAgICAgcmV0dXJuIGdldFVzZXJNZWRpYVByb21pc2VfKGNvbnN0cmFpbnRzKTtcclxuICAgIH07XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIEV2ZW4gdGhvdWdoIENocm9tZSA0NSBoYXMgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcyBhbmQgYSBnZXRVc2VyTWVkaWFcclxuICAgIC8vIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYSBQcm9taXNlLCBpdCBkb2VzIG5vdCBhY2NlcHQgc3BlYy1zdHlsZVxyXG4gICAgLy8gY29uc3RyYWludHMuXHJcbiAgICB2YXIgb3JpZ0dldFVzZXJNZWRpYSA9IG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhLlxyXG4gICAgICAgIGJpbmQobmF2aWdhdG9yLm1lZGlhRGV2aWNlcyk7XHJcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSA9IGZ1bmN0aW9uKGNzKSB7XHJcbiAgICAgIHJldHVybiBzaGltQ29uc3RyYWludHNfKGNzLCBmdW5jdGlvbihjKSB7XHJcbiAgICAgICAgcmV0dXJuIG9yaWdHZXRVc2VyTWVkaWEoYykudGhlbihmdW5jdGlvbihzdHJlYW0pIHtcclxuICAgICAgICAgIGlmIChjLmF1ZGlvICYmICFzdHJlYW0uZ2V0QXVkaW9UcmFja3MoKS5sZW5ndGggfHxcclxuICAgICAgICAgICAgICBjLnZpZGVvICYmICFzdHJlYW0uZ2V0VmlkZW9UcmFja3MoKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcclxuICAgICAgICAgICAgICB0cmFjay5zdG9wKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKCcnLCAnTm90Rm91bmRFcnJvcicpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIHN0cmVhbTtcclxuICAgICAgICB9LCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3Qoc2hpbUVycm9yXyhlKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8vIER1bW15IGRldmljZWNoYW5nZSBldmVudCBtZXRob2RzLlxyXG4gIC8vIFRPRE8oS2FwdGVuSmFuc3NvbikgcmVtb3ZlIG9uY2UgaW1wbGVtZW50ZWQgaW4gQ2hyb21lIHN0YWJsZS5cclxuICBpZiAodHlwZW9mIG5hdmlnYXRvci5tZWRpYURldmljZXMuYWRkRXZlbnRMaXN0ZW5lciA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBsb2dnaW5nKCdEdW1teSBtZWRpYURldmljZXMuYWRkRXZlbnRMaXN0ZW5lciBjYWxsZWQuJyk7XHJcbiAgICB9O1xyXG4gIH1cclxuICBpZiAodHlwZW9mIG5hdmlnYXRvci5tZWRpYURldmljZXMucmVtb3ZlRXZlbnRMaXN0ZW5lciA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBsb2dnaW5nKCdEdW1teSBtZWRpYURldmljZXMucmVtb3ZlRXZlbnRMaXN0ZW5lciBjYWxsZWQuJyk7XHJcbiAgICB9O1xyXG4gIH1cclxufTtcclxuXHJcbn0se1wiLi4vdXRpbHMuanNcIjoxM31dLDc6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG4vKlxyXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE3IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKlxyXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxyXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXHJcbiAqICB0cmVlLlxyXG4gKi9cclxuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG52YXIgU0RQVXRpbHMgPSByZXF1aXJlKCdzZHAnKTtcclxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgc2hpbVJUQ0ljZUNhbmRpZGF0ZTogZnVuY3Rpb24od2luZG93KSB7XHJcbiAgICAvLyBmb3VuZGF0aW9uIGlzIGFyYml0cmFyaWx5IGNob3NlbiBhcyBhbiBpbmRpY2F0b3IgZm9yIGZ1bGwgc3VwcG9ydCBmb3JcclxuICAgIC8vIGh0dHBzOi8vdzNjLmdpdGh1Yi5pby93ZWJydGMtcGMvI3J0Y2ljZWNhbmRpZGF0ZS1pbnRlcmZhY2VcclxuICAgIGlmICghd2luZG93LlJUQ0ljZUNhbmRpZGF0ZSB8fCAod2luZG93LlJUQ0ljZUNhbmRpZGF0ZSAmJiAnZm91bmRhdGlvbicgaW5cclxuICAgICAgICB3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlLnByb3RvdHlwZSkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBOYXRpdmVSVENJY2VDYW5kaWRhdGUgPSB3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlO1xyXG4gICAgd2luZG93LlJUQ0ljZUNhbmRpZGF0ZSA9IGZ1bmN0aW9uKGFyZ3MpIHtcclxuICAgICAgLy8gUmVtb3ZlIHRoZSBhPSB3aGljaCBzaG91bGRuJ3QgYmUgcGFydCBvZiB0aGUgY2FuZGlkYXRlIHN0cmluZy5cclxuICAgICAgaWYgKHR5cGVvZiBhcmdzID09PSAnb2JqZWN0JyAmJiBhcmdzLmNhbmRpZGF0ZSAmJlxyXG4gICAgICAgICAgYXJncy5jYW5kaWRhdGUuaW5kZXhPZignYT0nKSA9PT0gMCkge1xyXG4gICAgICAgIGFyZ3MgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGFyZ3MpKTtcclxuICAgICAgICBhcmdzLmNhbmRpZGF0ZSA9IGFyZ3MuY2FuZGlkYXRlLnN1YnN0cigyKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGFyZ3MuY2FuZGlkYXRlICYmIGFyZ3MuY2FuZGlkYXRlLmxlbmd0aCkge1xyXG4gICAgICAgIC8vIEF1Z21lbnQgdGhlIG5hdGl2ZSBjYW5kaWRhdGUgd2l0aCB0aGUgcGFyc2VkIGZpZWxkcy5cclxuICAgICAgICB2YXIgbmF0aXZlQ2FuZGlkYXRlID0gbmV3IE5hdGl2ZVJUQ0ljZUNhbmRpZGF0ZShhcmdzKTtcclxuICAgICAgICB2YXIgcGFyc2VkQ2FuZGlkYXRlID0gU0RQVXRpbHMucGFyc2VDYW5kaWRhdGUoYXJncy5jYW5kaWRhdGUpO1xyXG4gICAgICAgIHZhciBhdWdtZW50ZWRDYW5kaWRhdGUgPSBPYmplY3QuYXNzaWduKG5hdGl2ZUNhbmRpZGF0ZSxcclxuICAgICAgICAgICAgcGFyc2VkQ2FuZGlkYXRlKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIGEgc2VyaWFsaXplciB0aGF0IGRvZXMgbm90IHNlcmlhbGl6ZSB0aGUgZXh0cmEgYXR0cmlidXRlcy5cclxuICAgICAgICBhdWdtZW50ZWRDYW5kaWRhdGUudG9KU09OID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjYW5kaWRhdGU6IGF1Z21lbnRlZENhbmRpZGF0ZS5jYW5kaWRhdGUsXHJcbiAgICAgICAgICAgIHNkcE1pZDogYXVnbWVudGVkQ2FuZGlkYXRlLnNkcE1pZCxcclxuICAgICAgICAgICAgc2RwTUxpbmVJbmRleDogYXVnbWVudGVkQ2FuZGlkYXRlLnNkcE1MaW5lSW5kZXgsXHJcbiAgICAgICAgICAgIHVzZXJuYW1lRnJhZ21lbnQ6IGF1Z21lbnRlZENhbmRpZGF0ZS51c2VybmFtZUZyYWdtZW50LFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBhdWdtZW50ZWRDYW5kaWRhdGU7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG5ldyBOYXRpdmVSVENJY2VDYW5kaWRhdGUoYXJncyk7XHJcbiAgICB9O1xyXG4gICAgd2luZG93LlJUQ0ljZUNhbmRpZGF0ZS5wcm90b3R5cGUgPSBOYXRpdmVSVENJY2VDYW5kaWRhdGUucHJvdG90eXBlO1xyXG5cclxuICAgIC8vIEhvb2sgdXAgdGhlIGF1Z21lbnRlZCBjYW5kaWRhdGUgaW4gb25pY2VjYW5kaWRhdGUgYW5kXHJcbiAgICAvLyBhZGRFdmVudExpc3RlbmVyKCdpY2VjYW5kaWRhdGUnLCAuLi4pXHJcbiAgICB1dGlscy53cmFwUGVlckNvbm5lY3Rpb25FdmVudCh3aW5kb3csICdpY2VjYW5kaWRhdGUnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgIGlmIChlLmNhbmRpZGF0ZSkge1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCAnY2FuZGlkYXRlJywge1xyXG4gICAgICAgICAgdmFsdWU6IG5ldyB3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlKGUuY2FuZGlkYXRlKSxcclxuICAgICAgICAgIHdyaXRhYmxlOiAnZmFsc2UnXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGU7XHJcbiAgICB9KTtcclxuICB9LFxyXG5cclxuICAvLyBzaGltQ3JlYXRlT2JqZWN0VVJMIG11c3QgYmUgY2FsbGVkIGJlZm9yZSBzaGltU291cmNlT2JqZWN0IHRvIGF2b2lkIGxvb3AuXHJcblxyXG4gIHNoaW1DcmVhdGVPYmplY3RVUkw6IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgdmFyIFVSTCA9IHdpbmRvdyAmJiB3aW5kb3cuVVJMO1xyXG5cclxuICAgIGlmICghKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50ICYmXHJcbiAgICAgICAgICAnc3JjT2JqZWN0JyBpbiB3aW5kb3cuSFRNTE1lZGlhRWxlbWVudC5wcm90b3R5cGUgJiZcclxuICAgICAgICBVUkwuY3JlYXRlT2JqZWN0VVJMICYmIFVSTC5yZXZva2VPYmplY3RVUkwpKSB7XHJcbiAgICAgIC8vIE9ubHkgc2hpbSBDcmVhdGVPYmplY3RVUkwgdXNpbmcgc3JjT2JqZWN0IGlmIHNyY09iamVjdCBleGlzdHMuXHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG5hdGl2ZUNyZWF0ZU9iamVjdFVSTCA9IFVSTC5jcmVhdGVPYmplY3RVUkwuYmluZChVUkwpO1xyXG4gICAgdmFyIG5hdGl2ZVJldm9rZU9iamVjdFVSTCA9IFVSTC5yZXZva2VPYmplY3RVUkwuYmluZChVUkwpO1xyXG4gICAgdmFyIHN0cmVhbXMgPSBuZXcgTWFwKCksIG5ld0lkID0gMDtcclxuXHJcbiAgICBVUkwuY3JlYXRlT2JqZWN0VVJMID0gZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICAgIGlmICgnZ2V0VHJhY2tzJyBpbiBzdHJlYW0pIHtcclxuICAgICAgICB2YXIgdXJsID0gJ3BvbHlibG9iOicgKyAoKytuZXdJZCk7XHJcbiAgICAgICAgc3RyZWFtcy5zZXQodXJsLCBzdHJlYW0pO1xyXG4gICAgICAgIHV0aWxzLmRlcHJlY2F0ZWQoJ1VSTC5jcmVhdGVPYmplY3RVUkwoc3RyZWFtKScsXHJcbiAgICAgICAgICAgICdlbGVtLnNyY09iamVjdCA9IHN0cmVhbScpO1xyXG4gICAgICAgIHJldHVybiB1cmw7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG5hdGl2ZUNyZWF0ZU9iamVjdFVSTChzdHJlYW0pO1xyXG4gICAgfTtcclxuICAgIFVSTC5yZXZva2VPYmplY3RVUkwgPSBmdW5jdGlvbih1cmwpIHtcclxuICAgICAgbmF0aXZlUmV2b2tlT2JqZWN0VVJMKHVybCk7XHJcbiAgICAgIHN0cmVhbXMuZGVsZXRlKHVybCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBkc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50LnByb3RvdHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzcmMnKTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuSFRNTE1lZGlhRWxlbWVudC5wcm90b3R5cGUsICdzcmMnLCB7XHJcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGRzYy5nZXQuYXBwbHkodGhpcyk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHNldDogZnVuY3Rpb24odXJsKSB7XHJcbiAgICAgICAgdGhpcy5zcmNPYmplY3QgPSBzdHJlYW1zLmdldCh1cmwpIHx8IG51bGw7XHJcbiAgICAgICAgcmV0dXJuIGRzYy5zZXQuYXBwbHkodGhpcywgW3VybF0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgbmF0aXZlU2V0QXR0cmlidXRlID0gd2luZG93LkhUTUxNZWRpYUVsZW1lbnQucHJvdG90eXBlLnNldEF0dHJpYnV0ZTtcclxuICAgIHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50LnByb3RvdHlwZS5zZXRBdHRyaWJ1dGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIgJiZcclxuICAgICAgICAgICgnJyArIGFyZ3VtZW50c1swXSkudG9Mb3dlckNhc2UoKSA9PT0gJ3NyYycpIHtcclxuICAgICAgICB0aGlzLnNyY09iamVjdCA9IHN0cmVhbXMuZ2V0KGFyZ3VtZW50c1sxXSkgfHwgbnVsbDtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbmF0aXZlU2V0QXR0cmlidXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xyXG4gIH0sXHJcblxyXG4gIHNoaW1NYXhNZXNzYWdlU2l6ZTogZnVuY3Rpb24od2luZG93KSB7XHJcbiAgICBpZiAod2luZG93LlJUQ1NjdHBUcmFuc3BvcnQgfHwgIXdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB2YXIgYnJvd3NlckRldGFpbHMgPSB1dGlscy5kZXRlY3RCcm93c2VyKHdpbmRvdyk7XHJcblxyXG4gICAgaWYgKCEoJ3NjdHAnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLCAnc2N0cCcsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLl9zY3RwID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiB0aGlzLl9zY3RwO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHNjdHBJbkRlc2NyaXB0aW9uID0gZnVuY3Rpb24oZGVzY3JpcHRpb24pIHtcclxuICAgICAgdmFyIHNlY3Rpb25zID0gU0RQVXRpbHMuc3BsaXRTZWN0aW9ucyhkZXNjcmlwdGlvbi5zZHApO1xyXG4gICAgICBzZWN0aW9ucy5zaGlmdCgpO1xyXG4gICAgICByZXR1cm4gc2VjdGlvbnMuc29tZShmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcclxuICAgICAgICB2YXIgbUxpbmUgPSBTRFBVdGlscy5wYXJzZU1MaW5lKG1lZGlhU2VjdGlvbik7XHJcbiAgICAgICAgcmV0dXJuIG1MaW5lICYmIG1MaW5lLmtpbmQgPT09ICdhcHBsaWNhdGlvbidcclxuICAgICAgICAgICAgJiYgbUxpbmUucHJvdG9jb2wuaW5kZXhPZignU0NUUCcpICE9PSAtMTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBnZXRSZW1vdGVGaXJlZm94VmVyc2lvbiA9IGZ1bmN0aW9uKGRlc2NyaXB0aW9uKSB7XHJcbiAgICAgIC8vIFRPRE86IElzIHRoZXJlIGEgYmV0dGVyIHNvbHV0aW9uIGZvciBkZXRlY3RpbmcgRmlyZWZveD9cclxuICAgICAgdmFyIG1hdGNoID0gZGVzY3JpcHRpb24uc2RwLm1hdGNoKC9tb3ppbGxhLi4uVEhJU19JU19TRFBBUlRBLShcXGQrKS8pO1xyXG4gICAgICBpZiAobWF0Y2ggPT09IG51bGwgfHwgbWF0Y2gubGVuZ3RoIDwgMikge1xyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgICAgfVxyXG4gICAgICB2YXIgdmVyc2lvbiA9IHBhcnNlSW50KG1hdGNoWzFdLCAxMCk7XHJcbiAgICAgIC8vIFRlc3QgZm9yIE5hTiAoeWVzLCB0aGlzIGlzIHVnbHkpXHJcbiAgICAgIHJldHVybiB2ZXJzaW9uICE9PSB2ZXJzaW9uID8gLTEgOiB2ZXJzaW9uO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgZ2V0Q2FuU2VuZE1heE1lc3NhZ2VTaXplID0gZnVuY3Rpb24ocmVtb3RlSXNGaXJlZm94KSB7XHJcbiAgICAgIC8vIEV2ZXJ5IGltcGxlbWVudGF0aW9uIHdlIGtub3cgY2FuIHNlbmQgYXQgbGVhc3QgNjQgS2lCLlxyXG4gICAgICAvLyBOb3RlOiBBbHRob3VnaCBDaHJvbWUgaXMgdGVjaG5pY2FsbHkgYWJsZSB0byBzZW5kIHVwIHRvIDI1NiBLaUIsIHRoZVxyXG4gICAgICAvLyAgICAgICBkYXRhIGRvZXMgbm90IHJlYWNoIHRoZSBvdGhlciBwZWVyIHJlbGlhYmx5LlxyXG4gICAgICAvLyAgICAgICBTZWU6IGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC93ZWJydGMvaXNzdWVzL2RldGFpbD9pZD04NDE5XHJcbiAgICAgIHZhciBjYW5TZW5kTWF4TWVzc2FnZVNpemUgPSA2NTUzNjtcclxuICAgICAgaWYgKGJyb3dzZXJEZXRhaWxzLmJyb3dzZXIgPT09ICdmaXJlZm94Jykge1xyXG4gICAgICAgIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgNTcpIHtcclxuICAgICAgICAgIGlmIChyZW1vdGVJc0ZpcmVmb3ggPT09IC0xKSB7XHJcbiAgICAgICAgICAgIC8vIEZGIDwgNTcgd2lsbCBzZW5kIGluIDE2IEtpQiBjaHVua3MgdXNpbmcgdGhlIGRlcHJlY2F0ZWQgUFBJRFxyXG4gICAgICAgICAgICAvLyBmcmFnbWVudGF0aW9uLlxyXG4gICAgICAgICAgICBjYW5TZW5kTWF4TWVzc2FnZVNpemUgPSAxNjM4NDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIEhvd2V2ZXIsIG90aGVyIEZGIChhbmQgUkFXUlRDKSBjYW4gcmVhc3NlbWJsZSBQUElELWZyYWdtZW50ZWRcclxuICAgICAgICAgICAgLy8gbWVzc2FnZXMuIFRodXMsIHN1cHBvcnRpbmcgfjIgR2lCIHdoZW4gc2VuZGluZy5cclxuICAgICAgICAgICAgY2FuU2VuZE1heE1lc3NhZ2VTaXplID0gMjE0NzQ4MzYzNztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gQ3VycmVudGx5LCBhbGwgRkYgPj0gNTcgd2lsbCByZXNldCB0aGUgcmVtb3RlIG1heGltdW0gbWVzc2FnZSBzaXplXHJcbiAgICAgICAgICAvLyB0byB0aGUgZGVmYXVsdCB2YWx1ZSB3aGVuIGEgZGF0YSBjaGFubmVsIGlzIGNyZWF0ZWQgYXQgYSBsYXRlclxyXG4gICAgICAgICAgLy8gc3RhZ2UuIDooXHJcbiAgICAgICAgICAvLyBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTE0MjY4MzFcclxuICAgICAgICAgIGNhblNlbmRNYXhNZXNzYWdlU2l6ZSA9XHJcbiAgICAgICAgICAgIGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPT09IDU3ID8gNjU1MzUgOiA2NTUzNjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGNhblNlbmRNYXhNZXNzYWdlU2l6ZTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIGdldE1heE1lc3NhZ2VTaXplID0gZnVuY3Rpb24oZGVzY3JpcHRpb24sIHJlbW90ZUlzRmlyZWZveCkge1xyXG4gICAgICAvLyBOb3RlOiA2NTUzNiBieXRlcyBpcyB0aGUgZGVmYXVsdCB2YWx1ZSBmcm9tIHRoZSBTRFAgc3BlYy4gQWxzbyxcclxuICAgICAgLy8gICAgICAgZXZlcnkgaW1wbGVtZW50YXRpb24gd2Uga25vdyBzdXBwb3J0cyByZWNlaXZpbmcgNjU1MzYgYnl0ZXMuXHJcbiAgICAgIHZhciBtYXhNZXNzYWdlU2l6ZSA9IDY1NTM2O1xyXG5cclxuICAgICAgLy8gRkYgNTcgaGFzIGEgc2xpZ2h0bHkgaW5jb3JyZWN0IGRlZmF1bHQgcmVtb3RlIG1heCBtZXNzYWdlIHNpemUsIHNvXHJcbiAgICAgIC8vIHdlIG5lZWQgdG8gYWRqdXN0IGl0IGhlcmUgdG8gYXZvaWQgYSBmYWlsdXJlIHdoZW4gc2VuZGluZy5cclxuICAgICAgLy8gU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xNDI1Njk3XHJcbiAgICAgIGlmIChicm93c2VyRGV0YWlscy5icm93c2VyID09PSAnZmlyZWZveCdcclxuICAgICAgICAgICAmJiBicm93c2VyRGV0YWlscy52ZXJzaW9uID09PSA1Nykge1xyXG4gICAgICAgIG1heE1lc3NhZ2VTaXplID0gNjU1MzU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBtYXRjaCA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KGRlc2NyaXB0aW9uLnNkcCwgJ2E9bWF4LW1lc3NhZ2Utc2l6ZTonKTtcclxuICAgICAgaWYgKG1hdGNoLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBtYXhNZXNzYWdlU2l6ZSA9IHBhcnNlSW50KG1hdGNoWzBdLnN1YnN0cigxOSksIDEwKTtcclxuICAgICAgfSBlbHNlIGlmIChicm93c2VyRGV0YWlscy5icm93c2VyID09PSAnZmlyZWZveCcgJiZcclxuICAgICAgICAgICAgICAgICAgcmVtb3RlSXNGaXJlZm94ICE9PSAtMSkge1xyXG4gICAgICAgIC8vIElmIHRoZSBtYXhpbXVtIG1lc3NhZ2Ugc2l6ZSBpcyBub3QgcHJlc2VudCBpbiB0aGUgcmVtb3RlIFNEUCBhbmRcclxuICAgICAgICAvLyBib3RoIGxvY2FsIGFuZCByZW1vdGUgYXJlIEZpcmVmb3gsIHRoZSByZW1vdGUgcGVlciBjYW4gcmVjZWl2ZVxyXG4gICAgICAgIC8vIH4yIEdpQi5cclxuICAgICAgICBtYXhNZXNzYWdlU2l6ZSA9IDIxNDc0ODM2Mzc7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG1heE1lc3NhZ2VTaXplO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgb3JpZ1NldFJlbW90ZURlc2NyaXB0aW9uID1cclxuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnNldFJlbW90ZURlc2NyaXB0aW9uO1xyXG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5zZXRSZW1vdGVEZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICBwYy5fc2N0cCA9IG51bGw7XHJcblxyXG4gICAgICBpZiAoc2N0cEluRGVzY3JpcHRpb24oYXJndW1lbnRzWzBdKSkge1xyXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSByZW1vdGUgaXMgRkYuXHJcbiAgICAgICAgdmFyIGlzRmlyZWZveCA9IGdldFJlbW90ZUZpcmVmb3hWZXJzaW9uKGFyZ3VtZW50c1swXSk7XHJcblxyXG4gICAgICAgIC8vIEdldCB0aGUgbWF4aW11bSBtZXNzYWdlIHNpemUgdGhlIGxvY2FsIHBlZXIgaXMgY2FwYWJsZSBvZiBzZW5kaW5nXHJcbiAgICAgICAgdmFyIGNhblNlbmRNTVMgPSBnZXRDYW5TZW5kTWF4TWVzc2FnZVNpemUoaXNGaXJlZm94KTtcclxuXHJcbiAgICAgICAgLy8gR2V0IHRoZSBtYXhpbXVtIG1lc3NhZ2Ugc2l6ZSBvZiB0aGUgcmVtb3RlIHBlZXIuXHJcbiAgICAgICAgdmFyIHJlbW90ZU1NUyA9IGdldE1heE1lc3NhZ2VTaXplKGFyZ3VtZW50c1swXSwgaXNGaXJlZm94KTtcclxuXHJcbiAgICAgICAgLy8gRGV0ZXJtaW5lIGZpbmFsIG1heGltdW0gbWVzc2FnZSBzaXplXHJcbiAgICAgICAgdmFyIG1heE1lc3NhZ2VTaXplO1xyXG4gICAgICAgIGlmIChjYW5TZW5kTU1TID09PSAwICYmIHJlbW90ZU1NUyA9PT0gMCkge1xyXG4gICAgICAgICAgbWF4TWVzc2FnZVNpemUgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjYW5TZW5kTU1TID09PSAwIHx8IHJlbW90ZU1NUyA9PT0gMCkge1xyXG4gICAgICAgICAgbWF4TWVzc2FnZVNpemUgPSBNYXRoLm1heChjYW5TZW5kTU1TLCByZW1vdGVNTVMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBtYXhNZXNzYWdlU2l6ZSA9IE1hdGgubWluKGNhblNlbmRNTVMsIHJlbW90ZU1NUyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDcmVhdGUgYSBkdW1teSBSVENTY3RwVHJhbnNwb3J0IG9iamVjdCBhbmQgdGhlICdtYXhNZXNzYWdlU2l6ZSdcclxuICAgICAgICAvLyBhdHRyaWJ1dGUuXHJcbiAgICAgICAgdmFyIHNjdHAgPSB7fTtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2N0cCwgJ21heE1lc3NhZ2VTaXplJywge1xyXG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1heE1lc3NhZ2VTaXplO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBjLl9zY3RwID0gc2N0cDtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG9yaWdTZXRSZW1vdGVEZXNjcmlwdGlvbi5hcHBseShwYywgYXJndW1lbnRzKTtcclxuICAgIH07XHJcbiAgfSxcclxuXHJcbiAgc2hpbVNlbmRUaHJvd1R5cGVFcnJvcjogZnVuY3Rpb24od2luZG93KSB7XHJcbiAgICBpZiAoISh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gJiZcclxuICAgICAgICAnY3JlYXRlRGF0YUNoYW5uZWwnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBOb3RlOiBBbHRob3VnaCBGaXJlZm94ID49IDU3IGhhcyBhIG5hdGl2ZSBpbXBsZW1lbnRhdGlvbiwgdGhlIG1heGltdW1cclxuICAgIC8vICAgICAgIG1lc3NhZ2Ugc2l6ZSBjYW4gYmUgcmVzZXQgZm9yIGFsbCBkYXRhIGNoYW5uZWxzIGF0IGEgbGF0ZXIgc3RhZ2UuXHJcbiAgICAvLyAgICAgICBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTE0MjY4MzFcclxuXHJcbiAgICB2YXIgb3JpZ0NyZWF0ZURhdGFDaGFubmVsID1cclxuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5jcmVhdGVEYXRhQ2hhbm5lbDtcclxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlRGF0YUNoYW5uZWwgPSBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgdmFyIGRhdGFDaGFubmVsID0gb3JpZ0NyZWF0ZURhdGFDaGFubmVsLmFwcGx5KHBjLCBhcmd1bWVudHMpO1xyXG4gICAgICB2YXIgb3JpZ0RhdGFDaGFubmVsU2VuZCA9IGRhdGFDaGFubmVsLnNlbmQ7XHJcblxyXG4gICAgICAvLyBQYXRjaCAnc2VuZCcgbWV0aG9kXHJcbiAgICAgIGRhdGFDaGFubmVsLnNlbmQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZGMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBkYXRhID0gYXJndW1lbnRzWzBdO1xyXG4gICAgICAgIHZhciBsZW5ndGggPSBkYXRhLmxlbmd0aCB8fCBkYXRhLnNpemUgfHwgZGF0YS5ieXRlTGVuZ3RoO1xyXG4gICAgICAgIGlmIChsZW5ndGggPiBwYy5zY3RwLm1heE1lc3NhZ2VTaXplKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKCdNZXNzYWdlIHRvbyBsYXJnZSAoY2FuIHNlbmQgYSBtYXhpbXVtIG9mICcgK1xyXG4gICAgICAgICAgICBwYy5zY3RwLm1heE1lc3NhZ2VTaXplICsgJyBieXRlcyknLCAnVHlwZUVycm9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvcmlnRGF0YUNoYW5uZWxTZW5kLmFwcGx5KGRjLCBhcmd1bWVudHMpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgcmV0dXJuIGRhdGFDaGFubmVsO1xyXG4gICAgfTtcclxuICB9XHJcbn07XHJcblxyXG59LHtcIi4vdXRpbHNcIjoxMyxcInNkcFwiOjJ9XSw4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuLypcclxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcclxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxyXG4gKiAgdHJlZS5cclxuICovXHJcbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcclxudmFyIHNoaW1SVENQZWVyQ29ubmVjdGlvbiA9IHJlcXVpcmUoJ3J0Y3BlZXJjb25uZWN0aW9uLXNoaW0nKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIHNoaW1HZXRVc2VyTWVkaWE6IHJlcXVpcmUoJy4vZ2V0dXNlcm1lZGlhJyksXHJcbiAgc2hpbVBlZXJDb25uZWN0aW9uOiBmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIHZhciBicm93c2VyRGV0YWlscyA9IHV0aWxzLmRldGVjdEJyb3dzZXIod2luZG93KTtcclxuXHJcbiAgICBpZiAod2luZG93LlJUQ0ljZUdhdGhlcmVyKSB7XHJcbiAgICAgIGlmICghd2luZG93LlJUQ0ljZUNhbmRpZGF0ZSkge1xyXG4gICAgICAgIHdpbmRvdy5SVENJY2VDYW5kaWRhdGUgPSBmdW5jdGlvbihhcmdzKSB7XHJcbiAgICAgICAgICByZXR1cm4gYXJncztcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghd2luZG93LlJUQ1Nlc3Npb25EZXNjcmlwdGlvbikge1xyXG4gICAgICAgIHdpbmRvdy5SVENTZXNzaW9uRGVzY3JpcHRpb24gPSBmdW5jdGlvbihhcmdzKSB7XHJcbiAgICAgICAgICByZXR1cm4gYXJncztcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICAgIC8vIHRoaXMgYWRkcyBhbiBhZGRpdGlvbmFsIGV2ZW50IGxpc3RlbmVyIHRvIE1lZGlhU3RyYWNrVHJhY2sgdGhhdCBzaWduYWxzXHJcbiAgICAgIC8vIHdoZW4gYSB0cmFja3MgZW5hYmxlZCBwcm9wZXJ0eSB3YXMgY2hhbmdlZC4gV29ya2Fyb3VuZCBmb3IgYSBidWcgaW5cclxuICAgICAgLy8gYWRkU3RyZWFtLCBzZWUgYmVsb3cuIE5vIGxvbmdlciByZXF1aXJlZCBpbiAxNTAyNStcclxuICAgICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCAxNTAyNSkge1xyXG4gICAgICAgIHZhciBvcmlnTVNURW5hYmxlZCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoXHJcbiAgICAgICAgICAgIHdpbmRvdy5NZWRpYVN0cmVhbVRyYWNrLnByb3RvdHlwZSwgJ2VuYWJsZWQnKTtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93Lk1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLCAnZW5hYmxlZCcsIHtcclxuICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgb3JpZ01TVEVuYWJsZWQuc2V0LmNhbGwodGhpcywgdmFsdWUpO1xyXG4gICAgICAgICAgICB2YXIgZXYgPSBuZXcgRXZlbnQoJ2VuYWJsZWQnKTtcclxuICAgICAgICAgICAgZXYuZW5hYmxlZCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXYpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gT1JUQyBkZWZpbmVzIHRoZSBEVE1GIHNlbmRlciBhIGJpdCBkaWZmZXJlbnQuXHJcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdzNjL29ydGMvaXNzdWVzLzcxNFxyXG4gICAgaWYgKHdpbmRvdy5SVENSdHBTZW5kZXIgJiYgISgnZHRtZicgaW4gd2luZG93LlJUQ1J0cFNlbmRlci5wcm90b3R5cGUpKSB7XHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUnRwU2VuZGVyLnByb3RvdHlwZSwgJ2R0bWYnLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGlmICh0aGlzLl9kdG1mID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudHJhY2sua2luZCA9PT0gJ2F1ZGlvJykge1xyXG4gICAgICAgICAgICAgIHRoaXMuX2R0bWYgPSBuZXcgd2luZG93LlJUQ0R0bWZTZW5kZXIodGhpcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy50cmFjay5raW5kID09PSAndmlkZW8nKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5fZHRtZiA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiB0aGlzLl9kdG1mO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvLyBFZGdlIGN1cnJlbnRseSBvbmx5IGltcGxlbWVudHMgdGhlIFJUQ0R0bWZTZW5kZXIsIG5vdCB0aGVcclxuICAgIC8vIFJUQ0RUTUZTZW5kZXIgYWxpYXMuIFNlZSBodHRwOi8vZHJhZnQub3J0Yy5vcmcvI3J0Y2R0bWZzZW5kZXIyKlxyXG4gICAgaWYgKHdpbmRvdy5SVENEdG1mU2VuZGVyICYmICF3aW5kb3cuUlRDRFRNRlNlbmRlcikge1xyXG4gICAgICB3aW5kb3cuUlRDRFRNRlNlbmRlciA9IHdpbmRvdy5SVENEdG1mU2VuZGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiA9XHJcbiAgICAgICAgc2hpbVJUQ1BlZXJDb25uZWN0aW9uKHdpbmRvdywgYnJvd3NlckRldGFpbHMudmVyc2lvbik7XHJcbiAgfSxcclxuICBzaGltUmVwbGFjZVRyYWNrOiBmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIC8vIE9SVEMgaGFzIHJlcGxhY2VUcmFjayAtLSBodHRwczovL2dpdGh1Yi5jb20vdzNjL29ydGMvaXNzdWVzLzYxNFxyXG4gICAgaWYgKHdpbmRvdy5SVENSdHBTZW5kZXIgJiZcclxuICAgICAgICAhKCdyZXBsYWNlVHJhY2snIGluIHdpbmRvdy5SVENSdHBTZW5kZXIucHJvdG90eXBlKSkge1xyXG4gICAgICB3aW5kb3cuUlRDUnRwU2VuZGVyLnByb3RvdHlwZS5yZXBsYWNlVHJhY2sgPVxyXG4gICAgICAgICAgd2luZG93LlJUQ1J0cFNlbmRlci5wcm90b3R5cGUuc2V0VHJhY2s7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxufSx7XCIuLi91dGlsc1wiOjEzLFwiLi9nZXR1c2VybWVkaWFcIjo5LFwicnRjcGVlcmNvbm5lY3Rpb24tc2hpbVwiOjF9XSw5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuLypcclxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcclxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxyXG4gKiAgdHJlZS5cclxuICovXHJcbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gRXhwb3NlIHB1YmxpYyBtZXRob2RzLlxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gIHZhciBuYXZpZ2F0b3IgPSB3aW5kb3cgJiYgd2luZG93Lm5hdmlnYXRvcjtcclxuXHJcbiAgdmFyIHNoaW1FcnJvcl8gPSBmdW5jdGlvbihlKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuYW1lOiB7UGVybWlzc2lvbkRlbmllZEVycm9yOiAnTm90QWxsb3dlZEVycm9yJ31bZS5uYW1lXSB8fCBlLm5hbWUsXHJcbiAgICAgIG1lc3NhZ2U6IGUubWVzc2FnZSxcclxuICAgICAgY29uc3RyYWludDogZS5jb25zdHJhaW50LFxyXG4gICAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9O1xyXG5cclxuICAvLyBnZXRVc2VyTWVkaWEgZXJyb3Igc2hpbS5cclxuICB2YXIgb3JpZ0dldFVzZXJNZWRpYSA9IG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhLlxyXG4gICAgICBiaW5kKG5hdmlnYXRvci5tZWRpYURldmljZXMpO1xyXG4gIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhID0gZnVuY3Rpb24oYykge1xyXG4gICAgcmV0dXJuIG9yaWdHZXRVc2VyTWVkaWEoYykuY2F0Y2goZnVuY3Rpb24oZSkge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3Qoc2hpbUVycm9yXyhlKSk7XHJcbiAgICB9KTtcclxuICB9O1xyXG59O1xyXG5cclxufSx7fV0sMTA6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG4vKlxyXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKlxyXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxyXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXHJcbiAqICB0cmVlLlxyXG4gKi9cclxuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgc2hpbUdldFVzZXJNZWRpYTogcmVxdWlyZSgnLi9nZXR1c2VybWVkaWEnKSxcclxuICBzaGltT25UcmFjazogZnVuY3Rpb24od2luZG93KSB7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uICYmICEoJ29udHJhY2snIGluXHJcbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkpIHtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUsICdvbnRyYWNrJywge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5fb250cmFjaztcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldDogZnVuY3Rpb24oZikge1xyXG4gICAgICAgICAgaWYgKHRoaXMuX29udHJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFjaycsIHRoaXMuX29udHJhY2spO1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2FkZHN0cmVhbScsIHRoaXMuX29udHJhY2twb2x5KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigndHJhY2snLCB0aGlzLl9vbnRyYWNrID0gZik7XHJcbiAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2FkZHN0cmVhbScsIHRoaXMuX29udHJhY2twb2x5ID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XHJcbiAgICAgICAgICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCd0cmFjaycpO1xyXG4gICAgICAgICAgICAgIGV2ZW50LnRyYWNrID0gdHJhY2s7XHJcbiAgICAgICAgICAgICAgZXZlbnQucmVjZWl2ZXIgPSB7dHJhY2s6IHRyYWNrfTtcclxuICAgICAgICAgICAgICBldmVudC50cmFuc2NlaXZlciA9IHtyZWNlaXZlcjogZXZlbnQucmVjZWl2ZXJ9O1xyXG4gICAgICAgICAgICAgIGV2ZW50LnN0cmVhbXMgPSBbZS5zdHJlYW1dO1xyXG4gICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgd2luZG93LlJUQ1RyYWNrRXZlbnQgJiZcclxuICAgICAgICAoJ3JlY2VpdmVyJyBpbiB3aW5kb3cuUlRDVHJhY2tFdmVudC5wcm90b3R5cGUpICYmXHJcbiAgICAgICAgISgndHJhbnNjZWl2ZXInIGluIHdpbmRvdy5SVENUcmFja0V2ZW50LnByb3RvdHlwZSkpIHtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENUcmFja0V2ZW50LnByb3RvdHlwZSwgJ3RyYW5zY2VpdmVyJywge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZXR1cm4ge3JlY2VpdmVyOiB0aGlzLnJlY2VpdmVyfTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHNoaW1Tb3VyY2VPYmplY3Q6IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgLy8gRmlyZWZveCBoYXMgc3VwcG9ydGVkIG1velNyY09iamVjdCBzaW5jZSBGRjIyLCB1bnByZWZpeGVkIGluIDQyLlxyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGlmICh3aW5kb3cuSFRNTE1lZGlhRWxlbWVudCAmJlxyXG4gICAgICAgICEoJ3NyY09iamVjdCcgaW4gd2luZG93LkhUTUxNZWRpYUVsZW1lbnQucHJvdG90eXBlKSkge1xyXG4gICAgICAgIC8vIFNoaW0gdGhlIHNyY09iamVjdCBwcm9wZXJ0eSwgb25jZSwgd2hlbiBIVE1MTWVkaWFFbGVtZW50IGlzIGZvdW5kLlxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuSFRNTE1lZGlhRWxlbWVudC5wcm90b3R5cGUsICdzcmNPYmplY3QnLCB7XHJcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb3pTcmNPYmplY3Q7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgc2V0OiBmdW5jdGlvbihzdHJlYW0pIHtcclxuICAgICAgICAgICAgdGhpcy5tb3pTcmNPYmplY3QgPSBzdHJlYW07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBzaGltUGVlckNvbm5lY3Rpb246IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgdmFyIGJyb3dzZXJEZXRhaWxzID0gdXRpbHMuZGV0ZWN0QnJvd3Nlcih3aW5kb3cpO1xyXG5cclxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAnb2JqZWN0JyB8fCAhKHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiB8fFxyXG4gICAgICAgIHdpbmRvdy5tb3pSVENQZWVyQ29ubmVjdGlvbikpIHtcclxuICAgICAgcmV0dXJuOyAvLyBwcm9iYWJseSBtZWRpYS5wZWVyY29ubmVjdGlvbi5lbmFibGVkPWZhbHNlIGluIGFib3V0OmNvbmZpZ1xyXG4gICAgfVxyXG4gICAgLy8gVGhlIFJUQ1BlZXJDb25uZWN0aW9uIG9iamVjdC5cclxuICAgIGlmICghd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uKSB7XHJcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiA9IGZ1bmN0aW9uKHBjQ29uZmlnLCBwY0NvbnN0cmFpbnRzKSB7XHJcbiAgICAgICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCAzOCkge1xyXG4gICAgICAgICAgLy8gLnVybHMgaXMgbm90IHN1cHBvcnRlZCBpbiBGRiA8IDM4LlxyXG4gICAgICAgICAgLy8gY3JlYXRlIFJUQ0ljZVNlcnZlcnMgd2l0aCBhIHNpbmdsZSB1cmwuXHJcbiAgICAgICAgICBpZiAocGNDb25maWcgJiYgcGNDb25maWcuaWNlU2VydmVycykge1xyXG4gICAgICAgICAgICB2YXIgbmV3SWNlU2VydmVycyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBjQ29uZmlnLmljZVNlcnZlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICB2YXIgc2VydmVyID0gcGNDb25maWcuaWNlU2VydmVyc1tpXTtcclxuICAgICAgICAgICAgICBpZiAoc2VydmVyLmhhc093blByb3BlcnR5KCd1cmxzJykpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc2VydmVyLnVybHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIG5ld1NlcnZlciA9IHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IHNlcnZlci51cmxzW2pdXHJcbiAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgIGlmIChzZXJ2ZXIudXJsc1tqXS5pbmRleE9mKCd0dXJuJykgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdTZXJ2ZXIudXNlcm5hbWUgPSBzZXJ2ZXIudXNlcm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3U2VydmVyLmNyZWRlbnRpYWwgPSBzZXJ2ZXIuY3JlZGVudGlhbDtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICBuZXdJY2VTZXJ2ZXJzLnB1c2gobmV3U2VydmVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmV3SWNlU2VydmVycy5wdXNoKHBjQ29uZmlnLmljZVNlcnZlcnNbaV0pO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwY0NvbmZpZy5pY2VTZXJ2ZXJzID0gbmV3SWNlU2VydmVycztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyB3aW5kb3cubW96UlRDUGVlckNvbm5lY3Rpb24ocGNDb25maWcsIHBjQ29uc3RyYWludHMpO1xyXG4gICAgICB9O1xyXG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlID1cclxuICAgICAgICAgIHdpbmRvdy5tb3pSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGU7XHJcblxyXG4gICAgICAvLyB3cmFwIHN0YXRpYyBtZXRob2RzLiBDdXJyZW50bHkganVzdCBnZW5lcmF0ZUNlcnRpZmljYXRlLlxyXG4gICAgICBpZiAod2luZG93Lm1velJUQ1BlZXJDb25uZWN0aW9uLmdlbmVyYXRlQ2VydGlmaWNhdGUpIHtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLCAnZ2VuZXJhdGVDZXJ0aWZpY2F0ZScsIHtcclxuICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cubW96UlRDUGVlckNvbm5lY3Rpb24uZ2VuZXJhdGVDZXJ0aWZpY2F0ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgd2luZG93LlJUQ1Nlc3Npb25EZXNjcmlwdGlvbiA9IHdpbmRvdy5tb3pSVENTZXNzaW9uRGVzY3JpcHRpb247XHJcbiAgICAgIHdpbmRvdy5SVENJY2VDYW5kaWRhdGUgPSB3aW5kb3cubW96UlRDSWNlQ2FuZGlkYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHNoaW0gYXdheSBuZWVkIGZvciBvYnNvbGV0ZSBSVENJY2VDYW5kaWRhdGUvUlRDU2Vzc2lvbkRlc2NyaXB0aW9uLlxyXG4gICAgWydzZXRMb2NhbERlc2NyaXB0aW9uJywgJ3NldFJlbW90ZURlc2NyaXB0aW9uJywgJ2FkZEljZUNhbmRpZGF0ZSddXHJcbiAgICAgICAgLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XHJcbiAgICAgICAgICB2YXIgbmF0aXZlTWV0aG9kID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdO1xyXG4gICAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGFyZ3VtZW50c1swXSA9IG5ldyAoKG1ldGhvZCA9PT0gJ2FkZEljZUNhbmRpZGF0ZScpID9cclxuICAgICAgICAgICAgICAgIHdpbmRvdy5SVENJY2VDYW5kaWRhdGUgOlxyXG4gICAgICAgICAgICAgICAgd2luZG93LlJUQ1Nlc3Npb25EZXNjcmlwdGlvbikoYXJndW1lbnRzWzBdKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyBzdXBwb3J0IGZvciBhZGRJY2VDYW5kaWRhdGUobnVsbCBvciB1bmRlZmluZWQpXHJcbiAgICB2YXIgbmF0aXZlQWRkSWNlQ2FuZGlkYXRlID1cclxuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZEljZUNhbmRpZGF0ZTtcclxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkSWNlQ2FuZGlkYXRlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmICghYXJndW1lbnRzWzBdKSB7XHJcbiAgICAgICAgaWYgKGFyZ3VtZW50c1sxXSkge1xyXG4gICAgICAgICAgYXJndW1lbnRzWzFdLmFwcGx5KG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG5hdGl2ZUFkZEljZUNhbmRpZGF0ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBzaGltIGdldFN0YXRzIHdpdGggbWFwbGlrZSBzdXBwb3J0XHJcbiAgICB2YXIgbWFrZU1hcFN0YXRzID0gZnVuY3Rpb24oc3RhdHMpIHtcclxuICAgICAgdmFyIG1hcCA9IG5ldyBNYXAoKTtcclxuICAgICAgT2JqZWN0LmtleXMoc3RhdHMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgbWFwLnNldChrZXksIHN0YXRzW2tleV0pO1xyXG4gICAgICAgIG1hcFtrZXldID0gc3RhdHNba2V5XTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBtYXA7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBtb2Rlcm5TdGF0c1R5cGVzID0ge1xyXG4gICAgICBpbmJvdW5kcnRwOiAnaW5ib3VuZC1ydHAnLFxyXG4gICAgICBvdXRib3VuZHJ0cDogJ291dGJvdW5kLXJ0cCcsXHJcbiAgICAgIGNhbmRpZGF0ZXBhaXI6ICdjYW5kaWRhdGUtcGFpcicsXHJcbiAgICAgIGxvY2FsY2FuZGlkYXRlOiAnbG9jYWwtY2FuZGlkYXRlJyxcclxuICAgICAgcmVtb3RlY2FuZGlkYXRlOiAncmVtb3RlLWNhbmRpZGF0ZSdcclxuICAgIH07XHJcblxyXG4gICAgdmFyIG5hdGl2ZUdldFN0YXRzID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTdGF0cztcclxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U3RhdHMgPSBmdW5jdGlvbihcclxuICAgICAgc2VsZWN0b3IsXHJcbiAgICAgIG9uU3VjYyxcclxuICAgICAgb25FcnJcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gbmF0aXZlR2V0U3RhdHMuYXBwbHkodGhpcywgW3NlbGVjdG9yIHx8IG51bGxdKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKHN0YXRzKSB7XHJcbiAgICAgICAgICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDQ4KSB7XHJcbiAgICAgICAgICAgIHN0YXRzID0gbWFrZU1hcFN0YXRzKHN0YXRzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgNTMgJiYgIW9uU3VjYykge1xyXG4gICAgICAgICAgICAvLyBTaGltIG9ubHkgcHJvbWlzZSBnZXRTdGF0cyB3aXRoIHNwZWMtaHlwaGVucyBpbiB0eXBlIG5hbWVzXHJcbiAgICAgICAgICAgIC8vIExlYXZlIGNhbGxiYWNrIHZlcnNpb24gYWxvbmU7IG1pc2Mgb2xkIHVzZXMgb2YgZm9yRWFjaCBiZWZvcmUgTWFwXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgc3RhdHMuZm9yRWFjaChmdW5jdGlvbihzdGF0KSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0LnR5cGUgPSBtb2Rlcm5TdGF0c1R5cGVzW3N0YXQudHlwZV0gfHwgc3RhdC50eXBlO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgaWYgKGUubmFtZSAhPT0gJ1R5cGVFcnJvcicpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIC8vIEF2b2lkIFR5cGVFcnJvcjogXCJ0eXBlXCIgaXMgcmVhZC1vbmx5LCBpbiBvbGQgdmVyc2lvbnMuIDM0LTQzaXNoXHJcbiAgICAgICAgICAgICAgc3RhdHMuZm9yRWFjaChmdW5jdGlvbihzdGF0LCBpKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0cy5zZXQoaSwgT2JqZWN0LmFzc2lnbih7fSwgc3RhdCwge1xyXG4gICAgICAgICAgICAgICAgICB0eXBlOiBtb2Rlcm5TdGF0c1R5cGVzW3N0YXQudHlwZV0gfHwgc3RhdC50eXBlXHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBzdGF0cztcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKG9uU3VjYywgb25FcnIpO1xyXG4gICAgfTtcclxuICB9LFxyXG5cclxuICBzaGltUmVtb3ZlU3RyZWFtOiBmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIGlmICghd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uIHx8XHJcbiAgICAgICAgJ3JlbW92ZVN0cmVhbScgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xyXG4gICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICB1dGlscy5kZXByZWNhdGVkKCdyZW1vdmVTdHJlYW0nLCAncmVtb3ZlVHJhY2snKTtcclxuICAgICAgdGhpcy5nZXRTZW5kZXJzKCkuZm9yRWFjaChmdW5jdGlvbihzZW5kZXIpIHtcclxuICAgICAgICBpZiAoc2VuZGVyLnRyYWNrICYmIHN0cmVhbS5nZXRUcmFja3MoKS5pbmRleE9mKHNlbmRlci50cmFjaykgIT09IC0xKSB7XHJcbiAgICAgICAgICBwYy5yZW1vdmVUcmFjayhzZW5kZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG4gIH1cclxufTtcclxuXHJcbn0se1wiLi4vdXRpbHNcIjoxMyxcIi4vZ2V0dXNlcm1lZGlhXCI6MTF9XSwxMTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcbi8qXHJcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXHJcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcclxuICogIHRyZWUuXHJcbiAqL1xyXG4gLyogZXNsaW50LWVudiBub2RlICovXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XHJcbnZhciBsb2dnaW5nID0gdXRpbHMubG9nO1xyXG5cclxuLy8gRXhwb3NlIHB1YmxpYyBtZXRob2RzLlxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gIHZhciBicm93c2VyRGV0YWlscyA9IHV0aWxzLmRldGVjdEJyb3dzZXIod2luZG93KTtcclxuICB2YXIgbmF2aWdhdG9yID0gd2luZG93ICYmIHdpbmRvdy5uYXZpZ2F0b3I7XHJcbiAgdmFyIE1lZGlhU3RyZWFtVHJhY2sgPSB3aW5kb3cgJiYgd2luZG93Lk1lZGlhU3RyZWFtVHJhY2s7XHJcblxyXG4gIHZhciBzaGltRXJyb3JfID0gZnVuY3Rpb24oZSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmFtZToge1xyXG4gICAgICAgIEludGVybmFsRXJyb3I6ICdOb3RSZWFkYWJsZUVycm9yJyxcclxuICAgICAgICBOb3RTdXBwb3J0ZWRFcnJvcjogJ1R5cGVFcnJvcicsXHJcbiAgICAgICAgUGVybWlzc2lvbkRlbmllZEVycm9yOiAnTm90QWxsb3dlZEVycm9yJyxcclxuICAgICAgICBTZWN1cml0eUVycm9yOiAnTm90QWxsb3dlZEVycm9yJ1xyXG4gICAgICB9W2UubmFtZV0gfHwgZS5uYW1lLFxyXG4gICAgICBtZXNzYWdlOiB7XHJcbiAgICAgICAgJ1RoZSBvcGVyYXRpb24gaXMgaW5zZWN1cmUuJzogJ1RoZSByZXF1ZXN0IGlzIG5vdCBhbGxvd2VkIGJ5IHRoZSAnICtcclxuICAgICAgICAndXNlciBhZ2VudCBvciB0aGUgcGxhdGZvcm0gaW4gdGhlIGN1cnJlbnQgY29udGV4dC4nXHJcbiAgICAgIH1bZS5tZXNzYWdlXSB8fCBlLm1lc3NhZ2UsXHJcbiAgICAgIGNvbnN0cmFpbnQ6IGUuY29uc3RyYWludCxcclxuICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5hbWUgKyAodGhpcy5tZXNzYWdlICYmICc6ICcpICsgdGhpcy5tZXNzYWdlO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH07XHJcblxyXG4gIC8vIGdldFVzZXJNZWRpYSBjb25zdHJhaW50cyBzaGltLlxyXG4gIHZhciBnZXRVc2VyTWVkaWFfID0gZnVuY3Rpb24oY29uc3RyYWludHMsIG9uU3VjY2Vzcywgb25FcnJvcikge1xyXG4gICAgdmFyIGNvbnN0cmFpbnRzVG9GRjM3XyA9IGZ1bmN0aW9uKGMpIHtcclxuICAgICAgaWYgKHR5cGVvZiBjICE9PSAnb2JqZWN0JyB8fCBjLnJlcXVpcmUpIHtcclxuICAgICAgICByZXR1cm4gYztcclxuICAgICAgfVxyXG4gICAgICB2YXIgcmVxdWlyZSA9IFtdO1xyXG4gICAgICBPYmplY3Qua2V5cyhjKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgIGlmIChrZXkgPT09ICdyZXF1aXJlJyB8fCBrZXkgPT09ICdhZHZhbmNlZCcgfHwga2V5ID09PSAnbWVkaWFTb3VyY2UnKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByID0gY1trZXldID0gKHR5cGVvZiBjW2tleV0gPT09ICdvYmplY3QnKSA/XHJcbiAgICAgICAgICAgIGNba2V5XSA6IHtpZGVhbDogY1trZXldfTtcclxuICAgICAgICBpZiAoci5taW4gIT09IHVuZGVmaW5lZCB8fFxyXG4gICAgICAgICAgICByLm1heCAhPT0gdW5kZWZpbmVkIHx8IHIuZXhhY3QgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgcmVxdWlyZS5wdXNoKGtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyLmV4YWN0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIGlmICh0eXBlb2Ygci5leGFjdCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgci4gbWluID0gci5tYXggPSByLmV4YWN0O1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY1trZXldID0gci5leGFjdDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGRlbGV0ZSByLmV4YWN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoci5pZGVhbCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBjLmFkdmFuY2VkID0gYy5hZHZhbmNlZCB8fCBbXTtcclxuICAgICAgICAgIHZhciBvYyA9IHt9O1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiByLmlkZWFsID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICBvY1trZXldID0ge21pbjogci5pZGVhbCwgbWF4OiByLmlkZWFsfTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG9jW2tleV0gPSByLmlkZWFsO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYy5hZHZhbmNlZC5wdXNoKG9jKTtcclxuICAgICAgICAgIGRlbGV0ZSByLmlkZWFsO1xyXG4gICAgICAgICAgaWYgKCFPYmplY3Qua2V5cyhyKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgZGVsZXRlIGNba2V5XTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAocmVxdWlyZS5sZW5ndGgpIHtcclxuICAgICAgICBjLnJlcXVpcmUgPSByZXF1aXJlO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBjO1xyXG4gICAgfTtcclxuICAgIGNvbnN0cmFpbnRzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShjb25zdHJhaW50cykpO1xyXG4gICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCAzOCkge1xyXG4gICAgICBsb2dnaW5nKCdzcGVjOiAnICsgSlNPTi5zdHJpbmdpZnkoY29uc3RyYWludHMpKTtcclxuICAgICAgaWYgKGNvbnN0cmFpbnRzLmF1ZGlvKSB7XHJcbiAgICAgICAgY29uc3RyYWludHMuYXVkaW8gPSBjb25zdHJhaW50c1RvRkYzN18oY29uc3RyYWludHMuYXVkaW8pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjb25zdHJhaW50cy52aWRlbykge1xyXG4gICAgICAgIGNvbnN0cmFpbnRzLnZpZGVvID0gY29uc3RyYWludHNUb0ZGMzdfKGNvbnN0cmFpbnRzLnZpZGVvKTtcclxuICAgICAgfVxyXG4gICAgICBsb2dnaW5nKCdmZjM3OiAnICsgSlNPTi5zdHJpbmdpZnkoY29uc3RyYWludHMpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBuYXZpZ2F0b3IubW96R2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzLCBvblN1Y2Nlc3MsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgb25FcnJvcihzaGltRXJyb3JfKGUpKTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIC8vIFJldHVybnMgdGhlIHJlc3VsdCBvZiBnZXRVc2VyTWVkaWEgYXMgYSBQcm9taXNlLlxyXG4gIHZhciBnZXRVc2VyTWVkaWFQcm9taXNlXyA9IGZ1bmN0aW9uKGNvbnN0cmFpbnRzKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgIGdldFVzZXJNZWRpYV8oY29uc3RyYWludHMsIHJlc29sdmUsIHJlamVjdCk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICAvLyBTaGltIGZvciBtZWRpYURldmljZXMgb24gb2xkZXIgdmVyc2lvbnMuXHJcbiAgaWYgKCFuYXZpZ2F0b3IubWVkaWFEZXZpY2VzKSB7XHJcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzID0ge2dldFVzZXJNZWRpYTogZ2V0VXNlck1lZGlhUHJvbWlzZV8sXHJcbiAgICAgIGFkZEV2ZW50TGlzdGVuZXI6IGZ1bmN0aW9uKCkgeyB9LFxyXG4gICAgICByZW1vdmVFdmVudExpc3RlbmVyOiBmdW5jdGlvbigpIHsgfVxyXG4gICAgfTtcclxuICB9XHJcbiAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzID1cclxuICAgICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzIHx8IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XHJcbiAgICAgICAgICB2YXIgaW5mb3MgPSBbXHJcbiAgICAgICAgICAgIHtraW5kOiAnYXVkaW9pbnB1dCcsIGRldmljZUlkOiAnZGVmYXVsdCcsIGxhYmVsOiAnJywgZ3JvdXBJZDogJyd9LFxyXG4gICAgICAgICAgICB7a2luZDogJ3ZpZGVvaW5wdXQnLCBkZXZpY2VJZDogJ2RlZmF1bHQnLCBsYWJlbDogJycsIGdyb3VwSWQ6ICcnfVxyXG4gICAgICAgICAgXTtcclxuICAgICAgICAgIHJlc29sdmUoaW5mb3MpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9O1xyXG5cclxuICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDQxKSB7XHJcbiAgICAvLyBXb3JrIGFyb3VuZCBodHRwOi8vYnVnemlsLmxhLzExNjk2NjVcclxuICAgIHZhciBvcmdFbnVtZXJhdGVEZXZpY2VzID1cclxuICAgICAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmVudW1lcmF0ZURldmljZXMuYmluZChuYXZpZ2F0b3IubWVkaWFEZXZpY2VzKTtcclxuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gb3JnRW51bWVyYXRlRGV2aWNlcygpLnRoZW4odW5kZWZpbmVkLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWYgKGUubmFtZSA9PT0gJ05vdEZvdW5kRXJyb3InKSB7XHJcbiAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRocm93IGU7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuICB9XHJcbiAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCA0OSkge1xyXG4gICAgdmFyIG9yaWdHZXRVc2VyTWVkaWEgPSBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYS5cclxuICAgICAgICBiaW5kKG5hdmlnYXRvci5tZWRpYURldmljZXMpO1xyXG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEgPSBmdW5jdGlvbihjKSB7XHJcbiAgICAgIHJldHVybiBvcmlnR2V0VXNlck1lZGlhKGMpLnRoZW4oZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICAgICAgLy8gV29yayBhcm91bmQgaHR0cHM6Ly9idWd6aWwubGEvODAyMzI2XHJcbiAgICAgICAgaWYgKGMuYXVkaW8gJiYgIXN0cmVhbS5nZXRBdWRpb1RyYWNrcygpLmxlbmd0aCB8fFxyXG4gICAgICAgICAgICBjLnZpZGVvICYmICFzdHJlYW0uZ2V0VmlkZW9UcmFja3MoKS5sZW5ndGgpIHtcclxuICAgICAgICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XHJcbiAgICAgICAgICAgIHRyYWNrLnN0b3AoKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbignVGhlIG9iamVjdCBjYW4gbm90IGJlIGZvdW5kIGhlcmUuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ05vdEZvdW5kRXJyb3InKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0cmVhbTtcclxuICAgICAgfSwgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChzaGltRXJyb3JfKGUpKTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG4gIH1cclxuICBpZiAoIShicm93c2VyRGV0YWlscy52ZXJzaW9uID4gNTUgJiZcclxuICAgICAgJ2F1dG9HYWluQ29udHJvbCcgaW4gbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRTdXBwb3J0ZWRDb25zdHJhaW50cygpKSkge1xyXG4gICAgdmFyIHJlbWFwID0gZnVuY3Rpb24ob2JqLCBhLCBiKSB7XHJcbiAgICAgIGlmIChhIGluIG9iaiAmJiAhKGIgaW4gb2JqKSkge1xyXG4gICAgICAgIG9ialtiXSA9IG9ialthXTtcclxuICAgICAgICBkZWxldGUgb2JqW2FdO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBuYXRpdmVHZXRVc2VyTWVkaWEgPSBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYS5cclxuICAgICAgICBiaW5kKG5hdmlnYXRvci5tZWRpYURldmljZXMpO1xyXG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEgPSBmdW5jdGlvbihjKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgYyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIGMuYXVkaW8gPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgYyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYykpO1xyXG4gICAgICAgIHJlbWFwKGMuYXVkaW8sICdhdXRvR2FpbkNvbnRyb2wnLCAnbW96QXV0b0dhaW5Db250cm9sJyk7XHJcbiAgICAgICAgcmVtYXAoYy5hdWRpbywgJ25vaXNlU3VwcHJlc3Npb24nLCAnbW96Tm9pc2VTdXBwcmVzc2lvbicpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBuYXRpdmVHZXRVc2VyTWVkaWEoYyk7XHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChNZWRpYVN0cmVhbVRyYWNrICYmIE1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLmdldFNldHRpbmdzKSB7XHJcbiAgICAgIHZhciBuYXRpdmVHZXRTZXR0aW5ncyA9IE1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLmdldFNldHRpbmdzO1xyXG4gICAgICBNZWRpYVN0cmVhbVRyYWNrLnByb3RvdHlwZS5nZXRTZXR0aW5ncyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBvYmogPSBuYXRpdmVHZXRTZXR0aW5ncy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgIHJlbWFwKG9iaiwgJ21vekF1dG9HYWluQ29udHJvbCcsICdhdXRvR2FpbkNvbnRyb2wnKTtcclxuICAgICAgICByZW1hcChvYmosICdtb3pOb2lzZVN1cHByZXNzaW9uJywgJ25vaXNlU3VwcHJlc3Npb24nKTtcclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChNZWRpYVN0cmVhbVRyYWNrICYmIE1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLmFwcGx5Q29uc3RyYWludHMpIHtcclxuICAgICAgdmFyIG5hdGl2ZUFwcGx5Q29uc3RyYWludHMgPSBNZWRpYVN0cmVhbVRyYWNrLnByb3RvdHlwZS5hcHBseUNvbnN0cmFpbnRzO1xyXG4gICAgICBNZWRpYVN0cmVhbVRyYWNrLnByb3RvdHlwZS5hcHBseUNvbnN0cmFpbnRzID0gZnVuY3Rpb24oYykge1xyXG4gICAgICAgIGlmICh0aGlzLmtpbmQgPT09ICdhdWRpbycgJiYgdHlwZW9mIGMgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICBjID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShjKSk7XHJcbiAgICAgICAgICByZW1hcChjLCAnYXV0b0dhaW5Db250cm9sJywgJ21vekF1dG9HYWluQ29udHJvbCcpO1xyXG4gICAgICAgICAgcmVtYXAoYywgJ25vaXNlU3VwcHJlc3Npb24nLCAnbW96Tm9pc2VTdXBwcmVzc2lvbicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmF0aXZlQXBwbHlDb25zdHJhaW50cy5hcHBseSh0aGlzLCBbY10pO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH1cclxuICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhID0gZnVuY3Rpb24oY29uc3RyYWludHMsIG9uU3VjY2Vzcywgb25FcnJvcikge1xyXG4gICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCA0NCkge1xyXG4gICAgICByZXR1cm4gZ2V0VXNlck1lZGlhXyhjb25zdHJhaW50cywgb25TdWNjZXNzLCBvbkVycm9yKTtcclxuICAgIH1cclxuICAgIC8vIFJlcGxhY2UgRmlyZWZveCA0NCsncyBkZXByZWNhdGlvbiB3YXJuaW5nIHdpdGggdW5wcmVmaXhlZCB2ZXJzaW9uLlxyXG4gICAgdXRpbHMuZGVwcmVjYXRlZCgnbmF2aWdhdG9yLmdldFVzZXJNZWRpYScsXHJcbiAgICAgICAgJ25hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhJyk7XHJcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYShjb25zdHJhaW50cykudGhlbihvblN1Y2Nlc3MsIG9uRXJyb3IpO1xyXG4gIH07XHJcbn07XHJcblxyXG59LHtcIi4uL3V0aWxzXCI6MTN9XSwxMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcbi8qXHJcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXHJcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcclxuICogIHRyZWUuXHJcbiAqL1xyXG4ndXNlIHN0cmljdCc7XHJcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBzaGltTG9jYWxTdHJlYW1zQVBJOiBmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAnb2JqZWN0JyB8fCAhd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICghKCdnZXRMb2NhbFN0cmVhbXMnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XHJcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0TG9jYWxTdHJlYW1zID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9sb2NhbFN0cmVhbXMpIHtcclxuICAgICAgICAgIHRoaXMuX2xvY2FsU3RyZWFtcyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxTdHJlYW1zO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgaWYgKCEoJ2dldFN0cmVhbUJ5SWQnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XHJcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U3RyZWFtQnlJZCA9IGZ1bmN0aW9uKGlkKSB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IG51bGw7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xvY2FsU3RyZWFtcykge1xyXG4gICAgICAgICAgdGhpcy5fbG9jYWxTdHJlYW1zLmZvckVhY2goZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICAgICAgICAgIGlmIChzdHJlYW0uaWQgPT09IGlkKSB7XHJcbiAgICAgICAgICAgICAgcmVzdWx0ID0gc3RyZWFtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX3JlbW90ZVN0cmVhbXMpIHtcclxuICAgICAgICAgIHRoaXMuX3JlbW90ZVN0cmVhbXMuZm9yRWFjaChmdW5jdGlvbihzdHJlYW0pIHtcclxuICAgICAgICAgICAgaWYgKHN0cmVhbS5pZCA9PT0gaWQpIHtcclxuICAgICAgICAgICAgICByZXN1bHQgPSBzdHJlYW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgaWYgKCEoJ2FkZFN0cmVhbScgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkpIHtcclxuICAgICAgdmFyIF9hZGRUcmFjayA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2s7XHJcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9sb2NhbFN0cmVhbXMpIHtcclxuICAgICAgICAgIHRoaXMuX2xvY2FsU3RyZWFtcyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fbG9jYWxTdHJlYW1zLmluZGV4T2Yoc3RyZWFtKSA9PT0gLTEpIHtcclxuICAgICAgICAgIHRoaXMuX2xvY2FsU3RyZWFtcy5wdXNoKHN0cmVhbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcclxuICAgICAgICAgIF9hZGRUcmFjay5jYWxsKHBjLCB0cmFjaywgc3RyZWFtKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2sgPSBmdW5jdGlvbih0cmFjaywgc3RyZWFtKSB7XHJcbiAgICAgICAgaWYgKHN0cmVhbSkge1xyXG4gICAgICAgICAgaWYgKCF0aGlzLl9sb2NhbFN0cmVhbXMpIHtcclxuICAgICAgICAgICAgdGhpcy5fbG9jYWxTdHJlYW1zID0gW3N0cmVhbV07XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2xvY2FsU3RyZWFtcy5pbmRleE9mKHN0cmVhbSkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvY2FsU3RyZWFtcy5wdXNoKHN0cmVhbSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBfYWRkVHJhY2suY2FsbCh0aGlzLCB0cmFjaywgc3RyZWFtKTtcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIGlmICghKCdyZW1vdmVTdHJlYW0nIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XHJcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9sb2NhbFN0cmVhbXMpIHtcclxuICAgICAgICAgIHRoaXMuX2xvY2FsU3RyZWFtcyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLl9sb2NhbFN0cmVhbXMuaW5kZXhPZihzdHJlYW0pO1xyXG4gICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbG9jYWxTdHJlYW1zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgICB2YXIgdHJhY2tzID0gc3RyZWFtLmdldFRyYWNrcygpO1xyXG4gICAgICAgIHRoaXMuZ2V0U2VuZGVycygpLmZvckVhY2goZnVuY3Rpb24oc2VuZGVyKSB7XHJcbiAgICAgICAgICBpZiAodHJhY2tzLmluZGV4T2Yoc2VuZGVyLnRyYWNrKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgcGMucmVtb3ZlVHJhY2soc2VuZGVyKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfTtcclxuICAgIH1cclxuICB9LFxyXG4gIHNoaW1SZW1vdGVTdHJlYW1zQVBJOiBmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAnb2JqZWN0JyB8fCAhd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICghKCdnZXRSZW1vdGVTdHJlYW1zJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xyXG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFJlbW90ZVN0cmVhbXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVtb3RlU3RyZWFtcyA/IHRoaXMuX3JlbW90ZVN0cmVhbXMgOiBbXTtcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIGlmICghKCdvbmFkZHN0cmVhbScgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkpIHtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUsICdvbmFkZHN0cmVhbScsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuX29uYWRkc3RyZWFtO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbihmKSB7XHJcbiAgICAgICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICAgICAgaWYgKHRoaXMuX29uYWRkc3RyZWFtKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWRkc3RyZWFtJywgdGhpcy5fb25hZGRzdHJlYW0pO1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYWNrJywgdGhpcy5fb25hZGRzdHJlYW1wb2x5KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignYWRkc3RyZWFtJywgdGhpcy5fb25hZGRzdHJlYW0gPSBmKTtcclxuICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigndHJhY2snLCB0aGlzLl9vbmFkZHN0cmVhbXBvbHkgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUuc3RyZWFtcy5mb3JFYWNoKGZ1bmN0aW9uKHN0cmVhbSkge1xyXG4gICAgICAgICAgICAgIGlmICghcGMuX3JlbW90ZVN0cmVhbXMpIHtcclxuICAgICAgICAgICAgICAgIHBjLl9yZW1vdGVTdHJlYW1zID0gW107XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGlmIChwYy5fcmVtb3RlU3RyZWFtcy5pbmRleE9mKHN0cmVhbSkgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBwYy5fcmVtb3RlU3RyZWFtcy5wdXNoKHN0cmVhbSk7XHJcbiAgICAgICAgICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdhZGRzdHJlYW0nKTtcclxuICAgICAgICAgICAgICBldmVudC5zdHJlYW0gPSBzdHJlYW07XHJcbiAgICAgICAgICAgICAgcGMuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIHNoaW1DYWxsYmFja3NBUEk6IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICdvYmplY3QnIHx8ICF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdmFyIHByb3RvdHlwZSA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGU7XHJcbiAgICB2YXIgY3JlYXRlT2ZmZXIgPSBwcm90b3R5cGUuY3JlYXRlT2ZmZXI7XHJcbiAgICB2YXIgY3JlYXRlQW5zd2VyID0gcHJvdG90eXBlLmNyZWF0ZUFuc3dlcjtcclxuICAgIHZhciBzZXRMb2NhbERlc2NyaXB0aW9uID0gcHJvdG90eXBlLnNldExvY2FsRGVzY3JpcHRpb247XHJcbiAgICB2YXIgc2V0UmVtb3RlRGVzY3JpcHRpb24gPSBwcm90b3R5cGUuc2V0UmVtb3RlRGVzY3JpcHRpb247XHJcbiAgICB2YXIgYWRkSWNlQ2FuZGlkYXRlID0gcHJvdG90eXBlLmFkZEljZUNhbmRpZGF0ZTtcclxuXHJcbiAgICBwcm90b3R5cGUuY3JlYXRlT2ZmZXIgPSBmdW5jdGlvbihzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjaykge1xyXG4gICAgICB2YXIgb3B0aW9ucyA9IChhcmd1bWVudHMubGVuZ3RoID49IDIpID8gYXJndW1lbnRzWzJdIDogYXJndW1lbnRzWzBdO1xyXG4gICAgICB2YXIgcHJvbWlzZSA9IGNyZWF0ZU9mZmVyLmFwcGx5KHRoaXMsIFtvcHRpb25zXSk7XHJcbiAgICAgIGlmICghZmFpbHVyZUNhbGxiYWNrKSB7XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICAgIH1cclxuICAgICAgcHJvbWlzZS50aGVuKHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKTtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcm90b3R5cGUuY3JlYXRlQW5zd2VyID0gZnVuY3Rpb24oc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spIHtcclxuICAgICAgdmFyIG9wdGlvbnMgPSAoYXJndW1lbnRzLmxlbmd0aCA+PSAyKSA/IGFyZ3VtZW50c1syXSA6IGFyZ3VtZW50c1swXTtcclxuICAgICAgdmFyIHByb21pc2UgPSBjcmVhdGVBbnN3ZXIuYXBwbHkodGhpcywgW29wdGlvbnNdKTtcclxuICAgICAgaWYgKCFmYWlsdXJlQ2FsbGJhY2spIHtcclxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgICAgfVxyXG4gICAgICBwcm9taXNlLnRoZW4oc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spO1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciB3aXRoQ2FsbGJhY2sgPSBmdW5jdGlvbihkZXNjcmlwdGlvbiwgc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spIHtcclxuICAgICAgdmFyIHByb21pc2UgPSBzZXRMb2NhbERlc2NyaXB0aW9uLmFwcGx5KHRoaXMsIFtkZXNjcmlwdGlvbl0pO1xyXG4gICAgICBpZiAoIWZhaWx1cmVDYWxsYmFjaykge1xyXG4gICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgICB9XHJcbiAgICAgIHByb21pc2UudGhlbihzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjayk7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgIH07XHJcbiAgICBwcm90b3R5cGUuc2V0TG9jYWxEZXNjcmlwdGlvbiA9IHdpdGhDYWxsYmFjaztcclxuXHJcbiAgICB3aXRoQ2FsbGJhY2sgPSBmdW5jdGlvbihkZXNjcmlwdGlvbiwgc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spIHtcclxuICAgICAgdmFyIHByb21pc2UgPSBzZXRSZW1vdGVEZXNjcmlwdGlvbi5hcHBseSh0aGlzLCBbZGVzY3JpcHRpb25dKTtcclxuICAgICAgaWYgKCFmYWlsdXJlQ2FsbGJhY2spIHtcclxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgICAgfVxyXG4gICAgICBwcm9taXNlLnRoZW4oc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spO1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICB9O1xyXG4gICAgcHJvdG90eXBlLnNldFJlbW90ZURlc2NyaXB0aW9uID0gd2l0aENhbGxiYWNrO1xyXG5cclxuICAgIHdpdGhDYWxsYmFjayA9IGZ1bmN0aW9uKGNhbmRpZGF0ZSwgc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spIHtcclxuICAgICAgdmFyIHByb21pc2UgPSBhZGRJY2VDYW5kaWRhdGUuYXBwbHkodGhpcywgW2NhbmRpZGF0ZV0pO1xyXG4gICAgICBpZiAoIWZhaWx1cmVDYWxsYmFjaykge1xyXG4gICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgICB9XHJcbiAgICAgIHByb21pc2UudGhlbihzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjayk7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgIH07XHJcbiAgICBwcm90b3R5cGUuYWRkSWNlQ2FuZGlkYXRlID0gd2l0aENhbGxiYWNrO1xyXG4gIH0sXHJcbiAgc2hpbUdldFVzZXJNZWRpYTogZnVuY3Rpb24od2luZG93KSB7XHJcbiAgICB2YXIgbmF2aWdhdG9yID0gd2luZG93ICYmIHdpbmRvdy5uYXZpZ2F0b3I7XHJcblxyXG4gICAgaWYgKCFuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhKSB7XHJcbiAgICAgIGlmIChuYXZpZ2F0b3Iud2Via2l0R2V0VXNlck1lZGlhKSB7XHJcbiAgICAgICAgbmF2aWdhdG9yLmdldFVzZXJNZWRpYSA9IG5hdmlnYXRvci53ZWJraXRHZXRVc2VyTWVkaWEuYmluZChuYXZpZ2F0b3IpO1xyXG4gICAgICB9IGVsc2UgaWYgKG5hdmlnYXRvci5tZWRpYURldmljZXMgJiZcclxuICAgICAgICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKSB7XHJcbiAgICAgICAgbmF2aWdhdG9yLmdldFVzZXJNZWRpYSA9IGZ1bmN0aW9uKGNvbnN0cmFpbnRzLCBjYiwgZXJyY2IpIHtcclxuICAgICAgICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzKVxyXG4gICAgICAgICAgLnRoZW4oY2IsIGVycmNiKTtcclxuICAgICAgICB9LmJpbmQobmF2aWdhdG9yKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2hpbVJUQ0ljZVNlcnZlclVybHM6IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgLy8gbWlncmF0ZSBmcm9tIG5vbi1zcGVjIFJUQ0ljZVNlcnZlci51cmwgdG8gUlRDSWNlU2VydmVyLnVybHNcclxuICAgIHZhciBPcmlnUGVlckNvbm5lY3Rpb24gPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb247XHJcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gPSBmdW5jdGlvbihwY0NvbmZpZywgcGNDb25zdHJhaW50cykge1xyXG4gICAgICBpZiAocGNDb25maWcgJiYgcGNDb25maWcuaWNlU2VydmVycykge1xyXG4gICAgICAgIHZhciBuZXdJY2VTZXJ2ZXJzID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwY0NvbmZpZy5pY2VTZXJ2ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICB2YXIgc2VydmVyID0gcGNDb25maWcuaWNlU2VydmVyc1tpXTtcclxuICAgICAgICAgIGlmICghc2VydmVyLmhhc093blByb3BlcnR5KCd1cmxzJykgJiZcclxuICAgICAgICAgICAgICBzZXJ2ZXIuaGFzT3duUHJvcGVydHkoJ3VybCcpKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLmRlcHJlY2F0ZWQoJ1JUQ0ljZVNlcnZlci51cmwnLCAnUlRDSWNlU2VydmVyLnVybHMnKTtcclxuICAgICAgICAgICAgc2VydmVyID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShzZXJ2ZXIpKTtcclxuICAgICAgICAgICAgc2VydmVyLnVybHMgPSBzZXJ2ZXIudXJsO1xyXG4gICAgICAgICAgICBkZWxldGUgc2VydmVyLnVybDtcclxuICAgICAgICAgICAgbmV3SWNlU2VydmVycy5wdXNoKHNlcnZlcik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBuZXdJY2VTZXJ2ZXJzLnB1c2gocGNDb25maWcuaWNlU2VydmVyc1tpXSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBjQ29uZmlnLmljZVNlcnZlcnMgPSBuZXdJY2VTZXJ2ZXJzO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBuZXcgT3JpZ1BlZXJDb25uZWN0aW9uKHBjQ29uZmlnLCBwY0NvbnN0cmFpbnRzKTtcclxuICAgIH07XHJcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlID0gT3JpZ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZTtcclxuICAgIC8vIHdyYXAgc3RhdGljIG1ldGhvZHMuIEN1cnJlbnRseSBqdXN0IGdlbmVyYXRlQ2VydGlmaWNhdGUuXHJcbiAgICBpZiAoJ2dlbmVyYXRlQ2VydGlmaWNhdGUnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbikge1xyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLCAnZ2VuZXJhdGVDZXJ0aWZpY2F0ZScsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmV0dXJuIE9yaWdQZWVyQ29ubmVjdGlvbi5nZW5lcmF0ZUNlcnRpZmljYXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBzaGltVHJhY2tFdmVudFRyYW5zY2VpdmVyOiBmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIC8vIEFkZCBldmVudC50cmFuc2NlaXZlciBtZW1iZXIgb3ZlciBkZXByZWNhdGVkIGV2ZW50LnJlY2VpdmVyXHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uICYmXHJcbiAgICAgICAgKCdyZWNlaXZlcicgaW4gd2luZG93LlJUQ1RyYWNrRXZlbnQucHJvdG90eXBlKSAmJlxyXG4gICAgICAgIC8vIGNhbid0IGNoZWNrICd0cmFuc2NlaXZlcicgaW4gd2luZG93LlJUQ1RyYWNrRXZlbnQucHJvdG90eXBlLCBhcyBpdCBpc1xyXG4gICAgICAgIC8vIGRlZmluZWQgZm9yIHNvbWUgcmVhc29uIGV2ZW4gd2hlbiB3aW5kb3cuUlRDVHJhbnNjZWl2ZXIgaXMgbm90LlxyXG4gICAgICAgICF3aW5kb3cuUlRDVHJhbnNjZWl2ZXIpIHtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENUcmFja0V2ZW50LnByb3RvdHlwZSwgJ3RyYW5zY2VpdmVyJywge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZXR1cm4ge3JlY2VpdmVyOiB0aGlzLnJlY2VpdmVyfTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHNoaW1DcmVhdGVPZmZlckxlZ2FjeTogZnVuY3Rpb24od2luZG93KSB7XHJcbiAgICB2YXIgb3JpZ0NyZWF0ZU9mZmVyID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5jcmVhdGVPZmZlcjtcclxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlT2ZmZXIgPSBmdW5jdGlvbihvZmZlck9wdGlvbnMpIHtcclxuICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgaWYgKG9mZmVyT3B0aW9ucykge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW8gIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAvLyBzdXBwb3J0IGJpdCB2YWx1ZXNcclxuICAgICAgICAgIG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZUF1ZGlvID0gISFvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbztcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGF1ZGlvVHJhbnNjZWl2ZXIgPSBwYy5nZXRUcmFuc2NlaXZlcnMoKS5maW5kKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJhbnNjZWl2ZXIuc2VuZGVyLnRyYWNrICYmXHJcbiAgICAgICAgICAgICAgdHJhbnNjZWl2ZXIuc2VuZGVyLnRyYWNrLmtpbmQgPT09ICdhdWRpbyc7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZUF1ZGlvID09PSBmYWxzZSAmJiBhdWRpb1RyYW5zY2VpdmVyKSB7XHJcbiAgICAgICAgICBpZiAoYXVkaW9UcmFuc2NlaXZlci5kaXJlY3Rpb24gPT09ICdzZW5kcmVjdicpIHtcclxuICAgICAgICAgICAgaWYgKGF1ZGlvVHJhbnNjZWl2ZXIuc2V0RGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgYXVkaW9UcmFuc2NlaXZlci5zZXREaXJlY3Rpb24oJ3NlbmRvbmx5Jyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgYXVkaW9UcmFuc2NlaXZlci5kaXJlY3Rpb24gPSAnc2VuZG9ubHknO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGF1ZGlvVHJhbnNjZWl2ZXIuZGlyZWN0aW9uID09PSAncmVjdm9ubHknKSB7XHJcbiAgICAgICAgICAgIGlmIChhdWRpb1RyYW5zY2VpdmVyLnNldERpcmVjdGlvbikge1xyXG4gICAgICAgICAgICAgIGF1ZGlvVHJhbnNjZWl2ZXIuc2V0RGlyZWN0aW9uKCdpbmFjdGl2ZScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGF1ZGlvVHJhbnNjZWl2ZXIuZGlyZWN0aW9uID0gJ2luYWN0aXZlJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW8gPT09IHRydWUgJiZcclxuICAgICAgICAgICAgIWF1ZGlvVHJhbnNjZWl2ZXIpIHtcclxuICAgICAgICAgIHBjLmFkZFRyYW5zY2VpdmVyKCdhdWRpbycpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygb2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW8gIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAvLyBzdXBwb3J0IGJpdCB2YWx1ZXNcclxuICAgICAgICAgIG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvID0gISFvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVWaWRlbztcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHZpZGVvVHJhbnNjZWl2ZXIgPSBwYy5nZXRUcmFuc2NlaXZlcnMoKS5maW5kKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJhbnNjZWl2ZXIuc2VuZGVyLnRyYWNrICYmXHJcbiAgICAgICAgICAgICAgdHJhbnNjZWl2ZXIuc2VuZGVyLnRyYWNrLmtpbmQgPT09ICd2aWRlbyc7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvID09PSBmYWxzZSAmJiB2aWRlb1RyYW5zY2VpdmVyKSB7XHJcbiAgICAgICAgICBpZiAodmlkZW9UcmFuc2NlaXZlci5kaXJlY3Rpb24gPT09ICdzZW5kcmVjdicpIHtcclxuICAgICAgICAgICAgdmlkZW9UcmFuc2NlaXZlci5zZXREaXJlY3Rpb24oJ3NlbmRvbmx5Jyk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHZpZGVvVHJhbnNjZWl2ZXIuZGlyZWN0aW9uID09PSAncmVjdm9ubHknKSB7XHJcbiAgICAgICAgICAgIHZpZGVvVHJhbnNjZWl2ZXIuc2V0RGlyZWN0aW9uKCdpbmFjdGl2ZScpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlVmlkZW8gPT09IHRydWUgJiZcclxuICAgICAgICAgICAgIXZpZGVvVHJhbnNjZWl2ZXIpIHtcclxuICAgICAgICAgIHBjLmFkZFRyYW5zY2VpdmVyKCd2aWRlbycpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gb3JpZ0NyZWF0ZU9mZmVyLmFwcGx5KHBjLCBhcmd1bWVudHMpO1xyXG4gICAgfTtcclxuICB9XHJcbn07XHJcblxyXG59LHtcIi4uL3V0aWxzXCI6MTN9XSwxMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcbi8qXHJcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXHJcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcclxuICogIHRyZWUuXHJcbiAqL1xyXG4gLyogZXNsaW50LWVudiBub2RlICovXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBsb2dEaXNhYmxlZF8gPSB0cnVlO1xyXG52YXIgZGVwcmVjYXRpb25XYXJuaW5nc18gPSB0cnVlO1xyXG5cclxuLyoqXHJcbiAqIEV4dHJhY3QgYnJvd3NlciB2ZXJzaW9uIG91dCBvZiB0aGUgcHJvdmlkZWQgdXNlciBhZ2VudCBzdHJpbmcuXHJcbiAqXHJcbiAqIEBwYXJhbSB7IXN0cmluZ30gdWFzdHJpbmcgdXNlckFnZW50IHN0cmluZy5cclxuICogQHBhcmFtIHshc3RyaW5nfSBleHByIFJlZ3VsYXIgZXhwcmVzc2lvbiB1c2VkIGFzIG1hdGNoIGNyaXRlcmlhLlxyXG4gKiBAcGFyYW0geyFudW1iZXJ9IHBvcyBwb3NpdGlvbiBpbiB0aGUgdmVyc2lvbiBzdHJpbmcgdG8gYmUgcmV0dXJuZWQuXHJcbiAqIEByZXR1cm4geyFudW1iZXJ9IGJyb3dzZXIgdmVyc2lvbi5cclxuICovXHJcbmZ1bmN0aW9uIGV4dHJhY3RWZXJzaW9uKHVhc3RyaW5nLCBleHByLCBwb3MpIHtcclxuICB2YXIgbWF0Y2ggPSB1YXN0cmluZy5tYXRjaChleHByKTtcclxuICByZXR1cm4gbWF0Y2ggJiYgbWF0Y2gubGVuZ3RoID49IHBvcyAmJiBwYXJzZUludChtYXRjaFtwb3NdLCAxMCk7XHJcbn1cclxuXHJcbi8vIFdyYXBzIHRoZSBwZWVyY29ubmVjdGlvbiBldmVudCBldmVudE5hbWVUb1dyYXAgaW4gYSBmdW5jdGlvblxyXG4vLyB3aGljaCByZXR1cm5zIHRoZSBtb2RpZmllZCBldmVudCBvYmplY3QuXHJcbmZ1bmN0aW9uIHdyYXBQZWVyQ29ubmVjdGlvbkV2ZW50KHdpbmRvdywgZXZlbnROYW1lVG9XcmFwLCB3cmFwcGVyKSB7XHJcbiAgaWYgKCF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24pIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgdmFyIHByb3RvID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZTtcclxuICB2YXIgbmF0aXZlQWRkRXZlbnRMaXN0ZW5lciA9IHByb3RvLmFkZEV2ZW50TGlzdGVuZXI7XHJcbiAgcHJvdG8uYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKG5hdGl2ZUV2ZW50TmFtZSwgY2IpIHtcclxuICAgIGlmIChuYXRpdmVFdmVudE5hbWUgIT09IGV2ZW50TmFtZVRvV3JhcCkge1xyXG4gICAgICByZXR1cm4gbmF0aXZlQWRkRXZlbnRMaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgfVxyXG4gICAgdmFyIHdyYXBwZWRDYWxsYmFjayA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgY2Iod3JhcHBlcihlKSk7XHJcbiAgICB9O1xyXG4gICAgdGhpcy5fZXZlbnRNYXAgPSB0aGlzLl9ldmVudE1hcCB8fCB7fTtcclxuICAgIHRoaXMuX2V2ZW50TWFwW2NiXSA9IHdyYXBwZWRDYWxsYmFjaztcclxuICAgIHJldHVybiBuYXRpdmVBZGRFdmVudExpc3RlbmVyLmFwcGx5KHRoaXMsIFtuYXRpdmVFdmVudE5hbWUsXHJcbiAgICAgIHdyYXBwZWRDYWxsYmFja10pO1xyXG4gIH07XHJcblxyXG4gIHZhciBuYXRpdmVSZW1vdmVFdmVudExpc3RlbmVyID0gcHJvdG8ucmVtb3ZlRXZlbnRMaXN0ZW5lcjtcclxuICBwcm90by5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24obmF0aXZlRXZlbnROYW1lLCBjYikge1xyXG4gICAgaWYgKG5hdGl2ZUV2ZW50TmFtZSAhPT0gZXZlbnROYW1lVG9XcmFwIHx8ICF0aGlzLl9ldmVudE1hcFxyXG4gICAgICAgIHx8ICF0aGlzLl9ldmVudE1hcFtjYl0pIHtcclxuICAgICAgcmV0dXJuIG5hdGl2ZVJlbW92ZUV2ZW50TGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIH1cclxuICAgIHZhciB1bndyYXBwZWRDYiA9IHRoaXMuX2V2ZW50TWFwW2NiXTtcclxuICAgIGRlbGV0ZSB0aGlzLl9ldmVudE1hcFtjYl07XHJcbiAgICByZXR1cm4gbmF0aXZlUmVtb3ZlRXZlbnRMaXN0ZW5lci5hcHBseSh0aGlzLCBbbmF0aXZlRXZlbnROYW1lLFxyXG4gICAgICB1bndyYXBwZWRDYl0pO1xyXG4gIH07XHJcblxyXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgJ29uJyArIGV2ZW50TmFtZVRvV3JhcCwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIHRoaXNbJ19vbicgKyBldmVudE5hbWVUb1dyYXBdO1xyXG4gICAgfSxcclxuICAgIHNldDogZnVuY3Rpb24oY2IpIHtcclxuICAgICAgaWYgKHRoaXNbJ19vbicgKyBldmVudE5hbWVUb1dyYXBdKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZVRvV3JhcCxcclxuICAgICAgICAgICAgdGhpc1snX29uJyArIGV2ZW50TmFtZVRvV3JhcF0pO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzWydfb24nICsgZXZlbnROYW1lVG9XcmFwXTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY2IpIHtcclxuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lVG9XcmFwLFxyXG4gICAgICAgICAgICB0aGlzWydfb24nICsgZXZlbnROYW1lVG9XcmFwXSA9IGNiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG4vLyBVdGlsaXR5IG1ldGhvZHMuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIGV4dHJhY3RWZXJzaW9uOiBleHRyYWN0VmVyc2lvbixcclxuICB3cmFwUGVlckNvbm5lY3Rpb25FdmVudDogd3JhcFBlZXJDb25uZWN0aW9uRXZlbnQsXHJcbiAgZGlzYWJsZUxvZzogZnVuY3Rpb24oYm9vbCkge1xyXG4gICAgaWYgKHR5cGVvZiBib29sICE9PSAnYm9vbGVhbicpIHtcclxuICAgICAgcmV0dXJuIG5ldyBFcnJvcignQXJndW1lbnQgdHlwZTogJyArIHR5cGVvZiBib29sICtcclxuICAgICAgICAgICcuIFBsZWFzZSB1c2UgYSBib29sZWFuLicpO1xyXG4gICAgfVxyXG4gICAgbG9nRGlzYWJsZWRfID0gYm9vbDtcclxuICAgIHJldHVybiAoYm9vbCkgPyAnYWRhcHRlci5qcyBsb2dnaW5nIGRpc2FibGVkJyA6XHJcbiAgICAgICAgJ2FkYXB0ZXIuanMgbG9nZ2luZyBlbmFibGVkJztcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBEaXNhYmxlIG9yIGVuYWJsZSBkZXByZWNhdGlvbiB3YXJuaW5nc1xyXG4gICAqIEBwYXJhbSB7IWJvb2xlYW59IGJvb2wgc2V0IHRvIHRydWUgdG8gZGlzYWJsZSB3YXJuaW5ncy5cclxuICAgKi9cclxuICBkaXNhYmxlV2FybmluZ3M6IGZ1bmN0aW9uKGJvb2wpIHtcclxuICAgIGlmICh0eXBlb2YgYm9vbCAhPT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoJ0FyZ3VtZW50IHR5cGU6ICcgKyB0eXBlb2YgYm9vbCArXHJcbiAgICAgICAgICAnLiBQbGVhc2UgdXNlIGEgYm9vbGVhbi4nKTtcclxuICAgIH1cclxuICAgIGRlcHJlY2F0aW9uV2FybmluZ3NfID0gIWJvb2w7XHJcbiAgICByZXR1cm4gJ2FkYXB0ZXIuanMgZGVwcmVjYXRpb24gd2FybmluZ3MgJyArIChib29sID8gJ2Rpc2FibGVkJyA6ICdlbmFibGVkJyk7XHJcbiAgfSxcclxuXHJcbiAgbG9nOiBmdW5jdGlvbigpIHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBpZiAobG9nRGlzYWJsZWRfKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGNvbnNvbGUubG9nID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3dzIGEgZGVwcmVjYXRpb24gd2FybmluZyBzdWdnZXN0aW5nIHRoZSBtb2Rlcm4gYW5kIHNwZWMtY29tcGF0aWJsZSBBUEkuXHJcbiAgICovXHJcbiAgZGVwcmVjYXRlZDogZnVuY3Rpb24ob2xkTWV0aG9kLCBuZXdNZXRob2QpIHtcclxuICAgIGlmICghZGVwcmVjYXRpb25XYXJuaW5nc18pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS53YXJuKG9sZE1ldGhvZCArICcgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSAnICsgbmV3TWV0aG9kICtcclxuICAgICAgICAnIGluc3RlYWQuJyk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogQnJvd3NlciBkZXRlY3Rvci5cclxuICAgKlxyXG4gICAqIEByZXR1cm4ge29iamVjdH0gcmVzdWx0IGNvbnRhaW5pbmcgYnJvd3NlciBhbmQgdmVyc2lvblxyXG4gICAqICAgICBwcm9wZXJ0aWVzLlxyXG4gICAqL1xyXG4gIGRldGVjdEJyb3dzZXI6IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgdmFyIG5hdmlnYXRvciA9IHdpbmRvdyAmJiB3aW5kb3cubmF2aWdhdG9yO1xyXG5cclxuICAgIC8vIFJldHVybmVkIHJlc3VsdCBvYmplY3QuXHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICByZXN1bHQuYnJvd3NlciA9IG51bGw7XHJcbiAgICByZXN1bHQudmVyc2lvbiA9IG51bGw7XHJcblxyXG4gICAgLy8gRmFpbCBlYXJseSBpZiBpdCdzIG5vdCBhIGJyb3dzZXJcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyB8fCAhd2luZG93Lm5hdmlnYXRvcikge1xyXG4gICAgICByZXN1bHQuYnJvd3NlciA9ICdOb3QgYSBicm93c2VyLic7XHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG5hdmlnYXRvci5tb3pHZXRVc2VyTWVkaWEpIHsgLy8gRmlyZWZveC5cclxuICAgICAgcmVzdWx0LmJyb3dzZXIgPSAnZmlyZWZveCc7XHJcbiAgICAgIHJlc3VsdC52ZXJzaW9uID0gZXh0cmFjdFZlcnNpb24obmF2aWdhdG9yLnVzZXJBZ2VudCxcclxuICAgICAgICAgIC9GaXJlZm94XFwvKFxcZCspXFwuLywgMSk7XHJcbiAgICB9IGVsc2UgaWYgKG5hdmlnYXRvci53ZWJraXRHZXRVc2VyTWVkaWEpIHtcclxuICAgICAgLy8gQ2hyb21lLCBDaHJvbWl1bSwgV2VidmlldywgT3BlcmEuXHJcbiAgICAgIC8vIFZlcnNpb24gbWF0Y2hlcyBDaHJvbWUvV2ViUlRDIHZlcnNpb24uXHJcbiAgICAgIHJlc3VsdC5icm93c2VyID0gJ2Nocm9tZSc7XHJcbiAgICAgIHJlc3VsdC52ZXJzaW9uID0gZXh0cmFjdFZlcnNpb24obmF2aWdhdG9yLnVzZXJBZ2VudCxcclxuICAgICAgICAgIC9DaHJvbShlfGl1bSlcXC8oXFxkKylcXC4vLCAyKTtcclxuICAgIH0gZWxzZSBpZiAobmF2aWdhdG9yLm1lZGlhRGV2aWNlcyAmJlxyXG4gICAgICAgIG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0VkZ2VcXC8oXFxkKykuKFxcZCspJC8pKSB7IC8vIEVkZ2UuXHJcbiAgICAgIHJlc3VsdC5icm93c2VyID0gJ2VkZ2UnO1xyXG4gICAgICByZXN1bHQudmVyc2lvbiA9IGV4dHJhY3RWZXJzaW9uKG5hdmlnYXRvci51c2VyQWdlbnQsXHJcbiAgICAgICAgICAvRWRnZVxcLyhcXGQrKS4oXFxkKykkLywgMik7XHJcbiAgICB9IGVsc2UgaWYgKHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiAmJlxyXG4gICAgICAgIG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0FwcGxlV2ViS2l0XFwvKFxcZCspXFwuLykpIHsgLy8gU2FmYXJpLlxyXG4gICAgICByZXN1bHQuYnJvd3NlciA9ICdzYWZhcmknO1xyXG4gICAgICByZXN1bHQudmVyc2lvbiA9IGV4dHJhY3RWZXJzaW9uKG5hdmlnYXRvci51c2VyQWdlbnQsXHJcbiAgICAgICAgICAvQXBwbGVXZWJLaXRcXC8oXFxkKylcXC4vLCAxKTtcclxuICAgIH0gZWxzZSB7IC8vIERlZmF1bHQgZmFsbHRocm91Z2g6IG5vdCBzdXBwb3J0ZWQuXHJcbiAgICAgIHJlc3VsdC5icm93c2VyID0gJ05vdCBhIHN1cHBvcnRlZCBicm93c2VyLic7XHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbn07XHJcblxyXG59LHt9XX0se30sWzNdKSgzKVxyXG59KTsiXSwic291cmNlUm9vdCI6IiJ9