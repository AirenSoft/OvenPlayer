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

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9XZWJSVEMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvV2ViUlRDTG9hZGVyLmpzIl0sIm5hbWVzIjpbIldlYlJUQyIsImVsZW1lbnQiLCJwbGF5ZXJDb25maWciLCJhZFRhZ1VybCIsInRoYXQiLCJ3ZWJydGNMb2FkZXIiLCJzdXBlckRlc3Ryb3lfZnVuYyIsInNwZWMiLCJuYW1lIiwiUFJPVklERVJfV0VCUlRDIiwibXNlIiwibGlzdGVuZXIiLCJpc0xvYWRlZCIsImNhblNlZWsiLCJpc0xpdmUiLCJzZWVraW5nIiwic3RhdGUiLCJTVEFURV9JRExFIiwiYnVmZmVyIiwiZnJhbWVyYXRlIiwiY3VycmVudFF1YWxpdHkiLCJjdXJyZW50U291cmNlIiwicXVhbGl0eUxldmVscyIsInNvdXJjZXMiLCJzb3VyY2UiLCJmaWxlIiwidHlwZSIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwiZGVzdHJveSIsImxvYWRDYWxsYmFjayIsInN0cmVhbSIsInNyY09iamVjdCIsImVycm9yVHJpZ2dlciIsImNvbm5lY3QiLCJlcnJvciIsIm9uIiwiQ09OVEVOVF9NRVRBIiwiaXNBdXRvU3RhcnQiLCJvZmYiLCJXZWJSVENMb2FkZXIiLCJwcm92aWRlciIsIndlYlNvY2tldFVybCIsImRlZmF1bHRDb25uZWN0aW9uQ29uZmlnIiwid3MiLCJ3c1BpbmciLCJtYWluU3RyZWFtIiwibWFpblBlZXJDb25uZWN0aW9uSW5mbyIsImNsaWVudFBlZXJDb25uZWN0aW9ucyIsIndzQ2xvc2VkQnlQbGF5ZXIiLCJyZWNvcnZlclBhY2tldExvc3MiLCJnZXRDb25maWciLCJ3ZWJydGNDb25maWciLCJnZW5lcmF0ZVB1YmxpY0NhbmRpZGF0ZSIsInN0YXRpc3RpY3NUaW1lciIsImN1cnJlbnRCcm93c2VyIiwiZXhpc3RpbmdIYW5kbGVyIiwid2luZG93Iiwib25iZWZvcmV1bmxvYWQiLCJldmVudCIsImNsb3NlUGVlciIsImdldFBlZXJDb25uZWN0aW9uQnlJZCIsImlkIiwicGVlckNvbm5lY3Rpb24iLCJleHRyYWN0TG9zc1BhY2tldHNPbk5ldHdvcmtTdGF0dXMiLCJwZWVyQ29ubmVjdGlvbkluZm8iLCJjbGVhclRpbWVvdXQiLCJzdGF0dXMiLCJsb3N0UGFja2V0c0FyciIsInNsb3RMZW5ndGgiLCJwcmV2UGFja2V0c0xvc3QiLCJhdmc4TG9zc2VzIiwiYXZnTW9yZVRoYW5UaHJlc2hvbGRDb3VudCIsInRocmVzaG9sZCIsInNldFRpbWVvdXQiLCJnZXRTdGF0cyIsInRoZW4iLCJzdGF0cyIsImF1dG9GYWxsYmFjayIsImZvckVhY2giLCJraW5kIiwiaXNSZW1vdGUiLCJhY3R1YWxQYWNrZXRMb3N0IiwicGFyc2VJbnQiLCJwYWNrZXRzTG9zdCIsInB1c2giLCJsZW5ndGgiLCJzaGlmdCIsIl8iLCJyZWR1Y2UiLCJtZW1vIiwibnVtIiwidGVtcEVycm9yIiwiRVJST1JTIiwiY29kZXMiLCJQTEFZRVJfV0VCUlRDX05FVFdPUktfU0xPVyIsImNyZWF0ZU1haW5QZWVyQ29ubmVjdGlvbiIsInBlZXJJZCIsInNkcCIsImNhbmRpZGF0ZXMiLCJpY2VTZXJ2ZXJzIiwicmVzb2x2ZSIsInBlZXJDb25uZWN0aW9uQ29uZmlnIiwiaWNlVHJhbnNwb3J0UG9saWN5IiwiaSIsImljZVNlcnZlciIsInJlZ0ljZVNlcnZlciIsInVybHMiLCJ1c2VybmFtZSIsInVzZXJfbmFtZSIsImNyZWRlbnRpYWwiLCJSVENQZWVyQ29ubmVjdGlvbiIsInNldFJlbW90ZURlc2NyaXB0aW9uIiwiUlRDU2Vzc2lvbkRlc2NyaXB0aW9uIiwiY3JlYXRlQW5zd2VyIiwiZGVzYyIsInNldExvY2FsRGVzY3JpcHRpb24iLCJsb2NhbFNEUCIsImxvY2FsRGVzY3JpcHRpb24iLCJzZW5kTWVzc2FnZSIsInBlZXJfaWQiLCJjb21tYW5kIiwiUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUiIsIlBMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUiIsIlBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SIiwiYWRkSWNlQ2FuZGlkYXRlIiwib25pY2VjYW5kaWRhdGUiLCJlIiwiY2FuZGlkYXRlIiwib25jb25uZWN0aW9uc3RhdGVjaGFuZ2UiLCJjb25uZWN0aW9uU3RhdGUiLCJvbmljZWNvbm5lY3Rpb25zdGF0ZWNoYW5nZSIsImljZUNvbm5lY3Rpb25TdGF0ZSIsIlBMQVlFUl9XRUJSVENfVU5FWFBFQ1RFRF9ESVNDT05ORUNUIiwib250cmFjayIsInN0cmVhbXMiLCJwbGF5b3V0RGVsYXlIaW50IiwiaGludCIsInJlY2VpdmVycyIsImdldFJlY2VpdmVycyIsInJlY2VpdmVyIiwiY3JlYXRlQ2xpZW50UGVlckNvbm5lY3Rpb24iLCJob3N0SWQiLCJjbGllbnRJZCIsImFkZFN0cmVhbSIsImNyZWF0ZU9mZmVyIiwic2V0TG9jYWxBbmRTZW5kTWVzc2FnZSIsImhhbmRsZUNyZWF0ZU9mZmVyRXJyb3IiLCJzZXNzaW9uRGVzY3JpcHRpb24iLCJjb3B5Q2FuZGlkYXRlIiwiYmFzaWNDYW5kaWRhdGUiLCJjbG9uZUNhbmRpZGF0ZSIsImNsb25lIiwiZ2VuZXJhdGVEb21haW5Gcm9tVXJsIiwidXJsIiwicmVzdWx0IiwibWF0Y2giLCJmaW5kSXAiLCJSZWdFeHAiLCJuZXdEb21haW4iLCJpcCIsIlByb21pc2UiLCJyZWplY3QiLCJicm93c2VyIiwiZmV0Y2giLCJyZXNwIiwianNvbiIsImRhdGEiLCJBbnN3ZXIiLCJyZWxzb2x2ZWRJcCIsInJlcGxhY2UiLCJSVENJY2VDYW5kaWRhdGUiLCJQTEFZRVJfV0VCUlRDX0FERF9JQ0VDQU5ESURBVEVfRVJST1IiLCJjbG9uZUNhbmRpZGF0ZVByb21pc2UiLCJpbml0V2ViU29ja2V0IiwiV2ViU29ja2V0Iiwib25vcGVuIiwib25tZXNzYWdlIiwibWVzc2FnZSIsIkpTT04iLCJwYXJzZSIsIlBMQVlFUl9XRUJSVENfV1NfRVJST1IiLCJPYmplY3QiLCJrZXlzIiwiY29uc3RydWN0b3IiLCJpY2Vfc2VydmVycyIsInRyaWdnZXIiLCJPTUVfUDJQX01PREUiLCJwZWVyQ29ubmVjdGlvbjEiLCJwZWVyQ29ubmVjdGlvbjIiLCJwZWVyQ29ubmVjdGlvbjMiLCJjbG9zZSIsInBhdXNlIiwib25jbG9zZSIsIm9uZXJyb3IiLCJpbml0aWFsaXplIiwiY2xpZW50UGVlckNvbm5lY3Rpb24iLCJjbGVhckludGVydmFsIiwicmVhZHlTdGF0ZSIsInNlbmQiLCJzdHJpbmdpZnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7OztBQU1BLElBQU1BLFNBQVMsU0FBVEEsTUFBUyxDQUFTQyxPQUFULEVBQWtCQyxZQUFsQixFQUFnQ0MsUUFBaEMsRUFBeUM7QUFDcEQsUUFBSUMsT0FBTyxFQUFYO0FBQ0EsUUFBSUMsZUFBZSxJQUFuQjtBQUNBLFFBQUlDLG9CQUFxQixJQUF6Qjs7QUFFQSxRQUFJQyxPQUFPO0FBQ1BDLGNBQU9DLDBCQURBO0FBRVBSLGlCQUFVQSxPQUZIO0FBR1BTLGFBQU0sSUFIQztBQUlQQyxrQkFBVyxJQUpKO0FBS1BDLGtCQUFXLEtBTEo7QUFNUEMsaUJBQVUsS0FOSDtBQU9QQyxnQkFBUyxLQVBGO0FBUVBDLGlCQUFVLEtBUkg7QUFTUEMsZUFBUUMscUJBVEQ7QUFVUEMsZ0JBQVMsQ0FWRjtBQVdQQyxtQkFBWSxDQVhMO0FBWVBDLHdCQUFpQixDQUFDLENBWlg7QUFhUEMsdUJBQWdCLENBQUMsQ0FiVjtBQWNQQyx1QkFBZ0IsRUFkVDtBQWVQQyxpQkFBVSxFQWZIO0FBZ0JQcEIsa0JBQVdBO0FBaEJKLEtBQVg7O0FBbUJBQyxXQUFPLDJCQUFTRyxJQUFULEVBQWVMLFlBQWYsRUFBNkIsVUFBU3NCLE1BQVQsRUFBZ0I7QUFDaEQsWUFBRyx5QkFBU0EsT0FBT0MsSUFBaEIsRUFBc0JELE9BQU9FLElBQTdCLENBQUgsRUFBc0M7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LHVCQUF1QmU7QUFGZixxQkFBaEI7QUFJSDs7QUFFRGxCLG1CQUFHbUosS0FBSDtBQUNIO0FBRUosU0F2QkQsTUF1Qk87QUFDSDlJLCtCQUFtQixLQUFuQjtBQUNIOztBQUVETCxhQUFLLElBQUw7O0FBRUEsWUFBSVQsS0FBSixFQUFXO0FBQ1BGLHlCQUFhRSxLQUFiLEVBQW9CTSxRQUFwQjtBQUNIO0FBQ0o7O0FBRUQsYUFBUzhFLFdBQVQsQ0FBcUIzRSxFQUFyQixFQUF5QnNJLE9BQXpCLEVBQWtDOztBQUU5QixZQUFJdEksRUFBSixFQUFRO0FBQ0pBLGVBQUcySixJQUFILENBQVFwQixLQUFLcUIsU0FBTCxDQUFldEIsT0FBZixDQUFSO0FBQ0g7QUFFSjs7QUFFRDlLLFNBQUs4QixPQUFMLEdBQWUsWUFBTTtBQUNqQixlQUFPaUssWUFBUDtBQUNILEtBRkQ7O0FBSUEvTCxTQUFLeUIsT0FBTCxHQUFlLFlBQU07QUFDakIrQjtBQUNILEtBRkQ7O0FBSUEsV0FBT3hELElBQVA7QUFDSCxDQTd1QkQ7O3FCQSt1QmVvQyxZIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuV2ViUlRDUHJvdmlkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDYuIDExLi5cclxuICovXHJcbmltcG9ydCBQcm92aWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L1Byb3ZpZGVyXCI7XHJcbmltcG9ydCBXZWJSVENMb2FkZXIgZnJvbSBcImFwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvV2ViUlRDTG9hZGVyXCI7XHJcbmltcG9ydCB7aXNXZWJSVEN9IGZyb20gXCJ1dGlscy92YWxpZGF0b3JcIjtcclxuaW1wb3J0IHtlcnJvclRyaWdnZXJ9IGZyb20gXCJhcGkvcHJvdmlkZXIvdXRpbHNcIjtcclxuaW1wb3J0IHtQUk9WSURFUl9XRUJSVEMsIFNUQVRFX0lETEUsIENPTlRFTlRfTUVUQSwgU1RBVEVfUExBWUlOR30gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICB3ZWJydGMgcHJvdmlkZXIgZXh0ZW5kZWQgY29yZS5cclxuICogQHBhcmFtICAgY29udGFpbmVyIHBsYXllciBlbGVtZW50LlxyXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgICAgY29uZmlnLlxyXG4gKiAqL1xyXG5cclxuY29uc3QgV2ViUlRDID0gZnVuY3Rpb24oZWxlbWVudCwgcGxheWVyQ29uZmlnLCBhZFRhZ1VybCl7XHJcbiAgICBsZXQgdGhhdCA9IHt9O1xyXG4gICAgbGV0IHdlYnJ0Y0xvYWRlciA9IG51bGw7XHJcbiAgICBsZXQgc3VwZXJEZXN0cm95X2Z1bmMgID0gbnVsbDtcclxuXHJcbiAgICBsZXQgc3BlYyA9IHtcclxuICAgICAgICBuYW1lIDogUFJPVklERVJfV0VCUlRDLFxyXG4gICAgICAgIGVsZW1lbnQgOiBlbGVtZW50LFxyXG4gICAgICAgIG1zZSA6IG51bGwsXHJcbiAgICAgICAgbGlzdGVuZXIgOiBudWxsLFxyXG4gICAgICAgIGlzTG9hZGVkIDogZmFsc2UsXHJcbiAgICAgICAgY2FuU2VlayA6IGZhbHNlLFxyXG4gICAgICAgIGlzTGl2ZSA6IGZhbHNlLFxyXG4gICAgICAgIHNlZWtpbmcgOiBmYWxzZSxcclxuICAgICAgICBzdGF0ZSA6IFNUQVRFX0lETEUsXHJcbiAgICAgICAgYnVmZmVyIDogMCxcclxuICAgICAgICBmcmFtZXJhdGUgOiAwLFxyXG4gICAgICAgIGN1cnJlbnRRdWFsaXR5IDogLTEsXHJcbiAgICAgICAgY3VycmVudFNvdXJjZSA6IC0xLFxyXG4gICAgICAgIHF1YWxpdHlMZXZlbHMgOiBbXSxcclxuICAgICAgICBzb3VyY2VzIDogW10sXHJcbiAgICAgICAgYWRUYWdVcmwgOiBhZFRhZ1VybFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0ID0gUHJvdmlkZXIoc3BlYywgcGxheWVyQ29uZmlnLCBmdW5jdGlvbihzb3VyY2Upe1xyXG4gICAgICAgIGlmKGlzV2ViUlRDKHNvdXJjZS5maWxlLCBzb3VyY2UudHlwZSkpe1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJXRUJSVEMgOiBvbkJlZm9yZUxvYWQgOiBcIiwgc291cmNlKTtcclxuICAgICAgICAgICAgaWYod2VicnRjTG9hZGVyKXtcclxuICAgICAgICAgICAgICAgIHdlYnJ0Y0xvYWRlci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB3ZWJydGNMb2FkZXIgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgbG9hZENhbGxiYWNrID0gZnVuY3Rpb24oc3RyZWFtKXtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5zcmNPYmplY3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnNyY09iamVjdCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zcmNPYmplY3QgPSBzdHJlYW07XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB3ZWJydGNMb2FkZXIgPSBXZWJSVENMb2FkZXIodGhhdCwgc291cmNlLmZpbGUsIGxvYWRDYWxsYmFjaywgZXJyb3JUcmlnZ2VyLCBwbGF5ZXJDb25maWcpO1xyXG5cclxuICAgICAgICAgICAgd2VicnRjTG9hZGVyLmNvbm5lY3QoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIC8vVG9EbyA6IHJlc29sdmUgbm90IHdvcmtyaW5nXHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIC8vdGhhdC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAvL0RvIG5vdGhpbmdcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0Lm9uKENPTlRFTlRfTUVUQSwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBpZiAodGhhdC5nZXRTdGF0ZSgpICE9PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHRoYXQucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgdGhhdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBzdXBlckRlc3Ryb3lfZnVuYyA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTtcclxuXHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJXRUJSVEMgUFJPVklERVIgTE9BREVELlwiKTtcclxuXHJcblxyXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XHJcbiAgICAgICAgaWYod2VicnRjTG9hZGVyKXtcclxuICAgICAgICAgICAgd2VicnRjTG9hZGVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgZWxlbWVudC5zcmNPYmplY3QgPSBudWxsO1xyXG4gICAgICAgICAgICB3ZWJydGNMb2FkZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGF0Lm9mZihDT05URU5UX01FVEEsIG51bGwsIHRoYXQpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldFQlJUQyA6ICBQUk9WSURFUiBERVNUUk9ZRUQuXCIpO1xyXG5cclxuICAgICAgICBzdXBlckRlc3Ryb3lfZnVuYygpO1xyXG5cclxuICAgIH07XHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBXZWJSVEM7XHJcbiIsImltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XHJcbmltcG9ydCB7YW5hbFVzZXJBZ2VudH0gZnJvbSBcInV0aWxzL2Jyb3dzZXJcIjtcclxuaW1wb3J0IHtcclxuICAgIEVSUk9SUyxcclxuICAgIFBMQVlFUl9XRUJSVENfV1NfRVJST1IsXHJcbiAgICBQTEFZRVJfV0VCUlRDX0FERF9JQ0VDQU5ESURBVEVfRVJST1IsXHJcbiAgICBQTEFZRVJfV0VCUlRDX1NFVF9SRU1PVEVfREVTQ19FUlJPUixcclxuICAgIFBMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUixcclxuICAgIFBMQVlFUl9XRUJSVENfU0VUX0xPQ0FMX0RFU0NfRVJST1IsXHJcbiAgICBQTEFZRVJfV0VCUlRDX05FVFdPUktfU0xPVyxcclxuICAgIFBMQVlFUl9XRUJSVENfVU5FWFBFQ1RFRF9ESVNDT05ORUNULFxyXG4gICAgT01FX1AyUF9NT0RFXHJcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuXHJcblxyXG5jb25zdCBXZWJSVENMb2FkZXIgPSBmdW5jdGlvbiAocHJvdmlkZXIsIHdlYlNvY2tldFVybCwgbG9hZENhbGxiYWNrLCBlcnJvclRyaWdnZXIsIHBsYXllckNvbmZpZykge1xyXG5cclxuICAgIGxldCBkZWZhdWx0Q29ubmVjdGlvbkNvbmZpZyA9IHt9O1xyXG5cclxuICAgIGxldCB0aGF0ID0ge307XHJcblxyXG4gICAgbGV0IHdzID0gbnVsbDtcclxuXHJcbiAgICBsZXQgd3NQaW5nID0gbnVsbDtcclxuXHJcbiAgICBsZXQgbWFpblN0cmVhbSA9IG51bGw7XHJcblxyXG4gICAgLy8gdXNlZCBmb3IgZ2V0dGluZyBtZWRpYSBzdHJlYW0gZnJvbSBPTUUgb3IgaG9zdCBwZWVyXHJcbiAgICBsZXQgbWFpblBlZXJDb25uZWN0aW9uSW5mbyA9IG51bGw7XHJcblxyXG4gICAgLy8gdXNlZCBmb3Igc2VuZCBtZWRpYSBzdHJlYW0gdG8gY2xpZW50IHBlZXIuXHJcbiAgICBsZXQgY2xpZW50UGVlckNvbm5lY3Rpb25zID0ge307XHJcblxyXG4gICAgLy9jbG9zZWQgd2Vic29ja2V0IGJ5IG9tZSBvciBjbGllbnQuXHJcbiAgICBsZXQgd3NDbG9zZWRCeVBsYXllciA9IGZhbHNlO1xyXG5cclxuICAgIGxldCByZWNvcnZlclBhY2tldExvc3MgPSB0cnVlO1xyXG5cclxuICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkud2VicnRjQ29uZmlnICYmXHJcbiAgICAgICAgcGxheWVyQ29uZmlnLmdldENvbmZpZygpLndlYnJ0Y0NvbmZpZy5yZWNvcnZlclBhY2tldExvc3MgPT09IGZhbHNlKSB7XHJcblxyXG4gICAgICAgIHJlY29ydmVyUGFja2V0TG9zcyA9IHBsYXllckNvbmZpZy5nZXRDb25maWcoKS53ZWJydGNDb25maWcucmVjb3J2ZXJQYWNrZXRMb3NzO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBnZW5lcmF0ZVB1YmxpY0NhbmRpZGF0ZSA9IHRydWU7XHJcblxyXG4gICAgaWYgKHBsYXllckNvbmZpZy5nZXRDb25maWcoKS53ZWJydGNDb25maWcgJiZcclxuICAgICAgICBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkud2VicnRjQ29uZmlnLmdlbmVyYXRlUHVibGljQ2FuZGlkYXRlID09PSBmYWxzZSkge1xyXG5cclxuICAgICAgICBnZW5lcmF0ZVB1YmxpY0NhbmRpZGF0ZSA9IHBsYXllckNvbmZpZy5nZXRDb25maWcoKS53ZWJydGNDb25maWcuZ2VuZXJhdGVQdWJsaWNDYW5kaWRhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHN0YXRpc3RpY3NUaW1lciA9IG51bGw7XHJcblxyXG4gICAgbGV0IGN1cnJlbnRCcm93c2VyID0gYW5hbFVzZXJBZ2VudCgpO1xyXG5cclxuICAgIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGV4aXN0aW5nSGFuZGxlciA9IHdpbmRvdy5vbmJlZm9yZXVubG9hZDtcclxuICAgICAgICB3aW5kb3cub25iZWZvcmV1bmxvYWQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKGV4aXN0aW5nSGFuZGxlcikge1xyXG4gICAgICAgICAgICAgICAgZXhpc3RpbmdIYW5kbGVyKGV2ZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJUaGlzIGNhbGxzIGF1dG8gd2hlbiBicm93c2VyIGNsb3NlZC5cIik7XHJcbiAgICAgICAgICAgIGNsb3NlUGVlcigpO1xyXG4gICAgICAgIH1cclxuICAgIH0pKCk7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0UGVlckNvbm5lY3Rpb25CeUlkKGlkKSB7XHJcblxyXG4gICAgICAgIGxldCBwZWVyQ29ubmVjdGlvbiA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmIChtYWluUGVlckNvbm5lY3Rpb25JbmZvICYmIGlkID09PSBtYWluUGVlckNvbm5lY3Rpb25JbmZvLmlkKSB7XHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uID0gbWFpblBlZXJDb25uZWN0aW9uSW5mby5wZWVyQ29ubmVjdGlvbjtcclxuICAgICAgICB9IGVsc2UgaWYgKGNsaWVudFBlZXJDb25uZWN0aW9uc1tpZF0pIHtcclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24gPSBjbGllbnRQZWVyQ29ubmVjdGlvbnNbaWRdLnBlZXJDb25uZWN0aW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHBlZXJDb25uZWN0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGV4dHJhY3RMb3NzUGFja2V0c09uTmV0d29ya1N0YXR1cyhwZWVyQ29ubmVjdGlvbkluZm8pIHtcclxuXHJcbiAgICAgICAgaWYgKHBlZXJDb25uZWN0aW9uSW5mby5zdGF0aXN0aWNzVGltZXIpIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHBlZXJDb25uZWN0aW9uSW5mby5zdGF0aXN0aWNzVGltZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzKSB7XHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMgPSB7fTtcclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5sb3N0UGFja2V0c0FyciA9IFtdO1xyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLnNsb3RMZW5ndGggPSA4OyAvLzggc3RhdGlzdGljcy4gZXZlcnkgMiBzZWNvbmRzXHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMucHJldlBhY2tldHNMb3N0ID0gMDtcclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5hdmc4TG9zc2VzID0gMDtcclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5hdmdNb3JlVGhhblRocmVzaG9sZENvdW50ID0gMDsgIC8vSWYgYXZnOExvc3MgbW9yZSB0aGFuIHRocmVzaG9sZC5cclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy50aHJlc2hvbGQgPSA0MDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBsb3N0UGFja2V0c0FyciA9IHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMubG9zdFBhY2tldHNBcnIsXHJcbiAgICAgICAgICAgIHNsb3RMZW5ndGggPSBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLnNsb3RMZW5ndGgsIC8vOCBzdGF0aXN0aWNzLiBldmVyeSAyIHNlY29uZHNcclxuICAgICAgICAgICAgcHJldlBhY2tldHNMb3N0ID0gcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5wcmV2UGFja2V0c0xvc3QsXHJcbiAgICAgICAgICAgIGF2ZzhMb3NzZXMgPSBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLmF2ZzhMb3NzZXMsXHJcbiAgICAgICAgICAgIC8vIGF2Z01vcmVUaGFuVGhyZXNob2xkQ291bnQgPSBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLmF2Z01vcmVUaGFuVGhyZXNob2xkQ291bnQsICAvL0lmIGF2ZzhMb3NzIG1vcmUgdGhhbiB0aHJlc2hvbGQuXHJcbiAgICAgICAgICAgIHRocmVzaG9sZCA9IHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMudGhyZXNob2xkO1xyXG5cclxuICAgICAgICBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdGlzdGljc1RpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICghcGVlckNvbm5lY3Rpb25JbmZvLnBlZXJDb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5wZWVyQ29ubmVjdGlvbi5nZXRTdGF0cygpLnRoZW4oZnVuY3Rpb24gKHN0YXRzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFzdGF0cykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGxheWVyQ29uZmlnLmdldENvbmZpZygpLmF1dG9GYWxsYmFjayAmJiBzdGF0cykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzdGF0cy5mb3JFYWNoKGZ1bmN0aW9uIChzdGF0ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlLnR5cGUgPT09IFwiaW5ib3VuZC1ydHBcIiAmJiBzdGF0ZS5raW5kID09PSAndmlkZW8nICYmICFzdGF0ZS5pc1JlbW90ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vKHN0YXRlLnBhY2tldHNMb3N0IC0gcHJldlBhY2tldHNMb3N0KSBpcyByZWFsIGN1cnJlbnQgbG9zdC5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYWN0dWFsUGFja2V0TG9zdCA9IHBhcnNlSW50KHN0YXRlLnBhY2tldHNMb3N0KSAtIHBhcnNlSW50KHByZXZQYWNrZXRzTG9zdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9zdFBhY2tldHNBcnIucHVzaChwYXJzZUludChzdGF0ZS5wYWNrZXRzTG9zdCkgLSBwYXJzZUludChwcmV2UGFja2V0c0xvc3QpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9zdFBhY2tldHNBcnIubGVuZ3RoID4gc2xvdExlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb3N0UGFja2V0c0Fyci5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb3N0UGFja2V0c0Fyci5sZW5ndGggPT09IHNsb3RMZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXZnOExvc3NlcyA9IF8ucmVkdWNlKGxvc3RQYWNrZXRzQXJyLCBmdW5jdGlvbiAobWVtbywgbnVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtZW1vICsgbnVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDApIC8gc2xvdExlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXN0OCBMT1NUIFBBQ0tFVCBBVkcgIDogXCIgKyAoYXZnOExvc3NlcyksIFwiQ3VycmVudCBQYWNrZXQgTE9TVDogXCIgKyBhY3R1YWxQYWNrZXRMb3N0LCBcIlRvdGFsIFBhY2tldCBMb3N0OiBcIiArIHN0YXRlLnBhY2tldHNMb3N0LCBsb3N0UGFja2V0c0Fycik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhdmc4TG9zc2VzID4gdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMuYXZnTW9yZVRoYW5UaHJlc2hvbGRDb3VudCA9IHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMuYXZnTW9yZVRoYW5UaHJlc2hvbGRDb3VudCArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLmF2Z01vcmVUaGFuVGhyZXNob2xkQ291bnQgPj0gNjApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIk5FVFdPUksgVU5TVEFCTEVEISEhIFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbUExBWUVSX1dFQlJUQ19ORVRXT1JLX1NMT1ddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLmF2Z01vcmVUaGFuVGhyZXNob2xkQ291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMucHJldlBhY2tldHNMb3N0ID0gc3RhdGUucGFja2V0c0xvc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZXh0cmFjdExvc3NQYWNrZXRzT25OZXR3b3JrU3RhdHVzKHBlZXJDb25uZWN0aW9uSW5mbyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LCAyMDAwKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlTWFpblBlZXJDb25uZWN0aW9uKGlkLCBwZWVySWQsIHNkcCwgY2FuZGlkYXRlcywgaWNlU2VydmVycywgcmVzb2x2ZSkge1xyXG5cclxuICAgICAgICBsZXQgcGVlckNvbm5lY3Rpb25Db25maWcgPSB7fTtcclxuXHJcbiAgICAgICAgLy8gZmlyc3QgcHJpb3JpdHkgdXNpbmcgaWNlIHNlcnZlcnMgZnJvbSBwbGF5ZXIgc2V0dGluZy5cclxuICAgICAgICBpZiAocGxheWVyQ29uZmlnLmdldENvbmZpZygpLndlYnJ0Y0NvbmZpZyAmJiBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkud2VicnRjQ29uZmlnLmljZVNlcnZlcnMpIHtcclxuXHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uQ29uZmlnLmljZVNlcnZlcnMgPSBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkud2VicnRjQ29uZmlnLmljZVNlcnZlcnM7XHJcblxyXG4gICAgICAgICAgICBpZiAocGxheWVyQ29uZmlnLmdldENvbmZpZygpLndlYnJ0Y0NvbmZpZy5pY2VUcmFuc3BvcnRQb2xpY3kpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkNvbmZpZy5pY2VUcmFuc3BvcnRQb2xpY3kgPSBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkud2VicnRjQ29uZmlnLmljZVRyYW5zcG9ydFBvbGljeTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoaWNlU2VydmVycykge1xyXG5cclxuICAgICAgICAgICAgLy8gc2Vjb25kIHByaW9yaXR5IHVzaW5nIGljZSBzZXJ2ZXJzIGZyb20gb21lIGFuZCBmb3JjZSB1c2luZyBUQ1BcclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25Db25maWcuaWNlU2VydmVycyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpY2VTZXJ2ZXJzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGljZVNlcnZlciA9IGljZVNlcnZlcnNbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHJlZ0ljZVNlcnZlciA9IHt9O1xyXG5cclxuICAgICAgICAgICAgICAgIHJlZ0ljZVNlcnZlci51cmxzID0gaWNlU2VydmVyLnVybHM7XHJcbiAgICAgICAgICAgICAgICByZWdJY2VTZXJ2ZXIudXNlcm5hbWUgPSBpY2VTZXJ2ZXIudXNlcl9uYW1lO1xyXG4gICAgICAgICAgICAgICAgcmVnSWNlU2VydmVyLmNyZWRlbnRpYWwgPSBpY2VTZXJ2ZXIuY3JlZGVudGlhbDtcclxuXHJcbiAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkNvbmZpZy5pY2VTZXJ2ZXJzLnB1c2gocmVnSWNlU2VydmVyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25Db25maWcuaWNlVHJhbnNwb3J0UG9saWN5ID0gJ3JlbGF5JztcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIC8vIGxhc3QgcHJpb3JpdHkgdXNpbmcgZGVmYXVsdCBpY2Ugc2VydmVycy5cclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25Db25maWcgPSBkZWZhdWx0Q29ubmVjdGlvbkNvbmZpZztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIm1haW4gcGVlciBjb25uZWN0aW9uIGNvbmZpZyA6IFwiLCBwZWVyQ29ubmVjdGlvbkNvbmZpZyk7XHJcblxyXG4gICAgICAgIGxldCBwZWVyQ29ubmVjdGlvbiA9IG5ldyBSVENQZWVyQ29ubmVjdGlvbihwZWVyQ29ubmVjdGlvbkNvbmZpZyk7XHJcblxyXG4gICAgICAgIG1haW5QZWVyQ29ubmVjdGlvbkluZm8gPSB7XHJcbiAgICAgICAgICAgIGlkOiBpZCxcclxuICAgICAgICAgICAgcGVlcklkOiBwZWVySWQsXHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uOiBwZWVyQ29ubmVjdGlvblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vU2V0IHJlbW90ZSBkZXNjcmlwdGlvbiB3aGVuIEkgcmVjZWl2ZWQgc2RwIGZyb20gc2VydmVyLlxyXG4gICAgICAgIHBlZXJDb25uZWN0aW9uLnNldFJlbW90ZURlc2NyaXB0aW9uKG5ldyBSVENTZXNzaW9uRGVzY3JpcHRpb24oc2RwKSlcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uLmNyZWF0ZUFuc3dlcigpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRlc2MpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcImNyZWF0ZSBIb3N0IEFuc3dlciA6IHN1Y2Nlc3NcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbi5zZXRMb2NhbERlc2NyaXB0aW9uKGRlc2MpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbXkgU0RQIGNyZWF0ZWQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbG9jYWxTRFAgPSBwZWVyQ29ubmVjdGlvbi5sb2NhbERlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKCdMb2NhbCBTRFAnLCBsb2NhbFNEUCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VuZE1lc3NhZ2Uod3MsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVlcl9pZDogcGVlcklkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmQ6ICdhbnN3ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNkcDogbG9jYWxTRFBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfV0VCUlRDX1NFVF9SRU1PVEVfREVTQ19FUlJPUl07XHJcbiAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgIGNsb3NlUGVlcih0ZW1wRXJyb3IpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGNhbmRpZGF0ZXMpIHtcclxuXHJcbiAgICAgICAgICAgIGFkZEljZUNhbmRpZGF0ZShwZWVyQ29ubmVjdGlvbiwgY2FuZGlkYXRlcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwZWVyQ29ubmVjdGlvbi5vbmljZWNhbmRpZGF0ZSA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmNhbmRpZGF0ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldlYlJUQ0xvYWRlciBzZW5kIGNhbmRpZGF0ZSB0byBzZXJ2ZXIgOiBcIiArIGUuY2FuZGlkYXRlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnTWFpbiBQZWVyIENvbm5lY3Rpb24gY2FuZGlkYXRlJywgZS5jYW5kaWRhdGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbmRNZXNzYWdlKHdzLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGlkLFxyXG4gICAgICAgICAgICAgICAgICAgIHBlZXJfaWQ6IHBlZXJJZCxcclxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kOiBcImNhbmRpZGF0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhbmRpZGF0ZXM6IFtlLmNhbmRpZGF0ZV1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBwZWVyQ29ubmVjdGlvbi5vbmNvbm5lY3Rpb25zdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIC8vaWNlQ29ubmVjdGlvblN0YXRlXHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIltvbiBjb25uZWN0aW9uIHN0YXRlIGNoYW5nZV1cIiwgcGVlckNvbm5lY3Rpb24uY29ubmVjdGlvblN0YXRlLCBlKTtcclxuXHJcbiAgICAgICAgfTtcclxuICAgICAgICBwZWVyQ29ubmVjdGlvbi5vbmljZWNvbm5lY3Rpb25zdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIltvbiBpY2UgY29ubmVjdGlvbiBzdGF0ZSBjaGFuZ2VdXCIsIHBlZXJDb25uZWN0aW9uLmljZUNvbm5lY3Rpb25TdGF0ZSwgZSk7XHJcblxyXG4gICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9SVENQZWVyQ29ubmVjdGlvbi9pY2VDb25uZWN0aW9uU3RhdGVcclxuICAgICAgICAgICAgKiBDaGVja3MgdG8gZW5zdXJlIHRoYXQgY29tcG9uZW50cyBhcmUgc3RpbGwgY29ubmVjdGVkIGZhaWxlZCBmb3IgYXQgbGVhc3Qgb25lIGNvbXBvbmVudCBvZiB0aGUgUlRDUGVlckNvbm5lY3Rpb24uIFRoaXMgaXMgYSBsZXNzIHN0cmluZ2VudCB0ZXN0IHRoYW4gXCJmYWlsZWRcIiBhbmQgbWF5IHRyaWdnZXIgaW50ZXJtaXR0ZW50bHkgYW5kIHJlc29sdmUganVzdCBhcyBzcG9udGFuZW91c2x5IG9uIGxlc3MgcmVsaWFibGUgbmV0d29ya3MsIG9yIGR1cmluZyB0ZW1wb3JhcnkgZGlzY29ubmVjdGlvbnMuIFdoZW4gdGhlIHByb2JsZW0gcmVzb2x2ZXMsIHRoZSBjb25uZWN0aW9uIG1heSByZXR1cm4gdG8gdGhlIFwiY29ubmVjdGVkXCIgc3RhdGUuXHJcbiAgICAgICAgICAgICogKi9cclxuICAgICAgICAgICAgLy9UaGlzIHByb2Nlc3MgaXMgbXkgaW1hZ2luYXRpb24uIEkgZG8gbm90IGtub3cgaG93IHRvIHJlcHJvZHVjZS5cclxuICAgICAgICAgICAgLy9TaXR1YXRpb24gOiBPTUUgaXMgZGVhZCBidXQgb21lIGNhbid0IHNlbmQgJ3N0b3AnIG1lc3NhZ2UuXHJcbiAgICAgICAgICAgIGlmIChwZWVyQ29ubmVjdGlvbi5pY2VDb25uZWN0aW9uU3RhdGUgPT09ICdkaXNjb25uZWN0ZWQnIHx8IHBlZXJDb25uZWN0aW9uLmljZUNvbm5lY3Rpb25TdGF0ZSA9PT0gJ2Nsb3NlZCcpIHtcclxuICAgICAgICAgICAgICAgIGlmICghd3NDbG9zZWRCeVBsYXllcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtYWluUGVlckNvbm5lY3Rpb25JbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbUExBWUVSX1dFQlJUQ19VTkVYUEVDVEVEX0RJU0NPTk5FQ1RdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHBlZXJDb25uZWN0aW9uLm9udHJhY2sgPSBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwic3RyZWFtIHJlY2VpdmVkLlwiKTtcclxuXHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZygnUmVjb3ZlcnkgT24gUGFja2V0IExvc3MgOicsIHJlY29ydmVyUGFja2V0TG9zcyk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVjb3J2ZXJQYWNrZXRMb3NzKSB7XHJcbiAgICAgICAgICAgICAgICBleHRyYWN0TG9zc1BhY2tldHNPbk5ldHdvcmtTdGF0dXMobWFpblBlZXJDb25uZWN0aW9uSW5mbyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG1haW5TdHJlYW0gPSBlLnN0cmVhbXNbMF07XHJcbiAgICAgICAgICAgIGxvYWRDYWxsYmFjayhlLnN0cmVhbXNbMF0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRDb25maWcoKS53ZWJydGNDb25maWcgJiYgcGxheWVyQ29uZmlnLmdldENvbmZpZygpLndlYnJ0Y0NvbmZpZy5wbGF5b3V0RGVsYXlIaW50KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGhpbnQgPSBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkud2VicnRjQ29uZmlnLnBsYXlvdXREZWxheUhpbnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVjZWl2ZXJzID0gbWFpblBlZXJDb25uZWN0aW9uSW5mby5wZWVyQ29ubmVjdGlvbi5nZXRSZWNlaXZlcnMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlY2VpdmVycy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVjZWl2ZXIgPSByZWNlaXZlcnNbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJlY2VpdmVyLnBsYXlvdXREZWxheUhpbnQgPSBoaW50O1xyXG4gICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldlYlJUQyBwbGF5b3V0RGVsYXlIaW50XCIsIHJlY2VpdmVyLCBoaW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNsaWVudFBlZXJDb25uZWN0aW9uKGhvc3RJZCwgY2xpZW50SWQpIHtcclxuXHJcbiAgICAgICAgaWYgKCFtYWluU3RyZWFtKSB7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVDbGllbnRQZWVyQ29ubmVjdGlvbihob3N0SWQsIGNsaWVudElkKTtcclxuICAgICAgICAgICAgfSwgMTAwKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwZWVyQ29ubmVjdGlvbiA9IG5ldyBSVENQZWVyQ29ubmVjdGlvbihkZWZhdWx0Q29ubmVjdGlvbkNvbmZpZyk7XHJcblxyXG4gICAgICAgIGNsaWVudFBlZXJDb25uZWN0aW9uc1tjbGllbnRJZF0gPSB7XHJcbiAgICAgICAgICAgIGlkOiBjbGllbnRJZCxcclxuICAgICAgICAgICAgcGVlcklkOiBob3N0SWQsXHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uOiBwZWVyQ29ubmVjdGlvblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHBlZXJDb25uZWN0aW9uLmFkZFN0cmVhbShtYWluU3RyZWFtKTtcclxuXHJcbiAgICAgICAgLy8gbGV0IG9mZmVyT3B0aW9uID0ge1xyXG4gICAgICAgIC8vICAgICBvZmZlclRvUmVjZWl2ZUF1ZGlvOiAxLFxyXG4gICAgICAgIC8vICAgICBvZmZlclRvUmVjZWl2ZVZpZGVvOiAxXHJcbiAgICAgICAgLy8gfTtcclxuXHJcbiAgICAgICAgcGVlckNvbm5lY3Rpb24uY3JlYXRlT2ZmZXIoc2V0TG9jYWxBbmRTZW5kTWVzc2FnZSwgaGFuZGxlQ3JlYXRlT2ZmZXJFcnJvciwge30pO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZXRMb2NhbEFuZFNlbmRNZXNzYWdlKHNlc3Npb25EZXNjcmlwdGlvbikge1xyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbi5zZXRMb2NhbERlc2NyaXB0aW9uKHNlc3Npb25EZXNjcmlwdGlvbik7XHJcblxyXG4gICAgICAgICAgICBzZW5kTWVzc2FnZSh3cywge1xyXG4gICAgICAgICAgICAgICAgaWQ6IGhvc3RJZCxcclxuICAgICAgICAgICAgICAgIHBlZXJfaWQ6IGNsaWVudElkLFxyXG4gICAgICAgICAgICAgICAgc2RwOiBzZXNzaW9uRGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICBjb21tYW5kOiAnb2ZmZXJfcDJwJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZUNyZWF0ZU9mZmVyRXJyb3IoZXZlbnQpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwZWVyQ29ubmVjdGlvbi5vbmljZWNhbmRpZGF0ZSA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmNhbmRpZGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiV2ViUlRDTG9hZGVyIHNlbmQgY2FuZGlkYXRlIHRvIHNlcnZlciA6IFwiICsgZS5jYW5kaWRhdGUpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnQ2xpZW50IFBlZXIgQ29ubmVjdGlvbiBjYW5kaWRhdGUnLCBlLmNhbmRpZGF0ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2VuZE1lc3NhZ2Uod3MsIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogaG9zdElkLFxyXG4gICAgICAgICAgICAgICAgICAgIHBlZXJfaWQ6IGNsaWVudElkLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmQ6IFwiY2FuZGlkYXRlX3AycFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhbmRpZGF0ZXM6IFtlLmNhbmRpZGF0ZV1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGNvcHlDYW5kaWRhdGUgPSBmdW5jdGlvbiAoYmFzaWNDYW5kaWRhdGUpIHtcclxuXHJcbiAgICAgICAgbGV0IGNsb25lQ2FuZGlkYXRlID0gXy5jbG9uZShiYXNpY0NhbmRpZGF0ZSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdlbmVyYXRlRG9tYWluRnJvbVVybCh1cmwpIHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9ICcnO1xyXG4gICAgICAgICAgICBsZXQgbWF0Y2g7XHJcbiAgICAgICAgICAgIGlmIChtYXRjaCA9IHVybC5tYXRjaCgvXig/Ondzcz86XFwvXFwvKT8oPzpbXkBcXG5dK0ApPyg/Ond3d1xcLik/KFteOlxcL1xcblxcP1xcPV0rKS9pbSkpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG1hdGNoWzFdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBmaW5kSXAoY2FuZGlkYXRlKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gJyc7XHJcbiAgICAgICAgICAgIGxldCBtYXRjaDtcclxuXHJcbiAgICAgICAgICAgIGlmIChtYXRjaCA9IGNhbmRpZGF0ZS5tYXRjaChuZXcgUmVnRXhwKFwiXFxcXGIoMjVbMC01XXwyWzAtNF1bMC05XXxbMDFdP1swLTldWzAtOV0/KVxcXFwuKDI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPylcXFxcLigyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT8pXFxcXC4oMjVbMC01XXwyWzAtNF1bMC05XXxbMDFdP1swLTldWzAtOV0/KVxcXFxiXCIsICdnaScpKSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gbWF0Y2hbMF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbmV3RG9tYWluID0gZ2VuZXJhdGVEb21haW5Gcm9tVXJsKHdlYlNvY2tldFVybCk7XHJcbiAgICAgICAgbGV0IGlwID0gZmluZElwKGNsb25lQ2FuZGlkYXRlLmNhbmRpZGF0ZSk7XHJcblxyXG4gICAgICAgIGlmIChpcCA9PT0gJycgfHwgaXAgPT09IG5ld0RvbWFpbikge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICAgICAgLy8gZmlyZWZveCBicm93c2VyIHRocm93cyBhIGNhbmRpZGF0ZSBwYXJzaW5nIGV4Y2VwdGlvbiB3aGVuIGEgZG9tYWluIG5hbWUgaXMgc2V0IGF0IHRoZSBhZGRyZXNzIHByb3BlcnR5LiBTbyB3ZSByZXNvbHZlIHRoZSBkbnMgdXNpbmcgZ29vZ2xlIGRucyByZXNvbHZlIGFwaS5cclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRCcm93c2VyLmJyb3dzZXIgPT09ICdGaXJlZm94JyAmJiAhZmluZElwKG5ld0RvbWFpbikpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBmZXRjaCgnaHR0cHM6Ly9kbnMuZ29vZ2xlLmNvbS9yZXNvbHZlP25hbWU9JyArIG5ld0RvbWFpbilcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihyZXNwID0+IHJlc3AuanNvbigpKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5BbnN3ZXIgJiYgZGF0YS5BbnN3ZXIubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLkFuc3dlclswXS5kYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZWxzb2x2ZWRJcCA9IGRhdGEuQW5zd2VyWzBdLmRhdGE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb25lQ2FuZGlkYXRlLmNhbmRpZGF0ZSA9IGNsb25lQ2FuZGlkYXRlLmNhbmRpZGF0ZS5yZXBsYWNlKGlwLCByZWxzb2x2ZWRJcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShjbG9uZUNhbmRpZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY2xvbmVDYW5kaWRhdGUuY2FuZGlkYXRlID0gY2xvbmVDYW5kaWRhdGUuY2FuZGlkYXRlLnJlcGxhY2UoaXAsIG5ld0RvbWFpbik7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKGNsb25lQ2FuZGlkYXRlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkSWNlQ2FuZGlkYXRlKHBlZXJDb25uZWN0aW9uLCBjYW5kaWRhdGVzKSB7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FuZGlkYXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoY2FuZGlkYXRlc1tpXSAmJiBjYW5kaWRhdGVzW2ldLmNhbmRpZGF0ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBiYXNpY0NhbmRpZGF0ZSA9IGNhbmRpZGF0ZXNbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24uYWRkSWNlQ2FuZGlkYXRlKG5ldyBSVENJY2VDYW5kaWRhdGUoYmFzaWNDYW5kaWRhdGUpKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJhZGRJY2VDYW5kaWRhdGUgOiBzdWNjZXNzXCIpO1xyXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfV0VCUlRDX0FERF9JQ0VDQU5ESURBVEVfRVJST1JdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcih0ZW1wRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGdlbmVyYXRlUHVibGljQ2FuZGlkYXRlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjbG9uZUNhbmRpZGF0ZVByb21pc2UgPSBjb3B5Q2FuZGlkYXRlKGJhc2ljQ2FuZGlkYXRlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsb25lQ2FuZGlkYXRlUHJvbWlzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9uZUNhbmRpZGF0ZVByb21pc2UudGhlbihmdW5jdGlvbiAoY2xvbmVDYW5kaWRhdGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xvbmVDYW5kaWRhdGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24uYWRkSWNlQ2FuZGlkYXRlKG5ldyBSVENJY2VDYW5kaWRhdGUoY2xvbmVDYW5kaWRhdGUpKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiY2xvbmVkIGFkZEljZUNhbmRpZGF0ZSA6IHN1Y2Nlc3NcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfV0VCUlRDX0FERF9JQ0VDQU5ESURBVEVfRVJST1JdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0V2ViU29ja2V0KHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICB0cnkge1xyXG5cclxuICAgICAgICAgICAgd3MgPSBuZXcgV2ViU29ja2V0KHdlYlNvY2tldFVybCk7XHJcblxyXG4gICAgICAgICAgICB3cy5vbm9wZW4gPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgc2VuZE1lc3NhZ2Uod3MsIHtcclxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kOiBcInJlcXVlc3Rfb2ZmZXJcIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gd3NQaW5nID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgIC8vICAgICBzZW5kTWVzc2FnZSh3cywge2NvbW1hbmQ6IFwicGluZ1wifSk7XHJcbiAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgLy8gfSwgMjAgKiAxMDAwKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHdzLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IEpTT04ucGFyc2UoZS5kYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbUExBWUVSX1dFQlJUQ19XU19FUlJPUl07XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gbWVzc2FnZS5lcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKG1lc3NhZ2UpLmxlbmd0aCA9PT0gMCAmJiBtZXNzYWdlLmNvbnN0cnVjdG9yID09PSBPYmplY3QpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKCdFbXB0eSBNZXNzYWdlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLmNvbW1hbmQgPT09ICdwaW5nJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZW5kTWVzc2FnZSh3cywge2NvbW1hbmQ6ICdwb25nJ30pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIW1lc3NhZ2UuaWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKCdJRCBtdXN0IGJlIG5vdCBudWxsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLmNvbW1hbmQgPT09ICdvZmZlcicpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlTWFpblBlZXJDb25uZWN0aW9uKG1lc3NhZ2UuaWQsIG1lc3NhZ2UucGVlcl9pZCwgbWVzc2FnZS5zZHAsIG1lc3NhZ2UuY2FuZGlkYXRlcywgbWVzc2FnZS5pY2Vfc2VydmVycywgcmVzb2x2ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UucGVlcl9pZCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlci50cmlnZ2VyKE9NRV9QMlBfTU9ERSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoT01FX1AyUF9NT0RFLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UuY29tbWFuZCA9PT0gJ3JlcXVlc3Rfb2ZmZXJfcDJwJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVDbGllbnRQZWVyQ29ubmVjdGlvbihtZXNzYWdlLmlkLCBtZXNzYWdlLnBlZXJfaWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLmNvbW1hbmQgPT09ICdhbnN3ZXJfcDJwJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGVlckNvbm5lY3Rpb24xID0gZ2V0UGVlckNvbm5lY3Rpb25CeUlkKG1lc3NhZ2UucGVlcl9pZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uMS5zZXRSZW1vdGVEZXNjcmlwdGlvbihuZXcgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKG1lc3NhZ2Uuc2RwKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRlc2MpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbUExBWUVSX1dFQlJUQ19TRVRfUkVNT1RFX0RFU0NfRVJST1JdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UuY29tbWFuZCA9PT0gJ2NhbmRpZGF0ZScpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2FuZGlkYXRlcyBmb3IgbmV3IGNsaWVudCBwZWVyXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBlZXJDb25uZWN0aW9uMiA9IGdldFBlZXJDb25uZWN0aW9uQnlJZChtZXNzYWdlLmlkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYWRkSWNlQ2FuZGlkYXRlKHBlZXJDb25uZWN0aW9uMiwgbWVzc2FnZS5jYW5kaWRhdGVzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5jb21tYW5kID09PSAnY2FuZGlkYXRlX3AycCcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2FuZGlkYXRlcyBmb3IgbmV3IGNsaWVudCBwZWVyXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBlZXJDb25uZWN0aW9uMyA9IGdldFBlZXJDb25uZWN0aW9uQnlJZChtZXNzYWdlLnBlZXJfaWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBhZGRJY2VDYW5kaWRhdGUocGVlckNvbm5lY3Rpb24zLCBtZXNzYWdlLmNhbmRpZGF0ZXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLmNvbW1hbmQgPT09ICdzdG9wJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAobWFpblBlZXJDb25uZWN0aW9uSW5mby5wZWVySWQgPT09IG1lc3NhZ2UucGVlcl9pZCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9NeSBwYXJlbnQgd2FzIGRlYWQuIEFuZCB0aGVuIEkgd2lsbCByZXRyeS5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNsb3NlIGNvbm5lY3Rpb24gd2l0aCBob3N0IGFuZCByZXRyeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnY2xvc2UgY29ubmVjdGlvbiB3aXRoIGhvc3QnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5TdHJlYW0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluUGVlckNvbm5lY3Rpb25JbmZvLnBlZXJDb25uZWN0aW9uLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5QZWVyQ29ubmVjdGlvbkluZm8gPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXNldENhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLnBhdXNlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZW5kTWVzc2FnZSh3cywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZDogJ3JlcXVlc3Rfb2ZmZXInXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2xvc2UgY29ubmVjdGlvbiB3aXRoIGNsaWVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xpZW50UGVlckNvbm5lY3Rpb25zW21lc3NhZ2UucGVlcl9pZF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdjbG9zZSBjb25uZWN0aW9uIHdpdGggY2xpZW50OiAnLCBtZXNzYWdlLnBlZXJfaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50UGVlckNvbm5lY3Rpb25zW21lc3NhZ2UucGVlcl9pZF0ucGVlckNvbm5lY3Rpb24uY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjbGllbnRQZWVyQ29ubmVjdGlvbnNbbWVzc2FnZS5wZWVyX2lkXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgd3Mub25jbG9zZSA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXdzQ2xvc2VkQnlQbGF5ZXIpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfV0VCUlRDX1dTX0VSUk9SXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1haW5QZWVyQ29ubmVjdGlvbkluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9XRUJSVENfVU5FWFBFQ1RFRF9ESVNDT05ORUNUXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcih0ZW1wRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgd3Mub25lcnJvciA9IGZ1bmN0aW9uIChlcnJvcikge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vV2h5IEVkZ2UgQnJvd3NlciBjYWxscyBvbmVycm9yKCkgd2hlbiB3cy5jbG9zZSgpP1xyXG4gICAgICAgICAgICAgICAgaWYgKCF3c0Nsb3NlZEJ5UGxheWVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfV0VCUlRDX1dTX0VSUk9SXTtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG5cclxuICAgICAgICAgICAgY2xvc2VQZWVyKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiV2ViUlRDTG9hZGVyIGNvbm5lY3RpbmcuLi5cIik7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJXZWJSVENMb2FkZXIgdXJsIDogXCIgKyB3ZWJTb2NrZXRVcmwpO1xyXG5cclxuICAgICAgICAgICAgaW5pdFdlYlNvY2tldChyZXNvbHZlLCByZWplY3QpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlUGVlcihlcnJvcikge1xyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coJ1dlYlJUQyBMb2FkZXIgY2xvc2VQZWVyKCknKTtcclxuXHJcbiAgICAgICAgaWYgKCFlcnJvcikge1xyXG4gICAgICAgICAgICB3c0Nsb3NlZEJ5UGxheWVyID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChtYWluUGVlckNvbm5lY3Rpb25JbmZvKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAobWFpblBlZXJDb25uZWN0aW9uSW5mby5zdGF0aXN0aWNzVGltZXIpIHtcclxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChtYWluUGVlckNvbm5lY3Rpb25JbmZvLnN0YXRpc3RpY3NUaW1lcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG1haW5TdHJlYW0gPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKCdDbG9zaW5nIG1haW4gcGVlciBjb25uZWN0aW9uLi4uJyk7XHJcbiAgICAgICAgICAgIGlmIChzdGF0aXN0aWNzVGltZXIpIHtcclxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChzdGF0aXN0aWNzVGltZXIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobWFpblBlZXJDb25uZWN0aW9uSW5mby5wZWVyQ29ubmVjdGlvbikge1xyXG5cclxuICAgICAgICAgICAgICAgIG1haW5QZWVyQ29ubmVjdGlvbkluZm8ucGVlckNvbm5lY3Rpb24uY2xvc2UoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbWFpblBlZXJDb25uZWN0aW9uSW5mby5wZWVyQ29ubmVjdGlvbiA9IG51bGw7XHJcbiAgICAgICAgICAgIG1haW5QZWVyQ29ubmVjdGlvbkluZm8gPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGNsaWVudFBlZXJDb25uZWN0aW9ucykubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgY2xpZW50SWQgaW4gY2xpZW50UGVlckNvbm5lY3Rpb25zKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGNsaWVudFBlZXJDb25uZWN0aW9uID0gY2xpZW50UGVlckNvbm5lY3Rpb25zW2NsaWVudElkXS5wZWVyQ29ubmVjdGlvbjtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoY2xpZW50UGVlckNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coJ0Nsb3NpbmcgY2xpZW50IHBlZXIgY29ubmVjdGlvbi4uLicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsaWVudFBlZXJDb25uZWN0aW9uLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xpZW50UGVlckNvbm5lY3Rpb24gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjbGllbnRQZWVyQ29ubmVjdGlvbnMgPSB7fTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwod3NQaW5nKTtcclxuICAgICAgICB3c1BpbmcgPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAod3MpIHtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKCdDbG9zaW5nIHdlYnNvY2tldCBjb25uZWN0aW9uLi4uJyk7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlNlbmQgU2lnbmFsaW5nIDogU3RvcC5cIik7XHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgIDAgKENPTk5FQ1RJTkcpXHJcbiAgICAgICAgICAgIDEgKE9QRU4pXHJcbiAgICAgICAgICAgIDIgKENMT1NJTkcpXHJcbiAgICAgICAgICAgIDMgKENMT1NFRClcclxuICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgaWYgKHdzLnJlYWR5U3RhdGUgPT09IDAgfHwgd3MucmVhZHlTdGF0ZSA9PT0gMSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHdzQ2xvc2VkQnlQbGF5ZXIgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtYWluUGVlckNvbm5lY3Rpb25JbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VuZE1lc3NhZ2Uod3MsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZDogJ3N0b3AnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogbWFpblBlZXJDb25uZWN0aW9uSW5mby5pZFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHdzLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd3NDbG9zZWRCeVBsYXllciA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd3MgPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgZXJyb3JUcmlnZ2VyKGVycm9yLCBwcm92aWRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNlbmRNZXNzYWdlKHdzLCBtZXNzYWdlKSB7XHJcblxyXG4gICAgICAgIGlmICh3cykge1xyXG4gICAgICAgICAgICB3cy5zZW5kKEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHRoYXQuY29ubmVjdCA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gaW5pdGlhbGl6ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PiB7XHJcbiAgICAgICAgY2xvc2VQZWVyKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgV2ViUlRDTG9hZGVyO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9