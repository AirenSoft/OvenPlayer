/*! OvenPlayerv0.9.1 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

var _Manager = __webpack_require__(/*! api/media/Manager */ "./src/js/api/media/Manager.js");

var _Manager2 = _interopRequireDefault(_Manager);

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

/**
 * Created by hoho on 2018. 6. 11..
 */
var WebRTC = function WebRTC(container, playerConfig) {
    var that = {};
    var webrtcLoader = null;
    var superDestroy_func = null;

    var mediaManager = (0, _Manager2["default"])(container, _constants.PROVIDER_WEBRTC);
    var element = mediaManager.create();

    var spec = {
        name: _constants.PROVIDER_WEBRTC,
        extendedElement: element,
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
        sources: []
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
        mediaManager.destroy();
        mediaManager = null;
        element = null;
        OvenPlayerConsole.log("WEBRTC :  PROVIDER DESTROYED.");

        superDestroy_func();
    };
    return that;
};

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
                var tempError = _constants.ERRORS[_constants.PLAYER_WEBRTC_WS_ERROR];
                closePeer(tempError);
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

                ws.close();
                // console.log('웹소켓 닫힘');
            }
            ws = null;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9XZWJSVEMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvV2ViUlRDTG9hZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9hZGFwdGVyLmpzIl0sIm5hbWVzIjpbIldlYlJUQyIsImNvbnRhaW5lciIsInBsYXllckNvbmZpZyIsInRoYXQiLCJ3ZWJydGNMb2FkZXIiLCJzdXBlckRlc3Ryb3lfZnVuYyIsIm1lZGlhTWFuYWdlciIsIlBST1ZJREVSX1dFQlJUQyIsImVsZW1lbnQiLCJjcmVhdGUiLCJzcGVjIiwibmFtZSIsImV4dGVuZGVkRWxlbWVudCIsImxpc3RlbmVyIiwiY2FuU2VlayIsImlzTGl2ZSIsInNlZWtpbmciLCJzdGF0ZSIsIlNUQVRFX0lETEUiLCJidWZmZXIiLCJmcmFtZXJhdGUiLCJjdXJyZW50UXVhbGl0eSIsImN1cnJlbnRTb3VyY2UiLCJxdWFsaXR5TGV2ZWxzIiwic291cmNlcyIsInNvdXJjZSIsImZpbGUiLCJ0eXBlIiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJkZXN0cm95IiwibG9hZENhbGxiYWNrIiwic3RyZWFtIiwic3JjT2JqZWN0IiwicGxheSIsInJlc2V0Q2FsbGJhY2siLCJwYXVzZSIsImVycm9yVHJpZ2dlciIsImNvbm5lY3QiLCJlcnJvciIsIldlYlJUQ0xvYWRlciIsInByb3ZpZGVyIiwid2ViU29ja2V0VXJsIiwicGVlckNvbm5lY3Rpb25Db25maWciLCJ3cyIsIm1haW5TdHJlYW0iLCJtYWluUGVlckNvbm5lY3Rpb25JbmZvIiwiY2xpZW50UGVlckNvbm5lY3Rpb25zIiwic3RhdGlzdGljc1RpbWVyIiwiZXhpc3RpbmdIYW5kbGVyIiwid2luZG93Iiwib25iZWZvcmV1bmxvYWQiLCJldmVudCIsImNsb3NlUGVlciIsImdldFBlZXJDb25uZWN0aW9uQnlJZCIsImlkIiwicGVlckNvbm5lY3Rpb24iLCJleHRyYWN0TG9zc1BhY2tldHNPbk5ldHdvcmtTdGF0dXMiLCJwZWVyQ29ubmVjdGlvbkluZm8iLCJzdGF0dXMiLCJsb3N0UGFja2V0c0FyciIsInNsb3RMZW5ndGgiLCJwcmV2UGFja2V0c0xvc3QiLCJhdmc4TG9zc2VzIiwiYXZnTW9yZVRoYW5UaHJlc2hvbGRDb3VudCIsInRocmVzaG9sZCIsInNldFRpbWVvdXQiLCJnZXRTdGF0cyIsInRoZW4iLCJzdGF0cyIsImZvckVhY2giLCJpc1JlbW90ZSIsInB1c2giLCJwYXJzZUludCIsInBhY2tldHNMb3N0IiwibGVuZ3RoIiwic2xpY2UiLCJfIiwicmVkdWNlIiwibWVtbyIsIm51bSIsIk5FVFdPUktfVU5TVEFCTEVEIiwiY3JlYXRlTWFpblBlZXJDb25uZWN0aW9uIiwicGVlcklkIiwic2RwIiwiY2FuZGlkYXRlcyIsInJlc29sdmUiLCJSVENQZWVyQ29ubmVjdGlvbiIsInNldFJlbW90ZURlc2NyaXB0aW9uIiwiUlRDU2Vzc2lvbkRlc2NyaXB0aW9uIiwiY3JlYXRlQW5zd2VyIiwiZGVzYyIsInNldExvY2FsRGVzY3JpcHRpb24iLCJsb2NhbFNEUCIsImxvY2FsRGVzY3JpcHRpb24iLCJzZW5kTWVzc2FnZSIsInBlZXJfaWQiLCJjb21tYW5kIiwidGVtcEVycm9yIiwiRVJST1JTIiwiUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUiIsIlBMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUiIsIlBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SIiwiYWRkSWNlQ2FuZGlkYXRlIiwib25pY2VjYW5kaWRhdGUiLCJlIiwiY2FuZGlkYXRlIiwib250cmFjayIsInN0cmVhbXMiLCJjcmVhdGVDbGllbnRQZWVyQ29ubmVjdGlvbiIsImhvc3RJZCIsImNsaWVudElkIiwiYWRkU3RyZWFtIiwiY3JlYXRlT2ZmZXIiLCJzZXRMb2NhbEFuZFNlbmRNZXNzYWdlIiwiaGFuZGxlQ3JlYXRlT2ZmZXJFcnJvciIsInNlc3Npb25EZXNjcmlwdGlvbiIsImkiLCJSVENJY2VDYW5kaWRhdGUiLCJQTEFZRVJfV0VCUlRDX0FERF9JQ0VDQU5ESURBVEVfRVJST1IiLCJpbml0V2ViU29ja2V0IiwicmVqZWN0IiwiV2ViU29ja2V0Iiwib25vcGVuIiwib25tZXNzYWdlIiwibWVzc2FnZSIsIkpTT04iLCJwYXJzZSIsImRhdGEiLCJQTEFZRVJfV0VCUlRDX1dTX0VSUk9SIiwidHJpZ2dlciIsIk9NRV9QMlBfTU9ERSIsInBlZXJDb25uZWN0aW9uMSIsInBlZXJDb25uZWN0aW9uMiIsInBlZXJDb25uZWN0aW9uMyIsImNsb3NlIiwib25jbG9zZSIsIm9uZXJyb3IiLCJjb25zb2xlIiwiaW5pdGlhbGl6ZSIsIlByb21pc2UiLCJyZWFkeVN0YXRlIiwiY2xlYXJUaW1lb3V0IiwiT2JqZWN0Iiwia2V5cyIsImNsaWVudFBlZXJDb25uZWN0aW9uIiwic2VuZCIsInN0cmluZ2lmeSIsImYiLCJleHBvcnRzIiwibW9kdWxlIiwiZGVmaW5lIiwidCIsIm4iLCJyIiwicyIsIm8iLCJ1IiwiYSIsInJlcXVpcmUiLCJFcnJvciIsImNvZGUiLCJsIiwiY2FsbCIsIlNEUFV0aWxzIiwid3JpdGVNZWRpYVNlY3Rpb24iLCJ0cmFuc2NlaXZlciIsImNhcHMiLCJkdGxzUm9sZSIsIndyaXRlUnRwRGVzY3JpcHRpb24iLCJraW5kIiwid3JpdGVJY2VQYXJhbWV0ZXJzIiwiaWNlR2F0aGVyZXIiLCJnZXRMb2NhbFBhcmFtZXRlcnMiLCJ3cml0ZUR0bHNQYXJhbWV0ZXJzIiwiZHRsc1RyYW5zcG9ydCIsIm1pZCIsInJ0cFNlbmRlciIsInJ0cFJlY2VpdmVyIiwidHJhY2tJZCIsIl9pbml0aWFsVHJhY2tJZCIsInRyYWNrIiwibXNpZCIsInNlbmRFbmNvZGluZ1BhcmFtZXRlcnMiLCJzc3JjIiwicnR4IiwibG9jYWxDTmFtZSIsImZpbHRlckljZVNlcnZlcnMiLCJpY2VTZXJ2ZXJzIiwiZWRnZVZlcnNpb24iLCJoYXNUdXJuIiwiZmlsdGVyIiwic2VydmVyIiwidXJscyIsInVybCIsIndhcm4iLCJpc1N0cmluZyIsInZhbGlkVHVybiIsImluZGV4T2YiLCJnZXRDb21tb25DYXBhYmlsaXRpZXMiLCJsb2NhbENhcGFiaWxpdGllcyIsInJlbW90ZUNhcGFiaWxpdGllcyIsImNvbW1vbkNhcGFiaWxpdGllcyIsImNvZGVjcyIsImhlYWRlckV4dGVuc2lvbnMiLCJmZWNNZWNoYW5pc21zIiwiZmluZENvZGVjQnlQYXlsb2FkVHlwZSIsInB0IiwicGF5bG9hZFR5cGUiLCJwcmVmZXJyZWRQYXlsb2FkVHlwZSIsInJ0eENhcGFiaWxpdHlNYXRjaGVzIiwibFJ0eCIsInJSdHgiLCJsQ29kZWNzIiwickNvZGVjcyIsImxDb2RlYyIsInBhcmFtZXRlcnMiLCJhcHQiLCJyQ29kZWMiLCJ0b0xvd2VyQ2FzZSIsImNsb2NrUmF0ZSIsIm51bUNoYW5uZWxzIiwiTWF0aCIsIm1pbiIsInJ0Y3BGZWVkYmFjayIsImZiIiwiaiIsInBhcmFtZXRlciIsImxIZWFkZXJFeHRlbnNpb24iLCJySGVhZGVyRXh0ZW5zaW9uIiwidXJpIiwiaXNBY3Rpb25BbGxvd2VkSW5TaWduYWxpbmdTdGF0ZSIsImFjdGlvbiIsInNpZ25hbGluZ1N0YXRlIiwib2ZmZXIiLCJhbnN3ZXIiLCJtYXliZUFkZENhbmRpZGF0ZSIsImljZVRyYW5zcG9ydCIsImFscmVhZHlBZGRlZCIsImdldFJlbW90ZUNhbmRpZGF0ZXMiLCJmaW5kIiwicmVtb3RlQ2FuZGlkYXRlIiwiZm91bmRhdGlvbiIsImlwIiwicG9ydCIsInByaW9yaXR5IiwicHJvdG9jb2wiLCJhZGRSZW1vdGVDYW5kaWRhdGUiLCJtYWtlRXJyb3IiLCJkZXNjcmlwdGlvbiIsIk5vdFN1cHBvcnRlZEVycm9yIiwiSW52YWxpZFN0YXRlRXJyb3IiLCJJbnZhbGlkQWNjZXNzRXJyb3IiLCJUeXBlRXJyb3IiLCJ1bmRlZmluZWQiLCJPcGVyYXRpb25FcnJvciIsImFkZFRyYWNrVG9TdHJlYW1BbmRGaXJlRXZlbnQiLCJhZGRUcmFjayIsImRpc3BhdGNoRXZlbnQiLCJNZWRpYVN0cmVhbVRyYWNrRXZlbnQiLCJyZW1vdmVUcmFja0Zyb21TdHJlYW1BbmRGaXJlRXZlbnQiLCJyZW1vdmVUcmFjayIsImZpcmVBZGRUcmFjayIsInBjIiwicmVjZWl2ZXIiLCJ0cmFja0V2ZW50IiwiRXZlbnQiLCJfZGlzcGF0Y2hFdmVudCIsImNvbmZpZyIsIl9ldmVudFRhcmdldCIsImRvY3VtZW50IiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsIm1ldGhvZCIsImJpbmQiLCJjYW5Ucmlja2xlSWNlQ2FuZGlkYXRlcyIsIm5lZWROZWdvdGlhdGlvbiIsImxvY2FsU3RyZWFtcyIsInJlbW90ZVN0cmVhbXMiLCJyZW1vdGVEZXNjcmlwdGlvbiIsImljZUNvbm5lY3Rpb25TdGF0ZSIsImNvbm5lY3Rpb25TdGF0ZSIsImljZUdhdGhlcmluZ1N0YXRlIiwidXNpbmdCdW5kbGUiLCJidW5kbGVQb2xpY3kiLCJydGNwTXV4UG9saWN5IiwiaWNlVHJhbnNwb3J0UG9saWN5IiwiX2ljZUdhdGhlcmVycyIsImljZUNhbmRpZGF0ZVBvb2xTaXplIiwiUlRDSWNlR2F0aGVyZXIiLCJnYXRoZXJQb2xpY3kiLCJfY29uZmlnIiwidHJhbnNjZWl2ZXJzIiwiX3NkcFNlc3Npb25JZCIsImdlbmVyYXRlU2Vzc2lvbklkIiwiX3NkcFNlc3Npb25WZXJzaW9uIiwiX2R0bHNSb2xlIiwiX2lzQ2xvc2VkIiwicHJvdG90eXBlIiwib25hZGRzdHJlYW0iLCJvbnJlbW92ZXN0cmVhbSIsIm9uc2lnbmFsaW5nc3RhdGVjaGFuZ2UiLCJvbmljZWNvbm5lY3Rpb25zdGF0ZWNoYW5nZSIsIm9uY29ubmVjdGlvbnN0YXRlY2hhbmdlIiwib25pY2VnYXRoZXJpbmdzdGF0ZWNoYW5nZSIsIm9ubmVnb3RpYXRpb25uZWVkZWQiLCJvbmRhdGFjaGFubmVsIiwiX2VtaXRHYXRoZXJpbmdTdGF0ZUNoYW5nZSIsImdldENvbmZpZ3VyYXRpb24iLCJnZXRMb2NhbFN0cmVhbXMiLCJnZXRSZW1vdGVTdHJlYW1zIiwiX2NyZWF0ZVRyYW5zY2VpdmVyIiwiZG9Ob3RBZGQiLCJoYXNCdW5kbGVUcmFuc3BvcnQiLCJyZWN2RW5jb2RpbmdQYXJhbWV0ZXJzIiwiYXNzb2NpYXRlZFJlbW90ZU1lZGlhU3RyZWFtcyIsIndhbnRSZWNlaXZlIiwidHJhbnNwb3J0cyIsIl9jcmVhdGVJY2VBbmREdGxzVHJhbnNwb3J0cyIsImFscmVhZHlFeGlzdHMiLCJfbWF5YmVGaXJlTmVnb3RpYXRpb25OZWVkZWQiLCJSVENSdHBTZW5kZXIiLCJnZXRUcmFja3MiLCJjbG9uZWRTdHJlYW0iLCJjbG9uZSIsImlkeCIsImNsb25lZFRyYWNrIiwiYWRkRXZlbnRMaXN0ZW5lciIsImVuYWJsZWQiLCJzZW5kZXIiLCJzdG9wIiwibWFwIiwic3BsaWNlIiwicmVtb3ZlU3RyZWFtIiwiZ2V0U2VuZGVycyIsImdldFJlY2VpdmVycyIsIl9jcmVhdGVJY2VHYXRoZXJlciIsInNkcE1MaW5lSW5kZXgiLCJzaGlmdCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJ3cml0YWJsZSIsImJ1ZmZlcmVkQ2FuZGlkYXRlRXZlbnRzIiwiYnVmZmVyQ2FuZGlkYXRlcyIsImVuZCIsIl9nYXRoZXIiLCJvbmxvY2FsY2FuZGlkYXRlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImV2dCIsInNkcE1pZCIsImNhbmQiLCJjb21wb25lbnQiLCJ1ZnJhZyIsInVzZXJuYW1lRnJhZ21lbnQiLCJzZXJpYWxpemVkQ2FuZGlkYXRlIiwid3JpdGVDYW5kaWRhdGUiLCJwYXJzZUNhbmRpZGF0ZSIsInRvSlNPTiIsInNlY3Rpb25zIiwiZ2V0TWVkaWFTZWN0aW9ucyIsImdldERlc2NyaXB0aW9uIiwiam9pbiIsImNvbXBsZXRlIiwiZXZlcnkiLCJSVENJY2VUcmFuc3BvcnQiLCJvbmljZXN0YXRlY2hhbmdlIiwiX3VwZGF0ZUljZUNvbm5lY3Rpb25TdGF0ZSIsIl91cGRhdGVDb25uZWN0aW9uU3RhdGUiLCJSVENEdGxzVHJhbnNwb3J0Iiwib25kdGxzc3RhdGVjaGFuZ2UiLCJfZGlzcG9zZUljZUFuZER0bHNUcmFuc3BvcnRzIiwiX3RyYW5zY2VpdmUiLCJyZWN2IiwicGFyYW1zIiwiZW5jb2RpbmdzIiwicnRjcCIsImNuYW1lIiwiY29tcG91bmQiLCJydGNwUGFyYW1ldGVycyIsInAiLCJyZWNlaXZlIiwic2Vzc2lvbnBhcnQiLCJzcGxpdFNlY3Rpb25zIiwibWVkaWFTZWN0aW9uIiwicGFyc2VSdHBQYXJhbWV0ZXJzIiwiaXNJY2VMaXRlIiwibWF0Y2hQcmVmaXgiLCJyZWplY3RlZCIsImlzUmVqZWN0ZWQiLCJyZW1vdGVJY2VQYXJhbWV0ZXJzIiwiZ2V0SWNlUGFyYW1ldGVycyIsInJlbW90ZUR0bHNQYXJhbWV0ZXJzIiwiZ2V0RHRsc1BhcmFtZXRlcnMiLCJyb2xlIiwic3RhcnQiLCJfdXBkYXRlU2lnbmFsaW5nU3RhdGUiLCJyZWNlaXZlckxpc3QiLCJpY2VPcHRpb25zIiwic3Vic3RyIiwic3BsaXQiLCJsaW5lcyIsInNwbGl0TGluZXMiLCJnZXRLaW5kIiwiZGlyZWN0aW9uIiwiZ2V0RGlyZWN0aW9uIiwicmVtb3RlTXNpZCIsInBhcnNlTXNpZCIsImdldE1pZCIsImdlbmVyYXRlSWRlbnRpZmllciIsInBhcnNlUnRwRW5jb2RpbmdQYXJhbWV0ZXJzIiwicGFyc2VSdGNwUGFyYW1ldGVycyIsImlzQ29tcGxldGUiLCJjYW5kcyIsInNldFRyYW5zcG9ydCIsInNldFJlbW90ZUNhbmRpZGF0ZXMiLCJSVENSdHBSZWNlaXZlciIsImdldENhcGFiaWxpdGllcyIsImNvZGVjIiwiaXNOZXdUcmFjayIsIk1lZGlhU3RyZWFtIiwiZ2V0IiwibmF0aXZlVHJhY2siLCJzaWQiLCJpdGVtIiwibmV3U3RhdGUiLCJzdGF0ZXMiLCJjbG9zZWQiLCJjaGVja2luZyIsImNvbm5lY3RlZCIsImNvbXBsZXRlZCIsImRpc2Nvbm5lY3RlZCIsImZhaWxlZCIsImNvbm5lY3RpbmciLCJudW1BdWRpb1RyYWNrcyIsIm51bVZpZGVvVHJhY2tzIiwib2ZmZXJPcHRpb25zIiwiYXJndW1lbnRzIiwibWFuZGF0b3J5Iiwib3B0aW9uYWwiLCJvZmZlclRvUmVjZWl2ZUF1ZGlvIiwib2ZmZXJUb1JlY2VpdmVWaWRlbyIsIndyaXRlU2Vzc2lvbkJvaWxlcnBsYXRlIiwicmVtb3RlQ29kZWMiLCJoZHJFeHQiLCJyZW1vdGVFeHRlbnNpb25zIiwickhkckV4dCIsImdldExvY2FsQ2FuZGlkYXRlcyIsIm1lZGlhU2VjdGlvbnNJbk9mZmVyIiwibG9jYWxUcmFjayIsImdldEF1ZGlvVHJhY2tzIiwiZ2V0VmlkZW9UcmFja3MiLCJoYXNSdHgiLCJjIiwicmVkdWNlZFNpemUiLCJjYW5kaWRhdGVTdHJpbmciLCJ0cmltIiwicHJvbWlzZXMiLCJmaXhTdGF0c1R5cGUiLCJzdGF0IiwiaW5ib3VuZHJ0cCIsIm91dGJvdW5kcnRwIiwiY2FuZGlkYXRlcGFpciIsImxvY2FsY2FuZGlkYXRlIiwicmVtb3RlY2FuZGlkYXRlIiwicmVzdWx0cyIsIk1hcCIsImFsbCIsInJlcyIsInJlc3VsdCIsInNldCIsIm1ldGhvZHMiLCJuYXRpdmVNZXRob2QiLCJhcmdzIiwiYXBwbHkiLCJyYW5kb20iLCJ0b1N0cmluZyIsImJsb2IiLCJsaW5lIiwicGFydHMiLCJwYXJ0IiwiaW5kZXgiLCJwcmVmaXgiLCJzdWJzdHJpbmciLCJyZWxhdGVkQWRkcmVzcyIsInJlbGF0ZWRQb3J0IiwidGNwVHlwZSIsInRvVXBwZXJDYXNlIiwicGFyc2VJY2VPcHRpb25zIiwicGFyc2VSdHBNYXAiLCJwYXJzZWQiLCJ3cml0ZVJ0cE1hcCIsInBhcnNlRXh0bWFwIiwid3JpdGVFeHRtYXAiLCJoZWFkZXJFeHRlbnNpb24iLCJwcmVmZXJyZWRJZCIsInBhcnNlRm10cCIsImt2Iiwid3JpdGVGbXRwIiwicGFyYW0iLCJwYXJzZVJ0Y3BGYiIsIndyaXRlUnRjcEZiIiwicGFyc2VTc3JjTWVkaWEiLCJzcCIsImNvbG9uIiwiYXR0cmlidXRlIiwicGFyc2VGaW5nZXJwcmludCIsImFsZ29yaXRobSIsImZpbmdlcnByaW50cyIsInNldHVwVHlwZSIsImZwIiwiY29uY2F0IiwiaWNlUGFyYW1ldGVycyIsInBhc3N3b3JkIiwibWxpbmUiLCJydHBtYXBsaW5lIiwiZm10cHMiLCJtYXhwdGltZSIsImV4dGVuc2lvbiIsImVuY29kaW5nUGFyYW1ldGVycyIsImhhc1JlZCIsImhhc1VscGZlYyIsInNzcmNzIiwicHJpbWFyeVNzcmMiLCJzZWNvbmRhcnlTc3JjIiwiZmxvd3MiLCJlbmNQYXJhbSIsImNvZGVjUGF5bG9hZFR5cGUiLCJmZWMiLCJtZWNoYW5pc20iLCJiYW5kd2lkdGgiLCJtYXhCaXRyYXRlIiwicmVtb3RlU3NyYyIsIm9iaiIsInJzaXplIiwibXV4IiwicGxhbkIiLCJzZXNzSWQiLCJzZXNzVmVyIiwic2Vzc2lvbklkIiwidmVyc2lvbiIsInBhcnNlTUxpbmUiLCJmbXQiLCJwYXJzZU9MaW5lIiwidXNlcm5hbWUiLCJzZXNzaW9uVmVyc2lvbiIsIm5ldFR5cGUiLCJhZGRyZXNzVHlwZSIsImFkZHJlc3MiLCJnbG9iYWwiLCJhZGFwdGVyRmFjdG9yeSIsInNlbGYiLCJ1dGlscyIsImRlcGVuZGVuY2llcyIsIm9wdHMiLCJvcHRpb25zIiwic2hpbUNocm9tZSIsInNoaW1GaXJlZm94Iiwic2hpbUVkZ2UiLCJzaGltU2FmYXJpIiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJsb2dnaW5nIiwiYnJvd3NlckRldGFpbHMiLCJkZXRlY3RCcm93c2VyIiwiY2hyb21lU2hpbSIsImVkZ2VTaGltIiwiZmlyZWZveFNoaW0iLCJzYWZhcmlTaGltIiwiY29tbW9uU2hpbSIsImFkYXB0ZXIiLCJleHRyYWN0VmVyc2lvbiIsImRpc2FibGVMb2ciLCJkaXNhYmxlV2FybmluZ3MiLCJicm93c2VyIiwic2hpbVBlZXJDb25uZWN0aW9uIiwiYnJvd3NlclNoaW0iLCJzaGltQ3JlYXRlT2JqZWN0VVJMIiwic2hpbUdldFVzZXJNZWRpYSIsInNoaW1NZWRpYVN0cmVhbSIsInNoaW1Tb3VyY2VPYmplY3QiLCJzaGltT25UcmFjayIsInNoaW1BZGRUcmFja1JlbW92ZVRyYWNrIiwic2hpbUdldFNlbmRlcnNXaXRoRHRtZiIsInNoaW1SVENJY2VDYW5kaWRhdGUiLCJzaGltTWF4TWVzc2FnZVNpemUiLCJzaGltU2VuZFRocm93VHlwZUVycm9yIiwic2hpbVJlbW92ZVN0cmVhbSIsInNoaW1SZXBsYWNlVHJhY2siLCJzaGltUlRDSWNlU2VydmVyVXJscyIsInNoaW1DYWxsYmFja3NBUEkiLCJzaGltTG9jYWxTdHJlYW1zQVBJIiwic2hpbVJlbW90ZVN0cmVhbXNBUEkiLCJzaGltVHJhY2tFdmVudFRyYW5zY2VpdmVyIiwic2hpbUNyZWF0ZU9mZmVyTGVnYWN5Iiwid2Via2l0TWVkaWFTdHJlYW0iLCJfb250cmFjayIsIm9yaWdTZXRSZW1vdGVEZXNjcmlwdGlvbiIsIl9vbnRyYWNrcG9seSIsInRlIiwid3JhcFBlZXJDb25uZWN0aW9uRXZlbnQiLCJzaGltU2VuZGVyV2l0aER0bWYiLCJkdG1mIiwiX2R0bWYiLCJjcmVhdGVEVE1GU2VuZGVyIiwiX3BjIiwiX3NlbmRlcnMiLCJvcmlnQWRkVHJhY2siLCJvcmlnUmVtb3ZlVHJhY2siLCJvcmlnQWRkU3RyZWFtIiwib3JpZ1JlbW92ZVN0cmVhbSIsIm9yaWdHZXRTZW5kZXJzIiwic2VuZGVycyIsIlVSTCIsIkhUTUxNZWRpYUVsZW1lbnQiLCJfc3JjT2JqZWN0Iiwic3JjIiwicmV2b2tlT2JqZWN0VVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwic2hpbUFkZFRyYWNrUmVtb3ZlVHJhY2tXaXRoTmF0aXZlIiwiX3NoaW1tZWRMb2NhbFN0cmVhbXMiLCJzdHJlYW1JZCIsIkRPTUV4Y2VwdGlvbiIsImV4aXN0aW5nU2VuZGVycyIsIm5ld1NlbmRlcnMiLCJuZXdTZW5kZXIiLCJvcmlnR2V0TG9jYWxTdHJlYW1zIiwibmF0aXZlU3RyZWFtcyIsIl9yZXZlcnNlU3RyZWFtcyIsIl9zdHJlYW1zIiwibmV3U3RyZWFtIiwib2xkU3RyZWFtIiwicmVwbGFjZUludGVybmFsU3RyZWFtSWQiLCJpbnRlcm5hbElkIiwiZXh0ZXJuYWxTdHJlYW0iLCJpbnRlcm5hbFN0cmVhbSIsInJlcGxhY2UiLCJSZWdFeHAiLCJyZXBsYWNlRXh0ZXJuYWxTdHJlYW1JZCIsImlzTGVnYWN5Q2FsbCIsImVyciIsIm9yaWdTZXRMb2NhbERlc2NyaXB0aW9uIiwib3JpZ0xvY2FsRGVzY3JpcHRpb24iLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJpc0xvY2FsIiwic3RyZWFtaWQiLCJoYXNUcmFjayIsIndlYmtpdFJUQ1BlZXJDb25uZWN0aW9uIiwicGNDb25maWciLCJwY0NvbnN0cmFpbnRzIiwiaWNlVHJhbnNwb3J0cyIsImdlbmVyYXRlQ2VydGlmaWNhdGUiLCJPcmlnUGVlckNvbm5lY3Rpb24iLCJuZXdJY2VTZXJ2ZXJzIiwiZGVwcmVjYXRlZCIsIm9yaWdHZXRTdGF0cyIsInNlbGVjdG9yIiwic3VjY2Vzc0NhbGxiYWNrIiwiZXJyb3JDYWxsYmFjayIsImZpeENocm9tZVN0YXRzXyIsInJlc3BvbnNlIiwic3RhbmRhcmRSZXBvcnQiLCJyZXBvcnRzIiwicmVwb3J0Iiwic3RhbmRhcmRTdGF0cyIsInRpbWVzdGFtcCIsIm5hbWVzIiwibWFrZU1hcFN0YXRzIiwic3VjY2Vzc0NhbGxiYWNrV3JhcHBlcl8iLCJwcm9taXNlIiwibmF0aXZlQWRkSWNlQ2FuZGlkYXRlIiwibmF2aWdhdG9yIiwiY29uc3RyYWludHNUb0Nocm9tZV8iLCJjYyIsImlkZWFsIiwiZXhhY3QiLCJtYXgiLCJvbGRuYW1lXyIsImNoYXJBdCIsIm9jIiwibWl4IiwiYWR2YW5jZWQiLCJzaGltQ29uc3RyYWludHNfIiwiY29uc3RyYWludHMiLCJmdW5jIiwiYXVkaW8iLCJyZW1hcCIsImIiLCJ2aWRlbyIsImZhY2UiLCJmYWNpbmdNb2RlIiwiZ2V0U3VwcG9ydGVkRmFjaW5nTW9kZUxpZXMiLCJtZWRpYURldmljZXMiLCJnZXRTdXBwb3J0ZWRDb25zdHJhaW50cyIsIm1hdGNoZXMiLCJlbnVtZXJhdGVEZXZpY2VzIiwiZGV2aWNlcyIsImQiLCJkZXYiLCJzb21lIiwibWF0Y2giLCJsYWJlbCIsImRldmljZUlkIiwic2hpbUVycm9yXyIsIlBlcm1pc3Npb25EZW5pZWRFcnJvciIsIlBlcm1pc3Npb25EaXNtaXNzZWRFcnJvciIsIkRldmljZXNOb3RGb3VuZEVycm9yIiwiQ29uc3RyYWludE5vdFNhdGlzZmllZEVycm9yIiwiVHJhY2tTdGFydEVycm9yIiwiTWVkaWFEZXZpY2VGYWlsZWREdWVUb1NodXRkb3duIiwiTWVkaWFEZXZpY2VLaWxsU3dpdGNoT24iLCJUYWJDYXB0dXJlRXJyb3IiLCJTY3JlZW5DYXB0dXJlRXJyb3IiLCJEZXZpY2VDYXB0dXJlRXJyb3IiLCJjb25zdHJhaW50IiwiY29uc3RyYWludE5hbWUiLCJnZXRVc2VyTWVkaWFfIiwib25TdWNjZXNzIiwib25FcnJvciIsIndlYmtpdEdldFVzZXJNZWRpYSIsImdldFVzZXJNZWRpYSIsImdldFVzZXJNZWRpYVByb21pc2VfIiwia2luZHMiLCJNZWRpYVN0cmVhbVRyYWNrIiwiZ2V0U291cmNlcyIsImRldmljZSIsImdyb3VwSWQiLCJlY2hvQ2FuY2VsbGF0aW9uIiwiZnJhbWVSYXRlIiwiaGVpZ2h0Iiwid2lkdGgiLCJvcmlnR2V0VXNlck1lZGlhIiwiY3MiLCJOYXRpdmVSVENJY2VDYW5kaWRhdGUiLCJuYXRpdmVDYW5kaWRhdGUiLCJwYXJzZWRDYW5kaWRhdGUiLCJhdWdtZW50ZWRDYW5kaWRhdGUiLCJuYXRpdmVDcmVhdGVPYmplY3RVUkwiLCJuYXRpdmVSZXZva2VPYmplY3RVUkwiLCJuZXdJZCIsImRzYyIsIm5hdGl2ZVNldEF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsIlJUQ1NjdHBUcmFuc3BvcnQiLCJfc2N0cCIsInNjdHBJbkRlc2NyaXB0aW9uIiwibUxpbmUiLCJnZXRSZW1vdGVGaXJlZm94VmVyc2lvbiIsImdldENhblNlbmRNYXhNZXNzYWdlU2l6ZSIsInJlbW90ZUlzRmlyZWZveCIsImNhblNlbmRNYXhNZXNzYWdlU2l6ZSIsImdldE1heE1lc3NhZ2VTaXplIiwibWF4TWVzc2FnZVNpemUiLCJpc0ZpcmVmb3giLCJjYW5TZW5kTU1TIiwicmVtb3RlTU1TIiwiTnVtYmVyIiwiUE9TSVRJVkVfSU5GSU5JVFkiLCJzY3RwIiwib3JpZ0NyZWF0ZURhdGFDaGFubmVsIiwiY3JlYXRlRGF0YUNoYW5uZWwiLCJkYXRhQ2hhbm5lbCIsIm9yaWdEYXRhQ2hhbm5lbFNlbmQiLCJkYyIsInNpemUiLCJieXRlTGVuZ3RoIiwic2hpbVJUQ1BlZXJDb25uZWN0aW9uIiwib3JpZ01TVEVuYWJsZWQiLCJldiIsIlJUQ0R0bWZTZW5kZXIiLCJSVENEVE1GU2VuZGVyIiwicmVwbGFjZVRyYWNrIiwic2V0VHJhY2siLCJSVENUcmFja0V2ZW50IiwibW96U3JjT2JqZWN0IiwibW96UlRDUGVlckNvbm5lY3Rpb24iLCJuZXdTZXJ2ZXIiLCJjcmVkZW50aWFsIiwibW96UlRDU2Vzc2lvbkRlc2NyaXB0aW9uIiwibW96UlRDSWNlQ2FuZGlkYXRlIiwibW9kZXJuU3RhdHNUeXBlcyIsIm5hdGl2ZUdldFN0YXRzIiwib25TdWNjIiwib25FcnIiLCJJbnRlcm5hbEVycm9yIiwiU2VjdXJpdHlFcnJvciIsImNvbnN0cmFpbnRzVG9GRjM3XyIsIm1vekdldFVzZXJNZWRpYSIsImluZm9zIiwib3JnRW51bWVyYXRlRGV2aWNlcyIsIm5hdGl2ZUdldFVzZXJNZWRpYSIsImdldFNldHRpbmdzIiwibmF0aXZlR2V0U2V0dGluZ3MiLCJhcHBseUNvbnN0cmFpbnRzIiwibmF0aXZlQXBwbHlDb25zdHJhaW50cyIsIl9sb2NhbFN0cmVhbXMiLCJnZXRTdHJlYW1CeUlkIiwiX3JlbW90ZVN0cmVhbXMiLCJfYWRkVHJhY2siLCJ0cmFja3MiLCJfb25hZGRzdHJlYW0iLCJfb25hZGRzdHJlYW1wb2x5IiwiZmFpbHVyZUNhbGxiYWNrIiwid2l0aENhbGxiYWNrIiwiY2IiLCJlcnJjYiIsIlJUQ1RyYW5zY2VpdmVyIiwib3JpZ0NyZWF0ZU9mZmVyIiwiYXVkaW9UcmFuc2NlaXZlciIsImdldFRyYW5zY2VpdmVycyIsInNldERpcmVjdGlvbiIsImFkZFRyYW5zY2VpdmVyIiwidmlkZW9UcmFuc2NlaXZlciIsImxvZ0Rpc2FibGVkXyIsImRlcHJlY2F0aW9uV2FybmluZ3NfIiwidWFzdHJpbmciLCJleHByIiwicG9zIiwiZXZlbnROYW1lVG9XcmFwIiwid3JhcHBlciIsInByb3RvIiwibmF0aXZlQWRkRXZlbnRMaXN0ZW5lciIsIm5hdGl2ZUV2ZW50TmFtZSIsIndyYXBwZWRDYWxsYmFjayIsIl9ldmVudE1hcCIsIm5hdGl2ZVJlbW92ZUV2ZW50TGlzdGVuZXIiLCJ1bndyYXBwZWRDYiIsImJvb2wiLCJvbGRNZXRob2QiLCJuZXdNZXRob2QiLCJ1c2VyQWdlbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0FBVkE7OztBQWdCQSxJQUFNQSxTQUFTLFNBQVRBLE1BQVMsQ0FBU0MsU0FBVCxFQUFvQkMsWUFBcEIsRUFBaUM7QUFDNUMsUUFBSUMsT0FBTyxFQUFYO0FBQ0EsUUFBSUMsZUFBZSxJQUFuQjtBQUNBLFFBQUlDLG9CQUFxQixJQUF6Qjs7QUFFQSxRQUFJQyxlQUFlLDBCQUFhTCxTQUFiLEVBQXdCTSwwQkFBeEIsQ0FBbkI7QUFDQSxRQUFJQyxVQUFVRixhQUFhRyxNQUFiLEVBQWQ7O0FBRUEsUUFBSUMsT0FBTztBQUNQQyxjQUFPSiwwQkFEQTtBQUVQSyx5QkFBa0JKLE9BRlg7QUFHUEssa0JBQVcsSUFISjtBQUlQQyxpQkFBVSxLQUpIO0FBS1BDLGdCQUFTLEtBTEY7QUFNUEMsaUJBQVUsS0FOSDtBQU9QQyxlQUFRQyxxQkFQRDtBQVFQQyxnQkFBUyxDQVJGO0FBU1BDLG1CQUFZLENBVEw7QUFVUEMsd0JBQWlCLENBQUMsQ0FWWDtBQVdQQyx1QkFBZ0IsQ0FBQyxDQVhWO0FBWVBDLHVCQUFnQixFQVpUO0FBYVBDLGlCQUFVO0FBYkgsS0FBWDs7QUFnQkFyQixXQUFPLDJCQUFTTyxJQUFULEVBQWVSLFlBQWYsRUFBNkIsVUFBU3VCLE1BQVQs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b0JsSSxLQUFwQixDQUEwQixzQkFBMUIsQ0FERyxFQUNnRDtBQUFFO0FBQ3ZEdk8sbUJBQU95RyxPQUFQLEdBQWlCLFFBQWpCO0FBQ0F6RyxtQkFBT3VFLE9BQVAsR0FBaUIrQixlQUFlb0csVUFBVStKLFNBQXpCLEVBQ2Isc0JBRGEsRUFDVyxDQURYLENBQWpCO0FBRUQsV0FMTSxNQUtBO0FBQUU7QUFDUHpXLG1CQUFPeUcsT0FBUCxHQUFpQiwwQkFBakI7QUFDQSxtQkFBT3pHLE1BQVA7QUFDRDs7QUFFRCxpQkFBT0EsTUFBUDtBQUNEO0FBOUZjLE9BQWpCO0FBaUdDLEtBaExxQixFQWdMcEIsRUFoTG9CLENBOXBKb3hCLEVBQTNiLEVBODBKeFcsRUE5MEp3VyxFQTgwSnJXLENBQUMsQ0FBRCxDQTkwSnFXLEVBODBKaFcsQ0E5MEpnVyxDQUFQO0FBKzBKdlcsQ0EvMEpELEUiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5XZWJSVENQcm92aWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gMTEuLlxyXG4gKi9cclxuaW1wb3J0IE1lZGlhTWFuYWdlciBmcm9tIFwiYXBpL21lZGlhL01hbmFnZXJcIjtcclxuaW1wb3J0IFByb3ZpZGVyIGZyb20gXCJhcGkvcHJvdmlkZXIvaHRtbDUvUHJvdmlkZXJcIjtcclxuaW1wb3J0IFdlYlJUQ0xvYWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9XZWJSVENMb2FkZXJcIjtcclxuaW1wb3J0IHtpc1dlYlJUQ30gZnJvbSBcInV0aWxzL3ZhbGlkYXRvclwiO1xyXG5pbXBvcnQge2Vycm9yVHJpZ2dlcn0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xyXG5pbXBvcnQge1BST1ZJREVSX1dFQlJUQywgU1RBVEVfSURMRX0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICB3ZWJydGMgcHJvdmlkZXIgZXh0ZW5kZWQgY29yZS5cclxuICogQHBhcmFtICAgY29udGFpbmVyIHBsYXllciBlbGVtZW50LlxyXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgICAgY29uZmlnLlxyXG4gKiAqL1xyXG5cclxuY29uc3QgV2ViUlRDID0gZnVuY3Rpb24oY29udGFpbmVyLCBwbGF5ZXJDb25maWcpe1xyXG4gICAgbGV0IHRoYXQgPSB7fTtcclxuICAgIGxldCB3ZWJydGNMb2FkZXIgPSBudWxsO1xyXG4gICAgbGV0IHN1cGVyRGVzdHJveV9mdW5jICA9IG51bGw7XHJcblxyXG4gICAgbGV0IG1lZGlhTWFuYWdlciA9IE1lZGlhTWFuYWdlcihjb250YWluZXIsIFBST1ZJREVSX1dFQlJUQyk7XHJcbiAgICBsZXQgZWxlbWVudCA9IG1lZGlhTWFuYWdlci5jcmVhdGUoKTtcclxuXHJcbiAgICBsZXQgc3BlYyA9IHtcclxuICAgICAgICBuYW1lIDogUFJPVklERVJfV0VCUlRDLFxyXG4gICAgICAgIGV4dGVuZGVkRWxlbWVudCA6IGVsZW1lbnQsXHJcbiAgICAgICAgbGlzdGVuZXIgOiBudWxsLFxyXG4gICAgICAgIGNhblNlZWsgOiBmYWxzZSxcclxuICAgICAgICBpc0xpdmUgOiBmYWxzZSxcclxuICAgICAgICBzZWVraW5nIDogZmFsc2UsXHJcbiAgICAgICAgc3RhdGUgOiBTVEFURV9JRExFLFxyXG4gICAgICAgIGJ1ZmZlciA6IDAsXHJcbiAgICAgICAgZnJhbWVyYXRlIDogMCxcclxuICAgICAgICBjdXJyZW50UXVhbGl0eSA6IC0xLFxyXG4gICAgICAgIGN1cnJlbnRTb3VyY2UgOiAtMSxcclxuICAgICAgICBxdWFsaXR5TGV2ZWxzIDogW10sXHJcbiAgICAgICAgc291cmNlcyA6IFtdXHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQgPSBQcm92aWRlcihzcGVjLCBwbGF5ZXJDb25maWcsIGZ1bmN0aW9uKHNvdXJjZSl7XHJcbiAgICAgICAgaWYoaXNXZWJSVEMoc291cmNlLmZpbGUsIHNvdXJjZS50eXBlKSl7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldFQlJUQyA6IG9uQmVmb3JlTG9hZCA6IFwiLCBzb3VyY2UpO1xyXG4gICAgICAgICAgICBpZih3ZWJydGNMb2FkZXIpe1xyXG4gICAgICAgICAgICAgICAgd2VicnRjTG9hZGVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIHdlYnJ0Y0xvYWRlciA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBsb2FkQ2FsbGJhY2sgPSBmdW5jdGlvbihzdHJlYW0pe1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LnNyY09iamVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc3JjT2JqZWN0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnNyY09iamVjdCA9IHN0cmVhbTtcclxuICAgICAgICAgICAgICAgIHRoYXQucGxheSgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbGV0IHJlc2V0Q2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnBhdXNlKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB3ZWJydGNMb2FkZXIgPSBXZWJSVENMb2FkZXIodGhhdCwgc291cmNlLmZpbGUsIHJlc2V0Q2FsbGJhY2ssIGxvYWRDYWxsYmFjaywgZXJyb3JUcmlnZ2VyKTtcclxuXHJcbiAgICAgICAgICAgIHdlYnJ0Y0xvYWRlci5jb25uZWN0KCkuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgLy90aGF0LmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIC8vRG8gbm90aGluZ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHN1cGVyRGVzdHJveV9mdW5jID0gdGhhdC5zdXBlcignZGVzdHJveScpO1xyXG5cclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldFQlJUQyBQUk9WSURFUiBMT0FERUQuXCIpO1xyXG5cclxuXHJcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcclxuICAgICAgICBpZih3ZWJydGNMb2FkZXIpe1xyXG4gICAgICAgICAgICB3ZWJydGNMb2FkZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB3ZWJydGNMb2FkZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtZWRpYU1hbmFnZXIuZGVzdHJveSgpO1xyXG4gICAgICAgIG1lZGlhTWFuYWdlciA9IG51bGw7XHJcbiAgICAgICAgZWxlbWVudCA9IG51bGw7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiV0VCUlRDIDogIFBST1ZJREVSIERFU1RST1lFRC5cIik7XHJcblxyXG4gICAgICAgIHN1cGVyRGVzdHJveV9mdW5jKCk7XHJcblxyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFdlYlJUQztcclxuIiwiaW1wb3J0IGFkYXB0ZXIgZnJvbSAndXRpbHMvYWRhcHRlcic7XHJcbmltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XHJcbmltcG9ydCB7XHJcbiAgICBFUlJPUlMsXHJcbiAgICBQTEFZRVJfV0VCUlRDX1dTX0VSUk9SLFxyXG4gICAgUExBWUVSX1dFQlJUQ19XU19DTE9TRUQsXHJcbiAgICBQTEFZRVJfV0VCUlRDX0FERF9JQ0VDQU5ESURBVEVfRVJST1IsXHJcbiAgICBQTEFZRVJfV0VCUlRDX1NFVF9SRU1PVEVfREVTQ19FUlJPUixcclxuICAgIFBMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUixcclxuICAgIFBMQVlFUl9XRUJSVENfU0VUX0xPQ0FMX0RFU0NfRVJST1IsXHJcbiAgICBQTEFZRVJfV0VCUlRDX05FVFdPUktfU0xPVyxcclxuICAgIE5FVFdPUktfVU5TVEFCTEVELFxyXG4gICAgT01FX1AyUF9NT0RFXHJcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuXHJcblxyXG5jb25zdCBXZWJSVENMb2FkZXIgPSBmdW5jdGlvbiAocHJvdmlkZXIsIHdlYlNvY2tldFVybCwgcmVzZXRDYWxsYmFjaywgbG9hZENhbGxiYWNrLCBlcnJvclRyaWdnZXIpIHtcclxuXHJcbiAgICBjb25zdCBwZWVyQ29ubmVjdGlvbkNvbmZpZyA9IHtcclxuICAgICAgICAnaWNlU2VydmVycyc6IFt7XHJcbiAgICAgICAgICAgICd1cmxzJzogJ3N0dW46c3R1bi5sLmdvb2dsZS5jb206MTkzMDInXHJcbiAgICAgICAgfV1cclxuICAgIH07XHJcblxyXG4gICAgbGV0IHRoYXQgPSB7fTtcclxuXHJcbiAgICBsZXQgd3MgPSBudWxsO1xyXG5cclxuICAgIGxldCBtYWluU3RyZWFtID0gbnVsbDtcclxuXHJcbiAgICAvLyB1c2VkIGZvciBnZXR0aW5nIG1lZGlhIHN0cmVhbSBmcm9tIE9NRSBvciBob3N0IHBlZXJcclxuICAgIGxldCBtYWluUGVlckNvbm5lY3Rpb25JbmZvID0gbnVsbDtcclxuXHJcbiAgICAvLyB1c2VkIGZvciBzZW5kIG1lZGlhIHN0cmVhbSB0byBjbGllbnQgcGVlci5cclxuICAgIGxldCBjbGllbnRQZWVyQ29ubmVjdGlvbnMgPSB7fTtcclxuXHJcbiAgICBsZXQgc3RhdGlzdGljc1RpbWVyID0gbnVsbDtcclxuXHJcbiAgICAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBleGlzdGluZ0hhbmRsZXIgPSB3aW5kb3cub25iZWZvcmV1bmxvYWQ7XHJcbiAgICAgICAgd2luZG93Lm9uYmVmb3JldW5sb2FkID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChleGlzdGluZ0hhbmRsZXIpIHtcclxuICAgICAgICAgICAgICAgIGV4aXN0aW5nSGFuZGxlcihldmVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVGhpcyBjYWxscyBhdXRvIHdoZW4gYnJvd3NlciBjbG9zZWQuXCIpO1xyXG4gICAgICAgICAgICBjbG9zZVBlZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldFBlZXJDb25uZWN0aW9uQnlJZChpZCkge1xyXG5cclxuICAgICAgICBsZXQgcGVlckNvbm5lY3Rpb24gPSBudWxsO1xyXG5cclxuICAgICAgICBpZiAobWFpblBlZXJDb25uZWN0aW9uSW5mbyAmJiBpZCA9PT0gbWFpblBlZXJDb25uZWN0aW9uSW5mby5pZCkge1xyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbiA9IG1haW5QZWVyQ29ubmVjdGlvbkluZm8ucGVlckNvbm5lY3Rpb247XHJcbiAgICAgICAgfSBlbHNlIGlmIChjbGllbnRQZWVyQ29ubmVjdGlvbnNbaWRdKSB7XHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uID0gY2xpZW50UGVlckNvbm5lY3Rpb25zW2lkXS5wZWVyQ29ubmVjdGlvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBwZWVyQ29ubmVjdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBleHRyYWN0TG9zc1BhY2tldHNPbk5ldHdvcmtTdGF0dXMocGVlckNvbm5lY3Rpb25JbmZvKSB7XHJcblxyXG4gICAgICAgIGlmICghcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cykge1xyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzID0ge307XHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMubG9zdFBhY2tldHNBcnIgPSBbXTtcclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5zbG90TGVuZ3RoID0gODsgLy84IHN0YXRpc3RpY3MuIGV2ZXJ5IDIgc2Vjb25kc1xyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLnByZXZQYWNrZXRzTG9zdCA9IDA7XHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMuYXZnOExvc3NlcyA9IDA7XHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMuYXZnTW9yZVRoYW5UaHJlc2hvbGRDb3VudCA9IDA7ICAvL0lmIGF2ZzhMb3NzIG1vcmUgdGhhbiB0aHJlc2hvbGQuXHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMudGhyZXNob2xkID0gMjA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbG9zdFBhY2tldHNBcnIgPSBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLmxvc3RQYWNrZXRzQXJyLFxyXG4gICAgICAgICAgICBzbG90TGVuZ3RoID0gcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5zbG90TGVuZ3RoLCAvLzggc3RhdGlzdGljcy4gZXZlcnkgMiBzZWNvbmRzXHJcbiAgICAgICAgICAgIHByZXZQYWNrZXRzTG9zdCA9IHBlZXJDb25uZWN0aW9uSW5mby5zdGF0dXMucHJldlBhY2tldHNMb3N0LFxyXG4gICAgICAgICAgICBhdmc4TG9zc2VzID0gcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5hdmc4TG9zc2VzLFxyXG4gICAgICAgICAgICBhdmdNb3JlVGhhblRocmVzaG9sZENvdW50ID0gcGVlckNvbm5lY3Rpb25JbmZvLnN0YXR1cy5hdmdNb3JlVGhhblRocmVzaG9sZENvdW50LCAgLy9JZiBhdmc4TG9zcyBtb3JlIHRoYW4gdGhyZXNob2xkLlxyXG4gICAgICAgICAgICB0aHJlc2hvbGQgPSBwZWVyQ29ubmVjdGlvbkluZm8uc3RhdHVzLnRocmVzaG9sZDtcclxuXHJcbiAgICAgICAgcGVlckNvbm5lY3Rpb25JbmZvLnN0YXRpc3RpY3NUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIXBlZXJDb25uZWN0aW9uSW5mby5wZWVyQ29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uSW5mby5wZWVyQ29ubmVjdGlvbi5nZXRTdGF0cygpLnRoZW4oZnVuY3Rpb24gKHN0YXRzKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0cy5mb3JFYWNoKGZ1bmN0aW9uIChzdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0ZS50eXBlID09PSBcImluYm91bmQtcnRwXCIgJiYgIXN0YXRlLmlzUmVtb3RlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyhzdGF0ZS5wYWNrZXRzTG9zdCAtIHByZXZQYWNrZXRzTG9zdCkgaXMgcmVhbCBjdXJyZW50IGxvc3QuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvc3RQYWNrZXRzQXJyLnB1c2gocGFyc2VJbnQoc3RhdGUucGFja2V0c0xvc3QpIC0gcGFyc2VJbnQocHJldlBhY2tldHNMb3N0KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9zdFBhY2tldHNBcnIubGVuZ3RoID4gc2xvdExlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9zdFBhY2tldHNBcnIgPSBsb3N0UGFja2V0c0Fyci5zbGljZShsb3N0UGFja2V0c0Fyci5sZW5ndGggLSBzbG90TGVuZ3RoLCBsb3N0UGFja2V0c0Fyci5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXZnOExvc3NlcyA9IF8ucmVkdWNlKGxvc3RQYWNrZXRzQXJyLCBmdW5jdGlvbiAobWVtbywgbnVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1lbW8gKyBudW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAwKSAvIHNsb3RMZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXN0OCBMT1NUIFBBQ0tFVCBBVkcgIDogXCIgKyAoYXZnOExvc3NlcyksIHN0YXRlLnBhY2tldHNMb3N0LCBsb3N0UGFja2V0c0Fycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXZnOExvc3NlcyA+IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF2Z01vcmVUaGFuVGhyZXNob2xkQ291bnQrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXZnTW9yZVRoYW5UaHJlc2hvbGRDb3VudCA9PT0gMykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJORVRXT1JLIFVOU1RBQkxFRCEhISBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNsZWFyVGltZW91dChzdGF0aXN0aWNzVGltZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwcm92aWRlci50cmlnZ2VyKE5FVFdPUktfVU5TVEFCTEVEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKE5FVFdPUktfVU5TVEFCTEVEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF2Z01vcmVUaGFuVGhyZXNob2xkQ291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJldlBhY2tldHNMb3N0ID0gc3RhdGUucGFja2V0c0xvc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZXh0cmFjdExvc3NQYWNrZXRzT25OZXR3b3JrU3RhdHVzKHBlZXJDb25uZWN0aW9uSW5mbyk7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIH0sIDIwMDApO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVNYWluUGVlckNvbm5lY3Rpb24oaWQsIHBlZXJJZCwgc2RwLCBjYW5kaWRhdGVzLCByZXNvbHZlKSB7XHJcblxyXG4gICAgICAgIGxldCBwZWVyQ29ubmVjdGlvbiA9IG5ldyBSVENQZWVyQ29ubmVjdGlvbihwZWVyQ29ubmVjdGlvbkNvbmZpZyk7XHJcblxyXG4gICAgICAgIG1haW5QZWVyQ29ubmVjdGlvbkluZm8gPSB7XHJcbiAgICAgICAgICAgIGlkOiBpZCxcclxuICAgICAgICAgICAgcGVlcklkOiBwZWVySWQsXHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uOiBwZWVyQ29ubmVjdGlvblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vU2V0IHJlbW90ZSBkZXNjcmlwdGlvbiB3aGVuIEkgcmVjZWl2ZWQgc2RwIGZyb20gc2VydmVyLlxyXG4gICAgICAgIHBlZXJDb25uZWN0aW9uLnNldFJlbW90ZURlc2NyaXB0aW9uKG5ldyBSVENTZXNzaW9uRGVzY3JpcHRpb24oc2RwKSlcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uLmNyZWF0ZUFuc3dlcigpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRlc2MpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcImNyZWF0ZSBIb3N0IEFuc3dlciA6IHN1Y2Nlc3NcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbi5zZXRMb2NhbERlc2NyaXB0aW9uKGRlc2MpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbXkgU0RQIGNyZWF0ZWQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbG9jYWxTRFAgPSBwZWVyQ29ubmVjdGlvbi5sb2NhbERlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKCdMb2NhbCBTRFAnLCBsb2NhbFNEUCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VuZE1lc3NhZ2Uod3MsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVlcl9pZDogcGVlcklkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmQ6ICdhbnN3ZXInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNkcDogbG9jYWxTRFBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SU1tQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTW1BMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SU1tQTEFZRVJfV0VCUlRDX1NFVF9SRU1PVEVfREVTQ19FUlJPUl07XHJcbiAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgIGNsb3NlUGVlcih0ZW1wRXJyb3IpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGNhbmRpZGF0ZXMpIHtcclxuICAgICAgICAgICAgYWRkSWNlQ2FuZGlkYXRlKHBlZXJDb25uZWN0aW9uLCBjYW5kaWRhdGVzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHBlZXJDb25uZWN0aW9uLm9uaWNlY2FuZGlkYXRlID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUuY2FuZGlkYXRlKSB7XHJcbiAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJXZWJSVENMb2FkZXIgc2VuZCBjYW5kaWRhdGUgdG8gc2VydmVyIDogXCIgKyBlLmNhbmRpZGF0ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ01haW4gUGVlciBDb25uZWN0aW9uIGNhbmRpZGF0ZScsIGUuY2FuZGlkYXRlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZW5kTWVzc2FnZSh3cywge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBpZCxcclxuICAgICAgICAgICAgICAgICAgICBwZWVyX2lkOiBwZWVySWQsXHJcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZDogXCJjYW5kaWRhdGVcIixcclxuICAgICAgICAgICAgICAgICAgICBjYW5kaWRhdGVzOiBbZS5jYW5kaWRhdGVdXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBwZWVyQ29ubmVjdGlvbi5vbnRyYWNrID0gZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcInN0cmVhbSByZWNlaXZlZC5cIik7XHJcblxyXG4gICAgICAgICAgICBleHRyYWN0TG9zc1BhY2tldHNPbk5ldHdvcmtTdGF0dXMobWFpblBlZXJDb25uZWN0aW9uSW5mbyk7XHJcbiAgICAgICAgICAgIG1haW5TdHJlYW0gPSBlLnN0cmVhbXNbMF07XHJcbiAgICAgICAgICAgIGxvYWRDYWxsYmFjayhlLnN0cmVhbXNbMF0pO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlQ2xpZW50UGVlckNvbm5lY3Rpb24oaG9zdElkLCBjbGllbnRJZCkge1xyXG5cclxuICAgICAgICBpZiAoIW1haW5TdHJlYW0pIHtcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGNyZWF0ZUNsaWVudFBlZXJDb25uZWN0aW9uKGhvc3RJZCwgY2xpZW50SWQpO1xyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBlZXJDb25uZWN0aW9uID0gbmV3IFJUQ1BlZXJDb25uZWN0aW9uKHBlZXJDb25uZWN0aW9uQ29uZmlnKTtcclxuXHJcbiAgICAgICAgY2xpZW50UGVlckNvbm5lY3Rpb25zW2NsaWVudElkXSA9IHtcclxuICAgICAgICAgICAgaWQ6IGNsaWVudElkLFxyXG4gICAgICAgICAgICBwZWVySWQ6IGhvc3RJZCxcclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb246IHBlZXJDb25uZWN0aW9uXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcGVlckNvbm5lY3Rpb24uYWRkU3RyZWFtKG1haW5TdHJlYW0pO1xyXG5cclxuICAgICAgICAvLyBsZXQgb2ZmZXJPcHRpb24gPSB7XHJcbiAgICAgICAgLy8gICAgIG9mZmVyVG9SZWNlaXZlQXVkaW86IDEsXHJcbiAgICAgICAgLy8gICAgIG9mZmVyVG9SZWNlaXZlVmlkZW86IDFcclxuICAgICAgICAvLyB9O1xyXG5cclxuICAgICAgICBwZWVyQ29ubmVjdGlvbi5jcmVhdGVPZmZlcihzZXRMb2NhbEFuZFNlbmRNZXNzYWdlLCBoYW5kbGVDcmVhdGVPZmZlckVycm9yLCB7fSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldExvY2FsQW5kU2VuZE1lc3NhZ2Uoc2Vzc2lvbkRlc2NyaXB0aW9uKSB7XHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uLnNldExvY2FsRGVzY3JpcHRpb24oc2Vzc2lvbkRlc2NyaXB0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIHNlbmRNZXNzYWdlKHdzLCB7XHJcbiAgICAgICAgICAgICAgICBpZDogaG9zdElkLFxyXG4gICAgICAgICAgICAgICAgcGVlcl9pZDogY2xpZW50SWQsXHJcbiAgICAgICAgICAgICAgICBzZHA6IHNlc3Npb25EZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgICAgIGNvbW1hbmQ6ICdvZmZlcl9wMnAnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlQ3JlYXRlT2ZmZXJFcnJvcihldmVudCkge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnY3JlYXRlT2ZmZXIoKSBlcnJvcjogJywgZXZlbnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcGVlckNvbm5lY3Rpb24ub25pY2VjYW5kaWRhdGUgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAoZS5jYW5kaWRhdGUpIHtcclxuICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldlYlJUQ0xvYWRlciBzZW5kIGNhbmRpZGF0ZSB0byBzZXJ2ZXIgOiBcIiArIGUuY2FuZGlkYXRlKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ0NsaWVudCBQZWVyIENvbm5lY3Rpb24gY2FuZGlkYXRlJywgZS5jYW5kaWRhdGUpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbmRNZXNzYWdlKHdzLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGhvc3RJZCxcclxuICAgICAgICAgICAgICAgICAgICBwZWVyX2lkOiBjbGllbnRJZCxcclxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kOiBcImNhbmRpZGF0ZV9wMnBcIixcclxuICAgICAgICAgICAgICAgICAgICBjYW5kaWRhdGVzOiBbZS5jYW5kaWRhdGVdXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZEljZUNhbmRpZGF0ZShwZWVyQ29ubmVjdGlvbiwgY2FuZGlkYXRlcykge1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhbmRpZGF0ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGNhbmRpZGF0ZXNbaV0gJiYgY2FuZGlkYXRlc1tpXS5jYW5kaWRhdGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbi5hZGRJY2VDYW5kaWRhdGUobmV3IFJUQ0ljZUNhbmRpZGF0ZShjYW5kaWRhdGVzW2ldKSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiYWRkSWNlQ2FuZGlkYXRlIDogc3VjY2Vzc1wiKTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlNbUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SXTtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRXZWJTb2NrZXQocmVzb2x2ZSwgcmVqZWN0KSB7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcblxyXG4gICAgICAgICAgICB3cyA9IG5ldyBXZWJTb2NrZXQod2ViU29ja2V0VXJsKTtcclxuXHJcbiAgICAgICAgICAgIHdzLm9ub3BlbiA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygn7Ju57IaM7LyTIOyXtOumvCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbmRNZXNzYWdlKHdzLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZDogXCJyZXF1ZXN0X29mZmVyXCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgd3Mub25tZXNzYWdlID0gZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gSlNPTi5wYXJzZShlLmRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdSZWNlaXZlIG1lc3NhZ2UnLCBtZXNzYWdlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5lcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlNbUExBWUVSX1dFQlJUQ19XU19FUlJPUl07XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gbWVzc2FnZS5lcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFtZXNzYWdlLmlkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZygnSUQgbXVzdCBiZSBub3QgbnVsbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5jb21tYW5kID09PSAnb2ZmZXInKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZU1haW5QZWVyQ29ubmVjdGlvbihtZXNzYWdlLmlkLCBtZXNzYWdlLnBlZXJfaWQsIG1lc3NhZ2Uuc2RwLCBtZXNzYWdlLmNhbmRpZGF0ZXMsIHJlc29sdmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKG1lc3NhZ2UucGVlcl9pZCA9PT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoT01FX1AyUF9NT0RFLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoT01FX1AyUF9NT0RFLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UuY29tbWFuZCA9PT0gJ3JlcXVlc3Rfb2ZmZXJfcDJwJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVDbGllbnRQZWVyQ29ubmVjdGlvbihtZXNzYWdlLmlkLCBtZXNzYWdlLnBlZXJfaWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLmNvbW1hbmQgPT09ICdhbnN3ZXJfcDJwJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGVlckNvbm5lY3Rpb24xID0gZ2V0UGVlckNvbm5lY3Rpb25CeUlkKG1lc3NhZ2UucGVlcl9pZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uMS5zZXRSZW1vdGVEZXNjcmlwdGlvbihuZXcgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKG1lc3NhZ2Uuc2RwKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRlc2MpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlNbUExBWUVSX1dFQlJUQ19TRVRfUkVNT1RFX0RFU0NfRVJST1JdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG1lc3NhZ2UuY29tbWFuZCA9PT0gJ2NhbmRpZGF0ZScpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2FuZGlkYXRlcyBmb3IgbmV3IGNsaWVudCBwZWVyXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBlZXJDb25uZWN0aW9uMiA9IGdldFBlZXJDb25uZWN0aW9uQnlJZChtZXNzYWdlLmlkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYWRkSWNlQ2FuZGlkYXRlKHBlZXJDb25uZWN0aW9uMiwgbWVzc2FnZS5jYW5kaWRhdGVzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWVzc2FnZS5jb21tYW5kID09PSAnY2FuZGlkYXRlX3AycCcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2FuZGlkYXRlcyBmb3IgbmV3IGNsaWVudCBwZWVyXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBlZXJDb25uZWN0aW9uMyA9IGdldFBlZXJDb25uZWN0aW9uQnlJZChtZXNzYWdlLnBlZXJfaWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBhZGRJY2VDYW5kaWRhdGUocGVlckNvbm5lY3Rpb24zLCBtZXNzYWdlLmNhbmRpZGF0ZXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlLmNvbW1hbmQgPT09ICdzdG9wJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAobWFpblBlZXJDb25uZWN0aW9uSW5mby5wZWVySWQgPT09IG1lc3NhZ2UucGVlcl9pZCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2xvc2UgY29ubmVjdGlvbiB3aXRoIGhvc3QgYW5kIHJldHJ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdjbG9zZSBjb25uZWN0aW9uIHdpdGggaG9zdCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFpblN0cmVhbSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5QZWVyQ29ubmVjdGlvbkluZm8ucGVlckNvbm5lY3Rpb24uY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWFpblBlZXJDb25uZWN0aW9uSW5mbyA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNldENhbGxiYWNrKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZW5kTWVzc2FnZSh3cywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZDogJ3JlcXVlc3Rfb2ZmZXInXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2xvc2UgY29ubmVjdGlvbiB3aXRoIGNsaWVudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xpZW50UGVlckNvbm5lY3Rpb25zW21lc3NhZ2UucGVlcl9pZF0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdjbG9zZSBjb25uZWN0aW9uIHdpdGggY2xpZW50OiAnLCBtZXNzYWdlLnBlZXJfaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xpZW50UGVlckNvbm5lY3Rpb25zW21lc3NhZ2UucGVlcl9pZF0ucGVlckNvbm5lY3Rpb24uY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjbGllbnRQZWVyQ29ubmVjdGlvbnNbbWVzc2FnZS5wZWVyX2lkXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgd3Mub25jbG9zZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlNbUExBWUVSX1dFQlJUQ19XU19FUlJPUl07XHJcbiAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHdzLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlNbUExBWUVSX1dFQlJUQ19XU19FUlJPUl07XHJcbiAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgIGNsb3NlUGVlcih0ZW1wRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICBjbG9zZVBlZXIoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xyXG5cclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJXZWJSVENMb2FkZXIgY29ubmVjdGluZy4uLlwiKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldlYlJUQ0xvYWRlciB1cmwgOiBcIiArIHdlYlNvY2tldFVybCk7XHJcblxyXG4gICAgICAgICAgICBpbml0V2ViU29ja2V0KHJlc29sdmUsIHJlamVjdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VQZWVyKGVycm9yKSB7XHJcblxyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZygnV2ViUlRDIExvYWRlciBjbG9zZVBlZWFyKCknKTtcclxuICAgICAgICBpZiAod3MpIHtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKCdDbG9zaW5nIHdlYnNvY2tldCBjb25uZWN0aW9uLi4uJyk7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlNlbmQgU2lnbmFsaW5nIDogU3RvcC5cIik7XHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgIDAgKENPTk5FQ1RJTkcpXHJcbiAgICAgICAgICAgIDEgKE9QRU4pXHJcbiAgICAgICAgICAgIDIgKENMT1NJTkcpXHJcbiAgICAgICAgICAgIDMgKENMT1NFRClcclxuICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgaWYgKHdzLnJlYWR5U3RhdGUgPT09IDEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobWFpblBlZXJDb25uZWN0aW9uSW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbmRNZXNzYWdlKHdzLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmQ6ICdzdG9wJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IG1haW5QZWVyQ29ubmVjdGlvbkluZm8uaWRcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB3cy5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ+ybueyGjOy8kyDri6vtnpgnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB3cyA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtYWluUGVlckNvbm5lY3Rpb25JbmZvKSB7XHJcblxyXG4gICAgICAgICAgICBtYWluU3RyZWFtID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZygnQ2xvc2luZyBtYWluIHBlZXIgY29ubmVjdGlvbi4uLicpO1xyXG4gICAgICAgICAgICBpZiAoc3RhdGlzdGljc1RpbWVyKSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoc3RhdGlzdGljc1RpbWVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtYWluUGVlckNvbm5lY3Rpb25JbmZvLnBlZXJDb25uZWN0aW9uLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIG1haW5QZWVyQ29ubmVjdGlvbkluZm8gPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGNsaWVudFBlZXJDb25uZWN0aW9ucykubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgY2xpZW50SWQgaW4gY2xpZW50UGVlckNvbm5lY3Rpb25zKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGNsaWVudFBlZXJDb25uZWN0aW9uID0gY2xpZW50UGVlckNvbm5lY3Rpb25zW2NsaWVudElkXS5wZWVyQ29ubmVjdGlvbjtcclxuXHJcbiAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coJ0Nsb3NpbmcgY2xpZW50IHBlZXIgY29ubmVjdGlvbi4uLicpO1xyXG4gICAgICAgICAgICAgICAgY2xpZW50UGVlckNvbm5lY3Rpb24uY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIGNsaWVudFBlZXJDb25uZWN0aW9uID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY2xpZW50UGVlckNvbm5lY3Rpb25zID0ge307XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgZXJyb3JUcmlnZ2VyKGVycm9yLCBwcm92aWRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNlbmRNZXNzYWdlKHdzLCBtZXNzYWdlKSB7XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdTZW5kIE1lc3NhZ2UnLCBtZXNzYWdlKTtcclxuICAgICAgICB3cy5zZW5kKEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGF0LmNvbm5lY3QgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGluaXRpYWxpemUoKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT4ge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiV0VCUlRDIExPQURFUiBkZXN0cm95XCIpO1xyXG4gICAgICAgIGNsb3NlUGVlcigpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFdlYlJUQ0xvYWRlcjtcclxuIiwiKGZ1bmN0aW9uKGYpe2lmKHR5cGVvZiBleHBvcnRzPT09XCJvYmplY3RcIiYmdHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCIpe21vZHVsZS5leHBvcnRzPWYoKX1lbHNlIGlmKHR5cGVvZiBkZWZpbmU9PT1cImZ1bmN0aW9uXCImJmRlZmluZS5hbWQpe2RlZmluZShbXSxmKX1lbHNle3ZhciBnO2lmKHR5cGVvZiB3aW5kb3chPT1cInVuZGVmaW5lZFwiKXtnPXdpbmRvd31lbHNlIGlmKHR5cGVvZiBnbG9iYWwhPT1cInVuZGVmaW5lZFwiKXtnPWdsb2JhbH1lbHNlIGlmKHR5cGVvZiBzZWxmIT09XCJ1bmRlZmluZWRcIil7Zz1zZWxmfWVsc2V7Zz10aGlzfWcuYWRhcHRlciA9IGYoKX19KShmdW5jdGlvbigpe3ZhciBkZWZpbmUsbW9kdWxlLGV4cG9ydHM7cmV0dXJuIChmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuLypcclxuICogIENvcHlyaWdodCAoYykgMjAxNyBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcclxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxyXG4gKiAgdHJlZS5cclxuICovXHJcbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIFNEUFV0aWxzID0gcmVxdWlyZSgnc2RwJyk7XHJcblxyXG5mdW5jdGlvbiB3cml0ZU1lZGlhU2VjdGlvbih0cmFuc2NlaXZlciwgY2FwcywgdHlwZSwgc3RyZWFtLCBkdGxzUm9sZSkge1xyXG4gIHZhciBzZHAgPSBTRFBVdGlscy53cml0ZVJ0cERlc2NyaXB0aW9uKHRyYW5zY2VpdmVyLmtpbmQsIGNhcHMpO1xyXG5cclxuICAvLyBNYXAgSUNFIHBhcmFtZXRlcnMgKHVmcmFnLCBwd2QpIHRvIFNEUC5cclxuICBzZHAgKz0gU0RQVXRpbHMud3JpdGVJY2VQYXJhbWV0ZXJzKFxyXG4gICAgICB0cmFuc2NlaXZlci5pY2VHYXRoZXJlci5nZXRMb2NhbFBhcmFtZXRlcnMoKSk7XHJcblxyXG4gIC8vIE1hcCBEVExTIHBhcmFtZXRlcnMgdG8gU0RQLlxyXG4gIHNkcCArPSBTRFBVdGlscy53cml0ZUR0bHNQYXJhbWV0ZXJzKFxyXG4gICAgICB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0LmdldExvY2FsUGFyYW1ldGVycygpLFxyXG4gICAgICB0eXBlID09PSAnb2ZmZXInID8gJ2FjdHBhc3MnIDogZHRsc1JvbGUgfHwgJ2FjdGl2ZScpO1xyXG5cclxuICBzZHAgKz0gJ2E9bWlkOicgKyB0cmFuc2NlaXZlci5taWQgKyAnXFxyXFxuJztcclxuXHJcbiAgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlciAmJiB0cmFuc2NlaXZlci5ydHBSZWNlaXZlcikge1xyXG4gICAgc2RwICs9ICdhPXNlbmRyZWN2XFxyXFxuJztcclxuICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlcikge1xyXG4gICAgc2RwICs9ICdhPXNlbmRvbmx5XFxyXFxuJztcclxuICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyKSB7XHJcbiAgICBzZHAgKz0gJ2E9cmVjdm9ubHlcXHJcXG4nO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBzZHAgKz0gJ2E9aW5hY3RpdmVcXHJcXG4nO1xyXG4gIH1cclxuXHJcbiAgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlcikge1xyXG4gICAgdmFyIHRyYWNrSWQgPSB0cmFuc2NlaXZlci5ydHBTZW5kZXIuX2luaXRpYWxUcmFja0lkIHx8XHJcbiAgICAgICAgdHJhbnNjZWl2ZXIucnRwU2VuZGVyLnRyYWNrLmlkO1xyXG4gICAgdHJhbnNjZWl2ZXIucnRwU2VuZGVyLl9pbml0aWFsVHJhY2tJZCA9IHRyYWNrSWQ7XHJcbiAgICAvLyBzcGVjLlxyXG4gICAgdmFyIG1zaWQgPSAnbXNpZDonICsgKHN0cmVhbSA/IHN0cmVhbS5pZCA6ICctJykgKyAnICcgK1xyXG4gICAgICAgIHRyYWNrSWQgKyAnXFxyXFxuJztcclxuICAgIHNkcCArPSAnYT0nICsgbXNpZDtcclxuICAgIC8vIGZvciBDaHJvbWUuIExlZ2FjeSBzaG91bGQgbm8gbG9uZ2VyIGJlIHJlcXVpcmVkLlxyXG4gICAgc2RwICs9ICdhPXNzcmM6JyArIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYyArXHJcbiAgICAgICAgJyAnICsgbXNpZDtcclxuXHJcbiAgICAvLyBSVFhcclxuICAgIGlmICh0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCkge1xyXG4gICAgICBzZHAgKz0gJ2E9c3NyYzonICsgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHguc3NyYyArXHJcbiAgICAgICAgICAnICcgKyBtc2lkO1xyXG4gICAgICBzZHAgKz0gJ2E9c3NyYy1ncm91cDpGSUQgJyArXHJcbiAgICAgICAgICB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmMgKyAnICcgK1xyXG4gICAgICAgICAgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHguc3NyYyArXHJcbiAgICAgICAgICAnXFxyXFxuJztcclxuICAgIH1cclxuICB9XHJcbiAgLy8gRklYTUU6IHRoaXMgc2hvdWxkIGJlIHdyaXR0ZW4gYnkgd3JpdGVSdHBEZXNjcmlwdGlvbi5cclxuICBzZHAgKz0gJ2E9c3NyYzonICsgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjICtcclxuICAgICAgJyBjbmFtZTonICsgU0RQVXRpbHMubG9jYWxDTmFtZSArICdcXHJcXG4nO1xyXG4gIGlmICh0cmFuc2NlaXZlci5ydHBTZW5kZXIgJiYgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHgpIHtcclxuICAgIHNkcCArPSAnYT1zc3JjOicgKyB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eC5zc3JjICtcclxuICAgICAgICAnIGNuYW1lOicgKyBTRFBVdGlscy5sb2NhbENOYW1lICsgJ1xcclxcbic7XHJcbiAgfVxyXG4gIHJldHVybiBzZHA7XHJcbn1cclxuXHJcbi8vIEVkZ2UgZG9lcyBub3QgbGlrZVxyXG4vLyAxKSBzdHVuOiBmaWx0ZXJlZCBhZnRlciAxNDM5MyB1bmxlc3MgP3RyYW5zcG9ydD11ZHAgaXMgcHJlc2VudFxyXG4vLyAyKSB0dXJuOiB0aGF0IGRvZXMgbm90IGhhdmUgYWxsIG9mIHR1cm46aG9zdDpwb3J0P3RyYW5zcG9ydD11ZHBcclxuLy8gMykgdHVybjogd2l0aCBpcHY2IGFkZHJlc3Nlc1xyXG4vLyA0KSB0dXJuOiBvY2N1cnJpbmcgbXVsaXBsZSB0aW1lc1xyXG5mdW5jdGlvbiBmaWx0ZXJJY2VTZXJ2ZXJzKGljZVNlcnZlcnMsIGVkZ2VWZXJzaW9uKSB7XHJcbiAgdmFyIGhhc1R1cm4gPSBmYWxzZTtcclxuICBpY2VTZXJ2ZXJzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShpY2VTZXJ2ZXJzKSk7XHJcbiAgcmV0dXJuIGljZVNlcnZlcnMuZmlsdGVyKGZ1bmN0aW9uKHNlcnZlcikge1xyXG4gICAgaWYgKHNlcnZlciAmJiAoc2VydmVyLnVybHMgfHwgc2VydmVyLnVybCkpIHtcclxuICAgICAgdmFyIHVybHMgPSBzZXJ2ZXIudXJscyB8fCBzZXJ2ZXIudXJsO1xyXG4gICAgICBpZiAoc2VydmVyLnVybCAmJiAhc2VydmVyLnVybHMpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oJ1JUQ0ljZVNlcnZlci51cmwgaXMgZGVwcmVjYXRlZCEgVXNlIHVybHMgaW5zdGVhZC4nKTtcclxuICAgICAgfVxyXG4gICAgICB2YXIgaXNTdHJpbmcgPSB0eXBlb2YgdXJscyA9PT0gJ3N0cmluZyc7XHJcbiAgICAgIGlmIChpc1N0cmluZykge1xyXG4gICAgICAgIHVybHMgPSBbdXJsc107XHJcbiAgICAgIH1cclxuICAgICAgdXJscyA9IHVybHMuZmlsdGVyKGZ1bmN0aW9uKHVybCkge1xyXG4gICAgICAgIHZhciB2YWxpZFR1cm4gPSB1cmwuaW5kZXhPZigndHVybjonKSA9PT0gMCAmJlxyXG4gICAgICAgICAgICB1cmwuaW5kZXhPZigndHJhbnNwb3J0PXVkcCcpICE9PSAtMSAmJlxyXG4gICAgICAgICAgICB1cmwuaW5kZXhPZigndHVybjpbJykgPT09IC0xICYmXHJcbiAgICAgICAgICAgICFoYXNUdXJuO1xyXG5cclxuICAgICAgICBpZiAodmFsaWRUdXJuKSB7XHJcbiAgICAgICAgICBoYXNUdXJuID0gdHJ1ZTtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdXJsLmluZGV4T2YoJ3N0dW46JykgPT09IDAgJiYgZWRnZVZlcnNpb24gPj0gMTQzOTMgJiZcclxuICAgICAgICAgICAgdXJsLmluZGV4T2YoJz90cmFuc3BvcnQ9dWRwJykgPT09IC0xO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGRlbGV0ZSBzZXJ2ZXIudXJsO1xyXG4gICAgICBzZXJ2ZXIudXJscyA9IGlzU3RyaW5nID8gdXJsc1swXSA6IHVybHM7XHJcbiAgICAgIHJldHVybiAhIXVybHMubGVuZ3RoO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG4vLyBEZXRlcm1pbmVzIHRoZSBpbnRlcnNlY3Rpb24gb2YgbG9jYWwgYW5kIHJlbW90ZSBjYXBhYmlsaXRpZXMuXHJcbmZ1bmN0aW9uIGdldENvbW1vbkNhcGFiaWxpdGllcyhsb2NhbENhcGFiaWxpdGllcywgcmVtb3RlQ2FwYWJpbGl0aWVzKSB7XHJcbiAgdmFyIGNvbW1vbkNhcGFiaWxpdGllcyA9IHtcclxuICAgIGNvZGVjczogW10sXHJcbiAgICBoZWFkZXJFeHRlbnNpb25zOiBbXSxcclxuICAgIGZlY01lY2hhbmlzbXM6IFtdXHJcbiAgfTtcclxuXHJcbiAgdmFyIGZpbmRDb2RlY0J5UGF5bG9hZFR5cGUgPSBmdW5jdGlvbihwdCwgY29kZWNzKSB7XHJcbiAgICBwdCA9IHBhcnNlSW50KHB0LCAxMCk7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvZGVjcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAoY29kZWNzW2ldLnBheWxvYWRUeXBlID09PSBwdCB8fFxyXG4gICAgICAgICAgY29kZWNzW2ldLnByZWZlcnJlZFBheWxvYWRUeXBlID09PSBwdCkge1xyXG4gICAgICAgIHJldHVybiBjb2RlY3NbaV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICB2YXIgcnR4Q2FwYWJpbGl0eU1hdGNoZXMgPSBmdW5jdGlvbihsUnR4LCByUnR4LCBsQ29kZWNzLCByQ29kZWNzKSB7XHJcbiAgICB2YXIgbENvZGVjID0gZmluZENvZGVjQnlQYXlsb2FkVHlwZShsUnR4LnBhcmFtZXRlcnMuYXB0LCBsQ29kZWNzKTtcclxuICAgIHZhciByQ29kZWMgPSBmaW5kQ29kZWNCeVBheWxvYWRUeXBlKHJSdHgucGFyYW1ldGVycy5hcHQsIHJDb2RlY3MpO1xyXG4gICAgcmV0dXJuIGxDb2RlYyAmJiByQ29kZWMgJiZcclxuICAgICAgICBsQ29kZWMubmFtZS50b0xvd2VyQ2FzZSgpID09PSByQ29kZWMubmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gIH07XHJcblxyXG4gIGxvY2FsQ2FwYWJpbGl0aWVzLmNvZGVjcy5mb3JFYWNoKGZ1bmN0aW9uKGxDb2RlYykge1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZW1vdGVDYXBhYmlsaXRpZXMuY29kZWNzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHZhciByQ29kZWMgPSByZW1vdGVDYXBhYmlsaXRpZXMuY29kZWNzW2ldO1xyXG4gICAgICBpZiAobENvZGVjLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gckNvZGVjLm5hbWUudG9Mb3dlckNhc2UoKSAmJlxyXG4gICAgICAgICAgbENvZGVjLmNsb2NrUmF0ZSA9PT0gckNvZGVjLmNsb2NrUmF0ZSkge1xyXG4gICAgICAgIGlmIChsQ29kZWMubmFtZS50b0xvd2VyQ2FzZSgpID09PSAncnR4JyAmJlxyXG4gICAgICAgICAgICBsQ29kZWMucGFyYW1ldGVycyAmJiByQ29kZWMucGFyYW1ldGVycy5hcHQpIHtcclxuICAgICAgICAgIC8vIGZvciBSVFggd2UgbmVlZCB0byBmaW5kIHRoZSBsb2NhbCBydHggdGhhdCBoYXMgYSBhcHRcclxuICAgICAgICAgIC8vIHdoaWNoIHBvaW50cyB0byB0aGUgc2FtZSBsb2NhbCBjb2RlYyBhcyB0aGUgcmVtb3RlIG9uZS5cclxuICAgICAgICAgIGlmICghcnR4Q2FwYWJpbGl0eU1hdGNoZXMobENvZGVjLCByQ29kZWMsXHJcbiAgICAgICAgICAgICAgbG9jYWxDYXBhYmlsaXRpZXMuY29kZWNzLCByZW1vdGVDYXBhYmlsaXRpZXMuY29kZWNzKSkge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgckNvZGVjID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShyQ29kZWMpKTsgLy8gZGVlcGNvcHlcclxuICAgICAgICAvLyBudW1iZXIgb2YgY2hhbm5lbHMgaXMgdGhlIGhpZ2hlc3QgY29tbW9uIG51bWJlciBvZiBjaGFubmVsc1xyXG4gICAgICAgIHJDb2RlYy5udW1DaGFubmVscyA9IE1hdGgubWluKGxDb2RlYy5udW1DaGFubmVscyxcclxuICAgICAgICAgICAgckNvZGVjLm51bUNoYW5uZWxzKTtcclxuICAgICAgICAvLyBwdXNoIHJDb2RlYyBzbyB3ZSByZXBseSB3aXRoIG9mZmVyZXIgcGF5bG9hZCB0eXBlXHJcbiAgICAgICAgY29tbW9uQ2FwYWJpbGl0aWVzLmNvZGVjcy5wdXNoKHJDb2RlYyk7XHJcblxyXG4gICAgICAgIC8vIGRldGVybWluZSBjb21tb24gZmVlZGJhY2sgbWVjaGFuaXNtc1xyXG4gICAgICAgIHJDb2RlYy5ydGNwRmVlZGJhY2sgPSByQ29kZWMucnRjcEZlZWRiYWNrLmZpbHRlcihmdW5jdGlvbihmYikge1xyXG4gICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBsQ29kZWMucnRjcEZlZWRiYWNrLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIGlmIChsQ29kZWMucnRjcEZlZWRiYWNrW2pdLnR5cGUgPT09IGZiLnR5cGUgJiZcclxuICAgICAgICAgICAgICAgIGxDb2RlYy5ydGNwRmVlZGJhY2tbal0ucGFyYW1ldGVyID09PSBmYi5wYXJhbWV0ZXIpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIEZJWE1FOiBhbHNvIG5lZWQgdG8gZGV0ZXJtaW5lIC5wYXJhbWV0ZXJzXHJcbiAgICAgICAgLy8gIHNlZSBodHRwczovL2dpdGh1Yi5jb20vb3BlbnBlZXIvb3J0Yy9pc3N1ZXMvNTY5XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgbG9jYWxDYXBhYmlsaXRpZXMuaGVhZGVyRXh0ZW5zaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGxIZWFkZXJFeHRlbnNpb24pIHtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVtb3RlQ2FwYWJpbGl0aWVzLmhlYWRlckV4dGVuc2lvbnMubGVuZ3RoO1xyXG4gICAgICAgICBpKyspIHtcclxuICAgICAgdmFyIHJIZWFkZXJFeHRlbnNpb24gPSByZW1vdGVDYXBhYmlsaXRpZXMuaGVhZGVyRXh0ZW5zaW9uc1tpXTtcclxuICAgICAgaWYgKGxIZWFkZXJFeHRlbnNpb24udXJpID09PSBySGVhZGVyRXh0ZW5zaW9uLnVyaSkge1xyXG4gICAgICAgIGNvbW1vbkNhcGFiaWxpdGllcy5oZWFkZXJFeHRlbnNpb25zLnB1c2gockhlYWRlckV4dGVuc2lvbik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gRklYTUU6IGZlY01lY2hhbmlzbXNcclxuICByZXR1cm4gY29tbW9uQ2FwYWJpbGl0aWVzO1xyXG59XHJcblxyXG4vLyBpcyBhY3Rpb249c2V0TG9jYWxEZXNjcmlwdGlvbiB3aXRoIHR5cGUgYWxsb3dlZCBpbiBzaWduYWxpbmdTdGF0ZVxyXG5mdW5jdGlvbiBpc0FjdGlvbkFsbG93ZWRJblNpZ25hbGluZ1N0YXRlKGFjdGlvbiwgdHlwZSwgc2lnbmFsaW5nU3RhdGUpIHtcclxuICByZXR1cm4ge1xyXG4gICAgb2ZmZXI6IHtcclxuICAgICAgc2V0TG9jYWxEZXNjcmlwdGlvbjogWydzdGFibGUnLCAnaGF2ZS1sb2NhbC1vZmZlciddLFxyXG4gICAgICBzZXRSZW1vdGVEZXNjcmlwdGlvbjogWydzdGFibGUnLCAnaGF2ZS1yZW1vdGUtb2ZmZXInXVxyXG4gICAgfSxcclxuICAgIGFuc3dlcjoge1xyXG4gICAgICBzZXRMb2NhbERlc2NyaXB0aW9uOiBbJ2hhdmUtcmVtb3RlLW9mZmVyJywgJ2hhdmUtbG9jYWwtcHJhbnN3ZXInXSxcclxuICAgICAgc2V0UmVtb3RlRGVzY3JpcHRpb246IFsnaGF2ZS1sb2NhbC1vZmZlcicsICdoYXZlLXJlbW90ZS1wcmFuc3dlciddXHJcbiAgICB9XHJcbiAgfVt0eXBlXVthY3Rpb25dLmluZGV4T2Yoc2lnbmFsaW5nU3RhdGUpICE9PSAtMTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWF5YmVBZGRDYW5kaWRhdGUoaWNlVHJhbnNwb3J0LCBjYW5kaWRhdGUpIHtcclxuICAvLyBFZGdlJ3MgaW50ZXJuYWwgcmVwcmVzZW50YXRpb24gYWRkcyBzb21lIGZpZWxkcyB0aGVyZWZvcmVcclxuICAvLyBub3QgYWxsIGZpZWxk0ZUgYXJlIHRha2VuIGludG8gYWNjb3VudC5cclxuICB2YXIgYWxyZWFkeUFkZGVkID0gaWNlVHJhbnNwb3J0LmdldFJlbW90ZUNhbmRpZGF0ZXMoKVxyXG4gICAgICAuZmluZChmdW5jdGlvbihyZW1vdGVDYW5kaWRhdGUpIHtcclxuICAgICAgICByZXR1cm4gY2FuZGlkYXRlLmZvdW5kYXRpb24gPT09IHJlbW90ZUNhbmRpZGF0ZS5mb3VuZGF0aW9uICYmXHJcbiAgICAgICAgICAgIGNhbmRpZGF0ZS5pcCA9PT0gcmVtb3RlQ2FuZGlkYXRlLmlwICYmXHJcbiAgICAgICAgICAgIGNhbmRpZGF0ZS5wb3J0ID09PSByZW1vdGVDYW5kaWRhdGUucG9ydCAmJlxyXG4gICAgICAgICAgICBjYW5kaWRhdGUucHJpb3JpdHkgPT09IHJlbW90ZUNhbmRpZGF0ZS5wcmlvcml0eSAmJlxyXG4gICAgICAgICAgICBjYW5kaWRhdGUucHJvdG9jb2wgPT09IHJlbW90ZUNhbmRpZGF0ZS5wcm90b2NvbCAmJlxyXG4gICAgICAgICAgICBjYW5kaWRhdGUudHlwZSA9PT0gcmVtb3RlQ2FuZGlkYXRlLnR5cGU7XHJcbiAgICAgIH0pO1xyXG4gIGlmICghYWxyZWFkeUFkZGVkKSB7XHJcbiAgICBpY2VUcmFuc3BvcnQuYWRkUmVtb3RlQ2FuZGlkYXRlKGNhbmRpZGF0ZSk7XHJcbiAgfVxyXG4gIHJldHVybiAhYWxyZWFkeUFkZGVkO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gbWFrZUVycm9yKG5hbWUsIGRlc2NyaXB0aW9uKSB7XHJcbiAgdmFyIGUgPSBuZXcgRXJyb3IoZGVzY3JpcHRpb24pO1xyXG4gIGUubmFtZSA9IG5hbWU7XHJcbiAgLy8gbGVnYWN5IGVycm9yIGNvZGVzIGZyb20gaHR0cHM6Ly9oZXljYW0uZ2l0aHViLmlvL3dlYmlkbC8jaWRsLURPTUV4Y2VwdGlvbi1lcnJvci1uYW1lc1xyXG4gIGUuY29kZSA9IHtcclxuICAgIE5vdFN1cHBvcnRlZEVycm9yOiA5LFxyXG4gICAgSW52YWxpZFN0YXRlRXJyb3I6IDExLFxyXG4gICAgSW52YWxpZEFjY2Vzc0Vycm9yOiAxNSxcclxuICAgIFR5cGVFcnJvcjogdW5kZWZpbmVkLFxyXG4gICAgT3BlcmF0aW9uRXJyb3I6IHVuZGVmaW5lZFxyXG4gIH1bbmFtZV07XHJcbiAgcmV0dXJuIGU7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24od2luZG93LCBlZGdlVmVyc2lvbikge1xyXG4gIC8vIGh0dHBzOi8vdzNjLmdpdGh1Yi5pby9tZWRpYWNhcHR1cmUtbWFpbi8jbWVkaWFzdHJlYW1cclxuICAvLyBIZWxwZXIgZnVuY3Rpb24gdG8gYWRkIHRoZSB0cmFjayB0byB0aGUgc3RyZWFtIGFuZFxyXG4gIC8vIGRpc3BhdGNoIHRoZSBldmVudCBvdXJzZWx2ZXMuXHJcbiAgZnVuY3Rpb24gYWRkVHJhY2tUb1N0cmVhbUFuZEZpcmVFdmVudCh0cmFjaywgc3RyZWFtKSB7XHJcbiAgICBzdHJlYW0uYWRkVHJhY2sodHJhY2spO1xyXG4gICAgc3RyZWFtLmRpc3BhdGNoRXZlbnQobmV3IHdpbmRvdy5NZWRpYVN0cmVhbVRyYWNrRXZlbnQoJ2FkZHRyYWNrJyxcclxuICAgICAgICB7dHJhY2s6IHRyYWNrfSkpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVtb3ZlVHJhY2tGcm9tU3RyZWFtQW5kRmlyZUV2ZW50KHRyYWNrLCBzdHJlYW0pIHtcclxuICAgIHN0cmVhbS5yZW1vdmVUcmFjayh0cmFjayk7XHJcbiAgICBzdHJlYW0uZGlzcGF0Y2hFdmVudChuZXcgd2luZG93Lk1lZGlhU3RyZWFtVHJhY2tFdmVudCgncmVtb3ZldHJhY2snLFxyXG4gICAgICAgIHt0cmFjazogdHJhY2t9KSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBmaXJlQWRkVHJhY2socGMsIHRyYWNrLCByZWNlaXZlciwgc3RyZWFtcykge1xyXG4gICAgdmFyIHRyYWNrRXZlbnQgPSBuZXcgRXZlbnQoJ3RyYWNrJyk7XHJcbiAgICB0cmFja0V2ZW50LnRyYWNrID0gdHJhY2s7XHJcbiAgICB0cmFja0V2ZW50LnJlY2VpdmVyID0gcmVjZWl2ZXI7XHJcbiAgICB0cmFja0V2ZW50LnRyYW5zY2VpdmVyID0ge3JlY2VpdmVyOiByZWNlaXZlcn07XHJcbiAgICB0cmFja0V2ZW50LnN0cmVhbXMgPSBzdHJlYW1zO1xyXG4gICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgIHBjLl9kaXNwYXRjaEV2ZW50KCd0cmFjaycsIHRyYWNrRXZlbnQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB2YXIgUlRDUGVlckNvbm5lY3Rpb24gPSBmdW5jdGlvbihjb25maWcpIHtcclxuICAgIHZhciBwYyA9IHRoaXM7XHJcblxyXG4gICAgdmFyIF9ldmVudFRhcmdldCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICAgIFsnYWRkRXZlbnRMaXN0ZW5lcicsICdyZW1vdmVFdmVudExpc3RlbmVyJywgJ2Rpc3BhdGNoRXZlbnQnXVxyXG4gICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xyXG4gICAgICAgICAgcGNbbWV0aG9kXSA9IF9ldmVudFRhcmdldFttZXRob2RdLmJpbmQoX2V2ZW50VGFyZ2V0KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB0aGlzLmNhblRyaWNrbGVJY2VDYW5kaWRhdGVzID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLm5lZWROZWdvdGlhdGlvbiA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMubG9jYWxTdHJlYW1zID0gW107XHJcbiAgICB0aGlzLnJlbW90ZVN0cmVhbXMgPSBbXTtcclxuXHJcbiAgICB0aGlzLmxvY2FsRGVzY3JpcHRpb24gPSBudWxsO1xyXG4gICAgdGhpcy5yZW1vdGVEZXNjcmlwdGlvbiA9IG51bGw7XHJcblxyXG4gICAgdGhpcy5zaWduYWxpbmdTdGF0ZSA9ICdzdGFibGUnO1xyXG4gICAgdGhpcy5pY2VDb25uZWN0aW9uU3RhdGUgPSAnbmV3JztcclxuICAgIHRoaXMuY29ubmVjdGlvblN0YXRlID0gJ25ldyc7XHJcbiAgICB0aGlzLmljZUdhdGhlcmluZ1N0YXRlID0gJ25ldyc7XHJcblxyXG4gICAgY29uZmlnID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShjb25maWcgfHwge30pKTtcclxuXHJcbiAgICB0aGlzLnVzaW5nQnVuZGxlID0gY29uZmlnLmJ1bmRsZVBvbGljeSA9PT0gJ21heC1idW5kbGUnO1xyXG4gICAgaWYgKGNvbmZpZy5ydGNwTXV4UG9saWN5ID09PSAnbmVnb3RpYXRlJykge1xyXG4gICAgICB0aHJvdyhtYWtlRXJyb3IoJ05vdFN1cHBvcnRlZEVycm9yJyxcclxuICAgICAgICAgICdydGNwTXV4UG9saWN5IFxcJ25lZ290aWF0ZVxcJyBpcyBub3Qgc3VwcG9ydGVkJykpO1xyXG4gICAgfSBlbHNlIGlmICghY29uZmlnLnJ0Y3BNdXhQb2xpY3kpIHtcclxuICAgICAgY29uZmlnLnJ0Y3BNdXhQb2xpY3kgPSAncmVxdWlyZSc7XHJcbiAgICB9XHJcblxyXG4gICAgc3dpdGNoIChjb25maWcuaWNlVHJhbnNwb3J0UG9saWN5KSB7XHJcbiAgICAgIGNhc2UgJ2FsbCc6XHJcbiAgICAgIGNhc2UgJ3JlbGF5JzpcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBjb25maWcuaWNlVHJhbnNwb3J0UG9saWN5ID0gJ2FsbCc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgc3dpdGNoIChjb25maWcuYnVuZGxlUG9saWN5KSB7XHJcbiAgICAgIGNhc2UgJ2JhbGFuY2VkJzpcclxuICAgICAgY2FzZSAnbWF4LWNvbXBhdCc6XHJcbiAgICAgIGNhc2UgJ21heC1idW5kbGUnOlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGNvbmZpZy5idW5kbGVQb2xpY3kgPSAnYmFsYW5jZWQnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbmZpZy5pY2VTZXJ2ZXJzID0gZmlsdGVySWNlU2VydmVycyhjb25maWcuaWNlU2VydmVycyB8fCBbXSwgZWRnZVZlcnNpb24pO1xyXG5cclxuICAgIHRoaXMuX2ljZUdhdGhlcmVycyA9IFtdO1xyXG4gICAgaWYgKGNvbmZpZy5pY2VDYW5kaWRhdGVQb29sU2l6ZSkge1xyXG4gICAgICBmb3IgKHZhciBpID0gY29uZmlnLmljZUNhbmRpZGF0ZVBvb2xTaXplOyBpID4gMDsgaS0tKSB7XHJcbiAgICAgICAgdGhpcy5faWNlR2F0aGVyZXJzLnB1c2gobmV3IHdpbmRvdy5SVENJY2VHYXRoZXJlcih7XHJcbiAgICAgICAgICBpY2VTZXJ2ZXJzOiBjb25maWcuaWNlU2VydmVycyxcclxuICAgICAgICAgIGdhdGhlclBvbGljeTogY29uZmlnLmljZVRyYW5zcG9ydFBvbGljeVxyXG4gICAgICAgIH0pKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uZmlnLmljZUNhbmRpZGF0ZVBvb2xTaXplID0gMDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XHJcblxyXG4gICAgLy8gcGVyLXRyYWNrIGljZUdhdGhlcnMsIGljZVRyYW5zcG9ydHMsIGR0bHNUcmFuc3BvcnRzLCBydHBTZW5kZXJzLCAuLi5cclxuICAgIC8vIGV2ZXJ5dGhpbmcgdGhhdCBpcyBuZWVkZWQgdG8gZGVzY3JpYmUgYSBTRFAgbS1saW5lLlxyXG4gICAgdGhpcy50cmFuc2NlaXZlcnMgPSBbXTtcclxuXHJcbiAgICB0aGlzLl9zZHBTZXNzaW9uSWQgPSBTRFBVdGlscy5nZW5lcmF0ZVNlc3Npb25JZCgpO1xyXG4gICAgdGhpcy5fc2RwU2Vzc2lvblZlcnNpb24gPSAwO1xyXG5cclxuICAgIHRoaXMuX2R0bHNSb2xlID0gdW5kZWZpbmVkOyAvLyByb2xlIGZvciBhPXNldHVwIHRvIHVzZSBpbiBhbnN3ZXJzLlxyXG5cclxuICAgIHRoaXMuX2lzQ2xvc2VkID0gZmFsc2U7XHJcbiAgfTtcclxuXHJcbiAgLy8gc2V0IHVwIGV2ZW50IGhhbmRsZXJzIG9uIHByb3RvdHlwZVxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5vbmljZWNhbmRpZGF0ZSA9IG51bGw7XHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9uYWRkc3RyZWFtID0gbnVsbDtcclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub250cmFjayA9IG51bGw7XHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9ucmVtb3Zlc3RyZWFtID0gbnVsbDtcclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub25zaWduYWxpbmdzdGF0ZWNoYW5nZSA9IG51bGw7XHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9uaWNlY29ubmVjdGlvbnN0YXRlY2hhbmdlID0gbnVsbDtcclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub25jb25uZWN0aW9uc3RhdGVjaGFuZ2UgPSBudWxsO1xyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5vbmljZWdhdGhlcmluZ3N0YXRlY2hhbmdlID0gbnVsbDtcclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub25uZWdvdGlhdGlvbm5lZWRlZCA9IG51bGw7XHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9uZGF0YWNoYW5uZWwgPSBudWxsO1xyXG5cclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX2Rpc3BhdGNoRXZlbnQgPSBmdW5jdGlvbihuYW1lLCBldmVudCkge1xyXG4gICAgaWYgKHRoaXMuX2lzQ2xvc2VkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbiAgICBpZiAodHlwZW9mIHRoaXNbJ29uJyArIG5hbWVdID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHRoaXNbJ29uJyArIG5hbWVdKGV2ZW50KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX2VtaXRHYXRoZXJpbmdTdGF0ZUNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdpY2VnYXRoZXJpbmdzdGF0ZWNoYW5nZScpO1xyXG4gICAgdGhpcy5fZGlzcGF0Y2hFdmVudCgnaWNlZ2F0aGVyaW5nc3RhdGVjaGFuZ2UnLCBldmVudCk7XHJcbiAgfTtcclxuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldENvbmZpZ3VyYXRpb24gPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLl9jb25maWc7XHJcbiAgfTtcclxuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldExvY2FsU3RyZWFtcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubG9jYWxTdHJlYW1zO1xyXG4gIH07XHJcblxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRSZW1vdGVTdHJlYW1zID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yZW1vdGVTdHJlYW1zO1xyXG4gIH07XHJcblxyXG4gIC8vIGludGVybmFsIGhlbHBlciB0byBjcmVhdGUgYSB0cmFuc2NlaXZlciBvYmplY3QuXHJcbiAgLy8gKHdoaWNoIGlzIG5vdCB5ZXQgdGhlIHNhbWUgYXMgdGhlIFdlYlJUQyAxLjAgdHJhbnNjZWl2ZXIpXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl9jcmVhdGVUcmFuc2NlaXZlciA9IGZ1bmN0aW9uKGtpbmQsIGRvTm90QWRkKSB7XHJcbiAgICB2YXIgaGFzQnVuZGxlVHJhbnNwb3J0ID0gdGhpcy50cmFuc2NlaXZlcnMubGVuZ3RoID4gMDtcclxuICAgIHZhciB0cmFuc2NlaXZlciA9IHtcclxuICAgICAgdHJhY2s6IG51bGwsXHJcbiAgICAgIGljZUdhdGhlcmVyOiBudWxsLFxyXG4gICAgICBpY2VUcmFuc3BvcnQ6IG51bGwsXHJcbiAgICAgIGR0bHNUcmFuc3BvcnQ6IG51bGwsXHJcbiAgICAgIGxvY2FsQ2FwYWJpbGl0aWVzOiBudWxsLFxyXG4gICAgICByZW1vdGVDYXBhYmlsaXRpZXM6IG51bGwsXHJcbiAgICAgIHJ0cFNlbmRlcjogbnVsbCxcclxuICAgICAgcnRwUmVjZWl2ZXI6IG51bGwsXHJcbiAgICAgIGtpbmQ6IGtpbmQsXHJcbiAgICAgIG1pZDogbnVsbCxcclxuICAgICAgc2VuZEVuY29kaW5nUGFyYW1ldGVyczogbnVsbCxcclxuICAgICAgcmVjdkVuY29kaW5nUGFyYW1ldGVyczogbnVsbCxcclxuICAgICAgc3RyZWFtOiBudWxsLFxyXG4gICAgICBhc3NvY2lhdGVkUmVtb3RlTWVkaWFTdHJlYW1zOiBbXSxcclxuICAgICAgd2FudFJlY2VpdmU6IHRydWVcclxuICAgIH07XHJcbiAgICBpZiAodGhpcy51c2luZ0J1bmRsZSAmJiBoYXNCdW5kbGVUcmFuc3BvcnQpIHtcclxuICAgICAgdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0ID0gdGhpcy50cmFuc2NlaXZlcnNbMF0uaWNlVHJhbnNwb3J0O1xyXG4gICAgICB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0ID0gdGhpcy50cmFuc2NlaXZlcnNbMF0uZHRsc1RyYW5zcG9ydDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciB0cmFuc3BvcnRzID0gdGhpcy5fY3JlYXRlSWNlQW5kRHRsc1RyYW5zcG9ydHMoKTtcclxuICAgICAgdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0ID0gdHJhbnNwb3J0cy5pY2VUcmFuc3BvcnQ7XHJcbiAgICAgIHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQgPSB0cmFuc3BvcnRzLmR0bHNUcmFuc3BvcnQ7XHJcbiAgICB9XHJcbiAgICBpZiAoIWRvTm90QWRkKSB7XHJcbiAgICAgIHRoaXMudHJhbnNjZWl2ZXJzLnB1c2godHJhbnNjZWl2ZXIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRyYW5zY2VpdmVyO1xyXG4gIH07XHJcblxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjayA9IGZ1bmN0aW9uKHRyYWNrLCBzdHJlYW0pIHtcclxuICAgIGlmICh0aGlzLl9pc0Nsb3NlZCkge1xyXG4gICAgICB0aHJvdyBtYWtlRXJyb3IoJ0ludmFsaWRTdGF0ZUVycm9yJyxcclxuICAgICAgICAgICdBdHRlbXB0ZWQgdG8gY2FsbCBhZGRUcmFjayBvbiBhIGNsb3NlZCBwZWVyY29ubmVjdGlvbi4nKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgYWxyZWFkeUV4aXN0cyA9IHRoaXMudHJhbnNjZWl2ZXJzLmZpbmQoZnVuY3Rpb24ocykge1xyXG4gICAgICByZXR1cm4gcy50cmFjayA9PT0gdHJhY2s7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICB0aHJvdyBtYWtlRXJyb3IoJ0ludmFsaWRBY2Nlc3NFcnJvcicsICdUcmFjayBhbHJlYWR5IGV4aXN0cy4nKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgdHJhbnNjZWl2ZXI7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudHJhbnNjZWl2ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmICghdGhpcy50cmFuc2NlaXZlcnNbaV0udHJhY2sgJiZcclxuICAgICAgICAgIHRoaXMudHJhbnNjZWl2ZXJzW2ldLmtpbmQgPT09IHRyYWNrLmtpbmQpIHtcclxuICAgICAgICB0cmFuc2NlaXZlciA9IHRoaXMudHJhbnNjZWl2ZXJzW2ldO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoIXRyYW5zY2VpdmVyKSB7XHJcbiAgICAgIHRyYW5zY2VpdmVyID0gdGhpcy5fY3JlYXRlVHJhbnNjZWl2ZXIodHJhY2sua2luZCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fbWF5YmVGaXJlTmVnb3RpYXRpb25OZWVkZWQoKTtcclxuXHJcbiAgICBpZiAodGhpcy5sb2NhbFN0cmVhbXMuaW5kZXhPZihzdHJlYW0pID09PSAtMSkge1xyXG4gICAgICB0aGlzLmxvY2FsU3RyZWFtcy5wdXNoKHN0cmVhbSk7XHJcbiAgICB9XHJcblxyXG4gICAgdHJhbnNjZWl2ZXIudHJhY2sgPSB0cmFjaztcclxuICAgIHRyYW5zY2VpdmVyLnN0cmVhbSA9IHN0cmVhbTtcclxuICAgIHRyYW5zY2VpdmVyLnJ0cFNlbmRlciA9IG5ldyB3aW5kb3cuUlRDUnRwU2VuZGVyKHRyYWNrLFxyXG4gICAgICAgIHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQpO1xyXG4gICAgcmV0dXJuIHRyYW5zY2VpdmVyLnJ0cFNlbmRlcjtcclxuICB9O1xyXG5cclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgaWYgKGVkZ2VWZXJzaW9uID49IDE1MDI1KSB7XHJcbiAgICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XHJcbiAgICAgICAgcGMuYWRkVHJhY2sodHJhY2ssIHN0cmVhbSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gQ2xvbmUgaXMgbmVjZXNzYXJ5IGZvciBsb2NhbCBkZW1vcyBtb3N0bHksIGF0dGFjaGluZyBkaXJlY3RseVxyXG4gICAgICAvLyB0byB0d28gZGlmZmVyZW50IHNlbmRlcnMgZG9lcyBub3Qgd29yayAoYnVpbGQgMTA1NDcpLlxyXG4gICAgICAvLyBGaXhlZCBpbiAxNTAyNSAob3IgZWFybGllcilcclxuICAgICAgdmFyIGNsb25lZFN0cmVhbSA9IHN0cmVhbS5jbG9uZSgpO1xyXG4gICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaywgaWR4KSB7XHJcbiAgICAgICAgdmFyIGNsb25lZFRyYWNrID0gY2xvbmVkU3RyZWFtLmdldFRyYWNrcygpW2lkeF07XHJcbiAgICAgICAgdHJhY2suYWRkRXZlbnRMaXN0ZW5lcignZW5hYmxlZCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICBjbG9uZWRUcmFjay5lbmFibGVkID0gZXZlbnQuZW5hYmxlZDtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICAgIGNsb25lZFN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XHJcbiAgICAgICAgcGMuYWRkVHJhY2sodHJhY2ssIGNsb25lZFN0cmVhbSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVUcmFjayA9IGZ1bmN0aW9uKHNlbmRlcikge1xyXG4gICAgaWYgKHRoaXMuX2lzQ2xvc2VkKSB7XHJcbiAgICAgIHRocm93IG1ha2VFcnJvcignSW52YWxpZFN0YXRlRXJyb3InLFxyXG4gICAgICAgICAgJ0F0dGVtcHRlZCB0byBjYWxsIHJlbW92ZVRyYWNrIG9uIGEgY2xvc2VkIHBlZXJjb25uZWN0aW9uLicpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghKHNlbmRlciBpbnN0YW5jZW9mIHdpbmRvdy5SVENSdHBTZW5kZXIpKSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IDEgb2YgUlRDUGVlckNvbm5lY3Rpb24ucmVtb3ZlVHJhY2sgJyArXHJcbiAgICAgICAgICAnZG9lcyBub3QgaW1wbGVtZW50IGludGVyZmFjZSBSVENSdHBTZW5kZXIuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHRyYW5zY2VpdmVyID0gdGhpcy50cmFuc2NlaXZlcnMuZmluZChmdW5jdGlvbih0KSB7XHJcbiAgICAgIHJldHVybiB0LnJ0cFNlbmRlciA9PT0gc2VuZGVyO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCF0cmFuc2NlaXZlcikge1xyXG4gICAgICB0aHJvdyBtYWtlRXJyb3IoJ0ludmFsaWRBY2Nlc3NFcnJvcicsXHJcbiAgICAgICAgICAnU2VuZGVyIHdhcyBub3QgY3JlYXRlZCBieSB0aGlzIGNvbm5lY3Rpb24uJyk7XHJcbiAgICB9XHJcbiAgICB2YXIgc3RyZWFtID0gdHJhbnNjZWl2ZXIuc3RyZWFtO1xyXG5cclxuICAgIHRyYW5zY2VpdmVyLnJ0cFNlbmRlci5zdG9wKCk7XHJcbiAgICB0cmFuc2NlaXZlci5ydHBTZW5kZXIgPSBudWxsO1xyXG4gICAgdHJhbnNjZWl2ZXIudHJhY2sgPSBudWxsO1xyXG4gICAgdHJhbnNjZWl2ZXIuc3RyZWFtID0gbnVsbDtcclxuXHJcbiAgICAvLyByZW1vdmUgdGhlIHN0cmVhbSBmcm9tIHRoZSBzZXQgb2YgbG9jYWwgc3RyZWFtc1xyXG4gICAgdmFyIGxvY2FsU3RyZWFtcyA9IHRoaXMudHJhbnNjZWl2ZXJzLm1hcChmdW5jdGlvbih0KSB7XHJcbiAgICAgIHJldHVybiB0LnN0cmVhbTtcclxuICAgIH0pO1xyXG4gICAgaWYgKGxvY2FsU3RyZWFtcy5pbmRleE9mKHN0cmVhbSkgPT09IC0xICYmXHJcbiAgICAgICAgdGhpcy5sb2NhbFN0cmVhbXMuaW5kZXhPZihzdHJlYW0pID4gLTEpIHtcclxuICAgICAgdGhpcy5sb2NhbFN0cmVhbXMuc3BsaWNlKHRoaXMubG9jYWxTdHJlYW1zLmluZGV4T2Yoc3RyZWFtKSwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fbWF5YmVGaXJlTmVnb3RpYXRpb25OZWVkZWQoKTtcclxuICB9O1xyXG5cclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcclxuICAgICAgdmFyIHNlbmRlciA9IHBjLmdldFNlbmRlcnMoKS5maW5kKGZ1bmN0aW9uKHMpIHtcclxuICAgICAgICByZXR1cm4gcy50cmFjayA9PT0gdHJhY2s7XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAoc2VuZGVyKSB7XHJcbiAgICAgICAgcGMucmVtb3ZlVHJhY2soc2VuZGVyKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFNlbmRlcnMgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLnRyYW5zY2VpdmVycy5maWx0ZXIoZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcclxuICAgICAgcmV0dXJuICEhdHJhbnNjZWl2ZXIucnRwU2VuZGVyO1xyXG4gICAgfSlcclxuICAgIC5tYXAoZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcclxuICAgICAgcmV0dXJuIHRyYW5zY2VpdmVyLnJ0cFNlbmRlcjtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRSZWNlaXZlcnMgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLnRyYW5zY2VpdmVycy5maWx0ZXIoZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcclxuICAgICAgcmV0dXJuICEhdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXI7XHJcbiAgICB9KVxyXG4gICAgLm1hcChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xyXG4gICAgICByZXR1cm4gdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXI7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl9jcmVhdGVJY2VHYXRoZXJlciA9IGZ1bmN0aW9uKHNkcE1MaW5lSW5kZXgsXHJcbiAgICAgIHVzaW5nQnVuZGxlKSB7XHJcbiAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgaWYgKHVzaW5nQnVuZGxlICYmIHNkcE1MaW5lSW5kZXggPiAwKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnRyYW5zY2VpdmVyc1swXS5pY2VHYXRoZXJlcjtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5faWNlR2F0aGVyZXJzLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5faWNlR2F0aGVyZXJzLnNoaWZ0KCk7XHJcbiAgICB9XHJcbiAgICB2YXIgaWNlR2F0aGVyZXIgPSBuZXcgd2luZG93LlJUQ0ljZUdhdGhlcmVyKHtcclxuICAgICAgaWNlU2VydmVyczogdGhpcy5fY29uZmlnLmljZVNlcnZlcnMsXHJcbiAgICAgIGdhdGhlclBvbGljeTogdGhpcy5fY29uZmlnLmljZVRyYW5zcG9ydFBvbGljeVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoaWNlR2F0aGVyZXIsICdzdGF0ZScsXHJcbiAgICAgICAge3ZhbHVlOiAnbmV3Jywgd3JpdGFibGU6IHRydWV9XHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmJ1ZmZlcmVkQ2FuZGlkYXRlRXZlbnRzID0gW107XHJcbiAgICB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5idWZmZXJDYW5kaWRhdGVzID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgdmFyIGVuZCA9ICFldmVudC5jYW5kaWRhdGUgfHwgT2JqZWN0LmtleXMoZXZlbnQuY2FuZGlkYXRlKS5sZW5ndGggPT09IDA7XHJcbiAgICAgIC8vIHBvbHlmaWxsIHNpbmNlIFJUQ0ljZUdhdGhlcmVyLnN0YXRlIGlzIG5vdCBpbXBsZW1lbnRlZCBpblxyXG4gICAgICAvLyBFZGdlIDEwNTQ3IHlldC5cclxuICAgICAgaWNlR2F0aGVyZXIuc3RhdGUgPSBlbmQgPyAnY29tcGxldGVkJyA6ICdnYXRoZXJpbmcnO1xyXG4gICAgICBpZiAocGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmJ1ZmZlcmVkQ2FuZGlkYXRlRXZlbnRzICE9PSBudWxsKSB7XHJcbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmJ1ZmZlcmVkQ2FuZGlkYXRlRXZlbnRzLnB1c2goZXZlbnQpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgaWNlR2F0aGVyZXIuYWRkRXZlbnRMaXN0ZW5lcignbG9jYWxjYW5kaWRhdGUnLFxyXG4gICAgICB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5idWZmZXJDYW5kaWRhdGVzKTtcclxuICAgIHJldHVybiBpY2VHYXRoZXJlcjtcclxuICB9O1xyXG5cclxuICAvLyBzdGFydCBnYXRoZXJpbmcgZnJvbSBhbiBSVENJY2VHYXRoZXJlci5cclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX2dhdGhlciA9IGZ1bmN0aW9uKG1pZCwgc2RwTUxpbmVJbmRleCkge1xyXG4gICAgdmFyIHBjID0gdGhpcztcclxuICAgIHZhciBpY2VHYXRoZXJlciA9IHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmljZUdhdGhlcmVyO1xyXG4gICAgaWYgKGljZUdhdGhlcmVyLm9ubG9jYWxjYW5kaWRhdGUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdmFyIGJ1ZmZlcmVkQ2FuZGlkYXRlRXZlbnRzID1cclxuICAgICAgdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uYnVmZmVyZWRDYW5kaWRhdGVFdmVudHM7XHJcbiAgICB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5idWZmZXJlZENhbmRpZGF0ZUV2ZW50cyA9IG51bGw7XHJcbiAgICBpY2VHYXRoZXJlci5yZW1vdmVFdmVudExpc3RlbmVyKCdsb2NhbGNhbmRpZGF0ZScsXHJcbiAgICAgIHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmJ1ZmZlckNhbmRpZGF0ZXMpO1xyXG4gICAgaWNlR2F0aGVyZXIub25sb2NhbGNhbmRpZGF0ZSA9IGZ1bmN0aW9uKGV2dCkge1xyXG4gICAgICBpZiAocGMudXNpbmdCdW5kbGUgJiYgc2RwTUxpbmVJbmRleCA+IDApIHtcclxuICAgICAgICAvLyBpZiB3ZSBrbm93IHRoYXQgd2UgdXNlIGJ1bmRsZSB3ZSBjYW4gZHJvcCBjYW5kaWRhdGVzIHdpdGhcclxuICAgICAgICAvLyDRlWRwTUxpbmVJbmRleCA+IDAuIElmIHdlIGRvbid0IGRvIHRoaXMgdGhlbiBvdXIgc3RhdGUgZ2V0c1xyXG4gICAgICAgIC8vIGNvbmZ1c2VkIHNpbmNlIHdlIGRpc3Bvc2UgdGhlIGV4dHJhIGljZSBnYXRoZXJlci5cclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdpY2VjYW5kaWRhdGUnKTtcclxuICAgICAgZXZlbnQuY2FuZGlkYXRlID0ge3NkcE1pZDogbWlkLCBzZHBNTGluZUluZGV4OiBzZHBNTGluZUluZGV4fTtcclxuXHJcbiAgICAgIHZhciBjYW5kID0gZXZ0LmNhbmRpZGF0ZTtcclxuICAgICAgLy8gRWRnZSBlbWl0cyBhbiBlbXB0eSBvYmplY3QgZm9yIFJUQ0ljZUNhbmRpZGF0ZUNvbXBsZXRl4oClXHJcbiAgICAgIHZhciBlbmQgPSAhY2FuZCB8fCBPYmplY3Qua2V5cyhjYW5kKS5sZW5ndGggPT09IDA7XHJcbiAgICAgIGlmIChlbmQpIHtcclxuICAgICAgICAvLyBwb2x5ZmlsbCBzaW5jZSBSVENJY2VHYXRoZXJlci5zdGF0ZSBpcyBub3QgaW1wbGVtZW50ZWQgaW5cclxuICAgICAgICAvLyBFZGdlIDEwNTQ3IHlldC5cclxuICAgICAgICBpZiAoaWNlR2F0aGVyZXIuc3RhdGUgPT09ICduZXcnIHx8IGljZUdhdGhlcmVyLnN0YXRlID09PSAnZ2F0aGVyaW5nJykge1xyXG4gICAgICAgICAgaWNlR2F0aGVyZXIuc3RhdGUgPSAnY29tcGxldGVkJztcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGljZUdhdGhlcmVyLnN0YXRlID09PSAnbmV3Jykge1xyXG4gICAgICAgICAgaWNlR2F0aGVyZXIuc3RhdGUgPSAnZ2F0aGVyaW5nJztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUlRDSWNlQ2FuZGlkYXRlIGRvZXNuJ3QgaGF2ZSBhIGNvbXBvbmVudCwgbmVlZHMgdG8gYmUgYWRkZWRcclxuICAgICAgICBjYW5kLmNvbXBvbmVudCA9IDE7XHJcbiAgICAgICAgLy8gYWxzbyB0aGUgdXNlcm5hbWVGcmFnbWVudC4gVE9ETzogdXBkYXRlIFNEUCB0byB0YWtlIGJvdGggdmFyaWFudHMuXHJcbiAgICAgICAgY2FuZC51ZnJhZyA9IGljZUdhdGhlcmVyLmdldExvY2FsUGFyYW1ldGVycygpLnVzZXJuYW1lRnJhZ21lbnQ7XHJcblxyXG4gICAgICAgIHZhciBzZXJpYWxpemVkQ2FuZGlkYXRlID0gU0RQVXRpbHMud3JpdGVDYW5kaWRhdGUoY2FuZCk7XHJcbiAgICAgICAgZXZlbnQuY2FuZGlkYXRlID0gT2JqZWN0LmFzc2lnbihldmVudC5jYW5kaWRhdGUsXHJcbiAgICAgICAgICAgIFNEUFV0aWxzLnBhcnNlQ2FuZGlkYXRlKHNlcmlhbGl6ZWRDYW5kaWRhdGUpKTtcclxuXHJcbiAgICAgICAgZXZlbnQuY2FuZGlkYXRlLmNhbmRpZGF0ZSA9IHNlcmlhbGl6ZWRDYW5kaWRhdGU7XHJcbiAgICAgICAgZXZlbnQuY2FuZGlkYXRlLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY2FuZGlkYXRlOiBldmVudC5jYW5kaWRhdGUuY2FuZGlkYXRlLFxyXG4gICAgICAgICAgICBzZHBNaWQ6IGV2ZW50LmNhbmRpZGF0ZS5zZHBNaWQsXHJcbiAgICAgICAgICAgIHNkcE1MaW5lSW5kZXg6IGV2ZW50LmNhbmRpZGF0ZS5zZHBNTGluZUluZGV4LFxyXG4gICAgICAgICAgICB1c2VybmFtZUZyYWdtZW50OiBldmVudC5jYW5kaWRhdGUudXNlcm5hbWVGcmFnbWVudFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyB1cGRhdGUgbG9jYWwgZGVzY3JpcHRpb24uXHJcbiAgICAgIHZhciBzZWN0aW9ucyA9IFNEUFV0aWxzLmdldE1lZGlhU2VjdGlvbnMocGMubG9jYWxEZXNjcmlwdGlvbi5zZHApO1xyXG4gICAgICBpZiAoIWVuZCkge1xyXG4gICAgICAgIHNlY3Rpb25zW2V2ZW50LmNhbmRpZGF0ZS5zZHBNTGluZUluZGV4XSArPVxyXG4gICAgICAgICAgICAnYT0nICsgZXZlbnQuY2FuZGlkYXRlLmNhbmRpZGF0ZSArICdcXHJcXG4nO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNlY3Rpb25zW2V2ZW50LmNhbmRpZGF0ZS5zZHBNTGluZUluZGV4XSArPVxyXG4gICAgICAgICAgICAnYT1lbmQtb2YtY2FuZGlkYXRlc1xcclxcbic7XHJcbiAgICAgIH1cclxuICAgICAgcGMubG9jYWxEZXNjcmlwdGlvbi5zZHAgPVxyXG4gICAgICAgICAgU0RQVXRpbHMuZ2V0RGVzY3JpcHRpb24ocGMubG9jYWxEZXNjcmlwdGlvbi5zZHApICtcclxuICAgICAgICAgIHNlY3Rpb25zLmpvaW4oJycpO1xyXG4gICAgICB2YXIgY29tcGxldGUgPSBwYy50cmFuc2NlaXZlcnMuZXZlcnkoZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcclxuICAgICAgICByZXR1cm4gdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIgJiZcclxuICAgICAgICAgICAgdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIuc3RhdGUgPT09ICdjb21wbGV0ZWQnO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChwYy5pY2VHYXRoZXJpbmdTdGF0ZSAhPT0gJ2dhdGhlcmluZycpIHtcclxuICAgICAgICBwYy5pY2VHYXRoZXJpbmdTdGF0ZSA9ICdnYXRoZXJpbmcnO1xyXG4gICAgICAgIHBjLl9lbWl0R2F0aGVyaW5nU3RhdGVDaGFuZ2UoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gRW1pdCBjYW5kaWRhdGUuIEFsc28gZW1pdCBudWxsIGNhbmRpZGF0ZSB3aGVuIGFsbCBnYXRoZXJlcnMgYXJlXHJcbiAgICAgIC8vIGNvbXBsZXRlLlxyXG4gICAgICBpZiAoIWVuZCkge1xyXG4gICAgICAgIHBjLl9kaXNwYXRjaEV2ZW50KCdpY2VjYW5kaWRhdGUnLCBldmVudCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNvbXBsZXRlKSB7XHJcbiAgICAgICAgcGMuX2Rpc3BhdGNoRXZlbnQoJ2ljZWNhbmRpZGF0ZScsIG5ldyBFdmVudCgnaWNlY2FuZGlkYXRlJykpO1xyXG4gICAgICAgIHBjLmljZUdhdGhlcmluZ1N0YXRlID0gJ2NvbXBsZXRlJztcclxuICAgICAgICBwYy5fZW1pdEdhdGhlcmluZ1N0YXRlQ2hhbmdlKCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy8gZW1pdCBhbHJlYWR5IGdhdGhlcmVkIGNhbmRpZGF0ZXMuXHJcbiAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgYnVmZmVyZWRDYW5kaWRhdGVFdmVudHMuZm9yRWFjaChmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWNlR2F0aGVyZXIub25sb2NhbGNhbmRpZGF0ZShlKTtcclxuICAgICAgfSk7XHJcbiAgICB9LCAwKTtcclxuICB9O1xyXG5cclxuICAvLyBDcmVhdGUgSUNFIHRyYW5zcG9ydCBhbmQgRFRMUyB0cmFuc3BvcnQuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl9jcmVhdGVJY2VBbmREdGxzVHJhbnNwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHBjID0gdGhpcztcclxuICAgIHZhciBpY2VUcmFuc3BvcnQgPSBuZXcgd2luZG93LlJUQ0ljZVRyYW5zcG9ydChudWxsKTtcclxuICAgIGljZVRyYW5zcG9ydC5vbmljZXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHBjLl91cGRhdGVJY2VDb25uZWN0aW9uU3RhdGUoKTtcclxuICAgICAgcGMuX3VwZGF0ZUNvbm5lY3Rpb25TdGF0ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgZHRsc1RyYW5zcG9ydCA9IG5ldyB3aW5kb3cuUlRDRHRsc1RyYW5zcG9ydChpY2VUcmFuc3BvcnQpO1xyXG4gICAgZHRsc1RyYW5zcG9ydC5vbmR0bHNzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBwYy5fdXBkYXRlQ29ubmVjdGlvblN0YXRlKCk7XHJcbiAgICB9O1xyXG4gICAgZHRsc1RyYW5zcG9ydC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIC8vIG9uZXJyb3IgZG9lcyBub3Qgc2V0IHN0YXRlIHRvIGZhaWxlZCBieSBpdHNlbGYuXHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkdGxzVHJhbnNwb3J0LCAnc3RhdGUnLFxyXG4gICAgICAgICAge3ZhbHVlOiAnZmFpbGVkJywgd3JpdGFibGU6IHRydWV9KTtcclxuICAgICAgcGMuX3VwZGF0ZUNvbm5lY3Rpb25TdGF0ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBpY2VUcmFuc3BvcnQ6IGljZVRyYW5zcG9ydCxcclxuICAgICAgZHRsc1RyYW5zcG9ydDogZHRsc1RyYW5zcG9ydFxyXG4gICAgfTtcclxuICB9O1xyXG5cclxuICAvLyBEZXN0cm95IElDRSBnYXRoZXJlciwgSUNFIHRyYW5zcG9ydCBhbmQgRFRMUyB0cmFuc3BvcnQuXHJcbiAgLy8gV2l0aG91dCB0cmlnZ2VyaW5nIHRoZSBjYWxsYmFja3MuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl9kaXNwb3NlSWNlQW5kRHRsc1RyYW5zcG9ydHMgPSBmdW5jdGlvbihcclxuICAgICAgc2RwTUxpbmVJbmRleCkge1xyXG4gICAgdmFyIGljZUdhdGhlcmVyID0gdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uaWNlR2F0aGVyZXI7XHJcbiAgICBpZiAoaWNlR2F0aGVyZXIpIHtcclxuICAgICAgZGVsZXRlIGljZUdhdGhlcmVyLm9ubG9jYWxjYW5kaWRhdGU7XHJcbiAgICAgIGRlbGV0ZSB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5pY2VHYXRoZXJlcjtcclxuICAgIH1cclxuICAgIHZhciBpY2VUcmFuc3BvcnQgPSB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5pY2VUcmFuc3BvcnQ7XHJcbiAgICBpZiAoaWNlVHJhbnNwb3J0KSB7XHJcbiAgICAgIGRlbGV0ZSBpY2VUcmFuc3BvcnQub25pY2VzdGF0ZWNoYW5nZTtcclxuICAgICAgZGVsZXRlIHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmljZVRyYW5zcG9ydDtcclxuICAgIH1cclxuICAgIHZhciBkdGxzVHJhbnNwb3J0ID0gdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uZHRsc1RyYW5zcG9ydDtcclxuICAgIGlmIChkdGxzVHJhbnNwb3J0KSB7XHJcbiAgICAgIGRlbGV0ZSBkdGxzVHJhbnNwb3J0Lm9uZHRsc3N0YXRlY2hhbmdlO1xyXG4gICAgICBkZWxldGUgZHRsc1RyYW5zcG9ydC5vbmVycm9yO1xyXG4gICAgICBkZWxldGUgdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uZHRsc1RyYW5zcG9ydDtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvLyBTdGFydCB0aGUgUlRQIFNlbmRlciBhbmQgUmVjZWl2ZXIgZm9yIGEgdHJhbnNjZWl2ZXIuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl90cmFuc2NlaXZlID0gZnVuY3Rpb24odHJhbnNjZWl2ZXIsXHJcbiAgICAgIHNlbmQsIHJlY3YpIHtcclxuICAgIHZhciBwYXJhbXMgPSBnZXRDb21tb25DYXBhYmlsaXRpZXModHJhbnNjZWl2ZXIubG9jYWxDYXBhYmlsaXRpZXMsXHJcbiAgICAgICAgdHJhbnNjZWl2ZXIucmVtb3RlQ2FwYWJpbGl0aWVzKTtcclxuICAgIGlmIChzZW5kICYmIHRyYW5zY2VpdmVyLnJ0cFNlbmRlcikge1xyXG4gICAgICBwYXJhbXMuZW5jb2RpbmdzID0gdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVycztcclxuICAgICAgcGFyYW1zLnJ0Y3AgPSB7XHJcbiAgICAgICAgY25hbWU6IFNEUFV0aWxzLmxvY2FsQ05hbWUsXHJcbiAgICAgICAgY29tcG91bmQ6IHRyYW5zY2VpdmVyLnJ0Y3BQYXJhbWV0ZXJzLmNvbXBvdW5kXHJcbiAgICAgIH07XHJcbiAgICAgIGlmICh0cmFuc2NlaXZlci5yZWN2RW5jb2RpbmdQYXJhbWV0ZXJzLmxlbmd0aCkge1xyXG4gICAgICAgIHBhcmFtcy5ydGNwLnNzcmMgPSB0cmFuc2NlaXZlci5yZWN2RW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmM7XHJcbiAgICAgIH1cclxuICAgICAgdHJhbnNjZWl2ZXIucnRwU2VuZGVyLnNlbmQocGFyYW1zKTtcclxuICAgIH1cclxuICAgIGlmIChyZWN2ICYmIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyICYmIHBhcmFtcy5jb2RlY3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAvLyByZW1vdmUgUlRYIGZpZWxkIGluIEVkZ2UgMTQ5NDJcclxuICAgICAgaWYgKHRyYW5zY2VpdmVyLmtpbmQgPT09ICd2aWRlbydcclxuICAgICAgICAgICYmIHRyYW5zY2VpdmVyLnJlY3ZFbmNvZGluZ1BhcmFtZXRlcnNcclxuICAgICAgICAgICYmIGVkZ2VWZXJzaW9uIDwgMTUwMTkpIHtcclxuICAgICAgICB0cmFuc2NlaXZlci5yZWN2RW5jb2RpbmdQYXJhbWV0ZXJzLmZvckVhY2goZnVuY3Rpb24ocCkge1xyXG4gICAgICAgICAgZGVsZXRlIHAucnR4O1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0cmFuc2NlaXZlci5yZWN2RW5jb2RpbmdQYXJhbWV0ZXJzLmxlbmd0aCkge1xyXG4gICAgICAgIHBhcmFtcy5lbmNvZGluZ3MgPSB0cmFuc2NlaXZlci5yZWN2RW5jb2RpbmdQYXJhbWV0ZXJzO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHBhcmFtcy5lbmNvZGluZ3MgPSBbe31dO1xyXG4gICAgICB9XHJcbiAgICAgIHBhcmFtcy5ydGNwID0ge1xyXG4gICAgICAgIGNvbXBvdW5kOiB0cmFuc2NlaXZlci5ydGNwUGFyYW1ldGVycy5jb21wb3VuZFxyXG4gICAgICB9O1xyXG4gICAgICBpZiAodHJhbnNjZWl2ZXIucnRjcFBhcmFtZXRlcnMuY25hbWUpIHtcclxuICAgICAgICBwYXJhbXMucnRjcC5jbmFtZSA9IHRyYW5zY2VpdmVyLnJ0Y3BQYXJhbWV0ZXJzLmNuYW1lO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzLmxlbmd0aCkge1xyXG4gICAgICAgIHBhcmFtcy5ydGNwLnNzcmMgPSB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmM7XHJcbiAgICAgIH1cclxuICAgICAgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIucmVjZWl2ZShwYXJhbXMpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5zZXRMb2NhbERlc2NyaXB0aW9uID0gZnVuY3Rpb24oZGVzY3JpcHRpb24pIHtcclxuICAgIHZhciBwYyA9IHRoaXM7XHJcblxyXG4gICAgLy8gTm90ZTogcHJhbnN3ZXIgaXMgbm90IHN1cHBvcnRlZC5cclxuICAgIGlmIChbJ29mZmVyJywgJ2Fuc3dlciddLmluZGV4T2YoZGVzY3JpcHRpb24udHlwZSkgPT09IC0xKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChtYWtlRXJyb3IoJ1R5cGVFcnJvcicsXHJcbiAgICAgICAgICAnVW5zdXBwb3J0ZWQgdHlwZSBcIicgKyBkZXNjcmlwdGlvbi50eXBlICsgJ1wiJykpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghaXNBY3Rpb25BbGxvd2VkSW5TaWduYWxpbmdTdGF0ZSgnc2V0TG9jYWxEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgZGVzY3JpcHRpb24udHlwZSwgcGMuc2lnbmFsaW5nU3RhdGUpIHx8IHBjLl9pc0Nsb3NlZCkge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobWFrZUVycm9yKCdJbnZhbGlkU3RhdGVFcnJvcicsXHJcbiAgICAgICAgICAnQ2FuIG5vdCBzZXQgbG9jYWwgJyArIGRlc2NyaXB0aW9uLnR5cGUgK1xyXG4gICAgICAgICAgJyBpbiBzdGF0ZSAnICsgcGMuc2lnbmFsaW5nU3RhdGUpKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgc2VjdGlvbnM7XHJcbiAgICB2YXIgc2Vzc2lvbnBhcnQ7XHJcbiAgICBpZiAoZGVzY3JpcHRpb24udHlwZSA9PT0gJ29mZmVyJykge1xyXG4gICAgICAvLyBWRVJZIGxpbWl0ZWQgc3VwcG9ydCBmb3IgU0RQIG11bmdpbmcuIExpbWl0ZWQgdG86XHJcbiAgICAgIC8vICogY2hhbmdpbmcgdGhlIG9yZGVyIG9mIGNvZGVjc1xyXG4gICAgICBzZWN0aW9ucyA9IFNEUFV0aWxzLnNwbGl0U2VjdGlvbnMoZGVzY3JpcHRpb24uc2RwKTtcclxuICAgICAgc2Vzc2lvbnBhcnQgPSBzZWN0aW9ucy5zaGlmdCgpO1xyXG4gICAgICBzZWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKG1lZGlhU2VjdGlvbiwgc2RwTUxpbmVJbmRleCkge1xyXG4gICAgICAgIHZhciBjYXBzID0gU0RQVXRpbHMucGFyc2VSdHBQYXJhbWV0ZXJzKG1lZGlhU2VjdGlvbik7XHJcbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmxvY2FsQ2FwYWJpbGl0aWVzID0gY2FwcztcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBwYy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlciwgc2RwTUxpbmVJbmRleCkge1xyXG4gICAgICAgIHBjLl9nYXRoZXIodHJhbnNjZWl2ZXIubWlkLCBzZHBNTGluZUluZGV4KTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2UgaWYgKGRlc2NyaXB0aW9uLnR5cGUgPT09ICdhbnN3ZXInKSB7XHJcbiAgICAgIHNlY3Rpb25zID0gU0RQVXRpbHMuc3BsaXRTZWN0aW9ucyhwYy5yZW1vdGVEZXNjcmlwdGlvbi5zZHApO1xyXG4gICAgICBzZXNzaW9ucGFydCA9IHNlY3Rpb25zLnNoaWZ0KCk7XHJcbiAgICAgIHZhciBpc0ljZUxpdGUgPSBTRFBVdGlscy5tYXRjaFByZWZpeChzZXNzaW9ucGFydCxcclxuICAgICAgICAgICdhPWljZS1saXRlJykubGVuZ3RoID4gMDtcclxuICAgICAgc2VjdGlvbnMuZm9yRWFjaChmdW5jdGlvbihtZWRpYVNlY3Rpb24sIHNkcE1MaW5lSW5kZXgpIHtcclxuICAgICAgICB2YXIgdHJhbnNjZWl2ZXIgPSBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF07XHJcbiAgICAgICAgdmFyIGljZUdhdGhlcmVyID0gdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXI7XHJcbiAgICAgICAgdmFyIGljZVRyYW5zcG9ydCA9IHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydDtcclxuICAgICAgICB2YXIgZHRsc1RyYW5zcG9ydCA9IHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQ7XHJcbiAgICAgICAgdmFyIGxvY2FsQ2FwYWJpbGl0aWVzID0gdHJhbnNjZWl2ZXIubG9jYWxDYXBhYmlsaXRpZXM7XHJcbiAgICAgICAgdmFyIHJlbW90ZUNhcGFiaWxpdGllcyA9IHRyYW5zY2VpdmVyLnJlbW90ZUNhcGFiaWxpdGllcztcclxuXHJcbiAgICAgICAgLy8gdHJlYXQgYnVuZGxlLW9ubHkgYXMgbm90LXJlamVjdGVkLlxyXG4gICAgICAgIHZhciByZWplY3RlZCA9IFNEUFV0aWxzLmlzUmVqZWN0ZWQobWVkaWFTZWN0aW9uKSAmJlxyXG4gICAgICAgICAgICBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPWJ1bmRsZS1vbmx5JykubGVuZ3RoID09PSAwO1xyXG5cclxuICAgICAgICBpZiAoIXJlamVjdGVkICYmICF0cmFuc2NlaXZlci5yZWplY3RlZCkge1xyXG4gICAgICAgICAgdmFyIHJlbW90ZUljZVBhcmFtZXRlcnMgPSBTRFBVdGlscy5nZXRJY2VQYXJhbWV0ZXJzKFxyXG4gICAgICAgICAgICAgIG1lZGlhU2VjdGlvbiwgc2Vzc2lvbnBhcnQpO1xyXG4gICAgICAgICAgdmFyIHJlbW90ZUR0bHNQYXJhbWV0ZXJzID0gU0RQVXRpbHMuZ2V0RHRsc1BhcmFtZXRlcnMoXHJcbiAgICAgICAgICAgICAgbWVkaWFTZWN0aW9uLCBzZXNzaW9ucGFydCk7XHJcbiAgICAgICAgICBpZiAoaXNJY2VMaXRlKSB7XHJcbiAgICAgICAgICAgIHJlbW90ZUR0bHNQYXJhbWV0ZXJzLnJvbGUgPSAnc2VydmVyJztcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoIXBjLnVzaW5nQnVuZGxlIHx8IHNkcE1MaW5lSW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgcGMuX2dhdGhlcih0cmFuc2NlaXZlci5taWQsIHNkcE1MaW5lSW5kZXgpO1xyXG4gICAgICAgICAgICBpZiAoaWNlVHJhbnNwb3J0LnN0YXRlID09PSAnbmV3Jykge1xyXG4gICAgICAgICAgICAgIGljZVRyYW5zcG9ydC5zdGFydChpY2VHYXRoZXJlciwgcmVtb3RlSWNlUGFyYW1ldGVycyxcclxuICAgICAgICAgICAgICAgICAgaXNJY2VMaXRlID8gJ2NvbnRyb2xsaW5nJyA6ICdjb250cm9sbGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGR0bHNUcmFuc3BvcnQuc3RhdGUgPT09ICduZXcnKSB7XHJcbiAgICAgICAgICAgICAgZHRsc1RyYW5zcG9ydC5zdGFydChyZW1vdGVEdGxzUGFyYW1ldGVycyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBDYWxjdWxhdGUgaW50ZXJzZWN0aW9uIG9mIGNhcGFiaWxpdGllcy5cclxuICAgICAgICAgIHZhciBwYXJhbXMgPSBnZXRDb21tb25DYXBhYmlsaXRpZXMobG9jYWxDYXBhYmlsaXRpZXMsXHJcbiAgICAgICAgICAgICAgcmVtb3RlQ2FwYWJpbGl0aWVzKTtcclxuXHJcbiAgICAgICAgICAvLyBTdGFydCB0aGUgUlRDUnRwU2VuZGVyLiBUaGUgUlRDUnRwUmVjZWl2ZXIgZm9yIHRoaXNcclxuICAgICAgICAgIC8vIHRyYW5zY2VpdmVyIGhhcyBhbHJlYWR5IGJlZW4gc3RhcnRlZCBpbiBzZXRSZW1vdGVEZXNjcmlwdGlvbi5cclxuICAgICAgICAgIHBjLl90cmFuc2NlaXZlKHRyYW5zY2VpdmVyLFxyXG4gICAgICAgICAgICAgIHBhcmFtcy5jb2RlY3MubGVuZ3RoID4gMCxcclxuICAgICAgICAgICAgICBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwYy5sb2NhbERlc2NyaXB0aW9uID0ge1xyXG4gICAgICB0eXBlOiBkZXNjcmlwdGlvbi50eXBlLFxyXG4gICAgICBzZHA6IGRlc2NyaXB0aW9uLnNkcFxyXG4gICAgfTtcclxuICAgIGlmIChkZXNjcmlwdGlvbi50eXBlID09PSAnb2ZmZXInKSB7XHJcbiAgICAgIHBjLl91cGRhdGVTaWduYWxpbmdTdGF0ZSgnaGF2ZS1sb2NhbC1vZmZlcicpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcGMuX3VwZGF0ZVNpZ25hbGluZ1N0YXRlKCdzdGFibGUnKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgfTtcclxuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnNldFJlbW90ZURlc2NyaXB0aW9uID0gZnVuY3Rpb24oZGVzY3JpcHRpb24pIHtcclxuICAgIHZhciBwYyA9IHRoaXM7XHJcblxyXG4gICAgLy8gTm90ZTogcHJhbnN3ZXIgaXMgbm90IHN1cHBvcnRlZC5cclxuICAgIGlmIChbJ29mZmVyJywgJ2Fuc3dlciddLmluZGV4T2YoZGVzY3JpcHRpb24udHlwZSkgPT09IC0xKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChtYWtlRXJyb3IoJ1R5cGVFcnJvcicsXHJcbiAgICAgICAgICAnVW5zdXBwb3J0ZWQgdHlwZSBcIicgKyBkZXNjcmlwdGlvbi50eXBlICsgJ1wiJykpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghaXNBY3Rpb25BbGxvd2VkSW5TaWduYWxpbmdTdGF0ZSgnc2V0UmVtb3RlRGVzY3JpcHRpb24nLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uLnR5cGUsIHBjLnNpZ25hbGluZ1N0YXRlKSB8fCBwYy5faXNDbG9zZWQpIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG1ha2VFcnJvcignSW52YWxpZFN0YXRlRXJyb3InLFxyXG4gICAgICAgICAgJ0NhbiBub3Qgc2V0IHJlbW90ZSAnICsgZGVzY3JpcHRpb24udHlwZSArXHJcbiAgICAgICAgICAnIGluIHN0YXRlICcgKyBwYy5zaWduYWxpbmdTdGF0ZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBzdHJlYW1zID0ge307XHJcbiAgICBwYy5yZW1vdGVTdHJlYW1zLmZvckVhY2goZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICAgIHN0cmVhbXNbc3RyZWFtLmlkXSA9IHN0cmVhbTtcclxuICAgIH0pO1xyXG4gICAgdmFyIHJlY2VpdmVyTGlzdCA9IFtdO1xyXG4gICAgdmFyIHNlY3Rpb25zID0gU0RQVXRpbHMuc3BsaXRTZWN0aW9ucyhkZXNjcmlwdGlvbi5zZHApO1xyXG4gICAgdmFyIHNlc3Npb25wYXJ0ID0gc2VjdGlvbnMuc2hpZnQoKTtcclxuICAgIHZhciBpc0ljZUxpdGUgPSBTRFBVdGlscy5tYXRjaFByZWZpeChzZXNzaW9ucGFydCxcclxuICAgICAgICAnYT1pY2UtbGl0ZScpLmxlbmd0aCA+IDA7XHJcbiAgICB2YXIgdXNpbmdCdW5kbGUgPSBTRFBVdGlscy5tYXRjaFByZWZpeChzZXNzaW9ucGFydCxcclxuICAgICAgICAnYT1ncm91cDpCVU5ETEUgJykubGVuZ3RoID4gMDtcclxuICAgIHBjLnVzaW5nQnVuZGxlID0gdXNpbmdCdW5kbGU7XHJcbiAgICB2YXIgaWNlT3B0aW9ucyA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KHNlc3Npb25wYXJ0LFxyXG4gICAgICAgICdhPWljZS1vcHRpb25zOicpWzBdO1xyXG4gICAgaWYgKGljZU9wdGlvbnMpIHtcclxuICAgICAgcGMuY2FuVHJpY2tsZUljZUNhbmRpZGF0ZXMgPSBpY2VPcHRpb25zLnN1YnN0cigxNCkuc3BsaXQoJyAnKVxyXG4gICAgICAgICAgLmluZGV4T2YoJ3RyaWNrbGUnKSA+PSAwO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcGMuY2FuVHJpY2tsZUljZUNhbmRpZGF0ZXMgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBzZWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKG1lZGlhU2VjdGlvbiwgc2RwTUxpbmVJbmRleCkge1xyXG4gICAgICB2YXIgbGluZXMgPSBTRFBVdGlscy5zcGxpdExpbmVzKG1lZGlhU2VjdGlvbik7XHJcbiAgICAgIHZhciBraW5kID0gU0RQVXRpbHMuZ2V0S2luZChtZWRpYVNlY3Rpb24pO1xyXG4gICAgICAvLyB0cmVhdCBidW5kbGUtb25seSBhcyBub3QtcmVqZWN0ZWQuXHJcbiAgICAgIHZhciByZWplY3RlZCA9IFNEUFV0aWxzLmlzUmVqZWN0ZWQobWVkaWFTZWN0aW9uKSAmJlxyXG4gICAgICAgICAgU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1idW5kbGUtb25seScpLmxlbmd0aCA9PT0gMDtcclxuICAgICAgdmFyIHByb3RvY29sID0gbGluZXNbMF0uc3Vic3RyKDIpLnNwbGl0KCcgJylbMl07XHJcblxyXG4gICAgICB2YXIgZGlyZWN0aW9uID0gU0RQVXRpbHMuZ2V0RGlyZWN0aW9uKG1lZGlhU2VjdGlvbiwgc2Vzc2lvbnBhcnQpO1xyXG4gICAgICB2YXIgcmVtb3RlTXNpZCA9IFNEUFV0aWxzLnBhcnNlTXNpZChtZWRpYVNlY3Rpb24pO1xyXG5cclxuICAgICAgdmFyIG1pZCA9IFNEUFV0aWxzLmdldE1pZChtZWRpYVNlY3Rpb24pIHx8IFNEUFV0aWxzLmdlbmVyYXRlSWRlbnRpZmllcigpO1xyXG5cclxuICAgICAgLy8gUmVqZWN0IGRhdGFjaGFubmVscyB3aGljaCBhcmUgbm90IGltcGxlbWVudGVkIHlldC5cclxuICAgICAgaWYgKChraW5kID09PSAnYXBwbGljYXRpb24nICYmIHByb3RvY29sID09PSAnRFRMUy9TQ1RQJykgfHwgcmVqZWN0ZWQpIHtcclxuICAgICAgICAvLyBUT0RPOiB0aGlzIGlzIGRhbmdlcm91cyBpbiB0aGUgY2FzZSB3aGVyZSBhIG5vbi1yZWplY3RlZCBtLWxpbmVcclxuICAgICAgICAvLyAgICAgYmVjb21lcyByZWplY3RlZC5cclxuICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0gPSB7XHJcbiAgICAgICAgICBtaWQ6IG1pZCxcclxuICAgICAgICAgIGtpbmQ6IGtpbmQsXHJcbiAgICAgICAgICByZWplY3RlZDogdHJ1ZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIXJlamVjdGVkICYmIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XSAmJlxyXG4gICAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLnJlamVjdGVkKSB7XHJcbiAgICAgICAgLy8gcmVjeWNsZSBhIHJlamVjdGVkIHRyYW5zY2VpdmVyLlxyXG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XSA9IHBjLl9jcmVhdGVUcmFuc2NlaXZlcihraW5kLCB0cnVlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIHRyYW5zY2VpdmVyO1xyXG4gICAgICB2YXIgaWNlR2F0aGVyZXI7XHJcbiAgICAgIHZhciBpY2VUcmFuc3BvcnQ7XHJcbiAgICAgIHZhciBkdGxzVHJhbnNwb3J0O1xyXG4gICAgICB2YXIgcnRwUmVjZWl2ZXI7XHJcbiAgICAgIHZhciBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzO1xyXG4gICAgICB2YXIgcmVjdkVuY29kaW5nUGFyYW1ldGVycztcclxuICAgICAgdmFyIGxvY2FsQ2FwYWJpbGl0aWVzO1xyXG5cclxuICAgICAgdmFyIHRyYWNrO1xyXG4gICAgICAvLyBGSVhNRTogZW5zdXJlIHRoZSBtZWRpYVNlY3Rpb24gaGFzIHJ0Y3AtbXV4IHNldC5cclxuICAgICAgdmFyIHJlbW90ZUNhcGFiaWxpdGllcyA9IFNEUFV0aWxzLnBhcnNlUnRwUGFyYW1ldGVycyhtZWRpYVNlY3Rpb24pO1xyXG4gICAgICB2YXIgcmVtb3RlSWNlUGFyYW1ldGVycztcclxuICAgICAgdmFyIHJlbW90ZUR0bHNQYXJhbWV0ZXJzO1xyXG4gICAgICBpZiAoIXJlamVjdGVkKSB7XHJcbiAgICAgICAgcmVtb3RlSWNlUGFyYW1ldGVycyA9IFNEUFV0aWxzLmdldEljZVBhcmFtZXRlcnMobWVkaWFTZWN0aW9uLFxyXG4gICAgICAgICAgICBzZXNzaW9ucGFydCk7XHJcbiAgICAgICAgcmVtb3RlRHRsc1BhcmFtZXRlcnMgPSBTRFBVdGlscy5nZXREdGxzUGFyYW1ldGVycyhtZWRpYVNlY3Rpb24sXHJcbiAgICAgICAgICAgIHNlc3Npb25wYXJ0KTtcclxuICAgICAgICByZW1vdGVEdGxzUGFyYW1ldGVycy5yb2xlID0gJ2NsaWVudCc7XHJcbiAgICAgIH1cclxuICAgICAgcmVjdkVuY29kaW5nUGFyYW1ldGVycyA9XHJcbiAgICAgICAgICBTRFBVdGlscy5wYXJzZVJ0cEVuY29kaW5nUGFyYW1ldGVycyhtZWRpYVNlY3Rpb24pO1xyXG5cclxuICAgICAgdmFyIHJ0Y3BQYXJhbWV0ZXJzID0gU0RQVXRpbHMucGFyc2VSdGNwUGFyYW1ldGVycyhtZWRpYVNlY3Rpb24pO1xyXG5cclxuICAgICAgdmFyIGlzQ29tcGxldGUgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sXHJcbiAgICAgICAgICAnYT1lbmQtb2YtY2FuZGlkYXRlcycsIHNlc3Npb25wYXJ0KS5sZW5ndGggPiAwO1xyXG4gICAgICB2YXIgY2FuZHMgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPWNhbmRpZGF0ZTonKVxyXG4gICAgICAgICAgLm1hcChmdW5jdGlvbihjYW5kKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBTRFBVdGlscy5wYXJzZUNhbmRpZGF0ZShjYW5kKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uKGNhbmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNhbmQuY29tcG9uZW50ID09PSAxO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBDaGVjayBpZiB3ZSBjYW4gdXNlIEJVTkRMRSBhbmQgZGlzcG9zZSB0cmFuc3BvcnRzLlxyXG4gICAgICBpZiAoKGRlc2NyaXB0aW9uLnR5cGUgPT09ICdvZmZlcicgfHwgZGVzY3JpcHRpb24udHlwZSA9PT0gJ2Fuc3dlcicpICYmXHJcbiAgICAgICAgICAhcmVqZWN0ZWQgJiYgdXNpbmdCdW5kbGUgJiYgc2RwTUxpbmVJbmRleCA+IDAgJiZcclxuICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XSkge1xyXG4gICAgICAgIHBjLl9kaXNwb3NlSWNlQW5kRHRsc1RyYW5zcG9ydHMoc2RwTUxpbmVJbmRleCk7XHJcbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmljZUdhdGhlcmVyID1cclxuICAgICAgICAgICAgcGMudHJhbnNjZWl2ZXJzWzBdLmljZUdhdGhlcmVyO1xyXG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5pY2VUcmFuc3BvcnQgPVxyXG4gICAgICAgICAgICBwYy50cmFuc2NlaXZlcnNbMF0uaWNlVHJhbnNwb3J0O1xyXG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5kdGxzVHJhbnNwb3J0ID1cclxuICAgICAgICAgICAgcGMudHJhbnNjZWl2ZXJzWzBdLmR0bHNUcmFuc3BvcnQ7XHJcbiAgICAgICAgaWYgKHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5ydHBTZW5kZXIpIHtcclxuICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5ydHBTZW5kZXIuc2V0VHJhbnNwb3J0KFxyXG4gICAgICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1swXS5kdGxzVHJhbnNwb3J0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5ydHBSZWNlaXZlcikge1xyXG4gICAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLnJ0cFJlY2VpdmVyLnNldFRyYW5zcG9ydChcclxuICAgICAgICAgICAgICBwYy50cmFuc2NlaXZlcnNbMF0uZHRsc1RyYW5zcG9ydCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChkZXNjcmlwdGlvbi50eXBlID09PSAnb2ZmZXInICYmICFyZWplY3RlZCkge1xyXG4gICAgICAgIHRyYW5zY2VpdmVyID0gcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdIHx8XHJcbiAgICAgICAgICAgIHBjLl9jcmVhdGVUcmFuc2NlaXZlcihraW5kKTtcclxuICAgICAgICB0cmFuc2NlaXZlci5taWQgPSBtaWQ7XHJcblxyXG4gICAgICAgIGlmICghdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIpIHtcclxuICAgICAgICAgIHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyID0gcGMuX2NyZWF0ZUljZUdhdGhlcmVyKHNkcE1MaW5lSW5kZXgsXHJcbiAgICAgICAgICAgICAgdXNpbmdCdW5kbGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNhbmRzLmxlbmd0aCAmJiB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQuc3RhdGUgPT09ICduZXcnKSB7XHJcbiAgICAgICAgICBpZiAoaXNDb21wbGV0ZSAmJiAoIXVzaW5nQnVuZGxlIHx8IHNkcE1MaW5lSW5kZXggPT09IDApKSB7XHJcbiAgICAgICAgICAgIHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydC5zZXRSZW1vdGVDYW5kaWRhdGVzKGNhbmRzKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNhbmRzLmZvckVhY2goZnVuY3Rpb24oY2FuZGlkYXRlKSB7XHJcbiAgICAgICAgICAgICAgbWF5YmVBZGRDYW5kaWRhdGUodHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LCBjYW5kaWRhdGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxvY2FsQ2FwYWJpbGl0aWVzID0gd2luZG93LlJUQ1J0cFJlY2VpdmVyLmdldENhcGFiaWxpdGllcyhraW5kKTtcclxuXHJcbiAgICAgICAgLy8gZmlsdGVyIFJUWCB1bnRpbCBhZGRpdGlvbmFsIHN0dWZmIG5lZWRlZCBmb3IgUlRYIGlzIGltcGxlbWVudGVkXHJcbiAgICAgICAgLy8gaW4gYWRhcHRlci5qc1xyXG4gICAgICAgIGlmIChlZGdlVmVyc2lvbiA8IDE1MDE5KSB7XHJcbiAgICAgICAgICBsb2NhbENhcGFiaWxpdGllcy5jb2RlY3MgPSBsb2NhbENhcGFiaWxpdGllcy5jb2RlY3MuZmlsdGVyKFxyXG4gICAgICAgICAgICAgIGZ1bmN0aW9uKGNvZGVjKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29kZWMubmFtZSAhPT0gJ3J0eCc7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzID0gdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVycyB8fCBbe1xyXG4gICAgICAgICAgc3NyYzogKDIgKiBzZHBNTGluZUluZGV4ICsgMikgKiAxMDAxXHJcbiAgICAgICAgfV07XHJcblxyXG4gICAgICAgIC8vIFRPRE86IHJld3JpdGUgdG8gdXNlIGh0dHA6Ly93M2MuZ2l0aHViLmlvL3dlYnJ0Yy1wYy8jc2V0LWFzc29jaWF0ZWQtcmVtb3RlLXN0cmVhbXNcclxuICAgICAgICB2YXIgaXNOZXdUcmFjayA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdzZW5kcmVjdicgfHwgZGlyZWN0aW9uID09PSAnc2VuZG9ubHknKSB7XHJcbiAgICAgICAgICBpc05ld1RyYWNrID0gIXRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyO1xyXG4gICAgICAgICAgcnRwUmVjZWl2ZXIgPSB0cmFuc2NlaXZlci5ydHBSZWNlaXZlciB8fFxyXG4gICAgICAgICAgICAgIG5ldyB3aW5kb3cuUlRDUnRwUmVjZWl2ZXIodHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydCwga2luZCk7XHJcblxyXG4gICAgICAgICAgaWYgKGlzTmV3VHJhY2spIHtcclxuICAgICAgICAgICAgdmFyIHN0cmVhbTtcclxuICAgICAgICAgICAgdHJhY2sgPSBydHBSZWNlaXZlci50cmFjaztcclxuICAgICAgICAgICAgLy8gRklYTUU6IGRvZXMgbm90IHdvcmsgd2l0aCBQbGFuIEIuXHJcbiAgICAgICAgICAgIGlmIChyZW1vdGVNc2lkICYmIHJlbW90ZU1zaWQuc3RyZWFtID09PSAnLScpIHtcclxuICAgICAgICAgICAgICAvLyBuby1vcC4gYSBzdHJlYW0gaWQgb2YgJy0nIG1lYW5zOiBubyBhc3NvY2lhdGVkIHN0cmVhbS5cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChyZW1vdGVNc2lkKSB7XHJcbiAgICAgICAgICAgICAgaWYgKCFzdHJlYW1zW3JlbW90ZU1zaWQuc3RyZWFtXSkge1xyXG4gICAgICAgICAgICAgICAgc3RyZWFtc1tyZW1vdGVNc2lkLnN0cmVhbV0gPSBuZXcgd2luZG93Lk1lZGlhU3RyZWFtKCk7XHJcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc3RyZWFtc1tyZW1vdGVNc2lkLnN0cmVhbV0sICdpZCcsIHtcclxuICAgICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVtb3RlTXNpZC5zdHJlYW07XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodHJhY2ssICdpZCcsIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiByZW1vdGVNc2lkLnRyYWNrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIHN0cmVhbSA9IHN0cmVhbXNbcmVtb3RlTXNpZC5zdHJlYW1dO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGlmICghc3RyZWFtcy5kZWZhdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBzdHJlYW1zLmRlZmF1bHQgPSBuZXcgd2luZG93Lk1lZGlhU3RyZWFtKCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHN0cmVhbSA9IHN0cmVhbXMuZGVmYXVsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc3RyZWFtKSB7XHJcbiAgICAgICAgICAgICAgYWRkVHJhY2tUb1N0cmVhbUFuZEZpcmVFdmVudCh0cmFjaywgc3RyZWFtKTtcclxuICAgICAgICAgICAgICB0cmFuc2NlaXZlci5hc3NvY2lhdGVkUmVtb3RlTWVkaWFTdHJlYW1zLnB1c2goc3RyZWFtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZWNlaXZlckxpc3QucHVzaChbdHJhY2ssIHJ0cFJlY2VpdmVyLCBzdHJlYW1dKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyICYmIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyLnRyYWNrKSB7XHJcbiAgICAgICAgICB0cmFuc2NlaXZlci5hc3NvY2lhdGVkUmVtb3RlTWVkaWFTdHJlYW1zLmZvckVhY2goZnVuY3Rpb24ocykge1xyXG4gICAgICAgICAgICB2YXIgbmF0aXZlVHJhY2sgPSBzLmdldFRyYWNrcygpLmZpbmQoZnVuY3Rpb24odCkge1xyXG4gICAgICAgICAgICAgIHJldHVybiB0LmlkID09PSB0cmFuc2NlaXZlci5ydHBSZWNlaXZlci50cmFjay5pZDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmIChuYXRpdmVUcmFjaykge1xyXG4gICAgICAgICAgICAgIHJlbW92ZVRyYWNrRnJvbVN0cmVhbUFuZEZpcmVFdmVudChuYXRpdmVUcmFjaywgcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdHJhbnNjZWl2ZXIuYXNzb2NpYXRlZFJlbW90ZU1lZGlhU3RyZWFtcyA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdHJhbnNjZWl2ZXIubG9jYWxDYXBhYmlsaXRpZXMgPSBsb2NhbENhcGFiaWxpdGllcztcclxuICAgICAgICB0cmFuc2NlaXZlci5yZW1vdGVDYXBhYmlsaXRpZXMgPSByZW1vdGVDYXBhYmlsaXRpZXM7XHJcbiAgICAgICAgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIgPSBydHBSZWNlaXZlcjtcclxuICAgICAgICB0cmFuc2NlaXZlci5ydGNwUGFyYW1ldGVycyA9IHJ0Y3BQYXJhbWV0ZXJzO1xyXG4gICAgICAgIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnMgPSBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzO1xyXG4gICAgICAgIHRyYW5zY2VpdmVyLnJlY3ZFbmNvZGluZ1BhcmFtZXRlcnMgPSByZWN2RW5jb2RpbmdQYXJhbWV0ZXJzO1xyXG5cclxuICAgICAgICAvLyBTdGFydCB0aGUgUlRDUnRwUmVjZWl2ZXIgbm93LiBUaGUgUlRQU2VuZGVyIGlzIHN0YXJ0ZWQgaW5cclxuICAgICAgICAvLyBzZXRMb2NhbERlc2NyaXB0aW9uLlxyXG4gICAgICAgIHBjLl90cmFuc2NlaXZlKHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XSxcclxuICAgICAgICAgICAgZmFsc2UsXHJcbiAgICAgICAgICAgIGlzTmV3VHJhY2spO1xyXG4gICAgICB9IGVsc2UgaWYgKGRlc2NyaXB0aW9uLnR5cGUgPT09ICdhbnN3ZXInICYmICFyZWplY3RlZCkge1xyXG4gICAgICAgIHRyYW5zY2VpdmVyID0gcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdO1xyXG4gICAgICAgIGljZUdhdGhlcmVyID0gdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXI7XHJcbiAgICAgICAgaWNlVHJhbnNwb3J0ID0gdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0O1xyXG4gICAgICAgIGR0bHNUcmFuc3BvcnQgPSB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0O1xyXG4gICAgICAgIHJ0cFJlY2VpdmVyID0gdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXI7XHJcbiAgICAgICAgc2VuZEVuY29kaW5nUGFyYW1ldGVycyA9IHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnM7XHJcbiAgICAgICAgbG9jYWxDYXBhYmlsaXRpZXMgPSB0cmFuc2NlaXZlci5sb2NhbENhcGFiaWxpdGllcztcclxuXHJcbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLnJlY3ZFbmNvZGluZ1BhcmFtZXRlcnMgPVxyXG4gICAgICAgICAgICByZWN2RW5jb2RpbmdQYXJhbWV0ZXJzO1xyXG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5yZW1vdGVDYXBhYmlsaXRpZXMgPVxyXG4gICAgICAgICAgICByZW1vdGVDYXBhYmlsaXRpZXM7XHJcbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLnJ0Y3BQYXJhbWV0ZXJzID0gcnRjcFBhcmFtZXRlcnM7XHJcblxyXG4gICAgICAgIGlmIChjYW5kcy5sZW5ndGggJiYgaWNlVHJhbnNwb3J0LnN0YXRlID09PSAnbmV3Jykge1xyXG4gICAgICAgICAgaWYgKChpc0ljZUxpdGUgfHwgaXNDb21wbGV0ZSkgJiZcclxuICAgICAgICAgICAgICAoIXVzaW5nQnVuZGxlIHx8IHNkcE1MaW5lSW5kZXggPT09IDApKSB7XHJcbiAgICAgICAgICAgIGljZVRyYW5zcG9ydC5zZXRSZW1vdGVDYW5kaWRhdGVzKGNhbmRzKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNhbmRzLmZvckVhY2goZnVuY3Rpb24oY2FuZGlkYXRlKSB7XHJcbiAgICAgICAgICAgICAgbWF5YmVBZGRDYW5kaWRhdGUodHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LCBjYW5kaWRhdGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdXNpbmdCdW5kbGUgfHwgc2RwTUxpbmVJbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgaWYgKGljZVRyYW5zcG9ydC5zdGF0ZSA9PT0gJ25ldycpIHtcclxuICAgICAgICAgICAgaWNlVHJhbnNwb3J0LnN0YXJ0KGljZUdhdGhlcmVyLCByZW1vdGVJY2VQYXJhbWV0ZXJzLFxyXG4gICAgICAgICAgICAgICAgJ2NvbnRyb2xsaW5nJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoZHRsc1RyYW5zcG9ydC5zdGF0ZSA9PT0gJ25ldycpIHtcclxuICAgICAgICAgICAgZHRsc1RyYW5zcG9ydC5zdGFydChyZW1vdGVEdGxzUGFyYW1ldGVycyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwYy5fdHJhbnNjZWl2ZSh0cmFuc2NlaXZlcixcclxuICAgICAgICAgICAgZGlyZWN0aW9uID09PSAnc2VuZHJlY3YnIHx8IGRpcmVjdGlvbiA9PT0gJ3JlY3Zvbmx5JyxcclxuICAgICAgICAgICAgZGlyZWN0aW9uID09PSAnc2VuZHJlY3YnIHx8IGRpcmVjdGlvbiA9PT0gJ3NlbmRvbmx5Jyk7XHJcblxyXG4gICAgICAgIC8vIFRPRE86IHJld3JpdGUgdG8gdXNlIGh0dHA6Ly93M2MuZ2l0aHViLmlvL3dlYnJ0Yy1wYy8jc2V0LWFzc29jaWF0ZWQtcmVtb3RlLXN0cmVhbXNcclxuICAgICAgICBpZiAocnRwUmVjZWl2ZXIgJiZcclxuICAgICAgICAgICAgKGRpcmVjdGlvbiA9PT0gJ3NlbmRyZWN2JyB8fCBkaXJlY3Rpb24gPT09ICdzZW5kb25seScpKSB7XHJcbiAgICAgICAgICB0cmFjayA9IHJ0cFJlY2VpdmVyLnRyYWNrO1xyXG4gICAgICAgICAgaWYgKHJlbW90ZU1zaWQpIHtcclxuICAgICAgICAgICAgaWYgKCFzdHJlYW1zW3JlbW90ZU1zaWQuc3RyZWFtXSkge1xyXG4gICAgICAgICAgICAgIHN0cmVhbXNbcmVtb3RlTXNpZC5zdHJlYW1dID0gbmV3IHdpbmRvdy5NZWRpYVN0cmVhbSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFkZFRyYWNrVG9TdHJlYW1BbmRGaXJlRXZlbnQodHJhY2ssIHN0cmVhbXNbcmVtb3RlTXNpZC5zdHJlYW1dKTtcclxuICAgICAgICAgICAgcmVjZWl2ZXJMaXN0LnB1c2goW3RyYWNrLCBydHBSZWNlaXZlciwgc3RyZWFtc1tyZW1vdGVNc2lkLnN0cmVhbV1dKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICghc3RyZWFtcy5kZWZhdWx0KSB7XHJcbiAgICAgICAgICAgICAgc3RyZWFtcy5kZWZhdWx0ID0gbmV3IHdpbmRvdy5NZWRpYVN0cmVhbSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFkZFRyYWNrVG9TdHJlYW1BbmRGaXJlRXZlbnQodHJhY2ssIHN0cmVhbXMuZGVmYXVsdCk7XHJcbiAgICAgICAgICAgIHJlY2VpdmVyTGlzdC5wdXNoKFt0cmFjaywgcnRwUmVjZWl2ZXIsIHN0cmVhbXMuZGVmYXVsdF0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyBGSVhNRTogYWN0dWFsbHkgdGhlIHJlY2VpdmVyIHNob3VsZCBiZSBjcmVhdGVkIGxhdGVyLlxyXG4gICAgICAgICAgZGVsZXRlIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHBjLl9kdGxzUm9sZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHBjLl9kdGxzUm9sZSA9IGRlc2NyaXB0aW9uLnR5cGUgPT09ICdvZmZlcicgPyAnYWN0aXZlJyA6ICdwYXNzaXZlJztcclxuICAgIH1cclxuXHJcbiAgICBwYy5yZW1vdGVEZXNjcmlwdGlvbiA9IHtcclxuICAgICAgdHlwZTogZGVzY3JpcHRpb24udHlwZSxcclxuICAgICAgc2RwOiBkZXNjcmlwdGlvbi5zZHBcclxuICAgIH07XHJcbiAgICBpZiAoZGVzY3JpcHRpb24udHlwZSA9PT0gJ29mZmVyJykge1xyXG4gICAgICBwYy5fdXBkYXRlU2lnbmFsaW5nU3RhdGUoJ2hhdmUtcmVtb3RlLW9mZmVyJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBwYy5fdXBkYXRlU2lnbmFsaW5nU3RhdGUoJ3N0YWJsZScpO1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmtleXMoc3RyZWFtcykuZm9yRWFjaChmdW5jdGlvbihzaWQpIHtcclxuICAgICAgdmFyIHN0cmVhbSA9IHN0cmVhbXNbc2lkXTtcclxuICAgICAgaWYgKHN0cmVhbS5nZXRUcmFja3MoKS5sZW5ndGgpIHtcclxuICAgICAgICBpZiAocGMucmVtb3RlU3RyZWFtcy5pbmRleE9mKHN0cmVhbSkgPT09IC0xKSB7XHJcbiAgICAgICAgICBwYy5yZW1vdGVTdHJlYW1zLnB1c2goc3RyZWFtKTtcclxuICAgICAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgnYWRkc3RyZWFtJyk7XHJcbiAgICAgICAgICBldmVudC5zdHJlYW0gPSBzdHJlYW07XHJcbiAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcGMuX2Rpc3BhdGNoRXZlbnQoJ2FkZHN0cmVhbScsIGV2ZW50KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVjZWl2ZXJMaXN0LmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgICAgICAgdmFyIHRyYWNrID0gaXRlbVswXTtcclxuICAgICAgICAgIHZhciByZWNlaXZlciA9IGl0ZW1bMV07XHJcbiAgICAgICAgICBpZiAoc3RyZWFtLmlkICE9PSBpdGVtWzJdLmlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGZpcmVBZGRUcmFjayhwYywgdHJhY2ssIHJlY2VpdmVyLCBbc3RyZWFtXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmVjZWl2ZXJMaXN0LmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgICBpZiAoaXRlbVsyXSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBmaXJlQWRkVHJhY2socGMsIGl0ZW1bMF0sIGl0ZW1bMV0sIFtdKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIGNoZWNrIHdoZXRoZXIgYWRkSWNlQ2FuZGlkYXRlKHt9KSB3YXMgY2FsbGVkIHdpdGhpbiBmb3VyIHNlY29uZHMgYWZ0ZXJcclxuICAgIC8vIHNldFJlbW90ZURlc2NyaXB0aW9uLlxyXG4gICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmICghKHBjICYmIHBjLnRyYW5zY2VpdmVycykpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgcGMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcclxuICAgICAgICBpZiAodHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0ICYmXHJcbiAgICAgICAgICAgIHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydC5zdGF0ZSA9PT0gJ25ldycgJiZcclxuICAgICAgICAgICAgdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LmdldFJlbW90ZUNhbmRpZGF0ZXMoKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ1RpbWVvdXQgZm9yIGFkZFJlbW90ZUNhbmRpZGF0ZS4gQ29uc2lkZXIgc2VuZGluZyAnICtcclxuICAgICAgICAgICAgICAnYW4gZW5kLW9mLWNhbmRpZGF0ZXMgbm90aWZpY2F0aW9uJyk7XHJcbiAgICAgICAgICB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQuYWRkUmVtb3RlQ2FuZGlkYXRlKHt9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSwgNDAwMCk7XHJcblxyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gIH07XHJcblxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xyXG4gICAgICAvKiBub3QgeWV0XHJcbiAgICAgIGlmICh0cmFuc2NlaXZlci5pY2VHYXRoZXJlcikge1xyXG4gICAgICAgIHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyLmNsb3NlKCk7XHJcbiAgICAgIH1cclxuICAgICAgKi9cclxuICAgICAgaWYgKHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydCkge1xyXG4gICAgICAgIHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydC5zdG9wKCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQpIHtcclxuICAgICAgICB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0LnN0b3AoKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodHJhbnNjZWl2ZXIucnRwU2VuZGVyKSB7XHJcbiAgICAgICAgdHJhbnNjZWl2ZXIucnRwU2VuZGVyLnN0b3AoKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIpIHtcclxuICAgICAgICB0cmFuc2NlaXZlci5ydHBSZWNlaXZlci5zdG9wKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgLy8gRklYTUU6IGNsZWFuIHVwIHRyYWNrcywgbG9jYWwgc3RyZWFtcywgcmVtb3RlIHN0cmVhbXMsIGV0Y1xyXG4gICAgdGhpcy5faXNDbG9zZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5fdXBkYXRlU2lnbmFsaW5nU3RhdGUoJ2Nsb3NlZCcpO1xyXG4gIH07XHJcblxyXG4gIC8vIFVwZGF0ZSB0aGUgc2lnbmFsaW5nIHN0YXRlLlxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fdXBkYXRlU2lnbmFsaW5nU3RhdGUgPSBmdW5jdGlvbihuZXdTdGF0ZSkge1xyXG4gICAgdGhpcy5zaWduYWxpbmdTdGF0ZSA9IG5ld1N0YXRlO1xyXG4gICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdzaWduYWxpbmdzdGF0ZWNoYW5nZScpO1xyXG4gICAgdGhpcy5fZGlzcGF0Y2hFdmVudCgnc2lnbmFsaW5nc3RhdGVjaGFuZ2UnLCBldmVudCk7XHJcbiAgfTtcclxuXHJcbiAgLy8gRGV0ZXJtaW5lIHdoZXRoZXIgdG8gZmlyZSB0aGUgbmVnb3RpYXRpb25uZWVkZWQgZXZlbnQuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl9tYXliZUZpcmVOZWdvdGlhdGlvbk5lZWRlZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHBjID0gdGhpcztcclxuICAgIGlmICh0aGlzLnNpZ25hbGluZ1N0YXRlICE9PSAnc3RhYmxlJyB8fCB0aGlzLm5lZWROZWdvdGlhdGlvbiA9PT0gdHJ1ZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLm5lZWROZWdvdGlhdGlvbiA9IHRydWU7XHJcbiAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgaWYgKHBjLm5lZWROZWdvdGlhdGlvbikge1xyXG4gICAgICAgIHBjLm5lZWROZWdvdGlhdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgnbmVnb3RpYXRpb25uZWVkZWQnKTtcclxuICAgICAgICBwYy5fZGlzcGF0Y2hFdmVudCgnbmVnb3RpYXRpb25uZWVkZWQnLCBldmVudCk7XHJcbiAgICAgIH1cclxuICAgIH0sIDApO1xyXG4gIH07XHJcblxyXG4gIC8vIFVwZGF0ZSB0aGUgaWNlIGNvbm5lY3Rpb24gc3RhdGUuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl91cGRhdGVJY2VDb25uZWN0aW9uU3RhdGUgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBuZXdTdGF0ZTtcclxuICAgIHZhciBzdGF0ZXMgPSB7XHJcbiAgICAgICduZXcnOiAwLFxyXG4gICAgICBjbG9zZWQ6IDAsXHJcbiAgICAgIGNoZWNraW5nOiAwLFxyXG4gICAgICBjb25uZWN0ZWQ6IDAsXHJcbiAgICAgIGNvbXBsZXRlZDogMCxcclxuICAgICAgZGlzY29ubmVjdGVkOiAwLFxyXG4gICAgICBmYWlsZWQ6IDBcclxuICAgIH07XHJcbiAgICB0aGlzLnRyYW5zY2VpdmVycy5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XHJcbiAgICAgIHN0YXRlc1t0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQuc3RhdGVdKys7XHJcbiAgICB9KTtcclxuXHJcbiAgICBuZXdTdGF0ZSA9ICduZXcnO1xyXG4gICAgaWYgKHN0YXRlcy5mYWlsZWQgPiAwKSB7XHJcbiAgICAgIG5ld1N0YXRlID0gJ2ZhaWxlZCc7XHJcbiAgICB9IGVsc2UgaWYgKHN0YXRlcy5jaGVja2luZyA+IDApIHtcclxuICAgICAgbmV3U3RhdGUgPSAnY2hlY2tpbmcnO1xyXG4gICAgfSBlbHNlIGlmIChzdGF0ZXMuZGlzY29ubmVjdGVkID4gMCkge1xyXG4gICAgICBuZXdTdGF0ZSA9ICdkaXNjb25uZWN0ZWQnO1xyXG4gICAgfSBlbHNlIGlmIChzdGF0ZXMubmV3ID4gMCkge1xyXG4gICAgICBuZXdTdGF0ZSA9ICduZXcnO1xyXG4gICAgfSBlbHNlIGlmIChzdGF0ZXMuY29ubmVjdGVkID4gMCkge1xyXG4gICAgICBuZXdTdGF0ZSA9ICdjb25uZWN0ZWQnO1xyXG4gICAgfSBlbHNlIGlmIChzdGF0ZXMuY29tcGxldGVkID4gMCkge1xyXG4gICAgICBuZXdTdGF0ZSA9ICdjb21wbGV0ZWQnO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChuZXdTdGF0ZSAhPT0gdGhpcy5pY2VDb25uZWN0aW9uU3RhdGUpIHtcclxuICAgICAgdGhpcy5pY2VDb25uZWN0aW9uU3RhdGUgPSBuZXdTdGF0ZTtcclxuICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdpY2Vjb25uZWN0aW9uc3RhdGVjaGFuZ2UnKTtcclxuICAgICAgdGhpcy5fZGlzcGF0Y2hFdmVudCgnaWNlY29ubmVjdGlvbnN0YXRlY2hhbmdlJywgZXZlbnQpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8vIFVwZGF0ZSB0aGUgY29ubmVjdGlvbiBzdGF0ZS5cclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX3VwZGF0ZUNvbm5lY3Rpb25TdGF0ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIG5ld1N0YXRlO1xyXG4gICAgdmFyIHN0YXRlcyA9IHtcclxuICAgICAgJ25ldyc6IDAsXHJcbiAgICAgIGNsb3NlZDogMCxcclxuICAgICAgY29ubmVjdGluZzogMCxcclxuICAgICAgY29ubmVjdGVkOiAwLFxyXG4gICAgICBjb21wbGV0ZWQ6IDAsXHJcbiAgICAgIGRpc2Nvbm5lY3RlZDogMCxcclxuICAgICAgZmFpbGVkOiAwXHJcbiAgICB9O1xyXG4gICAgdGhpcy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xyXG4gICAgICBzdGF0ZXNbdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LnN0YXRlXSsrO1xyXG4gICAgICBzdGF0ZXNbdHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydC5zdGF0ZV0rKztcclxuICAgIH0pO1xyXG4gICAgLy8gSUNFVHJhbnNwb3J0LmNvbXBsZXRlZCBhbmQgY29ubmVjdGVkIGFyZSB0aGUgc2FtZSBmb3IgdGhpcyBwdXJwb3NlLlxyXG4gICAgc3RhdGVzLmNvbm5lY3RlZCArPSBzdGF0ZXMuY29tcGxldGVkO1xyXG5cclxuICAgIG5ld1N0YXRlID0gJ25ldyc7XHJcbiAgICBpZiAoc3RhdGVzLmZhaWxlZCA+IDApIHtcclxuICAgICAgbmV3U3RhdGUgPSAnZmFpbGVkJztcclxuICAgIH0gZWxzZSBpZiAoc3RhdGVzLmNvbm5lY3RpbmcgPiAwKSB7XHJcbiAgICAgIG5ld1N0YXRlID0gJ2Nvbm5lY3RpbmcnO1xyXG4gICAgfSBlbHNlIGlmIChzdGF0ZXMuZGlzY29ubmVjdGVkID4gMCkge1xyXG4gICAgICBuZXdTdGF0ZSA9ICdkaXNjb25uZWN0ZWQnO1xyXG4gICAgfSBlbHNlIGlmIChzdGF0ZXMubmV3ID4gMCkge1xyXG4gICAgICBuZXdTdGF0ZSA9ICduZXcnO1xyXG4gICAgfSBlbHNlIGlmIChzdGF0ZXMuY29ubmVjdGVkID4gMCkge1xyXG4gICAgICBuZXdTdGF0ZSA9ICdjb25uZWN0ZWQnO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChuZXdTdGF0ZSAhPT0gdGhpcy5jb25uZWN0aW9uU3RhdGUpIHtcclxuICAgICAgdGhpcy5jb25uZWN0aW9uU3RhdGUgPSBuZXdTdGF0ZTtcclxuICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdjb25uZWN0aW9uc3RhdGVjaGFuZ2UnKTtcclxuICAgICAgdGhpcy5fZGlzcGF0Y2hFdmVudCgnY29ubmVjdGlvbnN0YXRlY2hhbmdlJywgZXZlbnQpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5jcmVhdGVPZmZlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHBjID0gdGhpcztcclxuXHJcbiAgICBpZiAocGMuX2lzQ2xvc2VkKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChtYWtlRXJyb3IoJ0ludmFsaWRTdGF0ZUVycm9yJyxcclxuICAgICAgICAgICdDYW4gbm90IGNhbGwgY3JlYXRlT2ZmZXIgYWZ0ZXIgY2xvc2UnKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG51bUF1ZGlvVHJhY2tzID0gcGMudHJhbnNjZWl2ZXJzLmZpbHRlcihmdW5jdGlvbih0KSB7XHJcbiAgICAgIHJldHVybiB0LmtpbmQgPT09ICdhdWRpbyc7XHJcbiAgICB9KS5sZW5ndGg7XHJcbiAgICB2YXIgbnVtVmlkZW9UcmFja3MgPSBwYy50cmFuc2NlaXZlcnMuZmlsdGVyKGZ1bmN0aW9uKHQpIHtcclxuICAgICAgcmV0dXJuIHQua2luZCA9PT0gJ3ZpZGVvJztcclxuICAgIH0pLmxlbmd0aDtcclxuXHJcbiAgICAvLyBEZXRlcm1pbmUgbnVtYmVyIG9mIGF1ZGlvIGFuZCB2aWRlbyB0cmFja3Mgd2UgbmVlZCB0byBzZW5kL3JlY3YuXHJcbiAgICB2YXIgb2ZmZXJPcHRpb25zID0gYXJndW1lbnRzWzBdO1xyXG4gICAgaWYgKG9mZmVyT3B0aW9ucykge1xyXG4gICAgICAvLyBSZWplY3QgQ2hyb21lIGxlZ2FjeSBjb25zdHJhaW50cy5cclxuICAgICAgaWYgKG9mZmVyT3B0aW9ucy5tYW5kYXRvcnkgfHwgb2ZmZXJPcHRpb25zLm9wdGlvbmFsKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcclxuICAgICAgICAgICAgJ0xlZ2FjeSBtYW5kYXRvcnkvb3B0aW9uYWwgY29uc3RyYWludHMgbm90IHN1cHBvcnRlZC4nKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW8gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbyA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgbnVtQXVkaW9UcmFja3MgPSAxO1xyXG4gICAgICAgIH0gZWxzZSBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW8gPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICBudW1BdWRpb1RyYWNrcyA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG51bUF1ZGlvVHJhY2tzID0gb2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW87XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVWaWRlbyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvID09PSB0cnVlKSB7XHJcbiAgICAgICAgICBudW1WaWRlb1RyYWNrcyA9IDE7XHJcbiAgICAgICAgfSBlbHNlIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVWaWRlbyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgIG51bVZpZGVvVHJhY2tzID0gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbnVtVmlkZW9UcmFja3MgPSBvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVWaWRlbztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwYy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xyXG4gICAgICBpZiAodHJhbnNjZWl2ZXIua2luZCA9PT0gJ2F1ZGlvJykge1xyXG4gICAgICAgIG51bUF1ZGlvVHJhY2tzLS07XHJcbiAgICAgICAgaWYgKG51bUF1ZGlvVHJhY2tzIDwgMCkge1xyXG4gICAgICAgICAgdHJhbnNjZWl2ZXIud2FudFJlY2VpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIua2luZCA9PT0gJ3ZpZGVvJykge1xyXG4gICAgICAgIG51bVZpZGVvVHJhY2tzLS07XHJcbiAgICAgICAgaWYgKG51bVZpZGVvVHJhY2tzIDwgMCkge1xyXG4gICAgICAgICAgdHJhbnNjZWl2ZXIud2FudFJlY2VpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIENyZWF0ZSBNLWxpbmVzIGZvciByZWN2b25seSBzdHJlYW1zLlxyXG4gICAgd2hpbGUgKG51bUF1ZGlvVHJhY2tzID4gMCB8fCBudW1WaWRlb1RyYWNrcyA+IDApIHtcclxuICAgICAgaWYgKG51bUF1ZGlvVHJhY2tzID4gMCkge1xyXG4gICAgICAgIHBjLl9jcmVhdGVUcmFuc2NlaXZlcignYXVkaW8nKTtcclxuICAgICAgICBudW1BdWRpb1RyYWNrcy0tO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChudW1WaWRlb1RyYWNrcyA+IDApIHtcclxuICAgICAgICBwYy5fY3JlYXRlVHJhbnNjZWl2ZXIoJ3ZpZGVvJyk7XHJcbiAgICAgICAgbnVtVmlkZW9UcmFja3MtLTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBzZHAgPSBTRFBVdGlscy53cml0ZVNlc3Npb25Cb2lsZXJwbGF0ZShwYy5fc2RwU2Vzc2lvbklkLFxyXG4gICAgICAgIHBjLl9zZHBTZXNzaW9uVmVyc2lvbisrKTtcclxuICAgIHBjLnRyYW5zY2VpdmVycy5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zY2VpdmVyLCBzZHBNTGluZUluZGV4KSB7XHJcbiAgICAgIC8vIEZvciBlYWNoIHRyYWNrLCBjcmVhdGUgYW4gaWNlIGdhdGhlcmVyLCBpY2UgdHJhbnNwb3J0LFxyXG4gICAgICAvLyBkdGxzIHRyYW5zcG9ydCwgcG90ZW50aWFsbHkgcnRwc2VuZGVyIGFuZCBydHByZWNlaXZlci5cclxuICAgICAgdmFyIHRyYWNrID0gdHJhbnNjZWl2ZXIudHJhY2s7XHJcbiAgICAgIHZhciBraW5kID0gdHJhbnNjZWl2ZXIua2luZDtcclxuICAgICAgdmFyIG1pZCA9IHRyYW5zY2VpdmVyLm1pZCB8fCBTRFBVdGlscy5nZW5lcmF0ZUlkZW50aWZpZXIoKTtcclxuICAgICAgdHJhbnNjZWl2ZXIubWlkID0gbWlkO1xyXG5cclxuICAgICAgaWYgKCF0cmFuc2NlaXZlci5pY2VHYXRoZXJlcikge1xyXG4gICAgICAgIHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyID0gcGMuX2NyZWF0ZUljZUdhdGhlcmVyKHNkcE1MaW5lSW5kZXgsXHJcbiAgICAgICAgICAgIHBjLnVzaW5nQnVuZGxlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIGxvY2FsQ2FwYWJpbGl0aWVzID0gd2luZG93LlJUQ1J0cFNlbmRlci5nZXRDYXBhYmlsaXRpZXMoa2luZCk7XHJcbiAgICAgIC8vIGZpbHRlciBSVFggdW50aWwgYWRkaXRpb25hbCBzdHVmZiBuZWVkZWQgZm9yIFJUWCBpcyBpbXBsZW1lbnRlZFxyXG4gICAgICAvLyBpbiBhZGFwdGVyLmpzXHJcbiAgICAgIGlmIChlZGdlVmVyc2lvbiA8IDE1MDE5KSB7XHJcbiAgICAgICAgbG9jYWxDYXBhYmlsaXRpZXMuY29kZWNzID0gbG9jYWxDYXBhYmlsaXRpZXMuY29kZWNzLmZpbHRlcihcclxuICAgICAgICAgICAgZnVuY3Rpb24oY29kZWMpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gY29kZWMubmFtZSAhPT0gJ3J0eCc7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGxvY2FsQ2FwYWJpbGl0aWVzLmNvZGVjcy5mb3JFYWNoKGZ1bmN0aW9uKGNvZGVjKSB7XHJcbiAgICAgICAgLy8gd29yayBhcm91bmQgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3dlYnJ0Yy9pc3N1ZXMvZGV0YWlsP2lkPTY1NTJcclxuICAgICAgICAvLyBieSBhZGRpbmcgbGV2ZWwtYXN5bW1ldHJ5LWFsbG93ZWQ9MVxyXG4gICAgICAgIGlmIChjb2RlYy5uYW1lID09PSAnSDI2NCcgJiZcclxuICAgICAgICAgICAgY29kZWMucGFyYW1ldGVyc1snbGV2ZWwtYXN5bW1ldHJ5LWFsbG93ZWQnXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBjb2RlYy5wYXJhbWV0ZXJzWydsZXZlbC1hc3ltbWV0cnktYWxsb3dlZCddID0gJzEnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZm9yIHN1YnNlcXVlbnQgb2ZmZXJzLCB3ZSBtaWdodCBoYXZlIHRvIHJlLXVzZSB0aGUgcGF5bG9hZFxyXG4gICAgICAgIC8vIHR5cGUgb2YgdGhlIGxhc3Qgb2ZmZXIuXHJcbiAgICAgICAgaWYgKHRyYW5zY2VpdmVyLnJlbW90ZUNhcGFiaWxpdGllcyAmJlxyXG4gICAgICAgICAgICB0cmFuc2NlaXZlci5yZW1vdGVDYXBhYmlsaXRpZXMuY29kZWNzKSB7XHJcbiAgICAgICAgICB0cmFuc2NlaXZlci5yZW1vdGVDYXBhYmlsaXRpZXMuY29kZWNzLmZvckVhY2goZnVuY3Rpb24ocmVtb3RlQ29kZWMpIHtcclxuICAgICAgICAgICAgaWYgKGNvZGVjLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gcmVtb3RlQ29kZWMubmFtZS50b0xvd2VyQ2FzZSgpICYmXHJcbiAgICAgICAgICAgICAgICBjb2RlYy5jbG9ja1JhdGUgPT09IHJlbW90ZUNvZGVjLmNsb2NrUmF0ZSkge1xyXG4gICAgICAgICAgICAgIGNvZGVjLnByZWZlcnJlZFBheWxvYWRUeXBlID0gcmVtb3RlQ29kZWMucGF5bG9hZFR5cGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIGxvY2FsQ2FwYWJpbGl0aWVzLmhlYWRlckV4dGVuc2lvbnMuZm9yRWFjaChmdW5jdGlvbihoZHJFeHQpIHtcclxuICAgICAgICB2YXIgcmVtb3RlRXh0ZW5zaW9ucyA9IHRyYW5zY2VpdmVyLnJlbW90ZUNhcGFiaWxpdGllcyAmJlxyXG4gICAgICAgICAgICB0cmFuc2NlaXZlci5yZW1vdGVDYXBhYmlsaXRpZXMuaGVhZGVyRXh0ZW5zaW9ucyB8fCBbXTtcclxuICAgICAgICByZW1vdGVFeHRlbnNpb25zLmZvckVhY2goZnVuY3Rpb24ockhkckV4dCkge1xyXG4gICAgICAgICAgaWYgKGhkckV4dC51cmkgPT09IHJIZHJFeHQudXJpKSB7XHJcbiAgICAgICAgICAgIGhkckV4dC5pZCA9IHJIZHJFeHQuaWQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gZ2VuZXJhdGUgYW4gc3NyYyBub3csIHRvIGJlIHVzZWQgbGF0ZXIgaW4gcnRwU2VuZGVyLnNlbmRcclxuICAgICAgdmFyIHNlbmRFbmNvZGluZ1BhcmFtZXRlcnMgPSB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzIHx8IFt7XHJcbiAgICAgICAgc3NyYzogKDIgKiBzZHBNTGluZUluZGV4ICsgMSkgKiAxMDAxXHJcbiAgICAgIH1dO1xyXG4gICAgICBpZiAodHJhY2spIHtcclxuICAgICAgICAvLyBhZGQgUlRYXHJcbiAgICAgICAgaWYgKGVkZ2VWZXJzaW9uID49IDE1MDE5ICYmIGtpbmQgPT09ICd2aWRlbycgJiZcclxuICAgICAgICAgICAgIXNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4KSB7XHJcbiAgICAgICAgICBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCA9IHtcclxuICAgICAgICAgICAgc3NyYzogc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjICsgMVxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0cmFuc2NlaXZlci53YW50UmVjZWl2ZSkge1xyXG4gICAgICAgIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyID0gbmV3IHdpbmRvdy5SVENSdHBSZWNlaXZlcihcclxuICAgICAgICAgICAgdHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydCwga2luZCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRyYW5zY2VpdmVyLmxvY2FsQ2FwYWJpbGl0aWVzID0gbG9jYWxDYXBhYmlsaXRpZXM7XHJcbiAgICAgIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnMgPSBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gYWx3YXlzIG9mZmVyIEJVTkRMRSBhbmQgZGlzcG9zZSBvbiByZXR1cm4gaWYgbm90IHN1cHBvcnRlZC5cclxuICAgIGlmIChwYy5fY29uZmlnLmJ1bmRsZVBvbGljeSAhPT0gJ21heC1jb21wYXQnKSB7XHJcbiAgICAgIHNkcCArPSAnYT1ncm91cDpCVU5ETEUgJyArIHBjLnRyYW5zY2VpdmVycy5tYXAoZnVuY3Rpb24odCkge1xyXG4gICAgICAgIHJldHVybiB0Lm1pZDtcclxuICAgICAgfSkuam9pbignICcpICsgJ1xcclxcbic7XHJcbiAgICB9XHJcbiAgICBzZHAgKz0gJ2E9aWNlLW9wdGlvbnM6dHJpY2tsZVxcclxcbic7XHJcblxyXG4gICAgcGMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIsIHNkcE1MaW5lSW5kZXgpIHtcclxuICAgICAgc2RwICs9IHdyaXRlTWVkaWFTZWN0aW9uKHRyYW5zY2VpdmVyLCB0cmFuc2NlaXZlci5sb2NhbENhcGFiaWxpdGllcyxcclxuICAgICAgICAgICdvZmZlcicsIHRyYW5zY2VpdmVyLnN0cmVhbSwgcGMuX2R0bHNSb2xlKTtcclxuICAgICAgc2RwICs9ICdhPXJ0Y3AtcnNpemVcXHJcXG4nO1xyXG5cclxuICAgICAgaWYgKHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyICYmIHBjLmljZUdhdGhlcmluZ1N0YXRlICE9PSAnbmV3JyAmJlxyXG4gICAgICAgICAgKHNkcE1MaW5lSW5kZXggPT09IDAgfHwgIXBjLnVzaW5nQnVuZGxlKSkge1xyXG4gICAgICAgIHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyLmdldExvY2FsQ2FuZGlkYXRlcygpLmZvckVhY2goZnVuY3Rpb24oY2FuZCkge1xyXG4gICAgICAgICAgY2FuZC5jb21wb25lbnQgPSAxO1xyXG4gICAgICAgICAgc2RwICs9ICdhPScgKyBTRFBVdGlscy53cml0ZUNhbmRpZGF0ZShjYW5kKSArICdcXHJcXG4nO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAodHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIuc3RhdGUgPT09ICdjb21wbGV0ZWQnKSB7XHJcbiAgICAgICAgICBzZHAgKz0gJ2E9ZW5kLW9mLWNhbmRpZGF0ZXNcXHJcXG4nO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIGRlc2MgPSBuZXcgd2luZG93LlJUQ1Nlc3Npb25EZXNjcmlwdGlvbih7XHJcbiAgICAgIHR5cGU6ICdvZmZlcicsXHJcbiAgICAgIHNkcDogc2RwXHJcbiAgICB9KTtcclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZGVzYyk7XHJcbiAgfTtcclxuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmNyZWF0ZUFuc3dlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHBjID0gdGhpcztcclxuXHJcbiAgICBpZiAocGMuX2lzQ2xvc2VkKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChtYWtlRXJyb3IoJ0ludmFsaWRTdGF0ZUVycm9yJyxcclxuICAgICAgICAgICdDYW4gbm90IGNhbGwgY3JlYXRlQW5zd2VyIGFmdGVyIGNsb3NlJykpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghKHBjLnNpZ25hbGluZ1N0YXRlID09PSAnaGF2ZS1yZW1vdGUtb2ZmZXInIHx8XHJcbiAgICAgICAgcGMuc2lnbmFsaW5nU3RhdGUgPT09ICdoYXZlLWxvY2FsLXByYW5zd2VyJykpIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG1ha2VFcnJvcignSW52YWxpZFN0YXRlRXJyb3InLFxyXG4gICAgICAgICAgJ0NhbiBub3QgY2FsbCBjcmVhdGVBbnN3ZXIgaW4gc2lnbmFsaW5nU3RhdGUgJyArIHBjLnNpZ25hbGluZ1N0YXRlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHNkcCA9IFNEUFV0aWxzLndyaXRlU2Vzc2lvbkJvaWxlcnBsYXRlKHBjLl9zZHBTZXNzaW9uSWQsXHJcbiAgICAgICAgcGMuX3NkcFNlc3Npb25WZXJzaW9uKyspO1xyXG4gICAgaWYgKHBjLnVzaW5nQnVuZGxlKSB7XHJcbiAgICAgIHNkcCArPSAnYT1ncm91cDpCVU5ETEUgJyArIHBjLnRyYW5zY2VpdmVycy5tYXAoZnVuY3Rpb24odCkge1xyXG4gICAgICAgIHJldHVybiB0Lm1pZDtcclxuICAgICAgfSkuam9pbignICcpICsgJ1xcclxcbic7XHJcbiAgICB9XHJcbiAgICB2YXIgbWVkaWFTZWN0aW9uc0luT2ZmZXIgPSBTRFBVdGlscy5nZXRNZWRpYVNlY3Rpb25zKFxyXG4gICAgICAgIHBjLnJlbW90ZURlc2NyaXB0aW9uLnNkcCkubGVuZ3RoO1xyXG4gICAgcGMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIsIHNkcE1MaW5lSW5kZXgpIHtcclxuICAgICAgaWYgKHNkcE1MaW5lSW5kZXggKyAxID4gbWVkaWFTZWN0aW9uc0luT2ZmZXIpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRyYW5zY2VpdmVyLnJlamVjdGVkKSB7XHJcbiAgICAgICAgaWYgKHRyYW5zY2VpdmVyLmtpbmQgPT09ICdhcHBsaWNhdGlvbicpIHtcclxuICAgICAgICAgIHNkcCArPSAnbT1hcHBsaWNhdGlvbiAwIERUTFMvU0NUUCA1MDAwXFxyXFxuJztcclxuICAgICAgICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLmtpbmQgPT09ICdhdWRpbycpIHtcclxuICAgICAgICAgIHNkcCArPSAnbT1hdWRpbyAwIFVEUC9UTFMvUlRQL1NBVlBGIDBcXHJcXG4nICtcclxuICAgICAgICAgICAgICAnYT1ydHBtYXA6MCBQQ01VLzgwMDBcXHJcXG4nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIua2luZCA9PT0gJ3ZpZGVvJykge1xyXG4gICAgICAgICAgc2RwICs9ICdtPXZpZGVvIDAgVURQL1RMUy9SVFAvU0FWUEYgMTIwXFxyXFxuJyArXHJcbiAgICAgICAgICAgICAgJ2E9cnRwbWFwOjEyMCBWUDgvOTAwMDBcXHJcXG4nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZHAgKz0gJ2M9SU4gSVA0IDAuMC4wLjBcXHJcXG4nICtcclxuICAgICAgICAgICAgJ2E9aW5hY3RpdmVcXHJcXG4nICtcclxuICAgICAgICAgICAgJ2E9bWlkOicgKyB0cmFuc2NlaXZlci5taWQgKyAnXFxyXFxuJztcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEZJWE1FOiBsb29rIGF0IGRpcmVjdGlvbi5cclxuICAgICAgaWYgKHRyYW5zY2VpdmVyLnN0cmVhbSkge1xyXG4gICAgICAgIHZhciBsb2NhbFRyYWNrO1xyXG4gICAgICAgIGlmICh0cmFuc2NlaXZlci5raW5kID09PSAnYXVkaW8nKSB7XHJcbiAgICAgICAgICBsb2NhbFRyYWNrID0gdHJhbnNjZWl2ZXIuc3RyZWFtLmdldEF1ZGlvVHJhY2tzKClbMF07XHJcbiAgICAgICAgfSBlbHNlIGlmICh0cmFuc2NlaXZlci5raW5kID09PSAndmlkZW8nKSB7XHJcbiAgICAgICAgICBsb2NhbFRyYWNrID0gdHJhbnNjZWl2ZXIuc3RyZWFtLmdldFZpZGVvVHJhY2tzKClbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChsb2NhbFRyYWNrKSB7XHJcbiAgICAgICAgICAvLyBhZGQgUlRYXHJcbiAgICAgICAgICBpZiAoZWRnZVZlcnNpb24gPj0gMTUwMTkgJiYgdHJhbnNjZWl2ZXIua2luZCA9PT0gJ3ZpZGVvJyAmJlxyXG4gICAgICAgICAgICAgICF0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCkge1xyXG4gICAgICAgICAgICB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCA9IHtcclxuICAgICAgICAgICAgICBzc3JjOiB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmMgKyAxXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBDYWxjdWxhdGUgaW50ZXJzZWN0aW9uIG9mIGNhcGFiaWxpdGllcy5cclxuICAgICAgdmFyIGNvbW1vbkNhcGFiaWxpdGllcyA9IGdldENvbW1vbkNhcGFiaWxpdGllcyhcclxuICAgICAgICAgIHRyYW5zY2VpdmVyLmxvY2FsQ2FwYWJpbGl0aWVzLFxyXG4gICAgICAgICAgdHJhbnNjZWl2ZXIucmVtb3RlQ2FwYWJpbGl0aWVzKTtcclxuXHJcbiAgICAgIHZhciBoYXNSdHggPSBjb21tb25DYXBhYmlsaXRpZXMuY29kZWNzLmZpbHRlcihmdW5jdGlvbihjKSB7XHJcbiAgICAgICAgcmV0dXJuIGMubmFtZS50b0xvd2VyQ2FzZSgpID09PSAncnR4JztcclxuICAgICAgfSkubGVuZ3RoO1xyXG4gICAgICBpZiAoIWhhc1J0eCAmJiB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCkge1xyXG4gICAgICAgIGRlbGV0ZSB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eDtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2RwICs9IHdyaXRlTWVkaWFTZWN0aW9uKHRyYW5zY2VpdmVyLCBjb21tb25DYXBhYmlsaXRpZXMsXHJcbiAgICAgICAgICAnYW5zd2VyJywgdHJhbnNjZWl2ZXIuc3RyZWFtLCBwYy5fZHRsc1JvbGUpO1xyXG4gICAgICBpZiAodHJhbnNjZWl2ZXIucnRjcFBhcmFtZXRlcnMgJiZcclxuICAgICAgICAgIHRyYW5zY2VpdmVyLnJ0Y3BQYXJhbWV0ZXJzLnJlZHVjZWRTaXplKSB7XHJcbiAgICAgICAgc2RwICs9ICdhPXJ0Y3AtcnNpemVcXHJcXG4nO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgZGVzYyA9IG5ldyB3aW5kb3cuUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKHtcclxuICAgICAgdHlwZTogJ2Fuc3dlcicsXHJcbiAgICAgIHNkcDogc2RwXHJcbiAgICB9KTtcclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZGVzYyk7XHJcbiAgfTtcclxuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZEljZUNhbmRpZGF0ZSA9IGZ1bmN0aW9uKGNhbmRpZGF0ZSkge1xyXG4gICAgdmFyIHBjID0gdGhpcztcclxuICAgIHZhciBzZWN0aW9ucztcclxuICAgIGlmIChjYW5kaWRhdGUgJiYgIShjYW5kaWRhdGUuc2RwTUxpbmVJbmRleCAhPT0gdW5kZWZpbmVkIHx8XHJcbiAgICAgICAgY2FuZGlkYXRlLnNkcE1pZCkpIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoJ3NkcE1MaW5lSW5kZXggb3Igc2RwTWlkIHJlcXVpcmVkJykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRPRE86IG5lZWRzIHRvIGdvIGludG8gb3BzIHF1ZXVlLlxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICBpZiAoIXBjLnJlbW90ZURlc2NyaXB0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlamVjdChtYWtlRXJyb3IoJ0ludmFsaWRTdGF0ZUVycm9yJyxcclxuICAgICAgICAgICAgJ0NhbiBub3QgYWRkIElDRSBjYW5kaWRhdGUgd2l0aG91dCBhIHJlbW90ZSBkZXNjcmlwdGlvbicpKTtcclxuICAgICAgfSBlbHNlIGlmICghY2FuZGlkYXRlIHx8IGNhbmRpZGF0ZS5jYW5kaWRhdGUgPT09ICcnKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBwYy50cmFuc2NlaXZlcnMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgIGlmIChwYy50cmFuc2NlaXZlcnNbal0ucmVqZWN0ZWQpIHtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBwYy50cmFuc2NlaXZlcnNbal0uaWNlVHJhbnNwb3J0LmFkZFJlbW90ZUNhbmRpZGF0ZSh7fSk7XHJcbiAgICAgICAgICBzZWN0aW9ucyA9IFNEUFV0aWxzLmdldE1lZGlhU2VjdGlvbnMocGMucmVtb3RlRGVzY3JpcHRpb24uc2RwKTtcclxuICAgICAgICAgIHNlY3Rpb25zW2pdICs9ICdhPWVuZC1vZi1jYW5kaWRhdGVzXFxyXFxuJztcclxuICAgICAgICAgIHBjLnJlbW90ZURlc2NyaXB0aW9uLnNkcCA9XHJcbiAgICAgICAgICAgICAgU0RQVXRpbHMuZ2V0RGVzY3JpcHRpb24ocGMucmVtb3RlRGVzY3JpcHRpb24uc2RwKSArXHJcbiAgICAgICAgICAgICAgc2VjdGlvbnMuam9pbignJyk7XHJcbiAgICAgICAgICBpZiAocGMudXNpbmdCdW5kbGUpIHtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBzZHBNTGluZUluZGV4ID0gY2FuZGlkYXRlLnNkcE1MaW5lSW5kZXg7XHJcbiAgICAgICAgaWYgKGNhbmRpZGF0ZS5zZHBNaWQpIHtcclxuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGMudHJhbnNjZWl2ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChwYy50cmFuc2NlaXZlcnNbaV0ubWlkID09PSBjYW5kaWRhdGUuc2RwTWlkKSB7XHJcbiAgICAgICAgICAgICAgc2RwTUxpbmVJbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHRyYW5zY2VpdmVyID0gcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdO1xyXG4gICAgICAgIGlmICh0cmFuc2NlaXZlcikge1xyXG4gICAgICAgICAgaWYgKHRyYW5zY2VpdmVyLnJlamVjdGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB2YXIgY2FuZCA9IE9iamVjdC5rZXlzKGNhbmRpZGF0ZS5jYW5kaWRhdGUpLmxlbmd0aCA+IDAgP1xyXG4gICAgICAgICAgICAgIFNEUFV0aWxzLnBhcnNlQ2FuZGlkYXRlKGNhbmRpZGF0ZS5jYW5kaWRhdGUpIDoge307XHJcbiAgICAgICAgICAvLyBJZ25vcmUgQ2hyb21lJ3MgaW52YWxpZCBjYW5kaWRhdGVzIHNpbmNlIEVkZ2UgZG9lcyBub3QgbGlrZSB0aGVtLlxyXG4gICAgICAgICAgaWYgKGNhbmQucHJvdG9jb2wgPT09ICd0Y3AnICYmIChjYW5kLnBvcnQgPT09IDAgfHwgY2FuZC5wb3J0ID09PSA5KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgLy8gSWdub3JlIFJUQ1AgY2FuZGlkYXRlcywgd2UgYXNzdW1lIFJUQ1AtTVVYLlxyXG4gICAgICAgICAgaWYgKGNhbmQuY29tcG9uZW50ICYmIGNhbmQuY29tcG9uZW50ICE9PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAvLyB3aGVuIHVzaW5nIGJ1bmRsZSwgYXZvaWQgYWRkaW5nIGNhbmRpZGF0ZXMgdG8gdGhlIHdyb25nXHJcbiAgICAgICAgICAvLyBpY2UgdHJhbnNwb3J0LiBBbmQgYXZvaWQgYWRkaW5nIGNhbmRpZGF0ZXMgYWRkZWQgaW4gdGhlIFNEUC5cclxuICAgICAgICAgIGlmIChzZHBNTGluZUluZGV4ID09PSAwIHx8IChzZHBNTGluZUluZGV4ID4gMCAmJlxyXG4gICAgICAgICAgICAgIHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydCAhPT0gcGMudHJhbnNjZWl2ZXJzWzBdLmljZVRyYW5zcG9ydCkpIHtcclxuICAgICAgICAgICAgaWYgKCFtYXliZUFkZENhbmRpZGF0ZSh0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQsIGNhbmQpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChtYWtlRXJyb3IoJ09wZXJhdGlvbkVycm9yJyxcclxuICAgICAgICAgICAgICAgICAgJ0NhbiBub3QgYWRkIElDRSBjYW5kaWRhdGUnKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyB1cGRhdGUgdGhlIHJlbW90ZURlc2NyaXB0aW9uLlxyXG4gICAgICAgICAgdmFyIGNhbmRpZGF0ZVN0cmluZyA9IGNhbmRpZGF0ZS5jYW5kaWRhdGUudHJpbSgpO1xyXG4gICAgICAgICAgaWYgKGNhbmRpZGF0ZVN0cmluZy5pbmRleE9mKCdhPScpID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNhbmRpZGF0ZVN0cmluZyA9IGNhbmRpZGF0ZVN0cmluZy5zdWJzdHIoMik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBzZWN0aW9ucyA9IFNEUFV0aWxzLmdldE1lZGlhU2VjdGlvbnMocGMucmVtb3RlRGVzY3JpcHRpb24uc2RwKTtcclxuICAgICAgICAgIHNlY3Rpb25zW3NkcE1MaW5lSW5kZXhdICs9ICdhPScgK1xyXG4gICAgICAgICAgICAgIChjYW5kLnR5cGUgPyBjYW5kaWRhdGVTdHJpbmcgOiAnZW5kLW9mLWNhbmRpZGF0ZXMnKVxyXG4gICAgICAgICAgICAgICsgJ1xcclxcbic7XHJcbiAgICAgICAgICBwYy5yZW1vdGVEZXNjcmlwdGlvbi5zZHAgPVxyXG4gICAgICAgICAgICAgIFNEUFV0aWxzLmdldERlc2NyaXB0aW9uKHBjLnJlbW90ZURlc2NyaXB0aW9uLnNkcCkgK1xyXG4gICAgICAgICAgICAgIHNlY3Rpb25zLmpvaW4oJycpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gcmVqZWN0KG1ha2VFcnJvcignT3BlcmF0aW9uRXJyb3InLFxyXG4gICAgICAgICAgICAgICdDYW4gbm90IGFkZCBJQ0UgY2FuZGlkYXRlJykpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXNvbHZlKCk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U3RhdHMgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBwcm9taXNlcyA9IFtdO1xyXG4gICAgdGhpcy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xyXG4gICAgICBbJ3J0cFNlbmRlcicsICdydHBSZWNlaXZlcicsICdpY2VHYXRoZXJlcicsICdpY2VUcmFuc3BvcnQnLFxyXG4gICAgICAgICAgJ2R0bHNUcmFuc3BvcnQnXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xyXG4gICAgICAgICAgICBpZiAodHJhbnNjZWl2ZXJbbWV0aG9kXSkge1xyXG4gICAgICAgICAgICAgIHByb21pc2VzLnB1c2godHJhbnNjZWl2ZXJbbWV0aG9kXS5nZXRTdGF0cygpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIHZhciBmaXhTdGF0c1R5cGUgPSBmdW5jdGlvbihzdGF0KSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgaW5ib3VuZHJ0cDogJ2luYm91bmQtcnRwJyxcclxuICAgICAgICBvdXRib3VuZHJ0cDogJ291dGJvdW5kLXJ0cCcsXHJcbiAgICAgICAgY2FuZGlkYXRlcGFpcjogJ2NhbmRpZGF0ZS1wYWlyJyxcclxuICAgICAgICBsb2NhbGNhbmRpZGF0ZTogJ2xvY2FsLWNhbmRpZGF0ZScsXHJcbiAgICAgICAgcmVtb3RlY2FuZGlkYXRlOiAncmVtb3RlLWNhbmRpZGF0ZSdcclxuICAgICAgfVtzdGF0LnR5cGVdIHx8IHN0YXQudHlwZTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xyXG4gICAgICAvLyBzaGltIGdldFN0YXRzIHdpdGggbWFwbGlrZSBzdXBwb3J0XHJcbiAgICAgIHZhciByZXN1bHRzID0gbmV3IE1hcCgpO1xyXG4gICAgICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICByZXMuZm9yRWFjaChmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgIE9iamVjdC5rZXlzKHJlc3VsdCkuZm9yRWFjaChmdW5jdGlvbihpZCkge1xyXG4gICAgICAgICAgICByZXN1bHRbaWRdLnR5cGUgPSBmaXhTdGF0c1R5cGUocmVzdWx0W2lkXSk7XHJcbiAgICAgICAgICAgIHJlc3VsdHMuc2V0KGlkLCByZXN1bHRbaWRdKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJlc29sdmUocmVzdWx0cyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgLy8gbGVnYWN5IGNhbGxiYWNrIHNoaW1zLiBTaG91bGQgYmUgbW92ZWQgdG8gYWRhcHRlci5qcyBzb21lIGRheXMuXHJcbiAgdmFyIG1ldGhvZHMgPSBbJ2NyZWF0ZU9mZmVyJywgJ2NyZWF0ZUFuc3dlciddO1xyXG4gIG1ldGhvZHMuZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcclxuICAgIHZhciBuYXRpdmVNZXRob2QgPSBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXTtcclxuICAgIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xyXG4gICAgICBpZiAodHlwZW9mIGFyZ3NbMF0gPT09ICdmdW5jdGlvbicgfHxcclxuICAgICAgICAgIHR5cGVvZiBhcmdzWzFdID09PSAnZnVuY3Rpb24nKSB7IC8vIGxlZ2FjeVxyXG4gICAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkodGhpcywgW2FyZ3VtZW50c1syXV0pXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oZGVzY3JpcHRpb24pIHtcclxuICAgICAgICAgIGlmICh0eXBlb2YgYXJnc1swXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICBhcmdzWzBdLmFwcGx5KG51bGwsIFtkZXNjcmlwdGlvbl0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIGFyZ3NbMV0gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgYXJnc1sxXS5hcHBseShudWxsLCBbZXJyb3JdKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xyXG4gIH0pO1xyXG5cclxuICBtZXRob2RzID0gWydzZXRMb2NhbERlc2NyaXB0aW9uJywgJ3NldFJlbW90ZURlc2NyaXB0aW9uJywgJ2FkZEljZUNhbmRpZGF0ZSddO1xyXG4gIG1ldGhvZHMuZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcclxuICAgIHZhciBuYXRpdmVNZXRob2QgPSBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXTtcclxuICAgIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xyXG4gICAgICBpZiAodHlwZW9mIGFyZ3NbMV0gPT09ICdmdW5jdGlvbicgfHxcclxuICAgICAgICAgIHR5cGVvZiBhcmdzWzJdID09PSAnZnVuY3Rpb24nKSB7IC8vIGxlZ2FjeVxyXG4gICAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBhcmdzWzFdID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIGFyZ3NbMV0uYXBwbHkobnVsbCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcclxuICAgICAgICAgIGlmICh0eXBlb2YgYXJnc1syXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICBhcmdzWzJdLmFwcGx5KG51bGwsIFtlcnJvcl0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIH07XHJcbiAgfSk7XHJcblxyXG4gIC8vIGdldFN0YXRzIGlzIHNwZWNpYWwuIEl0IGRvZXNuJ3QgaGF2ZSBhIHNwZWMgbGVnYWN5IG1ldGhvZCB5ZXQgd2Ugc3VwcG9ydFxyXG4gIC8vIGdldFN0YXRzKHNvbWV0aGluZywgY2IpIHdpdGhvdXQgZXJyb3IgY2FsbGJhY2tzLlxyXG4gIFsnZ2V0U3RhdHMnXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xyXG4gICAgdmFyIG5hdGl2ZU1ldGhvZCA9IFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdO1xyXG4gICAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XHJcbiAgICAgIGlmICh0eXBlb2YgYXJnc1sxXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBhcmdzWzFdID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIGFyZ3NbMV0uYXBwbHkobnVsbCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgfTtcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIFJUQ1BlZXJDb25uZWN0aW9uO1xyXG59O1xyXG5cclxufSx7XCJzZHBcIjoyfV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gU0RQIGhlbHBlcnMuXHJcbnZhciBTRFBVdGlscyA9IHt9O1xyXG5cclxuLy8gR2VuZXJhdGUgYW4gYWxwaGFudW1lcmljIGlkZW50aWZpZXIgZm9yIGNuYW1lIG9yIG1pZHMuXHJcbi8vIFRPRE86IHVzZSBVVUlEcyBpbnN0ZWFkPyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9qZWQvOTgyODgzXHJcblNEUFV0aWxzLmdlbmVyYXRlSWRlbnRpZmllciA9IGZ1bmN0aW9uKCkge1xyXG4gIHJldHVybiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgMTApO1xyXG59O1xyXG5cclxuLy8gVGhlIFJUQ1AgQ05BTUUgdXNlZCBieSBhbGwgcGVlcmNvbm5lY3Rpb25zIGZyb20gdGhlIHNhbWUgSlMuXHJcblNEUFV0aWxzLmxvY2FsQ05hbWUgPSBTRFBVdGlscy5nZW5lcmF0ZUlkZW50aWZpZXIoKTtcclxuXHJcbi8vIFNwbGl0cyBTRFAgaW50byBsaW5lcywgZGVhbGluZyB3aXRoIGJvdGggQ1JMRiBhbmQgTEYuXHJcblNEUFV0aWxzLnNwbGl0TGluZXMgPSBmdW5jdGlvbihibG9iKSB7XHJcbiAgcmV0dXJuIGJsb2IudHJpbSgpLnNwbGl0KCdcXG4nKS5tYXAoZnVuY3Rpb24obGluZSkge1xyXG4gICAgcmV0dXJuIGxpbmUudHJpbSgpO1xyXG4gIH0pO1xyXG59O1xyXG4vLyBTcGxpdHMgU0RQIGludG8gc2Vzc2lvbnBhcnQgYW5kIG1lZGlhc2VjdGlvbnMuIEVuc3VyZXMgQ1JMRi5cclxuU0RQVXRpbHMuc3BsaXRTZWN0aW9ucyA9IGZ1bmN0aW9uKGJsb2IpIHtcclxuICB2YXIgcGFydHMgPSBibG9iLnNwbGl0KCdcXG5tPScpO1xyXG4gIHJldHVybiBwYXJ0cy5tYXAoZnVuY3Rpb24ocGFydCwgaW5kZXgpIHtcclxuICAgIHJldHVybiAoaW5kZXggPiAwID8gJ209JyArIHBhcnQgOiBwYXJ0KS50cmltKCkgKyAnXFxyXFxuJztcclxuICB9KTtcclxufTtcclxuXHJcbi8vIHJldHVybnMgdGhlIHNlc3Npb24gZGVzY3JpcHRpb24uXHJcblNEUFV0aWxzLmdldERlc2NyaXB0aW9uID0gZnVuY3Rpb24oYmxvYikge1xyXG4gIHZhciBzZWN0aW9ucyA9IFNEUFV0aWxzLnNwbGl0U2VjdGlvbnMoYmxvYik7XHJcbiAgcmV0dXJuIHNlY3Rpb25zICYmIHNlY3Rpb25zWzBdO1xyXG59O1xyXG5cclxuLy8gcmV0dXJucyB0aGUgaW5kaXZpZHVhbCBtZWRpYSBzZWN0aW9ucy5cclxuU0RQVXRpbHMuZ2V0TWVkaWFTZWN0aW9ucyA9IGZ1bmN0aW9uKGJsb2IpIHtcclxuICB2YXIgc2VjdGlvbnMgPSBTRFBVdGlscy5zcGxpdFNlY3Rpb25zKGJsb2IpO1xyXG4gIHNlY3Rpb25zLnNoaWZ0KCk7XHJcbiAgcmV0dXJuIHNlY3Rpb25zO1xyXG59O1xyXG5cclxuLy8gUmV0dXJucyBsaW5lcyB0aGF0IHN0YXJ0IHdpdGggYSBjZXJ0YWluIHByZWZpeC5cclxuU0RQVXRpbHMubWF0Y2hQcmVmaXggPSBmdW5jdGlvbihibG9iLCBwcmVmaXgpIHtcclxuICByZXR1cm4gU0RQVXRpbHMuc3BsaXRMaW5lcyhibG9iKS5maWx0ZXIoZnVuY3Rpb24obGluZSkge1xyXG4gICAgcmV0dXJuIGxpbmUuaW5kZXhPZihwcmVmaXgpID09PSAwO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuLy8gUGFyc2VzIGFuIElDRSBjYW5kaWRhdGUgbGluZS4gU2FtcGxlIGlucHV0OlxyXG4vLyBjYW5kaWRhdGU6NzAyNzg2MzUwIDIgdWRwIDQxODE5OTAyIDguOC44LjggNjA3NjkgdHlwIHJlbGF5IHJhZGRyIDguOC44LjhcclxuLy8gcnBvcnQgNTU5OTZcIlxyXG5TRFBVdGlscy5wYXJzZUNhbmRpZGF0ZSA9IGZ1bmN0aW9uKGxpbmUpIHtcclxuICB2YXIgcGFydHM7XHJcbiAgLy8gUGFyc2UgYm90aCB2YXJpYW50cy5cclxuICBpZiAobGluZS5pbmRleE9mKCdhPWNhbmRpZGF0ZTonKSA9PT0gMCkge1xyXG4gICAgcGFydHMgPSBsaW5lLnN1YnN0cmluZygxMikuc3BsaXQoJyAnKTtcclxuICB9IGVsc2Uge1xyXG4gICAgcGFydHMgPSBsaW5lLnN1YnN0cmluZygxMCkuc3BsaXQoJyAnKTtcclxuICB9XHJcblxyXG4gIHZhciBjYW5kaWRhdGUgPSB7XHJcbiAgICBmb3VuZGF0aW9uOiBwYXJ0c1swXSxcclxuICAgIGNvbXBvbmVudDogcGFyc2VJbnQocGFydHNbMV0sIDEwKSxcclxuICAgIHByb3RvY29sOiBwYXJ0c1syXS50b0xvd2VyQ2FzZSgpLFxyXG4gICAgcHJpb3JpdHk6IHBhcnNlSW50KHBhcnRzWzNdLCAxMCksXHJcbiAgICBpcDogcGFydHNbNF0sXHJcbiAgICBwb3J0OiBwYXJzZUludChwYXJ0c1s1XSwgMTApLFxyXG4gICAgLy8gc2tpcCBwYXJ0c1s2XSA9PSAndHlwJ1xyXG4gICAgdHlwZTogcGFydHNbN11cclxuICB9O1xyXG5cclxuICBmb3IgKHZhciBpID0gODsgaSA8IHBhcnRzLmxlbmd0aDsgaSArPSAyKSB7XHJcbiAgICBzd2l0Y2ggKHBhcnRzW2ldKSB7XHJcbiAgICAgIGNhc2UgJ3JhZGRyJzpcclxuICAgICAgICBjYW5kaWRhdGUucmVsYXRlZEFkZHJlc3MgPSBwYXJ0c1tpICsgMV07XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3Jwb3J0JzpcclxuICAgICAgICBjYW5kaWRhdGUucmVsYXRlZFBvcnQgPSBwYXJzZUludChwYXJ0c1tpICsgMV0sIDEwKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAndGNwdHlwZSc6XHJcbiAgICAgICAgY2FuZGlkYXRlLnRjcFR5cGUgPSBwYXJ0c1tpICsgMV07XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3VmcmFnJzpcclxuICAgICAgICBjYW5kaWRhdGUudWZyYWcgPSBwYXJ0c1tpICsgMV07IC8vIGZvciBiYWNrd2FyZCBjb21wYWJpbGl0eS5cclxuICAgICAgICBjYW5kaWRhdGUudXNlcm5hbWVGcmFnbWVudCA9IHBhcnRzW2kgKyAxXTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDogLy8gZXh0ZW5zaW9uIGhhbmRsaW5nLCBpbiBwYXJ0aWN1bGFyIHVmcmFnXHJcbiAgICAgICAgY2FuZGlkYXRlW3BhcnRzW2ldXSA9IHBhcnRzW2kgKyAxXTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIGNhbmRpZGF0ZTtcclxufTtcclxuXHJcbi8vIFRyYW5zbGF0ZXMgYSBjYW5kaWRhdGUgb2JqZWN0IGludG8gU0RQIGNhbmRpZGF0ZSBhdHRyaWJ1dGUuXHJcblNEUFV0aWxzLndyaXRlQ2FuZGlkYXRlID0gZnVuY3Rpb24oY2FuZGlkYXRlKSB7XHJcbiAgdmFyIHNkcCA9IFtdO1xyXG4gIHNkcC5wdXNoKGNhbmRpZGF0ZS5mb3VuZGF0aW9uKTtcclxuICBzZHAucHVzaChjYW5kaWRhdGUuY29tcG9uZW50KTtcclxuICBzZHAucHVzaChjYW5kaWRhdGUucHJvdG9jb2wudG9VcHBlckNhc2UoKSk7XHJcbiAgc2RwLnB1c2goY2FuZGlkYXRlLnByaW9yaXR5KTtcclxuICBzZHAucHVzaChjYW5kaWRhdGUuaXApO1xyXG4gIHNkcC5wdXNoKGNhbmRpZGF0ZS5wb3J0KTtcclxuXHJcbiAgdmFyIHR5cGUgPSBjYW5kaWRhdGUudHlwZTtcclxuICBzZHAucHVzaCgndHlwJyk7XHJcbiAgc2RwLnB1c2godHlwZSk7XHJcbiAgaWYgKHR5cGUgIT09ICdob3N0JyAmJiBjYW5kaWRhdGUucmVsYXRlZEFkZHJlc3MgJiZcclxuICAgICAgY2FuZGlkYXRlLnJlbGF0ZWRQb3J0KSB7XHJcbiAgICBzZHAucHVzaCgncmFkZHInKTtcclxuICAgIHNkcC5wdXNoKGNhbmRpZGF0ZS5yZWxhdGVkQWRkcmVzcyk7IC8vIHdhczogcmVsQWRkclxyXG4gICAgc2RwLnB1c2goJ3Jwb3J0Jyk7XHJcbiAgICBzZHAucHVzaChjYW5kaWRhdGUucmVsYXRlZFBvcnQpOyAvLyB3YXM6IHJlbFBvcnRcclxuICB9XHJcbiAgaWYgKGNhbmRpZGF0ZS50Y3BUeXBlICYmIGNhbmRpZGF0ZS5wcm90b2NvbC50b0xvd2VyQ2FzZSgpID09PSAndGNwJykge1xyXG4gICAgc2RwLnB1c2goJ3RjcHR5cGUnKTtcclxuICAgIHNkcC5wdXNoKGNhbmRpZGF0ZS50Y3BUeXBlKTtcclxuICB9XHJcbiAgaWYgKGNhbmRpZGF0ZS51c2VybmFtZUZyYWdtZW50IHx8IGNhbmRpZGF0ZS51ZnJhZykge1xyXG4gICAgc2RwLnB1c2goJ3VmcmFnJyk7XHJcbiAgICBzZHAucHVzaChjYW5kaWRhdGUudXNlcm5hbWVGcmFnbWVudCB8fCBjYW5kaWRhdGUudWZyYWcpO1xyXG4gIH1cclxuICByZXR1cm4gJ2NhbmRpZGF0ZTonICsgc2RwLmpvaW4oJyAnKTtcclxufTtcclxuXHJcbi8vIFBhcnNlcyBhbiBpY2Utb3B0aW9ucyBsaW5lLCByZXR1cm5zIGFuIGFycmF5IG9mIG9wdGlvbiB0YWdzLlxyXG4vLyBhPWljZS1vcHRpb25zOmZvbyBiYXJcclxuU0RQVXRpbHMucGFyc2VJY2VPcHRpb25zID0gZnVuY3Rpb24obGluZSkge1xyXG4gIHJldHVybiBsaW5lLnN1YnN0cigxNCkuc3BsaXQoJyAnKTtcclxufVxyXG5cclxuLy8gUGFyc2VzIGFuIHJ0cG1hcCBsaW5lLCByZXR1cm5zIFJUQ1J0cENvZGRlY1BhcmFtZXRlcnMuIFNhbXBsZSBpbnB1dDpcclxuLy8gYT1ydHBtYXA6MTExIG9wdXMvNDgwMDAvMlxyXG5TRFBVdGlscy5wYXJzZVJ0cE1hcCA9IGZ1bmN0aW9uKGxpbmUpIHtcclxuICB2YXIgcGFydHMgPSBsaW5lLnN1YnN0cig5KS5zcGxpdCgnICcpO1xyXG4gIHZhciBwYXJzZWQgPSB7XHJcbiAgICBwYXlsb2FkVHlwZTogcGFyc2VJbnQocGFydHMuc2hpZnQoKSwgMTApIC8vIHdhczogaWRcclxuICB9O1xyXG5cclxuICBwYXJ0cyA9IHBhcnRzWzBdLnNwbGl0KCcvJyk7XHJcblxyXG4gIHBhcnNlZC5uYW1lID0gcGFydHNbMF07XHJcbiAgcGFyc2VkLmNsb2NrUmF0ZSA9IHBhcnNlSW50KHBhcnRzWzFdLCAxMCk7IC8vIHdhczogY2xvY2tyYXRlXHJcbiAgLy8gd2FzOiBjaGFubmVsc1xyXG4gIHBhcnNlZC5udW1DaGFubmVscyA9IHBhcnRzLmxlbmd0aCA9PT0gMyA/IHBhcnNlSW50KHBhcnRzWzJdLCAxMCkgOiAxO1xyXG4gIHJldHVybiBwYXJzZWQ7XHJcbn07XHJcblxyXG4vLyBHZW5lcmF0ZSBhbiBhPXJ0cG1hcCBsaW5lIGZyb20gUlRDUnRwQ29kZWNDYXBhYmlsaXR5IG9yXHJcbi8vIFJUQ1J0cENvZGVjUGFyYW1ldGVycy5cclxuU0RQVXRpbHMud3JpdGVSdHBNYXAgPSBmdW5jdGlvbihjb2RlYykge1xyXG4gIHZhciBwdCA9IGNvZGVjLnBheWxvYWRUeXBlO1xyXG4gIGlmIChjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBwdCA9IGNvZGVjLnByZWZlcnJlZFBheWxvYWRUeXBlO1xyXG4gIH1cclxuICByZXR1cm4gJ2E9cnRwbWFwOicgKyBwdCArICcgJyArIGNvZGVjLm5hbWUgKyAnLycgKyBjb2RlYy5jbG9ja1JhdGUgK1xyXG4gICAgICAoY29kZWMubnVtQ2hhbm5lbHMgIT09IDEgPyAnLycgKyBjb2RlYy5udW1DaGFubmVscyA6ICcnKSArICdcXHJcXG4nO1xyXG59O1xyXG5cclxuLy8gUGFyc2VzIGFuIGE9ZXh0bWFwIGxpbmUgKGhlYWRlcmV4dGVuc2lvbiBmcm9tIFJGQyA1Mjg1KS4gU2FtcGxlIGlucHV0OlxyXG4vLyBhPWV4dG1hcDoyIHVybjppZXRmOnBhcmFtczpydHAtaGRyZXh0OnRvZmZzZXRcclxuLy8gYT1leHRtYXA6Mi9zZW5kb25seSB1cm46aWV0ZjpwYXJhbXM6cnRwLWhkcmV4dDp0b2Zmc2V0XHJcblNEUFV0aWxzLnBhcnNlRXh0bWFwID0gZnVuY3Rpb24obGluZSkge1xyXG4gIHZhciBwYXJ0cyA9IGxpbmUuc3Vic3RyKDkpLnNwbGl0KCcgJyk7XHJcbiAgcmV0dXJuIHtcclxuICAgIGlkOiBwYXJzZUludChwYXJ0c1swXSwgMTApLFxyXG4gICAgZGlyZWN0aW9uOiBwYXJ0c1swXS5pbmRleE9mKCcvJykgPiAwID8gcGFydHNbMF0uc3BsaXQoJy8nKVsxXSA6ICdzZW5kcmVjdicsXHJcbiAgICB1cmk6IHBhcnRzWzFdXHJcbiAgfTtcclxufTtcclxuXHJcbi8vIEdlbmVyYXRlcyBhPWV4dG1hcCBsaW5lIGZyb20gUlRDUnRwSGVhZGVyRXh0ZW5zaW9uUGFyYW1ldGVycyBvclxyXG4vLyBSVENSdHBIZWFkZXJFeHRlbnNpb24uXHJcblNEUFV0aWxzLndyaXRlRXh0bWFwID0gZnVuY3Rpb24oaGVhZGVyRXh0ZW5zaW9uKSB7XHJcbiAgcmV0dXJuICdhPWV4dG1hcDonICsgKGhlYWRlckV4dGVuc2lvbi5pZCB8fCBoZWFkZXJFeHRlbnNpb24ucHJlZmVycmVkSWQpICtcclxuICAgICAgKGhlYWRlckV4dGVuc2lvbi5kaXJlY3Rpb24gJiYgaGVhZGVyRXh0ZW5zaW9uLmRpcmVjdGlvbiAhPT0gJ3NlbmRyZWN2J1xyXG4gICAgICAgICAgPyAnLycgKyBoZWFkZXJFeHRlbnNpb24uZGlyZWN0aW9uXHJcbiAgICAgICAgICA6ICcnKSArXHJcbiAgICAgICcgJyArIGhlYWRlckV4dGVuc2lvbi51cmkgKyAnXFxyXFxuJztcclxufTtcclxuXHJcbi8vIFBhcnNlcyBhbiBmdG1wIGxpbmUsIHJldHVybnMgZGljdGlvbmFyeS4gU2FtcGxlIGlucHV0OlxyXG4vLyBhPWZtdHA6OTYgdmJyPW9uO2NuZz1vblxyXG4vLyBBbHNvIGRlYWxzIHdpdGggdmJyPW9uOyBjbmc9b25cclxuU0RQVXRpbHMucGFyc2VGbXRwID0gZnVuY3Rpb24obGluZSkge1xyXG4gIHZhciBwYXJzZWQgPSB7fTtcclxuICB2YXIga3Y7XHJcbiAgdmFyIHBhcnRzID0gbGluZS5zdWJzdHIobGluZS5pbmRleE9mKCcgJykgKyAxKS5zcGxpdCgnOycpO1xyXG4gIGZvciAodmFyIGogPSAwOyBqIDwgcGFydHMubGVuZ3RoOyBqKyspIHtcclxuICAgIGt2ID0gcGFydHNbal0udHJpbSgpLnNwbGl0KCc9Jyk7XHJcbiAgICBwYXJzZWRba3ZbMF0udHJpbSgpXSA9IGt2WzFdO1xyXG4gIH1cclxuICByZXR1cm4gcGFyc2VkO1xyXG59O1xyXG5cclxuLy8gR2VuZXJhdGVzIGFuIGE9ZnRtcCBsaW5lIGZyb20gUlRDUnRwQ29kZWNDYXBhYmlsaXR5IG9yIFJUQ1J0cENvZGVjUGFyYW1ldGVycy5cclxuU0RQVXRpbHMud3JpdGVGbXRwID0gZnVuY3Rpb24oY29kZWMpIHtcclxuICB2YXIgbGluZSA9ICcnO1xyXG4gIHZhciBwdCA9IGNvZGVjLnBheWxvYWRUeXBlO1xyXG4gIGlmIChjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBwdCA9IGNvZGVjLnByZWZlcnJlZFBheWxvYWRUeXBlO1xyXG4gIH1cclxuICBpZiAoY29kZWMucGFyYW1ldGVycyAmJiBPYmplY3Qua2V5cyhjb2RlYy5wYXJhbWV0ZXJzKS5sZW5ndGgpIHtcclxuICAgIHZhciBwYXJhbXMgPSBbXTtcclxuICAgIE9iamVjdC5rZXlzKGNvZGVjLnBhcmFtZXRlcnMpLmZvckVhY2goZnVuY3Rpb24ocGFyYW0pIHtcclxuICAgICAgcGFyYW1zLnB1c2gocGFyYW0gKyAnPScgKyBjb2RlYy5wYXJhbWV0ZXJzW3BhcmFtXSk7XHJcbiAgICB9KTtcclxuICAgIGxpbmUgKz0gJ2E9Zm10cDonICsgcHQgKyAnICcgKyBwYXJhbXMuam9pbignOycpICsgJ1xcclxcbic7XHJcbiAgfVxyXG4gIHJldHVybiBsaW5lO1xyXG59O1xyXG5cclxuLy8gUGFyc2VzIGFuIHJ0Y3AtZmIgbGluZSwgcmV0dXJucyBSVENQUnRjcEZlZWRiYWNrIG9iamVjdC4gU2FtcGxlIGlucHV0OlxyXG4vLyBhPXJ0Y3AtZmI6OTggbmFjayBycHNpXHJcblNEUFV0aWxzLnBhcnNlUnRjcEZiID0gZnVuY3Rpb24obGluZSkge1xyXG4gIHZhciBwYXJ0cyA9IGxpbmUuc3Vic3RyKGxpbmUuaW5kZXhPZignICcpICsgMSkuc3BsaXQoJyAnKTtcclxuICByZXR1cm4ge1xyXG4gICAgdHlwZTogcGFydHMuc2hpZnQoKSxcclxuICAgIHBhcmFtZXRlcjogcGFydHMuam9pbignICcpXHJcbiAgfTtcclxufTtcclxuLy8gR2VuZXJhdGUgYT1ydGNwLWZiIGxpbmVzIGZyb20gUlRDUnRwQ29kZWNDYXBhYmlsaXR5IG9yIFJUQ1J0cENvZGVjUGFyYW1ldGVycy5cclxuU0RQVXRpbHMud3JpdGVSdGNwRmIgPSBmdW5jdGlvbihjb2RlYykge1xyXG4gIHZhciBsaW5lcyA9ICcnO1xyXG4gIHZhciBwdCA9IGNvZGVjLnBheWxvYWRUeXBlO1xyXG4gIGlmIChjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBwdCA9IGNvZGVjLnByZWZlcnJlZFBheWxvYWRUeXBlO1xyXG4gIH1cclxuICBpZiAoY29kZWMucnRjcEZlZWRiYWNrICYmIGNvZGVjLnJ0Y3BGZWVkYmFjay5sZW5ndGgpIHtcclxuICAgIC8vIEZJWE1FOiBzcGVjaWFsIGhhbmRsaW5nIGZvciB0cnItaW50P1xyXG4gICAgY29kZWMucnRjcEZlZWRiYWNrLmZvckVhY2goZnVuY3Rpb24oZmIpIHtcclxuICAgICAgbGluZXMgKz0gJ2E9cnRjcC1mYjonICsgcHQgKyAnICcgKyBmYi50eXBlICtcclxuICAgICAgKGZiLnBhcmFtZXRlciAmJiBmYi5wYXJhbWV0ZXIubGVuZ3RoID8gJyAnICsgZmIucGFyYW1ldGVyIDogJycpICtcclxuICAgICAgICAgICdcXHJcXG4nO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHJldHVybiBsaW5lcztcclxufTtcclxuXHJcbi8vIFBhcnNlcyBhbiBSRkMgNTU3NiBzc3JjIG1lZGlhIGF0dHJpYnV0ZS4gU2FtcGxlIGlucHV0OlxyXG4vLyBhPXNzcmM6MzczNTkyODU1OSBjbmFtZTpzb21ldGhpbmdcclxuU0RQVXRpbHMucGFyc2VTc3JjTWVkaWEgPSBmdW5jdGlvbihsaW5lKSB7XHJcbiAgdmFyIHNwID0gbGluZS5pbmRleE9mKCcgJyk7XHJcbiAgdmFyIHBhcnRzID0ge1xyXG4gICAgc3NyYzogcGFyc2VJbnQobGluZS5zdWJzdHIoNywgc3AgLSA3KSwgMTApXHJcbiAgfTtcclxuICB2YXIgY29sb24gPSBsaW5lLmluZGV4T2YoJzonLCBzcCk7XHJcbiAgaWYgKGNvbG9uID4gLTEpIHtcclxuICAgIHBhcnRzLmF0dHJpYnV0ZSA9IGxpbmUuc3Vic3RyKHNwICsgMSwgY29sb24gLSBzcCAtIDEpO1xyXG4gICAgcGFydHMudmFsdWUgPSBsaW5lLnN1YnN0cihjb2xvbiArIDEpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBwYXJ0cy5hdHRyaWJ1dGUgPSBsaW5lLnN1YnN0cihzcCArIDEpO1xyXG4gIH1cclxuICByZXR1cm4gcGFydHM7XHJcbn07XHJcblxyXG4vLyBFeHRyYWN0cyB0aGUgTUlEIChSRkMgNTg4OCkgZnJvbSBhIG1lZGlhIHNlY3Rpb24uXHJcbi8vIHJldHVybnMgdGhlIE1JRCBvciB1bmRlZmluZWQgaWYgbm8gbWlkIGxpbmUgd2FzIGZvdW5kLlxyXG5TRFBVdGlscy5nZXRNaWQgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcclxuICB2YXIgbWlkID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1taWQ6JylbMF07XHJcbiAgaWYgKG1pZCkge1xyXG4gICAgcmV0dXJuIG1pZC5zdWJzdHIoNik7XHJcbiAgfVxyXG59XHJcblxyXG5TRFBVdGlscy5wYXJzZUZpbmdlcnByaW50ID0gZnVuY3Rpb24obGluZSkge1xyXG4gIHZhciBwYXJ0cyA9IGxpbmUuc3Vic3RyKDE0KS5zcGxpdCgnICcpO1xyXG4gIHJldHVybiB7XHJcbiAgICBhbGdvcml0aG06IHBhcnRzWzBdLnRvTG93ZXJDYXNlKCksIC8vIGFsZ29yaXRobSBpcyBjYXNlLXNlbnNpdGl2ZSBpbiBFZGdlLlxyXG4gICAgdmFsdWU6IHBhcnRzWzFdXHJcbiAgfTtcclxufTtcclxuXHJcbi8vIEV4dHJhY3RzIERUTFMgcGFyYW1ldGVycyBmcm9tIFNEUCBtZWRpYSBzZWN0aW9uIG9yIHNlc3Npb25wYXJ0LlxyXG4vLyBGSVhNRTogZm9yIGNvbnNpc3RlbmN5IHdpdGggb3RoZXIgZnVuY3Rpb25zIHRoaXMgc2hvdWxkIG9ubHlcclxuLy8gICBnZXQgdGhlIGZpbmdlcnByaW50IGxpbmUgYXMgaW5wdXQuIFNlZSBhbHNvIGdldEljZVBhcmFtZXRlcnMuXHJcblNEUFV0aWxzLmdldER0bHNQYXJhbWV0ZXJzID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uLCBzZXNzaW9ucGFydCkge1xyXG4gIHZhciBsaW5lcyA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiArIHNlc3Npb25wYXJ0LFxyXG4gICAgICAnYT1maW5nZXJwcmludDonKTtcclxuICAvLyBOb3RlOiBhPXNldHVwIGxpbmUgaXMgaWdub3JlZCBzaW5jZSB3ZSB1c2UgdGhlICdhdXRvJyByb2xlLlxyXG4gIC8vIE5vdGUyOiAnYWxnb3JpdGhtJyBpcyBub3QgY2FzZSBzZW5zaXRpdmUgZXhjZXB0IGluIEVkZ2UuXHJcbiAgcmV0dXJuIHtcclxuICAgIHJvbGU6ICdhdXRvJyxcclxuICAgIGZpbmdlcnByaW50czogbGluZXMubWFwKFNEUFV0aWxzLnBhcnNlRmluZ2VycHJpbnQpXHJcbiAgfTtcclxufTtcclxuXHJcbi8vIFNlcmlhbGl6ZXMgRFRMUyBwYXJhbWV0ZXJzIHRvIFNEUC5cclxuU0RQVXRpbHMud3JpdGVEdGxzUGFyYW1ldGVycyA9IGZ1bmN0aW9uKHBhcmFtcywgc2V0dXBUeXBlKSB7XHJcbiAgdmFyIHNkcCA9ICdhPXNldHVwOicgKyBzZXR1cFR5cGUgKyAnXFxyXFxuJztcclxuICBwYXJhbXMuZmluZ2VycHJpbnRzLmZvckVhY2goZnVuY3Rpb24oZnApIHtcclxuICAgIHNkcCArPSAnYT1maW5nZXJwcmludDonICsgZnAuYWxnb3JpdGhtICsgJyAnICsgZnAudmFsdWUgKyAnXFxyXFxuJztcclxuICB9KTtcclxuICByZXR1cm4gc2RwO1xyXG59O1xyXG4vLyBQYXJzZXMgSUNFIGluZm9ybWF0aW9uIGZyb20gU0RQIG1lZGlhIHNlY3Rpb24gb3Igc2Vzc2lvbnBhcnQuXHJcbi8vIEZJWE1FOiBmb3IgY29uc2lzdGVuY3kgd2l0aCBvdGhlciBmdW5jdGlvbnMgdGhpcyBzaG91bGQgb25seVxyXG4vLyAgIGdldCB0aGUgaWNlLXVmcmFnIGFuZCBpY2UtcHdkIGxpbmVzIGFzIGlucHV0LlxyXG5TRFBVdGlscy5nZXRJY2VQYXJhbWV0ZXJzID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uLCBzZXNzaW9ucGFydCkge1xyXG4gIHZhciBsaW5lcyA9IFNEUFV0aWxzLnNwbGl0TGluZXMobWVkaWFTZWN0aW9uKTtcclxuICAvLyBTZWFyY2ggaW4gc2Vzc2lvbiBwYXJ0LCB0b28uXHJcbiAgbGluZXMgPSBsaW5lcy5jb25jYXQoU0RQVXRpbHMuc3BsaXRMaW5lcyhzZXNzaW9ucGFydCkpO1xyXG4gIHZhciBpY2VQYXJhbWV0ZXJzID0ge1xyXG4gICAgdXNlcm5hbWVGcmFnbWVudDogbGluZXMuZmlsdGVyKGZ1bmN0aW9uKGxpbmUpIHtcclxuICAgICAgcmV0dXJuIGxpbmUuaW5kZXhPZignYT1pY2UtdWZyYWc6JykgPT09IDA7XHJcbiAgICB9KVswXS5zdWJzdHIoMTIpLFxyXG4gICAgcGFzc3dvcmQ6IGxpbmVzLmZpbHRlcihmdW5jdGlvbihsaW5lKSB7XHJcbiAgICAgIHJldHVybiBsaW5lLmluZGV4T2YoJ2E9aWNlLXB3ZDonKSA9PT0gMDtcclxuICAgIH0pWzBdLnN1YnN0cigxMClcclxuICB9O1xyXG4gIHJldHVybiBpY2VQYXJhbWV0ZXJzO1xyXG59O1xyXG5cclxuLy8gU2VyaWFsaXplcyBJQ0UgcGFyYW1ldGVycyB0byBTRFAuXHJcblNEUFV0aWxzLndyaXRlSWNlUGFyYW1ldGVycyA9IGZ1bmN0aW9uKHBhcmFtcykge1xyXG4gIHJldHVybiAnYT1pY2UtdWZyYWc6JyArIHBhcmFtcy51c2VybmFtZUZyYWdtZW50ICsgJ1xcclxcbicgK1xyXG4gICAgICAnYT1pY2UtcHdkOicgKyBwYXJhbXMucGFzc3dvcmQgKyAnXFxyXFxuJztcclxufTtcclxuXHJcbi8vIFBhcnNlcyB0aGUgU0RQIG1lZGlhIHNlY3Rpb24gYW5kIHJldHVybnMgUlRDUnRwUGFyYW1ldGVycy5cclxuU0RQVXRpbHMucGFyc2VSdHBQYXJhbWV0ZXJzID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XHJcbiAgdmFyIGRlc2NyaXB0aW9uID0ge1xyXG4gICAgY29kZWNzOiBbXSxcclxuICAgIGhlYWRlckV4dGVuc2lvbnM6IFtdLFxyXG4gICAgZmVjTWVjaGFuaXNtczogW10sXHJcbiAgICBydGNwOiBbXVxyXG4gIH07XHJcbiAgdmFyIGxpbmVzID0gU0RQVXRpbHMuc3BsaXRMaW5lcyhtZWRpYVNlY3Rpb24pO1xyXG4gIHZhciBtbGluZSA9IGxpbmVzWzBdLnNwbGl0KCcgJyk7XHJcbiAgZm9yICh2YXIgaSA9IDM7IGkgPCBtbGluZS5sZW5ndGg7IGkrKykgeyAvLyBmaW5kIGFsbCBjb2RlY3MgZnJvbSBtbGluZVszLi5dXHJcbiAgICB2YXIgcHQgPSBtbGluZVtpXTtcclxuICAgIHZhciBydHBtYXBsaW5lID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgoXHJcbiAgICAgICAgbWVkaWFTZWN0aW9uLCAnYT1ydHBtYXA6JyArIHB0ICsgJyAnKVswXTtcclxuICAgIGlmIChydHBtYXBsaW5lKSB7XHJcbiAgICAgIHZhciBjb2RlYyA9IFNEUFV0aWxzLnBhcnNlUnRwTWFwKHJ0cG1hcGxpbmUpO1xyXG4gICAgICB2YXIgZm10cHMgPSBTRFBVdGlscy5tYXRjaFByZWZpeChcclxuICAgICAgICAgIG1lZGlhU2VjdGlvbiwgJ2E9Zm10cDonICsgcHQgKyAnICcpO1xyXG4gICAgICAvLyBPbmx5IHRoZSBmaXJzdCBhPWZtdHA6PHB0PiBpcyBjb25zaWRlcmVkLlxyXG4gICAgICBjb2RlYy5wYXJhbWV0ZXJzID0gZm10cHMubGVuZ3RoID8gU0RQVXRpbHMucGFyc2VGbXRwKGZtdHBzWzBdKSA6IHt9O1xyXG4gICAgICBjb2RlYy5ydGNwRmVlZGJhY2sgPSBTRFBVdGlscy5tYXRjaFByZWZpeChcclxuICAgICAgICAgIG1lZGlhU2VjdGlvbiwgJ2E9cnRjcC1mYjonICsgcHQgKyAnICcpXHJcbiAgICAgICAgLm1hcChTRFBVdGlscy5wYXJzZVJ0Y3BGYik7XHJcbiAgICAgIGRlc2NyaXB0aW9uLmNvZGVjcy5wdXNoKGNvZGVjKTtcclxuICAgICAgLy8gcGFyc2UgRkVDIG1lY2hhbmlzbXMgZnJvbSBydHBtYXAgbGluZXMuXHJcbiAgICAgIHN3aXRjaCAoY29kZWMubmFtZS50b1VwcGVyQ2FzZSgpKSB7XHJcbiAgICAgICAgY2FzZSAnUkVEJzpcclxuICAgICAgICBjYXNlICdVTFBGRUMnOlxyXG4gICAgICAgICAgZGVzY3JpcHRpb24uZmVjTWVjaGFuaXNtcy5wdXNoKGNvZGVjLm5hbWUudG9VcHBlckNhc2UoKSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OiAvLyBvbmx5IFJFRCBhbmQgVUxQRkVDIGFyZSByZWNvZ25pemVkIGFzIEZFQyBtZWNoYW5pc21zLlxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1leHRtYXA6JykuZm9yRWFjaChmdW5jdGlvbihsaW5lKSB7XHJcbiAgICBkZXNjcmlwdGlvbi5oZWFkZXJFeHRlbnNpb25zLnB1c2goU0RQVXRpbHMucGFyc2VFeHRtYXAobGluZSkpO1xyXG4gIH0pO1xyXG4gIC8vIEZJWE1FOiBwYXJzZSBydGNwLlxyXG4gIHJldHVybiBkZXNjcmlwdGlvbjtcclxufTtcclxuXHJcbi8vIEdlbmVyYXRlcyBwYXJ0cyBvZiB0aGUgU0RQIG1lZGlhIHNlY3Rpb24gZGVzY3JpYmluZyB0aGUgY2FwYWJpbGl0aWVzIC9cclxuLy8gcGFyYW1ldGVycy5cclxuU0RQVXRpbHMud3JpdGVSdHBEZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKGtpbmQsIGNhcHMpIHtcclxuICB2YXIgc2RwID0gJyc7XHJcblxyXG4gIC8vIEJ1aWxkIHRoZSBtbGluZS5cclxuICBzZHAgKz0gJ209JyArIGtpbmQgKyAnICc7XHJcbiAgc2RwICs9IGNhcHMuY29kZWNzLmxlbmd0aCA+IDAgPyAnOScgOiAnMCc7IC8vIHJlamVjdCBpZiBubyBjb2RlY3MuXHJcbiAgc2RwICs9ICcgVURQL1RMUy9SVFAvU0FWUEYgJztcclxuICBzZHAgKz0gY2Fwcy5jb2RlY3MubWFwKGZ1bmN0aW9uKGNvZGVjKSB7XHJcbiAgICBpZiAoY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4gY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY29kZWMucGF5bG9hZFR5cGU7XHJcbiAgfSkuam9pbignICcpICsgJ1xcclxcbic7XHJcblxyXG4gIHNkcCArPSAnYz1JTiBJUDQgMC4wLjAuMFxcclxcbic7XHJcbiAgc2RwICs9ICdhPXJ0Y3A6OSBJTiBJUDQgMC4wLjAuMFxcclxcbic7XHJcblxyXG4gIC8vIEFkZCBhPXJ0cG1hcCBsaW5lcyBmb3IgZWFjaCBjb2RlYy4gQWxzbyBmbXRwIGFuZCBydGNwLWZiLlxyXG4gIGNhcHMuY29kZWNzLmZvckVhY2goZnVuY3Rpb24oY29kZWMpIHtcclxuICAgIHNkcCArPSBTRFBVdGlscy53cml0ZVJ0cE1hcChjb2RlYyk7XHJcbiAgICBzZHAgKz0gU0RQVXRpbHMud3JpdGVGbXRwKGNvZGVjKTtcclxuICAgIHNkcCArPSBTRFBVdGlscy53cml0ZVJ0Y3BGYihjb2RlYyk7XHJcbiAgfSk7XHJcbiAgdmFyIG1heHB0aW1lID0gMDtcclxuICBjYXBzLmNvZGVjcy5mb3JFYWNoKGZ1bmN0aW9uKGNvZGVjKSB7XHJcbiAgICBpZiAoY29kZWMubWF4cHRpbWUgPiBtYXhwdGltZSkge1xyXG4gICAgICBtYXhwdGltZSA9IGNvZGVjLm1heHB0aW1lO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIGlmIChtYXhwdGltZSA+IDApIHtcclxuICAgIHNkcCArPSAnYT1tYXhwdGltZTonICsgbWF4cHRpbWUgKyAnXFxyXFxuJztcclxuICB9XHJcbiAgc2RwICs9ICdhPXJ0Y3AtbXV4XFxyXFxuJztcclxuXHJcbiAgY2Fwcy5oZWFkZXJFeHRlbnNpb25zLmZvckVhY2goZnVuY3Rpb24oZXh0ZW5zaW9uKSB7XHJcbiAgICBzZHAgKz0gU0RQVXRpbHMud3JpdGVFeHRtYXAoZXh0ZW5zaW9uKTtcclxuICB9KTtcclxuICAvLyBGSVhNRTogd3JpdGUgZmVjTWVjaGFuaXNtcy5cclxuICByZXR1cm4gc2RwO1xyXG59O1xyXG5cclxuLy8gUGFyc2VzIHRoZSBTRFAgbWVkaWEgc2VjdGlvbiBhbmQgcmV0dXJucyBhbiBhcnJheSBvZlxyXG4vLyBSVENSdHBFbmNvZGluZ1BhcmFtZXRlcnMuXHJcblNEUFV0aWxzLnBhcnNlUnRwRW5jb2RpbmdQYXJhbWV0ZXJzID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XHJcbiAgdmFyIGVuY29kaW5nUGFyYW1ldGVycyA9IFtdO1xyXG4gIHZhciBkZXNjcmlwdGlvbiA9IFNEUFV0aWxzLnBhcnNlUnRwUGFyYW1ldGVycyhtZWRpYVNlY3Rpb24pO1xyXG4gIHZhciBoYXNSZWQgPSBkZXNjcmlwdGlvbi5mZWNNZWNoYW5pc21zLmluZGV4T2YoJ1JFRCcpICE9PSAtMTtcclxuICB2YXIgaGFzVWxwZmVjID0gZGVzY3JpcHRpb24uZmVjTWVjaGFuaXNtcy5pbmRleE9mKCdVTFBGRUMnKSAhPT0gLTE7XHJcblxyXG4gIC8vIGZpbHRlciBhPXNzcmM6Li4uIGNuYW1lOiwgaWdub3JlIFBsYW5CLW1zaWRcclxuICB2YXIgc3NyY3MgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPXNzcmM6JylcclxuICAubWFwKGZ1bmN0aW9uKGxpbmUpIHtcclxuICAgIHJldHVybiBTRFBVdGlscy5wYXJzZVNzcmNNZWRpYShsaW5lKTtcclxuICB9KVxyXG4gIC5maWx0ZXIoZnVuY3Rpb24ocGFydHMpIHtcclxuICAgIHJldHVybiBwYXJ0cy5hdHRyaWJ1dGUgPT09ICdjbmFtZSc7XHJcbiAgfSk7XHJcbiAgdmFyIHByaW1hcnlTc3JjID0gc3NyY3MubGVuZ3RoID4gMCAmJiBzc3Jjc1swXS5zc3JjO1xyXG4gIHZhciBzZWNvbmRhcnlTc3JjO1xyXG5cclxuICB2YXIgZmxvd3MgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPXNzcmMtZ3JvdXA6RklEJylcclxuICAubWFwKGZ1bmN0aW9uKGxpbmUpIHtcclxuICAgIHZhciBwYXJ0cyA9IGxpbmUuc3BsaXQoJyAnKTtcclxuICAgIHBhcnRzLnNoaWZ0KCk7XHJcbiAgICByZXR1cm4gcGFydHMubWFwKGZ1bmN0aW9uKHBhcnQpIHtcclxuICAgICAgcmV0dXJuIHBhcnNlSW50KHBhcnQsIDEwKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGlmIChmbG93cy5sZW5ndGggPiAwICYmIGZsb3dzWzBdLmxlbmd0aCA+IDEgJiYgZmxvd3NbMF1bMF0gPT09IHByaW1hcnlTc3JjKSB7XHJcbiAgICBzZWNvbmRhcnlTc3JjID0gZmxvd3NbMF1bMV07XHJcbiAgfVxyXG5cclxuICBkZXNjcmlwdGlvbi5jb2RlY3MuZm9yRWFjaChmdW5jdGlvbihjb2RlYykge1xyXG4gICAgaWYgKGNvZGVjLm5hbWUudG9VcHBlckNhc2UoKSA9PT0gJ1JUWCcgJiYgY29kZWMucGFyYW1ldGVycy5hcHQpIHtcclxuICAgICAgdmFyIGVuY1BhcmFtID0ge1xyXG4gICAgICAgIHNzcmM6IHByaW1hcnlTc3JjLFxyXG4gICAgICAgIGNvZGVjUGF5bG9hZFR5cGU6IHBhcnNlSW50KGNvZGVjLnBhcmFtZXRlcnMuYXB0LCAxMCksXHJcbiAgICAgICAgcnR4OiB7XHJcbiAgICAgICAgICBzc3JjOiBzZWNvbmRhcnlTc3JjXHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgICBlbmNvZGluZ1BhcmFtZXRlcnMucHVzaChlbmNQYXJhbSk7XHJcbiAgICAgIGlmIChoYXNSZWQpIHtcclxuICAgICAgICBlbmNQYXJhbSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZW5jUGFyYW0pKTtcclxuICAgICAgICBlbmNQYXJhbS5mZWMgPSB7XHJcbiAgICAgICAgICBzc3JjOiBzZWNvbmRhcnlTc3JjLFxyXG4gICAgICAgICAgbWVjaGFuaXNtOiBoYXNVbHBmZWMgPyAncmVkK3VscGZlYycgOiAncmVkJ1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgZW5jb2RpbmdQYXJhbWV0ZXJzLnB1c2goZW5jUGFyYW0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgaWYgKGVuY29kaW5nUGFyYW1ldGVycy5sZW5ndGggPT09IDAgJiYgcHJpbWFyeVNzcmMpIHtcclxuICAgIGVuY29kaW5nUGFyYW1ldGVycy5wdXNoKHtcclxuICAgICAgc3NyYzogcHJpbWFyeVNzcmNcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gd2Ugc3VwcG9ydCBib3RoIGI9QVMgYW5kIGI9VElBUyBidXQgaW50ZXJwcmV0IEFTIGFzIFRJQVMuXHJcbiAgdmFyIGJhbmR3aWR0aCA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2I9Jyk7XHJcbiAgaWYgKGJhbmR3aWR0aC5sZW5ndGgpIHtcclxuICAgIGlmIChiYW5kd2lkdGhbMF0uaW5kZXhPZignYj1USUFTOicpID09PSAwKSB7XHJcbiAgICAgIGJhbmR3aWR0aCA9IHBhcnNlSW50KGJhbmR3aWR0aFswXS5zdWJzdHIoNyksIDEwKTtcclxuICAgIH0gZWxzZSBpZiAoYmFuZHdpZHRoWzBdLmluZGV4T2YoJ2I9QVM6JykgPT09IDApIHtcclxuICAgICAgLy8gdXNlIGZvcm11bGEgZnJvbSBKU0VQIHRvIGNvbnZlcnQgYj1BUyB0byBUSUFTIHZhbHVlLlxyXG4gICAgICBiYW5kd2lkdGggPSBwYXJzZUludChiYW5kd2lkdGhbMF0uc3Vic3RyKDUpLCAxMCkgKiAxMDAwICogMC45NVxyXG4gICAgICAgICAgLSAoNTAgKiA0MCAqIDgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYmFuZHdpZHRoID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgZW5jb2RpbmdQYXJhbWV0ZXJzLmZvckVhY2goZnVuY3Rpb24ocGFyYW1zKSB7XHJcbiAgICAgIHBhcmFtcy5tYXhCaXRyYXRlID0gYmFuZHdpZHRoO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHJldHVybiBlbmNvZGluZ1BhcmFtZXRlcnM7XHJcbn07XHJcblxyXG4vLyBwYXJzZXMgaHR0cDovL2RyYWZ0Lm9ydGMub3JnLyNydGNydGNwcGFyYW1ldGVycypcclxuU0RQVXRpbHMucGFyc2VSdGNwUGFyYW1ldGVycyA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbikge1xyXG4gIHZhciBydGNwUGFyYW1ldGVycyA9IHt9O1xyXG5cclxuICB2YXIgY25hbWU7XHJcbiAgLy8gR2V0cyB0aGUgZmlyc3QgU1NSQy4gTm90ZSB0aGF0IHdpdGggUlRYIHRoZXJlIG1pZ2h0IGJlIG11bHRpcGxlXHJcbiAgLy8gU1NSQ3MuXHJcbiAgdmFyIHJlbW90ZVNzcmMgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPXNzcmM6JylcclxuICAgICAgLm1hcChmdW5jdGlvbihsaW5lKSB7XHJcbiAgICAgICAgcmV0dXJuIFNEUFV0aWxzLnBhcnNlU3NyY01lZGlhKGxpbmUpO1xyXG4gICAgICB9KVxyXG4gICAgICAuZmlsdGVyKGZ1bmN0aW9uKG9iaikge1xyXG4gICAgICAgIHJldHVybiBvYmouYXR0cmlidXRlID09PSAnY25hbWUnO1xyXG4gICAgICB9KVswXTtcclxuICBpZiAocmVtb3RlU3NyYykge1xyXG4gICAgcnRjcFBhcmFtZXRlcnMuY25hbWUgPSByZW1vdGVTc3JjLnZhbHVlO1xyXG4gICAgcnRjcFBhcmFtZXRlcnMuc3NyYyA9IHJlbW90ZVNzcmMuc3NyYztcclxuICB9XHJcblxyXG4gIC8vIEVkZ2UgdXNlcyB0aGUgY29tcG91bmQgYXR0cmlidXRlIGluc3RlYWQgb2YgcmVkdWNlZFNpemVcclxuICAvLyBjb21wb3VuZCBpcyAhcmVkdWNlZFNpemVcclxuICB2YXIgcnNpemUgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPXJ0Y3AtcnNpemUnKTtcclxuICBydGNwUGFyYW1ldGVycy5yZWR1Y2VkU2l6ZSA9IHJzaXplLmxlbmd0aCA+IDA7XHJcbiAgcnRjcFBhcmFtZXRlcnMuY29tcG91bmQgPSByc2l6ZS5sZW5ndGggPT09IDA7XHJcblxyXG4gIC8vIHBhcnNlcyB0aGUgcnRjcC1tdXggYXR0ctGWYnV0ZS5cclxuICAvLyBOb3RlIHRoYXQgRWRnZSBkb2VzIG5vdCBzdXBwb3J0IHVubXV4ZWQgUlRDUC5cclxuICB2YXIgbXV4ID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1ydGNwLW11eCcpO1xyXG4gIHJ0Y3BQYXJhbWV0ZXJzLm11eCA9IG11eC5sZW5ndGggPiAwO1xyXG5cclxuICByZXR1cm4gcnRjcFBhcmFtZXRlcnM7XHJcbn07XHJcblxyXG4vLyBwYXJzZXMgZWl0aGVyIGE9bXNpZDogb3IgYT1zc3JjOi4uLiBtc2lkIGxpbmVzIGFuZCByZXR1cm5zXHJcbi8vIHRoZSBpZCBvZiB0aGUgTWVkaWFTdHJlYW0gYW5kIE1lZGlhU3RyZWFtVHJhY2suXHJcblNEUFV0aWxzLnBhcnNlTXNpZCA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbikge1xyXG4gIHZhciBwYXJ0cztcclxuICB2YXIgc3BlYyA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9bXNpZDonKTtcclxuICBpZiAoc3BlYy5sZW5ndGggPT09IDEpIHtcclxuICAgIHBhcnRzID0gc3BlY1swXS5zdWJzdHIoNykuc3BsaXQoJyAnKTtcclxuICAgIHJldHVybiB7c3RyZWFtOiBwYXJ0c1swXSwgdHJhY2s6IHBhcnRzWzFdfTtcclxuICB9XHJcbiAgdmFyIHBsYW5CID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1zc3JjOicpXHJcbiAgLm1hcChmdW5jdGlvbihsaW5lKSB7XHJcbiAgICByZXR1cm4gU0RQVXRpbHMucGFyc2VTc3JjTWVkaWEobGluZSk7XHJcbiAgfSlcclxuICAuZmlsdGVyKGZ1bmN0aW9uKHBhcnRzKSB7XHJcbiAgICByZXR1cm4gcGFydHMuYXR0cmlidXRlID09PSAnbXNpZCc7XHJcbiAgfSk7XHJcbiAgaWYgKHBsYW5CLmxlbmd0aCA+IDApIHtcclxuICAgIHBhcnRzID0gcGxhbkJbMF0udmFsdWUuc3BsaXQoJyAnKTtcclxuICAgIHJldHVybiB7c3RyZWFtOiBwYXJ0c1swXSwgdHJhY2s6IHBhcnRzWzFdfTtcclxuICB9XHJcbn07XHJcblxyXG4vLyBHZW5lcmF0ZSBhIHNlc3Npb24gSUQgZm9yIFNEUC5cclxuLy8gaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL2RyYWZ0LWlldGYtcnRjd2ViLWpzZXAtMjAjc2VjdGlvbi01LjIuMVxyXG4vLyByZWNvbW1lbmRzIHVzaW5nIGEgY3J5cHRvZ3JhcGhpY2FsbHkgcmFuZG9tICt2ZSA2NC1iaXQgdmFsdWVcclxuLy8gYnV0IHJpZ2h0IG5vdyB0aGlzIHNob3VsZCBiZSBhY2NlcHRhYmxlIGFuZCB3aXRoaW4gdGhlIHJpZ2h0IHJhbmdlXHJcblNEUFV0aWxzLmdlbmVyYXRlU2Vzc2lvbklkID0gZnVuY3Rpb24oKSB7XHJcbiAgcmV0dXJuIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKS5zdWJzdHIoMiwgMjEpO1xyXG59O1xyXG5cclxuLy8gV3JpdGUgYm9pbGRlciBwbGF0ZSBmb3Igc3RhcnQgb2YgU0RQXHJcbi8vIHNlc3NJZCBhcmd1bWVudCBpcyBvcHRpb25hbCAtIGlmIG5vdCBzdXBwbGllZCBpdCB3aWxsXHJcbi8vIGJlIGdlbmVyYXRlZCByYW5kb21seVxyXG4vLyBzZXNzVmVyc2lvbiBpcyBvcHRpb25hbCBhbmQgZGVmYXVsdHMgdG8gMlxyXG5TRFBVdGlscy53cml0ZVNlc3Npb25Cb2lsZXJwbGF0ZSA9IGZ1bmN0aW9uKHNlc3NJZCwgc2Vzc1Zlcikge1xyXG4gIHZhciBzZXNzaW9uSWQ7XHJcbiAgdmFyIHZlcnNpb24gPSBzZXNzVmVyICE9PSB1bmRlZmluZWQgPyBzZXNzVmVyIDogMjtcclxuICBpZiAoc2Vzc0lkKSB7XHJcbiAgICBzZXNzaW9uSWQgPSBzZXNzSWQ7XHJcbiAgfSBlbHNlIHtcclxuICAgIHNlc3Npb25JZCA9IFNEUFV0aWxzLmdlbmVyYXRlU2Vzc2lvbklkKCk7XHJcbiAgfVxyXG4gIC8vIEZJWE1FOiBzZXNzLWlkIHNob3VsZCBiZSBhbiBOVFAgdGltZXN0YW1wLlxyXG4gIHJldHVybiAndj0wXFxyXFxuJyArXHJcbiAgICAgICdvPXRoaXNpc2FkYXB0ZXJvcnRjICcgKyBzZXNzaW9uSWQgKyAnICcgKyB2ZXJzaW9uICsgJyBJTiBJUDQgMTI3LjAuMC4xXFxyXFxuJyArXHJcbiAgICAgICdzPS1cXHJcXG4nICtcclxuICAgICAgJ3Q9MCAwXFxyXFxuJztcclxufTtcclxuXHJcblNEUFV0aWxzLndyaXRlTWVkaWFTZWN0aW9uID0gZnVuY3Rpb24odHJhbnNjZWl2ZXIsIGNhcHMsIHR5cGUsIHN0cmVhbSkge1xyXG4gIHZhciBzZHAgPSBTRFBVdGlscy53cml0ZVJ0cERlc2NyaXB0aW9uKHRyYW5zY2VpdmVyLmtpbmQsIGNhcHMpO1xyXG5cclxuICAvLyBNYXAgSUNFIHBhcmFtZXRlcnMgKHVmcmFnLCBwd2QpIHRvIFNEUC5cclxuICBzZHAgKz0gU0RQVXRpbHMud3JpdGVJY2VQYXJhbWV0ZXJzKFxyXG4gICAgICB0cmFuc2NlaXZlci5pY2VHYXRoZXJlci5nZXRMb2NhbFBhcmFtZXRlcnMoKSk7XHJcblxyXG4gIC8vIE1hcCBEVExTIHBhcmFtZXRlcnMgdG8gU0RQLlxyXG4gIHNkcCArPSBTRFBVdGlscy53cml0ZUR0bHNQYXJhbWV0ZXJzKFxyXG4gICAgICB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0LmdldExvY2FsUGFyYW1ldGVycygpLFxyXG4gICAgICB0eXBlID09PSAnb2ZmZXInID8gJ2FjdHBhc3MnIDogJ2FjdGl2ZScpO1xyXG5cclxuICBzZHAgKz0gJ2E9bWlkOicgKyB0cmFuc2NlaXZlci5taWQgKyAnXFxyXFxuJztcclxuXHJcbiAgaWYgKHRyYW5zY2VpdmVyLmRpcmVjdGlvbikge1xyXG4gICAgc2RwICs9ICdhPScgKyB0cmFuc2NlaXZlci5kaXJlY3Rpb24gKyAnXFxyXFxuJztcclxuICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlciAmJiB0cmFuc2NlaXZlci5ydHBSZWNlaXZlcikge1xyXG4gICAgc2RwICs9ICdhPXNlbmRyZWN2XFxyXFxuJztcclxuICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlcikge1xyXG4gICAgc2RwICs9ICdhPXNlbmRvbmx5XFxyXFxuJztcclxuICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyKSB7XHJcbiAgICBzZHAgKz0gJ2E9cmVjdm9ubHlcXHJcXG4nO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBzZHAgKz0gJ2E9aW5hY3RpdmVcXHJcXG4nO1xyXG4gIH1cclxuXHJcbiAgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlcikge1xyXG4gICAgLy8gc3BlYy5cclxuICAgIHZhciBtc2lkID0gJ21zaWQ6JyArIHN0cmVhbS5pZCArICcgJyArXHJcbiAgICAgICAgdHJhbnNjZWl2ZXIucnRwU2VuZGVyLnRyYWNrLmlkICsgJ1xcclxcbic7XHJcbiAgICBzZHAgKz0gJ2E9JyArIG1zaWQ7XHJcblxyXG4gICAgLy8gZm9yIENocm9tZS5cclxuICAgIHNkcCArPSAnYT1zc3JjOicgKyB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmMgK1xyXG4gICAgICAgICcgJyArIG1zaWQ7XHJcbiAgICBpZiAodHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHgpIHtcclxuICAgICAgc2RwICs9ICdhPXNzcmM6JyArIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4LnNzcmMgK1xyXG4gICAgICAgICAgJyAnICsgbXNpZDtcclxuICAgICAgc2RwICs9ICdhPXNzcmMtZ3JvdXA6RklEICcgK1xyXG4gICAgICAgICAgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjICsgJyAnICtcclxuICAgICAgICAgIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4LnNzcmMgK1xyXG4gICAgICAgICAgJ1xcclxcbic7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8vIEZJWE1FOiB0aGlzIHNob3VsZCBiZSB3cml0dGVuIGJ5IHdyaXRlUnRwRGVzY3JpcHRpb24uXHJcbiAgc2RwICs9ICdhPXNzcmM6JyArIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYyArXHJcbiAgICAgICcgY25hbWU6JyArIFNEUFV0aWxzLmxvY2FsQ05hbWUgKyAnXFxyXFxuJztcclxuICBpZiAodHJhbnNjZWl2ZXIucnRwU2VuZGVyICYmIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4KSB7XHJcbiAgICBzZHAgKz0gJ2E9c3NyYzonICsgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHguc3NyYyArXHJcbiAgICAgICAgJyBjbmFtZTonICsgU0RQVXRpbHMubG9jYWxDTmFtZSArICdcXHJcXG4nO1xyXG4gIH1cclxuICByZXR1cm4gc2RwO1xyXG59O1xyXG5cclxuLy8gR2V0cyB0aGUgZGlyZWN0aW9uIGZyb20gdGhlIG1lZGlhU2VjdGlvbiBvciB0aGUgc2Vzc2lvbnBhcnQuXHJcblNEUFV0aWxzLmdldERpcmVjdGlvbiA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbiwgc2Vzc2lvbnBhcnQpIHtcclxuICAvLyBMb29rIGZvciBzZW5kcmVjdiwgc2VuZG9ubHksIHJlY3Zvbmx5LCBpbmFjdGl2ZSwgZGVmYXVsdCB0byBzZW5kcmVjdi5cclxuICB2YXIgbGluZXMgPSBTRFBVdGlscy5zcGxpdExpbmVzKG1lZGlhU2VjdGlvbik7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgc3dpdGNoIChsaW5lc1tpXSkge1xyXG4gICAgICBjYXNlICdhPXNlbmRyZWN2JzpcclxuICAgICAgY2FzZSAnYT1zZW5kb25seSc6XHJcbiAgICAgIGNhc2UgJ2E9cmVjdm9ubHknOlxyXG4gICAgICBjYXNlICdhPWluYWN0aXZlJzpcclxuICAgICAgICByZXR1cm4gbGluZXNbaV0uc3Vic3RyKDIpO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIC8vIEZJWE1FOiBXaGF0IHNob3VsZCBoYXBwZW4gaGVyZT9cclxuICAgIH1cclxuICB9XHJcbiAgaWYgKHNlc3Npb25wYXJ0KSB7XHJcbiAgICByZXR1cm4gU0RQVXRpbHMuZ2V0RGlyZWN0aW9uKHNlc3Npb25wYXJ0KTtcclxuICB9XHJcbiAgcmV0dXJuICdzZW5kcmVjdic7XHJcbn07XHJcblxyXG5TRFBVdGlscy5nZXRLaW5kID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XHJcbiAgdmFyIGxpbmVzID0gU0RQVXRpbHMuc3BsaXRMaW5lcyhtZWRpYVNlY3Rpb24pO1xyXG4gIHZhciBtbGluZSA9IGxpbmVzWzBdLnNwbGl0KCcgJyk7XHJcbiAgcmV0dXJuIG1saW5lWzBdLnN1YnN0cigyKTtcclxufTtcclxuXHJcblNEUFV0aWxzLmlzUmVqZWN0ZWQgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcclxuICByZXR1cm4gbWVkaWFTZWN0aW9uLnNwbGl0KCcgJywgMilbMV0gPT09ICcwJztcclxufTtcclxuXHJcblNEUFV0aWxzLnBhcnNlTUxpbmUgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcclxuICB2YXIgbGluZXMgPSBTRFBVdGlscy5zcGxpdExpbmVzKG1lZGlhU2VjdGlvbik7XHJcbiAgdmFyIHBhcnRzID0gbGluZXNbMF0uc3Vic3RyKDIpLnNwbGl0KCcgJyk7XHJcbiAgcmV0dXJuIHtcclxuICAgIGtpbmQ6IHBhcnRzWzBdLFxyXG4gICAgcG9ydDogcGFyc2VJbnQocGFydHNbMV0sIDEwKSxcclxuICAgIHByb3RvY29sOiBwYXJ0c1syXSxcclxuICAgIGZtdDogcGFydHMuc2xpY2UoMykuam9pbignICcpXHJcbiAgfTtcclxufTtcclxuXHJcblNEUFV0aWxzLnBhcnNlT0xpbmUgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcclxuICB2YXIgbGluZSA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ289JylbMF07XHJcbiAgdmFyIHBhcnRzID0gbGluZS5zdWJzdHIoMikuc3BsaXQoJyAnKTtcclxuICByZXR1cm4ge1xyXG4gICAgdXNlcm5hbWU6IHBhcnRzWzBdLFxyXG4gICAgc2Vzc2lvbklkOiBwYXJ0c1sxXSxcclxuICAgIHNlc3Npb25WZXJzaW9uOiBwYXJzZUludChwYXJ0c1syXSwgMTApLFxyXG4gICAgbmV0VHlwZTogcGFydHNbM10sXHJcbiAgICBhZGRyZXNzVHlwZTogcGFydHNbNF0sXHJcbiAgICBhZGRyZXNzOiBwYXJ0c1s1XSxcclxuICB9O1xyXG59XHJcblxyXG4vLyBFeHBvc2UgcHVibGljIG1ldGhvZHMuXHJcbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jykge1xyXG4gIG1vZHVsZS5leHBvcnRzID0gU0RQVXRpbHM7XHJcbn1cclxuXHJcbn0se31dLDM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG4oZnVuY3Rpb24gKGdsb2JhbCl7XHJcbi8qXHJcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXHJcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcclxuICogIHRyZWUuXHJcbiAqL1xyXG4gLyogZXNsaW50LWVudiBub2RlICovXHJcblxyXG4ndXNlIHN0cmljdCc7XHJcblxyXG52YXIgYWRhcHRlckZhY3RvcnkgPSByZXF1aXJlKCcuL2FkYXB0ZXJfZmFjdG9yeS5qcycpO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGFkYXB0ZXJGYWN0b3J5KHt3aW5kb3c6IGdsb2JhbC53aW5kb3d9KTtcclxuXHJcbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxyXG59LHtcIi4vYWRhcHRlcl9mYWN0b3J5LmpzXCI6NH1dLDQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG4vKlxyXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKlxyXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxyXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXHJcbiAqICB0cmVlLlxyXG4gKi9cclxuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xyXG4vLyBTaGltbWluZyBzdGFydHMgaGVyZS5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkZXBlbmRlbmNpZXMsIG9wdHMpIHtcclxuICB2YXIgd2luZG93ID0gZGVwZW5kZW5jaWVzICYmIGRlcGVuZGVuY2llcy53aW5kb3c7XHJcblxyXG4gIHZhciBvcHRpb25zID0ge1xyXG4gICAgc2hpbUNocm9tZTogdHJ1ZSxcclxuICAgIHNoaW1GaXJlZm94OiB0cnVlLFxyXG4gICAgc2hpbUVkZ2U6IHRydWUsXHJcbiAgICBzaGltU2FmYXJpOiB0cnVlLFxyXG4gIH07XHJcblxyXG4gIGZvciAodmFyIGtleSBpbiBvcHRzKSB7XHJcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvcHRzLCBrZXkpKSB7XHJcbiAgICAgIG9wdGlvbnNba2V5XSA9IG9wdHNba2V5XTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIFV0aWxzLlxyXG4gIHZhciBsb2dnaW5nID0gdXRpbHMubG9nO1xyXG4gIHZhciBicm93c2VyRGV0YWlscyA9IHV0aWxzLmRldGVjdEJyb3dzZXIod2luZG93KTtcclxuXHJcbiAgLy8gVW5jb21tZW50IHRoZSBsaW5lIGJlbG93IGlmIHlvdSB3YW50IGxvZ2dpbmcgdG8gb2NjdXIsIGluY2x1ZGluZyBsb2dnaW5nXHJcbiAgLy8gZm9yIHRoZSBzd2l0Y2ggc3RhdGVtZW50IGJlbG93LiBDYW4gYWxzbyBiZSB0dXJuZWQgb24gaW4gdGhlIGJyb3dzZXIgdmlhXHJcbiAgLy8gYWRhcHRlci5kaXNhYmxlTG9nKGZhbHNlKSwgYnV0IHRoZW4gbG9nZ2luZyBmcm9tIHRoZSBzd2l0Y2ggc3RhdGVtZW50IGJlbG93XHJcbiAgLy8gd2lsbCBub3QgYXBwZWFyLlxyXG4gIC8vIHJlcXVpcmUoJy4vdXRpbHMnKS5kaXNhYmxlTG9nKGZhbHNlKTtcclxuXHJcbiAgLy8gQnJvd3NlciBzaGltcy5cclxuICB2YXIgY2hyb21lU2hpbSA9IHJlcXVpcmUoJy4vY2hyb21lL2Nocm9tZV9zaGltJykgfHwgbnVsbDtcclxuICB2YXIgZWRnZVNoaW0gPSByZXF1aXJlKCcuL2VkZ2UvZWRnZV9zaGltJykgfHwgbnVsbDtcclxuICB2YXIgZmlyZWZveFNoaW0gPSByZXF1aXJlKCcuL2ZpcmVmb3gvZmlyZWZveF9zaGltJykgfHwgbnVsbDtcclxuICB2YXIgc2FmYXJpU2hpbSA9IHJlcXVpcmUoJy4vc2FmYXJpL3NhZmFyaV9zaGltJykgfHwgbnVsbDtcclxuICB2YXIgY29tbW9uU2hpbSA9IHJlcXVpcmUoJy4vY29tbW9uX3NoaW0nKSB8fCBudWxsO1xyXG5cclxuICAvLyBFeHBvcnQgdG8gdGhlIGFkYXB0ZXIgZ2xvYmFsIG9iamVjdCB2aXNpYmxlIGluIHRoZSBicm93c2VyLlxyXG4gIHZhciBhZGFwdGVyID0ge1xyXG4gICAgYnJvd3NlckRldGFpbHM6IGJyb3dzZXJEZXRhaWxzLFxyXG4gICAgY29tbW9uU2hpbTogY29tbW9uU2hpbSxcclxuICAgIGV4dHJhY3RWZXJzaW9uOiB1dGlscy5leHRyYWN0VmVyc2lvbixcclxuICAgIGRpc2FibGVMb2c6IHV0aWxzLmRpc2FibGVMb2csXHJcbiAgICBkaXNhYmxlV2FybmluZ3M6IHV0aWxzLmRpc2FibGVXYXJuaW5nc1xyXG4gIH07XHJcblxyXG4gIC8vIFNoaW0gYnJvd3NlciBpZiBmb3VuZC5cclxuICBzd2l0Y2ggKGJyb3dzZXJEZXRhaWxzLmJyb3dzZXIpIHtcclxuICAgIGNhc2UgJ2Nocm9tZSc6XHJcbiAgICAgIGlmICghY2hyb21lU2hpbSB8fCAhY2hyb21lU2hpbS5zaGltUGVlckNvbm5lY3Rpb24gfHxcclxuICAgICAgICAgICFvcHRpb25zLnNoaW1DaHJvbWUpIHtcclxuICAgICAgICBsb2dnaW5nKCdDaHJvbWUgc2hpbSBpcyBub3QgaW5jbHVkZWQgaW4gdGhpcyBhZGFwdGVyIHJlbGVhc2UuJyk7XHJcbiAgICAgICAgcmV0dXJuIGFkYXB0ZXI7XHJcbiAgICAgIH1cclxuICAgICAgbG9nZ2luZygnYWRhcHRlci5qcyBzaGltbWluZyBjaHJvbWUuJyk7XHJcbiAgICAgIC8vIEV4cG9ydCB0byB0aGUgYWRhcHRlciBnbG9iYWwgb2JqZWN0IHZpc2libGUgaW4gdGhlIGJyb3dzZXIuXHJcbiAgICAgIGFkYXB0ZXIuYnJvd3NlclNoaW0gPSBjaHJvbWVTaGltO1xyXG4gICAgICBjb21tb25TaGltLnNoaW1DcmVhdGVPYmplY3RVUkwod2luZG93KTtcclxuXHJcbiAgICAgIGNocm9tZVNoaW0uc2hpbUdldFVzZXJNZWRpYSh3aW5kb3cpO1xyXG4gICAgICBjaHJvbWVTaGltLnNoaW1NZWRpYVN0cmVhbSh3aW5kb3cpO1xyXG4gICAgICBjaHJvbWVTaGltLnNoaW1Tb3VyY2VPYmplY3Qod2luZG93KTtcclxuICAgICAgY2hyb21lU2hpbS5zaGltUGVlckNvbm5lY3Rpb24od2luZG93KTtcclxuICAgICAgY2hyb21lU2hpbS5zaGltT25UcmFjayh3aW5kb3cpO1xyXG4gICAgICBjaHJvbWVTaGltLnNoaW1BZGRUcmFja1JlbW92ZVRyYWNrKHdpbmRvdyk7XHJcbiAgICAgIGNocm9tZVNoaW0uc2hpbUdldFNlbmRlcnNXaXRoRHRtZih3aW5kb3cpO1xyXG5cclxuICAgICAgY29tbW9uU2hpbS5zaGltUlRDSWNlQ2FuZGlkYXRlKHdpbmRvdyk7XHJcbiAgICAgIGNvbW1vblNoaW0uc2hpbU1heE1lc3NhZ2VTaXplKHdpbmRvdyk7XHJcbiAgICAgIGNvbW1vblNoaW0uc2hpbVNlbmRUaHJvd1R5cGVFcnJvcih3aW5kb3cpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ2ZpcmVmb3gnOlxyXG4gICAgICBpZiAoIWZpcmVmb3hTaGltIHx8ICFmaXJlZm94U2hpbS5zaGltUGVlckNvbm5lY3Rpb24gfHxcclxuICAgICAgICAgICFvcHRpb25zLnNoaW1GaXJlZm94KSB7XHJcbiAgICAgICAgbG9nZ2luZygnRmlyZWZveCBzaGltIGlzIG5vdCBpbmNsdWRlZCBpbiB0aGlzIGFkYXB0ZXIgcmVsZWFzZS4nKTtcclxuICAgICAgICByZXR1cm4gYWRhcHRlcjtcclxuICAgICAgfVxyXG4gICAgICBsb2dnaW5nKCdhZGFwdGVyLmpzIHNoaW1taW5nIGZpcmVmb3guJyk7XHJcbiAgICAgIC8vIEV4cG9ydCB0byB0aGUgYWRhcHRlciBnbG9iYWwgb2JqZWN0IHZpc2libGUgaW4gdGhlIGJyb3dzZXIuXHJcbiAgICAgIGFkYXB0ZXIuYnJvd3NlclNoaW0gPSBmaXJlZm94U2hpbTtcclxuICAgICAgY29tbW9uU2hpbS5zaGltQ3JlYXRlT2JqZWN0VVJMKHdpbmRvdyk7XHJcblxyXG4gICAgICBmaXJlZm94U2hpbS5zaGltR2V0VXNlck1lZGlhKHdpbmRvdyk7XHJcbiAgICAgIGZpcmVmb3hTaGltLnNoaW1Tb3VyY2VPYmplY3Qod2luZG93KTtcclxuICAgICAgZmlyZWZveFNoaW0uc2hpbVBlZXJDb25uZWN0aW9uKHdpbmRvdyk7XHJcbiAgICAgIGZpcmVmb3hTaGltLnNoaW1PblRyYWNrKHdpbmRvdyk7XHJcbiAgICAgIGZpcmVmb3hTaGltLnNoaW1SZW1vdmVTdHJlYW0od2luZG93KTtcclxuXHJcbiAgICAgIGNvbW1vblNoaW0uc2hpbVJUQ0ljZUNhbmRpZGF0ZSh3aW5kb3cpO1xyXG4gICAgICBjb21tb25TaGltLnNoaW1NYXhNZXNzYWdlU2l6ZSh3aW5kb3cpO1xyXG4gICAgICBjb21tb25TaGltLnNoaW1TZW5kVGhyb3dUeXBlRXJyb3Iod2luZG93KTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdlZGdlJzpcclxuICAgICAgaWYgKCFlZGdlU2hpbSB8fCAhZWRnZVNoaW0uc2hpbVBlZXJDb25uZWN0aW9uIHx8ICFvcHRpb25zLnNoaW1FZGdlKSB7XHJcbiAgICAgICAgbG9nZ2luZygnTVMgZWRnZSBzaGltIGlzIG5vdCBpbmNsdWRlZCBpbiB0aGlzIGFkYXB0ZXIgcmVsZWFzZS4nKTtcclxuICAgICAgICByZXR1cm4gYWRhcHRlcjtcclxuICAgICAgfVxyXG4gICAgICBsb2dnaW5nKCdhZGFwdGVyLmpzIHNoaW1taW5nIGVkZ2UuJyk7XHJcbiAgICAgIC8vIEV4cG9ydCB0byB0aGUgYWRhcHRlciBnbG9iYWwgb2JqZWN0IHZpc2libGUgaW4gdGhlIGJyb3dzZXIuXHJcbiAgICAgIGFkYXB0ZXIuYnJvd3NlclNoaW0gPSBlZGdlU2hpbTtcclxuICAgICAgY29tbW9uU2hpbS5zaGltQ3JlYXRlT2JqZWN0VVJMKHdpbmRvdyk7XHJcblxyXG4gICAgICBlZGdlU2hpbS5zaGltR2V0VXNlck1lZGlhKHdpbmRvdyk7XHJcbiAgICAgIGVkZ2VTaGltLnNoaW1QZWVyQ29ubmVjdGlvbih3aW5kb3cpO1xyXG4gICAgICBlZGdlU2hpbS5zaGltUmVwbGFjZVRyYWNrKHdpbmRvdyk7XHJcblxyXG4gICAgICAvLyB0aGUgZWRnZSBzaGltIGltcGxlbWVudHMgdGhlIGZ1bGwgUlRDSWNlQ2FuZGlkYXRlIG9iamVjdC5cclxuXHJcbiAgICAgIGNvbW1vblNoaW0uc2hpbU1heE1lc3NhZ2VTaXplKHdpbmRvdyk7XHJcbiAgICAgIGNvbW1vblNoaW0uc2hpbVNlbmRUaHJvd1R5cGVFcnJvcih3aW5kb3cpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ3NhZmFyaSc6XHJcbiAgICAgIGlmICghc2FmYXJpU2hpbSB8fCAhb3B0aW9ucy5zaGltU2FmYXJpKSB7XHJcbiAgICAgICAgbG9nZ2luZygnU2FmYXJpIHNoaW0gaXMgbm90IGluY2x1ZGVkIGluIHRoaXMgYWRhcHRlciByZWxlYXNlLicpO1xyXG4gICAgICAgIHJldHVybiBhZGFwdGVyO1xyXG4gICAgICB9XHJcbiAgICAgIGxvZ2dpbmcoJ2FkYXB0ZXIuanMgc2hpbW1pbmcgc2FmYXJpLicpO1xyXG4gICAgICAvLyBFeHBvcnQgdG8gdGhlIGFkYXB0ZXIgZ2xvYmFsIG9iamVjdCB2aXNpYmxlIGluIHRoZSBicm93c2VyLlxyXG4gICAgICBhZGFwdGVyLmJyb3dzZXJTaGltID0gc2FmYXJpU2hpbTtcclxuICAgICAgY29tbW9uU2hpbS5zaGltQ3JlYXRlT2JqZWN0VVJMKHdpbmRvdyk7XHJcblxyXG4gICAgICBzYWZhcmlTaGltLnNoaW1SVENJY2VTZXJ2ZXJVcmxzKHdpbmRvdyk7XHJcbiAgICAgIHNhZmFyaVNoaW0uc2hpbUNhbGxiYWNrc0FQSSh3aW5kb3cpO1xyXG4gICAgICBzYWZhcmlTaGltLnNoaW1Mb2NhbFN0cmVhbXNBUEkod2luZG93KTtcclxuICAgICAgc2FmYXJpU2hpbS5zaGltUmVtb3RlU3RyZWFtc0FQSSh3aW5kb3cpO1xyXG4gICAgICBzYWZhcmlTaGltLnNoaW1UcmFja0V2ZW50VHJhbnNjZWl2ZXIod2luZG93KTtcclxuICAgICAgc2FmYXJpU2hpbS5zaGltR2V0VXNlck1lZGlhKHdpbmRvdyk7XHJcbiAgICAgIHNhZmFyaVNoaW0uc2hpbUNyZWF0ZU9mZmVyTGVnYWN5KHdpbmRvdyk7XHJcblxyXG4gICAgICBjb21tb25TaGltLnNoaW1SVENJY2VDYW5kaWRhdGUod2luZG93KTtcclxuICAgICAgY29tbW9uU2hpbS5zaGltTWF4TWVzc2FnZVNpemUod2luZG93KTtcclxuICAgICAgY29tbW9uU2hpbS5zaGltU2VuZFRocm93VHlwZUVycm9yKHdpbmRvdyk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgbG9nZ2luZygnVW5zdXBwb3J0ZWQgYnJvd3NlciEnKTtcclxuICAgICAgYnJlYWs7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gYWRhcHRlcjtcclxufTtcclxuXHJcbn0se1wiLi9jaHJvbWUvY2hyb21lX3NoaW1cIjo1LFwiLi9jb21tb25fc2hpbVwiOjcsXCIuL2VkZ2UvZWRnZV9zaGltXCI6OCxcIi4vZmlyZWZveC9maXJlZm94X3NoaW1cIjoxMCxcIi4vc2FmYXJpL3NhZmFyaV9zaGltXCI6MTIsXCIuL3V0aWxzXCI6MTN9XSw1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuXHJcbi8qXHJcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXHJcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcclxuICogIHRyZWUuXHJcbiAqL1xyXG4gLyogZXNsaW50LWVudiBub2RlICovXHJcbid1c2Ugc3RyaWN0JztcclxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMuanMnKTtcclxudmFyIGxvZ2dpbmcgPSB1dGlscy5sb2c7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBzaGltR2V0VXNlck1lZGlhOiByZXF1aXJlKCcuL2dldHVzZXJtZWRpYScpLFxyXG4gIHNoaW1NZWRpYVN0cmVhbTogZnVuY3Rpb24od2luZG93KSB7XHJcbiAgICB3aW5kb3cuTWVkaWFTdHJlYW0gPSB3aW5kb3cuTWVkaWFTdHJlYW0gfHwgd2luZG93LndlYmtpdE1lZGlhU3RyZWFtO1xyXG4gIH0sXHJcblxyXG4gIHNoaW1PblRyYWNrOiBmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gJiYgISgnb250cmFjaycgaW5cclxuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSwgJ29udHJhY2snLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLl9vbnRyYWNrO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbihmKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5fb250cmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYWNrJywgdGhpcy5fb250cmFjayk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYWNrJywgdGhpcy5fb250cmFjayA9IGYpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHZhciBvcmlnU2V0UmVtb3RlRGVzY3JpcHRpb24gPVxyXG4gICAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5zZXRSZW1vdGVEZXNjcmlwdGlvbjtcclxuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5zZXRSZW1vdGVEZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgICAgaWYgKCFwYy5fb250cmFja3BvbHkpIHtcclxuICAgICAgICAgIHBjLl9vbnRyYWNrcG9seSA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgLy8gb25hZGRzdHJlYW0gZG9lcyBub3QgZmlyZSB3aGVuIGEgdHJhY2sgaXMgYWRkZWQgdG8gYW4gZXhpc3RpbmdcclxuICAgICAgICAgICAgLy8gc3RyZWFtLiBCdXQgc3RyZWFtLm9uYWRkdHJhY2sgaXMgaW1wbGVtZW50ZWQgc28gd2UgdXNlIHRoYXQuXHJcbiAgICAgICAgICAgIGUuc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoJ2FkZHRyYWNrJywgZnVuY3Rpb24odGUpIHtcclxuICAgICAgICAgICAgICB2YXIgcmVjZWl2ZXI7XHJcbiAgICAgICAgICAgICAgaWYgKHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0UmVjZWl2ZXJzKSB7XHJcbiAgICAgICAgICAgICAgICByZWNlaXZlciA9IHBjLmdldFJlY2VpdmVycygpLmZpbmQoZnVuY3Rpb24ocikge1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gci50cmFjayAmJiByLnRyYWNrLmlkID09PSB0ZS50cmFjay5pZDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZWNlaXZlciA9IHt0cmFjazogdGUudHJhY2t9O1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCd0cmFjaycpO1xyXG4gICAgICAgICAgICAgIGV2ZW50LnRyYWNrID0gdGUudHJhY2s7XHJcbiAgICAgICAgICAgICAgZXZlbnQucmVjZWl2ZXIgPSByZWNlaXZlcjtcclxuICAgICAgICAgICAgICBldmVudC50cmFuc2NlaXZlciA9IHtyZWNlaXZlcjogcmVjZWl2ZXJ9O1xyXG4gICAgICAgICAgICAgIGV2ZW50LnN0cmVhbXMgPSBbZS5zdHJlYW1dO1xyXG4gICAgICAgICAgICAgIHBjLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZS5zdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xyXG4gICAgICAgICAgICAgIHZhciByZWNlaXZlcjtcclxuICAgICAgICAgICAgICBpZiAod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRSZWNlaXZlcnMpIHtcclxuICAgICAgICAgICAgICAgIHJlY2VpdmVyID0gcGMuZ2V0UmVjZWl2ZXJzKCkuZmluZChmdW5jdGlvbihyKSB7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiByLnRyYWNrICYmIHIudHJhY2suaWQgPT09IHRyYWNrLmlkO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlY2VpdmVyID0ge3RyYWNrOiB0cmFja307XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgndHJhY2snKTtcclxuICAgICAgICAgICAgICBldmVudC50cmFjayA9IHRyYWNrO1xyXG4gICAgICAgICAgICAgIGV2ZW50LnJlY2VpdmVyID0gcmVjZWl2ZXI7XHJcbiAgICAgICAgICAgICAgZXZlbnQudHJhbnNjZWl2ZXIgPSB7cmVjZWl2ZXI6IHJlY2VpdmVyfTtcclxuICAgICAgICAgICAgICBldmVudC5zdHJlYW1zID0gW2Uuc3RyZWFtXTtcclxuICAgICAgICAgICAgICBwYy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgcGMuYWRkRXZlbnRMaXN0ZW5lcignYWRkc3RyZWFtJywgcGMuX29udHJhY2twb2x5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9yaWdTZXRSZW1vdGVEZXNjcmlwdGlvbi5hcHBseShwYywgYXJndW1lbnRzKTtcclxuICAgICAgfTtcclxuICAgIH0gZWxzZSBpZiAoISgnUlRDUnRwVHJhbnNjZWl2ZXInIGluIHdpbmRvdykpIHtcclxuICAgICAgdXRpbHMud3JhcFBlZXJDb25uZWN0aW9uRXZlbnQod2luZG93LCAndHJhY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWYgKCFlLnRyYW5zY2VpdmVyKSB7XHJcbiAgICAgICAgICBlLnRyYW5zY2VpdmVyID0ge3JlY2VpdmVyOiBlLnJlY2VpdmVyfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGU7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHNoaW1HZXRTZW5kZXJzV2l0aER0bWY6IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgLy8gT3ZlcnJpZGVzIGFkZFRyYWNrL3JlbW92ZVRyYWNrLCBkZXBlbmRzIG9uIHNoaW1BZGRUcmFja1JlbW92ZVRyYWNrLlxyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiAmJlxyXG4gICAgICAgICEoJ2dldFNlbmRlcnMnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpICYmXHJcbiAgICAgICAgJ2NyZWF0ZURUTUZTZW5kZXInIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpIHtcclxuICAgICAgdmFyIHNoaW1TZW5kZXJXaXRoRHRtZiA9IGZ1bmN0aW9uKHBjLCB0cmFjaykge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0cmFjazogdHJhY2ssXHJcbiAgICAgICAgICBnZXQgZHRtZigpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2R0bWYgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgIGlmICh0cmFjay5raW5kID09PSAnYXVkaW8nKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kdG1mID0gcGMuY3JlYXRlRFRNRlNlbmRlcih0cmFjayk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2R0bWYgPSBudWxsO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZHRtZjtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBfcGM6IHBjXHJcbiAgICAgICAgfTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIGF1Z21lbnQgYWRkVHJhY2sgd2hlbiBnZXRTZW5kZXJzIGlzIG5vdCBhdmFpbGFibGUuXHJcbiAgICAgIGlmICghd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTZW5kZXJzKSB7XHJcbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTZW5kZXJzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB0aGlzLl9zZW5kZXJzID0gdGhpcy5fc2VuZGVycyB8fCBbXTtcclxuICAgICAgICAgIHJldHVybiB0aGlzLl9zZW5kZXJzLnNsaWNlKCk7IC8vIHJldHVybiBhIGNvcHkgb2YgdGhlIGludGVybmFsIHN0YXRlLlxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIG9yaWdBZGRUcmFjayA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2s7XHJcbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjayA9IGZ1bmN0aW9uKHRyYWNrLCBzdHJlYW0pIHtcclxuICAgICAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyID0gb3JpZ0FkZFRyYWNrLmFwcGx5KHBjLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgaWYgKCFzZW5kZXIpIHtcclxuICAgICAgICAgICAgc2VuZGVyID0gc2hpbVNlbmRlcldpdGhEdG1mKHBjLCB0cmFjayk7XHJcbiAgICAgICAgICAgIHBjLl9zZW5kZXJzLnB1c2goc2VuZGVyKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBzZW5kZXI7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmFyIG9yaWdSZW1vdmVUcmFjayA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlVHJhY2s7XHJcbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVUcmFjayA9IGZ1bmN0aW9uKHNlbmRlcikge1xyXG4gICAgICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgICAgIG9yaWdSZW1vdmVUcmFjay5hcHBseShwYywgYXJndW1lbnRzKTtcclxuICAgICAgICAgIHZhciBpZHggPSBwYy5fc2VuZGVycy5pbmRleE9mKHNlbmRlcik7XHJcbiAgICAgICAgICBpZiAoaWR4ICE9PSAtMSkge1xyXG4gICAgICAgICAgICBwYy5fc2VuZGVycy5zcGxpY2UoaWR4LCAxKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICAgIHZhciBvcmlnQWRkU3RyZWFtID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRTdHJlYW07XHJcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgICBwYy5fc2VuZGVycyA9IHBjLl9zZW5kZXJzIHx8IFtdO1xyXG4gICAgICAgIG9yaWdBZGRTdHJlYW0uYXBwbHkocGMsIFtzdHJlYW1dKTtcclxuICAgICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xyXG4gICAgICAgICAgcGMuX3NlbmRlcnMucHVzaChzaGltU2VuZGVyV2l0aER0bWYocGMsIHRyYWNrKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICB2YXIgb3JpZ1JlbW92ZVN0cmVhbSA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlU3RyZWFtO1xyXG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xyXG4gICAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgICAgcGMuX3NlbmRlcnMgPSBwYy5fc2VuZGVycyB8fCBbXTtcclxuICAgICAgICBvcmlnUmVtb3ZlU3RyZWFtLmFwcGx5KHBjLCBbc3RyZWFtXSk7XHJcblxyXG4gICAgICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyID0gcGMuX3NlbmRlcnMuZmluZChmdW5jdGlvbihzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzLnRyYWNrID09PSB0cmFjaztcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgaWYgKHNlbmRlcikge1xyXG4gICAgICAgICAgICBwYy5fc2VuZGVycy5zcGxpY2UocGMuX3NlbmRlcnMuaW5kZXhPZihzZW5kZXIpLCAxKTsgLy8gcmVtb3ZlIHNlbmRlclxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9O1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gJiZcclxuICAgICAgICAgICAgICAgJ2dldFNlbmRlcnMnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUgJiZcclxuICAgICAgICAgICAgICAgJ2NyZWF0ZURUTUZTZW5kZXInIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUgJiZcclxuICAgICAgICAgICAgICAgd2luZG93LlJUQ1J0cFNlbmRlciAmJlxyXG4gICAgICAgICAgICAgICAhKCdkdG1mJyBpbiB3aW5kb3cuUlRDUnRwU2VuZGVyLnByb3RvdHlwZSkpIHtcclxuICAgICAgdmFyIG9yaWdHZXRTZW5kZXJzID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTZW5kZXJzO1xyXG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFNlbmRlcnMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBzZW5kZXJzID0gb3JpZ0dldFNlbmRlcnMuYXBwbHkocGMsIFtdKTtcclxuICAgICAgICBzZW5kZXJzLmZvckVhY2goZnVuY3Rpb24oc2VuZGVyKSB7XHJcbiAgICAgICAgICBzZW5kZXIuX3BjID0gcGM7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHNlbmRlcnM7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1J0cFNlbmRlci5wcm90b3R5cGUsICdkdG1mJywge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5fZHRtZiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRyYWNrLmtpbmQgPT09ICdhdWRpbycpIHtcclxuICAgICAgICAgICAgICB0aGlzLl9kdG1mID0gdGhpcy5fcGMuY3JlYXRlRFRNRlNlbmRlcih0aGlzLnRyYWNrKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB0aGlzLl9kdG1mID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2R0bWY7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBzaGltU291cmNlT2JqZWN0OiBmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIHZhciBVUkwgPSB3aW5kb3cgJiYgd2luZG93LlVSTDtcclxuXHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgaWYgKHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50ICYmXHJcbiAgICAgICAgISgnc3JjT2JqZWN0JyBpbiB3aW5kb3cuSFRNTE1lZGlhRWxlbWVudC5wcm90b3R5cGUpKSB7XHJcbiAgICAgICAgLy8gU2hpbSB0aGUgc3JjT2JqZWN0IHByb3BlcnR5LCBvbmNlLCB3aGVuIEhUTUxNZWRpYUVsZW1lbnQgaXMgZm91bmQuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50LnByb3RvdHlwZSwgJ3NyY09iamVjdCcsIHtcclxuICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zcmNPYmplY3Q7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgc2V0OiBmdW5jdGlvbihzdHJlYW0pIHtcclxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICAvLyBVc2UgX3NyY09iamVjdCBhcyBhIHByaXZhdGUgcHJvcGVydHkgZm9yIHRoaXMgc2hpbVxyXG4gICAgICAgICAgICB0aGlzLl9zcmNPYmplY3QgPSBzdHJlYW07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNyYykge1xyXG4gICAgICAgICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwodGhpcy5zcmMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIXN0cmVhbSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuc3JjID0gJyc7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoc3RyZWFtKTtcclxuICAgICAgICAgICAgLy8gV2UgbmVlZCB0byByZWNyZWF0ZSB0aGUgYmxvYiB1cmwgd2hlbiBhIHRyYWNrIGlzIGFkZGVkIG9yXHJcbiAgICAgICAgICAgIC8vIHJlbW92ZWQuIERvaW5nIGl0IG1hbnVhbGx5IHNpbmNlIHdlIHdhbnQgdG8gYXZvaWQgYSByZWN1cnNpb24uXHJcbiAgICAgICAgICAgIHN0cmVhbS5hZGRFdmVudExpc3RlbmVyKCdhZGR0cmFjaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgIGlmIChzZWxmLnNyYykge1xyXG4gICAgICAgICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChzZWxmLnNyYyk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHNlbGYuc3JjID0gVVJMLmNyZWF0ZU9iamVjdFVSTChzdHJlYW0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoJ3JlbW92ZXRyYWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgaWYgKHNlbGYuc3JjKSB7XHJcbiAgICAgICAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHNlbGYuc3JjKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgc2VsZi5zcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKHN0cmVhbSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgc2hpbUFkZFRyYWNrUmVtb3ZlVHJhY2tXaXRoTmF0aXZlOiBmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIC8vIHNoaW0gYWRkVHJhY2svcmVtb3ZlVHJhY2sgd2l0aCBuYXRpdmUgdmFyaWFudHMgaW4gb3JkZXIgdG8gbWFrZVxyXG4gICAgLy8gdGhlIGludGVyYWN0aW9ucyB3aXRoIGxlZ2FjeSBnZXRMb2NhbFN0cmVhbXMgYmVoYXZlIGFzIGluIG90aGVyIGJyb3dzZXJzLlxyXG4gICAgLy8gS2VlcHMgYSBtYXBwaW5nIHN0cmVhbS5pZCA9PiBbc3RyZWFtLCBydHBzZW5kZXJzLi4uXVxyXG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRMb2NhbFN0cmVhbXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcyA9IHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMgfHwge307XHJcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zKS5tYXAoZnVuY3Rpb24oc3RyZWFtSWQpIHtcclxuICAgICAgICByZXR1cm4gcGMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtSWRdWzBdO1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIG9yaWdBZGRUcmFjayA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2s7XHJcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFRyYWNrID0gZnVuY3Rpb24odHJhY2ssIHN0cmVhbSkge1xyXG4gICAgICBpZiAoIXN0cmVhbSkge1xyXG4gICAgICAgIHJldHVybiBvcmlnQWRkVHJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zID0gdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcyB8fCB7fTtcclxuXHJcbiAgICAgIHZhciBzZW5kZXIgPSBvcmlnQWRkVHJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgaWYgKCF0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbS5pZF0pIHtcclxuICAgICAgICB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbS5pZF0gPSBbc3RyZWFtLCBzZW5kZXJdO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtLmlkXS5pbmRleE9mKHNlbmRlcikgPT09IC0xKSB7XHJcbiAgICAgICAgdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW0uaWRdLnB1c2goc2VuZGVyKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc2VuZGVyO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgb3JpZ0FkZFN0cmVhbSA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkU3RyZWFtO1xyXG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcclxuICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcyA9IHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMgfHwge307XHJcblxyXG4gICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xyXG4gICAgICAgIHZhciBhbHJlYWR5RXhpc3RzID0gcGMuZ2V0U2VuZGVycygpLmZpbmQoZnVuY3Rpb24ocykge1xyXG4gICAgICAgICAgcmV0dXJuIHMudHJhY2sgPT09IHRyYWNrO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChhbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKCdUcmFjayBhbHJlYWR5IGV4aXN0cy4nLFxyXG4gICAgICAgICAgICAgICdJbnZhbGlkQWNjZXNzRXJyb3InKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICB2YXIgZXhpc3RpbmdTZW5kZXJzID0gcGMuZ2V0U2VuZGVycygpO1xyXG4gICAgICBvcmlnQWRkU3RyZWFtLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgIHZhciBuZXdTZW5kZXJzID0gcGMuZ2V0U2VuZGVycygpLmZpbHRlcihmdW5jdGlvbihuZXdTZW5kZXIpIHtcclxuICAgICAgICByZXR1cm4gZXhpc3RpbmdTZW5kZXJzLmluZGV4T2YobmV3U2VuZGVyKSA9PT0gLTE7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbS5pZF0gPSBbc3RyZWFtXS5jb25jYXQobmV3U2VuZGVycyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBvcmlnUmVtb3ZlU3RyZWFtID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVTdHJlYW07XHJcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xyXG4gICAgICB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zID0gdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcyB8fCB7fTtcclxuICAgICAgZGVsZXRlIHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtLmlkXTtcclxuICAgICAgcmV0dXJuIG9yaWdSZW1vdmVTdHJlYW0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIG9yaWdSZW1vdmVUcmFjayA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlVHJhY2s7XHJcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVRyYWNrID0gZnVuY3Rpb24oc2VuZGVyKSB7XHJcbiAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgIHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMgPSB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zIHx8IHt9O1xyXG4gICAgICBpZiAoc2VuZGVyKSB7XHJcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcykuZm9yRWFjaChmdW5jdGlvbihzdHJlYW1JZCkge1xyXG4gICAgICAgICAgdmFyIGlkeCA9IHBjLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbUlkXS5pbmRleE9mKHNlbmRlcik7XHJcbiAgICAgICAgICBpZiAoaWR4ICE9PSAtMSkge1xyXG4gICAgICAgICAgICBwYy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW1JZF0uc3BsaWNlKGlkeCwgMSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAocGMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtSWRdLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICBkZWxldGUgcGMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtSWRdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBvcmlnUmVtb3ZlVHJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIH07XHJcbiAgfSxcclxuXHJcbiAgc2hpbUFkZFRyYWNrUmVtb3ZlVHJhY2s6IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgdmFyIGJyb3dzZXJEZXRhaWxzID0gdXRpbHMuZGV0ZWN0QnJvd3Nlcih3aW5kb3cpO1xyXG4gICAgLy8gc2hpbSBhZGRUcmFjayBhbmQgcmVtb3ZlVHJhY2suXHJcbiAgICBpZiAod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjayAmJlxyXG4gICAgICAgIGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPj0gNjUpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuc2hpbUFkZFRyYWNrUmVtb3ZlVHJhY2tXaXRoTmF0aXZlKHdpbmRvdyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYWxzbyBzaGltIHBjLmdldExvY2FsU3RyZWFtcyB3aGVuIGFkZFRyYWNrIGlzIHNoaW1tZWRcclxuICAgIC8vIHRvIHJldHVybiB0aGUgb3JpZ2luYWwgc3RyZWFtcy5cclxuICAgIHZhciBvcmlnR2V0TG9jYWxTdHJlYW1zID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVxyXG4gICAgICAgIC5nZXRMb2NhbFN0cmVhbXM7XHJcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldExvY2FsU3RyZWFtcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICB2YXIgbmF0aXZlU3RyZWFtcyA9IG9yaWdHZXRMb2NhbFN0cmVhbXMuYXBwbHkodGhpcyk7XHJcbiAgICAgIHBjLl9yZXZlcnNlU3RyZWFtcyA9IHBjLl9yZXZlcnNlU3RyZWFtcyB8fCB7fTtcclxuICAgICAgcmV0dXJuIG5hdGl2ZVN0cmVhbXMubWFwKGZ1bmN0aW9uKHN0cmVhbSkge1xyXG4gICAgICAgIHJldHVybiBwYy5fcmV2ZXJzZVN0cmVhbXNbc3RyZWFtLmlkXTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBvcmlnQWRkU3RyZWFtID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRTdHJlYW07XHJcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xyXG4gICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICBwYy5fc3RyZWFtcyA9IHBjLl9zdHJlYW1zIHx8IHt9O1xyXG4gICAgICBwYy5fcmV2ZXJzZVN0cmVhbXMgPSBwYy5fcmV2ZXJzZVN0cmVhbXMgfHwge307XHJcblxyXG4gICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xyXG4gICAgICAgIHZhciBhbHJlYWR5RXhpc3RzID0gcGMuZ2V0U2VuZGVycygpLmZpbmQoZnVuY3Rpb24ocykge1xyXG4gICAgICAgICAgcmV0dXJuIHMudHJhY2sgPT09IHRyYWNrO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChhbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKCdUcmFjayBhbHJlYWR5IGV4aXN0cy4nLFxyXG4gICAgICAgICAgICAgICdJbnZhbGlkQWNjZXNzRXJyb3InKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBBZGQgaWRlbnRpdHkgbWFwcGluZyBmb3IgY29uc2lzdGVuY3kgd2l0aCBhZGRUcmFjay5cclxuICAgICAgLy8gVW5sZXNzIHRoaXMgaXMgYmVpbmcgdXNlZCB3aXRoIGEgc3RyZWFtIGZyb20gYWRkVHJhY2suXHJcbiAgICAgIGlmICghcGMuX3JldmVyc2VTdHJlYW1zW3N0cmVhbS5pZF0pIHtcclxuICAgICAgICB2YXIgbmV3U3RyZWFtID0gbmV3IHdpbmRvdy5NZWRpYVN0cmVhbShzdHJlYW0uZ2V0VHJhY2tzKCkpO1xyXG4gICAgICAgIHBjLl9zdHJlYW1zW3N0cmVhbS5pZF0gPSBuZXdTdHJlYW07XHJcbiAgICAgICAgcGMuX3JldmVyc2VTdHJlYW1zW25ld1N0cmVhbS5pZF0gPSBzdHJlYW07XHJcbiAgICAgICAgc3RyZWFtID0gbmV3U3RyZWFtO1xyXG4gICAgICB9XHJcbiAgICAgIG9yaWdBZGRTdHJlYW0uYXBwbHkocGMsIFtzdHJlYW1dKTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIG9yaWdSZW1vdmVTdHJlYW0gPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVN0cmVhbTtcclxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgIHBjLl9zdHJlYW1zID0gcGMuX3N0cmVhbXMgfHwge307XHJcbiAgICAgIHBjLl9yZXZlcnNlU3RyZWFtcyA9IHBjLl9yZXZlcnNlU3RyZWFtcyB8fCB7fTtcclxuXHJcbiAgICAgIG9yaWdSZW1vdmVTdHJlYW0uYXBwbHkocGMsIFsocGMuX3N0cmVhbXNbc3RyZWFtLmlkXSB8fCBzdHJlYW0pXSk7XHJcbiAgICAgIGRlbGV0ZSBwYy5fcmV2ZXJzZVN0cmVhbXNbKHBjLl9zdHJlYW1zW3N0cmVhbS5pZF0gP1xyXG4gICAgICAgICAgcGMuX3N0cmVhbXNbc3RyZWFtLmlkXS5pZCA6IHN0cmVhbS5pZCldO1xyXG4gICAgICBkZWxldGUgcGMuX3N0cmVhbXNbc3RyZWFtLmlkXTtcclxuICAgIH07XHJcblxyXG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjayA9IGZ1bmN0aW9uKHRyYWNrLCBzdHJlYW0pIHtcclxuICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgaWYgKHBjLnNpZ25hbGluZ1N0YXRlID09PSAnY2xvc2VkJykge1xyXG4gICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oXHJcbiAgICAgICAgICAnVGhlIFJUQ1BlZXJDb25uZWN0aW9uXFwncyBzaWduYWxpbmdTdGF0ZSBpcyBcXCdjbG9zZWRcXCcuJyxcclxuICAgICAgICAgICdJbnZhbGlkU3RhdGVFcnJvcicpO1xyXG4gICAgICB9XHJcbiAgICAgIHZhciBzdHJlYW1zID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xyXG4gICAgICBpZiAoc3RyZWFtcy5sZW5ndGggIT09IDEgfHxcclxuICAgICAgICAgICFzdHJlYW1zWzBdLmdldFRyYWNrcygpLmZpbmQoZnVuY3Rpb24odCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdCA9PT0gdHJhY2s7XHJcbiAgICAgICAgICB9KSkge1xyXG4gICAgICAgIC8vIHRoaXMgaXMgbm90IGZ1bGx5IGNvcnJlY3QgYnV0IGFsbCB3ZSBjYW4gbWFuYWdlIHdpdGhvdXRcclxuICAgICAgICAvLyBbW2Fzc29jaWF0ZWQgTWVkaWFTdHJlYW1zXV0gaW50ZXJuYWwgc2xvdC5cclxuICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKFxyXG4gICAgICAgICAgJ1RoZSBhZGFwdGVyLmpzIGFkZFRyYWNrIHBvbHlmaWxsIG9ubHkgc3VwcG9ydHMgYSBzaW5nbGUgJyArXHJcbiAgICAgICAgICAnIHN0cmVhbSB3aGljaCBpcyBhc3NvY2lhdGVkIHdpdGggdGhlIHNwZWNpZmllZCB0cmFjay4nLFxyXG4gICAgICAgICAgJ05vdFN1cHBvcnRlZEVycm9yJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBhbHJlYWR5RXhpc3RzID0gcGMuZ2V0U2VuZGVycygpLmZpbmQoZnVuY3Rpb24ocykge1xyXG4gICAgICAgIHJldHVybiBzLnRyYWNrID09PSB0cmFjaztcclxuICAgICAgfSk7XHJcbiAgICAgIGlmIChhbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbignVHJhY2sgYWxyZWFkeSBleGlzdHMuJyxcclxuICAgICAgICAgICAgJ0ludmFsaWRBY2Nlc3NFcnJvcicpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwYy5fc3RyZWFtcyA9IHBjLl9zdHJlYW1zIHx8IHt9O1xyXG4gICAgICBwYy5fcmV2ZXJzZVN0cmVhbXMgPSBwYy5fcmV2ZXJzZVN0cmVhbXMgfHwge307XHJcbiAgICAgIHZhciBvbGRTdHJlYW0gPSBwYy5fc3RyZWFtc1tzdHJlYW0uaWRdO1xyXG4gICAgICBpZiAob2xkU3RyZWFtKSB7XHJcbiAgICAgICAgLy8gdGhpcyBpcyB1c2luZyBvZGQgQ2hyb21lIGJlaGF2aW91ciwgdXNlIHdpdGggY2F1dGlvbjpcclxuICAgICAgICAvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3Avd2VicnRjL2lzc3Vlcy9kZXRhaWw/aWQ9NzgxNVxyXG4gICAgICAgIC8vIE5vdGU6IHdlIHJlbHkgb24gdGhlIGhpZ2gtbGV2ZWwgYWRkVHJhY2svZHRtZiBzaGltIHRvXHJcbiAgICAgICAgLy8gY3JlYXRlIHRoZSBzZW5kZXIgd2l0aCBhIGR0bWYgc2VuZGVyLlxyXG4gICAgICAgIG9sZFN0cmVhbS5hZGRUcmFjayh0cmFjayk7XHJcblxyXG4gICAgICAgIC8vIFRyaWdnZXIgT05OIGFzeW5jLlxyXG4gICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBwYy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnbmVnb3RpYXRpb25uZWVkZWQnKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIG5ld1N0cmVhbSA9IG5ldyB3aW5kb3cuTWVkaWFTdHJlYW0oW3RyYWNrXSk7XHJcbiAgICAgICAgcGMuX3N0cmVhbXNbc3RyZWFtLmlkXSA9IG5ld1N0cmVhbTtcclxuICAgICAgICBwYy5fcmV2ZXJzZVN0cmVhbXNbbmV3U3RyZWFtLmlkXSA9IHN0cmVhbTtcclxuICAgICAgICBwYy5hZGRTdHJlYW0obmV3U3RyZWFtKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcGMuZ2V0U2VuZGVycygpLmZpbmQoZnVuY3Rpb24ocykge1xyXG4gICAgICAgIHJldHVybiBzLnRyYWNrID09PSB0cmFjaztcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIHJlcGxhY2UgdGhlIGludGVybmFsIHN0cmVhbSBpZCB3aXRoIHRoZSBleHRlcm5hbCBvbmUgYW5kXHJcbiAgICAvLyB2aWNlIHZlcnNhLlxyXG4gICAgZnVuY3Rpb24gcmVwbGFjZUludGVybmFsU3RyZWFtSWQocGMsIGRlc2NyaXB0aW9uKSB7XHJcbiAgICAgIHZhciBzZHAgPSBkZXNjcmlwdGlvbi5zZHA7XHJcbiAgICAgIE9iamVjdC5rZXlzKHBjLl9yZXZlcnNlU3RyZWFtcyB8fCBbXSkuZm9yRWFjaChmdW5jdGlvbihpbnRlcm5hbElkKSB7XHJcbiAgICAgICAgdmFyIGV4dGVybmFsU3RyZWFtID0gcGMuX3JldmVyc2VTdHJlYW1zW2ludGVybmFsSWRdO1xyXG4gICAgICAgIHZhciBpbnRlcm5hbFN0cmVhbSA9IHBjLl9zdHJlYW1zW2V4dGVybmFsU3RyZWFtLmlkXTtcclxuICAgICAgICBzZHAgPSBzZHAucmVwbGFjZShuZXcgUmVnRXhwKGludGVybmFsU3RyZWFtLmlkLCAnZycpLFxyXG4gICAgICAgICAgICBleHRlcm5hbFN0cmVhbS5pZCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gbmV3IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbih7XHJcbiAgICAgICAgdHlwZTogZGVzY3JpcHRpb24udHlwZSxcclxuICAgICAgICBzZHA6IHNkcFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHJlcGxhY2VFeHRlcm5hbFN0cmVhbUlkKHBjLCBkZXNjcmlwdGlvbikge1xyXG4gICAgICB2YXIgc2RwID0gZGVzY3JpcHRpb24uc2RwO1xyXG4gICAgICBPYmplY3Qua2V5cyhwYy5fcmV2ZXJzZVN0cmVhbXMgfHwgW10pLmZvckVhY2goZnVuY3Rpb24oaW50ZXJuYWxJZCkge1xyXG4gICAgICAgIHZhciBleHRlcm5hbFN0cmVhbSA9IHBjLl9yZXZlcnNlU3RyZWFtc1tpbnRlcm5hbElkXTtcclxuICAgICAgICB2YXIgaW50ZXJuYWxTdHJlYW0gPSBwYy5fc3RyZWFtc1tleHRlcm5hbFN0cmVhbS5pZF07XHJcbiAgICAgICAgc2RwID0gc2RwLnJlcGxhY2UobmV3IFJlZ0V4cChleHRlcm5hbFN0cmVhbS5pZCwgJ2cnKSxcclxuICAgICAgICAgICAgaW50ZXJuYWxTdHJlYW0uaWQpO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIG5ldyBSVENTZXNzaW9uRGVzY3JpcHRpb24oe1xyXG4gICAgICAgIHR5cGU6IGRlc2NyaXB0aW9uLnR5cGUsXHJcbiAgICAgICAgc2RwOiBzZHBcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBbJ2NyZWF0ZU9mZmVyJywgJ2NyZWF0ZUFuc3dlciddLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XHJcbiAgICAgIHZhciBuYXRpdmVNZXRob2QgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF07XHJcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XHJcbiAgICAgICAgdmFyIGlzTGVnYWN5Q2FsbCA9IGFyZ3VtZW50cy5sZW5ndGggJiZcclxuICAgICAgICAgICAgdHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ2Z1bmN0aW9uJztcclxuICAgICAgICBpZiAoaXNMZWdhY3lDYWxsKSB7XHJcbiAgICAgICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHBjLCBbXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uKGRlc2NyaXB0aW9uKSB7XHJcbiAgICAgICAgICAgICAgdmFyIGRlc2MgPSByZXBsYWNlSW50ZXJuYWxTdHJlYW1JZChwYywgZGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgIGFyZ3NbMF0uYXBwbHkobnVsbCwgW2Rlc2NdKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgaWYgKGFyZ3NbMV0pIHtcclxuICAgICAgICAgICAgICAgIGFyZ3NbMV0uYXBwbHkobnVsbCwgZXJyKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGFyZ3VtZW50c1syXVxyXG4gICAgICAgICAgXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkocGMsIGFyZ3VtZW50cylcclxuICAgICAgICAudGhlbihmdW5jdGlvbihkZXNjcmlwdGlvbikge1xyXG4gICAgICAgICAgcmV0dXJuIHJlcGxhY2VJbnRlcm5hbFN0cmVhbUlkKHBjLCBkZXNjcmlwdGlvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgb3JpZ1NldExvY2FsRGVzY3JpcHRpb24gPVxyXG4gICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0TG9jYWxEZXNjcmlwdGlvbjtcclxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0TG9jYWxEZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGggfHwgIWFyZ3VtZW50c1swXS50eXBlKSB7XHJcbiAgICAgICAgcmV0dXJuIG9yaWdTZXRMb2NhbERlc2NyaXB0aW9uLmFwcGx5KHBjLCBhcmd1bWVudHMpO1xyXG4gICAgICB9XHJcbiAgICAgIGFyZ3VtZW50c1swXSA9IHJlcGxhY2VFeHRlcm5hbFN0cmVhbUlkKHBjLCBhcmd1bWVudHNbMF0pO1xyXG4gICAgICByZXR1cm4gb3JpZ1NldExvY2FsRGVzY3JpcHRpb24uYXBwbHkocGMsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIFRPRE86IG1hbmdsZSBnZXRTdGF0czogaHR0cHM6Ly93M2MuZ2l0aHViLmlvL3dlYnJ0Yy1zdGF0cy8jZG9tLXJ0Y21lZGlhc3RyZWFtc3RhdHMtc3RyZWFtaWRlbnRpZmllclxyXG5cclxuICAgIHZhciBvcmlnTG9jYWxEZXNjcmlwdGlvbiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoXHJcbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSwgJ2xvY2FsRGVzY3JpcHRpb24nKTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLFxyXG4gICAgICAgICdsb2NhbERlc2NyaXB0aW9uJywge1xyXG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGRlc2NyaXB0aW9uID0gb3JpZ0xvY2FsRGVzY3JpcHRpb24uZ2V0LmFwcGx5KHRoaXMpO1xyXG4gICAgICAgICAgICBpZiAoZGVzY3JpcHRpb24udHlwZSA9PT0gJycpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gZGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJlcGxhY2VJbnRlcm5hbFN0cmVhbUlkKHBjLCBkZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVUcmFjayA9IGZ1bmN0aW9uKHNlbmRlcikge1xyXG4gICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICBpZiAocGMuc2lnbmFsaW5nU3RhdGUgPT09ICdjbG9zZWQnKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbihcclxuICAgICAgICAgICdUaGUgUlRDUGVlckNvbm5lY3Rpb25cXCdzIHNpZ25hbGluZ1N0YXRlIGlzIFxcJ2Nsb3NlZFxcJy4nLFxyXG4gICAgICAgICAgJ0ludmFsaWRTdGF0ZUVycm9yJyk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gV2UgY2FuIG5vdCB5ZXQgY2hlY2sgZm9yIHNlbmRlciBpbnN0YW5jZW9mIFJUQ1J0cFNlbmRlclxyXG4gICAgICAvLyBzaW5jZSB3ZSBzaGltIFJUUFNlbmRlci4gU28gd2UgY2hlY2sgaWYgc2VuZGVyLl9wYyBpcyBzZXQuXHJcbiAgICAgIGlmICghc2VuZGVyLl9wYykge1xyXG4gICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oJ0FyZ3VtZW50IDEgb2YgUlRDUGVlckNvbm5lY3Rpb24ucmVtb3ZlVHJhY2sgJyArXHJcbiAgICAgICAgICAgICdkb2VzIG5vdCBpbXBsZW1lbnQgaW50ZXJmYWNlIFJUQ1J0cFNlbmRlci4nLCAnVHlwZUVycm9yJyk7XHJcbiAgICAgIH1cclxuICAgICAgdmFyIGlzTG9jYWwgPSBzZW5kZXIuX3BjID09PSBwYztcclxuICAgICAgaWYgKCFpc0xvY2FsKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbignU2VuZGVyIHdhcyBub3QgY3JlYXRlZCBieSB0aGlzIGNvbm5lY3Rpb24uJyxcclxuICAgICAgICAgICAgJ0ludmFsaWRBY2Nlc3NFcnJvcicpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBTZWFyY2ggZm9yIHRoZSBuYXRpdmUgc3RyZWFtIHRoZSBzZW5kZXJzIHRyYWNrIGJlbG9uZ3MgdG8uXHJcbiAgICAgIHBjLl9zdHJlYW1zID0gcGMuX3N0cmVhbXMgfHwge307XHJcbiAgICAgIHZhciBzdHJlYW07XHJcbiAgICAgIE9iamVjdC5rZXlzKHBjLl9zdHJlYW1zKS5mb3JFYWNoKGZ1bmN0aW9uKHN0cmVhbWlkKSB7XHJcbiAgICAgICAgdmFyIGhhc1RyYWNrID0gcGMuX3N0cmVhbXNbc3RyZWFtaWRdLmdldFRyYWNrcygpLmZpbmQoZnVuY3Rpb24odHJhY2spIHtcclxuICAgICAgICAgIHJldHVybiBzZW5kZXIudHJhY2sgPT09IHRyYWNrO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChoYXNUcmFjaykge1xyXG4gICAgICAgICAgc3RyZWFtID0gcGMuX3N0cmVhbXNbc3RyZWFtaWRdO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoc3RyZWFtKSB7XHJcbiAgICAgICAgaWYgKHN0cmVhbS5nZXRUcmFja3MoKS5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgIC8vIGlmIHRoaXMgaXMgdGhlIGxhc3QgdHJhY2sgb2YgdGhlIHN0cmVhbSwgcmVtb3ZlIHRoZSBzdHJlYW0uIFRoaXNcclxuICAgICAgICAgIC8vIHRha2VzIGNhcmUgb2YgYW55IHNoaW1tZWQgX3NlbmRlcnMuXHJcbiAgICAgICAgICBwYy5yZW1vdmVTdHJlYW0ocGMuX3JldmVyc2VTdHJlYW1zW3N0cmVhbS5pZF0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyByZWx5aW5nIG9uIHRoZSBzYW1lIG9kZCBjaHJvbWUgYmVoYXZpb3VyIGFzIGFib3ZlLlxyXG4gICAgICAgICAgc3RyZWFtLnJlbW92ZVRyYWNrKHNlbmRlci50cmFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBjLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCduZWdvdGlhdGlvbm5lZWRlZCcpKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9LFxyXG5cclxuICBzaGltUGVlckNvbm5lY3Rpb246IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgdmFyIGJyb3dzZXJEZXRhaWxzID0gdXRpbHMuZGV0ZWN0QnJvd3Nlcih3aW5kb3cpO1xyXG5cclxuICAgIC8vIFRoZSBSVENQZWVyQ29ubmVjdGlvbiBvYmplY3QuXHJcbiAgICBpZiAoIXdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiAmJiB3aW5kb3cud2Via2l0UlRDUGVlckNvbm5lY3Rpb24pIHtcclxuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uID0gZnVuY3Rpb24ocGNDb25maWcsIHBjQ29uc3RyYWludHMpIHtcclxuICAgICAgICAvLyBUcmFuc2xhdGUgaWNlVHJhbnNwb3J0UG9saWN5IHRvIGljZVRyYW5zcG9ydHMsXHJcbiAgICAgICAgLy8gc2VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3Avd2VicnRjL2lzc3Vlcy9kZXRhaWw/aWQ9NDg2OVxyXG4gICAgICAgIC8vIHRoaXMgd2FzIGZpeGVkIGluIE01NiBhbG9uZyB3aXRoIHVucHJlZml4aW5nIFJUQ1BlZXJDb25uZWN0aW9uLlxyXG4gICAgICAgIGxvZ2dpbmcoJ1BlZXJDb25uZWN0aW9uJyk7XHJcbiAgICAgICAgaWYgKHBjQ29uZmlnICYmIHBjQ29uZmlnLmljZVRyYW5zcG9ydFBvbGljeSkge1xyXG4gICAgICAgICAgcGNDb25maWcuaWNlVHJhbnNwb3J0cyA9IHBjQ29uZmlnLmljZVRyYW5zcG9ydFBvbGljeTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgd2luZG93LndlYmtpdFJUQ1BlZXJDb25uZWN0aW9uKHBjQ29uZmlnLCBwY0NvbnN0cmFpbnRzKTtcclxuICAgICAgfTtcclxuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSA9XHJcbiAgICAgICAgICB3aW5kb3cud2Via2l0UlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlO1xyXG4gICAgICAvLyB3cmFwIHN0YXRpYyBtZXRob2RzLiBDdXJyZW50bHkganVzdCBnZW5lcmF0ZUNlcnRpZmljYXRlLlxyXG4gICAgICBpZiAod2luZG93LndlYmtpdFJUQ1BlZXJDb25uZWN0aW9uLmdlbmVyYXRlQ2VydGlmaWNhdGUpIHtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLCAnZ2VuZXJhdGVDZXJ0aWZpY2F0ZScsIHtcclxuICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cud2Via2l0UlRDUGVlckNvbm5lY3Rpb24uZ2VuZXJhdGVDZXJ0aWZpY2F0ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gbWlncmF0ZSBmcm9tIG5vbi1zcGVjIFJUQ0ljZVNlcnZlci51cmwgdG8gUlRDSWNlU2VydmVyLnVybHNcclxuICAgICAgdmFyIE9yaWdQZWVyQ29ubmVjdGlvbiA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbjtcclxuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uID0gZnVuY3Rpb24ocGNDb25maWcsIHBjQ29uc3RyYWludHMpIHtcclxuICAgICAgICBpZiAocGNDb25maWcgJiYgcGNDb25maWcuaWNlU2VydmVycykge1xyXG4gICAgICAgICAgdmFyIG5ld0ljZVNlcnZlcnMgPSBbXTtcclxuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGNDb25maWcuaWNlU2VydmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgc2VydmVyID0gcGNDb25maWcuaWNlU2VydmVyc1tpXTtcclxuICAgICAgICAgICAgaWYgKCFzZXJ2ZXIuaGFzT3duUHJvcGVydHkoJ3VybHMnKSAmJlxyXG4gICAgICAgICAgICAgICAgc2VydmVyLmhhc093blByb3BlcnR5KCd1cmwnKSkge1xyXG4gICAgICAgICAgICAgIHV0aWxzLmRlcHJlY2F0ZWQoJ1JUQ0ljZVNlcnZlci51cmwnLCAnUlRDSWNlU2VydmVyLnVybHMnKTtcclxuICAgICAgICAgICAgICBzZXJ2ZXIgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHNlcnZlcikpO1xyXG4gICAgICAgICAgICAgIHNlcnZlci51cmxzID0gc2VydmVyLnVybDtcclxuICAgICAgICAgICAgICBuZXdJY2VTZXJ2ZXJzLnB1c2goc2VydmVyKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBuZXdJY2VTZXJ2ZXJzLnB1c2gocGNDb25maWcuaWNlU2VydmVyc1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHBjQ29uZmlnLmljZVNlcnZlcnMgPSBuZXdJY2VTZXJ2ZXJzO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IE9yaWdQZWVyQ29ubmVjdGlvbihwY0NvbmZpZywgcGNDb25zdHJhaW50cyk7XHJcbiAgICAgIH07XHJcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUgPSBPcmlnUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlO1xyXG4gICAgICAvLyB3cmFwIHN0YXRpYyBtZXRob2RzLiBDdXJyZW50bHkganVzdCBnZW5lcmF0ZUNlcnRpZmljYXRlLlxyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLCAnZ2VuZXJhdGVDZXJ0aWZpY2F0ZScsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmV0dXJuIE9yaWdQZWVyQ29ubmVjdGlvbi5nZW5lcmF0ZUNlcnRpZmljYXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG9yaWdHZXRTdGF0cyA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U3RhdHM7XHJcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFN0YXRzID0gZnVuY3Rpb24oc2VsZWN0b3IsXHJcbiAgICAgICAgc3VjY2Vzc0NhbGxiYWNrLCBlcnJvckNhbGxiYWNrKSB7XHJcbiAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xyXG5cclxuICAgICAgLy8gSWYgc2VsZWN0b3IgaXMgYSBmdW5jdGlvbiB0aGVuIHdlIGFyZSBpbiB0aGUgb2xkIHN0eWxlIHN0YXRzIHNvIGp1c3RcclxuICAgICAgLy8gcGFzcyBiYWNrIHRoZSBvcmlnaW5hbCBnZXRTdGF0cyBmb3JtYXQgdG8gYXZvaWQgYnJlYWtpbmcgb2xkIHVzZXJzLlxyXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgdHlwZW9mIHNlbGVjdG9yID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgcmV0dXJuIG9yaWdHZXRTdGF0cy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBXaGVuIHNwZWMtc3R5bGUgZ2V0U3RhdHMgaXMgc3VwcG9ydGVkLCByZXR1cm4gdGhvc2Ugd2hlbiBjYWxsZWQgd2l0aFxyXG4gICAgICAvLyBlaXRoZXIgbm8gYXJndW1lbnRzIG9yIHRoZSBzZWxlY3RvciBhcmd1bWVudCBpcyBudWxsLlxyXG4gICAgICBpZiAob3JpZ0dldFN0YXRzLmxlbmd0aCA9PT0gMCAmJiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCB8fFxyXG4gICAgICAgICAgdHlwZW9mIGFyZ3VtZW50c1swXSAhPT0gJ2Z1bmN0aW9uJykpIHtcclxuICAgICAgICByZXR1cm4gb3JpZ0dldFN0YXRzLmFwcGx5KHRoaXMsIFtdKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIGZpeENocm9tZVN0YXRzXyA9IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgdmFyIHN0YW5kYXJkUmVwb3J0ID0ge307XHJcbiAgICAgICAgdmFyIHJlcG9ydHMgPSByZXNwb25zZS5yZXN1bHQoKTtcclxuICAgICAgICByZXBvcnRzLmZvckVhY2goZnVuY3Rpb24ocmVwb3J0KSB7XHJcbiAgICAgICAgICB2YXIgc3RhbmRhcmRTdGF0cyA9IHtcclxuICAgICAgICAgICAgaWQ6IHJlcG9ydC5pZCxcclxuICAgICAgICAgICAgdGltZXN0YW1wOiByZXBvcnQudGltZXN0YW1wLFxyXG4gICAgICAgICAgICB0eXBlOiB7XHJcbiAgICAgICAgICAgICAgbG9jYWxjYW5kaWRhdGU6ICdsb2NhbC1jYW5kaWRhdGUnLFxyXG4gICAgICAgICAgICAgIHJlbW90ZWNhbmRpZGF0ZTogJ3JlbW90ZS1jYW5kaWRhdGUnXHJcbiAgICAgICAgICAgIH1bcmVwb3J0LnR5cGVdIHx8IHJlcG9ydC50eXBlXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgcmVwb3J0Lm5hbWVzKCkuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgICAgIHN0YW5kYXJkU3RhdHNbbmFtZV0gPSByZXBvcnQuc3RhdChuYW1lKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgc3RhbmRhcmRSZXBvcnRbc3RhbmRhcmRTdGF0cy5pZF0gPSBzdGFuZGFyZFN0YXRzO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gc3RhbmRhcmRSZXBvcnQ7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBzaGltIGdldFN0YXRzIHdpdGggbWFwbGlrZSBzdXBwb3J0XHJcbiAgICAgIHZhciBtYWtlTWFwU3RhdHMgPSBmdW5jdGlvbihzdGF0cykge1xyXG4gICAgICAgIHJldHVybiBuZXcgTWFwKE9iamVjdC5rZXlzKHN0YXRzKS5tYXAoZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgICByZXR1cm4gW2tleSwgc3RhdHNba2V5XV07XHJcbiAgICAgICAgfSkpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gMikge1xyXG4gICAgICAgIHZhciBzdWNjZXNzQ2FsbGJhY2tXcmFwcGVyXyA9IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICBhcmdzWzFdKG1ha2VNYXBTdGF0cyhmaXhDaHJvbWVTdGF0c18ocmVzcG9uc2UpKSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG9yaWdHZXRTdGF0cy5hcHBseSh0aGlzLCBbc3VjY2Vzc0NhbGxiYWNrV3JhcHBlcl8sXHJcbiAgICAgICAgICBhcmd1bWVudHNbMF1dKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gcHJvbWlzZS1zdXBwb3J0XHJcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBvcmlnR2V0U3RhdHMuYXBwbHkocGMsIFtcclxuICAgICAgICAgIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUobWFrZU1hcFN0YXRzKGZpeENocm9tZVN0YXRzXyhyZXNwb25zZSkpKTtcclxuICAgICAgICAgIH0sIHJlamVjdF0pO1xyXG4gICAgICB9KS50aGVuKHN1Y2Nlc3NDYWxsYmFjaywgZXJyb3JDYWxsYmFjayk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIGFkZCBwcm9taXNlIHN1cHBvcnQgLS0gbmF0aXZlbHkgYXZhaWxhYmxlIGluIENocm9tZSA1MVxyXG4gICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCA1MSkge1xyXG4gICAgICBbJ3NldExvY2FsRGVzY3JpcHRpb24nLCAnc2V0UmVtb3RlRGVzY3JpcHRpb24nLCAnYWRkSWNlQ2FuZGlkYXRlJ11cclxuICAgICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xyXG4gICAgICAgICAgICB2YXIgbmF0aXZlTWV0aG9kID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdO1xyXG4gICAgICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcclxuICAgICAgICAgICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICAgICAgICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgICAgICBuYXRpdmVNZXRob2QuYXBwbHkocGMsIFthcmdzWzBdLCByZXNvbHZlLCByZWplY3RdKTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGFyZ3NbMV0uYXBwbHkobnVsbCwgW10pO1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPj0gMykge1xyXG4gICAgICAgICAgICAgICAgICBhcmdzWzJdLmFwcGx5KG51bGwsIFtlcnJdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHByb21pc2Ugc3VwcG9ydCBmb3IgY3JlYXRlT2ZmZXIgYW5kIGNyZWF0ZUFuc3dlci4gQXZhaWxhYmxlICh3aXRob3V0XHJcbiAgICAvLyBidWdzKSBzaW5jZSBNNTI6IGNyYnVnLzYxOTI4OVxyXG4gICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCA1Mikge1xyXG4gICAgICBbJ2NyZWF0ZU9mZmVyJywgJ2NyZWF0ZUFuc3dlciddLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XHJcbiAgICAgICAgdmFyIG5hdGl2ZU1ldGhvZCA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXTtcclxuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDEgfHwgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiZcclxuICAgICAgICAgICAgICB0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnb2JqZWN0JykpIHtcclxuICAgICAgICAgICAgdmFyIG9wdHMgPSBhcmd1bWVudHMubGVuZ3RoID09PSAxID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgICAgbmF0aXZlTWV0aG9kLmFwcGx5KHBjLCBbcmVzb2x2ZSwgcmVqZWN0LCBvcHRzXSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHNoaW0gaW1wbGljaXQgY3JlYXRpb24gb2YgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uL1JUQ0ljZUNhbmRpZGF0ZVxyXG4gICAgWydzZXRMb2NhbERlc2NyaXB0aW9uJywgJ3NldFJlbW90ZURlc2NyaXB0aW9uJywgJ2FkZEljZUNhbmRpZGF0ZSddXHJcbiAgICAgICAgLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XHJcbiAgICAgICAgICB2YXIgbmF0aXZlTWV0aG9kID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdO1xyXG4gICAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGFyZ3VtZW50c1swXSA9IG5ldyAoKG1ldGhvZCA9PT0gJ2FkZEljZUNhbmRpZGF0ZScpID9cclxuICAgICAgICAgICAgICAgIHdpbmRvdy5SVENJY2VDYW5kaWRhdGUgOlxyXG4gICAgICAgICAgICAgICAgd2luZG93LlJUQ1Nlc3Npb25EZXNjcmlwdGlvbikoYXJndW1lbnRzWzBdKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyBzdXBwb3J0IGZvciBhZGRJY2VDYW5kaWRhdGUobnVsbCBvciB1bmRlZmluZWQpXHJcbiAgICB2YXIgbmF0aXZlQWRkSWNlQ2FuZGlkYXRlID1cclxuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZEljZUNhbmRpZGF0ZTtcclxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkSWNlQ2FuZGlkYXRlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmICghYXJndW1lbnRzWzBdKSB7XHJcbiAgICAgICAgaWYgKGFyZ3VtZW50c1sxXSkge1xyXG4gICAgICAgICAgYXJndW1lbnRzWzFdLmFwcGx5KG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG5hdGl2ZUFkZEljZUNhbmRpZGF0ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgfTtcclxuICB9XHJcbn07XHJcblxyXG59LHtcIi4uL3V0aWxzLmpzXCI6MTMsXCIuL2dldHVzZXJtZWRpYVwiOjZ9XSw2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuLypcclxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcclxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxyXG4gKiAgdHJlZS5cclxuICovXHJcbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscy5qcycpO1xyXG52YXIgbG9nZ2luZyA9IHV0aWxzLmxvZztcclxuXHJcbi8vIEV4cG9zZSBwdWJsaWMgbWV0aG9kcy5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih3aW5kb3cpIHtcclxuICB2YXIgYnJvd3NlckRldGFpbHMgPSB1dGlscy5kZXRlY3RCcm93c2VyKHdpbmRvdyk7XHJcbiAgdmFyIG5hdmlnYXRvciA9IHdpbmRvdyAmJiB3aW5kb3cubmF2aWdhdG9yO1xyXG5cclxuICB2YXIgY29uc3RyYWludHNUb0Nocm9tZV8gPSBmdW5jdGlvbihjKSB7XHJcbiAgICBpZiAodHlwZW9mIGMgIT09ICdvYmplY3QnIHx8IGMubWFuZGF0b3J5IHx8IGMub3B0aW9uYWwpIHtcclxuICAgICAgcmV0dXJuIGM7XHJcbiAgICB9XHJcbiAgICB2YXIgY2MgPSB7fTtcclxuICAgIE9iamVjdC5rZXlzKGMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgIGlmIChrZXkgPT09ICdyZXF1aXJlJyB8fCBrZXkgPT09ICdhZHZhbmNlZCcgfHwga2V5ID09PSAnbWVkaWFTb3VyY2UnKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHZhciByID0gKHR5cGVvZiBjW2tleV0gPT09ICdvYmplY3QnKSA/IGNba2V5XSA6IHtpZGVhbDogY1trZXldfTtcclxuICAgICAgaWYgKHIuZXhhY3QgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygci5leGFjdCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICByLm1pbiA9IHIubWF4ID0gci5leGFjdDtcclxuICAgICAgfVxyXG4gICAgICB2YXIgb2xkbmFtZV8gPSBmdW5jdGlvbihwcmVmaXgsIG5hbWUpIHtcclxuICAgICAgICBpZiAocHJlZml4KSB7XHJcbiAgICAgICAgICByZXR1cm4gcHJlZml4ICsgbmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIG5hbWUuc2xpY2UoMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAobmFtZSA9PT0gJ2RldmljZUlkJykgPyAnc291cmNlSWQnIDogbmFtZTtcclxuICAgICAgfTtcclxuICAgICAgaWYgKHIuaWRlYWwgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGNjLm9wdGlvbmFsID0gY2Mub3B0aW9uYWwgfHwgW107XHJcbiAgICAgICAgdmFyIG9jID0ge307XHJcbiAgICAgICAgaWYgKHR5cGVvZiByLmlkZWFsID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgb2Nbb2xkbmFtZV8oJ21pbicsIGtleSldID0gci5pZGVhbDtcclxuICAgICAgICAgIGNjLm9wdGlvbmFsLnB1c2gob2MpO1xyXG4gICAgICAgICAgb2MgPSB7fTtcclxuICAgICAgICAgIG9jW29sZG5hbWVfKCdtYXgnLCBrZXkpXSA9IHIuaWRlYWw7XHJcbiAgICAgICAgICBjYy5vcHRpb25hbC5wdXNoKG9jKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgb2Nbb2xkbmFtZV8oJycsIGtleSldID0gci5pZGVhbDtcclxuICAgICAgICAgIGNjLm9wdGlvbmFsLnB1c2gob2MpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAoci5leGFjdCAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiByLmV4YWN0ICE9PSAnbnVtYmVyJykge1xyXG4gICAgICAgIGNjLm1hbmRhdG9yeSA9IGNjLm1hbmRhdG9yeSB8fCB7fTtcclxuICAgICAgICBjYy5tYW5kYXRvcnlbb2xkbmFtZV8oJycsIGtleSldID0gci5leGFjdDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBbJ21pbicsICdtYXgnXS5mb3JFYWNoKGZ1bmN0aW9uKG1peCkge1xyXG4gICAgICAgICAgaWYgKHJbbWl4XSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGNjLm1hbmRhdG9yeSA9IGNjLm1hbmRhdG9yeSB8fCB7fTtcclxuICAgICAgICAgICAgY2MubWFuZGF0b3J5W29sZG5hbWVfKG1peCwga2V5KV0gPSByW21peF07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgaWYgKGMuYWR2YW5jZWQpIHtcclxuICAgICAgY2Mub3B0aW9uYWwgPSAoY2Mub3B0aW9uYWwgfHwgW10pLmNvbmNhdChjLmFkdmFuY2VkKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjYztcclxuICB9O1xyXG5cclxuICB2YXIgc2hpbUNvbnN0cmFpbnRzXyA9IGZ1bmN0aW9uKGNvbnN0cmFpbnRzLCBmdW5jKSB7XHJcbiAgICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA+PSA2MSkge1xyXG4gICAgICByZXR1cm4gZnVuYyhjb25zdHJhaW50cyk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJhaW50cyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoY29uc3RyYWludHMpKTtcclxuICAgIGlmIChjb25zdHJhaW50cyAmJiB0eXBlb2YgY29uc3RyYWludHMuYXVkaW8gPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIHZhciByZW1hcCA9IGZ1bmN0aW9uKG9iaiwgYSwgYikge1xyXG4gICAgICAgIGlmIChhIGluIG9iaiAmJiAhKGIgaW4gb2JqKSkge1xyXG4gICAgICAgICAgb2JqW2JdID0gb2JqW2FdO1xyXG4gICAgICAgICAgZGVsZXRlIG9ialthXTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICAgIGNvbnN0cmFpbnRzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShjb25zdHJhaW50cykpO1xyXG4gICAgICByZW1hcChjb25zdHJhaW50cy5hdWRpbywgJ2F1dG9HYWluQ29udHJvbCcsICdnb29nQXV0b0dhaW5Db250cm9sJyk7XHJcbiAgICAgIHJlbWFwKGNvbnN0cmFpbnRzLmF1ZGlvLCAnbm9pc2VTdXBwcmVzc2lvbicsICdnb29nTm9pc2VTdXBwcmVzc2lvbicpO1xyXG4gICAgICBjb25zdHJhaW50cy5hdWRpbyA9IGNvbnN0cmFpbnRzVG9DaHJvbWVfKGNvbnN0cmFpbnRzLmF1ZGlvKTtcclxuICAgIH1cclxuICAgIGlmIChjb25zdHJhaW50cyAmJiB0eXBlb2YgY29uc3RyYWludHMudmlkZW8gPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIC8vIFNoaW0gZmFjaW5nTW9kZSBmb3IgbW9iaWxlICYgc3VyZmFjZSBwcm8uXHJcbiAgICAgIHZhciBmYWNlID0gY29uc3RyYWludHMudmlkZW8uZmFjaW5nTW9kZTtcclxuICAgICAgZmFjZSA9IGZhY2UgJiYgKCh0eXBlb2YgZmFjZSA9PT0gJ29iamVjdCcpID8gZmFjZSA6IHtpZGVhbDogZmFjZX0pO1xyXG4gICAgICB2YXIgZ2V0U3VwcG9ydGVkRmFjaW5nTW9kZUxpZXMgPSBicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgNjY7XHJcblxyXG4gICAgICBpZiAoKGZhY2UgJiYgKGZhY2UuZXhhY3QgPT09ICd1c2VyJyB8fCBmYWNlLmV4YWN0ID09PSAnZW52aXJvbm1lbnQnIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgZmFjZS5pZGVhbCA9PT0gJ3VzZXInIHx8IGZhY2UuaWRlYWwgPT09ICdlbnZpcm9ubWVudCcpKSAmJlxyXG4gICAgICAgICAgIShuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFN1cHBvcnRlZENvbnN0cmFpbnRzICYmXHJcbiAgICAgICAgICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0U3VwcG9ydGVkQ29uc3RyYWludHMoKS5mYWNpbmdNb2RlICYmXHJcbiAgICAgICAgICAgICFnZXRTdXBwb3J0ZWRGYWNpbmdNb2RlTGllcykpIHtcclxuICAgICAgICBkZWxldGUgY29uc3RyYWludHMudmlkZW8uZmFjaW5nTW9kZTtcclxuICAgICAgICB2YXIgbWF0Y2hlcztcclxuICAgICAgICBpZiAoZmFjZS5leGFjdCA9PT0gJ2Vudmlyb25tZW50JyB8fCBmYWNlLmlkZWFsID09PSAnZW52aXJvbm1lbnQnKSB7XHJcbiAgICAgICAgICBtYXRjaGVzID0gWydiYWNrJywgJ3JlYXInXTtcclxuICAgICAgICB9IGVsc2UgaWYgKGZhY2UuZXhhY3QgPT09ICd1c2VyJyB8fCBmYWNlLmlkZWFsID09PSAndXNlcicpIHtcclxuICAgICAgICAgIG1hdGNoZXMgPSBbJ2Zyb250J107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtYXRjaGVzKSB7XHJcbiAgICAgICAgICAvLyBMb29rIGZvciBtYXRjaGVzIGluIGxhYmVsLCBvciB1c2UgbGFzdCBjYW0gZm9yIGJhY2sgKHR5cGljYWwpLlxyXG4gICAgICAgICAgcmV0dXJuIG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlcygpXHJcbiAgICAgICAgICAudGhlbihmdW5jdGlvbihkZXZpY2VzKSB7XHJcbiAgICAgICAgICAgIGRldmljZXMgPSBkZXZpY2VzLmZpbHRlcihmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGQua2luZCA9PT0gJ3ZpZGVvaW5wdXQnO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIGRldiA9IGRldmljZXMuZmluZChmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXMuc29tZShmdW5jdGlvbihtYXRjaCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGQubGFiZWwudG9Mb3dlckNhc2UoKS5pbmRleE9mKG1hdGNoKSAhPT0gLTE7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoIWRldiAmJiBkZXZpY2VzLmxlbmd0aCAmJiBtYXRjaGVzLmluZGV4T2YoJ2JhY2snKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICBkZXYgPSBkZXZpY2VzW2RldmljZXMubGVuZ3RoIC0gMV07IC8vIG1vcmUgbGlrZWx5IHRoZSBiYWNrIGNhbVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkZXYpIHtcclxuICAgICAgICAgICAgICBjb25zdHJhaW50cy52aWRlby5kZXZpY2VJZCA9IGZhY2UuZXhhY3QgPyB7ZXhhY3Q6IGRldi5kZXZpY2VJZH0gOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpZGVhbDogZGV2LmRldmljZUlkfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdHJhaW50cy52aWRlbyA9IGNvbnN0cmFpbnRzVG9DaHJvbWVfKGNvbnN0cmFpbnRzLnZpZGVvKTtcclxuICAgICAgICAgICAgbG9nZ2luZygnY2hyb21lOiAnICsgSlNPTi5zdHJpbmdpZnkoY29uc3RyYWludHMpKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmMoY29uc3RyYWludHMpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0cmFpbnRzLnZpZGVvID0gY29uc3RyYWludHNUb0Nocm9tZV8oY29uc3RyYWludHMudmlkZW8pO1xyXG4gICAgfVxyXG4gICAgbG9nZ2luZygnY2hyb21lOiAnICsgSlNPTi5zdHJpbmdpZnkoY29uc3RyYWludHMpKTtcclxuICAgIHJldHVybiBmdW5jKGNvbnN0cmFpbnRzKTtcclxuICB9O1xyXG5cclxuICB2YXIgc2hpbUVycm9yXyA9IGZ1bmN0aW9uKGUpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5hbWU6IHtcclxuICAgICAgICBQZXJtaXNzaW9uRGVuaWVkRXJyb3I6ICdOb3RBbGxvd2VkRXJyb3InLFxyXG4gICAgICAgIFBlcm1pc3Npb25EaXNtaXNzZWRFcnJvcjogJ05vdEFsbG93ZWRFcnJvcicsXHJcbiAgICAgICAgSW52YWxpZFN0YXRlRXJyb3I6ICdOb3RBbGxvd2VkRXJyb3InLFxyXG4gICAgICAgIERldmljZXNOb3RGb3VuZEVycm9yOiAnTm90Rm91bmRFcnJvcicsXHJcbiAgICAgICAgQ29uc3RyYWludE5vdFNhdGlzZmllZEVycm9yOiAnT3ZlcmNvbnN0cmFpbmVkRXJyb3InLFxyXG4gICAgICAgIFRyYWNrU3RhcnRFcnJvcjogJ05vdFJlYWRhYmxlRXJyb3InLFxyXG4gICAgICAgIE1lZGlhRGV2aWNlRmFpbGVkRHVlVG9TaHV0ZG93bjogJ05vdEFsbG93ZWRFcnJvcicsXHJcbiAgICAgICAgTWVkaWFEZXZpY2VLaWxsU3dpdGNoT246ICdOb3RBbGxvd2VkRXJyb3InLFxyXG4gICAgICAgIFRhYkNhcHR1cmVFcnJvcjogJ0Fib3J0RXJyb3InLFxyXG4gICAgICAgIFNjcmVlbkNhcHR1cmVFcnJvcjogJ0Fib3J0RXJyb3InLFxyXG4gICAgICAgIERldmljZUNhcHR1cmVFcnJvcjogJ0Fib3J0RXJyb3InXHJcbiAgICAgIH1bZS5uYW1lXSB8fCBlLm5hbWUsXHJcbiAgICAgIG1lc3NhZ2U6IGUubWVzc2FnZSxcclxuICAgICAgY29uc3RyYWludDogZS5jb25zdHJhaW50TmFtZSxcclxuICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5hbWUgKyAodGhpcy5tZXNzYWdlICYmICc6ICcpICsgdGhpcy5tZXNzYWdlO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH07XHJcblxyXG4gIHZhciBnZXRVc2VyTWVkaWFfID0gZnVuY3Rpb24oY29uc3RyYWludHMsIG9uU3VjY2Vzcywgb25FcnJvcikge1xyXG4gICAgc2hpbUNvbnN0cmFpbnRzXyhjb25zdHJhaW50cywgZnVuY3Rpb24oYykge1xyXG4gICAgICBuYXZpZ2F0b3Iud2Via2l0R2V0VXNlck1lZGlhKGMsIG9uU3VjY2VzcywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmIChvbkVycm9yKSB7XHJcbiAgICAgICAgICBvbkVycm9yKHNoaW1FcnJvcl8oZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhID0gZ2V0VXNlck1lZGlhXztcclxuXHJcbiAgLy8gUmV0dXJucyB0aGUgcmVzdWx0IG9mIGdldFVzZXJNZWRpYSBhcyBhIFByb21pc2UuXHJcbiAgdmFyIGdldFVzZXJNZWRpYVByb21pc2VfID0gZnVuY3Rpb24oY29uc3RyYWludHMpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgbmF2aWdhdG9yLmdldFVzZXJNZWRpYShjb25zdHJhaW50cywgcmVzb2x2ZSwgcmVqZWN0KTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIGlmICghbmF2aWdhdG9yLm1lZGlhRGV2aWNlcykge1xyXG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcyA9IHtcclxuICAgICAgZ2V0VXNlck1lZGlhOiBnZXRVc2VyTWVkaWFQcm9taXNlXyxcclxuICAgICAgZW51bWVyYXRlRGV2aWNlczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcclxuICAgICAgICAgIHZhciBraW5kcyA9IHthdWRpbzogJ2F1ZGlvaW5wdXQnLCB2aWRlbzogJ3ZpZGVvaW5wdXQnfTtcclxuICAgICAgICAgIHJldHVybiB3aW5kb3cuTWVkaWFTdHJlYW1UcmFjay5nZXRTb3VyY2VzKGZ1bmN0aW9uKGRldmljZXMpIHtcclxuICAgICAgICAgICAgcmVzb2x2ZShkZXZpY2VzLm1hcChmdW5jdGlvbihkZXZpY2UpIHtcclxuICAgICAgICAgICAgICByZXR1cm4ge2xhYmVsOiBkZXZpY2UubGFiZWwsXHJcbiAgICAgICAgICAgICAgICBraW5kOiBraW5kc1tkZXZpY2Uua2luZF0sXHJcbiAgICAgICAgICAgICAgICBkZXZpY2VJZDogZGV2aWNlLmlkLFxyXG4gICAgICAgICAgICAgICAgZ3JvdXBJZDogJyd9O1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSxcclxuICAgICAgZ2V0U3VwcG9ydGVkQ29uc3RyYWludHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBkZXZpY2VJZDogdHJ1ZSwgZWNob0NhbmNlbGxhdGlvbjogdHJ1ZSwgZmFjaW5nTW9kZTogdHJ1ZSxcclxuICAgICAgICAgIGZyYW1lUmF0ZTogdHJ1ZSwgaGVpZ2h0OiB0cnVlLCB3aWR0aDogdHJ1ZVxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvLyBBIHNoaW0gZm9yIGdldFVzZXJNZWRpYSBtZXRob2Qgb24gdGhlIG1lZGlhRGV2aWNlcyBvYmplY3QuXHJcbiAgLy8gVE9ETyhLYXB0ZW5KYW5zc29uKSByZW1vdmUgb25jZSBpbXBsZW1lbnRlZCBpbiBDaHJvbWUgc3RhYmxlLlxyXG4gIGlmICghbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEpIHtcclxuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhID0gZnVuY3Rpb24oY29uc3RyYWludHMpIHtcclxuICAgICAgcmV0dXJuIGdldFVzZXJNZWRpYVByb21pc2VfKGNvbnN0cmFpbnRzKTtcclxuICAgIH07XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIEV2ZW4gdGhvdWdoIENocm9tZSA0NSBoYXMgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcyBhbmQgYSBnZXRVc2VyTWVkaWFcclxuICAgIC8vIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYSBQcm9taXNlLCBpdCBkb2VzIG5vdCBhY2NlcHQgc3BlYy1zdHlsZVxyXG4gICAgLy8gY29uc3RyYWludHMuXHJcbiAgICB2YXIgb3JpZ0dldFVzZXJNZWRpYSA9IG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhLlxyXG4gICAgICAgIGJpbmQobmF2aWdhdG9yLm1lZGlhRGV2aWNlcyk7XHJcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSA9IGZ1bmN0aW9uKGNzKSB7XHJcbiAgICAgIHJldHVybiBzaGltQ29uc3RyYWludHNfKGNzLCBmdW5jdGlvbihjKSB7XHJcbiAgICAgICAgcmV0dXJuIG9yaWdHZXRVc2VyTWVkaWEoYykudGhlbihmdW5jdGlvbihzdHJlYW0pIHtcclxuICAgICAgICAgIGlmIChjLmF1ZGlvICYmICFzdHJlYW0uZ2V0QXVkaW9UcmFja3MoKS5sZW5ndGggfHxcclxuICAgICAgICAgICAgICBjLnZpZGVvICYmICFzdHJlYW0uZ2V0VmlkZW9UcmFja3MoKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcclxuICAgICAgICAgICAgICB0cmFjay5zdG9wKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKCcnLCAnTm90Rm91bmRFcnJvcicpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIHN0cmVhbTtcclxuICAgICAgICB9LCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3Qoc2hpbUVycm9yXyhlKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8vIER1bW15IGRldmljZWNoYW5nZSBldmVudCBtZXRob2RzLlxyXG4gIC8vIFRPRE8oS2FwdGVuSmFuc3NvbikgcmVtb3ZlIG9uY2UgaW1wbGVtZW50ZWQgaW4gQ2hyb21lIHN0YWJsZS5cclxuICBpZiAodHlwZW9mIG5hdmlnYXRvci5tZWRpYURldmljZXMuYWRkRXZlbnRMaXN0ZW5lciA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBsb2dnaW5nKCdEdW1teSBtZWRpYURldmljZXMuYWRkRXZlbnRMaXN0ZW5lciBjYWxsZWQuJyk7XHJcbiAgICB9O1xyXG4gIH1cclxuICBpZiAodHlwZW9mIG5hdmlnYXRvci5tZWRpYURldmljZXMucmVtb3ZlRXZlbnRMaXN0ZW5lciA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBsb2dnaW5nKCdEdW1teSBtZWRpYURldmljZXMucmVtb3ZlRXZlbnRMaXN0ZW5lciBjYWxsZWQuJyk7XHJcbiAgICB9O1xyXG4gIH1cclxufTtcclxuXHJcbn0se1wiLi4vdXRpbHMuanNcIjoxM31dLDc6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG4vKlxyXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE3IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKlxyXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxyXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXHJcbiAqICB0cmVlLlxyXG4gKi9cclxuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG52YXIgU0RQVXRpbHMgPSByZXF1aXJlKCdzZHAnKTtcclxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgc2hpbVJUQ0ljZUNhbmRpZGF0ZTogZnVuY3Rpb24od2luZG93KSB7XHJcbiAgICAvLyBmb3VuZGF0aW9uIGlzIGFyYml0cmFyaWx5IGNob3NlbiBhcyBhbiBpbmRpY2F0b3IgZm9yIGZ1bGwgc3VwcG9ydCBmb3JcclxuICAgIC8vIGh0dHBzOi8vdzNjLmdpdGh1Yi5pby93ZWJydGMtcGMvI3J0Y2ljZWNhbmRpZGF0ZS1pbnRlcmZhY2VcclxuICAgIGlmICghd2luZG93LlJUQ0ljZUNhbmRpZGF0ZSB8fCAod2luZG93LlJUQ0ljZUNhbmRpZGF0ZSAmJiAnZm91bmRhdGlvbicgaW5cclxuICAgICAgICB3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlLnByb3RvdHlwZSkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBOYXRpdmVSVENJY2VDYW5kaWRhdGUgPSB3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlO1xyXG4gICAgd2luZG93LlJUQ0ljZUNhbmRpZGF0ZSA9IGZ1bmN0aW9uKGFyZ3MpIHtcclxuICAgICAgLy8gUmVtb3ZlIHRoZSBhPSB3aGljaCBzaG91bGRuJ3QgYmUgcGFydCBvZiB0aGUgY2FuZGlkYXRlIHN0cmluZy5cclxuICAgICAgaWYgKHR5cGVvZiBhcmdzID09PSAnb2JqZWN0JyAmJiBhcmdzLmNhbmRpZGF0ZSAmJlxyXG4gICAgICAgICAgYXJncy5jYW5kaWRhdGUuaW5kZXhPZignYT0nKSA9PT0gMCkge1xyXG4gICAgICAgIGFyZ3MgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGFyZ3MpKTtcclxuICAgICAgICBhcmdzLmNhbmRpZGF0ZSA9IGFyZ3MuY2FuZGlkYXRlLnN1YnN0cigyKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGFyZ3MuY2FuZGlkYXRlICYmIGFyZ3MuY2FuZGlkYXRlLmxlbmd0aCkge1xyXG4gICAgICAgIC8vIEF1Z21lbnQgdGhlIG5hdGl2ZSBjYW5kaWRhdGUgd2l0aCB0aGUgcGFyc2VkIGZpZWxkcy5cclxuICAgICAgICB2YXIgbmF0aXZlQ2FuZGlkYXRlID0gbmV3IE5hdGl2ZVJUQ0ljZUNhbmRpZGF0ZShhcmdzKTtcclxuICAgICAgICB2YXIgcGFyc2VkQ2FuZGlkYXRlID0gU0RQVXRpbHMucGFyc2VDYW5kaWRhdGUoYXJncy5jYW5kaWRhdGUpO1xyXG4gICAgICAgIHZhciBhdWdtZW50ZWRDYW5kaWRhdGUgPSBPYmplY3QuYXNzaWduKG5hdGl2ZUNhbmRpZGF0ZSxcclxuICAgICAgICAgICAgcGFyc2VkQ2FuZGlkYXRlKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIGEgc2VyaWFsaXplciB0aGF0IGRvZXMgbm90IHNlcmlhbGl6ZSB0aGUgZXh0cmEgYXR0cmlidXRlcy5cclxuICAgICAgICBhdWdtZW50ZWRDYW5kaWRhdGUudG9KU09OID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjYW5kaWRhdGU6IGF1Z21lbnRlZENhbmRpZGF0ZS5jYW5kaWRhdGUsXHJcbiAgICAgICAgICAgIHNkcE1pZDogYXVnbWVudGVkQ2FuZGlkYXRlLnNkcE1pZCxcclxuICAgICAgICAgICAgc2RwTUxpbmVJbmRleDogYXVnbWVudGVkQ2FuZGlkYXRlLnNkcE1MaW5lSW5kZXgsXHJcbiAgICAgICAgICAgIHVzZXJuYW1lRnJhZ21lbnQ6IGF1Z21lbnRlZENhbmRpZGF0ZS51c2VybmFtZUZyYWdtZW50LFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBhdWdtZW50ZWRDYW5kaWRhdGU7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG5ldyBOYXRpdmVSVENJY2VDYW5kaWRhdGUoYXJncyk7XHJcbiAgICB9O1xyXG4gICAgd2luZG93LlJUQ0ljZUNhbmRpZGF0ZS5wcm90b3R5cGUgPSBOYXRpdmVSVENJY2VDYW5kaWRhdGUucHJvdG90eXBlO1xyXG5cclxuICAgIC8vIEhvb2sgdXAgdGhlIGF1Z21lbnRlZCBjYW5kaWRhdGUgaW4gb25pY2VjYW5kaWRhdGUgYW5kXHJcbiAgICAvLyBhZGRFdmVudExpc3RlbmVyKCdpY2VjYW5kaWRhdGUnLCAuLi4pXHJcbiAgICB1dGlscy53cmFwUGVlckNvbm5lY3Rpb25FdmVudCh3aW5kb3csICdpY2VjYW5kaWRhdGUnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgIGlmIChlLmNhbmRpZGF0ZSkge1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCAnY2FuZGlkYXRlJywge1xyXG4gICAgICAgICAgdmFsdWU6IG5ldyB3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlKGUuY2FuZGlkYXRlKSxcclxuICAgICAgICAgIHdyaXRhYmxlOiAnZmFsc2UnXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGU7XHJcbiAgICB9KTtcclxuICB9LFxyXG5cclxuICAvLyBzaGltQ3JlYXRlT2JqZWN0VVJMIG11c3QgYmUgY2FsbGVkIGJlZm9yZSBzaGltU291cmNlT2JqZWN0IHRvIGF2b2lkIGxvb3AuXHJcblxyXG4gIHNoaW1DcmVhdGVPYmplY3RVUkw6IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgdmFyIFVSTCA9IHdpbmRvdyAmJiB3aW5kb3cuVVJMO1xyXG5cclxuICAgIGlmICghKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50ICYmXHJcbiAgICAgICAgICAnc3JjT2JqZWN0JyBpbiB3aW5kb3cuSFRNTE1lZGlhRWxlbWVudC5wcm90b3R5cGUgJiZcclxuICAgICAgICBVUkwuY3JlYXRlT2JqZWN0VVJMICYmIFVSTC5yZXZva2VPYmplY3RVUkwpKSB7XHJcbiAgICAgIC8vIE9ubHkgc2hpbSBDcmVhdGVPYmplY3RVUkwgdXNpbmcgc3JjT2JqZWN0IGlmIHNyY09iamVjdCBleGlzdHMuXHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG5hdGl2ZUNyZWF0ZU9iamVjdFVSTCA9IFVSTC5jcmVhdGVPYmplY3RVUkwuYmluZChVUkwpO1xyXG4gICAgdmFyIG5hdGl2ZVJldm9rZU9iamVjdFVSTCA9IFVSTC5yZXZva2VPYmplY3RVUkwuYmluZChVUkwpO1xyXG4gICAgdmFyIHN0cmVhbXMgPSBuZXcgTWFwKCksIG5ld0lkID0gMDtcclxuXHJcbiAgICBVUkwuY3JlYXRlT2JqZWN0VVJMID0gZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICAgIGlmICgnZ2V0VHJhY2tzJyBpbiBzdHJlYW0pIHtcclxuICAgICAgICB2YXIgdXJsID0gJ3BvbHlibG9iOicgKyAoKytuZXdJZCk7XHJcbiAgICAgICAgc3RyZWFtcy5zZXQodXJsLCBzdHJlYW0pO1xyXG4gICAgICAgIHV0aWxzLmRlcHJlY2F0ZWQoJ1VSTC5jcmVhdGVPYmplY3RVUkwoc3RyZWFtKScsXHJcbiAgICAgICAgICAgICdlbGVtLnNyY09iamVjdCA9IHN0cmVhbScpO1xyXG4gICAgICAgIHJldHVybiB1cmw7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG5hdGl2ZUNyZWF0ZU9iamVjdFVSTChzdHJlYW0pO1xyXG4gICAgfTtcclxuICAgIFVSTC5yZXZva2VPYmplY3RVUkwgPSBmdW5jdGlvbih1cmwpIHtcclxuICAgICAgbmF0aXZlUmV2b2tlT2JqZWN0VVJMKHVybCk7XHJcbiAgICAgIHN0cmVhbXMuZGVsZXRlKHVybCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBkc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50LnByb3RvdHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzcmMnKTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuSFRNTE1lZGlhRWxlbWVudC5wcm90b3R5cGUsICdzcmMnLCB7XHJcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGRzYy5nZXQuYXBwbHkodGhpcyk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHNldDogZnVuY3Rpb24odXJsKSB7XHJcbiAgICAgICAgdGhpcy5zcmNPYmplY3QgPSBzdHJlYW1zLmdldCh1cmwpIHx8IG51bGw7XHJcbiAgICAgICAgcmV0dXJuIGRzYy5zZXQuYXBwbHkodGhpcywgW3VybF0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgbmF0aXZlU2V0QXR0cmlidXRlID0gd2luZG93LkhUTUxNZWRpYUVsZW1lbnQucHJvdG90eXBlLnNldEF0dHJpYnV0ZTtcclxuICAgIHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50LnByb3RvdHlwZS5zZXRBdHRyaWJ1dGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIgJiZcclxuICAgICAgICAgICgnJyArIGFyZ3VtZW50c1swXSkudG9Mb3dlckNhc2UoKSA9PT0gJ3NyYycpIHtcclxuICAgICAgICB0aGlzLnNyY09iamVjdCA9IHN0cmVhbXMuZ2V0KGFyZ3VtZW50c1sxXSkgfHwgbnVsbDtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbmF0aXZlU2V0QXR0cmlidXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xyXG4gIH0sXHJcblxyXG4gIHNoaW1NYXhNZXNzYWdlU2l6ZTogZnVuY3Rpb24od2luZG93KSB7XHJcbiAgICBpZiAod2luZG93LlJUQ1NjdHBUcmFuc3BvcnQgfHwgIXdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB2YXIgYnJvd3NlckRldGFpbHMgPSB1dGlscy5kZXRlY3RCcm93c2VyKHdpbmRvdyk7XHJcblxyXG4gICAgaWYgKCEoJ3NjdHAnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLCAnc2N0cCcsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLl9zY3RwID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiB0aGlzLl9zY3RwO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHNjdHBJbkRlc2NyaXB0aW9uID0gZnVuY3Rpb24oZGVzY3JpcHRpb24pIHtcclxuICAgICAgdmFyIHNlY3Rpb25zID0gU0RQVXRpbHMuc3BsaXRTZWN0aW9ucyhkZXNjcmlwdGlvbi5zZHApO1xyXG4gICAgICBzZWN0aW9ucy5zaGlmdCgpO1xyXG4gICAgICByZXR1cm4gc2VjdGlvbnMuc29tZShmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcclxuICAgICAgICB2YXIgbUxpbmUgPSBTRFBVdGlscy5wYXJzZU1MaW5lKG1lZGlhU2VjdGlvbik7XHJcbiAgICAgICAgcmV0dXJuIG1MaW5lICYmIG1MaW5lLmtpbmQgPT09ICdhcHBsaWNhdGlvbidcclxuICAgICAgICAgICAgJiYgbUxpbmUucHJvdG9jb2wuaW5kZXhPZignU0NUUCcpICE9PSAtMTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBnZXRSZW1vdGVGaXJlZm94VmVyc2lvbiA9IGZ1bmN0aW9uKGRlc2NyaXB0aW9uKSB7XHJcbiAgICAgIC8vIFRPRE86IElzIHRoZXJlIGEgYmV0dGVyIHNvbHV0aW9uIGZvciBkZXRlY3RpbmcgRmlyZWZveD9cclxuICAgICAgdmFyIG1hdGNoID0gZGVzY3JpcHRpb24uc2RwLm1hdGNoKC9tb3ppbGxhLi4uVEhJU19JU19TRFBBUlRBLShcXGQrKS8pO1xyXG4gICAgICBpZiAobWF0Y2ggPT09IG51bGwgfHwgbWF0Y2gubGVuZ3RoIDwgMikge1xyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgICAgfVxyXG4gICAgICB2YXIgdmVyc2lvbiA9IHBhcnNlSW50KG1hdGNoWzFdLCAxMCk7XHJcbiAgICAgIC8vIFRlc3QgZm9yIE5hTiAoeWVzLCB0aGlzIGlzIHVnbHkpXHJcbiAgICAgIHJldHVybiB2ZXJzaW9uICE9PSB2ZXJzaW9uID8gLTEgOiB2ZXJzaW9uO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgZ2V0Q2FuU2VuZE1heE1lc3NhZ2VTaXplID0gZnVuY3Rpb24ocmVtb3RlSXNGaXJlZm94KSB7XHJcbiAgICAgIC8vIEV2ZXJ5IGltcGxlbWVudGF0aW9uIHdlIGtub3cgY2FuIHNlbmQgYXQgbGVhc3QgNjQgS2lCLlxyXG4gICAgICAvLyBOb3RlOiBBbHRob3VnaCBDaHJvbWUgaXMgdGVjaG5pY2FsbHkgYWJsZSB0byBzZW5kIHVwIHRvIDI1NiBLaUIsIHRoZVxyXG4gICAgICAvLyAgICAgICBkYXRhIGRvZXMgbm90IHJlYWNoIHRoZSBvdGhlciBwZWVyIHJlbGlhYmx5LlxyXG4gICAgICAvLyAgICAgICBTZWU6IGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC93ZWJydGMvaXNzdWVzL2RldGFpbD9pZD04NDE5XHJcbiAgICAgIHZhciBjYW5TZW5kTWF4TWVzc2FnZVNpemUgPSA2NTUzNjtcclxuICAgICAgaWYgKGJyb3dzZXJEZXRhaWxzLmJyb3dzZXIgPT09ICdmaXJlZm94Jykge1xyXG4gICAgICAgIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgNTcpIHtcclxuICAgICAgICAgIGlmIChyZW1vdGVJc0ZpcmVmb3ggPT09IC0xKSB7XHJcbiAgICAgICAgICAgIC8vIEZGIDwgNTcgd2lsbCBzZW5kIGluIDE2IEtpQiBjaHVua3MgdXNpbmcgdGhlIGRlcHJlY2F0ZWQgUFBJRFxyXG4gICAgICAgICAgICAvLyBmcmFnbWVudGF0aW9uLlxyXG4gICAgICAgICAgICBjYW5TZW5kTWF4TWVzc2FnZVNpemUgPSAxNjM4NDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIEhvd2V2ZXIsIG90aGVyIEZGIChhbmQgUkFXUlRDKSBjYW4gcmVhc3NlbWJsZSBQUElELWZyYWdtZW50ZWRcclxuICAgICAgICAgICAgLy8gbWVzc2FnZXMuIFRodXMsIHN1cHBvcnRpbmcgfjIgR2lCIHdoZW4gc2VuZGluZy5cclxuICAgICAgICAgICAgY2FuU2VuZE1heE1lc3NhZ2VTaXplID0gMjE0NzQ4MzYzNztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gQ3VycmVudGx5LCBhbGwgRkYgPj0gNTcgd2lsbCByZXNldCB0aGUgcmVtb3RlIG1heGltdW0gbWVzc2FnZSBzaXplXHJcbiAgICAgICAgICAvLyB0byB0aGUgZGVmYXVsdCB2YWx1ZSB3aGVuIGEgZGF0YSBjaGFubmVsIGlzIGNyZWF0ZWQgYXQgYSBsYXRlclxyXG4gICAgICAgICAgLy8gc3RhZ2UuIDooXHJcbiAgICAgICAgICAvLyBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTE0MjY4MzFcclxuICAgICAgICAgIGNhblNlbmRNYXhNZXNzYWdlU2l6ZSA9XHJcbiAgICAgICAgICAgIGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPT09IDU3ID8gNjU1MzUgOiA2NTUzNjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGNhblNlbmRNYXhNZXNzYWdlU2l6ZTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIGdldE1heE1lc3NhZ2VTaXplID0gZnVuY3Rpb24oZGVzY3JpcHRpb24sIHJlbW90ZUlzRmlyZWZveCkge1xyXG4gICAgICAvLyBOb3RlOiA2NTUzNiBieXRlcyBpcyB0aGUgZGVmYXVsdCB2YWx1ZSBmcm9tIHRoZSBTRFAgc3BlYy4gQWxzbyxcclxuICAgICAgLy8gICAgICAgZXZlcnkgaW1wbGVtZW50YXRpb24gd2Uga25vdyBzdXBwb3J0cyByZWNlaXZpbmcgNjU1MzYgYnl0ZXMuXHJcbiAgICAgIHZhciBtYXhNZXNzYWdlU2l6ZSA9IDY1NTM2O1xyXG5cclxuICAgICAgLy8gRkYgNTcgaGFzIGEgc2xpZ2h0bHkgaW5jb3JyZWN0IGRlZmF1bHQgcmVtb3RlIG1heCBtZXNzYWdlIHNpemUsIHNvXHJcbiAgICAgIC8vIHdlIG5lZWQgdG8gYWRqdXN0IGl0IGhlcmUgdG8gYXZvaWQgYSBmYWlsdXJlIHdoZW4gc2VuZGluZy5cclxuICAgICAgLy8gU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xNDI1Njk3XHJcbiAgICAgIGlmIChicm93c2VyRGV0YWlscy5icm93c2VyID09PSAnZmlyZWZveCdcclxuICAgICAgICAgICAmJiBicm93c2VyRGV0YWlscy52ZXJzaW9uID09PSA1Nykge1xyXG4gICAgICAgIG1heE1lc3NhZ2VTaXplID0gNjU1MzU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBtYXRjaCA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KGRlc2NyaXB0aW9uLnNkcCwgJ2E9bWF4LW1lc3NhZ2Utc2l6ZTonKTtcclxuICAgICAgaWYgKG1hdGNoLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBtYXhNZXNzYWdlU2l6ZSA9IHBhcnNlSW50KG1hdGNoWzBdLnN1YnN0cigxOSksIDEwKTtcclxuICAgICAgfSBlbHNlIGlmIChicm93c2VyRGV0YWlscy5icm93c2VyID09PSAnZmlyZWZveCcgJiZcclxuICAgICAgICAgICAgICAgICAgcmVtb3RlSXNGaXJlZm94ICE9PSAtMSkge1xyXG4gICAgICAgIC8vIElmIHRoZSBtYXhpbXVtIG1lc3NhZ2Ugc2l6ZSBpcyBub3QgcHJlc2VudCBpbiB0aGUgcmVtb3RlIFNEUCBhbmRcclxuICAgICAgICAvLyBib3RoIGxvY2FsIGFuZCByZW1vdGUgYXJlIEZpcmVmb3gsIHRoZSByZW1vdGUgcGVlciBjYW4gcmVjZWl2ZVxyXG4gICAgICAgIC8vIH4yIEdpQi5cclxuICAgICAgICBtYXhNZXNzYWdlU2l6ZSA9IDIxNDc0ODM2Mzc7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG1heE1lc3NhZ2VTaXplO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgb3JpZ1NldFJlbW90ZURlc2NyaXB0aW9uID1cclxuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnNldFJlbW90ZURlc2NyaXB0aW9uO1xyXG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5zZXRSZW1vdGVEZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICBwYy5fc2N0cCA9IG51bGw7XHJcblxyXG4gICAgICBpZiAoc2N0cEluRGVzY3JpcHRpb24oYXJndW1lbnRzWzBdKSkge1xyXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSByZW1vdGUgaXMgRkYuXHJcbiAgICAgICAgdmFyIGlzRmlyZWZveCA9IGdldFJlbW90ZUZpcmVmb3hWZXJzaW9uKGFyZ3VtZW50c1swXSk7XHJcblxyXG4gICAgICAgIC8vIEdldCB0aGUgbWF4aW11bSBtZXNzYWdlIHNpemUgdGhlIGxvY2FsIHBlZXIgaXMgY2FwYWJsZSBvZiBzZW5kaW5nXHJcbiAgICAgICAgdmFyIGNhblNlbmRNTVMgPSBnZXRDYW5TZW5kTWF4TWVzc2FnZVNpemUoaXNGaXJlZm94KTtcclxuXHJcbiAgICAgICAgLy8gR2V0IHRoZSBtYXhpbXVtIG1lc3NhZ2Ugc2l6ZSBvZiB0aGUgcmVtb3RlIHBlZXIuXHJcbiAgICAgICAgdmFyIHJlbW90ZU1NUyA9IGdldE1heE1lc3NhZ2VTaXplKGFyZ3VtZW50c1swXSwgaXNGaXJlZm94KTtcclxuXHJcbiAgICAgICAgLy8gRGV0ZXJtaW5lIGZpbmFsIG1heGltdW0gbWVzc2FnZSBzaXplXHJcbiAgICAgICAgdmFyIG1heE1lc3NhZ2VTaXplO1xyXG4gICAgICAgIGlmIChjYW5TZW5kTU1TID09PSAwICYmIHJlbW90ZU1NUyA9PT0gMCkge1xyXG4gICAgICAgICAgbWF4TWVzc2FnZVNpemUgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjYW5TZW5kTU1TID09PSAwIHx8IHJlbW90ZU1NUyA9PT0gMCkge1xyXG4gICAgICAgICAgbWF4TWVzc2FnZVNpemUgPSBNYXRoLm1heChjYW5TZW5kTU1TLCByZW1vdGVNTVMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBtYXhNZXNzYWdlU2l6ZSA9IE1hdGgubWluKGNhblNlbmRNTVMsIHJlbW90ZU1NUyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDcmVhdGUgYSBkdW1teSBSVENTY3RwVHJhbnNwb3J0IG9iamVjdCBhbmQgdGhlICdtYXhNZXNzYWdlU2l6ZSdcclxuICAgICAgICAvLyBhdHRyaWJ1dGUuXHJcbiAgICAgICAgdmFyIHNjdHAgPSB7fTtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2N0cCwgJ21heE1lc3NhZ2VTaXplJywge1xyXG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1heE1lc3NhZ2VTaXplO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBjLl9zY3RwID0gc2N0cDtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG9yaWdTZXRSZW1vdGVEZXNjcmlwdGlvbi5hcHBseShwYywgYXJndW1lbnRzKTtcclxuICAgIH07XHJcbiAgfSxcclxuXHJcbiAgc2hpbVNlbmRUaHJvd1R5cGVFcnJvcjogZnVuY3Rpb24od2luZG93KSB7XHJcbiAgICBpZiAoISh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gJiZcclxuICAgICAgICAnY3JlYXRlRGF0YUNoYW5uZWwnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBOb3RlOiBBbHRob3VnaCBGaXJlZm94ID49IDU3IGhhcyBhIG5hdGl2ZSBpbXBsZW1lbnRhdGlvbiwgdGhlIG1heGltdW1cclxuICAgIC8vICAgICAgIG1lc3NhZ2Ugc2l6ZSBjYW4gYmUgcmVzZXQgZm9yIGFsbCBkYXRhIGNoYW5uZWxzIGF0IGEgbGF0ZXIgc3RhZ2UuXHJcbiAgICAvLyAgICAgICBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTE0MjY4MzFcclxuXHJcbiAgICB2YXIgb3JpZ0NyZWF0ZURhdGFDaGFubmVsID1cclxuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5jcmVhdGVEYXRhQ2hhbm5lbDtcclxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlRGF0YUNoYW5uZWwgPSBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgdmFyIGRhdGFDaGFubmVsID0gb3JpZ0NyZWF0ZURhdGFDaGFubmVsLmFwcGx5KHBjLCBhcmd1bWVudHMpO1xyXG4gICAgICB2YXIgb3JpZ0RhdGFDaGFubmVsU2VuZCA9IGRhdGFDaGFubmVsLnNlbmQ7XHJcblxyXG4gICAgICAvLyBQYXRjaCAnc2VuZCcgbWV0aG9kXHJcbiAgICAgIGRhdGFDaGFubmVsLnNlbmQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZGMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBkYXRhID0gYXJndW1lbnRzWzBdO1xyXG4gICAgICAgIHZhciBsZW5ndGggPSBkYXRhLmxlbmd0aCB8fCBkYXRhLnNpemUgfHwgZGF0YS5ieXRlTGVuZ3RoO1xyXG4gICAgICAgIGlmIChsZW5ndGggPiBwYy5zY3RwLm1heE1lc3NhZ2VTaXplKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKCdNZXNzYWdlIHRvbyBsYXJnZSAoY2FuIHNlbmQgYSBtYXhpbXVtIG9mICcgK1xyXG4gICAgICAgICAgICBwYy5zY3RwLm1heE1lc3NhZ2VTaXplICsgJyBieXRlcyknLCAnVHlwZUVycm9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvcmlnRGF0YUNoYW5uZWxTZW5kLmFwcGx5KGRjLCBhcmd1bWVudHMpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgcmV0dXJuIGRhdGFDaGFubmVsO1xyXG4gICAgfTtcclxuICB9XHJcbn07XHJcblxyXG59LHtcIi4vdXRpbHNcIjoxMyxcInNkcFwiOjJ9XSw4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuLypcclxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcclxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxyXG4gKiAgdHJlZS5cclxuICovXHJcbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcclxudmFyIHNoaW1SVENQZWVyQ29ubmVjdGlvbiA9IHJlcXVpcmUoJ3J0Y3BlZXJjb25uZWN0aW9uLXNoaW0nKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIHNoaW1HZXRVc2VyTWVkaWE6IHJlcXVpcmUoJy4vZ2V0dXNlcm1lZGlhJyksXHJcbiAgc2hpbVBlZXJDb25uZWN0aW9uOiBmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIHZhciBicm93c2VyRGV0YWlscyA9IHV0aWxzLmRldGVjdEJyb3dzZXIod2luZG93KTtcclxuXHJcbiAgICBpZiAod2luZG93LlJUQ0ljZUdhdGhlcmVyKSB7XHJcbiAgICAgIGlmICghd2luZG93LlJUQ0ljZUNhbmRpZGF0ZSkge1xyXG4gICAgICAgIHdpbmRvdy5SVENJY2VDYW5kaWRhdGUgPSBmdW5jdGlvbihhcmdzKSB7XHJcbiAgICAgICAgICByZXR1cm4gYXJncztcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghd2luZG93LlJUQ1Nlc3Npb25EZXNjcmlwdGlvbikge1xyXG4gICAgICAgIHdpbmRvdy5SVENTZXNzaW9uRGVzY3JpcHRpb24gPSBmdW5jdGlvbihhcmdzKSB7XHJcbiAgICAgICAgICByZXR1cm4gYXJncztcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICAgIC8vIHRoaXMgYWRkcyBhbiBhZGRpdGlvbmFsIGV2ZW50IGxpc3RlbmVyIHRvIE1lZGlhU3RyYWNrVHJhY2sgdGhhdCBzaWduYWxzXHJcbiAgICAgIC8vIHdoZW4gYSB0cmFja3MgZW5hYmxlZCBwcm9wZXJ0eSB3YXMgY2hhbmdlZC4gV29ya2Fyb3VuZCBmb3IgYSBidWcgaW5cclxuICAgICAgLy8gYWRkU3RyZWFtLCBzZWUgYmVsb3cuIE5vIGxvbmdlciByZXF1aXJlZCBpbiAxNTAyNStcclxuICAgICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCAxNTAyNSkge1xyXG4gICAgICAgIHZhciBvcmlnTVNURW5hYmxlZCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoXHJcbiAgICAgICAgICAgIHdpbmRvdy5NZWRpYVN0cmVhbVRyYWNrLnByb3RvdHlwZSwgJ2VuYWJsZWQnKTtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93Lk1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLCAnZW5hYmxlZCcsIHtcclxuICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgb3JpZ01TVEVuYWJsZWQuc2V0LmNhbGwodGhpcywgdmFsdWUpO1xyXG4gICAgICAgICAgICB2YXIgZXYgPSBuZXcgRXZlbnQoJ2VuYWJsZWQnKTtcclxuICAgICAgICAgICAgZXYuZW5hYmxlZCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXYpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gT1JUQyBkZWZpbmVzIHRoZSBEVE1GIHNlbmRlciBhIGJpdCBkaWZmZXJlbnQuXHJcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdzNjL29ydGMvaXNzdWVzLzcxNFxyXG4gICAgaWYgKHdpbmRvdy5SVENSdHBTZW5kZXIgJiYgISgnZHRtZicgaW4gd2luZG93LlJUQ1J0cFNlbmRlci5wcm90b3R5cGUpKSB7XHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUnRwU2VuZGVyLnByb3RvdHlwZSwgJ2R0bWYnLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGlmICh0aGlzLl9kdG1mID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudHJhY2sua2luZCA9PT0gJ2F1ZGlvJykge1xyXG4gICAgICAgICAgICAgIHRoaXMuX2R0bWYgPSBuZXcgd2luZG93LlJUQ0R0bWZTZW5kZXIodGhpcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy50cmFjay5raW5kID09PSAndmlkZW8nKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5fZHRtZiA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiB0aGlzLl9kdG1mO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvLyBFZGdlIGN1cnJlbnRseSBvbmx5IGltcGxlbWVudHMgdGhlIFJUQ0R0bWZTZW5kZXIsIG5vdCB0aGVcclxuICAgIC8vIFJUQ0RUTUZTZW5kZXIgYWxpYXMuIFNlZSBodHRwOi8vZHJhZnQub3J0Yy5vcmcvI3J0Y2R0bWZzZW5kZXIyKlxyXG4gICAgaWYgKHdpbmRvdy5SVENEdG1mU2VuZGVyICYmICF3aW5kb3cuUlRDRFRNRlNlbmRlcikge1xyXG4gICAgICB3aW5kb3cuUlRDRFRNRlNlbmRlciA9IHdpbmRvdy5SVENEdG1mU2VuZGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiA9XHJcbiAgICAgICAgc2hpbVJUQ1BlZXJDb25uZWN0aW9uKHdpbmRvdywgYnJvd3NlckRldGFpbHMudmVyc2lvbik7XHJcbiAgfSxcclxuICBzaGltUmVwbGFjZVRyYWNrOiBmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIC8vIE9SVEMgaGFzIHJlcGxhY2VUcmFjayAtLSBodHRwczovL2dpdGh1Yi5jb20vdzNjL29ydGMvaXNzdWVzLzYxNFxyXG4gICAgaWYgKHdpbmRvdy5SVENSdHBTZW5kZXIgJiZcclxuICAgICAgICAhKCdyZXBsYWNlVHJhY2snIGluIHdpbmRvdy5SVENSdHBTZW5kZXIucHJvdG90eXBlKSkge1xyXG4gICAgICB3aW5kb3cuUlRDUnRwU2VuZGVyLnByb3RvdHlwZS5yZXBsYWNlVHJhY2sgPVxyXG4gICAgICAgICAgd2luZG93LlJUQ1J0cFNlbmRlci5wcm90b3R5cGUuc2V0VHJhY2s7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxufSx7XCIuLi91dGlsc1wiOjEzLFwiLi9nZXR1c2VybWVkaWFcIjo5LFwicnRjcGVlcmNvbm5lY3Rpb24tc2hpbVwiOjF9XSw5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuLypcclxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcclxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxyXG4gKiAgdHJlZS5cclxuICovXHJcbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gRXhwb3NlIHB1YmxpYyBtZXRob2RzLlxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gIHZhciBuYXZpZ2F0b3IgPSB3aW5kb3cgJiYgd2luZG93Lm5hdmlnYXRvcjtcclxuXHJcbiAgdmFyIHNoaW1FcnJvcl8gPSBmdW5jdGlvbihlKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuYW1lOiB7UGVybWlzc2lvbkRlbmllZEVycm9yOiAnTm90QWxsb3dlZEVycm9yJ31bZS5uYW1lXSB8fCBlLm5hbWUsXHJcbiAgICAgIG1lc3NhZ2U6IGUubWVzc2FnZSxcclxuICAgICAgY29uc3RyYWludDogZS5jb25zdHJhaW50LFxyXG4gICAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9O1xyXG5cclxuICAvLyBnZXRVc2VyTWVkaWEgZXJyb3Igc2hpbS5cclxuICB2YXIgb3JpZ0dldFVzZXJNZWRpYSA9IG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhLlxyXG4gICAgICBiaW5kKG5hdmlnYXRvci5tZWRpYURldmljZXMpO1xyXG4gIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhID0gZnVuY3Rpb24oYykge1xyXG4gICAgcmV0dXJuIG9yaWdHZXRVc2VyTWVkaWEoYykuY2F0Y2goZnVuY3Rpb24oZSkge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3Qoc2hpbUVycm9yXyhlKSk7XHJcbiAgICB9KTtcclxuICB9O1xyXG59O1xyXG5cclxufSx7fV0sMTA6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG4vKlxyXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKlxyXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxyXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXHJcbiAqICB0cmVlLlxyXG4gKi9cclxuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgc2hpbUdldFVzZXJNZWRpYTogcmVxdWlyZSgnLi9nZXR1c2VybWVkaWEnKSxcclxuICBzaGltT25UcmFjazogZnVuY3Rpb24od2luZG93KSB7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uICYmICEoJ29udHJhY2snIGluXHJcbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkpIHtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUsICdvbnRyYWNrJywge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5fb250cmFjaztcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldDogZnVuY3Rpb24oZikge1xyXG4gICAgICAgICAgaWYgKHRoaXMuX29udHJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFjaycsIHRoaXMuX29udHJhY2spO1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2FkZHN0cmVhbScsIHRoaXMuX29udHJhY2twb2x5KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigndHJhY2snLCB0aGlzLl9vbnRyYWNrID0gZik7XHJcbiAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2FkZHN0cmVhbScsIHRoaXMuX29udHJhY2twb2x5ID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XHJcbiAgICAgICAgICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCd0cmFjaycpO1xyXG4gICAgICAgICAgICAgIGV2ZW50LnRyYWNrID0gdHJhY2s7XHJcbiAgICAgICAgICAgICAgZXZlbnQucmVjZWl2ZXIgPSB7dHJhY2s6IHRyYWNrfTtcclxuICAgICAgICAgICAgICBldmVudC50cmFuc2NlaXZlciA9IHtyZWNlaXZlcjogZXZlbnQucmVjZWl2ZXJ9O1xyXG4gICAgICAgICAgICAgIGV2ZW50LnN0cmVhbXMgPSBbZS5zdHJlYW1dO1xyXG4gICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgd2luZG93LlJUQ1RyYWNrRXZlbnQgJiZcclxuICAgICAgICAoJ3JlY2VpdmVyJyBpbiB3aW5kb3cuUlRDVHJhY2tFdmVudC5wcm90b3R5cGUpICYmXHJcbiAgICAgICAgISgndHJhbnNjZWl2ZXInIGluIHdpbmRvdy5SVENUcmFja0V2ZW50LnByb3RvdHlwZSkpIHtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENUcmFja0V2ZW50LnByb3RvdHlwZSwgJ3RyYW5zY2VpdmVyJywge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZXR1cm4ge3JlY2VpdmVyOiB0aGlzLnJlY2VpdmVyfTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHNoaW1Tb3VyY2VPYmplY3Q6IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgLy8gRmlyZWZveCBoYXMgc3VwcG9ydGVkIG1velNyY09iamVjdCBzaW5jZSBGRjIyLCB1bnByZWZpeGVkIGluIDQyLlxyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGlmICh3aW5kb3cuSFRNTE1lZGlhRWxlbWVudCAmJlxyXG4gICAgICAgICEoJ3NyY09iamVjdCcgaW4gd2luZG93LkhUTUxNZWRpYUVsZW1lbnQucHJvdG90eXBlKSkge1xyXG4gICAgICAgIC8vIFNoaW0gdGhlIHNyY09iamVjdCBwcm9wZXJ0eSwgb25jZSwgd2hlbiBIVE1MTWVkaWFFbGVtZW50IGlzIGZvdW5kLlxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuSFRNTE1lZGlhRWxlbWVudC5wcm90b3R5cGUsICdzcmNPYmplY3QnLCB7XHJcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb3pTcmNPYmplY3Q7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgc2V0OiBmdW5jdGlvbihzdHJlYW0pIHtcclxuICAgICAgICAgICAgdGhpcy5tb3pTcmNPYmplY3QgPSBzdHJlYW07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBzaGltUGVlckNvbm5lY3Rpb246IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgdmFyIGJyb3dzZXJEZXRhaWxzID0gdXRpbHMuZGV0ZWN0QnJvd3Nlcih3aW5kb3cpO1xyXG5cclxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAnb2JqZWN0JyB8fCAhKHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiB8fFxyXG4gICAgICAgIHdpbmRvdy5tb3pSVENQZWVyQ29ubmVjdGlvbikpIHtcclxuICAgICAgcmV0dXJuOyAvLyBwcm9iYWJseSBtZWRpYS5wZWVyY29ubmVjdGlvbi5lbmFibGVkPWZhbHNlIGluIGFib3V0OmNvbmZpZ1xyXG4gICAgfVxyXG4gICAgLy8gVGhlIFJUQ1BlZXJDb25uZWN0aW9uIG9iamVjdC5cclxuICAgIGlmICghd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uKSB7XHJcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiA9IGZ1bmN0aW9uKHBjQ29uZmlnLCBwY0NvbnN0cmFpbnRzKSB7XHJcbiAgICAgICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCAzOCkge1xyXG4gICAgICAgICAgLy8gLnVybHMgaXMgbm90IHN1cHBvcnRlZCBpbiBGRiA8IDM4LlxyXG4gICAgICAgICAgLy8gY3JlYXRlIFJUQ0ljZVNlcnZlcnMgd2l0aCBhIHNpbmdsZSB1cmwuXHJcbiAgICAgICAgICBpZiAocGNDb25maWcgJiYgcGNDb25maWcuaWNlU2VydmVycykge1xyXG4gICAgICAgICAgICB2YXIgbmV3SWNlU2VydmVycyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBjQ29uZmlnLmljZVNlcnZlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICB2YXIgc2VydmVyID0gcGNDb25maWcuaWNlU2VydmVyc1tpXTtcclxuICAgICAgICAgICAgICBpZiAoc2VydmVyLmhhc093blByb3BlcnR5KCd1cmxzJykpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc2VydmVyLnVybHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIG5ld1NlcnZlciA9IHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IHNlcnZlci51cmxzW2pdXHJcbiAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgIGlmIChzZXJ2ZXIudXJsc1tqXS5pbmRleE9mKCd0dXJuJykgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdTZXJ2ZXIudXNlcm5hbWUgPSBzZXJ2ZXIudXNlcm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3U2VydmVyLmNyZWRlbnRpYWwgPSBzZXJ2ZXIuY3JlZGVudGlhbDtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICBuZXdJY2VTZXJ2ZXJzLnB1c2gobmV3U2VydmVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmV3SWNlU2VydmVycy5wdXNoKHBjQ29uZmlnLmljZVNlcnZlcnNbaV0pO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwY0NvbmZpZy5pY2VTZXJ2ZXJzID0gbmV3SWNlU2VydmVycztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyB3aW5kb3cubW96UlRDUGVlckNvbm5lY3Rpb24ocGNDb25maWcsIHBjQ29uc3RyYWludHMpO1xyXG4gICAgICB9O1xyXG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlID1cclxuICAgICAgICAgIHdpbmRvdy5tb3pSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGU7XHJcblxyXG4gICAgICAvLyB3cmFwIHN0YXRpYyBtZXRob2RzLiBDdXJyZW50bHkganVzdCBnZW5lcmF0ZUNlcnRpZmljYXRlLlxyXG4gICAgICBpZiAod2luZG93Lm1velJUQ1BlZXJDb25uZWN0aW9uLmdlbmVyYXRlQ2VydGlmaWNhdGUpIHtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLCAnZ2VuZXJhdGVDZXJ0aWZpY2F0ZScsIHtcclxuICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cubW96UlRDUGVlckNvbm5lY3Rpb24uZ2VuZXJhdGVDZXJ0aWZpY2F0ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgd2luZG93LlJUQ1Nlc3Npb25EZXNjcmlwdGlvbiA9IHdpbmRvdy5tb3pSVENTZXNzaW9uRGVzY3JpcHRpb247XHJcbiAgICAgIHdpbmRvdy5SVENJY2VDYW5kaWRhdGUgPSB3aW5kb3cubW96UlRDSWNlQ2FuZGlkYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHNoaW0gYXdheSBuZWVkIGZvciBvYnNvbGV0ZSBSVENJY2VDYW5kaWRhdGUvUlRDU2Vzc2lvbkRlc2NyaXB0aW9uLlxyXG4gICAgWydzZXRMb2NhbERlc2NyaXB0aW9uJywgJ3NldFJlbW90ZURlc2NyaXB0aW9uJywgJ2FkZEljZUNhbmRpZGF0ZSddXHJcbiAgICAgICAgLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XHJcbiAgICAgICAgICB2YXIgbmF0aXZlTWV0aG9kID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdO1xyXG4gICAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGFyZ3VtZW50c1swXSA9IG5ldyAoKG1ldGhvZCA9PT0gJ2FkZEljZUNhbmRpZGF0ZScpID9cclxuICAgICAgICAgICAgICAgIHdpbmRvdy5SVENJY2VDYW5kaWRhdGUgOlxyXG4gICAgICAgICAgICAgICAgd2luZG93LlJUQ1Nlc3Npb25EZXNjcmlwdGlvbikoYXJndW1lbnRzWzBdKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyBzdXBwb3J0IGZvciBhZGRJY2VDYW5kaWRhdGUobnVsbCBvciB1bmRlZmluZWQpXHJcbiAgICB2YXIgbmF0aXZlQWRkSWNlQ2FuZGlkYXRlID1cclxuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZEljZUNhbmRpZGF0ZTtcclxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkSWNlQ2FuZGlkYXRlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmICghYXJndW1lbnRzWzBdKSB7XHJcbiAgICAgICAgaWYgKGFyZ3VtZW50c1sxXSkge1xyXG4gICAgICAgICAgYXJndW1lbnRzWzFdLmFwcGx5KG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG5hdGl2ZUFkZEljZUNhbmRpZGF0ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBzaGltIGdldFN0YXRzIHdpdGggbWFwbGlrZSBzdXBwb3J0XHJcbiAgICB2YXIgbWFrZU1hcFN0YXRzID0gZnVuY3Rpb24oc3RhdHMpIHtcclxuICAgICAgdmFyIG1hcCA9IG5ldyBNYXAoKTtcclxuICAgICAgT2JqZWN0LmtleXMoc3RhdHMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgbWFwLnNldChrZXksIHN0YXRzW2tleV0pO1xyXG4gICAgICAgIG1hcFtrZXldID0gc3RhdHNba2V5XTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBtYXA7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBtb2Rlcm5TdGF0c1R5cGVzID0ge1xyXG4gICAgICBpbmJvdW5kcnRwOiAnaW5ib3VuZC1ydHAnLFxyXG4gICAgICBvdXRib3VuZHJ0cDogJ291dGJvdW5kLXJ0cCcsXHJcbiAgICAgIGNhbmRpZGF0ZXBhaXI6ICdjYW5kaWRhdGUtcGFpcicsXHJcbiAgICAgIGxvY2FsY2FuZGlkYXRlOiAnbG9jYWwtY2FuZGlkYXRlJyxcclxuICAgICAgcmVtb3RlY2FuZGlkYXRlOiAncmVtb3RlLWNhbmRpZGF0ZSdcclxuICAgIH07XHJcblxyXG4gICAgdmFyIG5hdGl2ZUdldFN0YXRzID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTdGF0cztcclxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U3RhdHMgPSBmdW5jdGlvbihcclxuICAgICAgc2VsZWN0b3IsXHJcbiAgICAgIG9uU3VjYyxcclxuICAgICAgb25FcnJcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gbmF0aXZlR2V0U3RhdHMuYXBwbHkodGhpcywgW3NlbGVjdG9yIHx8IG51bGxdKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKHN0YXRzKSB7XHJcbiAgICAgICAgICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDQ4KSB7XHJcbiAgICAgICAgICAgIHN0YXRzID0gbWFrZU1hcFN0YXRzKHN0YXRzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgNTMgJiYgIW9uU3VjYykge1xyXG4gICAgICAgICAgICAvLyBTaGltIG9ubHkgcHJvbWlzZSBnZXRTdGF0cyB3aXRoIHNwZWMtaHlwaGVucyBpbiB0eXBlIG5hbWVzXHJcbiAgICAgICAgICAgIC8vIExlYXZlIGNhbGxiYWNrIHZlcnNpb24gYWxvbmU7IG1pc2Mgb2xkIHVzZXMgb2YgZm9yRWFjaCBiZWZvcmUgTWFwXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgc3RhdHMuZm9yRWFjaChmdW5jdGlvbihzdGF0KSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0LnR5cGUgPSBtb2Rlcm5TdGF0c1R5cGVzW3N0YXQudHlwZV0gfHwgc3RhdC50eXBlO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgaWYgKGUubmFtZSAhPT0gJ1R5cGVFcnJvcicpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIC8vIEF2b2lkIFR5cGVFcnJvcjogXCJ0eXBlXCIgaXMgcmVhZC1vbmx5LCBpbiBvbGQgdmVyc2lvbnMuIDM0LTQzaXNoXHJcbiAgICAgICAgICAgICAgc3RhdHMuZm9yRWFjaChmdW5jdGlvbihzdGF0LCBpKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0cy5zZXQoaSwgT2JqZWN0LmFzc2lnbih7fSwgc3RhdCwge1xyXG4gICAgICAgICAgICAgICAgICB0eXBlOiBtb2Rlcm5TdGF0c1R5cGVzW3N0YXQudHlwZV0gfHwgc3RhdC50eXBlXHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBzdGF0cztcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKG9uU3VjYywgb25FcnIpO1xyXG4gICAgfTtcclxuICB9LFxyXG5cclxuICBzaGltUmVtb3ZlU3RyZWFtOiBmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIGlmICghd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uIHx8XHJcbiAgICAgICAgJ3JlbW92ZVN0cmVhbScgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xyXG4gICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICB1dGlscy5kZXByZWNhdGVkKCdyZW1vdmVTdHJlYW0nLCAncmVtb3ZlVHJhY2snKTtcclxuICAgICAgdGhpcy5nZXRTZW5kZXJzKCkuZm9yRWFjaChmdW5jdGlvbihzZW5kZXIpIHtcclxuICAgICAgICBpZiAoc2VuZGVyLnRyYWNrICYmIHN0cmVhbS5nZXRUcmFja3MoKS5pbmRleE9mKHNlbmRlci50cmFjaykgIT09IC0xKSB7XHJcbiAgICAgICAgICBwYy5yZW1vdmVUcmFjayhzZW5kZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG4gIH1cclxufTtcclxuXHJcbn0se1wiLi4vdXRpbHNcIjoxMyxcIi4vZ2V0dXNlcm1lZGlhXCI6MTF9XSwxMTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcbi8qXHJcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXHJcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcclxuICogIHRyZWUuXHJcbiAqL1xyXG4gLyogZXNsaW50LWVudiBub2RlICovXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XHJcbnZhciBsb2dnaW5nID0gdXRpbHMubG9nO1xyXG5cclxuLy8gRXhwb3NlIHB1YmxpYyBtZXRob2RzLlxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gIHZhciBicm93c2VyRGV0YWlscyA9IHV0aWxzLmRldGVjdEJyb3dzZXIod2luZG93KTtcclxuICB2YXIgbmF2aWdhdG9yID0gd2luZG93ICYmIHdpbmRvdy5uYXZpZ2F0b3I7XHJcbiAgdmFyIE1lZGlhU3RyZWFtVHJhY2sgPSB3aW5kb3cgJiYgd2luZG93Lk1lZGlhU3RyZWFtVHJhY2s7XHJcblxyXG4gIHZhciBzaGltRXJyb3JfID0gZnVuY3Rpb24oZSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmFtZToge1xyXG4gICAgICAgIEludGVybmFsRXJyb3I6ICdOb3RSZWFkYWJsZUVycm9yJyxcclxuICAgICAgICBOb3RTdXBwb3J0ZWRFcnJvcjogJ1R5cGVFcnJvcicsXHJcbiAgICAgICAgUGVybWlzc2lvbkRlbmllZEVycm9yOiAnTm90QWxsb3dlZEVycm9yJyxcclxuICAgICAgICBTZWN1cml0eUVycm9yOiAnTm90QWxsb3dlZEVycm9yJ1xyXG4gICAgICB9W2UubmFtZV0gfHwgZS5uYW1lLFxyXG4gICAgICBtZXNzYWdlOiB7XHJcbiAgICAgICAgJ1RoZSBvcGVyYXRpb24gaXMgaW5zZWN1cmUuJzogJ1RoZSByZXF1ZXN0IGlzIG5vdCBhbGxvd2VkIGJ5IHRoZSAnICtcclxuICAgICAgICAndXNlciBhZ2VudCBvciB0aGUgcGxhdGZvcm0gaW4gdGhlIGN1cnJlbnQgY29udGV4dC4nXHJcbiAgICAgIH1bZS5tZXNzYWdlXSB8fCBlLm1lc3NhZ2UsXHJcbiAgICAgIGNvbnN0cmFpbnQ6IGUuY29uc3RyYWludCxcclxuICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5hbWUgKyAodGhpcy5tZXNzYWdlICYmICc6ICcpICsgdGhpcy5tZXNzYWdlO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH07XHJcblxyXG4gIC8vIGdldFVzZXJNZWRpYSBjb25zdHJhaW50cyBzaGltLlxyXG4gIHZhciBnZXRVc2VyTWVkaWFfID0gZnVuY3Rpb24oY29uc3RyYWludHMsIG9uU3VjY2Vzcywgb25FcnJvcikge1xyXG4gICAgdmFyIGNvbnN0cmFpbnRzVG9GRjM3XyA9IGZ1bmN0aW9uKGMpIHtcclxuICAgICAgaWYgKHR5cGVvZiBjICE9PSAnb2JqZWN0JyB8fCBjLnJlcXVpcmUpIHtcclxuICAgICAgICByZXR1cm4gYztcclxuICAgICAgfVxyXG4gICAgICB2YXIgcmVxdWlyZSA9IFtdO1xyXG4gICAgICBPYmplY3Qua2V5cyhjKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgIGlmIChrZXkgPT09ICdyZXF1aXJlJyB8fCBrZXkgPT09ICdhZHZhbmNlZCcgfHwga2V5ID09PSAnbWVkaWFTb3VyY2UnKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByID0gY1trZXldID0gKHR5cGVvZiBjW2tleV0gPT09ICdvYmplY3QnKSA/XHJcbiAgICAgICAgICAgIGNba2V5XSA6IHtpZGVhbDogY1trZXldfTtcclxuICAgICAgICBpZiAoci5taW4gIT09IHVuZGVmaW5lZCB8fFxyXG4gICAgICAgICAgICByLm1heCAhPT0gdW5kZWZpbmVkIHx8IHIuZXhhY3QgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgcmVxdWlyZS5wdXNoKGtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyLmV4YWN0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIGlmICh0eXBlb2Ygci5leGFjdCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgci4gbWluID0gci5tYXggPSByLmV4YWN0O1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY1trZXldID0gci5leGFjdDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGRlbGV0ZSByLmV4YWN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoci5pZGVhbCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBjLmFkdmFuY2VkID0gYy5hZHZhbmNlZCB8fCBbXTtcclxuICAgICAgICAgIHZhciBvYyA9IHt9O1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiByLmlkZWFsID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICBvY1trZXldID0ge21pbjogci5pZGVhbCwgbWF4OiByLmlkZWFsfTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG9jW2tleV0gPSByLmlkZWFsO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYy5hZHZhbmNlZC5wdXNoKG9jKTtcclxuICAgICAgICAgIGRlbGV0ZSByLmlkZWFsO1xyXG4gICAgICAgICAgaWYgKCFPYmplY3Qua2V5cyhyKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgZGVsZXRlIGNba2V5XTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAocmVxdWlyZS5sZW5ndGgpIHtcclxuICAgICAgICBjLnJlcXVpcmUgPSByZXF1aXJlO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBjO1xyXG4gICAgfTtcclxuICAgIGNvbnN0cmFpbnRzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShjb25zdHJhaW50cykpO1xyXG4gICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCAzOCkge1xyXG4gICAgICBsb2dnaW5nKCdzcGVjOiAnICsgSlNPTi5zdHJpbmdpZnkoY29uc3RyYWludHMpKTtcclxuICAgICAgaWYgKGNvbnN0cmFpbnRzLmF1ZGlvKSB7XHJcbiAgICAgICAgY29uc3RyYWludHMuYXVkaW8gPSBjb25zdHJhaW50c1RvRkYzN18oY29uc3RyYWludHMuYXVkaW8pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjb25zdHJhaW50cy52aWRlbykge1xyXG4gICAgICAgIGNvbnN0cmFpbnRzLnZpZGVvID0gY29uc3RyYWludHNUb0ZGMzdfKGNvbnN0cmFpbnRzLnZpZGVvKTtcclxuICAgICAgfVxyXG4gICAgICBsb2dnaW5nKCdmZjM3OiAnICsgSlNPTi5zdHJpbmdpZnkoY29uc3RyYWludHMpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBuYXZpZ2F0b3IubW96R2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzLCBvblN1Y2Nlc3MsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgb25FcnJvcihzaGltRXJyb3JfKGUpKTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIC8vIFJldHVybnMgdGhlIHJlc3VsdCBvZiBnZXRVc2VyTWVkaWEgYXMgYSBQcm9taXNlLlxyXG4gIHZhciBnZXRVc2VyTWVkaWFQcm9taXNlXyA9IGZ1bmN0aW9uKGNvbnN0cmFpbnRzKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgIGdldFVzZXJNZWRpYV8oY29uc3RyYWludHMsIHJlc29sdmUsIHJlamVjdCk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICAvLyBTaGltIGZvciBtZWRpYURldmljZXMgb24gb2xkZXIgdmVyc2lvbnMuXHJcbiAgaWYgKCFuYXZpZ2F0b3IubWVkaWFEZXZpY2VzKSB7XHJcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzID0ge2dldFVzZXJNZWRpYTogZ2V0VXNlck1lZGlhUHJvbWlzZV8sXHJcbiAgICAgIGFkZEV2ZW50TGlzdGVuZXI6IGZ1bmN0aW9uKCkgeyB9LFxyXG4gICAgICByZW1vdmVFdmVudExpc3RlbmVyOiBmdW5jdGlvbigpIHsgfVxyXG4gICAgfTtcclxuICB9XHJcbiAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzID1cclxuICAgICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzIHx8IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XHJcbiAgICAgICAgICB2YXIgaW5mb3MgPSBbXHJcbiAgICAgICAgICAgIHtraW5kOiAnYXVkaW9pbnB1dCcsIGRldmljZUlkOiAnZGVmYXVsdCcsIGxhYmVsOiAnJywgZ3JvdXBJZDogJyd9LFxyXG4gICAgICAgICAgICB7a2luZDogJ3ZpZGVvaW5wdXQnLCBkZXZpY2VJZDogJ2RlZmF1bHQnLCBsYWJlbDogJycsIGdyb3VwSWQ6ICcnfVxyXG4gICAgICAgICAgXTtcclxuICAgICAgICAgIHJlc29sdmUoaW5mb3MpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9O1xyXG5cclxuICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDQxKSB7XHJcbiAgICAvLyBXb3JrIGFyb3VuZCBodHRwOi8vYnVnemlsLmxhLzExNjk2NjVcclxuICAgIHZhciBvcmdFbnVtZXJhdGVEZXZpY2VzID1cclxuICAgICAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmVudW1lcmF0ZURldmljZXMuYmluZChuYXZpZ2F0b3IubWVkaWFEZXZpY2VzKTtcclxuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gb3JnRW51bWVyYXRlRGV2aWNlcygpLnRoZW4odW5kZWZpbmVkLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWYgKGUubmFtZSA9PT0gJ05vdEZvdW5kRXJyb3InKSB7XHJcbiAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRocm93IGU7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuICB9XHJcbiAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCA0OSkge1xyXG4gICAgdmFyIG9yaWdHZXRVc2VyTWVkaWEgPSBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYS5cclxuICAgICAgICBiaW5kKG5hdmlnYXRvci5tZWRpYURldmljZXMpO1xyXG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEgPSBmdW5jdGlvbihjKSB7XHJcbiAgICAgIHJldHVybiBvcmlnR2V0VXNlck1lZGlhKGMpLnRoZW4oZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICAgICAgLy8gV29yayBhcm91bmQgaHR0cHM6Ly9idWd6aWwubGEvODAyMzI2XHJcbiAgICAgICAgaWYgKGMuYXVkaW8gJiYgIXN0cmVhbS5nZXRBdWRpb1RyYWNrcygpLmxlbmd0aCB8fFxyXG4gICAgICAgICAgICBjLnZpZGVvICYmICFzdHJlYW0uZ2V0VmlkZW9UcmFja3MoKS5sZW5ndGgpIHtcclxuICAgICAgICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XHJcbiAgICAgICAgICAgIHRyYWNrLnN0b3AoKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbignVGhlIG9iamVjdCBjYW4gbm90IGJlIGZvdW5kIGhlcmUuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ05vdEZvdW5kRXJyb3InKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0cmVhbTtcclxuICAgICAgfSwgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChzaGltRXJyb3JfKGUpKTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG4gIH1cclxuICBpZiAoIShicm93c2VyRGV0YWlscy52ZXJzaW9uID4gNTUgJiZcclxuICAgICAgJ2F1dG9HYWluQ29udHJvbCcgaW4gbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRTdXBwb3J0ZWRDb25zdHJhaW50cygpKSkge1xyXG4gICAgdmFyIHJlbWFwID0gZnVuY3Rpb24ob2JqLCBhLCBiKSB7XHJcbiAgICAgIGlmIChhIGluIG9iaiAmJiAhKGIgaW4gb2JqKSkge1xyXG4gICAgICAgIG9ialtiXSA9IG9ialthXTtcclxuICAgICAgICBkZWxldGUgb2JqW2FdO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBuYXRpdmVHZXRVc2VyTWVkaWEgPSBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYS5cclxuICAgICAgICBiaW5kKG5hdmlnYXRvci5tZWRpYURldmljZXMpO1xyXG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEgPSBmdW5jdGlvbihjKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgYyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIGMuYXVkaW8gPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgYyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYykpO1xyXG4gICAgICAgIHJlbWFwKGMuYXVkaW8sICdhdXRvR2FpbkNvbnRyb2wnLCAnbW96QXV0b0dhaW5Db250cm9sJyk7XHJcbiAgICAgICAgcmVtYXAoYy5hdWRpbywgJ25vaXNlU3VwcHJlc3Npb24nLCAnbW96Tm9pc2VTdXBwcmVzc2lvbicpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBuYXRpdmVHZXRVc2VyTWVkaWEoYyk7XHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChNZWRpYVN0cmVhbVRyYWNrICYmIE1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLmdldFNldHRpbmdzKSB7XHJcbiAgICAgIHZhciBuYXRpdmVHZXRTZXR0aW5ncyA9IE1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLmdldFNldHRpbmdzO1xyXG4gICAgICBNZWRpYVN0cmVhbVRyYWNrLnByb3RvdHlwZS5nZXRTZXR0aW5ncyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBvYmogPSBuYXRpdmVHZXRTZXR0aW5ncy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgIHJlbWFwKG9iaiwgJ21vekF1dG9HYWluQ29udHJvbCcsICdhdXRvR2FpbkNvbnRyb2wnKTtcclxuICAgICAgICByZW1hcChvYmosICdtb3pOb2lzZVN1cHByZXNzaW9uJywgJ25vaXNlU3VwcHJlc3Npb24nKTtcclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChNZWRpYVN0cmVhbVRyYWNrICYmIE1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLmFwcGx5Q29uc3RyYWludHMpIHtcclxuICAgICAgdmFyIG5hdGl2ZUFwcGx5Q29uc3RyYWludHMgPSBNZWRpYVN0cmVhbVRyYWNrLnByb3RvdHlwZS5hcHBseUNvbnN0cmFpbnRzO1xyXG4gICAgICBNZWRpYVN0cmVhbVRyYWNrLnByb3RvdHlwZS5hcHBseUNvbnN0cmFpbnRzID0gZnVuY3Rpb24oYykge1xyXG4gICAgICAgIGlmICh0aGlzLmtpbmQgPT09ICdhdWRpbycgJiYgdHlwZW9mIGMgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICBjID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShjKSk7XHJcbiAgICAgICAgICByZW1hcChjLCAnYXV0b0dhaW5Db250cm9sJywgJ21vekF1dG9HYWluQ29udHJvbCcpO1xyXG4gICAgICAgICAgcmVtYXAoYywgJ25vaXNlU3VwcHJlc3Npb24nLCAnbW96Tm9pc2VTdXBwcmVzc2lvbicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmF0aXZlQXBwbHlDb25zdHJhaW50cy5hcHBseSh0aGlzLCBbY10pO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH1cclxuICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhID0gZnVuY3Rpb24oY29uc3RyYWludHMsIG9uU3VjY2Vzcywgb25FcnJvcikge1xyXG4gICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCA0NCkge1xyXG4gICAgICByZXR1cm4gZ2V0VXNlck1lZGlhXyhjb25zdHJhaW50cywgb25TdWNjZXNzLCBvbkVycm9yKTtcclxuICAgIH1cclxuICAgIC8vIFJlcGxhY2UgRmlyZWZveCA0NCsncyBkZXByZWNhdGlvbiB3YXJuaW5nIHdpdGggdW5wcmVmaXhlZCB2ZXJzaW9uLlxyXG4gICAgdXRpbHMuZGVwcmVjYXRlZCgnbmF2aWdhdG9yLmdldFVzZXJNZWRpYScsXHJcbiAgICAgICAgJ25hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhJyk7XHJcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYShjb25zdHJhaW50cykudGhlbihvblN1Y2Nlc3MsIG9uRXJyb3IpO1xyXG4gIH07XHJcbn07XHJcblxyXG59LHtcIi4uL3V0aWxzXCI6MTN9XSwxMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcbi8qXHJcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXHJcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcclxuICogIHRyZWUuXHJcbiAqL1xyXG4ndXNlIHN0cmljdCc7XHJcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBzaGltTG9jYWxTdHJlYW1zQVBJOiBmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAnb2JqZWN0JyB8fCAhd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICghKCdnZXRMb2NhbFN0cmVhbXMnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XHJcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0TG9jYWxTdHJlYW1zID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9sb2NhbFN0cmVhbXMpIHtcclxuICAgICAgICAgIHRoaXMuX2xvY2FsU3RyZWFtcyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxTdHJlYW1zO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgaWYgKCEoJ2dldFN0cmVhbUJ5SWQnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XHJcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U3RyZWFtQnlJZCA9IGZ1bmN0aW9uKGlkKSB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IG51bGw7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xvY2FsU3RyZWFtcykge1xyXG4gICAgICAgICAgdGhpcy5fbG9jYWxTdHJlYW1zLmZvckVhY2goZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICAgICAgICAgIGlmIChzdHJlYW0uaWQgPT09IGlkKSB7XHJcbiAgICAgICAgICAgICAgcmVzdWx0ID0gc3RyZWFtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX3JlbW90ZVN0cmVhbXMpIHtcclxuICAgICAgICAgIHRoaXMuX3JlbW90ZVN0cmVhbXMuZm9yRWFjaChmdW5jdGlvbihzdHJlYW0pIHtcclxuICAgICAgICAgICAgaWYgKHN0cmVhbS5pZCA9PT0gaWQpIHtcclxuICAgICAgICAgICAgICByZXN1bHQgPSBzdHJlYW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgaWYgKCEoJ2FkZFN0cmVhbScgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkpIHtcclxuICAgICAgdmFyIF9hZGRUcmFjayA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2s7XHJcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9sb2NhbFN0cmVhbXMpIHtcclxuICAgICAgICAgIHRoaXMuX2xvY2FsU3RyZWFtcyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fbG9jYWxTdHJlYW1zLmluZGV4T2Yoc3RyZWFtKSA9PT0gLTEpIHtcclxuICAgICAgICAgIHRoaXMuX2xvY2FsU3RyZWFtcy5wdXNoKHN0cmVhbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcclxuICAgICAgICAgIF9hZGRUcmFjay5jYWxsKHBjLCB0cmFjaywgc3RyZWFtKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2sgPSBmdW5jdGlvbih0cmFjaywgc3RyZWFtKSB7XHJcbiAgICAgICAgaWYgKHN0cmVhbSkge1xyXG4gICAgICAgICAgaWYgKCF0aGlzLl9sb2NhbFN0cmVhbXMpIHtcclxuICAgICAgICAgICAgdGhpcy5fbG9jYWxTdHJlYW1zID0gW3N0cmVhbV07XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2xvY2FsU3RyZWFtcy5pbmRleE9mKHN0cmVhbSkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvY2FsU3RyZWFtcy5wdXNoKHN0cmVhbSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBfYWRkVHJhY2suY2FsbCh0aGlzLCB0cmFjaywgc3RyZWFtKTtcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIGlmICghKCdyZW1vdmVTdHJlYW0nIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XHJcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9sb2NhbFN0cmVhbXMpIHtcclxuICAgICAgICAgIHRoaXMuX2xvY2FsU3RyZWFtcyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLl9sb2NhbFN0cmVhbXMuaW5kZXhPZihzdHJlYW0pO1xyXG4gICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbG9jYWxTdHJlYW1zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgICB2YXIgdHJhY2tzID0gc3RyZWFtLmdldFRyYWNrcygpO1xyXG4gICAgICAgIHRoaXMuZ2V0U2VuZGVycygpLmZvckVhY2goZnVuY3Rpb24oc2VuZGVyKSB7XHJcbiAgICAgICAgICBpZiAodHJhY2tzLmluZGV4T2Yoc2VuZGVyLnRyYWNrKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgcGMucmVtb3ZlVHJhY2soc2VuZGVyKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfTtcclxuICAgIH1cclxuICB9LFxyXG4gIHNoaW1SZW1vdGVTdHJlYW1zQVBJOiBmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAnb2JqZWN0JyB8fCAhd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICghKCdnZXRSZW1vdGVTdHJlYW1zJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xyXG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFJlbW90ZVN0cmVhbXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVtb3RlU3RyZWFtcyA/IHRoaXMuX3JlbW90ZVN0cmVhbXMgOiBbXTtcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIGlmICghKCdvbmFkZHN0cmVhbScgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkpIHtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUsICdvbmFkZHN0cmVhbScsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuX29uYWRkc3RyZWFtO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbihmKSB7XHJcbiAgICAgICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICAgICAgaWYgKHRoaXMuX29uYWRkc3RyZWFtKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWRkc3RyZWFtJywgdGhpcy5fb25hZGRzdHJlYW0pO1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYWNrJywgdGhpcy5fb25hZGRzdHJlYW1wb2x5KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignYWRkc3RyZWFtJywgdGhpcy5fb25hZGRzdHJlYW0gPSBmKTtcclxuICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigndHJhY2snLCB0aGlzLl9vbmFkZHN0cmVhbXBvbHkgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUuc3RyZWFtcy5mb3JFYWNoKGZ1bmN0aW9uKHN0cmVhbSkge1xyXG4gICAgICAgICAgICAgIGlmICghcGMuX3JlbW90ZVN0cmVhbXMpIHtcclxuICAgICAgICAgICAgICAgIHBjLl9yZW1vdGVTdHJlYW1zID0gW107XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGlmIChwYy5fcmVtb3RlU3RyZWFtcy5pbmRleE9mKHN0cmVhbSkgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBwYy5fcmVtb3RlU3RyZWFtcy5wdXNoKHN0cmVhbSk7XHJcbiAgICAgICAgICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdhZGRzdHJlYW0nKTtcclxuICAgICAgICAgICAgICBldmVudC5zdHJlYW0gPSBzdHJlYW07XHJcbiAgICAgICAgICAgICAgcGMuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIHNoaW1DYWxsYmFja3NBUEk6IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICdvYmplY3QnIHx8ICF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdmFyIHByb3RvdHlwZSA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGU7XHJcbiAgICB2YXIgY3JlYXRlT2ZmZXIgPSBwcm90b3R5cGUuY3JlYXRlT2ZmZXI7XHJcbiAgICB2YXIgY3JlYXRlQW5zd2VyID0gcHJvdG90eXBlLmNyZWF0ZUFuc3dlcjtcclxuICAgIHZhciBzZXRMb2NhbERlc2NyaXB0aW9uID0gcHJvdG90eXBlLnNldExvY2FsRGVzY3JpcHRpb247XHJcbiAgICB2YXIgc2V0UmVtb3RlRGVzY3JpcHRpb24gPSBwcm90b3R5cGUuc2V0UmVtb3RlRGVzY3JpcHRpb247XHJcbiAgICB2YXIgYWRkSWNlQ2FuZGlkYXRlID0gcHJvdG90eXBlLmFkZEljZUNhbmRpZGF0ZTtcclxuXHJcbiAgICBwcm90b3R5cGUuY3JlYXRlT2ZmZXIgPSBmdW5jdGlvbihzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjaykge1xyXG4gICAgICB2YXIgb3B0aW9ucyA9IChhcmd1bWVudHMubGVuZ3RoID49IDIpID8gYXJndW1lbnRzWzJdIDogYXJndW1lbnRzWzBdO1xyXG4gICAgICB2YXIgcHJvbWlzZSA9IGNyZWF0ZU9mZmVyLmFwcGx5KHRoaXMsIFtvcHRpb25zXSk7XHJcbiAgICAgIGlmICghZmFpbHVyZUNhbGxiYWNrKSB7XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICAgIH1cclxuICAgICAgcHJvbWlzZS50aGVuKHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKTtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcm90b3R5cGUuY3JlYXRlQW5zd2VyID0gZnVuY3Rpb24oc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spIHtcclxuICAgICAgdmFyIG9wdGlvbnMgPSAoYXJndW1lbnRzLmxlbmd0aCA+PSAyKSA/IGFyZ3VtZW50c1syXSA6IGFyZ3VtZW50c1swXTtcclxuICAgICAgdmFyIHByb21pc2UgPSBjcmVhdGVBbnN3ZXIuYXBwbHkodGhpcywgW29wdGlvbnNdKTtcclxuICAgICAgaWYgKCFmYWlsdXJlQ2FsbGJhY2spIHtcclxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgICAgfVxyXG4gICAgICBwcm9taXNlLnRoZW4oc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spO1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciB3aXRoQ2FsbGJhY2sgPSBmdW5jdGlvbihkZXNjcmlwdGlvbiwgc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spIHtcclxuICAgICAgdmFyIHByb21pc2UgPSBzZXRMb2NhbERlc2NyaXB0aW9uLmFwcGx5KHRoaXMsIFtkZXNjcmlwdGlvbl0pO1xyXG4gICAgICBpZiAoIWZhaWx1cmVDYWxsYmFjaykge1xyXG4gICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgICB9XHJcbiAgICAgIHByb21pc2UudGhlbihzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjayk7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgIH07XHJcbiAgICBwcm90b3R5cGUuc2V0TG9jYWxEZXNjcmlwdGlvbiA9IHdpdGhDYWxsYmFjaztcclxuXHJcbiAgICB3aXRoQ2FsbGJhY2sgPSBmdW5jdGlvbihkZXNjcmlwdGlvbiwgc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spIHtcclxuICAgICAgdmFyIHByb21pc2UgPSBzZXRSZW1vdGVEZXNjcmlwdGlvbi5hcHBseSh0aGlzLCBbZGVzY3JpcHRpb25dKTtcclxuICAgICAgaWYgKCFmYWlsdXJlQ2FsbGJhY2spIHtcclxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgICAgfVxyXG4gICAgICBwcm9taXNlLnRoZW4oc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spO1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICB9O1xyXG4gICAgcHJvdG90eXBlLnNldFJlbW90ZURlc2NyaXB0aW9uID0gd2l0aENhbGxiYWNrO1xyXG5cclxuICAgIHdpdGhDYWxsYmFjayA9IGZ1bmN0aW9uKGNhbmRpZGF0ZSwgc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spIHtcclxuICAgICAgdmFyIHByb21pc2UgPSBhZGRJY2VDYW5kaWRhdGUuYXBwbHkodGhpcywgW2NhbmRpZGF0ZV0pO1xyXG4gICAgICBpZiAoIWZhaWx1cmVDYWxsYmFjaykge1xyXG4gICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgICB9XHJcbiAgICAgIHByb21pc2UudGhlbihzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjayk7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgIH07XHJcbiAgICBwcm90b3R5cGUuYWRkSWNlQ2FuZGlkYXRlID0gd2l0aENhbGxiYWNrO1xyXG4gIH0sXHJcbiAgc2hpbUdldFVzZXJNZWRpYTogZnVuY3Rpb24od2luZG93KSB7XHJcbiAgICB2YXIgbmF2aWdhdG9yID0gd2luZG93ICYmIHdpbmRvdy5uYXZpZ2F0b3I7XHJcblxyXG4gICAgaWYgKCFuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhKSB7XHJcbiAgICAgIGlmIChuYXZpZ2F0b3Iud2Via2l0R2V0VXNlck1lZGlhKSB7XHJcbiAgICAgICAgbmF2aWdhdG9yLmdldFVzZXJNZWRpYSA9IG5hdmlnYXRvci53ZWJraXRHZXRVc2VyTWVkaWEuYmluZChuYXZpZ2F0b3IpO1xyXG4gICAgICB9IGVsc2UgaWYgKG5hdmlnYXRvci5tZWRpYURldmljZXMgJiZcclxuICAgICAgICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKSB7XHJcbiAgICAgICAgbmF2aWdhdG9yLmdldFVzZXJNZWRpYSA9IGZ1bmN0aW9uKGNvbnN0cmFpbnRzLCBjYiwgZXJyY2IpIHtcclxuICAgICAgICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzKVxyXG4gICAgICAgICAgLnRoZW4oY2IsIGVycmNiKTtcclxuICAgICAgICB9LmJpbmQobmF2aWdhdG9yKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2hpbVJUQ0ljZVNlcnZlclVybHM6IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgLy8gbWlncmF0ZSBmcm9tIG5vbi1zcGVjIFJUQ0ljZVNlcnZlci51cmwgdG8gUlRDSWNlU2VydmVyLnVybHNcclxuICAgIHZhciBPcmlnUGVlckNvbm5lY3Rpb24gPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb247XHJcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gPSBmdW5jdGlvbihwY0NvbmZpZywgcGNDb25zdHJhaW50cykge1xyXG4gICAgICBpZiAocGNDb25maWcgJiYgcGNDb25maWcuaWNlU2VydmVycykge1xyXG4gICAgICAgIHZhciBuZXdJY2VTZXJ2ZXJzID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwY0NvbmZpZy5pY2VTZXJ2ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICB2YXIgc2VydmVyID0gcGNDb25maWcuaWNlU2VydmVyc1tpXTtcclxuICAgICAgICAgIGlmICghc2VydmVyLmhhc093blByb3BlcnR5KCd1cmxzJykgJiZcclxuICAgICAgICAgICAgICBzZXJ2ZXIuaGFzT3duUHJvcGVydHkoJ3VybCcpKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLmRlcHJlY2F0ZWQoJ1JUQ0ljZVNlcnZlci51cmwnLCAnUlRDSWNlU2VydmVyLnVybHMnKTtcclxuICAgICAgICAgICAgc2VydmVyID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShzZXJ2ZXIpKTtcclxuICAgICAgICAgICAgc2VydmVyLnVybHMgPSBzZXJ2ZXIudXJsO1xyXG4gICAgICAgICAgICBkZWxldGUgc2VydmVyLnVybDtcclxuICAgICAgICAgICAgbmV3SWNlU2VydmVycy5wdXNoKHNlcnZlcik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBuZXdJY2VTZXJ2ZXJzLnB1c2gocGNDb25maWcuaWNlU2VydmVyc1tpXSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBjQ29uZmlnLmljZVNlcnZlcnMgPSBuZXdJY2VTZXJ2ZXJzO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBuZXcgT3JpZ1BlZXJDb25uZWN0aW9uKHBjQ29uZmlnLCBwY0NvbnN0cmFpbnRzKTtcclxuICAgIH07XHJcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlID0gT3JpZ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZTtcclxuICAgIC8vIHdyYXAgc3RhdGljIG1ldGhvZHMuIEN1cnJlbnRseSBqdXN0IGdlbmVyYXRlQ2VydGlmaWNhdGUuXHJcbiAgICBpZiAoJ2dlbmVyYXRlQ2VydGlmaWNhdGUnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbikge1xyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLCAnZ2VuZXJhdGVDZXJ0aWZpY2F0ZScsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmV0dXJuIE9yaWdQZWVyQ29ubmVjdGlvbi5nZW5lcmF0ZUNlcnRpZmljYXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBzaGltVHJhY2tFdmVudFRyYW5zY2VpdmVyOiBmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIC8vIEFkZCBldmVudC50cmFuc2NlaXZlciBtZW1iZXIgb3ZlciBkZXByZWNhdGVkIGV2ZW50LnJlY2VpdmVyXHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uICYmXHJcbiAgICAgICAgKCdyZWNlaXZlcicgaW4gd2luZG93LlJUQ1RyYWNrRXZlbnQucHJvdG90eXBlKSAmJlxyXG4gICAgICAgIC8vIGNhbid0IGNoZWNrICd0cmFuc2NlaXZlcicgaW4gd2luZG93LlJUQ1RyYWNrRXZlbnQucHJvdG90eXBlLCBhcyBpdCBpc1xyXG4gICAgICAgIC8vIGRlZmluZWQgZm9yIHNvbWUgcmVhc29uIGV2ZW4gd2hlbiB3aW5kb3cuUlRDVHJhbnNjZWl2ZXIgaXMgbm90LlxyXG4gICAgICAgICF3aW5kb3cuUlRDVHJhbnNjZWl2ZXIpIHtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENUcmFja0V2ZW50LnByb3RvdHlwZSwgJ3RyYW5zY2VpdmVyJywge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZXR1cm4ge3JlY2VpdmVyOiB0aGlzLnJlY2VpdmVyfTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHNoaW1DcmVhdGVPZmZlckxlZ2FjeTogZnVuY3Rpb24od2luZG93KSB7XHJcbiAgICB2YXIgb3JpZ0NyZWF0ZU9mZmVyID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5jcmVhdGVPZmZlcjtcclxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlT2ZmZXIgPSBmdW5jdGlvbihvZmZlck9wdGlvbnMpIHtcclxuICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgaWYgKG9mZmVyT3B0aW9ucykge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW8gIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAvLyBzdXBwb3J0IGJpdCB2YWx1ZXNcclxuICAgICAgICAgIG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZUF1ZGlvID0gISFvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbztcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGF1ZGlvVHJhbnNjZWl2ZXIgPSBwYy5nZXRUcmFuc2NlaXZlcnMoKS5maW5kKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJhbnNjZWl2ZXIuc2VuZGVyLnRyYWNrICYmXHJcbiAgICAgICAgICAgICAgdHJhbnNjZWl2ZXIuc2VuZGVyLnRyYWNrLmtpbmQgPT09ICdhdWRpbyc7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZUF1ZGlvID09PSBmYWxzZSAmJiBhdWRpb1RyYW5zY2VpdmVyKSB7XHJcbiAgICAgICAgICBpZiAoYXVkaW9UcmFuc2NlaXZlci5kaXJlY3Rpb24gPT09ICdzZW5kcmVjdicpIHtcclxuICAgICAgICAgICAgaWYgKGF1ZGlvVHJhbnNjZWl2ZXIuc2V0RGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgYXVkaW9UcmFuc2NlaXZlci5zZXREaXJlY3Rpb24oJ3NlbmRvbmx5Jyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgYXVkaW9UcmFuc2NlaXZlci5kaXJlY3Rpb24gPSAnc2VuZG9ubHknO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGF1ZGlvVHJhbnNjZWl2ZXIuZGlyZWN0aW9uID09PSAncmVjdm9ubHknKSB7XHJcbiAgICAgICAgICAgIGlmIChhdWRpb1RyYW5zY2VpdmVyLnNldERpcmVjdGlvbikge1xyXG4gICAgICAgICAgICAgIGF1ZGlvVHJhbnNjZWl2ZXIuc2V0RGlyZWN0aW9uKCdpbmFjdGl2ZScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGF1ZGlvVHJhbnNjZWl2ZXIuZGlyZWN0aW9uID0gJ2luYWN0aXZlJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW8gPT09IHRydWUgJiZcclxuICAgICAgICAgICAgIWF1ZGlvVHJhbnNjZWl2ZXIpIHtcclxuICAgICAgICAgIHBjLmFkZFRyYW5zY2VpdmVyKCdhdWRpbycpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygb2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW8gIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAvLyBzdXBwb3J0IGJpdCB2YWx1ZXNcclxuICAgICAgICAgIG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvID0gISFvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVWaWRlbztcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHZpZGVvVHJhbnNjZWl2ZXIgPSBwYy5nZXRUcmFuc2NlaXZlcnMoKS5maW5kKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJhbnNjZWl2ZXIuc2VuZGVyLnRyYWNrICYmXHJcbiAgICAgICAgICAgICAgdHJhbnNjZWl2ZXIuc2VuZGVyLnRyYWNrLmtpbmQgPT09ICd2aWRlbyc7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvID09PSBmYWxzZSAmJiB2aWRlb1RyYW5zY2VpdmVyKSB7XHJcbiAgICAgICAgICBpZiAodmlkZW9UcmFuc2NlaXZlci5kaXJlY3Rpb24gPT09ICdzZW5kcmVjdicpIHtcclxuICAgICAgICAgICAgdmlkZW9UcmFuc2NlaXZlci5zZXREaXJlY3Rpb24oJ3NlbmRvbmx5Jyk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHZpZGVvVHJhbnNjZWl2ZXIuZGlyZWN0aW9uID09PSAncmVjdm9ubHknKSB7XHJcbiAgICAgICAgICAgIHZpZGVvVHJhbnNjZWl2ZXIuc2V0RGlyZWN0aW9uKCdpbmFjdGl2ZScpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlVmlkZW8gPT09IHRydWUgJiZcclxuICAgICAgICAgICAgIXZpZGVvVHJhbnNjZWl2ZXIpIHtcclxuICAgICAgICAgIHBjLmFkZFRyYW5zY2VpdmVyKCd2aWRlbycpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gb3JpZ0NyZWF0ZU9mZmVyLmFwcGx5KHBjLCBhcmd1bWVudHMpO1xyXG4gICAgfTtcclxuICB9XHJcbn07XHJcblxyXG59LHtcIi4uL3V0aWxzXCI6MTN9XSwxMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcbi8qXHJcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXHJcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcclxuICogIHRyZWUuXHJcbiAqL1xyXG4gLyogZXNsaW50LWVudiBub2RlICovXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBsb2dEaXNhYmxlZF8gPSB0cnVlO1xyXG52YXIgZGVwcmVjYXRpb25XYXJuaW5nc18gPSB0cnVlO1xyXG5cclxuLyoqXHJcbiAqIEV4dHJhY3QgYnJvd3NlciB2ZXJzaW9uIG91dCBvZiB0aGUgcHJvdmlkZWQgdXNlciBhZ2VudCBzdHJpbmcuXHJcbiAqXHJcbiAqIEBwYXJhbSB7IXN0cmluZ30gdWFzdHJpbmcgdXNlckFnZW50IHN0cmluZy5cclxuICogQHBhcmFtIHshc3RyaW5nfSBleHByIFJlZ3VsYXIgZXhwcmVzc2lvbiB1c2VkIGFzIG1hdGNoIGNyaXRlcmlhLlxyXG4gKiBAcGFyYW0geyFudW1iZXJ9IHBvcyBwb3NpdGlvbiBpbiB0aGUgdmVyc2lvbiBzdHJpbmcgdG8gYmUgcmV0dXJuZWQuXHJcbiAqIEByZXR1cm4geyFudW1iZXJ9IGJyb3dzZXIgdmVyc2lvbi5cclxuICovXHJcbmZ1bmN0aW9uIGV4dHJhY3RWZXJzaW9uKHVhc3RyaW5nLCBleHByLCBwb3MpIHtcclxuICB2YXIgbWF0Y2ggPSB1YXN0cmluZy5tYXRjaChleHByKTtcclxuICByZXR1cm4gbWF0Y2ggJiYgbWF0Y2gubGVuZ3RoID49IHBvcyAmJiBwYXJzZUludChtYXRjaFtwb3NdLCAxMCk7XHJcbn1cclxuXHJcbi8vIFdyYXBzIHRoZSBwZWVyY29ubmVjdGlvbiBldmVudCBldmVudE5hbWVUb1dyYXAgaW4gYSBmdW5jdGlvblxyXG4vLyB3aGljaCByZXR1cm5zIHRoZSBtb2RpZmllZCBldmVudCBvYmplY3QuXHJcbmZ1bmN0aW9uIHdyYXBQZWVyQ29ubmVjdGlvbkV2ZW50KHdpbmRvdywgZXZlbnROYW1lVG9XcmFwLCB3cmFwcGVyKSB7XHJcbiAgaWYgKCF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24pIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgdmFyIHByb3RvID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZTtcclxuICB2YXIgbmF0aXZlQWRkRXZlbnRMaXN0ZW5lciA9IHByb3RvLmFkZEV2ZW50TGlzdGVuZXI7XHJcbiAgcHJvdG8uYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKG5hdGl2ZUV2ZW50TmFtZSwgY2IpIHtcclxuICAgIGlmIChuYXRpdmVFdmVudE5hbWUgIT09IGV2ZW50TmFtZVRvV3JhcCkge1xyXG4gICAgICByZXR1cm4gbmF0aXZlQWRkRXZlbnRMaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgfVxyXG4gICAgdmFyIHdyYXBwZWRDYWxsYmFjayA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgY2Iod3JhcHBlcihlKSk7XHJcbiAgICB9O1xyXG4gICAgdGhpcy5fZXZlbnRNYXAgPSB0aGlzLl9ldmVudE1hcCB8fCB7fTtcclxuICAgIHRoaXMuX2V2ZW50TWFwW2NiXSA9IHdyYXBwZWRDYWxsYmFjaztcclxuICAgIHJldHVybiBuYXRpdmVBZGRFdmVudExpc3RlbmVyLmFwcGx5KHRoaXMsIFtuYXRpdmVFdmVudE5hbWUsXHJcbiAgICAgIHdyYXBwZWRDYWxsYmFja10pO1xyXG4gIH07XHJcblxyXG4gIHZhciBuYXRpdmVSZW1vdmVFdmVudExpc3RlbmVyID0gcHJvdG8ucmVtb3ZlRXZlbnRMaXN0ZW5lcjtcclxuICBwcm90by5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24obmF0aXZlRXZlbnROYW1lLCBjYikge1xyXG4gICAgaWYgKG5hdGl2ZUV2ZW50TmFtZSAhPT0gZXZlbnROYW1lVG9XcmFwIHx8ICF0aGlzLl9ldmVudE1hcFxyXG4gICAgICAgIHx8ICF0aGlzLl9ldmVudE1hcFtjYl0pIHtcclxuICAgICAgcmV0dXJuIG5hdGl2ZVJlbW92ZUV2ZW50TGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIH1cclxuICAgIHZhciB1bndyYXBwZWRDYiA9IHRoaXMuX2V2ZW50TWFwW2NiXTtcclxuICAgIGRlbGV0ZSB0aGlzLl9ldmVudE1hcFtjYl07XHJcbiAgICByZXR1cm4gbmF0aXZlUmVtb3ZlRXZlbnRMaXN0ZW5lci5hcHBseSh0aGlzLCBbbmF0aXZlRXZlbnROYW1lLFxyXG4gICAgICB1bndyYXBwZWRDYl0pO1xyXG4gIH07XHJcblxyXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgJ29uJyArIGV2ZW50TmFtZVRvV3JhcCwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIHRoaXNbJ19vbicgKyBldmVudE5hbWVUb1dyYXBdO1xyXG4gICAgfSxcclxuICAgIHNldDogZnVuY3Rpb24oY2IpIHtcclxuICAgICAgaWYgKHRoaXNbJ19vbicgKyBldmVudE5hbWVUb1dyYXBdKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZVRvV3JhcCxcclxuICAgICAgICAgICAgdGhpc1snX29uJyArIGV2ZW50TmFtZVRvV3JhcF0pO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzWydfb24nICsgZXZlbnROYW1lVG9XcmFwXTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY2IpIHtcclxuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lVG9XcmFwLFxyXG4gICAgICAgICAgICB0aGlzWydfb24nICsgZXZlbnROYW1lVG9XcmFwXSA9IGNiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG4vLyBVdGlsaXR5IG1ldGhvZHMuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIGV4dHJhY3RWZXJzaW9uOiBleHRyYWN0VmVyc2lvbixcclxuICB3cmFwUGVlckNvbm5lY3Rpb25FdmVudDogd3JhcFBlZXJDb25uZWN0aW9uRXZlbnQsXHJcbiAgZGlzYWJsZUxvZzogZnVuY3Rpb24oYm9vbCkge1xyXG4gICAgaWYgKHR5cGVvZiBib29sICE9PSAnYm9vbGVhbicpIHtcclxuICAgICAgcmV0dXJuIG5ldyBFcnJvcignQXJndW1lbnQgdHlwZTogJyArIHR5cGVvZiBib29sICtcclxuICAgICAgICAgICcuIFBsZWFzZSB1c2UgYSBib29sZWFuLicpO1xyXG4gICAgfVxyXG4gICAgbG9nRGlzYWJsZWRfID0gYm9vbDtcclxuICAgIHJldHVybiAoYm9vbCkgPyAnYWRhcHRlci5qcyBsb2dnaW5nIGRpc2FibGVkJyA6XHJcbiAgICAgICAgJ2FkYXB0ZXIuanMgbG9nZ2luZyBlbmFibGVkJztcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBEaXNhYmxlIG9yIGVuYWJsZSBkZXByZWNhdGlvbiB3YXJuaW5nc1xyXG4gICAqIEBwYXJhbSB7IWJvb2xlYW59IGJvb2wgc2V0IHRvIHRydWUgdG8gZGlzYWJsZSB3YXJuaW5ncy5cclxuICAgKi9cclxuICBkaXNhYmxlV2FybmluZ3M6IGZ1bmN0aW9uKGJvb2wpIHtcclxuICAgIGlmICh0eXBlb2YgYm9vbCAhPT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoJ0FyZ3VtZW50IHR5cGU6ICcgKyB0eXBlb2YgYm9vbCArXHJcbiAgICAgICAgICAnLiBQbGVhc2UgdXNlIGEgYm9vbGVhbi4nKTtcclxuICAgIH1cclxuICAgIGRlcHJlY2F0aW9uV2FybmluZ3NfID0gIWJvb2w7XHJcbiAgICByZXR1cm4gJ2FkYXB0ZXIuanMgZGVwcmVjYXRpb24gd2FybmluZ3MgJyArIChib29sID8gJ2Rpc2FibGVkJyA6ICdlbmFibGVkJyk7XHJcbiAgfSxcclxuXHJcbiAgbG9nOiBmdW5jdGlvbigpIHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBpZiAobG9nRGlzYWJsZWRfKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGNvbnNvbGUubG9nID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3dzIGEgZGVwcmVjYXRpb24gd2FybmluZyBzdWdnZXN0aW5nIHRoZSBtb2Rlcm4gYW5kIHNwZWMtY29tcGF0aWJsZSBBUEkuXHJcbiAgICovXHJcbiAgZGVwcmVjYXRlZDogZnVuY3Rpb24ob2xkTWV0aG9kLCBuZXdNZXRob2QpIHtcclxuICAgIGlmICghZGVwcmVjYXRpb25XYXJuaW5nc18pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS53YXJuKG9sZE1ldGhvZCArICcgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSAnICsgbmV3TWV0aG9kICtcclxuICAgICAgICAnIGluc3RlYWQuJyk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogQnJvd3NlciBkZXRlY3Rvci5cclxuICAgKlxyXG4gICAqIEByZXR1cm4ge29iamVjdH0gcmVzdWx0IGNvbnRhaW5pbmcgYnJvd3NlciBhbmQgdmVyc2lvblxyXG4gICAqICAgICBwcm9wZXJ0aWVzLlxyXG4gICAqL1xyXG4gIGRldGVjdEJyb3dzZXI6IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgdmFyIG5hdmlnYXRvciA9IHdpbmRvdyAmJiB3aW5kb3cubmF2aWdhdG9yO1xyXG5cclxuICAgIC8vIFJldHVybmVkIHJlc3VsdCBvYmplY3QuXHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICByZXN1bHQuYnJvd3NlciA9IG51bGw7XHJcbiAgICByZXN1bHQudmVyc2lvbiA9IG51bGw7XHJcblxyXG4gICAgLy8gRmFpbCBlYXJseSBpZiBpdCdzIG5vdCBhIGJyb3dzZXJcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyB8fCAhd2luZG93Lm5hdmlnYXRvcikge1xyXG4gICAgICByZXN1bHQuYnJvd3NlciA9ICdOb3QgYSBicm93c2VyLic7XHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG5hdmlnYXRvci5tb3pHZXRVc2VyTWVkaWEpIHsgLy8gRmlyZWZveC5cclxuICAgICAgcmVzdWx0LmJyb3dzZXIgPSAnZmlyZWZveCc7XHJcbiAgICAgIHJlc3VsdC52ZXJzaW9uID0gZXh0cmFjdFZlcnNpb24obmF2aWdhdG9yLnVzZXJBZ2VudCxcclxuICAgICAgICAgIC9GaXJlZm94XFwvKFxcZCspXFwuLywgMSk7XHJcbiAgICB9IGVsc2UgaWYgKG5hdmlnYXRvci53ZWJraXRHZXRVc2VyTWVkaWEpIHtcclxuICAgICAgLy8gQ2hyb21lLCBDaHJvbWl1bSwgV2VidmlldywgT3BlcmEuXHJcbiAgICAgIC8vIFZlcnNpb24gbWF0Y2hlcyBDaHJvbWUvV2ViUlRDIHZlcnNpb24uXHJcbiAgICAgIHJlc3VsdC5icm93c2VyID0gJ2Nocm9tZSc7XHJcbiAgICAgIHJlc3VsdC52ZXJzaW9uID0gZXh0cmFjdFZlcnNpb24obmF2aWdhdG9yLnVzZXJBZ2VudCxcclxuICAgICAgICAgIC9DaHJvbShlfGl1bSlcXC8oXFxkKylcXC4vLCAyKTtcclxuICAgIH0gZWxzZSBpZiAobmF2aWdhdG9yLm1lZGlhRGV2aWNlcyAmJlxyXG4gICAgICAgIG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0VkZ2VcXC8oXFxkKykuKFxcZCspJC8pKSB7IC8vIEVkZ2UuXHJcbiAgICAgIHJlc3VsdC5icm93c2VyID0gJ2VkZ2UnO1xyXG4gICAgICByZXN1bHQudmVyc2lvbiA9IGV4dHJhY3RWZXJzaW9uKG5hdmlnYXRvci51c2VyQWdlbnQsXHJcbiAgICAgICAgICAvRWRnZVxcLyhcXGQrKS4oXFxkKykkLywgMik7XHJcbiAgICB9IGVsc2UgaWYgKHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiAmJlxyXG4gICAgICAgIG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0FwcGxlV2ViS2l0XFwvKFxcZCspXFwuLykpIHsgLy8gU2FmYXJpLlxyXG4gICAgICByZXN1bHQuYnJvd3NlciA9ICdzYWZhcmknO1xyXG4gICAgICByZXN1bHQudmVyc2lvbiA9IGV4dHJhY3RWZXJzaW9uKG5hdmlnYXRvci51c2VyQWdlbnQsXHJcbiAgICAgICAgICAvQXBwbGVXZWJLaXRcXC8oXFxkKylcXC4vLCAxKTtcclxuICAgIH0gZWxzZSB7IC8vIERlZmF1bHQgZmFsbHRocm91Z2g6IG5vdCBzdXBwb3J0ZWQuXHJcbiAgICAgIHJlc3VsdC5icm93c2VyID0gJ05vdCBhIHN1cHBvcnRlZCBicm93c2VyLic7XHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbn07XHJcblxyXG59LHt9XX0se30sWzNdKSgzKVxyXG59KTsiXSwic291cmNlUm9vdCI6IiJ9