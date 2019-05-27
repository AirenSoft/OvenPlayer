/*! OvenPlayerv0.9.589 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
                //that.play();
            };

            webrtcLoader = (0, _WebRTCLoader2["default"])(that, source.file, loadCallback, _utils.errorTrigger);

            webrtcLoader.connect()["catch"](function (error) {
                //that.destroy();
                //Do nothing
            });
        }
    });
    superDestroy_func = that["super"]('destroy');

    OvenPlayerConsole.log("WEBRTC PROVIDER LOADED.");

    that.destroy = function () {
        if (webrtcLoader) {
            webrtcLoader.destroy();
            webrtcLoader = null;
        }
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

var WebRTCLoader = function WebRTCLoader(provider, webSocketUrl, loadCallback, errorTrigger) {

    var peerConnectionConfig = {
        'iceServers': [{
            'urls': 'stun:stun.l.google.com:19302'
        }]
    };

    var that = {};

    var ws = null;

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

        if (!peerConnectionInfo.status) {
            peerConnectionInfo.status = {};
            peerConnectionInfo.status.lostPacketsArr = [];
            peerConnectionInfo.status.slotLength = 8; //8 statistics. every 2 seconds
            peerConnectionInfo.status.prevPacketsLost = 0;
            peerConnectionInfo.status.avg8Losses = 0;
            peerConnectionInfo.status.avgMoreThanThresholdCount = 0; //If avg8Loss more than threshold.
            peerConnectionInfo.status.threshold = 20;
        }

        var lostPacketsArr = peerConnectionInfo.status.lostPacketsArr,
            slotLength = peerConnectionInfo.status.slotLength,
            //8 statistics. every 2 seconds
        prevPacketsLost = peerConnectionInfo.status.prevPacketsLost,
            avg8Losses = peerConnectionInfo.status.avg8Losses,
            avgMoreThanThresholdCount = peerConnectionInfo.status.avgMoreThanThresholdCount,
            //If avg8Loss more than threshold.
        threshold = peerConnectionInfo.status.threshold;

        peerConnectionInfo.statisticsTimer = setTimeout(function () {
            if (!peerConnectionInfo.peerConnection) {
                return false;
            }
            peerConnectionInfo.peerConnection.getStats().then(function (stats) {
                stats.forEach(function (state) {
                    if (state.type === "inbound-rtp" && !state.isRemote) {

                        //(state.packetsLost - prevPacketsLost) is real current lost.
                        lostPacketsArr.push(parseInt(state.packetsLost) - parseInt(prevPacketsLost));

                        if (lostPacketsArr.length > slotLength) {
                            lostPacketsArr = lostPacketsArr.slice(lostPacketsArr.length - slotLength, lostPacketsArr.length);
                            avg8Losses = _underscore2["default"].reduce(lostPacketsArr, function (memo, num) {
                                return memo + num;
                            }, 0) / slotLength;
                            OvenPlayerConsole.log("Last8 LOST PACKET AVG  : " + avg8Losses, state.packetsLost, lostPacketsArr);
                            if (avg8Losses > threshold) {
                                avgMoreThanThresholdCount++;
                                if (avgMoreThanThresholdCount === 3) {
                                    OvenPlayerConsole.log("NETWORK UNSTABLED!!! ");
                                    // clearTimeout(statisticsTimer);
                                    // provider.trigger(NETWORK_UNSTABLED);
                                    closePeer(_constants.NETWORK_UNSTABLED);
                                }
                            } else {
                                avgMoreThanThresholdCount = 0;
                            }
                        }

                        prevPacketsLost = state.packetsLost;
                    }
                });

                extractLossPacketsOnNetworkStatus(peerConnectionInfo);
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

                    var tempError = _constants.ERRORS[_constants.PLAYER_WEBRTC_SET_LOCAL_DESC_ERROR];
                    tempError.error = error;
                    closePeer(tempError);
                });
            })["catch"](function (error) {
                var tempError = _constants.ERRORS[_constants.PLAYER_WEBRTC_CREATE_ANSWER_ERROR];
                tempError.error = error;
                closePeer(tempError);
            });
        })["catch"](function (error) {
            var tempError = _constants.ERRORS[_constants.PLAYER_WEBRTC_SET_REMOTE_DESC_ERROR];
            tempError.error = error;
            closePeer(tempError);
        });

        if (candidates) {
            console.log("[Message candidates]", candidates);
            addIceCandidate(peerConnection, candidates);
        }

        peerConnection.onicecandidate = function (e) {
            if (e.candidate) {
                console.log("[onicecandidate]", e.candidate);
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
        console.log(ip, newDomain);
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

                peerConnection.addIceCandidate(new RTCIceCandidate(basicCandidate)).then(function () {
                    OvenPlayerConsole.log("addIceCandidate : success");
                })["catch"](function (error) {
                    var tempError = _constants.ERRORS[_constants.PLAYER_WEBRTC_ADD_ICECANDIDATE_ERROR];
                    tempError.error = error;
                    closePeer(tempError);
                });
                if (cloneCandidate) {
                    peerConnection.addIceCandidate(new RTCIceCandidate(cloneCandidate)).then(function () {
                        console.log("cloneCandidate addIceCandidate : success");
                    })["catch"](function (error) {
                        var tempError = _constants.ERRORS[_constants.PLAYER_WEBRTC_ADD_ICECANDIDATE_ERROR];
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

                // console.log('웹소켓 열림');

                sendMessage(ws, {
                    command: "request_offer"
                });
            };

            ws.onmessage = function (e) {

                var message = JSON.parse(e.data);

                // console.log('Receive message', message);

                if (message.error) {
                    var tempError = _constants.ERRORS[_constants.PLAYER_WEBRTC_WS_ERROR];
                    tempError.error = message.error;
                    closePeer(tempError);
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
                        var tempError = _constants.ERRORS[_constants.PLAYER_WEBRTC_SET_REMOTE_DESC_ERROR];
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
                    var tempError = _constants.ERRORS[_constants.PLAYER_WEBRTC_WS_ERROR];
                    closePeer(tempError);
                }
            };

            ws.onerror = function (error) {
                //Why Edge Browser calls onerror() when ws.close()?
                if (!wsClosedByPlayer) {
                    var tempError = _constants.ERRORS[_constants.PLAYER_WEBRTC_WS_ERROR];
                    tempError.error = error;
                    closePeer(tempError);
                    reject(error);
                }
            };
        } catch (error) {

            console.error(error);
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

        OvenPlayerConsole.log('WebRTC Loader closePeear()');
        if (ws) {
            OvenPlayerConsole.log('Closing websocket connection...');
            OvenPlayerConsole.log("Send Signaling : Stop.");
            /*
            0 (CONNECTING)
            1 (OPEN)
            2 (CLOSING)
            3 (CLOSED)
            */
            if (ws.readyState === 1) {

                if (mainPeerConnectionInfo) {
                    sendMessage(ws, {
                        command: 'stop',
                        id: mainPeerConnectionInfo.id
                    });
                }
                wsClosedByPlayer = true;
                ws.close();
            }
            ws = null;
        } else {
            wsClosedByPlayer = false;
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

        if (error) {
            errorTrigger(error, provider);
        }
    }

    function sendMessage(ws, message) {

        // console.log('Send Message', message);
        ws.send(JSON.stringify(message));
    }

    that.connect = function () {
        return initialize();
    };

    that.destroy = function () {
        // console.log("WEBRTC LOADER destroy");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9XZWJSVEMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvV2ViUlRDTG9hZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9hZGFwdGVyLmpzIl0sIm5hbWVzIjpbIldlYlJUQyIsImVsZW1lbnQiLCJwbGF5ZXJDb25maWciLCJhZFRhZ1VybCIsInRoYXQiLCJ3ZWJydGNMb2FkZXIiLCJzdXBlckRlc3Ryb3lfZnVuYyIsInNwZWMiLCJuYW1lIiwiUFJPVklERVJfV0VCUlRDIiwibXNlIiwibGlzdGVuZXIiLCJjYW5TZWVrIiwiaXNMaXZlIiwic2Vla2luZyIsInN0YXRlIiwiU1RBVEVfSURMRSIsImJ1ZmZlciIsImZyYW1lcmF0ZSIsImN1cnJlbnRRdWFsaXR5IiwiY3VycmVudFNvdXJjZSIsInF1YWxpdHlMZXZlbHMiLCJzb3VyY2VzIiwic291cmNlIiwiZmlsZSIsInR5cGUiLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImRlc3Ryb3kiLCJsb2FkQ2FsbGJhY2siLCJzdHJlYW0iLCJzcmNPYmplY3QiLCJlcnJvclRyaWdnZXIiLCJjb25uZWN0IiwiZXJyb3IiLCJXZWJSVENMb2FkZXIiLCJwcm92aWRlciIsIndlYlNvY2tldFVybCIsInBlZXJDb25uZWN0aW9uQ29uZmlnIiwid3MiLCJtYWluU3RyZWFtIiwibWFpblBlZXJDb25uZWN0aW9uSW5mbyIsImNsaWVudFBlZXJDb25uZWN0aW9ucyIsIndzQ2xvc2VkQnlQbGF5ZXIiLCJzdGF0aXN0aWNzVGltZXIiLCJleGlzdGluZ0hhbmRsZXIiLCJ3aW5kb3ciLCJvbmJlZm9yZXVubG9hZCIsImV2ZW50IiwiY2xvc2VQZWVyIiwiZ2V0UGVlckNvbm5lY3Rpb25CeUlkIiwiaWQiLCJwZWVyQ29ubmVjdGlvbiIsImV4dHJhY3RMb3NzUGFja2V0c09uTmV0d29ya1N0YXR1cyIsInBlZXJDb25uZWN0aW9uSW5mbyIsInN0YXR1cyIsImxvc3RQYWNrZXRzQXJyIiwic2xvdExlbmd0aCIsInByZXZQYWNrZXRzTG9zdCIsImF2ZzhMb3NzZXMiLCJhdmdNb3JlVGhhblRocmVzaG9sZENvdW50IiwidGhyZXNob2xkIiwic2V0VGltZW91dCIsImdldFN0YXRzIiwidGhlbiIsInN0YXRzIiwiZm9yRWFjaCIsImlzUmVtb3RlIiwicHVzaCIsInBhcnNlSW50IiwicGFja2V0c0xvc3QiLCJsZW5ndGgiLCJzbGljZSIsIl8iLCJyZWR1Y2UiLCJtZW1vIiwibnVtIiwiTkVUV09SS19VTlNUQUJMRUQiLCJjcmVhdGVNYWluUGVlckNvbm5lY3Rpb24iLCJwZWVySWQiLCJzZHAiLCJjYW5kaWRhdGVzIiwicmVzb2x2ZSIsIlJUQ1BlZXJDb25uZWN0aW9uIiwic2V0UmVtb3RlRGVzY3JpcHRpb24iLCJSVENTZXNzaW9uRGVzY3JpcHRpb24iLCJjcmVhdGVBbnN3ZXIiLCJkZXNjIiwic2V0TG9jYWxEZXNjcmlwdGlvbiIsImxvY2FsU0RQIiwibG9jYWxEZXNjcmlwdGlvbiIsInNlbmRNZXNzYWdlIiwicGVlcl9pZCIsImNvbW1hbmQiLCJ0ZW1wRXJyb3IiLCJFUlJPUlMiLCJQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19DUkVBVEVfQU5TV0VSX0VSUk9SIiwiUExBWUVSX1dFQlJUQ19TRVRfUkVNT1RFX0RFU0NfRVJST1IiLCJjb25zb2xlIiwiYWRkSWNlQ2FuZGlkYXRlIiwib25pY2VjYW5kaWRhdGUiLCJlIiwiY2FuZGlkYXRlIiwib250cmFjayIsInN0cmVhbXMiLCJjcmVhdGVDbGllbnRQZWVyQ29ubmVjdGlvbiIsImhvc3RJZCIsImNsaWVudElkIiwiYWRkU3RyZWFtIiwiY3JlYXRlT2ZmZXIiLCJzZXRMb2NhbEFuZFNlbmRNZXNzYWdlIiwiaGFuZGxlQ3JlYXRlT2ZmZXJFcnJvciIsInNlc3Npb25EZXNjcmlwdGlvbiIsImNvcHlDYW5kaWRhdGUiLCJiYXNpY0NhbmRpZGF0ZSIsImNsb25lQ2FuZGlkYXRlIiwiY2xvbmUiLCJnZW5lcmF0ZURvbWFpbkZyb21VcmwiLCJ1cmwiLCJyZXN1bHQiLCJtYXRjaCIsImZpbmRJcCIsIlJlZ0V4cCIsIm5ld0RvbWFpbiIsImlwIiwicmVwbGFjZSIsImkiLCJSVENJY2VDYW5kaWRhdGUiLCJQTEFZRVJfV0VCUlRDX0FERF9JQ0VDQU5ESURBVEVfRVJST1IiLCJpbml0V2ViU29ja2V0IiwicmVqZWN0IiwiV2ViU29ja2V0Iiwib25vcGVuIiwib25tZXNzYWdlIiwibWVzc2FnZSIsIkpTT04iLCJwYXJzZSIsImRhdGEiLCJQTEFZRVJfV0VCUlRDX1dTX0VSUk9SIiwidHJpZ2dlciIsIk9NRV9QMlBfTU9ERSIsInBlZXJDb25uZWN0aW9uMSIsInBlZXJDb25uZWN0aW9uMiIsInBlZXJDb25uZWN0aW9uMyIsImNsb3NlIiwicGF1c2UiLCJvbmNsb3NlIiwib25lcnJvciIsImluaXRpYWxpemUiLCJQcm9taXNlIiwicmVhZHlTdGF0ZSIsImNsZWFyVGltZW91dCIsIk9iamVjdCIsImtleXMiLCJjbGllbnRQZWVyQ29ubmVjdGlvbiIsInNlbmQiLCJzdHJpbmdpZnkiLCJmIiwiZXhwb3J0cyIsIm1vZHVsZSIsImRlZmluZSIsInQiLCJuIiwiciIsInMiLCJvIiwidSIsImEiLCJyZXF1aXJlIiwiRXJyb3IiLCJjb2RlIiwibCIsImNhbGwiLCJTRFBVdGlscyIsIndyaXRlTWVkaWFTZWN0aW9uIiwidHJhbnNjZWl2ZXIiLCJjYXBzIiwiZHRsc1JvbGUiLCJ3cml0ZVJ0cERlc2NyaXB0aW9uIiwia2luZCIsIndyaXRlSWNlUGFyYW1ldGVycyIsImljZUdhdGhlcmVyIiwiZ2V0TG9jYWxQYXJhbWV0ZXJzIiwid3JpdGVEdGxzUGFyYW1ldGVycyIsImR0bHNUcmFuc3BvcnQiLCJtaWQiLCJydHBTZW5kZXIiLCJydHBSZWNlaXZlciIsInRyYWNrSWQiLCJfaW5pdGlhbFRyYWNrSWQiLCJ0cmFjayIsIm1zaWQiLCJzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzIiwic3NyYyIsInJ0eCIsImxvY2FsQ05hbWUiLCJmaWx0ZXJJY2VTZXJ2ZXJzIiwiaWNlU2VydmVycyIsImVkZ2VWZXJzaW9uIiwiaGFzVHVybiIsImZpbHRlciIsInNlcnZlciIsInVybHMiLCJ3YXJuIiwiaXNTdHJpbmciLCJ2YWxpZFR1cm4iLCJpbmRleE9mIiwiZ2V0Q29tbW9uQ2FwYWJpbGl0aWVzIiwibG9jYWxDYXBhYmlsaXRpZXMiLCJyZW1vdGVDYXBhYmlsaXRpZXMiLCJjb21tb25DYXBhYmlsaXRpZXMiLCJjb2RlY3MiLCJoZWFkZXJFeHRlbnNpb25zIiwiZmVjTWVjaGFuaXNtcyIsImZpbmRDb2RlY0J5UGF5bG9hZFR5cGUiLCJwdCIsInBheWxvYWRUeXBlIiwicHJlZmVycmVkUGF5bG9hZFR5cGUiLCJydHhDYXBhYmlsaXR5TWF0Y2hlcyIsImxSdHgiLCJyUnR4IiwibENvZGVjcyIsInJDb2RlY3MiLCJsQ29kZWMiLCJwYXJhbWV0ZXJzIiwiYXB0IiwickNvZGVjIiwidG9Mb3dlckNhc2UiLCJjbG9ja1JhdGUiLCJudW1DaGFubmVscyIsIk1hdGgiLCJtaW4iLCJydGNwRmVlZGJhY2siLCJmYiIsImoiLCJwYXJhbWV0ZXIiLCJsSGVhZGVyRXh0ZW5zaW9uIiwickhlYWRlckV4dGVuc2lvbiIsInVyaSIsImlzQWN0aW9uQWxsb3dlZEluU2lnbmFsaW5nU3RhdGUiLCJhY3Rpb24iLCJzaWduYWxpbmdTdGF0ZSIsIm9mZmVyIiwiYW5zd2VyIiwibWF5YmVBZGRDYW5kaWRhdGUiLCJpY2VUcmFuc3BvcnQiLCJhbHJlYWR5QWRkZWQiLCJnZXRSZW1vdGVDYW5kaWRhdGVzIiwiZmluZCIsInJlbW90ZUNhbmRpZGF0ZSIsImZvdW5kYXRpb24iLCJwb3J0IiwicHJpb3JpdHkiLCJwcm90b2NvbCIsImFkZFJlbW90ZUNhbmRpZGF0ZSIsIm1ha2VFcnJvciIsImRlc2NyaXB0aW9uIiwiTm90U3VwcG9ydGVkRXJyb3IiLCJJbnZhbGlkU3RhdGVFcnJvciIsIkludmFsaWRBY2Nlc3NFcnJvciIsIlR5cGVFcnJvciIsInVuZGVmaW5lZCIsIk9wZXJhdGlvbkVycm9yIiwiYWRkVHJhY2tUb1N0cmVhbUFuZEZpcmVFdmVudCIsImFkZFRyYWNrIiwiZGlzcGF0Y2hFdmVudCIsIk1lZGlhU3RyZWFtVHJhY2tFdmVudCIsInJlbW92ZVRyYWNrRnJvbVN0cmVhbUFuZEZpcmVFdmVudCIsInJlbW92ZVRyYWNrIiwiZmlyZUFkZFRyYWNrIiwicGMiLCJyZWNlaXZlciIsInRyYWNrRXZlbnQiLCJFdmVudCIsIl9kaXNwYXRjaEV2ZW50IiwiY29uZmlnIiwiX2V2ZW50VGFyZ2V0IiwiZG9jdW1lbnQiLCJjcmVhdGVEb2N1bWVudEZyYWdtZW50IiwibWV0aG9kIiwiYmluZCIsImNhblRyaWNrbGVJY2VDYW5kaWRhdGVzIiwibmVlZE5lZ290aWF0aW9uIiwibG9jYWxTdHJlYW1zIiwicmVtb3RlU3RyZWFtcyIsInJlbW90ZURlc2NyaXB0aW9uIiwiaWNlQ29ubmVjdGlvblN0YXRlIiwiY29ubmVjdGlvblN0YXRlIiwiaWNlR2F0aGVyaW5nU3RhdGUiLCJ1c2luZ0J1bmRsZSIsImJ1bmRsZVBvbGljeSIsInJ0Y3BNdXhQb2xpY3kiLCJpY2VUcmFuc3BvcnRQb2xpY3kiLCJfaWNlR2F0aGVyZXJzIiwiaWNlQ2FuZGlkYXRlUG9vbFNpemUiLCJSVENJY2VHYXRoZXJlciIsImdhdGhlclBvbGljeSIsIl9jb25maWciLCJ0cmFuc2NlaXZlcnMiLCJfc2RwU2Vzc2lvbklkIiwiZ2VuZXJhdGVTZXNzaW9uSWQiLCJfc2RwU2Vzc2lvblZlcnNpb24iLCJfZHRsc1JvbGUiLCJfaXNDbG9zZWQiLCJwcm90b3R5cGUiLCJvbmFkZHN0cmVhbSIsIm9ucmVtb3Zlc3RyZWFtIiwib25zaWduYWxpbmdzdGF0ZWNoYW5nZSIsIm9uaWNlY29ubmVjdGlvbnN0YXRlY2hhbmdlIiwib25jb25uZWN0aW9uc3RhdGVjaGFuZ2UiLCJvbmljZWdhdGhlcmluZ3N0YXRlY2hhbmdlIiwib25uZWdvdGlhdGlvbm5lZWRlZCIsIm9uZGF0YWNoYW5uZWwiLCJfZW1pdEdhdGhlcmluZ1N0YXRlQ2hhbmdlIiwiZ2V0Q29uZmlndXJhdGlvbiIsImdldExvY2FsU3RyZWFtcyIsImdldFJlbW90ZVN0cmVhbXMiLCJfY3JlYXRlVHJhbnNjZWl2ZXIiLCJkb05vdEFkZCIsImhhc0J1bmRsZVRyYW5zcG9ydCIsInJlY3ZFbmNvZGluZ1BhcmFtZXRlcnMiLCJhc3NvY2lhdGVkUmVtb3RlTWVkaWFTdHJlYW1zIiwid2FudFJlY2VpdmUiLCJ0cmFuc3BvcnRzIiwiX2NyZWF0ZUljZUFuZER0bHNUcmFuc3BvcnRzIiwiYWxyZWFkeUV4aXN0cyIsIl9tYXliZUZpcmVOZWdvdGlhdGlvbk5lZWRlZCIsIlJUQ1J0cFNlbmRlciIsImdldFRyYWNrcyIsImNsb25lZFN0cmVhbSIsImlkeCIsImNsb25lZFRyYWNrIiwiYWRkRXZlbnRMaXN0ZW5lciIsImVuYWJsZWQiLCJzZW5kZXIiLCJzdG9wIiwibWFwIiwic3BsaWNlIiwicmVtb3ZlU3RyZWFtIiwiZ2V0U2VuZGVycyIsImdldFJlY2VpdmVycyIsIl9jcmVhdGVJY2VHYXRoZXJlciIsInNkcE1MaW5lSW5kZXgiLCJzaGlmdCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJ3cml0YWJsZSIsImJ1ZmZlcmVkQ2FuZGlkYXRlRXZlbnRzIiwiYnVmZmVyQ2FuZGlkYXRlcyIsImVuZCIsIl9nYXRoZXIiLCJvbmxvY2FsY2FuZGlkYXRlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImV2dCIsInNkcE1pZCIsImNhbmQiLCJjb21wb25lbnQiLCJ1ZnJhZyIsInVzZXJuYW1lRnJhZ21lbnQiLCJzZXJpYWxpemVkQ2FuZGlkYXRlIiwid3JpdGVDYW5kaWRhdGUiLCJwYXJzZUNhbmRpZGF0ZSIsInRvSlNPTiIsInNlY3Rpb25zIiwiZ2V0TWVkaWFTZWN0aW9ucyIsImdldERlc2NyaXB0aW9uIiwiam9pbiIsImNvbXBsZXRlIiwiZXZlcnkiLCJSVENJY2VUcmFuc3BvcnQiLCJvbmljZXN0YXRlY2hhbmdlIiwiX3VwZGF0ZUljZUNvbm5lY3Rpb25TdGF0ZSIsIl91cGRhdGVDb25uZWN0aW9uU3RhdGUiLCJSVENEdGxzVHJhbnNwb3J0Iiwib25kdGxzc3RhdGVjaGFuZ2UiLCJfZGlzcG9zZUljZUFuZER0bHNUcmFuc3BvcnRzIiwiX3RyYW5zY2VpdmUiLCJyZWN2IiwicGFyYW1zIiwiZW5jb2RpbmdzIiwicnRjcCIsImNuYW1lIiwiY29tcG91bmQiLCJydGNwUGFyYW1ldGVycyIsInAiLCJyZWNlaXZlIiwic2Vzc2lvbnBhcnQiLCJzcGxpdFNlY3Rpb25zIiwibWVkaWFTZWN0aW9uIiwicGFyc2VSdHBQYXJhbWV0ZXJzIiwiaXNJY2VMaXRlIiwibWF0Y2hQcmVmaXgiLCJyZWplY3RlZCIsImlzUmVqZWN0ZWQiLCJyZW1vdGVJY2VQYXJhbWV0ZXJzIiwiZ2V0SWNlUGFyYW1ldGVycyIsInJlbW90ZUR0bHNQYXJhbWV0ZXJzIiwiZ2V0RHRsc1BhcmFtZXRlcnMiLCJyb2xlIiwic3RhcnQiLCJfdXBkYXRlU2lnbmFsaW5nU3RhdGUiLCJyZWNlaXZlckxpc3QiLCJpY2VPcHRpb25zIiwic3Vic3RyIiwic3BsaXQiLCJsaW5lcyIsInNwbGl0TGluZXMiLCJnZXRLaW5kIiwiZGlyZWN0aW9uIiwiZ2V0RGlyZWN0aW9uIiwicmVtb3RlTXNpZCIsInBhcnNlTXNpZCIsImdldE1pZCIsImdlbmVyYXRlSWRlbnRpZmllciIsInBhcnNlUnRwRW5jb2RpbmdQYXJhbWV0ZXJzIiwicGFyc2VSdGNwUGFyYW1ldGVycyIsImlzQ29tcGxldGUiLCJjYW5kcyIsInNldFRyYW5zcG9ydCIsInNldFJlbW90ZUNhbmRpZGF0ZXMiLCJSVENSdHBSZWNlaXZlciIsImdldENhcGFiaWxpdGllcyIsImNvZGVjIiwiaXNOZXdUcmFjayIsIk1lZGlhU3RyZWFtIiwiZ2V0IiwibmF0aXZlVHJhY2siLCJzaWQiLCJpdGVtIiwibmV3U3RhdGUiLCJzdGF0ZXMiLCJjbG9zZWQiLCJjaGVja2luZyIsImNvbm5lY3RlZCIsImNvbXBsZXRlZCIsImRpc2Nvbm5lY3RlZCIsImZhaWxlZCIsImNvbm5lY3RpbmciLCJudW1BdWRpb1RyYWNrcyIsIm51bVZpZGVvVHJhY2tzIiwib2ZmZXJPcHRpb25zIiwiYXJndW1lbnRzIiwibWFuZGF0b3J5Iiwib3B0aW9uYWwiLCJvZmZlclRvUmVjZWl2ZUF1ZGlvIiwib2ZmZXJUb1JlY2VpdmVWaWRlbyIsIndyaXRlU2Vzc2lvbkJvaWxlcnBsYXRlIiwicmVtb3RlQ29kZWMiLCJoZHJFeHQiLCJyZW1vdGVFeHRlbnNpb25zIiwickhkckV4dCIsImdldExvY2FsQ2FuZGlkYXRlcyIsIm1lZGlhU2VjdGlvbnNJbk9mZmVyIiwibG9jYWxUcmFjayIsImdldEF1ZGlvVHJhY2tzIiwiZ2V0VmlkZW9UcmFja3MiLCJoYXNSdHgiLCJjIiwicmVkdWNlZFNpemUiLCJjYW5kaWRhdGVTdHJpbmciLCJ0cmltIiwicHJvbWlzZXMiLCJmaXhTdGF0c1R5cGUiLCJzdGF0IiwiaW5ib3VuZHJ0cCIsIm91dGJvdW5kcnRwIiwiY2FuZGlkYXRlcGFpciIsImxvY2FsY2FuZGlkYXRlIiwicmVtb3RlY2FuZGlkYXRlIiwicmVzdWx0cyIsIk1hcCIsImFsbCIsInJlcyIsInNldCIsIm1ldGhvZHMiLCJuYXRpdmVNZXRob2QiLCJhcmdzIiwiYXBwbHkiLCJyYW5kb20iLCJ0b1N0cmluZyIsImJsb2IiLCJsaW5lIiwicGFydHMiLCJwYXJ0IiwiaW5kZXgiLCJwcmVmaXgiLCJzdWJzdHJpbmciLCJyZWxhdGVkQWRkcmVzcyIsInJlbGF0ZWRQb3J0IiwidGNwVHlwZSIsInRvVXBwZXJDYXNlIiwicGFyc2VJY2VPcHRpb25zIiwicGFyc2VSdHBNYXAiLCJwYXJzZWQiLCJ3cml0ZVJ0cE1hcCIsInBhcnNlRXh0bWFwIiwid3JpdGVFeHRtYXAiLCJoZWFkZXJFeHRlbnNpb24iLCJwcmVmZXJyZWRJZCIsInBhcnNlRm10cCIsImt2Iiwid3JpdGVGbXRwIiwicGFyYW0iLCJwYXJzZVJ0Y3BGYiIsIndyaXRlUnRjcEZiIiwicGFyc2VTc3JjTWVkaWEiLCJzcCIsImNvbG9uIiwiYXR0cmlidXRlIiwicGFyc2VGaW5nZXJwcmludCIsImFsZ29yaXRobSIsImZpbmdlcnByaW50cyIsInNldHVwVHlwZSIsImZwIiwiY29uY2F0IiwiaWNlUGFyYW1ldGVycyIsInBhc3N3b3JkIiwibWxpbmUiLCJydHBtYXBsaW5lIiwiZm10cHMiLCJtYXhwdGltZSIsImV4dGVuc2lvbiIsImVuY29kaW5nUGFyYW1ldGVycyIsImhhc1JlZCIsImhhc1VscGZlYyIsInNzcmNzIiwicHJpbWFyeVNzcmMiLCJzZWNvbmRhcnlTc3JjIiwiZmxvd3MiLCJlbmNQYXJhbSIsImNvZGVjUGF5bG9hZFR5cGUiLCJmZWMiLCJtZWNoYW5pc20iLCJiYW5kd2lkdGgiLCJtYXhCaXRyYXRlIiwicmVtb3RlU3NyYyIsIm9iaiIsInJzaXplIiwibXV4IiwicGxhbkIiLCJzZXNzSWQiLCJzZXNzVmVyIiwic2Vzc2lvbklkIiwidmVyc2lvbiIsInBhcnNlTUxpbmUiLCJmbXQiLCJwYXJzZU9MaW5lIiwidXNlcm5hbWUiLCJzZXNzaW9uVmVyc2lvbiIsIm5ldFR5cGUiLCJhZGRyZXNzVHlwZSIsImFkZHJlc3MiLCJnbG9iYWwiLCJhZGFwdGVyRmFjdG9yeSIsInNlbGYiLCJ1dGlscyIsImRlcGVuZGVuY2llcyIsIm9wdHMiLCJvcHRpb25zIiwic2hpbUNocm9tZSIsInNoaW1GaXJlZm94Iiwic2hpbUVkZ2UiLCJzaGltU2FmYXJpIiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJsb2dnaW5nIiwiYnJvd3NlckRldGFpbHMiLCJkZXRlY3RCcm93c2VyIiwiY2hyb21lU2hpbSIsImVkZ2VTaGltIiwiZmlyZWZveFNoaW0iLCJzYWZhcmlTaGltIiwiY29tbW9uU2hpbSIsImFkYXB0ZXIiLCJleHRyYWN0VmVyc2lvbiIsImRpc2FibGVMb2ciLCJkaXNhYmxlV2FybmluZ3MiLCJicm93c2VyIiwic2hpbVBlZXJDb25uZWN0aW9uIiwiYnJvd3NlclNoaW0iLCJzaGltQ3JlYXRlT2JqZWN0VVJMIiwic2hpbUdldFVzZXJNZWRpYSIsInNoaW1NZWRpYVN0cmVhbSIsInNoaW1Tb3VyY2VPYmplY3QiLCJzaGltT25UcmFjayIsInNoaW1BZGRUcmFja1JlbW92ZVRyYWNrIiwic2hpbUdldFNlbmRlcnNXaXRoRHRtZiIsInNoaW1SVENJY2VDYW5kaWRhdGUiLCJzaGltTWF4TWVzc2FnZVNpemUiLCJzaGltU2VuZFRocm93VHlwZUVycm9yIiwic2hpbVJlbW92ZVN0cmVhbSIsInNoaW1SZXBsYWNlVHJhY2siLCJzaGltUlRDSWNlU2VydmVyVXJscyIsInNoaW1DYWxsYmFja3NBUEkiLCJzaGltTG9jYWxTdHJlYW1zQVBJIiwic2hpbVJlbW90ZVN0cmVhbXNBUEkiLCJzaGltVHJhY2tFdmVudFRyYW5zY2VpdmVyIiwic2hpbUNyZWF0ZU9mZmVyTGVnYWN5Iiwid2Via2l0TWVkaWFTdHJlYW0iLCJfb250cmFjayIsIm9yaWdTZXRSZW1vdGVEZXNjcmlwdGlvbiIsIl9vbnRyYWNrcG9seSIsInRlIiwid3JhcFBlZXJDb25uZWN0aW9uRXZlbnQiLCJzaGltU2VuZGVyV2l0aER0bWYiLCJkdG1mIiwiX2R0bWYiLCJjcmVhdGVEVE1GU2VuZGVyIiwiX3BjIiwiX3NlbmRlcnMiLCJvcmlnQWRkVHJhY2siLCJvcmlnUmVtb3ZlVHJhY2siLCJvcmlnQWRkU3RyZWFtIiwib3JpZ1JlbW92ZVN0cmVhbSIsIm9yaWdHZXRTZW5kZXJzIiwic2VuZGVycyIsIlVSTCIsIkhUTUxNZWRpYUVsZW1lbnQiLCJfc3JjT2JqZWN0Iiwic3JjIiwicmV2b2tlT2JqZWN0VVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwic2hpbUFkZFRyYWNrUmVtb3ZlVHJhY2tXaXRoTmF0aXZlIiwiX3NoaW1tZWRMb2NhbFN0cmVhbXMiLCJzdHJlYW1JZCIsIkRPTUV4Y2VwdGlvbiIsImV4aXN0aW5nU2VuZGVycyIsIm5ld1NlbmRlcnMiLCJuZXdTZW5kZXIiLCJvcmlnR2V0TG9jYWxTdHJlYW1zIiwibmF0aXZlU3RyZWFtcyIsIl9yZXZlcnNlU3RyZWFtcyIsIl9zdHJlYW1zIiwibmV3U3RyZWFtIiwib2xkU3RyZWFtIiwicmVwbGFjZUludGVybmFsU3RyZWFtSWQiLCJpbnRlcm5hbElkIiwiZXh0ZXJuYWxTdHJlYW0iLCJpbnRlcm5hbFN0cmVhbSIsInJlcGxhY2VFeHRlcm5hbFN0cmVhbUlkIiwiaXNMZWdhY3lDYWxsIiwiZXJyIiwib3JpZ1NldExvY2FsRGVzY3JpcHRpb24iLCJvcmlnTG9jYWxEZXNjcmlwdGlvbiIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImlzTG9jYWwiLCJzdHJlYW1pZCIsImhhc1RyYWNrIiwid2Via2l0UlRDUGVlckNvbm5lY3Rpb24iLCJwY0NvbmZpZyIsInBjQ29uc3RyYWludHMiLCJpY2VUcmFuc3BvcnRzIiwiZ2VuZXJhdGVDZXJ0aWZpY2F0ZSIsIk9yaWdQZWVyQ29ubmVjdGlvbiIsIm5ld0ljZVNlcnZlcnMiLCJkZXByZWNhdGVkIiwib3JpZ0dldFN0YXRzIiwic2VsZWN0b3IiLCJzdWNjZXNzQ2FsbGJhY2siLCJlcnJvckNhbGxiYWNrIiwiZml4Q2hyb21lU3RhdHNfIiwicmVzcG9uc2UiLCJzdGFuZGFyZFJlcG9ydCIsInJlcG9ydHMiLCJyZXBvcnQiLCJzdGFuZGFyZFN0YXRzIiwidGltZXN0YW1wIiwibmFtZXMiLCJtYWtlTWFwU3RhdHMiLCJzdWNjZXNzQ2FsbGJhY2tXcmFwcGVyXyIsInByb21pc2UiLCJuYXRpdmVBZGRJY2VDYW5kaWRhdGUiLCJuYXZpZ2F0b3IiLCJjb25zdHJhaW50c1RvQ2hyb21lXyIsImNjIiwiaWRlYWwiLCJleGFjdCIsIm1heCIsIm9sZG5hbWVfIiwiY2hhckF0Iiwib2MiLCJtaXgiLCJhZHZhbmNlZCIsInNoaW1Db25zdHJhaW50c18iLCJjb25zdHJhaW50cyIsImZ1bmMiLCJhdWRpbyIsInJlbWFwIiwiYiIsInZpZGVvIiwiZmFjZSIsImZhY2luZ01vZGUiLCJnZXRTdXBwb3J0ZWRGYWNpbmdNb2RlTGllcyIsIm1lZGlhRGV2aWNlcyIsImdldFN1cHBvcnRlZENvbnN0cmFpbnRzIiwibWF0Y2hlcyIsImVudW1lcmF0ZURldmljZXMiLCJkZXZpY2VzIiwiZCIsImRldiIsInNvbWUiLCJsYWJlbCIsImRldmljZUlkIiwic2hpbUVycm9yXyIsIlBlcm1pc3Npb25EZW5pZWRFcnJvciIsIlBlcm1pc3Npb25EaXNtaXNzZWRFcnJvciIsIkRldmljZXNOb3RGb3VuZEVycm9yIiwiQ29uc3RyYWludE5vdFNhdGlzZmllZEVycm9yIiwiVHJhY2tTdGFydEVycm9yIiwiTWVkaWFEZXZpY2VGYWlsZWREdWVUb1NodXRkb3duIiwiTWVkaWFEZXZpY2VLaWxsU3dpdGNoT24iLCJUYWJDYXB0dXJlRXJyb3IiLCJTY3JlZW5DYXB0dXJlRXJyb3IiLCJEZXZpY2VDYXB0dXJlRXJyb3IiLCJjb25zdHJhaW50IiwiY29uc3RyYWludE5hbWUiLCJnZXRVc2VyTWVkaWFfIiwib25TdWNjZXNzIiwib25FcnJvciIsIndlYmtpdEdldFVzZXJNZWRpYSIsImdldFVzZXJNZWRpYSIsImdldFVzZXJNZWRpYVByb21pc2VfIiwia2luZHMiLCJNZWRpYVN0cmVhbVRyYWNrIiwiZ2V0U291cmNlcyIsImRldmljZSIsImdyb3VwSWQiLCJlY2hvQ2FuY2VsbGF0aW9uIiwiZnJhbWVSYXRlIiwiaGVpZ2h0Iiwid2lkdGgiLCJvcmlnR2V0VXNlck1lZGlhIiwiY3MiLCJOYXRpdmVSVENJY2VDYW5kaWRhdGUiLCJuYXRpdmVDYW5kaWRhdGUiLCJwYXJzZWRDYW5kaWRhdGUiLCJhdWdtZW50ZWRDYW5kaWRhdGUiLCJuYXRpdmVDcmVhdGVPYmplY3RVUkwiLCJuYXRpdmVSZXZva2VPYmplY3RVUkwiLCJuZXdJZCIsImRzYyIsIm5hdGl2ZVNldEF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsIlJUQ1NjdHBUcmFuc3BvcnQiLCJfc2N0cCIsInNjdHBJbkRlc2NyaXB0aW9uIiwibUxpbmUiLCJnZXRSZW1vdGVGaXJlZm94VmVyc2lvbiIsImdldENhblNlbmRNYXhNZXNzYWdlU2l6ZSIsInJlbW90ZUlzRmlyZWZveCIsImNhblNlbmRNYXhNZXNzYWdlU2l6ZSIsImdldE1heE1lc3NhZ2VTaXplIiwibWF4TWVzc2FnZVNpemUiLCJpc0ZpcmVmb3giLCJjYW5TZW5kTU1TIiwicmVtb3RlTU1TIiwiTnVtYmVyIiwiUE9TSVRJVkVfSU5GSU5JVFkiLCJzY3RwIiwib3JpZ0NyZWF0ZURhdGFDaGFubmVsIiwiY3JlYXRlRGF0YUNoYW5uZWwiLCJkYXRhQ2hhbm5lbCIsIm9yaWdEYXRhQ2hhbm5lbFNlbmQiLCJkYyIsInNpemUiLCJieXRlTGVuZ3RoIiwic2hpbVJUQ1BlZXJDb25uZWN0aW9uIiwib3JpZ01TVEVuYWJsZWQiLCJldiIsIlJUQ0R0bWZTZW5kZXIiLCJSVENEVE1GU2VuZGVyIiwicmVwbGFjZVRyYWNrIiwic2V0VHJhY2siLCJSVENUcmFja0V2ZW50IiwibW96U3JjT2JqZWN0IiwibW96UlRDUGVlckNvbm5lY3Rpb24iLCJuZXdTZXJ2ZXIiLCJjcmVkZW50aWFsIiwibW96UlRDU2Vzc2lvbkRlc2NyaXB0aW9uIiwibW96UlRDSWNlQ2FuZGlkYXRlIiwibW9kZXJuU3RhdHNUeXBlcyIsIm5hdGl2ZUdldFN0YXRzIiwib25TdWNjIiwib25FcnIiLCJJbnRlcm5hbEVycm9yIiwiU2VjdXJpdHlFcnJvciIsImNvbnN0cmFpbnRzVG9GRjM3XyIsIm1vekdldFVzZXJNZWRpYSIsImluZm9zIiwib3JnRW51bWVyYXRlRGV2aWNlcyIsIm5hdGl2ZUdldFVzZXJNZWRpYSIsImdldFNldHRpbmdzIiwibmF0aXZlR2V0U2V0dGluZ3MiLCJhcHBseUNvbnN0cmFpbnRzIiwibmF0aXZlQXBwbHlDb25zdHJhaW50cyIsIl9sb2NhbFN0cmVhbXMiLCJnZXRTdHJlYW1CeUlkIiwiX3JlbW90ZVN0cmVhbXMiLCJfYWRkVHJhY2siLCJ0cmFja3MiLCJfb25hZGRzdHJlYW0iLCJfb25hZGRzdHJlYW1wb2x5IiwiZmFpbHVyZUNhbGxiYWNrIiwid2l0aENhbGxiYWNrIiwiY2IiLCJlcnJjYiIsIlJUQ1RyYW5zY2VpdmVyIiwib3JpZ0NyZWF0ZU9mZmVyIiwiYXVkaW9UcmFuc2NlaXZlciIsImdldFRyYW5zY2VpdmVycyIsInNldERpcmVjdGlvbiIsImFkZFRyYW5zY2VpdmVyIiwidmlkZW9UcmFuc2NlaXZlciIsImxvZ0Rpc2FibGVkXyIsImRlcHJlY2F0aW9uV2FybmluZ3NfIiwidWFzdHJpbmciLCJleHByIiwicG9zIiwiZXZlbnROYW1lVG9XcmFwIiwid3JhcHBlciIsInByb3RvIiwibmF0aXZlQWRkRXZlbnRMaXN0ZW5lciIsIm5hdGl2ZUV2ZW50TmFtZSIsIndyYXBwZWRDYWxsYmFjayIsIl9ldmVudE1hcCIsIm5hdGl2ZVJlbW92ZUV2ZW50TGlzdGVuZXIiLCJ1bndyYXBwZWRDYiIsImJvb2wiLCJvbGRNZXRob2QiLCJuZXdNZXRob2QiLCJ1c2VyQWdlbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7OztBQU1BLElBQU1BLFNBQVMsU0FBVEEsTUFBUyxDQUFTQyxPQUFULEVBQWtCQyxZQUFsQixFQUFnQ0MsUUFBaEMsRUFBeUM7QUFDcEQsUUFBSUMsT0FBTyxFQUFYO0FBQ0EsUUFBSUMsZUFBZSxJQUFuQjtBQUNBLFFBQUlDLG9CQUFxQixJQUF6Qjs7QUFFQSxRQUFJQyxPQUFPO0FBQ1BDLGNBQU9DLDBCQURBO0FBRVBSLGlCQUFVQSxPQUZIO0FBR1BTLGFBQU0sSUFIQztBQUlQQyxrQkFBVyxJQUpKO0FBS1BDLGlCQUFVLEtBTEg7QUFNUEMsZ0JBQVMsS0FORjtBQU9QQyxpQkFBVSxLQVBIO0FBUVBDLGVBQVFDLHFCQVJEO0FBU1BDLGdCQUFTLENBVEY7QUFVUEMsbUJBQVksQ0FWTDtBQVdQQyx3QkFBaUIsQ0FBQyxDQVhYO0FBWVBDLHVCQUFnQixDQUFDLENBWlY7QUFhUEMsdUJBQWdCLEVBYlQ7QUFjUEMsaUJBQVUsRUFkSDtBQWVQbkIsa0JBQVdBO0FBZkosS0FBWDs7QUFrQkFDLFdBQU8sMkJBQVNHLElBQVQsRUFBZUwsWUFBZixFQUE2QixVQUFTcUIsTUFB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LEVBQ08sQ0FEUCxDQUFqQjtBQUVELFdBSkQsTUFJTyxJQUFJOUosVUFBVStDLGtCQUFkLEVBQWtDO0FBQ3ZDO0FBQ0E7QUFDQXhsQixtQkFBTzBjLE9BQVAsR0FBaUIsUUFBakI7QUFDQTFjLG1CQUFPd2EsT0FBUCxHQUFpQitCLGVBQWVrRyxVQUFVOEosU0FBekIsRUFDYix1QkFEYSxFQUNZLENBRFosQ0FBakI7QUFFRCxXQU5NLE1BTUEsSUFBSTlKLFVBQVVxQixZQUFWLElBQ1ByQixVQUFVOEosU0FBVixDQUFvQnRzQixLQUFwQixDQUEwQixvQkFBMUIsQ0FERyxFQUM4QztBQUFFO0FBQ3JERCxtQkFBTzBjLE9BQVAsR0FBaUIsTUFBakI7QUFDQTFjLG1CQUFPd2EsT0FBUCxHQUFpQitCLGVBQWVrRyxVQUFVOEosU0FBekIsRUFDYixvQkFEYSxFQUNTLENBRFQsQ0FBakI7QUFFRCxXQUxNLE1BS0EsSUFBSWp4QixPQUFPcUMsaUJBQVAsSUFDUDhrQixVQUFVOEosU0FBVixDQUFvQnRzQixLQUFwQixDQUEwQixzQkFBMUIsQ0FERyxFQUNnRDtBQUFFO0FBQ3ZERCxtQkFBTzBjLE9BQVAsR0FBaUIsUUFBakI7QUFDQTFjLG1CQUFPd2EsT0FBUCxHQUFpQitCLGVBQWVrRyxVQUFVOEosU0FBekIsRUFDYixzQkFEYSxFQUNXLENBRFgsQ0FBakI7QUFFRCxXQUxNLE1BS0E7QUFBRTtBQUNQdnNCLG1CQUFPMGMsT0FBUCxHQUFpQiwwQkFBakI7QUFDQSxtQkFBTzFjLE1BQVA7QUFDRDs7QUFFRCxpQkFBT0EsTUFBUDtBQUNEO0FBOUZjLE9BQWpCO0FBaUdDLEtBaExxQixFQWdMcEIsRUFoTG9CLENBOXBKb3hCLEVBQTNiLEVBODBKeFcsRUE5MEp3VyxFQTgwSnJXLENBQUMsQ0FBRCxDQTkwSnFXLEVBODBKaFcsQ0E5MEpnVyxDQUFQO0FBKzBKdlcsQ0EvMEpELEUiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5XZWJSVENQcm92aWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDYuIDExLi5cbiAqL1xuaW1wb3J0IFByb3ZpZGVyIGZyb20gXCJhcGkvcHJvdmlkZXIvaHRtbDUvUHJvdmlkZXJcIjtcbmltcG9ydCBXZWJSVENMb2FkZXIgZnJvbSBcImFwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvV2ViUlRDTG9hZGVyXCI7XG5pbXBvcnQge2lzV2ViUlRDfSBmcm9tIFwidXRpbHMvdmFsaWRhdG9yXCI7XG5pbXBvcnQge2Vycm9yVHJpZ2dlcn0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xuaW1wb3J0IHtQUk9WSURFUl9XRUJSVEMsIFNUQVRFX0lETEV9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5cbi8qKlxuICogQGJyaWVmICAgd2VicnRjIHByb3ZpZGVyIGV4dGVuZGVkIGNvcmUuXG4gKiBAcGFyYW0gICBjb250YWluZXIgcGxheWVyIGVsZW1lbnQuXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgICAgY29uZmlnLlxuICogKi9cblxuY29uc3QgV2ViUlRDID0gZnVuY3Rpb24oZWxlbWVudCwgcGxheWVyQ29uZmlnLCBhZFRhZ1VybCl7XG4gICAgbGV0IHRoYXQgPSB7fTtcbiAgICBsZXQgd2VicnRjTG9hZGVyID0gbnVsbDtcbiAgICBsZXQgc3VwZXJEZXN0cm95X2Z1bmMgID0gbnVsbDtcblxuICAgIGxldCBzcGVjID0ge1xuICAgICAgICBuYW1lIDogUFJPVklERVJfV0VCUlRDLFxuICAgICAgICBlbGVtZW50IDogZWxlbWVudCxcbiAgICAgICAgbXNlIDogbnVsbCxcbiAgICAgICAgbGlzdGVuZXIgOiBudWxsLFxuICAgICAgICBjYW5TZWVrIDogZmFsc2UsXG4gICAgICAgIGlzTGl2ZSA6IGZhbHNlLFxuICAgICAgICBzZWVraW5nIDogZmFsc2UsXG4gICAgICAgIHN0YXRlIDogU1RBVEVfSURMRSxcbiAgICAgICAgYnVmZmVyIDogMCxcbiAgICAgICAgZnJhbWVyYXRlIDogMCxcbiAgICAgICAgY3VycmVudFF1YWxpdHkgOiAtMSxcbiAgICAgICAgY3VycmVudFNvdXJjZSA6IC0xLFxuICAgICAgICBxdWFsaXR5TGV2ZWxzIDogW10sXG4gICAgICAgIHNvdXJjZXMgOiBbXSxcbiAgICAgICAgYWRUYWdVcmwgOiBhZFRhZ1VybFxuICAgIH07XG5cbiAgICB0aGF0ID0gUHJvdmlkZXIoc3BlYywgcGxheWVyQ29uZmlnLCBmdW5jdGlvbihzb3VyY2Upe1xuICAgICAgICBpZihpc1dlYlJUQyhzb3VyY2UuZmlsZSwgc291cmNlLnR5cGUpKXtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldFQlJUQyA6IG9uQmVmb3JlTG9hZCA6IFwiLCBzb3VyY2UpO1xuICAgICAgICAgICAgaWYod2VicnRjTG9hZGVyKXtcbiAgICAgICAgICAgICAgICB3ZWJydGNMb2FkZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIHdlYnJ0Y0xvYWRlciA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBsb2FkQ2FsbGJhY2sgPSBmdW5jdGlvbihzdHJlYW0pe1xuXG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuc3JjT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc3JjT2JqZWN0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBlbGVtZW50LnNyY09iamVjdCA9IHN0cmVhbTtcbiAgICAgICAgICAgICAgICAvL3RoYXQucGxheSgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgd2VicnRjTG9hZGVyID0gV2ViUlRDTG9hZGVyKHRoYXQsIHNvdXJjZS5maWxlLCBsb2FkQ2FsbGJhY2ssIGVycm9yVHJpZ2dlcik7XG5cbiAgICAgICAgICAgIHdlYnJ0Y0xvYWRlci5jb25uZWN0KCkuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xuICAgICAgICAgICAgICAgIC8vdGhhdC5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgLy9EbyBub3RoaW5nXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHN1cGVyRGVzdHJveV9mdW5jID0gdGhhdC5zdXBlcignZGVzdHJveScpO1xuXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiV0VCUlRDIFBST1ZJREVSIExPQURFRC5cIik7XG5cblxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xuICAgICAgICBpZih3ZWJydGNMb2FkZXIpe1xuICAgICAgICAgICAgd2VicnRjTG9hZGVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHdlYnJ0Y0xvYWRlciA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiV0VCUlRDIDogIFBST1ZJREVSIERFU1RST1lFRC5cIik7XG5cbiAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMoKTtcblxuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IFdlYlJUQztcbiIsImltcG9ydCBhZGFwdGVyIGZyb20gJ3V0aWxzL2FkYXB0ZXInO1xuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcbmltcG9ydCB7XG4gICAgRVJST1JTLFxuICAgIFBMQVlFUl9XRUJSVENfV1NfRVJST1IsXG4gICAgUExBWUVSX1dFQlJUQ19XU19DTE9TRUQsXG4gICAgUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SLFxuICAgIFBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SLFxuICAgIFBMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUixcbiAgICBQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SLFxuICAgIFBMQVlFUl9XRUJSVENfTkVUV09SS19TTE9XLFxuICAgIE5FVFdPUktfVU5TVEFCTEVELFxuICAgIE9NRV9QMlBfTU9ERVxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG5cbmNvbnN0IFdlYlJUQ0xvYWRlciA9IGZ1bmN0aW9uIChwcm92aWRlciwgd2ViU29ja2V0VXJsLCBsb2FkQ2FsbGJhY2ssIGVycm9yVHJpZ2dlcikge1xuXG4gICAgY29uc3QgcGVlckNvbm5lY3Rpb25Db25maWcgPSB7XG4gICAgICAgICdpY2VTZXJ2ZXJzJzogW3tcbiAgICAgICAgICAgICd1cmxzJzogJ3N0dW46c3R1bi5sLmdvb2dsZS5jb206MTkzMDInXG4gICAgICAgIH1dXG4gICAgfTtcblxuICAgIGxldCB0aGF0ID0ge307XG5cbiAgICBsZXQgd3MgPSBudWxsO1xuXG4gICAgbGV0IG1haW5TdHJlYW0gPSBudWxsO1xuXG4gICAgLy8gdXNlZCBmb3IgZ2V0dGluZyBtZWRpYSBzdHJlYW0gZnJvbSBPTUUgb3IgaG9zdCBwZWVyXG4gICAgbGV0IG1haW5QZWVyQ29ubmVjdGlvbkluZm8gPSBudWxsO1xuXG4gICAgLy8gdXNlZCBmb3Igc2VuZCBtZWRpYSBzdHJlYW0gdG8gY2xpZW50IHBlZXIuXG4gICAgbGV0IGNsaWVudFBlZXJDb25uZWN0aW9ucyA9IHt9O1xuXG4gICAgLy9jbG9zZWQgd2Vic29ja2V0IGJ5IG9tZSBvciBjbGllbnQuXG4gICAgbGV0IHdzQ2xvc2VkQnlQbGF5ZXIgPSBmYWxzZTtcblxuICAgIGxldCBzdGF0aXN0aWNzVGltZXIgPSBudWxsO1xuXG4gICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IGV4aXN0aW5nSGFuZGxlciA9IHdpbmRvdy5vbmJlZm9yZXVubG9hZDtcbiAgICAgICAgd2luZG93Lm9uYmVmb3JldW5sb2FkID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdIYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgZXhpc3RpbmdIYW5kbGVyKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlRoaXMgY2FsbHMgYXV0byB3aGVuIGJyb3dzZXIgY2xvc2VkLlwiKTtcbiAgICAgICAgICAgIGNsb3NlUGVlcigpO1xuICAgICAgICB9XG4gICAgfSkoKTtcblxuICAgIGZ1bmN0aW9uIGdldFBlZXJDb25uZWN0aW9uQnlJZChpZCkge1xuXG4gICAgICAgIGxldCBwZWVyQ29ubmVjdGlvbiA9IG51bGw7XG5cbiAgICAgICAgaWYgKG1haW5QZWVyQ29ubmVjdGlvbkluZm8gJiYgaWQgPT09IG1haW5QZWVyQ29ubmVjdGlvbkluZm8uaWQpIHtcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uID0gbWFpblBlZXJDb25uZWN0aW9uSW5mby5wZWVyQ29ubmVjdGlvbjtcbiAgICAgICAgfSBlbHNlIGlmIChjbGllbnRQZWVyQ29ubmVjdGlvbnNbaWRdKSB7XG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbiA9IGNsaWVudFBlZXJDb25uZWN0aW9uc1tpZF0ucGVlckNvbm5lY3Rpb247XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGVlckNvbm5lY3Rpb247XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXh0cmFjdExvc3NQYWNrZXRzT25OZXR3b3JrU3RhdHVzKHBlZXJDb25uZWN0aW9uSW5mbykge1xuXG4gICAgICAgIGlmICghcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cykge1xuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cyA9IHt9O1xuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5sb3N0UGFja2V0c0FyciA9IFtdO1xuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5zbG90TGVuZ3RoID0gODsgLy84IHN0YXRpc3RpY3MuIGV2ZXJ5IDIgc2Vjb25kc1xuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5wcmV2UGFja2V0c0xvc3QgPSAwO1xuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5hdmc4TG9zc2VzID0gMDtcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMuYXZnTW9yZVRoYW5UaHJlc2hvbGRDb3VudCA9IDA7ICAvL0lmIGF2ZzhMb3NzIG1vcmUgdGhhbiB0aHJlc2hvbGQuXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLnRocmVzaG9sZCA9IDIwO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGxvc3RQYWNrZXRzQXJyID0gcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5sb3N0UGFja2V0c0FycixcbiAgICAgICAgICAgIHNsb3RMZW5ndGggPSBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLnNsb3RMZW5ndGgsIC8vOCBzdGF0aXN0aWNzLiBldmVyeSAyIHNlY29uZHNcbiAgICAgICAgICAgIHByZXZQYWNrZXRzTG9zdCA9IHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMucHJldlBhY2tldHNMb3N0LFxuICAgICAgICAgICAgYXZnOExvc3NlcyA9IHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMuYXZnOExvc3NlcyxcbiAgICAgICAgICAgIGF2Z01vcmVUaGFuVGhyZXNob2xkQ291bnQgPSBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLmF2Z01vcmVUaGFuVGhyZXNob2xkQ291bnQsICAvL0lmIGF2ZzhMb3NzIG1vcmUgdGhhbiB0aHJlc2hvbGQuXG4gICAgICAgICAgICB0aHJlc2hvbGQgPSBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLnRocmVzaG9sZDtcblxuICAgICAgICBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdGlzdGljc1RpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXBlZXJDb25uZWN0aW9uSW5mby5wZWVyQ29ubmVjdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5wZWVyQ29ubmVjdGlvbi5nZXRTdGF0cygpLnRoZW4oZnVuY3Rpb24gKHN0YXRzKSB7XG4gICAgICAgICAgICAgICAgc3RhdHMuZm9yRWFjaChmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlLnR5cGUgPT09IFwiaW5ib3VuZC1ydHBcIiAmJiAhc3RhdGUuaXNSZW1vdGUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8oc3RhdGUucGFja2V0c0xvc3QgLSBwcmV2UGFja2V0c0xvc3QpIGlzIHJlYWwgY3VycmVudCBsb3N0LlxuICAgICAgICAgICAgICAgICAgICAgICAgbG9zdFBhY2tldHNBcnIucHVzaChwYXJzZUludChzdGF0ZS5wYWNrZXRzTG9zdCkgLSBwYXJzZUludChwcmV2UGFja2V0c0xvc3QpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvc3RQYWNrZXRzQXJyLmxlbmd0aCA+IHNsb3RMZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb3N0UGFja2V0c0FyciA9IGxvc3RQYWNrZXRzQXJyLnNsaWNlKGxvc3RQYWNrZXRzQXJyLmxlbmd0aCAtIHNsb3RMZW5ndGgsIGxvc3RQYWNrZXRzQXJyLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXZnOExvc3NlcyA9IF8ucmVkdWNlKGxvc3RQYWNrZXRzQXJyLCBmdW5jdGlvbiAobWVtbywgbnVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtZW1vICsgbnVtO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDApIC8gc2xvdExlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXN0OCBMT1NUIFBBQ0tFVCBBVkcgIDogXCIgKyAoYXZnOExvc3NlcyksIHN0YXRlLnBhY2tldHNMb3N0LCBsb3N0UGFja2V0c0Fycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF2ZzhMb3NzZXMgPiB0aHJlc2hvbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXZnTW9yZVRoYW5UaHJlc2hvbGRDb3VudCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXZnTW9yZVRoYW5UaHJlc2hvbGRDb3VudCA9PT0gMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTkVUV09SSyBVTlNUQUJMRUQhISEgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2xlYXJUaW1lb3V0KHN0YXRpc3RpY3NUaW1lcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwcm92aWRlci50cmlnZ2VyKE5FVFdPUktfVU5TVEFCTEVEKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcihORVRXT1JLX1VOU1RBQkxFRCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdmdNb3JlVGhhblRocmVzaG9sZENvdW50ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldlBhY2tldHNMb3N0ID0gc3RhdGUucGFja2V0c0xvc3Q7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGV4dHJhY3RMb3NzUGFja2V0c09uTmV0d29ya1N0YXR1cyhwZWVyQ29ubmVjdGlvbkluZm8pO1xuICAgICAgICAgICAgfSlcblxuICAgICAgICB9LCAyMDAwKTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZU1haW5QZWVyQ29ubmVjdGlvbihpZCwgcGVlcklkLCBzZHAsIGNhbmRpZGF0ZXMsIHJlc29sdmUpIHtcblxuICAgICAgICBsZXQgcGVlckNvbm5lY3Rpb24gPSBuZXcgUlRDUGVlckNvbm5lY3Rpb24ocGVlckNvbm5lY3Rpb25Db25maWcpO1xuXG4gICAgICAgIG1haW5QZWVyQ29ubmVjdGlvbkluZm8gPSB7XG4gICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICBwZWVySWQ6IHBlZXJJZCxcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uOiBwZWVyQ29ubmVjdGlvblxuICAgICAgICB9O1xuXG4gICAgICAgIC8vU2V0IHJlbW90ZSBkZXNjcmlwdGlvbiB3aGVuIEkgcmVjZWl2ZWQgc2RwIGZyb20gc2VydmVyLlxuICAgICAgICBwZWVyQ29ubmVjdGlvbi5zZXRSZW1vdGVEZXNjcmlwdGlvbihuZXcgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKHNkcCkpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbi5jcmVhdGVBbnN3ZXIoKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGVzYykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJjcmVhdGUgSG9zdCBBbnN3ZXIgOiBzdWNjZXNzXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbi5zZXRMb2NhbERlc2NyaXB0aW9uKGRlc2MpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG15IFNEUCBjcmVhdGVkLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsb2NhbFNEUCA9IHBlZXJDb25uZWN0aW9uLmxvY2FsRGVzY3JpcHRpb247XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKCdMb2NhbCBTRFAnLCBsb2NhbFNEUCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZW5kTWVzc2FnZSh3cywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlZXJfaWQ6IHBlZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZDogJ2Fuc3dlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNkcDogbG9jYWxTRFBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTW1BMQVlFUl9XRUJSVENfU0VUX0xPQ0FMX0RFU0NfRVJST1JdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcih0ZW1wRXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlNbUExBWUVSX1dFQlJUQ19DUkVBVEVfQU5TV0VSX0VSUk9SXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTW1BMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SXTtcbiAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChjYW5kaWRhdGVzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIltNZXNzYWdlIGNhbmRpZGF0ZXNdXCIsIGNhbmRpZGF0ZXMpO1xuICAgICAgICAgICAgYWRkSWNlQ2FuZGlkYXRlKHBlZXJDb25uZWN0aW9uLCBjYW5kaWRhdGVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBlZXJDb25uZWN0aW9uLm9uaWNlY2FuZGlkYXRlID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmIChlLmNhbmRpZGF0ZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiW29uaWNlY2FuZGlkYXRlXVwiLCBlLmNhbmRpZGF0ZSk7XG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiV2ViUlRDTG9hZGVyIHNlbmQgY2FuZGlkYXRlIHRvIHNlcnZlciA6IFwiICsgZS5jYW5kaWRhdGUpO1xuXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ01haW4gUGVlciBDb25uZWN0aW9uIGNhbmRpZGF0ZScsIGUuY2FuZGlkYXRlKTtcblxuICAgICAgICAgICAgICAgIHNlbmRNZXNzYWdlKHdzLCB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgICAgICAgICAgcGVlcl9pZDogcGVlcklkLFxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kOiBcImNhbmRpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICBjYW5kaWRhdGVzOiBbZS5jYW5kaWRhdGVdXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgcGVlckNvbm5lY3Rpb24ub250cmFjayA9IGZ1bmN0aW9uIChlKSB7XG5cbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcInN0cmVhbSByZWNlaXZlZC5cIik7XG5cbiAgICAgICAgICAgIGV4dHJhY3RMb3NzUGFja2V0c09uTmV0d29ya1N0YXR1cyhtYWluUGVlckNvbm5lY3Rpb25JbmZvKTtcbiAgICAgICAgICAgIG1haW5TdHJlYW0gPSBlLnN0cmVhbXNbMF07XG4gICAgICAgICAgICBsb2FkQ2FsbGJhY2soZS5zdHJlYW1zWzBdKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVDbGllbnRQZWVyQ29ubmVjdGlvbihob3N0SWQsIGNsaWVudElkKSB7XG5cbiAgICAgICAgaWYgKCFtYWluU3RyZWFtKSB7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgY3JlYXRlQ2xpZW50UGVlckNvbm5lY3Rpb24oaG9zdElkLCBjbGllbnRJZCk7XG4gICAgICAgICAgICB9LCAxMDApO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcGVlckNvbm5lY3Rpb24gPSBuZXcgUlRDUGVlckNvbm5lY3Rpb24ocGVlckNvbm5lY3Rpb25Db25maWcpO1xuXG4gICAgICAgIGNsaWVudFBlZXJDb25uZWN0aW9uc1tjbGllbnRJZF0gPSB7XG4gICAgICAgICAgICBpZDogY2xpZW50SWQsXG4gICAgICAgICAgICBwZWVySWQ6IGhvc3RJZCxcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uOiBwZWVyQ29ubmVjdGlvblxuICAgICAgICB9O1xuXG4gICAgICAgIHBlZXJDb25uZWN0aW9uLmFkZFN0cmVhbShtYWluU3RyZWFtKTtcblxuICAgICAgICAvLyBsZXQgb2ZmZXJPcHRpb24gPSB7XG4gICAgICAgIC8vICAgICBvZmZlclRvUmVjZWl2ZUF1ZGlvOiAxLFxuICAgICAgICAvLyAgICAgb2ZmZXJUb1JlY2VpdmVWaWRlbzogMVxuICAgICAgICAvLyB9O1xuXG4gICAgICAgIHBlZXJDb25uZWN0aW9uLmNyZWF0ZU9mZmVyKHNldExvY2FsQW5kU2VuZE1lc3NhZ2UsIGhhbmRsZUNyZWF0ZU9mZmVyRXJyb3IsIHt9KTtcblxuICAgICAgICBmdW5jdGlvbiBzZXRMb2NhbEFuZFNlbmRNZXNzYWdlKHNlc3Npb25EZXNjcmlwdGlvbikge1xuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24uc2V0TG9jYWxEZXNjcmlwdGlvbihzZXNzaW9uRGVzY3JpcHRpb24pO1xuXG4gICAgICAgICAgICBzZW5kTWVzc2FnZSh3cywge1xuICAgICAgICAgICAgICAgIGlkOiBob3N0SWQsXG4gICAgICAgICAgICAgICAgcGVlcl9pZDogY2xpZW50SWQsXG4gICAgICAgICAgICAgICAgc2RwOiBzZXNzaW9uRGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgY29tbWFuZDogJ29mZmVyX3AycCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlQ3JlYXRlT2ZmZXJFcnJvcihldmVudCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2NyZWF0ZU9mZmVyKCkgZXJyb3I6ICcsIGV2ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBlZXJDb25uZWN0aW9uLm9uaWNlY2FuZGlkYXRlID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmIChlLmNhbmRpZGF0ZSkge1xuICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldlYlJUQ0xvYWRlciBzZW5kIGNhbmRpZGF0ZSB0byBzZXJ2ZXIgOiBcIiArIGUuY2FuZGlkYXRlKTtcblxuXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ0NsaWVudCBQZWVyIENvbm5lY3Rpb24gY2FuZGlkYXRlJywgZS5jYW5kaWRhdGUpO1xuXG4gICAgICAgICAgICAgICAgc2VuZE1lc3NhZ2Uod3MsIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGhvc3RJZCxcbiAgICAgICAgICAgICAgICAgICAgcGVlcl9pZDogY2xpZW50SWQsXG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmQ6IFwiY2FuZGlkYXRlX3AycFwiLFxuICAgICAgICAgICAgICAgICAgICBjYW5kaWRhdGVzOiBbZS5jYW5kaWRhdGVdXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvL1RoaXMgaXMgdGVtcG9yYXJ5IGZ1bmN0aW9uLiB3ZSBjYW4ndCBidWlsZCBTVFJVTiBzZXJ2ZXIuXG4gICAgbGV0IGNvcHlDYW5kaWRhdGUgPSBmdW5jdGlvbihiYXNpY0NhbmRpZGF0ZSl7XG4gICAgICAgIGxldCBjbG9uZUNhbmRpZGF0ZSA9IF8uY2xvbmUoYmFzaWNDYW5kaWRhdGUpO1xuICAgICAgICBmdW5jdGlvbiBnZW5lcmF0ZURvbWFpbkZyb21VcmwodXJsKSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0O1xuICAgICAgICAgICAgbGV0IG1hdGNoO1xuICAgICAgICAgICAgaWYgKG1hdGNoID0gdXJsLm1hdGNoKC9eKD86d3NzPzpcXC9cXC8pPyg/OlteQFxcbl0rQCk/KD86d3d3XFwuKT8oW146XFwvXFxuXFw/XFw9XSspL2ltKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG1hdGNoWzFdO1xuICAgICAgICAgICAgICAgIC8qaWYgKG1hdGNoID0gcmVzdWx0Lm1hdGNoKC9eW15cXC5dK1xcLiguK1xcLi4rKSQvKSkge1xuICAgICAgICAgICAgICAgICByZXN1bHQgPSBtYXRjaFsxXVxuICAgICAgICAgICAgICAgICB9Ki9cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZmluZElwIChjYW5kaWRhdGUpe1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IFwiXCI7XG4gICAgICAgICAgICBsZXQgbWF0Y2ggPSBcIlwiO1xuICAgICAgICAgICAgaWYobWF0Y2ggPSBjYW5kaWRhdGUubWF0Y2gobmV3IFJlZ0V4cChcIlxcXFxiKDI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPylcXFxcLigyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT8pXFxcXC4oMjVbMC01XXwyWzAtNF1bMC05XXxbMDFdP1swLTldWzAtOV0/KVxcXFwuKDI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPylcXFxcYlwiLCAnZ2knKSkpe1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG1hdGNoWzBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG5ld0RvbWFpbiA9IGdlbmVyYXRlRG9tYWluRnJvbVVybCh3ZWJTb2NrZXRVcmwpO1xuICAgICAgICBsZXQgaXAgPSBmaW5kSXAoY2xvbmVDYW5kaWRhdGUuY2FuZGlkYXRlKTtcbiAgICAgICAgY29uc29sZS5sb2coaXAsIG5ld0RvbWFpbik7XG4gICAgICAgIGlmKGlwID09PSBuZXdEb21haW4pe1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgLy9jbG9uZUNhbmRpZGF0ZS5jYW5kaWRhdGUucmVwbGFjZShjbG9uZUNhbmRpZGF0ZS5hZGRyZXNzLCBuZXdEb21haW4pO1xuICAgICAgICBjbG9uZUNhbmRpZGF0ZS5jYW5kaWRhdGUgPSBjbG9uZUNhbmRpZGF0ZS5jYW5kaWRhdGUucmVwbGFjZShpcCwgbmV3RG9tYWluKTtcbiAgICAgICAgLy9jbG9uZUNhbmRpZGF0ZS5jYW5kaWRhdGUgPSBjbG9uZUNhbmRpZGF0ZS5jYW5kaWRhdGUucmVwbGFjZShuZXcgUmVnRXhwKFwiXFxcXGIoMjVbMC01XXwyWzAtNF1bMC05XXxbMDFdP1swLTldWzAtOV0/KVxcXFwuKDI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPylcXFxcLigyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT8pXFxcXC4oMjVbMC01XXwyWzAtNF1bMC05XXxbMDFdP1swLTldWzAtOV0/KVxcXFxiXCIsICdnaScpLCBuZXdEb21haW4pXG5cbiAgICAgICAgcmV0dXJuIGNsb25lQ2FuZGlkYXRlO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBhZGRJY2VDYW5kaWRhdGUocGVlckNvbm5lY3Rpb24sIGNhbmRpZGF0ZXMpIHtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhbmRpZGF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChjYW5kaWRhdGVzW2ldICYmIGNhbmRpZGF0ZXNbaV0uY2FuZGlkYXRlKSB7XG4gICAgICAgICAgICAgICAgbGV0IGJhc2ljQ2FuZGlkYXRlID0gY2FuZGlkYXRlc1tpXTtcblxuICAgICAgICAgICAgICAgIGxldCBjbG9uZUNhbmRpZGF0ZSA9IGNvcHlDYW5kaWRhdGUoYmFzaWNDYW5kaWRhdGUpO1xuXG4gICAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24uYWRkSWNlQ2FuZGlkYXRlKG5ldyBSVENJY2VDYW5kaWRhdGUoYmFzaWNDYW5kaWRhdGUpKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiYWRkSWNlQ2FuZGlkYXRlIDogc3VjY2Vzc1wiKTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SU1tQTEFZRVJfV0VCUlRDX0FERF9JQ0VDQU5ESURBVEVfRVJST1JdO1xuICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYoY2xvbmVDYW5kaWRhdGUpe1xuICAgICAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbi5hZGRJY2VDYW5kaWRhdGUobmV3IFJUQ0ljZUNhbmRpZGF0ZShjbG9uZUNhbmRpZGF0ZSkpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjbG9uZUNhbmRpZGF0ZSBhZGRJY2VDYW5kaWRhdGUgOiBzdWNjZXNzXCIpO1xuICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlNbUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdFdlYlNvY2tldChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICB0cnkge1xuXG4gICAgICAgICAgICB3cyA9IG5ldyBXZWJTb2NrZXQod2ViU29ja2V0VXJsKTtcblxuICAgICAgICAgICAgd3Mub25vcGVuID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ+ybueyGjOy8kyDsl7TrprwnKTtcblxuICAgICAgICAgICAgICAgIHNlbmRNZXNzYWdlKHdzLCB7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmQ6IFwicmVxdWVzdF9vZmZlclwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB3cy5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZSkge1xuXG4gICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IEpTT04ucGFyc2UoZS5kYXRhKTtcblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdSZWNlaXZlIG1lc3NhZ2UnLCBtZXNzYWdlKTtcblxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlNbUExBWUVSX1dFQlJUQ19XU19FUlJPUl07XG4gICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IG1lc3NhZ2UuZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcih0ZW1wRXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFtZXNzYWdlLmlkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKCdJRCBtdXN0IGJlIG5vdCBudWxsJyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5jb21tYW5kID09PSAnb2ZmZXInKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlTWFpblBlZXJDb25uZWN0aW9uKG1lc3NhZ2UuaWQsIG1lc3NhZ2UucGVlcl9pZCwgbWVzc2FnZS5zZHAsIG1lc3NhZ2UuY2FuZGlkYXRlcywgcmVzb2x2ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKG1lc3NhZ2UucGVlcl9pZCA9PT0gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlci50cmlnZ2VyKE9NRV9QMlBfTU9ERSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoT01FX1AyUF9NT0RFLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLmNvbW1hbmQgPT09ICdyZXF1ZXN0X29mZmVyX3AycCcpIHtcblxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVDbGllbnRQZWVyQ29ubmVjdGlvbihtZXNzYWdlLmlkLCBtZXNzYWdlLnBlZXJfaWQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLmNvbW1hbmQgPT09ICdhbnN3ZXJfcDJwJykge1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBwZWVyQ29ubmVjdGlvbjEgPSBnZXRQZWVyQ29ubmVjdGlvbkJ5SWQobWVzc2FnZS5wZWVyX2lkKTtcblxuICAgICAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbjEuc2V0UmVtb3RlRGVzY3JpcHRpb24obmV3IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbihtZXNzYWdlLnNkcCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGVzYykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlNbUExBWUVSX1dFQlJUQ19TRVRfUkVNT1RFX0RFU0NfRVJST1JdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcih0ZW1wRXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UuY29tbWFuZCA9PT0gJ2NhbmRpZGF0ZScpIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBDYW5kaWRhdGVzIGZvciBuZXcgY2xpZW50IHBlZXJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBlZXJDb25uZWN0aW9uMiA9IGdldFBlZXJDb25uZWN0aW9uQnlJZChtZXNzYWdlLmlkKTtcblxuICAgICAgICAgICAgICAgICAgICBhZGRJY2VDYW5kaWRhdGUocGVlckNvbm5lY3Rpb24yLCBtZXNzYWdlLmNhbmRpZGF0ZXMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLmNvbW1hbmQgPT09ICdjYW5kaWRhdGVfcDJwJykge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIENhbmRpZGF0ZXMgZm9yIG5ldyBjbGllbnQgcGVlclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGVlckNvbm5lY3Rpb24zID0gZ2V0UGVlckNvbm5lY3Rpb25CeUlkKG1lc3NhZ2UucGVlcl9pZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgYWRkSWNlQ2FuZGlkYXRlKHBlZXJDb25uZWN0aW9uMywgbWVzc2FnZS5jYW5kaWRhdGVzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5jb21tYW5kID09PSAnc3RvcCcpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobWFpblBlZXJDb25uZWN0aW9uSW5mby5wZWVySWQgPT09IG1lc3NhZ2UucGVlcl9pZCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjbG9zZSBjb25uZWN0aW9uIHdpdGggaG9zdCBhbmQgcmV0cnlcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdjbG9zZSBjb25uZWN0aW9uIHdpdGggaG9zdCcpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluU3RyZWFtID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5QZWVyQ29ubmVjdGlvbkluZm8ucGVlckNvbm5lY3Rpb24uY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5QZWVyQ29ubmVjdGlvbkluZm8gPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3Jlc2V0Q2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLnBhdXNlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbmRNZXNzYWdlKHdzLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZDogJ3JlcXVlc3Rfb2ZmZXInXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjbG9zZSBjb25uZWN0aW9uIHdpdGggY2xpZW50XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xpZW50UGVlckNvbm5lY3Rpb25zW21lc3NhZ2UucGVlcl9pZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnY2xvc2UgY29ubmVjdGlvbiB3aXRoIGNsaWVudDogJywgbWVzc2FnZS5wZWVyX2lkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGllbnRQZWVyQ29ubmVjdGlvbnNbbWVzc2FnZS5wZWVyX2lkXS5wZWVyQ29ubmVjdGlvbi5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjbGllbnRQZWVyQ29ubmVjdGlvbnNbbWVzc2FnZS5wZWVyX2lkXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3cy5vbmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmKCF3c0Nsb3NlZEJ5UGxheWVyKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SU1tQTEFZRVJfV0VCUlRDX1dTX0VSUk9SXTtcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgd3Mub25lcnJvciA9IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgIC8vV2h5IEVkZ2UgQnJvd3NlciBjYWxscyBvbmVycm9yKCkgd2hlbiB3cy5jbG9zZSgpP1xuICAgICAgICAgICAgICAgIGlmKCF3c0Nsb3NlZEJ5UGxheWVyKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SU1tQTEFZRVJfV0VCUlRDX1dTX0VSUk9SXTtcbiAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcih0ZW1wRXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcblxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICBjbG9zZVBlZXIoZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcblxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJXZWJSVENMb2FkZXIgY29ubmVjdGluZy4uLlwiKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJXZWJSVENMb2FkZXIgdXJsIDogXCIgKyB3ZWJTb2NrZXRVcmwpO1xuXG4gICAgICAgICAgICBpbml0V2ViU29ja2V0KHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb3NlUGVlcihlcnJvcikge1xuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZygnV2ViUlRDIExvYWRlciBjbG9zZVBlZWFyKCknKTtcbiAgICAgICAgaWYgKHdzKSB7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coJ0Nsb3Npbmcgd2Vic29ja2V0IGNvbm5lY3Rpb24uLi4nKTtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlNlbmQgU2lnbmFsaW5nIDogU3RvcC5cIik7XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgMCAoQ09OTkVDVElORylcbiAgICAgICAgICAgIDEgKE9QRU4pXG4gICAgICAgICAgICAyIChDTE9TSU5HKVxuICAgICAgICAgICAgMyAoQ0xPU0VEKVxuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmICh3cy5yZWFkeVN0YXRlID09PSAxKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAobWFpblBlZXJDb25uZWN0aW9uSW5mbykge1xuICAgICAgICAgICAgICAgICAgICBzZW5kTWVzc2FnZSh3cywge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZDogJ3N0b3AnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IG1haW5QZWVyQ29ubmVjdGlvbkluZm8uaWRcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHdzQ2xvc2VkQnlQbGF5ZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHdzLmNsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3cyA9IG51bGw7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgd3NDbG9zZWRCeVBsYXllciA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtYWluUGVlckNvbm5lY3Rpb25JbmZvKSB7XG5cbiAgICAgICAgICAgIG1haW5TdHJlYW0gPSBudWxsO1xuXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coJ0Nsb3NpbmcgbWFpbiBwZWVyIGNvbm5lY3Rpb24uLi4nKTtcbiAgICAgICAgICAgIGlmIChzdGF0aXN0aWNzVGltZXIpIHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoc3RhdGlzdGljc1RpbWVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1haW5QZWVyQ29ubmVjdGlvbkluZm8ucGVlckNvbm5lY3Rpb24uY2xvc2UoKTtcbiAgICAgICAgICAgIG1haW5QZWVyQ29ubmVjdGlvbkluZm8gPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGNsaWVudFBlZXJDb25uZWN0aW9ucykubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICBmb3IgKGxldCBjbGllbnRJZCBpbiBjbGllbnRQZWVyQ29ubmVjdGlvbnMpIHtcblxuICAgICAgICAgICAgICAgIGxldCBjbGllbnRQZWVyQ29ubmVjdGlvbiA9IGNsaWVudFBlZXJDb25uZWN0aW9uc1tjbGllbnRJZF0ucGVlckNvbm5lY3Rpb247XG5cbiAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coJ0Nsb3NpbmcgY2xpZW50IHBlZXIgY29ubmVjdGlvbi4uLicpO1xuICAgICAgICAgICAgICAgIGNsaWVudFBlZXJDb25uZWN0aW9uLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgY2xpZW50UGVlckNvbm5lY3Rpb24gPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjbGllbnRQZWVyQ29ubmVjdGlvbnMgPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgZXJyb3JUcmlnZ2VyKGVycm9yLCBwcm92aWRlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZW5kTWVzc2FnZSh3cywgbWVzc2FnZSkge1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdTZW5kIE1lc3NhZ2UnLCBtZXNzYWdlKTtcbiAgICAgICAgd3Muc2VuZChKU09OLnN0cmluZ2lmeShtZXNzYWdlKSk7XG4gICAgfVxuXG4gICAgdGhhdC5jb25uZWN0ID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gaW5pdGlhbGl6ZSgpO1xuICAgIH07XG5cbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiV0VCUlRDIExPQURFUiBkZXN0cm95XCIpO1xuICAgICAgICBjbG9zZVBlZXIoKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBXZWJSVENMb2FkZXI7XG4iLCIoZnVuY3Rpb24oZil7aWYodHlwZW9mIGV4cG9ydHM9PT1cIm9iamVjdFwiJiZ0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIil7bW9kdWxlLmV4cG9ydHM9ZigpfWVsc2UgaWYodHlwZW9mIGRlZmluZT09PVwiZnVuY3Rpb25cIiYmZGVmaW5lLmFtZCl7ZGVmaW5lKFtdLGYpfWVsc2V7dmFyIGc7aWYodHlwZW9mIHdpbmRvdyE9PVwidW5kZWZpbmVkXCIpe2c9d2luZG93fWVsc2UgaWYodHlwZW9mIGdsb2JhbCE9PVwidW5kZWZpbmVkXCIpe2c9Z2xvYmFsfWVsc2UgaWYodHlwZW9mIHNlbGYhPT1cInVuZGVmaW5lZFwiKXtnPXNlbGZ9ZWxzZXtnPXRoaXN9Zy5hZGFwdGVyID0gZigpfX0pKGZ1bmN0aW9uKCl7dmFyIGRlZmluZSxtb2R1bGUsZXhwb3J0cztyZXR1cm4gKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLypcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTcgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcbiAqICB0cmVlLlxuICovXG4gLyogZXNsaW50LWVudiBub2RlICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBTRFBVdGlscyA9IHJlcXVpcmUoJ3NkcCcpO1xuXG5mdW5jdGlvbiB3cml0ZU1lZGlhU2VjdGlvbih0cmFuc2NlaXZlciwgY2FwcywgdHlwZSwgc3RyZWFtLCBkdGxzUm9sZSkge1xuICB2YXIgc2RwID0gU0RQVXRpbHMud3JpdGVSdHBEZXNjcmlwdGlvbih0cmFuc2NlaXZlci5raW5kLCBjYXBzKTtcblxuICAvLyBNYXAgSUNFIHBhcmFtZXRlcnMgKHVmcmFnLCBwd2QpIHRvIFNEUC5cbiAgc2RwICs9IFNEUFV0aWxzLndyaXRlSWNlUGFyYW1ldGVycyhcbiAgICAgIHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyLmdldExvY2FsUGFyYW1ldGVycygpKTtcblxuICAvLyBNYXAgRFRMUyBwYXJhbWV0ZXJzIHRvIFNEUC5cbiAgc2RwICs9IFNEUFV0aWxzLndyaXRlRHRsc1BhcmFtZXRlcnMoXG4gICAgICB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0LmdldExvY2FsUGFyYW1ldGVycygpLFxuICAgICAgdHlwZSA9PT0gJ29mZmVyJyA/ICdhY3RwYXNzJyA6IGR0bHNSb2xlIHx8ICdhY3RpdmUnKTtcblxuICBzZHAgKz0gJ2E9bWlkOicgKyB0cmFuc2NlaXZlci5taWQgKyAnXFxyXFxuJztcblxuICBpZiAodHJhbnNjZWl2ZXIucnRwU2VuZGVyICYmIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyKSB7XG4gICAgc2RwICs9ICdhPXNlbmRyZWN2XFxyXFxuJztcbiAgfSBlbHNlIGlmICh0cmFuc2NlaXZlci5ydHBTZW5kZXIpIHtcbiAgICBzZHAgKz0gJ2E9c2VuZG9ubHlcXHJcXG4nO1xuICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyKSB7XG4gICAgc2RwICs9ICdhPXJlY3Zvbmx5XFxyXFxuJztcbiAgfSBlbHNlIHtcbiAgICBzZHAgKz0gJ2E9aW5hY3RpdmVcXHJcXG4nO1xuICB9XG5cbiAgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlcikge1xuICAgIHZhciB0cmFja0lkID0gdHJhbnNjZWl2ZXIucnRwU2VuZGVyLl9pbml0aWFsVHJhY2tJZCB8fFxuICAgICAgICB0cmFuc2NlaXZlci5ydHBTZW5kZXIudHJhY2suaWQ7XG4gICAgdHJhbnNjZWl2ZXIucnRwU2VuZGVyLl9pbml0aWFsVHJhY2tJZCA9IHRyYWNrSWQ7XG4gICAgLy8gc3BlYy5cbiAgICB2YXIgbXNpZCA9ICdtc2lkOicgKyAoc3RyZWFtID8gc3RyZWFtLmlkIDogJy0nKSArICcgJyArXG4gICAgICAgIHRyYWNrSWQgKyAnXFxyXFxuJztcbiAgICBzZHAgKz0gJ2E9JyArIG1zaWQ7XG4gICAgLy8gZm9yIENocm9tZS4gTGVnYWN5IHNob3VsZCBubyBsb25nZXIgYmUgcmVxdWlyZWQuXG4gICAgc2RwICs9ICdhPXNzcmM6JyArIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYyArXG4gICAgICAgICcgJyArIG1zaWQ7XG5cbiAgICAvLyBSVFhcbiAgICBpZiAodHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHgpIHtcbiAgICAgIHNkcCArPSAnYT1zc3JjOicgKyB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eC5zc3JjICtcbiAgICAgICAgICAnICcgKyBtc2lkO1xuICAgICAgc2RwICs9ICdhPXNzcmMtZ3JvdXA6RklEICcgK1xuICAgICAgICAgIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYyArICcgJyArXG4gICAgICAgICAgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHguc3NyYyArXG4gICAgICAgICAgJ1xcclxcbic7XG4gICAgfVxuICB9XG4gIC8vIEZJWE1FOiB0aGlzIHNob3VsZCBiZSB3cml0dGVuIGJ5IHdyaXRlUnRwRGVzY3JpcHRpb24uXG4gIHNkcCArPSAnYT1zc3JjOicgKyB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmMgK1xuICAgICAgJyBjbmFtZTonICsgU0RQVXRpbHMubG9jYWxDTmFtZSArICdcXHJcXG4nO1xuICBpZiAodHJhbnNjZWl2ZXIucnRwU2VuZGVyICYmIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4KSB7XG4gICAgc2RwICs9ICdhPXNzcmM6JyArIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4LnNzcmMgK1xuICAgICAgICAnIGNuYW1lOicgKyBTRFBVdGlscy5sb2NhbENOYW1lICsgJ1xcclxcbic7XG4gIH1cbiAgcmV0dXJuIHNkcDtcbn1cblxuLy8gRWRnZSBkb2VzIG5vdCBsaWtlXG4vLyAxKSBzdHVuOiBmaWx0ZXJlZCBhZnRlciAxNDM5MyB1bmxlc3MgP3RyYW5zcG9ydD11ZHAgaXMgcHJlc2VudFxuLy8gMikgdHVybjogdGhhdCBkb2VzIG5vdCBoYXZlIGFsbCBvZiB0dXJuOmhvc3Q6cG9ydD90cmFuc3BvcnQ9dWRwXG4vLyAzKSB0dXJuOiB3aXRoIGlwdjYgYWRkcmVzc2VzXG4vLyA0KSB0dXJuOiBvY2N1cnJpbmcgbXVsaXBsZSB0aW1lc1xuZnVuY3Rpb24gZmlsdGVySWNlU2VydmVycyhpY2VTZXJ2ZXJzLCBlZGdlVmVyc2lvbikge1xuICB2YXIgaGFzVHVybiA9IGZhbHNlO1xuICBpY2VTZXJ2ZXJzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShpY2VTZXJ2ZXJzKSk7XG4gIHJldHVybiBpY2VTZXJ2ZXJzLmZpbHRlcihmdW5jdGlvbihzZXJ2ZXIpIHtcbiAgICBpZiAoc2VydmVyICYmIChzZXJ2ZXIudXJscyB8fCBzZXJ2ZXIudXJsKSkge1xuICAgICAgdmFyIHVybHMgPSBzZXJ2ZXIudXJscyB8fCBzZXJ2ZXIudXJsO1xuICAgICAgaWYgKHNlcnZlci51cmwgJiYgIXNlcnZlci51cmxzKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignUlRDSWNlU2VydmVyLnVybCBpcyBkZXByZWNhdGVkISBVc2UgdXJscyBpbnN0ZWFkLicpO1xuICAgICAgfVxuICAgICAgdmFyIGlzU3RyaW5nID0gdHlwZW9mIHVybHMgPT09ICdzdHJpbmcnO1xuICAgICAgaWYgKGlzU3RyaW5nKSB7XG4gICAgICAgIHVybHMgPSBbdXJsc107XG4gICAgICB9XG4gICAgICB1cmxzID0gdXJscy5maWx0ZXIoZnVuY3Rpb24odXJsKSB7XG4gICAgICAgIHZhciB2YWxpZFR1cm4gPSB1cmwuaW5kZXhPZigndHVybjonKSA9PT0gMCAmJlxuICAgICAgICAgICAgdXJsLmluZGV4T2YoJ3RyYW5zcG9ydD11ZHAnKSAhPT0gLTEgJiZcbiAgICAgICAgICAgIHVybC5pbmRleE9mKCd0dXJuOlsnKSA9PT0gLTEgJiZcbiAgICAgICAgICAgICFoYXNUdXJuO1xuXG4gICAgICAgIGlmICh2YWxpZFR1cm4pIHtcbiAgICAgICAgICBoYXNUdXJuID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdXJsLmluZGV4T2YoJ3N0dW46JykgPT09IDAgJiYgZWRnZVZlcnNpb24gPj0gMTQzOTMgJiZcbiAgICAgICAgICAgIHVybC5pbmRleE9mKCc/dHJhbnNwb3J0PXVkcCcpID09PSAtMTtcbiAgICAgIH0pO1xuXG4gICAgICBkZWxldGUgc2VydmVyLnVybDtcbiAgICAgIHNlcnZlci51cmxzID0gaXNTdHJpbmcgPyB1cmxzWzBdIDogdXJscztcbiAgICAgIHJldHVybiAhIXVybHMubGVuZ3RoO1xuICAgIH1cbiAgfSk7XG59XG5cbi8vIERldGVybWluZXMgdGhlIGludGVyc2VjdGlvbiBvZiBsb2NhbCBhbmQgcmVtb3RlIGNhcGFiaWxpdGllcy5cbmZ1bmN0aW9uIGdldENvbW1vbkNhcGFiaWxpdGllcyhsb2NhbENhcGFiaWxpdGllcywgcmVtb3RlQ2FwYWJpbGl0aWVzKSB7XG4gIHZhciBjb21tb25DYXBhYmlsaXRpZXMgPSB7XG4gICAgY29kZWNzOiBbXSxcbiAgICBoZWFkZXJFeHRlbnNpb25zOiBbXSxcbiAgICBmZWNNZWNoYW5pc21zOiBbXVxuICB9O1xuXG4gIHZhciBmaW5kQ29kZWNCeVBheWxvYWRUeXBlID0gZnVuY3Rpb24ocHQsIGNvZGVjcykge1xuICAgIHB0ID0gcGFyc2VJbnQocHQsIDEwKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvZGVjcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGNvZGVjc1tpXS5wYXlsb2FkVHlwZSA9PT0gcHQgfHxcbiAgICAgICAgICBjb2RlY3NbaV0ucHJlZmVycmVkUGF5bG9hZFR5cGUgPT09IHB0KSB7XG4gICAgICAgIHJldHVybiBjb2RlY3NbaV07XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHZhciBydHhDYXBhYmlsaXR5TWF0Y2hlcyA9IGZ1bmN0aW9uKGxSdHgsIHJSdHgsIGxDb2RlY3MsIHJDb2RlY3MpIHtcbiAgICB2YXIgbENvZGVjID0gZmluZENvZGVjQnlQYXlsb2FkVHlwZShsUnR4LnBhcmFtZXRlcnMuYXB0LCBsQ29kZWNzKTtcbiAgICB2YXIgckNvZGVjID0gZmluZENvZGVjQnlQYXlsb2FkVHlwZShyUnR4LnBhcmFtZXRlcnMuYXB0LCByQ29kZWNzKTtcbiAgICByZXR1cm4gbENvZGVjICYmIHJDb2RlYyAmJlxuICAgICAgICBsQ29kZWMubmFtZS50b0xvd2VyQ2FzZSgpID09PSByQ29kZWMubmFtZS50b0xvd2VyQ2FzZSgpO1xuICB9O1xuXG4gIGxvY2FsQ2FwYWJpbGl0aWVzLmNvZGVjcy5mb3JFYWNoKGZ1bmN0aW9uKGxDb2RlYykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVtb3RlQ2FwYWJpbGl0aWVzLmNvZGVjcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHJDb2RlYyA9IHJlbW90ZUNhcGFiaWxpdGllcy5jb2RlY3NbaV07XG4gICAgICBpZiAobENvZGVjLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gckNvZGVjLm5hbWUudG9Mb3dlckNhc2UoKSAmJlxuICAgICAgICAgIGxDb2RlYy5jbG9ja1JhdGUgPT09IHJDb2RlYy5jbG9ja1JhdGUpIHtcbiAgICAgICAgaWYgKGxDb2RlYy5uYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdydHgnICYmXG4gICAgICAgICAgICBsQ29kZWMucGFyYW1ldGVycyAmJiByQ29kZWMucGFyYW1ldGVycy5hcHQpIHtcbiAgICAgICAgICAvLyBmb3IgUlRYIHdlIG5lZWQgdG8gZmluZCB0aGUgbG9jYWwgcnR4IHRoYXQgaGFzIGEgYXB0XG4gICAgICAgICAgLy8gd2hpY2ggcG9pbnRzIHRvIHRoZSBzYW1lIGxvY2FsIGNvZGVjIGFzIHRoZSByZW1vdGUgb25lLlxuICAgICAgICAgIGlmICghcnR4Q2FwYWJpbGl0eU1hdGNoZXMobENvZGVjLCByQ29kZWMsXG4gICAgICAgICAgICAgIGxvY2FsQ2FwYWJpbGl0aWVzLmNvZGVjcywgcmVtb3RlQ2FwYWJpbGl0aWVzLmNvZGVjcykpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByQ29kZWMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHJDb2RlYykpOyAvLyBkZWVwY29weVxuICAgICAgICAvLyBudW1iZXIgb2YgY2hhbm5lbHMgaXMgdGhlIGhpZ2hlc3QgY29tbW9uIG51bWJlciBvZiBjaGFubmVsc1xuICAgICAgICByQ29kZWMubnVtQ2hhbm5lbHMgPSBNYXRoLm1pbihsQ29kZWMubnVtQ2hhbm5lbHMsXG4gICAgICAgICAgICByQ29kZWMubnVtQ2hhbm5lbHMpO1xuICAgICAgICAvLyBwdXNoIHJDb2RlYyBzbyB3ZSByZXBseSB3aXRoIG9mZmVyZXIgcGF5bG9hZCB0eXBlXG4gICAgICAgIGNvbW1vbkNhcGFiaWxpdGllcy5jb2RlY3MucHVzaChyQ29kZWMpO1xuXG4gICAgICAgIC8vIGRldGVybWluZSBjb21tb24gZmVlZGJhY2sgbWVjaGFuaXNtc1xuICAgICAgICByQ29kZWMucnRjcEZlZWRiYWNrID0gckNvZGVjLnJ0Y3BGZWVkYmFjay5maWx0ZXIoZnVuY3Rpb24oZmIpIHtcbiAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGxDb2RlYy5ydGNwRmVlZGJhY2subGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGlmIChsQ29kZWMucnRjcEZlZWRiYWNrW2pdLnR5cGUgPT09IGZiLnR5cGUgJiZcbiAgICAgICAgICAgICAgICBsQ29kZWMucnRjcEZlZWRiYWNrW2pdLnBhcmFtZXRlciA9PT0gZmIucGFyYW1ldGVyKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBGSVhNRTogYWxzbyBuZWVkIHRvIGRldGVybWluZSAucGFyYW1ldGVyc1xuICAgICAgICAvLyAgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9vcGVucGVlci9vcnRjL2lzc3Vlcy81NjlcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBsb2NhbENhcGFiaWxpdGllcy5oZWFkZXJFeHRlbnNpb25zLmZvckVhY2goZnVuY3Rpb24obEhlYWRlckV4dGVuc2lvbikge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVtb3RlQ2FwYWJpbGl0aWVzLmhlYWRlckV4dGVuc2lvbnMubGVuZ3RoO1xuICAgICAgICAgaSsrKSB7XG4gICAgICB2YXIgckhlYWRlckV4dGVuc2lvbiA9IHJlbW90ZUNhcGFiaWxpdGllcy5oZWFkZXJFeHRlbnNpb25zW2ldO1xuICAgICAgaWYgKGxIZWFkZXJFeHRlbnNpb24udXJpID09PSBySGVhZGVyRXh0ZW5zaW9uLnVyaSkge1xuICAgICAgICBjb21tb25DYXBhYmlsaXRpZXMuaGVhZGVyRXh0ZW5zaW9ucy5wdXNoKHJIZWFkZXJFeHRlbnNpb24pO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIC8vIEZJWE1FOiBmZWNNZWNoYW5pc21zXG4gIHJldHVybiBjb21tb25DYXBhYmlsaXRpZXM7XG59XG5cbi8vIGlzIGFjdGlvbj1zZXRMb2NhbERlc2NyaXB0aW9uIHdpdGggdHlwZSBhbGxvd2VkIGluIHNpZ25hbGluZ1N0YXRlXG5mdW5jdGlvbiBpc0FjdGlvbkFsbG93ZWRJblNpZ25hbGluZ1N0YXRlKGFjdGlvbiwgdHlwZSwgc2lnbmFsaW5nU3RhdGUpIHtcbiAgcmV0dXJuIHtcbiAgICBvZmZlcjoge1xuICAgICAgc2V0TG9jYWxEZXNjcmlwdGlvbjogWydzdGFibGUnLCAnaGF2ZS1sb2NhbC1vZmZlciddLFxuICAgICAgc2V0UmVtb3RlRGVzY3JpcHRpb246IFsnc3RhYmxlJywgJ2hhdmUtcmVtb3RlLW9mZmVyJ11cbiAgICB9LFxuICAgIGFuc3dlcjoge1xuICAgICAgc2V0TG9jYWxEZXNjcmlwdGlvbjogWydoYXZlLXJlbW90ZS1vZmZlcicsICdoYXZlLWxvY2FsLXByYW5zd2VyJ10sXG4gICAgICBzZXRSZW1vdGVEZXNjcmlwdGlvbjogWydoYXZlLWxvY2FsLW9mZmVyJywgJ2hhdmUtcmVtb3RlLXByYW5zd2VyJ11cbiAgICB9XG4gIH1bdHlwZV1bYWN0aW9uXS5pbmRleE9mKHNpZ25hbGluZ1N0YXRlKSAhPT0gLTE7XG59XG5cbmZ1bmN0aW9uIG1heWJlQWRkQ2FuZGlkYXRlKGljZVRyYW5zcG9ydCwgY2FuZGlkYXRlKSB7XG4gIC8vIEVkZ2UncyBpbnRlcm5hbCByZXByZXNlbnRhdGlvbiBhZGRzIHNvbWUgZmllbGRzIHRoZXJlZm9yZVxuICAvLyBub3QgYWxsIGZpZWxk0ZUgYXJlIHRha2VuIGludG8gYWNjb3VudC5cbiAgdmFyIGFscmVhZHlBZGRlZCA9IGljZVRyYW5zcG9ydC5nZXRSZW1vdGVDYW5kaWRhdGVzKClcbiAgICAgIC5maW5kKGZ1bmN0aW9uKHJlbW90ZUNhbmRpZGF0ZSkge1xuICAgICAgICByZXR1cm4gY2FuZGlkYXRlLmZvdW5kYXRpb24gPT09IHJlbW90ZUNhbmRpZGF0ZS5mb3VuZGF0aW9uICYmXG4gICAgICAgICAgICBjYW5kaWRhdGUuaXAgPT09IHJlbW90ZUNhbmRpZGF0ZS5pcCAmJlxuICAgICAgICAgICAgY2FuZGlkYXRlLnBvcnQgPT09IHJlbW90ZUNhbmRpZGF0ZS5wb3J0ICYmXG4gICAgICAgICAgICBjYW5kaWRhdGUucHJpb3JpdHkgPT09IHJlbW90ZUNhbmRpZGF0ZS5wcmlvcml0eSAmJlxuICAgICAgICAgICAgY2FuZGlkYXRlLnByb3RvY29sID09PSByZW1vdGVDYW5kaWRhdGUucHJvdG9jb2wgJiZcbiAgICAgICAgICAgIGNhbmRpZGF0ZS50eXBlID09PSByZW1vdGVDYW5kaWRhdGUudHlwZTtcbiAgICAgIH0pO1xuICBpZiAoIWFscmVhZHlBZGRlZCkge1xuICAgIGljZVRyYW5zcG9ydC5hZGRSZW1vdGVDYW5kaWRhdGUoY2FuZGlkYXRlKTtcbiAgfVxuICByZXR1cm4gIWFscmVhZHlBZGRlZDtcbn1cblxuXG5mdW5jdGlvbiBtYWtlRXJyb3IobmFtZSwgZGVzY3JpcHRpb24pIHtcbiAgdmFyIGUgPSBuZXcgRXJyb3IoZGVzY3JpcHRpb24pO1xuICBlLm5hbWUgPSBuYW1lO1xuICAvLyBsZWdhY3kgZXJyb3IgY29kZXMgZnJvbSBodHRwczovL2hleWNhbS5naXRodWIuaW8vd2ViaWRsLyNpZGwtRE9NRXhjZXB0aW9uLWVycm9yLW5hbWVzXG4gIGUuY29kZSA9IHtcbiAgICBOb3RTdXBwb3J0ZWRFcnJvcjogOSxcbiAgICBJbnZhbGlkU3RhdGVFcnJvcjogMTEsXG4gICAgSW52YWxpZEFjY2Vzc0Vycm9yOiAxNSxcbiAgICBUeXBlRXJyb3I6IHVuZGVmaW5lZCxcbiAgICBPcGVyYXRpb25FcnJvcjogdW5kZWZpbmVkXG4gIH1bbmFtZV07XG4gIHJldHVybiBlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHdpbmRvdywgZWRnZVZlcnNpb24pIHtcbiAgLy8gaHR0cHM6Ly93M2MuZ2l0aHViLmlvL21lZGlhY2FwdHVyZS1tYWluLyNtZWRpYXN0cmVhbVxuICAvLyBIZWxwZXIgZnVuY3Rpb24gdG8gYWRkIHRoZSB0cmFjayB0byB0aGUgc3RyZWFtIGFuZFxuICAvLyBkaXNwYXRjaCB0aGUgZXZlbnQgb3Vyc2VsdmVzLlxuICBmdW5jdGlvbiBhZGRUcmFja1RvU3RyZWFtQW5kRmlyZUV2ZW50KHRyYWNrLCBzdHJlYW0pIHtcbiAgICBzdHJlYW0uYWRkVHJhY2sodHJhY2spO1xuICAgIHN0cmVhbS5kaXNwYXRjaEV2ZW50KG5ldyB3aW5kb3cuTWVkaWFTdHJlYW1UcmFja0V2ZW50KCdhZGR0cmFjaycsXG4gICAgICAgIHt0cmFjazogdHJhY2t9KSk7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVUcmFja0Zyb21TdHJlYW1BbmRGaXJlRXZlbnQodHJhY2ssIHN0cmVhbSkge1xuICAgIHN0cmVhbS5yZW1vdmVUcmFjayh0cmFjayk7XG4gICAgc3RyZWFtLmRpc3BhdGNoRXZlbnQobmV3IHdpbmRvdy5NZWRpYVN0cmVhbVRyYWNrRXZlbnQoJ3JlbW92ZXRyYWNrJyxcbiAgICAgICAge3RyYWNrOiB0cmFja30pKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpcmVBZGRUcmFjayhwYywgdHJhY2ssIHJlY2VpdmVyLCBzdHJlYW1zKSB7XG4gICAgdmFyIHRyYWNrRXZlbnQgPSBuZXcgRXZlbnQoJ3RyYWNrJyk7XG4gICAgdHJhY2tFdmVudC50cmFjayA9IHRyYWNrO1xuICAgIHRyYWNrRXZlbnQucmVjZWl2ZXIgPSByZWNlaXZlcjtcbiAgICB0cmFja0V2ZW50LnRyYW5zY2VpdmVyID0ge3JlY2VpdmVyOiByZWNlaXZlcn07XG4gICAgdHJhY2tFdmVudC5zdHJlYW1zID0gc3RyZWFtcztcbiAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIHBjLl9kaXNwYXRjaEV2ZW50KCd0cmFjaycsIHRyYWNrRXZlbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgdmFyIFJUQ1BlZXJDb25uZWN0aW9uID0gZnVuY3Rpb24oY29uZmlnKSB7XG4gICAgdmFyIHBjID0gdGhpcztcblxuICAgIHZhciBfZXZlbnRUYXJnZXQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgWydhZGRFdmVudExpc3RlbmVyJywgJ3JlbW92ZUV2ZW50TGlzdGVuZXInLCAnZGlzcGF0Y2hFdmVudCddXG4gICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgICAgIHBjW21ldGhvZF0gPSBfZXZlbnRUYXJnZXRbbWV0aG9kXS5iaW5kKF9ldmVudFRhcmdldCk7XG4gICAgICAgIH0pO1xuXG4gICAgdGhpcy5jYW5Ucmlja2xlSWNlQ2FuZGlkYXRlcyA9IG51bGw7XG5cbiAgICB0aGlzLm5lZWROZWdvdGlhdGlvbiA9IGZhbHNlO1xuXG4gICAgdGhpcy5sb2NhbFN0cmVhbXMgPSBbXTtcbiAgICB0aGlzLnJlbW90ZVN0cmVhbXMgPSBbXTtcblxuICAgIHRoaXMubG9jYWxEZXNjcmlwdGlvbiA9IG51bGw7XG4gICAgdGhpcy5yZW1vdGVEZXNjcmlwdGlvbiA9IG51bGw7XG5cbiAgICB0aGlzLnNpZ25hbGluZ1N0YXRlID0gJ3N0YWJsZSc7XG4gICAgdGhpcy5pY2VDb25uZWN0aW9uU3RhdGUgPSAnbmV3JztcbiAgICB0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9ICduZXcnO1xuICAgIHRoaXMuaWNlR2F0aGVyaW5nU3RhdGUgPSAnbmV3JztcblxuICAgIGNvbmZpZyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoY29uZmlnIHx8IHt9KSk7XG5cbiAgICB0aGlzLnVzaW5nQnVuZGxlID0gY29uZmlnLmJ1bmRsZVBvbGljeSA9PT0gJ21heC1idW5kbGUnO1xuICAgIGlmIChjb25maWcucnRjcE11eFBvbGljeSA9PT0gJ25lZ290aWF0ZScpIHtcbiAgICAgIHRocm93KG1ha2VFcnJvcignTm90U3VwcG9ydGVkRXJyb3InLFxuICAgICAgICAgICdydGNwTXV4UG9saWN5IFxcJ25lZ290aWF0ZVxcJyBpcyBub3Qgc3VwcG9ydGVkJykpO1xuICAgIH0gZWxzZSBpZiAoIWNvbmZpZy5ydGNwTXV4UG9saWN5KSB7XG4gICAgICBjb25maWcucnRjcE11eFBvbGljeSA9ICdyZXF1aXJlJztcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGNvbmZpZy5pY2VUcmFuc3BvcnRQb2xpY3kpIHtcbiAgICAgIGNhc2UgJ2FsbCc6XG4gICAgICBjYXNlICdyZWxheSc6XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uZmlnLmljZVRyYW5zcG9ydFBvbGljeSA9ICdhbGwnO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGNvbmZpZy5idW5kbGVQb2xpY3kpIHtcbiAgICAgIGNhc2UgJ2JhbGFuY2VkJzpcbiAgICAgIGNhc2UgJ21heC1jb21wYXQnOlxuICAgICAgY2FzZSAnbWF4LWJ1bmRsZSc6XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uZmlnLmJ1bmRsZVBvbGljeSA9ICdiYWxhbmNlZCc7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNvbmZpZy5pY2VTZXJ2ZXJzID0gZmlsdGVySWNlU2VydmVycyhjb25maWcuaWNlU2VydmVycyB8fCBbXSwgZWRnZVZlcnNpb24pO1xuXG4gICAgdGhpcy5faWNlR2F0aGVyZXJzID0gW107XG4gICAgaWYgKGNvbmZpZy5pY2VDYW5kaWRhdGVQb29sU2l6ZSkge1xuICAgICAgZm9yICh2YXIgaSA9IGNvbmZpZy5pY2VDYW5kaWRhdGVQb29sU2l6ZTsgaSA+IDA7IGktLSkge1xuICAgICAgICB0aGlzLl9pY2VHYXRoZXJlcnMucHVzaChuZXcgd2luZG93LlJUQ0ljZUdhdGhlcmVyKHtcbiAgICAgICAgICBpY2VTZXJ2ZXJzOiBjb25maWcuaWNlU2VydmVycyxcbiAgICAgICAgICBnYXRoZXJQb2xpY3k6IGNvbmZpZy5pY2VUcmFuc3BvcnRQb2xpY3lcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25maWcuaWNlQ2FuZGlkYXRlUG9vbFNpemUgPSAwO1xuICAgIH1cblxuICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcblxuICAgIC8vIHBlci10cmFjayBpY2VHYXRoZXJzLCBpY2VUcmFuc3BvcnRzLCBkdGxzVHJhbnNwb3J0cywgcnRwU2VuZGVycywgLi4uXG4gICAgLy8gZXZlcnl0aGluZyB0aGF0IGlzIG5lZWRlZCB0byBkZXNjcmliZSBhIFNEUCBtLWxpbmUuXG4gICAgdGhpcy50cmFuc2NlaXZlcnMgPSBbXTtcblxuICAgIHRoaXMuX3NkcFNlc3Npb25JZCA9IFNEUFV0aWxzLmdlbmVyYXRlU2Vzc2lvbklkKCk7XG4gICAgdGhpcy5fc2RwU2Vzc2lvblZlcnNpb24gPSAwO1xuXG4gICAgdGhpcy5fZHRsc1JvbGUgPSB1bmRlZmluZWQ7IC8vIHJvbGUgZm9yIGE9c2V0dXAgdG8gdXNlIGluIGFuc3dlcnMuXG5cbiAgICB0aGlzLl9pc0Nsb3NlZCA9IGZhbHNlO1xuICB9O1xuXG4gIC8vIHNldCB1cCBldmVudCBoYW5kbGVycyBvbiBwcm90b3R5cGVcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9uaWNlY2FuZGlkYXRlID0gbnVsbDtcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9uYWRkc3RyZWFtID0gbnVsbDtcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9udHJhY2sgPSBudWxsO1xuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub25yZW1vdmVzdHJlYW0gPSBudWxsO1xuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub25zaWduYWxpbmdzdGF0ZWNoYW5nZSA9IG51bGw7XG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5vbmljZWNvbm5lY3Rpb25zdGF0ZWNoYW5nZSA9IG51bGw7XG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5vbmNvbm5lY3Rpb25zdGF0ZWNoYW5nZSA9IG51bGw7XG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5vbmljZWdhdGhlcmluZ3N0YXRlY2hhbmdlID0gbnVsbDtcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9ubmVnb3RpYXRpb25uZWVkZWQgPSBudWxsO1xuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub25kYXRhY2hhbm5lbCA9IG51bGw7XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl9kaXNwYXRjaEV2ZW50ID0gZnVuY3Rpb24obmFtZSwgZXZlbnQpIHtcbiAgICBpZiAodGhpcy5faXNDbG9zZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICBpZiAodHlwZW9mIHRoaXNbJ29uJyArIG5hbWVdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzWydvbicgKyBuYW1lXShldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fZW1pdEdhdGhlcmluZ1N0YXRlQ2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdpY2VnYXRoZXJpbmdzdGF0ZWNoYW5nZScpO1xuICAgIHRoaXMuX2Rpc3BhdGNoRXZlbnQoJ2ljZWdhdGhlcmluZ3N0YXRlY2hhbmdlJywgZXZlbnQpO1xuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRDb25maWd1cmF0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0TG9jYWxTdHJlYW1zID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMubG9jYWxTdHJlYW1zO1xuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRSZW1vdGVTdHJlYW1zID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucmVtb3RlU3RyZWFtcztcbiAgfTtcblxuICAvLyBpbnRlcm5hbCBoZWxwZXIgdG8gY3JlYXRlIGEgdHJhbnNjZWl2ZXIgb2JqZWN0LlxuICAvLyAod2hpY2ggaXMgbm90IHlldCB0aGUgc2FtZSBhcyB0aGUgV2ViUlRDIDEuMCB0cmFuc2NlaXZlcilcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl9jcmVhdGVUcmFuc2NlaXZlciA9IGZ1bmN0aW9uKGtpbmQsIGRvTm90QWRkKSB7XG4gICAgdmFyIGhhc0J1bmRsZVRyYW5zcG9ydCA9IHRoaXMudHJhbnNjZWl2ZXJzLmxlbmd0aCA+IDA7XG4gICAgdmFyIHRyYW5zY2VpdmVyID0ge1xuICAgICAgdHJhY2s6IG51bGwsXG4gICAgICBpY2VHYXRoZXJlcjogbnVsbCxcbiAgICAgIGljZVRyYW5zcG9ydDogbnVsbCxcbiAgICAgIGR0bHNUcmFuc3BvcnQ6IG51bGwsXG4gICAgICBsb2NhbENhcGFiaWxpdGllczogbnVsbCxcbiAgICAgIHJlbW90ZUNhcGFiaWxpdGllczogbnVsbCxcbiAgICAgIHJ0cFNlbmRlcjogbnVsbCxcbiAgICAgIHJ0cFJlY2VpdmVyOiBudWxsLFxuICAgICAga2luZDoga2luZCxcbiAgICAgIG1pZDogbnVsbCxcbiAgICAgIHNlbmRFbmNvZGluZ1BhcmFtZXRlcnM6IG51bGwsXG4gICAgICByZWN2RW5jb2RpbmdQYXJhbWV0ZXJzOiBudWxsLFxuICAgICAgc3RyZWFtOiBudWxsLFxuICAgICAgYXNzb2NpYXRlZFJlbW90ZU1lZGlhU3RyZWFtczogW10sXG4gICAgICB3YW50UmVjZWl2ZTogdHJ1ZVxuICAgIH07XG4gICAgaWYgKHRoaXMudXNpbmdCdW5kbGUgJiYgaGFzQnVuZGxlVHJhbnNwb3J0KSB7XG4gICAgICB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQgPSB0aGlzLnRyYW5zY2VpdmVyc1swXS5pY2VUcmFuc3BvcnQ7XG4gICAgICB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0ID0gdGhpcy50cmFuc2NlaXZlcnNbMF0uZHRsc1RyYW5zcG9ydDtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHRyYW5zcG9ydHMgPSB0aGlzLl9jcmVhdGVJY2VBbmREdGxzVHJhbnNwb3J0cygpO1xuICAgICAgdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0ID0gdHJhbnNwb3J0cy5pY2VUcmFuc3BvcnQ7XG4gICAgICB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0ID0gdHJhbnNwb3J0cy5kdGxzVHJhbnNwb3J0O1xuICAgIH1cbiAgICBpZiAoIWRvTm90QWRkKSB7XG4gICAgICB0aGlzLnRyYW5zY2VpdmVycy5wdXNoKHRyYW5zY2VpdmVyKTtcbiAgICB9XG4gICAgcmV0dXJuIHRyYW5zY2VpdmVyO1xuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjayA9IGZ1bmN0aW9uKHRyYWNrLCBzdHJlYW0pIHtcbiAgICBpZiAodGhpcy5faXNDbG9zZWQpIHtcbiAgICAgIHRocm93IG1ha2VFcnJvcignSW52YWxpZFN0YXRlRXJyb3InLFxuICAgICAgICAgICdBdHRlbXB0ZWQgdG8gY2FsbCBhZGRUcmFjayBvbiBhIGNsb3NlZCBwZWVyY29ubmVjdGlvbi4nKTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUV4aXN0cyA9IHRoaXMudHJhbnNjZWl2ZXJzLmZpbmQoZnVuY3Rpb24ocykge1xuICAgICAgcmV0dXJuIHMudHJhY2sgPT09IHRyYWNrO1xuICAgIH0pO1xuXG4gICAgaWYgKGFscmVhZHlFeGlzdHMpIHtcbiAgICAgIHRocm93IG1ha2VFcnJvcignSW52YWxpZEFjY2Vzc0Vycm9yJywgJ1RyYWNrIGFscmVhZHkgZXhpc3RzLicpO1xuICAgIH1cblxuICAgIHZhciB0cmFuc2NlaXZlcjtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudHJhbnNjZWl2ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoIXRoaXMudHJhbnNjZWl2ZXJzW2ldLnRyYWNrICYmXG4gICAgICAgICAgdGhpcy50cmFuc2NlaXZlcnNbaV0ua2luZCA9PT0gdHJhY2sua2luZCkge1xuICAgICAgICB0cmFuc2NlaXZlciA9IHRoaXMudHJhbnNjZWl2ZXJzW2ldO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXRyYW5zY2VpdmVyKSB7XG4gICAgICB0cmFuc2NlaXZlciA9IHRoaXMuX2NyZWF0ZVRyYW5zY2VpdmVyKHRyYWNrLmtpbmQpO1xuICAgIH1cblxuICAgIHRoaXMuX21heWJlRmlyZU5lZ290aWF0aW9uTmVlZGVkKCk7XG5cbiAgICBpZiAodGhpcy5sb2NhbFN0cmVhbXMuaW5kZXhPZihzdHJlYW0pID09PSAtMSkge1xuICAgICAgdGhpcy5sb2NhbFN0cmVhbXMucHVzaChzdHJlYW0pO1xuICAgIH1cblxuICAgIHRyYW5zY2VpdmVyLnRyYWNrID0gdHJhY2s7XG4gICAgdHJhbnNjZWl2ZXIuc3RyZWFtID0gc3RyZWFtO1xuICAgIHRyYW5zY2VpdmVyLnJ0cFNlbmRlciA9IG5ldyB3aW5kb3cuUlRDUnRwU2VuZGVyKHRyYWNrLFxuICAgICAgICB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0KTtcbiAgICByZXR1cm4gdHJhbnNjZWl2ZXIucnRwU2VuZGVyO1xuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICB2YXIgcGMgPSB0aGlzO1xuICAgIGlmIChlZGdlVmVyc2lvbiA+PSAxNTAyNSkge1xuICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcbiAgICAgICAgcGMuYWRkVHJhY2sodHJhY2ssIHN0cmVhbSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQ2xvbmUgaXMgbmVjZXNzYXJ5IGZvciBsb2NhbCBkZW1vcyBtb3N0bHksIGF0dGFjaGluZyBkaXJlY3RseVxuICAgICAgLy8gdG8gdHdvIGRpZmZlcmVudCBzZW5kZXJzIGRvZXMgbm90IHdvcmsgKGJ1aWxkIDEwNTQ3KS5cbiAgICAgIC8vIEZpeGVkIGluIDE1MDI1IChvciBlYXJsaWVyKVxuICAgICAgdmFyIGNsb25lZFN0cmVhbSA9IHN0cmVhbS5jbG9uZSgpO1xuICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2ssIGlkeCkge1xuICAgICAgICB2YXIgY2xvbmVkVHJhY2sgPSBjbG9uZWRTdHJlYW0uZ2V0VHJhY2tzKClbaWR4XTtcbiAgICAgICAgdHJhY2suYWRkRXZlbnRMaXN0ZW5lcignZW5hYmxlZCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgY2xvbmVkVHJhY2suZW5hYmxlZCA9IGV2ZW50LmVuYWJsZWQ7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBjbG9uZWRTdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xuICAgICAgICBwYy5hZGRUcmFjayh0cmFjaywgY2xvbmVkU3RyZWFtKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlVHJhY2sgPSBmdW5jdGlvbihzZW5kZXIpIHtcbiAgICBpZiAodGhpcy5faXNDbG9zZWQpIHtcbiAgICAgIHRocm93IG1ha2VFcnJvcignSW52YWxpZFN0YXRlRXJyb3InLFxuICAgICAgICAgICdBdHRlbXB0ZWQgdG8gY2FsbCByZW1vdmVUcmFjayBvbiBhIGNsb3NlZCBwZWVyY29ubmVjdGlvbi4nKTtcbiAgICB9XG5cbiAgICBpZiAoIShzZW5kZXIgaW5zdGFuY2VvZiB3aW5kb3cuUlRDUnRwU2VuZGVyKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgMSBvZiBSVENQZWVyQ29ubmVjdGlvbi5yZW1vdmVUcmFjayAnICtcbiAgICAgICAgICAnZG9lcyBub3QgaW1wbGVtZW50IGludGVyZmFjZSBSVENSdHBTZW5kZXIuJyk7XG4gICAgfVxuXG4gICAgdmFyIHRyYW5zY2VpdmVyID0gdGhpcy50cmFuc2NlaXZlcnMuZmluZChmdW5jdGlvbih0KSB7XG4gICAgICByZXR1cm4gdC5ydHBTZW5kZXIgPT09IHNlbmRlcjtcbiAgICB9KTtcblxuICAgIGlmICghdHJhbnNjZWl2ZXIpIHtcbiAgICAgIHRocm93IG1ha2VFcnJvcignSW52YWxpZEFjY2Vzc0Vycm9yJyxcbiAgICAgICAgICAnU2VuZGVyIHdhcyBub3QgY3JlYXRlZCBieSB0aGlzIGNvbm5lY3Rpb24uJyk7XG4gICAgfVxuICAgIHZhciBzdHJlYW0gPSB0cmFuc2NlaXZlci5zdHJlYW07XG5cbiAgICB0cmFuc2NlaXZlci5ydHBTZW5kZXIuc3RvcCgpO1xuICAgIHRyYW5zY2VpdmVyLnJ0cFNlbmRlciA9IG51bGw7XG4gICAgdHJhbnNjZWl2ZXIudHJhY2sgPSBudWxsO1xuICAgIHRyYW5zY2VpdmVyLnN0cmVhbSA9IG51bGw7XG5cbiAgICAvLyByZW1vdmUgdGhlIHN0cmVhbSBmcm9tIHRoZSBzZXQgb2YgbG9jYWwgc3RyZWFtc1xuICAgIHZhciBsb2NhbFN0cmVhbXMgPSB0aGlzLnRyYW5zY2VpdmVycy5tYXAoZnVuY3Rpb24odCkge1xuICAgICAgcmV0dXJuIHQuc3RyZWFtO1xuICAgIH0pO1xuICAgIGlmIChsb2NhbFN0cmVhbXMuaW5kZXhPZihzdHJlYW0pID09PSAtMSAmJlxuICAgICAgICB0aGlzLmxvY2FsU3RyZWFtcy5pbmRleE9mKHN0cmVhbSkgPiAtMSkge1xuICAgICAgdGhpcy5sb2NhbFN0cmVhbXMuc3BsaWNlKHRoaXMubG9jYWxTdHJlYW1zLmluZGV4T2Yoc3RyZWFtKSwgMSk7XG4gICAgfVxuXG4gICAgdGhpcy5fbWF5YmVGaXJlTmVnb3RpYXRpb25OZWVkZWQoKTtcbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgdmFyIHBjID0gdGhpcztcbiAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xuICAgICAgdmFyIHNlbmRlciA9IHBjLmdldFNlbmRlcnMoKS5maW5kKGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgcmV0dXJuIHMudHJhY2sgPT09IHRyYWNrO1xuICAgICAgfSk7XG4gICAgICBpZiAoc2VuZGVyKSB7XG4gICAgICAgIHBjLnJlbW92ZVRyYWNrKHNlbmRlcik7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFNlbmRlcnMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy50cmFuc2NlaXZlcnMuZmlsdGVyKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XG4gICAgICByZXR1cm4gISF0cmFuc2NlaXZlci5ydHBTZW5kZXI7XG4gICAgfSlcbiAgICAubWFwKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XG4gICAgICByZXR1cm4gdHJhbnNjZWl2ZXIucnRwU2VuZGVyO1xuICAgIH0pO1xuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRSZWNlaXZlcnMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy50cmFuc2NlaXZlcnMuZmlsdGVyKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XG4gICAgICByZXR1cm4gISF0cmFuc2NlaXZlci5ydHBSZWNlaXZlcjtcbiAgICB9KVxuICAgIC5tYXAoZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcbiAgICAgIHJldHVybiB0cmFuc2NlaXZlci5ydHBSZWNlaXZlcjtcbiAgICB9KTtcbiAgfTtcblxuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fY3JlYXRlSWNlR2F0aGVyZXIgPSBmdW5jdGlvbihzZHBNTGluZUluZGV4LFxuICAgICAgdXNpbmdCdW5kbGUpIHtcbiAgICB2YXIgcGMgPSB0aGlzO1xuICAgIGlmICh1c2luZ0J1bmRsZSAmJiBzZHBNTGluZUluZGV4ID4gMCkge1xuICAgICAgcmV0dXJuIHRoaXMudHJhbnNjZWl2ZXJzWzBdLmljZUdhdGhlcmVyO1xuICAgIH0gZWxzZSBpZiAodGhpcy5faWNlR2F0aGVyZXJzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2ljZUdhdGhlcmVycy5zaGlmdCgpO1xuICAgIH1cbiAgICB2YXIgaWNlR2F0aGVyZXIgPSBuZXcgd2luZG93LlJUQ0ljZUdhdGhlcmVyKHtcbiAgICAgIGljZVNlcnZlcnM6IHRoaXMuX2NvbmZpZy5pY2VTZXJ2ZXJzLFxuICAgICAgZ2F0aGVyUG9saWN5OiB0aGlzLl9jb25maWcuaWNlVHJhbnNwb3J0UG9saWN5XG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGljZUdhdGhlcmVyLCAnc3RhdGUnLFxuICAgICAgICB7dmFsdWU6ICduZXcnLCB3cml0YWJsZTogdHJ1ZX1cbiAgICApO1xuXG4gICAgdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uYnVmZmVyZWRDYW5kaWRhdGVFdmVudHMgPSBbXTtcbiAgICB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5idWZmZXJDYW5kaWRhdGVzID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIHZhciBlbmQgPSAhZXZlbnQuY2FuZGlkYXRlIHx8IE9iamVjdC5rZXlzKGV2ZW50LmNhbmRpZGF0ZSkubGVuZ3RoID09PSAwO1xuICAgICAgLy8gcG9seWZpbGwgc2luY2UgUlRDSWNlR2F0aGVyZXIuc3RhdGUgaXMgbm90IGltcGxlbWVudGVkIGluXG4gICAgICAvLyBFZGdlIDEwNTQ3IHlldC5cbiAgICAgIGljZUdhdGhlcmVyLnN0YXRlID0gZW5kID8gJ2NvbXBsZXRlZCcgOiAnZ2F0aGVyaW5nJztcbiAgICAgIGlmIChwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uYnVmZmVyZWRDYW5kaWRhdGVFdmVudHMgIT09IG51bGwpIHtcbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmJ1ZmZlcmVkQ2FuZGlkYXRlRXZlbnRzLnB1c2goZXZlbnQpO1xuICAgICAgfVxuICAgIH07XG4gICAgaWNlR2F0aGVyZXIuYWRkRXZlbnRMaXN0ZW5lcignbG9jYWxjYW5kaWRhdGUnLFxuICAgICAgdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uYnVmZmVyQ2FuZGlkYXRlcyk7XG4gICAgcmV0dXJuIGljZUdhdGhlcmVyO1xuICB9O1xuXG4gIC8vIHN0YXJ0IGdhdGhlcmluZyBmcm9tIGFuIFJUQ0ljZUdhdGhlcmVyLlxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX2dhdGhlciA9IGZ1bmN0aW9uKG1pZCwgc2RwTUxpbmVJbmRleCkge1xuICAgIHZhciBwYyA9IHRoaXM7XG4gICAgdmFyIGljZUdhdGhlcmVyID0gdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uaWNlR2F0aGVyZXI7XG4gICAgaWYgKGljZUdhdGhlcmVyLm9ubG9jYWxjYW5kaWRhdGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGJ1ZmZlcmVkQ2FuZGlkYXRlRXZlbnRzID1cbiAgICAgIHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmJ1ZmZlcmVkQ2FuZGlkYXRlRXZlbnRzO1xuICAgIHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmJ1ZmZlcmVkQ2FuZGlkYXRlRXZlbnRzID0gbnVsbDtcbiAgICBpY2VHYXRoZXJlci5yZW1vdmVFdmVudExpc3RlbmVyKCdsb2NhbGNhbmRpZGF0ZScsXG4gICAgICB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5idWZmZXJDYW5kaWRhdGVzKTtcbiAgICBpY2VHYXRoZXJlci5vbmxvY2FsY2FuZGlkYXRlID0gZnVuY3Rpb24oZXZ0KSB7XG4gICAgICBpZiAocGMudXNpbmdCdW5kbGUgJiYgc2RwTUxpbmVJbmRleCA+IDApIHtcbiAgICAgICAgLy8gaWYgd2Uga25vdyB0aGF0IHdlIHVzZSBidW5kbGUgd2UgY2FuIGRyb3AgY2FuZGlkYXRlcyB3aXRoXG4gICAgICAgIC8vINGVZHBNTGluZUluZGV4ID4gMC4gSWYgd2UgZG9uJ3QgZG8gdGhpcyB0aGVuIG91ciBzdGF0ZSBnZXRzXG4gICAgICAgIC8vIGNvbmZ1c2VkIHNpbmNlIHdlIGRpc3Bvc2UgdGhlIGV4dHJhIGljZSBnYXRoZXJlci5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdpY2VjYW5kaWRhdGUnKTtcbiAgICAgIGV2ZW50LmNhbmRpZGF0ZSA9IHtzZHBNaWQ6IG1pZCwgc2RwTUxpbmVJbmRleDogc2RwTUxpbmVJbmRleH07XG5cbiAgICAgIHZhciBjYW5kID0gZXZ0LmNhbmRpZGF0ZTtcbiAgICAgIC8vIEVkZ2UgZW1pdHMgYW4gZW1wdHkgb2JqZWN0IGZvciBSVENJY2VDYW5kaWRhdGVDb21wbGV0ZeKApVxuICAgICAgdmFyIGVuZCA9ICFjYW5kIHx8IE9iamVjdC5rZXlzKGNhbmQpLmxlbmd0aCA9PT0gMDtcbiAgICAgIGlmIChlbmQpIHtcbiAgICAgICAgLy8gcG9seWZpbGwgc2luY2UgUlRDSWNlR2F0aGVyZXIuc3RhdGUgaXMgbm90IGltcGxlbWVudGVkIGluXG4gICAgICAgIC8vIEVkZ2UgMTA1NDcgeWV0LlxuICAgICAgICBpZiAoaWNlR2F0aGVyZXIuc3RhdGUgPT09ICduZXcnIHx8IGljZUdhdGhlcmVyLnN0YXRlID09PSAnZ2F0aGVyaW5nJykge1xuICAgICAgICAgIGljZUdhdGhlcmVyLnN0YXRlID0gJ2NvbXBsZXRlZCc7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChpY2VHYXRoZXJlci5zdGF0ZSA9PT0gJ25ldycpIHtcbiAgICAgICAgICBpY2VHYXRoZXJlci5zdGF0ZSA9ICdnYXRoZXJpbmcnO1xuICAgICAgICB9XG4gICAgICAgIC8vIFJUQ0ljZUNhbmRpZGF0ZSBkb2Vzbid0IGhhdmUgYSBjb21wb25lbnQsIG5lZWRzIHRvIGJlIGFkZGVkXG4gICAgICAgIGNhbmQuY29tcG9uZW50ID0gMTtcbiAgICAgICAgLy8gYWxzbyB0aGUgdXNlcm5hbWVGcmFnbWVudC4gVE9ETzogdXBkYXRlIFNEUCB0byB0YWtlIGJvdGggdmFyaWFudHMuXG4gICAgICAgIGNhbmQudWZyYWcgPSBpY2VHYXRoZXJlci5nZXRMb2NhbFBhcmFtZXRlcnMoKS51c2VybmFtZUZyYWdtZW50O1xuXG4gICAgICAgIHZhciBzZXJpYWxpemVkQ2FuZGlkYXRlID0gU0RQVXRpbHMud3JpdGVDYW5kaWRhdGUoY2FuZCk7XG4gICAgICAgIGV2ZW50LmNhbmRpZGF0ZSA9IE9iamVjdC5hc3NpZ24oZXZlbnQuY2FuZGlkYXRlLFxuICAgICAgICAgICAgU0RQVXRpbHMucGFyc2VDYW5kaWRhdGUoc2VyaWFsaXplZENhbmRpZGF0ZSkpO1xuXG4gICAgICAgIGV2ZW50LmNhbmRpZGF0ZS5jYW5kaWRhdGUgPSBzZXJpYWxpemVkQ2FuZGlkYXRlO1xuICAgICAgICBldmVudC5jYW5kaWRhdGUudG9KU09OID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNhbmRpZGF0ZTogZXZlbnQuY2FuZGlkYXRlLmNhbmRpZGF0ZSxcbiAgICAgICAgICAgIHNkcE1pZDogZXZlbnQuY2FuZGlkYXRlLnNkcE1pZCxcbiAgICAgICAgICAgIHNkcE1MaW5lSW5kZXg6IGV2ZW50LmNhbmRpZGF0ZS5zZHBNTGluZUluZGV4LFxuICAgICAgICAgICAgdXNlcm5hbWVGcmFnbWVudDogZXZlbnQuY2FuZGlkYXRlLnVzZXJuYW1lRnJhZ21lbnRcbiAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICAvLyB1cGRhdGUgbG9jYWwgZGVzY3JpcHRpb24uXG4gICAgICB2YXIgc2VjdGlvbnMgPSBTRFBVdGlscy5nZXRNZWRpYVNlY3Rpb25zKHBjLmxvY2FsRGVzY3JpcHRpb24uc2RwKTtcbiAgICAgIGlmICghZW5kKSB7XG4gICAgICAgIHNlY3Rpb25zW2V2ZW50LmNhbmRpZGF0ZS5zZHBNTGluZUluZGV4XSArPVxuICAgICAgICAgICAgJ2E9JyArIGV2ZW50LmNhbmRpZGF0ZS5jYW5kaWRhdGUgKyAnXFxyXFxuJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlY3Rpb25zW2V2ZW50LmNhbmRpZGF0ZS5zZHBNTGluZUluZGV4XSArPVxuICAgICAgICAgICAgJ2E9ZW5kLW9mLWNhbmRpZGF0ZXNcXHJcXG4nO1xuICAgICAgfVxuICAgICAgcGMubG9jYWxEZXNjcmlwdGlvbi5zZHAgPVxuICAgICAgICAgIFNEUFV0aWxzLmdldERlc2NyaXB0aW9uKHBjLmxvY2FsRGVzY3JpcHRpb24uc2RwKSArXG4gICAgICAgICAgc2VjdGlvbnMuam9pbignJyk7XG4gICAgICB2YXIgY29tcGxldGUgPSBwYy50cmFuc2NlaXZlcnMuZXZlcnkoZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcbiAgICAgICAgcmV0dXJuIHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyICYmXG4gICAgICAgICAgICB0cmFuc2NlaXZlci5pY2VHYXRoZXJlci5zdGF0ZSA9PT0gJ2NvbXBsZXRlZCc7XG4gICAgICB9KTtcblxuICAgICAgaWYgKHBjLmljZUdhdGhlcmluZ1N0YXRlICE9PSAnZ2F0aGVyaW5nJykge1xuICAgICAgICBwYy5pY2VHYXRoZXJpbmdTdGF0ZSA9ICdnYXRoZXJpbmcnO1xuICAgICAgICBwYy5fZW1pdEdhdGhlcmluZ1N0YXRlQ2hhbmdlKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIEVtaXQgY2FuZGlkYXRlLiBBbHNvIGVtaXQgbnVsbCBjYW5kaWRhdGUgd2hlbiBhbGwgZ2F0aGVyZXJzIGFyZVxuICAgICAgLy8gY29tcGxldGUuXG4gICAgICBpZiAoIWVuZCkge1xuICAgICAgICBwYy5fZGlzcGF0Y2hFdmVudCgnaWNlY2FuZGlkYXRlJywgZXZlbnQpO1xuICAgICAgfVxuICAgICAgaWYgKGNvbXBsZXRlKSB7XG4gICAgICAgIHBjLl9kaXNwYXRjaEV2ZW50KCdpY2VjYW5kaWRhdGUnLCBuZXcgRXZlbnQoJ2ljZWNhbmRpZGF0ZScpKTtcbiAgICAgICAgcGMuaWNlR2F0aGVyaW5nU3RhdGUgPSAnY29tcGxldGUnO1xuICAgICAgICBwYy5fZW1pdEdhdGhlcmluZ1N0YXRlQ2hhbmdlKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIGVtaXQgYWxyZWFkeSBnYXRoZXJlZCBjYW5kaWRhdGVzLlxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgYnVmZmVyZWRDYW5kaWRhdGVFdmVudHMuZm9yRWFjaChmdW5jdGlvbihlKSB7XG4gICAgICAgIGljZUdhdGhlcmVyLm9ubG9jYWxjYW5kaWRhdGUoZSk7XG4gICAgICB9KTtcbiAgICB9LCAwKTtcbiAgfTtcblxuICAvLyBDcmVhdGUgSUNFIHRyYW5zcG9ydCBhbmQgRFRMUyB0cmFuc3BvcnQuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fY3JlYXRlSWNlQW5kRHRsc1RyYW5zcG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcGMgPSB0aGlzO1xuICAgIHZhciBpY2VUcmFuc3BvcnQgPSBuZXcgd2luZG93LlJUQ0ljZVRyYW5zcG9ydChudWxsKTtcbiAgICBpY2VUcmFuc3BvcnQub25pY2VzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcGMuX3VwZGF0ZUljZUNvbm5lY3Rpb25TdGF0ZSgpO1xuICAgICAgcGMuX3VwZGF0ZUNvbm5lY3Rpb25TdGF0ZSgpO1xuICAgIH07XG5cbiAgICB2YXIgZHRsc1RyYW5zcG9ydCA9IG5ldyB3aW5kb3cuUlRDRHRsc1RyYW5zcG9ydChpY2VUcmFuc3BvcnQpO1xuICAgIGR0bHNUcmFuc3BvcnQub25kdGxzc3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgIHBjLl91cGRhdGVDb25uZWN0aW9uU3RhdGUoKTtcbiAgICB9O1xuICAgIGR0bHNUcmFuc3BvcnQub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gb25lcnJvciBkb2VzIG5vdCBzZXQgc3RhdGUgdG8gZmFpbGVkIGJ5IGl0c2VsZi5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkdGxzVHJhbnNwb3J0LCAnc3RhdGUnLFxuICAgICAgICAgIHt2YWx1ZTogJ2ZhaWxlZCcsIHdyaXRhYmxlOiB0cnVlfSk7XG4gICAgICBwYy5fdXBkYXRlQ29ubmVjdGlvblN0YXRlKCk7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICBpY2VUcmFuc3BvcnQ6IGljZVRyYW5zcG9ydCxcbiAgICAgIGR0bHNUcmFuc3BvcnQ6IGR0bHNUcmFuc3BvcnRcbiAgICB9O1xuICB9O1xuXG4gIC8vIERlc3Ryb3kgSUNFIGdhdGhlcmVyLCBJQ0UgdHJhbnNwb3J0IGFuZCBEVExTIHRyYW5zcG9ydC5cbiAgLy8gV2l0aG91dCB0cmlnZ2VyaW5nIHRoZSBjYWxsYmFja3MuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fZGlzcG9zZUljZUFuZER0bHNUcmFuc3BvcnRzID0gZnVuY3Rpb24oXG4gICAgICBzZHBNTGluZUluZGV4KSB7XG4gICAgdmFyIGljZUdhdGhlcmVyID0gdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uaWNlR2F0aGVyZXI7XG4gICAgaWYgKGljZUdhdGhlcmVyKSB7XG4gICAgICBkZWxldGUgaWNlR2F0aGVyZXIub25sb2NhbGNhbmRpZGF0ZTtcbiAgICAgIGRlbGV0ZSB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5pY2VHYXRoZXJlcjtcbiAgICB9XG4gICAgdmFyIGljZVRyYW5zcG9ydCA9IHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmljZVRyYW5zcG9ydDtcbiAgICBpZiAoaWNlVHJhbnNwb3J0KSB7XG4gICAgICBkZWxldGUgaWNlVHJhbnNwb3J0Lm9uaWNlc3RhdGVjaGFuZ2U7XG4gICAgICBkZWxldGUgdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uaWNlVHJhbnNwb3J0O1xuICAgIH1cbiAgICB2YXIgZHRsc1RyYW5zcG9ydCA9IHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmR0bHNUcmFuc3BvcnQ7XG4gICAgaWYgKGR0bHNUcmFuc3BvcnQpIHtcbiAgICAgIGRlbGV0ZSBkdGxzVHJhbnNwb3J0Lm9uZHRsc3N0YXRlY2hhbmdlO1xuICAgICAgZGVsZXRlIGR0bHNUcmFuc3BvcnQub25lcnJvcjtcbiAgICAgIGRlbGV0ZSB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5kdGxzVHJhbnNwb3J0O1xuICAgIH1cbiAgfTtcblxuICAvLyBTdGFydCB0aGUgUlRQIFNlbmRlciBhbmQgUmVjZWl2ZXIgZm9yIGEgdHJhbnNjZWl2ZXIuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fdHJhbnNjZWl2ZSA9IGZ1bmN0aW9uKHRyYW5zY2VpdmVyLFxuICAgICAgc2VuZCwgcmVjdikge1xuICAgIHZhciBwYXJhbXMgPSBnZXRDb21tb25DYXBhYmlsaXRpZXModHJhbnNjZWl2ZXIubG9jYWxDYXBhYmlsaXRpZXMsXG4gICAgICAgIHRyYW5zY2VpdmVyLnJlbW90ZUNhcGFiaWxpdGllcyk7XG4gICAgaWYgKHNlbmQgJiYgdHJhbnNjZWl2ZXIucnRwU2VuZGVyKSB7XG4gICAgICBwYXJhbXMuZW5jb2RpbmdzID0gdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVycztcbiAgICAgIHBhcmFtcy5ydGNwID0ge1xuICAgICAgICBjbmFtZTogU0RQVXRpbHMubG9jYWxDTmFtZSxcbiAgICAgICAgY29tcG91bmQ6IHRyYW5zY2VpdmVyLnJ0Y3BQYXJhbWV0ZXJzLmNvbXBvdW5kXG4gICAgICB9O1xuICAgICAgaWYgKHRyYW5zY2VpdmVyLnJlY3ZFbmNvZGluZ1BhcmFtZXRlcnMubGVuZ3RoKSB7XG4gICAgICAgIHBhcmFtcy5ydGNwLnNzcmMgPSB0cmFuc2NlaXZlci5yZWN2RW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmM7XG4gICAgICB9XG4gICAgICB0cmFuc2NlaXZlci5ydHBTZW5kZXIuc2VuZChwYXJhbXMpO1xuICAgIH1cbiAgICBpZiAocmVjdiAmJiB0cmFuc2NlaXZlci5ydHBSZWNlaXZlciAmJiBwYXJhbXMuY29kZWNzLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIHJlbW92ZSBSVFggZmllbGQgaW4gRWRnZSAxNDk0MlxuICAgICAgaWYgKHRyYW5zY2VpdmVyLmtpbmQgPT09ICd2aWRlbydcbiAgICAgICAgICAmJiB0cmFuc2NlaXZlci5yZWN2RW5jb2RpbmdQYXJhbWV0ZXJzXG4gICAgICAgICAgJiYgZWRnZVZlcnNpb24gPCAxNTAxOSkge1xuICAgICAgICB0cmFuc2NlaXZlci5yZWN2RW5jb2RpbmdQYXJhbWV0ZXJzLmZvckVhY2goZnVuY3Rpb24ocCkge1xuICAgICAgICAgIGRlbGV0ZSBwLnJ0eDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAodHJhbnNjZWl2ZXIucmVjdkVuY29kaW5nUGFyYW1ldGVycy5sZW5ndGgpIHtcbiAgICAgICAgcGFyYW1zLmVuY29kaW5ncyA9IHRyYW5zY2VpdmVyLnJlY3ZFbmNvZGluZ1BhcmFtZXRlcnM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJhbXMuZW5jb2RpbmdzID0gW3t9XTtcbiAgICAgIH1cbiAgICAgIHBhcmFtcy5ydGNwID0ge1xuICAgICAgICBjb21wb3VuZDogdHJhbnNjZWl2ZXIucnRjcFBhcmFtZXRlcnMuY29tcG91bmRcbiAgICAgIH07XG4gICAgICBpZiAodHJhbnNjZWl2ZXIucnRjcFBhcmFtZXRlcnMuY25hbWUpIHtcbiAgICAgICAgcGFyYW1zLnJ0Y3AuY25hbWUgPSB0cmFuc2NlaXZlci5ydGNwUGFyYW1ldGVycy5jbmFtZTtcbiAgICAgIH1cbiAgICAgIGlmICh0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzLmxlbmd0aCkge1xuICAgICAgICBwYXJhbXMucnRjcC5zc3JjID0gdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjO1xuICAgICAgfVxuICAgICAgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIucmVjZWl2ZShwYXJhbXMpO1xuICAgIH1cbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0TG9jYWxEZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKGRlc2NyaXB0aW9uKSB7XG4gICAgdmFyIHBjID0gdGhpcztcblxuICAgIC8vIE5vdGU6IHByYW5zd2VyIGlzIG5vdCBzdXBwb3J0ZWQuXG4gICAgaWYgKFsnb2ZmZXInLCAnYW5zd2VyJ10uaW5kZXhPZihkZXNjcmlwdGlvbi50eXBlKSA9PT0gLTEpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChtYWtlRXJyb3IoJ1R5cGVFcnJvcicsXG4gICAgICAgICAgJ1Vuc3VwcG9ydGVkIHR5cGUgXCInICsgZGVzY3JpcHRpb24udHlwZSArICdcIicpKTtcbiAgICB9XG5cbiAgICBpZiAoIWlzQWN0aW9uQWxsb3dlZEluU2lnbmFsaW5nU3RhdGUoJ3NldExvY2FsRGVzY3JpcHRpb24nLFxuICAgICAgICBkZXNjcmlwdGlvbi50eXBlLCBwYy5zaWduYWxpbmdTdGF0ZSkgfHwgcGMuX2lzQ2xvc2VkKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobWFrZUVycm9yKCdJbnZhbGlkU3RhdGVFcnJvcicsXG4gICAgICAgICAgJ0NhbiBub3Qgc2V0IGxvY2FsICcgKyBkZXNjcmlwdGlvbi50eXBlICtcbiAgICAgICAgICAnIGluIHN0YXRlICcgKyBwYy5zaWduYWxpbmdTdGF0ZSkpO1xuICAgIH1cblxuICAgIHZhciBzZWN0aW9ucztcbiAgICB2YXIgc2Vzc2lvbnBhcnQ7XG4gICAgaWYgKGRlc2NyaXB0aW9uLnR5cGUgPT09ICdvZmZlcicpIHtcbiAgICAgIC8vIFZFUlkgbGltaXRlZCBzdXBwb3J0IGZvciBTRFAgbXVuZ2luZy4gTGltaXRlZCB0bzpcbiAgICAgIC8vICogY2hhbmdpbmcgdGhlIG9yZGVyIG9mIGNvZGVjc1xuICAgICAgc2VjdGlvbnMgPSBTRFBVdGlscy5zcGxpdFNlY3Rpb25zKGRlc2NyaXB0aW9uLnNkcCk7XG4gICAgICBzZXNzaW9ucGFydCA9IHNlY3Rpb25zLnNoaWZ0KCk7XG4gICAgICBzZWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKG1lZGlhU2VjdGlvbiwgc2RwTUxpbmVJbmRleCkge1xuICAgICAgICB2YXIgY2FwcyA9IFNEUFV0aWxzLnBhcnNlUnRwUGFyYW1ldGVycyhtZWRpYVNlY3Rpb24pO1xuICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0ubG9jYWxDYXBhYmlsaXRpZXMgPSBjYXBzO1xuICAgICAgfSk7XG5cbiAgICAgIHBjLnRyYW5zY2VpdmVycy5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zY2VpdmVyLCBzZHBNTGluZUluZGV4KSB7XG4gICAgICAgIHBjLl9nYXRoZXIodHJhbnNjZWl2ZXIubWlkLCBzZHBNTGluZUluZGV4KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoZGVzY3JpcHRpb24udHlwZSA9PT0gJ2Fuc3dlcicpIHtcbiAgICAgIHNlY3Rpb25zID0gU0RQVXRpbHMuc3BsaXRTZWN0aW9ucyhwYy5yZW1vdGVEZXNjcmlwdGlvbi5zZHApO1xuICAgICAgc2Vzc2lvbnBhcnQgPSBzZWN0aW9ucy5zaGlmdCgpO1xuICAgICAgdmFyIGlzSWNlTGl0ZSA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KHNlc3Npb25wYXJ0LFxuICAgICAgICAgICdhPWljZS1saXRlJykubGVuZ3RoID4gMDtcbiAgICAgIHNlY3Rpb25zLmZvckVhY2goZnVuY3Rpb24obWVkaWFTZWN0aW9uLCBzZHBNTGluZUluZGV4KSB7XG4gICAgICAgIHZhciB0cmFuc2NlaXZlciA9IHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XTtcbiAgICAgICAgdmFyIGljZUdhdGhlcmVyID0gdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXI7XG4gICAgICAgIHZhciBpY2VUcmFuc3BvcnQgPSB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQ7XG4gICAgICAgIHZhciBkdGxzVHJhbnNwb3J0ID0gdHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydDtcbiAgICAgICAgdmFyIGxvY2FsQ2FwYWJpbGl0aWVzID0gdHJhbnNjZWl2ZXIubG9jYWxDYXBhYmlsaXRpZXM7XG4gICAgICAgIHZhciByZW1vdGVDYXBhYmlsaXRpZXMgPSB0cmFuc2NlaXZlci5yZW1vdGVDYXBhYmlsaXRpZXM7XG5cbiAgICAgICAgLy8gdHJlYXQgYnVuZGxlLW9ubHkgYXMgbm90LXJlamVjdGVkLlxuICAgICAgICB2YXIgcmVqZWN0ZWQgPSBTRFBVdGlscy5pc1JlamVjdGVkKG1lZGlhU2VjdGlvbikgJiZcbiAgICAgICAgICAgIFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9YnVuZGxlLW9ubHknKS5sZW5ndGggPT09IDA7XG5cbiAgICAgICAgaWYgKCFyZWplY3RlZCAmJiAhdHJhbnNjZWl2ZXIucmVqZWN0ZWQpIHtcbiAgICAgICAgICB2YXIgcmVtb3RlSWNlUGFyYW1ldGVycyA9IFNEUFV0aWxzLmdldEljZVBhcmFtZXRlcnMoXG4gICAgICAgICAgICAgIG1lZGlhU2VjdGlvbiwgc2Vzc2lvbnBhcnQpO1xuICAgICAgICAgIHZhciByZW1vdGVEdGxzUGFyYW1ldGVycyA9IFNEUFV0aWxzLmdldER0bHNQYXJhbWV0ZXJzKFxuICAgICAgICAgICAgICBtZWRpYVNlY3Rpb24sIHNlc3Npb25wYXJ0KTtcbiAgICAgICAgICBpZiAoaXNJY2VMaXRlKSB7XG4gICAgICAgICAgICByZW1vdGVEdGxzUGFyYW1ldGVycy5yb2xlID0gJ3NlcnZlcic7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCFwYy51c2luZ0J1bmRsZSB8fCBzZHBNTGluZUluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICBwYy5fZ2F0aGVyKHRyYW5zY2VpdmVyLm1pZCwgc2RwTUxpbmVJbmRleCk7XG4gICAgICAgICAgICBpZiAoaWNlVHJhbnNwb3J0LnN0YXRlID09PSAnbmV3Jykge1xuICAgICAgICAgICAgICBpY2VUcmFuc3BvcnQuc3RhcnQoaWNlR2F0aGVyZXIsIHJlbW90ZUljZVBhcmFtZXRlcnMsXG4gICAgICAgICAgICAgICAgICBpc0ljZUxpdGUgPyAnY29udHJvbGxpbmcnIDogJ2NvbnRyb2xsZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkdGxzVHJhbnNwb3J0LnN0YXRlID09PSAnbmV3Jykge1xuICAgICAgICAgICAgICBkdGxzVHJhbnNwb3J0LnN0YXJ0KHJlbW90ZUR0bHNQYXJhbWV0ZXJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBDYWxjdWxhdGUgaW50ZXJzZWN0aW9uIG9mIGNhcGFiaWxpdGllcy5cbiAgICAgICAgICB2YXIgcGFyYW1zID0gZ2V0Q29tbW9uQ2FwYWJpbGl0aWVzKGxvY2FsQ2FwYWJpbGl0aWVzLFxuICAgICAgICAgICAgICByZW1vdGVDYXBhYmlsaXRpZXMpO1xuXG4gICAgICAgICAgLy8gU3RhcnQgdGhlIFJUQ1J0cFNlbmRlci4gVGhlIFJUQ1J0cFJlY2VpdmVyIGZvciB0aGlzXG4gICAgICAgICAgLy8gdHJhbnNjZWl2ZXIgaGFzIGFscmVhZHkgYmVlbiBzdGFydGVkIGluIHNldFJlbW90ZURlc2NyaXB0aW9uLlxuICAgICAgICAgIHBjLl90cmFuc2NlaXZlKHRyYW5zY2VpdmVyLFxuICAgICAgICAgICAgICBwYXJhbXMuY29kZWNzLmxlbmd0aCA+IDAsXG4gICAgICAgICAgICAgIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcGMubG9jYWxEZXNjcmlwdGlvbiA9IHtcbiAgICAgIHR5cGU6IGRlc2NyaXB0aW9uLnR5cGUsXG4gICAgICBzZHA6IGRlc2NyaXB0aW9uLnNkcFxuICAgIH07XG4gICAgaWYgKGRlc2NyaXB0aW9uLnR5cGUgPT09ICdvZmZlcicpIHtcbiAgICAgIHBjLl91cGRhdGVTaWduYWxpbmdTdGF0ZSgnaGF2ZS1sb2NhbC1vZmZlcicpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYy5fdXBkYXRlU2lnbmFsaW5nU3RhdGUoJ3N0YWJsZScpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0UmVtb3RlRGVzY3JpcHRpb24gPSBmdW5jdGlvbihkZXNjcmlwdGlvbikge1xuICAgIHZhciBwYyA9IHRoaXM7XG5cbiAgICAvLyBOb3RlOiBwcmFuc3dlciBpcyBub3Qgc3VwcG9ydGVkLlxuICAgIGlmIChbJ29mZmVyJywgJ2Fuc3dlciddLmluZGV4T2YoZGVzY3JpcHRpb24udHlwZSkgPT09IC0xKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobWFrZUVycm9yKCdUeXBlRXJyb3InLFxuICAgICAgICAgICdVbnN1cHBvcnRlZCB0eXBlIFwiJyArIGRlc2NyaXB0aW9uLnR5cGUgKyAnXCInKSk7XG4gICAgfVxuXG4gICAgaWYgKCFpc0FjdGlvbkFsbG93ZWRJblNpZ25hbGluZ1N0YXRlKCdzZXRSZW1vdGVEZXNjcmlwdGlvbicsXG4gICAgICAgIGRlc2NyaXB0aW9uLnR5cGUsIHBjLnNpZ25hbGluZ1N0YXRlKSB8fCBwYy5faXNDbG9zZWQpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChtYWtlRXJyb3IoJ0ludmFsaWRTdGF0ZUVycm9yJyxcbiAgICAgICAgICAnQ2FuIG5vdCBzZXQgcmVtb3RlICcgKyBkZXNjcmlwdGlvbi50eXBlICtcbiAgICAgICAgICAnIGluIHN0YXRlICcgKyBwYy5zaWduYWxpbmdTdGF0ZSkpO1xuICAgIH1cblxuICAgIHZhciBzdHJlYW1zID0ge307XG4gICAgcGMucmVtb3RlU3RyZWFtcy5mb3JFYWNoKGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgc3RyZWFtc1tzdHJlYW0uaWRdID0gc3RyZWFtO1xuICAgIH0pO1xuICAgIHZhciByZWNlaXZlckxpc3QgPSBbXTtcbiAgICB2YXIgc2VjdGlvbnMgPSBTRFBVdGlscy5zcGxpdFNlY3Rpb25zKGRlc2NyaXB0aW9uLnNkcCk7XG4gICAgdmFyIHNlc3Npb25wYXJ0ID0gc2VjdGlvbnMuc2hpZnQoKTtcbiAgICB2YXIgaXNJY2VMaXRlID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgoc2Vzc2lvbnBhcnQsXG4gICAgICAgICdhPWljZS1saXRlJykubGVuZ3RoID4gMDtcbiAgICB2YXIgdXNpbmdCdW5kbGUgPSBTRFBVdGlscy5tYXRjaFByZWZpeChzZXNzaW9ucGFydCxcbiAgICAgICAgJ2E9Z3JvdXA6QlVORExFICcpLmxlbmd0aCA+IDA7XG4gICAgcGMudXNpbmdCdW5kbGUgPSB1c2luZ0J1bmRsZTtcbiAgICB2YXIgaWNlT3B0aW9ucyA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KHNlc3Npb25wYXJ0LFxuICAgICAgICAnYT1pY2Utb3B0aW9uczonKVswXTtcbiAgICBpZiAoaWNlT3B0aW9ucykge1xuICAgICAgcGMuY2FuVHJpY2tsZUljZUNhbmRpZGF0ZXMgPSBpY2VPcHRpb25zLnN1YnN0cigxNCkuc3BsaXQoJyAnKVxuICAgICAgICAgIC5pbmRleE9mKCd0cmlja2xlJykgPj0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgcGMuY2FuVHJpY2tsZUljZUNhbmRpZGF0ZXMgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBzZWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKG1lZGlhU2VjdGlvbiwgc2RwTUxpbmVJbmRleCkge1xuICAgICAgdmFyIGxpbmVzID0gU0RQVXRpbHMuc3BsaXRMaW5lcyhtZWRpYVNlY3Rpb24pO1xuICAgICAgdmFyIGtpbmQgPSBTRFBVdGlscy5nZXRLaW5kKG1lZGlhU2VjdGlvbik7XG4gICAgICAvLyB0cmVhdCBidW5kbGUtb25seSBhcyBub3QtcmVqZWN0ZWQuXG4gICAgICB2YXIgcmVqZWN0ZWQgPSBTRFBVdGlscy5pc1JlamVjdGVkKG1lZGlhU2VjdGlvbikgJiZcbiAgICAgICAgICBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPWJ1bmRsZS1vbmx5JykubGVuZ3RoID09PSAwO1xuICAgICAgdmFyIHByb3RvY29sID0gbGluZXNbMF0uc3Vic3RyKDIpLnNwbGl0KCcgJylbMl07XG5cbiAgICAgIHZhciBkaXJlY3Rpb24gPSBTRFBVdGlscy5nZXREaXJlY3Rpb24obWVkaWFTZWN0aW9uLCBzZXNzaW9ucGFydCk7XG4gICAgICB2YXIgcmVtb3RlTXNpZCA9IFNEUFV0aWxzLnBhcnNlTXNpZChtZWRpYVNlY3Rpb24pO1xuXG4gICAgICB2YXIgbWlkID0gU0RQVXRpbHMuZ2V0TWlkKG1lZGlhU2VjdGlvbikgfHwgU0RQVXRpbHMuZ2VuZXJhdGVJZGVudGlmaWVyKCk7XG5cbiAgICAgIC8vIFJlamVjdCBkYXRhY2hhbm5lbHMgd2hpY2ggYXJlIG5vdCBpbXBsZW1lbnRlZCB5ZXQuXG4gICAgICBpZiAoKGtpbmQgPT09ICdhcHBsaWNhdGlvbicgJiYgcHJvdG9jb2wgPT09ICdEVExTL1NDVFAnKSB8fCByZWplY3RlZCkge1xuICAgICAgICAvLyBUT0RPOiB0aGlzIGlzIGRhbmdlcm91cyBpbiB0aGUgY2FzZSB3aGVyZSBhIG5vbi1yZWplY3RlZCBtLWxpbmVcbiAgICAgICAgLy8gICAgIGJlY29tZXMgcmVqZWN0ZWQuXG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XSA9IHtcbiAgICAgICAgICBtaWQ6IG1pZCxcbiAgICAgICAgICBraW5kOiBraW5kLFxuICAgICAgICAgIHJlamVjdGVkOiB0cnVlXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKCFyZWplY3RlZCAmJiBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0gJiZcbiAgICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0ucmVqZWN0ZWQpIHtcbiAgICAgICAgLy8gcmVjeWNsZSBhIHJlamVjdGVkIHRyYW5zY2VpdmVyLlxuICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0gPSBwYy5fY3JlYXRlVHJhbnNjZWl2ZXIoa2luZCwgdHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIHZhciB0cmFuc2NlaXZlcjtcbiAgICAgIHZhciBpY2VHYXRoZXJlcjtcbiAgICAgIHZhciBpY2VUcmFuc3BvcnQ7XG4gICAgICB2YXIgZHRsc1RyYW5zcG9ydDtcbiAgICAgIHZhciBydHBSZWNlaXZlcjtcbiAgICAgIHZhciBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzO1xuICAgICAgdmFyIHJlY3ZFbmNvZGluZ1BhcmFtZXRlcnM7XG4gICAgICB2YXIgbG9jYWxDYXBhYmlsaXRpZXM7XG5cbiAgICAgIHZhciB0cmFjaztcbiAgICAgIC8vIEZJWE1FOiBlbnN1cmUgdGhlIG1lZGlhU2VjdGlvbiBoYXMgcnRjcC1tdXggc2V0LlxuICAgICAgdmFyIHJlbW90ZUNhcGFiaWxpdGllcyA9IFNEUFV0aWxzLnBhcnNlUnRwUGFyYW1ldGVycyhtZWRpYVNlY3Rpb24pO1xuICAgICAgdmFyIHJlbW90ZUljZVBhcmFtZXRlcnM7XG4gICAgICB2YXIgcmVtb3RlRHRsc1BhcmFtZXRlcnM7XG4gICAgICBpZiAoIXJlamVjdGVkKSB7XG4gICAgICAgIHJlbW90ZUljZVBhcmFtZXRlcnMgPSBTRFBVdGlscy5nZXRJY2VQYXJhbWV0ZXJzKG1lZGlhU2VjdGlvbixcbiAgICAgICAgICAgIHNlc3Npb25wYXJ0KTtcbiAgICAgICAgcmVtb3RlRHRsc1BhcmFtZXRlcnMgPSBTRFBVdGlscy5nZXREdGxzUGFyYW1ldGVycyhtZWRpYVNlY3Rpb24sXG4gICAgICAgICAgICBzZXNzaW9ucGFydCk7XG4gICAgICAgIHJlbW90ZUR0bHNQYXJhbWV0ZXJzLnJvbGUgPSAnY2xpZW50JztcbiAgICAgIH1cbiAgICAgIHJlY3ZFbmNvZGluZ1BhcmFtZXRlcnMgPVxuICAgICAgICAgIFNEUFV0aWxzLnBhcnNlUnRwRW5jb2RpbmdQYXJhbWV0ZXJzKG1lZGlhU2VjdGlvbik7XG5cbiAgICAgIHZhciBydGNwUGFyYW1ldGVycyA9IFNEUFV0aWxzLnBhcnNlUnRjcFBhcmFtZXRlcnMobWVkaWFTZWN0aW9uKTtcblxuICAgICAgdmFyIGlzQ29tcGxldGUgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sXG4gICAgICAgICAgJ2E9ZW5kLW9mLWNhbmRpZGF0ZXMnLCBzZXNzaW9ucGFydCkubGVuZ3RoID4gMDtcbiAgICAgIHZhciBjYW5kcyA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9Y2FuZGlkYXRlOicpXG4gICAgICAgICAgLm1hcChmdW5jdGlvbihjYW5kKSB7XG4gICAgICAgICAgICByZXR1cm4gU0RQVXRpbHMucGFyc2VDYW5kaWRhdGUoY2FuZCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uKGNhbmQpIHtcbiAgICAgICAgICAgIHJldHVybiBjYW5kLmNvbXBvbmVudCA9PT0gMTtcbiAgICAgICAgICB9KTtcblxuICAgICAgLy8gQ2hlY2sgaWYgd2UgY2FuIHVzZSBCVU5ETEUgYW5kIGRpc3Bvc2UgdHJhbnNwb3J0cy5cbiAgICAgIGlmICgoZGVzY3JpcHRpb24udHlwZSA9PT0gJ29mZmVyJyB8fCBkZXNjcmlwdGlvbi50eXBlID09PSAnYW5zd2VyJykgJiZcbiAgICAgICAgICAhcmVqZWN0ZWQgJiYgdXNpbmdCdW5kbGUgJiYgc2RwTUxpbmVJbmRleCA+IDAgJiZcbiAgICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0pIHtcbiAgICAgICAgcGMuX2Rpc3Bvc2VJY2VBbmREdGxzVHJhbnNwb3J0cyhzZHBNTGluZUluZGV4KTtcbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmljZUdhdGhlcmVyID1cbiAgICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1swXS5pY2VHYXRoZXJlcjtcbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmljZVRyYW5zcG9ydCA9XG4gICAgICAgICAgICBwYy50cmFuc2NlaXZlcnNbMF0uaWNlVHJhbnNwb3J0O1xuICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uZHRsc1RyYW5zcG9ydCA9XG4gICAgICAgICAgICBwYy50cmFuc2NlaXZlcnNbMF0uZHRsc1RyYW5zcG9ydDtcbiAgICAgICAgaWYgKHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5ydHBTZW5kZXIpIHtcbiAgICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0ucnRwU2VuZGVyLnNldFRyYW5zcG9ydChcbiAgICAgICAgICAgICAgcGMudHJhbnNjZWl2ZXJzWzBdLmR0bHNUcmFuc3BvcnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0ucnRwUmVjZWl2ZXIpIHtcbiAgICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0ucnRwUmVjZWl2ZXIuc2V0VHJhbnNwb3J0KFxuICAgICAgICAgICAgICBwYy50cmFuc2NlaXZlcnNbMF0uZHRsc1RyYW5zcG9ydCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChkZXNjcmlwdGlvbi50eXBlID09PSAnb2ZmZXInICYmICFyZWplY3RlZCkge1xuICAgICAgICB0cmFuc2NlaXZlciA9IHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XSB8fFxuICAgICAgICAgICAgcGMuX2NyZWF0ZVRyYW5zY2VpdmVyKGtpbmQpO1xuICAgICAgICB0cmFuc2NlaXZlci5taWQgPSBtaWQ7XG5cbiAgICAgICAgaWYgKCF0cmFuc2NlaXZlci5pY2VHYXRoZXJlcikge1xuICAgICAgICAgIHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyID0gcGMuX2NyZWF0ZUljZUdhdGhlcmVyKHNkcE1MaW5lSW5kZXgsXG4gICAgICAgICAgICAgIHVzaW5nQnVuZGxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjYW5kcy5sZW5ndGggJiYgdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LnN0YXRlID09PSAnbmV3Jykge1xuICAgICAgICAgIGlmIChpc0NvbXBsZXRlICYmICghdXNpbmdCdW5kbGUgfHwgc2RwTUxpbmVJbmRleCA9PT0gMCkpIHtcbiAgICAgICAgICAgIHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydC5zZXRSZW1vdGVDYW5kaWRhdGVzKGNhbmRzKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FuZHMuZm9yRWFjaChmdW5jdGlvbihjYW5kaWRhdGUpIHtcbiAgICAgICAgICAgICAgbWF5YmVBZGRDYW5kaWRhdGUodHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LCBjYW5kaWRhdGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbG9jYWxDYXBhYmlsaXRpZXMgPSB3aW5kb3cuUlRDUnRwUmVjZWl2ZXIuZ2V0Q2FwYWJpbGl0aWVzKGtpbmQpO1xuXG4gICAgICAgIC8vIGZpbHRlciBSVFggdW50aWwgYWRkaXRpb25hbCBzdHVmZiBuZWVkZWQgZm9yIFJUWCBpcyBpbXBsZW1lbnRlZFxuICAgICAgICAvLyBpbiBhZGFwdGVyLmpzXG4gICAgICAgIGlmIChlZGdlVmVyc2lvbiA8IDE1MDE5KSB7XG4gICAgICAgICAgbG9jYWxDYXBhYmlsaXRpZXMuY29kZWNzID0gbG9jYWxDYXBhYmlsaXRpZXMuY29kZWNzLmZpbHRlcihcbiAgICAgICAgICAgICAgZnVuY3Rpb24oY29kZWMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29kZWMubmFtZSAhPT0gJ3J0eCc7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VuZEVuY29kaW5nUGFyYW1ldGVycyA9IHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnMgfHwgW3tcbiAgICAgICAgICBzc3JjOiAoMiAqIHNkcE1MaW5lSW5kZXggKyAyKSAqIDEwMDFcbiAgICAgICAgfV07XG5cbiAgICAgICAgLy8gVE9ETzogcmV3cml0ZSB0byB1c2UgaHR0cDovL3czYy5naXRodWIuaW8vd2VicnRjLXBjLyNzZXQtYXNzb2NpYXRlZC1yZW1vdGUtc3RyZWFtc1xuICAgICAgICB2YXIgaXNOZXdUcmFjayA9IGZhbHNlO1xuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAnc2VuZHJlY3YnIHx8IGRpcmVjdGlvbiA9PT0gJ3NlbmRvbmx5Jykge1xuICAgICAgICAgIGlzTmV3VHJhY2sgPSAhdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXI7XG4gICAgICAgICAgcnRwUmVjZWl2ZXIgPSB0cmFuc2NlaXZlci5ydHBSZWNlaXZlciB8fFxuICAgICAgICAgICAgICBuZXcgd2luZG93LlJUQ1J0cFJlY2VpdmVyKHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQsIGtpbmQpO1xuXG4gICAgICAgICAgaWYgKGlzTmV3VHJhY2spIHtcbiAgICAgICAgICAgIHZhciBzdHJlYW07XG4gICAgICAgICAgICB0cmFjayA9IHJ0cFJlY2VpdmVyLnRyYWNrO1xuICAgICAgICAgICAgLy8gRklYTUU6IGRvZXMgbm90IHdvcmsgd2l0aCBQbGFuIEIuXG4gICAgICAgICAgICBpZiAocmVtb3RlTXNpZCAmJiByZW1vdGVNc2lkLnN0cmVhbSA9PT0gJy0nKSB7XG4gICAgICAgICAgICAgIC8vIG5vLW9wLiBhIHN0cmVhbSBpZCBvZiAnLScgbWVhbnM6IG5vIGFzc29jaWF0ZWQgc3RyZWFtLlxuICAgICAgICAgICAgfSBlbHNlIGlmIChyZW1vdGVNc2lkKSB7XG4gICAgICAgICAgICAgIGlmICghc3RyZWFtc1tyZW1vdGVNc2lkLnN0cmVhbV0pIHtcbiAgICAgICAgICAgICAgICBzdHJlYW1zW3JlbW90ZU1zaWQuc3RyZWFtXSA9IG5ldyB3aW5kb3cuTWVkaWFTdHJlYW0oKTtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc3RyZWFtc1tyZW1vdGVNc2lkLnN0cmVhbV0sICdpZCcsIHtcbiAgICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZW1vdGVNc2lkLnN0cmVhbTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodHJhY2ssICdpZCcsIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlbW90ZU1zaWQudHJhY2s7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgc3RyZWFtID0gc3RyZWFtc1tyZW1vdGVNc2lkLnN0cmVhbV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoIXN0cmVhbXMuZGVmYXVsdCkge1xuICAgICAgICAgICAgICAgIHN0cmVhbXMuZGVmYXVsdCA9IG5ldyB3aW5kb3cuTWVkaWFTdHJlYW0oKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzdHJlYW0gPSBzdHJlYW1zLmRlZmF1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3RyZWFtKSB7XG4gICAgICAgICAgICAgIGFkZFRyYWNrVG9TdHJlYW1BbmRGaXJlRXZlbnQodHJhY2ssIHN0cmVhbSk7XG4gICAgICAgICAgICAgIHRyYW5zY2VpdmVyLmFzc29jaWF0ZWRSZW1vdGVNZWRpYVN0cmVhbXMucHVzaChzdHJlYW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVjZWl2ZXJMaXN0LnB1c2goW3RyYWNrLCBydHBSZWNlaXZlciwgc3RyZWFtXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyICYmIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyLnRyYWNrKSB7XG4gICAgICAgICAgdHJhbnNjZWl2ZXIuYXNzb2NpYXRlZFJlbW90ZU1lZGlhU3RyZWFtcy5mb3JFYWNoKGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgICAgIHZhciBuYXRpdmVUcmFjayA9IHMuZ2V0VHJhY2tzKCkuZmluZChmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgIHJldHVybiB0LmlkID09PSB0cmFuc2NlaXZlci5ydHBSZWNlaXZlci50cmFjay5pZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKG5hdGl2ZVRyYWNrKSB7XG4gICAgICAgICAgICAgIHJlbW92ZVRyYWNrRnJvbVN0cmVhbUFuZEZpcmVFdmVudChuYXRpdmVUcmFjaywgcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdHJhbnNjZWl2ZXIuYXNzb2NpYXRlZFJlbW90ZU1lZGlhU3RyZWFtcyA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJhbnNjZWl2ZXIubG9jYWxDYXBhYmlsaXRpZXMgPSBsb2NhbENhcGFiaWxpdGllcztcbiAgICAgICAgdHJhbnNjZWl2ZXIucmVtb3RlQ2FwYWJpbGl0aWVzID0gcmVtb3RlQ2FwYWJpbGl0aWVzO1xuICAgICAgICB0cmFuc2NlaXZlci5ydHBSZWNlaXZlciA9IHJ0cFJlY2VpdmVyO1xuICAgICAgICB0cmFuc2NlaXZlci5ydGNwUGFyYW1ldGVycyA9IHJ0Y3BQYXJhbWV0ZXJzO1xuICAgICAgICB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzID0gc2VuZEVuY29kaW5nUGFyYW1ldGVycztcbiAgICAgICAgdHJhbnNjZWl2ZXIucmVjdkVuY29kaW5nUGFyYW1ldGVycyA9IHJlY3ZFbmNvZGluZ1BhcmFtZXRlcnM7XG5cbiAgICAgICAgLy8gU3RhcnQgdGhlIFJUQ1J0cFJlY2VpdmVyIG5vdy4gVGhlIFJUUFNlbmRlciBpcyBzdGFydGVkIGluXG4gICAgICAgIC8vIHNldExvY2FsRGVzY3JpcHRpb24uXG4gICAgICAgIHBjLl90cmFuc2NlaXZlKHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XSxcbiAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgaXNOZXdUcmFjayk7XG4gICAgICB9IGVsc2UgaWYgKGRlc2NyaXB0aW9uLnR5cGUgPT09ICdhbnN3ZXInICYmICFyZWplY3RlZCkge1xuICAgICAgICB0cmFuc2NlaXZlciA9IHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XTtcbiAgICAgICAgaWNlR2F0aGVyZXIgPSB0cmFuc2NlaXZlci5pY2VHYXRoZXJlcjtcbiAgICAgICAgaWNlVHJhbnNwb3J0ID0gdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0O1xuICAgICAgICBkdGxzVHJhbnNwb3J0ID0gdHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydDtcbiAgICAgICAgcnRwUmVjZWl2ZXIgPSB0cmFuc2NlaXZlci5ydHBSZWNlaXZlcjtcbiAgICAgICAgc2VuZEVuY29kaW5nUGFyYW1ldGVycyA9IHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnM7XG4gICAgICAgIGxvY2FsQ2FwYWJpbGl0aWVzID0gdHJhbnNjZWl2ZXIubG9jYWxDYXBhYmlsaXRpZXM7XG5cbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLnJlY3ZFbmNvZGluZ1BhcmFtZXRlcnMgPVxuICAgICAgICAgICAgcmVjdkVuY29kaW5nUGFyYW1ldGVycztcbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLnJlbW90ZUNhcGFiaWxpdGllcyA9XG4gICAgICAgICAgICByZW1vdGVDYXBhYmlsaXRpZXM7XG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5ydGNwUGFyYW1ldGVycyA9IHJ0Y3BQYXJhbWV0ZXJzO1xuXG4gICAgICAgIGlmIChjYW5kcy5sZW5ndGggJiYgaWNlVHJhbnNwb3J0LnN0YXRlID09PSAnbmV3Jykge1xuICAgICAgICAgIGlmICgoaXNJY2VMaXRlIHx8IGlzQ29tcGxldGUpICYmXG4gICAgICAgICAgICAgICghdXNpbmdCdW5kbGUgfHwgc2RwTUxpbmVJbmRleCA9PT0gMCkpIHtcbiAgICAgICAgICAgIGljZVRyYW5zcG9ydC5zZXRSZW1vdGVDYW5kaWRhdGVzKGNhbmRzKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FuZHMuZm9yRWFjaChmdW5jdGlvbihjYW5kaWRhdGUpIHtcbiAgICAgICAgICAgICAgbWF5YmVBZGRDYW5kaWRhdGUodHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LCBjYW5kaWRhdGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF1c2luZ0J1bmRsZSB8fCBzZHBNTGluZUluZGV4ID09PSAwKSB7XG4gICAgICAgICAgaWYgKGljZVRyYW5zcG9ydC5zdGF0ZSA9PT0gJ25ldycpIHtcbiAgICAgICAgICAgIGljZVRyYW5zcG9ydC5zdGFydChpY2VHYXRoZXJlciwgcmVtb3RlSWNlUGFyYW1ldGVycyxcbiAgICAgICAgICAgICAgICAnY29udHJvbGxpbmcnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGR0bHNUcmFuc3BvcnQuc3RhdGUgPT09ICduZXcnKSB7XG4gICAgICAgICAgICBkdGxzVHJhbnNwb3J0LnN0YXJ0KHJlbW90ZUR0bHNQYXJhbWV0ZXJzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwYy5fdHJhbnNjZWl2ZSh0cmFuc2NlaXZlcixcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9PT0gJ3NlbmRyZWN2JyB8fCBkaXJlY3Rpb24gPT09ICdyZWN2b25seScsXG4gICAgICAgICAgICBkaXJlY3Rpb24gPT09ICdzZW5kcmVjdicgfHwgZGlyZWN0aW9uID09PSAnc2VuZG9ubHknKTtcblxuICAgICAgICAvLyBUT0RPOiByZXdyaXRlIHRvIHVzZSBodHRwOi8vdzNjLmdpdGh1Yi5pby93ZWJydGMtcGMvI3NldC1hc3NvY2lhdGVkLXJlbW90ZS1zdHJlYW1zXG4gICAgICAgIGlmIChydHBSZWNlaXZlciAmJlxuICAgICAgICAgICAgKGRpcmVjdGlvbiA9PT0gJ3NlbmRyZWN2JyB8fCBkaXJlY3Rpb24gPT09ICdzZW5kb25seScpKSB7XG4gICAgICAgICAgdHJhY2sgPSBydHBSZWNlaXZlci50cmFjaztcbiAgICAgICAgICBpZiAocmVtb3RlTXNpZCkge1xuICAgICAgICAgICAgaWYgKCFzdHJlYW1zW3JlbW90ZU1zaWQuc3RyZWFtXSkge1xuICAgICAgICAgICAgICBzdHJlYW1zW3JlbW90ZU1zaWQuc3RyZWFtXSA9IG5ldyB3aW5kb3cuTWVkaWFTdHJlYW0oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFkZFRyYWNrVG9TdHJlYW1BbmRGaXJlRXZlbnQodHJhY2ssIHN0cmVhbXNbcmVtb3RlTXNpZC5zdHJlYW1dKTtcbiAgICAgICAgICAgIHJlY2VpdmVyTGlzdC5wdXNoKFt0cmFjaywgcnRwUmVjZWl2ZXIsIHN0cmVhbXNbcmVtb3RlTXNpZC5zdHJlYW1dXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghc3RyZWFtcy5kZWZhdWx0KSB7XG4gICAgICAgICAgICAgIHN0cmVhbXMuZGVmYXVsdCA9IG5ldyB3aW5kb3cuTWVkaWFTdHJlYW0oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFkZFRyYWNrVG9TdHJlYW1BbmRGaXJlRXZlbnQodHJhY2ssIHN0cmVhbXMuZGVmYXVsdCk7XG4gICAgICAgICAgICByZWNlaXZlckxpc3QucHVzaChbdHJhY2ssIHJ0cFJlY2VpdmVyLCBzdHJlYW1zLmRlZmF1bHRdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gRklYTUU6IGFjdHVhbGx5IHRoZSByZWNlaXZlciBzaG91bGQgYmUgY3JlYXRlZCBsYXRlci5cbiAgICAgICAgICBkZWxldGUgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChwYy5fZHRsc1JvbGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcGMuX2R0bHNSb2xlID0gZGVzY3JpcHRpb24udHlwZSA9PT0gJ29mZmVyJyA/ICdhY3RpdmUnIDogJ3Bhc3NpdmUnO1xuICAgIH1cblxuICAgIHBjLnJlbW90ZURlc2NyaXB0aW9uID0ge1xuICAgICAgdHlwZTogZGVzY3JpcHRpb24udHlwZSxcbiAgICAgIHNkcDogZGVzY3JpcHRpb24uc2RwXG4gICAgfTtcbiAgICBpZiAoZGVzY3JpcHRpb24udHlwZSA9PT0gJ29mZmVyJykge1xuICAgICAgcGMuX3VwZGF0ZVNpZ25hbGluZ1N0YXRlKCdoYXZlLXJlbW90ZS1vZmZlcicpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYy5fdXBkYXRlU2lnbmFsaW5nU3RhdGUoJ3N0YWJsZScpO1xuICAgIH1cbiAgICBPYmplY3Qua2V5cyhzdHJlYW1zKS5mb3JFYWNoKGZ1bmN0aW9uKHNpZCkge1xuICAgICAgdmFyIHN0cmVhbSA9IHN0cmVhbXNbc2lkXTtcbiAgICAgIGlmIChzdHJlYW0uZ2V0VHJhY2tzKCkubGVuZ3RoKSB7XG4gICAgICAgIGlmIChwYy5yZW1vdGVTdHJlYW1zLmluZGV4T2Yoc3RyZWFtKSA9PT0gLTEpIHtcbiAgICAgICAgICBwYy5yZW1vdGVTdHJlYW1zLnB1c2goc3RyZWFtKTtcbiAgICAgICAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ2FkZHN0cmVhbScpO1xuICAgICAgICAgIGV2ZW50LnN0cmVhbSA9IHN0cmVhbTtcbiAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHBjLl9kaXNwYXRjaEV2ZW50KCdhZGRzdHJlYW0nLCBldmVudCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZWNlaXZlckxpc3QuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgdmFyIHRyYWNrID0gaXRlbVswXTtcbiAgICAgICAgICB2YXIgcmVjZWl2ZXIgPSBpdGVtWzFdO1xuICAgICAgICAgIGlmIChzdHJlYW0uaWQgIT09IGl0ZW1bMl0uaWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZmlyZUFkZFRyYWNrKHBjLCB0cmFjaywgcmVjZWl2ZXIsIFtzdHJlYW1dKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmVjZWl2ZXJMaXN0LmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZmlyZUFkZFRyYWNrKHBjLCBpdGVtWzBdLCBpdGVtWzFdLCBbXSk7XG4gICAgfSk7XG5cbiAgICAvLyBjaGVjayB3aGV0aGVyIGFkZEljZUNhbmRpZGF0ZSh7fSkgd2FzIGNhbGxlZCB3aXRoaW4gZm91ciBzZWNvbmRzIGFmdGVyXG4gICAgLy8gc2V0UmVtb3RlRGVzY3JpcHRpb24uXG4gICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIShwYyAmJiBwYy50cmFuc2NlaXZlcnMpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHBjLnRyYW5zY2VpdmVycy5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XG4gICAgICAgIGlmICh0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQgJiZcbiAgICAgICAgICAgIHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydC5zdGF0ZSA9PT0gJ25ldycgJiZcbiAgICAgICAgICAgIHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydC5nZXRSZW1vdGVDYW5kaWRhdGVzKCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGNvbnNvbGUud2FybignVGltZW91dCBmb3IgYWRkUmVtb3RlQ2FuZGlkYXRlLiBDb25zaWRlciBzZW5kaW5nICcgK1xuICAgICAgICAgICAgICAnYW4gZW5kLW9mLWNhbmRpZGF0ZXMgbm90aWZpY2F0aW9uJyk7XG4gICAgICAgICAgdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LmFkZFJlbW90ZUNhbmRpZGF0ZSh7fSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIDQwMDApO1xuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcbiAgICAgIC8qIG5vdCB5ZXRcbiAgICAgIGlmICh0cmFuc2NlaXZlci5pY2VHYXRoZXJlcikge1xuICAgICAgICB0cmFuc2NlaXZlci5pY2VHYXRoZXJlci5jbG9zZSgpO1xuICAgICAgfVxuICAgICAgKi9cbiAgICAgIGlmICh0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQpIHtcbiAgICAgICAgdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LnN0b3AoKTtcbiAgICAgIH1cbiAgICAgIGlmICh0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0KSB7XG4gICAgICAgIHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQuc3RvcCgpO1xuICAgICAgfVxuICAgICAgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlcikge1xuICAgICAgICB0cmFuc2NlaXZlci5ydHBTZW5kZXIuc3RvcCgpO1xuICAgICAgfVxuICAgICAgaWYgKHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyKSB7XG4gICAgICAgIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyLnN0b3AoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBGSVhNRTogY2xlYW4gdXAgdHJhY2tzLCBsb2NhbCBzdHJlYW1zLCByZW1vdGUgc3RyZWFtcywgZXRjXG4gICAgdGhpcy5faXNDbG9zZWQgPSB0cnVlO1xuICAgIHRoaXMuX3VwZGF0ZVNpZ25hbGluZ1N0YXRlKCdjbG9zZWQnKTtcbiAgfTtcblxuICAvLyBVcGRhdGUgdGhlIHNpZ25hbGluZyBzdGF0ZS5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl91cGRhdGVTaWduYWxpbmdTdGF0ZSA9IGZ1bmN0aW9uKG5ld1N0YXRlKSB7XG4gICAgdGhpcy5zaWduYWxpbmdTdGF0ZSA9IG5ld1N0YXRlO1xuICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgnc2lnbmFsaW5nc3RhdGVjaGFuZ2UnKTtcbiAgICB0aGlzLl9kaXNwYXRjaEV2ZW50KCdzaWduYWxpbmdzdGF0ZWNoYW5nZScsIGV2ZW50KTtcbiAgfTtcblxuICAvLyBEZXRlcm1pbmUgd2hldGhlciB0byBmaXJlIHRoZSBuZWdvdGlhdGlvbm5lZWRlZCBldmVudC5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl9tYXliZUZpcmVOZWdvdGlhdGlvbk5lZWRlZCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBwYyA9IHRoaXM7XG4gICAgaWYgKHRoaXMuc2lnbmFsaW5nU3RhdGUgIT09ICdzdGFibGUnIHx8IHRoaXMubmVlZE5lZ290aWF0aW9uID09PSB0cnVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMubmVlZE5lZ290aWF0aW9uID0gdHJ1ZTtcbiAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIGlmIChwYy5uZWVkTmVnb3RpYXRpb24pIHtcbiAgICAgICAgcGMubmVlZE5lZ290aWF0aW9uID0gZmFsc2U7XG4gICAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgnbmVnb3RpYXRpb25uZWVkZWQnKTtcbiAgICAgICAgcGMuX2Rpc3BhdGNoRXZlbnQoJ25lZ290aWF0aW9ubmVlZGVkJywgZXZlbnQpO1xuICAgICAgfVxuICAgIH0sIDApO1xuICB9O1xuXG4gIC8vIFVwZGF0ZSB0aGUgaWNlIGNvbm5lY3Rpb24gc3RhdGUuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fdXBkYXRlSWNlQ29ubmVjdGlvblN0YXRlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG5ld1N0YXRlO1xuICAgIHZhciBzdGF0ZXMgPSB7XG4gICAgICAnbmV3JzogMCxcbiAgICAgIGNsb3NlZDogMCxcbiAgICAgIGNoZWNraW5nOiAwLFxuICAgICAgY29ubmVjdGVkOiAwLFxuICAgICAgY29tcGxldGVkOiAwLFxuICAgICAgZGlzY29ubmVjdGVkOiAwLFxuICAgICAgZmFpbGVkOiAwXG4gICAgfTtcbiAgICB0aGlzLnRyYW5zY2VpdmVycy5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XG4gICAgICBzdGF0ZXNbdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LnN0YXRlXSsrO1xuICAgIH0pO1xuXG4gICAgbmV3U3RhdGUgPSAnbmV3JztcbiAgICBpZiAoc3RhdGVzLmZhaWxlZCA+IDApIHtcbiAgICAgIG5ld1N0YXRlID0gJ2ZhaWxlZCc7XG4gICAgfSBlbHNlIGlmIChzdGF0ZXMuY2hlY2tpbmcgPiAwKSB7XG4gICAgICBuZXdTdGF0ZSA9ICdjaGVja2luZyc7XG4gICAgfSBlbHNlIGlmIChzdGF0ZXMuZGlzY29ubmVjdGVkID4gMCkge1xuICAgICAgbmV3U3RhdGUgPSAnZGlzY29ubmVjdGVkJztcbiAgICB9IGVsc2UgaWYgKHN0YXRlcy5uZXcgPiAwKSB7XG4gICAgICBuZXdTdGF0ZSA9ICduZXcnO1xuICAgIH0gZWxzZSBpZiAoc3RhdGVzLmNvbm5lY3RlZCA+IDApIHtcbiAgICAgIG5ld1N0YXRlID0gJ2Nvbm5lY3RlZCc7XG4gICAgfSBlbHNlIGlmIChzdGF0ZXMuY29tcGxldGVkID4gMCkge1xuICAgICAgbmV3U3RhdGUgPSAnY29tcGxldGVkJztcbiAgICB9XG5cbiAgICBpZiAobmV3U3RhdGUgIT09IHRoaXMuaWNlQ29ubmVjdGlvblN0YXRlKSB7XG4gICAgICB0aGlzLmljZUNvbm5lY3Rpb25TdGF0ZSA9IG5ld1N0YXRlO1xuICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdpY2Vjb25uZWN0aW9uc3RhdGVjaGFuZ2UnKTtcbiAgICAgIHRoaXMuX2Rpc3BhdGNoRXZlbnQoJ2ljZWNvbm5lY3Rpb25zdGF0ZWNoYW5nZScsIGV2ZW50KTtcbiAgICB9XG4gIH07XG5cbiAgLy8gVXBkYXRlIHRoZSBjb25uZWN0aW9uIHN0YXRlLlxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX3VwZGF0ZUNvbm5lY3Rpb25TdGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBuZXdTdGF0ZTtcbiAgICB2YXIgc3RhdGVzID0ge1xuICAgICAgJ25ldyc6IDAsXG4gICAgICBjbG9zZWQ6IDAsXG4gICAgICBjb25uZWN0aW5nOiAwLFxuICAgICAgY29ubmVjdGVkOiAwLFxuICAgICAgY29tcGxldGVkOiAwLFxuICAgICAgZGlzY29ubmVjdGVkOiAwLFxuICAgICAgZmFpbGVkOiAwXG4gICAgfTtcbiAgICB0aGlzLnRyYW5zY2VpdmVycy5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XG4gICAgICBzdGF0ZXNbdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LnN0YXRlXSsrO1xuICAgICAgc3RhdGVzW3RyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQuc3RhdGVdKys7XG4gICAgfSk7XG4gICAgLy8gSUNFVHJhbnNwb3J0LmNvbXBsZXRlZCBhbmQgY29ubmVjdGVkIGFyZSB0aGUgc2FtZSBmb3IgdGhpcyBwdXJwb3NlLlxuICAgIHN0YXRlcy5jb25uZWN0ZWQgKz0gc3RhdGVzLmNvbXBsZXRlZDtcblxuICAgIG5ld1N0YXRlID0gJ25ldyc7XG4gICAgaWYgKHN0YXRlcy5mYWlsZWQgPiAwKSB7XG4gICAgICBuZXdTdGF0ZSA9ICdmYWlsZWQnO1xuICAgIH0gZWxzZSBpZiAoc3RhdGVzLmNvbm5lY3RpbmcgPiAwKSB7XG4gICAgICBuZXdTdGF0ZSA9ICdjb25uZWN0aW5nJztcbiAgICB9IGVsc2UgaWYgKHN0YXRlcy5kaXNjb25uZWN0ZWQgPiAwKSB7XG4gICAgICBuZXdTdGF0ZSA9ICdkaXNjb25uZWN0ZWQnO1xuICAgIH0gZWxzZSBpZiAoc3RhdGVzLm5ldyA+IDApIHtcbiAgICAgIG5ld1N0YXRlID0gJ25ldyc7XG4gICAgfSBlbHNlIGlmIChzdGF0ZXMuY29ubmVjdGVkID4gMCkge1xuICAgICAgbmV3U3RhdGUgPSAnY29ubmVjdGVkJztcbiAgICB9XG5cbiAgICBpZiAobmV3U3RhdGUgIT09IHRoaXMuY29ubmVjdGlvblN0YXRlKSB7XG4gICAgICB0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9IG5ld1N0YXRlO1xuICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdjb25uZWN0aW9uc3RhdGVjaGFuZ2UnKTtcbiAgICAgIHRoaXMuX2Rpc3BhdGNoRXZlbnQoJ2Nvbm5lY3Rpb25zdGF0ZWNoYW5nZScsIGV2ZW50KTtcbiAgICB9XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmNyZWF0ZU9mZmVyID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHBjID0gdGhpcztcblxuICAgIGlmIChwYy5faXNDbG9zZWQpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChtYWtlRXJyb3IoJ0ludmFsaWRTdGF0ZUVycm9yJyxcbiAgICAgICAgICAnQ2FuIG5vdCBjYWxsIGNyZWF0ZU9mZmVyIGFmdGVyIGNsb3NlJykpO1xuICAgIH1cblxuICAgIHZhciBudW1BdWRpb1RyYWNrcyA9IHBjLnRyYW5zY2VpdmVycy5maWx0ZXIoZnVuY3Rpb24odCkge1xuICAgICAgcmV0dXJuIHQua2luZCA9PT0gJ2F1ZGlvJztcbiAgICB9KS5sZW5ndGg7XG4gICAgdmFyIG51bVZpZGVvVHJhY2tzID0gcGMudHJhbnNjZWl2ZXJzLmZpbHRlcihmdW5jdGlvbih0KSB7XG4gICAgICByZXR1cm4gdC5raW5kID09PSAndmlkZW8nO1xuICAgIH0pLmxlbmd0aDtcblxuICAgIC8vIERldGVybWluZSBudW1iZXIgb2YgYXVkaW8gYW5kIHZpZGVvIHRyYWNrcyB3ZSBuZWVkIHRvIHNlbmQvcmVjdi5cbiAgICB2YXIgb2ZmZXJPcHRpb25zID0gYXJndW1lbnRzWzBdO1xuICAgIGlmIChvZmZlck9wdGlvbnMpIHtcbiAgICAgIC8vIFJlamVjdCBDaHJvbWUgbGVnYWN5IGNvbnN0cmFpbnRzLlxuICAgICAgaWYgKG9mZmVyT3B0aW9ucy5tYW5kYXRvcnkgfHwgb2ZmZXJPcHRpb25zLm9wdGlvbmFsKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgICAnTGVnYWN5IG1hbmRhdG9yeS9vcHRpb25hbCBjb25zdHJhaW50cyBub3Qgc3VwcG9ydGVkLicpO1xuICAgICAgfVxuICAgICAgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZUF1ZGlvICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZUF1ZGlvID09PSB0cnVlKSB7XG4gICAgICAgICAgbnVtQXVkaW9UcmFja3MgPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZUF1ZGlvID09PSBmYWxzZSkge1xuICAgICAgICAgIG51bUF1ZGlvVHJhY2tzID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBudW1BdWRpb1RyYWNrcyA9IG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZUF1ZGlvO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlVmlkZW8gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlVmlkZW8gPT09IHRydWUpIHtcbiAgICAgICAgICBudW1WaWRlb1RyYWNrcyA9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlVmlkZW8gPT09IGZhbHNlKSB7XG4gICAgICAgICAgbnVtVmlkZW9UcmFja3MgPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG51bVZpZGVvVHJhY2tzID0gb2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlVmlkZW87XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBwYy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xuICAgICAgaWYgKHRyYW5zY2VpdmVyLmtpbmQgPT09ICdhdWRpbycpIHtcbiAgICAgICAgbnVtQXVkaW9UcmFja3MtLTtcbiAgICAgICAgaWYgKG51bUF1ZGlvVHJhY2tzIDwgMCkge1xuICAgICAgICAgIHRyYW5zY2VpdmVyLndhbnRSZWNlaXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIua2luZCA9PT0gJ3ZpZGVvJykge1xuICAgICAgICBudW1WaWRlb1RyYWNrcy0tO1xuICAgICAgICBpZiAobnVtVmlkZW9UcmFja3MgPCAwKSB7XG4gICAgICAgICAgdHJhbnNjZWl2ZXIud2FudFJlY2VpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gQ3JlYXRlIE0tbGluZXMgZm9yIHJlY3Zvbmx5IHN0cmVhbXMuXG4gICAgd2hpbGUgKG51bUF1ZGlvVHJhY2tzID4gMCB8fCBudW1WaWRlb1RyYWNrcyA+IDApIHtcbiAgICAgIGlmIChudW1BdWRpb1RyYWNrcyA+IDApIHtcbiAgICAgICAgcGMuX2NyZWF0ZVRyYW5zY2VpdmVyKCdhdWRpbycpO1xuICAgICAgICBudW1BdWRpb1RyYWNrcy0tO1xuICAgICAgfVxuICAgICAgaWYgKG51bVZpZGVvVHJhY2tzID4gMCkge1xuICAgICAgICBwYy5fY3JlYXRlVHJhbnNjZWl2ZXIoJ3ZpZGVvJyk7XG4gICAgICAgIG51bVZpZGVvVHJhY2tzLS07XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHNkcCA9IFNEUFV0aWxzLndyaXRlU2Vzc2lvbkJvaWxlcnBsYXRlKHBjLl9zZHBTZXNzaW9uSWQsXG4gICAgICAgIHBjLl9zZHBTZXNzaW9uVmVyc2lvbisrKTtcbiAgICBwYy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlciwgc2RwTUxpbmVJbmRleCkge1xuICAgICAgLy8gRm9yIGVhY2ggdHJhY2ssIGNyZWF0ZSBhbiBpY2UgZ2F0aGVyZXIsIGljZSB0cmFuc3BvcnQsXG4gICAgICAvLyBkdGxzIHRyYW5zcG9ydCwgcG90ZW50aWFsbHkgcnRwc2VuZGVyIGFuZCBydHByZWNlaXZlci5cbiAgICAgIHZhciB0cmFjayA9IHRyYW5zY2VpdmVyLnRyYWNrO1xuICAgICAgdmFyIGtpbmQgPSB0cmFuc2NlaXZlci5raW5kO1xuICAgICAgdmFyIG1pZCA9IHRyYW5zY2VpdmVyLm1pZCB8fCBTRFBVdGlscy5nZW5lcmF0ZUlkZW50aWZpZXIoKTtcbiAgICAgIHRyYW5zY2VpdmVyLm1pZCA9IG1pZDtcblxuICAgICAgaWYgKCF0cmFuc2NlaXZlci5pY2VHYXRoZXJlcikge1xuICAgICAgICB0cmFuc2NlaXZlci5pY2VHYXRoZXJlciA9IHBjLl9jcmVhdGVJY2VHYXRoZXJlcihzZHBNTGluZUluZGV4LFxuICAgICAgICAgICAgcGMudXNpbmdCdW5kbGUpO1xuICAgICAgfVxuXG4gICAgICB2YXIgbG9jYWxDYXBhYmlsaXRpZXMgPSB3aW5kb3cuUlRDUnRwU2VuZGVyLmdldENhcGFiaWxpdGllcyhraW5kKTtcbiAgICAgIC8vIGZpbHRlciBSVFggdW50aWwgYWRkaXRpb25hbCBzdHVmZiBuZWVkZWQgZm9yIFJUWCBpcyBpbXBsZW1lbnRlZFxuICAgICAgLy8gaW4gYWRhcHRlci5qc1xuICAgICAgaWYgKGVkZ2VWZXJzaW9uIDwgMTUwMTkpIHtcbiAgICAgICAgbG9jYWxDYXBhYmlsaXRpZXMuY29kZWNzID0gbG9jYWxDYXBhYmlsaXRpZXMuY29kZWNzLmZpbHRlcihcbiAgICAgICAgICAgIGZ1bmN0aW9uKGNvZGVjKSB7XG4gICAgICAgICAgICAgIHJldHVybiBjb2RlYy5uYW1lICE9PSAncnR4JztcbiAgICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgbG9jYWxDYXBhYmlsaXRpZXMuY29kZWNzLmZvckVhY2goZnVuY3Rpb24oY29kZWMpIHtcbiAgICAgICAgLy8gd29yayBhcm91bmQgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3dlYnJ0Yy9pc3N1ZXMvZGV0YWlsP2lkPTY1NTJcbiAgICAgICAgLy8gYnkgYWRkaW5nIGxldmVsLWFzeW1tZXRyeS1hbGxvd2VkPTFcbiAgICAgICAgaWYgKGNvZGVjLm5hbWUgPT09ICdIMjY0JyAmJlxuICAgICAgICAgICAgY29kZWMucGFyYW1ldGVyc1snbGV2ZWwtYXN5bW1ldHJ5LWFsbG93ZWQnXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY29kZWMucGFyYW1ldGVyc1snbGV2ZWwtYXN5bW1ldHJ5LWFsbG93ZWQnXSA9ICcxJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZvciBzdWJzZXF1ZW50IG9mZmVycywgd2UgbWlnaHQgaGF2ZSB0byByZS11c2UgdGhlIHBheWxvYWRcbiAgICAgICAgLy8gdHlwZSBvZiB0aGUgbGFzdCBvZmZlci5cbiAgICAgICAgaWYgKHRyYW5zY2VpdmVyLnJlbW90ZUNhcGFiaWxpdGllcyAmJlxuICAgICAgICAgICAgdHJhbnNjZWl2ZXIucmVtb3RlQ2FwYWJpbGl0aWVzLmNvZGVjcykge1xuICAgICAgICAgIHRyYW5zY2VpdmVyLnJlbW90ZUNhcGFiaWxpdGllcy5jb2RlY3MuZm9yRWFjaChmdW5jdGlvbihyZW1vdGVDb2RlYykge1xuICAgICAgICAgICAgaWYgKGNvZGVjLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gcmVtb3RlQ29kZWMubmFtZS50b0xvd2VyQ2FzZSgpICYmXG4gICAgICAgICAgICAgICAgY29kZWMuY2xvY2tSYXRlID09PSByZW1vdGVDb2RlYy5jbG9ja1JhdGUpIHtcbiAgICAgICAgICAgICAgY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGUgPSByZW1vdGVDb2RlYy5wYXlsb2FkVHlwZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBsb2NhbENhcGFiaWxpdGllcy5oZWFkZXJFeHRlbnNpb25zLmZvckVhY2goZnVuY3Rpb24oaGRyRXh0KSB7XG4gICAgICAgIHZhciByZW1vdGVFeHRlbnNpb25zID0gdHJhbnNjZWl2ZXIucmVtb3RlQ2FwYWJpbGl0aWVzICYmXG4gICAgICAgICAgICB0cmFuc2NlaXZlci5yZW1vdGVDYXBhYmlsaXRpZXMuaGVhZGVyRXh0ZW5zaW9ucyB8fCBbXTtcbiAgICAgICAgcmVtb3RlRXh0ZW5zaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHJIZHJFeHQpIHtcbiAgICAgICAgICBpZiAoaGRyRXh0LnVyaSA9PT0gckhkckV4dC51cmkpIHtcbiAgICAgICAgICAgIGhkckV4dC5pZCA9IHJIZHJFeHQuaWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBnZW5lcmF0ZSBhbiBzc3JjIG5vdywgdG8gYmUgdXNlZCBsYXRlciBpbiBydHBTZW5kZXIuc2VuZFxuICAgICAgdmFyIHNlbmRFbmNvZGluZ1BhcmFtZXRlcnMgPSB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzIHx8IFt7XG4gICAgICAgIHNzcmM6ICgyICogc2RwTUxpbmVJbmRleCArIDEpICogMTAwMVxuICAgICAgfV07XG4gICAgICBpZiAodHJhY2spIHtcbiAgICAgICAgLy8gYWRkIFJUWFxuICAgICAgICBpZiAoZWRnZVZlcnNpb24gPj0gMTUwMTkgJiYga2luZCA9PT0gJ3ZpZGVvJyAmJlxuICAgICAgICAgICAgIXNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4KSB7XG4gICAgICAgICAgc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHggPSB7XG4gICAgICAgICAgICBzc3JjOiBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmMgKyAxXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodHJhbnNjZWl2ZXIud2FudFJlY2VpdmUpIHtcbiAgICAgICAgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIgPSBuZXcgd2luZG93LlJUQ1J0cFJlY2VpdmVyKFxuICAgICAgICAgICAgdHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydCwga2luZCk7XG4gICAgICB9XG5cbiAgICAgIHRyYW5zY2VpdmVyLmxvY2FsQ2FwYWJpbGl0aWVzID0gbG9jYWxDYXBhYmlsaXRpZXM7XG4gICAgICB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzID0gc2VuZEVuY29kaW5nUGFyYW1ldGVycztcbiAgICB9KTtcblxuICAgIC8vIGFsd2F5cyBvZmZlciBCVU5ETEUgYW5kIGRpc3Bvc2Ugb24gcmV0dXJuIGlmIG5vdCBzdXBwb3J0ZWQuXG4gICAgaWYgKHBjLl9jb25maWcuYnVuZGxlUG9saWN5ICE9PSAnbWF4LWNvbXBhdCcpIHtcbiAgICAgIHNkcCArPSAnYT1ncm91cDpCVU5ETEUgJyArIHBjLnRyYW5zY2VpdmVycy5tYXAoZnVuY3Rpb24odCkge1xuICAgICAgICByZXR1cm4gdC5taWQ7XG4gICAgICB9KS5qb2luKCcgJykgKyAnXFxyXFxuJztcbiAgICB9XG4gICAgc2RwICs9ICdhPWljZS1vcHRpb25zOnRyaWNrbGVcXHJcXG4nO1xuXG4gICAgcGMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIsIHNkcE1MaW5lSW5kZXgpIHtcbiAgICAgIHNkcCArPSB3cml0ZU1lZGlhU2VjdGlvbih0cmFuc2NlaXZlciwgdHJhbnNjZWl2ZXIubG9jYWxDYXBhYmlsaXRpZXMsXG4gICAgICAgICAgJ29mZmVyJywgdHJhbnNjZWl2ZXIuc3RyZWFtLCBwYy5fZHRsc1JvbGUpO1xuICAgICAgc2RwICs9ICdhPXJ0Y3AtcnNpemVcXHJcXG4nO1xuXG4gICAgICBpZiAodHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIgJiYgcGMuaWNlR2F0aGVyaW5nU3RhdGUgIT09ICduZXcnICYmXG4gICAgICAgICAgKHNkcE1MaW5lSW5kZXggPT09IDAgfHwgIXBjLnVzaW5nQnVuZGxlKSkge1xuICAgICAgICB0cmFuc2NlaXZlci5pY2VHYXRoZXJlci5nZXRMb2NhbENhbmRpZGF0ZXMoKS5mb3JFYWNoKGZ1bmN0aW9uKGNhbmQpIHtcbiAgICAgICAgICBjYW5kLmNvbXBvbmVudCA9IDE7XG4gICAgICAgICAgc2RwICs9ICdhPScgKyBTRFBVdGlscy53cml0ZUNhbmRpZGF0ZShjYW5kKSArICdcXHJcXG4nO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIuc3RhdGUgPT09ICdjb21wbGV0ZWQnKSB7XG4gICAgICAgICAgc2RwICs9ICdhPWVuZC1vZi1jYW5kaWRhdGVzXFxyXFxuJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIGRlc2MgPSBuZXcgd2luZG93LlJUQ1Nlc3Npb25EZXNjcmlwdGlvbih7XG4gICAgICB0eXBlOiAnb2ZmZXInLFxuICAgICAgc2RwOiBzZHBcbiAgICB9KTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRlc2MpO1xuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5jcmVhdGVBbnN3ZXIgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcGMgPSB0aGlzO1xuXG4gICAgaWYgKHBjLl9pc0Nsb3NlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG1ha2VFcnJvcignSW52YWxpZFN0YXRlRXJyb3InLFxuICAgICAgICAgICdDYW4gbm90IGNhbGwgY3JlYXRlQW5zd2VyIGFmdGVyIGNsb3NlJykpO1xuICAgIH1cblxuICAgIGlmICghKHBjLnNpZ25hbGluZ1N0YXRlID09PSAnaGF2ZS1yZW1vdGUtb2ZmZXInIHx8XG4gICAgICAgIHBjLnNpZ25hbGluZ1N0YXRlID09PSAnaGF2ZS1sb2NhbC1wcmFuc3dlcicpKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobWFrZUVycm9yKCdJbnZhbGlkU3RhdGVFcnJvcicsXG4gICAgICAgICAgJ0NhbiBub3QgY2FsbCBjcmVhdGVBbnN3ZXIgaW4gc2lnbmFsaW5nU3RhdGUgJyArIHBjLnNpZ25hbGluZ1N0YXRlKSk7XG4gICAgfVxuXG4gICAgdmFyIHNkcCA9IFNEUFV0aWxzLndyaXRlU2Vzc2lvbkJvaWxlcnBsYXRlKHBjLl9zZHBTZXNzaW9uSWQsXG4gICAgICAgIHBjLl9zZHBTZXNzaW9uVmVyc2lvbisrKTtcbiAgICBpZiAocGMudXNpbmdCdW5kbGUpIHtcbiAgICAgIHNkcCArPSAnYT1ncm91cDpCVU5ETEUgJyArIHBjLnRyYW5zY2VpdmVycy5tYXAoZnVuY3Rpb24odCkge1xuICAgICAgICByZXR1cm4gdC5taWQ7XG4gICAgICB9KS5qb2luKCcgJykgKyAnXFxyXFxuJztcbiAgICB9XG4gICAgdmFyIG1lZGlhU2VjdGlvbnNJbk9mZmVyID0gU0RQVXRpbHMuZ2V0TWVkaWFTZWN0aW9ucyhcbiAgICAgICAgcGMucmVtb3RlRGVzY3JpcHRpb24uc2RwKS5sZW5ndGg7XG4gICAgcGMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIsIHNkcE1MaW5lSW5kZXgpIHtcbiAgICAgIGlmIChzZHBNTGluZUluZGV4ICsgMSA+IG1lZGlhU2VjdGlvbnNJbk9mZmVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh0cmFuc2NlaXZlci5yZWplY3RlZCkge1xuICAgICAgICBpZiAodHJhbnNjZWl2ZXIua2luZCA9PT0gJ2FwcGxpY2F0aW9uJykge1xuICAgICAgICAgIHNkcCArPSAnbT1hcHBsaWNhdGlvbiAwIERUTFMvU0NUUCA1MDAwXFxyXFxuJztcbiAgICAgICAgfSBlbHNlIGlmICh0cmFuc2NlaXZlci5raW5kID09PSAnYXVkaW8nKSB7XG4gICAgICAgICAgc2RwICs9ICdtPWF1ZGlvIDAgVURQL1RMUy9SVFAvU0FWUEYgMFxcclxcbicgK1xuICAgICAgICAgICAgICAnYT1ydHBtYXA6MCBQQ01VLzgwMDBcXHJcXG4nO1xuICAgICAgICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLmtpbmQgPT09ICd2aWRlbycpIHtcbiAgICAgICAgICBzZHAgKz0gJ209dmlkZW8gMCBVRFAvVExTL1JUUC9TQVZQRiAxMjBcXHJcXG4nICtcbiAgICAgICAgICAgICAgJ2E9cnRwbWFwOjEyMCBWUDgvOTAwMDBcXHJcXG4nO1xuICAgICAgICB9XG4gICAgICAgIHNkcCArPSAnYz1JTiBJUDQgMC4wLjAuMFxcclxcbicgK1xuICAgICAgICAgICAgJ2E9aW5hY3RpdmVcXHJcXG4nICtcbiAgICAgICAgICAgICdhPW1pZDonICsgdHJhbnNjZWl2ZXIubWlkICsgJ1xcclxcbic7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gRklYTUU6IGxvb2sgYXQgZGlyZWN0aW9uLlxuICAgICAgaWYgKHRyYW5zY2VpdmVyLnN0cmVhbSkge1xuICAgICAgICB2YXIgbG9jYWxUcmFjaztcbiAgICAgICAgaWYgKHRyYW5zY2VpdmVyLmtpbmQgPT09ICdhdWRpbycpIHtcbiAgICAgICAgICBsb2NhbFRyYWNrID0gdHJhbnNjZWl2ZXIuc3RyZWFtLmdldEF1ZGlvVHJhY2tzKClbMF07XG4gICAgICAgIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIua2luZCA9PT0gJ3ZpZGVvJykge1xuICAgICAgICAgIGxvY2FsVHJhY2sgPSB0cmFuc2NlaXZlci5zdHJlYW0uZ2V0VmlkZW9UcmFja3MoKVswXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobG9jYWxUcmFjaykge1xuICAgICAgICAgIC8vIGFkZCBSVFhcbiAgICAgICAgICBpZiAoZWRnZVZlcnNpb24gPj0gMTUwMTkgJiYgdHJhbnNjZWl2ZXIua2luZCA9PT0gJ3ZpZGVvJyAmJlxuICAgICAgICAgICAgICAhdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHgpIHtcbiAgICAgICAgICAgIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4ID0ge1xuICAgICAgICAgICAgICBzc3JjOiB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmMgKyAxXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBDYWxjdWxhdGUgaW50ZXJzZWN0aW9uIG9mIGNhcGFiaWxpdGllcy5cbiAgICAgIHZhciBjb21tb25DYXBhYmlsaXRpZXMgPSBnZXRDb21tb25DYXBhYmlsaXRpZXMoXG4gICAgICAgICAgdHJhbnNjZWl2ZXIubG9jYWxDYXBhYmlsaXRpZXMsXG4gICAgICAgICAgdHJhbnNjZWl2ZXIucmVtb3RlQ2FwYWJpbGl0aWVzKTtcblxuICAgICAgdmFyIGhhc1J0eCA9IGNvbW1vbkNhcGFiaWxpdGllcy5jb2RlY3MuZmlsdGVyKGZ1bmN0aW9uKGMpIHtcbiAgICAgICAgcmV0dXJuIGMubmFtZS50b0xvd2VyQ2FzZSgpID09PSAncnR4JztcbiAgICAgIH0pLmxlbmd0aDtcbiAgICAgIGlmICghaGFzUnR4ICYmIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4KSB7XG4gICAgICAgIGRlbGV0ZSB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eDtcbiAgICAgIH1cblxuICAgICAgc2RwICs9IHdyaXRlTWVkaWFTZWN0aW9uKHRyYW5zY2VpdmVyLCBjb21tb25DYXBhYmlsaXRpZXMsXG4gICAgICAgICAgJ2Fuc3dlcicsIHRyYW5zY2VpdmVyLnN0cmVhbSwgcGMuX2R0bHNSb2xlKTtcbiAgICAgIGlmICh0cmFuc2NlaXZlci5ydGNwUGFyYW1ldGVycyAmJlxuICAgICAgICAgIHRyYW5zY2VpdmVyLnJ0Y3BQYXJhbWV0ZXJzLnJlZHVjZWRTaXplKSB7XG4gICAgICAgIHNkcCArPSAnYT1ydGNwLXJzaXplXFxyXFxuJztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHZhciBkZXNjID0gbmV3IHdpbmRvdy5SVENTZXNzaW9uRGVzY3JpcHRpb24oe1xuICAgICAgdHlwZTogJ2Fuc3dlcicsXG4gICAgICBzZHA6IHNkcFxuICAgIH0pO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZGVzYyk7XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZEljZUNhbmRpZGF0ZSA9IGZ1bmN0aW9uKGNhbmRpZGF0ZSkge1xuICAgIHZhciBwYyA9IHRoaXM7XG4gICAgdmFyIHNlY3Rpb25zO1xuICAgIGlmIChjYW5kaWRhdGUgJiYgIShjYW5kaWRhdGUuc2RwTUxpbmVJbmRleCAhPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgIGNhbmRpZGF0ZS5zZHBNaWQpKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFR5cGVFcnJvcignc2RwTUxpbmVJbmRleCBvciBzZHBNaWQgcmVxdWlyZWQnKSk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogbmVlZHMgdG8gZ28gaW50byBvcHMgcXVldWUuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgaWYgKCFwYy5yZW1vdGVEZXNjcmlwdGlvbikge1xuICAgICAgICByZXR1cm4gcmVqZWN0KG1ha2VFcnJvcignSW52YWxpZFN0YXRlRXJyb3InLFxuICAgICAgICAgICAgJ0NhbiBub3QgYWRkIElDRSBjYW5kaWRhdGUgd2l0aG91dCBhIHJlbW90ZSBkZXNjcmlwdGlvbicpKTtcbiAgICAgIH0gZWxzZSBpZiAoIWNhbmRpZGF0ZSB8fCBjYW5kaWRhdGUuY2FuZGlkYXRlID09PSAnJykge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHBjLnRyYW5zY2VpdmVycy5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGlmIChwYy50cmFuc2NlaXZlcnNbal0ucmVqZWN0ZWQpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBwYy50cmFuc2NlaXZlcnNbal0uaWNlVHJhbnNwb3J0LmFkZFJlbW90ZUNhbmRpZGF0ZSh7fSk7XG4gICAgICAgICAgc2VjdGlvbnMgPSBTRFBVdGlscy5nZXRNZWRpYVNlY3Rpb25zKHBjLnJlbW90ZURlc2NyaXB0aW9uLnNkcCk7XG4gICAgICAgICAgc2VjdGlvbnNbal0gKz0gJ2E9ZW5kLW9mLWNhbmRpZGF0ZXNcXHJcXG4nO1xuICAgICAgICAgIHBjLnJlbW90ZURlc2NyaXB0aW9uLnNkcCA9XG4gICAgICAgICAgICAgIFNEUFV0aWxzLmdldERlc2NyaXB0aW9uKHBjLnJlbW90ZURlc2NyaXB0aW9uLnNkcCkgK1xuICAgICAgICAgICAgICBzZWN0aW9ucy5qb2luKCcnKTtcbiAgICAgICAgICBpZiAocGMudXNpbmdCdW5kbGUpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHNkcE1MaW5lSW5kZXggPSBjYW5kaWRhdGUuc2RwTUxpbmVJbmRleDtcbiAgICAgICAgaWYgKGNhbmRpZGF0ZS5zZHBNaWQpIHtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBjLnRyYW5zY2VpdmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHBjLnRyYW5zY2VpdmVyc1tpXS5taWQgPT09IGNhbmRpZGF0ZS5zZHBNaWQpIHtcbiAgICAgICAgICAgICAgc2RwTUxpbmVJbmRleCA9IGk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgdHJhbnNjZWl2ZXIgPSBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF07XG4gICAgICAgIGlmICh0cmFuc2NlaXZlcikge1xuICAgICAgICAgIGlmICh0cmFuc2NlaXZlci5yZWplY3RlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIGNhbmQgPSBPYmplY3Qua2V5cyhjYW5kaWRhdGUuY2FuZGlkYXRlKS5sZW5ndGggPiAwID9cbiAgICAgICAgICAgICAgU0RQVXRpbHMucGFyc2VDYW5kaWRhdGUoY2FuZGlkYXRlLmNhbmRpZGF0ZSkgOiB7fTtcbiAgICAgICAgICAvLyBJZ25vcmUgQ2hyb21lJ3MgaW52YWxpZCBjYW5kaWRhdGVzIHNpbmNlIEVkZ2UgZG9lcyBub3QgbGlrZSB0aGVtLlxuICAgICAgICAgIGlmIChjYW5kLnByb3RvY29sID09PSAndGNwJyAmJiAoY2FuZC5wb3J0ID09PSAwIHx8IGNhbmQucG9ydCA9PT0gOSkpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIElnbm9yZSBSVENQIGNhbmRpZGF0ZXMsIHdlIGFzc3VtZSBSVENQLU1VWC5cbiAgICAgICAgICBpZiAoY2FuZC5jb21wb25lbnQgJiYgY2FuZC5jb21wb25lbnQgIT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHdoZW4gdXNpbmcgYnVuZGxlLCBhdm9pZCBhZGRpbmcgY2FuZGlkYXRlcyB0byB0aGUgd3JvbmdcbiAgICAgICAgICAvLyBpY2UgdHJhbnNwb3J0LiBBbmQgYXZvaWQgYWRkaW5nIGNhbmRpZGF0ZXMgYWRkZWQgaW4gdGhlIFNEUC5cbiAgICAgICAgICBpZiAoc2RwTUxpbmVJbmRleCA9PT0gMCB8fCAoc2RwTUxpbmVJbmRleCA+IDAgJiZcbiAgICAgICAgICAgICAgdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0ICE9PSBwYy50cmFuc2NlaXZlcnNbMF0uaWNlVHJhbnNwb3J0KSkge1xuICAgICAgICAgICAgaWYgKCFtYXliZUFkZENhbmRpZGF0ZSh0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQsIGNhbmQpKSB7XG4gICAgICAgICAgICAgIHJldHVybiByZWplY3QobWFrZUVycm9yKCdPcGVyYXRpb25FcnJvcicsXG4gICAgICAgICAgICAgICAgICAnQ2FuIG5vdCBhZGQgSUNFIGNhbmRpZGF0ZScpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyB1cGRhdGUgdGhlIHJlbW90ZURlc2NyaXB0aW9uLlxuICAgICAgICAgIHZhciBjYW5kaWRhdGVTdHJpbmcgPSBjYW5kaWRhdGUuY2FuZGlkYXRlLnRyaW0oKTtcbiAgICAgICAgICBpZiAoY2FuZGlkYXRlU3RyaW5nLmluZGV4T2YoJ2E9JykgPT09IDApIHtcbiAgICAgICAgICAgIGNhbmRpZGF0ZVN0cmluZyA9IGNhbmRpZGF0ZVN0cmluZy5zdWJzdHIoMik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNlY3Rpb25zID0gU0RQVXRpbHMuZ2V0TWVkaWFTZWN0aW9ucyhwYy5yZW1vdGVEZXNjcmlwdGlvbi5zZHApO1xuICAgICAgICAgIHNlY3Rpb25zW3NkcE1MaW5lSW5kZXhdICs9ICdhPScgK1xuICAgICAgICAgICAgICAoY2FuZC50eXBlID8gY2FuZGlkYXRlU3RyaW5nIDogJ2VuZC1vZi1jYW5kaWRhdGVzJylcbiAgICAgICAgICAgICAgKyAnXFxyXFxuJztcbiAgICAgICAgICBwYy5yZW1vdGVEZXNjcmlwdGlvbi5zZHAgPVxuICAgICAgICAgICAgICBTRFBVdGlscy5nZXREZXNjcmlwdGlvbihwYy5yZW1vdGVEZXNjcmlwdGlvbi5zZHApICtcbiAgICAgICAgICAgICAgc2VjdGlvbnMuam9pbignJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdChtYWtlRXJyb3IoJ09wZXJhdGlvbkVycm9yJyxcbiAgICAgICAgICAgICAgJ0NhbiBub3QgYWRkIElDRSBjYW5kaWRhdGUnKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U3RhdHMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcHJvbWlzZXMgPSBbXTtcbiAgICB0aGlzLnRyYW5zY2VpdmVycy5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XG4gICAgICBbJ3J0cFNlbmRlcicsICdydHBSZWNlaXZlcicsICdpY2VHYXRoZXJlcicsICdpY2VUcmFuc3BvcnQnLFxuICAgICAgICAgICdkdGxzVHJhbnNwb3J0J10uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgICAgICAgIGlmICh0cmFuc2NlaXZlclttZXRob2RdKSB7XG4gICAgICAgICAgICAgIHByb21pc2VzLnB1c2godHJhbnNjZWl2ZXJbbWV0aG9kXS5nZXRTdGF0cygpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICB9KTtcbiAgICB2YXIgZml4U3RhdHNUeXBlID0gZnVuY3Rpb24oc3RhdCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaW5ib3VuZHJ0cDogJ2luYm91bmQtcnRwJyxcbiAgICAgICAgb3V0Ym91bmRydHA6ICdvdXRib3VuZC1ydHAnLFxuICAgICAgICBjYW5kaWRhdGVwYWlyOiAnY2FuZGlkYXRlLXBhaXInLFxuICAgICAgICBsb2NhbGNhbmRpZGF0ZTogJ2xvY2FsLWNhbmRpZGF0ZScsXG4gICAgICAgIHJlbW90ZWNhbmRpZGF0ZTogJ3JlbW90ZS1jYW5kaWRhdGUnXG4gICAgICB9W3N0YXQudHlwZV0gfHwgc3RhdC50eXBlO1xuICAgIH07XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiAgICAgIC8vIHNoaW0gZ2V0U3RhdHMgd2l0aCBtYXBsaWtlIHN1cHBvcnRcbiAgICAgIHZhciByZXN1bHRzID0gbmV3IE1hcCgpO1xuICAgICAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIHJlcy5mb3JFYWNoKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIE9iamVjdC5rZXlzKHJlc3VsdCkuZm9yRWFjaChmdW5jdGlvbihpZCkge1xuICAgICAgICAgICAgcmVzdWx0W2lkXS50eXBlID0gZml4U3RhdHNUeXBlKHJlc3VsdFtpZF0pO1xuICAgICAgICAgICAgcmVzdWx0cy5zZXQoaWQsIHJlc3VsdFtpZF0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmVzb2x2ZShyZXN1bHRzKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIGxlZ2FjeSBjYWxsYmFjayBzaGltcy4gU2hvdWxkIGJlIG1vdmVkIHRvIGFkYXB0ZXIuanMgc29tZSBkYXlzLlxuICB2YXIgbWV0aG9kcyA9IFsnY3JlYXRlT2ZmZXInLCAnY3JlYXRlQW5zd2VyJ107XG4gIG1ldGhvZHMuZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICB2YXIgbmF0aXZlTWV0aG9kID0gUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF07XG4gICAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgaWYgKHR5cGVvZiBhcmdzWzBdID09PSAnZnVuY3Rpb24nIHx8XG4gICAgICAgICAgdHlwZW9mIGFyZ3NbMV0gPT09ICdmdW5jdGlvbicpIHsgLy8gbGVnYWN5XG4gICAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkodGhpcywgW2FyZ3VtZW50c1syXV0pXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKGRlc2NyaXB0aW9uKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBhcmdzWzBdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBhcmdzWzBdLmFwcGx5KG51bGwsIFtkZXNjcmlwdGlvbl0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGFyZ3NbMV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGFyZ3NbMV0uYXBwbHkobnVsbCwgW2Vycm9yXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9KTtcblxuICBtZXRob2RzID0gWydzZXRMb2NhbERlc2NyaXB0aW9uJywgJ3NldFJlbW90ZURlc2NyaXB0aW9uJywgJ2FkZEljZUNhbmRpZGF0ZSddO1xuICBtZXRob2RzLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgdmFyIG5hdGl2ZU1ldGhvZCA9IFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdO1xuICAgIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIGlmICh0eXBlb2YgYXJnc1sxXSA9PT0gJ2Z1bmN0aW9uJyB8fFxuICAgICAgICAgIHR5cGVvZiBhcmdzWzJdID09PSAnZnVuY3Rpb24nKSB7IC8vIGxlZ2FjeVxuICAgICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBhcmdzWzFdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBhcmdzWzFdLmFwcGx5KG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGFyZ3NbMl0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGFyZ3NbMl0uYXBwbHkobnVsbCwgW2Vycm9yXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9KTtcblxuICAvLyBnZXRTdGF0cyBpcyBzcGVjaWFsLiBJdCBkb2Vzbid0IGhhdmUgYSBzcGVjIGxlZ2FjeSBtZXRob2QgeWV0IHdlIHN1cHBvcnRcbiAgLy8gZ2V0U3RhdHMoc29tZXRoaW5nLCBjYikgd2l0aG91dCBlcnJvciBjYWxsYmFja3MuXG4gIFsnZ2V0U3RhdHMnXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgIHZhciBuYXRpdmVNZXRob2QgPSBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXTtcbiAgICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICBpZiAodHlwZW9mIGFyZ3NbMV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICh0eXBlb2YgYXJnc1sxXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgYXJnc1sxXS5hcHBseShudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH0pO1xuXG4gIHJldHVybiBSVENQZWVyQ29ubmVjdGlvbjtcbn07XG5cbn0se1wic2RwXCI6Mn1dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xuJ3VzZSBzdHJpY3QnO1xuXG4vLyBTRFAgaGVscGVycy5cbnZhciBTRFBVdGlscyA9IHt9O1xuXG4vLyBHZW5lcmF0ZSBhbiBhbHBoYW51bWVyaWMgaWRlbnRpZmllciBmb3IgY25hbWUgb3IgbWlkcy5cbi8vIFRPRE86IHVzZSBVVUlEcyBpbnN0ZWFkPyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9qZWQvOTgyODgzXG5TRFBVdGlscy5nZW5lcmF0ZUlkZW50aWZpZXIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCAxMCk7XG59O1xuXG4vLyBUaGUgUlRDUCBDTkFNRSB1c2VkIGJ5IGFsbCBwZWVyY29ubmVjdGlvbnMgZnJvbSB0aGUgc2FtZSBKUy5cblNEUFV0aWxzLmxvY2FsQ05hbWUgPSBTRFBVdGlscy5nZW5lcmF0ZUlkZW50aWZpZXIoKTtcblxuLy8gU3BsaXRzIFNEUCBpbnRvIGxpbmVzLCBkZWFsaW5nIHdpdGggYm90aCBDUkxGIGFuZCBMRi5cblNEUFV0aWxzLnNwbGl0TGluZXMgPSBmdW5jdGlvbihibG9iKSB7XG4gIHJldHVybiBibG9iLnRyaW0oKS5zcGxpdCgnXFxuJykubWFwKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICByZXR1cm4gbGluZS50cmltKCk7XG4gIH0pO1xufTtcbi8vIFNwbGl0cyBTRFAgaW50byBzZXNzaW9ucGFydCBhbmQgbWVkaWFzZWN0aW9ucy4gRW5zdXJlcyBDUkxGLlxuU0RQVXRpbHMuc3BsaXRTZWN0aW9ucyA9IGZ1bmN0aW9uKGJsb2IpIHtcbiAgdmFyIHBhcnRzID0gYmxvYi5zcGxpdCgnXFxubT0nKTtcbiAgcmV0dXJuIHBhcnRzLm1hcChmdW5jdGlvbihwYXJ0LCBpbmRleCkge1xuICAgIHJldHVybiAoaW5kZXggPiAwID8gJ209JyArIHBhcnQgOiBwYXJ0KS50cmltKCkgKyAnXFxyXFxuJztcbiAgfSk7XG59O1xuXG4vLyByZXR1cm5zIHRoZSBzZXNzaW9uIGRlc2NyaXB0aW9uLlxuU0RQVXRpbHMuZ2V0RGVzY3JpcHRpb24gPSBmdW5jdGlvbihibG9iKSB7XG4gIHZhciBzZWN0aW9ucyA9IFNEUFV0aWxzLnNwbGl0U2VjdGlvbnMoYmxvYik7XG4gIHJldHVybiBzZWN0aW9ucyAmJiBzZWN0aW9uc1swXTtcbn07XG5cbi8vIHJldHVybnMgdGhlIGluZGl2aWR1YWwgbWVkaWEgc2VjdGlvbnMuXG5TRFBVdGlscy5nZXRNZWRpYVNlY3Rpb25zID0gZnVuY3Rpb24oYmxvYikge1xuICB2YXIgc2VjdGlvbnMgPSBTRFBVdGlscy5zcGxpdFNlY3Rpb25zKGJsb2IpO1xuICBzZWN0aW9ucy5zaGlmdCgpO1xuICByZXR1cm4gc2VjdGlvbnM7XG59O1xuXG4vLyBSZXR1cm5zIGxpbmVzIHRoYXQgc3RhcnQgd2l0aCBhIGNlcnRhaW4gcHJlZml4LlxuU0RQVXRpbHMubWF0Y2hQcmVmaXggPSBmdW5jdGlvbihibG9iLCBwcmVmaXgpIHtcbiAgcmV0dXJuIFNEUFV0aWxzLnNwbGl0TGluZXMoYmxvYikuZmlsdGVyKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICByZXR1cm4gbGluZS5pbmRleE9mKHByZWZpeCkgPT09IDA7XG4gIH0pO1xufTtcblxuLy8gUGFyc2VzIGFuIElDRSBjYW5kaWRhdGUgbGluZS4gU2FtcGxlIGlucHV0OlxuLy8gY2FuZGlkYXRlOjcwMjc4NjM1MCAyIHVkcCA0MTgxOTkwMiA4LjguOC44IDYwNzY5IHR5cCByZWxheSByYWRkciA4LjguOC44XG4vLyBycG9ydCA1NTk5NlwiXG5TRFBVdGlscy5wYXJzZUNhbmRpZGF0ZSA9IGZ1bmN0aW9uKGxpbmUpIHtcbiAgdmFyIHBhcnRzO1xuICAvLyBQYXJzZSBib3RoIHZhcmlhbnRzLlxuICBpZiAobGluZS5pbmRleE9mKCdhPWNhbmRpZGF0ZTonKSA9PT0gMCkge1xuICAgIHBhcnRzID0gbGluZS5zdWJzdHJpbmcoMTIpLnNwbGl0KCcgJyk7XG4gIH0gZWxzZSB7XG4gICAgcGFydHMgPSBsaW5lLnN1YnN0cmluZygxMCkuc3BsaXQoJyAnKTtcbiAgfVxuXG4gIHZhciBjYW5kaWRhdGUgPSB7XG4gICAgZm91bmRhdGlvbjogcGFydHNbMF0sXG4gICAgY29tcG9uZW50OiBwYXJzZUludChwYXJ0c1sxXSwgMTApLFxuICAgIHByb3RvY29sOiBwYXJ0c1syXS50b0xvd2VyQ2FzZSgpLFxuICAgIHByaW9yaXR5OiBwYXJzZUludChwYXJ0c1szXSwgMTApLFxuICAgIGlwOiBwYXJ0c1s0XSxcbiAgICBwb3J0OiBwYXJzZUludChwYXJ0c1s1XSwgMTApLFxuICAgIC8vIHNraXAgcGFydHNbNl0gPT0gJ3R5cCdcbiAgICB0eXBlOiBwYXJ0c1s3XVxuICB9O1xuXG4gIGZvciAodmFyIGkgPSA4OyBpIDwgcGFydHMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICBzd2l0Y2ggKHBhcnRzW2ldKSB7XG4gICAgICBjYXNlICdyYWRkcic6XG4gICAgICAgIGNhbmRpZGF0ZS5yZWxhdGVkQWRkcmVzcyA9IHBhcnRzW2kgKyAxXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdycG9ydCc6XG4gICAgICAgIGNhbmRpZGF0ZS5yZWxhdGVkUG9ydCA9IHBhcnNlSW50KHBhcnRzW2kgKyAxXSwgMTApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RjcHR5cGUnOlxuICAgICAgICBjYW5kaWRhdGUudGNwVHlwZSA9IHBhcnRzW2kgKyAxXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd1ZnJhZyc6XG4gICAgICAgIGNhbmRpZGF0ZS51ZnJhZyA9IHBhcnRzW2kgKyAxXTsgLy8gZm9yIGJhY2t3YXJkIGNvbXBhYmlsaXR5LlxuICAgICAgICBjYW5kaWRhdGUudXNlcm5hbWVGcmFnbWVudCA9IHBhcnRzW2kgKyAxXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OiAvLyBleHRlbnNpb24gaGFuZGxpbmcsIGluIHBhcnRpY3VsYXIgdWZyYWdcbiAgICAgICAgY2FuZGlkYXRlW3BhcnRzW2ldXSA9IHBhcnRzW2kgKyAxXTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBjYW5kaWRhdGU7XG59O1xuXG4vLyBUcmFuc2xhdGVzIGEgY2FuZGlkYXRlIG9iamVjdCBpbnRvIFNEUCBjYW5kaWRhdGUgYXR0cmlidXRlLlxuU0RQVXRpbHMud3JpdGVDYW5kaWRhdGUgPSBmdW5jdGlvbihjYW5kaWRhdGUpIHtcbiAgdmFyIHNkcCA9IFtdO1xuICBzZHAucHVzaChjYW5kaWRhdGUuZm91bmRhdGlvbik7XG4gIHNkcC5wdXNoKGNhbmRpZGF0ZS5jb21wb25lbnQpO1xuICBzZHAucHVzaChjYW5kaWRhdGUucHJvdG9jb2wudG9VcHBlckNhc2UoKSk7XG4gIHNkcC5wdXNoKGNhbmRpZGF0ZS5wcmlvcml0eSk7XG4gIHNkcC5wdXNoKGNhbmRpZGF0ZS5pcCk7XG4gIHNkcC5wdXNoKGNhbmRpZGF0ZS5wb3J0KTtcblxuICB2YXIgdHlwZSA9IGNhbmRpZGF0ZS50eXBlO1xuICBzZHAucHVzaCgndHlwJyk7XG4gIHNkcC5wdXNoKHR5cGUpO1xuICBpZiAodHlwZSAhPT0gJ2hvc3QnICYmIGNhbmRpZGF0ZS5yZWxhdGVkQWRkcmVzcyAmJlxuICAgICAgY2FuZGlkYXRlLnJlbGF0ZWRQb3J0KSB7XG4gICAgc2RwLnB1c2goJ3JhZGRyJyk7XG4gICAgc2RwLnB1c2goY2FuZGlkYXRlLnJlbGF0ZWRBZGRyZXNzKTsgLy8gd2FzOiByZWxBZGRyXG4gICAgc2RwLnB1c2goJ3Jwb3J0Jyk7XG4gICAgc2RwLnB1c2goY2FuZGlkYXRlLnJlbGF0ZWRQb3J0KTsgLy8gd2FzOiByZWxQb3J0XG4gIH1cbiAgaWYgKGNhbmRpZGF0ZS50Y3BUeXBlICYmIGNhbmRpZGF0ZS5wcm90b2NvbC50b0xvd2VyQ2FzZSgpID09PSAndGNwJykge1xuICAgIHNkcC5wdXNoKCd0Y3B0eXBlJyk7XG4gICAgc2RwLnB1c2goY2FuZGlkYXRlLnRjcFR5cGUpO1xuICB9XG4gIGlmIChjYW5kaWRhdGUudXNlcm5hbWVGcmFnbWVudCB8fCBjYW5kaWRhdGUudWZyYWcpIHtcbiAgICBzZHAucHVzaCgndWZyYWcnKTtcbiAgICBzZHAucHVzaChjYW5kaWRhdGUudXNlcm5hbWVGcmFnbWVudCB8fCBjYW5kaWRhdGUudWZyYWcpO1xuICB9XG4gIHJldHVybiAnY2FuZGlkYXRlOicgKyBzZHAuam9pbignICcpO1xufTtcblxuLy8gUGFyc2VzIGFuIGljZS1vcHRpb25zIGxpbmUsIHJldHVybnMgYW4gYXJyYXkgb2Ygb3B0aW9uIHRhZ3MuXG4vLyBhPWljZS1vcHRpb25zOmZvbyBiYXJcblNEUFV0aWxzLnBhcnNlSWNlT3B0aW9ucyA9IGZ1bmN0aW9uKGxpbmUpIHtcbiAgcmV0dXJuIGxpbmUuc3Vic3RyKDE0KS5zcGxpdCgnICcpO1xufVxuXG4vLyBQYXJzZXMgYW4gcnRwbWFwIGxpbmUsIHJldHVybnMgUlRDUnRwQ29kZGVjUGFyYW1ldGVycy4gU2FtcGxlIGlucHV0OlxuLy8gYT1ydHBtYXA6MTExIG9wdXMvNDgwMDAvMlxuU0RQVXRpbHMucGFyc2VSdHBNYXAgPSBmdW5jdGlvbihsaW5lKSB7XG4gIHZhciBwYXJ0cyA9IGxpbmUuc3Vic3RyKDkpLnNwbGl0KCcgJyk7XG4gIHZhciBwYXJzZWQgPSB7XG4gICAgcGF5bG9hZFR5cGU6IHBhcnNlSW50KHBhcnRzLnNoaWZ0KCksIDEwKSAvLyB3YXM6IGlkXG4gIH07XG5cbiAgcGFydHMgPSBwYXJ0c1swXS5zcGxpdCgnLycpO1xuXG4gIHBhcnNlZC5uYW1lID0gcGFydHNbMF07XG4gIHBhcnNlZC5jbG9ja1JhdGUgPSBwYXJzZUludChwYXJ0c1sxXSwgMTApOyAvLyB3YXM6IGNsb2NrcmF0ZVxuICAvLyB3YXM6IGNoYW5uZWxzXG4gIHBhcnNlZC5udW1DaGFubmVscyA9IHBhcnRzLmxlbmd0aCA9PT0gMyA/IHBhcnNlSW50KHBhcnRzWzJdLCAxMCkgOiAxO1xuICByZXR1cm4gcGFyc2VkO1xufTtcblxuLy8gR2VuZXJhdGUgYW4gYT1ydHBtYXAgbGluZSBmcm9tIFJUQ1J0cENvZGVjQ2FwYWJpbGl0eSBvclxuLy8gUlRDUnRwQ29kZWNQYXJhbWV0ZXJzLlxuU0RQVXRpbHMud3JpdGVSdHBNYXAgPSBmdW5jdGlvbihjb2RlYykge1xuICB2YXIgcHQgPSBjb2RlYy5wYXlsb2FkVHlwZTtcbiAgaWYgKGNvZGVjLnByZWZlcnJlZFBheWxvYWRUeXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICBwdCA9IGNvZGVjLnByZWZlcnJlZFBheWxvYWRUeXBlO1xuICB9XG4gIHJldHVybiAnYT1ydHBtYXA6JyArIHB0ICsgJyAnICsgY29kZWMubmFtZSArICcvJyArIGNvZGVjLmNsb2NrUmF0ZSArXG4gICAgICAoY29kZWMubnVtQ2hhbm5lbHMgIT09IDEgPyAnLycgKyBjb2RlYy5udW1DaGFubmVscyA6ICcnKSArICdcXHJcXG4nO1xufTtcblxuLy8gUGFyc2VzIGFuIGE9ZXh0bWFwIGxpbmUgKGhlYWRlcmV4dGVuc2lvbiBmcm9tIFJGQyA1Mjg1KS4gU2FtcGxlIGlucHV0OlxuLy8gYT1leHRtYXA6MiB1cm46aWV0ZjpwYXJhbXM6cnRwLWhkcmV4dDp0b2Zmc2V0XG4vLyBhPWV4dG1hcDoyL3NlbmRvbmx5IHVybjppZXRmOnBhcmFtczpydHAtaGRyZXh0OnRvZmZzZXRcblNEUFV0aWxzLnBhcnNlRXh0bWFwID0gZnVuY3Rpb24obGluZSkge1xuICB2YXIgcGFydHMgPSBsaW5lLnN1YnN0cig5KS5zcGxpdCgnICcpO1xuICByZXR1cm4ge1xuICAgIGlkOiBwYXJzZUludChwYXJ0c1swXSwgMTApLFxuICAgIGRpcmVjdGlvbjogcGFydHNbMF0uaW5kZXhPZignLycpID4gMCA/IHBhcnRzWzBdLnNwbGl0KCcvJylbMV0gOiAnc2VuZHJlY3YnLFxuICAgIHVyaTogcGFydHNbMV1cbiAgfTtcbn07XG5cbi8vIEdlbmVyYXRlcyBhPWV4dG1hcCBsaW5lIGZyb20gUlRDUnRwSGVhZGVyRXh0ZW5zaW9uUGFyYW1ldGVycyBvclxuLy8gUlRDUnRwSGVhZGVyRXh0ZW5zaW9uLlxuU0RQVXRpbHMud3JpdGVFeHRtYXAgPSBmdW5jdGlvbihoZWFkZXJFeHRlbnNpb24pIHtcbiAgcmV0dXJuICdhPWV4dG1hcDonICsgKGhlYWRlckV4dGVuc2lvbi5pZCB8fCBoZWFkZXJFeHRlbnNpb24ucHJlZmVycmVkSWQpICtcbiAgICAgIChoZWFkZXJFeHRlbnNpb24uZGlyZWN0aW9uICYmIGhlYWRlckV4dGVuc2lvbi5kaXJlY3Rpb24gIT09ICdzZW5kcmVjdidcbiAgICAgICAgICA/ICcvJyArIGhlYWRlckV4dGVuc2lvbi5kaXJlY3Rpb25cbiAgICAgICAgICA6ICcnKSArXG4gICAgICAnICcgKyBoZWFkZXJFeHRlbnNpb24udXJpICsgJ1xcclxcbic7XG59O1xuXG4vLyBQYXJzZXMgYW4gZnRtcCBsaW5lLCByZXR1cm5zIGRpY3Rpb25hcnkuIFNhbXBsZSBpbnB1dDpcbi8vIGE9Zm10cDo5NiB2YnI9b247Y25nPW9uXG4vLyBBbHNvIGRlYWxzIHdpdGggdmJyPW9uOyBjbmc9b25cblNEUFV0aWxzLnBhcnNlRm10cCA9IGZ1bmN0aW9uKGxpbmUpIHtcbiAgdmFyIHBhcnNlZCA9IHt9O1xuICB2YXIga3Y7XG4gIHZhciBwYXJ0cyA9IGxpbmUuc3Vic3RyKGxpbmUuaW5kZXhPZignICcpICsgMSkuc3BsaXQoJzsnKTtcbiAgZm9yICh2YXIgaiA9IDA7IGogPCBwYXJ0cy5sZW5ndGg7IGorKykge1xuICAgIGt2ID0gcGFydHNbal0udHJpbSgpLnNwbGl0KCc9Jyk7XG4gICAgcGFyc2VkW2t2WzBdLnRyaW0oKV0gPSBrdlsxXTtcbiAgfVxuICByZXR1cm4gcGFyc2VkO1xufTtcblxuLy8gR2VuZXJhdGVzIGFuIGE9ZnRtcCBsaW5lIGZyb20gUlRDUnRwQ29kZWNDYXBhYmlsaXR5IG9yIFJUQ1J0cENvZGVjUGFyYW1ldGVycy5cblNEUFV0aWxzLndyaXRlRm10cCA9IGZ1bmN0aW9uKGNvZGVjKSB7XG4gIHZhciBsaW5lID0gJyc7XG4gIHZhciBwdCA9IGNvZGVjLnBheWxvYWRUeXBlO1xuICBpZiAoY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgIHB0ID0gY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGU7XG4gIH1cbiAgaWYgKGNvZGVjLnBhcmFtZXRlcnMgJiYgT2JqZWN0LmtleXMoY29kZWMucGFyYW1ldGVycykubGVuZ3RoKSB7XG4gICAgdmFyIHBhcmFtcyA9IFtdO1xuICAgIE9iamVjdC5rZXlzKGNvZGVjLnBhcmFtZXRlcnMpLmZvckVhY2goZnVuY3Rpb24ocGFyYW0pIHtcbiAgICAgIHBhcmFtcy5wdXNoKHBhcmFtICsgJz0nICsgY29kZWMucGFyYW1ldGVyc1twYXJhbV0pO1xuICAgIH0pO1xuICAgIGxpbmUgKz0gJ2E9Zm10cDonICsgcHQgKyAnICcgKyBwYXJhbXMuam9pbignOycpICsgJ1xcclxcbic7XG4gIH1cbiAgcmV0dXJuIGxpbmU7XG59O1xuXG4vLyBQYXJzZXMgYW4gcnRjcC1mYiBsaW5lLCByZXR1cm5zIFJUQ1BSdGNwRmVlZGJhY2sgb2JqZWN0LiBTYW1wbGUgaW5wdXQ6XG4vLyBhPXJ0Y3AtZmI6OTggbmFjayBycHNpXG5TRFBVdGlscy5wYXJzZVJ0Y3BGYiA9IGZ1bmN0aW9uKGxpbmUpIHtcbiAgdmFyIHBhcnRzID0gbGluZS5zdWJzdHIobGluZS5pbmRleE9mKCcgJykgKyAxKS5zcGxpdCgnICcpO1xuICByZXR1cm4ge1xuICAgIHR5cGU6IHBhcnRzLnNoaWZ0KCksXG4gICAgcGFyYW1ldGVyOiBwYXJ0cy5qb2luKCcgJylcbiAgfTtcbn07XG4vLyBHZW5lcmF0ZSBhPXJ0Y3AtZmIgbGluZXMgZnJvbSBSVENSdHBDb2RlY0NhcGFiaWxpdHkgb3IgUlRDUnRwQ29kZWNQYXJhbWV0ZXJzLlxuU0RQVXRpbHMud3JpdGVSdGNwRmIgPSBmdW5jdGlvbihjb2RlYykge1xuICB2YXIgbGluZXMgPSAnJztcbiAgdmFyIHB0ID0gY29kZWMucGF5bG9hZFR5cGU7XG4gIGlmIChjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcHQgPSBjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZTtcbiAgfVxuICBpZiAoY29kZWMucnRjcEZlZWRiYWNrICYmIGNvZGVjLnJ0Y3BGZWVkYmFjay5sZW5ndGgpIHtcbiAgICAvLyBGSVhNRTogc3BlY2lhbCBoYW5kbGluZyBmb3IgdHJyLWludD9cbiAgICBjb2RlYy5ydGNwRmVlZGJhY2suZm9yRWFjaChmdW5jdGlvbihmYikge1xuICAgICAgbGluZXMgKz0gJ2E9cnRjcC1mYjonICsgcHQgKyAnICcgKyBmYi50eXBlICtcbiAgICAgIChmYi5wYXJhbWV0ZXIgJiYgZmIucGFyYW1ldGVyLmxlbmd0aCA/ICcgJyArIGZiLnBhcmFtZXRlciA6ICcnKSArXG4gICAgICAgICAgJ1xcclxcbic7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIGxpbmVzO1xufTtcblxuLy8gUGFyc2VzIGFuIFJGQyA1NTc2IHNzcmMgbWVkaWEgYXR0cmlidXRlLiBTYW1wbGUgaW5wdXQ6XG4vLyBhPXNzcmM6MzczNTkyODU1OSBjbmFtZTpzb21ldGhpbmdcblNEUFV0aWxzLnBhcnNlU3NyY01lZGlhID0gZnVuY3Rpb24obGluZSkge1xuICB2YXIgc3AgPSBsaW5lLmluZGV4T2YoJyAnKTtcbiAgdmFyIHBhcnRzID0ge1xuICAgIHNzcmM6IHBhcnNlSW50KGxpbmUuc3Vic3RyKDcsIHNwIC0gNyksIDEwKVxuICB9O1xuICB2YXIgY29sb24gPSBsaW5lLmluZGV4T2YoJzonLCBzcCk7XG4gIGlmIChjb2xvbiA+IC0xKSB7XG4gICAgcGFydHMuYXR0cmlidXRlID0gbGluZS5zdWJzdHIoc3AgKyAxLCBjb2xvbiAtIHNwIC0gMSk7XG4gICAgcGFydHMudmFsdWUgPSBsaW5lLnN1YnN0cihjb2xvbiArIDEpO1xuICB9IGVsc2Uge1xuICAgIHBhcnRzLmF0dHJpYnV0ZSA9IGxpbmUuc3Vic3RyKHNwICsgMSk7XG4gIH1cbiAgcmV0dXJuIHBhcnRzO1xufTtcblxuLy8gRXh0cmFjdHMgdGhlIE1JRCAoUkZDIDU4ODgpIGZyb20gYSBtZWRpYSBzZWN0aW9uLlxuLy8gcmV0dXJucyB0aGUgTUlEIG9yIHVuZGVmaW5lZCBpZiBubyBtaWQgbGluZSB3YXMgZm91bmQuXG5TRFBVdGlscy5nZXRNaWQgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcbiAgdmFyIG1pZCA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9bWlkOicpWzBdO1xuICBpZiAobWlkKSB7XG4gICAgcmV0dXJuIG1pZC5zdWJzdHIoNik7XG4gIH1cbn1cblxuU0RQVXRpbHMucGFyc2VGaW5nZXJwcmludCA9IGZ1bmN0aW9uKGxpbmUpIHtcbiAgdmFyIHBhcnRzID0gbGluZS5zdWJzdHIoMTQpLnNwbGl0KCcgJyk7XG4gIHJldHVybiB7XG4gICAgYWxnb3JpdGhtOiBwYXJ0c1swXS50b0xvd2VyQ2FzZSgpLCAvLyBhbGdvcml0aG0gaXMgY2FzZS1zZW5zaXRpdmUgaW4gRWRnZS5cbiAgICB2YWx1ZTogcGFydHNbMV1cbiAgfTtcbn07XG5cbi8vIEV4dHJhY3RzIERUTFMgcGFyYW1ldGVycyBmcm9tIFNEUCBtZWRpYSBzZWN0aW9uIG9yIHNlc3Npb25wYXJ0LlxuLy8gRklYTUU6IGZvciBjb25zaXN0ZW5jeSB3aXRoIG90aGVyIGZ1bmN0aW9ucyB0aGlzIHNob3VsZCBvbmx5XG4vLyAgIGdldCB0aGUgZmluZ2VycHJpbnQgbGluZSBhcyBpbnB1dC4gU2VlIGFsc28gZ2V0SWNlUGFyYW1ldGVycy5cblNEUFV0aWxzLmdldER0bHNQYXJhbWV0ZXJzID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uLCBzZXNzaW9ucGFydCkge1xuICB2YXIgbGluZXMgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24gKyBzZXNzaW9ucGFydCxcbiAgICAgICdhPWZpbmdlcnByaW50OicpO1xuICAvLyBOb3RlOiBhPXNldHVwIGxpbmUgaXMgaWdub3JlZCBzaW5jZSB3ZSB1c2UgdGhlICdhdXRvJyByb2xlLlxuICAvLyBOb3RlMjogJ2FsZ29yaXRobScgaXMgbm90IGNhc2Ugc2Vuc2l0aXZlIGV4Y2VwdCBpbiBFZGdlLlxuICByZXR1cm4ge1xuICAgIHJvbGU6ICdhdXRvJyxcbiAgICBmaW5nZXJwcmludHM6IGxpbmVzLm1hcChTRFBVdGlscy5wYXJzZUZpbmdlcnByaW50KVxuICB9O1xufTtcblxuLy8gU2VyaWFsaXplcyBEVExTIHBhcmFtZXRlcnMgdG8gU0RQLlxuU0RQVXRpbHMud3JpdGVEdGxzUGFyYW1ldGVycyA9IGZ1bmN0aW9uKHBhcmFtcywgc2V0dXBUeXBlKSB7XG4gIHZhciBzZHAgPSAnYT1zZXR1cDonICsgc2V0dXBUeXBlICsgJ1xcclxcbic7XG4gIHBhcmFtcy5maW5nZXJwcmludHMuZm9yRWFjaChmdW5jdGlvbihmcCkge1xuICAgIHNkcCArPSAnYT1maW5nZXJwcmludDonICsgZnAuYWxnb3JpdGhtICsgJyAnICsgZnAudmFsdWUgKyAnXFxyXFxuJztcbiAgfSk7XG4gIHJldHVybiBzZHA7XG59O1xuLy8gUGFyc2VzIElDRSBpbmZvcm1hdGlvbiBmcm9tIFNEUCBtZWRpYSBzZWN0aW9uIG9yIHNlc3Npb25wYXJ0LlxuLy8gRklYTUU6IGZvciBjb25zaXN0ZW5jeSB3aXRoIG90aGVyIGZ1bmN0aW9ucyB0aGlzIHNob3VsZCBvbmx5XG4vLyAgIGdldCB0aGUgaWNlLXVmcmFnIGFuZCBpY2UtcHdkIGxpbmVzIGFzIGlucHV0LlxuU0RQVXRpbHMuZ2V0SWNlUGFyYW1ldGVycyA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbiwgc2Vzc2lvbnBhcnQpIHtcbiAgdmFyIGxpbmVzID0gU0RQVXRpbHMuc3BsaXRMaW5lcyhtZWRpYVNlY3Rpb24pO1xuICAvLyBTZWFyY2ggaW4gc2Vzc2lvbiBwYXJ0LCB0b28uXG4gIGxpbmVzID0gbGluZXMuY29uY2F0KFNEUFV0aWxzLnNwbGl0TGluZXMoc2Vzc2lvbnBhcnQpKTtcbiAgdmFyIGljZVBhcmFtZXRlcnMgPSB7XG4gICAgdXNlcm5hbWVGcmFnbWVudDogbGluZXMuZmlsdGVyKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgIHJldHVybiBsaW5lLmluZGV4T2YoJ2E9aWNlLXVmcmFnOicpID09PSAwO1xuICAgIH0pWzBdLnN1YnN0cigxMiksXG4gICAgcGFzc3dvcmQ6IGxpbmVzLmZpbHRlcihmdW5jdGlvbihsaW5lKSB7XG4gICAgICByZXR1cm4gbGluZS5pbmRleE9mKCdhPWljZS1wd2Q6JykgPT09IDA7XG4gICAgfSlbMF0uc3Vic3RyKDEwKVxuICB9O1xuICByZXR1cm4gaWNlUGFyYW1ldGVycztcbn07XG5cbi8vIFNlcmlhbGl6ZXMgSUNFIHBhcmFtZXRlcnMgdG8gU0RQLlxuU0RQVXRpbHMud3JpdGVJY2VQYXJhbWV0ZXJzID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gIHJldHVybiAnYT1pY2UtdWZyYWc6JyArIHBhcmFtcy51c2VybmFtZUZyYWdtZW50ICsgJ1xcclxcbicgK1xuICAgICAgJ2E9aWNlLXB3ZDonICsgcGFyYW1zLnBhc3N3b3JkICsgJ1xcclxcbic7XG59O1xuXG4vLyBQYXJzZXMgdGhlIFNEUCBtZWRpYSBzZWN0aW9uIGFuZCByZXR1cm5zIFJUQ1J0cFBhcmFtZXRlcnMuXG5TRFBVdGlscy5wYXJzZVJ0cFBhcmFtZXRlcnMgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcbiAgdmFyIGRlc2NyaXB0aW9uID0ge1xuICAgIGNvZGVjczogW10sXG4gICAgaGVhZGVyRXh0ZW5zaW9uczogW10sXG4gICAgZmVjTWVjaGFuaXNtczogW10sXG4gICAgcnRjcDogW11cbiAgfTtcbiAgdmFyIGxpbmVzID0gU0RQVXRpbHMuc3BsaXRMaW5lcyhtZWRpYVNlY3Rpb24pO1xuICB2YXIgbWxpbmUgPSBsaW5lc1swXS5zcGxpdCgnICcpO1xuICBmb3IgKHZhciBpID0gMzsgaSA8IG1saW5lLmxlbmd0aDsgaSsrKSB7IC8vIGZpbmQgYWxsIGNvZGVjcyBmcm9tIG1saW5lWzMuLl1cbiAgICB2YXIgcHQgPSBtbGluZVtpXTtcbiAgICB2YXIgcnRwbWFwbGluZSA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KFxuICAgICAgICBtZWRpYVNlY3Rpb24sICdhPXJ0cG1hcDonICsgcHQgKyAnICcpWzBdO1xuICAgIGlmIChydHBtYXBsaW5lKSB7XG4gICAgICB2YXIgY29kZWMgPSBTRFBVdGlscy5wYXJzZVJ0cE1hcChydHBtYXBsaW5lKTtcbiAgICAgIHZhciBmbXRwcyA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KFxuICAgICAgICAgIG1lZGlhU2VjdGlvbiwgJ2E9Zm10cDonICsgcHQgKyAnICcpO1xuICAgICAgLy8gT25seSB0aGUgZmlyc3QgYT1mbXRwOjxwdD4gaXMgY29uc2lkZXJlZC5cbiAgICAgIGNvZGVjLnBhcmFtZXRlcnMgPSBmbXRwcy5sZW5ndGggPyBTRFBVdGlscy5wYXJzZUZtdHAoZm10cHNbMF0pIDoge307XG4gICAgICBjb2RlYy5ydGNwRmVlZGJhY2sgPSBTRFBVdGlscy5tYXRjaFByZWZpeChcbiAgICAgICAgICBtZWRpYVNlY3Rpb24sICdhPXJ0Y3AtZmI6JyArIHB0ICsgJyAnKVxuICAgICAgICAubWFwKFNEUFV0aWxzLnBhcnNlUnRjcEZiKTtcbiAgICAgIGRlc2NyaXB0aW9uLmNvZGVjcy5wdXNoKGNvZGVjKTtcbiAgICAgIC8vIHBhcnNlIEZFQyBtZWNoYW5pc21zIGZyb20gcnRwbWFwIGxpbmVzLlxuICAgICAgc3dpdGNoIChjb2RlYy5uYW1lLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgICAgY2FzZSAnUkVEJzpcbiAgICAgICAgY2FzZSAnVUxQRkVDJzpcbiAgICAgICAgICBkZXNjcmlwdGlvbi5mZWNNZWNoYW5pc21zLnB1c2goY29kZWMubmFtZS50b1VwcGVyQ2FzZSgpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDogLy8gb25seSBSRUQgYW5kIFVMUEZFQyBhcmUgcmVjb2duaXplZCBhcyBGRUMgbWVjaGFuaXNtcy5cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1leHRtYXA6JykuZm9yRWFjaChmdW5jdGlvbihsaW5lKSB7XG4gICAgZGVzY3JpcHRpb24uaGVhZGVyRXh0ZW5zaW9ucy5wdXNoKFNEUFV0aWxzLnBhcnNlRXh0bWFwKGxpbmUpKTtcbiAgfSk7XG4gIC8vIEZJWE1FOiBwYXJzZSBydGNwLlxuICByZXR1cm4gZGVzY3JpcHRpb247XG59O1xuXG4vLyBHZW5lcmF0ZXMgcGFydHMgb2YgdGhlIFNEUCBtZWRpYSBzZWN0aW9uIGRlc2NyaWJpbmcgdGhlIGNhcGFiaWxpdGllcyAvXG4vLyBwYXJhbWV0ZXJzLlxuU0RQVXRpbHMud3JpdGVSdHBEZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKGtpbmQsIGNhcHMpIHtcbiAgdmFyIHNkcCA9ICcnO1xuXG4gIC8vIEJ1aWxkIHRoZSBtbGluZS5cbiAgc2RwICs9ICdtPScgKyBraW5kICsgJyAnO1xuICBzZHAgKz0gY2Fwcy5jb2RlY3MubGVuZ3RoID4gMCA/ICc5JyA6ICcwJzsgLy8gcmVqZWN0IGlmIG5vIGNvZGVjcy5cbiAgc2RwICs9ICcgVURQL1RMUy9SVFAvU0FWUEYgJztcbiAgc2RwICs9IGNhcHMuY29kZWNzLm1hcChmdW5jdGlvbihjb2RlYykge1xuICAgIGlmIChjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGU7XG4gICAgfVxuICAgIHJldHVybiBjb2RlYy5wYXlsb2FkVHlwZTtcbiAgfSkuam9pbignICcpICsgJ1xcclxcbic7XG5cbiAgc2RwICs9ICdjPUlOIElQNCAwLjAuMC4wXFxyXFxuJztcbiAgc2RwICs9ICdhPXJ0Y3A6OSBJTiBJUDQgMC4wLjAuMFxcclxcbic7XG5cbiAgLy8gQWRkIGE9cnRwbWFwIGxpbmVzIGZvciBlYWNoIGNvZGVjLiBBbHNvIGZtdHAgYW5kIHJ0Y3AtZmIuXG4gIGNhcHMuY29kZWNzLmZvckVhY2goZnVuY3Rpb24oY29kZWMpIHtcbiAgICBzZHAgKz0gU0RQVXRpbHMud3JpdGVSdHBNYXAoY29kZWMpO1xuICAgIHNkcCArPSBTRFBVdGlscy53cml0ZUZtdHAoY29kZWMpO1xuICAgIHNkcCArPSBTRFBVdGlscy53cml0ZVJ0Y3BGYihjb2RlYyk7XG4gIH0pO1xuICB2YXIgbWF4cHRpbWUgPSAwO1xuICBjYXBzLmNvZGVjcy5mb3JFYWNoKGZ1bmN0aW9uKGNvZGVjKSB7XG4gICAgaWYgKGNvZGVjLm1heHB0aW1lID4gbWF4cHRpbWUpIHtcbiAgICAgIG1heHB0aW1lID0gY29kZWMubWF4cHRpbWU7XG4gICAgfVxuICB9KTtcbiAgaWYgKG1heHB0aW1lID4gMCkge1xuICAgIHNkcCArPSAnYT1tYXhwdGltZTonICsgbWF4cHRpbWUgKyAnXFxyXFxuJztcbiAgfVxuICBzZHAgKz0gJ2E9cnRjcC1tdXhcXHJcXG4nO1xuXG4gIGNhcHMuaGVhZGVyRXh0ZW5zaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGV4dGVuc2lvbikge1xuICAgIHNkcCArPSBTRFBVdGlscy53cml0ZUV4dG1hcChleHRlbnNpb24pO1xuICB9KTtcbiAgLy8gRklYTUU6IHdyaXRlIGZlY01lY2hhbmlzbXMuXG4gIHJldHVybiBzZHA7XG59O1xuXG4vLyBQYXJzZXMgdGhlIFNEUCBtZWRpYSBzZWN0aW9uIGFuZCByZXR1cm5zIGFuIGFycmF5IG9mXG4vLyBSVENSdHBFbmNvZGluZ1BhcmFtZXRlcnMuXG5TRFBVdGlscy5wYXJzZVJ0cEVuY29kaW5nUGFyYW1ldGVycyA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbikge1xuICB2YXIgZW5jb2RpbmdQYXJhbWV0ZXJzID0gW107XG4gIHZhciBkZXNjcmlwdGlvbiA9IFNEUFV0aWxzLnBhcnNlUnRwUGFyYW1ldGVycyhtZWRpYVNlY3Rpb24pO1xuICB2YXIgaGFzUmVkID0gZGVzY3JpcHRpb24uZmVjTWVjaGFuaXNtcy5pbmRleE9mKCdSRUQnKSAhPT0gLTE7XG4gIHZhciBoYXNVbHBmZWMgPSBkZXNjcmlwdGlvbi5mZWNNZWNoYW5pc21zLmluZGV4T2YoJ1VMUEZFQycpICE9PSAtMTtcblxuICAvLyBmaWx0ZXIgYT1zc3JjOi4uLiBjbmFtZTosIGlnbm9yZSBQbGFuQi1tc2lkXG4gIHZhciBzc3JjcyA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9c3NyYzonKVxuICAubWFwKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICByZXR1cm4gU0RQVXRpbHMucGFyc2VTc3JjTWVkaWEobGluZSk7XG4gIH0pXG4gIC5maWx0ZXIoZnVuY3Rpb24ocGFydHMpIHtcbiAgICByZXR1cm4gcGFydHMuYXR0cmlidXRlID09PSAnY25hbWUnO1xuICB9KTtcbiAgdmFyIHByaW1hcnlTc3JjID0gc3NyY3MubGVuZ3RoID4gMCAmJiBzc3Jjc1swXS5zc3JjO1xuICB2YXIgc2Vjb25kYXJ5U3NyYztcblxuICB2YXIgZmxvd3MgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPXNzcmMtZ3JvdXA6RklEJylcbiAgLm1hcChmdW5jdGlvbihsaW5lKSB7XG4gICAgdmFyIHBhcnRzID0gbGluZS5zcGxpdCgnICcpO1xuICAgIHBhcnRzLnNoaWZ0KCk7XG4gICAgcmV0dXJuIHBhcnRzLm1hcChmdW5jdGlvbihwYXJ0KSB7XG4gICAgICByZXR1cm4gcGFyc2VJbnQocGFydCwgMTApO1xuICAgIH0pO1xuICB9KTtcbiAgaWYgKGZsb3dzLmxlbmd0aCA+IDAgJiYgZmxvd3NbMF0ubGVuZ3RoID4gMSAmJiBmbG93c1swXVswXSA9PT0gcHJpbWFyeVNzcmMpIHtcbiAgICBzZWNvbmRhcnlTc3JjID0gZmxvd3NbMF1bMV07XG4gIH1cblxuICBkZXNjcmlwdGlvbi5jb2RlY3MuZm9yRWFjaChmdW5jdGlvbihjb2RlYykge1xuICAgIGlmIChjb2RlYy5uYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdSVFgnICYmIGNvZGVjLnBhcmFtZXRlcnMuYXB0KSB7XG4gICAgICB2YXIgZW5jUGFyYW0gPSB7XG4gICAgICAgIHNzcmM6IHByaW1hcnlTc3JjLFxuICAgICAgICBjb2RlY1BheWxvYWRUeXBlOiBwYXJzZUludChjb2RlYy5wYXJhbWV0ZXJzLmFwdCwgMTApLFxuICAgICAgICBydHg6IHtcbiAgICAgICAgICBzc3JjOiBzZWNvbmRhcnlTc3JjXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBlbmNvZGluZ1BhcmFtZXRlcnMucHVzaChlbmNQYXJhbSk7XG4gICAgICBpZiAoaGFzUmVkKSB7XG4gICAgICAgIGVuY1BhcmFtID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShlbmNQYXJhbSkpO1xuICAgICAgICBlbmNQYXJhbS5mZWMgPSB7XG4gICAgICAgICAgc3NyYzogc2Vjb25kYXJ5U3NyYyxcbiAgICAgICAgICBtZWNoYW5pc206IGhhc1VscGZlYyA/ICdyZWQrdWxwZmVjJyA6ICdyZWQnXG4gICAgICAgIH07XG4gICAgICAgIGVuY29kaW5nUGFyYW1ldGVycy5wdXNoKGVuY1BhcmFtKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICBpZiAoZW5jb2RpbmdQYXJhbWV0ZXJzLmxlbmd0aCA9PT0gMCAmJiBwcmltYXJ5U3NyYykge1xuICAgIGVuY29kaW5nUGFyYW1ldGVycy5wdXNoKHtcbiAgICAgIHNzcmM6IHByaW1hcnlTc3JjXG4gICAgfSk7XG4gIH1cblxuICAvLyB3ZSBzdXBwb3J0IGJvdGggYj1BUyBhbmQgYj1USUFTIGJ1dCBpbnRlcnByZXQgQVMgYXMgVElBUy5cbiAgdmFyIGJhbmR3aWR0aCA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2I9Jyk7XG4gIGlmIChiYW5kd2lkdGgubGVuZ3RoKSB7XG4gICAgaWYgKGJhbmR3aWR0aFswXS5pbmRleE9mKCdiPVRJQVM6JykgPT09IDApIHtcbiAgICAgIGJhbmR3aWR0aCA9IHBhcnNlSW50KGJhbmR3aWR0aFswXS5zdWJzdHIoNyksIDEwKTtcbiAgICB9IGVsc2UgaWYgKGJhbmR3aWR0aFswXS5pbmRleE9mKCdiPUFTOicpID09PSAwKSB7XG4gICAgICAvLyB1c2UgZm9ybXVsYSBmcm9tIEpTRVAgdG8gY29udmVydCBiPUFTIHRvIFRJQVMgdmFsdWUuXG4gICAgICBiYW5kd2lkdGggPSBwYXJzZUludChiYW5kd2lkdGhbMF0uc3Vic3RyKDUpLCAxMCkgKiAxMDAwICogMC45NVxuICAgICAgICAgIC0gKDUwICogNDAgKiA4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgYmFuZHdpZHRoID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBlbmNvZGluZ1BhcmFtZXRlcnMuZm9yRWFjaChmdW5jdGlvbihwYXJhbXMpIHtcbiAgICAgIHBhcmFtcy5tYXhCaXRyYXRlID0gYmFuZHdpZHRoO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBlbmNvZGluZ1BhcmFtZXRlcnM7XG59O1xuXG4vLyBwYXJzZXMgaHR0cDovL2RyYWZ0Lm9ydGMub3JnLyNydGNydGNwcGFyYW1ldGVycypcblNEUFV0aWxzLnBhcnNlUnRjcFBhcmFtZXRlcnMgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcbiAgdmFyIHJ0Y3BQYXJhbWV0ZXJzID0ge307XG5cbiAgdmFyIGNuYW1lO1xuICAvLyBHZXRzIHRoZSBmaXJzdCBTU1JDLiBOb3RlIHRoYXQgd2l0aCBSVFggdGhlcmUgbWlnaHQgYmUgbXVsdGlwbGVcbiAgLy8gU1NSQ3MuXG4gIHZhciByZW1vdGVTc3JjID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1zc3JjOicpXG4gICAgICAubWFwKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgcmV0dXJuIFNEUFV0aWxzLnBhcnNlU3NyY01lZGlhKGxpbmUpO1xuICAgICAgfSlcbiAgICAgIC5maWx0ZXIoZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIHJldHVybiBvYmouYXR0cmlidXRlID09PSAnY25hbWUnO1xuICAgICAgfSlbMF07XG4gIGlmIChyZW1vdGVTc3JjKSB7XG4gICAgcnRjcFBhcmFtZXRlcnMuY25hbWUgPSByZW1vdGVTc3JjLnZhbHVlO1xuICAgIHJ0Y3BQYXJhbWV0ZXJzLnNzcmMgPSByZW1vdGVTc3JjLnNzcmM7XG4gIH1cblxuICAvLyBFZGdlIHVzZXMgdGhlIGNvbXBvdW5kIGF0dHJpYnV0ZSBpbnN0ZWFkIG9mIHJlZHVjZWRTaXplXG4gIC8vIGNvbXBvdW5kIGlzICFyZWR1Y2VkU2l6ZVxuICB2YXIgcnNpemUgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPXJ0Y3AtcnNpemUnKTtcbiAgcnRjcFBhcmFtZXRlcnMucmVkdWNlZFNpemUgPSByc2l6ZS5sZW5ndGggPiAwO1xuICBydGNwUGFyYW1ldGVycy5jb21wb3VuZCA9IHJzaXplLmxlbmd0aCA9PT0gMDtcblxuICAvLyBwYXJzZXMgdGhlIHJ0Y3AtbXV4IGF0dHLRlmJ1dGUuXG4gIC8vIE5vdGUgdGhhdCBFZGdlIGRvZXMgbm90IHN1cHBvcnQgdW5tdXhlZCBSVENQLlxuICB2YXIgbXV4ID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1ydGNwLW11eCcpO1xuICBydGNwUGFyYW1ldGVycy5tdXggPSBtdXgubGVuZ3RoID4gMDtcblxuICByZXR1cm4gcnRjcFBhcmFtZXRlcnM7XG59O1xuXG4vLyBwYXJzZXMgZWl0aGVyIGE9bXNpZDogb3IgYT1zc3JjOi4uLiBtc2lkIGxpbmVzIGFuZCByZXR1cm5zXG4vLyB0aGUgaWQgb2YgdGhlIE1lZGlhU3RyZWFtIGFuZCBNZWRpYVN0cmVhbVRyYWNrLlxuU0RQVXRpbHMucGFyc2VNc2lkID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XG4gIHZhciBwYXJ0cztcbiAgdmFyIHNwZWMgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPW1zaWQ6Jyk7XG4gIGlmIChzcGVjLmxlbmd0aCA9PT0gMSkge1xuICAgIHBhcnRzID0gc3BlY1swXS5zdWJzdHIoNykuc3BsaXQoJyAnKTtcbiAgICByZXR1cm4ge3N0cmVhbTogcGFydHNbMF0sIHRyYWNrOiBwYXJ0c1sxXX07XG4gIH1cbiAgdmFyIHBsYW5CID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1zc3JjOicpXG4gIC5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgIHJldHVybiBTRFBVdGlscy5wYXJzZVNzcmNNZWRpYShsaW5lKTtcbiAgfSlcbiAgLmZpbHRlcihmdW5jdGlvbihwYXJ0cykge1xuICAgIHJldHVybiBwYXJ0cy5hdHRyaWJ1dGUgPT09ICdtc2lkJztcbiAgfSk7XG4gIGlmIChwbGFuQi5sZW5ndGggPiAwKSB7XG4gICAgcGFydHMgPSBwbGFuQlswXS52YWx1ZS5zcGxpdCgnICcpO1xuICAgIHJldHVybiB7c3RyZWFtOiBwYXJ0c1swXSwgdHJhY2s6IHBhcnRzWzFdfTtcbiAgfVxufTtcblxuLy8gR2VuZXJhdGUgYSBzZXNzaW9uIElEIGZvciBTRFAuXG4vLyBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvZHJhZnQtaWV0Zi1ydGN3ZWItanNlcC0yMCNzZWN0aW9uLTUuMi4xXG4vLyByZWNvbW1lbmRzIHVzaW5nIGEgY3J5cHRvZ3JhcGhpY2FsbHkgcmFuZG9tICt2ZSA2NC1iaXQgdmFsdWVcbi8vIGJ1dCByaWdodCBub3cgdGhpcyBzaG91bGQgYmUgYWNjZXB0YWJsZSBhbmQgd2l0aGluIHRoZSByaWdodCByYW5nZVxuU0RQVXRpbHMuZ2VuZXJhdGVTZXNzaW9uSWQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKS5zdWJzdHIoMiwgMjEpO1xufTtcblxuLy8gV3JpdGUgYm9pbGRlciBwbGF0ZSBmb3Igc3RhcnQgb2YgU0RQXG4vLyBzZXNzSWQgYXJndW1lbnQgaXMgb3B0aW9uYWwgLSBpZiBub3Qgc3VwcGxpZWQgaXQgd2lsbFxuLy8gYmUgZ2VuZXJhdGVkIHJhbmRvbWx5XG4vLyBzZXNzVmVyc2lvbiBpcyBvcHRpb25hbCBhbmQgZGVmYXVsdHMgdG8gMlxuU0RQVXRpbHMud3JpdGVTZXNzaW9uQm9pbGVycGxhdGUgPSBmdW5jdGlvbihzZXNzSWQsIHNlc3NWZXIpIHtcbiAgdmFyIHNlc3Npb25JZDtcbiAgdmFyIHZlcnNpb24gPSBzZXNzVmVyICE9PSB1bmRlZmluZWQgPyBzZXNzVmVyIDogMjtcbiAgaWYgKHNlc3NJZCkge1xuICAgIHNlc3Npb25JZCA9IHNlc3NJZDtcbiAgfSBlbHNlIHtcbiAgICBzZXNzaW9uSWQgPSBTRFBVdGlscy5nZW5lcmF0ZVNlc3Npb25JZCgpO1xuICB9XG4gIC8vIEZJWE1FOiBzZXNzLWlkIHNob3VsZCBiZSBhbiBOVFAgdGltZXN0YW1wLlxuICByZXR1cm4gJ3Y9MFxcclxcbicgK1xuICAgICAgJ289dGhpc2lzYWRhcHRlcm9ydGMgJyArIHNlc3Npb25JZCArICcgJyArIHZlcnNpb24gKyAnIElOIElQNCAxMjcuMC4wLjFcXHJcXG4nICtcbiAgICAgICdzPS1cXHJcXG4nICtcbiAgICAgICd0PTAgMFxcclxcbic7XG59O1xuXG5TRFBVdGlscy53cml0ZU1lZGlhU2VjdGlvbiA9IGZ1bmN0aW9uKHRyYW5zY2VpdmVyLCBjYXBzLCB0eXBlLCBzdHJlYW0pIHtcbiAgdmFyIHNkcCA9IFNEUFV0aWxzLndyaXRlUnRwRGVzY3JpcHRpb24odHJhbnNjZWl2ZXIua2luZCwgY2Fwcyk7XG5cbiAgLy8gTWFwIElDRSBwYXJhbWV0ZXJzICh1ZnJhZywgcHdkKSB0byBTRFAuXG4gIHNkcCArPSBTRFBVdGlscy53cml0ZUljZVBhcmFtZXRlcnMoXG4gICAgICB0cmFuc2NlaXZlci5pY2VHYXRoZXJlci5nZXRMb2NhbFBhcmFtZXRlcnMoKSk7XG5cbiAgLy8gTWFwIERUTFMgcGFyYW1ldGVycyB0byBTRFAuXG4gIHNkcCArPSBTRFBVdGlscy53cml0ZUR0bHNQYXJhbWV0ZXJzKFxuICAgICAgdHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydC5nZXRMb2NhbFBhcmFtZXRlcnMoKSxcbiAgICAgIHR5cGUgPT09ICdvZmZlcicgPyAnYWN0cGFzcycgOiAnYWN0aXZlJyk7XG5cbiAgc2RwICs9ICdhPW1pZDonICsgdHJhbnNjZWl2ZXIubWlkICsgJ1xcclxcbic7XG5cbiAgaWYgKHRyYW5zY2VpdmVyLmRpcmVjdGlvbikge1xuICAgIHNkcCArPSAnYT0nICsgdHJhbnNjZWl2ZXIuZGlyZWN0aW9uICsgJ1xcclxcbic7XG4gIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIucnRwU2VuZGVyICYmIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyKSB7XG4gICAgc2RwICs9ICdhPXNlbmRyZWN2XFxyXFxuJztcbiAgfSBlbHNlIGlmICh0cmFuc2NlaXZlci5ydHBTZW5kZXIpIHtcbiAgICBzZHAgKz0gJ2E9c2VuZG9ubHlcXHJcXG4nO1xuICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyKSB7XG4gICAgc2RwICs9ICdhPXJlY3Zvbmx5XFxyXFxuJztcbiAgfSBlbHNlIHtcbiAgICBzZHAgKz0gJ2E9aW5hY3RpdmVcXHJcXG4nO1xuICB9XG5cbiAgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlcikge1xuICAgIC8vIHNwZWMuXG4gICAgdmFyIG1zaWQgPSAnbXNpZDonICsgc3RyZWFtLmlkICsgJyAnICtcbiAgICAgICAgdHJhbnNjZWl2ZXIucnRwU2VuZGVyLnRyYWNrLmlkICsgJ1xcclxcbic7XG4gICAgc2RwICs9ICdhPScgKyBtc2lkO1xuXG4gICAgLy8gZm9yIENocm9tZS5cbiAgICBzZHAgKz0gJ2E9c3NyYzonICsgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjICtcbiAgICAgICAgJyAnICsgbXNpZDtcbiAgICBpZiAodHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHgpIHtcbiAgICAgIHNkcCArPSAnYT1zc3JjOicgKyB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eC5zc3JjICtcbiAgICAgICAgICAnICcgKyBtc2lkO1xuICAgICAgc2RwICs9ICdhPXNzcmMtZ3JvdXA6RklEICcgK1xuICAgICAgICAgIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYyArICcgJyArXG4gICAgICAgICAgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHguc3NyYyArXG4gICAgICAgICAgJ1xcclxcbic7XG4gICAgfVxuICB9XG4gIC8vIEZJWE1FOiB0aGlzIHNob3VsZCBiZSB3cml0dGVuIGJ5IHdyaXRlUnRwRGVzY3JpcHRpb24uXG4gIHNkcCArPSAnYT1zc3JjOicgKyB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmMgK1xuICAgICAgJyBjbmFtZTonICsgU0RQVXRpbHMubG9jYWxDTmFtZSArICdcXHJcXG4nO1xuICBpZiAodHJhbnNjZWl2ZXIucnRwU2VuZGVyICYmIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4KSB7XG4gICAgc2RwICs9ICdhPXNzcmM6JyArIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4LnNzcmMgK1xuICAgICAgICAnIGNuYW1lOicgKyBTRFBVdGlscy5sb2NhbENOYW1lICsgJ1xcclxcbic7XG4gIH1cbiAgcmV0dXJuIHNkcDtcbn07XG5cbi8vIEdldHMgdGhlIGRpcmVjdGlvbiBmcm9tIHRoZSBtZWRpYVNlY3Rpb24gb3IgdGhlIHNlc3Npb25wYXJ0LlxuU0RQVXRpbHMuZ2V0RGlyZWN0aW9uID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uLCBzZXNzaW9ucGFydCkge1xuICAvLyBMb29rIGZvciBzZW5kcmVjdiwgc2VuZG9ubHksIHJlY3Zvbmx5LCBpbmFjdGl2ZSwgZGVmYXVsdCB0byBzZW5kcmVjdi5cbiAgdmFyIGxpbmVzID0gU0RQVXRpbHMuc3BsaXRMaW5lcyhtZWRpYVNlY3Rpb24pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgc3dpdGNoIChsaW5lc1tpXSkge1xuICAgICAgY2FzZSAnYT1zZW5kcmVjdic6XG4gICAgICBjYXNlICdhPXNlbmRvbmx5JzpcbiAgICAgIGNhc2UgJ2E9cmVjdm9ubHknOlxuICAgICAgY2FzZSAnYT1pbmFjdGl2ZSc6XG4gICAgICAgIHJldHVybiBsaW5lc1tpXS5zdWJzdHIoMik7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBGSVhNRTogV2hhdCBzaG91bGQgaGFwcGVuIGhlcmU/XG4gICAgfVxuICB9XG4gIGlmIChzZXNzaW9ucGFydCkge1xuICAgIHJldHVybiBTRFBVdGlscy5nZXREaXJlY3Rpb24oc2Vzc2lvbnBhcnQpO1xuICB9XG4gIHJldHVybiAnc2VuZHJlY3YnO1xufTtcblxuU0RQVXRpbHMuZ2V0S2luZCA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbikge1xuICB2YXIgbGluZXMgPSBTRFBVdGlscy5zcGxpdExpbmVzKG1lZGlhU2VjdGlvbik7XG4gIHZhciBtbGluZSA9IGxpbmVzWzBdLnNwbGl0KCcgJyk7XG4gIHJldHVybiBtbGluZVswXS5zdWJzdHIoMik7XG59O1xuXG5TRFBVdGlscy5pc1JlamVjdGVkID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XG4gIHJldHVybiBtZWRpYVNlY3Rpb24uc3BsaXQoJyAnLCAyKVsxXSA9PT0gJzAnO1xufTtcblxuU0RQVXRpbHMucGFyc2VNTGluZSA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbikge1xuICB2YXIgbGluZXMgPSBTRFBVdGlscy5zcGxpdExpbmVzKG1lZGlhU2VjdGlvbik7XG4gIHZhciBwYXJ0cyA9IGxpbmVzWzBdLnN1YnN0cigyKS5zcGxpdCgnICcpO1xuICByZXR1cm4ge1xuICAgIGtpbmQ6IHBhcnRzWzBdLFxuICAgIHBvcnQ6IHBhcnNlSW50KHBhcnRzWzFdLCAxMCksXG4gICAgcHJvdG9jb2w6IHBhcnRzWzJdLFxuICAgIGZtdDogcGFydHMuc2xpY2UoMykuam9pbignICcpXG4gIH07XG59O1xuXG5TRFBVdGlscy5wYXJzZU9MaW5lID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XG4gIHZhciBsaW5lID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnbz0nKVswXTtcbiAgdmFyIHBhcnRzID0gbGluZS5zdWJzdHIoMikuc3BsaXQoJyAnKTtcbiAgcmV0dXJuIHtcbiAgICB1c2VybmFtZTogcGFydHNbMF0sXG4gICAgc2Vzc2lvbklkOiBwYXJ0c1sxXSxcbiAgICBzZXNzaW9uVmVyc2lvbjogcGFyc2VJbnQocGFydHNbMl0sIDEwKSxcbiAgICBuZXRUeXBlOiBwYXJ0c1szXSxcbiAgICBhZGRyZXNzVHlwZTogcGFydHNbNF0sXG4gICAgYWRkcmVzczogcGFydHNbNV0sXG4gIH07XG59XG5cbi8vIEV4cG9zZSBwdWJsaWMgbWV0aG9kcy5cbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jykge1xuICBtb2R1bGUuZXhwb3J0cyA9IFNEUFV0aWxzO1xufVxuXG59LHt9XSwzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbihmdW5jdGlvbiAoZ2xvYmFsKXtcbi8qXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXG4gKiAgdHJlZS5cbiAqL1xuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBhZGFwdGVyRmFjdG9yeSA9IHJlcXVpcmUoJy4vYWRhcHRlcl9mYWN0b3J5LmpzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGFkYXB0ZXJGYWN0b3J5KHt3aW5kb3c6IGdsb2JhbC53aW5kb3d9KTtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG59LHtcIi4vYWRhcHRlcl9mYWN0b3J5LmpzXCI6NH1dLDQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLypcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcbiAqICB0cmVlLlxuICovXG4gLyogZXNsaW50LWVudiBub2RlICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuLy8gU2hpbW1pbmcgc3RhcnRzIGhlcmUuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRlcGVuZGVuY2llcywgb3B0cykge1xuICB2YXIgd2luZG93ID0gZGVwZW5kZW5jaWVzICYmIGRlcGVuZGVuY2llcy53aW5kb3c7XG5cbiAgdmFyIG9wdGlvbnMgPSB7XG4gICAgc2hpbUNocm9tZTogdHJ1ZSxcbiAgICBzaGltRmlyZWZveDogdHJ1ZSxcbiAgICBzaGltRWRnZTogdHJ1ZSxcbiAgICBzaGltU2FmYXJpOiB0cnVlLFxuICB9O1xuXG4gIGZvciAodmFyIGtleSBpbiBvcHRzKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob3B0cywga2V5KSkge1xuICAgICAgb3B0aW9uc1trZXldID0gb3B0c1trZXldO1xuICAgIH1cbiAgfVxuXG4gIC8vIFV0aWxzLlxuICB2YXIgbG9nZ2luZyA9IHV0aWxzLmxvZztcbiAgdmFyIGJyb3dzZXJEZXRhaWxzID0gdXRpbHMuZGV0ZWN0QnJvd3Nlcih3aW5kb3cpO1xuXG4gIC8vIFVuY29tbWVudCB0aGUgbGluZSBiZWxvdyBpZiB5b3Ugd2FudCBsb2dnaW5nIHRvIG9jY3VyLCBpbmNsdWRpbmcgbG9nZ2luZ1xuICAvLyBmb3IgdGhlIHN3aXRjaCBzdGF0ZW1lbnQgYmVsb3cuIENhbiBhbHNvIGJlIHR1cm5lZCBvbiBpbiB0aGUgYnJvd3NlciB2aWFcbiAgLy8gYWRhcHRlci5kaXNhYmxlTG9nKGZhbHNlKSwgYnV0IHRoZW4gbG9nZ2luZyBmcm9tIHRoZSBzd2l0Y2ggc3RhdGVtZW50IGJlbG93XG4gIC8vIHdpbGwgbm90IGFwcGVhci5cbiAgLy8gcmVxdWlyZSgnLi91dGlscycpLmRpc2FibGVMb2coZmFsc2UpO1xuXG4gIC8vIEJyb3dzZXIgc2hpbXMuXG4gIHZhciBjaHJvbWVTaGltID0gcmVxdWlyZSgnLi9jaHJvbWUvY2hyb21lX3NoaW0nKSB8fCBudWxsO1xuICB2YXIgZWRnZVNoaW0gPSByZXF1aXJlKCcuL2VkZ2UvZWRnZV9zaGltJykgfHwgbnVsbDtcbiAgdmFyIGZpcmVmb3hTaGltID0gcmVxdWlyZSgnLi9maXJlZm94L2ZpcmVmb3hfc2hpbScpIHx8IG51bGw7XG4gIHZhciBzYWZhcmlTaGltID0gcmVxdWlyZSgnLi9zYWZhcmkvc2FmYXJpX3NoaW0nKSB8fCBudWxsO1xuICB2YXIgY29tbW9uU2hpbSA9IHJlcXVpcmUoJy4vY29tbW9uX3NoaW0nKSB8fCBudWxsO1xuXG4gIC8vIEV4cG9ydCB0byB0aGUgYWRhcHRlciBnbG9iYWwgb2JqZWN0IHZpc2libGUgaW4gdGhlIGJyb3dzZXIuXG4gIHZhciBhZGFwdGVyID0ge1xuICAgIGJyb3dzZXJEZXRhaWxzOiBicm93c2VyRGV0YWlscyxcbiAgICBjb21tb25TaGltOiBjb21tb25TaGltLFxuICAgIGV4dHJhY3RWZXJzaW9uOiB1dGlscy5leHRyYWN0VmVyc2lvbixcbiAgICBkaXNhYmxlTG9nOiB1dGlscy5kaXNhYmxlTG9nLFxuICAgIGRpc2FibGVXYXJuaW5nczogdXRpbHMuZGlzYWJsZVdhcm5pbmdzXG4gIH07XG5cbiAgLy8gU2hpbSBicm93c2VyIGlmIGZvdW5kLlxuICBzd2l0Y2ggKGJyb3dzZXJEZXRhaWxzLmJyb3dzZXIpIHtcbiAgICBjYXNlICdjaHJvbWUnOlxuICAgICAgaWYgKCFjaHJvbWVTaGltIHx8ICFjaHJvbWVTaGltLnNoaW1QZWVyQ29ubmVjdGlvbiB8fFxuICAgICAgICAgICFvcHRpb25zLnNoaW1DaHJvbWUpIHtcbiAgICAgICAgbG9nZ2luZygnQ2hyb21lIHNoaW0gaXMgbm90IGluY2x1ZGVkIGluIHRoaXMgYWRhcHRlciByZWxlYXNlLicpO1xuICAgICAgICByZXR1cm4gYWRhcHRlcjtcbiAgICAgIH1cbiAgICAgIGxvZ2dpbmcoJ2FkYXB0ZXIuanMgc2hpbW1pbmcgY2hyb21lLicpO1xuICAgICAgLy8gRXhwb3J0IHRvIHRoZSBhZGFwdGVyIGdsb2JhbCBvYmplY3QgdmlzaWJsZSBpbiB0aGUgYnJvd3Nlci5cbiAgICAgIGFkYXB0ZXIuYnJvd3NlclNoaW0gPSBjaHJvbWVTaGltO1xuICAgICAgY29tbW9uU2hpbS5zaGltQ3JlYXRlT2JqZWN0VVJMKHdpbmRvdyk7XG5cbiAgICAgIGNocm9tZVNoaW0uc2hpbUdldFVzZXJNZWRpYSh3aW5kb3cpO1xuICAgICAgY2hyb21lU2hpbS5zaGltTWVkaWFTdHJlYW0od2luZG93KTtcbiAgICAgIGNocm9tZVNoaW0uc2hpbVNvdXJjZU9iamVjdCh3aW5kb3cpO1xuICAgICAgY2hyb21lU2hpbS5zaGltUGVlckNvbm5lY3Rpb24od2luZG93KTtcbiAgICAgIGNocm9tZVNoaW0uc2hpbU9uVHJhY2sod2luZG93KTtcbiAgICAgIGNocm9tZVNoaW0uc2hpbUFkZFRyYWNrUmVtb3ZlVHJhY2sod2luZG93KTtcbiAgICAgIGNocm9tZVNoaW0uc2hpbUdldFNlbmRlcnNXaXRoRHRtZih3aW5kb3cpO1xuXG4gICAgICBjb21tb25TaGltLnNoaW1SVENJY2VDYW5kaWRhdGUod2luZG93KTtcbiAgICAgIGNvbW1vblNoaW0uc2hpbU1heE1lc3NhZ2VTaXplKHdpbmRvdyk7XG4gICAgICBjb21tb25TaGltLnNoaW1TZW5kVGhyb3dUeXBlRXJyb3Iod2luZG93KTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2ZpcmVmb3gnOlxuICAgICAgaWYgKCFmaXJlZm94U2hpbSB8fCAhZmlyZWZveFNoaW0uc2hpbVBlZXJDb25uZWN0aW9uIHx8XG4gICAgICAgICAgIW9wdGlvbnMuc2hpbUZpcmVmb3gpIHtcbiAgICAgICAgbG9nZ2luZygnRmlyZWZveCBzaGltIGlzIG5vdCBpbmNsdWRlZCBpbiB0aGlzIGFkYXB0ZXIgcmVsZWFzZS4nKTtcbiAgICAgICAgcmV0dXJuIGFkYXB0ZXI7XG4gICAgICB9XG4gICAgICBsb2dnaW5nKCdhZGFwdGVyLmpzIHNoaW1taW5nIGZpcmVmb3guJyk7XG4gICAgICAvLyBFeHBvcnQgdG8gdGhlIGFkYXB0ZXIgZ2xvYmFsIG9iamVjdCB2aXNpYmxlIGluIHRoZSBicm93c2VyLlxuICAgICAgYWRhcHRlci5icm93c2VyU2hpbSA9IGZpcmVmb3hTaGltO1xuICAgICAgY29tbW9uU2hpbS5zaGltQ3JlYXRlT2JqZWN0VVJMKHdpbmRvdyk7XG5cbiAgICAgIGZpcmVmb3hTaGltLnNoaW1HZXRVc2VyTWVkaWEod2luZG93KTtcbiAgICAgIGZpcmVmb3hTaGltLnNoaW1Tb3VyY2VPYmplY3Qod2luZG93KTtcbiAgICAgIGZpcmVmb3hTaGltLnNoaW1QZWVyQ29ubmVjdGlvbih3aW5kb3cpO1xuICAgICAgZmlyZWZveFNoaW0uc2hpbU9uVHJhY2sod2luZG93KTtcbiAgICAgIGZpcmVmb3hTaGltLnNoaW1SZW1vdmVTdHJlYW0od2luZG93KTtcblxuICAgICAgY29tbW9uU2hpbS5zaGltUlRDSWNlQ2FuZGlkYXRlKHdpbmRvdyk7XG4gICAgICBjb21tb25TaGltLnNoaW1NYXhNZXNzYWdlU2l6ZSh3aW5kb3cpO1xuICAgICAgY29tbW9uU2hpbS5zaGltU2VuZFRocm93VHlwZUVycm9yKHdpbmRvdyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdlZGdlJzpcbiAgICAgIGlmICghZWRnZVNoaW0gfHwgIWVkZ2VTaGltLnNoaW1QZWVyQ29ubmVjdGlvbiB8fCAhb3B0aW9ucy5zaGltRWRnZSkge1xuICAgICAgICBsb2dnaW5nKCdNUyBlZGdlIHNoaW0gaXMgbm90IGluY2x1ZGVkIGluIHRoaXMgYWRhcHRlciByZWxlYXNlLicpO1xuICAgICAgICByZXR1cm4gYWRhcHRlcjtcbiAgICAgIH1cbiAgICAgIGxvZ2dpbmcoJ2FkYXB0ZXIuanMgc2hpbW1pbmcgZWRnZS4nKTtcbiAgICAgIC8vIEV4cG9ydCB0byB0aGUgYWRhcHRlciBnbG9iYWwgb2JqZWN0IHZpc2libGUgaW4gdGhlIGJyb3dzZXIuXG4gICAgICBhZGFwdGVyLmJyb3dzZXJTaGltID0gZWRnZVNoaW07XG4gICAgICBjb21tb25TaGltLnNoaW1DcmVhdGVPYmplY3RVUkwod2luZG93KTtcblxuICAgICAgZWRnZVNoaW0uc2hpbUdldFVzZXJNZWRpYSh3aW5kb3cpO1xuICAgICAgZWRnZVNoaW0uc2hpbVBlZXJDb25uZWN0aW9uKHdpbmRvdyk7XG4gICAgICBlZGdlU2hpbS5zaGltUmVwbGFjZVRyYWNrKHdpbmRvdyk7XG5cbiAgICAgIC8vIHRoZSBlZGdlIHNoaW0gaW1wbGVtZW50cyB0aGUgZnVsbCBSVENJY2VDYW5kaWRhdGUgb2JqZWN0LlxuXG4gICAgICBjb21tb25TaGltLnNoaW1NYXhNZXNzYWdlU2l6ZSh3aW5kb3cpO1xuICAgICAgY29tbW9uU2hpbS5zaGltU2VuZFRocm93VHlwZUVycm9yKHdpbmRvdyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdzYWZhcmknOlxuICAgICAgaWYgKCFzYWZhcmlTaGltIHx8ICFvcHRpb25zLnNoaW1TYWZhcmkpIHtcbiAgICAgICAgbG9nZ2luZygnU2FmYXJpIHNoaW0gaXMgbm90IGluY2x1ZGVkIGluIHRoaXMgYWRhcHRlciByZWxlYXNlLicpO1xuICAgICAgICByZXR1cm4gYWRhcHRlcjtcbiAgICAgIH1cbiAgICAgIGxvZ2dpbmcoJ2FkYXB0ZXIuanMgc2hpbW1pbmcgc2FmYXJpLicpO1xuICAgICAgLy8gRXhwb3J0IHRvIHRoZSBhZGFwdGVyIGdsb2JhbCBvYmplY3QgdmlzaWJsZSBpbiB0aGUgYnJvd3Nlci5cbiAgICAgIGFkYXB0ZXIuYnJvd3NlclNoaW0gPSBzYWZhcmlTaGltO1xuICAgICAgY29tbW9uU2hpbS5zaGltQ3JlYXRlT2JqZWN0VVJMKHdpbmRvdyk7XG5cbiAgICAgIHNhZmFyaVNoaW0uc2hpbVJUQ0ljZVNlcnZlclVybHMod2luZG93KTtcbiAgICAgIHNhZmFyaVNoaW0uc2hpbUNhbGxiYWNrc0FQSSh3aW5kb3cpO1xuICAgICAgc2FmYXJpU2hpbS5zaGltTG9jYWxTdHJlYW1zQVBJKHdpbmRvdyk7XG4gICAgICBzYWZhcmlTaGltLnNoaW1SZW1vdGVTdHJlYW1zQVBJKHdpbmRvdyk7XG4gICAgICBzYWZhcmlTaGltLnNoaW1UcmFja0V2ZW50VHJhbnNjZWl2ZXIod2luZG93KTtcbiAgICAgIHNhZmFyaVNoaW0uc2hpbUdldFVzZXJNZWRpYSh3aW5kb3cpO1xuICAgICAgc2FmYXJpU2hpbS5zaGltQ3JlYXRlT2ZmZXJMZWdhY3kod2luZG93KTtcblxuICAgICAgY29tbW9uU2hpbS5zaGltUlRDSWNlQ2FuZGlkYXRlKHdpbmRvdyk7XG4gICAgICBjb21tb25TaGltLnNoaW1NYXhNZXNzYWdlU2l6ZSh3aW5kb3cpO1xuICAgICAgY29tbW9uU2hpbS5zaGltU2VuZFRocm93VHlwZUVycm9yKHdpbmRvdyk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgbG9nZ2luZygnVW5zdXBwb3J0ZWQgYnJvd3NlciEnKTtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuIGFkYXB0ZXI7XG59O1xuXG59LHtcIi4vY2hyb21lL2Nocm9tZV9zaGltXCI6NSxcIi4vY29tbW9uX3NoaW1cIjo3LFwiLi9lZGdlL2VkZ2Vfc2hpbVwiOjgsXCIuL2ZpcmVmb3gvZmlyZWZveF9zaGltXCI6MTAsXCIuL3NhZmFyaS9zYWZhcmlfc2hpbVwiOjEyLFwiLi91dGlsc1wiOjEzfV0sNTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbi8qXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXG4gKiAgdHJlZS5cbiAqL1xuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xuJ3VzZSBzdHJpY3QnO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMuanMnKTtcbnZhciBsb2dnaW5nID0gdXRpbHMubG9nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2hpbUdldFVzZXJNZWRpYTogcmVxdWlyZSgnLi9nZXR1c2VybWVkaWEnKSxcbiAgc2hpbU1lZGlhU3RyZWFtOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICB3aW5kb3cuTWVkaWFTdHJlYW0gPSB3aW5kb3cuTWVkaWFTdHJlYW0gfHwgd2luZG93LndlYmtpdE1lZGlhU3RyZWFtO1xuICB9LFxuXG4gIHNoaW1PblRyYWNrOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uICYmICEoJ29udHJhY2snIGluXG4gICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSwgJ29udHJhY2snLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX29udHJhY2s7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24oZikge1xuICAgICAgICAgIGlmICh0aGlzLl9vbnRyYWNrKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYWNrJywgdGhpcy5fb250cmFjayk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigndHJhY2snLCB0aGlzLl9vbnRyYWNrID0gZik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdmFyIG9yaWdTZXRSZW1vdGVEZXNjcmlwdGlvbiA9XG4gICAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5zZXRSZW1vdGVEZXNjcmlwdGlvbjtcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0UmVtb3RlRGVzY3JpcHRpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgICAgaWYgKCFwYy5fb250cmFja3BvbHkpIHtcbiAgICAgICAgICBwYy5fb250cmFja3BvbHkgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAvLyBvbmFkZHN0cmVhbSBkb2VzIG5vdCBmaXJlIHdoZW4gYSB0cmFjayBpcyBhZGRlZCB0byBhbiBleGlzdGluZ1xuICAgICAgICAgICAgLy8gc3RyZWFtLiBCdXQgc3RyZWFtLm9uYWRkdHJhY2sgaXMgaW1wbGVtZW50ZWQgc28gd2UgdXNlIHRoYXQuXG4gICAgICAgICAgICBlLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKCdhZGR0cmFjaycsIGZ1bmN0aW9uKHRlKSB7XG4gICAgICAgICAgICAgIHZhciByZWNlaXZlcjtcbiAgICAgICAgICAgICAgaWYgKHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0UmVjZWl2ZXJzKSB7XG4gICAgICAgICAgICAgICAgcmVjZWl2ZXIgPSBwYy5nZXRSZWNlaXZlcnMoKS5maW5kKGZ1bmN0aW9uKHIpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiByLnRyYWNrICYmIHIudHJhY2suaWQgPT09IHRlLnRyYWNrLmlkO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlY2VpdmVyID0ge3RyYWNrOiB0ZS50cmFja307XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ3RyYWNrJyk7XG4gICAgICAgICAgICAgIGV2ZW50LnRyYWNrID0gdGUudHJhY2s7XG4gICAgICAgICAgICAgIGV2ZW50LnJlY2VpdmVyID0gcmVjZWl2ZXI7XG4gICAgICAgICAgICAgIGV2ZW50LnRyYW5zY2VpdmVyID0ge3JlY2VpdmVyOiByZWNlaXZlcn07XG4gICAgICAgICAgICAgIGV2ZW50LnN0cmVhbXMgPSBbZS5zdHJlYW1dO1xuICAgICAgICAgICAgICBwYy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZS5zdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xuICAgICAgICAgICAgICB2YXIgcmVjZWl2ZXI7XG4gICAgICAgICAgICAgIGlmICh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFJlY2VpdmVycykge1xuICAgICAgICAgICAgICAgIHJlY2VpdmVyID0gcGMuZ2V0UmVjZWl2ZXJzKCkuZmluZChmdW5jdGlvbihyKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gci50cmFjayAmJiByLnRyYWNrLmlkID09PSB0cmFjay5pZDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWNlaXZlciA9IHt0cmFjazogdHJhY2t9O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgndHJhY2snKTtcbiAgICAgICAgICAgICAgZXZlbnQudHJhY2sgPSB0cmFjaztcbiAgICAgICAgICAgICAgZXZlbnQucmVjZWl2ZXIgPSByZWNlaXZlcjtcbiAgICAgICAgICAgICAgZXZlbnQudHJhbnNjZWl2ZXIgPSB7cmVjZWl2ZXI6IHJlY2VpdmVyfTtcbiAgICAgICAgICAgICAgZXZlbnQuc3RyZWFtcyA9IFtlLnN0cmVhbV07XG4gICAgICAgICAgICAgIHBjLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICBwYy5hZGRFdmVudExpc3RlbmVyKCdhZGRzdHJlYW0nLCBwYy5fb250cmFja3BvbHkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvcmlnU2V0UmVtb3RlRGVzY3JpcHRpb24uYXBwbHkocGMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAoISgnUlRDUnRwVHJhbnNjZWl2ZXInIGluIHdpbmRvdykpIHtcbiAgICAgIHV0aWxzLndyYXBQZWVyQ29ubmVjdGlvbkV2ZW50KHdpbmRvdywgJ3RyYWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoIWUudHJhbnNjZWl2ZXIpIHtcbiAgICAgICAgICBlLnRyYW5zY2VpdmVyID0ge3JlY2VpdmVyOiBlLnJlY2VpdmVyfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICBzaGltR2V0U2VuZGVyc1dpdGhEdG1mOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICAvLyBPdmVycmlkZXMgYWRkVHJhY2svcmVtb3ZlVHJhY2ssIGRlcGVuZHMgb24gc2hpbUFkZFRyYWNrUmVtb3ZlVHJhY2suXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiAmJlxuICAgICAgICAhKCdnZXRTZW5kZXJzJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSAmJlxuICAgICAgICAnY3JlYXRlRFRNRlNlbmRlcicgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkge1xuICAgICAgdmFyIHNoaW1TZW5kZXJXaXRoRHRtZiA9IGZ1bmN0aW9uKHBjLCB0cmFjaykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRyYWNrOiB0cmFjayxcbiAgICAgICAgICBnZXQgZHRtZigpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9kdG1mID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgaWYgKHRyYWNrLmtpbmQgPT09ICdhdWRpbycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kdG1mID0gcGMuY3JlYXRlRFRNRlNlbmRlcih0cmFjayk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZHRtZiA9IG51bGw7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kdG1mO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgX3BjOiBwY1xuICAgICAgICB9O1xuICAgICAgfTtcblxuICAgICAgLy8gYXVnbWVudCBhZGRUcmFjayB3aGVuIGdldFNlbmRlcnMgaXMgbm90IGF2YWlsYWJsZS5cbiAgICAgIGlmICghd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTZW5kZXJzKSB7XG4gICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U2VuZGVycyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRoaXMuX3NlbmRlcnMgPSB0aGlzLl9zZW5kZXJzIHx8IFtdO1xuICAgICAgICAgIHJldHVybiB0aGlzLl9zZW5kZXJzLnNsaWNlKCk7IC8vIHJldHVybiBhIGNvcHkgb2YgdGhlIGludGVybmFsIHN0YXRlLlxuICAgICAgICB9O1xuICAgICAgICB2YXIgb3JpZ0FkZFRyYWNrID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjaztcbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjayA9IGZ1bmN0aW9uKHRyYWNrLCBzdHJlYW0pIHtcbiAgICAgICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgICAgIHZhciBzZW5kZXIgPSBvcmlnQWRkVHJhY2suYXBwbHkocGMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgaWYgKCFzZW5kZXIpIHtcbiAgICAgICAgICAgIHNlbmRlciA9IHNoaW1TZW5kZXJXaXRoRHRtZihwYywgdHJhY2spO1xuICAgICAgICAgICAgcGMuX3NlbmRlcnMucHVzaChzZW5kZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gc2VuZGVyO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBvcmlnUmVtb3ZlVHJhY2sgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVRyYWNrO1xuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVRyYWNrID0gZnVuY3Rpb24oc2VuZGVyKSB7XG4gICAgICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgICAgICBvcmlnUmVtb3ZlVHJhY2suYXBwbHkocGMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgdmFyIGlkeCA9IHBjLl9zZW5kZXJzLmluZGV4T2Yoc2VuZGVyKTtcbiAgICAgICAgICBpZiAoaWR4ICE9PSAtMSkge1xuICAgICAgICAgICAgcGMuX3NlbmRlcnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgdmFyIG9yaWdBZGRTdHJlYW0gPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFN0cmVhbTtcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICAgIHBjLl9zZW5kZXJzID0gcGMuX3NlbmRlcnMgfHwgW107XG4gICAgICAgIG9yaWdBZGRTdHJlYW0uYXBwbHkocGMsIFtzdHJlYW1dKTtcbiAgICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcbiAgICAgICAgICBwYy5fc2VuZGVycy5wdXNoKHNoaW1TZW5kZXJXaXRoRHRtZihwYywgdHJhY2spKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICB2YXIgb3JpZ1JlbW92ZVN0cmVhbSA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlU3RyZWFtO1xuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgICAgcGMuX3NlbmRlcnMgPSBwYy5fc2VuZGVycyB8fCBbXTtcbiAgICAgICAgb3JpZ1JlbW92ZVN0cmVhbS5hcHBseShwYywgW3N0cmVhbV0pO1xuXG4gICAgICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XG4gICAgICAgICAgdmFyIHNlbmRlciA9IHBjLl9zZW5kZXJzLmZpbmQoZnVuY3Rpb24ocykge1xuICAgICAgICAgICAgcmV0dXJuIHMudHJhY2sgPT09IHRyYWNrO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChzZW5kZXIpIHtcbiAgICAgICAgICAgIHBjLl9zZW5kZXJzLnNwbGljZShwYy5fc2VuZGVycy5pbmRleE9mKHNlbmRlciksIDEpOyAvLyByZW1vdmUgc2VuZGVyXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gJiZcbiAgICAgICAgICAgICAgICdnZXRTZW5kZXJzJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlICYmXG4gICAgICAgICAgICAgICAnY3JlYXRlRFRNRlNlbmRlcicgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSAmJlxuICAgICAgICAgICAgICAgd2luZG93LlJUQ1J0cFNlbmRlciAmJlxuICAgICAgICAgICAgICAgISgnZHRtZicgaW4gd2luZG93LlJUQ1J0cFNlbmRlci5wcm90b3R5cGUpKSB7XG4gICAgICB2YXIgb3JpZ0dldFNlbmRlcnMgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFNlbmRlcnM7XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFNlbmRlcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgICAgdmFyIHNlbmRlcnMgPSBvcmlnR2V0U2VuZGVycy5hcHBseShwYywgW10pO1xuICAgICAgICBzZW5kZXJzLmZvckVhY2goZnVuY3Rpb24oc2VuZGVyKSB7XG4gICAgICAgICAgc2VuZGVyLl9wYyA9IHBjO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHNlbmRlcnM7XG4gICAgICB9O1xuXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1J0cFNlbmRlci5wcm90b3R5cGUsICdkdG1mJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICh0aGlzLl9kdG1mID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRyYWNrLmtpbmQgPT09ICdhdWRpbycpIHtcbiAgICAgICAgICAgICAgdGhpcy5fZHRtZiA9IHRoaXMuX3BjLmNyZWF0ZURUTUZTZW5kZXIodGhpcy50cmFjayk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLl9kdG1mID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2R0bWY7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICBzaGltU291cmNlT2JqZWN0OiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICB2YXIgVVJMID0gd2luZG93ICYmIHdpbmRvdy5VUkw7XG5cbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmICh3aW5kb3cuSFRNTE1lZGlhRWxlbWVudCAmJlxuICAgICAgICAhKCdzcmNPYmplY3QnIGluIHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50LnByb3RvdHlwZSkpIHtcbiAgICAgICAgLy8gU2hpbSB0aGUgc3JjT2JqZWN0IHByb3BlcnR5LCBvbmNlLCB3aGVuIEhUTUxNZWRpYUVsZW1lbnQgaXMgZm91bmQuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuSFRNTE1lZGlhRWxlbWVudC5wcm90b3R5cGUsICdzcmNPYmplY3QnLCB7XG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zcmNPYmplY3Q7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgLy8gVXNlIF9zcmNPYmplY3QgYXMgYSBwcml2YXRlIHByb3BlcnR5IGZvciB0aGlzIHNoaW1cbiAgICAgICAgICAgIHRoaXMuX3NyY09iamVjdCA9IHN0cmVhbTtcbiAgICAgICAgICAgIGlmICh0aGlzLnNyYykge1xuICAgICAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHRoaXMuc3JjKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFzdHJlYW0pIHtcbiAgICAgICAgICAgICAgdGhpcy5zcmMgPSAnJztcbiAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc3JjID0gVVJMLmNyZWF0ZU9iamVjdFVSTChzdHJlYW0pO1xuICAgICAgICAgICAgLy8gV2UgbmVlZCB0byByZWNyZWF0ZSB0aGUgYmxvYiB1cmwgd2hlbiBhIHRyYWNrIGlzIGFkZGVkIG9yXG4gICAgICAgICAgICAvLyByZW1vdmVkLiBEb2luZyBpdCBtYW51YWxseSBzaW5jZSB3ZSB3YW50IHRvIGF2b2lkIGEgcmVjdXJzaW9uLlxuICAgICAgICAgICAgc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoJ2FkZHRyYWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGlmIChzZWxmLnNyYykge1xuICAgICAgICAgICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwoc2VsZi5zcmMpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNlbGYuc3JjID0gVVJMLmNyZWF0ZU9iamVjdFVSTChzdHJlYW0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcigncmVtb3ZldHJhY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYgKHNlbGYuc3JjKSB7XG4gICAgICAgICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChzZWxmLnNyYyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2VsZi5zcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKHN0cmVhbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBzaGltQWRkVHJhY2tSZW1vdmVUcmFja1dpdGhOYXRpdmU6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIC8vIHNoaW0gYWRkVHJhY2svcmVtb3ZlVHJhY2sgd2l0aCBuYXRpdmUgdmFyaWFudHMgaW4gb3JkZXIgdG8gbWFrZVxuICAgIC8vIHRoZSBpbnRlcmFjdGlvbnMgd2l0aCBsZWdhY3kgZ2V0TG9jYWxTdHJlYW1zIGJlaGF2ZSBhcyBpbiBvdGhlciBicm93c2Vycy5cbiAgICAvLyBLZWVwcyBhIG1hcHBpbmcgc3RyZWFtLmlkID0+IFtzdHJlYW0sIHJ0cHNlbmRlcnMuLi5dXG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRMb2NhbFN0cmVhbXMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zID0gdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcyB8fCB7fTtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zKS5tYXAoZnVuY3Rpb24oc3RyZWFtSWQpIHtcbiAgICAgICAgcmV0dXJuIHBjLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbUlkXVswXTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgb3JpZ0FkZFRyYWNrID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjaztcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFRyYWNrID0gZnVuY3Rpb24odHJhY2ssIHN0cmVhbSkge1xuICAgICAgaWYgKCFzdHJlYW0pIHtcbiAgICAgICAgcmV0dXJuIG9yaWdBZGRUcmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuICAgICAgdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcyA9IHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMgfHwge307XG5cbiAgICAgIHZhciBzZW5kZXIgPSBvcmlnQWRkVHJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIGlmICghdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW0uaWRdKSB7XG4gICAgICAgIHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtLmlkXSA9IFtzdHJlYW0sIHNlbmRlcl07XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtLmlkXS5pbmRleE9mKHNlbmRlcikgPT09IC0xKSB7XG4gICAgICAgIHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtLmlkXS5wdXNoKHNlbmRlcik7XG4gICAgICB9XG4gICAgICByZXR1cm4gc2VuZGVyO1xuICAgIH07XG5cbiAgICB2YXIgb3JpZ0FkZFN0cmVhbSA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkU3RyZWFtO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcyA9IHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMgfHwge307XG5cbiAgICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XG4gICAgICAgIHZhciBhbHJlYWR5RXhpc3RzID0gcGMuZ2V0U2VuZGVycygpLmZpbmQoZnVuY3Rpb24ocykge1xuICAgICAgICAgIHJldHVybiBzLnRyYWNrID09PSB0cmFjaztcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChhbHJlYWR5RXhpc3RzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbignVHJhY2sgYWxyZWFkeSBleGlzdHMuJyxcbiAgICAgICAgICAgICAgJ0ludmFsaWRBY2Nlc3NFcnJvcicpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHZhciBleGlzdGluZ1NlbmRlcnMgPSBwYy5nZXRTZW5kZXJzKCk7XG4gICAgICBvcmlnQWRkU3RyZWFtLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB2YXIgbmV3U2VuZGVycyA9IHBjLmdldFNlbmRlcnMoKS5maWx0ZXIoZnVuY3Rpb24obmV3U2VuZGVyKSB7XG4gICAgICAgIHJldHVybiBleGlzdGluZ1NlbmRlcnMuaW5kZXhPZihuZXdTZW5kZXIpID09PSAtMTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW0uaWRdID0gW3N0cmVhbV0uY29uY2F0KG5ld1NlbmRlcnMpO1xuICAgIH07XG5cbiAgICB2YXIgb3JpZ1JlbW92ZVN0cmVhbSA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlU3RyZWFtO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zID0gdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcyB8fCB7fTtcbiAgICAgIGRlbGV0ZSB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbS5pZF07XG4gICAgICByZXR1cm4gb3JpZ1JlbW92ZVN0cmVhbS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG5cbiAgICB2YXIgb3JpZ1JlbW92ZVRyYWNrID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVUcmFjaztcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVRyYWNrID0gZnVuY3Rpb24oc2VuZGVyKSB7XG4gICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcyA9IHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMgfHwge307XG4gICAgICBpZiAoc2VuZGVyKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMpLmZvckVhY2goZnVuY3Rpb24oc3RyZWFtSWQpIHtcbiAgICAgICAgICB2YXIgaWR4ID0gcGMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtSWRdLmluZGV4T2Yoc2VuZGVyKTtcbiAgICAgICAgICBpZiAoaWR4ICE9PSAtMSkge1xuICAgICAgICAgICAgcGMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtSWRdLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocGMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtSWRdLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgZGVsZXRlIHBjLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbUlkXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9yaWdSZW1vdmVUcmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH0sXG5cbiAgc2hpbUFkZFRyYWNrUmVtb3ZlVHJhY2s6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIHZhciBicm93c2VyRGV0YWlscyA9IHV0aWxzLmRldGVjdEJyb3dzZXIod2luZG93KTtcbiAgICAvLyBzaGltIGFkZFRyYWNrIGFuZCByZW1vdmVUcmFjay5cbiAgICBpZiAod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjayAmJlxuICAgICAgICBicm93c2VyRGV0YWlscy52ZXJzaW9uID49IDY1KSB7XG4gICAgICByZXR1cm4gdGhpcy5zaGltQWRkVHJhY2tSZW1vdmVUcmFja1dpdGhOYXRpdmUod2luZG93KTtcbiAgICB9XG5cbiAgICAvLyBhbHNvIHNoaW0gcGMuZ2V0TG9jYWxTdHJlYW1zIHdoZW4gYWRkVHJhY2sgaXMgc2hpbW1lZFxuICAgIC8vIHRvIHJldHVybiB0aGUgb3JpZ2luYWwgc3RyZWFtcy5cbiAgICB2YXIgb3JpZ0dldExvY2FsU3RyZWFtcyA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVcbiAgICAgICAgLmdldExvY2FsU3RyZWFtcztcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldExvY2FsU3RyZWFtcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgIHZhciBuYXRpdmVTdHJlYW1zID0gb3JpZ0dldExvY2FsU3RyZWFtcy5hcHBseSh0aGlzKTtcbiAgICAgIHBjLl9yZXZlcnNlU3RyZWFtcyA9IHBjLl9yZXZlcnNlU3RyZWFtcyB8fCB7fTtcbiAgICAgIHJldHVybiBuYXRpdmVTdHJlYW1zLm1hcChmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgICAgcmV0dXJuIHBjLl9yZXZlcnNlU3RyZWFtc1tzdHJlYW0uaWRdO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBvcmlnQWRkU3RyZWFtID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRTdHJlYW07XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICBwYy5fc3RyZWFtcyA9IHBjLl9zdHJlYW1zIHx8IHt9O1xuICAgICAgcGMuX3JldmVyc2VTdHJlYW1zID0gcGMuX3JldmVyc2VTdHJlYW1zIHx8IHt9O1xuXG4gICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xuICAgICAgICB2YXIgYWxyZWFkeUV4aXN0cyA9IHBjLmdldFNlbmRlcnMoKS5maW5kKGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgICByZXR1cm4gcy50cmFjayA9PT0gdHJhY2s7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoYWxyZWFkeUV4aXN0cykge1xuICAgICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oJ1RyYWNrIGFscmVhZHkgZXhpc3RzLicsXG4gICAgICAgICAgICAgICdJbnZhbGlkQWNjZXNzRXJyb3InKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvLyBBZGQgaWRlbnRpdHkgbWFwcGluZyBmb3IgY29uc2lzdGVuY3kgd2l0aCBhZGRUcmFjay5cbiAgICAgIC8vIFVubGVzcyB0aGlzIGlzIGJlaW5nIHVzZWQgd2l0aCBhIHN0cmVhbSBmcm9tIGFkZFRyYWNrLlxuICAgICAgaWYgKCFwYy5fcmV2ZXJzZVN0cmVhbXNbc3RyZWFtLmlkXSkge1xuICAgICAgICB2YXIgbmV3U3RyZWFtID0gbmV3IHdpbmRvdy5NZWRpYVN0cmVhbShzdHJlYW0uZ2V0VHJhY2tzKCkpO1xuICAgICAgICBwYy5fc3RyZWFtc1tzdHJlYW0uaWRdID0gbmV3U3RyZWFtO1xuICAgICAgICBwYy5fcmV2ZXJzZVN0cmVhbXNbbmV3U3RyZWFtLmlkXSA9IHN0cmVhbTtcbiAgICAgICAgc3RyZWFtID0gbmV3U3RyZWFtO1xuICAgICAgfVxuICAgICAgb3JpZ0FkZFN0cmVhbS5hcHBseShwYywgW3N0cmVhbV0pO1xuICAgIH07XG5cbiAgICB2YXIgb3JpZ1JlbW92ZVN0cmVhbSA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlU3RyZWFtO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgcGMuX3N0cmVhbXMgPSBwYy5fc3RyZWFtcyB8fCB7fTtcbiAgICAgIHBjLl9yZXZlcnNlU3RyZWFtcyA9IHBjLl9yZXZlcnNlU3RyZWFtcyB8fCB7fTtcblxuICAgICAgb3JpZ1JlbW92ZVN0cmVhbS5hcHBseShwYywgWyhwYy5fc3RyZWFtc1tzdHJlYW0uaWRdIHx8IHN0cmVhbSldKTtcbiAgICAgIGRlbGV0ZSBwYy5fcmV2ZXJzZVN0cmVhbXNbKHBjLl9zdHJlYW1zW3N0cmVhbS5pZF0gP1xuICAgICAgICAgIHBjLl9zdHJlYW1zW3N0cmVhbS5pZF0uaWQgOiBzdHJlYW0uaWQpXTtcbiAgICAgIGRlbGV0ZSBwYy5fc3RyZWFtc1tzdHJlYW0uaWRdO1xuICAgIH07XG5cbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFRyYWNrID0gZnVuY3Rpb24odHJhY2ssIHN0cmVhbSkge1xuICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgIGlmIChwYy5zaWduYWxpbmdTdGF0ZSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbihcbiAgICAgICAgICAnVGhlIFJUQ1BlZXJDb25uZWN0aW9uXFwncyBzaWduYWxpbmdTdGF0ZSBpcyBcXCdjbG9zZWRcXCcuJyxcbiAgICAgICAgICAnSW52YWxpZFN0YXRlRXJyb3InKTtcbiAgICAgIH1cbiAgICAgIHZhciBzdHJlYW1zID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgaWYgKHN0cmVhbXMubGVuZ3RoICE9PSAxIHx8XG4gICAgICAgICAgIXN0cmVhbXNbMF0uZ2V0VHJhY2tzKCkuZmluZChmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICByZXR1cm4gdCA9PT0gdHJhY2s7XG4gICAgICAgICAgfSkpIHtcbiAgICAgICAgLy8gdGhpcyBpcyBub3QgZnVsbHkgY29ycmVjdCBidXQgYWxsIHdlIGNhbiBtYW5hZ2Ugd2l0aG91dFxuICAgICAgICAvLyBbW2Fzc29jaWF0ZWQgTWVkaWFTdHJlYW1zXV0gaW50ZXJuYWwgc2xvdC5cbiAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbihcbiAgICAgICAgICAnVGhlIGFkYXB0ZXIuanMgYWRkVHJhY2sgcG9seWZpbGwgb25seSBzdXBwb3J0cyBhIHNpbmdsZSAnICtcbiAgICAgICAgICAnIHN0cmVhbSB3aGljaCBpcyBhc3NvY2lhdGVkIHdpdGggdGhlIHNwZWNpZmllZCB0cmFjay4nLFxuICAgICAgICAgICdOb3RTdXBwb3J0ZWRFcnJvcicpO1xuICAgICAgfVxuXG4gICAgICB2YXIgYWxyZWFkeUV4aXN0cyA9IHBjLmdldFNlbmRlcnMoKS5maW5kKGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgcmV0dXJuIHMudHJhY2sgPT09IHRyYWNrO1xuICAgICAgfSk7XG4gICAgICBpZiAoYWxyZWFkeUV4aXN0cykge1xuICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKCdUcmFjayBhbHJlYWR5IGV4aXN0cy4nLFxuICAgICAgICAgICAgJ0ludmFsaWRBY2Nlc3NFcnJvcicpO1xuICAgICAgfVxuXG4gICAgICBwYy5fc3RyZWFtcyA9IHBjLl9zdHJlYW1zIHx8IHt9O1xuICAgICAgcGMuX3JldmVyc2VTdHJlYW1zID0gcGMuX3JldmVyc2VTdHJlYW1zIHx8IHt9O1xuICAgICAgdmFyIG9sZFN0cmVhbSA9IHBjLl9zdHJlYW1zW3N0cmVhbS5pZF07XG4gICAgICBpZiAob2xkU3RyZWFtKSB7XG4gICAgICAgIC8vIHRoaXMgaXMgdXNpbmcgb2RkIENocm9tZSBiZWhhdmlvdXIsIHVzZSB3aXRoIGNhdXRpb246XG4gICAgICAgIC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC93ZWJydGMvaXNzdWVzL2RldGFpbD9pZD03ODE1XG4gICAgICAgIC8vIE5vdGU6IHdlIHJlbHkgb24gdGhlIGhpZ2gtbGV2ZWwgYWRkVHJhY2svZHRtZiBzaGltIHRvXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgc2VuZGVyIHdpdGggYSBkdG1mIHNlbmRlci5cbiAgICAgICAgb2xkU3RyZWFtLmFkZFRyYWNrKHRyYWNrKTtcblxuICAgICAgICAvLyBUcmlnZ2VyIE9OTiBhc3luYy5cbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICBwYy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnbmVnb3RpYXRpb25uZWVkZWQnKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIG5ld1N0cmVhbSA9IG5ldyB3aW5kb3cuTWVkaWFTdHJlYW0oW3RyYWNrXSk7XG4gICAgICAgIHBjLl9zdHJlYW1zW3N0cmVhbS5pZF0gPSBuZXdTdHJlYW07XG4gICAgICAgIHBjLl9yZXZlcnNlU3RyZWFtc1tuZXdTdHJlYW0uaWRdID0gc3RyZWFtO1xuICAgICAgICBwYy5hZGRTdHJlYW0obmV3U3RyZWFtKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwYy5nZXRTZW5kZXJzKCkuZmluZChmdW5jdGlvbihzKSB7XG4gICAgICAgIHJldHVybiBzLnRyYWNrID09PSB0cmFjaztcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyByZXBsYWNlIHRoZSBpbnRlcm5hbCBzdHJlYW0gaWQgd2l0aCB0aGUgZXh0ZXJuYWwgb25lIGFuZFxuICAgIC8vIHZpY2UgdmVyc2EuXG4gICAgZnVuY3Rpb24gcmVwbGFjZUludGVybmFsU3RyZWFtSWQocGMsIGRlc2NyaXB0aW9uKSB7XG4gICAgICB2YXIgc2RwID0gZGVzY3JpcHRpb24uc2RwO1xuICAgICAgT2JqZWN0LmtleXMocGMuX3JldmVyc2VTdHJlYW1zIHx8IFtdKS5mb3JFYWNoKGZ1bmN0aW9uKGludGVybmFsSWQpIHtcbiAgICAgICAgdmFyIGV4dGVybmFsU3RyZWFtID0gcGMuX3JldmVyc2VTdHJlYW1zW2ludGVybmFsSWRdO1xuICAgICAgICB2YXIgaW50ZXJuYWxTdHJlYW0gPSBwYy5fc3RyZWFtc1tleHRlcm5hbFN0cmVhbS5pZF07XG4gICAgICAgIHNkcCA9IHNkcC5yZXBsYWNlKG5ldyBSZWdFeHAoaW50ZXJuYWxTdHJlYW0uaWQsICdnJyksXG4gICAgICAgICAgICBleHRlcm5hbFN0cmVhbS5pZCk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXcgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKHtcbiAgICAgICAgdHlwZTogZGVzY3JpcHRpb24udHlwZSxcbiAgICAgICAgc2RwOiBzZHBcbiAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZXBsYWNlRXh0ZXJuYWxTdHJlYW1JZChwYywgZGVzY3JpcHRpb24pIHtcbiAgICAgIHZhciBzZHAgPSBkZXNjcmlwdGlvbi5zZHA7XG4gICAgICBPYmplY3Qua2V5cyhwYy5fcmV2ZXJzZVN0cmVhbXMgfHwgW10pLmZvckVhY2goZnVuY3Rpb24oaW50ZXJuYWxJZCkge1xuICAgICAgICB2YXIgZXh0ZXJuYWxTdHJlYW0gPSBwYy5fcmV2ZXJzZVN0cmVhbXNbaW50ZXJuYWxJZF07XG4gICAgICAgIHZhciBpbnRlcm5hbFN0cmVhbSA9IHBjLl9zdHJlYW1zW2V4dGVybmFsU3RyZWFtLmlkXTtcbiAgICAgICAgc2RwID0gc2RwLnJlcGxhY2UobmV3IFJlZ0V4cChleHRlcm5hbFN0cmVhbS5pZCwgJ2cnKSxcbiAgICAgICAgICAgIGludGVybmFsU3RyZWFtLmlkKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5ldyBSVENTZXNzaW9uRGVzY3JpcHRpb24oe1xuICAgICAgICB0eXBlOiBkZXNjcmlwdGlvbi50eXBlLFxuICAgICAgICBzZHA6IHNkcFxuICAgICAgfSk7XG4gICAgfVxuICAgIFsnY3JlYXRlT2ZmZXInLCAnY3JlYXRlQW5zd2VyJ10uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIHZhciBuYXRpdmVNZXRob2QgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF07XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgIHZhciBpc0xlZ2FjeUNhbGwgPSBhcmd1bWVudHMubGVuZ3RoICYmXG4gICAgICAgICAgICB0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnZnVuY3Rpb24nO1xuICAgICAgICBpZiAoaXNMZWdhY3lDYWxsKSB7XG4gICAgICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseShwYywgW1xuICAgICAgICAgICAgZnVuY3Rpb24oZGVzY3JpcHRpb24pIHtcbiAgICAgICAgICAgICAgdmFyIGRlc2MgPSByZXBsYWNlSW50ZXJuYWxTdHJlYW1JZChwYywgZGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgICBhcmdzWzBdLmFwcGx5KG51bGwsIFtkZXNjXSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgIGlmIChhcmdzWzFdKSB7XG4gICAgICAgICAgICAgICAgYXJnc1sxXS5hcHBseShudWxsLCBlcnIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBhcmd1bWVudHNbMl1cbiAgICAgICAgICBdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHBjLCBhcmd1bWVudHMpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKGRlc2NyaXB0aW9uKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcGxhY2VJbnRlcm5hbFN0cmVhbUlkKHBjLCBkZXNjcmlwdGlvbik7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9KTtcblxuICAgIHZhciBvcmlnU2V0TG9jYWxEZXNjcmlwdGlvbiA9XG4gICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0TG9jYWxEZXNjcmlwdGlvbjtcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnNldExvY2FsRGVzY3JpcHRpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGggfHwgIWFyZ3VtZW50c1swXS50eXBlKSB7XG4gICAgICAgIHJldHVybiBvcmlnU2V0TG9jYWxEZXNjcmlwdGlvbi5hcHBseShwYywgYXJndW1lbnRzKTtcbiAgICAgIH1cbiAgICAgIGFyZ3VtZW50c1swXSA9IHJlcGxhY2VFeHRlcm5hbFN0cmVhbUlkKHBjLCBhcmd1bWVudHNbMF0pO1xuICAgICAgcmV0dXJuIG9yaWdTZXRMb2NhbERlc2NyaXB0aW9uLmFwcGx5KHBjLCBhcmd1bWVudHMpO1xuICAgIH07XG5cbiAgICAvLyBUT0RPOiBtYW5nbGUgZ2V0U3RhdHM6IGh0dHBzOi8vdzNjLmdpdGh1Yi5pby93ZWJydGMtc3RhdHMvI2RvbS1ydGNtZWRpYXN0cmVhbXN0YXRzLXN0cmVhbWlkZW50aWZpZXJcblxuICAgIHZhciBvcmlnTG9jYWxEZXNjcmlwdGlvbiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoXG4gICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUsICdsb2NhbERlc2NyaXB0aW9uJyk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUsXG4gICAgICAgICdsb2NhbERlc2NyaXB0aW9uJywge1xuICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgICAgICAgdmFyIGRlc2NyaXB0aW9uID0gb3JpZ0xvY2FsRGVzY3JpcHRpb24uZ2V0LmFwcGx5KHRoaXMpO1xuICAgICAgICAgICAgaWYgKGRlc2NyaXB0aW9uLnR5cGUgPT09ICcnKSB7XG4gICAgICAgICAgICAgIHJldHVybiBkZXNjcmlwdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXBsYWNlSW50ZXJuYWxTdHJlYW1JZChwYywgZGVzY3JpcHRpb24pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVRyYWNrID0gZnVuY3Rpb24oc2VuZGVyKSB7XG4gICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgaWYgKHBjLnNpZ25hbGluZ1N0YXRlID09PSAnY2xvc2VkJykge1xuICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKFxuICAgICAgICAgICdUaGUgUlRDUGVlckNvbm5lY3Rpb25cXCdzIHNpZ25hbGluZ1N0YXRlIGlzIFxcJ2Nsb3NlZFxcJy4nLFxuICAgICAgICAgICdJbnZhbGlkU3RhdGVFcnJvcicpO1xuICAgICAgfVxuICAgICAgLy8gV2UgY2FuIG5vdCB5ZXQgY2hlY2sgZm9yIHNlbmRlciBpbnN0YW5jZW9mIFJUQ1J0cFNlbmRlclxuICAgICAgLy8gc2luY2Ugd2Ugc2hpbSBSVFBTZW5kZXIuIFNvIHdlIGNoZWNrIGlmIHNlbmRlci5fcGMgaXMgc2V0LlxuICAgICAgaWYgKCFzZW5kZXIuX3BjKSB7XG4gICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oJ0FyZ3VtZW50IDEgb2YgUlRDUGVlckNvbm5lY3Rpb24ucmVtb3ZlVHJhY2sgJyArXG4gICAgICAgICAgICAnZG9lcyBub3QgaW1wbGVtZW50IGludGVyZmFjZSBSVENSdHBTZW5kZXIuJywgJ1R5cGVFcnJvcicpO1xuICAgICAgfVxuICAgICAgdmFyIGlzTG9jYWwgPSBzZW5kZXIuX3BjID09PSBwYztcbiAgICAgIGlmICghaXNMb2NhbCkge1xuICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKCdTZW5kZXIgd2FzIG5vdCBjcmVhdGVkIGJ5IHRoaXMgY29ubmVjdGlvbi4nLFxuICAgICAgICAgICAgJ0ludmFsaWRBY2Nlc3NFcnJvcicpO1xuICAgICAgfVxuXG4gICAgICAvLyBTZWFyY2ggZm9yIHRoZSBuYXRpdmUgc3RyZWFtIHRoZSBzZW5kZXJzIHRyYWNrIGJlbG9uZ3MgdG8uXG4gICAgICBwYy5fc3RyZWFtcyA9IHBjLl9zdHJlYW1zIHx8IHt9O1xuICAgICAgdmFyIHN0cmVhbTtcbiAgICAgIE9iamVjdC5rZXlzKHBjLl9zdHJlYW1zKS5mb3JFYWNoKGZ1bmN0aW9uKHN0cmVhbWlkKSB7XG4gICAgICAgIHZhciBoYXNUcmFjayA9IHBjLl9zdHJlYW1zW3N0cmVhbWlkXS5nZXRUcmFja3MoKS5maW5kKGZ1bmN0aW9uKHRyYWNrKSB7XG4gICAgICAgICAgcmV0dXJuIHNlbmRlci50cmFjayA9PT0gdHJhY2s7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoaGFzVHJhY2spIHtcbiAgICAgICAgICBzdHJlYW0gPSBwYy5fc3RyZWFtc1tzdHJlYW1pZF07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAoc3RyZWFtKSB7XG4gICAgICAgIGlmIChzdHJlYW0uZ2V0VHJhY2tzKCkubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgLy8gaWYgdGhpcyBpcyB0aGUgbGFzdCB0cmFjayBvZiB0aGUgc3RyZWFtLCByZW1vdmUgdGhlIHN0cmVhbS4gVGhpc1xuICAgICAgICAgIC8vIHRha2VzIGNhcmUgb2YgYW55IHNoaW1tZWQgX3NlbmRlcnMuXG4gICAgICAgICAgcGMucmVtb3ZlU3RyZWFtKHBjLl9yZXZlcnNlU3RyZWFtc1tzdHJlYW0uaWRdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyByZWx5aW5nIG9uIHRoZSBzYW1lIG9kZCBjaHJvbWUgYmVoYXZpb3VyIGFzIGFib3ZlLlxuICAgICAgICAgIHN0cmVhbS5yZW1vdmVUcmFjayhzZW5kZXIudHJhY2spO1xuICAgICAgICB9XG4gICAgICAgIHBjLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCduZWdvdGlhdGlvbm5lZWRlZCcpKTtcbiAgICAgIH1cbiAgICB9O1xuICB9LFxuXG4gIHNoaW1QZWVyQ29ubmVjdGlvbjogZnVuY3Rpb24od2luZG93KSB7XG4gICAgdmFyIGJyb3dzZXJEZXRhaWxzID0gdXRpbHMuZGV0ZWN0QnJvd3Nlcih3aW5kb3cpO1xuXG4gICAgLy8gVGhlIFJUQ1BlZXJDb25uZWN0aW9uIG9iamVjdC5cbiAgICBpZiAoIXdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiAmJiB3aW5kb3cud2Via2l0UlRDUGVlckNvbm5lY3Rpb24pIHtcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiA9IGZ1bmN0aW9uKHBjQ29uZmlnLCBwY0NvbnN0cmFpbnRzKSB7XG4gICAgICAgIC8vIFRyYW5zbGF0ZSBpY2VUcmFuc3BvcnRQb2xpY3kgdG8gaWNlVHJhbnNwb3J0cyxcbiAgICAgICAgLy8gc2VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3Avd2VicnRjL2lzc3Vlcy9kZXRhaWw/aWQ9NDg2OVxuICAgICAgICAvLyB0aGlzIHdhcyBmaXhlZCBpbiBNNTYgYWxvbmcgd2l0aCB1bnByZWZpeGluZyBSVENQZWVyQ29ubmVjdGlvbi5cbiAgICAgICAgbG9nZ2luZygnUGVlckNvbm5lY3Rpb24nKTtcbiAgICAgICAgaWYgKHBjQ29uZmlnICYmIHBjQ29uZmlnLmljZVRyYW5zcG9ydFBvbGljeSkge1xuICAgICAgICAgIHBjQ29uZmlnLmljZVRyYW5zcG9ydHMgPSBwY0NvbmZpZy5pY2VUcmFuc3BvcnRQb2xpY3k7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IHdpbmRvdy53ZWJraXRSVENQZWVyQ29ubmVjdGlvbihwY0NvbmZpZywgcGNDb25zdHJhaW50cyk7XG4gICAgICB9O1xuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSA9XG4gICAgICAgICAgd2luZG93LndlYmtpdFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZTtcbiAgICAgIC8vIHdyYXAgc3RhdGljIG1ldGhvZHMuIEN1cnJlbnRseSBqdXN0IGdlbmVyYXRlQ2VydGlmaWNhdGUuXG4gICAgICBpZiAod2luZG93LndlYmtpdFJUQ1BlZXJDb25uZWN0aW9uLmdlbmVyYXRlQ2VydGlmaWNhdGUpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiwgJ2dlbmVyYXRlQ2VydGlmaWNhdGUnLCB7XG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cud2Via2l0UlRDUGVlckNvbm5lY3Rpb24uZ2VuZXJhdGVDZXJ0aWZpY2F0ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBtaWdyYXRlIGZyb20gbm9uLXNwZWMgUlRDSWNlU2VydmVyLnVybCB0byBSVENJY2VTZXJ2ZXIudXJsc1xuICAgICAgdmFyIE9yaWdQZWVyQ29ubmVjdGlvbiA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbjtcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiA9IGZ1bmN0aW9uKHBjQ29uZmlnLCBwY0NvbnN0cmFpbnRzKSB7XG4gICAgICAgIGlmIChwY0NvbmZpZyAmJiBwY0NvbmZpZy5pY2VTZXJ2ZXJzKSB7XG4gICAgICAgICAgdmFyIG5ld0ljZVNlcnZlcnMgPSBbXTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBjQ29uZmlnLmljZVNlcnZlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBzZXJ2ZXIgPSBwY0NvbmZpZy5pY2VTZXJ2ZXJzW2ldO1xuICAgICAgICAgICAgaWYgKCFzZXJ2ZXIuaGFzT3duUHJvcGVydHkoJ3VybHMnKSAmJlxuICAgICAgICAgICAgICAgIHNlcnZlci5oYXNPd25Qcm9wZXJ0eSgndXJsJykpIHtcbiAgICAgICAgICAgICAgdXRpbHMuZGVwcmVjYXRlZCgnUlRDSWNlU2VydmVyLnVybCcsICdSVENJY2VTZXJ2ZXIudXJscycpO1xuICAgICAgICAgICAgICBzZXJ2ZXIgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHNlcnZlcikpO1xuICAgICAgICAgICAgICBzZXJ2ZXIudXJscyA9IHNlcnZlci51cmw7XG4gICAgICAgICAgICAgIG5ld0ljZVNlcnZlcnMucHVzaChzZXJ2ZXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbmV3SWNlU2VydmVycy5wdXNoKHBjQ29uZmlnLmljZVNlcnZlcnNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBwY0NvbmZpZy5pY2VTZXJ2ZXJzID0gbmV3SWNlU2VydmVycztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IE9yaWdQZWVyQ29ubmVjdGlvbihwY0NvbmZpZywgcGNDb25zdHJhaW50cyk7XG4gICAgICB9O1xuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSA9IE9yaWdQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGU7XG4gICAgICAvLyB3cmFwIHN0YXRpYyBtZXRob2RzLiBDdXJyZW50bHkganVzdCBnZW5lcmF0ZUNlcnRpZmljYXRlLlxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiwgJ2dlbmVyYXRlQ2VydGlmaWNhdGUnLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIE9yaWdQZWVyQ29ubmVjdGlvbi5nZW5lcmF0ZUNlcnRpZmljYXRlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB2YXIgb3JpZ0dldFN0YXRzID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTdGF0cztcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFN0YXRzID0gZnVuY3Rpb24oc2VsZWN0b3IsXG4gICAgICAgIHN1Y2Nlc3NDYWxsYmFjaywgZXJyb3JDYWxsYmFjaykge1xuICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuXG4gICAgICAvLyBJZiBzZWxlY3RvciBpcyBhIGZ1bmN0aW9uIHRoZW4gd2UgYXJlIGluIHRoZSBvbGQgc3R5bGUgc3RhdHMgc28ganVzdFxuICAgICAgLy8gcGFzcyBiYWNrIHRoZSBvcmlnaW5hbCBnZXRTdGF0cyBmb3JtYXQgdG8gYXZvaWQgYnJlYWtpbmcgb2xkIHVzZXJzLlxuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIHR5cGVvZiBzZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gb3JpZ0dldFN0YXRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIC8vIFdoZW4gc3BlYy1zdHlsZSBnZXRTdGF0cyBpcyBzdXBwb3J0ZWQsIHJldHVybiB0aG9zZSB3aGVuIGNhbGxlZCB3aXRoXG4gICAgICAvLyBlaXRoZXIgbm8gYXJndW1lbnRzIG9yIHRoZSBzZWxlY3RvciBhcmd1bWVudCBpcyBudWxsLlxuICAgICAgaWYgKG9yaWdHZXRTdGF0cy5sZW5ndGggPT09IDAgJiYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDAgfHxcbiAgICAgICAgICB0eXBlb2YgYXJndW1lbnRzWzBdICE9PSAnZnVuY3Rpb24nKSkge1xuICAgICAgICByZXR1cm4gb3JpZ0dldFN0YXRzLmFwcGx5KHRoaXMsIFtdKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGZpeENocm9tZVN0YXRzXyA9IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIHZhciBzdGFuZGFyZFJlcG9ydCA9IHt9O1xuICAgICAgICB2YXIgcmVwb3J0cyA9IHJlc3BvbnNlLnJlc3VsdCgpO1xuICAgICAgICByZXBvcnRzLmZvckVhY2goZnVuY3Rpb24ocmVwb3J0KSB7XG4gICAgICAgICAgdmFyIHN0YW5kYXJkU3RhdHMgPSB7XG4gICAgICAgICAgICBpZDogcmVwb3J0LmlkLFxuICAgICAgICAgICAgdGltZXN0YW1wOiByZXBvcnQudGltZXN0YW1wLFxuICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICBsb2NhbGNhbmRpZGF0ZTogJ2xvY2FsLWNhbmRpZGF0ZScsXG4gICAgICAgICAgICAgIHJlbW90ZWNhbmRpZGF0ZTogJ3JlbW90ZS1jYW5kaWRhdGUnXG4gICAgICAgICAgICB9W3JlcG9ydC50eXBlXSB8fCByZXBvcnQudHlwZVxuICAgICAgICAgIH07XG4gICAgICAgICAgcmVwb3J0Lm5hbWVzKCkuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgICAgICBzdGFuZGFyZFN0YXRzW25hbWVdID0gcmVwb3J0LnN0YXQobmFtZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgc3RhbmRhcmRSZXBvcnRbc3RhbmRhcmRTdGF0cy5pZF0gPSBzdGFuZGFyZFN0YXRzO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc3RhbmRhcmRSZXBvcnQ7XG4gICAgICB9O1xuXG4gICAgICAvLyBzaGltIGdldFN0YXRzIHdpdGggbWFwbGlrZSBzdXBwb3J0XG4gICAgICB2YXIgbWFrZU1hcFN0YXRzID0gZnVuY3Rpb24oc3RhdHMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNYXAoT2JqZWN0LmtleXMoc3RhdHMpLm1hcChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICByZXR1cm4gW2tleSwgc3RhdHNba2V5XV07XG4gICAgICAgIH0pKTtcbiAgICAgIH07XG5cbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID49IDIpIHtcbiAgICAgICAgdmFyIHN1Y2Nlc3NDYWxsYmFja1dyYXBwZXJfID0gZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICBhcmdzWzFdKG1ha2VNYXBTdGF0cyhmaXhDaHJvbWVTdGF0c18ocmVzcG9uc2UpKSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG9yaWdHZXRTdGF0cy5hcHBseSh0aGlzLCBbc3VjY2Vzc0NhbGxiYWNrV3JhcHBlcl8sXG4gICAgICAgICAgYXJndW1lbnRzWzBdXSk7XG4gICAgICB9XG5cbiAgICAgIC8vIHByb21pc2Utc3VwcG9ydFxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBvcmlnR2V0U3RhdHMuYXBwbHkocGMsIFtcbiAgICAgICAgICBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgcmVzb2x2ZShtYWtlTWFwU3RhdHMoZml4Q2hyb21lU3RhdHNfKHJlc3BvbnNlKSkpO1xuICAgICAgICAgIH0sIHJlamVjdF0pO1xuICAgICAgfSkudGhlbihzdWNjZXNzQ2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spO1xuICAgIH07XG5cbiAgICAvLyBhZGQgcHJvbWlzZSBzdXBwb3J0IC0tIG5hdGl2ZWx5IGF2YWlsYWJsZSBpbiBDaHJvbWUgNTFcbiAgICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDUxKSB7XG4gICAgICBbJ3NldExvY2FsRGVzY3JpcHRpb24nLCAnc2V0UmVtb3RlRGVzY3JpcHRpb24nLCAnYWRkSWNlQ2FuZGlkYXRlJ11cbiAgICAgICAgICAuZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgICAgICAgIHZhciBuYXRpdmVNZXRob2QgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF07XG4gICAgICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgICAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICAgICAgICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgbmF0aXZlTWV0aG9kLmFwcGx5KHBjLCBbYXJnc1swXSwgcmVzb2x2ZSwgcmVqZWN0XSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBhcmdzWzFdLmFwcGx5KG51bGwsIFtdKTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID49IDMpIHtcbiAgICAgICAgICAgICAgICAgIGFyZ3NbMl0uYXBwbHkobnVsbCwgW2Vycl0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIHByb21pc2Ugc3VwcG9ydCBmb3IgY3JlYXRlT2ZmZXIgYW5kIGNyZWF0ZUFuc3dlci4gQXZhaWxhYmxlICh3aXRob3V0XG4gICAgLy8gYnVncykgc2luY2UgTTUyOiBjcmJ1Zy82MTkyODlcbiAgICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDUyKSB7XG4gICAgICBbJ2NyZWF0ZU9mZmVyJywgJ2NyZWF0ZUFuc3dlciddLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgIHZhciBuYXRpdmVNZXRob2QgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF07XG4gICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAxIHx8IChhcmd1bWVudHMubGVuZ3RoID09PSAxICYmXG4gICAgICAgICAgICAgIHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdvYmplY3QnKSkge1xuICAgICAgICAgICAgdmFyIG9wdHMgPSBhcmd1bWVudHMubGVuZ3RoID09PSAxID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICBuYXRpdmVNZXRob2QuYXBwbHkocGMsIFtyZXNvbHZlLCByZWplY3QsIG9wdHNdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBzaGltIGltcGxpY2l0IGNyZWF0aW9uIG9mIFJUQ1Nlc3Npb25EZXNjcmlwdGlvbi9SVENJY2VDYW5kaWRhdGVcbiAgICBbJ3NldExvY2FsRGVzY3JpcHRpb24nLCAnc2V0UmVtb3RlRGVzY3JpcHRpb24nLCAnYWRkSWNlQ2FuZGlkYXRlJ11cbiAgICAgICAgLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgICAgdmFyIG5hdGl2ZU1ldGhvZCA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXTtcbiAgICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGFyZ3VtZW50c1swXSA9IG5ldyAoKG1ldGhvZCA9PT0gJ2FkZEljZUNhbmRpZGF0ZScpID9cbiAgICAgICAgICAgICAgICB3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlIDpcbiAgICAgICAgICAgICAgICB3aW5kb3cuUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKShhcmd1bWVudHNbMF0pO1xuICAgICAgICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgLy8gc3VwcG9ydCBmb3IgYWRkSWNlQ2FuZGlkYXRlKG51bGwgb3IgdW5kZWZpbmVkKVxuICAgIHZhciBuYXRpdmVBZGRJY2VDYW5kaWRhdGUgPVxuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZEljZUNhbmRpZGF0ZTtcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZEljZUNhbmRpZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCFhcmd1bWVudHNbMF0pIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50c1sxXSkge1xuICAgICAgICAgIGFyZ3VtZW50c1sxXS5hcHBseShudWxsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmF0aXZlQWRkSWNlQ2FuZGlkYXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfVxufTtcblxufSx7XCIuLi91dGlscy5qc1wiOjEzLFwiLi9nZXR1c2VybWVkaWFcIjo2fV0sNjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vKlxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxuICogIHRyZWUuXG4gKi9cbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cbid1c2Ugc3RyaWN0JztcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzLmpzJyk7XG52YXIgbG9nZ2luZyA9IHV0aWxzLmxvZztcblxuLy8gRXhwb3NlIHB1YmxpYyBtZXRob2RzLlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih3aW5kb3cpIHtcbiAgdmFyIGJyb3dzZXJEZXRhaWxzID0gdXRpbHMuZGV0ZWN0QnJvd3Nlcih3aW5kb3cpO1xuICB2YXIgbmF2aWdhdG9yID0gd2luZG93ICYmIHdpbmRvdy5uYXZpZ2F0b3I7XG5cbiAgdmFyIGNvbnN0cmFpbnRzVG9DaHJvbWVfID0gZnVuY3Rpb24oYykge1xuICAgIGlmICh0eXBlb2YgYyAhPT0gJ29iamVjdCcgfHwgYy5tYW5kYXRvcnkgfHwgYy5vcHRpb25hbCkge1xuICAgICAgcmV0dXJuIGM7XG4gICAgfVxuICAgIHZhciBjYyA9IHt9O1xuICAgIE9iamVjdC5rZXlzKGMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICBpZiAoa2V5ID09PSAncmVxdWlyZScgfHwga2V5ID09PSAnYWR2YW5jZWQnIHx8IGtleSA9PT0gJ21lZGlhU291cmNlJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgciA9ICh0eXBlb2YgY1trZXldID09PSAnb2JqZWN0JykgPyBjW2tleV0gOiB7aWRlYWw6IGNba2V5XX07XG4gICAgICBpZiAoci5leGFjdCAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiByLmV4YWN0ID09PSAnbnVtYmVyJykge1xuICAgICAgICByLm1pbiA9IHIubWF4ID0gci5leGFjdDtcbiAgICAgIH1cbiAgICAgIHZhciBvbGRuYW1lXyA9IGZ1bmN0aW9uKHByZWZpeCwgbmFtZSkge1xuICAgICAgICBpZiAocHJlZml4KSB7XG4gICAgICAgICAgcmV0dXJuIHByZWZpeCArIG5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBuYW1lLnNsaWNlKDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAobmFtZSA9PT0gJ2RldmljZUlkJykgPyAnc291cmNlSWQnIDogbmFtZTtcbiAgICAgIH07XG4gICAgICBpZiAoci5pZGVhbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNjLm9wdGlvbmFsID0gY2Mub3B0aW9uYWwgfHwgW107XG4gICAgICAgIHZhciBvYyA9IHt9O1xuICAgICAgICBpZiAodHlwZW9mIHIuaWRlYWwgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgb2Nbb2xkbmFtZV8oJ21pbicsIGtleSldID0gci5pZGVhbDtcbiAgICAgICAgICBjYy5vcHRpb25hbC5wdXNoKG9jKTtcbiAgICAgICAgICBvYyA9IHt9O1xuICAgICAgICAgIG9jW29sZG5hbWVfKCdtYXgnLCBrZXkpXSA9IHIuaWRlYWw7XG4gICAgICAgICAgY2Mub3B0aW9uYWwucHVzaChvYyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2Nbb2xkbmFtZV8oJycsIGtleSldID0gci5pZGVhbDtcbiAgICAgICAgICBjYy5vcHRpb25hbC5wdXNoKG9jKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHIuZXhhY3QgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygci5leGFjdCAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgY2MubWFuZGF0b3J5ID0gY2MubWFuZGF0b3J5IHx8IHt9O1xuICAgICAgICBjYy5tYW5kYXRvcnlbb2xkbmFtZV8oJycsIGtleSldID0gci5leGFjdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFsnbWluJywgJ21heCddLmZvckVhY2goZnVuY3Rpb24obWl4KSB7XG4gICAgICAgICAgaWYgKHJbbWl4XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjYy5tYW5kYXRvcnkgPSBjYy5tYW5kYXRvcnkgfHwge307XG4gICAgICAgICAgICBjYy5tYW5kYXRvcnlbb2xkbmFtZV8obWl4LCBrZXkpXSA9IHJbbWl4XTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChjLmFkdmFuY2VkKSB7XG4gICAgICBjYy5vcHRpb25hbCA9IChjYy5vcHRpb25hbCB8fCBbXSkuY29uY2F0KGMuYWR2YW5jZWQpO1xuICAgIH1cbiAgICByZXR1cm4gY2M7XG4gIH07XG5cbiAgdmFyIHNoaW1Db25zdHJhaW50c18gPSBmdW5jdGlvbihjb25zdHJhaW50cywgZnVuYykge1xuICAgIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uID49IDYxKSB7XG4gICAgICByZXR1cm4gZnVuYyhjb25zdHJhaW50cyk7XG4gICAgfVxuICAgIGNvbnN0cmFpbnRzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShjb25zdHJhaW50cykpO1xuICAgIGlmIChjb25zdHJhaW50cyAmJiB0eXBlb2YgY29uc3RyYWludHMuYXVkaW8gPT09ICdvYmplY3QnKSB7XG4gICAgICB2YXIgcmVtYXAgPSBmdW5jdGlvbihvYmosIGEsIGIpIHtcbiAgICAgICAgaWYgKGEgaW4gb2JqICYmICEoYiBpbiBvYmopKSB7XG4gICAgICAgICAgb2JqW2JdID0gb2JqW2FdO1xuICAgICAgICAgIGRlbGV0ZSBvYmpbYV07XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBjb25zdHJhaW50cyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoY29uc3RyYWludHMpKTtcbiAgICAgIHJlbWFwKGNvbnN0cmFpbnRzLmF1ZGlvLCAnYXV0b0dhaW5Db250cm9sJywgJ2dvb2dBdXRvR2FpbkNvbnRyb2wnKTtcbiAgICAgIHJlbWFwKGNvbnN0cmFpbnRzLmF1ZGlvLCAnbm9pc2VTdXBwcmVzc2lvbicsICdnb29nTm9pc2VTdXBwcmVzc2lvbicpO1xuICAgICAgY29uc3RyYWludHMuYXVkaW8gPSBjb25zdHJhaW50c1RvQ2hyb21lXyhjb25zdHJhaW50cy5hdWRpbyk7XG4gICAgfVxuICAgIGlmIChjb25zdHJhaW50cyAmJiB0eXBlb2YgY29uc3RyYWludHMudmlkZW8gPT09ICdvYmplY3QnKSB7XG4gICAgICAvLyBTaGltIGZhY2luZ01vZGUgZm9yIG1vYmlsZSAmIHN1cmZhY2UgcHJvLlxuICAgICAgdmFyIGZhY2UgPSBjb25zdHJhaW50cy52aWRlby5mYWNpbmdNb2RlO1xuICAgICAgZmFjZSA9IGZhY2UgJiYgKCh0eXBlb2YgZmFjZSA9PT0gJ29iamVjdCcpID8gZmFjZSA6IHtpZGVhbDogZmFjZX0pO1xuICAgICAgdmFyIGdldFN1cHBvcnRlZEZhY2luZ01vZGVMaWVzID0gYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDY2O1xuXG4gICAgICBpZiAoKGZhY2UgJiYgKGZhY2UuZXhhY3QgPT09ICd1c2VyJyB8fCBmYWNlLmV4YWN0ID09PSAnZW52aXJvbm1lbnQnIHx8XG4gICAgICAgICAgICAgICAgICAgIGZhY2UuaWRlYWwgPT09ICd1c2VyJyB8fCBmYWNlLmlkZWFsID09PSAnZW52aXJvbm1lbnQnKSkgJiZcbiAgICAgICAgICAhKG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0U3VwcG9ydGVkQ29uc3RyYWludHMgJiZcbiAgICAgICAgICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0U3VwcG9ydGVkQ29uc3RyYWludHMoKS5mYWNpbmdNb2RlICYmXG4gICAgICAgICAgICAhZ2V0U3VwcG9ydGVkRmFjaW5nTW9kZUxpZXMpKSB7XG4gICAgICAgIGRlbGV0ZSBjb25zdHJhaW50cy52aWRlby5mYWNpbmdNb2RlO1xuICAgICAgICB2YXIgbWF0Y2hlcztcbiAgICAgICAgaWYgKGZhY2UuZXhhY3QgPT09ICdlbnZpcm9ubWVudCcgfHwgZmFjZS5pZGVhbCA9PT0gJ2Vudmlyb25tZW50Jykge1xuICAgICAgICAgIG1hdGNoZXMgPSBbJ2JhY2snLCAncmVhciddO1xuICAgICAgICB9IGVsc2UgaWYgKGZhY2UuZXhhY3QgPT09ICd1c2VyJyB8fCBmYWNlLmlkZWFsID09PSAndXNlcicpIHtcbiAgICAgICAgICBtYXRjaGVzID0gWydmcm9udCddO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAgICAgLy8gTG9vayBmb3IgbWF0Y2hlcyBpbiBsYWJlbCwgb3IgdXNlIGxhc3QgY2FtIGZvciBiYWNrICh0eXBpY2FsKS5cbiAgICAgICAgICByZXR1cm4gbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzKClcbiAgICAgICAgICAudGhlbihmdW5jdGlvbihkZXZpY2VzKSB7XG4gICAgICAgICAgICBkZXZpY2VzID0gZGV2aWNlcy5maWx0ZXIoZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICByZXR1cm4gZC5raW5kID09PSAndmlkZW9pbnB1dCc7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBkZXYgPSBkZXZpY2VzLmZpbmQoZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICByZXR1cm4gbWF0Y2hlcy5zb21lKGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQubGFiZWwudG9Mb3dlckNhc2UoKS5pbmRleE9mKG1hdGNoKSAhPT0gLTE7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIWRldiAmJiBkZXZpY2VzLmxlbmd0aCAmJiBtYXRjaGVzLmluZGV4T2YoJ2JhY2snKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgZGV2ID0gZGV2aWNlc1tkZXZpY2VzLmxlbmd0aCAtIDFdOyAvLyBtb3JlIGxpa2VseSB0aGUgYmFjayBjYW1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkZXYpIHtcbiAgICAgICAgICAgICAgY29uc3RyYWludHMudmlkZW8uZGV2aWNlSWQgPSBmYWNlLmV4YWN0ID8ge2V4YWN0OiBkZXYuZGV2aWNlSWR9IDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2lkZWFsOiBkZXYuZGV2aWNlSWR9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3RyYWludHMudmlkZW8gPSBjb25zdHJhaW50c1RvQ2hyb21lXyhjb25zdHJhaW50cy52aWRlbyk7XG4gICAgICAgICAgICBsb2dnaW5nKCdjaHJvbWU6ICcgKyBKU09OLnN0cmluZ2lmeShjb25zdHJhaW50cykpO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmMoY29uc3RyYWludHMpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdHJhaW50cy52aWRlbyA9IGNvbnN0cmFpbnRzVG9DaHJvbWVfKGNvbnN0cmFpbnRzLnZpZGVvKTtcbiAgICB9XG4gICAgbG9nZ2luZygnY2hyb21lOiAnICsgSlNPTi5zdHJpbmdpZnkoY29uc3RyYWludHMpKTtcbiAgICByZXR1cm4gZnVuYyhjb25zdHJhaW50cyk7XG4gIH07XG5cbiAgdmFyIHNoaW1FcnJvcl8gPSBmdW5jdGlvbihlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgUGVybWlzc2lvbkRlbmllZEVycm9yOiAnTm90QWxsb3dlZEVycm9yJyxcbiAgICAgICAgUGVybWlzc2lvbkRpc21pc3NlZEVycm9yOiAnTm90QWxsb3dlZEVycm9yJyxcbiAgICAgICAgSW52YWxpZFN0YXRlRXJyb3I6ICdOb3RBbGxvd2VkRXJyb3InLFxuICAgICAgICBEZXZpY2VzTm90Rm91bmRFcnJvcjogJ05vdEZvdW5kRXJyb3InLFxuICAgICAgICBDb25zdHJhaW50Tm90U2F0aXNmaWVkRXJyb3I6ICdPdmVyY29uc3RyYWluZWRFcnJvcicsXG4gICAgICAgIFRyYWNrU3RhcnRFcnJvcjogJ05vdFJlYWRhYmxlRXJyb3InLFxuICAgICAgICBNZWRpYURldmljZUZhaWxlZER1ZVRvU2h1dGRvd246ICdOb3RBbGxvd2VkRXJyb3InLFxuICAgICAgICBNZWRpYURldmljZUtpbGxTd2l0Y2hPbjogJ05vdEFsbG93ZWRFcnJvcicsXG4gICAgICAgIFRhYkNhcHR1cmVFcnJvcjogJ0Fib3J0RXJyb3InLFxuICAgICAgICBTY3JlZW5DYXB0dXJlRXJyb3I6ICdBYm9ydEVycm9yJyxcbiAgICAgICAgRGV2aWNlQ2FwdHVyZUVycm9yOiAnQWJvcnRFcnJvcidcbiAgICAgIH1bZS5uYW1lXSB8fCBlLm5hbWUsXG4gICAgICBtZXNzYWdlOiBlLm1lc3NhZ2UsXG4gICAgICBjb25zdHJhaW50OiBlLmNvbnN0cmFpbnROYW1lLFxuICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lICsgKHRoaXMubWVzc2FnZSAmJiAnOiAnKSArIHRoaXMubWVzc2FnZTtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xuXG4gIHZhciBnZXRVc2VyTWVkaWFfID0gZnVuY3Rpb24oY29uc3RyYWludHMsIG9uU3VjY2Vzcywgb25FcnJvcikge1xuICAgIHNoaW1Db25zdHJhaW50c18oY29uc3RyYWludHMsIGZ1bmN0aW9uKGMpIHtcbiAgICAgIG5hdmlnYXRvci53ZWJraXRHZXRVc2VyTWVkaWEoYywgb25TdWNjZXNzLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChvbkVycm9yKSB7XG4gICAgICAgICAgb25FcnJvcihzaGltRXJyb3JfKGUpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgbmF2aWdhdG9yLmdldFVzZXJNZWRpYSA9IGdldFVzZXJNZWRpYV87XG5cbiAgLy8gUmV0dXJucyB0aGUgcmVzdWx0IG9mIGdldFVzZXJNZWRpYSBhcyBhIFByb21pc2UuXG4gIHZhciBnZXRVc2VyTWVkaWFQcm9taXNlXyA9IGZ1bmN0aW9uKGNvbnN0cmFpbnRzKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgbmF2aWdhdG9yLmdldFVzZXJNZWRpYShjb25zdHJhaW50cywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICB9KTtcbiAgfTtcblxuICBpZiAoIW5hdmlnYXRvci5tZWRpYURldmljZXMpIHtcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzID0ge1xuICAgICAgZ2V0VXNlck1lZGlhOiBnZXRVc2VyTWVkaWFQcm9taXNlXyxcbiAgICAgIGVudW1lcmF0ZURldmljZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuICAgICAgICAgIHZhciBraW5kcyA9IHthdWRpbzogJ2F1ZGlvaW5wdXQnLCB2aWRlbzogJ3ZpZGVvaW5wdXQnfTtcbiAgICAgICAgICByZXR1cm4gd2luZG93Lk1lZGlhU3RyZWFtVHJhY2suZ2V0U291cmNlcyhmdW5jdGlvbihkZXZpY2VzKSB7XG4gICAgICAgICAgICByZXNvbHZlKGRldmljZXMubWFwKGZ1bmN0aW9uKGRldmljZSkge1xuICAgICAgICAgICAgICByZXR1cm4ge2xhYmVsOiBkZXZpY2UubGFiZWwsXG4gICAgICAgICAgICAgICAga2luZDoga2luZHNbZGV2aWNlLmtpbmRdLFxuICAgICAgICAgICAgICAgIGRldmljZUlkOiBkZXZpY2UuaWQsXG4gICAgICAgICAgICAgICAgZ3JvdXBJZDogJyd9O1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBnZXRTdXBwb3J0ZWRDb25zdHJhaW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgZGV2aWNlSWQ6IHRydWUsIGVjaG9DYW5jZWxsYXRpb246IHRydWUsIGZhY2luZ01vZGU6IHRydWUsXG4gICAgICAgICAgZnJhbWVSYXRlOiB0cnVlLCBoZWlnaHQ6IHRydWUsIHdpZHRoOiB0cnVlXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIEEgc2hpbSBmb3IgZ2V0VXNlck1lZGlhIG1ldGhvZCBvbiB0aGUgbWVkaWFEZXZpY2VzIG9iamVjdC5cbiAgLy8gVE9ETyhLYXB0ZW5KYW5zc29uKSByZW1vdmUgb25jZSBpbXBsZW1lbnRlZCBpbiBDaHJvbWUgc3RhYmxlLlxuICBpZiAoIW5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKSB7XG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEgPSBmdW5jdGlvbihjb25zdHJhaW50cykge1xuICAgICAgcmV0dXJuIGdldFVzZXJNZWRpYVByb21pc2VfKGNvbnN0cmFpbnRzKTtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIC8vIEV2ZW4gdGhvdWdoIENocm9tZSA0NSBoYXMgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcyBhbmQgYSBnZXRVc2VyTWVkaWFcbiAgICAvLyBmdW5jdGlvbiB3aGljaCByZXR1cm5zIGEgUHJvbWlzZSwgaXQgZG9lcyBub3QgYWNjZXB0IHNwZWMtc3R5bGVcbiAgICAvLyBjb25zdHJhaW50cy5cbiAgICB2YXIgb3JpZ0dldFVzZXJNZWRpYSA9IG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhLlxuICAgICAgICBiaW5kKG5hdmlnYXRvci5tZWRpYURldmljZXMpO1xuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhID0gZnVuY3Rpb24oY3MpIHtcbiAgICAgIHJldHVybiBzaGltQ29uc3RyYWludHNfKGNzLCBmdW5jdGlvbihjKSB7XG4gICAgICAgIHJldHVybiBvcmlnR2V0VXNlck1lZGlhKGMpLnRoZW4oZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICAgICAgaWYgKGMuYXVkaW8gJiYgIXN0cmVhbS5nZXRBdWRpb1RyYWNrcygpLmxlbmd0aCB8fFxuICAgICAgICAgICAgICBjLnZpZGVvICYmICFzdHJlYW0uZ2V0VmlkZW9UcmFja3MoKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XG4gICAgICAgICAgICAgIHRyYWNrLnN0b3AoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbignJywgJ05vdEZvdW5kRXJyb3InKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHN0cmVhbTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChzaGltRXJyb3JfKGUpKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG5cbiAgLy8gRHVtbXkgZGV2aWNlY2hhbmdlIGV2ZW50IG1ldGhvZHMuXG4gIC8vIFRPRE8oS2FwdGVuSmFuc3NvbikgcmVtb3ZlIG9uY2UgaW1wbGVtZW50ZWQgaW4gQ2hyb21lIHN0YWJsZS5cbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmFkZEV2ZW50TGlzdGVuZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICBsb2dnaW5nKCdEdW1teSBtZWRpYURldmljZXMuYWRkRXZlbnRMaXN0ZW5lciBjYWxsZWQuJyk7XG4gICAgfTtcbiAgfVxuICBpZiAodHlwZW9mIG5hdmlnYXRvci5tZWRpYURldmljZXMucmVtb3ZlRXZlbnRMaXN0ZW5lciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIGxvZ2dpbmcoJ0R1bW15IG1lZGlhRGV2aWNlcy5yZW1vdmVFdmVudExpc3RlbmVyIGNhbGxlZC4nKTtcbiAgICB9O1xuICB9XG59O1xuXG59LHtcIi4uL3V0aWxzLmpzXCI6MTN9XSw3OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8qXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE3IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXG4gKiAgdHJlZS5cbiAqL1xuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgU0RQVXRpbHMgPSByZXF1aXJlKCdzZHAnKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNoaW1SVENJY2VDYW5kaWRhdGU6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIC8vIGZvdW5kYXRpb24gaXMgYXJiaXRyYXJpbHkgY2hvc2VuIGFzIGFuIGluZGljYXRvciBmb3IgZnVsbCBzdXBwb3J0IGZvclxuICAgIC8vIGh0dHBzOi8vdzNjLmdpdGh1Yi5pby93ZWJydGMtcGMvI3J0Y2ljZWNhbmRpZGF0ZS1pbnRlcmZhY2VcbiAgICBpZiAoIXdpbmRvdy5SVENJY2VDYW5kaWRhdGUgfHwgKHdpbmRvdy5SVENJY2VDYW5kaWRhdGUgJiYgJ2ZvdW5kYXRpb24nIGluXG4gICAgICAgIHdpbmRvdy5SVENJY2VDYW5kaWRhdGUucHJvdG90eXBlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBOYXRpdmVSVENJY2VDYW5kaWRhdGUgPSB3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlO1xuICAgIHdpbmRvdy5SVENJY2VDYW5kaWRhdGUgPSBmdW5jdGlvbihhcmdzKSB7XG4gICAgICAvLyBSZW1vdmUgdGhlIGE9IHdoaWNoIHNob3VsZG4ndCBiZSBwYXJ0IG9mIHRoZSBjYW5kaWRhdGUgc3RyaW5nLlxuICAgICAgaWYgKHR5cGVvZiBhcmdzID09PSAnb2JqZWN0JyAmJiBhcmdzLmNhbmRpZGF0ZSAmJlxuICAgICAgICAgIGFyZ3MuY2FuZGlkYXRlLmluZGV4T2YoJ2E9JykgPT09IDApIHtcbiAgICAgICAgYXJncyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYXJncykpO1xuICAgICAgICBhcmdzLmNhbmRpZGF0ZSA9IGFyZ3MuY2FuZGlkYXRlLnN1YnN0cigyKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGFyZ3MuY2FuZGlkYXRlICYmIGFyZ3MuY2FuZGlkYXRlLmxlbmd0aCkge1xuICAgICAgICAvLyBBdWdtZW50IHRoZSBuYXRpdmUgY2FuZGlkYXRlIHdpdGggdGhlIHBhcnNlZCBmaWVsZHMuXG4gICAgICAgIHZhciBuYXRpdmVDYW5kaWRhdGUgPSBuZXcgTmF0aXZlUlRDSWNlQ2FuZGlkYXRlKGFyZ3MpO1xuICAgICAgICB2YXIgcGFyc2VkQ2FuZGlkYXRlID0gU0RQVXRpbHMucGFyc2VDYW5kaWRhdGUoYXJncy5jYW5kaWRhdGUpO1xuICAgICAgICB2YXIgYXVnbWVudGVkQ2FuZGlkYXRlID0gT2JqZWN0LmFzc2lnbihuYXRpdmVDYW5kaWRhdGUsXG4gICAgICAgICAgICBwYXJzZWRDYW5kaWRhdGUpO1xuXG4gICAgICAgIC8vIEFkZCBhIHNlcmlhbGl6ZXIgdGhhdCBkb2VzIG5vdCBzZXJpYWxpemUgdGhlIGV4dHJhIGF0dHJpYnV0ZXMuXG4gICAgICAgIGF1Z21lbnRlZENhbmRpZGF0ZS50b0pTT04gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY2FuZGlkYXRlOiBhdWdtZW50ZWRDYW5kaWRhdGUuY2FuZGlkYXRlLFxuICAgICAgICAgICAgc2RwTWlkOiBhdWdtZW50ZWRDYW5kaWRhdGUuc2RwTWlkLFxuICAgICAgICAgICAgc2RwTUxpbmVJbmRleDogYXVnbWVudGVkQ2FuZGlkYXRlLnNkcE1MaW5lSW5kZXgsXG4gICAgICAgICAgICB1c2VybmFtZUZyYWdtZW50OiBhdWdtZW50ZWRDYW5kaWRhdGUudXNlcm5hbWVGcmFnbWVudCxcbiAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYXVnbWVudGVkQ2FuZGlkYXRlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBOYXRpdmVSVENJY2VDYW5kaWRhdGUoYXJncyk7XG4gICAgfTtcbiAgICB3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlLnByb3RvdHlwZSA9IE5hdGl2ZVJUQ0ljZUNhbmRpZGF0ZS5wcm90b3R5cGU7XG5cbiAgICAvLyBIb29rIHVwIHRoZSBhdWdtZW50ZWQgY2FuZGlkYXRlIGluIG9uaWNlY2FuZGlkYXRlIGFuZFxuICAgIC8vIGFkZEV2ZW50TGlzdGVuZXIoJ2ljZWNhbmRpZGF0ZScsIC4uLilcbiAgICB1dGlscy53cmFwUGVlckNvbm5lY3Rpb25FdmVudCh3aW5kb3csICdpY2VjYW5kaWRhdGUnLCBmdW5jdGlvbihlKSB7XG4gICAgICBpZiAoZS5jYW5kaWRhdGUpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsICdjYW5kaWRhdGUnLCB7XG4gICAgICAgICAgdmFsdWU6IG5ldyB3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlKGUuY2FuZGlkYXRlKSxcbiAgICAgICAgICB3cml0YWJsZTogJ2ZhbHNlJ1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBlO1xuICAgIH0pO1xuICB9LFxuXG4gIC8vIHNoaW1DcmVhdGVPYmplY3RVUkwgbXVzdCBiZSBjYWxsZWQgYmVmb3JlIHNoaW1Tb3VyY2VPYmplY3QgdG8gYXZvaWQgbG9vcC5cblxuICBzaGltQ3JlYXRlT2JqZWN0VVJMOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICB2YXIgVVJMID0gd2luZG93ICYmIHdpbmRvdy5VUkw7XG5cbiAgICBpZiAoISh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiB3aW5kb3cuSFRNTE1lZGlhRWxlbWVudCAmJlxuICAgICAgICAgICdzcmNPYmplY3QnIGluIHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50LnByb3RvdHlwZSAmJlxuICAgICAgICBVUkwuY3JlYXRlT2JqZWN0VVJMICYmIFVSTC5yZXZva2VPYmplY3RVUkwpKSB7XG4gICAgICAvLyBPbmx5IHNoaW0gQ3JlYXRlT2JqZWN0VVJMIHVzaW5nIHNyY09iamVjdCBpZiBzcmNPYmplY3QgZXhpc3RzLlxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICB2YXIgbmF0aXZlQ3JlYXRlT2JqZWN0VVJMID0gVVJMLmNyZWF0ZU9iamVjdFVSTC5iaW5kKFVSTCk7XG4gICAgdmFyIG5hdGl2ZVJldm9rZU9iamVjdFVSTCA9IFVSTC5yZXZva2VPYmplY3RVUkwuYmluZChVUkwpO1xuICAgIHZhciBzdHJlYW1zID0gbmV3IE1hcCgpLCBuZXdJZCA9IDA7XG5cbiAgICBVUkwuY3JlYXRlT2JqZWN0VVJMID0gZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICBpZiAoJ2dldFRyYWNrcycgaW4gc3RyZWFtKSB7XG4gICAgICAgIHZhciB1cmwgPSAncG9seWJsb2I6JyArICgrK25ld0lkKTtcbiAgICAgICAgc3RyZWFtcy5zZXQodXJsLCBzdHJlYW0pO1xuICAgICAgICB1dGlscy5kZXByZWNhdGVkKCdVUkwuY3JlYXRlT2JqZWN0VVJMKHN0cmVhbSknLFxuICAgICAgICAgICAgJ2VsZW0uc3JjT2JqZWN0ID0gc3RyZWFtJyk7XG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmF0aXZlQ3JlYXRlT2JqZWN0VVJMKHN0cmVhbSk7XG4gICAgfTtcbiAgICBVUkwucmV2b2tlT2JqZWN0VVJMID0gZnVuY3Rpb24odXJsKSB7XG4gICAgICBuYXRpdmVSZXZva2VPYmplY3RVUkwodXJsKTtcbiAgICAgIHN0cmVhbXMuZGVsZXRlKHVybCk7XG4gICAgfTtcblxuICAgIHZhciBkc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50LnByb3RvdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc3JjJyk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50LnByb3RvdHlwZSwgJ3NyYycsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBkc2MuZ2V0LmFwcGx5KHRoaXMpO1xuICAgICAgfSxcbiAgICAgIHNldDogZnVuY3Rpb24odXJsKSB7XG4gICAgICAgIHRoaXMuc3JjT2JqZWN0ID0gc3RyZWFtcy5nZXQodXJsKSB8fCBudWxsO1xuICAgICAgICByZXR1cm4gZHNjLnNldC5hcHBseSh0aGlzLCBbdXJsXSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB2YXIgbmF0aXZlU2V0QXR0cmlidXRlID0gd2luZG93LkhUTUxNZWRpYUVsZW1lbnQucHJvdG90eXBlLnNldEF0dHJpYnV0ZTtcbiAgICB3aW5kb3cuSFRNTE1lZGlhRWxlbWVudC5wcm90b3R5cGUuc2V0QXR0cmlidXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMiAmJlxuICAgICAgICAgICgnJyArIGFyZ3VtZW50c1swXSkudG9Mb3dlckNhc2UoKSA9PT0gJ3NyYycpIHtcbiAgICAgICAgdGhpcy5zcmNPYmplY3QgPSBzdHJlYW1zLmdldChhcmd1bWVudHNbMV0pIHx8IG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmF0aXZlU2V0QXR0cmlidXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfSxcblxuICBzaGltTWF4TWVzc2FnZVNpemU6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIGlmICh3aW5kb3cuUlRDU2N0cFRyYW5zcG9ydCB8fCAhd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBicm93c2VyRGV0YWlscyA9IHV0aWxzLmRldGVjdEJyb3dzZXIod2luZG93KTtcblxuICAgIGlmICghKCdzY3RwJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUsICdzY3RwJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB0eXBlb2YgdGhpcy5fc2N0cCA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogdGhpcy5fc2N0cDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIHNjdHBJbkRlc2NyaXB0aW9uID0gZnVuY3Rpb24oZGVzY3JpcHRpb24pIHtcbiAgICAgIHZhciBzZWN0aW9ucyA9IFNEUFV0aWxzLnNwbGl0U2VjdGlvbnMoZGVzY3JpcHRpb24uc2RwKTtcbiAgICAgIHNlY3Rpb25zLnNoaWZ0KCk7XG4gICAgICByZXR1cm4gc2VjdGlvbnMuc29tZShmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcbiAgICAgICAgdmFyIG1MaW5lID0gU0RQVXRpbHMucGFyc2VNTGluZShtZWRpYVNlY3Rpb24pO1xuICAgICAgICByZXR1cm4gbUxpbmUgJiYgbUxpbmUua2luZCA9PT0gJ2FwcGxpY2F0aW9uJ1xuICAgICAgICAgICAgJiYgbUxpbmUucHJvdG9jb2wuaW5kZXhPZignU0NUUCcpICE9PSAtMTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgZ2V0UmVtb3RlRmlyZWZveFZlcnNpb24gPSBmdW5jdGlvbihkZXNjcmlwdGlvbikge1xuICAgICAgLy8gVE9ETzogSXMgdGhlcmUgYSBiZXR0ZXIgc29sdXRpb24gZm9yIGRldGVjdGluZyBGaXJlZm94P1xuICAgICAgdmFyIG1hdGNoID0gZGVzY3JpcHRpb24uc2RwLm1hdGNoKC9tb3ppbGxhLi4uVEhJU19JU19TRFBBUlRBLShcXGQrKS8pO1xuICAgICAgaWYgKG1hdGNoID09PSBudWxsIHx8IG1hdGNoLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgfVxuICAgICAgdmFyIHZlcnNpb24gPSBwYXJzZUludChtYXRjaFsxXSwgMTApO1xuICAgICAgLy8gVGVzdCBmb3IgTmFOICh5ZXMsIHRoaXMgaXMgdWdseSlcbiAgICAgIHJldHVybiB2ZXJzaW9uICE9PSB2ZXJzaW9uID8gLTEgOiB2ZXJzaW9uO1xuICAgIH07XG5cbiAgICB2YXIgZ2V0Q2FuU2VuZE1heE1lc3NhZ2VTaXplID0gZnVuY3Rpb24ocmVtb3RlSXNGaXJlZm94KSB7XG4gICAgICAvLyBFdmVyeSBpbXBsZW1lbnRhdGlvbiB3ZSBrbm93IGNhbiBzZW5kIGF0IGxlYXN0IDY0IEtpQi5cbiAgICAgIC8vIE5vdGU6IEFsdGhvdWdoIENocm9tZSBpcyB0ZWNobmljYWxseSBhYmxlIHRvIHNlbmQgdXAgdG8gMjU2IEtpQiwgdGhlXG4gICAgICAvLyAgICAgICBkYXRhIGRvZXMgbm90IHJlYWNoIHRoZSBvdGhlciBwZWVyIHJlbGlhYmx5LlxuICAgICAgLy8gICAgICAgU2VlOiBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3Avd2VicnRjL2lzc3Vlcy9kZXRhaWw/aWQ9ODQxOVxuICAgICAgdmFyIGNhblNlbmRNYXhNZXNzYWdlU2l6ZSA9IDY1NTM2O1xuICAgICAgaWYgKGJyb3dzZXJEZXRhaWxzLmJyb3dzZXIgPT09ICdmaXJlZm94Jykge1xuICAgICAgICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDU3KSB7XG4gICAgICAgICAgaWYgKHJlbW90ZUlzRmlyZWZveCA9PT0gLTEpIHtcbiAgICAgICAgICAgIC8vIEZGIDwgNTcgd2lsbCBzZW5kIGluIDE2IEtpQiBjaHVua3MgdXNpbmcgdGhlIGRlcHJlY2F0ZWQgUFBJRFxuICAgICAgICAgICAgLy8gZnJhZ21lbnRhdGlvbi5cbiAgICAgICAgICAgIGNhblNlbmRNYXhNZXNzYWdlU2l6ZSA9IDE2Mzg0O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBIb3dldmVyLCBvdGhlciBGRiAoYW5kIFJBV1JUQykgY2FuIHJlYXNzZW1ibGUgUFBJRC1mcmFnbWVudGVkXG4gICAgICAgICAgICAvLyBtZXNzYWdlcy4gVGh1cywgc3VwcG9ydGluZyB+MiBHaUIgd2hlbiBzZW5kaW5nLlxuICAgICAgICAgICAgY2FuU2VuZE1heE1lc3NhZ2VTaXplID0gMjE0NzQ4MzYzNztcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gQ3VycmVudGx5LCBhbGwgRkYgPj0gNTcgd2lsbCByZXNldCB0aGUgcmVtb3RlIG1heGltdW0gbWVzc2FnZSBzaXplXG4gICAgICAgICAgLy8gdG8gdGhlIGRlZmF1bHQgdmFsdWUgd2hlbiBhIGRhdGEgY2hhbm5lbCBpcyBjcmVhdGVkIGF0IGEgbGF0ZXJcbiAgICAgICAgICAvLyBzdGFnZS4gOihcbiAgICAgICAgICAvLyBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTE0MjY4MzFcbiAgICAgICAgICBjYW5TZW5kTWF4TWVzc2FnZVNpemUgPVxuICAgICAgICAgICAgYnJvd3NlckRldGFpbHMudmVyc2lvbiA9PT0gNTcgPyA2NTUzNSA6IDY1NTM2O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gY2FuU2VuZE1heE1lc3NhZ2VTaXplO1xuICAgIH07XG5cbiAgICB2YXIgZ2V0TWF4TWVzc2FnZVNpemUgPSBmdW5jdGlvbihkZXNjcmlwdGlvbiwgcmVtb3RlSXNGaXJlZm94KSB7XG4gICAgICAvLyBOb3RlOiA2NTUzNiBieXRlcyBpcyB0aGUgZGVmYXVsdCB2YWx1ZSBmcm9tIHRoZSBTRFAgc3BlYy4gQWxzbyxcbiAgICAgIC8vICAgICAgIGV2ZXJ5IGltcGxlbWVudGF0aW9uIHdlIGtub3cgc3VwcG9ydHMgcmVjZWl2aW5nIDY1NTM2IGJ5dGVzLlxuICAgICAgdmFyIG1heE1lc3NhZ2VTaXplID0gNjU1MzY7XG5cbiAgICAgIC8vIEZGIDU3IGhhcyBhIHNsaWdodGx5IGluY29ycmVjdCBkZWZhdWx0IHJlbW90ZSBtYXggbWVzc2FnZSBzaXplLCBzb1xuICAgICAgLy8gd2UgbmVlZCB0byBhZGp1c3QgaXQgaGVyZSB0byBhdm9pZCBhIGZhaWx1cmUgd2hlbiBzZW5kaW5nLlxuICAgICAgLy8gU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xNDI1Njk3XG4gICAgICBpZiAoYnJvd3NlckRldGFpbHMuYnJvd3NlciA9PT0gJ2ZpcmVmb3gnXG4gICAgICAgICAgICYmIGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPT09IDU3KSB7XG4gICAgICAgIG1heE1lc3NhZ2VTaXplID0gNjU1MzU7XG4gICAgICB9XG5cbiAgICAgIHZhciBtYXRjaCA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KGRlc2NyaXB0aW9uLnNkcCwgJ2E9bWF4LW1lc3NhZ2Utc2l6ZTonKTtcbiAgICAgIGlmIChtYXRjaC5sZW5ndGggPiAwKSB7XG4gICAgICAgIG1heE1lc3NhZ2VTaXplID0gcGFyc2VJbnQobWF0Y2hbMF0uc3Vic3RyKDE5KSwgMTApO1xuICAgICAgfSBlbHNlIGlmIChicm93c2VyRGV0YWlscy5icm93c2VyID09PSAnZmlyZWZveCcgJiZcbiAgICAgICAgICAgICAgICAgIHJlbW90ZUlzRmlyZWZveCAhPT0gLTEpIHtcbiAgICAgICAgLy8gSWYgdGhlIG1heGltdW0gbWVzc2FnZSBzaXplIGlzIG5vdCBwcmVzZW50IGluIHRoZSByZW1vdGUgU0RQIGFuZFxuICAgICAgICAvLyBib3RoIGxvY2FsIGFuZCByZW1vdGUgYXJlIEZpcmVmb3gsIHRoZSByZW1vdGUgcGVlciBjYW4gcmVjZWl2ZVxuICAgICAgICAvLyB+MiBHaUIuXG4gICAgICAgIG1heE1lc3NhZ2VTaXplID0gMjE0NzQ4MzYzNztcbiAgICAgIH1cbiAgICAgIHJldHVybiBtYXhNZXNzYWdlU2l6ZTtcbiAgICB9O1xuXG4gICAgdmFyIG9yaWdTZXRSZW1vdGVEZXNjcmlwdGlvbiA9XG4gICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0UmVtb3RlRGVzY3JpcHRpb247XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5zZXRSZW1vdGVEZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgIHBjLl9zY3RwID0gbnVsbDtcblxuICAgICAgaWYgKHNjdHBJbkRlc2NyaXB0aW9uKGFyZ3VtZW50c1swXSkpIHtcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHJlbW90ZSBpcyBGRi5cbiAgICAgICAgdmFyIGlzRmlyZWZveCA9IGdldFJlbW90ZUZpcmVmb3hWZXJzaW9uKGFyZ3VtZW50c1swXSk7XG5cbiAgICAgICAgLy8gR2V0IHRoZSBtYXhpbXVtIG1lc3NhZ2Ugc2l6ZSB0aGUgbG9jYWwgcGVlciBpcyBjYXBhYmxlIG9mIHNlbmRpbmdcbiAgICAgICAgdmFyIGNhblNlbmRNTVMgPSBnZXRDYW5TZW5kTWF4TWVzc2FnZVNpemUoaXNGaXJlZm94KTtcblxuICAgICAgICAvLyBHZXQgdGhlIG1heGltdW0gbWVzc2FnZSBzaXplIG9mIHRoZSByZW1vdGUgcGVlci5cbiAgICAgICAgdmFyIHJlbW90ZU1NUyA9IGdldE1heE1lc3NhZ2VTaXplKGFyZ3VtZW50c1swXSwgaXNGaXJlZm94KTtcblxuICAgICAgICAvLyBEZXRlcm1pbmUgZmluYWwgbWF4aW11bSBtZXNzYWdlIHNpemVcbiAgICAgICAgdmFyIG1heE1lc3NhZ2VTaXplO1xuICAgICAgICBpZiAoY2FuU2VuZE1NUyA9PT0gMCAmJiByZW1vdGVNTVMgPT09IDApIHtcbiAgICAgICAgICBtYXhNZXNzYWdlU2l6ZSA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcbiAgICAgICAgfSBlbHNlIGlmIChjYW5TZW5kTU1TID09PSAwIHx8IHJlbW90ZU1NUyA9PT0gMCkge1xuICAgICAgICAgIG1heE1lc3NhZ2VTaXplID0gTWF0aC5tYXgoY2FuU2VuZE1NUywgcmVtb3RlTU1TKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtYXhNZXNzYWdlU2l6ZSA9IE1hdGgubWluKGNhblNlbmRNTVMsIHJlbW90ZU1NUyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDcmVhdGUgYSBkdW1teSBSVENTY3RwVHJhbnNwb3J0IG9iamVjdCBhbmQgdGhlICdtYXhNZXNzYWdlU2l6ZSdcbiAgICAgICAgLy8gYXR0cmlidXRlLlxuICAgICAgICB2YXIgc2N0cCA9IHt9O1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2N0cCwgJ21heE1lc3NhZ2VTaXplJywge1xuICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gbWF4TWVzc2FnZVNpemU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcGMuX3NjdHAgPSBzY3RwO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gb3JpZ1NldFJlbW90ZURlc2NyaXB0aW9uLmFwcGx5KHBjLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH0sXG5cbiAgc2hpbVNlbmRUaHJvd1R5cGVFcnJvcjogZnVuY3Rpb24od2luZG93KSB7XG4gICAgaWYgKCEod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uICYmXG4gICAgICAgICdjcmVhdGVEYXRhQ2hhbm5lbCcgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBOb3RlOiBBbHRob3VnaCBGaXJlZm94ID49IDU3IGhhcyBhIG5hdGl2ZSBpbXBsZW1lbnRhdGlvbiwgdGhlIG1heGltdW1cbiAgICAvLyAgICAgICBtZXNzYWdlIHNpemUgY2FuIGJlIHJlc2V0IGZvciBhbGwgZGF0YSBjaGFubmVscyBhdCBhIGxhdGVyIHN0YWdlLlxuICAgIC8vICAgICAgIFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTQyNjgzMVxuXG4gICAgdmFyIG9yaWdDcmVhdGVEYXRhQ2hhbm5lbCA9XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmNyZWF0ZURhdGFDaGFubmVsO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlRGF0YUNoYW5uZWwgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICB2YXIgZGF0YUNoYW5uZWwgPSBvcmlnQ3JlYXRlRGF0YUNoYW5uZWwuYXBwbHkocGMsIGFyZ3VtZW50cyk7XG4gICAgICB2YXIgb3JpZ0RhdGFDaGFubmVsU2VuZCA9IGRhdGFDaGFubmVsLnNlbmQ7XG5cbiAgICAgIC8vIFBhdGNoICdzZW5kJyBtZXRob2RcbiAgICAgIGRhdGFDaGFubmVsLnNlbmQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRjID0gdGhpcztcbiAgICAgICAgdmFyIGRhdGEgPSBhcmd1bWVudHNbMF07XG4gICAgICAgIHZhciBsZW5ndGggPSBkYXRhLmxlbmd0aCB8fCBkYXRhLnNpemUgfHwgZGF0YS5ieXRlTGVuZ3RoO1xuICAgICAgICBpZiAobGVuZ3RoID4gcGMuc2N0cC5tYXhNZXNzYWdlU2l6ZSkge1xuICAgICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oJ01lc3NhZ2UgdG9vIGxhcmdlIChjYW4gc2VuZCBhIG1heGltdW0gb2YgJyArXG4gICAgICAgICAgICBwYy5zY3RwLm1heE1lc3NhZ2VTaXplICsgJyBieXRlcyknLCAnVHlwZUVycm9yJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9yaWdEYXRhQ2hhbm5lbFNlbmQuYXBwbHkoZGMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gZGF0YUNoYW5uZWw7XG4gICAgfTtcbiAgfVxufTtcblxufSx7XCIuL3V0aWxzXCI6MTMsXCJzZHBcIjoyfV0sODpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vKlxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxuICogIHRyZWUuXG4gKi9cbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcbnZhciBzaGltUlRDUGVlckNvbm5lY3Rpb24gPSByZXF1aXJlKCdydGNwZWVyY29ubmVjdGlvbi1zaGltJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzaGltR2V0VXNlck1lZGlhOiByZXF1aXJlKCcuL2dldHVzZXJtZWRpYScpLFxuICBzaGltUGVlckNvbm5lY3Rpb246IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIHZhciBicm93c2VyRGV0YWlscyA9IHV0aWxzLmRldGVjdEJyb3dzZXIod2luZG93KTtcblxuICAgIGlmICh3aW5kb3cuUlRDSWNlR2F0aGVyZXIpIHtcbiAgICAgIGlmICghd2luZG93LlJUQ0ljZUNhbmRpZGF0ZSkge1xuICAgICAgICB3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlID0gZnVuY3Rpb24oYXJncykge1xuICAgICAgICAgIHJldHVybiBhcmdzO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgaWYgKCF3aW5kb3cuUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKSB7XG4gICAgICAgIHdpbmRvdy5SVENTZXNzaW9uRGVzY3JpcHRpb24gPSBmdW5jdGlvbihhcmdzKSB7XG4gICAgICAgICAgcmV0dXJuIGFyZ3M7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICAvLyB0aGlzIGFkZHMgYW4gYWRkaXRpb25hbCBldmVudCBsaXN0ZW5lciB0byBNZWRpYVN0cmFja1RyYWNrIHRoYXQgc2lnbmFsc1xuICAgICAgLy8gd2hlbiBhIHRyYWNrcyBlbmFibGVkIHByb3BlcnR5IHdhcyBjaGFuZ2VkLiBXb3JrYXJvdW5kIGZvciBhIGJ1ZyBpblxuICAgICAgLy8gYWRkU3RyZWFtLCBzZWUgYmVsb3cuIE5vIGxvbmdlciByZXF1aXJlZCBpbiAxNTAyNStcbiAgICAgIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgMTUwMjUpIHtcbiAgICAgICAgdmFyIG9yaWdNU1RFbmFibGVkID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihcbiAgICAgICAgICAgIHdpbmRvdy5NZWRpYVN0cmVhbVRyYWNrLnByb3RvdHlwZSwgJ2VuYWJsZWQnKTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5NZWRpYVN0cmVhbVRyYWNrLnByb3RvdHlwZSwgJ2VuYWJsZWQnLCB7XG4gICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgb3JpZ01TVEVuYWJsZWQuc2V0LmNhbGwodGhpcywgdmFsdWUpO1xuICAgICAgICAgICAgdmFyIGV2ID0gbmV3IEV2ZW50KCdlbmFibGVkJyk7XG4gICAgICAgICAgICBldi5lbmFibGVkID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXYpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gT1JUQyBkZWZpbmVzIHRoZSBEVE1GIHNlbmRlciBhIGJpdCBkaWZmZXJlbnQuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3czYy9vcnRjL2lzc3Vlcy83MTRcbiAgICBpZiAod2luZG93LlJUQ1J0cFNlbmRlciAmJiAhKCdkdG1mJyBpbiB3aW5kb3cuUlRDUnRwU2VuZGVyLnByb3RvdHlwZSkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUnRwU2VuZGVyLnByb3RvdHlwZSwgJ2R0bWYnLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX2R0bWYgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMudHJhY2sua2luZCA9PT0gJ2F1ZGlvJykge1xuICAgICAgICAgICAgICB0aGlzLl9kdG1mID0gbmV3IHdpbmRvdy5SVENEdG1mU2VuZGVyKHRoaXMpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRyYWNrLmtpbmQgPT09ICd2aWRlbycpIHtcbiAgICAgICAgICAgICAgdGhpcy5fZHRtZiA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aGlzLl9kdG1mO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgLy8gRWRnZSBjdXJyZW50bHkgb25seSBpbXBsZW1lbnRzIHRoZSBSVENEdG1mU2VuZGVyLCBub3QgdGhlXG4gICAgLy8gUlRDRFRNRlNlbmRlciBhbGlhcy4gU2VlIGh0dHA6Ly9kcmFmdC5vcnRjLm9yZy8jcnRjZHRtZnNlbmRlcjIqXG4gICAgaWYgKHdpbmRvdy5SVENEdG1mU2VuZGVyICYmICF3aW5kb3cuUlRDRFRNRlNlbmRlcikge1xuICAgICAgd2luZG93LlJUQ0RUTUZTZW5kZXIgPSB3aW5kb3cuUlRDRHRtZlNlbmRlcjtcbiAgICB9XG5cbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gPVxuICAgICAgICBzaGltUlRDUGVlckNvbm5lY3Rpb24od2luZG93LCBicm93c2VyRGV0YWlscy52ZXJzaW9uKTtcbiAgfSxcbiAgc2hpbVJlcGxhY2VUcmFjazogZnVuY3Rpb24od2luZG93KSB7XG4gICAgLy8gT1JUQyBoYXMgcmVwbGFjZVRyYWNrIC0tIGh0dHBzOi8vZ2l0aHViLmNvbS93M2Mvb3J0Yy9pc3N1ZXMvNjE0XG4gICAgaWYgKHdpbmRvdy5SVENSdHBTZW5kZXIgJiZcbiAgICAgICAgISgncmVwbGFjZVRyYWNrJyBpbiB3aW5kb3cuUlRDUnRwU2VuZGVyLnByb3RvdHlwZSkpIHtcbiAgICAgIHdpbmRvdy5SVENSdHBTZW5kZXIucHJvdG90eXBlLnJlcGxhY2VUcmFjayA9XG4gICAgICAgICAgd2luZG93LlJUQ1J0cFNlbmRlci5wcm90b3R5cGUuc2V0VHJhY2s7XG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4uL3V0aWxzXCI6MTMsXCIuL2dldHVzZXJtZWRpYVwiOjksXCJydGNwZWVyY29ubmVjdGlvbi1zaGltXCI6MX1dLDk6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLypcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcbiAqICB0cmVlLlxuICovXG4gLyogZXNsaW50LWVudiBub2RlICovXG4ndXNlIHN0cmljdCc7XG5cbi8vIEV4cG9zZSBwdWJsaWMgbWV0aG9kcy5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24od2luZG93KSB7XG4gIHZhciBuYXZpZ2F0b3IgPSB3aW5kb3cgJiYgd2luZG93Lm5hdmlnYXRvcjtcblxuICB2YXIgc2hpbUVycm9yXyA9IGZ1bmN0aW9uKGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZToge1Blcm1pc3Npb25EZW5pZWRFcnJvcjogJ05vdEFsbG93ZWRFcnJvcid9W2UubmFtZV0gfHwgZS5uYW1lLFxuICAgICAgbWVzc2FnZTogZS5tZXNzYWdlLFxuICAgICAgY29uc3RyYWludDogZS5jb25zdHJhaW50LFxuICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lO1xuICAgICAgfVxuICAgIH07XG4gIH07XG5cbiAgLy8gZ2V0VXNlck1lZGlhIGVycm9yIHNoaW0uXG4gIHZhciBvcmlnR2V0VXNlck1lZGlhID0gbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEuXG4gICAgICBiaW5kKG5hdmlnYXRvci5tZWRpYURldmljZXMpO1xuICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSA9IGZ1bmN0aW9uKGMpIHtcbiAgICByZXR1cm4gb3JpZ0dldFVzZXJNZWRpYShjKS5jYXRjaChmdW5jdGlvbihlKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3Qoc2hpbUVycm9yXyhlKSk7XG4gICAgfSk7XG4gIH07XG59O1xuXG59LHt9XSwxMDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vKlxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxuICogIHRyZWUuXG4gKi9cbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNoaW1HZXRVc2VyTWVkaWE6IHJlcXVpcmUoJy4vZ2V0dXNlcm1lZGlhJyksXG4gIHNoaW1PblRyYWNrOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uICYmICEoJ29udHJhY2snIGluXG4gICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSwgJ29udHJhY2snLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX29udHJhY2s7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24oZikge1xuICAgICAgICAgIGlmICh0aGlzLl9vbnRyYWNrKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYWNrJywgdGhpcy5fb250cmFjayk7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2FkZHN0cmVhbScsIHRoaXMuX29udHJhY2twb2x5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCd0cmFjaycsIHRoaXMuX29udHJhY2sgPSBmKTtcbiAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2FkZHN0cmVhbScsIHRoaXMuX29udHJhY2twb2x5ID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5zdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xuICAgICAgICAgICAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ3RyYWNrJyk7XG4gICAgICAgICAgICAgIGV2ZW50LnRyYWNrID0gdHJhY2s7XG4gICAgICAgICAgICAgIGV2ZW50LnJlY2VpdmVyID0ge3RyYWNrOiB0cmFja307XG4gICAgICAgICAgICAgIGV2ZW50LnRyYW5zY2VpdmVyID0ge3JlY2VpdmVyOiBldmVudC5yZWNlaXZlcn07XG4gICAgICAgICAgICAgIGV2ZW50LnN0cmVhbXMgPSBbZS5zdHJlYW1dO1xuICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHdpbmRvdy5SVENUcmFja0V2ZW50ICYmXG4gICAgICAgICgncmVjZWl2ZXInIGluIHdpbmRvdy5SVENUcmFja0V2ZW50LnByb3RvdHlwZSkgJiZcbiAgICAgICAgISgndHJhbnNjZWl2ZXInIGluIHdpbmRvdy5SVENUcmFja0V2ZW50LnByb3RvdHlwZSkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDVHJhY2tFdmVudC5wcm90b3R5cGUsICd0cmFuc2NlaXZlcicsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4ge3JlY2VpdmVyOiB0aGlzLnJlY2VpdmVyfTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIHNoaW1Tb3VyY2VPYmplY3Q6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIC8vIEZpcmVmb3ggaGFzIHN1cHBvcnRlZCBtb3pTcmNPYmplY3Qgc2luY2UgRkYyMiwgdW5wcmVmaXhlZCBpbiA0Mi5cbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmICh3aW5kb3cuSFRNTE1lZGlhRWxlbWVudCAmJlxuICAgICAgICAhKCdzcmNPYmplY3QnIGluIHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50LnByb3RvdHlwZSkpIHtcbiAgICAgICAgLy8gU2hpbSB0aGUgc3JjT2JqZWN0IHByb3BlcnR5LCBvbmNlLCB3aGVuIEhUTUxNZWRpYUVsZW1lbnQgaXMgZm91bmQuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuSFRNTE1lZGlhRWxlbWVudC5wcm90b3R5cGUsICdzcmNPYmplY3QnLCB7XG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1velNyY09iamVjdDtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNldDogZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICAgICAgICB0aGlzLm1velNyY09iamVjdCA9IHN0cmVhbTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBzaGltUGVlckNvbm5lY3Rpb246IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIHZhciBicm93c2VyRGV0YWlscyA9IHV0aWxzLmRldGVjdEJyb3dzZXIod2luZG93KTtcblxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAnb2JqZWN0JyB8fCAhKHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiB8fFxuICAgICAgICB3aW5kb3cubW96UlRDUGVlckNvbm5lY3Rpb24pKSB7XG4gICAgICByZXR1cm47IC8vIHByb2JhYmx5IG1lZGlhLnBlZXJjb25uZWN0aW9uLmVuYWJsZWQ9ZmFsc2UgaW4gYWJvdXQ6Y29uZmlnXG4gICAgfVxuICAgIC8vIFRoZSBSVENQZWVyQ29ubmVjdGlvbiBvYmplY3QuXG4gICAgaWYgKCF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24pIHtcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiA9IGZ1bmN0aW9uKHBjQ29uZmlnLCBwY0NvbnN0cmFpbnRzKSB7XG4gICAgICAgIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgMzgpIHtcbiAgICAgICAgICAvLyAudXJscyBpcyBub3Qgc3VwcG9ydGVkIGluIEZGIDwgMzguXG4gICAgICAgICAgLy8gY3JlYXRlIFJUQ0ljZVNlcnZlcnMgd2l0aCBhIHNpbmdsZSB1cmwuXG4gICAgICAgICAgaWYgKHBjQ29uZmlnICYmIHBjQ29uZmlnLmljZVNlcnZlcnMpIHtcbiAgICAgICAgICAgIHZhciBuZXdJY2VTZXJ2ZXJzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBjQ29uZmlnLmljZVNlcnZlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgdmFyIHNlcnZlciA9IHBjQ29uZmlnLmljZVNlcnZlcnNbaV07XG4gICAgICAgICAgICAgIGlmIChzZXJ2ZXIuaGFzT3duUHJvcGVydHkoJ3VybHMnKSkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc2VydmVyLnVybHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgIHZhciBuZXdTZXJ2ZXIgPSB7XG4gICAgICAgICAgICAgICAgICAgIHVybDogc2VydmVyLnVybHNbal1cbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICBpZiAoc2VydmVyLnVybHNbal0uaW5kZXhPZigndHVybicpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1NlcnZlci51c2VybmFtZSA9IHNlcnZlci51c2VybmFtZTtcbiAgICAgICAgICAgICAgICAgICAgbmV3U2VydmVyLmNyZWRlbnRpYWwgPSBzZXJ2ZXIuY3JlZGVudGlhbDtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIG5ld0ljZVNlcnZlcnMucHVzaChuZXdTZXJ2ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdJY2VTZXJ2ZXJzLnB1c2gocGNDb25maWcuaWNlU2VydmVyc1tpXSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBjQ29uZmlnLmljZVNlcnZlcnMgPSBuZXdJY2VTZXJ2ZXJzO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IHdpbmRvdy5tb3pSVENQZWVyQ29ubmVjdGlvbihwY0NvbmZpZywgcGNDb25zdHJhaW50cyk7XG4gICAgICB9O1xuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSA9XG4gICAgICAgICAgd2luZG93Lm1velJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZTtcblxuICAgICAgLy8gd3JhcCBzdGF0aWMgbWV0aG9kcy4gQ3VycmVudGx5IGp1c3QgZ2VuZXJhdGVDZXJ0aWZpY2F0ZS5cbiAgICAgIGlmICh3aW5kb3cubW96UlRDUGVlckNvbm5lY3Rpb24uZ2VuZXJhdGVDZXJ0aWZpY2F0ZSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLCAnZ2VuZXJhdGVDZXJ0aWZpY2F0ZScsIHtcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5tb3pSVENQZWVyQ29ubmVjdGlvbi5nZW5lcmF0ZUNlcnRpZmljYXRlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHdpbmRvdy5SVENTZXNzaW9uRGVzY3JpcHRpb24gPSB3aW5kb3cubW96UlRDU2Vzc2lvbkRlc2NyaXB0aW9uO1xuICAgICAgd2luZG93LlJUQ0ljZUNhbmRpZGF0ZSA9IHdpbmRvdy5tb3pSVENJY2VDYW5kaWRhdGU7XG4gICAgfVxuXG4gICAgLy8gc2hpbSBhd2F5IG5lZWQgZm9yIG9ic29sZXRlIFJUQ0ljZUNhbmRpZGF0ZS9SVENTZXNzaW9uRGVzY3JpcHRpb24uXG4gICAgWydzZXRMb2NhbERlc2NyaXB0aW9uJywgJ3NldFJlbW90ZURlc2NyaXB0aW9uJywgJ2FkZEljZUNhbmRpZGF0ZSddXG4gICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgICAgIHZhciBuYXRpdmVNZXRob2QgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF07XG4gICAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhcmd1bWVudHNbMF0gPSBuZXcgKChtZXRob2QgPT09ICdhZGRJY2VDYW5kaWRhdGUnKSA/XG4gICAgICAgICAgICAgICAgd2luZG93LlJUQ0ljZUNhbmRpZGF0ZSA6XG4gICAgICAgICAgICAgICAgd2luZG93LlJUQ1Nlc3Npb25EZXNjcmlwdGlvbikoYXJndW1lbnRzWzBdKTtcbiAgICAgICAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgIC8vIHN1cHBvcnQgZm9yIGFkZEljZUNhbmRpZGF0ZShudWxsIG9yIHVuZGVmaW5lZClcbiAgICB2YXIgbmF0aXZlQWRkSWNlQ2FuZGlkYXRlID1cbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRJY2VDYW5kaWRhdGU7XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRJY2VDYW5kaWRhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghYXJndW1lbnRzWzBdKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHNbMV0pIHtcbiAgICAgICAgICBhcmd1bWVudHNbMV0uYXBwbHkobnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5hdGl2ZUFkZEljZUNhbmRpZGF0ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG5cbiAgICAvLyBzaGltIGdldFN0YXRzIHdpdGggbWFwbGlrZSBzdXBwb3J0XG4gICAgdmFyIG1ha2VNYXBTdGF0cyA9IGZ1bmN0aW9uKHN0YXRzKSB7XG4gICAgICB2YXIgbWFwID0gbmV3IE1hcCgpO1xuICAgICAgT2JqZWN0LmtleXMoc3RhdHMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIG1hcC5zZXQoa2V5LCBzdGF0c1trZXldKTtcbiAgICAgICAgbWFwW2tleV0gPSBzdGF0c1trZXldO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbWFwO1xuICAgIH07XG5cbiAgICB2YXIgbW9kZXJuU3RhdHNUeXBlcyA9IHtcbiAgICAgIGluYm91bmRydHA6ICdpbmJvdW5kLXJ0cCcsXG4gICAgICBvdXRib3VuZHJ0cDogJ291dGJvdW5kLXJ0cCcsXG4gICAgICBjYW5kaWRhdGVwYWlyOiAnY2FuZGlkYXRlLXBhaXInLFxuICAgICAgbG9jYWxjYW5kaWRhdGU6ICdsb2NhbC1jYW5kaWRhdGUnLFxuICAgICAgcmVtb3RlY2FuZGlkYXRlOiAncmVtb3RlLWNhbmRpZGF0ZSdcbiAgICB9O1xuXG4gICAgdmFyIG5hdGl2ZUdldFN0YXRzID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTdGF0cztcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFN0YXRzID0gZnVuY3Rpb24oXG4gICAgICBzZWxlY3RvcixcbiAgICAgIG9uU3VjYyxcbiAgICAgIG9uRXJyXG4gICAgKSB7XG4gICAgICByZXR1cm4gbmF0aXZlR2V0U3RhdHMuYXBwbHkodGhpcywgW3NlbGVjdG9yIHx8IG51bGxdKVxuICAgICAgICAudGhlbihmdW5jdGlvbihzdGF0cykge1xuICAgICAgICAgIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgNDgpIHtcbiAgICAgICAgICAgIHN0YXRzID0gbWFrZU1hcFN0YXRzKHN0YXRzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCA1MyAmJiAhb25TdWNjKSB7XG4gICAgICAgICAgICAvLyBTaGltIG9ubHkgcHJvbWlzZSBnZXRTdGF0cyB3aXRoIHNwZWMtaHlwaGVucyBpbiB0eXBlIG5hbWVzXG4gICAgICAgICAgICAvLyBMZWF2ZSBjYWxsYmFjayB2ZXJzaW9uIGFsb25lOyBtaXNjIG9sZCB1c2VzIG9mIGZvckVhY2ggYmVmb3JlIE1hcFxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgc3RhdHMuZm9yRWFjaChmdW5jdGlvbihzdGF0KSB7XG4gICAgICAgICAgICAgICAgc3RhdC50eXBlID0gbW9kZXJuU3RhdHNUeXBlc1tzdGF0LnR5cGVdIHx8IHN0YXQudHlwZTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgIGlmIChlLm5hbWUgIT09ICdUeXBlRXJyb3InKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyBBdm9pZCBUeXBlRXJyb3I6IFwidHlwZVwiIGlzIHJlYWQtb25seSwgaW4gb2xkIHZlcnNpb25zLiAzNC00M2lzaFxuICAgICAgICAgICAgICBzdGF0cy5mb3JFYWNoKGZ1bmN0aW9uKHN0YXQsIGkpIHtcbiAgICAgICAgICAgICAgICBzdGF0cy5zZXQoaSwgT2JqZWN0LmFzc2lnbih7fSwgc3RhdCwge1xuICAgICAgICAgICAgICAgICAgdHlwZTogbW9kZXJuU3RhdHNUeXBlc1tzdGF0LnR5cGVdIHx8IHN0YXQudHlwZVxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBzdGF0cztcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ob25TdWNjLCBvbkVycik7XG4gICAgfTtcbiAgfSxcblxuICBzaGltUmVtb3ZlU3RyZWFtOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICBpZiAoIXdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiB8fFxuICAgICAgICAncmVtb3ZlU3RyZWFtJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgdXRpbHMuZGVwcmVjYXRlZCgncmVtb3ZlU3RyZWFtJywgJ3JlbW92ZVRyYWNrJyk7XG4gICAgICB0aGlzLmdldFNlbmRlcnMoKS5mb3JFYWNoKGZ1bmN0aW9uKHNlbmRlcikge1xuICAgICAgICBpZiAoc2VuZGVyLnRyYWNrICYmIHN0cmVhbS5nZXRUcmFja3MoKS5pbmRleE9mKHNlbmRlci50cmFjaykgIT09IC0xKSB7XG4gICAgICAgICAgcGMucmVtb3ZlVHJhY2soc2VuZGVyKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcbiAgfVxufTtcblxufSx7XCIuLi91dGlsc1wiOjEzLFwiLi9nZXR1c2VybWVkaWFcIjoxMX1dLDExOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8qXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXG4gKiAgdHJlZS5cbiAqL1xuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xudmFyIGxvZ2dpbmcgPSB1dGlscy5sb2c7XG5cbi8vIEV4cG9zZSBwdWJsaWMgbWV0aG9kcy5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24od2luZG93KSB7XG4gIHZhciBicm93c2VyRGV0YWlscyA9IHV0aWxzLmRldGVjdEJyb3dzZXIod2luZG93KTtcbiAgdmFyIG5hdmlnYXRvciA9IHdpbmRvdyAmJiB3aW5kb3cubmF2aWdhdG9yO1xuICB2YXIgTWVkaWFTdHJlYW1UcmFjayA9IHdpbmRvdyAmJiB3aW5kb3cuTWVkaWFTdHJlYW1UcmFjaztcblxuICB2YXIgc2hpbUVycm9yXyA9IGZ1bmN0aW9uKGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZToge1xuICAgICAgICBJbnRlcm5hbEVycm9yOiAnTm90UmVhZGFibGVFcnJvcicsXG4gICAgICAgIE5vdFN1cHBvcnRlZEVycm9yOiAnVHlwZUVycm9yJyxcbiAgICAgICAgUGVybWlzc2lvbkRlbmllZEVycm9yOiAnTm90QWxsb3dlZEVycm9yJyxcbiAgICAgICAgU2VjdXJpdHlFcnJvcjogJ05vdEFsbG93ZWRFcnJvcidcbiAgICAgIH1bZS5uYW1lXSB8fCBlLm5hbWUsXG4gICAgICBtZXNzYWdlOiB7XG4gICAgICAgICdUaGUgb3BlcmF0aW9uIGlzIGluc2VjdXJlLic6ICdUaGUgcmVxdWVzdCBpcyBub3QgYWxsb3dlZCBieSB0aGUgJyArXG4gICAgICAgICd1c2VyIGFnZW50IG9yIHRoZSBwbGF0Zm9ybSBpbiB0aGUgY3VycmVudCBjb250ZXh0LidcbiAgICAgIH1bZS5tZXNzYWdlXSB8fCBlLm1lc3NhZ2UsXG4gICAgICBjb25zdHJhaW50OiBlLmNvbnN0cmFpbnQsXG4gICAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWUgKyAodGhpcy5tZXNzYWdlICYmICc6ICcpICsgdGhpcy5tZXNzYWdlO1xuICAgICAgfVxuICAgIH07XG4gIH07XG5cbiAgLy8gZ2V0VXNlck1lZGlhIGNvbnN0cmFpbnRzIHNoaW0uXG4gIHZhciBnZXRVc2VyTWVkaWFfID0gZnVuY3Rpb24oY29uc3RyYWludHMsIG9uU3VjY2Vzcywgb25FcnJvcikge1xuICAgIHZhciBjb25zdHJhaW50c1RvRkYzN18gPSBmdW5jdGlvbihjKSB7XG4gICAgICBpZiAodHlwZW9mIGMgIT09ICdvYmplY3QnIHx8IGMucmVxdWlyZSkge1xuICAgICAgICByZXR1cm4gYztcbiAgICAgIH1cbiAgICAgIHZhciByZXF1aXJlID0gW107XG4gICAgICBPYmplY3Qua2V5cyhjKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICBpZiAoa2V5ID09PSAncmVxdWlyZScgfHwga2V5ID09PSAnYWR2YW5jZWQnIHx8IGtleSA9PT0gJ21lZGlhU291cmNlJykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgciA9IGNba2V5XSA9ICh0eXBlb2YgY1trZXldID09PSAnb2JqZWN0JykgP1xuICAgICAgICAgICAgY1trZXldIDoge2lkZWFsOiBjW2tleV19O1xuICAgICAgICBpZiAoci5taW4gIT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgci5tYXggIT09IHVuZGVmaW5lZCB8fCByLmV4YWN0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXF1aXJlLnB1c2goa2V5KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoci5leGFjdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiByLmV4YWN0ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgci4gbWluID0gci5tYXggPSByLmV4YWN0O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjW2tleV0gPSByLmV4YWN0O1xuICAgICAgICAgIH1cbiAgICAgICAgICBkZWxldGUgci5leGFjdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoci5pZGVhbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgYy5hZHZhbmNlZCA9IGMuYWR2YW5jZWQgfHwgW107XG4gICAgICAgICAgdmFyIG9jID0ge307XG4gICAgICAgICAgaWYgKHR5cGVvZiByLmlkZWFsID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgb2Nba2V5XSA9IHttaW46IHIuaWRlYWwsIG1heDogci5pZGVhbH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9jW2tleV0gPSByLmlkZWFsO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjLmFkdmFuY2VkLnB1c2gob2MpO1xuICAgICAgICAgIGRlbGV0ZSByLmlkZWFsO1xuICAgICAgICAgIGlmICghT2JqZWN0LmtleXMocikubGVuZ3RoKSB7XG4gICAgICAgICAgICBkZWxldGUgY1trZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAocmVxdWlyZS5sZW5ndGgpIHtcbiAgICAgICAgYy5yZXF1aXJlID0gcmVxdWlyZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjO1xuICAgIH07XG4gICAgY29uc3RyYWludHMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGNvbnN0cmFpbnRzKSk7XG4gICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCAzOCkge1xuICAgICAgbG9nZ2luZygnc3BlYzogJyArIEpTT04uc3RyaW5naWZ5KGNvbnN0cmFpbnRzKSk7XG4gICAgICBpZiAoY29uc3RyYWludHMuYXVkaW8pIHtcbiAgICAgICAgY29uc3RyYWludHMuYXVkaW8gPSBjb25zdHJhaW50c1RvRkYzN18oY29uc3RyYWludHMuYXVkaW8pO1xuICAgICAgfVxuICAgICAgaWYgKGNvbnN0cmFpbnRzLnZpZGVvKSB7XG4gICAgICAgIGNvbnN0cmFpbnRzLnZpZGVvID0gY29uc3RyYWludHNUb0ZGMzdfKGNvbnN0cmFpbnRzLnZpZGVvKTtcbiAgICAgIH1cbiAgICAgIGxvZ2dpbmcoJ2ZmMzc6ICcgKyBKU09OLnN0cmluZ2lmeShjb25zdHJhaW50cykpO1xuICAgIH1cbiAgICByZXR1cm4gbmF2aWdhdG9yLm1vekdldFVzZXJNZWRpYShjb25zdHJhaW50cywgb25TdWNjZXNzLCBmdW5jdGlvbihlKSB7XG4gICAgICBvbkVycm9yKHNoaW1FcnJvcl8oZSkpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIFJldHVybnMgdGhlIHJlc3VsdCBvZiBnZXRVc2VyTWVkaWEgYXMgYSBQcm9taXNlLlxuICB2YXIgZ2V0VXNlck1lZGlhUHJvbWlzZV8gPSBmdW5jdGlvbihjb25zdHJhaW50cykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGdldFVzZXJNZWRpYV8oY29uc3RyYWludHMsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gU2hpbSBmb3IgbWVkaWFEZXZpY2VzIG9uIG9sZGVyIHZlcnNpb25zLlxuICBpZiAoIW5hdmlnYXRvci5tZWRpYURldmljZXMpIHtcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzID0ge2dldFVzZXJNZWRpYTogZ2V0VXNlck1lZGlhUHJvbWlzZV8sXG4gICAgICBhZGRFdmVudExpc3RlbmVyOiBmdW5jdGlvbigpIHsgfSxcbiAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXI6IGZ1bmN0aW9uKCkgeyB9XG4gICAgfTtcbiAgfVxuICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmVudW1lcmF0ZURldmljZXMgPVxuICAgICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzIHx8IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuICAgICAgICAgIHZhciBpbmZvcyA9IFtcbiAgICAgICAgICAgIHtraW5kOiAnYXVkaW9pbnB1dCcsIGRldmljZUlkOiAnZGVmYXVsdCcsIGxhYmVsOiAnJywgZ3JvdXBJZDogJyd9LFxuICAgICAgICAgICAge2tpbmQ6ICd2aWRlb2lucHV0JywgZGV2aWNlSWQ6ICdkZWZhdWx0JywgbGFiZWw6ICcnLCBncm91cElkOiAnJ31cbiAgICAgICAgICBdO1xuICAgICAgICAgIHJlc29sdmUoaW5mb3MpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCA0MSkge1xuICAgIC8vIFdvcmsgYXJvdW5kIGh0dHA6Ly9idWd6aWwubGEvMTE2OTY2NVxuICAgIHZhciBvcmdFbnVtZXJhdGVEZXZpY2VzID1cbiAgICAgICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzLmJpbmQobmF2aWdhdG9yLm1lZGlhRGV2aWNlcyk7XG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gb3JnRW51bWVyYXRlRGV2aWNlcygpLnRoZW4odW5kZWZpbmVkLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChlLm5hbWUgPT09ICdOb3RGb3VuZEVycm9yJykge1xuICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBlO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfVxuICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDQ5KSB7XG4gICAgdmFyIG9yaWdHZXRVc2VyTWVkaWEgPSBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYS5cbiAgICAgICAgYmluZChuYXZpZ2F0b3IubWVkaWFEZXZpY2VzKTtcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSA9IGZ1bmN0aW9uKGMpIHtcbiAgICAgIHJldHVybiBvcmlnR2V0VXNlck1lZGlhKGMpLnRoZW4oZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICAgIC8vIFdvcmsgYXJvdW5kIGh0dHBzOi8vYnVnemlsLmxhLzgwMjMyNlxuICAgICAgICBpZiAoYy5hdWRpbyAmJiAhc3RyZWFtLmdldEF1ZGlvVHJhY2tzKCkubGVuZ3RoIHx8XG4gICAgICAgICAgICBjLnZpZGVvICYmICFzdHJlYW0uZ2V0VmlkZW9UcmFja3MoKS5sZW5ndGgpIHtcbiAgICAgICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xuICAgICAgICAgICAgdHJhY2suc3RvcCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oJ1RoZSBvYmplY3QgY2FuIG5vdCBiZSBmb3VuZCBoZXJlLicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnTm90Rm91bmRFcnJvcicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHJlYW07XG4gICAgICB9LCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChzaGltRXJyb3JfKGUpKTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbiAgaWYgKCEoYnJvd3NlckRldGFpbHMudmVyc2lvbiA+IDU1ICYmXG4gICAgICAnYXV0b0dhaW5Db250cm9sJyBpbiBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFN1cHBvcnRlZENvbnN0cmFpbnRzKCkpKSB7XG4gICAgdmFyIHJlbWFwID0gZnVuY3Rpb24ob2JqLCBhLCBiKSB7XG4gICAgICBpZiAoYSBpbiBvYmogJiYgIShiIGluIG9iaikpIHtcbiAgICAgICAgb2JqW2JdID0gb2JqW2FdO1xuICAgICAgICBkZWxldGUgb2JqW2FdO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgbmF0aXZlR2V0VXNlck1lZGlhID0gbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEuXG4gICAgICAgIGJpbmQobmF2aWdhdG9yLm1lZGlhRGV2aWNlcyk7XG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEgPSBmdW5jdGlvbihjKSB7XG4gICAgICBpZiAodHlwZW9mIGMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBjLmF1ZGlvID09PSAnb2JqZWN0Jykge1xuICAgICAgICBjID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShjKSk7XG4gICAgICAgIHJlbWFwKGMuYXVkaW8sICdhdXRvR2FpbkNvbnRyb2wnLCAnbW96QXV0b0dhaW5Db250cm9sJyk7XG4gICAgICAgIHJlbWFwKGMuYXVkaW8sICdub2lzZVN1cHByZXNzaW9uJywgJ21vek5vaXNlU3VwcHJlc3Npb24nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuYXRpdmVHZXRVc2VyTWVkaWEoYyk7XG4gICAgfTtcblxuICAgIGlmIChNZWRpYVN0cmVhbVRyYWNrICYmIE1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLmdldFNldHRpbmdzKSB7XG4gICAgICB2YXIgbmF0aXZlR2V0U2V0dGluZ3MgPSBNZWRpYVN0cmVhbVRyYWNrLnByb3RvdHlwZS5nZXRTZXR0aW5ncztcbiAgICAgIE1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLmdldFNldHRpbmdzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBvYmogPSBuYXRpdmVHZXRTZXR0aW5ncy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICByZW1hcChvYmosICdtb3pBdXRvR2FpbkNvbnRyb2wnLCAnYXV0b0dhaW5Db250cm9sJyk7XG4gICAgICAgIHJlbWFwKG9iaiwgJ21vek5vaXNlU3VwcHJlc3Npb24nLCAnbm9pc2VTdXBwcmVzc2lvbicpO1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoTWVkaWFTdHJlYW1UcmFjayAmJiBNZWRpYVN0cmVhbVRyYWNrLnByb3RvdHlwZS5hcHBseUNvbnN0cmFpbnRzKSB7XG4gICAgICB2YXIgbmF0aXZlQXBwbHlDb25zdHJhaW50cyA9IE1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLmFwcGx5Q29uc3RyYWludHM7XG4gICAgICBNZWRpYVN0cmVhbVRyYWNrLnByb3RvdHlwZS5hcHBseUNvbnN0cmFpbnRzID0gZnVuY3Rpb24oYykge1xuICAgICAgICBpZiAodGhpcy5raW5kID09PSAnYXVkaW8nICYmIHR5cGVvZiBjID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGMpKTtcbiAgICAgICAgICByZW1hcChjLCAnYXV0b0dhaW5Db250cm9sJywgJ21vekF1dG9HYWluQ29udHJvbCcpO1xuICAgICAgICAgIHJlbWFwKGMsICdub2lzZVN1cHByZXNzaW9uJywgJ21vek5vaXNlU3VwcHJlc3Npb24nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmF0aXZlQXBwbHlDb25zdHJhaW50cy5hcHBseSh0aGlzLCBbY10pO1xuICAgICAgfTtcbiAgICB9XG4gIH1cbiAgbmF2aWdhdG9yLmdldFVzZXJNZWRpYSA9IGZ1bmN0aW9uKGNvbnN0cmFpbnRzLCBvblN1Y2Nlc3MsIG9uRXJyb3IpIHtcbiAgICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDQ0KSB7XG4gICAgICByZXR1cm4gZ2V0VXNlck1lZGlhXyhjb25zdHJhaW50cywgb25TdWNjZXNzLCBvbkVycm9yKTtcbiAgICB9XG4gICAgLy8gUmVwbGFjZSBGaXJlZm94IDQ0KydzIGRlcHJlY2F0aW9uIHdhcm5pbmcgd2l0aCB1bnByZWZpeGVkIHZlcnNpb24uXG4gICAgdXRpbHMuZGVwcmVjYXRlZCgnbmF2aWdhdG9yLmdldFVzZXJNZWRpYScsXG4gICAgICAgICduYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYScpO1xuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzKS50aGVuKG9uU3VjY2Vzcywgb25FcnJvcik7XG4gIH07XG59O1xuXG59LHtcIi4uL3V0aWxzXCI6MTN9XSwxMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vKlxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxuICogIHRyZWUuXG4gKi9cbid1c2Ugc3RyaWN0JztcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzaGltTG9jYWxTdHJlYW1zQVBJOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ29iamVjdCcgfHwgIXdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoISgnZ2V0TG9jYWxTdHJlYW1zJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRMb2NhbFN0cmVhbXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9sb2NhbFN0cmVhbXMpIHtcbiAgICAgICAgICB0aGlzLl9sb2NhbFN0cmVhbXMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxTdHJlYW1zO1xuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKCEoJ2dldFN0cmVhbUJ5SWQnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFN0cmVhbUJ5SWQgPSBmdW5jdGlvbihpZCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuX2xvY2FsU3RyZWFtcykge1xuICAgICAgICAgIHRoaXMuX2xvY2FsU3RyZWFtcy5mb3JFYWNoKGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgICAgICAgaWYgKHN0cmVhbS5pZCA9PT0gaWQpIHtcbiAgICAgICAgICAgICAgcmVzdWx0ID0gc3RyZWFtO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9yZW1vdGVTdHJlYW1zKSB7XG4gICAgICAgICAgdGhpcy5fcmVtb3RlU3RyZWFtcy5mb3JFYWNoKGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgICAgICAgaWYgKHN0cmVhbS5pZCA9PT0gaWQpIHtcbiAgICAgICAgICAgICAgcmVzdWx0ID0gc3RyZWFtO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAoISgnYWRkU3RyZWFtJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xuICAgICAgdmFyIF9hZGRUcmFjayA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2s7XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgICBpZiAoIXRoaXMuX2xvY2FsU3RyZWFtcykge1xuICAgICAgICAgIHRoaXMuX2xvY2FsU3RyZWFtcyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9sb2NhbFN0cmVhbXMuaW5kZXhPZihzdHJlYW0pID09PSAtMSkge1xuICAgICAgICAgIHRoaXMuX2xvY2FsU3RyZWFtcy5wdXNoKHN0cmVhbSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcbiAgICAgICAgICBfYWRkVHJhY2suY2FsbChwYywgdHJhY2ssIHN0cmVhbSk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjayA9IGZ1bmN0aW9uKHRyYWNrLCBzdHJlYW0pIHtcbiAgICAgICAgaWYgKHN0cmVhbSkge1xuICAgICAgICAgIGlmICghdGhpcy5fbG9jYWxTdHJlYW1zKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2NhbFN0cmVhbXMgPSBbc3RyZWFtXTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2xvY2FsU3RyZWFtcy5pbmRleE9mKHN0cmVhbSkgPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2NhbFN0cmVhbXMucHVzaChzdHJlYW0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX2FkZFRyYWNrLmNhbGwodGhpcywgdHJhY2ssIHN0cmVhbSk7XG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAoISgncmVtb3ZlU3RyZWFtJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgICAgaWYgKCF0aGlzLl9sb2NhbFN0cmVhbXMpIHtcbiAgICAgICAgICB0aGlzLl9sb2NhbFN0cmVhbXMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLl9sb2NhbFN0cmVhbXMuaW5kZXhPZihzdHJlYW0pO1xuICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xvY2FsU3RyZWFtcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgICB2YXIgdHJhY2tzID0gc3RyZWFtLmdldFRyYWNrcygpO1xuICAgICAgICB0aGlzLmdldFNlbmRlcnMoKS5mb3JFYWNoKGZ1bmN0aW9uKHNlbmRlcikge1xuICAgICAgICAgIGlmICh0cmFja3MuaW5kZXhPZihzZW5kZXIudHJhY2spICE9PSAtMSkge1xuICAgICAgICAgICAgcGMucmVtb3ZlVHJhY2soc2VuZGVyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9XG4gIH0sXG4gIHNoaW1SZW1vdGVTdHJlYW1zQVBJOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ29iamVjdCcgfHwgIXdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoISgnZ2V0UmVtb3RlU3RyZWFtcycgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkpIHtcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0UmVtb3RlU3RyZWFtcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVtb3RlU3RyZWFtcyA/IHRoaXMuX3JlbW90ZVN0cmVhbXMgOiBbXTtcbiAgICAgIH07XG4gICAgfVxuICAgIGlmICghKCdvbmFkZHN0cmVhbScgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLCAnb25hZGRzdHJlYW0nLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX29uYWRkc3RyZWFtO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKGYpIHtcbiAgICAgICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgICAgIGlmICh0aGlzLl9vbmFkZHN0cmVhbSkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdhZGRzdHJlYW0nLCB0aGlzLl9vbmFkZHN0cmVhbSk7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYWNrJywgdGhpcy5fb25hZGRzdHJlYW1wb2x5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdhZGRzdHJlYW0nLCB0aGlzLl9vbmFkZHN0cmVhbSA9IGYpO1xuICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigndHJhY2snLCB0aGlzLl9vbmFkZHN0cmVhbXBvbHkgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnN0cmVhbXMuZm9yRWFjaChmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgICAgICAgICAgaWYgKCFwYy5fcmVtb3RlU3RyZWFtcykge1xuICAgICAgICAgICAgICAgIHBjLl9yZW1vdGVTdHJlYW1zID0gW107XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHBjLl9yZW1vdGVTdHJlYW1zLmluZGV4T2Yoc3RyZWFtKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHBjLl9yZW1vdGVTdHJlYW1zLnB1c2goc3RyZWFtKTtcbiAgICAgICAgICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdhZGRzdHJlYW0nKTtcbiAgICAgICAgICAgICAgZXZlbnQuc3RyZWFtID0gc3RyZWFtO1xuICAgICAgICAgICAgICBwYy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIHNoaW1DYWxsYmFja3NBUEk6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAnb2JqZWN0JyB8fCAhd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBwcm90b3R5cGUgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlO1xuICAgIHZhciBjcmVhdGVPZmZlciA9IHByb3RvdHlwZS5jcmVhdGVPZmZlcjtcbiAgICB2YXIgY3JlYXRlQW5zd2VyID0gcHJvdG90eXBlLmNyZWF0ZUFuc3dlcjtcbiAgICB2YXIgc2V0TG9jYWxEZXNjcmlwdGlvbiA9IHByb3RvdHlwZS5zZXRMb2NhbERlc2NyaXB0aW9uO1xuICAgIHZhciBzZXRSZW1vdGVEZXNjcmlwdGlvbiA9IHByb3RvdHlwZS5zZXRSZW1vdGVEZXNjcmlwdGlvbjtcbiAgICB2YXIgYWRkSWNlQ2FuZGlkYXRlID0gcHJvdG90eXBlLmFkZEljZUNhbmRpZGF0ZTtcblxuICAgIHByb3RvdHlwZS5jcmVhdGVPZmZlciA9IGZ1bmN0aW9uKHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKSB7XG4gICAgICB2YXIgb3B0aW9ucyA9IChhcmd1bWVudHMubGVuZ3RoID49IDIpID8gYXJndW1lbnRzWzJdIDogYXJndW1lbnRzWzBdO1xuICAgICAgdmFyIHByb21pc2UgPSBjcmVhdGVPZmZlci5hcHBseSh0aGlzLCBbb3B0aW9uc10pO1xuICAgICAgaWYgKCFmYWlsdXJlQ2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgICB9XG4gICAgICBwcm9taXNlLnRoZW4oc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH07XG5cbiAgICBwcm90b3R5cGUuY3JlYXRlQW5zd2VyID0gZnVuY3Rpb24oc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spIHtcbiAgICAgIHZhciBvcHRpb25zID0gKGFyZ3VtZW50cy5sZW5ndGggPj0gMikgPyBhcmd1bWVudHNbMl0gOiBhcmd1bWVudHNbMF07XG4gICAgICB2YXIgcHJvbWlzZSA9IGNyZWF0ZUFuc3dlci5hcHBseSh0aGlzLCBbb3B0aW9uc10pO1xuICAgICAgaWYgKCFmYWlsdXJlQ2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgICB9XG4gICAgICBwcm9taXNlLnRoZW4oc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH07XG5cbiAgICB2YXIgd2l0aENhbGxiYWNrID0gZnVuY3Rpb24oZGVzY3JpcHRpb24sIHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKSB7XG4gICAgICB2YXIgcHJvbWlzZSA9IHNldExvY2FsRGVzY3JpcHRpb24uYXBwbHkodGhpcywgW2Rlc2NyaXB0aW9uXSk7XG4gICAgICBpZiAoIWZhaWx1cmVDYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgIH1cbiAgICAgIHByb21pc2UudGhlbihzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjayk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfTtcbiAgICBwcm90b3R5cGUuc2V0TG9jYWxEZXNjcmlwdGlvbiA9IHdpdGhDYWxsYmFjaztcblxuICAgIHdpdGhDYWxsYmFjayA9IGZ1bmN0aW9uKGRlc2NyaXB0aW9uLCBzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjaykge1xuICAgICAgdmFyIHByb21pc2UgPSBzZXRSZW1vdGVEZXNjcmlwdGlvbi5hcHBseSh0aGlzLCBbZGVzY3JpcHRpb25dKTtcbiAgICAgIGlmICghZmFpbHVyZUNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgICAgfVxuICAgICAgcHJvbWlzZS50aGVuKHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9O1xuICAgIHByb3RvdHlwZS5zZXRSZW1vdGVEZXNjcmlwdGlvbiA9IHdpdGhDYWxsYmFjaztcblxuICAgIHdpdGhDYWxsYmFjayA9IGZ1bmN0aW9uKGNhbmRpZGF0ZSwgc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spIHtcbiAgICAgIHZhciBwcm9taXNlID0gYWRkSWNlQ2FuZGlkYXRlLmFwcGx5KHRoaXMsIFtjYW5kaWRhdGVdKTtcbiAgICAgIGlmICghZmFpbHVyZUNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgICAgfVxuICAgICAgcHJvbWlzZS50aGVuKHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9O1xuICAgIHByb3RvdHlwZS5hZGRJY2VDYW5kaWRhdGUgPSB3aXRoQ2FsbGJhY2s7XG4gIH0sXG4gIHNoaW1HZXRVc2VyTWVkaWE6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIHZhciBuYXZpZ2F0b3IgPSB3aW5kb3cgJiYgd2luZG93Lm5hdmlnYXRvcjtcblxuICAgIGlmICghbmF2aWdhdG9yLmdldFVzZXJNZWRpYSkge1xuICAgICAgaWYgKG5hdmlnYXRvci53ZWJraXRHZXRVc2VyTWVkaWEpIHtcbiAgICAgICAgbmF2aWdhdG9yLmdldFVzZXJNZWRpYSA9IG5hdmlnYXRvci53ZWJraXRHZXRVc2VyTWVkaWEuYmluZChuYXZpZ2F0b3IpO1xuICAgICAgfSBlbHNlIGlmIChuYXZpZ2F0b3IubWVkaWFEZXZpY2VzICYmXG4gICAgICAgICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEpIHtcbiAgICAgICAgbmF2aWdhdG9yLmdldFVzZXJNZWRpYSA9IGZ1bmN0aW9uKGNvbnN0cmFpbnRzLCBjYiwgZXJyY2IpIHtcbiAgICAgICAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYShjb25zdHJhaW50cylcbiAgICAgICAgICAudGhlbihjYiwgZXJyY2IpO1xuICAgICAgICB9LmJpbmQobmF2aWdhdG9yKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHNoaW1SVENJY2VTZXJ2ZXJVcmxzOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICAvLyBtaWdyYXRlIGZyb20gbm9uLXNwZWMgUlRDSWNlU2VydmVyLnVybCB0byBSVENJY2VTZXJ2ZXIudXJsc1xuICAgIHZhciBPcmlnUGVlckNvbm5lY3Rpb24gPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb247XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uID0gZnVuY3Rpb24ocGNDb25maWcsIHBjQ29uc3RyYWludHMpIHtcbiAgICAgIGlmIChwY0NvbmZpZyAmJiBwY0NvbmZpZy5pY2VTZXJ2ZXJzKSB7XG4gICAgICAgIHZhciBuZXdJY2VTZXJ2ZXJzID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGNDb25maWcuaWNlU2VydmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBzZXJ2ZXIgPSBwY0NvbmZpZy5pY2VTZXJ2ZXJzW2ldO1xuICAgICAgICAgIGlmICghc2VydmVyLmhhc093blByb3BlcnR5KCd1cmxzJykgJiZcbiAgICAgICAgICAgICAgc2VydmVyLmhhc093blByb3BlcnR5KCd1cmwnKSkge1xuICAgICAgICAgICAgdXRpbHMuZGVwcmVjYXRlZCgnUlRDSWNlU2VydmVyLnVybCcsICdSVENJY2VTZXJ2ZXIudXJscycpO1xuICAgICAgICAgICAgc2VydmVyID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShzZXJ2ZXIpKTtcbiAgICAgICAgICAgIHNlcnZlci51cmxzID0gc2VydmVyLnVybDtcbiAgICAgICAgICAgIGRlbGV0ZSBzZXJ2ZXIudXJsO1xuICAgICAgICAgICAgbmV3SWNlU2VydmVycy5wdXNoKHNlcnZlcik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld0ljZVNlcnZlcnMucHVzaChwY0NvbmZpZy5pY2VTZXJ2ZXJzW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcGNDb25maWcuaWNlU2VydmVycyA9IG5ld0ljZVNlcnZlcnM7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IE9yaWdQZWVyQ29ubmVjdGlvbihwY0NvbmZpZywgcGNDb25zdHJhaW50cyk7XG4gICAgfTtcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlID0gT3JpZ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZTtcbiAgICAvLyB3cmFwIHN0YXRpYyBtZXRob2RzLiBDdXJyZW50bHkganVzdCBnZW5lcmF0ZUNlcnRpZmljYXRlLlxuICAgIGlmICgnZ2VuZXJhdGVDZXJ0aWZpY2F0ZScgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLCAnZ2VuZXJhdGVDZXJ0aWZpY2F0ZScsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gT3JpZ1BlZXJDb25uZWN0aW9uLmdlbmVyYXRlQ2VydGlmaWNhdGU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgc2hpbVRyYWNrRXZlbnRUcmFuc2NlaXZlcjogZnVuY3Rpb24od2luZG93KSB7XG4gICAgLy8gQWRkIGV2ZW50LnRyYW5zY2VpdmVyIG1lbWJlciBvdmVyIGRlcHJlY2F0ZWQgZXZlbnQucmVjZWl2ZXJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uICYmXG4gICAgICAgICgncmVjZWl2ZXInIGluIHdpbmRvdy5SVENUcmFja0V2ZW50LnByb3RvdHlwZSkgJiZcbiAgICAgICAgLy8gY2FuJ3QgY2hlY2sgJ3RyYW5zY2VpdmVyJyBpbiB3aW5kb3cuUlRDVHJhY2tFdmVudC5wcm90b3R5cGUsIGFzIGl0IGlzXG4gICAgICAgIC8vIGRlZmluZWQgZm9yIHNvbWUgcmVhc29uIGV2ZW4gd2hlbiB3aW5kb3cuUlRDVHJhbnNjZWl2ZXIgaXMgbm90LlxuICAgICAgICAhd2luZG93LlJUQ1RyYW5zY2VpdmVyKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1RyYWNrRXZlbnQucHJvdG90eXBlLCAndHJhbnNjZWl2ZXInLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHtyZWNlaXZlcjogdGhpcy5yZWNlaXZlcn07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICBzaGltQ3JlYXRlT2ZmZXJMZWdhY3k6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIHZhciBvcmlnQ3JlYXRlT2ZmZXIgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmNyZWF0ZU9mZmVyO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlT2ZmZXIgPSBmdW5jdGlvbihvZmZlck9wdGlvbnMpIHtcbiAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICBpZiAob2ZmZXJPcHRpb25zKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW8gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgLy8gc3VwcG9ydCBiaXQgdmFsdWVzXG4gICAgICAgICAgb2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW8gPSAhIW9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZUF1ZGlvO1xuICAgICAgICB9XG4gICAgICAgIHZhciBhdWRpb1RyYW5zY2VpdmVyID0gcGMuZ2V0VHJhbnNjZWl2ZXJzKCkuZmluZChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xuICAgICAgICAgIHJldHVybiB0cmFuc2NlaXZlci5zZW5kZXIudHJhY2sgJiZcbiAgICAgICAgICAgICAgdHJhbnNjZWl2ZXIuc2VuZGVyLnRyYWNrLmtpbmQgPT09ICdhdWRpbyc7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW8gPT09IGZhbHNlICYmIGF1ZGlvVHJhbnNjZWl2ZXIpIHtcbiAgICAgICAgICBpZiAoYXVkaW9UcmFuc2NlaXZlci5kaXJlY3Rpb24gPT09ICdzZW5kcmVjdicpIHtcbiAgICAgICAgICAgIGlmIChhdWRpb1RyYW5zY2VpdmVyLnNldERpcmVjdGlvbikge1xuICAgICAgICAgICAgICBhdWRpb1RyYW5zY2VpdmVyLnNldERpcmVjdGlvbignc2VuZG9ubHknKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGF1ZGlvVHJhbnNjZWl2ZXIuZGlyZWN0aW9uID0gJ3NlbmRvbmx5JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGF1ZGlvVHJhbnNjZWl2ZXIuZGlyZWN0aW9uID09PSAncmVjdm9ubHknKSB7XG4gICAgICAgICAgICBpZiAoYXVkaW9UcmFuc2NlaXZlci5zZXREaXJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgYXVkaW9UcmFuc2NlaXZlci5zZXREaXJlY3Rpb24oJ2luYWN0aXZlJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBhdWRpb1RyYW5zY2VpdmVyLmRpcmVjdGlvbiA9ICdpbmFjdGl2ZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZUF1ZGlvID09PSB0cnVlICYmXG4gICAgICAgICAgICAhYXVkaW9UcmFuc2NlaXZlcikge1xuICAgICAgICAgIHBjLmFkZFRyYW5zY2VpdmVyKCdhdWRpbycpO1xuICAgICAgICB9XG5cblxuICAgICAgICBpZiAodHlwZW9mIG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZUF1ZGlvICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIC8vIHN1cHBvcnQgYml0IHZhbHVlc1xuICAgICAgICAgIG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvID0gISFvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVWaWRlbztcbiAgICAgICAgfVxuICAgICAgICB2YXIgdmlkZW9UcmFuc2NlaXZlciA9IHBjLmdldFRyYW5zY2VpdmVycygpLmZpbmQoZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcbiAgICAgICAgICByZXR1cm4gdHJhbnNjZWl2ZXIuc2VuZGVyLnRyYWNrICYmXG4gICAgICAgICAgICAgIHRyYW5zY2VpdmVyLnNlbmRlci50cmFjay5raW5kID09PSAndmlkZW8nO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvID09PSBmYWxzZSAmJiB2aWRlb1RyYW5zY2VpdmVyKSB7XG4gICAgICAgICAgaWYgKHZpZGVvVHJhbnNjZWl2ZXIuZGlyZWN0aW9uID09PSAnc2VuZHJlY3YnKSB7XG4gICAgICAgICAgICB2aWRlb1RyYW5zY2VpdmVyLnNldERpcmVjdGlvbignc2VuZG9ubHknKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHZpZGVvVHJhbnNjZWl2ZXIuZGlyZWN0aW9uID09PSAncmVjdm9ubHknKSB7XG4gICAgICAgICAgICB2aWRlb1RyYW5zY2VpdmVyLnNldERpcmVjdGlvbignaW5hY3RpdmUnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlVmlkZW8gPT09IHRydWUgJiZcbiAgICAgICAgICAgICF2aWRlb1RyYW5zY2VpdmVyKSB7XG4gICAgICAgICAgcGMuYWRkVHJhbnNjZWl2ZXIoJ3ZpZGVvJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBvcmlnQ3JlYXRlT2ZmZXIuYXBwbHkocGMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfVxufTtcblxufSx7XCIuLi91dGlsc1wiOjEzfV0sMTM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLypcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcbiAqICB0cmVlLlxuICovXG4gLyogZXNsaW50LWVudiBub2RlICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBsb2dEaXNhYmxlZF8gPSB0cnVlO1xudmFyIGRlcHJlY2F0aW9uV2FybmluZ3NfID0gdHJ1ZTtcblxuLyoqXG4gKiBFeHRyYWN0IGJyb3dzZXIgdmVyc2lvbiBvdXQgb2YgdGhlIHByb3ZpZGVkIHVzZXIgYWdlbnQgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7IXN0cmluZ30gdWFzdHJpbmcgdXNlckFnZW50IHN0cmluZy5cbiAqIEBwYXJhbSB7IXN0cmluZ30gZXhwciBSZWd1bGFyIGV4cHJlc3Npb24gdXNlZCBhcyBtYXRjaCBjcml0ZXJpYS5cbiAqIEBwYXJhbSB7IW51bWJlcn0gcG9zIHBvc2l0aW9uIGluIHRoZSB2ZXJzaW9uIHN0cmluZyB0byBiZSByZXR1cm5lZC5cbiAqIEByZXR1cm4geyFudW1iZXJ9IGJyb3dzZXIgdmVyc2lvbi5cbiAqL1xuZnVuY3Rpb24gZXh0cmFjdFZlcnNpb24odWFzdHJpbmcsIGV4cHIsIHBvcykge1xuICB2YXIgbWF0Y2ggPSB1YXN0cmluZy5tYXRjaChleHByKTtcbiAgcmV0dXJuIG1hdGNoICYmIG1hdGNoLmxlbmd0aCA+PSBwb3MgJiYgcGFyc2VJbnQobWF0Y2hbcG9zXSwgMTApO1xufVxuXG4vLyBXcmFwcyB0aGUgcGVlcmNvbm5lY3Rpb24gZXZlbnQgZXZlbnROYW1lVG9XcmFwIGluIGEgZnVuY3Rpb25cbi8vIHdoaWNoIHJldHVybnMgdGhlIG1vZGlmaWVkIGV2ZW50IG9iamVjdC5cbmZ1bmN0aW9uIHdyYXBQZWVyQ29ubmVjdGlvbkV2ZW50KHdpbmRvdywgZXZlbnROYW1lVG9XcmFwLCB3cmFwcGVyKSB7XG4gIGlmICghd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBwcm90byA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGU7XG4gIHZhciBuYXRpdmVBZGRFdmVudExpc3RlbmVyID0gcHJvdG8uYWRkRXZlbnRMaXN0ZW5lcjtcbiAgcHJvdG8uYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKG5hdGl2ZUV2ZW50TmFtZSwgY2IpIHtcbiAgICBpZiAobmF0aXZlRXZlbnROYW1lICE9PSBldmVudE5hbWVUb1dyYXApIHtcbiAgICAgIHJldHVybiBuYXRpdmVBZGRFdmVudExpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICAgIHZhciB3cmFwcGVkQ2FsbGJhY2sgPSBmdW5jdGlvbihlKSB7XG4gICAgICBjYih3cmFwcGVyKGUpKTtcbiAgICB9O1xuICAgIHRoaXMuX2V2ZW50TWFwID0gdGhpcy5fZXZlbnRNYXAgfHwge307XG4gICAgdGhpcy5fZXZlbnRNYXBbY2JdID0gd3JhcHBlZENhbGxiYWNrO1xuICAgIHJldHVybiBuYXRpdmVBZGRFdmVudExpc3RlbmVyLmFwcGx5KHRoaXMsIFtuYXRpdmVFdmVudE5hbWUsXG4gICAgICB3cmFwcGVkQ2FsbGJhY2tdKTtcbiAgfTtcblxuICB2YXIgbmF0aXZlUmVtb3ZlRXZlbnRMaXN0ZW5lciA9IHByb3RvLnJlbW92ZUV2ZW50TGlzdGVuZXI7XG4gIHByb3RvLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihuYXRpdmVFdmVudE5hbWUsIGNiKSB7XG4gICAgaWYgKG5hdGl2ZUV2ZW50TmFtZSAhPT0gZXZlbnROYW1lVG9XcmFwIHx8ICF0aGlzLl9ldmVudE1hcFxuICAgICAgICB8fCAhdGhpcy5fZXZlbnRNYXBbY2JdKSB7XG4gICAgICByZXR1cm4gbmF0aXZlUmVtb3ZlRXZlbnRMaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgICB2YXIgdW53cmFwcGVkQ2IgPSB0aGlzLl9ldmVudE1hcFtjYl07XG4gICAgZGVsZXRlIHRoaXMuX2V2ZW50TWFwW2NiXTtcbiAgICByZXR1cm4gbmF0aXZlUmVtb3ZlRXZlbnRMaXN0ZW5lci5hcHBseSh0aGlzLCBbbmF0aXZlRXZlbnROYW1lLFxuICAgICAgdW53cmFwcGVkQ2JdKTtcbiAgfTtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICdvbicgKyBldmVudE5hbWVUb1dyYXAsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXNbJ19vbicgKyBldmVudE5hbWVUb1dyYXBdO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbihjYikge1xuICAgICAgaWYgKHRoaXNbJ19vbicgKyBldmVudE5hbWVUb1dyYXBdKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWVUb1dyYXAsXG4gICAgICAgICAgICB0aGlzWydfb24nICsgZXZlbnROYW1lVG9XcmFwXSk7XG4gICAgICAgIGRlbGV0ZSB0aGlzWydfb24nICsgZXZlbnROYW1lVG9XcmFwXTtcbiAgICAgIH1cbiAgICAgIGlmIChjYikge1xuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lVG9XcmFwLFxuICAgICAgICAgICAgdGhpc1snX29uJyArIGV2ZW50TmFtZVRvV3JhcF0gPSBjYik7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cblxuLy8gVXRpbGl0eSBtZXRob2RzLlxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGV4dHJhY3RWZXJzaW9uOiBleHRyYWN0VmVyc2lvbixcbiAgd3JhcFBlZXJDb25uZWN0aW9uRXZlbnQ6IHdyYXBQZWVyQ29ubmVjdGlvbkV2ZW50LFxuICBkaXNhYmxlTG9nOiBmdW5jdGlvbihib29sKSB7XG4gICAgaWYgKHR5cGVvZiBib29sICE9PSAnYm9vbGVhbicpIHtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoJ0FyZ3VtZW50IHR5cGU6ICcgKyB0eXBlb2YgYm9vbCArXG4gICAgICAgICAgJy4gUGxlYXNlIHVzZSBhIGJvb2xlYW4uJyk7XG4gICAgfVxuICAgIGxvZ0Rpc2FibGVkXyA9IGJvb2w7XG4gICAgcmV0dXJuIChib29sKSA/ICdhZGFwdGVyLmpzIGxvZ2dpbmcgZGlzYWJsZWQnIDpcbiAgICAgICAgJ2FkYXB0ZXIuanMgbG9nZ2luZyBlbmFibGVkJztcbiAgfSxcblxuICAvKipcbiAgICogRGlzYWJsZSBvciBlbmFibGUgZGVwcmVjYXRpb24gd2FybmluZ3NcbiAgICogQHBhcmFtIHshYm9vbGVhbn0gYm9vbCBzZXQgdG8gdHJ1ZSB0byBkaXNhYmxlIHdhcm5pbmdzLlxuICAgKi9cbiAgZGlzYWJsZVdhcm5pbmdzOiBmdW5jdGlvbihib29sKSB7XG4gICAgaWYgKHR5cGVvZiBib29sICE9PSAnYm9vbGVhbicpIHtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoJ0FyZ3VtZW50IHR5cGU6ICcgKyB0eXBlb2YgYm9vbCArXG4gICAgICAgICAgJy4gUGxlYXNlIHVzZSBhIGJvb2xlYW4uJyk7XG4gICAgfVxuICAgIGRlcHJlY2F0aW9uV2FybmluZ3NfID0gIWJvb2w7XG4gICAgcmV0dXJuICdhZGFwdGVyLmpzIGRlcHJlY2F0aW9uIHdhcm5pbmdzICcgKyAoYm9vbCA/ICdkaXNhYmxlZCcgOiAnZW5hYmxlZCcpO1xuICB9LFxuXG4gIGxvZzogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAobG9nRGlzYWJsZWRfKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGNvbnNvbGUubG9nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBTaG93cyBhIGRlcHJlY2F0aW9uIHdhcm5pbmcgc3VnZ2VzdGluZyB0aGUgbW9kZXJuIGFuZCBzcGVjLWNvbXBhdGlibGUgQVBJLlxuICAgKi9cbiAgZGVwcmVjYXRlZDogZnVuY3Rpb24ob2xkTWV0aG9kLCBuZXdNZXRob2QpIHtcbiAgICBpZiAoIWRlcHJlY2F0aW9uV2FybmluZ3NfKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnNvbGUud2FybihvbGRNZXRob2QgKyAnIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgJyArIG5ld01ldGhvZCArXG4gICAgICAgICcgaW5zdGVhZC4nKTtcbiAgfSxcblxuICAvKipcbiAgICogQnJvd3NlciBkZXRlY3Rvci5cbiAgICpcbiAgICogQHJldHVybiB7b2JqZWN0fSByZXN1bHQgY29udGFpbmluZyBicm93c2VyIGFuZCB2ZXJzaW9uXG4gICAqICAgICBwcm9wZXJ0aWVzLlxuICAgKi9cbiAgZGV0ZWN0QnJvd3NlcjogZnVuY3Rpb24od2luZG93KSB7XG4gICAgdmFyIG5hdmlnYXRvciA9IHdpbmRvdyAmJiB3aW5kb3cubmF2aWdhdG9yO1xuXG4gICAgLy8gUmV0dXJuZWQgcmVzdWx0IG9iamVjdC5cbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgcmVzdWx0LmJyb3dzZXIgPSBudWxsO1xuICAgIHJlc3VsdC52ZXJzaW9uID0gbnVsbDtcblxuICAgIC8vIEZhaWwgZWFybHkgaWYgaXQncyBub3QgYSBicm93c2VyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnIHx8ICF3aW5kb3cubmF2aWdhdG9yKSB7XG4gICAgICByZXN1bHQuYnJvd3NlciA9ICdOb3QgYSBicm93c2VyLic7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGlmIChuYXZpZ2F0b3IubW96R2V0VXNlck1lZGlhKSB7IC8vIEZpcmVmb3guXG4gICAgICByZXN1bHQuYnJvd3NlciA9ICdmaXJlZm94JztcbiAgICAgIHJlc3VsdC52ZXJzaW9uID0gZXh0cmFjdFZlcnNpb24obmF2aWdhdG9yLnVzZXJBZ2VudCxcbiAgICAgICAgICAvRmlyZWZveFxcLyhcXGQrKVxcLi8sIDEpO1xuICAgIH0gZWxzZSBpZiAobmF2aWdhdG9yLndlYmtpdEdldFVzZXJNZWRpYSkge1xuICAgICAgLy8gQ2hyb21lLCBDaHJvbWl1bSwgV2VidmlldywgT3BlcmEuXG4gICAgICAvLyBWZXJzaW9uIG1hdGNoZXMgQ2hyb21lL1dlYlJUQyB2ZXJzaW9uLlxuICAgICAgcmVzdWx0LmJyb3dzZXIgPSAnY2hyb21lJztcbiAgICAgIHJlc3VsdC52ZXJzaW9uID0gZXh0cmFjdFZlcnNpb24obmF2aWdhdG9yLnVzZXJBZ2VudCxcbiAgICAgICAgICAvQ2hyb20oZXxpdW0pXFwvKFxcZCspXFwuLywgMik7XG4gICAgfSBlbHNlIGlmIChuYXZpZ2F0b3IubWVkaWFEZXZpY2VzICYmXG4gICAgICAgIG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0VkZ2VcXC8oXFxkKykuKFxcZCspJC8pKSB7IC8vIEVkZ2UuXG4gICAgICByZXN1bHQuYnJvd3NlciA9ICdlZGdlJztcbiAgICAgIHJlc3VsdC52ZXJzaW9uID0gZXh0cmFjdFZlcnNpb24obmF2aWdhdG9yLnVzZXJBZ2VudCxcbiAgICAgICAgICAvRWRnZVxcLyhcXGQrKS4oXFxkKykkLywgMik7XG4gICAgfSBlbHNlIGlmICh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gJiZcbiAgICAgICAgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQXBwbGVXZWJLaXRcXC8oXFxkKylcXC4vKSkgeyAvLyBTYWZhcmkuXG4gICAgICByZXN1bHQuYnJvd3NlciA9ICdzYWZhcmknO1xuICAgICAgcmVzdWx0LnZlcnNpb24gPSBleHRyYWN0VmVyc2lvbihuYXZpZ2F0b3IudXNlckFnZW50LFxuICAgICAgICAgIC9BcHBsZVdlYktpdFxcLyhcXGQrKVxcLi8sIDEpO1xuICAgIH0gZWxzZSB7IC8vIERlZmF1bHQgZmFsbHRocm91Z2g6IG5vdCBzdXBwb3J0ZWQuXG4gICAgICByZXN1bHQuYnJvd3NlciA9ICdOb3QgYSBzdXBwb3J0ZWQgYnJvd3Nlci4nO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59O1xuXG59LHt9XX0se30sWzNdKSgzKVxufSk7Il0sInNvdXJjZVJvb3QiOiIifQ==