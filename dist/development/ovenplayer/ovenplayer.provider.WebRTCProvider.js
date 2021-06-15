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

    // return -1 if no opus;
    // return opus format number
    function getOpusFormatNumber(sdp) {

        var lines = sdp.split('\n');
        var opusFormatNumber = -1;

        for (var i = 0; i < lines.length - 1; i++) {

            lines[i] = lines[i].toLowerCase();

            if (lines[i].indexOf('a=rtpmap') > -1 && lines[i].indexOf('opus') > -1) {
                // parsing "a=rtpmap:102 OPUS/48000/2" line
                opusFormatNumber = lines[i].split(' ')[0].split(':')[1];
                break;
            }
        }

        return opusFormatNumber;
    }

    function checkOpusIsStereo(sdp, opusFormatNumber) {

        var lines = sdp.split('\n');

        var stereo = false;

        for (var i = 0; i < lines.length - 1; i++) {

            lines[i] = lines[i].toLowerCase();

            // check stereo=1 from "a=fmtp:102 sprop-stereo=1;stereo=1;minptime=10;useinbandfec=1"
            if (lines[i].indexOf('a=fmtp:' + opusFormatNumber) > -1) {

                if (lines[i].indexOf('stereo=1') > -1) {
                    stereo = true;
                }
                break;
            }
        }

        return stereo;
    }

    function mungeSdpForceStereoOpus(sdp, opusFormatNumber) {

        var lines = sdp.split('\n');

        // find this line and modify. "a=fmtp:102 minptime=10;useinbandfec=1"
        for (var i = 0; i < lines.length - 1; i++) {

            // check stereo=1 from "a=fmtp:102 sprop-stereo=1;stereo=1;minptime=10;useinbandfec=1"
            if (lines[i].indexOf('a=fmtp:' + opusFormatNumber) > -1) {

                if (lines[i].indexOf('stereo=1') === -1) {

                    lines[i] = lines[i] + ';stereo=1';
                }
                break;
            }
        }

        return lines.join('\n');
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

                var opusFormatNumber = getOpusFormatNumber(sdp.sdp);

                if (opusFormatNumber > -1) {

                    if (checkOpusIsStereo(sdp.sdp, opusFormatNumber)) {

                        //If offer has opus and if it is stereo, munge local sdp to force stereo=1
                        //Thanks to community https://github.com/AirenSoft/OvenMediaEngine/issues/203
                        desc.sdp = mungeSdpForceStereoOpus(desc.sdp, opusFormatNumber);
                    }
                }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9XZWJSVEMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvV2ViUlRDTG9hZGVyLmpzIl0sIm5hbWVzIjpbIldlYlJUQyIsImVsZW1lbnQiLCJwbGF5ZXJDb25maWciLCJhZFRhZ1VybCIsInRoYXQiLCJ3ZWJydGNMb2FkZXIiLCJzdXBlckRlc3Ryb3lfZnVuYyIsInNwZWMiLCJuYW1lIiwiUFJPVklERVJfV0VCUlRDIiwibXNlIiwibGlzdGVuZXIiLCJpc0xvYWRlZCIsImNhblNlZWsiLCJpc0xpdmUiLCJzZWVraW5nIiwic3RhdGUiLCJTVEFURV9JRExFIiwiYnVmZmVyIiwiZnJhbWVyYXRlIiwiY3VycmVudFF1YWxpdHkiLCJjdXJyZW50U291cmNlIiwicXVhbGl0eUxldmVscyIsInNvdXJjZXMiLCJzb3VyY2UiLCJmaWxlIiwidHlwZSIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwiZGVzdHJveSIsImxvYWRDYWxsYmFjayIsInN0cmVhbSIsInNyY09iamVjdCIsImVycm9yVHJpZ2dlciIsImNvbm5lY3QiLCJlcnJvciIsIm9uIiwiQ09OVEVOVF9NRVRBIiwiaXNBdXRvU3RhcnQiLCJvZmYiLCJXZWJSVENMb2FkZXIiLCJwcm92aWRlciIsIndlYlNvY2tldFVybCIsImRlZmF1bHRDb25uZWN0aW9uQ29uZmlnIiwid3MiLCJ3c1BpbmciLCJtYWluU3RyZWFtIiwibWFpblBlZXJDb25uZWN0aW9uSW5mbyIsImNsaWVudFBlZXJDb25uZWN0aW9ucyIsIndzQ2xvc2VkQnlQbGF5ZXIiLCJyZWNvcnZlclBhY2tldExvc3MiLCJnZXRDb25maWciLCJ3ZWJydGNDb25maWciLCJnZW5lcmF0ZVB1YmxpY0NhbmRpZGF0ZSIsInN0YXRpc3RpY3NUaW1lciIsImN1cnJlbnRCcm93c2VyIiwiZXhpc3RpbmdIYW5kbGVyIiwid2luZG93Iiwib25iZWZvcmV1bmxvYWQiLCJldmVudCIsImNsb3NlUGVlciIsImdldFBlZXJDb25uZWN0aW9uQnlJZCIsImlkIiwicGVlckNvbm5lY3Rpb24iLCJleHRyYWN0TG9zc1BhY2tldHNPbk5ldHdvcmtTdGF0dXMiLCJwZWVyQ29ubmVjdGlvbkluZm8iLCJjbGVhclRpbWVvdXQiLCJzdGF0dXMiLCJsb3N0UGFja2V0c0FyciIsInNsb3RMZW5ndGgiLCJwcmV2UGFja2V0c0xvc3QiLCJhdmc4TG9zc2VzIiwiYXZnTW9yZVRoYW5UaHJlc2hvbGRDb3VudCIsInRocmVzaG9sZCIsInNldFRpbWVvdXQiLCJnZXRTdGF0cyIsInRoZW4iLCJzdGF0cyIsImF1dG9GYWxsYmFjayIsImZvckVhY2giLCJraW5kIiwiaXNSZW1vdGUiLCJhY3R1YWxQYWNrZXRMb3N0IiwicGFyc2VJbnQiLCJwYWNrZXRzTG9zdCIsInB1c2giLCJsZW5ndGgiLCJzaGlmdCIsIl8iLCJyZWR1Y2UiLCJtZW1vIiwibnVtIiwidGVtcEVycm9yIiwiRVJST1JTIiwiY29kZXMiLCJQTEFZRVJfV0VCUlRDX05FVFdPUktfU0xPVyIsImdldE9wdXNGb3JtYXROdW1iZXIiLCJzZHAiLCJsaW5lcyIsInNwbGl0Iiwib3B1c0Zvcm1hdE51bWJlciIsImkiLCJ0b0xvd2VyQ2FzZSIsImluZGV4T2YiLCJjaGVja09wdXNJc1N0ZXJlbyIsInN0ZXJlbyIsIm11bmdlU2RwRm9yY2VTdGVyZW9PcHVzIiwiam9pbiIsImNyZWF0ZU1haW5QZWVyQ29ubmVjdGlvbiIsInBlZXJJZCIsImNhbmRpZGF0ZXMiLCJpY2VTZXJ2ZXJzIiwicmVzb2x2ZSIsInBlZXJDb25uZWN0aW9uQ29uZmlnIiwiaWNlVHJhbnNwb3J0UG9saWN5IiwiaWNlU2VydmVyIiwicmVnSWNlU2VydmVyIiwidXJscyIsImhhc1dlYnNvY2tldFVybCIsInNvY2tldFVybCIsImdlbmVyYXRlRG9tYWluRnJvbVVybCIsImoiLCJzZXJ2ZXJVcmwiLCJjbG9uZUljZVNlcnZlciIsImNsb25lIiwiaXAiLCJmaW5kSXAiLCJyZXBsYWNlIiwidXNlcm5hbWUiLCJ1c2VyX25hbWUiLCJjcmVkZW50aWFsIiwiUlRDUGVlckNvbm5lY3Rpb24iLCJzZXRSZW1vdGVEZXNjcmlwdGlvbiIsIlJUQ1Nlc3Npb25EZXNjcmlwdGlvbiIsImNyZWF0ZUFuc3dlciIsImRlc2MiLCJzZXRMb2NhbERlc2NyaXB0aW9uIiwibG9jYWxTRFAiLCJsb2NhbERlc2NyaXB0aW9uIiwic2VuZE1lc3NhZ2UiLCJwZWVyX2lkIiwiY29tbWFuZCIsIlBMQVlFUl9XRUJSVENfU0VUX0xPQ0FMX0RFU0NfRVJST1IiLCJQTEFZRVJfV0VCUlRDX0NSRUFURV9BTlNXRVJfRVJST1IiLCJQTEFZRVJfV0VCUlRDX1NFVF9SRU1PVEVfREVTQ19FUlJPUiIsImFkZEljZUNhbmRpZGF0ZSIsIm9uaWNlY2FuZGlkYXRlIiwiZSIsImNhbmRpZGF0ZSIsIm9uY29ubmVjdGlvbnN0YXRlY2hhbmdlIiwiY29ubmVjdGlvblN0YXRlIiwib25pY2Vjb25uZWN0aW9uc3RhdGVjaGFuZ2UiLCJpY2VDb25uZWN0aW9uU3RhdGUiLCJQTEFZRVJfV0VCUlRDX1VORVhQRUNURURfRElTQ09OTkVDVCIsIm9udHJhY2siLCJzdHJlYW1zIiwicGxheW91dERlbGF5SGludCIsImhpbnQiLCJyZWNlaXZlcnMiLCJnZXRSZWNlaXZlcnMiLCJyZWNlaXZlciIsImNyZWF0ZUNsaWVudFBlZXJDb25uZWN0aW9uIiwiaG9zdElkIiwiY2xpZW50SWQiLCJhZGRTdHJlYW0iLCJjcmVhdGVPZmZlciIsInNldExvY2FsQW5kU2VuZE1lc3NhZ2UiLCJoYW5kbGVDcmVhdGVPZmZlckVycm9yIiwic2Vzc2lvbkRlc2NyaXB0aW9uIiwidXJsIiwicmVzdWx0IiwibWF0Y2giLCJzdHJpbmciLCJSZWdFeHAiLCJjb3B5Q2FuZGlkYXRlIiwiYmFzaWNDYW5kaWRhdGUiLCJjbG9uZUNhbmRpZGF0ZSIsIm5ld0RvbWFpbiIsIlByb21pc2UiLCJyZWplY3QiLCJicm93c2VyIiwiZmV0Y2giLCJyZXNwIiwianNvbiIsImRhdGEiLCJBbnN3ZXIiLCJyZWxzb2x2ZWRJcCIsIlJUQ0ljZUNhbmRpZGF0ZSIsIlBMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUiIsImNsb25lQ2FuZGlkYXRlUHJvbWlzZSIsImluaXRXZWJTb2NrZXQiLCJXZWJTb2NrZXQiLCJvbm9wZW4iLCJvbm1lc3NhZ2UiLCJtZXNzYWdlIiwiSlNPTiIsInBhcnNlIiwiUExBWUVSX1dFQlJUQ19XU19FUlJPUiIsIk9iamVjdCIsImtleXMiLCJjb25zdHJ1Y3RvciIsImljZV9zZXJ2ZXJzIiwidHJpZ2dlciIsIk9NRV9QMlBfTU9ERSIsInBlZXJDb25uZWN0aW9uMSIsInBlZXJDb25uZWN0aW9uMiIsInBlZXJDb25uZWN0aW9uMyIsImNsb3NlIiwicGF1c2UiLCJvbmNsb3NlIiwib25lcnJvciIsImluaXRpYWxpemUiLCJjbGllbnRQZWVyQ29ubmVjdGlvbiIsImNsZWFySW50ZXJ2YWwiLCJyZWFkeVN0YXRlIiwic2VuZCIsInN0cmluZ2lmeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0FBTUEsSUFBTUEsU0FBUyxTQUFUQSxNQUFTLENBQVNDLE9BQVQsRUFBa0JDLFlBQWxCLEVBQWdDQyxRQUFoQyxFQUF5QztBQUNwRCxRQUFJQyxPQUFPLEVBQVg7QUFDQSxRQUFJQyxlQUFlLElBQW5CO0FBQ0EsUUFBSUMsb0JBQXFCLElBQXpCOztBQUVBLFFBQUlDLE9BQU87QUFDUEMsY0FBT0MsMEJBREE7QUFFUFIsaUJBQVVBLE9BRkg7QUFHUFMsYUFBTSxJQUhDO0FBSVBDLGtCQUFXLElBSko7QUFLUEMsa0JBQVcsS0FMSjtBQU1QQyxpQkFBVSxLQU5IO0FBT1BDLGdCQUFTLEtBUEY7QUFRUEMsaUJBQVUsS0FSSDtBQVNQQyxlQUFRQyxxQkFURDtBQVVQQyxnQkFBUyxDQVZGO0FBV1BDLG1CQUFZLENBWEw7QUFZUEMsd0JBQWlC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QixFQUF5QnNKLE9BQXpCLEVBQWtDOztBQUU5QixZQUFJdEosRUFBSixFQUFRO0FBQ0pBLGVBQUcySyxJQUFILENBQVFwQixLQUFLcUIsU0FBTCxDQUFldEIsT0FBZixDQUFSO0FBQ0g7QUFFSjs7QUFFRDlMLFNBQUs4QixPQUFMLEdBQWUsWUFBTTtBQUNqQixlQUFPaUwsWUFBUDtBQUNILEtBRkQ7O0FBSUEvTSxTQUFLeUIsT0FBTCxHQUFlLFlBQU07QUFDakIrQjtBQUNILEtBRkQ7O0FBSUEsV0FBT3hELElBQVA7QUFDSCxDQXQxQkQ7O3FCQXcxQmVvQyxZIiwiZmlsZSI6Im92ZW5wbGF5ZXIucHJvdmlkZXIuV2ViUlRDUHJvdmlkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDYuIDExLi5cclxuICovXHJcbmltcG9ydCBQcm92aWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L1Byb3ZpZGVyXCI7XHJcbmltcG9ydCBXZWJSVENMb2FkZXIgZnJvbSBcImFwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvV2ViUlRDTG9hZGVyXCI7XHJcbmltcG9ydCB7aXNXZWJSVEN9IGZyb20gXCJ1dGlscy92YWxpZGF0b3JcIjtcclxuaW1wb3J0IHtlcnJvclRyaWdnZXJ9IGZyb20gXCJhcGkvcHJvdmlkZXIvdXRpbHNcIjtcclxuaW1wb3J0IHtQUk9WSURFUl9XRUJSVEMsIFNUQVRFX0lETEUsIENPTlRFTlRfTUVUQSwgU1RBVEVfUExBWUlOR30gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICB3ZWJydGMgcHJvdmlkZXIgZXh0ZW5kZWQgY29yZS5cclxuICogQHBhcmFtICAgY29udGFpbmVyIHBsYXllciBlbGVtZW50LlxyXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgICAgY29uZmlnLlxyXG4gKiAqL1xyXG5cclxuY29uc3QgV2ViUlRDID0gZnVuY3Rpb24oZWxlbWVudCwgcGxheWVyQ29uZmlnLCBhZFRhZ1VybCl7XHJcbiAgICBsZXQgdGhhdCA9IHt9O1xyXG4gICAgbGV0IHdlYnJ0Y0xvYWRlciA9IG51bGw7XHJcbiAgICBsZXQgc3VwZXJEZXN0cm95X2Z1bmMgID0gbnVsbDtcclxuXHJcbiAgICBsZXQgc3BlYyA9IHtcclxuICAgICAgICBuYW1lIDogUFJPVklERVJfV0VCUlRDLFxyXG4gICAgICAgIGVsZW1lbnQgOiBlbGVtZW50LFxyXG4gICAgICAgIG1zZSA6IG51bGwsXHJcbiAgICAgICAgbGlzdGVuZXIgOiBudWxsLFxyXG4gICAgICAgIGlzTG9hZGVkIDogZmFsc2UsXHJcbiAgICAgICAgY2FuU2VlayA6IGZhbHNlLFxyXG4gICAgICAgIGlzTGl2ZSA6IGZhbHNlLFxyXG4gICAgICAgIHNlZWtpbmcgOiBmYWxzZSxcclxuICAgICAgICBzdGF0ZSA6IFNUQVRFX0lETEUsXHJcbiAgICAgICAgYnVmZmVyIDogMCxcclxuICAgICAgICBmcmFtZXJhdGUgOiAwLFxyXG4gICAgICAgIGN1cnJlbnRRdWFsaXR5IDogLTEsXHJcbiAgICAgICAgY3VycmVudFNvdXJjZSA6IC0xLFxyXG4gICAgICAgIHF1YWxpdHlMZXZlbHMgOiBbXSxcclxuICAgICAgICBzb3VyY2VzIDogW10sXHJcbiAgICAgICAgYWRUYWdVcmwgOiBhZFRhZ1VybFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0ID0gUHJvdmlkZXIoc3BlYywgcGxheWVyQ29uZmlnLCBmdW5jdGlvbihzb3VyY2Upe1xyXG4gICAgICAgIGlmKGlzV2ViUlRDKHNvdXJjZS5maWxlLCBzb3VyY2UudHlwZSkpe1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJXRUJSVEMgOiBvbkJlZm9yZUxvYWQgOiBcIiwgc291cmNlKTtcclxuICAgICAgICAgICAgaWYod2VicnRjTG9hZGVyKXtcclxuICAgICAgICAgICAgICAgIHdlYnJ0Y0xvYWRlci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB3ZWJydGNMb2FkZXIgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgbG9hZENhbGxiYWNrID0gZnVuY3Rpb24oc3RyZWFtKXtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5zcmNPYmplY3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnNyY09iamVjdCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zcmNPYmplY3QgPSBzdHJlYW07XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB3ZWJydGNMb2FkZXIgPSBXZWJSVENMb2FkZXIodGhhdCwgc291cmNlLmZpbGUsIGxvYWRDYWxsYmFjaywgZXJyb3JUcmlnZ2VyLCBwbGF5ZXJDb25maWcpO1xyXG5cclxuICAgICAgICAgICAgd2VicnRjTG9hZGVyLmNvbm5lY3QoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIC8vVG9EbyA6IHJlc29sdmUgbm90IHdvcmtyaW5nXHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIC8vdGhhdC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAvL0RvIG5vdGhpbmdcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGF0Lm9uKENPTlRFTlRfTUVUQSwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGlmKHBsYXllckNvbmZpZy5pc0F1dG9TdGFydCgpKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBpZiAodGhhdC5nZXRTdGF0ZSgpICE9PSAnZXJyb3InKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHRoYXQucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgdGhhdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBzdXBlckRlc3Ryb3lfZnVuYyA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTtcclxuXHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJXRUJSVEMgUFJPVklERVIgTE9BREVELlwiKTtcclxuXHJcblxyXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XHJcbiAgICAgICAgaWYod2VicnRjTG9hZGVyKXtcclxuICAgICAgICAgICAgd2VicnRjTG9hZGVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgZWxlbWVudC5zcmNPYmplY3QgPSBudWxsO1xyXG4gICAgICAgICAgICB3ZWJydGNMb2FkZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGF0Lm9mZihDT05URU5UX01FVEEsIG51bGwsIHRoYXQpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldFQlJUQyA6ICBQUk9WSURFUiBERVNUUk9ZRUQuXCIpO1xyXG5cclxuICAgICAgICBzdXBlckRlc3Ryb3lfZnVuYygpO1xyXG5cclxuICAgIH07XHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBXZWJSVEM7XHJcbiIsImltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XHJcbmltcG9ydCB7YW5hbFVzZXJBZ2VudH0gZnJvbSBcInV0aWxzL2Jyb3dzZXJcIjtcclxuaW1wb3J0IHtcclxuICAgIEVSUk9SUyxcclxuICAgIFBMQVlFUl9XRUJSVENfV1NfRVJST1IsXHJcbiAgICBQTEFZRVJfV0VCUlRDX0FERF9JQ0VDQU5ESURBVEVfRVJST1IsXHJcbiAgICBQTEFZRVJfV0VCUlRDX1NFVF9SRU1PVEVfREVTQ19FUlJPUixcclxuICAgIFBMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUixcclxuICAgIFBMQVlFUl9XRUJSVENfU0VUX0xPQ0FMX0RFU0NfRVJST1IsXHJcbiAgICBQTEFZRVJfV0VCUlRDX05FVFdPUktfU0xPVyxcclxuICAgIFBMQVlFUl9XRUJSVENfVU5FWFBFQ1RFRF9ESVNDT05ORUNULFxyXG4gICAgT01FX1AyUF9NT0RFXHJcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuXHJcblxyXG5jb25zdCBXZWJSVENMb2FkZXIgPSBmdW5jdGlvbiAocHJvdmlkZXIsIHdlYlNvY2tldFVybCwgbG9hZENhbGxiYWNrLCBlcnJvclRyaWdnZXIsIHBsYXllckNvbmZpZykge1xyXG5cclxuICAgIGxldCBkZWZhdWx0Q29ubmVjdGlvbkNvbmZpZyA9IHt9O1xyXG5cclxuICAgIGxldCB0aGF0ID0ge307XHJcblxyXG4gICAgbGV0IHdzID0gbnVsbDtcclxuXHJcbiAgICBsZXQgd3NQaW5nID0gbnVsbDtcclxuXHJcbiAgICBsZXQgbWFpblN0cmVhbSA9IG51bGw7XHJcblxyXG4gICAgLy8gdXNlZCBmb3IgZ2V0dGluZyBtZWRpYSBzdHJlYW0gZnJvbSBPTUUgb3IgaG9zdCBwZWVyXHJcbiAgICBsZXQgbWFpblBlZXJDb25uZWN0aW9uSW5mbyA9IG51bGw7XHJcblxyXG4gICAgLy8gdXNlZCBmb3Igc2VuZCBtZWRpYSBzdHJlYW0gdG8gY2xpZW50IHBlZXIuXHJcbiAgICBsZXQgY2xpZW50UGVlckNvbm5lY3Rpb25zID0ge307XHJcblxyXG4gICAgLy9jbG9zZWQgd2Vic29ja2V0IGJ5IG9tZSBvciBjbGllbnQuXHJcbiAgICBsZXQgd3NDbG9zZWRCeVBsYXllciA9IGZhbHNlO1xyXG5cclxuICAgIGxldCByZWNvcnZlclBhY2tldExvc3MgPSB0cnVlO1xyXG5cclxuICAgIGlmIChwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkud2VicnRjQ29uZmlnICYmXHJcbiAgICAgICAgcGxheWVyQ29uZmlnLmdldENvbmZpZygpLndlYnJ0Y0NvbmZpZy5yZWNvcnZlclBhY2tldExvc3MgPT09IGZhbHNlKSB7XHJcblxyXG4gICAgICAgIHJlY29ydmVyUGFja2V0TG9zcyA9IHBsYXllckNvbmZpZy5nZXRDb25maWcoKS53ZWJydGNDb25maWcucmVjb3J2ZXJQYWNrZXRMb3NzO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBnZW5lcmF0ZVB1YmxpY0NhbmRpZGF0ZSA9IHRydWU7XHJcblxyXG4gICAgaWYgKHBsYXllckNvbmZpZy5nZXRDb25maWcoKS53ZWJydGNDb25maWcgJiZcclxuICAgICAgICBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkud2VicnRjQ29uZmlnLmdlbmVyYXRlUHVibGljQ2FuZGlkYXRlID09PSBmYWxzZSkge1xyXG5cclxuICAgICAgICBnZW5lcmF0ZVB1YmxpY0NhbmRpZGF0ZSA9IHBsYXllckNvbmZpZy5nZXRDb25maWcoKS53ZWJydGNDb25maWcuZ2VuZXJhdGVQdWJsaWNDYW5kaWRhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHN0YXRpc3RpY3NUaW1lciA9IG51bGw7XHJcblxyXG4gICAgbGV0IGN1cnJlbnRCcm93c2VyID0gYW5hbFVzZXJBZ2VudCgpO1xyXG5cclxuICAgIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGV4aXN0aW5nSGFuZGxlciA9IHdpbmRvdy5vbmJlZm9yZXVubG9hZDtcclxuICAgICAgICB3aW5kb3cub25iZWZvcmV1bmxvYWQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKGV4aXN0aW5nSGFuZGxlcikge1xyXG4gICAgICAgICAgICAgICAgZXhpc3RpbmdIYW5kbGVyKGV2ZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJUaGlzIGNhbGxzIGF1dG8gd2hlbiBicm93c2VyIGNsb3NlZC5cIik7XHJcbiAgICAgICAgICAgIGNsb3NlUGVlcigpO1xyXG4gICAgICAgIH1cclxuICAgIH0pKCk7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0UGVlckNvbm5lY3Rpb25CeUlkKGlkKSB7XHJcblxyXG4gICAgICAgIGxldCBwZWVyQ29ubmVjdGlvbiA9IG51bGw7XHJcblxyXG4gICAgICAgIGlmIChtYWluUGVlckNvbm5lY3Rpb25JbmZvICYmIGlkID09PSBtYWluUGVlckNvbm5lY3Rpb25JbmZvLmlkKSB7XHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uID0gbWFpblBlZXJDb25uZWN0aW9uSW5mby5wZWVyQ29ubmVjdGlvbjtcclxuICAgICAgICB9IGVsc2UgaWYgKGNsaWVudFBlZXJDb25uZWN0aW9uc1tpZF0pIHtcclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24gPSBjbGllbnRQZWVyQ29ubmVjdGlvbnNbaWRdLnBlZXJDb25uZWN0aW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHBlZXJDb25uZWN0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGV4dHJhY3RMb3NzUGFja2V0c09uTmV0d29ya1N0YXR1cyhwZWVyQ29ubmVjdGlvbkluZm8pIHtcclxuXHJcbiAgICAgICAgaWYgKHBlZXJDb25uZWN0aW9uSW5mby5zdGF0aXN0aWNzVGltZXIpIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHBlZXJDb25uZWN0aW9uSW5mby5zdGF0aXN0aWNzVGltZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzKSB7XHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMgPSB7fTtcclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5sb3N0UGFja2V0c0FyciA9IFtdO1xyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLnNsb3RMZW5ndGggPSA4OyAvLzggc3RhdGlzdGljcy4gZXZlcnkgMiBzZWNvbmRzXHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMucHJldlBhY2tldHNMb3N0ID0gMDtcclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5hdmc4TG9zc2VzID0gMDtcclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5hdmdNb3JlVGhhblRocmVzaG9sZENvdW50ID0gMDsgIC8vSWYgYXZnOExvc3MgbW9yZSB0aGFuIHRocmVzaG9sZC5cclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy50aHJlc2hvbGQgPSA0MDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBsb3N0UGFja2V0c0FyciA9IHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMubG9zdFBhY2tldHNBcnIsXHJcbiAgICAgICAgICAgIHNsb3RMZW5ndGggPSBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLnNsb3RMZW5ndGgsIC8vOCBzdGF0aXN0aWNzLiBldmVyeSAyIHNlY29uZHNcclxuICAgICAgICAgICAgcHJldlBhY2tldHNMb3N0ID0gcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5wcmV2UGFja2V0c0xvc3QsXHJcbiAgICAgICAgICAgIGF2ZzhMb3NzZXMgPSBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLmF2ZzhMb3NzZXMsXHJcbiAgICAgICAgICAgIC8vIGF2Z01vcmVUaGFuVGhyZXNob2xkQ291bnQgPSBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLmF2Z01vcmVUaGFuVGhyZXNob2xkQ291bnQsICAvL0lmIGF2ZzhMb3NzIG1vcmUgdGhhbiB0aHJlc2hvbGQuXHJcbiAgICAgICAgICAgIHRocmVzaG9sZCA9IHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMudGhyZXNob2xkO1xyXG5cclxuICAgICAgICBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdGlzdGljc1RpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICghcGVlckNvbm5lY3Rpb25JbmZvLnBlZXJDb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5wZWVyQ29ubmVjdGlvbi5nZXRTdGF0cygpLnRoZW4oZnVuY3Rpb24gKHN0YXRzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFzdGF0cykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGxheWVyQ29uZmlnLmdldENvbmZpZygpLmF1dG9GYWxsYmFjayAmJiBzdGF0cykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzdGF0cy5mb3JFYWNoKGZ1bmN0aW9uIChzdGF0ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlLnR5cGUgPT09IFwiaW5ib3VuZC1ydHBcIiAmJiBzdGF0ZS5raW5kID09PSAndmlkZW8nICYmICFzdGF0ZS5pc1JlbW90ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vKHN0YXRlLnBhY2tldHNMb3N0IC0gcHJldlBhY2tldHNMb3N0KSBpcyByZWFsIGN1cnJlbnQgbG9zdC5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYWN0dWFsUGFja2V0TG9zdCA9IHBhcnNlSW50KHN0YXRlLnBhY2tldHNMb3N0KSAtIHBhcnNlSW50KHByZXZQYWNrZXRzTG9zdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9zdFBhY2tldHNBcnIucHVzaChwYXJzZUludChzdGF0ZS5wYWNrZXRzTG9zdCkgLSBwYXJzZUludChwcmV2UGFja2V0c0xvc3QpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9zdFBhY2tldHNBcnIubGVuZ3RoID4gc2xvdExlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb3N0UGFja2V0c0Fyci5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb3N0UGFja2V0c0Fyci5sZW5ndGggPT09IHNsb3RMZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXZnOExvc3NlcyA9IF8ucmVkdWNlKGxvc3RQYWNrZXRzQXJyLCBmdW5jdGlvbiAobWVtbywgbnVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtZW1vICsgbnVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDApIC8gc2xvdExlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXN0OCBMT1NUIFBBQ0tFVCBBVkcgIDogXCIgKyAoYXZnOExvc3NlcyksIFwiQ3VycmVudCBQYWNrZXQgTE9TVDogXCIgKyBhY3R1YWxQYWNrZXRMb3N0LCBcIlRvdGFsIFBhY2tldCBMb3N0OiBcIiArIHN0YXRlLnBhY2tldHNMb3N0LCBsb3N0UGFja2V0c0Fycik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhdmc4TG9zc2VzID4gdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMuYXZnTW9yZVRoYW5UaHJlc2hvbGRDb3VudCA9IHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMuYXZnTW9yZVRoYW5UaHJlc2hvbGRDb3VudCArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLmF2Z01vcmVUaGFuVGhyZXNob2xkQ291bnQgPj0gNjApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIk5FVFdPUksgVU5TVEFCTEVEISEhIFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbUExBWUVSX1dFQlJUQ19ORVRXT1JLX1NMT1ddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLmF2Z01vcmVUaGFuVGhyZXNob2xkQ291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMucHJldlBhY2tldHNMb3N0ID0gc3RhdGUucGFja2V0c0xvc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZXh0cmFjdExvc3NQYWNrZXRzT25OZXR3b3JrU3RhdHVzKHBlZXJDb25uZWN0aW9uSW5mbyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LCAyMDAwKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gcmV0dXJuIC0xIGlmIG5vIG9wdXM7XHJcbiAgICAvLyByZXR1cm4gb3B1cyBmb3JtYXQgbnVtYmVyXHJcbiAgICBmdW5jdGlvbiBnZXRPcHVzRm9ybWF0TnVtYmVyKHNkcCkge1xyXG5cclxuICAgICAgICBjb25zdCBsaW5lcyA9IHNkcC5zcGxpdCgnXFxuJyk7XHJcbiAgICAgICAgbGV0IG9wdXNGb3JtYXROdW1iZXIgPSAtMTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGggLSAxOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgIGxpbmVzW2ldID0gbGluZXNbaV0udG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChsaW5lc1tpXS5pbmRleE9mKCdhPXJ0cG1hcCcpID4gLTEgJiYgbGluZXNbaV0uaW5kZXhPZignb3B1cycpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIC8vIHBhcnNpbmcgXCJhPXJ0cG1hcDoxMDIgT1BVUy80ODAwMC8yXCIgbGluZVxyXG4gICAgICAgICAgICAgICAgb3B1c0Zvcm1hdE51bWJlciA9IGxpbmVzW2ldLnNwbGl0KCcgJylbMF0uc3BsaXQoJzonKVsxXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gb3B1c0Zvcm1hdE51bWJlcjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjaGVja09wdXNJc1N0ZXJlbyhzZHAsIG9wdXNGb3JtYXROdW1iZXIpIHtcclxuXHJcbiAgICAgICAgY29uc3QgbGluZXMgPSBzZHAuc3BsaXQoJ1xcbicpO1xyXG5cclxuICAgICAgICBsZXQgc3RlcmVvID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoIC0gMTsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICBsaW5lc1tpXSA9IGxpbmVzW2ldLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBjaGVjayBzdGVyZW89MSBmcm9tIFwiYT1mbXRwOjEwMiBzcHJvcC1zdGVyZW89MTtzdGVyZW89MTttaW5wdGltZT0xMDt1c2VpbmJhbmRmZWM9MVwiXHJcbiAgICAgICAgICAgIGlmIChsaW5lc1tpXS5pbmRleE9mKCdhPWZtdHA6JyArIG9wdXNGb3JtYXROdW1iZXIpID4gLTEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobGluZXNbaV0uaW5kZXhPZignc3RlcmVvPTEnKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RlcmVvID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc3RlcmVvO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG11bmdlU2RwRm9yY2VTdGVyZW9PcHVzKHNkcCwgb3B1c0Zvcm1hdE51bWJlcikge1xyXG5cclxuICAgICAgICBjb25zdCBsaW5lcyA9IHNkcC5zcGxpdCgnXFxuJyk7XHJcblxyXG4gICAgICAgIC8vIGZpbmQgdGhpcyBsaW5lIGFuZCBtb2RpZnkuIFwiYT1mbXRwOjEwMiBtaW5wdGltZT0xMDt1c2VpbmJhbmRmZWM9MVwiXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGggLSAxOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgIC8vIGNoZWNrIHN0ZXJlbz0xIGZyb20gXCJhPWZtdHA6MTAyIHNwcm9wLXN0ZXJlbz0xO3N0ZXJlbz0xO21pbnB0aW1lPTEwO3VzZWluYmFuZGZlYz0xXCJcclxuICAgICAgICAgICAgaWYgKGxpbmVzW2ldLmluZGV4T2YoJ2E9Zm10cDonICsgb3B1c0Zvcm1hdE51bWJlcikgPiAtMSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChsaW5lc1tpXS5pbmRleE9mKCdzdGVyZW89MScpID09PSAtMSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsaW5lc1tpXSA9IGxpbmVzW2ldICsgJztzdGVyZW89MSc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGxpbmVzLmpvaW4oJ1xcbicpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZU1haW5QZWVyQ29ubmVjdGlvbihpZCwgcGVlcklkLCBzZHAsIGNhbmRpZGF0ZXMsIGljZVNlcnZlcnMsIHJlc29sdmUpIHtcclxuXHJcbiAgICAgICAgbGV0IHBlZXJDb25uZWN0aW9uQ29uZmlnID0ge307XHJcblxyXG4gICAgICAgIC8vIGZpcnN0IHByaW9yaXR5IHVzaW5nIGljZSBzZXJ2ZXJzIGZyb20gcGxheWVyIHNldHRpbmcuXHJcbiAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRDb25maWcoKS53ZWJydGNDb25maWcgJiYgcGxheWVyQ29uZmlnLmdldENvbmZpZygpLndlYnJ0Y0NvbmZpZy5pY2VTZXJ2ZXJzKSB7XHJcblxyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkNvbmZpZy5pY2VTZXJ2ZXJzID0gcGxheWVyQ29uZmlnLmdldENvbmZpZygpLndlYnJ0Y0NvbmZpZy5pY2VTZXJ2ZXJzO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRDb25maWcoKS53ZWJydGNDb25maWcuaWNlVHJhbnNwb3J0UG9saWN5KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25Db25maWcuaWNlVHJhbnNwb3J0UG9saWN5ID0gcGxheWVyQ29uZmlnLmdldENvbmZpZygpLndlYnJ0Y0NvbmZpZy5pY2VUcmFuc3BvcnRQb2xpY3k7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGljZVNlcnZlcnMpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIHNlY29uZCBwcmlvcml0eSB1c2luZyBpY2Ugc2VydmVycyBmcm9tIG9tZSBhbmQgZm9yY2UgdXNpbmcgVENQXHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uQ29uZmlnLmljZVNlcnZlcnMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaWNlU2VydmVycy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBpY2VTZXJ2ZXIgPSBpY2VTZXJ2ZXJzW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCByZWdJY2VTZXJ2ZXIgPSB7fTtcclxuXHJcbiAgICAgICAgICAgICAgICByZWdJY2VTZXJ2ZXIudXJscyA9IGljZVNlcnZlci51cmxzO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBoYXNXZWJzb2NrZXRVcmwgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGxldCBzb2NrZXRVcmwgPSBnZW5lcmF0ZURvbWFpbkZyb21Vcmwod2ViU29ja2V0VXJsKTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJlZ0ljZVNlcnZlci51cmxzLmxlbmd0aDsgaisrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzZXJ2ZXJVcmwgPSByZWdJY2VTZXJ2ZXIudXJsc1tqXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlcnZlclVybC5pbmRleE9mKHNvY2tldFVybCkgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYXNXZWJzb2NrZXRVcmwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFoYXNXZWJzb2NrZXRVcmwpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlZ0ljZVNlcnZlci51cmxzLmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjbG9uZUljZVNlcnZlciA9IF8uY2xvbmUocmVnSWNlU2VydmVyLnVybHNbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXAgPSBmaW5kSXAoY2xvbmVJY2VTZXJ2ZXIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNvY2tldFVybCAmJiBpcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVnSWNlU2VydmVyLnVybHMucHVzaChjbG9uZUljZVNlcnZlci5yZXBsYWNlKGlwLCBzb2NrZXRVcmwpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZWdJY2VTZXJ2ZXIudXNlcm5hbWUgPSBpY2VTZXJ2ZXIudXNlcl9uYW1lO1xyXG4gICAgICAgICAgICAgICAgcmVnSWNlU2VydmVyLmNyZWRlbnRpYWwgPSBpY2VTZXJ2ZXIuY3JlZGVudGlhbDtcclxuXHJcbiAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkNvbmZpZy5pY2VTZXJ2ZXJzLnB1c2gocmVnSWNlU2VydmVyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25Db25maWcuaWNlVHJhbnNwb3J0UG9saWN5ID0gJ3JlbGF5JztcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIC8vIGxhc3QgcHJpb3JpdHkgdXNpbmcgZGVmYXVsdCBpY2Ugc2VydmVycy5cclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25Db25maWcgPSBkZWZhdWx0Q29ubmVjdGlvbkNvbmZpZztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIk1haW4gUGVlciBDb25uZWN0aW9uIENvbmZpZyA6IFwiLCBwZWVyQ29ubmVjdGlvbkNvbmZpZyk7XHJcblxyXG4gICAgICAgIGxldCBwZWVyQ29ubmVjdGlvbiA9IG5ldyBSVENQZWVyQ29ubmVjdGlvbihwZWVyQ29ubmVjdGlvbkNvbmZpZyk7XHJcblxyXG4gICAgICAgIG1haW5QZWVyQ29ubmVjdGlvbkluZm8gPSB7XHJcbiAgICAgICAgICAgIGlkOiBpZCxcclxuICAgICAgICAgICAgcGVlcklkOiBwZWVySWQsXHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uOiBwZWVyQ29ubmVjdGlvblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vU2V0IHJlbW90ZSBkZXNjcmlwdGlvbiB3aGVuIEkgcmVjZWl2ZWQgc2RwIGZyb20gc2VydmVyLlxyXG4gICAgICAgIHBlZXJDb25uZWN0aW9uLnNldFJlbW90ZURlc2NyaXB0aW9uKG5ldyBSVENTZXNzaW9uRGVzY3JpcHRpb24oc2RwKSlcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uLmNyZWF0ZUFuc3dlcigpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRlc2MpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9wdXNGb3JtYXROdW1iZXIgPSBnZXRPcHVzRm9ybWF0TnVtYmVyKHNkcC5zZHApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdXNGb3JtYXROdW1iZXIgPiAtMSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGVja09wdXNJc1N0ZXJlbyhzZHAuc2RwLCBvcHVzRm9ybWF0TnVtYmVyKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0lmIG9mZmVyIGhhcyBvcHVzIGFuZCBpZiBpdCBpcyBzdGVyZW8sIG11bmdlIGxvY2FsIHNkcCB0byBmb3JjZSBzdGVyZW89MVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vVGhhbmtzIHRvIGNvbW11bml0eSBodHRwczovL2dpdGh1Yi5jb20vQWlyZW5Tb2Z0L092ZW5NZWRpYUVuZ2luZS9pc3N1ZXMvMjAzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzYy5zZHAgPSBtdW5nZVNkcEZvcmNlU3RlcmVvT3B1cyhkZXNjLnNkcCwgb3B1c0Zvcm1hdE51bWJlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcImNyZWF0ZSBIb3N0IEFuc3dlciA6IHN1Y2Nlc3NcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbi5zZXRMb2NhbERlc2NyaXB0aW9uKGRlc2MpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbXkgU0RQIGNyZWF0ZWQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbG9jYWxTRFAgPSBwZWVyQ29ubmVjdGlvbi5sb2NhbERlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKCdMb2NhbCBTRFAnLCBsb2NhbFNEUCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VuZE1lc3NhZ2Uod3MsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVlcl9pZDogcGVlcklkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmQ6ICdhbnN3ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNkcDogbG9jYWxTRFBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfV0VCUlRDX1NFVF9SRU1PVEVfREVTQ19FUlJPUl07XHJcbiAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgIGNsb3NlUGVlcih0ZW1wRXJyb3IpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGNhbmRpZGF0ZXMpIHtcclxuXHJcbiAgICAgICAgICAgIGFkZEljZUNhbmRpZGF0ZShwZWVyQ29ubmVjdGlvbiwgY2FuZGlkYXRlcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwZWVyQ29ubmVjdGlvbi5vbmljZWNhbmRpZGF0ZSA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmNhbmRpZGF0ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldlYlJUQ0xvYWRlciBzZW5kIGNhbmRpZGF0ZSB0byBzZXJ2ZXIgOiBcIiAsIGUuY2FuZGlkYXRlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnTWFpbiBQZWVyIENvbm5lY3Rpb24gY2FuZGlkYXRlJywgZS5jYW5kaWRhdGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbmRNZXNzYWdlKHdzLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGlkLFxyXG4gICAgICAgICAgICAgICAgICAgIHBlZXJfaWQ6IHBlZXJJZCxcclxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kOiBcImNhbmRpZGF0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhbmRpZGF0ZXM6IFtlLmNhbmRpZGF0ZV1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBwZWVyQ29ubmVjdGlvbi5vbmNvbm5lY3Rpb25zdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIC8vaWNlQ29ubmVjdGlvblN0YXRlXHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIltvbiBjb25uZWN0aW9uIHN0YXRlIGNoYW5nZV1cIiwgcGVlckNvbm5lY3Rpb24uY29ubmVjdGlvblN0YXRlLCBlKTtcclxuXHJcbiAgICAgICAgfTtcclxuICAgICAgICBwZWVyQ29ubmVjdGlvbi5vbmljZWNvbm5lY3Rpb25zdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIltvbiBpY2UgY29ubmVjdGlvbiBzdGF0ZSBjaGFuZ2VdXCIsIHBlZXJDb25uZWN0aW9uLmljZUNvbm5lY3Rpb25TdGF0ZSwgZSk7XHJcblxyXG4gICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9SVENQZWVyQ29ubmVjdGlvbi9pY2VDb25uZWN0aW9uU3RhdGVcclxuICAgICAgICAgICAgKiBDaGVja3MgdG8gZW5zdXJlIHRoYXQgY29tcG9uZW50cyBhcmUgc3RpbGwgY29ubmVjdGVkIGZhaWxlZCBmb3IgYXQgbGVhc3Qgb25lIGNvbXBvbmVudCBvZiB0aGUgUlRDUGVlckNvbm5lY3Rpb24uIFRoaXMgaXMgYSBsZXNzIHN0cmluZ2VudCB0ZXN0IHRoYW4gXCJmYWlsZWRcIiBhbmQgbWF5IHRyaWdnZXIgaW50ZXJtaXR0ZW50bHkgYW5kIHJlc29sdmUganVzdCBhcyBzcG9udGFuZW91c2x5IG9uIGxlc3MgcmVsaWFibGUgbmV0d29ya3MsIG9yIGR1cmluZyB0ZW1wb3JhcnkgZGlzY29ubmVjdGlvbnMuIFdoZW4gdGhlIHByb2JsZW0gcmVzb2x2ZXMsIHRoZSBjb25uZWN0aW9uIG1heSByZXR1cm4gdG8gdGhlIFwiY29ubmVjdGVkXCIgc3RhdGUuXHJcbiAgICAgICAgICAgICogKi9cclxuICAgICAgICAgICAgLy9UaGlzIHByb2Nlc3MgaXMgbXkgaW1hZ2luYXRpb24uIEkgZG8gbm90IGtub3cgaG93IHRvIHJlcHJvZHVjZS5cclxuICAgICAgICAgICAgLy9TaXR1YXRpb24gOiBPTUUgaXMgZGVhZCBidXQgb21lIGNhbid0IHNlbmQgJ3N0b3AnIG1lc3NhZ2UuXHJcbiAgICAgICAgICAgIGlmIChwZWVyQ29ubmVjdGlvbi5pY2VDb25uZWN0aW9uU3RhdGUgPT09ICdkaXNjb25uZWN0ZWQnIHx8IHBlZXJDb25uZWN0aW9uLmljZUNvbm5lY3Rpb25TdGF0ZSA9PT0gJ2Nsb3NlZCcpIHtcclxuICAgICAgICAgICAgICAgIGlmICghd3NDbG9zZWRCeVBsYXllcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtYWluUGVlckNvbm5lY3Rpb25JbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbUExBWUVSX1dFQlJUQ19VTkVYUEVDVEVEX0RJU0NPTk5FQ1RdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHBlZXJDb25uZWN0aW9uLm9udHJhY2sgPSBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwic3RyZWFtIHJlY2VpdmVkLlwiKTtcclxuXHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZygnUmVjb3ZlcnkgT24gUGFja2V0IExvc3MgOicsIHJlY29ydmVyUGFja2V0TG9zcyk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVjb3J2ZXJQYWNrZXRMb3NzKSB7XHJcbiAgICAgICAgICAgICAgICBleHRyYWN0TG9zc1BhY2tldHNPbk5ldHdvcmtTdGF0dXMobWFpblBlZXJDb25uZWN0aW9uSW5mbyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG1haW5TdHJlYW0gPSBlLnN0cmVhbXNbMF07XHJcbiAgICAgICAgICAgIGxvYWRDYWxsYmFjayhlLnN0cmVhbXNbMF0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBsYXllckNvbmZpZy5nZXRDb25maWcoKS53ZWJydGNDb25maWcgJiYgcGxheWVyQ29uZmlnLmdldENvbmZpZygpLndlYnJ0Y0NvbmZpZy5wbGF5b3V0RGVsYXlIaW50KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGhpbnQgPSBwbGF5ZXJDb25maWcuZ2V0Q29uZmlnKCkud2VicnRjQ29uZmlnLnBsYXlvdXREZWxheUhpbnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVjZWl2ZXJzID0gbWFpblBlZXJDb25uZWN0aW9uSW5mby5wZWVyQ29ubmVjdGlvbi5nZXRSZWNlaXZlcnMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlY2VpdmVycy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVjZWl2ZXIgPSByZWNlaXZlcnNbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJlY2VpdmVyLnBsYXlvdXREZWxheUhpbnQgPSBoaW50O1xyXG4gICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldlYlJUQyBwbGF5b3V0RGVsYXlIaW50XCIsIHJlY2VpdmVyLCBoaW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNsaWVudFBlZXJDb25uZWN0aW9uKGhvc3RJZCwgY2xpZW50SWQpIHtcclxuXHJcbiAgICAgICAgaWYgKCFtYWluU3RyZWFtKSB7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjcmVhdGVDbGllbnRQZWVyQ29ubmVjdGlvbihob3N0SWQsIGNsaWVudElkKTtcclxuICAgICAgICAgICAgfSwgMTAwKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwZWVyQ29ubmVjdGlvbiA9IG5ldyBSVENQZWVyQ29ubmVjdGlvbihkZWZhdWx0Q29ubmVjdGlvbkNvbmZpZyk7XHJcblxyXG4gICAgICAgIGNsaWVudFBlZXJDb25uZWN0aW9uc1tjbGllbnRJZF0gPSB7XHJcbiAgICAgICAgICAgIGlkOiBjbGllbnRJZCxcclxuICAgICAgICAgICAgcGVlcklkOiBob3N0SWQsXHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uOiBwZWVyQ29ubmVjdGlvblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHBlZXJDb25uZWN0aW9uLmFkZFN0cmVhbShtYWluU3RyZWFtKTtcclxuXHJcbiAgICAgICAgLy8gbGV0IG9mZmVyT3B0aW9uID0ge1xyXG4gICAgICAgIC8vICAgICBvZmZlclRvUmVjZWl2ZUF1ZGlvOiAxLFxyXG4gICAgICAgIC8vICAgICBvZmZlclRvUmVjZWl2ZVZpZGVvOiAxXHJcbiAgICAgICAgLy8gfTtcclxuXHJcbiAgICAgICAgcGVlckNvbm5lY3Rpb24uY3JlYXRlT2ZmZXIoc2V0TG9jYWxBbmRTZW5kTWVzc2FnZSwgaGFuZGxlQ3JlYXRlT2ZmZXJFcnJvciwge30pO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZXRMb2NhbEFuZFNlbmRNZXNzYWdlKHNlc3Npb25EZXNjcmlwdGlvbikge1xyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbi5zZXRMb2NhbERlc2NyaXB0aW9uKHNlc3Npb25EZXNjcmlwdGlvbik7XHJcblxyXG4gICAgICAgICAgICBzZW5kTWVzc2FnZSh3cywge1xyXG4gICAgICAgICAgICAgICAgaWQ6IGhvc3RJZCxcclxuICAgICAgICAgICAgICAgIHBlZXJfaWQ6IGNsaWVudElkLFxyXG4gICAgICAgICAgICAgICAgc2RwOiBzZXNzaW9uRGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICBjb21tYW5kOiAnb2ZmZXJfcDJwJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZUNyZWF0ZU9mZmVyRXJyb3IoZXZlbnQpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwZWVyQ29ubmVjdGlvbi5vbmljZWNhbmRpZGF0ZSA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmNhbmRpZGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiV2ViUlRDTG9hZGVyIHNlbmQgY2FuZGlkYXRlIHRvIHNlcnZlciA6IFwiICsgZS5jYW5kaWRhdGUpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnQ2xpZW50IFBlZXIgQ29ubmVjdGlvbiBjYW5kaWRhdGUnLCBlLmNhbmRpZGF0ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2VuZE1lc3NhZ2Uod3MsIHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogaG9zdElkLFxyXG4gICAgICAgICAgICAgICAgICAgIHBlZXJfaWQ6IGNsaWVudElkLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmQ6IFwiY2FuZGlkYXRlX3AycFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNhbmRpZGF0ZXM6IFtlLmNhbmRpZGF0ZV1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2VuZXJhdGVEb21haW5Gcm9tVXJsKHVybCkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSAnJztcclxuICAgICAgICBsZXQgbWF0Y2g7XHJcbiAgICAgICAgaWYgKG1hdGNoID0gdXJsLm1hdGNoKC9eKD86d3NzPzpcXC9cXC8pPyg/OlteQFxcbl0rQCk/KD86d3d3XFwuKT8oW146XFwvXFxuXFw/XFw9XSspL2ltKSkge1xyXG4gICAgICAgICAgICByZXN1bHQgPSBtYXRjaFsxXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZmluZElwKHN0cmluZykge1xyXG5cclxuICAgICAgICBsZXQgcmVzdWx0ID0gJyc7XHJcbiAgICAgICAgbGV0IG1hdGNoO1xyXG5cclxuICAgICAgICBpZiAobWF0Y2ggPSBzdHJpbmcubWF0Y2gobmV3IFJlZ0V4cChcIlxcXFxiKDI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPylcXFxcLigyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT8pXFxcXC4oMjVbMC01XXwyWzAtNF1bMC05XXxbMDFdP1swLTldWzAtOV0/KVxcXFwuKDI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPylcXFxcYlwiLCAnZ2knKSkpIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gbWF0Y2hbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNvcHlDYW5kaWRhdGUoYmFzaWNDYW5kaWRhdGUpIHtcclxuXHJcbiAgICAgICAgbGV0IGNsb25lQ2FuZGlkYXRlID0gXy5jbG9uZShiYXNpY0NhbmRpZGF0ZSk7XHJcblxyXG4gICAgICAgIGxldCBuZXdEb21haW4gPSBnZW5lcmF0ZURvbWFpbkZyb21Vcmwod2ViU29ja2V0VXJsKTtcclxuICAgICAgICBsZXQgaXAgPSBmaW5kSXAoY2xvbmVDYW5kaWRhdGUuY2FuZGlkYXRlKTtcclxuXHJcbiAgICAgICAgaWYgKGlwID09PSAnJyB8fCBpcCA9PT0gbmV3RG9tYWluKSB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgICAgICAvLyBmaXJlZm94IGJyb3dzZXIgdGhyb3dzIGEgY2FuZGlkYXRlIHBhcnNpbmcgZXhjZXB0aW9uIHdoZW4gYSBkb21haW4gbmFtZSBpcyBzZXQgYXQgdGhlIGFkZHJlc3MgcHJvcGVydHkuIFNvIHdlIHJlc29sdmUgdGhlIGRucyB1c2luZyBnb29nbGUgZG5zIHJlc29sdmUgYXBpLlxyXG4gICAgICAgICAgICBpZiAoY3VycmVudEJyb3dzZXIuYnJvd3NlciA9PT0gJ0ZpcmVmb3gnICYmICFmaW5kSXAobmV3RG9tYWluKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGZldGNoKCdodHRwczovL2Rucy5nb29nbGUuY29tL3Jlc29sdmU/bmFtZT0nICsgbmV3RG9tYWluKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHJlc3AgPT4gcmVzcC5qc29uKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLkFuc3dlciAmJiBkYXRhLkFuc3dlci5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuQW5zd2VyWzBdLmRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlbHNvbHZlZElwID0gZGF0YS5BbnN3ZXJbMF0uZGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmVDYW5kaWRhdGUuY2FuZGlkYXRlID0gY2xvbmVDYW5kaWRhdGUuY2FuZGlkYXRlLnJlcGxhY2UoaXAsIHJlbHNvbHZlZElwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGNsb25lQ2FuZGlkYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjbG9uZUNhbmRpZGF0ZS5jYW5kaWRhdGUgPSBjbG9uZUNhbmRpZGF0ZS5jYW5kaWRhdGUucmVwbGFjZShpcCwgbmV3RG9tYWluKTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoY2xvbmVDYW5kaWRhdGUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZEljZUNhbmRpZGF0ZShwZWVyQ29ubmVjdGlvbiwgY2FuZGlkYXRlcykge1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhbmRpZGF0ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGNhbmRpZGF0ZXNbaV0gJiYgY2FuZGlkYXRlc1tpXS5jYW5kaWRhdGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgYmFzaWNDYW5kaWRhdGUgPSBjYW5kaWRhdGVzW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uLmFkZEljZUNhbmRpZGF0ZShuZXcgUlRDSWNlQ2FuZGlkYXRlKGJhc2ljQ2FuZGlkYXRlKSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiYWRkSWNlQ2FuZGlkYXRlIDogc3VjY2Vzc1wiKTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SXTtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChnZW5lcmF0ZVB1YmxpY0NhbmRpZGF0ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2xvbmVDYW5kaWRhdGVQcm9taXNlID0gY29weUNhbmRpZGF0ZShiYXNpY0NhbmRpZGF0ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjbG9uZUNhbmRpZGF0ZVByb21pc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmVDYW5kaWRhdGVQcm9taXNlLnRoZW4oZnVuY3Rpb24gKGNsb25lQ2FuZGlkYXRlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsb25lQ2FuZGlkYXRlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uLmFkZEljZUNhbmRpZGF0ZShuZXcgUlRDSWNlQ2FuZGlkYXRlKGNsb25lQ2FuZGlkYXRlKSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcImNsb25lZCBhZGRJY2VDYW5kaWRhdGUgOiBzdWNjZXNzXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcih0ZW1wRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdFdlYlNvY2tldChyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuXHJcbiAgICAgICAgICAgIHdzID0gbmV3IFdlYlNvY2tldCh3ZWJTb2NrZXRVcmwpO1xyXG5cclxuICAgICAgICAgICAgd3Mub25vcGVuID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbmRNZXNzYWdlKHdzLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZDogXCJyZXF1ZXN0X29mZmVyXCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHdzUGluZyA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgc2VuZE1lc3NhZ2Uod3MsIHtjb21tYW5kOiBcInBpbmdcIn0pO1xyXG4gICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgIC8vIH0sIDIwICogMTAwMCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB3cy5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBKU09OLnBhcnNlKGUuZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9XRUJSVENfV1NfRVJST1JdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IG1lc3NhZ2UuZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhtZXNzYWdlKS5sZW5ndGggPT09IDAgJiYgbWVzc2FnZS5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZygnRW1wdHkgTWVzc2FnZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5jb21tYW5kID09PSAncGluZycpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2VuZE1lc3NhZ2Uod3MsIHtjb21tYW5kOiAncG9uZyd9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFtZXNzYWdlLmlkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZygnSUQgbXVzdCBiZSBub3QgbnVsbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5jb21tYW5kID09PSAnb2ZmZXInKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZU1haW5QZWVyQ29ubmVjdGlvbihtZXNzYWdlLmlkLCBtZXNzYWdlLnBlZXJfaWQsIG1lc3NhZ2Uuc2RwLCBtZXNzYWdlLmNhbmRpZGF0ZXMsIG1lc3NhZ2UuaWNlX3NlcnZlcnMsIHJlc29sdmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLnBlZXJfaWQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihPTUVfUDJQX01PREUsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlci50cmlnZ2VyKE9NRV9QMlBfTU9ERSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLmNvbW1hbmQgPT09ICdyZXF1ZXN0X29mZmVyX3AycCcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlQ2xpZW50UGVlckNvbm5lY3Rpb24obWVzc2FnZS5pZCwgbWVzc2FnZS5wZWVyX2lkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5jb21tYW5kID09PSAnYW5zd2VyX3AycCcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBlZXJDb25uZWN0aW9uMSA9IGdldFBlZXJDb25uZWN0aW9uQnlJZChtZXNzYWdlLnBlZXJfaWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbjEuc2V0UmVtb3RlRGVzY3JpcHRpb24obmV3IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbihtZXNzYWdlLnNkcCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkZXNjKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTLmNvZGVzW1BMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLmNvbW1hbmQgPT09ICdjYW5kaWRhdGUnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIENhbmRpZGF0ZXMgZm9yIG5ldyBjbGllbnQgcGVlclxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwZWVyQ29ubmVjdGlvbjIgPSBnZXRQZWVyQ29ubmVjdGlvbkJ5SWQobWVzc2FnZS5pZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGFkZEljZUNhbmRpZGF0ZShwZWVyQ29ubmVjdGlvbjIsIG1lc3NhZ2UuY2FuZGlkYXRlcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UuY29tbWFuZCA9PT0gJ2NhbmRpZGF0ZV9wMnAnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIENhbmRpZGF0ZXMgZm9yIG5ldyBjbGllbnQgcGVlclxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwZWVyQ29ubmVjdGlvbjMgPSBnZXRQZWVyQ29ubmVjdGlvbkJ5SWQobWVzc2FnZS5wZWVyX2lkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYWRkSWNlQ2FuZGlkYXRlKHBlZXJDb25uZWN0aW9uMywgbWVzc2FnZS5jYW5kaWRhdGVzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5jb21tYW5kID09PSAnc3RvcCcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1haW5QZWVyQ29ubmVjdGlvbkluZm8ucGVlcklkID09PSBtZXNzYWdlLnBlZXJfaWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vTXkgcGFyZW50IHdhcyBkZWFkLiBBbmQgdGhlbiBJIHdpbGwgcmV0cnkuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjbG9zZSBjb25uZWN0aW9uIHdpdGggaG9zdCBhbmQgcmV0cnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2Nsb3NlIGNvbm5lY3Rpb24gd2l0aCBob3N0Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluU3RyZWFtID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFpblBlZXJDb25uZWN0aW9uSW5mby5wZWVyQ29ubmVjdGlvbi5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluUGVlckNvbm5lY3Rpb25JbmZvID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vcmVzZXRDYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlci5wYXVzZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VuZE1lc3NhZ2Uod3MsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmQ6ICdyZXF1ZXN0X29mZmVyJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNsb3NlIGNvbm5lY3Rpb24gd2l0aCBjbGllbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNsaWVudFBlZXJDb25uZWN0aW9uc1ttZXNzYWdlLnBlZXJfaWRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnY2xvc2UgY29ubmVjdGlvbiB3aXRoIGNsaWVudDogJywgbWVzc2FnZS5wZWVyX2lkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudFBlZXJDb25uZWN0aW9uc1ttZXNzYWdlLnBlZXJfaWRdLnBlZXJDb25uZWN0aW9uLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgY2xpZW50UGVlckNvbm5lY3Rpb25zW21lc3NhZ2UucGVlcl9pZF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHdzLm9uY2xvc2UgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF3c0Nsb3NlZEJ5UGxheWVyKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbUExBWUVSX1dFQlJUQ19XU19FUlJPUl07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtYWluUGVlckNvbm5lY3Rpb25JbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvciA9IEVSUk9SUy5jb2Rlc1tQTEFZRVJfV0VCUlRDX1VORVhQRUNURURfRElTQ09OTkVDVF07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHdzLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXJyb3IpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvL1doeSBFZGdlIEJyb3dzZXIgY2FsbHMgb25lcnJvcigpIHdoZW4gd3MuY2xvc2UoKT9cclxuICAgICAgICAgICAgICAgIGlmICghd3NDbG9zZWRCeVBsYXllcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlMuY29kZXNbUExBWUVSX1dFQlJUQ19XU19FUlJPUl07XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuXHJcbiAgICAgICAgICAgIGNsb3NlUGVlcihlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldlYlJUQ0xvYWRlciBjb25uZWN0aW5nLi4uXCIpO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG5cclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiV2ViUlRDTG9hZGVyIHVybCA6IFwiICsgd2ViU29ja2V0VXJsKTtcclxuXHJcbiAgICAgICAgICAgIGluaXRXZWJTb2NrZXQocmVzb2x2ZSwgcmVqZWN0KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZVBlZXIoZXJyb3IpIHtcclxuXHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKCdXZWJSVEMgTG9hZGVyIGNsb3NlUGVlcigpJyk7XHJcblxyXG4gICAgICAgIGlmICghZXJyb3IpIHtcclxuICAgICAgICAgICAgd3NDbG9zZWRCeVBsYXllciA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobWFpblBlZXJDb25uZWN0aW9uSW5mbykge1xyXG5cclxuICAgICAgICAgICAgaWYgKG1haW5QZWVyQ29ubmVjdGlvbkluZm8uc3RhdGlzdGljc1RpbWVyKSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQobWFpblBlZXJDb25uZWN0aW9uSW5mby5zdGF0aXN0aWNzVGltZXIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBtYWluU3RyZWFtID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZygnQ2xvc2luZyBtYWluIHBlZXIgY29ubmVjdGlvbi4uLicpO1xyXG4gICAgICAgICAgICBpZiAoc3RhdGlzdGljc1RpbWVyKSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoc3RhdGlzdGljc1RpbWVyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG1haW5QZWVyQ29ubmVjdGlvbkluZm8ucGVlckNvbm5lY3Rpb24pIHtcclxuXHJcbiAgICAgICAgICAgICAgICBtYWluUGVlckNvbm5lY3Rpb25JbmZvLnBlZXJDb25uZWN0aW9uLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG1haW5QZWVyQ29ubmVjdGlvbkluZm8ucGVlckNvbm5lY3Rpb24gPSBudWxsO1xyXG4gICAgICAgICAgICBtYWluUGVlckNvbm5lY3Rpb25JbmZvID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhjbGllbnRQZWVyQ29ubmVjdGlvbnMpLmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGNsaWVudElkIGluIGNsaWVudFBlZXJDb25uZWN0aW9ucykge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBjbGllbnRQZWVyQ29ubmVjdGlvbiA9IGNsaWVudFBlZXJDb25uZWN0aW9uc1tjbGllbnRJZF0ucGVlckNvbm5lY3Rpb247XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNsaWVudFBlZXJDb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKCdDbG9zaW5nIGNsaWVudCBwZWVyIGNvbm5lY3Rpb24uLi4nKTtcclxuICAgICAgICAgICAgICAgICAgICBjbGllbnRQZWVyQ29ubmVjdGlvbi5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsaWVudFBlZXJDb25uZWN0aW9uID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY2xpZW50UGVlckNvbm5lY3Rpb25zID0ge307XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjbGVhckludGVydmFsKHdzUGluZyk7XHJcbiAgICAgICAgd3NQaW5nID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKHdzKSB7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZygnQ2xvc2luZyB3ZWJzb2NrZXQgY29ubmVjdGlvbi4uLicpO1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJTZW5kIFNpZ25hbGluZyA6IFN0b3AuXCIpO1xyXG4gICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAwIChDT05ORUNUSU5HKVxyXG4gICAgICAgICAgICAxIChPUEVOKVxyXG4gICAgICAgICAgICAyIChDTE9TSU5HKVxyXG4gICAgICAgICAgICAzIChDTE9TRUQpXHJcbiAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGlmICh3cy5yZWFkeVN0YXRlID09PSAwIHx8IHdzLnJlYWR5U3RhdGUgPT09IDEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB3c0Nsb3NlZEJ5UGxheWVyID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWFpblBlZXJDb25uZWN0aW9uSW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbmRNZXNzYWdlKHdzLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmQ6ICdzdG9wJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IG1haW5QZWVyQ29ubmVjdGlvbkluZm8uaWRcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB3cy5jbG9zZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHdzQ2xvc2VkQnlQbGF5ZXIgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHdzID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGVycm9yVHJpZ2dlcihlcnJvciwgcHJvdmlkZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZW5kTWVzc2FnZSh3cywgbWVzc2FnZSkge1xyXG5cclxuICAgICAgICBpZiAod3MpIHtcclxuICAgICAgICAgICAgd3Muc2VuZChKU09OLnN0cmluZ2lmeShtZXNzYWdlKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICB0aGF0LmNvbm5lY3QgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGluaXRpYWxpemUoKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT4ge1xyXG4gICAgICAgIGNsb3NlUGVlcigpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFdlYlJUQ0xvYWRlcjtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==