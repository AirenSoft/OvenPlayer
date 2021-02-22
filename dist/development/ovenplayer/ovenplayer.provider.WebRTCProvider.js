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

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

var _browser = __webpack_require__(/*! utils/browser */ "./src/js/utils/browser.js");

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var WebRTCLoader = function WebRTCLoader(provider, webSocketUrl, loadCallback, errorTrigger, playerConfig) {

    var defaultConnectionConfig = {};

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

                var hasWebsocketUrl = false;
                var socketUrl = generateDomainFromUrl(webSocketUrl);

                for (var j = 0; j < regIceServer.urls.length; j++) {

                    var serverUrl = regIceServer.urls[j];

                    if (serverUrl.indexOf(socketUrl) > -1) {
                        hasWebsocketUrl = true;
                        break;
                    }
                }

                if (!hasWebsocketUrl) {

                    if (regIceServer.urls.length > 0) {

                        var cloneIceServer = _underscore2["default"].clone(regIceServer.urls[0]);
                        var ip = findIp(cloneIceServer);

                        if (socketUrl && ip) {
                            regIceServer.urls.push(cloneIceServer.replace(ip, socketUrl));
                        }
                    }
                }

                regIceServer.username = iceServer.user_name;
                regIceServer.credential = iceServer.credential;

                peerConnectionConfig.iceServers.push(regIceServer);
            }

            peerConnectionConfig.iceTransportPolicy = 'relay';
        } else {

            // last priority using default ice servers.
            peerConnectionConfig = defaultConnectionConfig;
        }

        OvenPlayerConsole.log("Main Peer Connection Config : ", peerConnectionConfig);

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

                OvenPlayerConsole.log("WebRTCLoader send candidate to server : ", e.candidate);

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

    function generateDomainFromUrl(url) {
        var result = '';
        var match = void 0;
        if (match = url.match(/^(?:wss?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im)) {
            result = match[1];
        }

        return result;
    }

    function findIp(string) {

        var result = '';
        var match = void 0;

        if (match = string.match(new RegExp("\\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b", 'gi'))) {
            result = match[0];
        }

        return result;
    }

    function copyCandidate(basicCandidate) {

        var cloneCandidate = _underscore2["default"].clone(basicCandidate);

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

                            resolve(null);
                        }
                    } else {

                        resolve(null);
                    }
                });
            } else {

                cloneCandidate.candidate = cloneCandidate.candidate.replace(ip, newDomain);
                resolve(cloneCandidate);
            }
        });
    }

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

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9XZWJSVEMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvV2ViUlRDTG9hZGVyLmpzIl0sIm5hbWVzIjpbIldlYlJUQyIsImVsZW1lbnQiLCJwbGF5ZXJDb25maWciLCJhZFRhZ1VybCIsInRoYXQiLCJ3ZWJydGNMb2FkZXIiLCJzdXBlckRlc3Ryb3lfZnVuYyIsInNwZWMiLCJuYW1lIiwiUFJPVklERVJfV0VCUlRDIiwibXNlIiwibGlzdGVuZXIiLCJpc0xvYWRlZCIsImNhblNlZWsiLCJpc0xpdmUiLCJzZWVraW5nIiwic3RhdGUiLCJTVEFURV9JRExFIiwiYnVmZmVyIiwiZnJhbWVyYXRlIiwiY3VycmVudFF1YWxpdHkiLCJjdXJyZW50U291cmNlIiwicXVhbGl0eUxldmVscyIsInNvdXJjZXMiLCJzb3VyY2UiLCJmaWxlIiwidHlwZSIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwiZGVzdHJveSIsImxvYWRDYWxsYmFjayIsInN0cmVhbSIsInNyY09iamVjdCIsImVycm9yVHJpZ2dlciIsImNvbm5lY3QiLCJlcnJvciIsIm9uIiwiQ09OVEVOVF9NRVRBIiwiaXNBdXRvU3RhcnQiLCJvZmYiLCJXZWJSVENMb2FkZXIiLCJwcm92aWRlciIsIndlYlNvY2tldFVybCIsImRlZmF1bHRDb25uZWN0aW9uQ29uZmlnIiwid3MiLCJ3c1BpbmciLCJtYWluU3RyZWFtIiwibWFpblBlZXJDb25uZWN0aW9uSW5mbyIsImNsaWVudFBlZXJDb25uZWN0aW9ucyIsIndzQ2xvc2VkQnlQbGF5ZXIiLCJyZWNvcnZlclBhY2tldExvc3MiLCJnZXRDb25maWciLCJ3ZWJydGNDb25maWciLCJnZW5lcmF0ZVB1YmxpY0NhbmRpZGF0ZSIsInN0YXRpc3RpY3NUaW1lciIsImN1cnJlbnRCcm93c2VyIiwiZXhpc3RpbmdIYW5kbGVyIiwid2luZG93Iiwib25iZWZvcmV1bmxvYWQiLCJldmVudCIsImNsb3NlUGVlciIsImdldFBlZXJDb25uZWN0aW9uQnlJZCIsImlkIiwicGVlckNvbm5lY3Rpb24iLCJleHRyYWN0TG9zc1BhY2tldHNPbk5ldHdvcmtTdGF0dXMiLCJwZWVyQ29ubmVjdGlvbkluZm8iLCJjbGVhclRpbWVvdXQiLCJzdGF0dXMiLCJsb3N0UGFja2V0c0FyciIsInNsb3RMZW5ndGgiLCJwcmV2UGFja2V0c0xvc3QiLCJhdmc4TG9zc2VzIiwiYXZnTW9yZVRoYW5UaHJlc2hvbGRDb3VudCIsInRocmVzaG9sZCIsInNldFRpbWVvdXQiLCJnZXRTdGF0cyIsInRoZW4iLCJzdGF0cyIsImF1dG9GYWxsYmFjayIsImZvckVhY2giLCJraW5kIiwiaXNSZW1vdGUiLCJhY3R1YWxQYWNrZXRMb3N0IiwicGFyc2VJbnQiLCJwYWNrZXRzTG9zdCIsInB1c2giLCJsZW5ndGgiLCJzaGlmdCIsIl8iLCJyZWR1Y2UiLCJtZW1vIiwibnVtIiwidGVtcEVycm9yIiwiRVJST1JTIiwiY29kZXMiLCJQTEFZRVJfV0VCUlRDX05FVFdPUktfU0xPVyIsImNyZWF0ZU1haW5QZWVyQ29ubmVjdGlvbiIsInBlZXJJZCIsInNkcCIsImNhbmRpZGF0ZXMiLCJpY2VTZXJ2ZXJzIiwicmVzb2x2ZSIsInBlZXJDb25uZWN0aW9uQ29uZmlnIiwiaWNlVHJhbnNwb3J0UG9saWN5IiwiaSIsImljZVNlcnZlciIsInJlZ0ljZVNlcnZlciIsInVybHMiLCJoYXNXZWJzb2NrZXRVcmwiLCJzb2NrZXRVcmwiLCJnZW5lcmF0ZURvbWFpbkZyb21VcmwiLCJqIiwic2VydmVyVXJsIiwiaW5kZXhPZiIsImNsb25lSWNlU2VydmVyIiwiY2xvbmUiLCJpcCIsImZpbmRJcCIsInJlcGxhY2UiLCJ1c2VybmFtZSIsInVzZXJfbmFtZSIsImNyZWRlbnRpYWwiLCJSVENQZWVyQ29ubmVjdGlvbiIsInNldFJlbW90ZURlc2NyaXB0aW9uIiwiUlRDU2Vzc2lvbkRlc2NyaXB0aW9uIiwiY3JlYXRlQW5zd2VyIiwiZGVzYyIsInNldExvY2FsRGVzY3JpcHRpb24iLCJsb2NhbFNEUCIsImxvY2FsRGVzY3JpcHRpb24iLCJzZW5kTWVzc2FnZSIsInBlZXJfaWQiLCJjb21tYW5kIiwiUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUiIsIlBMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUiIsIlBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SIiwiYWRkSWNlQ2FuZGlkYXRlIiwib25pY2VjYW5kaWRhdGUiLCJlIiwiY2FuZGlkYXRlIiwib25jb25uZWN0aW9uc3RhdGVjaGFuZ2UiLCJjb25uZWN0aW9uU3RhdGUiLCJvbmljZWNvbm5lY3Rpb25zdGF0ZWNoYW5nZSIsImljZUNvbm5lY3Rpb25TdGF0ZSIsIlBMQVlFUl9XRUJSVENfVU5FWFBFQ1RFRF9ESVNDT05ORUNUIiwib250cmFjayIsInN0cmVhbXMiLCJwbGF5b3V0RGVsYXlIaW50IiwiaGludCIsInJlY2VpdmVycyIsImdldFJlY2VpdmVycyIsInJlY2VpdmVyIiwiY3JlYXRlQ2xpZW50UGVlckNvbm5lY3Rpb24iLCJob3N0SWQiLCJjbGllbnRJZCIsImFkZFN0cmVhbSIsImNyZWF0ZU9mZmVyIiwic2V0TG9jYWxBbmRTZW5kTWVzc2FnZSIsImhhbmRsZUNyZWF0ZU9mZmVyRXJyb3IiLCJzZXNzaW9uRGVzY3JpcHRpb24iLCJ1cmwiLCJyZXN1bHQiLCJtYXRjaCIsInN0cmluZyIsIlJlZ0V4cCIsImNvcHlDYW5kaWRhdGUiLCJiYXNpY0NhbmRpZGF0ZSIsImNsb25lQ2FuZGlkYXRlIiwibmV3RG9tYWluIiwiUHJvbWlzZSIsInJlamVjdCIsImJyb3dzZXIiLCJmZXRjaCIsInJlc3AiLCJqc29uIiwiZGF0YSIsIkFuc3dlciIsInJlbHNvbHZlZElwIiwiUlRDSWNlQ2FuZGlkYXRlIiwiUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SIiwiY2xvbmVDYW5kaWRhdGVQcm9taXNlIiwiaW5pdFdlYlNvY2tldCIsIldlYlNvY2tldCIsIm9ub3BlbiIsIm9ubWVzc2FnZSIsIm1lc3NhZ2UiLCJKU09OIiwicGFyc2UiLCJQTEFZRVJfV0VCUlRDX1dTX0VSUk9SIiwiT2JqZWN0Iiwia2V5cyIsImNvbnN0cnVjdG9yIiwiaWNlX3NlcnZlcnMiLCJ0cmlnZ2VyIiwiT01FX1AyUF9NT0RFIiwicGVlckNvbm5lY3Rpb24xIiwicGVlckNvbm5lY3Rpb24yIiwicGVlckNvbm5lY3Rpb24zIiwiY2xvc2UiLCJwYXVzZSIsIm9uY2xvc2UiLCJvbmVycm9yIiwiaW5pdGlhbGl6ZSIsImNsaWVudFBlZXJDb25uZWN0aW9uIiwiY2xlYXJJbnRlcnZhbCIsInJlYWR5U3RhdGUiLCJzZW5kIiwic3RyaW5naWZ5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBOzs7Ozs7QUFNQSxJQUFNQSxTQUFTLFNBQVRBLE1BQVMsQ0FBU0MsT0FBVCxFQUFrQkMsWUFBbEIsRUFBZ0NDLFFBQWhDLEVBQXlDO0FBQ3BELFFBQUlDLE9BQU8sRUFBWDtBQUNBLFFBQUlDLGVBQWUsSUFBbkI7QUFDQSxRQUFJQyxvQkFBcUIsSUFBekI7O0FBRUEsUUFBSUMsT0FBTztBQUNQQyxjQUFPQywwQkFEQTtBQUVQUixpQkFBVUEsT0FGSDtBQUdQUyxhQUFNLElBSEM7QUFJUEMsa0JBQVcsSUFKSjtBQUtQQyxrQkFBVyxLQUxKO0FBTVBDLGlCQUFVLEtBTkg7QUFPUEMsZ0JBQVMsS0FQRjtBQVFQQyxpQkFBVSxLQVJIO0FBU1BDLGVBQVFDLHFCQVREO0FBVVBDLGdCQUFTLENBVkY7QUFXUEMsbUJBQVksQ0FYTDtBQVlQQyx3QkFBaUIsQ0FBQyxDQVpYO0FBYVBDLHVCQUFnQixDQUFDLENBYlY7QUFjUEMsdUJBQWdCLEVBZFQ7QUFlUEMsaUJBQVUsRUFmSDtBQWdCUHBCLGtCQUFXQTtBQWhCSixLQUFYOztBQW1CQUMsV0FBTywyQkFBU0csSUFBVCxFQUFlTCxZQUFmLEVB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NkksT0FBekIsRUFBa0M7O0FBRTlCLFlBQUk3SSxFQUFKLEVBQVE7QUFDSkEsZUFBR2tLLElBQUgsQ0FBUXBCLEtBQUtxQixTQUFMLENBQWV0QixPQUFmLENBQVI7QUFDSDtBQUVKOztBQUVEckwsU0FBSzhCLE9BQUwsR0FBZSxZQUFNO0FBQ2pCLGVBQU93SyxZQUFQO0FBQ0gsS0FGRDs7QUFJQXRNLFNBQUt5QixPQUFMLEdBQWUsWUFBTTtBQUNqQitCO0FBQ0gsS0FGRDs7QUFJQSxXQUFPeEQsSUFBUDtBQUNILENBendCRDs7cUJBMndCZW9DLFkiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5XZWJSVENQcm92aWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gMTEuLlxyXG4gKi9cclxuaW1wb3J0IFByb3ZpZGVyIGZyb20gXCJhcGkvcHJvdmlkZXIvaHRtbDUvUHJvdmlkZXJcIjtcclxuaW1wb3J0IFdlYlJUQ0xvYWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9XZWJSVENMb2FkZXJcIjtcclxuaW1wb3J0IHtpc1dlYlJUQ30gZnJvbSBcInV0aWxzL3ZhbGlkYXRvclwiO1xyXG5pbXBvcnQge2Vycm9yVHJpZ2dlcn0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xyXG5pbXBvcnQge1BST1ZJREVSX1dFQlJUQywgU1RBVEVfSURMRSwgQ09OVEVOVF9NRVRBLCBTVEFURV9QTEFZSU5HfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIHdlYnJ0YyBwcm92aWRlciBleHRlbmRlZCBjb3JlLlxyXG4gKiBAcGFyYW0gICBjb250YWluZXIgcGxheWVyIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXHJcbiAqICovXHJcblxyXG5jb25zdCBXZWJSVEMgPSBmdW5jdGlvbihlbGVtZW50LCBwbGF5ZXJDb25maWcsIGFkVGFnVXJsKXtcclxuICAgIGxldCB0aGF0ID0ge307XHJcbiAgICBsZXQgd2VicnRjTG9hZGVyID0gbnVsbDtcclxuICAgIGxldCBzdXBlckRlc3Ryb3lfZnVuYyAgPSBudWxsO1xyXG5cclxuICAgIGxldCBzcGVjID0ge1xyXG4gICAgICAgIG5hbWUgOiBQUk9WSURFUl9XRUJSVEMsXHJcbiAgICAgICAgZWxlbWVudCA6IGVsZW1lbnQsXHJcbiAgICAgICAgbXNlIDogbnVsbCxcclxuICAgICAgICBsaXN0ZW5lciA6IG51bGwsXHJcbiAgICAgICAgaXNMb2FkZWQgOiBmYWxzZSxcclxuICAgICAgICBjYW5TZWVrIDogZmFsc2UsXHJcbiAgICAgICAgaXNMaXZlIDogZmFsc2UsXHJcbiAgICAgICAgc2Vla2luZyA6IGZhbHNlLFxyXG4gICAgICAgIHN0YXRlIDogU1RBVEVfSURMRSxcclxuICAgICAgICBidWZmZXIgOiAwLFxyXG4gICAgICAgIGZyYW1lcmF0ZSA6IDAsXHJcbiAgICAgICAgY3VycmVudFF1YWxpdHkgOiAtMSxcclxuICAgICAgICBjdXJyZW50U291cmNlIDogLTEsXHJcbiAgICAgICAgcXVhbGl0eUxldmVscyA6IFtdLFxyXG4gICAgICAgIHNvdXJjZXMgOiBbXSxcclxuICAgICAgICBhZFRhZ1VybCA6IGFkVGFnVXJsXHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQgPSBQcm92aWRlcihzcGVjLCBwbGF5ZXJDb25maWcsIGZ1bmN0aW9uKHNvdXJjZSl7XHJcbiAgICAgICAgaWYoaXNXZWJSVEMoc291cmNlLmZpbGUsIHNvdXJjZS50eXBlKSl7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldFQlJUQyA6IG9uQmVmb3JlTG9hZCA6IFwiLCBzb3VyY2UpO1xyXG4gICAgICAgICAgICBpZih3ZWJydGNMb2FkZXIpe1xyXG4gICAgICAgICAgICAgICAgd2VicnRjTG9hZGVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIHdlYnJ0Y0xvYWRlciA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBsb2FkQ2FsbGJhY2sgPSBmdW5jdGlvbihzdHJlYW0pe1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LnNyY09iamVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc3JjT2JqZWN0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnNyY09iamVjdCA9IHN0cmVhbTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHdlYnJ0Y0xvYWRlciA9IFdlYlJUQ0xvYWRlcih0aGF0LCBzb3VyY2UuZmlsZSwgbG9hZENhbGxiYWNrLCBlcnJvclRyaWdnZXIsIHBsYXllckNvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICB3ZWJydGNMb2FkZXIuY29ubmVjdChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgLy9Ub0RvIDogcmVzb2x2ZSBub3Qgd29ya3JpbmdcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgLy90aGF0LmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIC8vRG8gbm90aGluZ1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoYXQub24oQ09OVEVOVF9NRVRBLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgaWYocGxheWVyQ29uZmlnLmlzQXV0b1N0YXJ0KCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmICh0aGF0LmdldFN0YXRlKCkgIT09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGhhdC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCB0aGF0KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHN1cGVyRGVzdHJveV9mdW5jID0gdGhhdC5zdXBlcignZGVzdHJveScpO1xyXG5cclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldFQlJUQyBQUk9WSURFUiBMT0FERUQuXCIpO1xyXG5cclxuXHJcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcclxuICAgICAgICBpZih3ZWJydGNMb2FkZXIpe1xyXG4gICAgICAgICAgICB3ZWJydGNMb2FkZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICBlbGVtZW50LnNyY09iamVjdCA9IG51bGw7XHJcbiAgICAgICAgICAgIHdlYnJ0Y0xvYWRlciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoYXQub2ZmKENPTlRFTlRfTUVUQSwgbnVsbCwgdGhhdCk7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiV0VCUlRDIDogIFBST1ZJREVSIERFU1RST1lFRC5cIik7XHJcblxyXG4gICAgICAgIHN1cGVyRGVzdHJveV9mdW5jKCk7XHJcblxyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFdlYlJUQztcclxuIiwiaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcclxuaW1wb3J0IHthbmFsVXNlckFnZW50fSBmcm9tIFwidXRpbHMvYnJvd3NlclwiO1xyXG5pbXBvcnQge1xyXG4gICAgRVJST1JTLFxyXG4gICAgUExBWUVSX1dFQlJUQ19XU19FUlJPUixcclxuICAgIFBMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUixcclxuICAgIFBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SLFxyXG4gICAgUExBWUVSX1dFQlJUQ19DUkVBVEVfQU5TV0VSX0VSUk9SLFxyXG4gICAgUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUixcclxuICAgIFBMQVlFUl9XRUJSVENfTkVUV09SS19TTE9XLFxyXG4gICAgUExBWUVSX1dFQlJUQ19VTkVYUEVDVEVEX0RJU0NPTk5FQ1QsXHJcbiAgICBPTUVfUDJQX01PREVcclxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuXHJcbmNvbnN0IFdlYlJUQ0xvYWRlciA9IGZ1bmN0aW9uIChwcm92aWRlciwgd2ViU29ja2V0VXJsLCBsb2FkQ2FsbGJhY2ssIGVycm9yVHJpZ2dlciwgcGxheWVyQ29uZmlnKSB7XHJcblxyXG4gICAgbGV0IGRlZmF1bHRDb25uZWN0aW9uQ29uZmlnID0ge307XHJcblxyXG4gICAgbGV0IHRoYXQgPSB7fTtcclxuXHJcbiAgICBsZXQgd3MgPSBudWxsO1xyXG5cclxuICAgIGxldCB3c1BpbmcgPSBudWxsO1xyXG5cclxuICAgIGxldCBtYWluU3RyZWFtID0gbnVsbDtcclxuXHJcbiAgICAvLyB1c2VkIGZvciBnZXR0aW5nIG1lZGlhIHN0cmVhbSBmcm9tIE9NRSBvciBob3N0IHBlZXJcclxuICAgIGxldCBtYWluUGVlckNvbm5lY3Rpb25JbmZvID0gbnVsbDtcclxuXHJcbiAgICAvLyB1c2VkIGZvciBzZW5kIG1lZGlhIHN0cmVhbSB0byBjbGllbnQgcGVlci5cclxuICAgIGxldCBjbGllbnRQZWVyQ29ubmVjdGlvbnMgPSB7fTtcclxuXHJcbiAgICAvL2Nsb3NlZCB3ZWJzb2NrZXQgYnkgb21lIG9yIGNsaWVudC5cclxuICAgIGxldCB3c0Nsb3NlZEJ5UGxheWVyID0gZmFsc2U7XHJcblxyXG4gICAgbGV0IHJlY29ydmVyUGFja2V0TG9zcyA9IHRydWU7XHJcblxyXG4gICAgaWYgKHBsYXllckNvbmZpZy5nZXRDb25maWcoKS53ZWJydGNDb25maWcgJiZcclxuICAgICAgICBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkud2VicnRjQ29uZmlnLnJlY29ydmVyUGFja2V0TG9zcyA9PT0gZmFsc2UpIHtcclxuXHJcbiAgICAgICAgcmVjb3J2ZXJQYWNrZXRMb3NzID0gcGxheWVyQ29uZmlnLmdldENvbmZpZygpLndlYnJ0Y0NvbmZpZy5yZWNvcnZlclBhY2tldExvc3M7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGdlbmVyYXRlUHVibGljQ2FuZGlkYXRlID0gdHJ1ZTtcclxuXHJcbiAgICBpZiAocGxheWVyQ29uZmlnLmdldENvbmZpZygpLndlYnJ0Y0NvbmZpZyAmJlxyXG4gICAgICAgIHBsYXllckNvbmZpZy5nZXRDb25maWcoKS53ZWJydGNDb25maWcuZ2VuZXJhdGVQdWJsaWNDYW5kaWRhdGUgPT09IGZhbHNlKSB7XHJcblxyXG4gICAgICAgIGdlbmVyYXRlUHVibGljQ2FuZGlkYXRlID0gcGxheWVyQ29uZmlnLmdldENvbmZpZygpLndlYnJ0Y0NvbmZpZy5nZW5lcmF0ZVB1YmxpY0NhbmRpZGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgc3RhdGlzdGljc1RpbWVyID0gbnVsbDtcclxuXHJcbiAgICBsZXQgY3VycmVudEJyb3dzZXIgPSBhbmFsVXNlckFnZW50KCk7XHJcblxyXG4gICAgKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgZXhpc3RpbmdIYW5kbGVyID0gd2luZG93Lm9uYmVmb3JldW5sb2FkO1xyXG4gICAgICAgIHdpbmRvdy5vbmJlZm9yZXVubG9hZCA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdIYW5kbGVyKSB7XHJcbiAgICAgICAgICAgICAgICBleGlzdGluZ0hhbmRsZXIoZXZlbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlRoaXMgY2FsbHMgYXV0byB3aGVuIGJyb3dzZXIgY2xvc2VkLlwiKTtcclxuICAgICAgICAgICAgY2xvc2VQZWVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSkoKTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRQZWVyQ29ubmVjdGlvbkJ5SWQoaWQpIHtcclxuXHJcbiAgICAgICAgbGV0IHBlZXJDb25uZWN0aW9uID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKG1haW5QZWVyQ29ubmVjdGlvbkluZm8gJiYgaWQgPT09IG1haW5QZWVyQ29ubmVjdGlvbkluZm8uaWQpIHtcclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24gPSBtYWluUGVlckNvbm5lY3Rpb25JbmZvLnBlZXJDb25uZWN0aW9uO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY2xpZW50UGVlckNvbm5lY3Rpb25zW2lkXSkge1xyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbiA9IGNsaWVudFBlZXJDb25uZWN0aW9uc1tpZF0ucGVlckNvbm5lY3Rpb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcGVlckNvbm5lY3Rpb247XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZXh0cmFjdExvc3NQYWNrZXRzT25OZXR3b3JrU3RhdHVzKHBlZXJDb25uZWN0aW9uSW5mbykge1xyXG5cclxuICAgICAgICBpZiAocGVlckNvbm5lY3Rpb25JbmZvLnN0YXRpc3RpY3NUaW1lcikge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQocGVlckNvbm5lY3Rpb25JbmZvLnN0YXRpc3RpY3NUaW1lcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMpIHtcclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cyA9IHt9O1xyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLmxvc3RQYWNrZXRzQXJyID0gW107XHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMuc2xvdExlbmd0aCA9IDg7IC8vOCBzdGF0aXN0aWNzLiBldmVyeSAyIHNlY29uZHNcclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5wcmV2UGFja2V0c0xvc3QgPSAwO1xyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLmF2ZzhMb3NzZXMgPSAwO1xyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLmF2Z01vcmVUaGFuVGhyZXNob2xkQ291bnQgPSAwOyAgLy9JZiBhdmc4TG9zcyBtb3JlIHRoYW4gdGhyZXNob2xkLlxyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLnRocmVzaG9sZCA9IDQwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGxvc3RQYWNrZXRzQXJyID0gcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5sb3N0UGFja2V0c0FycixcclxuICAgICAgICAgICAgc2xvdExlbmd0aCA9IHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMuc2xvdExlbmd0aCwgLy84IHN0YXRpc3RpY3MuIGV2ZXJ5IDIgc2Vjb25kc1xyXG4gICAgICAgICAgICBwcmV2UGFja2V0c0xvc3QgPSBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLnByZXZQYWNrZXRzTG9zdCxcclxuICAgICAgICAgICAgYXZnOExvc3NlcyA9IHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMuYXZnOExvc3NlcyxcclxuICAgICAgICAgICAgLy8gYXZnTW9yZVRoYW5UaHJlc2hvbGRDb3VudCA9IHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMuYXZnTW9yZVRoYW5UaHJlc2hvbGRDb3VudCwgIC8vSWYgYXZnOExvc3MgbW9yZSB0aGFuIHRocmVzaG9sZC5cclxuICAgICAgICAgICAgdGhyZXNob2xkID0gcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy50aHJlc2hvbGQ7XHJcblxyXG4gICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5zdGF0aXN0aWNzVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCFwZWVyQ29ubmVjdGlvbkluZm8ucGVlckNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnBlZXJDb25uZWN0aW9uLmdldFN0YXRzKCkudGhlbihmdW5jdGlvbiAoc3RhdHMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXN0YXRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkuYXV0b0ZhbGxiYWNrICYmIHN0YXRzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRzLmZvckVhY2goZnVuY3Rpb24gKHN0YXRlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdGUudHlwZSA9PT0gXCJpbmJvdW5kLXJ0cFwiICYmIHN0YXRlLmtpbmQgPT09ICd2aWRlbycgJiYgIXN0YXRlLmlzUmVtb3RlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8oc3RhdGUucGFja2V0c0xvc3QgLSBwcmV2UGFja2V0c0xvc3QpIGlzIHJlYWwgY3VycmVudCBsb3N0LlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhY3R1YWxQYWNrZXRMb3N0ID0gcGFyc2VJbnQoc3RhdGUucGFja2V0c0xvc3QpIC0gcGFyc2VJbnQocHJldlBhY2tldHNMb3N0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb3N0UGFja2V0c0Fyci5wdXNoKHBhcnNlSW50KHN0YXRlLnBhY2tldHNMb3N0KSAtIHBhcnNlSW50KHByZXZQYWNrZXRzTG9zdCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb3N0UGFja2V0c0Fyci5sZW5ndGggPiBzbG90TGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvc3RQYWNrZXRzQXJyLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvc3RQYWNrZXRzQXJyLmxlbmd0aCA9PT0gc2xvdExlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdmc4TG9zc2VzID0gXy5yZWR1Y2UobG9zdFBhY2tldHNBcnIsIGZ1bmN0aW9uIChtZW1vLCBudW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1lbW8gKyBudW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMCkgLyBzbG90TGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhc3Q4IExPU1QgUEFDS0VUIEFWRyAgOiBcIiArIChhdmc4TG9zc2VzKSwgXCJDdXJyZW50IFBhY2tldCBMT1NUOiBcIiArIGFjdHVhbFBhY2tldExvc3QsIFwiVG90YWwgUGFja2V0IExvc3Q6IFwiICsgc3RhdGUucGFja2V0c0xvc3QsIGxvc3RQYWNrZXRzQXJyKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF2ZzhMb3NzZXMgPiB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5hdmdNb3JlVGhhblRocmVzaG9sZENvdW50ID0gcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5hdmdNb3JlVGhhblRocmVzaG9sZENvdW50ICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMuYXZnTW9yZVRoYW5UaHJlc2hvbGRDb3VudCA+PSA2MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTkVUV09SSyBVTlNUQUJMRUQhISEgXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfV0VCUlRDX05FVFdPUktfU0xPV107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMuYXZnTW9yZVRoYW5UaHJlc2hvbGRDb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5wcmV2UGFja2V0c0xvc3QgPSBzdGF0ZS5wYWNrZXRzTG9zdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBleHRyYWN0TG9zc1BhY2tldHNPbk5ldHdvcmtTdGF0dXMocGVlckNvbm5lY3Rpb25JbmZvKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sIDIwMDApO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVNYWluUGVlckNvbm5lY3Rpb24oaWQsIHBlZXJJZCwgc2RwLCBjYW5kaWRhdGVzLCBpY2VTZXJ2ZXJzLCByZXNvbHZlKSB7XHJcblxyXG4gICAgICAgIGxldCBwZWVyQ29ubmVjdGlvbkNvbmZpZyA9IHt9O1xyXG5cclxuICAgICAgICAvLyBmaXJzdCBwcmlvcml0eSB1c2luZyBpY2Ugc2VydmVycyBmcm9tIHBsYXllciBzZXR0aW5nLlxyXG4gICAgICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkud2VicnRjQ29uZmlnICYmIHBsYXllckNvbmZpZy5nZXRDb25maWcoKS53ZWJydGNDb25maWcuaWNlU2VydmVycykge1xyXG5cclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25Db25maWcuaWNlU2VydmVycyA9IHBsYXllckNvbmZpZy5nZXRDb25maWcoKS53ZWJydGNDb25maWcuaWNlU2VydmVycztcclxuXHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkud2VicnRjQ29uZmlnLmljZVRyYW5zcG9ydFBvbGljeSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uQ29uZmlnLmljZVRyYW5zcG9ydFBvbGljeSA9IHBsYXllckNvbmZpZy5nZXRDb25maWcoKS53ZWJydGNDb25maWcuaWNlVHJhbnNwb3J0UG9saWN5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChpY2VTZXJ2ZXJzKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBzZWNvbmQgcHJpb3JpdHkgdXNpbmcgaWNlIHNlcnZlcnMgZnJvbSBvbWUgYW5kIGZvcmNlIHVzaW5nIFRDUFxyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkNvbmZpZy5pY2VTZXJ2ZXJzID0gW107XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGljZVNlcnZlcnMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgaWNlU2VydmVyID0gaWNlU2VydmVyc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcmVnSWNlU2VydmVyID0ge307XHJcblxyXG4gICAgICAgICAgICAgICAgcmVnSWNlU2VydmVyLnVybHMgPSBpY2VTZXJ2ZXIudXJscztcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgaGFzV2Vic29ja2V0VXJsID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBsZXQgc29ja2V0VXJsID0gZ2VuZXJhdGVEb21haW5Gcm9tVXJsKHdlYlNvY2tldFVybCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCByZWdJY2VTZXJ2ZXIudXJscy5sZW5ndGg7IGorKykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2VydmVyVXJsID0gcmVnSWNlU2VydmVyLnVybHNbal07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXJ2ZXJVcmwuaW5kZXhPZihzb2NrZXRVcmwpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFzV2Vic29ja2V0VXJsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghaGFzV2Vic29ja2V0VXJsKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWdJY2VTZXJ2ZXIudXJscy5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2xvbmVJY2VTZXJ2ZXIgPSBfLmNsb25lKHJlZ0ljZVNlcnZlci51cmxzWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGlwID0gZmluZElwKGNsb25lSWNlU2VydmVyKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzb2NrZXRVcmwgJiYgaXApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZ0ljZVNlcnZlci51cmxzLnB1c2goY2xvbmVJY2VTZXJ2ZXIucmVwbGFjZShpcCwgc29ja2V0VXJsKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmVnSWNlU2VydmVyLnVzZXJuYW1lID0gaWNlU2VydmVyLnVzZXJfbmFtZTtcclxuICAgICAgICAgICAgICAgIHJlZ0ljZVNlcnZlci5jcmVkZW50aWFsID0gaWNlU2VydmVyLmNyZWRlbnRpYWw7XHJcblxyXG4gICAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25Db25maWcuaWNlU2VydmVycy5wdXNoKHJlZ0ljZVNlcnZlcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uQ29uZmlnLmljZVRyYW5zcG9ydFBvbGljeSA9ICdyZWxheSc7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAvLyBsYXN0IHByaW9yaXR5IHVzaW5nIGRlZmF1bHQgaWNlIHNlcnZlcnMuXHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uQ29uZmlnID0gZGVmYXVsdENvbm5lY3Rpb25Db25maWc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJNYWluIFBlZXIgQ29ubmVjdGlvbiBDb25maWcgOiBcIiwgcGVlckNvbm5lY3Rpb25Db25maWcpO1xyXG5cclxuICAgICAgICBsZXQgcGVlckNvbm5lY3Rpb24gPSBuZXcgUlRDUGVlckNvbm5lY3Rpb24ocGVlckNvbm5lY3Rpb25Db25maWcpO1xyXG5cclxuICAgICAgICBtYWluUGVlckNvbm5lY3Rpb25JbmZvID0ge1xyXG4gICAgICAgICAgICBpZDogaWQsXHJcbiAgICAgICAgICAgIHBlZXJJZDogcGVlcklkLFxyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbjogcGVlckNvbm5lY3Rpb25cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL1NldCByZW1vdGUgZGVzY3JpcHRpb24gd2hlbiBJIHJlY2VpdmVkIHNkcCBmcm9tIHNlcnZlci5cclxuICAgICAgICBwZWVyQ29ubmVjdGlvbi5zZXRSZW1vdGVEZXNjcmlwdGlvbihuZXcgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKHNkcCkpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbi5jcmVhdGVBbnN3ZXIoKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkZXNjKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJjcmVhdGUgSG9zdCBBbnN3ZXIgOiBzdWNjZXNzXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24uc2V0TG9jYWxEZXNjcmlwdGlvbihkZXNjKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG15IFNEUCBjcmVhdGVkLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxvY2FsU0RQID0gcGVlckNvbm5lY3Rpb24ubG9jYWxEZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZygnTG9jYWwgU0RQJywgbG9jYWxTRFApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbmRNZXNzYWdlKHdzLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlZXJfaWQ6IHBlZXJJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kOiAnYW5zd2VyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZHA6IGxvY2FsU0RQXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcih0ZW1wRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfV0VCUlRDX0NSRUFURV9BTlNXRVJfRVJST1JdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbUExBWUVSX1dFQlJUQ19TRVRfUkVNT1RFX0RFU0NfRVJST1JdO1xyXG4gICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChjYW5kaWRhdGVzKSB7XHJcblxyXG4gICAgICAgICAgICBhZGRJY2VDYW5kaWRhdGUocGVlckNvbm5lY3Rpb24sIGNhbmRpZGF0ZXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcGVlckNvbm5lY3Rpb24ub25pY2VjYW5kaWRhdGUgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAoZS5jYW5kaWRhdGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJXZWJSVENMb2FkZXIgc2VuZCBjYW5kaWRhdGUgdG8gc2VydmVyIDogXCIgLCBlLmNhbmRpZGF0ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ01haW4gUGVlciBDb25uZWN0aW9uIGNhbmRpZGF0ZScsIGUuY2FuZGlkYXRlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZW5kTWVzc2FnZSh3cywge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBpZCxcclxuICAgICAgICAgICAgICAgICAgICBwZWVyX2lkOiBwZWVySWQsXHJcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZDogXCJjYW5kaWRhdGVcIixcclxuICAgICAgICAgICAgICAgICAgICBjYW5kaWRhdGVzOiBbZS5jYW5kaWRhdGVdXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcGVlckNvbm5lY3Rpb24ub25jb25uZWN0aW9uc3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAvL2ljZUNvbm5lY3Rpb25TdGF0ZVxyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJbb24gY29ubmVjdGlvbiBzdGF0ZSBjaGFuZ2VdXCIsIHBlZXJDb25uZWN0aW9uLmNvbm5lY3Rpb25TdGF0ZSwgZSk7XHJcblxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcGVlckNvbm5lY3Rpb24ub25pY2Vjb25uZWN0aW9uc3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJbb24gaWNlIGNvbm5lY3Rpb24gc3RhdGUgY2hhbmdlXVwiLCBwZWVyQ29ubmVjdGlvbi5pY2VDb25uZWN0aW9uU3RhdGUsIGUpO1xyXG5cclxuICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvUlRDUGVlckNvbm5lY3Rpb24vaWNlQ29ubmVjdGlvblN0YXRlXHJcbiAgICAgICAgICAgICogQ2hlY2tzIHRvIGVuc3VyZSB0aGF0IGNvbXBvbmVudHMgYXJlIHN0aWxsIGNvbm5lY3RlZCBmYWlsZWQgZm9yIGF0IGxlYXN0IG9uZSBjb21wb25lbnQgb2YgdGhlIFJUQ1BlZXJDb25uZWN0aW9uLiBUaGlzIGlzIGEgbGVzcyBzdHJpbmdlbnQgdGVzdCB0aGFuIFwiZmFpbGVkXCIgYW5kIG1heSB0cmlnZ2VyIGludGVybWl0dGVudGx5IGFuZCByZXNvbHZlIGp1c3QgYXMgc3BvbnRhbmVvdXNseSBvbiBsZXNzIHJlbGlhYmxlIG5ldHdvcmtzLCBvciBkdXJpbmcgdGVtcG9yYXJ5IGRpc2Nvbm5lY3Rpb25zLiBXaGVuIHRoZSBwcm9ibGVtIHJlc29sdmVzLCB0aGUgY29ubmVjdGlvbiBtYXkgcmV0dXJuIHRvIHRoZSBcImNvbm5lY3RlZFwiIHN0YXRlLlxyXG4gICAgICAgICAgICAqICovXHJcbiAgICAgICAgICAgIC8vVGhpcyBwcm9jZXNzIGlzIG15IGltYWdpbmF0aW9uLiBJIGRvIG5vdCBrbm93IGhvdyB0byByZXByb2R1Y2UuXHJcbiAgICAgICAgICAgIC8vU2l0dWF0aW9uIDogT01FIGlzIGRlYWQgYnV0IG9tZSBjYW4ndCBzZW5kICdzdG9wJyBtZXNzYWdlLlxyXG4gICAgICAgICAgICBpZiAocGVlckNvbm5lY3Rpb24uaWNlQ29ubmVjdGlvblN0YXRlID09PSAnZGlzY29ubmVjdGVkJyB8fCBwZWVyQ29ubmVjdGlvbi5pY2VDb25uZWN0aW9uU3RhdGUgPT09ICdjbG9zZWQnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXdzQ2xvc2VkQnlQbGF5ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWFpblBlZXJDb25uZWN0aW9uSW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9XRUJSVENfVU5FWFBFQ1RFRF9ESVNDT05ORUNUXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBwZWVyQ29ubmVjdGlvbi5vbnRyYWNrID0gZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcInN0cmVhbSByZWNlaXZlZC5cIik7XHJcblxyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coJ1JlY292ZXJ5IE9uIFBhY2tldCBMb3NzIDonLCByZWNvcnZlclBhY2tldExvc3MpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlY29ydmVyUGFja2V0TG9zcykge1xyXG4gICAgICAgICAgICAgICAgZXh0cmFjdExvc3NQYWNrZXRzT25OZXR3b3JrU3RhdHVzKG1haW5QZWVyQ29ubmVjdGlvbkluZm8pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBtYWluU3RyZWFtID0gZS5zdHJlYW1zWzBdO1xyXG4gICAgICAgICAgICBsb2FkQ2FsbGJhY2soZS5zdHJlYW1zWzBdKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkud2VicnRjQ29uZmlnICYmIHBsYXllckNvbmZpZy5nZXRDb25maWcoKS53ZWJydGNDb25maWcucGxheW91dERlbGF5SGludCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBoaW50ID0gcGxheWVyQ29uZmlnLmdldENvbmZpZygpLndlYnJ0Y0NvbmZpZy5wbGF5b3V0RGVsYXlIaW50O1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlY2VpdmVycyA9IG1haW5QZWVyQ29ubmVjdGlvbkluZm8ucGVlckNvbm5lY3Rpb24uZ2V0UmVjZWl2ZXJzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZWNlaXZlcnMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlY2VpdmVyID0gcmVjZWl2ZXJzW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZWNlaXZlci5wbGF5b3V0RGVsYXlIaW50ID0gaGludDtcclxuICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJXZWJSVEMgcGxheW91dERlbGF5SGludFwiLCByZWNlaXZlciwgaGludCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVDbGllbnRQZWVyQ29ubmVjdGlvbihob3N0SWQsIGNsaWVudElkKSB7XHJcblxyXG4gICAgICAgIGlmICghbWFpblN0cmVhbSkge1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY3JlYXRlQ2xpZW50UGVlckNvbm5lY3Rpb24oaG9zdElkLCBjbGllbnRJZCk7XHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgcGVlckNvbm5lY3Rpb24gPSBuZXcgUlRDUGVlckNvbm5lY3Rpb24oZGVmYXVsdENvbm5lY3Rpb25Db25maWcpO1xyXG5cclxuICAgICAgICBjbGllbnRQZWVyQ29ubmVjdGlvbnNbY2xpZW50SWRdID0ge1xyXG4gICAgICAgICAgICBpZDogY2xpZW50SWQsXHJcbiAgICAgICAgICAgIHBlZXJJZDogaG9zdElkLFxyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbjogcGVlckNvbm5lY3Rpb25cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBwZWVyQ29ubmVjdGlvbi5hZGRTdHJlYW0obWFpblN0cmVhbSk7XHJcblxyXG4gICAgICAgIC8vIGxldCBvZmZlck9wdGlvbiA9IHtcclxuICAgICAgICAvLyAgICAgb2ZmZXJUb1JlY2VpdmVBdWRpbzogMSxcclxuICAgICAgICAvLyAgICAgb2ZmZXJUb1JlY2VpdmVWaWRlbzogMVxyXG4gICAgICAgIC8vIH07XHJcblxyXG4gICAgICAgIHBlZXJDb25uZWN0aW9uLmNyZWF0ZU9mZmVyKHNldExvY2FsQW5kU2VuZE1lc3NhZ2UsIGhhbmRsZUNyZWF0ZU9mZmVyRXJyb3IsIHt9KTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2V0TG9jYWxBbmRTZW5kTWVzc2FnZShzZXNzaW9uRGVzY3JpcHRpb24pIHtcclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24uc2V0TG9jYWxEZXNjcmlwdGlvbihzZXNzaW9uRGVzY3JpcHRpb24pO1xyXG5cclxuICAgICAgICAgICAgc2VuZE1lc3NhZ2Uod3MsIHtcclxuICAgICAgICAgICAgICAgIGlkOiBob3N0SWQsXHJcbiAgICAgICAgICAgICAgICBwZWVyX2lkOiBjbGllbnRJZCxcclxuICAgICAgICAgICAgICAgIHNkcDogc2Vzc2lvbkRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgY29tbWFuZDogJ29mZmVyX3AycCdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVDcmVhdGVPZmZlckVycm9yKGV2ZW50KSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcGVlckNvbm5lY3Rpb24ub25pY2VjYW5kaWRhdGUgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAoZS5jYW5kaWRhdGUpIHtcclxuICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldlYlJUQ0xvYWRlciBzZW5kIGNhbmRpZGF0ZSB0byBzZXJ2ZXIgOiBcIiArIGUuY2FuZGlkYXRlKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ0NsaWVudCBQZWVyIENvbm5lY3Rpb24gY2FuZGlkYXRlJywgZS5jYW5kaWRhdGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbmRNZXNzYWdlKHdzLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGhvc3RJZCxcclxuICAgICAgICAgICAgICAgICAgICBwZWVyX2lkOiBjbGllbnRJZCxcclxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kOiBcImNhbmRpZGF0ZV9wMnBcIixcclxuICAgICAgICAgICAgICAgICAgICBjYW5kaWRhdGVzOiBbZS5jYW5kaWRhdGVdXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdlbmVyYXRlRG9tYWluRnJvbVVybCh1cmwpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gJyc7XHJcbiAgICAgICAgbGV0IG1hdGNoO1xyXG4gICAgICAgIGlmIChtYXRjaCA9IHVybC5tYXRjaCgvXig/Ondzcz86XFwvXFwvKT8oPzpbXkBcXG5dK0ApPyg/Ond3d1xcLik/KFteOlxcL1xcblxcP1xcPV0rKS9pbSkpIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gbWF0Y2hbMV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGZpbmRJcChzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgbGV0IHJlc3VsdCA9ICcnO1xyXG4gICAgICAgIGxldCBtYXRjaDtcclxuXHJcbiAgICAgICAgaWYgKG1hdGNoID0gc3RyaW5nLm1hdGNoKG5ldyBSZWdFeHAoXCJcXFxcYigyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT8pXFxcXC4oMjVbMC01XXwyWzAtNF1bMC05XXxbMDFdP1swLTldWzAtOV0/KVxcXFwuKDI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPylcXFxcLigyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT8pXFxcXGJcIiwgJ2dpJykpKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IG1hdGNoWzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjb3B5Q2FuZGlkYXRlKGJhc2ljQ2FuZGlkYXRlKSB7XHJcblxyXG4gICAgICAgIGxldCBjbG9uZUNhbmRpZGF0ZSA9IF8uY2xvbmUoYmFzaWNDYW5kaWRhdGUpO1xyXG5cclxuICAgICAgICBsZXQgbmV3RG9tYWluID0gZ2VuZXJhdGVEb21haW5Gcm9tVXJsKHdlYlNvY2tldFVybCk7XHJcbiAgICAgICAgbGV0IGlwID0gZmluZElwKGNsb25lQ2FuZGlkYXRlLmNhbmRpZGF0ZSk7XHJcblxyXG4gICAgICAgIGlmIChpcCA9PT0gJycgfHwgaXAgPT09IG5ld0RvbWFpbikge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICAgICAgLy8gZmlyZWZveCBicm93c2VyIHRocm93cyBhIGNhbmRpZGF0ZSBwYXJzaW5nIGV4Y2VwdGlvbiB3aGVuIGEgZG9tYWluIG5hbWUgaXMgc2V0IGF0IHRoZSBhZGRyZXNzIHByb3BlcnR5LiBTbyB3ZSByZXNvbHZlIHRoZSBkbnMgdXNpbmcgZ29vZ2xlIGRucyByZXNvbHZlIGFwaS5cclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRCcm93c2VyLmJyb3dzZXIgPT09ICdGaXJlZm94JyAmJiAhZmluZElwKG5ld0RvbWFpbikpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBmZXRjaCgnaHR0cHM6Ly9kbnMuZ29vZ2xlLmNvbS9yZXNvbHZlP25hbWU9JyArIG5ld0RvbWFpbilcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihyZXNwID0+IHJlc3AuanNvbigpKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5BbnN3ZXIgJiYgZGF0YS5BbnN3ZXIubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLkFuc3dlclswXS5kYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZWxzb2x2ZWRJcCA9IGRhdGEuQW5zd2VyWzBdLmRhdGE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb25lQ2FuZGlkYXRlLmNhbmRpZGF0ZSA9IGNsb25lQ2FuZGlkYXRlLmNhbmRpZGF0ZS5yZXBsYWNlKGlwLCByZWxzb2x2ZWRJcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShjbG9uZUNhbmRpZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY2xvbmVDYW5kaWRhdGUuY2FuZGlkYXRlID0gY2xvbmVDYW5kaWRhdGUuY2FuZGlkYXRlLnJlcGxhY2UoaXAsIG5ld0RvbWFpbik7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKGNsb25lQ2FuZGlkYXRlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRJY2VDYW5kaWRhdGUocGVlckNvbm5lY3Rpb24sIGNhbmRpZGF0ZXMpIHtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYW5kaWRhdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChjYW5kaWRhdGVzW2ldICYmIGNhbmRpZGF0ZXNbaV0uY2FuZGlkYXRlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGJhc2ljQ2FuZGlkYXRlID0gY2FuZGlkYXRlc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbi5hZGRJY2VDYW5kaWRhdGUobmV3IFJUQ0ljZUNhbmRpZGF0ZShiYXNpY0NhbmRpZGF0ZSkpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcImFkZEljZUNhbmRpZGF0ZSA6IHN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUl07XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZ2VuZXJhdGVQdWJsaWNDYW5kaWRhdGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNsb25lQ2FuZGlkYXRlUHJvbWlzZSA9IGNvcHlDYW5kaWRhdGUoYmFzaWNDYW5kaWRhdGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2xvbmVDYW5kaWRhdGVQcm9taXNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb25lQ2FuZGlkYXRlUHJvbWlzZS50aGVuKGZ1bmN0aW9uIChjbG9uZUNhbmRpZGF0ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbG9uZUNhbmRpZGF0ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbi5hZGRJY2VDYW5kaWRhdGUobmV3IFJUQ0ljZUNhbmRpZGF0ZShjbG9uZUNhbmRpZGF0ZSkpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJjbG9uZWQgYWRkSWNlQ2FuZGlkYXRlIDogc3VjY2Vzc1wiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRXZWJTb2NrZXQocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcblxyXG4gICAgICAgICAgICB3cyA9IG5ldyBXZWJTb2NrZXQod2ViU29ja2V0VXJsKTtcclxuXHJcbiAgICAgICAgICAgIHdzLm9ub3BlbiA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBzZW5kTWVzc2FnZSh3cywge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmQ6IFwicmVxdWVzdF9vZmZlclwiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB3c1BpbmcgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHNlbmRNZXNzYWdlKHdzLCB7Y29tbWFuZDogXCJwaW5nXCJ9KTtcclxuICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICAvLyB9LCAyMCAqIDEwMDApO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgd3Mub25tZXNzYWdlID0gZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gSlNPTi5wYXJzZShlLmRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLmVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfV0VCUlRDX1dTX0VSUk9SXTtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBtZXNzYWdlLmVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcih0ZW1wRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMobWVzc2FnZSkubGVuZ3RoID09PSAwICYmIG1lc3NhZ2UuY29uc3RydWN0b3IgPT09IE9iamVjdCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coJ0VtcHR5IE1lc3NhZ2UnKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UuY29tbWFuZCA9PT0gJ3BpbmcnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNlbmRNZXNzYWdlKHdzLCB7Y29tbWFuZDogJ3BvbmcnfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghbWVzc2FnZS5pZCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coJ0lEIG11c3QgYmUgbm90IG51bGwnKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UuY29tbWFuZCA9PT0gJ29mZmVyJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVNYWluUGVlckNvbm5lY3Rpb24obWVzc2FnZS5pZCwgbWVzc2FnZS5wZWVyX2lkLCBtZXNzYWdlLnNkcCwgbWVzc2FnZS5jYW5kaWRhdGVzLCBtZXNzYWdlLmljZV9zZXJ2ZXJzLCByZXNvbHZlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5wZWVyX2lkID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoT01FX1AyUF9NT0RFLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihPTUVfUDJQX01PREUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5jb21tYW5kID09PSAncmVxdWVzdF9vZmZlcl9wMnAnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUNsaWVudFBlZXJDb25uZWN0aW9uKG1lc3NhZ2UuaWQsIG1lc3NhZ2UucGVlcl9pZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UuY29tbWFuZCA9PT0gJ2Fuc3dlcl9wMnAnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwZWVyQ29ubmVjdGlvbjEgPSBnZXRQZWVyQ29ubmVjdGlvbkJ5SWQobWVzc2FnZS5wZWVyX2lkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24xLnNldFJlbW90ZURlc2NyaXB0aW9uKG5ldyBSVENTZXNzaW9uRGVzY3JpcHRpb24obWVzc2FnZS5zZHApKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGVzYykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfV0VCUlRDX1NFVF9SRU1PVEVfREVTQ19FUlJPUl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcih0ZW1wRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5jb21tYW5kID09PSAnY2FuZGlkYXRlJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBDYW5kaWRhdGVzIGZvciBuZXcgY2xpZW50IHBlZXJcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGVlckNvbm5lY3Rpb24yID0gZ2V0UGVlckNvbm5lY3Rpb25CeUlkKG1lc3NhZ2UuaWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBhZGRJY2VDYW5kaWRhdGUocGVlckNvbm5lY3Rpb24yLCBtZXNzYWdlLmNhbmRpZGF0ZXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLmNvbW1hbmQgPT09ICdjYW5kaWRhdGVfcDJwJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBDYW5kaWRhdGVzIGZvciBuZXcgY2xpZW50IHBlZXJcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGVlckNvbm5lY3Rpb24zID0gZ2V0UGVlckNvbm5lY3Rpb25CeUlkKG1lc3NhZ2UucGVlcl9pZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGFkZEljZUNhbmRpZGF0ZShwZWVyQ29ubmVjdGlvbjMsIG1lc3NhZ2UuY2FuZGlkYXRlcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UuY29tbWFuZCA9PT0gJ3N0b3AnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtYWluUGVlckNvbm5lY3Rpb25JbmZvLnBlZXJJZCA9PT0gbWVzc2FnZS5wZWVyX2lkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL015IHBhcmVudCB3YXMgZGVhZC4gQW5kIHRoZW4gSSB3aWxsIHJldHJ5LlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2xvc2UgY29ubmVjdGlvbiB3aXRoIGhvc3QgYW5kIHJldHJ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdjbG9zZSBjb25uZWN0aW9uIHdpdGggaG9zdCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFpblN0cmVhbSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5QZWVyQ29ubmVjdGlvbkluZm8ucGVlckNvbm5lY3Rpb24uY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFpblBlZXJDb25uZWN0aW9uSW5mbyA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3Jlc2V0Q2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIucGF1c2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbmRNZXNzYWdlKHdzLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kOiAncmVxdWVzdF9vZmZlcidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjbG9zZSBjb25uZWN0aW9uIHdpdGggY2xpZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbGllbnRQZWVyQ29ubmVjdGlvbnNbbWVzc2FnZS5wZWVyX2lkXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2Nsb3NlIGNvbm5lY3Rpb24gd2l0aCBjbGllbnQ6ICcsIG1lc3NhZ2UucGVlcl9pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGllbnRQZWVyQ29ubmVjdGlvbnNbbWVzc2FnZS5wZWVyX2lkXS5wZWVyQ29ubmVjdGlvbi5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGNsaWVudFBlZXJDb25uZWN0aW9uc1ttZXNzYWdlLnBlZXJfaWRdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB3cy5vbmNsb3NlID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghd3NDbG9zZWRCeVBsYXllcikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9XRUJSVENfV1NfRVJST1JdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAobWFpblBlZXJDb25uZWN0aW9uSW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbUExBWUVSX1dFQlJUQ19VTkVYUEVDVEVEX0RJU0NPTk5FQ1RdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB3cy5vbmVycm9yID0gZnVuY3Rpb24gKGVycm9yKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9XaHkgRWRnZSBCcm93c2VyIGNhbGxzIG9uZXJyb3IoKSB3aGVuIHdzLmNsb3NlKCk/XHJcbiAgICAgICAgICAgICAgICBpZiAoIXdzQ2xvc2VkQnlQbGF5ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9XRUJSVENfV1NfRVJST1JdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcih0ZW1wRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcblxyXG4gICAgICAgICAgICBjbG9zZVBlZXIoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJXZWJSVENMb2FkZXIgY29ubmVjdGluZy4uLlwiKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldlYlJUQ0xvYWRlciB1cmwgOiBcIiArIHdlYlNvY2tldFVybCk7XHJcblxyXG4gICAgICAgICAgICBpbml0V2ViU29ja2V0KHJlc29sdmUsIHJlamVjdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VQZWVyKGVycm9yKSB7XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZygnV2ViUlRDIExvYWRlciBjbG9zZVBlZXIoKScpO1xyXG5cclxuICAgICAgICBpZiAoIWVycm9yKSB7XHJcbiAgICAgICAgICAgIHdzQ2xvc2VkQnlQbGF5ZXIgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG1haW5QZWVyQ29ubmVjdGlvbkluZm8pIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChtYWluUGVlckNvbm5lY3Rpb25JbmZvLnN0YXRpc3RpY3NUaW1lcikge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KG1haW5QZWVyQ29ubmVjdGlvbkluZm8uc3RhdGlzdGljc1RpbWVyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbWFpblN0cmVhbSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coJ0Nsb3NpbmcgbWFpbiBwZWVyIGNvbm5lY3Rpb24uLi4nKTtcclxuICAgICAgICAgICAgaWYgKHN0YXRpc3RpY3NUaW1lcikge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHN0YXRpc3RpY3NUaW1lcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChtYWluUGVlckNvbm5lY3Rpb25JbmZvLnBlZXJDb25uZWN0aW9uKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbWFpblBlZXJDb25uZWN0aW9uSW5mby5wZWVyQ29ubmVjdGlvbi5jbG9zZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBtYWluUGVlckNvbm5lY3Rpb25JbmZvLnBlZXJDb25uZWN0aW9uID0gbnVsbDtcclxuICAgICAgICAgICAgbWFpblBlZXJDb25uZWN0aW9uSW5mbyA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoT2JqZWN0LmtleXMoY2xpZW50UGVlckNvbm5lY3Rpb25zKS5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBjbGllbnRJZCBpbiBjbGllbnRQZWVyQ29ubmVjdGlvbnMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgY2xpZW50UGVlckNvbm5lY3Rpb24gPSBjbGllbnRQZWVyQ29ubmVjdGlvbnNbY2xpZW50SWRdLnBlZXJDb25uZWN0aW9uO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjbGllbnRQZWVyQ29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZygnQ2xvc2luZyBjbGllbnQgcGVlciBjb25uZWN0aW9uLi4uJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xpZW50UGVlckNvbm5lY3Rpb24uY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICBjbGllbnRQZWVyQ29ubmVjdGlvbiA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNsaWVudFBlZXJDb25uZWN0aW9ucyA9IHt9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh3c1BpbmcpO1xyXG4gICAgICAgIHdzUGluZyA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmICh3cykge1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coJ0Nsb3Npbmcgd2Vic29ja2V0IGNvbm5lY3Rpb24uLi4nKTtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU2VuZCBTaWduYWxpbmcgOiBTdG9wLlwiKTtcclxuICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgMCAoQ09OTkVDVElORylcclxuICAgICAgICAgICAgMSAoT1BFTilcclxuICAgICAgICAgICAgMiAoQ0xPU0lORylcclxuICAgICAgICAgICAgMyAoQ0xPU0VEKVxyXG4gICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBpZiAod3MucmVhZHlTdGF0ZSA9PT0gMCB8fCB3cy5yZWFkeVN0YXRlID09PSAxKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgd3NDbG9zZWRCeVBsYXllciA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1haW5QZWVyQ29ubmVjdGlvbkluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICBzZW5kTWVzc2FnZSh3cywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kOiAnc3RvcCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBtYWluUGVlckNvbm5lY3Rpb25JbmZvLmlkXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgd3MuY2xvc2UoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3c0Nsb3NlZEJ5UGxheWVyID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3cyA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICBlcnJvclRyaWdnZXIoZXJyb3IsIHByb3ZpZGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2VuZE1lc3NhZ2Uod3MsIG1lc3NhZ2UpIHtcclxuXHJcbiAgICAgICAgaWYgKHdzKSB7XHJcbiAgICAgICAgICAgIHdzLnNlbmQoSlNPTi5zdHJpbmdpZnkobWVzc2FnZSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgdGhhdC5jb25uZWN0ID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBpbml0aWFsaXplKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+IHtcclxuICAgICAgICBjbG9zZVBlZXIoKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBXZWJSVENMb2FkZXI7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=