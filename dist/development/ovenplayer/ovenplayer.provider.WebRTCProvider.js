/*! OvenPlayerv0.9.491 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
                that.play();
            };

            var resetCallback = function resetCallback() {
                that.pause();
            };

            webrtcLoader = (0, _WebRTCLoader2["default"])(that, source.file, resetCallback, loadCallback, _utils.errorTrigger);

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

var WebRTCLoader = function WebRTCLoader(provider, webSocketUrl, resetCallback, loadCallback, errorTrigger) {

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

    function addIceCandidate(peerConnection, candidates) {

        for (var i = 0; i < candidates.length; i++) {
            if (candidates[i] && candidates[i].candidate) {

                peerConnection.addIceCandidate(new RTCIceCandidate(candidates[i])).then(function () {
                    OvenPlayerConsole.log("addIceCandidate : success");
                })["catch"](function (error) {
                    var tempError = _constants.ERRORS[_constants.PLAYER_WEBRTC_ADD_ICECANDIDATE_ERROR];
                    tempError.error = error;
                    closePeer(tempError);
                });
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

                        resetCallback();

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
                var tempError = _constants.ERRORS[_constants.PLAYER_WEBRTC_WS_ERROR];
                tempError.error = error;
                closePeer(tempError);
                reject(error);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9XZWJSVEMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvV2ViUlRDTG9hZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9hZGFwdGVyLmpzIl0sIm5hbWVzIjpbIldlYlJUQyIsImVsZW1lbnQiLCJwbGF5ZXJDb25maWciLCJhZFRhZ1VybCIsInRoYXQiLCJ3ZWJydGNMb2FkZXIiLCJzdXBlckRlc3Ryb3lfZnVuYyIsInNwZWMiLCJuYW1lIiwiUFJPVklERVJfV0VCUlRDIiwibXNlIiwibGlzdGVuZXIiLCJjYW5TZWVrIiwiaXNMaXZlIiwic2Vla2luZyIsInN0YXRlIiwiU1RBVEVfSURMRSIsImJ1ZmZlciIsImZyYW1lcmF0ZSIsImN1cnJlbnRRdWFsaXR5IiwiY3VycmVudFNvdXJjZSIsInF1YWxpdHlMZXZlbHMiLCJzb3VyY2VzIiwic291cmNlIiwiZmlsZSIsInR5cGUiLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImRlc3Ryb3kiLCJsb2FkQ2FsbGJhY2siLCJzdHJlYW0iLCJzcmNPYmplY3QiLCJwbGF5IiwicmVzZXRDYWxsYmFjayIsInBhdXNlIiwiZXJyb3JUcmlnZ2VyIiwiY29ubmVjdCIsImVycm9yIiwiV2ViUlRDTG9hZGVyIiwicHJvdmlkZXIiLCJ3ZWJTb2NrZXRVcmwiLCJwZWVyQ29ubmVjdGlvbkNvbmZpZyIsIndzIiwibWFpblN0cmVhbSIsIm1haW5QZWVyQ29ubmVjdGlvbkluZm8iLCJjbGllbnRQZWVyQ29ubmVjdGlvbnMiLCJ3c0Nsb3NlZEJ5UGxheWVyIiwic3RhdGlzdGljc1RpbWVyIiwiZXhpc3RpbmdIYW5kbGVyIiwid2luZG93Iiwib25iZWZvcmV1bmxvYWQiLCJldmVudCIsImNsb3NlUGVlciIsImdldFBlZXJDb25uZWN0aW9uQnlJZCIsImlkIiwicGVlckNvbm5lY3Rpb24iLCJleHRyYWN0TG9zc1BhY2tldHNPbk5ldHdvcmtTdGF0dXMiLCJwZWVyQ29ubmVjdGlvbkluZm8iLCJzdGF0dXMiLCJsb3N0UGFja2V0c0FyciIsInNsb3RMZW5ndGgiLCJwcmV2UGFja2V0c0xvc3QiLCJhdmc4TG9zc2VzIiwiYXZnTW9yZVRoYW5UaHJlc2hvbGRDb3VudCIsInRocmVzaG9sZCIsInNldFRpbWVvdXQiLCJnZXRTdGF0cyIsInRoZW4iLCJzdGF0cyIsImZvckVhY2giLCJpc1JlbW90ZSIsInB1c2giLCJwYXJzZUludCIsInBhY2tldHNMb3N0IiwibGVuZ3RoIiwic2xpY2UiLCJfIiwicmVkdWNlIiwibWVtbyIsIm51bSIsIk5FVFdPUktfVU5TVEFCTEVEIiwiY3JlYXRlTWFpblBlZXJDb25uZWN0aW9uIiwicGVlcklkIiwic2RwIiwiY2FuZGlkYXRlcyIsInJlc29sdmUiLCJSVENQZWVyQ29ubmVjdGlvbiIsInNldFJlbW90ZURlc2NyaXB0aW9uIiwiUlRDU2Vzc2lvbkRlc2NyaXB0aW9uIiwiY3JlYXRlQW5zd2VyIiwiZGVzYyIsInNldExvY2FsRGVzY3JpcHRpb24iLCJsb2NhbFNEUCIsImxvY2FsRGVzY3JpcHRpb24iLCJzZW5kTWVzc2FnZSIsInBlZXJfaWQiLCJjb21tYW5kIiwidGVtcEVycm9yIiwiRVJST1JTIiwiUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUiIsIlBMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUiIsIlBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SIiwiYWRkSWNlQ2FuZGlkYXRlIiwib25pY2VjYW5kaWRhdGUiLCJlIiwiY2FuZGlkYXRlIiwib250cmFjayIsInN0cmVhbXMiLCJjcmVhdGVDbGllbnRQZWVyQ29ubmVjdGlvbiIsImhvc3RJZCIsImNsaWVudElkIiwiYWRkU3RyZWFtIiwiY3JlYXRlT2ZmZXIiLCJzZXRMb2NhbEFuZFNlbmRNZXNzYWdlIiwiaGFuZGxlQ3JlYXRlT2ZmZXJFcnJvciIsInNlc3Npb25EZXNjcmlwdGlvbiIsImkiLCJSVENJY2VDYW5kaWRhdGUiLCJQTEFZRVJfV0VCUlRDX0FERF9JQ0VDQU5ESURBVEVfRVJST1IiLCJpbml0V2ViU29ja2V0IiwicmVqZWN0IiwiV2ViU29ja2V0Iiwib25vcGVuIiwib25tZXNzYWdlIiwibWVzc2FnZSIsIkpTT04iLCJwYXJzZSIsImRhdGEiLCJQTEFZRVJfV0VCUlRDX1dTX0VSUk9SIiwidHJpZ2dlciIsIk9NRV9QMlBfTU9ERSIsInBlZXJDb25uZWN0aW9uMSIsInBlZXJDb25uZWN0aW9uMiIsInBlZXJDb25uZWN0aW9uMyIsImNsb3NlIiwib25jbG9zZSIsIm9uZXJyb3IiLCJjb25zb2xlIiwiaW5pdGlhbGl6ZSIsIlByb21pc2UiLCJyZWFkeVN0YXRlIiwiY2xlYXJUaW1lb3V0IiwiT2JqZWN0Iiwia2V5cyIsImNsaWVudFBlZXJDb25uZWN0aW9uIiwic2VuZCIsInN0cmluZ2lmeSIsImYiLCJleHBvcnRzIiwibW9kdWxlIiwiZGVmaW5lIiwidCIsIm4iLCJyIiwicyIsIm8iLCJ1IiwiYSIsInJlcXVpcmUiLCJFcnJvciIsImNvZGUiLCJsIiwiY2FsbCIsIlNEUFV0aWxzIiwid3JpdGVNZWRpYVNlY3Rpb24iLCJ0cmFuc2NlaXZlciIsImNhcHMiLCJkdGxzUm9sZSIsIndyaXRlUnRwRGVzY3JpcHRpb24iLCJraW5kIiwid3JpdGVJY2VQYXJhbWV0ZXJzIiwiaWNlR2F0aGVyZXIiLCJnZXRMb2NhbFBhcmFtZXRlcnMiLCJ3cml0ZUR0bHNQYXJhbWV0ZXJzIiwiZHRsc1RyYW5zcG9ydCIsIm1pZCIsInJ0cFNlbmRlciIsInJ0cFJlY2VpdmVyIiwidHJhY2tJZCIsIl9pbml0aWFsVHJhY2tJZCIsInRyYWNrIiwibXNpZCIsInNlbmRFbmNvZGluZ1BhcmFtZXRlcnMiLCJzc3JjIiwicnR4IiwibG9jYWxDTmFtZSIsImZpbHRlckljZVNlcnZlcnMiLCJpY2VTZXJ2ZXJzIiwiZWRnZVZlcnNpb24iLCJoYXNUdXJuIiwiZmlsdGVyIiwic2VydmVyIiwidXJscyIsInVybCIsIndhcm4iLCJpc1N0cmluZyIsInZhbGlkVHVybiIsImluZGV4T2YiLCJnZXRDb21tb25DYXBhYmlsaXRpZXMiLCJsb2NhbENhcGFiaWxpdGllcyIsInJlbW90ZUNhcGFiaWxpdGllcyIsImNvbW1vbkNhcGFiaWxpdGllcyIsImNvZGVjcyIsImhlYWRlckV4dGVuc2lvbnMiLCJmZWNNZWNoYW5pc21zIiwiZmluZENvZGVjQnlQYXlsb2FkVHlwZSIsInB0IiwicGF5bG9hZFR5cGUiLCJwcmVmZXJyZWRQYXlsb2FkVHlwZSIsInJ0eENhcGFiaWxpdHlNYXRjaGVzIiwibFJ0eCIsInJSdHgiLCJsQ29kZWNzIiwickNvZGVjcyIsImxDb2RlYyIsInBhcmFtZXRlcnMiLCJhcHQiLCJyQ29kZWMiLCJ0b0xvd2VyQ2FzZSIsImNsb2NrUmF0ZSIsIm51bUNoYW5uZWxzIiwiTWF0aCIsIm1pbiIsInJ0Y3BGZWVkYmFjayIsImZiIiwiaiIsInBhcmFtZXRlciIsImxIZWFkZXJFeHRlbnNpb24iLCJySGVhZGVyRXh0ZW5zaW9uIiwidXJpIiwiaXNBY3Rpb25BbGxvd2VkSW5TaWduYWxpbmdTdGF0ZSIsImFjdGlvbiIsInNpZ25hbGluZ1N0YXRlIiwib2ZmZXIiLCJhbnN3ZXIiLCJtYXliZUFkZENhbmRpZGF0ZSIsImljZVRyYW5zcG9ydCIsImFscmVhZHlBZGRlZCIsImdldFJlbW90ZUNhbmRpZGF0ZXMiLCJmaW5kIiwicmVtb3RlQ2FuZGlkYXRlIiwiZm91bmRhdGlvbiIsImlwIiwicG9ydCIsInByaW9yaXR5IiwicHJvdG9jb2wiLCJhZGRSZW1vdGVDYW5kaWRhdGUiLCJtYWtlRXJyb3IiLCJkZXNjcmlwdGlvbiIsIk5vdFN1cHBvcnRlZEVycm9yIiwiSW52YWxpZFN0YXRlRXJyb3IiLCJJbnZhbGlkQWNjZXNzRXJyb3IiLCJUeXBlRXJyb3IiLCJ1bmRlZmluZWQiLCJPcGVyYXRpb25FcnJvciIsImFkZFRyYWNrVG9TdHJlYW1BbmRGaXJlRXZlbnQiLCJhZGRUcmFjayIsImRpc3BhdGNoRXZlbnQiLCJNZWRpYVN0cmVhbVRyYWNrRXZlbnQiLCJyZW1vdmVUcmFja0Zyb21TdHJlYW1BbmRGaXJlRXZlbnQiLCJyZW1vdmVUcmFjayIsImZpcmVBZGRUcmFjayIsInBjIiwicmVjZWl2ZXIiLCJ0cmFja0V2ZW50IiwiRXZlbnQiLCJfZGlzcGF0Y2hFdmVudCIsImNvbmZpZyIsIl9ldmVudFRhcmdldCIsImRvY3VtZW50IiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsIm1ldGhvZCIsImJpbmQiLCJjYW5Ucmlja2xlSWNlQ2FuZGlkYXRlcyIsIm5lZWROZWdvdGlhdGlvbiIsImxvY2FsU3RyZWFtcyIsInJlbW90ZVN0cmVhbXMiLCJyZW1vdGVEZXNjcmlwdGlvbiIsImljZUNvbm5lY3Rpb25TdGF0ZSIsImNvbm5lY3Rpb25TdGF0ZSIsImljZUdhdGhlcmluZ1N0YXRlIiwidXNpbmdCdW5kbGUiLCJidW5kbGVQb2xpY3kiLCJydGNwTXV4UG9saWN5IiwiaWNlVHJhbnNwb3J0UG9saWN5IiwiX2ljZUdhdGhlcmVycyIsImljZUNhbmRpZGF0ZVBvb2xTaXplIiwiUlRDSWNlR2F0aGVyZXIiLCJnYXRoZXJQb2xpY3kiLCJfY29uZmlnIiwidHJhbnNjZWl2ZXJzIiwiX3NkcFNlc3Npb25JZCIsImdlbmVyYXRlU2Vzc2lvbklkIiwiX3NkcFNlc3Npb25WZXJzaW9uIiwiX2R0bHNSb2xlIiwiX2lzQ2xvc2VkIiwicHJvdG90eXBlIiwib25hZGRzdHJlYW0iLCJvbnJlbW92ZXN0cmVhbSIsIm9uc2lnbmFsaW5nc3RhdGVjaGFuZ2UiLCJvbmljZWNvbm5lY3Rpb25zdGF0ZWNoYW5nZSIsIm9uY29ubmVjdGlvbnN0YXRlY2hhbmdlIiwib25pY2VnYXRoZXJpbmdzdGF0ZWNoYW5nZSIsIm9ubmVnb3RpYXRpb25uZWVkZWQiLCJvbmRhdGFjaGFubmVsIiwiX2VtaXRHYXRoZXJpbmdTdGF0ZUNoYW5nZSIsImdldENvbmZpZ3VyYXRpb24iLCJnZXRMb2NhbFN0cmVhbXMiLCJnZXRSZW1vdGVTdHJlYW1zIiwiX2NyZWF0ZVRyYW5zY2VpdmVyIiwiZG9Ob3RBZGQiLCJoYXNCdW5kbGVUcmFuc3BvcnQiLCJyZWN2RW5jb2RpbmdQYXJhbWV0ZXJzIiwiYXNzb2NpYXRlZFJlbW90ZU1lZGlhU3RyZWFtcyIsIndhbnRSZWNlaXZlIiwidHJhbnNwb3J0cyIsIl9jcmVhdGVJY2VBbmREdGxzVHJhbnNwb3J0cyIsImFscmVhZHlFeGlzdHMiLCJfbWF5YmVGaXJlTmVnb3RpYXRpb25OZWVkZWQiLCJSVENSdHBTZW5kZXIiLCJnZXRUcmFja3MiLCJjbG9uZWRTdHJlYW0iLCJjbG9uZSIsImlkeCIsImNsb25lZFRyYWNrIiwiYWRkRXZlbnRMaXN0ZW5lciIsImVuYWJsZWQiLCJzZW5kZXIiLCJzdG9wIiwibWFwIiwic3BsaWNlIiwicmVtb3ZlU3RyZWFtIiwiZ2V0U2VuZGVycyIsImdldFJlY2VpdmVycyIsIl9jcmVhdGVJY2VHYXRoZXJlciIsInNkcE1MaW5lSW5kZXgiLCJzaGlmdCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJ3cml0YWJsZSIsImJ1ZmZlcmVkQ2FuZGlkYXRlRXZlbnRzIiwiYnVmZmVyQ2FuZGlkYXRlcyIsImVuZCIsIl9nYXRoZXIiLCJvbmxvY2FsY2FuZGlkYXRlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImV2dCIsInNkcE1pZCIsImNhbmQiLCJjb21wb25lbnQiLCJ1ZnJhZyIsInVzZXJuYW1lRnJhZ21lbnQiLCJzZXJpYWxpemVkQ2FuZGlkYXRlIiwid3JpdGVDYW5kaWRhdGUiLCJwYXJzZUNhbmRpZGF0ZSIsInRvSlNPTiIsInNlY3Rpb25zIiwiZ2V0TWVkaWFTZWN0aW9ucyIsImdldERlc2NyaXB0aW9uIiwiam9pbiIsImNvbXBsZXRlIiwiZXZlcnkiLCJSVENJY2VUcmFuc3BvcnQiLCJvbmljZXN0YXRlY2hhbmdlIiwiX3VwZGF0ZUljZUNvbm5lY3Rpb25TdGF0ZSIsIl91cGRhdGVDb25uZWN0aW9uU3RhdGUiLCJSVENEdGxzVHJhbnNwb3J0Iiwib25kdGxzc3RhdGVjaGFuZ2UiLCJfZGlzcG9zZUljZUFuZER0bHNUcmFuc3BvcnRzIiwiX3RyYW5zY2VpdmUiLCJyZWN2IiwicGFyYW1zIiwiZW5jb2RpbmdzIiwicnRjcCIsImNuYW1lIiwiY29tcG91bmQiLCJydGNwUGFyYW1ldGVycyIsInAiLCJyZWNlaXZlIiwic2Vzc2lvbnBhcnQiLCJzcGxpdFNlY3Rpb25zIiwibWVkaWFTZWN0aW9uIiwicGFyc2VSdHBQYXJhbWV0ZXJzIiwiaXNJY2VMaXRlIiwibWF0Y2hQcmVmaXgiLCJyZWplY3RlZCIsImlzUmVqZWN0ZWQiLCJyZW1vdGVJY2VQYXJhbWV0ZXJzIiwiZ2V0SWNlUGFyYW1ldGVycyIsInJlbW90ZUR0bHNQYXJhbWV0ZXJzIiwiZ2V0RHRsc1BhcmFtZXRlcnMiLCJyb2xlIiwic3RhcnQiLCJfdXBkYXRlU2lnbmFsaW5nU3RhdGUiLCJyZWNlaXZlckxpc3QiLCJpY2VPcHRpb25zIiwic3Vic3RyIiwic3BsaXQiLCJsaW5lcyIsInNwbGl0TGluZXMiLCJnZXRLaW5kIiwiZGlyZWN0aW9uIiwiZ2V0RGlyZWN0aW9uIiwicmVtb3RlTXNpZCIsInBhcnNlTXNpZCIsImdldE1pZCIsImdlbmVyYXRlSWRlbnRpZmllciIsInBhcnNlUnRwRW5jb2RpbmdQYXJhbWV0ZXJzIiwicGFyc2VSdGNwUGFyYW1ldGVycyIsImlzQ29tcGxldGUiLCJjYW5kcyIsInNldFRyYW5zcG9ydCIsInNldFJlbW90ZUNhbmRpZGF0ZXMiLCJSVENSdHBSZWNlaXZlciIsImdldENhcGFiaWxpdGllcyIsImNvZGVjIiwiaXNOZXdUcmFjayIsIk1lZGlhU3RyZWFtIiwiZ2V0IiwibmF0aXZlVHJhY2siLCJzaWQiLCJpdGVtIiwibmV3U3RhdGUiLCJzdGF0ZXMiLCJjbG9zZWQiLCJjaGVja2luZyIsImNvbm5lY3RlZCIsImNvbXBsZXRlZCIsImRpc2Nvbm5lY3RlZCIsImZhaWxlZCIsImNvbm5lY3RpbmciLCJudW1BdWRpb1RyYWNrcyIsIm51bVZpZGVvVHJhY2tzIiwib2ZmZXJPcHRpb25zIiwiYXJndW1lbnRzIiwibWFuZGF0b3J5Iiwib3B0aW9uYWwiLCJvZmZlclRvUmVjZWl2ZUF1ZGlvIiwib2ZmZXJUb1JlY2VpdmVWaWRlbyIsIndyaXRlU2Vzc2lvbkJvaWxlcnBsYXRlIiwicmVtb3RlQ29kZWMiLCJoZHJFeHQiLCJyZW1vdGVFeHRlbnNpb25zIiwickhkckV4dCIsImdldExvY2FsQ2FuZGlkYXRlcyIsIm1lZGlhU2VjdGlvbnNJbk9mZmVyIiwibG9jYWxUcmFjayIsImdldEF1ZGlvVHJhY2tzIiwiZ2V0VmlkZW9UcmFja3MiLCJoYXNSdHgiLCJjIiwicmVkdWNlZFNpemUiLCJjYW5kaWRhdGVTdHJpbmciLCJ0cmltIiwicHJvbWlzZXMiLCJmaXhTdGF0c1R5cGUiLCJzdGF0IiwiaW5ib3VuZHJ0cCIsIm91dGJvdW5kcnRwIiwiY2FuZGlkYXRlcGFpciIsImxvY2FsY2FuZGlkYXRlIiwicmVtb3RlY2FuZGlkYXRlIiwicmVzdWx0cyIsIk1hcCIsImFsbCIsInJlcyIsInJlc3VsdCIsInNldCIsIm1ldGhvZHMiLCJuYXRpdmVNZXRob2QiLCJhcmdzIiwiYXBwbHkiLCJyYW5kb20iLCJ0b1N0cmluZyIsImJsb2IiLCJsaW5lIiwicGFydHMiLCJwYXJ0IiwiaW5kZXgiLCJwcmVmaXgiLCJzdWJzdHJpbmciLCJyZWxhdGVkQWRkcmVzcyIsInJlbGF0ZWRQb3J0IiwidGNwVHlwZSIsInRvVXBwZXJDYXNlIiwicGFyc2VJY2VPcHRpb25zIiwicGFyc2VSdHBNYXAiLCJwYXJzZWQiLCJ3cml0ZVJ0cE1hcCIsInBhcnNlRXh0bWFwIiwid3JpdGVFeHRtYXAiLCJoZWFkZXJFeHRlbnNpb24iLCJwcmVmZXJyZWRJZCIsInBhcnNlRm10cCIsImt2Iiwid3JpdGVGbXRwIiwicGFyYW0iLCJwYXJzZVJ0Y3BGYiIsIndyaXRlUnRjcEZiIiwicGFyc2VTc3JjTWVkaWEiLCJzcCIsImNvbG9uIiwiYXR0cmlidXRlIiwicGFyc2VGaW5nZXJwcmludCIsImFsZ29yaXRobSIsImZpbmdlcnByaW50cyIsInNldHVwVHlwZSIsImZwIiwiY29uY2F0IiwiaWNlUGFyYW1ldGVycyIsInBhc3N3b3JkIiwibWxpbmUiLCJydHBtYXBsaW5lIiwiZm10cHMiLCJtYXhwdGltZSIsImV4dGVuc2lvbiIsImVuY29kaW5nUGFyYW1ldGVycyIsImhhc1JlZCIsImhhc1VscGZlYyIsInNzcmNzIiwicHJpbWFyeVNzcmMiLCJzZWNvbmRhcnlTc3JjIiwiZmxvd3MiLCJlbmNQYXJhbSIsImNvZGVjUGF5bG9hZFR5cGUiLCJmZWMiLCJtZWNoYW5pc20iLCJiYW5kd2lkdGgiLCJtYXhCaXRyYXRlIiwicmVtb3RlU3NyYyIsIm9iaiIsInJzaXplIiwibXV4IiwicGxhbkIiLCJzZXNzSWQiLCJzZXNzVmVyIiwic2Vzc2lvbklkIiwidmVyc2lvbiIsInBhcnNlTUxpbmUiLCJmbXQiLCJwYXJzZU9MaW5lIiwidXNlcm5hbWUiLCJzZXNzaW9uVmVyc2lvbiIsIm5ldFR5cGUiLCJhZGRyZXNzVHlwZSIsImFkZHJlc3MiLCJnbG9iYWwiLCJhZGFwdGVyRmFjdG9yeSIsInNlbGYiLCJ1dGlscyIsImRlcGVuZGVuY2llcyIsIm9wdHMiLCJvcHRpb25zIiwic2hpbUNocm9tZSIsInNoaW1GaXJlZm94Iiwic2hpbUVkZ2UiLCJzaGltU2FmYXJpIiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJsb2dnaW5nIiwiYnJvd3NlckRldGFpbHMiLCJkZXRlY3RCcm93c2VyIiwiY2hyb21lU2hpbSIsImVkZ2VTaGltIiwiZmlyZWZveFNoaW0iLCJzYWZhcmlTaGltIiwiY29tbW9uU2hpbSIsImFkYXB0ZXIiLCJleHRyYWN0VmVyc2lvbiIsImRpc2FibGVMb2ciLCJkaXNhYmxlV2FybmluZ3MiLCJicm93c2VyIiwic2hpbVBlZXJDb25uZWN0aW9uIiwiYnJvd3NlclNoaW0iLCJzaGltQ3JlYXRlT2JqZWN0VVJMIiwic2hpbUdldFVzZXJNZWRpYSIsInNoaW1NZWRpYVN0cmVhbSIsInNoaW1Tb3VyY2VPYmplY3QiLCJzaGltT25UcmFjayIsInNoaW1BZGRUcmFja1JlbW92ZVRyYWNrIiwic2hpbUdldFNlbmRlcnNXaXRoRHRtZiIsInNoaW1SVENJY2VDYW5kaWRhdGUiLCJzaGltTWF4TWVzc2FnZVNpemUiLCJzaGltU2VuZFRocm93VHlwZUVycm9yIiwic2hpbVJlbW92ZVN0cmVhbSIsInNoaW1SZXBsYWNlVHJhY2siLCJzaGltUlRDSWNlU2VydmVyVXJscyIsInNoaW1DYWxsYmFja3NBUEkiLCJzaGltTG9jYWxTdHJlYW1zQVBJIiwic2hpbVJlbW90ZVN0cmVhbXNBUEkiLCJzaGltVHJhY2tFdmVudFRyYW5zY2VpdmVyIiwic2hpbUNyZWF0ZU9mZmVyTGVnYWN5Iiwid2Via2l0TWVkaWFTdHJlYW0iLCJfb250cmFjayIsIm9yaWdTZXRSZW1vdGVEZXNjcmlwdGlvbiIsIl9vbnRyYWNrcG9seSIsInRlIiwid3JhcFBlZXJDb25uZWN0aW9uRXZlbnQiLCJzaGltU2VuZGVyV2l0aER0bWYiLCJkdG1mIiwiX2R0bWYiLCJjcmVhdGVEVE1GU2VuZGVyIiwiX3BjIiwiX3NlbmRlcnMiLCJvcmlnQWRkVHJhY2siLCJvcmlnUmVtb3ZlVHJhY2siLCJvcmlnQWRkU3RyZWFtIiwib3JpZ1JlbW92ZVN0cmVhbSIsIm9yaWdHZXRTZW5kZXJzIiwic2VuZGVycyIsIlVSTCIsIkhUTUxNZWRpYUVsZW1lbnQiLCJfc3JjT2JqZWN0Iiwic3JjIiwicmV2b2tlT2JqZWN0VVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwic2hpbUFkZFRyYWNrUmVtb3ZlVHJhY2tXaXRoTmF0aXZlIiwiX3NoaW1tZWRMb2NhbFN0cmVhbXMiLCJzdHJlYW1JZCIsIkRPTUV4Y2VwdGlvbiIsImV4aXN0aW5nU2VuZGVycyIsIm5ld1NlbmRlcnMiLCJuZXdTZW5kZXIiLCJvcmlnR2V0TG9jYWxTdHJlYW1zIiwibmF0aXZlU3RyZWFtcyIsIl9yZXZlcnNlU3RyZWFtcyIsIl9zdHJlYW1zIiwibmV3U3RyZWFtIiwib2xkU3RyZWFtIiwicmVwbGFjZUludGVybmFsU3RyZWFtSWQiLCJpbnRlcm5hbElkIiwiZXh0ZXJuYWxTdHJlYW0iLCJpbnRlcm5hbFN0cmVhbSIsInJlcGxhY2UiLCJSZWdFeHAiLCJyZXBsYWNlRXh0ZXJuYWxTdHJlYW1JZCIsImlzTGVnYWN5Q2FsbCIsImVyciIsIm9yaWdTZXRMb2NhbERlc2NyaXB0aW9uIiwib3JpZ0xvY2FsRGVzY3JpcHRpb24iLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJpc0xvY2FsIiwic3RyZWFtaWQiLCJoYXNUcmFjayIsIndlYmtpdFJUQ1BlZXJDb25uZWN0aW9uIiwicGNDb25maWciLCJwY0NvbnN0cmFpbnRzIiwiaWNlVHJhbnNwb3J0cyIsImdlbmVyYXRlQ2VydGlmaWNhdGUiLCJPcmlnUGVlckNvbm5lY3Rpb24iLCJuZXdJY2VTZXJ2ZXJzIiwiZGVwcmVjYXRlZCIsIm9yaWdHZXRTdGF0cyIsInNlbGVjdG9yIiwic3VjY2Vzc0NhbGxiYWNrIiwiZXJyb3JDYWxsYmFjayIsImZpeENocm9tZVN0YXRzXyIsInJlc3BvbnNlIiwic3RhbmRhcmRSZXBvcnQiLCJyZXBvcnRzIiwicmVwb3J0Iiwic3RhbmRhcmRTdGF0cyIsInRpbWVzdGFtcCIsIm5hbWVzIiwibWFrZU1hcFN0YXRzIiwic3VjY2Vzc0NhbGxiYWNrV3JhcHBlcl8iLCJwcm9taXNlIiwibmF0aXZlQWRkSWNlQ2FuZGlkYXRlIiwibmF2aWdhdG9yIiwiY29uc3RyYWludHNUb0Nocm9tZV8iLCJjYyIsImlkZWFsIiwiZXhhY3QiLCJtYXgiLCJvbGRuYW1lXyIsImNoYXJBdCIsIm9jIiwibWl4IiwiYWR2YW5jZWQiLCJzaGltQ29uc3RyYWludHNfIiwiY29uc3RyYWludHMiLCJmdW5jIiwiYXVkaW8iLCJyZW1hcCIsImIiLCJ2aWRlbyIsImZhY2UiLCJmYWNpbmdNb2RlIiwiZ2V0U3VwcG9ydGVkRmFjaW5nTW9kZUxpZXMiLCJtZWRpYURldmljZXMiLCJnZXRTdXBwb3J0ZWRDb25zdHJhaW50cyIsIm1hdGNoZXMiLCJlbnVtZXJhdGVEZXZpY2VzIiwiZGV2aWNlcyIsImQiLCJkZXYiLCJzb21lIiwibWF0Y2giLCJsYWJlbCIsImRldmljZUlkIiwic2hpbUVycm9yXyIsIlBlcm1pc3Npb25EZW5pZWRFcnJvciIsIlBlcm1pc3Npb25EaXNtaXNzZWRFcnJvciIsIkRldmljZXNOb3RGb3VuZEVycm9yIiwiQ29uc3RyYWludE5vdFNhdGlzZmllZEVycm9yIiwiVHJhY2tTdGFydEVycm9yIiwiTWVkaWFEZXZpY2VGYWlsZWREdWVUb1NodXRkb3duIiwiTWVkaWFEZXZpY2VLaWxsU3dpdGNoT24iLCJUYWJDYXB0dXJlRXJyb3IiLCJTY3JlZW5DYXB0dXJlRXJyb3IiLCJEZXZpY2VDYXB0dXJlRXJyb3IiLCJjb25zdHJhaW50IiwiY29uc3RyYWludE5hbWUiLCJnZXRVc2VyTWVkaWFfIiwib25TdWNjZXNzIiwib25FcnJvciIsIndlYmtpdEdldFVzZXJNZWRpYSIsImdldFVzZXJNZWRpYSIsImdldFVzZXJNZWRpYVByb21pc2VfIiwia2luZHMiLCJNZWRpYVN0cmVhbVRyYWNrIiwiZ2V0U291cmNlcyIsImRldmljZSIsImdyb3VwSWQiLCJlY2hvQ2FuY2VsbGF0aW9uIiwiZnJhbWVSYXRlIiwiaGVpZ2h0Iiwid2lkdGgiLCJvcmlnR2V0VXNlck1lZGlhIiwiY3MiLCJOYXRpdmVSVENJY2VDYW5kaWRhdGUiLCJuYXRpdmVDYW5kaWRhdGUiLCJwYXJzZWRDYW5kaWRhdGUiLCJhdWdtZW50ZWRDYW5kaWRhdGUiLCJuYXRpdmVDcmVhdGVPYmplY3RVUkwiLCJuYXRpdmVSZXZva2VPYmplY3RVUkwiLCJuZXdJZCIsImRzYyIsIm5hdGl2ZVNldEF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsIlJUQ1NjdHBUcmFuc3BvcnQiLCJfc2N0cCIsInNjdHBJbkRlc2NyaXB0aW9uIiwibUxpbmUiLCJnZXRSZW1vdGVGaXJlZm94VmVyc2lvbiIsImdldENhblNlbmRNYXhNZXNzYWdlU2l6ZSIsInJlbW90ZUlzRmlyZWZveCIsImNhblNlbmRNYXhNZXNzYWdlU2l6ZSIsImdldE1heE1lc3NhZ2VTaXplIiwibWF4TWVzc2FnZVNpemUiLCJpc0ZpcmVmb3giLCJjYW5TZW5kTU1TIiwicmVtb3RlTU1TIiwiTnVtYmVyIiwiUE9TSVRJVkVfSU5GSU5JVFkiLCJzY3RwIiwib3JpZ0NyZWF0ZURhdGFDaGFubmVsIiwiY3JlYXRlRGF0YUNoYW5uZWwiLCJkYXRhQ2hhbm5lbCIsIm9yaWdEYXRhQ2hhbm5lbFNlbmQiLCJkYyIsInNpemUiLCJieXRlTGVuZ3RoIiwic2hpbVJUQ1BlZXJDb25uZWN0aW9uIiwib3JpZ01TVEVuYWJsZWQiLCJldiIsIlJUQ0R0bWZTZW5kZXIiLCJSVENEVE1GU2VuZGVyIiwicmVwbGFjZVRyYWNrIiwic2V0VHJhY2siLCJSVENUcmFja0V2ZW50IiwibW96U3JjT2JqZWN0IiwibW96UlRDUGVlckNvbm5lY3Rpb24iLCJuZXdTZXJ2ZXIiLCJjcmVkZW50aWFsIiwibW96UlRDU2Vzc2lvbkRlc2NyaXB0aW9uIiwibW96UlRDSWNlQ2FuZGlkYXRlIiwibW9kZXJuU3RhdHNUeXBlcyIsIm5hdGl2ZUdldFN0YXRzIiwib25TdWNjIiwib25FcnIiLCJJbnRlcm5hbEVycm9yIiwiU2VjdXJpdHlFcnJvciIsImNvbnN0cmFpbnRzVG9GRjM3XyIsIm1vekdldFVzZXJNZWRpYSIsImluZm9zIiwib3JnRW51bWVyYXRlRGV2aWNlcyIsIm5hdGl2ZUdldFVzZXJNZWRpYSIsImdldFNldHRpbmdzIiwibmF0aXZlR2V0U2V0dGluZ3MiLCJhcHBseUNvbnN0cmFpbnRzIiwibmF0aXZlQXBwbHlDb25zdHJhaW50cyIsIl9sb2NhbFN0cmVhbXMiLCJnZXRTdHJlYW1CeUlkIiwiX3JlbW90ZVN0cmVhbXMiLCJfYWRkVHJhY2siLCJ0cmFja3MiLCJfb25hZGRzdHJlYW0iLCJfb25hZGRzdHJlYW1wb2x5IiwiZmFpbHVyZUNhbGxiYWNrIiwid2l0aENhbGxiYWNrIiwiY2IiLCJlcnJjYiIsIlJUQ1RyYW5zY2VpdmVyIiwib3JpZ0NyZWF0ZU9mZmVyIiwiYXVkaW9UcmFuc2NlaXZlciIsImdldFRyYW5zY2VpdmVycyIsInNldERpcmVjdGlvbiIsImFkZFRyYW5zY2VpdmVyIiwidmlkZW9UcmFuc2NlaXZlciIsImxvZ0Rpc2FibGVkXyIsImRlcHJlY2F0aW9uV2FybmluZ3NfIiwidWFzdHJpbmciLCJleHByIiwicG9zIiwiZXZlbnROYW1lVG9XcmFwIiwid3JhcHBlciIsInByb3RvIiwibmF0aXZlQWRkRXZlbnRMaXN0ZW5lciIsIm5hdGl2ZUV2ZW50TmFtZSIsIndyYXBwZWRDYWxsYmFjayIsIl9ldmVudE1hcCIsIm5hdGl2ZVJlbW92ZUV2ZW50TGlzdGVuZXIiLCJ1bndyYXBwZWRDYiIsImJvb2wiLCJvbGRNZXRob2QiLCJuZXdNZXRob2QiLCJ1c2VyQWdlbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7OztBQU1BLElBQU1BLFNBQVMsU0FBVEEsTUFBUyxDQUFTQyxPQUFULEVBQWtCQyxZQUFsQixFQUFnQ0MsUUFBaEMsRUFBeUM7QUFDcEQsUUFBSUMsT0FBTyxFQUFYO0FBQ0EsUUFBSUMsZUFBZSxJQUFuQjtBQUNBLFFBQUlDLG9CQUFxQixJQUF6Qjs7QUFFQSxRQUFJQyxPQUFPO0FBQ1BDLGNBQU9DLDBCQURBO0FBRVBSLGlCQUFVQSxPQUZIO0FBR1BTLGFBQU0sSUFIQztBQUlQQyxrQkFBVyxJQUpKO0FBS1BDLGlCQUFVLEtBTEg7QUFNUEMsZ0JBQVMsS0FORjtBQU9QQyxpQkFBVSxLQVBIO0FBUVBDLGVBQVFDLHFCQVJEO0FBU1BDLGdCQUFTLENBVEY7QUFVUEMsbUJBQVksQ0FWTDtBQVdQQyx3QkFBaUIsQ0FBQyxDQVhYO0FBWVBDLHVCQUFnQixDQUFDLENBWlY7QUFhUEMsdUJBQWdCLEVBYlQ7QUFjUEMsaUJBQVUsRUFkSDtBQWVQbkIsa0JBQVdBO0FBZkosS0FBWDs7QUFrQkFDLFdBQU8sMkJBQVNHLElBQVQsRUFBZUwsWUFBZixFQUE2QixVQUFTcUIsTUFBVCxFQUFnQjtBQUNoRCxZQUFHLHlCQUFTQSxPQUFPQyxJQUFoQixFQUFzQkQsT0FBT0UsSUFBN0IsQ0FBSCxFQUFzQztBQUNsQ0MsOEJBQWtCQyxHQUFsQixDQUFzQiwwQkFBdEIsRUFBa0RKLE1BQWxEO0FBQ0EsZ0JBQUdsQixZQUFILEVBQWdCO0FBQ1pBLDZCQUFhdUIsT0FBYjtBQUNBdkIsK0JBQWUsSUFBZjtBQUNIOztBQUVELGdCQUFJd0IsZUFBZSxTQUFmQSxZQUFlLENBQVNDLE1BQVQsRUFBZ0I7O0FBRS9CLG9CQUFJN0IsUUFBUThCLFNBQVosRUFBdUI7QUFDbkI5Qiw0QkFBUThCLFNBQVIsR0FBb0IsSUFBcEI7QUFDSDs7QUFFRDlCLHdCQUFROEIsU0FBUixHQUFvQkQsTUFBcEI7QUFDQTFCLHFCQUFLNEIsSUFBTDtBQUNILGFBUkQ7O0FBVUEsZ0JBQUlDLGdCQUFnQixTQUFoQkEsYUFBZ0IsR0FBWTtBQUM1QjdCLHFCQUFLOEIsS0FBTDtBQUNILGFBRkQ7O0FBSUE3QiwyQkFBZSwrQkFBYUQsSUFBYixFQUFtQm1CLE9BQU9DLElBQTFCLEVBQWdDUyxhQUFoQyxFQUErQ0osWUFBL0MsRUFBNkRNLG1CQUE3RCxDQUFmOztBQUVBOUIseUJBQWErQixPQUFiLFlBQTZCLFVBQVNDLEtBQVQsRUFBZTtBQUN4QztBQUNBO0FBQ0gsYUFIRDtBQUlIO0FBQ0osS0E3Qk0sQ0FBUDtBQThCQS9CLHdCQUFvQkYsY0FBVyxTQUFYLENBQXBCOztBQUVBc0Isc0JBQWtCQyxHQUFsQixDQUFzQix5QkFBdEI7O0FBR0F2QixTQUFLd0IsT0FBTCxHQUFlLFlBQUs7QUFDaEIsWUFBR3ZCLFlBQUgsRUFBZ0I7QUFDWkEseUJBQWF1QixPQUFiO0FBQ0F2QiwyQkFBZSxJQUFmO0FBQ0g7QUFDRHFCLDBCQUFrQkMsR0FBbEIsQ0FBc0IsK0JBQXRCOztBQUVBckI7QUFFSCxLQVREO0FBVUEsV0FBT0YsSUFBUDtBQUNILENBckVELEMsQ0FmQTs7O3FCQXVGZUosTTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkZmOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQWNBLElBQU1zQyxlQUFlLFNBQWZBLFlBQWUsQ0FBVUMsUUFBVixFQUFvQkMsWUFBcEIsRUFBa0NQLGFBQWxDLEVBQWlESixZQUFqRCxFQUErRE0sWUFBL0QsRUFBNkU7O0FBRTlGLFFBQU1NLHVCQUF1QjtBQUN6QixzQkFBYyxDQUFDO0FBQ1gsb0JBQVE7QUFERyxTQUFEO0FBRFcsS0FBN0I7O0FBTUEsUUFBSXJDLE9BQU8sRUFBWDs7QUFFQSxRQUFJc0MsS0FBSyxJQUFUOztBQUVBLFFBQUlDLGFBQWEsSUFBakI7O0FBRUE7QUFDQSxRQUFJQyx5QkFBeUIsSUFBN0I7O0FBRUE7QUFDQSxRQUFJQyx3QkFBd0IsRUFBNUI7O0FBRUE7QUFDQSxRQUFJQyxtQkFBbUIsS0FBdkI7O0FBRUEsUUFBSUMsa0JBQWtCLElBQXRCOztBQUVBLEtBQUMsWUFBWTtBQUNULFlBQUlDLGtCQUFrQkMsT0FBT0MsY0FBN0I7QUFDQUQsZUFBT0MsY0FBUCxHQUF3QixVQUFVQyxLQUFWLEVBQWlCO0FBQ3JDLGdCQUFJSCxlQUFKLEVBQXFCO0FBQ2pCQSxnQ0FBZ0JHLEtBQWhCO0FBQ0g7QUFDRHpCLDhCQUFrQkMsR0FBbEIsQ0FBc0Isc0NBQXRCO0FBQ0F5QjtBQUNILFNBTkQ7QUFPSCxLQVREOztBQVdBLGFBQVNDLHFCQUFULENBQStCQyxFQUEvQixFQUFtQzs7QUFFL0IsWUFBSUMsaUJBQWlCLElBQXJCOztBQUVBLFlBQUlYLDBCQUEwQlUsT0FBT1YsdUJBQXVCVSxFQUE1RCxFQUFnRTtBQUM1REMsNkJBQWlCWCx1QkFBdUJXLGNBQXhDO0FBQ0gsU0FGRCxNQUVPLElBQUlWLHNCQUFzQlMsRUFBdEIsQ0FBSixFQUErQjtBQUNsQ0MsNkJBQWlCVixzQkFBc0JTLEVBQXRCLEVBQTBCQyxjQUEzQztBQUNIOztBQUVELGVBQU9BLGNBQVA7QUFDSDs7QUFFRCxhQUFTQyxpQ0FBVCxDQUEyQ0Msa0JBQTNDLEVBQStEOztBQUUzRCxZQUFJLENBQUNBLG1CQUFtQkMsTUFBeEIsRUFBZ0M7QUFDNUJELCtCQUFtQkMsTUFBbkIsR0FBNEIsRUFBNUI7QUFDQUQsK0JBQW1CQyxNQUFuQixDQUEwQkMsY0FBMUIsR0FBMkMsRUFBM0M7QUFDQUYsK0JBQW1CQyxNQUFuQixDQUEwQkUsVUFBMUIsR0FBdUMsQ0FBdkMsQ0FINEIsQ0FHYztBQUMxQ0gsK0JBQW1CQyxNQUFuQixDQUEwQkcsZUFBMUIsR0FBNEMsQ0FBNUM7QUFDQUosK0JBQW1CQyxNQUFuQixDQUEwQkksVUFBMUIsR0FBdUMsQ0FBdkM7QUFDQUwsK0JBQW1CQyxNQUFuQixDQUEwQksseUJBQTFCLEdBQXNELENBQXRELENBTjRCLENBTThCO0FBQzFETiwrQkFBbUJDLE1BQW5CLENBQTBCTSxTQUExQixHQUFzQyxFQUF0QztBQUNIOztBQUVELFlBQUlMLGlCQUFpQkYsbUJBQW1CQyxNQUFuQixDQUEwQkMsY0FBL0M7QUFBQSxZQUNJQyxhQUFhSCxtQkFBbUJDLE1BQW5CLENBQTBCRSxVQUQzQztBQUFBLFlBQ3VEO0FBQ25EQywwQkFBa0JKLG1CQUFtQkMsTUFBbkIsQ0FBMEJHLGVBRmhEO0FBQUEsWUFHSUMsYUFBYUwsbUJBQW1CQyxNQUFuQixDQUEwQkksVUFIM0M7QUFBQSxZQUlJQyw0QkFBNEJOLG1CQUFtQkMsTUFBbkIsQ0FBMEJLLHlCQUoxRDtBQUFBLFlBSXNGO0FBQ2xGQyxvQkFBWVAsbUJBQW1CQyxNQUFuQixDQUEwQk0sU0FMMUM7O0FBT0FQLDJCQUFtQlYsZUFBbkIsR0FBcUNrQixXQUFXLFlBQVk7QUFDeEQsZ0JBQUksQ0FBQ1IsbUJBQW1CRixjQUF4QixFQUF3QztBQUNwQyx1QkFBTyxLQUFQO0FBQ0g7QUFDREUsK0JBQW1CRixjQUFuQixDQUFrQ1csUUFBbEMsR0FBNkNDLElBQTdDLENBQWtELFVBQVVDLEtBQVYsRUFBaUI7QUFDL0RBLHNCQUFNQyxPQUFOLENBQWMsVUFBVXRELEtBQVYsRUFBaUI7QUFDM0Isd0JBQUlBLE1BQU1VLElBQU4sS0FBZSxhQUFmLElBQWdDLENBQUNWLE1BQU11RCxRQUEzQyxFQUFxRDs7QUFFakQ7QUFDQVgsdUNBQWVZLElBQWYsQ0FBb0JDLFNBQVN6RCxNQUFNMEQsV0FBZixJQUE4QkQsU0FBU1gsZUFBVCxDQUFsRDs7QUFFQSw0QkFBSUYsZUFBZWUsTUFBZixHQUF3QmQsVUFBNUIsRUFBd0M7QUFDcENELDZDQUFpQkEsZUFBZWdCLEtBQWYsQ0FBcUJoQixlQUFlZSxNQUFmLEdBQXdCZCxVQUE3QyxFQUF5REQsZUFBZWUsTUFBeEUsQ0FBakI7QUFDQVoseUNBQWFjLHdCQUFFQyxNQUFGLENBQVNsQixjQUFULEVBQXlCLFVBQVVtQixJQUFWLEVBQWdCQyxHQUFoQixFQUFxQjtBQUN2RCx1Q0FBT0QsT0FBT0MsR0FBZDtBQUNILDZCQUZZLEVBRVYsQ0FGVSxJQUVMbkIsVUFGUjtBQUdBbEMsOENBQWtCQyxHQUFsQixDQUFzQiw4QkFBK0JtQyxVQUFyRCxFQUFrRS9DLE1BQU0wRCxXQUF4RSxFQUFxRmQsY0FBckY7QUFDQSxnQ0FBSUcsYUFBYUUsU0FBakIsRUFBNEI7QUFDeEJEO0FBQ0Esb0NBQUlBLDhCQUE4QixDQUFsQyxFQUFxQztBQUNqQ3JDLHNEQUFrQkMsR0FBbEIsQ0FBc0IsdUJBQXRCO0FBQ0E7QUFDQTtBQUNBeUIsOENBQVU0Qiw0QkFBVjtBQUNIO0FBQ0osNkJBUkQsTUFRTztBQUNIakIsNERBQTRCLENBQTVCO0FBQ0g7QUFFSjs7QUFFREYsMENBQWtCOUMsTUFBTTBELFdBQXhCO0FBQ0g7QUFDSixpQkE1QkQ7O0FBOEJBakIsa0RBQWtDQyxrQkFBbEM7QUFDSCxhQWhDRDtBQWtDSCxTQXRDb0MsRUFzQ2xDLElBdENrQyxDQUFyQztBQXdDSDs7QUFFRCxhQUFTd0Isd0JBQVQsQ0FBa0MzQixFQUFsQyxFQUFzQzRCLE1BQXRDLEVBQThDQyxHQUE5QyxFQUFtREMsVUFBbkQsRUFBK0RDLE9BQS9ELEVBQXdFOztBQUVwRSxZQUFJOUIsaUJBQWlCLElBQUkrQixpQkFBSixDQUFzQjdDLG9CQUF0QixDQUFyQjs7QUFFQUcsaUNBQXlCO0FBQ3JCVSxnQkFBSUEsRUFEaUI7QUFFckI0QixvQkFBUUEsTUFGYTtBQUdyQjNCLDRCQUFnQkE7QUFISyxTQUF6Qjs7QUFNQTtBQUNBQSx1QkFBZWdDLG9CQUFmLENBQW9DLElBQUlDLHFCQUFKLENBQTBCTCxHQUExQixDQUFwQyxFQUNLaEIsSUFETCxDQUNVLFlBQVk7O0FBRWRaLDJCQUFla0MsWUFBZixHQUNLdEIsSUFETCxDQUNVLFVBQVV1QixJQUFWLEVBQWdCOztBQUVsQmhFLGtDQUFrQkMsR0FBbEIsQ0FBc0IsOEJBQXRCOztBQUVBNEIsK0JBQWVvQyxtQkFBZixDQUFtQ0QsSUFBbkMsRUFBeUN2QixJQUF6QyxDQUE4QyxZQUFZO0FBQ3REO0FBQ0Esd0JBQUl5QixXQUFXckMsZUFBZXNDLGdCQUE5QjtBQUNBbkUsc0NBQWtCQyxHQUFsQixDQUFzQixXQUF0QixFQUFtQ2lFLFFBQW5DOztBQUVBRSxnQ0FBWXBELEVBQVosRUFBZ0I7QUFDWlksNEJBQUlBLEVBRFE7QUFFWnlDLGlDQUFTYixNQUZHO0FBR1pjLGlDQUFTLFFBSEc7QUFJWmIsNkJBQUtTO0FBSk8scUJBQWhCO0FBT0gsaUJBWkQsV0FZUyxVQUFVdkQsS0FBVixFQUFpQjs7QUFFdEIsd0JBQUk0RCxZQUFZQyxrQkFBT0MsNkNBQVAsQ0FBaEI7QUFDQUYsOEJBQVU1RCxLQUFWLEdBQWtCQSxLQUFsQjtBQUNBZSw4QkFBVTZDLFNBQVY7QUFDSCxpQkFqQkQ7QUFrQkgsYUF2QkwsV0F3QlcsVUFBVTVELEtBQVYsRUFBaUI7QUFDcEIsb0JBQUk0RCxZQUFZQyxrQkFBT0UsNENBQVAsQ0FBaEI7QUFDQUgsMEJBQVU1RCxLQUFWLEdBQWtCQSxLQUFsQjtBQUNBZSwwQkFBVTZDLFNBQVY7QUFDSCxhQTVCTDtBQTZCSCxTQWhDTCxXQWlDVyxVQUFVNUQsS0FBVixFQUFpQjtBQUNwQixnQkFBSTRELFlBQVlDLGtCQUFPRyw4Q0FBUCxDQUFoQjtBQUNBSixzQkFBVTVELEtBQVYsR0FBa0JBLEtBQWxCO0FBQ0FlLHNCQUFVNkMsU0FBVjtBQUNILFNBckNMOztBQXVDQSxZQUFJYixVQUFKLEVBQWdCO0FBQ1prQiw0QkFBZ0IvQyxjQUFoQixFQUFnQzZCLFVBQWhDO0FBQ0g7O0FBRUQ3Qix1QkFBZWdELGNBQWYsR0FBZ0MsVUFBVUMsQ0FBVixFQUFhO0FBQ3pDLGdCQUFJQSxFQUFFQyxTQUFOLEVBQWlCO0FBQ2IvRSxrQ0FBa0JDLEdBQWxCLENBQXNCLDZDQUE2QzZFLEVBQUVDLFNBQXJFOztBQUVBOztBQUVBWCw0QkFBWXBELEVBQVosRUFBZ0I7QUFDWlksd0JBQUlBLEVBRFE7QUFFWnlDLDZCQUFTYixNQUZHO0FBR1pjLDZCQUFTLFdBSEc7QUFJWlosZ0NBQVksQ0FBQ29CLEVBQUVDLFNBQUg7QUFKQSxpQkFBaEI7QUFPSDtBQUNKLFNBZEQ7O0FBZ0JBbEQsdUJBQWVtRCxPQUFmLEdBQXlCLFVBQVVGLENBQVYsRUFBYTs7QUFFbEM5RSw4QkFBa0JDLEdBQWxCLENBQXNCLGtCQUF0Qjs7QUFFQTZCLDhDQUFrQ1osc0JBQWxDO0FBQ0FELHlCQUFhNkQsRUFBRUcsT0FBRixDQUFVLENBQVYsQ0FBYjtBQUNBOUUseUJBQWEyRSxFQUFFRyxPQUFGLENBQVUsQ0FBVixDQUFiO0FBQ0gsU0FQRDtBQVFIOztBQUVELGFBQVNDLDBCQUFULENBQW9DQyxNQUFwQyxFQUE0Q0MsUUFBNUMsRUFBc0Q7O0FBRWxELFlBQUksQ0FBQ25FLFVBQUwsRUFBaUI7O0FBRWJzQix1QkFBVyxZQUFZOztBQUVuQjJDLDJDQUEyQkMsTUFBM0IsRUFBbUNDLFFBQW5DO0FBQ0gsYUFIRCxFQUdHLEdBSEg7O0FBS0E7QUFDSDs7QUFFRCxZQUFJdkQsaUJBQWlCLElBQUkrQixpQkFBSixDQUFzQjdDLG9CQUF0QixDQUFyQjs7QUFFQUksOEJBQXNCaUUsUUFBdEIsSUFBa0M7QUFDOUJ4RCxnQkFBSXdELFFBRDBCO0FBRTlCNUIsb0JBQVEyQixNQUZzQjtBQUc5QnRELDRCQUFnQkE7QUFIYyxTQUFsQzs7QUFNQUEsdUJBQWV3RCxTQUFmLENBQXlCcEUsVUFBekI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUFZLHVCQUFleUQsV0FBZixDQUEyQkMsc0JBQTNCLEVBQW1EQyxzQkFBbkQsRUFBMkUsRUFBM0U7O0FBRUEsaUJBQVNELHNCQUFULENBQWdDRSxrQkFBaEMsRUFBb0Q7QUFDaEQ1RCwyQkFBZW9DLG1CQUFmLENBQW1Dd0Isa0JBQW5DOztBQUVBckIsd0JBQVlwRCxFQUFaLEVBQWdCO0FBQ1pZLG9CQUFJdUQsTUFEUTtBQUVaZCx5QkFBU2UsUUFGRztBQUdaM0IscUJBQUtnQyxrQkFITztBQUlabkIseUJBQVM7QUFKRyxhQUFoQjtBQU1IOztBQUVELGlCQUFTa0Isc0JBQVQsQ0FBZ0MvRCxLQUFoQyxFQUF1QztBQUNuQztBQUNIOztBQUVESSx1QkFBZWdELGNBQWYsR0FBZ0MsVUFBVUMsQ0FBVixFQUFhO0FBQ3pDLGdCQUFJQSxFQUFFQyxTQUFOLEVBQWlCO0FBQ2IvRSxrQ0FBa0JDLEdBQWxCLENBQXNCLDZDQUE2QzZFLEVBQUVDLFNBQXJFOztBQUdBOztBQUVBWCw0QkFBWXBELEVBQVosRUFBZ0I7QUFDWlksd0JBQUl1RCxNQURRO0FBRVpkLDZCQUFTZSxRQUZHO0FBR1pkLDZCQUFTLGVBSEc7QUFJWlosZ0NBQVksQ0FBQ29CLEVBQUVDLFNBQUg7QUFKQSxpQkFBaEI7QUFPSDtBQUNKLFNBZkQ7QUFnQkg7O0FBRUQsYUFBU0gsZUFBVCxDQUF5Qi9DLGNBQXpCLEVBQXlDNkIsVUFBekMsRUFBcUQ7O0FBRWpELGFBQUssSUFBSWdDLElBQUksQ0FBYixFQUFnQkEsSUFBSWhDLFdBQVdWLE1BQS9CLEVBQXVDMEMsR0FBdkMsRUFBNEM7QUFDeEMsZ0JBQUloQyxXQUFXZ0MsQ0FBWCxLQUFpQmhDLFdBQVdnQyxDQUFYLEVBQWNYLFNBQW5DLEVBQThDOztBQUUxQ2xELCtCQUFlK0MsZUFBZixDQUErQixJQUFJZSxlQUFKLENBQW9CakMsV0FBV2dDLENBQVgsQ0FBcEIsQ0FBL0IsRUFBbUVqRCxJQUFuRSxDQUF3RSxZQUFZO0FBQ2hGekMsc0NBQWtCQyxHQUFsQixDQUFzQiwyQkFBdEI7QUFDSCxpQkFGRCxXQUVTLFVBQVVVLEtBQVYsRUFBaUI7QUFDdEIsd0JBQUk0RCxZQUFZQyxrQkFBT29CLCtDQUFQLENBQWhCO0FBQ0FyQiw4QkFBVTVELEtBQVYsR0FBa0JBLEtBQWxCO0FBQ0FlLDhCQUFVNkMsU0FBVjtBQUNILGlCQU5EO0FBT0g7QUFDSjtBQUNKOztBQUVELGFBQVNzQixhQUFULENBQXVCbEMsT0FBdkIsRUFBZ0NtQyxNQUFoQyxFQUF3Qzs7QUFFcEMsWUFBSTs7QUFFQTlFLGlCQUFLLElBQUkrRSxTQUFKLENBQWNqRixZQUFkLENBQUw7O0FBRUFFLGVBQUdnRixNQUFILEdBQVksWUFBWTs7QUFFcEI7O0FBRUE1Qiw0QkFBWXBELEVBQVosRUFBZ0I7QUFDWnNELDZCQUFTO0FBREcsaUJBQWhCO0FBR0gsYUFQRDs7QUFTQXRELGVBQUdpRixTQUFILEdBQWUsVUFBVW5CLENBQVYsRUFBYTs7QUFFeEIsb0JBQU1vQixVQUFVQyxLQUFLQyxLQUFMLENBQVd0QixFQUFFdUIsSUFBYixDQUFoQjs7QUFFQTs7QUFFQSxvQkFBSUgsUUFBUXZGLEtBQVosRUFBbUI7QUFDZix3QkFBSTRELFlBQVlDLGtCQUFPOEIsaUNBQVAsQ0FBaEI7QUFDQS9CLDhCQUFVNUQsS0FBVixHQUFrQnVGLFFBQVF2RixLQUExQjtBQUNBZSw4QkFBVTZDLFNBQVY7QUFDQTtBQUNIOztBQUVELG9CQUFJLENBQUMyQixRQUFRdEUsRUFBYixFQUFpQjs7QUFFYjVCLHNDQUFrQkMsR0FBbEIsQ0FBc0IscUJBQXRCO0FBQ0E7QUFDSDs7QUFFRCxvQkFBSWlHLFFBQVE1QixPQUFSLEtBQW9CLE9BQXhCLEVBQWlDOztBQUU3QmYsNkNBQXlCMkMsUUFBUXRFLEVBQWpDLEVBQXFDc0UsUUFBUTdCLE9BQTdDLEVBQXNENkIsUUFBUXpDLEdBQTlELEVBQW1FeUMsUUFBUXhDLFVBQTNFLEVBQXVGQyxPQUF2RjtBQUNBLHdCQUFHdUMsUUFBUTdCLE9BQVIsS0FBb0IsQ0FBdkIsRUFBeUI7QUFDckJ4RCxpQ0FBUzBGLE9BQVQsQ0FBaUJDLHVCQUFqQixFQUErQixLQUEvQjtBQUNILHFCQUZELE1BRUs7QUFDRDNGLGlDQUFTMEYsT0FBVCxDQUFpQkMsdUJBQWpCLEVBQStCLElBQS9CO0FBQ0g7QUFDSjs7QUFFRCxvQkFBSU4sUUFBUTVCLE9BQVIsS0FBb0IsbUJBQXhCLEVBQTZDOztBQUV6Q1ksK0NBQTJCZ0IsUUFBUXRFLEVBQW5DLEVBQXVDc0UsUUFBUTdCLE9BQS9DO0FBQ0g7O0FBRUQsb0JBQUk2QixRQUFRNUIsT0FBUixLQUFvQixZQUF4QixFQUFzQzs7QUFFbEMsd0JBQUltQyxrQkFBa0I5RSxzQkFBc0J1RSxRQUFRN0IsT0FBOUIsQ0FBdEI7O0FBRUFvQyxvQ0FBZ0I1QyxvQkFBaEIsQ0FBcUMsSUFBSUMscUJBQUosQ0FBMEJvQyxRQUFRekMsR0FBbEMsQ0FBckMsRUFDS2hCLElBREwsQ0FDVSxVQUFVdUIsSUFBVixFQUFnQixDQUVyQixDQUhMLFdBSVcsVUFBVXJELEtBQVYsRUFBaUI7QUFDcEIsNEJBQUk0RCxZQUFZQyxrQkFBT0csOENBQVAsQ0FBaEI7QUFDQUosa0NBQVU1RCxLQUFWLEdBQWtCQSxLQUFsQjtBQUNBZSxrQ0FBVTZDLFNBQVY7QUFDSCxxQkFSTDtBQVNIOztBQUVELG9CQUFJMkIsUUFBUTVCLE9BQVIsS0FBb0IsV0FBeEIsRUFBcUM7O0FBRWpDO0FBQ0Esd0JBQUlvQyxrQkFBa0IvRSxzQkFBc0J1RSxRQUFRdEUsRUFBOUIsQ0FBdEI7O0FBRUFnRCxvQ0FBZ0I4QixlQUFoQixFQUFpQ1IsUUFBUXhDLFVBQXpDO0FBQ0g7O0FBRUQsb0JBQUl3QyxRQUFRNUIsT0FBUixLQUFvQixlQUF4QixFQUF5Qzs7QUFFckM7QUFDQSx3QkFBSXFDLGtCQUFrQmhGLHNCQUFzQnVFLFFBQVE3QixPQUE5QixDQUF0Qjs7QUFFQU8sb0NBQWdCK0IsZUFBaEIsRUFBaUNULFFBQVF4QyxVQUF6QztBQUNIOztBQUVELG9CQUFJd0MsUUFBUTVCLE9BQVIsS0FBb0IsTUFBeEIsRUFBZ0M7O0FBRTVCLHdCQUFJcEQsdUJBQXVCc0MsTUFBdkIsS0FBa0MwQyxRQUFRN0IsT0FBOUMsRUFBdUQ7O0FBRW5EO0FBQ0E7O0FBRUFwRCxxQ0FBYSxJQUFiO0FBQ0FDLCtDQUF1QlcsY0FBdkIsQ0FBc0MrRSxLQUF0QztBQUNBMUYsaURBQXlCLElBQXpCOztBQUVBWDs7QUFFQTZELG9DQUFZcEQsRUFBWixFQUFnQjtBQUNac0QscUNBQVM7QUFERyx5QkFBaEI7QUFJSCxxQkFmRCxNQWVPOztBQUVIO0FBQ0EsNEJBQUluRCxzQkFBc0IrRSxRQUFRN0IsT0FBOUIsQ0FBSixFQUE0QztBQUN4QztBQUNBbEQsa0RBQXNCK0UsUUFBUTdCLE9BQTlCLEVBQXVDeEMsY0FBdkMsQ0FBc0QrRSxLQUF0RDtBQUNBLG1DQUFPekYsc0JBQXNCK0UsUUFBUTdCLE9BQTlCLENBQVA7QUFDSDtBQUNKO0FBQ0o7QUFDSixhQTVGRDtBQTZGQXJELGVBQUc2RixPQUFILEdBQWEsWUFBWTtBQUNyQixvQkFBRyxDQUFDekYsZ0JBQUosRUFBcUI7QUFDakIsd0JBQUltRCxZQUFZQyxrQkFBTzhCLGlDQUFQLENBQWhCO0FBQ0E1RSw4QkFBVTZDLFNBQVY7QUFDSDtBQUNKLGFBTEQ7O0FBT0F2RCxlQUFHOEYsT0FBSCxHQUFhLFVBQVVuRyxLQUFWLEVBQWlCO0FBQzFCLG9CQUFJNEQsWUFBWUMsa0JBQU84QixpQ0FBUCxDQUFoQjtBQUNBL0IsMEJBQVU1RCxLQUFWLEdBQWtCQSxLQUFsQjtBQUNBZSwwQkFBVTZDLFNBQVY7QUFDQXVCLHVCQUFPbkYsS0FBUDtBQUNILGFBTEQ7QUFPSCxTQXhIRCxDQXdIRSxPQUFPQSxLQUFQLEVBQWM7O0FBRVpvRyxvQkFBUXBHLEtBQVIsQ0FBY0EsS0FBZDtBQUNBZSxzQkFBVWYsS0FBVjtBQUNIO0FBQ0o7O0FBRUQsYUFBU3FHLFVBQVQsR0FBc0I7O0FBRWxCaEgsMEJBQWtCQyxHQUFsQixDQUFzQiw0QkFBdEI7O0FBRUEsZUFBTyxJQUFJZ0gsT0FBSixDQUFZLFVBQVV0RCxPQUFWLEVBQW1CbUMsTUFBbkIsRUFBMkI7O0FBRTFDOUYsOEJBQWtCQyxHQUFsQixDQUFzQix3QkFBd0JhLFlBQTlDOztBQUVBK0UsMEJBQWNsQyxPQUFkLEVBQXVCbUMsTUFBdkI7QUFDSCxTQUxNLENBQVA7QUFNSDs7QUFFRCxhQUFTcEUsU0FBVCxDQUFtQmYsS0FBbkIsRUFBMEI7O0FBRXRCWCwwQkFBa0JDLEdBQWxCLENBQXNCLDRCQUF0QjtBQUNBLFlBQUllLEVBQUosRUFBUTtBQUNKaEIsOEJBQWtCQyxHQUFsQixDQUFzQixpQ0FBdEI7QUFDQUQsOEJBQWtCQyxHQUFsQixDQUFzQix3QkFBdEI7QUFDQTs7Ozs7O0FBTUEsZ0JBQUllLEdBQUdrRyxVQUFILEtBQWtCLENBQXRCLEVBQXlCOztBQUVyQixvQkFBSWhHLHNCQUFKLEVBQTRCO0FBQ3hCa0QsZ0NBQVlwRCxFQUFaLEVBQWdCO0FBQ1pzRCxpQ0FBUyxNQURHO0FBRVoxQyw0QkFBSVYsdUJBQXVCVTtBQUZmLHFCQUFoQjtBQUlIO0FBQ0RSLG1DQUFtQixJQUFuQjtBQUNBSixtQkFBRzRGLEtBQUg7QUFDSDtBQUNENUYsaUJBQUssSUFBTDtBQUNILFNBckJELE1BcUJLO0FBQ0RJLCtCQUFtQixLQUFuQjtBQUNIO0FBQ0QsWUFBSUYsc0JBQUosRUFBNEI7O0FBRXhCRCx5QkFBYSxJQUFiOztBQUVBakIsOEJBQWtCQyxHQUFsQixDQUFzQixpQ0FBdEI7QUFDQSxnQkFBSW9CLGVBQUosRUFBcUI7QUFDakI4Riw2QkFBYTlGLGVBQWI7QUFDSDtBQUNESCxtQ0FBdUJXLGNBQXZCLENBQXNDK0UsS0FBdEM7QUFDQTFGLHFDQUF5QixJQUF6QjtBQUNIOztBQUVELFlBQUlrRyxPQUFPQyxJQUFQLENBQVlsRyxxQkFBWixFQUFtQzZCLE1BQW5DLEdBQTRDLENBQWhELEVBQW1EOztBQUUvQyxpQkFBSyxJQUFJb0MsUUFBVCxJQUFxQmpFLHFCQUFyQixFQUE0Qzs7QUFFeEMsb0JBQUltRyx1QkFBdUJuRyxzQkFBc0JpRSxRQUF0QixFQUFnQ3ZELGNBQTNEOztBQUVBN0Isa0NBQWtCQyxHQUFsQixDQUFzQixtQ0FBdEI7QUFDQXFILHFDQUFxQlYsS0FBckI7QUFDQVUsdUNBQXVCLElBQXZCO0FBQ0g7O0FBRURuRyxvQ0FBd0IsRUFBeEI7QUFDSDs7QUFFRCxZQUFJUixLQUFKLEVBQVc7QUFDUEYseUJBQWFFLEtBQWIsRUFBb0JFLFFBQXBCO0FBQ0g7QUFDSjs7QUFFRCxhQUFTdUQsV0FBVCxDQUFxQnBELEVBQXJCLEVBQXlCa0YsT0FBekIsRUFBa0M7O0FBRTlCO0FBQ0FsRixXQUFHdUcsSUFBSCxDQUFRcEIsS0FBS3FCLFNBQUwsQ0FBZXRCLE9BQWYsQ0FBUjtBQUNIOztBQUVEeEgsU0FBS2dDLE9BQUwsR0FBZSxZQUFNO0FBQ2pCLGVBQU9zRyxZQUFQO0FBQ0gsS0FGRDs7QUFJQXRJLFNBQUt3QixPQUFMLEdBQWUsWUFBTTtBQUNqQjtBQUNBd0I7QUFDSCxLQUhEOztBQUtBLFdBQU9oRCxJQUFQO0FBQ0gsQ0FuZUQ7O3FCQXFlZWtDLFk7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JmZixDQUFDLFVBQVM2RyxDQUFULEVBQVc7QUFBQyxNQUFHLDhCQUFPQyxPQUFQLE9BQWlCLFFBQWpCLElBQTJCLE9BQU9DLE1BQVAsS0FBZ0IsV0FBOUMsRUFBMEQ7QUFBQ0EsV0FBT0QsT0FBUCxHQUFlRCxHQUFmO0FBQW1CLEdBQTlFLE1BQW1GLElBQUcsSUFBSCxFQUEwQztBQUFDRyxxQ0FBTyxFQUFQLG9DQUFVSCxDQUFWO0FBQUE7QUFBQTtBQUFBO0FBQWEsR0FBeEQsTUFBNEQsVUFBb0s7QUFBQyxDQUFqVSxFQUFtVSxZQUFVO0FBQUMsTUFBSUcsTUFBSixFQUFXRCxNQUFYLEVBQWtCRCxPQUFsQixDQUEwQixPQUFRLFNBQVM1QyxDQUFULENBQVcrQyxDQUFYLEVBQWFDLENBQWIsRUFBZUMsQ0FBZixFQUFpQjtBQUFDLGFBQVNDLENBQVQsQ0FBV0MsQ0FBWCxFQUFhQyxDQUFiLEVBQWU7QUFBQyxVQUFHLENBQUNKLEVBQUVHLENBQUYsQ0FBSixFQUFTO0FBQUMsWUFBRyxDQUFDSixFQUFFSSxDQUFGLENBQUosRUFBUztBQUFDLGNBQUlFLElBQUUsT0FBT0MsT0FBUCxJQUFnQixVQUFoQixJQUE0QkEsT0FBbEMsQ0FBMEMsSUFBRyxDQUFDRixDQUFELElBQUlDLENBQVAsRUFBUyxPQUFPQSxPQUFDQSxDQUFDRixDQUFGLEVBQUksQ0FBQyxDQUFMLENBQVAsQ0FBZSxJQUFHdkMsQ0FBSCxFQUFLLE9BQU9BLEVBQUV1QyxDQUFGLEVBQUksQ0FBQyxDQUFMLENBQVAsQ0FBZSxJQUFJUixJQUFFLElBQUlZLEtBQUosQ0FBVSx5QkFBdUJKLENBQXZCLEdBQXlCLEdBQW5DLENBQU4sQ0FBOEMsTUFBTVIsRUFBRWEsSUFBRixHQUFPLGtCQUFQLEVBQTBCYixDQUFoQztBQUFrQyxhQUFJYyxJQUFFVCxFQUFFRyxDQUFGLElBQUssRUFBQ1AsU0FBUSxFQUFULEVBQVgsQ0FBd0JHLEVBQUVJLENBQUYsRUFBSyxDQUFMLEVBQVFPLElBQVIsQ0FBYUQsRUFBRWIsT0FBZixFQUF1QixVQUFTNUMsQ0FBVCxFQUFXO0FBQUMsY0FBSWdELElBQUVELEVBQUVJLENBQUYsRUFBSyxDQUFMLEVBQVFuRCxDQUFSLENBQU4sQ0FBaUIsT0FBT2tELEVBQUVGLElBQUVBLENBQUYsR0FBSWhELENBQU4sQ0FBUDtBQUFnQixTQUFwRSxFQUFxRXlELENBQXJFLEVBQXVFQSxFQUFFYixPQUF6RSxFQUFpRjVDLENBQWpGLEVBQW1GK0MsQ0FBbkYsRUFBcUZDLENBQXJGLEVBQXVGQyxDQUF2RjtBQUEwRixjQUFPRCxFQUFFRyxDQUFGLEVBQUtQLE9BQVo7QUFBb0IsU0FBSWhDLElBQUUsT0FBTzBDLE9BQVAsSUFBZ0IsVUFBaEIsSUFBNEJBLE9BQWxDLENBQTBDLEtBQUksSUFBSUgsSUFBRSxDQUFWLEVBQVlBLElBQUVGLEVBQUUvRSxNQUFoQixFQUF1QmlGLEdBQXZCO0FBQTJCRCxRQUFFRCxFQUFFRSxDQUFGLENBQUY7QUFBM0IsS0FBbUMsT0FBT0QsQ0FBUDtBQUFTLEdBQXpiLENBQTJiLEVBQUMsR0FBRSxDQUFDLFVBQVNJLE9BQVQsRUFBaUJULE1BQWpCLEVBQXdCRCxPQUF4QixFQUFnQztBQUM5MEI7Ozs7Ozs7QUFPQztBQUNEOztBQUVBLFVBQUllLFdBQVdMLFFBQVEsS0FBUixDQUFmOztBQUVBLGVBQVNNLGlCQUFULENBQTJCQyxXQUEzQixFQUF3Q0MsSUFBeEMsRUFBOEM3SSxJQUE5QyxFQUFvREssTUFBcEQsRUFBNER5SSxRQUE1RCxFQUFzRTtBQUNwRSxZQUFJcEYsTUFBTWdGLFNBQVNLLG1CQUFULENBQTZCSCxZQUFZSSxJQUF6QyxFQUErQ0gsSUFBL0MsQ0FBVjs7QUFFQTtBQUNBbkYsZUFBT2dGLFNBQVNPLGtCQUFULENBQ0hMLFlBQVlNLFdBQVosQ0FBd0JDLGtCQUF4QixFQURHLENBQVA7O0FBR0E7QUFDQXpGLGVBQU9nRixTQUFTVSxtQkFBVCxDQUNIUixZQUFZUyxhQUFaLENBQTBCRixrQkFBMUIsRUFERyxFQUVIbkosU0FBUyxPQUFULEdBQW1CLFNBQW5CLEdBQStCOEksWUFBWSxRQUZ4QyxDQUFQOztBQUlBcEYsZUFBTyxXQUFXa0YsWUFBWVUsR0FBdkIsR0FBNkIsTUFBcEM7O0FBRUEsWUFBSVYsWUFBWVcsU0FBWixJQUF5QlgsWUFBWVksV0FBekMsRUFBc0Q7QUFDcEQ5RixpQkFBTyxnQkFBUDtBQUNELFNBRkQsTUFFTyxJQUFJa0YsWUFBWVcsU0FBaEIsRUFBMkI7QUFDaEM3RixpQkFBTyxnQkFBUDtBQUNELFNBRk0sTUFFQSxJQUFJa0YsWUFBWVksV0FBaEIsRUFBNkI7QUFDbEM5RixpQkFBTyxnQkFBUDtBQUNELFNBRk0sTUFFQTtBQUNMQSxpQkFBTyxnQkFBUDtBQUNEOztBQUVELFlBQUlrRixZQUFZVyxTQUFoQixFQUEyQjtBQUN6QixjQUFJRSxVQUFVYixZQUFZVyxTQUFaLENBQXNCRyxlQUF0QixJQUNWZCxZQUFZVyxTQUFaLENBQXNCSSxLQUF0QixDQUE0QjlILEVBRGhDO0FBRUErRyxzQkFBWVcsU0FBWixDQUFzQkcsZUFBdEIsR0FBd0NELE9BQXhDO0FBQ0E7QUFDQSxjQUFJRyxPQUFPLFdBQVd2SixTQUFTQSxPQUFPd0IsRUFBaEIsR0FBcUIsR0FBaEMsSUFBdUMsR0FBdkMsR0FDUDRILE9BRE8sR0FDRyxNQURkO0FBRUEvRixpQkFBTyxPQUFPa0csSUFBZDtBQUNBO0FBQ0FsRyxpQkFBTyxZQUFZa0YsWUFBWWlCLHNCQUFaLENBQW1DLENBQW5DLEVBQXNDQyxJQUFsRCxHQUNILEdBREcsR0FDR0YsSUFEVjs7QUFHQTtBQUNBLGNBQUloQixZQUFZaUIsc0JBQVosQ0FBbUMsQ0FBbkMsRUFBc0NFLEdBQTFDLEVBQStDO0FBQzdDckcsbUJBQU8sWUFBWWtGLFlBQVlpQixzQkFBWixDQUFtQyxDQUFuQyxFQUFzQ0UsR0FBdEMsQ0FBMENELElBQXRELEdBQ0gsR0FERyxHQUNHRixJQURWO0FBRUFsRyxtQkFBTyxzQkFDSGtGLFlBQVlpQixzQkFBWixDQUFtQyxDQUFuQyxFQUFzQ0MsSUFEbkMsR0FDMEMsR0FEMUMsR0FFSGxCLFlBQVlpQixzQkFBWixDQUFtQyxDQUFuQyxFQUFzQ0UsR0FBdEMsQ0FBMENELElBRnZDLEdBR0gsTUFISjtBQUlEO0FBQ0Y7QUFDRDtBQUNBcEcsZUFBTyxZQUFZa0YsWUFBWWlCLHNCQUFaLENBQW1DLENBQW5DLEVBQXNDQyxJQUFsRCxHQUNILFNBREcsR0FDU3BCLFNBQVNzQixVQURsQixHQUMrQixNQUR0QztBQUVBLFlBQUlwQixZQUFZVyxTQUFaLElBQXlCWCxZQUFZaUIsc0JBQVosQ0FBbUMsQ0FBbkMsRUFBc0NFLEdBQW5FLEVBQXdFO0FBQ3RFckcsaUJBQU8sWUFBWWtGLFlBQVlpQixzQkFBWixDQUFtQyxDQUFuQyxFQUFzQ0UsR0FBdEMsQ0FBMENELElBQXRELEdBQ0gsU0FERyxHQUNTcEIsU0FBU3NCLFVBRGxCLEdBQytCLE1BRHRDO0FBRUQ7QUFDRCxlQUFPdEcsR0FBUDtBQUNEOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFTdUcsZ0JBQVQsQ0FBMEJDLFVBQTFCLEVBQXNDQyxXQUF0QyxFQUFtRDtBQUNqRCxZQUFJQyxVQUFVLEtBQWQ7QUFDQUYscUJBQWE5RCxLQUFLQyxLQUFMLENBQVdELEtBQUtxQixTQUFMLENBQWV5QyxVQUFmLENBQVgsQ0FBYjtBQUNBLGVBQU9BLFdBQVdHLE1BQVgsQ0FBa0IsVUFBU0MsTUFBVCxFQUFpQjtBQUN4QyxjQUFJQSxXQUFXQSxPQUFPQyxJQUFQLElBQWVELE9BQU9FLEdBQWpDLENBQUosRUFBMkM7QUFDekMsZ0JBQUlELE9BQU9ELE9BQU9DLElBQVAsSUFBZUQsT0FBT0UsR0FBakM7QUFDQSxnQkFBSUYsT0FBT0UsR0FBUCxJQUFjLENBQUNGLE9BQU9DLElBQTFCLEVBQWdDO0FBQzlCdkQsc0JBQVF5RCxJQUFSLENBQWEsbURBQWI7QUFDRDtBQUNELGdCQUFJQyxXQUFXLE9BQU9ILElBQVAsS0FBZ0IsUUFBL0I7QUFDQSxnQkFBSUcsUUFBSixFQUFjO0FBQ1pILHFCQUFPLENBQUNBLElBQUQsQ0FBUDtBQUNEO0FBQ0RBLG1CQUFPQSxLQUFLRixNQUFMLENBQVksVUFBU0csR0FBVCxFQUFjO0FBQy9CLGtCQUFJRyxZQUFZSCxJQUFJSSxPQUFKLENBQVksT0FBWixNQUF5QixDQUF6QixJQUNaSixJQUFJSSxPQUFKLENBQVksZUFBWixNQUFpQyxDQUFDLENBRHRCLElBRVpKLElBQUlJLE9BQUosQ0FBWSxRQUFaLE1BQTBCLENBQUMsQ0FGZixJQUdaLENBQUNSLE9BSEw7O0FBS0Esa0JBQUlPLFNBQUosRUFBZTtBQUNiUCwwQkFBVSxJQUFWO0FBQ0EsdUJBQU8sSUFBUDtBQUNEO0FBQ0QscUJBQU9JLElBQUlJLE9BQUosQ0FBWSxPQUFaLE1BQXlCLENBQXpCLElBQThCVCxlQUFlLEtBQTdDLElBQ0hLLElBQUlJLE9BQUosQ0FBWSxnQkFBWixNQUFrQyxDQUFDLENBRHZDO0FBRUQsYUFaTSxDQUFQOztBQWNBLG1CQUFPTixPQUFPRSxHQUFkO0FBQ0FGLG1CQUFPQyxJQUFQLEdBQWNHLFdBQVdILEtBQUssQ0FBTCxDQUFYLEdBQXFCQSxJQUFuQztBQUNBLG1CQUFPLENBQUMsQ0FBQ0EsS0FBS3RILE1BQWQ7QUFDRDtBQUNGLFNBNUJNLENBQVA7QUE2QkQ7O0FBRUQ7QUFDQSxlQUFTNEgscUJBQVQsQ0FBK0JDLGlCQUEvQixFQUFrREMsa0JBQWxELEVBQXNFO0FBQ3BFLFlBQUlDLHFCQUFxQjtBQUN2QkMsa0JBQVEsRUFEZTtBQUV2QkMsNEJBQWtCLEVBRks7QUFHdkJDLHlCQUFlO0FBSFEsU0FBekI7O0FBTUEsWUFBSUMseUJBQXlCLFNBQXpCQSxzQkFBeUIsQ0FBU0MsRUFBVCxFQUFhSixNQUFiLEVBQXFCO0FBQ2hESSxlQUFLdEksU0FBU3NJLEVBQVQsRUFBYSxFQUFiLENBQUw7QUFDQSxlQUFLLElBQUkxRixJQUFJLENBQWIsRUFBZ0JBLElBQUlzRixPQUFPaEksTUFBM0IsRUFBbUMwQyxHQUFuQyxFQUF3QztBQUN0QyxnQkFBSXNGLE9BQU90RixDQUFQLEVBQVUyRixXQUFWLEtBQTBCRCxFQUExQixJQUNBSixPQUFPdEYsQ0FBUCxFQUFVNEYsb0JBQVYsS0FBbUNGLEVBRHZDLEVBQzJDO0FBQ3pDLHFCQUFPSixPQUFPdEYsQ0FBUCxDQUFQO0FBQ0Q7QUFDRjtBQUNGLFNBUkQ7O0FBVUEsWUFBSTZGLHVCQUF1QixTQUF2QkEsb0JBQXVCLENBQVNDLElBQVQsRUFBZUMsSUFBZixFQUFxQkMsT0FBckIsRUFBOEJDLE9BQTlCLEVBQXVDO0FBQ2hFLGNBQUlDLFNBQVNULHVCQUF1QkssS0FBS0ssVUFBTCxDQUFnQkMsR0FBdkMsRUFBNENKLE9BQTVDLENBQWI7QUFDQSxjQUFJSyxTQUFTWix1QkFBdUJNLEtBQUtJLFVBQUwsQ0FBZ0JDLEdBQXZDLEVBQTRDSCxPQUE1QyxDQUFiO0FBQ0EsaUJBQU9DLFVBQVVHLE1BQVYsSUFDSEgsT0FBTzlNLElBQVAsQ0FBWWtOLFdBQVosT0FBOEJELE9BQU9qTixJQUFQLENBQVlrTixXQUFaLEVBRGxDO0FBRUQsU0FMRDs7QUFPQW5CLDBCQUFrQkcsTUFBbEIsQ0FBeUJySSxPQUF6QixDQUFpQyxVQUFTaUosTUFBVCxFQUFpQjtBQUNoRCxlQUFLLElBQUlsRyxJQUFJLENBQWIsRUFBZ0JBLElBQUlvRixtQkFBbUJFLE1BQW5CLENBQTBCaEksTUFBOUMsRUFBc0QwQyxHQUF0RCxFQUEyRDtBQUN6RCxnQkFBSXFHLFNBQVNqQixtQkFBbUJFLE1BQW5CLENBQTBCdEYsQ0FBMUIsQ0FBYjtBQUNBLGdCQUFJa0csT0FBTzlNLElBQVAsQ0FBWWtOLFdBQVosT0FBOEJELE9BQU9qTixJQUFQLENBQVlrTixXQUFaLEVBQTlCLElBQ0FKLE9BQU9LLFNBQVAsS0FBcUJGLE9BQU9FLFNBRGhDLEVBQzJDO0FBQ3pDLGtCQUFJTCxPQUFPOU0sSUFBUCxDQUFZa04sV0FBWixPQUE4QixLQUE5QixJQUNBSixPQUFPQyxVQURQLElBQ3FCRSxPQUFPRixVQUFQLENBQWtCQyxHQUQzQyxFQUNnRDtBQUM5QztBQUNBO0FBQ0Esb0JBQUksQ0FBQ1AscUJBQXFCSyxNQUFyQixFQUE2QkcsTUFBN0IsRUFDRGxCLGtCQUFrQkcsTUFEakIsRUFDeUJGLG1CQUFtQkUsTUFENUMsQ0FBTCxFQUMwRDtBQUN4RDtBQUNEO0FBQ0Y7QUFDRGUsdUJBQVM1RixLQUFLQyxLQUFMLENBQVdELEtBQUtxQixTQUFMLENBQWV1RSxNQUFmLENBQVgsQ0FBVCxDQVZ5QyxDQVVJO0FBQzdDO0FBQ0FBLHFCQUFPRyxXQUFQLEdBQXFCQyxLQUFLQyxHQUFMLENBQVNSLE9BQU9NLFdBQWhCLEVBQ2pCSCxPQUFPRyxXQURVLENBQXJCO0FBRUE7QUFDQW5CLGlDQUFtQkMsTUFBbkIsQ0FBMEJuSSxJQUExQixDQUErQmtKLE1BQS9COztBQUVBO0FBQ0FBLHFCQUFPTSxZQUFQLEdBQXNCTixPQUFPTSxZQUFQLENBQW9CakMsTUFBcEIsQ0FBMkIsVUFBU2tDLEVBQVQsRUFBYTtBQUM1RCxxQkFBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUlYLE9BQU9TLFlBQVAsQ0FBb0JySixNQUF4QyxFQUFnRHVKLEdBQWhELEVBQXFEO0FBQ25ELHNCQUFJWCxPQUFPUyxZQUFQLENBQW9CRSxDQUFwQixFQUF1QnhNLElBQXZCLEtBQWdDdU0sR0FBR3ZNLElBQW5DLElBQ0E2TCxPQUFPUyxZQUFQLENBQW9CRSxDQUFwQixFQUF1QkMsU0FBdkIsS0FBcUNGLEdBQUdFLFNBRDVDLEVBQ3VEO0FBQ3JELDJCQUFPLElBQVA7QUFDRDtBQUNGO0FBQ0QsdUJBQU8sS0FBUDtBQUNELGVBUnFCLENBQXRCO0FBU0E7QUFDQTtBQUNBO0FBQ0Q7QUFDRjtBQUNGLFNBcENEOztBQXNDQTNCLDBCQUFrQkksZ0JBQWxCLENBQW1DdEksT0FBbkMsQ0FBMkMsVUFBUzhKLGdCQUFULEVBQTJCO0FBQ3BFLGVBQUssSUFBSS9HLElBQUksQ0FBYixFQUFnQkEsSUFBSW9GLG1CQUFtQkcsZ0JBQW5CLENBQW9DakksTUFBeEQsRUFDSzBDLEdBREwsRUFDVTtBQUNSLGdCQUFJZ0gsbUJBQW1CNUIsbUJBQW1CRyxnQkFBbkIsQ0FBb0N2RixDQUFwQyxDQUF2QjtBQUNBLGdCQUFJK0csaUJBQWlCRSxHQUFqQixLQUF5QkQsaUJBQWlCQyxHQUE5QyxFQUFtRDtBQUNqRDVCLGlDQUFtQkUsZ0JBQW5CLENBQW9DcEksSUFBcEMsQ0FBeUM2SixnQkFBekM7QUFDQTtBQUNEO0FBQ0Y7QUFDRixTQVREOztBQVdBO0FBQ0EsZUFBTzNCLGtCQUFQO0FBQ0Q7O0FBRUQ7QUFDQSxlQUFTNkIsK0JBQVQsQ0FBeUNDLE1BQXpDLEVBQWlEOU0sSUFBakQsRUFBdUQrTSxjQUF2RCxFQUF1RTtBQUNyRSxlQUFPO0FBQ0xDLGlCQUFPO0FBQ0w5SSxpQ0FBcUIsQ0FBQyxRQUFELEVBQVcsa0JBQVgsQ0FEaEI7QUFFTEosa0NBQXNCLENBQUMsUUFBRCxFQUFXLG1CQUFYO0FBRmpCLFdBREY7QUFLTG1KLGtCQUFRO0FBQ04vSSxpQ0FBcUIsQ0FBQyxtQkFBRCxFQUFzQixxQkFBdEIsQ0FEZjtBQUVOSixrQ0FBc0IsQ0FBQyxrQkFBRCxFQUFxQixzQkFBckI7QUFGaEI7QUFMSCxVQVNMOUQsSUFUSyxFQVNDOE0sTUFURCxFQVNTbEMsT0FUVCxDQVNpQm1DLGNBVGpCLE1BU3FDLENBQUMsQ0FUN0M7QUFVRDs7QUFFRCxlQUFTRyxpQkFBVCxDQUEyQkMsWUFBM0IsRUFBeUNuSSxTQUF6QyxFQUFvRDtBQUNsRDtBQUNBO0FBQ0EsWUFBSW9JLGVBQWVELGFBQWFFLG1CQUFiLEdBQ2RDLElBRGMsQ0FDVCxVQUFTQyxlQUFULEVBQTBCO0FBQzlCLGlCQUFPdkksVUFBVXdJLFVBQVYsS0FBeUJELGdCQUFnQkMsVUFBekMsSUFDSHhJLFVBQVV5SSxFQUFWLEtBQWlCRixnQkFBZ0JFLEVBRDlCLElBRUh6SSxVQUFVMEksSUFBVixLQUFtQkgsZ0JBQWdCRyxJQUZoQyxJQUdIMUksVUFBVTJJLFFBQVYsS0FBdUJKLGdCQUFnQkksUUFIcEMsSUFJSDNJLFVBQVU0SSxRQUFWLEtBQXVCTCxnQkFBZ0JLLFFBSnBDLElBS0g1SSxVQUFVaEYsSUFBVixLQUFtQnVOLGdCQUFnQnZOLElBTHZDO0FBTUQsU0FSYyxDQUFuQjtBQVNBLFlBQUksQ0FBQ29OLFlBQUwsRUFBbUI7QUFDakJELHVCQUFhVSxrQkFBYixDQUFnQzdJLFNBQWhDO0FBQ0Q7QUFDRCxlQUFPLENBQUNvSSxZQUFSO0FBQ0Q7O0FBR0QsZUFBU1UsU0FBVCxDQUFtQi9PLElBQW5CLEVBQXlCZ1AsV0FBekIsRUFBc0M7QUFDcEMsWUFBSWhKLElBQUksSUFBSXVELEtBQUosQ0FBVXlGLFdBQVYsQ0FBUjtBQUNBaEosVUFBRWhHLElBQUYsR0FBU0EsSUFBVDtBQUNBO0FBQ0FnRyxVQUFFd0QsSUFBRixHQUFTO0FBQ1B5Riw2QkFBbUIsQ0FEWjtBQUVQQyw2QkFBbUIsRUFGWjtBQUdQQyw4QkFBb0IsRUFIYjtBQUlQQyxxQkFBV0MsU0FKSjtBQUtQQywwQkFBZ0JEO0FBTFQsVUFNUHJQLElBTk8sQ0FBVDtBQU9BLGVBQU9nRyxDQUFQO0FBQ0Q7O0FBRUQ2QyxhQUFPRCxPQUFQLEdBQWlCLFVBQVNuRyxNQUFULEVBQWlCMkksV0FBakIsRUFBOEI7QUFDN0M7QUFDQTtBQUNBO0FBQ0EsaUJBQVNtRSw0QkFBVCxDQUFzQzNFLEtBQXRDLEVBQTZDdEosTUFBN0MsRUFBcUQ7QUFDbkRBLGlCQUFPa08sUUFBUCxDQUFnQjVFLEtBQWhCO0FBQ0F0SixpQkFBT21PLGFBQVAsQ0FBcUIsSUFBSWhOLE9BQU9pTixxQkFBWCxDQUFpQyxVQUFqQyxFQUNqQixFQUFDOUUsT0FBT0EsS0FBUixFQURpQixDQUFyQjtBQUVEOztBQUVELGlCQUFTK0UsaUNBQVQsQ0FBMkMvRSxLQUEzQyxFQUFrRHRKLE1BQWxELEVBQTBEO0FBQ3hEQSxpQkFBT3NPLFdBQVAsQ0FBbUJoRixLQUFuQjtBQUNBdEosaUJBQU9tTyxhQUFQLENBQXFCLElBQUloTixPQUFPaU4scUJBQVgsQ0FBaUMsYUFBakMsRUFDakIsRUFBQzlFLE9BQU9BLEtBQVIsRUFEaUIsQ0FBckI7QUFFRDs7QUFFRCxpQkFBU2lGLFlBQVQsQ0FBc0JDLEVBQXRCLEVBQTBCbEYsS0FBMUIsRUFBaUNtRixRQUFqQyxFQUEyQzVKLE9BQTNDLEVBQW9EO0FBQ2xELGNBQUk2SixhQUFhLElBQUlDLEtBQUosQ0FBVSxPQUFWLENBQWpCO0FBQ0FELHFCQUFXcEYsS0FBWCxHQUFtQkEsS0FBbkI7QUFDQW9GLHFCQUFXRCxRQUFYLEdBQXNCQSxRQUF0QjtBQUNBQyxxQkFBV25HLFdBQVgsR0FBeUIsRUFBQ2tHLFVBQVVBLFFBQVgsRUFBekI7QUFDQUMscUJBQVc3SixPQUFYLEdBQXFCQSxPQUFyQjtBQUNBMUQsaUJBQU9nQixVQUFQLENBQWtCLFlBQVc7QUFDM0JxTSxlQUFHSSxjQUFILENBQWtCLE9BQWxCLEVBQTJCRixVQUEzQjtBQUNELFdBRkQ7QUFHRDs7QUFFRCxZQUFJbEwsb0JBQW9CLFNBQXBCQSxpQkFBb0IsQ0FBU3FMLE1BQVQsRUFBaUI7QUFDdkMsY0FBSUwsS0FBSyxJQUFUOztBQUVBLGNBQUlNLGVBQWVDLFNBQVNDLHNCQUFULEVBQW5CO0FBQ0EsV0FBQyxrQkFBRCxFQUFxQixxQkFBckIsRUFBNEMsZUFBNUMsRUFDS3pNLE9BREwsQ0FDYSxVQUFTME0sTUFBVCxFQUFpQjtBQUN4QlQsZUFBR1MsTUFBSCxJQUFhSCxhQUFhRyxNQUFiLEVBQXFCQyxJQUFyQixDQUEwQkosWUFBMUIsQ0FBYjtBQUNELFdBSEw7O0FBS0EsZUFBS0ssdUJBQUwsR0FBK0IsSUFBL0I7O0FBRUEsZUFBS0MsZUFBTCxHQUF1QixLQUF2Qjs7QUFFQSxlQUFLQyxZQUFMLEdBQW9CLEVBQXBCO0FBQ0EsZUFBS0MsYUFBTCxHQUFxQixFQUFyQjs7QUFFQSxlQUFLdkwsZ0JBQUwsR0FBd0IsSUFBeEI7QUFDQSxlQUFLd0wsaUJBQUwsR0FBeUIsSUFBekI7O0FBRUEsZUFBSzdDLGNBQUwsR0FBc0IsUUFBdEI7QUFDQSxlQUFLOEMsa0JBQUwsR0FBMEIsS0FBMUI7QUFDQSxlQUFLQyxlQUFMLEdBQXVCLEtBQXZCO0FBQ0EsZUFBS0MsaUJBQUwsR0FBeUIsS0FBekI7O0FBRUFiLG1CQUFTOUksS0FBS0MsS0FBTCxDQUFXRCxLQUFLcUIsU0FBTCxDQUFleUgsVUFBVSxFQUF6QixDQUFYLENBQVQ7O0FBRUEsZUFBS2MsV0FBTCxHQUFtQmQsT0FBT2UsWUFBUCxLQUF3QixZQUEzQztBQUNBLGNBQUlmLE9BQU9nQixhQUFQLEtBQXlCLFdBQTdCLEVBQTBDO0FBQ3hDLGtCQUFNcEMsVUFBVSxtQkFBVixFQUNGLDhDQURFLENBQU47QUFFRCxXQUhELE1BR08sSUFBSSxDQUFDb0IsT0FBT2dCLGFBQVosRUFBMkI7QUFDaENoQixtQkFBT2dCLGFBQVAsR0FBdUIsU0FBdkI7QUFDRDs7QUFFRCxrQkFBUWhCLE9BQU9pQixrQkFBZjtBQUNFLGlCQUFLLEtBQUw7QUFDQSxpQkFBSyxPQUFMO0FBQ0U7QUFDRjtBQUNFakIscUJBQU9pQixrQkFBUCxHQUE0QixLQUE1QjtBQUNBO0FBTko7O0FBU0Esa0JBQVFqQixPQUFPZSxZQUFmO0FBQ0UsaUJBQUssVUFBTDtBQUNBLGlCQUFLLFlBQUw7QUFDQSxpQkFBSyxZQUFMO0FBQ0U7QUFDRjtBQUNFZixxQkFBT2UsWUFBUCxHQUFzQixVQUF0QjtBQUNBO0FBUEo7O0FBVUFmLGlCQUFPaEYsVUFBUCxHQUFvQkQsaUJBQWlCaUYsT0FBT2hGLFVBQVAsSUFBcUIsRUFBdEMsRUFBMENDLFdBQTFDLENBQXBCOztBQUVBLGVBQUtpRyxhQUFMLEdBQXFCLEVBQXJCO0FBQ0EsY0FBSWxCLE9BQU9tQixvQkFBWCxFQUFpQztBQUMvQixpQkFBSyxJQUFJMUssSUFBSXVKLE9BQU9tQixvQkFBcEIsRUFBMEMxSyxJQUFJLENBQTlDLEVBQWlEQSxHQUFqRCxFQUFzRDtBQUNwRCxtQkFBS3lLLGFBQUwsQ0FBbUJ0TixJQUFuQixDQUF3QixJQUFJdEIsT0FBTzhPLGNBQVgsQ0FBMEI7QUFDaERwRyw0QkFBWWdGLE9BQU9oRixVQUQ2QjtBQUVoRHFHLDhCQUFjckIsT0FBT2lCO0FBRjJCLGVBQTFCLENBQXhCO0FBSUQ7QUFDRixXQVBELE1BT087QUFDTGpCLG1CQUFPbUIsb0JBQVAsR0FBOEIsQ0FBOUI7QUFDRDs7QUFFRCxlQUFLRyxPQUFMLEdBQWV0QixNQUFmOztBQUVBO0FBQ0E7QUFDQSxlQUFLdUIsWUFBTCxHQUFvQixFQUFwQjs7QUFFQSxlQUFLQyxhQUFMLEdBQXFCaEksU0FBU2lJLGlCQUFULEVBQXJCO0FBQ0EsZUFBS0Msa0JBQUwsR0FBMEIsQ0FBMUI7O0FBRUEsZUFBS0MsU0FBTCxHQUFpQnpDLFNBQWpCLENBNUV1QyxDQTRFWDs7QUFFNUIsZUFBSzBDLFNBQUwsR0FBaUIsS0FBakI7QUFDRCxTQS9FRDs7QUFpRkE7QUFDQWpOLDBCQUFrQmtOLFNBQWxCLENBQTRCak0sY0FBNUIsR0FBNkMsSUFBN0M7QUFDQWpCLDBCQUFrQmtOLFNBQWxCLENBQTRCQyxXQUE1QixHQUEwQyxJQUExQztBQUNBbk4sMEJBQWtCa04sU0FBbEIsQ0FBNEI5TCxPQUE1QixHQUFzQyxJQUF0QztBQUNBcEIsMEJBQWtCa04sU0FBbEIsQ0FBNEJFLGNBQTVCLEdBQTZDLElBQTdDO0FBQ0FwTiwwQkFBa0JrTixTQUFsQixDQUE0Qkcsc0JBQTVCLEdBQXFELElBQXJEO0FBQ0FyTiwwQkFBa0JrTixTQUFsQixDQUE0QkksMEJBQTVCLEdBQXlELElBQXpEO0FBQ0F0TiwwQkFBa0JrTixTQUFsQixDQUE0QkssdUJBQTVCLEdBQXNELElBQXREO0FBQ0F2TiwwQkFBa0JrTixTQUFsQixDQUE0Qk0seUJBQTVCLEdBQXdELElBQXhEO0FBQ0F4TiwwQkFBa0JrTixTQUFsQixDQUE0Qk8sbUJBQTVCLEdBQWtELElBQWxEO0FBQ0F6TiwwQkFBa0JrTixTQUFsQixDQUE0QlEsYUFBNUIsR0FBNEMsSUFBNUM7O0FBRUExTiwwQkFBa0JrTixTQUFsQixDQUE0QjlCLGNBQTVCLEdBQTZDLFVBQVNsUSxJQUFULEVBQWUyQyxLQUFmLEVBQXNCO0FBQ2pFLGNBQUksS0FBS29QLFNBQVQsRUFBb0I7QUFDbEI7QUFDRDtBQUNELGVBQUt0QyxhQUFMLENBQW1COU0sS0FBbkI7QUFDQSxjQUFJLE9BQU8sS0FBSyxPQUFPM0MsSUFBWixDQUFQLEtBQTZCLFVBQWpDLEVBQTZDO0FBQzNDLGlCQUFLLE9BQU9BLElBQVosRUFBa0IyQyxLQUFsQjtBQUNEO0FBQ0YsU0FSRDs7QUFVQW1DLDBCQUFrQmtOLFNBQWxCLENBQTRCUyx5QkFBNUIsR0FBd0QsWUFBVztBQUNqRSxjQUFJOVAsUUFBUSxJQUFJc04sS0FBSixDQUFVLHlCQUFWLENBQVo7QUFDQSxlQUFLQyxjQUFMLENBQW9CLHlCQUFwQixFQUErQ3ZOLEtBQS9DO0FBQ0QsU0FIRDs7QUFLQW1DLDBCQUFrQmtOLFNBQWxCLENBQTRCVSxnQkFBNUIsR0FBK0MsWUFBVztBQUN4RCxpQkFBTyxLQUFLakIsT0FBWjtBQUNELFNBRkQ7O0FBSUEzTSwwQkFBa0JrTixTQUFsQixDQUE0QlcsZUFBNUIsR0FBOEMsWUFBVztBQUN2RCxpQkFBTyxLQUFLaEMsWUFBWjtBQUNELFNBRkQ7O0FBSUE3TCwwQkFBa0JrTixTQUFsQixDQUE0QlksZ0JBQTVCLEdBQStDLFlBQVc7QUFDeEQsaUJBQU8sS0FBS2hDLGFBQVo7QUFDRCxTQUZEOztBQUlBO0FBQ0E7QUFDQTlMLDBCQUFrQmtOLFNBQWxCLENBQTRCYSxrQkFBNUIsR0FBaUQsVUFBUzVJLElBQVQsRUFBZTZJLFFBQWYsRUFBeUI7QUFDeEUsY0FBSUMscUJBQXFCLEtBQUtyQixZQUFMLENBQWtCeE4sTUFBbEIsR0FBMkIsQ0FBcEQ7QUFDQSxjQUFJMkYsY0FBYztBQUNoQmUsbUJBQU8sSUFEUztBQUVoQlQseUJBQWEsSUFGRztBQUdoQmlFLDBCQUFjLElBSEU7QUFJaEI5RCwyQkFBZSxJQUpDO0FBS2hCeUIsK0JBQW1CLElBTEg7QUFNaEJDLGdDQUFvQixJQU5KO0FBT2hCeEIsdUJBQVcsSUFQSztBQVFoQkMseUJBQWEsSUFSRztBQVNoQlIsa0JBQU1BLElBVFU7QUFVaEJNLGlCQUFLLElBVlc7QUFXaEJPLG9DQUF3QixJQVhSO0FBWWhCa0ksb0NBQXdCLElBWlI7QUFhaEIxUixvQkFBUSxJQWJRO0FBY2hCMlIsMENBQThCLEVBZGQ7QUFlaEJDLHlCQUFhO0FBZkcsV0FBbEI7QUFpQkEsY0FBSSxLQUFLakMsV0FBTCxJQUFvQjhCLGtCQUF4QixFQUE0QztBQUMxQ2xKLHdCQUFZdUUsWUFBWixHQUEyQixLQUFLc0QsWUFBTCxDQUFrQixDQUFsQixFQUFxQnRELFlBQWhEO0FBQ0F2RSx3QkFBWVMsYUFBWixHQUE0QixLQUFLb0gsWUFBTCxDQUFrQixDQUFsQixFQUFxQnBILGFBQWpEO0FBQ0QsV0FIRCxNQUdPO0FBQ0wsZ0JBQUk2SSxhQUFhLEtBQUtDLDJCQUFMLEVBQWpCO0FBQ0F2Six3QkFBWXVFLFlBQVosR0FBMkIrRSxXQUFXL0UsWUFBdEM7QUFDQXZFLHdCQUFZUyxhQUFaLEdBQTRCNkksV0FBVzdJLGFBQXZDO0FBQ0Q7QUFDRCxjQUFJLENBQUN3SSxRQUFMLEVBQWU7QUFDYixpQkFBS3BCLFlBQUwsQ0FBa0IzTixJQUFsQixDQUF1QjhGLFdBQXZCO0FBQ0Q7QUFDRCxpQkFBT0EsV0FBUDtBQUNELFNBL0JEOztBQWlDQS9FLDBCQUFrQmtOLFNBQWxCLENBQTRCeEMsUUFBNUIsR0FBdUMsVUFBUzVFLEtBQVQsRUFBZ0J0SixNQUFoQixFQUF3QjtBQUM3RCxjQUFJLEtBQUt5USxTQUFULEVBQW9CO0FBQ2xCLGtCQUFNaEQsVUFBVSxtQkFBVixFQUNGLHdEQURFLENBQU47QUFFRDs7QUFFRCxjQUFJc0UsZ0JBQWdCLEtBQUszQixZQUFMLENBQWtCbkQsSUFBbEIsQ0FBdUIsVUFBU3JGLENBQVQsRUFBWTtBQUNyRCxtQkFBT0EsRUFBRTBCLEtBQUYsS0FBWUEsS0FBbkI7QUFDRCxXQUZtQixDQUFwQjs7QUFJQSxjQUFJeUksYUFBSixFQUFtQjtBQUNqQixrQkFBTXRFLFVBQVUsb0JBQVYsRUFBZ0MsdUJBQWhDLENBQU47QUFDRDs7QUFFRCxjQUFJbEYsV0FBSjtBQUNBLGVBQUssSUFBSWpELElBQUksQ0FBYixFQUFnQkEsSUFBSSxLQUFLOEssWUFBTCxDQUFrQnhOLE1BQXRDLEVBQThDMEMsR0FBOUMsRUFBbUQ7QUFDakQsZ0JBQUksQ0FBQyxLQUFLOEssWUFBTCxDQUFrQjlLLENBQWxCLEVBQXFCZ0UsS0FBdEIsSUFDQSxLQUFLOEcsWUFBTCxDQUFrQjlLLENBQWxCLEVBQXFCcUQsSUFBckIsS0FBOEJXLE1BQU1YLElBRHhDLEVBQzhDO0FBQzVDSiw0QkFBYyxLQUFLNkgsWUFBTCxDQUFrQjlLLENBQWxCLENBQWQ7QUFDRDtBQUNGO0FBQ0QsY0FBSSxDQUFDaUQsV0FBTCxFQUFrQjtBQUNoQkEsMEJBQWMsS0FBS2dKLGtCQUFMLENBQXdCakksTUFBTVgsSUFBOUIsQ0FBZDtBQUNEOztBQUVELGVBQUtxSiwyQkFBTDs7QUFFQSxjQUFJLEtBQUszQyxZQUFMLENBQWtCOUUsT0FBbEIsQ0FBMEJ2SyxNQUExQixNQUFzQyxDQUFDLENBQTNDLEVBQThDO0FBQzVDLGlCQUFLcVAsWUFBTCxDQUFrQjVNLElBQWxCLENBQXVCekMsTUFBdkI7QUFDRDs7QUFFRHVJLHNCQUFZZSxLQUFaLEdBQW9CQSxLQUFwQjtBQUNBZixzQkFBWXZJLE1BQVosR0FBcUJBLE1BQXJCO0FBQ0F1SSxzQkFBWVcsU0FBWixHQUF3QixJQUFJL0gsT0FBTzhRLFlBQVgsQ0FBd0IzSSxLQUF4QixFQUNwQmYsWUFBWVMsYUFEUSxDQUF4QjtBQUVBLGlCQUFPVCxZQUFZVyxTQUFuQjtBQUNELFNBcENEOztBQXNDQTFGLDBCQUFrQmtOLFNBQWxCLENBQTRCekwsU0FBNUIsR0FBd0MsVUFBU2pGLE1BQVQsRUFBaUI7QUFDdkQsY0FBSXdPLEtBQUssSUFBVDtBQUNBLGNBQUkxRSxlQUFlLEtBQW5CLEVBQTBCO0FBQ3hCOUosbUJBQU9rUyxTQUFQLEdBQW1CM1AsT0FBbkIsQ0FBMkIsVUFBUytHLEtBQVQsRUFBZ0I7QUFDekNrRixpQkFBR04sUUFBSCxDQUFZNUUsS0FBWixFQUFtQnRKLE1BQW5CO0FBQ0QsYUFGRDtBQUdELFdBSkQsTUFJTztBQUNMO0FBQ0E7QUFDQTtBQUNBLGdCQUFJbVMsZUFBZW5TLE9BQU9vUyxLQUFQLEVBQW5CO0FBQ0FwUyxtQkFBT2tTLFNBQVAsR0FBbUIzUCxPQUFuQixDQUEyQixVQUFTK0csS0FBVCxFQUFnQitJLEdBQWhCLEVBQXFCO0FBQzlDLGtCQUFJQyxjQUFjSCxhQUFhRCxTQUFiLEdBQXlCRyxHQUF6QixDQUFsQjtBQUNBL0ksb0JBQU1pSixnQkFBTixDQUF1QixTQUF2QixFQUFrQyxVQUFTbFIsS0FBVCxFQUFnQjtBQUNoRGlSLDRCQUFZRSxPQUFaLEdBQXNCblIsTUFBTW1SLE9BQTVCO0FBQ0QsZUFGRDtBQUdELGFBTEQ7QUFNQUwseUJBQWFELFNBQWIsR0FBeUIzUCxPQUF6QixDQUFpQyxVQUFTK0csS0FBVCxFQUFnQjtBQUMvQ2tGLGlCQUFHTixRQUFILENBQVk1RSxLQUFaLEVBQW1CNkksWUFBbkI7QUFDRCxhQUZEO0FBR0Q7QUFDRixTQXJCRDs7QUF1QkEzTywwQkFBa0JrTixTQUFsQixDQUE0QnBDLFdBQTVCLEdBQTBDLFVBQVNtRSxNQUFULEVBQWlCO0FBQ3pELGNBQUksS0FBS2hDLFNBQVQsRUFBb0I7QUFDbEIsa0JBQU1oRCxVQUFVLG1CQUFWLEVBQ0YsMkRBREUsQ0FBTjtBQUVEOztBQUVELGNBQUksRUFBRWdGLGtCQUFrQnRSLE9BQU84USxZQUEzQixDQUFKLEVBQThDO0FBQzVDLGtCQUFNLElBQUluRSxTQUFKLENBQWMsaURBQ2hCLDRDQURFLENBQU47QUFFRDs7QUFFRCxjQUFJdkYsY0FBYyxLQUFLNkgsWUFBTCxDQUFrQm5ELElBQWxCLENBQXVCLFVBQVN4RixDQUFULEVBQVk7QUFDbkQsbUJBQU9BLEVBQUV5QixTQUFGLEtBQWdCdUosTUFBdkI7QUFDRCxXQUZpQixDQUFsQjs7QUFJQSxjQUFJLENBQUNsSyxXQUFMLEVBQWtCO0FBQ2hCLGtCQUFNa0YsVUFBVSxvQkFBVixFQUNGLDRDQURFLENBQU47QUFFRDtBQUNELGNBQUl6TixTQUFTdUksWUFBWXZJLE1BQXpCOztBQUVBdUksc0JBQVlXLFNBQVosQ0FBc0J3SixJQUF0QjtBQUNBbkssc0JBQVlXLFNBQVosR0FBd0IsSUFBeEI7QUFDQVgsc0JBQVllLEtBQVosR0FBb0IsSUFBcEI7QUFDQWYsc0JBQVl2SSxNQUFaLEdBQXFCLElBQXJCOztBQUVBO0FBQ0EsY0FBSXFQLGVBQWUsS0FBS2UsWUFBTCxDQUFrQnVDLEdBQWxCLENBQXNCLFVBQVNsTCxDQUFULEVBQVk7QUFDbkQsbUJBQU9BLEVBQUV6SCxNQUFUO0FBQ0QsV0FGa0IsQ0FBbkI7QUFHQSxjQUFJcVAsYUFBYTlFLE9BQWIsQ0FBcUJ2SyxNQUFyQixNQUFpQyxDQUFDLENBQWxDLElBQ0EsS0FBS3FQLFlBQUwsQ0FBa0I5RSxPQUFsQixDQUEwQnZLLE1BQTFCLElBQW9DLENBQUMsQ0FEekMsRUFDNEM7QUFDMUMsaUJBQUtxUCxZQUFMLENBQWtCdUQsTUFBbEIsQ0FBeUIsS0FBS3ZELFlBQUwsQ0FBa0I5RSxPQUFsQixDQUEwQnZLLE1BQTFCLENBQXpCLEVBQTRELENBQTVEO0FBQ0Q7O0FBRUQsZUFBS2dTLDJCQUFMO0FBQ0QsU0FwQ0Q7O0FBc0NBeE8sMEJBQWtCa04sU0FBbEIsQ0FBNEJtQyxZQUE1QixHQUEyQyxVQUFTN1MsTUFBVCxFQUFpQjtBQUMxRCxjQUFJd08sS0FBSyxJQUFUO0FBQ0F4TyxpQkFBT2tTLFNBQVAsR0FBbUIzUCxPQUFuQixDQUEyQixVQUFTK0csS0FBVCxFQUFnQjtBQUN6QyxnQkFBSW1KLFNBQVNqRSxHQUFHc0UsVUFBSCxHQUFnQjdGLElBQWhCLENBQXFCLFVBQVNyRixDQUFULEVBQVk7QUFDNUMscUJBQU9BLEVBQUUwQixLQUFGLEtBQVlBLEtBQW5CO0FBQ0QsYUFGWSxDQUFiO0FBR0EsZ0JBQUltSixNQUFKLEVBQVk7QUFDVmpFLGlCQUFHRixXQUFILENBQWVtRSxNQUFmO0FBQ0Q7QUFDRixXQVBEO0FBUUQsU0FWRDs7QUFZQWpQLDBCQUFrQmtOLFNBQWxCLENBQTRCb0MsVUFBNUIsR0FBeUMsWUFBVztBQUNsRCxpQkFBTyxLQUFLMUMsWUFBTCxDQUFrQnBHLE1BQWxCLENBQXlCLFVBQVN6QixXQUFULEVBQXNCO0FBQ3BELG1CQUFPLENBQUMsQ0FBQ0EsWUFBWVcsU0FBckI7QUFDRCxXQUZNLEVBR055SixHQUhNLENBR0YsVUFBU3BLLFdBQVQsRUFBc0I7QUFDekIsbUJBQU9BLFlBQVlXLFNBQW5CO0FBQ0QsV0FMTSxDQUFQO0FBTUQsU0FQRDs7QUFTQTFGLDBCQUFrQmtOLFNBQWxCLENBQTRCcUMsWUFBNUIsR0FBMkMsWUFBVztBQUNwRCxpQkFBTyxLQUFLM0MsWUFBTCxDQUFrQnBHLE1BQWxCLENBQXlCLFVBQVN6QixXQUFULEVBQXNCO0FBQ3BELG1CQUFPLENBQUMsQ0FBQ0EsWUFBWVksV0FBckI7QUFDRCxXQUZNLEVBR053SixHQUhNLENBR0YsVUFBU3BLLFdBQVQsRUFBc0I7QUFDekIsbUJBQU9BLFlBQVlZLFdBQW5CO0FBQ0QsV0FMTSxDQUFQO0FBTUQsU0FQRDs7QUFVQTNGLDBCQUFrQmtOLFNBQWxCLENBQTRCc0Msa0JBQTVCLEdBQWlELFVBQVNDLGFBQVQsRUFDN0N0RCxXQUQ2QyxFQUNoQztBQUNmLGNBQUluQixLQUFLLElBQVQ7QUFDQSxjQUFJbUIsZUFBZXNELGdCQUFnQixDQUFuQyxFQUFzQztBQUNwQyxtQkFBTyxLQUFLN0MsWUFBTCxDQUFrQixDQUFsQixFQUFxQnZILFdBQTVCO0FBQ0QsV0FGRCxNQUVPLElBQUksS0FBS2tILGFBQUwsQ0FBbUJuTixNQUF2QixFQUErQjtBQUNwQyxtQkFBTyxLQUFLbU4sYUFBTCxDQUFtQm1ELEtBQW5CLEVBQVA7QUFDRDtBQUNELGNBQUlySyxjQUFjLElBQUkxSCxPQUFPOE8sY0FBWCxDQUEwQjtBQUMxQ3BHLHdCQUFZLEtBQUtzRyxPQUFMLENBQWF0RyxVQURpQjtBQUUxQ3FHLDBCQUFjLEtBQUtDLE9BQUwsQ0FBYUw7QUFGZSxXQUExQixDQUFsQjtBQUlBOUksaUJBQU9tTSxjQUFQLENBQXNCdEssV0FBdEIsRUFBbUMsT0FBbkMsRUFDSSxFQUFDdUssT0FBTyxLQUFSLEVBQWVDLFVBQVUsSUFBekIsRUFESjs7QUFJQSxlQUFLakQsWUFBTCxDQUFrQjZDLGFBQWxCLEVBQWlDSyx1QkFBakMsR0FBMkQsRUFBM0Q7QUFDQSxlQUFLbEQsWUFBTCxDQUFrQjZDLGFBQWxCLEVBQWlDTSxnQkFBakMsR0FBb0QsVUFBU2xTLEtBQVQsRUFBZ0I7QUFDbEUsZ0JBQUltUyxNQUFNLENBQUNuUyxNQUFNc0QsU0FBUCxJQUFvQnFDLE9BQU9DLElBQVAsQ0FBWTVGLE1BQU1zRCxTQUFsQixFQUE2Qi9CLE1BQTdCLEtBQXdDLENBQXRFO0FBQ0E7QUFDQTtBQUNBaUcsd0JBQVk1SixLQUFaLEdBQW9CdVUsTUFBTSxXQUFOLEdBQW9CLFdBQXhDO0FBQ0EsZ0JBQUloRixHQUFHNEIsWUFBSCxDQUFnQjZDLGFBQWhCLEVBQStCSyx1QkFBL0IsS0FBMkQsSUFBL0QsRUFBcUU7QUFDbkU5RSxpQkFBRzRCLFlBQUgsQ0FBZ0I2QyxhQUFoQixFQUErQkssdUJBQS9CLENBQXVEN1EsSUFBdkQsQ0FBNERwQixLQUE1RDtBQUNEO0FBQ0YsV0FSRDtBQVNBd0gsc0JBQVkwSixnQkFBWixDQUE2QixnQkFBN0IsRUFDRSxLQUFLbkMsWUFBTCxDQUFrQjZDLGFBQWxCLEVBQWlDTSxnQkFEbkM7QUFFQSxpQkFBTzFLLFdBQVA7QUFDRCxTQTdCRDs7QUErQkE7QUFDQXJGLDBCQUFrQmtOLFNBQWxCLENBQTRCK0MsT0FBNUIsR0FBc0MsVUFBU3hLLEdBQVQsRUFBY2dLLGFBQWQsRUFBNkI7QUFDakUsY0FBSXpFLEtBQUssSUFBVDtBQUNBLGNBQUkzRixjQUFjLEtBQUt1SCxZQUFMLENBQWtCNkMsYUFBbEIsRUFBaUNwSyxXQUFuRDtBQUNBLGNBQUlBLFlBQVk2SyxnQkFBaEIsRUFBa0M7QUFDaEM7QUFDRDtBQUNELGNBQUlKLDBCQUNGLEtBQUtsRCxZQUFMLENBQWtCNkMsYUFBbEIsRUFBaUNLLHVCQURuQztBQUVBLGVBQUtsRCxZQUFMLENBQWtCNkMsYUFBbEIsRUFBaUNLLHVCQUFqQyxHQUEyRCxJQUEzRDtBQUNBekssc0JBQVk4SyxtQkFBWixDQUFnQyxnQkFBaEMsRUFDRSxLQUFLdkQsWUFBTCxDQUFrQjZDLGFBQWxCLEVBQWlDTSxnQkFEbkM7QUFFQTFLLHNCQUFZNkssZ0JBQVosR0FBK0IsVUFBU0UsR0FBVCxFQUFjO0FBQzNDLGdCQUFJcEYsR0FBR21CLFdBQUgsSUFBa0JzRCxnQkFBZ0IsQ0FBdEMsRUFBeUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDRDtBQUNELGdCQUFJNVIsUUFBUSxJQUFJc04sS0FBSixDQUFVLGNBQVYsQ0FBWjtBQUNBdE4sa0JBQU1zRCxTQUFOLEdBQWtCLEVBQUNrUCxRQUFRNUssR0FBVCxFQUFjZ0ssZUFBZUEsYUFBN0IsRUFBbEI7O0FBRUEsZ0JBQUlhLE9BQU9GLElBQUlqUCxTQUFmO0FBQ0E7QUFDQSxnQkFBSTZPLE1BQU0sQ0FBQ00sSUFBRCxJQUFTOU0sT0FBT0MsSUFBUCxDQUFZNk0sSUFBWixFQUFrQmxSLE1BQWxCLEtBQTZCLENBQWhEO0FBQ0EsZ0JBQUk0USxHQUFKLEVBQVM7QUFDUDtBQUNBO0FBQ0Esa0JBQUkzSyxZQUFZNUosS0FBWixLQUFzQixLQUF0QixJQUErQjRKLFlBQVk1SixLQUFaLEtBQXNCLFdBQXpELEVBQXNFO0FBQ3BFNEosNEJBQVk1SixLQUFaLEdBQW9CLFdBQXBCO0FBQ0Q7QUFDRixhQU5ELE1BTU87QUFDTCxrQkFBSTRKLFlBQVk1SixLQUFaLEtBQXNCLEtBQTFCLEVBQWlDO0FBQy9CNEosNEJBQVk1SixLQUFaLEdBQW9CLFdBQXBCO0FBQ0Q7QUFDRDtBQUNBNlUsbUJBQUtDLFNBQUwsR0FBaUIsQ0FBakI7QUFDQTtBQUNBRCxtQkFBS0UsS0FBTCxHQUFhbkwsWUFBWUMsa0JBQVosR0FBaUNtTCxnQkFBOUM7O0FBRUEsa0JBQUlDLHNCQUFzQjdMLFNBQVM4TCxjQUFULENBQXdCTCxJQUF4QixDQUExQjtBQUNBelMsb0JBQU1zRCxTQUFOLEdBQWtCLFNBQWN0RCxNQUFNc0QsU0FBcEIsRUFDZDBELFNBQVMrTCxjQUFULENBQXdCRixtQkFBeEIsQ0FEYyxDQUFsQjs7QUFHQTdTLG9CQUFNc0QsU0FBTixDQUFnQkEsU0FBaEIsR0FBNEJ1UCxtQkFBNUI7QUFDQTdTLG9CQUFNc0QsU0FBTixDQUFnQjBQLE1BQWhCLEdBQXlCLFlBQVc7QUFDbEMsdUJBQU87QUFDTDFQLDZCQUFXdEQsTUFBTXNELFNBQU4sQ0FBZ0JBLFNBRHRCO0FBRUxrUCwwQkFBUXhTLE1BQU1zRCxTQUFOLENBQWdCa1AsTUFGbkI7QUFHTFosaUNBQWU1UixNQUFNc0QsU0FBTixDQUFnQnNPLGFBSDFCO0FBSUxnQixvQ0FBa0I1UyxNQUFNc0QsU0FBTixDQUFnQnNQO0FBSjdCLGlCQUFQO0FBTUQsZUFQRDtBQVFEOztBQUVEO0FBQ0EsZ0JBQUlLLFdBQVdqTSxTQUFTa00sZ0JBQVQsQ0FBMEIvRixHQUFHekssZ0JBQUgsQ0FBb0JWLEdBQTlDLENBQWY7QUFDQSxnQkFBSSxDQUFDbVEsR0FBTCxFQUFVO0FBQ1JjLHVCQUFTalQsTUFBTXNELFNBQU4sQ0FBZ0JzTyxhQUF6QixLQUNJLE9BQU81UixNQUFNc0QsU0FBTixDQUFnQkEsU0FBdkIsR0FBbUMsTUFEdkM7QUFFRCxhQUhELE1BR087QUFDTDJQLHVCQUFTalQsTUFBTXNELFNBQU4sQ0FBZ0JzTyxhQUF6QixLQUNJLHlCQURKO0FBRUQ7QUFDRHpFLGVBQUd6SyxnQkFBSCxDQUFvQlYsR0FBcEIsR0FDSWdGLFNBQVNtTSxjQUFULENBQXdCaEcsR0FBR3pLLGdCQUFILENBQW9CVixHQUE1QyxJQUNBaVIsU0FBU0csSUFBVCxDQUFjLEVBQWQsQ0FGSjtBQUdBLGdCQUFJQyxXQUFXbEcsR0FBRzRCLFlBQUgsQ0FBZ0J1RSxLQUFoQixDQUFzQixVQUFTcE0sV0FBVCxFQUFzQjtBQUN6RCxxQkFBT0EsWUFBWU0sV0FBWixJQUNITixZQUFZTSxXQUFaLENBQXdCNUosS0FBeEIsS0FBa0MsV0FEdEM7QUFFRCxhQUhjLENBQWY7O0FBS0EsZ0JBQUl1UCxHQUFHa0IsaUJBQUgsS0FBeUIsV0FBN0IsRUFBMEM7QUFDeENsQixpQkFBR2tCLGlCQUFILEdBQXVCLFdBQXZCO0FBQ0FsQixpQkFBRzJDLHlCQUFIO0FBQ0Q7O0FBRUQ7QUFDQTtBQUNBLGdCQUFJLENBQUNxQyxHQUFMLEVBQVU7QUFDUmhGLGlCQUFHSSxjQUFILENBQWtCLGNBQWxCLEVBQWtDdk4sS0FBbEM7QUFDRDtBQUNELGdCQUFJcVQsUUFBSixFQUFjO0FBQ1psRyxpQkFBR0ksY0FBSCxDQUFrQixjQUFsQixFQUFrQyxJQUFJRCxLQUFKLENBQVUsY0FBVixDQUFsQztBQUNBSCxpQkFBR2tCLGlCQUFILEdBQXVCLFVBQXZCO0FBQ0FsQixpQkFBRzJDLHlCQUFIO0FBQ0Q7QUFDRixXQTNFRDs7QUE2RUE7QUFDQWhRLGlCQUFPZ0IsVUFBUCxDQUFrQixZQUFXO0FBQzNCbVIsb0NBQXdCL1EsT0FBeEIsQ0FBZ0MsVUFBU21DLENBQVQsRUFBWTtBQUMxQ21FLDBCQUFZNkssZ0JBQVosQ0FBNkJoUCxDQUE3QjtBQUNELGFBRkQ7QUFHRCxXQUpELEVBSUcsQ0FKSDtBQUtELFNBOUZEOztBQWdHQTtBQUNBbEIsMEJBQWtCa04sU0FBbEIsQ0FBNEJvQiwyQkFBNUIsR0FBMEQsWUFBVztBQUNuRSxjQUFJdEQsS0FBSyxJQUFUO0FBQ0EsY0FBSTFCLGVBQWUsSUFBSTNMLE9BQU95VCxlQUFYLENBQTJCLElBQTNCLENBQW5CO0FBQ0E5SCx1QkFBYStILGdCQUFiLEdBQWdDLFlBQVc7QUFDekNyRyxlQUFHc0cseUJBQUg7QUFDQXRHLGVBQUd1RyxzQkFBSDtBQUNELFdBSEQ7O0FBS0EsY0FBSS9MLGdCQUFnQixJQUFJN0gsT0FBTzZULGdCQUFYLENBQTRCbEksWUFBNUIsQ0FBcEI7QUFDQTlELHdCQUFjaU0saUJBQWQsR0FBa0MsWUFBVztBQUMzQ3pHLGVBQUd1RyxzQkFBSDtBQUNELFdBRkQ7QUFHQS9MLHdCQUFjdEMsT0FBZCxHQUF3QixZQUFXO0FBQ2pDO0FBQ0FNLG1CQUFPbU0sY0FBUCxDQUFzQm5LLGFBQXRCLEVBQXFDLE9BQXJDLEVBQ0ksRUFBQ29LLE9BQU8sUUFBUixFQUFrQkMsVUFBVSxJQUE1QixFQURKO0FBRUE3RSxlQUFHdUcsc0JBQUg7QUFDRCxXQUxEOztBQU9BLGlCQUFPO0FBQ0xqSSwwQkFBY0EsWUFEVDtBQUVMOUQsMkJBQWVBO0FBRlYsV0FBUDtBQUlELFNBdkJEOztBQXlCQTtBQUNBO0FBQ0F4RiwwQkFBa0JrTixTQUFsQixDQUE0QndFLDRCQUE1QixHQUEyRCxVQUN2RGpDLGFBRHVELEVBQ3hDO0FBQ2pCLGNBQUlwSyxjQUFjLEtBQUt1SCxZQUFMLENBQWtCNkMsYUFBbEIsRUFBaUNwSyxXQUFuRDtBQUNBLGNBQUlBLFdBQUosRUFBaUI7QUFDZixtQkFBT0EsWUFBWTZLLGdCQUFuQjtBQUNBLG1CQUFPLEtBQUt0RCxZQUFMLENBQWtCNkMsYUFBbEIsRUFBaUNwSyxXQUF4QztBQUNEO0FBQ0QsY0FBSWlFLGVBQWUsS0FBS3NELFlBQUwsQ0FBa0I2QyxhQUFsQixFQUFpQ25HLFlBQXBEO0FBQ0EsY0FBSUEsWUFBSixFQUFrQjtBQUNoQixtQkFBT0EsYUFBYStILGdCQUFwQjtBQUNBLG1CQUFPLEtBQUt6RSxZQUFMLENBQWtCNkMsYUFBbEIsRUFBaUNuRyxZQUF4QztBQUNEO0FBQ0QsY0FBSTlELGdCQUFnQixLQUFLb0gsWUFBTCxDQUFrQjZDLGFBQWxCLEVBQWlDakssYUFBckQ7QUFDQSxjQUFJQSxhQUFKLEVBQW1CO0FBQ2pCLG1CQUFPQSxjQUFjaU0saUJBQXJCO0FBQ0EsbUJBQU9qTSxjQUFjdEMsT0FBckI7QUFDQSxtQkFBTyxLQUFLMEosWUFBTCxDQUFrQjZDLGFBQWxCLEVBQWlDakssYUFBeEM7QUFDRDtBQUNGLFNBbEJEOztBQW9CQTtBQUNBeEYsMEJBQWtCa04sU0FBbEIsQ0FBNEJ5RSxXQUE1QixHQUEwQyxVQUFTNU0sV0FBVCxFQUN0Q3BCLElBRHNDLEVBQ2hDaU8sSUFEZ0MsRUFDMUI7QUFDZCxjQUFJQyxTQUFTN0ssc0JBQXNCakMsWUFBWWtDLGlCQUFsQyxFQUNUbEMsWUFBWW1DLGtCQURILENBQWI7QUFFQSxjQUFJdkQsUUFBUW9CLFlBQVlXLFNBQXhCLEVBQW1DO0FBQ2pDbU0sbUJBQU9DLFNBQVAsR0FBbUIvTSxZQUFZaUIsc0JBQS9CO0FBQ0E2TCxtQkFBT0UsSUFBUCxHQUFjO0FBQ1pDLHFCQUFPbk4sU0FBU3NCLFVBREo7QUFFWjhMLHdCQUFVbE4sWUFBWW1OLGNBQVosQ0FBMkJEO0FBRnpCLGFBQWQ7QUFJQSxnQkFBSWxOLFlBQVltSixzQkFBWixDQUFtQzlPLE1BQXZDLEVBQStDO0FBQzdDeVMscUJBQU9FLElBQVAsQ0FBWTlMLElBQVosR0FBbUJsQixZQUFZbUosc0JBQVosQ0FBbUMsQ0FBbkMsRUFBc0NqSSxJQUF6RDtBQUNEO0FBQ0RsQix3QkFBWVcsU0FBWixDQUFzQi9CLElBQXRCLENBQTJCa08sTUFBM0I7QUFDRDtBQUNELGNBQUlELFFBQVE3TSxZQUFZWSxXQUFwQixJQUFtQ2tNLE9BQU96SyxNQUFQLENBQWNoSSxNQUFkLEdBQXVCLENBQTlELEVBQWlFO0FBQy9EO0FBQ0EsZ0JBQUkyRixZQUFZSSxJQUFaLEtBQXFCLE9BQXJCLElBQ0dKLFlBQVltSixzQkFEZixJQUVHNUgsY0FBYyxLQUZyQixFQUU0QjtBQUMxQnZCLDBCQUFZbUosc0JBQVosQ0FBbUNuUCxPQUFuQyxDQUEyQyxVQUFTb1QsQ0FBVCxFQUFZO0FBQ3JELHVCQUFPQSxFQUFFak0sR0FBVDtBQUNELGVBRkQ7QUFHRDtBQUNELGdCQUFJbkIsWUFBWW1KLHNCQUFaLENBQW1DOU8sTUFBdkMsRUFBK0M7QUFDN0N5UyxxQkFBT0MsU0FBUCxHQUFtQi9NLFlBQVltSixzQkFBL0I7QUFDRCxhQUZELE1BRU87QUFDTDJELHFCQUFPQyxTQUFQLEdBQW1CLENBQUMsRUFBRCxDQUFuQjtBQUNEO0FBQ0RELG1CQUFPRSxJQUFQLEdBQWM7QUFDWkUsd0JBQVVsTixZQUFZbU4sY0FBWixDQUEyQkQ7QUFEekIsYUFBZDtBQUdBLGdCQUFJbE4sWUFBWW1OLGNBQVosQ0FBMkJGLEtBQS9CLEVBQXNDO0FBQ3BDSCxxQkFBT0UsSUFBUCxDQUFZQyxLQUFaLEdBQW9Cak4sWUFBWW1OLGNBQVosQ0FBMkJGLEtBQS9DO0FBQ0Q7QUFDRCxnQkFBSWpOLFlBQVlpQixzQkFBWixDQUFtQzVHLE1BQXZDLEVBQStDO0FBQzdDeVMscUJBQU9FLElBQVAsQ0FBWTlMLElBQVosR0FBbUJsQixZQUFZaUIsc0JBQVosQ0FBbUMsQ0FBbkMsRUFBc0NDLElBQXpEO0FBQ0Q7QUFDRGxCLHdCQUFZWSxXQUFaLENBQXdCeU0sT0FBeEIsQ0FBZ0NQLE1BQWhDO0FBQ0Q7QUFDRixTQXhDRDs7QUEwQ0E3UiwwQkFBa0JrTixTQUFsQixDQUE0QjdNLG1CQUE1QixHQUFrRCxVQUFTNkosV0FBVCxFQUFzQjtBQUN0RSxjQUFJYyxLQUFLLElBQVQ7O0FBRUE7QUFDQSxjQUFJLENBQUMsT0FBRCxFQUFVLFFBQVYsRUFBb0JqRSxPQUFwQixDQUE0Qm1ELFlBQVkvTixJQUF4QyxNQUFrRCxDQUFDLENBQXZELEVBQTBEO0FBQ3hELG1CQUFPa0gsUUFBUW5CLE1BQVIsQ0FBZStILFVBQVUsV0FBVixFQUNsQix1QkFBdUJDLFlBQVkvTixJQUFuQyxHQUEwQyxHQUR4QixDQUFmLENBQVA7QUFFRDs7QUFFRCxjQUFJLENBQUM2TSxnQ0FBZ0MscUJBQWhDLEVBQ0RrQixZQUFZL04sSUFEWCxFQUNpQjZPLEdBQUc5QixjQURwQixDQUFELElBQ3dDOEIsR0FBR2lDLFNBRC9DLEVBQzBEO0FBQ3hELG1CQUFPNUosUUFBUW5CLE1BQVIsQ0FBZStILFVBQVUsbUJBQVYsRUFDbEIsdUJBQXVCQyxZQUFZL04sSUFBbkMsR0FDQSxZQURBLEdBQ2U2TyxHQUFHOUIsY0FGQSxDQUFmLENBQVA7QUFHRDs7QUFFRCxjQUFJNEgsUUFBSjtBQUNBLGNBQUl1QixXQUFKO0FBQ0EsY0FBSW5JLFlBQVkvTixJQUFaLEtBQXFCLE9BQXpCLEVBQWtDO0FBQ2hDO0FBQ0E7QUFDQTJVLHVCQUFXak0sU0FBU3lOLGFBQVQsQ0FBdUJwSSxZQUFZckssR0FBbkMsQ0FBWDtBQUNBd1MsMEJBQWN2QixTQUFTcEIsS0FBVCxFQUFkO0FBQ0FvQixxQkFBUy9SLE9BQVQsQ0FBaUIsVUFBU3dULFlBQVQsRUFBdUI5QyxhQUF2QixFQUFzQztBQUNyRCxrQkFBSXpLLE9BQU9ILFNBQVMyTixrQkFBVCxDQUE0QkQsWUFBNUIsQ0FBWDtBQUNBdkgsaUJBQUc0QixZQUFILENBQWdCNkMsYUFBaEIsRUFBK0J4SSxpQkFBL0IsR0FBbURqQyxJQUFuRDtBQUNELGFBSEQ7O0FBS0FnRyxlQUFHNEIsWUFBSCxDQUFnQjdOLE9BQWhCLENBQXdCLFVBQVNnRyxXQUFULEVBQXNCMEssYUFBdEIsRUFBcUM7QUFDM0R6RSxpQkFBR2lGLE9BQUgsQ0FBV2xMLFlBQVlVLEdBQXZCLEVBQTRCZ0ssYUFBNUI7QUFDRCxhQUZEO0FBR0QsV0FiRCxNQWFPLElBQUl2RixZQUFZL04sSUFBWixLQUFxQixRQUF6QixFQUFtQztBQUN4QzJVLHVCQUFXak0sU0FBU3lOLGFBQVQsQ0FBdUJ0SCxHQUFHZSxpQkFBSCxDQUFxQmxNLEdBQTVDLENBQVg7QUFDQXdTLDBCQUFjdkIsU0FBU3BCLEtBQVQsRUFBZDtBQUNBLGdCQUFJK0MsWUFBWTVOLFNBQVM2TixXQUFULENBQXFCTCxXQUFyQixFQUNaLFlBRFksRUFDRWpULE1BREYsR0FDVyxDQUQzQjtBQUVBMFIscUJBQVMvUixPQUFULENBQWlCLFVBQVN3VCxZQUFULEVBQXVCOUMsYUFBdkIsRUFBc0M7QUFDckQsa0JBQUkxSyxjQUFjaUcsR0FBRzRCLFlBQUgsQ0FBZ0I2QyxhQUFoQixDQUFsQjtBQUNBLGtCQUFJcEssY0FBY04sWUFBWU0sV0FBOUI7QUFDQSxrQkFBSWlFLGVBQWV2RSxZQUFZdUUsWUFBL0I7QUFDQSxrQkFBSTlELGdCQUFnQlQsWUFBWVMsYUFBaEM7QUFDQSxrQkFBSXlCLG9CQUFvQmxDLFlBQVlrQyxpQkFBcEM7QUFDQSxrQkFBSUMscUJBQXFCbkMsWUFBWW1DLGtCQUFyQzs7QUFFQTtBQUNBLGtCQUFJeUwsV0FBVzlOLFNBQVMrTixVQUFULENBQW9CTCxZQUFwQixLQUNYMU4sU0FBUzZOLFdBQVQsQ0FBcUJILFlBQXJCLEVBQW1DLGVBQW5DLEVBQW9EblQsTUFBcEQsS0FBK0QsQ0FEbkU7O0FBR0Esa0JBQUksQ0FBQ3VULFFBQUQsSUFBYSxDQUFDNU4sWUFBWTROLFFBQTlCLEVBQXdDO0FBQ3RDLG9CQUFJRSxzQkFBc0JoTyxTQUFTaU8sZ0JBQVQsQ0FDdEJQLFlBRHNCLEVBQ1JGLFdBRFEsQ0FBMUI7QUFFQSxvQkFBSVUsdUJBQXVCbE8sU0FBU21PLGlCQUFULENBQ3ZCVCxZQUR1QixFQUNURixXQURTLENBQTNCO0FBRUEsb0JBQUlJLFNBQUosRUFBZTtBQUNiTSx1Q0FBcUJFLElBQXJCLEdBQTRCLFFBQTVCO0FBQ0Q7O0FBRUQsb0JBQUksQ0FBQ2pJLEdBQUdtQixXQUFKLElBQW1Cc0Qsa0JBQWtCLENBQXpDLEVBQTRDO0FBQzFDekUscUJBQUdpRixPQUFILENBQVdsTCxZQUFZVSxHQUF2QixFQUE0QmdLLGFBQTVCO0FBQ0Esc0JBQUluRyxhQUFhN04sS0FBYixLQUF1QixLQUEzQixFQUFrQztBQUNoQzZOLGlDQUFhNEosS0FBYixDQUFtQjdOLFdBQW5CLEVBQWdDd04sbUJBQWhDLEVBQ0lKLFlBQVksYUFBWixHQUE0QixZQURoQztBQUVEO0FBQ0Qsc0JBQUlqTixjQUFjL0osS0FBZCxLQUF3QixLQUE1QixFQUFtQztBQUNqQytKLGtDQUFjME4sS0FBZCxDQUFvQkgsb0JBQXBCO0FBQ0Q7QUFDRjs7QUFFRDtBQUNBLG9CQUFJbEIsU0FBUzdLLHNCQUFzQkMsaUJBQXRCLEVBQ1RDLGtCQURTLENBQWI7O0FBR0E7QUFDQTtBQUNBOEQsbUJBQUcyRyxXQUFILENBQWU1TSxXQUFmLEVBQ0k4TSxPQUFPekssTUFBUCxDQUFjaEksTUFBZCxHQUF1QixDQUQzQixFQUVJLEtBRko7QUFHRDtBQUNGLGFBMUNEO0FBMkNEOztBQUVENEwsYUFBR3pLLGdCQUFILEdBQXNCO0FBQ3BCcEUsa0JBQU0rTixZQUFZL04sSUFERTtBQUVwQjBELGlCQUFLcUssWUFBWXJLO0FBRkcsV0FBdEI7QUFJQSxjQUFJcUssWUFBWS9OLElBQVosS0FBcUIsT0FBekIsRUFBa0M7QUFDaEM2TyxlQUFHbUkscUJBQUgsQ0FBeUIsa0JBQXpCO0FBQ0QsV0FGRCxNQUVPO0FBQ0xuSSxlQUFHbUkscUJBQUgsQ0FBeUIsUUFBekI7QUFDRDs7QUFFRCxpQkFBTzlQLFFBQVF0RCxPQUFSLEVBQVA7QUFDRCxTQTVGRDs7QUE4RkFDLDBCQUFrQmtOLFNBQWxCLENBQTRCak4sb0JBQTVCLEdBQW1ELFVBQVNpSyxXQUFULEVBQXNCO0FBQ3ZFLGNBQUljLEtBQUssSUFBVDs7QUFFQTtBQUNBLGNBQUksQ0FBQyxPQUFELEVBQVUsUUFBVixFQUFvQmpFLE9BQXBCLENBQTRCbUQsWUFBWS9OLElBQXhDLE1BQWtELENBQUMsQ0FBdkQsRUFBMEQ7QUFDeEQsbUJBQU9rSCxRQUFRbkIsTUFBUixDQUFlK0gsVUFBVSxXQUFWLEVBQ2xCLHVCQUF1QkMsWUFBWS9OLElBQW5DLEdBQTBDLEdBRHhCLENBQWYsQ0FBUDtBQUVEOztBQUVELGNBQUksQ0FBQzZNLGdDQUFnQyxzQkFBaEMsRUFDRGtCLFlBQVkvTixJQURYLEVBQ2lCNk8sR0FBRzlCLGNBRHBCLENBQUQsSUFDd0M4QixHQUFHaUMsU0FEL0MsRUFDMEQ7QUFDeEQsbUJBQU81SixRQUFRbkIsTUFBUixDQUFlK0gsVUFBVSxtQkFBVixFQUNsQix3QkFBd0JDLFlBQVkvTixJQUFwQyxHQUNBLFlBREEsR0FDZTZPLEdBQUc5QixjQUZBLENBQWYsQ0FBUDtBQUdEOztBQUVELGNBQUk3SCxVQUFVLEVBQWQ7QUFDQTJKLGFBQUdjLGFBQUgsQ0FBaUIvTSxPQUFqQixDQUF5QixVQUFTdkMsTUFBVCxFQUFpQjtBQUN4QzZFLG9CQUFRN0UsT0FBT3dCLEVBQWYsSUFBcUJ4QixNQUFyQjtBQUNELFdBRkQ7QUFHQSxjQUFJNFcsZUFBZSxFQUFuQjtBQUNBLGNBQUl0QyxXQUFXak0sU0FBU3lOLGFBQVQsQ0FBdUJwSSxZQUFZckssR0FBbkMsQ0FBZjtBQUNBLGNBQUl3UyxjQUFjdkIsU0FBU3BCLEtBQVQsRUFBbEI7QUFDQSxjQUFJK0MsWUFBWTVOLFNBQVM2TixXQUFULENBQXFCTCxXQUFyQixFQUNaLFlBRFksRUFDRWpULE1BREYsR0FDVyxDQUQzQjtBQUVBLGNBQUkrTSxjQUFjdEgsU0FBUzZOLFdBQVQsQ0FBcUJMLFdBQXJCLEVBQ2QsaUJBRGMsRUFDS2pULE1BREwsR0FDYyxDQURoQztBQUVBNEwsYUFBR21CLFdBQUgsR0FBaUJBLFdBQWpCO0FBQ0EsY0FBSWtILGFBQWF4TyxTQUFTNk4sV0FBVCxDQUFxQkwsV0FBckIsRUFDYixnQkFEYSxFQUNLLENBREwsQ0FBakI7QUFFQSxjQUFJZ0IsVUFBSixFQUFnQjtBQUNkckksZUFBR1csdUJBQUgsR0FBNkIwSCxXQUFXQyxNQUFYLENBQWtCLEVBQWxCLEVBQXNCQyxLQUF0QixDQUE0QixHQUE1QixFQUN4QnhNLE9BRHdCLENBQ2hCLFNBRGdCLEtBQ0YsQ0FEM0I7QUFFRCxXQUhELE1BR087QUFDTGlFLGVBQUdXLHVCQUFILEdBQTZCLEtBQTdCO0FBQ0Q7O0FBRURtRixtQkFBUy9SLE9BQVQsQ0FBaUIsVUFBU3dULFlBQVQsRUFBdUI5QyxhQUF2QixFQUFzQztBQUNyRCxnQkFBSStELFFBQVEzTyxTQUFTNE8sVUFBVCxDQUFvQmxCLFlBQXBCLENBQVo7QUFDQSxnQkFBSXBOLE9BQU9OLFNBQVM2TyxPQUFULENBQWlCbkIsWUFBakIsQ0FBWDtBQUNBO0FBQ0EsZ0JBQUlJLFdBQVc5TixTQUFTK04sVUFBVCxDQUFvQkwsWUFBcEIsS0FDWDFOLFNBQVM2TixXQUFULENBQXFCSCxZQUFyQixFQUFtQyxlQUFuQyxFQUFvRG5ULE1BQXBELEtBQStELENBRG5FO0FBRUEsZ0JBQUkySyxXQUFXeUosTUFBTSxDQUFOLEVBQVNGLE1BQVQsQ0FBZ0IsQ0FBaEIsRUFBbUJDLEtBQW5CLENBQXlCLEdBQXpCLEVBQThCLENBQTlCLENBQWY7O0FBRUEsZ0JBQUlJLFlBQVk5TyxTQUFTK08sWUFBVCxDQUFzQnJCLFlBQXRCLEVBQW9DRixXQUFwQyxDQUFoQjtBQUNBLGdCQUFJd0IsYUFBYWhQLFNBQVNpUCxTQUFULENBQW1CdkIsWUFBbkIsQ0FBakI7O0FBRUEsZ0JBQUk5TSxNQUFNWixTQUFTa1AsTUFBVCxDQUFnQnhCLFlBQWhCLEtBQWlDMU4sU0FBU21QLGtCQUFULEVBQTNDOztBQUVBO0FBQ0EsZ0JBQUs3TyxTQUFTLGFBQVQsSUFBMEI0RSxhQUFhLFdBQXhDLElBQXdENEksUUFBNUQsRUFBc0U7QUFDcEU7QUFDQTtBQUNBM0gsaUJBQUc0QixZQUFILENBQWdCNkMsYUFBaEIsSUFBaUM7QUFDL0JoSyxxQkFBS0EsR0FEMEI7QUFFL0JOLHNCQUFNQSxJQUZ5QjtBQUcvQndOLDBCQUFVO0FBSHFCLGVBQWpDO0FBS0E7QUFDRDs7QUFFRCxnQkFBSSxDQUFDQSxRQUFELElBQWEzSCxHQUFHNEIsWUFBSCxDQUFnQjZDLGFBQWhCLENBQWIsSUFDQXpFLEdBQUc0QixZQUFILENBQWdCNkMsYUFBaEIsRUFBK0JrRCxRQURuQyxFQUM2QztBQUMzQztBQUNBM0gsaUJBQUc0QixZQUFILENBQWdCNkMsYUFBaEIsSUFBaUN6RSxHQUFHK0Msa0JBQUgsQ0FBc0I1SSxJQUF0QixFQUE0QixJQUE1QixDQUFqQztBQUNEOztBQUVELGdCQUFJSixXQUFKO0FBQ0EsZ0JBQUlNLFdBQUo7QUFDQSxnQkFBSWlFLFlBQUo7QUFDQSxnQkFBSTlELGFBQUo7QUFDQSxnQkFBSUcsV0FBSjtBQUNBLGdCQUFJSyxzQkFBSjtBQUNBLGdCQUFJa0ksc0JBQUo7QUFDQSxnQkFBSWpILGlCQUFKOztBQUVBLGdCQUFJbkIsS0FBSjtBQUNBO0FBQ0EsZ0JBQUlvQixxQkFBcUJyQyxTQUFTMk4sa0JBQVQsQ0FBNEJELFlBQTVCLENBQXpCO0FBQ0EsZ0JBQUlNLG1CQUFKO0FBQ0EsZ0JBQUlFLG9CQUFKO0FBQ0EsZ0JBQUksQ0FBQ0osUUFBTCxFQUFlO0FBQ2JFLG9DQUFzQmhPLFNBQVNpTyxnQkFBVCxDQUEwQlAsWUFBMUIsRUFDbEJGLFdBRGtCLENBQXRCO0FBRUFVLHFDQUF1QmxPLFNBQVNtTyxpQkFBVCxDQUEyQlQsWUFBM0IsRUFDbkJGLFdBRG1CLENBQXZCO0FBRUFVLG1DQUFxQkUsSUFBckIsR0FBNEIsUUFBNUI7QUFDRDtBQUNEL0UscUNBQ0lySixTQUFTb1AsMEJBQVQsQ0FBb0MxQixZQUFwQyxDQURKOztBQUdBLGdCQUFJTCxpQkFBaUJyTixTQUFTcVAsbUJBQVQsQ0FBNkIzQixZQUE3QixDQUFyQjs7QUFFQSxnQkFBSTRCLGFBQWF0UCxTQUFTNk4sV0FBVCxDQUFxQkgsWUFBckIsRUFDYixxQkFEYSxFQUNVRixXQURWLEVBQ3VCalQsTUFEdkIsR0FDZ0MsQ0FEakQ7QUFFQSxnQkFBSWdWLFFBQVF2UCxTQUFTNk4sV0FBVCxDQUFxQkgsWUFBckIsRUFBbUMsY0FBbkMsRUFDUHBELEdBRE8sQ0FDSCxVQUFTbUIsSUFBVCxFQUFlO0FBQ2xCLHFCQUFPekwsU0FBUytMLGNBQVQsQ0FBd0JOLElBQXhCLENBQVA7QUFDRCxhQUhPLEVBSVA5SixNQUpPLENBSUEsVUFBUzhKLElBQVQsRUFBZTtBQUNyQixxQkFBT0EsS0FBS0MsU0FBTCxLQUFtQixDQUExQjtBQUNELGFBTk8sQ0FBWjs7QUFRQTtBQUNBLGdCQUFJLENBQUNyRyxZQUFZL04sSUFBWixLQUFxQixPQUFyQixJQUFnQytOLFlBQVkvTixJQUFaLEtBQXFCLFFBQXRELEtBQ0EsQ0FBQ3dXLFFBREQsSUFDYXhHLFdBRGIsSUFDNEJzRCxnQkFBZ0IsQ0FENUMsSUFFQXpFLEdBQUc0QixZQUFILENBQWdCNkMsYUFBaEIsQ0FGSixFQUVvQztBQUNsQ3pFLGlCQUFHMEcsNEJBQUgsQ0FBZ0NqQyxhQUFoQztBQUNBekUsaUJBQUc0QixZQUFILENBQWdCNkMsYUFBaEIsRUFBK0JwSyxXQUEvQixHQUNJMkYsR0FBRzRCLFlBQUgsQ0FBZ0IsQ0FBaEIsRUFBbUJ2SCxXQUR2QjtBQUVBMkYsaUJBQUc0QixZQUFILENBQWdCNkMsYUFBaEIsRUFBK0JuRyxZQUEvQixHQUNJMEIsR0FBRzRCLFlBQUgsQ0FBZ0IsQ0FBaEIsRUFBbUJ0RCxZQUR2QjtBQUVBMEIsaUJBQUc0QixZQUFILENBQWdCNkMsYUFBaEIsRUFBK0JqSyxhQUEvQixHQUNJd0YsR0FBRzRCLFlBQUgsQ0FBZ0IsQ0FBaEIsRUFBbUJwSCxhQUR2QjtBQUVBLGtCQUFJd0YsR0FBRzRCLFlBQUgsQ0FBZ0I2QyxhQUFoQixFQUErQi9KLFNBQW5DLEVBQThDO0FBQzVDc0YsbUJBQUc0QixZQUFILENBQWdCNkMsYUFBaEIsRUFBK0IvSixTQUEvQixDQUF5QzJPLFlBQXpDLENBQ0lySixHQUFHNEIsWUFBSCxDQUFnQixDQUFoQixFQUFtQnBILGFBRHZCO0FBRUQ7QUFDRCxrQkFBSXdGLEdBQUc0QixZQUFILENBQWdCNkMsYUFBaEIsRUFBK0I5SixXQUFuQyxFQUFnRDtBQUM5Q3FGLG1CQUFHNEIsWUFBSCxDQUFnQjZDLGFBQWhCLEVBQStCOUosV0FBL0IsQ0FBMkMwTyxZQUEzQyxDQUNJckosR0FBRzRCLFlBQUgsQ0FBZ0IsQ0FBaEIsRUFBbUJwSCxhQUR2QjtBQUVEO0FBQ0Y7QUFDRCxnQkFBSTBFLFlBQVkvTixJQUFaLEtBQXFCLE9BQXJCLElBQWdDLENBQUN3VyxRQUFyQyxFQUErQztBQUM3QzVOLDRCQUFjaUcsR0FBRzRCLFlBQUgsQ0FBZ0I2QyxhQUFoQixLQUNWekUsR0FBRytDLGtCQUFILENBQXNCNUksSUFBdEIsQ0FESjtBQUVBSiwwQkFBWVUsR0FBWixHQUFrQkEsR0FBbEI7O0FBRUEsa0JBQUksQ0FBQ1YsWUFBWU0sV0FBakIsRUFBOEI7QUFDNUJOLDRCQUFZTSxXQUFaLEdBQTBCMkYsR0FBR3dFLGtCQUFILENBQXNCQyxhQUF0QixFQUN0QnRELFdBRHNCLENBQTFCO0FBRUQ7O0FBRUQsa0JBQUlpSSxNQUFNaFYsTUFBTixJQUFnQjJGLFlBQVl1RSxZQUFaLENBQXlCN04sS0FBekIsS0FBbUMsS0FBdkQsRUFBOEQ7QUFDNUQsb0JBQUkwWSxlQUFlLENBQUNoSSxXQUFELElBQWdCc0Qsa0JBQWtCLENBQWpELENBQUosRUFBeUQ7QUFDdkQxSyw4QkFBWXVFLFlBQVosQ0FBeUJnTCxtQkFBekIsQ0FBNkNGLEtBQTdDO0FBQ0QsaUJBRkQsTUFFTztBQUNMQSx3QkFBTXJWLE9BQU4sQ0FBYyxVQUFTb0MsU0FBVCxFQUFvQjtBQUNoQ2tJLHNDQUFrQnRFLFlBQVl1RSxZQUE5QixFQUE0Q25JLFNBQTVDO0FBQ0QsbUJBRkQ7QUFHRDtBQUNGOztBQUVEOEYsa0NBQW9CdEosT0FBTzRXLGNBQVAsQ0FBc0JDLGVBQXRCLENBQXNDclAsSUFBdEMsQ0FBcEI7O0FBRUE7QUFDQTtBQUNBLGtCQUFJbUIsY0FBYyxLQUFsQixFQUF5QjtBQUN2Qlcsa0NBQWtCRyxNQUFsQixHQUEyQkgsa0JBQWtCRyxNQUFsQixDQUF5QlosTUFBekIsQ0FDdkIsVUFBU2lPLEtBQVQsRUFBZ0I7QUFDZCx5QkFBT0EsTUFBTXZaLElBQU4sS0FBZSxLQUF0QjtBQUNELGlCQUhzQixDQUEzQjtBQUlEOztBQUVEOEssdUNBQXlCakIsWUFBWWlCLHNCQUFaLElBQXNDLENBQUM7QUFDOURDLHNCQUFNLENBQUMsSUFBSXdKLGFBQUosR0FBb0IsQ0FBckIsSUFBMEI7QUFEOEIsZUFBRCxDQUEvRDs7QUFJQTtBQUNBLGtCQUFJaUYsYUFBYSxLQUFqQjtBQUNBLGtCQUFJZixjQUFjLFVBQWQsSUFBNEJBLGNBQWMsVUFBOUMsRUFBMEQ7QUFDeERlLDZCQUFhLENBQUMzUCxZQUFZWSxXQUExQjtBQUNBQSw4QkFBY1osWUFBWVksV0FBWixJQUNWLElBQUloSSxPQUFPNFcsY0FBWCxDQUEwQnhQLFlBQVlTLGFBQXRDLEVBQXFETCxJQUFyRCxDQURKOztBQUdBLG9CQUFJdVAsVUFBSixFQUFnQjtBQUNkLHNCQUFJbFksTUFBSjtBQUNBc0osMEJBQVFILFlBQVlHLEtBQXBCO0FBQ0E7QUFDQSxzQkFBSStOLGNBQWNBLFdBQVdyWCxNQUFYLEtBQXNCLEdBQXhDLEVBQTZDO0FBQzNDO0FBQ0QsbUJBRkQsTUFFTyxJQUFJcVgsVUFBSixFQUFnQjtBQUNyQix3QkFBSSxDQUFDeFMsUUFBUXdTLFdBQVdyWCxNQUFuQixDQUFMLEVBQWlDO0FBQy9CNkUsOEJBQVF3UyxXQUFXclgsTUFBbkIsSUFBNkIsSUFBSW1CLE9BQU9nWCxXQUFYLEVBQTdCO0FBQ0FuUiw2QkFBT21NLGNBQVAsQ0FBc0J0TyxRQUFRd1MsV0FBV3JYLE1BQW5CLENBQXRCLEVBQWtELElBQWxELEVBQXdEO0FBQ3REb1ksNkJBQUssZUFBVztBQUNkLGlDQUFPZixXQUFXclgsTUFBbEI7QUFDRDtBQUhxRCx1QkFBeEQ7QUFLRDtBQUNEZ0gsMkJBQU9tTSxjQUFQLENBQXNCN0osS0FBdEIsRUFBNkIsSUFBN0IsRUFBbUM7QUFDakM4TywyQkFBSyxlQUFXO0FBQ2QsK0JBQU9mLFdBQVcvTixLQUFsQjtBQUNEO0FBSGdDLHFCQUFuQztBQUtBdEosNkJBQVM2RSxRQUFRd1MsV0FBV3JYLE1BQW5CLENBQVQ7QUFDRCxtQkFmTSxNQWVBO0FBQ0wsd0JBQUksQ0FBQzZFLGtCQUFMLEVBQXNCO0FBQ3BCQSwyQ0FBa0IsSUFBSTFELE9BQU9nWCxXQUFYLEVBQWxCO0FBQ0Q7QUFDRG5ZLDZCQUFTNkUsa0JBQVQ7QUFDRDtBQUNELHNCQUFJN0UsTUFBSixFQUFZO0FBQ1ZpTyxpREFBNkIzRSxLQUE3QixFQUFvQ3RKLE1BQXBDO0FBQ0F1SSxnQ0FBWW9KLDRCQUFaLENBQXlDbFAsSUFBekMsQ0FBOEN6QyxNQUE5QztBQUNEO0FBQ0Q0VywrQkFBYW5VLElBQWIsQ0FBa0IsQ0FBQzZHLEtBQUQsRUFBUUgsV0FBUixFQUFxQm5KLE1BQXJCLENBQWxCO0FBQ0Q7QUFDRixlQXRDRCxNQXNDTyxJQUFJdUksWUFBWVksV0FBWixJQUEyQlosWUFBWVksV0FBWixDQUF3QkcsS0FBdkQsRUFBOEQ7QUFDbkVmLDRCQUFZb0osNEJBQVosQ0FBeUNwUCxPQUF6QyxDQUFpRCxVQUFTcUYsQ0FBVCxFQUFZO0FBQzNELHNCQUFJeVEsY0FBY3pRLEVBQUVzSyxTQUFGLEdBQWNqRixJQUFkLENBQW1CLFVBQVN4RixDQUFULEVBQVk7QUFDL0MsMkJBQU9BLEVBQUVqRyxFQUFGLEtBQVMrRyxZQUFZWSxXQUFaLENBQXdCRyxLQUF4QixDQUE4QjlILEVBQTlDO0FBQ0QsbUJBRmlCLENBQWxCO0FBR0Esc0JBQUk2VyxXQUFKLEVBQWlCO0FBQ2ZoSyxzREFBa0NnSyxXQUFsQyxFQUErQ3pRLENBQS9DO0FBQ0Q7QUFDRixpQkFQRDtBQVFBVyw0QkFBWW9KLDRCQUFaLEdBQTJDLEVBQTNDO0FBQ0Q7O0FBRURwSiwwQkFBWWtDLGlCQUFaLEdBQWdDQSxpQkFBaEM7QUFDQWxDLDBCQUFZbUMsa0JBQVosR0FBaUNBLGtCQUFqQztBQUNBbkMsMEJBQVlZLFdBQVosR0FBMEJBLFdBQTFCO0FBQ0FaLDBCQUFZbU4sY0FBWixHQUE2QkEsY0FBN0I7QUFDQW5OLDBCQUFZaUIsc0JBQVosR0FBcUNBLHNCQUFyQztBQUNBakIsMEJBQVltSixzQkFBWixHQUFxQ0Esc0JBQXJDOztBQUVBO0FBQ0E7QUFDQWxELGlCQUFHMkcsV0FBSCxDQUFlM0csR0FBRzRCLFlBQUgsQ0FBZ0I2QyxhQUFoQixDQUFmLEVBQ0ksS0FESixFQUVJaUYsVUFGSjtBQUdELGFBbkdELE1BbUdPLElBQUl4SyxZQUFZL04sSUFBWixLQUFxQixRQUFyQixJQUFpQyxDQUFDd1csUUFBdEMsRUFBZ0Q7QUFDckQ1Tiw0QkFBY2lHLEdBQUc0QixZQUFILENBQWdCNkMsYUFBaEIsQ0FBZDtBQUNBcEssNEJBQWNOLFlBQVlNLFdBQTFCO0FBQ0FpRSw2QkFBZXZFLFlBQVl1RSxZQUEzQjtBQUNBOUQsOEJBQWdCVCxZQUFZUyxhQUE1QjtBQUNBRyw0QkFBY1osWUFBWVksV0FBMUI7QUFDQUssdUNBQXlCakIsWUFBWWlCLHNCQUFyQztBQUNBaUIsa0NBQW9CbEMsWUFBWWtDLGlCQUFoQzs7QUFFQStELGlCQUFHNEIsWUFBSCxDQUFnQjZDLGFBQWhCLEVBQStCdkIsc0JBQS9CLEdBQ0lBLHNCQURKO0FBRUFsRCxpQkFBRzRCLFlBQUgsQ0FBZ0I2QyxhQUFoQixFQUErQnZJLGtCQUEvQixHQUNJQSxrQkFESjtBQUVBOEQsaUJBQUc0QixZQUFILENBQWdCNkMsYUFBaEIsRUFBK0J5QyxjQUEvQixHQUFnREEsY0FBaEQ7O0FBRUEsa0JBQUlrQyxNQUFNaFYsTUFBTixJQUFnQmtLLGFBQWE3TixLQUFiLEtBQXVCLEtBQTNDLEVBQWtEO0FBQ2hELG9CQUFJLENBQUNnWCxhQUFhMEIsVUFBZCxNQUNDLENBQUNoSSxXQUFELElBQWdCc0Qsa0JBQWtCLENBRG5DLENBQUosRUFDMkM7QUFDekNuRywrQkFBYWdMLG1CQUFiLENBQWlDRixLQUFqQztBQUNELGlCQUhELE1BR087QUFDTEEsd0JBQU1yVixPQUFOLENBQWMsVUFBU29DLFNBQVQsRUFBb0I7QUFDaENrSSxzQ0FBa0J0RSxZQUFZdUUsWUFBOUIsRUFBNENuSSxTQUE1QztBQUNELG1CQUZEO0FBR0Q7QUFDRjs7QUFFRCxrQkFBSSxDQUFDZ0wsV0FBRCxJQUFnQnNELGtCQUFrQixDQUF0QyxFQUF5QztBQUN2QyxvQkFBSW5HLGFBQWE3TixLQUFiLEtBQXVCLEtBQTNCLEVBQWtDO0FBQ2hDNk4sK0JBQWE0SixLQUFiLENBQW1CN04sV0FBbkIsRUFBZ0N3TixtQkFBaEMsRUFDSSxhQURKO0FBRUQ7QUFDRCxvQkFBSXJOLGNBQWMvSixLQUFkLEtBQXdCLEtBQTVCLEVBQW1DO0FBQ2pDK0osZ0NBQWMwTixLQUFkLENBQW9CSCxvQkFBcEI7QUFDRDtBQUNGOztBQUVEL0gsaUJBQUcyRyxXQUFILENBQWU1TSxXQUFmLEVBQ0k0TyxjQUFjLFVBQWQsSUFBNEJBLGNBQWMsVUFEOUMsRUFFSUEsY0FBYyxVQUFkLElBQTRCQSxjQUFjLFVBRjlDOztBQUlBO0FBQ0Esa0JBQUloTyxnQkFDQ2dPLGNBQWMsVUFBZCxJQUE0QkEsY0FBYyxVQUQzQyxDQUFKLEVBQzREO0FBQzFEN04sd0JBQVFILFlBQVlHLEtBQXBCO0FBQ0Esb0JBQUkrTixVQUFKLEVBQWdCO0FBQ2Qsc0JBQUksQ0FBQ3hTLFFBQVF3UyxXQUFXclgsTUFBbkIsQ0FBTCxFQUFpQztBQUMvQjZFLDRCQUFRd1MsV0FBV3JYLE1BQW5CLElBQTZCLElBQUltQixPQUFPZ1gsV0FBWCxFQUE3QjtBQUNEO0FBQ0RsSywrQ0FBNkIzRSxLQUE3QixFQUFvQ3pFLFFBQVF3UyxXQUFXclgsTUFBbkIsQ0FBcEM7QUFDQTRXLCtCQUFhblUsSUFBYixDQUFrQixDQUFDNkcsS0FBRCxFQUFRSCxXQUFSLEVBQXFCdEUsUUFBUXdTLFdBQVdyWCxNQUFuQixDQUFyQixDQUFsQjtBQUNELGlCQU5ELE1BTU87QUFDTCxzQkFBSSxDQUFDNkUsa0JBQUwsRUFBc0I7QUFDcEJBLHlDQUFrQixJQUFJMUQsT0FBT2dYLFdBQVgsRUFBbEI7QUFDRDtBQUNEbEssK0NBQTZCM0UsS0FBN0IsRUFBb0N6RSxrQkFBcEM7QUFDQStSLCtCQUFhblUsSUFBYixDQUFrQixDQUFDNkcsS0FBRCxFQUFRSCxXQUFSLEVBQXFCdEUsa0JBQXJCLENBQWxCO0FBQ0Q7QUFDRixlQWhCRCxNQWdCTztBQUNMO0FBQ0EsdUJBQU8wRCxZQUFZWSxXQUFuQjtBQUNEO0FBQ0Y7QUFDRixXQXhQRDs7QUEwUEEsY0FBSXFGLEdBQUdnQyxTQUFILEtBQWlCekMsU0FBckIsRUFBZ0M7QUFDOUJTLGVBQUdnQyxTQUFILEdBQWU5QyxZQUFZL04sSUFBWixLQUFxQixPQUFyQixHQUErQixRQUEvQixHQUEwQyxTQUF6RDtBQUNEOztBQUVENk8sYUFBR2UsaUJBQUgsR0FBdUI7QUFDckI1UCxrQkFBTStOLFlBQVkvTixJQURHO0FBRXJCMEQsaUJBQUtxSyxZQUFZcks7QUFGSSxXQUF2QjtBQUlBLGNBQUlxSyxZQUFZL04sSUFBWixLQUFxQixPQUF6QixFQUFrQztBQUNoQzZPLGVBQUdtSSxxQkFBSCxDQUF5QixtQkFBekI7QUFDRCxXQUZELE1BRU87QUFDTG5JLGVBQUdtSSxxQkFBSCxDQUF5QixRQUF6QjtBQUNEO0FBQ0QzUCxpQkFBT0MsSUFBUCxDQUFZcEMsT0FBWixFQUFxQnRDLE9BQXJCLENBQTZCLFVBQVMrVixHQUFULEVBQWM7QUFDekMsZ0JBQUl0WSxTQUFTNkUsUUFBUXlULEdBQVIsQ0FBYjtBQUNBLGdCQUFJdFksT0FBT2tTLFNBQVAsR0FBbUJ0UCxNQUF2QixFQUErQjtBQUM3QixrQkFBSTRMLEdBQUdjLGFBQUgsQ0FBaUIvRSxPQUFqQixDQUF5QnZLLE1BQXpCLE1BQXFDLENBQUMsQ0FBMUMsRUFBNkM7QUFDM0N3TyxtQkFBR2MsYUFBSCxDQUFpQjdNLElBQWpCLENBQXNCekMsTUFBdEI7QUFDQSxvQkFBSXFCLFFBQVEsSUFBSXNOLEtBQUosQ0FBVSxXQUFWLENBQVo7QUFDQXROLHNCQUFNckIsTUFBTixHQUFlQSxNQUFmO0FBQ0FtQix1QkFBT2dCLFVBQVAsQ0FBa0IsWUFBVztBQUMzQnFNLHFCQUFHSSxjQUFILENBQWtCLFdBQWxCLEVBQStCdk4sS0FBL0I7QUFDRCxpQkFGRDtBQUdEOztBQUVEdVYsMkJBQWFyVSxPQUFiLENBQXFCLFVBQVNnVyxJQUFULEVBQWU7QUFDbEMsb0JBQUlqUCxRQUFRaVAsS0FBSyxDQUFMLENBQVo7QUFDQSxvQkFBSTlKLFdBQVc4SixLQUFLLENBQUwsQ0FBZjtBQUNBLG9CQUFJdlksT0FBT3dCLEVBQVAsS0FBYytXLEtBQUssQ0FBTCxFQUFRL1csRUFBMUIsRUFBOEI7QUFDNUI7QUFDRDtBQUNEK00sNkJBQWFDLEVBQWIsRUFBaUJsRixLQUFqQixFQUF3Qm1GLFFBQXhCLEVBQWtDLENBQUN6TyxNQUFELENBQWxDO0FBQ0QsZUFQRDtBQVFEO0FBQ0YsV0FyQkQ7QUFzQkE0Vyx1QkFBYXJVLE9BQWIsQ0FBcUIsVUFBU2dXLElBQVQsRUFBZTtBQUNsQyxnQkFBSUEsS0FBSyxDQUFMLENBQUosRUFBYTtBQUNYO0FBQ0Q7QUFDRGhLLHlCQUFhQyxFQUFiLEVBQWlCK0osS0FBSyxDQUFMLENBQWpCLEVBQTBCQSxLQUFLLENBQUwsQ0FBMUIsRUFBbUMsRUFBbkM7QUFDRCxXQUxEOztBQU9BO0FBQ0E7QUFDQXBYLGlCQUFPZ0IsVUFBUCxDQUFrQixZQUFXO0FBQzNCLGdCQUFJLEVBQUVxTSxNQUFNQSxHQUFHNEIsWUFBWCxDQUFKLEVBQThCO0FBQzVCO0FBQ0Q7QUFDRDVCLGVBQUc0QixZQUFILENBQWdCN04sT0FBaEIsQ0FBd0IsVUFBU2dHLFdBQVQsRUFBc0I7QUFDNUMsa0JBQUlBLFlBQVl1RSxZQUFaLElBQ0F2RSxZQUFZdUUsWUFBWixDQUF5QjdOLEtBQXpCLEtBQW1DLEtBRG5DLElBRUFzSixZQUFZdUUsWUFBWixDQUF5QkUsbUJBQXpCLEdBQStDcEssTUFBL0MsR0FBd0QsQ0FGNUQsRUFFK0Q7QUFDN0QrRCx3QkFBUXlELElBQVIsQ0FBYSxzREFDVCxtQ0FESjtBQUVBN0IsNEJBQVl1RSxZQUFaLENBQXlCVSxrQkFBekIsQ0FBNEMsRUFBNUM7QUFDRDtBQUNGLGFBUkQ7QUFTRCxXQWJELEVBYUcsSUFiSDs7QUFlQSxpQkFBTzNHLFFBQVF0RCxPQUFSLEVBQVA7QUFDRCxTQTNWRDs7QUE2VkFDLDBCQUFrQmtOLFNBQWxCLENBQTRCbEssS0FBNUIsR0FBb0MsWUFBVztBQUM3QyxlQUFLNEosWUFBTCxDQUFrQjdOLE9BQWxCLENBQTBCLFVBQVNnRyxXQUFULEVBQXNCO0FBQzlDOzs7OztBQUtBLGdCQUFJQSxZQUFZdUUsWUFBaEIsRUFBOEI7QUFDNUJ2RSwwQkFBWXVFLFlBQVosQ0FBeUI0RixJQUF6QjtBQUNEO0FBQ0QsZ0JBQUluSyxZQUFZUyxhQUFoQixFQUErQjtBQUM3QlQsMEJBQVlTLGFBQVosQ0FBMEIwSixJQUExQjtBQUNEO0FBQ0QsZ0JBQUluSyxZQUFZVyxTQUFoQixFQUEyQjtBQUN6QlgsMEJBQVlXLFNBQVosQ0FBc0J3SixJQUF0QjtBQUNEO0FBQ0QsZ0JBQUluSyxZQUFZWSxXQUFoQixFQUE2QjtBQUMzQlosMEJBQVlZLFdBQVosQ0FBd0J1SixJQUF4QjtBQUNEO0FBQ0YsV0FsQkQ7QUFtQkE7QUFDQSxlQUFLakMsU0FBTCxHQUFpQixJQUFqQjtBQUNBLGVBQUtrRyxxQkFBTCxDQUEyQixRQUEzQjtBQUNELFNBdkJEOztBQXlCQTtBQUNBblQsMEJBQWtCa04sU0FBbEIsQ0FBNEJpRyxxQkFBNUIsR0FBb0QsVUFBUzZCLFFBQVQsRUFBbUI7QUFDckUsZUFBSzlMLGNBQUwsR0FBc0I4TCxRQUF0QjtBQUNBLGNBQUluWCxRQUFRLElBQUlzTixLQUFKLENBQVUsc0JBQVYsQ0FBWjtBQUNBLGVBQUtDLGNBQUwsQ0FBb0Isc0JBQXBCLEVBQTRDdk4sS0FBNUM7QUFDRCxTQUpEOztBQU1BO0FBQ0FtQywwQkFBa0JrTixTQUFsQixDQUE0QnNCLDJCQUE1QixHQUEwRCxZQUFXO0FBQ25FLGNBQUl4RCxLQUFLLElBQVQ7QUFDQSxjQUFJLEtBQUs5QixjQUFMLEtBQXdCLFFBQXhCLElBQW9DLEtBQUswQyxlQUFMLEtBQXlCLElBQWpFLEVBQXVFO0FBQ3JFO0FBQ0Q7QUFDRCxlQUFLQSxlQUFMLEdBQXVCLElBQXZCO0FBQ0FqTyxpQkFBT2dCLFVBQVAsQ0FBa0IsWUFBVztBQUMzQixnQkFBSXFNLEdBQUdZLGVBQVAsRUFBd0I7QUFDdEJaLGlCQUFHWSxlQUFILEdBQXFCLEtBQXJCO0FBQ0Esa0JBQUkvTixRQUFRLElBQUlzTixLQUFKLENBQVUsbUJBQVYsQ0FBWjtBQUNBSCxpQkFBR0ksY0FBSCxDQUFrQixtQkFBbEIsRUFBdUN2TixLQUF2QztBQUNEO0FBQ0YsV0FORCxFQU1HLENBTkg7QUFPRCxTQWJEOztBQWVBO0FBQ0FtQywwQkFBa0JrTixTQUFsQixDQUE0Qm9FLHlCQUE1QixHQUF3RCxZQUFXO0FBQ2pFLGNBQUkwRCxRQUFKO0FBQ0EsY0FBSUMsU0FBUztBQUNYLG1CQUFPLENBREk7QUFFWEMsb0JBQVEsQ0FGRztBQUdYQyxzQkFBVSxDQUhDO0FBSVhDLHVCQUFXLENBSkE7QUFLWEMsdUJBQVcsQ0FMQTtBQU1YQywwQkFBYyxDQU5IO0FBT1hDLG9CQUFRO0FBUEcsV0FBYjtBQVNBLGVBQUszSSxZQUFMLENBQWtCN04sT0FBbEIsQ0FBMEIsVUFBU2dHLFdBQVQsRUFBc0I7QUFDOUNrUSxtQkFBT2xRLFlBQVl1RSxZQUFaLENBQXlCN04sS0FBaEM7QUFDRCxXQUZEOztBQUlBdVoscUJBQVcsS0FBWDtBQUNBLGNBQUlDLE9BQU9NLE1BQVAsR0FBZ0IsQ0FBcEIsRUFBdUI7QUFDckJQLHVCQUFXLFFBQVg7QUFDRCxXQUZELE1BRU8sSUFBSUMsT0FBT0UsUUFBUCxHQUFrQixDQUF0QixFQUF5QjtBQUM5QkgsdUJBQVcsVUFBWDtBQUNELFdBRk0sTUFFQSxJQUFJQyxPQUFPSyxZQUFQLEdBQXNCLENBQTFCLEVBQTZCO0FBQ2xDTix1QkFBVyxjQUFYO0FBQ0QsV0FGTSxNQUVBLElBQUlDLGdCQUFhLENBQWpCLEVBQW9CO0FBQ3pCRCx1QkFBVyxLQUFYO0FBQ0QsV0FGTSxNQUVBLElBQUlDLE9BQU9HLFNBQVAsR0FBbUIsQ0FBdkIsRUFBMEI7QUFDL0JKLHVCQUFXLFdBQVg7QUFDRCxXQUZNLE1BRUEsSUFBSUMsT0FBT0ksU0FBUCxHQUFtQixDQUF2QixFQUEwQjtBQUMvQkwsdUJBQVcsV0FBWDtBQUNEOztBQUVELGNBQUlBLGFBQWEsS0FBS2hKLGtCQUF0QixFQUEwQztBQUN4QyxpQkFBS0Esa0JBQUwsR0FBMEJnSixRQUExQjtBQUNBLGdCQUFJblgsUUFBUSxJQUFJc04sS0FBSixDQUFVLDBCQUFWLENBQVo7QUFDQSxpQkFBS0MsY0FBTCxDQUFvQiwwQkFBcEIsRUFBZ0R2TixLQUFoRDtBQUNEO0FBQ0YsU0FuQ0Q7O0FBcUNBO0FBQ0FtQywwQkFBa0JrTixTQUFsQixDQUE0QnFFLHNCQUE1QixHQUFxRCxZQUFXO0FBQzlELGNBQUl5RCxRQUFKO0FBQ0EsY0FBSUMsU0FBUztBQUNYLG1CQUFPLENBREk7QUFFWEMsb0JBQVEsQ0FGRztBQUdYTSx3QkFBWSxDQUhEO0FBSVhKLHVCQUFXLENBSkE7QUFLWEMsdUJBQVcsQ0FMQTtBQU1YQywwQkFBYyxDQU5IO0FBT1hDLG9CQUFRO0FBUEcsV0FBYjtBQVNBLGVBQUszSSxZQUFMLENBQWtCN04sT0FBbEIsQ0FBMEIsVUFBU2dHLFdBQVQsRUFBc0I7QUFDOUNrUSxtQkFBT2xRLFlBQVl1RSxZQUFaLENBQXlCN04sS0FBaEM7QUFDQXdaLG1CQUFPbFEsWUFBWVMsYUFBWixDQUEwQi9KLEtBQWpDO0FBQ0QsV0FIRDtBQUlBO0FBQ0F3WixpQkFBT0csU0FBUCxJQUFvQkgsT0FBT0ksU0FBM0I7O0FBRUFMLHFCQUFXLEtBQVg7QUFDQSxjQUFJQyxPQUFPTSxNQUFQLEdBQWdCLENBQXBCLEVBQXVCO0FBQ3JCUCx1QkFBVyxRQUFYO0FBQ0QsV0FGRCxNQUVPLElBQUlDLE9BQU9PLFVBQVAsR0FBb0IsQ0FBeEIsRUFBMkI7QUFDaENSLHVCQUFXLFlBQVg7QUFDRCxXQUZNLE1BRUEsSUFBSUMsT0FBT0ssWUFBUCxHQUFzQixDQUExQixFQUE2QjtBQUNsQ04sdUJBQVcsY0FBWDtBQUNELFdBRk0sTUFFQSxJQUFJQyxnQkFBYSxDQUFqQixFQUFvQjtBQUN6QkQsdUJBQVcsS0FBWDtBQUNELFdBRk0sTUFFQSxJQUFJQyxPQUFPRyxTQUFQLEdBQW1CLENBQXZCLEVBQTBCO0FBQy9CSix1QkFBVyxXQUFYO0FBQ0Q7O0FBRUQsY0FBSUEsYUFBYSxLQUFLL0ksZUFBdEIsRUFBdUM7QUFDckMsaUJBQUtBLGVBQUwsR0FBdUIrSSxRQUF2QjtBQUNBLGdCQUFJblgsUUFBUSxJQUFJc04sS0FBSixDQUFVLHVCQUFWLENBQVo7QUFDQSxpQkFBS0MsY0FBTCxDQUFvQix1QkFBcEIsRUFBNkN2TixLQUE3QztBQUNEO0FBQ0YsU0FwQ0Q7O0FBc0NBbUMsMEJBQWtCa04sU0FBbEIsQ0FBNEJ4TCxXQUE1QixHQUEwQyxZQUFXO0FBQ25ELGNBQUlzSixLQUFLLElBQVQ7O0FBRUEsY0FBSUEsR0FBR2lDLFNBQVAsRUFBa0I7QUFDaEIsbUJBQU81SixRQUFRbkIsTUFBUixDQUFlK0gsVUFBVSxtQkFBVixFQUNsQixzQ0FEa0IsQ0FBZixDQUFQO0FBRUQ7O0FBRUQsY0FBSXdMLGlCQUFpQnpLLEdBQUc0QixZQUFILENBQWdCcEcsTUFBaEIsQ0FBdUIsVUFBU3ZDLENBQVQsRUFBWTtBQUN0RCxtQkFBT0EsRUFBRWtCLElBQUYsS0FBVyxPQUFsQjtBQUNELFdBRm9CLEVBRWxCL0YsTUFGSDtBQUdBLGNBQUlzVyxpQkFBaUIxSyxHQUFHNEIsWUFBSCxDQUFnQnBHLE1BQWhCLENBQXVCLFVBQVN2QyxDQUFULEVBQVk7QUFDdEQsbUJBQU9BLEVBQUVrQixJQUFGLEtBQVcsT0FBbEI7QUFDRCxXQUZvQixFQUVsQi9GLE1BRkg7O0FBSUE7QUFDQSxjQUFJdVcsZUFBZUMsVUFBVSxDQUFWLENBQW5CO0FBQ0EsY0FBSUQsWUFBSixFQUFrQjtBQUNoQjtBQUNBLGdCQUFJQSxhQUFhRSxTQUFiLElBQTBCRixhQUFhRyxRQUEzQyxFQUFxRDtBQUNuRCxvQkFBTSxJQUFJeEwsU0FBSixDQUNGLHNEQURFLENBQU47QUFFRDtBQUNELGdCQUFJcUwsYUFBYUksbUJBQWIsS0FBcUN4TCxTQUF6QyxFQUFvRDtBQUNsRCxrQkFBSW9MLGFBQWFJLG1CQUFiLEtBQXFDLElBQXpDLEVBQStDO0FBQzdDTixpQ0FBaUIsQ0FBakI7QUFDRCxlQUZELE1BRU8sSUFBSUUsYUFBYUksbUJBQWIsS0FBcUMsS0FBekMsRUFBZ0Q7QUFDckROLGlDQUFpQixDQUFqQjtBQUNELGVBRk0sTUFFQTtBQUNMQSxpQ0FBaUJFLGFBQWFJLG1CQUE5QjtBQUNEO0FBQ0Y7QUFDRCxnQkFBSUosYUFBYUssbUJBQWIsS0FBcUN6TCxTQUF6QyxFQUFvRDtBQUNsRCxrQkFBSW9MLGFBQWFLLG1CQUFiLEtBQXFDLElBQXpDLEVBQStDO0FBQzdDTixpQ0FBaUIsQ0FBakI7QUFDRCxlQUZELE1BRU8sSUFBSUMsYUFBYUssbUJBQWIsS0FBcUMsS0FBekMsRUFBZ0Q7QUFDckROLGlDQUFpQixDQUFqQjtBQUNELGVBRk0sTUFFQTtBQUNMQSxpQ0FBaUJDLGFBQWFLLG1CQUE5QjtBQUNEO0FBQ0Y7QUFDRjs7QUFFRGhMLGFBQUc0QixZQUFILENBQWdCN04sT0FBaEIsQ0FBd0IsVUFBU2dHLFdBQVQsRUFBc0I7QUFDNUMsZ0JBQUlBLFlBQVlJLElBQVosS0FBcUIsT0FBekIsRUFBa0M7QUFDaENzUTtBQUNBLGtCQUFJQSxpQkFBaUIsQ0FBckIsRUFBd0I7QUFDdEIxUSw0QkFBWXFKLFdBQVosR0FBMEIsS0FBMUI7QUFDRDtBQUNGLGFBTEQsTUFLTyxJQUFJckosWUFBWUksSUFBWixLQUFxQixPQUF6QixFQUFrQztBQUN2Q3VRO0FBQ0Esa0JBQUlBLGlCQUFpQixDQUFyQixFQUF3QjtBQUN0QjNRLDRCQUFZcUosV0FBWixHQUEwQixLQUExQjtBQUNEO0FBQ0Y7QUFDRixXQVpEOztBQWNBO0FBQ0EsaUJBQU9xSCxpQkFBaUIsQ0FBakIsSUFBc0JDLGlCQUFpQixDQUE5QyxFQUFpRDtBQUMvQyxnQkFBSUQsaUJBQWlCLENBQXJCLEVBQXdCO0FBQ3RCekssaUJBQUcrQyxrQkFBSCxDQUFzQixPQUF0QjtBQUNBMEg7QUFDRDtBQUNELGdCQUFJQyxpQkFBaUIsQ0FBckIsRUFBd0I7QUFDdEIxSyxpQkFBRytDLGtCQUFILENBQXNCLE9BQXRCO0FBQ0EySDtBQUNEO0FBQ0Y7O0FBRUQsY0FBSTdWLE1BQU1nRixTQUFTb1IsdUJBQVQsQ0FBaUNqTCxHQUFHNkIsYUFBcEMsRUFDTjdCLEdBQUcrQixrQkFBSCxFQURNLENBQVY7QUFFQS9CLGFBQUc0QixZQUFILENBQWdCN04sT0FBaEIsQ0FBd0IsVUFBU2dHLFdBQVQsRUFBc0IwSyxhQUF0QixFQUFxQztBQUMzRDtBQUNBO0FBQ0EsZ0JBQUkzSixRQUFRZixZQUFZZSxLQUF4QjtBQUNBLGdCQUFJWCxPQUFPSixZQUFZSSxJQUF2QjtBQUNBLGdCQUFJTSxNQUFNVixZQUFZVSxHQUFaLElBQW1CWixTQUFTbVAsa0JBQVQsRUFBN0I7QUFDQWpQLHdCQUFZVSxHQUFaLEdBQWtCQSxHQUFsQjs7QUFFQSxnQkFBSSxDQUFDVixZQUFZTSxXQUFqQixFQUE4QjtBQUM1Qk4sMEJBQVlNLFdBQVosR0FBMEIyRixHQUFHd0Usa0JBQUgsQ0FBc0JDLGFBQXRCLEVBQ3RCekUsR0FBR21CLFdBRG1CLENBQTFCO0FBRUQ7O0FBRUQsZ0JBQUlsRixvQkFBb0J0SixPQUFPOFEsWUFBUCxDQUFvQitGLGVBQXBCLENBQW9DclAsSUFBcEMsQ0FBeEI7QUFDQTtBQUNBO0FBQ0EsZ0JBQUltQixjQUFjLEtBQWxCLEVBQXlCO0FBQ3ZCVyxnQ0FBa0JHLE1BQWxCLEdBQTJCSCxrQkFBa0JHLE1BQWxCLENBQXlCWixNQUF6QixDQUN2QixVQUFTaU8sS0FBVCxFQUFnQjtBQUNkLHVCQUFPQSxNQUFNdlosSUFBTixLQUFlLEtBQXRCO0FBQ0QsZUFIc0IsQ0FBM0I7QUFJRDtBQUNEK0wsOEJBQWtCRyxNQUFsQixDQUF5QnJJLE9BQXpCLENBQWlDLFVBQVMwVixLQUFULEVBQWdCO0FBQy9DO0FBQ0E7QUFDQSxrQkFBSUEsTUFBTXZaLElBQU4sS0FBZSxNQUFmLElBQ0F1WixNQUFNeE0sVUFBTixDQUFpQix5QkFBakIsTUFBZ0RzQyxTQURwRCxFQUMrRDtBQUM3RGtLLHNCQUFNeE0sVUFBTixDQUFpQix5QkFBakIsSUFBOEMsR0FBOUM7QUFDRDs7QUFFRDtBQUNBO0FBQ0Esa0JBQUlsRCxZQUFZbUMsa0JBQVosSUFDQW5DLFlBQVltQyxrQkFBWixDQUErQkUsTUFEbkMsRUFDMkM7QUFDekNyQyw0QkFBWW1DLGtCQUFaLENBQStCRSxNQUEvQixDQUFzQ3JJLE9BQXRDLENBQThDLFVBQVNtWCxXQUFULEVBQXNCO0FBQ2xFLHNCQUFJekIsTUFBTXZaLElBQU4sQ0FBV2tOLFdBQVgsT0FBNkI4TixZQUFZaGIsSUFBWixDQUFpQmtOLFdBQWpCLEVBQTdCLElBQ0FxTSxNQUFNcE0sU0FBTixLQUFvQjZOLFlBQVk3TixTQURwQyxFQUMrQztBQUM3Q29NLDBCQUFNL00sb0JBQU4sR0FBNkJ3TyxZQUFZek8sV0FBekM7QUFDRDtBQUNGLGlCQUxEO0FBTUQ7QUFDRixhQW5CRDtBQW9CQVIsOEJBQWtCSSxnQkFBbEIsQ0FBbUN0SSxPQUFuQyxDQUEyQyxVQUFTb1gsTUFBVCxFQUFpQjtBQUMxRCxrQkFBSUMsbUJBQW1CclIsWUFBWW1DLGtCQUFaLElBQ25CbkMsWUFBWW1DLGtCQUFaLENBQStCRyxnQkFEWixJQUNnQyxFQUR2RDtBQUVBK08sK0JBQWlCclgsT0FBakIsQ0FBeUIsVUFBU3NYLE9BQVQsRUFBa0I7QUFDekMsb0JBQUlGLE9BQU9wTixHQUFQLEtBQWVzTixRQUFRdE4sR0FBM0IsRUFBZ0M7QUFDOUJvTix5QkFBT25ZLEVBQVAsR0FBWXFZLFFBQVFyWSxFQUFwQjtBQUNEO0FBQ0YsZUFKRDtBQUtELGFBUkQ7O0FBVUE7QUFDQSxnQkFBSWdJLHlCQUF5QmpCLFlBQVlpQixzQkFBWixJQUFzQyxDQUFDO0FBQ2xFQyxvQkFBTSxDQUFDLElBQUl3SixhQUFKLEdBQW9CLENBQXJCLElBQTBCO0FBRGtDLGFBQUQsQ0FBbkU7QUFHQSxnQkFBSTNKLEtBQUosRUFBVztBQUNUO0FBQ0Esa0JBQUlRLGVBQWUsS0FBZixJQUF3Qm5CLFNBQVMsT0FBakMsSUFDQSxDQUFDYSx1QkFBdUIsQ0FBdkIsRUFBMEJFLEdBRC9CLEVBQ29DO0FBQ2xDRix1Q0FBdUIsQ0FBdkIsRUFBMEJFLEdBQTFCLEdBQWdDO0FBQzlCRCx3QkFBTUQsdUJBQXVCLENBQXZCLEVBQTBCQyxJQUExQixHQUFpQztBQURULGlCQUFoQztBQUdEO0FBQ0Y7O0FBRUQsZ0JBQUlsQixZQUFZcUosV0FBaEIsRUFBNkI7QUFDM0JySiwwQkFBWVksV0FBWixHQUEwQixJQUFJaEksT0FBTzRXLGNBQVgsQ0FDdEJ4UCxZQUFZUyxhQURVLEVBQ0tMLElBREwsQ0FBMUI7QUFFRDs7QUFFREosd0JBQVlrQyxpQkFBWixHQUFnQ0EsaUJBQWhDO0FBQ0FsQyx3QkFBWWlCLHNCQUFaLEdBQXFDQSxzQkFBckM7QUFDRCxXQXpFRDs7QUEyRUE7QUFDQSxjQUFJZ0YsR0FBRzJCLE9BQUgsQ0FBV1AsWUFBWCxLQUE0QixZQUFoQyxFQUE4QztBQUM1Q3ZNLG1CQUFPLG9CQUFvQm1MLEdBQUc0QixZQUFILENBQWdCdUMsR0FBaEIsQ0FBb0IsVUFBU2xMLENBQVQsRUFBWTtBQUN6RCxxQkFBT0EsRUFBRXdCLEdBQVQ7QUFDRCxhQUYwQixFQUV4QndMLElBRndCLENBRW5CLEdBRm1CLENBQXBCLEdBRVEsTUFGZjtBQUdEO0FBQ0RwUixpQkFBTywyQkFBUDs7QUFFQW1MLGFBQUc0QixZQUFILENBQWdCN04sT0FBaEIsQ0FBd0IsVUFBU2dHLFdBQVQsRUFBc0IwSyxhQUF0QixFQUFxQztBQUMzRDVQLG1CQUFPaUYsa0JBQWtCQyxXQUFsQixFQUErQkEsWUFBWWtDLGlCQUEzQyxFQUNILE9BREcsRUFDTWxDLFlBQVl2SSxNQURsQixFQUMwQndPLEdBQUdnQyxTQUQ3QixDQUFQO0FBRUFuTixtQkFBTyxrQkFBUDs7QUFFQSxnQkFBSWtGLFlBQVlNLFdBQVosSUFBMkIyRixHQUFHa0IsaUJBQUgsS0FBeUIsS0FBcEQsS0FDQ3VELGtCQUFrQixDQUFsQixJQUF1QixDQUFDekUsR0FBR21CLFdBRDVCLENBQUosRUFDOEM7QUFDNUNwSCwwQkFBWU0sV0FBWixDQUF3QmlSLGtCQUF4QixHQUE2Q3ZYLE9BQTdDLENBQXFELFVBQVN1UixJQUFULEVBQWU7QUFDbEVBLHFCQUFLQyxTQUFMLEdBQWlCLENBQWpCO0FBQ0ExUSx1QkFBTyxPQUFPZ0YsU0FBUzhMLGNBQVQsQ0FBd0JMLElBQXhCLENBQVAsR0FBdUMsTUFBOUM7QUFDRCxlQUhEOztBQUtBLGtCQUFJdkwsWUFBWU0sV0FBWixDQUF3QjVKLEtBQXhCLEtBQWtDLFdBQXRDLEVBQW1EO0FBQ2pEb0UsdUJBQU8seUJBQVA7QUFDRDtBQUNGO0FBQ0YsV0FoQkQ7O0FBa0JBLGNBQUlPLE9BQU8sSUFBSXpDLE9BQU91QyxxQkFBWCxDQUFpQztBQUMxQy9ELGtCQUFNLE9BRG9DO0FBRTFDMEQsaUJBQUtBO0FBRnFDLFdBQWpDLENBQVg7QUFJQSxpQkFBT3dELFFBQVF0RCxPQUFSLENBQWdCSyxJQUFoQixDQUFQO0FBQ0QsU0FqTEQ7O0FBbUxBSiwwQkFBa0JrTixTQUFsQixDQUE0Qi9NLFlBQTVCLEdBQTJDLFlBQVc7QUFDcEQsY0FBSTZLLEtBQUssSUFBVDs7QUFFQSxjQUFJQSxHQUFHaUMsU0FBUCxFQUFrQjtBQUNoQixtQkFBTzVKLFFBQVFuQixNQUFSLENBQWUrSCxVQUFVLG1CQUFWLEVBQ2xCLHVDQURrQixDQUFmLENBQVA7QUFFRDs7QUFFRCxjQUFJLEVBQUVlLEdBQUc5QixjQUFILEtBQXNCLG1CQUF0QixJQUNGOEIsR0FBRzlCLGNBQUgsS0FBc0IscUJBRHRCLENBQUosRUFDa0Q7QUFDaEQsbUJBQU83RixRQUFRbkIsTUFBUixDQUFlK0gsVUFBVSxtQkFBVixFQUNsQixpREFBaURlLEdBQUc5QixjQURsQyxDQUFmLENBQVA7QUFFRDs7QUFFRCxjQUFJckosTUFBTWdGLFNBQVNvUix1QkFBVCxDQUFpQ2pMLEdBQUc2QixhQUFwQyxFQUNON0IsR0FBRytCLGtCQUFILEVBRE0sQ0FBVjtBQUVBLGNBQUkvQixHQUFHbUIsV0FBUCxFQUFvQjtBQUNsQnRNLG1CQUFPLG9CQUFvQm1MLEdBQUc0QixZQUFILENBQWdCdUMsR0FBaEIsQ0FBb0IsVUFBU2xMLENBQVQsRUFBWTtBQUN6RCxxQkFBT0EsRUFBRXdCLEdBQVQ7QUFDRCxhQUYwQixFQUV4QndMLElBRndCLENBRW5CLEdBRm1CLENBQXBCLEdBRVEsTUFGZjtBQUdEO0FBQ0QsY0FBSXNGLHVCQUF1QjFSLFNBQVNrTSxnQkFBVCxDQUN2Qi9GLEdBQUdlLGlCQUFILENBQXFCbE0sR0FERSxFQUNHVCxNQUQ5QjtBQUVBNEwsYUFBRzRCLFlBQUgsQ0FBZ0I3TixPQUFoQixDQUF3QixVQUFTZ0csV0FBVCxFQUFzQjBLLGFBQXRCLEVBQXFDO0FBQzNELGdCQUFJQSxnQkFBZ0IsQ0FBaEIsR0FBb0I4RyxvQkFBeEIsRUFBOEM7QUFDNUM7QUFDRDtBQUNELGdCQUFJeFIsWUFBWTROLFFBQWhCLEVBQTBCO0FBQ3hCLGtCQUFJNU4sWUFBWUksSUFBWixLQUFxQixhQUF6QixFQUF3QztBQUN0Q3RGLHVCQUFPLG9DQUFQO0FBQ0QsZUFGRCxNQUVPLElBQUlrRixZQUFZSSxJQUFaLEtBQXFCLE9BQXpCLEVBQWtDO0FBQ3ZDdEYsdUJBQU8sc0NBQ0gsMEJBREo7QUFFRCxlQUhNLE1BR0EsSUFBSWtGLFlBQVlJLElBQVosS0FBcUIsT0FBekIsRUFBa0M7QUFDdkN0Rix1QkFBTyx3Q0FDSCw0QkFESjtBQUVEO0FBQ0RBLHFCQUFPLHlCQUNILGdCQURHLEdBRUgsUUFGRyxHQUVRa0YsWUFBWVUsR0FGcEIsR0FFMEIsTUFGakM7QUFHQTtBQUNEOztBQUVEO0FBQ0EsZ0JBQUlWLFlBQVl2SSxNQUFoQixFQUF3QjtBQUN0QixrQkFBSWdhLFVBQUo7QUFDQSxrQkFBSXpSLFlBQVlJLElBQVosS0FBcUIsT0FBekIsRUFBa0M7QUFDaENxUiw2QkFBYXpSLFlBQVl2SSxNQUFaLENBQW1CaWEsY0FBbkIsR0FBb0MsQ0FBcEMsQ0FBYjtBQUNELGVBRkQsTUFFTyxJQUFJMVIsWUFBWUksSUFBWixLQUFxQixPQUF6QixFQUFrQztBQUN2Q3FSLDZCQUFhelIsWUFBWXZJLE1BQVosQ0FBbUJrYSxjQUFuQixHQUFvQyxDQUFwQyxDQUFiO0FBQ0Q7QUFDRCxrQkFBSUYsVUFBSixFQUFnQjtBQUNkO0FBQ0Esb0JBQUlsUSxlQUFlLEtBQWYsSUFBd0J2QixZQUFZSSxJQUFaLEtBQXFCLE9BQTdDLElBQ0EsQ0FBQ0osWUFBWWlCLHNCQUFaLENBQW1DLENBQW5DLEVBQXNDRSxHQUQzQyxFQUNnRDtBQUM5Q25CLDhCQUFZaUIsc0JBQVosQ0FBbUMsQ0FBbkMsRUFBc0NFLEdBQXRDLEdBQTRDO0FBQzFDRCwwQkFBTWxCLFlBQVlpQixzQkFBWixDQUFtQyxDQUFuQyxFQUFzQ0MsSUFBdEMsR0FBNkM7QUFEVCxtQkFBNUM7QUFHRDtBQUNGO0FBQ0Y7O0FBRUQ7QUFDQSxnQkFBSWtCLHFCQUFxQkgsc0JBQ3JCakMsWUFBWWtDLGlCQURTLEVBRXJCbEMsWUFBWW1DLGtCQUZTLENBQXpCOztBQUlBLGdCQUFJeVAsU0FBU3hQLG1CQUFtQkMsTUFBbkIsQ0FBMEJaLE1BQTFCLENBQWlDLFVBQVNvUSxDQUFULEVBQVk7QUFDeEQscUJBQU9BLEVBQUUxYixJQUFGLENBQU9rTixXQUFQLE9BQXlCLEtBQWhDO0FBQ0QsYUFGWSxFQUVWaEosTUFGSDtBQUdBLGdCQUFJLENBQUN1WCxNQUFELElBQVc1UixZQUFZaUIsc0JBQVosQ0FBbUMsQ0FBbkMsRUFBc0NFLEdBQXJELEVBQTBEO0FBQ3hELHFCQUFPbkIsWUFBWWlCLHNCQUFaLENBQW1DLENBQW5DLEVBQXNDRSxHQUE3QztBQUNEOztBQUVEckcsbUJBQU9pRixrQkFBa0JDLFdBQWxCLEVBQStCb0Msa0JBQS9CLEVBQ0gsUUFERyxFQUNPcEMsWUFBWXZJLE1BRG5CLEVBQzJCd08sR0FBR2dDLFNBRDlCLENBQVA7QUFFQSxnQkFBSWpJLFlBQVltTixjQUFaLElBQ0FuTixZQUFZbU4sY0FBWixDQUEyQjJFLFdBRC9CLEVBQzRDO0FBQzFDaFgscUJBQU8sa0JBQVA7QUFDRDtBQUNGLFdBekREOztBQTJEQSxjQUFJTyxPQUFPLElBQUl6QyxPQUFPdUMscUJBQVgsQ0FBaUM7QUFDMUMvRCxrQkFBTSxRQURvQztBQUUxQzBELGlCQUFLQTtBQUZxQyxXQUFqQyxDQUFYO0FBSUEsaUJBQU93RCxRQUFRdEQsT0FBUixDQUFnQkssSUFBaEIsQ0FBUDtBQUNELFNBdkZEOztBQXlGQUosMEJBQWtCa04sU0FBbEIsQ0FBNEJsTSxlQUE1QixHQUE4QyxVQUFTRyxTQUFULEVBQW9CO0FBQ2hFLGNBQUk2SixLQUFLLElBQVQ7QUFDQSxjQUFJOEYsUUFBSjtBQUNBLGNBQUkzUCxhQUFhLEVBQUVBLFVBQVVzTyxhQUFWLEtBQTRCbEYsU0FBNUIsSUFDZnBKLFVBQVVrUCxNQURHLENBQWpCLEVBQ3VCO0FBQ3JCLG1CQUFPaE4sUUFBUW5CLE1BQVIsQ0FBZSxJQUFJb0ksU0FBSixDQUFjLGtDQUFkLENBQWYsQ0FBUDtBQUNEOztBQUVEO0FBQ0EsaUJBQU8sSUFBSWpILE9BQUosQ0FBWSxVQUFTdEQsT0FBVCxFQUFrQm1DLE1BQWxCLEVBQTBCO0FBQzNDLGdCQUFJLENBQUM4SSxHQUFHZSxpQkFBUixFQUEyQjtBQUN6QixxQkFBTzdKLE9BQU8rSCxVQUFVLG1CQUFWLEVBQ1Ysd0RBRFUsQ0FBUCxDQUFQO0FBRUQsYUFIRCxNQUdPLElBQUksQ0FBQzlJLFNBQUQsSUFBY0EsVUFBVUEsU0FBVixLQUF3QixFQUExQyxFQUE4QztBQUNuRCxtQkFBSyxJQUFJd0gsSUFBSSxDQUFiLEVBQWdCQSxJQUFJcUMsR0FBRzRCLFlBQUgsQ0FBZ0J4TixNQUFwQyxFQUE0Q3VKLEdBQTVDLEVBQWlEO0FBQy9DLG9CQUFJcUMsR0FBRzRCLFlBQUgsQ0FBZ0JqRSxDQUFoQixFQUFtQmdLLFFBQXZCLEVBQWlDO0FBQy9CO0FBQ0Q7QUFDRDNILG1CQUFHNEIsWUFBSCxDQUFnQmpFLENBQWhCLEVBQW1CVyxZQUFuQixDQUFnQ1Usa0JBQWhDLENBQW1ELEVBQW5EO0FBQ0E4RywyQkFBV2pNLFNBQVNrTSxnQkFBVCxDQUEwQi9GLEdBQUdlLGlCQUFILENBQXFCbE0sR0FBL0MsQ0FBWDtBQUNBaVIseUJBQVNuSSxDQUFULEtBQWUseUJBQWY7QUFDQXFDLG1CQUFHZSxpQkFBSCxDQUFxQmxNLEdBQXJCLEdBQ0lnRixTQUFTbU0sY0FBVCxDQUF3QmhHLEdBQUdlLGlCQUFILENBQXFCbE0sR0FBN0MsSUFDQWlSLFNBQVNHLElBQVQsQ0FBYyxFQUFkLENBRko7QUFHQSxvQkFBSWpHLEdBQUdtQixXQUFQLEVBQW9CO0FBQ2xCO0FBQ0Q7QUFDRjtBQUNGLGFBZk0sTUFlQTtBQUNMLGtCQUFJc0QsZ0JBQWdCdE8sVUFBVXNPLGFBQTlCO0FBQ0Esa0JBQUl0TyxVQUFVa1AsTUFBZCxFQUFzQjtBQUNwQixxQkFBSyxJQUFJdk8sSUFBSSxDQUFiLEVBQWdCQSxJQUFJa0osR0FBRzRCLFlBQUgsQ0FBZ0J4TixNQUFwQyxFQUE0QzBDLEdBQTVDLEVBQWlEO0FBQy9DLHNCQUFJa0osR0FBRzRCLFlBQUgsQ0FBZ0I5SyxDQUFoQixFQUFtQjJELEdBQW5CLEtBQTJCdEUsVUFBVWtQLE1BQXpDLEVBQWlEO0FBQy9DWixvQ0FBZ0IzTixDQUFoQjtBQUNBO0FBQ0Q7QUFDRjtBQUNGO0FBQ0Qsa0JBQUlpRCxjQUFjaUcsR0FBRzRCLFlBQUgsQ0FBZ0I2QyxhQUFoQixDQUFsQjtBQUNBLGtCQUFJMUssV0FBSixFQUFpQjtBQUNmLG9CQUFJQSxZQUFZNE4sUUFBaEIsRUFBMEI7QUFDeEIseUJBQU81UyxTQUFQO0FBQ0Q7QUFDRCxvQkFBSXVRLE9BQU85TSxPQUFPQyxJQUFQLENBQVl0QyxVQUFVQSxTQUF0QixFQUFpQy9CLE1BQWpDLEdBQTBDLENBQTFDLEdBQ1B5RixTQUFTK0wsY0FBVCxDQUF3QnpQLFVBQVVBLFNBQWxDLENBRE8sR0FDd0MsRUFEbkQ7QUFFQTtBQUNBLG9CQUFJbVAsS0FBS3ZHLFFBQUwsS0FBa0IsS0FBbEIsS0FBNEJ1RyxLQUFLekcsSUFBTCxLQUFjLENBQWQsSUFBbUJ5RyxLQUFLekcsSUFBTCxLQUFjLENBQTdELENBQUosRUFBcUU7QUFDbkUseUJBQU85SixTQUFQO0FBQ0Q7QUFDRDtBQUNBLG9CQUFJdVEsS0FBS0MsU0FBTCxJQUFrQkQsS0FBS0MsU0FBTCxLQUFtQixDQUF6QyxFQUE0QztBQUMxQyx5QkFBT3hRLFNBQVA7QUFDRDtBQUNEO0FBQ0E7QUFDQSxvQkFBSTBQLGtCQUFrQixDQUFsQixJQUF3QkEsZ0JBQWdCLENBQWhCLElBQ3hCMUssWUFBWXVFLFlBQVosS0FBNkIwQixHQUFHNEIsWUFBSCxDQUFnQixDQUFoQixFQUFtQnRELFlBRHBELEVBQ21FO0FBQ2pFLHNCQUFJLENBQUNELGtCQUFrQnRFLFlBQVl1RSxZQUE5QixFQUE0Q2dILElBQTVDLENBQUwsRUFBd0Q7QUFDdEQsMkJBQU9wTyxPQUFPK0gsVUFBVSxnQkFBVixFQUNWLDJCQURVLENBQVAsQ0FBUDtBQUVEO0FBQ0Y7O0FBRUQ7QUFDQSxvQkFBSTZNLGtCQUFrQjNWLFVBQVVBLFNBQVYsQ0FBb0I0VixJQUFwQixFQUF0QjtBQUNBLG9CQUFJRCxnQkFBZ0IvUCxPQUFoQixDQUF3QixJQUF4QixNQUFrQyxDQUF0QyxFQUF5QztBQUN2QytQLG9DQUFrQkEsZ0JBQWdCeEQsTUFBaEIsQ0FBdUIsQ0FBdkIsQ0FBbEI7QUFDRDtBQUNEeEMsMkJBQVdqTSxTQUFTa00sZ0JBQVQsQ0FBMEIvRixHQUFHZSxpQkFBSCxDQUFxQmxNLEdBQS9DLENBQVg7QUFDQWlSLHlCQUFTckIsYUFBVCxLQUEyQixRQUN0QmEsS0FBS25VLElBQUwsR0FBWTJhLGVBQVosR0FBOEIsbUJBRFIsSUFFckIsTUFGTjtBQUdBOUwsbUJBQUdlLGlCQUFILENBQXFCbE0sR0FBckIsR0FDSWdGLFNBQVNtTSxjQUFULENBQXdCaEcsR0FBR2UsaUJBQUgsQ0FBcUJsTSxHQUE3QyxJQUNBaVIsU0FBU0csSUFBVCxDQUFjLEVBQWQsQ0FGSjtBQUdELGVBcENELE1Bb0NPO0FBQ0wsdUJBQU8vTyxPQUFPK0gsVUFBVSxnQkFBVixFQUNWLDJCQURVLENBQVAsQ0FBUDtBQUVEO0FBQ0Y7QUFDRGxLO0FBQ0QsV0F4RU0sQ0FBUDtBQXlFRCxTQWxGRDs7QUFvRkFDLDBCQUFrQmtOLFNBQWxCLENBQTRCdE8sUUFBNUIsR0FBdUMsWUFBVztBQUNoRCxjQUFJb1ksV0FBVyxFQUFmO0FBQ0EsZUFBS3BLLFlBQUwsQ0FBa0I3TixPQUFsQixDQUEwQixVQUFTZ0csV0FBVCxFQUFzQjtBQUM5QyxhQUFDLFdBQUQsRUFBYyxhQUFkLEVBQTZCLGFBQTdCLEVBQTRDLGNBQTVDLEVBQ0ksZUFESixFQUNxQmhHLE9BRHJCLENBQzZCLFVBQVMwTSxNQUFULEVBQWlCO0FBQ3hDLGtCQUFJMUcsWUFBWTBHLE1BQVosQ0FBSixFQUF5QjtBQUN2QnVMLHlCQUFTL1gsSUFBVCxDQUFjOEYsWUFBWTBHLE1BQVosRUFBb0I3TSxRQUFwQixFQUFkO0FBQ0Q7QUFDRixhQUxMO0FBTUQsV0FQRDtBQVFBLGNBQUlxWSxlQUFlLFNBQWZBLFlBQWUsQ0FBU0MsSUFBVCxFQUFlO0FBQ2hDLG1CQUFPO0FBQ0xDLDBCQUFZLGFBRFA7QUFFTEMsMkJBQWEsY0FGUjtBQUdMQyw2QkFBZSxnQkFIVjtBQUlMQyw4QkFBZ0IsaUJBSlg7QUFLTEMsK0JBQWlCO0FBTFosY0FNTEwsS0FBSy9hLElBTkEsS0FNUythLEtBQUsvYSxJQU5yQjtBQU9ELFdBUkQ7QUFTQSxpQkFBTyxJQUFJa0gsT0FBSixDQUFZLFVBQVN0RCxPQUFULEVBQWtCO0FBQ25DO0FBQ0EsZ0JBQUl5WCxVQUFVLElBQUlDLEdBQUosRUFBZDtBQUNBcFUsb0JBQVFxVSxHQUFSLENBQVlWLFFBQVosRUFBc0JuWSxJQUF0QixDQUEyQixVQUFTOFksR0FBVCxFQUFjO0FBQ3ZDQSxrQkFBSTVZLE9BQUosQ0FBWSxVQUFTNlksTUFBVCxFQUFpQjtBQUMzQnBVLHVCQUFPQyxJQUFQLENBQVltVSxNQUFaLEVBQW9CN1ksT0FBcEIsQ0FBNEIsVUFBU2YsRUFBVCxFQUFhO0FBQ3ZDNFoseUJBQU81WixFQUFQLEVBQVc3QixJQUFYLEdBQWtCOGEsYUFBYVcsT0FBTzVaLEVBQVAsQ0FBYixDQUFsQjtBQUNBd1osMEJBQVFLLEdBQVIsQ0FBWTdaLEVBQVosRUFBZ0I0WixPQUFPNVosRUFBUCxDQUFoQjtBQUNELGlCQUhEO0FBSUQsZUFMRDtBQU1BK0Isc0JBQVF5WCxPQUFSO0FBQ0QsYUFSRDtBQVNELFdBWk0sQ0FBUDtBQWFELFNBaENEOztBQWtDQTtBQUNBLFlBQUlNLFVBQVUsQ0FBQyxhQUFELEVBQWdCLGNBQWhCLENBQWQ7QUFDQUEsZ0JBQVEvWSxPQUFSLENBQWdCLFVBQVMwTSxNQUFULEVBQWlCO0FBQy9CLGNBQUlzTSxlQUFlL1gsa0JBQWtCa04sU0FBbEIsQ0FBNEJ6QixNQUE1QixDQUFuQjtBQUNBekwsNEJBQWtCa04sU0FBbEIsQ0FBNEJ6QixNQUE1QixJQUFzQyxZQUFXO0FBQy9DLGdCQUFJdU0sT0FBT3BDLFNBQVg7QUFDQSxnQkFBSSxPQUFPb0MsS0FBSyxDQUFMLENBQVAsS0FBbUIsVUFBbkIsSUFDQSxPQUFPQSxLQUFLLENBQUwsQ0FBUCxLQUFtQixVQUR2QixFQUNtQztBQUFFO0FBQ25DLHFCQUFPRCxhQUFhRSxLQUFiLENBQW1CLElBQW5CLEVBQXlCLENBQUNyQyxVQUFVLENBQVYsQ0FBRCxDQUF6QixFQUNOL1csSUFETSxDQUNELFVBQVNxTCxXQUFULEVBQXNCO0FBQzFCLG9CQUFJLE9BQU84TixLQUFLLENBQUwsQ0FBUCxLQUFtQixVQUF2QixFQUFtQztBQUNqQ0EsdUJBQUssQ0FBTCxFQUFRQyxLQUFSLENBQWMsSUFBZCxFQUFvQixDQUFDL04sV0FBRCxDQUFwQjtBQUNEO0FBQ0YsZUFMTSxFQUtKLFVBQVNuTixLQUFULEVBQWdCO0FBQ2pCLG9CQUFJLE9BQU9pYixLQUFLLENBQUwsQ0FBUCxLQUFtQixVQUF2QixFQUFtQztBQUNqQ0EsdUJBQUssQ0FBTCxFQUFRQyxLQUFSLENBQWMsSUFBZCxFQUFvQixDQUFDbGIsS0FBRCxDQUFwQjtBQUNEO0FBQ0YsZUFUTSxDQUFQO0FBVUQ7QUFDRCxtQkFBT2diLGFBQWFFLEtBQWIsQ0FBbUIsSUFBbkIsRUFBeUJyQyxTQUF6QixDQUFQO0FBQ0QsV0FoQkQ7QUFpQkQsU0FuQkQ7O0FBcUJBa0Msa0JBQVUsQ0FBQyxxQkFBRCxFQUF3QixzQkFBeEIsRUFBZ0QsaUJBQWhELENBQVY7QUFDQUEsZ0JBQVEvWSxPQUFSLENBQWdCLFVBQVMwTSxNQUFULEVBQWlCO0FBQy9CLGNBQUlzTSxlQUFlL1gsa0JBQWtCa04sU0FBbEIsQ0FBNEJ6QixNQUE1QixDQUFuQjtBQUNBekwsNEJBQWtCa04sU0FBbEIsQ0FBNEJ6QixNQUE1QixJQUFzQyxZQUFXO0FBQy9DLGdCQUFJdU0sT0FBT3BDLFNBQVg7QUFDQSxnQkFBSSxPQUFPb0MsS0FBSyxDQUFMLENBQVAsS0FBbUIsVUFBbkIsSUFDQSxPQUFPQSxLQUFLLENBQUwsQ0FBUCxLQUFtQixVQUR2QixFQUNtQztBQUFFO0FBQ25DLHFCQUFPRCxhQUFhRSxLQUFiLENBQW1CLElBQW5CLEVBQXlCckMsU0FBekIsRUFDTi9XLElBRE0sQ0FDRCxZQUFXO0FBQ2Ysb0JBQUksT0FBT21aLEtBQUssQ0FBTCxDQUFQLEtBQW1CLFVBQXZCLEVBQW1DO0FBQ2pDQSx1QkFBSyxDQUFMLEVBQVFDLEtBQVIsQ0FBYyxJQUFkO0FBQ0Q7QUFDRixlQUxNLEVBS0osVUFBU2xiLEtBQVQsRUFBZ0I7QUFDakIsb0JBQUksT0FBT2liLEtBQUssQ0FBTCxDQUFQLEtBQW1CLFVBQXZCLEVBQW1DO0FBQ2pDQSx1QkFBSyxDQUFMLEVBQVFDLEtBQVIsQ0FBYyxJQUFkLEVBQW9CLENBQUNsYixLQUFELENBQXBCO0FBQ0Q7QUFDRixlQVRNLENBQVA7QUFVRDtBQUNELG1CQUFPZ2IsYUFBYUUsS0FBYixDQUFtQixJQUFuQixFQUF5QnJDLFNBQXpCLENBQVA7QUFDRCxXQWhCRDtBQWlCRCxTQW5CRDs7QUFxQkE7QUFDQTtBQUNBLFNBQUMsVUFBRCxFQUFhN1csT0FBYixDQUFxQixVQUFTME0sTUFBVCxFQUFpQjtBQUNwQyxjQUFJc00sZUFBZS9YLGtCQUFrQmtOLFNBQWxCLENBQTRCekIsTUFBNUIsQ0FBbkI7QUFDQXpMLDRCQUFrQmtOLFNBQWxCLENBQTRCekIsTUFBNUIsSUFBc0MsWUFBVztBQUMvQyxnQkFBSXVNLE9BQU9wQyxTQUFYO0FBQ0EsZ0JBQUksT0FBT29DLEtBQUssQ0FBTCxDQUFQLEtBQW1CLFVBQXZCLEVBQW1DO0FBQ2pDLHFCQUFPRCxhQUFhRSxLQUFiLENBQW1CLElBQW5CLEVBQXlCckMsU0FBekIsRUFDTi9XLElBRE0sQ0FDRCxZQUFXO0FBQ2Ysb0JBQUksT0FBT21aLEtBQUssQ0FBTCxDQUFQLEtBQW1CLFVBQXZCLEVBQW1DO0FBQ2pDQSx1QkFBSyxDQUFMLEVBQVFDLEtBQVIsQ0FBYyxJQUFkO0FBQ0Q7QUFDRixlQUxNLENBQVA7QUFNRDtBQUNELG1CQUFPRixhQUFhRSxLQUFiLENBQW1CLElBQW5CLEVBQXlCckMsU0FBekIsQ0FBUDtBQUNELFdBWEQ7QUFZRCxTQWREOztBQWdCQSxlQUFPNVYsaUJBQVA7QUFDRCxPQTdnREQ7QUErZ0RDLEtBeHZENHlCLEVBd3ZEM3lCLEVBQUMsT0FBTSxDQUFQLEVBeHZEMnlCLENBQUgsRUF3dkQ3eEIsR0FBRSxDQUFDLFVBQVN3RSxPQUFULEVBQWlCVCxNQUFqQixFQUF3QkQsT0FBeEIsRUFBZ0M7QUFDL0M7QUFDRDs7QUFFQTs7QUFDQSxVQUFJZSxXQUFXLEVBQWY7O0FBRUE7QUFDQTtBQUNBQSxlQUFTbVAsa0JBQVQsR0FBOEIsWUFBVztBQUN2QyxlQUFPekwsS0FBSzJQLE1BQUwsR0FBY0MsUUFBZCxDQUF1QixFQUF2QixFQUEyQjdFLE1BQTNCLENBQWtDLENBQWxDLEVBQXFDLEVBQXJDLENBQVA7QUFDRCxPQUZEOztBQUlBO0FBQ0F6TyxlQUFTc0IsVUFBVCxHQUFzQnRCLFNBQVNtUCxrQkFBVCxFQUF0Qjs7QUFFQTtBQUNBblAsZUFBUzRPLFVBQVQsR0FBc0IsVUFBUzJFLElBQVQsRUFBZTtBQUNuQyxlQUFPQSxLQUFLckIsSUFBTCxHQUFZeEQsS0FBWixDQUFrQixJQUFsQixFQUF3QnBFLEdBQXhCLENBQTRCLFVBQVNrSixJQUFULEVBQWU7QUFDaEQsaUJBQU9BLEtBQUt0QixJQUFMLEVBQVA7QUFDRCxTQUZNLENBQVA7QUFHRCxPQUpEO0FBS0E7QUFDQWxTLGVBQVN5TixhQUFULEdBQXlCLFVBQVM4RixJQUFULEVBQWU7QUFDdEMsWUFBSUUsUUFBUUYsS0FBSzdFLEtBQUwsQ0FBVyxNQUFYLENBQVo7QUFDQSxlQUFPK0UsTUFBTW5KLEdBQU4sQ0FBVSxVQUFTb0osSUFBVCxFQUFlQyxLQUFmLEVBQXNCO0FBQ3JDLGlCQUFPLENBQUNBLFFBQVEsQ0FBUixHQUFZLE9BQU9ELElBQW5CLEdBQTBCQSxJQUEzQixFQUFpQ3hCLElBQWpDLEtBQTBDLE1BQWpEO0FBQ0QsU0FGTSxDQUFQO0FBR0QsT0FMRDs7QUFPQTtBQUNBbFMsZUFBU21NLGNBQVQsR0FBMEIsVUFBU29ILElBQVQsRUFBZTtBQUN2QyxZQUFJdEgsV0FBV2pNLFNBQVN5TixhQUFULENBQXVCOEYsSUFBdkIsQ0FBZjtBQUNBLGVBQU90SCxZQUFZQSxTQUFTLENBQVQsQ0FBbkI7QUFDRCxPQUhEOztBQUtBO0FBQ0FqTSxlQUFTa00sZ0JBQVQsR0FBNEIsVUFBU3FILElBQVQsRUFBZTtBQUN6QyxZQUFJdEgsV0FBV2pNLFNBQVN5TixhQUFULENBQXVCOEYsSUFBdkIsQ0FBZjtBQUNBdEgsaUJBQVNwQixLQUFUO0FBQ0EsZUFBT29CLFFBQVA7QUFDRCxPQUpEOztBQU1BO0FBQ0FqTSxlQUFTNk4sV0FBVCxHQUF1QixVQUFTMEYsSUFBVCxFQUFlSyxNQUFmLEVBQXVCO0FBQzVDLGVBQU81VCxTQUFTNE8sVUFBVCxDQUFvQjJFLElBQXBCLEVBQTBCNVIsTUFBMUIsQ0FBaUMsVUFBUzZSLElBQVQsRUFBZTtBQUNyRCxpQkFBT0EsS0FBS3RSLE9BQUwsQ0FBYTBSLE1BQWIsTUFBeUIsQ0FBaEM7QUFDRCxTQUZNLENBQVA7QUFHRCxPQUpEOztBQU1BO0FBQ0E7QUFDQTtBQUNBNVQsZUFBUytMLGNBQVQsR0FBMEIsVUFBU3lILElBQVQsRUFBZTtBQUN2QyxZQUFJQyxLQUFKO0FBQ0E7QUFDQSxZQUFJRCxLQUFLdFIsT0FBTCxDQUFhLGNBQWIsTUFBaUMsQ0FBckMsRUFBd0M7QUFDdEN1UixrQkFBUUQsS0FBS0ssU0FBTCxDQUFlLEVBQWYsRUFBbUJuRixLQUFuQixDQUF5QixHQUF6QixDQUFSO0FBQ0QsU0FGRCxNQUVPO0FBQ0wrRSxrQkFBUUQsS0FBS0ssU0FBTCxDQUFlLEVBQWYsRUFBbUJuRixLQUFuQixDQUF5QixHQUF6QixDQUFSO0FBQ0Q7O0FBRUQsWUFBSXBTLFlBQVk7QUFDZHdJLHNCQUFZMk8sTUFBTSxDQUFOLENBREU7QUFFZC9ILHFCQUFXclIsU0FBU29aLE1BQU0sQ0FBTixDQUFULEVBQW1CLEVBQW5CLENBRkc7QUFHZHZPLG9CQUFVdU8sTUFBTSxDQUFOLEVBQVNsUSxXQUFULEVBSEk7QUFJZDBCLG9CQUFVNUssU0FBU29aLE1BQU0sQ0FBTixDQUFULEVBQW1CLEVBQW5CLENBSkk7QUFLZDFPLGNBQUkwTyxNQUFNLENBQU4sQ0FMVTtBQU1kek8sZ0JBQU0zSyxTQUFTb1osTUFBTSxDQUFOLENBQVQsRUFBbUIsRUFBbkIsQ0FOUTtBQU9kO0FBQ0FuYyxnQkFBTW1jLE1BQU0sQ0FBTjtBQVJRLFNBQWhCOztBQVdBLGFBQUssSUFBSXhXLElBQUksQ0FBYixFQUFnQkEsSUFBSXdXLE1BQU1sWixNQUExQixFQUFrQzBDLEtBQUssQ0FBdkMsRUFBMEM7QUFDeEMsa0JBQVF3VyxNQUFNeFcsQ0FBTixDQUFSO0FBQ0UsaUJBQUssT0FBTDtBQUNFWCx3QkFBVXdYLGNBQVYsR0FBMkJMLE1BQU14VyxJQUFJLENBQVYsQ0FBM0I7QUFDQTtBQUNGLGlCQUFLLE9BQUw7QUFDRVgsd0JBQVV5WCxXQUFWLEdBQXdCMVosU0FBU29aLE1BQU14VyxJQUFJLENBQVYsQ0FBVCxFQUF1QixFQUF2QixDQUF4QjtBQUNBO0FBQ0YsaUJBQUssU0FBTDtBQUNFWCx3QkFBVTBYLE9BQVYsR0FBb0JQLE1BQU14VyxJQUFJLENBQVYsQ0FBcEI7QUFDQTtBQUNGLGlCQUFLLE9BQUw7QUFDRVgsd0JBQVVxUCxLQUFWLEdBQWtCOEgsTUFBTXhXLElBQUksQ0FBVixDQUFsQixDQURGLENBQ2tDO0FBQ2hDWCx3QkFBVXNQLGdCQUFWLEdBQTZCNkgsTUFBTXhXLElBQUksQ0FBVixDQUE3QjtBQUNBO0FBQ0Y7QUFBUztBQUNQWCx3QkFBVW1YLE1BQU14VyxDQUFOLENBQVYsSUFBc0J3VyxNQUFNeFcsSUFBSSxDQUFWLENBQXRCO0FBQ0E7QUFoQko7QUFrQkQ7QUFDRCxlQUFPWCxTQUFQO0FBQ0QsT0F6Q0Q7O0FBMkNBO0FBQ0EwRCxlQUFTOEwsY0FBVCxHQUEwQixVQUFTeFAsU0FBVCxFQUFvQjtBQUM1QyxZQUFJdEIsTUFBTSxFQUFWO0FBQ0FBLFlBQUlaLElBQUosQ0FBU2tDLFVBQVV3SSxVQUFuQjtBQUNBOUosWUFBSVosSUFBSixDQUFTa0MsVUFBVW9QLFNBQW5CO0FBQ0ExUSxZQUFJWixJQUFKLENBQVNrQyxVQUFVNEksUUFBVixDQUFtQitPLFdBQW5CLEVBQVQ7QUFDQWpaLFlBQUlaLElBQUosQ0FBU2tDLFVBQVUySSxRQUFuQjtBQUNBakssWUFBSVosSUFBSixDQUFTa0MsVUFBVXlJLEVBQW5CO0FBQ0EvSixZQUFJWixJQUFKLENBQVNrQyxVQUFVMEksSUFBbkI7O0FBRUEsWUFBSTFOLE9BQU9nRixVQUFVaEYsSUFBckI7QUFDQTBELFlBQUlaLElBQUosQ0FBUyxLQUFUO0FBQ0FZLFlBQUlaLElBQUosQ0FBUzlDLElBQVQ7QUFDQSxZQUFJQSxTQUFTLE1BQVQsSUFBbUJnRixVQUFVd1gsY0FBN0IsSUFDQXhYLFVBQVV5WCxXQURkLEVBQzJCO0FBQ3pCL1ksY0FBSVosSUFBSixDQUFTLE9BQVQ7QUFDQVksY0FBSVosSUFBSixDQUFTa0MsVUFBVXdYLGNBQW5CLEVBRnlCLENBRVc7QUFDcEM5WSxjQUFJWixJQUFKLENBQVMsT0FBVDtBQUNBWSxjQUFJWixJQUFKLENBQVNrQyxVQUFVeVgsV0FBbkIsRUFKeUIsQ0FJUTtBQUNsQztBQUNELFlBQUl6WCxVQUFVMFgsT0FBVixJQUFxQjFYLFVBQVU0SSxRQUFWLENBQW1CM0IsV0FBbkIsT0FBcUMsS0FBOUQsRUFBcUU7QUFDbkV2SSxjQUFJWixJQUFKLENBQVMsU0FBVDtBQUNBWSxjQUFJWixJQUFKLENBQVNrQyxVQUFVMFgsT0FBbkI7QUFDRDtBQUNELFlBQUkxWCxVQUFVc1AsZ0JBQVYsSUFBOEJ0UCxVQUFVcVAsS0FBNUMsRUFBbUQ7QUFDakQzUSxjQUFJWixJQUFKLENBQVMsT0FBVDtBQUNBWSxjQUFJWixJQUFKLENBQVNrQyxVQUFVc1AsZ0JBQVYsSUFBOEJ0UCxVQUFVcVAsS0FBakQ7QUFDRDtBQUNELGVBQU8sZUFBZTNRLElBQUlvUixJQUFKLENBQVMsR0FBVCxDQUF0QjtBQUNELE9BNUJEOztBQThCQTtBQUNBO0FBQ0FwTSxlQUFTa1UsZUFBVCxHQUEyQixVQUFTVixJQUFULEVBQWU7QUFDeEMsZUFBT0EsS0FBSy9FLE1BQUwsQ0FBWSxFQUFaLEVBQWdCQyxLQUFoQixDQUFzQixHQUF0QixDQUFQO0FBQ0QsT0FGRDs7QUFJQTtBQUNBO0FBQ0ExTyxlQUFTbVUsV0FBVCxHQUF1QixVQUFTWCxJQUFULEVBQWU7QUFDcEMsWUFBSUMsUUFBUUQsS0FBSy9FLE1BQUwsQ0FBWSxDQUFaLEVBQWVDLEtBQWYsQ0FBcUIsR0FBckIsQ0FBWjtBQUNBLFlBQUkwRixTQUFTO0FBQ1h4Uix1QkFBYXZJLFNBQVNvWixNQUFNNUksS0FBTixFQUFULEVBQXdCLEVBQXhCLENBREYsQ0FDOEI7QUFEOUIsU0FBYjs7QUFJQTRJLGdCQUFRQSxNQUFNLENBQU4sRUFBUy9FLEtBQVQsQ0FBZSxHQUFmLENBQVI7O0FBRUEwRixlQUFPL2QsSUFBUCxHQUFjb2QsTUFBTSxDQUFOLENBQWQ7QUFDQVcsZUFBTzVRLFNBQVAsR0FBbUJuSixTQUFTb1osTUFBTSxDQUFOLENBQVQsRUFBbUIsRUFBbkIsQ0FBbkIsQ0FUb0MsQ0FTTztBQUMzQztBQUNBVyxlQUFPM1EsV0FBUCxHQUFxQmdRLE1BQU1sWixNQUFOLEtBQWlCLENBQWpCLEdBQXFCRixTQUFTb1osTUFBTSxDQUFOLENBQVQsRUFBbUIsRUFBbkIsQ0FBckIsR0FBOEMsQ0FBbkU7QUFDQSxlQUFPVyxNQUFQO0FBQ0QsT0FiRDs7QUFlQTtBQUNBO0FBQ0FwVSxlQUFTcVUsV0FBVCxHQUF1QixVQUFTekUsS0FBVCxFQUFnQjtBQUNyQyxZQUFJak4sS0FBS2lOLE1BQU1oTixXQUFmO0FBQ0EsWUFBSWdOLE1BQU0vTSxvQkFBTixLQUErQjZDLFNBQW5DLEVBQThDO0FBQzVDL0MsZUFBS2lOLE1BQU0vTSxvQkFBWDtBQUNEO0FBQ0QsZUFBTyxjQUFjRixFQUFkLEdBQW1CLEdBQW5CLEdBQXlCaU4sTUFBTXZaLElBQS9CLEdBQXNDLEdBQXRDLEdBQTRDdVosTUFBTXBNLFNBQWxELElBQ0ZvTSxNQUFNbk0sV0FBTixLQUFzQixDQUF0QixHQUEwQixNQUFNbU0sTUFBTW5NLFdBQXRDLEdBQW9ELEVBRGxELElBQ3dELE1BRC9EO0FBRUQsT0FQRDs7QUFTQTtBQUNBO0FBQ0E7QUFDQXpELGVBQVNzVSxXQUFULEdBQXVCLFVBQVNkLElBQVQsRUFBZTtBQUNwQyxZQUFJQyxRQUFRRCxLQUFLL0UsTUFBTCxDQUFZLENBQVosRUFBZUMsS0FBZixDQUFxQixHQUFyQixDQUFaO0FBQ0EsZUFBTztBQUNMdlYsY0FBSWtCLFNBQVNvWixNQUFNLENBQU4sQ0FBVCxFQUFtQixFQUFuQixDQURDO0FBRUwzRSxxQkFBVzJFLE1BQU0sQ0FBTixFQUFTdlIsT0FBVCxDQUFpQixHQUFqQixJQUF3QixDQUF4QixHQUE0QnVSLE1BQU0sQ0FBTixFQUFTL0UsS0FBVCxDQUFlLEdBQWYsRUFBb0IsQ0FBcEIsQ0FBNUIsR0FBcUQsVUFGM0Q7QUFHTHhLLGVBQUt1UCxNQUFNLENBQU47QUFIQSxTQUFQO0FBS0QsT0FQRDs7QUFTQTtBQUNBO0FBQ0F6VCxlQUFTdVUsV0FBVCxHQUF1QixVQUFTQyxlQUFULEVBQTBCO0FBQy9DLGVBQU8sZUFBZUEsZ0JBQWdCcmIsRUFBaEIsSUFBc0JxYixnQkFBZ0JDLFdBQXJELEtBQ0ZELGdCQUFnQjFGLFNBQWhCLElBQTZCMEYsZ0JBQWdCMUYsU0FBaEIsS0FBOEIsVUFBM0QsR0FDSyxNQUFNMEYsZ0JBQWdCMUYsU0FEM0IsR0FFSyxFQUhILElBSUgsR0FKRyxHQUlHMEYsZ0JBQWdCdFEsR0FKbkIsR0FJeUIsTUFKaEM7QUFLRCxPQU5EOztBQVFBO0FBQ0E7QUFDQTtBQUNBbEUsZUFBUzBVLFNBQVQsR0FBcUIsVUFBU2xCLElBQVQsRUFBZTtBQUNsQyxZQUFJWSxTQUFTLEVBQWI7QUFDQSxZQUFJTyxFQUFKO0FBQ0EsWUFBSWxCLFFBQVFELEtBQUsvRSxNQUFMLENBQVkrRSxLQUFLdFIsT0FBTCxDQUFhLEdBQWIsSUFBb0IsQ0FBaEMsRUFBbUN3TSxLQUFuQyxDQUF5QyxHQUF6QyxDQUFaO0FBQ0EsYUFBSyxJQUFJNUssSUFBSSxDQUFiLEVBQWdCQSxJQUFJMlAsTUFBTWxaLE1BQTFCLEVBQWtDdUosR0FBbEMsRUFBdUM7QUFDckM2USxlQUFLbEIsTUFBTTNQLENBQU4sRUFBU29PLElBQVQsR0FBZ0J4RCxLQUFoQixDQUFzQixHQUF0QixDQUFMO0FBQ0EwRixpQkFBT08sR0FBRyxDQUFILEVBQU16QyxJQUFOLEVBQVAsSUFBdUJ5QyxHQUFHLENBQUgsQ0FBdkI7QUFDRDtBQUNELGVBQU9QLE1BQVA7QUFDRCxPQVREOztBQVdBO0FBQ0FwVSxlQUFTNFUsU0FBVCxHQUFxQixVQUFTaEYsS0FBVCxFQUFnQjtBQUNuQyxZQUFJNEQsT0FBTyxFQUFYO0FBQ0EsWUFBSTdRLEtBQUtpTixNQUFNaE4sV0FBZjtBQUNBLFlBQUlnTixNQUFNL00sb0JBQU4sS0FBK0I2QyxTQUFuQyxFQUE4QztBQUM1Qy9DLGVBQUtpTixNQUFNL00sb0JBQVg7QUFDRDtBQUNELFlBQUkrTSxNQUFNeE0sVUFBTixJQUFvQnpFLE9BQU9DLElBQVAsQ0FBWWdSLE1BQU14TSxVQUFsQixFQUE4QjdJLE1BQXRELEVBQThEO0FBQzVELGNBQUl5UyxTQUFTLEVBQWI7QUFDQXJPLGlCQUFPQyxJQUFQLENBQVlnUixNQUFNeE0sVUFBbEIsRUFBOEJsSixPQUE5QixDQUFzQyxVQUFTMmEsS0FBVCxFQUFnQjtBQUNwRDdILG1CQUFPNVMsSUFBUCxDQUFZeWEsUUFBUSxHQUFSLEdBQWNqRixNQUFNeE0sVUFBTixDQUFpQnlSLEtBQWpCLENBQTFCO0FBQ0QsV0FGRDtBQUdBckIsa0JBQVEsWUFBWTdRLEVBQVosR0FBaUIsR0FBakIsR0FBdUJxSyxPQUFPWixJQUFQLENBQVksR0FBWixDQUF2QixHQUEwQyxNQUFsRDtBQUNEO0FBQ0QsZUFBT29ILElBQVA7QUFDRCxPQWREOztBQWdCQTtBQUNBO0FBQ0F4VCxlQUFTOFUsV0FBVCxHQUF1QixVQUFTdEIsSUFBVCxFQUFlO0FBQ3BDLFlBQUlDLFFBQVFELEtBQUsvRSxNQUFMLENBQVkrRSxLQUFLdFIsT0FBTCxDQUFhLEdBQWIsSUFBb0IsQ0FBaEMsRUFBbUN3TSxLQUFuQyxDQUF5QyxHQUF6QyxDQUFaO0FBQ0EsZUFBTztBQUNMcFgsZ0JBQU1tYyxNQUFNNUksS0FBTixFQUREO0FBRUw5RyxxQkFBVzBQLE1BQU1ySCxJQUFOLENBQVcsR0FBWDtBQUZOLFNBQVA7QUFJRCxPQU5EO0FBT0E7QUFDQXBNLGVBQVMrVSxXQUFULEdBQXVCLFVBQVNuRixLQUFULEVBQWdCO0FBQ3JDLFlBQUlqQixRQUFRLEVBQVo7QUFDQSxZQUFJaE0sS0FBS2lOLE1BQU1oTixXQUFmO0FBQ0EsWUFBSWdOLE1BQU0vTSxvQkFBTixLQUErQjZDLFNBQW5DLEVBQThDO0FBQzVDL0MsZUFBS2lOLE1BQU0vTSxvQkFBWDtBQUNEO0FBQ0QsWUFBSStNLE1BQU1oTSxZQUFOLElBQXNCZ00sTUFBTWhNLFlBQU4sQ0FBbUJySixNQUE3QyxFQUFxRDtBQUNuRDtBQUNBcVYsZ0JBQU1oTSxZQUFOLENBQW1CMUosT0FBbkIsQ0FBMkIsVUFBUzJKLEVBQVQsRUFBYTtBQUN0QzhLLHFCQUFTLGVBQWVoTSxFQUFmLEdBQW9CLEdBQXBCLEdBQTBCa0IsR0FBR3ZNLElBQTdCLElBQ1J1TSxHQUFHRSxTQUFILElBQWdCRixHQUFHRSxTQUFILENBQWF4SixNQUE3QixHQUFzQyxNQUFNc0osR0FBR0UsU0FBL0MsR0FBMkQsRUFEbkQsSUFFTCxNQUZKO0FBR0QsV0FKRDtBQUtEO0FBQ0QsZUFBTzRLLEtBQVA7QUFDRCxPQWZEOztBQWlCQTtBQUNBO0FBQ0EzTyxlQUFTZ1YsY0FBVCxHQUEwQixVQUFTeEIsSUFBVCxFQUFlO0FBQ3ZDLFlBQUl5QixLQUFLekIsS0FBS3RSLE9BQUwsQ0FBYSxHQUFiLENBQVQ7QUFDQSxZQUFJdVIsUUFBUTtBQUNWclMsZ0JBQU0vRyxTQUFTbVosS0FBSy9FLE1BQUwsQ0FBWSxDQUFaLEVBQWV3RyxLQUFLLENBQXBCLENBQVQsRUFBaUMsRUFBakM7QUFESSxTQUFaO0FBR0EsWUFBSUMsUUFBUTFCLEtBQUt0UixPQUFMLENBQWEsR0FBYixFQUFrQitTLEVBQWxCLENBQVo7QUFDQSxZQUFJQyxRQUFRLENBQUMsQ0FBYixFQUFnQjtBQUNkekIsZ0JBQU0wQixTQUFOLEdBQWtCM0IsS0FBSy9FLE1BQUwsQ0FBWXdHLEtBQUssQ0FBakIsRUFBb0JDLFFBQVFELEVBQVIsR0FBYSxDQUFqQyxDQUFsQjtBQUNBeEIsZ0JBQU0xSSxLQUFOLEdBQWN5SSxLQUFLL0UsTUFBTCxDQUFZeUcsUUFBUSxDQUFwQixDQUFkO0FBQ0QsU0FIRCxNQUdPO0FBQ0x6QixnQkFBTTBCLFNBQU4sR0FBa0IzQixLQUFLL0UsTUFBTCxDQUFZd0csS0FBSyxDQUFqQixDQUFsQjtBQUNEO0FBQ0QsZUFBT3hCLEtBQVA7QUFDRCxPQWJEOztBQWVBO0FBQ0E7QUFDQXpULGVBQVNrUCxNQUFULEdBQWtCLFVBQVN4QixZQUFULEVBQXVCO0FBQ3ZDLFlBQUk5TSxNQUFNWixTQUFTNk4sV0FBVCxDQUFxQkgsWUFBckIsRUFBbUMsUUFBbkMsRUFBNkMsQ0FBN0MsQ0FBVjtBQUNBLFlBQUk5TSxHQUFKLEVBQVM7QUFDUCxpQkFBT0EsSUFBSTZOLE1BQUosQ0FBVyxDQUFYLENBQVA7QUFDRDtBQUNGLE9BTEQ7O0FBT0F6TyxlQUFTb1YsZ0JBQVQsR0FBNEIsVUFBUzVCLElBQVQsRUFBZTtBQUN6QyxZQUFJQyxRQUFRRCxLQUFLL0UsTUFBTCxDQUFZLEVBQVosRUFBZ0JDLEtBQWhCLENBQXNCLEdBQXRCLENBQVo7QUFDQSxlQUFPO0FBQ0wyRyxxQkFBVzVCLE1BQU0sQ0FBTixFQUFTbFEsV0FBVCxFQUROLEVBQzhCO0FBQ25Dd0gsaUJBQU8wSSxNQUFNLENBQU47QUFGRixTQUFQO0FBSUQsT0FORDs7QUFRQTtBQUNBO0FBQ0E7QUFDQXpULGVBQVNtTyxpQkFBVCxHQUE2QixVQUFTVCxZQUFULEVBQXVCRixXQUF2QixFQUFvQztBQUMvRCxZQUFJbUIsUUFBUTNPLFNBQVM2TixXQUFULENBQXFCSCxlQUFlRixXQUFwQyxFQUNSLGdCQURRLENBQVo7QUFFQTtBQUNBO0FBQ0EsZUFBTztBQUNMWSxnQkFBTSxNQUREO0FBRUxrSCx3QkFBYzNHLE1BQU1yRSxHQUFOLENBQVV0SyxTQUFTb1YsZ0JBQW5CO0FBRlQsU0FBUDtBQUlELE9BVEQ7O0FBV0E7QUFDQXBWLGVBQVNVLG1CQUFULEdBQStCLFVBQVNzTSxNQUFULEVBQWlCdUksU0FBakIsRUFBNEI7QUFDekQsWUFBSXZhLE1BQU0sYUFBYXVhLFNBQWIsR0FBeUIsTUFBbkM7QUFDQXZJLGVBQU9zSSxZQUFQLENBQW9CcGIsT0FBcEIsQ0FBNEIsVUFBU3NiLEVBQVQsRUFBYTtBQUN2Q3hhLGlCQUFPLG1CQUFtQndhLEdBQUdILFNBQXRCLEdBQWtDLEdBQWxDLEdBQXdDRyxHQUFHekssS0FBM0MsR0FBbUQsTUFBMUQ7QUFDRCxTQUZEO0FBR0EsZUFBTy9QLEdBQVA7QUFDRCxPQU5EO0FBT0E7QUFDQTtBQUNBO0FBQ0FnRixlQUFTaU8sZ0JBQVQsR0FBNEIsVUFBU1AsWUFBVCxFQUF1QkYsV0FBdkIsRUFBb0M7QUFDOUQsWUFBSW1CLFFBQVEzTyxTQUFTNE8sVUFBVCxDQUFvQmxCLFlBQXBCLENBQVo7QUFDQTtBQUNBaUIsZ0JBQVFBLE1BQU04RyxNQUFOLENBQWF6VixTQUFTNE8sVUFBVCxDQUFvQnBCLFdBQXBCLENBQWIsQ0FBUjtBQUNBLFlBQUlrSSxnQkFBZ0I7QUFDbEI5Siw0QkFBa0IrQyxNQUFNaE4sTUFBTixDQUFhLFVBQVM2UixJQUFULEVBQWU7QUFDNUMsbUJBQU9BLEtBQUt0UixPQUFMLENBQWEsY0FBYixNQUFpQyxDQUF4QztBQUNELFdBRmlCLEVBRWYsQ0FGZSxFQUVadU0sTUFGWSxDQUVMLEVBRkssQ0FEQTtBQUlsQmtILG9CQUFVaEgsTUFBTWhOLE1BQU4sQ0FBYSxVQUFTNlIsSUFBVCxFQUFlO0FBQ3BDLG1CQUFPQSxLQUFLdFIsT0FBTCxDQUFhLFlBQWIsTUFBK0IsQ0FBdEM7QUFDRCxXQUZTLEVBRVAsQ0FGTyxFQUVKdU0sTUFGSSxDQUVHLEVBRkg7QUFKUSxTQUFwQjtBQVFBLGVBQU9pSCxhQUFQO0FBQ0QsT0FiRDs7QUFlQTtBQUNBMVYsZUFBU08sa0JBQVQsR0FBOEIsVUFBU3lNLE1BQVQsRUFBaUI7QUFDN0MsZUFBTyxpQkFBaUJBLE9BQU9wQixnQkFBeEIsR0FBMkMsTUFBM0MsR0FDSCxZQURHLEdBQ1lvQixPQUFPMkksUUFEbkIsR0FDOEIsTUFEckM7QUFFRCxPQUhEOztBQUtBO0FBQ0EzVixlQUFTMk4sa0JBQVQsR0FBOEIsVUFBU0QsWUFBVCxFQUF1QjtBQUNuRCxZQUFJckksY0FBYztBQUNoQjlDLGtCQUFRLEVBRFE7QUFFaEJDLDRCQUFrQixFQUZGO0FBR2hCQyx5QkFBZSxFQUhDO0FBSWhCeUssZ0JBQU07QUFKVSxTQUFsQjtBQU1BLFlBQUl5QixRQUFRM08sU0FBUzRPLFVBQVQsQ0FBb0JsQixZQUFwQixDQUFaO0FBQ0EsWUFBSWtJLFFBQVFqSCxNQUFNLENBQU4sRUFBU0QsS0FBVCxDQUFlLEdBQWYsQ0FBWjtBQUNBLGFBQUssSUFBSXpSLElBQUksQ0FBYixFQUFnQkEsSUFBSTJZLE1BQU1yYixNQUExQixFQUFrQzBDLEdBQWxDLEVBQXVDO0FBQUU7QUFDdkMsY0FBSTBGLEtBQUtpVCxNQUFNM1ksQ0FBTixDQUFUO0FBQ0EsY0FBSTRZLGFBQWE3VixTQUFTNk4sV0FBVCxDQUNiSCxZQURhLEVBQ0MsY0FBYy9LLEVBQWQsR0FBbUIsR0FEcEIsRUFDeUIsQ0FEekIsQ0FBakI7QUFFQSxjQUFJa1QsVUFBSixFQUFnQjtBQUNkLGdCQUFJakcsUUFBUTVQLFNBQVNtVSxXQUFULENBQXFCMEIsVUFBckIsQ0FBWjtBQUNBLGdCQUFJQyxRQUFROVYsU0FBUzZOLFdBQVQsQ0FDUkgsWUFEUSxFQUNNLFlBQVkvSyxFQUFaLEdBQWlCLEdBRHZCLENBQVo7QUFFQTtBQUNBaU4sa0JBQU14TSxVQUFOLEdBQW1CMFMsTUFBTXZiLE1BQU4sR0FBZXlGLFNBQVMwVSxTQUFULENBQW1Cb0IsTUFBTSxDQUFOLENBQW5CLENBQWYsR0FBOEMsRUFBakU7QUFDQWxHLGtCQUFNaE0sWUFBTixHQUFxQjVELFNBQVM2TixXQUFULENBQ2pCSCxZQURpQixFQUNILGVBQWUvSyxFQUFmLEdBQW9CLEdBRGpCLEVBRWxCMkgsR0FGa0IsQ0FFZHRLLFNBQVM4VSxXQUZLLENBQXJCO0FBR0F6UCx3QkFBWTlDLE1BQVosQ0FBbUJuSSxJQUFuQixDQUF3QndWLEtBQXhCO0FBQ0E7QUFDQSxvQkFBUUEsTUFBTXZaLElBQU4sQ0FBVzRkLFdBQVgsRUFBUjtBQUNFLG1CQUFLLEtBQUw7QUFDQSxtQkFBSyxRQUFMO0FBQ0U1Tyw0QkFBWTVDLGFBQVosQ0FBMEJySSxJQUExQixDQUErQndWLE1BQU12WixJQUFOLENBQVc0ZCxXQUFYLEVBQS9CO0FBQ0E7QUFDRjtBQUFTO0FBQ1A7QUFOSjtBQVFEO0FBQ0Y7QUFDRGpVLGlCQUFTNk4sV0FBVCxDQUFxQkgsWUFBckIsRUFBbUMsV0FBbkMsRUFBZ0R4VCxPQUFoRCxDQUF3RCxVQUFTc1osSUFBVCxFQUFlO0FBQ3JFbk8sc0JBQVk3QyxnQkFBWixDQUE2QnBJLElBQTdCLENBQWtDNEYsU0FBU3NVLFdBQVQsQ0FBcUJkLElBQXJCLENBQWxDO0FBQ0QsU0FGRDtBQUdBO0FBQ0EsZUFBT25PLFdBQVA7QUFDRCxPQXZDRDs7QUF5Q0E7QUFDQTtBQUNBckYsZUFBU0ssbUJBQVQsR0FBK0IsVUFBU0MsSUFBVCxFQUFlSCxJQUFmLEVBQXFCO0FBQ2xELFlBQUluRixNQUFNLEVBQVY7O0FBRUE7QUFDQUEsZUFBTyxPQUFPc0YsSUFBUCxHQUFjLEdBQXJCO0FBQ0F0RixlQUFPbUYsS0FBS29DLE1BQUwsQ0FBWWhJLE1BQVosR0FBcUIsQ0FBckIsR0FBeUIsR0FBekIsR0FBK0IsR0FBdEMsQ0FMa0QsQ0FLUDtBQUMzQ1MsZUFBTyxxQkFBUDtBQUNBQSxlQUFPbUYsS0FBS29DLE1BQUwsQ0FBWStILEdBQVosQ0FBZ0IsVUFBU3NGLEtBQVQsRUFBZ0I7QUFDckMsY0FBSUEsTUFBTS9NLG9CQUFOLEtBQStCNkMsU0FBbkMsRUFBOEM7QUFDNUMsbUJBQU9rSyxNQUFNL00sb0JBQWI7QUFDRDtBQUNELGlCQUFPK00sTUFBTWhOLFdBQWI7QUFDRCxTQUxNLEVBS0p3SixJQUxJLENBS0MsR0FMRCxJQUtRLE1BTGY7O0FBT0FwUixlQUFPLHNCQUFQO0FBQ0FBLGVBQU8sNkJBQVA7O0FBRUE7QUFDQW1GLGFBQUtvQyxNQUFMLENBQVlySSxPQUFaLENBQW9CLFVBQVMwVixLQUFULEVBQWdCO0FBQ2xDNVUsaUJBQU9nRixTQUFTcVUsV0FBVCxDQUFxQnpFLEtBQXJCLENBQVA7QUFDQTVVLGlCQUFPZ0YsU0FBUzRVLFNBQVQsQ0FBbUJoRixLQUFuQixDQUFQO0FBQ0E1VSxpQkFBT2dGLFNBQVMrVSxXQUFULENBQXFCbkYsS0FBckIsQ0FBUDtBQUNELFNBSkQ7QUFLQSxZQUFJbUcsV0FBVyxDQUFmO0FBQ0E1VixhQUFLb0MsTUFBTCxDQUFZckksT0FBWixDQUFvQixVQUFTMFYsS0FBVCxFQUFnQjtBQUNsQyxjQUFJQSxNQUFNbUcsUUFBTixHQUFpQkEsUUFBckIsRUFBK0I7QUFDN0JBLHVCQUFXbkcsTUFBTW1HLFFBQWpCO0FBQ0Q7QUFDRixTQUpEO0FBS0EsWUFBSUEsV0FBVyxDQUFmLEVBQWtCO0FBQ2hCL2EsaUJBQU8sZ0JBQWdCK2EsUUFBaEIsR0FBMkIsTUFBbEM7QUFDRDtBQUNEL2EsZUFBTyxnQkFBUDs7QUFFQW1GLGFBQUtxQyxnQkFBTCxDQUFzQnRJLE9BQXRCLENBQThCLFVBQVM4YixTQUFULEVBQW9CO0FBQ2hEaGIsaUJBQU9nRixTQUFTdVUsV0FBVCxDQUFxQnlCLFNBQXJCLENBQVA7QUFDRCxTQUZEO0FBR0E7QUFDQSxlQUFPaGIsR0FBUDtBQUNELE9BdkNEOztBQXlDQTtBQUNBO0FBQ0FnRixlQUFTb1AsMEJBQVQsR0FBc0MsVUFBUzFCLFlBQVQsRUFBdUI7QUFDM0QsWUFBSXVJLHFCQUFxQixFQUF6QjtBQUNBLFlBQUk1USxjQUFjckYsU0FBUzJOLGtCQUFULENBQTRCRCxZQUE1QixDQUFsQjtBQUNBLFlBQUl3SSxTQUFTN1EsWUFBWTVDLGFBQVosQ0FBMEJQLE9BQTFCLENBQWtDLEtBQWxDLE1BQTZDLENBQUMsQ0FBM0Q7QUFDQSxZQUFJaVUsWUFBWTlRLFlBQVk1QyxhQUFaLENBQTBCUCxPQUExQixDQUFrQyxRQUFsQyxNQUFnRCxDQUFDLENBQWpFOztBQUVBO0FBQ0EsWUFBSWtVLFFBQVFwVyxTQUFTNk4sV0FBVCxDQUFxQkgsWUFBckIsRUFBbUMsU0FBbkMsRUFDWHBELEdBRFcsQ0FDUCxVQUFTa0osSUFBVCxFQUFlO0FBQ2xCLGlCQUFPeFQsU0FBU2dWLGNBQVQsQ0FBd0J4QixJQUF4QixDQUFQO0FBQ0QsU0FIVyxFQUlYN1IsTUFKVyxDQUlKLFVBQVM4UixLQUFULEVBQWdCO0FBQ3RCLGlCQUFPQSxNQUFNMEIsU0FBTixLQUFvQixPQUEzQjtBQUNELFNBTlcsQ0FBWjtBQU9BLFlBQUlrQixjQUFjRCxNQUFNN2IsTUFBTixHQUFlLENBQWYsSUFBb0I2YixNQUFNLENBQU4sRUFBU2hWLElBQS9DO0FBQ0EsWUFBSWtWLGFBQUo7O0FBRUEsWUFBSUMsUUFBUXZXLFNBQVM2TixXQUFULENBQXFCSCxZQUFyQixFQUFtQyxrQkFBbkMsRUFDWHBELEdBRFcsQ0FDUCxVQUFTa0osSUFBVCxFQUFlO0FBQ2xCLGNBQUlDLFFBQVFELEtBQUs5RSxLQUFMLENBQVcsR0FBWCxDQUFaO0FBQ0ErRSxnQkFBTTVJLEtBQU47QUFDQSxpQkFBTzRJLE1BQU1uSixHQUFOLENBQVUsVUFBU29KLElBQVQsRUFBZTtBQUM5QixtQkFBT3JaLFNBQVNxWixJQUFULEVBQWUsRUFBZixDQUFQO0FBQ0QsV0FGTSxDQUFQO0FBR0QsU0FQVyxDQUFaO0FBUUEsWUFBSTZDLE1BQU1oYyxNQUFOLEdBQWUsQ0FBZixJQUFvQmdjLE1BQU0sQ0FBTixFQUFTaGMsTUFBVCxHQUFrQixDQUF0QyxJQUEyQ2djLE1BQU0sQ0FBTixFQUFTLENBQVQsTUFBZ0JGLFdBQS9ELEVBQTRFO0FBQzFFQywwQkFBZ0JDLE1BQU0sQ0FBTixFQUFTLENBQVQsQ0FBaEI7QUFDRDs7QUFFRGxSLG9CQUFZOUMsTUFBWixDQUFtQnJJLE9BQW5CLENBQTJCLFVBQVMwVixLQUFULEVBQWdCO0FBQ3pDLGNBQUlBLE1BQU12WixJQUFOLENBQVc0ZCxXQUFYLE9BQTZCLEtBQTdCLElBQXNDckUsTUFBTXhNLFVBQU4sQ0FBaUJDLEdBQTNELEVBQWdFO0FBQzlELGdCQUFJbVQsV0FBVztBQUNicFYsb0JBQU1pVixXQURPO0FBRWJJLGdDQUFrQnBjLFNBQVN1VixNQUFNeE0sVUFBTixDQUFpQkMsR0FBMUIsRUFBK0IsRUFBL0IsQ0FGTDtBQUdiaEMsbUJBQUs7QUFDSEQsc0JBQU1rVjtBQURIO0FBSFEsYUFBZjtBQU9BTCwrQkFBbUI3YixJQUFuQixDQUF3Qm9jLFFBQXhCO0FBQ0EsZ0JBQUlOLE1BQUosRUFBWTtBQUNWTSx5QkFBVzlZLEtBQUtDLEtBQUwsQ0FBV0QsS0FBS3FCLFNBQUwsQ0FBZXlYLFFBQWYsQ0FBWCxDQUFYO0FBQ0FBLHVCQUFTRSxHQUFULEdBQWU7QUFDYnRWLHNCQUFNa1YsYUFETztBQUViSywyQkFBV1IsWUFBWSxZQUFaLEdBQTJCO0FBRnpCLGVBQWY7QUFJQUYsaUNBQW1CN2IsSUFBbkIsQ0FBd0JvYyxRQUF4QjtBQUNEO0FBQ0Y7QUFDRixTQW5CRDtBQW9CQSxZQUFJUCxtQkFBbUIxYixNQUFuQixLQUE4QixDQUE5QixJQUFtQzhiLFdBQXZDLEVBQW9EO0FBQ2xESiw2QkFBbUI3YixJQUFuQixDQUF3QjtBQUN0QmdILGtCQUFNaVY7QUFEZ0IsV0FBeEI7QUFHRDs7QUFFRDtBQUNBLFlBQUlPLFlBQVk1VyxTQUFTNk4sV0FBVCxDQUFxQkgsWUFBckIsRUFBbUMsSUFBbkMsQ0FBaEI7QUFDQSxZQUFJa0osVUFBVXJjLE1BQWQsRUFBc0I7QUFDcEIsY0FBSXFjLFVBQVUsQ0FBVixFQUFhMVUsT0FBYixDQUFxQixTQUFyQixNQUFvQyxDQUF4QyxFQUEyQztBQUN6QzBVLHdCQUFZdmMsU0FBU3VjLFVBQVUsQ0FBVixFQUFhbkksTUFBYixDQUFvQixDQUFwQixDQUFULEVBQWlDLEVBQWpDLENBQVo7QUFDRCxXQUZELE1BRU8sSUFBSW1JLFVBQVUsQ0FBVixFQUFhMVUsT0FBYixDQUFxQixPQUFyQixNQUFrQyxDQUF0QyxFQUF5QztBQUM5QztBQUNBMFUsd0JBQVl2YyxTQUFTdWMsVUFBVSxDQUFWLEVBQWFuSSxNQUFiLENBQW9CLENBQXBCLENBQVQsRUFBaUMsRUFBakMsSUFBdUMsSUFBdkMsR0FBOEMsSUFBOUMsR0FDTCxLQUFLLEVBQUwsR0FBVSxDQURqQjtBQUVELFdBSk0sTUFJQTtBQUNMbUksd0JBQVlsUixTQUFaO0FBQ0Q7QUFDRHVRLDZCQUFtQi9iLE9BQW5CLENBQTJCLFVBQVM4UyxNQUFULEVBQWlCO0FBQzFDQSxtQkFBTzZKLFVBQVAsR0FBb0JELFNBQXBCO0FBQ0QsV0FGRDtBQUdEO0FBQ0QsZUFBT1gsa0JBQVA7QUFDRCxPQXhFRDs7QUEwRUE7QUFDQWpXLGVBQVNxUCxtQkFBVCxHQUErQixVQUFTM0IsWUFBVCxFQUF1QjtBQUNwRCxZQUFJTCxpQkFBaUIsRUFBckI7O0FBRUEsWUFBSUYsS0FBSjtBQUNBO0FBQ0E7QUFDQSxZQUFJMkosYUFBYTlXLFNBQVM2TixXQUFULENBQXFCSCxZQUFyQixFQUFtQyxTQUFuQyxFQUNacEQsR0FEWSxDQUNSLFVBQVNrSixJQUFULEVBQWU7QUFDbEIsaUJBQU94VCxTQUFTZ1YsY0FBVCxDQUF3QnhCLElBQXhCLENBQVA7QUFDRCxTQUhZLEVBSVo3UixNQUpZLENBSUwsVUFBU29WLEdBQVQsRUFBYztBQUNwQixpQkFBT0EsSUFBSTVCLFNBQUosS0FBa0IsT0FBekI7QUFDRCxTQU5ZLEVBTVYsQ0FOVSxDQUFqQjtBQU9BLFlBQUkyQixVQUFKLEVBQWdCO0FBQ2R6Six5QkFBZUYsS0FBZixHQUF1QjJKLFdBQVcvTCxLQUFsQztBQUNBc0MseUJBQWVqTSxJQUFmLEdBQXNCMFYsV0FBVzFWLElBQWpDO0FBQ0Q7O0FBRUQ7QUFDQTtBQUNBLFlBQUk0VixRQUFRaFgsU0FBUzZOLFdBQVQsQ0FBcUJILFlBQXJCLEVBQW1DLGNBQW5DLENBQVo7QUFDQUwsdUJBQWUyRSxXQUFmLEdBQTZCZ0YsTUFBTXpjLE1BQU4sR0FBZSxDQUE1QztBQUNBOFMsdUJBQWVELFFBQWYsR0FBMEI0SixNQUFNemMsTUFBTixLQUFpQixDQUEzQzs7QUFFQTtBQUNBO0FBQ0EsWUFBSTBjLE1BQU1qWCxTQUFTNk4sV0FBVCxDQUFxQkgsWUFBckIsRUFBbUMsWUFBbkMsQ0FBVjtBQUNBTCx1QkFBZTRKLEdBQWYsR0FBcUJBLElBQUkxYyxNQUFKLEdBQWEsQ0FBbEM7O0FBRUEsZUFBTzhTLGNBQVA7QUFDRCxPQTlCRDs7QUFnQ0E7QUFDQTtBQUNBck4sZUFBU2lQLFNBQVQsR0FBcUIsVUFBU3ZCLFlBQVQsRUFBdUI7QUFDMUMsWUFBSStGLEtBQUo7QUFDQSxZQUFJcmQsT0FBTzRKLFNBQVM2TixXQUFULENBQXFCSCxZQUFyQixFQUFtQyxTQUFuQyxDQUFYO0FBQ0EsWUFBSXRYLEtBQUttRSxNQUFMLEtBQWdCLENBQXBCLEVBQXVCO0FBQ3JCa1osa0JBQVFyZCxLQUFLLENBQUwsRUFBUXFZLE1BQVIsQ0FBZSxDQUFmLEVBQWtCQyxLQUFsQixDQUF3QixHQUF4QixDQUFSO0FBQ0EsaUJBQU8sRUFBQy9XLFFBQVE4YixNQUFNLENBQU4sQ0FBVCxFQUFtQnhTLE9BQU93UyxNQUFNLENBQU4sQ0FBMUIsRUFBUDtBQUNEO0FBQ0QsWUFBSXlELFFBQVFsWCxTQUFTNk4sV0FBVCxDQUFxQkgsWUFBckIsRUFBbUMsU0FBbkMsRUFDWHBELEdBRFcsQ0FDUCxVQUFTa0osSUFBVCxFQUFlO0FBQ2xCLGlCQUFPeFQsU0FBU2dWLGNBQVQsQ0FBd0J4QixJQUF4QixDQUFQO0FBQ0QsU0FIVyxFQUlYN1IsTUFKVyxDQUlKLFVBQVM4UixLQUFULEVBQWdCO0FBQ3RCLGlCQUFPQSxNQUFNMEIsU0FBTixLQUFvQixNQUEzQjtBQUNELFNBTlcsQ0FBWjtBQU9BLFlBQUkrQixNQUFNM2MsTUFBTixHQUFlLENBQW5CLEVBQXNCO0FBQ3BCa1osa0JBQVF5RCxNQUFNLENBQU4sRUFBU25NLEtBQVQsQ0FBZTJELEtBQWYsQ0FBcUIsR0FBckIsQ0FBUjtBQUNBLGlCQUFPLEVBQUMvVyxRQUFROGIsTUFBTSxDQUFOLENBQVQsRUFBbUJ4UyxPQUFPd1MsTUFBTSxDQUFOLENBQTFCLEVBQVA7QUFDRDtBQUNGLE9BbEJEOztBQW9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBelQsZUFBU2lJLGlCQUFULEdBQTZCLFlBQVc7QUFDdEMsZUFBT3ZFLEtBQUsyUCxNQUFMLEdBQWNDLFFBQWQsR0FBeUI3RSxNQUF6QixDQUFnQyxDQUFoQyxFQUFtQyxFQUFuQyxDQUFQO0FBQ0QsT0FGRDs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBek8sZUFBU29SLHVCQUFULEdBQW1DLFVBQVMrRixNQUFULEVBQWlCQyxPQUFqQixFQUEwQjtBQUMzRCxZQUFJQyxTQUFKO0FBQ0EsWUFBSUMsVUFBVUYsWUFBWTFSLFNBQVosR0FBd0IwUixPQUF4QixHQUFrQyxDQUFoRDtBQUNBLFlBQUlELE1BQUosRUFBWTtBQUNWRSxzQkFBWUYsTUFBWjtBQUNELFNBRkQsTUFFTztBQUNMRSxzQkFBWXJYLFNBQVNpSSxpQkFBVCxFQUFaO0FBQ0Q7QUFDRDtBQUNBLGVBQU8sWUFDSCxzQkFERyxHQUNzQm9QLFNBRHRCLEdBQ2tDLEdBRGxDLEdBQ3dDQyxPQUR4QyxHQUNrRCx1QkFEbEQsR0FFSCxTQUZHLEdBR0gsV0FISjtBQUlELE9BYkQ7O0FBZUF0WCxlQUFTQyxpQkFBVCxHQUE2QixVQUFTQyxXQUFULEVBQXNCQyxJQUF0QixFQUE0QjdJLElBQTVCLEVBQWtDSyxNQUFsQyxFQUEwQztBQUNyRSxZQUFJcUQsTUFBTWdGLFNBQVNLLG1CQUFULENBQTZCSCxZQUFZSSxJQUF6QyxFQUErQ0gsSUFBL0MsQ0FBVjs7QUFFQTtBQUNBbkYsZUFBT2dGLFNBQVNPLGtCQUFULENBQ0hMLFlBQVlNLFdBQVosQ0FBd0JDLGtCQUF4QixFQURHLENBQVA7O0FBR0E7QUFDQXpGLGVBQU9nRixTQUFTVSxtQkFBVCxDQUNIUixZQUFZUyxhQUFaLENBQTBCRixrQkFBMUIsRUFERyxFQUVIbkosU0FBUyxPQUFULEdBQW1CLFNBQW5CLEdBQStCLFFBRjVCLENBQVA7O0FBSUEwRCxlQUFPLFdBQVdrRixZQUFZVSxHQUF2QixHQUE2QixNQUFwQzs7QUFFQSxZQUFJVixZQUFZNE8sU0FBaEIsRUFBMkI7QUFDekI5VCxpQkFBTyxPQUFPa0YsWUFBWTRPLFNBQW5CLEdBQStCLE1BQXRDO0FBQ0QsU0FGRCxNQUVPLElBQUk1TyxZQUFZVyxTQUFaLElBQXlCWCxZQUFZWSxXQUF6QyxFQUFzRDtBQUMzRDlGLGlCQUFPLGdCQUFQO0FBQ0QsU0FGTSxNQUVBLElBQUlrRixZQUFZVyxTQUFoQixFQUEyQjtBQUNoQzdGLGlCQUFPLGdCQUFQO0FBQ0QsU0FGTSxNQUVBLElBQUlrRixZQUFZWSxXQUFoQixFQUE2QjtBQUNsQzlGLGlCQUFPLGdCQUFQO0FBQ0QsU0FGTSxNQUVBO0FBQ0xBLGlCQUFPLGdCQUFQO0FBQ0Q7O0FBRUQsWUFBSWtGLFlBQVlXLFNBQWhCLEVBQTJCO0FBQ3pCO0FBQ0EsY0FBSUssT0FBTyxVQUFVdkosT0FBT3dCLEVBQWpCLEdBQXNCLEdBQXRCLEdBQ1ArRyxZQUFZVyxTQUFaLENBQXNCSSxLQUF0QixDQUE0QjlILEVBRHJCLEdBQzBCLE1BRHJDO0FBRUE2QixpQkFBTyxPQUFPa0csSUFBZDs7QUFFQTtBQUNBbEcsaUJBQU8sWUFBWWtGLFlBQVlpQixzQkFBWixDQUFtQyxDQUFuQyxFQUFzQ0MsSUFBbEQsR0FDSCxHQURHLEdBQ0dGLElBRFY7QUFFQSxjQUFJaEIsWUFBWWlCLHNCQUFaLENBQW1DLENBQW5DLEVBQXNDRSxHQUExQyxFQUErQztBQUM3Q3JHLG1CQUFPLFlBQVlrRixZQUFZaUIsc0JBQVosQ0FBbUMsQ0FBbkMsRUFBc0NFLEdBQXRDLENBQTBDRCxJQUF0RCxHQUNILEdBREcsR0FDR0YsSUFEVjtBQUVBbEcsbUJBQU8sc0JBQ0hrRixZQUFZaUIsc0JBQVosQ0FBbUMsQ0FBbkMsRUFBc0NDLElBRG5DLEdBQzBDLEdBRDFDLEdBRUhsQixZQUFZaUIsc0JBQVosQ0FBbUMsQ0FBbkMsRUFBc0NFLEdBQXRDLENBQTBDRCxJQUZ2QyxHQUdILE1BSEo7QUFJRDtBQUNGO0FBQ0Q7QUFDQXBHLGVBQU8sWUFBWWtGLFlBQVlpQixzQkFBWixDQUFtQyxDQUFuQyxFQUFzQ0MsSUFBbEQsR0FDSCxTQURHLEdBQ1NwQixTQUFTc0IsVUFEbEIsR0FDK0IsTUFEdEM7QUFFQSxZQUFJcEIsWUFBWVcsU0FBWixJQUF5QlgsWUFBWWlCLHNCQUFaLENBQW1DLENBQW5DLEVBQXNDRSxHQUFuRSxFQUF3RTtBQUN0RXJHLGlCQUFPLFlBQVlrRixZQUFZaUIsc0JBQVosQ0FBbUMsQ0FBbkMsRUFBc0NFLEdBQXRDLENBQTBDRCxJQUF0RCxHQUNILFNBREcsR0FDU3BCLFNBQVNzQixVQURsQixHQUMrQixNQUR0QztBQUVEO0FBQ0QsZUFBT3RHLEdBQVA7QUFDRCxPQXBERDs7QUFzREE7QUFDQWdGLGVBQVMrTyxZQUFULEdBQXdCLFVBQVNyQixZQUFULEVBQXVCRixXQUF2QixFQUFvQztBQUMxRDtBQUNBLFlBQUltQixRQUFRM08sU0FBUzRPLFVBQVQsQ0FBb0JsQixZQUFwQixDQUFaO0FBQ0EsYUFBSyxJQUFJelEsSUFBSSxDQUFiLEVBQWdCQSxJQUFJMFIsTUFBTXBVLE1BQTFCLEVBQWtDMEMsR0FBbEMsRUFBdUM7QUFDckMsa0JBQVEwUixNQUFNMVIsQ0FBTixDQUFSO0FBQ0UsaUJBQUssWUFBTDtBQUNBLGlCQUFLLFlBQUw7QUFDQSxpQkFBSyxZQUFMO0FBQ0EsaUJBQUssWUFBTDtBQUNFLHFCQUFPMFIsTUFBTTFSLENBQU4sRUFBU3dSLE1BQVQsQ0FBZ0IsQ0FBaEIsQ0FBUDtBQUNGO0FBQ0U7QUFQSjtBQVNEO0FBQ0QsWUFBSWpCLFdBQUosRUFBaUI7QUFDZixpQkFBT3hOLFNBQVMrTyxZQUFULENBQXNCdkIsV0FBdEIsQ0FBUDtBQUNEO0FBQ0QsZUFBTyxVQUFQO0FBQ0QsT0FsQkQ7O0FBb0JBeE4sZUFBUzZPLE9BQVQsR0FBbUIsVUFBU25CLFlBQVQsRUFBdUI7QUFDeEMsWUFBSWlCLFFBQVEzTyxTQUFTNE8sVUFBVCxDQUFvQmxCLFlBQXBCLENBQVo7QUFDQSxZQUFJa0ksUUFBUWpILE1BQU0sQ0FBTixFQUFTRCxLQUFULENBQWUsR0FBZixDQUFaO0FBQ0EsZUFBT2tILE1BQU0sQ0FBTixFQUFTbkgsTUFBVCxDQUFnQixDQUFoQixDQUFQO0FBQ0QsT0FKRDs7QUFNQXpPLGVBQVMrTixVQUFULEdBQXNCLFVBQVNMLFlBQVQsRUFBdUI7QUFDM0MsZUFBT0EsYUFBYWdCLEtBQWIsQ0FBbUIsR0FBbkIsRUFBd0IsQ0FBeEIsRUFBMkIsQ0FBM0IsTUFBa0MsR0FBekM7QUFDRCxPQUZEOztBQUlBMU8sZUFBU3VYLFVBQVQsR0FBc0IsVUFBUzdKLFlBQVQsRUFBdUI7QUFDM0MsWUFBSWlCLFFBQVEzTyxTQUFTNE8sVUFBVCxDQUFvQmxCLFlBQXBCLENBQVo7QUFDQSxZQUFJK0YsUUFBUTlFLE1BQU0sQ0FBTixFQUFTRixNQUFULENBQWdCLENBQWhCLEVBQW1CQyxLQUFuQixDQUF5QixHQUF6QixDQUFaO0FBQ0EsZUFBTztBQUNMcE8sZ0JBQU1tVCxNQUFNLENBQU4sQ0FERDtBQUVMek8sZ0JBQU0zSyxTQUFTb1osTUFBTSxDQUFOLENBQVQsRUFBbUIsRUFBbkIsQ0FGRDtBQUdMdk8sb0JBQVV1TyxNQUFNLENBQU4sQ0FITDtBQUlMK0QsZUFBSy9ELE1BQU1qWixLQUFOLENBQVksQ0FBWixFQUFlNFIsSUFBZixDQUFvQixHQUFwQjtBQUpBLFNBQVA7QUFNRCxPQVREOztBQVdBcE0sZUFBU3lYLFVBQVQsR0FBc0IsVUFBUy9KLFlBQVQsRUFBdUI7QUFDM0MsWUFBSThGLE9BQU94VCxTQUFTNk4sV0FBVCxDQUFxQkgsWUFBckIsRUFBbUMsSUFBbkMsRUFBeUMsQ0FBekMsQ0FBWDtBQUNBLFlBQUkrRixRQUFRRCxLQUFLL0UsTUFBTCxDQUFZLENBQVosRUFBZUMsS0FBZixDQUFxQixHQUFyQixDQUFaO0FBQ0EsZUFBTztBQUNMZ0osb0JBQVVqRSxNQUFNLENBQU4sQ0FETDtBQUVMNEQscUJBQVc1RCxNQUFNLENBQU4sQ0FGTjtBQUdMa0UsMEJBQWdCdGQsU0FBU29aLE1BQU0sQ0FBTixDQUFULEVBQW1CLEVBQW5CLENBSFg7QUFJTG1FLG1CQUFTbkUsTUFBTSxDQUFOLENBSko7QUFLTG9FLHVCQUFhcEUsTUFBTSxDQUFOLENBTFI7QUFNTHFFLG1CQUFTckUsTUFBTSxDQUFOO0FBTkosU0FBUDtBQVFELE9BWEQ7O0FBYUE7QUFDQSxVQUFJLFFBQU92VSxNQUFQLHlDQUFPQSxNQUFQLE9BQWtCLFFBQXRCLEVBQWdDO0FBQzlCQSxlQUFPRCxPQUFQLEdBQWlCZSxRQUFqQjtBQUNEO0FBRUEsS0F0cUJjLEVBc3FCYixFQXRxQmEsQ0F4dkQyeEIsRUE4NUVweUIsR0FBRSxDQUFDLFVBQVNMLE9BQVQsRUFBaUJULE1BQWpCLEVBQXdCRCxPQUF4QixFQUFnQztBQUN6QyxPQUFDLFVBQVU4WSxNQUFWLEVBQWlCO0FBQ2xCOzs7Ozs7O0FBT0M7O0FBRUQ7O0FBRUEsWUFBSUMsaUJBQWlCclksUUFBUSxzQkFBUixDQUFyQjtBQUNBVCxlQUFPRCxPQUFQLEdBQWlCK1ksZUFBZSxFQUFDbGYsUUFBUWlmLE9BQU9qZixNQUFoQixFQUFmLENBQWpCO0FBRUMsT0FmRCxFQWVHaUgsSUFmSCxDQWVRLElBZlIsRUFlYSxPQUFPZ1ksTUFBUCxLQUFrQixXQUFsQixHQUFnQ0EsTUFBaEMsR0FBeUMsT0FBT0UsSUFBUCxLQUFnQixXQUFoQixHQUE4QkEsSUFBOUIsR0FBcUMsT0FBT25mLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0NBLE1BQWhDLEdBQXlDLEVBZnBJO0FBZ0JDLEtBakJPLEVBaUJOLEVBQUMsd0JBQXVCLENBQXhCLEVBakJNLENBOTVFa3lCLEVBKzZFNXdCLEdBQUUsQ0FBQyxVQUFTNkcsT0FBVCxFQUFpQlQsTUFBakIsRUFBd0JELE9BQXhCLEVBQWdDO0FBQ2pFOzs7Ozs7O0FBT0M7O0FBRUQ7O0FBRUEsVUFBSWlaLFFBQVF2WSxRQUFRLFNBQVIsQ0FBWjtBQUNBO0FBQ0FULGFBQU9ELE9BQVAsR0FBaUIsVUFBU2taLFlBQVQsRUFBdUJDLElBQXZCLEVBQTZCO0FBQzVDLFlBQUl0ZixTQUFTcWYsZ0JBQWdCQSxhQUFhcmYsTUFBMUM7O0FBRUEsWUFBSXVmLFVBQVU7QUFDWkMsc0JBQVksSUFEQTtBQUVaQyx1QkFBYSxJQUZEO0FBR1pDLG9CQUFVLElBSEU7QUFJWkMsc0JBQVk7QUFKQSxTQUFkOztBQU9BLGFBQUssSUFBSUMsR0FBVCxJQUFnQk4sSUFBaEIsRUFBc0I7QUFDcEIsY0FBSU8sZUFBZTVZLElBQWYsQ0FBb0JxWSxJQUFwQixFQUEwQk0sR0FBMUIsQ0FBSixFQUFvQztBQUNsQ0wsb0JBQVFLLEdBQVIsSUFBZU4sS0FBS00sR0FBTCxDQUFmO0FBQ0Q7QUFDRjs7QUFFRDtBQUNBLFlBQUlFLFVBQVVWLE1BQU0xZ0IsR0FBcEI7QUFDQSxZQUFJcWhCLGlCQUFpQlgsTUFBTVksYUFBTixDQUFvQmhnQixNQUFwQixDQUFyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBSWlnQixhQUFhcFosUUFBUSxzQkFBUixLQUFtQyxJQUFwRDtBQUNBLFlBQUlxWixXQUFXclosUUFBUSxrQkFBUixLQUErQixJQUE5QztBQUNBLFlBQUlzWixjQUFjdFosUUFBUSx3QkFBUixLQUFxQyxJQUF2RDtBQUNBLFlBQUl1WixhQUFhdlosUUFBUSxzQkFBUixLQUFtQyxJQUFwRDtBQUNBLFlBQUl3WixhQUFheFosUUFBUSxlQUFSLEtBQTRCLElBQTdDOztBQUVBO0FBQ0EsWUFBSXlaLFVBQVU7QUFDWlAsMEJBQWdCQSxjQURKO0FBRVpNLHNCQUFZQSxVQUZBO0FBR1pFLDBCQUFnQm5CLE1BQU1tQixjQUhWO0FBSVpDLHNCQUFZcEIsTUFBTW9CLFVBSk47QUFLWkMsMkJBQWlCckIsTUFBTXFCO0FBTFgsU0FBZDs7QUFRQTtBQUNBLGdCQUFRVixlQUFlVyxPQUF2QjtBQUNFLGVBQUssUUFBTDtBQUNFLGdCQUFJLENBQUNULFVBQUQsSUFBZSxDQUFDQSxXQUFXVSxrQkFBM0IsSUFDQSxDQUFDcEIsUUFBUUMsVUFEYixFQUN5QjtBQUN2Qk0sc0JBQVEsc0RBQVI7QUFDQSxxQkFBT1EsT0FBUDtBQUNEO0FBQ0RSLG9CQUFRLDZCQUFSO0FBQ0E7QUFDQVEsb0JBQVFNLFdBQVIsR0FBc0JYLFVBQXRCO0FBQ0FJLHVCQUFXUSxtQkFBWCxDQUErQjdnQixNQUEvQjs7QUFFQWlnQix1QkFBV2EsZ0JBQVgsQ0FBNEI5Z0IsTUFBNUI7QUFDQWlnQix1QkFBV2MsZUFBWCxDQUEyQi9nQixNQUEzQjtBQUNBaWdCLHVCQUFXZSxnQkFBWCxDQUE0QmhoQixNQUE1QjtBQUNBaWdCLHVCQUFXVSxrQkFBWCxDQUE4QjNnQixNQUE5QjtBQUNBaWdCLHVCQUFXZ0IsV0FBWCxDQUF1QmpoQixNQUF2QjtBQUNBaWdCLHVCQUFXaUIsdUJBQVgsQ0FBbUNsaEIsTUFBbkM7QUFDQWlnQix1QkFBV2tCLHNCQUFYLENBQWtDbmhCLE1BQWxDOztBQUVBcWdCLHVCQUFXZSxtQkFBWCxDQUErQnBoQixNQUEvQjtBQUNBcWdCLHVCQUFXZ0Isa0JBQVgsQ0FBOEJyaEIsTUFBOUI7QUFDQXFnQix1QkFBV2lCLHNCQUFYLENBQWtDdGhCLE1BQWxDO0FBQ0E7QUFDRixlQUFLLFNBQUw7QUFDRSxnQkFBSSxDQUFDbWdCLFdBQUQsSUFBZ0IsQ0FBQ0EsWUFBWVEsa0JBQTdCLElBQ0EsQ0FBQ3BCLFFBQVFFLFdBRGIsRUFDMEI7QUFDeEJLLHNCQUFRLHVEQUFSO0FBQ0EscUJBQU9RLE9BQVA7QUFDRDtBQUNEUixvQkFBUSw4QkFBUjtBQUNBO0FBQ0FRLG9CQUFRTSxXQUFSLEdBQXNCVCxXQUF0QjtBQUNBRSx1QkFBV1EsbUJBQVgsQ0FBK0I3Z0IsTUFBL0I7O0FBRUFtZ0Isd0JBQVlXLGdCQUFaLENBQTZCOWdCLE1BQTdCO0FBQ0FtZ0Isd0JBQVlhLGdCQUFaLENBQTZCaGhCLE1BQTdCO0FBQ0FtZ0Isd0JBQVlRLGtCQUFaLENBQStCM2dCLE1BQS9CO0FBQ0FtZ0Isd0JBQVljLFdBQVosQ0FBd0JqaEIsTUFBeEI7QUFDQW1nQix3QkFBWW9CLGdCQUFaLENBQTZCdmhCLE1BQTdCOztBQUVBcWdCLHVCQUFXZSxtQkFBWCxDQUErQnBoQixNQUEvQjtBQUNBcWdCLHVCQUFXZ0Isa0JBQVgsQ0FBOEJyaEIsTUFBOUI7QUFDQXFnQix1QkFBV2lCLHNCQUFYLENBQWtDdGhCLE1BQWxDO0FBQ0E7QUFDRixlQUFLLE1BQUw7QUFDRSxnQkFBSSxDQUFDa2dCLFFBQUQsSUFBYSxDQUFDQSxTQUFTUyxrQkFBdkIsSUFBNkMsQ0FBQ3BCLFFBQVFHLFFBQTFELEVBQW9FO0FBQ2xFSSxzQkFBUSx1REFBUjtBQUNBLHFCQUFPUSxPQUFQO0FBQ0Q7QUFDRFIsb0JBQVEsMkJBQVI7QUFDQTtBQUNBUSxvQkFBUU0sV0FBUixHQUFzQlYsUUFBdEI7QUFDQUcsdUJBQVdRLG1CQUFYLENBQStCN2dCLE1BQS9COztBQUVBa2dCLHFCQUFTWSxnQkFBVCxDQUEwQjlnQixNQUExQjtBQUNBa2dCLHFCQUFTUyxrQkFBVCxDQUE0QjNnQixNQUE1QjtBQUNBa2dCLHFCQUFTc0IsZ0JBQVQsQ0FBMEJ4aEIsTUFBMUI7O0FBRUE7O0FBRUFxZ0IsdUJBQVdnQixrQkFBWCxDQUE4QnJoQixNQUE5QjtBQUNBcWdCLHVCQUFXaUIsc0JBQVgsQ0FBa0N0aEIsTUFBbEM7QUFDQTtBQUNGLGVBQUssUUFBTDtBQUNFLGdCQUFJLENBQUNvZ0IsVUFBRCxJQUFlLENBQUNiLFFBQVFJLFVBQTVCLEVBQXdDO0FBQ3RDRyxzQkFBUSxzREFBUjtBQUNBLHFCQUFPUSxPQUFQO0FBQ0Q7QUFDRFIsb0JBQVEsNkJBQVI7QUFDQTtBQUNBUSxvQkFBUU0sV0FBUixHQUFzQlIsVUFBdEI7QUFDQUMsdUJBQVdRLG1CQUFYLENBQStCN2dCLE1BQS9COztBQUVBb2dCLHVCQUFXcUIsb0JBQVgsQ0FBZ0N6aEIsTUFBaEM7QUFDQW9nQix1QkFBV3NCLGdCQUFYLENBQTRCMWhCLE1BQTVCO0FBQ0FvZ0IsdUJBQVd1QixtQkFBWCxDQUErQjNoQixNQUEvQjtBQUNBb2dCLHVCQUFXd0Isb0JBQVgsQ0FBZ0M1aEIsTUFBaEM7QUFDQW9nQix1QkFBV3lCLHlCQUFYLENBQXFDN2hCLE1BQXJDO0FBQ0FvZ0IsdUJBQVdVLGdCQUFYLENBQTRCOWdCLE1BQTVCO0FBQ0FvZ0IsdUJBQVcwQixxQkFBWCxDQUFpQzloQixNQUFqQzs7QUFFQXFnQix1QkFBV2UsbUJBQVgsQ0FBK0JwaEIsTUFBL0I7QUFDQXFnQix1QkFBV2dCLGtCQUFYLENBQThCcmhCLE1BQTlCO0FBQ0FxZ0IsdUJBQVdpQixzQkFBWCxDQUFrQ3RoQixNQUFsQztBQUNBO0FBQ0Y7QUFDRThmLG9CQUFRLHNCQUFSO0FBQ0E7QUF4Rko7O0FBMkZBLGVBQU9RLE9BQVA7QUFDRCxPQXZJRDtBQXlJQyxLQXZKK0IsRUF1SjlCLEVBQUMsd0JBQXVCLENBQXhCLEVBQTBCLGlCQUFnQixDQUExQyxFQUE0QyxvQkFBbUIsQ0FBL0QsRUFBaUUsMEJBQXlCLEVBQTFGLEVBQTZGLHdCQUF1QixFQUFwSCxFQUF1SCxXQUFVLEVBQWpJLEVBdko4QixDQS82RTB3QixFQXNrRmxxQixHQUFFLENBQUMsVUFBU3paLE9BQVQsRUFBaUJULE1BQWpCLEVBQXdCRCxPQUF4QixFQUFnQzs7QUFFM0s7Ozs7Ozs7QUFPQztBQUNEOztBQUNBLFVBQUlpWixRQUFRdlksUUFBUSxhQUFSLENBQVo7QUFDQSxVQUFJaVosVUFBVVYsTUFBTTFnQixHQUFwQjs7QUFFQTBILGFBQU9ELE9BQVAsR0FBaUI7QUFDZjJhLDBCQUFrQmphLFFBQVEsZ0JBQVIsQ0FESDtBQUVma2EseUJBQWlCLHlCQUFTL2dCLE1BQVQsRUFBaUI7QUFDaENBLGlCQUFPZ1gsV0FBUCxHQUFxQmhYLE9BQU9nWCxXQUFQLElBQXNCaFgsT0FBTytoQixpQkFBbEQ7QUFDRCxTQUpjOztBQU1mZCxxQkFBYSxxQkFBU2poQixNQUFULEVBQWlCO0FBQzVCLGNBQUksUUFBT0EsTUFBUCx5Q0FBT0EsTUFBUCxPQUFrQixRQUFsQixJQUE4QkEsT0FBT3FDLGlCQUFyQyxJQUEwRCxFQUFFLGFBQzVEckMsT0FBT3FDLGlCQUFQLENBQXlCa04sU0FEaUMsQ0FBOUQsRUFDeUM7QUFDdkMxSixtQkFBT21NLGNBQVAsQ0FBc0JoUyxPQUFPcUMsaUJBQVAsQ0FBeUJrTixTQUEvQyxFQUEwRCxTQUExRCxFQUFxRTtBQUNuRTBILG1CQUFLLGVBQVc7QUFDZCx1QkFBTyxLQUFLK0ssUUFBWjtBQUNELGVBSGtFO0FBSW5FOUgsbUJBQUssYUFBU2hVLENBQVQsRUFBWTtBQUNmLG9CQUFJLEtBQUs4YixRQUFULEVBQW1CO0FBQ2pCLHVCQUFLeFAsbUJBQUwsQ0FBeUIsT0FBekIsRUFBa0MsS0FBS3dQLFFBQXZDO0FBQ0Q7QUFDRCxxQkFBSzVRLGdCQUFMLENBQXNCLE9BQXRCLEVBQStCLEtBQUs0USxRQUFMLEdBQWdCOWIsQ0FBL0M7QUFDRDtBQVRrRSxhQUFyRTtBQVdBLGdCQUFJK2IsMkJBQ0FqaUIsT0FBT3FDLGlCQUFQLENBQXlCa04sU0FBekIsQ0FBbUNqTixvQkFEdkM7QUFFQXRDLG1CQUFPcUMsaUJBQVAsQ0FBeUJrTixTQUF6QixDQUFtQ2pOLG9CQUFuQyxHQUEwRCxZQUFXO0FBQ25FLGtCQUFJK0ssS0FBSyxJQUFUO0FBQ0Esa0JBQUksQ0FBQ0EsR0FBRzZVLFlBQVIsRUFBc0I7QUFDcEI3VSxtQkFBRzZVLFlBQUgsR0FBa0IsVUFBUzNlLENBQVQsRUFBWTtBQUM1QjtBQUNBO0FBQ0FBLG9CQUFFMUUsTUFBRixDQUFTdVMsZ0JBQVQsQ0FBMEIsVUFBMUIsRUFBc0MsVUFBUytRLEVBQVQsRUFBYTtBQUNqRCx3QkFBSTdVLFFBQUo7QUFDQSx3QkFBSXROLE9BQU9xQyxpQkFBUCxDQUF5QmtOLFNBQXpCLENBQW1DcUMsWUFBdkMsRUFBcUQ7QUFDbkR0RSxpQ0FBV0QsR0FBR3VFLFlBQUgsR0FBa0I5RixJQUFsQixDQUF1QixVQUFTdEYsQ0FBVCxFQUFZO0FBQzVDLCtCQUFPQSxFQUFFMkIsS0FBRixJQUFXM0IsRUFBRTJCLEtBQUYsQ0FBUTlILEVBQVIsS0FBZThoQixHQUFHaGEsS0FBSCxDQUFTOUgsRUFBMUM7QUFDRCx1QkFGVSxDQUFYO0FBR0QscUJBSkQsTUFJTztBQUNMaU4saUNBQVcsRUFBQ25GLE9BQU9nYSxHQUFHaGEsS0FBWCxFQUFYO0FBQ0Q7O0FBRUQsd0JBQUlqSSxRQUFRLElBQUlzTixLQUFKLENBQVUsT0FBVixDQUFaO0FBQ0F0TiwwQkFBTWlJLEtBQU4sR0FBY2dhLEdBQUdoYSxLQUFqQjtBQUNBakksMEJBQU1vTixRQUFOLEdBQWlCQSxRQUFqQjtBQUNBcE4sMEJBQU1rSCxXQUFOLEdBQW9CLEVBQUNrRyxVQUFVQSxRQUFYLEVBQXBCO0FBQ0FwTiwwQkFBTXdELE9BQU4sR0FBZ0IsQ0FBQ0gsRUFBRTFFLE1BQUgsQ0FBaEI7QUFDQXdPLHVCQUFHTCxhQUFILENBQWlCOU0sS0FBakI7QUFDRCxtQkFoQkQ7QUFpQkFxRCxvQkFBRTFFLE1BQUYsQ0FBU2tTLFNBQVQsR0FBcUIzUCxPQUFyQixDQUE2QixVQUFTK0csS0FBVCxFQUFnQjtBQUMzQyx3QkFBSW1GLFFBQUo7QUFDQSx3QkFBSXROLE9BQU9xQyxpQkFBUCxDQUF5QmtOLFNBQXpCLENBQW1DcUMsWUFBdkMsRUFBcUQ7QUFDbkR0RSxpQ0FBV0QsR0FBR3VFLFlBQUgsR0FBa0I5RixJQUFsQixDQUF1QixVQUFTdEYsQ0FBVCxFQUFZO0FBQzVDLCtCQUFPQSxFQUFFMkIsS0FBRixJQUFXM0IsRUFBRTJCLEtBQUYsQ0FBUTlILEVBQVIsS0FBZThILE1BQU05SCxFQUF2QztBQUNELHVCQUZVLENBQVg7QUFHRCxxQkFKRCxNQUlPO0FBQ0xpTixpQ0FBVyxFQUFDbkYsT0FBT0EsS0FBUixFQUFYO0FBQ0Q7QUFDRCx3QkFBSWpJLFFBQVEsSUFBSXNOLEtBQUosQ0FBVSxPQUFWLENBQVo7QUFDQXROLDBCQUFNaUksS0FBTixHQUFjQSxLQUFkO0FBQ0FqSSwwQkFBTW9OLFFBQU4sR0FBaUJBLFFBQWpCO0FBQ0FwTiwwQkFBTWtILFdBQU4sR0FBb0IsRUFBQ2tHLFVBQVVBLFFBQVgsRUFBcEI7QUFDQXBOLDBCQUFNd0QsT0FBTixHQUFnQixDQUFDSCxFQUFFMUUsTUFBSCxDQUFoQjtBQUNBd08sdUJBQUdMLGFBQUgsQ0FBaUI5TSxLQUFqQjtBQUNELG1CQWZEO0FBZ0JELGlCQXBDRDtBQXFDQW1OLG1CQUFHK0QsZ0JBQUgsQ0FBb0IsV0FBcEIsRUFBaUMvRCxHQUFHNlUsWUFBcEM7QUFDRDtBQUNELHFCQUFPRCx5QkFBeUIzSCxLQUF6QixDQUErQmpOLEVBQS9CLEVBQW1DNEssU0FBbkMsQ0FBUDtBQUNELGFBM0NEO0FBNENELFdBM0RELE1BMkRPLElBQUksRUFBRSx1QkFBdUJqWSxNQUF6QixDQUFKLEVBQXNDO0FBQzNDb2Ysa0JBQU1nRCx1QkFBTixDQUE4QnBpQixNQUE5QixFQUFzQyxPQUF0QyxFQUErQyxVQUFTdUQsQ0FBVCxFQUFZO0FBQ3pELGtCQUFJLENBQUNBLEVBQUU2RCxXQUFQLEVBQW9CO0FBQ2xCN0Qsa0JBQUU2RCxXQUFGLEdBQWdCLEVBQUNrRyxVQUFVL0osRUFBRStKLFFBQWIsRUFBaEI7QUFDRDtBQUNELHFCQUFPL0osQ0FBUDtBQUNELGFBTEQ7QUFNRDtBQUNGLFNBMUVjOztBQTRFZjRkLGdDQUF3QixnQ0FBU25oQixNQUFULEVBQWlCO0FBQ3ZDO0FBQ0EsY0FBSSxRQUFPQSxNQUFQLHlDQUFPQSxNQUFQLE9BQWtCLFFBQWxCLElBQThCQSxPQUFPcUMsaUJBQXJDLElBQ0EsRUFBRSxnQkFBZ0JyQyxPQUFPcUMsaUJBQVAsQ0FBeUJrTixTQUEzQyxDQURBLElBRUEsc0JBQXNCdlAsT0FBT3FDLGlCQUFQLENBQXlCa04sU0FGbkQsRUFFOEQ7QUFDNUQsZ0JBQUk4UyxxQkFBcUIsU0FBckJBLGtCQUFxQixDQUFTaFYsRUFBVCxFQUFhbEYsS0FBYixFQUFvQjtBQUMzQyxxQkFBTztBQUNMQSx1QkFBT0EsS0FERjtBQUVMLG9CQUFJbWEsSUFBSixHQUFXO0FBQ1Qsc0JBQUksS0FBS0MsS0FBTCxLQUFlM1YsU0FBbkIsRUFBOEI7QUFDNUIsd0JBQUl6RSxNQUFNWCxJQUFOLEtBQWUsT0FBbkIsRUFBNEI7QUFDMUIsMkJBQUsrYSxLQUFMLEdBQWFsVixHQUFHbVYsZ0JBQUgsQ0FBb0JyYSxLQUFwQixDQUFiO0FBQ0QscUJBRkQsTUFFTztBQUNMLDJCQUFLb2EsS0FBTCxHQUFhLElBQWI7QUFDRDtBQUNGO0FBQ0QseUJBQU8sS0FBS0EsS0FBWjtBQUNELGlCQVhJO0FBWUxFLHFCQUFLcFY7QUFaQSxlQUFQO0FBY0QsYUFmRDs7QUFpQkE7QUFDQSxnQkFBSSxDQUFDck4sT0FBT3FDLGlCQUFQLENBQXlCa04sU0FBekIsQ0FBbUNvQyxVQUF4QyxFQUFvRDtBQUNsRDNSLHFCQUFPcUMsaUJBQVAsQ0FBeUJrTixTQUF6QixDQUFtQ29DLFVBQW5DLEdBQWdELFlBQVc7QUFDekQscUJBQUsrUSxRQUFMLEdBQWdCLEtBQUtBLFFBQUwsSUFBaUIsRUFBakM7QUFDQSx1QkFBTyxLQUFLQSxRQUFMLENBQWNoaEIsS0FBZCxFQUFQLENBRnlELENBRTNCO0FBQy9CLGVBSEQ7QUFJQSxrQkFBSWloQixlQUFlM2lCLE9BQU9xQyxpQkFBUCxDQUF5QmtOLFNBQXpCLENBQW1DeEMsUUFBdEQ7QUFDQS9NLHFCQUFPcUMsaUJBQVAsQ0FBeUJrTixTQUF6QixDQUFtQ3hDLFFBQW5DLEdBQThDLFVBQVM1RSxLQUFULEVBQWdCdEosTUFBaEIsRUFBd0I7QUFDcEUsb0JBQUl3TyxLQUFLLElBQVQ7QUFDQSxvQkFBSWlFLFNBQVNxUixhQUFhckksS0FBYixDQUFtQmpOLEVBQW5CLEVBQXVCNEssU0FBdkIsQ0FBYjtBQUNBLG9CQUFJLENBQUMzRyxNQUFMLEVBQWE7QUFDWEEsMkJBQVMrUSxtQkFBbUJoVixFQUFuQixFQUF1QmxGLEtBQXZCLENBQVQ7QUFDQWtGLHFCQUFHcVYsUUFBSCxDQUFZcGhCLElBQVosQ0FBaUJnUSxNQUFqQjtBQUNEO0FBQ0QsdUJBQU9BLE1BQVA7QUFDRCxlQVJEOztBQVVBLGtCQUFJc1Isa0JBQWtCNWlCLE9BQU9xQyxpQkFBUCxDQUF5QmtOLFNBQXpCLENBQW1DcEMsV0FBekQ7QUFDQW5OLHFCQUFPcUMsaUJBQVAsQ0FBeUJrTixTQUF6QixDQUFtQ3BDLFdBQW5DLEdBQWlELFVBQVNtRSxNQUFULEVBQWlCO0FBQ2hFLG9CQUFJakUsS0FBSyxJQUFUO0FBQ0F1VixnQ0FBZ0J0SSxLQUFoQixDQUFzQmpOLEVBQXRCLEVBQTBCNEssU0FBMUI7QUFDQSxvQkFBSS9HLE1BQU03RCxHQUFHcVYsUUFBSCxDQUFZdFosT0FBWixDQUFvQmtJLE1BQXBCLENBQVY7QUFDQSxvQkFBSUosUUFBUSxDQUFDLENBQWIsRUFBZ0I7QUFDZDdELHFCQUFHcVYsUUFBSCxDQUFZalIsTUFBWixDQUFtQlAsR0FBbkIsRUFBd0IsQ0FBeEI7QUFDRDtBQUNGLGVBUEQ7QUFRRDtBQUNELGdCQUFJMlIsZ0JBQWdCN2lCLE9BQU9xQyxpQkFBUCxDQUF5QmtOLFNBQXpCLENBQW1DekwsU0FBdkQ7QUFDQTlELG1CQUFPcUMsaUJBQVAsQ0FBeUJrTixTQUF6QixDQUFtQ3pMLFNBQW5DLEdBQStDLFVBQVNqRixNQUFULEVBQWlCO0FBQzlELGtCQUFJd08sS0FBSyxJQUFUO0FBQ0FBLGlCQUFHcVYsUUFBSCxHQUFjclYsR0FBR3FWLFFBQUgsSUFBZSxFQUE3QjtBQUNBRyw0QkFBY3ZJLEtBQWQsQ0FBb0JqTixFQUFwQixFQUF3QixDQUFDeE8sTUFBRCxDQUF4QjtBQUNBQSxxQkFBT2tTLFNBQVAsR0FBbUIzUCxPQUFuQixDQUEyQixVQUFTK0csS0FBVCxFQUFnQjtBQUN6Q2tGLG1CQUFHcVYsUUFBSCxDQUFZcGhCLElBQVosQ0FBaUIrZ0IsbUJBQW1CaFYsRUFBbkIsRUFBdUJsRixLQUF2QixDQUFqQjtBQUNELGVBRkQ7QUFHRCxhQVBEOztBQVNBLGdCQUFJMmEsbUJBQW1COWlCLE9BQU9xQyxpQkFBUCxDQUF5QmtOLFNBQXpCLENBQW1DbUMsWUFBMUQ7QUFDQTFSLG1CQUFPcUMsaUJBQVAsQ0FBeUJrTixTQUF6QixDQUFtQ21DLFlBQW5DLEdBQWtELFVBQVM3UyxNQUFULEVBQWlCO0FBQ2pFLGtCQUFJd08sS0FBSyxJQUFUO0FBQ0FBLGlCQUFHcVYsUUFBSCxHQUFjclYsR0FBR3FWLFFBQUgsSUFBZSxFQUE3QjtBQUNBSSwrQkFBaUJ4SSxLQUFqQixDQUF1QmpOLEVBQXZCLEVBQTJCLENBQUN4TyxNQUFELENBQTNCOztBQUVBQSxxQkFBT2tTLFNBQVAsR0FBbUIzUCxPQUFuQixDQUEyQixVQUFTK0csS0FBVCxFQUFnQjtBQUN6QyxvQkFBSW1KLFNBQVNqRSxHQUFHcVYsUUFBSCxDQUFZNVcsSUFBWixDQUFpQixVQUFTckYsQ0FBVCxFQUFZO0FBQ3hDLHlCQUFPQSxFQUFFMEIsS0FBRixLQUFZQSxLQUFuQjtBQUNELGlCQUZZLENBQWI7QUFHQSxvQkFBSW1KLE1BQUosRUFBWTtBQUNWakUscUJBQUdxVixRQUFILENBQVlqUixNQUFaLENBQW1CcEUsR0FBR3FWLFFBQUgsQ0FBWXRaLE9BQVosQ0FBb0JrSSxNQUFwQixDQUFuQixFQUFnRCxDQUFoRCxFQURVLENBQzBDO0FBQ3JEO0FBQ0YsZUFQRDtBQVFELGFBYkQ7QUFjRCxXQXhFRCxNQXdFTyxJQUFJLFFBQU90UixNQUFQLHlDQUFPQSxNQUFQLE9BQWtCLFFBQWxCLElBQThCQSxPQUFPcUMsaUJBQXJDLElBQ0EsZ0JBQWdCckMsT0FBT3FDLGlCQUFQLENBQXlCa04sU0FEekMsSUFFQSxzQkFBc0J2UCxPQUFPcUMsaUJBQVAsQ0FBeUJrTixTQUYvQyxJQUdBdlAsT0FBTzhRLFlBSFAsSUFJQSxFQUFFLFVBQVU5USxPQUFPOFEsWUFBUCxDQUFvQnZCLFNBQWhDLENBSkosRUFJZ0Q7QUFDckQsZ0JBQUl3VCxpQkFBaUIvaUIsT0FBT3FDLGlCQUFQLENBQXlCa04sU0FBekIsQ0FBbUNvQyxVQUF4RDtBQUNBM1IsbUJBQU9xQyxpQkFBUCxDQUF5QmtOLFNBQXpCLENBQW1Db0MsVUFBbkMsR0FBZ0QsWUFBVztBQUN6RCxrQkFBSXRFLEtBQUssSUFBVDtBQUNBLGtCQUFJMlYsVUFBVUQsZUFBZXpJLEtBQWYsQ0FBcUJqTixFQUFyQixFQUF5QixFQUF6QixDQUFkO0FBQ0EyVixzQkFBUTVoQixPQUFSLENBQWdCLFVBQVNrUSxNQUFULEVBQWlCO0FBQy9CQSx1QkFBT21SLEdBQVAsR0FBYXBWLEVBQWI7QUFDRCxlQUZEO0FBR0EscUJBQU8yVixPQUFQO0FBQ0QsYUFQRDs7QUFTQW5kLG1CQUFPbU0sY0FBUCxDQUFzQmhTLE9BQU84USxZQUFQLENBQW9CdkIsU0FBMUMsRUFBcUQsTUFBckQsRUFBNkQ7QUFDM0QwSCxtQkFBSyxlQUFXO0FBQ2Qsb0JBQUksS0FBS3NMLEtBQUwsS0FBZTNWLFNBQW5CLEVBQThCO0FBQzVCLHNCQUFJLEtBQUt6RSxLQUFMLENBQVdYLElBQVgsS0FBb0IsT0FBeEIsRUFBaUM7QUFDL0IseUJBQUsrYSxLQUFMLEdBQWEsS0FBS0UsR0FBTCxDQUFTRCxnQkFBVCxDQUEwQixLQUFLcmEsS0FBL0IsQ0FBYjtBQUNELG1CQUZELE1BRU87QUFDTCx5QkFBS29hLEtBQUwsR0FBYSxJQUFiO0FBQ0Q7QUFDRjtBQUNELHVCQUFPLEtBQUtBLEtBQVo7QUFDRDtBQVYwRCxhQUE3RDtBQVlEO0FBQ0YsU0FsTGM7O0FBb0xmdkIsMEJBQWtCLDBCQUFTaGhCLE1BQVQsRUFBaUI7QUFDakMsY0FBSWlqQixNQUFNampCLFVBQVVBLE9BQU9pakIsR0FBM0I7O0FBRUEsY0FBSSxRQUFPampCLE1BQVAseUNBQU9BLE1BQVAsT0FBa0IsUUFBdEIsRUFBZ0M7QUFDOUIsZ0JBQUlBLE9BQU9rakIsZ0JBQVAsSUFDRixFQUFFLGVBQWVsakIsT0FBT2tqQixnQkFBUCxDQUF3QjNULFNBQXpDLENBREYsRUFDdUQ7QUFDckQ7QUFDQTFKLHFCQUFPbU0sY0FBUCxDQUFzQmhTLE9BQU9rakIsZ0JBQVAsQ0FBd0IzVCxTQUE5QyxFQUF5RCxXQUF6RCxFQUFzRTtBQUNwRTBILHFCQUFLLGVBQVc7QUFDZCx5QkFBTyxLQUFLa00sVUFBWjtBQUNELGlCQUhtRTtBQUlwRWpKLHFCQUFLLGFBQVNyYixNQUFULEVBQWlCO0FBQ3BCLHNCQUFJc2dCLE9BQU8sSUFBWDtBQUNBO0FBQ0EsdUJBQUtnRSxVQUFMLEdBQWtCdGtCLE1BQWxCO0FBQ0Esc0JBQUksS0FBS3VrQixHQUFULEVBQWM7QUFDWkgsd0JBQUlJLGVBQUosQ0FBb0IsS0FBS0QsR0FBekI7QUFDRDs7QUFFRCxzQkFBSSxDQUFDdmtCLE1BQUwsRUFBYTtBQUNYLHlCQUFLdWtCLEdBQUwsR0FBVyxFQUFYO0FBQ0EsMkJBQU94VyxTQUFQO0FBQ0Q7QUFDRCx1QkFBS3dXLEdBQUwsR0FBV0gsSUFBSUssZUFBSixDQUFvQnprQixNQUFwQixDQUFYO0FBQ0E7QUFDQTtBQUNBQSx5QkFBT3VTLGdCQUFQLENBQXdCLFVBQXhCLEVBQW9DLFlBQVc7QUFDN0Msd0JBQUkrTixLQUFLaUUsR0FBVCxFQUFjO0FBQ1pILDBCQUFJSSxlQUFKLENBQW9CbEUsS0FBS2lFLEdBQXpCO0FBQ0Q7QUFDRGpFLHlCQUFLaUUsR0FBTCxHQUFXSCxJQUFJSyxlQUFKLENBQW9CemtCLE1BQXBCLENBQVg7QUFDRCxtQkFMRDtBQU1BQSx5QkFBT3VTLGdCQUFQLENBQXdCLGFBQXhCLEVBQXVDLFlBQVc7QUFDaEQsd0JBQUkrTixLQUFLaUUsR0FBVCxFQUFjO0FBQ1pILDBCQUFJSSxlQUFKLENBQW9CbEUsS0FBS2lFLEdBQXpCO0FBQ0Q7QUFDRGpFLHlCQUFLaUUsR0FBTCxHQUFXSCxJQUFJSyxlQUFKLENBQW9CemtCLE1BQXBCLENBQVg7QUFDRCxtQkFMRDtBQU1EO0FBL0JtRSxlQUF0RTtBQWlDRDtBQUNGO0FBQ0YsU0E5TmM7O0FBZ09mMGtCLDJDQUFtQywyQ0FBU3ZqQixNQUFULEVBQWlCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBQSxpQkFBT3FDLGlCQUFQLENBQXlCa04sU0FBekIsQ0FBbUNXLGVBQW5DLEdBQXFELFlBQVc7QUFDOUQsZ0JBQUk3QyxLQUFLLElBQVQ7QUFDQSxpQkFBS21XLG9CQUFMLEdBQTRCLEtBQUtBLG9CQUFMLElBQTZCLEVBQXpEO0FBQ0EsbUJBQU8zZCxPQUFPQyxJQUFQLENBQVksS0FBSzBkLG9CQUFqQixFQUF1Q2hTLEdBQXZDLENBQTJDLFVBQVNpUyxRQUFULEVBQW1CO0FBQ25FLHFCQUFPcFcsR0FBR21XLG9CQUFILENBQXdCQyxRQUF4QixFQUFrQyxDQUFsQyxDQUFQO0FBQ0QsYUFGTSxDQUFQO0FBR0QsV0FORDs7QUFRQSxjQUFJZCxlQUFlM2lCLE9BQU9xQyxpQkFBUCxDQUF5QmtOLFNBQXpCLENBQW1DeEMsUUFBdEQ7QUFDQS9NLGlCQUFPcUMsaUJBQVAsQ0FBeUJrTixTQUF6QixDQUFtQ3hDLFFBQW5DLEdBQThDLFVBQVM1RSxLQUFULEVBQWdCdEosTUFBaEIsRUFBd0I7QUFDcEUsZ0JBQUksQ0FBQ0EsTUFBTCxFQUFhO0FBQ1gscUJBQU84akIsYUFBYXJJLEtBQWIsQ0FBbUIsSUFBbkIsRUFBeUJyQyxTQUF6QixDQUFQO0FBQ0Q7QUFDRCxpQkFBS3VMLG9CQUFMLEdBQTRCLEtBQUtBLG9CQUFMLElBQTZCLEVBQXpEOztBQUVBLGdCQUFJbFMsU0FBU3FSLGFBQWFySSxLQUFiLENBQW1CLElBQW5CLEVBQXlCckMsU0FBekIsQ0FBYjtBQUNBLGdCQUFJLENBQUMsS0FBS3VMLG9CQUFMLENBQTBCM2tCLE9BQU93QixFQUFqQyxDQUFMLEVBQTJDO0FBQ3pDLG1CQUFLbWpCLG9CQUFMLENBQTBCM2tCLE9BQU93QixFQUFqQyxJQUF1QyxDQUFDeEIsTUFBRCxFQUFTeVMsTUFBVCxDQUF2QztBQUNELGFBRkQsTUFFTyxJQUFJLEtBQUtrUyxvQkFBTCxDQUEwQjNrQixPQUFPd0IsRUFBakMsRUFBcUMrSSxPQUFyQyxDQUE2Q2tJLE1BQTdDLE1BQXlELENBQUMsQ0FBOUQsRUFBaUU7QUFDdEUsbUJBQUtrUyxvQkFBTCxDQUEwQjNrQixPQUFPd0IsRUFBakMsRUFBcUNpQixJQUFyQyxDQUEwQ2dRLE1BQTFDO0FBQ0Q7QUFDRCxtQkFBT0EsTUFBUDtBQUNELFdBYkQ7O0FBZUEsY0FBSXVSLGdCQUFnQjdpQixPQUFPcUMsaUJBQVAsQ0FBeUJrTixTQUF6QixDQUFtQ3pMLFNBQXZEO0FBQ0E5RCxpQkFBT3FDLGlCQUFQLENBQXlCa04sU0FBekIsQ0FBbUN6TCxTQUFuQyxHQUErQyxVQUFTakYsTUFBVCxFQUFpQjtBQUM5RCxnQkFBSXdPLEtBQUssSUFBVDtBQUNBLGlCQUFLbVcsb0JBQUwsR0FBNEIsS0FBS0Esb0JBQUwsSUFBNkIsRUFBekQ7O0FBRUEza0IsbUJBQU9rUyxTQUFQLEdBQW1CM1AsT0FBbkIsQ0FBMkIsVUFBUytHLEtBQVQsRUFBZ0I7QUFDekMsa0JBQUl5SSxnQkFBZ0J2RCxHQUFHc0UsVUFBSCxHQUFnQjdGLElBQWhCLENBQXFCLFVBQVNyRixDQUFULEVBQVk7QUFDbkQsdUJBQU9BLEVBQUUwQixLQUFGLEtBQVlBLEtBQW5CO0FBQ0QsZUFGbUIsQ0FBcEI7QUFHQSxrQkFBSXlJLGFBQUosRUFBbUI7QUFDakIsc0JBQU0sSUFBSThTLFlBQUosQ0FBaUIsdUJBQWpCLEVBQ0Ysb0JBREUsQ0FBTjtBQUVEO0FBQ0YsYUFSRDtBQVNBLGdCQUFJQyxrQkFBa0J0VyxHQUFHc0UsVUFBSCxFQUF0QjtBQUNBa1IsMEJBQWN2SSxLQUFkLENBQW9CLElBQXBCLEVBQTBCckMsU0FBMUI7QUFDQSxnQkFBSTJMLGFBQWF2VyxHQUFHc0UsVUFBSCxHQUFnQjlJLE1BQWhCLENBQXVCLFVBQVNnYixTQUFULEVBQW9CO0FBQzFELHFCQUFPRixnQkFBZ0J2YSxPQUFoQixDQUF3QnlhLFNBQXhCLE1BQXVDLENBQUMsQ0FBL0M7QUFDRCxhQUZnQixDQUFqQjtBQUdBLGlCQUFLTCxvQkFBTCxDQUEwQjNrQixPQUFPd0IsRUFBakMsSUFBdUMsQ0FBQ3hCLE1BQUQsRUFBUzhkLE1BQVQsQ0FBZ0JpSCxVQUFoQixDQUF2QztBQUNELFdBbkJEOztBQXFCQSxjQUFJZCxtQkFBbUI5aUIsT0FBT3FDLGlCQUFQLENBQXlCa04sU0FBekIsQ0FBbUNtQyxZQUExRDtBQUNBMVIsaUJBQU9xQyxpQkFBUCxDQUF5QmtOLFNBQXpCLENBQW1DbUMsWUFBbkMsR0FBa0QsVUFBUzdTLE1BQVQsRUFBaUI7QUFDakUsaUJBQUsya0Isb0JBQUwsR0FBNEIsS0FBS0Esb0JBQUwsSUFBNkIsRUFBekQ7QUFDQSxtQkFBTyxLQUFLQSxvQkFBTCxDQUEwQjNrQixPQUFPd0IsRUFBakMsQ0FBUDtBQUNBLG1CQUFPeWlCLGlCQUFpQnhJLEtBQWpCLENBQXVCLElBQXZCLEVBQTZCckMsU0FBN0IsQ0FBUDtBQUNELFdBSkQ7O0FBTUEsY0FBSTJLLGtCQUFrQjVpQixPQUFPcUMsaUJBQVAsQ0FBeUJrTixTQUF6QixDQUFtQ3BDLFdBQXpEO0FBQ0FuTixpQkFBT3FDLGlCQUFQLENBQXlCa04sU0FBekIsQ0FBbUNwQyxXQUFuQyxHQUFpRCxVQUFTbUUsTUFBVCxFQUFpQjtBQUNoRSxnQkFBSWpFLEtBQUssSUFBVDtBQUNBLGlCQUFLbVcsb0JBQUwsR0FBNEIsS0FBS0Esb0JBQUwsSUFBNkIsRUFBekQ7QUFDQSxnQkFBSWxTLE1BQUosRUFBWTtBQUNWekwscUJBQU9DLElBQVAsQ0FBWSxLQUFLMGQsb0JBQWpCLEVBQXVDcGlCLE9BQXZDLENBQStDLFVBQVNxaUIsUUFBVCxFQUFtQjtBQUNoRSxvQkFBSXZTLE1BQU03RCxHQUFHbVcsb0JBQUgsQ0FBd0JDLFFBQXhCLEVBQWtDcmEsT0FBbEMsQ0FBMENrSSxNQUExQyxDQUFWO0FBQ0Esb0JBQUlKLFFBQVEsQ0FBQyxDQUFiLEVBQWdCO0FBQ2Q3RCxxQkFBR21XLG9CQUFILENBQXdCQyxRQUF4QixFQUFrQ2hTLE1BQWxDLENBQXlDUCxHQUF6QyxFQUE4QyxDQUE5QztBQUNEO0FBQ0Qsb0JBQUk3RCxHQUFHbVcsb0JBQUgsQ0FBd0JDLFFBQXhCLEVBQWtDaGlCLE1BQWxDLEtBQTZDLENBQWpELEVBQW9EO0FBQ2xELHlCQUFPNEwsR0FBR21XLG9CQUFILENBQXdCQyxRQUF4QixDQUFQO0FBQ0Q7QUFDRixlQVJEO0FBU0Q7QUFDRCxtQkFBT2IsZ0JBQWdCdEksS0FBaEIsQ0FBc0IsSUFBdEIsRUFBNEJyQyxTQUE1QixDQUFQO0FBQ0QsV0FmRDtBQWdCRCxTQTFTYzs7QUE0U2ZpSixpQ0FBeUIsaUNBQVNsaEIsTUFBVCxFQUFpQjtBQUN4QyxjQUFJK2YsaUJBQWlCWCxNQUFNWSxhQUFOLENBQW9CaGdCLE1BQXBCLENBQXJCO0FBQ0E7QUFDQSxjQUFJQSxPQUFPcUMsaUJBQVAsQ0FBeUJrTixTQUF6QixDQUFtQ3hDLFFBQW5DLElBQ0FnVCxlQUFldkIsT0FBZixJQUEwQixFQUQ5QixFQUNrQztBQUNoQyxtQkFBTyxLQUFLK0UsaUNBQUwsQ0FBdUN2akIsTUFBdkMsQ0FBUDtBQUNEOztBQUVEO0FBQ0E7QUFDQSxjQUFJOGpCLHNCQUFzQjlqQixPQUFPcUMsaUJBQVAsQ0FBeUJrTixTQUF6QixDQUNyQlcsZUFETDtBQUVBbFEsaUJBQU9xQyxpQkFBUCxDQUF5QmtOLFNBQXpCLENBQW1DVyxlQUFuQyxHQUFxRCxZQUFXO0FBQzlELGdCQUFJN0MsS0FBSyxJQUFUO0FBQ0EsZ0JBQUkwVyxnQkFBZ0JELG9CQUFvQnhKLEtBQXBCLENBQTBCLElBQTFCLENBQXBCO0FBQ0FqTixlQUFHMlcsZUFBSCxHQUFxQjNXLEdBQUcyVyxlQUFILElBQXNCLEVBQTNDO0FBQ0EsbUJBQU9ELGNBQWN2UyxHQUFkLENBQWtCLFVBQVMzUyxNQUFULEVBQWlCO0FBQ3hDLHFCQUFPd08sR0FBRzJXLGVBQUgsQ0FBbUJubEIsT0FBT3dCLEVBQTFCLENBQVA7QUFDRCxhQUZNLENBQVA7QUFHRCxXQVBEOztBQVNBLGNBQUl3aUIsZ0JBQWdCN2lCLE9BQU9xQyxpQkFBUCxDQUF5QmtOLFNBQXpCLENBQW1DekwsU0FBdkQ7QUFDQTlELGlCQUFPcUMsaUJBQVAsQ0FBeUJrTixTQUF6QixDQUFtQ3pMLFNBQW5DLEdBQStDLFVBQVNqRixNQUFULEVBQWlCO0FBQzlELGdCQUFJd08sS0FBSyxJQUFUO0FBQ0FBLGVBQUc0VyxRQUFILEdBQWM1VyxHQUFHNFcsUUFBSCxJQUFlLEVBQTdCO0FBQ0E1VyxlQUFHMlcsZUFBSCxHQUFxQjNXLEdBQUcyVyxlQUFILElBQXNCLEVBQTNDOztBQUVBbmxCLG1CQUFPa1MsU0FBUCxHQUFtQjNQLE9BQW5CLENBQTJCLFVBQVMrRyxLQUFULEVBQWdCO0FBQ3pDLGtCQUFJeUksZ0JBQWdCdkQsR0FBR3NFLFVBQUgsR0FBZ0I3RixJQUFoQixDQUFxQixVQUFTckYsQ0FBVCxFQUFZO0FBQ25ELHVCQUFPQSxFQUFFMEIsS0FBRixLQUFZQSxLQUFuQjtBQUNELGVBRm1CLENBQXBCO0FBR0Esa0JBQUl5SSxhQUFKLEVBQW1CO0FBQ2pCLHNCQUFNLElBQUk4UyxZQUFKLENBQWlCLHVCQUFqQixFQUNGLG9CQURFLENBQU47QUFFRDtBQUNGLGFBUkQ7QUFTQTtBQUNBO0FBQ0EsZ0JBQUksQ0FBQ3JXLEdBQUcyVyxlQUFILENBQW1CbmxCLE9BQU93QixFQUExQixDQUFMLEVBQW9DO0FBQ2xDLGtCQUFJNmpCLFlBQVksSUFBSWxrQixPQUFPZ1gsV0FBWCxDQUF1Qm5ZLE9BQU9rUyxTQUFQLEVBQXZCLENBQWhCO0FBQ0ExRCxpQkFBRzRXLFFBQUgsQ0FBWXBsQixPQUFPd0IsRUFBbkIsSUFBeUI2akIsU0FBekI7QUFDQTdXLGlCQUFHMlcsZUFBSCxDQUFtQkUsVUFBVTdqQixFQUE3QixJQUFtQ3hCLE1BQW5DO0FBQ0FBLHVCQUFTcWxCLFNBQVQ7QUFDRDtBQUNEckIsMEJBQWN2SSxLQUFkLENBQW9Cak4sRUFBcEIsRUFBd0IsQ0FBQ3hPLE1BQUQsQ0FBeEI7QUFDRCxXQXZCRDs7QUF5QkEsY0FBSWlrQixtQkFBbUI5aUIsT0FBT3FDLGlCQUFQLENBQXlCa04sU0FBekIsQ0FBbUNtQyxZQUExRDtBQUNBMVIsaUJBQU9xQyxpQkFBUCxDQUF5QmtOLFNBQXpCLENBQW1DbUMsWUFBbkMsR0FBa0QsVUFBUzdTLE1BQVQsRUFBaUI7QUFDakUsZ0JBQUl3TyxLQUFLLElBQVQ7QUFDQUEsZUFBRzRXLFFBQUgsR0FBYzVXLEdBQUc0VyxRQUFILElBQWUsRUFBN0I7QUFDQTVXLGVBQUcyVyxlQUFILEdBQXFCM1csR0FBRzJXLGVBQUgsSUFBc0IsRUFBM0M7O0FBRUFsQiw2QkFBaUJ4SSxLQUFqQixDQUF1QmpOLEVBQXZCLEVBQTJCLENBQUVBLEdBQUc0VyxRQUFILENBQVlwbEIsT0FBT3dCLEVBQW5CLEtBQTBCeEIsTUFBNUIsQ0FBM0I7QUFDQSxtQkFBT3dPLEdBQUcyVyxlQUFILENBQW9CM1csR0FBRzRXLFFBQUgsQ0FBWXBsQixPQUFPd0IsRUFBbkIsSUFDdkJnTixHQUFHNFcsUUFBSCxDQUFZcGxCLE9BQU93QixFQUFuQixFQUF1QkEsRUFEQSxHQUNLeEIsT0FBT3dCLEVBRGhDLENBQVA7QUFFQSxtQkFBT2dOLEdBQUc0VyxRQUFILENBQVlwbEIsT0FBT3dCLEVBQW5CLENBQVA7QUFDRCxXQVREOztBQVdBTCxpQkFBT3FDLGlCQUFQLENBQXlCa04sU0FBekIsQ0FBbUN4QyxRQUFuQyxHQUE4QyxVQUFTNUUsS0FBVCxFQUFnQnRKLE1BQWhCLEVBQXdCO0FBQ3BFLGdCQUFJd08sS0FBSyxJQUFUO0FBQ0EsZ0JBQUlBLEdBQUc5QixjQUFILEtBQXNCLFFBQTFCLEVBQW9DO0FBQ2xDLG9CQUFNLElBQUltWSxZQUFKLENBQ0osd0RBREksRUFFSixtQkFGSSxDQUFOO0FBR0Q7QUFDRCxnQkFBSWhnQixVQUFVLEdBQUdoQyxLQUFILENBQVN1RixJQUFULENBQWNnUixTQUFkLEVBQXlCLENBQXpCLENBQWQ7QUFDQSxnQkFBSXZVLFFBQVFqQyxNQUFSLEtBQW1CLENBQW5CLElBQ0EsQ0FBQ2lDLFFBQVEsQ0FBUixFQUFXcU4sU0FBWCxHQUF1QmpGLElBQXZCLENBQTRCLFVBQVN4RixDQUFULEVBQVk7QUFDdkMscUJBQU9BLE1BQU02QixLQUFiO0FBQ0QsYUFGQSxDQURMLEVBR1E7QUFDTjtBQUNBO0FBQ0Esb0JBQU0sSUFBSXViLFlBQUosQ0FDSiw2REFDQSx1REFGSSxFQUdKLG1CQUhJLENBQU47QUFJRDs7QUFFRCxnQkFBSTlTLGdCQUFnQnZELEdBQUdzRSxVQUFILEdBQWdCN0YsSUFBaEIsQ0FBcUIsVUFBU3JGLENBQVQsRUFBWTtBQUNuRCxxQkFBT0EsRUFBRTBCLEtBQUYsS0FBWUEsS0FBbkI7QUFDRCxhQUZtQixDQUFwQjtBQUdBLGdCQUFJeUksYUFBSixFQUFtQjtBQUNqQixvQkFBTSxJQUFJOFMsWUFBSixDQUFpQix1QkFBakIsRUFDRixvQkFERSxDQUFOO0FBRUQ7O0FBRURyVyxlQUFHNFcsUUFBSCxHQUFjNVcsR0FBRzRXLFFBQUgsSUFBZSxFQUE3QjtBQUNBNVcsZUFBRzJXLGVBQUgsR0FBcUIzVyxHQUFHMlcsZUFBSCxJQUFzQixFQUEzQztBQUNBLGdCQUFJRyxZQUFZOVcsR0FBRzRXLFFBQUgsQ0FBWXBsQixPQUFPd0IsRUFBbkIsQ0FBaEI7QUFDQSxnQkFBSThqQixTQUFKLEVBQWU7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBQSx3QkFBVXBYLFFBQVYsQ0FBbUI1RSxLQUFuQjs7QUFFQTtBQUNBekMsc0JBQVF0RCxPQUFSLEdBQWtCbEIsSUFBbEIsQ0FBdUIsWUFBVztBQUNoQ21NLG1CQUFHTCxhQUFILENBQWlCLElBQUlRLEtBQUosQ0FBVSxtQkFBVixDQUFqQjtBQUNELGVBRkQ7QUFHRCxhQVhELE1BV087QUFDTCxrQkFBSTBXLFlBQVksSUFBSWxrQixPQUFPZ1gsV0FBWCxDQUF1QixDQUFDN08sS0FBRCxDQUF2QixDQUFoQjtBQUNBa0YsaUJBQUc0VyxRQUFILENBQVlwbEIsT0FBT3dCLEVBQW5CLElBQXlCNmpCLFNBQXpCO0FBQ0E3VyxpQkFBRzJXLGVBQUgsQ0FBbUJFLFVBQVU3akIsRUFBN0IsSUFBbUN4QixNQUFuQztBQUNBd08saUJBQUd2SixTQUFILENBQWFvZ0IsU0FBYjtBQUNEO0FBQ0QsbUJBQU83VyxHQUFHc0UsVUFBSCxHQUFnQjdGLElBQWhCLENBQXFCLFVBQVNyRixDQUFULEVBQVk7QUFDdEMscUJBQU9BLEVBQUUwQixLQUFGLEtBQVlBLEtBQW5CO0FBQ0QsYUFGTSxDQUFQO0FBR0QsV0FuREQ7O0FBcURBO0FBQ0E7QUFDQSxtQkFBU2ljLHVCQUFULENBQWlDL1csRUFBakMsRUFBcUNkLFdBQXJDLEVBQWtEO0FBQ2hELGdCQUFJckssTUFBTXFLLFlBQVlySyxHQUF0QjtBQUNBMkQsbUJBQU9DLElBQVAsQ0FBWXVILEdBQUcyVyxlQUFILElBQXNCLEVBQWxDLEVBQXNDNWlCLE9BQXRDLENBQThDLFVBQVNpakIsVUFBVCxFQUFxQjtBQUNqRSxrQkFBSUMsaUJBQWlCalgsR0FBRzJXLGVBQUgsQ0FBbUJLLFVBQW5CLENBQXJCO0FBQ0Esa0JBQUlFLGlCQUFpQmxYLEdBQUc0VyxRQUFILENBQVlLLGVBQWVqa0IsRUFBM0IsQ0FBckI7QUFDQTZCLG9CQUFNQSxJQUFJc2lCLE9BQUosQ0FBWSxJQUFJQyxNQUFKLENBQVdGLGVBQWVsa0IsRUFBMUIsRUFBOEIsR0FBOUIsQ0FBWixFQUNGaWtCLGVBQWVqa0IsRUFEYixDQUFOO0FBRUQsYUFMRDtBQU1BLG1CQUFPLElBQUlrQyxxQkFBSixDQUEwQjtBQUMvQi9ELG9CQUFNK04sWUFBWS9OLElBRGE7QUFFL0IwRCxtQkFBS0E7QUFGMEIsYUFBMUIsQ0FBUDtBQUlEO0FBQ0QsbUJBQVN3aUIsdUJBQVQsQ0FBaUNyWCxFQUFqQyxFQUFxQ2QsV0FBckMsRUFBa0Q7QUFDaEQsZ0JBQUlySyxNQUFNcUssWUFBWXJLLEdBQXRCO0FBQ0EyRCxtQkFBT0MsSUFBUCxDQUFZdUgsR0FBRzJXLGVBQUgsSUFBc0IsRUFBbEMsRUFBc0M1aUIsT0FBdEMsQ0FBOEMsVUFBU2lqQixVQUFULEVBQXFCO0FBQ2pFLGtCQUFJQyxpQkFBaUJqWCxHQUFHMlcsZUFBSCxDQUFtQkssVUFBbkIsQ0FBckI7QUFDQSxrQkFBSUUsaUJBQWlCbFgsR0FBRzRXLFFBQUgsQ0FBWUssZUFBZWprQixFQUEzQixDQUFyQjtBQUNBNkIsb0JBQU1BLElBQUlzaUIsT0FBSixDQUFZLElBQUlDLE1BQUosQ0FBV0gsZUFBZWprQixFQUExQixFQUE4QixHQUE5QixDQUFaLEVBQ0Zra0IsZUFBZWxrQixFQURiLENBQU47QUFFRCxhQUxEO0FBTUEsbUJBQU8sSUFBSWtDLHFCQUFKLENBQTBCO0FBQy9CL0Qsb0JBQU0rTixZQUFZL04sSUFEYTtBQUUvQjBELG1CQUFLQTtBQUYwQixhQUExQixDQUFQO0FBSUQ7QUFDRCxXQUFDLGFBQUQsRUFBZ0IsY0FBaEIsRUFBZ0NkLE9BQWhDLENBQXdDLFVBQVMwTSxNQUFULEVBQWlCO0FBQ3ZELGdCQUFJc00sZUFBZXBhLE9BQU9xQyxpQkFBUCxDQUF5QmtOLFNBQXpCLENBQW1DekIsTUFBbkMsQ0FBbkI7QUFDQTlOLG1CQUFPcUMsaUJBQVAsQ0FBeUJrTixTQUF6QixDQUFtQ3pCLE1BQW5DLElBQTZDLFlBQVc7QUFDdEQsa0JBQUlULEtBQUssSUFBVDtBQUNBLGtCQUFJZ04sT0FBT3BDLFNBQVg7QUFDQSxrQkFBSTBNLGVBQWUxTSxVQUFVeFcsTUFBVixJQUNmLE9BQU93VyxVQUFVLENBQVYsQ0FBUCxLQUF3QixVQUQ1QjtBQUVBLGtCQUFJME0sWUFBSixFQUFrQjtBQUNoQix1QkFBT3ZLLGFBQWFFLEtBQWIsQ0FBbUJqTixFQUFuQixFQUF1QixDQUM1QixVQUFTZCxXQUFULEVBQXNCO0FBQ3BCLHNCQUFJOUosT0FBTzJoQix3QkFBd0IvVyxFQUF4QixFQUE0QmQsV0FBNUIsQ0FBWDtBQUNBOE4sdUJBQUssQ0FBTCxFQUFRQyxLQUFSLENBQWMsSUFBZCxFQUFvQixDQUFDN1gsSUFBRCxDQUFwQjtBQUNELGlCQUoyQixFQUs1QixVQUFTbWlCLEdBQVQsRUFBYztBQUNaLHNCQUFJdkssS0FBSyxDQUFMLENBQUosRUFBYTtBQUNYQSx5QkFBSyxDQUFMLEVBQVFDLEtBQVIsQ0FBYyxJQUFkLEVBQW9Cc0ssR0FBcEI7QUFDRDtBQUNGLGlCQVQyQixFQVN6QjNNLFVBQVUsQ0FBVixDQVR5QixDQUF2QixDQUFQO0FBV0Q7QUFDRCxxQkFBT21DLGFBQWFFLEtBQWIsQ0FBbUJqTixFQUFuQixFQUF1QjRLLFNBQXZCLEVBQ04vVyxJQURNLENBQ0QsVUFBU3FMLFdBQVQsRUFBc0I7QUFDMUIsdUJBQU82WCx3QkFBd0IvVyxFQUF4QixFQUE0QmQsV0FBNUIsQ0FBUDtBQUNELGVBSE0sQ0FBUDtBQUlELGFBdEJEO0FBdUJELFdBekJEOztBQTJCQSxjQUFJc1ksMEJBQ0E3a0IsT0FBT3FDLGlCQUFQLENBQXlCa04sU0FBekIsQ0FBbUM3TSxtQkFEdkM7QUFFQTFDLGlCQUFPcUMsaUJBQVAsQ0FBeUJrTixTQUF6QixDQUFtQzdNLG1CQUFuQyxHQUF5RCxZQUFXO0FBQ2xFLGdCQUFJMkssS0FBSyxJQUFUO0FBQ0EsZ0JBQUksQ0FBQzRLLFVBQVV4VyxNQUFYLElBQXFCLENBQUN3VyxVQUFVLENBQVYsRUFBYXpaLElBQXZDLEVBQTZDO0FBQzNDLHFCQUFPcW1CLHdCQUF3QnZLLEtBQXhCLENBQThCak4sRUFBOUIsRUFBa0M0SyxTQUFsQyxDQUFQO0FBQ0Q7QUFDREEsc0JBQVUsQ0FBVixJQUFleU0sd0JBQXdCclgsRUFBeEIsRUFBNEI0SyxVQUFVLENBQVYsQ0FBNUIsQ0FBZjtBQUNBLG1CQUFPNE0sd0JBQXdCdkssS0FBeEIsQ0FBOEJqTixFQUE5QixFQUFrQzRLLFNBQWxDLENBQVA7QUFDRCxXQVBEOztBQVNBOztBQUVBLGNBQUk2TSx1QkFBdUJqZixPQUFPa2Ysd0JBQVAsQ0FDdkIva0IsT0FBT3FDLGlCQUFQLENBQXlCa04sU0FERixFQUNhLGtCQURiLENBQTNCO0FBRUExSixpQkFBT21NLGNBQVAsQ0FBc0JoUyxPQUFPcUMsaUJBQVAsQ0FBeUJrTixTQUEvQyxFQUNJLGtCQURKLEVBQ3dCO0FBQ2xCMEgsaUJBQUssZUFBVztBQUNkLGtCQUFJNUosS0FBSyxJQUFUO0FBQ0Esa0JBQUlkLGNBQWN1WSxxQkFBcUI3TixHQUFyQixDQUF5QnFELEtBQXpCLENBQStCLElBQS9CLENBQWxCO0FBQ0Esa0JBQUkvTixZQUFZL04sSUFBWixLQUFxQixFQUF6QixFQUE2QjtBQUMzQix1QkFBTytOLFdBQVA7QUFDRDtBQUNELHFCQUFPNlgsd0JBQXdCL1csRUFBeEIsRUFBNEJkLFdBQTVCLENBQVA7QUFDRDtBQVJpQixXQUR4Qjs7QUFZQXZNLGlCQUFPcUMsaUJBQVAsQ0FBeUJrTixTQUF6QixDQUFtQ3BDLFdBQW5DLEdBQWlELFVBQVNtRSxNQUFULEVBQWlCO0FBQ2hFLGdCQUFJakUsS0FBSyxJQUFUO0FBQ0EsZ0JBQUlBLEdBQUc5QixjQUFILEtBQXNCLFFBQTFCLEVBQW9DO0FBQ2xDLG9CQUFNLElBQUltWSxZQUFKLENBQ0osd0RBREksRUFFSixtQkFGSSxDQUFOO0FBR0Q7QUFDRDtBQUNBO0FBQ0EsZ0JBQUksQ0FBQ3BTLE9BQU9tUixHQUFaLEVBQWlCO0FBQ2Ysb0JBQU0sSUFBSWlCLFlBQUosQ0FBaUIsaURBQ25CLDRDQURFLEVBQzRDLFdBRDVDLENBQU47QUFFRDtBQUNELGdCQUFJc0IsVUFBVTFULE9BQU9tUixHQUFQLEtBQWVwVixFQUE3QjtBQUNBLGdCQUFJLENBQUMyWCxPQUFMLEVBQWM7QUFDWixvQkFBTSxJQUFJdEIsWUFBSixDQUFpQiw0Q0FBakIsRUFDRixvQkFERSxDQUFOO0FBRUQ7O0FBRUQ7QUFDQXJXLGVBQUc0VyxRQUFILEdBQWM1VyxHQUFHNFcsUUFBSCxJQUFlLEVBQTdCO0FBQ0EsZ0JBQUlwbEIsTUFBSjtBQUNBZ0gsbUJBQU9DLElBQVAsQ0FBWXVILEdBQUc0VyxRQUFmLEVBQXlCN2lCLE9BQXpCLENBQWlDLFVBQVM2akIsUUFBVCxFQUFtQjtBQUNsRCxrQkFBSUMsV0FBVzdYLEdBQUc0VyxRQUFILENBQVlnQixRQUFaLEVBQXNCbFUsU0FBdEIsR0FBa0NqRixJQUFsQyxDQUF1QyxVQUFTM0QsS0FBVCxFQUFnQjtBQUNwRSx1QkFBT21KLE9BQU9uSixLQUFQLEtBQWlCQSxLQUF4QjtBQUNELGVBRmMsQ0FBZjtBQUdBLGtCQUFJK2MsUUFBSixFQUFjO0FBQ1pybUIseUJBQVN3TyxHQUFHNFcsUUFBSCxDQUFZZ0IsUUFBWixDQUFUO0FBQ0Q7QUFDRixhQVBEOztBQVNBLGdCQUFJcG1CLE1BQUosRUFBWTtBQUNWLGtCQUFJQSxPQUFPa1MsU0FBUCxHQUFtQnRQLE1BQW5CLEtBQThCLENBQWxDLEVBQXFDO0FBQ25DO0FBQ0E7QUFDQTRMLG1CQUFHcUUsWUFBSCxDQUFnQnJFLEdBQUcyVyxlQUFILENBQW1CbmxCLE9BQU93QixFQUExQixDQUFoQjtBQUNELGVBSkQsTUFJTztBQUNMO0FBQ0F4Qix1QkFBT3NPLFdBQVAsQ0FBbUJtRSxPQUFPbkosS0FBMUI7QUFDRDtBQUNEa0YsaUJBQUdMLGFBQUgsQ0FBaUIsSUFBSVEsS0FBSixDQUFVLG1CQUFWLENBQWpCO0FBQ0Q7QUFDRixXQTFDRDtBQTJDRCxTQXpoQmM7O0FBMmhCZm1ULDRCQUFvQiw0QkFBUzNnQixNQUFULEVBQWlCO0FBQ25DLGNBQUkrZixpQkFBaUJYLE1BQU1ZLGFBQU4sQ0FBb0JoZ0IsTUFBcEIsQ0FBckI7O0FBRUE7QUFDQSxjQUFJLENBQUNBLE9BQU9xQyxpQkFBUixJQUE2QnJDLE9BQU9tbEIsdUJBQXhDLEVBQWlFO0FBQy9EbmxCLG1CQUFPcUMsaUJBQVAsR0FBMkIsVUFBUytpQixRQUFULEVBQW1CQyxhQUFuQixFQUFrQztBQUMzRDtBQUNBO0FBQ0E7QUFDQXZGLHNCQUFRLGdCQUFSO0FBQ0Esa0JBQUlzRixZQUFZQSxTQUFTelcsa0JBQXpCLEVBQTZDO0FBQzNDeVcseUJBQVNFLGFBQVQsR0FBeUJGLFNBQVN6VyxrQkFBbEM7QUFDRDs7QUFFRCxxQkFBTyxJQUFJM08sT0FBT21sQix1QkFBWCxDQUFtQ0MsUUFBbkMsRUFBNkNDLGFBQTdDLENBQVA7QUFDRCxhQVZEO0FBV0FybEIsbUJBQU9xQyxpQkFBUCxDQUF5QmtOLFNBQXpCLEdBQ0l2UCxPQUFPbWxCLHVCQUFQLENBQStCNVYsU0FEbkM7QUFFQTtBQUNBLGdCQUFJdlAsT0FBT21sQix1QkFBUCxDQUErQkksbUJBQW5DLEVBQXdEO0FBQ3REMWYscUJBQU9tTSxjQUFQLENBQXNCaFMsT0FBT3FDLGlCQUE3QixFQUFnRCxxQkFBaEQsRUFBdUU7QUFDckU0VSxxQkFBSyxlQUFXO0FBQ2QseUJBQU9qWCxPQUFPbWxCLHVCQUFQLENBQStCSSxtQkFBdEM7QUFDRDtBQUhvRSxlQUF2RTtBQUtEO0FBQ0YsV0F0QkQsTUFzQk87QUFDTDtBQUNBLGdCQUFJQyxxQkFBcUJ4bEIsT0FBT3FDLGlCQUFoQztBQUNBckMsbUJBQU9xQyxpQkFBUCxHQUEyQixVQUFTK2lCLFFBQVQsRUFBbUJDLGFBQW5CLEVBQWtDO0FBQzNELGtCQUFJRCxZQUFZQSxTQUFTMWMsVUFBekIsRUFBcUM7QUFDbkMsb0JBQUkrYyxnQkFBZ0IsRUFBcEI7QUFDQSxxQkFBSyxJQUFJdGhCLElBQUksQ0FBYixFQUFnQkEsSUFBSWloQixTQUFTMWMsVUFBVCxDQUFvQmpILE1BQXhDLEVBQWdEMEMsR0FBaEQsRUFBcUQ7QUFDbkQsc0JBQUkyRSxTQUFTc2MsU0FBUzFjLFVBQVQsQ0FBb0J2RSxDQUFwQixDQUFiO0FBQ0Esc0JBQUksQ0FBQzJFLE9BQU8rVyxjQUFQLENBQXNCLE1BQXRCLENBQUQsSUFDQS9XLE9BQU8rVyxjQUFQLENBQXNCLEtBQXRCLENBREosRUFDa0M7QUFDaENULDBCQUFNc0csVUFBTixDQUFpQixrQkFBakIsRUFBcUMsbUJBQXJDO0FBQ0E1Yyw2QkFBU2xFLEtBQUtDLEtBQUwsQ0FBV0QsS0FBS3FCLFNBQUwsQ0FBZTZDLE1BQWYsQ0FBWCxDQUFUO0FBQ0FBLDJCQUFPQyxJQUFQLEdBQWNELE9BQU9FLEdBQXJCO0FBQ0F5YyxrQ0FBY25rQixJQUFkLENBQW1Cd0gsTUFBbkI7QUFDRCxtQkFORCxNQU1PO0FBQ0wyYyxrQ0FBY25rQixJQUFkLENBQW1COGpCLFNBQVMxYyxVQUFULENBQW9CdkUsQ0FBcEIsQ0FBbkI7QUFDRDtBQUNGO0FBQ0RpaEIseUJBQVMxYyxVQUFULEdBQXNCK2MsYUFBdEI7QUFDRDtBQUNELHFCQUFPLElBQUlELGtCQUFKLENBQXVCSixRQUF2QixFQUFpQ0MsYUFBakMsQ0FBUDtBQUNELGFBbEJEO0FBbUJBcmxCLG1CQUFPcUMsaUJBQVAsQ0FBeUJrTixTQUF6QixHQUFxQ2lXLG1CQUFtQmpXLFNBQXhEO0FBQ0E7QUFDQTFKLG1CQUFPbU0sY0FBUCxDQUFzQmhTLE9BQU9xQyxpQkFBN0IsRUFBZ0QscUJBQWhELEVBQXVFO0FBQ3JFNFUsbUJBQUssZUFBVztBQUNkLHVCQUFPdU8sbUJBQW1CRCxtQkFBMUI7QUFDRDtBQUhvRSxhQUF2RTtBQUtEOztBQUVELGNBQUlJLGVBQWUzbEIsT0FBT3FDLGlCQUFQLENBQXlCa04sU0FBekIsQ0FBbUN0TyxRQUF0RDtBQUNBakIsaUJBQU9xQyxpQkFBUCxDQUF5QmtOLFNBQXpCLENBQW1DdE8sUUFBbkMsR0FBOEMsVUFBUzJrQixRQUFULEVBQzFDQyxlQUQwQyxFQUN6QkMsYUFEeUIsRUFDVjtBQUNsQyxnQkFBSXpZLEtBQUssSUFBVDtBQUNBLGdCQUFJZ04sT0FBT3BDLFNBQVg7O0FBRUE7QUFDQTtBQUNBLGdCQUFJQSxVQUFVeFcsTUFBVixHQUFtQixDQUFuQixJQUF3QixPQUFPbWtCLFFBQVAsS0FBb0IsVUFBaEQsRUFBNEQ7QUFDMUQscUJBQU9ELGFBQWFyTCxLQUFiLENBQW1CLElBQW5CLEVBQXlCckMsU0FBekIsQ0FBUDtBQUNEOztBQUVEO0FBQ0E7QUFDQSxnQkFBSTBOLGFBQWFsa0IsTUFBYixLQUF3QixDQUF4QixLQUE4QndXLFVBQVV4VyxNQUFWLEtBQXFCLENBQXJCLElBQzlCLE9BQU93VyxVQUFVLENBQVYsQ0FBUCxLQUF3QixVQUR4QixDQUFKLEVBQ3lDO0FBQ3ZDLHFCQUFPME4sYUFBYXJMLEtBQWIsQ0FBbUIsSUFBbkIsRUFBeUIsRUFBekIsQ0FBUDtBQUNEOztBQUVELGdCQUFJeUwsa0JBQWtCLFNBQWxCQSxlQUFrQixDQUFTQyxRQUFULEVBQW1CO0FBQ3ZDLGtCQUFJQyxpQkFBaUIsRUFBckI7QUFDQSxrQkFBSUMsVUFBVUYsU0FBUy9MLE1BQVQsRUFBZDtBQUNBaU0sc0JBQVE5a0IsT0FBUixDQUFnQixVQUFTK2tCLE1BQVQsRUFBaUI7QUFDL0Isb0JBQUlDLGdCQUFnQjtBQUNsQi9sQixzQkFBSThsQixPQUFPOWxCLEVBRE87QUFFbEJnbUIsNkJBQVdGLE9BQU9FLFNBRkE7QUFHbEI3bkIsd0JBQU07QUFDSm1iLG9DQUFnQixpQkFEWjtBQUVKQyxxQ0FBaUI7QUFGYixvQkFHSnVNLE9BQU8zbkIsSUFISCxLQUdZMm5CLE9BQU8zbkI7QUFOUCxpQkFBcEI7QUFRQTJuQix1QkFBT0csS0FBUCxHQUFlbGxCLE9BQWYsQ0FBdUIsVUFBUzdELElBQVQsRUFBZTtBQUNwQzZvQixnQ0FBYzdvQixJQUFkLElBQXNCNG9CLE9BQU81TSxJQUFQLENBQVloYyxJQUFaLENBQXRCO0FBQ0QsaUJBRkQ7QUFHQTBvQiwrQkFBZUcsY0FBYy9sQixFQUE3QixJQUFtQytsQixhQUFuQztBQUNELGVBYkQ7O0FBZUEscUJBQU9ILGNBQVA7QUFDRCxhQW5CRDs7QUFxQkE7QUFDQSxnQkFBSU0sZUFBZSxTQUFmQSxZQUFlLENBQVNwbEIsS0FBVCxFQUFnQjtBQUNqQyxxQkFBTyxJQUFJMlksR0FBSixDQUFRalUsT0FBT0MsSUFBUCxDQUFZM0UsS0FBWixFQUFtQnFRLEdBQW5CLENBQXVCLFVBQVNvTyxHQUFULEVBQWM7QUFDbEQsdUJBQU8sQ0FBQ0EsR0FBRCxFQUFNemUsTUFBTXllLEdBQU4sQ0FBTixDQUFQO0FBQ0QsZUFGYyxDQUFSLENBQVA7QUFHRCxhQUpEOztBQU1BLGdCQUFJM0gsVUFBVXhXLE1BQVYsSUFBb0IsQ0FBeEIsRUFBMkI7QUFDekIsa0JBQUkra0IsMEJBQTBCLFNBQTFCQSx1QkFBMEIsQ0FBU1IsUUFBVCxFQUFtQjtBQUMvQzNMLHFCQUFLLENBQUwsRUFBUWtNLGFBQWFSLGdCQUFnQkMsUUFBaEIsQ0FBYixDQUFSO0FBQ0QsZUFGRDs7QUFJQSxxQkFBT0wsYUFBYXJMLEtBQWIsQ0FBbUIsSUFBbkIsRUFBeUIsQ0FBQ2tNLHVCQUFELEVBQzlCdk8sVUFBVSxDQUFWLENBRDhCLENBQXpCLENBQVA7QUFFRDs7QUFFRDtBQUNBLG1CQUFPLElBQUl2UyxPQUFKLENBQVksVUFBU3RELE9BQVQsRUFBa0JtQyxNQUFsQixFQUEwQjtBQUMzQ29oQiwyQkFBYXJMLEtBQWIsQ0FBbUJqTixFQUFuQixFQUF1QixDQUNyQixVQUFTMlksUUFBVCxFQUFtQjtBQUNqQjVqQix3QkFBUW1rQixhQUFhUixnQkFBZ0JDLFFBQWhCLENBQWIsQ0FBUjtBQUNELGVBSG9CLEVBR2xCemhCLE1BSGtCLENBQXZCO0FBSUQsYUFMTSxFQUtKckQsSUFMSSxDQUtDMmtCLGVBTEQsRUFLa0JDLGFBTGxCLENBQVA7QUFNRCxXQTlERDs7QUFnRUE7QUFDQSxjQUFJL0YsZUFBZXZCLE9BQWYsR0FBeUIsRUFBN0IsRUFBaUM7QUFDL0IsYUFBQyxxQkFBRCxFQUF3QixzQkFBeEIsRUFBZ0QsaUJBQWhELEVBQ0twZCxPQURMLENBQ2EsVUFBUzBNLE1BQVQsRUFBaUI7QUFDeEIsa0JBQUlzTSxlQUFlcGEsT0FBT3FDLGlCQUFQLENBQXlCa04sU0FBekIsQ0FBbUN6QixNQUFuQyxDQUFuQjtBQUNBOU4scUJBQU9xQyxpQkFBUCxDQUF5QmtOLFNBQXpCLENBQW1DekIsTUFBbkMsSUFBNkMsWUFBVztBQUN0RCxvQkFBSXVNLE9BQU9wQyxTQUFYO0FBQ0Esb0JBQUk1SyxLQUFLLElBQVQ7QUFDQSxvQkFBSW9aLFVBQVUsSUFBSS9nQixPQUFKLENBQVksVUFBU3RELE9BQVQsRUFBa0JtQyxNQUFsQixFQUEwQjtBQUNsRDZWLCtCQUFhRSxLQUFiLENBQW1Cak4sRUFBbkIsRUFBdUIsQ0FBQ2dOLEtBQUssQ0FBTCxDQUFELEVBQVVqWSxPQUFWLEVBQW1CbUMsTUFBbkIsQ0FBdkI7QUFDRCxpQkFGYSxDQUFkO0FBR0Esb0JBQUk4VixLQUFLNVksTUFBTCxHQUFjLENBQWxCLEVBQXFCO0FBQ25CLHlCQUFPZ2xCLE9BQVA7QUFDRDtBQUNELHVCQUFPQSxRQUFRdmxCLElBQVIsQ0FBYSxZQUFXO0FBQzdCbVosdUJBQUssQ0FBTCxFQUFRQyxLQUFSLENBQWMsSUFBZCxFQUFvQixFQUFwQjtBQUNELGlCQUZNLEVBR1AsVUFBU3NLLEdBQVQsRUFBYztBQUNaLHNCQUFJdkssS0FBSzVZLE1BQUwsSUFBZSxDQUFuQixFQUFzQjtBQUNwQjRZLHlCQUFLLENBQUwsRUFBUUMsS0FBUixDQUFjLElBQWQsRUFBb0IsQ0FBQ3NLLEdBQUQsQ0FBcEI7QUFDRDtBQUNGLGlCQVBNLENBQVA7QUFRRCxlQWpCRDtBQWtCRCxhQXJCTDtBQXNCRDs7QUFFRDtBQUNBO0FBQ0EsY0FBSTdFLGVBQWV2QixPQUFmLEdBQXlCLEVBQTdCLEVBQWlDO0FBQy9CLGFBQUMsYUFBRCxFQUFnQixjQUFoQixFQUFnQ3BkLE9BQWhDLENBQXdDLFVBQVMwTSxNQUFULEVBQWlCO0FBQ3ZELGtCQUFJc00sZUFBZXBhLE9BQU9xQyxpQkFBUCxDQUF5QmtOLFNBQXpCLENBQW1DekIsTUFBbkMsQ0FBbkI7QUFDQTlOLHFCQUFPcUMsaUJBQVAsQ0FBeUJrTixTQUF6QixDQUFtQ3pCLE1BQW5DLElBQTZDLFlBQVc7QUFDdEQsb0JBQUlULEtBQUssSUFBVDtBQUNBLG9CQUFJNEssVUFBVXhXLE1BQVYsR0FBbUIsQ0FBbkIsSUFBeUJ3VyxVQUFVeFcsTUFBVixLQUFxQixDQUFyQixJQUN6QixRQUFPd1csVUFBVSxDQUFWLENBQVAsTUFBd0IsUUFENUIsRUFDdUM7QUFDckMsc0JBQUlxSCxPQUFPckgsVUFBVXhXLE1BQVYsS0FBcUIsQ0FBckIsR0FBeUJ3VyxVQUFVLENBQVYsQ0FBekIsR0FBd0NyTCxTQUFuRDtBQUNBLHlCQUFPLElBQUlsSCxPQUFKLENBQVksVUFBU3RELE9BQVQsRUFBa0JtQyxNQUFsQixFQUEwQjtBQUMzQzZWLGlDQUFhRSxLQUFiLENBQW1Cak4sRUFBbkIsRUFBdUIsQ0FBQ2pMLE9BQUQsRUFBVW1DLE1BQVYsRUFBa0IrYSxJQUFsQixDQUF2QjtBQUNELG1CQUZNLENBQVA7QUFHRDtBQUNELHVCQUFPbEYsYUFBYUUsS0FBYixDQUFtQixJQUFuQixFQUF5QnJDLFNBQXpCLENBQVA7QUFDRCxlQVZEO0FBV0QsYUFiRDtBQWNEOztBQUVEO0FBQ0EsV0FBQyxxQkFBRCxFQUF3QixzQkFBeEIsRUFBZ0QsaUJBQWhELEVBQ0s3VyxPQURMLENBQ2EsVUFBUzBNLE1BQVQsRUFBaUI7QUFDeEIsZ0JBQUlzTSxlQUFlcGEsT0FBT3FDLGlCQUFQLENBQXlCa04sU0FBekIsQ0FBbUN6QixNQUFuQyxDQUFuQjtBQUNBOU4sbUJBQU9xQyxpQkFBUCxDQUF5QmtOLFNBQXpCLENBQW1DekIsTUFBbkMsSUFBNkMsWUFBVztBQUN0RG1LLHdCQUFVLENBQVYsSUFBZSxLQUFNbkssV0FBVyxpQkFBWixHQUNoQjlOLE9BQU9vRSxlQURTLEdBRWhCcEUsT0FBT3VDLHFCQUZJLEVBRW1CMFYsVUFBVSxDQUFWLENBRm5CLENBQWY7QUFHQSxxQkFBT21DLGFBQWFFLEtBQWIsQ0FBbUIsSUFBbkIsRUFBeUJyQyxTQUF6QixDQUFQO0FBQ0QsYUFMRDtBQU1ELFdBVEw7O0FBV0E7QUFDQSxjQUFJeU8sd0JBQ0ExbUIsT0FBT3FDLGlCQUFQLENBQXlCa04sU0FBekIsQ0FBbUNsTSxlQUR2QztBQUVBckQsaUJBQU9xQyxpQkFBUCxDQUF5QmtOLFNBQXpCLENBQW1DbE0sZUFBbkMsR0FBcUQsWUFBVztBQUM5RCxnQkFBSSxDQUFDNFUsVUFBVSxDQUFWLENBQUwsRUFBbUI7QUFDakIsa0JBQUlBLFVBQVUsQ0FBVixDQUFKLEVBQWtCO0FBQ2hCQSwwQkFBVSxDQUFWLEVBQWFxQyxLQUFiLENBQW1CLElBQW5CO0FBQ0Q7QUFDRCxxQkFBTzVVLFFBQVF0RCxPQUFSLEVBQVA7QUFDRDtBQUNELG1CQUFPc2tCLHNCQUFzQnBNLEtBQXRCLENBQTRCLElBQTVCLEVBQWtDckMsU0FBbEMsQ0FBUDtBQUNELFdBUkQ7QUFTRDtBQTF0QmMsT0FBakI7QUE2dEJDLEtBM3VCeUksRUEydUJ4SSxFQUFDLGVBQWMsRUFBZixFQUFrQixrQkFBaUIsQ0FBbkMsRUEzdUJ3SSxDQXRrRmdxQixFQWl6R2p3QixHQUFFLENBQUMsVUFBU3BSLE9BQVQsRUFBaUJULE1BQWpCLEVBQXdCRCxPQUF4QixFQUFnQztBQUM1RTs7Ozs7OztBQU9DO0FBQ0Q7O0FBQ0EsVUFBSWlaLFFBQVF2WSxRQUFRLGFBQVIsQ0FBWjtBQUNBLFVBQUlpWixVQUFVVixNQUFNMWdCLEdBQXBCOztBQUVBO0FBQ0EwSCxhQUFPRCxPQUFQLEdBQWlCLFVBQVNuRyxNQUFULEVBQWlCO0FBQ2hDLFlBQUkrZixpQkFBaUJYLE1BQU1ZLGFBQU4sQ0FBb0JoZ0IsTUFBcEIsQ0FBckI7QUFDQSxZQUFJMm1CLFlBQVkzbUIsVUFBVUEsT0FBTzJtQixTQUFqQzs7QUFFQSxZQUFJQyx1QkFBdUIsU0FBdkJBLG9CQUF1QixDQUFTM04sQ0FBVCxFQUFZO0FBQ3JDLGNBQUksUUFBT0EsQ0FBUCx5Q0FBT0EsQ0FBUCxPQUFhLFFBQWIsSUFBeUJBLEVBQUVmLFNBQTNCLElBQXdDZSxFQUFFZCxRQUE5QyxFQUF3RDtBQUN0RCxtQkFBT2MsQ0FBUDtBQUNEO0FBQ0QsY0FBSTROLEtBQUssRUFBVDtBQUNBaGhCLGlCQUFPQyxJQUFQLENBQVltVCxDQUFaLEVBQWU3WCxPQUFmLENBQXVCLFVBQVN3ZSxHQUFULEVBQWM7QUFDbkMsZ0JBQUlBLFFBQVEsU0FBUixJQUFxQkEsUUFBUSxVQUE3QixJQUEyQ0EsUUFBUSxhQUF2RCxFQUFzRTtBQUNwRTtBQUNEO0FBQ0QsZ0JBQUlwWixJQUFLLFFBQU95UyxFQUFFMkcsR0FBRixDQUFQLE1BQWtCLFFBQW5CLEdBQStCM0csRUFBRTJHLEdBQUYsQ0FBL0IsR0FBd0MsRUFBQ2tILE9BQU83TixFQUFFMkcsR0FBRixDQUFSLEVBQWhEO0FBQ0EsZ0JBQUlwWixFQUFFdWdCLEtBQUYsS0FBWW5hLFNBQVosSUFBeUIsT0FBT3BHLEVBQUV1Z0IsS0FBVCxLQUFtQixRQUFoRCxFQUEwRDtBQUN4RHZnQixnQkFBRXFFLEdBQUYsR0FBUXJFLEVBQUV3Z0IsR0FBRixHQUFReGdCLEVBQUV1Z0IsS0FBbEI7QUFDRDtBQUNELGdCQUFJRSxXQUFXLFNBQVhBLFFBQVcsQ0FBU25NLE1BQVQsRUFBaUJ2ZCxJQUFqQixFQUF1QjtBQUNwQyxrQkFBSXVkLE1BQUosRUFBWTtBQUNWLHVCQUFPQSxTQUFTdmQsS0FBSzJwQixNQUFMLENBQVksQ0FBWixFQUFlL0wsV0FBZixFQUFULEdBQXdDNWQsS0FBS21FLEtBQUwsQ0FBVyxDQUFYLENBQS9DO0FBQ0Q7QUFDRCxxQkFBUW5FLFNBQVMsVUFBVixHQUF3QixVQUF4QixHQUFxQ0EsSUFBNUM7QUFDRCxhQUxEO0FBTUEsZ0JBQUlpSixFQUFFc2dCLEtBQUYsS0FBWWxhLFNBQWhCLEVBQTJCO0FBQ3pCaWEsaUJBQUcxTyxRQUFILEdBQWMwTyxHQUFHMU8sUUFBSCxJQUFlLEVBQTdCO0FBQ0Esa0JBQUlnUCxLQUFLLEVBQVQ7QUFDQSxrQkFBSSxPQUFPM2dCLEVBQUVzZ0IsS0FBVCxLQUFtQixRQUF2QixFQUFpQztBQUMvQkssbUJBQUdGLFNBQVMsS0FBVCxFQUFnQnJILEdBQWhCLENBQUgsSUFBMkJwWixFQUFFc2dCLEtBQTdCO0FBQ0FELG1CQUFHMU8sUUFBSCxDQUFZN1csSUFBWixDQUFpQjZsQixFQUFqQjtBQUNBQSxxQkFBSyxFQUFMO0FBQ0FBLG1CQUFHRixTQUFTLEtBQVQsRUFBZ0JySCxHQUFoQixDQUFILElBQTJCcFosRUFBRXNnQixLQUE3QjtBQUNBRCxtQkFBRzFPLFFBQUgsQ0FBWTdXLElBQVosQ0FBaUI2bEIsRUFBakI7QUFDRCxlQU5ELE1BTU87QUFDTEEsbUJBQUdGLFNBQVMsRUFBVCxFQUFhckgsR0FBYixDQUFILElBQXdCcFosRUFBRXNnQixLQUExQjtBQUNBRCxtQkFBRzFPLFFBQUgsQ0FBWTdXLElBQVosQ0FBaUI2bEIsRUFBakI7QUFDRDtBQUNGO0FBQ0QsZ0JBQUkzZ0IsRUFBRXVnQixLQUFGLEtBQVluYSxTQUFaLElBQXlCLE9BQU9wRyxFQUFFdWdCLEtBQVQsS0FBbUIsUUFBaEQsRUFBMEQ7QUFDeERGLGlCQUFHM08sU0FBSCxHQUFlMk8sR0FBRzNPLFNBQUgsSUFBZ0IsRUFBL0I7QUFDQTJPLGlCQUFHM08sU0FBSCxDQUFhK08sU0FBUyxFQUFULEVBQWFySCxHQUFiLENBQWIsSUFBa0NwWixFQUFFdWdCLEtBQXBDO0FBQ0QsYUFIRCxNQUdPO0FBQ0wsZUFBQyxLQUFELEVBQVEsS0FBUixFQUFlM2xCLE9BQWYsQ0FBdUIsVUFBU2dtQixHQUFULEVBQWM7QUFDbkMsb0JBQUk1Z0IsRUFBRTRnQixHQUFGLE1BQVd4YSxTQUFmLEVBQTBCO0FBQ3hCaWEscUJBQUczTyxTQUFILEdBQWUyTyxHQUFHM08sU0FBSCxJQUFnQixFQUEvQjtBQUNBMk8scUJBQUczTyxTQUFILENBQWErTyxTQUFTRyxHQUFULEVBQWN4SCxHQUFkLENBQWIsSUFBbUNwWixFQUFFNGdCLEdBQUYsQ0FBbkM7QUFDRDtBQUNGLGVBTEQ7QUFNRDtBQUNGLFdBdkNEO0FBd0NBLGNBQUluTyxFQUFFb08sUUFBTixFQUFnQjtBQUNkUixlQUFHMU8sUUFBSCxHQUFjLENBQUMwTyxHQUFHMU8sUUFBSCxJQUFlLEVBQWhCLEVBQW9Cd0UsTUFBcEIsQ0FBMkIxRCxFQUFFb08sUUFBN0IsQ0FBZDtBQUNEO0FBQ0QsaUJBQU9SLEVBQVA7QUFDRCxTQWpERDs7QUFtREEsWUFBSVMsbUJBQW1CLFNBQW5CQSxnQkFBbUIsQ0FBU0MsV0FBVCxFQUFzQkMsSUFBdEIsRUFBNEI7QUFDakQsY0FBSXpILGVBQWV2QixPQUFmLElBQTBCLEVBQTlCLEVBQWtDO0FBQ2hDLG1CQUFPZ0osS0FBS0QsV0FBTCxDQUFQO0FBQ0Q7QUFDREEsd0JBQWMzaUIsS0FBS0MsS0FBTCxDQUFXRCxLQUFLcUIsU0FBTCxDQUFlc2hCLFdBQWYsQ0FBWCxDQUFkO0FBQ0EsY0FBSUEsZUFBZSxRQUFPQSxZQUFZRSxLQUFuQixNQUE2QixRQUFoRCxFQUEwRDtBQUN4RCxnQkFBSUMsUUFBUSxTQUFSQSxLQUFRLENBQVN6SixHQUFULEVBQWNyWCxDQUFkLEVBQWlCK2dCLENBQWpCLEVBQW9CO0FBQzlCLGtCQUFJL2dCLEtBQUtxWCxHQUFMLElBQVksRUFBRTBKLEtBQUsxSixHQUFQLENBQWhCLEVBQTZCO0FBQzNCQSxvQkFBSTBKLENBQUosSUFBUzFKLElBQUlyWCxDQUFKLENBQVQ7QUFDQSx1QkFBT3FYLElBQUlyWCxDQUFKLENBQVA7QUFDRDtBQUNGLGFBTEQ7QUFNQTJnQiwwQkFBYzNpQixLQUFLQyxLQUFMLENBQVdELEtBQUtxQixTQUFMLENBQWVzaEIsV0FBZixDQUFYLENBQWQ7QUFDQUcsa0JBQU1ILFlBQVlFLEtBQWxCLEVBQXlCLGlCQUF6QixFQUE0QyxxQkFBNUM7QUFDQUMsa0JBQU1ILFlBQVlFLEtBQWxCLEVBQXlCLGtCQUF6QixFQUE2QyxzQkFBN0M7QUFDQUYsd0JBQVlFLEtBQVosR0FBb0JiLHFCQUFxQlcsWUFBWUUsS0FBakMsQ0FBcEI7QUFDRDtBQUNELGNBQUlGLGVBQWUsUUFBT0EsWUFBWUssS0FBbkIsTUFBNkIsUUFBaEQsRUFBMEQ7QUFDeEQ7QUFDQSxnQkFBSUMsT0FBT04sWUFBWUssS0FBWixDQUFrQkUsVUFBN0I7QUFDQUQsbUJBQU9BLFNBQVUsUUFBT0EsSUFBUCx5Q0FBT0EsSUFBUCxPQUFnQixRQUFqQixHQUE2QkEsSUFBN0IsR0FBb0MsRUFBQ2YsT0FBT2UsSUFBUixFQUE3QyxDQUFQO0FBQ0EsZ0JBQUlFLDZCQUE2QmhJLGVBQWV2QixPQUFmLEdBQXlCLEVBQTFEOztBQUVBLGdCQUFLcUosU0FBU0EsS0FBS2QsS0FBTCxLQUFlLE1BQWYsSUFBeUJjLEtBQUtkLEtBQUwsS0FBZSxhQUF4QyxJQUNBYyxLQUFLZixLQUFMLEtBQWUsTUFEZixJQUN5QmUsS0FBS2YsS0FBTCxLQUFlLGFBRGpELENBQUQsSUFFQSxFQUFFSCxVQUFVcUIsWUFBVixDQUF1QkMsdUJBQXZCLElBQ0F0QixVQUFVcUIsWUFBVixDQUF1QkMsdUJBQXZCLEdBQWlESCxVQURqRCxJQUVBLENBQUNDLDBCQUZILENBRkosRUFJb0M7QUFDbEMscUJBQU9SLFlBQVlLLEtBQVosQ0FBa0JFLFVBQXpCO0FBQ0Esa0JBQUlJLE9BQUo7QUFDQSxrQkFBSUwsS0FBS2QsS0FBTCxLQUFlLGFBQWYsSUFBZ0NjLEtBQUtmLEtBQUwsS0FBZSxhQUFuRCxFQUFrRTtBQUNoRW9CLDBCQUFVLENBQUMsTUFBRCxFQUFTLE1BQVQsQ0FBVjtBQUNELGVBRkQsTUFFTyxJQUFJTCxLQUFLZCxLQUFMLEtBQWUsTUFBZixJQUF5QmMsS0FBS2YsS0FBTCxLQUFlLE1BQTVDLEVBQW9EO0FBQ3pEb0IsMEJBQVUsQ0FBQyxPQUFELENBQVY7QUFDRDtBQUNELGtCQUFJQSxPQUFKLEVBQWE7QUFDWDtBQUNBLHVCQUFPdkIsVUFBVXFCLFlBQVYsQ0FBdUJHLGdCQUF2QixHQUNOam5CLElBRE0sQ0FDRCxVQUFTa25CLE9BQVQsRUFBa0I7QUFDdEJBLDRCQUFVQSxRQUFRdmYsTUFBUixDQUFlLFVBQVN3ZixDQUFULEVBQVk7QUFDbkMsMkJBQU9BLEVBQUU3Z0IsSUFBRixLQUFXLFlBQWxCO0FBQ0QsbUJBRlMsQ0FBVjtBQUdBLHNCQUFJOGdCLE1BQU1GLFFBQVF0YyxJQUFSLENBQWEsVUFBU3VjLENBQVQsRUFBWTtBQUNqQywyQkFBT0gsUUFBUUssSUFBUixDQUFhLFVBQVNDLEtBQVQsRUFBZ0I7QUFDbEMsNkJBQU9ILEVBQUVJLEtBQUYsQ0FBUWhlLFdBQVIsR0FBc0JyQixPQUF0QixDQUE4Qm9mLEtBQTlCLE1BQXlDLENBQUMsQ0FBakQ7QUFDRCxxQkFGTSxDQUFQO0FBR0QsbUJBSlMsQ0FBVjtBQUtBLHNCQUFJLENBQUNGLEdBQUQsSUFBUUYsUUFBUTNtQixNQUFoQixJQUEwQnltQixRQUFROWUsT0FBUixDQUFnQixNQUFoQixNQUE0QixDQUFDLENBQTNELEVBQThEO0FBQzVEa2YsMEJBQU1GLFFBQVFBLFFBQVEzbUIsTUFBUixHQUFpQixDQUF6QixDQUFOLENBRDRELENBQ3pCO0FBQ3BDO0FBQ0Qsc0JBQUk2bUIsR0FBSixFQUFTO0FBQ1BmLGdDQUFZSyxLQUFaLENBQWtCYyxRQUFsQixHQUE2QmIsS0FBS2QsS0FBTCxHQUFhLEVBQUNBLE9BQU91QixJQUFJSSxRQUFaLEVBQWIsR0FDYSxFQUFDNUIsT0FBT3dCLElBQUlJLFFBQVosRUFEMUM7QUFFRDtBQUNEbkIsOEJBQVlLLEtBQVosR0FBb0JoQixxQkFBcUJXLFlBQVlLLEtBQWpDLENBQXBCO0FBQ0E5SCwwQkFBUSxhQUFhbGIsS0FBS3FCLFNBQUwsQ0FBZXNoQixXQUFmLENBQXJCO0FBQ0EseUJBQU9DLEtBQUtELFdBQUwsQ0FBUDtBQUNELGlCQXBCTSxDQUFQO0FBcUJEO0FBQ0Y7QUFDREEsd0JBQVlLLEtBQVosR0FBb0JoQixxQkFBcUJXLFlBQVlLLEtBQWpDLENBQXBCO0FBQ0Q7QUFDRDlILGtCQUFRLGFBQWFsYixLQUFLcUIsU0FBTCxDQUFlc2hCLFdBQWYsQ0FBckI7QUFDQSxpQkFBT0MsS0FBS0QsV0FBTCxDQUFQO0FBQ0QsU0FoRUQ7O0FBa0VBLFlBQUlvQixhQUFhLFNBQWJBLFVBQWEsQ0FBU3BsQixDQUFULEVBQVk7QUFDM0IsaUJBQU87QUFDTGhHLGtCQUFNO0FBQ0pxckIscUNBQXVCLGlCQURuQjtBQUVKQyx3Q0FBMEIsaUJBRnRCO0FBR0pwYyxpQ0FBbUIsaUJBSGY7QUFJSnFjLG9DQUFzQixlQUpsQjtBQUtKQywyQ0FBNkIsc0JBTHpCO0FBTUpDLCtCQUFpQixrQkFOYjtBQU9KQyw4Q0FBZ0MsaUJBUDVCO0FBUUpDLHVDQUF5QixpQkFSckI7QUFTSkMsK0JBQWlCLFlBVGI7QUFVSkMsa0NBQW9CLFlBVmhCO0FBV0pDLGtDQUFvQjtBQVhoQixjQVlKOWxCLEVBQUVoRyxJQVpFLEtBWU9nRyxFQUFFaEcsSUFiVjtBQWNMb0gscUJBQVNwQixFQUFFb0IsT0FkTjtBQWVMMmtCLHdCQUFZL2xCLEVBQUVnbUIsY0FmVDtBQWdCTC9PLHNCQUFVLG9CQUFXO0FBQ25CLHFCQUFPLEtBQUtqZCxJQUFMLElBQWEsS0FBS29ILE9BQUwsSUFBZ0IsSUFBN0IsSUFBcUMsS0FBS0EsT0FBakQ7QUFDRDtBQWxCSSxXQUFQO0FBb0JELFNBckJEOztBQXVCQSxZQUFJNmtCLGdCQUFnQixTQUFoQkEsYUFBZ0IsQ0FBU2pDLFdBQVQsRUFBc0JrQyxTQUF0QixFQUFpQ0MsT0FBakMsRUFBMEM7QUFDNURwQywyQkFBaUJDLFdBQWpCLEVBQThCLFVBQVN0TyxDQUFULEVBQVk7QUFDeEMwTixzQkFBVWdELGtCQUFWLENBQTZCMVEsQ0FBN0IsRUFBZ0N3USxTQUFoQyxFQUEyQyxVQUFTbG1CLENBQVQsRUFBWTtBQUNyRCxrQkFBSW1tQixPQUFKLEVBQWE7QUFDWEEsd0JBQVFmLFdBQVdwbEIsQ0FBWCxDQUFSO0FBQ0Q7QUFDRixhQUpEO0FBS0QsV0FORDtBQU9ELFNBUkQ7O0FBVUFvakIsa0JBQVVpRCxZQUFWLEdBQXlCSixhQUF6Qjs7QUFFQTtBQUNBLFlBQUlLLHVCQUF1QixTQUF2QkEsb0JBQXVCLENBQVN0QyxXQUFULEVBQXNCO0FBQy9DLGlCQUFPLElBQUk3aEIsT0FBSixDQUFZLFVBQVN0RCxPQUFULEVBQWtCbUMsTUFBbEIsRUFBMEI7QUFDM0NvaUIsc0JBQVVpRCxZQUFWLENBQXVCckMsV0FBdkIsRUFBb0NubEIsT0FBcEMsRUFBNkNtQyxNQUE3QztBQUNELFdBRk0sQ0FBUDtBQUdELFNBSkQ7O0FBTUEsWUFBSSxDQUFDb2lCLFVBQVVxQixZQUFmLEVBQTZCO0FBQzNCckIsb0JBQVVxQixZQUFWLEdBQXlCO0FBQ3ZCNEIsMEJBQWNDLG9CQURTO0FBRXZCMUIsOEJBQWtCLDRCQUFXO0FBQzNCLHFCQUFPLElBQUl6aUIsT0FBSixDQUFZLFVBQVN0RCxPQUFULEVBQWtCO0FBQ25DLG9CQUFJMG5CLFFBQVEsRUFBQ3JDLE9BQU8sWUFBUixFQUFzQkcsT0FBTyxZQUE3QixFQUFaO0FBQ0EsdUJBQU81bkIsT0FBTytwQixnQkFBUCxDQUF3QkMsVUFBeEIsQ0FBbUMsVUFBUzVCLE9BQVQsRUFBa0I7QUFDMURobUIsMEJBQVFnbUIsUUFBUTVXLEdBQVIsQ0FBWSxVQUFTeVksTUFBVCxFQUFpQjtBQUNuQywyQkFBTyxFQUFDeEIsT0FBT3dCLE9BQU94QixLQUFmO0FBQ0xqaEIsNEJBQU1zaUIsTUFBTUcsT0FBT3ppQixJQUFiLENBREQ7QUFFTGtoQixnQ0FBVXVCLE9BQU81cEIsRUFGWjtBQUdMNnBCLCtCQUFTLEVBSEosRUFBUDtBQUlELG1CQUxPLENBQVI7QUFNRCxpQkFQTSxDQUFQO0FBUUQsZUFWTSxDQUFQO0FBV0QsYUFkc0I7QUFldkJqQyxxQ0FBeUIsbUNBQVc7QUFDbEMscUJBQU87QUFDTFMsMEJBQVUsSUFETCxFQUNXeUIsa0JBQWtCLElBRDdCLEVBQ21DckMsWUFBWSxJQUQvQztBQUVMc0MsMkJBQVcsSUFGTixFQUVZQyxRQUFRLElBRnBCLEVBRTBCQyxPQUFPO0FBRmpDLGVBQVA7QUFJRDtBQXBCc0IsV0FBekI7QUFzQkQ7O0FBRUQ7QUFDQTtBQUNBLFlBQUksQ0FBQzNELFVBQVVxQixZQUFWLENBQXVCNEIsWUFBNUIsRUFBMEM7QUFDeENqRCxvQkFBVXFCLFlBQVYsQ0FBdUI0QixZQUF2QixHQUFzQyxVQUFTckMsV0FBVCxFQUFzQjtBQUMxRCxtQkFBT3NDLHFCQUFxQnRDLFdBQXJCLENBQVA7QUFDRCxXQUZEO0FBR0QsU0FKRCxNQUlPO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsY0FBSWdELG1CQUFtQjVELFVBQVVxQixZQUFWLENBQXVCNEIsWUFBdkIsQ0FDbkI3YixJQURtQixDQUNkNFksVUFBVXFCLFlBREksQ0FBdkI7QUFFQXJCLG9CQUFVcUIsWUFBVixDQUF1QjRCLFlBQXZCLEdBQXNDLFVBQVNZLEVBQVQsRUFBYTtBQUNqRCxtQkFBT2xELGlCQUFpQmtELEVBQWpCLEVBQXFCLFVBQVN2UixDQUFULEVBQVk7QUFDdEMscUJBQU9zUixpQkFBaUJ0UixDQUFqQixFQUFvQi9YLElBQXBCLENBQXlCLFVBQVNyQyxNQUFULEVBQWlCO0FBQy9DLG9CQUFJb2EsRUFBRXdPLEtBQUYsSUFBVyxDQUFDNW9CLE9BQU9pYSxjQUFQLEdBQXdCclgsTUFBcEMsSUFDQXdYLEVBQUUyTyxLQUFGLElBQVcsQ0FBQy9vQixPQUFPa2EsY0FBUCxHQUF3QnRYLE1BRHhDLEVBQ2dEO0FBQzlDNUMseUJBQU9rUyxTQUFQLEdBQW1CM1AsT0FBbkIsQ0FBMkIsVUFBUytHLEtBQVQsRUFBZ0I7QUFDekNBLDBCQUFNb0osSUFBTjtBQUNELG1CQUZEO0FBR0Esd0JBQU0sSUFBSW1TLFlBQUosQ0FBaUIsRUFBakIsRUFBcUIsZUFBckIsQ0FBTjtBQUNEO0FBQ0QsdUJBQU83a0IsTUFBUDtBQUNELGVBVE0sRUFTSixVQUFTMEUsQ0FBVCxFQUFZO0FBQ2IsdUJBQU9tQyxRQUFRbkIsTUFBUixDQUFlb2tCLFdBQVdwbEIsQ0FBWCxDQUFmLENBQVA7QUFDRCxlQVhNLENBQVA7QUFZRCxhQWJNLENBQVA7QUFjRCxXQWZEO0FBZ0JEOztBQUVEO0FBQ0E7QUFDQSxZQUFJLE9BQU9vakIsVUFBVXFCLFlBQVYsQ0FBdUI1VyxnQkFBOUIsS0FBbUQsV0FBdkQsRUFBb0U7QUFDbEV1VixvQkFBVXFCLFlBQVYsQ0FBdUI1VyxnQkFBdkIsR0FBMEMsWUFBVztBQUNuRDBPLG9CQUFRLDZDQUFSO0FBQ0QsV0FGRDtBQUdEO0FBQ0QsWUFBSSxPQUFPNkcsVUFBVXFCLFlBQVYsQ0FBdUJ4VixtQkFBOUIsS0FBc0QsV0FBMUQsRUFBdUU7QUFDckVtVSxvQkFBVXFCLFlBQVYsQ0FBdUJ4VixtQkFBdkIsR0FBNkMsWUFBVztBQUN0RHNOLG9CQUFRLGdEQUFSO0FBQ0QsV0FGRDtBQUdEO0FBQ0YsT0F0T0Q7QUF3T0MsS0F0UDBDLEVBc1B6QyxFQUFDLGVBQWMsRUFBZixFQXRQeUMsQ0FqekcrdkIsRUF1aUhweEIsR0FBRSxDQUFDLFVBQVNqWixPQUFULEVBQWlCVCxNQUFqQixFQUF3QkQsT0FBeEIsRUFBZ0M7QUFDekQ7Ozs7Ozs7QUFPQztBQUNEOztBQUVBLFVBQUllLFdBQVdMLFFBQVEsS0FBUixDQUFmO0FBQ0EsVUFBSXVZLFFBQVF2WSxRQUFRLFNBQVIsQ0FBWjs7QUFFQVQsYUFBT0QsT0FBUCxHQUFpQjtBQUNmaWIsNkJBQXFCLDZCQUFTcGhCLE1BQVQsRUFBaUI7QUFDcEM7QUFDQTtBQUNBLGNBQUksQ0FBQ0EsT0FBT29FLGVBQVIsSUFBNEJwRSxPQUFPb0UsZUFBUCxJQUEwQixnQkFDdERwRSxPQUFPb0UsZUFBUCxDQUF1Qm1MLFNBRDNCLEVBQ3VDO0FBQ3JDO0FBQ0Q7O0FBRUQsY0FBSWtiLHdCQUF3QnpxQixPQUFPb0UsZUFBbkM7QUFDQXBFLGlCQUFPb0UsZUFBUCxHQUF5QixVQUFTaVcsSUFBVCxFQUFlO0FBQ3RDO0FBQ0EsZ0JBQUksUUFBT0EsSUFBUCx5Q0FBT0EsSUFBUCxPQUFnQixRQUFoQixJQUE0QkEsS0FBSzdXLFNBQWpDLElBQ0E2VyxLQUFLN1csU0FBTCxDQUFlNEYsT0FBZixDQUF1QixJQUF2QixNQUFpQyxDQURyQyxFQUN3QztBQUN0Q2lSLHFCQUFPelYsS0FBS0MsS0FBTCxDQUFXRCxLQUFLcUIsU0FBTCxDQUFlb1UsSUFBZixDQUFYLENBQVA7QUFDQUEsbUJBQUs3VyxTQUFMLEdBQWlCNlcsS0FBSzdXLFNBQUwsQ0FBZW1TLE1BQWYsQ0FBc0IsQ0FBdEIsQ0FBakI7QUFDRDs7QUFFRCxnQkFBSTBFLEtBQUs3VyxTQUFMLElBQWtCNlcsS0FBSzdXLFNBQUwsQ0FBZS9CLE1BQXJDLEVBQTZDO0FBQzNDO0FBQ0Esa0JBQUlpcEIsa0JBQWtCLElBQUlELHFCQUFKLENBQTBCcFEsSUFBMUIsQ0FBdEI7QUFDQSxrQkFBSXNRLGtCQUFrQnpqQixTQUFTK0wsY0FBVCxDQUF3Qm9ILEtBQUs3VyxTQUE3QixDQUF0QjtBQUNBLGtCQUFJb25CLHFCQUFxQixTQUFjRixlQUFkLEVBQ3JCQyxlQURxQixDQUF6Qjs7QUFHQTtBQUNBQyxpQ0FBbUIxWCxNQUFuQixHQUE0QixZQUFXO0FBQ3JDLHVCQUFPO0FBQ0wxUCw2QkFBV29uQixtQkFBbUJwbkIsU0FEekI7QUFFTGtQLDBCQUFRa1ksbUJBQW1CbFksTUFGdEI7QUFHTFosaUNBQWU4WSxtQkFBbUI5WSxhQUg3QjtBQUlMZ0Isb0NBQWtCOFgsbUJBQW1COVg7QUFKaEMsaUJBQVA7QUFNRCxlQVBEO0FBUUEscUJBQU84WCxrQkFBUDtBQUNEO0FBQ0QsbUJBQU8sSUFBSUgscUJBQUosQ0FBMEJwUSxJQUExQixDQUFQO0FBQ0QsV0EzQkQ7QUE0QkFyYSxpQkFBT29FLGVBQVAsQ0FBdUJtTCxTQUF2QixHQUFtQ2tiLHNCQUFzQmxiLFNBQXpEOztBQUVBO0FBQ0E7QUFDQTZQLGdCQUFNZ0QsdUJBQU4sQ0FBOEJwaUIsTUFBOUIsRUFBc0MsY0FBdEMsRUFBc0QsVUFBU3VELENBQVQsRUFBWTtBQUNoRSxnQkFBSUEsRUFBRUMsU0FBTixFQUFpQjtBQUNmcUMscUJBQU9tTSxjQUFQLENBQXNCek8sQ0FBdEIsRUFBeUIsV0FBekIsRUFBc0M7QUFDcEMwTyx1QkFBTyxJQUFJalMsT0FBT29FLGVBQVgsQ0FBMkJiLEVBQUVDLFNBQTdCLENBRDZCO0FBRXBDME8sMEJBQVU7QUFGMEIsZUFBdEM7QUFJRDtBQUNELG1CQUFPM08sQ0FBUDtBQUNELFdBUkQ7QUFTRCxTQW5EYzs7QUFxRGY7O0FBRUFzZCw2QkFBcUIsNkJBQVM3Z0IsTUFBVCxFQUFpQjtBQUNwQyxjQUFJaWpCLE1BQU1qakIsVUFBVUEsT0FBT2lqQixHQUEzQjs7QUFFQSxjQUFJLEVBQUUsUUFBT2pqQixNQUFQLHlDQUFPQSxNQUFQLE9BQWtCLFFBQWxCLElBQThCQSxPQUFPa2pCLGdCQUFyQyxJQUNBLGVBQWVsakIsT0FBT2tqQixnQkFBUCxDQUF3QjNULFNBRHZDLElBRUYwVCxJQUFJSyxlQUZGLElBRXFCTCxJQUFJSSxlQUYzQixDQUFKLEVBRWlEO0FBQy9DO0FBQ0EsbUJBQU96VyxTQUFQO0FBQ0Q7O0FBRUQsY0FBSWllLHdCQUF3QjVILElBQUlLLGVBQUosQ0FBb0J2VixJQUFwQixDQUF5QmtWLEdBQXpCLENBQTVCO0FBQ0EsY0FBSTZILHdCQUF3QjdILElBQUlJLGVBQUosQ0FBb0J0VixJQUFwQixDQUF5QmtWLEdBQXpCLENBQTVCO0FBQ0EsY0FBSXZmLFVBQVUsSUFBSW9XLEdBQUosRUFBZDtBQUFBLGNBQXlCaVIsUUFBUSxDQUFqQzs7QUFFQTlILGNBQUlLLGVBQUosR0FBc0IsVUFBU3prQixNQUFULEVBQWlCO0FBQ3JDLGdCQUFJLGVBQWVBLE1BQW5CLEVBQTJCO0FBQ3pCLGtCQUFJbUssTUFBTSxjQUFlLEVBQUUraEIsS0FBM0I7QUFDQXJuQixzQkFBUXdXLEdBQVIsQ0FBWWxSLEdBQVosRUFBaUJuSyxNQUFqQjtBQUNBdWdCLG9CQUFNc0csVUFBTixDQUFpQiw2QkFBakIsRUFDSSx5QkFESjtBQUVBLHFCQUFPMWMsR0FBUDtBQUNEO0FBQ0QsbUJBQU82aEIsc0JBQXNCaHNCLE1BQXRCLENBQVA7QUFDRCxXQVREO0FBVUFva0IsY0FBSUksZUFBSixHQUFzQixVQUFTcmEsR0FBVCxFQUFjO0FBQ2xDOGhCLGtDQUFzQjloQixHQUF0QjtBQUNBdEYsOEJBQWVzRixHQUFmO0FBQ0QsV0FIRDs7QUFLQSxjQUFJZ2lCLE1BQU1ubEIsT0FBT2tmLHdCQUFQLENBQWdDL2tCLE9BQU9rakIsZ0JBQVAsQ0FBd0IzVCxTQUF4RCxFQUNnQyxLQURoQyxDQUFWO0FBRUExSixpQkFBT21NLGNBQVAsQ0FBc0JoUyxPQUFPa2pCLGdCQUFQLENBQXdCM1QsU0FBOUMsRUFBeUQsS0FBekQsRUFBZ0U7QUFDOUQwSCxpQkFBSyxlQUFXO0FBQ2QscUJBQU8rVCxJQUFJL1QsR0FBSixDQUFRcUQsS0FBUixDQUFjLElBQWQsQ0FBUDtBQUNELGFBSDZEO0FBSTlESixpQkFBSyxhQUFTbFIsR0FBVCxFQUFjO0FBQ2pCLG1CQUFLbEssU0FBTCxHQUFpQjRFLFFBQVF1VCxHQUFSLENBQVlqTyxHQUFaLEtBQW9CLElBQXJDO0FBQ0EscUJBQU9naUIsSUFBSTlRLEdBQUosQ0FBUUksS0FBUixDQUFjLElBQWQsRUFBb0IsQ0FBQ3RSLEdBQUQsQ0FBcEIsQ0FBUDtBQUNEO0FBUDZELFdBQWhFOztBQVVBLGNBQUlpaUIscUJBQXFCanJCLE9BQU9rakIsZ0JBQVAsQ0FBd0IzVCxTQUF4QixDQUFrQzJiLFlBQTNEO0FBQ0FsckIsaUJBQU9rakIsZ0JBQVAsQ0FBd0IzVCxTQUF4QixDQUFrQzJiLFlBQWxDLEdBQWlELFlBQVc7QUFDMUQsZ0JBQUlqVCxVQUFVeFcsTUFBVixLQUFxQixDQUFyQixJQUNBLENBQUMsS0FBS3dXLFVBQVUsQ0FBVixDQUFOLEVBQW9CeE4sV0FBcEIsT0FBc0MsS0FEMUMsRUFDaUQ7QUFDL0MsbUJBQUszTCxTQUFMLEdBQWlCNEUsUUFBUXVULEdBQVIsQ0FBWWdCLFVBQVUsQ0FBVixDQUFaLEtBQTZCLElBQTlDO0FBQ0Q7QUFDRCxtQkFBT2dULG1CQUFtQjNRLEtBQW5CLENBQXlCLElBQXpCLEVBQStCckMsU0FBL0IsQ0FBUDtBQUNELFdBTkQ7QUFPRCxTQXhHYzs7QUEwR2ZvSiw0QkFBb0IsNEJBQVNyaEIsTUFBVCxFQUFpQjtBQUNuQyxjQUFJQSxPQUFPbXJCLGdCQUFQLElBQTJCLENBQUNuckIsT0FBT3FDLGlCQUF2QyxFQUEwRDtBQUN4RDtBQUNEO0FBQ0QsY0FBSTBkLGlCQUFpQlgsTUFBTVksYUFBTixDQUFvQmhnQixNQUFwQixDQUFyQjs7QUFFQSxjQUFJLEVBQUUsVUFBVUEsT0FBT3FDLGlCQUFQLENBQXlCa04sU0FBckMsQ0FBSixFQUFxRDtBQUNuRDFKLG1CQUFPbU0sY0FBUCxDQUFzQmhTLE9BQU9xQyxpQkFBUCxDQUF5QmtOLFNBQS9DLEVBQTBELE1BQTFELEVBQWtFO0FBQ2hFMEgsbUJBQUssZUFBVztBQUNkLHVCQUFPLE9BQU8sS0FBS21VLEtBQVosS0FBc0IsV0FBdEIsR0FBb0MsSUFBcEMsR0FBMkMsS0FBS0EsS0FBdkQ7QUFDRDtBQUgrRCxhQUFsRTtBQUtEOztBQUVELGNBQUlDLG9CQUFvQixTQUFwQkEsaUJBQW9CLENBQVM5ZSxXQUFULEVBQXNCO0FBQzVDLGdCQUFJNEcsV0FBV2pNLFNBQVN5TixhQUFULENBQXVCcEksWUFBWXJLLEdBQW5DLENBQWY7QUFDQWlSLHFCQUFTcEIsS0FBVDtBQUNBLG1CQUFPb0IsU0FBU29WLElBQVQsQ0FBYyxVQUFTM1QsWUFBVCxFQUF1QjtBQUMxQyxrQkFBSTBXLFFBQVFwa0IsU0FBU3VYLFVBQVQsQ0FBb0I3SixZQUFwQixDQUFaO0FBQ0EscUJBQU8wVyxTQUFTQSxNQUFNOWpCLElBQU4sS0FBZSxhQUF4QixJQUNBOGpCLE1BQU1sZixRQUFOLENBQWVoRCxPQUFmLENBQXVCLE1BQXZCLE1BQW1DLENBQUMsQ0FEM0M7QUFFRCxhQUpNLENBQVA7QUFLRCxXQVJEOztBQVVBLGNBQUltaUIsMEJBQTBCLFNBQTFCQSx1QkFBMEIsQ0FBU2hmLFdBQVQsRUFBc0I7QUFDbEQ7QUFDQSxnQkFBSWljLFFBQVFqYyxZQUFZckssR0FBWixDQUFnQnNtQixLQUFoQixDQUFzQixpQ0FBdEIsQ0FBWjtBQUNBLGdCQUFJQSxVQUFVLElBQVYsSUFBa0JBLE1BQU0vbUIsTUFBTixHQUFlLENBQXJDLEVBQXdDO0FBQ3RDLHFCQUFPLENBQUMsQ0FBUjtBQUNEO0FBQ0QsZ0JBQUkrYyxVQUFVamQsU0FBU2luQixNQUFNLENBQU4sQ0FBVCxFQUFtQixFQUFuQixDQUFkO0FBQ0E7QUFDQSxtQkFBT2hLLFlBQVlBLE9BQVosR0FBc0IsQ0FBQyxDQUF2QixHQUEyQkEsT0FBbEM7QUFDRCxXQVREOztBQVdBLGNBQUlnTiwyQkFBMkIsU0FBM0JBLHdCQUEyQixDQUFTQyxlQUFULEVBQTBCO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQUlDLHdCQUF3QixLQUE1QjtBQUNBLGdCQUFJM0wsZUFBZVcsT0FBZixLQUEyQixTQUEvQixFQUEwQztBQUN4QyxrQkFBSVgsZUFBZXZCLE9BQWYsR0FBeUIsRUFBN0IsRUFBaUM7QUFDL0Isb0JBQUlpTixvQkFBb0IsQ0FBQyxDQUF6QixFQUE0QjtBQUMxQjtBQUNBO0FBQ0FDLDBDQUF3QixLQUF4QjtBQUNELGlCQUpELE1BSU87QUFDTDtBQUNBO0FBQ0FBLDBDQUF3QixVQUF4QjtBQUNEO0FBQ0YsZUFWRCxNQVVPO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQUEsd0NBQ0UzTCxlQUFldkIsT0FBZixLQUEyQixFQUEzQixHQUFnQyxLQUFoQyxHQUF3QyxLQUQxQztBQUVEO0FBQ0Y7QUFDRCxtQkFBT2tOLHFCQUFQO0FBQ0QsV0EzQkQ7O0FBNkJBLGNBQUlDLG9CQUFvQixTQUFwQkEsaUJBQW9CLENBQVNwZixXQUFULEVBQXNCa2YsZUFBdEIsRUFBdUM7QUFDN0Q7QUFDQTtBQUNBLGdCQUFJRyxpQkFBaUIsS0FBckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQUk3TCxlQUFlVyxPQUFmLEtBQTJCLFNBQTNCLElBQ0lYLGVBQWV2QixPQUFmLEtBQTJCLEVBRG5DLEVBQ3VDO0FBQ3JDb04sK0JBQWlCLEtBQWpCO0FBQ0Q7O0FBRUQsZ0JBQUlwRCxRQUFRdGhCLFNBQVM2TixXQUFULENBQXFCeEksWUFBWXJLLEdBQWpDLEVBQXNDLHFCQUF0QyxDQUFaO0FBQ0EsZ0JBQUlzbUIsTUFBTS9tQixNQUFOLEdBQWUsQ0FBbkIsRUFBc0I7QUFDcEJtcUIsK0JBQWlCcnFCLFNBQVNpbkIsTUFBTSxDQUFOLEVBQVM3UyxNQUFULENBQWdCLEVBQWhCLENBQVQsRUFBOEIsRUFBOUIsQ0FBakI7QUFDRCxhQUZELE1BRU8sSUFBSW9LLGVBQWVXLE9BQWYsS0FBMkIsU0FBM0IsSUFDQytLLG9CQUFvQixDQUFDLENBRDFCLEVBQzZCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBRywrQkFBaUIsVUFBakI7QUFDRDtBQUNELG1CQUFPQSxjQUFQO0FBQ0QsV0F4QkQ7O0FBMEJBLGNBQUkzSiwyQkFDQWppQixPQUFPcUMsaUJBQVAsQ0FBeUJrTixTQUF6QixDQUFtQ2pOLG9CQUR2QztBQUVBdEMsaUJBQU9xQyxpQkFBUCxDQUF5QmtOLFNBQXpCLENBQW1Dak4sb0JBQW5DLEdBQTBELFlBQVc7QUFDbkUsZ0JBQUkrSyxLQUFLLElBQVQ7QUFDQUEsZUFBRytkLEtBQUgsR0FBVyxJQUFYOztBQUVBLGdCQUFJQyxrQkFBa0JwVCxVQUFVLENBQVYsQ0FBbEIsQ0FBSixFQUFxQztBQUNuQztBQUNBLGtCQUFJNFQsWUFBWU4sd0JBQXdCdFQsVUFBVSxDQUFWLENBQXhCLENBQWhCOztBQUVBO0FBQ0Esa0JBQUk2VCxhQUFhTix5QkFBeUJLLFNBQXpCLENBQWpCOztBQUVBO0FBQ0Esa0JBQUlFLFlBQVlKLGtCQUFrQjFULFVBQVUsQ0FBVixDQUFsQixFQUFnQzRULFNBQWhDLENBQWhCOztBQUVBO0FBQ0Esa0JBQUlELGNBQUo7QUFDQSxrQkFBSUUsZUFBZSxDQUFmLElBQW9CQyxjQUFjLENBQXRDLEVBQXlDO0FBQ3ZDSCxpQ0FBaUJJLE9BQU9DLGlCQUF4QjtBQUNELGVBRkQsTUFFTyxJQUFJSCxlQUFlLENBQWYsSUFBb0JDLGNBQWMsQ0FBdEMsRUFBeUM7QUFDOUNILGlDQUFpQmhoQixLQUFLb2MsR0FBTCxDQUFTOEUsVUFBVCxFQUFxQkMsU0FBckIsQ0FBakI7QUFDRCxlQUZNLE1BRUE7QUFDTEgsaUNBQWlCaGhCLEtBQUtDLEdBQUwsQ0FBU2loQixVQUFULEVBQXFCQyxTQUFyQixDQUFqQjtBQUNEOztBQUVEO0FBQ0E7QUFDQSxrQkFBSUcsT0FBTyxFQUFYO0FBQ0FybUIscUJBQU9tTSxjQUFQLENBQXNCa2EsSUFBdEIsRUFBNEIsZ0JBQTVCLEVBQThDO0FBQzVDalYscUJBQUssZUFBVztBQUNkLHlCQUFPMlUsY0FBUDtBQUNEO0FBSDJDLGVBQTlDO0FBS0F2ZSxpQkFBRytkLEtBQUgsR0FBV2MsSUFBWDtBQUNEOztBQUVELG1CQUFPaksseUJBQXlCM0gsS0FBekIsQ0FBK0JqTixFQUEvQixFQUFtQzRLLFNBQW5DLENBQVA7QUFDRCxXQXBDRDtBQXFDRCxTQTNPYzs7QUE2T2ZxSixnQ0FBd0IsZ0NBQVN0aEIsTUFBVCxFQUFpQjtBQUN2QyxjQUFJLEVBQUVBLE9BQU9xQyxpQkFBUCxJQUNGLHVCQUF1QnJDLE9BQU9xQyxpQkFBUCxDQUF5QmtOLFNBRGhELENBQUosRUFDZ0U7QUFDOUQ7QUFDRDs7QUFFRDtBQUNBO0FBQ0E7O0FBRUEsY0FBSTRjLHdCQUNGbnNCLE9BQU9xQyxpQkFBUCxDQUF5QmtOLFNBQXpCLENBQW1DNmMsaUJBRHJDO0FBRUFwc0IsaUJBQU9xQyxpQkFBUCxDQUF5QmtOLFNBQXpCLENBQW1DNmMsaUJBQW5DLEdBQXVELFlBQVc7QUFDaEUsZ0JBQUkvZSxLQUFLLElBQVQ7QUFDQSxnQkFBSWdmLGNBQWNGLHNCQUFzQjdSLEtBQXRCLENBQTRCak4sRUFBNUIsRUFBZ0M0SyxTQUFoQyxDQUFsQjtBQUNBLGdCQUFJcVUsc0JBQXNCRCxZQUFZcm1CLElBQXRDOztBQUVBO0FBQ0FxbUIsd0JBQVlybUIsSUFBWixHQUFtQixZQUFXO0FBQzVCLGtCQUFJdW1CLEtBQUssSUFBVDtBQUNBLGtCQUFJem5CLE9BQU9tVCxVQUFVLENBQVYsQ0FBWDtBQUNBLGtCQUFJeFcsU0FBU3FELEtBQUtyRCxNQUFMLElBQWVxRCxLQUFLMG5CLElBQXBCLElBQTRCMW5CLEtBQUsybkIsVUFBOUM7QUFDQSxrQkFBSWhyQixTQUFTNEwsR0FBRzZlLElBQUgsQ0FBUU4sY0FBckIsRUFBcUM7QUFDbkMsc0JBQU0sSUFBSWxJLFlBQUosQ0FBaUIsOENBQ3JCclcsR0FBRzZlLElBQUgsQ0FBUU4sY0FEYSxHQUNJLFNBRHJCLEVBQ2dDLFdBRGhDLENBQU47QUFFRDtBQUNELHFCQUFPVSxvQkFBb0JoUyxLQUFwQixDQUEwQmlTLEVBQTFCLEVBQThCdFUsU0FBOUIsQ0FBUDtBQUNELGFBVEQ7O0FBV0EsbUJBQU9vVSxXQUFQO0FBQ0QsV0FsQkQ7QUFtQkQ7QUE1UWMsT0FBakI7QUErUUMsS0E3UnVCLEVBNlJ0QixFQUFDLFdBQVUsRUFBWCxFQUFjLE9BQU0sQ0FBcEIsRUE3UnNCLENBdmlIa3hCLEVBbzBIaHhCLEdBQUUsQ0FBQyxVQUFTeGxCLE9BQVQsRUFBaUJULE1BQWpCLEVBQXdCRCxPQUF4QixFQUFnQztBQUM3RDs7Ozs7OztBQU9DO0FBQ0Q7O0FBRUEsVUFBSWlaLFFBQVF2WSxRQUFRLFVBQVIsQ0FBWjtBQUNBLFVBQUk2bEIsd0JBQXdCN2xCLFFBQVEsd0JBQVIsQ0FBNUI7O0FBRUFULGFBQU9ELE9BQVAsR0FBaUI7QUFDZjJhLDBCQUFrQmphLFFBQVEsZ0JBQVIsQ0FESDtBQUVmOFosNEJBQW9CLDRCQUFTM2dCLE1BQVQsRUFBaUI7QUFDbkMsY0FBSStmLGlCQUFpQlgsTUFBTVksYUFBTixDQUFvQmhnQixNQUFwQixDQUFyQjs7QUFFQSxjQUFJQSxPQUFPOE8sY0FBWCxFQUEyQjtBQUN6QixnQkFBSSxDQUFDOU8sT0FBT29FLGVBQVosRUFBNkI7QUFDM0JwRSxxQkFBT29FLGVBQVAsR0FBeUIsVUFBU2lXLElBQVQsRUFBZTtBQUN0Qyx1QkFBT0EsSUFBUDtBQUNELGVBRkQ7QUFHRDtBQUNELGdCQUFJLENBQUNyYSxPQUFPdUMscUJBQVosRUFBbUM7QUFDakN2QyxxQkFBT3VDLHFCQUFQLEdBQStCLFVBQVM4WCxJQUFULEVBQWU7QUFDNUMsdUJBQU9BLElBQVA7QUFDRCxlQUZEO0FBR0Q7QUFDRDtBQUNBO0FBQ0E7QUFDQSxnQkFBSTBGLGVBQWV2QixPQUFmLEdBQXlCLEtBQTdCLEVBQW9DO0FBQ2xDLGtCQUFJbU8saUJBQWlCOW1CLE9BQU9rZix3QkFBUCxDQUNqQi9rQixPQUFPK3BCLGdCQUFQLENBQXdCeGEsU0FEUCxFQUNrQixTQURsQixDQUFyQjtBQUVBMUoscUJBQU9tTSxjQUFQLENBQXNCaFMsT0FBTytwQixnQkFBUCxDQUF3QnhhLFNBQTlDLEVBQXlELFNBQXpELEVBQW9FO0FBQ2xFMksscUJBQUssYUFBU2pJLEtBQVQsRUFBZ0I7QUFDbkIwYSxpQ0FBZXpTLEdBQWYsQ0FBbUJqVCxJQUFuQixDQUF3QixJQUF4QixFQUE4QmdMLEtBQTlCO0FBQ0Esc0JBQUkyYSxLQUFLLElBQUlwZixLQUFKLENBQVUsU0FBVixDQUFUO0FBQ0FvZixxQkFBR3ZiLE9BQUgsR0FBYVksS0FBYjtBQUNBLHVCQUFLakYsYUFBTCxDQUFtQjRmLEVBQW5CO0FBQ0Q7QUFOaUUsZUFBcEU7QUFRRDtBQUNGOztBQUVEO0FBQ0E7QUFDQSxjQUFJNXNCLE9BQU84USxZQUFQLElBQXVCLEVBQUUsVUFBVTlRLE9BQU84USxZQUFQLENBQW9CdkIsU0FBaEMsQ0FBM0IsRUFBdUU7QUFDckUxSixtQkFBT21NLGNBQVAsQ0FBc0JoUyxPQUFPOFEsWUFBUCxDQUFvQnZCLFNBQTFDLEVBQXFELE1BQXJELEVBQTZEO0FBQzNEMEgsbUJBQUssZUFBVztBQUNkLG9CQUFJLEtBQUtzTCxLQUFMLEtBQWUzVixTQUFuQixFQUE4QjtBQUM1QixzQkFBSSxLQUFLekUsS0FBTCxDQUFXWCxJQUFYLEtBQW9CLE9BQXhCLEVBQWlDO0FBQy9CLHlCQUFLK2EsS0FBTCxHQUFhLElBQUl2aUIsT0FBTzZzQixhQUFYLENBQXlCLElBQXpCLENBQWI7QUFDRCxtQkFGRCxNQUVPLElBQUksS0FBSzFrQixLQUFMLENBQVdYLElBQVgsS0FBb0IsT0FBeEIsRUFBaUM7QUFDdEMseUJBQUsrYSxLQUFMLEdBQWEsSUFBYjtBQUNEO0FBQ0Y7QUFDRCx1QkFBTyxLQUFLQSxLQUFaO0FBQ0Q7QUFWMEQsYUFBN0Q7QUFZRDtBQUNEO0FBQ0E7QUFDQSxjQUFJdmlCLE9BQU82c0IsYUFBUCxJQUF3QixDQUFDN3NCLE9BQU84c0IsYUFBcEMsRUFBbUQ7QUFDakQ5c0IsbUJBQU84c0IsYUFBUCxHQUF1QjlzQixPQUFPNnNCLGFBQTlCO0FBQ0Q7O0FBRUQ3c0IsaUJBQU9xQyxpQkFBUCxHQUNJcXFCLHNCQUFzQjFzQixNQUF0QixFQUE4QitmLGVBQWV2QixPQUE3QyxDQURKO0FBRUQsU0F6RGM7QUEwRGZnRCwwQkFBa0IsMEJBQVN4aEIsTUFBVCxFQUFpQjtBQUNqQztBQUNBLGNBQUlBLE9BQU84USxZQUFQLElBQ0EsRUFBRSxrQkFBa0I5USxPQUFPOFEsWUFBUCxDQUFvQnZCLFNBQXhDLENBREosRUFDd0Q7QUFDdER2UCxtQkFBTzhRLFlBQVAsQ0FBb0J2QixTQUFwQixDQUE4QndkLFlBQTlCLEdBQ0kvc0IsT0FBTzhRLFlBQVAsQ0FBb0J2QixTQUFwQixDQUE4QnlkLFFBRGxDO0FBRUQ7QUFDRjtBQWpFYyxPQUFqQjtBQW9FQyxLQWxGMkIsRUFrRjFCLEVBQUMsWUFBVyxFQUFaLEVBQWUsa0JBQWlCLENBQWhDLEVBQWtDLDBCQUF5QixDQUEzRCxFQWxGMEIsQ0FwMEg4d0IsRUFzNUh6dUIsR0FBRSxDQUFDLFVBQVNubUIsT0FBVCxFQUFpQlQsTUFBakIsRUFBd0JELE9BQXhCLEVBQWdDO0FBQ3BHOzs7Ozs7O0FBT0M7QUFDRDs7QUFFQTs7QUFDQUMsYUFBT0QsT0FBUCxHQUFpQixVQUFTbkcsTUFBVCxFQUFpQjtBQUNoQyxZQUFJMm1CLFlBQVkzbUIsVUFBVUEsT0FBTzJtQixTQUFqQzs7QUFFQSxZQUFJZ0MsYUFBYSxTQUFiQSxVQUFhLENBQVNwbEIsQ0FBVCxFQUFZO0FBQzNCLGlCQUFPO0FBQ0xoRyxrQkFBTSxFQUFDcXJCLHVCQUF1QixpQkFBeEIsR0FBMkNybEIsRUFBRWhHLElBQTdDLEtBQXNEZ0csRUFBRWhHLElBRHpEO0FBRUxvSCxxQkFBU3BCLEVBQUVvQixPQUZOO0FBR0wya0Isd0JBQVkvbEIsRUFBRStsQixVQUhUO0FBSUw5TyxzQkFBVSxvQkFBVztBQUNuQixxQkFBTyxLQUFLamQsSUFBWjtBQUNEO0FBTkksV0FBUDtBQVFELFNBVEQ7O0FBV0E7QUFDQSxZQUFJZ3RCLG1CQUFtQjVELFVBQVVxQixZQUFWLENBQXVCNEIsWUFBdkIsQ0FDbkI3YixJQURtQixDQUNkNFksVUFBVXFCLFlBREksQ0FBdkI7QUFFQXJCLGtCQUFVcUIsWUFBVixDQUF1QjRCLFlBQXZCLEdBQXNDLFVBQVMzUSxDQUFULEVBQVk7QUFDaEQsaUJBQU9zUixpQkFBaUJ0UixDQUFqQixXQUEwQixVQUFTMVYsQ0FBVCxFQUFZO0FBQzNDLG1CQUFPbUMsUUFBUW5CLE1BQVIsQ0FBZW9rQixXQUFXcGxCLENBQVgsQ0FBZixDQUFQO0FBQ0QsV0FGTSxDQUFQO0FBR0QsU0FKRDtBQUtELE9BdEJEO0FBd0JDLEtBcENrRSxFQW9DakUsRUFwQ2lFLENBdDVIdXVCLEVBMDdIcHlCLElBQUcsQ0FBQyxVQUFTc0QsT0FBVCxFQUFpQlQsTUFBakIsRUFBd0JELE9BQXhCLEVBQWdDO0FBQzFDOzs7Ozs7O0FBT0M7QUFDRDs7QUFFQSxVQUFJaVosUUFBUXZZLFFBQVEsVUFBUixDQUFaOztBQUVBVCxhQUFPRCxPQUFQLEdBQWlCO0FBQ2YyYSwwQkFBa0JqYSxRQUFRLGdCQUFSLENBREg7QUFFZm9hLHFCQUFhLHFCQUFTamhCLE1BQVQsRUFBaUI7QUFDNUIsY0FBSSxRQUFPQSxNQUFQLHlDQUFPQSxNQUFQLE9BQWtCLFFBQWxCLElBQThCQSxPQUFPcUMsaUJBQXJDLElBQTBELEVBQUUsYUFDNURyQyxPQUFPcUMsaUJBQVAsQ0FBeUJrTixTQURpQyxDQUE5RCxFQUN5QztBQUN2QzFKLG1CQUFPbU0sY0FBUCxDQUFzQmhTLE9BQU9xQyxpQkFBUCxDQUF5QmtOLFNBQS9DLEVBQTBELFNBQTFELEVBQXFFO0FBQ25FMEgsbUJBQUssZUFBVztBQUNkLHVCQUFPLEtBQUsrSyxRQUFaO0FBQ0QsZUFIa0U7QUFJbkU5SCxtQkFBSyxhQUFTaFUsQ0FBVCxFQUFZO0FBQ2Ysb0JBQUksS0FBSzhiLFFBQVQsRUFBbUI7QUFDakIsdUJBQUt4UCxtQkFBTCxDQUF5QixPQUF6QixFQUFrQyxLQUFLd1AsUUFBdkM7QUFDQSx1QkFBS3hQLG1CQUFMLENBQXlCLFdBQXpCLEVBQXNDLEtBQUswUCxZQUEzQztBQUNEO0FBQ0QscUJBQUs5USxnQkFBTCxDQUFzQixPQUF0QixFQUErQixLQUFLNFEsUUFBTCxHQUFnQjliLENBQS9DO0FBQ0EscUJBQUtrTCxnQkFBTCxDQUFzQixXQUF0QixFQUFtQyxLQUFLOFEsWUFBTCxHQUFvQixVQUFTM2UsQ0FBVCxFQUFZO0FBQ2pFQSxvQkFBRTFFLE1BQUYsQ0FBU2tTLFNBQVQsR0FBcUIzUCxPQUFyQixDQUE2QixVQUFTK0csS0FBVCxFQUFnQjtBQUMzQyx3QkFBSWpJLFFBQVEsSUFBSXNOLEtBQUosQ0FBVSxPQUFWLENBQVo7QUFDQXROLDBCQUFNaUksS0FBTixHQUFjQSxLQUFkO0FBQ0FqSSwwQkFBTW9OLFFBQU4sR0FBaUIsRUFBQ25GLE9BQU9BLEtBQVIsRUFBakI7QUFDQWpJLDBCQUFNa0gsV0FBTixHQUFvQixFQUFDa0csVUFBVXBOLE1BQU1vTixRQUFqQixFQUFwQjtBQUNBcE4sMEJBQU13RCxPQUFOLEdBQWdCLENBQUNILEVBQUUxRSxNQUFILENBQWhCO0FBQ0EseUJBQUttTyxhQUFMLENBQW1COU0sS0FBbkI7QUFDRCxtQkFQNEIsQ0FPM0I2TixJQVAyQixDQU90QixJQVBzQixDQUE3QjtBQVFELGlCQVRzRCxDQVNyREEsSUFUcUQsQ0FTaEQsSUFUZ0QsQ0FBdkQ7QUFVRDtBQXBCa0UsYUFBckU7QUFzQkQ7QUFDRCxjQUFJLFFBQU8vTixNQUFQLHlDQUFPQSxNQUFQLE9BQWtCLFFBQWxCLElBQThCQSxPQUFPaXRCLGFBQXJDLElBQ0MsY0FBY2p0QixPQUFPaXRCLGFBQVAsQ0FBcUIxZCxTQURwQyxJQUVBLEVBQUUsaUJBQWlCdlAsT0FBT2l0QixhQUFQLENBQXFCMWQsU0FBeEMsQ0FGSixFQUV3RDtBQUN0RDFKLG1CQUFPbU0sY0FBUCxDQUFzQmhTLE9BQU9pdEIsYUFBUCxDQUFxQjFkLFNBQTNDLEVBQXNELGFBQXRELEVBQXFFO0FBQ25FMEgsbUJBQUssZUFBVztBQUNkLHVCQUFPLEVBQUMzSixVQUFVLEtBQUtBLFFBQWhCLEVBQVA7QUFDRDtBQUhrRSxhQUFyRTtBQUtEO0FBQ0YsU0FyQ2M7O0FBdUNmMFQsMEJBQWtCLDBCQUFTaGhCLE1BQVQsRUFBaUI7QUFDakM7QUFDQSxjQUFJLFFBQU9BLE1BQVAseUNBQU9BLE1BQVAsT0FBa0IsUUFBdEIsRUFBZ0M7QUFDOUIsZ0JBQUlBLE9BQU9rakIsZ0JBQVAsSUFDRixFQUFFLGVBQWVsakIsT0FBT2tqQixnQkFBUCxDQUF3QjNULFNBQXpDLENBREYsRUFDdUQ7QUFDckQ7QUFDQTFKLHFCQUFPbU0sY0FBUCxDQUFzQmhTLE9BQU9rakIsZ0JBQVAsQ0FBd0IzVCxTQUE5QyxFQUF5RCxXQUF6RCxFQUFzRTtBQUNwRTBILHFCQUFLLGVBQVc7QUFDZCx5QkFBTyxLQUFLaVcsWUFBWjtBQUNELGlCQUhtRTtBQUlwRWhULHFCQUFLLGFBQVNyYixNQUFULEVBQWlCO0FBQ3BCLHVCQUFLcXVCLFlBQUwsR0FBb0JydUIsTUFBcEI7QUFDRDtBQU5tRSxlQUF0RTtBQVFEO0FBQ0Y7QUFDRixTQXZEYzs7QUF5RGY4aEIsNEJBQW9CLDRCQUFTM2dCLE1BQVQsRUFBaUI7QUFDbkMsY0FBSStmLGlCQUFpQlgsTUFBTVksYUFBTixDQUFvQmhnQixNQUFwQixDQUFyQjs7QUFFQSxjQUFJLFFBQU9BLE1BQVAseUNBQU9BLE1BQVAsT0FBa0IsUUFBbEIsSUFBOEIsRUFBRUEsT0FBT3FDLGlCQUFQLElBQ2hDckMsT0FBT210QixvQkFEdUIsQ0FBbEMsRUFDa0M7QUFDaEMsbUJBRGdDLENBQ3hCO0FBQ1Q7QUFDRDtBQUNBLGNBQUksQ0FBQ250QixPQUFPcUMsaUJBQVosRUFBK0I7QUFDN0JyQyxtQkFBT3FDLGlCQUFQLEdBQTJCLFVBQVMraUIsUUFBVCxFQUFtQkMsYUFBbkIsRUFBa0M7QUFDM0Qsa0JBQUl0RixlQUFldkIsT0FBZixHQUF5QixFQUE3QixFQUFpQztBQUMvQjtBQUNBO0FBQ0Esb0JBQUk0RyxZQUFZQSxTQUFTMWMsVUFBekIsRUFBcUM7QUFDbkMsc0JBQUkrYyxnQkFBZ0IsRUFBcEI7QUFDQSx1QkFBSyxJQUFJdGhCLElBQUksQ0FBYixFQUFnQkEsSUFBSWloQixTQUFTMWMsVUFBVCxDQUFvQmpILE1BQXhDLEVBQWdEMEMsR0FBaEQsRUFBcUQ7QUFDbkQsd0JBQUkyRSxTQUFTc2MsU0FBUzFjLFVBQVQsQ0FBb0J2RSxDQUFwQixDQUFiO0FBQ0Esd0JBQUkyRSxPQUFPK1csY0FBUCxDQUFzQixNQUF0QixDQUFKLEVBQW1DO0FBQ2pDLDJCQUFLLElBQUk3VSxJQUFJLENBQWIsRUFBZ0JBLElBQUlsQyxPQUFPQyxJQUFQLENBQVl0SCxNQUFoQyxFQUF3Q3VKLEdBQXhDLEVBQTZDO0FBQzNDLDRCQUFJb2lCLFlBQVk7QUFDZHBrQiwrQkFBS0YsT0FBT0MsSUFBUCxDQUFZaUMsQ0FBWjtBQURTLHlCQUFoQjtBQUdBLDRCQUFJbEMsT0FBT0MsSUFBUCxDQUFZaUMsQ0FBWixFQUFlNUIsT0FBZixDQUF1QixNQUF2QixNQUFtQyxDQUF2QyxFQUEwQztBQUN4Q2drQixvQ0FBVXhPLFFBQVYsR0FBcUI5VixPQUFPOFYsUUFBNUI7QUFDQXdPLG9DQUFVQyxVQUFWLEdBQXVCdmtCLE9BQU91a0IsVUFBOUI7QUFDRDtBQUNENUgsc0NBQWNua0IsSUFBZCxDQUFtQjhyQixTQUFuQjtBQUNEO0FBQ0YscUJBWEQsTUFXTztBQUNMM0gsb0NBQWNua0IsSUFBZCxDQUFtQjhqQixTQUFTMWMsVUFBVCxDQUFvQnZFLENBQXBCLENBQW5CO0FBQ0Q7QUFDRjtBQUNEaWhCLDJCQUFTMWMsVUFBVCxHQUFzQitjLGFBQXRCO0FBQ0Q7QUFDRjtBQUNELHFCQUFPLElBQUl6bEIsT0FBT210QixvQkFBWCxDQUFnQy9ILFFBQWhDLEVBQTBDQyxhQUExQyxDQUFQO0FBQ0QsYUEzQkQ7QUE0QkFybEIsbUJBQU9xQyxpQkFBUCxDQUF5QmtOLFNBQXpCLEdBQ0l2UCxPQUFPbXRCLG9CQUFQLENBQTRCNWQsU0FEaEM7O0FBR0E7QUFDQSxnQkFBSXZQLE9BQU9tdEIsb0JBQVAsQ0FBNEI1SCxtQkFBaEMsRUFBcUQ7QUFDbkQxZixxQkFBT21NLGNBQVAsQ0FBc0JoUyxPQUFPcUMsaUJBQTdCLEVBQWdELHFCQUFoRCxFQUF1RTtBQUNyRTRVLHFCQUFLLGVBQVc7QUFDZCx5QkFBT2pYLE9BQU9tdEIsb0JBQVAsQ0FBNEI1SCxtQkFBbkM7QUFDRDtBQUhvRSxlQUF2RTtBQUtEOztBQUVEdmxCLG1CQUFPdUMscUJBQVAsR0FBK0J2QyxPQUFPc3RCLHdCQUF0QztBQUNBdHRCLG1CQUFPb0UsZUFBUCxHQUF5QnBFLE9BQU91dEIsa0JBQWhDO0FBQ0Q7O0FBRUQ7QUFDQSxXQUFDLHFCQUFELEVBQXdCLHNCQUF4QixFQUFnRCxpQkFBaEQsRUFDS25zQixPQURMLENBQ2EsVUFBUzBNLE1BQVQsRUFBaUI7QUFDeEIsZ0JBQUlzTSxlQUFlcGEsT0FBT3FDLGlCQUFQLENBQXlCa04sU0FBekIsQ0FBbUN6QixNQUFuQyxDQUFuQjtBQUNBOU4sbUJBQU9xQyxpQkFBUCxDQUF5QmtOLFNBQXpCLENBQW1DekIsTUFBbkMsSUFBNkMsWUFBVztBQUN0RG1LLHdCQUFVLENBQVYsSUFBZSxLQUFNbkssV0FBVyxpQkFBWixHQUNoQjlOLE9BQU9vRSxlQURTLEdBRWhCcEUsT0FBT3VDLHFCQUZJLEVBRW1CMFYsVUFBVSxDQUFWLENBRm5CLENBQWY7QUFHQSxxQkFBT21DLGFBQWFFLEtBQWIsQ0FBbUIsSUFBbkIsRUFBeUJyQyxTQUF6QixDQUFQO0FBQ0QsYUFMRDtBQU1ELFdBVEw7O0FBV0E7QUFDQSxjQUFJeU8sd0JBQ0ExbUIsT0FBT3FDLGlCQUFQLENBQXlCa04sU0FBekIsQ0FBbUNsTSxlQUR2QztBQUVBckQsaUJBQU9xQyxpQkFBUCxDQUF5QmtOLFNBQXpCLENBQW1DbE0sZUFBbkMsR0FBcUQsWUFBVztBQUM5RCxnQkFBSSxDQUFDNFUsVUFBVSxDQUFWLENBQUwsRUFBbUI7QUFDakIsa0JBQUlBLFVBQVUsQ0FBVixDQUFKLEVBQWtCO0FBQ2hCQSwwQkFBVSxDQUFWLEVBQWFxQyxLQUFiLENBQW1CLElBQW5CO0FBQ0Q7QUFDRCxxQkFBTzVVLFFBQVF0RCxPQUFSLEVBQVA7QUFDRDtBQUNELG1CQUFPc2tCLHNCQUFzQnBNLEtBQXRCLENBQTRCLElBQTVCLEVBQWtDckMsU0FBbEMsQ0FBUDtBQUNELFdBUkQ7O0FBVUE7QUFDQSxjQUFJc08sZUFBZSxTQUFmQSxZQUFlLENBQVNwbEIsS0FBVCxFQUFnQjtBQUNqQyxnQkFBSXFRLE1BQU0sSUFBSXNJLEdBQUosRUFBVjtBQUNBalUsbUJBQU9DLElBQVAsQ0FBWTNFLEtBQVosRUFBbUJDLE9BQW5CLENBQTJCLFVBQVN3ZSxHQUFULEVBQWM7QUFDdkNwTyxrQkFBSTBJLEdBQUosQ0FBUTBGLEdBQVIsRUFBYXplLE1BQU15ZSxHQUFOLENBQWI7QUFDQXBPLGtCQUFJb08sR0FBSixJQUFXemUsTUFBTXllLEdBQU4sQ0FBWDtBQUNELGFBSEQ7QUFJQSxtQkFBT3BPLEdBQVA7QUFDRCxXQVBEOztBQVNBLGNBQUlnYyxtQkFBbUI7QUFDckJoVSx3QkFBWSxhQURTO0FBRXJCQyx5QkFBYSxjQUZRO0FBR3JCQywyQkFBZSxnQkFITTtBQUlyQkMsNEJBQWdCLGlCQUpLO0FBS3JCQyw2QkFBaUI7QUFMSSxXQUF2Qjs7QUFRQSxjQUFJNlQsaUJBQWlCenRCLE9BQU9xQyxpQkFBUCxDQUF5QmtOLFNBQXpCLENBQW1DdE8sUUFBeEQ7QUFDQWpCLGlCQUFPcUMsaUJBQVAsQ0FBeUJrTixTQUF6QixDQUFtQ3RPLFFBQW5DLEdBQThDLFVBQzVDMmtCLFFBRDRDLEVBRTVDOEgsTUFGNEMsRUFHNUNDLEtBSDRDLEVBSTVDO0FBQ0EsbUJBQU9GLGVBQWVuVCxLQUFmLENBQXFCLElBQXJCLEVBQTJCLENBQUNzTCxZQUFZLElBQWIsQ0FBM0IsRUFDSjFrQixJQURJLENBQ0MsVUFBU0MsS0FBVCxFQUFnQjtBQUNwQixrQkFBSTRlLGVBQWV2QixPQUFmLEdBQXlCLEVBQTdCLEVBQWlDO0FBQy9CcmQsd0JBQVFvbEIsYUFBYXBsQixLQUFiLENBQVI7QUFDRDtBQUNELGtCQUFJNGUsZUFBZXZCLE9BQWYsR0FBeUIsRUFBekIsSUFBK0IsQ0FBQ2tQLE1BQXBDLEVBQTRDO0FBQzFDO0FBQ0E7QUFDQSxvQkFBSTtBQUNGdnNCLHdCQUFNQyxPQUFOLENBQWMsVUFBU21ZLElBQVQsRUFBZTtBQUMzQkEseUJBQUsvYSxJQUFMLEdBQVlndkIsaUJBQWlCalUsS0FBSy9hLElBQXRCLEtBQStCK2EsS0FBSy9hLElBQWhEO0FBQ0QsbUJBRkQ7QUFHRCxpQkFKRCxDQUlFLE9BQU8rRSxDQUFQLEVBQVU7QUFDVixzQkFBSUEsRUFBRWhHLElBQUYsS0FBVyxXQUFmLEVBQTRCO0FBQzFCLDBCQUFNZ0csQ0FBTjtBQUNEO0FBQ0Q7QUFDQXBDLHdCQUFNQyxPQUFOLENBQWMsVUFBU21ZLElBQVQsRUFBZXBWLENBQWYsRUFBa0I7QUFDOUJoRCwwQkFBTStZLEdBQU4sQ0FBVS9WLENBQVYsRUFBYSxTQUFjLEVBQWQsRUFBa0JvVixJQUFsQixFQUF3QjtBQUNuQy9hLDRCQUFNZ3ZCLGlCQUFpQmpVLEtBQUsvYSxJQUF0QixLQUErQithLEtBQUsvYTtBQURQLHFCQUF4QixDQUFiO0FBR0QsbUJBSkQ7QUFLRDtBQUNGO0FBQ0QscUJBQU8yQyxLQUFQO0FBQ0QsYUF6QkksRUEwQkpELElBMUJJLENBMEJDd3NCLE1BMUJELEVBMEJTQyxLQTFCVCxDQUFQO0FBMkJELFdBaENEO0FBaUNELFNBM0xjOztBQTZMZnBNLDBCQUFrQiwwQkFBU3ZoQixNQUFULEVBQWlCO0FBQ2pDLGNBQUksQ0FBQ0EsT0FBT3FDLGlCQUFSLElBQ0Esa0JBQWtCckMsT0FBT3FDLGlCQUFQLENBQXlCa04sU0FEL0MsRUFDMEQ7QUFDeEQ7QUFDRDtBQUNEdlAsaUJBQU9xQyxpQkFBUCxDQUF5QmtOLFNBQXpCLENBQW1DbUMsWUFBbkMsR0FBa0QsVUFBUzdTLE1BQVQsRUFBaUI7QUFDakUsZ0JBQUl3TyxLQUFLLElBQVQ7QUFDQStSLGtCQUFNc0csVUFBTixDQUFpQixjQUFqQixFQUFpQyxhQUFqQztBQUNBLGlCQUFLL1QsVUFBTCxHQUFrQnZRLE9BQWxCLENBQTBCLFVBQVNrUSxNQUFULEVBQWlCO0FBQ3pDLGtCQUFJQSxPQUFPbkosS0FBUCxJQUFnQnRKLE9BQU9rUyxTQUFQLEdBQW1CM0gsT0FBbkIsQ0FBMkJrSSxPQUFPbkosS0FBbEMsTUFBNkMsQ0FBQyxDQUFsRSxFQUFxRTtBQUNuRWtGLG1CQUFHRixXQUFILENBQWVtRSxNQUFmO0FBQ0Q7QUFDRixhQUpEO0FBS0QsV0FSRDtBQVNEO0FBM01jLE9BQWpCO0FBOE1DLEtBM05RLEVBMk5QLEVBQUMsWUFBVyxFQUFaLEVBQWUsa0JBQWlCLEVBQWhDLEVBM05PLENBMTdIaXlCLEVBcXBJbndCLElBQUcsQ0FBQyxVQUFTekssT0FBVCxFQUFpQlQsTUFBakIsRUFBd0JELE9BQXhCLEVBQWdDO0FBQzNFOzs7Ozs7O0FBT0M7QUFDRDs7QUFFQSxVQUFJaVosUUFBUXZZLFFBQVEsVUFBUixDQUFaO0FBQ0EsVUFBSWlaLFVBQVVWLE1BQU0xZ0IsR0FBcEI7O0FBRUE7QUFDQTBILGFBQU9ELE9BQVAsR0FBaUIsVUFBU25HLE1BQVQsRUFBaUI7QUFDaEMsWUFBSStmLGlCQUFpQlgsTUFBTVksYUFBTixDQUFvQmhnQixNQUFwQixDQUFyQjtBQUNBLFlBQUkybUIsWUFBWTNtQixVQUFVQSxPQUFPMm1CLFNBQWpDO0FBQ0EsWUFBSW9ELG1CQUFtQi9wQixVQUFVQSxPQUFPK3BCLGdCQUF4Qzs7QUFFQSxZQUFJcEIsYUFBYSxTQUFiQSxVQUFhLENBQVNwbEIsQ0FBVCxFQUFZO0FBQzNCLGlCQUFPO0FBQ0xoRyxrQkFBTTtBQUNKcXdCLDZCQUFlLGtCQURYO0FBRUpwaEIsaUNBQW1CLFdBRmY7QUFHSm9jLHFDQUF1QixpQkFIbkI7QUFJSmlGLDZCQUFlO0FBSlgsY0FLSnRxQixFQUFFaEcsSUFMRSxLQUtPZ0csRUFBRWhHLElBTlY7QUFPTG9ILHFCQUFTO0FBQ1AsNENBQThCLHVDQUM5QjtBQUZPLGNBR1BwQixFQUFFb0IsT0FISyxLQUdPcEIsRUFBRW9CLE9BVmI7QUFXTDJrQix3QkFBWS9sQixFQUFFK2xCLFVBWFQ7QUFZTDlPLHNCQUFVLG9CQUFXO0FBQ25CLHFCQUFPLEtBQUtqZCxJQUFMLElBQWEsS0FBS29ILE9BQUwsSUFBZ0IsSUFBN0IsSUFBcUMsS0FBS0EsT0FBakQ7QUFDRDtBQWRJLFdBQVA7QUFnQkQsU0FqQkQ7O0FBbUJBO0FBQ0EsWUFBSTZrQixnQkFBZ0IsU0FBaEJBLGFBQWdCLENBQVNqQyxXQUFULEVBQXNCa0MsU0FBdEIsRUFBaUNDLE9BQWpDLEVBQTBDO0FBQzVELGNBQUlvRSxxQkFBcUIsU0FBckJBLGtCQUFxQixDQUFTN1UsQ0FBVCxFQUFZO0FBQ25DLGdCQUFJLFFBQU9BLENBQVAseUNBQU9BLENBQVAsT0FBYSxRQUFiLElBQXlCQSxFQUFFcFMsT0FBL0IsRUFBd0M7QUFDdEMscUJBQU9vUyxDQUFQO0FBQ0Q7QUFDRCxnQkFBSXBTLFVBQVUsRUFBZDtBQUNBaEIsbUJBQU9DLElBQVAsQ0FBWW1ULENBQVosRUFBZTdYLE9BQWYsQ0FBdUIsVUFBU3dlLEdBQVQsRUFBYztBQUNuQyxrQkFBSUEsUUFBUSxTQUFSLElBQXFCQSxRQUFRLFVBQTdCLElBQTJDQSxRQUFRLGFBQXZELEVBQXNFO0FBQ3BFO0FBQ0Q7QUFDRCxrQkFBSXBaLElBQUl5UyxFQUFFMkcsR0FBRixJQUFVLFFBQU8zRyxFQUFFMkcsR0FBRixDQUFQLE1BQWtCLFFBQW5CLEdBQ2IzRyxFQUFFMkcsR0FBRixDQURhLEdBQ0osRUFBQ2tILE9BQU83TixFQUFFMkcsR0FBRixDQUFSLEVBRGI7QUFFQSxrQkFBSXBaLEVBQUVxRSxHQUFGLEtBQVUrQixTQUFWLElBQ0FwRyxFQUFFd2dCLEdBQUYsS0FBVXBhLFNBRFYsSUFDdUJwRyxFQUFFdWdCLEtBQUYsS0FBWW5hLFNBRHZDLEVBQ2tEO0FBQ2hEL0Ysd0JBQVF2RixJQUFSLENBQWFzZSxHQUFiO0FBQ0Q7QUFDRCxrQkFBSXBaLEVBQUV1Z0IsS0FBRixLQUFZbmEsU0FBaEIsRUFBMkI7QUFDekIsb0JBQUksT0FBT3BHLEVBQUV1Z0IsS0FBVCxLQUFtQixRQUF2QixFQUFpQztBQUMvQnZnQixvQkFBR3FFLEdBQUgsR0FBU3JFLEVBQUV3Z0IsR0FBRixHQUFReGdCLEVBQUV1Z0IsS0FBbkI7QUFDRCxpQkFGRCxNQUVPO0FBQ0w5TixvQkFBRTJHLEdBQUYsSUFBU3BaLEVBQUV1Z0IsS0FBWDtBQUNEO0FBQ0QsdUJBQU92Z0IsRUFBRXVnQixLQUFUO0FBQ0Q7QUFDRCxrQkFBSXZnQixFQUFFc2dCLEtBQUYsS0FBWWxhLFNBQWhCLEVBQTJCO0FBQ3pCcU0sa0JBQUVvTyxRQUFGLEdBQWFwTyxFQUFFb08sUUFBRixJQUFjLEVBQTNCO0FBQ0Esb0JBQUlGLEtBQUssRUFBVDtBQUNBLG9CQUFJLE9BQU8zZ0IsRUFBRXNnQixLQUFULEtBQW1CLFFBQXZCLEVBQWlDO0FBQy9CSyxxQkFBR3ZILEdBQUgsSUFBVSxFQUFDL1UsS0FBS3JFLEVBQUVzZ0IsS0FBUixFQUFlRSxLQUFLeGdCLEVBQUVzZ0IsS0FBdEIsRUFBVjtBQUNELGlCQUZELE1BRU87QUFDTEsscUJBQUd2SCxHQUFILElBQVVwWixFQUFFc2dCLEtBQVo7QUFDRDtBQUNEN04sa0JBQUVvTyxRQUFGLENBQVcvbEIsSUFBWCxDQUFnQjZsQixFQUFoQjtBQUNBLHVCQUFPM2dCLEVBQUVzZ0IsS0FBVDtBQUNBLG9CQUFJLENBQUNqaEIsT0FBT0MsSUFBUCxDQUFZVSxDQUFaLEVBQWUvRSxNQUFwQixFQUE0QjtBQUMxQix5QkFBT3dYLEVBQUUyRyxHQUFGLENBQVA7QUFDRDtBQUNGO0FBQ0YsYUFoQ0Q7QUFpQ0EsZ0JBQUkvWSxRQUFRcEYsTUFBWixFQUFvQjtBQUNsQndYLGdCQUFFcFMsT0FBRixHQUFZQSxPQUFaO0FBQ0Q7QUFDRCxtQkFBT29TLENBQVA7QUFDRCxXQTFDRDtBQTJDQXNPLHdCQUFjM2lCLEtBQUtDLEtBQUwsQ0FBV0QsS0FBS3FCLFNBQUwsQ0FBZXNoQixXQUFmLENBQVgsQ0FBZDtBQUNBLGNBQUl4SCxlQUFldkIsT0FBZixHQUF5QixFQUE3QixFQUFpQztBQUMvQnNCLG9CQUFRLFdBQVdsYixLQUFLcUIsU0FBTCxDQUFlc2hCLFdBQWYsQ0FBbkI7QUFDQSxnQkFBSUEsWUFBWUUsS0FBaEIsRUFBdUI7QUFDckJGLDBCQUFZRSxLQUFaLEdBQW9CcUcsbUJBQW1CdkcsWUFBWUUsS0FBL0IsQ0FBcEI7QUFDRDtBQUNELGdCQUFJRixZQUFZSyxLQUFoQixFQUF1QjtBQUNyQkwsMEJBQVlLLEtBQVosR0FBb0JrRyxtQkFBbUJ2RyxZQUFZSyxLQUEvQixDQUFwQjtBQUNEO0FBQ0Q5SCxvQkFBUSxXQUFXbGIsS0FBS3FCLFNBQUwsQ0FBZXNoQixXQUFmLENBQW5CO0FBQ0Q7QUFDRCxpQkFBT1osVUFBVW9ILGVBQVYsQ0FBMEJ4RyxXQUExQixFQUF1Q2tDLFNBQXZDLEVBQWtELFVBQVNsbUIsQ0FBVCxFQUFZO0FBQ25FbW1CLG9CQUFRZixXQUFXcGxCLENBQVgsQ0FBUjtBQUNELFdBRk0sQ0FBUDtBQUdELFNBMUREOztBQTREQTtBQUNBLFlBQUlzbUIsdUJBQXVCLFNBQXZCQSxvQkFBdUIsQ0FBU3RDLFdBQVQsRUFBc0I7QUFDL0MsaUJBQU8sSUFBSTdoQixPQUFKLENBQVksVUFBU3RELE9BQVQsRUFBa0JtQyxNQUFsQixFQUEwQjtBQUMzQ2lsQiwwQkFBY2pDLFdBQWQsRUFBMkJubEIsT0FBM0IsRUFBb0NtQyxNQUFwQztBQUNELFdBRk0sQ0FBUDtBQUdELFNBSkQ7O0FBTUE7QUFDQSxZQUFJLENBQUNvaUIsVUFBVXFCLFlBQWYsRUFBNkI7QUFDM0JyQixvQkFBVXFCLFlBQVYsR0FBeUIsRUFBQzRCLGNBQWNDLG9CQUFmO0FBQ3ZCelksOEJBQWtCLDRCQUFXLENBQUcsQ0FEVDtBQUV2Qm9CLGlDQUFxQiwrQkFBVyxDQUFHO0FBRlosV0FBekI7QUFJRDtBQUNEbVUsa0JBQVVxQixZQUFWLENBQXVCRyxnQkFBdkIsR0FDSXhCLFVBQVVxQixZQUFWLENBQXVCRyxnQkFBdkIsSUFBMkMsWUFBVztBQUNwRCxpQkFBTyxJQUFJemlCLE9BQUosQ0FBWSxVQUFTdEQsT0FBVCxFQUFrQjtBQUNuQyxnQkFBSTRyQixRQUFRLENBQ1YsRUFBQ3htQixNQUFNLFlBQVAsRUFBcUJraEIsVUFBVSxTQUEvQixFQUEwQ0QsT0FBTyxFQUFqRCxFQUFxRHlCLFNBQVMsRUFBOUQsRUFEVSxFQUVWLEVBQUMxaUIsTUFBTSxZQUFQLEVBQXFCa2hCLFVBQVUsU0FBL0IsRUFBMENELE9BQU8sRUFBakQsRUFBcUR5QixTQUFTLEVBQTlELEVBRlUsQ0FBWjtBQUlBOW5CLG9CQUFRNHJCLEtBQVI7QUFDRCxXQU5NLENBQVA7QUFPRCxTQVRMOztBQVdBLFlBQUlqTyxlQUFldkIsT0FBZixHQUF5QixFQUE3QixFQUFpQztBQUMvQjtBQUNBLGNBQUl5UCxzQkFDQXRILFVBQVVxQixZQUFWLENBQXVCRyxnQkFBdkIsQ0FBd0NwYSxJQUF4QyxDQUE2QzRZLFVBQVVxQixZQUF2RCxDQURKO0FBRUFyQixvQkFBVXFCLFlBQVYsQ0FBdUJHLGdCQUF2QixHQUEwQyxZQUFXO0FBQ25ELG1CQUFPOEYsc0JBQXNCL3NCLElBQXRCLENBQTJCMEwsU0FBM0IsRUFBc0MsVUFBU3JKLENBQVQsRUFBWTtBQUN2RCxrQkFBSUEsRUFBRWhHLElBQUYsS0FBVyxlQUFmLEVBQWdDO0FBQzlCLHVCQUFPLEVBQVA7QUFDRDtBQUNELG9CQUFNZ0csQ0FBTjtBQUNELGFBTE0sQ0FBUDtBQU1ELFdBUEQ7QUFRRDtBQUNELFlBQUl3YyxlQUFldkIsT0FBZixHQUF5QixFQUE3QixFQUFpQztBQUMvQixjQUFJK0wsbUJBQW1CNUQsVUFBVXFCLFlBQVYsQ0FBdUI0QixZQUF2QixDQUNuQjdiLElBRG1CLENBQ2Q0WSxVQUFVcUIsWUFESSxDQUF2QjtBQUVBckIsb0JBQVVxQixZQUFWLENBQXVCNEIsWUFBdkIsR0FBc0MsVUFBUzNRLENBQVQsRUFBWTtBQUNoRCxtQkFBT3NSLGlCQUFpQnRSLENBQWpCLEVBQW9CL1gsSUFBcEIsQ0FBeUIsVUFBU3JDLE1BQVQsRUFBaUI7QUFDL0M7QUFDQSxrQkFBSW9hLEVBQUV3TyxLQUFGLElBQVcsQ0FBQzVvQixPQUFPaWEsY0FBUCxHQUF3QnJYLE1BQXBDLElBQ0F3WCxFQUFFMk8sS0FBRixJQUFXLENBQUMvb0IsT0FBT2thLGNBQVAsR0FBd0J0WCxNQUR4QyxFQUNnRDtBQUM5QzVDLHVCQUFPa1MsU0FBUCxHQUFtQjNQLE9BQW5CLENBQTJCLFVBQVMrRyxLQUFULEVBQWdCO0FBQ3pDQSx3QkFBTW9KLElBQU47QUFDRCxpQkFGRDtBQUdBLHNCQUFNLElBQUltUyxZQUFKLENBQWlCLG1DQUFqQixFQUNpQixlQURqQixDQUFOO0FBRUQ7QUFDRCxxQkFBTzdrQixNQUFQO0FBQ0QsYUFYTSxFQVdKLFVBQVMwRSxDQUFULEVBQVk7QUFDYixxQkFBT21DLFFBQVFuQixNQUFSLENBQWVva0IsV0FBV3BsQixDQUFYLENBQWYsQ0FBUDtBQUNELGFBYk0sQ0FBUDtBQWNELFdBZkQ7QUFnQkQ7QUFDRCxZQUFJLEVBQUV3YyxlQUFldkIsT0FBZixHQUF5QixFQUF6QixJQUNGLHFCQUFxQm1JLFVBQVVxQixZQUFWLENBQXVCQyx1QkFBdkIsRUFEckIsQ0FBSixFQUM0RTtBQUMxRSxjQUFJUCxRQUFRLFNBQVJBLEtBQVEsQ0FBU3pKLEdBQVQsRUFBY3JYLENBQWQsRUFBaUIrZ0IsQ0FBakIsRUFBb0I7QUFDOUIsZ0JBQUkvZ0IsS0FBS3FYLEdBQUwsSUFBWSxFQUFFMEosS0FBSzFKLEdBQVAsQ0FBaEIsRUFBNkI7QUFDM0JBLGtCQUFJMEosQ0FBSixJQUFTMUosSUFBSXJYLENBQUosQ0FBVDtBQUNBLHFCQUFPcVgsSUFBSXJYLENBQUosQ0FBUDtBQUNEO0FBQ0YsV0FMRDs7QUFPQSxjQUFJc25CLHFCQUFxQnZILFVBQVVxQixZQUFWLENBQXVCNEIsWUFBdkIsQ0FDckI3YixJQURxQixDQUNoQjRZLFVBQVVxQixZQURNLENBQXpCO0FBRUFyQixvQkFBVXFCLFlBQVYsQ0FBdUI0QixZQUF2QixHQUFzQyxVQUFTM1EsQ0FBVCxFQUFZO0FBQ2hELGdCQUFJLFFBQU9BLENBQVAseUNBQU9BLENBQVAsT0FBYSxRQUFiLElBQXlCLFFBQU9BLEVBQUV3TyxLQUFULE1BQW1CLFFBQWhELEVBQTBEO0FBQ3hEeE8sa0JBQUlyVSxLQUFLQyxLQUFMLENBQVdELEtBQUtxQixTQUFMLENBQWVnVCxDQUFmLENBQVgsQ0FBSjtBQUNBeU8sb0JBQU16TyxFQUFFd08sS0FBUixFQUFlLGlCQUFmLEVBQWtDLG9CQUFsQztBQUNBQyxvQkFBTXpPLEVBQUV3TyxLQUFSLEVBQWUsa0JBQWYsRUFBbUMscUJBQW5DO0FBQ0Q7QUFDRCxtQkFBT3lHLG1CQUFtQmpWLENBQW5CLENBQVA7QUFDRCxXQVBEOztBQVNBLGNBQUk4USxvQkFBb0JBLGlCQUFpQnhhLFNBQWpCLENBQTJCNGUsV0FBbkQsRUFBZ0U7QUFDOUQsZ0JBQUlDLG9CQUFvQnJFLGlCQUFpQnhhLFNBQWpCLENBQTJCNGUsV0FBbkQ7QUFDQXBFLDZCQUFpQnhhLFNBQWpCLENBQTJCNGUsV0FBM0IsR0FBeUMsWUFBVztBQUNsRCxrQkFBSWxRLE1BQU1tUSxrQkFBa0I5VCxLQUFsQixDQUF3QixJQUF4QixFQUE4QnJDLFNBQTlCLENBQVY7QUFDQXlQLG9CQUFNekosR0FBTixFQUFXLG9CQUFYLEVBQWlDLGlCQUFqQztBQUNBeUosb0JBQU16SixHQUFOLEVBQVcscUJBQVgsRUFBa0Msa0JBQWxDO0FBQ0EscUJBQU9BLEdBQVA7QUFDRCxhQUxEO0FBTUQ7O0FBRUQsY0FBSThMLG9CQUFvQkEsaUJBQWlCeGEsU0FBakIsQ0FBMkI4ZSxnQkFBbkQsRUFBcUU7QUFDbkUsZ0JBQUlDLHlCQUF5QnZFLGlCQUFpQnhhLFNBQWpCLENBQTJCOGUsZ0JBQXhEO0FBQ0F0RSw2QkFBaUJ4YSxTQUFqQixDQUEyQjhlLGdCQUEzQixHQUE4QyxVQUFTcFYsQ0FBVCxFQUFZO0FBQ3hELGtCQUFJLEtBQUt6UixJQUFMLEtBQWMsT0FBZCxJQUF5QixRQUFPeVIsQ0FBUCx5Q0FBT0EsQ0FBUCxPQUFhLFFBQTFDLEVBQW9EO0FBQ2xEQSxvQkFBSXJVLEtBQUtDLEtBQUwsQ0FBV0QsS0FBS3FCLFNBQUwsQ0FBZWdULENBQWYsQ0FBWCxDQUFKO0FBQ0F5TyxzQkFBTXpPLENBQU4sRUFBUyxpQkFBVCxFQUE0QixvQkFBNUI7QUFDQXlPLHNCQUFNek8sQ0FBTixFQUFTLGtCQUFULEVBQTZCLHFCQUE3QjtBQUNEO0FBQ0QscUJBQU9xVix1QkFBdUJoVSxLQUF2QixDQUE2QixJQUE3QixFQUFtQyxDQUFDckIsQ0FBRCxDQUFuQyxDQUFQO0FBQ0QsYUFQRDtBQVFEO0FBQ0Y7QUFDRDBOLGtCQUFVaUQsWUFBVixHQUF5QixVQUFTckMsV0FBVCxFQUFzQmtDLFNBQXRCLEVBQWlDQyxPQUFqQyxFQUEwQztBQUNqRSxjQUFJM0osZUFBZXZCLE9BQWYsR0FBeUIsRUFBN0IsRUFBaUM7QUFDL0IsbUJBQU9nTCxjQUFjakMsV0FBZCxFQUEyQmtDLFNBQTNCLEVBQXNDQyxPQUF0QyxDQUFQO0FBQ0Q7QUFDRDtBQUNBdEssZ0JBQU1zRyxVQUFOLENBQWlCLHdCQUFqQixFQUNJLHFDQURKO0FBRUFpQixvQkFBVXFCLFlBQVYsQ0FBdUI0QixZQUF2QixDQUFvQ3JDLFdBQXBDLEVBQWlEcm1CLElBQWpELENBQXNEdW9CLFNBQXRELEVBQWlFQyxPQUFqRTtBQUNELFNBUkQ7QUFTRCxPQWxNRDtBQW9NQyxLQW5OeUMsRUFtTnhDLEVBQUMsWUFBVyxFQUFaLEVBbk53QyxDQXJwSWd3QixFQXcySXZ4QixJQUFHLENBQUMsVUFBUzdpQixPQUFULEVBQWlCVCxNQUFqQixFQUF3QkQsT0FBeEIsRUFBZ0M7QUFDdkQ7Ozs7Ozs7QUFPQTs7QUFDQSxVQUFJaVosUUFBUXZZLFFBQVEsVUFBUixDQUFaOztBQUVBVCxhQUFPRCxPQUFQLEdBQWlCO0FBQ2Z3Yiw2QkFBcUIsNkJBQVMzaEIsTUFBVCxFQUFpQjtBQUNwQyxjQUFJLFFBQU9BLE1BQVAseUNBQU9BLE1BQVAsT0FBa0IsUUFBbEIsSUFBOEIsQ0FBQ0EsT0FBT3FDLGlCQUExQyxFQUE2RDtBQUMzRDtBQUNEO0FBQ0QsY0FBSSxFQUFFLHFCQUFxQnJDLE9BQU9xQyxpQkFBUCxDQUF5QmtOLFNBQWhELENBQUosRUFBZ0U7QUFDOUR2UCxtQkFBT3FDLGlCQUFQLENBQXlCa04sU0FBekIsQ0FBbUNXLGVBQW5DLEdBQXFELFlBQVc7QUFDOUQsa0JBQUksQ0FBQyxLQUFLcWUsYUFBVixFQUF5QjtBQUN2QixxQkFBS0EsYUFBTCxHQUFxQixFQUFyQjtBQUNEO0FBQ0QscUJBQU8sS0FBS0EsYUFBWjtBQUNELGFBTEQ7QUFNRDtBQUNELGNBQUksRUFBRSxtQkFBbUJ2dUIsT0FBT3FDLGlCQUFQLENBQXlCa04sU0FBOUMsQ0FBSixFQUE4RDtBQUM1RHZQLG1CQUFPcUMsaUJBQVAsQ0FBeUJrTixTQUF6QixDQUFtQ2lmLGFBQW5DLEdBQW1ELFVBQVNudUIsRUFBVCxFQUFhO0FBQzlELGtCQUFJNFosU0FBUyxJQUFiO0FBQ0Esa0JBQUksS0FBS3NVLGFBQVQsRUFBd0I7QUFDdEIscUJBQUtBLGFBQUwsQ0FBbUJudEIsT0FBbkIsQ0FBMkIsVUFBU3ZDLE1BQVQsRUFBaUI7QUFDMUMsc0JBQUlBLE9BQU93QixFQUFQLEtBQWNBLEVBQWxCLEVBQXNCO0FBQ3BCNFosNkJBQVNwYixNQUFUO0FBQ0Q7QUFDRixpQkFKRDtBQUtEO0FBQ0Qsa0JBQUksS0FBSzR2QixjQUFULEVBQXlCO0FBQ3ZCLHFCQUFLQSxjQUFMLENBQW9CcnRCLE9BQXBCLENBQTRCLFVBQVN2QyxNQUFULEVBQWlCO0FBQzNDLHNCQUFJQSxPQUFPd0IsRUFBUCxLQUFjQSxFQUFsQixFQUFzQjtBQUNwQjRaLDZCQUFTcGIsTUFBVDtBQUNEO0FBQ0YsaUJBSkQ7QUFLRDtBQUNELHFCQUFPb2IsTUFBUDtBQUNELGFBakJEO0FBa0JEO0FBQ0QsY0FBSSxFQUFFLGVBQWVqYSxPQUFPcUMsaUJBQVAsQ0FBeUJrTixTQUExQyxDQUFKLEVBQTBEO0FBQ3hELGdCQUFJbWYsWUFBWTF1QixPQUFPcUMsaUJBQVAsQ0FBeUJrTixTQUF6QixDQUFtQ3hDLFFBQW5EO0FBQ0EvTSxtQkFBT3FDLGlCQUFQLENBQXlCa04sU0FBekIsQ0FBbUN6TCxTQUFuQyxHQUErQyxVQUFTakYsTUFBVCxFQUFpQjtBQUM5RCxrQkFBSSxDQUFDLEtBQUswdkIsYUFBVixFQUF5QjtBQUN2QixxQkFBS0EsYUFBTCxHQUFxQixFQUFyQjtBQUNEO0FBQ0Qsa0JBQUksS0FBS0EsYUFBTCxDQUFtQm5sQixPQUFuQixDQUEyQnZLLE1BQTNCLE1BQXVDLENBQUMsQ0FBNUMsRUFBK0M7QUFDN0MscUJBQUswdkIsYUFBTCxDQUFtQmp0QixJQUFuQixDQUF3QnpDLE1BQXhCO0FBQ0Q7QUFDRCxrQkFBSXdPLEtBQUssSUFBVDtBQUNBeE8scUJBQU9rUyxTQUFQLEdBQW1CM1AsT0FBbkIsQ0FBMkIsVUFBUytHLEtBQVQsRUFBZ0I7QUFDekN1bUIsMEJBQVV6bkIsSUFBVixDQUFlb0csRUFBZixFQUFtQmxGLEtBQW5CLEVBQTBCdEosTUFBMUI7QUFDRCxlQUZEO0FBR0QsYUFYRDs7QUFhQW1CLG1CQUFPcUMsaUJBQVAsQ0FBeUJrTixTQUF6QixDQUFtQ3hDLFFBQW5DLEdBQThDLFVBQVM1RSxLQUFULEVBQWdCdEosTUFBaEIsRUFBd0I7QUFDcEUsa0JBQUlBLE1BQUosRUFBWTtBQUNWLG9CQUFJLENBQUMsS0FBSzB2QixhQUFWLEVBQXlCO0FBQ3ZCLHVCQUFLQSxhQUFMLEdBQXFCLENBQUMxdkIsTUFBRCxDQUFyQjtBQUNELGlCQUZELE1BRU8sSUFBSSxLQUFLMHZCLGFBQUwsQ0FBbUJubEIsT0FBbkIsQ0FBMkJ2SyxNQUEzQixNQUF1QyxDQUFDLENBQTVDLEVBQStDO0FBQ3BELHVCQUFLMHZCLGFBQUwsQ0FBbUJqdEIsSUFBbkIsQ0FBd0J6QyxNQUF4QjtBQUNEO0FBQ0Y7QUFDRCxxQkFBTzZ2QixVQUFVem5CLElBQVYsQ0FBZSxJQUFmLEVBQXFCa0IsS0FBckIsRUFBNEJ0SixNQUE1QixDQUFQO0FBQ0QsYUFURDtBQVVEO0FBQ0QsY0FBSSxFQUFFLGtCQUFrQm1CLE9BQU9xQyxpQkFBUCxDQUF5QmtOLFNBQTdDLENBQUosRUFBNkQ7QUFDM0R2UCxtQkFBT3FDLGlCQUFQLENBQXlCa04sU0FBekIsQ0FBbUNtQyxZQUFuQyxHQUFrRCxVQUFTN1MsTUFBVCxFQUFpQjtBQUNqRSxrQkFBSSxDQUFDLEtBQUswdkIsYUFBVixFQUF5QjtBQUN2QixxQkFBS0EsYUFBTCxHQUFxQixFQUFyQjtBQUNEO0FBQ0Qsa0JBQUkxVCxRQUFRLEtBQUswVCxhQUFMLENBQW1CbmxCLE9BQW5CLENBQTJCdkssTUFBM0IsQ0FBWjtBQUNBLGtCQUFJZ2MsVUFBVSxDQUFDLENBQWYsRUFBa0I7QUFDaEI7QUFDRDtBQUNELG1CQUFLMFQsYUFBTCxDQUFtQjljLE1BQW5CLENBQTBCb0osS0FBMUIsRUFBaUMsQ0FBakM7QUFDQSxrQkFBSXhOLEtBQUssSUFBVDtBQUNBLGtCQUFJc2hCLFNBQVM5dkIsT0FBT2tTLFNBQVAsRUFBYjtBQUNBLG1CQUFLWSxVQUFMLEdBQWtCdlEsT0FBbEIsQ0FBMEIsVUFBU2tRLE1BQVQsRUFBaUI7QUFDekMsb0JBQUlxZCxPQUFPdmxCLE9BQVAsQ0FBZWtJLE9BQU9uSixLQUF0QixNQUFpQyxDQUFDLENBQXRDLEVBQXlDO0FBQ3ZDa0YscUJBQUdGLFdBQUgsQ0FBZW1FLE1BQWY7QUFDRDtBQUNGLGVBSkQ7QUFLRCxhQWhCRDtBQWlCRDtBQUNGLFNBOUVjO0FBK0Vmc1EsOEJBQXNCLDhCQUFTNWhCLE1BQVQsRUFBaUI7QUFDckMsY0FBSSxRQUFPQSxNQUFQLHlDQUFPQSxNQUFQLE9BQWtCLFFBQWxCLElBQThCLENBQUNBLE9BQU9xQyxpQkFBMUMsRUFBNkQ7QUFDM0Q7QUFDRDtBQUNELGNBQUksRUFBRSxzQkFBc0JyQyxPQUFPcUMsaUJBQVAsQ0FBeUJrTixTQUFqRCxDQUFKLEVBQWlFO0FBQy9EdlAsbUJBQU9xQyxpQkFBUCxDQUF5QmtOLFNBQXpCLENBQW1DWSxnQkFBbkMsR0FBc0QsWUFBVztBQUMvRCxxQkFBTyxLQUFLc2UsY0FBTCxHQUFzQixLQUFLQSxjQUEzQixHQUE0QyxFQUFuRDtBQUNELGFBRkQ7QUFHRDtBQUNELGNBQUksRUFBRSxpQkFBaUJ6dUIsT0FBT3FDLGlCQUFQLENBQXlCa04sU0FBNUMsQ0FBSixFQUE0RDtBQUMxRDFKLG1CQUFPbU0sY0FBUCxDQUFzQmhTLE9BQU9xQyxpQkFBUCxDQUF5QmtOLFNBQS9DLEVBQTBELGFBQTFELEVBQXlFO0FBQ3ZFMEgsbUJBQUssZUFBVztBQUNkLHVCQUFPLEtBQUsyWCxZQUFaO0FBQ0QsZUFIc0U7QUFJdkUxVSxtQkFBSyxhQUFTaFUsQ0FBVCxFQUFZO0FBQ2Ysb0JBQUltSCxLQUFLLElBQVQ7QUFDQSxvQkFBSSxLQUFLdWhCLFlBQVQsRUFBdUI7QUFDckIsdUJBQUtwYyxtQkFBTCxDQUF5QixXQUF6QixFQUFzQyxLQUFLb2MsWUFBM0M7QUFDQSx1QkFBS3BjLG1CQUFMLENBQXlCLE9BQXpCLEVBQWtDLEtBQUtxYyxnQkFBdkM7QUFDRDtBQUNELHFCQUFLemQsZ0JBQUwsQ0FBc0IsV0FBdEIsRUFBbUMsS0FBS3dkLFlBQUwsR0FBb0Ixb0IsQ0FBdkQ7QUFDQSxxQkFBS2tMLGdCQUFMLENBQXNCLE9BQXRCLEVBQStCLEtBQUt5ZCxnQkFBTCxHQUF3QixVQUFTdHJCLENBQVQsRUFBWTtBQUNqRUEsb0JBQUVHLE9BQUYsQ0FBVXRDLE9BQVYsQ0FBa0IsVUFBU3ZDLE1BQVQsRUFBaUI7QUFDakMsd0JBQUksQ0FBQ3dPLEdBQUdvaEIsY0FBUixFQUF3QjtBQUN0QnBoQix5QkFBR29oQixjQUFILEdBQW9CLEVBQXBCO0FBQ0Q7QUFDRCx3QkFBSXBoQixHQUFHb2hCLGNBQUgsQ0FBa0JybEIsT0FBbEIsQ0FBMEJ2SyxNQUExQixLQUFxQyxDQUF6QyxFQUE0QztBQUMxQztBQUNEO0FBQ0R3Tyx1QkFBR29oQixjQUFILENBQWtCbnRCLElBQWxCLENBQXVCekMsTUFBdkI7QUFDQSx3QkFBSXFCLFFBQVEsSUFBSXNOLEtBQUosQ0FBVSxXQUFWLENBQVo7QUFDQXROLDBCQUFNckIsTUFBTixHQUFlQSxNQUFmO0FBQ0F3Tyx1QkFBR0wsYUFBSCxDQUFpQjlNLEtBQWpCO0FBQ0QsbUJBWEQ7QUFZRCxpQkFiRDtBQWNEO0FBekJzRSxhQUF6RTtBQTJCRDtBQUNGLFNBckhjO0FBc0hmd2hCLDBCQUFrQiwwQkFBUzFoQixNQUFULEVBQWlCO0FBQ2pDLGNBQUksUUFBT0EsTUFBUCx5Q0FBT0EsTUFBUCxPQUFrQixRQUFsQixJQUE4QixDQUFDQSxPQUFPcUMsaUJBQTFDLEVBQTZEO0FBQzNEO0FBQ0Q7QUFDRCxjQUFJa04sWUFBWXZQLE9BQU9xQyxpQkFBUCxDQUF5QmtOLFNBQXpDO0FBQ0EsY0FBSXhMLGNBQWN3TCxVQUFVeEwsV0FBNUI7QUFDQSxjQUFJdkIsZUFBZStNLFVBQVUvTSxZQUE3QjtBQUNBLGNBQUlFLHNCQUFzQjZNLFVBQVU3TSxtQkFBcEM7QUFDQSxjQUFJSix1QkFBdUJpTixVQUFVak4sb0JBQXJDO0FBQ0EsY0FBSWUsa0JBQWtCa00sVUFBVWxNLGVBQWhDOztBQUVBa00sb0JBQVV4TCxXQUFWLEdBQXdCLFVBQVM4aEIsZUFBVCxFQUEwQmlKLGVBQTFCLEVBQTJDO0FBQ2pFLGdCQUFJdlAsVUFBV3RILFVBQVV4VyxNQUFWLElBQW9CLENBQXJCLEdBQTBCd1csVUFBVSxDQUFWLENBQTFCLEdBQXlDQSxVQUFVLENBQVYsQ0FBdkQ7QUFDQSxnQkFBSXdPLFVBQVUxaUIsWUFBWXVXLEtBQVosQ0FBa0IsSUFBbEIsRUFBd0IsQ0FBQ2lGLE9BQUQsQ0FBeEIsQ0FBZDtBQUNBLGdCQUFJLENBQUN1UCxlQUFMLEVBQXNCO0FBQ3BCLHFCQUFPckksT0FBUDtBQUNEO0FBQ0RBLG9CQUFRdmxCLElBQVIsQ0FBYTJrQixlQUFiLEVBQThCaUosZUFBOUI7QUFDQSxtQkFBT3BwQixRQUFRdEQsT0FBUixFQUFQO0FBQ0QsV0FSRDs7QUFVQW1OLG9CQUFVL00sWUFBVixHQUF5QixVQUFTcWpCLGVBQVQsRUFBMEJpSixlQUExQixFQUEyQztBQUNsRSxnQkFBSXZQLFVBQVd0SCxVQUFVeFcsTUFBVixJQUFvQixDQUFyQixHQUEwQndXLFVBQVUsQ0FBVixDQUExQixHQUF5Q0EsVUFBVSxDQUFWLENBQXZEO0FBQ0EsZ0JBQUl3TyxVQUFVamtCLGFBQWE4WCxLQUFiLENBQW1CLElBQW5CLEVBQXlCLENBQUNpRixPQUFELENBQXpCLENBQWQ7QUFDQSxnQkFBSSxDQUFDdVAsZUFBTCxFQUFzQjtBQUNwQixxQkFBT3JJLE9BQVA7QUFDRDtBQUNEQSxvQkFBUXZsQixJQUFSLENBQWEya0IsZUFBYixFQUE4QmlKLGVBQTlCO0FBQ0EsbUJBQU9wcEIsUUFBUXRELE9BQVIsRUFBUDtBQUNELFdBUkQ7O0FBVUEsY0FBSTJzQixlQUFlLHNCQUFTeGlCLFdBQVQsRUFBc0JzWixlQUF0QixFQUF1Q2lKLGVBQXZDLEVBQXdEO0FBQ3pFLGdCQUFJckksVUFBVS9qQixvQkFBb0I0WCxLQUFwQixDQUEwQixJQUExQixFQUFnQyxDQUFDL04sV0FBRCxDQUFoQyxDQUFkO0FBQ0EsZ0JBQUksQ0FBQ3VpQixlQUFMLEVBQXNCO0FBQ3BCLHFCQUFPckksT0FBUDtBQUNEO0FBQ0RBLG9CQUFRdmxCLElBQVIsQ0FBYTJrQixlQUFiLEVBQThCaUosZUFBOUI7QUFDQSxtQkFBT3BwQixRQUFRdEQsT0FBUixFQUFQO0FBQ0QsV0FQRDtBQVFBbU4sb0JBQVU3TSxtQkFBVixHQUFnQ3FzQixZQUFoQzs7QUFFQUEseUJBQWUsc0JBQVN4aUIsV0FBVCxFQUFzQnNaLGVBQXRCLEVBQXVDaUosZUFBdkMsRUFBd0Q7QUFDckUsZ0JBQUlySSxVQUFVbmtCLHFCQUFxQmdZLEtBQXJCLENBQTJCLElBQTNCLEVBQWlDLENBQUMvTixXQUFELENBQWpDLENBQWQ7QUFDQSxnQkFBSSxDQUFDdWlCLGVBQUwsRUFBc0I7QUFDcEIscUJBQU9ySSxPQUFQO0FBQ0Q7QUFDREEsb0JBQVF2bEIsSUFBUixDQUFhMmtCLGVBQWIsRUFBOEJpSixlQUE5QjtBQUNBLG1CQUFPcHBCLFFBQVF0RCxPQUFSLEVBQVA7QUFDRCxXQVBEO0FBUUFtTixvQkFBVWpOLG9CQUFWLEdBQWlDeXNCLFlBQWpDOztBQUVBQSx5QkFBZSxzQkFBU3ZyQixTQUFULEVBQW9CcWlCLGVBQXBCLEVBQXFDaUosZUFBckMsRUFBc0Q7QUFDbkUsZ0JBQUlySSxVQUFVcGpCLGdCQUFnQmlYLEtBQWhCLENBQXNCLElBQXRCLEVBQTRCLENBQUM5VyxTQUFELENBQTVCLENBQWQ7QUFDQSxnQkFBSSxDQUFDc3JCLGVBQUwsRUFBc0I7QUFDcEIscUJBQU9ySSxPQUFQO0FBQ0Q7QUFDREEsb0JBQVF2bEIsSUFBUixDQUFhMmtCLGVBQWIsRUFBOEJpSixlQUE5QjtBQUNBLG1CQUFPcHBCLFFBQVF0RCxPQUFSLEVBQVA7QUFDRCxXQVBEO0FBUUFtTixvQkFBVWxNLGVBQVYsR0FBNEIwckIsWUFBNUI7QUFDRCxTQWxMYztBQW1MZmpPLDBCQUFrQiwwQkFBUzlnQixNQUFULEVBQWlCO0FBQ2pDLGNBQUkybUIsWUFBWTNtQixVQUFVQSxPQUFPMm1CLFNBQWpDOztBQUVBLGNBQUksQ0FBQ0EsVUFBVWlELFlBQWYsRUFBNkI7QUFDM0IsZ0JBQUlqRCxVQUFVZ0Qsa0JBQWQsRUFBa0M7QUFDaENoRCx3QkFBVWlELFlBQVYsR0FBeUJqRCxVQUFVZ0Qsa0JBQVYsQ0FBNkI1YixJQUE3QixDQUFrQzRZLFNBQWxDLENBQXpCO0FBQ0QsYUFGRCxNQUVPLElBQUlBLFVBQVVxQixZQUFWLElBQ1ByQixVQUFVcUIsWUFBVixDQUF1QjRCLFlBRHBCLEVBQ2tDO0FBQ3ZDakQsd0JBQVVpRCxZQUFWLEdBQXlCLFVBQVNyQyxXQUFULEVBQXNCeUgsRUFBdEIsRUFBMEJDLEtBQTFCLEVBQWlDO0FBQ3hEdEksMEJBQVVxQixZQUFWLENBQXVCNEIsWUFBdkIsQ0FBb0NyQyxXQUFwQyxFQUNDcm1CLElBREQsQ0FDTTh0QixFQUROLEVBQ1VDLEtBRFY7QUFFRCxlQUh3QixDQUd2QmxoQixJQUh1QixDQUdsQjRZLFNBSGtCLENBQXpCO0FBSUQ7QUFDRjtBQUNGLFNBak1jO0FBa01mbEYsOEJBQXNCLDhCQUFTemhCLE1BQVQsRUFBaUI7QUFDckM7QUFDQSxjQUFJd2xCLHFCQUFxQnhsQixPQUFPcUMsaUJBQWhDO0FBQ0FyQyxpQkFBT3FDLGlCQUFQLEdBQTJCLFVBQVMraUIsUUFBVCxFQUFtQkMsYUFBbkIsRUFBa0M7QUFDM0QsZ0JBQUlELFlBQVlBLFNBQVMxYyxVQUF6QixFQUFxQztBQUNuQyxrQkFBSStjLGdCQUFnQixFQUFwQjtBQUNBLG1CQUFLLElBQUl0aEIsSUFBSSxDQUFiLEVBQWdCQSxJQUFJaWhCLFNBQVMxYyxVQUFULENBQW9CakgsTUFBeEMsRUFBZ0QwQyxHQUFoRCxFQUFxRDtBQUNuRCxvQkFBSTJFLFNBQVNzYyxTQUFTMWMsVUFBVCxDQUFvQnZFLENBQXBCLENBQWI7QUFDQSxvQkFBSSxDQUFDMkUsT0FBTytXLGNBQVAsQ0FBc0IsTUFBdEIsQ0FBRCxJQUNBL1csT0FBTytXLGNBQVAsQ0FBc0IsS0FBdEIsQ0FESixFQUNrQztBQUNoQ1Qsd0JBQU1zRyxVQUFOLENBQWlCLGtCQUFqQixFQUFxQyxtQkFBckM7QUFDQTVjLDJCQUFTbEUsS0FBS0MsS0FBTCxDQUFXRCxLQUFLcUIsU0FBTCxDQUFlNkMsTUFBZixDQUFYLENBQVQ7QUFDQUEseUJBQU9DLElBQVAsR0FBY0QsT0FBT0UsR0FBckI7QUFDQSx5QkFBT0YsT0FBT0UsR0FBZDtBQUNBeWMsZ0NBQWNua0IsSUFBZCxDQUFtQndILE1BQW5CO0FBQ0QsaUJBUEQsTUFPTztBQUNMMmMsZ0NBQWNua0IsSUFBZCxDQUFtQjhqQixTQUFTMWMsVUFBVCxDQUFvQnZFLENBQXBCLENBQW5CO0FBQ0Q7QUFDRjtBQUNEaWhCLHVCQUFTMWMsVUFBVCxHQUFzQitjLGFBQXRCO0FBQ0Q7QUFDRCxtQkFBTyxJQUFJRCxrQkFBSixDQUF1QkosUUFBdkIsRUFBaUNDLGFBQWpDLENBQVA7QUFDRCxXQW5CRDtBQW9CQXJsQixpQkFBT3FDLGlCQUFQLENBQXlCa04sU0FBekIsR0FBcUNpVyxtQkFBbUJqVyxTQUF4RDtBQUNBO0FBQ0EsY0FBSSx5QkFBeUJ2UCxPQUFPcUMsaUJBQXBDLEVBQXVEO0FBQ3JEd0QsbUJBQU9tTSxjQUFQLENBQXNCaFMsT0FBT3FDLGlCQUE3QixFQUFnRCxxQkFBaEQsRUFBdUU7QUFDckU0VSxtQkFBSyxlQUFXO0FBQ2QsdUJBQU91TyxtQkFBbUJELG1CQUExQjtBQUNEO0FBSG9FLGFBQXZFO0FBS0Q7QUFDRixTQWxPYztBQW1PZjFELG1DQUEyQixtQ0FBUzdoQixNQUFULEVBQWlCO0FBQzFDO0FBQ0EsY0FBSSxRQUFPQSxNQUFQLHlDQUFPQSxNQUFQLE9BQWtCLFFBQWxCLElBQThCQSxPQUFPcUMsaUJBQXJDLElBQ0MsY0FBY3JDLE9BQU9pdEIsYUFBUCxDQUFxQjFkLFNBRHBDO0FBRUE7QUFDQTtBQUNBLFdBQUN2UCxPQUFPa3ZCLGNBSlosRUFJNEI7QUFDMUJycEIsbUJBQU9tTSxjQUFQLENBQXNCaFMsT0FBT2l0QixhQUFQLENBQXFCMWQsU0FBM0MsRUFBc0QsYUFBdEQsRUFBcUU7QUFDbkUwSCxtQkFBSyxlQUFXO0FBQ2QsdUJBQU8sRUFBQzNKLFVBQVUsS0FBS0EsUUFBaEIsRUFBUDtBQUNEO0FBSGtFLGFBQXJFO0FBS0Q7QUFDRixTQWhQYzs7QUFrUGZ3VSwrQkFBdUIsK0JBQVM5aEIsTUFBVCxFQUFpQjtBQUN0QyxjQUFJbXZCLGtCQUFrQm52QixPQUFPcUMsaUJBQVAsQ0FBeUJrTixTQUF6QixDQUFtQ3hMLFdBQXpEO0FBQ0EvRCxpQkFBT3FDLGlCQUFQLENBQXlCa04sU0FBekIsQ0FBbUN4TCxXQUFuQyxHQUFpRCxVQUFTaVUsWUFBVCxFQUF1QjtBQUN0RSxnQkFBSTNLLEtBQUssSUFBVDtBQUNBLGdCQUFJMkssWUFBSixFQUFrQjtBQUNoQixrQkFBSSxPQUFPQSxhQUFhSSxtQkFBcEIsS0FBNEMsV0FBaEQsRUFBNkQ7QUFDM0Q7QUFDQUosNkJBQWFJLG1CQUFiLEdBQW1DLENBQUMsQ0FBQ0osYUFBYUksbUJBQWxEO0FBQ0Q7QUFDRCxrQkFBSWdYLG1CQUFtQi9oQixHQUFHZ2lCLGVBQUgsR0FBcUJ2akIsSUFBckIsQ0FBMEIsVUFBUzFFLFdBQVQsRUFBc0I7QUFDckUsdUJBQU9BLFlBQVlrSyxNQUFaLENBQW1CbkosS0FBbkIsSUFDSGYsWUFBWWtLLE1BQVosQ0FBbUJuSixLQUFuQixDQUF5QlgsSUFBekIsS0FBa0MsT0FEdEM7QUFFRCxlQUhzQixDQUF2QjtBQUlBLGtCQUFJd1EsYUFBYUksbUJBQWIsS0FBcUMsS0FBckMsSUFBOENnWCxnQkFBbEQsRUFBb0U7QUFDbEUsb0JBQUlBLGlCQUFpQnBaLFNBQWpCLEtBQStCLFVBQW5DLEVBQStDO0FBQzdDLHNCQUFJb1osaUJBQWlCRSxZQUFyQixFQUFtQztBQUNqQ0YscUNBQWlCRSxZQUFqQixDQUE4QixVQUE5QjtBQUNELG1CQUZELE1BRU87QUFDTEYscUNBQWlCcFosU0FBakIsR0FBNkIsVUFBN0I7QUFDRDtBQUNGLGlCQU5ELE1BTU8sSUFBSW9aLGlCQUFpQnBaLFNBQWpCLEtBQStCLFVBQW5DLEVBQStDO0FBQ3BELHNCQUFJb1osaUJBQWlCRSxZQUFyQixFQUFtQztBQUNqQ0YscUNBQWlCRSxZQUFqQixDQUE4QixVQUE5QjtBQUNELG1CQUZELE1BRU87QUFDTEYscUNBQWlCcFosU0FBakIsR0FBNkIsVUFBN0I7QUFDRDtBQUNGO0FBQ0YsZUFkRCxNQWNPLElBQUlnQyxhQUFhSSxtQkFBYixLQUFxQyxJQUFyQyxJQUNQLENBQUNnWCxnQkFERSxFQUNnQjtBQUNyQi9oQixtQkFBR2tpQixjQUFILENBQWtCLE9BQWxCO0FBQ0Q7O0FBR0Qsa0JBQUksT0FBT3ZYLGFBQWFJLG1CQUFwQixLQUE0QyxXQUFoRCxFQUE2RDtBQUMzRDtBQUNBSiw2QkFBYUssbUJBQWIsR0FBbUMsQ0FBQyxDQUFDTCxhQUFhSyxtQkFBbEQ7QUFDRDtBQUNELGtCQUFJbVgsbUJBQW1CbmlCLEdBQUdnaUIsZUFBSCxHQUFxQnZqQixJQUFyQixDQUEwQixVQUFTMUUsV0FBVCxFQUFzQjtBQUNyRSx1QkFBT0EsWUFBWWtLLE1BQVosQ0FBbUJuSixLQUFuQixJQUNIZixZQUFZa0ssTUFBWixDQUFtQm5KLEtBQW5CLENBQXlCWCxJQUF6QixLQUFrQyxPQUR0QztBQUVELGVBSHNCLENBQXZCO0FBSUEsa0JBQUl3USxhQUFhSyxtQkFBYixLQUFxQyxLQUFyQyxJQUE4Q21YLGdCQUFsRCxFQUFvRTtBQUNsRSxvQkFBSUEsaUJBQWlCeFosU0FBakIsS0FBK0IsVUFBbkMsRUFBK0M7QUFDN0N3WixtQ0FBaUJGLFlBQWpCLENBQThCLFVBQTlCO0FBQ0QsaUJBRkQsTUFFTyxJQUFJRSxpQkFBaUJ4WixTQUFqQixLQUErQixVQUFuQyxFQUErQztBQUNwRHdaLG1DQUFpQkYsWUFBakIsQ0FBOEIsVUFBOUI7QUFDRDtBQUNGLGVBTkQsTUFNTyxJQUFJdFgsYUFBYUssbUJBQWIsS0FBcUMsSUFBckMsSUFDUCxDQUFDbVgsZ0JBREUsRUFDZ0I7QUFDckJuaUIsbUJBQUdraUIsY0FBSCxDQUFrQixPQUFsQjtBQUNEO0FBQ0Y7QUFDRCxtQkFBT0osZ0JBQWdCN1UsS0FBaEIsQ0FBc0JqTixFQUF0QixFQUEwQjRLLFNBQTFCLENBQVA7QUFDRCxXQW5ERDtBQW9ERDtBQXhTYyxPQUFqQjtBQTJTQyxLQXRUcUIsRUFzVHBCLEVBQUMsWUFBVyxFQUFaLEVBdFRvQixDQXgySW94QixFQThwSnZ4QixJQUFHLENBQUMsVUFBU3BSLE9BQVQsRUFBaUJULE1BQWpCLEVBQXdCRCxPQUF4QixFQUFnQztBQUN2RDs7Ozs7OztBQU9DO0FBQ0Q7O0FBRUEsVUFBSXNwQixlQUFlLElBQW5CO0FBQ0EsVUFBSUMsdUJBQXVCLElBQTNCOztBQUVBOzs7Ozs7OztBQVFBLGVBQVNuUCxjQUFULENBQXdCb1AsUUFBeEIsRUFBa0NDLElBQWxDLEVBQXdDQyxHQUF4QyxFQUE2QztBQUMzQyxZQUFJckgsUUFBUW1ILFNBQVNuSCxLQUFULENBQWVvSCxJQUFmLENBQVo7QUFDQSxlQUFPcEgsU0FBU0EsTUFBTS9tQixNQUFOLElBQWdCb3VCLEdBQXpCLElBQWdDdHVCLFNBQVNpbkIsTUFBTXFILEdBQU4sQ0FBVCxFQUFxQixFQUFyQixDQUF2QztBQUNEOztBQUVEO0FBQ0E7QUFDQSxlQUFTek4sdUJBQVQsQ0FBaUNwaUIsTUFBakMsRUFBeUM4dkIsZUFBekMsRUFBMERDLE9BQTFELEVBQW1FO0FBQ2pFLFlBQUksQ0FBQy92QixPQUFPcUMsaUJBQVosRUFBK0I7QUFDN0I7QUFDRDtBQUNELFlBQUkydEIsUUFBUWh3QixPQUFPcUMsaUJBQVAsQ0FBeUJrTixTQUFyQztBQUNBLFlBQUkwZ0IseUJBQXlCRCxNQUFNNWUsZ0JBQW5DO0FBQ0E0ZSxjQUFNNWUsZ0JBQU4sR0FBeUIsVUFBUzhlLGVBQVQsRUFBMEJsQixFQUExQixFQUE4QjtBQUNyRCxjQUFJa0Isb0JBQW9CSixlQUF4QixFQUF5QztBQUN2QyxtQkFBT0csdUJBQXVCM1YsS0FBdkIsQ0FBNkIsSUFBN0IsRUFBbUNyQyxTQUFuQyxDQUFQO0FBQ0Q7QUFDRCxjQUFJa1ksa0JBQWtCLFNBQWxCQSxlQUFrQixDQUFTNXNCLENBQVQsRUFBWTtBQUNoQ3lyQixlQUFHZSxRQUFReHNCLENBQVIsQ0FBSDtBQUNELFdBRkQ7QUFHQSxlQUFLNnNCLFNBQUwsR0FBaUIsS0FBS0EsU0FBTCxJQUFrQixFQUFuQztBQUNBLGVBQUtBLFNBQUwsQ0FBZXBCLEVBQWYsSUFBcUJtQixlQUFyQjtBQUNBLGlCQUFPRix1QkFBdUIzVixLQUF2QixDQUE2QixJQUE3QixFQUFtQyxDQUFDNFYsZUFBRCxFQUN4Q0MsZUFEd0MsQ0FBbkMsQ0FBUDtBQUVELFNBWEQ7O0FBYUEsWUFBSUUsNEJBQTRCTCxNQUFNeGQsbUJBQXRDO0FBQ0F3ZCxjQUFNeGQsbUJBQU4sR0FBNEIsVUFBUzBkLGVBQVQsRUFBMEJsQixFQUExQixFQUE4QjtBQUN4RCxjQUFJa0Isb0JBQW9CSixlQUFwQixJQUF1QyxDQUFDLEtBQUtNLFNBQTdDLElBQ0csQ0FBQyxLQUFLQSxTQUFMLENBQWVwQixFQUFmLENBRFIsRUFDNEI7QUFDMUIsbUJBQU9xQiwwQkFBMEIvVixLQUExQixDQUFnQyxJQUFoQyxFQUFzQ3JDLFNBQXRDLENBQVA7QUFDRDtBQUNELGNBQUlxWSxjQUFjLEtBQUtGLFNBQUwsQ0FBZXBCLEVBQWYsQ0FBbEI7QUFDQSxpQkFBTyxLQUFLb0IsU0FBTCxDQUFlcEIsRUFBZixDQUFQO0FBQ0EsaUJBQU9xQiwwQkFBMEIvVixLQUExQixDQUFnQyxJQUFoQyxFQUFzQyxDQUFDNFYsZUFBRCxFQUMzQ0ksV0FEMkMsQ0FBdEMsQ0FBUDtBQUVELFNBVEQ7O0FBV0F6cUIsZUFBT21NLGNBQVAsQ0FBc0JnZSxLQUF0QixFQUE2QixPQUFPRixlQUFwQyxFQUFxRDtBQUNuRDdZLGVBQUssZUFBVztBQUNkLG1CQUFPLEtBQUssUUFBUTZZLGVBQWIsQ0FBUDtBQUNELFdBSGtEO0FBSW5ENVYsZUFBSyxhQUFTOFUsRUFBVCxFQUFhO0FBQ2hCLGdCQUFJLEtBQUssUUFBUWMsZUFBYixDQUFKLEVBQW1DO0FBQ2pDLG1CQUFLdGQsbUJBQUwsQ0FBeUJzZCxlQUF6QixFQUNJLEtBQUssUUFBUUEsZUFBYixDQURKO0FBRUEscUJBQU8sS0FBSyxRQUFRQSxlQUFiLENBQVA7QUFDRDtBQUNELGdCQUFJZCxFQUFKLEVBQVE7QUFDTixtQkFBSzVkLGdCQUFMLENBQXNCMGUsZUFBdEIsRUFDSSxLQUFLLFFBQVFBLGVBQWIsSUFBZ0NkLEVBRHBDO0FBRUQ7QUFDRjtBQWRrRCxTQUFyRDtBQWdCRDs7QUFFRDtBQUNBNW9CLGFBQU9ELE9BQVAsR0FBaUI7QUFDZm9hLHdCQUFnQkEsY0FERDtBQUVmNkIsaUNBQXlCQSx1QkFGVjtBQUdmNUIsb0JBQVksb0JBQVMrUCxJQUFULEVBQWU7QUFDekIsY0FBSSxPQUFPQSxJQUFQLEtBQWdCLFNBQXBCLEVBQStCO0FBQzdCLG1CQUFPLElBQUl6cEIsS0FBSixDQUFVLDRCQUEyQnlwQixJQUEzQix5Q0FBMkJBLElBQTNCLEtBQ2IseUJBREcsQ0FBUDtBQUVEO0FBQ0RkLHlCQUFlYyxJQUFmO0FBQ0EsaUJBQVFBLElBQUQsR0FBUyw2QkFBVCxHQUNILDRCQURKO0FBRUQsU0FYYzs7QUFhZjs7OztBQUlBOVAseUJBQWlCLHlCQUFTOFAsSUFBVCxFQUFlO0FBQzlCLGNBQUksT0FBT0EsSUFBUCxLQUFnQixTQUFwQixFQUErQjtBQUM3QixtQkFBTyxJQUFJenBCLEtBQUosQ0FBVSw0QkFBMkJ5cEIsSUFBM0IseUNBQTJCQSxJQUEzQixLQUNiLHlCQURHLENBQVA7QUFFRDtBQUNEYixpQ0FBdUIsQ0FBQ2EsSUFBeEI7QUFDQSxpQkFBTyxzQ0FBc0NBLE9BQU8sVUFBUCxHQUFvQixTQUExRCxDQUFQO0FBQ0QsU0F4QmM7O0FBMEJmN3hCLGFBQUssZUFBVztBQUNkLGNBQUksUUFBT3NCLE1BQVAseUNBQU9BLE1BQVAsT0FBa0IsUUFBdEIsRUFBZ0M7QUFDOUIsZ0JBQUl5dkIsWUFBSixFQUFrQjtBQUNoQjtBQUNEO0FBQ0QsZ0JBQUksT0FBT2pxQixPQUFQLEtBQW1CLFdBQW5CLElBQWtDLE9BQU9BLFFBQVE5RyxHQUFmLEtBQXVCLFVBQTdELEVBQXlFO0FBQ3ZFOEcsc0JBQVE5RyxHQUFSLENBQVk0YixLQUFaLENBQWtCOVUsT0FBbEIsRUFBMkJ5UyxTQUEzQjtBQUNEO0FBQ0Y7QUFDRixTQW5DYzs7QUFxQ2Y7OztBQUdBeU4sb0JBQVksb0JBQVM4SyxTQUFULEVBQW9CQyxTQUFwQixFQUErQjtBQUN6QyxjQUFJLENBQUNmLG9CQUFMLEVBQTJCO0FBQ3pCO0FBQ0Q7QUFDRGxxQixrQkFBUXlELElBQVIsQ0FBYXVuQixZQUFZLDZCQUFaLEdBQTRDQyxTQUE1QyxHQUNULFdBREo7QUFFRCxTQTlDYzs7QUFnRGY7Ozs7OztBQU1BelEsdUJBQWUsdUJBQVNoZ0IsTUFBVCxFQUFpQjtBQUM5QixjQUFJMm1CLFlBQVkzbUIsVUFBVUEsT0FBTzJtQixTQUFqQzs7QUFFQTtBQUNBLGNBQUkxTSxTQUFTLEVBQWI7QUFDQUEsaUJBQU95RyxPQUFQLEdBQWlCLElBQWpCO0FBQ0F6RyxpQkFBT3VFLE9BQVAsR0FBaUIsSUFBakI7O0FBRUE7QUFDQSxjQUFJLE9BQU94ZSxNQUFQLEtBQWtCLFdBQWxCLElBQWlDLENBQUNBLE9BQU8ybUIsU0FBN0MsRUFBd0Q7QUFDdEQxTSxtQkFBT3lHLE9BQVAsR0FBaUIsZ0JBQWpCO0FBQ0EsbUJBQU96RyxNQUFQO0FBQ0Q7O0FBRUQsY0FBSTBNLFVBQVVvSCxlQUFkLEVBQStCO0FBQUU7QUFDL0I5VCxtQkFBT3lHLE9BQVAsR0FBaUIsU0FBakI7QUFDQXpHLG1CQUFPdUUsT0FBUCxHQUFpQitCLGVBQWVvRyxVQUFVK0osU0FBekIsRUFDYixrQkFEYSxFQUNPLENBRFAsQ0FBakI7QUFFRCxXQUpELE1BSU8sSUFBSS9KLFVBQVVnRCxrQkFBZCxFQUFrQztBQUN2QztBQUNBO0FBQ0ExUCxtQkFBT3lHLE9BQVAsR0FBaUIsUUFBakI7QUFDQXpHLG1CQUFPdUUsT0FBUCxHQUFpQitCLGVBQWVvRyxVQUFVK0osU0FBekIsRUFDYix1QkFEYSxFQUNZLENBRFosQ0FBakI7QUFFRCxXQU5NLE1BTUEsSUFBSS9KLFVBQVVxQixZQUFWLElBQ1ByQixVQUFVK0osU0FBVixDQUFvQmxJLEtBQXBCLENBQTBCLG9CQUExQixDQURHLEVBQzhDO0FBQUU7QUFDckR2TyxtQkFBT3lHLE9BQVAsR0FBaUIsTUFBakI7QUFDQXpHLG1CQUFPdUUsT0FBUCxHQUFpQitCLGVBQWVvRyxVQUFVK0osU0FBekIsRUFDYixvQkFEYSxFQUNTLENBRFQsQ0FBakI7QUFFRCxXQUxNLE1BS0EsSUFBSTF3QixPQUFPcUMsaUJBQVAsSUFDUHNrQixVQUFVK0osU0FBVixDQUFvQmxJLEtBQXBCLENBQTBCLHNCQUExQixDQURHLEVBQ2dEO0FBQUU7QUFDdkR2TyxtQkFBT3lHLE9BQVAsR0FBaUIsUUFBakI7QUFDQXpHLG1CQUFPdUUsT0FBUCxHQUFpQitCLGVBQWVvRyxVQUFVK0osU0FBekIsRUFDYixzQkFEYSxFQUNXLENBRFgsQ0FBakI7QUFFRCxXQUxNLE1BS0E7QUFBRTtBQUNQelcsbUJBQU95RyxPQUFQLEdBQWlCLDBCQUFqQjtBQUNBLG1CQUFPekcsTUFBUDtBQUNEOztBQUVELGlCQUFPQSxNQUFQO0FBQ0Q7QUE5RmMsT0FBakI7QUFpR0MsS0FoTHFCLEVBZ0xwQixFQWhMb0IsQ0E5cEpveEIsRUFBM2IsRUE4MEp4VyxFQTkwSndXLEVBODBKclcsQ0FBQyxDQUFELENBOTBKcVcsRUE4MEpoVyxDQTkwSmdXLENBQVA7QUErMEp2VyxDQS8wSkQsRSIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLldlYlJUQ1Byb3ZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gMTEuLlxuICovXG5pbXBvcnQgUHJvdmlkZXIgZnJvbSBcImFwaS9wcm92aWRlci9odG1sNS9Qcm92aWRlclwiO1xuaW1wb3J0IFdlYlJUQ0xvYWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9XZWJSVENMb2FkZXJcIjtcbmltcG9ydCB7aXNXZWJSVEN9IGZyb20gXCJ1dGlscy92YWxpZGF0b3JcIjtcbmltcG9ydCB7ZXJyb3JUcmlnZ2VyfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XG5pbXBvcnQge1BST1ZJREVSX1dFQlJUQywgU1RBVEVfSURMRX0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuLyoqXG4gKiBAYnJpZWYgICB3ZWJydGMgcHJvdmlkZXIgZXh0ZW5kZWQgY29yZS5cbiAqIEBwYXJhbSAgIGNvbnRhaW5lciBwbGF5ZXIgZWxlbWVudC5cbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXG4gKiAqL1xuXG5jb25zdCBXZWJSVEMgPSBmdW5jdGlvbihlbGVtZW50LCBwbGF5ZXJDb25maWcsIGFkVGFnVXJsKXtcbiAgICBsZXQgdGhhdCA9IHt9O1xuICAgIGxldCB3ZWJydGNMb2FkZXIgPSBudWxsO1xuICAgIGxldCBzdXBlckRlc3Ryb3lfZnVuYyAgPSBudWxsO1xuXG4gICAgbGV0IHNwZWMgPSB7XG4gICAgICAgIG5hbWUgOiBQUk9WSURFUl9XRUJSVEMsXG4gICAgICAgIGVsZW1lbnQgOiBlbGVtZW50LFxuICAgICAgICBtc2UgOiBudWxsLFxuICAgICAgICBsaXN0ZW5lciA6IG51bGwsXG4gICAgICAgIGNhblNlZWsgOiBmYWxzZSxcbiAgICAgICAgaXNMaXZlIDogZmFsc2UsXG4gICAgICAgIHNlZWtpbmcgOiBmYWxzZSxcbiAgICAgICAgc3RhdGUgOiBTVEFURV9JRExFLFxuICAgICAgICBidWZmZXIgOiAwLFxuICAgICAgICBmcmFtZXJhdGUgOiAwLFxuICAgICAgICBjdXJyZW50UXVhbGl0eSA6IC0xLFxuICAgICAgICBjdXJyZW50U291cmNlIDogLTEsXG4gICAgICAgIHF1YWxpdHlMZXZlbHMgOiBbXSxcbiAgICAgICAgc291cmNlcyA6IFtdLFxuICAgICAgICBhZFRhZ1VybCA6IGFkVGFnVXJsXG4gICAgfTtcblxuICAgIHRoYXQgPSBQcm92aWRlcihzcGVjLCBwbGF5ZXJDb25maWcsIGZ1bmN0aW9uKHNvdXJjZSl7XG4gICAgICAgIGlmKGlzV2ViUlRDKHNvdXJjZS5maWxlLCBzb3VyY2UudHlwZSkpe1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiV0VCUlRDIDogb25CZWZvcmVMb2FkIDogXCIsIHNvdXJjZSk7XG4gICAgICAgICAgICBpZih3ZWJydGNMb2FkZXIpe1xuICAgICAgICAgICAgICAgIHdlYnJ0Y0xvYWRlci5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgd2VicnRjTG9hZGVyID0gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGxvYWRDYWxsYmFjayA9IGZ1bmN0aW9uKHN0cmVhbSl7XG5cbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5zcmNPYmplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zcmNPYmplY3QgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3JjT2JqZWN0ID0gc3RyZWFtO1xuICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbGV0IHJlc2V0Q2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhhdC5wYXVzZSgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgd2VicnRjTG9hZGVyID0gV2ViUlRDTG9hZGVyKHRoYXQsIHNvdXJjZS5maWxlLCByZXNldENhbGxiYWNrLCBsb2FkQ2FsbGJhY2ssIGVycm9yVHJpZ2dlcik7XG5cbiAgICAgICAgICAgIHdlYnJ0Y0xvYWRlci5jb25uZWN0KCkuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xuICAgICAgICAgICAgICAgIC8vdGhhdC5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgLy9EbyBub3RoaW5nXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHN1cGVyRGVzdHJveV9mdW5jID0gdGhhdC5zdXBlcignZGVzdHJveScpO1xuXG4gICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiV0VCUlRDIFBST1ZJREVSIExPQURFRC5cIik7XG5cblxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xuICAgICAgICBpZih3ZWJydGNMb2FkZXIpe1xuICAgICAgICAgICAgd2VicnRjTG9hZGVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHdlYnJ0Y0xvYWRlciA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiV0VCUlRDIDogIFBST1ZJREVSIERFU1RST1lFRC5cIik7XG5cbiAgICAgICAgc3VwZXJEZXN0cm95X2Z1bmMoKTtcblxuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IFdlYlJUQztcbiIsImltcG9ydCBhZGFwdGVyIGZyb20gJ3V0aWxzL2FkYXB0ZXInO1xuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcbmltcG9ydCB7XG4gICAgRVJST1JTLFxuICAgIFBMQVlFUl9XRUJSVENfV1NfRVJST1IsXG4gICAgUExBWUVSX1dFQlJUQ19XU19DTE9TRUQsXG4gICAgUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SLFxuICAgIFBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SLFxuICAgIFBMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUixcbiAgICBQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SLFxuICAgIFBMQVlFUl9XRUJSVENfTkVUV09SS19TTE9XLFxuICAgIE5FVFdPUktfVU5TVEFCTEVELFxuICAgIE9NRV9QMlBfTU9ERVxufSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xuXG5cbmNvbnN0IFdlYlJUQ0xvYWRlciA9IGZ1bmN0aW9uIChwcm92aWRlciwgd2ViU29ja2V0VXJsLCByZXNldENhbGxiYWNrLCBsb2FkQ2FsbGJhY2ssIGVycm9yVHJpZ2dlcikge1xuXG4gICAgY29uc3QgcGVlckNvbm5lY3Rpb25Db25maWcgPSB7XG4gICAgICAgICdpY2VTZXJ2ZXJzJzogW3tcbiAgICAgICAgICAgICd1cmxzJzogJ3N0dW46c3R1bi5sLmdvb2dsZS5jb206MTkzMDInXG4gICAgICAgIH1dXG4gICAgfTtcblxuICAgIGxldCB0aGF0ID0ge307XG5cbiAgICBsZXQgd3MgPSBudWxsO1xuXG4gICAgbGV0IG1haW5TdHJlYW0gPSBudWxsO1xuXG4gICAgLy8gdXNlZCBmb3IgZ2V0dGluZyBtZWRpYSBzdHJlYW0gZnJvbSBPTUUgb3IgaG9zdCBwZWVyXG4gICAgbGV0IG1haW5QZWVyQ29ubmVjdGlvbkluZm8gPSBudWxsO1xuXG4gICAgLy8gdXNlZCBmb3Igc2VuZCBtZWRpYSBzdHJlYW0gdG8gY2xpZW50IHBlZXIuXG4gICAgbGV0IGNsaWVudFBlZXJDb25uZWN0aW9ucyA9IHt9O1xuXG4gICAgLy9jbG9zZWQgd2Vic29ja2V0IGJ5IG9tZSBvciBjbGllbnQuXG4gICAgbGV0IHdzQ2xvc2VkQnlQbGF5ZXIgPSBmYWxzZTtcblxuICAgIGxldCBzdGF0aXN0aWNzVGltZXIgPSBudWxsO1xuXG4gICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IGV4aXN0aW5nSGFuZGxlciA9IHdpbmRvdy5vbmJlZm9yZXVubG9hZDtcbiAgICAgICAgd2luZG93Lm9uYmVmb3JldW5sb2FkID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdIYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgZXhpc3RpbmdIYW5kbGVyKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlRoaXMgY2FsbHMgYXV0byB3aGVuIGJyb3dzZXIgY2xvc2VkLlwiKTtcbiAgICAgICAgICAgIGNsb3NlUGVlcigpO1xuICAgICAgICB9XG4gICAgfSkoKTtcblxuICAgIGZ1bmN0aW9uIGdldFBlZXJDb25uZWN0aW9uQnlJZChpZCkge1xuXG4gICAgICAgIGxldCBwZWVyQ29ubmVjdGlvbiA9IG51bGw7XG5cbiAgICAgICAgaWYgKG1haW5QZWVyQ29ubmVjdGlvbkluZm8gJiYgaWQgPT09IG1haW5QZWVyQ29ubmVjdGlvbkluZm8uaWQpIHtcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uID0gbWFpblBlZXJDb25uZWN0aW9uSW5mby5wZWVyQ29ubmVjdGlvbjtcbiAgICAgICAgfSBlbHNlIGlmIChjbGllbnRQZWVyQ29ubmVjdGlvbnNbaWRdKSB7XG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbiA9IGNsaWVudFBlZXJDb25uZWN0aW9uc1tpZF0ucGVlckNvbm5lY3Rpb247XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGVlckNvbm5lY3Rpb247XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXh0cmFjdExvc3NQYWNrZXRzT25OZXR3b3JrU3RhdHVzKHBlZXJDb25uZWN0aW9uSW5mbykge1xuXG4gICAgICAgIGlmICghcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cykge1xuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cyA9IHt9O1xuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5sb3N0UGFja2V0c0FyciA9IFtdO1xuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5zbG90TGVuZ3RoID0gODsgLy84IHN0YXRpc3RpY3MuIGV2ZXJ5IDIgc2Vjb25kc1xuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5wcmV2UGFja2V0c0xvc3QgPSAwO1xuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5hdmc4TG9zc2VzID0gMDtcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMuYXZnTW9yZVRoYW5UaHJlc2hvbGRDb3VudCA9IDA7ICAvL0lmIGF2ZzhMb3NzIG1vcmUgdGhhbiB0aHJlc2hvbGQuXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLnRocmVzaG9sZCA9IDIwO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGxvc3RQYWNrZXRzQXJyID0gcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5sb3N0UGFja2V0c0FycixcbiAgICAgICAgICAgIHNsb3RMZW5ndGggPSBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLnNsb3RMZW5ndGgsIC8vOCBzdGF0aXN0aWNzLiBldmVyeSAyIHNlY29uZHNcbiAgICAgICAgICAgIHByZXZQYWNrZXRzTG9zdCA9IHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMucHJldlBhY2tldHNMb3N0LFxuICAgICAgICAgICAgYXZnOExvc3NlcyA9IHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMuYXZnOExvc3NlcyxcbiAgICAgICAgICAgIGF2Z01vcmVUaGFuVGhyZXNob2xkQ291bnQgPSBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLmF2Z01vcmVUaGFuVGhyZXNob2xkQ291bnQsICAvL0lmIGF2ZzhMb3NzIG1vcmUgdGhhbiB0aHJlc2hvbGQuXG4gICAgICAgICAgICB0aHJlc2hvbGQgPSBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLnRocmVzaG9sZDtcblxuICAgICAgICBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdGlzdGljc1RpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXBlZXJDb25uZWN0aW9uSW5mby5wZWVyQ29ubmVjdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5wZWVyQ29ubmVjdGlvbi5nZXRTdGF0cygpLnRoZW4oZnVuY3Rpb24gKHN0YXRzKSB7XG4gICAgICAgICAgICAgICAgc3RhdHMuZm9yRWFjaChmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlLnR5cGUgPT09IFwiaW5ib3VuZC1ydHBcIiAmJiAhc3RhdGUuaXNSZW1vdGUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8oc3RhdGUucGFja2V0c0xvc3QgLSBwcmV2UGFja2V0c0xvc3QpIGlzIHJlYWwgY3VycmVudCBsb3N0LlxuICAgICAgICAgICAgICAgICAgICAgICAgbG9zdFBhY2tldHNBcnIucHVzaChwYXJzZUludChzdGF0ZS5wYWNrZXRzTG9zdCkgLSBwYXJzZUludChwcmV2UGFja2V0c0xvc3QpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvc3RQYWNrZXRzQXJyLmxlbmd0aCA+IHNsb3RMZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb3N0UGFja2V0c0FyciA9IGxvc3RQYWNrZXRzQXJyLnNsaWNlKGxvc3RQYWNrZXRzQXJyLmxlbmd0aCAtIHNsb3RMZW5ndGgsIGxvc3RQYWNrZXRzQXJyLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXZnOExvc3NlcyA9IF8ucmVkdWNlKGxvc3RQYWNrZXRzQXJyLCBmdW5jdGlvbiAobWVtbywgbnVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtZW1vICsgbnVtO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDApIC8gc2xvdExlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXN0OCBMT1NUIFBBQ0tFVCBBVkcgIDogXCIgKyAoYXZnOExvc3NlcyksIHN0YXRlLnBhY2tldHNMb3N0LCBsb3N0UGFja2V0c0Fycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGF2ZzhMb3NzZXMgPiB0aHJlc2hvbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXZnTW9yZVRoYW5UaHJlc2hvbGRDb3VudCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXZnTW9yZVRoYW5UaHJlc2hvbGRDb3VudCA9PT0gMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTkVUV09SSyBVTlNUQUJMRUQhISEgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2xlYXJUaW1lb3V0KHN0YXRpc3RpY3NUaW1lcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwcm92aWRlci50cmlnZ2VyKE5FVFdPUktfVU5TVEFCTEVEKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcihORVRXT1JLX1VOU1RBQkxFRCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdmdNb3JlVGhhblRocmVzaG9sZENvdW50ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldlBhY2tldHNMb3N0ID0gc3RhdGUucGFja2V0c0xvc3Q7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGV4dHJhY3RMb3NzUGFja2V0c09uTmV0d29ya1N0YXR1cyhwZWVyQ29ubmVjdGlvbkluZm8pO1xuICAgICAgICAgICAgfSlcblxuICAgICAgICB9LCAyMDAwKTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZU1haW5QZWVyQ29ubmVjdGlvbihpZCwgcGVlcklkLCBzZHAsIGNhbmRpZGF0ZXMsIHJlc29sdmUpIHtcblxuICAgICAgICBsZXQgcGVlckNvbm5lY3Rpb24gPSBuZXcgUlRDUGVlckNvbm5lY3Rpb24ocGVlckNvbm5lY3Rpb25Db25maWcpO1xuXG4gICAgICAgIG1haW5QZWVyQ29ubmVjdGlvbkluZm8gPSB7XG4gICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICBwZWVySWQ6IHBlZXJJZCxcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uOiBwZWVyQ29ubmVjdGlvblxuICAgICAgICB9O1xuXG4gICAgICAgIC8vU2V0IHJlbW90ZSBkZXNjcmlwdGlvbiB3aGVuIEkgcmVjZWl2ZWQgc2RwIGZyb20gc2VydmVyLlxuICAgICAgICBwZWVyQ29ubmVjdGlvbi5zZXRSZW1vdGVEZXNjcmlwdGlvbihuZXcgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKHNkcCkpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbi5jcmVhdGVBbnN3ZXIoKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGVzYykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJjcmVhdGUgSG9zdCBBbnN3ZXIgOiBzdWNjZXNzXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbi5zZXRMb2NhbERlc2NyaXB0aW9uKGRlc2MpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG15IFNEUCBjcmVhdGVkLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsb2NhbFNEUCA9IHBlZXJDb25uZWN0aW9uLmxvY2FsRGVzY3JpcHRpb247XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKCdMb2NhbCBTRFAnLCBsb2NhbFNEUCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZW5kTWVzc2FnZSh3cywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlZXJfaWQ6IHBlZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZDogJ2Fuc3dlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNkcDogbG9jYWxTRFBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTW1BMQVlFUl9XRUJSVENfU0VUX0xPQ0FMX0RFU0NfRVJST1JdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcih0ZW1wRXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlNbUExBWUVSX1dFQlJUQ19DUkVBVEVfQU5TV0VSX0VSUk9SXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTW1BMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SXTtcbiAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChjYW5kaWRhdGVzKSB7XG4gICAgICAgICAgICBhZGRJY2VDYW5kaWRhdGUocGVlckNvbm5lY3Rpb24sIGNhbmRpZGF0ZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcGVlckNvbm5lY3Rpb24ub25pY2VjYW5kaWRhdGUgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKGUuY2FuZGlkYXRlKSB7XG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiV2ViUlRDTG9hZGVyIHNlbmQgY2FuZGlkYXRlIHRvIHNlcnZlciA6IFwiICsgZS5jYW5kaWRhdGUpO1xuXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ01haW4gUGVlciBDb25uZWN0aW9uIGNhbmRpZGF0ZScsIGUuY2FuZGlkYXRlKTtcblxuICAgICAgICAgICAgICAgIHNlbmRNZXNzYWdlKHdzLCB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgICAgICAgICAgcGVlcl9pZDogcGVlcklkLFxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kOiBcImNhbmRpZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICBjYW5kaWRhdGVzOiBbZS5jYW5kaWRhdGVdXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBwZWVyQ29ubmVjdGlvbi5vbnRyYWNrID0gZnVuY3Rpb24gKGUpIHtcblxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwic3RyZWFtIHJlY2VpdmVkLlwiKTtcblxuICAgICAgICAgICAgZXh0cmFjdExvc3NQYWNrZXRzT25OZXR3b3JrU3RhdHVzKG1haW5QZWVyQ29ubmVjdGlvbkluZm8pO1xuICAgICAgICAgICAgbWFpblN0cmVhbSA9IGUuc3RyZWFtc1swXTtcbiAgICAgICAgICAgIGxvYWRDYWxsYmFjayhlLnN0cmVhbXNbMF0pO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNsaWVudFBlZXJDb25uZWN0aW9uKGhvc3RJZCwgY2xpZW50SWQpIHtcblxuICAgICAgICBpZiAoIW1haW5TdHJlYW0pIHtcblxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICBjcmVhdGVDbGllbnRQZWVyQ29ubmVjdGlvbihob3N0SWQsIGNsaWVudElkKTtcbiAgICAgICAgICAgIH0sIDEwMCk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwZWVyQ29ubmVjdGlvbiA9IG5ldyBSVENQZWVyQ29ubmVjdGlvbihwZWVyQ29ubmVjdGlvbkNvbmZpZyk7XG5cbiAgICAgICAgY2xpZW50UGVlckNvbm5lY3Rpb25zW2NsaWVudElkXSA9IHtcbiAgICAgICAgICAgIGlkOiBjbGllbnRJZCxcbiAgICAgICAgICAgIHBlZXJJZDogaG9zdElkLFxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb246IHBlZXJDb25uZWN0aW9uXG4gICAgICAgIH07XG5cbiAgICAgICAgcGVlckNvbm5lY3Rpb24uYWRkU3RyZWFtKG1haW5TdHJlYW0pO1xuXG4gICAgICAgIC8vIGxldCBvZmZlck9wdGlvbiA9IHtcbiAgICAgICAgLy8gICAgIG9mZmVyVG9SZWNlaXZlQXVkaW86IDEsXG4gICAgICAgIC8vICAgICBvZmZlclRvUmVjZWl2ZVZpZGVvOiAxXG4gICAgICAgIC8vIH07XG5cbiAgICAgICAgcGVlckNvbm5lY3Rpb24uY3JlYXRlT2ZmZXIoc2V0TG9jYWxBbmRTZW5kTWVzc2FnZSwgaGFuZGxlQ3JlYXRlT2ZmZXJFcnJvciwge30pO1xuXG4gICAgICAgIGZ1bmN0aW9uIHNldExvY2FsQW5kU2VuZE1lc3NhZ2Uoc2Vzc2lvbkRlc2NyaXB0aW9uKSB7XG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbi5zZXRMb2NhbERlc2NyaXB0aW9uKHNlc3Npb25EZXNjcmlwdGlvbik7XG5cbiAgICAgICAgICAgIHNlbmRNZXNzYWdlKHdzLCB7XG4gICAgICAgICAgICAgICAgaWQ6IGhvc3RJZCxcbiAgICAgICAgICAgICAgICBwZWVyX2lkOiBjbGllbnRJZCxcbiAgICAgICAgICAgICAgICBzZHA6IHNlc3Npb25EZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICBjb21tYW5kOiAnb2ZmZXJfcDJwJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVDcmVhdGVPZmZlckVycm9yKGV2ZW50KSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnY3JlYXRlT2ZmZXIoKSBlcnJvcjogJywgZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcGVlckNvbm5lY3Rpb24ub25pY2VjYW5kaWRhdGUgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKGUuY2FuZGlkYXRlKSB7XG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiV2ViUlRDTG9hZGVyIHNlbmQgY2FuZGlkYXRlIHRvIHNlcnZlciA6IFwiICsgZS5jYW5kaWRhdGUpO1xuXG5cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnQ2xpZW50IFBlZXIgQ29ubmVjdGlvbiBjYW5kaWRhdGUnLCBlLmNhbmRpZGF0ZSk7XG5cbiAgICAgICAgICAgICAgICBzZW5kTWVzc2FnZSh3cywge1xuICAgICAgICAgICAgICAgICAgICBpZDogaG9zdElkLFxuICAgICAgICAgICAgICAgICAgICBwZWVyX2lkOiBjbGllbnRJZCxcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZDogXCJjYW5kaWRhdGVfcDJwXCIsXG4gICAgICAgICAgICAgICAgICAgIGNhbmRpZGF0ZXM6IFtlLmNhbmRpZGF0ZV1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZEljZUNhbmRpZGF0ZShwZWVyQ29ubmVjdGlvbiwgY2FuZGlkYXRlcykge1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FuZGlkYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGNhbmRpZGF0ZXNbaV0gJiYgY2FuZGlkYXRlc1tpXS5jYW5kaWRhdGUpIHtcblxuICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uLmFkZEljZUNhbmRpZGF0ZShuZXcgUlRDSWNlQ2FuZGlkYXRlKGNhbmRpZGF0ZXNbaV0pKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiYWRkSWNlQ2FuZGlkYXRlIDogc3VjY2Vzc1wiKTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SU1tQTEFZRVJfV0VCUlRDX0FERF9JQ0VDQU5ESURBVEVfRVJST1JdO1xuICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0V2ViU29ja2V0KHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgIHdzID0gbmV3IFdlYlNvY2tldCh3ZWJTb2NrZXRVcmwpO1xuXG4gICAgICAgICAgICB3cy5vbm9wZW4gPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygn7Ju57IaM7LyTIOyXtOumvCcpO1xuXG4gICAgICAgICAgICAgICAgc2VuZE1lc3NhZ2Uod3MsIHtcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZDogXCJyZXF1ZXN0X29mZmVyXCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHdzLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChlKSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gSlNPTi5wYXJzZShlLmRhdGEpO1xuXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ1JlY2VpdmUgbWVzc2FnZScsIG1lc3NhZ2UpO1xuXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SU1tQTEFZRVJfV0VCUlRDX1dTX0VSUk9SXTtcbiAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gbWVzc2FnZS5lcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIW1lc3NhZ2UuaWQpIHtcblxuICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coJ0lEIG11c3QgYmUgbm90IG51bGwnKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLmNvbW1hbmQgPT09ICdvZmZlcicpIHtcblxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVNYWluUGVlckNvbm5lY3Rpb24obWVzc2FnZS5pZCwgbWVzc2FnZS5wZWVyX2lkLCBtZXNzYWdlLnNkcCwgbWVzc2FnZS5jYW5kaWRhdGVzLCByZXNvbHZlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYobWVzc2FnZS5wZWVyX2lkID09PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoT01FX1AyUF9NT0RFLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihPTUVfUDJQX01PREUsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UuY29tbWFuZCA9PT0gJ3JlcXVlc3Rfb2ZmZXJfcDJwJykge1xuXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUNsaWVudFBlZXJDb25uZWN0aW9uKG1lc3NhZ2UuaWQsIG1lc3NhZ2UucGVlcl9pZCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UuY29tbWFuZCA9PT0gJ2Fuc3dlcl9wMnAnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHBlZXJDb25uZWN0aW9uMSA9IGdldFBlZXJDb25uZWN0aW9uQnlJZChtZXNzYWdlLnBlZXJfaWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uMS5zZXRSZW1vdGVEZXNjcmlwdGlvbihuZXcgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKG1lc3NhZ2Uuc2RwKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkZXNjKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SU1tQTEFZRVJfV0VCUlRDX1NFVF9SRU1PVEVfREVTQ19FUlJPUl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5jb21tYW5kID09PSAnY2FuZGlkYXRlJykge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIENhbmRpZGF0ZXMgZm9yIG5ldyBjbGllbnQgcGVlclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGVlckNvbm5lY3Rpb24yID0gZ2V0UGVlckNvbm5lY3Rpb25CeUlkKG1lc3NhZ2UuaWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGFkZEljZUNhbmRpZGF0ZShwZWVyQ29ubmVjdGlvbjIsIG1lc3NhZ2UuY2FuZGlkYXRlcyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UuY29tbWFuZCA9PT0gJ2NhbmRpZGF0ZV9wMnAnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQ2FuZGlkYXRlcyBmb3IgbmV3IGNsaWVudCBwZWVyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwZWVyQ29ubmVjdGlvbjMgPSBnZXRQZWVyQ29ubmVjdGlvbkJ5SWQobWVzc2FnZS5wZWVyX2lkKTtcblxuICAgICAgICAgICAgICAgICAgICBhZGRJY2VDYW5kaWRhdGUocGVlckNvbm5lY3Rpb24zLCBtZXNzYWdlLmNhbmRpZGF0ZXMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLmNvbW1hbmQgPT09ICdzdG9wJykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChtYWluUGVlckNvbm5lY3Rpb25JbmZvLnBlZXJJZCA9PT0gbWVzc2FnZS5wZWVyX2lkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNsb3NlIGNvbm5lY3Rpb24gd2l0aCBob3N0IGFuZCByZXRyeVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2Nsb3NlIGNvbm5lY3Rpb24gd2l0aCBob3N0Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5TdHJlYW0gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFpblBlZXJDb25uZWN0aW9uSW5mby5wZWVyQ29ubmVjdGlvbi5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFpblBlZXJDb25uZWN0aW9uSW5mbyA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2V0Q2FsbGJhY2soKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc2VuZE1lc3NhZ2Uod3MsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kOiAncmVxdWVzdF9vZmZlcidcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNsb3NlIGNvbm5lY3Rpb24gd2l0aCBjbGllbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjbGllbnRQZWVyQ29ubmVjdGlvbnNbbWVzc2FnZS5wZWVyX2lkXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdjbG9zZSBjb25uZWN0aW9uIHdpdGggY2xpZW50OiAnLCBtZXNzYWdlLnBlZXJfaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsaWVudFBlZXJDb25uZWN0aW9uc1ttZXNzYWdlLnBlZXJfaWRdLnBlZXJDb25uZWN0aW9uLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGNsaWVudFBlZXJDb25uZWN0aW9uc1ttZXNzYWdlLnBlZXJfaWRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdzLm9uY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYoIXdzQ2xvc2VkQnlQbGF5ZXIpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTW1BMQVlFUl9XRUJSVENfV1NfRVJST1JdO1xuICAgICAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB3cy5vbmVycm9yID0gZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SU1tQTEFZRVJfV0VCUlRDX1dTX0VSUk9SXTtcbiAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcbiAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIGNsb3NlUGVlcihlcnJvcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xuXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldlYlJUQ0xvYWRlciBjb25uZWN0aW5nLi4uXCIpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldlYlJUQ0xvYWRlciB1cmwgOiBcIiArIHdlYlNvY2tldFVybCk7XG5cbiAgICAgICAgICAgIGluaXRXZWJTb2NrZXQocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xvc2VQZWVyKGVycm9yKSB7XG5cbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKCdXZWJSVEMgTG9hZGVyIGNsb3NlUGVlYXIoKScpO1xuICAgICAgICBpZiAod3MpIHtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZygnQ2xvc2luZyB3ZWJzb2NrZXQgY29ubmVjdGlvbi4uLicpO1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU2VuZCBTaWduYWxpbmcgOiBTdG9wLlwiKTtcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAwIChDT05ORUNUSU5HKVxuICAgICAgICAgICAgMSAoT1BFTilcbiAgICAgICAgICAgIDIgKENMT1NJTkcpXG4gICAgICAgICAgICAzIChDTE9TRUQpXG4gICAgICAgICAgICAqL1xuICAgICAgICAgICAgaWYgKHdzLnJlYWR5U3RhdGUgPT09IDEpIHtcblxuICAgICAgICAgICAgICAgIGlmIChtYWluUGVlckNvbm5lY3Rpb25JbmZvKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbmRNZXNzYWdlKHdzLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kOiAnc3RvcCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogbWFpblBlZXJDb25uZWN0aW9uSW5mby5pZFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgd3NDbG9zZWRCeVBsYXllciA9IHRydWU7XG4gICAgICAgICAgICAgICAgd3MuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdzID0gbnVsbDtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB3c0Nsb3NlZEJ5UGxheWVyID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1haW5QZWVyQ29ubmVjdGlvbkluZm8pIHtcblxuICAgICAgICAgICAgbWFpblN0cmVhbSA9IG51bGw7XG5cbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZygnQ2xvc2luZyBtYWluIHBlZXIgY29ubmVjdGlvbi4uLicpO1xuICAgICAgICAgICAgaWYgKHN0YXRpc3RpY3NUaW1lcikge1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChzdGF0aXN0aWNzVGltZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWFpblBlZXJDb25uZWN0aW9uSW5mby5wZWVyQ29ubmVjdGlvbi5jbG9zZSgpO1xuICAgICAgICAgICAgbWFpblBlZXJDb25uZWN0aW9uSW5mbyA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoT2JqZWN0LmtleXMoY2xpZW50UGVlckNvbm5lY3Rpb25zKS5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGNsaWVudElkIGluIGNsaWVudFBlZXJDb25uZWN0aW9ucykge1xuXG4gICAgICAgICAgICAgICAgbGV0IGNsaWVudFBlZXJDb25uZWN0aW9uID0gY2xpZW50UGVlckNvbm5lY3Rpb25zW2NsaWVudElkXS5wZWVyQ29ubmVjdGlvbjtcblxuICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZygnQ2xvc2luZyBjbGllbnQgcGVlciBjb25uZWN0aW9uLi4uJyk7XG4gICAgICAgICAgICAgICAgY2xpZW50UGVlckNvbm5lY3Rpb24uY2xvc2UoKTtcbiAgICAgICAgICAgICAgICBjbGllbnRQZWVyQ29ubmVjdGlvbiA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNsaWVudFBlZXJDb25uZWN0aW9ucyA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICBlcnJvclRyaWdnZXIoZXJyb3IsIHByb3ZpZGVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNlbmRNZXNzYWdlKHdzLCBtZXNzYWdlKSB7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coJ1NlbmQgTWVzc2FnZScsIG1lc3NhZ2UpO1xuICAgICAgICB3cy5zZW5kKEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTtcbiAgICB9XG5cbiAgICB0aGF0LmNvbm5lY3QgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBpbml0aWFsaXplKCk7XG4gICAgfTtcblxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJXRUJSVEMgTE9BREVSIGRlc3Ryb3lcIik7XG4gICAgICAgIGNsb3NlUGVlcigpO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFdlYlJUQ0xvYWRlcjtcbiIsIihmdW5jdGlvbihmKXtpZih0eXBlb2YgZXhwb3J0cz09PVwib2JqZWN0XCImJnR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiKXttb2R1bGUuZXhwb3J0cz1mKCl9ZWxzZSBpZih0eXBlb2YgZGVmaW5lPT09XCJmdW5jdGlvblwiJiZkZWZpbmUuYW1kKXtkZWZpbmUoW10sZil9ZWxzZXt2YXIgZztpZih0eXBlb2Ygd2luZG93IT09XCJ1bmRlZmluZWRcIil7Zz13aW5kb3d9ZWxzZSBpZih0eXBlb2YgZ2xvYmFsIT09XCJ1bmRlZmluZWRcIil7Zz1nbG9iYWx9ZWxzZSBpZih0eXBlb2Ygc2VsZiE9PVwidW5kZWZpbmVkXCIpe2c9c2VsZn1lbHNle2c9dGhpc31nLmFkYXB0ZXIgPSBmKCl9fSkoZnVuY3Rpb24oKXt2YXIgZGVmaW5lLG1vZHVsZSxleHBvcnRzO3JldHVybiAoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vKlxuICogIENvcHlyaWdodCAoYykgMjAxNyBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxuICogIHRyZWUuXG4gKi9cbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIFNEUFV0aWxzID0gcmVxdWlyZSgnc2RwJyk7XG5cbmZ1bmN0aW9uIHdyaXRlTWVkaWFTZWN0aW9uKHRyYW5zY2VpdmVyLCBjYXBzLCB0eXBlLCBzdHJlYW0sIGR0bHNSb2xlKSB7XG4gIHZhciBzZHAgPSBTRFBVdGlscy53cml0ZVJ0cERlc2NyaXB0aW9uKHRyYW5zY2VpdmVyLmtpbmQsIGNhcHMpO1xuXG4gIC8vIE1hcCBJQ0UgcGFyYW1ldGVycyAodWZyYWcsIHB3ZCkgdG8gU0RQLlxuICBzZHAgKz0gU0RQVXRpbHMud3JpdGVJY2VQYXJhbWV0ZXJzKFxuICAgICAgdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIuZ2V0TG9jYWxQYXJhbWV0ZXJzKCkpO1xuXG4gIC8vIE1hcCBEVExTIHBhcmFtZXRlcnMgdG8gU0RQLlxuICBzZHAgKz0gU0RQVXRpbHMud3JpdGVEdGxzUGFyYW1ldGVycyhcbiAgICAgIHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQuZ2V0TG9jYWxQYXJhbWV0ZXJzKCksXG4gICAgICB0eXBlID09PSAnb2ZmZXInID8gJ2FjdHBhc3MnIDogZHRsc1JvbGUgfHwgJ2FjdGl2ZScpO1xuXG4gIHNkcCArPSAnYT1taWQ6JyArIHRyYW5zY2VpdmVyLm1pZCArICdcXHJcXG4nO1xuXG4gIGlmICh0cmFuc2NlaXZlci5ydHBTZW5kZXIgJiYgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIpIHtcbiAgICBzZHAgKz0gJ2E9c2VuZHJlY3ZcXHJcXG4nO1xuICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlcikge1xuICAgIHNkcCArPSAnYT1zZW5kb25seVxcclxcbic7XG4gIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIpIHtcbiAgICBzZHAgKz0gJ2E9cmVjdm9ubHlcXHJcXG4nO1xuICB9IGVsc2Uge1xuICAgIHNkcCArPSAnYT1pbmFjdGl2ZVxcclxcbic7XG4gIH1cblxuICBpZiAodHJhbnNjZWl2ZXIucnRwU2VuZGVyKSB7XG4gICAgdmFyIHRyYWNrSWQgPSB0cmFuc2NlaXZlci5ydHBTZW5kZXIuX2luaXRpYWxUcmFja0lkIHx8XG4gICAgICAgIHRyYW5zY2VpdmVyLnJ0cFNlbmRlci50cmFjay5pZDtcbiAgICB0cmFuc2NlaXZlci5ydHBTZW5kZXIuX2luaXRpYWxUcmFja0lkID0gdHJhY2tJZDtcbiAgICAvLyBzcGVjLlxuICAgIHZhciBtc2lkID0gJ21zaWQ6JyArIChzdHJlYW0gPyBzdHJlYW0uaWQgOiAnLScpICsgJyAnICtcbiAgICAgICAgdHJhY2tJZCArICdcXHJcXG4nO1xuICAgIHNkcCArPSAnYT0nICsgbXNpZDtcbiAgICAvLyBmb3IgQ2hyb21lLiBMZWdhY3kgc2hvdWxkIG5vIGxvbmdlciBiZSByZXF1aXJlZC5cbiAgICBzZHAgKz0gJ2E9c3NyYzonICsgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjICtcbiAgICAgICAgJyAnICsgbXNpZDtcblxuICAgIC8vIFJUWFxuICAgIGlmICh0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCkge1xuICAgICAgc2RwICs9ICdhPXNzcmM6JyArIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4LnNzcmMgK1xuICAgICAgICAgICcgJyArIG1zaWQ7XG4gICAgICBzZHAgKz0gJ2E9c3NyYy1ncm91cDpGSUQgJyArXG4gICAgICAgICAgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjICsgJyAnICtcbiAgICAgICAgICB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eC5zc3JjICtcbiAgICAgICAgICAnXFxyXFxuJztcbiAgICB9XG4gIH1cbiAgLy8gRklYTUU6IHRoaXMgc2hvdWxkIGJlIHdyaXR0ZW4gYnkgd3JpdGVSdHBEZXNjcmlwdGlvbi5cbiAgc2RwICs9ICdhPXNzcmM6JyArIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYyArXG4gICAgICAnIGNuYW1lOicgKyBTRFBVdGlscy5sb2NhbENOYW1lICsgJ1xcclxcbic7XG4gIGlmICh0cmFuc2NlaXZlci5ydHBTZW5kZXIgJiYgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHgpIHtcbiAgICBzZHAgKz0gJ2E9c3NyYzonICsgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHguc3NyYyArXG4gICAgICAgICcgY25hbWU6JyArIFNEUFV0aWxzLmxvY2FsQ05hbWUgKyAnXFxyXFxuJztcbiAgfVxuICByZXR1cm4gc2RwO1xufVxuXG4vLyBFZGdlIGRvZXMgbm90IGxpa2Vcbi8vIDEpIHN0dW46IGZpbHRlcmVkIGFmdGVyIDE0MzkzIHVubGVzcyA/dHJhbnNwb3J0PXVkcCBpcyBwcmVzZW50XG4vLyAyKSB0dXJuOiB0aGF0IGRvZXMgbm90IGhhdmUgYWxsIG9mIHR1cm46aG9zdDpwb3J0P3RyYW5zcG9ydD11ZHBcbi8vIDMpIHR1cm46IHdpdGggaXB2NiBhZGRyZXNzZXNcbi8vIDQpIHR1cm46IG9jY3VycmluZyBtdWxpcGxlIHRpbWVzXG5mdW5jdGlvbiBmaWx0ZXJJY2VTZXJ2ZXJzKGljZVNlcnZlcnMsIGVkZ2VWZXJzaW9uKSB7XG4gIHZhciBoYXNUdXJuID0gZmFsc2U7XG4gIGljZVNlcnZlcnMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGljZVNlcnZlcnMpKTtcbiAgcmV0dXJuIGljZVNlcnZlcnMuZmlsdGVyKGZ1bmN0aW9uKHNlcnZlcikge1xuICAgIGlmIChzZXJ2ZXIgJiYgKHNlcnZlci51cmxzIHx8IHNlcnZlci51cmwpKSB7XG4gICAgICB2YXIgdXJscyA9IHNlcnZlci51cmxzIHx8IHNlcnZlci51cmw7XG4gICAgICBpZiAoc2VydmVyLnVybCAmJiAhc2VydmVyLnVybHMpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdSVENJY2VTZXJ2ZXIudXJsIGlzIGRlcHJlY2F0ZWQhIFVzZSB1cmxzIGluc3RlYWQuJyk7XG4gICAgICB9XG4gICAgICB2YXIgaXNTdHJpbmcgPSB0eXBlb2YgdXJscyA9PT0gJ3N0cmluZyc7XG4gICAgICBpZiAoaXNTdHJpbmcpIHtcbiAgICAgICAgdXJscyA9IFt1cmxzXTtcbiAgICAgIH1cbiAgICAgIHVybHMgPSB1cmxzLmZpbHRlcihmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgdmFyIHZhbGlkVHVybiA9IHVybC5pbmRleE9mKCd0dXJuOicpID09PSAwICYmXG4gICAgICAgICAgICB1cmwuaW5kZXhPZigndHJhbnNwb3J0PXVkcCcpICE9PSAtMSAmJlxuICAgICAgICAgICAgdXJsLmluZGV4T2YoJ3R1cm46WycpID09PSAtMSAmJlxuICAgICAgICAgICAgIWhhc1R1cm47XG5cbiAgICAgICAgaWYgKHZhbGlkVHVybikge1xuICAgICAgICAgIGhhc1R1cm4gPSB0cnVlO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1cmwuaW5kZXhPZignc3R1bjonKSA9PT0gMCAmJiBlZGdlVmVyc2lvbiA+PSAxNDM5MyAmJlxuICAgICAgICAgICAgdXJsLmluZGV4T2YoJz90cmFuc3BvcnQ9dWRwJykgPT09IC0xO1xuICAgICAgfSk7XG5cbiAgICAgIGRlbGV0ZSBzZXJ2ZXIudXJsO1xuICAgICAgc2VydmVyLnVybHMgPSBpc1N0cmluZyA/IHVybHNbMF0gOiB1cmxzO1xuICAgICAgcmV0dXJuICEhdXJscy5sZW5ndGg7XG4gICAgfVxuICB9KTtcbn1cblxuLy8gRGV0ZXJtaW5lcyB0aGUgaW50ZXJzZWN0aW9uIG9mIGxvY2FsIGFuZCByZW1vdGUgY2FwYWJpbGl0aWVzLlxuZnVuY3Rpb24gZ2V0Q29tbW9uQ2FwYWJpbGl0aWVzKGxvY2FsQ2FwYWJpbGl0aWVzLCByZW1vdGVDYXBhYmlsaXRpZXMpIHtcbiAgdmFyIGNvbW1vbkNhcGFiaWxpdGllcyA9IHtcbiAgICBjb2RlY3M6IFtdLFxuICAgIGhlYWRlckV4dGVuc2lvbnM6IFtdLFxuICAgIGZlY01lY2hhbmlzbXM6IFtdXG4gIH07XG5cbiAgdmFyIGZpbmRDb2RlY0J5UGF5bG9hZFR5cGUgPSBmdW5jdGlvbihwdCwgY29kZWNzKSB7XG4gICAgcHQgPSBwYXJzZUludChwdCwgMTApO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29kZWNzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoY29kZWNzW2ldLnBheWxvYWRUeXBlID09PSBwdCB8fFxuICAgICAgICAgIGNvZGVjc1tpXS5wcmVmZXJyZWRQYXlsb2FkVHlwZSA9PT0gcHQpIHtcbiAgICAgICAgcmV0dXJuIGNvZGVjc1tpXTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFyIHJ0eENhcGFiaWxpdHlNYXRjaGVzID0gZnVuY3Rpb24obFJ0eCwgclJ0eCwgbENvZGVjcywgckNvZGVjcykge1xuICAgIHZhciBsQ29kZWMgPSBmaW5kQ29kZWNCeVBheWxvYWRUeXBlKGxSdHgucGFyYW1ldGVycy5hcHQsIGxDb2RlY3MpO1xuICAgIHZhciByQ29kZWMgPSBmaW5kQ29kZWNCeVBheWxvYWRUeXBlKHJSdHgucGFyYW1ldGVycy5hcHQsIHJDb2RlY3MpO1xuICAgIHJldHVybiBsQ29kZWMgJiYgckNvZGVjICYmXG4gICAgICAgIGxDb2RlYy5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IHJDb2RlYy5uYW1lLnRvTG93ZXJDYXNlKCk7XG4gIH07XG5cbiAgbG9jYWxDYXBhYmlsaXRpZXMuY29kZWNzLmZvckVhY2goZnVuY3Rpb24obENvZGVjKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZW1vdGVDYXBhYmlsaXRpZXMuY29kZWNzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgckNvZGVjID0gcmVtb3RlQ2FwYWJpbGl0aWVzLmNvZGVjc1tpXTtcbiAgICAgIGlmIChsQ29kZWMubmFtZS50b0xvd2VyQ2FzZSgpID09PSByQ29kZWMubmFtZS50b0xvd2VyQ2FzZSgpICYmXG4gICAgICAgICAgbENvZGVjLmNsb2NrUmF0ZSA9PT0gckNvZGVjLmNsb2NrUmF0ZSkge1xuICAgICAgICBpZiAobENvZGVjLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3J0eCcgJiZcbiAgICAgICAgICAgIGxDb2RlYy5wYXJhbWV0ZXJzICYmIHJDb2RlYy5wYXJhbWV0ZXJzLmFwdCkge1xuICAgICAgICAgIC8vIGZvciBSVFggd2UgbmVlZCB0byBmaW5kIHRoZSBsb2NhbCBydHggdGhhdCBoYXMgYSBhcHRcbiAgICAgICAgICAvLyB3aGljaCBwb2ludHMgdG8gdGhlIHNhbWUgbG9jYWwgY29kZWMgYXMgdGhlIHJlbW90ZSBvbmUuXG4gICAgICAgICAgaWYgKCFydHhDYXBhYmlsaXR5TWF0Y2hlcyhsQ29kZWMsIHJDb2RlYyxcbiAgICAgICAgICAgICAgbG9jYWxDYXBhYmlsaXRpZXMuY29kZWNzLCByZW1vdGVDYXBhYmlsaXRpZXMuY29kZWNzKSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJDb2RlYyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkockNvZGVjKSk7IC8vIGRlZXBjb3B5XG4gICAgICAgIC8vIG51bWJlciBvZiBjaGFubmVscyBpcyB0aGUgaGlnaGVzdCBjb21tb24gbnVtYmVyIG9mIGNoYW5uZWxzXG4gICAgICAgIHJDb2RlYy5udW1DaGFubmVscyA9IE1hdGgubWluKGxDb2RlYy5udW1DaGFubmVscyxcbiAgICAgICAgICAgIHJDb2RlYy5udW1DaGFubmVscyk7XG4gICAgICAgIC8vIHB1c2ggckNvZGVjIHNvIHdlIHJlcGx5IHdpdGggb2ZmZXJlciBwYXlsb2FkIHR5cGVcbiAgICAgICAgY29tbW9uQ2FwYWJpbGl0aWVzLmNvZGVjcy5wdXNoKHJDb2RlYyk7XG5cbiAgICAgICAgLy8gZGV0ZXJtaW5lIGNvbW1vbiBmZWVkYmFjayBtZWNoYW5pc21zXG4gICAgICAgIHJDb2RlYy5ydGNwRmVlZGJhY2sgPSByQ29kZWMucnRjcEZlZWRiYWNrLmZpbHRlcihmdW5jdGlvbihmYikge1xuICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbENvZGVjLnJ0Y3BGZWVkYmFjay5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgaWYgKGxDb2RlYy5ydGNwRmVlZGJhY2tbal0udHlwZSA9PT0gZmIudHlwZSAmJlxuICAgICAgICAgICAgICAgIGxDb2RlYy5ydGNwRmVlZGJhY2tbal0ucGFyYW1ldGVyID09PSBmYi5wYXJhbWV0ZXIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIEZJWE1FOiBhbHNvIG5lZWQgdG8gZGV0ZXJtaW5lIC5wYXJhbWV0ZXJzXG4gICAgICAgIC8vICBzZWUgaHR0cHM6Ly9naXRodWIuY29tL29wZW5wZWVyL29ydGMvaXNzdWVzLzU2OVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIGxvY2FsQ2FwYWJpbGl0aWVzLmhlYWRlckV4dGVuc2lvbnMuZm9yRWFjaChmdW5jdGlvbihsSGVhZGVyRXh0ZW5zaW9uKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZW1vdGVDYXBhYmlsaXRpZXMuaGVhZGVyRXh0ZW5zaW9ucy5sZW5ndGg7XG4gICAgICAgICBpKyspIHtcbiAgICAgIHZhciBySGVhZGVyRXh0ZW5zaW9uID0gcmVtb3RlQ2FwYWJpbGl0aWVzLmhlYWRlckV4dGVuc2lvbnNbaV07XG4gICAgICBpZiAobEhlYWRlckV4dGVuc2lvbi51cmkgPT09IHJIZWFkZXJFeHRlbnNpb24udXJpKSB7XG4gICAgICAgIGNvbW1vbkNhcGFiaWxpdGllcy5oZWFkZXJFeHRlbnNpb25zLnB1c2gockhlYWRlckV4dGVuc2lvbik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgLy8gRklYTUU6IGZlY01lY2hhbmlzbXNcbiAgcmV0dXJuIGNvbW1vbkNhcGFiaWxpdGllcztcbn1cblxuLy8gaXMgYWN0aW9uPXNldExvY2FsRGVzY3JpcHRpb24gd2l0aCB0eXBlIGFsbG93ZWQgaW4gc2lnbmFsaW5nU3RhdGVcbmZ1bmN0aW9uIGlzQWN0aW9uQWxsb3dlZEluU2lnbmFsaW5nU3RhdGUoYWN0aW9uLCB0eXBlLCBzaWduYWxpbmdTdGF0ZSkge1xuICByZXR1cm4ge1xuICAgIG9mZmVyOiB7XG4gICAgICBzZXRMb2NhbERlc2NyaXB0aW9uOiBbJ3N0YWJsZScsICdoYXZlLWxvY2FsLW9mZmVyJ10sXG4gICAgICBzZXRSZW1vdGVEZXNjcmlwdGlvbjogWydzdGFibGUnLCAnaGF2ZS1yZW1vdGUtb2ZmZXInXVxuICAgIH0sXG4gICAgYW5zd2VyOiB7XG4gICAgICBzZXRMb2NhbERlc2NyaXB0aW9uOiBbJ2hhdmUtcmVtb3RlLW9mZmVyJywgJ2hhdmUtbG9jYWwtcHJhbnN3ZXInXSxcbiAgICAgIHNldFJlbW90ZURlc2NyaXB0aW9uOiBbJ2hhdmUtbG9jYWwtb2ZmZXInLCAnaGF2ZS1yZW1vdGUtcHJhbnN3ZXInXVxuICAgIH1cbiAgfVt0eXBlXVthY3Rpb25dLmluZGV4T2Yoc2lnbmFsaW5nU3RhdGUpICE9PSAtMTtcbn1cblxuZnVuY3Rpb24gbWF5YmVBZGRDYW5kaWRhdGUoaWNlVHJhbnNwb3J0LCBjYW5kaWRhdGUpIHtcbiAgLy8gRWRnZSdzIGludGVybmFsIHJlcHJlc2VudGF0aW9uIGFkZHMgc29tZSBmaWVsZHMgdGhlcmVmb3JlXG4gIC8vIG5vdCBhbGwgZmllbGTRlSBhcmUgdGFrZW4gaW50byBhY2NvdW50LlxuICB2YXIgYWxyZWFkeUFkZGVkID0gaWNlVHJhbnNwb3J0LmdldFJlbW90ZUNhbmRpZGF0ZXMoKVxuICAgICAgLmZpbmQoZnVuY3Rpb24ocmVtb3RlQ2FuZGlkYXRlKSB7XG4gICAgICAgIHJldHVybiBjYW5kaWRhdGUuZm91bmRhdGlvbiA9PT0gcmVtb3RlQ2FuZGlkYXRlLmZvdW5kYXRpb24gJiZcbiAgICAgICAgICAgIGNhbmRpZGF0ZS5pcCA9PT0gcmVtb3RlQ2FuZGlkYXRlLmlwICYmXG4gICAgICAgICAgICBjYW5kaWRhdGUucG9ydCA9PT0gcmVtb3RlQ2FuZGlkYXRlLnBvcnQgJiZcbiAgICAgICAgICAgIGNhbmRpZGF0ZS5wcmlvcml0eSA9PT0gcmVtb3RlQ2FuZGlkYXRlLnByaW9yaXR5ICYmXG4gICAgICAgICAgICBjYW5kaWRhdGUucHJvdG9jb2wgPT09IHJlbW90ZUNhbmRpZGF0ZS5wcm90b2NvbCAmJlxuICAgICAgICAgICAgY2FuZGlkYXRlLnR5cGUgPT09IHJlbW90ZUNhbmRpZGF0ZS50eXBlO1xuICAgICAgfSk7XG4gIGlmICghYWxyZWFkeUFkZGVkKSB7XG4gICAgaWNlVHJhbnNwb3J0LmFkZFJlbW90ZUNhbmRpZGF0ZShjYW5kaWRhdGUpO1xuICB9XG4gIHJldHVybiAhYWxyZWFkeUFkZGVkO1xufVxuXG5cbmZ1bmN0aW9uIG1ha2VFcnJvcihuYW1lLCBkZXNjcmlwdGlvbikge1xuICB2YXIgZSA9IG5ldyBFcnJvcihkZXNjcmlwdGlvbik7XG4gIGUubmFtZSA9IG5hbWU7XG4gIC8vIGxlZ2FjeSBlcnJvciBjb2RlcyBmcm9tIGh0dHBzOi8vaGV5Y2FtLmdpdGh1Yi5pby93ZWJpZGwvI2lkbC1ET01FeGNlcHRpb24tZXJyb3ItbmFtZXNcbiAgZS5jb2RlID0ge1xuICAgIE5vdFN1cHBvcnRlZEVycm9yOiA5LFxuICAgIEludmFsaWRTdGF0ZUVycm9yOiAxMSxcbiAgICBJbnZhbGlkQWNjZXNzRXJyb3I6IDE1LFxuICAgIFR5cGVFcnJvcjogdW5kZWZpbmVkLFxuICAgIE9wZXJhdGlvbkVycm9yOiB1bmRlZmluZWRcbiAgfVtuYW1lXTtcbiAgcmV0dXJuIGU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24od2luZG93LCBlZGdlVmVyc2lvbikge1xuICAvLyBodHRwczovL3czYy5naXRodWIuaW8vbWVkaWFjYXB0dXJlLW1haW4vI21lZGlhc3RyZWFtXG4gIC8vIEhlbHBlciBmdW5jdGlvbiB0byBhZGQgdGhlIHRyYWNrIHRvIHRoZSBzdHJlYW0gYW5kXG4gIC8vIGRpc3BhdGNoIHRoZSBldmVudCBvdXJzZWx2ZXMuXG4gIGZ1bmN0aW9uIGFkZFRyYWNrVG9TdHJlYW1BbmRGaXJlRXZlbnQodHJhY2ssIHN0cmVhbSkge1xuICAgIHN0cmVhbS5hZGRUcmFjayh0cmFjayk7XG4gICAgc3RyZWFtLmRpc3BhdGNoRXZlbnQobmV3IHdpbmRvdy5NZWRpYVN0cmVhbVRyYWNrRXZlbnQoJ2FkZHRyYWNrJyxcbiAgICAgICAge3RyYWNrOiB0cmFja30pKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZVRyYWNrRnJvbVN0cmVhbUFuZEZpcmVFdmVudCh0cmFjaywgc3RyZWFtKSB7XG4gICAgc3RyZWFtLnJlbW92ZVRyYWNrKHRyYWNrKTtcbiAgICBzdHJlYW0uZGlzcGF0Y2hFdmVudChuZXcgd2luZG93Lk1lZGlhU3RyZWFtVHJhY2tFdmVudCgncmVtb3ZldHJhY2snLFxuICAgICAgICB7dHJhY2s6IHRyYWNrfSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZmlyZUFkZFRyYWNrKHBjLCB0cmFjaywgcmVjZWl2ZXIsIHN0cmVhbXMpIHtcbiAgICB2YXIgdHJhY2tFdmVudCA9IG5ldyBFdmVudCgndHJhY2snKTtcbiAgICB0cmFja0V2ZW50LnRyYWNrID0gdHJhY2s7XG4gICAgdHJhY2tFdmVudC5yZWNlaXZlciA9IHJlY2VpdmVyO1xuICAgIHRyYWNrRXZlbnQudHJhbnNjZWl2ZXIgPSB7cmVjZWl2ZXI6IHJlY2VpdmVyfTtcbiAgICB0cmFja0V2ZW50LnN0cmVhbXMgPSBzdHJlYW1zO1xuICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgcGMuX2Rpc3BhdGNoRXZlbnQoJ3RyYWNrJywgdHJhY2tFdmVudCk7XG4gICAgfSk7XG4gIH1cblxuICB2YXIgUlRDUGVlckNvbm5lY3Rpb24gPSBmdW5jdGlvbihjb25maWcpIHtcbiAgICB2YXIgcGMgPSB0aGlzO1xuXG4gICAgdmFyIF9ldmVudFRhcmdldCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICBbJ2FkZEV2ZW50TGlzdGVuZXInLCAncmVtb3ZlRXZlbnRMaXN0ZW5lcicsICdkaXNwYXRjaEV2ZW50J11cbiAgICAgICAgLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgICAgcGNbbWV0aG9kXSA9IF9ldmVudFRhcmdldFttZXRob2RdLmJpbmQoX2V2ZW50VGFyZ2V0KTtcbiAgICAgICAgfSk7XG5cbiAgICB0aGlzLmNhblRyaWNrbGVJY2VDYW5kaWRhdGVzID0gbnVsbDtcblxuICAgIHRoaXMubmVlZE5lZ290aWF0aW9uID0gZmFsc2U7XG5cbiAgICB0aGlzLmxvY2FsU3RyZWFtcyA9IFtdO1xuICAgIHRoaXMucmVtb3RlU3RyZWFtcyA9IFtdO1xuXG4gICAgdGhpcy5sb2NhbERlc2NyaXB0aW9uID0gbnVsbDtcbiAgICB0aGlzLnJlbW90ZURlc2NyaXB0aW9uID0gbnVsbDtcblxuICAgIHRoaXMuc2lnbmFsaW5nU3RhdGUgPSAnc3RhYmxlJztcbiAgICB0aGlzLmljZUNvbm5lY3Rpb25TdGF0ZSA9ICduZXcnO1xuICAgIHRoaXMuY29ubmVjdGlvblN0YXRlID0gJ25ldyc7XG4gICAgdGhpcy5pY2VHYXRoZXJpbmdTdGF0ZSA9ICduZXcnO1xuXG4gICAgY29uZmlnID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShjb25maWcgfHwge30pKTtcblxuICAgIHRoaXMudXNpbmdCdW5kbGUgPSBjb25maWcuYnVuZGxlUG9saWN5ID09PSAnbWF4LWJ1bmRsZSc7XG4gICAgaWYgKGNvbmZpZy5ydGNwTXV4UG9saWN5ID09PSAnbmVnb3RpYXRlJykge1xuICAgICAgdGhyb3cobWFrZUVycm9yKCdOb3RTdXBwb3J0ZWRFcnJvcicsXG4gICAgICAgICAgJ3J0Y3BNdXhQb2xpY3kgXFwnbmVnb3RpYXRlXFwnIGlzIG5vdCBzdXBwb3J0ZWQnKSk7XG4gICAgfSBlbHNlIGlmICghY29uZmlnLnJ0Y3BNdXhQb2xpY3kpIHtcbiAgICAgIGNvbmZpZy5ydGNwTXV4UG9saWN5ID0gJ3JlcXVpcmUnO1xuICAgIH1cblxuICAgIHN3aXRjaCAoY29uZmlnLmljZVRyYW5zcG9ydFBvbGljeSkge1xuICAgICAgY2FzZSAnYWxsJzpcbiAgICAgIGNhc2UgJ3JlbGF5JzpcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25maWcuaWNlVHJhbnNwb3J0UG9saWN5ID0gJ2FsbCc7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHN3aXRjaCAoY29uZmlnLmJ1bmRsZVBvbGljeSkge1xuICAgICAgY2FzZSAnYmFsYW5jZWQnOlxuICAgICAgY2FzZSAnbWF4LWNvbXBhdCc6XG4gICAgICBjYXNlICdtYXgtYnVuZGxlJzpcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25maWcuYnVuZGxlUG9saWN5ID0gJ2JhbGFuY2VkJztcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY29uZmlnLmljZVNlcnZlcnMgPSBmaWx0ZXJJY2VTZXJ2ZXJzKGNvbmZpZy5pY2VTZXJ2ZXJzIHx8IFtdLCBlZGdlVmVyc2lvbik7XG5cbiAgICB0aGlzLl9pY2VHYXRoZXJlcnMgPSBbXTtcbiAgICBpZiAoY29uZmlnLmljZUNhbmRpZGF0ZVBvb2xTaXplKSB7XG4gICAgICBmb3IgKHZhciBpID0gY29uZmlnLmljZUNhbmRpZGF0ZVBvb2xTaXplOyBpID4gMDsgaS0tKSB7XG4gICAgICAgIHRoaXMuX2ljZUdhdGhlcmVycy5wdXNoKG5ldyB3aW5kb3cuUlRDSWNlR2F0aGVyZXIoe1xuICAgICAgICAgIGljZVNlcnZlcnM6IGNvbmZpZy5pY2VTZXJ2ZXJzLFxuICAgICAgICAgIGdhdGhlclBvbGljeTogY29uZmlnLmljZVRyYW5zcG9ydFBvbGljeVxuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbmZpZy5pY2VDYW5kaWRhdGVQb29sU2l6ZSA9IDA7XG4gICAgfVxuXG4gICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xuXG4gICAgLy8gcGVyLXRyYWNrIGljZUdhdGhlcnMsIGljZVRyYW5zcG9ydHMsIGR0bHNUcmFuc3BvcnRzLCBydHBTZW5kZXJzLCAuLi5cbiAgICAvLyBldmVyeXRoaW5nIHRoYXQgaXMgbmVlZGVkIHRvIGRlc2NyaWJlIGEgU0RQIG0tbGluZS5cbiAgICB0aGlzLnRyYW5zY2VpdmVycyA9IFtdO1xuXG4gICAgdGhpcy5fc2RwU2Vzc2lvbklkID0gU0RQVXRpbHMuZ2VuZXJhdGVTZXNzaW9uSWQoKTtcbiAgICB0aGlzLl9zZHBTZXNzaW9uVmVyc2lvbiA9IDA7XG5cbiAgICB0aGlzLl9kdGxzUm9sZSA9IHVuZGVmaW5lZDsgLy8gcm9sZSBmb3IgYT1zZXR1cCB0byB1c2UgaW4gYW5zd2Vycy5cblxuICAgIHRoaXMuX2lzQ2xvc2VkID0gZmFsc2U7XG4gIH07XG5cbiAgLy8gc2V0IHVwIGV2ZW50IGhhbmRsZXJzIG9uIHByb3RvdHlwZVxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub25pY2VjYW5kaWRhdGUgPSBudWxsO1xuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub25hZGRzdHJlYW0gPSBudWxsO1xuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub250cmFjayA9IG51bGw7XG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5vbnJlbW92ZXN0cmVhbSA9IG51bGw7XG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5vbnNpZ25hbGluZ3N0YXRlY2hhbmdlID0gbnVsbDtcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9uaWNlY29ubmVjdGlvbnN0YXRlY2hhbmdlID0gbnVsbDtcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9uY29ubmVjdGlvbnN0YXRlY2hhbmdlID0gbnVsbDtcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9uaWNlZ2F0aGVyaW5nc3RhdGVjaGFuZ2UgPSBudWxsO1xuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub25uZWdvdGlhdGlvbm5lZWRlZCA9IG51bGw7XG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5vbmRhdGFjaGFubmVsID0gbnVsbDtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX2Rpc3BhdGNoRXZlbnQgPSBmdW5jdGlvbihuYW1lLCBldmVudCkge1xuICAgIGlmICh0aGlzLl9pc0Nsb3NlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIGlmICh0eXBlb2YgdGhpc1snb24nICsgbmFtZV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXNbJ29uJyArIG5hbWVdKGV2ZW50KTtcbiAgICB9XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl9lbWl0R2F0aGVyaW5nU3RhdGVDaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ2ljZWdhdGhlcmluZ3N0YXRlY2hhbmdlJyk7XG4gICAgdGhpcy5fZGlzcGF0Y2hFdmVudCgnaWNlZ2F0aGVyaW5nc3RhdGVjaGFuZ2UnLCBldmVudCk7XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldENvbmZpZ3VyYXRpb24gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRMb2NhbFN0cmVhbXMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5sb2NhbFN0cmVhbXM7XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFJlbW90ZVN0cmVhbXMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5yZW1vdGVTdHJlYW1zO1xuICB9O1xuXG4gIC8vIGludGVybmFsIGhlbHBlciB0byBjcmVhdGUgYSB0cmFuc2NlaXZlciBvYmplY3QuXG4gIC8vICh3aGljaCBpcyBub3QgeWV0IHRoZSBzYW1lIGFzIHRoZSBXZWJSVEMgMS4wIHRyYW5zY2VpdmVyKVxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX2NyZWF0ZVRyYW5zY2VpdmVyID0gZnVuY3Rpb24oa2luZCwgZG9Ob3RBZGQpIHtcbiAgICB2YXIgaGFzQnVuZGxlVHJhbnNwb3J0ID0gdGhpcy50cmFuc2NlaXZlcnMubGVuZ3RoID4gMDtcbiAgICB2YXIgdHJhbnNjZWl2ZXIgPSB7XG4gICAgICB0cmFjazogbnVsbCxcbiAgICAgIGljZUdhdGhlcmVyOiBudWxsLFxuICAgICAgaWNlVHJhbnNwb3J0OiBudWxsLFxuICAgICAgZHRsc1RyYW5zcG9ydDogbnVsbCxcbiAgICAgIGxvY2FsQ2FwYWJpbGl0aWVzOiBudWxsLFxuICAgICAgcmVtb3RlQ2FwYWJpbGl0aWVzOiBudWxsLFxuICAgICAgcnRwU2VuZGVyOiBudWxsLFxuICAgICAgcnRwUmVjZWl2ZXI6IG51bGwsXG4gICAgICBraW5kOiBraW5kLFxuICAgICAgbWlkOiBudWxsLFxuICAgICAgc2VuZEVuY29kaW5nUGFyYW1ldGVyczogbnVsbCxcbiAgICAgIHJlY3ZFbmNvZGluZ1BhcmFtZXRlcnM6IG51bGwsXG4gICAgICBzdHJlYW06IG51bGwsXG4gICAgICBhc3NvY2lhdGVkUmVtb3RlTWVkaWFTdHJlYW1zOiBbXSxcbiAgICAgIHdhbnRSZWNlaXZlOiB0cnVlXG4gICAgfTtcbiAgICBpZiAodGhpcy51c2luZ0J1bmRsZSAmJiBoYXNCdW5kbGVUcmFuc3BvcnQpIHtcbiAgICAgIHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydCA9IHRoaXMudHJhbnNjZWl2ZXJzWzBdLmljZVRyYW5zcG9ydDtcbiAgICAgIHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQgPSB0aGlzLnRyYW5zY2VpdmVyc1swXS5kdGxzVHJhbnNwb3J0O1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdHJhbnNwb3J0cyA9IHRoaXMuX2NyZWF0ZUljZUFuZER0bHNUcmFuc3BvcnRzKCk7XG4gICAgICB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQgPSB0cmFuc3BvcnRzLmljZVRyYW5zcG9ydDtcbiAgICAgIHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQgPSB0cmFuc3BvcnRzLmR0bHNUcmFuc3BvcnQ7XG4gICAgfVxuICAgIGlmICghZG9Ob3RBZGQpIHtcbiAgICAgIHRoaXMudHJhbnNjZWl2ZXJzLnB1c2godHJhbnNjZWl2ZXIpO1xuICAgIH1cbiAgICByZXR1cm4gdHJhbnNjZWl2ZXI7XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFRyYWNrID0gZnVuY3Rpb24odHJhY2ssIHN0cmVhbSkge1xuICAgIGlmICh0aGlzLl9pc0Nsb3NlZCkge1xuICAgICAgdGhyb3cgbWFrZUVycm9yKCdJbnZhbGlkU3RhdGVFcnJvcicsXG4gICAgICAgICAgJ0F0dGVtcHRlZCB0byBjYWxsIGFkZFRyYWNrIG9uIGEgY2xvc2VkIHBlZXJjb25uZWN0aW9uLicpO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5RXhpc3RzID0gdGhpcy50cmFuc2NlaXZlcnMuZmluZChmdW5jdGlvbihzKSB7XG4gICAgICByZXR1cm4gcy50cmFjayA9PT0gdHJhY2s7XG4gICAgfSk7XG5cbiAgICBpZiAoYWxyZWFkeUV4aXN0cykge1xuICAgICAgdGhyb3cgbWFrZUVycm9yKCdJbnZhbGlkQWNjZXNzRXJyb3InLCAnVHJhY2sgYWxyZWFkeSBleGlzdHMuJyk7XG4gICAgfVxuXG4gICAgdmFyIHRyYW5zY2VpdmVyO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50cmFuc2NlaXZlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICghdGhpcy50cmFuc2NlaXZlcnNbaV0udHJhY2sgJiZcbiAgICAgICAgICB0aGlzLnRyYW5zY2VpdmVyc1tpXS5raW5kID09PSB0cmFjay5raW5kKSB7XG4gICAgICAgIHRyYW5zY2VpdmVyID0gdGhpcy50cmFuc2NlaXZlcnNbaV07XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghdHJhbnNjZWl2ZXIpIHtcbiAgICAgIHRyYW5zY2VpdmVyID0gdGhpcy5fY3JlYXRlVHJhbnNjZWl2ZXIodHJhY2sua2luZCk7XG4gICAgfVxuXG4gICAgdGhpcy5fbWF5YmVGaXJlTmVnb3RpYXRpb25OZWVkZWQoKTtcblxuICAgIGlmICh0aGlzLmxvY2FsU3RyZWFtcy5pbmRleE9mKHN0cmVhbSkgPT09IC0xKSB7XG4gICAgICB0aGlzLmxvY2FsU3RyZWFtcy5wdXNoKHN0cmVhbSk7XG4gICAgfVxuXG4gICAgdHJhbnNjZWl2ZXIudHJhY2sgPSB0cmFjaztcbiAgICB0cmFuc2NlaXZlci5zdHJlYW0gPSBzdHJlYW07XG4gICAgdHJhbnNjZWl2ZXIucnRwU2VuZGVyID0gbmV3IHdpbmRvdy5SVENSdHBTZW5kZXIodHJhY2ssXG4gICAgICAgIHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQpO1xuICAgIHJldHVybiB0cmFuc2NlaXZlci5ydHBTZW5kZXI7XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgIHZhciBwYyA9IHRoaXM7XG4gICAgaWYgKGVkZ2VWZXJzaW9uID49IDE1MDI1KSB7XG4gICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xuICAgICAgICBwYy5hZGRUcmFjayh0cmFjaywgc3RyZWFtKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBDbG9uZSBpcyBuZWNlc3NhcnkgZm9yIGxvY2FsIGRlbW9zIG1vc3RseSwgYXR0YWNoaW5nIGRpcmVjdGx5XG4gICAgICAvLyB0byB0d28gZGlmZmVyZW50IHNlbmRlcnMgZG9lcyBub3Qgd29yayAoYnVpbGQgMTA1NDcpLlxuICAgICAgLy8gRml4ZWQgaW4gMTUwMjUgKG9yIGVhcmxpZXIpXG4gICAgICB2YXIgY2xvbmVkU3RyZWFtID0gc3RyZWFtLmNsb25lKCk7XG4gICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaywgaWR4KSB7XG4gICAgICAgIHZhciBjbG9uZWRUcmFjayA9IGNsb25lZFN0cmVhbS5nZXRUcmFja3MoKVtpZHhdO1xuICAgICAgICB0cmFjay5hZGRFdmVudExpc3RlbmVyKCdlbmFibGVkJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBjbG9uZWRUcmFjay5lbmFibGVkID0gZXZlbnQuZW5hYmxlZDtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIGNsb25lZFN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XG4gICAgICAgIHBjLmFkZFRyYWNrKHRyYWNrLCBjbG9uZWRTdHJlYW0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVUcmFjayA9IGZ1bmN0aW9uKHNlbmRlcikge1xuICAgIGlmICh0aGlzLl9pc0Nsb3NlZCkge1xuICAgICAgdGhyb3cgbWFrZUVycm9yKCdJbnZhbGlkU3RhdGVFcnJvcicsXG4gICAgICAgICAgJ0F0dGVtcHRlZCB0byBjYWxsIHJlbW92ZVRyYWNrIG9uIGEgY2xvc2VkIHBlZXJjb25uZWN0aW9uLicpO1xuICAgIH1cblxuICAgIGlmICghKHNlbmRlciBpbnN0YW5jZW9mIHdpbmRvdy5SVENSdHBTZW5kZXIpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCAxIG9mIFJUQ1BlZXJDb25uZWN0aW9uLnJlbW92ZVRyYWNrICcgK1xuICAgICAgICAgICdkb2VzIG5vdCBpbXBsZW1lbnQgaW50ZXJmYWNlIFJUQ1J0cFNlbmRlci4nKTtcbiAgICB9XG5cbiAgICB2YXIgdHJhbnNjZWl2ZXIgPSB0aGlzLnRyYW5zY2VpdmVycy5maW5kKGZ1bmN0aW9uKHQpIHtcbiAgICAgIHJldHVybiB0LnJ0cFNlbmRlciA9PT0gc2VuZGVyO1xuICAgIH0pO1xuXG4gICAgaWYgKCF0cmFuc2NlaXZlcikge1xuICAgICAgdGhyb3cgbWFrZUVycm9yKCdJbnZhbGlkQWNjZXNzRXJyb3InLFxuICAgICAgICAgICdTZW5kZXIgd2FzIG5vdCBjcmVhdGVkIGJ5IHRoaXMgY29ubmVjdGlvbi4nKTtcbiAgICB9XG4gICAgdmFyIHN0cmVhbSA9IHRyYW5zY2VpdmVyLnN0cmVhbTtcblxuICAgIHRyYW5zY2VpdmVyLnJ0cFNlbmRlci5zdG9wKCk7XG4gICAgdHJhbnNjZWl2ZXIucnRwU2VuZGVyID0gbnVsbDtcbiAgICB0cmFuc2NlaXZlci50cmFjayA9IG51bGw7XG4gICAgdHJhbnNjZWl2ZXIuc3RyZWFtID0gbnVsbDtcblxuICAgIC8vIHJlbW92ZSB0aGUgc3RyZWFtIGZyb20gdGhlIHNldCBvZiBsb2NhbCBzdHJlYW1zXG4gICAgdmFyIGxvY2FsU3RyZWFtcyA9IHRoaXMudHJhbnNjZWl2ZXJzLm1hcChmdW5jdGlvbih0KSB7XG4gICAgICByZXR1cm4gdC5zdHJlYW07XG4gICAgfSk7XG4gICAgaWYgKGxvY2FsU3RyZWFtcy5pbmRleE9mKHN0cmVhbSkgPT09IC0xICYmXG4gICAgICAgIHRoaXMubG9jYWxTdHJlYW1zLmluZGV4T2Yoc3RyZWFtKSA+IC0xKSB7XG4gICAgICB0aGlzLmxvY2FsU3RyZWFtcy5zcGxpY2UodGhpcy5sb2NhbFN0cmVhbXMuaW5kZXhPZihzdHJlYW0pLCAxKTtcbiAgICB9XG5cbiAgICB0aGlzLl9tYXliZUZpcmVOZWdvdGlhdGlvbk5lZWRlZCgpO1xuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICB2YXIgcGMgPSB0aGlzO1xuICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XG4gICAgICB2YXIgc2VuZGVyID0gcGMuZ2V0U2VuZGVycygpLmZpbmQoZnVuY3Rpb24ocykge1xuICAgICAgICByZXR1cm4gcy50cmFjayA9PT0gdHJhY2s7XG4gICAgICB9KTtcbiAgICAgIGlmIChzZW5kZXIpIHtcbiAgICAgICAgcGMucmVtb3ZlVHJhY2soc2VuZGVyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U2VuZGVycyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnRyYW5zY2VpdmVycy5maWx0ZXIoZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcbiAgICAgIHJldHVybiAhIXRyYW5zY2VpdmVyLnJ0cFNlbmRlcjtcbiAgICB9KVxuICAgIC5tYXAoZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcbiAgICAgIHJldHVybiB0cmFuc2NlaXZlci5ydHBTZW5kZXI7XG4gICAgfSk7XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFJlY2VpdmVycyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnRyYW5zY2VpdmVycy5maWx0ZXIoZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcbiAgICAgIHJldHVybiAhIXRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyO1xuICAgIH0pXG4gICAgLm1hcChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xuICAgICAgcmV0dXJuIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyO1xuICAgIH0pO1xuICB9O1xuXG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl9jcmVhdGVJY2VHYXRoZXJlciA9IGZ1bmN0aW9uKHNkcE1MaW5lSW5kZXgsXG4gICAgICB1c2luZ0J1bmRsZSkge1xuICAgIHZhciBwYyA9IHRoaXM7XG4gICAgaWYgKHVzaW5nQnVuZGxlICYmIHNkcE1MaW5lSW5kZXggPiAwKSB7XG4gICAgICByZXR1cm4gdGhpcy50cmFuc2NlaXZlcnNbMF0uaWNlR2F0aGVyZXI7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9pY2VHYXRoZXJlcnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdGhpcy5faWNlR2F0aGVyZXJzLnNoaWZ0KCk7XG4gICAgfVxuICAgIHZhciBpY2VHYXRoZXJlciA9IG5ldyB3aW5kb3cuUlRDSWNlR2F0aGVyZXIoe1xuICAgICAgaWNlU2VydmVyczogdGhpcy5fY29uZmlnLmljZVNlcnZlcnMsXG4gICAgICBnYXRoZXJQb2xpY3k6IHRoaXMuX2NvbmZpZy5pY2VUcmFuc3BvcnRQb2xpY3lcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoaWNlR2F0aGVyZXIsICdzdGF0ZScsXG4gICAgICAgIHt2YWx1ZTogJ25ldycsIHdyaXRhYmxlOiB0cnVlfVxuICAgICk7XG5cbiAgICB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5idWZmZXJlZENhbmRpZGF0ZUV2ZW50cyA9IFtdO1xuICAgIHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmJ1ZmZlckNhbmRpZGF0ZXMgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgdmFyIGVuZCA9ICFldmVudC5jYW5kaWRhdGUgfHwgT2JqZWN0LmtleXMoZXZlbnQuY2FuZGlkYXRlKS5sZW5ndGggPT09IDA7XG4gICAgICAvLyBwb2x5ZmlsbCBzaW5jZSBSVENJY2VHYXRoZXJlci5zdGF0ZSBpcyBub3QgaW1wbGVtZW50ZWQgaW5cbiAgICAgIC8vIEVkZ2UgMTA1NDcgeWV0LlxuICAgICAgaWNlR2F0aGVyZXIuc3RhdGUgPSBlbmQgPyAnY29tcGxldGVkJyA6ICdnYXRoZXJpbmcnO1xuICAgICAgaWYgKHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5idWZmZXJlZENhbmRpZGF0ZUV2ZW50cyAhPT0gbnVsbCkge1xuICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uYnVmZmVyZWRDYW5kaWRhdGVFdmVudHMucHVzaChldmVudCk7XG4gICAgICB9XG4gICAgfTtcbiAgICBpY2VHYXRoZXJlci5hZGRFdmVudExpc3RlbmVyKCdsb2NhbGNhbmRpZGF0ZScsXG4gICAgICB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5idWZmZXJDYW5kaWRhdGVzKTtcbiAgICByZXR1cm4gaWNlR2F0aGVyZXI7XG4gIH07XG5cbiAgLy8gc3RhcnQgZ2F0aGVyaW5nIGZyb20gYW4gUlRDSWNlR2F0aGVyZXIuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fZ2F0aGVyID0gZnVuY3Rpb24obWlkLCBzZHBNTGluZUluZGV4KSB7XG4gICAgdmFyIHBjID0gdGhpcztcbiAgICB2YXIgaWNlR2F0aGVyZXIgPSB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5pY2VHYXRoZXJlcjtcbiAgICBpZiAoaWNlR2F0aGVyZXIub25sb2NhbGNhbmRpZGF0ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgYnVmZmVyZWRDYW5kaWRhdGVFdmVudHMgPVxuICAgICAgdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uYnVmZmVyZWRDYW5kaWRhdGVFdmVudHM7XG4gICAgdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uYnVmZmVyZWRDYW5kaWRhdGVFdmVudHMgPSBudWxsO1xuICAgIGljZUdhdGhlcmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xvY2FsY2FuZGlkYXRlJyxcbiAgICAgIHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmJ1ZmZlckNhbmRpZGF0ZXMpO1xuICAgIGljZUdhdGhlcmVyLm9ubG9jYWxjYW5kaWRhdGUgPSBmdW5jdGlvbihldnQpIHtcbiAgICAgIGlmIChwYy51c2luZ0J1bmRsZSAmJiBzZHBNTGluZUluZGV4ID4gMCkge1xuICAgICAgICAvLyBpZiB3ZSBrbm93IHRoYXQgd2UgdXNlIGJ1bmRsZSB3ZSBjYW4gZHJvcCBjYW5kaWRhdGVzIHdpdGhcbiAgICAgICAgLy8g0ZVkcE1MaW5lSW5kZXggPiAwLiBJZiB3ZSBkb24ndCBkbyB0aGlzIHRoZW4gb3VyIHN0YXRlIGdldHNcbiAgICAgICAgLy8gY29uZnVzZWQgc2luY2Ugd2UgZGlzcG9zZSB0aGUgZXh0cmEgaWNlIGdhdGhlcmVyLlxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ2ljZWNhbmRpZGF0ZScpO1xuICAgICAgZXZlbnQuY2FuZGlkYXRlID0ge3NkcE1pZDogbWlkLCBzZHBNTGluZUluZGV4OiBzZHBNTGluZUluZGV4fTtcblxuICAgICAgdmFyIGNhbmQgPSBldnQuY2FuZGlkYXRlO1xuICAgICAgLy8gRWRnZSBlbWl0cyBhbiBlbXB0eSBvYmplY3QgZm9yIFJUQ0ljZUNhbmRpZGF0ZUNvbXBsZXRl4oClXG4gICAgICB2YXIgZW5kID0gIWNhbmQgfHwgT2JqZWN0LmtleXMoY2FuZCkubGVuZ3RoID09PSAwO1xuICAgICAgaWYgKGVuZCkge1xuICAgICAgICAvLyBwb2x5ZmlsbCBzaW5jZSBSVENJY2VHYXRoZXJlci5zdGF0ZSBpcyBub3QgaW1wbGVtZW50ZWQgaW5cbiAgICAgICAgLy8gRWRnZSAxMDU0NyB5ZXQuXG4gICAgICAgIGlmIChpY2VHYXRoZXJlci5zdGF0ZSA9PT0gJ25ldycgfHwgaWNlR2F0aGVyZXIuc3RhdGUgPT09ICdnYXRoZXJpbmcnKSB7XG4gICAgICAgICAgaWNlR2F0aGVyZXIuc3RhdGUgPSAnY29tcGxldGVkJztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGljZUdhdGhlcmVyLnN0YXRlID09PSAnbmV3Jykge1xuICAgICAgICAgIGljZUdhdGhlcmVyLnN0YXRlID0gJ2dhdGhlcmluZyc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUlRDSWNlQ2FuZGlkYXRlIGRvZXNuJ3QgaGF2ZSBhIGNvbXBvbmVudCwgbmVlZHMgdG8gYmUgYWRkZWRcbiAgICAgICAgY2FuZC5jb21wb25lbnQgPSAxO1xuICAgICAgICAvLyBhbHNvIHRoZSB1c2VybmFtZUZyYWdtZW50LiBUT0RPOiB1cGRhdGUgU0RQIHRvIHRha2UgYm90aCB2YXJpYW50cy5cbiAgICAgICAgY2FuZC51ZnJhZyA9IGljZUdhdGhlcmVyLmdldExvY2FsUGFyYW1ldGVycygpLnVzZXJuYW1lRnJhZ21lbnQ7XG5cbiAgICAgICAgdmFyIHNlcmlhbGl6ZWRDYW5kaWRhdGUgPSBTRFBVdGlscy53cml0ZUNhbmRpZGF0ZShjYW5kKTtcbiAgICAgICAgZXZlbnQuY2FuZGlkYXRlID0gT2JqZWN0LmFzc2lnbihldmVudC5jYW5kaWRhdGUsXG4gICAgICAgICAgICBTRFBVdGlscy5wYXJzZUNhbmRpZGF0ZShzZXJpYWxpemVkQ2FuZGlkYXRlKSk7XG5cbiAgICAgICAgZXZlbnQuY2FuZGlkYXRlLmNhbmRpZGF0ZSA9IHNlcmlhbGl6ZWRDYW5kaWRhdGU7XG4gICAgICAgIGV2ZW50LmNhbmRpZGF0ZS50b0pTT04gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY2FuZGlkYXRlOiBldmVudC5jYW5kaWRhdGUuY2FuZGlkYXRlLFxuICAgICAgICAgICAgc2RwTWlkOiBldmVudC5jYW5kaWRhdGUuc2RwTWlkLFxuICAgICAgICAgICAgc2RwTUxpbmVJbmRleDogZXZlbnQuY2FuZGlkYXRlLnNkcE1MaW5lSW5kZXgsXG4gICAgICAgICAgICB1c2VybmFtZUZyYWdtZW50OiBldmVudC5jYW5kaWRhdGUudXNlcm5hbWVGcmFnbWVudFxuICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIC8vIHVwZGF0ZSBsb2NhbCBkZXNjcmlwdGlvbi5cbiAgICAgIHZhciBzZWN0aW9ucyA9IFNEUFV0aWxzLmdldE1lZGlhU2VjdGlvbnMocGMubG9jYWxEZXNjcmlwdGlvbi5zZHApO1xuICAgICAgaWYgKCFlbmQpIHtcbiAgICAgICAgc2VjdGlvbnNbZXZlbnQuY2FuZGlkYXRlLnNkcE1MaW5lSW5kZXhdICs9XG4gICAgICAgICAgICAnYT0nICsgZXZlbnQuY2FuZGlkYXRlLmNhbmRpZGF0ZSArICdcXHJcXG4nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VjdGlvbnNbZXZlbnQuY2FuZGlkYXRlLnNkcE1MaW5lSW5kZXhdICs9XG4gICAgICAgICAgICAnYT1lbmQtb2YtY2FuZGlkYXRlc1xcclxcbic7XG4gICAgICB9XG4gICAgICBwYy5sb2NhbERlc2NyaXB0aW9uLnNkcCA9XG4gICAgICAgICAgU0RQVXRpbHMuZ2V0RGVzY3JpcHRpb24ocGMubG9jYWxEZXNjcmlwdGlvbi5zZHApICtcbiAgICAgICAgICBzZWN0aW9ucy5qb2luKCcnKTtcbiAgICAgIHZhciBjb21wbGV0ZSA9IHBjLnRyYW5zY2VpdmVycy5ldmVyeShmdW5jdGlvbih0cmFuc2NlaXZlcikge1xuICAgICAgICByZXR1cm4gdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIgJiZcbiAgICAgICAgICAgIHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyLnN0YXRlID09PSAnY29tcGxldGVkJztcbiAgICAgIH0pO1xuXG4gICAgICBpZiAocGMuaWNlR2F0aGVyaW5nU3RhdGUgIT09ICdnYXRoZXJpbmcnKSB7XG4gICAgICAgIHBjLmljZUdhdGhlcmluZ1N0YXRlID0gJ2dhdGhlcmluZyc7XG4gICAgICAgIHBjLl9lbWl0R2F0aGVyaW5nU3RhdGVDaGFuZ2UoKTtcbiAgICAgIH1cblxuICAgICAgLy8gRW1pdCBjYW5kaWRhdGUuIEFsc28gZW1pdCBudWxsIGNhbmRpZGF0ZSB3aGVuIGFsbCBnYXRoZXJlcnMgYXJlXG4gICAgICAvLyBjb21wbGV0ZS5cbiAgICAgIGlmICghZW5kKSB7XG4gICAgICAgIHBjLl9kaXNwYXRjaEV2ZW50KCdpY2VjYW5kaWRhdGUnLCBldmVudCk7XG4gICAgICB9XG4gICAgICBpZiAoY29tcGxldGUpIHtcbiAgICAgICAgcGMuX2Rpc3BhdGNoRXZlbnQoJ2ljZWNhbmRpZGF0ZScsIG5ldyBFdmVudCgnaWNlY2FuZGlkYXRlJykpO1xuICAgICAgICBwYy5pY2VHYXRoZXJpbmdTdGF0ZSA9ICdjb21wbGV0ZSc7XG4gICAgICAgIHBjLl9lbWl0R2F0aGVyaW5nU3RhdGVDaGFuZ2UoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gZW1pdCBhbHJlYWR5IGdhdGhlcmVkIGNhbmRpZGF0ZXMuXG4gICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBidWZmZXJlZENhbmRpZGF0ZUV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWNlR2F0aGVyZXIub25sb2NhbGNhbmRpZGF0ZShlKTtcbiAgICAgIH0pO1xuICAgIH0sIDApO1xuICB9O1xuXG4gIC8vIENyZWF0ZSBJQ0UgdHJhbnNwb3J0IGFuZCBEVExTIHRyYW5zcG9ydC5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl9jcmVhdGVJY2VBbmREdGxzVHJhbnNwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBwYyA9IHRoaXM7XG4gICAgdmFyIGljZVRyYW5zcG9ydCA9IG5ldyB3aW5kb3cuUlRDSWNlVHJhbnNwb3J0KG51bGwpO1xuICAgIGljZVRyYW5zcG9ydC5vbmljZXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICBwYy5fdXBkYXRlSWNlQ29ubmVjdGlvblN0YXRlKCk7XG4gICAgICBwYy5fdXBkYXRlQ29ubmVjdGlvblN0YXRlKCk7XG4gICAgfTtcblxuICAgIHZhciBkdGxzVHJhbnNwb3J0ID0gbmV3IHdpbmRvdy5SVENEdGxzVHJhbnNwb3J0KGljZVRyYW5zcG9ydCk7XG4gICAgZHRsc1RyYW5zcG9ydC5vbmR0bHNzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcGMuX3VwZGF0ZUNvbm5lY3Rpb25TdGF0ZSgpO1xuICAgIH07XG4gICAgZHRsc1RyYW5zcG9ydC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAvLyBvbmVycm9yIGRvZXMgbm90IHNldCBzdGF0ZSB0byBmYWlsZWQgYnkgaXRzZWxmLlxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGR0bHNUcmFuc3BvcnQsICdzdGF0ZScsXG4gICAgICAgICAge3ZhbHVlOiAnZmFpbGVkJywgd3JpdGFibGU6IHRydWV9KTtcbiAgICAgIHBjLl91cGRhdGVDb25uZWN0aW9uU3RhdGUoKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGljZVRyYW5zcG9ydDogaWNlVHJhbnNwb3J0LFxuICAgICAgZHRsc1RyYW5zcG9ydDogZHRsc1RyYW5zcG9ydFxuICAgIH07XG4gIH07XG5cbiAgLy8gRGVzdHJveSBJQ0UgZ2F0aGVyZXIsIElDRSB0cmFuc3BvcnQgYW5kIERUTFMgdHJhbnNwb3J0LlxuICAvLyBXaXRob3V0IHRyaWdnZXJpbmcgdGhlIGNhbGxiYWNrcy5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl9kaXNwb3NlSWNlQW5kRHRsc1RyYW5zcG9ydHMgPSBmdW5jdGlvbihcbiAgICAgIHNkcE1MaW5lSW5kZXgpIHtcbiAgICB2YXIgaWNlR2F0aGVyZXIgPSB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5pY2VHYXRoZXJlcjtcbiAgICBpZiAoaWNlR2F0aGVyZXIpIHtcbiAgICAgIGRlbGV0ZSBpY2VHYXRoZXJlci5vbmxvY2FsY2FuZGlkYXRlO1xuICAgICAgZGVsZXRlIHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmljZUdhdGhlcmVyO1xuICAgIH1cbiAgICB2YXIgaWNlVHJhbnNwb3J0ID0gdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uaWNlVHJhbnNwb3J0O1xuICAgIGlmIChpY2VUcmFuc3BvcnQpIHtcbiAgICAgIGRlbGV0ZSBpY2VUcmFuc3BvcnQub25pY2VzdGF0ZWNoYW5nZTtcbiAgICAgIGRlbGV0ZSB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5pY2VUcmFuc3BvcnQ7XG4gICAgfVxuICAgIHZhciBkdGxzVHJhbnNwb3J0ID0gdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uZHRsc1RyYW5zcG9ydDtcbiAgICBpZiAoZHRsc1RyYW5zcG9ydCkge1xuICAgICAgZGVsZXRlIGR0bHNUcmFuc3BvcnQub25kdGxzc3RhdGVjaGFuZ2U7XG4gICAgICBkZWxldGUgZHRsc1RyYW5zcG9ydC5vbmVycm9yO1xuICAgICAgZGVsZXRlIHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmR0bHNUcmFuc3BvcnQ7XG4gICAgfVxuICB9O1xuXG4gIC8vIFN0YXJ0IHRoZSBSVFAgU2VuZGVyIGFuZCBSZWNlaXZlciBmb3IgYSB0cmFuc2NlaXZlci5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl90cmFuc2NlaXZlID0gZnVuY3Rpb24odHJhbnNjZWl2ZXIsXG4gICAgICBzZW5kLCByZWN2KSB7XG4gICAgdmFyIHBhcmFtcyA9IGdldENvbW1vbkNhcGFiaWxpdGllcyh0cmFuc2NlaXZlci5sb2NhbENhcGFiaWxpdGllcyxcbiAgICAgICAgdHJhbnNjZWl2ZXIucmVtb3RlQ2FwYWJpbGl0aWVzKTtcbiAgICBpZiAoc2VuZCAmJiB0cmFuc2NlaXZlci5ydHBTZW5kZXIpIHtcbiAgICAgIHBhcmFtcy5lbmNvZGluZ3MgPSB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzO1xuICAgICAgcGFyYW1zLnJ0Y3AgPSB7XG4gICAgICAgIGNuYW1lOiBTRFBVdGlscy5sb2NhbENOYW1lLFxuICAgICAgICBjb21wb3VuZDogdHJhbnNjZWl2ZXIucnRjcFBhcmFtZXRlcnMuY29tcG91bmRcbiAgICAgIH07XG4gICAgICBpZiAodHJhbnNjZWl2ZXIucmVjdkVuY29kaW5nUGFyYW1ldGVycy5sZW5ndGgpIHtcbiAgICAgICAgcGFyYW1zLnJ0Y3Auc3NyYyA9IHRyYW5zY2VpdmVyLnJlY3ZFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYztcbiAgICAgIH1cbiAgICAgIHRyYW5zY2VpdmVyLnJ0cFNlbmRlci5zZW5kKHBhcmFtcyk7XG4gICAgfVxuICAgIGlmIChyZWN2ICYmIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyICYmIHBhcmFtcy5jb2RlY3MubGVuZ3RoID4gMCkge1xuICAgICAgLy8gcmVtb3ZlIFJUWCBmaWVsZCBpbiBFZGdlIDE0OTQyXG4gICAgICBpZiAodHJhbnNjZWl2ZXIua2luZCA9PT0gJ3ZpZGVvJ1xuICAgICAgICAgICYmIHRyYW5zY2VpdmVyLnJlY3ZFbmNvZGluZ1BhcmFtZXRlcnNcbiAgICAgICAgICAmJiBlZGdlVmVyc2lvbiA8IDE1MDE5KSB7XG4gICAgICAgIHRyYW5zY2VpdmVyLnJlY3ZFbmNvZGluZ1BhcmFtZXRlcnMuZm9yRWFjaChmdW5jdGlvbihwKSB7XG4gICAgICAgICAgZGVsZXRlIHAucnR4O1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmICh0cmFuc2NlaXZlci5yZWN2RW5jb2RpbmdQYXJhbWV0ZXJzLmxlbmd0aCkge1xuICAgICAgICBwYXJhbXMuZW5jb2RpbmdzID0gdHJhbnNjZWl2ZXIucmVjdkVuY29kaW5nUGFyYW1ldGVycztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcmFtcy5lbmNvZGluZ3MgPSBbe31dO1xuICAgICAgfVxuICAgICAgcGFyYW1zLnJ0Y3AgPSB7XG4gICAgICAgIGNvbXBvdW5kOiB0cmFuc2NlaXZlci5ydGNwUGFyYW1ldGVycy5jb21wb3VuZFxuICAgICAgfTtcbiAgICAgIGlmICh0cmFuc2NlaXZlci5ydGNwUGFyYW1ldGVycy5jbmFtZSkge1xuICAgICAgICBwYXJhbXMucnRjcC5jbmFtZSA9IHRyYW5zY2VpdmVyLnJ0Y3BQYXJhbWV0ZXJzLmNuYW1lO1xuICAgICAgfVxuICAgICAgaWYgKHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnMubGVuZ3RoKSB7XG4gICAgICAgIHBhcmFtcy5ydGNwLnNzcmMgPSB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmM7XG4gICAgICB9XG4gICAgICB0cmFuc2NlaXZlci5ydHBSZWNlaXZlci5yZWNlaXZlKHBhcmFtcyk7XG4gICAgfVxuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5zZXRMb2NhbERlc2NyaXB0aW9uID0gZnVuY3Rpb24oZGVzY3JpcHRpb24pIHtcbiAgICB2YXIgcGMgPSB0aGlzO1xuXG4gICAgLy8gTm90ZTogcHJhbnN3ZXIgaXMgbm90IHN1cHBvcnRlZC5cbiAgICBpZiAoWydvZmZlcicsICdhbnN3ZXInXS5pbmRleE9mKGRlc2NyaXB0aW9uLnR5cGUpID09PSAtMSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG1ha2VFcnJvcignVHlwZUVycm9yJyxcbiAgICAgICAgICAnVW5zdXBwb3J0ZWQgdHlwZSBcIicgKyBkZXNjcmlwdGlvbi50eXBlICsgJ1wiJykpO1xuICAgIH1cblxuICAgIGlmICghaXNBY3Rpb25BbGxvd2VkSW5TaWduYWxpbmdTdGF0ZSgnc2V0TG9jYWxEZXNjcmlwdGlvbicsXG4gICAgICAgIGRlc2NyaXB0aW9uLnR5cGUsIHBjLnNpZ25hbGluZ1N0YXRlKSB8fCBwYy5faXNDbG9zZWQpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChtYWtlRXJyb3IoJ0ludmFsaWRTdGF0ZUVycm9yJyxcbiAgICAgICAgICAnQ2FuIG5vdCBzZXQgbG9jYWwgJyArIGRlc2NyaXB0aW9uLnR5cGUgK1xuICAgICAgICAgICcgaW4gc3RhdGUgJyArIHBjLnNpZ25hbGluZ1N0YXRlKSk7XG4gICAgfVxuXG4gICAgdmFyIHNlY3Rpb25zO1xuICAgIHZhciBzZXNzaW9ucGFydDtcbiAgICBpZiAoZGVzY3JpcHRpb24udHlwZSA9PT0gJ29mZmVyJykge1xuICAgICAgLy8gVkVSWSBsaW1pdGVkIHN1cHBvcnQgZm9yIFNEUCBtdW5naW5nLiBMaW1pdGVkIHRvOlxuICAgICAgLy8gKiBjaGFuZ2luZyB0aGUgb3JkZXIgb2YgY29kZWNzXG4gICAgICBzZWN0aW9ucyA9IFNEUFV0aWxzLnNwbGl0U2VjdGlvbnMoZGVzY3JpcHRpb24uc2RwKTtcbiAgICAgIHNlc3Npb25wYXJ0ID0gc2VjdGlvbnMuc2hpZnQoKTtcbiAgICAgIHNlY3Rpb25zLmZvckVhY2goZnVuY3Rpb24obWVkaWFTZWN0aW9uLCBzZHBNTGluZUluZGV4KSB7XG4gICAgICAgIHZhciBjYXBzID0gU0RQVXRpbHMucGFyc2VSdHBQYXJhbWV0ZXJzKG1lZGlhU2VjdGlvbik7XG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5sb2NhbENhcGFiaWxpdGllcyA9IGNhcHM7XG4gICAgICB9KTtcblxuICAgICAgcGMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIsIHNkcE1MaW5lSW5kZXgpIHtcbiAgICAgICAgcGMuX2dhdGhlcih0cmFuc2NlaXZlci5taWQsIHNkcE1MaW5lSW5kZXgpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChkZXNjcmlwdGlvbi50eXBlID09PSAnYW5zd2VyJykge1xuICAgICAgc2VjdGlvbnMgPSBTRFBVdGlscy5zcGxpdFNlY3Rpb25zKHBjLnJlbW90ZURlc2NyaXB0aW9uLnNkcCk7XG4gICAgICBzZXNzaW9ucGFydCA9IHNlY3Rpb25zLnNoaWZ0KCk7XG4gICAgICB2YXIgaXNJY2VMaXRlID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgoc2Vzc2lvbnBhcnQsXG4gICAgICAgICAgJ2E9aWNlLWxpdGUnKS5sZW5ndGggPiAwO1xuICAgICAgc2VjdGlvbnMuZm9yRWFjaChmdW5jdGlvbihtZWRpYVNlY3Rpb24sIHNkcE1MaW5lSW5kZXgpIHtcbiAgICAgICAgdmFyIHRyYW5zY2VpdmVyID0gcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdO1xuICAgICAgICB2YXIgaWNlR2F0aGVyZXIgPSB0cmFuc2NlaXZlci5pY2VHYXRoZXJlcjtcbiAgICAgICAgdmFyIGljZVRyYW5zcG9ydCA9IHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydDtcbiAgICAgICAgdmFyIGR0bHNUcmFuc3BvcnQgPSB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0O1xuICAgICAgICB2YXIgbG9jYWxDYXBhYmlsaXRpZXMgPSB0cmFuc2NlaXZlci5sb2NhbENhcGFiaWxpdGllcztcbiAgICAgICAgdmFyIHJlbW90ZUNhcGFiaWxpdGllcyA9IHRyYW5zY2VpdmVyLnJlbW90ZUNhcGFiaWxpdGllcztcblxuICAgICAgICAvLyB0cmVhdCBidW5kbGUtb25seSBhcyBub3QtcmVqZWN0ZWQuXG4gICAgICAgIHZhciByZWplY3RlZCA9IFNEUFV0aWxzLmlzUmVqZWN0ZWQobWVkaWFTZWN0aW9uKSAmJlxuICAgICAgICAgICAgU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1idW5kbGUtb25seScpLmxlbmd0aCA9PT0gMDtcblxuICAgICAgICBpZiAoIXJlamVjdGVkICYmICF0cmFuc2NlaXZlci5yZWplY3RlZCkge1xuICAgICAgICAgIHZhciByZW1vdGVJY2VQYXJhbWV0ZXJzID0gU0RQVXRpbHMuZ2V0SWNlUGFyYW1ldGVycyhcbiAgICAgICAgICAgICAgbWVkaWFTZWN0aW9uLCBzZXNzaW9ucGFydCk7XG4gICAgICAgICAgdmFyIHJlbW90ZUR0bHNQYXJhbWV0ZXJzID0gU0RQVXRpbHMuZ2V0RHRsc1BhcmFtZXRlcnMoXG4gICAgICAgICAgICAgIG1lZGlhU2VjdGlvbiwgc2Vzc2lvbnBhcnQpO1xuICAgICAgICAgIGlmIChpc0ljZUxpdGUpIHtcbiAgICAgICAgICAgIHJlbW90ZUR0bHNQYXJhbWV0ZXJzLnJvbGUgPSAnc2VydmVyJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIXBjLnVzaW5nQnVuZGxlIHx8IHNkcE1MaW5lSW5kZXggPT09IDApIHtcbiAgICAgICAgICAgIHBjLl9nYXRoZXIodHJhbnNjZWl2ZXIubWlkLCBzZHBNTGluZUluZGV4KTtcbiAgICAgICAgICAgIGlmIChpY2VUcmFuc3BvcnQuc3RhdGUgPT09ICduZXcnKSB7XG4gICAgICAgICAgICAgIGljZVRyYW5zcG9ydC5zdGFydChpY2VHYXRoZXJlciwgcmVtb3RlSWNlUGFyYW1ldGVycyxcbiAgICAgICAgICAgICAgICAgIGlzSWNlTGl0ZSA/ICdjb250cm9sbGluZycgOiAnY29udHJvbGxlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGR0bHNUcmFuc3BvcnQuc3RhdGUgPT09ICduZXcnKSB7XG4gICAgICAgICAgICAgIGR0bHNUcmFuc3BvcnQuc3RhcnQocmVtb3RlRHRsc1BhcmFtZXRlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIENhbGN1bGF0ZSBpbnRlcnNlY3Rpb24gb2YgY2FwYWJpbGl0aWVzLlxuICAgICAgICAgIHZhciBwYXJhbXMgPSBnZXRDb21tb25DYXBhYmlsaXRpZXMobG9jYWxDYXBhYmlsaXRpZXMsXG4gICAgICAgICAgICAgIHJlbW90ZUNhcGFiaWxpdGllcyk7XG5cbiAgICAgICAgICAvLyBTdGFydCB0aGUgUlRDUnRwU2VuZGVyLiBUaGUgUlRDUnRwUmVjZWl2ZXIgZm9yIHRoaXNcbiAgICAgICAgICAvLyB0cmFuc2NlaXZlciBoYXMgYWxyZWFkeSBiZWVuIHN0YXJ0ZWQgaW4gc2V0UmVtb3RlRGVzY3JpcHRpb24uXG4gICAgICAgICAgcGMuX3RyYW5zY2VpdmUodHJhbnNjZWl2ZXIsXG4gICAgICAgICAgICAgIHBhcmFtcy5jb2RlY3MubGVuZ3RoID4gMCxcbiAgICAgICAgICAgICAgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBwYy5sb2NhbERlc2NyaXB0aW9uID0ge1xuICAgICAgdHlwZTogZGVzY3JpcHRpb24udHlwZSxcbiAgICAgIHNkcDogZGVzY3JpcHRpb24uc2RwXG4gICAgfTtcbiAgICBpZiAoZGVzY3JpcHRpb24udHlwZSA9PT0gJ29mZmVyJykge1xuICAgICAgcGMuX3VwZGF0ZVNpZ25hbGluZ1N0YXRlKCdoYXZlLWxvY2FsLW9mZmVyJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBjLl91cGRhdGVTaWduYWxpbmdTdGF0ZSgnc3RhYmxlJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5zZXRSZW1vdGVEZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKGRlc2NyaXB0aW9uKSB7XG4gICAgdmFyIHBjID0gdGhpcztcblxuICAgIC8vIE5vdGU6IHByYW5zd2VyIGlzIG5vdCBzdXBwb3J0ZWQuXG4gICAgaWYgKFsnb2ZmZXInLCAnYW5zd2VyJ10uaW5kZXhPZihkZXNjcmlwdGlvbi50eXBlKSA9PT0gLTEpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChtYWtlRXJyb3IoJ1R5cGVFcnJvcicsXG4gICAgICAgICAgJ1Vuc3VwcG9ydGVkIHR5cGUgXCInICsgZGVzY3JpcHRpb24udHlwZSArICdcIicpKTtcbiAgICB9XG5cbiAgICBpZiAoIWlzQWN0aW9uQWxsb3dlZEluU2lnbmFsaW5nU3RhdGUoJ3NldFJlbW90ZURlc2NyaXB0aW9uJyxcbiAgICAgICAgZGVzY3JpcHRpb24udHlwZSwgcGMuc2lnbmFsaW5nU3RhdGUpIHx8IHBjLl9pc0Nsb3NlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG1ha2VFcnJvcignSW52YWxpZFN0YXRlRXJyb3InLFxuICAgICAgICAgICdDYW4gbm90IHNldCByZW1vdGUgJyArIGRlc2NyaXB0aW9uLnR5cGUgK1xuICAgICAgICAgICcgaW4gc3RhdGUgJyArIHBjLnNpZ25hbGluZ1N0YXRlKSk7XG4gICAgfVxuXG4gICAgdmFyIHN0cmVhbXMgPSB7fTtcbiAgICBwYy5yZW1vdGVTdHJlYW1zLmZvckVhY2goZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICBzdHJlYW1zW3N0cmVhbS5pZF0gPSBzdHJlYW07XG4gICAgfSk7XG4gICAgdmFyIHJlY2VpdmVyTGlzdCA9IFtdO1xuICAgIHZhciBzZWN0aW9ucyA9IFNEUFV0aWxzLnNwbGl0U2VjdGlvbnMoZGVzY3JpcHRpb24uc2RwKTtcbiAgICB2YXIgc2Vzc2lvbnBhcnQgPSBzZWN0aW9ucy5zaGlmdCgpO1xuICAgIHZhciBpc0ljZUxpdGUgPSBTRFBVdGlscy5tYXRjaFByZWZpeChzZXNzaW9ucGFydCxcbiAgICAgICAgJ2E9aWNlLWxpdGUnKS5sZW5ndGggPiAwO1xuICAgIHZhciB1c2luZ0J1bmRsZSA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KHNlc3Npb25wYXJ0LFxuICAgICAgICAnYT1ncm91cDpCVU5ETEUgJykubGVuZ3RoID4gMDtcbiAgICBwYy51c2luZ0J1bmRsZSA9IHVzaW5nQnVuZGxlO1xuICAgIHZhciBpY2VPcHRpb25zID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgoc2Vzc2lvbnBhcnQsXG4gICAgICAgICdhPWljZS1vcHRpb25zOicpWzBdO1xuICAgIGlmIChpY2VPcHRpb25zKSB7XG4gICAgICBwYy5jYW5Ucmlja2xlSWNlQ2FuZGlkYXRlcyA9IGljZU9wdGlvbnMuc3Vic3RyKDE0KS5zcGxpdCgnICcpXG4gICAgICAgICAgLmluZGV4T2YoJ3RyaWNrbGUnKSA+PSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYy5jYW5Ucmlja2xlSWNlQ2FuZGlkYXRlcyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHNlY3Rpb25zLmZvckVhY2goZnVuY3Rpb24obWVkaWFTZWN0aW9uLCBzZHBNTGluZUluZGV4KSB7XG4gICAgICB2YXIgbGluZXMgPSBTRFBVdGlscy5zcGxpdExpbmVzKG1lZGlhU2VjdGlvbik7XG4gICAgICB2YXIga2luZCA9IFNEUFV0aWxzLmdldEtpbmQobWVkaWFTZWN0aW9uKTtcbiAgICAgIC8vIHRyZWF0IGJ1bmRsZS1vbmx5IGFzIG5vdC1yZWplY3RlZC5cbiAgICAgIHZhciByZWplY3RlZCA9IFNEUFV0aWxzLmlzUmVqZWN0ZWQobWVkaWFTZWN0aW9uKSAmJlxuICAgICAgICAgIFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9YnVuZGxlLW9ubHknKS5sZW5ndGggPT09IDA7XG4gICAgICB2YXIgcHJvdG9jb2wgPSBsaW5lc1swXS5zdWJzdHIoMikuc3BsaXQoJyAnKVsyXTtcblxuICAgICAgdmFyIGRpcmVjdGlvbiA9IFNEUFV0aWxzLmdldERpcmVjdGlvbihtZWRpYVNlY3Rpb24sIHNlc3Npb25wYXJ0KTtcbiAgICAgIHZhciByZW1vdGVNc2lkID0gU0RQVXRpbHMucGFyc2VNc2lkKG1lZGlhU2VjdGlvbik7XG5cbiAgICAgIHZhciBtaWQgPSBTRFBVdGlscy5nZXRNaWQobWVkaWFTZWN0aW9uKSB8fCBTRFBVdGlscy5nZW5lcmF0ZUlkZW50aWZpZXIoKTtcblxuICAgICAgLy8gUmVqZWN0IGRhdGFjaGFubmVscyB3aGljaCBhcmUgbm90IGltcGxlbWVudGVkIHlldC5cbiAgICAgIGlmICgoa2luZCA9PT0gJ2FwcGxpY2F0aW9uJyAmJiBwcm90b2NvbCA9PT0gJ0RUTFMvU0NUUCcpIHx8IHJlamVjdGVkKSB7XG4gICAgICAgIC8vIFRPRE86IHRoaXMgaXMgZGFuZ2Vyb3VzIGluIHRoZSBjYXNlIHdoZXJlIGEgbm9uLXJlamVjdGVkIG0tbGluZVxuICAgICAgICAvLyAgICAgYmVjb21lcyByZWplY3RlZC5cbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdID0ge1xuICAgICAgICAgIG1pZDogbWlkLFxuICAgICAgICAgIGtpbmQ6IGtpbmQsXG4gICAgICAgICAgcmVqZWN0ZWQ6IHRydWVcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXJlamVjdGVkICYmIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XSAmJlxuICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5yZWplY3RlZCkge1xuICAgICAgICAvLyByZWN5Y2xlIGEgcmVqZWN0ZWQgdHJhbnNjZWl2ZXIuXG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XSA9IHBjLl9jcmVhdGVUcmFuc2NlaXZlcihraW5kLCB0cnVlKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHRyYW5zY2VpdmVyO1xuICAgICAgdmFyIGljZUdhdGhlcmVyO1xuICAgICAgdmFyIGljZVRyYW5zcG9ydDtcbiAgICAgIHZhciBkdGxzVHJhbnNwb3J0O1xuICAgICAgdmFyIHJ0cFJlY2VpdmVyO1xuICAgICAgdmFyIHNlbmRFbmNvZGluZ1BhcmFtZXRlcnM7XG4gICAgICB2YXIgcmVjdkVuY29kaW5nUGFyYW1ldGVycztcbiAgICAgIHZhciBsb2NhbENhcGFiaWxpdGllcztcblxuICAgICAgdmFyIHRyYWNrO1xuICAgICAgLy8gRklYTUU6IGVuc3VyZSB0aGUgbWVkaWFTZWN0aW9uIGhhcyBydGNwLW11eCBzZXQuXG4gICAgICB2YXIgcmVtb3RlQ2FwYWJpbGl0aWVzID0gU0RQVXRpbHMucGFyc2VSdHBQYXJhbWV0ZXJzKG1lZGlhU2VjdGlvbik7XG4gICAgICB2YXIgcmVtb3RlSWNlUGFyYW1ldGVycztcbiAgICAgIHZhciByZW1vdGVEdGxzUGFyYW1ldGVycztcbiAgICAgIGlmICghcmVqZWN0ZWQpIHtcbiAgICAgICAgcmVtb3RlSWNlUGFyYW1ldGVycyA9IFNEUFV0aWxzLmdldEljZVBhcmFtZXRlcnMobWVkaWFTZWN0aW9uLFxuICAgICAgICAgICAgc2Vzc2lvbnBhcnQpO1xuICAgICAgICByZW1vdGVEdGxzUGFyYW1ldGVycyA9IFNEUFV0aWxzLmdldER0bHNQYXJhbWV0ZXJzKG1lZGlhU2VjdGlvbixcbiAgICAgICAgICAgIHNlc3Npb25wYXJ0KTtcbiAgICAgICAgcmVtb3RlRHRsc1BhcmFtZXRlcnMucm9sZSA9ICdjbGllbnQnO1xuICAgICAgfVxuICAgICAgcmVjdkVuY29kaW5nUGFyYW1ldGVycyA9XG4gICAgICAgICAgU0RQVXRpbHMucGFyc2VSdHBFbmNvZGluZ1BhcmFtZXRlcnMobWVkaWFTZWN0aW9uKTtcblxuICAgICAgdmFyIHJ0Y3BQYXJhbWV0ZXJzID0gU0RQVXRpbHMucGFyc2VSdGNwUGFyYW1ldGVycyhtZWRpYVNlY3Rpb24pO1xuXG4gICAgICB2YXIgaXNDb21wbGV0ZSA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbixcbiAgICAgICAgICAnYT1lbmQtb2YtY2FuZGlkYXRlcycsIHNlc3Npb25wYXJ0KS5sZW5ndGggPiAwO1xuICAgICAgdmFyIGNhbmRzID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1jYW5kaWRhdGU6JylcbiAgICAgICAgICAubWFwKGZ1bmN0aW9uKGNhbmQpIHtcbiAgICAgICAgICAgIHJldHVybiBTRFBVdGlscy5wYXJzZUNhbmRpZGF0ZShjYW5kKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24oY2FuZCkge1xuICAgICAgICAgICAgcmV0dXJuIGNhbmQuY29tcG9uZW50ID09PSAxO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAvLyBDaGVjayBpZiB3ZSBjYW4gdXNlIEJVTkRMRSBhbmQgZGlzcG9zZSB0cmFuc3BvcnRzLlxuICAgICAgaWYgKChkZXNjcmlwdGlvbi50eXBlID09PSAnb2ZmZXInIHx8IGRlc2NyaXB0aW9uLnR5cGUgPT09ICdhbnN3ZXInKSAmJlxuICAgICAgICAgICFyZWplY3RlZCAmJiB1c2luZ0J1bmRsZSAmJiBzZHBNTGluZUluZGV4ID4gMCAmJlxuICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XSkge1xuICAgICAgICBwYy5fZGlzcG9zZUljZUFuZER0bHNUcmFuc3BvcnRzKHNkcE1MaW5lSW5kZXgpO1xuICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uaWNlR2F0aGVyZXIgPVxuICAgICAgICAgICAgcGMudHJhbnNjZWl2ZXJzWzBdLmljZUdhdGhlcmVyO1xuICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uaWNlVHJhbnNwb3J0ID1cbiAgICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1swXS5pY2VUcmFuc3BvcnQ7XG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5kdGxzVHJhbnNwb3J0ID1cbiAgICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1swXS5kdGxzVHJhbnNwb3J0O1xuICAgICAgICBpZiAocGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLnJ0cFNlbmRlcikge1xuICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5ydHBTZW5kZXIuc2V0VHJhbnNwb3J0KFxuICAgICAgICAgICAgICBwYy50cmFuc2NlaXZlcnNbMF0uZHRsc1RyYW5zcG9ydCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5ydHBSZWNlaXZlcikge1xuICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5ydHBSZWNlaXZlci5zZXRUcmFuc3BvcnQoXG4gICAgICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1swXS5kdGxzVHJhbnNwb3J0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGRlc2NyaXB0aW9uLnR5cGUgPT09ICdvZmZlcicgJiYgIXJlamVjdGVkKSB7XG4gICAgICAgIHRyYW5zY2VpdmVyID0gcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdIHx8XG4gICAgICAgICAgICBwYy5fY3JlYXRlVHJhbnNjZWl2ZXIoa2luZCk7XG4gICAgICAgIHRyYW5zY2VpdmVyLm1pZCA9IG1pZDtcblxuICAgICAgICBpZiAoIXRyYW5zY2VpdmVyLmljZUdhdGhlcmVyKSB7XG4gICAgICAgICAgdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIgPSBwYy5fY3JlYXRlSWNlR2F0aGVyZXIoc2RwTUxpbmVJbmRleCxcbiAgICAgICAgICAgICAgdXNpbmdCdW5kbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNhbmRzLmxlbmd0aCAmJiB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQuc3RhdGUgPT09ICduZXcnKSB7XG4gICAgICAgICAgaWYgKGlzQ29tcGxldGUgJiYgKCF1c2luZ0J1bmRsZSB8fCBzZHBNTGluZUluZGV4ID09PSAwKSkge1xuICAgICAgICAgICAgdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LnNldFJlbW90ZUNhbmRpZGF0ZXMoY2FuZHMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYW5kcy5mb3JFYWNoKGZ1bmN0aW9uKGNhbmRpZGF0ZSkge1xuICAgICAgICAgICAgICBtYXliZUFkZENhbmRpZGF0ZSh0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQsIGNhbmRpZGF0ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsb2NhbENhcGFiaWxpdGllcyA9IHdpbmRvdy5SVENSdHBSZWNlaXZlci5nZXRDYXBhYmlsaXRpZXMoa2luZCk7XG5cbiAgICAgICAgLy8gZmlsdGVyIFJUWCB1bnRpbCBhZGRpdGlvbmFsIHN0dWZmIG5lZWRlZCBmb3IgUlRYIGlzIGltcGxlbWVudGVkXG4gICAgICAgIC8vIGluIGFkYXB0ZXIuanNcbiAgICAgICAgaWYgKGVkZ2VWZXJzaW9uIDwgMTUwMTkpIHtcbiAgICAgICAgICBsb2NhbENhcGFiaWxpdGllcy5jb2RlY3MgPSBsb2NhbENhcGFiaWxpdGllcy5jb2RlY3MuZmlsdGVyKFxuICAgICAgICAgICAgICBmdW5jdGlvbihjb2RlYykge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb2RlYy5uYW1lICE9PSAncnR4JztcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzID0gdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVycyB8fCBbe1xuICAgICAgICAgIHNzcmM6ICgyICogc2RwTUxpbmVJbmRleCArIDIpICogMTAwMVxuICAgICAgICB9XTtcblxuICAgICAgICAvLyBUT0RPOiByZXdyaXRlIHRvIHVzZSBodHRwOi8vdzNjLmdpdGh1Yi5pby93ZWJydGMtcGMvI3NldC1hc3NvY2lhdGVkLXJlbW90ZS1zdHJlYW1zXG4gICAgICAgIHZhciBpc05ld1RyYWNrID0gZmFsc2U7XG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdzZW5kcmVjdicgfHwgZGlyZWN0aW9uID09PSAnc2VuZG9ubHknKSB7XG4gICAgICAgICAgaXNOZXdUcmFjayA9ICF0cmFuc2NlaXZlci5ydHBSZWNlaXZlcjtcbiAgICAgICAgICBydHBSZWNlaXZlciA9IHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyIHx8XG4gICAgICAgICAgICAgIG5ldyB3aW5kb3cuUlRDUnRwUmVjZWl2ZXIodHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydCwga2luZCk7XG5cbiAgICAgICAgICBpZiAoaXNOZXdUcmFjaykge1xuICAgICAgICAgICAgdmFyIHN0cmVhbTtcbiAgICAgICAgICAgIHRyYWNrID0gcnRwUmVjZWl2ZXIudHJhY2s7XG4gICAgICAgICAgICAvLyBGSVhNRTogZG9lcyBub3Qgd29yayB3aXRoIFBsYW4gQi5cbiAgICAgICAgICAgIGlmIChyZW1vdGVNc2lkICYmIHJlbW90ZU1zaWQuc3RyZWFtID09PSAnLScpIHtcbiAgICAgICAgICAgICAgLy8gbm8tb3AuIGEgc3RyZWFtIGlkIG9mICctJyBtZWFuczogbm8gYXNzb2NpYXRlZCBzdHJlYW0uXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJlbW90ZU1zaWQpIHtcbiAgICAgICAgICAgICAgaWYgKCFzdHJlYW1zW3JlbW90ZU1zaWQuc3RyZWFtXSkge1xuICAgICAgICAgICAgICAgIHN0cmVhbXNbcmVtb3RlTXNpZC5zdHJlYW1dID0gbmV3IHdpbmRvdy5NZWRpYVN0cmVhbSgpO1xuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzdHJlYW1zW3JlbW90ZU1zaWQuc3RyZWFtXSwgJ2lkJywge1xuICAgICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlbW90ZU1zaWQuc3RyZWFtO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0cmFjaywgJ2lkJywge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gcmVtb3RlTXNpZC50cmFjaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBzdHJlYW0gPSBzdHJlYW1zW3JlbW90ZU1zaWQuc3RyZWFtXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmICghc3RyZWFtcy5kZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgc3RyZWFtcy5kZWZhdWx0ID0gbmV3IHdpbmRvdy5NZWRpYVN0cmVhbSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHN0cmVhbSA9IHN0cmVhbXMuZGVmYXVsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzdHJlYW0pIHtcbiAgICAgICAgICAgICAgYWRkVHJhY2tUb1N0cmVhbUFuZEZpcmVFdmVudCh0cmFjaywgc3RyZWFtKTtcbiAgICAgICAgICAgICAgdHJhbnNjZWl2ZXIuYXNzb2NpYXRlZFJlbW90ZU1lZGlhU3RyZWFtcy5wdXNoKHN0cmVhbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZWNlaXZlckxpc3QucHVzaChbdHJhY2ssIHJ0cFJlY2VpdmVyLCBzdHJlYW1dKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIgJiYgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIudHJhY2spIHtcbiAgICAgICAgICB0cmFuc2NlaXZlci5hc3NvY2lhdGVkUmVtb3RlTWVkaWFTdHJlYW1zLmZvckVhY2goZnVuY3Rpb24ocykge1xuICAgICAgICAgICAgdmFyIG5hdGl2ZVRyYWNrID0gcy5nZXRUcmFja3MoKS5maW5kKGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHQuaWQgPT09IHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyLnRyYWNrLmlkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAobmF0aXZlVHJhY2spIHtcbiAgICAgICAgICAgICAgcmVtb3ZlVHJhY2tGcm9tU3RyZWFtQW5kRmlyZUV2ZW50KG5hdGl2ZVRyYWNrLCBzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0cmFuc2NlaXZlci5hc3NvY2lhdGVkUmVtb3RlTWVkaWFTdHJlYW1zID0gW107XG4gICAgICAgIH1cblxuICAgICAgICB0cmFuc2NlaXZlci5sb2NhbENhcGFiaWxpdGllcyA9IGxvY2FsQ2FwYWJpbGl0aWVzO1xuICAgICAgICB0cmFuc2NlaXZlci5yZW1vdGVDYXBhYmlsaXRpZXMgPSByZW1vdGVDYXBhYmlsaXRpZXM7XG4gICAgICAgIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyID0gcnRwUmVjZWl2ZXI7XG4gICAgICAgIHRyYW5zY2VpdmVyLnJ0Y3BQYXJhbWV0ZXJzID0gcnRjcFBhcmFtZXRlcnM7XG4gICAgICAgIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnMgPSBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzO1xuICAgICAgICB0cmFuc2NlaXZlci5yZWN2RW5jb2RpbmdQYXJhbWV0ZXJzID0gcmVjdkVuY29kaW5nUGFyYW1ldGVycztcblxuICAgICAgICAvLyBTdGFydCB0aGUgUlRDUnRwUmVjZWl2ZXIgbm93LiBUaGUgUlRQU2VuZGVyIGlzIHN0YXJ0ZWQgaW5cbiAgICAgICAgLy8gc2V0TG9jYWxEZXNjcmlwdGlvbi5cbiAgICAgICAgcGMuX3RyYW5zY2VpdmUocGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLFxuICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICBpc05ld1RyYWNrKTtcbiAgICAgIH0gZWxzZSBpZiAoZGVzY3JpcHRpb24udHlwZSA9PT0gJ2Fuc3dlcicgJiYgIXJlamVjdGVkKSB7XG4gICAgICAgIHRyYW5zY2VpdmVyID0gcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdO1xuICAgICAgICBpY2VHYXRoZXJlciA9IHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyO1xuICAgICAgICBpY2VUcmFuc3BvcnQgPSB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQ7XG4gICAgICAgIGR0bHNUcmFuc3BvcnQgPSB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0O1xuICAgICAgICBydHBSZWNlaXZlciA9IHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyO1xuICAgICAgICBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzID0gdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVycztcbiAgICAgICAgbG9jYWxDYXBhYmlsaXRpZXMgPSB0cmFuc2NlaXZlci5sb2NhbENhcGFiaWxpdGllcztcblxuICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0ucmVjdkVuY29kaW5nUGFyYW1ldGVycyA9XG4gICAgICAgICAgICByZWN2RW5jb2RpbmdQYXJhbWV0ZXJzO1xuICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0ucmVtb3RlQ2FwYWJpbGl0aWVzID1cbiAgICAgICAgICAgIHJlbW90ZUNhcGFiaWxpdGllcztcbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLnJ0Y3BQYXJhbWV0ZXJzID0gcnRjcFBhcmFtZXRlcnM7XG5cbiAgICAgICAgaWYgKGNhbmRzLmxlbmd0aCAmJiBpY2VUcmFuc3BvcnQuc3RhdGUgPT09ICduZXcnKSB7XG4gICAgICAgICAgaWYgKChpc0ljZUxpdGUgfHwgaXNDb21wbGV0ZSkgJiZcbiAgICAgICAgICAgICAgKCF1c2luZ0J1bmRsZSB8fCBzZHBNTGluZUluZGV4ID09PSAwKSkge1xuICAgICAgICAgICAgaWNlVHJhbnNwb3J0LnNldFJlbW90ZUNhbmRpZGF0ZXMoY2FuZHMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYW5kcy5mb3JFYWNoKGZ1bmN0aW9uKGNhbmRpZGF0ZSkge1xuICAgICAgICAgICAgICBtYXliZUFkZENhbmRpZGF0ZSh0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQsIGNhbmRpZGF0ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXVzaW5nQnVuZGxlIHx8IHNkcE1MaW5lSW5kZXggPT09IDApIHtcbiAgICAgICAgICBpZiAoaWNlVHJhbnNwb3J0LnN0YXRlID09PSAnbmV3Jykge1xuICAgICAgICAgICAgaWNlVHJhbnNwb3J0LnN0YXJ0KGljZUdhdGhlcmVyLCByZW1vdGVJY2VQYXJhbWV0ZXJzLFxuICAgICAgICAgICAgICAgICdjb250cm9sbGluZycpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZHRsc1RyYW5zcG9ydC5zdGF0ZSA9PT0gJ25ldycpIHtcbiAgICAgICAgICAgIGR0bHNUcmFuc3BvcnQuc3RhcnQocmVtb3RlRHRsc1BhcmFtZXRlcnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHBjLl90cmFuc2NlaXZlKHRyYW5zY2VpdmVyLFxuICAgICAgICAgICAgZGlyZWN0aW9uID09PSAnc2VuZHJlY3YnIHx8IGRpcmVjdGlvbiA9PT0gJ3JlY3Zvbmx5JyxcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9PT0gJ3NlbmRyZWN2JyB8fCBkaXJlY3Rpb24gPT09ICdzZW5kb25seScpO1xuXG4gICAgICAgIC8vIFRPRE86IHJld3JpdGUgdG8gdXNlIGh0dHA6Ly93M2MuZ2l0aHViLmlvL3dlYnJ0Yy1wYy8jc2V0LWFzc29jaWF0ZWQtcmVtb3RlLXN0cmVhbXNcbiAgICAgICAgaWYgKHJ0cFJlY2VpdmVyICYmXG4gICAgICAgICAgICAoZGlyZWN0aW9uID09PSAnc2VuZHJlY3YnIHx8IGRpcmVjdGlvbiA9PT0gJ3NlbmRvbmx5JykpIHtcbiAgICAgICAgICB0cmFjayA9IHJ0cFJlY2VpdmVyLnRyYWNrO1xuICAgICAgICAgIGlmIChyZW1vdGVNc2lkKSB7XG4gICAgICAgICAgICBpZiAoIXN0cmVhbXNbcmVtb3RlTXNpZC5zdHJlYW1dKSB7XG4gICAgICAgICAgICAgIHN0cmVhbXNbcmVtb3RlTXNpZC5zdHJlYW1dID0gbmV3IHdpbmRvdy5NZWRpYVN0cmVhbSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWRkVHJhY2tUb1N0cmVhbUFuZEZpcmVFdmVudCh0cmFjaywgc3RyZWFtc1tyZW1vdGVNc2lkLnN0cmVhbV0pO1xuICAgICAgICAgICAgcmVjZWl2ZXJMaXN0LnB1c2goW3RyYWNrLCBydHBSZWNlaXZlciwgc3RyZWFtc1tyZW1vdGVNc2lkLnN0cmVhbV1dKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFzdHJlYW1zLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICAgc3RyZWFtcy5kZWZhdWx0ID0gbmV3IHdpbmRvdy5NZWRpYVN0cmVhbSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWRkVHJhY2tUb1N0cmVhbUFuZEZpcmVFdmVudCh0cmFjaywgc3RyZWFtcy5kZWZhdWx0KTtcbiAgICAgICAgICAgIHJlY2VpdmVyTGlzdC5wdXNoKFt0cmFjaywgcnRwUmVjZWl2ZXIsIHN0cmVhbXMuZGVmYXVsdF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBGSVhNRTogYWN0dWFsbHkgdGhlIHJlY2VpdmVyIHNob3VsZCBiZSBjcmVhdGVkIGxhdGVyLlxuICAgICAgICAgIGRlbGV0ZSB0cmFuc2NlaXZlci5ydHBSZWNlaXZlcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHBjLl9kdGxzUm9sZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBwYy5fZHRsc1JvbGUgPSBkZXNjcmlwdGlvbi50eXBlID09PSAnb2ZmZXInID8gJ2FjdGl2ZScgOiAncGFzc2l2ZSc7XG4gICAgfVxuXG4gICAgcGMucmVtb3RlRGVzY3JpcHRpb24gPSB7XG4gICAgICB0eXBlOiBkZXNjcmlwdGlvbi50eXBlLFxuICAgICAgc2RwOiBkZXNjcmlwdGlvbi5zZHBcbiAgICB9O1xuICAgIGlmIChkZXNjcmlwdGlvbi50eXBlID09PSAnb2ZmZXInKSB7XG4gICAgICBwYy5fdXBkYXRlU2lnbmFsaW5nU3RhdGUoJ2hhdmUtcmVtb3RlLW9mZmVyJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBjLl91cGRhdGVTaWduYWxpbmdTdGF0ZSgnc3RhYmxlJyk7XG4gICAgfVxuICAgIE9iamVjdC5rZXlzKHN0cmVhbXMpLmZvckVhY2goZnVuY3Rpb24oc2lkKSB7XG4gICAgICB2YXIgc3RyZWFtID0gc3RyZWFtc1tzaWRdO1xuICAgICAgaWYgKHN0cmVhbS5nZXRUcmFja3MoKS5sZW5ndGgpIHtcbiAgICAgICAgaWYgKHBjLnJlbW90ZVN0cmVhbXMuaW5kZXhPZihzdHJlYW0pID09PSAtMSkge1xuICAgICAgICAgIHBjLnJlbW90ZVN0cmVhbXMucHVzaChzdHJlYW0pO1xuICAgICAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgnYWRkc3RyZWFtJyk7XG4gICAgICAgICAgZXZlbnQuc3RyZWFtID0gc3RyZWFtO1xuICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcGMuX2Rpc3BhdGNoRXZlbnQoJ2FkZHN0cmVhbScsIGV2ZW50KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlY2VpdmVyTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICB2YXIgdHJhY2sgPSBpdGVtWzBdO1xuICAgICAgICAgIHZhciByZWNlaXZlciA9IGl0ZW1bMV07XG4gICAgICAgICAgaWYgKHN0cmVhbS5pZCAhPT0gaXRlbVsyXS5pZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBmaXJlQWRkVHJhY2socGMsIHRyYWNrLCByZWNlaXZlciwgW3N0cmVhbV0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZWNlaXZlckxpc3QuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBmaXJlQWRkVHJhY2socGMsIGl0ZW1bMF0sIGl0ZW1bMV0sIFtdKTtcbiAgICB9KTtcblxuICAgIC8vIGNoZWNrIHdoZXRoZXIgYWRkSWNlQ2FuZGlkYXRlKHt9KSB3YXMgY2FsbGVkIHdpdGhpbiBmb3VyIHNlY29uZHMgYWZ0ZXJcbiAgICAvLyBzZXRSZW1vdGVEZXNjcmlwdGlvbi5cbiAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIGlmICghKHBjICYmIHBjLnRyYW5zY2VpdmVycykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgcGMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcbiAgICAgICAgaWYgKHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydCAmJlxuICAgICAgICAgICAgdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LnN0YXRlID09PSAnbmV3JyAmJlxuICAgICAgICAgICAgdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LmdldFJlbW90ZUNhbmRpZGF0ZXMoKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdUaW1lb3V0IGZvciBhZGRSZW1vdGVDYW5kaWRhdGUuIENvbnNpZGVyIHNlbmRpbmcgJyArXG4gICAgICAgICAgICAgICdhbiBlbmQtb2YtY2FuZGlkYXRlcyBub3RpZmljYXRpb24nKTtcbiAgICAgICAgICB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQuYWRkUmVtb3RlQ2FuZGlkYXRlKHt9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgNDAwMCk7XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xuICAgICAgLyogbm90IHlldFxuICAgICAgaWYgKHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyKSB7XG4gICAgICAgIHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyLmNsb3NlKCk7XG4gICAgICB9XG4gICAgICAqL1xuICAgICAgaWYgKHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydCkge1xuICAgICAgICB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQuc3RvcCgpO1xuICAgICAgfVxuICAgICAgaWYgKHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQpIHtcbiAgICAgICAgdHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydC5zdG9wKCk7XG4gICAgICB9XG4gICAgICBpZiAodHJhbnNjZWl2ZXIucnRwU2VuZGVyKSB7XG4gICAgICAgIHRyYW5zY2VpdmVyLnJ0cFNlbmRlci5zdG9wKCk7XG4gICAgICB9XG4gICAgICBpZiAodHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIpIHtcbiAgICAgICAgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIuc3RvcCgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIC8vIEZJWE1FOiBjbGVhbiB1cCB0cmFja3MsIGxvY2FsIHN0cmVhbXMsIHJlbW90ZSBzdHJlYW1zLCBldGNcbiAgICB0aGlzLl9pc0Nsb3NlZCA9IHRydWU7XG4gICAgdGhpcy5fdXBkYXRlU2lnbmFsaW5nU3RhdGUoJ2Nsb3NlZCcpO1xuICB9O1xuXG4gIC8vIFVwZGF0ZSB0aGUgc2lnbmFsaW5nIHN0YXRlLlxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX3VwZGF0ZVNpZ25hbGluZ1N0YXRlID0gZnVuY3Rpb24obmV3U3RhdGUpIHtcbiAgICB0aGlzLnNpZ25hbGluZ1N0YXRlID0gbmV3U3RhdGU7XG4gICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdzaWduYWxpbmdzdGF0ZWNoYW5nZScpO1xuICAgIHRoaXMuX2Rpc3BhdGNoRXZlbnQoJ3NpZ25hbGluZ3N0YXRlY2hhbmdlJywgZXZlbnQpO1xuICB9O1xuXG4gIC8vIERldGVybWluZSB3aGV0aGVyIHRvIGZpcmUgdGhlIG5lZ290aWF0aW9ubmVlZGVkIGV2ZW50LlxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX21heWJlRmlyZU5lZ290aWF0aW9uTmVlZGVkID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHBjID0gdGhpcztcbiAgICBpZiAodGhpcy5zaWduYWxpbmdTdGF0ZSAhPT0gJ3N0YWJsZScgfHwgdGhpcy5uZWVkTmVnb3RpYXRpb24gPT09IHRydWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5uZWVkTmVnb3RpYXRpb24gPSB0cnVlO1xuICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHBjLm5lZWROZWdvdGlhdGlvbikge1xuICAgICAgICBwYy5uZWVkTmVnb3RpYXRpb24gPSBmYWxzZTtcbiAgICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCduZWdvdGlhdGlvbm5lZWRlZCcpO1xuICAgICAgICBwYy5fZGlzcGF0Y2hFdmVudCgnbmVnb3RpYXRpb25uZWVkZWQnLCBldmVudCk7XG4gICAgICB9XG4gICAgfSwgMCk7XG4gIH07XG5cbiAgLy8gVXBkYXRlIHRoZSBpY2UgY29ubmVjdGlvbiBzdGF0ZS5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl91cGRhdGVJY2VDb25uZWN0aW9uU3RhdGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgbmV3U3RhdGU7XG4gICAgdmFyIHN0YXRlcyA9IHtcbiAgICAgICduZXcnOiAwLFxuICAgICAgY2xvc2VkOiAwLFxuICAgICAgY2hlY2tpbmc6IDAsXG4gICAgICBjb25uZWN0ZWQ6IDAsXG4gICAgICBjb21wbGV0ZWQ6IDAsXG4gICAgICBkaXNjb25uZWN0ZWQ6IDAsXG4gICAgICBmYWlsZWQ6IDBcbiAgICB9O1xuICAgIHRoaXMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcbiAgICAgIHN0YXRlc1t0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQuc3RhdGVdKys7XG4gICAgfSk7XG5cbiAgICBuZXdTdGF0ZSA9ICduZXcnO1xuICAgIGlmIChzdGF0ZXMuZmFpbGVkID4gMCkge1xuICAgICAgbmV3U3RhdGUgPSAnZmFpbGVkJztcbiAgICB9IGVsc2UgaWYgKHN0YXRlcy5jaGVja2luZyA+IDApIHtcbiAgICAgIG5ld1N0YXRlID0gJ2NoZWNraW5nJztcbiAgICB9IGVsc2UgaWYgKHN0YXRlcy5kaXNjb25uZWN0ZWQgPiAwKSB7XG4gICAgICBuZXdTdGF0ZSA9ICdkaXNjb25uZWN0ZWQnO1xuICAgIH0gZWxzZSBpZiAoc3RhdGVzLm5ldyA+IDApIHtcbiAgICAgIG5ld1N0YXRlID0gJ25ldyc7XG4gICAgfSBlbHNlIGlmIChzdGF0ZXMuY29ubmVjdGVkID4gMCkge1xuICAgICAgbmV3U3RhdGUgPSAnY29ubmVjdGVkJztcbiAgICB9IGVsc2UgaWYgKHN0YXRlcy5jb21wbGV0ZWQgPiAwKSB7XG4gICAgICBuZXdTdGF0ZSA9ICdjb21wbGV0ZWQnO1xuICAgIH1cblxuICAgIGlmIChuZXdTdGF0ZSAhPT0gdGhpcy5pY2VDb25uZWN0aW9uU3RhdGUpIHtcbiAgICAgIHRoaXMuaWNlQ29ubmVjdGlvblN0YXRlID0gbmV3U3RhdGU7XG4gICAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ2ljZWNvbm5lY3Rpb25zdGF0ZWNoYW5nZScpO1xuICAgICAgdGhpcy5fZGlzcGF0Y2hFdmVudCgnaWNlY29ubmVjdGlvbnN0YXRlY2hhbmdlJywgZXZlbnQpO1xuICAgIH1cbiAgfTtcblxuICAvLyBVcGRhdGUgdGhlIGNvbm5lY3Rpb24gc3RhdGUuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fdXBkYXRlQ29ubmVjdGlvblN0YXRlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG5ld1N0YXRlO1xuICAgIHZhciBzdGF0ZXMgPSB7XG4gICAgICAnbmV3JzogMCxcbiAgICAgIGNsb3NlZDogMCxcbiAgICAgIGNvbm5lY3Rpbmc6IDAsXG4gICAgICBjb25uZWN0ZWQ6IDAsXG4gICAgICBjb21wbGV0ZWQ6IDAsXG4gICAgICBkaXNjb25uZWN0ZWQ6IDAsXG4gICAgICBmYWlsZWQ6IDBcbiAgICB9O1xuICAgIHRoaXMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcbiAgICAgIHN0YXRlc1t0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQuc3RhdGVdKys7XG4gICAgICBzdGF0ZXNbdHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydC5zdGF0ZV0rKztcbiAgICB9KTtcbiAgICAvLyBJQ0VUcmFuc3BvcnQuY29tcGxldGVkIGFuZCBjb25uZWN0ZWQgYXJlIHRoZSBzYW1lIGZvciB0aGlzIHB1cnBvc2UuXG4gICAgc3RhdGVzLmNvbm5lY3RlZCArPSBzdGF0ZXMuY29tcGxldGVkO1xuXG4gICAgbmV3U3RhdGUgPSAnbmV3JztcbiAgICBpZiAoc3RhdGVzLmZhaWxlZCA+IDApIHtcbiAgICAgIG5ld1N0YXRlID0gJ2ZhaWxlZCc7XG4gICAgfSBlbHNlIGlmIChzdGF0ZXMuY29ubmVjdGluZyA+IDApIHtcbiAgICAgIG5ld1N0YXRlID0gJ2Nvbm5lY3RpbmcnO1xuICAgIH0gZWxzZSBpZiAoc3RhdGVzLmRpc2Nvbm5lY3RlZCA+IDApIHtcbiAgICAgIG5ld1N0YXRlID0gJ2Rpc2Nvbm5lY3RlZCc7XG4gICAgfSBlbHNlIGlmIChzdGF0ZXMubmV3ID4gMCkge1xuICAgICAgbmV3U3RhdGUgPSAnbmV3JztcbiAgICB9IGVsc2UgaWYgKHN0YXRlcy5jb25uZWN0ZWQgPiAwKSB7XG4gICAgICBuZXdTdGF0ZSA9ICdjb25uZWN0ZWQnO1xuICAgIH1cblxuICAgIGlmIChuZXdTdGF0ZSAhPT0gdGhpcy5jb25uZWN0aW9uU3RhdGUpIHtcbiAgICAgIHRoaXMuY29ubmVjdGlvblN0YXRlID0gbmV3U3RhdGU7XG4gICAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ2Nvbm5lY3Rpb25zdGF0ZWNoYW5nZScpO1xuICAgICAgdGhpcy5fZGlzcGF0Y2hFdmVudCgnY29ubmVjdGlvbnN0YXRlY2hhbmdlJywgZXZlbnQpO1xuICAgIH1cbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlT2ZmZXIgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcGMgPSB0aGlzO1xuXG4gICAgaWYgKHBjLl9pc0Nsb3NlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG1ha2VFcnJvcignSW52YWxpZFN0YXRlRXJyb3InLFxuICAgICAgICAgICdDYW4gbm90IGNhbGwgY3JlYXRlT2ZmZXIgYWZ0ZXIgY2xvc2UnKSk7XG4gICAgfVxuXG4gICAgdmFyIG51bUF1ZGlvVHJhY2tzID0gcGMudHJhbnNjZWl2ZXJzLmZpbHRlcihmdW5jdGlvbih0KSB7XG4gICAgICByZXR1cm4gdC5raW5kID09PSAnYXVkaW8nO1xuICAgIH0pLmxlbmd0aDtcbiAgICB2YXIgbnVtVmlkZW9UcmFja3MgPSBwYy50cmFuc2NlaXZlcnMuZmlsdGVyKGZ1bmN0aW9uKHQpIHtcbiAgICAgIHJldHVybiB0LmtpbmQgPT09ICd2aWRlbyc7XG4gICAgfSkubGVuZ3RoO1xuXG4gICAgLy8gRGV0ZXJtaW5lIG51bWJlciBvZiBhdWRpbyBhbmQgdmlkZW8gdHJhY2tzIHdlIG5lZWQgdG8gc2VuZC9yZWN2LlxuICAgIHZhciBvZmZlck9wdGlvbnMgPSBhcmd1bWVudHNbMF07XG4gICAgaWYgKG9mZmVyT3B0aW9ucykge1xuICAgICAgLy8gUmVqZWN0IENocm9tZSBsZWdhY3kgY29uc3RyYWludHMuXG4gICAgICBpZiAob2ZmZXJPcHRpb25zLm1hbmRhdG9yeSB8fCBvZmZlck9wdGlvbnMub3B0aW9uYWwpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICAgICdMZWdhY3kgbWFuZGF0b3J5L29wdGlvbmFsIGNvbnN0cmFpbnRzIG5vdCBzdXBwb3J0ZWQuJyk7XG4gICAgICB9XG4gICAgICBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW8gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW8gPT09IHRydWUpIHtcbiAgICAgICAgICBudW1BdWRpb1RyYWNrcyA9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW8gPT09IGZhbHNlKSB7XG4gICAgICAgICAgbnVtQXVkaW9UcmFja3MgPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG51bUF1ZGlvVHJhY2tzID0gb2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW87XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVWaWRlbyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVWaWRlbyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIG51bVZpZGVvVHJhY2tzID0gMTtcbiAgICAgICAgfSBlbHNlIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVWaWRlbyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBudW1WaWRlb1RyYWNrcyA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbnVtVmlkZW9UcmFja3MgPSBvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVWaWRlbztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHBjLnRyYW5zY2VpdmVycy5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XG4gICAgICBpZiAodHJhbnNjZWl2ZXIua2luZCA9PT0gJ2F1ZGlvJykge1xuICAgICAgICBudW1BdWRpb1RyYWNrcy0tO1xuICAgICAgICBpZiAobnVtQXVkaW9UcmFja3MgPCAwKSB7XG4gICAgICAgICAgdHJhbnNjZWl2ZXIud2FudFJlY2VpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0cmFuc2NlaXZlci5raW5kID09PSAndmlkZW8nKSB7XG4gICAgICAgIG51bVZpZGVvVHJhY2tzLS07XG4gICAgICAgIGlmIChudW1WaWRlb1RyYWNrcyA8IDApIHtcbiAgICAgICAgICB0cmFuc2NlaXZlci53YW50UmVjZWl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBDcmVhdGUgTS1saW5lcyBmb3IgcmVjdm9ubHkgc3RyZWFtcy5cbiAgICB3aGlsZSAobnVtQXVkaW9UcmFja3MgPiAwIHx8IG51bVZpZGVvVHJhY2tzID4gMCkge1xuICAgICAgaWYgKG51bUF1ZGlvVHJhY2tzID4gMCkge1xuICAgICAgICBwYy5fY3JlYXRlVHJhbnNjZWl2ZXIoJ2F1ZGlvJyk7XG4gICAgICAgIG51bUF1ZGlvVHJhY2tzLS07XG4gICAgICB9XG4gICAgICBpZiAobnVtVmlkZW9UcmFja3MgPiAwKSB7XG4gICAgICAgIHBjLl9jcmVhdGVUcmFuc2NlaXZlcigndmlkZW8nKTtcbiAgICAgICAgbnVtVmlkZW9UcmFja3MtLTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgc2RwID0gU0RQVXRpbHMud3JpdGVTZXNzaW9uQm9pbGVycGxhdGUocGMuX3NkcFNlc3Npb25JZCxcbiAgICAgICAgcGMuX3NkcFNlc3Npb25WZXJzaW9uKyspO1xuICAgIHBjLnRyYW5zY2VpdmVycy5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zY2VpdmVyLCBzZHBNTGluZUluZGV4KSB7XG4gICAgICAvLyBGb3IgZWFjaCB0cmFjaywgY3JlYXRlIGFuIGljZSBnYXRoZXJlciwgaWNlIHRyYW5zcG9ydCxcbiAgICAgIC8vIGR0bHMgdHJhbnNwb3J0LCBwb3RlbnRpYWxseSBydHBzZW5kZXIgYW5kIHJ0cHJlY2VpdmVyLlxuICAgICAgdmFyIHRyYWNrID0gdHJhbnNjZWl2ZXIudHJhY2s7XG4gICAgICB2YXIga2luZCA9IHRyYW5zY2VpdmVyLmtpbmQ7XG4gICAgICB2YXIgbWlkID0gdHJhbnNjZWl2ZXIubWlkIHx8IFNEUFV0aWxzLmdlbmVyYXRlSWRlbnRpZmllcigpO1xuICAgICAgdHJhbnNjZWl2ZXIubWlkID0gbWlkO1xuXG4gICAgICBpZiAoIXRyYW5zY2VpdmVyLmljZUdhdGhlcmVyKSB7XG4gICAgICAgIHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyID0gcGMuX2NyZWF0ZUljZUdhdGhlcmVyKHNkcE1MaW5lSW5kZXgsXG4gICAgICAgICAgICBwYy51c2luZ0J1bmRsZSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBsb2NhbENhcGFiaWxpdGllcyA9IHdpbmRvdy5SVENSdHBTZW5kZXIuZ2V0Q2FwYWJpbGl0aWVzKGtpbmQpO1xuICAgICAgLy8gZmlsdGVyIFJUWCB1bnRpbCBhZGRpdGlvbmFsIHN0dWZmIG5lZWRlZCBmb3IgUlRYIGlzIGltcGxlbWVudGVkXG4gICAgICAvLyBpbiBhZGFwdGVyLmpzXG4gICAgICBpZiAoZWRnZVZlcnNpb24gPCAxNTAxOSkge1xuICAgICAgICBsb2NhbENhcGFiaWxpdGllcy5jb2RlY3MgPSBsb2NhbENhcGFiaWxpdGllcy5jb2RlY3MuZmlsdGVyKFxuICAgICAgICAgICAgZnVuY3Rpb24oY29kZWMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNvZGVjLm5hbWUgIT09ICdydHgnO1xuICAgICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBsb2NhbENhcGFiaWxpdGllcy5jb2RlY3MuZm9yRWFjaChmdW5jdGlvbihjb2RlYykge1xuICAgICAgICAvLyB3b3JrIGFyb3VuZCBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3Avd2VicnRjL2lzc3Vlcy9kZXRhaWw/aWQ9NjU1MlxuICAgICAgICAvLyBieSBhZGRpbmcgbGV2ZWwtYXN5bW1ldHJ5LWFsbG93ZWQ9MVxuICAgICAgICBpZiAoY29kZWMubmFtZSA9PT0gJ0gyNjQnICYmXG4gICAgICAgICAgICBjb2RlYy5wYXJhbWV0ZXJzWydsZXZlbC1hc3ltbWV0cnktYWxsb3dlZCddID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjb2RlYy5wYXJhbWV0ZXJzWydsZXZlbC1hc3ltbWV0cnktYWxsb3dlZCddID0gJzEnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZm9yIHN1YnNlcXVlbnQgb2ZmZXJzLCB3ZSBtaWdodCBoYXZlIHRvIHJlLXVzZSB0aGUgcGF5bG9hZFxuICAgICAgICAvLyB0eXBlIG9mIHRoZSBsYXN0IG9mZmVyLlxuICAgICAgICBpZiAodHJhbnNjZWl2ZXIucmVtb3RlQ2FwYWJpbGl0aWVzICYmXG4gICAgICAgICAgICB0cmFuc2NlaXZlci5yZW1vdGVDYXBhYmlsaXRpZXMuY29kZWNzKSB7XG4gICAgICAgICAgdHJhbnNjZWl2ZXIucmVtb3RlQ2FwYWJpbGl0aWVzLmNvZGVjcy5mb3JFYWNoKGZ1bmN0aW9uKHJlbW90ZUNvZGVjKSB7XG4gICAgICAgICAgICBpZiAoY29kZWMubmFtZS50b0xvd2VyQ2FzZSgpID09PSByZW1vdGVDb2RlYy5uYW1lLnRvTG93ZXJDYXNlKCkgJiZcbiAgICAgICAgICAgICAgICBjb2RlYy5jbG9ja1JhdGUgPT09IHJlbW90ZUNvZGVjLmNsb2NrUmF0ZSkge1xuICAgICAgICAgICAgICBjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZSA9IHJlbW90ZUNvZGVjLnBheWxvYWRUeXBlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGxvY2FsQ2FwYWJpbGl0aWVzLmhlYWRlckV4dGVuc2lvbnMuZm9yRWFjaChmdW5jdGlvbihoZHJFeHQpIHtcbiAgICAgICAgdmFyIHJlbW90ZUV4dGVuc2lvbnMgPSB0cmFuc2NlaXZlci5yZW1vdGVDYXBhYmlsaXRpZXMgJiZcbiAgICAgICAgICAgIHRyYW5zY2VpdmVyLnJlbW90ZUNhcGFiaWxpdGllcy5oZWFkZXJFeHRlbnNpb25zIHx8IFtdO1xuICAgICAgICByZW1vdGVFeHRlbnNpb25zLmZvckVhY2goZnVuY3Rpb24ockhkckV4dCkge1xuICAgICAgICAgIGlmIChoZHJFeHQudXJpID09PSBySGRyRXh0LnVyaSkge1xuICAgICAgICAgICAgaGRyRXh0LmlkID0gckhkckV4dC5pZDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIGdlbmVyYXRlIGFuIHNzcmMgbm93LCB0byBiZSB1c2VkIGxhdGVyIGluIHJ0cFNlbmRlci5zZW5kXG4gICAgICB2YXIgc2VuZEVuY29kaW5nUGFyYW1ldGVycyA9IHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnMgfHwgW3tcbiAgICAgICAgc3NyYzogKDIgKiBzZHBNTGluZUluZGV4ICsgMSkgKiAxMDAxXG4gICAgICB9XTtcbiAgICAgIGlmICh0cmFjaykge1xuICAgICAgICAvLyBhZGQgUlRYXG4gICAgICAgIGlmIChlZGdlVmVyc2lvbiA+PSAxNTAxOSAmJiBraW5kID09PSAndmlkZW8nICYmXG4gICAgICAgICAgICAhc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHgpIHtcbiAgICAgICAgICBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCA9IHtcbiAgICAgICAgICAgIHNzcmM6IHNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYyArIDFcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0cmFuc2NlaXZlci53YW50UmVjZWl2ZSkge1xuICAgICAgICB0cmFuc2NlaXZlci5ydHBSZWNlaXZlciA9IG5ldyB3aW5kb3cuUlRDUnRwUmVjZWl2ZXIoXG4gICAgICAgICAgICB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0LCBraW5kKTtcbiAgICAgIH1cblxuICAgICAgdHJhbnNjZWl2ZXIubG9jYWxDYXBhYmlsaXRpZXMgPSBsb2NhbENhcGFiaWxpdGllcztcbiAgICAgIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnMgPSBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzO1xuICAgIH0pO1xuXG4gICAgLy8gYWx3YXlzIG9mZmVyIEJVTkRMRSBhbmQgZGlzcG9zZSBvbiByZXR1cm4gaWYgbm90IHN1cHBvcnRlZC5cbiAgICBpZiAocGMuX2NvbmZpZy5idW5kbGVQb2xpY3kgIT09ICdtYXgtY29tcGF0Jykge1xuICAgICAgc2RwICs9ICdhPWdyb3VwOkJVTkRMRSAnICsgcGMudHJhbnNjZWl2ZXJzLm1hcChmdW5jdGlvbih0KSB7XG4gICAgICAgIHJldHVybiB0Lm1pZDtcbiAgICAgIH0pLmpvaW4oJyAnKSArICdcXHJcXG4nO1xuICAgIH1cbiAgICBzZHAgKz0gJ2E9aWNlLW9wdGlvbnM6dHJpY2tsZVxcclxcbic7XG5cbiAgICBwYy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlciwgc2RwTUxpbmVJbmRleCkge1xuICAgICAgc2RwICs9IHdyaXRlTWVkaWFTZWN0aW9uKHRyYW5zY2VpdmVyLCB0cmFuc2NlaXZlci5sb2NhbENhcGFiaWxpdGllcyxcbiAgICAgICAgICAnb2ZmZXInLCB0cmFuc2NlaXZlci5zdHJlYW0sIHBjLl9kdGxzUm9sZSk7XG4gICAgICBzZHAgKz0gJ2E9cnRjcC1yc2l6ZVxcclxcbic7XG5cbiAgICAgIGlmICh0cmFuc2NlaXZlci5pY2VHYXRoZXJlciAmJiBwYy5pY2VHYXRoZXJpbmdTdGF0ZSAhPT0gJ25ldycgJiZcbiAgICAgICAgICAoc2RwTUxpbmVJbmRleCA9PT0gMCB8fCAhcGMudXNpbmdCdW5kbGUpKSB7XG4gICAgICAgIHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyLmdldExvY2FsQ2FuZGlkYXRlcygpLmZvckVhY2goZnVuY3Rpb24oY2FuZCkge1xuICAgICAgICAgIGNhbmQuY29tcG9uZW50ID0gMTtcbiAgICAgICAgICBzZHAgKz0gJ2E9JyArIFNEUFV0aWxzLndyaXRlQ2FuZGlkYXRlKGNhbmQpICsgJ1xcclxcbic7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0cmFuc2NlaXZlci5pY2VHYXRoZXJlci5zdGF0ZSA9PT0gJ2NvbXBsZXRlZCcpIHtcbiAgICAgICAgICBzZHAgKz0gJ2E9ZW5kLW9mLWNhbmRpZGF0ZXNcXHJcXG4nO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB2YXIgZGVzYyA9IG5ldyB3aW5kb3cuUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKHtcbiAgICAgIHR5cGU6ICdvZmZlcicsXG4gICAgICBzZHA6IHNkcFxuICAgIH0pO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZGVzYyk7XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmNyZWF0ZUFuc3dlciA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBwYyA9IHRoaXM7XG5cbiAgICBpZiAocGMuX2lzQ2xvc2VkKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobWFrZUVycm9yKCdJbnZhbGlkU3RhdGVFcnJvcicsXG4gICAgICAgICAgJ0NhbiBub3QgY2FsbCBjcmVhdGVBbnN3ZXIgYWZ0ZXIgY2xvc2UnKSk7XG4gICAgfVxuXG4gICAgaWYgKCEocGMuc2lnbmFsaW5nU3RhdGUgPT09ICdoYXZlLXJlbW90ZS1vZmZlcicgfHxcbiAgICAgICAgcGMuc2lnbmFsaW5nU3RhdGUgPT09ICdoYXZlLWxvY2FsLXByYW5zd2VyJykpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChtYWtlRXJyb3IoJ0ludmFsaWRTdGF0ZUVycm9yJyxcbiAgICAgICAgICAnQ2FuIG5vdCBjYWxsIGNyZWF0ZUFuc3dlciBpbiBzaWduYWxpbmdTdGF0ZSAnICsgcGMuc2lnbmFsaW5nU3RhdGUpKTtcbiAgICB9XG5cbiAgICB2YXIgc2RwID0gU0RQVXRpbHMud3JpdGVTZXNzaW9uQm9pbGVycGxhdGUocGMuX3NkcFNlc3Npb25JZCxcbiAgICAgICAgcGMuX3NkcFNlc3Npb25WZXJzaW9uKyspO1xuICAgIGlmIChwYy51c2luZ0J1bmRsZSkge1xuICAgICAgc2RwICs9ICdhPWdyb3VwOkJVTkRMRSAnICsgcGMudHJhbnNjZWl2ZXJzLm1hcChmdW5jdGlvbih0KSB7XG4gICAgICAgIHJldHVybiB0Lm1pZDtcbiAgICAgIH0pLmpvaW4oJyAnKSArICdcXHJcXG4nO1xuICAgIH1cbiAgICB2YXIgbWVkaWFTZWN0aW9uc0luT2ZmZXIgPSBTRFBVdGlscy5nZXRNZWRpYVNlY3Rpb25zKFxuICAgICAgICBwYy5yZW1vdGVEZXNjcmlwdGlvbi5zZHApLmxlbmd0aDtcbiAgICBwYy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlciwgc2RwTUxpbmVJbmRleCkge1xuICAgICAgaWYgKHNkcE1MaW5lSW5kZXggKyAxID4gbWVkaWFTZWN0aW9uc0luT2ZmZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHRyYW5zY2VpdmVyLnJlamVjdGVkKSB7XG4gICAgICAgIGlmICh0cmFuc2NlaXZlci5raW5kID09PSAnYXBwbGljYXRpb24nKSB7XG4gICAgICAgICAgc2RwICs9ICdtPWFwcGxpY2F0aW9uIDAgRFRMUy9TQ1RQIDUwMDBcXHJcXG4nO1xuICAgICAgICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLmtpbmQgPT09ICdhdWRpbycpIHtcbiAgICAgICAgICBzZHAgKz0gJ209YXVkaW8gMCBVRFAvVExTL1JUUC9TQVZQRiAwXFxyXFxuJyArXG4gICAgICAgICAgICAgICdhPXJ0cG1hcDowIFBDTVUvODAwMFxcclxcbic7XG4gICAgICAgIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIua2luZCA9PT0gJ3ZpZGVvJykge1xuICAgICAgICAgIHNkcCArPSAnbT12aWRlbyAwIFVEUC9UTFMvUlRQL1NBVlBGIDEyMFxcclxcbicgK1xuICAgICAgICAgICAgICAnYT1ydHBtYXA6MTIwIFZQOC85MDAwMFxcclxcbic7XG4gICAgICAgIH1cbiAgICAgICAgc2RwICs9ICdjPUlOIElQNCAwLjAuMC4wXFxyXFxuJyArXG4gICAgICAgICAgICAnYT1pbmFjdGl2ZVxcclxcbicgK1xuICAgICAgICAgICAgJ2E9bWlkOicgKyB0cmFuc2NlaXZlci5taWQgKyAnXFxyXFxuJztcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBGSVhNRTogbG9vayBhdCBkaXJlY3Rpb24uXG4gICAgICBpZiAodHJhbnNjZWl2ZXIuc3RyZWFtKSB7XG4gICAgICAgIHZhciBsb2NhbFRyYWNrO1xuICAgICAgICBpZiAodHJhbnNjZWl2ZXIua2luZCA9PT0gJ2F1ZGlvJykge1xuICAgICAgICAgIGxvY2FsVHJhY2sgPSB0cmFuc2NlaXZlci5zdHJlYW0uZ2V0QXVkaW9UcmFja3MoKVswXTtcbiAgICAgICAgfSBlbHNlIGlmICh0cmFuc2NlaXZlci5raW5kID09PSAndmlkZW8nKSB7XG4gICAgICAgICAgbG9jYWxUcmFjayA9IHRyYW5zY2VpdmVyLnN0cmVhbS5nZXRWaWRlb1RyYWNrcygpWzBdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsb2NhbFRyYWNrKSB7XG4gICAgICAgICAgLy8gYWRkIFJUWFxuICAgICAgICAgIGlmIChlZGdlVmVyc2lvbiA+PSAxNTAxOSAmJiB0cmFuc2NlaXZlci5raW5kID09PSAndmlkZW8nICYmXG4gICAgICAgICAgICAgICF0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCkge1xuICAgICAgICAgICAgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHggPSB7XG4gICAgICAgICAgICAgIHNzcmM6IHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYyArIDFcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIENhbGN1bGF0ZSBpbnRlcnNlY3Rpb24gb2YgY2FwYWJpbGl0aWVzLlxuICAgICAgdmFyIGNvbW1vbkNhcGFiaWxpdGllcyA9IGdldENvbW1vbkNhcGFiaWxpdGllcyhcbiAgICAgICAgICB0cmFuc2NlaXZlci5sb2NhbENhcGFiaWxpdGllcyxcbiAgICAgICAgICB0cmFuc2NlaXZlci5yZW1vdGVDYXBhYmlsaXRpZXMpO1xuXG4gICAgICB2YXIgaGFzUnR4ID0gY29tbW9uQ2FwYWJpbGl0aWVzLmNvZGVjcy5maWx0ZXIoZnVuY3Rpb24oYykge1xuICAgICAgICByZXR1cm4gYy5uYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdydHgnO1xuICAgICAgfSkubGVuZ3RoO1xuICAgICAgaWYgKCFoYXNSdHggJiYgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHgpIHtcbiAgICAgICAgZGVsZXRlIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4O1xuICAgICAgfVxuXG4gICAgICBzZHAgKz0gd3JpdGVNZWRpYVNlY3Rpb24odHJhbnNjZWl2ZXIsIGNvbW1vbkNhcGFiaWxpdGllcyxcbiAgICAgICAgICAnYW5zd2VyJywgdHJhbnNjZWl2ZXIuc3RyZWFtLCBwYy5fZHRsc1JvbGUpO1xuICAgICAgaWYgKHRyYW5zY2VpdmVyLnJ0Y3BQYXJhbWV0ZXJzICYmXG4gICAgICAgICAgdHJhbnNjZWl2ZXIucnRjcFBhcmFtZXRlcnMucmVkdWNlZFNpemUpIHtcbiAgICAgICAgc2RwICs9ICdhPXJ0Y3AtcnNpemVcXHJcXG4nO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIGRlc2MgPSBuZXcgd2luZG93LlJUQ1Nlc3Npb25EZXNjcmlwdGlvbih7XG4gICAgICB0eXBlOiAnYW5zd2VyJyxcbiAgICAgIHNkcDogc2RwXG4gICAgfSk7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShkZXNjKTtcbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkSWNlQ2FuZGlkYXRlID0gZnVuY3Rpb24oY2FuZGlkYXRlKSB7XG4gICAgdmFyIHBjID0gdGhpcztcbiAgICB2YXIgc2VjdGlvbnM7XG4gICAgaWYgKGNhbmRpZGF0ZSAmJiAhKGNhbmRpZGF0ZS5zZHBNTGluZUluZGV4ICE9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgY2FuZGlkYXRlLnNkcE1pZCkpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgVHlwZUVycm9yKCdzZHBNTGluZUluZGV4IG9yIHNkcE1pZCByZXF1aXJlZCcpKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBuZWVkcyB0byBnbyBpbnRvIG9wcyBxdWV1ZS5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBpZiAoIXBjLnJlbW90ZURlc2NyaXB0aW9uKSB7XG4gICAgICAgIHJldHVybiByZWplY3QobWFrZUVycm9yKCdJbnZhbGlkU3RhdGVFcnJvcicsXG4gICAgICAgICAgICAnQ2FuIG5vdCBhZGQgSUNFIGNhbmRpZGF0ZSB3aXRob3V0IGEgcmVtb3RlIGRlc2NyaXB0aW9uJykpO1xuICAgICAgfSBlbHNlIGlmICghY2FuZGlkYXRlIHx8IGNhbmRpZGF0ZS5jYW5kaWRhdGUgPT09ICcnKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcGMudHJhbnNjZWl2ZXJzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgaWYgKHBjLnRyYW5zY2VpdmVyc1tqXS5yZWplY3RlZCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1tqXS5pY2VUcmFuc3BvcnQuYWRkUmVtb3RlQ2FuZGlkYXRlKHt9KTtcbiAgICAgICAgICBzZWN0aW9ucyA9IFNEUFV0aWxzLmdldE1lZGlhU2VjdGlvbnMocGMucmVtb3RlRGVzY3JpcHRpb24uc2RwKTtcbiAgICAgICAgICBzZWN0aW9uc1tqXSArPSAnYT1lbmQtb2YtY2FuZGlkYXRlc1xcclxcbic7XG4gICAgICAgICAgcGMucmVtb3RlRGVzY3JpcHRpb24uc2RwID1cbiAgICAgICAgICAgICAgU0RQVXRpbHMuZ2V0RGVzY3JpcHRpb24ocGMucmVtb3RlRGVzY3JpcHRpb24uc2RwKSArXG4gICAgICAgICAgICAgIHNlY3Rpb25zLmpvaW4oJycpO1xuICAgICAgICAgIGlmIChwYy51c2luZ0J1bmRsZSkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgc2RwTUxpbmVJbmRleCA9IGNhbmRpZGF0ZS5zZHBNTGluZUluZGV4O1xuICAgICAgICBpZiAoY2FuZGlkYXRlLnNkcE1pZCkge1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGMudHJhbnNjZWl2ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocGMudHJhbnNjZWl2ZXJzW2ldLm1pZCA9PT0gY2FuZGlkYXRlLnNkcE1pZCkge1xuICAgICAgICAgICAgICBzZHBNTGluZUluZGV4ID0gaTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciB0cmFuc2NlaXZlciA9IHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XTtcbiAgICAgICAgaWYgKHRyYW5zY2VpdmVyKSB7XG4gICAgICAgICAgaWYgKHRyYW5zY2VpdmVyLnJlamVjdGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgY2FuZCA9IE9iamVjdC5rZXlzKGNhbmRpZGF0ZS5jYW5kaWRhdGUpLmxlbmd0aCA+IDAgP1xuICAgICAgICAgICAgICBTRFBVdGlscy5wYXJzZUNhbmRpZGF0ZShjYW5kaWRhdGUuY2FuZGlkYXRlKSA6IHt9O1xuICAgICAgICAgIC8vIElnbm9yZSBDaHJvbWUncyBpbnZhbGlkIGNhbmRpZGF0ZXMgc2luY2UgRWRnZSBkb2VzIG5vdCBsaWtlIHRoZW0uXG4gICAgICAgICAgaWYgKGNhbmQucHJvdG9jb2wgPT09ICd0Y3AnICYmIChjYW5kLnBvcnQgPT09IDAgfHwgY2FuZC5wb3J0ID09PSA5KSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gSWdub3JlIFJUQ1AgY2FuZGlkYXRlcywgd2UgYXNzdW1lIFJUQ1AtTVVYLlxuICAgICAgICAgIGlmIChjYW5kLmNvbXBvbmVudCAmJiBjYW5kLmNvbXBvbmVudCAhPT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gd2hlbiB1c2luZyBidW5kbGUsIGF2b2lkIGFkZGluZyBjYW5kaWRhdGVzIHRvIHRoZSB3cm9uZ1xuICAgICAgICAgIC8vIGljZSB0cmFuc3BvcnQuIEFuZCBhdm9pZCBhZGRpbmcgY2FuZGlkYXRlcyBhZGRlZCBpbiB0aGUgU0RQLlxuICAgICAgICAgIGlmIChzZHBNTGluZUluZGV4ID09PSAwIHx8IChzZHBNTGluZUluZGV4ID4gMCAmJlxuICAgICAgICAgICAgICB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQgIT09IHBjLnRyYW5zY2VpdmVyc1swXS5pY2VUcmFuc3BvcnQpKSB7XG4gICAgICAgICAgICBpZiAoIW1heWJlQWRkQ2FuZGlkYXRlKHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydCwgY2FuZCkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChtYWtlRXJyb3IoJ09wZXJhdGlvbkVycm9yJyxcbiAgICAgICAgICAgICAgICAgICdDYW4gbm90IGFkZCBJQ0UgY2FuZGlkYXRlJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHVwZGF0ZSB0aGUgcmVtb3RlRGVzY3JpcHRpb24uXG4gICAgICAgICAgdmFyIGNhbmRpZGF0ZVN0cmluZyA9IGNhbmRpZGF0ZS5jYW5kaWRhdGUudHJpbSgpO1xuICAgICAgICAgIGlmIChjYW5kaWRhdGVTdHJpbmcuaW5kZXhPZignYT0nKSA9PT0gMCkge1xuICAgICAgICAgICAgY2FuZGlkYXRlU3RyaW5nID0gY2FuZGlkYXRlU3RyaW5nLnN1YnN0cigyKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2VjdGlvbnMgPSBTRFBVdGlscy5nZXRNZWRpYVNlY3Rpb25zKHBjLnJlbW90ZURlc2NyaXB0aW9uLnNkcCk7XG4gICAgICAgICAgc2VjdGlvbnNbc2RwTUxpbmVJbmRleF0gKz0gJ2E9JyArXG4gICAgICAgICAgICAgIChjYW5kLnR5cGUgPyBjYW5kaWRhdGVTdHJpbmcgOiAnZW5kLW9mLWNhbmRpZGF0ZXMnKVxuICAgICAgICAgICAgICArICdcXHJcXG4nO1xuICAgICAgICAgIHBjLnJlbW90ZURlc2NyaXB0aW9uLnNkcCA9XG4gICAgICAgICAgICAgIFNEUFV0aWxzLmdldERlc2NyaXB0aW9uKHBjLnJlbW90ZURlc2NyaXB0aW9uLnNkcCkgK1xuICAgICAgICAgICAgICBzZWN0aW9ucy5qb2luKCcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0KG1ha2VFcnJvcignT3BlcmF0aW9uRXJyb3InLFxuICAgICAgICAgICAgICAnQ2FuIG5vdCBhZGQgSUNFIGNhbmRpZGF0ZScpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTdGF0cyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBwcm9taXNlcyA9IFtdO1xuICAgIHRoaXMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcbiAgICAgIFsncnRwU2VuZGVyJywgJ3J0cFJlY2VpdmVyJywgJ2ljZUdhdGhlcmVyJywgJ2ljZVRyYW5zcG9ydCcsXG4gICAgICAgICAgJ2R0bHNUcmFuc3BvcnQnXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgICAgICAgaWYgKHRyYW5zY2VpdmVyW21ldGhvZF0pIHtcbiAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaCh0cmFuc2NlaXZlclttZXRob2RdLmdldFN0YXRzKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgIH0pO1xuICAgIHZhciBmaXhTdGF0c1R5cGUgPSBmdW5jdGlvbihzdGF0KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpbmJvdW5kcnRwOiAnaW5ib3VuZC1ydHAnLFxuICAgICAgICBvdXRib3VuZHJ0cDogJ291dGJvdW5kLXJ0cCcsXG4gICAgICAgIGNhbmRpZGF0ZXBhaXI6ICdjYW5kaWRhdGUtcGFpcicsXG4gICAgICAgIGxvY2FsY2FuZGlkYXRlOiAnbG9jYWwtY2FuZGlkYXRlJyxcbiAgICAgICAgcmVtb3RlY2FuZGlkYXRlOiAncmVtb3RlLWNhbmRpZGF0ZSdcbiAgICAgIH1bc3RhdC50eXBlXSB8fCBzdGF0LnR5cGU7XG4gICAgfTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuICAgICAgLy8gc2hpbSBnZXRTdGF0cyB3aXRoIG1hcGxpa2Ugc3VwcG9ydFxuICAgICAgdmFyIHJlc3VsdHMgPSBuZXcgTWFwKCk7XG4gICAgICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgcmVzLmZvckVhY2goZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgT2JqZWN0LmtleXMocmVzdWx0KS5mb3JFYWNoKGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgICAgICByZXN1bHRbaWRdLnR5cGUgPSBmaXhTdGF0c1R5cGUocmVzdWx0W2lkXSk7XG4gICAgICAgICAgICByZXN1bHRzLnNldChpZCwgcmVzdWx0W2lkXSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXNvbHZlKHJlc3VsdHMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gbGVnYWN5IGNhbGxiYWNrIHNoaW1zLiBTaG91bGQgYmUgbW92ZWQgdG8gYWRhcHRlci5qcyBzb21lIGRheXMuXG4gIHZhciBtZXRob2RzID0gWydjcmVhdGVPZmZlcicsICdjcmVhdGVBbnN3ZXInXTtcbiAgbWV0aG9kcy5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgIHZhciBuYXRpdmVNZXRob2QgPSBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXTtcbiAgICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICBpZiAodHlwZW9mIGFyZ3NbMF0gPT09ICdmdW5jdGlvbicgfHxcbiAgICAgICAgICB0eXBlb2YgYXJnc1sxXSA9PT0gJ2Z1bmN0aW9uJykgeyAvLyBsZWdhY3lcbiAgICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseSh0aGlzLCBbYXJndW1lbnRzWzJdXSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oZGVzY3JpcHRpb24pIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGFyZ3NbMF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGFyZ3NbMF0uYXBwbHkobnVsbCwgW2Rlc2NyaXB0aW9uXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgIGlmICh0eXBlb2YgYXJnc1sxXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgYXJnc1sxXS5hcHBseShudWxsLCBbZXJyb3JdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH0pO1xuXG4gIG1ldGhvZHMgPSBbJ3NldExvY2FsRGVzY3JpcHRpb24nLCAnc2V0UmVtb3RlRGVzY3JpcHRpb24nLCAnYWRkSWNlQ2FuZGlkYXRlJ107XG4gIG1ldGhvZHMuZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICB2YXIgbmF0aXZlTWV0aG9kID0gUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF07XG4gICAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgaWYgKHR5cGVvZiBhcmdzWzFdID09PSAnZnVuY3Rpb24nIHx8XG4gICAgICAgICAgdHlwZW9mIGFyZ3NbMl0gPT09ICdmdW5jdGlvbicpIHsgLy8gbGVnYWN5XG4gICAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGFyZ3NbMV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGFyZ3NbMV0uYXBwbHkobnVsbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgIGlmICh0eXBlb2YgYXJnc1syXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgYXJnc1syXS5hcHBseShudWxsLCBbZXJyb3JdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH0pO1xuXG4gIC8vIGdldFN0YXRzIGlzIHNwZWNpYWwuIEl0IGRvZXNuJ3QgaGF2ZSBhIHNwZWMgbGVnYWN5IG1ldGhvZCB5ZXQgd2Ugc3VwcG9ydFxuICAvLyBnZXRTdGF0cyhzb21ldGhpbmcsIGNiKSB3aXRob3V0IGVycm9yIGNhbGxiYWNrcy5cbiAgWydnZXRTdGF0cyddLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgdmFyIG5hdGl2ZU1ldGhvZCA9IFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdO1xuICAgIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIGlmICh0eXBlb2YgYXJnc1sxXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBhcmdzWzFdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBhcmdzWzFdLmFwcGx5KG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfSk7XG5cbiAgcmV0dXJuIFJUQ1BlZXJDb25uZWN0aW9uO1xufTtcblxufSx7XCJzZHBcIjoyfV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4gLyogZXNsaW50LWVudiBub2RlICovXG4ndXNlIHN0cmljdCc7XG5cbi8vIFNEUCBoZWxwZXJzLlxudmFyIFNEUFV0aWxzID0ge307XG5cbi8vIEdlbmVyYXRlIGFuIGFscGhhbnVtZXJpYyBpZGVudGlmaWVyIGZvciBjbmFtZSBvciBtaWRzLlxuLy8gVE9ETzogdXNlIFVVSURzIGluc3RlYWQ/IGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2plZC85ODI4ODNcblNEUFV0aWxzLmdlbmVyYXRlSWRlbnRpZmllciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsIDEwKTtcbn07XG5cbi8vIFRoZSBSVENQIENOQU1FIHVzZWQgYnkgYWxsIHBlZXJjb25uZWN0aW9ucyBmcm9tIHRoZSBzYW1lIEpTLlxuU0RQVXRpbHMubG9jYWxDTmFtZSA9IFNEUFV0aWxzLmdlbmVyYXRlSWRlbnRpZmllcigpO1xuXG4vLyBTcGxpdHMgU0RQIGludG8gbGluZXMsIGRlYWxpbmcgd2l0aCBib3RoIENSTEYgYW5kIExGLlxuU0RQVXRpbHMuc3BsaXRMaW5lcyA9IGZ1bmN0aW9uKGJsb2IpIHtcbiAgcmV0dXJuIGJsb2IudHJpbSgpLnNwbGl0KCdcXG4nKS5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgIHJldHVybiBsaW5lLnRyaW0oKTtcbiAgfSk7XG59O1xuLy8gU3BsaXRzIFNEUCBpbnRvIHNlc3Npb25wYXJ0IGFuZCBtZWRpYXNlY3Rpb25zLiBFbnN1cmVzIENSTEYuXG5TRFBVdGlscy5zcGxpdFNlY3Rpb25zID0gZnVuY3Rpb24oYmxvYikge1xuICB2YXIgcGFydHMgPSBibG9iLnNwbGl0KCdcXG5tPScpO1xuICByZXR1cm4gcGFydHMubWFwKGZ1bmN0aW9uKHBhcnQsIGluZGV4KSB7XG4gICAgcmV0dXJuIChpbmRleCA+IDAgPyAnbT0nICsgcGFydCA6IHBhcnQpLnRyaW0oKSArICdcXHJcXG4nO1xuICB9KTtcbn07XG5cbi8vIHJldHVybnMgdGhlIHNlc3Npb24gZGVzY3JpcHRpb24uXG5TRFBVdGlscy5nZXREZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKGJsb2IpIHtcbiAgdmFyIHNlY3Rpb25zID0gU0RQVXRpbHMuc3BsaXRTZWN0aW9ucyhibG9iKTtcbiAgcmV0dXJuIHNlY3Rpb25zICYmIHNlY3Rpb25zWzBdO1xufTtcblxuLy8gcmV0dXJucyB0aGUgaW5kaXZpZHVhbCBtZWRpYSBzZWN0aW9ucy5cblNEUFV0aWxzLmdldE1lZGlhU2VjdGlvbnMgPSBmdW5jdGlvbihibG9iKSB7XG4gIHZhciBzZWN0aW9ucyA9IFNEUFV0aWxzLnNwbGl0U2VjdGlvbnMoYmxvYik7XG4gIHNlY3Rpb25zLnNoaWZ0KCk7XG4gIHJldHVybiBzZWN0aW9ucztcbn07XG5cbi8vIFJldHVybnMgbGluZXMgdGhhdCBzdGFydCB3aXRoIGEgY2VydGFpbiBwcmVmaXguXG5TRFBVdGlscy5tYXRjaFByZWZpeCA9IGZ1bmN0aW9uKGJsb2IsIHByZWZpeCkge1xuICByZXR1cm4gU0RQVXRpbHMuc3BsaXRMaW5lcyhibG9iKS5maWx0ZXIoZnVuY3Rpb24obGluZSkge1xuICAgIHJldHVybiBsaW5lLmluZGV4T2YocHJlZml4KSA9PT0gMDtcbiAgfSk7XG59O1xuXG4vLyBQYXJzZXMgYW4gSUNFIGNhbmRpZGF0ZSBsaW5lLiBTYW1wbGUgaW5wdXQ6XG4vLyBjYW5kaWRhdGU6NzAyNzg2MzUwIDIgdWRwIDQxODE5OTAyIDguOC44LjggNjA3NjkgdHlwIHJlbGF5IHJhZGRyIDguOC44Ljhcbi8vIHJwb3J0IDU1OTk2XCJcblNEUFV0aWxzLnBhcnNlQ2FuZGlkYXRlID0gZnVuY3Rpb24obGluZSkge1xuICB2YXIgcGFydHM7XG4gIC8vIFBhcnNlIGJvdGggdmFyaWFudHMuXG4gIGlmIChsaW5lLmluZGV4T2YoJ2E9Y2FuZGlkYXRlOicpID09PSAwKSB7XG4gICAgcGFydHMgPSBsaW5lLnN1YnN0cmluZygxMikuc3BsaXQoJyAnKTtcbiAgfSBlbHNlIHtcbiAgICBwYXJ0cyA9IGxpbmUuc3Vic3RyaW5nKDEwKS5zcGxpdCgnICcpO1xuICB9XG5cbiAgdmFyIGNhbmRpZGF0ZSA9IHtcbiAgICBmb3VuZGF0aW9uOiBwYXJ0c1swXSxcbiAgICBjb21wb25lbnQ6IHBhcnNlSW50KHBhcnRzWzFdLCAxMCksXG4gICAgcHJvdG9jb2w6IHBhcnRzWzJdLnRvTG93ZXJDYXNlKCksXG4gICAgcHJpb3JpdHk6IHBhcnNlSW50KHBhcnRzWzNdLCAxMCksXG4gICAgaXA6IHBhcnRzWzRdLFxuICAgIHBvcnQ6IHBhcnNlSW50KHBhcnRzWzVdLCAxMCksXG4gICAgLy8gc2tpcCBwYXJ0c1s2XSA9PSAndHlwJ1xuICAgIHR5cGU6IHBhcnRzWzddXG4gIH07XG5cbiAgZm9yICh2YXIgaSA9IDg7IGkgPCBwYXJ0cy5sZW5ndGg7IGkgKz0gMikge1xuICAgIHN3aXRjaCAocGFydHNbaV0pIHtcbiAgICAgIGNhc2UgJ3JhZGRyJzpcbiAgICAgICAgY2FuZGlkYXRlLnJlbGF0ZWRBZGRyZXNzID0gcGFydHNbaSArIDFdO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3Jwb3J0JzpcbiAgICAgICAgY2FuZGlkYXRlLnJlbGF0ZWRQb3J0ID0gcGFyc2VJbnQocGFydHNbaSArIDFdLCAxMCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndGNwdHlwZSc6XG4gICAgICAgIGNhbmRpZGF0ZS50Y3BUeXBlID0gcGFydHNbaSArIDFdO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3VmcmFnJzpcbiAgICAgICAgY2FuZGlkYXRlLnVmcmFnID0gcGFydHNbaSArIDFdOyAvLyBmb3IgYmFja3dhcmQgY29tcGFiaWxpdHkuXG4gICAgICAgIGNhbmRpZGF0ZS51c2VybmFtZUZyYWdtZW50ID0gcGFydHNbaSArIDFdO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6IC8vIGV4dGVuc2lvbiBoYW5kbGluZywgaW4gcGFydGljdWxhciB1ZnJhZ1xuICAgICAgICBjYW5kaWRhdGVbcGFydHNbaV1dID0gcGFydHNbaSArIDFdO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNhbmRpZGF0ZTtcbn07XG5cbi8vIFRyYW5zbGF0ZXMgYSBjYW5kaWRhdGUgb2JqZWN0IGludG8gU0RQIGNhbmRpZGF0ZSBhdHRyaWJ1dGUuXG5TRFBVdGlscy53cml0ZUNhbmRpZGF0ZSA9IGZ1bmN0aW9uKGNhbmRpZGF0ZSkge1xuICB2YXIgc2RwID0gW107XG4gIHNkcC5wdXNoKGNhbmRpZGF0ZS5mb3VuZGF0aW9uKTtcbiAgc2RwLnB1c2goY2FuZGlkYXRlLmNvbXBvbmVudCk7XG4gIHNkcC5wdXNoKGNhbmRpZGF0ZS5wcm90b2NvbC50b1VwcGVyQ2FzZSgpKTtcbiAgc2RwLnB1c2goY2FuZGlkYXRlLnByaW9yaXR5KTtcbiAgc2RwLnB1c2goY2FuZGlkYXRlLmlwKTtcbiAgc2RwLnB1c2goY2FuZGlkYXRlLnBvcnQpO1xuXG4gIHZhciB0eXBlID0gY2FuZGlkYXRlLnR5cGU7XG4gIHNkcC5wdXNoKCd0eXAnKTtcbiAgc2RwLnB1c2godHlwZSk7XG4gIGlmICh0eXBlICE9PSAnaG9zdCcgJiYgY2FuZGlkYXRlLnJlbGF0ZWRBZGRyZXNzICYmXG4gICAgICBjYW5kaWRhdGUucmVsYXRlZFBvcnQpIHtcbiAgICBzZHAucHVzaCgncmFkZHInKTtcbiAgICBzZHAucHVzaChjYW5kaWRhdGUucmVsYXRlZEFkZHJlc3MpOyAvLyB3YXM6IHJlbEFkZHJcbiAgICBzZHAucHVzaCgncnBvcnQnKTtcbiAgICBzZHAucHVzaChjYW5kaWRhdGUucmVsYXRlZFBvcnQpOyAvLyB3YXM6IHJlbFBvcnRcbiAgfVxuICBpZiAoY2FuZGlkYXRlLnRjcFR5cGUgJiYgY2FuZGlkYXRlLnByb3RvY29sLnRvTG93ZXJDYXNlKCkgPT09ICd0Y3AnKSB7XG4gICAgc2RwLnB1c2goJ3RjcHR5cGUnKTtcbiAgICBzZHAucHVzaChjYW5kaWRhdGUudGNwVHlwZSk7XG4gIH1cbiAgaWYgKGNhbmRpZGF0ZS51c2VybmFtZUZyYWdtZW50IHx8IGNhbmRpZGF0ZS51ZnJhZykge1xuICAgIHNkcC5wdXNoKCd1ZnJhZycpO1xuICAgIHNkcC5wdXNoKGNhbmRpZGF0ZS51c2VybmFtZUZyYWdtZW50IHx8IGNhbmRpZGF0ZS51ZnJhZyk7XG4gIH1cbiAgcmV0dXJuICdjYW5kaWRhdGU6JyArIHNkcC5qb2luKCcgJyk7XG59O1xuXG4vLyBQYXJzZXMgYW4gaWNlLW9wdGlvbnMgbGluZSwgcmV0dXJucyBhbiBhcnJheSBvZiBvcHRpb24gdGFncy5cbi8vIGE9aWNlLW9wdGlvbnM6Zm9vIGJhclxuU0RQVXRpbHMucGFyc2VJY2VPcHRpb25zID0gZnVuY3Rpb24obGluZSkge1xuICByZXR1cm4gbGluZS5zdWJzdHIoMTQpLnNwbGl0KCcgJyk7XG59XG5cbi8vIFBhcnNlcyBhbiBydHBtYXAgbGluZSwgcmV0dXJucyBSVENSdHBDb2RkZWNQYXJhbWV0ZXJzLiBTYW1wbGUgaW5wdXQ6XG4vLyBhPXJ0cG1hcDoxMTEgb3B1cy80ODAwMC8yXG5TRFBVdGlscy5wYXJzZVJ0cE1hcCA9IGZ1bmN0aW9uKGxpbmUpIHtcbiAgdmFyIHBhcnRzID0gbGluZS5zdWJzdHIoOSkuc3BsaXQoJyAnKTtcbiAgdmFyIHBhcnNlZCA9IHtcbiAgICBwYXlsb2FkVHlwZTogcGFyc2VJbnQocGFydHMuc2hpZnQoKSwgMTApIC8vIHdhczogaWRcbiAgfTtcblxuICBwYXJ0cyA9IHBhcnRzWzBdLnNwbGl0KCcvJyk7XG5cbiAgcGFyc2VkLm5hbWUgPSBwYXJ0c1swXTtcbiAgcGFyc2VkLmNsb2NrUmF0ZSA9IHBhcnNlSW50KHBhcnRzWzFdLCAxMCk7IC8vIHdhczogY2xvY2tyYXRlXG4gIC8vIHdhczogY2hhbm5lbHNcbiAgcGFyc2VkLm51bUNoYW5uZWxzID0gcGFydHMubGVuZ3RoID09PSAzID8gcGFyc2VJbnQocGFydHNbMl0sIDEwKSA6IDE7XG4gIHJldHVybiBwYXJzZWQ7XG59O1xuXG4vLyBHZW5lcmF0ZSBhbiBhPXJ0cG1hcCBsaW5lIGZyb20gUlRDUnRwQ29kZWNDYXBhYmlsaXR5IG9yXG4vLyBSVENSdHBDb2RlY1BhcmFtZXRlcnMuXG5TRFBVdGlscy53cml0ZVJ0cE1hcCA9IGZ1bmN0aW9uKGNvZGVjKSB7XG4gIHZhciBwdCA9IGNvZGVjLnBheWxvYWRUeXBlO1xuICBpZiAoY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgIHB0ID0gY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGU7XG4gIH1cbiAgcmV0dXJuICdhPXJ0cG1hcDonICsgcHQgKyAnICcgKyBjb2RlYy5uYW1lICsgJy8nICsgY29kZWMuY2xvY2tSYXRlICtcbiAgICAgIChjb2RlYy5udW1DaGFubmVscyAhPT0gMSA/ICcvJyArIGNvZGVjLm51bUNoYW5uZWxzIDogJycpICsgJ1xcclxcbic7XG59O1xuXG4vLyBQYXJzZXMgYW4gYT1leHRtYXAgbGluZSAoaGVhZGVyZXh0ZW5zaW9uIGZyb20gUkZDIDUyODUpLiBTYW1wbGUgaW5wdXQ6XG4vLyBhPWV4dG1hcDoyIHVybjppZXRmOnBhcmFtczpydHAtaGRyZXh0OnRvZmZzZXRcbi8vIGE9ZXh0bWFwOjIvc2VuZG9ubHkgdXJuOmlldGY6cGFyYW1zOnJ0cC1oZHJleHQ6dG9mZnNldFxuU0RQVXRpbHMucGFyc2VFeHRtYXAgPSBmdW5jdGlvbihsaW5lKSB7XG4gIHZhciBwYXJ0cyA9IGxpbmUuc3Vic3RyKDkpLnNwbGl0KCcgJyk7XG4gIHJldHVybiB7XG4gICAgaWQ6IHBhcnNlSW50KHBhcnRzWzBdLCAxMCksXG4gICAgZGlyZWN0aW9uOiBwYXJ0c1swXS5pbmRleE9mKCcvJykgPiAwID8gcGFydHNbMF0uc3BsaXQoJy8nKVsxXSA6ICdzZW5kcmVjdicsXG4gICAgdXJpOiBwYXJ0c1sxXVxuICB9O1xufTtcblxuLy8gR2VuZXJhdGVzIGE9ZXh0bWFwIGxpbmUgZnJvbSBSVENSdHBIZWFkZXJFeHRlbnNpb25QYXJhbWV0ZXJzIG9yXG4vLyBSVENSdHBIZWFkZXJFeHRlbnNpb24uXG5TRFBVdGlscy53cml0ZUV4dG1hcCA9IGZ1bmN0aW9uKGhlYWRlckV4dGVuc2lvbikge1xuICByZXR1cm4gJ2E9ZXh0bWFwOicgKyAoaGVhZGVyRXh0ZW5zaW9uLmlkIHx8IGhlYWRlckV4dGVuc2lvbi5wcmVmZXJyZWRJZCkgK1xuICAgICAgKGhlYWRlckV4dGVuc2lvbi5kaXJlY3Rpb24gJiYgaGVhZGVyRXh0ZW5zaW9uLmRpcmVjdGlvbiAhPT0gJ3NlbmRyZWN2J1xuICAgICAgICAgID8gJy8nICsgaGVhZGVyRXh0ZW5zaW9uLmRpcmVjdGlvblxuICAgICAgICAgIDogJycpICtcbiAgICAgICcgJyArIGhlYWRlckV4dGVuc2lvbi51cmkgKyAnXFxyXFxuJztcbn07XG5cbi8vIFBhcnNlcyBhbiBmdG1wIGxpbmUsIHJldHVybnMgZGljdGlvbmFyeS4gU2FtcGxlIGlucHV0OlxuLy8gYT1mbXRwOjk2IHZicj1vbjtjbmc9b25cbi8vIEFsc28gZGVhbHMgd2l0aCB2YnI9b247IGNuZz1vblxuU0RQVXRpbHMucGFyc2VGbXRwID0gZnVuY3Rpb24obGluZSkge1xuICB2YXIgcGFyc2VkID0ge307XG4gIHZhciBrdjtcbiAgdmFyIHBhcnRzID0gbGluZS5zdWJzdHIobGluZS5pbmRleE9mKCcgJykgKyAxKS5zcGxpdCgnOycpO1xuICBmb3IgKHZhciBqID0gMDsgaiA8IHBhcnRzLmxlbmd0aDsgaisrKSB7XG4gICAga3YgPSBwYXJ0c1tqXS50cmltKCkuc3BsaXQoJz0nKTtcbiAgICBwYXJzZWRba3ZbMF0udHJpbSgpXSA9IGt2WzFdO1xuICB9XG4gIHJldHVybiBwYXJzZWQ7XG59O1xuXG4vLyBHZW5lcmF0ZXMgYW4gYT1mdG1wIGxpbmUgZnJvbSBSVENSdHBDb2RlY0NhcGFiaWxpdHkgb3IgUlRDUnRwQ29kZWNQYXJhbWV0ZXJzLlxuU0RQVXRpbHMud3JpdGVGbXRwID0gZnVuY3Rpb24oY29kZWMpIHtcbiAgdmFyIGxpbmUgPSAnJztcbiAgdmFyIHB0ID0gY29kZWMucGF5bG9hZFR5cGU7XG4gIGlmIChjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcHQgPSBjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZTtcbiAgfVxuICBpZiAoY29kZWMucGFyYW1ldGVycyAmJiBPYmplY3Qua2V5cyhjb2RlYy5wYXJhbWV0ZXJzKS5sZW5ndGgpIHtcbiAgICB2YXIgcGFyYW1zID0gW107XG4gICAgT2JqZWN0LmtleXMoY29kZWMucGFyYW1ldGVycykuZm9yRWFjaChmdW5jdGlvbihwYXJhbSkge1xuICAgICAgcGFyYW1zLnB1c2gocGFyYW0gKyAnPScgKyBjb2RlYy5wYXJhbWV0ZXJzW3BhcmFtXSk7XG4gICAgfSk7XG4gICAgbGluZSArPSAnYT1mbXRwOicgKyBwdCArICcgJyArIHBhcmFtcy5qb2luKCc7JykgKyAnXFxyXFxuJztcbiAgfVxuICByZXR1cm4gbGluZTtcbn07XG5cbi8vIFBhcnNlcyBhbiBydGNwLWZiIGxpbmUsIHJldHVybnMgUlRDUFJ0Y3BGZWVkYmFjayBvYmplY3QuIFNhbXBsZSBpbnB1dDpcbi8vIGE9cnRjcC1mYjo5OCBuYWNrIHJwc2lcblNEUFV0aWxzLnBhcnNlUnRjcEZiID0gZnVuY3Rpb24obGluZSkge1xuICB2YXIgcGFydHMgPSBsaW5lLnN1YnN0cihsaW5lLmluZGV4T2YoJyAnKSArIDEpLnNwbGl0KCcgJyk7XG4gIHJldHVybiB7XG4gICAgdHlwZTogcGFydHMuc2hpZnQoKSxcbiAgICBwYXJhbWV0ZXI6IHBhcnRzLmpvaW4oJyAnKVxuICB9O1xufTtcbi8vIEdlbmVyYXRlIGE9cnRjcC1mYiBsaW5lcyBmcm9tIFJUQ1J0cENvZGVjQ2FwYWJpbGl0eSBvciBSVENSdHBDb2RlY1BhcmFtZXRlcnMuXG5TRFBVdGlscy53cml0ZVJ0Y3BGYiA9IGZ1bmN0aW9uKGNvZGVjKSB7XG4gIHZhciBsaW5lcyA9ICcnO1xuICB2YXIgcHQgPSBjb2RlYy5wYXlsb2FkVHlwZTtcbiAgaWYgKGNvZGVjLnByZWZlcnJlZFBheWxvYWRUeXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICBwdCA9IGNvZGVjLnByZWZlcnJlZFBheWxvYWRUeXBlO1xuICB9XG4gIGlmIChjb2RlYy5ydGNwRmVlZGJhY2sgJiYgY29kZWMucnRjcEZlZWRiYWNrLmxlbmd0aCkge1xuICAgIC8vIEZJWE1FOiBzcGVjaWFsIGhhbmRsaW5nIGZvciB0cnItaW50P1xuICAgIGNvZGVjLnJ0Y3BGZWVkYmFjay5mb3JFYWNoKGZ1bmN0aW9uKGZiKSB7XG4gICAgICBsaW5lcyArPSAnYT1ydGNwLWZiOicgKyBwdCArICcgJyArIGZiLnR5cGUgK1xuICAgICAgKGZiLnBhcmFtZXRlciAmJiBmYi5wYXJhbWV0ZXIubGVuZ3RoID8gJyAnICsgZmIucGFyYW1ldGVyIDogJycpICtcbiAgICAgICAgICAnXFxyXFxuJztcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gbGluZXM7XG59O1xuXG4vLyBQYXJzZXMgYW4gUkZDIDU1NzYgc3NyYyBtZWRpYSBhdHRyaWJ1dGUuIFNhbXBsZSBpbnB1dDpcbi8vIGE9c3NyYzozNzM1OTI4NTU5IGNuYW1lOnNvbWV0aGluZ1xuU0RQVXRpbHMucGFyc2VTc3JjTWVkaWEgPSBmdW5jdGlvbihsaW5lKSB7XG4gIHZhciBzcCA9IGxpbmUuaW5kZXhPZignICcpO1xuICB2YXIgcGFydHMgPSB7XG4gICAgc3NyYzogcGFyc2VJbnQobGluZS5zdWJzdHIoNywgc3AgLSA3KSwgMTApXG4gIH07XG4gIHZhciBjb2xvbiA9IGxpbmUuaW5kZXhPZignOicsIHNwKTtcbiAgaWYgKGNvbG9uID4gLTEpIHtcbiAgICBwYXJ0cy5hdHRyaWJ1dGUgPSBsaW5lLnN1YnN0cihzcCArIDEsIGNvbG9uIC0gc3AgLSAxKTtcbiAgICBwYXJ0cy52YWx1ZSA9IGxpbmUuc3Vic3RyKGNvbG9uICsgMSk7XG4gIH0gZWxzZSB7XG4gICAgcGFydHMuYXR0cmlidXRlID0gbGluZS5zdWJzdHIoc3AgKyAxKTtcbiAgfVxuICByZXR1cm4gcGFydHM7XG59O1xuXG4vLyBFeHRyYWN0cyB0aGUgTUlEIChSRkMgNTg4OCkgZnJvbSBhIG1lZGlhIHNlY3Rpb24uXG4vLyByZXR1cm5zIHRoZSBNSUQgb3IgdW5kZWZpbmVkIGlmIG5vIG1pZCBsaW5lIHdhcyBmb3VuZC5cblNEUFV0aWxzLmdldE1pZCA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbikge1xuICB2YXIgbWlkID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1taWQ6JylbMF07XG4gIGlmIChtaWQpIHtcbiAgICByZXR1cm4gbWlkLnN1YnN0cig2KTtcbiAgfVxufVxuXG5TRFBVdGlscy5wYXJzZUZpbmdlcnByaW50ID0gZnVuY3Rpb24obGluZSkge1xuICB2YXIgcGFydHMgPSBsaW5lLnN1YnN0cigxNCkuc3BsaXQoJyAnKTtcbiAgcmV0dXJuIHtcbiAgICBhbGdvcml0aG06IHBhcnRzWzBdLnRvTG93ZXJDYXNlKCksIC8vIGFsZ29yaXRobSBpcyBjYXNlLXNlbnNpdGl2ZSBpbiBFZGdlLlxuICAgIHZhbHVlOiBwYXJ0c1sxXVxuICB9O1xufTtcblxuLy8gRXh0cmFjdHMgRFRMUyBwYXJhbWV0ZXJzIGZyb20gU0RQIG1lZGlhIHNlY3Rpb24gb3Igc2Vzc2lvbnBhcnQuXG4vLyBGSVhNRTogZm9yIGNvbnNpc3RlbmN5IHdpdGggb3RoZXIgZnVuY3Rpb25zIHRoaXMgc2hvdWxkIG9ubHlcbi8vICAgZ2V0IHRoZSBmaW5nZXJwcmludCBsaW5lIGFzIGlucHV0LiBTZWUgYWxzbyBnZXRJY2VQYXJhbWV0ZXJzLlxuU0RQVXRpbHMuZ2V0RHRsc1BhcmFtZXRlcnMgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24sIHNlc3Npb25wYXJ0KSB7XG4gIHZhciBsaW5lcyA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiArIHNlc3Npb25wYXJ0LFxuICAgICAgJ2E9ZmluZ2VycHJpbnQ6Jyk7XG4gIC8vIE5vdGU6IGE9c2V0dXAgbGluZSBpcyBpZ25vcmVkIHNpbmNlIHdlIHVzZSB0aGUgJ2F1dG8nIHJvbGUuXG4gIC8vIE5vdGUyOiAnYWxnb3JpdGhtJyBpcyBub3QgY2FzZSBzZW5zaXRpdmUgZXhjZXB0IGluIEVkZ2UuXG4gIHJldHVybiB7XG4gICAgcm9sZTogJ2F1dG8nLFxuICAgIGZpbmdlcnByaW50czogbGluZXMubWFwKFNEUFV0aWxzLnBhcnNlRmluZ2VycHJpbnQpXG4gIH07XG59O1xuXG4vLyBTZXJpYWxpemVzIERUTFMgcGFyYW1ldGVycyB0byBTRFAuXG5TRFBVdGlscy53cml0ZUR0bHNQYXJhbWV0ZXJzID0gZnVuY3Rpb24ocGFyYW1zLCBzZXR1cFR5cGUpIHtcbiAgdmFyIHNkcCA9ICdhPXNldHVwOicgKyBzZXR1cFR5cGUgKyAnXFxyXFxuJztcbiAgcGFyYW1zLmZpbmdlcnByaW50cy5mb3JFYWNoKGZ1bmN0aW9uKGZwKSB7XG4gICAgc2RwICs9ICdhPWZpbmdlcnByaW50OicgKyBmcC5hbGdvcml0aG0gKyAnICcgKyBmcC52YWx1ZSArICdcXHJcXG4nO1xuICB9KTtcbiAgcmV0dXJuIHNkcDtcbn07XG4vLyBQYXJzZXMgSUNFIGluZm9ybWF0aW9uIGZyb20gU0RQIG1lZGlhIHNlY3Rpb24gb3Igc2Vzc2lvbnBhcnQuXG4vLyBGSVhNRTogZm9yIGNvbnNpc3RlbmN5IHdpdGggb3RoZXIgZnVuY3Rpb25zIHRoaXMgc2hvdWxkIG9ubHlcbi8vICAgZ2V0IHRoZSBpY2UtdWZyYWcgYW5kIGljZS1wd2QgbGluZXMgYXMgaW5wdXQuXG5TRFBVdGlscy5nZXRJY2VQYXJhbWV0ZXJzID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uLCBzZXNzaW9ucGFydCkge1xuICB2YXIgbGluZXMgPSBTRFBVdGlscy5zcGxpdExpbmVzKG1lZGlhU2VjdGlvbik7XG4gIC8vIFNlYXJjaCBpbiBzZXNzaW9uIHBhcnQsIHRvby5cbiAgbGluZXMgPSBsaW5lcy5jb25jYXQoU0RQVXRpbHMuc3BsaXRMaW5lcyhzZXNzaW9ucGFydCkpO1xuICB2YXIgaWNlUGFyYW1ldGVycyA9IHtcbiAgICB1c2VybmFtZUZyYWdtZW50OiBsaW5lcy5maWx0ZXIoZnVuY3Rpb24obGluZSkge1xuICAgICAgcmV0dXJuIGxpbmUuaW5kZXhPZignYT1pY2UtdWZyYWc6JykgPT09IDA7XG4gICAgfSlbMF0uc3Vic3RyKDEyKSxcbiAgICBwYXNzd29yZDogbGluZXMuZmlsdGVyKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgIHJldHVybiBsaW5lLmluZGV4T2YoJ2E9aWNlLXB3ZDonKSA9PT0gMDtcbiAgICB9KVswXS5zdWJzdHIoMTApXG4gIH07XG4gIHJldHVybiBpY2VQYXJhbWV0ZXJzO1xufTtcblxuLy8gU2VyaWFsaXplcyBJQ0UgcGFyYW1ldGVycyB0byBTRFAuXG5TRFBVdGlscy53cml0ZUljZVBhcmFtZXRlcnMgPSBmdW5jdGlvbihwYXJhbXMpIHtcbiAgcmV0dXJuICdhPWljZS11ZnJhZzonICsgcGFyYW1zLnVzZXJuYW1lRnJhZ21lbnQgKyAnXFxyXFxuJyArXG4gICAgICAnYT1pY2UtcHdkOicgKyBwYXJhbXMucGFzc3dvcmQgKyAnXFxyXFxuJztcbn07XG5cbi8vIFBhcnNlcyB0aGUgU0RQIG1lZGlhIHNlY3Rpb24gYW5kIHJldHVybnMgUlRDUnRwUGFyYW1ldGVycy5cblNEUFV0aWxzLnBhcnNlUnRwUGFyYW1ldGVycyA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbikge1xuICB2YXIgZGVzY3JpcHRpb24gPSB7XG4gICAgY29kZWNzOiBbXSxcbiAgICBoZWFkZXJFeHRlbnNpb25zOiBbXSxcbiAgICBmZWNNZWNoYW5pc21zOiBbXSxcbiAgICBydGNwOiBbXVxuICB9O1xuICB2YXIgbGluZXMgPSBTRFBVdGlscy5zcGxpdExpbmVzKG1lZGlhU2VjdGlvbik7XG4gIHZhciBtbGluZSA9IGxpbmVzWzBdLnNwbGl0KCcgJyk7XG4gIGZvciAodmFyIGkgPSAzOyBpIDwgbWxpbmUubGVuZ3RoOyBpKyspIHsgLy8gZmluZCBhbGwgY29kZWNzIGZyb20gbWxpbmVbMy4uXVxuICAgIHZhciBwdCA9IG1saW5lW2ldO1xuICAgIHZhciBydHBtYXBsaW5lID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgoXG4gICAgICAgIG1lZGlhU2VjdGlvbiwgJ2E9cnRwbWFwOicgKyBwdCArICcgJylbMF07XG4gICAgaWYgKHJ0cG1hcGxpbmUpIHtcbiAgICAgIHZhciBjb2RlYyA9IFNEUFV0aWxzLnBhcnNlUnRwTWFwKHJ0cG1hcGxpbmUpO1xuICAgICAgdmFyIGZtdHBzID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgoXG4gICAgICAgICAgbWVkaWFTZWN0aW9uLCAnYT1mbXRwOicgKyBwdCArICcgJyk7XG4gICAgICAvLyBPbmx5IHRoZSBmaXJzdCBhPWZtdHA6PHB0PiBpcyBjb25zaWRlcmVkLlxuICAgICAgY29kZWMucGFyYW1ldGVycyA9IGZtdHBzLmxlbmd0aCA/IFNEUFV0aWxzLnBhcnNlRm10cChmbXRwc1swXSkgOiB7fTtcbiAgICAgIGNvZGVjLnJ0Y3BGZWVkYmFjayA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KFxuICAgICAgICAgIG1lZGlhU2VjdGlvbiwgJ2E9cnRjcC1mYjonICsgcHQgKyAnICcpXG4gICAgICAgIC5tYXAoU0RQVXRpbHMucGFyc2VSdGNwRmIpO1xuICAgICAgZGVzY3JpcHRpb24uY29kZWNzLnB1c2goY29kZWMpO1xuICAgICAgLy8gcGFyc2UgRkVDIG1lY2hhbmlzbXMgZnJvbSBydHBtYXAgbGluZXMuXG4gICAgICBzd2l0Y2ggKGNvZGVjLm5hbWUudG9VcHBlckNhc2UoKSkge1xuICAgICAgICBjYXNlICdSRUQnOlxuICAgICAgICBjYXNlICdVTFBGRUMnOlxuICAgICAgICAgIGRlc2NyaXB0aW9uLmZlY01lY2hhbmlzbXMucHVzaChjb2RlYy5uYW1lLnRvVXBwZXJDYXNlKCkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OiAvLyBvbmx5IFJFRCBhbmQgVUxQRkVDIGFyZSByZWNvZ25pemVkIGFzIEZFQyBtZWNoYW5pc21zLlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPWV4dG1hcDonKS5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICBkZXNjcmlwdGlvbi5oZWFkZXJFeHRlbnNpb25zLnB1c2goU0RQVXRpbHMucGFyc2VFeHRtYXAobGluZSkpO1xuICB9KTtcbiAgLy8gRklYTUU6IHBhcnNlIHJ0Y3AuXG4gIHJldHVybiBkZXNjcmlwdGlvbjtcbn07XG5cbi8vIEdlbmVyYXRlcyBwYXJ0cyBvZiB0aGUgU0RQIG1lZGlhIHNlY3Rpb24gZGVzY3JpYmluZyB0aGUgY2FwYWJpbGl0aWVzIC9cbi8vIHBhcmFtZXRlcnMuXG5TRFBVdGlscy53cml0ZVJ0cERlc2NyaXB0aW9uID0gZnVuY3Rpb24oa2luZCwgY2Fwcykge1xuICB2YXIgc2RwID0gJyc7XG5cbiAgLy8gQnVpbGQgdGhlIG1saW5lLlxuICBzZHAgKz0gJ209JyArIGtpbmQgKyAnICc7XG4gIHNkcCArPSBjYXBzLmNvZGVjcy5sZW5ndGggPiAwID8gJzknIDogJzAnOyAvLyByZWplY3QgaWYgbm8gY29kZWNzLlxuICBzZHAgKz0gJyBVRFAvVExTL1JUUC9TQVZQRiAnO1xuICBzZHAgKz0gY2Fwcy5jb2RlY3MubWFwKGZ1bmN0aW9uKGNvZGVjKSB7XG4gICAgaWYgKGNvZGVjLnByZWZlcnJlZFBheWxvYWRUeXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZTtcbiAgICB9XG4gICAgcmV0dXJuIGNvZGVjLnBheWxvYWRUeXBlO1xuICB9KS5qb2luKCcgJykgKyAnXFxyXFxuJztcblxuICBzZHAgKz0gJ2M9SU4gSVA0IDAuMC4wLjBcXHJcXG4nO1xuICBzZHAgKz0gJ2E9cnRjcDo5IElOIElQNCAwLjAuMC4wXFxyXFxuJztcblxuICAvLyBBZGQgYT1ydHBtYXAgbGluZXMgZm9yIGVhY2ggY29kZWMuIEFsc28gZm10cCBhbmQgcnRjcC1mYi5cbiAgY2Fwcy5jb2RlY3MuZm9yRWFjaChmdW5jdGlvbihjb2RlYykge1xuICAgIHNkcCArPSBTRFBVdGlscy53cml0ZVJ0cE1hcChjb2RlYyk7XG4gICAgc2RwICs9IFNEUFV0aWxzLndyaXRlRm10cChjb2RlYyk7XG4gICAgc2RwICs9IFNEUFV0aWxzLndyaXRlUnRjcEZiKGNvZGVjKTtcbiAgfSk7XG4gIHZhciBtYXhwdGltZSA9IDA7XG4gIGNhcHMuY29kZWNzLmZvckVhY2goZnVuY3Rpb24oY29kZWMpIHtcbiAgICBpZiAoY29kZWMubWF4cHRpbWUgPiBtYXhwdGltZSkge1xuICAgICAgbWF4cHRpbWUgPSBjb2RlYy5tYXhwdGltZTtcbiAgICB9XG4gIH0pO1xuICBpZiAobWF4cHRpbWUgPiAwKSB7XG4gICAgc2RwICs9ICdhPW1heHB0aW1lOicgKyBtYXhwdGltZSArICdcXHJcXG4nO1xuICB9XG4gIHNkcCArPSAnYT1ydGNwLW11eFxcclxcbic7XG5cbiAgY2Fwcy5oZWFkZXJFeHRlbnNpb25zLmZvckVhY2goZnVuY3Rpb24oZXh0ZW5zaW9uKSB7XG4gICAgc2RwICs9IFNEUFV0aWxzLndyaXRlRXh0bWFwKGV4dGVuc2lvbik7XG4gIH0pO1xuICAvLyBGSVhNRTogd3JpdGUgZmVjTWVjaGFuaXNtcy5cbiAgcmV0dXJuIHNkcDtcbn07XG5cbi8vIFBhcnNlcyB0aGUgU0RQIG1lZGlhIHNlY3Rpb24gYW5kIHJldHVybnMgYW4gYXJyYXkgb2Zcbi8vIFJUQ1J0cEVuY29kaW5nUGFyYW1ldGVycy5cblNEUFV0aWxzLnBhcnNlUnRwRW5jb2RpbmdQYXJhbWV0ZXJzID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XG4gIHZhciBlbmNvZGluZ1BhcmFtZXRlcnMgPSBbXTtcbiAgdmFyIGRlc2NyaXB0aW9uID0gU0RQVXRpbHMucGFyc2VSdHBQYXJhbWV0ZXJzKG1lZGlhU2VjdGlvbik7XG4gIHZhciBoYXNSZWQgPSBkZXNjcmlwdGlvbi5mZWNNZWNoYW5pc21zLmluZGV4T2YoJ1JFRCcpICE9PSAtMTtcbiAgdmFyIGhhc1VscGZlYyA9IGRlc2NyaXB0aW9uLmZlY01lY2hhbmlzbXMuaW5kZXhPZignVUxQRkVDJykgIT09IC0xO1xuXG4gIC8vIGZpbHRlciBhPXNzcmM6Li4uIGNuYW1lOiwgaWdub3JlIFBsYW5CLW1zaWRcbiAgdmFyIHNzcmNzID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1zc3JjOicpXG4gIC5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgIHJldHVybiBTRFBVdGlscy5wYXJzZVNzcmNNZWRpYShsaW5lKTtcbiAgfSlcbiAgLmZpbHRlcihmdW5jdGlvbihwYXJ0cykge1xuICAgIHJldHVybiBwYXJ0cy5hdHRyaWJ1dGUgPT09ICdjbmFtZSc7XG4gIH0pO1xuICB2YXIgcHJpbWFyeVNzcmMgPSBzc3Jjcy5sZW5ndGggPiAwICYmIHNzcmNzWzBdLnNzcmM7XG4gIHZhciBzZWNvbmRhcnlTc3JjO1xuXG4gIHZhciBmbG93cyA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9c3NyYy1ncm91cDpGSUQnKVxuICAubWFwKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICB2YXIgcGFydHMgPSBsaW5lLnNwbGl0KCcgJyk7XG4gICAgcGFydHMuc2hpZnQoKTtcbiAgICByZXR1cm4gcGFydHMubWFwKGZ1bmN0aW9uKHBhcnQpIHtcbiAgICAgIHJldHVybiBwYXJzZUludChwYXJ0LCAxMCk7XG4gICAgfSk7XG4gIH0pO1xuICBpZiAoZmxvd3MubGVuZ3RoID4gMCAmJiBmbG93c1swXS5sZW5ndGggPiAxICYmIGZsb3dzWzBdWzBdID09PSBwcmltYXJ5U3NyYykge1xuICAgIHNlY29uZGFyeVNzcmMgPSBmbG93c1swXVsxXTtcbiAgfVxuXG4gIGRlc2NyaXB0aW9uLmNvZGVjcy5mb3JFYWNoKGZ1bmN0aW9uKGNvZGVjKSB7XG4gICAgaWYgKGNvZGVjLm5hbWUudG9VcHBlckNhc2UoKSA9PT0gJ1JUWCcgJiYgY29kZWMucGFyYW1ldGVycy5hcHQpIHtcbiAgICAgIHZhciBlbmNQYXJhbSA9IHtcbiAgICAgICAgc3NyYzogcHJpbWFyeVNzcmMsXG4gICAgICAgIGNvZGVjUGF5bG9hZFR5cGU6IHBhcnNlSW50KGNvZGVjLnBhcmFtZXRlcnMuYXB0LCAxMCksXG4gICAgICAgIHJ0eDoge1xuICAgICAgICAgIHNzcmM6IHNlY29uZGFyeVNzcmNcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGVuY29kaW5nUGFyYW1ldGVycy5wdXNoKGVuY1BhcmFtKTtcbiAgICAgIGlmIChoYXNSZWQpIHtcbiAgICAgICAgZW5jUGFyYW0gPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGVuY1BhcmFtKSk7XG4gICAgICAgIGVuY1BhcmFtLmZlYyA9IHtcbiAgICAgICAgICBzc3JjOiBzZWNvbmRhcnlTc3JjLFxuICAgICAgICAgIG1lY2hhbmlzbTogaGFzVWxwZmVjID8gJ3JlZCt1bHBmZWMnIDogJ3JlZCdcbiAgICAgICAgfTtcbiAgICAgICAgZW5jb2RpbmdQYXJhbWV0ZXJzLnB1c2goZW5jUGFyYW0pO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIGlmIChlbmNvZGluZ1BhcmFtZXRlcnMubGVuZ3RoID09PSAwICYmIHByaW1hcnlTc3JjKSB7XG4gICAgZW5jb2RpbmdQYXJhbWV0ZXJzLnB1c2goe1xuICAgICAgc3NyYzogcHJpbWFyeVNzcmNcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHdlIHN1cHBvcnQgYm90aCBiPUFTIGFuZCBiPVRJQVMgYnV0IGludGVycHJldCBBUyBhcyBUSUFTLlxuICB2YXIgYmFuZHdpZHRoID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYj0nKTtcbiAgaWYgKGJhbmR3aWR0aC5sZW5ndGgpIHtcbiAgICBpZiAoYmFuZHdpZHRoWzBdLmluZGV4T2YoJ2I9VElBUzonKSA9PT0gMCkge1xuICAgICAgYmFuZHdpZHRoID0gcGFyc2VJbnQoYmFuZHdpZHRoWzBdLnN1YnN0cig3KSwgMTApO1xuICAgIH0gZWxzZSBpZiAoYmFuZHdpZHRoWzBdLmluZGV4T2YoJ2I9QVM6JykgPT09IDApIHtcbiAgICAgIC8vIHVzZSBmb3JtdWxhIGZyb20gSlNFUCB0byBjb252ZXJ0IGI9QVMgdG8gVElBUyB2YWx1ZS5cbiAgICAgIGJhbmR3aWR0aCA9IHBhcnNlSW50KGJhbmR3aWR0aFswXS5zdWJzdHIoNSksIDEwKSAqIDEwMDAgKiAwLjk1XG4gICAgICAgICAgLSAoNTAgKiA0MCAqIDgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBiYW5kd2lkdGggPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGVuY29kaW5nUGFyYW1ldGVycy5mb3JFYWNoKGZ1bmN0aW9uKHBhcmFtcykge1xuICAgICAgcGFyYW1zLm1heEJpdHJhdGUgPSBiYW5kd2lkdGg7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIGVuY29kaW5nUGFyYW1ldGVycztcbn07XG5cbi8vIHBhcnNlcyBodHRwOi8vZHJhZnQub3J0Yy5vcmcvI3J0Y3J0Y3BwYXJhbWV0ZXJzKlxuU0RQVXRpbHMucGFyc2VSdGNwUGFyYW1ldGVycyA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbikge1xuICB2YXIgcnRjcFBhcmFtZXRlcnMgPSB7fTtcblxuICB2YXIgY25hbWU7XG4gIC8vIEdldHMgdGhlIGZpcnN0IFNTUkMuIE5vdGUgdGhhdCB3aXRoIFJUWCB0aGVyZSBtaWdodCBiZSBtdWx0aXBsZVxuICAvLyBTU1JDcy5cbiAgdmFyIHJlbW90ZVNzcmMgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPXNzcmM6JylcbiAgICAgIC5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgICAgICByZXR1cm4gU0RQVXRpbHMucGFyc2VTc3JjTWVkaWEobGluZSk7XG4gICAgICB9KVxuICAgICAgLmZpbHRlcihmdW5jdGlvbihvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iai5hdHRyaWJ1dGUgPT09ICdjbmFtZSc7XG4gICAgICB9KVswXTtcbiAgaWYgKHJlbW90ZVNzcmMpIHtcbiAgICBydGNwUGFyYW1ldGVycy5jbmFtZSA9IHJlbW90ZVNzcmMudmFsdWU7XG4gICAgcnRjcFBhcmFtZXRlcnMuc3NyYyA9IHJlbW90ZVNzcmMuc3NyYztcbiAgfVxuXG4gIC8vIEVkZ2UgdXNlcyB0aGUgY29tcG91bmQgYXR0cmlidXRlIGluc3RlYWQgb2YgcmVkdWNlZFNpemVcbiAgLy8gY29tcG91bmQgaXMgIXJlZHVjZWRTaXplXG4gIHZhciByc2l6ZSA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9cnRjcC1yc2l6ZScpO1xuICBydGNwUGFyYW1ldGVycy5yZWR1Y2VkU2l6ZSA9IHJzaXplLmxlbmd0aCA+IDA7XG4gIHJ0Y3BQYXJhbWV0ZXJzLmNvbXBvdW5kID0gcnNpemUubGVuZ3RoID09PSAwO1xuXG4gIC8vIHBhcnNlcyB0aGUgcnRjcC1tdXggYXR0ctGWYnV0ZS5cbiAgLy8gTm90ZSB0aGF0IEVkZ2UgZG9lcyBub3Qgc3VwcG9ydCB1bm11eGVkIFJUQ1AuXG4gIHZhciBtdXggPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPXJ0Y3AtbXV4Jyk7XG4gIHJ0Y3BQYXJhbWV0ZXJzLm11eCA9IG11eC5sZW5ndGggPiAwO1xuXG4gIHJldHVybiBydGNwUGFyYW1ldGVycztcbn07XG5cbi8vIHBhcnNlcyBlaXRoZXIgYT1tc2lkOiBvciBhPXNzcmM6Li4uIG1zaWQgbGluZXMgYW5kIHJldHVybnNcbi8vIHRoZSBpZCBvZiB0aGUgTWVkaWFTdHJlYW0gYW5kIE1lZGlhU3RyZWFtVHJhY2suXG5TRFBVdGlscy5wYXJzZU1zaWQgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcbiAgdmFyIHBhcnRzO1xuICB2YXIgc3BlYyA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9bXNpZDonKTtcbiAgaWYgKHNwZWMubGVuZ3RoID09PSAxKSB7XG4gICAgcGFydHMgPSBzcGVjWzBdLnN1YnN0cig3KS5zcGxpdCgnICcpO1xuICAgIHJldHVybiB7c3RyZWFtOiBwYXJ0c1swXSwgdHJhY2s6IHBhcnRzWzFdfTtcbiAgfVxuICB2YXIgcGxhbkIgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPXNzcmM6JylcbiAgLm1hcChmdW5jdGlvbihsaW5lKSB7XG4gICAgcmV0dXJuIFNEUFV0aWxzLnBhcnNlU3NyY01lZGlhKGxpbmUpO1xuICB9KVxuICAuZmlsdGVyKGZ1bmN0aW9uKHBhcnRzKSB7XG4gICAgcmV0dXJuIHBhcnRzLmF0dHJpYnV0ZSA9PT0gJ21zaWQnO1xuICB9KTtcbiAgaWYgKHBsYW5CLmxlbmd0aCA+IDApIHtcbiAgICBwYXJ0cyA9IHBsYW5CWzBdLnZhbHVlLnNwbGl0KCcgJyk7XG4gICAgcmV0dXJuIHtzdHJlYW06IHBhcnRzWzBdLCB0cmFjazogcGFydHNbMV19O1xuICB9XG59O1xuXG4vLyBHZW5lcmF0ZSBhIHNlc3Npb24gSUQgZm9yIFNEUC5cbi8vIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9kcmFmdC1pZXRmLXJ0Y3dlYi1qc2VwLTIwI3NlY3Rpb24tNS4yLjFcbi8vIHJlY29tbWVuZHMgdXNpbmcgYSBjcnlwdG9ncmFwaGljYWxseSByYW5kb20gK3ZlIDY0LWJpdCB2YWx1ZVxuLy8gYnV0IHJpZ2h0IG5vdyB0aGlzIHNob3VsZCBiZSBhY2NlcHRhYmxlIGFuZCB3aXRoaW4gdGhlIHJpZ2h0IHJhbmdlXG5TRFBVdGlscy5nZW5lcmF0ZVNlc3Npb25JZCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygpLnN1YnN0cigyLCAyMSk7XG59O1xuXG4vLyBXcml0ZSBib2lsZGVyIHBsYXRlIGZvciBzdGFydCBvZiBTRFBcbi8vIHNlc3NJZCBhcmd1bWVudCBpcyBvcHRpb25hbCAtIGlmIG5vdCBzdXBwbGllZCBpdCB3aWxsXG4vLyBiZSBnZW5lcmF0ZWQgcmFuZG9tbHlcbi8vIHNlc3NWZXJzaW9uIGlzIG9wdGlvbmFsIGFuZCBkZWZhdWx0cyB0byAyXG5TRFBVdGlscy53cml0ZVNlc3Npb25Cb2lsZXJwbGF0ZSA9IGZ1bmN0aW9uKHNlc3NJZCwgc2Vzc1Zlcikge1xuICB2YXIgc2Vzc2lvbklkO1xuICB2YXIgdmVyc2lvbiA9IHNlc3NWZXIgIT09IHVuZGVmaW5lZCA/IHNlc3NWZXIgOiAyO1xuICBpZiAoc2Vzc0lkKSB7XG4gICAgc2Vzc2lvbklkID0gc2Vzc0lkO1xuICB9IGVsc2Uge1xuICAgIHNlc3Npb25JZCA9IFNEUFV0aWxzLmdlbmVyYXRlU2Vzc2lvbklkKCk7XG4gIH1cbiAgLy8gRklYTUU6IHNlc3MtaWQgc2hvdWxkIGJlIGFuIE5UUCB0aW1lc3RhbXAuXG4gIHJldHVybiAndj0wXFxyXFxuJyArXG4gICAgICAnbz10aGlzaXNhZGFwdGVyb3J0YyAnICsgc2Vzc2lvbklkICsgJyAnICsgdmVyc2lvbiArICcgSU4gSVA0IDEyNy4wLjAuMVxcclxcbicgK1xuICAgICAgJ3M9LVxcclxcbicgK1xuICAgICAgJ3Q9MCAwXFxyXFxuJztcbn07XG5cblNEUFV0aWxzLndyaXRlTWVkaWFTZWN0aW9uID0gZnVuY3Rpb24odHJhbnNjZWl2ZXIsIGNhcHMsIHR5cGUsIHN0cmVhbSkge1xuICB2YXIgc2RwID0gU0RQVXRpbHMud3JpdGVSdHBEZXNjcmlwdGlvbih0cmFuc2NlaXZlci5raW5kLCBjYXBzKTtcblxuICAvLyBNYXAgSUNFIHBhcmFtZXRlcnMgKHVmcmFnLCBwd2QpIHRvIFNEUC5cbiAgc2RwICs9IFNEUFV0aWxzLndyaXRlSWNlUGFyYW1ldGVycyhcbiAgICAgIHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyLmdldExvY2FsUGFyYW1ldGVycygpKTtcblxuICAvLyBNYXAgRFRMUyBwYXJhbWV0ZXJzIHRvIFNEUC5cbiAgc2RwICs9IFNEUFV0aWxzLndyaXRlRHRsc1BhcmFtZXRlcnMoXG4gICAgICB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0LmdldExvY2FsUGFyYW1ldGVycygpLFxuICAgICAgdHlwZSA9PT0gJ29mZmVyJyA/ICdhY3RwYXNzJyA6ICdhY3RpdmUnKTtcblxuICBzZHAgKz0gJ2E9bWlkOicgKyB0cmFuc2NlaXZlci5taWQgKyAnXFxyXFxuJztcblxuICBpZiAodHJhbnNjZWl2ZXIuZGlyZWN0aW9uKSB7XG4gICAgc2RwICs9ICdhPScgKyB0cmFuc2NlaXZlci5kaXJlY3Rpb24gKyAnXFxyXFxuJztcbiAgfSBlbHNlIGlmICh0cmFuc2NlaXZlci5ydHBTZW5kZXIgJiYgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIpIHtcbiAgICBzZHAgKz0gJ2E9c2VuZHJlY3ZcXHJcXG4nO1xuICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlcikge1xuICAgIHNkcCArPSAnYT1zZW5kb25seVxcclxcbic7XG4gIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIpIHtcbiAgICBzZHAgKz0gJ2E9cmVjdm9ubHlcXHJcXG4nO1xuICB9IGVsc2Uge1xuICAgIHNkcCArPSAnYT1pbmFjdGl2ZVxcclxcbic7XG4gIH1cblxuICBpZiAodHJhbnNjZWl2ZXIucnRwU2VuZGVyKSB7XG4gICAgLy8gc3BlYy5cbiAgICB2YXIgbXNpZCA9ICdtc2lkOicgKyBzdHJlYW0uaWQgKyAnICcgK1xuICAgICAgICB0cmFuc2NlaXZlci5ydHBTZW5kZXIudHJhY2suaWQgKyAnXFxyXFxuJztcbiAgICBzZHAgKz0gJ2E9JyArIG1zaWQ7XG5cbiAgICAvLyBmb3IgQ2hyb21lLlxuICAgIHNkcCArPSAnYT1zc3JjOicgKyB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmMgK1xuICAgICAgICAnICcgKyBtc2lkO1xuICAgIGlmICh0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCkge1xuICAgICAgc2RwICs9ICdhPXNzcmM6JyArIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4LnNzcmMgK1xuICAgICAgICAgICcgJyArIG1zaWQ7XG4gICAgICBzZHAgKz0gJ2E9c3NyYy1ncm91cDpGSUQgJyArXG4gICAgICAgICAgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjICsgJyAnICtcbiAgICAgICAgICB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eC5zc3JjICtcbiAgICAgICAgICAnXFxyXFxuJztcbiAgICB9XG4gIH1cbiAgLy8gRklYTUU6IHRoaXMgc2hvdWxkIGJlIHdyaXR0ZW4gYnkgd3JpdGVSdHBEZXNjcmlwdGlvbi5cbiAgc2RwICs9ICdhPXNzcmM6JyArIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYyArXG4gICAgICAnIGNuYW1lOicgKyBTRFBVdGlscy5sb2NhbENOYW1lICsgJ1xcclxcbic7XG4gIGlmICh0cmFuc2NlaXZlci5ydHBTZW5kZXIgJiYgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHgpIHtcbiAgICBzZHAgKz0gJ2E9c3NyYzonICsgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHguc3NyYyArXG4gICAgICAgICcgY25hbWU6JyArIFNEUFV0aWxzLmxvY2FsQ05hbWUgKyAnXFxyXFxuJztcbiAgfVxuICByZXR1cm4gc2RwO1xufTtcblxuLy8gR2V0cyB0aGUgZGlyZWN0aW9uIGZyb20gdGhlIG1lZGlhU2VjdGlvbiBvciB0aGUgc2Vzc2lvbnBhcnQuXG5TRFBVdGlscy5nZXREaXJlY3Rpb24gPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24sIHNlc3Npb25wYXJ0KSB7XG4gIC8vIExvb2sgZm9yIHNlbmRyZWN2LCBzZW5kb25seSwgcmVjdm9ubHksIGluYWN0aXZlLCBkZWZhdWx0IHRvIHNlbmRyZWN2LlxuICB2YXIgbGluZXMgPSBTRFBVdGlscy5zcGxpdExpbmVzKG1lZGlhU2VjdGlvbik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICBzd2l0Y2ggKGxpbmVzW2ldKSB7XG4gICAgICBjYXNlICdhPXNlbmRyZWN2JzpcbiAgICAgIGNhc2UgJ2E9c2VuZG9ubHknOlxuICAgICAgY2FzZSAnYT1yZWN2b25seSc6XG4gICAgICBjYXNlICdhPWluYWN0aXZlJzpcbiAgICAgICAgcmV0dXJuIGxpbmVzW2ldLnN1YnN0cigyKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIEZJWE1FOiBXaGF0IHNob3VsZCBoYXBwZW4gaGVyZT9cbiAgICB9XG4gIH1cbiAgaWYgKHNlc3Npb25wYXJ0KSB7XG4gICAgcmV0dXJuIFNEUFV0aWxzLmdldERpcmVjdGlvbihzZXNzaW9ucGFydCk7XG4gIH1cbiAgcmV0dXJuICdzZW5kcmVjdic7XG59O1xuXG5TRFBVdGlscy5nZXRLaW5kID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XG4gIHZhciBsaW5lcyA9IFNEUFV0aWxzLnNwbGl0TGluZXMobWVkaWFTZWN0aW9uKTtcbiAgdmFyIG1saW5lID0gbGluZXNbMF0uc3BsaXQoJyAnKTtcbiAgcmV0dXJuIG1saW5lWzBdLnN1YnN0cigyKTtcbn07XG5cblNEUFV0aWxzLmlzUmVqZWN0ZWQgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcbiAgcmV0dXJuIG1lZGlhU2VjdGlvbi5zcGxpdCgnICcsIDIpWzFdID09PSAnMCc7XG59O1xuXG5TRFBVdGlscy5wYXJzZU1MaW5lID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XG4gIHZhciBsaW5lcyA9IFNEUFV0aWxzLnNwbGl0TGluZXMobWVkaWFTZWN0aW9uKTtcbiAgdmFyIHBhcnRzID0gbGluZXNbMF0uc3Vic3RyKDIpLnNwbGl0KCcgJyk7XG4gIHJldHVybiB7XG4gICAga2luZDogcGFydHNbMF0sXG4gICAgcG9ydDogcGFyc2VJbnQocGFydHNbMV0sIDEwKSxcbiAgICBwcm90b2NvbDogcGFydHNbMl0sXG4gICAgZm10OiBwYXJ0cy5zbGljZSgzKS5qb2luKCcgJylcbiAgfTtcbn07XG5cblNEUFV0aWxzLnBhcnNlT0xpbmUgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcbiAgdmFyIGxpbmUgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdvPScpWzBdO1xuICB2YXIgcGFydHMgPSBsaW5lLnN1YnN0cigyKS5zcGxpdCgnICcpO1xuICByZXR1cm4ge1xuICAgIHVzZXJuYW1lOiBwYXJ0c1swXSxcbiAgICBzZXNzaW9uSWQ6IHBhcnRzWzFdLFxuICAgIHNlc3Npb25WZXJzaW9uOiBwYXJzZUludChwYXJ0c1syXSwgMTApLFxuICAgIG5ldFR5cGU6IHBhcnRzWzNdLFxuICAgIGFkZHJlc3NUeXBlOiBwYXJ0c1s0XSxcbiAgICBhZGRyZXNzOiBwYXJ0c1s1XSxcbiAgfTtcbn1cblxuLy8gRXhwb3NlIHB1YmxpYyBtZXRob2RzLlxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gU0RQVXRpbHM7XG59XG5cbn0se31dLDM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uIChnbG9iYWwpe1xuLypcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcbiAqICB0cmVlLlxuICovXG4gLyogZXNsaW50LWVudiBub2RlICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGFkYXB0ZXJGYWN0b3J5ID0gcmVxdWlyZSgnLi9hZGFwdGVyX2ZhY3RvcnkuanMnKTtcbm1vZHVsZS5leHBvcnRzID0gYWRhcHRlckZhY3Rvcnkoe3dpbmRvdzogZ2xvYmFsLndpbmRvd30pO1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbn0se1wiLi9hZGFwdGVyX2ZhY3RvcnkuanNcIjo0fV0sNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vKlxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxuICogIHRyZWUuXG4gKi9cbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG4vLyBTaGltbWluZyBzdGFydHMgaGVyZS5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZGVwZW5kZW5jaWVzLCBvcHRzKSB7XG4gIHZhciB3aW5kb3cgPSBkZXBlbmRlbmNpZXMgJiYgZGVwZW5kZW5jaWVzLndpbmRvdztcblxuICB2YXIgb3B0aW9ucyA9IHtcbiAgICBzaGltQ2hyb21lOiB0cnVlLFxuICAgIHNoaW1GaXJlZm94OiB0cnVlLFxuICAgIHNoaW1FZGdlOiB0cnVlLFxuICAgIHNoaW1TYWZhcmk6IHRydWUsXG4gIH07XG5cbiAgZm9yICh2YXIga2V5IGluIG9wdHMpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvcHRzLCBrZXkpKSB7XG4gICAgICBvcHRpb25zW2tleV0gPSBvcHRzW2tleV07XG4gICAgfVxuICB9XG5cbiAgLy8gVXRpbHMuXG4gIHZhciBsb2dnaW5nID0gdXRpbHMubG9nO1xuICB2YXIgYnJvd3NlckRldGFpbHMgPSB1dGlscy5kZXRlY3RCcm93c2VyKHdpbmRvdyk7XG5cbiAgLy8gVW5jb21tZW50IHRoZSBsaW5lIGJlbG93IGlmIHlvdSB3YW50IGxvZ2dpbmcgdG8gb2NjdXIsIGluY2x1ZGluZyBsb2dnaW5nXG4gIC8vIGZvciB0aGUgc3dpdGNoIHN0YXRlbWVudCBiZWxvdy4gQ2FuIGFsc28gYmUgdHVybmVkIG9uIGluIHRoZSBicm93c2VyIHZpYVxuICAvLyBhZGFwdGVyLmRpc2FibGVMb2coZmFsc2UpLCBidXQgdGhlbiBsb2dnaW5nIGZyb20gdGhlIHN3aXRjaCBzdGF0ZW1lbnQgYmVsb3dcbiAgLy8gd2lsbCBub3QgYXBwZWFyLlxuICAvLyByZXF1aXJlKCcuL3V0aWxzJykuZGlzYWJsZUxvZyhmYWxzZSk7XG5cbiAgLy8gQnJvd3NlciBzaGltcy5cbiAgdmFyIGNocm9tZVNoaW0gPSByZXF1aXJlKCcuL2Nocm9tZS9jaHJvbWVfc2hpbScpIHx8IG51bGw7XG4gIHZhciBlZGdlU2hpbSA9IHJlcXVpcmUoJy4vZWRnZS9lZGdlX3NoaW0nKSB8fCBudWxsO1xuICB2YXIgZmlyZWZveFNoaW0gPSByZXF1aXJlKCcuL2ZpcmVmb3gvZmlyZWZveF9zaGltJykgfHwgbnVsbDtcbiAgdmFyIHNhZmFyaVNoaW0gPSByZXF1aXJlKCcuL3NhZmFyaS9zYWZhcmlfc2hpbScpIHx8IG51bGw7XG4gIHZhciBjb21tb25TaGltID0gcmVxdWlyZSgnLi9jb21tb25fc2hpbScpIHx8IG51bGw7XG5cbiAgLy8gRXhwb3J0IHRvIHRoZSBhZGFwdGVyIGdsb2JhbCBvYmplY3QgdmlzaWJsZSBpbiB0aGUgYnJvd3Nlci5cbiAgdmFyIGFkYXB0ZXIgPSB7XG4gICAgYnJvd3NlckRldGFpbHM6IGJyb3dzZXJEZXRhaWxzLFxuICAgIGNvbW1vblNoaW06IGNvbW1vblNoaW0sXG4gICAgZXh0cmFjdFZlcnNpb246IHV0aWxzLmV4dHJhY3RWZXJzaW9uLFxuICAgIGRpc2FibGVMb2c6IHV0aWxzLmRpc2FibGVMb2csXG4gICAgZGlzYWJsZVdhcm5pbmdzOiB1dGlscy5kaXNhYmxlV2FybmluZ3NcbiAgfTtcblxuICAvLyBTaGltIGJyb3dzZXIgaWYgZm91bmQuXG4gIHN3aXRjaCAoYnJvd3NlckRldGFpbHMuYnJvd3Nlcikge1xuICAgIGNhc2UgJ2Nocm9tZSc6XG4gICAgICBpZiAoIWNocm9tZVNoaW0gfHwgIWNocm9tZVNoaW0uc2hpbVBlZXJDb25uZWN0aW9uIHx8XG4gICAgICAgICAgIW9wdGlvbnMuc2hpbUNocm9tZSkge1xuICAgICAgICBsb2dnaW5nKCdDaHJvbWUgc2hpbSBpcyBub3QgaW5jbHVkZWQgaW4gdGhpcyBhZGFwdGVyIHJlbGVhc2UuJyk7XG4gICAgICAgIHJldHVybiBhZGFwdGVyO1xuICAgICAgfVxuICAgICAgbG9nZ2luZygnYWRhcHRlci5qcyBzaGltbWluZyBjaHJvbWUuJyk7XG4gICAgICAvLyBFeHBvcnQgdG8gdGhlIGFkYXB0ZXIgZ2xvYmFsIG9iamVjdCB2aXNpYmxlIGluIHRoZSBicm93c2VyLlxuICAgICAgYWRhcHRlci5icm93c2VyU2hpbSA9IGNocm9tZVNoaW07XG4gICAgICBjb21tb25TaGltLnNoaW1DcmVhdGVPYmplY3RVUkwod2luZG93KTtcblxuICAgICAgY2hyb21lU2hpbS5zaGltR2V0VXNlck1lZGlhKHdpbmRvdyk7XG4gICAgICBjaHJvbWVTaGltLnNoaW1NZWRpYVN0cmVhbSh3aW5kb3cpO1xuICAgICAgY2hyb21lU2hpbS5zaGltU291cmNlT2JqZWN0KHdpbmRvdyk7XG4gICAgICBjaHJvbWVTaGltLnNoaW1QZWVyQ29ubmVjdGlvbih3aW5kb3cpO1xuICAgICAgY2hyb21lU2hpbS5zaGltT25UcmFjayh3aW5kb3cpO1xuICAgICAgY2hyb21lU2hpbS5zaGltQWRkVHJhY2tSZW1vdmVUcmFjayh3aW5kb3cpO1xuICAgICAgY2hyb21lU2hpbS5zaGltR2V0U2VuZGVyc1dpdGhEdG1mKHdpbmRvdyk7XG5cbiAgICAgIGNvbW1vblNoaW0uc2hpbVJUQ0ljZUNhbmRpZGF0ZSh3aW5kb3cpO1xuICAgICAgY29tbW9uU2hpbS5zaGltTWF4TWVzc2FnZVNpemUod2luZG93KTtcbiAgICAgIGNvbW1vblNoaW0uc2hpbVNlbmRUaHJvd1R5cGVFcnJvcih3aW5kb3cpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnZmlyZWZveCc6XG4gICAgICBpZiAoIWZpcmVmb3hTaGltIHx8ICFmaXJlZm94U2hpbS5zaGltUGVlckNvbm5lY3Rpb24gfHxcbiAgICAgICAgICAhb3B0aW9ucy5zaGltRmlyZWZveCkge1xuICAgICAgICBsb2dnaW5nKCdGaXJlZm94IHNoaW0gaXMgbm90IGluY2x1ZGVkIGluIHRoaXMgYWRhcHRlciByZWxlYXNlLicpO1xuICAgICAgICByZXR1cm4gYWRhcHRlcjtcbiAgICAgIH1cbiAgICAgIGxvZ2dpbmcoJ2FkYXB0ZXIuanMgc2hpbW1pbmcgZmlyZWZveC4nKTtcbiAgICAgIC8vIEV4cG9ydCB0byB0aGUgYWRhcHRlciBnbG9iYWwgb2JqZWN0IHZpc2libGUgaW4gdGhlIGJyb3dzZXIuXG4gICAgICBhZGFwdGVyLmJyb3dzZXJTaGltID0gZmlyZWZveFNoaW07XG4gICAgICBjb21tb25TaGltLnNoaW1DcmVhdGVPYmplY3RVUkwod2luZG93KTtcblxuICAgICAgZmlyZWZveFNoaW0uc2hpbUdldFVzZXJNZWRpYSh3aW5kb3cpO1xuICAgICAgZmlyZWZveFNoaW0uc2hpbVNvdXJjZU9iamVjdCh3aW5kb3cpO1xuICAgICAgZmlyZWZveFNoaW0uc2hpbVBlZXJDb25uZWN0aW9uKHdpbmRvdyk7XG4gICAgICBmaXJlZm94U2hpbS5zaGltT25UcmFjayh3aW5kb3cpO1xuICAgICAgZmlyZWZveFNoaW0uc2hpbVJlbW92ZVN0cmVhbSh3aW5kb3cpO1xuXG4gICAgICBjb21tb25TaGltLnNoaW1SVENJY2VDYW5kaWRhdGUod2luZG93KTtcbiAgICAgIGNvbW1vblNoaW0uc2hpbU1heE1lc3NhZ2VTaXplKHdpbmRvdyk7XG4gICAgICBjb21tb25TaGltLnNoaW1TZW5kVGhyb3dUeXBlRXJyb3Iod2luZG93KTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2VkZ2UnOlxuICAgICAgaWYgKCFlZGdlU2hpbSB8fCAhZWRnZVNoaW0uc2hpbVBlZXJDb25uZWN0aW9uIHx8ICFvcHRpb25zLnNoaW1FZGdlKSB7XG4gICAgICAgIGxvZ2dpbmcoJ01TIGVkZ2Ugc2hpbSBpcyBub3QgaW5jbHVkZWQgaW4gdGhpcyBhZGFwdGVyIHJlbGVhc2UuJyk7XG4gICAgICAgIHJldHVybiBhZGFwdGVyO1xuICAgICAgfVxuICAgICAgbG9nZ2luZygnYWRhcHRlci5qcyBzaGltbWluZyBlZGdlLicpO1xuICAgICAgLy8gRXhwb3J0IHRvIHRoZSBhZGFwdGVyIGdsb2JhbCBvYmplY3QgdmlzaWJsZSBpbiB0aGUgYnJvd3Nlci5cbiAgICAgIGFkYXB0ZXIuYnJvd3NlclNoaW0gPSBlZGdlU2hpbTtcbiAgICAgIGNvbW1vblNoaW0uc2hpbUNyZWF0ZU9iamVjdFVSTCh3aW5kb3cpO1xuXG4gICAgICBlZGdlU2hpbS5zaGltR2V0VXNlck1lZGlhKHdpbmRvdyk7XG4gICAgICBlZGdlU2hpbS5zaGltUGVlckNvbm5lY3Rpb24od2luZG93KTtcbiAgICAgIGVkZ2VTaGltLnNoaW1SZXBsYWNlVHJhY2sod2luZG93KTtcblxuICAgICAgLy8gdGhlIGVkZ2Ugc2hpbSBpbXBsZW1lbnRzIHRoZSBmdWxsIFJUQ0ljZUNhbmRpZGF0ZSBvYmplY3QuXG5cbiAgICAgIGNvbW1vblNoaW0uc2hpbU1heE1lc3NhZ2VTaXplKHdpbmRvdyk7XG4gICAgICBjb21tb25TaGltLnNoaW1TZW5kVGhyb3dUeXBlRXJyb3Iod2luZG93KTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3NhZmFyaSc6XG4gICAgICBpZiAoIXNhZmFyaVNoaW0gfHwgIW9wdGlvbnMuc2hpbVNhZmFyaSkge1xuICAgICAgICBsb2dnaW5nKCdTYWZhcmkgc2hpbSBpcyBub3QgaW5jbHVkZWQgaW4gdGhpcyBhZGFwdGVyIHJlbGVhc2UuJyk7XG4gICAgICAgIHJldHVybiBhZGFwdGVyO1xuICAgICAgfVxuICAgICAgbG9nZ2luZygnYWRhcHRlci5qcyBzaGltbWluZyBzYWZhcmkuJyk7XG4gICAgICAvLyBFeHBvcnQgdG8gdGhlIGFkYXB0ZXIgZ2xvYmFsIG9iamVjdCB2aXNpYmxlIGluIHRoZSBicm93c2VyLlxuICAgICAgYWRhcHRlci5icm93c2VyU2hpbSA9IHNhZmFyaVNoaW07XG4gICAgICBjb21tb25TaGltLnNoaW1DcmVhdGVPYmplY3RVUkwod2luZG93KTtcblxuICAgICAgc2FmYXJpU2hpbS5zaGltUlRDSWNlU2VydmVyVXJscyh3aW5kb3cpO1xuICAgICAgc2FmYXJpU2hpbS5zaGltQ2FsbGJhY2tzQVBJKHdpbmRvdyk7XG4gICAgICBzYWZhcmlTaGltLnNoaW1Mb2NhbFN0cmVhbXNBUEkod2luZG93KTtcbiAgICAgIHNhZmFyaVNoaW0uc2hpbVJlbW90ZVN0cmVhbXNBUEkod2luZG93KTtcbiAgICAgIHNhZmFyaVNoaW0uc2hpbVRyYWNrRXZlbnRUcmFuc2NlaXZlcih3aW5kb3cpO1xuICAgICAgc2FmYXJpU2hpbS5zaGltR2V0VXNlck1lZGlhKHdpbmRvdyk7XG4gICAgICBzYWZhcmlTaGltLnNoaW1DcmVhdGVPZmZlckxlZ2FjeSh3aW5kb3cpO1xuXG4gICAgICBjb21tb25TaGltLnNoaW1SVENJY2VDYW5kaWRhdGUod2luZG93KTtcbiAgICAgIGNvbW1vblNoaW0uc2hpbU1heE1lc3NhZ2VTaXplKHdpbmRvdyk7XG4gICAgICBjb21tb25TaGltLnNoaW1TZW5kVGhyb3dUeXBlRXJyb3Iod2luZG93KTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBsb2dnaW5nKCdVbnN1cHBvcnRlZCBicm93c2VyIScpO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICByZXR1cm4gYWRhcHRlcjtcbn07XG5cbn0se1wiLi9jaHJvbWUvY2hyb21lX3NoaW1cIjo1LFwiLi9jb21tb25fc2hpbVwiOjcsXCIuL2VkZ2UvZWRnZV9zaGltXCI6OCxcIi4vZmlyZWZveC9maXJlZm94X3NoaW1cIjoxMCxcIi4vc2FmYXJpL3NhZmFyaV9zaGltXCI6MTIsXCIuL3V0aWxzXCI6MTN9XSw1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxuLypcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcbiAqICB0cmVlLlxuICovXG4gLyogZXNsaW50LWVudiBub2RlICovXG4ndXNlIHN0cmljdCc7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscy5qcycpO1xudmFyIGxvZ2dpbmcgPSB1dGlscy5sb2c7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzaGltR2V0VXNlck1lZGlhOiByZXF1aXJlKCcuL2dldHVzZXJtZWRpYScpLFxuICBzaGltTWVkaWFTdHJlYW06IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIHdpbmRvdy5NZWRpYVN0cmVhbSA9IHdpbmRvdy5NZWRpYVN0cmVhbSB8fCB3aW5kb3cud2Via2l0TWVkaWFTdHJlYW07XG4gIH0sXG5cbiAgc2hpbU9uVHJhY2s6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gJiYgISgnb250cmFjaycgaW5cbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLCAnb250cmFjaycsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fb250cmFjaztcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbihmKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX29udHJhY2spIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhY2snLCB0aGlzLl9vbnRyYWNrKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCd0cmFjaycsIHRoaXMuX29udHJhY2sgPSBmKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB2YXIgb3JpZ1NldFJlbW90ZURlc2NyaXB0aW9uID1cbiAgICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnNldFJlbW90ZURlc2NyaXB0aW9uO1xuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5zZXRSZW1vdGVEZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgICBpZiAoIXBjLl9vbnRyYWNrcG9seSkge1xuICAgICAgICAgIHBjLl9vbnRyYWNrcG9seSA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIC8vIG9uYWRkc3RyZWFtIGRvZXMgbm90IGZpcmUgd2hlbiBhIHRyYWNrIGlzIGFkZGVkIHRvIGFuIGV4aXN0aW5nXG4gICAgICAgICAgICAvLyBzdHJlYW0uIEJ1dCBzdHJlYW0ub25hZGR0cmFjayBpcyBpbXBsZW1lbnRlZCBzbyB3ZSB1c2UgdGhhdC5cbiAgICAgICAgICAgIGUuc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoJ2FkZHRyYWNrJywgZnVuY3Rpb24odGUpIHtcbiAgICAgICAgICAgICAgdmFyIHJlY2VpdmVyO1xuICAgICAgICAgICAgICBpZiAod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRSZWNlaXZlcnMpIHtcbiAgICAgICAgICAgICAgICByZWNlaXZlciA9IHBjLmdldFJlY2VpdmVycygpLmZpbmQoZnVuY3Rpb24ocikge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHIudHJhY2sgJiYgci50cmFjay5pZCA9PT0gdGUudHJhY2suaWQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVjZWl2ZXIgPSB7dHJhY2s6IHRlLnRyYWNrfTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgndHJhY2snKTtcbiAgICAgICAgICAgICAgZXZlbnQudHJhY2sgPSB0ZS50cmFjaztcbiAgICAgICAgICAgICAgZXZlbnQucmVjZWl2ZXIgPSByZWNlaXZlcjtcbiAgICAgICAgICAgICAgZXZlbnQudHJhbnNjZWl2ZXIgPSB7cmVjZWl2ZXI6IHJlY2VpdmVyfTtcbiAgICAgICAgICAgICAgZXZlbnQuc3RyZWFtcyA9IFtlLnN0cmVhbV07XG4gICAgICAgICAgICAgIHBjLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBlLnN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XG4gICAgICAgICAgICAgIHZhciByZWNlaXZlcjtcbiAgICAgICAgICAgICAgaWYgKHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0UmVjZWl2ZXJzKSB7XG4gICAgICAgICAgICAgICAgcmVjZWl2ZXIgPSBwYy5nZXRSZWNlaXZlcnMoKS5maW5kKGZ1bmN0aW9uKHIpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiByLnRyYWNrICYmIHIudHJhY2suaWQgPT09IHRyYWNrLmlkO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlY2VpdmVyID0ge3RyYWNrOiB0cmFja307XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCd0cmFjaycpO1xuICAgICAgICAgICAgICBldmVudC50cmFjayA9IHRyYWNrO1xuICAgICAgICAgICAgICBldmVudC5yZWNlaXZlciA9IHJlY2VpdmVyO1xuICAgICAgICAgICAgICBldmVudC50cmFuc2NlaXZlciA9IHtyZWNlaXZlcjogcmVjZWl2ZXJ9O1xuICAgICAgICAgICAgICBldmVudC5zdHJlYW1zID0gW2Uuc3RyZWFtXTtcbiAgICAgICAgICAgICAgcGMuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHBjLmFkZEV2ZW50TGlzdGVuZXIoJ2FkZHN0cmVhbScsIHBjLl9vbnRyYWNrcG9seSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9yaWdTZXRSZW1vdGVEZXNjcmlwdGlvbi5hcHBseShwYywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmICghKCdSVENSdHBUcmFuc2NlaXZlcicgaW4gd2luZG93KSkge1xuICAgICAgdXRpbHMud3JhcFBlZXJDb25uZWN0aW9uRXZlbnQod2luZG93LCAndHJhY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICghZS50cmFuc2NlaXZlcikge1xuICAgICAgICAgIGUudHJhbnNjZWl2ZXIgPSB7cmVjZWl2ZXI6IGUucmVjZWl2ZXJ9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlO1xuICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIHNoaW1HZXRTZW5kZXJzV2l0aER0bWY6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIC8vIE92ZXJyaWRlcyBhZGRUcmFjay9yZW1vdmVUcmFjaywgZGVwZW5kcyBvbiBzaGltQWRkVHJhY2tSZW1vdmVUcmFjay5cbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uICYmXG4gICAgICAgICEoJ2dldFNlbmRlcnMnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpICYmXG4gICAgICAgICdjcmVhdGVEVE1GU2VuZGVyJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSB7XG4gICAgICB2YXIgc2hpbVNlbmRlcldpdGhEdG1mID0gZnVuY3Rpb24ocGMsIHRyYWNrKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdHJhY2s6IHRyYWNrLFxuICAgICAgICAgIGdldCBkdG1mKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2R0bWYgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBpZiAodHJhY2sua2luZCA9PT0gJ2F1ZGlvJykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2R0bWYgPSBwYy5jcmVhdGVEVE1GU2VuZGVyKHRyYWNrKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kdG1mID0gbnVsbDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2R0bWY7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBfcGM6IHBjXG4gICAgICAgIH07XG4gICAgICB9O1xuXG4gICAgICAvLyBhdWdtZW50IGFkZFRyYWNrIHdoZW4gZ2V0U2VuZGVycyBpcyBub3QgYXZhaWxhYmxlLlxuICAgICAgaWYgKCF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFNlbmRlcnMpIHtcbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTZW5kZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGhpcy5fc2VuZGVycyA9IHRoaXMuX3NlbmRlcnMgfHwgW107XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX3NlbmRlcnMuc2xpY2UoKTsgLy8gcmV0dXJuIGEgY29weSBvZiB0aGUgaW50ZXJuYWwgc3RhdGUuXG4gICAgICAgIH07XG4gICAgICAgIHZhciBvcmlnQWRkVHJhY2sgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFRyYWNrO1xuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFRyYWNrID0gZnVuY3Rpb24odHJhY2ssIHN0cmVhbSkge1xuICAgICAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICAgICAgdmFyIHNlbmRlciA9IG9yaWdBZGRUcmFjay5hcHBseShwYywgYXJndW1lbnRzKTtcbiAgICAgICAgICBpZiAoIXNlbmRlcikge1xuICAgICAgICAgICAgc2VuZGVyID0gc2hpbVNlbmRlcldpdGhEdG1mKHBjLCB0cmFjayk7XG4gICAgICAgICAgICBwYy5fc2VuZGVycy5wdXNoKHNlbmRlcik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBzZW5kZXI7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIG9yaWdSZW1vdmVUcmFjayA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlVHJhY2s7XG4gICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlVHJhY2sgPSBmdW5jdGlvbihzZW5kZXIpIHtcbiAgICAgICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgICAgIG9yaWdSZW1vdmVUcmFjay5hcHBseShwYywgYXJndW1lbnRzKTtcbiAgICAgICAgICB2YXIgaWR4ID0gcGMuX3NlbmRlcnMuaW5kZXhPZihzZW5kZXIpO1xuICAgICAgICAgIGlmIChpZHggIT09IC0xKSB7XG4gICAgICAgICAgICBwYy5fc2VuZGVycy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICB2YXIgb3JpZ0FkZFN0cmVhbSA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkU3RyZWFtO1xuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgICAgcGMuX3NlbmRlcnMgPSBwYy5fc2VuZGVycyB8fCBbXTtcbiAgICAgICAgb3JpZ0FkZFN0cmVhbS5hcHBseShwYywgW3N0cmVhbV0pO1xuICAgICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xuICAgICAgICAgIHBjLl9zZW5kZXJzLnB1c2goc2hpbVNlbmRlcldpdGhEdG1mKHBjLCB0cmFjaykpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIHZhciBvcmlnUmVtb3ZlU3RyZWFtID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVTdHJlYW07XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgICBwYy5fc2VuZGVycyA9IHBjLl9zZW5kZXJzIHx8IFtdO1xuICAgICAgICBvcmlnUmVtb3ZlU3RyZWFtLmFwcGx5KHBjLCBbc3RyZWFtXSk7XG5cbiAgICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcbiAgICAgICAgICB2YXIgc2VuZGVyID0gcGMuX3NlbmRlcnMuZmluZChmdW5jdGlvbihzKSB7XG4gICAgICAgICAgICByZXR1cm4gcy50cmFjayA9PT0gdHJhY2s7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKHNlbmRlcikge1xuICAgICAgICAgICAgcGMuX3NlbmRlcnMuc3BsaWNlKHBjLl9zZW5kZXJzLmluZGV4T2Yoc2VuZGVyKSwgMSk7IC8vIHJlbW92ZSBzZW5kZXJcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiAmJlxuICAgICAgICAgICAgICAgJ2dldFNlbmRlcnMnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUgJiZcbiAgICAgICAgICAgICAgICdjcmVhdGVEVE1GU2VuZGVyJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlICYmXG4gICAgICAgICAgICAgICB3aW5kb3cuUlRDUnRwU2VuZGVyICYmXG4gICAgICAgICAgICAgICAhKCdkdG1mJyBpbiB3aW5kb3cuUlRDUnRwU2VuZGVyLnByb3RvdHlwZSkpIHtcbiAgICAgIHZhciBvcmlnR2V0U2VuZGVycyA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U2VuZGVycztcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U2VuZGVycyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgICB2YXIgc2VuZGVycyA9IG9yaWdHZXRTZW5kZXJzLmFwcGx5KHBjLCBbXSk7XG4gICAgICAgIHNlbmRlcnMuZm9yRWFjaChmdW5jdGlvbihzZW5kZXIpIHtcbiAgICAgICAgICBzZW5kZXIuX3BjID0gcGM7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc2VuZGVycztcbiAgICAgIH07XG5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUnRwU2VuZGVyLnByb3RvdHlwZSwgJ2R0bWYnLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX2R0bWYgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMudHJhY2sua2luZCA9PT0gJ2F1ZGlvJykge1xuICAgICAgICAgICAgICB0aGlzLl9kdG1mID0gdGhpcy5fcGMuY3JlYXRlRFRNRlNlbmRlcih0aGlzLnRyYWNrKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuX2R0bWYgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhpcy5fZHRtZjtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIHNoaW1Tb3VyY2VPYmplY3Q6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIHZhciBVUkwgPSB3aW5kb3cgJiYgd2luZG93LlVSTDtcblxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50ICYmXG4gICAgICAgICEoJ3NyY09iamVjdCcgaW4gd2luZG93LkhUTUxNZWRpYUVsZW1lbnQucHJvdG90eXBlKSkge1xuICAgICAgICAvLyBTaGltIHRoZSBzcmNPYmplY3QgcHJvcGVydHksIG9uY2UsIHdoZW4gSFRNTE1lZGlhRWxlbWVudCBpcyBmb3VuZC5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50LnByb3RvdHlwZSwgJ3NyY09iamVjdCcsIHtcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NyY09iamVjdDtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNldDogZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAvLyBVc2UgX3NyY09iamVjdCBhcyBhIHByaXZhdGUgcHJvcGVydHkgZm9yIHRoaXMgc2hpbVxuICAgICAgICAgICAgdGhpcy5fc3JjT2JqZWN0ID0gc3RyZWFtO1xuICAgICAgICAgICAgaWYgKHRoaXMuc3JjKSB7XG4gICAgICAgICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwodGhpcy5zcmMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXN0cmVhbSkge1xuICAgICAgICAgICAgICB0aGlzLnNyYyA9ICcnO1xuICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKHN0cmVhbSk7XG4gICAgICAgICAgICAvLyBXZSBuZWVkIHRvIHJlY3JlYXRlIHRoZSBibG9iIHVybCB3aGVuIGEgdHJhY2sgaXMgYWRkZWQgb3JcbiAgICAgICAgICAgIC8vIHJlbW92ZWQuIERvaW5nIGl0IG1hbnVhbGx5IHNpbmNlIHdlIHdhbnQgdG8gYXZvaWQgYSByZWN1cnNpb24uXG4gICAgICAgICAgICBzdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcignYWRkdHJhY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYgKHNlbGYuc3JjKSB7XG4gICAgICAgICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChzZWxmLnNyYyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2VsZi5zcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKHN0cmVhbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHN0cmVhbS5hZGRFdmVudExpc3RlbmVyKCdyZW1vdmV0cmFjaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBpZiAoc2VsZi5zcmMpIHtcbiAgICAgICAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHNlbGYuc3JjKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzZWxmLnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoc3RyZWFtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHNoaW1BZGRUcmFja1JlbW92ZVRyYWNrV2l0aE5hdGl2ZTogZnVuY3Rpb24od2luZG93KSB7XG4gICAgLy8gc2hpbSBhZGRUcmFjay9yZW1vdmVUcmFjayB3aXRoIG5hdGl2ZSB2YXJpYW50cyBpbiBvcmRlciB0byBtYWtlXG4gICAgLy8gdGhlIGludGVyYWN0aW9ucyB3aXRoIGxlZ2FjeSBnZXRMb2NhbFN0cmVhbXMgYmVoYXZlIGFzIGluIG90aGVyIGJyb3dzZXJzLlxuICAgIC8vIEtlZXBzIGEgbWFwcGluZyBzdHJlYW0uaWQgPT4gW3N0cmVhbSwgcnRwc2VuZGVycy4uLl1cbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldExvY2FsU3RyZWFtcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgIHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMgPSB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zIHx8IHt9O1xuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMpLm1hcChmdW5jdGlvbihzdHJlYW1JZCkge1xuICAgICAgICByZXR1cm4gcGMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtSWRdWzBdO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBvcmlnQWRkVHJhY2sgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFRyYWNrO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2sgPSBmdW5jdGlvbih0cmFjaywgc3RyZWFtKSB7XG4gICAgICBpZiAoIXN0cmVhbSkge1xuICAgICAgICByZXR1cm4gb3JpZ0FkZFRyYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgICB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zID0gdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcyB8fCB7fTtcblxuICAgICAgdmFyIHNlbmRlciA9IG9yaWdBZGRUcmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgaWYgKCF0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbS5pZF0pIHtcbiAgICAgICAgdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW0uaWRdID0gW3N0cmVhbSwgc2VuZGVyXTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW0uaWRdLmluZGV4T2Yoc2VuZGVyKSA9PT0gLTEpIHtcbiAgICAgICAgdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW0uaWRdLnB1c2goc2VuZGVyKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZW5kZXI7XG4gICAgfTtcblxuICAgIHZhciBvcmlnQWRkU3RyZWFtID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRTdHJlYW07XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zID0gdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcyB8fCB7fTtcblxuICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcbiAgICAgICAgdmFyIGFscmVhZHlFeGlzdHMgPSBwYy5nZXRTZW5kZXJzKCkuZmluZChmdW5jdGlvbihzKSB7XG4gICAgICAgICAgcmV0dXJuIHMudHJhY2sgPT09IHRyYWNrO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGFscmVhZHlFeGlzdHMpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKCdUcmFjayBhbHJlYWR5IGV4aXN0cy4nLFxuICAgICAgICAgICAgICAnSW52YWxpZEFjY2Vzc0Vycm9yJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdmFyIGV4aXN0aW5nU2VuZGVycyA9IHBjLmdldFNlbmRlcnMoKTtcbiAgICAgIG9yaWdBZGRTdHJlYW0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIHZhciBuZXdTZW5kZXJzID0gcGMuZ2V0U2VuZGVycygpLmZpbHRlcihmdW5jdGlvbihuZXdTZW5kZXIpIHtcbiAgICAgICAgcmV0dXJuIGV4aXN0aW5nU2VuZGVycy5pbmRleE9mKG5ld1NlbmRlcikgPT09IC0xO1xuICAgICAgfSk7XG4gICAgICB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbS5pZF0gPSBbc3RyZWFtXS5jb25jYXQobmV3U2VuZGVycyk7XG4gICAgfTtcblxuICAgIHZhciBvcmlnUmVtb3ZlU3RyZWFtID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVTdHJlYW07XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgIHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMgPSB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zIHx8IHt9O1xuICAgICAgZGVsZXRlIHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtLmlkXTtcbiAgICAgIHJldHVybiBvcmlnUmVtb3ZlU3RyZWFtLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcblxuICAgIHZhciBvcmlnUmVtb3ZlVHJhY2sgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVRyYWNrO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlVHJhY2sgPSBmdW5jdGlvbihzZW5kZXIpIHtcbiAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zID0gdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcyB8fCB7fTtcbiAgICAgIGlmIChzZW5kZXIpIHtcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcykuZm9yRWFjaChmdW5jdGlvbihzdHJlYW1JZCkge1xuICAgICAgICAgIHZhciBpZHggPSBwYy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW1JZF0uaW5kZXhPZihzZW5kZXIpO1xuICAgICAgICAgIGlmIChpZHggIT09IC0xKSB7XG4gICAgICAgICAgICBwYy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW1JZF0uc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChwYy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW1JZF0ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBkZWxldGUgcGMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtSWRdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gb3JpZ1JlbW92ZVRyYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfSxcblxuICBzaGltQWRkVHJhY2tSZW1vdmVUcmFjazogZnVuY3Rpb24od2luZG93KSB7XG4gICAgdmFyIGJyb3dzZXJEZXRhaWxzID0gdXRpbHMuZGV0ZWN0QnJvd3Nlcih3aW5kb3cpO1xuICAgIC8vIHNoaW0gYWRkVHJhY2sgYW5kIHJlbW92ZVRyYWNrLlxuICAgIGlmICh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFRyYWNrICYmXG4gICAgICAgIGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPj0gNjUpIHtcbiAgICAgIHJldHVybiB0aGlzLnNoaW1BZGRUcmFja1JlbW92ZVRyYWNrV2l0aE5hdGl2ZSh3aW5kb3cpO1xuICAgIH1cblxuICAgIC8vIGFsc28gc2hpbSBwYy5nZXRMb2NhbFN0cmVhbXMgd2hlbiBhZGRUcmFjayBpcyBzaGltbWVkXG4gICAgLy8gdG8gcmV0dXJuIHRoZSBvcmlnaW5hbCBzdHJlYW1zLlxuICAgIHZhciBvcmlnR2V0TG9jYWxTdHJlYW1zID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVxuICAgICAgICAuZ2V0TG9jYWxTdHJlYW1zO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0TG9jYWxTdHJlYW1zID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgdmFyIG5hdGl2ZVN0cmVhbXMgPSBvcmlnR2V0TG9jYWxTdHJlYW1zLmFwcGx5KHRoaXMpO1xuICAgICAgcGMuX3JldmVyc2VTdHJlYW1zID0gcGMuX3JldmVyc2VTdHJlYW1zIHx8IHt9O1xuICAgICAgcmV0dXJuIG5hdGl2ZVN0cmVhbXMubWFwKGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgICByZXR1cm4gcGMuX3JldmVyc2VTdHJlYW1zW3N0cmVhbS5pZF07XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIG9yaWdBZGRTdHJlYW0gPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFN0cmVhbTtcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgIHBjLl9zdHJlYW1zID0gcGMuX3N0cmVhbXMgfHwge307XG4gICAgICBwYy5fcmV2ZXJzZVN0cmVhbXMgPSBwYy5fcmV2ZXJzZVN0cmVhbXMgfHwge307XG5cbiAgICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XG4gICAgICAgIHZhciBhbHJlYWR5RXhpc3RzID0gcGMuZ2V0U2VuZGVycygpLmZpbmQoZnVuY3Rpb24ocykge1xuICAgICAgICAgIHJldHVybiBzLnRyYWNrID09PSB0cmFjaztcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChhbHJlYWR5RXhpc3RzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbignVHJhY2sgYWxyZWFkeSBleGlzdHMuJyxcbiAgICAgICAgICAgICAgJ0ludmFsaWRBY2Nlc3NFcnJvcicpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIC8vIEFkZCBpZGVudGl0eSBtYXBwaW5nIGZvciBjb25zaXN0ZW5jeSB3aXRoIGFkZFRyYWNrLlxuICAgICAgLy8gVW5sZXNzIHRoaXMgaXMgYmVpbmcgdXNlZCB3aXRoIGEgc3RyZWFtIGZyb20gYWRkVHJhY2suXG4gICAgICBpZiAoIXBjLl9yZXZlcnNlU3RyZWFtc1tzdHJlYW0uaWRdKSB7XG4gICAgICAgIHZhciBuZXdTdHJlYW0gPSBuZXcgd2luZG93Lk1lZGlhU3RyZWFtKHN0cmVhbS5nZXRUcmFja3MoKSk7XG4gICAgICAgIHBjLl9zdHJlYW1zW3N0cmVhbS5pZF0gPSBuZXdTdHJlYW07XG4gICAgICAgIHBjLl9yZXZlcnNlU3RyZWFtc1tuZXdTdHJlYW0uaWRdID0gc3RyZWFtO1xuICAgICAgICBzdHJlYW0gPSBuZXdTdHJlYW07XG4gICAgICB9XG4gICAgICBvcmlnQWRkU3RyZWFtLmFwcGx5KHBjLCBbc3RyZWFtXSk7XG4gICAgfTtcblxuICAgIHZhciBvcmlnUmVtb3ZlU3RyZWFtID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVTdHJlYW07XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICBwYy5fc3RyZWFtcyA9IHBjLl9zdHJlYW1zIHx8IHt9O1xuICAgICAgcGMuX3JldmVyc2VTdHJlYW1zID0gcGMuX3JldmVyc2VTdHJlYW1zIHx8IHt9O1xuXG4gICAgICBvcmlnUmVtb3ZlU3RyZWFtLmFwcGx5KHBjLCBbKHBjLl9zdHJlYW1zW3N0cmVhbS5pZF0gfHwgc3RyZWFtKV0pO1xuICAgICAgZGVsZXRlIHBjLl9yZXZlcnNlU3RyZWFtc1socGMuX3N0cmVhbXNbc3RyZWFtLmlkXSA/XG4gICAgICAgICAgcGMuX3N0cmVhbXNbc3RyZWFtLmlkXS5pZCA6IHN0cmVhbS5pZCldO1xuICAgICAgZGVsZXRlIHBjLl9zdHJlYW1zW3N0cmVhbS5pZF07XG4gICAgfTtcblxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2sgPSBmdW5jdGlvbih0cmFjaywgc3RyZWFtKSB7XG4gICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgaWYgKHBjLnNpZ25hbGluZ1N0YXRlID09PSAnY2xvc2VkJykge1xuICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKFxuICAgICAgICAgICdUaGUgUlRDUGVlckNvbm5lY3Rpb25cXCdzIHNpZ25hbGluZ1N0YXRlIGlzIFxcJ2Nsb3NlZFxcJy4nLFxuICAgICAgICAgICdJbnZhbGlkU3RhdGVFcnJvcicpO1xuICAgICAgfVxuICAgICAgdmFyIHN0cmVhbXMgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICBpZiAoc3RyZWFtcy5sZW5ndGggIT09IDEgfHxcbiAgICAgICAgICAhc3RyZWFtc1swXS5nZXRUcmFja3MoKS5maW5kKGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICAgIHJldHVybiB0ID09PSB0cmFjaztcbiAgICAgICAgICB9KSkge1xuICAgICAgICAvLyB0aGlzIGlzIG5vdCBmdWxseSBjb3JyZWN0IGJ1dCBhbGwgd2UgY2FuIG1hbmFnZSB3aXRob3V0XG4gICAgICAgIC8vIFtbYXNzb2NpYXRlZCBNZWRpYVN0cmVhbXNdXSBpbnRlcm5hbCBzbG90LlxuICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKFxuICAgICAgICAgICdUaGUgYWRhcHRlci5qcyBhZGRUcmFjayBwb2x5ZmlsbCBvbmx5IHN1cHBvcnRzIGEgc2luZ2xlICcgK1xuICAgICAgICAgICcgc3RyZWFtIHdoaWNoIGlzIGFzc29jaWF0ZWQgd2l0aCB0aGUgc3BlY2lmaWVkIHRyYWNrLicsXG4gICAgICAgICAgJ05vdFN1cHBvcnRlZEVycm9yJyk7XG4gICAgICB9XG5cbiAgICAgIHZhciBhbHJlYWR5RXhpc3RzID0gcGMuZ2V0U2VuZGVycygpLmZpbmQoZnVuY3Rpb24ocykge1xuICAgICAgICByZXR1cm4gcy50cmFjayA9PT0gdHJhY2s7XG4gICAgICB9KTtcbiAgICAgIGlmIChhbHJlYWR5RXhpc3RzKSB7XG4gICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oJ1RyYWNrIGFscmVhZHkgZXhpc3RzLicsXG4gICAgICAgICAgICAnSW52YWxpZEFjY2Vzc0Vycm9yJyk7XG4gICAgICB9XG5cbiAgICAgIHBjLl9zdHJlYW1zID0gcGMuX3N0cmVhbXMgfHwge307XG4gICAgICBwYy5fcmV2ZXJzZVN0cmVhbXMgPSBwYy5fcmV2ZXJzZVN0cmVhbXMgfHwge307XG4gICAgICB2YXIgb2xkU3RyZWFtID0gcGMuX3N0cmVhbXNbc3RyZWFtLmlkXTtcbiAgICAgIGlmIChvbGRTdHJlYW0pIHtcbiAgICAgICAgLy8gdGhpcyBpcyB1c2luZyBvZGQgQ2hyb21lIGJlaGF2aW91ciwgdXNlIHdpdGggY2F1dGlvbjpcbiAgICAgICAgLy8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3dlYnJ0Yy9pc3N1ZXMvZGV0YWlsP2lkPTc4MTVcbiAgICAgICAgLy8gTm90ZTogd2UgcmVseSBvbiB0aGUgaGlnaC1sZXZlbCBhZGRUcmFjay9kdG1mIHNoaW0gdG9cbiAgICAgICAgLy8gY3JlYXRlIHRoZSBzZW5kZXIgd2l0aCBhIGR0bWYgc2VuZGVyLlxuICAgICAgICBvbGRTdHJlYW0uYWRkVHJhY2sodHJhY2spO1xuXG4gICAgICAgIC8vIFRyaWdnZXIgT05OIGFzeW5jLlxuICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHBjLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCduZWdvdGlhdGlvbm5lZWRlZCcpKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgbmV3U3RyZWFtID0gbmV3IHdpbmRvdy5NZWRpYVN0cmVhbShbdHJhY2tdKTtcbiAgICAgICAgcGMuX3N0cmVhbXNbc3RyZWFtLmlkXSA9IG5ld1N0cmVhbTtcbiAgICAgICAgcGMuX3JldmVyc2VTdHJlYW1zW25ld1N0cmVhbS5pZF0gPSBzdHJlYW07XG4gICAgICAgIHBjLmFkZFN0cmVhbShuZXdTdHJlYW0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHBjLmdldFNlbmRlcnMoKS5maW5kKGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgcmV0dXJuIHMudHJhY2sgPT09IHRyYWNrO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIHJlcGxhY2UgdGhlIGludGVybmFsIHN0cmVhbSBpZCB3aXRoIHRoZSBleHRlcm5hbCBvbmUgYW5kXG4gICAgLy8gdmljZSB2ZXJzYS5cbiAgICBmdW5jdGlvbiByZXBsYWNlSW50ZXJuYWxTdHJlYW1JZChwYywgZGVzY3JpcHRpb24pIHtcbiAgICAgIHZhciBzZHAgPSBkZXNjcmlwdGlvbi5zZHA7XG4gICAgICBPYmplY3Qua2V5cyhwYy5fcmV2ZXJzZVN0cmVhbXMgfHwgW10pLmZvckVhY2goZnVuY3Rpb24oaW50ZXJuYWxJZCkge1xuICAgICAgICB2YXIgZXh0ZXJuYWxTdHJlYW0gPSBwYy5fcmV2ZXJzZVN0cmVhbXNbaW50ZXJuYWxJZF07XG4gICAgICAgIHZhciBpbnRlcm5hbFN0cmVhbSA9IHBjLl9zdHJlYW1zW2V4dGVybmFsU3RyZWFtLmlkXTtcbiAgICAgICAgc2RwID0gc2RwLnJlcGxhY2UobmV3IFJlZ0V4cChpbnRlcm5hbFN0cmVhbS5pZCwgJ2cnKSxcbiAgICAgICAgICAgIGV4dGVybmFsU3RyZWFtLmlkKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5ldyBSVENTZXNzaW9uRGVzY3JpcHRpb24oe1xuICAgICAgICB0eXBlOiBkZXNjcmlwdGlvbi50eXBlLFxuICAgICAgICBzZHA6IHNkcFxuICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlcGxhY2VFeHRlcm5hbFN0cmVhbUlkKHBjLCBkZXNjcmlwdGlvbikge1xuICAgICAgdmFyIHNkcCA9IGRlc2NyaXB0aW9uLnNkcDtcbiAgICAgIE9iamVjdC5rZXlzKHBjLl9yZXZlcnNlU3RyZWFtcyB8fCBbXSkuZm9yRWFjaChmdW5jdGlvbihpbnRlcm5hbElkKSB7XG4gICAgICAgIHZhciBleHRlcm5hbFN0cmVhbSA9IHBjLl9yZXZlcnNlU3RyZWFtc1tpbnRlcm5hbElkXTtcbiAgICAgICAgdmFyIGludGVybmFsU3RyZWFtID0gcGMuX3N0cmVhbXNbZXh0ZXJuYWxTdHJlYW0uaWRdO1xuICAgICAgICBzZHAgPSBzZHAucmVwbGFjZShuZXcgUmVnRXhwKGV4dGVybmFsU3RyZWFtLmlkLCAnZycpLFxuICAgICAgICAgICAgaW50ZXJuYWxTdHJlYW0uaWQpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbmV3IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbih7XG4gICAgICAgIHR5cGU6IGRlc2NyaXB0aW9uLnR5cGUsXG4gICAgICAgIHNkcDogc2RwXG4gICAgICB9KTtcbiAgICB9XG4gICAgWydjcmVhdGVPZmZlcicsICdjcmVhdGVBbnN3ZXInXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgdmFyIG5hdGl2ZU1ldGhvZCA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXTtcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgdmFyIGlzTGVnYWN5Q2FsbCA9IGFyZ3VtZW50cy5sZW5ndGggJiZcbiAgICAgICAgICAgIHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdmdW5jdGlvbic7XG4gICAgICAgIGlmIChpc0xlZ2FjeUNhbGwpIHtcbiAgICAgICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHBjLCBbXG4gICAgICAgICAgICBmdW5jdGlvbihkZXNjcmlwdGlvbikge1xuICAgICAgICAgICAgICB2YXIgZGVzYyA9IHJlcGxhY2VJbnRlcm5hbFN0cmVhbUlkKHBjLCBkZXNjcmlwdGlvbik7XG4gICAgICAgICAgICAgIGFyZ3NbMF0uYXBwbHkobnVsbCwgW2Rlc2NdKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgaWYgKGFyZ3NbMV0pIHtcbiAgICAgICAgICAgICAgICBhcmdzWzFdLmFwcGx5KG51bGwsIGVycik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGFyZ3VtZW50c1syXVxuICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkocGMsIGFyZ3VtZW50cylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oZGVzY3JpcHRpb24pIHtcbiAgICAgICAgICByZXR1cm4gcmVwbGFjZUludGVybmFsU3RyZWFtSWQocGMsIGRlc2NyaXB0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgdmFyIG9yaWdTZXRMb2NhbERlc2NyaXB0aW9uID1cbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5zZXRMb2NhbERlc2NyaXB0aW9uO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0TG9jYWxEZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCB8fCAhYXJndW1lbnRzWzBdLnR5cGUpIHtcbiAgICAgICAgcmV0dXJuIG9yaWdTZXRMb2NhbERlc2NyaXB0aW9uLmFwcGx5KHBjLCBhcmd1bWVudHMpO1xuICAgICAgfVxuICAgICAgYXJndW1lbnRzWzBdID0gcmVwbGFjZUV4dGVybmFsU3RyZWFtSWQocGMsIGFyZ3VtZW50c1swXSk7XG4gICAgICByZXR1cm4gb3JpZ1NldExvY2FsRGVzY3JpcHRpb24uYXBwbHkocGMsIGFyZ3VtZW50cyk7XG4gICAgfTtcblxuICAgIC8vIFRPRE86IG1hbmdsZSBnZXRTdGF0czogaHR0cHM6Ly93M2MuZ2l0aHViLmlvL3dlYnJ0Yy1zdGF0cy8jZG9tLXJ0Y21lZGlhc3RyZWFtc3RhdHMtc3RyZWFtaWRlbnRpZmllclxuXG4gICAgdmFyIG9yaWdMb2NhbERlc2NyaXB0aW9uID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihcbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSwgJ2xvY2FsRGVzY3JpcHRpb24nKTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSxcbiAgICAgICAgJ2xvY2FsRGVzY3JpcHRpb24nLCB7XG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgZGVzY3JpcHRpb24gPSBvcmlnTG9jYWxEZXNjcmlwdGlvbi5nZXQuYXBwbHkodGhpcyk7XG4gICAgICAgICAgICBpZiAoZGVzY3JpcHRpb24udHlwZSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlcGxhY2VJbnRlcm5hbFN0cmVhbUlkKHBjLCBkZXNjcmlwdGlvbik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlVHJhY2sgPSBmdW5jdGlvbihzZW5kZXIpIHtcbiAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICBpZiAocGMuc2lnbmFsaW5nU3RhdGUgPT09ICdjbG9zZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oXG4gICAgICAgICAgJ1RoZSBSVENQZWVyQ29ubmVjdGlvblxcJ3Mgc2lnbmFsaW5nU3RhdGUgaXMgXFwnY2xvc2VkXFwnLicsXG4gICAgICAgICAgJ0ludmFsaWRTdGF0ZUVycm9yJyk7XG4gICAgICB9XG4gICAgICAvLyBXZSBjYW4gbm90IHlldCBjaGVjayBmb3Igc2VuZGVyIGluc3RhbmNlb2YgUlRDUnRwU2VuZGVyXG4gICAgICAvLyBzaW5jZSB3ZSBzaGltIFJUUFNlbmRlci4gU28gd2UgY2hlY2sgaWYgc2VuZGVyLl9wYyBpcyBzZXQuXG4gICAgICBpZiAoIXNlbmRlci5fcGMpIHtcbiAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbignQXJndW1lbnQgMSBvZiBSVENQZWVyQ29ubmVjdGlvbi5yZW1vdmVUcmFjayAnICtcbiAgICAgICAgICAgICdkb2VzIG5vdCBpbXBsZW1lbnQgaW50ZXJmYWNlIFJUQ1J0cFNlbmRlci4nLCAnVHlwZUVycm9yJyk7XG4gICAgICB9XG4gICAgICB2YXIgaXNMb2NhbCA9IHNlbmRlci5fcGMgPT09IHBjO1xuICAgICAgaWYgKCFpc0xvY2FsKSB7XG4gICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oJ1NlbmRlciB3YXMgbm90IGNyZWF0ZWQgYnkgdGhpcyBjb25uZWN0aW9uLicsXG4gICAgICAgICAgICAnSW52YWxpZEFjY2Vzc0Vycm9yJyk7XG4gICAgICB9XG5cbiAgICAgIC8vIFNlYXJjaCBmb3IgdGhlIG5hdGl2ZSBzdHJlYW0gdGhlIHNlbmRlcnMgdHJhY2sgYmVsb25ncyB0by5cbiAgICAgIHBjLl9zdHJlYW1zID0gcGMuX3N0cmVhbXMgfHwge307XG4gICAgICB2YXIgc3RyZWFtO1xuICAgICAgT2JqZWN0LmtleXMocGMuX3N0cmVhbXMpLmZvckVhY2goZnVuY3Rpb24oc3RyZWFtaWQpIHtcbiAgICAgICAgdmFyIGhhc1RyYWNrID0gcGMuX3N0cmVhbXNbc3RyZWFtaWRdLmdldFRyYWNrcygpLmZpbmQoZnVuY3Rpb24odHJhY2spIHtcbiAgICAgICAgICByZXR1cm4gc2VuZGVyLnRyYWNrID09PSB0cmFjaztcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChoYXNUcmFjaykge1xuICAgICAgICAgIHN0cmVhbSA9IHBjLl9zdHJlYW1zW3N0cmVhbWlkXTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGlmIChzdHJlYW0pIHtcbiAgICAgICAgaWYgKHN0cmVhbS5nZXRUcmFja3MoKS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAvLyBpZiB0aGlzIGlzIHRoZSBsYXN0IHRyYWNrIG9mIHRoZSBzdHJlYW0sIHJlbW92ZSB0aGUgc3RyZWFtLiBUaGlzXG4gICAgICAgICAgLy8gdGFrZXMgY2FyZSBvZiBhbnkgc2hpbW1lZCBfc2VuZGVycy5cbiAgICAgICAgICBwYy5yZW1vdmVTdHJlYW0ocGMuX3JldmVyc2VTdHJlYW1zW3N0cmVhbS5pZF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIHJlbHlpbmcgb24gdGhlIHNhbWUgb2RkIGNocm9tZSBiZWhhdmlvdXIgYXMgYWJvdmUuXG4gICAgICAgICAgc3RyZWFtLnJlbW92ZVRyYWNrKHNlbmRlci50cmFjayk7XG4gICAgICAgIH1cbiAgICAgICAgcGMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ25lZ290aWF0aW9ubmVlZGVkJykpO1xuICAgICAgfVxuICAgIH07XG4gIH0sXG5cbiAgc2hpbVBlZXJDb25uZWN0aW9uOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICB2YXIgYnJvd3NlckRldGFpbHMgPSB1dGlscy5kZXRlY3RCcm93c2VyKHdpbmRvdyk7XG5cbiAgICAvLyBUaGUgUlRDUGVlckNvbm5lY3Rpb24gb2JqZWN0LlxuICAgIGlmICghd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uICYmIHdpbmRvdy53ZWJraXRSVENQZWVyQ29ubmVjdGlvbikge1xuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uID0gZnVuY3Rpb24ocGNDb25maWcsIHBjQ29uc3RyYWludHMpIHtcbiAgICAgICAgLy8gVHJhbnNsYXRlIGljZVRyYW5zcG9ydFBvbGljeSB0byBpY2VUcmFuc3BvcnRzLFxuICAgICAgICAvLyBzZWUgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC93ZWJydGMvaXNzdWVzL2RldGFpbD9pZD00ODY5XG4gICAgICAgIC8vIHRoaXMgd2FzIGZpeGVkIGluIE01NiBhbG9uZyB3aXRoIHVucHJlZml4aW5nIFJUQ1BlZXJDb25uZWN0aW9uLlxuICAgICAgICBsb2dnaW5nKCdQZWVyQ29ubmVjdGlvbicpO1xuICAgICAgICBpZiAocGNDb25maWcgJiYgcGNDb25maWcuaWNlVHJhbnNwb3J0UG9saWN5KSB7XG4gICAgICAgICAgcGNDb25maWcuaWNlVHJhbnNwb3J0cyA9IHBjQ29uZmlnLmljZVRyYW5zcG9ydFBvbGljeTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgd2luZG93LndlYmtpdFJUQ1BlZXJDb25uZWN0aW9uKHBjQ29uZmlnLCBwY0NvbnN0cmFpbnRzKTtcbiAgICAgIH07XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlID1cbiAgICAgICAgICB3aW5kb3cud2Via2l0UlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlO1xuICAgICAgLy8gd3JhcCBzdGF0aWMgbWV0aG9kcy4gQ3VycmVudGx5IGp1c3QgZ2VuZXJhdGVDZXJ0aWZpY2F0ZS5cbiAgICAgIGlmICh3aW5kb3cud2Via2l0UlRDUGVlckNvbm5lY3Rpb24uZ2VuZXJhdGVDZXJ0aWZpY2F0ZSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLCAnZ2VuZXJhdGVDZXJ0aWZpY2F0ZScsIHtcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy53ZWJraXRSVENQZWVyQ29ubmVjdGlvbi5nZW5lcmF0ZUNlcnRpZmljYXRlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIG1pZ3JhdGUgZnJvbSBub24tc3BlYyBSVENJY2VTZXJ2ZXIudXJsIHRvIFJUQ0ljZVNlcnZlci51cmxzXG4gICAgICB2YXIgT3JpZ1BlZXJDb25uZWN0aW9uID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uO1xuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uID0gZnVuY3Rpb24ocGNDb25maWcsIHBjQ29uc3RyYWludHMpIHtcbiAgICAgICAgaWYgKHBjQ29uZmlnICYmIHBjQ29uZmlnLmljZVNlcnZlcnMpIHtcbiAgICAgICAgICB2YXIgbmV3SWNlU2VydmVycyA9IFtdO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGNDb25maWcuaWNlU2VydmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHNlcnZlciA9IHBjQ29uZmlnLmljZVNlcnZlcnNbaV07XG4gICAgICAgICAgICBpZiAoIXNlcnZlci5oYXNPd25Qcm9wZXJ0eSgndXJscycpICYmXG4gICAgICAgICAgICAgICAgc2VydmVyLmhhc093blByb3BlcnR5KCd1cmwnKSkge1xuICAgICAgICAgICAgICB1dGlscy5kZXByZWNhdGVkKCdSVENJY2VTZXJ2ZXIudXJsJywgJ1JUQ0ljZVNlcnZlci51cmxzJyk7XG4gICAgICAgICAgICAgIHNlcnZlciA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoc2VydmVyKSk7XG4gICAgICAgICAgICAgIHNlcnZlci51cmxzID0gc2VydmVyLnVybDtcbiAgICAgICAgICAgICAgbmV3SWNlU2VydmVycy5wdXNoKHNlcnZlcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBuZXdJY2VTZXJ2ZXJzLnB1c2gocGNDb25maWcuaWNlU2VydmVyc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHBjQ29uZmlnLmljZVNlcnZlcnMgPSBuZXdJY2VTZXJ2ZXJzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgT3JpZ1BlZXJDb25uZWN0aW9uKHBjQ29uZmlnLCBwY0NvbnN0cmFpbnRzKTtcbiAgICAgIH07XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlID0gT3JpZ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZTtcbiAgICAgIC8vIHdyYXAgc3RhdGljIG1ldGhvZHMuIEN1cnJlbnRseSBqdXN0IGdlbmVyYXRlQ2VydGlmaWNhdGUuXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLCAnZ2VuZXJhdGVDZXJ0aWZpY2F0ZScsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gT3JpZ1BlZXJDb25uZWN0aW9uLmdlbmVyYXRlQ2VydGlmaWNhdGU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhciBvcmlnR2V0U3RhdHMgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFN0YXRzO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U3RhdHMgPSBmdW5jdGlvbihzZWxlY3RvcixcbiAgICAgICAgc3VjY2Vzc0NhbGxiYWNrLCBlcnJvckNhbGxiYWNrKSB7XG4gICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG5cbiAgICAgIC8vIElmIHNlbGVjdG9yIGlzIGEgZnVuY3Rpb24gdGhlbiB3ZSBhcmUgaW4gdGhlIG9sZCBzdHlsZSBzdGF0cyBzbyBqdXN0XG4gICAgICAvLyBwYXNzIGJhY2sgdGhlIG9yaWdpbmFsIGdldFN0YXRzIGZvcm1hdCB0byBhdm9pZCBicmVha2luZyBvbGQgdXNlcnMuXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgdHlwZW9mIHNlbGVjdG9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBvcmlnR2V0U3RhdHMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cblxuICAgICAgLy8gV2hlbiBzcGVjLXN0eWxlIGdldFN0YXRzIGlzIHN1cHBvcnRlZCwgcmV0dXJuIHRob3NlIHdoZW4gY2FsbGVkIHdpdGhcbiAgICAgIC8vIGVpdGhlciBubyBhcmd1bWVudHMgb3IgdGhlIHNlbGVjdG9yIGFyZ3VtZW50IGlzIG51bGwuXG4gICAgICBpZiAob3JpZ0dldFN0YXRzLmxlbmd0aCA9PT0gMCAmJiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCB8fFxuICAgICAgICAgIHR5cGVvZiBhcmd1bWVudHNbMF0gIT09ICdmdW5jdGlvbicpKSB7XG4gICAgICAgIHJldHVybiBvcmlnR2V0U3RhdHMuYXBwbHkodGhpcywgW10pO1xuICAgICAgfVxuXG4gICAgICB2YXIgZml4Q2hyb21lU3RhdHNfID0gZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgdmFyIHN0YW5kYXJkUmVwb3J0ID0ge307XG4gICAgICAgIHZhciByZXBvcnRzID0gcmVzcG9uc2UucmVzdWx0KCk7XG4gICAgICAgIHJlcG9ydHMuZm9yRWFjaChmdW5jdGlvbihyZXBvcnQpIHtcbiAgICAgICAgICB2YXIgc3RhbmRhcmRTdGF0cyA9IHtcbiAgICAgICAgICAgIGlkOiByZXBvcnQuaWQsXG4gICAgICAgICAgICB0aW1lc3RhbXA6IHJlcG9ydC50aW1lc3RhbXAsXG4gICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgIGxvY2FsY2FuZGlkYXRlOiAnbG9jYWwtY2FuZGlkYXRlJyxcbiAgICAgICAgICAgICAgcmVtb3RlY2FuZGlkYXRlOiAncmVtb3RlLWNhbmRpZGF0ZSdcbiAgICAgICAgICAgIH1bcmVwb3J0LnR5cGVdIHx8IHJlcG9ydC50eXBlXG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXBvcnQubmFtZXMoKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgICAgIHN0YW5kYXJkU3RhdHNbbmFtZV0gPSByZXBvcnQuc3RhdChuYW1lKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBzdGFuZGFyZFJlcG9ydFtzdGFuZGFyZFN0YXRzLmlkXSA9IHN0YW5kYXJkU3RhdHM7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzdGFuZGFyZFJlcG9ydDtcbiAgICAgIH07XG5cbiAgICAgIC8vIHNoaW0gZ2V0U3RhdHMgd2l0aCBtYXBsaWtlIHN1cHBvcnRcbiAgICAgIHZhciBtYWtlTWFwU3RhdHMgPSBmdW5jdGlvbihzdGF0cykge1xuICAgICAgICByZXR1cm4gbmV3IE1hcChPYmplY3Qua2V5cyhzdGF0cykubWFwKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgIHJldHVybiBba2V5LCBzdGF0c1trZXldXTtcbiAgICAgICAgfSkpO1xuICAgICAgfTtcblxuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gMikge1xuICAgICAgICB2YXIgc3VjY2Vzc0NhbGxiYWNrV3JhcHBlcl8gPSBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgIGFyZ3NbMV0obWFrZU1hcFN0YXRzKGZpeENocm9tZVN0YXRzXyhyZXNwb25zZSkpKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gb3JpZ0dldFN0YXRzLmFwcGx5KHRoaXMsIFtzdWNjZXNzQ2FsbGJhY2tXcmFwcGVyXyxcbiAgICAgICAgICBhcmd1bWVudHNbMF1dKTtcbiAgICAgIH1cblxuICAgICAgLy8gcHJvbWlzZS1zdXBwb3J0XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIG9yaWdHZXRTdGF0cy5hcHBseShwYywgW1xuICAgICAgICAgIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXNvbHZlKG1ha2VNYXBTdGF0cyhmaXhDaHJvbWVTdGF0c18ocmVzcG9uc2UpKSk7XG4gICAgICAgICAgfSwgcmVqZWN0XSk7XG4gICAgICB9KS50aGVuKHN1Y2Nlc3NDYWxsYmFjaywgZXJyb3JDYWxsYmFjayk7XG4gICAgfTtcblxuICAgIC8vIGFkZCBwcm9taXNlIHN1cHBvcnQgLS0gbmF0aXZlbHkgYXZhaWxhYmxlIGluIENocm9tZSA1MVxuICAgIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgNTEpIHtcbiAgICAgIFsnc2V0TG9jYWxEZXNjcmlwdGlvbicsICdzZXRSZW1vdGVEZXNjcmlwdGlvbicsICdhZGRJY2VDYW5kaWRhdGUnXVxuICAgICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgICAgICAgdmFyIG5hdGl2ZU1ldGhvZCA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXTtcbiAgICAgICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgICAgICAgICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICBuYXRpdmVNZXRob2QuYXBwbHkocGMsIFthcmdzWzBdLCByZXNvbHZlLCByZWplY3RdKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGFyZ3NbMV0uYXBwbHkobnVsbCwgW10pO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPj0gMykge1xuICAgICAgICAgICAgICAgICAgYXJnc1syXS5hcHBseShudWxsLCBbZXJyXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gcHJvbWlzZSBzdXBwb3J0IGZvciBjcmVhdGVPZmZlciBhbmQgY3JlYXRlQW5zd2VyLiBBdmFpbGFibGUgKHdpdGhvdXRcbiAgICAvLyBidWdzKSBzaW5jZSBNNTI6IGNyYnVnLzYxOTI4OVxuICAgIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgNTIpIHtcbiAgICAgIFsnY3JlYXRlT2ZmZXInLCAnY3JlYXRlQW5zd2VyJ10uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgICAgdmFyIG5hdGl2ZU1ldGhvZCA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXTtcbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDEgfHwgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiZcbiAgICAgICAgICAgICAgdHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ29iamVjdCcpKSB7XG4gICAgICAgICAgICB2YXIgb3B0cyA9IGFyZ3VtZW50cy5sZW5ndGggPT09IDEgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgIG5hdGl2ZU1ldGhvZC5hcHBseShwYywgW3Jlc29sdmUsIHJlamVjdCwgb3B0c10pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIHNoaW0gaW1wbGljaXQgY3JlYXRpb24gb2YgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uL1JUQ0ljZUNhbmRpZGF0ZVxuICAgIFsnc2V0TG9jYWxEZXNjcmlwdGlvbicsICdzZXRSZW1vdGVEZXNjcmlwdGlvbicsICdhZGRJY2VDYW5kaWRhdGUnXVxuICAgICAgICAuZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgICAgICB2YXIgbmF0aXZlTWV0aG9kID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdO1xuICAgICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYXJndW1lbnRzWzBdID0gbmV3ICgobWV0aG9kID09PSAnYWRkSWNlQ2FuZGlkYXRlJykgP1xuICAgICAgICAgICAgICAgIHdpbmRvdy5SVENJY2VDYW5kaWRhdGUgOlxuICAgICAgICAgICAgICAgIHdpbmRvdy5SVENTZXNzaW9uRGVzY3JpcHRpb24pKGFyZ3VtZW50c1swXSk7XG4gICAgICAgICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAvLyBzdXBwb3J0IGZvciBhZGRJY2VDYW5kaWRhdGUobnVsbCBvciB1bmRlZmluZWQpXG4gICAgdmFyIG5hdGl2ZUFkZEljZUNhbmRpZGF0ZSA9XG4gICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkSWNlQ2FuZGlkYXRlO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkSWNlQ2FuZGlkYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50c1swXSkge1xuICAgICAgICBpZiAoYXJndW1lbnRzWzFdKSB7XG4gICAgICAgICAgYXJndW1lbnRzWzFdLmFwcGx5KG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuYXRpdmVBZGRJY2VDYW5kaWRhdGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG59O1xuXG59LHtcIi4uL3V0aWxzLmpzXCI6MTMsXCIuL2dldHVzZXJtZWRpYVwiOjZ9XSw2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8qXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXG4gKiAgdHJlZS5cbiAqL1xuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xuJ3VzZSBzdHJpY3QnO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMuanMnKTtcbnZhciBsb2dnaW5nID0gdXRpbHMubG9nO1xuXG4vLyBFeHBvc2UgcHVibGljIG1ldGhvZHMuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHdpbmRvdykge1xuICB2YXIgYnJvd3NlckRldGFpbHMgPSB1dGlscy5kZXRlY3RCcm93c2VyKHdpbmRvdyk7XG4gIHZhciBuYXZpZ2F0b3IgPSB3aW5kb3cgJiYgd2luZG93Lm5hdmlnYXRvcjtcblxuICB2YXIgY29uc3RyYWludHNUb0Nocm9tZV8gPSBmdW5jdGlvbihjKSB7XG4gICAgaWYgKHR5cGVvZiBjICE9PSAnb2JqZWN0JyB8fCBjLm1hbmRhdG9yeSB8fCBjLm9wdGlvbmFsKSB7XG4gICAgICByZXR1cm4gYztcbiAgICB9XG4gICAgdmFyIGNjID0ge307XG4gICAgT2JqZWN0LmtleXMoYykuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICAgIGlmIChrZXkgPT09ICdyZXF1aXJlJyB8fCBrZXkgPT09ICdhZHZhbmNlZCcgfHwga2V5ID09PSAnbWVkaWFTb3VyY2UnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciByID0gKHR5cGVvZiBjW2tleV0gPT09ICdvYmplY3QnKSA/IGNba2V5XSA6IHtpZGVhbDogY1trZXldfTtcbiAgICAgIGlmIChyLmV4YWN0ICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIHIuZXhhY3QgPT09ICdudW1iZXInKSB7XG4gICAgICAgIHIubWluID0gci5tYXggPSByLmV4YWN0O1xuICAgICAgfVxuICAgICAgdmFyIG9sZG5hbWVfID0gZnVuY3Rpb24ocHJlZml4LCBuYW1lKSB7XG4gICAgICAgIGlmIChwcmVmaXgpIHtcbiAgICAgICAgICByZXR1cm4gcHJlZml4ICsgbmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIG5hbWUuc2xpY2UoMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChuYW1lID09PSAnZGV2aWNlSWQnKSA/ICdzb3VyY2VJZCcgOiBuYW1lO1xuICAgICAgfTtcbiAgICAgIGlmIChyLmlkZWFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY2Mub3B0aW9uYWwgPSBjYy5vcHRpb25hbCB8fCBbXTtcbiAgICAgICAgdmFyIG9jID0ge307XG4gICAgICAgIGlmICh0eXBlb2Ygci5pZGVhbCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICBvY1tvbGRuYW1lXygnbWluJywga2V5KV0gPSByLmlkZWFsO1xuICAgICAgICAgIGNjLm9wdGlvbmFsLnB1c2gob2MpO1xuICAgICAgICAgIG9jID0ge307XG4gICAgICAgICAgb2Nbb2xkbmFtZV8oJ21heCcsIGtleSldID0gci5pZGVhbDtcbiAgICAgICAgICBjYy5vcHRpb25hbC5wdXNoKG9jKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvY1tvbGRuYW1lXygnJywga2V5KV0gPSByLmlkZWFsO1xuICAgICAgICAgIGNjLm9wdGlvbmFsLnB1c2gob2MpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoci5leGFjdCAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiByLmV4YWN0ICE9PSAnbnVtYmVyJykge1xuICAgICAgICBjYy5tYW5kYXRvcnkgPSBjYy5tYW5kYXRvcnkgfHwge307XG4gICAgICAgIGNjLm1hbmRhdG9yeVtvbGRuYW1lXygnJywga2V5KV0gPSByLmV4YWN0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgWydtaW4nLCAnbWF4J10uZm9yRWFjaChmdW5jdGlvbihtaXgpIHtcbiAgICAgICAgICBpZiAoclttaXhdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNjLm1hbmRhdG9yeSA9IGNjLm1hbmRhdG9yeSB8fCB7fTtcbiAgICAgICAgICAgIGNjLm1hbmRhdG9yeVtvbGRuYW1lXyhtaXgsIGtleSldID0gclttaXhdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGMuYWR2YW5jZWQpIHtcbiAgICAgIGNjLm9wdGlvbmFsID0gKGNjLm9wdGlvbmFsIHx8IFtdKS5jb25jYXQoYy5hZHZhbmNlZCk7XG4gICAgfVxuICAgIHJldHVybiBjYztcbiAgfTtcblxuICB2YXIgc2hpbUNvbnN0cmFpbnRzXyA9IGZ1bmN0aW9uKGNvbnN0cmFpbnRzLCBmdW5jKSB7XG4gICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPj0gNjEpIHtcbiAgICAgIHJldHVybiBmdW5jKGNvbnN0cmFpbnRzKTtcbiAgICB9XG4gICAgY29uc3RyYWludHMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGNvbnN0cmFpbnRzKSk7XG4gICAgaWYgKGNvbnN0cmFpbnRzICYmIHR5cGVvZiBjb25zdHJhaW50cy5hdWRpbyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHZhciByZW1hcCA9IGZ1bmN0aW9uKG9iaiwgYSwgYikge1xuICAgICAgICBpZiAoYSBpbiBvYmogJiYgIShiIGluIG9iaikpIHtcbiAgICAgICAgICBvYmpbYl0gPSBvYmpbYV07XG4gICAgICAgICAgZGVsZXRlIG9ialthXTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGNvbnN0cmFpbnRzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShjb25zdHJhaW50cykpO1xuICAgICAgcmVtYXAoY29uc3RyYWludHMuYXVkaW8sICdhdXRvR2FpbkNvbnRyb2wnLCAnZ29vZ0F1dG9HYWluQ29udHJvbCcpO1xuICAgICAgcmVtYXAoY29uc3RyYWludHMuYXVkaW8sICdub2lzZVN1cHByZXNzaW9uJywgJ2dvb2dOb2lzZVN1cHByZXNzaW9uJyk7XG4gICAgICBjb25zdHJhaW50cy5hdWRpbyA9IGNvbnN0cmFpbnRzVG9DaHJvbWVfKGNvbnN0cmFpbnRzLmF1ZGlvKTtcbiAgICB9XG4gICAgaWYgKGNvbnN0cmFpbnRzICYmIHR5cGVvZiBjb25zdHJhaW50cy52aWRlbyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIC8vIFNoaW0gZmFjaW5nTW9kZSBmb3IgbW9iaWxlICYgc3VyZmFjZSBwcm8uXG4gICAgICB2YXIgZmFjZSA9IGNvbnN0cmFpbnRzLnZpZGVvLmZhY2luZ01vZGU7XG4gICAgICBmYWNlID0gZmFjZSAmJiAoKHR5cGVvZiBmYWNlID09PSAnb2JqZWN0JykgPyBmYWNlIDoge2lkZWFsOiBmYWNlfSk7XG4gICAgICB2YXIgZ2V0U3VwcG9ydGVkRmFjaW5nTW9kZUxpZXMgPSBicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgNjY7XG5cbiAgICAgIGlmICgoZmFjZSAmJiAoZmFjZS5leGFjdCA9PT0gJ3VzZXInIHx8IGZhY2UuZXhhY3QgPT09ICdlbnZpcm9ubWVudCcgfHxcbiAgICAgICAgICAgICAgICAgICAgZmFjZS5pZGVhbCA9PT0gJ3VzZXInIHx8IGZhY2UuaWRlYWwgPT09ICdlbnZpcm9ubWVudCcpKSAmJlxuICAgICAgICAgICEobmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRTdXBwb3J0ZWRDb25zdHJhaW50cyAmJlxuICAgICAgICAgICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRTdXBwb3J0ZWRDb25zdHJhaW50cygpLmZhY2luZ01vZGUgJiZcbiAgICAgICAgICAgICFnZXRTdXBwb3J0ZWRGYWNpbmdNb2RlTGllcykpIHtcbiAgICAgICAgZGVsZXRlIGNvbnN0cmFpbnRzLnZpZGVvLmZhY2luZ01vZGU7XG4gICAgICAgIHZhciBtYXRjaGVzO1xuICAgICAgICBpZiAoZmFjZS5leGFjdCA9PT0gJ2Vudmlyb25tZW50JyB8fCBmYWNlLmlkZWFsID09PSAnZW52aXJvbm1lbnQnKSB7XG4gICAgICAgICAgbWF0Y2hlcyA9IFsnYmFjaycsICdyZWFyJ107XG4gICAgICAgIH0gZWxzZSBpZiAoZmFjZS5leGFjdCA9PT0gJ3VzZXInIHx8IGZhY2UuaWRlYWwgPT09ICd1c2VyJykge1xuICAgICAgICAgIG1hdGNoZXMgPSBbJ2Zyb250J107XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgICAgICAvLyBMb29rIGZvciBtYXRjaGVzIGluIGxhYmVsLCBvciB1c2UgbGFzdCBjYW0gZm9yIGJhY2sgKHR5cGljYWwpLlxuICAgICAgICAgIHJldHVybiBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmVudW1lcmF0ZURldmljZXMoKVxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGRldmljZXMpIHtcbiAgICAgICAgICAgIGRldmljZXMgPSBkZXZpY2VzLmZpbHRlcihmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgIHJldHVybiBkLmtpbmQgPT09ICd2aWRlb2lucHV0JztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIGRldiA9IGRldmljZXMuZmluZChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgIHJldHVybiBtYXRjaGVzLnNvbWUoZnVuY3Rpb24obWF0Y2gpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5sYWJlbC50b0xvd2VyQ2FzZSgpLmluZGV4T2YobWF0Y2gpICE9PSAtMTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghZGV2ICYmIGRldmljZXMubGVuZ3RoICYmIG1hdGNoZXMuaW5kZXhPZignYmFjaycpICE9PSAtMSkge1xuICAgICAgICAgICAgICBkZXYgPSBkZXZpY2VzW2RldmljZXMubGVuZ3RoIC0gMV07IC8vIG1vcmUgbGlrZWx5IHRoZSBiYWNrIGNhbVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRldikge1xuICAgICAgICAgICAgICBjb25zdHJhaW50cy52aWRlby5kZXZpY2VJZCA9IGZhY2UuZXhhY3QgPyB7ZXhhY3Q6IGRldi5kZXZpY2VJZH0gOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aWRlYWw6IGRldi5kZXZpY2VJZH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdHJhaW50cy52aWRlbyA9IGNvbnN0cmFpbnRzVG9DaHJvbWVfKGNvbnN0cmFpbnRzLnZpZGVvKTtcbiAgICAgICAgICAgIGxvZ2dpbmcoJ2Nocm9tZTogJyArIEpTT04uc3RyaW5naWZ5KGNvbnN0cmFpbnRzKSk7XG4gICAgICAgICAgICByZXR1cm4gZnVuYyhjb25zdHJhaW50cyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnN0cmFpbnRzLnZpZGVvID0gY29uc3RyYWludHNUb0Nocm9tZV8oY29uc3RyYWludHMudmlkZW8pO1xuICAgIH1cbiAgICBsb2dnaW5nKCdjaHJvbWU6ICcgKyBKU09OLnN0cmluZ2lmeShjb25zdHJhaW50cykpO1xuICAgIHJldHVybiBmdW5jKGNvbnN0cmFpbnRzKTtcbiAgfTtcblxuICB2YXIgc2hpbUVycm9yXyA9IGZ1bmN0aW9uKGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZToge1xuICAgICAgICBQZXJtaXNzaW9uRGVuaWVkRXJyb3I6ICdOb3RBbGxvd2VkRXJyb3InLFxuICAgICAgICBQZXJtaXNzaW9uRGlzbWlzc2VkRXJyb3I6ICdOb3RBbGxvd2VkRXJyb3InLFxuICAgICAgICBJbnZhbGlkU3RhdGVFcnJvcjogJ05vdEFsbG93ZWRFcnJvcicsXG4gICAgICAgIERldmljZXNOb3RGb3VuZEVycm9yOiAnTm90Rm91bmRFcnJvcicsXG4gICAgICAgIENvbnN0cmFpbnROb3RTYXRpc2ZpZWRFcnJvcjogJ092ZXJjb25zdHJhaW5lZEVycm9yJyxcbiAgICAgICAgVHJhY2tTdGFydEVycm9yOiAnTm90UmVhZGFibGVFcnJvcicsXG4gICAgICAgIE1lZGlhRGV2aWNlRmFpbGVkRHVlVG9TaHV0ZG93bjogJ05vdEFsbG93ZWRFcnJvcicsXG4gICAgICAgIE1lZGlhRGV2aWNlS2lsbFN3aXRjaE9uOiAnTm90QWxsb3dlZEVycm9yJyxcbiAgICAgICAgVGFiQ2FwdHVyZUVycm9yOiAnQWJvcnRFcnJvcicsXG4gICAgICAgIFNjcmVlbkNhcHR1cmVFcnJvcjogJ0Fib3J0RXJyb3InLFxuICAgICAgICBEZXZpY2VDYXB0dXJlRXJyb3I6ICdBYm9ydEVycm9yJ1xuICAgICAgfVtlLm5hbWVdIHx8IGUubmFtZSxcbiAgICAgIG1lc3NhZ2U6IGUubWVzc2FnZSxcbiAgICAgIGNvbnN0cmFpbnQ6IGUuY29uc3RyYWludE5hbWUsXG4gICAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWUgKyAodGhpcy5tZXNzYWdlICYmICc6ICcpICsgdGhpcy5tZXNzYWdlO1xuICAgICAgfVxuICAgIH07XG4gIH07XG5cbiAgdmFyIGdldFVzZXJNZWRpYV8gPSBmdW5jdGlvbihjb25zdHJhaW50cywgb25TdWNjZXNzLCBvbkVycm9yKSB7XG4gICAgc2hpbUNvbnN0cmFpbnRzXyhjb25zdHJhaW50cywgZnVuY3Rpb24oYykge1xuICAgICAgbmF2aWdhdG9yLndlYmtpdEdldFVzZXJNZWRpYShjLCBvblN1Y2Nlc3MsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKG9uRXJyb3IpIHtcbiAgICAgICAgICBvbkVycm9yKHNoaW1FcnJvcl8oZSkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhID0gZ2V0VXNlck1lZGlhXztcblxuICAvLyBSZXR1cm5zIHRoZSByZXN1bHQgb2YgZ2V0VXNlck1lZGlhIGFzIGEgUHJvbWlzZS5cbiAgdmFyIGdldFVzZXJNZWRpYVByb21pc2VfID0gZnVuY3Rpb24oY29uc3RyYWludHMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzLCByZXNvbHZlLCByZWplY3QpO1xuICAgIH0pO1xuICB9O1xuXG4gIGlmICghbmF2aWdhdG9yLm1lZGlhRGV2aWNlcykge1xuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMgPSB7XG4gICAgICBnZXRVc2VyTWVkaWE6IGdldFVzZXJNZWRpYVByb21pc2VfLFxuICAgICAgZW51bWVyYXRlRGV2aWNlczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICAgICAgdmFyIGtpbmRzID0ge2F1ZGlvOiAnYXVkaW9pbnB1dCcsIHZpZGVvOiAndmlkZW9pbnB1dCd9O1xuICAgICAgICAgIHJldHVybiB3aW5kb3cuTWVkaWFTdHJlYW1UcmFjay5nZXRTb3VyY2VzKGZ1bmN0aW9uKGRldmljZXMpIHtcbiAgICAgICAgICAgIHJlc29sdmUoZGV2aWNlcy5tYXAoZnVuY3Rpb24oZGV2aWNlKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7bGFiZWw6IGRldmljZS5sYWJlbCxcbiAgICAgICAgICAgICAgICBraW5kOiBraW5kc1tkZXZpY2Uua2luZF0sXG4gICAgICAgICAgICAgICAgZGV2aWNlSWQ6IGRldmljZS5pZCxcbiAgICAgICAgICAgICAgICBncm91cElkOiAnJ307XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGdldFN1cHBvcnRlZENvbnN0cmFpbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBkZXZpY2VJZDogdHJ1ZSwgZWNob0NhbmNlbGxhdGlvbjogdHJ1ZSwgZmFjaW5nTW9kZTogdHJ1ZSxcbiAgICAgICAgICBmcmFtZVJhdGU6IHRydWUsIGhlaWdodDogdHJ1ZSwgd2lkdGg6IHRydWVcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gQSBzaGltIGZvciBnZXRVc2VyTWVkaWEgbWV0aG9kIG9uIHRoZSBtZWRpYURldmljZXMgb2JqZWN0LlxuICAvLyBUT0RPKEthcHRlbkphbnNzb24pIHJlbW92ZSBvbmNlIGltcGxlbWVudGVkIGluIENocm9tZSBzdGFibGUuXG4gIGlmICghbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEpIHtcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSA9IGZ1bmN0aW9uKGNvbnN0cmFpbnRzKSB7XG4gICAgICByZXR1cm4gZ2V0VXNlck1lZGlhUHJvbWlzZV8oY29uc3RyYWludHMpO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgLy8gRXZlbiB0aG91Z2ggQ2hyb21lIDQ1IGhhcyBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzIGFuZCBhIGdldFVzZXJNZWRpYVxuICAgIC8vIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYSBQcm9taXNlLCBpdCBkb2VzIG5vdCBhY2NlcHQgc3BlYy1zdHlsZVxuICAgIC8vIGNvbnN0cmFpbnRzLlxuICAgIHZhciBvcmlnR2V0VXNlck1lZGlhID0gbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEuXG4gICAgICAgIGJpbmQobmF2aWdhdG9yLm1lZGlhRGV2aWNlcyk7XG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEgPSBmdW5jdGlvbihjcykge1xuICAgICAgcmV0dXJuIHNoaW1Db25zdHJhaW50c18oY3MsIGZ1bmN0aW9uKGMpIHtcbiAgICAgICAgcmV0dXJuIG9yaWdHZXRVc2VyTWVkaWEoYykudGhlbihmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgICAgICBpZiAoYy5hdWRpbyAmJiAhc3RyZWFtLmdldEF1ZGlvVHJhY2tzKCkubGVuZ3RoIHx8XG4gICAgICAgICAgICAgIGMudmlkZW8gJiYgIXN0cmVhbS5nZXRWaWRlb1RyYWNrcygpLmxlbmd0aCkge1xuICAgICAgICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcbiAgICAgICAgICAgICAgdHJhY2suc3RvcCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKCcnLCAnTm90Rm91bmRFcnJvcicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gc3RyZWFtO1xuICAgICAgICB9LCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHNoaW1FcnJvcl8oZSkpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cblxuICAvLyBEdW1teSBkZXZpY2VjaGFuZ2UgZXZlbnQgbWV0aG9kcy5cbiAgLy8gVE9ETyhLYXB0ZW5KYW5zc29uKSByZW1vdmUgb25jZSBpbXBsZW1lbnRlZCBpbiBDaHJvbWUgc3RhYmxlLlxuICBpZiAodHlwZW9mIG5hdmlnYXRvci5tZWRpYURldmljZXMuYWRkRXZlbnRMaXN0ZW5lciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIGxvZ2dpbmcoJ0R1bW15IG1lZGlhRGV2aWNlcy5hZGRFdmVudExpc3RlbmVyIGNhbGxlZC4nKTtcbiAgICB9O1xuICB9XG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5yZW1vdmVFdmVudExpc3RlbmVyID09PSAndW5kZWZpbmVkJykge1xuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xuICAgICAgbG9nZ2luZygnRHVtbXkgbWVkaWFEZXZpY2VzLnJlbW92ZUV2ZW50TGlzdGVuZXIgY2FsbGVkLicpO1xuICAgIH07XG4gIH1cbn07XG5cbn0se1wiLi4vdXRpbHMuanNcIjoxM31dLDc6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLypcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTcgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcbiAqICB0cmVlLlxuICovXG4gLyogZXNsaW50LWVudiBub2RlICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBTRFBVdGlscyA9IHJlcXVpcmUoJ3NkcCcpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2hpbVJUQ0ljZUNhbmRpZGF0ZTogZnVuY3Rpb24od2luZG93KSB7XG4gICAgLy8gZm91bmRhdGlvbiBpcyBhcmJpdHJhcmlseSBjaG9zZW4gYXMgYW4gaW5kaWNhdG9yIGZvciBmdWxsIHN1cHBvcnQgZm9yXG4gICAgLy8gaHR0cHM6Ly93M2MuZ2l0aHViLmlvL3dlYnJ0Yy1wYy8jcnRjaWNlY2FuZGlkYXRlLWludGVyZmFjZVxuICAgIGlmICghd2luZG93LlJUQ0ljZUNhbmRpZGF0ZSB8fCAod2luZG93LlJUQ0ljZUNhbmRpZGF0ZSAmJiAnZm91bmRhdGlvbicgaW5cbiAgICAgICAgd2luZG93LlJUQ0ljZUNhbmRpZGF0ZS5wcm90b3R5cGUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIE5hdGl2ZVJUQ0ljZUNhbmRpZGF0ZSA9IHdpbmRvdy5SVENJY2VDYW5kaWRhdGU7XG4gICAgd2luZG93LlJUQ0ljZUNhbmRpZGF0ZSA9IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICAgIC8vIFJlbW92ZSB0aGUgYT0gd2hpY2ggc2hvdWxkbid0IGJlIHBhcnQgb2YgdGhlIGNhbmRpZGF0ZSBzdHJpbmcuXG4gICAgICBpZiAodHlwZW9mIGFyZ3MgPT09ICdvYmplY3QnICYmIGFyZ3MuY2FuZGlkYXRlICYmXG4gICAgICAgICAgYXJncy5jYW5kaWRhdGUuaW5kZXhPZignYT0nKSA9PT0gMCkge1xuICAgICAgICBhcmdzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShhcmdzKSk7XG4gICAgICAgIGFyZ3MuY2FuZGlkYXRlID0gYXJncy5jYW5kaWRhdGUuc3Vic3RyKDIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoYXJncy5jYW5kaWRhdGUgJiYgYXJncy5jYW5kaWRhdGUubGVuZ3RoKSB7XG4gICAgICAgIC8vIEF1Z21lbnQgdGhlIG5hdGl2ZSBjYW5kaWRhdGUgd2l0aCB0aGUgcGFyc2VkIGZpZWxkcy5cbiAgICAgICAgdmFyIG5hdGl2ZUNhbmRpZGF0ZSA9IG5ldyBOYXRpdmVSVENJY2VDYW5kaWRhdGUoYXJncyk7XG4gICAgICAgIHZhciBwYXJzZWRDYW5kaWRhdGUgPSBTRFBVdGlscy5wYXJzZUNhbmRpZGF0ZShhcmdzLmNhbmRpZGF0ZSk7XG4gICAgICAgIHZhciBhdWdtZW50ZWRDYW5kaWRhdGUgPSBPYmplY3QuYXNzaWduKG5hdGl2ZUNhbmRpZGF0ZSxcbiAgICAgICAgICAgIHBhcnNlZENhbmRpZGF0ZSk7XG5cbiAgICAgICAgLy8gQWRkIGEgc2VyaWFsaXplciB0aGF0IGRvZXMgbm90IHNlcmlhbGl6ZSB0aGUgZXh0cmEgYXR0cmlidXRlcy5cbiAgICAgICAgYXVnbWVudGVkQ2FuZGlkYXRlLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjYW5kaWRhdGU6IGF1Z21lbnRlZENhbmRpZGF0ZS5jYW5kaWRhdGUsXG4gICAgICAgICAgICBzZHBNaWQ6IGF1Z21lbnRlZENhbmRpZGF0ZS5zZHBNaWQsXG4gICAgICAgICAgICBzZHBNTGluZUluZGV4OiBhdWdtZW50ZWRDYW5kaWRhdGUuc2RwTUxpbmVJbmRleCxcbiAgICAgICAgICAgIHVzZXJuYW1lRnJhZ21lbnQ6IGF1Z21lbnRlZENhbmRpZGF0ZS51c2VybmFtZUZyYWdtZW50LFxuICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBhdWdtZW50ZWRDYW5kaWRhdGU7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IE5hdGl2ZVJUQ0ljZUNhbmRpZGF0ZShhcmdzKTtcbiAgICB9O1xuICAgIHdpbmRvdy5SVENJY2VDYW5kaWRhdGUucHJvdG90eXBlID0gTmF0aXZlUlRDSWNlQ2FuZGlkYXRlLnByb3RvdHlwZTtcblxuICAgIC8vIEhvb2sgdXAgdGhlIGF1Z21lbnRlZCBjYW5kaWRhdGUgaW4gb25pY2VjYW5kaWRhdGUgYW5kXG4gICAgLy8gYWRkRXZlbnRMaXN0ZW5lcignaWNlY2FuZGlkYXRlJywgLi4uKVxuICAgIHV0aWxzLndyYXBQZWVyQ29ubmVjdGlvbkV2ZW50KHdpbmRvdywgJ2ljZWNhbmRpZGF0ZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGlmIChlLmNhbmRpZGF0ZSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgJ2NhbmRpZGF0ZScsIHtcbiAgICAgICAgICB2YWx1ZTogbmV3IHdpbmRvdy5SVENJY2VDYW5kaWRhdGUoZS5jYW5kaWRhdGUpLFxuICAgICAgICAgIHdyaXRhYmxlOiAnZmFsc2UnXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGU7XG4gICAgfSk7XG4gIH0sXG5cbiAgLy8gc2hpbUNyZWF0ZU9iamVjdFVSTCBtdXN0IGJlIGNhbGxlZCBiZWZvcmUgc2hpbVNvdXJjZU9iamVjdCB0byBhdm9pZCBsb29wLlxuXG4gIHNoaW1DcmVhdGVPYmplY3RVUkw6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIHZhciBVUkwgPSB3aW5kb3cgJiYgd2luZG93LlVSTDtcblxuICAgIGlmICghKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50ICYmXG4gICAgICAgICAgJ3NyY09iamVjdCcgaW4gd2luZG93LkhUTUxNZWRpYUVsZW1lbnQucHJvdG90eXBlICYmXG4gICAgICAgIFVSTC5jcmVhdGVPYmplY3RVUkwgJiYgVVJMLnJldm9rZU9iamVjdFVSTCkpIHtcbiAgICAgIC8vIE9ubHkgc2hpbSBDcmVhdGVPYmplY3RVUkwgdXNpbmcgc3JjT2JqZWN0IGlmIHNyY09iamVjdCBleGlzdHMuXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHZhciBuYXRpdmVDcmVhdGVPYmplY3RVUkwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMLmJpbmQoVVJMKTtcbiAgICB2YXIgbmF0aXZlUmV2b2tlT2JqZWN0VVJMID0gVVJMLnJldm9rZU9iamVjdFVSTC5iaW5kKFVSTCk7XG4gICAgdmFyIHN0cmVhbXMgPSBuZXcgTWFwKCksIG5ld0lkID0gMDtcblxuICAgIFVSTC5jcmVhdGVPYmplY3RVUkwgPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgIGlmICgnZ2V0VHJhY2tzJyBpbiBzdHJlYW0pIHtcbiAgICAgICAgdmFyIHVybCA9ICdwb2x5YmxvYjonICsgKCsrbmV3SWQpO1xuICAgICAgICBzdHJlYW1zLnNldCh1cmwsIHN0cmVhbSk7XG4gICAgICAgIHV0aWxzLmRlcHJlY2F0ZWQoJ1VSTC5jcmVhdGVPYmplY3RVUkwoc3RyZWFtKScsXG4gICAgICAgICAgICAnZWxlbS5zcmNPYmplY3QgPSBzdHJlYW0nKTtcbiAgICAgICAgcmV0dXJuIHVybDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuYXRpdmVDcmVhdGVPYmplY3RVUkwoc3RyZWFtKTtcbiAgICB9O1xuICAgIFVSTC5yZXZva2VPYmplY3RVUkwgPSBmdW5jdGlvbih1cmwpIHtcbiAgICAgIG5hdGl2ZVJldm9rZU9iamVjdFVSTCh1cmwpO1xuICAgICAgc3RyZWFtcy5kZWxldGUodXJsKTtcbiAgICB9O1xuXG4gICAgdmFyIGRzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iod2luZG93LkhUTUxNZWRpYUVsZW1lbnQucHJvdG90eXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzcmMnKTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LkhUTUxNZWRpYUVsZW1lbnQucHJvdG90eXBlLCAnc3JjJywge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGRzYy5nZXQuYXBwbHkodGhpcyk7XG4gICAgICB9LFxuICAgICAgc2V0OiBmdW5jdGlvbih1cmwpIHtcbiAgICAgICAgdGhpcy5zcmNPYmplY3QgPSBzdHJlYW1zLmdldCh1cmwpIHx8IG51bGw7XG4gICAgICAgIHJldHVybiBkc2Muc2V0LmFwcGx5KHRoaXMsIFt1cmxdKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHZhciBuYXRpdmVTZXRBdHRyaWJ1dGUgPSB3aW5kb3cuSFRNTE1lZGlhRWxlbWVudC5wcm90b3R5cGUuc2V0QXR0cmlidXRlO1xuICAgIHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50LnByb3RvdHlwZS5zZXRBdHRyaWJ1dGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyICYmXG4gICAgICAgICAgKCcnICsgYXJndW1lbnRzWzBdKS50b0xvd2VyQ2FzZSgpID09PSAnc3JjJykge1xuICAgICAgICB0aGlzLnNyY09iamVjdCA9IHN0cmVhbXMuZ2V0KGFyZ3VtZW50c1sxXSkgfHwgbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuYXRpdmVTZXRBdHRyaWJ1dGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9LFxuXG4gIHNoaW1NYXhNZXNzYWdlU2l6ZTogZnVuY3Rpb24od2luZG93KSB7XG4gICAgaWYgKHdpbmRvdy5SVENTY3RwVHJhbnNwb3J0IHx8ICF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGJyb3dzZXJEZXRhaWxzID0gdXRpbHMuZGV0ZWN0QnJvd3Nlcih3aW5kb3cpO1xuXG4gICAgaWYgKCEoJ3NjdHAnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSwgJ3NjdHAnLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLl9zY3RwID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiB0aGlzLl9zY3RwO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB2YXIgc2N0cEluRGVzY3JpcHRpb24gPSBmdW5jdGlvbihkZXNjcmlwdGlvbikge1xuICAgICAgdmFyIHNlY3Rpb25zID0gU0RQVXRpbHMuc3BsaXRTZWN0aW9ucyhkZXNjcmlwdGlvbi5zZHApO1xuICAgICAgc2VjdGlvbnMuc2hpZnQoKTtcbiAgICAgIHJldHVybiBzZWN0aW9ucy5zb21lKGZ1bmN0aW9uKG1lZGlhU2VjdGlvbikge1xuICAgICAgICB2YXIgbUxpbmUgPSBTRFBVdGlscy5wYXJzZU1MaW5lKG1lZGlhU2VjdGlvbik7XG4gICAgICAgIHJldHVybiBtTGluZSAmJiBtTGluZS5raW5kID09PSAnYXBwbGljYXRpb24nXG4gICAgICAgICAgICAmJiBtTGluZS5wcm90b2NvbC5pbmRleE9mKCdTQ1RQJykgIT09IC0xO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBnZXRSZW1vdGVGaXJlZm94VmVyc2lvbiA9IGZ1bmN0aW9uKGRlc2NyaXB0aW9uKSB7XG4gICAgICAvLyBUT0RPOiBJcyB0aGVyZSBhIGJldHRlciBzb2x1dGlvbiBmb3IgZGV0ZWN0aW5nIEZpcmVmb3g/XG4gICAgICB2YXIgbWF0Y2ggPSBkZXNjcmlwdGlvbi5zZHAubWF0Y2goL21vemlsbGEuLi5USElTX0lTX1NEUEFSVEEtKFxcZCspLyk7XG4gICAgICBpZiAobWF0Y2ggPT09IG51bGwgfHwgbWF0Y2gubGVuZ3RoIDwgMikge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgICB9XG4gICAgICB2YXIgdmVyc2lvbiA9IHBhcnNlSW50KG1hdGNoWzFdLCAxMCk7XG4gICAgICAvLyBUZXN0IGZvciBOYU4gKHllcywgdGhpcyBpcyB1Z2x5KVxuICAgICAgcmV0dXJuIHZlcnNpb24gIT09IHZlcnNpb24gPyAtMSA6IHZlcnNpb247XG4gICAgfTtcblxuICAgIHZhciBnZXRDYW5TZW5kTWF4TWVzc2FnZVNpemUgPSBmdW5jdGlvbihyZW1vdGVJc0ZpcmVmb3gpIHtcbiAgICAgIC8vIEV2ZXJ5IGltcGxlbWVudGF0aW9uIHdlIGtub3cgY2FuIHNlbmQgYXQgbGVhc3QgNjQgS2lCLlxuICAgICAgLy8gTm90ZTogQWx0aG91Z2ggQ2hyb21lIGlzIHRlY2huaWNhbGx5IGFibGUgdG8gc2VuZCB1cCB0byAyNTYgS2lCLCB0aGVcbiAgICAgIC8vICAgICAgIGRhdGEgZG9lcyBub3QgcmVhY2ggdGhlIG90aGVyIHBlZXIgcmVsaWFibHkuXG4gICAgICAvLyAgICAgICBTZWU6IGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC93ZWJydGMvaXNzdWVzL2RldGFpbD9pZD04NDE5XG4gICAgICB2YXIgY2FuU2VuZE1heE1lc3NhZ2VTaXplID0gNjU1MzY7XG4gICAgICBpZiAoYnJvd3NlckRldGFpbHMuYnJvd3NlciA9PT0gJ2ZpcmVmb3gnKSB7XG4gICAgICAgIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgNTcpIHtcbiAgICAgICAgICBpZiAocmVtb3RlSXNGaXJlZm94ID09PSAtMSkge1xuICAgICAgICAgICAgLy8gRkYgPCA1NyB3aWxsIHNlbmQgaW4gMTYgS2lCIGNodW5rcyB1c2luZyB0aGUgZGVwcmVjYXRlZCBQUElEXG4gICAgICAgICAgICAvLyBmcmFnbWVudGF0aW9uLlxuICAgICAgICAgICAgY2FuU2VuZE1heE1lc3NhZ2VTaXplID0gMTYzODQ7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEhvd2V2ZXIsIG90aGVyIEZGIChhbmQgUkFXUlRDKSBjYW4gcmVhc3NlbWJsZSBQUElELWZyYWdtZW50ZWRcbiAgICAgICAgICAgIC8vIG1lc3NhZ2VzLiBUaHVzLCBzdXBwb3J0aW5nIH4yIEdpQiB3aGVuIHNlbmRpbmcuXG4gICAgICAgICAgICBjYW5TZW5kTWF4TWVzc2FnZVNpemUgPSAyMTQ3NDgzNjM3O1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBDdXJyZW50bHksIGFsbCBGRiA+PSA1NyB3aWxsIHJlc2V0IHRoZSByZW1vdGUgbWF4aW11bSBtZXNzYWdlIHNpemVcbiAgICAgICAgICAvLyB0byB0aGUgZGVmYXVsdCB2YWx1ZSB3aGVuIGEgZGF0YSBjaGFubmVsIGlzIGNyZWF0ZWQgYXQgYSBsYXRlclxuICAgICAgICAgIC8vIHN0YWdlLiA6KFxuICAgICAgICAgIC8vIFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTQyNjgzMVxuICAgICAgICAgIGNhblNlbmRNYXhNZXNzYWdlU2l6ZSA9XG4gICAgICAgICAgICBicm93c2VyRGV0YWlscy52ZXJzaW9uID09PSA1NyA/IDY1NTM1IDogNjU1MzY7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBjYW5TZW5kTWF4TWVzc2FnZVNpemU7XG4gICAgfTtcblxuICAgIHZhciBnZXRNYXhNZXNzYWdlU2l6ZSA9IGZ1bmN0aW9uKGRlc2NyaXB0aW9uLCByZW1vdGVJc0ZpcmVmb3gpIHtcbiAgICAgIC8vIE5vdGU6IDY1NTM2IGJ5dGVzIGlzIHRoZSBkZWZhdWx0IHZhbHVlIGZyb20gdGhlIFNEUCBzcGVjLiBBbHNvLFxuICAgICAgLy8gICAgICAgZXZlcnkgaW1wbGVtZW50YXRpb24gd2Uga25vdyBzdXBwb3J0cyByZWNlaXZpbmcgNjU1MzYgYnl0ZXMuXG4gICAgICB2YXIgbWF4TWVzc2FnZVNpemUgPSA2NTUzNjtcblxuICAgICAgLy8gRkYgNTcgaGFzIGEgc2xpZ2h0bHkgaW5jb3JyZWN0IGRlZmF1bHQgcmVtb3RlIG1heCBtZXNzYWdlIHNpemUsIHNvXG4gICAgICAvLyB3ZSBuZWVkIHRvIGFkanVzdCBpdCBoZXJlIHRvIGF2b2lkIGEgZmFpbHVyZSB3aGVuIHNlbmRpbmcuXG4gICAgICAvLyBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTE0MjU2OTdcbiAgICAgIGlmIChicm93c2VyRGV0YWlscy5icm93c2VyID09PSAnZmlyZWZveCdcbiAgICAgICAgICAgJiYgYnJvd3NlckRldGFpbHMudmVyc2lvbiA9PT0gNTcpIHtcbiAgICAgICAgbWF4TWVzc2FnZVNpemUgPSA2NTUzNTtcbiAgICAgIH1cblxuICAgICAgdmFyIG1hdGNoID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgoZGVzY3JpcHRpb24uc2RwLCAnYT1tYXgtbWVzc2FnZS1zaXplOicpO1xuICAgICAgaWYgKG1hdGNoLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbWF4TWVzc2FnZVNpemUgPSBwYXJzZUludChtYXRjaFswXS5zdWJzdHIoMTkpLCAxMCk7XG4gICAgICB9IGVsc2UgaWYgKGJyb3dzZXJEZXRhaWxzLmJyb3dzZXIgPT09ICdmaXJlZm94JyAmJlxuICAgICAgICAgICAgICAgICAgcmVtb3RlSXNGaXJlZm94ICE9PSAtMSkge1xuICAgICAgICAvLyBJZiB0aGUgbWF4aW11bSBtZXNzYWdlIHNpemUgaXMgbm90IHByZXNlbnQgaW4gdGhlIHJlbW90ZSBTRFAgYW5kXG4gICAgICAgIC8vIGJvdGggbG9jYWwgYW5kIHJlbW90ZSBhcmUgRmlyZWZveCwgdGhlIHJlbW90ZSBwZWVyIGNhbiByZWNlaXZlXG4gICAgICAgIC8vIH4yIEdpQi5cbiAgICAgICAgbWF4TWVzc2FnZVNpemUgPSAyMTQ3NDgzNjM3O1xuICAgICAgfVxuICAgICAgcmV0dXJuIG1heE1lc3NhZ2VTaXplO1xuICAgIH07XG5cbiAgICB2YXIgb3JpZ1NldFJlbW90ZURlc2NyaXB0aW9uID1cbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5zZXRSZW1vdGVEZXNjcmlwdGlvbjtcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnNldFJlbW90ZURlc2NyaXB0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgcGMuX3NjdHAgPSBudWxsO1xuXG4gICAgICBpZiAoc2N0cEluRGVzY3JpcHRpb24oYXJndW1lbnRzWzBdKSkge1xuICAgICAgICAvLyBDaGVjayBpZiB0aGUgcmVtb3RlIGlzIEZGLlxuICAgICAgICB2YXIgaXNGaXJlZm94ID0gZ2V0UmVtb3RlRmlyZWZveFZlcnNpb24oYXJndW1lbnRzWzBdKTtcblxuICAgICAgICAvLyBHZXQgdGhlIG1heGltdW0gbWVzc2FnZSBzaXplIHRoZSBsb2NhbCBwZWVyIGlzIGNhcGFibGUgb2Ygc2VuZGluZ1xuICAgICAgICB2YXIgY2FuU2VuZE1NUyA9IGdldENhblNlbmRNYXhNZXNzYWdlU2l6ZShpc0ZpcmVmb3gpO1xuXG4gICAgICAgIC8vIEdldCB0aGUgbWF4aW11bSBtZXNzYWdlIHNpemUgb2YgdGhlIHJlbW90ZSBwZWVyLlxuICAgICAgICB2YXIgcmVtb3RlTU1TID0gZ2V0TWF4TWVzc2FnZVNpemUoYXJndW1lbnRzWzBdLCBpc0ZpcmVmb3gpO1xuXG4gICAgICAgIC8vIERldGVybWluZSBmaW5hbCBtYXhpbXVtIG1lc3NhZ2Ugc2l6ZVxuICAgICAgICB2YXIgbWF4TWVzc2FnZVNpemU7XG4gICAgICAgIGlmIChjYW5TZW5kTU1TID09PSAwICYmIHJlbW90ZU1NUyA9PT0gMCkge1xuICAgICAgICAgIG1heE1lc3NhZ2VTaXplID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuICAgICAgICB9IGVsc2UgaWYgKGNhblNlbmRNTVMgPT09IDAgfHwgcmVtb3RlTU1TID09PSAwKSB7XG4gICAgICAgICAgbWF4TWVzc2FnZVNpemUgPSBNYXRoLm1heChjYW5TZW5kTU1TLCByZW1vdGVNTVMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1heE1lc3NhZ2VTaXplID0gTWF0aC5taW4oY2FuU2VuZE1NUywgcmVtb3RlTU1TKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENyZWF0ZSBhIGR1bW15IFJUQ1NjdHBUcmFuc3BvcnQgb2JqZWN0IGFuZCB0aGUgJ21heE1lc3NhZ2VTaXplJ1xuICAgICAgICAvLyBhdHRyaWJ1dGUuXG4gICAgICAgIHZhciBzY3RwID0ge307XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzY3RwLCAnbWF4TWVzc2FnZVNpemUnLCB7XG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBtYXhNZXNzYWdlU2l6ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBwYy5fc2N0cCA9IHNjdHA7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvcmlnU2V0UmVtb3RlRGVzY3JpcHRpb24uYXBwbHkocGMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfSxcblxuICBzaGltU2VuZFRocm93VHlwZUVycm9yOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICBpZiAoISh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gJiZcbiAgICAgICAgJ2NyZWF0ZURhdGFDaGFubmVsJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIE5vdGU6IEFsdGhvdWdoIEZpcmVmb3ggPj0gNTcgaGFzIGEgbmF0aXZlIGltcGxlbWVudGF0aW9uLCB0aGUgbWF4aW11bVxuICAgIC8vICAgICAgIG1lc3NhZ2Ugc2l6ZSBjYW4gYmUgcmVzZXQgZm9yIGFsbCBkYXRhIGNoYW5uZWxzIGF0IGEgbGF0ZXIgc3RhZ2UuXG4gICAgLy8gICAgICAgU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xNDI2ODMxXG5cbiAgICB2YXIgb3JpZ0NyZWF0ZURhdGFDaGFubmVsID1cbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlRGF0YUNoYW5uZWw7XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5jcmVhdGVEYXRhQ2hhbm5lbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgIHZhciBkYXRhQ2hhbm5lbCA9IG9yaWdDcmVhdGVEYXRhQ2hhbm5lbC5hcHBseShwYywgYXJndW1lbnRzKTtcbiAgICAgIHZhciBvcmlnRGF0YUNoYW5uZWxTZW5kID0gZGF0YUNoYW5uZWwuc2VuZDtcblxuICAgICAgLy8gUGF0Y2ggJ3NlbmQnIG1ldGhvZFxuICAgICAgZGF0YUNoYW5uZWwuc2VuZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZGMgPSB0aGlzO1xuICAgICAgICB2YXIgZGF0YSA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgdmFyIGxlbmd0aCA9IGRhdGEubGVuZ3RoIHx8IGRhdGEuc2l6ZSB8fCBkYXRhLmJ5dGVMZW5ndGg7XG4gICAgICAgIGlmIChsZW5ndGggPiBwYy5zY3RwLm1heE1lc3NhZ2VTaXplKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbignTWVzc2FnZSB0b28gbGFyZ2UgKGNhbiBzZW5kIGEgbWF4aW11bSBvZiAnICtcbiAgICAgICAgICAgIHBjLnNjdHAubWF4TWVzc2FnZVNpemUgKyAnIGJ5dGVzKScsICdUeXBlRXJyb3InKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3JpZ0RhdGFDaGFubmVsU2VuZC5hcHBseShkYywgYXJndW1lbnRzKTtcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiBkYXRhQ2hhbm5lbDtcbiAgICB9O1xuICB9XG59O1xuXG59LHtcIi4vdXRpbHNcIjoxMyxcInNkcFwiOjJ9XSw4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8qXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXG4gKiAgdHJlZS5cbiAqL1xuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xudmFyIHNoaW1SVENQZWVyQ29ubmVjdGlvbiA9IHJlcXVpcmUoJ3J0Y3BlZXJjb25uZWN0aW9uLXNoaW0nKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNoaW1HZXRVc2VyTWVkaWE6IHJlcXVpcmUoJy4vZ2V0dXNlcm1lZGlhJyksXG4gIHNoaW1QZWVyQ29ubmVjdGlvbjogZnVuY3Rpb24od2luZG93KSB7XG4gICAgdmFyIGJyb3dzZXJEZXRhaWxzID0gdXRpbHMuZGV0ZWN0QnJvd3Nlcih3aW5kb3cpO1xuXG4gICAgaWYgKHdpbmRvdy5SVENJY2VHYXRoZXJlcikge1xuICAgICAgaWYgKCF3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlKSB7XG4gICAgICAgIHdpbmRvdy5SVENJY2VDYW5kaWRhdGUgPSBmdW5jdGlvbihhcmdzKSB7XG4gICAgICAgICAgcmV0dXJuIGFyZ3M7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBpZiAoIXdpbmRvdy5SVENTZXNzaW9uRGVzY3JpcHRpb24pIHtcbiAgICAgICAgd2luZG93LlJUQ1Nlc3Npb25EZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICAgICAgICByZXR1cm4gYXJncztcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIC8vIHRoaXMgYWRkcyBhbiBhZGRpdGlvbmFsIGV2ZW50IGxpc3RlbmVyIHRvIE1lZGlhU3RyYWNrVHJhY2sgdGhhdCBzaWduYWxzXG4gICAgICAvLyB3aGVuIGEgdHJhY2tzIGVuYWJsZWQgcHJvcGVydHkgd2FzIGNoYW5nZWQuIFdvcmthcm91bmQgZm9yIGEgYnVnIGluXG4gICAgICAvLyBhZGRTdHJlYW0sIHNlZSBiZWxvdy4gTm8gbG9uZ2VyIHJlcXVpcmVkIGluIDE1MDI1K1xuICAgICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCAxNTAyNSkge1xuICAgICAgICB2YXIgb3JpZ01TVEVuYWJsZWQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKFxuICAgICAgICAgICAgd2luZG93Lk1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLCAnZW5hYmxlZCcpO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93Lk1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLCAnZW5hYmxlZCcsIHtcbiAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICBvcmlnTVNURW5hYmxlZC5zZXQuY2FsbCh0aGlzLCB2YWx1ZSk7XG4gICAgICAgICAgICB2YXIgZXYgPSBuZXcgRXZlbnQoJ2VuYWJsZWQnKTtcbiAgICAgICAgICAgIGV2LmVuYWJsZWQgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBPUlRDIGRlZmluZXMgdGhlIERUTUYgc2VuZGVyIGEgYml0IGRpZmZlcmVudC5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdzNjL29ydGMvaXNzdWVzLzcxNFxuICAgIGlmICh3aW5kb3cuUlRDUnRwU2VuZGVyICYmICEoJ2R0bWYnIGluIHdpbmRvdy5SVENSdHBTZW5kZXIucHJvdG90eXBlKSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENSdHBTZW5kZXIucHJvdG90eXBlLCAnZHRtZicsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAodGhpcy5fZHRtZiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50cmFjay5raW5kID09PSAnYXVkaW8nKSB7XG4gICAgICAgICAgICAgIHRoaXMuX2R0bWYgPSBuZXcgd2luZG93LlJUQ0R0bWZTZW5kZXIodGhpcyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHJhY2sua2luZCA9PT0gJ3ZpZGVvJykge1xuICAgICAgICAgICAgICB0aGlzLl9kdG1mID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2R0bWY7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBFZGdlIGN1cnJlbnRseSBvbmx5IGltcGxlbWVudHMgdGhlIFJUQ0R0bWZTZW5kZXIsIG5vdCB0aGVcbiAgICAvLyBSVENEVE1GU2VuZGVyIGFsaWFzLiBTZWUgaHR0cDovL2RyYWZ0Lm9ydGMub3JnLyNydGNkdG1mc2VuZGVyMipcbiAgICBpZiAod2luZG93LlJUQ0R0bWZTZW5kZXIgJiYgIXdpbmRvdy5SVENEVE1GU2VuZGVyKSB7XG4gICAgICB3aW5kb3cuUlRDRFRNRlNlbmRlciA9IHdpbmRvdy5SVENEdG1mU2VuZGVyO1xuICAgIH1cblxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiA9XG4gICAgICAgIHNoaW1SVENQZWVyQ29ubmVjdGlvbih3aW5kb3csIGJyb3dzZXJEZXRhaWxzLnZlcnNpb24pO1xuICB9LFxuICBzaGltUmVwbGFjZVRyYWNrOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICAvLyBPUlRDIGhhcyByZXBsYWNlVHJhY2sgLS0gaHR0cHM6Ly9naXRodWIuY29tL3czYy9vcnRjL2lzc3Vlcy82MTRcbiAgICBpZiAod2luZG93LlJUQ1J0cFNlbmRlciAmJlxuICAgICAgICAhKCdyZXBsYWNlVHJhY2snIGluIHdpbmRvdy5SVENSdHBTZW5kZXIucHJvdG90eXBlKSkge1xuICAgICAgd2luZG93LlJUQ1J0cFNlbmRlci5wcm90b3R5cGUucmVwbGFjZVRyYWNrID1cbiAgICAgICAgICB3aW5kb3cuUlRDUnRwU2VuZGVyLnByb3RvdHlwZS5zZXRUcmFjaztcbiAgICB9XG4gIH1cbn07XG5cbn0se1wiLi4vdXRpbHNcIjoxMyxcIi4vZ2V0dXNlcm1lZGlhXCI6OSxcInJ0Y3BlZXJjb25uZWN0aW9uLXNoaW1cIjoxfV0sOTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vKlxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxuICogIHRyZWUuXG4gKi9cbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cbid1c2Ugc3RyaWN0JztcblxuLy8gRXhwb3NlIHB1YmxpYyBtZXRob2RzLlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih3aW5kb3cpIHtcbiAgdmFyIG5hdmlnYXRvciA9IHdpbmRvdyAmJiB3aW5kb3cubmF2aWdhdG9yO1xuXG4gIHZhciBzaGltRXJyb3JfID0gZnVuY3Rpb24oZSkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiB7UGVybWlzc2lvbkRlbmllZEVycm9yOiAnTm90QWxsb3dlZEVycm9yJ31bZS5uYW1lXSB8fCBlLm5hbWUsXG4gICAgICBtZXNzYWdlOiBlLm1lc3NhZ2UsXG4gICAgICBjb25zdHJhaW50OiBlLmNvbnN0cmFpbnQsXG4gICAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWU7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICAvLyBnZXRVc2VyTWVkaWEgZXJyb3Igc2hpbS5cbiAgdmFyIG9yaWdHZXRVc2VyTWVkaWEgPSBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYS5cbiAgICAgIGJpbmQobmF2aWdhdG9yLm1lZGlhRGV2aWNlcyk7XG4gIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhID0gZnVuY3Rpb24oYykge1xuICAgIHJldHVybiBvcmlnR2V0VXNlck1lZGlhKGMpLmNhdGNoKGZ1bmN0aW9uKGUpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChzaGltRXJyb3JfKGUpKTtcbiAgICB9KTtcbiAgfTtcbn07XG5cbn0se31dLDEwOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8qXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXG4gKiAgdHJlZS5cbiAqL1xuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2hpbUdldFVzZXJNZWRpYTogcmVxdWlyZSgnLi9nZXR1c2VybWVkaWEnKSxcbiAgc2hpbU9uVHJhY2s6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gJiYgISgnb250cmFjaycgaW5cbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLCAnb250cmFjaycsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fb250cmFjaztcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbihmKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX29udHJhY2spIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhY2snLCB0aGlzLl9vbnRyYWNrKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWRkc3RyZWFtJywgdGhpcy5fb250cmFja3BvbHkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYWNrJywgdGhpcy5fb250cmFjayA9IGYpO1xuICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignYWRkc3RyZWFtJywgdGhpcy5fb250cmFja3BvbHkgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XG4gICAgICAgICAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgndHJhY2snKTtcbiAgICAgICAgICAgICAgZXZlbnQudHJhY2sgPSB0cmFjaztcbiAgICAgICAgICAgICAgZXZlbnQucmVjZWl2ZXIgPSB7dHJhY2s6IHRyYWNrfTtcbiAgICAgICAgICAgICAgZXZlbnQudHJhbnNjZWl2ZXIgPSB7cmVjZWl2ZXI6IGV2ZW50LnJlY2VpdmVyfTtcbiAgICAgICAgICAgICAgZXZlbnQuc3RyZWFtcyA9IFtlLnN0cmVhbV07XG4gICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgd2luZG93LlJUQ1RyYWNrRXZlbnQgJiZcbiAgICAgICAgKCdyZWNlaXZlcicgaW4gd2luZG93LlJUQ1RyYWNrRXZlbnQucHJvdG90eXBlKSAmJlxuICAgICAgICAhKCd0cmFuc2NlaXZlcicgaW4gd2luZG93LlJUQ1RyYWNrRXZlbnQucHJvdG90eXBlKSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENUcmFja0V2ZW50LnByb3RvdHlwZSwgJ3RyYW5zY2VpdmVyJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB7cmVjZWl2ZXI6IHRoaXMucmVjZWl2ZXJ9O1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgc2hpbVNvdXJjZU9iamVjdDogZnVuY3Rpb24od2luZG93KSB7XG4gICAgLy8gRmlyZWZveCBoYXMgc3VwcG9ydGVkIG1velNyY09iamVjdCBzaW5jZSBGRjIyLCB1bnByZWZpeGVkIGluIDQyLlxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50ICYmXG4gICAgICAgICEoJ3NyY09iamVjdCcgaW4gd2luZG93LkhUTUxNZWRpYUVsZW1lbnQucHJvdG90eXBlKSkge1xuICAgICAgICAvLyBTaGltIHRoZSBzcmNPYmplY3QgcHJvcGVydHksIG9uY2UsIHdoZW4gSFRNTE1lZGlhRWxlbWVudCBpcyBmb3VuZC5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50LnByb3RvdHlwZSwgJ3NyY09iamVjdCcsIHtcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW96U3JjT2JqZWN0O1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc2V0OiBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgICAgICAgIHRoaXMubW96U3JjT2JqZWN0ID0gc3RyZWFtO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHNoaW1QZWVyQ29ubmVjdGlvbjogZnVuY3Rpb24od2luZG93KSB7XG4gICAgdmFyIGJyb3dzZXJEZXRhaWxzID0gdXRpbHMuZGV0ZWN0QnJvd3Nlcih3aW5kb3cpO1xuXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICdvYmplY3QnIHx8ICEod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uIHx8XG4gICAgICAgIHdpbmRvdy5tb3pSVENQZWVyQ29ubmVjdGlvbikpIHtcbiAgICAgIHJldHVybjsgLy8gcHJvYmFibHkgbWVkaWEucGVlcmNvbm5lY3Rpb24uZW5hYmxlZD1mYWxzZSBpbiBhYm91dDpjb25maWdcbiAgICB9XG4gICAgLy8gVGhlIFJUQ1BlZXJDb25uZWN0aW9uIG9iamVjdC5cbiAgICBpZiAoIXdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbikge1xuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uID0gZnVuY3Rpb24ocGNDb25maWcsIHBjQ29uc3RyYWludHMpIHtcbiAgICAgICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCAzOCkge1xuICAgICAgICAgIC8vIC51cmxzIGlzIG5vdCBzdXBwb3J0ZWQgaW4gRkYgPCAzOC5cbiAgICAgICAgICAvLyBjcmVhdGUgUlRDSWNlU2VydmVycyB3aXRoIGEgc2luZ2xlIHVybC5cbiAgICAgICAgICBpZiAocGNDb25maWcgJiYgcGNDb25maWcuaWNlU2VydmVycykge1xuICAgICAgICAgICAgdmFyIG5ld0ljZVNlcnZlcnMgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGNDb25maWcuaWNlU2VydmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICB2YXIgc2VydmVyID0gcGNDb25maWcuaWNlU2VydmVyc1tpXTtcbiAgICAgICAgICAgICAgaWYgKHNlcnZlci5oYXNPd25Qcm9wZXJ0eSgndXJscycpKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzZXJ2ZXIudXJscy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgdmFyIG5ld1NlcnZlciA9IHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBzZXJ2ZXIudXJsc1tqXVxuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgIGlmIChzZXJ2ZXIudXJsc1tqXS5pbmRleE9mKCd0dXJuJykgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3U2VydmVyLnVzZXJuYW1lID0gc2VydmVyLnVzZXJuYW1lO1xuICAgICAgICAgICAgICAgICAgICBuZXdTZXJ2ZXIuY3JlZGVudGlhbCA9IHNlcnZlci5jcmVkZW50aWFsO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgbmV3SWNlU2VydmVycy5wdXNoKG5ld1NlcnZlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld0ljZVNlcnZlcnMucHVzaChwY0NvbmZpZy5pY2VTZXJ2ZXJzW2ldKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGNDb25maWcuaWNlU2VydmVycyA9IG5ld0ljZVNlcnZlcnM7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgd2luZG93Lm1velJUQ1BlZXJDb25uZWN0aW9uKHBjQ29uZmlnLCBwY0NvbnN0cmFpbnRzKTtcbiAgICAgIH07XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlID1cbiAgICAgICAgICB3aW5kb3cubW96UlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlO1xuXG4gICAgICAvLyB3cmFwIHN0YXRpYyBtZXRob2RzLiBDdXJyZW50bHkganVzdCBnZW5lcmF0ZUNlcnRpZmljYXRlLlxuICAgICAgaWYgKHdpbmRvdy5tb3pSVENQZWVyQ29ubmVjdGlvbi5nZW5lcmF0ZUNlcnRpZmljYXRlKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24sICdnZW5lcmF0ZUNlcnRpZmljYXRlJywge1xuICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93Lm1velJUQ1BlZXJDb25uZWN0aW9uLmdlbmVyYXRlQ2VydGlmaWNhdGU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgd2luZG93LlJUQ1Nlc3Npb25EZXNjcmlwdGlvbiA9IHdpbmRvdy5tb3pSVENTZXNzaW9uRGVzY3JpcHRpb247XG4gICAgICB3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlID0gd2luZG93Lm1velJUQ0ljZUNhbmRpZGF0ZTtcbiAgICB9XG5cbiAgICAvLyBzaGltIGF3YXkgbmVlZCBmb3Igb2Jzb2xldGUgUlRDSWNlQ2FuZGlkYXRlL1JUQ1Nlc3Npb25EZXNjcmlwdGlvbi5cbiAgICBbJ3NldExvY2FsRGVzY3JpcHRpb24nLCAnc2V0UmVtb3RlRGVzY3JpcHRpb24nLCAnYWRkSWNlQ2FuZGlkYXRlJ11cbiAgICAgICAgLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgICAgdmFyIG5hdGl2ZU1ldGhvZCA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXTtcbiAgICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGFyZ3VtZW50c1swXSA9IG5ldyAoKG1ldGhvZCA9PT0gJ2FkZEljZUNhbmRpZGF0ZScpID9cbiAgICAgICAgICAgICAgICB3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlIDpcbiAgICAgICAgICAgICAgICB3aW5kb3cuUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKShhcmd1bWVudHNbMF0pO1xuICAgICAgICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgLy8gc3VwcG9ydCBmb3IgYWRkSWNlQ2FuZGlkYXRlKG51bGwgb3IgdW5kZWZpbmVkKVxuICAgIHZhciBuYXRpdmVBZGRJY2VDYW5kaWRhdGUgPVxuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZEljZUNhbmRpZGF0ZTtcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZEljZUNhbmRpZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCFhcmd1bWVudHNbMF0pIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50c1sxXSkge1xuICAgICAgICAgIGFyZ3VtZW50c1sxXS5hcHBseShudWxsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmF0aXZlQWRkSWNlQ2FuZGlkYXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcblxuICAgIC8vIHNoaW0gZ2V0U3RhdHMgd2l0aCBtYXBsaWtlIHN1cHBvcnRcbiAgICB2YXIgbWFrZU1hcFN0YXRzID0gZnVuY3Rpb24oc3RhdHMpIHtcbiAgICAgIHZhciBtYXAgPSBuZXcgTWFwKCk7XG4gICAgICBPYmplY3Qua2V5cyhzdGF0cykuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgbWFwLnNldChrZXksIHN0YXRzW2tleV0pO1xuICAgICAgICBtYXBba2V5XSA9IHN0YXRzW2tleV07XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBtYXA7XG4gICAgfTtcblxuICAgIHZhciBtb2Rlcm5TdGF0c1R5cGVzID0ge1xuICAgICAgaW5ib3VuZHJ0cDogJ2luYm91bmQtcnRwJyxcbiAgICAgIG91dGJvdW5kcnRwOiAnb3V0Ym91bmQtcnRwJyxcbiAgICAgIGNhbmRpZGF0ZXBhaXI6ICdjYW5kaWRhdGUtcGFpcicsXG4gICAgICBsb2NhbGNhbmRpZGF0ZTogJ2xvY2FsLWNhbmRpZGF0ZScsXG4gICAgICByZW1vdGVjYW5kaWRhdGU6ICdyZW1vdGUtY2FuZGlkYXRlJ1xuICAgIH07XG5cbiAgICB2YXIgbmF0aXZlR2V0U3RhdHMgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFN0YXRzO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U3RhdHMgPSBmdW5jdGlvbihcbiAgICAgIHNlbGVjdG9yLFxuICAgICAgb25TdWNjLFxuICAgICAgb25FcnJcbiAgICApIHtcbiAgICAgIHJldHVybiBuYXRpdmVHZXRTdGF0cy5hcHBseSh0aGlzLCBbc2VsZWN0b3IgfHwgbnVsbF0pXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKHN0YXRzKSB7XG4gICAgICAgICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCA0OCkge1xuICAgICAgICAgICAgc3RhdHMgPSBtYWtlTWFwU3RhdHMoc3RhdHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDUzICYmICFvblN1Y2MpIHtcbiAgICAgICAgICAgIC8vIFNoaW0gb25seSBwcm9taXNlIGdldFN0YXRzIHdpdGggc3BlYy1oeXBoZW5zIGluIHR5cGUgbmFtZXNcbiAgICAgICAgICAgIC8vIExlYXZlIGNhbGxiYWNrIHZlcnNpb24gYWxvbmU7IG1pc2Mgb2xkIHVzZXMgb2YgZm9yRWFjaCBiZWZvcmUgTWFwXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBzdGF0cy5mb3JFYWNoKGZ1bmN0aW9uKHN0YXQpIHtcbiAgICAgICAgICAgICAgICBzdGF0LnR5cGUgPSBtb2Rlcm5TdGF0c1R5cGVzW3N0YXQudHlwZV0gfHwgc3RhdC50eXBlO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgaWYgKGUubmFtZSAhPT0gJ1R5cGVFcnJvcicpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vIEF2b2lkIFR5cGVFcnJvcjogXCJ0eXBlXCIgaXMgcmVhZC1vbmx5LCBpbiBvbGQgdmVyc2lvbnMuIDM0LTQzaXNoXG4gICAgICAgICAgICAgIHN0YXRzLmZvckVhY2goZnVuY3Rpb24oc3RhdCwgaSkge1xuICAgICAgICAgICAgICAgIHN0YXRzLnNldChpLCBPYmplY3QuYXNzaWduKHt9LCBzdGF0LCB7XG4gICAgICAgICAgICAgICAgICB0eXBlOiBtb2Rlcm5TdGF0c1R5cGVzW3N0YXQudHlwZV0gfHwgc3RhdC50eXBlXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHN0YXRzO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihvblN1Y2MsIG9uRXJyKTtcbiAgICB9O1xuICB9LFxuXG4gIHNoaW1SZW1vdmVTdHJlYW06IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIGlmICghd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uIHx8XG4gICAgICAgICdyZW1vdmVTdHJlYW0nIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICB1dGlscy5kZXByZWNhdGVkKCdyZW1vdmVTdHJlYW0nLCAncmVtb3ZlVHJhY2snKTtcbiAgICAgIHRoaXMuZ2V0U2VuZGVycygpLmZvckVhY2goZnVuY3Rpb24oc2VuZGVyKSB7XG4gICAgICAgIGlmIChzZW5kZXIudHJhY2sgJiYgc3RyZWFtLmdldFRyYWNrcygpLmluZGV4T2Yoc2VuZGVyLnRyYWNrKSAhPT0gLTEpIHtcbiAgICAgICAgICBwYy5yZW1vdmVUcmFjayhzZW5kZXIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG59O1xuXG59LHtcIi4uL3V0aWxzXCI6MTMsXCIuL2dldHVzZXJtZWRpYVwiOjExfV0sMTE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLypcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcbiAqICB0cmVlLlxuICovXG4gLyogZXNsaW50LWVudiBub2RlICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG52YXIgbG9nZ2luZyA9IHV0aWxzLmxvZztcblxuLy8gRXhwb3NlIHB1YmxpYyBtZXRob2RzLlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih3aW5kb3cpIHtcbiAgdmFyIGJyb3dzZXJEZXRhaWxzID0gdXRpbHMuZGV0ZWN0QnJvd3Nlcih3aW5kb3cpO1xuICB2YXIgbmF2aWdhdG9yID0gd2luZG93ICYmIHdpbmRvdy5uYXZpZ2F0b3I7XG4gIHZhciBNZWRpYVN0cmVhbVRyYWNrID0gd2luZG93ICYmIHdpbmRvdy5NZWRpYVN0cmVhbVRyYWNrO1xuXG4gIHZhciBzaGltRXJyb3JfID0gZnVuY3Rpb24oZSkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiB7XG4gICAgICAgIEludGVybmFsRXJyb3I6ICdOb3RSZWFkYWJsZUVycm9yJyxcbiAgICAgICAgTm90U3VwcG9ydGVkRXJyb3I6ICdUeXBlRXJyb3InLFxuICAgICAgICBQZXJtaXNzaW9uRGVuaWVkRXJyb3I6ICdOb3RBbGxvd2VkRXJyb3InLFxuICAgICAgICBTZWN1cml0eUVycm9yOiAnTm90QWxsb3dlZEVycm9yJ1xuICAgICAgfVtlLm5hbWVdIHx8IGUubmFtZSxcbiAgICAgIG1lc3NhZ2U6IHtcbiAgICAgICAgJ1RoZSBvcGVyYXRpb24gaXMgaW5zZWN1cmUuJzogJ1RoZSByZXF1ZXN0IGlzIG5vdCBhbGxvd2VkIGJ5IHRoZSAnICtcbiAgICAgICAgJ3VzZXIgYWdlbnQgb3IgdGhlIHBsYXRmb3JtIGluIHRoZSBjdXJyZW50IGNvbnRleHQuJ1xuICAgICAgfVtlLm1lc3NhZ2VdIHx8IGUubWVzc2FnZSxcbiAgICAgIGNvbnN0cmFpbnQ6IGUuY29uc3RyYWludCxcbiAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZSArICh0aGlzLm1lc3NhZ2UgJiYgJzogJykgKyB0aGlzLm1lc3NhZ2U7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICAvLyBnZXRVc2VyTWVkaWEgY29uc3RyYWludHMgc2hpbS5cbiAgdmFyIGdldFVzZXJNZWRpYV8gPSBmdW5jdGlvbihjb25zdHJhaW50cywgb25TdWNjZXNzLCBvbkVycm9yKSB7XG4gICAgdmFyIGNvbnN0cmFpbnRzVG9GRjM3XyA9IGZ1bmN0aW9uKGMpIHtcbiAgICAgIGlmICh0eXBlb2YgYyAhPT0gJ29iamVjdCcgfHwgYy5yZXF1aXJlKSB7XG4gICAgICAgIHJldHVybiBjO1xuICAgICAgfVxuICAgICAgdmFyIHJlcXVpcmUgPSBbXTtcbiAgICAgIE9iamVjdC5rZXlzKGMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIGlmIChrZXkgPT09ICdyZXF1aXJlJyB8fCBrZXkgPT09ICdhZHZhbmNlZCcgfHwga2V5ID09PSAnbWVkaWFTb3VyY2UnKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciByID0gY1trZXldID0gKHR5cGVvZiBjW2tleV0gPT09ICdvYmplY3QnKSA/XG4gICAgICAgICAgICBjW2tleV0gOiB7aWRlYWw6IGNba2V5XX07XG4gICAgICAgIGlmIChyLm1pbiAhPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICByLm1heCAhPT0gdW5kZWZpbmVkIHx8IHIuZXhhY3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJlcXVpcmUucHVzaChrZXkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyLmV4YWN0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHIuZXhhY3QgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByLiBtaW4gPSByLm1heCA9IHIuZXhhY3Q7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNba2V5XSA9IHIuZXhhY3Q7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRlbGV0ZSByLmV4YWN0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChyLmlkZWFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjLmFkdmFuY2VkID0gYy5hZHZhbmNlZCB8fCBbXTtcbiAgICAgICAgICB2YXIgb2MgPSB7fTtcbiAgICAgICAgICBpZiAodHlwZW9mIHIuaWRlYWwgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBvY1trZXldID0ge21pbjogci5pZGVhbCwgbWF4OiByLmlkZWFsfTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb2Nba2V5XSA9IHIuaWRlYWw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGMuYWR2YW5jZWQucHVzaChvYyk7XG4gICAgICAgICAgZGVsZXRlIHIuaWRlYWw7XG4gICAgICAgICAgaWYgKCFPYmplY3Qua2V5cyhyKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBjW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChyZXF1aXJlLmxlbmd0aCkge1xuICAgICAgICBjLnJlcXVpcmUgPSByZXF1aXJlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGM7XG4gICAgfTtcbiAgICBjb25zdHJhaW50cyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoY29uc3RyYWludHMpKTtcbiAgICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDM4KSB7XG4gICAgICBsb2dnaW5nKCdzcGVjOiAnICsgSlNPTi5zdHJpbmdpZnkoY29uc3RyYWludHMpKTtcbiAgICAgIGlmIChjb25zdHJhaW50cy5hdWRpbykge1xuICAgICAgICBjb25zdHJhaW50cy5hdWRpbyA9IGNvbnN0cmFpbnRzVG9GRjM3Xyhjb25zdHJhaW50cy5hdWRpbyk7XG4gICAgICB9XG4gICAgICBpZiAoY29uc3RyYWludHMudmlkZW8pIHtcbiAgICAgICAgY29uc3RyYWludHMudmlkZW8gPSBjb25zdHJhaW50c1RvRkYzN18oY29uc3RyYWludHMudmlkZW8pO1xuICAgICAgfVxuICAgICAgbG9nZ2luZygnZmYzNzogJyArIEpTT04uc3RyaW5naWZ5KGNvbnN0cmFpbnRzKSk7XG4gICAgfVxuICAgIHJldHVybiBuYXZpZ2F0b3IubW96R2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzLCBvblN1Y2Nlc3MsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIG9uRXJyb3Ioc2hpbUVycm9yXyhlKSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gUmV0dXJucyB0aGUgcmVzdWx0IG9mIGdldFVzZXJNZWRpYSBhcyBhIFByb21pc2UuXG4gIHZhciBnZXRVc2VyTWVkaWFQcm9taXNlXyA9IGZ1bmN0aW9uKGNvbnN0cmFpbnRzKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgZ2V0VXNlck1lZGlhXyhjb25zdHJhaW50cywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBTaGltIGZvciBtZWRpYURldmljZXMgb24gb2xkZXIgdmVyc2lvbnMuXG4gIGlmICghbmF2aWdhdG9yLm1lZGlhRGV2aWNlcykge1xuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMgPSB7Z2V0VXNlck1lZGlhOiBnZXRVc2VyTWVkaWFQcm9taXNlXyxcbiAgICAgIGFkZEV2ZW50TGlzdGVuZXI6IGZ1bmN0aW9uKCkgeyB9LFxuICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcjogZnVuY3Rpb24oKSB7IH1cbiAgICB9O1xuICB9XG4gIG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlcyA9XG4gICAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmVudW1lcmF0ZURldmljZXMgfHwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICAgICAgdmFyIGluZm9zID0gW1xuICAgICAgICAgICAge2tpbmQ6ICdhdWRpb2lucHV0JywgZGV2aWNlSWQ6ICdkZWZhdWx0JywgbGFiZWw6ICcnLCBncm91cElkOiAnJ30sXG4gICAgICAgICAgICB7a2luZDogJ3ZpZGVvaW5wdXQnLCBkZXZpY2VJZDogJ2RlZmF1bHQnLCBsYWJlbDogJycsIGdyb3VwSWQ6ICcnfVxuICAgICAgICAgIF07XG4gICAgICAgICAgcmVzb2x2ZShpbmZvcyk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDQxKSB7XG4gICAgLy8gV29yayBhcm91bmQgaHR0cDovL2J1Z3ppbC5sYS8xMTY5NjY1XG4gICAgdmFyIG9yZ0VudW1lcmF0ZURldmljZXMgPVxuICAgICAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmVudW1lcmF0ZURldmljZXMuYmluZChuYXZpZ2F0b3IubWVkaWFEZXZpY2VzKTtcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmVudW1lcmF0ZURldmljZXMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBvcmdFbnVtZXJhdGVEZXZpY2VzKCkudGhlbih1bmRlZmluZWQsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKGUubmFtZSA9PT0gJ05vdEZvdW5kRXJyb3InKSB7XG4gICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG4gIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgNDkpIHtcbiAgICB2YXIgb3JpZ0dldFVzZXJNZWRpYSA9IG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhLlxuICAgICAgICBiaW5kKG5hdmlnYXRvci5tZWRpYURldmljZXMpO1xuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhID0gZnVuY3Rpb24oYykge1xuICAgICAgcmV0dXJuIG9yaWdHZXRVc2VyTWVkaWEoYykudGhlbihmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgICAgLy8gV29yayBhcm91bmQgaHR0cHM6Ly9idWd6aWwubGEvODAyMzI2XG4gICAgICAgIGlmIChjLmF1ZGlvICYmICFzdHJlYW0uZ2V0QXVkaW9UcmFja3MoKS5sZW5ndGggfHxcbiAgICAgICAgICAgIGMudmlkZW8gJiYgIXN0cmVhbS5nZXRWaWRlb1RyYWNrcygpLmxlbmd0aCkge1xuICAgICAgICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XG4gICAgICAgICAgICB0cmFjay5zdG9wKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbignVGhlIG9iamVjdCBjYW4gbm90IGJlIGZvdW5kIGhlcmUuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdOb3RGb3VuZEVycm9yJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0cmVhbTtcbiAgICAgIH0sIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHNoaW1FcnJvcl8oZSkpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfVxuICBpZiAoIShicm93c2VyRGV0YWlscy52ZXJzaW9uID4gNTUgJiZcbiAgICAgICdhdXRvR2FpbkNvbnRyb2wnIGluIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0U3VwcG9ydGVkQ29uc3RyYWludHMoKSkpIHtcbiAgICB2YXIgcmVtYXAgPSBmdW5jdGlvbihvYmosIGEsIGIpIHtcbiAgICAgIGlmIChhIGluIG9iaiAmJiAhKGIgaW4gb2JqKSkge1xuICAgICAgICBvYmpbYl0gPSBvYmpbYV07XG4gICAgICAgIGRlbGV0ZSBvYmpbYV07XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBuYXRpdmVHZXRVc2VyTWVkaWEgPSBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYS5cbiAgICAgICAgYmluZChuYXZpZ2F0b3IubWVkaWFEZXZpY2VzKTtcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSA9IGZ1bmN0aW9uKGMpIHtcbiAgICAgIGlmICh0eXBlb2YgYyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIGMuYXVkaW8gPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGMpKTtcbiAgICAgICAgcmVtYXAoYy5hdWRpbywgJ2F1dG9HYWluQ29udHJvbCcsICdtb3pBdXRvR2FpbkNvbnRyb2wnKTtcbiAgICAgICAgcmVtYXAoYy5hdWRpbywgJ25vaXNlU3VwcHJlc3Npb24nLCAnbW96Tm9pc2VTdXBwcmVzc2lvbicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5hdGl2ZUdldFVzZXJNZWRpYShjKTtcbiAgICB9O1xuXG4gICAgaWYgKE1lZGlhU3RyZWFtVHJhY2sgJiYgTWVkaWFTdHJlYW1UcmFjay5wcm90b3R5cGUuZ2V0U2V0dGluZ3MpIHtcbiAgICAgIHZhciBuYXRpdmVHZXRTZXR0aW5ncyA9IE1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLmdldFNldHRpbmdzO1xuICAgICAgTWVkaWFTdHJlYW1UcmFjay5wcm90b3R5cGUuZ2V0U2V0dGluZ3MgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG9iaiA9IG5hdGl2ZUdldFNldHRpbmdzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIHJlbWFwKG9iaiwgJ21vekF1dG9HYWluQ29udHJvbCcsICdhdXRvR2FpbkNvbnRyb2wnKTtcbiAgICAgICAgcmVtYXAob2JqLCAnbW96Tm9pc2VTdXBwcmVzc2lvbicsICdub2lzZVN1cHByZXNzaW9uJyk7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmIChNZWRpYVN0cmVhbVRyYWNrICYmIE1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLmFwcGx5Q29uc3RyYWludHMpIHtcbiAgICAgIHZhciBuYXRpdmVBcHBseUNvbnN0cmFpbnRzID0gTWVkaWFTdHJlYW1UcmFjay5wcm90b3R5cGUuYXBwbHlDb25zdHJhaW50cztcbiAgICAgIE1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLmFwcGx5Q29uc3RyYWludHMgPSBmdW5jdGlvbihjKSB7XG4gICAgICAgIGlmICh0aGlzLmtpbmQgPT09ICdhdWRpbycgJiYgdHlwZW9mIGMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgYyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYykpO1xuICAgICAgICAgIHJlbWFwKGMsICdhdXRvR2FpbkNvbnRyb2wnLCAnbW96QXV0b0dhaW5Db250cm9sJyk7XG4gICAgICAgICAgcmVtYXAoYywgJ25vaXNlU3VwcHJlc3Npb24nLCAnbW96Tm9pc2VTdXBwcmVzc2lvbicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuYXRpdmVBcHBseUNvbnN0cmFpbnRzLmFwcGx5KHRoaXMsIFtjXSk7XG4gICAgICB9O1xuICAgIH1cbiAgfVxuICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhID0gZnVuY3Rpb24oY29uc3RyYWludHMsIG9uU3VjY2Vzcywgb25FcnJvcikge1xuICAgIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgNDQpIHtcbiAgICAgIHJldHVybiBnZXRVc2VyTWVkaWFfKGNvbnN0cmFpbnRzLCBvblN1Y2Nlc3MsIG9uRXJyb3IpO1xuICAgIH1cbiAgICAvLyBSZXBsYWNlIEZpcmVmb3ggNDQrJ3MgZGVwcmVjYXRpb24gd2FybmluZyB3aXRoIHVucHJlZml4ZWQgdmVyc2lvbi5cbiAgICB1dGlscy5kZXByZWNhdGVkKCduYXZpZ2F0b3IuZ2V0VXNlck1lZGlhJyxcbiAgICAgICAgJ25hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhJyk7XG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoY29uc3RyYWludHMpLnRoZW4ob25TdWNjZXNzLCBvbkVycm9yKTtcbiAgfTtcbn07XG5cbn0se1wiLi4vdXRpbHNcIjoxM31dLDEyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8qXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXG4gKiAgdHJlZS5cbiAqL1xuJ3VzZSBzdHJpY3QnO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNoaW1Mb2NhbFN0cmVhbXNBUEk6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAnb2JqZWN0JyB8fCAhd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghKCdnZXRMb2NhbFN0cmVhbXMnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldExvY2FsU3RyZWFtcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2xvY2FsU3RyZWFtcykge1xuICAgICAgICAgIHRoaXMuX2xvY2FsU3RyZWFtcyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9sb2NhbFN0cmVhbXM7XG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAoISgnZ2V0U3RyZWFtQnlJZCcgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkpIHtcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U3RyZWFtQnlJZCA9IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBudWxsO1xuICAgICAgICBpZiAodGhpcy5fbG9jYWxTdHJlYW1zKSB7XG4gICAgICAgICAgdGhpcy5fbG9jYWxTdHJlYW1zLmZvckVhY2goZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICAgICAgICBpZiAoc3RyZWFtLmlkID09PSBpZCkge1xuICAgICAgICAgICAgICByZXN1bHQgPSBzdHJlYW07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3JlbW90ZVN0cmVhbXMpIHtcbiAgICAgICAgICB0aGlzLl9yZW1vdGVTdHJlYW1zLmZvckVhY2goZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICAgICAgICBpZiAoc3RyZWFtLmlkID09PSBpZCkge1xuICAgICAgICAgICAgICByZXN1bHQgPSBzdHJlYW07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH07XG4gICAgfVxuICAgIGlmICghKCdhZGRTdHJlYW0nIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XG4gICAgICB2YXIgX2FkZFRyYWNrID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjaztcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICAgIGlmICghdGhpcy5fbG9jYWxTdHJlYW1zKSB7XG4gICAgICAgICAgdGhpcy5fbG9jYWxTdHJlYW1zID0gW107XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2xvY2FsU3RyZWFtcy5pbmRleE9mKHN0cmVhbSkgPT09IC0xKSB7XG4gICAgICAgICAgdGhpcy5fbG9jYWxTdHJlYW1zLnB1c2goc3RyZWFtKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xuICAgICAgICAgIF9hZGRUcmFjay5jYWxsKHBjLCB0cmFjaywgc3RyZWFtKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFRyYWNrID0gZnVuY3Rpb24odHJhY2ssIHN0cmVhbSkge1xuICAgICAgICBpZiAoc3RyZWFtKSB7XG4gICAgICAgICAgaWYgKCF0aGlzLl9sb2NhbFN0cmVhbXMpIHtcbiAgICAgICAgICAgIHRoaXMuX2xvY2FsU3RyZWFtcyA9IFtzdHJlYW1dO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fbG9jYWxTdHJlYW1zLmluZGV4T2Yoc3RyZWFtKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuX2xvY2FsU3RyZWFtcy5wdXNoKHN0cmVhbSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfYWRkVHJhY2suY2FsbCh0aGlzLCB0cmFjaywgc3RyZWFtKTtcbiAgICAgIH07XG4gICAgfVxuICAgIGlmICghKCdyZW1vdmVTdHJlYW0nIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgICBpZiAoIXRoaXMuX2xvY2FsU3RyZWFtcykge1xuICAgICAgICAgIHRoaXMuX2xvY2FsU3RyZWFtcyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuX2xvY2FsU3RyZWFtcy5pbmRleE9mKHN0cmVhbSk7XG4gICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbG9jYWxTdHJlYW1zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICAgIHZhciB0cmFja3MgPSBzdHJlYW0uZ2V0VHJhY2tzKCk7XG4gICAgICAgIHRoaXMuZ2V0U2VuZGVycygpLmZvckVhY2goZnVuY3Rpb24oc2VuZGVyKSB7XG4gICAgICAgICAgaWYgKHRyYWNrcy5pbmRleE9mKHNlbmRlci50cmFjaykgIT09IC0xKSB7XG4gICAgICAgICAgICBwYy5yZW1vdmVUcmFjayhzZW5kZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH1cbiAgfSxcbiAgc2hpbVJlbW90ZVN0cmVhbXNBUEk6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAnb2JqZWN0JyB8fCAhd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghKCdnZXRSZW1vdGVTdHJlYW1zJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRSZW1vdGVTdHJlYW1zID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZW1vdGVTdHJlYW1zID8gdGhpcy5fcmVtb3RlU3RyZWFtcyA6IFtdO1xuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKCEoJ29uYWRkc3RyZWFtJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUsICdvbmFkZHN0cmVhbScsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fb25hZGRzdHJlYW07XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24oZikge1xuICAgICAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICAgICAgaWYgKHRoaXMuX29uYWRkc3RyZWFtKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2FkZHN0cmVhbScsIHRoaXMuX29uYWRkc3RyZWFtKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhY2snLCB0aGlzLl9vbmFkZHN0cmVhbXBvbHkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2FkZHN0cmVhbScsIHRoaXMuX29uYWRkc3RyZWFtID0gZik7XG4gICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCd0cmFjaycsIHRoaXMuX29uYWRkc3RyZWFtcG9seSA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUuc3RyZWFtcy5mb3JFYWNoKGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgICAgICAgICBpZiAoIXBjLl9yZW1vdGVTdHJlYW1zKSB7XG4gICAgICAgICAgICAgICAgcGMuX3JlbW90ZVN0cmVhbXMgPSBbXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAocGMuX3JlbW90ZVN0cmVhbXMuaW5kZXhPZihzdHJlYW0pID49IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcGMuX3JlbW90ZVN0cmVhbXMucHVzaChzdHJlYW0pO1xuICAgICAgICAgICAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ2FkZHN0cmVhbScpO1xuICAgICAgICAgICAgICBldmVudC5zdHJlYW0gPSBzdHJlYW07XG4gICAgICAgICAgICAgIHBjLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgc2hpbUNhbGxiYWNrc0FQSTogZnVuY3Rpb24od2luZG93KSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICdvYmplY3QnIHx8ICF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHByb3RvdHlwZSA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGU7XG4gICAgdmFyIGNyZWF0ZU9mZmVyID0gcHJvdG90eXBlLmNyZWF0ZU9mZmVyO1xuICAgIHZhciBjcmVhdGVBbnN3ZXIgPSBwcm90b3R5cGUuY3JlYXRlQW5zd2VyO1xuICAgIHZhciBzZXRMb2NhbERlc2NyaXB0aW9uID0gcHJvdG90eXBlLnNldExvY2FsRGVzY3JpcHRpb247XG4gICAgdmFyIHNldFJlbW90ZURlc2NyaXB0aW9uID0gcHJvdG90eXBlLnNldFJlbW90ZURlc2NyaXB0aW9uO1xuICAgIHZhciBhZGRJY2VDYW5kaWRhdGUgPSBwcm90b3R5cGUuYWRkSWNlQ2FuZGlkYXRlO1xuXG4gICAgcHJvdG90eXBlLmNyZWF0ZU9mZmVyID0gZnVuY3Rpb24oc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spIHtcbiAgICAgIHZhciBvcHRpb25zID0gKGFyZ3VtZW50cy5sZW5ndGggPj0gMikgPyBhcmd1bWVudHNbMl0gOiBhcmd1bWVudHNbMF07XG4gICAgICB2YXIgcHJvbWlzZSA9IGNyZWF0ZU9mZmVyLmFwcGx5KHRoaXMsIFtvcHRpb25zXSk7XG4gICAgICBpZiAoIWZhaWx1cmVDYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgIH1cbiAgICAgIHByb21pc2UudGhlbihzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjayk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfTtcblxuICAgIHByb3RvdHlwZS5jcmVhdGVBbnN3ZXIgPSBmdW5jdGlvbihzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjaykge1xuICAgICAgdmFyIG9wdGlvbnMgPSAoYXJndW1lbnRzLmxlbmd0aCA+PSAyKSA/IGFyZ3VtZW50c1syXSA6IGFyZ3VtZW50c1swXTtcbiAgICAgIHZhciBwcm9taXNlID0gY3JlYXRlQW5zd2VyLmFwcGx5KHRoaXMsIFtvcHRpb25zXSk7XG4gICAgICBpZiAoIWZhaWx1cmVDYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgIH1cbiAgICAgIHByb21pc2UudGhlbihzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjayk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfTtcblxuICAgIHZhciB3aXRoQ2FsbGJhY2sgPSBmdW5jdGlvbihkZXNjcmlwdGlvbiwgc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spIHtcbiAgICAgIHZhciBwcm9taXNlID0gc2V0TG9jYWxEZXNjcmlwdGlvbi5hcHBseSh0aGlzLCBbZGVzY3JpcHRpb25dKTtcbiAgICAgIGlmICghZmFpbHVyZUNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgICAgfVxuICAgICAgcHJvbWlzZS50aGVuKHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9O1xuICAgIHByb3RvdHlwZS5zZXRMb2NhbERlc2NyaXB0aW9uID0gd2l0aENhbGxiYWNrO1xuXG4gICAgd2l0aENhbGxiYWNrID0gZnVuY3Rpb24oZGVzY3JpcHRpb24sIHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKSB7XG4gICAgICB2YXIgcHJvbWlzZSA9IHNldFJlbW90ZURlc2NyaXB0aW9uLmFwcGx5KHRoaXMsIFtkZXNjcmlwdGlvbl0pO1xuICAgICAgaWYgKCFmYWlsdXJlQ2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgICB9XG4gICAgICBwcm9taXNlLnRoZW4oc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH07XG4gICAgcHJvdG90eXBlLnNldFJlbW90ZURlc2NyaXB0aW9uID0gd2l0aENhbGxiYWNrO1xuXG4gICAgd2l0aENhbGxiYWNrID0gZnVuY3Rpb24oY2FuZGlkYXRlLCBzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjaykge1xuICAgICAgdmFyIHByb21pc2UgPSBhZGRJY2VDYW5kaWRhdGUuYXBwbHkodGhpcywgW2NhbmRpZGF0ZV0pO1xuICAgICAgaWYgKCFmYWlsdXJlQ2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgICB9XG4gICAgICBwcm9taXNlLnRoZW4oc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH07XG4gICAgcHJvdG90eXBlLmFkZEljZUNhbmRpZGF0ZSA9IHdpdGhDYWxsYmFjaztcbiAgfSxcbiAgc2hpbUdldFVzZXJNZWRpYTogZnVuY3Rpb24od2luZG93KSB7XG4gICAgdmFyIG5hdmlnYXRvciA9IHdpbmRvdyAmJiB3aW5kb3cubmF2aWdhdG9yO1xuXG4gICAgaWYgKCFuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhKSB7XG4gICAgICBpZiAobmF2aWdhdG9yLndlYmtpdEdldFVzZXJNZWRpYSkge1xuICAgICAgICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhID0gbmF2aWdhdG9yLndlYmtpdEdldFVzZXJNZWRpYS5iaW5kKG5hdmlnYXRvcik7XG4gICAgICB9IGVsc2UgaWYgKG5hdmlnYXRvci5tZWRpYURldmljZXMgJiZcbiAgICAgICAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSkge1xuICAgICAgICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhID0gZnVuY3Rpb24oY29uc3RyYWludHMsIGNiLCBlcnJjYikge1xuICAgICAgICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzKVxuICAgICAgICAgIC50aGVuKGNiLCBlcnJjYik7XG4gICAgICAgIH0uYmluZChuYXZpZ2F0b3IpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgc2hpbVJUQ0ljZVNlcnZlclVybHM6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIC8vIG1pZ3JhdGUgZnJvbSBub24tc3BlYyBSVENJY2VTZXJ2ZXIudXJsIHRvIFJUQ0ljZVNlcnZlci51cmxzXG4gICAgdmFyIE9yaWdQZWVyQ29ubmVjdGlvbiA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbjtcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gPSBmdW5jdGlvbihwY0NvbmZpZywgcGNDb25zdHJhaW50cykge1xuICAgICAgaWYgKHBjQ29uZmlnICYmIHBjQ29uZmlnLmljZVNlcnZlcnMpIHtcbiAgICAgICAgdmFyIG5ld0ljZVNlcnZlcnMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwY0NvbmZpZy5pY2VTZXJ2ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIHNlcnZlciA9IHBjQ29uZmlnLmljZVNlcnZlcnNbaV07XG4gICAgICAgICAgaWYgKCFzZXJ2ZXIuaGFzT3duUHJvcGVydHkoJ3VybHMnKSAmJlxuICAgICAgICAgICAgICBzZXJ2ZXIuaGFzT3duUHJvcGVydHkoJ3VybCcpKSB7XG4gICAgICAgICAgICB1dGlscy5kZXByZWNhdGVkKCdSVENJY2VTZXJ2ZXIudXJsJywgJ1JUQ0ljZVNlcnZlci51cmxzJyk7XG4gICAgICAgICAgICBzZXJ2ZXIgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHNlcnZlcikpO1xuICAgICAgICAgICAgc2VydmVyLnVybHMgPSBzZXJ2ZXIudXJsO1xuICAgICAgICAgICAgZGVsZXRlIHNlcnZlci51cmw7XG4gICAgICAgICAgICBuZXdJY2VTZXJ2ZXJzLnB1c2goc2VydmVyKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3SWNlU2VydmVycy5wdXNoKHBjQ29uZmlnLmljZVNlcnZlcnNbaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwY0NvbmZpZy5pY2VTZXJ2ZXJzID0gbmV3SWNlU2VydmVycztcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgT3JpZ1BlZXJDb25uZWN0aW9uKHBjQ29uZmlnLCBwY0NvbnN0cmFpbnRzKTtcbiAgICB9O1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUgPSBPcmlnUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlO1xuICAgIC8vIHdyYXAgc3RhdGljIG1ldGhvZHMuIEN1cnJlbnRseSBqdXN0IGdlbmVyYXRlQ2VydGlmaWNhdGUuXG4gICAgaWYgKCdnZW5lcmF0ZUNlcnRpZmljYXRlJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24pIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24sICdnZW5lcmF0ZUNlcnRpZmljYXRlJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBPcmlnUGVlckNvbm5lY3Rpb24uZ2VuZXJhdGVDZXJ0aWZpY2F0ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9LFxuICBzaGltVHJhY2tFdmVudFRyYW5zY2VpdmVyOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICAvLyBBZGQgZXZlbnQudHJhbnNjZWl2ZXIgbWVtYmVyIG92ZXIgZGVwcmVjYXRlZCBldmVudC5yZWNlaXZlclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gJiZcbiAgICAgICAgKCdyZWNlaXZlcicgaW4gd2luZG93LlJUQ1RyYWNrRXZlbnQucHJvdG90eXBlKSAmJlxuICAgICAgICAvLyBjYW4ndCBjaGVjayAndHJhbnNjZWl2ZXInIGluIHdpbmRvdy5SVENUcmFja0V2ZW50LnByb3RvdHlwZSwgYXMgaXQgaXNcbiAgICAgICAgLy8gZGVmaW5lZCBmb3Igc29tZSByZWFzb24gZXZlbiB3aGVuIHdpbmRvdy5SVENUcmFuc2NlaXZlciBpcyBub3QuXG4gICAgICAgICF3aW5kb3cuUlRDVHJhbnNjZWl2ZXIpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDVHJhY2tFdmVudC5wcm90b3R5cGUsICd0cmFuc2NlaXZlcicsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4ge3JlY2VpdmVyOiB0aGlzLnJlY2VpdmVyfTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIHNoaW1DcmVhdGVPZmZlckxlZ2FjeTogZnVuY3Rpb24od2luZG93KSB7XG4gICAgdmFyIG9yaWdDcmVhdGVPZmZlciA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlT2ZmZXI7XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5jcmVhdGVPZmZlciA9IGZ1bmN0aW9uKG9mZmVyT3B0aW9ucykge1xuICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgIGlmIChvZmZlck9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAvLyBzdXBwb3J0IGJpdCB2YWx1ZXNcbiAgICAgICAgICBvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbyA9ICEhb2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW87XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGF1ZGlvVHJhbnNjZWl2ZXIgPSBwYy5nZXRUcmFuc2NlaXZlcnMoKS5maW5kKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XG4gICAgICAgICAgcmV0dXJuIHRyYW5zY2VpdmVyLnNlbmRlci50cmFjayAmJlxuICAgICAgICAgICAgICB0cmFuc2NlaXZlci5zZW5kZXIudHJhY2sua2luZCA9PT0gJ2F1ZGlvJztcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbyA9PT0gZmFsc2UgJiYgYXVkaW9UcmFuc2NlaXZlcikge1xuICAgICAgICAgIGlmIChhdWRpb1RyYW5zY2VpdmVyLmRpcmVjdGlvbiA9PT0gJ3NlbmRyZWN2Jykge1xuICAgICAgICAgICAgaWYgKGF1ZGlvVHJhbnNjZWl2ZXIuc2V0RGlyZWN0aW9uKSB7XG4gICAgICAgICAgICAgIGF1ZGlvVHJhbnNjZWl2ZXIuc2V0RGlyZWN0aW9uKCdzZW5kb25seScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgYXVkaW9UcmFuc2NlaXZlci5kaXJlY3Rpb24gPSAnc2VuZG9ubHknO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoYXVkaW9UcmFuc2NlaXZlci5kaXJlY3Rpb24gPT09ICdyZWN2b25seScpIHtcbiAgICAgICAgICAgIGlmIChhdWRpb1RyYW5zY2VpdmVyLnNldERpcmVjdGlvbikge1xuICAgICAgICAgICAgICBhdWRpb1RyYW5zY2VpdmVyLnNldERpcmVjdGlvbignaW5hY3RpdmUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGF1ZGlvVHJhbnNjZWl2ZXIuZGlyZWN0aW9uID0gJ2luYWN0aXZlJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW8gPT09IHRydWUgJiZcbiAgICAgICAgICAgICFhdWRpb1RyYW5zY2VpdmVyKSB7XG4gICAgICAgICAgcGMuYWRkVHJhbnNjZWl2ZXIoJ2F1ZGlvJyk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmICh0eXBlb2Ygb2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW8gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgLy8gc3VwcG9ydCBiaXQgdmFsdWVzXG4gICAgICAgICAgb2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlVmlkZW8gPSAhIW9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvO1xuICAgICAgICB9XG4gICAgICAgIHZhciB2aWRlb1RyYW5zY2VpdmVyID0gcGMuZ2V0VHJhbnNjZWl2ZXJzKCkuZmluZChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xuICAgICAgICAgIHJldHVybiB0cmFuc2NlaXZlci5zZW5kZXIudHJhY2sgJiZcbiAgICAgICAgICAgICAgdHJhbnNjZWl2ZXIuc2VuZGVyLnRyYWNrLmtpbmQgPT09ICd2aWRlbyc7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlVmlkZW8gPT09IGZhbHNlICYmIHZpZGVvVHJhbnNjZWl2ZXIpIHtcbiAgICAgICAgICBpZiAodmlkZW9UcmFuc2NlaXZlci5kaXJlY3Rpb24gPT09ICdzZW5kcmVjdicpIHtcbiAgICAgICAgICAgIHZpZGVvVHJhbnNjZWl2ZXIuc2V0RGlyZWN0aW9uKCdzZW5kb25seScpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodmlkZW9UcmFuc2NlaXZlci5kaXJlY3Rpb24gPT09ICdyZWN2b25seScpIHtcbiAgICAgICAgICAgIHZpZGVvVHJhbnNjZWl2ZXIuc2V0RGlyZWN0aW9uKCdpbmFjdGl2ZScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVWaWRlbyA9PT0gdHJ1ZSAmJlxuICAgICAgICAgICAgIXZpZGVvVHJhbnNjZWl2ZXIpIHtcbiAgICAgICAgICBwYy5hZGRUcmFuc2NlaXZlcigndmlkZW8nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG9yaWdDcmVhdGVPZmZlci5hcHBseShwYywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG59O1xuXG59LHtcIi4uL3V0aWxzXCI6MTN9XSwxMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vKlxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxuICogIHRyZWUuXG4gKi9cbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIGxvZ0Rpc2FibGVkXyA9IHRydWU7XG52YXIgZGVwcmVjYXRpb25XYXJuaW5nc18gPSB0cnVlO1xuXG4vKipcbiAqIEV4dHJhY3QgYnJvd3NlciB2ZXJzaW9uIG91dCBvZiB0aGUgcHJvdmlkZWQgdXNlciBhZ2VudCBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHshc3RyaW5nfSB1YXN0cmluZyB1c2VyQWdlbnQgc3RyaW5nLlxuICogQHBhcmFtIHshc3RyaW5nfSBleHByIFJlZ3VsYXIgZXhwcmVzc2lvbiB1c2VkIGFzIG1hdGNoIGNyaXRlcmlhLlxuICogQHBhcmFtIHshbnVtYmVyfSBwb3MgcG9zaXRpb24gaW4gdGhlIHZlcnNpb24gc3RyaW5nIHRvIGJlIHJldHVybmVkLlxuICogQHJldHVybiB7IW51bWJlcn0gYnJvd3NlciB2ZXJzaW9uLlxuICovXG5mdW5jdGlvbiBleHRyYWN0VmVyc2lvbih1YXN0cmluZywgZXhwciwgcG9zKSB7XG4gIHZhciBtYXRjaCA9IHVhc3RyaW5nLm1hdGNoKGV4cHIpO1xuICByZXR1cm4gbWF0Y2ggJiYgbWF0Y2gubGVuZ3RoID49IHBvcyAmJiBwYXJzZUludChtYXRjaFtwb3NdLCAxMCk7XG59XG5cbi8vIFdyYXBzIHRoZSBwZWVyY29ubmVjdGlvbiBldmVudCBldmVudE5hbWVUb1dyYXAgaW4gYSBmdW5jdGlvblxuLy8gd2hpY2ggcmV0dXJucyB0aGUgbW9kaWZpZWQgZXZlbnQgb2JqZWN0LlxuZnVuY3Rpb24gd3JhcFBlZXJDb25uZWN0aW9uRXZlbnQod2luZG93LCBldmVudE5hbWVUb1dyYXAsIHdyYXBwZXIpIHtcbiAgaWYgKCF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIHByb3RvID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZTtcbiAgdmFyIG5hdGl2ZUFkZEV2ZW50TGlzdGVuZXIgPSBwcm90by5hZGRFdmVudExpc3RlbmVyO1xuICBwcm90by5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24obmF0aXZlRXZlbnROYW1lLCBjYikge1xuICAgIGlmIChuYXRpdmVFdmVudE5hbWUgIT09IGV2ZW50TmFtZVRvV3JhcCkge1xuICAgICAgcmV0dXJuIG5hdGl2ZUFkZEV2ZW50TGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gICAgdmFyIHdyYXBwZWRDYWxsYmFjayA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgIGNiKHdyYXBwZXIoZSkpO1xuICAgIH07XG4gICAgdGhpcy5fZXZlbnRNYXAgPSB0aGlzLl9ldmVudE1hcCB8fCB7fTtcbiAgICB0aGlzLl9ldmVudE1hcFtjYl0gPSB3cmFwcGVkQ2FsbGJhY2s7XG4gICAgcmV0dXJuIG5hdGl2ZUFkZEV2ZW50TGlzdGVuZXIuYXBwbHkodGhpcywgW25hdGl2ZUV2ZW50TmFtZSxcbiAgICAgIHdyYXBwZWRDYWxsYmFja10pO1xuICB9O1xuXG4gIHZhciBuYXRpdmVSZW1vdmVFdmVudExpc3RlbmVyID0gcHJvdG8ucmVtb3ZlRXZlbnRMaXN0ZW5lcjtcbiAgcHJvdG8ucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKG5hdGl2ZUV2ZW50TmFtZSwgY2IpIHtcbiAgICBpZiAobmF0aXZlRXZlbnROYW1lICE9PSBldmVudE5hbWVUb1dyYXAgfHwgIXRoaXMuX2V2ZW50TWFwXG4gICAgICAgIHx8ICF0aGlzLl9ldmVudE1hcFtjYl0pIHtcbiAgICAgIHJldHVybiBuYXRpdmVSZW1vdmVFdmVudExpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICAgIHZhciB1bndyYXBwZWRDYiA9IHRoaXMuX2V2ZW50TWFwW2NiXTtcbiAgICBkZWxldGUgdGhpcy5fZXZlbnRNYXBbY2JdO1xuICAgIHJldHVybiBuYXRpdmVSZW1vdmVFdmVudExpc3RlbmVyLmFwcGx5KHRoaXMsIFtuYXRpdmVFdmVudE5hbWUsXG4gICAgICB1bndyYXBwZWRDYl0pO1xuICB9O1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgJ29uJyArIGV2ZW50TmFtZVRvV3JhcCwge1xuICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpc1snX29uJyArIGV2ZW50TmFtZVRvV3JhcF07XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKGNiKSB7XG4gICAgICBpZiAodGhpc1snX29uJyArIGV2ZW50TmFtZVRvV3JhcF0pIHtcbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZVRvV3JhcCxcbiAgICAgICAgICAgIHRoaXNbJ19vbicgKyBldmVudE5hbWVUb1dyYXBdKTtcbiAgICAgICAgZGVsZXRlIHRoaXNbJ19vbicgKyBldmVudE5hbWVUb1dyYXBdO1xuICAgICAgfVxuICAgICAgaWYgKGNiKSB7XG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWVUb1dyYXAsXG4gICAgICAgICAgICB0aGlzWydfb24nICsgZXZlbnROYW1lVG9XcmFwXSA9IGNiKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuXG4vLyBVdGlsaXR5IG1ldGhvZHMuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZXh0cmFjdFZlcnNpb246IGV4dHJhY3RWZXJzaW9uLFxuICB3cmFwUGVlckNvbm5lY3Rpb25FdmVudDogd3JhcFBlZXJDb25uZWN0aW9uRXZlbnQsXG4gIGRpc2FibGVMb2c6IGZ1bmN0aW9uKGJvb2wpIHtcbiAgICBpZiAodHlwZW9mIGJvb2wgIT09ICdib29sZWFuJykge1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcignQXJndW1lbnQgdHlwZTogJyArIHR5cGVvZiBib29sICtcbiAgICAgICAgICAnLiBQbGVhc2UgdXNlIGEgYm9vbGVhbi4nKTtcbiAgICB9XG4gICAgbG9nRGlzYWJsZWRfID0gYm9vbDtcbiAgICByZXR1cm4gKGJvb2wpID8gJ2FkYXB0ZXIuanMgbG9nZ2luZyBkaXNhYmxlZCcgOlxuICAgICAgICAnYWRhcHRlci5qcyBsb2dnaW5nIGVuYWJsZWQnO1xuICB9LFxuXG4gIC8qKlxuICAgKiBEaXNhYmxlIG9yIGVuYWJsZSBkZXByZWNhdGlvbiB3YXJuaW5nc1xuICAgKiBAcGFyYW0geyFib29sZWFufSBib29sIHNldCB0byB0cnVlIHRvIGRpc2FibGUgd2FybmluZ3MuXG4gICAqL1xuICBkaXNhYmxlV2FybmluZ3M6IGZ1bmN0aW9uKGJvb2wpIHtcbiAgICBpZiAodHlwZW9mIGJvb2wgIT09ICdib29sZWFuJykge1xuICAgICAgcmV0dXJuIG5ldyBFcnJvcignQXJndW1lbnQgdHlwZTogJyArIHR5cGVvZiBib29sICtcbiAgICAgICAgICAnLiBQbGVhc2UgdXNlIGEgYm9vbGVhbi4nKTtcbiAgICB9XG4gICAgZGVwcmVjYXRpb25XYXJuaW5nc18gPSAhYm9vbDtcbiAgICByZXR1cm4gJ2FkYXB0ZXIuanMgZGVwcmVjYXRpb24gd2FybmluZ3MgJyArIChib29sID8gJ2Rpc2FibGVkJyA6ICdlbmFibGVkJyk7XG4gIH0sXG5cbiAgbG9nOiBmdW5jdGlvbigpIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChsb2dEaXNhYmxlZF8pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgY29uc29sZS5sb2cgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIFNob3dzIGEgZGVwcmVjYXRpb24gd2FybmluZyBzdWdnZXN0aW5nIHRoZSBtb2Rlcm4gYW5kIHNwZWMtY29tcGF0aWJsZSBBUEkuXG4gICAqL1xuICBkZXByZWNhdGVkOiBmdW5jdGlvbihvbGRNZXRob2QsIG5ld01ldGhvZCkge1xuICAgIGlmICghZGVwcmVjYXRpb25XYXJuaW5nc18pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc29sZS53YXJuKG9sZE1ldGhvZCArICcgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSAnICsgbmV3TWV0aG9kICtcbiAgICAgICAgJyBpbnN0ZWFkLicpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBCcm93c2VyIGRldGVjdG9yLlxuICAgKlxuICAgKiBAcmV0dXJuIHtvYmplY3R9IHJlc3VsdCBjb250YWluaW5nIGJyb3dzZXIgYW5kIHZlcnNpb25cbiAgICogICAgIHByb3BlcnRpZXMuXG4gICAqL1xuICBkZXRlY3RCcm93c2VyOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICB2YXIgbmF2aWdhdG9yID0gd2luZG93ICYmIHdpbmRvdy5uYXZpZ2F0b3I7XG5cbiAgICAvLyBSZXR1cm5lZCByZXN1bHQgb2JqZWN0LlxuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICByZXN1bHQuYnJvd3NlciA9IG51bGw7XG4gICAgcmVzdWx0LnZlcnNpb24gPSBudWxsO1xuXG4gICAgLy8gRmFpbCBlYXJseSBpZiBpdCdzIG5vdCBhIGJyb3dzZXJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgfHwgIXdpbmRvdy5uYXZpZ2F0b3IpIHtcbiAgICAgIHJlc3VsdC5icm93c2VyID0gJ05vdCBhIGJyb3dzZXIuJztcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgaWYgKG5hdmlnYXRvci5tb3pHZXRVc2VyTWVkaWEpIHsgLy8gRmlyZWZveC5cbiAgICAgIHJlc3VsdC5icm93c2VyID0gJ2ZpcmVmb3gnO1xuICAgICAgcmVzdWx0LnZlcnNpb24gPSBleHRyYWN0VmVyc2lvbihuYXZpZ2F0b3IudXNlckFnZW50LFxuICAgICAgICAgIC9GaXJlZm94XFwvKFxcZCspXFwuLywgMSk7XG4gICAgfSBlbHNlIGlmIChuYXZpZ2F0b3Iud2Via2l0R2V0VXNlck1lZGlhKSB7XG4gICAgICAvLyBDaHJvbWUsIENocm9taXVtLCBXZWJ2aWV3LCBPcGVyYS5cbiAgICAgIC8vIFZlcnNpb24gbWF0Y2hlcyBDaHJvbWUvV2ViUlRDIHZlcnNpb24uXG4gICAgICByZXN1bHQuYnJvd3NlciA9ICdjaHJvbWUnO1xuICAgICAgcmVzdWx0LnZlcnNpb24gPSBleHRyYWN0VmVyc2lvbihuYXZpZ2F0b3IudXNlckFnZW50LFxuICAgICAgICAgIC9DaHJvbShlfGl1bSlcXC8oXFxkKylcXC4vLCAyKTtcbiAgICB9IGVsc2UgaWYgKG5hdmlnYXRvci5tZWRpYURldmljZXMgJiZcbiAgICAgICAgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvRWRnZVxcLyhcXGQrKS4oXFxkKykkLykpIHsgLy8gRWRnZS5cbiAgICAgIHJlc3VsdC5icm93c2VyID0gJ2VkZ2UnO1xuICAgICAgcmVzdWx0LnZlcnNpb24gPSBleHRyYWN0VmVyc2lvbihuYXZpZ2F0b3IudXNlckFnZW50LFxuICAgICAgICAgIC9FZGdlXFwvKFxcZCspLihcXGQrKSQvLCAyKTtcbiAgICB9IGVsc2UgaWYgKHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiAmJlxuICAgICAgICBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9BcHBsZVdlYktpdFxcLyhcXGQrKVxcLi8pKSB7IC8vIFNhZmFyaS5cbiAgICAgIHJlc3VsdC5icm93c2VyID0gJ3NhZmFyaSc7XG4gICAgICByZXN1bHQudmVyc2lvbiA9IGV4dHJhY3RWZXJzaW9uKG5hdmlnYXRvci51c2VyQWdlbnQsXG4gICAgICAgICAgL0FwcGxlV2ViS2l0XFwvKFxcZCspXFwuLywgMSk7XG4gICAgfSBlbHNlIHsgLy8gRGVmYXVsdCBmYWxsdGhyb3VnaDogbm90IHN1cHBvcnRlZC5cbiAgICAgIHJlc3VsdC5icm93c2VyID0gJ05vdCBhIHN1cHBvcnRlZCBicm93c2VyLic7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5cbn0se31dfSx7fSxbM10pKDMpXG59KTsiXSwic291cmNlUm9vdCI6IiJ9