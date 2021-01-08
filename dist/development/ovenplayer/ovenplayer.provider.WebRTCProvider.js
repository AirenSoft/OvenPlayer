/*! OvenPlayer | (c) 2021 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

    var defaultConnectionConfig = {
        'iceServers': [{
            'urls': 'stun:stun.l.google.com:19302'
        }]
    };

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

    var recorverPacketLoss = true;

    if (playerConfig.getConfig().webrtcConfig && playerConfig.getConfig().webrtcConfig.recorverPacketLoss === false) {

        recorverPacketLoss = playerConfig.getConfig().webrtcConfig.recorverPacketLoss;
    }

    var generatePublicCandidate = true;

    if (playerConfig.getConfig().webrtcConfig && playerConfig.getConfig().webrtcConfig.generatePublicCandidate === false) {

        generatePublicCandidate = playerConfig.getConfig().webrtcConfig.generatePublicCandidate;
    }

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

    function createMainPeerConnection(id, peerId, sdp, candidates, iceServers, resolve) {

        var peerConnectionConfig = {};

        // first priority using ice servers from player setting.
        if (playerConfig.getConfig().webrtcConfig && playerConfig.getConfig().webrtcConfig.iceServers) {

            peerConnectionConfig.iceServers = playerConfig.getConfig().webrtcConfig.iceServers;

            if (playerConfig.getConfig().webrtcConfig.iceTransportPolicy) {

                peerConnectionConfig.iceTransportPolicy = playerConfig.getConfig().webrtcConfig.iceTransportPolicy;
            }
        } else if (iceServers) {

            // second priority using ice servers from ome and force using TCP
            peerConnectionConfig.iceServers = [];

            for (var i = 0; i < iceServers.length; i++) {

                var iceServer = iceServers[i];

                var regIceServer = {};

                regIceServer.urls = iceServer.urls;
                regIceServer.username = iceServer.user_name;
                regIceServer.credential = iceServer.credential;

                peerConnectionConfig.iceServers.push(regIceServer);
            }

            peerConnectionConfig.iceTransportPolicy = 'relay';
        } else {

            // last priority using default ice servers.
            peerConnectionConfig = defaultConnectionConfig;
        }

        OvenPlayerConsole.log("main peer connection config : ", peerConnectionConfig);

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

            OvenPlayerConsole.log('Recovery On Packet Loss :', recorverPacketLoss);

            if (recorverPacketLoss) {
                extractLossPacketsOnNetworkStatus(mainPeerConnectionInfo);
            }

            mainStream = e.streams[0];
            loadCallback(e.streams[0]);

            if (playerConfig.getConfig().webrtcConfig && playerConfig.getConfig().webrtcConfig.playoutDelayHint) {

                var hint = playerConfig.getConfig().webrtcConfig.playoutDelayHint;

                var receivers = mainPeerConnectionInfo.peerConnection.getReceivers();

                for (var _i = 0; _i < receivers.length; _i++) {

                    var receiver = receivers[_i];

                    receiver.playoutDelayHint = hint;
                    OvenPlayerConsole.log("WebRTC playoutDelayHint", receiver, hint);
                }
            }
        };
    }

    function createClientPeerConnection(hostId, clientId) {

        if (!mainStream) {

            setTimeout(function () {

                createClientPeerConnection(hostId, clientId);
            }, 100);

            return;
        }

        var peerConnection = new RTCPeerConnection(defaultConnectionConfig);

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

                peerConnection.addIceCandidate(new RTCIceCandidate(basicCandidate)).then(function () {
                    OvenPlayerConsole.log("addIceCandidate : success");
                })["catch"](function (error) {
                    var tempError = _constants.ERRORS.codes[_constants.PLAYER_WEBRTC_ADD_ICECANDIDATE_ERROR];
                    tempError.error = error;
                    closePeer(tempError);
                });

                if (generatePublicCandidate) {

                    var cloneCandidatePromise = copyCandidate(basicCandidate);

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

                    createMainPeerConnection(message.id, message.peer_id, message.sdp, message.candidates, message.ice_servers, resolve);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9XZWJSVEMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvV2ViUlRDTG9hZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9hZGFwdGVyLmpzIl0sIm5hbWVzIjpbIldlYlJUQyIsImVsZW1lbnQiLCJwbGF5ZXJDb25maWciLCJhZFRhZ1VybCIsInRoYXQiLCJ3ZWJydGNMb2FkZXIiLCJzdXBlckRlc3Ryb3lfZnVuYyIsInNwZWMiLCJuYW1lIiwiUFJPVklERVJfV0VCUlRDIiwibXNlIiwibGlzdGVuZXIiLCJpc0xvYWRlZCIsImNhblNlZWsiLCJpc0xpdmUiLCJzZWVraW5nIiwic3RhdGUiLCJTVEFURV9JRExFIiwiYnVmZmVyIiwiZnJhbWVyYXRlIiwiY3VycmVudFF1YWxpdHkiLCJjdXJyZW50U291cmNlIiwicXVhbGl0eUxldmVscyIsInNvdXJjZXMiLCJzb3VyY2UiLCJmaWxlIiwidHlwZSIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwiZGVzdHJveSIsImxvYWRDYWxsYmFjayIsInN0cmVhbSIsInNyY09iamVjdCIsImVycm9yVHJpZ2dlciIsImNvbm5lY3QiLCJlcnJvciIsIm9uIiwiQ09OVEVOVF9NRVRBIiwiaXNBdXRvU3RhcnQiLCJvZmYiLCJXZWJSVENMb2FkZXIiLCJwcm92aWRlciIsIndlYlNvY2tldFVybCIsImRlZmF1bHRDb25uZWN0aW9uQ29uZmlnIiwid3MiLCJ3c1BpbmciLCJtYWluU3RyZWFtIiwibWFpblBlZXJDb25uZWN0aW9uSW5mbyIsImNsaWVudFBlZXJDb25uZWN0aW9ucyIsIndzQ2xvc2VkQnlQbGF5ZXIiLCJyZWNvcnZlclBhY2tldExvc3MiLCJnZXRDb25maWciLCJ3ZWJydGNDb25maWciLCJnZW5lcmF0ZVB1YmxpY0NhbmRpZGF0ZSIsInN0YXRpc3RpY3NUaW1lciIsImN1cnJlbnRCcm93c2VyIiwiZXhpc3RpbmdIYW5kbGVyIiwid2luZG93Iiwib25iZWZvcmV1bmxvYWQiLCJldmVudCIsImNsb3NlUGVlciIsImdldFBlZXJDb25uZWN0aW9uQnlJZCIsImlkIiwicGVlckNvbm5lY3Rpb24iLCJleHRyYWN0TG9zc1BhY2tldHNPbk5ldHdvcmtTdGF0dXMiLCJwZWVyQ29ubmVjdGlvbkluZm8iLCJjbGVhclRpbWVvdXQiLCJzdGF0dXMiLCJsb3N0UGFja2V0c0FyciIsInNsb3RMZW5ndGgiLCJwcmV2UGFja2V0c0xvc3QiLCJhdmc4TG9zc2VzIiwiYXZnTW9yZVRoYW5UaHJlc2hvbGRDb3VudCIsInRocmVzaG9sZCIsInNldFRpbWVvdXQiLCJnZXRTdGF0cyIsInRoZW4iLCJzdGF0cyIsImF1dG9GYWxsYmFjayIsImZvckVhY2giLCJraW5kIiwiaXNSZW1vdGUiLCJhY3R1YWxQYWNrZXRMb3N0IiwicGFyc2VJbnQiLCJwYWNrZXRzTG9zdCIsInB1c2giLCJsZW5ndGgiLCJzaGlmdCIsIl8iLCJyZWR1Y2UiLCJtZW1vIiwibnVtIiwidGVtcEVycm9yIiwiRVJST1JTIiwiY29kZXMiLCJQTEFZRVJfV0VCUlRDX05FVFdPUktfU0xPVyIsImNyZWF0ZU1haW5QZWVyQ29ubmVjdGlvbiIsInBlZXJJZCIsInNkcCIsImNhbmRpZGF0ZXMiLCJpY2VTZXJ2ZXJzIiwicmVzb2x2ZSIsInBlZXJDb25uZWN0aW9uQ29uZmlnIiwiaWNlVHJhbnNwb3J0UG9saWN5IiwiaSIsImljZVNlcnZlciIsInJlZ0ljZVNlcnZlciIsInVybHMiLCJ1c2VybmFtZSIsInVzZXJfbmFtZSIsImNyZWRlbnRpYWwiLCJSVENQZWVyQ29ubmVjdGlvbiIsInNldFJlbW90ZURlc2NyaXB0aW9uIiwiUlRDU2Vzc2lvbkRlc2NyaXB0aW9uIiwiY3JlYXRlQW5zd2VyIiwiZGVzYyIsInNldExvY2FsRGVzY3JpcHRpb24iLCJsb2NhbFNEUCIsImxvY2FsRGVzY3JpcHRpb24iLCJzZW5kTWVzc2FnZSIsInBlZXJfaWQiLCJjb21tYW5kIiwiUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUiIsIlBMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUiIsIlBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SIiwiYWRkSWNlQ2FuZGlkYXRlIiwib25pY2VjYW5kaWRhdGUiLCJlIiwiY2FuZGlkYXRlIiwib25jb25uZWN0aW9uc3RhdGVjaGFuZ2UiLCJjb25uZWN0aW9uU3RhdGUiLCJvbmljZWNvbm5lY3Rpb25zdGF0ZWNoYW5nZSIsImljZUNvbm5lY3Rpb25TdGF0ZSIsIlBMQVlFUl9XRUJSVENfVU5FWFBFQ1RFRF9ESVNDT05ORUNUIiwib250cmFjayIsInN0cmVhbXMiLCJwbGF5b3V0RGVsYXlIaW50IiwiaGludCIsInJlY2VpdmVycyIsImdldFJlY2VpdmVycyIsInJlY2VpdmVyIiwiY3JlYXRlQ2xpZW50UGVlckNvbm5lY3Rpb24iLCJob3N0SWQiLCJjbGllbnRJZCIsImFkZFN0cmVhbSIsImNyZWF0ZU9mZmVyIiwic2V0TG9jYWxBbmRTZW5kTWVzc2FnZSIsImhhbmRsZUNyZWF0ZU9mZmVyRXJyb3IiLCJzZXNzaW9uRGVzY3JpcHRpb24iLCJjb3B5Q2FuZGlkYXRlIiwiYmFzaWNDYW5kaWRhdGUiLCJjbG9uZUNhbmRpZGF0ZSIsImNsb25lIiwiZ2VuZXJhdGVEb21haW5Gcm9tVXJsIiwidXJsIiwicmVzdWx0IiwibWF0Y2giLCJmaW5kSXAiLCJSZWdFeHAiLCJuZXdEb21haW4iLCJpcCIsIlByb21pc2UiLCJyZWplY3QiLCJicm93c2VyIiwiZmV0Y2giLCJyZXNwIiwianNvbiIsImRhdGEiLCJBbnN3ZXIiLCJyZWxzb2x2ZWRJcCIsInJlcGxhY2UiLCJSVENJY2VDYW5kaWRhdGUiLCJQTEFZRVJfV0VCUlRDX0FERF9JQ0VDQU5ESURBVEVfRVJST1IiLCJjbG9uZUNhbmRpZGF0ZVByb21pc2UiLCJpbml0V2ViU29ja2V0IiwiV2ViU29ja2V0Iiwib25vcGVuIiwib25tZXNzYWdlIiwibWVzc2FnZSIsIkpTT04iLCJwYXJzZSIsIlBMQVlFUl9XRUJSVENfV1NfRVJST1IiLCJPYmplY3QiLCJrZXlzIiwiY29uc3RydWN0b3IiLCJpY2Vfc2VydmVycyIsInRyaWdnZXIiLCJPTUVfUDJQX01PREUiLCJwZWVyQ29ubmVjdGlvbjEiLCJwZWVyQ29ubmVjdGlvbjIiLCJwZWVyQ29ubmVjdGlvbjMiLCJjbG9zZSIsInBhdXNlIiwib25jbG9zZSIsIm9uZXJyb3IiLCJpbml0aWFsaXplIiwiY2xpZW50UGVlckNvbm5lY3Rpb24iLCJjbGVhckludGVydmFsIiwicmVhZHlTdGF0ZSIsInNlbmQiLCJzdHJpbmdpZnkiLCJmIiwiZXhwb3J0cyIsIm1vZHVsZSIsImRlZmluZSIsInQiLCJuIiwiciIsInMiLCJvIiwidSIsImEiLCJyZXF1aXJlIiwiRXJyb3IiLCJjb2RlIiwibCIsImNhbGwiLCJTRFBVdGlscyIsIndyaXRlTWVkaWFTZWN0aW9uIiwidHJhbnNjZWl2ZXIiLCJjYXBzIiwiZHRsc1JvbGUiLCJ3cml0ZVJ0cERlc2NyaXB0aW9uIiwid3JpdGVJY2VQYXJhbWV0ZXJzIiwiaWNlR2F0aGVyZXIiLCJnZXRMb2NhbFBhcmFtZXRlcnMiLCJ3cml0ZUR0bHNQYXJhbWV0ZXJzIiwiZHRsc1RyYW5zcG9ydCIsIm1pZCIsInJ0cFNlbmRlciIsInJ0cFJlY2VpdmVyIiwidHJhY2tJZCIsIl9pbml0aWFsVHJhY2tJZCIsInRyYWNrIiwibXNpZCIsInNlbmRFbmNvZGluZ1BhcmFtZXRlcnMiLCJzc3JjIiwicnR4IiwibG9jYWxDTmFtZSIsImZpbHRlckljZVNlcnZlcnMiLCJlZGdlVmVyc2lvbiIsImhhc1R1cm4iLCJmaWx0ZXIiLCJzZXJ2ZXIiLCJjb25zb2xlIiwid2FybiIsImlzU3RyaW5nIiwidmFsaWRUdXJuIiwiaW5kZXhPZiIsImdldENvbW1vbkNhcGFiaWxpdGllcyIsImxvY2FsQ2FwYWJpbGl0aWVzIiwicmVtb3RlQ2FwYWJpbGl0aWVzIiwiY29tbW9uQ2FwYWJpbGl0aWVzIiwiY29kZWNzIiwiaGVhZGVyRXh0ZW5zaW9ucyIsImZlY01lY2hhbmlzbXMiLCJmaW5kQ29kZWNCeVBheWxvYWRUeXBlIiwicHQiLCJwYXlsb2FkVHlwZSIsInByZWZlcnJlZFBheWxvYWRUeXBlIiwicnR4Q2FwYWJpbGl0eU1hdGNoZXMiLCJsUnR4IiwiclJ0eCIsImxDb2RlY3MiLCJyQ29kZWNzIiwibENvZGVjIiwicGFyYW1ldGVycyIsImFwdCIsInJDb2RlYyIsInRvTG93ZXJDYXNlIiwiY2xvY2tSYXRlIiwibnVtQ2hhbm5lbHMiLCJNYXRoIiwibWluIiwicnRjcEZlZWRiYWNrIiwiZmIiLCJqIiwicGFyYW1ldGVyIiwibEhlYWRlckV4dGVuc2lvbiIsInJIZWFkZXJFeHRlbnNpb24iLCJ1cmkiLCJpc0FjdGlvbkFsbG93ZWRJblNpZ25hbGluZ1N0YXRlIiwiYWN0aW9uIiwic2lnbmFsaW5nU3RhdGUiLCJvZmZlciIsImFuc3dlciIsIm1heWJlQWRkQ2FuZGlkYXRlIiwiaWNlVHJhbnNwb3J0IiwiYWxyZWFkeUFkZGVkIiwiZ2V0UmVtb3RlQ2FuZGlkYXRlcyIsImZpbmQiLCJyZW1vdGVDYW5kaWRhdGUiLCJmb3VuZGF0aW9uIiwicG9ydCIsInByaW9yaXR5IiwicHJvdG9jb2wiLCJhZGRSZW1vdGVDYW5kaWRhdGUiLCJtYWtlRXJyb3IiLCJkZXNjcmlwdGlvbiIsIk5vdFN1cHBvcnRlZEVycm9yIiwiSW52YWxpZFN0YXRlRXJyb3IiLCJJbnZhbGlkQWNjZXNzRXJyb3IiLCJUeXBlRXJyb3IiLCJ1bmRlZmluZWQiLCJPcGVyYXRpb25FcnJvciIsImFkZFRyYWNrVG9TdHJlYW1BbmRGaXJlRXZlbnQiLCJhZGRUcmFjayIsImRpc3BhdGNoRXZlbnQiLCJNZWRpYVN0cmVhbVRyYWNrRXZlbnQiLCJyZW1vdmVUcmFja0Zyb21TdHJlYW1BbmRGaXJlRXZlbnQiLCJyZW1vdmVUcmFjayIsImZpcmVBZGRUcmFjayIsInBjIiwidHJhY2tFdmVudCIsIkV2ZW50IiwiX2Rpc3BhdGNoRXZlbnQiLCJjb25maWciLCJfZXZlbnRUYXJnZXQiLCJkb2N1bWVudCIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJtZXRob2QiLCJiaW5kIiwiY2FuVHJpY2tsZUljZUNhbmRpZGF0ZXMiLCJuZWVkTmVnb3RpYXRpb24iLCJsb2NhbFN0cmVhbXMiLCJyZW1vdGVTdHJlYW1zIiwicmVtb3RlRGVzY3JpcHRpb24iLCJpY2VHYXRoZXJpbmdTdGF0ZSIsInVzaW5nQnVuZGxlIiwiYnVuZGxlUG9saWN5IiwicnRjcE11eFBvbGljeSIsIl9pY2VHYXRoZXJlcnMiLCJpY2VDYW5kaWRhdGVQb29sU2l6ZSIsIlJUQ0ljZUdhdGhlcmVyIiwiZ2F0aGVyUG9saWN5IiwiX2NvbmZpZyIsInRyYW5zY2VpdmVycyIsIl9zZHBTZXNzaW9uSWQiLCJnZW5lcmF0ZVNlc3Npb25JZCIsIl9zZHBTZXNzaW9uVmVyc2lvbiIsIl9kdGxzUm9sZSIsIl9pc0Nsb3NlZCIsInByb3RvdHlwZSIsIm9uYWRkc3RyZWFtIiwib25yZW1vdmVzdHJlYW0iLCJvbnNpZ25hbGluZ3N0YXRlY2hhbmdlIiwib25pY2VnYXRoZXJpbmdzdGF0ZWNoYW5nZSIsIm9ubmVnb3RpYXRpb25uZWVkZWQiLCJvbmRhdGFjaGFubmVsIiwiX2VtaXRHYXRoZXJpbmdTdGF0ZUNoYW5nZSIsImdldENvbmZpZ3VyYXRpb24iLCJnZXRMb2NhbFN0cmVhbXMiLCJnZXRSZW1vdGVTdHJlYW1zIiwiX2NyZWF0ZVRyYW5zY2VpdmVyIiwiZG9Ob3RBZGQiLCJoYXNCdW5kbGVUcmFuc3BvcnQiLCJyZWN2RW5jb2RpbmdQYXJhbWV0ZXJzIiwiYXNzb2NpYXRlZFJlbW90ZU1lZGlhU3RyZWFtcyIsIndhbnRSZWNlaXZlIiwidHJhbnNwb3J0cyIsIl9jcmVhdGVJY2VBbmREdGxzVHJhbnNwb3J0cyIsImFscmVhZHlFeGlzdHMiLCJfbWF5YmVGaXJlTmVnb3RpYXRpb25OZWVkZWQiLCJSVENSdHBTZW5kZXIiLCJnZXRUcmFja3MiLCJjbG9uZWRTdHJlYW0iLCJpZHgiLCJjbG9uZWRUcmFjayIsImFkZEV2ZW50TGlzdGVuZXIiLCJlbmFibGVkIiwic2VuZGVyIiwic3RvcCIsIm1hcCIsInNwbGljZSIsInJlbW92ZVN0cmVhbSIsImdldFNlbmRlcnMiLCJfY3JlYXRlSWNlR2F0aGVyZXIiLCJzZHBNTGluZUluZGV4IiwiZGVmaW5lUHJvcGVydHkiLCJ2YWx1ZSIsIndyaXRhYmxlIiwiYnVmZmVyZWRDYW5kaWRhdGVFdmVudHMiLCJidWZmZXJDYW5kaWRhdGVzIiwiZW5kIiwiX2dhdGhlciIsIm9ubG9jYWxjYW5kaWRhdGUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZXZ0Iiwic2RwTWlkIiwiY2FuZCIsImNvbXBvbmVudCIsInVmcmFnIiwidXNlcm5hbWVGcmFnbWVudCIsInNlcmlhbGl6ZWRDYW5kaWRhdGUiLCJ3cml0ZUNhbmRpZGF0ZSIsInBhcnNlQ2FuZGlkYXRlIiwidG9KU09OIiwic2VjdGlvbnMiLCJnZXRNZWRpYVNlY3Rpb25zIiwiZ2V0RGVzY3JpcHRpb24iLCJqb2luIiwiY29tcGxldGUiLCJldmVyeSIsIlJUQ0ljZVRyYW5zcG9ydCIsIm9uaWNlc3RhdGVjaGFuZ2UiLCJfdXBkYXRlSWNlQ29ubmVjdGlvblN0YXRlIiwiX3VwZGF0ZUNvbm5lY3Rpb25TdGF0ZSIsIlJUQ0R0bHNUcmFuc3BvcnQiLCJvbmR0bHNzdGF0ZWNoYW5nZSIsIl9kaXNwb3NlSWNlQW5kRHRsc1RyYW5zcG9ydHMiLCJfdHJhbnNjZWl2ZSIsInJlY3YiLCJwYXJhbXMiLCJlbmNvZGluZ3MiLCJydGNwIiwiY25hbWUiLCJjb21wb3VuZCIsInJ0Y3BQYXJhbWV0ZXJzIiwicCIsInJlY2VpdmUiLCJzZXNzaW9ucGFydCIsInNwbGl0U2VjdGlvbnMiLCJtZWRpYVNlY3Rpb24iLCJwYXJzZVJ0cFBhcmFtZXRlcnMiLCJpc0ljZUxpdGUiLCJtYXRjaFByZWZpeCIsInJlamVjdGVkIiwiaXNSZWplY3RlZCIsInJlbW90ZUljZVBhcmFtZXRlcnMiLCJnZXRJY2VQYXJhbWV0ZXJzIiwicmVtb3RlRHRsc1BhcmFtZXRlcnMiLCJnZXREdGxzUGFyYW1ldGVycyIsInJvbGUiLCJzdGFydCIsIl91cGRhdGVTaWduYWxpbmdTdGF0ZSIsInJlY2VpdmVyTGlzdCIsImljZU9wdGlvbnMiLCJzdWJzdHIiLCJzcGxpdCIsImxpbmVzIiwic3BsaXRMaW5lcyIsImdldEtpbmQiLCJkaXJlY3Rpb24iLCJnZXREaXJlY3Rpb24iLCJyZW1vdGVNc2lkIiwicGFyc2VNc2lkIiwiZ2V0TWlkIiwiZ2VuZXJhdGVJZGVudGlmaWVyIiwicGFyc2VSdHBFbmNvZGluZ1BhcmFtZXRlcnMiLCJwYXJzZVJ0Y3BQYXJhbWV0ZXJzIiwiaXNDb21wbGV0ZSIsImNhbmRzIiwic2V0VHJhbnNwb3J0Iiwic2V0UmVtb3RlQ2FuZGlkYXRlcyIsIlJUQ1J0cFJlY2VpdmVyIiwiZ2V0Q2FwYWJpbGl0aWVzIiwiY29kZWMiLCJpc05ld1RyYWNrIiwiTWVkaWFTdHJlYW0iLCJnZXQiLCJuYXRpdmVUcmFjayIsInNpZCIsIml0ZW0iLCJuZXdTdGF0ZSIsInN0YXRlcyIsImNsb3NlZCIsImNoZWNraW5nIiwiY29ubmVjdGVkIiwiY29tcGxldGVkIiwiZGlzY29ubmVjdGVkIiwiZmFpbGVkIiwiY29ubmVjdGluZyIsIm51bUF1ZGlvVHJhY2tzIiwibnVtVmlkZW9UcmFja3MiLCJvZmZlck9wdGlvbnMiLCJhcmd1bWVudHMiLCJtYW5kYXRvcnkiLCJvcHRpb25hbCIsIm9mZmVyVG9SZWNlaXZlQXVkaW8iLCJvZmZlclRvUmVjZWl2ZVZpZGVvIiwid3JpdGVTZXNzaW9uQm9pbGVycGxhdGUiLCJyZW1vdGVDb2RlYyIsImhkckV4dCIsInJlbW90ZUV4dGVuc2lvbnMiLCJySGRyRXh0IiwiZ2V0TG9jYWxDYW5kaWRhdGVzIiwibWVkaWFTZWN0aW9uc0luT2ZmZXIiLCJsb2NhbFRyYWNrIiwiZ2V0QXVkaW9UcmFja3MiLCJnZXRWaWRlb1RyYWNrcyIsImhhc1J0eCIsImMiLCJyZWR1Y2VkU2l6ZSIsImNhbmRpZGF0ZVN0cmluZyIsInRyaW0iLCJwcm9taXNlcyIsImZpeFN0YXRzVHlwZSIsInN0YXQiLCJpbmJvdW5kcnRwIiwib3V0Ym91bmRydHAiLCJjYW5kaWRhdGVwYWlyIiwibG9jYWxjYW5kaWRhdGUiLCJyZW1vdGVjYW5kaWRhdGUiLCJyZXN1bHRzIiwiTWFwIiwiYWxsIiwicmVzIiwic2V0IiwibWV0aG9kcyIsIm5hdGl2ZU1ldGhvZCIsImFyZ3MiLCJhcHBseSIsInJhbmRvbSIsInRvU3RyaW5nIiwiYmxvYiIsImxpbmUiLCJwYXJ0cyIsInBhcnQiLCJpbmRleCIsInByZWZpeCIsInN1YnN0cmluZyIsInJlbGF0ZWRBZGRyZXNzIiwicmVsYXRlZFBvcnQiLCJ0Y3BUeXBlIiwidG9VcHBlckNhc2UiLCJwYXJzZUljZU9wdGlvbnMiLCJwYXJzZVJ0cE1hcCIsInBhcnNlZCIsIndyaXRlUnRwTWFwIiwicGFyc2VFeHRtYXAiLCJ3cml0ZUV4dG1hcCIsImhlYWRlckV4dGVuc2lvbiIsInByZWZlcnJlZElkIiwicGFyc2VGbXRwIiwia3YiLCJ3cml0ZUZtdHAiLCJwYXJhbSIsInBhcnNlUnRjcEZiIiwid3JpdGVSdGNwRmIiLCJwYXJzZVNzcmNNZWRpYSIsInNwIiwiY29sb24iLCJhdHRyaWJ1dGUiLCJwYXJzZUZpbmdlcnByaW50IiwiYWxnb3JpdGhtIiwiZmluZ2VycHJpbnRzIiwic2V0dXBUeXBlIiwiZnAiLCJjb25jYXQiLCJpY2VQYXJhbWV0ZXJzIiwicGFzc3dvcmQiLCJtbGluZSIsInJ0cG1hcGxpbmUiLCJmbXRwcyIsIm1heHB0aW1lIiwiZXh0ZW5zaW9uIiwiZW5jb2RpbmdQYXJhbWV0ZXJzIiwiaGFzUmVkIiwiaGFzVWxwZmVjIiwic3NyY3MiLCJwcmltYXJ5U3NyYyIsInNlY29uZGFyeVNzcmMiLCJmbG93cyIsImVuY1BhcmFtIiwiY29kZWNQYXlsb2FkVHlwZSIsImZlYyIsIm1lY2hhbmlzbSIsImJhbmR3aWR0aCIsIm1heEJpdHJhdGUiLCJyZW1vdGVTc3JjIiwib2JqIiwicnNpemUiLCJtdXgiLCJwbGFuQiIsInNlc3NJZCIsInNlc3NWZXIiLCJzZXNzaW9uSWQiLCJ2ZXJzaW9uIiwicGFyc2VNTGluZSIsImZtdCIsInNsaWNlIiwicGFyc2VPTGluZSIsInNlc3Npb25WZXJzaW9uIiwibmV0VHlwZSIsImFkZHJlc3NUeXBlIiwiYWRkcmVzcyIsImdsb2JhbCIsImFkYXB0ZXJGYWN0b3J5Iiwic2VsZiIsInV0aWxzIiwiZGVwZW5kZW5jaWVzIiwib3B0cyIsIm9wdGlvbnMiLCJzaGltQ2hyb21lIiwic2hpbUZpcmVmb3giLCJzaGltRWRnZSIsInNoaW1TYWZhcmkiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsImxvZ2dpbmciLCJicm93c2VyRGV0YWlscyIsImRldGVjdEJyb3dzZXIiLCJjaHJvbWVTaGltIiwiZWRnZVNoaW0iLCJmaXJlZm94U2hpbSIsInNhZmFyaVNoaW0iLCJjb21tb25TaGltIiwiYWRhcHRlciIsImV4dHJhY3RWZXJzaW9uIiwiZGlzYWJsZUxvZyIsImRpc2FibGVXYXJuaW5ncyIsInNoaW1QZWVyQ29ubmVjdGlvbiIsImJyb3dzZXJTaGltIiwic2hpbUNyZWF0ZU9iamVjdFVSTCIsInNoaW1HZXRVc2VyTWVkaWEiLCJzaGltTWVkaWFTdHJlYW0iLCJzaGltU291cmNlT2JqZWN0Iiwic2hpbU9uVHJhY2siLCJzaGltQWRkVHJhY2tSZW1vdmVUcmFjayIsInNoaW1HZXRTZW5kZXJzV2l0aER0bWYiLCJzaGltUlRDSWNlQ2FuZGlkYXRlIiwic2hpbU1heE1lc3NhZ2VTaXplIiwic2hpbVNlbmRUaHJvd1R5cGVFcnJvciIsInNoaW1SZW1vdmVTdHJlYW0iLCJzaGltUmVwbGFjZVRyYWNrIiwic2hpbVJUQ0ljZVNlcnZlclVybHMiLCJzaGltQ2FsbGJhY2tzQVBJIiwic2hpbUxvY2FsU3RyZWFtc0FQSSIsInNoaW1SZW1vdGVTdHJlYW1zQVBJIiwic2hpbVRyYWNrRXZlbnRUcmFuc2NlaXZlciIsInNoaW1DcmVhdGVPZmZlckxlZ2FjeSIsIndlYmtpdE1lZGlhU3RyZWFtIiwiX29udHJhY2siLCJvcmlnU2V0UmVtb3RlRGVzY3JpcHRpb24iLCJfb250cmFja3BvbHkiLCJ0ZSIsIndyYXBQZWVyQ29ubmVjdGlvbkV2ZW50Iiwic2hpbVNlbmRlcldpdGhEdG1mIiwiZHRtZiIsIl9kdG1mIiwiY3JlYXRlRFRNRlNlbmRlciIsIl9wYyIsIl9zZW5kZXJzIiwib3JpZ0FkZFRyYWNrIiwib3JpZ1JlbW92ZVRyYWNrIiwib3JpZ0FkZFN0cmVhbSIsIm9yaWdSZW1vdmVTdHJlYW0iLCJvcmlnR2V0U2VuZGVycyIsInNlbmRlcnMiLCJVUkwiLCJIVE1MTWVkaWFFbGVtZW50IiwiX3NyY09iamVjdCIsInNyYyIsInJldm9rZU9iamVjdFVSTCIsImNyZWF0ZU9iamVjdFVSTCIsInNoaW1BZGRUcmFja1JlbW92ZVRyYWNrV2l0aE5hdGl2ZSIsIl9zaGltbWVkTG9jYWxTdHJlYW1zIiwic3RyZWFtSWQiLCJET01FeGNlcHRpb24iLCJleGlzdGluZ1NlbmRlcnMiLCJuZXdTZW5kZXJzIiwibmV3U2VuZGVyIiwib3JpZ0dldExvY2FsU3RyZWFtcyIsIm5hdGl2ZVN0cmVhbXMiLCJfcmV2ZXJzZVN0cmVhbXMiLCJfc3RyZWFtcyIsIm5ld1N0cmVhbSIsIm9sZFN0cmVhbSIsInJlcGxhY2VJbnRlcm5hbFN0cmVhbUlkIiwiaW50ZXJuYWxJZCIsImV4dGVybmFsU3RyZWFtIiwiaW50ZXJuYWxTdHJlYW0iLCJyZXBsYWNlRXh0ZXJuYWxTdHJlYW1JZCIsImlzTGVnYWN5Q2FsbCIsImVyciIsIm9yaWdTZXRMb2NhbERlc2NyaXB0aW9uIiwib3JpZ0xvY2FsRGVzY3JpcHRpb24iLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJpc0xvY2FsIiwic3RyZWFtaWQiLCJoYXNUcmFjayIsIndlYmtpdFJUQ1BlZXJDb25uZWN0aW9uIiwicGNDb25maWciLCJwY0NvbnN0cmFpbnRzIiwiaWNlVHJhbnNwb3J0cyIsImdlbmVyYXRlQ2VydGlmaWNhdGUiLCJPcmlnUGVlckNvbm5lY3Rpb24iLCJuZXdJY2VTZXJ2ZXJzIiwiZGVwcmVjYXRlZCIsIm9yaWdHZXRTdGF0cyIsInNlbGVjdG9yIiwic3VjY2Vzc0NhbGxiYWNrIiwiZXJyb3JDYWxsYmFjayIsImZpeENocm9tZVN0YXRzXyIsInJlc3BvbnNlIiwic3RhbmRhcmRSZXBvcnQiLCJyZXBvcnRzIiwicmVwb3J0Iiwic3RhbmRhcmRTdGF0cyIsInRpbWVzdGFtcCIsIm5hbWVzIiwibWFrZU1hcFN0YXRzIiwic3VjY2Vzc0NhbGxiYWNrV3JhcHBlcl8iLCJwcm9taXNlIiwibmF0aXZlQWRkSWNlQ2FuZGlkYXRlIiwibmF2aWdhdG9yIiwiY29uc3RyYWludHNUb0Nocm9tZV8iLCJjYyIsImlkZWFsIiwiZXhhY3QiLCJtYXgiLCJvbGRuYW1lXyIsImNoYXJBdCIsIm9jIiwibWl4IiwiYWR2YW5jZWQiLCJzaGltQ29uc3RyYWludHNfIiwiY29uc3RyYWludHMiLCJmdW5jIiwiYXVkaW8iLCJyZW1hcCIsImIiLCJ2aWRlbyIsImZhY2UiLCJmYWNpbmdNb2RlIiwiZ2V0U3VwcG9ydGVkRmFjaW5nTW9kZUxpZXMiLCJtZWRpYURldmljZXMiLCJnZXRTdXBwb3J0ZWRDb25zdHJhaW50cyIsIm1hdGNoZXMiLCJlbnVtZXJhdGVEZXZpY2VzIiwiZGV2aWNlcyIsImQiLCJkZXYiLCJzb21lIiwibGFiZWwiLCJkZXZpY2VJZCIsInNoaW1FcnJvcl8iLCJQZXJtaXNzaW9uRGVuaWVkRXJyb3IiLCJQZXJtaXNzaW9uRGlzbWlzc2VkRXJyb3IiLCJEZXZpY2VzTm90Rm91bmRFcnJvciIsIkNvbnN0cmFpbnROb3RTYXRpc2ZpZWRFcnJvciIsIlRyYWNrU3RhcnRFcnJvciIsIk1lZGlhRGV2aWNlRmFpbGVkRHVlVG9TaHV0ZG93biIsIk1lZGlhRGV2aWNlS2lsbFN3aXRjaE9uIiwiVGFiQ2FwdHVyZUVycm9yIiwiU2NyZWVuQ2FwdHVyZUVycm9yIiwiRGV2aWNlQ2FwdHVyZUVycm9yIiwiY29uc3RyYWludCIsImNvbnN0cmFpbnROYW1lIiwiZ2V0VXNlck1lZGlhXyIsIm9uU3VjY2VzcyIsIm9uRXJyb3IiLCJ3ZWJraXRHZXRVc2VyTWVkaWEiLCJnZXRVc2VyTWVkaWEiLCJnZXRVc2VyTWVkaWFQcm9taXNlXyIsImtpbmRzIiwiTWVkaWFTdHJlYW1UcmFjayIsImdldFNvdXJjZXMiLCJkZXZpY2UiLCJncm91cElkIiwiZWNob0NhbmNlbGxhdGlvbiIsImZyYW1lUmF0ZSIsImhlaWdodCIsIndpZHRoIiwib3JpZ0dldFVzZXJNZWRpYSIsImNzIiwiTmF0aXZlUlRDSWNlQ2FuZGlkYXRlIiwibmF0aXZlQ2FuZGlkYXRlIiwicGFyc2VkQ2FuZGlkYXRlIiwiYXVnbWVudGVkQ2FuZGlkYXRlIiwibmF0aXZlQ3JlYXRlT2JqZWN0VVJMIiwibmF0aXZlUmV2b2tlT2JqZWN0VVJMIiwibmV3SWQiLCJkc2MiLCJuYXRpdmVTZXRBdHRyaWJ1dGUiLCJzZXRBdHRyaWJ1dGUiLCJSVENTY3RwVHJhbnNwb3J0IiwiX3NjdHAiLCJzY3RwSW5EZXNjcmlwdGlvbiIsIm1MaW5lIiwiZ2V0UmVtb3RlRmlyZWZveFZlcnNpb24iLCJnZXRDYW5TZW5kTWF4TWVzc2FnZVNpemUiLCJyZW1vdGVJc0ZpcmVmb3giLCJjYW5TZW5kTWF4TWVzc2FnZVNpemUiLCJnZXRNYXhNZXNzYWdlU2l6ZSIsIm1heE1lc3NhZ2VTaXplIiwiaXNGaXJlZm94IiwiY2FuU2VuZE1NUyIsInJlbW90ZU1NUyIsIk51bWJlciIsIlBPU0lUSVZFX0lORklOSVRZIiwic2N0cCIsIm9yaWdDcmVhdGVEYXRhQ2hhbm5lbCIsImNyZWF0ZURhdGFDaGFubmVsIiwiZGF0YUNoYW5uZWwiLCJvcmlnRGF0YUNoYW5uZWxTZW5kIiwiZGMiLCJzaXplIiwiYnl0ZUxlbmd0aCIsInNoaW1SVENQZWVyQ29ubmVjdGlvbiIsIm9yaWdNU1RFbmFibGVkIiwiZXYiLCJSVENEdG1mU2VuZGVyIiwiUlRDRFRNRlNlbmRlciIsInJlcGxhY2VUcmFjayIsInNldFRyYWNrIiwiUlRDVHJhY2tFdmVudCIsIm1velNyY09iamVjdCIsIm1velJUQ1BlZXJDb25uZWN0aW9uIiwibmV3U2VydmVyIiwibW96UlRDU2Vzc2lvbkRlc2NyaXB0aW9uIiwibW96UlRDSWNlQ2FuZGlkYXRlIiwibW9kZXJuU3RhdHNUeXBlcyIsIm5hdGl2ZUdldFN0YXRzIiwib25TdWNjIiwib25FcnIiLCJJbnRlcm5hbEVycm9yIiwiU2VjdXJpdHlFcnJvciIsImNvbnN0cmFpbnRzVG9GRjM3XyIsIm1vekdldFVzZXJNZWRpYSIsImluZm9zIiwib3JnRW51bWVyYXRlRGV2aWNlcyIsIm5hdGl2ZUdldFVzZXJNZWRpYSIsImdldFNldHRpbmdzIiwibmF0aXZlR2V0U2V0dGluZ3MiLCJhcHBseUNvbnN0cmFpbnRzIiwibmF0aXZlQXBwbHlDb25zdHJhaW50cyIsIl9sb2NhbFN0cmVhbXMiLCJnZXRTdHJlYW1CeUlkIiwiX3JlbW90ZVN0cmVhbXMiLCJfYWRkVHJhY2siLCJ0cmFja3MiLCJfb25hZGRzdHJlYW0iLCJfb25hZGRzdHJlYW1wb2x5IiwiZmFpbHVyZUNhbGxiYWNrIiwid2l0aENhbGxiYWNrIiwiY2IiLCJlcnJjYiIsIlJUQ1RyYW5zY2VpdmVyIiwib3JpZ0NyZWF0ZU9mZmVyIiwiYXVkaW9UcmFuc2NlaXZlciIsImdldFRyYW5zY2VpdmVycyIsInNldERpcmVjdGlvbiIsImFkZFRyYW5zY2VpdmVyIiwidmlkZW9UcmFuc2NlaXZlciIsImxvZ0Rpc2FibGVkXyIsImRlcHJlY2F0aW9uV2FybmluZ3NfIiwidWFzdHJpbmciLCJleHByIiwicG9zIiwiZXZlbnROYW1lVG9XcmFwIiwid3JhcHBlciIsInByb3RvIiwibmF0aXZlQWRkRXZlbnRMaXN0ZW5lciIsIm5hdGl2ZUV2ZW50TmFtZSIsIndyYXBwZWRDYWxsYmFjayIsIl9ldmVudE1hcCIsIm5hdGl2ZVJlbW92ZUV2ZW50TGlzdGVuZXIiLCJ1bndyYXBwZWRDYiIsImJvb2wiLCJvbGRNZXRob2QiLCJuZXdNZXRob2QiLCJ1c2VyQWdlbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7OztBQU1BLElBQU1BLFNBQVMsU0FBVEEsTUFBUyxD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RTtBQUN2REQsbUJBQU9RLE9BQVAsR0FBaUIsUUFBakI7QUFDQVIsbUJBQU9zYSxPQUFQLEdBQWlCK0IsZUFBZWlHLFVBQVU2SixTQUF6QixFQUNiLHNCQURhLEVBQ1csQ0FEWCxDQUFqQjtBQUVELFdBTE0sTUFLQTtBQUFFO0FBQ1Buc0IsbUJBQU9RLE9BQVAsR0FBaUIsMEJBQWpCO0FBQ0EsbUJBQU9SLE1BQVA7QUFDRDs7QUFFRCxpQkFBT0EsTUFBUDtBQUNEO0FBOUZjLE9BQWpCO0FBaUdDLEtBaExxQixFQWdMcEIsRUFoTG9CLENBOXBKb3hCLEVBQTNiLEVBODBKeFcsRUE5MEp3VyxFQTgwSnJXLENBQUMsQ0FBRCxDQTkwSnFXLEVBODBKaFcsQ0E5MEpnVyxDQUFQO0FBKzBKdlcsQ0EvMEpELEUiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5XZWJSVENQcm92aWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gMTEuLlxyXG4gKi9cclxuaW1wb3J0IFByb3ZpZGVyIGZyb20gXCJhcGkvcHJvdmlkZXIvaHRtbDUvUHJvdmlkZXJcIjtcclxuaW1wb3J0IFdlYlJUQ0xvYWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9XZWJSVENMb2FkZXJcIjtcclxuaW1wb3J0IHtpc1dlYlJUQ30gZnJvbSBcInV0aWxzL3ZhbGlkYXRvclwiO1xyXG5pbXBvcnQge2Vycm9yVHJpZ2dlcn0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xyXG5pbXBvcnQge1BST1ZJREVSX1dFQlJUQywgU1RBVEVfSURMRSwgQ09OVEVOVF9NRVRBLCBTVEFURV9QTEFZSU5HfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIHdlYnJ0YyBwcm92aWRlciBleHRlbmRlZCBjb3JlLlxyXG4gKiBAcGFyYW0gICBjb250YWluZXIgcGxheWVyIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXHJcbiAqICovXHJcblxyXG5jb25zdCBXZWJSVEMgPSBmdW5jdGlvbihlbGVtZW50LCBwbGF5ZXJDb25maWcsIGFkVGFnVXJsKXtcclxuICAgIGxldCB0aGF0ID0ge307XHJcbiAgICBsZXQgd2VicnRjTG9hZGVyID0gbnVsbDtcclxuICAgIGxldCBzdXBlckRlc3Ryb3lfZnVuYyAgPSBudWxsO1xyXG5cclxuICAgIGxldCBzcGVjID0ge1xyXG4gICAgICAgIG5hbWUgOiBQUk9WSURFUl9XRUJSVEMsXHJcbiAgICAgICAgZWxlbWVudCA6IGVsZW1lbnQsXHJcbiAgICAgICAgbXNlIDogbnVsbCxcclxuICAgICAgICBsaXN0ZW5lciA6IG51bGwsXHJcbiAgICAgICAgaXNMb2FkZWQgOiBmYWxzZSxcclxuICAgICAgICBjYW5TZWVrIDogZmFsc2UsXHJcbiAgICAgICAgaXNMaXZlIDogZmFsc2UsXHJcbiAgICAgICAgc2Vla2luZyA6IGZhbHNlLFxyXG4gICAgICAgIHN0YXRlIDogU1RBVEVfSURMRSxcclxuICAgICAgICBidWZmZXIgOiAwLFxyXG4gICAgICAgIGZyYW1lcmF0ZSA6IDAsXHJcbiAgICAgICAgY3VycmVudFF1YWxpdHkgOiAtMSxcclxuICAgICAgICBjdXJyZW50U291cmNlIDogLTEsXHJcbiAgICAgICAgcXVhbGl0eUxldmVscyA6IFtdLFxyXG4gICAgICAgIHNvdXJjZXMgOiBbXSxcclxuICAgICAgICBhZFRhZ1VybCA6IGFkVGFnVXJsXHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQgPSBQcm92aWRlcihzcGVjLCBwbGF5ZXJDb25maWcsIGZ1bmN0aW9uKHNvdXJjZSl7XHJcbiAgICAgICAgaWYoaXNXZWJSVEMoc291cmNlLmZpbGUsIHNvdXJjZS50eXBlKSl7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldFQlJUQyA6IG9uQmVmb3JlTG9hZCA6IFwiLCBzb3VyY2UpO1xyXG4gICAgICAgICAgICBpZih3ZWJydGNMb2FkZXIpe1xyXG4gICAgICAgICAgICAgICAgd2VicnRjTG9hZGVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIHdlYnJ0Y0xvYWRlciA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBsb2FkQ2FsbGJhY2sgPSBmdW5jdGlvbihzdHJlYW0pe1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LnNyY09iamVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc3JjT2JqZWN0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnNyY09iamVjdCA9IHN0cmVhbTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHdlYnJ0Y0xvYWRlciA9IFdlYlJUQ0xvYWRlcih0aGF0LCBzb3VyY2UuZmlsZSwgbG9hZENhbGxiYWNrLCBlcnJvclRyaWdnZXIsIHBsYXllckNvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICB3ZWJydGNMb2FkZXIuY29ubmVjdChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgLy9Ub0RvIDogcmVzb2x2ZSBub3Qgd29ya3JpbmdcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgLy90aGF0LmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIC8vRG8gbm90aGluZ1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQub24oQ09OVEVOVF9NRVRBLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmICh0aGF0LmdldFN0YXRlKCkgIT09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGhhdC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCB0aGF0KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHN1cGVyRGVzdHJveV9mdW5jID0gdGhhdC5zdXBlcignZGVzdHJveScpO1xyXG5cclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldFQlJUQyBQUk9WSURFUiBMT0FERUQuXCIpO1xyXG5cclxuXHJcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcclxuICAgICAgICBpZih3ZWJydGNMb2FkZXIpe1xyXG4gICAgICAgICAgICB3ZWJydGNMb2FkZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICBlbGVtZW50LnNyY09iamVjdCA9IG51bGw7XHJcbiAgICAgICAgICAgIHdlYnJ0Y0xvYWRlciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoYXQub2ZmKENPTlRFTlRfTUVUQSwgbnVsbCwgdGhhdCk7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiV0VCUlRDIDogIFBST1ZJREVSIERFU1RST1lFRC5cIik7XHJcblxyXG4gICAgICAgIHN1cGVyRGVzdHJveV9mdW5jKCk7XHJcblxyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFdlYlJUQztcclxuIiwiaW1wb3J0IGFkYXB0ZXIgZnJvbSAndXRpbHMvYWRhcHRlcic7XHJcbmltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XHJcbmltcG9ydCB7YW5hbFVzZXJBZ2VudH0gZnJvbSBcInV0aWxzL2Jyb3dzZXJcIjtcclxuaW1wb3J0IHtcclxuICAgIEVSUk9SUyxcclxuICAgIFBMQVlFUl9XRUJSVENfV1NfRVJST1IsXHJcbiAgICBQTEFZRVJfV0VCUlRDX1dTX0NMT1NFRCxcclxuICAgIFBMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUixcclxuICAgIFBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SLFxyXG4gICAgUExBWUVSX1dFQlJUQ19DUkVBVEVfQU5TV0VSX0VSUk9SLFxyXG4gICAgUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUixcclxuICAgIFBMQVlFUl9XRUJSVENfTkVUV09SS19TTE9XLFxyXG4gICAgUExBWUVSX1dFQlJUQ19VTkVYUEVDVEVEX0RJU0NPTk5FQ1QsXHJcbiAgICBPTUVfUDJQX01PREVcclxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuXHJcbmNvbnN0IFdlYlJUQ0xvYWRlciA9IGZ1bmN0aW9uIChwcm92aWRlciwgd2ViU29ja2V0VXJsLCBsb2FkQ2FsbGJhY2ssIGVycm9yVHJpZ2dlciwgcGxheWVyQ29uZmlnKSB7XHJcblxyXG4gICAgbGV0IGRlZmF1bHRDb25uZWN0aW9uQ29uZmlnID0ge1xyXG4gICAgICAgICdpY2VTZXJ2ZXJzJzogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAndXJscyc6ICdzdHVuOnN0dW4ubC5nb29nbGUuY29tOjE5MzAyJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgdGhhdCA9IHt9O1xyXG5cclxuICAgIGxldCB3cyA9IG51bGw7XHJcblxyXG4gICAgbGV0IHdzUGluZyA9IG51bGw7XHJcblxyXG4gICAgbGV0IG1haW5TdHJlYW0gPSBudWxsO1xyXG5cclxuICAgIC8vIHVzZWQgZm9yIGdldHRpbmcgbWVkaWEgc3RyZWFtIGZyb20gT01FIG9yIGhvc3QgcGVlclxyXG4gICAgbGV0IG1haW5QZWVyQ29ubmVjdGlvbkluZm8gPSBudWxsO1xyXG5cclxuICAgIC8vIHVzZWQgZm9yIHNlbmQgbWVkaWEgc3RyZWFtIHRvIGNsaWVudCBwZWVyLlxyXG4gICAgbGV0IGNsaWVudFBlZXJDb25uZWN0aW9ucyA9IHt9O1xyXG5cclxuICAgIC8vY2xvc2VkIHdlYnNvY2tldCBieSBvbWUgb3IgY2xpZW50LlxyXG4gICAgbGV0IHdzQ2xvc2VkQnlQbGF5ZXIgPSBmYWxzZTtcclxuXHJcbiAgICBsZXQgcmVjb3J2ZXJQYWNrZXRMb3NzID0gdHJ1ZTtcclxuXHJcbiAgICBpZiAocGxheWVyQ29uZmlnLmdldENvbmZpZygpLndlYnJ0Y0NvbmZpZyAmJlxyXG4gICAgICAgIHBsYXllckNvbmZpZy5nZXRDb25maWcoKS53ZWJydGNDb25maWcucmVjb3J2ZXJQYWNrZXRMb3NzID09PSBmYWxzZSkge1xyXG5cclxuICAgICAgICByZWNvcnZlclBhY2tldExvc3MgPSBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkud2VicnRjQ29uZmlnLnJlY29ydmVyUGFja2V0TG9zcztcclxuICAgIH1cclxuXHJcbiAgICBsZXQgZ2VuZXJhdGVQdWJsaWNDYW5kaWRhdGUgPSB0cnVlO1xyXG5cclxuICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkud2VicnRjQ29uZmlnICYmXHJcbiAgICAgICAgcGxheWVyQ29uZmlnLmdldENvbmZpZygpLndlYnJ0Y0NvbmZpZy5nZW5lcmF0ZVB1YmxpY0NhbmRpZGF0ZSA9PT0gZmFsc2UpIHtcclxuXHJcbiAgICAgICAgZ2VuZXJhdGVQdWJsaWNDYW5kaWRhdGUgPSBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkud2VicnRjQ29uZmlnLmdlbmVyYXRlUHVibGljQ2FuZGlkYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBzdGF0aXN0aWNzVGltZXIgPSBudWxsO1xyXG5cclxuICAgIGxldCBjdXJyZW50QnJvd3NlciA9IGFuYWxVc2VyQWdlbnQoKTtcclxuXHJcbiAgICAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBleGlzdGluZ0hhbmRsZXIgPSB3aW5kb3cub25iZWZvcmV1bmxvYWQ7XHJcbiAgICAgICAgd2luZG93Lm9uYmVmb3JldW5sb2FkID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChleGlzdGluZ0hhbmRsZXIpIHtcclxuICAgICAgICAgICAgICAgIGV4aXN0aW5nSGFuZGxlcihldmVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVGhpcyBjYWxscyBhdXRvIHdoZW4gYnJvd3NlciBjbG9zZWQuXCIpO1xyXG4gICAgICAgICAgICBjbG9zZVBlZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldFBlZXJDb25uZWN0aW9uQnlJZChpZCkge1xyXG5cclxuICAgICAgICBsZXQgcGVlckNvbm5lY3Rpb24gPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAobWFpblBlZXJDb25uZWN0aW9uSW5mbyAmJiBpZCA9PT0gbWFpblBlZXJDb25uZWN0aW9uSW5mby5pZCkge1xyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbiA9IG1haW5QZWVyQ29ubmVjdGlvbkluZm8ucGVlckNvbm5lY3Rpb247XHJcbiAgICAgICAgfSBlbHNlIGlmIChjbGllbnRQZWVyQ29ubmVjdGlvbnNbaWRdKSB7XHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uID0gY2xpZW50UGVlckNvbm5lY3Rpb25zW2lkXS5wZWVyQ29ubmVjdGlvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBwZWVyQ29ubmVjdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBleHRyYWN0TG9zc1BhY2tldHNPbk5ldHdvcmtTdGF0dXMocGVlckNvbm5lY3Rpb25JbmZvKSB7XHJcblxyXG4gICAgICAgIGlmIChwZWVyQ29ubmVjdGlvbkluZm8uc3RhdGlzdGljc1RpbWVyKSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChwZWVyQ29ubmVjdGlvbkluZm8uc3RhdGlzdGljc1RpbWVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cykge1xyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzID0ge307XHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMubG9zdFBhY2tldHNBcnIgPSBbXTtcclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5zbG90TGVuZ3RoID0gODsgLy84IHN0YXRpc3RpY3MuIGV2ZXJ5IDIgc2Vjb25kc1xyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLnByZXZQYWNrZXRzTG9zdCA9IDA7XHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMuYXZnOExvc3NlcyA9IDA7XHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMuYXZnTW9yZVRoYW5UaHJlc2hvbGRDb3VudCA9IDA7ICAvL0lmIGF2ZzhMb3NzIG1vcmUgdGhhbiB0aHJlc2hvbGQuXHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMudGhyZXNob2xkID0gNDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbG9zdFBhY2tldHNBcnIgPSBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLmxvc3RQYWNrZXRzQXJyLFxyXG4gICAgICAgICAgICBzbG90TGVuZ3RoID0gcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5zbG90TGVuZ3RoLCAvLzggc3RhdGlzdGljcy4gZXZlcnkgMiBzZWNvbmRzXHJcbiAgICAgICAgICAgIHByZXZQYWNrZXRzTG9zdCA9IHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMucHJldlBhY2tldHNMb3N0LFxyXG4gICAgICAgICAgICBhdmc4TG9zc2VzID0gcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5hdmc4TG9zc2VzLFxyXG4gICAgICAgICAgICAvLyBhdmdNb3JlVGhhblRocmVzaG9sZENvdW50ID0gcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5hdmdNb3JlVGhhblRocmVzaG9sZENvdW50LCAgLy9JZiBhdmc4TG9zcyBtb3JlIHRoYW4gdGhyZXNob2xkLlxyXG4gICAgICAgICAgICB0aHJlc2hvbGQgPSBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLnRocmVzaG9sZDtcclxuXHJcbiAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXRpc3RpY3NUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIXBlZXJDb25uZWN0aW9uSW5mby5wZWVyQ29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkluZm8ucGVlckNvbm5lY3Rpb24uZ2V0U3RhdHMoKS50aGVuKGZ1bmN0aW9uIChzdGF0cykge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghc3RhdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRDb25maWcoKS5hdXRvRmFsbGJhY2sgJiYgc3RhdHMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHMuZm9yRWFjaChmdW5jdGlvbiAoc3RhdGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGF0ZS50eXBlID09PSBcImluYm91bmQtcnRwXCIgJiYgc3RhdGUua2luZCA9PT0gJ3ZpZGVvJyAmJiAhc3RhdGUuaXNSZW1vdGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyhzdGF0ZS5wYWNrZXRzTG9zdCAtIHByZXZQYWNrZXRzTG9zdCkgaXMgcmVhbCBjdXJyZW50IGxvc3QuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFjdHVhbFBhY2tldExvc3QgPSBwYXJzZUludChzdGF0ZS5wYWNrZXRzTG9zdCkgLSBwYXJzZUludChwcmV2UGFja2V0c0xvc3QpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvc3RQYWNrZXRzQXJyLnB1c2gocGFyc2VJbnQoc3RhdGUucGFja2V0c0xvc3QpIC0gcGFyc2VJbnQocHJldlBhY2tldHNMb3N0KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvc3RQYWNrZXRzQXJyLmxlbmd0aCA+IHNsb3RMZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9zdFBhY2tldHNBcnIuc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9zdFBhY2tldHNBcnIubGVuZ3RoID09PSBzbG90TGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF2ZzhMb3NzZXMgPSBfLnJlZHVjZShsb3N0UGFja2V0c0FyciwgZnVuY3Rpb24gKG1lbW8sIG51bSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWVtbyArIG51bTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAwKSAvIHNsb3RMZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGFzdDggTE9TVCBQQUNLRVQgQVZHICA6IFwiICsgKGF2ZzhMb3NzZXMpLCBcIkN1cnJlbnQgUGFja2V0IExPU1Q6IFwiICsgYWN0dWFsUGFja2V0TG9zdCwgXCJUb3RhbCBQYWNrZXQgTG9zdDogXCIgKyBzdGF0ZS5wYWNrZXRzTG9zdCwgbG9zdFBhY2tldHNBcnIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXZnOExvc3NlcyA+IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLmF2Z01vcmVUaGFuVGhyZXNob2xkQ291bnQgPSBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLmF2Z01vcmVUaGFuVGhyZXNob2xkQ291bnQgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5hdmdNb3JlVGhhblRocmVzaG9sZENvdW50ID49IDYwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJORVRXT1JLIFVOU1RBQkxFRCEhISBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9XRUJSVENfTkVUV09SS19TTE9XXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcih0ZW1wRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5hdmdNb3JlVGhhblRocmVzaG9sZENvdW50ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLnByZXZQYWNrZXRzTG9zdCA9IHN0YXRlLnBhY2tldHNMb3N0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGV4dHJhY3RMb3NzUGFja2V0c09uTmV0d29ya1N0YXR1cyhwZWVyQ29ubmVjdGlvbkluZm8pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSwgMjAwMCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZU1haW5QZWVyQ29ubmVjdGlvbihpZCwgcGVlcklkLCBzZHAsIGNhbmRpZGF0ZXMsIGljZVNlcnZlcnMsIHJlc29sdmUpIHtcclxuXHJcbiAgICAgICAgbGV0IHBlZXJDb25uZWN0aW9uQ29uZmlnID0ge307XHJcblxyXG4gICAgICAgIC8vIGZpcnN0IHByaW9yaXR5IHVzaW5nIGljZSBzZXJ2ZXJzIGZyb20gcGxheWVyIHNldHRpbmcuXHJcbiAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRDb25maWcoKS53ZWJydGNDb25maWcgJiYgcGxheWVyQ29uZmlnLmdldENvbmZpZygpLndlYnJ0Y0NvbmZpZy5pY2VTZXJ2ZXJzKSB7XHJcblxyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkNvbmZpZy5pY2VTZXJ2ZXJzID0gcGxheWVyQ29uZmlnLmdldENvbmZpZygpLndlYnJ0Y0NvbmZpZy5pY2VTZXJ2ZXJzO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRDb25maWcoKS53ZWJydGNDb25maWcuaWNlVHJhbnNwb3J0UG9saWN5KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25Db25maWcuaWNlVHJhbnNwb3J0UG9saWN5ID0gcGxheWVyQ29uZmlnLmdldENvbmZpZygpLndlYnJ0Y0NvbmZpZy5pY2VUcmFuc3BvcnRQb2xpY3k7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGljZVNlcnZlcnMpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIHNlY29uZCBwcmlvcml0eSB1c2luZyBpY2Ugc2VydmVycyBmcm9tIG9tZSBhbmQgZm9yY2UgdXNpbmcgVENQXHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uQ29uZmlnLmljZVNlcnZlcnMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaWNlU2VydmVycy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBpY2VTZXJ2ZXIgPSBpY2VTZXJ2ZXJzW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCByZWdJY2VTZXJ2ZXIgPSB7fTtcclxuXHJcbiAgICAgICAgICAgICAgICByZWdJY2VTZXJ2ZXIudXJscyA9IGljZVNlcnZlci51cmxzO1xyXG4gICAgICAgICAgICAgICAgcmVnSWNlU2VydmVyLnVzZXJuYW1lID0gaWNlU2VydmVyLnVzZXJfbmFtZTtcclxuICAgICAgICAgICAgICAgIHJlZ0ljZVNlcnZlci5jcmVkZW50aWFsID0gaWNlU2VydmVyLmNyZWRlbnRpYWw7XHJcblxyXG4gICAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25Db25maWcuaWNlU2VydmVycy5wdXNoKHJlZ0ljZVNlcnZlcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uQ29uZmlnLmljZVRyYW5zcG9ydFBvbGljeSA9ICdyZWxheSc7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAvLyBsYXN0IHByaW9yaXR5IHVzaW5nIGRlZmF1bHQgaWNlIHNlcnZlcnMuXHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uQ29uZmlnID0gZGVmYXVsdENvbm5lY3Rpb25Db25maWc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJtYWluIHBlZXIgY29ubmVjdGlvbiBjb25maWcgOiBcIiwgcGVlckNvbm5lY3Rpb25Db25maWcpO1xyXG5cclxuICAgICAgICBsZXQgcGVlckNvbm5lY3Rpb24gPSBuZXcgUlRDUGVlckNvbm5lY3Rpb24ocGVlckNvbm5lY3Rpb25Db25maWcpO1xyXG5cclxuICAgICAgICBtYWluUGVlckNvbm5lY3Rpb25JbmZvID0ge1xyXG4gICAgICAgICAgICBpZDogaWQsXHJcbiAgICAgICAgICAgIHBlZXJJZDogcGVlcklkLFxyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbjogcGVlckNvbm5lY3Rpb25cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL1NldCByZW1vdGUgZGVzY3JpcHRpb24gd2hlbiBJIHJlY2VpdmVkIHNkcCBmcm9tIHNlcnZlci5cclxuICAgICAgICBwZWVyQ29ubmVjdGlvbi5zZXRSZW1vdGVEZXNjcmlwdGlvbihuZXcgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKHNkcCkpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbi5jcmVhdGVBbnN3ZXIoKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkZXNjKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJjcmVhdGUgSG9zdCBBbnN3ZXIgOiBzdWNjZXNzXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24uc2V0TG9jYWxEZXNjcmlwdGlvbihkZXNjKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG15IFNEUCBjcmVhdGVkLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxvY2FsU0RQID0gcGVlckNvbm5lY3Rpb24ubG9jYWxEZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZygnTG9jYWwgU0RQJywgbG9jYWxTRFApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbmRNZXNzYWdlKHdzLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlZXJfaWQ6IHBlZXJJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kOiAnYW5zd2VyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZHA6IGxvY2FsU0RQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcih0ZW1wRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfV0VCUlRDX0NSRUFURV9BTlNXRVJfRVJST1JdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbUExBWUVSX1dFQlJUQ19TRVRfUkVNT1RFX0RFU0NfRVJST1JdO1xyXG4gICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChjYW5kaWRhdGVzKSB7XHJcblxyXG4gICAgICAgICAgICBhZGRJY2VDYW5kaWRhdGUocGVlckNvbm5lY3Rpb24sIGNhbmRpZGF0ZXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcGVlckNvbm5lY3Rpb24ub25pY2VjYW5kaWRhdGUgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAoZS5jYW5kaWRhdGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJXZWJSVENMb2FkZXIgc2VuZCBjYW5kaWRhdGUgdG8gc2VydmVyIDogXCIgKyBlLmNhbmRpZGF0ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ01haW4gUGVlciBDb25uZWN0aW9uIGNhbmRpZGF0ZScsIGUuY2FuZGlkYXRlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZW5kTWVzc2FnZSh3cywge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBpZCxcclxuICAgICAgICAgICAgICAgICAgICBwZWVyX2lkOiBwZWVySWQsXHJcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZDogXCJjYW5kaWRhdGVcIixcclxuICAgICAgICAgICAgICAgICAgICBjYW5kaWRhdGVzOiBbZS5jYW5kaWRhdGVdXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcGVlckNvbm5lY3Rpb24ub25jb25uZWN0aW9uc3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAvL2ljZUNvbm5lY3Rpb25TdGF0ZVxyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJbb24gY29ubmVjdGlvbiBzdGF0ZSBjaGFuZ2VdXCIsIHBlZXJDb25uZWN0aW9uLmNvbm5lY3Rpb25TdGF0ZSwgZSk7XHJcblxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcGVlckNvbm5lY3Rpb24ub25pY2Vjb25uZWN0aW9uc3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJbb24gaWNlIGNvbm5lY3Rpb24gc3RhdGUgY2hhbmdlXVwiLCBwZWVyQ29ubmVjdGlvbi5pY2VDb25uZWN0aW9uU3RhdGUsIGUpO1xyXG5cclxuICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvUlRDUGVlckNvbm5lY3Rpb24vaWNlQ29ubmVjdGlvblN0YXRlXHJcbiAgICAgICAgICAgICogQ2hlY2tzIHRvIGVuc3VyZSB0aGF0IGNvbXBvbmVudHMgYXJlIHN0aWxsIGNvbm5lY3RlZCBmYWlsZWQgZm9yIGF0IGxlYXN0IG9uZSBjb21wb25lbnQgb2YgdGhlIFJUQ1BlZXJDb25uZWN0aW9uLiBUaGlzIGlzIGEgbGVzcyBzdHJpbmdlbnQgdGVzdCB0aGFuIFwiZmFpbGVkXCIgYW5kIG1heSB0cmlnZ2VyIGludGVybWl0dGVudGx5IGFuZCByZXNvbHZlIGp1c3QgYXMgc3BvbnRhbmVvdXNseSBvbiBsZXNzIHJlbGlhYmxlIG5ldHdvcmtzLCBvciBkdXJpbmcgdGVtcG9yYXJ5IGRpc2Nvbm5lY3Rpb25zLiBXaGVuIHRoZSBwcm9ibGVtIHJlc29sdmVzLCB0aGUgY29ubmVjdGlvbiBtYXkgcmV0dXJuIHRvIHRoZSBcImNvbm5lY3RlZFwiIHN0YXRlLlxyXG4gICAgICAgICAgICAqICovXHJcbiAgICAgICAgICAgIC8vVGhpcyBwcm9jZXNzIGlzIG15IGltYWdpbmF0aW9uLiBJIGRvIG5vdCBrbm93IGhvdyB0byByZXByb2R1Y2UuXHJcbiAgICAgICAgICAgIC8vU2l0dWF0aW9uIDogT01FIGlzIGRlYWQgYnV0IG9tZSBjYW4ndCBzZW5kICdzdG9wJyBtZXNzYWdlLlxyXG4gICAgICAgICAgICBpZiAocGVlckNvbm5lY3Rpb24uaWNlQ29ubmVjdGlvblN0YXRlID09PSAnZGlzY29ubmVjdGVkJyB8fCBwZWVyQ29ubmVjdGlvbi5pY2VDb25uZWN0aW9uU3RhdGUgPT09ICdjbG9zZWQnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXdzQ2xvc2VkQnlQbGF5ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWFpblBlZXJDb25uZWN0aW9uSW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9XRUJSVENfVU5FWFBFQ1RFRF9ESVNDT05ORUNUXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBwZWVyQ29ubmVjdGlvbi5vbnRyYWNrID0gZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcInN0cmVhbSByZWNlaXZlZC5cIik7XHJcblxyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coJ1JlY292ZXJ5IE9uIFBhY2tldCBMb3NzIDonLCByZWNvcnZlclBhY2tldExvc3MpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlY29ydmVyUGFja2V0TG9zcykge1xyXG4gICAgICAgICAgICAgICAgZXh0cmFjdExvc3NQYWNrZXRzT25OZXR3b3JrU3RhdHVzKG1haW5QZWVyQ29ubmVjdGlvbkluZm8pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBtYWluU3RyZWFtID0gZS5zdHJlYW1zWzBdO1xyXG4gICAgICAgICAgICBsb2FkQ2FsbGJhY2soZS5zdHJlYW1zWzBdKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkud2VicnRjQ29uZmlnICYmIHBsYXllckNvbmZpZy5nZXRDb25maWcoKS53ZWJydGNDb25maWcucGxheW91dERlbGF5SGludCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBoaW50ID0gcGxheWVyQ29uZmlnLmdldENvbmZpZygpLndlYnJ0Y0NvbmZpZy5wbGF5b3V0RGVsYXlIaW50O1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlY2VpdmVycyA9IG1haW5QZWVyQ29ubmVjdGlvbkluZm8ucGVlckNvbm5lY3Rpb24uZ2V0UmVjZWl2ZXJzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZWNlaXZlcnMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlY2VpdmVyID0gcmVjZWl2ZXJzW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZWNlaXZlci5wbGF5b3V0RGVsYXlIaW50ID0gaGludDtcclxuICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJXZWJSVEMgcGxheW91dERlbGF5SGludFwiLCByZWNlaXZlciwgaGludCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVDbGllbnRQZWVyQ29ubmVjdGlvbihob3N0SWQsIGNsaWVudElkKSB7XHJcblxyXG4gICAgICAgIGlmICghbWFpblN0cmVhbSkge1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY3JlYXRlQ2xpZW50UGVlckNvbm5lY3Rpb24oaG9zdElkLCBjbGllbnRJZCk7XHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcGVlckNvbm5lY3Rpb24gPSBuZXcgUlRDUGVlckNvbm5lY3Rpb24oZGVmYXVsdENvbm5lY3Rpb25Db25maWcpO1xyXG5cclxuICAgICAgICBjbGllbnRQZWVyQ29ubmVjdGlvbnNbY2xpZW50SWRdID0ge1xyXG4gICAgICAgICAgICBpZDogY2xpZW50SWQsXHJcbiAgICAgICAgICAgIHBlZXJJZDogaG9zdElkLFxyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbjogcGVlckNvbm5lY3Rpb25cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBwZWVyQ29ubmVjdGlvbi5hZGRTdHJlYW0obWFpblN0cmVhbSk7XHJcblxyXG4gICAgICAgIC8vIGxldCBvZmZlck9wdGlvbiA9IHtcclxuICAgICAgICAvLyAgICAgb2ZmZXJUb1JlY2VpdmVBdWRpbzogMSxcclxuICAgICAgICAvLyAgICAgb2ZmZXJUb1JlY2VpdmVWaWRlbzogMVxyXG4gICAgICAgIC8vIH07XHJcblxyXG4gICAgICAgIHBlZXJDb25uZWN0aW9uLmNyZWF0ZU9mZmVyKHNldExvY2FsQW5kU2VuZE1lc3NhZ2UsIGhhbmRsZUNyZWF0ZU9mZmVyRXJyb3IsIHt9KTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2V0TG9jYWxBbmRTZW5kTWVzc2FnZShzZXNzaW9uRGVzY3JpcHRpb24pIHtcclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24uc2V0TG9jYWxEZXNjcmlwdGlvbihzZXNzaW9uRGVzY3JpcHRpb24pO1xyXG5cclxuICAgICAgICAgICAgc2VuZE1lc3NhZ2Uod3MsIHtcclxuICAgICAgICAgICAgICAgIGlkOiBob3N0SWQsXHJcbiAgICAgICAgICAgICAgICBwZWVyX2lkOiBjbGllbnRJZCxcclxuICAgICAgICAgICAgICAgIHNkcDogc2Vzc2lvbkRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgY29tbWFuZDogJ29mZmVyX3AycCdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVDcmVhdGVPZmZlckVycm9yKGV2ZW50KSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcGVlckNvbm5lY3Rpb24ub25pY2VjYW5kaWRhdGUgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAoZS5jYW5kaWRhdGUpIHtcclxuICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldlYlJUQ0xvYWRlciBzZW5kIGNhbmRpZGF0ZSB0byBzZXJ2ZXIgOiBcIiArIGUuY2FuZGlkYXRlKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ0NsaWVudCBQZWVyIENvbm5lY3Rpb24gY2FuZGlkYXRlJywgZS5jYW5kaWRhdGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbmRNZXNzYWdlKHdzLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGhvc3RJZCxcclxuICAgICAgICAgICAgICAgICAgICBwZWVyX2lkOiBjbGllbnRJZCxcclxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kOiBcImNhbmRpZGF0ZV9wMnBcIixcclxuICAgICAgICAgICAgICAgICAgICBjYW5kaWRhdGVzOiBbZS5jYW5kaWRhdGVdXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBjb3B5Q2FuZGlkYXRlID0gZnVuY3Rpb24gKGJhc2ljQ2FuZGlkYXRlKSB7XHJcblxyXG4gICAgICAgIGxldCBjbG9uZUNhbmRpZGF0ZSA9IF8uY2xvbmUoYmFzaWNDYW5kaWRhdGUpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZW5lcmF0ZURvbWFpbkZyb21VcmwodXJsKSB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSAnJztcclxuICAgICAgICAgICAgbGV0IG1hdGNoO1xyXG4gICAgICAgICAgICBpZiAobWF0Y2ggPSB1cmwubWF0Y2goL14oPzp3c3M/OlxcL1xcLyk/KD86W15AXFxuXStAKT8oPzp3d3dcXC4pPyhbXjpcXC9cXG5cXD9cXD1dKykvaW0pKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBtYXRjaFsxXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZmluZElwKGNhbmRpZGF0ZSkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9ICcnO1xyXG4gICAgICAgICAgICBsZXQgbWF0Y2g7XHJcblxyXG4gICAgICAgICAgICBpZiAobWF0Y2ggPSBjYW5kaWRhdGUubWF0Y2gobmV3IFJlZ0V4cChcIlxcXFxiKDI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPylcXFxcLigyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT8pXFxcXC4oMjVbMC01XXwyWzAtNF1bMC05XXxbMDFdP1swLTldWzAtOV0/KVxcXFwuKDI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPylcXFxcYlwiLCAnZ2knKSkpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG1hdGNoWzBdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG5ld0RvbWFpbiA9IGdlbmVyYXRlRG9tYWluRnJvbVVybCh3ZWJTb2NrZXRVcmwpO1xyXG4gICAgICAgIGxldCBpcCA9IGZpbmRJcChjbG9uZUNhbmRpZGF0ZS5jYW5kaWRhdGUpO1xyXG5cclxuICAgICAgICBpZiAoaXAgPT09ICcnIHx8IGlwID09PSBuZXdEb21haW4pIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIGZpcmVmb3ggYnJvd3NlciB0aHJvd3MgYSBjYW5kaWRhdGUgcGFyc2luZyBleGNlcHRpb24gd2hlbiBhIGRvbWFpbiBuYW1lIGlzIHNldCBhdCB0aGUgYWRkcmVzcyBwcm9wZXJ0eS4gU28gd2UgcmVzb2x2ZSB0aGUgZG5zIHVzaW5nIGdvb2dsZSBkbnMgcmVzb2x2ZSBhcGkuXHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50QnJvd3Nlci5icm93c2VyID09PSAnRmlyZWZveCcgJiYgIWZpbmRJcChuZXdEb21haW4pKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgZmV0Y2goJ2h0dHBzOi8vZG5zLmdvb2dsZS5jb20vcmVzb2x2ZT9uYW1lPScgKyBuZXdEb21haW4pXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzcCA9PiByZXNwLmpzb24oKSlcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEuQW5zd2VyICYmIGRhdGEuQW5zd2VyLmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5BbnN3ZXJbMF0uZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVsc29sdmVkSXAgPSBkYXRhLkFuc3dlclswXS5kYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9uZUNhbmRpZGF0ZS5jYW5kaWRhdGUgPSBjbG9uZUNhbmRpZGF0ZS5jYW5kaWRhdGUucmVwbGFjZShpcCwgcmVsc29sdmVkSXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoY2xvbmVDYW5kaWRhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY2xvbmVDYW5kaWRhdGUuY2FuZGlkYXRlID0gY2xvbmVDYW5kaWRhdGUuY2FuZGlkYXRlLnJlcGxhY2UoaXAsIG5ld0RvbWFpbik7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKGNsb25lQ2FuZGlkYXRlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkSWNlQ2FuZGlkYXRlKHBlZXJDb25uZWN0aW9uLCBjYW5kaWRhdGVzKSB7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FuZGlkYXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoY2FuZGlkYXRlc1tpXSAmJiBjYW5kaWRhdGVzW2ldLmNhbmRpZGF0ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBiYXNpY0NhbmRpZGF0ZSA9IGNhbmRpZGF0ZXNbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24uYWRkSWNlQ2FuZGlkYXRlKG5ldyBSVENJY2VDYW5kaWRhdGUoYmFzaWNDYW5kaWRhdGUpKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJhZGRJY2VDYW5kaWRhdGUgOiBzdWNjZXNzXCIpO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfV0VCUlRDX0FERF9JQ0VDQU5ESURBVEVfRVJST1JdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcih0ZW1wRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGdlbmVyYXRlUHVibGljQ2FuZGlkYXRlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjbG9uZUNhbmRpZGF0ZVByb21pc2UgPSBjb3B5Q2FuZGlkYXRlKGJhc2ljQ2FuZGlkYXRlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsb25lQ2FuZGlkYXRlUHJvbWlzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9uZUNhbmRpZGF0ZVByb21pc2UudGhlbihmdW5jdGlvbiAoY2xvbmVDYW5kaWRhdGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xvbmVDYW5kaWRhdGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24uYWRkSWNlQ2FuZGlkYXRlKG5ldyBSVENJY2VDYW5kaWRhdGUoY2xvbmVDYW5kaWRhdGUpKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiY2xvbmVkIGFkZEljZUNhbmRpZGF0ZSA6IHN1Y2Nlc3NcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfV0VCUlRDX0FERF9JQ0VDQU5ESURBVEVfRVJST1JdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0V2ViU29ja2V0KHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICB0cnkge1xyXG5cclxuICAgICAgICAgICAgd3MgPSBuZXcgV2ViU29ja2V0KHdlYlNvY2tldFVybCk7XHJcblxyXG4gICAgICAgICAgICB3cy5vbm9wZW4gPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgc2VuZE1lc3NhZ2Uod3MsIHtcclxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kOiBcInJlcXVlc3Rfb2ZmZXJcIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gd3NQaW5nID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgIC8vICAgICBzZW5kTWVzc2FnZSh3cywge2NvbW1hbmQ6IFwicGluZ1wifSk7XHJcbiAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgLy8gfSwgMjAgKiAxMDAwKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHdzLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IEpTT04ucGFyc2UoZS5kYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbUExBWUVSX1dFQlJUQ19XU19FUlJPUl07XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gbWVzc2FnZS5lcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKG1lc3NhZ2UpLmxlbmd0aCA9PT0gMCAmJiBtZXNzYWdlLmNvbnN0cnVjdG9yID09PSBPYmplY3QpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKCdFbXB0eSBNZXNzYWdlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLmNvbW1hbmQgPT09ICdwaW5nJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZW5kTWVzc2FnZSh3cywge2NvbW1hbmQ6ICdwb25nJ30pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIW1lc3NhZ2UuaWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKCdJRCBtdXN0IGJlIG5vdCBudWxsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLmNvbW1hbmQgPT09ICdvZmZlcicpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlTWFpblBlZXJDb25uZWN0aW9uKG1lc3NhZ2UuaWQsIG1lc3NhZ2UucGVlcl9pZCwgbWVzc2FnZS5zZHAsIG1lc3NhZ2UuY2FuZGlkYXRlcywgbWVzc2FnZS5pY2Vfc2VydmVycywgcmVzb2x2ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UucGVlcl9pZCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlci50cmlnZ2VyKE9NRV9QMlBfTU9ERSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoT01FX1AyUF9NT0RFLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UuY29tbWFuZCA9PT0gJ3JlcXVlc3Rfb2ZmZXJfcDJwJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVDbGllbnRQZWVyQ29ubmVjdGlvbihtZXNzYWdlLmlkLCBtZXNzYWdlLnBlZXJfaWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLmNvbW1hbmQgPT09ICdhbnN3ZXJfcDJwJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGVlckNvbm5lY3Rpb24xID0gZ2V0UGVlckNvbm5lY3Rpb25CeUlkKG1lc3NhZ2UucGVlcl9pZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uMS5zZXRSZW1vdGVEZXNjcmlwdGlvbihuZXcgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKG1lc3NhZ2Uuc2RwKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRlc2MpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbUExBWUVSX1dFQlJUQ19TRVRfUkVNT1RFX0RFU0NfRVJST1JdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UuY29tbWFuZCA9PT0gJ2NhbmRpZGF0ZScpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2FuZGlkYXRlcyBmb3IgbmV3IGNsaWVudCBwZWVyXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBlZXJDb25uZWN0aW9uMiA9IGdldFBlZXJDb25uZWN0aW9uQnlJZChtZXNzYWdlLmlkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYWRkSWNlQ2FuZGlkYXRlKHBlZXJDb25uZWN0aW9uMiwgbWVzc2FnZS5jYW5kaWRhdGVzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5jb21tYW5kID09PSAnY2FuZGlkYXRlX3AycCcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2FuZGlkYXRlcyBmb3IgbmV3IGNsaWVudCBwZWVyXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBlZXJDb25uZWN0aW9uMyA9IGdldFBlZXJDb25uZWN0aW9uQnlJZChtZXNzYWdlLnBlZXJfaWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBhZGRJY2VDYW5kaWRhdGUocGVlckNvbm5lY3Rpb24zLCBtZXNzYWdlLmNhbmRpZGF0ZXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLmNvbW1hbmQgPT09ICdzdG9wJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAobWFpblBlZXJDb25uZWN0aW9uSW5mby5wZWVySWQgPT09IG1lc3NhZ2UucGVlcl9pZCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9NeSBwYXJlbnQgd2FzIGRlYWQuIEFuZCB0aGVuIEkgd2lsbCByZXRyeS5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNsb3NlIGNvbm5lY3Rpb24gd2l0aCBob3N0IGFuZCByZXRyeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnY2xvc2UgY29ubmVjdGlvbiB3aXRoIGhvc3QnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5TdHJlYW0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluUGVlckNvbm5lY3Rpb25JbmZvLnBlZXJDb25uZWN0aW9uLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5QZWVyQ29ubmVjdGlvbkluZm8gPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXNldENhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLnBhdXNlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZW5kTWVzc2FnZSh3cywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZDogJ3JlcXVlc3Rfb2ZmZXInXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2xvc2UgY29ubmVjdGlvbiB3aXRoIGNsaWVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xpZW50UGVlckNvbm5lY3Rpb25zW21lc3NhZ2UucGVlcl9pZF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdjbG9zZSBjb25uZWN0aW9uIHdpdGggY2xpZW50OiAnLCBtZXNzYWdlLnBlZXJfaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50UGVlckNvbm5lY3Rpb25zW21lc3NhZ2UucGVlcl9pZF0ucGVlckNvbm5lY3Rpb24uY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjbGllbnRQZWVyQ29ubmVjdGlvbnNbbWVzc2FnZS5wZWVyX2lkXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgd3Mub25jbG9zZSA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXdzQ2xvc2VkQnlQbGF5ZXIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfV0VCUlRDX1dTX0VSUk9SXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1haW5QZWVyQ29ubmVjdGlvbkluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9XRUJSVENfVU5FWFBFQ1RFRF9ESVNDT05ORUNUXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcih0ZW1wRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgd3Mub25lcnJvciA9IGZ1bmN0aW9uIChlcnJvcikge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vV2h5IEVkZ2UgQnJvd3NlciBjYWxscyBvbmVycm9yKCkgd2hlbiB3cy5jbG9zZSgpP1xyXG4gICAgICAgICAgICAgICAgaWYgKCF3c0Nsb3NlZEJ5UGxheWVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfV0VCUlRDX1dTX0VSUk9SXTtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG5cclxuICAgICAgICAgICAgY2xvc2VQZWVyKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiV2ViUlRDTG9hZGVyIGNvbm5lY3RpbmcuLi5cIik7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJXZWJSVENMb2FkZXIgdXJsIDogXCIgKyB3ZWJTb2NrZXRVcmwpO1xyXG5cclxuICAgICAgICAgICAgaW5pdFdlYlNvY2tldChyZXNvbHZlLCByZWplY3QpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlUGVlcihlcnJvcikge1xyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coJ1dlYlJUQyBMb2FkZXIgY2xvc2VQZWVyKCknKTtcclxuXHJcbiAgICAgICAgaWYgKCFlcnJvcikge1xyXG4gICAgICAgICAgICB3c0Nsb3NlZEJ5UGxheWVyID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChtYWluUGVlckNvbm5lY3Rpb25JbmZvKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAobWFpblBlZXJDb25uZWN0aW9uSW5mby5zdGF0aXN0aWNzVGltZXIpIHtcclxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChtYWluUGVlckNvbm5lY3Rpb25JbmZvLnN0YXRpc3RpY3NUaW1lcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG1haW5TdHJlYW0gPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKCdDbG9zaW5nIG1haW4gcGVlciBjb25uZWN0aW9uLi4uJyk7XHJcbiAgICAgICAgICAgIGlmIChzdGF0aXN0aWNzVGltZXIpIHtcclxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChzdGF0aXN0aWNzVGltZXIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobWFpblBlZXJDb25uZWN0aW9uSW5mby5wZWVyQ29ubmVjdGlvbikge1xyXG5cclxuICAgICAgICAgICAgICAgIG1haW5QZWVyQ29ubmVjdGlvbkluZm8ucGVlckNvbm5lY3Rpb24uY2xvc2UoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbWFpblBlZXJDb25uZWN0aW9uSW5mby5wZWVyQ29ubmVjdGlvbiA9IG51bGw7XHJcbiAgICAgICAgICAgIG1haW5QZWVyQ29ubmVjdGlvbkluZm8gPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGNsaWVudFBlZXJDb25uZWN0aW9ucykubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgY2xpZW50SWQgaW4gY2xpZW50UGVlckNvbm5lY3Rpb25zKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGNsaWVudFBlZXJDb25uZWN0aW9uID0gY2xpZW50UGVlckNvbm5lY3Rpb25zW2NsaWVudElkXS5wZWVyQ29ubmVjdGlvbjtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2xpZW50UGVlckNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coJ0Nsb3NpbmcgY2xpZW50IHBlZXIgY29ubmVjdGlvbi4uLicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsaWVudFBlZXJDb25uZWN0aW9uLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xpZW50UGVlckNvbm5lY3Rpb24gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjbGllbnRQZWVyQ29ubmVjdGlvbnMgPSB7fTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwod3NQaW5nKTtcclxuICAgICAgICB3c1BpbmcgPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAod3MpIHtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKCdDbG9zaW5nIHdlYnNvY2tldCBjb25uZWN0aW9uLi4uJyk7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlNlbmQgU2lnbmFsaW5nIDogU3RvcC5cIik7XHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgIDAgKENPTk5FQ1RJTkcpXHJcbiAgICAgICAgICAgIDEgKE9QRU4pXHJcbiAgICAgICAgICAgIDIgKENMT1NJTkcpXHJcbiAgICAgICAgICAgIDMgKENMT1NFRClcclxuICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgaWYgKHdzLnJlYWR5U3RhdGUgPT09IDAgfHwgd3MucmVhZHlTdGF0ZSA9PT0gMSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHdzQ2xvc2VkQnlQbGF5ZXIgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtYWluUGVlckNvbm5lY3Rpb25JbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VuZE1lc3NhZ2Uod3MsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZDogJ3N0b3AnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogbWFpblBlZXJDb25uZWN0aW9uSW5mby5pZFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHdzLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd3NDbG9zZWRCeVBsYXllciA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd3MgPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgZXJyb3JUcmlnZ2VyKGVycm9yLCBwcm92aWRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNlbmRNZXNzYWdlKHdzLCBtZXNzYWdlKSB7XHJcblxyXG4gICAgICAgIGlmICh3cykge1xyXG4gICAgICAgICAgICB3cy5zZW5kKEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHRoYXQuY29ubmVjdCA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gaW5pdGlhbGl6ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PiB7XHJcbiAgICAgICAgY2xvc2VQZWVyKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgV2ViUlRDTG9hZGVyO1xyXG4iLCIoZnVuY3Rpb24oZil7aWYodHlwZW9mIGV4cG9ydHM9PT1cIm9iamVjdFwiJiZ0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIil7bW9kdWxlLmV4cG9ydHM9ZigpfWVsc2UgaWYodHlwZW9mIGRlZmluZT09PVwiZnVuY3Rpb25cIiYmZGVmaW5lLmFtZCl7ZGVmaW5lKFtdLGYpfWVsc2V7dmFyIGc7aWYodHlwZW9mIHdpbmRvdyE9PVwidW5kZWZpbmVkXCIpe2c9d2luZG93fWVsc2UgaWYodHlwZW9mIGdsb2JhbCE9PVwidW5kZWZpbmVkXCIpe2c9Z2xvYmFsfWVsc2UgaWYodHlwZW9mIHNlbGYhPT1cInVuZGVmaW5lZFwiKXtnPXNlbGZ9ZWxzZXtnPXRoaXN9Zy5hZGFwdGVyID0gZigpfX0pKGZ1bmN0aW9uKCl7dmFyIGRlZmluZSxtb2R1bGUsZXhwb3J0cztyZXR1cm4gKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG4vKlxyXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE3IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKlxyXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxyXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXHJcbiAqICB0cmVlLlxyXG4gKi9cclxuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG52YXIgU0RQVXRpbHMgPSByZXF1aXJlKCdzZHAnKTtcclxuXHJcbmZ1bmN0aW9uIHdyaXRlTWVkaWFTZWN0aW9uKHRyYW5zY2VpdmVyLCBjYXBzLCB0eXBlLCBzdHJlYW0sIGR0bHNSb2xlKSB7XHJcbiAgdmFyIHNkcCA9IFNEUFV0aWxzLndyaXRlUnRwRGVzY3JpcHRpb24odHJhbnNjZWl2ZXIua2luZCwgY2Fwcyk7XHJcblxyXG4gIC8vIE1hcCBJQ0UgcGFyYW1ldGVycyAodWZyYWcsIHB3ZCkgdG8gU0RQLlxyXG4gIHNkcCArPSBTRFBVdGlscy53cml0ZUljZVBhcmFtZXRlcnMoXHJcbiAgICAgIHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyLmdldExvY2FsUGFyYW1ldGVycygpKTtcclxuXHJcbiAgLy8gTWFwIERUTFMgcGFyYW1ldGVycyB0byBTRFAuXHJcbiAgc2RwICs9IFNEUFV0aWxzLndyaXRlRHRsc1BhcmFtZXRlcnMoXHJcbiAgICAgIHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQuZ2V0TG9jYWxQYXJhbWV0ZXJzKCksXHJcbiAgICAgIHR5cGUgPT09ICdvZmZlcicgPyAnYWN0cGFzcycgOiBkdGxzUm9sZSB8fCAnYWN0aXZlJyk7XHJcblxyXG4gIHNkcCArPSAnYT1taWQ6JyArIHRyYW5zY2VpdmVyLm1pZCArICdcXHJcXG4nO1xyXG5cclxuICBpZiAodHJhbnNjZWl2ZXIucnRwU2VuZGVyICYmIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyKSB7XHJcbiAgICBzZHAgKz0gJ2E9c2VuZHJlY3ZcXHJcXG4nO1xyXG4gIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIucnRwU2VuZGVyKSB7XHJcbiAgICBzZHAgKz0gJ2E9c2VuZG9ubHlcXHJcXG4nO1xyXG4gIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIpIHtcclxuICAgIHNkcCArPSAnYT1yZWN2b25seVxcclxcbic7XHJcbiAgfSBlbHNlIHtcclxuICAgIHNkcCArPSAnYT1pbmFjdGl2ZVxcclxcbic7XHJcbiAgfVxyXG5cclxuICBpZiAodHJhbnNjZWl2ZXIucnRwU2VuZGVyKSB7XHJcbiAgICB2YXIgdHJhY2tJZCA9IHRyYW5zY2VpdmVyLnJ0cFNlbmRlci5faW5pdGlhbFRyYWNrSWQgfHxcclxuICAgICAgICB0cmFuc2NlaXZlci5ydHBTZW5kZXIudHJhY2suaWQ7XHJcbiAgICB0cmFuc2NlaXZlci5ydHBTZW5kZXIuX2luaXRpYWxUcmFja0lkID0gdHJhY2tJZDtcclxuICAgIC8vIHNwZWMuXHJcbiAgICB2YXIgbXNpZCA9ICdtc2lkOicgKyAoc3RyZWFtID8gc3RyZWFtLmlkIDogJy0nKSArICcgJyArXHJcbiAgICAgICAgdHJhY2tJZCArICdcXHJcXG4nO1xyXG4gICAgc2RwICs9ICdhPScgKyBtc2lkO1xyXG4gICAgLy8gZm9yIENocm9tZS4gTGVnYWN5IHNob3VsZCBubyBsb25nZXIgYmUgcmVxdWlyZWQuXHJcbiAgICBzZHAgKz0gJ2E9c3NyYzonICsgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjICtcclxuICAgICAgICAnICcgKyBtc2lkO1xyXG5cclxuICAgIC8vIFJUWFxyXG4gICAgaWYgKHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4KSB7XHJcbiAgICAgIHNkcCArPSAnYT1zc3JjOicgKyB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eC5zc3JjICtcclxuICAgICAgICAgICcgJyArIG1zaWQ7XHJcbiAgICAgIHNkcCArPSAnYT1zc3JjLWdyb3VwOkZJRCAnICtcclxuICAgICAgICAgIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYyArICcgJyArXHJcbiAgICAgICAgICB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eC5zc3JjICtcclxuICAgICAgICAgICdcXHJcXG4nO1xyXG4gICAgfVxyXG4gIH1cclxuICAvLyBGSVhNRTogdGhpcyBzaG91bGQgYmUgd3JpdHRlbiBieSB3cml0ZVJ0cERlc2NyaXB0aW9uLlxyXG4gIHNkcCArPSAnYT1zc3JjOicgKyB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmMgK1xyXG4gICAgICAnIGNuYW1lOicgKyBTRFBVdGlscy5sb2NhbENOYW1lICsgJ1xcclxcbic7XHJcbiAgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlciAmJiB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCkge1xyXG4gICAgc2RwICs9ICdhPXNzcmM6JyArIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4LnNzcmMgK1xyXG4gICAgICAgICcgY25hbWU6JyArIFNEUFV0aWxzLmxvY2FsQ05hbWUgKyAnXFxyXFxuJztcclxuICB9XHJcbiAgcmV0dXJuIHNkcDtcclxufVxyXG5cclxuLy8gRWRnZSBkb2VzIG5vdCBsaWtlXHJcbi8vIDEpIHN0dW46IGZpbHRlcmVkIGFmdGVyIDE0MzkzIHVubGVzcyA/dHJhbnNwb3J0PXVkcCBpcyBwcmVzZW50XHJcbi8vIDIpIHR1cm46IHRoYXQgZG9lcyBub3QgaGF2ZSBhbGwgb2YgdHVybjpob3N0OnBvcnQ/dHJhbnNwb3J0PXVkcFxyXG4vLyAzKSB0dXJuOiB3aXRoIGlwdjYgYWRkcmVzc2VzXHJcbi8vIDQpIHR1cm46IG9jY3VycmluZyBtdWxpcGxlIHRpbWVzXHJcbmZ1bmN0aW9uIGZpbHRlckljZVNlcnZlcnMoaWNlU2VydmVycywgZWRnZVZlcnNpb24pIHtcclxuICB2YXIgaGFzVHVybiA9IGZhbHNlO1xyXG4gIGljZVNlcnZlcnMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGljZVNlcnZlcnMpKTtcclxuICByZXR1cm4gaWNlU2VydmVycy5maWx0ZXIoZnVuY3Rpb24oc2VydmVyKSB7XHJcbiAgICBpZiAoc2VydmVyICYmIChzZXJ2ZXIudXJscyB8fCBzZXJ2ZXIudXJsKSkge1xyXG4gICAgICB2YXIgdXJscyA9IHNlcnZlci51cmxzIHx8IHNlcnZlci51cmw7XHJcbiAgICAgIGlmIChzZXJ2ZXIudXJsICYmICFzZXJ2ZXIudXJscykge1xyXG4gICAgICAgIGNvbnNvbGUud2FybignUlRDSWNlU2VydmVyLnVybCBpcyBkZXByZWNhdGVkISBVc2UgdXJscyBpbnN0ZWFkLicpO1xyXG4gICAgICB9XHJcbiAgICAgIHZhciBpc1N0cmluZyA9IHR5cGVvZiB1cmxzID09PSAnc3RyaW5nJztcclxuICAgICAgaWYgKGlzU3RyaW5nKSB7XHJcbiAgICAgICAgdXJscyA9IFt1cmxzXTtcclxuICAgICAgfVxyXG4gICAgICB1cmxzID0gdXJscy5maWx0ZXIoZnVuY3Rpb24odXJsKSB7XHJcbiAgICAgICAgdmFyIHZhbGlkVHVybiA9IHVybC5pbmRleE9mKCd0dXJuOicpID09PSAwICYmXHJcbiAgICAgICAgICAgIHVybC5pbmRleE9mKCd0cmFuc3BvcnQ9dWRwJykgIT09IC0xICYmXHJcbiAgICAgICAgICAgIHVybC5pbmRleE9mKCd0dXJuOlsnKSA9PT0gLTEgJiZcclxuICAgICAgICAgICAgIWhhc1R1cm47XHJcblxyXG4gICAgICAgIGlmICh2YWxpZFR1cm4pIHtcclxuICAgICAgICAgIGhhc1R1cm4gPSB0cnVlO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1cmwuaW5kZXhPZignc3R1bjonKSA9PT0gMCAmJiBlZGdlVmVyc2lvbiA+PSAxNDM5MyAmJlxyXG4gICAgICAgICAgICB1cmwuaW5kZXhPZignP3RyYW5zcG9ydD11ZHAnKSA9PT0gLTE7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgZGVsZXRlIHNlcnZlci51cmw7XHJcbiAgICAgIHNlcnZlci51cmxzID0gaXNTdHJpbmcgPyB1cmxzWzBdIDogdXJscztcclxuICAgICAgcmV0dXJuICEhdXJscy5sZW5ndGg7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8vIERldGVybWluZXMgdGhlIGludGVyc2VjdGlvbiBvZiBsb2NhbCBhbmQgcmVtb3RlIGNhcGFiaWxpdGllcy5cclxuZnVuY3Rpb24gZ2V0Q29tbW9uQ2FwYWJpbGl0aWVzKGxvY2FsQ2FwYWJpbGl0aWVzLCByZW1vdGVDYXBhYmlsaXRpZXMpIHtcclxuICB2YXIgY29tbW9uQ2FwYWJpbGl0aWVzID0ge1xyXG4gICAgY29kZWNzOiBbXSxcclxuICAgIGhlYWRlckV4dGVuc2lvbnM6IFtdLFxyXG4gICAgZmVjTWVjaGFuaXNtczogW11cclxuICB9O1xyXG5cclxuICB2YXIgZmluZENvZGVjQnlQYXlsb2FkVHlwZSA9IGZ1bmN0aW9uKHB0LCBjb2RlY3MpIHtcclxuICAgIHB0ID0gcGFyc2VJbnQocHQsIDEwKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29kZWNzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChjb2RlY3NbaV0ucGF5bG9hZFR5cGUgPT09IHB0IHx8XHJcbiAgICAgICAgICBjb2RlY3NbaV0ucHJlZmVycmVkUGF5bG9hZFR5cGUgPT09IHB0KSB7XHJcbiAgICAgICAgcmV0dXJuIGNvZGVjc1tpXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHZhciBydHhDYXBhYmlsaXR5TWF0Y2hlcyA9IGZ1bmN0aW9uKGxSdHgsIHJSdHgsIGxDb2RlY3MsIHJDb2RlY3MpIHtcclxuICAgIHZhciBsQ29kZWMgPSBmaW5kQ29kZWNCeVBheWxvYWRUeXBlKGxSdHgucGFyYW1ldGVycy5hcHQsIGxDb2RlY3MpO1xyXG4gICAgdmFyIHJDb2RlYyA9IGZpbmRDb2RlY0J5UGF5bG9hZFR5cGUoclJ0eC5wYXJhbWV0ZXJzLmFwdCwgckNvZGVjcyk7XHJcbiAgICByZXR1cm4gbENvZGVjICYmIHJDb2RlYyAmJlxyXG4gICAgICAgIGxDb2RlYy5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IHJDb2RlYy5uYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgfTtcclxuXHJcbiAgbG9jYWxDYXBhYmlsaXRpZXMuY29kZWNzLmZvckVhY2goZnVuY3Rpb24obENvZGVjKSB7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlbW90ZUNhcGFiaWxpdGllcy5jb2RlY3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdmFyIHJDb2RlYyA9IHJlbW90ZUNhcGFiaWxpdGllcy5jb2RlY3NbaV07XHJcbiAgICAgIGlmIChsQ29kZWMubmFtZS50b0xvd2VyQ2FzZSgpID09PSByQ29kZWMubmFtZS50b0xvd2VyQ2FzZSgpICYmXHJcbiAgICAgICAgICBsQ29kZWMuY2xvY2tSYXRlID09PSByQ29kZWMuY2xvY2tSYXRlKSB7XHJcbiAgICAgICAgaWYgKGxDb2RlYy5uYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdydHgnICYmXHJcbiAgICAgICAgICAgIGxDb2RlYy5wYXJhbWV0ZXJzICYmIHJDb2RlYy5wYXJhbWV0ZXJzLmFwdCkge1xyXG4gICAgICAgICAgLy8gZm9yIFJUWCB3ZSBuZWVkIHRvIGZpbmQgdGhlIGxvY2FsIHJ0eCB0aGF0IGhhcyBhIGFwdFxyXG4gICAgICAgICAgLy8gd2hpY2ggcG9pbnRzIHRvIHRoZSBzYW1lIGxvY2FsIGNvZGVjIGFzIHRoZSByZW1vdGUgb25lLlxyXG4gICAgICAgICAgaWYgKCFydHhDYXBhYmlsaXR5TWF0Y2hlcyhsQ29kZWMsIHJDb2RlYyxcclxuICAgICAgICAgICAgICBsb2NhbENhcGFiaWxpdGllcy5jb2RlY3MsIHJlbW90ZUNhcGFiaWxpdGllcy5jb2RlY3MpKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByQ29kZWMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHJDb2RlYykpOyAvLyBkZWVwY29weVxyXG4gICAgICAgIC8vIG51bWJlciBvZiBjaGFubmVscyBpcyB0aGUgaGlnaGVzdCBjb21tb24gbnVtYmVyIG9mIGNoYW5uZWxzXHJcbiAgICAgICAgckNvZGVjLm51bUNoYW5uZWxzID0gTWF0aC5taW4obENvZGVjLm51bUNoYW5uZWxzLFxyXG4gICAgICAgICAgICByQ29kZWMubnVtQ2hhbm5lbHMpO1xyXG4gICAgICAgIC8vIHB1c2ggckNvZGVjIHNvIHdlIHJlcGx5IHdpdGggb2ZmZXJlciBwYXlsb2FkIHR5cGVcclxuICAgICAgICBjb21tb25DYXBhYmlsaXRpZXMuY29kZWNzLnB1c2gockNvZGVjKTtcclxuXHJcbiAgICAgICAgLy8gZGV0ZXJtaW5lIGNvbW1vbiBmZWVkYmFjayBtZWNoYW5pc21zXHJcbiAgICAgICAgckNvZGVjLnJ0Y3BGZWVkYmFjayA9IHJDb2RlYy5ydGNwRmVlZGJhY2suZmlsdGVyKGZ1bmN0aW9uKGZiKSB7XHJcbiAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGxDb2RlYy5ydGNwRmVlZGJhY2subGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgaWYgKGxDb2RlYy5ydGNwRmVlZGJhY2tbal0udHlwZSA9PT0gZmIudHlwZSAmJlxyXG4gICAgICAgICAgICAgICAgbENvZGVjLnJ0Y3BGZWVkYmFja1tqXS5wYXJhbWV0ZXIgPT09IGZiLnBhcmFtZXRlcikge1xyXG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gRklYTUU6IGFsc28gbmVlZCB0byBkZXRlcm1pbmUgLnBhcmFtZXRlcnNcclxuICAgICAgICAvLyAgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9vcGVucGVlci9vcnRjL2lzc3Vlcy81NjlcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICBsb2NhbENhcGFiaWxpdGllcy5oZWFkZXJFeHRlbnNpb25zLmZvckVhY2goZnVuY3Rpb24obEhlYWRlckV4dGVuc2lvbikge1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZW1vdGVDYXBhYmlsaXRpZXMuaGVhZGVyRXh0ZW5zaW9ucy5sZW5ndGg7XHJcbiAgICAgICAgIGkrKykge1xyXG4gICAgICB2YXIgckhlYWRlckV4dGVuc2lvbiA9IHJlbW90ZUNhcGFiaWxpdGllcy5oZWFkZXJFeHRlbnNpb25zW2ldO1xyXG4gICAgICBpZiAobEhlYWRlckV4dGVuc2lvbi51cmkgPT09IHJIZWFkZXJFeHRlbnNpb24udXJpKSB7XHJcbiAgICAgICAgY29tbW9uQ2FwYWJpbGl0aWVzLmhlYWRlckV4dGVuc2lvbnMucHVzaChySGVhZGVyRXh0ZW5zaW9uKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyBGSVhNRTogZmVjTWVjaGFuaXNtc1xyXG4gIHJldHVybiBjb21tb25DYXBhYmlsaXRpZXM7XHJcbn1cclxuXHJcbi8vIGlzIGFjdGlvbj1zZXRMb2NhbERlc2NyaXB0aW9uIHdpdGggdHlwZSBhbGxvd2VkIGluIHNpZ25hbGluZ1N0YXRlXHJcbmZ1bmN0aW9uIGlzQWN0aW9uQWxsb3dlZEluU2lnbmFsaW5nU3RhdGUoYWN0aW9uLCB0eXBlLCBzaWduYWxpbmdTdGF0ZSkge1xyXG4gIHJldHVybiB7XHJcbiAgICBvZmZlcjoge1xyXG4gICAgICBzZXRMb2NhbERlc2NyaXB0aW9uOiBbJ3N0YWJsZScsICdoYXZlLWxvY2FsLW9mZmVyJ10sXHJcbiAgICAgIHNldFJlbW90ZURlc2NyaXB0aW9uOiBbJ3N0YWJsZScsICdoYXZlLXJlbW90ZS1vZmZlciddXHJcbiAgICB9LFxyXG4gICAgYW5zd2VyOiB7XHJcbiAgICAgIHNldExvY2FsRGVzY3JpcHRpb246IFsnaGF2ZS1yZW1vdGUtb2ZmZXInLCAnaGF2ZS1sb2NhbC1wcmFuc3dlciddLFxyXG4gICAgICBzZXRSZW1vdGVEZXNjcmlwdGlvbjogWydoYXZlLWxvY2FsLW9mZmVyJywgJ2hhdmUtcmVtb3RlLXByYW5zd2VyJ11cclxuICAgIH1cclxuICB9W3R5cGVdW2FjdGlvbl0uaW5kZXhPZihzaWduYWxpbmdTdGF0ZSkgIT09IC0xO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYXliZUFkZENhbmRpZGF0ZShpY2VUcmFuc3BvcnQsIGNhbmRpZGF0ZSkge1xyXG4gIC8vIEVkZ2UncyBpbnRlcm5hbCByZXByZXNlbnRhdGlvbiBhZGRzIHNvbWUgZmllbGRzIHRoZXJlZm9yZVxyXG4gIC8vIG5vdCBhbGwgZmllbGTRlSBhcmUgdGFrZW4gaW50byBhY2NvdW50LlxyXG4gIHZhciBhbHJlYWR5QWRkZWQgPSBpY2VUcmFuc3BvcnQuZ2V0UmVtb3RlQ2FuZGlkYXRlcygpXHJcbiAgICAgIC5maW5kKGZ1bmN0aW9uKHJlbW90ZUNhbmRpZGF0ZSkge1xyXG4gICAgICAgIHJldHVybiBjYW5kaWRhdGUuZm91bmRhdGlvbiA9PT0gcmVtb3RlQ2FuZGlkYXRlLmZvdW5kYXRpb24gJiZcclxuICAgICAgICAgICAgY2FuZGlkYXRlLmlwID09PSByZW1vdGVDYW5kaWRhdGUuaXAgJiZcclxuICAgICAgICAgICAgY2FuZGlkYXRlLnBvcnQgPT09IHJlbW90ZUNhbmRpZGF0ZS5wb3J0ICYmXHJcbiAgICAgICAgICAgIGNhbmRpZGF0ZS5wcmlvcml0eSA9PT0gcmVtb3RlQ2FuZGlkYXRlLnByaW9yaXR5ICYmXHJcbiAgICAgICAgICAgIGNhbmRpZGF0ZS5wcm90b2NvbCA9PT0gcmVtb3RlQ2FuZGlkYXRlLnByb3RvY29sICYmXHJcbiAgICAgICAgICAgIGNhbmRpZGF0ZS50eXBlID09PSByZW1vdGVDYW5kaWRhdGUudHlwZTtcclxuICAgICAgfSk7XHJcbiAgaWYgKCFhbHJlYWR5QWRkZWQpIHtcclxuICAgIGljZVRyYW5zcG9ydC5hZGRSZW1vdGVDYW5kaWRhdGUoY2FuZGlkYXRlKTtcclxuICB9XHJcbiAgcmV0dXJuICFhbHJlYWR5QWRkZWQ7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBtYWtlRXJyb3IobmFtZSwgZGVzY3JpcHRpb24pIHtcclxuICB2YXIgZSA9IG5ldyBFcnJvcihkZXNjcmlwdGlvbik7XHJcbiAgZS5uYW1lID0gbmFtZTtcclxuICAvLyBsZWdhY3kgZXJyb3IgY29kZXMgZnJvbSBodHRwczovL2hleWNhbS5naXRodWIuaW8vd2ViaWRsLyNpZGwtRE9NRXhjZXB0aW9uLWVycm9yLW5hbWVzXHJcbiAgZS5jb2RlID0ge1xyXG4gICAgTm90U3VwcG9ydGVkRXJyb3I6IDksXHJcbiAgICBJbnZhbGlkU3RhdGVFcnJvcjogMTEsXHJcbiAgICBJbnZhbGlkQWNjZXNzRXJyb3I6IDE1LFxyXG4gICAgVHlwZUVycm9yOiB1bmRlZmluZWQsXHJcbiAgICBPcGVyYXRpb25FcnJvcjogdW5kZWZpbmVkXHJcbiAgfVtuYW1lXTtcclxuICByZXR1cm4gZTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih3aW5kb3csIGVkZ2VWZXJzaW9uKSB7XHJcbiAgLy8gaHR0cHM6Ly93M2MuZ2l0aHViLmlvL21lZGlhY2FwdHVyZS1tYWluLyNtZWRpYXN0cmVhbVxyXG4gIC8vIEhlbHBlciBmdW5jdGlvbiB0byBhZGQgdGhlIHRyYWNrIHRvIHRoZSBzdHJlYW0gYW5kXHJcbiAgLy8gZGlzcGF0Y2ggdGhlIGV2ZW50IG91cnNlbHZlcy5cclxuICBmdW5jdGlvbiBhZGRUcmFja1RvU3RyZWFtQW5kRmlyZUV2ZW50KHRyYWNrLCBzdHJlYW0pIHtcclxuICAgIHN0cmVhbS5hZGRUcmFjayh0cmFjayk7XHJcbiAgICBzdHJlYW0uZGlzcGF0Y2hFdmVudChuZXcgd2luZG93Lk1lZGlhU3RyZWFtVHJhY2tFdmVudCgnYWRkdHJhY2snLFxyXG4gICAgICAgIHt0cmFjazogdHJhY2t9KSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZW1vdmVUcmFja0Zyb21TdHJlYW1BbmRGaXJlRXZlbnQodHJhY2ssIHN0cmVhbSkge1xyXG4gICAgc3RyZWFtLnJlbW92ZVRyYWNrKHRyYWNrKTtcclxuICAgIHN0cmVhbS5kaXNwYXRjaEV2ZW50KG5ldyB3aW5kb3cuTWVkaWFTdHJlYW1UcmFja0V2ZW50KCdyZW1vdmV0cmFjaycsXHJcbiAgICAgICAge3RyYWNrOiB0cmFja30pKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGZpcmVBZGRUcmFjayhwYywgdHJhY2ssIHJlY2VpdmVyLCBzdHJlYW1zKSB7XHJcbiAgICB2YXIgdHJhY2tFdmVudCA9IG5ldyBFdmVudCgndHJhY2snKTtcclxuICAgIHRyYWNrRXZlbnQudHJhY2sgPSB0cmFjaztcclxuICAgIHRyYWNrRXZlbnQucmVjZWl2ZXIgPSByZWNlaXZlcjtcclxuICAgIHRyYWNrRXZlbnQudHJhbnNjZWl2ZXIgPSB7cmVjZWl2ZXI6IHJlY2VpdmVyfTtcclxuICAgIHRyYWNrRXZlbnQuc3RyZWFtcyA9IHN0cmVhbXM7XHJcbiAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgcGMuX2Rpc3BhdGNoRXZlbnQoJ3RyYWNrJywgdHJhY2tFdmVudCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHZhciBSVENQZWVyQ29ubmVjdGlvbiA9IGZ1bmN0aW9uKGNvbmZpZykge1xyXG4gICAgdmFyIHBjID0gdGhpcztcclxuXHJcbiAgICB2YXIgX2V2ZW50VGFyZ2V0ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG4gICAgWydhZGRFdmVudExpc3RlbmVyJywgJ3JlbW92ZUV2ZW50TGlzdGVuZXInLCAnZGlzcGF0Y2hFdmVudCddXHJcbiAgICAgICAgLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XHJcbiAgICAgICAgICBwY1ttZXRob2RdID0gX2V2ZW50VGFyZ2V0W21ldGhvZF0uYmluZChfZXZlbnRUYXJnZXQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIHRoaXMuY2FuVHJpY2tsZUljZUNhbmRpZGF0ZXMgPSBudWxsO1xyXG5cclxuICAgIHRoaXMubmVlZE5lZ290aWF0aW9uID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5sb2NhbFN0cmVhbXMgPSBbXTtcclxuICAgIHRoaXMucmVtb3RlU3RyZWFtcyA9IFtdO1xyXG5cclxuICAgIHRoaXMubG9jYWxEZXNjcmlwdGlvbiA9IG51bGw7XHJcbiAgICB0aGlzLnJlbW90ZURlc2NyaXB0aW9uID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLnNpZ25hbGluZ1N0YXRlID0gJ3N0YWJsZSc7XHJcbiAgICB0aGlzLmljZUNvbm5lY3Rpb25TdGF0ZSA9ICduZXcnO1xyXG4gICAgdGhpcy5jb25uZWN0aW9uU3RhdGUgPSAnbmV3JztcclxuICAgIHRoaXMuaWNlR2F0aGVyaW5nU3RhdGUgPSAnbmV3JztcclxuXHJcbiAgICBjb25maWcgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGNvbmZpZyB8fCB7fSkpO1xyXG5cclxuICAgIHRoaXMudXNpbmdCdW5kbGUgPSBjb25maWcuYnVuZGxlUG9saWN5ID09PSAnbWF4LWJ1bmRsZSc7XHJcbiAgICBpZiAoY29uZmlnLnJ0Y3BNdXhQb2xpY3kgPT09ICduZWdvdGlhdGUnKSB7XHJcbiAgICAgIHRocm93KG1ha2VFcnJvcignTm90U3VwcG9ydGVkRXJyb3InLFxyXG4gICAgICAgICAgJ3J0Y3BNdXhQb2xpY3kgXFwnbmVnb3RpYXRlXFwnIGlzIG5vdCBzdXBwb3J0ZWQnKSk7XHJcbiAgICB9IGVsc2UgaWYgKCFjb25maWcucnRjcE11eFBvbGljeSkge1xyXG4gICAgICBjb25maWcucnRjcE11eFBvbGljeSA9ICdyZXF1aXJlJztcclxuICAgIH1cclxuXHJcbiAgICBzd2l0Y2ggKGNvbmZpZy5pY2VUcmFuc3BvcnRQb2xpY3kpIHtcclxuICAgICAgY2FzZSAnYWxsJzpcclxuICAgICAgY2FzZSAncmVsYXknOlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGNvbmZpZy5pY2VUcmFuc3BvcnRQb2xpY3kgPSAnYWxsJztcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICBzd2l0Y2ggKGNvbmZpZy5idW5kbGVQb2xpY3kpIHtcclxuICAgICAgY2FzZSAnYmFsYW5jZWQnOlxyXG4gICAgICBjYXNlICdtYXgtY29tcGF0JzpcclxuICAgICAgY2FzZSAnbWF4LWJ1bmRsZSc6XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgY29uZmlnLmJ1bmRsZVBvbGljeSA9ICdiYWxhbmNlZCc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgY29uZmlnLmljZVNlcnZlcnMgPSBmaWx0ZXJJY2VTZXJ2ZXJzKGNvbmZpZy5pY2VTZXJ2ZXJzIHx8IFtdLCBlZGdlVmVyc2lvbik7XHJcblxyXG4gICAgdGhpcy5faWNlR2F0aGVyZXJzID0gW107XHJcbiAgICBpZiAoY29uZmlnLmljZUNhbmRpZGF0ZVBvb2xTaXplKSB7XHJcbiAgICAgIGZvciAodmFyIGkgPSBjb25maWcuaWNlQ2FuZGlkYXRlUG9vbFNpemU7IGkgPiAwOyBpLS0pIHtcclxuICAgICAgICB0aGlzLl9pY2VHYXRoZXJlcnMucHVzaChuZXcgd2luZG93LlJUQ0ljZUdhdGhlcmVyKHtcclxuICAgICAgICAgIGljZVNlcnZlcnM6IGNvbmZpZy5pY2VTZXJ2ZXJzLFxyXG4gICAgICAgICAgZ2F0aGVyUG9saWN5OiBjb25maWcuaWNlVHJhbnNwb3J0UG9saWN5XHJcbiAgICAgICAgfSkpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25maWcuaWNlQ2FuZGlkYXRlUG9vbFNpemUgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcclxuXHJcbiAgICAvLyBwZXItdHJhY2sgaWNlR2F0aGVycywgaWNlVHJhbnNwb3J0cywgZHRsc1RyYW5zcG9ydHMsIHJ0cFNlbmRlcnMsIC4uLlxyXG4gICAgLy8gZXZlcnl0aGluZyB0aGF0IGlzIG5lZWRlZCB0byBkZXNjcmliZSBhIFNEUCBtLWxpbmUuXHJcbiAgICB0aGlzLnRyYW5zY2VpdmVycyA9IFtdO1xyXG5cclxuICAgIHRoaXMuX3NkcFNlc3Npb25JZCA9IFNEUFV0aWxzLmdlbmVyYXRlU2Vzc2lvbklkKCk7XHJcbiAgICB0aGlzLl9zZHBTZXNzaW9uVmVyc2lvbiA9IDA7XHJcblxyXG4gICAgdGhpcy5fZHRsc1JvbGUgPSB1bmRlZmluZWQ7IC8vIHJvbGUgZm9yIGE9c2V0dXAgdG8gdXNlIGluIGFuc3dlcnMuXHJcblxyXG4gICAgdGhpcy5faXNDbG9zZWQgPSBmYWxzZTtcclxuICB9O1xyXG5cclxuICAvLyBzZXQgdXAgZXZlbnQgaGFuZGxlcnMgb24gcHJvdG90eXBlXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9uaWNlY2FuZGlkYXRlID0gbnVsbDtcclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub25hZGRzdHJlYW0gPSBudWxsO1xyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5vbnRyYWNrID0gbnVsbDtcclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub25yZW1vdmVzdHJlYW0gPSBudWxsO1xyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5vbnNpZ25hbGluZ3N0YXRlY2hhbmdlID0gbnVsbDtcclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub25pY2Vjb25uZWN0aW9uc3RhdGVjaGFuZ2UgPSBudWxsO1xyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5vbmNvbm5lY3Rpb25zdGF0ZWNoYW5nZSA9IG51bGw7XHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9uaWNlZ2F0aGVyaW5nc3RhdGVjaGFuZ2UgPSBudWxsO1xyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5vbm5lZ290aWF0aW9ubmVlZGVkID0gbnVsbDtcclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub25kYXRhY2hhbm5lbCA9IG51bGw7XHJcblxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fZGlzcGF0Y2hFdmVudCA9IGZ1bmN0aW9uKG5hbWUsIGV2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5faXNDbG9zZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuICAgIGlmICh0eXBlb2YgdGhpc1snb24nICsgbmFtZV0gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgdGhpc1snb24nICsgbmFtZV0oZXZlbnQpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fZW1pdEdhdGhlcmluZ1N0YXRlQ2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ2ljZWdhdGhlcmluZ3N0YXRlY2hhbmdlJyk7XHJcbiAgICB0aGlzLl9kaXNwYXRjaEV2ZW50KCdpY2VnYXRoZXJpbmdzdGF0ZWNoYW5nZScsIGV2ZW50KTtcclxuICB9O1xyXG5cclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0Q29uZmlndXJhdGlvbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcclxuICB9O1xyXG5cclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0TG9jYWxTdHJlYW1zID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sb2NhbFN0cmVhbXM7XHJcbiAgfTtcclxuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFJlbW90ZVN0cmVhbXMgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLnJlbW90ZVN0cmVhbXM7XHJcbiAgfTtcclxuXHJcbiAgLy8gaW50ZXJuYWwgaGVscGVyIHRvIGNyZWF0ZSBhIHRyYW5zY2VpdmVyIG9iamVjdC5cclxuICAvLyAod2hpY2ggaXMgbm90IHlldCB0aGUgc2FtZSBhcyB0aGUgV2ViUlRDIDEuMCB0cmFuc2NlaXZlcilcclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX2NyZWF0ZVRyYW5zY2VpdmVyID0gZnVuY3Rpb24oa2luZCwgZG9Ob3RBZGQpIHtcclxuICAgIHZhciBoYXNCdW5kbGVUcmFuc3BvcnQgPSB0aGlzLnRyYW5zY2VpdmVycy5sZW5ndGggPiAwO1xyXG4gICAgdmFyIHRyYW5zY2VpdmVyID0ge1xyXG4gICAgICB0cmFjazogbnVsbCxcclxuICAgICAgaWNlR2F0aGVyZXI6IG51bGwsXHJcbiAgICAgIGljZVRyYW5zcG9ydDogbnVsbCxcclxuICAgICAgZHRsc1RyYW5zcG9ydDogbnVsbCxcclxuICAgICAgbG9jYWxDYXBhYmlsaXRpZXM6IG51bGwsXHJcbiAgICAgIHJlbW90ZUNhcGFiaWxpdGllczogbnVsbCxcclxuICAgICAgcnRwU2VuZGVyOiBudWxsLFxyXG4gICAgICBydHBSZWNlaXZlcjogbnVsbCxcclxuICAgICAga2luZDoga2luZCxcclxuICAgICAgbWlkOiBudWxsLFxyXG4gICAgICBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzOiBudWxsLFxyXG4gICAgICByZWN2RW5jb2RpbmdQYXJhbWV0ZXJzOiBudWxsLFxyXG4gICAgICBzdHJlYW06IG51bGwsXHJcbiAgICAgIGFzc29jaWF0ZWRSZW1vdGVNZWRpYVN0cmVhbXM6IFtdLFxyXG4gICAgICB3YW50UmVjZWl2ZTogdHJ1ZVxyXG4gICAgfTtcclxuICAgIGlmICh0aGlzLnVzaW5nQnVuZGxlICYmIGhhc0J1bmRsZVRyYW5zcG9ydCkge1xyXG4gICAgICB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQgPSB0aGlzLnRyYW5zY2VpdmVyc1swXS5pY2VUcmFuc3BvcnQ7XHJcbiAgICAgIHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQgPSB0aGlzLnRyYW5zY2VpdmVyc1swXS5kdGxzVHJhbnNwb3J0O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIHRyYW5zcG9ydHMgPSB0aGlzLl9jcmVhdGVJY2VBbmREdGxzVHJhbnNwb3J0cygpO1xyXG4gICAgICB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQgPSB0cmFuc3BvcnRzLmljZVRyYW5zcG9ydDtcclxuICAgICAgdHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydCA9IHRyYW5zcG9ydHMuZHRsc1RyYW5zcG9ydDtcclxuICAgIH1cclxuICAgIGlmICghZG9Ob3RBZGQpIHtcclxuICAgICAgdGhpcy50cmFuc2NlaXZlcnMucHVzaCh0cmFuc2NlaXZlcik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJhbnNjZWl2ZXI7XHJcbiAgfTtcclxuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFRyYWNrID0gZnVuY3Rpb24odHJhY2ssIHN0cmVhbSkge1xyXG4gICAgaWYgKHRoaXMuX2lzQ2xvc2VkKSB7XHJcbiAgICAgIHRocm93IG1ha2VFcnJvcignSW52YWxpZFN0YXRlRXJyb3InLFxyXG4gICAgICAgICAgJ0F0dGVtcHRlZCB0byBjYWxsIGFkZFRyYWNrIG9uIGEgY2xvc2VkIHBlZXJjb25uZWN0aW9uLicpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBhbHJlYWR5RXhpc3RzID0gdGhpcy50cmFuc2NlaXZlcnMuZmluZChmdW5jdGlvbihzKSB7XHJcbiAgICAgIHJldHVybiBzLnRyYWNrID09PSB0cmFjaztcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChhbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgIHRocm93IG1ha2VFcnJvcignSW52YWxpZEFjY2Vzc0Vycm9yJywgJ1RyYWNrIGFscmVhZHkgZXhpc3RzLicpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciB0cmFuc2NlaXZlcjtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50cmFuc2NlaXZlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKCF0aGlzLnRyYW5zY2VpdmVyc1tpXS50cmFjayAmJlxyXG4gICAgICAgICAgdGhpcy50cmFuc2NlaXZlcnNbaV0ua2luZCA9PT0gdHJhY2sua2luZCkge1xyXG4gICAgICAgIHRyYW5zY2VpdmVyID0gdGhpcy50cmFuc2NlaXZlcnNbaV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICghdHJhbnNjZWl2ZXIpIHtcclxuICAgICAgdHJhbnNjZWl2ZXIgPSB0aGlzLl9jcmVhdGVUcmFuc2NlaXZlcih0cmFjay5raW5kKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9tYXliZUZpcmVOZWdvdGlhdGlvbk5lZWRlZCgpO1xyXG5cclxuICAgIGlmICh0aGlzLmxvY2FsU3RyZWFtcy5pbmRleE9mKHN0cmVhbSkgPT09IC0xKSB7XHJcbiAgICAgIHRoaXMubG9jYWxTdHJlYW1zLnB1c2goc3RyZWFtKTtcclxuICAgIH1cclxuXHJcbiAgICB0cmFuc2NlaXZlci50cmFjayA9IHRyYWNrO1xyXG4gICAgdHJhbnNjZWl2ZXIuc3RyZWFtID0gc3RyZWFtO1xyXG4gICAgdHJhbnNjZWl2ZXIucnRwU2VuZGVyID0gbmV3IHdpbmRvdy5SVENSdHBTZW5kZXIodHJhY2ssXHJcbiAgICAgICAgdHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydCk7XHJcbiAgICByZXR1cm4gdHJhbnNjZWl2ZXIucnRwU2VuZGVyO1xyXG4gIH07XHJcblxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcclxuICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICBpZiAoZWRnZVZlcnNpb24gPj0gMTUwMjUpIHtcclxuICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcclxuICAgICAgICBwYy5hZGRUcmFjayh0cmFjaywgc3RyZWFtKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBDbG9uZSBpcyBuZWNlc3NhcnkgZm9yIGxvY2FsIGRlbW9zIG1vc3RseSwgYXR0YWNoaW5nIGRpcmVjdGx5XHJcbiAgICAgIC8vIHRvIHR3byBkaWZmZXJlbnQgc2VuZGVycyBkb2VzIG5vdCB3b3JrIChidWlsZCAxMDU0NykuXHJcbiAgICAgIC8vIEZpeGVkIGluIDE1MDI1IChvciBlYXJsaWVyKVxyXG4gICAgICB2YXIgY2xvbmVkU3RyZWFtID0gc3RyZWFtLmNsb25lKCk7XHJcbiAgICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrLCBpZHgpIHtcclxuICAgICAgICB2YXIgY2xvbmVkVHJhY2sgPSBjbG9uZWRTdHJlYW0uZ2V0VHJhY2tzKClbaWR4XTtcclxuICAgICAgICB0cmFjay5hZGRFdmVudExpc3RlbmVyKCdlbmFibGVkJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgIGNsb25lZFRyYWNrLmVuYWJsZWQgPSBldmVudC5lbmFibGVkO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgICAgY2xvbmVkU3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcclxuICAgICAgICBwYy5hZGRUcmFjayh0cmFjaywgY2xvbmVkU3RyZWFtKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVRyYWNrID0gZnVuY3Rpb24oc2VuZGVyKSB7XHJcbiAgICBpZiAodGhpcy5faXNDbG9zZWQpIHtcclxuICAgICAgdGhyb3cgbWFrZUVycm9yKCdJbnZhbGlkU3RhdGVFcnJvcicsXHJcbiAgICAgICAgICAnQXR0ZW1wdGVkIHRvIGNhbGwgcmVtb3ZlVHJhY2sgb24gYSBjbG9zZWQgcGVlcmNvbm5lY3Rpb24uJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCEoc2VuZGVyIGluc3RhbmNlb2Ygd2luZG93LlJUQ1J0cFNlbmRlcikpIHtcclxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgMSBvZiBSVENQZWVyQ29ubmVjdGlvbi5yZW1vdmVUcmFjayAnICtcclxuICAgICAgICAgICdkb2VzIG5vdCBpbXBsZW1lbnQgaW50ZXJmYWNlIFJUQ1J0cFNlbmRlci4nKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgdHJhbnNjZWl2ZXIgPSB0aGlzLnRyYW5zY2VpdmVycy5maW5kKGZ1bmN0aW9uKHQpIHtcclxuICAgICAgcmV0dXJuIHQucnRwU2VuZGVyID09PSBzZW5kZXI7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoIXRyYW5zY2VpdmVyKSB7XHJcbiAgICAgIHRocm93IG1ha2VFcnJvcignSW52YWxpZEFjY2Vzc0Vycm9yJyxcclxuICAgICAgICAgICdTZW5kZXIgd2FzIG5vdCBjcmVhdGVkIGJ5IHRoaXMgY29ubmVjdGlvbi4nKTtcclxuICAgIH1cclxuICAgIHZhciBzdHJlYW0gPSB0cmFuc2NlaXZlci5zdHJlYW07XHJcblxyXG4gICAgdHJhbnNjZWl2ZXIucnRwU2VuZGVyLnN0b3AoKTtcclxuICAgIHRyYW5zY2VpdmVyLnJ0cFNlbmRlciA9IG51bGw7XHJcbiAgICB0cmFuc2NlaXZlci50cmFjayA9IG51bGw7XHJcbiAgICB0cmFuc2NlaXZlci5zdHJlYW0gPSBudWxsO1xyXG5cclxuICAgIC8vIHJlbW92ZSB0aGUgc3RyZWFtIGZyb20gdGhlIHNldCBvZiBsb2NhbCBzdHJlYW1zXHJcbiAgICB2YXIgbG9jYWxTdHJlYW1zID0gdGhpcy50cmFuc2NlaXZlcnMubWFwKGZ1bmN0aW9uKHQpIHtcclxuICAgICAgcmV0dXJuIHQuc3RyZWFtO1xyXG4gICAgfSk7XHJcbiAgICBpZiAobG9jYWxTdHJlYW1zLmluZGV4T2Yoc3RyZWFtKSA9PT0gLTEgJiZcclxuICAgICAgICB0aGlzLmxvY2FsU3RyZWFtcy5pbmRleE9mKHN0cmVhbSkgPiAtMSkge1xyXG4gICAgICB0aGlzLmxvY2FsU3RyZWFtcy5zcGxpY2UodGhpcy5sb2NhbFN0cmVhbXMuaW5kZXhPZihzdHJlYW0pLCAxKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9tYXliZUZpcmVOZWdvdGlhdGlvbk5lZWRlZCgpO1xyXG4gIH07XHJcblxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcclxuICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xyXG4gICAgICB2YXIgc2VuZGVyID0gcGMuZ2V0U2VuZGVycygpLmZpbmQoZnVuY3Rpb24ocykge1xyXG4gICAgICAgIHJldHVybiBzLnRyYWNrID09PSB0cmFjaztcclxuICAgICAgfSk7XHJcbiAgICAgIGlmIChzZW5kZXIpIHtcclxuICAgICAgICBwYy5yZW1vdmVUcmFjayhzZW5kZXIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U2VuZGVycyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudHJhbnNjZWl2ZXJzLmZpbHRlcihmdW5jdGlvbih0cmFuc2NlaXZlcikge1xyXG4gICAgICByZXR1cm4gISF0cmFuc2NlaXZlci5ydHBTZW5kZXI7XHJcbiAgICB9KVxyXG4gICAgLm1hcChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xyXG4gICAgICByZXR1cm4gdHJhbnNjZWl2ZXIucnRwU2VuZGVyO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFJlY2VpdmVycyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudHJhbnNjZWl2ZXJzLmZpbHRlcihmdW5jdGlvbih0cmFuc2NlaXZlcikge1xyXG4gICAgICByZXR1cm4gISF0cmFuc2NlaXZlci5ydHBSZWNlaXZlcjtcclxuICAgIH0pXHJcbiAgICAubWFwKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XHJcbiAgICAgIHJldHVybiB0cmFuc2NlaXZlci5ydHBSZWNlaXZlcjtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG5cclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX2NyZWF0ZUljZUdhdGhlcmVyID0gZnVuY3Rpb24oc2RwTUxpbmVJbmRleCxcclxuICAgICAgdXNpbmdCdW5kbGUpIHtcclxuICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICBpZiAodXNpbmdCdW5kbGUgJiYgc2RwTUxpbmVJbmRleCA+IDApIHtcclxuICAgICAgcmV0dXJuIHRoaXMudHJhbnNjZWl2ZXJzWzBdLmljZUdhdGhlcmVyO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLl9pY2VHYXRoZXJlcnMubGVuZ3RoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9pY2VHYXRoZXJlcnMuc2hpZnQoKTtcclxuICAgIH1cclxuICAgIHZhciBpY2VHYXRoZXJlciA9IG5ldyB3aW5kb3cuUlRDSWNlR2F0aGVyZXIoe1xyXG4gICAgICBpY2VTZXJ2ZXJzOiB0aGlzLl9jb25maWcuaWNlU2VydmVycyxcclxuICAgICAgZ2F0aGVyUG9saWN5OiB0aGlzLl9jb25maWcuaWNlVHJhbnNwb3J0UG9saWN5XHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpY2VHYXRoZXJlciwgJ3N0YXRlJyxcclxuICAgICAgICB7dmFsdWU6ICduZXcnLCB3cml0YWJsZTogdHJ1ZX1cclxuICAgICk7XHJcblxyXG4gICAgdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uYnVmZmVyZWRDYW5kaWRhdGVFdmVudHMgPSBbXTtcclxuICAgIHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmJ1ZmZlckNhbmRpZGF0ZXMgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICB2YXIgZW5kID0gIWV2ZW50LmNhbmRpZGF0ZSB8fCBPYmplY3Qua2V5cyhldmVudC5jYW5kaWRhdGUpLmxlbmd0aCA9PT0gMDtcclxuICAgICAgLy8gcG9seWZpbGwgc2luY2UgUlRDSWNlR2F0aGVyZXIuc3RhdGUgaXMgbm90IGltcGxlbWVudGVkIGluXHJcbiAgICAgIC8vIEVkZ2UgMTA1NDcgeWV0LlxyXG4gICAgICBpY2VHYXRoZXJlci5zdGF0ZSA9IGVuZCA/ICdjb21wbGV0ZWQnIDogJ2dhdGhlcmluZyc7XHJcbiAgICAgIGlmIChwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uYnVmZmVyZWRDYW5kaWRhdGVFdmVudHMgIT09IG51bGwpIHtcclxuICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uYnVmZmVyZWRDYW5kaWRhdGVFdmVudHMucHVzaChldmVudCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICBpY2VHYXRoZXJlci5hZGRFdmVudExpc3RlbmVyKCdsb2NhbGNhbmRpZGF0ZScsXHJcbiAgICAgIHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmJ1ZmZlckNhbmRpZGF0ZXMpO1xyXG4gICAgcmV0dXJuIGljZUdhdGhlcmVyO1xyXG4gIH07XHJcblxyXG4gIC8vIHN0YXJ0IGdhdGhlcmluZyBmcm9tIGFuIFJUQ0ljZUdhdGhlcmVyLlxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fZ2F0aGVyID0gZnVuY3Rpb24obWlkLCBzZHBNTGluZUluZGV4KSB7XHJcbiAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgdmFyIGljZUdhdGhlcmVyID0gdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uaWNlR2F0aGVyZXI7XHJcbiAgICBpZiAoaWNlR2F0aGVyZXIub25sb2NhbGNhbmRpZGF0ZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB2YXIgYnVmZmVyZWRDYW5kaWRhdGVFdmVudHMgPVxyXG4gICAgICB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5idWZmZXJlZENhbmRpZGF0ZUV2ZW50cztcclxuICAgIHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmJ1ZmZlcmVkQ2FuZGlkYXRlRXZlbnRzID0gbnVsbDtcclxuICAgIGljZUdhdGhlcmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xvY2FsY2FuZGlkYXRlJyxcclxuICAgICAgdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uYnVmZmVyQ2FuZGlkYXRlcyk7XHJcbiAgICBpY2VHYXRoZXJlci5vbmxvY2FsY2FuZGlkYXRlID0gZnVuY3Rpb24oZXZ0KSB7XHJcbiAgICAgIGlmIChwYy51c2luZ0J1bmRsZSAmJiBzZHBNTGluZUluZGV4ID4gMCkge1xyXG4gICAgICAgIC8vIGlmIHdlIGtub3cgdGhhdCB3ZSB1c2UgYnVuZGxlIHdlIGNhbiBkcm9wIGNhbmRpZGF0ZXMgd2l0aFxyXG4gICAgICAgIC8vINGVZHBNTGluZUluZGV4ID4gMC4gSWYgd2UgZG9uJ3QgZG8gdGhpcyB0aGVuIG91ciBzdGF0ZSBnZXRzXHJcbiAgICAgICAgLy8gY29uZnVzZWQgc2luY2Ugd2UgZGlzcG9zZSB0aGUgZXh0cmEgaWNlIGdhdGhlcmVyLlxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ2ljZWNhbmRpZGF0ZScpO1xyXG4gICAgICBldmVudC5jYW5kaWRhdGUgPSB7c2RwTWlkOiBtaWQsIHNkcE1MaW5lSW5kZXg6IHNkcE1MaW5lSW5kZXh9O1xyXG5cclxuICAgICAgdmFyIGNhbmQgPSBldnQuY2FuZGlkYXRlO1xyXG4gICAgICAvLyBFZGdlIGVtaXRzIGFuIGVtcHR5IG9iamVjdCBmb3IgUlRDSWNlQ2FuZGlkYXRlQ29tcGxldGXigKVcclxuICAgICAgdmFyIGVuZCA9ICFjYW5kIHx8IE9iamVjdC5rZXlzKGNhbmQpLmxlbmd0aCA9PT0gMDtcclxuICAgICAgaWYgKGVuZCkge1xyXG4gICAgICAgIC8vIHBvbHlmaWxsIHNpbmNlIFJUQ0ljZUdhdGhlcmVyLnN0YXRlIGlzIG5vdCBpbXBsZW1lbnRlZCBpblxyXG4gICAgICAgIC8vIEVkZ2UgMTA1NDcgeWV0LlxyXG4gICAgICAgIGlmIChpY2VHYXRoZXJlci5zdGF0ZSA9PT0gJ25ldycgfHwgaWNlR2F0aGVyZXIuc3RhdGUgPT09ICdnYXRoZXJpbmcnKSB7XHJcbiAgICAgICAgICBpY2VHYXRoZXJlci5zdGF0ZSA9ICdjb21wbGV0ZWQnO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoaWNlR2F0aGVyZXIuc3RhdGUgPT09ICduZXcnKSB7XHJcbiAgICAgICAgICBpY2VHYXRoZXJlci5zdGF0ZSA9ICdnYXRoZXJpbmcnO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBSVENJY2VDYW5kaWRhdGUgZG9lc24ndCBoYXZlIGEgY29tcG9uZW50LCBuZWVkcyB0byBiZSBhZGRlZFxyXG4gICAgICAgIGNhbmQuY29tcG9uZW50ID0gMTtcclxuICAgICAgICAvLyBhbHNvIHRoZSB1c2VybmFtZUZyYWdtZW50LiBUT0RPOiB1cGRhdGUgU0RQIHRvIHRha2UgYm90aCB2YXJpYW50cy5cclxuICAgICAgICBjYW5kLnVmcmFnID0gaWNlR2F0aGVyZXIuZ2V0TG9jYWxQYXJhbWV0ZXJzKCkudXNlcm5hbWVGcmFnbWVudDtcclxuXHJcbiAgICAgICAgdmFyIHNlcmlhbGl6ZWRDYW5kaWRhdGUgPSBTRFBVdGlscy53cml0ZUNhbmRpZGF0ZShjYW5kKTtcclxuICAgICAgICBldmVudC5jYW5kaWRhdGUgPSBPYmplY3QuYXNzaWduKGV2ZW50LmNhbmRpZGF0ZSxcclxuICAgICAgICAgICAgU0RQVXRpbHMucGFyc2VDYW5kaWRhdGUoc2VyaWFsaXplZENhbmRpZGF0ZSkpO1xyXG5cclxuICAgICAgICBldmVudC5jYW5kaWRhdGUuY2FuZGlkYXRlID0gc2VyaWFsaXplZENhbmRpZGF0ZTtcclxuICAgICAgICBldmVudC5jYW5kaWRhdGUudG9KU09OID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjYW5kaWRhdGU6IGV2ZW50LmNhbmRpZGF0ZS5jYW5kaWRhdGUsXHJcbiAgICAgICAgICAgIHNkcE1pZDogZXZlbnQuY2FuZGlkYXRlLnNkcE1pZCxcclxuICAgICAgICAgICAgc2RwTUxpbmVJbmRleDogZXZlbnQuY2FuZGlkYXRlLnNkcE1MaW5lSW5kZXgsXHJcbiAgICAgICAgICAgIHVzZXJuYW1lRnJhZ21lbnQ6IGV2ZW50LmNhbmRpZGF0ZS51c2VybmFtZUZyYWdtZW50XHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHVwZGF0ZSBsb2NhbCBkZXNjcmlwdGlvbi5cclxuICAgICAgdmFyIHNlY3Rpb25zID0gU0RQVXRpbHMuZ2V0TWVkaWFTZWN0aW9ucyhwYy5sb2NhbERlc2NyaXB0aW9uLnNkcCk7XHJcbiAgICAgIGlmICghZW5kKSB7XHJcbiAgICAgICAgc2VjdGlvbnNbZXZlbnQuY2FuZGlkYXRlLnNkcE1MaW5lSW5kZXhdICs9XHJcbiAgICAgICAgICAgICdhPScgKyBldmVudC5jYW5kaWRhdGUuY2FuZGlkYXRlICsgJ1xcclxcbic7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2VjdGlvbnNbZXZlbnQuY2FuZGlkYXRlLnNkcE1MaW5lSW5kZXhdICs9XHJcbiAgICAgICAgICAgICdhPWVuZC1vZi1jYW5kaWRhdGVzXFxyXFxuJztcclxuICAgICAgfVxyXG4gICAgICBwYy5sb2NhbERlc2NyaXB0aW9uLnNkcCA9XHJcbiAgICAgICAgICBTRFBVdGlscy5nZXREZXNjcmlwdGlvbihwYy5sb2NhbERlc2NyaXB0aW9uLnNkcCkgK1xyXG4gICAgICAgICAgc2VjdGlvbnMuam9pbignJyk7XHJcbiAgICAgIHZhciBjb21wbGV0ZSA9IHBjLnRyYW5zY2VpdmVycy5ldmVyeShmdW5jdGlvbih0cmFuc2NlaXZlcikge1xyXG4gICAgICAgIHJldHVybiB0cmFuc2NlaXZlci5pY2VHYXRoZXJlciAmJlxyXG4gICAgICAgICAgICB0cmFuc2NlaXZlci5pY2VHYXRoZXJlci5zdGF0ZSA9PT0gJ2NvbXBsZXRlZCc7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKHBjLmljZUdhdGhlcmluZ1N0YXRlICE9PSAnZ2F0aGVyaW5nJykge1xyXG4gICAgICAgIHBjLmljZUdhdGhlcmluZ1N0YXRlID0gJ2dhdGhlcmluZyc7XHJcbiAgICAgICAgcGMuX2VtaXRHYXRoZXJpbmdTdGF0ZUNoYW5nZSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBFbWl0IGNhbmRpZGF0ZS4gQWxzbyBlbWl0IG51bGwgY2FuZGlkYXRlIHdoZW4gYWxsIGdhdGhlcmVycyBhcmVcclxuICAgICAgLy8gY29tcGxldGUuXHJcbiAgICAgIGlmICghZW5kKSB7XHJcbiAgICAgICAgcGMuX2Rpc3BhdGNoRXZlbnQoJ2ljZWNhbmRpZGF0ZScsIGV2ZW50KTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY29tcGxldGUpIHtcclxuICAgICAgICBwYy5fZGlzcGF0Y2hFdmVudCgnaWNlY2FuZGlkYXRlJywgbmV3IEV2ZW50KCdpY2VjYW5kaWRhdGUnKSk7XHJcbiAgICAgICAgcGMuaWNlR2F0aGVyaW5nU3RhdGUgPSAnY29tcGxldGUnO1xyXG4gICAgICAgIHBjLl9lbWl0R2F0aGVyaW5nU3RhdGVDaGFuZ2UoKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBlbWl0IGFscmVhZHkgZ2F0aGVyZWQgY2FuZGlkYXRlcy5cclxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICBidWZmZXJlZENhbmRpZGF0ZUV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpY2VHYXRoZXJlci5vbmxvY2FsY2FuZGlkYXRlKGUpO1xyXG4gICAgICB9KTtcclxuICAgIH0sIDApO1xyXG4gIH07XHJcblxyXG4gIC8vIENyZWF0ZSBJQ0UgdHJhbnNwb3J0IGFuZCBEVExTIHRyYW5zcG9ydC5cclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX2NyZWF0ZUljZUFuZER0bHNUcmFuc3BvcnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgdmFyIGljZVRyYW5zcG9ydCA9IG5ldyB3aW5kb3cuUlRDSWNlVHJhbnNwb3J0KG51bGwpO1xyXG4gICAgaWNlVHJhbnNwb3J0Lm9uaWNlc3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgcGMuX3VwZGF0ZUljZUNvbm5lY3Rpb25TdGF0ZSgpO1xyXG4gICAgICBwYy5fdXBkYXRlQ29ubmVjdGlvblN0YXRlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBkdGxzVHJhbnNwb3J0ID0gbmV3IHdpbmRvdy5SVENEdGxzVHJhbnNwb3J0KGljZVRyYW5zcG9ydCk7XHJcbiAgICBkdGxzVHJhbnNwb3J0Lm9uZHRsc3N0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHBjLl91cGRhdGVDb25uZWN0aW9uU3RhdGUoKTtcclxuICAgIH07XHJcbiAgICBkdGxzVHJhbnNwb3J0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcclxuICAgICAgLy8gb25lcnJvciBkb2VzIG5vdCBzZXQgc3RhdGUgdG8gZmFpbGVkIGJ5IGl0c2VsZi5cclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGR0bHNUcmFuc3BvcnQsICdzdGF0ZScsXHJcbiAgICAgICAgICB7dmFsdWU6ICdmYWlsZWQnLCB3cml0YWJsZTogdHJ1ZX0pO1xyXG4gICAgICBwYy5fdXBkYXRlQ29ubmVjdGlvblN0YXRlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGljZVRyYW5zcG9ydDogaWNlVHJhbnNwb3J0LFxyXG4gICAgICBkdGxzVHJhbnNwb3J0OiBkdGxzVHJhbnNwb3J0XHJcbiAgICB9O1xyXG4gIH07XHJcblxyXG4gIC8vIERlc3Ryb3kgSUNFIGdhdGhlcmVyLCBJQ0UgdHJhbnNwb3J0IGFuZCBEVExTIHRyYW5zcG9ydC5cclxuICAvLyBXaXRob3V0IHRyaWdnZXJpbmcgdGhlIGNhbGxiYWNrcy5cclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX2Rpc3Bvc2VJY2VBbmREdGxzVHJhbnNwb3J0cyA9IGZ1bmN0aW9uKFxyXG4gICAgICBzZHBNTGluZUluZGV4KSB7XHJcbiAgICB2YXIgaWNlR2F0aGVyZXIgPSB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5pY2VHYXRoZXJlcjtcclxuICAgIGlmIChpY2VHYXRoZXJlcikge1xyXG4gICAgICBkZWxldGUgaWNlR2F0aGVyZXIub25sb2NhbGNhbmRpZGF0ZTtcclxuICAgICAgZGVsZXRlIHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmljZUdhdGhlcmVyO1xyXG4gICAgfVxyXG4gICAgdmFyIGljZVRyYW5zcG9ydCA9IHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmljZVRyYW5zcG9ydDtcclxuICAgIGlmIChpY2VUcmFuc3BvcnQpIHtcclxuICAgICAgZGVsZXRlIGljZVRyYW5zcG9ydC5vbmljZXN0YXRlY2hhbmdlO1xyXG4gICAgICBkZWxldGUgdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uaWNlVHJhbnNwb3J0O1xyXG4gICAgfVxyXG4gICAgdmFyIGR0bHNUcmFuc3BvcnQgPSB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5kdGxzVHJhbnNwb3J0O1xyXG4gICAgaWYgKGR0bHNUcmFuc3BvcnQpIHtcclxuICAgICAgZGVsZXRlIGR0bHNUcmFuc3BvcnQub25kdGxzc3RhdGVjaGFuZ2U7XHJcbiAgICAgIGRlbGV0ZSBkdGxzVHJhbnNwb3J0Lm9uZXJyb3I7XHJcbiAgICAgIGRlbGV0ZSB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5kdGxzVHJhbnNwb3J0O1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8vIFN0YXJ0IHRoZSBSVFAgU2VuZGVyIGFuZCBSZWNlaXZlciBmb3IgYSB0cmFuc2NlaXZlci5cclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX3RyYW5zY2VpdmUgPSBmdW5jdGlvbih0cmFuc2NlaXZlcixcclxuICAgICAgc2VuZCwgcmVjdikge1xyXG4gICAgdmFyIHBhcmFtcyA9IGdldENvbW1vbkNhcGFiaWxpdGllcyh0cmFuc2NlaXZlci5sb2NhbENhcGFiaWxpdGllcyxcclxuICAgICAgICB0cmFuc2NlaXZlci5yZW1vdGVDYXBhYmlsaXRpZXMpO1xyXG4gICAgaWYgKHNlbmQgJiYgdHJhbnNjZWl2ZXIucnRwU2VuZGVyKSB7XHJcbiAgICAgIHBhcmFtcy5lbmNvZGluZ3MgPSB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzO1xyXG4gICAgICBwYXJhbXMucnRjcCA9IHtcclxuICAgICAgICBjbmFtZTogU0RQVXRpbHMubG9jYWxDTmFtZSxcclxuICAgICAgICBjb21wb3VuZDogdHJhbnNjZWl2ZXIucnRjcFBhcmFtZXRlcnMuY29tcG91bmRcclxuICAgICAgfTtcclxuICAgICAgaWYgKHRyYW5zY2VpdmVyLnJlY3ZFbmNvZGluZ1BhcmFtZXRlcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgcGFyYW1zLnJ0Y3Auc3NyYyA9IHRyYW5zY2VpdmVyLnJlY3ZFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYztcclxuICAgICAgfVxyXG4gICAgICB0cmFuc2NlaXZlci5ydHBTZW5kZXIuc2VuZChwYXJhbXMpO1xyXG4gICAgfVxyXG4gICAgaWYgKHJlY3YgJiYgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIgJiYgcGFyYW1zLmNvZGVjcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIC8vIHJlbW92ZSBSVFggZmllbGQgaW4gRWRnZSAxNDk0MlxyXG4gICAgICBpZiAodHJhbnNjZWl2ZXIua2luZCA9PT0gJ3ZpZGVvJ1xyXG4gICAgICAgICAgJiYgdHJhbnNjZWl2ZXIucmVjdkVuY29kaW5nUGFyYW1ldGVyc1xyXG4gICAgICAgICAgJiYgZWRnZVZlcnNpb24gPCAxNTAxOSkge1xyXG4gICAgICAgIHRyYW5zY2VpdmVyLnJlY3ZFbmNvZGluZ1BhcmFtZXRlcnMuZm9yRWFjaChmdW5jdGlvbihwKSB7XHJcbiAgICAgICAgICBkZWxldGUgcC5ydHg7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRyYW5zY2VpdmVyLnJlY3ZFbmNvZGluZ1BhcmFtZXRlcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgcGFyYW1zLmVuY29kaW5ncyA9IHRyYW5zY2VpdmVyLnJlY3ZFbmNvZGluZ1BhcmFtZXRlcnM7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcGFyYW1zLmVuY29kaW5ncyA9IFt7fV07XHJcbiAgICAgIH1cclxuICAgICAgcGFyYW1zLnJ0Y3AgPSB7XHJcbiAgICAgICAgY29tcG91bmQ6IHRyYW5zY2VpdmVyLnJ0Y3BQYXJhbWV0ZXJzLmNvbXBvdW5kXHJcbiAgICAgIH07XHJcbiAgICAgIGlmICh0cmFuc2NlaXZlci5ydGNwUGFyYW1ldGVycy5jbmFtZSkge1xyXG4gICAgICAgIHBhcmFtcy5ydGNwLmNuYW1lID0gdHJhbnNjZWl2ZXIucnRjcFBhcmFtZXRlcnMuY25hbWU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgcGFyYW1zLnJ0Y3Auc3NyYyA9IHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYztcclxuICAgICAgfVxyXG4gICAgICB0cmFuc2NlaXZlci5ydHBSZWNlaXZlci5yZWNlaXZlKHBhcmFtcyk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnNldExvY2FsRGVzY3JpcHRpb24gPSBmdW5jdGlvbihkZXNjcmlwdGlvbikge1xyXG4gICAgdmFyIHBjID0gdGhpcztcclxuXHJcbiAgICAvLyBOb3RlOiBwcmFuc3dlciBpcyBub3Qgc3VwcG9ydGVkLlxyXG4gICAgaWYgKFsnb2ZmZXInLCAnYW5zd2VyJ10uaW5kZXhPZihkZXNjcmlwdGlvbi50eXBlKSA9PT0gLTEpIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG1ha2VFcnJvcignVHlwZUVycm9yJyxcclxuICAgICAgICAgICdVbnN1cHBvcnRlZCB0eXBlIFwiJyArIGRlc2NyaXB0aW9uLnR5cGUgKyAnXCInKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFpc0FjdGlvbkFsbG93ZWRJblNpZ25hbGluZ1N0YXRlKCdzZXRMb2NhbERlc2NyaXB0aW9uJyxcclxuICAgICAgICBkZXNjcmlwdGlvbi50eXBlLCBwYy5zaWduYWxpbmdTdGF0ZSkgfHwgcGMuX2lzQ2xvc2VkKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChtYWtlRXJyb3IoJ0ludmFsaWRTdGF0ZUVycm9yJyxcclxuICAgICAgICAgICdDYW4gbm90IHNldCBsb2NhbCAnICsgZGVzY3JpcHRpb24udHlwZSArXHJcbiAgICAgICAgICAnIGluIHN0YXRlICcgKyBwYy5zaWduYWxpbmdTdGF0ZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBzZWN0aW9ucztcclxuICAgIHZhciBzZXNzaW9ucGFydDtcclxuICAgIGlmIChkZXNjcmlwdGlvbi50eXBlID09PSAnb2ZmZXInKSB7XHJcbiAgICAgIC8vIFZFUlkgbGltaXRlZCBzdXBwb3J0IGZvciBTRFAgbXVuZ2luZy4gTGltaXRlZCB0bzpcclxuICAgICAgLy8gKiBjaGFuZ2luZyB0aGUgb3JkZXIgb2YgY29kZWNzXHJcbiAgICAgIHNlY3Rpb25zID0gU0RQVXRpbHMuc3BsaXRTZWN0aW9ucyhkZXNjcmlwdGlvbi5zZHApO1xyXG4gICAgICBzZXNzaW9ucGFydCA9IHNlY3Rpb25zLnNoaWZ0KCk7XHJcbiAgICAgIHNlY3Rpb25zLmZvckVhY2goZnVuY3Rpb24obWVkaWFTZWN0aW9uLCBzZHBNTGluZUluZGV4KSB7XHJcbiAgICAgICAgdmFyIGNhcHMgPSBTRFBVdGlscy5wYXJzZVJ0cFBhcmFtZXRlcnMobWVkaWFTZWN0aW9uKTtcclxuICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0ubG9jYWxDYXBhYmlsaXRpZXMgPSBjYXBzO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHBjLnRyYW5zY2VpdmVycy5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zY2VpdmVyLCBzZHBNTGluZUluZGV4KSB7XHJcbiAgICAgICAgcGMuX2dhdGhlcih0cmFuc2NlaXZlci5taWQsIHNkcE1MaW5lSW5kZXgpO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSBpZiAoZGVzY3JpcHRpb24udHlwZSA9PT0gJ2Fuc3dlcicpIHtcclxuICAgICAgc2VjdGlvbnMgPSBTRFBVdGlscy5zcGxpdFNlY3Rpb25zKHBjLnJlbW90ZURlc2NyaXB0aW9uLnNkcCk7XHJcbiAgICAgIHNlc3Npb25wYXJ0ID0gc2VjdGlvbnMuc2hpZnQoKTtcclxuICAgICAgdmFyIGlzSWNlTGl0ZSA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KHNlc3Npb25wYXJ0LFxyXG4gICAgICAgICAgJ2E9aWNlLWxpdGUnKS5sZW5ndGggPiAwO1xyXG4gICAgICBzZWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKG1lZGlhU2VjdGlvbiwgc2RwTUxpbmVJbmRleCkge1xyXG4gICAgICAgIHZhciB0cmFuc2NlaXZlciA9IHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XTtcclxuICAgICAgICB2YXIgaWNlR2F0aGVyZXIgPSB0cmFuc2NlaXZlci5pY2VHYXRoZXJlcjtcclxuICAgICAgICB2YXIgaWNlVHJhbnNwb3J0ID0gdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0O1xyXG4gICAgICAgIHZhciBkdGxzVHJhbnNwb3J0ID0gdHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydDtcclxuICAgICAgICB2YXIgbG9jYWxDYXBhYmlsaXRpZXMgPSB0cmFuc2NlaXZlci5sb2NhbENhcGFiaWxpdGllcztcclxuICAgICAgICB2YXIgcmVtb3RlQ2FwYWJpbGl0aWVzID0gdHJhbnNjZWl2ZXIucmVtb3RlQ2FwYWJpbGl0aWVzO1xyXG5cclxuICAgICAgICAvLyB0cmVhdCBidW5kbGUtb25seSBhcyBub3QtcmVqZWN0ZWQuXHJcbiAgICAgICAgdmFyIHJlamVjdGVkID0gU0RQVXRpbHMuaXNSZWplY3RlZChtZWRpYVNlY3Rpb24pICYmXHJcbiAgICAgICAgICAgIFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9YnVuZGxlLW9ubHknKS5sZW5ndGggPT09IDA7XHJcblxyXG4gICAgICAgIGlmICghcmVqZWN0ZWQgJiYgIXRyYW5zY2VpdmVyLnJlamVjdGVkKSB7XHJcbiAgICAgICAgICB2YXIgcmVtb3RlSWNlUGFyYW1ldGVycyA9IFNEUFV0aWxzLmdldEljZVBhcmFtZXRlcnMoXHJcbiAgICAgICAgICAgICAgbWVkaWFTZWN0aW9uLCBzZXNzaW9ucGFydCk7XHJcbiAgICAgICAgICB2YXIgcmVtb3RlRHRsc1BhcmFtZXRlcnMgPSBTRFBVdGlscy5nZXREdGxzUGFyYW1ldGVycyhcclxuICAgICAgICAgICAgICBtZWRpYVNlY3Rpb24sIHNlc3Npb25wYXJ0KTtcclxuICAgICAgICAgIGlmIChpc0ljZUxpdGUpIHtcclxuICAgICAgICAgICAgcmVtb3RlRHRsc1BhcmFtZXRlcnMucm9sZSA9ICdzZXJ2ZXInO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICghcGMudXNpbmdCdW5kbGUgfHwgc2RwTUxpbmVJbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgICBwYy5fZ2F0aGVyKHRyYW5zY2VpdmVyLm1pZCwgc2RwTUxpbmVJbmRleCk7XHJcbiAgICAgICAgICAgIGlmIChpY2VUcmFuc3BvcnQuc3RhdGUgPT09ICduZXcnKSB7XHJcbiAgICAgICAgICAgICAgaWNlVHJhbnNwb3J0LnN0YXJ0KGljZUdhdGhlcmVyLCByZW1vdGVJY2VQYXJhbWV0ZXJzLFxyXG4gICAgICAgICAgICAgICAgICBpc0ljZUxpdGUgPyAnY29udHJvbGxpbmcnIDogJ2NvbnRyb2xsZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZHRsc1RyYW5zcG9ydC5zdGF0ZSA9PT0gJ25ldycpIHtcclxuICAgICAgICAgICAgICBkdGxzVHJhbnNwb3J0LnN0YXJ0KHJlbW90ZUR0bHNQYXJhbWV0ZXJzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIENhbGN1bGF0ZSBpbnRlcnNlY3Rpb24gb2YgY2FwYWJpbGl0aWVzLlxyXG4gICAgICAgICAgdmFyIHBhcmFtcyA9IGdldENvbW1vbkNhcGFiaWxpdGllcyhsb2NhbENhcGFiaWxpdGllcyxcclxuICAgICAgICAgICAgICByZW1vdGVDYXBhYmlsaXRpZXMpO1xyXG5cclxuICAgICAgICAgIC8vIFN0YXJ0IHRoZSBSVENSdHBTZW5kZXIuIFRoZSBSVENSdHBSZWNlaXZlciBmb3IgdGhpc1xyXG4gICAgICAgICAgLy8gdHJhbnNjZWl2ZXIgaGFzIGFscmVhZHkgYmVlbiBzdGFydGVkIGluIHNldFJlbW90ZURlc2NyaXB0aW9uLlxyXG4gICAgICAgICAgcGMuX3RyYW5zY2VpdmUodHJhbnNjZWl2ZXIsXHJcbiAgICAgICAgICAgICAgcGFyYW1zLmNvZGVjcy5sZW5ndGggPiAwLFxyXG4gICAgICAgICAgICAgIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHBjLmxvY2FsRGVzY3JpcHRpb24gPSB7XHJcbiAgICAgIHR5cGU6IGRlc2NyaXB0aW9uLnR5cGUsXHJcbiAgICAgIHNkcDogZGVzY3JpcHRpb24uc2RwXHJcbiAgICB9O1xyXG4gICAgaWYgKGRlc2NyaXB0aW9uLnR5cGUgPT09ICdvZmZlcicpIHtcclxuICAgICAgcGMuX3VwZGF0ZVNpZ25hbGluZ1N0YXRlKCdoYXZlLWxvY2FsLW9mZmVyJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBwYy5fdXBkYXRlU2lnbmFsaW5nU3RhdGUoJ3N0YWJsZScpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICB9O1xyXG5cclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0UmVtb3RlRGVzY3JpcHRpb24gPSBmdW5jdGlvbihkZXNjcmlwdGlvbikge1xyXG4gICAgdmFyIHBjID0gdGhpcztcclxuXHJcbiAgICAvLyBOb3RlOiBwcmFuc3dlciBpcyBub3Qgc3VwcG9ydGVkLlxyXG4gICAgaWYgKFsnb2ZmZXInLCAnYW5zd2VyJ10uaW5kZXhPZihkZXNjcmlwdGlvbi50eXBlKSA9PT0gLTEpIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG1ha2VFcnJvcignVHlwZUVycm9yJyxcclxuICAgICAgICAgICdVbnN1cHBvcnRlZCB0eXBlIFwiJyArIGRlc2NyaXB0aW9uLnR5cGUgKyAnXCInKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFpc0FjdGlvbkFsbG93ZWRJblNpZ25hbGluZ1N0YXRlKCdzZXRSZW1vdGVEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgZGVzY3JpcHRpb24udHlwZSwgcGMuc2lnbmFsaW5nU3RhdGUpIHx8IHBjLl9pc0Nsb3NlZCkge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobWFrZUVycm9yKCdJbnZhbGlkU3RhdGVFcnJvcicsXHJcbiAgICAgICAgICAnQ2FuIG5vdCBzZXQgcmVtb3RlICcgKyBkZXNjcmlwdGlvbi50eXBlICtcclxuICAgICAgICAgICcgaW4gc3RhdGUgJyArIHBjLnNpZ25hbGluZ1N0YXRlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHN0cmVhbXMgPSB7fTtcclxuICAgIHBjLnJlbW90ZVN0cmVhbXMuZm9yRWFjaChmdW5jdGlvbihzdHJlYW0pIHtcclxuICAgICAgc3RyZWFtc1tzdHJlYW0uaWRdID0gc3RyZWFtO1xyXG4gICAgfSk7XHJcbiAgICB2YXIgcmVjZWl2ZXJMaXN0ID0gW107XHJcbiAgICB2YXIgc2VjdGlvbnMgPSBTRFBVdGlscy5zcGxpdFNlY3Rpb25zKGRlc2NyaXB0aW9uLnNkcCk7XHJcbiAgICB2YXIgc2Vzc2lvbnBhcnQgPSBzZWN0aW9ucy5zaGlmdCgpO1xyXG4gICAgdmFyIGlzSWNlTGl0ZSA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KHNlc3Npb25wYXJ0LFxyXG4gICAgICAgICdhPWljZS1saXRlJykubGVuZ3RoID4gMDtcclxuICAgIHZhciB1c2luZ0J1bmRsZSA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KHNlc3Npb25wYXJ0LFxyXG4gICAgICAgICdhPWdyb3VwOkJVTkRMRSAnKS5sZW5ndGggPiAwO1xyXG4gICAgcGMudXNpbmdCdW5kbGUgPSB1c2luZ0J1bmRsZTtcclxuICAgIHZhciBpY2VPcHRpb25zID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgoc2Vzc2lvbnBhcnQsXHJcbiAgICAgICAgJ2E9aWNlLW9wdGlvbnM6JylbMF07XHJcbiAgICBpZiAoaWNlT3B0aW9ucykge1xyXG4gICAgICBwYy5jYW5Ucmlja2xlSWNlQ2FuZGlkYXRlcyA9IGljZU9wdGlvbnMuc3Vic3RyKDE0KS5zcGxpdCgnICcpXHJcbiAgICAgICAgICAuaW5kZXhPZigndHJpY2tsZScpID49IDA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBwYy5jYW5Ucmlja2xlSWNlQ2FuZGlkYXRlcyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHNlY3Rpb25zLmZvckVhY2goZnVuY3Rpb24obWVkaWFTZWN0aW9uLCBzZHBNTGluZUluZGV4KSB7XHJcbiAgICAgIHZhciBsaW5lcyA9IFNEUFV0aWxzLnNwbGl0TGluZXMobWVkaWFTZWN0aW9uKTtcclxuICAgICAgdmFyIGtpbmQgPSBTRFBVdGlscy5nZXRLaW5kKG1lZGlhU2VjdGlvbik7XHJcbiAgICAgIC8vIHRyZWF0IGJ1bmRsZS1vbmx5IGFzIG5vdC1yZWplY3RlZC5cclxuICAgICAgdmFyIHJlamVjdGVkID0gU0RQVXRpbHMuaXNSZWplY3RlZChtZWRpYVNlY3Rpb24pICYmXHJcbiAgICAgICAgICBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPWJ1bmRsZS1vbmx5JykubGVuZ3RoID09PSAwO1xyXG4gICAgICB2YXIgcHJvdG9jb2wgPSBsaW5lc1swXS5zdWJzdHIoMikuc3BsaXQoJyAnKVsyXTtcclxuXHJcbiAgICAgIHZhciBkaXJlY3Rpb24gPSBTRFBVdGlscy5nZXREaXJlY3Rpb24obWVkaWFTZWN0aW9uLCBzZXNzaW9ucGFydCk7XHJcbiAgICAgIHZhciByZW1vdGVNc2lkID0gU0RQVXRpbHMucGFyc2VNc2lkKG1lZGlhU2VjdGlvbik7XHJcblxyXG4gICAgICB2YXIgbWlkID0gU0RQVXRpbHMuZ2V0TWlkKG1lZGlhU2VjdGlvbikgfHwgU0RQVXRpbHMuZ2VuZXJhdGVJZGVudGlmaWVyKCk7XHJcblxyXG4gICAgICAvLyBSZWplY3QgZGF0YWNoYW5uZWxzIHdoaWNoIGFyZSBub3QgaW1wbGVtZW50ZWQgeWV0LlxyXG4gICAgICBpZiAoKGtpbmQgPT09ICdhcHBsaWNhdGlvbicgJiYgcHJvdG9jb2wgPT09ICdEVExTL1NDVFAnKSB8fCByZWplY3RlZCkge1xyXG4gICAgICAgIC8vIFRPRE86IHRoaXMgaXMgZGFuZ2Vyb3VzIGluIHRoZSBjYXNlIHdoZXJlIGEgbm9uLXJlamVjdGVkIG0tbGluZVxyXG4gICAgICAgIC8vICAgICBiZWNvbWVzIHJlamVjdGVkLlxyXG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XSA9IHtcclxuICAgICAgICAgIG1pZDogbWlkLFxyXG4gICAgICAgICAga2luZDoga2luZCxcclxuICAgICAgICAgIHJlamVjdGVkOiB0cnVlXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghcmVqZWN0ZWQgJiYgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdICYmXHJcbiAgICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0ucmVqZWN0ZWQpIHtcclxuICAgICAgICAvLyByZWN5Y2xlIGEgcmVqZWN0ZWQgdHJhbnNjZWl2ZXIuXHJcbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdID0gcGMuX2NyZWF0ZVRyYW5zY2VpdmVyKGtpbmQsIHRydWUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgdHJhbnNjZWl2ZXI7XHJcbiAgICAgIHZhciBpY2VHYXRoZXJlcjtcclxuICAgICAgdmFyIGljZVRyYW5zcG9ydDtcclxuICAgICAgdmFyIGR0bHNUcmFuc3BvcnQ7XHJcbiAgICAgIHZhciBydHBSZWNlaXZlcjtcclxuICAgICAgdmFyIHNlbmRFbmNvZGluZ1BhcmFtZXRlcnM7XHJcbiAgICAgIHZhciByZWN2RW5jb2RpbmdQYXJhbWV0ZXJzO1xyXG4gICAgICB2YXIgbG9jYWxDYXBhYmlsaXRpZXM7XHJcblxyXG4gICAgICB2YXIgdHJhY2s7XHJcbiAgICAgIC8vIEZJWE1FOiBlbnN1cmUgdGhlIG1lZGlhU2VjdGlvbiBoYXMgcnRjcC1tdXggc2V0LlxyXG4gICAgICB2YXIgcmVtb3RlQ2FwYWJpbGl0aWVzID0gU0RQVXRpbHMucGFyc2VSdHBQYXJhbWV0ZXJzKG1lZGlhU2VjdGlvbik7XHJcbiAgICAgIHZhciByZW1vdGVJY2VQYXJhbWV0ZXJzO1xyXG4gICAgICB2YXIgcmVtb3RlRHRsc1BhcmFtZXRlcnM7XHJcbiAgICAgIGlmICghcmVqZWN0ZWQpIHtcclxuICAgICAgICByZW1vdGVJY2VQYXJhbWV0ZXJzID0gU0RQVXRpbHMuZ2V0SWNlUGFyYW1ldGVycyhtZWRpYVNlY3Rpb24sXHJcbiAgICAgICAgICAgIHNlc3Npb25wYXJ0KTtcclxuICAgICAgICByZW1vdGVEdGxzUGFyYW1ldGVycyA9IFNEUFV0aWxzLmdldER0bHNQYXJhbWV0ZXJzKG1lZGlhU2VjdGlvbixcclxuICAgICAgICAgICAgc2Vzc2lvbnBhcnQpO1xyXG4gICAgICAgIHJlbW90ZUR0bHNQYXJhbWV0ZXJzLnJvbGUgPSAnY2xpZW50JztcclxuICAgICAgfVxyXG4gICAgICByZWN2RW5jb2RpbmdQYXJhbWV0ZXJzID1cclxuICAgICAgICAgIFNEUFV0aWxzLnBhcnNlUnRwRW5jb2RpbmdQYXJhbWV0ZXJzKG1lZGlhU2VjdGlvbik7XHJcblxyXG4gICAgICB2YXIgcnRjcFBhcmFtZXRlcnMgPSBTRFBVdGlscy5wYXJzZVJ0Y3BQYXJhbWV0ZXJzKG1lZGlhU2VjdGlvbik7XHJcblxyXG4gICAgICB2YXIgaXNDb21wbGV0ZSA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbixcclxuICAgICAgICAgICdhPWVuZC1vZi1jYW5kaWRhdGVzJywgc2Vzc2lvbnBhcnQpLmxlbmd0aCA+IDA7XHJcbiAgICAgIHZhciBjYW5kcyA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9Y2FuZGlkYXRlOicpXHJcbiAgICAgICAgICAubWFwKGZ1bmN0aW9uKGNhbmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFNEUFV0aWxzLnBhcnNlQ2FuZGlkYXRlKGNhbmQpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24oY2FuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gY2FuZC5jb21wb25lbnQgPT09IDE7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgIC8vIENoZWNrIGlmIHdlIGNhbiB1c2UgQlVORExFIGFuZCBkaXNwb3NlIHRyYW5zcG9ydHMuXHJcbiAgICAgIGlmICgoZGVzY3JpcHRpb24udHlwZSA9PT0gJ29mZmVyJyB8fCBkZXNjcmlwdGlvbi50eXBlID09PSAnYW5zd2VyJykgJiZcclxuICAgICAgICAgICFyZWplY3RlZCAmJiB1c2luZ0J1bmRsZSAmJiBzZHBNTGluZUluZGV4ID4gMCAmJlxyXG4gICAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdKSB7XHJcbiAgICAgICAgcGMuX2Rpc3Bvc2VJY2VBbmREdGxzVHJhbnNwb3J0cyhzZHBNTGluZUluZGV4KTtcclxuICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uaWNlR2F0aGVyZXIgPVxyXG4gICAgICAgICAgICBwYy50cmFuc2NlaXZlcnNbMF0uaWNlR2F0aGVyZXI7XHJcbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmljZVRyYW5zcG9ydCA9XHJcbiAgICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1swXS5pY2VUcmFuc3BvcnQ7XHJcbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmR0bHNUcmFuc3BvcnQgPVxyXG4gICAgICAgICAgICBwYy50cmFuc2NlaXZlcnNbMF0uZHRsc1RyYW5zcG9ydDtcclxuICAgICAgICBpZiAocGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLnJ0cFNlbmRlcikge1xyXG4gICAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLnJ0cFNlbmRlci5zZXRUcmFuc3BvcnQoXHJcbiAgICAgICAgICAgICAgcGMudHJhbnNjZWl2ZXJzWzBdLmR0bHNUcmFuc3BvcnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLnJ0cFJlY2VpdmVyKSB7XHJcbiAgICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0ucnRwUmVjZWl2ZXIuc2V0VHJhbnNwb3J0KFxyXG4gICAgICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1swXS5kdGxzVHJhbnNwb3J0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGRlc2NyaXB0aW9uLnR5cGUgPT09ICdvZmZlcicgJiYgIXJlamVjdGVkKSB7XHJcbiAgICAgICAgdHJhbnNjZWl2ZXIgPSBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0gfHxcclxuICAgICAgICAgICAgcGMuX2NyZWF0ZVRyYW5zY2VpdmVyKGtpbmQpO1xyXG4gICAgICAgIHRyYW5zY2VpdmVyLm1pZCA9IG1pZDtcclxuXHJcbiAgICAgICAgaWYgKCF0cmFuc2NlaXZlci5pY2VHYXRoZXJlcikge1xyXG4gICAgICAgICAgdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIgPSBwYy5fY3JlYXRlSWNlR2F0aGVyZXIoc2RwTUxpbmVJbmRleCxcclxuICAgICAgICAgICAgICB1c2luZ0J1bmRsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY2FuZHMubGVuZ3RoICYmIHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydC5zdGF0ZSA9PT0gJ25ldycpIHtcclxuICAgICAgICAgIGlmIChpc0NvbXBsZXRlICYmICghdXNpbmdCdW5kbGUgfHwgc2RwTUxpbmVJbmRleCA9PT0gMCkpIHtcclxuICAgICAgICAgICAgdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LnNldFJlbW90ZUNhbmRpZGF0ZXMoY2FuZHMpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2FuZHMuZm9yRWFjaChmdW5jdGlvbihjYW5kaWRhdGUpIHtcclxuICAgICAgICAgICAgICBtYXliZUFkZENhbmRpZGF0ZSh0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQsIGNhbmRpZGF0ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbG9jYWxDYXBhYmlsaXRpZXMgPSB3aW5kb3cuUlRDUnRwUmVjZWl2ZXIuZ2V0Q2FwYWJpbGl0aWVzKGtpbmQpO1xyXG5cclxuICAgICAgICAvLyBmaWx0ZXIgUlRYIHVudGlsIGFkZGl0aW9uYWwgc3R1ZmYgbmVlZGVkIGZvciBSVFggaXMgaW1wbGVtZW50ZWRcclxuICAgICAgICAvLyBpbiBhZGFwdGVyLmpzXHJcbiAgICAgICAgaWYgKGVkZ2VWZXJzaW9uIDwgMTUwMTkpIHtcclxuICAgICAgICAgIGxvY2FsQ2FwYWJpbGl0aWVzLmNvZGVjcyA9IGxvY2FsQ2FwYWJpbGl0aWVzLmNvZGVjcy5maWx0ZXIoXHJcbiAgICAgICAgICAgICAgZnVuY3Rpb24oY29kZWMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb2RlYy5uYW1lICE9PSAncnR4JztcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbmRFbmNvZGluZ1BhcmFtZXRlcnMgPSB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzIHx8IFt7XHJcbiAgICAgICAgICBzc3JjOiAoMiAqIHNkcE1MaW5lSW5kZXggKyAyKSAqIDEwMDFcclxuICAgICAgICB9XTtcclxuXHJcbiAgICAgICAgLy8gVE9ETzogcmV3cml0ZSB0byB1c2UgaHR0cDovL3czYy5naXRodWIuaW8vd2VicnRjLXBjLyNzZXQtYXNzb2NpYXRlZC1yZW1vdGUtc3RyZWFtc1xyXG4gICAgICAgIHZhciBpc05ld1RyYWNrID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3NlbmRyZWN2JyB8fCBkaXJlY3Rpb24gPT09ICdzZW5kb25seScpIHtcclxuICAgICAgICAgIGlzTmV3VHJhY2sgPSAhdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXI7XHJcbiAgICAgICAgICBydHBSZWNlaXZlciA9IHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyIHx8XHJcbiAgICAgICAgICAgICAgbmV3IHdpbmRvdy5SVENSdHBSZWNlaXZlcih0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0LCBraW5kKTtcclxuXHJcbiAgICAgICAgICBpZiAoaXNOZXdUcmFjaykge1xyXG4gICAgICAgICAgICB2YXIgc3RyZWFtO1xyXG4gICAgICAgICAgICB0cmFjayA9IHJ0cFJlY2VpdmVyLnRyYWNrO1xyXG4gICAgICAgICAgICAvLyBGSVhNRTogZG9lcyBub3Qgd29yayB3aXRoIFBsYW4gQi5cclxuICAgICAgICAgICAgaWYgKHJlbW90ZU1zaWQgJiYgcmVtb3RlTXNpZC5zdHJlYW0gPT09ICctJykge1xyXG4gICAgICAgICAgICAgIC8vIG5vLW9wLiBhIHN0cmVhbSBpZCBvZiAnLScgbWVhbnM6IG5vIGFzc29jaWF0ZWQgc3RyZWFtLlxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlbW90ZU1zaWQpIHtcclxuICAgICAgICAgICAgICBpZiAoIXN0cmVhbXNbcmVtb3RlTXNpZC5zdHJlYW1dKSB7XHJcbiAgICAgICAgICAgICAgICBzdHJlYW1zW3JlbW90ZU1zaWQuc3RyZWFtXSA9IG5ldyB3aW5kb3cuTWVkaWFTdHJlYW0oKTtcclxuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzdHJlYW1zW3JlbW90ZU1zaWQuc3RyZWFtXSwgJ2lkJywge1xyXG4gICAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZW1vdGVNc2lkLnN0cmVhbTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0cmFjaywgJ2lkJywge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlbW90ZU1zaWQudHJhY2s7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgc3RyZWFtID0gc3RyZWFtc1tyZW1vdGVNc2lkLnN0cmVhbV07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgaWYgKCFzdHJlYW1zLmRlZmF1bHQpIHtcclxuICAgICAgICAgICAgICAgIHN0cmVhbXMuZGVmYXVsdCA9IG5ldyB3aW5kb3cuTWVkaWFTdHJlYW0oKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgc3RyZWFtID0gc3RyZWFtcy5kZWZhdWx0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzdHJlYW0pIHtcclxuICAgICAgICAgICAgICBhZGRUcmFja1RvU3RyZWFtQW5kRmlyZUV2ZW50KHRyYWNrLCBzdHJlYW0pO1xyXG4gICAgICAgICAgICAgIHRyYW5zY2VpdmVyLmFzc29jaWF0ZWRSZW1vdGVNZWRpYVN0cmVhbXMucHVzaChzdHJlYW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlY2VpdmVyTGlzdC5wdXNoKFt0cmFjaywgcnRwUmVjZWl2ZXIsIHN0cmVhbV0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIgJiYgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIudHJhY2spIHtcclxuICAgICAgICAgIHRyYW5zY2VpdmVyLmFzc29jaWF0ZWRSZW1vdGVNZWRpYVN0cmVhbXMuZm9yRWFjaChmdW5jdGlvbihzKSB7XHJcbiAgICAgICAgICAgIHZhciBuYXRpdmVUcmFjayA9IHMuZ2V0VHJhY2tzKCkuZmluZChmdW5jdGlvbih0KSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHQuaWQgPT09IHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyLnRyYWNrLmlkO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKG5hdGl2ZVRyYWNrKSB7XHJcbiAgICAgICAgICAgICAgcmVtb3ZlVHJhY2tGcm9tU3RyZWFtQW5kRmlyZUV2ZW50KG5hdGl2ZVRyYWNrLCBzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB0cmFuc2NlaXZlci5hc3NvY2lhdGVkUmVtb3RlTWVkaWFTdHJlYW1zID0gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0cmFuc2NlaXZlci5sb2NhbENhcGFiaWxpdGllcyA9IGxvY2FsQ2FwYWJpbGl0aWVzO1xyXG4gICAgICAgIHRyYW5zY2VpdmVyLnJlbW90ZUNhcGFiaWxpdGllcyA9IHJlbW90ZUNhcGFiaWxpdGllcztcclxuICAgICAgICB0cmFuc2NlaXZlci5ydHBSZWNlaXZlciA9IHJ0cFJlY2VpdmVyO1xyXG4gICAgICAgIHRyYW5zY2VpdmVyLnJ0Y3BQYXJhbWV0ZXJzID0gcnRjcFBhcmFtZXRlcnM7XHJcbiAgICAgICAgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVycyA9IHNlbmRFbmNvZGluZ1BhcmFtZXRlcnM7XHJcbiAgICAgICAgdHJhbnNjZWl2ZXIucmVjdkVuY29kaW5nUGFyYW1ldGVycyA9IHJlY3ZFbmNvZGluZ1BhcmFtZXRlcnM7XHJcblxyXG4gICAgICAgIC8vIFN0YXJ0IHRoZSBSVENSdHBSZWNlaXZlciBub3cuIFRoZSBSVFBTZW5kZXIgaXMgc3RhcnRlZCBpblxyXG4gICAgICAgIC8vIHNldExvY2FsRGVzY3JpcHRpb24uXHJcbiAgICAgICAgcGMuX3RyYW5zY2VpdmUocGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLFxyXG4gICAgICAgICAgICBmYWxzZSxcclxuICAgICAgICAgICAgaXNOZXdUcmFjayk7XHJcbiAgICAgIH0gZWxzZSBpZiAoZGVzY3JpcHRpb24udHlwZSA9PT0gJ2Fuc3dlcicgJiYgIXJlamVjdGVkKSB7XHJcbiAgICAgICAgdHJhbnNjZWl2ZXIgPSBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF07XHJcbiAgICAgICAgaWNlR2F0aGVyZXIgPSB0cmFuc2NlaXZlci5pY2VHYXRoZXJlcjtcclxuICAgICAgICBpY2VUcmFuc3BvcnQgPSB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQ7XHJcbiAgICAgICAgZHRsc1RyYW5zcG9ydCA9IHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQ7XHJcbiAgICAgICAgcnRwUmVjZWl2ZXIgPSB0cmFuc2NlaXZlci5ydHBSZWNlaXZlcjtcclxuICAgICAgICBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzID0gdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVycztcclxuICAgICAgICBsb2NhbENhcGFiaWxpdGllcyA9IHRyYW5zY2VpdmVyLmxvY2FsQ2FwYWJpbGl0aWVzO1xyXG5cclxuICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0ucmVjdkVuY29kaW5nUGFyYW1ldGVycyA9XHJcbiAgICAgICAgICAgIHJlY3ZFbmNvZGluZ1BhcmFtZXRlcnM7XHJcbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLnJlbW90ZUNhcGFiaWxpdGllcyA9XHJcbiAgICAgICAgICAgIHJlbW90ZUNhcGFiaWxpdGllcztcclxuICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0ucnRjcFBhcmFtZXRlcnMgPSBydGNwUGFyYW1ldGVycztcclxuXHJcbiAgICAgICAgaWYgKGNhbmRzLmxlbmd0aCAmJiBpY2VUcmFuc3BvcnQuc3RhdGUgPT09ICduZXcnKSB7XHJcbiAgICAgICAgICBpZiAoKGlzSWNlTGl0ZSB8fCBpc0NvbXBsZXRlKSAmJlxyXG4gICAgICAgICAgICAgICghdXNpbmdCdW5kbGUgfHwgc2RwTUxpbmVJbmRleCA9PT0gMCkpIHtcclxuICAgICAgICAgICAgaWNlVHJhbnNwb3J0LnNldFJlbW90ZUNhbmRpZGF0ZXMoY2FuZHMpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2FuZHMuZm9yRWFjaChmdW5jdGlvbihjYW5kaWRhdGUpIHtcclxuICAgICAgICAgICAgICBtYXliZUFkZENhbmRpZGF0ZSh0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQsIGNhbmRpZGF0ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF1c2luZ0J1bmRsZSB8fCBzZHBNTGluZUluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgICBpZiAoaWNlVHJhbnNwb3J0LnN0YXRlID09PSAnbmV3Jykge1xyXG4gICAgICAgICAgICBpY2VUcmFuc3BvcnQuc3RhcnQoaWNlR2F0aGVyZXIsIHJlbW90ZUljZVBhcmFtZXRlcnMsXHJcbiAgICAgICAgICAgICAgICAnY29udHJvbGxpbmcnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChkdGxzVHJhbnNwb3J0LnN0YXRlID09PSAnbmV3Jykge1xyXG4gICAgICAgICAgICBkdGxzVHJhbnNwb3J0LnN0YXJ0KHJlbW90ZUR0bHNQYXJhbWV0ZXJzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHBjLl90cmFuc2NlaXZlKHRyYW5zY2VpdmVyLFxyXG4gICAgICAgICAgICBkaXJlY3Rpb24gPT09ICdzZW5kcmVjdicgfHwgZGlyZWN0aW9uID09PSAncmVjdm9ubHknLFxyXG4gICAgICAgICAgICBkaXJlY3Rpb24gPT09ICdzZW5kcmVjdicgfHwgZGlyZWN0aW9uID09PSAnc2VuZG9ubHknKTtcclxuXHJcbiAgICAgICAgLy8gVE9ETzogcmV3cml0ZSB0byB1c2UgaHR0cDovL3czYy5naXRodWIuaW8vd2VicnRjLXBjLyNzZXQtYXNzb2NpYXRlZC1yZW1vdGUtc3RyZWFtc1xyXG4gICAgICAgIGlmIChydHBSZWNlaXZlciAmJlxyXG4gICAgICAgICAgICAoZGlyZWN0aW9uID09PSAnc2VuZHJlY3YnIHx8IGRpcmVjdGlvbiA9PT0gJ3NlbmRvbmx5JykpIHtcclxuICAgICAgICAgIHRyYWNrID0gcnRwUmVjZWl2ZXIudHJhY2s7XHJcbiAgICAgICAgICBpZiAocmVtb3RlTXNpZCkge1xyXG4gICAgICAgICAgICBpZiAoIXN0cmVhbXNbcmVtb3RlTXNpZC5zdHJlYW1dKSB7XHJcbiAgICAgICAgICAgICAgc3RyZWFtc1tyZW1vdGVNc2lkLnN0cmVhbV0gPSBuZXcgd2luZG93Lk1lZGlhU3RyZWFtKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYWRkVHJhY2tUb1N0cmVhbUFuZEZpcmVFdmVudCh0cmFjaywgc3RyZWFtc1tyZW1vdGVNc2lkLnN0cmVhbV0pO1xyXG4gICAgICAgICAgICByZWNlaXZlckxpc3QucHVzaChbdHJhY2ssIHJ0cFJlY2VpdmVyLCBzdHJlYW1zW3JlbW90ZU1zaWQuc3RyZWFtXV0pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCFzdHJlYW1zLmRlZmF1bHQpIHtcclxuICAgICAgICAgICAgICBzdHJlYW1zLmRlZmF1bHQgPSBuZXcgd2luZG93Lk1lZGlhU3RyZWFtKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYWRkVHJhY2tUb1N0cmVhbUFuZEZpcmVFdmVudCh0cmFjaywgc3RyZWFtcy5kZWZhdWx0KTtcclxuICAgICAgICAgICAgcmVjZWl2ZXJMaXN0LnB1c2goW3RyYWNrLCBydHBSZWNlaXZlciwgc3RyZWFtcy5kZWZhdWx0XSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIEZJWE1FOiBhY3R1YWxseSB0aGUgcmVjZWl2ZXIgc2hvdWxkIGJlIGNyZWF0ZWQgbGF0ZXIuXHJcbiAgICAgICAgICBkZWxldGUgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAocGMuX2R0bHNSb2xlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgcGMuX2R0bHNSb2xlID0gZGVzY3JpcHRpb24udHlwZSA9PT0gJ29mZmVyJyA/ICdhY3RpdmUnIDogJ3Bhc3NpdmUnO1xyXG4gICAgfVxyXG5cclxuICAgIHBjLnJlbW90ZURlc2NyaXB0aW9uID0ge1xyXG4gICAgICB0eXBlOiBkZXNjcmlwdGlvbi50eXBlLFxyXG4gICAgICBzZHA6IGRlc2NyaXB0aW9uLnNkcFxyXG4gICAgfTtcclxuICAgIGlmIChkZXNjcmlwdGlvbi50eXBlID09PSAnb2ZmZXInKSB7XHJcbiAgICAgIHBjLl91cGRhdGVTaWduYWxpbmdTdGF0ZSgnaGF2ZS1yZW1vdGUtb2ZmZXInKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHBjLl91cGRhdGVTaWduYWxpbmdTdGF0ZSgnc3RhYmxlJyk7XHJcbiAgICB9XHJcbiAgICBPYmplY3Qua2V5cyhzdHJlYW1zKS5mb3JFYWNoKGZ1bmN0aW9uKHNpZCkge1xyXG4gICAgICB2YXIgc3RyZWFtID0gc3RyZWFtc1tzaWRdO1xyXG4gICAgICBpZiAoc3RyZWFtLmdldFRyYWNrcygpLmxlbmd0aCkge1xyXG4gICAgICAgIGlmIChwYy5yZW1vdGVTdHJlYW1zLmluZGV4T2Yoc3RyZWFtKSA9PT0gLTEpIHtcclxuICAgICAgICAgIHBjLnJlbW90ZVN0cmVhbXMucHVzaChzdHJlYW0pO1xyXG4gICAgICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdhZGRzdHJlYW0nKTtcclxuICAgICAgICAgIGV2ZW50LnN0cmVhbSA9IHN0cmVhbTtcclxuICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBwYy5fZGlzcGF0Y2hFdmVudCgnYWRkc3RyZWFtJywgZXZlbnQpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZWNlaXZlckxpc3QuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XHJcbiAgICAgICAgICB2YXIgdHJhY2sgPSBpdGVtWzBdO1xyXG4gICAgICAgICAgdmFyIHJlY2VpdmVyID0gaXRlbVsxXTtcclxuICAgICAgICAgIGlmIChzdHJlYW0uaWQgIT09IGl0ZW1bMl0uaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZmlyZUFkZFRyYWNrKHBjLCB0cmFjaywgcmVjZWl2ZXIsIFtzdHJlYW1dKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZWNlaXZlckxpc3QuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XHJcbiAgICAgIGlmIChpdGVtWzJdKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGZpcmVBZGRUcmFjayhwYywgaXRlbVswXSwgaXRlbVsxXSwgW10pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gY2hlY2sgd2hldGhlciBhZGRJY2VDYW5kaWRhdGUoe30pIHdhcyBjYWxsZWQgd2l0aGluIGZvdXIgc2Vjb25kcyBhZnRlclxyXG4gICAgLy8gc2V0UmVtb3RlRGVzY3JpcHRpb24uXHJcbiAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgaWYgKCEocGMgJiYgcGMudHJhbnNjZWl2ZXJzKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBwYy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xyXG4gICAgICAgIGlmICh0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQgJiZcclxuICAgICAgICAgICAgdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LnN0YXRlID09PSAnbmV3JyAmJlxyXG4gICAgICAgICAgICB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQuZ2V0UmVtb3RlQ2FuZGlkYXRlcygpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIGNvbnNvbGUud2FybignVGltZW91dCBmb3IgYWRkUmVtb3RlQ2FuZGlkYXRlLiBDb25zaWRlciBzZW5kaW5nICcgK1xyXG4gICAgICAgICAgICAgICdhbiBlbmQtb2YtY2FuZGlkYXRlcyBub3RpZmljYXRpb24nKTtcclxuICAgICAgICAgIHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydC5hZGRSZW1vdGVDYW5kaWRhdGUoe30pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9LCA0MDAwKTtcclxuXHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgfTtcclxuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLnRyYW5zY2VpdmVycy5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XHJcbiAgICAgIC8qIG5vdCB5ZXRcclxuICAgICAgaWYgKHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyKSB7XHJcbiAgICAgICAgdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIuY2xvc2UoKTtcclxuICAgICAgfVxyXG4gICAgICAqL1xyXG4gICAgICBpZiAodHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0KSB7XHJcbiAgICAgICAgdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LnN0b3AoKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydCkge1xyXG4gICAgICAgIHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQuc3RvcCgpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0cmFuc2NlaXZlci5ydHBTZW5kZXIpIHtcclxuICAgICAgICB0cmFuc2NlaXZlci5ydHBTZW5kZXIuc3RvcCgpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0cmFuc2NlaXZlci5ydHBSZWNlaXZlcikge1xyXG4gICAgICAgIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyLnN0b3AoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAvLyBGSVhNRTogY2xlYW4gdXAgdHJhY2tzLCBsb2NhbCBzdHJlYW1zLCByZW1vdGUgc3RyZWFtcywgZXRjXHJcbiAgICB0aGlzLl9pc0Nsb3NlZCA9IHRydWU7XHJcbiAgICB0aGlzLl91cGRhdGVTaWduYWxpbmdTdGF0ZSgnY2xvc2VkJyk7XHJcbiAgfTtcclxuXHJcbiAgLy8gVXBkYXRlIHRoZSBzaWduYWxpbmcgc3RhdGUuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl91cGRhdGVTaWduYWxpbmdTdGF0ZSA9IGZ1bmN0aW9uKG5ld1N0YXRlKSB7XHJcbiAgICB0aGlzLnNpZ25hbGluZ1N0YXRlID0gbmV3U3RhdGU7XHJcbiAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ3NpZ25hbGluZ3N0YXRlY2hhbmdlJyk7XHJcbiAgICB0aGlzLl9kaXNwYXRjaEV2ZW50KCdzaWduYWxpbmdzdGF0ZWNoYW5nZScsIGV2ZW50KTtcclxuICB9O1xyXG5cclxuICAvLyBEZXRlcm1pbmUgd2hldGhlciB0byBmaXJlIHRoZSBuZWdvdGlhdGlvbm5lZWRlZCBldmVudC5cclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX21heWJlRmlyZU5lZ290aWF0aW9uTmVlZGVkID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgaWYgKHRoaXMuc2lnbmFsaW5nU3RhdGUgIT09ICdzdGFibGUnIHx8IHRoaXMubmVlZE5lZ290aWF0aW9uID09PSB0cnVlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMubmVlZE5lZ290aWF0aW9uID0gdHJ1ZTtcclxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICBpZiAocGMubmVlZE5lZ290aWF0aW9uKSB7XHJcbiAgICAgICAgcGMubmVlZE5lZ290aWF0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCduZWdvdGlhdGlvbm5lZWRlZCcpO1xyXG4gICAgICAgIHBjLl9kaXNwYXRjaEV2ZW50KCduZWdvdGlhdGlvbm5lZWRlZCcsIGV2ZW50KTtcclxuICAgICAgfVxyXG4gICAgfSwgMCk7XHJcbiAgfTtcclxuXHJcbiAgLy8gVXBkYXRlIHRoZSBpY2UgY29ubmVjdGlvbiBzdGF0ZS5cclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX3VwZGF0ZUljZUNvbm5lY3Rpb25TdGF0ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIG5ld1N0YXRlO1xyXG4gICAgdmFyIHN0YXRlcyA9IHtcclxuICAgICAgJ25ldyc6IDAsXHJcbiAgICAgIGNsb3NlZDogMCxcclxuICAgICAgY2hlY2tpbmc6IDAsXHJcbiAgICAgIGNvbm5lY3RlZDogMCxcclxuICAgICAgY29tcGxldGVkOiAwLFxyXG4gICAgICBkaXNjb25uZWN0ZWQ6IDAsXHJcbiAgICAgIGZhaWxlZDogMFxyXG4gICAgfTtcclxuICAgIHRoaXMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcclxuICAgICAgc3RhdGVzW3RyYW5zY2VpdmVyLmljZVRyYW5zcG9ydC5zdGF0ZV0rKztcclxuICAgIH0pO1xyXG5cclxuICAgIG5ld1N0YXRlID0gJ25ldyc7XHJcbiAgICBpZiAoc3RhdGVzLmZhaWxlZCA+IDApIHtcclxuICAgICAgbmV3U3RhdGUgPSAnZmFpbGVkJztcclxuICAgIH0gZWxzZSBpZiAoc3RhdGVzLmNoZWNraW5nID4gMCkge1xyXG4gICAgICBuZXdTdGF0ZSA9ICdjaGVja2luZyc7XHJcbiAgICB9IGVsc2UgaWYgKHN0YXRlcy5kaXNjb25uZWN0ZWQgPiAwKSB7XHJcbiAgICAgIG5ld1N0YXRlID0gJ2Rpc2Nvbm5lY3RlZCc7XHJcbiAgICB9IGVsc2UgaWYgKHN0YXRlcy5uZXcgPiAwKSB7XHJcbiAgICAgIG5ld1N0YXRlID0gJ25ldyc7XHJcbiAgICB9IGVsc2UgaWYgKHN0YXRlcy5jb25uZWN0ZWQgPiAwKSB7XHJcbiAgICAgIG5ld1N0YXRlID0gJ2Nvbm5lY3RlZCc7XHJcbiAgICB9IGVsc2UgaWYgKHN0YXRlcy5jb21wbGV0ZWQgPiAwKSB7XHJcbiAgICAgIG5ld1N0YXRlID0gJ2NvbXBsZXRlZCc7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG5ld1N0YXRlICE9PSB0aGlzLmljZUNvbm5lY3Rpb25TdGF0ZSkge1xyXG4gICAgICB0aGlzLmljZUNvbm5lY3Rpb25TdGF0ZSA9IG5ld1N0YXRlO1xyXG4gICAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ2ljZWNvbm5lY3Rpb25zdGF0ZWNoYW5nZScpO1xyXG4gICAgICB0aGlzLl9kaXNwYXRjaEV2ZW50KCdpY2Vjb25uZWN0aW9uc3RhdGVjaGFuZ2UnLCBldmVudCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLy8gVXBkYXRlIHRoZSBjb25uZWN0aW9uIHN0YXRlLlxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fdXBkYXRlQ29ubmVjdGlvblN0YXRlID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgbmV3U3RhdGU7XHJcbiAgICB2YXIgc3RhdGVzID0ge1xyXG4gICAgICAnbmV3JzogMCxcclxuICAgICAgY2xvc2VkOiAwLFxyXG4gICAgICBjb25uZWN0aW5nOiAwLFxyXG4gICAgICBjb25uZWN0ZWQ6IDAsXHJcbiAgICAgIGNvbXBsZXRlZDogMCxcclxuICAgICAgZGlzY29ubmVjdGVkOiAwLFxyXG4gICAgICBmYWlsZWQ6IDBcclxuICAgIH07XHJcbiAgICB0aGlzLnRyYW5zY2VpdmVycy5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XHJcbiAgICAgIHN0YXRlc1t0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQuc3RhdGVdKys7XHJcbiAgICAgIHN0YXRlc1t0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0LnN0YXRlXSsrO1xyXG4gICAgfSk7XHJcbiAgICAvLyBJQ0VUcmFuc3BvcnQuY29tcGxldGVkIGFuZCBjb25uZWN0ZWQgYXJlIHRoZSBzYW1lIGZvciB0aGlzIHB1cnBvc2UuXHJcbiAgICBzdGF0ZXMuY29ubmVjdGVkICs9IHN0YXRlcy5jb21wbGV0ZWQ7XHJcblxyXG4gICAgbmV3U3RhdGUgPSAnbmV3JztcclxuICAgIGlmIChzdGF0ZXMuZmFpbGVkID4gMCkge1xyXG4gICAgICBuZXdTdGF0ZSA9ICdmYWlsZWQnO1xyXG4gICAgfSBlbHNlIGlmIChzdGF0ZXMuY29ubmVjdGluZyA+IDApIHtcclxuICAgICAgbmV3U3RhdGUgPSAnY29ubmVjdGluZyc7XHJcbiAgICB9IGVsc2UgaWYgKHN0YXRlcy5kaXNjb25uZWN0ZWQgPiAwKSB7XHJcbiAgICAgIG5ld1N0YXRlID0gJ2Rpc2Nvbm5lY3RlZCc7XHJcbiAgICB9IGVsc2UgaWYgKHN0YXRlcy5uZXcgPiAwKSB7XHJcbiAgICAgIG5ld1N0YXRlID0gJ25ldyc7XHJcbiAgICB9IGVsc2UgaWYgKHN0YXRlcy5jb25uZWN0ZWQgPiAwKSB7XHJcbiAgICAgIG5ld1N0YXRlID0gJ2Nvbm5lY3RlZCc7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG5ld1N0YXRlICE9PSB0aGlzLmNvbm5lY3Rpb25TdGF0ZSkge1xyXG4gICAgICB0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9IG5ld1N0YXRlO1xyXG4gICAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ2Nvbm5lY3Rpb25zdGF0ZWNoYW5nZScpO1xyXG4gICAgICB0aGlzLl9kaXNwYXRjaEV2ZW50KCdjb25uZWN0aW9uc3RhdGVjaGFuZ2UnLCBldmVudCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmNyZWF0ZU9mZmVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgcGMgPSB0aGlzO1xyXG5cclxuICAgIGlmIChwYy5faXNDbG9zZWQpIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG1ha2VFcnJvcignSW52YWxpZFN0YXRlRXJyb3InLFxyXG4gICAgICAgICAgJ0NhbiBub3QgY2FsbCBjcmVhdGVPZmZlciBhZnRlciBjbG9zZScpKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgbnVtQXVkaW9UcmFja3MgPSBwYy50cmFuc2NlaXZlcnMuZmlsdGVyKGZ1bmN0aW9uKHQpIHtcclxuICAgICAgcmV0dXJuIHQua2luZCA9PT0gJ2F1ZGlvJztcclxuICAgIH0pLmxlbmd0aDtcclxuICAgIHZhciBudW1WaWRlb1RyYWNrcyA9IHBjLnRyYW5zY2VpdmVycy5maWx0ZXIoZnVuY3Rpb24odCkge1xyXG4gICAgICByZXR1cm4gdC5raW5kID09PSAndmlkZW8nO1xyXG4gICAgfSkubGVuZ3RoO1xyXG5cclxuICAgIC8vIERldGVybWluZSBudW1iZXIgb2YgYXVkaW8gYW5kIHZpZGVvIHRyYWNrcyB3ZSBuZWVkIHRvIHNlbmQvcmVjdi5cclxuICAgIHZhciBvZmZlck9wdGlvbnMgPSBhcmd1bWVudHNbMF07XHJcbiAgICBpZiAob2ZmZXJPcHRpb25zKSB7XHJcbiAgICAgIC8vIFJlamVjdCBDaHJvbWUgbGVnYWN5IGNvbnN0cmFpbnRzLlxyXG4gICAgICBpZiAob2ZmZXJPcHRpb25zLm1hbmRhdG9yeSB8fCBvZmZlck9wdGlvbnMub3B0aW9uYWwpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxyXG4gICAgICAgICAgICAnTGVnYWN5IG1hbmRhdG9yeS9vcHRpb25hbCBjb25zdHJhaW50cyBub3Qgc3VwcG9ydGVkLicpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZUF1ZGlvID09PSB0cnVlKSB7XHJcbiAgICAgICAgICBudW1BdWRpb1RyYWNrcyA9IDE7XHJcbiAgICAgICAgfSBlbHNlIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgIG51bUF1ZGlvVHJhY2tzID0gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbnVtQXVkaW9UcmFja3MgPSBvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlVmlkZW8gPT09IHRydWUpIHtcclxuICAgICAgICAgIG51bVZpZGVvVHJhY2tzID0gMTtcclxuICAgICAgICB9IGVsc2UgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgbnVtVmlkZW9UcmFja3MgPSAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBudW1WaWRlb1RyYWNrcyA9IG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHBjLnRyYW5zY2VpdmVycy5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XHJcbiAgICAgIGlmICh0cmFuc2NlaXZlci5raW5kID09PSAnYXVkaW8nKSB7XHJcbiAgICAgICAgbnVtQXVkaW9UcmFja3MtLTtcclxuICAgICAgICBpZiAobnVtQXVkaW9UcmFja3MgPCAwKSB7XHJcbiAgICAgICAgICB0cmFuc2NlaXZlci53YW50UmVjZWl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICh0cmFuc2NlaXZlci5raW5kID09PSAndmlkZW8nKSB7XHJcbiAgICAgICAgbnVtVmlkZW9UcmFja3MtLTtcclxuICAgICAgICBpZiAobnVtVmlkZW9UcmFja3MgPCAwKSB7XHJcbiAgICAgICAgICB0cmFuc2NlaXZlci53YW50UmVjZWl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQ3JlYXRlIE0tbGluZXMgZm9yIHJlY3Zvbmx5IHN0cmVhbXMuXHJcbiAgICB3aGlsZSAobnVtQXVkaW9UcmFja3MgPiAwIHx8IG51bVZpZGVvVHJhY2tzID4gMCkge1xyXG4gICAgICBpZiAobnVtQXVkaW9UcmFja3MgPiAwKSB7XHJcbiAgICAgICAgcGMuX2NyZWF0ZVRyYW5zY2VpdmVyKCdhdWRpbycpO1xyXG4gICAgICAgIG51bUF1ZGlvVHJhY2tzLS07XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG51bVZpZGVvVHJhY2tzID4gMCkge1xyXG4gICAgICAgIHBjLl9jcmVhdGVUcmFuc2NlaXZlcigndmlkZW8nKTtcclxuICAgICAgICBudW1WaWRlb1RyYWNrcy0tO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHNkcCA9IFNEUFV0aWxzLndyaXRlU2Vzc2lvbkJvaWxlcnBsYXRlKHBjLl9zZHBTZXNzaW9uSWQsXHJcbiAgICAgICAgcGMuX3NkcFNlc3Npb25WZXJzaW9uKyspO1xyXG4gICAgcGMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIsIHNkcE1MaW5lSW5kZXgpIHtcclxuICAgICAgLy8gRm9yIGVhY2ggdHJhY2ssIGNyZWF0ZSBhbiBpY2UgZ2F0aGVyZXIsIGljZSB0cmFuc3BvcnQsXHJcbiAgICAgIC8vIGR0bHMgdHJhbnNwb3J0LCBwb3RlbnRpYWxseSBydHBzZW5kZXIgYW5kIHJ0cHJlY2VpdmVyLlxyXG4gICAgICB2YXIgdHJhY2sgPSB0cmFuc2NlaXZlci50cmFjaztcclxuICAgICAgdmFyIGtpbmQgPSB0cmFuc2NlaXZlci5raW5kO1xyXG4gICAgICB2YXIgbWlkID0gdHJhbnNjZWl2ZXIubWlkIHx8IFNEUFV0aWxzLmdlbmVyYXRlSWRlbnRpZmllcigpO1xyXG4gICAgICB0cmFuc2NlaXZlci5taWQgPSBtaWQ7XHJcblxyXG4gICAgICBpZiAoIXRyYW5zY2VpdmVyLmljZUdhdGhlcmVyKSB7XHJcbiAgICAgICAgdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIgPSBwYy5fY3JlYXRlSWNlR2F0aGVyZXIoc2RwTUxpbmVJbmRleCxcclxuICAgICAgICAgICAgcGMudXNpbmdCdW5kbGUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgbG9jYWxDYXBhYmlsaXRpZXMgPSB3aW5kb3cuUlRDUnRwU2VuZGVyLmdldENhcGFiaWxpdGllcyhraW5kKTtcclxuICAgICAgLy8gZmlsdGVyIFJUWCB1bnRpbCBhZGRpdGlvbmFsIHN0dWZmIG5lZWRlZCBmb3IgUlRYIGlzIGltcGxlbWVudGVkXHJcbiAgICAgIC8vIGluIGFkYXB0ZXIuanNcclxuICAgICAgaWYgKGVkZ2VWZXJzaW9uIDwgMTUwMTkpIHtcclxuICAgICAgICBsb2NhbENhcGFiaWxpdGllcy5jb2RlY3MgPSBsb2NhbENhcGFiaWxpdGllcy5jb2RlY3MuZmlsdGVyKFxyXG4gICAgICAgICAgICBmdW5jdGlvbihjb2RlYykge1xyXG4gICAgICAgICAgICAgIHJldHVybiBjb2RlYy5uYW1lICE9PSAncnR4JztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgbG9jYWxDYXBhYmlsaXRpZXMuY29kZWNzLmZvckVhY2goZnVuY3Rpb24oY29kZWMpIHtcclxuICAgICAgICAvLyB3b3JrIGFyb3VuZCBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3Avd2VicnRjL2lzc3Vlcy9kZXRhaWw/aWQ9NjU1MlxyXG4gICAgICAgIC8vIGJ5IGFkZGluZyBsZXZlbC1hc3ltbWV0cnktYWxsb3dlZD0xXHJcbiAgICAgICAgaWYgKGNvZGVjLm5hbWUgPT09ICdIMjY0JyAmJlxyXG4gICAgICAgICAgICBjb2RlYy5wYXJhbWV0ZXJzWydsZXZlbC1hc3ltbWV0cnktYWxsb3dlZCddID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIGNvZGVjLnBhcmFtZXRlcnNbJ2xldmVsLWFzeW1tZXRyeS1hbGxvd2VkJ10gPSAnMSc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBmb3Igc3Vic2VxdWVudCBvZmZlcnMsIHdlIG1pZ2h0IGhhdmUgdG8gcmUtdXNlIHRoZSBwYXlsb2FkXHJcbiAgICAgICAgLy8gdHlwZSBvZiB0aGUgbGFzdCBvZmZlci5cclxuICAgICAgICBpZiAodHJhbnNjZWl2ZXIucmVtb3RlQ2FwYWJpbGl0aWVzICYmXHJcbiAgICAgICAgICAgIHRyYW5zY2VpdmVyLnJlbW90ZUNhcGFiaWxpdGllcy5jb2RlY3MpIHtcclxuICAgICAgICAgIHRyYW5zY2VpdmVyLnJlbW90ZUNhcGFiaWxpdGllcy5jb2RlY3MuZm9yRWFjaChmdW5jdGlvbihyZW1vdGVDb2RlYykge1xyXG4gICAgICAgICAgICBpZiAoY29kZWMubmFtZS50b0xvd2VyQ2FzZSgpID09PSByZW1vdGVDb2RlYy5uYW1lLnRvTG93ZXJDYXNlKCkgJiZcclxuICAgICAgICAgICAgICAgIGNvZGVjLmNsb2NrUmF0ZSA9PT0gcmVtb3RlQ29kZWMuY2xvY2tSYXRlKSB7XHJcbiAgICAgICAgICAgICAgY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGUgPSByZW1vdGVDb2RlYy5wYXlsb2FkVHlwZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgbG9jYWxDYXBhYmlsaXRpZXMuaGVhZGVyRXh0ZW5zaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGhkckV4dCkge1xyXG4gICAgICAgIHZhciByZW1vdGVFeHRlbnNpb25zID0gdHJhbnNjZWl2ZXIucmVtb3RlQ2FwYWJpbGl0aWVzICYmXHJcbiAgICAgICAgICAgIHRyYW5zY2VpdmVyLnJlbW90ZUNhcGFiaWxpdGllcy5oZWFkZXJFeHRlbnNpb25zIHx8IFtdO1xyXG4gICAgICAgIHJlbW90ZUV4dGVuc2lvbnMuZm9yRWFjaChmdW5jdGlvbihySGRyRXh0KSB7XHJcbiAgICAgICAgICBpZiAoaGRyRXh0LnVyaSA9PT0gckhkckV4dC51cmkpIHtcclxuICAgICAgICAgICAgaGRyRXh0LmlkID0gckhkckV4dC5pZDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBnZW5lcmF0ZSBhbiBzc3JjIG5vdywgdG8gYmUgdXNlZCBsYXRlciBpbiBydHBTZW5kZXIuc2VuZFxyXG4gICAgICB2YXIgc2VuZEVuY29kaW5nUGFyYW1ldGVycyA9IHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnMgfHwgW3tcclxuICAgICAgICBzc3JjOiAoMiAqIHNkcE1MaW5lSW5kZXggKyAxKSAqIDEwMDFcclxuICAgICAgfV07XHJcbiAgICAgIGlmICh0cmFjaykge1xyXG4gICAgICAgIC8vIGFkZCBSVFhcclxuICAgICAgICBpZiAoZWRnZVZlcnNpb24gPj0gMTUwMTkgJiYga2luZCA9PT0gJ3ZpZGVvJyAmJlxyXG4gICAgICAgICAgICAhc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHgpIHtcclxuICAgICAgICAgIHNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4ID0ge1xyXG4gICAgICAgICAgICBzc3JjOiBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmMgKyAxXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRyYW5zY2VpdmVyLndhbnRSZWNlaXZlKSB7XHJcbiAgICAgICAgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIgPSBuZXcgd2luZG93LlJUQ1J0cFJlY2VpdmVyKFxyXG4gICAgICAgICAgICB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0LCBraW5kKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdHJhbnNjZWl2ZXIubG9jYWxDYXBhYmlsaXRpZXMgPSBsb2NhbENhcGFiaWxpdGllcztcclxuICAgICAgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVycyA9IHNlbmRFbmNvZGluZ1BhcmFtZXRlcnM7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBhbHdheXMgb2ZmZXIgQlVORExFIGFuZCBkaXNwb3NlIG9uIHJldHVybiBpZiBub3Qgc3VwcG9ydGVkLlxyXG4gICAgaWYgKHBjLl9jb25maWcuYnVuZGxlUG9saWN5ICE9PSAnbWF4LWNvbXBhdCcpIHtcclxuICAgICAgc2RwICs9ICdhPWdyb3VwOkJVTkRMRSAnICsgcGMudHJhbnNjZWl2ZXJzLm1hcChmdW5jdGlvbih0KSB7XHJcbiAgICAgICAgcmV0dXJuIHQubWlkO1xyXG4gICAgICB9KS5qb2luKCcgJykgKyAnXFxyXFxuJztcclxuICAgIH1cclxuICAgIHNkcCArPSAnYT1pY2Utb3B0aW9uczp0cmlja2xlXFxyXFxuJztcclxuXHJcbiAgICBwYy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlciwgc2RwTUxpbmVJbmRleCkge1xyXG4gICAgICBzZHAgKz0gd3JpdGVNZWRpYVNlY3Rpb24odHJhbnNjZWl2ZXIsIHRyYW5zY2VpdmVyLmxvY2FsQ2FwYWJpbGl0aWVzLFxyXG4gICAgICAgICAgJ29mZmVyJywgdHJhbnNjZWl2ZXIuc3RyZWFtLCBwYy5fZHRsc1JvbGUpO1xyXG4gICAgICBzZHAgKz0gJ2E9cnRjcC1yc2l6ZVxcclxcbic7XHJcblxyXG4gICAgICBpZiAodHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIgJiYgcGMuaWNlR2F0aGVyaW5nU3RhdGUgIT09ICduZXcnICYmXHJcbiAgICAgICAgICAoc2RwTUxpbmVJbmRleCA9PT0gMCB8fCAhcGMudXNpbmdCdW5kbGUpKSB7XHJcbiAgICAgICAgdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIuZ2V0TG9jYWxDYW5kaWRhdGVzKCkuZm9yRWFjaChmdW5jdGlvbihjYW5kKSB7XHJcbiAgICAgICAgICBjYW5kLmNvbXBvbmVudCA9IDE7XHJcbiAgICAgICAgICBzZHAgKz0gJ2E9JyArIFNEUFV0aWxzLndyaXRlQ2FuZGlkYXRlKGNhbmQpICsgJ1xcclxcbic7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICh0cmFuc2NlaXZlci5pY2VHYXRoZXJlci5zdGF0ZSA9PT0gJ2NvbXBsZXRlZCcpIHtcclxuICAgICAgICAgIHNkcCArPSAnYT1lbmQtb2YtY2FuZGlkYXRlc1xcclxcbic7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgZGVzYyA9IG5ldyB3aW5kb3cuUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKHtcclxuICAgICAgdHlwZTogJ29mZmVyJyxcclxuICAgICAgc2RwOiBzZHBcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShkZXNjKTtcclxuICB9O1xyXG5cclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlQW5zd2VyID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgcGMgPSB0aGlzO1xyXG5cclxuICAgIGlmIChwYy5faXNDbG9zZWQpIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG1ha2VFcnJvcignSW52YWxpZFN0YXRlRXJyb3InLFxyXG4gICAgICAgICAgJ0NhbiBub3QgY2FsbCBjcmVhdGVBbnN3ZXIgYWZ0ZXIgY2xvc2UnKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCEocGMuc2lnbmFsaW5nU3RhdGUgPT09ICdoYXZlLXJlbW90ZS1vZmZlcicgfHxcclxuICAgICAgICBwYy5zaWduYWxpbmdTdGF0ZSA9PT0gJ2hhdmUtbG9jYWwtcHJhbnN3ZXInKSkge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobWFrZUVycm9yKCdJbnZhbGlkU3RhdGVFcnJvcicsXHJcbiAgICAgICAgICAnQ2FuIG5vdCBjYWxsIGNyZWF0ZUFuc3dlciBpbiBzaWduYWxpbmdTdGF0ZSAnICsgcGMuc2lnbmFsaW5nU3RhdGUpKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgc2RwID0gU0RQVXRpbHMud3JpdGVTZXNzaW9uQm9pbGVycGxhdGUocGMuX3NkcFNlc3Npb25JZCxcclxuICAgICAgICBwYy5fc2RwU2Vzc2lvblZlcnNpb24rKyk7XHJcbiAgICBpZiAocGMudXNpbmdCdW5kbGUpIHtcclxuICAgICAgc2RwICs9ICdhPWdyb3VwOkJVTkRMRSAnICsgcGMudHJhbnNjZWl2ZXJzLm1hcChmdW5jdGlvbih0KSB7XHJcbiAgICAgICAgcmV0dXJuIHQubWlkO1xyXG4gICAgICB9KS5qb2luKCcgJykgKyAnXFxyXFxuJztcclxuICAgIH1cclxuICAgIHZhciBtZWRpYVNlY3Rpb25zSW5PZmZlciA9IFNEUFV0aWxzLmdldE1lZGlhU2VjdGlvbnMoXHJcbiAgICAgICAgcGMucmVtb3RlRGVzY3JpcHRpb24uc2RwKS5sZW5ndGg7XHJcbiAgICBwYy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlciwgc2RwTUxpbmVJbmRleCkge1xyXG4gICAgICBpZiAoc2RwTUxpbmVJbmRleCArIDEgPiBtZWRpYVNlY3Rpb25zSW5PZmZlcikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBpZiAodHJhbnNjZWl2ZXIucmVqZWN0ZWQpIHtcclxuICAgICAgICBpZiAodHJhbnNjZWl2ZXIua2luZCA9PT0gJ2FwcGxpY2F0aW9uJykge1xyXG4gICAgICAgICAgc2RwICs9ICdtPWFwcGxpY2F0aW9uIDAgRFRMUy9TQ1RQIDUwMDBcXHJcXG4nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIua2luZCA9PT0gJ2F1ZGlvJykge1xyXG4gICAgICAgICAgc2RwICs9ICdtPWF1ZGlvIDAgVURQL1RMUy9SVFAvU0FWUEYgMFxcclxcbicgK1xyXG4gICAgICAgICAgICAgICdhPXJ0cG1hcDowIFBDTVUvODAwMFxcclxcbic7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0cmFuc2NlaXZlci5raW5kID09PSAndmlkZW8nKSB7XHJcbiAgICAgICAgICBzZHAgKz0gJ209dmlkZW8gMCBVRFAvVExTL1JUUC9TQVZQRiAxMjBcXHJcXG4nICtcclxuICAgICAgICAgICAgICAnYT1ydHBtYXA6MTIwIFZQOC85MDAwMFxcclxcbic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNkcCArPSAnYz1JTiBJUDQgMC4wLjAuMFxcclxcbicgK1xyXG4gICAgICAgICAgICAnYT1pbmFjdGl2ZVxcclxcbicgK1xyXG4gICAgICAgICAgICAnYT1taWQ6JyArIHRyYW5zY2VpdmVyLm1pZCArICdcXHJcXG4nO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gRklYTUU6IGxvb2sgYXQgZGlyZWN0aW9uLlxyXG4gICAgICBpZiAodHJhbnNjZWl2ZXIuc3RyZWFtKSB7XHJcbiAgICAgICAgdmFyIGxvY2FsVHJhY2s7XHJcbiAgICAgICAgaWYgKHRyYW5zY2VpdmVyLmtpbmQgPT09ICdhdWRpbycpIHtcclxuICAgICAgICAgIGxvY2FsVHJhY2sgPSB0cmFuc2NlaXZlci5zdHJlYW0uZ2V0QXVkaW9UcmFja3MoKVswXTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLmtpbmQgPT09ICd2aWRlbycpIHtcclxuICAgICAgICAgIGxvY2FsVHJhY2sgPSB0cmFuc2NlaXZlci5zdHJlYW0uZ2V0VmlkZW9UcmFja3MoKVswXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxvY2FsVHJhY2spIHtcclxuICAgICAgICAgIC8vIGFkZCBSVFhcclxuICAgICAgICAgIGlmIChlZGdlVmVyc2lvbiA+PSAxNTAxOSAmJiB0cmFuc2NlaXZlci5raW5kID09PSAndmlkZW8nICYmXHJcbiAgICAgICAgICAgICAgIXRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4KSB7XHJcbiAgICAgICAgICAgIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4ID0ge1xyXG4gICAgICAgICAgICAgIHNzcmM6IHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYyArIDFcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIENhbGN1bGF0ZSBpbnRlcnNlY3Rpb24gb2YgY2FwYWJpbGl0aWVzLlxyXG4gICAgICB2YXIgY29tbW9uQ2FwYWJpbGl0aWVzID0gZ2V0Q29tbW9uQ2FwYWJpbGl0aWVzKFxyXG4gICAgICAgICAgdHJhbnNjZWl2ZXIubG9jYWxDYXBhYmlsaXRpZXMsXHJcbiAgICAgICAgICB0cmFuc2NlaXZlci5yZW1vdGVDYXBhYmlsaXRpZXMpO1xyXG5cclxuICAgICAgdmFyIGhhc1J0eCA9IGNvbW1vbkNhcGFiaWxpdGllcy5jb2RlY3MuZmlsdGVyKGZ1bmN0aW9uKGMpIHtcclxuICAgICAgICByZXR1cm4gYy5uYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdydHgnO1xyXG4gICAgICB9KS5sZW5ndGg7XHJcbiAgICAgIGlmICghaGFzUnR4ICYmIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4KSB7XHJcbiAgICAgICAgZGVsZXRlIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZHAgKz0gd3JpdGVNZWRpYVNlY3Rpb24odHJhbnNjZWl2ZXIsIGNvbW1vbkNhcGFiaWxpdGllcyxcclxuICAgICAgICAgICdhbnN3ZXInLCB0cmFuc2NlaXZlci5zdHJlYW0sIHBjLl9kdGxzUm9sZSk7XHJcbiAgICAgIGlmICh0cmFuc2NlaXZlci5ydGNwUGFyYW1ldGVycyAmJlxyXG4gICAgICAgICAgdHJhbnNjZWl2ZXIucnRjcFBhcmFtZXRlcnMucmVkdWNlZFNpemUpIHtcclxuICAgICAgICBzZHAgKz0gJ2E9cnRjcC1yc2l6ZVxcclxcbic7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBkZXNjID0gbmV3IHdpbmRvdy5SVENTZXNzaW9uRGVzY3JpcHRpb24oe1xyXG4gICAgICB0eXBlOiAnYW5zd2VyJyxcclxuICAgICAgc2RwOiBzZHBcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShkZXNjKTtcclxuICB9O1xyXG5cclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkSWNlQ2FuZGlkYXRlID0gZnVuY3Rpb24oY2FuZGlkYXRlKSB7XHJcbiAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgdmFyIHNlY3Rpb25zO1xyXG4gICAgaWYgKGNhbmRpZGF0ZSAmJiAhKGNhbmRpZGF0ZS5zZHBNTGluZUluZGV4ICE9PSB1bmRlZmluZWQgfHxcclxuICAgICAgICBjYW5kaWRhdGUuc2RwTWlkKSkge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFR5cGVFcnJvcignc2RwTUxpbmVJbmRleCBvciBzZHBNaWQgcmVxdWlyZWQnKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVE9ETzogbmVlZHMgdG8gZ28gaW50byBvcHMgcXVldWUuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgIGlmICghcGMucmVtb3RlRGVzY3JpcHRpb24pIHtcclxuICAgICAgICByZXR1cm4gcmVqZWN0KG1ha2VFcnJvcignSW52YWxpZFN0YXRlRXJyb3InLFxyXG4gICAgICAgICAgICAnQ2FuIG5vdCBhZGQgSUNFIGNhbmRpZGF0ZSB3aXRob3V0IGEgcmVtb3RlIGRlc2NyaXB0aW9uJykpO1xyXG4gICAgICB9IGVsc2UgaWYgKCFjYW5kaWRhdGUgfHwgY2FuZGlkYXRlLmNhbmRpZGF0ZSA9PT0gJycpIHtcclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHBjLnRyYW5zY2VpdmVycy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgaWYgKHBjLnRyYW5zY2VpdmVyc1tqXS5yZWplY3RlZCkge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1tqXS5pY2VUcmFuc3BvcnQuYWRkUmVtb3RlQ2FuZGlkYXRlKHt9KTtcclxuICAgICAgICAgIHNlY3Rpb25zID0gU0RQVXRpbHMuZ2V0TWVkaWFTZWN0aW9ucyhwYy5yZW1vdGVEZXNjcmlwdGlvbi5zZHApO1xyXG4gICAgICAgICAgc2VjdGlvbnNbal0gKz0gJ2E9ZW5kLW9mLWNhbmRpZGF0ZXNcXHJcXG4nO1xyXG4gICAgICAgICAgcGMucmVtb3RlRGVzY3JpcHRpb24uc2RwID1cclxuICAgICAgICAgICAgICBTRFBVdGlscy5nZXREZXNjcmlwdGlvbihwYy5yZW1vdGVEZXNjcmlwdGlvbi5zZHApICtcclxuICAgICAgICAgICAgICBzZWN0aW9ucy5qb2luKCcnKTtcclxuICAgICAgICAgIGlmIChwYy51c2luZ0J1bmRsZSkge1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIHNkcE1MaW5lSW5kZXggPSBjYW5kaWRhdGUuc2RwTUxpbmVJbmRleDtcclxuICAgICAgICBpZiAoY2FuZGlkYXRlLnNkcE1pZCkge1xyXG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYy50cmFuc2NlaXZlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHBjLnRyYW5zY2VpdmVyc1tpXS5taWQgPT09IGNhbmRpZGF0ZS5zZHBNaWQpIHtcclxuICAgICAgICAgICAgICBzZHBNTGluZUluZGV4ID0gaTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgdHJhbnNjZWl2ZXIgPSBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF07XHJcbiAgICAgICAgaWYgKHRyYW5zY2VpdmVyKSB7XHJcbiAgICAgICAgICBpZiAodHJhbnNjZWl2ZXIucmVqZWN0ZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHZhciBjYW5kID0gT2JqZWN0LmtleXMoY2FuZGlkYXRlLmNhbmRpZGF0ZSkubGVuZ3RoID4gMCA/XHJcbiAgICAgICAgICAgICAgU0RQVXRpbHMucGFyc2VDYW5kaWRhdGUoY2FuZGlkYXRlLmNhbmRpZGF0ZSkgOiB7fTtcclxuICAgICAgICAgIC8vIElnbm9yZSBDaHJvbWUncyBpbnZhbGlkIGNhbmRpZGF0ZXMgc2luY2UgRWRnZSBkb2VzIG5vdCBsaWtlIHRoZW0uXHJcbiAgICAgICAgICBpZiAoY2FuZC5wcm90b2NvbCA9PT0gJ3RjcCcgJiYgKGNhbmQucG9ydCA9PT0gMCB8fCBjYW5kLnBvcnQgPT09IDkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAvLyBJZ25vcmUgUlRDUCBjYW5kaWRhdGVzLCB3ZSBhc3N1bWUgUlRDUC1NVVguXHJcbiAgICAgICAgICBpZiAoY2FuZC5jb21wb25lbnQgJiYgY2FuZC5jb21wb25lbnQgIT09IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIC8vIHdoZW4gdXNpbmcgYnVuZGxlLCBhdm9pZCBhZGRpbmcgY2FuZGlkYXRlcyB0byB0aGUgd3JvbmdcclxuICAgICAgICAgIC8vIGljZSB0cmFuc3BvcnQuIEFuZCBhdm9pZCBhZGRpbmcgY2FuZGlkYXRlcyBhZGRlZCBpbiB0aGUgU0RQLlxyXG4gICAgICAgICAgaWYgKHNkcE1MaW5lSW5kZXggPT09IDAgfHwgKHNkcE1MaW5lSW5kZXggPiAwICYmXHJcbiAgICAgICAgICAgICAgdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0ICE9PSBwYy50cmFuc2NlaXZlcnNbMF0uaWNlVHJhbnNwb3J0KSkge1xyXG4gICAgICAgICAgICBpZiAoIW1heWJlQWRkQ2FuZGlkYXRlKHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydCwgY2FuZCkpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KG1ha2VFcnJvcignT3BlcmF0aW9uRXJyb3InLFxyXG4gICAgICAgICAgICAgICAgICAnQ2FuIG5vdCBhZGQgSUNFIGNhbmRpZGF0ZScpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgcmVtb3RlRGVzY3JpcHRpb24uXHJcbiAgICAgICAgICB2YXIgY2FuZGlkYXRlU3RyaW5nID0gY2FuZGlkYXRlLmNhbmRpZGF0ZS50cmltKCk7XHJcbiAgICAgICAgICBpZiAoY2FuZGlkYXRlU3RyaW5nLmluZGV4T2YoJ2E9JykgPT09IDApIHtcclxuICAgICAgICAgICAgY2FuZGlkYXRlU3RyaW5nID0gY2FuZGlkYXRlU3RyaW5nLnN1YnN0cigyKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHNlY3Rpb25zID0gU0RQVXRpbHMuZ2V0TWVkaWFTZWN0aW9ucyhwYy5yZW1vdGVEZXNjcmlwdGlvbi5zZHApO1xyXG4gICAgICAgICAgc2VjdGlvbnNbc2RwTUxpbmVJbmRleF0gKz0gJ2E9JyArXHJcbiAgICAgICAgICAgICAgKGNhbmQudHlwZSA/IGNhbmRpZGF0ZVN0cmluZyA6ICdlbmQtb2YtY2FuZGlkYXRlcycpXHJcbiAgICAgICAgICAgICAgKyAnXFxyXFxuJztcclxuICAgICAgICAgIHBjLnJlbW90ZURlc2NyaXB0aW9uLnNkcCA9XHJcbiAgICAgICAgICAgICAgU0RQVXRpbHMuZ2V0RGVzY3JpcHRpb24ocGMucmVtb3RlRGVzY3JpcHRpb24uc2RwKSArXHJcbiAgICAgICAgICAgICAgc2VjdGlvbnMuam9pbignJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiByZWplY3QobWFrZUVycm9yKCdPcGVyYXRpb25FcnJvcicsXHJcbiAgICAgICAgICAgICAgJ0NhbiBub3QgYWRkIElDRSBjYW5kaWRhdGUnKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJlc29sdmUoKTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTdGF0cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHByb21pc2VzID0gW107XHJcbiAgICB0aGlzLnRyYW5zY2VpdmVycy5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XHJcbiAgICAgIFsncnRwU2VuZGVyJywgJ3J0cFJlY2VpdmVyJywgJ2ljZUdhdGhlcmVyJywgJ2ljZVRyYW5zcG9ydCcsXHJcbiAgICAgICAgICAnZHRsc1RyYW5zcG9ydCddLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XHJcbiAgICAgICAgICAgIGlmICh0cmFuc2NlaXZlclttZXRob2RdKSB7XHJcbiAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaCh0cmFuc2NlaXZlclttZXRob2RdLmdldFN0YXRzKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgdmFyIGZpeFN0YXRzVHlwZSA9IGZ1bmN0aW9uKHN0YXQpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBpbmJvdW5kcnRwOiAnaW5ib3VuZC1ydHAnLFxyXG4gICAgICAgIG91dGJvdW5kcnRwOiAnb3V0Ym91bmQtcnRwJyxcclxuICAgICAgICBjYW5kaWRhdGVwYWlyOiAnY2FuZGlkYXRlLXBhaXInLFxyXG4gICAgICAgIGxvY2FsY2FuZGlkYXRlOiAnbG9jYWwtY2FuZGlkYXRlJyxcclxuICAgICAgICByZW1vdGVjYW5kaWRhdGU6ICdyZW1vdGUtY2FuZGlkYXRlJ1xyXG4gICAgICB9W3N0YXQudHlwZV0gfHwgc3RhdC50eXBlO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XHJcbiAgICAgIC8vIHNoaW0gZ2V0U3RhdHMgd2l0aCBtYXBsaWtlIHN1cHBvcnRcclxuICAgICAgdmFyIHJlc3VsdHMgPSBuZXcgTWFwKCk7XHJcbiAgICAgIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgIHJlcy5mb3JFYWNoKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgT2JqZWN0LmtleXMocmVzdWx0KS5mb3JFYWNoKGZ1bmN0aW9uKGlkKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdFtpZF0udHlwZSA9IGZpeFN0YXRzVHlwZShyZXN1bHRbaWRdKTtcclxuICAgICAgICAgICAgcmVzdWx0cy5zZXQoaWQsIHJlc3VsdFtpZF0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmVzb2x2ZShyZXN1bHRzKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICAvLyBsZWdhY3kgY2FsbGJhY2sgc2hpbXMuIFNob3VsZCBiZSBtb3ZlZCB0byBhZGFwdGVyLmpzIHNvbWUgZGF5cy5cclxuICB2YXIgbWV0aG9kcyA9IFsnY3JlYXRlT2ZmZXInLCAnY3JlYXRlQW5zd2VyJ107XHJcbiAgbWV0aG9kcy5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xyXG4gICAgdmFyIG5hdGl2ZU1ldGhvZCA9IFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdO1xyXG4gICAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XHJcbiAgICAgIGlmICh0eXBlb2YgYXJnc1swXSA9PT0gJ2Z1bmN0aW9uJyB8fFxyXG4gICAgICAgICAgdHlwZW9mIGFyZ3NbMV0gPT09ICdmdW5jdGlvbicpIHsgLy8gbGVnYWN5XHJcbiAgICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseSh0aGlzLCBbYXJndW1lbnRzWzJdXSlcclxuICAgICAgICAudGhlbihmdW5jdGlvbihkZXNjcmlwdGlvbikge1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBhcmdzWzBdID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIGFyZ3NbMF0uYXBwbHkobnVsbCwgW2Rlc2NyaXB0aW9uXSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcclxuICAgICAgICAgIGlmICh0eXBlb2YgYXJnc1sxXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICBhcmdzWzFdLmFwcGx5KG51bGwsIFtlcnJvcl0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIH07XHJcbiAgfSk7XHJcblxyXG4gIG1ldGhvZHMgPSBbJ3NldExvY2FsRGVzY3JpcHRpb24nLCAnc2V0UmVtb3RlRGVzY3JpcHRpb24nLCAnYWRkSWNlQ2FuZGlkYXRlJ107XHJcbiAgbWV0aG9kcy5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xyXG4gICAgdmFyIG5hdGl2ZU1ldGhvZCA9IFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdO1xyXG4gICAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XHJcbiAgICAgIGlmICh0eXBlb2YgYXJnc1sxXSA9PT0gJ2Z1bmN0aW9uJyB8fFxyXG4gICAgICAgICAgdHlwZW9mIGFyZ3NbMl0gPT09ICdmdW5jdGlvbicpIHsgLy8gbGVnYWN5XHJcbiAgICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIGFyZ3NbMV0gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgYXJnc1sxXS5hcHBseShudWxsKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBhcmdzWzJdID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIGFyZ3NbMl0uYXBwbHkobnVsbCwgW2Vycm9yXSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgfTtcclxuICB9KTtcclxuXHJcbiAgLy8gZ2V0U3RhdHMgaXMgc3BlY2lhbC4gSXQgZG9lc24ndCBoYXZlIGEgc3BlYyBsZWdhY3kgbWV0aG9kIHlldCB3ZSBzdXBwb3J0XHJcbiAgLy8gZ2V0U3RhdHMoc29tZXRoaW5nLCBjYikgd2l0aG91dCBlcnJvciBjYWxsYmFja3MuXHJcbiAgWydnZXRTdGF0cyddLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XHJcbiAgICB2YXIgbmF0aXZlTWV0aG9kID0gUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF07XHJcbiAgICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcclxuICAgICAgaWYgKHR5cGVvZiBhcmdzWzFdID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIGFyZ3NbMV0gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgYXJnc1sxXS5hcHBseShudWxsKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gUlRDUGVlckNvbm5lY3Rpb247XHJcbn07XHJcblxyXG59LHtcInNkcFwiOjJ9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG4vLyBTRFAgaGVscGVycy5cclxudmFyIFNEUFV0aWxzID0ge307XHJcblxyXG4vLyBHZW5lcmF0ZSBhbiBhbHBoYW51bWVyaWMgaWRlbnRpZmllciBmb3IgY25hbWUgb3IgbWlkcy5cclxuLy8gVE9ETzogdXNlIFVVSURzIGluc3RlYWQ/IGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2plZC85ODI4ODNcclxuU0RQVXRpbHMuZ2VuZXJhdGVJZGVudGlmaWVyID0gZnVuY3Rpb24oKSB7XHJcbiAgcmV0dXJuIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCAxMCk7XHJcbn07XHJcblxyXG4vLyBUaGUgUlRDUCBDTkFNRSB1c2VkIGJ5IGFsbCBwZWVyY29ubmVjdGlvbnMgZnJvbSB0aGUgc2FtZSBKUy5cclxuU0RQVXRpbHMubG9jYWxDTmFtZSA9IFNEUFV0aWxzLmdlbmVyYXRlSWRlbnRpZmllcigpO1xyXG5cclxuLy8gU3BsaXRzIFNEUCBpbnRvIGxpbmVzLCBkZWFsaW5nIHdpdGggYm90aCBDUkxGIGFuZCBMRi5cclxuU0RQVXRpbHMuc3BsaXRMaW5lcyA9IGZ1bmN0aW9uKGJsb2IpIHtcclxuICByZXR1cm4gYmxvYi50cmltKCkuc3BsaXQoJ1xcbicpLm1hcChmdW5jdGlvbihsaW5lKSB7XHJcbiAgICByZXR1cm4gbGluZS50cmltKCk7XHJcbiAgfSk7XHJcbn07XHJcbi8vIFNwbGl0cyBTRFAgaW50byBzZXNzaW9ucGFydCBhbmQgbWVkaWFzZWN0aW9ucy4gRW5zdXJlcyBDUkxGLlxyXG5TRFBVdGlscy5zcGxpdFNlY3Rpb25zID0gZnVuY3Rpb24oYmxvYikge1xyXG4gIHZhciBwYXJ0cyA9IGJsb2Iuc3BsaXQoJ1xcbm09Jyk7XHJcbiAgcmV0dXJuIHBhcnRzLm1hcChmdW5jdGlvbihwYXJ0LCBpbmRleCkge1xyXG4gICAgcmV0dXJuIChpbmRleCA+IDAgPyAnbT0nICsgcGFydCA6IHBhcnQpLnRyaW0oKSArICdcXHJcXG4nO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuLy8gcmV0dXJucyB0aGUgc2Vzc2lvbiBkZXNjcmlwdGlvbi5cclxuU0RQVXRpbHMuZ2V0RGVzY3JpcHRpb24gPSBmdW5jdGlvbihibG9iKSB7XHJcbiAgdmFyIHNlY3Rpb25zID0gU0RQVXRpbHMuc3BsaXRTZWN0aW9ucyhibG9iKTtcclxuICByZXR1cm4gc2VjdGlvbnMgJiYgc2VjdGlvbnNbMF07XHJcbn07XHJcblxyXG4vLyByZXR1cm5zIHRoZSBpbmRpdmlkdWFsIG1lZGlhIHNlY3Rpb25zLlxyXG5TRFBVdGlscy5nZXRNZWRpYVNlY3Rpb25zID0gZnVuY3Rpb24oYmxvYikge1xyXG4gIHZhciBzZWN0aW9ucyA9IFNEUFV0aWxzLnNwbGl0U2VjdGlvbnMoYmxvYik7XHJcbiAgc2VjdGlvbnMuc2hpZnQoKTtcclxuICByZXR1cm4gc2VjdGlvbnM7XHJcbn07XHJcblxyXG4vLyBSZXR1cm5zIGxpbmVzIHRoYXQgc3RhcnQgd2l0aCBhIGNlcnRhaW4gcHJlZml4LlxyXG5TRFBVdGlscy5tYXRjaFByZWZpeCA9IGZ1bmN0aW9uKGJsb2IsIHByZWZpeCkge1xyXG4gIHJldHVybiBTRFBVdGlscy5zcGxpdExpbmVzKGJsb2IpLmZpbHRlcihmdW5jdGlvbihsaW5lKSB7XHJcbiAgICByZXR1cm4gbGluZS5pbmRleE9mKHByZWZpeCkgPT09IDA7XHJcbiAgfSk7XHJcbn07XHJcblxyXG4vLyBQYXJzZXMgYW4gSUNFIGNhbmRpZGF0ZSBsaW5lLiBTYW1wbGUgaW5wdXQ6XHJcbi8vIGNhbmRpZGF0ZTo3MDI3ODYzNTAgMiB1ZHAgNDE4MTk5MDIgOC44LjguOCA2MDc2OSB0eXAgcmVsYXkgcmFkZHIgOC44LjguOFxyXG4vLyBycG9ydCA1NTk5NlwiXHJcblNEUFV0aWxzLnBhcnNlQ2FuZGlkYXRlID0gZnVuY3Rpb24obGluZSkge1xyXG4gIHZhciBwYXJ0cztcclxuICAvLyBQYXJzZSBib3RoIHZhcmlhbnRzLlxyXG4gIGlmIChsaW5lLmluZGV4T2YoJ2E9Y2FuZGlkYXRlOicpID09PSAwKSB7XHJcbiAgICBwYXJ0cyA9IGxpbmUuc3Vic3RyaW5nKDEyKS5zcGxpdCgnICcpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBwYXJ0cyA9IGxpbmUuc3Vic3RyaW5nKDEwKS5zcGxpdCgnICcpO1xyXG4gIH1cclxuXHJcbiAgdmFyIGNhbmRpZGF0ZSA9IHtcclxuICAgIGZvdW5kYXRpb246IHBhcnRzWzBdLFxyXG4gICAgY29tcG9uZW50OiBwYXJzZUludChwYXJ0c1sxXSwgMTApLFxyXG4gICAgcHJvdG9jb2w6IHBhcnRzWzJdLnRvTG93ZXJDYXNlKCksXHJcbiAgICBwcmlvcml0eTogcGFyc2VJbnQocGFydHNbM10sIDEwKSxcclxuICAgIGlwOiBwYXJ0c1s0XSxcclxuICAgIHBvcnQ6IHBhcnNlSW50KHBhcnRzWzVdLCAxMCksXHJcbiAgICAvLyBza2lwIHBhcnRzWzZdID09ICd0eXAnXHJcbiAgICB0eXBlOiBwYXJ0c1s3XVxyXG4gIH07XHJcblxyXG4gIGZvciAodmFyIGkgPSA4OyBpIDwgcGFydHMubGVuZ3RoOyBpICs9IDIpIHtcclxuICAgIHN3aXRjaCAocGFydHNbaV0pIHtcclxuICAgICAgY2FzZSAncmFkZHInOlxyXG4gICAgICAgIGNhbmRpZGF0ZS5yZWxhdGVkQWRkcmVzcyA9IHBhcnRzW2kgKyAxXTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAncnBvcnQnOlxyXG4gICAgICAgIGNhbmRpZGF0ZS5yZWxhdGVkUG9ydCA9IHBhcnNlSW50KHBhcnRzW2kgKyAxXSwgMTApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd0Y3B0eXBlJzpcclxuICAgICAgICBjYW5kaWRhdGUudGNwVHlwZSA9IHBhcnRzW2kgKyAxXTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAndWZyYWcnOlxyXG4gICAgICAgIGNhbmRpZGF0ZS51ZnJhZyA9IHBhcnRzW2kgKyAxXTsgLy8gZm9yIGJhY2t3YXJkIGNvbXBhYmlsaXR5LlxyXG4gICAgICAgIGNhbmRpZGF0ZS51c2VybmFtZUZyYWdtZW50ID0gcGFydHNbaSArIDFdO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OiAvLyBleHRlbnNpb24gaGFuZGxpbmcsIGluIHBhcnRpY3VsYXIgdWZyYWdcclxuICAgICAgICBjYW5kaWRhdGVbcGFydHNbaV1dID0gcGFydHNbaSArIDFdO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gY2FuZGlkYXRlO1xyXG59O1xyXG5cclxuLy8gVHJhbnNsYXRlcyBhIGNhbmRpZGF0ZSBvYmplY3QgaW50byBTRFAgY2FuZGlkYXRlIGF0dHJpYnV0ZS5cclxuU0RQVXRpbHMud3JpdGVDYW5kaWRhdGUgPSBmdW5jdGlvbihjYW5kaWRhdGUpIHtcclxuICB2YXIgc2RwID0gW107XHJcbiAgc2RwLnB1c2goY2FuZGlkYXRlLmZvdW5kYXRpb24pO1xyXG4gIHNkcC5wdXNoKGNhbmRpZGF0ZS5jb21wb25lbnQpO1xyXG4gIHNkcC5wdXNoKGNhbmRpZGF0ZS5wcm90b2NvbC50b1VwcGVyQ2FzZSgpKTtcclxuICBzZHAucHVzaChjYW5kaWRhdGUucHJpb3JpdHkpO1xyXG4gIHNkcC5wdXNoKGNhbmRpZGF0ZS5pcCk7XHJcbiAgc2RwLnB1c2goY2FuZGlkYXRlLnBvcnQpO1xyXG5cclxuICB2YXIgdHlwZSA9IGNhbmRpZGF0ZS50eXBlO1xyXG4gIHNkcC5wdXNoKCd0eXAnKTtcclxuICBzZHAucHVzaCh0eXBlKTtcclxuICBpZiAodHlwZSAhPT0gJ2hvc3QnICYmIGNhbmRpZGF0ZS5yZWxhdGVkQWRkcmVzcyAmJlxyXG4gICAgICBjYW5kaWRhdGUucmVsYXRlZFBvcnQpIHtcclxuICAgIHNkcC5wdXNoKCdyYWRkcicpO1xyXG4gICAgc2RwLnB1c2goY2FuZGlkYXRlLnJlbGF0ZWRBZGRyZXNzKTsgLy8gd2FzOiByZWxBZGRyXHJcbiAgICBzZHAucHVzaCgncnBvcnQnKTtcclxuICAgIHNkcC5wdXNoKGNhbmRpZGF0ZS5yZWxhdGVkUG9ydCk7IC8vIHdhczogcmVsUG9ydFxyXG4gIH1cclxuICBpZiAoY2FuZGlkYXRlLnRjcFR5cGUgJiYgY2FuZGlkYXRlLnByb3RvY29sLnRvTG93ZXJDYXNlKCkgPT09ICd0Y3AnKSB7XHJcbiAgICBzZHAucHVzaCgndGNwdHlwZScpO1xyXG4gICAgc2RwLnB1c2goY2FuZGlkYXRlLnRjcFR5cGUpO1xyXG4gIH1cclxuICBpZiAoY2FuZGlkYXRlLnVzZXJuYW1lRnJhZ21lbnQgfHwgY2FuZGlkYXRlLnVmcmFnKSB7XHJcbiAgICBzZHAucHVzaCgndWZyYWcnKTtcclxuICAgIHNkcC5wdXNoKGNhbmRpZGF0ZS51c2VybmFtZUZyYWdtZW50IHx8IGNhbmRpZGF0ZS51ZnJhZyk7XHJcbiAgfVxyXG4gIHJldHVybiAnY2FuZGlkYXRlOicgKyBzZHAuam9pbignICcpO1xyXG59O1xyXG5cclxuLy8gUGFyc2VzIGFuIGljZS1vcHRpb25zIGxpbmUsIHJldHVybnMgYW4gYXJyYXkgb2Ygb3B0aW9uIHRhZ3MuXHJcbi8vIGE9aWNlLW9wdGlvbnM6Zm9vIGJhclxyXG5TRFBVdGlscy5wYXJzZUljZU9wdGlvbnMgPSBmdW5jdGlvbihsaW5lKSB7XHJcbiAgcmV0dXJuIGxpbmUuc3Vic3RyKDE0KS5zcGxpdCgnICcpO1xyXG59XHJcblxyXG4vLyBQYXJzZXMgYW4gcnRwbWFwIGxpbmUsIHJldHVybnMgUlRDUnRwQ29kZGVjUGFyYW1ldGVycy4gU2FtcGxlIGlucHV0OlxyXG4vLyBhPXJ0cG1hcDoxMTEgb3B1cy80ODAwMC8yXHJcblNEUFV0aWxzLnBhcnNlUnRwTWFwID0gZnVuY3Rpb24obGluZSkge1xyXG4gIHZhciBwYXJ0cyA9IGxpbmUuc3Vic3RyKDkpLnNwbGl0KCcgJyk7XHJcbiAgdmFyIHBhcnNlZCA9IHtcclxuICAgIHBheWxvYWRUeXBlOiBwYXJzZUludChwYXJ0cy5zaGlmdCgpLCAxMCkgLy8gd2FzOiBpZFxyXG4gIH07XHJcblxyXG4gIHBhcnRzID0gcGFydHNbMF0uc3BsaXQoJy8nKTtcclxuXHJcbiAgcGFyc2VkLm5hbWUgPSBwYXJ0c1swXTtcclxuICBwYXJzZWQuY2xvY2tSYXRlID0gcGFyc2VJbnQocGFydHNbMV0sIDEwKTsgLy8gd2FzOiBjbG9ja3JhdGVcclxuICAvLyB3YXM6IGNoYW5uZWxzXHJcbiAgcGFyc2VkLm51bUNoYW5uZWxzID0gcGFydHMubGVuZ3RoID09PSAzID8gcGFyc2VJbnQocGFydHNbMl0sIDEwKSA6IDE7XHJcbiAgcmV0dXJuIHBhcnNlZDtcclxufTtcclxuXHJcbi8vIEdlbmVyYXRlIGFuIGE9cnRwbWFwIGxpbmUgZnJvbSBSVENSdHBDb2RlY0NhcGFiaWxpdHkgb3JcclxuLy8gUlRDUnRwQ29kZWNQYXJhbWV0ZXJzLlxyXG5TRFBVdGlscy53cml0ZVJ0cE1hcCA9IGZ1bmN0aW9uKGNvZGVjKSB7XHJcbiAgdmFyIHB0ID0gY29kZWMucGF5bG9hZFR5cGU7XHJcbiAgaWYgKGNvZGVjLnByZWZlcnJlZFBheWxvYWRUeXBlICE9PSB1bmRlZmluZWQpIHtcclxuICAgIHB0ID0gY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGU7XHJcbiAgfVxyXG4gIHJldHVybiAnYT1ydHBtYXA6JyArIHB0ICsgJyAnICsgY29kZWMubmFtZSArICcvJyArIGNvZGVjLmNsb2NrUmF0ZSArXHJcbiAgICAgIChjb2RlYy5udW1DaGFubmVscyAhPT0gMSA/ICcvJyArIGNvZGVjLm51bUNoYW5uZWxzIDogJycpICsgJ1xcclxcbic7XHJcbn07XHJcblxyXG4vLyBQYXJzZXMgYW4gYT1leHRtYXAgbGluZSAoaGVhZGVyZXh0ZW5zaW9uIGZyb20gUkZDIDUyODUpLiBTYW1wbGUgaW5wdXQ6XHJcbi8vIGE9ZXh0bWFwOjIgdXJuOmlldGY6cGFyYW1zOnJ0cC1oZHJleHQ6dG9mZnNldFxyXG4vLyBhPWV4dG1hcDoyL3NlbmRvbmx5IHVybjppZXRmOnBhcmFtczpydHAtaGRyZXh0OnRvZmZzZXRcclxuU0RQVXRpbHMucGFyc2VFeHRtYXAgPSBmdW5jdGlvbihsaW5lKSB7XHJcbiAgdmFyIHBhcnRzID0gbGluZS5zdWJzdHIoOSkuc3BsaXQoJyAnKTtcclxuICByZXR1cm4ge1xyXG4gICAgaWQ6IHBhcnNlSW50KHBhcnRzWzBdLCAxMCksXHJcbiAgICBkaXJlY3Rpb246IHBhcnRzWzBdLmluZGV4T2YoJy8nKSA+IDAgPyBwYXJ0c1swXS5zcGxpdCgnLycpWzFdIDogJ3NlbmRyZWN2JyxcclxuICAgIHVyaTogcGFydHNbMV1cclxuICB9O1xyXG59O1xyXG5cclxuLy8gR2VuZXJhdGVzIGE9ZXh0bWFwIGxpbmUgZnJvbSBSVENSdHBIZWFkZXJFeHRlbnNpb25QYXJhbWV0ZXJzIG9yXHJcbi8vIFJUQ1J0cEhlYWRlckV4dGVuc2lvbi5cclxuU0RQVXRpbHMud3JpdGVFeHRtYXAgPSBmdW5jdGlvbihoZWFkZXJFeHRlbnNpb24pIHtcclxuICByZXR1cm4gJ2E9ZXh0bWFwOicgKyAoaGVhZGVyRXh0ZW5zaW9uLmlkIHx8IGhlYWRlckV4dGVuc2lvbi5wcmVmZXJyZWRJZCkgK1xyXG4gICAgICAoaGVhZGVyRXh0ZW5zaW9uLmRpcmVjdGlvbiAmJiBoZWFkZXJFeHRlbnNpb24uZGlyZWN0aW9uICE9PSAnc2VuZHJlY3YnXHJcbiAgICAgICAgICA/ICcvJyArIGhlYWRlckV4dGVuc2lvbi5kaXJlY3Rpb25cclxuICAgICAgICAgIDogJycpICtcclxuICAgICAgJyAnICsgaGVhZGVyRXh0ZW5zaW9uLnVyaSArICdcXHJcXG4nO1xyXG59O1xyXG5cclxuLy8gUGFyc2VzIGFuIGZ0bXAgbGluZSwgcmV0dXJucyBkaWN0aW9uYXJ5LiBTYW1wbGUgaW5wdXQ6XHJcbi8vIGE9Zm10cDo5NiB2YnI9b247Y25nPW9uXHJcbi8vIEFsc28gZGVhbHMgd2l0aCB2YnI9b247IGNuZz1vblxyXG5TRFBVdGlscy5wYXJzZUZtdHAgPSBmdW5jdGlvbihsaW5lKSB7XHJcbiAgdmFyIHBhcnNlZCA9IHt9O1xyXG4gIHZhciBrdjtcclxuICB2YXIgcGFydHMgPSBsaW5lLnN1YnN0cihsaW5lLmluZGV4T2YoJyAnKSArIDEpLnNwbGl0KCc7Jyk7XHJcbiAgZm9yICh2YXIgaiA9IDA7IGogPCBwYXJ0cy5sZW5ndGg7IGorKykge1xyXG4gICAga3YgPSBwYXJ0c1tqXS50cmltKCkuc3BsaXQoJz0nKTtcclxuICAgIHBhcnNlZFtrdlswXS50cmltKCldID0ga3ZbMV07XHJcbiAgfVxyXG4gIHJldHVybiBwYXJzZWQ7XHJcbn07XHJcblxyXG4vLyBHZW5lcmF0ZXMgYW4gYT1mdG1wIGxpbmUgZnJvbSBSVENSdHBDb2RlY0NhcGFiaWxpdHkgb3IgUlRDUnRwQ29kZWNQYXJhbWV0ZXJzLlxyXG5TRFBVdGlscy53cml0ZUZtdHAgPSBmdW5jdGlvbihjb2RlYykge1xyXG4gIHZhciBsaW5lID0gJyc7XHJcbiAgdmFyIHB0ID0gY29kZWMucGF5bG9hZFR5cGU7XHJcbiAgaWYgKGNvZGVjLnByZWZlcnJlZFBheWxvYWRUeXBlICE9PSB1bmRlZmluZWQpIHtcclxuICAgIHB0ID0gY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGU7XHJcbiAgfVxyXG4gIGlmIChjb2RlYy5wYXJhbWV0ZXJzICYmIE9iamVjdC5rZXlzKGNvZGVjLnBhcmFtZXRlcnMpLmxlbmd0aCkge1xyXG4gICAgdmFyIHBhcmFtcyA9IFtdO1xyXG4gICAgT2JqZWN0LmtleXMoY29kZWMucGFyYW1ldGVycykuZm9yRWFjaChmdW5jdGlvbihwYXJhbSkge1xyXG4gICAgICBwYXJhbXMucHVzaChwYXJhbSArICc9JyArIGNvZGVjLnBhcmFtZXRlcnNbcGFyYW1dKTtcclxuICAgIH0pO1xyXG4gICAgbGluZSArPSAnYT1mbXRwOicgKyBwdCArICcgJyArIHBhcmFtcy5qb2luKCc7JykgKyAnXFxyXFxuJztcclxuICB9XHJcbiAgcmV0dXJuIGxpbmU7XHJcbn07XHJcblxyXG4vLyBQYXJzZXMgYW4gcnRjcC1mYiBsaW5lLCByZXR1cm5zIFJUQ1BSdGNwRmVlZGJhY2sgb2JqZWN0LiBTYW1wbGUgaW5wdXQ6XHJcbi8vIGE9cnRjcC1mYjo5OCBuYWNrIHJwc2lcclxuU0RQVXRpbHMucGFyc2VSdGNwRmIgPSBmdW5jdGlvbihsaW5lKSB7XHJcbiAgdmFyIHBhcnRzID0gbGluZS5zdWJzdHIobGluZS5pbmRleE9mKCcgJykgKyAxKS5zcGxpdCgnICcpO1xyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiBwYXJ0cy5zaGlmdCgpLFxyXG4gICAgcGFyYW1ldGVyOiBwYXJ0cy5qb2luKCcgJylcclxuICB9O1xyXG59O1xyXG4vLyBHZW5lcmF0ZSBhPXJ0Y3AtZmIgbGluZXMgZnJvbSBSVENSdHBDb2RlY0NhcGFiaWxpdHkgb3IgUlRDUnRwQ29kZWNQYXJhbWV0ZXJzLlxyXG5TRFBVdGlscy53cml0ZVJ0Y3BGYiA9IGZ1bmN0aW9uKGNvZGVjKSB7XHJcbiAgdmFyIGxpbmVzID0gJyc7XHJcbiAgdmFyIHB0ID0gY29kZWMucGF5bG9hZFR5cGU7XHJcbiAgaWYgKGNvZGVjLnByZWZlcnJlZFBheWxvYWRUeXBlICE9PSB1bmRlZmluZWQpIHtcclxuICAgIHB0ID0gY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGU7XHJcbiAgfVxyXG4gIGlmIChjb2RlYy5ydGNwRmVlZGJhY2sgJiYgY29kZWMucnRjcEZlZWRiYWNrLmxlbmd0aCkge1xyXG4gICAgLy8gRklYTUU6IHNwZWNpYWwgaGFuZGxpbmcgZm9yIHRyci1pbnQ/XHJcbiAgICBjb2RlYy5ydGNwRmVlZGJhY2suZm9yRWFjaChmdW5jdGlvbihmYikge1xyXG4gICAgICBsaW5lcyArPSAnYT1ydGNwLWZiOicgKyBwdCArICcgJyArIGZiLnR5cGUgK1xyXG4gICAgICAoZmIucGFyYW1ldGVyICYmIGZiLnBhcmFtZXRlci5sZW5ndGggPyAnICcgKyBmYi5wYXJhbWV0ZXIgOiAnJykgK1xyXG4gICAgICAgICAgJ1xcclxcbic7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgcmV0dXJuIGxpbmVzO1xyXG59O1xyXG5cclxuLy8gUGFyc2VzIGFuIFJGQyA1NTc2IHNzcmMgbWVkaWEgYXR0cmlidXRlLiBTYW1wbGUgaW5wdXQ6XHJcbi8vIGE9c3NyYzozNzM1OTI4NTU5IGNuYW1lOnNvbWV0aGluZ1xyXG5TRFBVdGlscy5wYXJzZVNzcmNNZWRpYSA9IGZ1bmN0aW9uKGxpbmUpIHtcclxuICB2YXIgc3AgPSBsaW5lLmluZGV4T2YoJyAnKTtcclxuICB2YXIgcGFydHMgPSB7XHJcbiAgICBzc3JjOiBwYXJzZUludChsaW5lLnN1YnN0cig3LCBzcCAtIDcpLCAxMClcclxuICB9O1xyXG4gIHZhciBjb2xvbiA9IGxpbmUuaW5kZXhPZignOicsIHNwKTtcclxuICBpZiAoY29sb24gPiAtMSkge1xyXG4gICAgcGFydHMuYXR0cmlidXRlID0gbGluZS5zdWJzdHIoc3AgKyAxLCBjb2xvbiAtIHNwIC0gMSk7XHJcbiAgICBwYXJ0cy52YWx1ZSA9IGxpbmUuc3Vic3RyKGNvbG9uICsgMSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHBhcnRzLmF0dHJpYnV0ZSA9IGxpbmUuc3Vic3RyKHNwICsgMSk7XHJcbiAgfVxyXG4gIHJldHVybiBwYXJ0cztcclxufTtcclxuXHJcbi8vIEV4dHJhY3RzIHRoZSBNSUQgKFJGQyA1ODg4KSBmcm9tIGEgbWVkaWEgc2VjdGlvbi5cclxuLy8gcmV0dXJucyB0aGUgTUlEIG9yIHVuZGVmaW5lZCBpZiBubyBtaWQgbGluZSB3YXMgZm91bmQuXHJcblNEUFV0aWxzLmdldE1pZCA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbikge1xyXG4gIHZhciBtaWQgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPW1pZDonKVswXTtcclxuICBpZiAobWlkKSB7XHJcbiAgICByZXR1cm4gbWlkLnN1YnN0cig2KTtcclxuICB9XHJcbn1cclxuXHJcblNEUFV0aWxzLnBhcnNlRmluZ2VycHJpbnQgPSBmdW5jdGlvbihsaW5lKSB7XHJcbiAgdmFyIHBhcnRzID0gbGluZS5zdWJzdHIoMTQpLnNwbGl0KCcgJyk7XHJcbiAgcmV0dXJuIHtcclxuICAgIGFsZ29yaXRobTogcGFydHNbMF0udG9Mb3dlckNhc2UoKSwgLy8gYWxnb3JpdGhtIGlzIGNhc2Utc2Vuc2l0aXZlIGluIEVkZ2UuXHJcbiAgICB2YWx1ZTogcGFydHNbMV1cclxuICB9O1xyXG59O1xyXG5cclxuLy8gRXh0cmFjdHMgRFRMUyBwYXJhbWV0ZXJzIGZyb20gU0RQIG1lZGlhIHNlY3Rpb24gb3Igc2Vzc2lvbnBhcnQuXHJcbi8vIEZJWE1FOiBmb3IgY29uc2lzdGVuY3kgd2l0aCBvdGhlciBmdW5jdGlvbnMgdGhpcyBzaG91bGQgb25seVxyXG4vLyAgIGdldCB0aGUgZmluZ2VycHJpbnQgbGluZSBhcyBpbnB1dC4gU2VlIGFsc28gZ2V0SWNlUGFyYW1ldGVycy5cclxuU0RQVXRpbHMuZ2V0RHRsc1BhcmFtZXRlcnMgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24sIHNlc3Npb25wYXJ0KSB7XHJcbiAgdmFyIGxpbmVzID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uICsgc2Vzc2lvbnBhcnQsXHJcbiAgICAgICdhPWZpbmdlcnByaW50OicpO1xyXG4gIC8vIE5vdGU6IGE9c2V0dXAgbGluZSBpcyBpZ25vcmVkIHNpbmNlIHdlIHVzZSB0aGUgJ2F1dG8nIHJvbGUuXHJcbiAgLy8gTm90ZTI6ICdhbGdvcml0aG0nIGlzIG5vdCBjYXNlIHNlbnNpdGl2ZSBleGNlcHQgaW4gRWRnZS5cclxuICByZXR1cm4ge1xyXG4gICAgcm9sZTogJ2F1dG8nLFxyXG4gICAgZmluZ2VycHJpbnRzOiBsaW5lcy5tYXAoU0RQVXRpbHMucGFyc2VGaW5nZXJwcmludClcclxuICB9O1xyXG59O1xyXG5cclxuLy8gU2VyaWFsaXplcyBEVExTIHBhcmFtZXRlcnMgdG8gU0RQLlxyXG5TRFBVdGlscy53cml0ZUR0bHNQYXJhbWV0ZXJzID0gZnVuY3Rpb24ocGFyYW1zLCBzZXR1cFR5cGUpIHtcclxuICB2YXIgc2RwID0gJ2E9c2V0dXA6JyArIHNldHVwVHlwZSArICdcXHJcXG4nO1xyXG4gIHBhcmFtcy5maW5nZXJwcmludHMuZm9yRWFjaChmdW5jdGlvbihmcCkge1xyXG4gICAgc2RwICs9ICdhPWZpbmdlcnByaW50OicgKyBmcC5hbGdvcml0aG0gKyAnICcgKyBmcC52YWx1ZSArICdcXHJcXG4nO1xyXG4gIH0pO1xyXG4gIHJldHVybiBzZHA7XHJcbn07XHJcbi8vIFBhcnNlcyBJQ0UgaW5mb3JtYXRpb24gZnJvbSBTRFAgbWVkaWEgc2VjdGlvbiBvciBzZXNzaW9ucGFydC5cclxuLy8gRklYTUU6IGZvciBjb25zaXN0ZW5jeSB3aXRoIG90aGVyIGZ1bmN0aW9ucyB0aGlzIHNob3VsZCBvbmx5XHJcbi8vICAgZ2V0IHRoZSBpY2UtdWZyYWcgYW5kIGljZS1wd2QgbGluZXMgYXMgaW5wdXQuXHJcblNEUFV0aWxzLmdldEljZVBhcmFtZXRlcnMgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24sIHNlc3Npb25wYXJ0KSB7XHJcbiAgdmFyIGxpbmVzID0gU0RQVXRpbHMuc3BsaXRMaW5lcyhtZWRpYVNlY3Rpb24pO1xyXG4gIC8vIFNlYXJjaCBpbiBzZXNzaW9uIHBhcnQsIHRvby5cclxuICBsaW5lcyA9IGxpbmVzLmNvbmNhdChTRFBVdGlscy5zcGxpdExpbmVzKHNlc3Npb25wYXJ0KSk7XHJcbiAgdmFyIGljZVBhcmFtZXRlcnMgPSB7XHJcbiAgICB1c2VybmFtZUZyYWdtZW50OiBsaW5lcy5maWx0ZXIoZnVuY3Rpb24obGluZSkge1xyXG4gICAgICByZXR1cm4gbGluZS5pbmRleE9mKCdhPWljZS11ZnJhZzonKSA9PT0gMDtcclxuICAgIH0pWzBdLnN1YnN0cigxMiksXHJcbiAgICBwYXNzd29yZDogbGluZXMuZmlsdGVyKGZ1bmN0aW9uKGxpbmUpIHtcclxuICAgICAgcmV0dXJuIGxpbmUuaW5kZXhPZignYT1pY2UtcHdkOicpID09PSAwO1xyXG4gICAgfSlbMF0uc3Vic3RyKDEwKVxyXG4gIH07XHJcbiAgcmV0dXJuIGljZVBhcmFtZXRlcnM7XHJcbn07XHJcblxyXG4vLyBTZXJpYWxpemVzIElDRSBwYXJhbWV0ZXJzIHRvIFNEUC5cclxuU0RQVXRpbHMud3JpdGVJY2VQYXJhbWV0ZXJzID0gZnVuY3Rpb24ocGFyYW1zKSB7XHJcbiAgcmV0dXJuICdhPWljZS11ZnJhZzonICsgcGFyYW1zLnVzZXJuYW1lRnJhZ21lbnQgKyAnXFxyXFxuJyArXHJcbiAgICAgICdhPWljZS1wd2Q6JyArIHBhcmFtcy5wYXNzd29yZCArICdcXHJcXG4nO1xyXG59O1xyXG5cclxuLy8gUGFyc2VzIHRoZSBTRFAgbWVkaWEgc2VjdGlvbiBhbmQgcmV0dXJucyBSVENSdHBQYXJhbWV0ZXJzLlxyXG5TRFBVdGlscy5wYXJzZVJ0cFBhcmFtZXRlcnMgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcclxuICB2YXIgZGVzY3JpcHRpb24gPSB7XHJcbiAgICBjb2RlY3M6IFtdLFxyXG4gICAgaGVhZGVyRXh0ZW5zaW9uczogW10sXHJcbiAgICBmZWNNZWNoYW5pc21zOiBbXSxcclxuICAgIHJ0Y3A6IFtdXHJcbiAgfTtcclxuICB2YXIgbGluZXMgPSBTRFBVdGlscy5zcGxpdExpbmVzKG1lZGlhU2VjdGlvbik7XHJcbiAgdmFyIG1saW5lID0gbGluZXNbMF0uc3BsaXQoJyAnKTtcclxuICBmb3IgKHZhciBpID0gMzsgaSA8IG1saW5lLmxlbmd0aDsgaSsrKSB7IC8vIGZpbmQgYWxsIGNvZGVjcyBmcm9tIG1saW5lWzMuLl1cclxuICAgIHZhciBwdCA9IG1saW5lW2ldO1xyXG4gICAgdmFyIHJ0cG1hcGxpbmUgPSBTRFBVdGlscy5tYXRjaFByZWZpeChcclxuICAgICAgICBtZWRpYVNlY3Rpb24sICdhPXJ0cG1hcDonICsgcHQgKyAnICcpWzBdO1xyXG4gICAgaWYgKHJ0cG1hcGxpbmUpIHtcclxuICAgICAgdmFyIGNvZGVjID0gU0RQVXRpbHMucGFyc2VSdHBNYXAocnRwbWFwbGluZSk7XHJcbiAgICAgIHZhciBmbXRwcyA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KFxyXG4gICAgICAgICAgbWVkaWFTZWN0aW9uLCAnYT1mbXRwOicgKyBwdCArICcgJyk7XHJcbiAgICAgIC8vIE9ubHkgdGhlIGZpcnN0IGE9Zm10cDo8cHQ+IGlzIGNvbnNpZGVyZWQuXHJcbiAgICAgIGNvZGVjLnBhcmFtZXRlcnMgPSBmbXRwcy5sZW5ndGggPyBTRFBVdGlscy5wYXJzZUZtdHAoZm10cHNbMF0pIDoge307XHJcbiAgICAgIGNvZGVjLnJ0Y3BGZWVkYmFjayA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KFxyXG4gICAgICAgICAgbWVkaWFTZWN0aW9uLCAnYT1ydGNwLWZiOicgKyBwdCArICcgJylcclxuICAgICAgICAubWFwKFNEUFV0aWxzLnBhcnNlUnRjcEZiKTtcclxuICAgICAgZGVzY3JpcHRpb24uY29kZWNzLnB1c2goY29kZWMpO1xyXG4gICAgICAvLyBwYXJzZSBGRUMgbWVjaGFuaXNtcyBmcm9tIHJ0cG1hcCBsaW5lcy5cclxuICAgICAgc3dpdGNoIChjb2RlYy5uYW1lLnRvVXBwZXJDYXNlKCkpIHtcclxuICAgICAgICBjYXNlICdSRUQnOlxyXG4gICAgICAgIGNhc2UgJ1VMUEZFQyc6XHJcbiAgICAgICAgICBkZXNjcmlwdGlvbi5mZWNNZWNoYW5pc21zLnB1c2goY29kZWMubmFtZS50b1VwcGVyQ2FzZSgpKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6IC8vIG9ubHkgUkVEIGFuZCBVTFBGRUMgYXJlIHJlY29nbml6ZWQgYXMgRkVDIG1lY2hhbmlzbXMuXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPWV4dG1hcDonKS5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUpIHtcclxuICAgIGRlc2NyaXB0aW9uLmhlYWRlckV4dGVuc2lvbnMucHVzaChTRFBVdGlscy5wYXJzZUV4dG1hcChsaW5lKSk7XHJcbiAgfSk7XHJcbiAgLy8gRklYTUU6IHBhcnNlIHJ0Y3AuXHJcbiAgcmV0dXJuIGRlc2NyaXB0aW9uO1xyXG59O1xyXG5cclxuLy8gR2VuZXJhdGVzIHBhcnRzIG9mIHRoZSBTRFAgbWVkaWEgc2VjdGlvbiBkZXNjcmliaW5nIHRoZSBjYXBhYmlsaXRpZXMgL1xyXG4vLyBwYXJhbWV0ZXJzLlxyXG5TRFBVdGlscy53cml0ZVJ0cERlc2NyaXB0aW9uID0gZnVuY3Rpb24oa2luZCwgY2Fwcykge1xyXG4gIHZhciBzZHAgPSAnJztcclxuXHJcbiAgLy8gQnVpbGQgdGhlIG1saW5lLlxyXG4gIHNkcCArPSAnbT0nICsga2luZCArICcgJztcclxuICBzZHAgKz0gY2Fwcy5jb2RlY3MubGVuZ3RoID4gMCA/ICc5JyA6ICcwJzsgLy8gcmVqZWN0IGlmIG5vIGNvZGVjcy5cclxuICBzZHAgKz0gJyBVRFAvVExTL1JUUC9TQVZQRiAnO1xyXG4gIHNkcCArPSBjYXBzLmNvZGVjcy5tYXAoZnVuY3Rpb24oY29kZWMpIHtcclxuICAgIGlmIChjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybiBjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZTtcclxuICAgIH1cclxuICAgIHJldHVybiBjb2RlYy5wYXlsb2FkVHlwZTtcclxuICB9KS5qb2luKCcgJykgKyAnXFxyXFxuJztcclxuXHJcbiAgc2RwICs9ICdjPUlOIElQNCAwLjAuMC4wXFxyXFxuJztcclxuICBzZHAgKz0gJ2E9cnRjcDo5IElOIElQNCAwLjAuMC4wXFxyXFxuJztcclxuXHJcbiAgLy8gQWRkIGE9cnRwbWFwIGxpbmVzIGZvciBlYWNoIGNvZGVjLiBBbHNvIGZtdHAgYW5kIHJ0Y3AtZmIuXHJcbiAgY2Fwcy5jb2RlY3MuZm9yRWFjaChmdW5jdGlvbihjb2RlYykge1xyXG4gICAgc2RwICs9IFNEUFV0aWxzLndyaXRlUnRwTWFwKGNvZGVjKTtcclxuICAgIHNkcCArPSBTRFBVdGlscy53cml0ZUZtdHAoY29kZWMpO1xyXG4gICAgc2RwICs9IFNEUFV0aWxzLndyaXRlUnRjcEZiKGNvZGVjKTtcclxuICB9KTtcclxuICB2YXIgbWF4cHRpbWUgPSAwO1xyXG4gIGNhcHMuY29kZWNzLmZvckVhY2goZnVuY3Rpb24oY29kZWMpIHtcclxuICAgIGlmIChjb2RlYy5tYXhwdGltZSA+IG1heHB0aW1lKSB7XHJcbiAgICAgIG1heHB0aW1lID0gY29kZWMubWF4cHRpbWU7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgaWYgKG1heHB0aW1lID4gMCkge1xyXG4gICAgc2RwICs9ICdhPW1heHB0aW1lOicgKyBtYXhwdGltZSArICdcXHJcXG4nO1xyXG4gIH1cclxuICBzZHAgKz0gJ2E9cnRjcC1tdXhcXHJcXG4nO1xyXG5cclxuICBjYXBzLmhlYWRlckV4dGVuc2lvbnMuZm9yRWFjaChmdW5jdGlvbihleHRlbnNpb24pIHtcclxuICAgIHNkcCArPSBTRFBVdGlscy53cml0ZUV4dG1hcChleHRlbnNpb24pO1xyXG4gIH0pO1xyXG4gIC8vIEZJWE1FOiB3cml0ZSBmZWNNZWNoYW5pc21zLlxyXG4gIHJldHVybiBzZHA7XHJcbn07XHJcblxyXG4vLyBQYXJzZXMgdGhlIFNEUCBtZWRpYSBzZWN0aW9uIGFuZCByZXR1cm5zIGFuIGFycmF5IG9mXHJcbi8vIFJUQ1J0cEVuY29kaW5nUGFyYW1ldGVycy5cclxuU0RQVXRpbHMucGFyc2VSdHBFbmNvZGluZ1BhcmFtZXRlcnMgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcclxuICB2YXIgZW5jb2RpbmdQYXJhbWV0ZXJzID0gW107XHJcbiAgdmFyIGRlc2NyaXB0aW9uID0gU0RQVXRpbHMucGFyc2VSdHBQYXJhbWV0ZXJzKG1lZGlhU2VjdGlvbik7XHJcbiAgdmFyIGhhc1JlZCA9IGRlc2NyaXB0aW9uLmZlY01lY2hhbmlzbXMuaW5kZXhPZignUkVEJykgIT09IC0xO1xyXG4gIHZhciBoYXNVbHBmZWMgPSBkZXNjcmlwdGlvbi5mZWNNZWNoYW5pc21zLmluZGV4T2YoJ1VMUEZFQycpICE9PSAtMTtcclxuXHJcbiAgLy8gZmlsdGVyIGE9c3NyYzouLi4gY25hbWU6LCBpZ25vcmUgUGxhbkItbXNpZFxyXG4gIHZhciBzc3JjcyA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9c3NyYzonKVxyXG4gIC5tYXAoZnVuY3Rpb24obGluZSkge1xyXG4gICAgcmV0dXJuIFNEUFV0aWxzLnBhcnNlU3NyY01lZGlhKGxpbmUpO1xyXG4gIH0pXHJcbiAgLmZpbHRlcihmdW5jdGlvbihwYXJ0cykge1xyXG4gICAgcmV0dXJuIHBhcnRzLmF0dHJpYnV0ZSA9PT0gJ2NuYW1lJztcclxuICB9KTtcclxuICB2YXIgcHJpbWFyeVNzcmMgPSBzc3Jjcy5sZW5ndGggPiAwICYmIHNzcmNzWzBdLnNzcmM7XHJcbiAgdmFyIHNlY29uZGFyeVNzcmM7XHJcblxyXG4gIHZhciBmbG93cyA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9c3NyYy1ncm91cDpGSUQnKVxyXG4gIC5tYXAoZnVuY3Rpb24obGluZSkge1xyXG4gICAgdmFyIHBhcnRzID0gbGluZS5zcGxpdCgnICcpO1xyXG4gICAgcGFydHMuc2hpZnQoKTtcclxuICAgIHJldHVybiBwYXJ0cy5tYXAoZnVuY3Rpb24ocGFydCkge1xyXG4gICAgICByZXR1cm4gcGFyc2VJbnQocGFydCwgMTApO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbiAgaWYgKGZsb3dzLmxlbmd0aCA+IDAgJiYgZmxvd3NbMF0ubGVuZ3RoID4gMSAmJiBmbG93c1swXVswXSA9PT0gcHJpbWFyeVNzcmMpIHtcclxuICAgIHNlY29uZGFyeVNzcmMgPSBmbG93c1swXVsxXTtcclxuICB9XHJcblxyXG4gIGRlc2NyaXB0aW9uLmNvZGVjcy5mb3JFYWNoKGZ1bmN0aW9uKGNvZGVjKSB7XHJcbiAgICBpZiAoY29kZWMubmFtZS50b1VwcGVyQ2FzZSgpID09PSAnUlRYJyAmJiBjb2RlYy5wYXJhbWV0ZXJzLmFwdCkge1xyXG4gICAgICB2YXIgZW5jUGFyYW0gPSB7XHJcbiAgICAgICAgc3NyYzogcHJpbWFyeVNzcmMsXHJcbiAgICAgICAgY29kZWNQYXlsb2FkVHlwZTogcGFyc2VJbnQoY29kZWMucGFyYW1ldGVycy5hcHQsIDEwKSxcclxuICAgICAgICBydHg6IHtcclxuICAgICAgICAgIHNzcmM6IHNlY29uZGFyeVNzcmNcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICAgIGVuY29kaW5nUGFyYW1ldGVycy5wdXNoKGVuY1BhcmFtKTtcclxuICAgICAgaWYgKGhhc1JlZCkge1xyXG4gICAgICAgIGVuY1BhcmFtID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShlbmNQYXJhbSkpO1xyXG4gICAgICAgIGVuY1BhcmFtLmZlYyA9IHtcclxuICAgICAgICAgIHNzcmM6IHNlY29uZGFyeVNzcmMsXHJcbiAgICAgICAgICBtZWNoYW5pc206IGhhc1VscGZlYyA/ICdyZWQrdWxwZmVjJyA6ICdyZWQnXHJcbiAgICAgICAgfTtcclxuICAgICAgICBlbmNvZGluZ1BhcmFtZXRlcnMucHVzaChlbmNQYXJhbSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuICBpZiAoZW5jb2RpbmdQYXJhbWV0ZXJzLmxlbmd0aCA9PT0gMCAmJiBwcmltYXJ5U3NyYykge1xyXG4gICAgZW5jb2RpbmdQYXJhbWV0ZXJzLnB1c2goe1xyXG4gICAgICBzc3JjOiBwcmltYXJ5U3NyY1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyB3ZSBzdXBwb3J0IGJvdGggYj1BUyBhbmQgYj1USUFTIGJ1dCBpbnRlcnByZXQgQVMgYXMgVElBUy5cclxuICB2YXIgYmFuZHdpZHRoID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYj0nKTtcclxuICBpZiAoYmFuZHdpZHRoLmxlbmd0aCkge1xyXG4gICAgaWYgKGJhbmR3aWR0aFswXS5pbmRleE9mKCdiPVRJQVM6JykgPT09IDApIHtcclxuICAgICAgYmFuZHdpZHRoID0gcGFyc2VJbnQoYmFuZHdpZHRoWzBdLnN1YnN0cig3KSwgMTApO1xyXG4gICAgfSBlbHNlIGlmIChiYW5kd2lkdGhbMF0uaW5kZXhPZignYj1BUzonKSA9PT0gMCkge1xyXG4gICAgICAvLyB1c2UgZm9ybXVsYSBmcm9tIEpTRVAgdG8gY29udmVydCBiPUFTIHRvIFRJQVMgdmFsdWUuXHJcbiAgICAgIGJhbmR3aWR0aCA9IHBhcnNlSW50KGJhbmR3aWR0aFswXS5zdWJzdHIoNSksIDEwKSAqIDEwMDAgKiAwLjk1XHJcbiAgICAgICAgICAtICg1MCAqIDQwICogOCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBiYW5kd2lkdGggPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBlbmNvZGluZ1BhcmFtZXRlcnMuZm9yRWFjaChmdW5jdGlvbihwYXJhbXMpIHtcclxuICAgICAgcGFyYW1zLm1heEJpdHJhdGUgPSBiYW5kd2lkdGg7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgcmV0dXJuIGVuY29kaW5nUGFyYW1ldGVycztcclxufTtcclxuXHJcbi8vIHBhcnNlcyBodHRwOi8vZHJhZnQub3J0Yy5vcmcvI3J0Y3J0Y3BwYXJhbWV0ZXJzKlxyXG5TRFBVdGlscy5wYXJzZVJ0Y3BQYXJhbWV0ZXJzID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XHJcbiAgdmFyIHJ0Y3BQYXJhbWV0ZXJzID0ge307XHJcblxyXG4gIHZhciBjbmFtZTtcclxuICAvLyBHZXRzIHRoZSBmaXJzdCBTU1JDLiBOb3RlIHRoYXQgd2l0aCBSVFggdGhlcmUgbWlnaHQgYmUgbXVsdGlwbGVcclxuICAvLyBTU1JDcy5cclxuICB2YXIgcmVtb3RlU3NyYyA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9c3NyYzonKVxyXG4gICAgICAubWFwKGZ1bmN0aW9uKGxpbmUpIHtcclxuICAgICAgICByZXR1cm4gU0RQVXRpbHMucGFyc2VTc3JjTWVkaWEobGluZSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5maWx0ZXIoZnVuY3Rpb24ob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIG9iai5hdHRyaWJ1dGUgPT09ICdjbmFtZSc7XHJcbiAgICAgIH0pWzBdO1xyXG4gIGlmIChyZW1vdGVTc3JjKSB7XHJcbiAgICBydGNwUGFyYW1ldGVycy5jbmFtZSA9IHJlbW90ZVNzcmMudmFsdWU7XHJcbiAgICBydGNwUGFyYW1ldGVycy5zc3JjID0gcmVtb3RlU3NyYy5zc3JjO1xyXG4gIH1cclxuXHJcbiAgLy8gRWRnZSB1c2VzIHRoZSBjb21wb3VuZCBhdHRyaWJ1dGUgaW5zdGVhZCBvZiByZWR1Y2VkU2l6ZVxyXG4gIC8vIGNvbXBvdW5kIGlzICFyZWR1Y2VkU2l6ZVxyXG4gIHZhciByc2l6ZSA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9cnRjcC1yc2l6ZScpO1xyXG4gIHJ0Y3BQYXJhbWV0ZXJzLnJlZHVjZWRTaXplID0gcnNpemUubGVuZ3RoID4gMDtcclxuICBydGNwUGFyYW1ldGVycy5jb21wb3VuZCA9IHJzaXplLmxlbmd0aCA9PT0gMDtcclxuXHJcbiAgLy8gcGFyc2VzIHRoZSBydGNwLW11eCBhdHRy0ZZidXRlLlxyXG4gIC8vIE5vdGUgdGhhdCBFZGdlIGRvZXMgbm90IHN1cHBvcnQgdW5tdXhlZCBSVENQLlxyXG4gIHZhciBtdXggPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPXJ0Y3AtbXV4Jyk7XHJcbiAgcnRjcFBhcmFtZXRlcnMubXV4ID0gbXV4Lmxlbmd0aCA+IDA7XHJcblxyXG4gIHJldHVybiBydGNwUGFyYW1ldGVycztcclxufTtcclxuXHJcbi8vIHBhcnNlcyBlaXRoZXIgYT1tc2lkOiBvciBhPXNzcmM6Li4uIG1zaWQgbGluZXMgYW5kIHJldHVybnNcclxuLy8gdGhlIGlkIG9mIHRoZSBNZWRpYVN0cmVhbSBhbmQgTWVkaWFTdHJlYW1UcmFjay5cclxuU0RQVXRpbHMucGFyc2VNc2lkID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XHJcbiAgdmFyIHBhcnRzO1xyXG4gIHZhciBzcGVjID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1tc2lkOicpO1xyXG4gIGlmIChzcGVjLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgcGFydHMgPSBzcGVjWzBdLnN1YnN0cig3KS5zcGxpdCgnICcpO1xyXG4gICAgcmV0dXJuIHtzdHJlYW06IHBhcnRzWzBdLCB0cmFjazogcGFydHNbMV19O1xyXG4gIH1cclxuICB2YXIgcGxhbkIgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPXNzcmM6JylcclxuICAubWFwKGZ1bmN0aW9uKGxpbmUpIHtcclxuICAgIHJldHVybiBTRFBVdGlscy5wYXJzZVNzcmNNZWRpYShsaW5lKTtcclxuICB9KVxyXG4gIC5maWx0ZXIoZnVuY3Rpb24ocGFydHMpIHtcclxuICAgIHJldHVybiBwYXJ0cy5hdHRyaWJ1dGUgPT09ICdtc2lkJztcclxuICB9KTtcclxuICBpZiAocGxhbkIubGVuZ3RoID4gMCkge1xyXG4gICAgcGFydHMgPSBwbGFuQlswXS52YWx1ZS5zcGxpdCgnICcpO1xyXG4gICAgcmV0dXJuIHtzdHJlYW06IHBhcnRzWzBdLCB0cmFjazogcGFydHNbMV19O1xyXG4gIH1cclxufTtcclxuXHJcbi8vIEdlbmVyYXRlIGEgc2Vzc2lvbiBJRCBmb3IgU0RQLlxyXG4vLyBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvZHJhZnQtaWV0Zi1ydGN3ZWItanNlcC0yMCNzZWN0aW9uLTUuMi4xXHJcbi8vIHJlY29tbWVuZHMgdXNpbmcgYSBjcnlwdG9ncmFwaGljYWxseSByYW5kb20gK3ZlIDY0LWJpdCB2YWx1ZVxyXG4vLyBidXQgcmlnaHQgbm93IHRoaXMgc2hvdWxkIGJlIGFjY2VwdGFibGUgYW5kIHdpdGhpbiB0aGUgcmlnaHQgcmFuZ2VcclxuU0RQVXRpbHMuZ2VuZXJhdGVTZXNzaW9uSWQgPSBmdW5jdGlvbigpIHtcclxuICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygpLnN1YnN0cigyLCAyMSk7XHJcbn07XHJcblxyXG4vLyBXcml0ZSBib2lsZGVyIHBsYXRlIGZvciBzdGFydCBvZiBTRFBcclxuLy8gc2Vzc0lkIGFyZ3VtZW50IGlzIG9wdGlvbmFsIC0gaWYgbm90IHN1cHBsaWVkIGl0IHdpbGxcclxuLy8gYmUgZ2VuZXJhdGVkIHJhbmRvbWx5XHJcbi8vIHNlc3NWZXJzaW9uIGlzIG9wdGlvbmFsIGFuZCBkZWZhdWx0cyB0byAyXHJcblNEUFV0aWxzLndyaXRlU2Vzc2lvbkJvaWxlcnBsYXRlID0gZnVuY3Rpb24oc2Vzc0lkLCBzZXNzVmVyKSB7XHJcbiAgdmFyIHNlc3Npb25JZDtcclxuICB2YXIgdmVyc2lvbiA9IHNlc3NWZXIgIT09IHVuZGVmaW5lZCA/IHNlc3NWZXIgOiAyO1xyXG4gIGlmIChzZXNzSWQpIHtcclxuICAgIHNlc3Npb25JZCA9IHNlc3NJZDtcclxuICB9IGVsc2Uge1xyXG4gICAgc2Vzc2lvbklkID0gU0RQVXRpbHMuZ2VuZXJhdGVTZXNzaW9uSWQoKTtcclxuICB9XHJcbiAgLy8gRklYTUU6IHNlc3MtaWQgc2hvdWxkIGJlIGFuIE5UUCB0aW1lc3RhbXAuXHJcbiAgcmV0dXJuICd2PTBcXHJcXG4nICtcclxuICAgICAgJ289dGhpc2lzYWRhcHRlcm9ydGMgJyArIHNlc3Npb25JZCArICcgJyArIHZlcnNpb24gKyAnIElOIElQNCAxMjcuMC4wLjFcXHJcXG4nICtcclxuICAgICAgJ3M9LVxcclxcbicgK1xyXG4gICAgICAndD0wIDBcXHJcXG4nO1xyXG59O1xyXG5cclxuU0RQVXRpbHMud3JpdGVNZWRpYVNlY3Rpb24gPSBmdW5jdGlvbih0cmFuc2NlaXZlciwgY2FwcywgdHlwZSwgc3RyZWFtKSB7XHJcbiAgdmFyIHNkcCA9IFNEUFV0aWxzLndyaXRlUnRwRGVzY3JpcHRpb24odHJhbnNjZWl2ZXIua2luZCwgY2Fwcyk7XHJcblxyXG4gIC8vIE1hcCBJQ0UgcGFyYW1ldGVycyAodWZyYWcsIHB3ZCkgdG8gU0RQLlxyXG4gIHNkcCArPSBTRFBVdGlscy53cml0ZUljZVBhcmFtZXRlcnMoXHJcbiAgICAgIHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyLmdldExvY2FsUGFyYW1ldGVycygpKTtcclxuXHJcbiAgLy8gTWFwIERUTFMgcGFyYW1ldGVycyB0byBTRFAuXHJcbiAgc2RwICs9IFNEUFV0aWxzLndyaXRlRHRsc1BhcmFtZXRlcnMoXHJcbiAgICAgIHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQuZ2V0TG9jYWxQYXJhbWV0ZXJzKCksXHJcbiAgICAgIHR5cGUgPT09ICdvZmZlcicgPyAnYWN0cGFzcycgOiAnYWN0aXZlJyk7XHJcblxyXG4gIHNkcCArPSAnYT1taWQ6JyArIHRyYW5zY2VpdmVyLm1pZCArICdcXHJcXG4nO1xyXG5cclxuICBpZiAodHJhbnNjZWl2ZXIuZGlyZWN0aW9uKSB7XHJcbiAgICBzZHAgKz0gJ2E9JyArIHRyYW5zY2VpdmVyLmRpcmVjdGlvbiArICdcXHJcXG4nO1xyXG4gIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIucnRwU2VuZGVyICYmIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyKSB7XHJcbiAgICBzZHAgKz0gJ2E9c2VuZHJlY3ZcXHJcXG4nO1xyXG4gIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIucnRwU2VuZGVyKSB7XHJcbiAgICBzZHAgKz0gJ2E9c2VuZG9ubHlcXHJcXG4nO1xyXG4gIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIpIHtcclxuICAgIHNkcCArPSAnYT1yZWN2b25seVxcclxcbic7XHJcbiAgfSBlbHNlIHtcclxuICAgIHNkcCArPSAnYT1pbmFjdGl2ZVxcclxcbic7XHJcbiAgfVxyXG5cclxuICBpZiAodHJhbnNjZWl2ZXIucnRwU2VuZGVyKSB7XHJcbiAgICAvLyBzcGVjLlxyXG4gICAgdmFyIG1zaWQgPSAnbXNpZDonICsgc3RyZWFtLmlkICsgJyAnICtcclxuICAgICAgICB0cmFuc2NlaXZlci5ydHBTZW5kZXIudHJhY2suaWQgKyAnXFxyXFxuJztcclxuICAgIHNkcCArPSAnYT0nICsgbXNpZDtcclxuXHJcbiAgICAvLyBmb3IgQ2hyb21lLlxyXG4gICAgc2RwICs9ICdhPXNzcmM6JyArIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYyArXHJcbiAgICAgICAgJyAnICsgbXNpZDtcclxuICAgIGlmICh0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCkge1xyXG4gICAgICBzZHAgKz0gJ2E9c3NyYzonICsgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHguc3NyYyArXHJcbiAgICAgICAgICAnICcgKyBtc2lkO1xyXG4gICAgICBzZHAgKz0gJ2E9c3NyYy1ncm91cDpGSUQgJyArXHJcbiAgICAgICAgICB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmMgKyAnICcgK1xyXG4gICAgICAgICAgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHguc3NyYyArXHJcbiAgICAgICAgICAnXFxyXFxuJztcclxuICAgIH1cclxuICB9XHJcbiAgLy8gRklYTUU6IHRoaXMgc2hvdWxkIGJlIHdyaXR0ZW4gYnkgd3JpdGVSdHBEZXNjcmlwdGlvbi5cclxuICBzZHAgKz0gJ2E9c3NyYzonICsgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjICtcclxuICAgICAgJyBjbmFtZTonICsgU0RQVXRpbHMubG9jYWxDTmFtZSArICdcXHJcXG4nO1xyXG4gIGlmICh0cmFuc2NlaXZlci5ydHBTZW5kZXIgJiYgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHgpIHtcclxuICAgIHNkcCArPSAnYT1zc3JjOicgKyB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eC5zc3JjICtcclxuICAgICAgICAnIGNuYW1lOicgKyBTRFBVdGlscy5sb2NhbENOYW1lICsgJ1xcclxcbic7XHJcbiAgfVxyXG4gIHJldHVybiBzZHA7XHJcbn07XHJcblxyXG4vLyBHZXRzIHRoZSBkaXJlY3Rpb24gZnJvbSB0aGUgbWVkaWFTZWN0aW9uIG9yIHRoZSBzZXNzaW9ucGFydC5cclxuU0RQVXRpbHMuZ2V0RGlyZWN0aW9uID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uLCBzZXNzaW9ucGFydCkge1xyXG4gIC8vIExvb2sgZm9yIHNlbmRyZWN2LCBzZW5kb25seSwgcmVjdm9ubHksIGluYWN0aXZlLCBkZWZhdWx0IHRvIHNlbmRyZWN2LlxyXG4gIHZhciBsaW5lcyA9IFNEUFV0aWxzLnNwbGl0TGluZXMobWVkaWFTZWN0aW9uKTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBzd2l0Y2ggKGxpbmVzW2ldKSB7XHJcbiAgICAgIGNhc2UgJ2E9c2VuZHJlY3YnOlxyXG4gICAgICBjYXNlICdhPXNlbmRvbmx5JzpcclxuICAgICAgY2FzZSAnYT1yZWN2b25seSc6XHJcbiAgICAgIGNhc2UgJ2E9aW5hY3RpdmUnOlxyXG4gICAgICAgIHJldHVybiBsaW5lc1tpXS5zdWJzdHIoMik7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgLy8gRklYTUU6IFdoYXQgc2hvdWxkIGhhcHBlbiBoZXJlP1xyXG4gICAgfVxyXG4gIH1cclxuICBpZiAoc2Vzc2lvbnBhcnQpIHtcclxuICAgIHJldHVybiBTRFBVdGlscy5nZXREaXJlY3Rpb24oc2Vzc2lvbnBhcnQpO1xyXG4gIH1cclxuICByZXR1cm4gJ3NlbmRyZWN2JztcclxufTtcclxuXHJcblNEUFV0aWxzLmdldEtpbmQgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcclxuICB2YXIgbGluZXMgPSBTRFBVdGlscy5zcGxpdExpbmVzKG1lZGlhU2VjdGlvbik7XHJcbiAgdmFyIG1saW5lID0gbGluZXNbMF0uc3BsaXQoJyAnKTtcclxuICByZXR1cm4gbWxpbmVbMF0uc3Vic3RyKDIpO1xyXG59O1xyXG5cclxuU0RQVXRpbHMuaXNSZWplY3RlZCA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbikge1xyXG4gIHJldHVybiBtZWRpYVNlY3Rpb24uc3BsaXQoJyAnLCAyKVsxXSA9PT0gJzAnO1xyXG59O1xyXG5cclxuU0RQVXRpbHMucGFyc2VNTGluZSA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbikge1xyXG4gIHZhciBsaW5lcyA9IFNEUFV0aWxzLnNwbGl0TGluZXMobWVkaWFTZWN0aW9uKTtcclxuICB2YXIgcGFydHMgPSBsaW5lc1swXS5zdWJzdHIoMikuc3BsaXQoJyAnKTtcclxuICByZXR1cm4ge1xyXG4gICAga2luZDogcGFydHNbMF0sXHJcbiAgICBwb3J0OiBwYXJzZUludChwYXJ0c1sxXSwgMTApLFxyXG4gICAgcHJvdG9jb2w6IHBhcnRzWzJdLFxyXG4gICAgZm10OiBwYXJ0cy5zbGljZSgzKS5qb2luKCcgJylcclxuICB9O1xyXG59O1xyXG5cclxuU0RQVXRpbHMucGFyc2VPTGluZSA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbikge1xyXG4gIHZhciBsaW5lID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnbz0nKVswXTtcclxuICB2YXIgcGFydHMgPSBsaW5lLnN1YnN0cigyKS5zcGxpdCgnICcpO1xyXG4gIHJldHVybiB7XHJcbiAgICB1c2VybmFtZTogcGFydHNbMF0sXHJcbiAgICBzZXNzaW9uSWQ6IHBhcnRzWzFdLFxyXG4gICAgc2Vzc2lvblZlcnNpb246IHBhcnNlSW50KHBhcnRzWzJdLCAxMCksXHJcbiAgICBuZXRUeXBlOiBwYXJ0c1szXSxcclxuICAgIGFkZHJlc3NUeXBlOiBwYXJ0c1s0XSxcclxuICAgIGFkZHJlc3M6IHBhcnRzWzVdLFxyXG4gIH07XHJcbn1cclxuXHJcbi8vIEV4cG9zZSBwdWJsaWMgbWV0aG9kcy5cclxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKSB7XHJcbiAgbW9kdWxlLmV4cG9ydHMgPSBTRFBVdGlscztcclxufVxyXG5cclxufSx7fV0sMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcbihmdW5jdGlvbiAoZ2xvYmFsKXtcclxuLypcclxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcclxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxyXG4gKiAgdHJlZS5cclxuICovXHJcbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cclxuXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBhZGFwdGVyRmFjdG9yeSA9IHJlcXVpcmUoJy4vYWRhcHRlcl9mYWN0b3J5LmpzJyk7XHJcbm1vZHVsZS5leHBvcnRzID0gYWRhcHRlckZhY3Rvcnkoe3dpbmRvdzogZ2xvYmFsLndpbmRvd30pO1xyXG5cclxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXHJcbn0se1wiLi9hZGFwdGVyX2ZhY3RvcnkuanNcIjo0fV0sNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcbi8qXHJcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXHJcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcclxuICogIHRyZWUuXHJcbiAqL1xyXG4gLyogZXNsaW50LWVudiBub2RlICovXHJcblxyXG4ndXNlIHN0cmljdCc7XHJcblxyXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XHJcbi8vIFNoaW1taW5nIHN0YXJ0cyBoZXJlLlxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRlcGVuZGVuY2llcywgb3B0cykge1xyXG4gIHZhciB3aW5kb3cgPSBkZXBlbmRlbmNpZXMgJiYgZGVwZW5kZW5jaWVzLndpbmRvdztcclxuXHJcbiAgdmFyIG9wdGlvbnMgPSB7XHJcbiAgICBzaGltQ2hyb21lOiB0cnVlLFxyXG4gICAgc2hpbUZpcmVmb3g6IHRydWUsXHJcbiAgICBzaGltRWRnZTogdHJ1ZSxcclxuICAgIHNoaW1TYWZhcmk6IHRydWUsXHJcbiAgfTtcclxuXHJcbiAgZm9yICh2YXIga2V5IGluIG9wdHMpIHtcclxuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9wdHMsIGtleSkpIHtcclxuICAgICAgb3B0aW9uc1trZXldID0gb3B0c1trZXldO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gVXRpbHMuXHJcbiAgdmFyIGxvZ2dpbmcgPSB1dGlscy5sb2c7XHJcbiAgdmFyIGJyb3dzZXJEZXRhaWxzID0gdXRpbHMuZGV0ZWN0QnJvd3Nlcih3aW5kb3cpO1xyXG5cclxuICAvLyBVbmNvbW1lbnQgdGhlIGxpbmUgYmVsb3cgaWYgeW91IHdhbnQgbG9nZ2luZyB0byBvY2N1ciwgaW5jbHVkaW5nIGxvZ2dpbmdcclxuICAvLyBmb3IgdGhlIHN3aXRjaCBzdGF0ZW1lbnQgYmVsb3cuIENhbiBhbHNvIGJlIHR1cm5lZCBvbiBpbiB0aGUgYnJvd3NlciB2aWFcclxuICAvLyBhZGFwdGVyLmRpc2FibGVMb2coZmFsc2UpLCBidXQgdGhlbiBsb2dnaW5nIGZyb20gdGhlIHN3aXRjaCBzdGF0ZW1lbnQgYmVsb3dcclxuICAvLyB3aWxsIG5vdCBhcHBlYXIuXHJcbiAgLy8gcmVxdWlyZSgnLi91dGlscycpLmRpc2FibGVMb2coZmFsc2UpO1xyXG5cclxuICAvLyBCcm93c2VyIHNoaW1zLlxyXG4gIHZhciBjaHJvbWVTaGltID0gcmVxdWlyZSgnLi9jaHJvbWUvY2hyb21lX3NoaW0nKSB8fCBudWxsO1xyXG4gIHZhciBlZGdlU2hpbSA9IHJlcXVpcmUoJy4vZWRnZS9lZGdlX3NoaW0nKSB8fCBudWxsO1xyXG4gIHZhciBmaXJlZm94U2hpbSA9IHJlcXVpcmUoJy4vZmlyZWZveC9maXJlZm94X3NoaW0nKSB8fCBudWxsO1xyXG4gIHZhciBzYWZhcmlTaGltID0gcmVxdWlyZSgnLi9zYWZhcmkvc2FmYXJpX3NoaW0nKSB8fCBudWxsO1xyXG4gIHZhciBjb21tb25TaGltID0gcmVxdWlyZSgnLi9jb21tb25fc2hpbScpIHx8IG51bGw7XHJcblxyXG4gIC8vIEV4cG9ydCB0byB0aGUgYWRhcHRlciBnbG9iYWwgb2JqZWN0IHZpc2libGUgaW4gdGhlIGJyb3dzZXIuXHJcbiAgdmFyIGFkYXB0ZXIgPSB7XHJcbiAgICBicm93c2VyRGV0YWlsczogYnJvd3NlckRldGFpbHMsXHJcbiAgICBjb21tb25TaGltOiBjb21tb25TaGltLFxyXG4gICAgZXh0cmFjdFZlcnNpb246IHV0aWxzLmV4dHJhY3RWZXJzaW9uLFxyXG4gICAgZGlzYWJsZUxvZzogdXRpbHMuZGlzYWJsZUxvZyxcclxuICAgIGRpc2FibGVXYXJuaW5nczogdXRpbHMuZGlzYWJsZVdhcm5pbmdzXHJcbiAgfTtcclxuXHJcbiAgLy8gU2hpbSBicm93c2VyIGlmIGZvdW5kLlxyXG4gIHN3aXRjaCAoYnJvd3NlckRldGFpbHMuYnJvd3Nlcikge1xyXG4gICAgY2FzZSAnY2hyb21lJzpcclxuICAgICAgaWYgKCFjaHJvbWVTaGltIHx8ICFjaHJvbWVTaGltLnNoaW1QZWVyQ29ubmVjdGlvbiB8fFxyXG4gICAgICAgICAgIW9wdGlvbnMuc2hpbUNocm9tZSkge1xyXG4gICAgICAgIGxvZ2dpbmcoJ0Nocm9tZSBzaGltIGlzIG5vdCBpbmNsdWRlZCBpbiB0aGlzIGFkYXB0ZXIgcmVsZWFzZS4nKTtcclxuICAgICAgICByZXR1cm4gYWRhcHRlcjtcclxuICAgICAgfVxyXG4gICAgICBsb2dnaW5nKCdhZGFwdGVyLmpzIHNoaW1taW5nIGNocm9tZS4nKTtcclxuICAgICAgLy8gRXhwb3J0IHRvIHRoZSBhZGFwdGVyIGdsb2JhbCBvYmplY3QgdmlzaWJsZSBpbiB0aGUgYnJvd3Nlci5cclxuICAgICAgYWRhcHRlci5icm93c2VyU2hpbSA9IGNocm9tZVNoaW07XHJcbiAgICAgIGNvbW1vblNoaW0uc2hpbUNyZWF0ZU9iamVjdFVSTCh3aW5kb3cpO1xyXG5cclxuICAgICAgY2hyb21lU2hpbS5zaGltR2V0VXNlck1lZGlhKHdpbmRvdyk7XHJcbiAgICAgIGNocm9tZVNoaW0uc2hpbU1lZGlhU3RyZWFtKHdpbmRvdyk7XHJcbiAgICAgIGNocm9tZVNoaW0uc2hpbVNvdXJjZU9iamVjdCh3aW5kb3cpO1xyXG4gICAgICBjaHJvbWVTaGltLnNoaW1QZWVyQ29ubmVjdGlvbih3aW5kb3cpO1xyXG4gICAgICBjaHJvbWVTaGltLnNoaW1PblRyYWNrKHdpbmRvdyk7XHJcbiAgICAgIGNocm9tZVNoaW0uc2hpbUFkZFRyYWNrUmVtb3ZlVHJhY2sod2luZG93KTtcclxuICAgICAgY2hyb21lU2hpbS5zaGltR2V0U2VuZGVyc1dpdGhEdG1mKHdpbmRvdyk7XHJcblxyXG4gICAgICBjb21tb25TaGltLnNoaW1SVENJY2VDYW5kaWRhdGUod2luZG93KTtcclxuICAgICAgY29tbW9uU2hpbS5zaGltTWF4TWVzc2FnZVNpemUod2luZG93KTtcclxuICAgICAgY29tbW9uU2hpbS5zaGltU2VuZFRocm93VHlwZUVycm9yKHdpbmRvdyk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnZmlyZWZveCc6XHJcbiAgICAgIGlmICghZmlyZWZveFNoaW0gfHwgIWZpcmVmb3hTaGltLnNoaW1QZWVyQ29ubmVjdGlvbiB8fFxyXG4gICAgICAgICAgIW9wdGlvbnMuc2hpbUZpcmVmb3gpIHtcclxuICAgICAgICBsb2dnaW5nKCdGaXJlZm94IHNoaW0gaXMgbm90IGluY2x1ZGVkIGluIHRoaXMgYWRhcHRlciByZWxlYXNlLicpO1xyXG4gICAgICAgIHJldHVybiBhZGFwdGVyO1xyXG4gICAgICB9XHJcbiAgICAgIGxvZ2dpbmcoJ2FkYXB0ZXIuanMgc2hpbW1pbmcgZmlyZWZveC4nKTtcclxuICAgICAgLy8gRXhwb3J0IHRvIHRoZSBhZGFwdGVyIGdsb2JhbCBvYmplY3QgdmlzaWJsZSBpbiB0aGUgYnJvd3Nlci5cclxuICAgICAgYWRhcHRlci5icm93c2VyU2hpbSA9IGZpcmVmb3hTaGltO1xyXG4gICAgICBjb21tb25TaGltLnNoaW1DcmVhdGVPYmplY3RVUkwod2luZG93KTtcclxuXHJcbiAgICAgIGZpcmVmb3hTaGltLnNoaW1HZXRVc2VyTWVkaWEod2luZG93KTtcclxuICAgICAgZmlyZWZveFNoaW0uc2hpbVNvdXJjZU9iamVjdCh3aW5kb3cpO1xyXG4gICAgICBmaXJlZm94U2hpbS5zaGltUGVlckNvbm5lY3Rpb24od2luZG93KTtcclxuICAgICAgZmlyZWZveFNoaW0uc2hpbU9uVHJhY2sod2luZG93KTtcclxuICAgICAgZmlyZWZveFNoaW0uc2hpbVJlbW92ZVN0cmVhbSh3aW5kb3cpO1xyXG5cclxuICAgICAgY29tbW9uU2hpbS5zaGltUlRDSWNlQ2FuZGlkYXRlKHdpbmRvdyk7XHJcbiAgICAgIGNvbW1vblNoaW0uc2hpbU1heE1lc3NhZ2VTaXplKHdpbmRvdyk7XHJcbiAgICAgIGNvbW1vblNoaW0uc2hpbVNlbmRUaHJvd1R5cGVFcnJvcih3aW5kb3cpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ2VkZ2UnOlxyXG4gICAgICBpZiAoIWVkZ2VTaGltIHx8ICFlZGdlU2hpbS5zaGltUGVlckNvbm5lY3Rpb24gfHwgIW9wdGlvbnMuc2hpbUVkZ2UpIHtcclxuICAgICAgICBsb2dnaW5nKCdNUyBlZGdlIHNoaW0gaXMgbm90IGluY2x1ZGVkIGluIHRoaXMgYWRhcHRlciByZWxlYXNlLicpO1xyXG4gICAgICAgIHJldHVybiBhZGFwdGVyO1xyXG4gICAgICB9XHJcbiAgICAgIGxvZ2dpbmcoJ2FkYXB0ZXIuanMgc2hpbW1pbmcgZWRnZS4nKTtcclxuICAgICAgLy8gRXhwb3J0IHRvIHRoZSBhZGFwdGVyIGdsb2JhbCBvYmplY3QgdmlzaWJsZSBpbiB0aGUgYnJvd3Nlci5cclxuICAgICAgYWRhcHRlci5icm93c2VyU2hpbSA9IGVkZ2VTaGltO1xyXG4gICAgICBjb21tb25TaGltLnNoaW1DcmVhdGVPYmplY3RVUkwod2luZG93KTtcclxuXHJcbiAgICAgIGVkZ2VTaGltLnNoaW1HZXRVc2VyTWVkaWEod2luZG93KTtcclxuICAgICAgZWRnZVNoaW0uc2hpbVBlZXJDb25uZWN0aW9uKHdpbmRvdyk7XHJcbiAgICAgIGVkZ2VTaGltLnNoaW1SZXBsYWNlVHJhY2sod2luZG93KTtcclxuXHJcbiAgICAgIC8vIHRoZSBlZGdlIHNoaW0gaW1wbGVtZW50cyB0aGUgZnVsbCBSVENJY2VDYW5kaWRhdGUgb2JqZWN0LlxyXG5cclxuICAgICAgY29tbW9uU2hpbS5zaGltTWF4TWVzc2FnZVNpemUod2luZG93KTtcclxuICAgICAgY29tbW9uU2hpbS5zaGltU2VuZFRocm93VHlwZUVycm9yKHdpbmRvdyk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnc2FmYXJpJzpcclxuICAgICAgaWYgKCFzYWZhcmlTaGltIHx8ICFvcHRpb25zLnNoaW1TYWZhcmkpIHtcclxuICAgICAgICBsb2dnaW5nKCdTYWZhcmkgc2hpbSBpcyBub3QgaW5jbHVkZWQgaW4gdGhpcyBhZGFwdGVyIHJlbGVhc2UuJyk7XHJcbiAgICAgICAgcmV0dXJuIGFkYXB0ZXI7XHJcbiAgICAgIH1cclxuICAgICAgbG9nZ2luZygnYWRhcHRlci5qcyBzaGltbWluZyBzYWZhcmkuJyk7XHJcbiAgICAgIC8vIEV4cG9ydCB0byB0aGUgYWRhcHRlciBnbG9iYWwgb2JqZWN0IHZpc2libGUgaW4gdGhlIGJyb3dzZXIuXHJcbiAgICAgIGFkYXB0ZXIuYnJvd3NlclNoaW0gPSBzYWZhcmlTaGltO1xyXG4gICAgICBjb21tb25TaGltLnNoaW1DcmVhdGVPYmplY3RVUkwod2luZG93KTtcclxuXHJcbiAgICAgIHNhZmFyaVNoaW0uc2hpbVJUQ0ljZVNlcnZlclVybHMod2luZG93KTtcclxuICAgICAgc2FmYXJpU2hpbS5zaGltQ2FsbGJhY2tzQVBJKHdpbmRvdyk7XHJcbiAgICAgIHNhZmFyaVNoaW0uc2hpbUxvY2FsU3RyZWFtc0FQSSh3aW5kb3cpO1xyXG4gICAgICBzYWZhcmlTaGltLnNoaW1SZW1vdGVTdHJlYW1zQVBJKHdpbmRvdyk7XHJcbiAgICAgIHNhZmFyaVNoaW0uc2hpbVRyYWNrRXZlbnRUcmFuc2NlaXZlcih3aW5kb3cpO1xyXG4gICAgICBzYWZhcmlTaGltLnNoaW1HZXRVc2VyTWVkaWEod2luZG93KTtcclxuICAgICAgc2FmYXJpU2hpbS5zaGltQ3JlYXRlT2ZmZXJMZWdhY3kod2luZG93KTtcclxuXHJcbiAgICAgIGNvbW1vblNoaW0uc2hpbVJUQ0ljZUNhbmRpZGF0ZSh3aW5kb3cpO1xyXG4gICAgICBjb21tb25TaGltLnNoaW1NYXhNZXNzYWdlU2l6ZSh3aW5kb3cpO1xyXG4gICAgICBjb21tb25TaGltLnNoaW1TZW5kVGhyb3dUeXBlRXJyb3Iod2luZG93KTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICBsb2dnaW5nKCdVbnN1cHBvcnRlZCBicm93c2VyIScpO1xyXG4gICAgICBicmVhaztcclxuICB9XHJcblxyXG4gIHJldHVybiBhZGFwdGVyO1xyXG59O1xyXG5cclxufSx7XCIuL2Nocm9tZS9jaHJvbWVfc2hpbVwiOjUsXCIuL2NvbW1vbl9zaGltXCI6NyxcIi4vZWRnZS9lZGdlX3NoaW1cIjo4LFwiLi9maXJlZm94L2ZpcmVmb3hfc2hpbVwiOjEwLFwiLi9zYWZhcmkvc2FmYXJpX3NoaW1cIjoxMixcIi4vdXRpbHNcIjoxM31dLDU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG5cclxuLypcclxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcclxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxyXG4gKiAgdHJlZS5cclxuICovXHJcbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscy5qcycpO1xyXG52YXIgbG9nZ2luZyA9IHV0aWxzLmxvZztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIHNoaW1HZXRVc2VyTWVkaWE6IHJlcXVpcmUoJy4vZ2V0dXNlcm1lZGlhJyksXHJcbiAgc2hpbU1lZGlhU3RyZWFtOiBmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIHdpbmRvdy5NZWRpYVN0cmVhbSA9IHdpbmRvdy5NZWRpYVN0cmVhbSB8fCB3aW5kb3cud2Via2l0TWVkaWFTdHJlYW07XHJcbiAgfSxcclxuXHJcbiAgc2hpbU9uVHJhY2s6IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiAmJiAhKCdvbnRyYWNrJyBpblxyXG4gICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLCAnb250cmFjaycsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuX29udHJhY2s7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKGYpIHtcclxuICAgICAgICAgIGlmICh0aGlzLl9vbnRyYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhY2snLCB0aGlzLl9vbnRyYWNrKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigndHJhY2snLCB0aGlzLl9vbnRyYWNrID0gZik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgdmFyIG9yaWdTZXRSZW1vdGVEZXNjcmlwdGlvbiA9XHJcbiAgICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnNldFJlbW90ZURlc2NyaXB0aW9uO1xyXG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnNldFJlbW90ZURlc2NyaXB0aW9uID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgICBpZiAoIXBjLl9vbnRyYWNrcG9seSkge1xyXG4gICAgICAgICAgcGMuX29udHJhY2twb2x5ID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAvLyBvbmFkZHN0cmVhbSBkb2VzIG5vdCBmaXJlIHdoZW4gYSB0cmFjayBpcyBhZGRlZCB0byBhbiBleGlzdGluZ1xyXG4gICAgICAgICAgICAvLyBzdHJlYW0uIEJ1dCBzdHJlYW0ub25hZGR0cmFjayBpcyBpbXBsZW1lbnRlZCBzbyB3ZSB1c2UgdGhhdC5cclxuICAgICAgICAgICAgZS5zdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcignYWRkdHJhY2snLCBmdW5jdGlvbih0ZSkge1xyXG4gICAgICAgICAgICAgIHZhciByZWNlaXZlcjtcclxuICAgICAgICAgICAgICBpZiAod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRSZWNlaXZlcnMpIHtcclxuICAgICAgICAgICAgICAgIHJlY2VpdmVyID0gcGMuZ2V0UmVjZWl2ZXJzKCkuZmluZChmdW5jdGlvbihyKSB7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiByLnRyYWNrICYmIHIudHJhY2suaWQgPT09IHRlLnRyYWNrLmlkO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlY2VpdmVyID0ge3RyYWNrOiB0ZS50cmFja307XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ3RyYWNrJyk7XHJcbiAgICAgICAgICAgICAgZXZlbnQudHJhY2sgPSB0ZS50cmFjaztcclxuICAgICAgICAgICAgICBldmVudC5yZWNlaXZlciA9IHJlY2VpdmVyO1xyXG4gICAgICAgICAgICAgIGV2ZW50LnRyYW5zY2VpdmVyID0ge3JlY2VpdmVyOiByZWNlaXZlcn07XHJcbiAgICAgICAgICAgICAgZXZlbnQuc3RyZWFtcyA9IFtlLnN0cmVhbV07XHJcbiAgICAgICAgICAgICAgcGMuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBlLnN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XHJcbiAgICAgICAgICAgICAgdmFyIHJlY2VpdmVyO1xyXG4gICAgICAgICAgICAgIGlmICh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFJlY2VpdmVycykge1xyXG4gICAgICAgICAgICAgICAgcmVjZWl2ZXIgPSBwYy5nZXRSZWNlaXZlcnMoKS5maW5kKGZ1bmN0aW9uKHIpIHtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHIudHJhY2sgJiYgci50cmFjay5pZCA9PT0gdHJhY2suaWQ7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVjZWl2ZXIgPSB7dHJhY2s6IHRyYWNrfTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCd0cmFjaycpO1xyXG4gICAgICAgICAgICAgIGV2ZW50LnRyYWNrID0gdHJhY2s7XHJcbiAgICAgICAgICAgICAgZXZlbnQucmVjZWl2ZXIgPSByZWNlaXZlcjtcclxuICAgICAgICAgICAgICBldmVudC50cmFuc2NlaXZlciA9IHtyZWNlaXZlcjogcmVjZWl2ZXJ9O1xyXG4gICAgICAgICAgICAgIGV2ZW50LnN0cmVhbXMgPSBbZS5zdHJlYW1dO1xyXG4gICAgICAgICAgICAgIHBjLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICBwYy5hZGRFdmVudExpc3RlbmVyKCdhZGRzdHJlYW0nLCBwYy5fb250cmFja3BvbHkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3JpZ1NldFJlbW90ZURlc2NyaXB0aW9uLmFwcGx5KHBjLCBhcmd1bWVudHMpO1xyXG4gICAgICB9O1xyXG4gICAgfSBlbHNlIGlmICghKCdSVENSdHBUcmFuc2NlaXZlcicgaW4gd2luZG93KSkge1xyXG4gICAgICB1dGlscy53cmFwUGVlckNvbm5lY3Rpb25FdmVudCh3aW5kb3csICd0cmFjaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAoIWUudHJhbnNjZWl2ZXIpIHtcclxuICAgICAgICAgIGUudHJhbnNjZWl2ZXIgPSB7cmVjZWl2ZXI6IGUucmVjZWl2ZXJ9O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgc2hpbUdldFNlbmRlcnNXaXRoRHRtZjogZnVuY3Rpb24od2luZG93KSB7XHJcbiAgICAvLyBPdmVycmlkZXMgYWRkVHJhY2svcmVtb3ZlVHJhY2ssIGRlcGVuZHMgb24gc2hpbUFkZFRyYWNrUmVtb3ZlVHJhY2suXHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uICYmXHJcbiAgICAgICAgISgnZ2V0U2VuZGVycycgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkgJiZcclxuICAgICAgICAnY3JlYXRlRFRNRlNlbmRlcicgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkge1xyXG4gICAgICB2YXIgc2hpbVNlbmRlcldpdGhEdG1mID0gZnVuY3Rpb24ocGMsIHRyYWNrKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHRyYWNrOiB0cmFjayxcclxuICAgICAgICAgIGdldCBkdG1mKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fZHRtZiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgaWYgKHRyYWNrLmtpbmQgPT09ICdhdWRpbycpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2R0bWYgPSBwYy5jcmVhdGVEVE1GU2VuZGVyKHRyYWNrKTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZHRtZiA9IG51bGw7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kdG1mO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIF9wYzogcGNcclxuICAgICAgICB9O1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gYXVnbWVudCBhZGRUcmFjayB3aGVuIGdldFNlbmRlcnMgaXMgbm90IGF2YWlsYWJsZS5cclxuICAgICAgaWYgKCF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFNlbmRlcnMpIHtcclxuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFNlbmRlcnMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHRoaXMuX3NlbmRlcnMgPSB0aGlzLl9zZW5kZXJzIHx8IFtdO1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuX3NlbmRlcnMuc2xpY2UoKTsgLy8gcmV0dXJuIGEgY29weSBvZiB0aGUgaW50ZXJuYWwgc3RhdGUuXHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgb3JpZ0FkZFRyYWNrID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjaztcclxuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFRyYWNrID0gZnVuY3Rpb24odHJhY2ssIHN0cmVhbSkge1xyXG4gICAgICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgICAgIHZhciBzZW5kZXIgPSBvcmlnQWRkVHJhY2suYXBwbHkocGMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICBpZiAoIXNlbmRlcikge1xyXG4gICAgICAgICAgICBzZW5kZXIgPSBzaGltU2VuZGVyV2l0aER0bWYocGMsIHRyYWNrKTtcclxuICAgICAgICAgICAgcGMuX3NlbmRlcnMucHVzaChzZW5kZXIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIHNlbmRlcjtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2YXIgb3JpZ1JlbW92ZVRyYWNrID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVUcmFjaztcclxuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVRyYWNrID0gZnVuY3Rpb24oc2VuZGVyKSB7XHJcbiAgICAgICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICAgICAgb3JpZ1JlbW92ZVRyYWNrLmFwcGx5KHBjLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgdmFyIGlkeCA9IHBjLl9zZW5kZXJzLmluZGV4T2Yoc2VuZGVyKTtcclxuICAgICAgICAgIGlmIChpZHggIT09IC0xKSB7XHJcbiAgICAgICAgICAgIHBjLl9zZW5kZXJzLnNwbGljZShpZHgsIDEpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgICAgdmFyIG9yaWdBZGRTdHJlYW0gPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFN0cmVhbTtcclxuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcclxuICAgICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICAgIHBjLl9zZW5kZXJzID0gcGMuX3NlbmRlcnMgfHwgW107XHJcbiAgICAgICAgb3JpZ0FkZFN0cmVhbS5hcHBseShwYywgW3N0cmVhbV0pO1xyXG4gICAgICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XHJcbiAgICAgICAgICBwYy5fc2VuZGVycy5wdXNoKHNoaW1TZW5kZXJXaXRoRHRtZihwYywgdHJhY2spKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHZhciBvcmlnUmVtb3ZlU3RyZWFtID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVTdHJlYW07XHJcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgICBwYy5fc2VuZGVycyA9IHBjLl9zZW5kZXJzIHx8IFtdO1xyXG4gICAgICAgIG9yaWdSZW1vdmVTdHJlYW0uYXBwbHkocGMsIFtzdHJlYW1dKTtcclxuXHJcbiAgICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcclxuICAgICAgICAgIHZhciBzZW5kZXIgPSBwYy5fc2VuZGVycy5maW5kKGZ1bmN0aW9uKHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHMudHJhY2sgPT09IHRyYWNrO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBpZiAoc2VuZGVyKSB7XHJcbiAgICAgICAgICAgIHBjLl9zZW5kZXJzLnNwbGljZShwYy5fc2VuZGVycy5pbmRleE9mKHNlbmRlciksIDEpOyAvLyByZW1vdmUgc2VuZGVyXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH07XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiAmJlxyXG4gICAgICAgICAgICAgICAnZ2V0U2VuZGVycycgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSAmJlxyXG4gICAgICAgICAgICAgICAnY3JlYXRlRFRNRlNlbmRlcicgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSAmJlxyXG4gICAgICAgICAgICAgICB3aW5kb3cuUlRDUnRwU2VuZGVyICYmXHJcbiAgICAgICAgICAgICAgICEoJ2R0bWYnIGluIHdpbmRvdy5SVENSdHBTZW5kZXIucHJvdG90eXBlKSkge1xyXG4gICAgICB2YXIgb3JpZ0dldFNlbmRlcnMgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFNlbmRlcnM7XHJcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U2VuZGVycyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHNlbmRlcnMgPSBvcmlnR2V0U2VuZGVycy5hcHBseShwYywgW10pO1xyXG4gICAgICAgIHNlbmRlcnMuZm9yRWFjaChmdW5jdGlvbihzZW5kZXIpIHtcclxuICAgICAgICAgIHNlbmRlci5fcGMgPSBwYztcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gc2VuZGVycztcclxuICAgICAgfTtcclxuXHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUnRwU2VuZGVyLnByb3RvdHlwZSwgJ2R0bWYnLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGlmICh0aGlzLl9kdG1mID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudHJhY2sua2luZCA9PT0gJ2F1ZGlvJykge1xyXG4gICAgICAgICAgICAgIHRoaXMuX2R0bWYgPSB0aGlzLl9wYy5jcmVhdGVEVE1GU2VuZGVyKHRoaXMudHJhY2spO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRoaXMuX2R0bWYgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5fZHRtZjtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHNoaW1Tb3VyY2VPYmplY3Q6IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgdmFyIFVSTCA9IHdpbmRvdyAmJiB3aW5kb3cuVVJMO1xyXG5cclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBpZiAod2luZG93LkhUTUxNZWRpYUVsZW1lbnQgJiZcclxuICAgICAgICAhKCdzcmNPYmplY3QnIGluIHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50LnByb3RvdHlwZSkpIHtcclxuICAgICAgICAvLyBTaGltIHRoZSBzcmNPYmplY3QgcHJvcGVydHksIG9uY2UsIHdoZW4gSFRNTE1lZGlhRWxlbWVudCBpcyBmb3VuZC5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LkhUTUxNZWRpYUVsZW1lbnQucHJvdG90eXBlLCAnc3JjT2JqZWN0Jywge1xyXG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NyY09iamVjdDtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHN0cmVhbSkge1xyXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIC8vIFVzZSBfc3JjT2JqZWN0IGFzIGEgcHJpdmF0ZSBwcm9wZXJ0eSBmb3IgdGhpcyBzaGltXHJcbiAgICAgICAgICAgIHRoaXMuX3NyY09iamVjdCA9IHN0cmVhbTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3JjKSB7XHJcbiAgICAgICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTCh0aGlzLnNyYyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghc3RyZWFtKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5zcmMgPSAnJztcclxuICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc3JjID0gVVJMLmNyZWF0ZU9iamVjdFVSTChzdHJlYW0pO1xyXG4gICAgICAgICAgICAvLyBXZSBuZWVkIHRvIHJlY3JlYXRlIHRoZSBibG9iIHVybCB3aGVuIGEgdHJhY2sgaXMgYWRkZWQgb3JcclxuICAgICAgICAgICAgLy8gcmVtb3ZlZC4gRG9pbmcgaXQgbWFudWFsbHkgc2luY2Ugd2Ugd2FudCB0byBhdm9pZCBhIHJlY3Vyc2lvbi5cclxuICAgICAgICAgICAgc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoJ2FkZHRyYWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgaWYgKHNlbGYuc3JjKSB7XHJcbiAgICAgICAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHNlbGYuc3JjKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgc2VsZi5zcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKHN0cmVhbSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcigncmVtb3ZldHJhY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICBpZiAoc2VsZi5zcmMpIHtcclxuICAgICAgICAgICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwoc2VsZi5zcmMpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBzZWxmLnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoc3RyZWFtKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBzaGltQWRkVHJhY2tSZW1vdmVUcmFja1dpdGhOYXRpdmU6IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgLy8gc2hpbSBhZGRUcmFjay9yZW1vdmVUcmFjayB3aXRoIG5hdGl2ZSB2YXJpYW50cyBpbiBvcmRlciB0byBtYWtlXHJcbiAgICAvLyB0aGUgaW50ZXJhY3Rpb25zIHdpdGggbGVnYWN5IGdldExvY2FsU3RyZWFtcyBiZWhhdmUgYXMgaW4gb3RoZXIgYnJvd3NlcnMuXHJcbiAgICAvLyBLZWVwcyBhIG1hcHBpbmcgc3RyZWFtLmlkID0+IFtzdHJlYW0sIHJ0cHNlbmRlcnMuLi5dXHJcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldExvY2FsU3RyZWFtcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zID0gdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcyB8fCB7fTtcclxuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMpLm1hcChmdW5jdGlvbihzdHJlYW1JZCkge1xyXG4gICAgICAgIHJldHVybiBwYy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW1JZF1bMF07XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgb3JpZ0FkZFRyYWNrID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjaztcclxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2sgPSBmdW5jdGlvbih0cmFjaywgc3RyZWFtKSB7XHJcbiAgICAgIGlmICghc3RyZWFtKSB7XHJcbiAgICAgICAgcmV0dXJuIG9yaWdBZGRUcmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMgPSB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zIHx8IHt9O1xyXG5cclxuICAgICAgdmFyIHNlbmRlciA9IG9yaWdBZGRUcmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICBpZiAoIXRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtLmlkXSkge1xyXG4gICAgICAgIHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtLmlkXSA9IFtzdHJlYW0sIHNlbmRlcl07XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW0uaWRdLmluZGV4T2Yoc2VuZGVyKSA9PT0gLTEpIHtcclxuICAgICAgICB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbS5pZF0ucHVzaChzZW5kZXIpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBzZW5kZXI7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBvcmlnQWRkU3RyZWFtID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRTdHJlYW07XHJcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xyXG4gICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zID0gdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcyB8fCB7fTtcclxuXHJcbiAgICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XHJcbiAgICAgICAgdmFyIGFscmVhZHlFeGlzdHMgPSBwYy5nZXRTZW5kZXJzKCkuZmluZChmdW5jdGlvbihzKSB7XHJcbiAgICAgICAgICByZXR1cm4gcy50cmFjayA9PT0gdHJhY2s7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oJ1RyYWNrIGFscmVhZHkgZXhpc3RzLicsXHJcbiAgICAgICAgICAgICAgJ0ludmFsaWRBY2Nlc3NFcnJvcicpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHZhciBleGlzdGluZ1NlbmRlcnMgPSBwYy5nZXRTZW5kZXJzKCk7XHJcbiAgICAgIG9yaWdBZGRTdHJlYW0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgdmFyIG5ld1NlbmRlcnMgPSBwYy5nZXRTZW5kZXJzKCkuZmlsdGVyKGZ1bmN0aW9uKG5ld1NlbmRlcikge1xyXG4gICAgICAgIHJldHVybiBleGlzdGluZ1NlbmRlcnMuaW5kZXhPZihuZXdTZW5kZXIpID09PSAtMTtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtLmlkXSA9IFtzdHJlYW1dLmNvbmNhdChuZXdTZW5kZXJzKTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIG9yaWdSZW1vdmVTdHJlYW0gPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVN0cmVhbTtcclxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICAgIHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMgPSB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zIHx8IHt9O1xyXG4gICAgICBkZWxldGUgdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW0uaWRdO1xyXG4gICAgICByZXR1cm4gb3JpZ1JlbW92ZVN0cmVhbS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgb3JpZ1JlbW92ZVRyYWNrID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVUcmFjaztcclxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlVHJhY2sgPSBmdW5jdGlvbihzZW5kZXIpIHtcclxuICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcyA9IHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMgfHwge307XHJcbiAgICAgIGlmIChzZW5kZXIpIHtcclxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zKS5mb3JFYWNoKGZ1bmN0aW9uKHN0cmVhbUlkKSB7XHJcbiAgICAgICAgICB2YXIgaWR4ID0gcGMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtSWRdLmluZGV4T2Yoc2VuZGVyKTtcclxuICAgICAgICAgIGlmIChpZHggIT09IC0xKSB7XHJcbiAgICAgICAgICAgIHBjLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbUlkXS5zcGxpY2UoaWR4LCAxKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChwYy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW1JZF0ubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBwYy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW1JZF07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG9yaWdSZW1vdmVUcmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgfTtcclxuICB9LFxyXG5cclxuICBzaGltQWRkVHJhY2tSZW1vdmVUcmFjazogZnVuY3Rpb24od2luZG93KSB7XHJcbiAgICB2YXIgYnJvd3NlckRldGFpbHMgPSB1dGlscy5kZXRlY3RCcm93c2VyKHdpbmRvdyk7XHJcbiAgICAvLyBzaGltIGFkZFRyYWNrIGFuZCByZW1vdmVUcmFjay5cclxuICAgIGlmICh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFRyYWNrICYmXHJcbiAgICAgICAgYnJvd3NlckRldGFpbHMudmVyc2lvbiA+PSA2NSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5zaGltQWRkVHJhY2tSZW1vdmVUcmFja1dpdGhOYXRpdmUod2luZG93KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhbHNvIHNoaW0gcGMuZ2V0TG9jYWxTdHJlYW1zIHdoZW4gYWRkVHJhY2sgaXMgc2hpbW1lZFxyXG4gICAgLy8gdG8gcmV0dXJuIHRoZSBvcmlnaW5hbCBzdHJlYW1zLlxyXG4gICAgdmFyIG9yaWdHZXRMb2NhbFN0cmVhbXMgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlXHJcbiAgICAgICAgLmdldExvY2FsU3RyZWFtcztcclxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0TG9jYWxTdHJlYW1zID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgIHZhciBuYXRpdmVTdHJlYW1zID0gb3JpZ0dldExvY2FsU3RyZWFtcy5hcHBseSh0aGlzKTtcclxuICAgICAgcGMuX3JldmVyc2VTdHJlYW1zID0gcGMuX3JldmVyc2VTdHJlYW1zIHx8IHt9O1xyXG4gICAgICByZXR1cm4gbmF0aXZlU3RyZWFtcy5tYXAoZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICAgICAgcmV0dXJuIHBjLl9yZXZlcnNlU3RyZWFtc1tzdHJlYW0uaWRdO1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIG9yaWdBZGRTdHJlYW0gPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFN0cmVhbTtcclxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgIHBjLl9zdHJlYW1zID0gcGMuX3N0cmVhbXMgfHwge307XHJcbiAgICAgIHBjLl9yZXZlcnNlU3RyZWFtcyA9IHBjLl9yZXZlcnNlU3RyZWFtcyB8fCB7fTtcclxuXHJcbiAgICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XHJcbiAgICAgICAgdmFyIGFscmVhZHlFeGlzdHMgPSBwYy5nZXRTZW5kZXJzKCkuZmluZChmdW5jdGlvbihzKSB7XHJcbiAgICAgICAgICByZXR1cm4gcy50cmFjayA9PT0gdHJhY2s7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oJ1RyYWNrIGFscmVhZHkgZXhpc3RzLicsXHJcbiAgICAgICAgICAgICAgJ0ludmFsaWRBY2Nlc3NFcnJvcicpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIC8vIEFkZCBpZGVudGl0eSBtYXBwaW5nIGZvciBjb25zaXN0ZW5jeSB3aXRoIGFkZFRyYWNrLlxyXG4gICAgICAvLyBVbmxlc3MgdGhpcyBpcyBiZWluZyB1c2VkIHdpdGggYSBzdHJlYW0gZnJvbSBhZGRUcmFjay5cclxuICAgICAgaWYgKCFwYy5fcmV2ZXJzZVN0cmVhbXNbc3RyZWFtLmlkXSkge1xyXG4gICAgICAgIHZhciBuZXdTdHJlYW0gPSBuZXcgd2luZG93Lk1lZGlhU3RyZWFtKHN0cmVhbS5nZXRUcmFja3MoKSk7XHJcbiAgICAgICAgcGMuX3N0cmVhbXNbc3RyZWFtLmlkXSA9IG5ld1N0cmVhbTtcclxuICAgICAgICBwYy5fcmV2ZXJzZVN0cmVhbXNbbmV3U3RyZWFtLmlkXSA9IHN0cmVhbTtcclxuICAgICAgICBzdHJlYW0gPSBuZXdTdHJlYW07XHJcbiAgICAgIH1cclxuICAgICAgb3JpZ0FkZFN0cmVhbS5hcHBseShwYywgW3N0cmVhbV0pO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgb3JpZ1JlbW92ZVN0cmVhbSA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlU3RyZWFtO1xyXG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcclxuICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgcGMuX3N0cmVhbXMgPSBwYy5fc3RyZWFtcyB8fCB7fTtcclxuICAgICAgcGMuX3JldmVyc2VTdHJlYW1zID0gcGMuX3JldmVyc2VTdHJlYW1zIHx8IHt9O1xyXG5cclxuICAgICAgb3JpZ1JlbW92ZVN0cmVhbS5hcHBseShwYywgWyhwYy5fc3RyZWFtc1tzdHJlYW0uaWRdIHx8IHN0cmVhbSldKTtcclxuICAgICAgZGVsZXRlIHBjLl9yZXZlcnNlU3RyZWFtc1socGMuX3N0cmVhbXNbc3RyZWFtLmlkXSA/XHJcbiAgICAgICAgICBwYy5fc3RyZWFtc1tzdHJlYW0uaWRdLmlkIDogc3RyZWFtLmlkKV07XHJcbiAgICAgIGRlbGV0ZSBwYy5fc3RyZWFtc1tzdHJlYW0uaWRdO1xyXG4gICAgfTtcclxuXHJcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFRyYWNrID0gZnVuY3Rpb24odHJhY2ssIHN0cmVhbSkge1xyXG4gICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICBpZiAocGMuc2lnbmFsaW5nU3RhdGUgPT09ICdjbG9zZWQnKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbihcclxuICAgICAgICAgICdUaGUgUlRDUGVlckNvbm5lY3Rpb25cXCdzIHNpZ25hbGluZ1N0YXRlIGlzIFxcJ2Nsb3NlZFxcJy4nLFxyXG4gICAgICAgICAgJ0ludmFsaWRTdGF0ZUVycm9yJyk7XHJcbiAgICAgIH1cclxuICAgICAgdmFyIHN0cmVhbXMgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XHJcbiAgICAgIGlmIChzdHJlYW1zLmxlbmd0aCAhPT0gMSB8fFxyXG4gICAgICAgICAgIXN0cmVhbXNbMF0uZ2V0VHJhY2tzKCkuZmluZChmdW5jdGlvbih0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0ID09PSB0cmFjaztcclxuICAgICAgICAgIH0pKSB7XHJcbiAgICAgICAgLy8gdGhpcyBpcyBub3QgZnVsbHkgY29ycmVjdCBidXQgYWxsIHdlIGNhbiBtYW5hZ2Ugd2l0aG91dFxyXG4gICAgICAgIC8vIFtbYXNzb2NpYXRlZCBNZWRpYVN0cmVhbXNdXSBpbnRlcm5hbCBzbG90LlxyXG4gICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oXHJcbiAgICAgICAgICAnVGhlIGFkYXB0ZXIuanMgYWRkVHJhY2sgcG9seWZpbGwgb25seSBzdXBwb3J0cyBhIHNpbmdsZSAnICtcclxuICAgICAgICAgICcgc3RyZWFtIHdoaWNoIGlzIGFzc29jaWF0ZWQgd2l0aCB0aGUgc3BlY2lmaWVkIHRyYWNrLicsXHJcbiAgICAgICAgICAnTm90U3VwcG9ydGVkRXJyb3InKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIGFscmVhZHlFeGlzdHMgPSBwYy5nZXRTZW5kZXJzKCkuZmluZChmdW5jdGlvbihzKSB7XHJcbiAgICAgICAgcmV0dXJuIHMudHJhY2sgPT09IHRyYWNrO1xyXG4gICAgICB9KTtcclxuICAgICAgaWYgKGFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKCdUcmFjayBhbHJlYWR5IGV4aXN0cy4nLFxyXG4gICAgICAgICAgICAnSW52YWxpZEFjY2Vzc0Vycm9yJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHBjLl9zdHJlYW1zID0gcGMuX3N0cmVhbXMgfHwge307XHJcbiAgICAgIHBjLl9yZXZlcnNlU3RyZWFtcyA9IHBjLl9yZXZlcnNlU3RyZWFtcyB8fCB7fTtcclxuICAgICAgdmFyIG9sZFN0cmVhbSA9IHBjLl9zdHJlYW1zW3N0cmVhbS5pZF07XHJcbiAgICAgIGlmIChvbGRTdHJlYW0pIHtcclxuICAgICAgICAvLyB0aGlzIGlzIHVzaW5nIG9kZCBDaHJvbWUgYmVoYXZpb3VyLCB1c2Ugd2l0aCBjYXV0aW9uOlxyXG4gICAgICAgIC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC93ZWJydGMvaXNzdWVzL2RldGFpbD9pZD03ODE1XHJcbiAgICAgICAgLy8gTm90ZTogd2UgcmVseSBvbiB0aGUgaGlnaC1sZXZlbCBhZGRUcmFjay9kdG1mIHNoaW0gdG9cclxuICAgICAgICAvLyBjcmVhdGUgdGhlIHNlbmRlciB3aXRoIGEgZHRtZiBzZW5kZXIuXHJcbiAgICAgICAgb2xkU3RyZWFtLmFkZFRyYWNrKHRyYWNrKTtcclxuXHJcbiAgICAgICAgLy8gVHJpZ2dlciBPTk4gYXN5bmMuXHJcbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHBjLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCduZWdvdGlhdGlvbm5lZWRlZCcpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgbmV3U3RyZWFtID0gbmV3IHdpbmRvdy5NZWRpYVN0cmVhbShbdHJhY2tdKTtcclxuICAgICAgICBwYy5fc3RyZWFtc1tzdHJlYW0uaWRdID0gbmV3U3RyZWFtO1xyXG4gICAgICAgIHBjLl9yZXZlcnNlU3RyZWFtc1tuZXdTdHJlYW0uaWRdID0gc3RyZWFtO1xyXG4gICAgICAgIHBjLmFkZFN0cmVhbShuZXdTdHJlYW0pO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBwYy5nZXRTZW5kZXJzKCkuZmluZChmdW5jdGlvbihzKSB7XHJcbiAgICAgICAgcmV0dXJuIHMudHJhY2sgPT09IHRyYWNrO1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gcmVwbGFjZSB0aGUgaW50ZXJuYWwgc3RyZWFtIGlkIHdpdGggdGhlIGV4dGVybmFsIG9uZSBhbmRcclxuICAgIC8vIHZpY2UgdmVyc2EuXHJcbiAgICBmdW5jdGlvbiByZXBsYWNlSW50ZXJuYWxTdHJlYW1JZChwYywgZGVzY3JpcHRpb24pIHtcclxuICAgICAgdmFyIHNkcCA9IGRlc2NyaXB0aW9uLnNkcDtcclxuICAgICAgT2JqZWN0LmtleXMocGMuX3JldmVyc2VTdHJlYW1zIHx8IFtdKS5mb3JFYWNoKGZ1bmN0aW9uKGludGVybmFsSWQpIHtcclxuICAgICAgICB2YXIgZXh0ZXJuYWxTdHJlYW0gPSBwYy5fcmV2ZXJzZVN0cmVhbXNbaW50ZXJuYWxJZF07XHJcbiAgICAgICAgdmFyIGludGVybmFsU3RyZWFtID0gcGMuX3N0cmVhbXNbZXh0ZXJuYWxTdHJlYW0uaWRdO1xyXG4gICAgICAgIHNkcCA9IHNkcC5yZXBsYWNlKG5ldyBSZWdFeHAoaW50ZXJuYWxTdHJlYW0uaWQsICdnJyksXHJcbiAgICAgICAgICAgIGV4dGVybmFsU3RyZWFtLmlkKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBuZXcgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKHtcclxuICAgICAgICB0eXBlOiBkZXNjcmlwdGlvbi50eXBlLFxyXG4gICAgICAgIHNkcDogc2RwXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcmVwbGFjZUV4dGVybmFsU3RyZWFtSWQocGMsIGRlc2NyaXB0aW9uKSB7XHJcbiAgICAgIHZhciBzZHAgPSBkZXNjcmlwdGlvbi5zZHA7XHJcbiAgICAgIE9iamVjdC5rZXlzKHBjLl9yZXZlcnNlU3RyZWFtcyB8fCBbXSkuZm9yRWFjaChmdW5jdGlvbihpbnRlcm5hbElkKSB7XHJcbiAgICAgICAgdmFyIGV4dGVybmFsU3RyZWFtID0gcGMuX3JldmVyc2VTdHJlYW1zW2ludGVybmFsSWRdO1xyXG4gICAgICAgIHZhciBpbnRlcm5hbFN0cmVhbSA9IHBjLl9zdHJlYW1zW2V4dGVybmFsU3RyZWFtLmlkXTtcclxuICAgICAgICBzZHAgPSBzZHAucmVwbGFjZShuZXcgUmVnRXhwKGV4dGVybmFsU3RyZWFtLmlkLCAnZycpLFxyXG4gICAgICAgICAgICBpbnRlcm5hbFN0cmVhbS5pZCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gbmV3IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbih7XHJcbiAgICAgICAgdHlwZTogZGVzY3JpcHRpb24udHlwZSxcclxuICAgICAgICBzZHA6IHNkcFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIFsnY3JlYXRlT2ZmZXInLCAnY3JlYXRlQW5zd2VyJ10uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcclxuICAgICAgdmFyIG5hdGl2ZU1ldGhvZCA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXTtcclxuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcclxuICAgICAgICB2YXIgaXNMZWdhY3lDYWxsID0gYXJndW1lbnRzLmxlbmd0aCAmJlxyXG4gICAgICAgICAgICB0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnZnVuY3Rpb24nO1xyXG4gICAgICAgIGlmIChpc0xlZ2FjeUNhbGwpIHtcclxuICAgICAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkocGMsIFtcclxuICAgICAgICAgICAgZnVuY3Rpb24oZGVzY3JpcHRpb24pIHtcclxuICAgICAgICAgICAgICB2YXIgZGVzYyA9IHJlcGxhY2VJbnRlcm5hbFN0cmVhbUlkKHBjLCBkZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgICAgYXJnc1swXS5hcHBseShudWxsLCBbZGVzY10pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICBpZiAoYXJnc1sxXSkge1xyXG4gICAgICAgICAgICAgICAgYXJnc1sxXS5hcHBseShudWxsLCBlcnIpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgYXJndW1lbnRzWzJdXHJcbiAgICAgICAgICBdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseShwYywgYXJndW1lbnRzKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKGRlc2NyaXB0aW9uKSB7XHJcbiAgICAgICAgICByZXR1cm4gcmVwbGFjZUludGVybmFsU3RyZWFtSWQocGMsIGRlc2NyaXB0aW9uKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBvcmlnU2V0TG9jYWxEZXNjcmlwdGlvbiA9XHJcbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5zZXRMb2NhbERlc2NyaXB0aW9uO1xyXG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5zZXRMb2NhbERlc2NyaXB0aW9uID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCB8fCAhYXJndW1lbnRzWzBdLnR5cGUpIHtcclxuICAgICAgICByZXR1cm4gb3JpZ1NldExvY2FsRGVzY3JpcHRpb24uYXBwbHkocGMsIGFyZ3VtZW50cyk7XHJcbiAgICAgIH1cclxuICAgICAgYXJndW1lbnRzWzBdID0gcmVwbGFjZUV4dGVybmFsU3RyZWFtSWQocGMsIGFyZ3VtZW50c1swXSk7XHJcbiAgICAgIHJldHVybiBvcmlnU2V0TG9jYWxEZXNjcmlwdGlvbi5hcHBseShwYywgYXJndW1lbnRzKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gVE9ETzogbWFuZ2xlIGdldFN0YXRzOiBodHRwczovL3czYy5naXRodWIuaW8vd2VicnRjLXN0YXRzLyNkb20tcnRjbWVkaWFzdHJlYW1zdGF0cy1zdHJlYW1pZGVudGlmaWVyXHJcblxyXG4gICAgdmFyIG9yaWdMb2NhbERlc2NyaXB0aW9uID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihcclxuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLCAnbG9jYWxEZXNjcmlwdGlvbicpO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUsXHJcbiAgICAgICAgJ2xvY2FsRGVzY3JpcHRpb24nLCB7XHJcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgZGVzY3JpcHRpb24gPSBvcmlnTG9jYWxEZXNjcmlwdGlvbi5nZXQuYXBwbHkodGhpcyk7XHJcbiAgICAgICAgICAgIGlmIChkZXNjcmlwdGlvbi50eXBlID09PSAnJykge1xyXG4gICAgICAgICAgICAgIHJldHVybiBkZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVwbGFjZUludGVybmFsU3RyZWFtSWQocGMsIGRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVRyYWNrID0gZnVuY3Rpb24oc2VuZGVyKSB7XHJcbiAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgIGlmIChwYy5zaWduYWxpbmdTdGF0ZSA9PT0gJ2Nsb3NlZCcpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKFxyXG4gICAgICAgICAgJ1RoZSBSVENQZWVyQ29ubmVjdGlvblxcJ3Mgc2lnbmFsaW5nU3RhdGUgaXMgXFwnY2xvc2VkXFwnLicsXHJcbiAgICAgICAgICAnSW52YWxpZFN0YXRlRXJyb3InKTtcclxuICAgICAgfVxyXG4gICAgICAvLyBXZSBjYW4gbm90IHlldCBjaGVjayBmb3Igc2VuZGVyIGluc3RhbmNlb2YgUlRDUnRwU2VuZGVyXHJcbiAgICAgIC8vIHNpbmNlIHdlIHNoaW0gUlRQU2VuZGVyLiBTbyB3ZSBjaGVjayBpZiBzZW5kZXIuX3BjIGlzIHNldC5cclxuICAgICAgaWYgKCFzZW5kZXIuX3BjKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbignQXJndW1lbnQgMSBvZiBSVENQZWVyQ29ubmVjdGlvbi5yZW1vdmVUcmFjayAnICtcclxuICAgICAgICAgICAgJ2RvZXMgbm90IGltcGxlbWVudCBpbnRlcmZhY2UgUlRDUnRwU2VuZGVyLicsICdUeXBlRXJyb3InKTtcclxuICAgICAgfVxyXG4gICAgICB2YXIgaXNMb2NhbCA9IHNlbmRlci5fcGMgPT09IHBjO1xyXG4gICAgICBpZiAoIWlzTG9jYWwpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKCdTZW5kZXIgd2FzIG5vdCBjcmVhdGVkIGJ5IHRoaXMgY29ubmVjdGlvbi4nLFxyXG4gICAgICAgICAgICAnSW52YWxpZEFjY2Vzc0Vycm9yJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFNlYXJjaCBmb3IgdGhlIG5hdGl2ZSBzdHJlYW0gdGhlIHNlbmRlcnMgdHJhY2sgYmVsb25ncyB0by5cclxuICAgICAgcGMuX3N0cmVhbXMgPSBwYy5fc3RyZWFtcyB8fCB7fTtcclxuICAgICAgdmFyIHN0cmVhbTtcclxuICAgICAgT2JqZWN0LmtleXMocGMuX3N0cmVhbXMpLmZvckVhY2goZnVuY3Rpb24oc3RyZWFtaWQpIHtcclxuICAgICAgICB2YXIgaGFzVHJhY2sgPSBwYy5fc3RyZWFtc1tzdHJlYW1pZF0uZ2V0VHJhY2tzKCkuZmluZChmdW5jdGlvbih0cmFjaykge1xyXG4gICAgICAgICAgcmV0dXJuIHNlbmRlci50cmFjayA9PT0gdHJhY2s7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGhhc1RyYWNrKSB7XHJcbiAgICAgICAgICBzdHJlYW0gPSBwYy5fc3RyZWFtc1tzdHJlYW1pZF07XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChzdHJlYW0pIHtcclxuICAgICAgICBpZiAoc3RyZWFtLmdldFRyYWNrcygpLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgLy8gaWYgdGhpcyBpcyB0aGUgbGFzdCB0cmFjayBvZiB0aGUgc3RyZWFtLCByZW1vdmUgdGhlIHN0cmVhbS4gVGhpc1xyXG4gICAgICAgICAgLy8gdGFrZXMgY2FyZSBvZiBhbnkgc2hpbW1lZCBfc2VuZGVycy5cclxuICAgICAgICAgIHBjLnJlbW92ZVN0cmVhbShwYy5fcmV2ZXJzZVN0cmVhbXNbc3RyZWFtLmlkXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIHJlbHlpbmcgb24gdGhlIHNhbWUgb2RkIGNocm9tZSBiZWhhdmlvdXIgYXMgYWJvdmUuXHJcbiAgICAgICAgICBzdHJlYW0ucmVtb3ZlVHJhY2soc2VuZGVyLnRyYWNrKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcGMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ25lZ290aWF0aW9ubmVlZGVkJykpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0sXHJcblxyXG4gIHNoaW1QZWVyQ29ubmVjdGlvbjogZnVuY3Rpb24od2luZG93KSB7XHJcbiAgICB2YXIgYnJvd3NlckRldGFpbHMgPSB1dGlscy5kZXRlY3RCcm93c2VyKHdpbmRvdyk7XHJcblxyXG4gICAgLy8gVGhlIFJUQ1BlZXJDb25uZWN0aW9uIG9iamVjdC5cclxuICAgIGlmICghd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uICYmIHdpbmRvdy53ZWJraXRSVENQZWVyQ29ubmVjdGlvbikge1xyXG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gPSBmdW5jdGlvbihwY0NvbmZpZywgcGNDb25zdHJhaW50cykge1xyXG4gICAgICAgIC8vIFRyYW5zbGF0ZSBpY2VUcmFuc3BvcnRQb2xpY3kgdG8gaWNlVHJhbnNwb3J0cyxcclxuICAgICAgICAvLyBzZWUgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC93ZWJydGMvaXNzdWVzL2RldGFpbD9pZD00ODY5XHJcbiAgICAgICAgLy8gdGhpcyB3YXMgZml4ZWQgaW4gTTU2IGFsb25nIHdpdGggdW5wcmVmaXhpbmcgUlRDUGVlckNvbm5lY3Rpb24uXHJcbiAgICAgICAgbG9nZ2luZygnUGVlckNvbm5lY3Rpb24nKTtcclxuICAgICAgICBpZiAocGNDb25maWcgJiYgcGNDb25maWcuaWNlVHJhbnNwb3J0UG9saWN5KSB7XHJcbiAgICAgICAgICBwY0NvbmZpZy5pY2VUcmFuc3BvcnRzID0gcGNDb25maWcuaWNlVHJhbnNwb3J0UG9saWN5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyB3aW5kb3cud2Via2l0UlRDUGVlckNvbm5lY3Rpb24ocGNDb25maWcsIHBjQ29uc3RyYWludHMpO1xyXG4gICAgICB9O1xyXG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlID1cclxuICAgICAgICAgIHdpbmRvdy53ZWJraXRSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGU7XHJcbiAgICAgIC8vIHdyYXAgc3RhdGljIG1ldGhvZHMuIEN1cnJlbnRseSBqdXN0IGdlbmVyYXRlQ2VydGlmaWNhdGUuXHJcbiAgICAgIGlmICh3aW5kb3cud2Via2l0UlRDUGVlckNvbm5lY3Rpb24uZ2VuZXJhdGVDZXJ0aWZpY2F0ZSkge1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24sICdnZW5lcmF0ZUNlcnRpZmljYXRlJywge1xyXG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy53ZWJraXRSVENQZWVyQ29ubmVjdGlvbi5nZW5lcmF0ZUNlcnRpZmljYXRlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBtaWdyYXRlIGZyb20gbm9uLXNwZWMgUlRDSWNlU2VydmVyLnVybCB0byBSVENJY2VTZXJ2ZXIudXJsc1xyXG4gICAgICB2YXIgT3JpZ1BlZXJDb25uZWN0aW9uID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uO1xyXG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gPSBmdW5jdGlvbihwY0NvbmZpZywgcGNDb25zdHJhaW50cykge1xyXG4gICAgICAgIGlmIChwY0NvbmZpZyAmJiBwY0NvbmZpZy5pY2VTZXJ2ZXJzKSB7XHJcbiAgICAgICAgICB2YXIgbmV3SWNlU2VydmVycyA9IFtdO1xyXG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwY0NvbmZpZy5pY2VTZXJ2ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBzZXJ2ZXIgPSBwY0NvbmZpZy5pY2VTZXJ2ZXJzW2ldO1xyXG4gICAgICAgICAgICBpZiAoIXNlcnZlci5oYXNPd25Qcm9wZXJ0eSgndXJscycpICYmXHJcbiAgICAgICAgICAgICAgICBzZXJ2ZXIuaGFzT3duUHJvcGVydHkoJ3VybCcpKSB7XHJcbiAgICAgICAgICAgICAgdXRpbHMuZGVwcmVjYXRlZCgnUlRDSWNlU2VydmVyLnVybCcsICdSVENJY2VTZXJ2ZXIudXJscycpO1xyXG4gICAgICAgICAgICAgIHNlcnZlciA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoc2VydmVyKSk7XHJcbiAgICAgICAgICAgICAgc2VydmVyLnVybHMgPSBzZXJ2ZXIudXJsO1xyXG4gICAgICAgICAgICAgIG5ld0ljZVNlcnZlcnMucHVzaChzZXJ2ZXIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIG5ld0ljZVNlcnZlcnMucHVzaChwY0NvbmZpZy5pY2VTZXJ2ZXJzW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcGNDb25maWcuaWNlU2VydmVycyA9IG5ld0ljZVNlcnZlcnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgT3JpZ1BlZXJDb25uZWN0aW9uKHBjQ29uZmlnLCBwY0NvbnN0cmFpbnRzKTtcclxuICAgICAgfTtcclxuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSA9IE9yaWdQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGU7XHJcbiAgICAgIC8vIHdyYXAgc3RhdGljIG1ldGhvZHMuIEN1cnJlbnRseSBqdXN0IGdlbmVyYXRlQ2VydGlmaWNhdGUuXHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24sICdnZW5lcmF0ZUNlcnRpZmljYXRlJywge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZXR1cm4gT3JpZ1BlZXJDb25uZWN0aW9uLmdlbmVyYXRlQ2VydGlmaWNhdGU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgb3JpZ0dldFN0YXRzID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTdGF0cztcclxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U3RhdHMgPSBmdW5jdGlvbihzZWxlY3RvcixcclxuICAgICAgICBzdWNjZXNzQ2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spIHtcclxuICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XHJcblxyXG4gICAgICAvLyBJZiBzZWxlY3RvciBpcyBhIGZ1bmN0aW9uIHRoZW4gd2UgYXJlIGluIHRoZSBvbGQgc3R5bGUgc3RhdHMgc28ganVzdFxyXG4gICAgICAvLyBwYXNzIGJhY2sgdGhlIG9yaWdpbmFsIGdldFN0YXRzIGZvcm1hdCB0byBhdm9pZCBicmVha2luZyBvbGQgdXNlcnMuXHJcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMCAmJiB0eXBlb2Ygc2VsZWN0b3IgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICByZXR1cm4gb3JpZ0dldFN0YXRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFdoZW4gc3BlYy1zdHlsZSBnZXRTdGF0cyBpcyBzdXBwb3J0ZWQsIHJldHVybiB0aG9zZSB3aGVuIGNhbGxlZCB3aXRoXHJcbiAgICAgIC8vIGVpdGhlciBubyBhcmd1bWVudHMgb3IgdGhlIHNlbGVjdG9yIGFyZ3VtZW50IGlzIG51bGwuXHJcbiAgICAgIGlmIChvcmlnR2V0U3RhdHMubGVuZ3RoID09PSAwICYmIChhcmd1bWVudHMubGVuZ3RoID09PSAwIHx8XHJcbiAgICAgICAgICB0eXBlb2YgYXJndW1lbnRzWzBdICE9PSAnZnVuY3Rpb24nKSkge1xyXG4gICAgICAgIHJldHVybiBvcmlnR2V0U3RhdHMuYXBwbHkodGhpcywgW10pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgZml4Q2hyb21lU3RhdHNfID0gZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICB2YXIgc3RhbmRhcmRSZXBvcnQgPSB7fTtcclxuICAgICAgICB2YXIgcmVwb3J0cyA9IHJlc3BvbnNlLnJlc3VsdCgpO1xyXG4gICAgICAgIHJlcG9ydHMuZm9yRWFjaChmdW5jdGlvbihyZXBvcnQpIHtcclxuICAgICAgICAgIHZhciBzdGFuZGFyZFN0YXRzID0ge1xyXG4gICAgICAgICAgICBpZDogcmVwb3J0LmlkLFxyXG4gICAgICAgICAgICB0aW1lc3RhbXA6IHJlcG9ydC50aW1lc3RhbXAsXHJcbiAgICAgICAgICAgIHR5cGU6IHtcclxuICAgICAgICAgICAgICBsb2NhbGNhbmRpZGF0ZTogJ2xvY2FsLWNhbmRpZGF0ZScsXHJcbiAgICAgICAgICAgICAgcmVtb3RlY2FuZGlkYXRlOiAncmVtb3RlLWNhbmRpZGF0ZSdcclxuICAgICAgICAgICAgfVtyZXBvcnQudHlwZV0gfHwgcmVwb3J0LnR5cGVcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICByZXBvcnQubmFtZXMoKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICAgICAgc3RhbmRhcmRTdGF0c1tuYW1lXSA9IHJlcG9ydC5zdGF0KG5hbWUpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBzdGFuZGFyZFJlcG9ydFtzdGFuZGFyZFN0YXRzLmlkXSA9IHN0YW5kYXJkU3RhdHM7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBzdGFuZGFyZFJlcG9ydDtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIHNoaW0gZ2V0U3RhdHMgd2l0aCBtYXBsaWtlIHN1cHBvcnRcclxuICAgICAgdmFyIG1ha2VNYXBTdGF0cyA9IGZ1bmN0aW9uKHN0YXRzKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBNYXAoT2JqZWN0LmtleXMoc3RhdHMpLm1hcChmdW5jdGlvbihrZXkpIHtcclxuICAgICAgICAgIHJldHVybiBba2V5LCBzdGF0c1trZXldXTtcclxuICAgICAgICB9KSk7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+PSAyKSB7XHJcbiAgICAgICAgdmFyIHN1Y2Nlc3NDYWxsYmFja1dyYXBwZXJfID0gZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICAgIGFyZ3NbMV0obWFrZU1hcFN0YXRzKGZpeENocm9tZVN0YXRzXyhyZXNwb25zZSkpKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gb3JpZ0dldFN0YXRzLmFwcGx5KHRoaXMsIFtzdWNjZXNzQ2FsbGJhY2tXcmFwcGVyXyxcclxuICAgICAgICAgIGFyZ3VtZW50c1swXV0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBwcm9taXNlLXN1cHBvcnRcclxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIG9yaWdHZXRTdGF0cy5hcHBseShwYywgW1xyXG4gICAgICAgICAgZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgcmVzb2x2ZShtYWtlTWFwU3RhdHMoZml4Q2hyb21lU3RhdHNfKHJlc3BvbnNlKSkpO1xyXG4gICAgICAgICAgfSwgcmVqZWN0XSk7XHJcbiAgICAgIH0pLnRoZW4oc3VjY2Vzc0NhbGxiYWNrLCBlcnJvckNhbGxiYWNrKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gYWRkIHByb21pc2Ugc3VwcG9ydCAtLSBuYXRpdmVseSBhdmFpbGFibGUgaW4gQ2hyb21lIDUxXHJcbiAgICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDUxKSB7XHJcbiAgICAgIFsnc2V0TG9jYWxEZXNjcmlwdGlvbicsICdzZXRSZW1vdGVEZXNjcmlwdGlvbicsICdhZGRJY2VDYW5kaWRhdGUnXVxyXG4gICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XHJcbiAgICAgICAgICAgIHZhciBuYXRpdmVNZXRob2QgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF07XHJcbiAgICAgICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xyXG4gICAgICAgICAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgICAgICAgIG5hdGl2ZU1ldGhvZC5hcHBseShwYywgW2FyZ3NbMF0sIHJlc29sdmUsIHJlamVjdF0pO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA8IDIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgYXJnc1sxXS5hcHBseShudWxsLCBbXSk7XHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA+PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgIGFyZ3NbMl0uYXBwbHkobnVsbCwgW2Vycl0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcHJvbWlzZSBzdXBwb3J0IGZvciBjcmVhdGVPZmZlciBhbmQgY3JlYXRlQW5zd2VyLiBBdmFpbGFibGUgKHdpdGhvdXRcclxuICAgIC8vIGJ1Z3MpIHNpbmNlIE01MjogY3JidWcvNjE5Mjg5XHJcbiAgICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDUyKSB7XHJcbiAgICAgIFsnY3JlYXRlT2ZmZXInLCAnY3JlYXRlQW5zd2VyJ10uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcclxuICAgICAgICB2YXIgbmF0aXZlTWV0aG9kID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdO1xyXG4gICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMSB8fCAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJlxyXG4gICAgICAgICAgICAgIHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdvYmplY3QnKSkge1xyXG4gICAgICAgICAgICB2YXIgb3B0cyA9IGFyZ3VtZW50cy5sZW5ndGggPT09IDEgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgICAgICBuYXRpdmVNZXRob2QuYXBwbHkocGMsIFtyZXNvbHZlLCByZWplY3QsIG9wdHNdKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2hpbSBpbXBsaWNpdCBjcmVhdGlvbiBvZiBSVENTZXNzaW9uRGVzY3JpcHRpb24vUlRDSWNlQ2FuZGlkYXRlXHJcbiAgICBbJ3NldExvY2FsRGVzY3JpcHRpb24nLCAnc2V0UmVtb3RlRGVzY3JpcHRpb24nLCAnYWRkSWNlQ2FuZGlkYXRlJ11cclxuICAgICAgICAuZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcclxuICAgICAgICAgIHZhciBuYXRpdmVNZXRob2QgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF07XHJcbiAgICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgYXJndW1lbnRzWzBdID0gbmV3ICgobWV0aG9kID09PSAnYWRkSWNlQ2FuZGlkYXRlJykgP1xyXG4gICAgICAgICAgICAgICAgd2luZG93LlJUQ0ljZUNhbmRpZGF0ZSA6XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKShhcmd1bWVudHNbMF0pO1xyXG4gICAgICAgICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vIHN1cHBvcnQgZm9yIGFkZEljZUNhbmRpZGF0ZShudWxsIG9yIHVuZGVmaW5lZClcclxuICAgIHZhciBuYXRpdmVBZGRJY2VDYW5kaWRhdGUgPVxyXG4gICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkSWNlQ2FuZGlkYXRlO1xyXG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRJY2VDYW5kaWRhdGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgaWYgKCFhcmd1bWVudHNbMF0pIHtcclxuICAgICAgICBpZiAoYXJndW1lbnRzWzFdKSB7XHJcbiAgICAgICAgICBhcmd1bWVudHNbMV0uYXBwbHkobnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbmF0aXZlQWRkSWNlQ2FuZGlkYXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xyXG4gIH1cclxufTtcclxuXHJcbn0se1wiLi4vdXRpbHMuanNcIjoxMyxcIi4vZ2V0dXNlcm1lZGlhXCI6Nn1dLDY6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG4vKlxyXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKlxyXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxyXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXHJcbiAqICB0cmVlLlxyXG4gKi9cclxuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xyXG4ndXNlIHN0cmljdCc7XHJcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzLmpzJyk7XHJcbnZhciBsb2dnaW5nID0gdXRpbHMubG9nO1xyXG5cclxuLy8gRXhwb3NlIHB1YmxpYyBtZXRob2RzLlxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gIHZhciBicm93c2VyRGV0YWlscyA9IHV0aWxzLmRldGVjdEJyb3dzZXIod2luZG93KTtcclxuICB2YXIgbmF2aWdhdG9yID0gd2luZG93ICYmIHdpbmRvdy5uYXZpZ2F0b3I7XHJcblxyXG4gIHZhciBjb25zdHJhaW50c1RvQ2hyb21lXyA9IGZ1bmN0aW9uKGMpIHtcclxuICAgIGlmICh0eXBlb2YgYyAhPT0gJ29iamVjdCcgfHwgYy5tYW5kYXRvcnkgfHwgYy5vcHRpb25hbCkge1xyXG4gICAgICByZXR1cm4gYztcclxuICAgIH1cclxuICAgIHZhciBjYyA9IHt9O1xyXG4gICAgT2JqZWN0LmtleXMoYykuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcclxuICAgICAgaWYgKGtleSA9PT0gJ3JlcXVpcmUnIHx8IGtleSA9PT0gJ2FkdmFuY2VkJyB8fCBrZXkgPT09ICdtZWRpYVNvdXJjZScpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgdmFyIHIgPSAodHlwZW9mIGNba2V5XSA9PT0gJ29iamVjdCcpID8gY1trZXldIDoge2lkZWFsOiBjW2tleV19O1xyXG4gICAgICBpZiAoci5leGFjdCAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiByLmV4YWN0ID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgIHIubWluID0gci5tYXggPSByLmV4YWN0O1xyXG4gICAgICB9XHJcbiAgICAgIHZhciBvbGRuYW1lXyA9IGZ1bmN0aW9uKHByZWZpeCwgbmFtZSkge1xyXG4gICAgICAgIGlmIChwcmVmaXgpIHtcclxuICAgICAgICAgIHJldHVybiBwcmVmaXggKyBuYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbmFtZS5zbGljZSgxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChuYW1lID09PSAnZGV2aWNlSWQnKSA/ICdzb3VyY2VJZCcgOiBuYW1lO1xyXG4gICAgICB9O1xyXG4gICAgICBpZiAoci5pZGVhbCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgY2Mub3B0aW9uYWwgPSBjYy5vcHRpb25hbCB8fCBbXTtcclxuICAgICAgICB2YXIgb2MgPSB7fTtcclxuICAgICAgICBpZiAodHlwZW9mIHIuaWRlYWwgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICBvY1tvbGRuYW1lXygnbWluJywga2V5KV0gPSByLmlkZWFsO1xyXG4gICAgICAgICAgY2Mub3B0aW9uYWwucHVzaChvYyk7XHJcbiAgICAgICAgICBvYyA9IHt9O1xyXG4gICAgICAgICAgb2Nbb2xkbmFtZV8oJ21heCcsIGtleSldID0gci5pZGVhbDtcclxuICAgICAgICAgIGNjLm9wdGlvbmFsLnB1c2gob2MpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBvY1tvbGRuYW1lXygnJywga2V5KV0gPSByLmlkZWFsO1xyXG4gICAgICAgICAgY2Mub3B0aW9uYWwucHVzaChvYyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChyLmV4YWN0ICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIHIuZXhhY3QgIT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgY2MubWFuZGF0b3J5ID0gY2MubWFuZGF0b3J5IHx8IHt9O1xyXG4gICAgICAgIGNjLm1hbmRhdG9yeVtvbGRuYW1lXygnJywga2V5KV0gPSByLmV4YWN0O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIFsnbWluJywgJ21heCddLmZvckVhY2goZnVuY3Rpb24obWl4KSB7XHJcbiAgICAgICAgICBpZiAoclttaXhdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgY2MubWFuZGF0b3J5ID0gY2MubWFuZGF0b3J5IHx8IHt9O1xyXG4gICAgICAgICAgICBjYy5tYW5kYXRvcnlbb2xkbmFtZV8obWl4LCBrZXkpXSA9IHJbbWl4XTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpZiAoYy5hZHZhbmNlZCkge1xyXG4gICAgICBjYy5vcHRpb25hbCA9IChjYy5vcHRpb25hbCB8fCBbXSkuY29uY2F0KGMuYWR2YW5jZWQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNjO1xyXG4gIH07XHJcblxyXG4gIHZhciBzaGltQ29uc3RyYWludHNfID0gZnVuY3Rpb24oY29uc3RyYWludHMsIGZ1bmMpIHtcclxuICAgIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uID49IDYxKSB7XHJcbiAgICAgIHJldHVybiBmdW5jKGNvbnN0cmFpbnRzKTtcclxuICAgIH1cclxuICAgIGNvbnN0cmFpbnRzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShjb25zdHJhaW50cykpO1xyXG4gICAgaWYgKGNvbnN0cmFpbnRzICYmIHR5cGVvZiBjb25zdHJhaW50cy5hdWRpbyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgdmFyIHJlbWFwID0gZnVuY3Rpb24ob2JqLCBhLCBiKSB7XHJcbiAgICAgICAgaWYgKGEgaW4gb2JqICYmICEoYiBpbiBvYmopKSB7XHJcbiAgICAgICAgICBvYmpbYl0gPSBvYmpbYV07XHJcbiAgICAgICAgICBkZWxldGUgb2JqW2FdO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgICAgY29uc3RyYWludHMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGNvbnN0cmFpbnRzKSk7XHJcbiAgICAgIHJlbWFwKGNvbnN0cmFpbnRzLmF1ZGlvLCAnYXV0b0dhaW5Db250cm9sJywgJ2dvb2dBdXRvR2FpbkNvbnRyb2wnKTtcclxuICAgICAgcmVtYXAoY29uc3RyYWludHMuYXVkaW8sICdub2lzZVN1cHByZXNzaW9uJywgJ2dvb2dOb2lzZVN1cHByZXNzaW9uJyk7XHJcbiAgICAgIGNvbnN0cmFpbnRzLmF1ZGlvID0gY29uc3RyYWludHNUb0Nocm9tZV8oY29uc3RyYWludHMuYXVkaW8pO1xyXG4gICAgfVxyXG4gICAgaWYgKGNvbnN0cmFpbnRzICYmIHR5cGVvZiBjb25zdHJhaW50cy52aWRlbyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgLy8gU2hpbSBmYWNpbmdNb2RlIGZvciBtb2JpbGUgJiBzdXJmYWNlIHByby5cclxuICAgICAgdmFyIGZhY2UgPSBjb25zdHJhaW50cy52aWRlby5mYWNpbmdNb2RlO1xyXG4gICAgICBmYWNlID0gZmFjZSAmJiAoKHR5cGVvZiBmYWNlID09PSAnb2JqZWN0JykgPyBmYWNlIDoge2lkZWFsOiBmYWNlfSk7XHJcbiAgICAgIHZhciBnZXRTdXBwb3J0ZWRGYWNpbmdNb2RlTGllcyA9IGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCA2NjtcclxuXHJcbiAgICAgIGlmICgoZmFjZSAmJiAoZmFjZS5leGFjdCA9PT0gJ3VzZXInIHx8IGZhY2UuZXhhY3QgPT09ICdlbnZpcm9ubWVudCcgfHxcclxuICAgICAgICAgICAgICAgICAgICBmYWNlLmlkZWFsID09PSAndXNlcicgfHwgZmFjZS5pZGVhbCA9PT0gJ2Vudmlyb25tZW50JykpICYmXHJcbiAgICAgICAgICAhKG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0U3VwcG9ydGVkQ29uc3RyYWludHMgJiZcclxuICAgICAgICAgICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRTdXBwb3J0ZWRDb25zdHJhaW50cygpLmZhY2luZ01vZGUgJiZcclxuICAgICAgICAgICAgIWdldFN1cHBvcnRlZEZhY2luZ01vZGVMaWVzKSkge1xyXG4gICAgICAgIGRlbGV0ZSBjb25zdHJhaW50cy52aWRlby5mYWNpbmdNb2RlO1xyXG4gICAgICAgIHZhciBtYXRjaGVzO1xyXG4gICAgICAgIGlmIChmYWNlLmV4YWN0ID09PSAnZW52aXJvbm1lbnQnIHx8IGZhY2UuaWRlYWwgPT09ICdlbnZpcm9ubWVudCcpIHtcclxuICAgICAgICAgIG1hdGNoZXMgPSBbJ2JhY2snLCAncmVhciddO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZmFjZS5leGFjdCA9PT0gJ3VzZXInIHx8IGZhY2UuaWRlYWwgPT09ICd1c2VyJykge1xyXG4gICAgICAgICAgbWF0Y2hlcyA9IFsnZnJvbnQnXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1hdGNoZXMpIHtcclxuICAgICAgICAgIC8vIExvb2sgZm9yIG1hdGNoZXMgaW4gbGFiZWwsIG9yIHVzZSBsYXN0IGNhbSBmb3IgYmFjayAodHlwaWNhbCkuXHJcbiAgICAgICAgICByZXR1cm4gbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzKClcclxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGRldmljZXMpIHtcclxuICAgICAgICAgICAgZGV2aWNlcyA9IGRldmljZXMuZmlsdGVyKGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gZC5raW5kID09PSAndmlkZW9pbnB1dCc7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB2YXIgZGV2ID0gZGV2aWNlcy5maW5kKGZ1bmN0aW9uKGQpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gbWF0Y2hlcy5zb21lKGZ1bmN0aW9uKG1hdGNoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5sYWJlbC50b0xvd2VyQ2FzZSgpLmluZGV4T2YobWF0Y2gpICE9PSAtMTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICghZGV2ICYmIGRldmljZXMubGVuZ3RoICYmIG1hdGNoZXMuaW5kZXhPZignYmFjaycpICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgIGRldiA9IGRldmljZXNbZGV2aWNlcy5sZW5ndGggLSAxXTsgLy8gbW9yZSBsaWtlbHkgdGhlIGJhY2sgY2FtXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGRldikge1xyXG4gICAgICAgICAgICAgIGNvbnN0cmFpbnRzLnZpZGVvLmRldmljZUlkID0gZmFjZS5leGFjdCA/IHtleGFjdDogZGV2LmRldmljZUlkfSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2lkZWFsOiBkZXYuZGV2aWNlSWR9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0cmFpbnRzLnZpZGVvID0gY29uc3RyYWludHNUb0Nocm9tZV8oY29uc3RyYWludHMudmlkZW8pO1xyXG4gICAgICAgICAgICBsb2dnaW5nKCdjaHJvbWU6ICcgKyBKU09OLnN0cmluZ2lmeShjb25zdHJhaW50cykpO1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuYyhjb25zdHJhaW50cyk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgY29uc3RyYWludHMudmlkZW8gPSBjb25zdHJhaW50c1RvQ2hyb21lXyhjb25zdHJhaW50cy52aWRlbyk7XHJcbiAgICB9XHJcbiAgICBsb2dnaW5nKCdjaHJvbWU6ICcgKyBKU09OLnN0cmluZ2lmeShjb25zdHJhaW50cykpO1xyXG4gICAgcmV0dXJuIGZ1bmMoY29uc3RyYWludHMpO1xyXG4gIH07XHJcblxyXG4gIHZhciBzaGltRXJyb3JfID0gZnVuY3Rpb24oZSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmFtZToge1xyXG4gICAgICAgIFBlcm1pc3Npb25EZW5pZWRFcnJvcjogJ05vdEFsbG93ZWRFcnJvcicsXHJcbiAgICAgICAgUGVybWlzc2lvbkRpc21pc3NlZEVycm9yOiAnTm90QWxsb3dlZEVycm9yJyxcclxuICAgICAgICBJbnZhbGlkU3RhdGVFcnJvcjogJ05vdEFsbG93ZWRFcnJvcicsXHJcbiAgICAgICAgRGV2aWNlc05vdEZvdW5kRXJyb3I6ICdOb3RGb3VuZEVycm9yJyxcclxuICAgICAgICBDb25zdHJhaW50Tm90U2F0aXNmaWVkRXJyb3I6ICdPdmVyY29uc3RyYWluZWRFcnJvcicsXHJcbiAgICAgICAgVHJhY2tTdGFydEVycm9yOiAnTm90UmVhZGFibGVFcnJvcicsXHJcbiAgICAgICAgTWVkaWFEZXZpY2VGYWlsZWREdWVUb1NodXRkb3duOiAnTm90QWxsb3dlZEVycm9yJyxcclxuICAgICAgICBNZWRpYURldmljZUtpbGxTd2l0Y2hPbjogJ05vdEFsbG93ZWRFcnJvcicsXHJcbiAgICAgICAgVGFiQ2FwdHVyZUVycm9yOiAnQWJvcnRFcnJvcicsXHJcbiAgICAgICAgU2NyZWVuQ2FwdHVyZUVycm9yOiAnQWJvcnRFcnJvcicsXHJcbiAgICAgICAgRGV2aWNlQ2FwdHVyZUVycm9yOiAnQWJvcnRFcnJvcidcclxuICAgICAgfVtlLm5hbWVdIHx8IGUubmFtZSxcclxuICAgICAgbWVzc2FnZTogZS5tZXNzYWdlLFxyXG4gICAgICBjb25zdHJhaW50OiBlLmNvbnN0cmFpbnROYW1lLFxyXG4gICAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZSArICh0aGlzLm1lc3NhZ2UgJiYgJzogJykgKyB0aGlzLm1lc3NhZ2U7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfTtcclxuXHJcbiAgdmFyIGdldFVzZXJNZWRpYV8gPSBmdW5jdGlvbihjb25zdHJhaW50cywgb25TdWNjZXNzLCBvbkVycm9yKSB7XHJcbiAgICBzaGltQ29uc3RyYWludHNfKGNvbnN0cmFpbnRzLCBmdW5jdGlvbihjKSB7XHJcbiAgICAgIG5hdmlnYXRvci53ZWJraXRHZXRVc2VyTWVkaWEoYywgb25TdWNjZXNzLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWYgKG9uRXJyb3IpIHtcclxuICAgICAgICAgIG9uRXJyb3Ioc2hpbUVycm9yXyhlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIG5hdmlnYXRvci5nZXRVc2VyTWVkaWEgPSBnZXRVc2VyTWVkaWFfO1xyXG5cclxuICAvLyBSZXR1cm5zIHRoZSByZXN1bHQgb2YgZ2V0VXNlck1lZGlhIGFzIGEgUHJvbWlzZS5cclxuICB2YXIgZ2V0VXNlck1lZGlhUHJvbWlzZV8gPSBmdW5jdGlvbihjb25zdHJhaW50cykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzLCByZXNvbHZlLCByZWplY3QpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgaWYgKCFuYXZpZ2F0b3IubWVkaWFEZXZpY2VzKSB7XHJcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzID0ge1xyXG4gICAgICBnZXRVc2VyTWVkaWE6IGdldFVzZXJNZWRpYVByb21pc2VfLFxyXG4gICAgICBlbnVtZXJhdGVEZXZpY2VzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xyXG4gICAgICAgICAgdmFyIGtpbmRzID0ge2F1ZGlvOiAnYXVkaW9pbnB1dCcsIHZpZGVvOiAndmlkZW9pbnB1dCd9O1xyXG4gICAgICAgICAgcmV0dXJuIHdpbmRvdy5NZWRpYVN0cmVhbVRyYWNrLmdldFNvdXJjZXMoZnVuY3Rpb24oZGV2aWNlcykge1xyXG4gICAgICAgICAgICByZXNvbHZlKGRldmljZXMubWFwKGZ1bmN0aW9uKGRldmljZSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiB7bGFiZWw6IGRldmljZS5sYWJlbCxcclxuICAgICAgICAgICAgICAgIGtpbmQ6IGtpbmRzW2RldmljZS5raW5kXSxcclxuICAgICAgICAgICAgICAgIGRldmljZUlkOiBkZXZpY2UuaWQsXHJcbiAgICAgICAgICAgICAgICBncm91cElkOiAnJ307XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9LFxyXG4gICAgICBnZXRTdXBwb3J0ZWRDb25zdHJhaW50czogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGRldmljZUlkOiB0cnVlLCBlY2hvQ2FuY2VsbGF0aW9uOiB0cnVlLCBmYWNpbmdNb2RlOiB0cnVlLFxyXG4gICAgICAgICAgZnJhbWVSYXRlOiB0cnVlLCBoZWlnaHQ6IHRydWUsIHdpZHRoOiB0cnVlXHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8vIEEgc2hpbSBmb3IgZ2V0VXNlck1lZGlhIG1ldGhvZCBvbiB0aGUgbWVkaWFEZXZpY2VzIG9iamVjdC5cclxuICAvLyBUT0RPKEthcHRlbkphbnNzb24pIHJlbW92ZSBvbmNlIGltcGxlbWVudGVkIGluIENocm9tZSBzdGFibGUuXHJcbiAgaWYgKCFuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSkge1xyXG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEgPSBmdW5jdGlvbihjb25zdHJhaW50cykge1xyXG4gICAgICByZXR1cm4gZ2V0VXNlck1lZGlhUHJvbWlzZV8oY29uc3RyYWludHMpO1xyXG4gICAgfTtcclxuICB9IGVsc2Uge1xyXG4gICAgLy8gRXZlbiB0aG91Z2ggQ2hyb21lIDQ1IGhhcyBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzIGFuZCBhIGdldFVzZXJNZWRpYVxyXG4gICAgLy8gZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhIFByb21pc2UsIGl0IGRvZXMgbm90IGFjY2VwdCBzcGVjLXN0eWxlXHJcbiAgICAvLyBjb25zdHJhaW50cy5cclxuICAgIHZhciBvcmlnR2V0VXNlck1lZGlhID0gbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEuXHJcbiAgICAgICAgYmluZChuYXZpZ2F0b3IubWVkaWFEZXZpY2VzKTtcclxuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhID0gZnVuY3Rpb24oY3MpIHtcclxuICAgICAgcmV0dXJuIHNoaW1Db25zdHJhaW50c18oY3MsIGZ1bmN0aW9uKGMpIHtcclxuICAgICAgICByZXR1cm4gb3JpZ0dldFVzZXJNZWRpYShjKS50aGVuKGZ1bmN0aW9uKHN0cmVhbSkge1xyXG4gICAgICAgICAgaWYgKGMuYXVkaW8gJiYgIXN0cmVhbS5nZXRBdWRpb1RyYWNrcygpLmxlbmd0aCB8fFxyXG4gICAgICAgICAgICAgIGMudmlkZW8gJiYgIXN0cmVhbS5nZXRWaWRlb1RyYWNrcygpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xyXG4gICAgICAgICAgICAgIHRyYWNrLnN0b3AoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oJycsICdOb3RGb3VuZEVycm9yJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gc3RyZWFtO1xyXG4gICAgICAgIH0sIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChzaGltRXJyb3JfKGUpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLy8gRHVtbXkgZGV2aWNlY2hhbmdlIGV2ZW50IG1ldGhvZHMuXHJcbiAgLy8gVE9ETyhLYXB0ZW5KYW5zc29uKSByZW1vdmUgb25jZSBpbXBsZW1lbnRlZCBpbiBDaHJvbWUgc3RhYmxlLlxyXG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5hZGRFdmVudExpc3RlbmVyID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIGxvZ2dpbmcoJ0R1bW15IG1lZGlhRGV2aWNlcy5hZGRFdmVudExpc3RlbmVyIGNhbGxlZC4nKTtcclxuICAgIH07XHJcbiAgfVxyXG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5yZW1vdmVFdmVudExpc3RlbmVyID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIGxvZ2dpbmcoJ0R1bW15IG1lZGlhRGV2aWNlcy5yZW1vdmVFdmVudExpc3RlbmVyIGNhbGxlZC4nKTtcclxuICAgIH07XHJcbiAgfVxyXG59O1xyXG5cclxufSx7XCIuLi91dGlscy5qc1wiOjEzfV0sNzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcbi8qXHJcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTcgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXHJcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcclxuICogIHRyZWUuXHJcbiAqL1xyXG4gLyogZXNsaW50LWVudiBub2RlICovXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBTRFBVdGlscyA9IHJlcXVpcmUoJ3NkcCcpO1xyXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBzaGltUlRDSWNlQ2FuZGlkYXRlOiBmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIC8vIGZvdW5kYXRpb24gaXMgYXJiaXRyYXJpbHkgY2hvc2VuIGFzIGFuIGluZGljYXRvciBmb3IgZnVsbCBzdXBwb3J0IGZvclxyXG4gICAgLy8gaHR0cHM6Ly93M2MuZ2l0aHViLmlvL3dlYnJ0Yy1wYy8jcnRjaWNlY2FuZGlkYXRlLWludGVyZmFjZVxyXG4gICAgaWYgKCF3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlIHx8ICh3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlICYmICdmb3VuZGF0aW9uJyBpblxyXG4gICAgICAgIHdpbmRvdy5SVENJY2VDYW5kaWRhdGUucHJvdG90eXBlKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIE5hdGl2ZVJUQ0ljZUNhbmRpZGF0ZSA9IHdpbmRvdy5SVENJY2VDYW5kaWRhdGU7XHJcbiAgICB3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlID0gZnVuY3Rpb24oYXJncykge1xyXG4gICAgICAvLyBSZW1vdmUgdGhlIGE9IHdoaWNoIHNob3VsZG4ndCBiZSBwYXJ0IG9mIHRoZSBjYW5kaWRhdGUgc3RyaW5nLlxyXG4gICAgICBpZiAodHlwZW9mIGFyZ3MgPT09ICdvYmplY3QnICYmIGFyZ3MuY2FuZGlkYXRlICYmXHJcbiAgICAgICAgICBhcmdzLmNhbmRpZGF0ZS5pbmRleE9mKCdhPScpID09PSAwKSB7XHJcbiAgICAgICAgYXJncyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYXJncykpO1xyXG4gICAgICAgIGFyZ3MuY2FuZGlkYXRlID0gYXJncy5jYW5kaWRhdGUuc3Vic3RyKDIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoYXJncy5jYW5kaWRhdGUgJiYgYXJncy5jYW5kaWRhdGUubGVuZ3RoKSB7XHJcbiAgICAgICAgLy8gQXVnbWVudCB0aGUgbmF0aXZlIGNhbmRpZGF0ZSB3aXRoIHRoZSBwYXJzZWQgZmllbGRzLlxyXG4gICAgICAgIHZhciBuYXRpdmVDYW5kaWRhdGUgPSBuZXcgTmF0aXZlUlRDSWNlQ2FuZGlkYXRlKGFyZ3MpO1xyXG4gICAgICAgIHZhciBwYXJzZWRDYW5kaWRhdGUgPSBTRFBVdGlscy5wYXJzZUNhbmRpZGF0ZShhcmdzLmNhbmRpZGF0ZSk7XHJcbiAgICAgICAgdmFyIGF1Z21lbnRlZENhbmRpZGF0ZSA9IE9iamVjdC5hc3NpZ24obmF0aXZlQ2FuZGlkYXRlLFxyXG4gICAgICAgICAgICBwYXJzZWRDYW5kaWRhdGUpO1xyXG5cclxuICAgICAgICAvLyBBZGQgYSBzZXJpYWxpemVyIHRoYXQgZG9lcyBub3Qgc2VyaWFsaXplIHRoZSBleHRyYSBhdHRyaWJ1dGVzLlxyXG4gICAgICAgIGF1Z21lbnRlZENhbmRpZGF0ZS50b0pTT04gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNhbmRpZGF0ZTogYXVnbWVudGVkQ2FuZGlkYXRlLmNhbmRpZGF0ZSxcclxuICAgICAgICAgICAgc2RwTWlkOiBhdWdtZW50ZWRDYW5kaWRhdGUuc2RwTWlkLFxyXG4gICAgICAgICAgICBzZHBNTGluZUluZGV4OiBhdWdtZW50ZWRDYW5kaWRhdGUuc2RwTUxpbmVJbmRleCxcclxuICAgICAgICAgICAgdXNlcm5hbWVGcmFnbWVudDogYXVnbWVudGVkQ2FuZGlkYXRlLnVzZXJuYW1lRnJhZ21lbnQsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIGF1Z21lbnRlZENhbmRpZGF0ZTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbmV3IE5hdGl2ZVJUQ0ljZUNhbmRpZGF0ZShhcmdzKTtcclxuICAgIH07XHJcbiAgICB3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlLnByb3RvdHlwZSA9IE5hdGl2ZVJUQ0ljZUNhbmRpZGF0ZS5wcm90b3R5cGU7XHJcblxyXG4gICAgLy8gSG9vayB1cCB0aGUgYXVnbWVudGVkIGNhbmRpZGF0ZSBpbiBvbmljZWNhbmRpZGF0ZSBhbmRcclxuICAgIC8vIGFkZEV2ZW50TGlzdGVuZXIoJ2ljZWNhbmRpZGF0ZScsIC4uLilcclxuICAgIHV0aWxzLndyYXBQZWVyQ29ubmVjdGlvbkV2ZW50KHdpbmRvdywgJ2ljZWNhbmRpZGF0ZScsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgaWYgKGUuY2FuZGlkYXRlKSB7XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsICdjYW5kaWRhdGUnLCB7XHJcbiAgICAgICAgICB2YWx1ZTogbmV3IHdpbmRvdy5SVENJY2VDYW5kaWRhdGUoZS5jYW5kaWRhdGUpLFxyXG4gICAgICAgICAgd3JpdGFibGU6ICdmYWxzZSdcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gZTtcclxuICAgIH0pO1xyXG4gIH0sXHJcblxyXG4gIC8vIHNoaW1DcmVhdGVPYmplY3RVUkwgbXVzdCBiZSBjYWxsZWQgYmVmb3JlIHNoaW1Tb3VyY2VPYmplY3QgdG8gYXZvaWQgbG9vcC5cclxuXHJcbiAgc2hpbUNyZWF0ZU9iamVjdFVSTDogZnVuY3Rpb24od2luZG93KSB7XHJcbiAgICB2YXIgVVJMID0gd2luZG93ICYmIHdpbmRvdy5VUkw7XHJcblxyXG4gICAgaWYgKCEodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgd2luZG93LkhUTUxNZWRpYUVsZW1lbnQgJiZcclxuICAgICAgICAgICdzcmNPYmplY3QnIGluIHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50LnByb3RvdHlwZSAmJlxyXG4gICAgICAgIFVSTC5jcmVhdGVPYmplY3RVUkwgJiYgVVJMLnJldm9rZU9iamVjdFVSTCkpIHtcclxuICAgICAgLy8gT25seSBzaGltIENyZWF0ZU9iamVjdFVSTCB1c2luZyBzcmNPYmplY3QgaWYgc3JjT2JqZWN0IGV4aXN0cy5cclxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgbmF0aXZlQ3JlYXRlT2JqZWN0VVJMID0gVVJMLmNyZWF0ZU9iamVjdFVSTC5iaW5kKFVSTCk7XHJcbiAgICB2YXIgbmF0aXZlUmV2b2tlT2JqZWN0VVJMID0gVVJMLnJldm9rZU9iamVjdFVSTC5iaW5kKFVSTCk7XHJcbiAgICB2YXIgc3RyZWFtcyA9IG5ldyBNYXAoKSwgbmV3SWQgPSAwO1xyXG5cclxuICAgIFVSTC5jcmVhdGVPYmplY3RVUkwgPSBmdW5jdGlvbihzdHJlYW0pIHtcclxuICAgICAgaWYgKCdnZXRUcmFja3MnIGluIHN0cmVhbSkge1xyXG4gICAgICAgIHZhciB1cmwgPSAncG9seWJsb2I6JyArICgrK25ld0lkKTtcclxuICAgICAgICBzdHJlYW1zLnNldCh1cmwsIHN0cmVhbSk7XHJcbiAgICAgICAgdXRpbHMuZGVwcmVjYXRlZCgnVVJMLmNyZWF0ZU9iamVjdFVSTChzdHJlYW0pJyxcclxuICAgICAgICAgICAgJ2VsZW0uc3JjT2JqZWN0ID0gc3RyZWFtJyk7XHJcbiAgICAgICAgcmV0dXJuIHVybDtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbmF0aXZlQ3JlYXRlT2JqZWN0VVJMKHN0cmVhbSk7XHJcbiAgICB9O1xyXG4gICAgVVJMLnJldm9rZU9iamVjdFVSTCA9IGZ1bmN0aW9uKHVybCkge1xyXG4gICAgICBuYXRpdmVSZXZva2VPYmplY3RVUkwodXJsKTtcclxuICAgICAgc3RyZWFtcy5kZWxldGUodXJsKTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIGRzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iod2luZG93LkhUTUxNZWRpYUVsZW1lbnQucHJvdG90eXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3NyYycpO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50LnByb3RvdHlwZSwgJ3NyYycsIHtcclxuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gZHNjLmdldC5hcHBseSh0aGlzKTtcclxuICAgICAgfSxcclxuICAgICAgc2V0OiBmdW5jdGlvbih1cmwpIHtcclxuICAgICAgICB0aGlzLnNyY09iamVjdCA9IHN0cmVhbXMuZ2V0KHVybCkgfHwgbnVsbDtcclxuICAgICAgICByZXR1cm4gZHNjLnNldC5hcHBseSh0aGlzLCBbdXJsXSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBuYXRpdmVTZXRBdHRyaWJ1dGUgPSB3aW5kb3cuSFRNTE1lZGlhRWxlbWVudC5wcm90b3R5cGUuc2V0QXR0cmlidXRlO1xyXG4gICAgd2luZG93LkhUTUxNZWRpYUVsZW1lbnQucHJvdG90eXBlLnNldEF0dHJpYnV0ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMiAmJlxyXG4gICAgICAgICAgKCcnICsgYXJndW1lbnRzWzBdKS50b0xvd2VyQ2FzZSgpID09PSAnc3JjJykge1xyXG4gICAgICAgIHRoaXMuc3JjT2JqZWN0ID0gc3RyZWFtcy5nZXQoYXJndW1lbnRzWzFdKSB8fCBudWxsO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBuYXRpdmVTZXRBdHRyaWJ1dGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIH07XHJcbiAgfSxcclxuXHJcbiAgc2hpbU1heE1lc3NhZ2VTaXplOiBmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIGlmICh3aW5kb3cuUlRDU2N0cFRyYW5zcG9ydCB8fCAhd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHZhciBicm93c2VyRGV0YWlscyA9IHV0aWxzLmRldGVjdEJyb3dzZXIod2luZG93KTtcclxuXHJcbiAgICBpZiAoISgnc2N0cCcgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkpIHtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUsICdzY3RwJywge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHlwZW9mIHRoaXMuX3NjdHAgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IHRoaXMuX3NjdHA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgc2N0cEluRGVzY3JpcHRpb24gPSBmdW5jdGlvbihkZXNjcmlwdGlvbikge1xyXG4gICAgICB2YXIgc2VjdGlvbnMgPSBTRFBVdGlscy5zcGxpdFNlY3Rpb25zKGRlc2NyaXB0aW9uLnNkcCk7XHJcbiAgICAgIHNlY3Rpb25zLnNoaWZ0KCk7XHJcbiAgICAgIHJldHVybiBzZWN0aW9ucy5zb21lKGZ1bmN0aW9uKG1lZGlhU2VjdGlvbikge1xyXG4gICAgICAgIHZhciBtTGluZSA9IFNEUFV0aWxzLnBhcnNlTUxpbmUobWVkaWFTZWN0aW9uKTtcclxuICAgICAgICByZXR1cm4gbUxpbmUgJiYgbUxpbmUua2luZCA9PT0gJ2FwcGxpY2F0aW9uJ1xyXG4gICAgICAgICAgICAmJiBtTGluZS5wcm90b2NvbC5pbmRleE9mKCdTQ1RQJykgIT09IC0xO1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIGdldFJlbW90ZUZpcmVmb3hWZXJzaW9uID0gZnVuY3Rpb24oZGVzY3JpcHRpb24pIHtcclxuICAgICAgLy8gVE9ETzogSXMgdGhlcmUgYSBiZXR0ZXIgc29sdXRpb24gZm9yIGRldGVjdGluZyBGaXJlZm94P1xyXG4gICAgICB2YXIgbWF0Y2ggPSBkZXNjcmlwdGlvbi5zZHAubWF0Y2goL21vemlsbGEuLi5USElTX0lTX1NEUEFSVEEtKFxcZCspLyk7XHJcbiAgICAgIGlmIChtYXRjaCA9PT0gbnVsbCB8fCBtYXRjaC5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICB9XHJcbiAgICAgIHZhciB2ZXJzaW9uID0gcGFyc2VJbnQobWF0Y2hbMV0sIDEwKTtcclxuICAgICAgLy8gVGVzdCBmb3IgTmFOICh5ZXMsIHRoaXMgaXMgdWdseSlcclxuICAgICAgcmV0dXJuIHZlcnNpb24gIT09IHZlcnNpb24gPyAtMSA6IHZlcnNpb247XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBnZXRDYW5TZW5kTWF4TWVzc2FnZVNpemUgPSBmdW5jdGlvbihyZW1vdGVJc0ZpcmVmb3gpIHtcclxuICAgICAgLy8gRXZlcnkgaW1wbGVtZW50YXRpb24gd2Uga25vdyBjYW4gc2VuZCBhdCBsZWFzdCA2NCBLaUIuXHJcbiAgICAgIC8vIE5vdGU6IEFsdGhvdWdoIENocm9tZSBpcyB0ZWNobmljYWxseSBhYmxlIHRvIHNlbmQgdXAgdG8gMjU2IEtpQiwgdGhlXHJcbiAgICAgIC8vICAgICAgIGRhdGEgZG9lcyBub3QgcmVhY2ggdGhlIG90aGVyIHBlZXIgcmVsaWFibHkuXHJcbiAgICAgIC8vICAgICAgIFNlZTogaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3dlYnJ0Yy9pc3N1ZXMvZGV0YWlsP2lkPTg0MTlcclxuICAgICAgdmFyIGNhblNlbmRNYXhNZXNzYWdlU2l6ZSA9IDY1NTM2O1xyXG4gICAgICBpZiAoYnJvd3NlckRldGFpbHMuYnJvd3NlciA9PT0gJ2ZpcmVmb3gnKSB7XHJcbiAgICAgICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCA1Nykge1xyXG4gICAgICAgICAgaWYgKHJlbW90ZUlzRmlyZWZveCA9PT0gLTEpIHtcclxuICAgICAgICAgICAgLy8gRkYgPCA1NyB3aWxsIHNlbmQgaW4gMTYgS2lCIGNodW5rcyB1c2luZyB0aGUgZGVwcmVjYXRlZCBQUElEXHJcbiAgICAgICAgICAgIC8vIGZyYWdtZW50YXRpb24uXHJcbiAgICAgICAgICAgIGNhblNlbmRNYXhNZXNzYWdlU2l6ZSA9IDE2Mzg0O1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gSG93ZXZlciwgb3RoZXIgRkYgKGFuZCBSQVdSVEMpIGNhbiByZWFzc2VtYmxlIFBQSUQtZnJhZ21lbnRlZFxyXG4gICAgICAgICAgICAvLyBtZXNzYWdlcy4gVGh1cywgc3VwcG9ydGluZyB+MiBHaUIgd2hlbiBzZW5kaW5nLlxyXG4gICAgICAgICAgICBjYW5TZW5kTWF4TWVzc2FnZVNpemUgPSAyMTQ3NDgzNjM3O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyBDdXJyZW50bHksIGFsbCBGRiA+PSA1NyB3aWxsIHJlc2V0IHRoZSByZW1vdGUgbWF4aW11bSBtZXNzYWdlIHNpemVcclxuICAgICAgICAgIC8vIHRvIHRoZSBkZWZhdWx0IHZhbHVlIHdoZW4gYSBkYXRhIGNoYW5uZWwgaXMgY3JlYXRlZCBhdCBhIGxhdGVyXHJcbiAgICAgICAgICAvLyBzdGFnZS4gOihcclxuICAgICAgICAgIC8vIFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTQyNjgzMVxyXG4gICAgICAgICAgY2FuU2VuZE1heE1lc3NhZ2VTaXplID1cclxuICAgICAgICAgICAgYnJvd3NlckRldGFpbHMudmVyc2lvbiA9PT0gNTcgPyA2NTUzNSA6IDY1NTM2O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gY2FuU2VuZE1heE1lc3NhZ2VTaXplO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgZ2V0TWF4TWVzc2FnZVNpemUgPSBmdW5jdGlvbihkZXNjcmlwdGlvbiwgcmVtb3RlSXNGaXJlZm94KSB7XHJcbiAgICAgIC8vIE5vdGU6IDY1NTM2IGJ5dGVzIGlzIHRoZSBkZWZhdWx0IHZhbHVlIGZyb20gdGhlIFNEUCBzcGVjLiBBbHNvLFxyXG4gICAgICAvLyAgICAgICBldmVyeSBpbXBsZW1lbnRhdGlvbiB3ZSBrbm93IHN1cHBvcnRzIHJlY2VpdmluZyA2NTUzNiBieXRlcy5cclxuICAgICAgdmFyIG1heE1lc3NhZ2VTaXplID0gNjU1MzY7XHJcblxyXG4gICAgICAvLyBGRiA1NyBoYXMgYSBzbGlnaHRseSBpbmNvcnJlY3QgZGVmYXVsdCByZW1vdGUgbWF4IG1lc3NhZ2Ugc2l6ZSwgc29cclxuICAgICAgLy8gd2UgbmVlZCB0byBhZGp1c3QgaXQgaGVyZSB0byBhdm9pZCBhIGZhaWx1cmUgd2hlbiBzZW5kaW5nLlxyXG4gICAgICAvLyBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTE0MjU2OTdcclxuICAgICAgaWYgKGJyb3dzZXJEZXRhaWxzLmJyb3dzZXIgPT09ICdmaXJlZm94J1xyXG4gICAgICAgICAgICYmIGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPT09IDU3KSB7XHJcbiAgICAgICAgbWF4TWVzc2FnZVNpemUgPSA2NTUzNTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIG1hdGNoID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgoZGVzY3JpcHRpb24uc2RwLCAnYT1tYXgtbWVzc2FnZS1zaXplOicpO1xyXG4gICAgICBpZiAobWF0Y2gubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIG1heE1lc3NhZ2VTaXplID0gcGFyc2VJbnQobWF0Y2hbMF0uc3Vic3RyKDE5KSwgMTApO1xyXG4gICAgICB9IGVsc2UgaWYgKGJyb3dzZXJEZXRhaWxzLmJyb3dzZXIgPT09ICdmaXJlZm94JyAmJlxyXG4gICAgICAgICAgICAgICAgICByZW1vdGVJc0ZpcmVmb3ggIT09IC0xKSB7XHJcbiAgICAgICAgLy8gSWYgdGhlIG1heGltdW0gbWVzc2FnZSBzaXplIGlzIG5vdCBwcmVzZW50IGluIHRoZSByZW1vdGUgU0RQIGFuZFxyXG4gICAgICAgIC8vIGJvdGggbG9jYWwgYW5kIHJlbW90ZSBhcmUgRmlyZWZveCwgdGhlIHJlbW90ZSBwZWVyIGNhbiByZWNlaXZlXHJcbiAgICAgICAgLy8gfjIgR2lCLlxyXG4gICAgICAgIG1heE1lc3NhZ2VTaXplID0gMjE0NzQ4MzYzNztcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbWF4TWVzc2FnZVNpemU7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBvcmlnU2V0UmVtb3RlRGVzY3JpcHRpb24gPVxyXG4gICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0UmVtb3RlRGVzY3JpcHRpb247XHJcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnNldFJlbW90ZURlc2NyaXB0aW9uID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgIHBjLl9zY3RwID0gbnVsbDtcclxuXHJcbiAgICAgIGlmIChzY3RwSW5EZXNjcmlwdGlvbihhcmd1bWVudHNbMF0pKSB7XHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHJlbW90ZSBpcyBGRi5cclxuICAgICAgICB2YXIgaXNGaXJlZm94ID0gZ2V0UmVtb3RlRmlyZWZveFZlcnNpb24oYXJndW1lbnRzWzBdKTtcclxuXHJcbiAgICAgICAgLy8gR2V0IHRoZSBtYXhpbXVtIG1lc3NhZ2Ugc2l6ZSB0aGUgbG9jYWwgcGVlciBpcyBjYXBhYmxlIG9mIHNlbmRpbmdcclxuICAgICAgICB2YXIgY2FuU2VuZE1NUyA9IGdldENhblNlbmRNYXhNZXNzYWdlU2l6ZShpc0ZpcmVmb3gpO1xyXG5cclxuICAgICAgICAvLyBHZXQgdGhlIG1heGltdW0gbWVzc2FnZSBzaXplIG9mIHRoZSByZW1vdGUgcGVlci5cclxuICAgICAgICB2YXIgcmVtb3RlTU1TID0gZ2V0TWF4TWVzc2FnZVNpemUoYXJndW1lbnRzWzBdLCBpc0ZpcmVmb3gpO1xyXG5cclxuICAgICAgICAvLyBEZXRlcm1pbmUgZmluYWwgbWF4aW11bSBtZXNzYWdlIHNpemVcclxuICAgICAgICB2YXIgbWF4TWVzc2FnZVNpemU7XHJcbiAgICAgICAgaWYgKGNhblNlbmRNTVMgPT09IDAgJiYgcmVtb3RlTU1TID09PSAwKSB7XHJcbiAgICAgICAgICBtYXhNZXNzYWdlU2l6ZSA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcclxuICAgICAgICB9IGVsc2UgaWYgKGNhblNlbmRNTVMgPT09IDAgfHwgcmVtb3RlTU1TID09PSAwKSB7XHJcbiAgICAgICAgICBtYXhNZXNzYWdlU2l6ZSA9IE1hdGgubWF4KGNhblNlbmRNTVMsIHJlbW90ZU1NUyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG1heE1lc3NhZ2VTaXplID0gTWF0aC5taW4oY2FuU2VuZE1NUywgcmVtb3RlTU1TKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBhIGR1bW15IFJUQ1NjdHBUcmFuc3BvcnQgb2JqZWN0IGFuZCB0aGUgJ21heE1lc3NhZ2VTaXplJ1xyXG4gICAgICAgIC8vIGF0dHJpYnV0ZS5cclxuICAgICAgICB2YXIgc2N0cCA9IHt9O1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzY3RwLCAnbWF4TWVzc2FnZVNpemUnLCB7XHJcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWF4TWVzc2FnZVNpemU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcGMuX3NjdHAgPSBzY3RwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gb3JpZ1NldFJlbW90ZURlc2NyaXB0aW9uLmFwcGx5KHBjLCBhcmd1bWVudHMpO1xyXG4gICAgfTtcclxuICB9LFxyXG5cclxuICBzaGltU2VuZFRocm93VHlwZUVycm9yOiBmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIGlmICghKHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiAmJlxyXG4gICAgICAgICdjcmVhdGVEYXRhQ2hhbm5lbCcgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE5vdGU6IEFsdGhvdWdoIEZpcmVmb3ggPj0gNTcgaGFzIGEgbmF0aXZlIGltcGxlbWVudGF0aW9uLCB0aGUgbWF4aW11bVxyXG4gICAgLy8gICAgICAgbWVzc2FnZSBzaXplIGNhbiBiZSByZXNldCBmb3IgYWxsIGRhdGEgY2hhbm5lbHMgYXQgYSBsYXRlciBzdGFnZS5cclxuICAgIC8vICAgICAgIFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTQyNjgzMVxyXG5cclxuICAgIHZhciBvcmlnQ3JlYXRlRGF0YUNoYW5uZWwgPVxyXG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmNyZWF0ZURhdGFDaGFubmVsO1xyXG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5jcmVhdGVEYXRhQ2hhbm5lbCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICB2YXIgZGF0YUNoYW5uZWwgPSBvcmlnQ3JlYXRlRGF0YUNoYW5uZWwuYXBwbHkocGMsIGFyZ3VtZW50cyk7XHJcbiAgICAgIHZhciBvcmlnRGF0YUNoYW5uZWxTZW5kID0gZGF0YUNoYW5uZWwuc2VuZDtcclxuXHJcbiAgICAgIC8vIFBhdGNoICdzZW5kJyBtZXRob2RcclxuICAgICAgZGF0YUNoYW5uZWwuc2VuZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBkYyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGRhdGEgPSBhcmd1bWVudHNbMF07XHJcbiAgICAgICAgdmFyIGxlbmd0aCA9IGRhdGEubGVuZ3RoIHx8IGRhdGEuc2l6ZSB8fCBkYXRhLmJ5dGVMZW5ndGg7XHJcbiAgICAgICAgaWYgKGxlbmd0aCA+IHBjLnNjdHAubWF4TWVzc2FnZVNpemUpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oJ01lc3NhZ2UgdG9vIGxhcmdlIChjYW4gc2VuZCBhIG1heGltdW0gb2YgJyArXHJcbiAgICAgICAgICAgIHBjLnNjdHAubWF4TWVzc2FnZVNpemUgKyAnIGJ5dGVzKScsICdUeXBlRXJyb3InKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9yaWdEYXRhQ2hhbm5lbFNlbmQuYXBwbHkoZGMsIGFyZ3VtZW50cyk7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICByZXR1cm4gZGF0YUNoYW5uZWw7XHJcbiAgICB9O1xyXG4gIH1cclxufTtcclxuXHJcbn0se1wiLi91dGlsc1wiOjEzLFwic2RwXCI6Mn1dLDg6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG4vKlxyXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKlxyXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxyXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXHJcbiAqICB0cmVlLlxyXG4gKi9cclxuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xyXG52YXIgc2hpbVJUQ1BlZXJDb25uZWN0aW9uID0gcmVxdWlyZSgncnRjcGVlcmNvbm5lY3Rpb24tc2hpbScpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgc2hpbUdldFVzZXJNZWRpYTogcmVxdWlyZSgnLi9nZXR1c2VybWVkaWEnKSxcclxuICBzaGltUGVlckNvbm5lY3Rpb246IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgdmFyIGJyb3dzZXJEZXRhaWxzID0gdXRpbHMuZGV0ZWN0QnJvd3Nlcih3aW5kb3cpO1xyXG5cclxuICAgIGlmICh3aW5kb3cuUlRDSWNlR2F0aGVyZXIpIHtcclxuICAgICAgaWYgKCF3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlKSB7XHJcbiAgICAgICAgd2luZG93LlJUQ0ljZUNhbmRpZGF0ZSA9IGZ1bmN0aW9uKGFyZ3MpIHtcclxuICAgICAgICAgIHJldHVybiBhcmdzO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCF3aW5kb3cuUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKSB7XHJcbiAgICAgICAgd2luZG93LlJUQ1Nlc3Npb25EZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKGFyZ3MpIHtcclxuICAgICAgICAgIHJldHVybiBhcmdzO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgICAgLy8gdGhpcyBhZGRzIGFuIGFkZGl0aW9uYWwgZXZlbnQgbGlzdGVuZXIgdG8gTWVkaWFTdHJhY2tUcmFjayB0aGF0IHNpZ25hbHNcclxuICAgICAgLy8gd2hlbiBhIHRyYWNrcyBlbmFibGVkIHByb3BlcnR5IHdhcyBjaGFuZ2VkLiBXb3JrYXJvdW5kIGZvciBhIGJ1ZyBpblxyXG4gICAgICAvLyBhZGRTdHJlYW0sIHNlZSBiZWxvdy4gTm8gbG9uZ2VyIHJlcXVpcmVkIGluIDE1MDI1K1xyXG4gICAgICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDE1MDI1KSB7XHJcbiAgICAgICAgdmFyIG9yaWdNU1RFbmFibGVkID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihcclxuICAgICAgICAgICAgd2luZG93Lk1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLCAnZW5hYmxlZCcpO1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuTWVkaWFTdHJlYW1UcmFjay5wcm90b3R5cGUsICdlbmFibGVkJywge1xyXG4gICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICBvcmlnTVNURW5hYmxlZC5zZXQuY2FsbCh0aGlzLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIHZhciBldiA9IG5ldyBFdmVudCgnZW5hYmxlZCcpO1xyXG4gICAgICAgICAgICBldi5lbmFibGVkID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBPUlRDIGRlZmluZXMgdGhlIERUTUYgc2VuZGVyIGEgYml0IGRpZmZlcmVudC5cclxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS93M2Mvb3J0Yy9pc3N1ZXMvNzE0XHJcbiAgICBpZiAod2luZG93LlJUQ1J0cFNlbmRlciAmJiAhKCdkdG1mJyBpbiB3aW5kb3cuUlRDUnRwU2VuZGVyLnByb3RvdHlwZSkpIHtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENSdHBTZW5kZXIucHJvdG90eXBlLCAnZHRtZicsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgaWYgKHRoaXMuX2R0bWYgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50cmFjay5raW5kID09PSAnYXVkaW8nKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5fZHRtZiA9IG5ldyB3aW5kb3cuUlRDRHRtZlNlbmRlcih0aGlzKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRyYWNrLmtpbmQgPT09ICd2aWRlbycpIHtcclxuICAgICAgICAgICAgICB0aGlzLl9kdG1mID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2R0bWY7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIC8vIEVkZ2UgY3VycmVudGx5IG9ubHkgaW1wbGVtZW50cyB0aGUgUlRDRHRtZlNlbmRlciwgbm90IHRoZVxyXG4gICAgLy8gUlRDRFRNRlNlbmRlciBhbGlhcy4gU2VlIGh0dHA6Ly9kcmFmdC5vcnRjLm9yZy8jcnRjZHRtZnNlbmRlcjIqXHJcbiAgICBpZiAod2luZG93LlJUQ0R0bWZTZW5kZXIgJiYgIXdpbmRvdy5SVENEVE1GU2VuZGVyKSB7XHJcbiAgICAgIHdpbmRvdy5SVENEVE1GU2VuZGVyID0gd2luZG93LlJUQ0R0bWZTZW5kZXI7XHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uID1cclxuICAgICAgICBzaGltUlRDUGVlckNvbm5lY3Rpb24od2luZG93LCBicm93c2VyRGV0YWlscy52ZXJzaW9uKTtcclxuICB9LFxyXG4gIHNoaW1SZXBsYWNlVHJhY2s6IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgLy8gT1JUQyBoYXMgcmVwbGFjZVRyYWNrIC0tIGh0dHBzOi8vZ2l0aHViLmNvbS93M2Mvb3J0Yy9pc3N1ZXMvNjE0XHJcbiAgICBpZiAod2luZG93LlJUQ1J0cFNlbmRlciAmJlxyXG4gICAgICAgICEoJ3JlcGxhY2VUcmFjaycgaW4gd2luZG93LlJUQ1J0cFNlbmRlci5wcm90b3R5cGUpKSB7XHJcbiAgICAgIHdpbmRvdy5SVENSdHBTZW5kZXIucHJvdG90eXBlLnJlcGxhY2VUcmFjayA9XHJcbiAgICAgICAgICB3aW5kb3cuUlRDUnRwU2VuZGVyLnByb3RvdHlwZS5zZXRUcmFjaztcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG59LHtcIi4uL3V0aWxzXCI6MTMsXCIuL2dldHVzZXJtZWRpYVwiOjksXCJydGNwZWVyY29ubmVjdGlvbi1zaGltXCI6MX1dLDk6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG4vKlxyXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKlxyXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxyXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXHJcbiAqICB0cmVlLlxyXG4gKi9cclxuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG4vLyBFeHBvc2UgcHVibGljIG1ldGhvZHMuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24od2luZG93KSB7XHJcbiAgdmFyIG5hdmlnYXRvciA9IHdpbmRvdyAmJiB3aW5kb3cubmF2aWdhdG9yO1xyXG5cclxuICB2YXIgc2hpbUVycm9yXyA9IGZ1bmN0aW9uKGUpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5hbWU6IHtQZXJtaXNzaW9uRGVuaWVkRXJyb3I6ICdOb3RBbGxvd2VkRXJyb3InfVtlLm5hbWVdIHx8IGUubmFtZSxcclxuICAgICAgbWVzc2FnZTogZS5tZXNzYWdlLFxyXG4gICAgICBjb25zdHJhaW50OiBlLmNvbnN0cmFpbnQsXHJcbiAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5uYW1lO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH07XHJcblxyXG4gIC8vIGdldFVzZXJNZWRpYSBlcnJvciBzaGltLlxyXG4gIHZhciBvcmlnR2V0VXNlck1lZGlhID0gbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEuXHJcbiAgICAgIGJpbmQobmF2aWdhdG9yLm1lZGlhRGV2aWNlcyk7XHJcbiAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEgPSBmdW5jdGlvbihjKSB7XHJcbiAgICByZXR1cm4gb3JpZ0dldFVzZXJNZWRpYShjKS5jYXRjaChmdW5jdGlvbihlKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChzaGltRXJyb3JfKGUpKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbn07XHJcblxyXG59LHt9XSwxMDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcbi8qXHJcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXHJcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcclxuICogIHRyZWUuXHJcbiAqL1xyXG4gLyogZXNsaW50LWVudiBub2RlICovXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBzaGltR2V0VXNlck1lZGlhOiByZXF1aXJlKCcuL2dldHVzZXJtZWRpYScpLFxyXG4gIHNoaW1PblRyYWNrOiBmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gJiYgISgnb250cmFjaycgaW5cclxuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSwgJ29udHJhY2snLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLl9vbnRyYWNrO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbihmKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5fb250cmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYWNrJywgdGhpcy5fb250cmFjayk7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWRkc3RyZWFtJywgdGhpcy5fb250cmFja3BvbHkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCd0cmFjaycsIHRoaXMuX29udHJhY2sgPSBmKTtcclxuICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignYWRkc3RyZWFtJywgdGhpcy5fb250cmFja3BvbHkgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUuc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcclxuICAgICAgICAgICAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ3RyYWNrJyk7XHJcbiAgICAgICAgICAgICAgZXZlbnQudHJhY2sgPSB0cmFjaztcclxuICAgICAgICAgICAgICBldmVudC5yZWNlaXZlciA9IHt0cmFjazogdHJhY2t9O1xyXG4gICAgICAgICAgICAgIGV2ZW50LnRyYW5zY2VpdmVyID0ge3JlY2VpdmVyOiBldmVudC5yZWNlaXZlcn07XHJcbiAgICAgICAgICAgICAgZXZlbnQuc3RyZWFtcyA9IFtlLnN0cmVhbV07XHJcbiAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiB3aW5kb3cuUlRDVHJhY2tFdmVudCAmJlxyXG4gICAgICAgICgncmVjZWl2ZXInIGluIHdpbmRvdy5SVENUcmFja0V2ZW50LnByb3RvdHlwZSkgJiZcclxuICAgICAgICAhKCd0cmFuc2NlaXZlcicgaW4gd2luZG93LlJUQ1RyYWNrRXZlbnQucHJvdG90eXBlKSkge1xyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1RyYWNrRXZlbnQucHJvdG90eXBlLCAndHJhbnNjZWl2ZXInLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHJldHVybiB7cmVjZWl2ZXI6IHRoaXMucmVjZWl2ZXJ9O1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgc2hpbVNvdXJjZU9iamVjdDogZnVuY3Rpb24od2luZG93KSB7XHJcbiAgICAvLyBGaXJlZm94IGhhcyBzdXBwb3J0ZWQgbW96U3JjT2JqZWN0IHNpbmNlIEZGMjIsIHVucHJlZml4ZWQgaW4gNDIuXHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgaWYgKHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50ICYmXHJcbiAgICAgICAgISgnc3JjT2JqZWN0JyBpbiB3aW5kb3cuSFRNTE1lZGlhRWxlbWVudC5wcm90b3R5cGUpKSB7XHJcbiAgICAgICAgLy8gU2hpbSB0aGUgc3JjT2JqZWN0IHByb3BlcnR5LCBvbmNlLCB3aGVuIEhUTUxNZWRpYUVsZW1lbnQgaXMgZm91bmQuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50LnByb3RvdHlwZSwgJ3NyY09iamVjdCcsIHtcclxuICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1velNyY09iamVjdDtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHN0cmVhbSkge1xyXG4gICAgICAgICAgICB0aGlzLm1velNyY09iamVjdCA9IHN0cmVhbTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHNoaW1QZWVyQ29ubmVjdGlvbjogZnVuY3Rpb24od2luZG93KSB7XHJcbiAgICB2YXIgYnJvd3NlckRldGFpbHMgPSB1dGlscy5kZXRlY3RCcm93c2VyKHdpbmRvdyk7XHJcblxyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICdvYmplY3QnIHx8ICEod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uIHx8XHJcbiAgICAgICAgd2luZG93Lm1velJUQ1BlZXJDb25uZWN0aW9uKSkge1xyXG4gICAgICByZXR1cm47IC8vIHByb2JhYmx5IG1lZGlhLnBlZXJjb25uZWN0aW9uLmVuYWJsZWQ9ZmFsc2UgaW4gYWJvdXQ6Y29uZmlnXHJcbiAgICB9XHJcbiAgICAvLyBUaGUgUlRDUGVlckNvbm5lY3Rpb24gb2JqZWN0LlxyXG4gICAgaWYgKCF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24pIHtcclxuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uID0gZnVuY3Rpb24ocGNDb25maWcsIHBjQ29uc3RyYWludHMpIHtcclxuICAgICAgICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDM4KSB7XHJcbiAgICAgICAgICAvLyAudXJscyBpcyBub3Qgc3VwcG9ydGVkIGluIEZGIDwgMzguXHJcbiAgICAgICAgICAvLyBjcmVhdGUgUlRDSWNlU2VydmVycyB3aXRoIGEgc2luZ2xlIHVybC5cclxuICAgICAgICAgIGlmIChwY0NvbmZpZyAmJiBwY0NvbmZpZy5pY2VTZXJ2ZXJzKSB7XHJcbiAgICAgICAgICAgIHZhciBuZXdJY2VTZXJ2ZXJzID0gW107XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGNDb25maWcuaWNlU2VydmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgIHZhciBzZXJ2ZXIgPSBwY0NvbmZpZy5pY2VTZXJ2ZXJzW2ldO1xyXG4gICAgICAgICAgICAgIGlmIChzZXJ2ZXIuaGFzT3duUHJvcGVydHkoJ3VybHMnKSkge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzZXJ2ZXIudXJscy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgbmV3U2VydmVyID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogc2VydmVyLnVybHNbal1cclxuICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgaWYgKHNlcnZlci51cmxzW2pdLmluZGV4T2YoJ3R1cm4nKSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld1NlcnZlci51c2VybmFtZSA9IHNlcnZlci51c2VybmFtZTtcclxuICAgICAgICAgICAgICAgICAgICBuZXdTZXJ2ZXIuY3JlZGVudGlhbCA9IHNlcnZlci5jcmVkZW50aWFsO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIG5ld0ljZVNlcnZlcnMucHVzaChuZXdTZXJ2ZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBuZXdJY2VTZXJ2ZXJzLnB1c2gocGNDb25maWcuaWNlU2VydmVyc1tpXSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHBjQ29uZmlnLmljZVNlcnZlcnMgPSBuZXdJY2VTZXJ2ZXJzO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IHdpbmRvdy5tb3pSVENQZWVyQ29ubmVjdGlvbihwY0NvbmZpZywgcGNDb25zdHJhaW50cyk7XHJcbiAgICAgIH07XHJcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUgPVxyXG4gICAgICAgICAgd2luZG93Lm1velJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZTtcclxuXHJcbiAgICAgIC8vIHdyYXAgc3RhdGljIG1ldGhvZHMuIEN1cnJlbnRseSBqdXN0IGdlbmVyYXRlQ2VydGlmaWNhdGUuXHJcbiAgICAgIGlmICh3aW5kb3cubW96UlRDUGVlckNvbm5lY3Rpb24uZ2VuZXJhdGVDZXJ0aWZpY2F0ZSkge1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24sICdnZW5lcmF0ZUNlcnRpZmljYXRlJywge1xyXG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5tb3pSVENQZWVyQ29ubmVjdGlvbi5nZW5lcmF0ZUNlcnRpZmljYXRlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB3aW5kb3cuUlRDU2Vzc2lvbkRlc2NyaXB0aW9uID0gd2luZG93Lm1velJUQ1Nlc3Npb25EZXNjcmlwdGlvbjtcclxuICAgICAgd2luZG93LlJUQ0ljZUNhbmRpZGF0ZSA9IHdpbmRvdy5tb3pSVENJY2VDYW5kaWRhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2hpbSBhd2F5IG5lZWQgZm9yIG9ic29sZXRlIFJUQ0ljZUNhbmRpZGF0ZS9SVENTZXNzaW9uRGVzY3JpcHRpb24uXHJcbiAgICBbJ3NldExvY2FsRGVzY3JpcHRpb24nLCAnc2V0UmVtb3RlRGVzY3JpcHRpb24nLCAnYWRkSWNlQ2FuZGlkYXRlJ11cclxuICAgICAgICAuZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcclxuICAgICAgICAgIHZhciBuYXRpdmVNZXRob2QgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF07XHJcbiAgICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgYXJndW1lbnRzWzBdID0gbmV3ICgobWV0aG9kID09PSAnYWRkSWNlQ2FuZGlkYXRlJykgP1xyXG4gICAgICAgICAgICAgICAgd2luZG93LlJUQ0ljZUNhbmRpZGF0ZSA6XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKShhcmd1bWVudHNbMF0pO1xyXG4gICAgICAgICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIC8vIHN1cHBvcnQgZm9yIGFkZEljZUNhbmRpZGF0ZShudWxsIG9yIHVuZGVmaW5lZClcclxuICAgIHZhciBuYXRpdmVBZGRJY2VDYW5kaWRhdGUgPVxyXG4gICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkSWNlQ2FuZGlkYXRlO1xyXG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRJY2VDYW5kaWRhdGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgaWYgKCFhcmd1bWVudHNbMF0pIHtcclxuICAgICAgICBpZiAoYXJndW1lbnRzWzFdKSB7XHJcbiAgICAgICAgICBhcmd1bWVudHNbMV0uYXBwbHkobnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbmF0aXZlQWRkSWNlQ2FuZGlkYXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIHNoaW0gZ2V0U3RhdHMgd2l0aCBtYXBsaWtlIHN1cHBvcnRcclxuICAgIHZhciBtYWtlTWFwU3RhdHMgPSBmdW5jdGlvbihzdGF0cykge1xyXG4gICAgICB2YXIgbWFwID0gbmV3IE1hcCgpO1xyXG4gICAgICBPYmplY3Qua2V5cyhzdGF0cykuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcclxuICAgICAgICBtYXAuc2V0KGtleSwgc3RhdHNba2V5XSk7XHJcbiAgICAgICAgbWFwW2tleV0gPSBzdGF0c1trZXldO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIG1hcDtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIG1vZGVyblN0YXRzVHlwZXMgPSB7XHJcbiAgICAgIGluYm91bmRydHA6ICdpbmJvdW5kLXJ0cCcsXHJcbiAgICAgIG91dGJvdW5kcnRwOiAnb3V0Ym91bmQtcnRwJyxcclxuICAgICAgY2FuZGlkYXRlcGFpcjogJ2NhbmRpZGF0ZS1wYWlyJyxcclxuICAgICAgbG9jYWxjYW5kaWRhdGU6ICdsb2NhbC1jYW5kaWRhdGUnLFxyXG4gICAgICByZW1vdGVjYW5kaWRhdGU6ICdyZW1vdGUtY2FuZGlkYXRlJ1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgbmF0aXZlR2V0U3RhdHMgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFN0YXRzO1xyXG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTdGF0cyA9IGZ1bmN0aW9uKFxyXG4gICAgICBzZWxlY3RvcixcclxuICAgICAgb25TdWNjLFxyXG4gICAgICBvbkVyclxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybiBuYXRpdmVHZXRTdGF0cy5hcHBseSh0aGlzLCBbc2VsZWN0b3IgfHwgbnVsbF0pXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oc3RhdHMpIHtcclxuICAgICAgICAgIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgNDgpIHtcclxuICAgICAgICAgICAgc3RhdHMgPSBtYWtlTWFwU3RhdHMoc3RhdHMpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCA1MyAmJiAhb25TdWNjKSB7XHJcbiAgICAgICAgICAgIC8vIFNoaW0gb25seSBwcm9taXNlIGdldFN0YXRzIHdpdGggc3BlYy1oeXBoZW5zIGluIHR5cGUgbmFtZXNcclxuICAgICAgICAgICAgLy8gTGVhdmUgY2FsbGJhY2sgdmVyc2lvbiBhbG9uZTsgbWlzYyBvbGQgdXNlcyBvZiBmb3JFYWNoIGJlZm9yZSBNYXBcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICBzdGF0cy5mb3JFYWNoKGZ1bmN0aW9uKHN0YXQpIHtcclxuICAgICAgICAgICAgICAgIHN0YXQudHlwZSA9IG1vZGVyblN0YXRzVHlwZXNbc3RhdC50eXBlXSB8fCBzdGF0LnR5cGU7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICBpZiAoZS5uYW1lICE9PSAnVHlwZUVycm9yJykge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgLy8gQXZvaWQgVHlwZUVycm9yOiBcInR5cGVcIiBpcyByZWFkLW9ubHksIGluIG9sZCB2ZXJzaW9ucy4gMzQtNDNpc2hcclxuICAgICAgICAgICAgICBzdGF0cy5mb3JFYWNoKGZ1bmN0aW9uKHN0YXQsIGkpIHtcclxuICAgICAgICAgICAgICAgIHN0YXRzLnNldChpLCBPYmplY3QuYXNzaWduKHt9LCBzdGF0LCB7XHJcbiAgICAgICAgICAgICAgICAgIHR5cGU6IG1vZGVyblN0YXRzVHlwZXNbc3RhdC50eXBlXSB8fCBzdGF0LnR5cGVcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIHN0YXRzO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ob25TdWNjLCBvbkVycik7XHJcbiAgICB9O1xyXG4gIH0sXHJcblxyXG4gIHNoaW1SZW1vdmVTdHJlYW06IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgaWYgKCF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gfHxcclxuICAgICAgICAncmVtb3ZlU3RyZWFtJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgIHV0aWxzLmRlcHJlY2F0ZWQoJ3JlbW92ZVN0cmVhbScsICdyZW1vdmVUcmFjaycpO1xyXG4gICAgICB0aGlzLmdldFNlbmRlcnMoKS5mb3JFYWNoKGZ1bmN0aW9uKHNlbmRlcikge1xyXG4gICAgICAgIGlmIChzZW5kZXIudHJhY2sgJiYgc3RyZWFtLmdldFRyYWNrcygpLmluZGV4T2Yoc2VuZGVyLnRyYWNrKSAhPT0gLTEpIHtcclxuICAgICAgICAgIHBjLnJlbW92ZVRyYWNrKHNlbmRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH07XHJcbiAgfVxyXG59O1xyXG5cclxufSx7XCIuLi91dGlsc1wiOjEzLFwiLi9nZXR1c2VybWVkaWFcIjoxMX1dLDExOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuLypcclxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcclxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxyXG4gKiAgdHJlZS5cclxuICovXHJcbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcclxudmFyIGxvZ2dpbmcgPSB1dGlscy5sb2c7XHJcblxyXG4vLyBFeHBvc2UgcHVibGljIG1ldGhvZHMuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24od2luZG93KSB7XHJcbiAgdmFyIGJyb3dzZXJEZXRhaWxzID0gdXRpbHMuZGV0ZWN0QnJvd3Nlcih3aW5kb3cpO1xyXG4gIHZhciBuYXZpZ2F0b3IgPSB3aW5kb3cgJiYgd2luZG93Lm5hdmlnYXRvcjtcclxuICB2YXIgTWVkaWFTdHJlYW1UcmFjayA9IHdpbmRvdyAmJiB3aW5kb3cuTWVkaWFTdHJlYW1UcmFjaztcclxuXHJcbiAgdmFyIHNoaW1FcnJvcl8gPSBmdW5jdGlvbihlKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuYW1lOiB7XHJcbiAgICAgICAgSW50ZXJuYWxFcnJvcjogJ05vdFJlYWRhYmxlRXJyb3InLFxyXG4gICAgICAgIE5vdFN1cHBvcnRlZEVycm9yOiAnVHlwZUVycm9yJyxcclxuICAgICAgICBQZXJtaXNzaW9uRGVuaWVkRXJyb3I6ICdOb3RBbGxvd2VkRXJyb3InLFxyXG4gICAgICAgIFNlY3VyaXR5RXJyb3I6ICdOb3RBbGxvd2VkRXJyb3InXHJcbiAgICAgIH1bZS5uYW1lXSB8fCBlLm5hbWUsXHJcbiAgICAgIG1lc3NhZ2U6IHtcclxuICAgICAgICAnVGhlIG9wZXJhdGlvbiBpcyBpbnNlY3VyZS4nOiAnVGhlIHJlcXVlc3QgaXMgbm90IGFsbG93ZWQgYnkgdGhlICcgK1xyXG4gICAgICAgICd1c2VyIGFnZW50IG9yIHRoZSBwbGF0Zm9ybSBpbiB0aGUgY3VycmVudCBjb250ZXh0LidcclxuICAgICAgfVtlLm1lc3NhZ2VdIHx8IGUubWVzc2FnZSxcclxuICAgICAgY29uc3RyYWludDogZS5jb25zdHJhaW50LFxyXG4gICAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZSArICh0aGlzLm1lc3NhZ2UgJiYgJzogJykgKyB0aGlzLm1lc3NhZ2U7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfTtcclxuXHJcbiAgLy8gZ2V0VXNlck1lZGlhIGNvbnN0cmFpbnRzIHNoaW0uXHJcbiAgdmFyIGdldFVzZXJNZWRpYV8gPSBmdW5jdGlvbihjb25zdHJhaW50cywgb25TdWNjZXNzLCBvbkVycm9yKSB7XHJcbiAgICB2YXIgY29uc3RyYWludHNUb0ZGMzdfID0gZnVuY3Rpb24oYykge1xyXG4gICAgICBpZiAodHlwZW9mIGMgIT09ICdvYmplY3QnIHx8IGMucmVxdWlyZSkge1xyXG4gICAgICAgIHJldHVybiBjO1xyXG4gICAgICB9XHJcbiAgICAgIHZhciByZXF1aXJlID0gW107XHJcbiAgICAgIE9iamVjdC5rZXlzKGMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgaWYgKGtleSA9PT0gJ3JlcXVpcmUnIHx8IGtleSA9PT0gJ2FkdmFuY2VkJyB8fCBrZXkgPT09ICdtZWRpYVNvdXJjZScpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHIgPSBjW2tleV0gPSAodHlwZW9mIGNba2V5XSA9PT0gJ29iamVjdCcpID9cclxuICAgICAgICAgICAgY1trZXldIDoge2lkZWFsOiBjW2tleV19O1xyXG4gICAgICAgIGlmIChyLm1pbiAhPT0gdW5kZWZpbmVkIHx8XHJcbiAgICAgICAgICAgIHIubWF4ICE9PSB1bmRlZmluZWQgfHwgci5leGFjdCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICByZXF1aXJlLnB1c2goa2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHIuZXhhY3QgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiByLmV4YWN0ID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICByLiBtaW4gPSByLm1heCA9IHIuZXhhY3Q7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjW2tleV0gPSByLmV4YWN0O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZGVsZXRlIHIuZXhhY3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyLmlkZWFsICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIGMuYWR2YW5jZWQgPSBjLmFkdmFuY2VkIHx8IFtdO1xyXG4gICAgICAgICAgdmFyIG9jID0ge307XHJcbiAgICAgICAgICBpZiAodHlwZW9mIHIuaWRlYWwgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIG9jW2tleV0gPSB7bWluOiByLmlkZWFsLCBtYXg6IHIuaWRlYWx9O1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb2Nba2V5XSA9IHIuaWRlYWw7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjLmFkdmFuY2VkLnB1c2gob2MpO1xyXG4gICAgICAgICAgZGVsZXRlIHIuaWRlYWw7XHJcbiAgICAgICAgICBpZiAoIU9iamVjdC5rZXlzKHIpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBkZWxldGUgY1trZXldO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIGlmIChyZXF1aXJlLmxlbmd0aCkge1xyXG4gICAgICAgIGMucmVxdWlyZSA9IHJlcXVpcmU7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGM7XHJcbiAgICB9O1xyXG4gICAgY29uc3RyYWludHMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGNvbnN0cmFpbnRzKSk7XHJcbiAgICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDM4KSB7XHJcbiAgICAgIGxvZ2dpbmcoJ3NwZWM6ICcgKyBKU09OLnN0cmluZ2lmeShjb25zdHJhaW50cykpO1xyXG4gICAgICBpZiAoY29uc3RyYWludHMuYXVkaW8pIHtcclxuICAgICAgICBjb25zdHJhaW50cy5hdWRpbyA9IGNvbnN0cmFpbnRzVG9GRjM3Xyhjb25zdHJhaW50cy5hdWRpbyk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNvbnN0cmFpbnRzLnZpZGVvKSB7XHJcbiAgICAgICAgY29uc3RyYWludHMudmlkZW8gPSBjb25zdHJhaW50c1RvRkYzN18oY29uc3RyYWludHMudmlkZW8pO1xyXG4gICAgICB9XHJcbiAgICAgIGxvZ2dpbmcoJ2ZmMzc6ICcgKyBKU09OLnN0cmluZ2lmeShjb25zdHJhaW50cykpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5hdmlnYXRvci5tb3pHZXRVc2VyTWVkaWEoY29uc3RyYWludHMsIG9uU3VjY2VzcywgZnVuY3Rpb24oZSkge1xyXG4gICAgICBvbkVycm9yKHNoaW1FcnJvcl8oZSkpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgLy8gUmV0dXJucyB0aGUgcmVzdWx0IG9mIGdldFVzZXJNZWRpYSBhcyBhIFByb21pc2UuXHJcbiAgdmFyIGdldFVzZXJNZWRpYVByb21pc2VfID0gZnVuY3Rpb24oY29uc3RyYWludHMpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgZ2V0VXNlck1lZGlhXyhjb25zdHJhaW50cywgcmVzb2x2ZSwgcmVqZWN0KTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIC8vIFNoaW0gZm9yIG1lZGlhRGV2aWNlcyBvbiBvbGRlciB2ZXJzaW9ucy5cclxuICBpZiAoIW5hdmlnYXRvci5tZWRpYURldmljZXMpIHtcclxuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMgPSB7Z2V0VXNlck1lZGlhOiBnZXRVc2VyTWVkaWFQcm9taXNlXyxcclxuICAgICAgYWRkRXZlbnRMaXN0ZW5lcjogZnVuY3Rpb24oKSB7IH0sXHJcbiAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXI6IGZ1bmN0aW9uKCkgeyB9XHJcbiAgICB9O1xyXG4gIH1cclxuICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmVudW1lcmF0ZURldmljZXMgPVxyXG4gICAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmVudW1lcmF0ZURldmljZXMgfHwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcclxuICAgICAgICAgIHZhciBpbmZvcyA9IFtcclxuICAgICAgICAgICAge2tpbmQ6ICdhdWRpb2lucHV0JywgZGV2aWNlSWQ6ICdkZWZhdWx0JywgbGFiZWw6ICcnLCBncm91cElkOiAnJ30sXHJcbiAgICAgICAgICAgIHtraW5kOiAndmlkZW9pbnB1dCcsIGRldmljZUlkOiAnZGVmYXVsdCcsIGxhYmVsOiAnJywgZ3JvdXBJZDogJyd9XHJcbiAgICAgICAgICBdO1xyXG4gICAgICAgICAgcmVzb2x2ZShpbmZvcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH07XHJcblxyXG4gIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgNDEpIHtcclxuICAgIC8vIFdvcmsgYXJvdW5kIGh0dHA6Ly9idWd6aWwubGEvMTE2OTY2NVxyXG4gICAgdmFyIG9yZ0VudW1lcmF0ZURldmljZXMgPVxyXG4gICAgICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlcy5iaW5kKG5hdmlnYXRvci5tZWRpYURldmljZXMpO1xyXG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiBvcmdFbnVtZXJhdGVEZXZpY2VzKCkudGhlbih1bmRlZmluZWQsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAoZS5uYW1lID09PSAnTm90Rm91bmRFcnJvcicpIHtcclxuICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhyb3cgZTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG4gIH1cclxuICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDQ5KSB7XHJcbiAgICB2YXIgb3JpZ0dldFVzZXJNZWRpYSA9IG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhLlxyXG4gICAgICAgIGJpbmQobmF2aWdhdG9yLm1lZGlhRGV2aWNlcyk7XHJcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSA9IGZ1bmN0aW9uKGMpIHtcclxuICAgICAgcmV0dXJuIG9yaWdHZXRVc2VyTWVkaWEoYykudGhlbihmdW5jdGlvbihzdHJlYW0pIHtcclxuICAgICAgICAvLyBXb3JrIGFyb3VuZCBodHRwczovL2J1Z3ppbC5sYS84MDIzMjZcclxuICAgICAgICBpZiAoYy5hdWRpbyAmJiAhc3RyZWFtLmdldEF1ZGlvVHJhY2tzKCkubGVuZ3RoIHx8XHJcbiAgICAgICAgICAgIGMudmlkZW8gJiYgIXN0cmVhbS5nZXRWaWRlb1RyYWNrcygpLmxlbmd0aCkge1xyXG4gICAgICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcclxuICAgICAgICAgICAgdHJhY2suc3RvcCgpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKCdUaGUgb2JqZWN0IGNhbiBub3QgYmUgZm91bmQgaGVyZS4nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnTm90Rm91bmRFcnJvcicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RyZWFtO1xyXG4gICAgICB9LCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHNoaW1FcnJvcl8oZSkpO1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcbiAgfVxyXG4gIGlmICghKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPiA1NSAmJlxyXG4gICAgICAnYXV0b0dhaW5Db250cm9sJyBpbiBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFN1cHBvcnRlZENvbnN0cmFpbnRzKCkpKSB7XHJcbiAgICB2YXIgcmVtYXAgPSBmdW5jdGlvbihvYmosIGEsIGIpIHtcclxuICAgICAgaWYgKGEgaW4gb2JqICYmICEoYiBpbiBvYmopKSB7XHJcbiAgICAgICAgb2JqW2JdID0gb2JqW2FdO1xyXG4gICAgICAgIGRlbGV0ZSBvYmpbYV07XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdmFyIG5hdGl2ZUdldFVzZXJNZWRpYSA9IG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhLlxyXG4gICAgICAgIGJpbmQobmF2aWdhdG9yLm1lZGlhRGV2aWNlcyk7XHJcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSA9IGZ1bmN0aW9uKGMpIHtcclxuICAgICAgaWYgKHR5cGVvZiBjID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgYy5hdWRpbyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICBjID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShjKSk7XHJcbiAgICAgICAgcmVtYXAoYy5hdWRpbywgJ2F1dG9HYWluQ29udHJvbCcsICdtb3pBdXRvR2FpbkNvbnRyb2wnKTtcclxuICAgICAgICByZW1hcChjLmF1ZGlvLCAnbm9pc2VTdXBwcmVzc2lvbicsICdtb3pOb2lzZVN1cHByZXNzaW9uJyk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG5hdGl2ZUdldFVzZXJNZWRpYShjKTtcclxuICAgIH07XHJcblxyXG4gICAgaWYgKE1lZGlhU3RyZWFtVHJhY2sgJiYgTWVkaWFTdHJlYW1UcmFjay5wcm90b3R5cGUuZ2V0U2V0dGluZ3MpIHtcclxuICAgICAgdmFyIG5hdGl2ZUdldFNldHRpbmdzID0gTWVkaWFTdHJlYW1UcmFjay5wcm90b3R5cGUuZ2V0U2V0dGluZ3M7XHJcbiAgICAgIE1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLmdldFNldHRpbmdzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIG9iaiA9IG5hdGl2ZUdldFNldHRpbmdzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgcmVtYXAob2JqLCAnbW96QXV0b0dhaW5Db250cm9sJywgJ2F1dG9HYWluQ29udHJvbCcpO1xyXG4gICAgICAgIHJlbWFwKG9iaiwgJ21vek5vaXNlU3VwcHJlc3Npb24nLCAnbm9pc2VTdXBwcmVzc2lvbicpO1xyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKE1lZGlhU3RyZWFtVHJhY2sgJiYgTWVkaWFTdHJlYW1UcmFjay5wcm90b3R5cGUuYXBwbHlDb25zdHJhaW50cykge1xyXG4gICAgICB2YXIgbmF0aXZlQXBwbHlDb25zdHJhaW50cyA9IE1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLmFwcGx5Q29uc3RyYWludHM7XHJcbiAgICAgIE1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLmFwcGx5Q29uc3RyYWludHMgPSBmdW5jdGlvbihjKSB7XHJcbiAgICAgICAgaWYgKHRoaXMua2luZCA9PT0gJ2F1ZGlvJyAmJiB0eXBlb2YgYyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgIGMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGMpKTtcclxuICAgICAgICAgIHJlbWFwKGMsICdhdXRvR2FpbkNvbnRyb2wnLCAnbW96QXV0b0dhaW5Db250cm9sJyk7XHJcbiAgICAgICAgICByZW1hcChjLCAnbm9pc2VTdXBwcmVzc2lvbicsICdtb3pOb2lzZVN1cHByZXNzaW9uJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuYXRpdmVBcHBseUNvbnN0cmFpbnRzLmFwcGx5KHRoaXMsIFtjXSk7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfVxyXG4gIG5hdmlnYXRvci5nZXRVc2VyTWVkaWEgPSBmdW5jdGlvbihjb25zdHJhaW50cywgb25TdWNjZXNzLCBvbkVycm9yKSB7XHJcbiAgICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDQ0KSB7XHJcbiAgICAgIHJldHVybiBnZXRVc2VyTWVkaWFfKGNvbnN0cmFpbnRzLCBvblN1Y2Nlc3MsIG9uRXJyb3IpO1xyXG4gICAgfVxyXG4gICAgLy8gUmVwbGFjZSBGaXJlZm94IDQ0KydzIGRlcHJlY2F0aW9uIHdhcm5pbmcgd2l0aCB1bnByZWZpeGVkIHZlcnNpb24uXHJcbiAgICB1dGlscy5kZXByZWNhdGVkKCduYXZpZ2F0b3IuZ2V0VXNlck1lZGlhJyxcclxuICAgICAgICAnbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEnKTtcclxuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzKS50aGVuKG9uU3VjY2Vzcywgb25FcnJvcik7XHJcbiAgfTtcclxufTtcclxuXHJcbn0se1wiLi4vdXRpbHNcIjoxM31dLDEyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuLypcclxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcclxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxyXG4gKiAgdHJlZS5cclxuICovXHJcbid1c2Ugc3RyaWN0JztcclxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIHNoaW1Mb2NhbFN0cmVhbXNBUEk6IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICdvYmplY3QnIHx8ICF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKCEoJ2dldExvY2FsU3RyZWFtcycgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkpIHtcclxuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRMb2NhbFN0cmVhbXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2xvY2FsU3RyZWFtcykge1xyXG4gICAgICAgICAgdGhpcy5fbG9jYWxTdHJlYW1zID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9sb2NhbFN0cmVhbXM7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICBpZiAoISgnZ2V0U3RyZWFtQnlJZCcgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkpIHtcclxuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTdHJlYW1CeUlkID0gZnVuY3Rpb24oaWQpIHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gbnVsbDtcclxuICAgICAgICBpZiAodGhpcy5fbG9jYWxTdHJlYW1zKSB7XHJcbiAgICAgICAgICB0aGlzLl9sb2NhbFN0cmVhbXMuZm9yRWFjaChmdW5jdGlvbihzdHJlYW0pIHtcclxuICAgICAgICAgICAgaWYgKHN0cmVhbS5pZCA9PT0gaWQpIHtcclxuICAgICAgICAgICAgICByZXN1bHQgPSBzdHJlYW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fcmVtb3RlU3RyZWFtcykge1xyXG4gICAgICAgICAgdGhpcy5fcmVtb3RlU3RyZWFtcy5mb3JFYWNoKGZ1bmN0aW9uKHN0cmVhbSkge1xyXG4gICAgICAgICAgICBpZiAoc3RyZWFtLmlkID09PSBpZCkge1xyXG4gICAgICAgICAgICAgIHJlc3VsdCA9IHN0cmVhbTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICBpZiAoISgnYWRkU3RyZWFtJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xyXG4gICAgICB2YXIgX2FkZFRyYWNrID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjaztcclxuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2xvY2FsU3RyZWFtcykge1xyXG4gICAgICAgICAgdGhpcy5fbG9jYWxTdHJlYW1zID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9sb2NhbFN0cmVhbXMuaW5kZXhPZihzdHJlYW0pID09PSAtMSkge1xyXG4gICAgICAgICAgdGhpcy5fbG9jYWxTdHJlYW1zLnB1c2goc3RyZWFtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xyXG4gICAgICAgICAgX2FkZFRyYWNrLmNhbGwocGMsIHRyYWNrLCBzdHJlYW0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjayA9IGZ1bmN0aW9uKHRyYWNrLCBzdHJlYW0pIHtcclxuICAgICAgICBpZiAoc3RyZWFtKSB7XHJcbiAgICAgICAgICBpZiAoIXRoaXMuX2xvY2FsU3RyZWFtcykge1xyXG4gICAgICAgICAgICB0aGlzLl9sb2NhbFN0cmVhbXMgPSBbc3RyZWFtXTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fbG9jYWxTdHJlYW1zLmluZGV4T2Yoc3RyZWFtKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5fbG9jYWxTdHJlYW1zLnB1c2goc3RyZWFtKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIF9hZGRUcmFjay5jYWxsKHRoaXMsIHRyYWNrLCBzdHJlYW0pO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgaWYgKCEoJ3JlbW92ZVN0cmVhbScgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkpIHtcclxuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2xvY2FsU3RyZWFtcykge1xyXG4gICAgICAgICAgdGhpcy5fbG9jYWxTdHJlYW1zID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuX2xvY2FsU3RyZWFtcy5pbmRleE9mKHN0cmVhbSk7XHJcbiAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9sb2NhbFN0cmVhbXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICAgIHZhciB0cmFja3MgPSBzdHJlYW0uZ2V0VHJhY2tzKCk7XHJcbiAgICAgICAgdGhpcy5nZXRTZW5kZXJzKCkuZm9yRWFjaChmdW5jdGlvbihzZW5kZXIpIHtcclxuICAgICAgICAgIGlmICh0cmFja3MuaW5kZXhPZihzZW5kZXIudHJhY2spICE9PSAtMSkge1xyXG4gICAgICAgICAgICBwYy5yZW1vdmVUcmFjayhzZW5kZXIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2hpbVJlbW90ZVN0cmVhbXNBUEk6IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICdvYmplY3QnIHx8ICF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKCEoJ2dldFJlbW90ZVN0cmVhbXMnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XHJcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0UmVtb3RlU3RyZWFtcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZW1vdGVTdHJlYW1zID8gdGhpcy5fcmVtb3RlU3RyZWFtcyA6IFtdO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgaWYgKCEoJ29uYWRkc3RyZWFtJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSwgJ29uYWRkc3RyZWFtJywge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5fb25hZGRzdHJlYW07XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKGYpIHtcclxuICAgICAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgICAgICBpZiAodGhpcy5fb25hZGRzdHJlYW0pIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdhZGRzdHJlYW0nLCB0aGlzLl9vbmFkZHN0cmVhbSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhY2snLCB0aGlzLl9vbmFkZHN0cmVhbXBvbHkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdhZGRzdHJlYW0nLCB0aGlzLl9vbmFkZHN0cmVhbSA9IGYpO1xyXG4gICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCd0cmFjaycsIHRoaXMuX29uYWRkc3RyZWFtcG9seSA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgZS5zdHJlYW1zLmZvckVhY2goZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICAgICAgICAgICAgaWYgKCFwYy5fcmVtb3RlU3RyZWFtcykge1xyXG4gICAgICAgICAgICAgICAgcGMuX3JlbW90ZVN0cmVhbXMgPSBbXTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgaWYgKHBjLl9yZW1vdGVTdHJlYW1zLmluZGV4T2Yoc3RyZWFtKSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHBjLl9yZW1vdGVTdHJlYW1zLnB1c2goc3RyZWFtKTtcclxuICAgICAgICAgICAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ2FkZHN0cmVhbScpO1xyXG4gICAgICAgICAgICAgIGV2ZW50LnN0cmVhbSA9IHN0cmVhbTtcclxuICAgICAgICAgICAgICBwYy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2hpbUNhbGxiYWNrc0FQSTogZnVuY3Rpb24od2luZG93KSB7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ29iamVjdCcgfHwgIXdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB2YXIgcHJvdG90eXBlID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZTtcclxuICAgIHZhciBjcmVhdGVPZmZlciA9IHByb3RvdHlwZS5jcmVhdGVPZmZlcjtcclxuICAgIHZhciBjcmVhdGVBbnN3ZXIgPSBwcm90b3R5cGUuY3JlYXRlQW5zd2VyO1xyXG4gICAgdmFyIHNldExvY2FsRGVzY3JpcHRpb24gPSBwcm90b3R5cGUuc2V0TG9jYWxEZXNjcmlwdGlvbjtcclxuICAgIHZhciBzZXRSZW1vdGVEZXNjcmlwdGlvbiA9IHByb3RvdHlwZS5zZXRSZW1vdGVEZXNjcmlwdGlvbjtcclxuICAgIHZhciBhZGRJY2VDYW5kaWRhdGUgPSBwcm90b3R5cGUuYWRkSWNlQ2FuZGlkYXRlO1xyXG5cclxuICAgIHByb3RvdHlwZS5jcmVhdGVPZmZlciA9IGZ1bmN0aW9uKHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKSB7XHJcbiAgICAgIHZhciBvcHRpb25zID0gKGFyZ3VtZW50cy5sZW5ndGggPj0gMikgPyBhcmd1bWVudHNbMl0gOiBhcmd1bWVudHNbMF07XHJcbiAgICAgIHZhciBwcm9taXNlID0gY3JlYXRlT2ZmZXIuYXBwbHkodGhpcywgW29wdGlvbnNdKTtcclxuICAgICAgaWYgKCFmYWlsdXJlQ2FsbGJhY2spIHtcclxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgICAgfVxyXG4gICAgICBwcm9taXNlLnRoZW4oc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spO1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHByb3RvdHlwZS5jcmVhdGVBbnN3ZXIgPSBmdW5jdGlvbihzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjaykge1xyXG4gICAgICB2YXIgb3B0aW9ucyA9IChhcmd1bWVudHMubGVuZ3RoID49IDIpID8gYXJndW1lbnRzWzJdIDogYXJndW1lbnRzWzBdO1xyXG4gICAgICB2YXIgcHJvbWlzZSA9IGNyZWF0ZUFuc3dlci5hcHBseSh0aGlzLCBbb3B0aW9uc10pO1xyXG4gICAgICBpZiAoIWZhaWx1cmVDYWxsYmFjaykge1xyXG4gICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgICB9XHJcbiAgICAgIHByb21pc2UudGhlbihzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjayk7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIHdpdGhDYWxsYmFjayA9IGZ1bmN0aW9uKGRlc2NyaXB0aW9uLCBzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjaykge1xyXG4gICAgICB2YXIgcHJvbWlzZSA9IHNldExvY2FsRGVzY3JpcHRpb24uYXBwbHkodGhpcywgW2Rlc2NyaXB0aW9uXSk7XHJcbiAgICAgIGlmICghZmFpbHVyZUNhbGxiYWNrKSB7XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICAgIH1cclxuICAgICAgcHJvbWlzZS50aGVuKHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKTtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgfTtcclxuICAgIHByb3RvdHlwZS5zZXRMb2NhbERlc2NyaXB0aW9uID0gd2l0aENhbGxiYWNrO1xyXG5cclxuICAgIHdpdGhDYWxsYmFjayA9IGZ1bmN0aW9uKGRlc2NyaXB0aW9uLCBzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjaykge1xyXG4gICAgICB2YXIgcHJvbWlzZSA9IHNldFJlbW90ZURlc2NyaXB0aW9uLmFwcGx5KHRoaXMsIFtkZXNjcmlwdGlvbl0pO1xyXG4gICAgICBpZiAoIWZhaWx1cmVDYWxsYmFjaykge1xyXG4gICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgICB9XHJcbiAgICAgIHByb21pc2UudGhlbihzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjayk7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgIH07XHJcbiAgICBwcm90b3R5cGUuc2V0UmVtb3RlRGVzY3JpcHRpb24gPSB3aXRoQ2FsbGJhY2s7XHJcblxyXG4gICAgd2l0aENhbGxiYWNrID0gZnVuY3Rpb24oY2FuZGlkYXRlLCBzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjaykge1xyXG4gICAgICB2YXIgcHJvbWlzZSA9IGFkZEljZUNhbmRpZGF0ZS5hcHBseSh0aGlzLCBbY2FuZGlkYXRlXSk7XHJcbiAgICAgIGlmICghZmFpbHVyZUNhbGxiYWNrKSB7XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICAgIH1cclxuICAgICAgcHJvbWlzZS50aGVuKHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKTtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgfTtcclxuICAgIHByb3RvdHlwZS5hZGRJY2VDYW5kaWRhdGUgPSB3aXRoQ2FsbGJhY2s7XHJcbiAgfSxcclxuICBzaGltR2V0VXNlck1lZGlhOiBmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIHZhciBuYXZpZ2F0b3IgPSB3aW5kb3cgJiYgd2luZG93Lm5hdmlnYXRvcjtcclxuXHJcbiAgICBpZiAoIW5hdmlnYXRvci5nZXRVc2VyTWVkaWEpIHtcclxuICAgICAgaWYgKG5hdmlnYXRvci53ZWJraXRHZXRVc2VyTWVkaWEpIHtcclxuICAgICAgICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhID0gbmF2aWdhdG9yLndlYmtpdEdldFVzZXJNZWRpYS5iaW5kKG5hdmlnYXRvcik7XHJcbiAgICAgIH0gZWxzZSBpZiAobmF2aWdhdG9yLm1lZGlhRGV2aWNlcyAmJlxyXG4gICAgICAgICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEpIHtcclxuICAgICAgICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhID0gZnVuY3Rpb24oY29uc3RyYWludHMsIGNiLCBlcnJjYikge1xyXG4gICAgICAgICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoY29uc3RyYWludHMpXHJcbiAgICAgICAgICAudGhlbihjYiwgZXJyY2IpO1xyXG4gICAgICAgIH0uYmluZChuYXZpZ2F0b3IpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBzaGltUlRDSWNlU2VydmVyVXJsczogZnVuY3Rpb24od2luZG93KSB7XHJcbiAgICAvLyBtaWdyYXRlIGZyb20gbm9uLXNwZWMgUlRDSWNlU2VydmVyLnVybCB0byBSVENJY2VTZXJ2ZXIudXJsc1xyXG4gICAgdmFyIE9yaWdQZWVyQ29ubmVjdGlvbiA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbjtcclxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiA9IGZ1bmN0aW9uKHBjQ29uZmlnLCBwY0NvbnN0cmFpbnRzKSB7XHJcbiAgICAgIGlmIChwY0NvbmZpZyAmJiBwY0NvbmZpZy5pY2VTZXJ2ZXJzKSB7XHJcbiAgICAgICAgdmFyIG5ld0ljZVNlcnZlcnMgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBjQ29uZmlnLmljZVNlcnZlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIHZhciBzZXJ2ZXIgPSBwY0NvbmZpZy5pY2VTZXJ2ZXJzW2ldO1xyXG4gICAgICAgICAgaWYgKCFzZXJ2ZXIuaGFzT3duUHJvcGVydHkoJ3VybHMnKSAmJlxyXG4gICAgICAgICAgICAgIHNlcnZlci5oYXNPd25Qcm9wZXJ0eSgndXJsJykpIHtcclxuICAgICAgICAgICAgdXRpbHMuZGVwcmVjYXRlZCgnUlRDSWNlU2VydmVyLnVybCcsICdSVENJY2VTZXJ2ZXIudXJscycpO1xyXG4gICAgICAgICAgICBzZXJ2ZXIgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHNlcnZlcikpO1xyXG4gICAgICAgICAgICBzZXJ2ZXIudXJscyA9IHNlcnZlci51cmw7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBzZXJ2ZXIudXJsO1xyXG4gICAgICAgICAgICBuZXdJY2VTZXJ2ZXJzLnB1c2goc2VydmVyKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5ld0ljZVNlcnZlcnMucHVzaChwY0NvbmZpZy5pY2VTZXJ2ZXJzW2ldKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcGNDb25maWcuaWNlU2VydmVycyA9IG5ld0ljZVNlcnZlcnM7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG5ldyBPcmlnUGVlckNvbm5lY3Rpb24ocGNDb25maWcsIHBjQ29uc3RyYWludHMpO1xyXG4gICAgfTtcclxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUgPSBPcmlnUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlO1xyXG4gICAgLy8gd3JhcCBzdGF0aWMgbWV0aG9kcy4gQ3VycmVudGx5IGp1c3QgZ2VuZXJhdGVDZXJ0aWZpY2F0ZS5cclxuICAgIGlmICgnZ2VuZXJhdGVDZXJ0aWZpY2F0ZScgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uKSB7XHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24sICdnZW5lcmF0ZUNlcnRpZmljYXRlJywge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZXR1cm4gT3JpZ1BlZXJDb25uZWN0aW9uLmdlbmVyYXRlQ2VydGlmaWNhdGU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIHNoaW1UcmFja0V2ZW50VHJhbnNjZWl2ZXI6IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgLy8gQWRkIGV2ZW50LnRyYW5zY2VpdmVyIG1lbWJlciBvdmVyIGRlcHJlY2F0ZWQgZXZlbnQucmVjZWl2ZXJcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gJiZcclxuICAgICAgICAoJ3JlY2VpdmVyJyBpbiB3aW5kb3cuUlRDVHJhY2tFdmVudC5wcm90b3R5cGUpICYmXHJcbiAgICAgICAgLy8gY2FuJ3QgY2hlY2sgJ3RyYW5zY2VpdmVyJyBpbiB3aW5kb3cuUlRDVHJhY2tFdmVudC5wcm90b3R5cGUsIGFzIGl0IGlzXHJcbiAgICAgICAgLy8gZGVmaW5lZCBmb3Igc29tZSByZWFzb24gZXZlbiB3aGVuIHdpbmRvdy5SVENUcmFuc2NlaXZlciBpcyBub3QuXHJcbiAgICAgICAgIXdpbmRvdy5SVENUcmFuc2NlaXZlcikge1xyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1RyYWNrRXZlbnQucHJvdG90eXBlLCAndHJhbnNjZWl2ZXInLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHJldHVybiB7cmVjZWl2ZXI6IHRoaXMucmVjZWl2ZXJ9O1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgc2hpbUNyZWF0ZU9mZmVyTGVnYWN5OiBmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIHZhciBvcmlnQ3JlYXRlT2ZmZXIgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmNyZWF0ZU9mZmVyO1xyXG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5jcmVhdGVPZmZlciA9IGZ1bmN0aW9uKG9mZmVyT3B0aW9ucykge1xyXG4gICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICBpZiAob2ZmZXJPcHRpb25zKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgIC8vIHN1cHBvcnQgYml0IHZhbHVlc1xyXG4gICAgICAgICAgb2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW8gPSAhIW9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZUF1ZGlvO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgYXVkaW9UcmFuc2NlaXZlciA9IHBjLmdldFRyYW5zY2VpdmVycygpLmZpbmQoZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcclxuICAgICAgICAgIHJldHVybiB0cmFuc2NlaXZlci5zZW5kZXIudHJhY2sgJiZcclxuICAgICAgICAgICAgICB0cmFuc2NlaXZlci5zZW5kZXIudHJhY2sua2luZCA9PT0gJ2F1ZGlvJztcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW8gPT09IGZhbHNlICYmIGF1ZGlvVHJhbnNjZWl2ZXIpIHtcclxuICAgICAgICAgIGlmIChhdWRpb1RyYW5zY2VpdmVyLmRpcmVjdGlvbiA9PT0gJ3NlbmRyZWN2Jykge1xyXG4gICAgICAgICAgICBpZiAoYXVkaW9UcmFuc2NlaXZlci5zZXREaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgICBhdWRpb1RyYW5zY2VpdmVyLnNldERpcmVjdGlvbignc2VuZG9ubHknKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBhdWRpb1RyYW5zY2VpdmVyLmRpcmVjdGlvbiA9ICdzZW5kb25seSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAoYXVkaW9UcmFuc2NlaXZlci5kaXJlY3Rpb24gPT09ICdyZWN2b25seScpIHtcclxuICAgICAgICAgICAgaWYgKGF1ZGlvVHJhbnNjZWl2ZXIuc2V0RGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgYXVkaW9UcmFuc2NlaXZlci5zZXREaXJlY3Rpb24oJ2luYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgYXVkaW9UcmFuc2NlaXZlci5kaXJlY3Rpb24gPSAnaW5hY3RpdmUnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbyA9PT0gdHJ1ZSAmJlxyXG4gICAgICAgICAgICAhYXVkaW9UcmFuc2NlaXZlcikge1xyXG4gICAgICAgICAgcGMuYWRkVHJhbnNjZWl2ZXIoJ2F1ZGlvJyk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgIC8vIHN1cHBvcnQgYml0IHZhbHVlc1xyXG4gICAgICAgICAgb2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlVmlkZW8gPSAhIW9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgdmlkZW9UcmFuc2NlaXZlciA9IHBjLmdldFRyYW5zY2VpdmVycygpLmZpbmQoZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcclxuICAgICAgICAgIHJldHVybiB0cmFuc2NlaXZlci5zZW5kZXIudHJhY2sgJiZcclxuICAgICAgICAgICAgICB0cmFuc2NlaXZlci5zZW5kZXIudHJhY2sua2luZCA9PT0gJ3ZpZGVvJztcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlVmlkZW8gPT09IGZhbHNlICYmIHZpZGVvVHJhbnNjZWl2ZXIpIHtcclxuICAgICAgICAgIGlmICh2aWRlb1RyYW5zY2VpdmVyLmRpcmVjdGlvbiA9PT0gJ3NlbmRyZWN2Jykge1xyXG4gICAgICAgICAgICB2aWRlb1RyYW5zY2VpdmVyLnNldERpcmVjdGlvbignc2VuZG9ubHknKTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAodmlkZW9UcmFuc2NlaXZlci5kaXJlY3Rpb24gPT09ICdyZWN2b25seScpIHtcclxuICAgICAgICAgICAgdmlkZW9UcmFuc2NlaXZlci5zZXREaXJlY3Rpb24oJ2luYWN0aXZlJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVWaWRlbyA9PT0gdHJ1ZSAmJlxyXG4gICAgICAgICAgICAhdmlkZW9UcmFuc2NlaXZlcikge1xyXG4gICAgICAgICAgcGMuYWRkVHJhbnNjZWl2ZXIoJ3ZpZGVvJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBvcmlnQ3JlYXRlT2ZmZXIuYXBwbHkocGMsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xyXG4gIH1cclxufTtcclxuXHJcbn0se1wiLi4vdXRpbHNcIjoxM31dLDEzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuLypcclxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcclxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxyXG4gKiAgdHJlZS5cclxuICovXHJcbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIGxvZ0Rpc2FibGVkXyA9IHRydWU7XHJcbnZhciBkZXByZWNhdGlvbldhcm5pbmdzXyA9IHRydWU7XHJcblxyXG4vKipcclxuICogRXh0cmFjdCBicm93c2VyIHZlcnNpb24gb3V0IG9mIHRoZSBwcm92aWRlZCB1c2VyIGFnZW50IHN0cmluZy5cclxuICpcclxuICogQHBhcmFtIHshc3RyaW5nfSB1YXN0cmluZyB1c2VyQWdlbnQgc3RyaW5nLlxyXG4gKiBAcGFyYW0geyFzdHJpbmd9IGV4cHIgUmVndWxhciBleHByZXNzaW9uIHVzZWQgYXMgbWF0Y2ggY3JpdGVyaWEuXHJcbiAqIEBwYXJhbSB7IW51bWJlcn0gcG9zIHBvc2l0aW9uIGluIHRoZSB2ZXJzaW9uIHN0cmluZyB0byBiZSByZXR1cm5lZC5cclxuICogQHJldHVybiB7IW51bWJlcn0gYnJvd3NlciB2ZXJzaW9uLlxyXG4gKi9cclxuZnVuY3Rpb24gZXh0cmFjdFZlcnNpb24odWFzdHJpbmcsIGV4cHIsIHBvcykge1xyXG4gIHZhciBtYXRjaCA9IHVhc3RyaW5nLm1hdGNoKGV4cHIpO1xyXG4gIHJldHVybiBtYXRjaCAmJiBtYXRjaC5sZW5ndGggPj0gcG9zICYmIHBhcnNlSW50KG1hdGNoW3Bvc10sIDEwKTtcclxufVxyXG5cclxuLy8gV3JhcHMgdGhlIHBlZXJjb25uZWN0aW9uIGV2ZW50IGV2ZW50TmFtZVRvV3JhcCBpbiBhIGZ1bmN0aW9uXHJcbi8vIHdoaWNoIHJldHVybnMgdGhlIG1vZGlmaWVkIGV2ZW50IG9iamVjdC5cclxuZnVuY3Rpb24gd3JhcFBlZXJDb25uZWN0aW9uRXZlbnQod2luZG93LCBldmVudE5hbWVUb1dyYXAsIHdyYXBwZXIpIHtcclxuICBpZiAoIXdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbikge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICB2YXIgcHJvdG8gPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlO1xyXG4gIHZhciBuYXRpdmVBZGRFdmVudExpc3RlbmVyID0gcHJvdG8uYWRkRXZlbnRMaXN0ZW5lcjtcclxuICBwcm90by5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24obmF0aXZlRXZlbnROYW1lLCBjYikge1xyXG4gICAgaWYgKG5hdGl2ZUV2ZW50TmFtZSAhPT0gZXZlbnROYW1lVG9XcmFwKSB7XHJcbiAgICAgIHJldHVybiBuYXRpdmVBZGRFdmVudExpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcbiAgICB2YXIgd3JhcHBlZENhbGxiYWNrID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICBjYih3cmFwcGVyKGUpKTtcclxuICAgIH07XHJcbiAgICB0aGlzLl9ldmVudE1hcCA9IHRoaXMuX2V2ZW50TWFwIHx8IHt9O1xyXG4gICAgdGhpcy5fZXZlbnRNYXBbY2JdID0gd3JhcHBlZENhbGxiYWNrO1xyXG4gICAgcmV0dXJuIG5hdGl2ZUFkZEV2ZW50TGlzdGVuZXIuYXBwbHkodGhpcywgW25hdGl2ZUV2ZW50TmFtZSxcclxuICAgICAgd3JhcHBlZENhbGxiYWNrXSk7XHJcbiAgfTtcclxuXHJcbiAgdmFyIG5hdGl2ZVJlbW92ZUV2ZW50TGlzdGVuZXIgPSBwcm90by5yZW1vdmVFdmVudExpc3RlbmVyO1xyXG4gIHByb3RvLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihuYXRpdmVFdmVudE5hbWUsIGNiKSB7XHJcbiAgICBpZiAobmF0aXZlRXZlbnROYW1lICE9PSBldmVudE5hbWVUb1dyYXAgfHwgIXRoaXMuX2V2ZW50TWFwXHJcbiAgICAgICAgfHwgIXRoaXMuX2V2ZW50TWFwW2NiXSkge1xyXG4gICAgICByZXR1cm4gbmF0aXZlUmVtb3ZlRXZlbnRMaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgfVxyXG4gICAgdmFyIHVud3JhcHBlZENiID0gdGhpcy5fZXZlbnRNYXBbY2JdO1xyXG4gICAgZGVsZXRlIHRoaXMuX2V2ZW50TWFwW2NiXTtcclxuICAgIHJldHVybiBuYXRpdmVSZW1vdmVFdmVudExpc3RlbmVyLmFwcGx5KHRoaXMsIFtuYXRpdmVFdmVudE5hbWUsXHJcbiAgICAgIHVud3JhcHBlZENiXSk7XHJcbiAgfTtcclxuXHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCAnb24nICsgZXZlbnROYW1lVG9XcmFwLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gdGhpc1snX29uJyArIGV2ZW50TmFtZVRvV3JhcF07XHJcbiAgICB9LFxyXG4gICAgc2V0OiBmdW5jdGlvbihjYikge1xyXG4gICAgICBpZiAodGhpc1snX29uJyArIGV2ZW50TmFtZVRvV3JhcF0pIHtcclxuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lVG9XcmFwLFxyXG4gICAgICAgICAgICB0aGlzWydfb24nICsgZXZlbnROYW1lVG9XcmFwXSk7XHJcbiAgICAgICAgZGVsZXRlIHRoaXNbJ19vbicgKyBldmVudE5hbWVUb1dyYXBdO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjYikge1xyXG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWVUb1dyYXAsXHJcbiAgICAgICAgICAgIHRoaXNbJ19vbicgKyBldmVudE5hbWVUb1dyYXBdID0gY2IpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8vIFV0aWxpdHkgbWV0aG9kcy5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgZXh0cmFjdFZlcnNpb246IGV4dHJhY3RWZXJzaW9uLFxyXG4gIHdyYXBQZWVyQ29ubmVjdGlvbkV2ZW50OiB3cmFwUGVlckNvbm5lY3Rpb25FdmVudCxcclxuICBkaXNhYmxlTG9nOiBmdW5jdGlvbihib29sKSB7XHJcbiAgICBpZiAodHlwZW9mIGJvb2wgIT09ICdib29sZWFuJykge1xyXG4gICAgICByZXR1cm4gbmV3IEVycm9yKCdBcmd1bWVudCB0eXBlOiAnICsgdHlwZW9mIGJvb2wgK1xyXG4gICAgICAgICAgJy4gUGxlYXNlIHVzZSBhIGJvb2xlYW4uJyk7XHJcbiAgICB9XHJcbiAgICBsb2dEaXNhYmxlZF8gPSBib29sO1xyXG4gICAgcmV0dXJuIChib29sKSA/ICdhZGFwdGVyLmpzIGxvZ2dpbmcgZGlzYWJsZWQnIDpcclxuICAgICAgICAnYWRhcHRlci5qcyBsb2dnaW5nIGVuYWJsZWQnO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIERpc2FibGUgb3IgZW5hYmxlIGRlcHJlY2F0aW9uIHdhcm5pbmdzXHJcbiAgICogQHBhcmFtIHshYm9vbGVhbn0gYm9vbCBzZXQgdG8gdHJ1ZSB0byBkaXNhYmxlIHdhcm5pbmdzLlxyXG4gICAqL1xyXG4gIGRpc2FibGVXYXJuaW5nczogZnVuY3Rpb24oYm9vbCkge1xyXG4gICAgaWYgKHR5cGVvZiBib29sICE9PSAnYm9vbGVhbicpIHtcclxuICAgICAgcmV0dXJuIG5ldyBFcnJvcignQXJndW1lbnQgdHlwZTogJyArIHR5cGVvZiBib29sICtcclxuICAgICAgICAgICcuIFBsZWFzZSB1c2UgYSBib29sZWFuLicpO1xyXG4gICAgfVxyXG4gICAgZGVwcmVjYXRpb25XYXJuaW5nc18gPSAhYm9vbDtcclxuICAgIHJldHVybiAnYWRhcHRlci5qcyBkZXByZWNhdGlvbiB3YXJuaW5ncyAnICsgKGJvb2wgPyAnZGlzYWJsZWQnIDogJ2VuYWJsZWQnKTtcclxuICB9LFxyXG5cclxuICBsb2c6IGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGlmIChsb2dEaXNhYmxlZF8pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgY29uc29sZS5sb2cgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogU2hvd3MgYSBkZXByZWNhdGlvbiB3YXJuaW5nIHN1Z2dlc3RpbmcgdGhlIG1vZGVybiBhbmQgc3BlYy1jb21wYXRpYmxlIEFQSS5cclxuICAgKi9cclxuICBkZXByZWNhdGVkOiBmdW5jdGlvbihvbGRNZXRob2QsIG5ld01ldGhvZCkge1xyXG4gICAgaWYgKCFkZXByZWNhdGlvbldhcm5pbmdzXykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLndhcm4ob2xkTWV0aG9kICsgJyBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlICcgKyBuZXdNZXRob2QgK1xyXG4gICAgICAgICcgaW5zdGVhZC4nKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBCcm93c2VyIGRldGVjdG9yLlxyXG4gICAqXHJcbiAgICogQHJldHVybiB7b2JqZWN0fSByZXN1bHQgY29udGFpbmluZyBicm93c2VyIGFuZCB2ZXJzaW9uXHJcbiAgICogICAgIHByb3BlcnRpZXMuXHJcbiAgICovXHJcbiAgZGV0ZWN0QnJvd3NlcjogZnVuY3Rpb24od2luZG93KSB7XHJcbiAgICB2YXIgbmF2aWdhdG9yID0gd2luZG93ICYmIHdpbmRvdy5uYXZpZ2F0b3I7XHJcblxyXG4gICAgLy8gUmV0dXJuZWQgcmVzdWx0IG9iamVjdC5cclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIHJlc3VsdC5icm93c2VyID0gbnVsbDtcclxuICAgIHJlc3VsdC52ZXJzaW9uID0gbnVsbDtcclxuXHJcbiAgICAvLyBGYWlsIGVhcmx5IGlmIGl0J3Mgbm90IGEgYnJvd3NlclxyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnIHx8ICF3aW5kb3cubmF2aWdhdG9yKSB7XHJcbiAgICAgIHJlc3VsdC5icm93c2VyID0gJ05vdCBhIGJyb3dzZXIuJztcclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobmF2aWdhdG9yLm1vekdldFVzZXJNZWRpYSkgeyAvLyBGaXJlZm94LlxyXG4gICAgICByZXN1bHQuYnJvd3NlciA9ICdmaXJlZm94JztcclxuICAgICAgcmVzdWx0LnZlcnNpb24gPSBleHRyYWN0VmVyc2lvbihuYXZpZ2F0b3IudXNlckFnZW50LFxyXG4gICAgICAgICAgL0ZpcmVmb3hcXC8oXFxkKylcXC4vLCAxKTtcclxuICAgIH0gZWxzZSBpZiAobmF2aWdhdG9yLndlYmtpdEdldFVzZXJNZWRpYSkge1xyXG4gICAgICAvLyBDaHJvbWUsIENocm9taXVtLCBXZWJ2aWV3LCBPcGVyYS5cclxuICAgICAgLy8gVmVyc2lvbiBtYXRjaGVzIENocm9tZS9XZWJSVEMgdmVyc2lvbi5cclxuICAgICAgcmVzdWx0LmJyb3dzZXIgPSAnY2hyb21lJztcclxuICAgICAgcmVzdWx0LnZlcnNpb24gPSBleHRyYWN0VmVyc2lvbihuYXZpZ2F0b3IudXNlckFnZW50LFxyXG4gICAgICAgICAgL0Nocm9tKGV8aXVtKVxcLyhcXGQrKVxcLi8sIDIpO1xyXG4gICAgfSBlbHNlIGlmIChuYXZpZ2F0b3IubWVkaWFEZXZpY2VzICYmXHJcbiAgICAgICAgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvRWRnZVxcLyhcXGQrKS4oXFxkKykkLykpIHsgLy8gRWRnZS5cclxuICAgICAgcmVzdWx0LmJyb3dzZXIgPSAnZWRnZSc7XHJcbiAgICAgIHJlc3VsdC52ZXJzaW9uID0gZXh0cmFjdFZlcnNpb24obmF2aWdhdG9yLnVzZXJBZ2VudCxcclxuICAgICAgICAgIC9FZGdlXFwvKFxcZCspLihcXGQrKSQvLCAyKTtcclxuICAgIH0gZWxzZSBpZiAod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uICYmXHJcbiAgICAgICAgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQXBwbGVXZWJLaXRcXC8oXFxkKylcXC4vKSkgeyAvLyBTYWZhcmkuXHJcbiAgICAgIHJlc3VsdC5icm93c2VyID0gJ3NhZmFyaSc7XHJcbiAgICAgIHJlc3VsdC52ZXJzaW9uID0gZXh0cmFjdFZlcnNpb24obmF2aWdhdG9yLnVzZXJBZ2VudCxcclxuICAgICAgICAgIC9BcHBsZVdlYktpdFxcLyhcXGQrKVxcLi8sIDEpO1xyXG4gICAgfSBlbHNlIHsgLy8gRGVmYXVsdCBmYWxsdGhyb3VnaDogbm90IHN1cHBvcnRlZC5cclxuICAgICAgcmVzdWx0LmJyb3dzZXIgPSAnTm90IGEgc3VwcG9ydGVkIGJyb3dzZXIuJztcclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxufTtcclxuXHJcbn0se31dfSx7fSxbM10pKDMpXHJcbn0pOyJdLCJzb3VyY2VSb290IjoiIn0=