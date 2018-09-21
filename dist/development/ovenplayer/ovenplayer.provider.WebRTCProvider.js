/*! OvenPlayerv0.7.6 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ovenplayer.provider.WebRTCProvider"],{

/***/ "./src/js/api/provider/html5/WebRTC.js":
/*!*********************************************!*\
  !*** ./src/js/api/provider/html5/WebRTC.js ***!
  \*********************************************/
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

var _WebRTCLoader = __webpack_require__(/*! api/provider/html5/WebRTCLoader */ "./src/js/api/provider/html5/WebRTCLoader.js");

var _WebRTCLoader2 = _interopRequireDefault(_WebRTCLoader);

var _validator = __webpack_require__(/*! utils/validator */ "./src/js/utils/validator.js");

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @brief   webrtc provider extended core.
 * @param   element video element.
 * @param   playerConfig    config.
 * */

var WebRTC = function WebRTC(container, playerConfig) {

    var mediaManager = (0, _Manager2["default"])(container, _constants.PROVIDER_WEBRTC);
    var element = mediaManager.create();

    var webrtcLoader = null;
    var that = {},
        super_destroy = "",
        listener = "";

    var errorHandler = function errorHandler(error) {
        that.setState(_constants.STATE_ERROR);
        that.pause();
        that.trigger(_constants.ERROR, error);
    };
    var onBeforeLoad = function onBeforeLoad(source) {
        if ((0, _validator.isWebRTC)(source.file, source.type)) {
            OvenPlayerConsole.log("WEBRTC : onBeforeLoad : ", source);
            if (webrtcLoader) {
                webrtcLoader.destroy();
                webrtcLoader = null;
            }
            webrtcLoader = (0, _WebRTCLoader2["default"])(that, source.file, errorHandler);
            webrtcLoader.connect().then(function (stream) {
                element.srcObject = stream;
                element.play();
            });
        }
    };

    that = (0, _Provider2["default"])(_constants.PROVIDER_WEBRTC, element, playerConfig, onBeforeLoad);
    OvenPlayerConsole.log("WEBRTC PROVIDER LOADED.");
    super_destroy = that["super"]('destroy');

    that.destroy = function () {
        if (webrtcLoader) {
            webrtcLoader.destroy();
            webrtcLoader = null;
        }
        mediaManager.destroy();

        super_destroy();
        OvenPlayerConsole.log("WEBRTC :  PROVIDER DESTROYED.");
    };
    return that;
}; /**
    * Created by hoho on 2018. 6. 11..
    */
exports["default"] = WebRTC;

/***/ }),

/***/ "./src/js/api/provider/html5/WebRTCLoader.js":
/*!***************************************************!*\
  !*** ./src/js/api/provider/html5/WebRTCLoader.js ***!
  \***************************************************/
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

var WebRTCLoader = function WebRTCLoader(provider, url, errorCallback) {
    var url = url;
    var ws = "";
    var peerConnection = "";
    var statisticsTimer = "";
    var config = {
        'iceServers': [{
            'urls': 'stun:stun.l.google.com:19302'
        }]
    };
    var that = {};
    var mySdp = "";

    (function () {
        var existingHandler = window.onbeforeunload;
        window.onbeforeunload = function (event) {
            if (existingHandler) {
                existingHandler(event);
            };
            OvenPlayerConsole.log("This calls auto when browser closed.");
            closePeer();
        };
    })();

    function initialize() {
        OvenPlayerConsole.log("WebRTCLoader connecting...");

        var onLocalDescription = function onLocalDescription(id, connection, desc) {
            connection.setLocalDescription(desc).then(function () {
                // my SDP created.
                var localSDP = connection.localDescription;
                OvenPlayerConsole.log('Local SDP', localSDP);
                mySdp = localSDP; //test code
                // my sdp send to server.
                ws.send(JSON.stringify({
                    id: id,
                    command: "answer",
                    sdp: localSDP
                }));
            })["catch"](function (error) {
                closePeer({ code: _constants.PLAYER_WEBRTC_SET_LOCAL_DESC_ERROR, reason: "setLocalDescription error occurred", message: "setLocalDescription error occurred", error: error });
            });
        };

        return new Promise(function (resolve, reject) {
            OvenPlayerConsole.log("WebRTCLoader url : " + url);
            try {
                ws = new WebSocket(url);
                ws.onopen = function () {
                    ws.send(JSON.stringify({ command: "request_offer" }));
                };
                ws.onmessage = function (e) {
                    var message = JSON.parse(e.data);
                    if (message.error) {
                        OvenPlayerConsole.log(message.error);
                        closePeer({ code: _constants.PLAYER_WEBRTC_WS_ERROR, reason: "websocket error occured", message: "websocket error occurred", error: message });

                        return false;
                    }
                    if (message.list) {
                        OvenPlayerConsole.log('List received');
                        return;
                    }

                    if (!message.id) {
                        OvenPlayerConsole.log('ID must be not null');
                        return;
                    }

                    if (!peerConnection) {
                        peerConnection = new RTCPeerConnection(config);

                        peerConnection.onicecandidate = function (e) {
                            if (e.candidate) {
                                OvenPlayerConsole.log("WebRTCLoader send candidate to server : " + e.candidate);
                                ws.send(JSON.stringify({
                                    id: message.id,
                                    command: "candidate",
                                    candidates: [e.candidate]
                                }));
                            }
                        };

                        peerConnection.onnegotiationneeded = function () {
                            peerConnection.createOffer().then(function (desc) {
                                OvenPlayerConsole.log("createOffer : success");
                                onLocalDescription(message.id, peerConnection, desc);
                            })["catch"](function (err) {
                                closePeer({ code: _constants.PLAYER_WEBRTC_CREATE_ANSWER_ERROR, reason: "createOffer error occurred", message: "createOffer error occurred", error: error });
                            });
                        };

                        peerConnection.onaddstream = function (e) {
                            OvenPlayerConsole.log("stream received.");
                            // stream received.
                            var lostPacketsArr = [],
                                slotLength = 8,
                                //8 statistics. every 2 seconds
                            prevPacketsLost = 0,
                                avg8Losses = 0,
                                avgMoreThanThresholdCount = 0,
                                //If avg8Loss more than threshold.
                            threshold = 20;
                            var extractLossPacketsOnNetworkStatus = function extractLossPacketsOnNetworkStatus() {
                                statisticsTimer = setTimeout(function () {
                                    if (!peerConnection) {
                                        return false;
                                    }
                                    peerConnection.getStats().then(function (stats) {
                                        //console.log(stats);
                                        stats.forEach(function (state) {
                                            //console.log(state);
                                            if (state.type === "inbound-rtp" && !state.isRemote) {
                                                OvenPlayerConsole.log(state);

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
                                                            clearTimeout(statisticsTimer);
                                                            provider.trigger(_constants.NETWORK_UNSTABLED);
                                                        }
                                                    } else {
                                                        avgMoreThanThresholdCount = 0;
                                                    }
                                                }

                                                prevPacketsLost = state.packetsLost;
                                            }
                                        });

                                        extractLossPacketsOnNetworkStatus();
                                    });
                                }, 2000);
                            };
                            extractLossPacketsOnNetworkStatus();
                            resolve(e.stream);
                        };
                    }

                    if (message.sdp) {
                        //Set remote description when I received sdp from server.
                        peerConnection.setRemoteDescription(new RTCSessionDescription(message.sdp)).then(function () {
                            if (peerConnection.remoteDescription.type === 'offer') {
                                // This creates answer when I received offer from publisher.
                                peerConnection.createAnswer().then(function (desc) {
                                    OvenPlayerConsole.log("createAnswer : success");
                                    onLocalDescription(message.id, peerConnection, desc);
                                })["catch"](function (error) {
                                    closePeer({ code: _constants.PLAYER_WEBRTC_CREATE_ANSWER_ERROR, reason: "createAnswer error occurred", message: "createAnswer error occurred", error: error });
                                });
                            }
                        })["catch"](function (error) {
                            closePeer({ code: _constants.PLAYER_WEBRTC_SET_REMOTE_DESC_ERROR, reason: "setRemoteDescription error occurred", message: "setRemoteDescription error occurred", error: error });
                        });
                    }

                    if (message.candidates) {
                        // This receives ICE Candidate from server.
                        for (var i = 0; i < message.candidates.length; i++) {
                            if (message.candidates[i] && message.candidates[i].candidate) {

                                peerConnection.addIceCandidate(new RTCIceCandidate(message.candidates[i])).then(function () {
                                    OvenPlayerConsole.log("addIceCandidate : success");
                                })["catch"](function (error) {
                                    closePeer({ code: _constants.PLAYER_WEBRTC_ADD_ICECANDIDATE_ERROR, reason: "addIceCandidate error occurred", message: "addIceCandidate error occurred", error: error });
                                });
                            }
                        }
                    }
                };
                ws.onerror = function (e) {
                    closePeer({ code: _constants.PLAYER_WEBRTC_WS_ERROR, reason: "websocket error occured", message: "websocket error occurred", error: e });
                    reject(e);
                };
            } catch (error) {
                closePeer({ code: _constants.PLAYER_WEBRTC_WS_ERROR, reason: "websocket error occured", message: "websocket error occurred", error: error });
            }
        });
    }

    function closePeer(error) {
        OvenPlayerConsole.log('WebRTC Loader closePeear()');
        if (!!ws) {
            OvenPlayerConsole.log('Closing websocket connection...');
            OvenPlayerConsole.log("Send Signaling : Stop.");
            ws.send(JSON.stringify({ command: "stop" }));
            ws.close();
            ws = null;
        }
        if (peerConnection) {
            OvenPlayerConsole.log('Closing peer connection...');
            if (statisticsTimer) {
                clearTimeout(statisticsTimer);
            }
            peerConnection.close();
            peerConnection = null;
        };
        if (error) {
            errorCallback(error);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L1dlYlJUQy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L1dlYlJUQ0xvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvYWRhcHRlci5qcyJdLCJuYW1lcyI6WyJXZWJSVEMiLCJjb250YWluZXIiLCJwbGF5ZXJDb25maWciLCJtZWRpYU1hbmFnZXIiLCJQUk9WSURFUl9XRUJSVEMiLCJlbGVtZW50IiwiY3JlYXRlIiwid2VicnRjTG9hZGVyIiwidGhhdCIsInN1cGVyX2Rlc3Ryb3kiLCJsaXN0ZW5lciIsImVycm9ySGFuZGxlciIsImVycm9yIiwic2V0U3RhdGUiLCJTVEFURV9FUlJPUiIsInBhdXNlIiwidHJpZ2dlciIsIkVSUk9SIiwib25CZWZvcmVMb2FkIiwic291cmNlIiwiZmlsZSIsInR5cGUiLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImRlc3Ryb3kiLCJjb25uZWN0IiwidGhlbiIsInN0cmVhbSIsInNyY09iamVjdCIsInBsYXkiLCJXZWJSVENMb2FkZXIiLCJwcm92aWRlciIsInVybCIsImVycm9yQ2FsbGJhY2siLCJ3cyIsInBlZXJDb25uZWN0aW9uIiwic3RhdGlzdGljc1RpbWVyIiwiY29uZmlnIiwibXlTZHAiLCJleGlzdGluZ0hhbmRsZXIiLCJ3aW5kb3ciLCJvbmJlZm9yZXVubG9hZCIsImV2ZW50IiwiY2xvc2VQZWVyIiwiaW5pdGlhbGl6ZSIsIm9uTG9jYWxEZXNjcmlwdGlvbiIsImlkIiwiY29ubmVjdGlvbiIsImRlc2MiLCJzZXRMb2NhbERlc2NyaXB0aW9uIiwibG9jYWxTRFAiLCJsb2NhbERlc2NyaXB0aW9uIiwic2VuZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJjb21tYW5kIiwic2RwIiwiY29kZSIsIlBMQVlFUl9XRUJSVENfU0VUX0xPQ0FMX0RFU0NfRVJST1IiLCJyZWFzb24iLCJtZXNzYWdlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJXZWJTb2NrZXQiLCJvbm9wZW4iLCJvbm1lc3NhZ2UiLCJlIiwicGFyc2UiLCJkYXRhIiwiUExBWUVSX1dFQlJUQ19XU19FUlJPUiIsImxpc3QiLCJSVENQZWVyQ29ubmVjdGlvbiIsIm9uaWNlY2FuZGlkYXRlIiwiY2FuZGlkYXRlIiwiY2FuZGlkYXRlcyIsIm9ubmVnb3RpYXRpb25uZWVkZWQiLCJjcmVhdGVPZmZlciIsImVyciIsIlBMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUiIsIm9uYWRkc3RyZWFtIiwibG9zdFBhY2tldHNBcnIiLCJzbG90TGVuZ3RoIiwicHJldlBhY2tldHNMb3N0IiwiYXZnOExvc3NlcyIsImF2Z01vcmVUaGFuVGhyZXNob2xkQ291bnQiLCJ0aHJlc2hvbGQiLCJleHRyYWN0TG9zc1BhY2tldHNPbk5ldHdvcmtTdGF0dXMiLCJzZXRUaW1lb3V0IiwiZ2V0U3RhdHMiLCJzdGF0cyIsImZvckVhY2giLCJzdGF0ZSIsImlzUmVtb3RlIiwicHVzaCIsInBhcnNlSW50IiwicGFja2V0c0xvc3QiLCJsZW5ndGgiLCJzbGljZSIsIl8iLCJyZWR1Y2UiLCJtZW1vIiwibnVtIiwiY2xlYXJUaW1lb3V0IiwiTkVUV09SS19VTlNUQUJMRUQiLCJzZXRSZW1vdGVEZXNjcmlwdGlvbiIsIlJUQ1Nlc3Npb25EZXNjcmlwdGlvbiIsInJlbW90ZURlc2NyaXB0aW9uIiwiY3JlYXRlQW5zd2VyIiwiUExBWUVSX1dFQlJUQ19TRVRfUkVNT1RFX0RFU0NfRVJST1IiLCJpIiwiYWRkSWNlQ2FuZGlkYXRlIiwiUlRDSWNlQ2FuZGlkYXRlIiwiUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SIiwib25lcnJvciIsImNsb3NlIiwiZiIsImV4cG9ydHMiLCJtb2R1bGUiLCJkZWZpbmUiLCJ0IiwibiIsInIiLCJzIiwibyIsInUiLCJhIiwicmVxdWlyZSIsIkVycm9yIiwibCIsImNhbGwiLCJTRFBVdGlscyIsIndyaXRlTWVkaWFTZWN0aW9uIiwidHJhbnNjZWl2ZXIiLCJjYXBzIiwiZHRsc1JvbGUiLCJ3cml0ZVJ0cERlc2NyaXB0aW9uIiwia2luZCIsIndyaXRlSWNlUGFyYW1ldGVycyIsImljZUdhdGhlcmVyIiwiZ2V0TG9jYWxQYXJhbWV0ZXJzIiwid3JpdGVEdGxzUGFyYW1ldGVycyIsImR0bHNUcmFuc3BvcnQiLCJtaWQiLCJydHBTZW5kZXIiLCJydHBSZWNlaXZlciIsInRyYWNrSWQiLCJfaW5pdGlhbFRyYWNrSWQiLCJ0cmFjayIsIm1zaWQiLCJzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzIiwic3NyYyIsInJ0eCIsImxvY2FsQ05hbWUiLCJmaWx0ZXJJY2VTZXJ2ZXJzIiwiaWNlU2VydmVycyIsImVkZ2VWZXJzaW9uIiwiaGFzVHVybiIsImZpbHRlciIsInNlcnZlciIsInVybHMiLCJjb25zb2xlIiwid2FybiIsImlzU3RyaW5nIiwidmFsaWRUdXJuIiwiaW5kZXhPZiIsImdldENvbW1vbkNhcGFiaWxpdGllcyIsImxvY2FsQ2FwYWJpbGl0aWVzIiwicmVtb3RlQ2FwYWJpbGl0aWVzIiwiY29tbW9uQ2FwYWJpbGl0aWVzIiwiY29kZWNzIiwiaGVhZGVyRXh0ZW5zaW9ucyIsImZlY01lY2hhbmlzbXMiLCJmaW5kQ29kZWNCeVBheWxvYWRUeXBlIiwicHQiLCJwYXlsb2FkVHlwZSIsInByZWZlcnJlZFBheWxvYWRUeXBlIiwicnR4Q2FwYWJpbGl0eU1hdGNoZXMiLCJsUnR4IiwiclJ0eCIsImxDb2RlY3MiLCJyQ29kZWNzIiwibENvZGVjIiwicGFyYW1ldGVycyIsImFwdCIsInJDb2RlYyIsIm5hbWUiLCJ0b0xvd2VyQ2FzZSIsImNsb2NrUmF0ZSIsIm51bUNoYW5uZWxzIiwiTWF0aCIsIm1pbiIsInJ0Y3BGZWVkYmFjayIsImZiIiwiaiIsInBhcmFtZXRlciIsImxIZWFkZXJFeHRlbnNpb24iLCJySGVhZGVyRXh0ZW5zaW9uIiwidXJpIiwiaXNBY3Rpb25BbGxvd2VkSW5TaWduYWxpbmdTdGF0ZSIsImFjdGlvbiIsInNpZ25hbGluZ1N0YXRlIiwib2ZmZXIiLCJhbnN3ZXIiLCJtYXliZUFkZENhbmRpZGF0ZSIsImljZVRyYW5zcG9ydCIsImFscmVhZHlBZGRlZCIsImdldFJlbW90ZUNhbmRpZGF0ZXMiLCJmaW5kIiwicmVtb3RlQ2FuZGlkYXRlIiwiZm91bmRhdGlvbiIsImlwIiwicG9ydCIsInByaW9yaXR5IiwicHJvdG9jb2wiLCJhZGRSZW1vdGVDYW5kaWRhdGUiLCJtYWtlRXJyb3IiLCJkZXNjcmlwdGlvbiIsIk5vdFN1cHBvcnRlZEVycm9yIiwiSW52YWxpZFN0YXRlRXJyb3IiLCJJbnZhbGlkQWNjZXNzRXJyb3IiLCJUeXBlRXJyb3IiLCJ1bmRlZmluZWQiLCJPcGVyYXRpb25FcnJvciIsImFkZFRyYWNrVG9TdHJlYW1BbmRGaXJlRXZlbnQiLCJhZGRUcmFjayIsImRpc3BhdGNoRXZlbnQiLCJNZWRpYVN0cmVhbVRyYWNrRXZlbnQiLCJyZW1vdmVUcmFja0Zyb21TdHJlYW1BbmRGaXJlRXZlbnQiLCJyZW1vdmVUcmFjayIsImZpcmVBZGRUcmFjayIsInBjIiwicmVjZWl2ZXIiLCJzdHJlYW1zIiwidHJhY2tFdmVudCIsIkV2ZW50IiwiX2Rpc3BhdGNoRXZlbnQiLCJfZXZlbnRUYXJnZXQiLCJkb2N1bWVudCIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJtZXRob2QiLCJiaW5kIiwiY2FuVHJpY2tsZUljZUNhbmRpZGF0ZXMiLCJuZWVkTmVnb3RpYXRpb24iLCJsb2NhbFN0cmVhbXMiLCJyZW1vdGVTdHJlYW1zIiwiaWNlQ29ubmVjdGlvblN0YXRlIiwiY29ubmVjdGlvblN0YXRlIiwiaWNlR2F0aGVyaW5nU3RhdGUiLCJ1c2luZ0J1bmRsZSIsImJ1bmRsZVBvbGljeSIsInJ0Y3BNdXhQb2xpY3kiLCJpY2VUcmFuc3BvcnRQb2xpY3kiLCJfaWNlR2F0aGVyZXJzIiwiaWNlQ2FuZGlkYXRlUG9vbFNpemUiLCJSVENJY2VHYXRoZXJlciIsImdhdGhlclBvbGljeSIsIl9jb25maWciLCJ0cmFuc2NlaXZlcnMiLCJfc2RwU2Vzc2lvbklkIiwiZ2VuZXJhdGVTZXNzaW9uSWQiLCJfc2RwU2Vzc2lvblZlcnNpb24iLCJfZHRsc1JvbGUiLCJfaXNDbG9zZWQiLCJwcm90b3R5cGUiLCJvbnRyYWNrIiwib25yZW1vdmVzdHJlYW0iLCJvbnNpZ25hbGluZ3N0YXRlY2hhbmdlIiwib25pY2Vjb25uZWN0aW9uc3RhdGVjaGFuZ2UiLCJvbmNvbm5lY3Rpb25zdGF0ZWNoYW5nZSIsIm9uaWNlZ2F0aGVyaW5nc3RhdGVjaGFuZ2UiLCJvbmRhdGFjaGFubmVsIiwiX2VtaXRHYXRoZXJpbmdTdGF0ZUNoYW5nZSIsImdldENvbmZpZ3VyYXRpb24iLCJnZXRMb2NhbFN0cmVhbXMiLCJnZXRSZW1vdGVTdHJlYW1zIiwiX2NyZWF0ZVRyYW5zY2VpdmVyIiwiZG9Ob3RBZGQiLCJoYXNCdW5kbGVUcmFuc3BvcnQiLCJyZWN2RW5jb2RpbmdQYXJhbWV0ZXJzIiwiYXNzb2NpYXRlZFJlbW90ZU1lZGlhU3RyZWFtcyIsIndhbnRSZWNlaXZlIiwidHJhbnNwb3J0cyIsIl9jcmVhdGVJY2VBbmREdGxzVHJhbnNwb3J0cyIsImFscmVhZHlFeGlzdHMiLCJfbWF5YmVGaXJlTmVnb3RpYXRpb25OZWVkZWQiLCJSVENSdHBTZW5kZXIiLCJhZGRTdHJlYW0iLCJnZXRUcmFja3MiLCJjbG9uZWRTdHJlYW0iLCJjbG9uZSIsImlkeCIsImNsb25lZFRyYWNrIiwiYWRkRXZlbnRMaXN0ZW5lciIsImVuYWJsZWQiLCJzZW5kZXIiLCJzdG9wIiwibWFwIiwic3BsaWNlIiwicmVtb3ZlU3RyZWFtIiwiZ2V0U2VuZGVycyIsImdldFJlY2VpdmVycyIsIl9jcmVhdGVJY2VHYXRoZXJlciIsInNkcE1MaW5lSW5kZXgiLCJzaGlmdCIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJ3cml0YWJsZSIsImJ1ZmZlcmVkQ2FuZGlkYXRlRXZlbnRzIiwiYnVmZmVyQ2FuZGlkYXRlcyIsImVuZCIsImtleXMiLCJfZ2F0aGVyIiwib25sb2NhbGNhbmRpZGF0ZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJldnQiLCJzZHBNaWQiLCJjYW5kIiwiY29tcG9uZW50IiwidWZyYWciLCJ1c2VybmFtZUZyYWdtZW50Iiwic2VyaWFsaXplZENhbmRpZGF0ZSIsIndyaXRlQ2FuZGlkYXRlIiwicGFyc2VDYW5kaWRhdGUiLCJ0b0pTT04iLCJzZWN0aW9ucyIsImdldE1lZGlhU2VjdGlvbnMiLCJnZXREZXNjcmlwdGlvbiIsImpvaW4iLCJjb21wbGV0ZSIsImV2ZXJ5IiwiUlRDSWNlVHJhbnNwb3J0Iiwib25pY2VzdGF0ZWNoYW5nZSIsIl91cGRhdGVJY2VDb25uZWN0aW9uU3RhdGUiLCJfdXBkYXRlQ29ubmVjdGlvblN0YXRlIiwiUlRDRHRsc1RyYW5zcG9ydCIsIm9uZHRsc3N0YXRlY2hhbmdlIiwiX2Rpc3Bvc2VJY2VBbmREdGxzVHJhbnNwb3J0cyIsIl90cmFuc2NlaXZlIiwicmVjdiIsInBhcmFtcyIsImVuY29kaW5ncyIsInJ0Y3AiLCJjbmFtZSIsImNvbXBvdW5kIiwicnRjcFBhcmFtZXRlcnMiLCJwIiwicmVjZWl2ZSIsInNlc3Npb25wYXJ0Iiwic3BsaXRTZWN0aW9ucyIsIm1lZGlhU2VjdGlvbiIsInBhcnNlUnRwUGFyYW1ldGVycyIsImlzSWNlTGl0ZSIsIm1hdGNoUHJlZml4IiwicmVqZWN0ZWQiLCJpc1JlamVjdGVkIiwicmVtb3RlSWNlUGFyYW1ldGVycyIsImdldEljZVBhcmFtZXRlcnMiLCJyZW1vdGVEdGxzUGFyYW1ldGVycyIsImdldER0bHNQYXJhbWV0ZXJzIiwicm9sZSIsInN0YXJ0IiwiX3VwZGF0ZVNpZ25hbGluZ1N0YXRlIiwicmVjZWl2ZXJMaXN0IiwiaWNlT3B0aW9ucyIsInN1YnN0ciIsInNwbGl0IiwibGluZXMiLCJzcGxpdExpbmVzIiwiZ2V0S2luZCIsImRpcmVjdGlvbiIsImdldERpcmVjdGlvbiIsInJlbW90ZU1zaWQiLCJwYXJzZU1zaWQiLCJnZXRNaWQiLCJnZW5lcmF0ZUlkZW50aWZpZXIiLCJwYXJzZVJ0cEVuY29kaW5nUGFyYW1ldGVycyIsInBhcnNlUnRjcFBhcmFtZXRlcnMiLCJpc0NvbXBsZXRlIiwiY2FuZHMiLCJzZXRUcmFuc3BvcnQiLCJzZXRSZW1vdGVDYW5kaWRhdGVzIiwiUlRDUnRwUmVjZWl2ZXIiLCJnZXRDYXBhYmlsaXRpZXMiLCJjb2RlYyIsImlzTmV3VHJhY2siLCJNZWRpYVN0cmVhbSIsImdldCIsIm5hdGl2ZVRyYWNrIiwic2lkIiwiaXRlbSIsIm5ld1N0YXRlIiwic3RhdGVzIiwiY2xvc2VkIiwiY2hlY2tpbmciLCJjb25uZWN0ZWQiLCJjb21wbGV0ZWQiLCJkaXNjb25uZWN0ZWQiLCJmYWlsZWQiLCJjb25uZWN0aW5nIiwibnVtQXVkaW9UcmFja3MiLCJudW1WaWRlb1RyYWNrcyIsIm9mZmVyT3B0aW9ucyIsImFyZ3VtZW50cyIsIm1hbmRhdG9yeSIsIm9wdGlvbmFsIiwib2ZmZXJUb1JlY2VpdmVBdWRpbyIsIm9mZmVyVG9SZWNlaXZlVmlkZW8iLCJ3cml0ZVNlc3Npb25Cb2lsZXJwbGF0ZSIsInJlbW90ZUNvZGVjIiwiaGRyRXh0IiwicmVtb3RlRXh0ZW5zaW9ucyIsInJIZHJFeHQiLCJnZXRMb2NhbENhbmRpZGF0ZXMiLCJtZWRpYVNlY3Rpb25zSW5PZmZlciIsImxvY2FsVHJhY2siLCJnZXRBdWRpb1RyYWNrcyIsImdldFZpZGVvVHJhY2tzIiwiaGFzUnR4IiwiYyIsInJlZHVjZWRTaXplIiwiY2FuZGlkYXRlU3RyaW5nIiwidHJpbSIsInByb21pc2VzIiwiZml4U3RhdHNUeXBlIiwic3RhdCIsImluYm91bmRydHAiLCJvdXRib3VuZHJ0cCIsImNhbmRpZGF0ZXBhaXIiLCJsb2NhbGNhbmRpZGF0ZSIsInJlbW90ZWNhbmRpZGF0ZSIsInJlc3VsdHMiLCJNYXAiLCJhbGwiLCJyZXMiLCJyZXN1bHQiLCJzZXQiLCJtZXRob2RzIiwibmF0aXZlTWV0aG9kIiwiYXJncyIsImFwcGx5IiwicmFuZG9tIiwidG9TdHJpbmciLCJibG9iIiwibGluZSIsInBhcnRzIiwicGFydCIsImluZGV4IiwicHJlZml4Iiwic3Vic3RyaW5nIiwicmVsYXRlZEFkZHJlc3MiLCJyZWxhdGVkUG9ydCIsInRjcFR5cGUiLCJ0b1VwcGVyQ2FzZSIsInBhcnNlSWNlT3B0aW9ucyIsInBhcnNlUnRwTWFwIiwicGFyc2VkIiwid3JpdGVSdHBNYXAiLCJwYXJzZUV4dG1hcCIsIndyaXRlRXh0bWFwIiwiaGVhZGVyRXh0ZW5zaW9uIiwicHJlZmVycmVkSWQiLCJwYXJzZUZtdHAiLCJrdiIsIndyaXRlRm10cCIsInBhcmFtIiwicGFyc2VSdGNwRmIiLCJ3cml0ZVJ0Y3BGYiIsInBhcnNlU3NyY01lZGlhIiwic3AiLCJjb2xvbiIsImF0dHJpYnV0ZSIsInBhcnNlRmluZ2VycHJpbnQiLCJhbGdvcml0aG0iLCJmaW5nZXJwcmludHMiLCJzZXR1cFR5cGUiLCJmcCIsImNvbmNhdCIsImljZVBhcmFtZXRlcnMiLCJwYXNzd29yZCIsIm1saW5lIiwicnRwbWFwbGluZSIsImZtdHBzIiwibWF4cHRpbWUiLCJleHRlbnNpb24iLCJlbmNvZGluZ1BhcmFtZXRlcnMiLCJoYXNSZWQiLCJoYXNVbHBmZWMiLCJzc3JjcyIsInByaW1hcnlTc3JjIiwic2Vjb25kYXJ5U3NyYyIsImZsb3dzIiwiZW5jUGFyYW0iLCJjb2RlY1BheWxvYWRUeXBlIiwiZmVjIiwibWVjaGFuaXNtIiwiYmFuZHdpZHRoIiwibWF4Qml0cmF0ZSIsInJlbW90ZVNzcmMiLCJvYmoiLCJyc2l6ZSIsIm11eCIsInNwZWMiLCJwbGFuQiIsInNlc3NJZCIsInNlc3NWZXIiLCJzZXNzaW9uSWQiLCJ2ZXJzaW9uIiwicGFyc2VNTGluZSIsImZtdCIsInBhcnNlT0xpbmUiLCJ1c2VybmFtZSIsInNlc3Npb25WZXJzaW9uIiwibmV0VHlwZSIsImFkZHJlc3NUeXBlIiwiYWRkcmVzcyIsImdsb2JhbCIsImFkYXB0ZXJGYWN0b3J5Iiwic2VsZiIsInV0aWxzIiwiZGVwZW5kZW5jaWVzIiwib3B0cyIsIm9wdGlvbnMiLCJzaGltQ2hyb21lIiwic2hpbUZpcmVmb3giLCJzaGltRWRnZSIsInNoaW1TYWZhcmkiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsImxvZ2dpbmciLCJicm93c2VyRGV0YWlscyIsImRldGVjdEJyb3dzZXIiLCJjaHJvbWVTaGltIiwiZWRnZVNoaW0iLCJmaXJlZm94U2hpbSIsInNhZmFyaVNoaW0iLCJjb21tb25TaGltIiwiYWRhcHRlciIsImV4dHJhY3RWZXJzaW9uIiwiZGlzYWJsZUxvZyIsImRpc2FibGVXYXJuaW5ncyIsImJyb3dzZXIiLCJzaGltUGVlckNvbm5lY3Rpb24iLCJicm93c2VyU2hpbSIsInNoaW1DcmVhdGVPYmplY3RVUkwiLCJzaGltR2V0VXNlck1lZGlhIiwic2hpbU1lZGlhU3RyZWFtIiwic2hpbVNvdXJjZU9iamVjdCIsInNoaW1PblRyYWNrIiwic2hpbUFkZFRyYWNrUmVtb3ZlVHJhY2siLCJzaGltR2V0U2VuZGVyc1dpdGhEdG1mIiwic2hpbVJUQ0ljZUNhbmRpZGF0ZSIsInNoaW1NYXhNZXNzYWdlU2l6ZSIsInNoaW1TZW5kVGhyb3dUeXBlRXJyb3IiLCJzaGltUmVtb3ZlU3RyZWFtIiwic2hpbVJlcGxhY2VUcmFjayIsInNoaW1SVENJY2VTZXJ2ZXJVcmxzIiwic2hpbUNhbGxiYWNrc0FQSSIsInNoaW1Mb2NhbFN0cmVhbXNBUEkiLCJzaGltUmVtb3RlU3RyZWFtc0FQSSIsInNoaW1UcmFja0V2ZW50VHJhbnNjZWl2ZXIiLCJzaGltQ3JlYXRlT2ZmZXJMZWdhY3kiLCJ3ZWJraXRNZWRpYVN0cmVhbSIsIl9vbnRyYWNrIiwib3JpZ1NldFJlbW90ZURlc2NyaXB0aW9uIiwiX29udHJhY2twb2x5IiwidGUiLCJ3cmFwUGVlckNvbm5lY3Rpb25FdmVudCIsInNoaW1TZW5kZXJXaXRoRHRtZiIsImR0bWYiLCJfZHRtZiIsImNyZWF0ZURUTUZTZW5kZXIiLCJfcGMiLCJfc2VuZGVycyIsIm9yaWdBZGRUcmFjayIsIm9yaWdSZW1vdmVUcmFjayIsIm9yaWdBZGRTdHJlYW0iLCJvcmlnUmVtb3ZlU3RyZWFtIiwib3JpZ0dldFNlbmRlcnMiLCJzZW5kZXJzIiwiVVJMIiwiSFRNTE1lZGlhRWxlbWVudCIsIl9zcmNPYmplY3QiLCJzcmMiLCJyZXZva2VPYmplY3RVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJzaGltQWRkVHJhY2tSZW1vdmVUcmFja1dpdGhOYXRpdmUiLCJfc2hpbW1lZExvY2FsU3RyZWFtcyIsInN0cmVhbUlkIiwiRE9NRXhjZXB0aW9uIiwiZXhpc3RpbmdTZW5kZXJzIiwibmV3U2VuZGVycyIsIm5ld1NlbmRlciIsIm9yaWdHZXRMb2NhbFN0cmVhbXMiLCJuYXRpdmVTdHJlYW1zIiwiX3JldmVyc2VTdHJlYW1zIiwiX3N0cmVhbXMiLCJuZXdTdHJlYW0iLCJvbGRTdHJlYW0iLCJyZXBsYWNlSW50ZXJuYWxTdHJlYW1JZCIsImludGVybmFsSWQiLCJleHRlcm5hbFN0cmVhbSIsImludGVybmFsU3RyZWFtIiwicmVwbGFjZSIsIlJlZ0V4cCIsInJlcGxhY2VFeHRlcm5hbFN0cmVhbUlkIiwiaXNMZWdhY3lDYWxsIiwib3JpZ1NldExvY2FsRGVzY3JpcHRpb24iLCJvcmlnTG9jYWxEZXNjcmlwdGlvbiIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImlzTG9jYWwiLCJzdHJlYW1pZCIsImhhc1RyYWNrIiwid2Via2l0UlRDUGVlckNvbm5lY3Rpb24iLCJwY0NvbmZpZyIsInBjQ29uc3RyYWludHMiLCJpY2VUcmFuc3BvcnRzIiwiZ2VuZXJhdGVDZXJ0aWZpY2F0ZSIsIk9yaWdQZWVyQ29ubmVjdGlvbiIsIm5ld0ljZVNlcnZlcnMiLCJkZXByZWNhdGVkIiwib3JpZ0dldFN0YXRzIiwic2VsZWN0b3IiLCJzdWNjZXNzQ2FsbGJhY2siLCJmaXhDaHJvbWVTdGF0c18iLCJyZXNwb25zZSIsInN0YW5kYXJkUmVwb3J0IiwicmVwb3J0cyIsInJlcG9ydCIsInN0YW5kYXJkU3RhdHMiLCJ0aW1lc3RhbXAiLCJuYW1lcyIsIm1ha2VNYXBTdGF0cyIsInN1Y2Nlc3NDYWxsYmFja1dyYXBwZXJfIiwicHJvbWlzZSIsIm5hdGl2ZUFkZEljZUNhbmRpZGF0ZSIsIm5hdmlnYXRvciIsImNvbnN0cmFpbnRzVG9DaHJvbWVfIiwiY2MiLCJpZGVhbCIsImV4YWN0IiwibWF4Iiwib2xkbmFtZV8iLCJjaGFyQXQiLCJvYyIsIm1peCIsImFkdmFuY2VkIiwic2hpbUNvbnN0cmFpbnRzXyIsImNvbnN0cmFpbnRzIiwiZnVuYyIsImF1ZGlvIiwicmVtYXAiLCJiIiwidmlkZW8iLCJmYWNlIiwiZmFjaW5nTW9kZSIsImdldFN1cHBvcnRlZEZhY2luZ01vZGVMaWVzIiwibWVkaWFEZXZpY2VzIiwiZ2V0U3VwcG9ydGVkQ29uc3RyYWludHMiLCJtYXRjaGVzIiwiZW51bWVyYXRlRGV2aWNlcyIsImRldmljZXMiLCJkIiwiZGV2Iiwic29tZSIsIm1hdGNoIiwibGFiZWwiLCJkZXZpY2VJZCIsInNoaW1FcnJvcl8iLCJQZXJtaXNzaW9uRGVuaWVkRXJyb3IiLCJQZXJtaXNzaW9uRGlzbWlzc2VkRXJyb3IiLCJEZXZpY2VzTm90Rm91bmRFcnJvciIsIkNvbnN0cmFpbnROb3RTYXRpc2ZpZWRFcnJvciIsIlRyYWNrU3RhcnRFcnJvciIsIk1lZGlhRGV2aWNlRmFpbGVkRHVlVG9TaHV0ZG93biIsIk1lZGlhRGV2aWNlS2lsbFN3aXRjaE9uIiwiVGFiQ2FwdHVyZUVycm9yIiwiU2NyZWVuQ2FwdHVyZUVycm9yIiwiRGV2aWNlQ2FwdHVyZUVycm9yIiwiY29uc3RyYWludCIsImNvbnN0cmFpbnROYW1lIiwiZ2V0VXNlck1lZGlhXyIsIm9uU3VjY2VzcyIsIm9uRXJyb3IiLCJ3ZWJraXRHZXRVc2VyTWVkaWEiLCJnZXRVc2VyTWVkaWEiLCJnZXRVc2VyTWVkaWFQcm9taXNlXyIsImtpbmRzIiwiTWVkaWFTdHJlYW1UcmFjayIsImdldFNvdXJjZXMiLCJkZXZpY2UiLCJncm91cElkIiwiZWNob0NhbmNlbGxhdGlvbiIsImZyYW1lUmF0ZSIsImhlaWdodCIsIndpZHRoIiwib3JpZ0dldFVzZXJNZWRpYSIsImNzIiwiTmF0aXZlUlRDSWNlQ2FuZGlkYXRlIiwibmF0aXZlQ2FuZGlkYXRlIiwicGFyc2VkQ2FuZGlkYXRlIiwiYXVnbWVudGVkQ2FuZGlkYXRlIiwibmF0aXZlQ3JlYXRlT2JqZWN0VVJMIiwibmF0aXZlUmV2b2tlT2JqZWN0VVJMIiwibmV3SWQiLCJkc2MiLCJuYXRpdmVTZXRBdHRyaWJ1dGUiLCJzZXRBdHRyaWJ1dGUiLCJSVENTY3RwVHJhbnNwb3J0IiwiX3NjdHAiLCJzY3RwSW5EZXNjcmlwdGlvbiIsIm1MaW5lIiwiZ2V0UmVtb3RlRmlyZWZveFZlcnNpb24iLCJnZXRDYW5TZW5kTWF4TWVzc2FnZVNpemUiLCJyZW1vdGVJc0ZpcmVmb3giLCJjYW5TZW5kTWF4TWVzc2FnZVNpemUiLCJnZXRNYXhNZXNzYWdlU2l6ZSIsIm1heE1lc3NhZ2VTaXplIiwiaXNGaXJlZm94IiwiY2FuU2VuZE1NUyIsInJlbW90ZU1NUyIsIk51bWJlciIsIlBPU0lUSVZFX0lORklOSVRZIiwic2N0cCIsIm9yaWdDcmVhdGVEYXRhQ2hhbm5lbCIsImNyZWF0ZURhdGFDaGFubmVsIiwiZGF0YUNoYW5uZWwiLCJvcmlnRGF0YUNoYW5uZWxTZW5kIiwiZGMiLCJzaXplIiwiYnl0ZUxlbmd0aCIsInNoaW1SVENQZWVyQ29ubmVjdGlvbiIsIm9yaWdNU1RFbmFibGVkIiwiZXYiLCJSVENEdG1mU2VuZGVyIiwiUlRDRFRNRlNlbmRlciIsInJlcGxhY2VUcmFjayIsInNldFRyYWNrIiwiUlRDVHJhY2tFdmVudCIsIm1velNyY09iamVjdCIsIm1velJUQ1BlZXJDb25uZWN0aW9uIiwibmV3U2VydmVyIiwiY3JlZGVudGlhbCIsIm1velJUQ1Nlc3Npb25EZXNjcmlwdGlvbiIsIm1velJUQ0ljZUNhbmRpZGF0ZSIsIm1vZGVyblN0YXRzVHlwZXMiLCJuYXRpdmVHZXRTdGF0cyIsIm9uU3VjYyIsIm9uRXJyIiwiSW50ZXJuYWxFcnJvciIsIlNlY3VyaXR5RXJyb3IiLCJjb25zdHJhaW50c1RvRkYzN18iLCJtb3pHZXRVc2VyTWVkaWEiLCJpbmZvcyIsIm9yZ0VudW1lcmF0ZURldmljZXMiLCJuYXRpdmVHZXRVc2VyTWVkaWEiLCJnZXRTZXR0aW5ncyIsIm5hdGl2ZUdldFNldHRpbmdzIiwiYXBwbHlDb25zdHJhaW50cyIsIm5hdGl2ZUFwcGx5Q29uc3RyYWludHMiLCJfbG9jYWxTdHJlYW1zIiwiZ2V0U3RyZWFtQnlJZCIsIl9yZW1vdGVTdHJlYW1zIiwiX2FkZFRyYWNrIiwidHJhY2tzIiwiX29uYWRkc3RyZWFtIiwiX29uYWRkc3RyZWFtcG9seSIsImZhaWx1cmVDYWxsYmFjayIsIndpdGhDYWxsYmFjayIsImNiIiwiZXJyY2IiLCJSVENUcmFuc2NlaXZlciIsIm9yaWdDcmVhdGVPZmZlciIsImF1ZGlvVHJhbnNjZWl2ZXIiLCJnZXRUcmFuc2NlaXZlcnMiLCJzZXREaXJlY3Rpb24iLCJhZGRUcmFuc2NlaXZlciIsInZpZGVvVHJhbnNjZWl2ZXIiLCJsb2dEaXNhYmxlZF8iLCJkZXByZWNhdGlvbldhcm5pbmdzXyIsInVhc3RyaW5nIiwiZXhwciIsInBvcyIsImV2ZW50TmFtZVRvV3JhcCIsIndyYXBwZXIiLCJwcm90byIsIm5hdGl2ZUFkZEV2ZW50TGlzdGVuZXIiLCJuYXRpdmVFdmVudE5hbWUiLCJ3cmFwcGVkQ2FsbGJhY2siLCJfZXZlbnRNYXAiLCJuYXRpdmVSZW1vdmVFdmVudExpc3RlbmVyIiwidW53cmFwcGVkQ2IiLCJib29sIiwib2xkTWV0aG9kIiwibmV3TWV0aG9kIiwidXNlckFnZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7OztBQU1BLElBQU1BLFNBQVMsU0FBVEEsTUFBUyxDQUFTQyxTQUFULEVBQW9CQyxZQUFwQixFQUFpQzs7QUFFNUMsUUFBSUMsZUFBZSwwQkFBYUYsU0FBYixFQUF3QkcsMEJBQXhCLENBQW5CO0FBQ0EsUUFBSUMsVUFBVUYsYUFBYUcsTUFBYixFQUFkOztBQUVBLFFBQUlDLGVBQWUsSUFBbkI7QUFDQSxRQUFJQyxPQUFPLEVBQVg7QUFBQSxRQUFlQyxnQkFBaUIsRUFBaEM7QUFB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T2dDLGlCQUFQLElBQ1BxakIsVUFBVStKLFNBQVYsQ0FBb0JsSSxLQUFwQixDQUEwQixzQkFBMUIsQ0FERyxFQUNnRDtBQUFFO0FBQ3ZEdE8sbUJBQU8wRyxPQUFQLEdBQWlCLFFBQWpCO0FBQ0ExRyxtQkFBT3dFLE9BQVAsR0FBaUIrQixlQUFla0csVUFBVStKLFNBQXpCLEVBQ2Isc0JBRGEsRUFDVyxDQURYLENBQWpCO0FBRUQsV0FMTSxNQUtBO0FBQUU7QUFDUHhXLG1CQUFPMEcsT0FBUCxHQUFpQiwwQkFBakI7QUFDQSxtQkFBTzFHLE1BQVA7QUFDRDs7QUFFRCxpQkFBT0EsTUFBUDtBQUNEO0FBOUZjLE9BQWpCO0FBaUdDLEtBaExxQixFQWdMcEIsRUFoTG9CLENBOXBKb3hCLEVBQTNiLEVBODBKeFcsRUE5MEp3VyxFQTgwSnJXLENBQUMsQ0FBRCxDQTkwSnFXLEVBODBKaFcsQ0E5MEpnVyxDQUFQO0FBKzBKdlcsQ0EvMEpELEUiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5XZWJSVENQcm92aWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gMTEuLlxyXG4gKi9cclxuaW1wb3J0IE1lZGlhTWFuYWdlciBmcm9tIFwiYXBpL21lZGlhL01hbmFnZXJcIjtcclxuaW1wb3J0IFByb3ZpZGVyIGZyb20gXCJhcGkvcHJvdmlkZXIvaHRtbDUvUHJvdmlkZXJcIjtcclxuaW1wb3J0IFdlYlJUQ0xvYWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L1dlYlJUQ0xvYWRlclwiO1xyXG5pbXBvcnQge2lzV2ViUlRDfSBmcm9tIFwidXRpbHMvdmFsaWRhdG9yXCI7XHJcbmltcG9ydCB7RVJST1IsIFNUQVRFX0VSUk9SLCBQUk9WSURFUl9XRUJSVEN9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcblxyXG4vKipcclxuICogQGJyaWVmICAgd2VicnRjIHByb3ZpZGVyIGV4dGVuZGVkIGNvcmUuXHJcbiAqIEBwYXJhbSAgIGVsZW1lbnQgdmlkZW8gZWxlbWVudC5cclxuICogQHBhcmFtICAgcGxheWVyQ29uZmlnICAgIGNvbmZpZy5cclxuICogKi9cclxuXHJcbmNvbnN0IFdlYlJUQyA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgcGxheWVyQ29uZmlnKXtcclxuXHJcbiAgICBsZXQgbWVkaWFNYW5hZ2VyID0gTWVkaWFNYW5hZ2VyKGNvbnRhaW5lciwgUFJPVklERVJfV0VCUlRDKTtcclxuICAgIGxldCBlbGVtZW50ID0gbWVkaWFNYW5hZ2VyLmNyZWF0ZSgpO1xyXG5cclxuICAgIGxldCB3ZWJydGNMb2FkZXIgPSBudWxsO1xyXG4gICAgbGV0IHRoYXQgPSB7fSwgc3VwZXJfZGVzdHJveSAgPSBcIlwiLCBsaXN0ZW5lciA9IFwiXCI7XHJcblxyXG4gICAgbGV0IGVycm9ySGFuZGxlciA9IGZ1bmN0aW9uKGVycm9yKXtcclxuICAgICAgICB0aGF0LnNldFN0YXRlKFNUQVRFX0VSUk9SKTtcclxuICAgICAgICB0aGF0LnBhdXNlKCk7XHJcbiAgICAgICAgdGhhdC50cmlnZ2VyKEVSUk9SLCBlcnJvciApO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IG9uQmVmb3JlTG9hZCA9IChzb3VyY2UpID0+IHtcclxuICAgICAgICBpZihpc1dlYlJUQyhzb3VyY2UuZmlsZSwgc291cmNlLnR5cGUpKXtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiV0VCUlRDIDogb25CZWZvcmVMb2FkIDogXCIsIHNvdXJjZSk7XHJcbiAgICAgICAgICAgIGlmKHdlYnJ0Y0xvYWRlcil7XHJcbiAgICAgICAgICAgICAgICB3ZWJydGNMb2FkZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgd2VicnRjTG9hZGVyID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB3ZWJydGNMb2FkZXIgPSBXZWJSVENMb2FkZXIodGhhdCwgc291cmNlLmZpbGUsIGVycm9ySGFuZGxlcik7XHJcbiAgICAgICAgICAgIHdlYnJ0Y0xvYWRlci5jb25uZWN0KCkudGhlbihmdW5jdGlvbihzdHJlYW0pe1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zcmNPYmplY3QgPSBzdHJlYW07XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnBsYXkoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGF0ID0gUHJvdmlkZXIoUFJPVklERVJfV0VCUlRDLCBlbGVtZW50LCBwbGF5ZXJDb25maWcsIG9uQmVmb3JlTG9hZCk7XHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJXRUJSVEMgUFJPVklERVIgTE9BREVELlwiKTtcclxuICAgIHN1cGVyX2Rlc3Ryb3kgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7XHJcblxyXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XHJcbiAgICAgICAgaWYod2VicnRjTG9hZGVyKXtcclxuICAgICAgICAgICAgd2VicnRjTG9hZGVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgd2VicnRjTG9hZGVyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbWVkaWFNYW5hZ2VyLmRlc3Ryb3koKTtcclxuXHJcbiAgICAgICAgc3VwZXJfZGVzdHJveSgpO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldFQlJUQyA6ICBQUk9WSURFUiBERVNUUk9ZRUQuXCIpO1xyXG5cclxuICAgIH07XHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBXZWJSVEM7XHJcbiIsImltcG9ydCBhZGFwdGVyIGZyb20gJ3V0aWxzL2FkYXB0ZXInO1xyXG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xyXG5pbXBvcnQge1xyXG4gICAgUExBWUVSX1dFQlJUQ19XU19FUlJPUixcclxuICAgIFBMQVlFUl9XRUJSVENfV1NfQ0xPU0VELFxyXG4gICAgUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SLFxyXG4gICAgUExBWUVSX1dFQlJUQ19TRVRfUkVNT1RFX0RFU0NfRVJST1IsXHJcbiAgICBQTEFZRVJfV0VCUlRDX0NSRUFURV9BTlNXRVJfRVJST1IsXHJcbiAgICBQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SLFxyXG4gICAgUExBWUVSX1dFQlJUQ19ORVRXT1JLX1NMT1csXHJcbiAgICBORVRXT1JLX1VOU1RBQkxFRFxyXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcblxyXG5cclxuY29uc3QgV2ViUlRDTG9hZGVyID0gZnVuY3Rpb24ocHJvdmlkZXIsIHVybCwgZXJyb3JDYWxsYmFjayl7XHJcbiAgICB2YXIgdXJsID0gdXJsO1xyXG4gICAgbGV0IHdzID0gXCJcIjtcclxuICAgIGxldCBwZWVyQ29ubmVjdGlvbiA9IFwiXCI7XHJcbiAgICBsZXQgc3RhdGlzdGljc1RpbWVyID0gXCJcIjtcclxuICAgIGNvbnN0IGNvbmZpZyA9IHtcclxuICAgICAgICAnaWNlU2VydmVycyc6IFt7XHJcbiAgICAgICAgICAgICd1cmxzJzogJ3N0dW46c3R1bi5sLmdvb2dsZS5jb206MTkzMDInXHJcbiAgICAgICAgfV1cclxuICAgIH07XHJcbiAgICBjb25zdCB0aGF0ID0ge307XHJcbiAgICBsZXQgbXlTZHAgPSBcIlwiO1xyXG5cclxuXHJcbiAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGV4aXN0aW5nSGFuZGxlciA9IHdpbmRvdy5vbmJlZm9yZXVubG9hZDtcclxuICAgICAgICB3aW5kb3cub25iZWZvcmV1bmxvYWQgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdIYW5kbGVyKXtcclxuICAgICAgICAgICAgICAgIGV4aXN0aW5nSGFuZGxlcihldmVudCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlRoaXMgY2FsbHMgYXV0byB3aGVuIGJyb3dzZXIgY2xvc2VkLlwiKTtcclxuICAgICAgICAgICAgY2xvc2VQZWVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSkoKTtcclxuXHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcclxuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJXZWJSVENMb2FkZXIgY29ubmVjdGluZy4uLlwiKTtcclxuXHJcbiAgICAgICAgY29uc3Qgb25Mb2NhbERlc2NyaXB0aW9uID0gZnVuY3Rpb24oaWQsIGNvbm5lY3Rpb24sIGRlc2MpIHtcclxuICAgICAgICAgICAgY29ubmVjdGlvbi5zZXRMb2NhbERlc2NyaXB0aW9uKGRlc2MpLnRoZW4oZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgICAgICAgICAvLyBteSBTRFAgY3JlYXRlZC5cclxuICAgICAgICAgICAgICAgIHZhciBsb2NhbFNEUCA9IGNvbm5lY3Rpb24ubG9jYWxEZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZygnTG9jYWwgU0RQJywgbG9jYWxTRFApO1xyXG4gICAgICAgICAgICAgICAgbXlTZHAgPSBsb2NhbFNEUDsgICAvL3Rlc3QgY29kZVxyXG4gICAgICAgICAgICAgICAgLy8gbXkgc2RwIHNlbmQgdG8gc2VydmVyLlxyXG4gICAgICAgICAgICAgICAgd3Muc2VuZChKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGlkLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmQgOiBcImFuc3dlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNkcDogbG9jYWxTRFBcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY2xvc2VQZWVyKHtjb2RlIDogUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUiwgcmVhc29uIDogXCJzZXRMb2NhbERlc2NyaXB0aW9uIGVycm9yIG9jY3VycmVkXCIsIG1lc3NhZ2UgOiBcInNldExvY2FsRGVzY3JpcHRpb24gZXJyb3Igb2NjdXJyZWRcIiwgZXJyb3IgOiBlcnJvcn0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiV2ViUlRDTG9hZGVyIHVybCA6IFwiICsgdXJsKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHdzID0gbmV3IFdlYlNvY2tldCh1cmwpO1xyXG4gICAgICAgICAgICAgICAgd3Mub25vcGVuID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd3Muc2VuZChKU09OLnN0cmluZ2lmeSh7Y29tbWFuZCA6IFwicmVxdWVzdF9vZmZlclwifSkpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHdzLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gSlNPTi5wYXJzZShlLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKG1lc3NhZ2UuZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2cobWVzc2FnZS5lcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcih7Y29kZSA6IFBMQVlFUl9XRUJSVENfV1NfRVJST1IsIHJlYXNvbiA6IFwid2Vic29ja2V0IGVycm9yIG9jY3VyZWRcIiwgbWVzc2FnZSA6IFwid2Vic29ja2V0IGVycm9yIG9jY3VycmVkXCIsIGVycm9yIDogbWVzc2FnZX0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZihtZXNzYWdlLmxpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKCdMaXN0IHJlY2VpdmVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFtZXNzYWdlLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZygnSUQgbXVzdCBiZSBub3QgbnVsbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZighcGVlckNvbm5lY3Rpb24pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbiA9IG5ldyBSVENQZWVyQ29ubmVjdGlvbihjb25maWcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24ub25pY2VjYW5kaWRhdGUgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihlLmNhbmRpZGF0ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiV2ViUlRDTG9hZGVyIHNlbmQgY2FuZGlkYXRlIHRvIHNlcnZlciA6IFwiICsgZS5jYW5kaWRhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdzLnNlbmQoSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogbWVzc2FnZS5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZCA6IFwiY2FuZGlkYXRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbmRpZGF0ZXM6IFtlLmNhbmRpZGF0ZV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbi5vbm5lZ290aWF0aW9ubmVlZGVkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbi5jcmVhdGVPZmZlcigpLnRoZW4oZnVuY3Rpb24oZGVzYykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcImNyZWF0ZU9mZmVyIDogc3VjY2Vzc1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uTG9jYWxEZXNjcmlwdGlvbihtZXNzYWdlLmlkLCBwZWVyQ29ubmVjdGlvbiwgZGVzYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcih7Y29kZSA6IFBMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUiwgcmVhc29uIDogXCJjcmVhdGVPZmZlciBlcnJvciBvY2N1cnJlZFwiLCBtZXNzYWdlIDogXCJjcmVhdGVPZmZlciBlcnJvciBvY2N1cnJlZFwiLCBlcnJvciA6IGVycm9yfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uLm9uYWRkc3RyZWFtID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwic3RyZWFtIHJlY2VpdmVkLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHN0cmVhbSByZWNlaXZlZC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsb3N0UGFja2V0c0FyciA9IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsb3RMZW5ndGggPSA4LCAvLzggc3RhdGlzdGljcy4gZXZlcnkgMiBzZWNvbmRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldlBhY2tldHNMb3N0ID0gMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdmc4TG9zc2VzID0gMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdmdNb3JlVGhhblRocmVzaG9sZENvdW50ID0gMCwgIC8vSWYgYXZnOExvc3MgbW9yZSB0aGFuIHRocmVzaG9sZC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJlc2hvbGQgPSAyMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGV4dHJhY3RMb3NzUGFja2V0c09uTmV0d29ya1N0YXR1cyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGlzdGljc1RpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZighcGVlckNvbm5lY3Rpb24pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uLmdldFN0YXRzKCkudGhlbihmdW5jdGlvbihzdGF0cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhzdGF0cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0cy5mb3JFYWNoKGZ1bmN0aW9uKHN0YXRlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHN0YXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihzdGF0ZS50eXBlID09PSBcImluYm91bmQtcnRwXCIgJiYgIXN0YXRlLmlzUmVtb3RlICl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhzdGF0ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyhzdGF0ZS5wYWNrZXRzTG9zdCAtIHByZXZQYWNrZXRzTG9zdCkgaXMgcmVhbCBjdXJyZW50IGxvc3QuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvc3RQYWNrZXRzQXJyLnB1c2gocGFyc2VJbnQoc3RhdGUucGFja2V0c0xvc3QpLXBhcnNlSW50KHByZXZQYWNrZXRzTG9zdCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYobG9zdFBhY2tldHNBcnIubGVuZ3RoID4gc2xvdExlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb3N0UGFja2V0c0FyciA9IGxvc3RQYWNrZXRzQXJyLnNsaWNlKGxvc3RQYWNrZXRzQXJyLmxlbmd0aCAtIHNsb3RMZW5ndGgsIGxvc3RQYWNrZXRzQXJyLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdmc4TG9zc2VzID0gXy5yZWR1Y2UobG9zdFBhY2tldHNBcnIsIGZ1bmN0aW9uKG1lbW8sIG51bSl7IHJldHVybiBtZW1vICsgbnVtOyB9LCAwKSAvIHNsb3RMZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJMYXN0OCBMT1NUIFBBQ0tFVCBBVkcgIDogXCIrIChhdmc4TG9zc2VzKSwgc3RhdGUucGFja2V0c0xvc3QgLCBsb3N0UGFja2V0c0Fycik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihhdmc4TG9zc2VzID4gdGhyZXNob2xkKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdmdNb3JlVGhhblRocmVzaG9sZENvdW50ICsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGF2Z01vcmVUaGFuVGhyZXNob2xkQ291bnQgPT09IDMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJORVRXT1JLIFVOU1RBQkxFRCEhISBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChzdGF0aXN0aWNzVGltZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlci50cmlnZ2VyKE5FVFdPUktfVU5TVEFCTEVEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdmdNb3JlVGhhblRocmVzaG9sZENvdW50ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZQYWNrZXRzTG9zdCA9IHN0YXRlLnBhY2tldHNMb3N0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXh0cmFjdExvc3NQYWNrZXRzT25OZXR3b3JrU3RhdHVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDIwMDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHRyYWN0TG9zc1BhY2tldHNPbk5ldHdvcmtTdGF0dXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZS5zdHJlYW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYobWVzc2FnZS5zZHApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9TZXQgcmVtb3RlIGRlc2NyaXB0aW9uIHdoZW4gSSByZWNlaXZlZCBzZHAgZnJvbSBzZXJ2ZXIuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uLnNldFJlbW90ZURlc2NyaXB0aW9uKG5ldyBSVENTZXNzaW9uRGVzY3JpcHRpb24obWVzc2FnZS5zZHApKS50aGVuKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihwZWVyQ29ubmVjdGlvbi5yZW1vdGVEZXNjcmlwdGlvbi50eXBlID09PSAnb2ZmZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyBjcmVhdGVzIGFuc3dlciB3aGVuIEkgcmVjZWl2ZWQgb2ZmZXIgZnJvbSBwdWJsaXNoZXIuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24uY3JlYXRlQW5zd2VyKCkudGhlbihmdW5jdGlvbihkZXNjKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiY3JlYXRlQW5zd2VyIDogc3VjY2Vzc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Mb2NhbERlc2NyaXB0aW9uKG1lc3NhZ2UuaWQsIHBlZXJDb25uZWN0aW9uLCBkZXNjKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcih7Y29kZSA6IFBMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUiwgcmVhc29uIDogXCJjcmVhdGVBbnN3ZXIgZXJyb3Igb2NjdXJyZWRcIiwgbWVzc2FnZSA6IFwiY3JlYXRlQW5zd2VyIGVycm9yIG9jY3VycmVkXCIsIGVycm9yIDogZXJyb3J9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHtjb2RlIDogUExBWUVSX1dFQlJUQ19TRVRfUkVNT1RFX0RFU0NfRVJST1IsIHJlYXNvbiA6IFwic2V0UmVtb3RlRGVzY3JpcHRpb24gZXJyb3Igb2NjdXJyZWRcIiwgbWVzc2FnZSA6IFwic2V0UmVtb3RlRGVzY3JpcHRpb24gZXJyb3Igb2NjdXJyZWRcIiwgZXJyb3IgOiBlcnJvcn0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKG1lc3NhZ2UuY2FuZGlkYXRlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIHJlY2VpdmVzIElDRSBDYW5kaWRhdGUgZnJvbSBzZXJ2ZXIuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBtZXNzYWdlLmNhbmRpZGF0ZXMubGVuZ3RoOyBpICsrICl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihtZXNzYWdlLmNhbmRpZGF0ZXNbaV0gJiYgbWVzc2FnZS5jYW5kaWRhdGVzW2ldLmNhbmRpZGF0ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbi5hZGRJY2VDYW5kaWRhdGUobmV3IFJUQ0ljZUNhbmRpZGF0ZShtZXNzYWdlLmNhbmRpZGF0ZXNbaV0pKS50aGVuKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcImFkZEljZUNhbmRpZGF0ZSA6IHN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZVBlZXIoe2NvZGUgOiBQTEFZRVJfV0VCUlRDX0FERF9JQ0VDQU5ESURBVEVfRVJST1IsIHJlYXNvbiA6IFwiYWRkSWNlQ2FuZGlkYXRlIGVycm9yIG9jY3VycmVkXCIsIG1lc3NhZ2UgOiBcImFkZEljZUNhbmRpZGF0ZSBlcnJvciBvY2N1cnJlZFwiLCBlcnJvciA6IGVycm9yfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHdzLm9uZXJyb3IgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHtjb2RlIDogUExBWUVSX1dFQlJUQ19XU19FUlJPUiwgcmVhc29uIDogXCJ3ZWJzb2NrZXQgZXJyb3Igb2NjdXJlZFwiLCBtZXNzYWdlIDogXCJ3ZWJzb2NrZXQgZXJyb3Igb2NjdXJyZWRcIiwgZXJyb3IgOiBlfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfWNhdGNoKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIGNsb3NlUGVlcih7Y29kZSA6IFBMQVlFUl9XRUJSVENfV1NfRVJST1IsIHJlYXNvbiA6IFwid2Vic29ja2V0IGVycm9yIG9jY3VyZWRcIiwgbWVzc2FnZSA6IFwid2Vic29ja2V0IGVycm9yIG9jY3VycmVkXCIsIGVycm9yIDogZXJyb3J9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlUGVlcihlcnJvcikge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZygnV2ViUlRDIExvYWRlciBjbG9zZVBlZWFyKCknKTtcclxuICAgICAgICBpZighIXdzKSB7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZygnQ2xvc2luZyB3ZWJzb2NrZXQgY29ubmVjdGlvbi4uLicpO1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJTZW5kIFNpZ25hbGluZyA6IFN0b3AuXCIpO1xyXG4gICAgICAgICAgICB3cy5zZW5kKEpTT04uc3RyaW5naWZ5KHtjb21tYW5kIDogXCJzdG9wXCJ9KSk7XHJcbiAgICAgICAgICAgIHdzLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIHdzID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYocGVlckNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKCdDbG9zaW5nIHBlZXIgY29ubmVjdGlvbi4uLicpO1xyXG4gICAgICAgICAgICBpZihzdGF0aXN0aWNzVGltZXIpe2NsZWFyVGltZW91dChzdGF0aXN0aWNzVGltZXIpO31cclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24uY2xvc2UoKTtcclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24gPSBudWxsO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgICAgICBlcnJvckNhbGxiYWNrKGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHRoYXQuY29ubmVjdCA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gaW5pdGlhbGl6ZSgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+IHtcclxuICAgICAgICBjbG9zZVBlZXIoKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFdlYlJUQ0xvYWRlcjtcclxuIiwiKGZ1bmN0aW9uKGYpe2lmKHR5cGVvZiBleHBvcnRzPT09XCJvYmplY3RcIiYmdHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCIpe21vZHVsZS5leHBvcnRzPWYoKX1lbHNlIGlmKHR5cGVvZiBkZWZpbmU9PT1cImZ1bmN0aW9uXCImJmRlZmluZS5hbWQpe2RlZmluZShbXSxmKX1lbHNle3ZhciBnO2lmKHR5cGVvZiB3aW5kb3chPT1cInVuZGVmaW5lZFwiKXtnPXdpbmRvd31lbHNlIGlmKHR5cGVvZiBnbG9iYWwhPT1cInVuZGVmaW5lZFwiKXtnPWdsb2JhbH1lbHNlIGlmKHR5cGVvZiBzZWxmIT09XCJ1bmRlZmluZWRcIil7Zz1zZWxmfWVsc2V7Zz10aGlzfWcuYWRhcHRlciA9IGYoKX19KShmdW5jdGlvbigpe3ZhciBkZWZpbmUsbW9kdWxlLGV4cG9ydHM7cmV0dXJuIChmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8qXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE3IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXG4gKiAgdHJlZS5cbiAqL1xuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgU0RQVXRpbHMgPSByZXF1aXJlKCdzZHAnKTtcblxuZnVuY3Rpb24gd3JpdGVNZWRpYVNlY3Rpb24odHJhbnNjZWl2ZXIsIGNhcHMsIHR5cGUsIHN0cmVhbSwgZHRsc1JvbGUpIHtcbiAgdmFyIHNkcCA9IFNEUFV0aWxzLndyaXRlUnRwRGVzY3JpcHRpb24odHJhbnNjZWl2ZXIua2luZCwgY2Fwcyk7XG5cbiAgLy8gTWFwIElDRSBwYXJhbWV0ZXJzICh1ZnJhZywgcHdkKSB0byBTRFAuXG4gIHNkcCArPSBTRFBVdGlscy53cml0ZUljZVBhcmFtZXRlcnMoXG4gICAgICB0cmFuc2NlaXZlci5pY2VHYXRoZXJlci5nZXRMb2NhbFBhcmFtZXRlcnMoKSk7XG5cbiAgLy8gTWFwIERUTFMgcGFyYW1ldGVycyB0byBTRFAuXG4gIHNkcCArPSBTRFBVdGlscy53cml0ZUR0bHNQYXJhbWV0ZXJzKFxuICAgICAgdHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydC5nZXRMb2NhbFBhcmFtZXRlcnMoKSxcbiAgICAgIHR5cGUgPT09ICdvZmZlcicgPyAnYWN0cGFzcycgOiBkdGxzUm9sZSB8fCAnYWN0aXZlJyk7XG5cbiAgc2RwICs9ICdhPW1pZDonICsgdHJhbnNjZWl2ZXIubWlkICsgJ1xcclxcbic7XG5cbiAgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlciAmJiB0cmFuc2NlaXZlci5ydHBSZWNlaXZlcikge1xuICAgIHNkcCArPSAnYT1zZW5kcmVjdlxcclxcbic7XG4gIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIucnRwU2VuZGVyKSB7XG4gICAgc2RwICs9ICdhPXNlbmRvbmx5XFxyXFxuJztcbiAgfSBlbHNlIGlmICh0cmFuc2NlaXZlci5ydHBSZWNlaXZlcikge1xuICAgIHNkcCArPSAnYT1yZWN2b25seVxcclxcbic7XG4gIH0gZWxzZSB7XG4gICAgc2RwICs9ICdhPWluYWN0aXZlXFxyXFxuJztcbiAgfVxuXG4gIGlmICh0cmFuc2NlaXZlci5ydHBTZW5kZXIpIHtcbiAgICB2YXIgdHJhY2tJZCA9IHRyYW5zY2VpdmVyLnJ0cFNlbmRlci5faW5pdGlhbFRyYWNrSWQgfHxcbiAgICAgICAgdHJhbnNjZWl2ZXIucnRwU2VuZGVyLnRyYWNrLmlkO1xuICAgIHRyYW5zY2VpdmVyLnJ0cFNlbmRlci5faW5pdGlhbFRyYWNrSWQgPSB0cmFja0lkO1xuICAgIC8vIHNwZWMuXG4gICAgdmFyIG1zaWQgPSAnbXNpZDonICsgKHN0cmVhbSA/IHN0cmVhbS5pZCA6ICctJykgKyAnICcgK1xuICAgICAgICB0cmFja0lkICsgJ1xcclxcbic7XG4gICAgc2RwICs9ICdhPScgKyBtc2lkO1xuICAgIC8vIGZvciBDaHJvbWUuIExlZ2FjeSBzaG91bGQgbm8gbG9uZ2VyIGJlIHJlcXVpcmVkLlxuICAgIHNkcCArPSAnYT1zc3JjOicgKyB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmMgK1xuICAgICAgICAnICcgKyBtc2lkO1xuXG4gICAgLy8gUlRYXG4gICAgaWYgKHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4KSB7XG4gICAgICBzZHAgKz0gJ2E9c3NyYzonICsgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHguc3NyYyArXG4gICAgICAgICAgJyAnICsgbXNpZDtcbiAgICAgIHNkcCArPSAnYT1zc3JjLWdyb3VwOkZJRCAnICtcbiAgICAgICAgICB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmMgKyAnICcgK1xuICAgICAgICAgIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4LnNzcmMgK1xuICAgICAgICAgICdcXHJcXG4nO1xuICAgIH1cbiAgfVxuICAvLyBGSVhNRTogdGhpcyBzaG91bGQgYmUgd3JpdHRlbiBieSB3cml0ZVJ0cERlc2NyaXB0aW9uLlxuICBzZHAgKz0gJ2E9c3NyYzonICsgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjICtcbiAgICAgICcgY25hbWU6JyArIFNEUFV0aWxzLmxvY2FsQ05hbWUgKyAnXFxyXFxuJztcbiAgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlciAmJiB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCkge1xuICAgIHNkcCArPSAnYT1zc3JjOicgKyB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eC5zc3JjICtcbiAgICAgICAgJyBjbmFtZTonICsgU0RQVXRpbHMubG9jYWxDTmFtZSArICdcXHJcXG4nO1xuICB9XG4gIHJldHVybiBzZHA7XG59XG5cbi8vIEVkZ2UgZG9lcyBub3QgbGlrZVxuLy8gMSkgc3R1bjogZmlsdGVyZWQgYWZ0ZXIgMTQzOTMgdW5sZXNzID90cmFuc3BvcnQ9dWRwIGlzIHByZXNlbnRcbi8vIDIpIHR1cm46IHRoYXQgZG9lcyBub3QgaGF2ZSBhbGwgb2YgdHVybjpob3N0OnBvcnQ/dHJhbnNwb3J0PXVkcFxuLy8gMykgdHVybjogd2l0aCBpcHY2IGFkZHJlc3Nlc1xuLy8gNCkgdHVybjogb2NjdXJyaW5nIG11bGlwbGUgdGltZXNcbmZ1bmN0aW9uIGZpbHRlckljZVNlcnZlcnMoaWNlU2VydmVycywgZWRnZVZlcnNpb24pIHtcbiAgdmFyIGhhc1R1cm4gPSBmYWxzZTtcbiAgaWNlU2VydmVycyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoaWNlU2VydmVycykpO1xuICByZXR1cm4gaWNlU2VydmVycy5maWx0ZXIoZnVuY3Rpb24oc2VydmVyKSB7XG4gICAgaWYgKHNlcnZlciAmJiAoc2VydmVyLnVybHMgfHwgc2VydmVyLnVybCkpIHtcbiAgICAgIHZhciB1cmxzID0gc2VydmVyLnVybHMgfHwgc2VydmVyLnVybDtcbiAgICAgIGlmIChzZXJ2ZXIudXJsICYmICFzZXJ2ZXIudXJscykge1xuICAgICAgICBjb25zb2xlLndhcm4oJ1JUQ0ljZVNlcnZlci51cmwgaXMgZGVwcmVjYXRlZCEgVXNlIHVybHMgaW5zdGVhZC4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBpc1N0cmluZyA9IHR5cGVvZiB1cmxzID09PSAnc3RyaW5nJztcbiAgICAgIGlmIChpc1N0cmluZykge1xuICAgICAgICB1cmxzID0gW3VybHNdO1xuICAgICAgfVxuICAgICAgdXJscyA9IHVybHMuZmlsdGVyKGZ1bmN0aW9uKHVybCkge1xuICAgICAgICB2YXIgdmFsaWRUdXJuID0gdXJsLmluZGV4T2YoJ3R1cm46JykgPT09IDAgJiZcbiAgICAgICAgICAgIHVybC5pbmRleE9mKCd0cmFuc3BvcnQ9dWRwJykgIT09IC0xICYmXG4gICAgICAgICAgICB1cmwuaW5kZXhPZigndHVybjpbJykgPT09IC0xICYmXG4gICAgICAgICAgICAhaGFzVHVybjtcblxuICAgICAgICBpZiAodmFsaWRUdXJuKSB7XG4gICAgICAgICAgaGFzVHVybiA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVybC5pbmRleE9mKCdzdHVuOicpID09PSAwICYmIGVkZ2VWZXJzaW9uID49IDE0MzkzICYmXG4gICAgICAgICAgICB1cmwuaW5kZXhPZignP3RyYW5zcG9ydD11ZHAnKSA9PT0gLTE7XG4gICAgICB9KTtcblxuICAgICAgZGVsZXRlIHNlcnZlci51cmw7XG4gICAgICBzZXJ2ZXIudXJscyA9IGlzU3RyaW5nID8gdXJsc1swXSA6IHVybHM7XG4gICAgICByZXR1cm4gISF1cmxzLmxlbmd0aDtcbiAgICB9XG4gIH0pO1xufVxuXG4vLyBEZXRlcm1pbmVzIHRoZSBpbnRlcnNlY3Rpb24gb2YgbG9jYWwgYW5kIHJlbW90ZSBjYXBhYmlsaXRpZXMuXG5mdW5jdGlvbiBnZXRDb21tb25DYXBhYmlsaXRpZXMobG9jYWxDYXBhYmlsaXRpZXMsIHJlbW90ZUNhcGFiaWxpdGllcykge1xuICB2YXIgY29tbW9uQ2FwYWJpbGl0aWVzID0ge1xuICAgIGNvZGVjczogW10sXG4gICAgaGVhZGVyRXh0ZW5zaW9uczogW10sXG4gICAgZmVjTWVjaGFuaXNtczogW11cbiAgfTtcblxuICB2YXIgZmluZENvZGVjQnlQYXlsb2FkVHlwZSA9IGZ1bmN0aW9uKHB0LCBjb2RlY3MpIHtcbiAgICBwdCA9IHBhcnNlSW50KHB0LCAxMCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb2RlY3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChjb2RlY3NbaV0ucGF5bG9hZFR5cGUgPT09IHB0IHx8XG4gICAgICAgICAgY29kZWNzW2ldLnByZWZlcnJlZFBheWxvYWRUeXBlID09PSBwdCkge1xuICAgICAgICByZXR1cm4gY29kZWNzW2ldO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB2YXIgcnR4Q2FwYWJpbGl0eU1hdGNoZXMgPSBmdW5jdGlvbihsUnR4LCByUnR4LCBsQ29kZWNzLCByQ29kZWNzKSB7XG4gICAgdmFyIGxDb2RlYyA9IGZpbmRDb2RlY0J5UGF5bG9hZFR5cGUobFJ0eC5wYXJhbWV0ZXJzLmFwdCwgbENvZGVjcyk7XG4gICAgdmFyIHJDb2RlYyA9IGZpbmRDb2RlY0J5UGF5bG9hZFR5cGUoclJ0eC5wYXJhbWV0ZXJzLmFwdCwgckNvZGVjcyk7XG4gICAgcmV0dXJuIGxDb2RlYyAmJiByQ29kZWMgJiZcbiAgICAgICAgbENvZGVjLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gckNvZGVjLm5hbWUudG9Mb3dlckNhc2UoKTtcbiAgfTtcblxuICBsb2NhbENhcGFiaWxpdGllcy5jb2RlY3MuZm9yRWFjaChmdW5jdGlvbihsQ29kZWMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlbW90ZUNhcGFiaWxpdGllcy5jb2RlY3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciByQ29kZWMgPSByZW1vdGVDYXBhYmlsaXRpZXMuY29kZWNzW2ldO1xuICAgICAgaWYgKGxDb2RlYy5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IHJDb2RlYy5uYW1lLnRvTG93ZXJDYXNlKCkgJiZcbiAgICAgICAgICBsQ29kZWMuY2xvY2tSYXRlID09PSByQ29kZWMuY2xvY2tSYXRlKSB7XG4gICAgICAgIGlmIChsQ29kZWMubmFtZS50b0xvd2VyQ2FzZSgpID09PSAncnR4JyAmJlxuICAgICAgICAgICAgbENvZGVjLnBhcmFtZXRlcnMgJiYgckNvZGVjLnBhcmFtZXRlcnMuYXB0KSB7XG4gICAgICAgICAgLy8gZm9yIFJUWCB3ZSBuZWVkIHRvIGZpbmQgdGhlIGxvY2FsIHJ0eCB0aGF0IGhhcyBhIGFwdFxuICAgICAgICAgIC8vIHdoaWNoIHBvaW50cyB0byB0aGUgc2FtZSBsb2NhbCBjb2RlYyBhcyB0aGUgcmVtb3RlIG9uZS5cbiAgICAgICAgICBpZiAoIXJ0eENhcGFiaWxpdHlNYXRjaGVzKGxDb2RlYywgckNvZGVjLFxuICAgICAgICAgICAgICBsb2NhbENhcGFiaWxpdGllcy5jb2RlY3MsIHJlbW90ZUNhcGFiaWxpdGllcy5jb2RlY3MpKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgckNvZGVjID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShyQ29kZWMpKTsgLy8gZGVlcGNvcHlcbiAgICAgICAgLy8gbnVtYmVyIG9mIGNoYW5uZWxzIGlzIHRoZSBoaWdoZXN0IGNvbW1vbiBudW1iZXIgb2YgY2hhbm5lbHNcbiAgICAgICAgckNvZGVjLm51bUNoYW5uZWxzID0gTWF0aC5taW4obENvZGVjLm51bUNoYW5uZWxzLFxuICAgICAgICAgICAgckNvZGVjLm51bUNoYW5uZWxzKTtcbiAgICAgICAgLy8gcHVzaCByQ29kZWMgc28gd2UgcmVwbHkgd2l0aCBvZmZlcmVyIHBheWxvYWQgdHlwZVxuICAgICAgICBjb21tb25DYXBhYmlsaXRpZXMuY29kZWNzLnB1c2gockNvZGVjKTtcblxuICAgICAgICAvLyBkZXRlcm1pbmUgY29tbW9uIGZlZWRiYWNrIG1lY2hhbmlzbXNcbiAgICAgICAgckNvZGVjLnJ0Y3BGZWVkYmFjayA9IHJDb2RlYy5ydGNwRmVlZGJhY2suZmlsdGVyKGZ1bmN0aW9uKGZiKSB7XG4gICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBsQ29kZWMucnRjcEZlZWRiYWNrLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAobENvZGVjLnJ0Y3BGZWVkYmFja1tqXS50eXBlID09PSBmYi50eXBlICYmXG4gICAgICAgICAgICAgICAgbENvZGVjLnJ0Y3BGZWVkYmFja1tqXS5wYXJhbWV0ZXIgPT09IGZiLnBhcmFtZXRlcikge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gRklYTUU6IGFsc28gbmVlZCB0byBkZXRlcm1pbmUgLnBhcmFtZXRlcnNcbiAgICAgICAgLy8gIHNlZSBodHRwczovL2dpdGh1Yi5jb20vb3BlbnBlZXIvb3J0Yy9pc3N1ZXMvNTY5XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgbG9jYWxDYXBhYmlsaXRpZXMuaGVhZGVyRXh0ZW5zaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGxIZWFkZXJFeHRlbnNpb24pIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlbW90ZUNhcGFiaWxpdGllcy5oZWFkZXJFeHRlbnNpb25zLmxlbmd0aDtcbiAgICAgICAgIGkrKykge1xuICAgICAgdmFyIHJIZWFkZXJFeHRlbnNpb24gPSByZW1vdGVDYXBhYmlsaXRpZXMuaGVhZGVyRXh0ZW5zaW9uc1tpXTtcbiAgICAgIGlmIChsSGVhZGVyRXh0ZW5zaW9uLnVyaSA9PT0gckhlYWRlckV4dGVuc2lvbi51cmkpIHtcbiAgICAgICAgY29tbW9uQ2FwYWJpbGl0aWVzLmhlYWRlckV4dGVuc2lvbnMucHVzaChySGVhZGVyRXh0ZW5zaW9uKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICAvLyBGSVhNRTogZmVjTWVjaGFuaXNtc1xuICByZXR1cm4gY29tbW9uQ2FwYWJpbGl0aWVzO1xufVxuXG4vLyBpcyBhY3Rpb249c2V0TG9jYWxEZXNjcmlwdGlvbiB3aXRoIHR5cGUgYWxsb3dlZCBpbiBzaWduYWxpbmdTdGF0ZVxuZnVuY3Rpb24gaXNBY3Rpb25BbGxvd2VkSW5TaWduYWxpbmdTdGF0ZShhY3Rpb24sIHR5cGUsIHNpZ25hbGluZ1N0YXRlKSB7XG4gIHJldHVybiB7XG4gICAgb2ZmZXI6IHtcbiAgICAgIHNldExvY2FsRGVzY3JpcHRpb246IFsnc3RhYmxlJywgJ2hhdmUtbG9jYWwtb2ZmZXInXSxcbiAgICAgIHNldFJlbW90ZURlc2NyaXB0aW9uOiBbJ3N0YWJsZScsICdoYXZlLXJlbW90ZS1vZmZlciddXG4gICAgfSxcbiAgICBhbnN3ZXI6IHtcbiAgICAgIHNldExvY2FsRGVzY3JpcHRpb246IFsnaGF2ZS1yZW1vdGUtb2ZmZXInLCAnaGF2ZS1sb2NhbC1wcmFuc3dlciddLFxuICAgICAgc2V0UmVtb3RlRGVzY3JpcHRpb246IFsnaGF2ZS1sb2NhbC1vZmZlcicsICdoYXZlLXJlbW90ZS1wcmFuc3dlciddXG4gICAgfVxuICB9W3R5cGVdW2FjdGlvbl0uaW5kZXhPZihzaWduYWxpbmdTdGF0ZSkgIT09IC0xO1xufVxuXG5mdW5jdGlvbiBtYXliZUFkZENhbmRpZGF0ZShpY2VUcmFuc3BvcnQsIGNhbmRpZGF0ZSkge1xuICAvLyBFZGdlJ3MgaW50ZXJuYWwgcmVwcmVzZW50YXRpb24gYWRkcyBzb21lIGZpZWxkcyB0aGVyZWZvcmVcbiAgLy8gbm90IGFsbCBmaWVsZNGVIGFyZSB0YWtlbiBpbnRvIGFjY291bnQuXG4gIHZhciBhbHJlYWR5QWRkZWQgPSBpY2VUcmFuc3BvcnQuZ2V0UmVtb3RlQ2FuZGlkYXRlcygpXG4gICAgICAuZmluZChmdW5jdGlvbihyZW1vdGVDYW5kaWRhdGUpIHtcbiAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZS5mb3VuZGF0aW9uID09PSByZW1vdGVDYW5kaWRhdGUuZm91bmRhdGlvbiAmJlxuICAgICAgICAgICAgY2FuZGlkYXRlLmlwID09PSByZW1vdGVDYW5kaWRhdGUuaXAgJiZcbiAgICAgICAgICAgIGNhbmRpZGF0ZS5wb3J0ID09PSByZW1vdGVDYW5kaWRhdGUucG9ydCAmJlxuICAgICAgICAgICAgY2FuZGlkYXRlLnByaW9yaXR5ID09PSByZW1vdGVDYW5kaWRhdGUucHJpb3JpdHkgJiZcbiAgICAgICAgICAgIGNhbmRpZGF0ZS5wcm90b2NvbCA9PT0gcmVtb3RlQ2FuZGlkYXRlLnByb3RvY29sICYmXG4gICAgICAgICAgICBjYW5kaWRhdGUudHlwZSA9PT0gcmVtb3RlQ2FuZGlkYXRlLnR5cGU7XG4gICAgICB9KTtcbiAgaWYgKCFhbHJlYWR5QWRkZWQpIHtcbiAgICBpY2VUcmFuc3BvcnQuYWRkUmVtb3RlQ2FuZGlkYXRlKGNhbmRpZGF0ZSk7XG4gIH1cbiAgcmV0dXJuICFhbHJlYWR5QWRkZWQ7XG59XG5cblxuZnVuY3Rpb24gbWFrZUVycm9yKG5hbWUsIGRlc2NyaXB0aW9uKSB7XG4gIHZhciBlID0gbmV3IEVycm9yKGRlc2NyaXB0aW9uKTtcbiAgZS5uYW1lID0gbmFtZTtcbiAgLy8gbGVnYWN5IGVycm9yIGNvZGVzIGZyb20gaHR0cHM6Ly9oZXljYW0uZ2l0aHViLmlvL3dlYmlkbC8jaWRsLURPTUV4Y2VwdGlvbi1lcnJvci1uYW1lc1xuICBlLmNvZGUgPSB7XG4gICAgTm90U3VwcG9ydGVkRXJyb3I6IDksXG4gICAgSW52YWxpZFN0YXRlRXJyb3I6IDExLFxuICAgIEludmFsaWRBY2Nlc3NFcnJvcjogMTUsXG4gICAgVHlwZUVycm9yOiB1bmRlZmluZWQsXG4gICAgT3BlcmF0aW9uRXJyb3I6IHVuZGVmaW5lZFxuICB9W25hbWVdO1xuICByZXR1cm4gZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih3aW5kb3csIGVkZ2VWZXJzaW9uKSB7XG4gIC8vIGh0dHBzOi8vdzNjLmdpdGh1Yi5pby9tZWRpYWNhcHR1cmUtbWFpbi8jbWVkaWFzdHJlYW1cbiAgLy8gSGVscGVyIGZ1bmN0aW9uIHRvIGFkZCB0aGUgdHJhY2sgdG8gdGhlIHN0cmVhbSBhbmRcbiAgLy8gZGlzcGF0Y2ggdGhlIGV2ZW50IG91cnNlbHZlcy5cbiAgZnVuY3Rpb24gYWRkVHJhY2tUb1N0cmVhbUFuZEZpcmVFdmVudCh0cmFjaywgc3RyZWFtKSB7XG4gICAgc3RyZWFtLmFkZFRyYWNrKHRyYWNrKTtcbiAgICBzdHJlYW0uZGlzcGF0Y2hFdmVudChuZXcgd2luZG93Lk1lZGlhU3RyZWFtVHJhY2tFdmVudCgnYWRkdHJhY2snLFxuICAgICAgICB7dHJhY2s6IHRyYWNrfSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlVHJhY2tGcm9tU3RyZWFtQW5kRmlyZUV2ZW50KHRyYWNrLCBzdHJlYW0pIHtcbiAgICBzdHJlYW0ucmVtb3ZlVHJhY2sodHJhY2spO1xuICAgIHN0cmVhbS5kaXNwYXRjaEV2ZW50KG5ldyB3aW5kb3cuTWVkaWFTdHJlYW1UcmFja0V2ZW50KCdyZW1vdmV0cmFjaycsXG4gICAgICAgIHt0cmFjazogdHJhY2t9KSk7XG4gIH1cblxuICBmdW5jdGlvbiBmaXJlQWRkVHJhY2socGMsIHRyYWNrLCByZWNlaXZlciwgc3RyZWFtcykge1xuICAgIHZhciB0cmFja0V2ZW50ID0gbmV3IEV2ZW50KCd0cmFjaycpO1xuICAgIHRyYWNrRXZlbnQudHJhY2sgPSB0cmFjaztcbiAgICB0cmFja0V2ZW50LnJlY2VpdmVyID0gcmVjZWl2ZXI7XG4gICAgdHJhY2tFdmVudC50cmFuc2NlaXZlciA9IHtyZWNlaXZlcjogcmVjZWl2ZXJ9O1xuICAgIHRyYWNrRXZlbnQuc3RyZWFtcyA9IHN0cmVhbXM7XG4gICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBwYy5fZGlzcGF0Y2hFdmVudCgndHJhY2snLCB0cmFja0V2ZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBSVENQZWVyQ29ubmVjdGlvbiA9IGZ1bmN0aW9uKGNvbmZpZykge1xuICAgIHZhciBwYyA9IHRoaXM7XG5cbiAgICB2YXIgX2V2ZW50VGFyZ2V0ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIFsnYWRkRXZlbnRMaXN0ZW5lcicsICdyZW1vdmVFdmVudExpc3RlbmVyJywgJ2Rpc3BhdGNoRXZlbnQnXVxuICAgICAgICAuZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgICAgICBwY1ttZXRob2RdID0gX2V2ZW50VGFyZ2V0W21ldGhvZF0uYmluZChfZXZlbnRUYXJnZXQpO1xuICAgICAgICB9KTtcblxuICAgIHRoaXMuY2FuVHJpY2tsZUljZUNhbmRpZGF0ZXMgPSBudWxsO1xuXG4gICAgdGhpcy5uZWVkTmVnb3RpYXRpb24gPSBmYWxzZTtcblxuICAgIHRoaXMubG9jYWxTdHJlYW1zID0gW107XG4gICAgdGhpcy5yZW1vdGVTdHJlYW1zID0gW107XG5cbiAgICB0aGlzLmxvY2FsRGVzY3JpcHRpb24gPSBudWxsO1xuICAgIHRoaXMucmVtb3RlRGVzY3JpcHRpb24gPSBudWxsO1xuXG4gICAgdGhpcy5zaWduYWxpbmdTdGF0ZSA9ICdzdGFibGUnO1xuICAgIHRoaXMuaWNlQ29ubmVjdGlvblN0YXRlID0gJ25ldyc7XG4gICAgdGhpcy5jb25uZWN0aW9uU3RhdGUgPSAnbmV3JztcbiAgICB0aGlzLmljZUdhdGhlcmluZ1N0YXRlID0gJ25ldyc7XG5cbiAgICBjb25maWcgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGNvbmZpZyB8fCB7fSkpO1xuXG4gICAgdGhpcy51c2luZ0J1bmRsZSA9IGNvbmZpZy5idW5kbGVQb2xpY3kgPT09ICdtYXgtYnVuZGxlJztcbiAgICBpZiAoY29uZmlnLnJ0Y3BNdXhQb2xpY3kgPT09ICduZWdvdGlhdGUnKSB7XG4gICAgICB0aHJvdyhtYWtlRXJyb3IoJ05vdFN1cHBvcnRlZEVycm9yJyxcbiAgICAgICAgICAncnRjcE11eFBvbGljeSBcXCduZWdvdGlhdGVcXCcgaXMgbm90IHN1cHBvcnRlZCcpKTtcbiAgICB9IGVsc2UgaWYgKCFjb25maWcucnRjcE11eFBvbGljeSkge1xuICAgICAgY29uZmlnLnJ0Y3BNdXhQb2xpY3kgPSAncmVxdWlyZSc7XG4gICAgfVxuXG4gICAgc3dpdGNoIChjb25maWcuaWNlVHJhbnNwb3J0UG9saWN5KSB7XG4gICAgICBjYXNlICdhbGwnOlxuICAgICAgY2FzZSAncmVsYXknOlxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbmZpZy5pY2VUcmFuc3BvcnRQb2xpY3kgPSAnYWxsJztcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgc3dpdGNoIChjb25maWcuYnVuZGxlUG9saWN5KSB7XG4gICAgICBjYXNlICdiYWxhbmNlZCc6XG4gICAgICBjYXNlICdtYXgtY29tcGF0JzpcbiAgICAgIGNhc2UgJ21heC1idW5kbGUnOlxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbmZpZy5idW5kbGVQb2xpY3kgPSAnYmFsYW5jZWQnO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjb25maWcuaWNlU2VydmVycyA9IGZpbHRlckljZVNlcnZlcnMoY29uZmlnLmljZVNlcnZlcnMgfHwgW10sIGVkZ2VWZXJzaW9uKTtcblxuICAgIHRoaXMuX2ljZUdhdGhlcmVycyA9IFtdO1xuICAgIGlmIChjb25maWcuaWNlQ2FuZGlkYXRlUG9vbFNpemUpIHtcbiAgICAgIGZvciAodmFyIGkgPSBjb25maWcuaWNlQ2FuZGlkYXRlUG9vbFNpemU7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgdGhpcy5faWNlR2F0aGVyZXJzLnB1c2gobmV3IHdpbmRvdy5SVENJY2VHYXRoZXJlcih7XG4gICAgICAgICAgaWNlU2VydmVyczogY29uZmlnLmljZVNlcnZlcnMsXG4gICAgICAgICAgZ2F0aGVyUG9saWN5OiBjb25maWcuaWNlVHJhbnNwb3J0UG9saWN5XG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uZmlnLmljZUNhbmRpZGF0ZVBvb2xTaXplID0gMDtcbiAgICB9XG5cbiAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XG5cbiAgICAvLyBwZXItdHJhY2sgaWNlR2F0aGVycywgaWNlVHJhbnNwb3J0cywgZHRsc1RyYW5zcG9ydHMsIHJ0cFNlbmRlcnMsIC4uLlxuICAgIC8vIGV2ZXJ5dGhpbmcgdGhhdCBpcyBuZWVkZWQgdG8gZGVzY3JpYmUgYSBTRFAgbS1saW5lLlxuICAgIHRoaXMudHJhbnNjZWl2ZXJzID0gW107XG5cbiAgICB0aGlzLl9zZHBTZXNzaW9uSWQgPSBTRFBVdGlscy5nZW5lcmF0ZVNlc3Npb25JZCgpO1xuICAgIHRoaXMuX3NkcFNlc3Npb25WZXJzaW9uID0gMDtcblxuICAgIHRoaXMuX2R0bHNSb2xlID0gdW5kZWZpbmVkOyAvLyByb2xlIGZvciBhPXNldHVwIHRvIHVzZSBpbiBhbnN3ZXJzLlxuXG4gICAgdGhpcy5faXNDbG9zZWQgPSBmYWxzZTtcbiAgfTtcblxuICAvLyBzZXQgdXAgZXZlbnQgaGFuZGxlcnMgb24gcHJvdG90eXBlXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5vbmljZWNhbmRpZGF0ZSA9IG51bGw7XG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5vbmFkZHN0cmVhbSA9IG51bGw7XG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5vbnRyYWNrID0gbnVsbDtcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9ucmVtb3Zlc3RyZWFtID0gbnVsbDtcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9uc2lnbmFsaW5nc3RhdGVjaGFuZ2UgPSBudWxsO1xuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub25pY2Vjb25uZWN0aW9uc3RhdGVjaGFuZ2UgPSBudWxsO1xuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub25jb25uZWN0aW9uc3RhdGVjaGFuZ2UgPSBudWxsO1xuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub25pY2VnYXRoZXJpbmdzdGF0ZWNoYW5nZSA9IG51bGw7XG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5vbm5lZ290aWF0aW9ubmVlZGVkID0gbnVsbDtcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9uZGF0YWNoYW5uZWwgPSBudWxsO1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fZGlzcGF0Y2hFdmVudCA9IGZ1bmN0aW9uKG5hbWUsIGV2ZW50KSB7XG4gICAgaWYgKHRoaXMuX2lzQ2xvc2VkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgaWYgKHR5cGVvZiB0aGlzWydvbicgKyBuYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpc1snb24nICsgbmFtZV0oZXZlbnQpO1xuICAgIH1cbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX2VtaXRHYXRoZXJpbmdTdGF0ZUNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgnaWNlZ2F0aGVyaW5nc3RhdGVjaGFuZ2UnKTtcbiAgICB0aGlzLl9kaXNwYXRjaEV2ZW50KCdpY2VnYXRoZXJpbmdzdGF0ZWNoYW5nZScsIGV2ZW50KTtcbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0Q29uZmlndXJhdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9jb25maWc7XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldExvY2FsU3RyZWFtcyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmxvY2FsU3RyZWFtcztcbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0UmVtb3RlU3RyZWFtcyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnJlbW90ZVN0cmVhbXM7XG4gIH07XG5cbiAgLy8gaW50ZXJuYWwgaGVscGVyIHRvIGNyZWF0ZSBhIHRyYW5zY2VpdmVyIG9iamVjdC5cbiAgLy8gKHdoaWNoIGlzIG5vdCB5ZXQgdGhlIHNhbWUgYXMgdGhlIFdlYlJUQyAxLjAgdHJhbnNjZWl2ZXIpXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fY3JlYXRlVHJhbnNjZWl2ZXIgPSBmdW5jdGlvbihraW5kLCBkb05vdEFkZCkge1xuICAgIHZhciBoYXNCdW5kbGVUcmFuc3BvcnQgPSB0aGlzLnRyYW5zY2VpdmVycy5sZW5ndGggPiAwO1xuICAgIHZhciB0cmFuc2NlaXZlciA9IHtcbiAgICAgIHRyYWNrOiBudWxsLFxuICAgICAgaWNlR2F0aGVyZXI6IG51bGwsXG4gICAgICBpY2VUcmFuc3BvcnQ6IG51bGwsXG4gICAgICBkdGxzVHJhbnNwb3J0OiBudWxsLFxuICAgICAgbG9jYWxDYXBhYmlsaXRpZXM6IG51bGwsXG4gICAgICByZW1vdGVDYXBhYmlsaXRpZXM6IG51bGwsXG4gICAgICBydHBTZW5kZXI6IG51bGwsXG4gICAgICBydHBSZWNlaXZlcjogbnVsbCxcbiAgICAgIGtpbmQ6IGtpbmQsXG4gICAgICBtaWQ6IG51bGwsXG4gICAgICBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzOiBudWxsLFxuICAgICAgcmVjdkVuY29kaW5nUGFyYW1ldGVyczogbnVsbCxcbiAgICAgIHN0cmVhbTogbnVsbCxcbiAgICAgIGFzc29jaWF0ZWRSZW1vdGVNZWRpYVN0cmVhbXM6IFtdLFxuICAgICAgd2FudFJlY2VpdmU6IHRydWVcbiAgICB9O1xuICAgIGlmICh0aGlzLnVzaW5nQnVuZGxlICYmIGhhc0J1bmRsZVRyYW5zcG9ydCkge1xuICAgICAgdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0ID0gdGhpcy50cmFuc2NlaXZlcnNbMF0uaWNlVHJhbnNwb3J0O1xuICAgICAgdHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydCA9IHRoaXMudHJhbnNjZWl2ZXJzWzBdLmR0bHNUcmFuc3BvcnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB0cmFuc3BvcnRzID0gdGhpcy5fY3JlYXRlSWNlQW5kRHRsc1RyYW5zcG9ydHMoKTtcbiAgICAgIHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydCA9IHRyYW5zcG9ydHMuaWNlVHJhbnNwb3J0O1xuICAgICAgdHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydCA9IHRyYW5zcG9ydHMuZHRsc1RyYW5zcG9ydDtcbiAgICB9XG4gICAgaWYgKCFkb05vdEFkZCkge1xuICAgICAgdGhpcy50cmFuc2NlaXZlcnMucHVzaCh0cmFuc2NlaXZlcik7XG4gICAgfVxuICAgIHJldHVybiB0cmFuc2NlaXZlcjtcbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2sgPSBmdW5jdGlvbih0cmFjaywgc3RyZWFtKSB7XG4gICAgaWYgKHRoaXMuX2lzQ2xvc2VkKSB7XG4gICAgICB0aHJvdyBtYWtlRXJyb3IoJ0ludmFsaWRTdGF0ZUVycm9yJyxcbiAgICAgICAgICAnQXR0ZW1wdGVkIHRvIGNhbGwgYWRkVHJhY2sgb24gYSBjbG9zZWQgcGVlcmNvbm5lY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlFeGlzdHMgPSB0aGlzLnRyYW5zY2VpdmVycy5maW5kKGZ1bmN0aW9uKHMpIHtcbiAgICAgIHJldHVybiBzLnRyYWNrID09PSB0cmFjaztcbiAgICB9KTtcblxuICAgIGlmIChhbHJlYWR5RXhpc3RzKSB7XG4gICAgICB0aHJvdyBtYWtlRXJyb3IoJ0ludmFsaWRBY2Nlc3NFcnJvcicsICdUcmFjayBhbHJlYWR5IGV4aXN0cy4nKTtcbiAgICB9XG5cbiAgICB2YXIgdHJhbnNjZWl2ZXI7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnRyYW5zY2VpdmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKCF0aGlzLnRyYW5zY2VpdmVyc1tpXS50cmFjayAmJlxuICAgICAgICAgIHRoaXMudHJhbnNjZWl2ZXJzW2ldLmtpbmQgPT09IHRyYWNrLmtpbmQpIHtcbiAgICAgICAgdHJhbnNjZWl2ZXIgPSB0aGlzLnRyYW5zY2VpdmVyc1tpXTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCF0cmFuc2NlaXZlcikge1xuICAgICAgdHJhbnNjZWl2ZXIgPSB0aGlzLl9jcmVhdGVUcmFuc2NlaXZlcih0cmFjay5raW5kKTtcbiAgICB9XG5cbiAgICB0aGlzLl9tYXliZUZpcmVOZWdvdGlhdGlvbk5lZWRlZCgpO1xuXG4gICAgaWYgKHRoaXMubG9jYWxTdHJlYW1zLmluZGV4T2Yoc3RyZWFtKSA9PT0gLTEpIHtcbiAgICAgIHRoaXMubG9jYWxTdHJlYW1zLnB1c2goc3RyZWFtKTtcbiAgICB9XG5cbiAgICB0cmFuc2NlaXZlci50cmFjayA9IHRyYWNrO1xuICAgIHRyYW5zY2VpdmVyLnN0cmVhbSA9IHN0cmVhbTtcbiAgICB0cmFuc2NlaXZlci5ydHBTZW5kZXIgPSBuZXcgd2luZG93LlJUQ1J0cFNlbmRlcih0cmFjayxcbiAgICAgICAgdHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydCk7XG4gICAgcmV0dXJuIHRyYW5zY2VpdmVyLnJ0cFNlbmRlcjtcbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgdmFyIHBjID0gdGhpcztcbiAgICBpZiAoZWRnZVZlcnNpb24gPj0gMTUwMjUpIHtcbiAgICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XG4gICAgICAgIHBjLmFkZFRyYWNrKHRyYWNrLCBzdHJlYW0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIENsb25lIGlzIG5lY2Vzc2FyeSBmb3IgbG9jYWwgZGVtb3MgbW9zdGx5LCBhdHRhY2hpbmcgZGlyZWN0bHlcbiAgICAgIC8vIHRvIHR3byBkaWZmZXJlbnQgc2VuZGVycyBkb2VzIG5vdCB3b3JrIChidWlsZCAxMDU0NykuXG4gICAgICAvLyBGaXhlZCBpbiAxNTAyNSAob3IgZWFybGllcilcbiAgICAgIHZhciBjbG9uZWRTdHJlYW0gPSBzdHJlYW0uY2xvbmUoKTtcbiAgICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrLCBpZHgpIHtcbiAgICAgICAgdmFyIGNsb25lZFRyYWNrID0gY2xvbmVkU3RyZWFtLmdldFRyYWNrcygpW2lkeF07XG4gICAgICAgIHRyYWNrLmFkZEV2ZW50TGlzdGVuZXIoJ2VuYWJsZWQnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGNsb25lZFRyYWNrLmVuYWJsZWQgPSBldmVudC5lbmFibGVkO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgY2xvbmVkU3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcbiAgICAgICAgcGMuYWRkVHJhY2sodHJhY2ssIGNsb25lZFN0cmVhbSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVRyYWNrID0gZnVuY3Rpb24oc2VuZGVyKSB7XG4gICAgaWYgKHRoaXMuX2lzQ2xvc2VkKSB7XG4gICAgICB0aHJvdyBtYWtlRXJyb3IoJ0ludmFsaWRTdGF0ZUVycm9yJyxcbiAgICAgICAgICAnQXR0ZW1wdGVkIHRvIGNhbGwgcmVtb3ZlVHJhY2sgb24gYSBjbG9zZWQgcGVlcmNvbm5lY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgaWYgKCEoc2VuZGVyIGluc3RhbmNlb2Ygd2luZG93LlJUQ1J0cFNlbmRlcikpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IDEgb2YgUlRDUGVlckNvbm5lY3Rpb24ucmVtb3ZlVHJhY2sgJyArXG4gICAgICAgICAgJ2RvZXMgbm90IGltcGxlbWVudCBpbnRlcmZhY2UgUlRDUnRwU2VuZGVyLicpO1xuICAgIH1cblxuICAgIHZhciB0cmFuc2NlaXZlciA9IHRoaXMudHJhbnNjZWl2ZXJzLmZpbmQoZnVuY3Rpb24odCkge1xuICAgICAgcmV0dXJuIHQucnRwU2VuZGVyID09PSBzZW5kZXI7XG4gICAgfSk7XG5cbiAgICBpZiAoIXRyYW5zY2VpdmVyKSB7XG4gICAgICB0aHJvdyBtYWtlRXJyb3IoJ0ludmFsaWRBY2Nlc3NFcnJvcicsXG4gICAgICAgICAgJ1NlbmRlciB3YXMgbm90IGNyZWF0ZWQgYnkgdGhpcyBjb25uZWN0aW9uLicpO1xuICAgIH1cbiAgICB2YXIgc3RyZWFtID0gdHJhbnNjZWl2ZXIuc3RyZWFtO1xuXG4gICAgdHJhbnNjZWl2ZXIucnRwU2VuZGVyLnN0b3AoKTtcbiAgICB0cmFuc2NlaXZlci5ydHBTZW5kZXIgPSBudWxsO1xuICAgIHRyYW5zY2VpdmVyLnRyYWNrID0gbnVsbDtcbiAgICB0cmFuc2NlaXZlci5zdHJlYW0gPSBudWxsO1xuXG4gICAgLy8gcmVtb3ZlIHRoZSBzdHJlYW0gZnJvbSB0aGUgc2V0IG9mIGxvY2FsIHN0cmVhbXNcbiAgICB2YXIgbG9jYWxTdHJlYW1zID0gdGhpcy50cmFuc2NlaXZlcnMubWFwKGZ1bmN0aW9uKHQpIHtcbiAgICAgIHJldHVybiB0LnN0cmVhbTtcbiAgICB9KTtcbiAgICBpZiAobG9jYWxTdHJlYW1zLmluZGV4T2Yoc3RyZWFtKSA9PT0gLTEgJiZcbiAgICAgICAgdGhpcy5sb2NhbFN0cmVhbXMuaW5kZXhPZihzdHJlYW0pID4gLTEpIHtcbiAgICAgIHRoaXMubG9jYWxTdHJlYW1zLnNwbGljZSh0aGlzLmxvY2FsU3RyZWFtcy5pbmRleE9mKHN0cmVhbSksIDEpO1xuICAgIH1cblxuICAgIHRoaXMuX21heWJlRmlyZU5lZ290aWF0aW9uTmVlZGVkKCk7XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgIHZhciBwYyA9IHRoaXM7XG4gICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcbiAgICAgIHZhciBzZW5kZXIgPSBwYy5nZXRTZW5kZXJzKCkuZmluZChmdW5jdGlvbihzKSB7XG4gICAgICAgIHJldHVybiBzLnRyYWNrID09PSB0cmFjaztcbiAgICAgIH0pO1xuICAgICAgaWYgKHNlbmRlcikge1xuICAgICAgICBwYy5yZW1vdmVUcmFjayhzZW5kZXIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTZW5kZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMudHJhbnNjZWl2ZXJzLmZpbHRlcihmdW5jdGlvbih0cmFuc2NlaXZlcikge1xuICAgICAgcmV0dXJuICEhdHJhbnNjZWl2ZXIucnRwU2VuZGVyO1xuICAgIH0pXG4gICAgLm1hcChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xuICAgICAgcmV0dXJuIHRyYW5zY2VpdmVyLnJ0cFNlbmRlcjtcbiAgICB9KTtcbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0UmVjZWl2ZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMudHJhbnNjZWl2ZXJzLmZpbHRlcihmdW5jdGlvbih0cmFuc2NlaXZlcikge1xuICAgICAgcmV0dXJuICEhdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXI7XG4gICAgfSlcbiAgICAubWFwKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XG4gICAgICByZXR1cm4gdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXI7XG4gICAgfSk7XG4gIH07XG5cblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX2NyZWF0ZUljZUdhdGhlcmVyID0gZnVuY3Rpb24oc2RwTUxpbmVJbmRleCxcbiAgICAgIHVzaW5nQnVuZGxlKSB7XG4gICAgdmFyIHBjID0gdGhpcztcbiAgICBpZiAodXNpbmdCdW5kbGUgJiYgc2RwTUxpbmVJbmRleCA+IDApIHtcbiAgICAgIHJldHVybiB0aGlzLnRyYW5zY2VpdmVyc1swXS5pY2VHYXRoZXJlcjtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2ljZUdhdGhlcmVycy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9pY2VHYXRoZXJlcnMuc2hpZnQoKTtcbiAgICB9XG4gICAgdmFyIGljZUdhdGhlcmVyID0gbmV3IHdpbmRvdy5SVENJY2VHYXRoZXJlcih7XG4gICAgICBpY2VTZXJ2ZXJzOiB0aGlzLl9jb25maWcuaWNlU2VydmVycyxcbiAgICAgIGdhdGhlclBvbGljeTogdGhpcy5fY29uZmlnLmljZVRyYW5zcG9ydFBvbGljeVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpY2VHYXRoZXJlciwgJ3N0YXRlJyxcbiAgICAgICAge3ZhbHVlOiAnbmV3Jywgd3JpdGFibGU6IHRydWV9XG4gICAgKTtcblxuICAgIHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmJ1ZmZlcmVkQ2FuZGlkYXRlRXZlbnRzID0gW107XG4gICAgdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uYnVmZmVyQ2FuZGlkYXRlcyA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICB2YXIgZW5kID0gIWV2ZW50LmNhbmRpZGF0ZSB8fCBPYmplY3Qua2V5cyhldmVudC5jYW5kaWRhdGUpLmxlbmd0aCA9PT0gMDtcbiAgICAgIC8vIHBvbHlmaWxsIHNpbmNlIFJUQ0ljZUdhdGhlcmVyLnN0YXRlIGlzIG5vdCBpbXBsZW1lbnRlZCBpblxuICAgICAgLy8gRWRnZSAxMDU0NyB5ZXQuXG4gICAgICBpY2VHYXRoZXJlci5zdGF0ZSA9IGVuZCA/ICdjb21wbGV0ZWQnIDogJ2dhdGhlcmluZyc7XG4gICAgICBpZiAocGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmJ1ZmZlcmVkQ2FuZGlkYXRlRXZlbnRzICE9PSBudWxsKSB7XG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5idWZmZXJlZENhbmRpZGF0ZUV2ZW50cy5wdXNoKGV2ZW50KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGljZUdhdGhlcmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvY2FsY2FuZGlkYXRlJyxcbiAgICAgIHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmJ1ZmZlckNhbmRpZGF0ZXMpO1xuICAgIHJldHVybiBpY2VHYXRoZXJlcjtcbiAgfTtcblxuICAvLyBzdGFydCBnYXRoZXJpbmcgZnJvbSBhbiBSVENJY2VHYXRoZXJlci5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl9nYXRoZXIgPSBmdW5jdGlvbihtaWQsIHNkcE1MaW5lSW5kZXgpIHtcbiAgICB2YXIgcGMgPSB0aGlzO1xuICAgIHZhciBpY2VHYXRoZXJlciA9IHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmljZUdhdGhlcmVyO1xuICAgIGlmIChpY2VHYXRoZXJlci5vbmxvY2FsY2FuZGlkYXRlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBidWZmZXJlZENhbmRpZGF0ZUV2ZW50cyA9XG4gICAgICB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5idWZmZXJlZENhbmRpZGF0ZUV2ZW50cztcbiAgICB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5idWZmZXJlZENhbmRpZGF0ZUV2ZW50cyA9IG51bGw7XG4gICAgaWNlR2F0aGVyZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbG9jYWxjYW5kaWRhdGUnLFxuICAgICAgdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uYnVmZmVyQ2FuZGlkYXRlcyk7XG4gICAgaWNlR2F0aGVyZXIub25sb2NhbGNhbmRpZGF0ZSA9IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgaWYgKHBjLnVzaW5nQnVuZGxlICYmIHNkcE1MaW5lSW5kZXggPiAwKSB7XG4gICAgICAgIC8vIGlmIHdlIGtub3cgdGhhdCB3ZSB1c2UgYnVuZGxlIHdlIGNhbiBkcm9wIGNhbmRpZGF0ZXMgd2l0aFxuICAgICAgICAvLyDRlWRwTUxpbmVJbmRleCA+IDAuIElmIHdlIGRvbid0IGRvIHRoaXMgdGhlbiBvdXIgc3RhdGUgZ2V0c1xuICAgICAgICAvLyBjb25mdXNlZCBzaW5jZSB3ZSBkaXNwb3NlIHRoZSBleHRyYSBpY2UgZ2F0aGVyZXIuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgnaWNlY2FuZGlkYXRlJyk7XG4gICAgICBldmVudC5jYW5kaWRhdGUgPSB7c2RwTWlkOiBtaWQsIHNkcE1MaW5lSW5kZXg6IHNkcE1MaW5lSW5kZXh9O1xuXG4gICAgICB2YXIgY2FuZCA9IGV2dC5jYW5kaWRhdGU7XG4gICAgICAvLyBFZGdlIGVtaXRzIGFuIGVtcHR5IG9iamVjdCBmb3IgUlRDSWNlQ2FuZGlkYXRlQ29tcGxldGXigKVcbiAgICAgIHZhciBlbmQgPSAhY2FuZCB8fCBPYmplY3Qua2V5cyhjYW5kKS5sZW5ndGggPT09IDA7XG4gICAgICBpZiAoZW5kKSB7XG4gICAgICAgIC8vIHBvbHlmaWxsIHNpbmNlIFJUQ0ljZUdhdGhlcmVyLnN0YXRlIGlzIG5vdCBpbXBsZW1lbnRlZCBpblxuICAgICAgICAvLyBFZGdlIDEwNTQ3IHlldC5cbiAgICAgICAgaWYgKGljZUdhdGhlcmVyLnN0YXRlID09PSAnbmV3JyB8fCBpY2VHYXRoZXJlci5zdGF0ZSA9PT0gJ2dhdGhlcmluZycpIHtcbiAgICAgICAgICBpY2VHYXRoZXJlci5zdGF0ZSA9ICdjb21wbGV0ZWQnO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoaWNlR2F0aGVyZXIuc3RhdGUgPT09ICduZXcnKSB7XG4gICAgICAgICAgaWNlR2F0aGVyZXIuc3RhdGUgPSAnZ2F0aGVyaW5nJztcbiAgICAgICAgfVxuICAgICAgICAvLyBSVENJY2VDYW5kaWRhdGUgZG9lc24ndCBoYXZlIGEgY29tcG9uZW50LCBuZWVkcyB0byBiZSBhZGRlZFxuICAgICAgICBjYW5kLmNvbXBvbmVudCA9IDE7XG4gICAgICAgIC8vIGFsc28gdGhlIHVzZXJuYW1lRnJhZ21lbnQuIFRPRE86IHVwZGF0ZSBTRFAgdG8gdGFrZSBib3RoIHZhcmlhbnRzLlxuICAgICAgICBjYW5kLnVmcmFnID0gaWNlR2F0aGVyZXIuZ2V0TG9jYWxQYXJhbWV0ZXJzKCkudXNlcm5hbWVGcmFnbWVudDtcblxuICAgICAgICB2YXIgc2VyaWFsaXplZENhbmRpZGF0ZSA9IFNEUFV0aWxzLndyaXRlQ2FuZGlkYXRlKGNhbmQpO1xuICAgICAgICBldmVudC5jYW5kaWRhdGUgPSBPYmplY3QuYXNzaWduKGV2ZW50LmNhbmRpZGF0ZSxcbiAgICAgICAgICAgIFNEUFV0aWxzLnBhcnNlQ2FuZGlkYXRlKHNlcmlhbGl6ZWRDYW5kaWRhdGUpKTtcblxuICAgICAgICBldmVudC5jYW5kaWRhdGUuY2FuZGlkYXRlID0gc2VyaWFsaXplZENhbmRpZGF0ZTtcbiAgICAgICAgZXZlbnQuY2FuZGlkYXRlLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjYW5kaWRhdGU6IGV2ZW50LmNhbmRpZGF0ZS5jYW5kaWRhdGUsXG4gICAgICAgICAgICBzZHBNaWQ6IGV2ZW50LmNhbmRpZGF0ZS5zZHBNaWQsXG4gICAgICAgICAgICBzZHBNTGluZUluZGV4OiBldmVudC5jYW5kaWRhdGUuc2RwTUxpbmVJbmRleCxcbiAgICAgICAgICAgIHVzZXJuYW1lRnJhZ21lbnQ6IGV2ZW50LmNhbmRpZGF0ZS51c2VybmFtZUZyYWdtZW50XG4gICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgLy8gdXBkYXRlIGxvY2FsIGRlc2NyaXB0aW9uLlxuICAgICAgdmFyIHNlY3Rpb25zID0gU0RQVXRpbHMuZ2V0TWVkaWFTZWN0aW9ucyhwYy5sb2NhbERlc2NyaXB0aW9uLnNkcCk7XG4gICAgICBpZiAoIWVuZCkge1xuICAgICAgICBzZWN0aW9uc1tldmVudC5jYW5kaWRhdGUuc2RwTUxpbmVJbmRleF0gKz1cbiAgICAgICAgICAgICdhPScgKyBldmVudC5jYW5kaWRhdGUuY2FuZGlkYXRlICsgJ1xcclxcbic7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWN0aW9uc1tldmVudC5jYW5kaWRhdGUuc2RwTUxpbmVJbmRleF0gKz1cbiAgICAgICAgICAgICdhPWVuZC1vZi1jYW5kaWRhdGVzXFxyXFxuJztcbiAgICAgIH1cbiAgICAgIHBjLmxvY2FsRGVzY3JpcHRpb24uc2RwID1cbiAgICAgICAgICBTRFBVdGlscy5nZXREZXNjcmlwdGlvbihwYy5sb2NhbERlc2NyaXB0aW9uLnNkcCkgK1xuICAgICAgICAgIHNlY3Rpb25zLmpvaW4oJycpO1xuICAgICAgdmFyIGNvbXBsZXRlID0gcGMudHJhbnNjZWl2ZXJzLmV2ZXJ5KGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XG4gICAgICAgIHJldHVybiB0cmFuc2NlaXZlci5pY2VHYXRoZXJlciAmJlxuICAgICAgICAgICAgdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIuc3RhdGUgPT09ICdjb21wbGV0ZWQnO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChwYy5pY2VHYXRoZXJpbmdTdGF0ZSAhPT0gJ2dhdGhlcmluZycpIHtcbiAgICAgICAgcGMuaWNlR2F0aGVyaW5nU3RhdGUgPSAnZ2F0aGVyaW5nJztcbiAgICAgICAgcGMuX2VtaXRHYXRoZXJpbmdTdGF0ZUNoYW5nZSgpO1xuICAgICAgfVxuXG4gICAgICAvLyBFbWl0IGNhbmRpZGF0ZS4gQWxzbyBlbWl0IG51bGwgY2FuZGlkYXRlIHdoZW4gYWxsIGdhdGhlcmVycyBhcmVcbiAgICAgIC8vIGNvbXBsZXRlLlxuICAgICAgaWYgKCFlbmQpIHtcbiAgICAgICAgcGMuX2Rpc3BhdGNoRXZlbnQoJ2ljZWNhbmRpZGF0ZScsIGV2ZW50KTtcbiAgICAgIH1cbiAgICAgIGlmIChjb21wbGV0ZSkge1xuICAgICAgICBwYy5fZGlzcGF0Y2hFdmVudCgnaWNlY2FuZGlkYXRlJywgbmV3IEV2ZW50KCdpY2VjYW5kaWRhdGUnKSk7XG4gICAgICAgIHBjLmljZUdhdGhlcmluZ1N0YXRlID0gJ2NvbXBsZXRlJztcbiAgICAgICAgcGMuX2VtaXRHYXRoZXJpbmdTdGF0ZUNoYW5nZSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBlbWl0IGFscmVhZHkgZ2F0aGVyZWQgY2FuZGlkYXRlcy5cbiAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIGJ1ZmZlcmVkQ2FuZGlkYXRlRXZlbnRzLmZvckVhY2goZnVuY3Rpb24oZSkge1xuICAgICAgICBpY2VHYXRoZXJlci5vbmxvY2FsY2FuZGlkYXRlKGUpO1xuICAgICAgfSk7XG4gICAgfSwgMCk7XG4gIH07XG5cbiAgLy8gQ3JlYXRlIElDRSB0cmFuc3BvcnQgYW5kIERUTFMgdHJhbnNwb3J0LlxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX2NyZWF0ZUljZUFuZER0bHNUcmFuc3BvcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHBjID0gdGhpcztcbiAgICB2YXIgaWNlVHJhbnNwb3J0ID0gbmV3IHdpbmRvdy5SVENJY2VUcmFuc3BvcnQobnVsbCk7XG4gICAgaWNlVHJhbnNwb3J0Lm9uaWNlc3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgIHBjLl91cGRhdGVJY2VDb25uZWN0aW9uU3RhdGUoKTtcbiAgICAgIHBjLl91cGRhdGVDb25uZWN0aW9uU3RhdGUoKTtcbiAgICB9O1xuXG4gICAgdmFyIGR0bHNUcmFuc3BvcnQgPSBuZXcgd2luZG93LlJUQ0R0bHNUcmFuc3BvcnQoaWNlVHJhbnNwb3J0KTtcbiAgICBkdGxzVHJhbnNwb3J0Lm9uZHRsc3N0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICBwYy5fdXBkYXRlQ29ubmVjdGlvblN0YXRlKCk7XG4gICAgfTtcbiAgICBkdGxzVHJhbnNwb3J0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgIC8vIG9uZXJyb3IgZG9lcyBub3Qgc2V0IHN0YXRlIHRvIGZhaWxlZCBieSBpdHNlbGYuXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZHRsc1RyYW5zcG9ydCwgJ3N0YXRlJyxcbiAgICAgICAgICB7dmFsdWU6ICdmYWlsZWQnLCB3cml0YWJsZTogdHJ1ZX0pO1xuICAgICAgcGMuX3VwZGF0ZUNvbm5lY3Rpb25TdGF0ZSgpO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgaWNlVHJhbnNwb3J0OiBpY2VUcmFuc3BvcnQsXG4gICAgICBkdGxzVHJhbnNwb3J0OiBkdGxzVHJhbnNwb3J0XG4gICAgfTtcbiAgfTtcblxuICAvLyBEZXN0cm95IElDRSBnYXRoZXJlciwgSUNFIHRyYW5zcG9ydCBhbmQgRFRMUyB0cmFuc3BvcnQuXG4gIC8vIFdpdGhvdXQgdHJpZ2dlcmluZyB0aGUgY2FsbGJhY2tzLlxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX2Rpc3Bvc2VJY2VBbmREdGxzVHJhbnNwb3J0cyA9IGZ1bmN0aW9uKFxuICAgICAgc2RwTUxpbmVJbmRleCkge1xuICAgIHZhciBpY2VHYXRoZXJlciA9IHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmljZUdhdGhlcmVyO1xuICAgIGlmIChpY2VHYXRoZXJlcikge1xuICAgICAgZGVsZXRlIGljZUdhdGhlcmVyLm9ubG9jYWxjYW5kaWRhdGU7XG4gICAgICBkZWxldGUgdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uaWNlR2F0aGVyZXI7XG4gICAgfVxuICAgIHZhciBpY2VUcmFuc3BvcnQgPSB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5pY2VUcmFuc3BvcnQ7XG4gICAgaWYgKGljZVRyYW5zcG9ydCkge1xuICAgICAgZGVsZXRlIGljZVRyYW5zcG9ydC5vbmljZXN0YXRlY2hhbmdlO1xuICAgICAgZGVsZXRlIHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmljZVRyYW5zcG9ydDtcbiAgICB9XG4gICAgdmFyIGR0bHNUcmFuc3BvcnQgPSB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5kdGxzVHJhbnNwb3J0O1xuICAgIGlmIChkdGxzVHJhbnNwb3J0KSB7XG4gICAgICBkZWxldGUgZHRsc1RyYW5zcG9ydC5vbmR0bHNzdGF0ZWNoYW5nZTtcbiAgICAgIGRlbGV0ZSBkdGxzVHJhbnNwb3J0Lm9uZXJyb3I7XG4gICAgICBkZWxldGUgdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uZHRsc1RyYW5zcG9ydDtcbiAgICB9XG4gIH07XG5cbiAgLy8gU3RhcnQgdGhlIFJUUCBTZW5kZXIgYW5kIFJlY2VpdmVyIGZvciBhIHRyYW5zY2VpdmVyLlxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX3RyYW5zY2VpdmUgPSBmdW5jdGlvbih0cmFuc2NlaXZlcixcbiAgICAgIHNlbmQsIHJlY3YpIHtcbiAgICB2YXIgcGFyYW1zID0gZ2V0Q29tbW9uQ2FwYWJpbGl0aWVzKHRyYW5zY2VpdmVyLmxvY2FsQ2FwYWJpbGl0aWVzLFxuICAgICAgICB0cmFuc2NlaXZlci5yZW1vdGVDYXBhYmlsaXRpZXMpO1xuICAgIGlmIChzZW5kICYmIHRyYW5zY2VpdmVyLnJ0cFNlbmRlcikge1xuICAgICAgcGFyYW1zLmVuY29kaW5ncyA9IHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnM7XG4gICAgICBwYXJhbXMucnRjcCA9IHtcbiAgICAgICAgY25hbWU6IFNEUFV0aWxzLmxvY2FsQ05hbWUsXG4gICAgICAgIGNvbXBvdW5kOiB0cmFuc2NlaXZlci5ydGNwUGFyYW1ldGVycy5jb21wb3VuZFxuICAgICAgfTtcbiAgICAgIGlmICh0cmFuc2NlaXZlci5yZWN2RW5jb2RpbmdQYXJhbWV0ZXJzLmxlbmd0aCkge1xuICAgICAgICBwYXJhbXMucnRjcC5zc3JjID0gdHJhbnNjZWl2ZXIucmVjdkVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjO1xuICAgICAgfVxuICAgICAgdHJhbnNjZWl2ZXIucnRwU2VuZGVyLnNlbmQocGFyYW1zKTtcbiAgICB9XG4gICAgaWYgKHJlY3YgJiYgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIgJiYgcGFyYW1zLmNvZGVjcy5sZW5ndGggPiAwKSB7XG4gICAgICAvLyByZW1vdmUgUlRYIGZpZWxkIGluIEVkZ2UgMTQ5NDJcbiAgICAgIGlmICh0cmFuc2NlaXZlci5raW5kID09PSAndmlkZW8nXG4gICAgICAgICAgJiYgdHJhbnNjZWl2ZXIucmVjdkVuY29kaW5nUGFyYW1ldGVyc1xuICAgICAgICAgICYmIGVkZ2VWZXJzaW9uIDwgMTUwMTkpIHtcbiAgICAgICAgdHJhbnNjZWl2ZXIucmVjdkVuY29kaW5nUGFyYW1ldGVycy5mb3JFYWNoKGZ1bmN0aW9uKHApIHtcbiAgICAgICAgICBkZWxldGUgcC5ydHg7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKHRyYW5zY2VpdmVyLnJlY3ZFbmNvZGluZ1BhcmFtZXRlcnMubGVuZ3RoKSB7XG4gICAgICAgIHBhcmFtcy5lbmNvZGluZ3MgPSB0cmFuc2NlaXZlci5yZWN2RW5jb2RpbmdQYXJhbWV0ZXJzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyYW1zLmVuY29kaW5ncyA9IFt7fV07XG4gICAgICB9XG4gICAgICBwYXJhbXMucnRjcCA9IHtcbiAgICAgICAgY29tcG91bmQ6IHRyYW5zY2VpdmVyLnJ0Y3BQYXJhbWV0ZXJzLmNvbXBvdW5kXG4gICAgICB9O1xuICAgICAgaWYgKHRyYW5zY2VpdmVyLnJ0Y3BQYXJhbWV0ZXJzLmNuYW1lKSB7XG4gICAgICAgIHBhcmFtcy5ydGNwLmNuYW1lID0gdHJhbnNjZWl2ZXIucnRjcFBhcmFtZXRlcnMuY25hbWU7XG4gICAgICB9XG4gICAgICBpZiAodHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVycy5sZW5ndGgpIHtcbiAgICAgICAgcGFyYW1zLnJ0Y3Auc3NyYyA9IHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYztcbiAgICAgIH1cbiAgICAgIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyLnJlY2VpdmUocGFyYW1zKTtcbiAgICB9XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnNldExvY2FsRGVzY3JpcHRpb24gPSBmdW5jdGlvbihkZXNjcmlwdGlvbikge1xuICAgIHZhciBwYyA9IHRoaXM7XG5cbiAgICAvLyBOb3RlOiBwcmFuc3dlciBpcyBub3Qgc3VwcG9ydGVkLlxuICAgIGlmIChbJ29mZmVyJywgJ2Fuc3dlciddLmluZGV4T2YoZGVzY3JpcHRpb24udHlwZSkgPT09IC0xKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobWFrZUVycm9yKCdUeXBlRXJyb3InLFxuICAgICAgICAgICdVbnN1cHBvcnRlZCB0eXBlIFwiJyArIGRlc2NyaXB0aW9uLnR5cGUgKyAnXCInKSk7XG4gICAgfVxuXG4gICAgaWYgKCFpc0FjdGlvbkFsbG93ZWRJblNpZ25hbGluZ1N0YXRlKCdzZXRMb2NhbERlc2NyaXB0aW9uJyxcbiAgICAgICAgZGVzY3JpcHRpb24udHlwZSwgcGMuc2lnbmFsaW5nU3RhdGUpIHx8IHBjLl9pc0Nsb3NlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG1ha2VFcnJvcignSW52YWxpZFN0YXRlRXJyb3InLFxuICAgICAgICAgICdDYW4gbm90IHNldCBsb2NhbCAnICsgZGVzY3JpcHRpb24udHlwZSArXG4gICAgICAgICAgJyBpbiBzdGF0ZSAnICsgcGMuc2lnbmFsaW5nU3RhdGUpKTtcbiAgICB9XG5cbiAgICB2YXIgc2VjdGlvbnM7XG4gICAgdmFyIHNlc3Npb25wYXJ0O1xuICAgIGlmIChkZXNjcmlwdGlvbi50eXBlID09PSAnb2ZmZXInKSB7XG4gICAgICAvLyBWRVJZIGxpbWl0ZWQgc3VwcG9ydCBmb3IgU0RQIG11bmdpbmcuIExpbWl0ZWQgdG86XG4gICAgICAvLyAqIGNoYW5naW5nIHRoZSBvcmRlciBvZiBjb2RlY3NcbiAgICAgIHNlY3Rpb25zID0gU0RQVXRpbHMuc3BsaXRTZWN0aW9ucyhkZXNjcmlwdGlvbi5zZHApO1xuICAgICAgc2Vzc2lvbnBhcnQgPSBzZWN0aW9ucy5zaGlmdCgpO1xuICAgICAgc2VjdGlvbnMuZm9yRWFjaChmdW5jdGlvbihtZWRpYVNlY3Rpb24sIHNkcE1MaW5lSW5kZXgpIHtcbiAgICAgICAgdmFyIGNhcHMgPSBTRFBVdGlscy5wYXJzZVJ0cFBhcmFtZXRlcnMobWVkaWFTZWN0aW9uKTtcbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmxvY2FsQ2FwYWJpbGl0aWVzID0gY2FwcztcbiAgICAgIH0pO1xuXG4gICAgICBwYy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlciwgc2RwTUxpbmVJbmRleCkge1xuICAgICAgICBwYy5fZ2F0aGVyKHRyYW5zY2VpdmVyLm1pZCwgc2RwTUxpbmVJbmRleCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGRlc2NyaXB0aW9uLnR5cGUgPT09ICdhbnN3ZXInKSB7XG4gICAgICBzZWN0aW9ucyA9IFNEUFV0aWxzLnNwbGl0U2VjdGlvbnMocGMucmVtb3RlRGVzY3JpcHRpb24uc2RwKTtcbiAgICAgIHNlc3Npb25wYXJ0ID0gc2VjdGlvbnMuc2hpZnQoKTtcbiAgICAgIHZhciBpc0ljZUxpdGUgPSBTRFBVdGlscy5tYXRjaFByZWZpeChzZXNzaW9ucGFydCxcbiAgICAgICAgICAnYT1pY2UtbGl0ZScpLmxlbmd0aCA+IDA7XG4gICAgICBzZWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKG1lZGlhU2VjdGlvbiwgc2RwTUxpbmVJbmRleCkge1xuICAgICAgICB2YXIgdHJhbnNjZWl2ZXIgPSBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF07XG4gICAgICAgIHZhciBpY2VHYXRoZXJlciA9IHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyO1xuICAgICAgICB2YXIgaWNlVHJhbnNwb3J0ID0gdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0O1xuICAgICAgICB2YXIgZHRsc1RyYW5zcG9ydCA9IHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQ7XG4gICAgICAgIHZhciBsb2NhbENhcGFiaWxpdGllcyA9IHRyYW5zY2VpdmVyLmxvY2FsQ2FwYWJpbGl0aWVzO1xuICAgICAgICB2YXIgcmVtb3RlQ2FwYWJpbGl0aWVzID0gdHJhbnNjZWl2ZXIucmVtb3RlQ2FwYWJpbGl0aWVzO1xuXG4gICAgICAgIC8vIHRyZWF0IGJ1bmRsZS1vbmx5IGFzIG5vdC1yZWplY3RlZC5cbiAgICAgICAgdmFyIHJlamVjdGVkID0gU0RQVXRpbHMuaXNSZWplY3RlZChtZWRpYVNlY3Rpb24pICYmXG4gICAgICAgICAgICBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPWJ1bmRsZS1vbmx5JykubGVuZ3RoID09PSAwO1xuXG4gICAgICAgIGlmICghcmVqZWN0ZWQgJiYgIXRyYW5zY2VpdmVyLnJlamVjdGVkKSB7XG4gICAgICAgICAgdmFyIHJlbW90ZUljZVBhcmFtZXRlcnMgPSBTRFBVdGlscy5nZXRJY2VQYXJhbWV0ZXJzKFxuICAgICAgICAgICAgICBtZWRpYVNlY3Rpb24sIHNlc3Npb25wYXJ0KTtcbiAgICAgICAgICB2YXIgcmVtb3RlRHRsc1BhcmFtZXRlcnMgPSBTRFBVdGlscy5nZXREdGxzUGFyYW1ldGVycyhcbiAgICAgICAgICAgICAgbWVkaWFTZWN0aW9uLCBzZXNzaW9ucGFydCk7XG4gICAgICAgICAgaWYgKGlzSWNlTGl0ZSkge1xuICAgICAgICAgICAgcmVtb3RlRHRsc1BhcmFtZXRlcnMucm9sZSA9ICdzZXJ2ZXInO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghcGMudXNpbmdCdW5kbGUgfHwgc2RwTUxpbmVJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgcGMuX2dhdGhlcih0cmFuc2NlaXZlci5taWQsIHNkcE1MaW5lSW5kZXgpO1xuICAgICAgICAgICAgaWYgKGljZVRyYW5zcG9ydC5zdGF0ZSA9PT0gJ25ldycpIHtcbiAgICAgICAgICAgICAgaWNlVHJhbnNwb3J0LnN0YXJ0KGljZUdhdGhlcmVyLCByZW1vdGVJY2VQYXJhbWV0ZXJzLFxuICAgICAgICAgICAgICAgICAgaXNJY2VMaXRlID8gJ2NvbnRyb2xsaW5nJyA6ICdjb250cm9sbGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZHRsc1RyYW5zcG9ydC5zdGF0ZSA9PT0gJ25ldycpIHtcbiAgICAgICAgICAgICAgZHRsc1RyYW5zcG9ydC5zdGFydChyZW1vdGVEdGxzUGFyYW1ldGVycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gQ2FsY3VsYXRlIGludGVyc2VjdGlvbiBvZiBjYXBhYmlsaXRpZXMuXG4gICAgICAgICAgdmFyIHBhcmFtcyA9IGdldENvbW1vbkNhcGFiaWxpdGllcyhsb2NhbENhcGFiaWxpdGllcyxcbiAgICAgICAgICAgICAgcmVtb3RlQ2FwYWJpbGl0aWVzKTtcblxuICAgICAgICAgIC8vIFN0YXJ0IHRoZSBSVENSdHBTZW5kZXIuIFRoZSBSVENSdHBSZWNlaXZlciBmb3IgdGhpc1xuICAgICAgICAgIC8vIHRyYW5zY2VpdmVyIGhhcyBhbHJlYWR5IGJlZW4gc3RhcnRlZCBpbiBzZXRSZW1vdGVEZXNjcmlwdGlvbi5cbiAgICAgICAgICBwYy5fdHJhbnNjZWl2ZSh0cmFuc2NlaXZlcixcbiAgICAgICAgICAgICAgcGFyYW1zLmNvZGVjcy5sZW5ndGggPiAwLFxuICAgICAgICAgICAgICBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHBjLmxvY2FsRGVzY3JpcHRpb24gPSB7XG4gICAgICB0eXBlOiBkZXNjcmlwdGlvbi50eXBlLFxuICAgICAgc2RwOiBkZXNjcmlwdGlvbi5zZHBcbiAgICB9O1xuICAgIGlmIChkZXNjcmlwdGlvbi50eXBlID09PSAnb2ZmZXInKSB7XG4gICAgICBwYy5fdXBkYXRlU2lnbmFsaW5nU3RhdGUoJ2hhdmUtbG9jYWwtb2ZmZXInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGMuX3VwZGF0ZVNpZ25hbGluZ1N0YXRlKCdzdGFibGUnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnNldFJlbW90ZURlc2NyaXB0aW9uID0gZnVuY3Rpb24oZGVzY3JpcHRpb24pIHtcbiAgICB2YXIgcGMgPSB0aGlzO1xuXG4gICAgLy8gTm90ZTogcHJhbnN3ZXIgaXMgbm90IHN1cHBvcnRlZC5cbiAgICBpZiAoWydvZmZlcicsICdhbnN3ZXInXS5pbmRleE9mKGRlc2NyaXB0aW9uLnR5cGUpID09PSAtMSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG1ha2VFcnJvcignVHlwZUVycm9yJyxcbiAgICAgICAgICAnVW5zdXBwb3J0ZWQgdHlwZSBcIicgKyBkZXNjcmlwdGlvbi50eXBlICsgJ1wiJykpO1xuICAgIH1cblxuICAgIGlmICghaXNBY3Rpb25BbGxvd2VkSW5TaWduYWxpbmdTdGF0ZSgnc2V0UmVtb3RlRGVzY3JpcHRpb24nLFxuICAgICAgICBkZXNjcmlwdGlvbi50eXBlLCBwYy5zaWduYWxpbmdTdGF0ZSkgfHwgcGMuX2lzQ2xvc2VkKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobWFrZUVycm9yKCdJbnZhbGlkU3RhdGVFcnJvcicsXG4gICAgICAgICAgJ0NhbiBub3Qgc2V0IHJlbW90ZSAnICsgZGVzY3JpcHRpb24udHlwZSArXG4gICAgICAgICAgJyBpbiBzdGF0ZSAnICsgcGMuc2lnbmFsaW5nU3RhdGUpKTtcbiAgICB9XG5cbiAgICB2YXIgc3RyZWFtcyA9IHt9O1xuICAgIHBjLnJlbW90ZVN0cmVhbXMuZm9yRWFjaChmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgIHN0cmVhbXNbc3RyZWFtLmlkXSA9IHN0cmVhbTtcbiAgICB9KTtcbiAgICB2YXIgcmVjZWl2ZXJMaXN0ID0gW107XG4gICAgdmFyIHNlY3Rpb25zID0gU0RQVXRpbHMuc3BsaXRTZWN0aW9ucyhkZXNjcmlwdGlvbi5zZHApO1xuICAgIHZhciBzZXNzaW9ucGFydCA9IHNlY3Rpb25zLnNoaWZ0KCk7XG4gICAgdmFyIGlzSWNlTGl0ZSA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KHNlc3Npb25wYXJ0LFxuICAgICAgICAnYT1pY2UtbGl0ZScpLmxlbmd0aCA+IDA7XG4gICAgdmFyIHVzaW5nQnVuZGxlID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgoc2Vzc2lvbnBhcnQsXG4gICAgICAgICdhPWdyb3VwOkJVTkRMRSAnKS5sZW5ndGggPiAwO1xuICAgIHBjLnVzaW5nQnVuZGxlID0gdXNpbmdCdW5kbGU7XG4gICAgdmFyIGljZU9wdGlvbnMgPSBTRFBVdGlscy5tYXRjaFByZWZpeChzZXNzaW9ucGFydCxcbiAgICAgICAgJ2E9aWNlLW9wdGlvbnM6JylbMF07XG4gICAgaWYgKGljZU9wdGlvbnMpIHtcbiAgICAgIHBjLmNhblRyaWNrbGVJY2VDYW5kaWRhdGVzID0gaWNlT3B0aW9ucy5zdWJzdHIoMTQpLnNwbGl0KCcgJylcbiAgICAgICAgICAuaW5kZXhPZigndHJpY2tsZScpID49IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBjLmNhblRyaWNrbGVJY2VDYW5kaWRhdGVzID0gZmFsc2U7XG4gICAgfVxuXG4gICAgc2VjdGlvbnMuZm9yRWFjaChmdW5jdGlvbihtZWRpYVNlY3Rpb24sIHNkcE1MaW5lSW5kZXgpIHtcbiAgICAgIHZhciBsaW5lcyA9IFNEUFV0aWxzLnNwbGl0TGluZXMobWVkaWFTZWN0aW9uKTtcbiAgICAgIHZhciBraW5kID0gU0RQVXRpbHMuZ2V0S2luZChtZWRpYVNlY3Rpb24pO1xuICAgICAgLy8gdHJlYXQgYnVuZGxlLW9ubHkgYXMgbm90LXJlamVjdGVkLlxuICAgICAgdmFyIHJlamVjdGVkID0gU0RQVXRpbHMuaXNSZWplY3RlZChtZWRpYVNlY3Rpb24pICYmXG4gICAgICAgICAgU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1idW5kbGUtb25seScpLmxlbmd0aCA9PT0gMDtcbiAgICAgIHZhciBwcm90b2NvbCA9IGxpbmVzWzBdLnN1YnN0cigyKS5zcGxpdCgnICcpWzJdO1xuXG4gICAgICB2YXIgZGlyZWN0aW9uID0gU0RQVXRpbHMuZ2V0RGlyZWN0aW9uKG1lZGlhU2VjdGlvbiwgc2Vzc2lvbnBhcnQpO1xuICAgICAgdmFyIHJlbW90ZU1zaWQgPSBTRFBVdGlscy5wYXJzZU1zaWQobWVkaWFTZWN0aW9uKTtcblxuICAgICAgdmFyIG1pZCA9IFNEUFV0aWxzLmdldE1pZChtZWRpYVNlY3Rpb24pIHx8IFNEUFV0aWxzLmdlbmVyYXRlSWRlbnRpZmllcigpO1xuXG4gICAgICAvLyBSZWplY3QgZGF0YWNoYW5uZWxzIHdoaWNoIGFyZSBub3QgaW1wbGVtZW50ZWQgeWV0LlxuICAgICAgaWYgKChraW5kID09PSAnYXBwbGljYXRpb24nICYmIHByb3RvY29sID09PSAnRFRMUy9TQ1RQJykgfHwgcmVqZWN0ZWQpIHtcbiAgICAgICAgLy8gVE9ETzogdGhpcyBpcyBkYW5nZXJvdXMgaW4gdGhlIGNhc2Ugd2hlcmUgYSBub24tcmVqZWN0ZWQgbS1saW5lXG4gICAgICAgIC8vICAgICBiZWNvbWVzIHJlamVjdGVkLlxuICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0gPSB7XG4gICAgICAgICAgbWlkOiBtaWQsXG4gICAgICAgICAga2luZDoga2luZCxcbiAgICAgICAgICByZWplY3RlZDogdHJ1ZVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICghcmVqZWN0ZWQgJiYgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdICYmXG4gICAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLnJlamVjdGVkKSB7XG4gICAgICAgIC8vIHJlY3ljbGUgYSByZWplY3RlZCB0cmFuc2NlaXZlci5cbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdID0gcGMuX2NyZWF0ZVRyYW5zY2VpdmVyKGtpbmQsIHRydWUpO1xuICAgICAgfVxuXG4gICAgICB2YXIgdHJhbnNjZWl2ZXI7XG4gICAgICB2YXIgaWNlR2F0aGVyZXI7XG4gICAgICB2YXIgaWNlVHJhbnNwb3J0O1xuICAgICAgdmFyIGR0bHNUcmFuc3BvcnQ7XG4gICAgICB2YXIgcnRwUmVjZWl2ZXI7XG4gICAgICB2YXIgc2VuZEVuY29kaW5nUGFyYW1ldGVycztcbiAgICAgIHZhciByZWN2RW5jb2RpbmdQYXJhbWV0ZXJzO1xuICAgICAgdmFyIGxvY2FsQ2FwYWJpbGl0aWVzO1xuXG4gICAgICB2YXIgdHJhY2s7XG4gICAgICAvLyBGSVhNRTogZW5zdXJlIHRoZSBtZWRpYVNlY3Rpb24gaGFzIHJ0Y3AtbXV4IHNldC5cbiAgICAgIHZhciByZW1vdGVDYXBhYmlsaXRpZXMgPSBTRFBVdGlscy5wYXJzZVJ0cFBhcmFtZXRlcnMobWVkaWFTZWN0aW9uKTtcbiAgICAgIHZhciByZW1vdGVJY2VQYXJhbWV0ZXJzO1xuICAgICAgdmFyIHJlbW90ZUR0bHNQYXJhbWV0ZXJzO1xuICAgICAgaWYgKCFyZWplY3RlZCkge1xuICAgICAgICByZW1vdGVJY2VQYXJhbWV0ZXJzID0gU0RQVXRpbHMuZ2V0SWNlUGFyYW1ldGVycyhtZWRpYVNlY3Rpb24sXG4gICAgICAgICAgICBzZXNzaW9ucGFydCk7XG4gICAgICAgIHJlbW90ZUR0bHNQYXJhbWV0ZXJzID0gU0RQVXRpbHMuZ2V0RHRsc1BhcmFtZXRlcnMobWVkaWFTZWN0aW9uLFxuICAgICAgICAgICAgc2Vzc2lvbnBhcnQpO1xuICAgICAgICByZW1vdGVEdGxzUGFyYW1ldGVycy5yb2xlID0gJ2NsaWVudCc7XG4gICAgICB9XG4gICAgICByZWN2RW5jb2RpbmdQYXJhbWV0ZXJzID1cbiAgICAgICAgICBTRFBVdGlscy5wYXJzZVJ0cEVuY29kaW5nUGFyYW1ldGVycyhtZWRpYVNlY3Rpb24pO1xuXG4gICAgICB2YXIgcnRjcFBhcmFtZXRlcnMgPSBTRFBVdGlscy5wYXJzZVJ0Y3BQYXJhbWV0ZXJzKG1lZGlhU2VjdGlvbik7XG5cbiAgICAgIHZhciBpc0NvbXBsZXRlID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLFxuICAgICAgICAgICdhPWVuZC1vZi1jYW5kaWRhdGVzJywgc2Vzc2lvbnBhcnQpLmxlbmd0aCA+IDA7XG4gICAgICB2YXIgY2FuZHMgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPWNhbmRpZGF0ZTonKVxuICAgICAgICAgIC5tYXAoZnVuY3Rpb24oY2FuZCkge1xuICAgICAgICAgICAgcmV0dXJuIFNEUFV0aWxzLnBhcnNlQ2FuZGlkYXRlKGNhbmQpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmZpbHRlcihmdW5jdGlvbihjYW5kKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FuZC5jb21wb25lbnQgPT09IDE7XG4gICAgICAgICAgfSk7XG5cbiAgICAgIC8vIENoZWNrIGlmIHdlIGNhbiB1c2UgQlVORExFIGFuZCBkaXNwb3NlIHRyYW5zcG9ydHMuXG4gICAgICBpZiAoKGRlc2NyaXB0aW9uLnR5cGUgPT09ICdvZmZlcicgfHwgZGVzY3JpcHRpb24udHlwZSA9PT0gJ2Fuc3dlcicpICYmXG4gICAgICAgICAgIXJlamVjdGVkICYmIHVzaW5nQnVuZGxlICYmIHNkcE1MaW5lSW5kZXggPiAwICYmXG4gICAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdKSB7XG4gICAgICAgIHBjLl9kaXNwb3NlSWNlQW5kRHRsc1RyYW5zcG9ydHMoc2RwTUxpbmVJbmRleCk7XG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5pY2VHYXRoZXJlciA9XG4gICAgICAgICAgICBwYy50cmFuc2NlaXZlcnNbMF0uaWNlR2F0aGVyZXI7XG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5pY2VUcmFuc3BvcnQgPVxuICAgICAgICAgICAgcGMudHJhbnNjZWl2ZXJzWzBdLmljZVRyYW5zcG9ydDtcbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmR0bHNUcmFuc3BvcnQgPVxuICAgICAgICAgICAgcGMudHJhbnNjZWl2ZXJzWzBdLmR0bHNUcmFuc3BvcnQ7XG4gICAgICAgIGlmIChwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0ucnRwU2VuZGVyKSB7XG4gICAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLnJ0cFNlbmRlci5zZXRUcmFuc3BvcnQoXG4gICAgICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1swXS5kdGxzVHJhbnNwb3J0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLnJ0cFJlY2VpdmVyKSB7XG4gICAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLnJ0cFJlY2VpdmVyLnNldFRyYW5zcG9ydChcbiAgICAgICAgICAgICAgcGMudHJhbnNjZWl2ZXJzWzBdLmR0bHNUcmFuc3BvcnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZGVzY3JpcHRpb24udHlwZSA9PT0gJ29mZmVyJyAmJiAhcmVqZWN0ZWQpIHtcbiAgICAgICAgdHJhbnNjZWl2ZXIgPSBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0gfHxcbiAgICAgICAgICAgIHBjLl9jcmVhdGVUcmFuc2NlaXZlcihraW5kKTtcbiAgICAgICAgdHJhbnNjZWl2ZXIubWlkID0gbWlkO1xuXG4gICAgICAgIGlmICghdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIpIHtcbiAgICAgICAgICB0cmFuc2NlaXZlci5pY2VHYXRoZXJlciA9IHBjLl9jcmVhdGVJY2VHYXRoZXJlcihzZHBNTGluZUluZGV4LFxuICAgICAgICAgICAgICB1c2luZ0J1bmRsZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2FuZHMubGVuZ3RoICYmIHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydC5zdGF0ZSA9PT0gJ25ldycpIHtcbiAgICAgICAgICBpZiAoaXNDb21wbGV0ZSAmJiAoIXVzaW5nQnVuZGxlIHx8IHNkcE1MaW5lSW5kZXggPT09IDApKSB7XG4gICAgICAgICAgICB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQuc2V0UmVtb3RlQ2FuZGlkYXRlcyhjYW5kcyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhbmRzLmZvckVhY2goZnVuY3Rpb24oY2FuZGlkYXRlKSB7XG4gICAgICAgICAgICAgIG1heWJlQWRkQ2FuZGlkYXRlKHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydCwgY2FuZGlkYXRlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxvY2FsQ2FwYWJpbGl0aWVzID0gd2luZG93LlJUQ1J0cFJlY2VpdmVyLmdldENhcGFiaWxpdGllcyhraW5kKTtcblxuICAgICAgICAvLyBmaWx0ZXIgUlRYIHVudGlsIGFkZGl0aW9uYWwgc3R1ZmYgbmVlZGVkIGZvciBSVFggaXMgaW1wbGVtZW50ZWRcbiAgICAgICAgLy8gaW4gYWRhcHRlci5qc1xuICAgICAgICBpZiAoZWRnZVZlcnNpb24gPCAxNTAxOSkge1xuICAgICAgICAgIGxvY2FsQ2FwYWJpbGl0aWVzLmNvZGVjcyA9IGxvY2FsQ2FwYWJpbGl0aWVzLmNvZGVjcy5maWx0ZXIoXG4gICAgICAgICAgICAgIGZ1bmN0aW9uKGNvZGVjKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvZGVjLm5hbWUgIT09ICdydHgnO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbmRFbmNvZGluZ1BhcmFtZXRlcnMgPSB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzIHx8IFt7XG4gICAgICAgICAgc3NyYzogKDIgKiBzZHBNTGluZUluZGV4ICsgMikgKiAxMDAxXG4gICAgICAgIH1dO1xuXG4gICAgICAgIC8vIFRPRE86IHJld3JpdGUgdG8gdXNlIGh0dHA6Ly93M2MuZ2l0aHViLmlvL3dlYnJ0Yy1wYy8jc2V0LWFzc29jaWF0ZWQtcmVtb3RlLXN0cmVhbXNcbiAgICAgICAgdmFyIGlzTmV3VHJhY2sgPSBmYWxzZTtcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3NlbmRyZWN2JyB8fCBkaXJlY3Rpb24gPT09ICdzZW5kb25seScpIHtcbiAgICAgICAgICBpc05ld1RyYWNrID0gIXRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyO1xuICAgICAgICAgIHJ0cFJlY2VpdmVyID0gdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIgfHxcbiAgICAgICAgICAgICAgbmV3IHdpbmRvdy5SVENSdHBSZWNlaXZlcih0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0LCBraW5kKTtcblxuICAgICAgICAgIGlmIChpc05ld1RyYWNrKSB7XG4gICAgICAgICAgICB2YXIgc3RyZWFtO1xuICAgICAgICAgICAgdHJhY2sgPSBydHBSZWNlaXZlci50cmFjaztcbiAgICAgICAgICAgIC8vIEZJWE1FOiBkb2VzIG5vdCB3b3JrIHdpdGggUGxhbiBCLlxuICAgICAgICAgICAgaWYgKHJlbW90ZU1zaWQgJiYgcmVtb3RlTXNpZC5zdHJlYW0gPT09ICctJykge1xuICAgICAgICAgICAgICAvLyBuby1vcC4gYSBzdHJlYW0gaWQgb2YgJy0nIG1lYW5zOiBubyBhc3NvY2lhdGVkIHN0cmVhbS5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVtb3RlTXNpZCkge1xuICAgICAgICAgICAgICBpZiAoIXN0cmVhbXNbcmVtb3RlTXNpZC5zdHJlYW1dKSB7XG4gICAgICAgICAgICAgICAgc3RyZWFtc1tyZW1vdGVNc2lkLnN0cmVhbV0gPSBuZXcgd2luZG93Lk1lZGlhU3RyZWFtKCk7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHN0cmVhbXNbcmVtb3RlTXNpZC5zdHJlYW1dLCAnaWQnLCB7XG4gICAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVtb3RlTXNpZC5zdHJlYW07XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRyYWNrLCAnaWQnLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiByZW1vdGVNc2lkLnRyYWNrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHN0cmVhbSA9IHN0cmVhbXNbcmVtb3RlTXNpZC5zdHJlYW1dO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKCFzdHJlYW1zLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICAgICBzdHJlYW1zLmRlZmF1bHQgPSBuZXcgd2luZG93Lk1lZGlhU3RyZWFtKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc3RyZWFtID0gc3RyZWFtcy5kZWZhdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN0cmVhbSkge1xuICAgICAgICAgICAgICBhZGRUcmFja1RvU3RyZWFtQW5kRmlyZUV2ZW50KHRyYWNrLCBzdHJlYW0pO1xuICAgICAgICAgICAgICB0cmFuc2NlaXZlci5hc3NvY2lhdGVkUmVtb3RlTWVkaWFTdHJlYW1zLnB1c2goc3RyZWFtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlY2VpdmVyTGlzdC5wdXNoKFt0cmFjaywgcnRwUmVjZWl2ZXIsIHN0cmVhbV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0cmFuc2NlaXZlci5ydHBSZWNlaXZlciAmJiB0cmFuc2NlaXZlci5ydHBSZWNlaXZlci50cmFjaykge1xuICAgICAgICAgIHRyYW5zY2VpdmVyLmFzc29jaWF0ZWRSZW1vdGVNZWRpYVN0cmVhbXMuZm9yRWFjaChmdW5jdGlvbihzKSB7XG4gICAgICAgICAgICB2YXIgbmF0aXZlVHJhY2sgPSBzLmdldFRyYWNrcygpLmZpbmQoZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICByZXR1cm4gdC5pZCA9PT0gdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIudHJhY2suaWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChuYXRpdmVUcmFjaykge1xuICAgICAgICAgICAgICByZW1vdmVUcmFja0Zyb21TdHJlYW1BbmRGaXJlRXZlbnQobmF0aXZlVHJhY2ssIHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRyYW5zY2VpdmVyLmFzc29jaWF0ZWRSZW1vdGVNZWRpYVN0cmVhbXMgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyYW5zY2VpdmVyLmxvY2FsQ2FwYWJpbGl0aWVzID0gbG9jYWxDYXBhYmlsaXRpZXM7XG4gICAgICAgIHRyYW5zY2VpdmVyLnJlbW90ZUNhcGFiaWxpdGllcyA9IHJlbW90ZUNhcGFiaWxpdGllcztcbiAgICAgICAgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIgPSBydHBSZWNlaXZlcjtcbiAgICAgICAgdHJhbnNjZWl2ZXIucnRjcFBhcmFtZXRlcnMgPSBydGNwUGFyYW1ldGVycztcbiAgICAgICAgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVycyA9IHNlbmRFbmNvZGluZ1BhcmFtZXRlcnM7XG4gICAgICAgIHRyYW5zY2VpdmVyLnJlY3ZFbmNvZGluZ1BhcmFtZXRlcnMgPSByZWN2RW5jb2RpbmdQYXJhbWV0ZXJzO1xuXG4gICAgICAgIC8vIFN0YXJ0IHRoZSBSVENSdHBSZWNlaXZlciBub3cuIFRoZSBSVFBTZW5kZXIgaXMgc3RhcnRlZCBpblxuICAgICAgICAvLyBzZXRMb2NhbERlc2NyaXB0aW9uLlxuICAgICAgICBwYy5fdHJhbnNjZWl2ZShwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0sXG4gICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgIGlzTmV3VHJhY2spO1xuICAgICAgfSBlbHNlIGlmIChkZXNjcmlwdGlvbi50eXBlID09PSAnYW5zd2VyJyAmJiAhcmVqZWN0ZWQpIHtcbiAgICAgICAgdHJhbnNjZWl2ZXIgPSBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF07XG4gICAgICAgIGljZUdhdGhlcmVyID0gdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXI7XG4gICAgICAgIGljZVRyYW5zcG9ydCA9IHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydDtcbiAgICAgICAgZHRsc1RyYW5zcG9ydCA9IHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQ7XG4gICAgICAgIHJ0cFJlY2VpdmVyID0gdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXI7XG4gICAgICAgIHNlbmRFbmNvZGluZ1BhcmFtZXRlcnMgPSB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzO1xuICAgICAgICBsb2NhbENhcGFiaWxpdGllcyA9IHRyYW5zY2VpdmVyLmxvY2FsQ2FwYWJpbGl0aWVzO1xuXG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5yZWN2RW5jb2RpbmdQYXJhbWV0ZXJzID1cbiAgICAgICAgICAgIHJlY3ZFbmNvZGluZ1BhcmFtZXRlcnM7XG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5yZW1vdGVDYXBhYmlsaXRpZXMgPVxuICAgICAgICAgICAgcmVtb3RlQ2FwYWJpbGl0aWVzO1xuICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0ucnRjcFBhcmFtZXRlcnMgPSBydGNwUGFyYW1ldGVycztcblxuICAgICAgICBpZiAoY2FuZHMubGVuZ3RoICYmIGljZVRyYW5zcG9ydC5zdGF0ZSA9PT0gJ25ldycpIHtcbiAgICAgICAgICBpZiAoKGlzSWNlTGl0ZSB8fCBpc0NvbXBsZXRlKSAmJlxuICAgICAgICAgICAgICAoIXVzaW5nQnVuZGxlIHx8IHNkcE1MaW5lSW5kZXggPT09IDApKSB7XG4gICAgICAgICAgICBpY2VUcmFuc3BvcnQuc2V0UmVtb3RlQ2FuZGlkYXRlcyhjYW5kcyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhbmRzLmZvckVhY2goZnVuY3Rpb24oY2FuZGlkYXRlKSB7XG4gICAgICAgICAgICAgIG1heWJlQWRkQ2FuZGlkYXRlKHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydCwgY2FuZGlkYXRlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdXNpbmdCdW5kbGUgfHwgc2RwTUxpbmVJbmRleCA9PT0gMCkge1xuICAgICAgICAgIGlmIChpY2VUcmFuc3BvcnQuc3RhdGUgPT09ICduZXcnKSB7XG4gICAgICAgICAgICBpY2VUcmFuc3BvcnQuc3RhcnQoaWNlR2F0aGVyZXIsIHJlbW90ZUljZVBhcmFtZXRlcnMsXG4gICAgICAgICAgICAgICAgJ2NvbnRyb2xsaW5nJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChkdGxzVHJhbnNwb3J0LnN0YXRlID09PSAnbmV3Jykge1xuICAgICAgICAgICAgZHRsc1RyYW5zcG9ydC5zdGFydChyZW1vdGVEdGxzUGFyYW1ldGVycyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcGMuX3RyYW5zY2VpdmUodHJhbnNjZWl2ZXIsXG4gICAgICAgICAgICBkaXJlY3Rpb24gPT09ICdzZW5kcmVjdicgfHwgZGlyZWN0aW9uID09PSAncmVjdm9ubHknLFxuICAgICAgICAgICAgZGlyZWN0aW9uID09PSAnc2VuZHJlY3YnIHx8IGRpcmVjdGlvbiA9PT0gJ3NlbmRvbmx5Jyk7XG5cbiAgICAgICAgLy8gVE9ETzogcmV3cml0ZSB0byB1c2UgaHR0cDovL3czYy5naXRodWIuaW8vd2VicnRjLXBjLyNzZXQtYXNzb2NpYXRlZC1yZW1vdGUtc3RyZWFtc1xuICAgICAgICBpZiAocnRwUmVjZWl2ZXIgJiZcbiAgICAgICAgICAgIChkaXJlY3Rpb24gPT09ICdzZW5kcmVjdicgfHwgZGlyZWN0aW9uID09PSAnc2VuZG9ubHknKSkge1xuICAgICAgICAgIHRyYWNrID0gcnRwUmVjZWl2ZXIudHJhY2s7XG4gICAgICAgICAgaWYgKHJlbW90ZU1zaWQpIHtcbiAgICAgICAgICAgIGlmICghc3RyZWFtc1tyZW1vdGVNc2lkLnN0cmVhbV0pIHtcbiAgICAgICAgICAgICAgc3RyZWFtc1tyZW1vdGVNc2lkLnN0cmVhbV0gPSBuZXcgd2luZG93Lk1lZGlhU3RyZWFtKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhZGRUcmFja1RvU3RyZWFtQW5kRmlyZUV2ZW50KHRyYWNrLCBzdHJlYW1zW3JlbW90ZU1zaWQuc3RyZWFtXSk7XG4gICAgICAgICAgICByZWNlaXZlckxpc3QucHVzaChbdHJhY2ssIHJ0cFJlY2VpdmVyLCBzdHJlYW1zW3JlbW90ZU1zaWQuc3RyZWFtXV0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXN0cmVhbXMuZGVmYXVsdCkge1xuICAgICAgICAgICAgICBzdHJlYW1zLmRlZmF1bHQgPSBuZXcgd2luZG93Lk1lZGlhU3RyZWFtKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhZGRUcmFja1RvU3RyZWFtQW5kRmlyZUV2ZW50KHRyYWNrLCBzdHJlYW1zLmRlZmF1bHQpO1xuICAgICAgICAgICAgcmVjZWl2ZXJMaXN0LnB1c2goW3RyYWNrLCBydHBSZWNlaXZlciwgc3RyZWFtcy5kZWZhdWx0XSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIEZJWE1FOiBhY3R1YWxseSB0aGUgcmVjZWl2ZXIgc2hvdWxkIGJlIGNyZWF0ZWQgbGF0ZXIuXG4gICAgICAgICAgZGVsZXRlIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAocGMuX2R0bHNSb2xlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHBjLl9kdGxzUm9sZSA9IGRlc2NyaXB0aW9uLnR5cGUgPT09ICdvZmZlcicgPyAnYWN0aXZlJyA6ICdwYXNzaXZlJztcbiAgICB9XG5cbiAgICBwYy5yZW1vdGVEZXNjcmlwdGlvbiA9IHtcbiAgICAgIHR5cGU6IGRlc2NyaXB0aW9uLnR5cGUsXG4gICAgICBzZHA6IGRlc2NyaXB0aW9uLnNkcFxuICAgIH07XG4gICAgaWYgKGRlc2NyaXB0aW9uLnR5cGUgPT09ICdvZmZlcicpIHtcbiAgICAgIHBjLl91cGRhdGVTaWduYWxpbmdTdGF0ZSgnaGF2ZS1yZW1vdGUtb2ZmZXInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGMuX3VwZGF0ZVNpZ25hbGluZ1N0YXRlKCdzdGFibGUnKTtcbiAgICB9XG4gICAgT2JqZWN0LmtleXMoc3RyZWFtcykuZm9yRWFjaChmdW5jdGlvbihzaWQpIHtcbiAgICAgIHZhciBzdHJlYW0gPSBzdHJlYW1zW3NpZF07XG4gICAgICBpZiAoc3RyZWFtLmdldFRyYWNrcygpLmxlbmd0aCkge1xuICAgICAgICBpZiAocGMucmVtb3RlU3RyZWFtcy5pbmRleE9mKHN0cmVhbSkgPT09IC0xKSB7XG4gICAgICAgICAgcGMucmVtb3RlU3RyZWFtcy5wdXNoKHN0cmVhbSk7XG4gICAgICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdhZGRzdHJlYW0nKTtcbiAgICAgICAgICBldmVudC5zdHJlYW0gPSBzdHJlYW07XG4gICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBwYy5fZGlzcGF0Y2hFdmVudCgnYWRkc3RyZWFtJywgZXZlbnQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVjZWl2ZXJMaXN0LmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgIHZhciB0cmFjayA9IGl0ZW1bMF07XG4gICAgICAgICAgdmFyIHJlY2VpdmVyID0gaXRlbVsxXTtcbiAgICAgICAgICBpZiAoc3RyZWFtLmlkICE9PSBpdGVtWzJdLmlkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGZpcmVBZGRUcmFjayhwYywgdHJhY2ssIHJlY2VpdmVyLCBbc3RyZWFtXSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJlY2VpdmVyTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGZpcmVBZGRUcmFjayhwYywgaXRlbVswXSwgaXRlbVsxXSwgW10pO1xuICAgIH0pO1xuXG4gICAgLy8gY2hlY2sgd2hldGhlciBhZGRJY2VDYW5kaWRhdGUoe30pIHdhcyBjYWxsZWQgd2l0aGluIGZvdXIgc2Vjb25kcyBhZnRlclxuICAgIC8vIHNldFJlbW90ZURlc2NyaXB0aW9uLlxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCEocGMgJiYgcGMudHJhbnNjZWl2ZXJzKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBwYy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xuICAgICAgICBpZiAodHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0ICYmXG4gICAgICAgICAgICB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQuc3RhdGUgPT09ICduZXcnICYmXG4gICAgICAgICAgICB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQuZ2V0UmVtb3RlQ2FuZGlkYXRlcygpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ1RpbWVvdXQgZm9yIGFkZFJlbW90ZUNhbmRpZGF0ZS4gQ29uc2lkZXIgc2VuZGluZyAnICtcbiAgICAgICAgICAgICAgJ2FuIGVuZC1vZi1jYW5kaWRhdGVzIG5vdGlmaWNhdGlvbicpO1xuICAgICAgICAgIHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydC5hZGRSZW1vdGVDYW5kaWRhdGUoe30pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCA0MDAwKTtcblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnRyYW5zY2VpdmVycy5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XG4gICAgICAvKiBub3QgeWV0XG4gICAgICBpZiAodHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIpIHtcbiAgICAgICAgdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIuY2xvc2UoKTtcbiAgICAgIH1cbiAgICAgICovXG4gICAgICBpZiAodHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0KSB7XG4gICAgICAgIHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydC5zdG9wKCk7XG4gICAgICB9XG4gICAgICBpZiAodHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydCkge1xuICAgICAgICB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0LnN0b3AoKTtcbiAgICAgIH1cbiAgICAgIGlmICh0cmFuc2NlaXZlci5ydHBTZW5kZXIpIHtcbiAgICAgICAgdHJhbnNjZWl2ZXIucnRwU2VuZGVyLnN0b3AoKTtcbiAgICAgIH1cbiAgICAgIGlmICh0cmFuc2NlaXZlci5ydHBSZWNlaXZlcikge1xuICAgICAgICB0cmFuc2NlaXZlci5ydHBSZWNlaXZlci5zdG9wKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgLy8gRklYTUU6IGNsZWFuIHVwIHRyYWNrcywgbG9jYWwgc3RyZWFtcywgcmVtb3RlIHN0cmVhbXMsIGV0Y1xuICAgIHRoaXMuX2lzQ2xvc2VkID0gdHJ1ZTtcbiAgICB0aGlzLl91cGRhdGVTaWduYWxpbmdTdGF0ZSgnY2xvc2VkJyk7XG4gIH07XG5cbiAgLy8gVXBkYXRlIHRoZSBzaWduYWxpbmcgc3RhdGUuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fdXBkYXRlU2lnbmFsaW5nU3RhdGUgPSBmdW5jdGlvbihuZXdTdGF0ZSkge1xuICAgIHRoaXMuc2lnbmFsaW5nU3RhdGUgPSBuZXdTdGF0ZTtcbiAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ3NpZ25hbGluZ3N0YXRlY2hhbmdlJyk7XG4gICAgdGhpcy5fZGlzcGF0Y2hFdmVudCgnc2lnbmFsaW5nc3RhdGVjaGFuZ2UnLCBldmVudCk7XG4gIH07XG5cbiAgLy8gRGV0ZXJtaW5lIHdoZXRoZXIgdG8gZmlyZSB0aGUgbmVnb3RpYXRpb25uZWVkZWQgZXZlbnQuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fbWF5YmVGaXJlTmVnb3RpYXRpb25OZWVkZWQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcGMgPSB0aGlzO1xuICAgIGlmICh0aGlzLnNpZ25hbGluZ1N0YXRlICE9PSAnc3RhYmxlJyB8fCB0aGlzLm5lZWROZWdvdGlhdGlvbiA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLm5lZWROZWdvdGlhdGlvbiA9IHRydWU7XG4gICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBpZiAocGMubmVlZE5lZ290aWF0aW9uKSB7XG4gICAgICAgIHBjLm5lZWROZWdvdGlhdGlvbiA9IGZhbHNlO1xuICAgICAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ25lZ290aWF0aW9ubmVlZGVkJyk7XG4gICAgICAgIHBjLl9kaXNwYXRjaEV2ZW50KCduZWdvdGlhdGlvbm5lZWRlZCcsIGV2ZW50KTtcbiAgICAgIH1cbiAgICB9LCAwKTtcbiAgfTtcblxuICAvLyBVcGRhdGUgdGhlIGljZSBjb25uZWN0aW9uIHN0YXRlLlxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX3VwZGF0ZUljZUNvbm5lY3Rpb25TdGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBuZXdTdGF0ZTtcbiAgICB2YXIgc3RhdGVzID0ge1xuICAgICAgJ25ldyc6IDAsXG4gICAgICBjbG9zZWQ6IDAsXG4gICAgICBjaGVja2luZzogMCxcbiAgICAgIGNvbm5lY3RlZDogMCxcbiAgICAgIGNvbXBsZXRlZDogMCxcbiAgICAgIGRpc2Nvbm5lY3RlZDogMCxcbiAgICAgIGZhaWxlZDogMFxuICAgIH07XG4gICAgdGhpcy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xuICAgICAgc3RhdGVzW3RyYW5zY2VpdmVyLmljZVRyYW5zcG9ydC5zdGF0ZV0rKztcbiAgICB9KTtcblxuICAgIG5ld1N0YXRlID0gJ25ldyc7XG4gICAgaWYgKHN0YXRlcy5mYWlsZWQgPiAwKSB7XG4gICAgICBuZXdTdGF0ZSA9ICdmYWlsZWQnO1xuICAgIH0gZWxzZSBpZiAoc3RhdGVzLmNoZWNraW5nID4gMCkge1xuICAgICAgbmV3U3RhdGUgPSAnY2hlY2tpbmcnO1xuICAgIH0gZWxzZSBpZiAoc3RhdGVzLmRpc2Nvbm5lY3RlZCA+IDApIHtcbiAgICAgIG5ld1N0YXRlID0gJ2Rpc2Nvbm5lY3RlZCc7XG4gICAgfSBlbHNlIGlmIChzdGF0ZXMubmV3ID4gMCkge1xuICAgICAgbmV3U3RhdGUgPSAnbmV3JztcbiAgICB9IGVsc2UgaWYgKHN0YXRlcy5jb25uZWN0ZWQgPiAwKSB7XG4gICAgICBuZXdTdGF0ZSA9ICdjb25uZWN0ZWQnO1xuICAgIH0gZWxzZSBpZiAoc3RhdGVzLmNvbXBsZXRlZCA+IDApIHtcbiAgICAgIG5ld1N0YXRlID0gJ2NvbXBsZXRlZCc7XG4gICAgfVxuXG4gICAgaWYgKG5ld1N0YXRlICE9PSB0aGlzLmljZUNvbm5lY3Rpb25TdGF0ZSkge1xuICAgICAgdGhpcy5pY2VDb25uZWN0aW9uU3RhdGUgPSBuZXdTdGF0ZTtcbiAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgnaWNlY29ubmVjdGlvbnN0YXRlY2hhbmdlJyk7XG4gICAgICB0aGlzLl9kaXNwYXRjaEV2ZW50KCdpY2Vjb25uZWN0aW9uc3RhdGVjaGFuZ2UnLCBldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIC8vIFVwZGF0ZSB0aGUgY29ubmVjdGlvbiBzdGF0ZS5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl91cGRhdGVDb25uZWN0aW9uU3RhdGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgbmV3U3RhdGU7XG4gICAgdmFyIHN0YXRlcyA9IHtcbiAgICAgICduZXcnOiAwLFxuICAgICAgY2xvc2VkOiAwLFxuICAgICAgY29ubmVjdGluZzogMCxcbiAgICAgIGNvbm5lY3RlZDogMCxcbiAgICAgIGNvbXBsZXRlZDogMCxcbiAgICAgIGRpc2Nvbm5lY3RlZDogMCxcbiAgICAgIGZhaWxlZDogMFxuICAgIH07XG4gICAgdGhpcy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xuICAgICAgc3RhdGVzW3RyYW5zY2VpdmVyLmljZVRyYW5zcG9ydC5zdGF0ZV0rKztcbiAgICAgIHN0YXRlc1t0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0LnN0YXRlXSsrO1xuICAgIH0pO1xuICAgIC8vIElDRVRyYW5zcG9ydC5jb21wbGV0ZWQgYW5kIGNvbm5lY3RlZCBhcmUgdGhlIHNhbWUgZm9yIHRoaXMgcHVycG9zZS5cbiAgICBzdGF0ZXMuY29ubmVjdGVkICs9IHN0YXRlcy5jb21wbGV0ZWQ7XG5cbiAgICBuZXdTdGF0ZSA9ICduZXcnO1xuICAgIGlmIChzdGF0ZXMuZmFpbGVkID4gMCkge1xuICAgICAgbmV3U3RhdGUgPSAnZmFpbGVkJztcbiAgICB9IGVsc2UgaWYgKHN0YXRlcy5jb25uZWN0aW5nID4gMCkge1xuICAgICAgbmV3U3RhdGUgPSAnY29ubmVjdGluZyc7XG4gICAgfSBlbHNlIGlmIChzdGF0ZXMuZGlzY29ubmVjdGVkID4gMCkge1xuICAgICAgbmV3U3RhdGUgPSAnZGlzY29ubmVjdGVkJztcbiAgICB9IGVsc2UgaWYgKHN0YXRlcy5uZXcgPiAwKSB7XG4gICAgICBuZXdTdGF0ZSA9ICduZXcnO1xuICAgIH0gZWxzZSBpZiAoc3RhdGVzLmNvbm5lY3RlZCA+IDApIHtcbiAgICAgIG5ld1N0YXRlID0gJ2Nvbm5lY3RlZCc7XG4gICAgfVxuXG4gICAgaWYgKG5ld1N0YXRlICE9PSB0aGlzLmNvbm5lY3Rpb25TdGF0ZSkge1xuICAgICAgdGhpcy5jb25uZWN0aW9uU3RhdGUgPSBuZXdTdGF0ZTtcbiAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgnY29ubmVjdGlvbnN0YXRlY2hhbmdlJyk7XG4gICAgICB0aGlzLl9kaXNwYXRjaEV2ZW50KCdjb25uZWN0aW9uc3RhdGVjaGFuZ2UnLCBldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5jcmVhdGVPZmZlciA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBwYyA9IHRoaXM7XG5cbiAgICBpZiAocGMuX2lzQ2xvc2VkKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobWFrZUVycm9yKCdJbnZhbGlkU3RhdGVFcnJvcicsXG4gICAgICAgICAgJ0NhbiBub3QgY2FsbCBjcmVhdGVPZmZlciBhZnRlciBjbG9zZScpKTtcbiAgICB9XG5cbiAgICB2YXIgbnVtQXVkaW9UcmFja3MgPSBwYy50cmFuc2NlaXZlcnMuZmlsdGVyKGZ1bmN0aW9uKHQpIHtcbiAgICAgIHJldHVybiB0LmtpbmQgPT09ICdhdWRpbyc7XG4gICAgfSkubGVuZ3RoO1xuICAgIHZhciBudW1WaWRlb1RyYWNrcyA9IHBjLnRyYW5zY2VpdmVycy5maWx0ZXIoZnVuY3Rpb24odCkge1xuICAgICAgcmV0dXJuIHQua2luZCA9PT0gJ3ZpZGVvJztcbiAgICB9KS5sZW5ndGg7XG5cbiAgICAvLyBEZXRlcm1pbmUgbnVtYmVyIG9mIGF1ZGlvIGFuZCB2aWRlbyB0cmFja3Mgd2UgbmVlZCB0byBzZW5kL3JlY3YuXG4gICAgdmFyIG9mZmVyT3B0aW9ucyA9IGFyZ3VtZW50c1swXTtcbiAgICBpZiAob2ZmZXJPcHRpb25zKSB7XG4gICAgICAvLyBSZWplY3QgQ2hyb21lIGxlZ2FjeSBjb25zdHJhaW50cy5cbiAgICAgIGlmIChvZmZlck9wdGlvbnMubWFuZGF0b3J5IHx8IG9mZmVyT3B0aW9ucy5vcHRpb25hbCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgICAgJ0xlZ2FjeSBtYW5kYXRvcnkvb3B0aW9uYWwgY29uc3RyYWludHMgbm90IHN1cHBvcnRlZC4nKTtcbiAgICAgIH1cbiAgICAgIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIG51bUF1ZGlvVHJhY2tzID0gMTtcbiAgICAgICAgfSBlbHNlIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBudW1BdWRpb1RyYWNrcyA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbnVtQXVkaW9UcmFja3MgPSBvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvID09PSB0cnVlKSB7XG4gICAgICAgICAgbnVtVmlkZW9UcmFja3MgPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvID09PSBmYWxzZSkge1xuICAgICAgICAgIG51bVZpZGVvVHJhY2tzID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBudW1WaWRlb1RyYWNrcyA9IG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcGMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcbiAgICAgIGlmICh0cmFuc2NlaXZlci5raW5kID09PSAnYXVkaW8nKSB7XG4gICAgICAgIG51bUF1ZGlvVHJhY2tzLS07XG4gICAgICAgIGlmIChudW1BdWRpb1RyYWNrcyA8IDApIHtcbiAgICAgICAgICB0cmFuc2NlaXZlci53YW50UmVjZWl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLmtpbmQgPT09ICd2aWRlbycpIHtcbiAgICAgICAgbnVtVmlkZW9UcmFja3MtLTtcbiAgICAgICAgaWYgKG51bVZpZGVvVHJhY2tzIDwgMCkge1xuICAgICAgICAgIHRyYW5zY2VpdmVyLndhbnRSZWNlaXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIENyZWF0ZSBNLWxpbmVzIGZvciByZWN2b25seSBzdHJlYW1zLlxuICAgIHdoaWxlIChudW1BdWRpb1RyYWNrcyA+IDAgfHwgbnVtVmlkZW9UcmFja3MgPiAwKSB7XG4gICAgICBpZiAobnVtQXVkaW9UcmFja3MgPiAwKSB7XG4gICAgICAgIHBjLl9jcmVhdGVUcmFuc2NlaXZlcignYXVkaW8nKTtcbiAgICAgICAgbnVtQXVkaW9UcmFja3MtLTtcbiAgICAgIH1cbiAgICAgIGlmIChudW1WaWRlb1RyYWNrcyA+IDApIHtcbiAgICAgICAgcGMuX2NyZWF0ZVRyYW5zY2VpdmVyKCd2aWRlbycpO1xuICAgICAgICBudW1WaWRlb1RyYWNrcy0tO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBzZHAgPSBTRFBVdGlscy53cml0ZVNlc3Npb25Cb2lsZXJwbGF0ZShwYy5fc2RwU2Vzc2lvbklkLFxuICAgICAgICBwYy5fc2RwU2Vzc2lvblZlcnNpb24rKyk7XG4gICAgcGMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIsIHNkcE1MaW5lSW5kZXgpIHtcbiAgICAgIC8vIEZvciBlYWNoIHRyYWNrLCBjcmVhdGUgYW4gaWNlIGdhdGhlcmVyLCBpY2UgdHJhbnNwb3J0LFxuICAgICAgLy8gZHRscyB0cmFuc3BvcnQsIHBvdGVudGlhbGx5IHJ0cHNlbmRlciBhbmQgcnRwcmVjZWl2ZXIuXG4gICAgICB2YXIgdHJhY2sgPSB0cmFuc2NlaXZlci50cmFjaztcbiAgICAgIHZhciBraW5kID0gdHJhbnNjZWl2ZXIua2luZDtcbiAgICAgIHZhciBtaWQgPSB0cmFuc2NlaXZlci5taWQgfHwgU0RQVXRpbHMuZ2VuZXJhdGVJZGVudGlmaWVyKCk7XG4gICAgICB0cmFuc2NlaXZlci5taWQgPSBtaWQ7XG5cbiAgICAgIGlmICghdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIpIHtcbiAgICAgICAgdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIgPSBwYy5fY3JlYXRlSWNlR2F0aGVyZXIoc2RwTUxpbmVJbmRleCxcbiAgICAgICAgICAgIHBjLnVzaW5nQnVuZGxlKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGxvY2FsQ2FwYWJpbGl0aWVzID0gd2luZG93LlJUQ1J0cFNlbmRlci5nZXRDYXBhYmlsaXRpZXMoa2luZCk7XG4gICAgICAvLyBmaWx0ZXIgUlRYIHVudGlsIGFkZGl0aW9uYWwgc3R1ZmYgbmVlZGVkIGZvciBSVFggaXMgaW1wbGVtZW50ZWRcbiAgICAgIC8vIGluIGFkYXB0ZXIuanNcbiAgICAgIGlmIChlZGdlVmVyc2lvbiA8IDE1MDE5KSB7XG4gICAgICAgIGxvY2FsQ2FwYWJpbGl0aWVzLmNvZGVjcyA9IGxvY2FsQ2FwYWJpbGl0aWVzLmNvZGVjcy5maWx0ZXIoXG4gICAgICAgICAgICBmdW5jdGlvbihjb2RlYykge1xuICAgICAgICAgICAgICByZXR1cm4gY29kZWMubmFtZSAhPT0gJ3J0eCc7XG4gICAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGxvY2FsQ2FwYWJpbGl0aWVzLmNvZGVjcy5mb3JFYWNoKGZ1bmN0aW9uKGNvZGVjKSB7XG4gICAgICAgIC8vIHdvcmsgYXJvdW5kIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC93ZWJydGMvaXNzdWVzL2RldGFpbD9pZD02NTUyXG4gICAgICAgIC8vIGJ5IGFkZGluZyBsZXZlbC1hc3ltbWV0cnktYWxsb3dlZD0xXG4gICAgICAgIGlmIChjb2RlYy5uYW1lID09PSAnSDI2NCcgJiZcbiAgICAgICAgICAgIGNvZGVjLnBhcmFtZXRlcnNbJ2xldmVsLWFzeW1tZXRyeS1hbGxvd2VkJ10gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGNvZGVjLnBhcmFtZXRlcnNbJ2xldmVsLWFzeW1tZXRyeS1hbGxvd2VkJ10gPSAnMSc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmb3Igc3Vic2VxdWVudCBvZmZlcnMsIHdlIG1pZ2h0IGhhdmUgdG8gcmUtdXNlIHRoZSBwYXlsb2FkXG4gICAgICAgIC8vIHR5cGUgb2YgdGhlIGxhc3Qgb2ZmZXIuXG4gICAgICAgIGlmICh0cmFuc2NlaXZlci5yZW1vdGVDYXBhYmlsaXRpZXMgJiZcbiAgICAgICAgICAgIHRyYW5zY2VpdmVyLnJlbW90ZUNhcGFiaWxpdGllcy5jb2RlY3MpIHtcbiAgICAgICAgICB0cmFuc2NlaXZlci5yZW1vdGVDYXBhYmlsaXRpZXMuY29kZWNzLmZvckVhY2goZnVuY3Rpb24ocmVtb3RlQ29kZWMpIHtcbiAgICAgICAgICAgIGlmIChjb2RlYy5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IHJlbW90ZUNvZGVjLm5hbWUudG9Mb3dlckNhc2UoKSAmJlxuICAgICAgICAgICAgICAgIGNvZGVjLmNsb2NrUmF0ZSA9PT0gcmVtb3RlQ29kZWMuY2xvY2tSYXRlKSB7XG4gICAgICAgICAgICAgIGNvZGVjLnByZWZlcnJlZFBheWxvYWRUeXBlID0gcmVtb3RlQ29kZWMucGF5bG9hZFR5cGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgbG9jYWxDYXBhYmlsaXRpZXMuaGVhZGVyRXh0ZW5zaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGhkckV4dCkge1xuICAgICAgICB2YXIgcmVtb3RlRXh0ZW5zaW9ucyA9IHRyYW5zY2VpdmVyLnJlbW90ZUNhcGFiaWxpdGllcyAmJlxuICAgICAgICAgICAgdHJhbnNjZWl2ZXIucmVtb3RlQ2FwYWJpbGl0aWVzLmhlYWRlckV4dGVuc2lvbnMgfHwgW107XG4gICAgICAgIHJlbW90ZUV4dGVuc2lvbnMuZm9yRWFjaChmdW5jdGlvbihySGRyRXh0KSB7XG4gICAgICAgICAgaWYgKGhkckV4dC51cmkgPT09IHJIZHJFeHQudXJpKSB7XG4gICAgICAgICAgICBoZHJFeHQuaWQgPSBySGRyRXh0LmlkO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgLy8gZ2VuZXJhdGUgYW4gc3NyYyBub3csIHRvIGJlIHVzZWQgbGF0ZXIgaW4gcnRwU2VuZGVyLnNlbmRcbiAgICAgIHZhciBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzID0gdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVycyB8fCBbe1xuICAgICAgICBzc3JjOiAoMiAqIHNkcE1MaW5lSW5kZXggKyAxKSAqIDEwMDFcbiAgICAgIH1dO1xuICAgICAgaWYgKHRyYWNrKSB7XG4gICAgICAgIC8vIGFkZCBSVFhcbiAgICAgICAgaWYgKGVkZ2VWZXJzaW9uID49IDE1MDE5ICYmIGtpbmQgPT09ICd2aWRlbycgJiZcbiAgICAgICAgICAgICFzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCkge1xuICAgICAgICAgIHNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4ID0ge1xuICAgICAgICAgICAgc3NyYzogc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjICsgMVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRyYW5zY2VpdmVyLndhbnRSZWNlaXZlKSB7XG4gICAgICAgIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyID0gbmV3IHdpbmRvdy5SVENSdHBSZWNlaXZlcihcbiAgICAgICAgICAgIHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQsIGtpbmQpO1xuICAgICAgfVxuXG4gICAgICB0cmFuc2NlaXZlci5sb2NhbENhcGFiaWxpdGllcyA9IGxvY2FsQ2FwYWJpbGl0aWVzO1xuICAgICAgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVycyA9IHNlbmRFbmNvZGluZ1BhcmFtZXRlcnM7XG4gICAgfSk7XG5cbiAgICAvLyBhbHdheXMgb2ZmZXIgQlVORExFIGFuZCBkaXNwb3NlIG9uIHJldHVybiBpZiBub3Qgc3VwcG9ydGVkLlxuICAgIGlmIChwYy5fY29uZmlnLmJ1bmRsZVBvbGljeSAhPT0gJ21heC1jb21wYXQnKSB7XG4gICAgICBzZHAgKz0gJ2E9Z3JvdXA6QlVORExFICcgKyBwYy50cmFuc2NlaXZlcnMubWFwKGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgcmV0dXJuIHQubWlkO1xuICAgICAgfSkuam9pbignICcpICsgJ1xcclxcbic7XG4gICAgfVxuICAgIHNkcCArPSAnYT1pY2Utb3B0aW9uczp0cmlja2xlXFxyXFxuJztcblxuICAgIHBjLnRyYW5zY2VpdmVycy5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zY2VpdmVyLCBzZHBNTGluZUluZGV4KSB7XG4gICAgICBzZHAgKz0gd3JpdGVNZWRpYVNlY3Rpb24odHJhbnNjZWl2ZXIsIHRyYW5zY2VpdmVyLmxvY2FsQ2FwYWJpbGl0aWVzLFxuICAgICAgICAgICdvZmZlcicsIHRyYW5zY2VpdmVyLnN0cmVhbSwgcGMuX2R0bHNSb2xlKTtcbiAgICAgIHNkcCArPSAnYT1ydGNwLXJzaXplXFxyXFxuJztcblxuICAgICAgaWYgKHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyICYmIHBjLmljZUdhdGhlcmluZ1N0YXRlICE9PSAnbmV3JyAmJlxuICAgICAgICAgIChzZHBNTGluZUluZGV4ID09PSAwIHx8ICFwYy51c2luZ0J1bmRsZSkpIHtcbiAgICAgICAgdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIuZ2V0TG9jYWxDYW5kaWRhdGVzKCkuZm9yRWFjaChmdW5jdGlvbihjYW5kKSB7XG4gICAgICAgICAgY2FuZC5jb21wb25lbnQgPSAxO1xuICAgICAgICAgIHNkcCArPSAnYT0nICsgU0RQVXRpbHMud3JpdGVDYW5kaWRhdGUoY2FuZCkgKyAnXFxyXFxuJztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyLnN0YXRlID09PSAnY29tcGxldGVkJykge1xuICAgICAgICAgIHNkcCArPSAnYT1lbmQtb2YtY2FuZGlkYXRlc1xcclxcbic7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHZhciBkZXNjID0gbmV3IHdpbmRvdy5SVENTZXNzaW9uRGVzY3JpcHRpb24oe1xuICAgICAgdHlwZTogJ29mZmVyJyxcbiAgICAgIHNkcDogc2RwXG4gICAgfSk7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShkZXNjKTtcbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlQW5zd2VyID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHBjID0gdGhpcztcblxuICAgIGlmIChwYy5faXNDbG9zZWQpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChtYWtlRXJyb3IoJ0ludmFsaWRTdGF0ZUVycm9yJyxcbiAgICAgICAgICAnQ2FuIG5vdCBjYWxsIGNyZWF0ZUFuc3dlciBhZnRlciBjbG9zZScpKTtcbiAgICB9XG5cbiAgICBpZiAoIShwYy5zaWduYWxpbmdTdGF0ZSA9PT0gJ2hhdmUtcmVtb3RlLW9mZmVyJyB8fFxuICAgICAgICBwYy5zaWduYWxpbmdTdGF0ZSA9PT0gJ2hhdmUtbG9jYWwtcHJhbnN3ZXInKSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG1ha2VFcnJvcignSW52YWxpZFN0YXRlRXJyb3InLFxuICAgICAgICAgICdDYW4gbm90IGNhbGwgY3JlYXRlQW5zd2VyIGluIHNpZ25hbGluZ1N0YXRlICcgKyBwYy5zaWduYWxpbmdTdGF0ZSkpO1xuICAgIH1cblxuICAgIHZhciBzZHAgPSBTRFBVdGlscy53cml0ZVNlc3Npb25Cb2lsZXJwbGF0ZShwYy5fc2RwU2Vzc2lvbklkLFxuICAgICAgICBwYy5fc2RwU2Vzc2lvblZlcnNpb24rKyk7XG4gICAgaWYgKHBjLnVzaW5nQnVuZGxlKSB7XG4gICAgICBzZHAgKz0gJ2E9Z3JvdXA6QlVORExFICcgKyBwYy50cmFuc2NlaXZlcnMubWFwKGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgcmV0dXJuIHQubWlkO1xuICAgICAgfSkuam9pbignICcpICsgJ1xcclxcbic7XG4gICAgfVxuICAgIHZhciBtZWRpYVNlY3Rpb25zSW5PZmZlciA9IFNEUFV0aWxzLmdldE1lZGlhU2VjdGlvbnMoXG4gICAgICAgIHBjLnJlbW90ZURlc2NyaXB0aW9uLnNkcCkubGVuZ3RoO1xuICAgIHBjLnRyYW5zY2VpdmVycy5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zY2VpdmVyLCBzZHBNTGluZUluZGV4KSB7XG4gICAgICBpZiAoc2RwTUxpbmVJbmRleCArIDEgPiBtZWRpYVNlY3Rpb25zSW5PZmZlcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAodHJhbnNjZWl2ZXIucmVqZWN0ZWQpIHtcbiAgICAgICAgaWYgKHRyYW5zY2VpdmVyLmtpbmQgPT09ICdhcHBsaWNhdGlvbicpIHtcbiAgICAgICAgICBzZHAgKz0gJ209YXBwbGljYXRpb24gMCBEVExTL1NDVFAgNTAwMFxcclxcbic7XG4gICAgICAgIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIua2luZCA9PT0gJ2F1ZGlvJykge1xuICAgICAgICAgIHNkcCArPSAnbT1hdWRpbyAwIFVEUC9UTFMvUlRQL1NBVlBGIDBcXHJcXG4nICtcbiAgICAgICAgICAgICAgJ2E9cnRwbWFwOjAgUENNVS84MDAwXFxyXFxuJztcbiAgICAgICAgfSBlbHNlIGlmICh0cmFuc2NlaXZlci5raW5kID09PSAndmlkZW8nKSB7XG4gICAgICAgICAgc2RwICs9ICdtPXZpZGVvIDAgVURQL1RMUy9SVFAvU0FWUEYgMTIwXFxyXFxuJyArXG4gICAgICAgICAgICAgICdhPXJ0cG1hcDoxMjAgVlA4LzkwMDAwXFxyXFxuJztcbiAgICAgICAgfVxuICAgICAgICBzZHAgKz0gJ2M9SU4gSVA0IDAuMC4wLjBcXHJcXG4nICtcbiAgICAgICAgICAgICdhPWluYWN0aXZlXFxyXFxuJyArXG4gICAgICAgICAgICAnYT1taWQ6JyArIHRyYW5zY2VpdmVyLm1pZCArICdcXHJcXG4nO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIEZJWE1FOiBsb29rIGF0IGRpcmVjdGlvbi5cbiAgICAgIGlmICh0cmFuc2NlaXZlci5zdHJlYW0pIHtcbiAgICAgICAgdmFyIGxvY2FsVHJhY2s7XG4gICAgICAgIGlmICh0cmFuc2NlaXZlci5raW5kID09PSAnYXVkaW8nKSB7XG4gICAgICAgICAgbG9jYWxUcmFjayA9IHRyYW5zY2VpdmVyLnN0cmVhbS5nZXRBdWRpb1RyYWNrcygpWzBdO1xuICAgICAgICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLmtpbmQgPT09ICd2aWRlbycpIHtcbiAgICAgICAgICBsb2NhbFRyYWNrID0gdHJhbnNjZWl2ZXIuc3RyZWFtLmdldFZpZGVvVHJhY2tzKClbMF07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxvY2FsVHJhY2spIHtcbiAgICAgICAgICAvLyBhZGQgUlRYXG4gICAgICAgICAgaWYgKGVkZ2VWZXJzaW9uID49IDE1MDE5ICYmIHRyYW5zY2VpdmVyLmtpbmQgPT09ICd2aWRlbycgJiZcbiAgICAgICAgICAgICAgIXRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4KSB7XG4gICAgICAgICAgICB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCA9IHtcbiAgICAgICAgICAgICAgc3NyYzogdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjICsgMVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQ2FsY3VsYXRlIGludGVyc2VjdGlvbiBvZiBjYXBhYmlsaXRpZXMuXG4gICAgICB2YXIgY29tbW9uQ2FwYWJpbGl0aWVzID0gZ2V0Q29tbW9uQ2FwYWJpbGl0aWVzKFxuICAgICAgICAgIHRyYW5zY2VpdmVyLmxvY2FsQ2FwYWJpbGl0aWVzLFxuICAgICAgICAgIHRyYW5zY2VpdmVyLnJlbW90ZUNhcGFiaWxpdGllcyk7XG5cbiAgICAgIHZhciBoYXNSdHggPSBjb21tb25DYXBhYmlsaXRpZXMuY29kZWNzLmZpbHRlcihmdW5jdGlvbihjKSB7XG4gICAgICAgIHJldHVybiBjLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3J0eCc7XG4gICAgICB9KS5sZW5ndGg7XG4gICAgICBpZiAoIWhhc1J0eCAmJiB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCkge1xuICAgICAgICBkZWxldGUgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHg7XG4gICAgICB9XG5cbiAgICAgIHNkcCArPSB3cml0ZU1lZGlhU2VjdGlvbih0cmFuc2NlaXZlciwgY29tbW9uQ2FwYWJpbGl0aWVzLFxuICAgICAgICAgICdhbnN3ZXInLCB0cmFuc2NlaXZlci5zdHJlYW0sIHBjLl9kdGxzUm9sZSk7XG4gICAgICBpZiAodHJhbnNjZWl2ZXIucnRjcFBhcmFtZXRlcnMgJiZcbiAgICAgICAgICB0cmFuc2NlaXZlci5ydGNwUGFyYW1ldGVycy5yZWR1Y2VkU2l6ZSkge1xuICAgICAgICBzZHAgKz0gJ2E9cnRjcC1yc2l6ZVxcclxcbic7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB2YXIgZGVzYyA9IG5ldyB3aW5kb3cuUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKHtcbiAgICAgIHR5cGU6ICdhbnN3ZXInLFxuICAgICAgc2RwOiBzZHBcbiAgICB9KTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRlc2MpO1xuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRJY2VDYW5kaWRhdGUgPSBmdW5jdGlvbihjYW5kaWRhdGUpIHtcbiAgICB2YXIgcGMgPSB0aGlzO1xuICAgIHZhciBzZWN0aW9ucztcbiAgICBpZiAoY2FuZGlkYXRlICYmICEoY2FuZGlkYXRlLnNkcE1MaW5lSW5kZXggIT09IHVuZGVmaW5lZCB8fFxuICAgICAgICBjYW5kaWRhdGUuc2RwTWlkKSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoJ3NkcE1MaW5lSW5kZXggb3Igc2RwTWlkIHJlcXVpcmVkJykpO1xuICAgIH1cblxuICAgIC8vIFRPRE86IG5lZWRzIHRvIGdvIGludG8gb3BzIHF1ZXVlLlxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGlmICghcGMucmVtb3RlRGVzY3JpcHRpb24pIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdChtYWtlRXJyb3IoJ0ludmFsaWRTdGF0ZUVycm9yJyxcbiAgICAgICAgICAgICdDYW4gbm90IGFkZCBJQ0UgY2FuZGlkYXRlIHdpdGhvdXQgYSByZW1vdGUgZGVzY3JpcHRpb24nKSk7XG4gICAgICB9IGVsc2UgaWYgKCFjYW5kaWRhdGUgfHwgY2FuZGlkYXRlLmNhbmRpZGF0ZSA9PT0gJycpIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBwYy50cmFuc2NlaXZlcnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBpZiAocGMudHJhbnNjZWl2ZXJzW2pdLnJlamVjdGVkKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcGMudHJhbnNjZWl2ZXJzW2pdLmljZVRyYW5zcG9ydC5hZGRSZW1vdGVDYW5kaWRhdGUoe30pO1xuICAgICAgICAgIHNlY3Rpb25zID0gU0RQVXRpbHMuZ2V0TWVkaWFTZWN0aW9ucyhwYy5yZW1vdGVEZXNjcmlwdGlvbi5zZHApO1xuICAgICAgICAgIHNlY3Rpb25zW2pdICs9ICdhPWVuZC1vZi1jYW5kaWRhdGVzXFxyXFxuJztcbiAgICAgICAgICBwYy5yZW1vdGVEZXNjcmlwdGlvbi5zZHAgPVxuICAgICAgICAgICAgICBTRFBVdGlscy5nZXREZXNjcmlwdGlvbihwYy5yZW1vdGVEZXNjcmlwdGlvbi5zZHApICtcbiAgICAgICAgICAgICAgc2VjdGlvbnMuam9pbignJyk7XG4gICAgICAgICAgaWYgKHBjLnVzaW5nQnVuZGxlKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBzZHBNTGluZUluZGV4ID0gY2FuZGlkYXRlLnNkcE1MaW5lSW5kZXg7XG4gICAgICAgIGlmIChjYW5kaWRhdGUuc2RwTWlkKSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYy50cmFuc2NlaXZlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChwYy50cmFuc2NlaXZlcnNbaV0ubWlkID09PSBjYW5kaWRhdGUuc2RwTWlkKSB7XG4gICAgICAgICAgICAgIHNkcE1MaW5lSW5kZXggPSBpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRyYW5zY2VpdmVyID0gcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdO1xuICAgICAgICBpZiAodHJhbnNjZWl2ZXIpIHtcbiAgICAgICAgICBpZiAodHJhbnNjZWl2ZXIucmVqZWN0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBjYW5kID0gT2JqZWN0LmtleXMoY2FuZGlkYXRlLmNhbmRpZGF0ZSkubGVuZ3RoID4gMCA/XG4gICAgICAgICAgICAgIFNEUFV0aWxzLnBhcnNlQ2FuZGlkYXRlKGNhbmRpZGF0ZS5jYW5kaWRhdGUpIDoge307XG4gICAgICAgICAgLy8gSWdub3JlIENocm9tZSdzIGludmFsaWQgY2FuZGlkYXRlcyBzaW5jZSBFZGdlIGRvZXMgbm90IGxpa2UgdGhlbS5cbiAgICAgICAgICBpZiAoY2FuZC5wcm90b2NvbCA9PT0gJ3RjcCcgJiYgKGNhbmQucG9ydCA9PT0gMCB8fCBjYW5kLnBvcnQgPT09IDkpKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBJZ25vcmUgUlRDUCBjYW5kaWRhdGVzLCB3ZSBhc3N1bWUgUlRDUC1NVVguXG4gICAgICAgICAgaWYgKGNhbmQuY29tcG9uZW50ICYmIGNhbmQuY29tcG9uZW50ICE9PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyB3aGVuIHVzaW5nIGJ1bmRsZSwgYXZvaWQgYWRkaW5nIGNhbmRpZGF0ZXMgdG8gdGhlIHdyb25nXG4gICAgICAgICAgLy8gaWNlIHRyYW5zcG9ydC4gQW5kIGF2b2lkIGFkZGluZyBjYW5kaWRhdGVzIGFkZGVkIGluIHRoZSBTRFAuXG4gICAgICAgICAgaWYgKHNkcE1MaW5lSW5kZXggPT09IDAgfHwgKHNkcE1MaW5lSW5kZXggPiAwICYmXG4gICAgICAgICAgICAgIHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydCAhPT0gcGMudHJhbnNjZWl2ZXJzWzBdLmljZVRyYW5zcG9ydCkpIHtcbiAgICAgICAgICAgIGlmICghbWF5YmVBZGRDYW5kaWRhdGUodHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LCBjYW5kKSkge1xuICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KG1ha2VFcnJvcignT3BlcmF0aW9uRXJyb3InLFxuICAgICAgICAgICAgICAgICAgJ0NhbiBub3QgYWRkIElDRSBjYW5kaWRhdGUnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gdXBkYXRlIHRoZSByZW1vdGVEZXNjcmlwdGlvbi5cbiAgICAgICAgICB2YXIgY2FuZGlkYXRlU3RyaW5nID0gY2FuZGlkYXRlLmNhbmRpZGF0ZS50cmltKCk7XG4gICAgICAgICAgaWYgKGNhbmRpZGF0ZVN0cmluZy5pbmRleE9mKCdhPScpID09PSAwKSB7XG4gICAgICAgICAgICBjYW5kaWRhdGVTdHJpbmcgPSBjYW5kaWRhdGVTdHJpbmcuc3Vic3RyKDIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzZWN0aW9ucyA9IFNEUFV0aWxzLmdldE1lZGlhU2VjdGlvbnMocGMucmVtb3RlRGVzY3JpcHRpb24uc2RwKTtcbiAgICAgICAgICBzZWN0aW9uc1tzZHBNTGluZUluZGV4XSArPSAnYT0nICtcbiAgICAgICAgICAgICAgKGNhbmQudHlwZSA/IGNhbmRpZGF0ZVN0cmluZyA6ICdlbmQtb2YtY2FuZGlkYXRlcycpXG4gICAgICAgICAgICAgICsgJ1xcclxcbic7XG4gICAgICAgICAgcGMucmVtb3RlRGVzY3JpcHRpb24uc2RwID1cbiAgICAgICAgICAgICAgU0RQVXRpbHMuZ2V0RGVzY3JpcHRpb24ocGMucmVtb3RlRGVzY3JpcHRpb24uc2RwKSArXG4gICAgICAgICAgICAgIHNlY3Rpb25zLmpvaW4oJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiByZWplY3QobWFrZUVycm9yKCdPcGVyYXRpb25FcnJvcicsXG4gICAgICAgICAgICAgICdDYW4gbm90IGFkZCBJQ0UgY2FuZGlkYXRlJykpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFN0YXRzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHByb21pc2VzID0gW107XG4gICAgdGhpcy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xuICAgICAgWydydHBTZW5kZXInLCAncnRwUmVjZWl2ZXInLCAnaWNlR2F0aGVyZXInLCAnaWNlVHJhbnNwb3J0JyxcbiAgICAgICAgICAnZHRsc1RyYW5zcG9ydCddLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgICAgICBpZiAodHJhbnNjZWl2ZXJbbWV0aG9kXSkge1xuICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKHRyYW5zY2VpdmVyW21ldGhvZF0uZ2V0U3RhdHMoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgdmFyIGZpeFN0YXRzVHlwZSA9IGZ1bmN0aW9uKHN0YXQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGluYm91bmRydHA6ICdpbmJvdW5kLXJ0cCcsXG4gICAgICAgIG91dGJvdW5kcnRwOiAnb3V0Ym91bmQtcnRwJyxcbiAgICAgICAgY2FuZGlkYXRlcGFpcjogJ2NhbmRpZGF0ZS1wYWlyJyxcbiAgICAgICAgbG9jYWxjYW5kaWRhdGU6ICdsb2NhbC1jYW5kaWRhdGUnLFxuICAgICAgICByZW1vdGVjYW5kaWRhdGU6ICdyZW1vdGUtY2FuZGlkYXRlJ1xuICAgICAgfVtzdGF0LnR5cGVdIHx8IHN0YXQudHlwZTtcbiAgICB9O1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICAvLyBzaGltIGdldFN0YXRzIHdpdGggbWFwbGlrZSBzdXBwb3J0XG4gICAgICB2YXIgcmVzdWx0cyA9IG5ldyBNYXAoKTtcbiAgICAgIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICByZXMuZm9yRWFjaChmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICBPYmplY3Qua2V5cyhyZXN1bHQpLmZvckVhY2goZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgICAgIHJlc3VsdFtpZF0udHlwZSA9IGZpeFN0YXRzVHlwZShyZXN1bHRbaWRdKTtcbiAgICAgICAgICAgIHJlc3VsdHMuc2V0KGlkLCByZXN1bHRbaWRdKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJlc29sdmUocmVzdWx0cyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBsZWdhY3kgY2FsbGJhY2sgc2hpbXMuIFNob3VsZCBiZSBtb3ZlZCB0byBhZGFwdGVyLmpzIHNvbWUgZGF5cy5cbiAgdmFyIG1ldGhvZHMgPSBbJ2NyZWF0ZU9mZmVyJywgJ2NyZWF0ZUFuc3dlciddO1xuICBtZXRob2RzLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgdmFyIG5hdGl2ZU1ldGhvZCA9IFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdO1xuICAgIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIGlmICh0eXBlb2YgYXJnc1swXSA9PT0gJ2Z1bmN0aW9uJyB8fFxuICAgICAgICAgIHR5cGVvZiBhcmdzWzFdID09PSAnZnVuY3Rpb24nKSB7IC8vIGxlZ2FjeVxuICAgICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHRoaXMsIFthcmd1bWVudHNbMl1dKVxuICAgICAgICAudGhlbihmdW5jdGlvbihkZXNjcmlwdGlvbikge1xuICAgICAgICAgIGlmICh0eXBlb2YgYXJnc1swXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgYXJnc1swXS5hcHBseShudWxsLCBbZGVzY3JpcHRpb25dKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBhcmdzWzFdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBhcmdzWzFdLmFwcGx5KG51bGwsIFtlcnJvcl0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfSk7XG5cbiAgbWV0aG9kcyA9IFsnc2V0TG9jYWxEZXNjcmlwdGlvbicsICdzZXRSZW1vdGVEZXNjcmlwdGlvbicsICdhZGRJY2VDYW5kaWRhdGUnXTtcbiAgbWV0aG9kcy5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgIHZhciBuYXRpdmVNZXRob2QgPSBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXTtcbiAgICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICBpZiAodHlwZW9mIGFyZ3NbMV0gPT09ICdmdW5jdGlvbicgfHxcbiAgICAgICAgICB0eXBlb2YgYXJnc1syXSA9PT0gJ2Z1bmN0aW9uJykgeyAvLyBsZWdhY3lcbiAgICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICh0eXBlb2YgYXJnc1sxXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgYXJnc1sxXS5hcHBseShudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBhcmdzWzJdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBhcmdzWzJdLmFwcGx5KG51bGwsIFtlcnJvcl0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfSk7XG5cbiAgLy8gZ2V0U3RhdHMgaXMgc3BlY2lhbC4gSXQgZG9lc24ndCBoYXZlIGEgc3BlYyBsZWdhY3kgbWV0aG9kIHlldCB3ZSBzdXBwb3J0XG4gIC8vIGdldFN0YXRzKHNvbWV0aGluZywgY2IpIHdpdGhvdXQgZXJyb3IgY2FsbGJhY2tzLlxuICBbJ2dldFN0YXRzJ10uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICB2YXIgbmF0aXZlTWV0aG9kID0gUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF07XG4gICAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgaWYgKHR5cGVvZiBhcmdzWzFdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGFyZ3NbMV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGFyZ3NbMV0uYXBwbHkobnVsbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9KTtcblxuICByZXR1cm4gUlRDUGVlckNvbm5lY3Rpb247XG59O1xuXG59LHtcInNkcFwiOjJ9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cbid1c2Ugc3RyaWN0JztcblxuLy8gU0RQIGhlbHBlcnMuXG52YXIgU0RQVXRpbHMgPSB7fTtcblxuLy8gR2VuZXJhdGUgYW4gYWxwaGFudW1lcmljIGlkZW50aWZpZXIgZm9yIGNuYW1lIG9yIG1pZHMuXG4vLyBUT0RPOiB1c2UgVVVJRHMgaW5zdGVhZD8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vamVkLzk4Mjg4M1xuU0RQVXRpbHMuZ2VuZXJhdGVJZGVudGlmaWVyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgMTApO1xufTtcblxuLy8gVGhlIFJUQ1AgQ05BTUUgdXNlZCBieSBhbGwgcGVlcmNvbm5lY3Rpb25zIGZyb20gdGhlIHNhbWUgSlMuXG5TRFBVdGlscy5sb2NhbENOYW1lID0gU0RQVXRpbHMuZ2VuZXJhdGVJZGVudGlmaWVyKCk7XG5cbi8vIFNwbGl0cyBTRFAgaW50byBsaW5lcywgZGVhbGluZyB3aXRoIGJvdGggQ1JMRiBhbmQgTEYuXG5TRFBVdGlscy5zcGxpdExpbmVzID0gZnVuY3Rpb24oYmxvYikge1xuICByZXR1cm4gYmxvYi50cmltKCkuc3BsaXQoJ1xcbicpLm1hcChmdW5jdGlvbihsaW5lKSB7XG4gICAgcmV0dXJuIGxpbmUudHJpbSgpO1xuICB9KTtcbn07XG4vLyBTcGxpdHMgU0RQIGludG8gc2Vzc2lvbnBhcnQgYW5kIG1lZGlhc2VjdGlvbnMuIEVuc3VyZXMgQ1JMRi5cblNEUFV0aWxzLnNwbGl0U2VjdGlvbnMgPSBmdW5jdGlvbihibG9iKSB7XG4gIHZhciBwYXJ0cyA9IGJsb2Iuc3BsaXQoJ1xcbm09Jyk7XG4gIHJldHVybiBwYXJ0cy5tYXAoZnVuY3Rpb24ocGFydCwgaW5kZXgpIHtcbiAgICByZXR1cm4gKGluZGV4ID4gMCA/ICdtPScgKyBwYXJ0IDogcGFydCkudHJpbSgpICsgJ1xcclxcbic7XG4gIH0pO1xufTtcblxuLy8gcmV0dXJucyB0aGUgc2Vzc2lvbiBkZXNjcmlwdGlvbi5cblNEUFV0aWxzLmdldERlc2NyaXB0aW9uID0gZnVuY3Rpb24oYmxvYikge1xuICB2YXIgc2VjdGlvbnMgPSBTRFBVdGlscy5zcGxpdFNlY3Rpb25zKGJsb2IpO1xuICByZXR1cm4gc2VjdGlvbnMgJiYgc2VjdGlvbnNbMF07XG59O1xuXG4vLyByZXR1cm5zIHRoZSBpbmRpdmlkdWFsIG1lZGlhIHNlY3Rpb25zLlxuU0RQVXRpbHMuZ2V0TWVkaWFTZWN0aW9ucyA9IGZ1bmN0aW9uKGJsb2IpIHtcbiAgdmFyIHNlY3Rpb25zID0gU0RQVXRpbHMuc3BsaXRTZWN0aW9ucyhibG9iKTtcbiAgc2VjdGlvbnMuc2hpZnQoKTtcbiAgcmV0dXJuIHNlY3Rpb25zO1xufTtcblxuLy8gUmV0dXJucyBsaW5lcyB0aGF0IHN0YXJ0IHdpdGggYSBjZXJ0YWluIHByZWZpeC5cblNEUFV0aWxzLm1hdGNoUHJlZml4ID0gZnVuY3Rpb24oYmxvYiwgcHJlZml4KSB7XG4gIHJldHVybiBTRFBVdGlscy5zcGxpdExpbmVzKGJsb2IpLmZpbHRlcihmdW5jdGlvbihsaW5lKSB7XG4gICAgcmV0dXJuIGxpbmUuaW5kZXhPZihwcmVmaXgpID09PSAwO1xuICB9KTtcbn07XG5cbi8vIFBhcnNlcyBhbiBJQ0UgY2FuZGlkYXRlIGxpbmUuIFNhbXBsZSBpbnB1dDpcbi8vIGNhbmRpZGF0ZTo3MDI3ODYzNTAgMiB1ZHAgNDE4MTk5MDIgOC44LjguOCA2MDc2OSB0eXAgcmVsYXkgcmFkZHIgOC44LjguOFxuLy8gcnBvcnQgNTU5OTZcIlxuU0RQVXRpbHMucGFyc2VDYW5kaWRhdGUgPSBmdW5jdGlvbihsaW5lKSB7XG4gIHZhciBwYXJ0cztcbiAgLy8gUGFyc2UgYm90aCB2YXJpYW50cy5cbiAgaWYgKGxpbmUuaW5kZXhPZignYT1jYW5kaWRhdGU6JykgPT09IDApIHtcbiAgICBwYXJ0cyA9IGxpbmUuc3Vic3RyaW5nKDEyKS5zcGxpdCgnICcpO1xuICB9IGVsc2Uge1xuICAgIHBhcnRzID0gbGluZS5zdWJzdHJpbmcoMTApLnNwbGl0KCcgJyk7XG4gIH1cblxuICB2YXIgY2FuZGlkYXRlID0ge1xuICAgIGZvdW5kYXRpb246IHBhcnRzWzBdLFxuICAgIGNvbXBvbmVudDogcGFyc2VJbnQocGFydHNbMV0sIDEwKSxcbiAgICBwcm90b2NvbDogcGFydHNbMl0udG9Mb3dlckNhc2UoKSxcbiAgICBwcmlvcml0eTogcGFyc2VJbnQocGFydHNbM10sIDEwKSxcbiAgICBpcDogcGFydHNbNF0sXG4gICAgcG9ydDogcGFyc2VJbnQocGFydHNbNV0sIDEwKSxcbiAgICAvLyBza2lwIHBhcnRzWzZdID09ICd0eXAnXG4gICAgdHlwZTogcGFydHNbN11cbiAgfTtcblxuICBmb3IgKHZhciBpID0gODsgaSA8IHBhcnRzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgc3dpdGNoIChwYXJ0c1tpXSkge1xuICAgICAgY2FzZSAncmFkZHInOlxuICAgICAgICBjYW5kaWRhdGUucmVsYXRlZEFkZHJlc3MgPSBwYXJ0c1tpICsgMV07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncnBvcnQnOlxuICAgICAgICBjYW5kaWRhdGUucmVsYXRlZFBvcnQgPSBwYXJzZUludChwYXJ0c1tpICsgMV0sIDEwKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0Y3B0eXBlJzpcbiAgICAgICAgY2FuZGlkYXRlLnRjcFR5cGUgPSBwYXJ0c1tpICsgMV07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndWZyYWcnOlxuICAgICAgICBjYW5kaWRhdGUudWZyYWcgPSBwYXJ0c1tpICsgMV07IC8vIGZvciBiYWNrd2FyZCBjb21wYWJpbGl0eS5cbiAgICAgICAgY2FuZGlkYXRlLnVzZXJuYW1lRnJhZ21lbnQgPSBwYXJ0c1tpICsgMV07XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDogLy8gZXh0ZW5zaW9uIGhhbmRsaW5nLCBpbiBwYXJ0aWN1bGFyIHVmcmFnXG4gICAgICAgIGNhbmRpZGF0ZVtwYXJ0c1tpXV0gPSBwYXJ0c1tpICsgMV07XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY2FuZGlkYXRlO1xufTtcblxuLy8gVHJhbnNsYXRlcyBhIGNhbmRpZGF0ZSBvYmplY3QgaW50byBTRFAgY2FuZGlkYXRlIGF0dHJpYnV0ZS5cblNEUFV0aWxzLndyaXRlQ2FuZGlkYXRlID0gZnVuY3Rpb24oY2FuZGlkYXRlKSB7XG4gIHZhciBzZHAgPSBbXTtcbiAgc2RwLnB1c2goY2FuZGlkYXRlLmZvdW5kYXRpb24pO1xuICBzZHAucHVzaChjYW5kaWRhdGUuY29tcG9uZW50KTtcbiAgc2RwLnB1c2goY2FuZGlkYXRlLnByb3RvY29sLnRvVXBwZXJDYXNlKCkpO1xuICBzZHAucHVzaChjYW5kaWRhdGUucHJpb3JpdHkpO1xuICBzZHAucHVzaChjYW5kaWRhdGUuaXApO1xuICBzZHAucHVzaChjYW5kaWRhdGUucG9ydCk7XG5cbiAgdmFyIHR5cGUgPSBjYW5kaWRhdGUudHlwZTtcbiAgc2RwLnB1c2goJ3R5cCcpO1xuICBzZHAucHVzaCh0eXBlKTtcbiAgaWYgKHR5cGUgIT09ICdob3N0JyAmJiBjYW5kaWRhdGUucmVsYXRlZEFkZHJlc3MgJiZcbiAgICAgIGNhbmRpZGF0ZS5yZWxhdGVkUG9ydCkge1xuICAgIHNkcC5wdXNoKCdyYWRkcicpO1xuICAgIHNkcC5wdXNoKGNhbmRpZGF0ZS5yZWxhdGVkQWRkcmVzcyk7IC8vIHdhczogcmVsQWRkclxuICAgIHNkcC5wdXNoKCdycG9ydCcpO1xuICAgIHNkcC5wdXNoKGNhbmRpZGF0ZS5yZWxhdGVkUG9ydCk7IC8vIHdhczogcmVsUG9ydFxuICB9XG4gIGlmIChjYW5kaWRhdGUudGNwVHlwZSAmJiBjYW5kaWRhdGUucHJvdG9jb2wudG9Mb3dlckNhc2UoKSA9PT0gJ3RjcCcpIHtcbiAgICBzZHAucHVzaCgndGNwdHlwZScpO1xuICAgIHNkcC5wdXNoKGNhbmRpZGF0ZS50Y3BUeXBlKTtcbiAgfVxuICBpZiAoY2FuZGlkYXRlLnVzZXJuYW1lRnJhZ21lbnQgfHwgY2FuZGlkYXRlLnVmcmFnKSB7XG4gICAgc2RwLnB1c2goJ3VmcmFnJyk7XG4gICAgc2RwLnB1c2goY2FuZGlkYXRlLnVzZXJuYW1lRnJhZ21lbnQgfHwgY2FuZGlkYXRlLnVmcmFnKTtcbiAgfVxuICByZXR1cm4gJ2NhbmRpZGF0ZTonICsgc2RwLmpvaW4oJyAnKTtcbn07XG5cbi8vIFBhcnNlcyBhbiBpY2Utb3B0aW9ucyBsaW5lLCByZXR1cm5zIGFuIGFycmF5IG9mIG9wdGlvbiB0YWdzLlxuLy8gYT1pY2Utb3B0aW9uczpmb28gYmFyXG5TRFBVdGlscy5wYXJzZUljZU9wdGlvbnMgPSBmdW5jdGlvbihsaW5lKSB7XG4gIHJldHVybiBsaW5lLnN1YnN0cigxNCkuc3BsaXQoJyAnKTtcbn1cblxuLy8gUGFyc2VzIGFuIHJ0cG1hcCBsaW5lLCByZXR1cm5zIFJUQ1J0cENvZGRlY1BhcmFtZXRlcnMuIFNhbXBsZSBpbnB1dDpcbi8vIGE9cnRwbWFwOjExMSBvcHVzLzQ4MDAwLzJcblNEUFV0aWxzLnBhcnNlUnRwTWFwID0gZnVuY3Rpb24obGluZSkge1xuICB2YXIgcGFydHMgPSBsaW5lLnN1YnN0cig5KS5zcGxpdCgnICcpO1xuICB2YXIgcGFyc2VkID0ge1xuICAgIHBheWxvYWRUeXBlOiBwYXJzZUludChwYXJ0cy5zaGlmdCgpLCAxMCkgLy8gd2FzOiBpZFxuICB9O1xuXG4gIHBhcnRzID0gcGFydHNbMF0uc3BsaXQoJy8nKTtcblxuICBwYXJzZWQubmFtZSA9IHBhcnRzWzBdO1xuICBwYXJzZWQuY2xvY2tSYXRlID0gcGFyc2VJbnQocGFydHNbMV0sIDEwKTsgLy8gd2FzOiBjbG9ja3JhdGVcbiAgLy8gd2FzOiBjaGFubmVsc1xuICBwYXJzZWQubnVtQ2hhbm5lbHMgPSBwYXJ0cy5sZW5ndGggPT09IDMgPyBwYXJzZUludChwYXJ0c1syXSwgMTApIDogMTtcbiAgcmV0dXJuIHBhcnNlZDtcbn07XG5cbi8vIEdlbmVyYXRlIGFuIGE9cnRwbWFwIGxpbmUgZnJvbSBSVENSdHBDb2RlY0NhcGFiaWxpdHkgb3Jcbi8vIFJUQ1J0cENvZGVjUGFyYW1ldGVycy5cblNEUFV0aWxzLndyaXRlUnRwTWFwID0gZnVuY3Rpb24oY29kZWMpIHtcbiAgdmFyIHB0ID0gY29kZWMucGF5bG9hZFR5cGU7XG4gIGlmIChjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcHQgPSBjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZTtcbiAgfVxuICByZXR1cm4gJ2E9cnRwbWFwOicgKyBwdCArICcgJyArIGNvZGVjLm5hbWUgKyAnLycgKyBjb2RlYy5jbG9ja1JhdGUgK1xuICAgICAgKGNvZGVjLm51bUNoYW5uZWxzICE9PSAxID8gJy8nICsgY29kZWMubnVtQ2hhbm5lbHMgOiAnJykgKyAnXFxyXFxuJztcbn07XG5cbi8vIFBhcnNlcyBhbiBhPWV4dG1hcCBsaW5lIChoZWFkZXJleHRlbnNpb24gZnJvbSBSRkMgNTI4NSkuIFNhbXBsZSBpbnB1dDpcbi8vIGE9ZXh0bWFwOjIgdXJuOmlldGY6cGFyYW1zOnJ0cC1oZHJleHQ6dG9mZnNldFxuLy8gYT1leHRtYXA6Mi9zZW5kb25seSB1cm46aWV0ZjpwYXJhbXM6cnRwLWhkcmV4dDp0b2Zmc2V0XG5TRFBVdGlscy5wYXJzZUV4dG1hcCA9IGZ1bmN0aW9uKGxpbmUpIHtcbiAgdmFyIHBhcnRzID0gbGluZS5zdWJzdHIoOSkuc3BsaXQoJyAnKTtcbiAgcmV0dXJuIHtcbiAgICBpZDogcGFyc2VJbnQocGFydHNbMF0sIDEwKSxcbiAgICBkaXJlY3Rpb246IHBhcnRzWzBdLmluZGV4T2YoJy8nKSA+IDAgPyBwYXJ0c1swXS5zcGxpdCgnLycpWzFdIDogJ3NlbmRyZWN2JyxcbiAgICB1cmk6IHBhcnRzWzFdXG4gIH07XG59O1xuXG4vLyBHZW5lcmF0ZXMgYT1leHRtYXAgbGluZSBmcm9tIFJUQ1J0cEhlYWRlckV4dGVuc2lvblBhcmFtZXRlcnMgb3Jcbi8vIFJUQ1J0cEhlYWRlckV4dGVuc2lvbi5cblNEUFV0aWxzLndyaXRlRXh0bWFwID0gZnVuY3Rpb24oaGVhZGVyRXh0ZW5zaW9uKSB7XG4gIHJldHVybiAnYT1leHRtYXA6JyArIChoZWFkZXJFeHRlbnNpb24uaWQgfHwgaGVhZGVyRXh0ZW5zaW9uLnByZWZlcnJlZElkKSArXG4gICAgICAoaGVhZGVyRXh0ZW5zaW9uLmRpcmVjdGlvbiAmJiBoZWFkZXJFeHRlbnNpb24uZGlyZWN0aW9uICE9PSAnc2VuZHJlY3YnXG4gICAgICAgICAgPyAnLycgKyBoZWFkZXJFeHRlbnNpb24uZGlyZWN0aW9uXG4gICAgICAgICAgOiAnJykgK1xuICAgICAgJyAnICsgaGVhZGVyRXh0ZW5zaW9uLnVyaSArICdcXHJcXG4nO1xufTtcblxuLy8gUGFyc2VzIGFuIGZ0bXAgbGluZSwgcmV0dXJucyBkaWN0aW9uYXJ5LiBTYW1wbGUgaW5wdXQ6XG4vLyBhPWZtdHA6OTYgdmJyPW9uO2NuZz1vblxuLy8gQWxzbyBkZWFscyB3aXRoIHZicj1vbjsgY25nPW9uXG5TRFBVdGlscy5wYXJzZUZtdHAgPSBmdW5jdGlvbihsaW5lKSB7XG4gIHZhciBwYXJzZWQgPSB7fTtcbiAgdmFyIGt2O1xuICB2YXIgcGFydHMgPSBsaW5lLnN1YnN0cihsaW5lLmluZGV4T2YoJyAnKSArIDEpLnNwbGl0KCc7Jyk7XG4gIGZvciAodmFyIGogPSAwOyBqIDwgcGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICBrdiA9IHBhcnRzW2pdLnRyaW0oKS5zcGxpdCgnPScpO1xuICAgIHBhcnNlZFtrdlswXS50cmltKCldID0ga3ZbMV07XG4gIH1cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG5cbi8vIEdlbmVyYXRlcyBhbiBhPWZ0bXAgbGluZSBmcm9tIFJUQ1J0cENvZGVjQ2FwYWJpbGl0eSBvciBSVENSdHBDb2RlY1BhcmFtZXRlcnMuXG5TRFBVdGlscy53cml0ZUZtdHAgPSBmdW5jdGlvbihjb2RlYykge1xuICB2YXIgbGluZSA9ICcnO1xuICB2YXIgcHQgPSBjb2RlYy5wYXlsb2FkVHlwZTtcbiAgaWYgKGNvZGVjLnByZWZlcnJlZFBheWxvYWRUeXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICBwdCA9IGNvZGVjLnByZWZlcnJlZFBheWxvYWRUeXBlO1xuICB9XG4gIGlmIChjb2RlYy5wYXJhbWV0ZXJzICYmIE9iamVjdC5rZXlzKGNvZGVjLnBhcmFtZXRlcnMpLmxlbmd0aCkge1xuICAgIHZhciBwYXJhbXMgPSBbXTtcbiAgICBPYmplY3Qua2V5cyhjb2RlYy5wYXJhbWV0ZXJzKS5mb3JFYWNoKGZ1bmN0aW9uKHBhcmFtKSB7XG4gICAgICBwYXJhbXMucHVzaChwYXJhbSArICc9JyArIGNvZGVjLnBhcmFtZXRlcnNbcGFyYW1dKTtcbiAgICB9KTtcbiAgICBsaW5lICs9ICdhPWZtdHA6JyArIHB0ICsgJyAnICsgcGFyYW1zLmpvaW4oJzsnKSArICdcXHJcXG4nO1xuICB9XG4gIHJldHVybiBsaW5lO1xufTtcblxuLy8gUGFyc2VzIGFuIHJ0Y3AtZmIgbGluZSwgcmV0dXJucyBSVENQUnRjcEZlZWRiYWNrIG9iamVjdC4gU2FtcGxlIGlucHV0OlxuLy8gYT1ydGNwLWZiOjk4IG5hY2sgcnBzaVxuU0RQVXRpbHMucGFyc2VSdGNwRmIgPSBmdW5jdGlvbihsaW5lKSB7XG4gIHZhciBwYXJ0cyA9IGxpbmUuc3Vic3RyKGxpbmUuaW5kZXhPZignICcpICsgMSkuc3BsaXQoJyAnKTtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBwYXJ0cy5zaGlmdCgpLFxuICAgIHBhcmFtZXRlcjogcGFydHMuam9pbignICcpXG4gIH07XG59O1xuLy8gR2VuZXJhdGUgYT1ydGNwLWZiIGxpbmVzIGZyb20gUlRDUnRwQ29kZWNDYXBhYmlsaXR5IG9yIFJUQ1J0cENvZGVjUGFyYW1ldGVycy5cblNEUFV0aWxzLndyaXRlUnRjcEZiID0gZnVuY3Rpb24oY29kZWMpIHtcbiAgdmFyIGxpbmVzID0gJyc7XG4gIHZhciBwdCA9IGNvZGVjLnBheWxvYWRUeXBlO1xuICBpZiAoY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgIHB0ID0gY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGU7XG4gIH1cbiAgaWYgKGNvZGVjLnJ0Y3BGZWVkYmFjayAmJiBjb2RlYy5ydGNwRmVlZGJhY2subGVuZ3RoKSB7XG4gICAgLy8gRklYTUU6IHNwZWNpYWwgaGFuZGxpbmcgZm9yIHRyci1pbnQ/XG4gICAgY29kZWMucnRjcEZlZWRiYWNrLmZvckVhY2goZnVuY3Rpb24oZmIpIHtcbiAgICAgIGxpbmVzICs9ICdhPXJ0Y3AtZmI6JyArIHB0ICsgJyAnICsgZmIudHlwZSArXG4gICAgICAoZmIucGFyYW1ldGVyICYmIGZiLnBhcmFtZXRlci5sZW5ndGggPyAnICcgKyBmYi5wYXJhbWV0ZXIgOiAnJykgK1xuICAgICAgICAgICdcXHJcXG4nO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBsaW5lcztcbn07XG5cbi8vIFBhcnNlcyBhbiBSRkMgNTU3NiBzc3JjIG1lZGlhIGF0dHJpYnV0ZS4gU2FtcGxlIGlucHV0OlxuLy8gYT1zc3JjOjM3MzU5Mjg1NTkgY25hbWU6c29tZXRoaW5nXG5TRFBVdGlscy5wYXJzZVNzcmNNZWRpYSA9IGZ1bmN0aW9uKGxpbmUpIHtcbiAgdmFyIHNwID0gbGluZS5pbmRleE9mKCcgJyk7XG4gIHZhciBwYXJ0cyA9IHtcbiAgICBzc3JjOiBwYXJzZUludChsaW5lLnN1YnN0cig3LCBzcCAtIDcpLCAxMClcbiAgfTtcbiAgdmFyIGNvbG9uID0gbGluZS5pbmRleE9mKCc6Jywgc3ApO1xuICBpZiAoY29sb24gPiAtMSkge1xuICAgIHBhcnRzLmF0dHJpYnV0ZSA9IGxpbmUuc3Vic3RyKHNwICsgMSwgY29sb24gLSBzcCAtIDEpO1xuICAgIHBhcnRzLnZhbHVlID0gbGluZS5zdWJzdHIoY29sb24gKyAxKTtcbiAgfSBlbHNlIHtcbiAgICBwYXJ0cy5hdHRyaWJ1dGUgPSBsaW5lLnN1YnN0cihzcCArIDEpO1xuICB9XG4gIHJldHVybiBwYXJ0cztcbn07XG5cbi8vIEV4dHJhY3RzIHRoZSBNSUQgKFJGQyA1ODg4KSBmcm9tIGEgbWVkaWEgc2VjdGlvbi5cbi8vIHJldHVybnMgdGhlIE1JRCBvciB1bmRlZmluZWQgaWYgbm8gbWlkIGxpbmUgd2FzIGZvdW5kLlxuU0RQVXRpbHMuZ2V0TWlkID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XG4gIHZhciBtaWQgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPW1pZDonKVswXTtcbiAgaWYgKG1pZCkge1xuICAgIHJldHVybiBtaWQuc3Vic3RyKDYpO1xuICB9XG59XG5cblNEUFV0aWxzLnBhcnNlRmluZ2VycHJpbnQgPSBmdW5jdGlvbihsaW5lKSB7XG4gIHZhciBwYXJ0cyA9IGxpbmUuc3Vic3RyKDE0KS5zcGxpdCgnICcpO1xuICByZXR1cm4ge1xuICAgIGFsZ29yaXRobTogcGFydHNbMF0udG9Mb3dlckNhc2UoKSwgLy8gYWxnb3JpdGhtIGlzIGNhc2Utc2Vuc2l0aXZlIGluIEVkZ2UuXG4gICAgdmFsdWU6IHBhcnRzWzFdXG4gIH07XG59O1xuXG4vLyBFeHRyYWN0cyBEVExTIHBhcmFtZXRlcnMgZnJvbSBTRFAgbWVkaWEgc2VjdGlvbiBvciBzZXNzaW9ucGFydC5cbi8vIEZJWE1FOiBmb3IgY29uc2lzdGVuY3kgd2l0aCBvdGhlciBmdW5jdGlvbnMgdGhpcyBzaG91bGQgb25seVxuLy8gICBnZXQgdGhlIGZpbmdlcnByaW50IGxpbmUgYXMgaW5wdXQuIFNlZSBhbHNvIGdldEljZVBhcmFtZXRlcnMuXG5TRFBVdGlscy5nZXREdGxzUGFyYW1ldGVycyA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbiwgc2Vzc2lvbnBhcnQpIHtcbiAgdmFyIGxpbmVzID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uICsgc2Vzc2lvbnBhcnQsXG4gICAgICAnYT1maW5nZXJwcmludDonKTtcbiAgLy8gTm90ZTogYT1zZXR1cCBsaW5lIGlzIGlnbm9yZWQgc2luY2Ugd2UgdXNlIHRoZSAnYXV0bycgcm9sZS5cbiAgLy8gTm90ZTI6ICdhbGdvcml0aG0nIGlzIG5vdCBjYXNlIHNlbnNpdGl2ZSBleGNlcHQgaW4gRWRnZS5cbiAgcmV0dXJuIHtcbiAgICByb2xlOiAnYXV0bycsXG4gICAgZmluZ2VycHJpbnRzOiBsaW5lcy5tYXAoU0RQVXRpbHMucGFyc2VGaW5nZXJwcmludClcbiAgfTtcbn07XG5cbi8vIFNlcmlhbGl6ZXMgRFRMUyBwYXJhbWV0ZXJzIHRvIFNEUC5cblNEUFV0aWxzLndyaXRlRHRsc1BhcmFtZXRlcnMgPSBmdW5jdGlvbihwYXJhbXMsIHNldHVwVHlwZSkge1xuICB2YXIgc2RwID0gJ2E9c2V0dXA6JyArIHNldHVwVHlwZSArICdcXHJcXG4nO1xuICBwYXJhbXMuZmluZ2VycHJpbnRzLmZvckVhY2goZnVuY3Rpb24oZnApIHtcbiAgICBzZHAgKz0gJ2E9ZmluZ2VycHJpbnQ6JyArIGZwLmFsZ29yaXRobSArICcgJyArIGZwLnZhbHVlICsgJ1xcclxcbic7XG4gIH0pO1xuICByZXR1cm4gc2RwO1xufTtcbi8vIFBhcnNlcyBJQ0UgaW5mb3JtYXRpb24gZnJvbSBTRFAgbWVkaWEgc2VjdGlvbiBvciBzZXNzaW9ucGFydC5cbi8vIEZJWE1FOiBmb3IgY29uc2lzdGVuY3kgd2l0aCBvdGhlciBmdW5jdGlvbnMgdGhpcyBzaG91bGQgb25seVxuLy8gICBnZXQgdGhlIGljZS11ZnJhZyBhbmQgaWNlLXB3ZCBsaW5lcyBhcyBpbnB1dC5cblNEUFV0aWxzLmdldEljZVBhcmFtZXRlcnMgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24sIHNlc3Npb25wYXJ0KSB7XG4gIHZhciBsaW5lcyA9IFNEUFV0aWxzLnNwbGl0TGluZXMobWVkaWFTZWN0aW9uKTtcbiAgLy8gU2VhcmNoIGluIHNlc3Npb24gcGFydCwgdG9vLlxuICBsaW5lcyA9IGxpbmVzLmNvbmNhdChTRFBVdGlscy5zcGxpdExpbmVzKHNlc3Npb25wYXJ0KSk7XG4gIHZhciBpY2VQYXJhbWV0ZXJzID0ge1xuICAgIHVzZXJuYW1lRnJhZ21lbnQ6IGxpbmVzLmZpbHRlcihmdW5jdGlvbihsaW5lKSB7XG4gICAgICByZXR1cm4gbGluZS5pbmRleE9mKCdhPWljZS11ZnJhZzonKSA9PT0gMDtcbiAgICB9KVswXS5zdWJzdHIoMTIpLFxuICAgIHBhc3N3b3JkOiBsaW5lcy5maWx0ZXIoZnVuY3Rpb24obGluZSkge1xuICAgICAgcmV0dXJuIGxpbmUuaW5kZXhPZignYT1pY2UtcHdkOicpID09PSAwO1xuICAgIH0pWzBdLnN1YnN0cigxMClcbiAgfTtcbiAgcmV0dXJuIGljZVBhcmFtZXRlcnM7XG59O1xuXG4vLyBTZXJpYWxpemVzIElDRSBwYXJhbWV0ZXJzIHRvIFNEUC5cblNEUFV0aWxzLndyaXRlSWNlUGFyYW1ldGVycyA9IGZ1bmN0aW9uKHBhcmFtcykge1xuICByZXR1cm4gJ2E9aWNlLXVmcmFnOicgKyBwYXJhbXMudXNlcm5hbWVGcmFnbWVudCArICdcXHJcXG4nICtcbiAgICAgICdhPWljZS1wd2Q6JyArIHBhcmFtcy5wYXNzd29yZCArICdcXHJcXG4nO1xufTtcblxuLy8gUGFyc2VzIHRoZSBTRFAgbWVkaWEgc2VjdGlvbiBhbmQgcmV0dXJucyBSVENSdHBQYXJhbWV0ZXJzLlxuU0RQVXRpbHMucGFyc2VSdHBQYXJhbWV0ZXJzID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XG4gIHZhciBkZXNjcmlwdGlvbiA9IHtcbiAgICBjb2RlY3M6IFtdLFxuICAgIGhlYWRlckV4dGVuc2lvbnM6IFtdLFxuICAgIGZlY01lY2hhbmlzbXM6IFtdLFxuICAgIHJ0Y3A6IFtdXG4gIH07XG4gIHZhciBsaW5lcyA9IFNEUFV0aWxzLnNwbGl0TGluZXMobWVkaWFTZWN0aW9uKTtcbiAgdmFyIG1saW5lID0gbGluZXNbMF0uc3BsaXQoJyAnKTtcbiAgZm9yICh2YXIgaSA9IDM7IGkgPCBtbGluZS5sZW5ndGg7IGkrKykgeyAvLyBmaW5kIGFsbCBjb2RlY3MgZnJvbSBtbGluZVszLi5dXG4gICAgdmFyIHB0ID0gbWxpbmVbaV07XG4gICAgdmFyIHJ0cG1hcGxpbmUgPSBTRFBVdGlscy5tYXRjaFByZWZpeChcbiAgICAgICAgbWVkaWFTZWN0aW9uLCAnYT1ydHBtYXA6JyArIHB0ICsgJyAnKVswXTtcbiAgICBpZiAocnRwbWFwbGluZSkge1xuICAgICAgdmFyIGNvZGVjID0gU0RQVXRpbHMucGFyc2VSdHBNYXAocnRwbWFwbGluZSk7XG4gICAgICB2YXIgZm10cHMgPSBTRFBVdGlscy5tYXRjaFByZWZpeChcbiAgICAgICAgICBtZWRpYVNlY3Rpb24sICdhPWZtdHA6JyArIHB0ICsgJyAnKTtcbiAgICAgIC8vIE9ubHkgdGhlIGZpcnN0IGE9Zm10cDo8cHQ+IGlzIGNvbnNpZGVyZWQuXG4gICAgICBjb2RlYy5wYXJhbWV0ZXJzID0gZm10cHMubGVuZ3RoID8gU0RQVXRpbHMucGFyc2VGbXRwKGZtdHBzWzBdKSA6IHt9O1xuICAgICAgY29kZWMucnRjcEZlZWRiYWNrID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgoXG4gICAgICAgICAgbWVkaWFTZWN0aW9uLCAnYT1ydGNwLWZiOicgKyBwdCArICcgJylcbiAgICAgICAgLm1hcChTRFBVdGlscy5wYXJzZVJ0Y3BGYik7XG4gICAgICBkZXNjcmlwdGlvbi5jb2RlY3MucHVzaChjb2RlYyk7XG4gICAgICAvLyBwYXJzZSBGRUMgbWVjaGFuaXNtcyBmcm9tIHJ0cG1hcCBsaW5lcy5cbiAgICAgIHN3aXRjaCAoY29kZWMubmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICAgIGNhc2UgJ1JFRCc6XG4gICAgICAgIGNhc2UgJ1VMUEZFQyc6XG4gICAgICAgICAgZGVzY3JpcHRpb24uZmVjTWVjaGFuaXNtcy5wdXNoKGNvZGVjLm5hbWUudG9VcHBlckNhc2UoKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6IC8vIG9ubHkgUkVEIGFuZCBVTFBGRUMgYXJlIHJlY29nbml6ZWQgYXMgRkVDIG1lY2hhbmlzbXMuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9ZXh0bWFwOicpLmZvckVhY2goZnVuY3Rpb24obGluZSkge1xuICAgIGRlc2NyaXB0aW9uLmhlYWRlckV4dGVuc2lvbnMucHVzaChTRFBVdGlscy5wYXJzZUV4dG1hcChsaW5lKSk7XG4gIH0pO1xuICAvLyBGSVhNRTogcGFyc2UgcnRjcC5cbiAgcmV0dXJuIGRlc2NyaXB0aW9uO1xufTtcblxuLy8gR2VuZXJhdGVzIHBhcnRzIG9mIHRoZSBTRFAgbWVkaWEgc2VjdGlvbiBkZXNjcmliaW5nIHRoZSBjYXBhYmlsaXRpZXMgL1xuLy8gcGFyYW1ldGVycy5cblNEUFV0aWxzLndyaXRlUnRwRGVzY3JpcHRpb24gPSBmdW5jdGlvbihraW5kLCBjYXBzKSB7XG4gIHZhciBzZHAgPSAnJztcblxuICAvLyBCdWlsZCB0aGUgbWxpbmUuXG4gIHNkcCArPSAnbT0nICsga2luZCArICcgJztcbiAgc2RwICs9IGNhcHMuY29kZWNzLmxlbmd0aCA+IDAgPyAnOScgOiAnMCc7IC8vIHJlamVjdCBpZiBubyBjb2RlY3MuXG4gIHNkcCArPSAnIFVEUC9UTFMvUlRQL1NBVlBGICc7XG4gIHNkcCArPSBjYXBzLmNvZGVjcy5tYXAoZnVuY3Rpb24oY29kZWMpIHtcbiAgICBpZiAoY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGNvZGVjLnByZWZlcnJlZFBheWxvYWRUeXBlO1xuICAgIH1cbiAgICByZXR1cm4gY29kZWMucGF5bG9hZFR5cGU7XG4gIH0pLmpvaW4oJyAnKSArICdcXHJcXG4nO1xuXG4gIHNkcCArPSAnYz1JTiBJUDQgMC4wLjAuMFxcclxcbic7XG4gIHNkcCArPSAnYT1ydGNwOjkgSU4gSVA0IDAuMC4wLjBcXHJcXG4nO1xuXG4gIC8vIEFkZCBhPXJ0cG1hcCBsaW5lcyBmb3IgZWFjaCBjb2RlYy4gQWxzbyBmbXRwIGFuZCBydGNwLWZiLlxuICBjYXBzLmNvZGVjcy5mb3JFYWNoKGZ1bmN0aW9uKGNvZGVjKSB7XG4gICAgc2RwICs9IFNEUFV0aWxzLndyaXRlUnRwTWFwKGNvZGVjKTtcbiAgICBzZHAgKz0gU0RQVXRpbHMud3JpdGVGbXRwKGNvZGVjKTtcbiAgICBzZHAgKz0gU0RQVXRpbHMud3JpdGVSdGNwRmIoY29kZWMpO1xuICB9KTtcbiAgdmFyIG1heHB0aW1lID0gMDtcbiAgY2Fwcy5jb2RlY3MuZm9yRWFjaChmdW5jdGlvbihjb2RlYykge1xuICAgIGlmIChjb2RlYy5tYXhwdGltZSA+IG1heHB0aW1lKSB7XG4gICAgICBtYXhwdGltZSA9IGNvZGVjLm1heHB0aW1lO1xuICAgIH1cbiAgfSk7XG4gIGlmIChtYXhwdGltZSA+IDApIHtcbiAgICBzZHAgKz0gJ2E9bWF4cHRpbWU6JyArIG1heHB0aW1lICsgJ1xcclxcbic7XG4gIH1cbiAgc2RwICs9ICdhPXJ0Y3AtbXV4XFxyXFxuJztcblxuICBjYXBzLmhlYWRlckV4dGVuc2lvbnMuZm9yRWFjaChmdW5jdGlvbihleHRlbnNpb24pIHtcbiAgICBzZHAgKz0gU0RQVXRpbHMud3JpdGVFeHRtYXAoZXh0ZW5zaW9uKTtcbiAgfSk7XG4gIC8vIEZJWE1FOiB3cml0ZSBmZWNNZWNoYW5pc21zLlxuICByZXR1cm4gc2RwO1xufTtcblxuLy8gUGFyc2VzIHRoZSBTRFAgbWVkaWEgc2VjdGlvbiBhbmQgcmV0dXJucyBhbiBhcnJheSBvZlxuLy8gUlRDUnRwRW5jb2RpbmdQYXJhbWV0ZXJzLlxuU0RQVXRpbHMucGFyc2VSdHBFbmNvZGluZ1BhcmFtZXRlcnMgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcbiAgdmFyIGVuY29kaW5nUGFyYW1ldGVycyA9IFtdO1xuICB2YXIgZGVzY3JpcHRpb24gPSBTRFBVdGlscy5wYXJzZVJ0cFBhcmFtZXRlcnMobWVkaWFTZWN0aW9uKTtcbiAgdmFyIGhhc1JlZCA9IGRlc2NyaXB0aW9uLmZlY01lY2hhbmlzbXMuaW5kZXhPZignUkVEJykgIT09IC0xO1xuICB2YXIgaGFzVWxwZmVjID0gZGVzY3JpcHRpb24uZmVjTWVjaGFuaXNtcy5pbmRleE9mKCdVTFBGRUMnKSAhPT0gLTE7XG5cbiAgLy8gZmlsdGVyIGE9c3NyYzouLi4gY25hbWU6LCBpZ25vcmUgUGxhbkItbXNpZFxuICB2YXIgc3NyY3MgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPXNzcmM6JylcbiAgLm1hcChmdW5jdGlvbihsaW5lKSB7XG4gICAgcmV0dXJuIFNEUFV0aWxzLnBhcnNlU3NyY01lZGlhKGxpbmUpO1xuICB9KVxuICAuZmlsdGVyKGZ1bmN0aW9uKHBhcnRzKSB7XG4gICAgcmV0dXJuIHBhcnRzLmF0dHJpYnV0ZSA9PT0gJ2NuYW1lJztcbiAgfSk7XG4gIHZhciBwcmltYXJ5U3NyYyA9IHNzcmNzLmxlbmd0aCA+IDAgJiYgc3NyY3NbMF0uc3NyYztcbiAgdmFyIHNlY29uZGFyeVNzcmM7XG5cbiAgdmFyIGZsb3dzID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1zc3JjLWdyb3VwOkZJRCcpXG4gIC5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgIHZhciBwYXJ0cyA9IGxpbmUuc3BsaXQoJyAnKTtcbiAgICBwYXJ0cy5zaGlmdCgpO1xuICAgIHJldHVybiBwYXJ0cy5tYXAoZnVuY3Rpb24ocGFydCkge1xuICAgICAgcmV0dXJuIHBhcnNlSW50KHBhcnQsIDEwKTtcbiAgICB9KTtcbiAgfSk7XG4gIGlmIChmbG93cy5sZW5ndGggPiAwICYmIGZsb3dzWzBdLmxlbmd0aCA+IDEgJiYgZmxvd3NbMF1bMF0gPT09IHByaW1hcnlTc3JjKSB7XG4gICAgc2Vjb25kYXJ5U3NyYyA9IGZsb3dzWzBdWzFdO1xuICB9XG5cbiAgZGVzY3JpcHRpb24uY29kZWNzLmZvckVhY2goZnVuY3Rpb24oY29kZWMpIHtcbiAgICBpZiAoY29kZWMubmFtZS50b1VwcGVyQ2FzZSgpID09PSAnUlRYJyAmJiBjb2RlYy5wYXJhbWV0ZXJzLmFwdCkge1xuICAgICAgdmFyIGVuY1BhcmFtID0ge1xuICAgICAgICBzc3JjOiBwcmltYXJ5U3NyYyxcbiAgICAgICAgY29kZWNQYXlsb2FkVHlwZTogcGFyc2VJbnQoY29kZWMucGFyYW1ldGVycy5hcHQsIDEwKSxcbiAgICAgICAgcnR4OiB7XG4gICAgICAgICAgc3NyYzogc2Vjb25kYXJ5U3NyY1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgZW5jb2RpbmdQYXJhbWV0ZXJzLnB1c2goZW5jUGFyYW0pO1xuICAgICAgaWYgKGhhc1JlZCkge1xuICAgICAgICBlbmNQYXJhbSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZW5jUGFyYW0pKTtcbiAgICAgICAgZW5jUGFyYW0uZmVjID0ge1xuICAgICAgICAgIHNzcmM6IHNlY29uZGFyeVNzcmMsXG4gICAgICAgICAgbWVjaGFuaXNtOiBoYXNVbHBmZWMgPyAncmVkK3VscGZlYycgOiAncmVkJ1xuICAgICAgICB9O1xuICAgICAgICBlbmNvZGluZ1BhcmFtZXRlcnMucHVzaChlbmNQYXJhbSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgaWYgKGVuY29kaW5nUGFyYW1ldGVycy5sZW5ndGggPT09IDAgJiYgcHJpbWFyeVNzcmMpIHtcbiAgICBlbmNvZGluZ1BhcmFtZXRlcnMucHVzaCh7XG4gICAgICBzc3JjOiBwcmltYXJ5U3NyY1xuICAgIH0pO1xuICB9XG5cbiAgLy8gd2Ugc3VwcG9ydCBib3RoIGI9QVMgYW5kIGI9VElBUyBidXQgaW50ZXJwcmV0IEFTIGFzIFRJQVMuXG4gIHZhciBiYW5kd2lkdGggPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdiPScpO1xuICBpZiAoYmFuZHdpZHRoLmxlbmd0aCkge1xuICAgIGlmIChiYW5kd2lkdGhbMF0uaW5kZXhPZignYj1USUFTOicpID09PSAwKSB7XG4gICAgICBiYW5kd2lkdGggPSBwYXJzZUludChiYW5kd2lkdGhbMF0uc3Vic3RyKDcpLCAxMCk7XG4gICAgfSBlbHNlIGlmIChiYW5kd2lkdGhbMF0uaW5kZXhPZignYj1BUzonKSA9PT0gMCkge1xuICAgICAgLy8gdXNlIGZvcm11bGEgZnJvbSBKU0VQIHRvIGNvbnZlcnQgYj1BUyB0byBUSUFTIHZhbHVlLlxuICAgICAgYmFuZHdpZHRoID0gcGFyc2VJbnQoYmFuZHdpZHRoWzBdLnN1YnN0cig1KSwgMTApICogMTAwMCAqIDAuOTVcbiAgICAgICAgICAtICg1MCAqIDQwICogOCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJhbmR3aWR0aCA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgZW5jb2RpbmdQYXJhbWV0ZXJzLmZvckVhY2goZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgICBwYXJhbXMubWF4Qml0cmF0ZSA9IGJhbmR3aWR0aDtcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gZW5jb2RpbmdQYXJhbWV0ZXJzO1xufTtcblxuLy8gcGFyc2VzIGh0dHA6Ly9kcmFmdC5vcnRjLm9yZy8jcnRjcnRjcHBhcmFtZXRlcnMqXG5TRFBVdGlscy5wYXJzZVJ0Y3BQYXJhbWV0ZXJzID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XG4gIHZhciBydGNwUGFyYW1ldGVycyA9IHt9O1xuXG4gIHZhciBjbmFtZTtcbiAgLy8gR2V0cyB0aGUgZmlyc3QgU1NSQy4gTm90ZSB0aGF0IHdpdGggUlRYIHRoZXJlIG1pZ2h0IGJlIG11bHRpcGxlXG4gIC8vIFNTUkNzLlxuICB2YXIgcmVtb3RlU3NyYyA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9c3NyYzonKVxuICAgICAgLm1hcChmdW5jdGlvbihsaW5lKSB7XG4gICAgICAgIHJldHVybiBTRFBVdGlscy5wYXJzZVNzcmNNZWRpYShsaW5lKTtcbiAgICAgIH0pXG4gICAgICAuZmlsdGVyKGZ1bmN0aW9uKG9iaikge1xuICAgICAgICByZXR1cm4gb2JqLmF0dHJpYnV0ZSA9PT0gJ2NuYW1lJztcbiAgICAgIH0pWzBdO1xuICBpZiAocmVtb3RlU3NyYykge1xuICAgIHJ0Y3BQYXJhbWV0ZXJzLmNuYW1lID0gcmVtb3RlU3NyYy52YWx1ZTtcbiAgICBydGNwUGFyYW1ldGVycy5zc3JjID0gcmVtb3RlU3NyYy5zc3JjO1xuICB9XG5cbiAgLy8gRWRnZSB1c2VzIHRoZSBjb21wb3VuZCBhdHRyaWJ1dGUgaW5zdGVhZCBvZiByZWR1Y2VkU2l6ZVxuICAvLyBjb21wb3VuZCBpcyAhcmVkdWNlZFNpemVcbiAgdmFyIHJzaXplID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1ydGNwLXJzaXplJyk7XG4gIHJ0Y3BQYXJhbWV0ZXJzLnJlZHVjZWRTaXplID0gcnNpemUubGVuZ3RoID4gMDtcbiAgcnRjcFBhcmFtZXRlcnMuY29tcG91bmQgPSByc2l6ZS5sZW5ndGggPT09IDA7XG5cbiAgLy8gcGFyc2VzIHRoZSBydGNwLW11eCBhdHRy0ZZidXRlLlxuICAvLyBOb3RlIHRoYXQgRWRnZSBkb2VzIG5vdCBzdXBwb3J0IHVubXV4ZWQgUlRDUC5cbiAgdmFyIG11eCA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9cnRjcC1tdXgnKTtcbiAgcnRjcFBhcmFtZXRlcnMubXV4ID0gbXV4Lmxlbmd0aCA+IDA7XG5cbiAgcmV0dXJuIHJ0Y3BQYXJhbWV0ZXJzO1xufTtcblxuLy8gcGFyc2VzIGVpdGhlciBhPW1zaWQ6IG9yIGE9c3NyYzouLi4gbXNpZCBsaW5lcyBhbmQgcmV0dXJuc1xuLy8gdGhlIGlkIG9mIHRoZSBNZWRpYVN0cmVhbSBhbmQgTWVkaWFTdHJlYW1UcmFjay5cblNEUFV0aWxzLnBhcnNlTXNpZCA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbikge1xuICB2YXIgcGFydHM7XG4gIHZhciBzcGVjID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1tc2lkOicpO1xuICBpZiAoc3BlYy5sZW5ndGggPT09IDEpIHtcbiAgICBwYXJ0cyA9IHNwZWNbMF0uc3Vic3RyKDcpLnNwbGl0KCcgJyk7XG4gICAgcmV0dXJuIHtzdHJlYW06IHBhcnRzWzBdLCB0cmFjazogcGFydHNbMV19O1xuICB9XG4gIHZhciBwbGFuQiA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9c3NyYzonKVxuICAubWFwKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICByZXR1cm4gU0RQVXRpbHMucGFyc2VTc3JjTWVkaWEobGluZSk7XG4gIH0pXG4gIC5maWx0ZXIoZnVuY3Rpb24ocGFydHMpIHtcbiAgICByZXR1cm4gcGFydHMuYXR0cmlidXRlID09PSAnbXNpZCc7XG4gIH0pO1xuICBpZiAocGxhbkIubGVuZ3RoID4gMCkge1xuICAgIHBhcnRzID0gcGxhbkJbMF0udmFsdWUuc3BsaXQoJyAnKTtcbiAgICByZXR1cm4ge3N0cmVhbTogcGFydHNbMF0sIHRyYWNrOiBwYXJ0c1sxXX07XG4gIH1cbn07XG5cbi8vIEdlbmVyYXRlIGEgc2Vzc2lvbiBJRCBmb3IgU0RQLlxuLy8gaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL2RyYWZ0LWlldGYtcnRjd2ViLWpzZXAtMjAjc2VjdGlvbi01LjIuMVxuLy8gcmVjb21tZW5kcyB1c2luZyBhIGNyeXB0b2dyYXBoaWNhbGx5IHJhbmRvbSArdmUgNjQtYml0IHZhbHVlXG4vLyBidXQgcmlnaHQgbm93IHRoaXMgc2hvdWxkIGJlIGFjY2VwdGFibGUgYW5kIHdpdGhpbiB0aGUgcmlnaHQgcmFuZ2VcblNEUFV0aWxzLmdlbmVyYXRlU2Vzc2lvbklkID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCkuc3Vic3RyKDIsIDIxKTtcbn07XG5cbi8vIFdyaXRlIGJvaWxkZXIgcGxhdGUgZm9yIHN0YXJ0IG9mIFNEUFxuLy8gc2Vzc0lkIGFyZ3VtZW50IGlzIG9wdGlvbmFsIC0gaWYgbm90IHN1cHBsaWVkIGl0IHdpbGxcbi8vIGJlIGdlbmVyYXRlZCByYW5kb21seVxuLy8gc2Vzc1ZlcnNpb24gaXMgb3B0aW9uYWwgYW5kIGRlZmF1bHRzIHRvIDJcblNEUFV0aWxzLndyaXRlU2Vzc2lvbkJvaWxlcnBsYXRlID0gZnVuY3Rpb24oc2Vzc0lkLCBzZXNzVmVyKSB7XG4gIHZhciBzZXNzaW9uSWQ7XG4gIHZhciB2ZXJzaW9uID0gc2Vzc1ZlciAhPT0gdW5kZWZpbmVkID8gc2Vzc1ZlciA6IDI7XG4gIGlmIChzZXNzSWQpIHtcbiAgICBzZXNzaW9uSWQgPSBzZXNzSWQ7XG4gIH0gZWxzZSB7XG4gICAgc2Vzc2lvbklkID0gU0RQVXRpbHMuZ2VuZXJhdGVTZXNzaW9uSWQoKTtcbiAgfVxuICAvLyBGSVhNRTogc2Vzcy1pZCBzaG91bGQgYmUgYW4gTlRQIHRpbWVzdGFtcC5cbiAgcmV0dXJuICd2PTBcXHJcXG4nICtcbiAgICAgICdvPXRoaXNpc2FkYXB0ZXJvcnRjICcgKyBzZXNzaW9uSWQgKyAnICcgKyB2ZXJzaW9uICsgJyBJTiBJUDQgMTI3LjAuMC4xXFxyXFxuJyArXG4gICAgICAncz0tXFxyXFxuJyArXG4gICAgICAndD0wIDBcXHJcXG4nO1xufTtcblxuU0RQVXRpbHMud3JpdGVNZWRpYVNlY3Rpb24gPSBmdW5jdGlvbih0cmFuc2NlaXZlciwgY2FwcywgdHlwZSwgc3RyZWFtKSB7XG4gIHZhciBzZHAgPSBTRFBVdGlscy53cml0ZVJ0cERlc2NyaXB0aW9uKHRyYW5zY2VpdmVyLmtpbmQsIGNhcHMpO1xuXG4gIC8vIE1hcCBJQ0UgcGFyYW1ldGVycyAodWZyYWcsIHB3ZCkgdG8gU0RQLlxuICBzZHAgKz0gU0RQVXRpbHMud3JpdGVJY2VQYXJhbWV0ZXJzKFxuICAgICAgdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIuZ2V0TG9jYWxQYXJhbWV0ZXJzKCkpO1xuXG4gIC8vIE1hcCBEVExTIHBhcmFtZXRlcnMgdG8gU0RQLlxuICBzZHAgKz0gU0RQVXRpbHMud3JpdGVEdGxzUGFyYW1ldGVycyhcbiAgICAgIHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQuZ2V0TG9jYWxQYXJhbWV0ZXJzKCksXG4gICAgICB0eXBlID09PSAnb2ZmZXInID8gJ2FjdHBhc3MnIDogJ2FjdGl2ZScpO1xuXG4gIHNkcCArPSAnYT1taWQ6JyArIHRyYW5zY2VpdmVyLm1pZCArICdcXHJcXG4nO1xuXG4gIGlmICh0cmFuc2NlaXZlci5kaXJlY3Rpb24pIHtcbiAgICBzZHAgKz0gJ2E9JyArIHRyYW5zY2VpdmVyLmRpcmVjdGlvbiArICdcXHJcXG4nO1xuICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlciAmJiB0cmFuc2NlaXZlci5ydHBSZWNlaXZlcikge1xuICAgIHNkcCArPSAnYT1zZW5kcmVjdlxcclxcbic7XG4gIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIucnRwU2VuZGVyKSB7XG4gICAgc2RwICs9ICdhPXNlbmRvbmx5XFxyXFxuJztcbiAgfSBlbHNlIGlmICh0cmFuc2NlaXZlci5ydHBSZWNlaXZlcikge1xuICAgIHNkcCArPSAnYT1yZWN2b25seVxcclxcbic7XG4gIH0gZWxzZSB7XG4gICAgc2RwICs9ICdhPWluYWN0aXZlXFxyXFxuJztcbiAgfVxuXG4gIGlmICh0cmFuc2NlaXZlci5ydHBTZW5kZXIpIHtcbiAgICAvLyBzcGVjLlxuICAgIHZhciBtc2lkID0gJ21zaWQ6JyArIHN0cmVhbS5pZCArICcgJyArXG4gICAgICAgIHRyYW5zY2VpdmVyLnJ0cFNlbmRlci50cmFjay5pZCArICdcXHJcXG4nO1xuICAgIHNkcCArPSAnYT0nICsgbXNpZDtcblxuICAgIC8vIGZvciBDaHJvbWUuXG4gICAgc2RwICs9ICdhPXNzcmM6JyArIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYyArXG4gICAgICAgICcgJyArIG1zaWQ7XG4gICAgaWYgKHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4KSB7XG4gICAgICBzZHAgKz0gJ2E9c3NyYzonICsgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHguc3NyYyArXG4gICAgICAgICAgJyAnICsgbXNpZDtcbiAgICAgIHNkcCArPSAnYT1zc3JjLWdyb3VwOkZJRCAnICtcbiAgICAgICAgICB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmMgKyAnICcgK1xuICAgICAgICAgIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4LnNzcmMgK1xuICAgICAgICAgICdcXHJcXG4nO1xuICAgIH1cbiAgfVxuICAvLyBGSVhNRTogdGhpcyBzaG91bGQgYmUgd3JpdHRlbiBieSB3cml0ZVJ0cERlc2NyaXB0aW9uLlxuICBzZHAgKz0gJ2E9c3NyYzonICsgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjICtcbiAgICAgICcgY25hbWU6JyArIFNEUFV0aWxzLmxvY2FsQ05hbWUgKyAnXFxyXFxuJztcbiAgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlciAmJiB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCkge1xuICAgIHNkcCArPSAnYT1zc3JjOicgKyB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eC5zc3JjICtcbiAgICAgICAgJyBjbmFtZTonICsgU0RQVXRpbHMubG9jYWxDTmFtZSArICdcXHJcXG4nO1xuICB9XG4gIHJldHVybiBzZHA7XG59O1xuXG4vLyBHZXRzIHRoZSBkaXJlY3Rpb24gZnJvbSB0aGUgbWVkaWFTZWN0aW9uIG9yIHRoZSBzZXNzaW9ucGFydC5cblNEUFV0aWxzLmdldERpcmVjdGlvbiA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbiwgc2Vzc2lvbnBhcnQpIHtcbiAgLy8gTG9vayBmb3Igc2VuZHJlY3YsIHNlbmRvbmx5LCByZWN2b25seSwgaW5hY3RpdmUsIGRlZmF1bHQgdG8gc2VuZHJlY3YuXG4gIHZhciBsaW5lcyA9IFNEUFV0aWxzLnNwbGl0TGluZXMobWVkaWFTZWN0aW9uKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xuICAgIHN3aXRjaCAobGluZXNbaV0pIHtcbiAgICAgIGNhc2UgJ2E9c2VuZHJlY3YnOlxuICAgICAgY2FzZSAnYT1zZW5kb25seSc6XG4gICAgICBjYXNlICdhPXJlY3Zvbmx5JzpcbiAgICAgIGNhc2UgJ2E9aW5hY3RpdmUnOlxuICAgICAgICByZXR1cm4gbGluZXNbaV0uc3Vic3RyKDIpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgLy8gRklYTUU6IFdoYXQgc2hvdWxkIGhhcHBlbiBoZXJlP1xuICAgIH1cbiAgfVxuICBpZiAoc2Vzc2lvbnBhcnQpIHtcbiAgICByZXR1cm4gU0RQVXRpbHMuZ2V0RGlyZWN0aW9uKHNlc3Npb25wYXJ0KTtcbiAgfVxuICByZXR1cm4gJ3NlbmRyZWN2Jztcbn07XG5cblNEUFV0aWxzLmdldEtpbmQgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcbiAgdmFyIGxpbmVzID0gU0RQVXRpbHMuc3BsaXRMaW5lcyhtZWRpYVNlY3Rpb24pO1xuICB2YXIgbWxpbmUgPSBsaW5lc1swXS5zcGxpdCgnICcpO1xuICByZXR1cm4gbWxpbmVbMF0uc3Vic3RyKDIpO1xufTtcblxuU0RQVXRpbHMuaXNSZWplY3RlZCA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbikge1xuICByZXR1cm4gbWVkaWFTZWN0aW9uLnNwbGl0KCcgJywgMilbMV0gPT09ICcwJztcbn07XG5cblNEUFV0aWxzLnBhcnNlTUxpbmUgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcbiAgdmFyIGxpbmVzID0gU0RQVXRpbHMuc3BsaXRMaW5lcyhtZWRpYVNlY3Rpb24pO1xuICB2YXIgcGFydHMgPSBsaW5lc1swXS5zdWJzdHIoMikuc3BsaXQoJyAnKTtcbiAgcmV0dXJuIHtcbiAgICBraW5kOiBwYXJ0c1swXSxcbiAgICBwb3J0OiBwYXJzZUludChwYXJ0c1sxXSwgMTApLFxuICAgIHByb3RvY29sOiBwYXJ0c1syXSxcbiAgICBmbXQ6IHBhcnRzLnNsaWNlKDMpLmpvaW4oJyAnKVxuICB9O1xufTtcblxuU0RQVXRpbHMucGFyc2VPTGluZSA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbikge1xuICB2YXIgbGluZSA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ289JylbMF07XG4gIHZhciBwYXJ0cyA9IGxpbmUuc3Vic3RyKDIpLnNwbGl0KCcgJyk7XG4gIHJldHVybiB7XG4gICAgdXNlcm5hbWU6IHBhcnRzWzBdLFxuICAgIHNlc3Npb25JZDogcGFydHNbMV0sXG4gICAgc2Vzc2lvblZlcnNpb246IHBhcnNlSW50KHBhcnRzWzJdLCAxMCksXG4gICAgbmV0VHlwZTogcGFydHNbM10sXG4gICAgYWRkcmVzc1R5cGU6IHBhcnRzWzRdLFxuICAgIGFkZHJlc3M6IHBhcnRzWzVdLFxuICB9O1xufVxuXG4vLyBFeHBvc2UgcHVibGljIG1ldGhvZHMuXG5pZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBTRFBVdGlscztcbn1cblxufSx7fV0sMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24gKGdsb2JhbCl7XG4vKlxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxuICogIHRyZWUuXG4gKi9cbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgYWRhcHRlckZhY3RvcnkgPSByZXF1aXJlKCcuL2FkYXB0ZXJfZmFjdG9yeS5qcycpO1xubW9kdWxlLmV4cG9ydHMgPSBhZGFwdGVyRmFjdG9yeSh7d2luZG93OiBnbG9iYWwud2luZG93fSk7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxufSx7XCIuL2FkYXB0ZXJfZmFjdG9yeS5qc1wiOjR9XSw0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8qXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXG4gKiAgdHJlZS5cbiAqL1xuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbi8vIFNoaW1taW5nIHN0YXJ0cyBoZXJlLlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkZXBlbmRlbmNpZXMsIG9wdHMpIHtcbiAgdmFyIHdpbmRvdyA9IGRlcGVuZGVuY2llcyAmJiBkZXBlbmRlbmNpZXMud2luZG93O1xuXG4gIHZhciBvcHRpb25zID0ge1xuICAgIHNoaW1DaHJvbWU6IHRydWUsXG4gICAgc2hpbUZpcmVmb3g6IHRydWUsXG4gICAgc2hpbUVkZ2U6IHRydWUsXG4gICAgc2hpbVNhZmFyaTogdHJ1ZSxcbiAgfTtcblxuICBmb3IgKHZhciBrZXkgaW4gb3B0cykge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9wdHMsIGtleSkpIHtcbiAgICAgIG9wdGlvbnNba2V5XSA9IG9wdHNba2V5XTtcbiAgICB9XG4gIH1cblxuICAvLyBVdGlscy5cbiAgdmFyIGxvZ2dpbmcgPSB1dGlscy5sb2c7XG4gIHZhciBicm93c2VyRGV0YWlscyA9IHV0aWxzLmRldGVjdEJyb3dzZXIod2luZG93KTtcblxuICAvLyBVbmNvbW1lbnQgdGhlIGxpbmUgYmVsb3cgaWYgeW91IHdhbnQgbG9nZ2luZyB0byBvY2N1ciwgaW5jbHVkaW5nIGxvZ2dpbmdcbiAgLy8gZm9yIHRoZSBzd2l0Y2ggc3RhdGVtZW50IGJlbG93LiBDYW4gYWxzbyBiZSB0dXJuZWQgb24gaW4gdGhlIGJyb3dzZXIgdmlhXG4gIC8vIGFkYXB0ZXIuZGlzYWJsZUxvZyhmYWxzZSksIGJ1dCB0aGVuIGxvZ2dpbmcgZnJvbSB0aGUgc3dpdGNoIHN0YXRlbWVudCBiZWxvd1xuICAvLyB3aWxsIG5vdCBhcHBlYXIuXG4gIC8vIHJlcXVpcmUoJy4vdXRpbHMnKS5kaXNhYmxlTG9nKGZhbHNlKTtcblxuICAvLyBCcm93c2VyIHNoaW1zLlxuICB2YXIgY2hyb21lU2hpbSA9IHJlcXVpcmUoJy4vY2hyb21lL2Nocm9tZV9zaGltJykgfHwgbnVsbDtcbiAgdmFyIGVkZ2VTaGltID0gcmVxdWlyZSgnLi9lZGdlL2VkZ2Vfc2hpbScpIHx8IG51bGw7XG4gIHZhciBmaXJlZm94U2hpbSA9IHJlcXVpcmUoJy4vZmlyZWZveC9maXJlZm94X3NoaW0nKSB8fCBudWxsO1xuICB2YXIgc2FmYXJpU2hpbSA9IHJlcXVpcmUoJy4vc2FmYXJpL3NhZmFyaV9zaGltJykgfHwgbnVsbDtcbiAgdmFyIGNvbW1vblNoaW0gPSByZXF1aXJlKCcuL2NvbW1vbl9zaGltJykgfHwgbnVsbDtcblxuICAvLyBFeHBvcnQgdG8gdGhlIGFkYXB0ZXIgZ2xvYmFsIG9iamVjdCB2aXNpYmxlIGluIHRoZSBicm93c2VyLlxuICB2YXIgYWRhcHRlciA9IHtcbiAgICBicm93c2VyRGV0YWlsczogYnJvd3NlckRldGFpbHMsXG4gICAgY29tbW9uU2hpbTogY29tbW9uU2hpbSxcbiAgICBleHRyYWN0VmVyc2lvbjogdXRpbHMuZXh0cmFjdFZlcnNpb24sXG4gICAgZGlzYWJsZUxvZzogdXRpbHMuZGlzYWJsZUxvZyxcbiAgICBkaXNhYmxlV2FybmluZ3M6IHV0aWxzLmRpc2FibGVXYXJuaW5nc1xuICB9O1xuXG4gIC8vIFNoaW0gYnJvd3NlciBpZiBmb3VuZC5cbiAgc3dpdGNoIChicm93c2VyRGV0YWlscy5icm93c2VyKSB7XG4gICAgY2FzZSAnY2hyb21lJzpcbiAgICAgIGlmICghY2hyb21lU2hpbSB8fCAhY2hyb21lU2hpbS5zaGltUGVlckNvbm5lY3Rpb24gfHxcbiAgICAgICAgICAhb3B0aW9ucy5zaGltQ2hyb21lKSB7XG4gICAgICAgIGxvZ2dpbmcoJ0Nocm9tZSBzaGltIGlzIG5vdCBpbmNsdWRlZCBpbiB0aGlzIGFkYXB0ZXIgcmVsZWFzZS4nKTtcbiAgICAgICAgcmV0dXJuIGFkYXB0ZXI7XG4gICAgICB9XG4gICAgICBsb2dnaW5nKCdhZGFwdGVyLmpzIHNoaW1taW5nIGNocm9tZS4nKTtcbiAgICAgIC8vIEV4cG9ydCB0byB0aGUgYWRhcHRlciBnbG9iYWwgb2JqZWN0IHZpc2libGUgaW4gdGhlIGJyb3dzZXIuXG4gICAgICBhZGFwdGVyLmJyb3dzZXJTaGltID0gY2hyb21lU2hpbTtcbiAgICAgIGNvbW1vblNoaW0uc2hpbUNyZWF0ZU9iamVjdFVSTCh3aW5kb3cpO1xuXG4gICAgICBjaHJvbWVTaGltLnNoaW1HZXRVc2VyTWVkaWEod2luZG93KTtcbiAgICAgIGNocm9tZVNoaW0uc2hpbU1lZGlhU3RyZWFtKHdpbmRvdyk7XG4gICAgICBjaHJvbWVTaGltLnNoaW1Tb3VyY2VPYmplY3Qod2luZG93KTtcbiAgICAgIGNocm9tZVNoaW0uc2hpbVBlZXJDb25uZWN0aW9uKHdpbmRvdyk7XG4gICAgICBjaHJvbWVTaGltLnNoaW1PblRyYWNrKHdpbmRvdyk7XG4gICAgICBjaHJvbWVTaGltLnNoaW1BZGRUcmFja1JlbW92ZVRyYWNrKHdpbmRvdyk7XG4gICAgICBjaHJvbWVTaGltLnNoaW1HZXRTZW5kZXJzV2l0aER0bWYod2luZG93KTtcblxuICAgICAgY29tbW9uU2hpbS5zaGltUlRDSWNlQ2FuZGlkYXRlKHdpbmRvdyk7XG4gICAgICBjb21tb25TaGltLnNoaW1NYXhNZXNzYWdlU2l6ZSh3aW5kb3cpO1xuICAgICAgY29tbW9uU2hpbS5zaGltU2VuZFRocm93VHlwZUVycm9yKHdpbmRvdyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdmaXJlZm94JzpcbiAgICAgIGlmICghZmlyZWZveFNoaW0gfHwgIWZpcmVmb3hTaGltLnNoaW1QZWVyQ29ubmVjdGlvbiB8fFxuICAgICAgICAgICFvcHRpb25zLnNoaW1GaXJlZm94KSB7XG4gICAgICAgIGxvZ2dpbmcoJ0ZpcmVmb3ggc2hpbSBpcyBub3QgaW5jbHVkZWQgaW4gdGhpcyBhZGFwdGVyIHJlbGVhc2UuJyk7XG4gICAgICAgIHJldHVybiBhZGFwdGVyO1xuICAgICAgfVxuICAgICAgbG9nZ2luZygnYWRhcHRlci5qcyBzaGltbWluZyBmaXJlZm94LicpO1xuICAgICAgLy8gRXhwb3J0IHRvIHRoZSBhZGFwdGVyIGdsb2JhbCBvYmplY3QgdmlzaWJsZSBpbiB0aGUgYnJvd3Nlci5cbiAgICAgIGFkYXB0ZXIuYnJvd3NlclNoaW0gPSBmaXJlZm94U2hpbTtcbiAgICAgIGNvbW1vblNoaW0uc2hpbUNyZWF0ZU9iamVjdFVSTCh3aW5kb3cpO1xuXG4gICAgICBmaXJlZm94U2hpbS5zaGltR2V0VXNlck1lZGlhKHdpbmRvdyk7XG4gICAgICBmaXJlZm94U2hpbS5zaGltU291cmNlT2JqZWN0KHdpbmRvdyk7XG4gICAgICBmaXJlZm94U2hpbS5zaGltUGVlckNvbm5lY3Rpb24od2luZG93KTtcbiAgICAgIGZpcmVmb3hTaGltLnNoaW1PblRyYWNrKHdpbmRvdyk7XG4gICAgICBmaXJlZm94U2hpbS5zaGltUmVtb3ZlU3RyZWFtKHdpbmRvdyk7XG5cbiAgICAgIGNvbW1vblNoaW0uc2hpbVJUQ0ljZUNhbmRpZGF0ZSh3aW5kb3cpO1xuICAgICAgY29tbW9uU2hpbS5zaGltTWF4TWVzc2FnZVNpemUod2luZG93KTtcbiAgICAgIGNvbW1vblNoaW0uc2hpbVNlbmRUaHJvd1R5cGVFcnJvcih3aW5kb3cpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnZWRnZSc6XG4gICAgICBpZiAoIWVkZ2VTaGltIHx8ICFlZGdlU2hpbS5zaGltUGVlckNvbm5lY3Rpb24gfHwgIW9wdGlvbnMuc2hpbUVkZ2UpIHtcbiAgICAgICAgbG9nZ2luZygnTVMgZWRnZSBzaGltIGlzIG5vdCBpbmNsdWRlZCBpbiB0aGlzIGFkYXB0ZXIgcmVsZWFzZS4nKTtcbiAgICAgICAgcmV0dXJuIGFkYXB0ZXI7XG4gICAgICB9XG4gICAgICBsb2dnaW5nKCdhZGFwdGVyLmpzIHNoaW1taW5nIGVkZ2UuJyk7XG4gICAgICAvLyBFeHBvcnQgdG8gdGhlIGFkYXB0ZXIgZ2xvYmFsIG9iamVjdCB2aXNpYmxlIGluIHRoZSBicm93c2VyLlxuICAgICAgYWRhcHRlci5icm93c2VyU2hpbSA9IGVkZ2VTaGltO1xuICAgICAgY29tbW9uU2hpbS5zaGltQ3JlYXRlT2JqZWN0VVJMKHdpbmRvdyk7XG5cbiAgICAgIGVkZ2VTaGltLnNoaW1HZXRVc2VyTWVkaWEod2luZG93KTtcbiAgICAgIGVkZ2VTaGltLnNoaW1QZWVyQ29ubmVjdGlvbih3aW5kb3cpO1xuICAgICAgZWRnZVNoaW0uc2hpbVJlcGxhY2VUcmFjayh3aW5kb3cpO1xuXG4gICAgICAvLyB0aGUgZWRnZSBzaGltIGltcGxlbWVudHMgdGhlIGZ1bGwgUlRDSWNlQ2FuZGlkYXRlIG9iamVjdC5cblxuICAgICAgY29tbW9uU2hpbS5zaGltTWF4TWVzc2FnZVNpemUod2luZG93KTtcbiAgICAgIGNvbW1vblNoaW0uc2hpbVNlbmRUaHJvd1R5cGVFcnJvcih3aW5kb3cpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnc2FmYXJpJzpcbiAgICAgIGlmICghc2FmYXJpU2hpbSB8fCAhb3B0aW9ucy5zaGltU2FmYXJpKSB7XG4gICAgICAgIGxvZ2dpbmcoJ1NhZmFyaSBzaGltIGlzIG5vdCBpbmNsdWRlZCBpbiB0aGlzIGFkYXB0ZXIgcmVsZWFzZS4nKTtcbiAgICAgICAgcmV0dXJuIGFkYXB0ZXI7XG4gICAgICB9XG4gICAgICBsb2dnaW5nKCdhZGFwdGVyLmpzIHNoaW1taW5nIHNhZmFyaS4nKTtcbiAgICAgIC8vIEV4cG9ydCB0byB0aGUgYWRhcHRlciBnbG9iYWwgb2JqZWN0IHZpc2libGUgaW4gdGhlIGJyb3dzZXIuXG4gICAgICBhZGFwdGVyLmJyb3dzZXJTaGltID0gc2FmYXJpU2hpbTtcbiAgICAgIGNvbW1vblNoaW0uc2hpbUNyZWF0ZU9iamVjdFVSTCh3aW5kb3cpO1xuXG4gICAgICBzYWZhcmlTaGltLnNoaW1SVENJY2VTZXJ2ZXJVcmxzKHdpbmRvdyk7XG4gICAgICBzYWZhcmlTaGltLnNoaW1DYWxsYmFja3NBUEkod2luZG93KTtcbiAgICAgIHNhZmFyaVNoaW0uc2hpbUxvY2FsU3RyZWFtc0FQSSh3aW5kb3cpO1xuICAgICAgc2FmYXJpU2hpbS5zaGltUmVtb3RlU3RyZWFtc0FQSSh3aW5kb3cpO1xuICAgICAgc2FmYXJpU2hpbS5zaGltVHJhY2tFdmVudFRyYW5zY2VpdmVyKHdpbmRvdyk7XG4gICAgICBzYWZhcmlTaGltLnNoaW1HZXRVc2VyTWVkaWEod2luZG93KTtcbiAgICAgIHNhZmFyaVNoaW0uc2hpbUNyZWF0ZU9mZmVyTGVnYWN5KHdpbmRvdyk7XG5cbiAgICAgIGNvbW1vblNoaW0uc2hpbVJUQ0ljZUNhbmRpZGF0ZSh3aW5kb3cpO1xuICAgICAgY29tbW9uU2hpbS5zaGltTWF4TWVzc2FnZVNpemUod2luZG93KTtcbiAgICAgIGNvbW1vblNoaW0uc2hpbVNlbmRUaHJvd1R5cGVFcnJvcih3aW5kb3cpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGxvZ2dpbmcoJ1Vuc3VwcG9ydGVkIGJyb3dzZXIhJyk7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIHJldHVybiBhZGFwdGVyO1xufTtcblxufSx7XCIuL2Nocm9tZS9jaHJvbWVfc2hpbVwiOjUsXCIuL2NvbW1vbl9zaGltXCI6NyxcIi4vZWRnZS9lZGdlX3NoaW1cIjo4LFwiLi9maXJlZm94L2ZpcmVmb3hfc2hpbVwiOjEwLFwiLi9zYWZhcmkvc2FmYXJpX3NoaW1cIjoxMixcIi4vdXRpbHNcIjoxM31dLDU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG4vKlxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxuICogIHRyZWUuXG4gKi9cbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cbid1c2Ugc3RyaWN0JztcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzLmpzJyk7XG52YXIgbG9nZ2luZyA9IHV0aWxzLmxvZztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNoaW1HZXRVc2VyTWVkaWE6IHJlcXVpcmUoJy4vZ2V0dXNlcm1lZGlhJyksXG4gIHNoaW1NZWRpYVN0cmVhbTogZnVuY3Rpb24od2luZG93KSB7XG4gICAgd2luZG93Lk1lZGlhU3RyZWFtID0gd2luZG93Lk1lZGlhU3RyZWFtIHx8IHdpbmRvdy53ZWJraXRNZWRpYVN0cmVhbTtcbiAgfSxcblxuICBzaGltT25UcmFjazogZnVuY3Rpb24od2luZG93KSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiAmJiAhKCdvbnRyYWNrJyBpblxuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUsICdvbnRyYWNrJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9vbnRyYWNrO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKGYpIHtcbiAgICAgICAgICBpZiAodGhpcy5fb250cmFjaykge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFjaycsIHRoaXMuX29udHJhY2spO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYWNrJywgdGhpcy5fb250cmFjayA9IGYpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHZhciBvcmlnU2V0UmVtb3RlRGVzY3JpcHRpb24gPVxuICAgICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0UmVtb3RlRGVzY3JpcHRpb247XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnNldFJlbW90ZURlc2NyaXB0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICAgIGlmICghcGMuX29udHJhY2twb2x5KSB7XG4gICAgICAgICAgcGMuX29udHJhY2twb2x5ID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgLy8gb25hZGRzdHJlYW0gZG9lcyBub3QgZmlyZSB3aGVuIGEgdHJhY2sgaXMgYWRkZWQgdG8gYW4gZXhpc3RpbmdcbiAgICAgICAgICAgIC8vIHN0cmVhbS4gQnV0IHN0cmVhbS5vbmFkZHRyYWNrIGlzIGltcGxlbWVudGVkIHNvIHdlIHVzZSB0aGF0LlxuICAgICAgICAgICAgZS5zdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcignYWRkdHJhY2snLCBmdW5jdGlvbih0ZSkge1xuICAgICAgICAgICAgICB2YXIgcmVjZWl2ZXI7XG4gICAgICAgICAgICAgIGlmICh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFJlY2VpdmVycykge1xuICAgICAgICAgICAgICAgIHJlY2VpdmVyID0gcGMuZ2V0UmVjZWl2ZXJzKCkuZmluZChmdW5jdGlvbihyKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gci50cmFjayAmJiByLnRyYWNrLmlkID09PSB0ZS50cmFjay5pZDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWNlaXZlciA9IHt0cmFjazogdGUudHJhY2t9O1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCd0cmFjaycpO1xuICAgICAgICAgICAgICBldmVudC50cmFjayA9IHRlLnRyYWNrO1xuICAgICAgICAgICAgICBldmVudC5yZWNlaXZlciA9IHJlY2VpdmVyO1xuICAgICAgICAgICAgICBldmVudC50cmFuc2NlaXZlciA9IHtyZWNlaXZlcjogcmVjZWl2ZXJ9O1xuICAgICAgICAgICAgICBldmVudC5zdHJlYW1zID0gW2Uuc3RyZWFtXTtcbiAgICAgICAgICAgICAgcGMuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGUuc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcbiAgICAgICAgICAgICAgdmFyIHJlY2VpdmVyO1xuICAgICAgICAgICAgICBpZiAod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRSZWNlaXZlcnMpIHtcbiAgICAgICAgICAgICAgICByZWNlaXZlciA9IHBjLmdldFJlY2VpdmVycygpLmZpbmQoZnVuY3Rpb24ocikge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHIudHJhY2sgJiYgci50cmFjay5pZCA9PT0gdHJhY2suaWQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVjZWl2ZXIgPSB7dHJhY2s6IHRyYWNrfTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ3RyYWNrJyk7XG4gICAgICAgICAgICAgIGV2ZW50LnRyYWNrID0gdHJhY2s7XG4gICAgICAgICAgICAgIGV2ZW50LnJlY2VpdmVyID0gcmVjZWl2ZXI7XG4gICAgICAgICAgICAgIGV2ZW50LnRyYW5zY2VpdmVyID0ge3JlY2VpdmVyOiByZWNlaXZlcn07XG4gICAgICAgICAgICAgIGV2ZW50LnN0cmVhbXMgPSBbZS5zdHJlYW1dO1xuICAgICAgICAgICAgICBwYy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH07XG4gICAgICAgICAgcGMuYWRkRXZlbnRMaXN0ZW5lcignYWRkc3RyZWFtJywgcGMuX29udHJhY2twb2x5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3JpZ1NldFJlbW90ZURlc2NyaXB0aW9uLmFwcGx5KHBjLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKCEoJ1JUQ1J0cFRyYW5zY2VpdmVyJyBpbiB3aW5kb3cpKSB7XG4gICAgICB1dGlscy53cmFwUGVlckNvbm5lY3Rpb25FdmVudCh3aW5kb3csICd0cmFjaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKCFlLnRyYW5zY2VpdmVyKSB7XG4gICAgICAgICAgZS50cmFuc2NlaXZlciA9IHtyZWNlaXZlcjogZS5yZWNlaXZlcn07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGU7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgc2hpbUdldFNlbmRlcnNXaXRoRHRtZjogZnVuY3Rpb24od2luZG93KSB7XG4gICAgLy8gT3ZlcnJpZGVzIGFkZFRyYWNrL3JlbW92ZVRyYWNrLCBkZXBlbmRzIG9uIHNoaW1BZGRUcmFja1JlbW92ZVRyYWNrLlxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gJiZcbiAgICAgICAgISgnZ2V0U2VuZGVycycgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkgJiZcbiAgICAgICAgJ2NyZWF0ZURUTUZTZW5kZXInIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpIHtcbiAgICAgIHZhciBzaGltU2VuZGVyV2l0aER0bWYgPSBmdW5jdGlvbihwYywgdHJhY2spIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0cmFjazogdHJhY2ssXG4gICAgICAgICAgZ2V0IGR0bWYoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fZHRtZiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIGlmICh0cmFjay5raW5kID09PSAnYXVkaW8nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZHRtZiA9IHBjLmNyZWF0ZURUTUZTZW5kZXIodHJhY2spO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2R0bWYgPSBudWxsO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZHRtZjtcbiAgICAgICAgICB9LFxuICAgICAgICAgIF9wYzogcGNcbiAgICAgICAgfTtcbiAgICAgIH07XG5cbiAgICAgIC8vIGF1Z21lbnQgYWRkVHJhY2sgd2hlbiBnZXRTZW5kZXJzIGlzIG5vdCBhdmFpbGFibGUuXG4gICAgICBpZiAoIXdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U2VuZGVycykge1xuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFNlbmRlcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aGlzLl9zZW5kZXJzID0gdGhpcy5fc2VuZGVycyB8fCBbXTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fc2VuZGVycy5zbGljZSgpOyAvLyByZXR1cm4gYSBjb3B5IG9mIHRoZSBpbnRlcm5hbCBzdGF0ZS5cbiAgICAgICAgfTtcbiAgICAgICAgdmFyIG9yaWdBZGRUcmFjayA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2s7XG4gICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2sgPSBmdW5jdGlvbih0cmFjaywgc3RyZWFtKSB7XG4gICAgICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgICAgICB2YXIgc2VuZGVyID0gb3JpZ0FkZFRyYWNrLmFwcGx5KHBjLCBhcmd1bWVudHMpO1xuICAgICAgICAgIGlmICghc2VuZGVyKSB7XG4gICAgICAgICAgICBzZW5kZXIgPSBzaGltU2VuZGVyV2l0aER0bWYocGMsIHRyYWNrKTtcbiAgICAgICAgICAgIHBjLl9zZW5kZXJzLnB1c2goc2VuZGVyKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHNlbmRlcjtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgb3JpZ1JlbW92ZVRyYWNrID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVUcmFjaztcbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVUcmFjayA9IGZ1bmN0aW9uKHNlbmRlcikge1xuICAgICAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICAgICAgb3JpZ1JlbW92ZVRyYWNrLmFwcGx5KHBjLCBhcmd1bWVudHMpO1xuICAgICAgICAgIHZhciBpZHggPSBwYy5fc2VuZGVycy5pbmRleE9mKHNlbmRlcik7XG4gICAgICAgICAgaWYgKGlkeCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHBjLl9zZW5kZXJzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHZhciBvcmlnQWRkU3RyZWFtID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRTdHJlYW07XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgICBwYy5fc2VuZGVycyA9IHBjLl9zZW5kZXJzIHx8IFtdO1xuICAgICAgICBvcmlnQWRkU3RyZWFtLmFwcGx5KHBjLCBbc3RyZWFtXSk7XG4gICAgICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XG4gICAgICAgICAgcGMuX3NlbmRlcnMucHVzaChzaGltU2VuZGVyV2l0aER0bWYocGMsIHRyYWNrKSk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgdmFyIG9yaWdSZW1vdmVTdHJlYW0gPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVN0cmVhbTtcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICAgIHBjLl9zZW5kZXJzID0gcGMuX3NlbmRlcnMgfHwgW107XG4gICAgICAgIG9yaWdSZW1vdmVTdHJlYW0uYXBwbHkocGMsIFtzdHJlYW1dKTtcblxuICAgICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xuICAgICAgICAgIHZhciBzZW5kZXIgPSBwYy5fc2VuZGVycy5maW5kKGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgICAgIHJldHVybiBzLnRyYWNrID09PSB0cmFjaztcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoc2VuZGVyKSB7XG4gICAgICAgICAgICBwYy5fc2VuZGVycy5zcGxpY2UocGMuX3NlbmRlcnMuaW5kZXhPZihzZW5kZXIpLCAxKTsgLy8gcmVtb3ZlIHNlbmRlclxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uICYmXG4gICAgICAgICAgICAgICAnZ2V0U2VuZGVycycgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSAmJlxuICAgICAgICAgICAgICAgJ2NyZWF0ZURUTUZTZW5kZXInIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUgJiZcbiAgICAgICAgICAgICAgIHdpbmRvdy5SVENSdHBTZW5kZXIgJiZcbiAgICAgICAgICAgICAgICEoJ2R0bWYnIGluIHdpbmRvdy5SVENSdHBTZW5kZXIucHJvdG90eXBlKSkge1xuICAgICAgdmFyIG9yaWdHZXRTZW5kZXJzID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTZW5kZXJzO1xuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTZW5kZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICAgIHZhciBzZW5kZXJzID0gb3JpZ0dldFNlbmRlcnMuYXBwbHkocGMsIFtdKTtcbiAgICAgICAgc2VuZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHNlbmRlcikge1xuICAgICAgICAgIHNlbmRlci5fcGMgPSBwYztcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzZW5kZXJzO1xuICAgICAgfTtcblxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENSdHBTZW5kZXIucHJvdG90eXBlLCAnZHRtZicsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAodGhpcy5fZHRtZiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50cmFjay5raW5kID09PSAnYXVkaW8nKSB7XG4gICAgICAgICAgICAgIHRoaXMuX2R0bWYgPSB0aGlzLl9wYy5jcmVhdGVEVE1GU2VuZGVyKHRoaXMudHJhY2spO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5fZHRtZiA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aGlzLl9kdG1mO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgc2hpbVNvdXJjZU9iamVjdDogZnVuY3Rpb24od2luZG93KSB7XG4gICAgdmFyIFVSTCA9IHdpbmRvdyAmJiB3aW5kb3cuVVJMO1xuXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAod2luZG93LkhUTUxNZWRpYUVsZW1lbnQgJiZcbiAgICAgICAgISgnc3JjT2JqZWN0JyBpbiB3aW5kb3cuSFRNTE1lZGlhRWxlbWVudC5wcm90b3R5cGUpKSB7XG4gICAgICAgIC8vIFNoaW0gdGhlIHNyY09iamVjdCBwcm9wZXJ0eSwgb25jZSwgd2hlbiBIVE1MTWVkaWFFbGVtZW50IGlzIGZvdW5kLlxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LkhUTUxNZWRpYUVsZW1lbnQucHJvdG90eXBlLCAnc3JjT2JqZWN0Jywge1xuICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3JjT2JqZWN0O1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc2V0OiBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIC8vIFVzZSBfc3JjT2JqZWN0IGFzIGEgcHJpdmF0ZSBwcm9wZXJ0eSBmb3IgdGhpcyBzaGltXG4gICAgICAgICAgICB0aGlzLl9zcmNPYmplY3QgPSBzdHJlYW07XG4gICAgICAgICAgICBpZiAodGhpcy5zcmMpIHtcbiAgICAgICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTCh0aGlzLnNyYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghc3RyZWFtKSB7XG4gICAgICAgICAgICAgIHRoaXMuc3JjID0gJyc7XG4gICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoc3RyZWFtKTtcbiAgICAgICAgICAgIC8vIFdlIG5lZWQgdG8gcmVjcmVhdGUgdGhlIGJsb2IgdXJsIHdoZW4gYSB0cmFjayBpcyBhZGRlZCBvclxuICAgICAgICAgICAgLy8gcmVtb3ZlZC4gRG9pbmcgaXQgbWFudWFsbHkgc2luY2Ugd2Ugd2FudCB0byBhdm9pZCBhIHJlY3Vyc2lvbi5cbiAgICAgICAgICAgIHN0cmVhbS5hZGRFdmVudExpc3RlbmVyKCdhZGR0cmFjaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBpZiAoc2VsZi5zcmMpIHtcbiAgICAgICAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHNlbGYuc3JjKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzZWxmLnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoc3RyZWFtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoJ3JlbW92ZXRyYWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGlmIChzZWxmLnNyYykge1xuICAgICAgICAgICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwoc2VsZi5zcmMpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNlbGYuc3JjID0gVVJMLmNyZWF0ZU9iamVjdFVSTChzdHJlYW0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgc2hpbUFkZFRyYWNrUmVtb3ZlVHJhY2tXaXRoTmF0aXZlOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICAvLyBzaGltIGFkZFRyYWNrL3JlbW92ZVRyYWNrIHdpdGggbmF0aXZlIHZhcmlhbnRzIGluIG9yZGVyIHRvIG1ha2VcbiAgICAvLyB0aGUgaW50ZXJhY3Rpb25zIHdpdGggbGVnYWN5IGdldExvY2FsU3RyZWFtcyBiZWhhdmUgYXMgaW4gb3RoZXIgYnJvd3NlcnMuXG4gICAgLy8gS2VlcHMgYSBtYXBwaW5nIHN0cmVhbS5pZCA9PiBbc3RyZWFtLCBydHBzZW5kZXJzLi4uXVxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0TG9jYWxTdHJlYW1zID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcyA9IHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMgfHwge307XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcykubWFwKGZ1bmN0aW9uKHN0cmVhbUlkKSB7XG4gICAgICAgIHJldHVybiBwYy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW1JZF1bMF07XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIG9yaWdBZGRUcmFjayA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2s7XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjayA9IGZ1bmN0aW9uKHRyYWNrLCBzdHJlYW0pIHtcbiAgICAgIGlmICghc3RyZWFtKSB7XG4gICAgICAgIHJldHVybiBvcmlnQWRkVHJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMgPSB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zIHx8IHt9O1xuXG4gICAgICB2YXIgc2VuZGVyID0gb3JpZ0FkZFRyYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICBpZiAoIXRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtLmlkXSkge1xuICAgICAgICB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbS5pZF0gPSBbc3RyZWFtLCBzZW5kZXJdO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbS5pZF0uaW5kZXhPZihzZW5kZXIpID09PSAtMSkge1xuICAgICAgICB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbS5pZF0ucHVzaChzZW5kZXIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNlbmRlcjtcbiAgICB9O1xuXG4gICAgdmFyIG9yaWdBZGRTdHJlYW0gPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFN0cmVhbTtcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgIHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMgPSB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zIHx8IHt9O1xuXG4gICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xuICAgICAgICB2YXIgYWxyZWFkeUV4aXN0cyA9IHBjLmdldFNlbmRlcnMoKS5maW5kKGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgICByZXR1cm4gcy50cmFjayA9PT0gdHJhY2s7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoYWxyZWFkeUV4aXN0cykge1xuICAgICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oJ1RyYWNrIGFscmVhZHkgZXhpc3RzLicsXG4gICAgICAgICAgICAgICdJbnZhbGlkQWNjZXNzRXJyb3InKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB2YXIgZXhpc3RpbmdTZW5kZXJzID0gcGMuZ2V0U2VuZGVycygpO1xuICAgICAgb3JpZ0FkZFN0cmVhbS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgdmFyIG5ld1NlbmRlcnMgPSBwYy5nZXRTZW5kZXJzKCkuZmlsdGVyKGZ1bmN0aW9uKG5ld1NlbmRlcikge1xuICAgICAgICByZXR1cm4gZXhpc3RpbmdTZW5kZXJzLmluZGV4T2YobmV3U2VuZGVyKSA9PT0gLTE7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtLmlkXSA9IFtzdHJlYW1dLmNvbmNhdChuZXdTZW5kZXJzKTtcbiAgICB9O1xuXG4gICAgdmFyIG9yaWdSZW1vdmVTdHJlYW0gPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVN0cmVhbTtcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcyA9IHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMgfHwge307XG4gICAgICBkZWxldGUgdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW0uaWRdO1xuICAgICAgcmV0dXJuIG9yaWdSZW1vdmVTdHJlYW0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuXG4gICAgdmFyIG9yaWdSZW1vdmVUcmFjayA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlVHJhY2s7XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVUcmFjayA9IGZ1bmN0aW9uKHNlbmRlcikge1xuICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgIHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMgPSB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zIHx8IHt9O1xuICAgICAgaWYgKHNlbmRlcikge1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zKS5mb3JFYWNoKGZ1bmN0aW9uKHN0cmVhbUlkKSB7XG4gICAgICAgICAgdmFyIGlkeCA9IHBjLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbUlkXS5pbmRleE9mKHNlbmRlcik7XG4gICAgICAgICAgaWYgKGlkeCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHBjLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbUlkXS5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHBjLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbUlkXS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBwYy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW1JZF07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvcmlnUmVtb3ZlVHJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9LFxuXG4gIHNoaW1BZGRUcmFja1JlbW92ZVRyYWNrOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICB2YXIgYnJvd3NlckRldGFpbHMgPSB1dGlscy5kZXRlY3RCcm93c2VyKHdpbmRvdyk7XG4gICAgLy8gc2hpbSBhZGRUcmFjayBhbmQgcmVtb3ZlVHJhY2suXG4gICAgaWYgKHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2sgJiZcbiAgICAgICAgYnJvd3NlckRldGFpbHMudmVyc2lvbiA+PSA2NSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2hpbUFkZFRyYWNrUmVtb3ZlVHJhY2tXaXRoTmF0aXZlKHdpbmRvdyk7XG4gICAgfVxuXG4gICAgLy8gYWxzbyBzaGltIHBjLmdldExvY2FsU3RyZWFtcyB3aGVuIGFkZFRyYWNrIGlzIHNoaW1tZWRcbiAgICAvLyB0byByZXR1cm4gdGhlIG9yaWdpbmFsIHN0cmVhbXMuXG4gICAgdmFyIG9yaWdHZXRMb2NhbFN0cmVhbXMgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlXG4gICAgICAgIC5nZXRMb2NhbFN0cmVhbXM7XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRMb2NhbFN0cmVhbXMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICB2YXIgbmF0aXZlU3RyZWFtcyA9IG9yaWdHZXRMb2NhbFN0cmVhbXMuYXBwbHkodGhpcyk7XG4gICAgICBwYy5fcmV2ZXJzZVN0cmVhbXMgPSBwYy5fcmV2ZXJzZVN0cmVhbXMgfHwge307XG4gICAgICByZXR1cm4gbmF0aXZlU3RyZWFtcy5tYXAoZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICAgIHJldHVybiBwYy5fcmV2ZXJzZVN0cmVhbXNbc3RyZWFtLmlkXTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgb3JpZ0FkZFN0cmVhbSA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkU3RyZWFtO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgcGMuX3N0cmVhbXMgPSBwYy5fc3RyZWFtcyB8fCB7fTtcbiAgICAgIHBjLl9yZXZlcnNlU3RyZWFtcyA9IHBjLl9yZXZlcnNlU3RyZWFtcyB8fCB7fTtcblxuICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcbiAgICAgICAgdmFyIGFscmVhZHlFeGlzdHMgPSBwYy5nZXRTZW5kZXJzKCkuZmluZChmdW5jdGlvbihzKSB7XG4gICAgICAgICAgcmV0dXJuIHMudHJhY2sgPT09IHRyYWNrO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGFscmVhZHlFeGlzdHMpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKCdUcmFjayBhbHJlYWR5IGV4aXN0cy4nLFxuICAgICAgICAgICAgICAnSW52YWxpZEFjY2Vzc0Vycm9yJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgLy8gQWRkIGlkZW50aXR5IG1hcHBpbmcgZm9yIGNvbnNpc3RlbmN5IHdpdGggYWRkVHJhY2suXG4gICAgICAvLyBVbmxlc3MgdGhpcyBpcyBiZWluZyB1c2VkIHdpdGggYSBzdHJlYW0gZnJvbSBhZGRUcmFjay5cbiAgICAgIGlmICghcGMuX3JldmVyc2VTdHJlYW1zW3N0cmVhbS5pZF0pIHtcbiAgICAgICAgdmFyIG5ld1N0cmVhbSA9IG5ldyB3aW5kb3cuTWVkaWFTdHJlYW0oc3RyZWFtLmdldFRyYWNrcygpKTtcbiAgICAgICAgcGMuX3N0cmVhbXNbc3RyZWFtLmlkXSA9IG5ld1N0cmVhbTtcbiAgICAgICAgcGMuX3JldmVyc2VTdHJlYW1zW25ld1N0cmVhbS5pZF0gPSBzdHJlYW07XG4gICAgICAgIHN0cmVhbSA9IG5ld1N0cmVhbTtcbiAgICAgIH1cbiAgICAgIG9yaWdBZGRTdHJlYW0uYXBwbHkocGMsIFtzdHJlYW1dKTtcbiAgICB9O1xuXG4gICAgdmFyIG9yaWdSZW1vdmVTdHJlYW0gPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVN0cmVhbTtcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgIHBjLl9zdHJlYW1zID0gcGMuX3N0cmVhbXMgfHwge307XG4gICAgICBwYy5fcmV2ZXJzZVN0cmVhbXMgPSBwYy5fcmV2ZXJzZVN0cmVhbXMgfHwge307XG5cbiAgICAgIG9yaWdSZW1vdmVTdHJlYW0uYXBwbHkocGMsIFsocGMuX3N0cmVhbXNbc3RyZWFtLmlkXSB8fCBzdHJlYW0pXSk7XG4gICAgICBkZWxldGUgcGMuX3JldmVyc2VTdHJlYW1zWyhwYy5fc3RyZWFtc1tzdHJlYW0uaWRdID9cbiAgICAgICAgICBwYy5fc3RyZWFtc1tzdHJlYW0uaWRdLmlkIDogc3RyZWFtLmlkKV07XG4gICAgICBkZWxldGUgcGMuX3N0cmVhbXNbc3RyZWFtLmlkXTtcbiAgICB9O1xuXG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjayA9IGZ1bmN0aW9uKHRyYWNrLCBzdHJlYW0pIHtcbiAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICBpZiAocGMuc2lnbmFsaW5nU3RhdGUgPT09ICdjbG9zZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oXG4gICAgICAgICAgJ1RoZSBSVENQZWVyQ29ubmVjdGlvblxcJ3Mgc2lnbmFsaW5nU3RhdGUgaXMgXFwnY2xvc2VkXFwnLicsXG4gICAgICAgICAgJ0ludmFsaWRTdGF0ZUVycm9yJyk7XG4gICAgICB9XG4gICAgICB2YXIgc3RyZWFtcyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgIGlmIChzdHJlYW1zLmxlbmd0aCAhPT0gMSB8fFxuICAgICAgICAgICFzdHJlYW1zWzBdLmdldFRyYWNrcygpLmZpbmQoZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgcmV0dXJuIHQgPT09IHRyYWNrO1xuICAgICAgICAgIH0pKSB7XG4gICAgICAgIC8vIHRoaXMgaXMgbm90IGZ1bGx5IGNvcnJlY3QgYnV0IGFsbCB3ZSBjYW4gbWFuYWdlIHdpdGhvdXRcbiAgICAgICAgLy8gW1thc3NvY2lhdGVkIE1lZGlhU3RyZWFtc11dIGludGVybmFsIHNsb3QuXG4gICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oXG4gICAgICAgICAgJ1RoZSBhZGFwdGVyLmpzIGFkZFRyYWNrIHBvbHlmaWxsIG9ubHkgc3VwcG9ydHMgYSBzaW5nbGUgJyArXG4gICAgICAgICAgJyBzdHJlYW0gd2hpY2ggaXMgYXNzb2NpYXRlZCB3aXRoIHRoZSBzcGVjaWZpZWQgdHJhY2suJyxcbiAgICAgICAgICAnTm90U3VwcG9ydGVkRXJyb3InKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGFscmVhZHlFeGlzdHMgPSBwYy5nZXRTZW5kZXJzKCkuZmluZChmdW5jdGlvbihzKSB7XG4gICAgICAgIHJldHVybiBzLnRyYWNrID09PSB0cmFjaztcbiAgICAgIH0pO1xuICAgICAgaWYgKGFscmVhZHlFeGlzdHMpIHtcbiAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbignVHJhY2sgYWxyZWFkeSBleGlzdHMuJyxcbiAgICAgICAgICAgICdJbnZhbGlkQWNjZXNzRXJyb3InKTtcbiAgICAgIH1cblxuICAgICAgcGMuX3N0cmVhbXMgPSBwYy5fc3RyZWFtcyB8fCB7fTtcbiAgICAgIHBjLl9yZXZlcnNlU3RyZWFtcyA9IHBjLl9yZXZlcnNlU3RyZWFtcyB8fCB7fTtcbiAgICAgIHZhciBvbGRTdHJlYW0gPSBwYy5fc3RyZWFtc1tzdHJlYW0uaWRdO1xuICAgICAgaWYgKG9sZFN0cmVhbSkge1xuICAgICAgICAvLyB0aGlzIGlzIHVzaW5nIG9kZCBDaHJvbWUgYmVoYXZpb3VyLCB1c2Ugd2l0aCBjYXV0aW9uOlxuICAgICAgICAvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3Avd2VicnRjL2lzc3Vlcy9kZXRhaWw/aWQ9NzgxNVxuICAgICAgICAvLyBOb3RlOiB3ZSByZWx5IG9uIHRoZSBoaWdoLWxldmVsIGFkZFRyYWNrL2R0bWYgc2hpbSB0b1xuICAgICAgICAvLyBjcmVhdGUgdGhlIHNlbmRlciB3aXRoIGEgZHRtZiBzZW5kZXIuXG4gICAgICAgIG9sZFN0cmVhbS5hZGRUcmFjayh0cmFjayk7XG5cbiAgICAgICAgLy8gVHJpZ2dlciBPTk4gYXN5bmMuXG4gICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcGMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ25lZ290aWF0aW9ubmVlZGVkJykpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBuZXdTdHJlYW0gPSBuZXcgd2luZG93Lk1lZGlhU3RyZWFtKFt0cmFja10pO1xuICAgICAgICBwYy5fc3RyZWFtc1tzdHJlYW0uaWRdID0gbmV3U3RyZWFtO1xuICAgICAgICBwYy5fcmV2ZXJzZVN0cmVhbXNbbmV3U3RyZWFtLmlkXSA9IHN0cmVhbTtcbiAgICAgICAgcGMuYWRkU3RyZWFtKG5ld1N0cmVhbSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcGMuZ2V0U2VuZGVycygpLmZpbmQoZnVuY3Rpb24ocykge1xuICAgICAgICByZXR1cm4gcy50cmFjayA9PT0gdHJhY2s7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gcmVwbGFjZSB0aGUgaW50ZXJuYWwgc3RyZWFtIGlkIHdpdGggdGhlIGV4dGVybmFsIG9uZSBhbmRcbiAgICAvLyB2aWNlIHZlcnNhLlxuICAgIGZ1bmN0aW9uIHJlcGxhY2VJbnRlcm5hbFN0cmVhbUlkKHBjLCBkZXNjcmlwdGlvbikge1xuICAgICAgdmFyIHNkcCA9IGRlc2NyaXB0aW9uLnNkcDtcbiAgICAgIE9iamVjdC5rZXlzKHBjLl9yZXZlcnNlU3RyZWFtcyB8fCBbXSkuZm9yRWFjaChmdW5jdGlvbihpbnRlcm5hbElkKSB7XG4gICAgICAgIHZhciBleHRlcm5hbFN0cmVhbSA9IHBjLl9yZXZlcnNlU3RyZWFtc1tpbnRlcm5hbElkXTtcbiAgICAgICAgdmFyIGludGVybmFsU3RyZWFtID0gcGMuX3N0cmVhbXNbZXh0ZXJuYWxTdHJlYW0uaWRdO1xuICAgICAgICBzZHAgPSBzZHAucmVwbGFjZShuZXcgUmVnRXhwKGludGVybmFsU3RyZWFtLmlkLCAnZycpLFxuICAgICAgICAgICAgZXh0ZXJuYWxTdHJlYW0uaWQpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbmV3IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbih7XG4gICAgICAgIHR5cGU6IGRlc2NyaXB0aW9uLnR5cGUsXG4gICAgICAgIHNkcDogc2RwXG4gICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVwbGFjZUV4dGVybmFsU3RyZWFtSWQocGMsIGRlc2NyaXB0aW9uKSB7XG4gICAgICB2YXIgc2RwID0gZGVzY3JpcHRpb24uc2RwO1xuICAgICAgT2JqZWN0LmtleXMocGMuX3JldmVyc2VTdHJlYW1zIHx8IFtdKS5mb3JFYWNoKGZ1bmN0aW9uKGludGVybmFsSWQpIHtcbiAgICAgICAgdmFyIGV4dGVybmFsU3RyZWFtID0gcGMuX3JldmVyc2VTdHJlYW1zW2ludGVybmFsSWRdO1xuICAgICAgICB2YXIgaW50ZXJuYWxTdHJlYW0gPSBwYy5fc3RyZWFtc1tleHRlcm5hbFN0cmVhbS5pZF07XG4gICAgICAgIHNkcCA9IHNkcC5yZXBsYWNlKG5ldyBSZWdFeHAoZXh0ZXJuYWxTdHJlYW0uaWQsICdnJyksXG4gICAgICAgICAgICBpbnRlcm5hbFN0cmVhbS5pZCk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXcgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKHtcbiAgICAgICAgdHlwZTogZGVzY3JpcHRpb24udHlwZSxcbiAgICAgICAgc2RwOiBzZHBcbiAgICAgIH0pO1xuICAgIH1cbiAgICBbJ2NyZWF0ZU9mZmVyJywgJ2NyZWF0ZUFuc3dlciddLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICB2YXIgbmF0aXZlTWV0aG9kID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdO1xuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICB2YXIgaXNMZWdhY3lDYWxsID0gYXJndW1lbnRzLmxlbmd0aCAmJlxuICAgICAgICAgICAgdHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ2Z1bmN0aW9uJztcbiAgICAgICAgaWYgKGlzTGVnYWN5Q2FsbCkge1xuICAgICAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkocGMsIFtcbiAgICAgICAgICAgIGZ1bmN0aW9uKGRlc2NyaXB0aW9uKSB7XG4gICAgICAgICAgICAgIHZhciBkZXNjID0gcmVwbGFjZUludGVybmFsU3RyZWFtSWQocGMsIGRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgICAgYXJnc1swXS5hcHBseShudWxsLCBbZGVzY10pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICBpZiAoYXJnc1sxXSkge1xuICAgICAgICAgICAgICAgIGFyZ3NbMV0uYXBwbHkobnVsbCwgZXJyKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgYXJndW1lbnRzWzJdXG4gICAgICAgICAgXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseShwYywgYXJndW1lbnRzKVxuICAgICAgICAudGhlbihmdW5jdGlvbihkZXNjcmlwdGlvbikge1xuICAgICAgICAgIHJldHVybiByZXBsYWNlSW50ZXJuYWxTdHJlYW1JZChwYywgZGVzY3JpcHRpb24pO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICB2YXIgb3JpZ1NldExvY2FsRGVzY3JpcHRpb24gPVxuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnNldExvY2FsRGVzY3JpcHRpb247XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5zZXRMb2NhbERlc2NyaXB0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoIHx8ICFhcmd1bWVudHNbMF0udHlwZSkge1xuICAgICAgICByZXR1cm4gb3JpZ1NldExvY2FsRGVzY3JpcHRpb24uYXBwbHkocGMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgICBhcmd1bWVudHNbMF0gPSByZXBsYWNlRXh0ZXJuYWxTdHJlYW1JZChwYywgYXJndW1lbnRzWzBdKTtcbiAgICAgIHJldHVybiBvcmlnU2V0TG9jYWxEZXNjcmlwdGlvbi5hcHBseShwYywgYXJndW1lbnRzKTtcbiAgICB9O1xuXG4gICAgLy8gVE9ETzogbWFuZ2xlIGdldFN0YXRzOiBodHRwczovL3czYy5naXRodWIuaW8vd2VicnRjLXN0YXRzLyNkb20tcnRjbWVkaWFzdHJlYW1zdGF0cy1zdHJlYW1pZGVudGlmaWVyXG5cbiAgICB2YXIgb3JpZ0xvY2FsRGVzY3JpcHRpb24gPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKFxuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLCAnbG9jYWxEZXNjcmlwdGlvbicpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLFxuICAgICAgICAnbG9jYWxEZXNjcmlwdGlvbicsIHtcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgICAgICAgIHZhciBkZXNjcmlwdGlvbiA9IG9yaWdMb2NhbERlc2NyaXB0aW9uLmdldC5hcHBseSh0aGlzKTtcbiAgICAgICAgICAgIGlmIChkZXNjcmlwdGlvbi50eXBlID09PSAnJykge1xuICAgICAgICAgICAgICByZXR1cm4gZGVzY3JpcHRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVwbGFjZUludGVybmFsU3RyZWFtSWQocGMsIGRlc2NyaXB0aW9uKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVUcmFjayA9IGZ1bmN0aW9uKHNlbmRlcikge1xuICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgIGlmIChwYy5zaWduYWxpbmdTdGF0ZSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbihcbiAgICAgICAgICAnVGhlIFJUQ1BlZXJDb25uZWN0aW9uXFwncyBzaWduYWxpbmdTdGF0ZSBpcyBcXCdjbG9zZWRcXCcuJyxcbiAgICAgICAgICAnSW52YWxpZFN0YXRlRXJyb3InKTtcbiAgICAgIH1cbiAgICAgIC8vIFdlIGNhbiBub3QgeWV0IGNoZWNrIGZvciBzZW5kZXIgaW5zdGFuY2VvZiBSVENSdHBTZW5kZXJcbiAgICAgIC8vIHNpbmNlIHdlIHNoaW0gUlRQU2VuZGVyLiBTbyB3ZSBjaGVjayBpZiBzZW5kZXIuX3BjIGlzIHNldC5cbiAgICAgIGlmICghc2VuZGVyLl9wYykge1xuICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKCdBcmd1bWVudCAxIG9mIFJUQ1BlZXJDb25uZWN0aW9uLnJlbW92ZVRyYWNrICcgK1xuICAgICAgICAgICAgJ2RvZXMgbm90IGltcGxlbWVudCBpbnRlcmZhY2UgUlRDUnRwU2VuZGVyLicsICdUeXBlRXJyb3InKTtcbiAgICAgIH1cbiAgICAgIHZhciBpc0xvY2FsID0gc2VuZGVyLl9wYyA9PT0gcGM7XG4gICAgICBpZiAoIWlzTG9jYWwpIHtcbiAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbignU2VuZGVyIHdhcyBub3QgY3JlYXRlZCBieSB0aGlzIGNvbm5lY3Rpb24uJyxcbiAgICAgICAgICAgICdJbnZhbGlkQWNjZXNzRXJyb3InKTtcbiAgICAgIH1cblxuICAgICAgLy8gU2VhcmNoIGZvciB0aGUgbmF0aXZlIHN0cmVhbSB0aGUgc2VuZGVycyB0cmFjayBiZWxvbmdzIHRvLlxuICAgICAgcGMuX3N0cmVhbXMgPSBwYy5fc3RyZWFtcyB8fCB7fTtcbiAgICAgIHZhciBzdHJlYW07XG4gICAgICBPYmplY3Qua2V5cyhwYy5fc3RyZWFtcykuZm9yRWFjaChmdW5jdGlvbihzdHJlYW1pZCkge1xuICAgICAgICB2YXIgaGFzVHJhY2sgPSBwYy5fc3RyZWFtc1tzdHJlYW1pZF0uZ2V0VHJhY2tzKCkuZmluZChmdW5jdGlvbih0cmFjaykge1xuICAgICAgICAgIHJldHVybiBzZW5kZXIudHJhY2sgPT09IHRyYWNrO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGhhc1RyYWNrKSB7XG4gICAgICAgICAgc3RyZWFtID0gcGMuX3N0cmVhbXNbc3RyZWFtaWRdO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKHN0cmVhbSkge1xuICAgICAgICBpZiAoc3RyZWFtLmdldFRyYWNrcygpLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIC8vIGlmIHRoaXMgaXMgdGhlIGxhc3QgdHJhY2sgb2YgdGhlIHN0cmVhbSwgcmVtb3ZlIHRoZSBzdHJlYW0uIFRoaXNcbiAgICAgICAgICAvLyB0YWtlcyBjYXJlIG9mIGFueSBzaGltbWVkIF9zZW5kZXJzLlxuICAgICAgICAgIHBjLnJlbW92ZVN0cmVhbShwYy5fcmV2ZXJzZVN0cmVhbXNbc3RyZWFtLmlkXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gcmVseWluZyBvbiB0aGUgc2FtZSBvZGQgY2hyb21lIGJlaGF2aW91ciBhcyBhYm92ZS5cbiAgICAgICAgICBzdHJlYW0ucmVtb3ZlVHJhY2soc2VuZGVyLnRyYWNrKTtcbiAgICAgICAgfVxuICAgICAgICBwYy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnbmVnb3RpYXRpb25uZWVkZWQnKSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSxcblxuICBzaGltUGVlckNvbm5lY3Rpb246IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIHZhciBicm93c2VyRGV0YWlscyA9IHV0aWxzLmRldGVjdEJyb3dzZXIod2luZG93KTtcblxuICAgIC8vIFRoZSBSVENQZWVyQ29ubmVjdGlvbiBvYmplY3QuXG4gICAgaWYgKCF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gJiYgd2luZG93LndlYmtpdFJUQ1BlZXJDb25uZWN0aW9uKSB7XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gPSBmdW5jdGlvbihwY0NvbmZpZywgcGNDb25zdHJhaW50cykge1xuICAgICAgICAvLyBUcmFuc2xhdGUgaWNlVHJhbnNwb3J0UG9saWN5IHRvIGljZVRyYW5zcG9ydHMsXG4gICAgICAgIC8vIHNlZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3dlYnJ0Yy9pc3N1ZXMvZGV0YWlsP2lkPTQ4NjlcbiAgICAgICAgLy8gdGhpcyB3YXMgZml4ZWQgaW4gTTU2IGFsb25nIHdpdGggdW5wcmVmaXhpbmcgUlRDUGVlckNvbm5lY3Rpb24uXG4gICAgICAgIGxvZ2dpbmcoJ1BlZXJDb25uZWN0aW9uJyk7XG4gICAgICAgIGlmIChwY0NvbmZpZyAmJiBwY0NvbmZpZy5pY2VUcmFuc3BvcnRQb2xpY3kpIHtcbiAgICAgICAgICBwY0NvbmZpZy5pY2VUcmFuc3BvcnRzID0gcGNDb25maWcuaWNlVHJhbnNwb3J0UG9saWN5O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyB3aW5kb3cud2Via2l0UlRDUGVlckNvbm5lY3Rpb24ocGNDb25maWcsIHBjQ29uc3RyYWludHMpO1xuICAgICAgfTtcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUgPVxuICAgICAgICAgIHdpbmRvdy53ZWJraXRSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGU7XG4gICAgICAvLyB3cmFwIHN0YXRpYyBtZXRob2RzLiBDdXJyZW50bHkganVzdCBnZW5lcmF0ZUNlcnRpZmljYXRlLlxuICAgICAgaWYgKHdpbmRvdy53ZWJraXRSVENQZWVyQ29ubmVjdGlvbi5nZW5lcmF0ZUNlcnRpZmljYXRlKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24sICdnZW5lcmF0ZUNlcnRpZmljYXRlJywge1xuICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93LndlYmtpdFJUQ1BlZXJDb25uZWN0aW9uLmdlbmVyYXRlQ2VydGlmaWNhdGU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gbWlncmF0ZSBmcm9tIG5vbi1zcGVjIFJUQ0ljZVNlcnZlci51cmwgdG8gUlRDSWNlU2VydmVyLnVybHNcbiAgICAgIHZhciBPcmlnUGVlckNvbm5lY3Rpb24gPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb247XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gPSBmdW5jdGlvbihwY0NvbmZpZywgcGNDb25zdHJhaW50cykge1xuICAgICAgICBpZiAocGNDb25maWcgJiYgcGNDb25maWcuaWNlU2VydmVycykge1xuICAgICAgICAgIHZhciBuZXdJY2VTZXJ2ZXJzID0gW107XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwY0NvbmZpZy5pY2VTZXJ2ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgc2VydmVyID0gcGNDb25maWcuaWNlU2VydmVyc1tpXTtcbiAgICAgICAgICAgIGlmICghc2VydmVyLmhhc093blByb3BlcnR5KCd1cmxzJykgJiZcbiAgICAgICAgICAgICAgICBzZXJ2ZXIuaGFzT3duUHJvcGVydHkoJ3VybCcpKSB7XG4gICAgICAgICAgICAgIHV0aWxzLmRlcHJlY2F0ZWQoJ1JUQ0ljZVNlcnZlci51cmwnLCAnUlRDSWNlU2VydmVyLnVybHMnKTtcbiAgICAgICAgICAgICAgc2VydmVyID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShzZXJ2ZXIpKTtcbiAgICAgICAgICAgICAgc2VydmVyLnVybHMgPSBzZXJ2ZXIudXJsO1xuICAgICAgICAgICAgICBuZXdJY2VTZXJ2ZXJzLnB1c2goc2VydmVyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG5ld0ljZVNlcnZlcnMucHVzaChwY0NvbmZpZy5pY2VTZXJ2ZXJzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcGNDb25maWcuaWNlU2VydmVycyA9IG5ld0ljZVNlcnZlcnM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBPcmlnUGVlckNvbm5lY3Rpb24ocGNDb25maWcsIHBjQ29uc3RyYWludHMpO1xuICAgICAgfTtcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUgPSBPcmlnUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlO1xuICAgICAgLy8gd3JhcCBzdGF0aWMgbWV0aG9kcy4gQ3VycmVudGx5IGp1c3QgZ2VuZXJhdGVDZXJ0aWZpY2F0ZS5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24sICdnZW5lcmF0ZUNlcnRpZmljYXRlJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBPcmlnUGVlckNvbm5lY3Rpb24uZ2VuZXJhdGVDZXJ0aWZpY2F0ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIG9yaWdHZXRTdGF0cyA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U3RhdHM7XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTdGF0cyA9IGZ1bmN0aW9uKHNlbGVjdG9yLFxuICAgICAgICBzdWNjZXNzQ2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spIHtcbiAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcblxuICAgICAgLy8gSWYgc2VsZWN0b3IgaXMgYSBmdW5jdGlvbiB0aGVuIHdlIGFyZSBpbiB0aGUgb2xkIHN0eWxlIHN0YXRzIHNvIGp1c3RcbiAgICAgIC8vIHBhc3MgYmFjayB0aGUgb3JpZ2luYWwgZ2V0U3RhdHMgZm9ybWF0IHRvIGF2b2lkIGJyZWFraW5nIG9sZCB1c2Vycy5cbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMCAmJiB0eXBlb2Ygc2VsZWN0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG9yaWdHZXRTdGF0cy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICAvLyBXaGVuIHNwZWMtc3R5bGUgZ2V0U3RhdHMgaXMgc3VwcG9ydGVkLCByZXR1cm4gdGhvc2Ugd2hlbiBjYWxsZWQgd2l0aFxuICAgICAgLy8gZWl0aGVyIG5vIGFyZ3VtZW50cyBvciB0aGUgc2VsZWN0b3IgYXJndW1lbnQgaXMgbnVsbC5cbiAgICAgIGlmIChvcmlnR2V0U3RhdHMubGVuZ3RoID09PSAwICYmIChhcmd1bWVudHMubGVuZ3RoID09PSAwIHx8XG4gICAgICAgICAgdHlwZW9mIGFyZ3VtZW50c1swXSAhPT0gJ2Z1bmN0aW9uJykpIHtcbiAgICAgICAgcmV0dXJuIG9yaWdHZXRTdGF0cy5hcHBseSh0aGlzLCBbXSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBmaXhDaHJvbWVTdGF0c18gPSBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICB2YXIgc3RhbmRhcmRSZXBvcnQgPSB7fTtcbiAgICAgICAgdmFyIHJlcG9ydHMgPSByZXNwb25zZS5yZXN1bHQoKTtcbiAgICAgICAgcmVwb3J0cy5mb3JFYWNoKGZ1bmN0aW9uKHJlcG9ydCkge1xuICAgICAgICAgIHZhciBzdGFuZGFyZFN0YXRzID0ge1xuICAgICAgICAgICAgaWQ6IHJlcG9ydC5pZCxcbiAgICAgICAgICAgIHRpbWVzdGFtcDogcmVwb3J0LnRpbWVzdGFtcCxcbiAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgbG9jYWxjYW5kaWRhdGU6ICdsb2NhbC1jYW5kaWRhdGUnLFxuICAgICAgICAgICAgICByZW1vdGVjYW5kaWRhdGU6ICdyZW1vdGUtY2FuZGlkYXRlJ1xuICAgICAgICAgICAgfVtyZXBvcnQudHlwZV0gfHwgcmVwb3J0LnR5cGVcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJlcG9ydC5uYW1lcygpLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xuICAgICAgICAgICAgc3RhbmRhcmRTdGF0c1tuYW1lXSA9IHJlcG9ydC5zdGF0KG5hbWUpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHN0YW5kYXJkUmVwb3J0W3N0YW5kYXJkU3RhdHMuaWRdID0gc3RhbmRhcmRTdGF0cztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHN0YW5kYXJkUmVwb3J0O1xuICAgICAgfTtcblxuICAgICAgLy8gc2hpbSBnZXRTdGF0cyB3aXRoIG1hcGxpa2Ugc3VwcG9ydFxuICAgICAgdmFyIG1ha2VNYXBTdGF0cyA9IGZ1bmN0aW9uKHN0YXRzKSB7XG4gICAgICAgIHJldHVybiBuZXcgTWFwKE9iamVjdC5rZXlzKHN0YXRzKS5tYXAoZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgcmV0dXJuIFtrZXksIHN0YXRzW2tleV1dO1xuICAgICAgICB9KSk7XG4gICAgICB9O1xuXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgIHZhciBzdWNjZXNzQ2FsbGJhY2tXcmFwcGVyXyA9IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgYXJnc1sxXShtYWtlTWFwU3RhdHMoZml4Q2hyb21lU3RhdHNfKHJlc3BvbnNlKSkpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBvcmlnR2V0U3RhdHMuYXBwbHkodGhpcywgW3N1Y2Nlc3NDYWxsYmFja1dyYXBwZXJfLFxuICAgICAgICAgIGFyZ3VtZW50c1swXV0pO1xuICAgICAgfVxuXG4gICAgICAvLyBwcm9taXNlLXN1cHBvcnRcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgb3JpZ0dldFN0YXRzLmFwcGx5KHBjLCBbXG4gICAgICAgICAgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJlc29sdmUobWFrZU1hcFN0YXRzKGZpeENocm9tZVN0YXRzXyhyZXNwb25zZSkpKTtcbiAgICAgICAgICB9LCByZWplY3RdKTtcbiAgICAgIH0pLnRoZW4oc3VjY2Vzc0NhbGxiYWNrLCBlcnJvckNhbGxiYWNrKTtcbiAgICB9O1xuXG4gICAgLy8gYWRkIHByb21pc2Ugc3VwcG9ydCAtLSBuYXRpdmVseSBhdmFpbGFibGUgaW4gQ2hyb21lIDUxXG4gICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCA1MSkge1xuICAgICAgWydzZXRMb2NhbERlc2NyaXB0aW9uJywgJ3NldFJlbW90ZURlc2NyaXB0aW9uJywgJ2FkZEljZUNhbmRpZGF0ZSddXG4gICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgICAgICB2YXIgbmF0aXZlTWV0aG9kID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdO1xuICAgICAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICAgICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgICAgICAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIG5hdGl2ZU1ldGhvZC5hcHBseShwYywgW2FyZ3NbMF0sIHJlc29sdmUsIHJlamVjdF0pO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBwcm9taXNlLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYXJnc1sxXS5hcHBseShudWxsLCBbXSk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA+PSAzKSB7XG4gICAgICAgICAgICAgICAgICBhcmdzWzJdLmFwcGx5KG51bGwsIFtlcnJdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBwcm9taXNlIHN1cHBvcnQgZm9yIGNyZWF0ZU9mZmVyIGFuZCBjcmVhdGVBbnN3ZXIuIEF2YWlsYWJsZSAod2l0aG91dFxuICAgIC8vIGJ1Z3MpIHNpbmNlIE01MjogY3JidWcvNjE5Mjg5XG4gICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCA1Mikge1xuICAgICAgWydjcmVhdGVPZmZlcicsICdjcmVhdGVBbnN3ZXInXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgICB2YXIgbmF0aXZlTWV0aG9kID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdO1xuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMSB8fCAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJlxuICAgICAgICAgICAgICB0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnb2JqZWN0JykpIHtcbiAgICAgICAgICAgIHZhciBvcHRzID0gYXJndW1lbnRzLmxlbmd0aCA9PT0gMSA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgbmF0aXZlTWV0aG9kLmFwcGx5KHBjLCBbcmVzb2x2ZSwgcmVqZWN0LCBvcHRzXSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gc2hpbSBpbXBsaWNpdCBjcmVhdGlvbiBvZiBSVENTZXNzaW9uRGVzY3JpcHRpb24vUlRDSWNlQ2FuZGlkYXRlXG4gICAgWydzZXRMb2NhbERlc2NyaXB0aW9uJywgJ3NldFJlbW90ZURlc2NyaXB0aW9uJywgJ2FkZEljZUNhbmRpZGF0ZSddXG4gICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgICAgIHZhciBuYXRpdmVNZXRob2QgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF07XG4gICAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhcmd1bWVudHNbMF0gPSBuZXcgKChtZXRob2QgPT09ICdhZGRJY2VDYW5kaWRhdGUnKSA/XG4gICAgICAgICAgICAgICAgd2luZG93LlJUQ0ljZUNhbmRpZGF0ZSA6XG4gICAgICAgICAgICAgICAgd2luZG93LlJUQ1Nlc3Npb25EZXNjcmlwdGlvbikoYXJndW1lbnRzWzBdKTtcbiAgICAgICAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgIC8vIHN1cHBvcnQgZm9yIGFkZEljZUNhbmRpZGF0ZShudWxsIG9yIHVuZGVmaW5lZClcbiAgICB2YXIgbmF0aXZlQWRkSWNlQ2FuZGlkYXRlID1cbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRJY2VDYW5kaWRhdGU7XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRJY2VDYW5kaWRhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghYXJndW1lbnRzWzBdKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHNbMV0pIHtcbiAgICAgICAgICBhcmd1bWVudHNbMV0uYXBwbHkobnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5hdGl2ZUFkZEljZUNhbmRpZGF0ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH1cbn07XG5cbn0se1wiLi4vdXRpbHMuanNcIjoxMyxcIi4vZ2V0dXNlcm1lZGlhXCI6Nn1dLDY6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLypcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcbiAqICB0cmVlLlxuICovXG4gLyogZXNsaW50LWVudiBub2RlICovXG4ndXNlIHN0cmljdCc7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscy5qcycpO1xudmFyIGxvZ2dpbmcgPSB1dGlscy5sb2c7XG5cbi8vIEV4cG9zZSBwdWJsaWMgbWV0aG9kcy5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24od2luZG93KSB7XG4gIHZhciBicm93c2VyRGV0YWlscyA9IHV0aWxzLmRldGVjdEJyb3dzZXIod2luZG93KTtcbiAgdmFyIG5hdmlnYXRvciA9IHdpbmRvdyAmJiB3aW5kb3cubmF2aWdhdG9yO1xuXG4gIHZhciBjb25zdHJhaW50c1RvQ2hyb21lXyA9IGZ1bmN0aW9uKGMpIHtcbiAgICBpZiAodHlwZW9mIGMgIT09ICdvYmplY3QnIHx8IGMubWFuZGF0b3J5IHx8IGMub3B0aW9uYWwpIHtcbiAgICAgIHJldHVybiBjO1xuICAgIH1cbiAgICB2YXIgY2MgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhjKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgaWYgKGtleSA9PT0gJ3JlcXVpcmUnIHx8IGtleSA9PT0gJ2FkdmFuY2VkJyB8fCBrZXkgPT09ICdtZWRpYVNvdXJjZScpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIHIgPSAodHlwZW9mIGNba2V5XSA9PT0gJ29iamVjdCcpID8gY1trZXldIDoge2lkZWFsOiBjW2tleV19O1xuICAgICAgaWYgKHIuZXhhY3QgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygci5leGFjdCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgci5taW4gPSByLm1heCA9IHIuZXhhY3Q7XG4gICAgICB9XG4gICAgICB2YXIgb2xkbmFtZV8gPSBmdW5jdGlvbihwcmVmaXgsIG5hbWUpIHtcbiAgICAgICAgaWYgKHByZWZpeCkge1xuICAgICAgICAgIHJldHVybiBwcmVmaXggKyBuYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbmFtZS5zbGljZSgxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKG5hbWUgPT09ICdkZXZpY2VJZCcpID8gJ3NvdXJjZUlkJyA6IG5hbWU7XG4gICAgICB9O1xuICAgICAgaWYgKHIuaWRlYWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjYy5vcHRpb25hbCA9IGNjLm9wdGlvbmFsIHx8IFtdO1xuICAgICAgICB2YXIgb2MgPSB7fTtcbiAgICAgICAgaWYgKHR5cGVvZiByLmlkZWFsID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIG9jW29sZG5hbWVfKCdtaW4nLCBrZXkpXSA9IHIuaWRlYWw7XG4gICAgICAgICAgY2Mub3B0aW9uYWwucHVzaChvYyk7XG4gICAgICAgICAgb2MgPSB7fTtcbiAgICAgICAgICBvY1tvbGRuYW1lXygnbWF4Jywga2V5KV0gPSByLmlkZWFsO1xuICAgICAgICAgIGNjLm9wdGlvbmFsLnB1c2gob2MpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9jW29sZG5hbWVfKCcnLCBrZXkpXSA9IHIuaWRlYWw7XG4gICAgICAgICAgY2Mub3B0aW9uYWwucHVzaChvYyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChyLmV4YWN0ICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIHIuZXhhY3QgIT09ICdudW1iZXInKSB7XG4gICAgICAgIGNjLm1hbmRhdG9yeSA9IGNjLm1hbmRhdG9yeSB8fCB7fTtcbiAgICAgICAgY2MubWFuZGF0b3J5W29sZG5hbWVfKCcnLCBrZXkpXSA9IHIuZXhhY3Q7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBbJ21pbicsICdtYXgnXS5mb3JFYWNoKGZ1bmN0aW9uKG1peCkge1xuICAgICAgICAgIGlmIChyW21peF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY2MubWFuZGF0b3J5ID0gY2MubWFuZGF0b3J5IHx8IHt9O1xuICAgICAgICAgICAgY2MubWFuZGF0b3J5W29sZG5hbWVfKG1peCwga2V5KV0gPSByW21peF07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoYy5hZHZhbmNlZCkge1xuICAgICAgY2Mub3B0aW9uYWwgPSAoY2Mub3B0aW9uYWwgfHwgW10pLmNvbmNhdChjLmFkdmFuY2VkKTtcbiAgICB9XG4gICAgcmV0dXJuIGNjO1xuICB9O1xuXG4gIHZhciBzaGltQ29uc3RyYWludHNfID0gZnVuY3Rpb24oY29uc3RyYWludHMsIGZ1bmMpIHtcbiAgICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA+PSA2MSkge1xuICAgICAgcmV0dXJuIGZ1bmMoY29uc3RyYWludHMpO1xuICAgIH1cbiAgICBjb25zdHJhaW50cyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoY29uc3RyYWludHMpKTtcbiAgICBpZiAoY29uc3RyYWludHMgJiYgdHlwZW9mIGNvbnN0cmFpbnRzLmF1ZGlvID09PSAnb2JqZWN0Jykge1xuICAgICAgdmFyIHJlbWFwID0gZnVuY3Rpb24ob2JqLCBhLCBiKSB7XG4gICAgICAgIGlmIChhIGluIG9iaiAmJiAhKGIgaW4gb2JqKSkge1xuICAgICAgICAgIG9ialtiXSA9IG9ialthXTtcbiAgICAgICAgICBkZWxldGUgb2JqW2FdO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY29uc3RyYWludHMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGNvbnN0cmFpbnRzKSk7XG4gICAgICByZW1hcChjb25zdHJhaW50cy5hdWRpbywgJ2F1dG9HYWluQ29udHJvbCcsICdnb29nQXV0b0dhaW5Db250cm9sJyk7XG4gICAgICByZW1hcChjb25zdHJhaW50cy5hdWRpbywgJ25vaXNlU3VwcHJlc3Npb24nLCAnZ29vZ05vaXNlU3VwcHJlc3Npb24nKTtcbiAgICAgIGNvbnN0cmFpbnRzLmF1ZGlvID0gY29uc3RyYWludHNUb0Nocm9tZV8oY29uc3RyYWludHMuYXVkaW8pO1xuICAgIH1cbiAgICBpZiAoY29uc3RyYWludHMgJiYgdHlwZW9mIGNvbnN0cmFpbnRzLnZpZGVvID09PSAnb2JqZWN0Jykge1xuICAgICAgLy8gU2hpbSBmYWNpbmdNb2RlIGZvciBtb2JpbGUgJiBzdXJmYWNlIHByby5cbiAgICAgIHZhciBmYWNlID0gY29uc3RyYWludHMudmlkZW8uZmFjaW5nTW9kZTtcbiAgICAgIGZhY2UgPSBmYWNlICYmICgodHlwZW9mIGZhY2UgPT09ICdvYmplY3QnKSA/IGZhY2UgOiB7aWRlYWw6IGZhY2V9KTtcbiAgICAgIHZhciBnZXRTdXBwb3J0ZWRGYWNpbmdNb2RlTGllcyA9IGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCA2NjtcblxuICAgICAgaWYgKChmYWNlICYmIChmYWNlLmV4YWN0ID09PSAndXNlcicgfHwgZmFjZS5leGFjdCA9PT0gJ2Vudmlyb25tZW50JyB8fFxuICAgICAgICAgICAgICAgICAgICBmYWNlLmlkZWFsID09PSAndXNlcicgfHwgZmFjZS5pZGVhbCA9PT0gJ2Vudmlyb25tZW50JykpICYmXG4gICAgICAgICAgIShuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFN1cHBvcnRlZENvbnN0cmFpbnRzICYmXG4gICAgICAgICAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFN1cHBvcnRlZENvbnN0cmFpbnRzKCkuZmFjaW5nTW9kZSAmJlxuICAgICAgICAgICAgIWdldFN1cHBvcnRlZEZhY2luZ01vZGVMaWVzKSkge1xuICAgICAgICBkZWxldGUgY29uc3RyYWludHMudmlkZW8uZmFjaW5nTW9kZTtcbiAgICAgICAgdmFyIG1hdGNoZXM7XG4gICAgICAgIGlmIChmYWNlLmV4YWN0ID09PSAnZW52aXJvbm1lbnQnIHx8IGZhY2UuaWRlYWwgPT09ICdlbnZpcm9ubWVudCcpIHtcbiAgICAgICAgICBtYXRjaGVzID0gWydiYWNrJywgJ3JlYXInXTtcbiAgICAgICAgfSBlbHNlIGlmIChmYWNlLmV4YWN0ID09PSAndXNlcicgfHwgZmFjZS5pZGVhbCA9PT0gJ3VzZXInKSB7XG4gICAgICAgICAgbWF0Y2hlcyA9IFsnZnJvbnQnXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWF0Y2hlcykge1xuICAgICAgICAgIC8vIExvb2sgZm9yIG1hdGNoZXMgaW4gbGFiZWwsIG9yIHVzZSBsYXN0IGNhbSBmb3IgYmFjayAodHlwaWNhbCkuXG4gICAgICAgICAgcmV0dXJuIG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlcygpXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24oZGV2aWNlcykge1xuICAgICAgICAgICAgZGV2aWNlcyA9IGRldmljZXMuZmlsdGVyKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGQua2luZCA9PT0gJ3ZpZGVvaW5wdXQnO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgZGV2ID0gZGV2aWNlcy5maW5kKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXMuc29tZShmdW5jdGlvbihtYXRjaCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmxhYmVsLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihtYXRjaCkgIT09IC0xO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFkZXYgJiYgZGV2aWNlcy5sZW5ndGggJiYgbWF0Y2hlcy5pbmRleE9mKCdiYWNrJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgIGRldiA9IGRldmljZXNbZGV2aWNlcy5sZW5ndGggLSAxXTsgLy8gbW9yZSBsaWtlbHkgdGhlIGJhY2sgY2FtXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGV2KSB7XG4gICAgICAgICAgICAgIGNvbnN0cmFpbnRzLnZpZGVvLmRldmljZUlkID0gZmFjZS5leGFjdCA/IHtleGFjdDogZGV2LmRldmljZUlkfSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpZGVhbDogZGV2LmRldmljZUlkfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0cmFpbnRzLnZpZGVvID0gY29uc3RyYWludHNUb0Nocm9tZV8oY29uc3RyYWludHMudmlkZW8pO1xuICAgICAgICAgICAgbG9nZ2luZygnY2hyb21lOiAnICsgSlNPTi5zdHJpbmdpZnkoY29uc3RyYWludHMpKTtcbiAgICAgICAgICAgIHJldHVybiBmdW5jKGNvbnN0cmFpbnRzKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3RyYWludHMudmlkZW8gPSBjb25zdHJhaW50c1RvQ2hyb21lXyhjb25zdHJhaW50cy52aWRlbyk7XG4gICAgfVxuICAgIGxvZ2dpbmcoJ2Nocm9tZTogJyArIEpTT04uc3RyaW5naWZ5KGNvbnN0cmFpbnRzKSk7XG4gICAgcmV0dXJuIGZ1bmMoY29uc3RyYWludHMpO1xuICB9O1xuXG4gIHZhciBzaGltRXJyb3JfID0gZnVuY3Rpb24oZSkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiB7XG4gICAgICAgIFBlcm1pc3Npb25EZW5pZWRFcnJvcjogJ05vdEFsbG93ZWRFcnJvcicsXG4gICAgICAgIFBlcm1pc3Npb25EaXNtaXNzZWRFcnJvcjogJ05vdEFsbG93ZWRFcnJvcicsXG4gICAgICAgIEludmFsaWRTdGF0ZUVycm9yOiAnTm90QWxsb3dlZEVycm9yJyxcbiAgICAgICAgRGV2aWNlc05vdEZvdW5kRXJyb3I6ICdOb3RGb3VuZEVycm9yJyxcbiAgICAgICAgQ29uc3RyYWludE5vdFNhdGlzZmllZEVycm9yOiAnT3ZlcmNvbnN0cmFpbmVkRXJyb3InLFxuICAgICAgICBUcmFja1N0YXJ0RXJyb3I6ICdOb3RSZWFkYWJsZUVycm9yJyxcbiAgICAgICAgTWVkaWFEZXZpY2VGYWlsZWREdWVUb1NodXRkb3duOiAnTm90QWxsb3dlZEVycm9yJyxcbiAgICAgICAgTWVkaWFEZXZpY2VLaWxsU3dpdGNoT246ICdOb3RBbGxvd2VkRXJyb3InLFxuICAgICAgICBUYWJDYXB0dXJlRXJyb3I6ICdBYm9ydEVycm9yJyxcbiAgICAgICAgU2NyZWVuQ2FwdHVyZUVycm9yOiAnQWJvcnRFcnJvcicsXG4gICAgICAgIERldmljZUNhcHR1cmVFcnJvcjogJ0Fib3J0RXJyb3InXG4gICAgICB9W2UubmFtZV0gfHwgZS5uYW1lLFxuICAgICAgbWVzc2FnZTogZS5tZXNzYWdlLFxuICAgICAgY29uc3RyYWludDogZS5jb25zdHJhaW50TmFtZSxcbiAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZSArICh0aGlzLm1lc3NhZ2UgJiYgJzogJykgKyB0aGlzLm1lc3NhZ2U7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICB2YXIgZ2V0VXNlck1lZGlhXyA9IGZ1bmN0aW9uKGNvbnN0cmFpbnRzLCBvblN1Y2Nlc3MsIG9uRXJyb3IpIHtcbiAgICBzaGltQ29uc3RyYWludHNfKGNvbnN0cmFpbnRzLCBmdW5jdGlvbihjKSB7XG4gICAgICBuYXZpZ2F0b3Iud2Via2l0R2V0VXNlck1lZGlhKGMsIG9uU3VjY2VzcywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAob25FcnJvcikge1xuICAgICAgICAgIG9uRXJyb3Ioc2hpbUVycm9yXyhlKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIG5hdmlnYXRvci5nZXRVc2VyTWVkaWEgPSBnZXRVc2VyTWVkaWFfO1xuXG4gIC8vIFJldHVybnMgdGhlIHJlc3VsdCBvZiBnZXRVc2VyTWVkaWEgYXMgYSBQcm9taXNlLlxuICB2YXIgZ2V0VXNlck1lZGlhUHJvbWlzZV8gPSBmdW5jdGlvbihjb25zdHJhaW50cykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIG5hdmlnYXRvci5nZXRVc2VyTWVkaWEoY29uc3RyYWludHMsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgfSk7XG4gIH07XG5cbiAgaWYgKCFuYXZpZ2F0b3IubWVkaWFEZXZpY2VzKSB7XG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcyA9IHtcbiAgICAgIGdldFVzZXJNZWRpYTogZ2V0VXNlck1lZGlhUHJvbWlzZV8sXG4gICAgICBlbnVtZXJhdGVEZXZpY2VzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiAgICAgICAgICB2YXIga2luZHMgPSB7YXVkaW86ICdhdWRpb2lucHV0JywgdmlkZW86ICd2aWRlb2lucHV0J307XG4gICAgICAgICAgcmV0dXJuIHdpbmRvdy5NZWRpYVN0cmVhbVRyYWNrLmdldFNvdXJjZXMoZnVuY3Rpb24oZGV2aWNlcykge1xuICAgICAgICAgICAgcmVzb2x2ZShkZXZpY2VzLm1hcChmdW5jdGlvbihkZXZpY2UpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtsYWJlbDogZGV2aWNlLmxhYmVsLFxuICAgICAgICAgICAgICAgIGtpbmQ6IGtpbmRzW2RldmljZS5raW5kXSxcbiAgICAgICAgICAgICAgICBkZXZpY2VJZDogZGV2aWNlLmlkLFxuICAgICAgICAgICAgICAgIGdyb3VwSWQ6ICcnfTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgZ2V0U3VwcG9ydGVkQ29uc3RyYWludHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGRldmljZUlkOiB0cnVlLCBlY2hvQ2FuY2VsbGF0aW9uOiB0cnVlLCBmYWNpbmdNb2RlOiB0cnVlLFxuICAgICAgICAgIGZyYW1lUmF0ZTogdHJ1ZSwgaGVpZ2h0OiB0cnVlLCB3aWR0aDogdHJ1ZVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBBIHNoaW0gZm9yIGdldFVzZXJNZWRpYSBtZXRob2Qgb24gdGhlIG1lZGlhRGV2aWNlcyBvYmplY3QuXG4gIC8vIFRPRE8oS2FwdGVuSmFuc3NvbikgcmVtb3ZlIG9uY2UgaW1wbGVtZW50ZWQgaW4gQ2hyb21lIHN0YWJsZS5cbiAgaWYgKCFuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSkge1xuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhID0gZnVuY3Rpb24oY29uc3RyYWludHMpIHtcbiAgICAgIHJldHVybiBnZXRVc2VyTWVkaWFQcm9taXNlXyhjb25zdHJhaW50cyk7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICAvLyBFdmVuIHRob3VnaCBDaHJvbWUgNDUgaGFzIG5hdmlnYXRvci5tZWRpYURldmljZXMgYW5kIGEgZ2V0VXNlck1lZGlhXG4gICAgLy8gZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhIFByb21pc2UsIGl0IGRvZXMgbm90IGFjY2VwdCBzcGVjLXN0eWxlXG4gICAgLy8gY29uc3RyYWludHMuXG4gICAgdmFyIG9yaWdHZXRVc2VyTWVkaWEgPSBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYS5cbiAgICAgICAgYmluZChuYXZpZ2F0b3IubWVkaWFEZXZpY2VzKTtcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSA9IGZ1bmN0aW9uKGNzKSB7XG4gICAgICByZXR1cm4gc2hpbUNvbnN0cmFpbnRzXyhjcywgZnVuY3Rpb24oYykge1xuICAgICAgICByZXR1cm4gb3JpZ0dldFVzZXJNZWRpYShjKS50aGVuKGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgICAgIGlmIChjLmF1ZGlvICYmICFzdHJlYW0uZ2V0QXVkaW9UcmFja3MoKS5sZW5ndGggfHxcbiAgICAgICAgICAgICAgYy52aWRlbyAmJiAhc3RyZWFtLmdldFZpZGVvVHJhY2tzKCkubGVuZ3RoKSB7XG4gICAgICAgICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xuICAgICAgICAgICAgICB0cmFjay5zdG9wKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oJycsICdOb3RGb3VuZEVycm9yJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBzdHJlYW07XG4gICAgICAgIH0sIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3Qoc2hpbUVycm9yXyhlKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfVxuXG4gIC8vIER1bW15IGRldmljZWNoYW5nZSBldmVudCBtZXRob2RzLlxuICAvLyBUT0RPKEthcHRlbkphbnNzb24pIHJlbW92ZSBvbmNlIGltcGxlbWVudGVkIGluIENocm9tZSBzdGFibGUuXG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5hZGRFdmVudExpc3RlbmVyID09PSAndW5kZWZpbmVkJykge1xuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xuICAgICAgbG9nZ2luZygnRHVtbXkgbWVkaWFEZXZpY2VzLmFkZEV2ZW50TGlzdGVuZXIgY2FsbGVkLicpO1xuICAgIH07XG4gIH1cbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLnJlbW92ZUV2ZW50TGlzdGVuZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICBsb2dnaW5nKCdEdW1teSBtZWRpYURldmljZXMucmVtb3ZlRXZlbnRMaXN0ZW5lciBjYWxsZWQuJyk7XG4gICAgfTtcbiAgfVxufTtcblxufSx7XCIuLi91dGlscy5qc1wiOjEzfV0sNzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vKlxuICogIENvcHlyaWdodCAoYykgMjAxNyBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxuICogIHRyZWUuXG4gKi9cbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIFNEUFV0aWxzID0gcmVxdWlyZSgnc2RwJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzaGltUlRDSWNlQ2FuZGlkYXRlOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICAvLyBmb3VuZGF0aW9uIGlzIGFyYml0cmFyaWx5IGNob3NlbiBhcyBhbiBpbmRpY2F0b3IgZm9yIGZ1bGwgc3VwcG9ydCBmb3JcbiAgICAvLyBodHRwczovL3czYy5naXRodWIuaW8vd2VicnRjLXBjLyNydGNpY2VjYW5kaWRhdGUtaW50ZXJmYWNlXG4gICAgaWYgKCF3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlIHx8ICh3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlICYmICdmb3VuZGF0aW9uJyBpblxuICAgICAgICB3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlLnByb3RvdHlwZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgTmF0aXZlUlRDSWNlQ2FuZGlkYXRlID0gd2luZG93LlJUQ0ljZUNhbmRpZGF0ZTtcbiAgICB3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlID0gZnVuY3Rpb24oYXJncykge1xuICAgICAgLy8gUmVtb3ZlIHRoZSBhPSB3aGljaCBzaG91bGRuJ3QgYmUgcGFydCBvZiB0aGUgY2FuZGlkYXRlIHN0cmluZy5cbiAgICAgIGlmICh0eXBlb2YgYXJncyA9PT0gJ29iamVjdCcgJiYgYXJncy5jYW5kaWRhdGUgJiZcbiAgICAgICAgICBhcmdzLmNhbmRpZGF0ZS5pbmRleE9mKCdhPScpID09PSAwKSB7XG4gICAgICAgIGFyZ3MgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGFyZ3MpKTtcbiAgICAgICAgYXJncy5jYW5kaWRhdGUgPSBhcmdzLmNhbmRpZGF0ZS5zdWJzdHIoMik7XG4gICAgICB9XG5cbiAgICAgIGlmIChhcmdzLmNhbmRpZGF0ZSAmJiBhcmdzLmNhbmRpZGF0ZS5sZW5ndGgpIHtcbiAgICAgICAgLy8gQXVnbWVudCB0aGUgbmF0aXZlIGNhbmRpZGF0ZSB3aXRoIHRoZSBwYXJzZWQgZmllbGRzLlxuICAgICAgICB2YXIgbmF0aXZlQ2FuZGlkYXRlID0gbmV3IE5hdGl2ZVJUQ0ljZUNhbmRpZGF0ZShhcmdzKTtcbiAgICAgICAgdmFyIHBhcnNlZENhbmRpZGF0ZSA9IFNEUFV0aWxzLnBhcnNlQ2FuZGlkYXRlKGFyZ3MuY2FuZGlkYXRlKTtcbiAgICAgICAgdmFyIGF1Z21lbnRlZENhbmRpZGF0ZSA9IE9iamVjdC5hc3NpZ24obmF0aXZlQ2FuZGlkYXRlLFxuICAgICAgICAgICAgcGFyc2VkQ2FuZGlkYXRlKTtcblxuICAgICAgICAvLyBBZGQgYSBzZXJpYWxpemVyIHRoYXQgZG9lcyBub3Qgc2VyaWFsaXplIHRoZSBleHRyYSBhdHRyaWJ1dGVzLlxuICAgICAgICBhdWdtZW50ZWRDYW5kaWRhdGUudG9KU09OID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNhbmRpZGF0ZTogYXVnbWVudGVkQ2FuZGlkYXRlLmNhbmRpZGF0ZSxcbiAgICAgICAgICAgIHNkcE1pZDogYXVnbWVudGVkQ2FuZGlkYXRlLnNkcE1pZCxcbiAgICAgICAgICAgIHNkcE1MaW5lSW5kZXg6IGF1Z21lbnRlZENhbmRpZGF0ZS5zZHBNTGluZUluZGV4LFxuICAgICAgICAgICAgdXNlcm5hbWVGcmFnbWVudDogYXVnbWVudGVkQ2FuZGlkYXRlLnVzZXJuYW1lRnJhZ21lbnQsXG4gICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGF1Z21lbnRlZENhbmRpZGF0ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgTmF0aXZlUlRDSWNlQ2FuZGlkYXRlKGFyZ3MpO1xuICAgIH07XG4gICAgd2luZG93LlJUQ0ljZUNhbmRpZGF0ZS5wcm90b3R5cGUgPSBOYXRpdmVSVENJY2VDYW5kaWRhdGUucHJvdG90eXBlO1xuXG4gICAgLy8gSG9vayB1cCB0aGUgYXVnbWVudGVkIGNhbmRpZGF0ZSBpbiBvbmljZWNhbmRpZGF0ZSBhbmRcbiAgICAvLyBhZGRFdmVudExpc3RlbmVyKCdpY2VjYW5kaWRhdGUnLCAuLi4pXG4gICAgdXRpbHMud3JhcFBlZXJDb25uZWN0aW9uRXZlbnQod2luZG93LCAnaWNlY2FuZGlkYXRlJywgZnVuY3Rpb24oZSkge1xuICAgICAgaWYgKGUuY2FuZGlkYXRlKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCAnY2FuZGlkYXRlJywge1xuICAgICAgICAgIHZhbHVlOiBuZXcgd2luZG93LlJUQ0ljZUNhbmRpZGF0ZShlLmNhbmRpZGF0ZSksXG4gICAgICAgICAgd3JpdGFibGU6ICdmYWxzZSdcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZTtcbiAgICB9KTtcbiAgfSxcblxuICAvLyBzaGltQ3JlYXRlT2JqZWN0VVJMIG11c3QgYmUgY2FsbGVkIGJlZm9yZSBzaGltU291cmNlT2JqZWN0IHRvIGF2b2lkIGxvb3AuXG5cbiAgc2hpbUNyZWF0ZU9iamVjdFVSTDogZnVuY3Rpb24od2luZG93KSB7XG4gICAgdmFyIFVSTCA9IHdpbmRvdyAmJiB3aW5kb3cuVVJMO1xuXG4gICAgaWYgKCEodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgd2luZG93LkhUTUxNZWRpYUVsZW1lbnQgJiZcbiAgICAgICAgICAnc3JjT2JqZWN0JyBpbiB3aW5kb3cuSFRNTE1lZGlhRWxlbWVudC5wcm90b3R5cGUgJiZcbiAgICAgICAgVVJMLmNyZWF0ZU9iamVjdFVSTCAmJiBVUkwucmV2b2tlT2JqZWN0VVJMKSkge1xuICAgICAgLy8gT25seSBzaGltIENyZWF0ZU9iamVjdFVSTCB1c2luZyBzcmNPYmplY3QgaWYgc3JjT2JqZWN0IGV4aXN0cy5cbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgdmFyIG5hdGl2ZUNyZWF0ZU9iamVjdFVSTCA9IFVSTC5jcmVhdGVPYmplY3RVUkwuYmluZChVUkwpO1xuICAgIHZhciBuYXRpdmVSZXZva2VPYmplY3RVUkwgPSBVUkwucmV2b2tlT2JqZWN0VVJMLmJpbmQoVVJMKTtcbiAgICB2YXIgc3RyZWFtcyA9IG5ldyBNYXAoKSwgbmV3SWQgPSAwO1xuXG4gICAgVVJMLmNyZWF0ZU9iamVjdFVSTCA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgaWYgKCdnZXRUcmFja3MnIGluIHN0cmVhbSkge1xuICAgICAgICB2YXIgdXJsID0gJ3BvbHlibG9iOicgKyAoKytuZXdJZCk7XG4gICAgICAgIHN0cmVhbXMuc2V0KHVybCwgc3RyZWFtKTtcbiAgICAgICAgdXRpbHMuZGVwcmVjYXRlZCgnVVJMLmNyZWF0ZU9iamVjdFVSTChzdHJlYW0pJyxcbiAgICAgICAgICAgICdlbGVtLnNyY09iamVjdCA9IHN0cmVhbScpO1xuICAgICAgICByZXR1cm4gdXJsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5hdGl2ZUNyZWF0ZU9iamVjdFVSTChzdHJlYW0pO1xuICAgIH07XG4gICAgVVJMLnJldm9rZU9iamVjdFVSTCA9IGZ1bmN0aW9uKHVybCkge1xuICAgICAgbmF0aXZlUmV2b2tlT2JqZWN0VVJMKHVybCk7XG4gICAgICBzdHJlYW1zLmRlbGV0ZSh1cmwpO1xuICAgIH07XG5cbiAgICB2YXIgZHNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih3aW5kb3cuSFRNTE1lZGlhRWxlbWVudC5wcm90b3R5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3NyYycpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuSFRNTE1lZGlhRWxlbWVudC5wcm90b3R5cGUsICdzcmMnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZHNjLmdldC5hcHBseSh0aGlzKTtcbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uKHVybCkge1xuICAgICAgICB0aGlzLnNyY09iamVjdCA9IHN0cmVhbXMuZ2V0KHVybCkgfHwgbnVsbDtcbiAgICAgICAgcmV0dXJuIGRzYy5zZXQuYXBwbHkodGhpcywgW3VybF0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIG5hdGl2ZVNldEF0dHJpYnV0ZSA9IHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50LnByb3RvdHlwZS5zZXRBdHRyaWJ1dGU7XG4gICAgd2luZG93LkhUTUxNZWRpYUVsZW1lbnQucHJvdG90eXBlLnNldEF0dHJpYnV0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIgJiZcbiAgICAgICAgICAoJycgKyBhcmd1bWVudHNbMF0pLnRvTG93ZXJDYXNlKCkgPT09ICdzcmMnKSB7XG4gICAgICAgIHRoaXMuc3JjT2JqZWN0ID0gc3RyZWFtcy5nZXQoYXJndW1lbnRzWzFdKSB8fCBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5hdGl2ZVNldEF0dHJpYnV0ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH0sXG5cbiAgc2hpbU1heE1lc3NhZ2VTaXplOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICBpZiAod2luZG93LlJUQ1NjdHBUcmFuc3BvcnQgfHwgIXdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgYnJvd3NlckRldGFpbHMgPSB1dGlscy5kZXRlY3RCcm93c2VyKHdpbmRvdyk7XG5cbiAgICBpZiAoISgnc2N0cCcgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLCAnc2N0cCcsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdHlwZW9mIHRoaXMuX3NjdHAgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IHRoaXMuX3NjdHA7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhciBzY3RwSW5EZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKGRlc2NyaXB0aW9uKSB7XG4gICAgICB2YXIgc2VjdGlvbnMgPSBTRFBVdGlscy5zcGxpdFNlY3Rpb25zKGRlc2NyaXB0aW9uLnNkcCk7XG4gICAgICBzZWN0aW9ucy5zaGlmdCgpO1xuICAgICAgcmV0dXJuIHNlY3Rpb25zLnNvbWUoZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XG4gICAgICAgIHZhciBtTGluZSA9IFNEUFV0aWxzLnBhcnNlTUxpbmUobWVkaWFTZWN0aW9uKTtcbiAgICAgICAgcmV0dXJuIG1MaW5lICYmIG1MaW5lLmtpbmQgPT09ICdhcHBsaWNhdGlvbidcbiAgICAgICAgICAgICYmIG1MaW5lLnByb3RvY29sLmluZGV4T2YoJ1NDVFAnKSAhPT0gLTE7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIGdldFJlbW90ZUZpcmVmb3hWZXJzaW9uID0gZnVuY3Rpb24oZGVzY3JpcHRpb24pIHtcbiAgICAgIC8vIFRPRE86IElzIHRoZXJlIGEgYmV0dGVyIHNvbHV0aW9uIGZvciBkZXRlY3RpbmcgRmlyZWZveD9cbiAgICAgIHZhciBtYXRjaCA9IGRlc2NyaXB0aW9uLnNkcC5tYXRjaCgvbW96aWxsYS4uLlRISVNfSVNfU0RQQVJUQS0oXFxkKykvKTtcbiAgICAgIGlmIChtYXRjaCA9PT0gbnVsbCB8fCBtYXRjaC5sZW5ndGggPCAyKSB7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICAgIH1cbiAgICAgIHZhciB2ZXJzaW9uID0gcGFyc2VJbnQobWF0Y2hbMV0sIDEwKTtcbiAgICAgIC8vIFRlc3QgZm9yIE5hTiAoeWVzLCB0aGlzIGlzIHVnbHkpXG4gICAgICByZXR1cm4gdmVyc2lvbiAhPT0gdmVyc2lvbiA/IC0xIDogdmVyc2lvbjtcbiAgICB9O1xuXG4gICAgdmFyIGdldENhblNlbmRNYXhNZXNzYWdlU2l6ZSA9IGZ1bmN0aW9uKHJlbW90ZUlzRmlyZWZveCkge1xuICAgICAgLy8gRXZlcnkgaW1wbGVtZW50YXRpb24gd2Uga25vdyBjYW4gc2VuZCBhdCBsZWFzdCA2NCBLaUIuXG4gICAgICAvLyBOb3RlOiBBbHRob3VnaCBDaHJvbWUgaXMgdGVjaG5pY2FsbHkgYWJsZSB0byBzZW5kIHVwIHRvIDI1NiBLaUIsIHRoZVxuICAgICAgLy8gICAgICAgZGF0YSBkb2VzIG5vdCByZWFjaCB0aGUgb3RoZXIgcGVlciByZWxpYWJseS5cbiAgICAgIC8vICAgICAgIFNlZTogaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3dlYnJ0Yy9pc3N1ZXMvZGV0YWlsP2lkPTg0MTlcbiAgICAgIHZhciBjYW5TZW5kTWF4TWVzc2FnZVNpemUgPSA2NTUzNjtcbiAgICAgIGlmIChicm93c2VyRGV0YWlscy5icm93c2VyID09PSAnZmlyZWZveCcpIHtcbiAgICAgICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCA1Nykge1xuICAgICAgICAgIGlmIChyZW1vdGVJc0ZpcmVmb3ggPT09IC0xKSB7XG4gICAgICAgICAgICAvLyBGRiA8IDU3IHdpbGwgc2VuZCBpbiAxNiBLaUIgY2h1bmtzIHVzaW5nIHRoZSBkZXByZWNhdGVkIFBQSURcbiAgICAgICAgICAgIC8vIGZyYWdtZW50YXRpb24uXG4gICAgICAgICAgICBjYW5TZW5kTWF4TWVzc2FnZVNpemUgPSAxNjM4NDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSG93ZXZlciwgb3RoZXIgRkYgKGFuZCBSQVdSVEMpIGNhbiByZWFzc2VtYmxlIFBQSUQtZnJhZ21lbnRlZFxuICAgICAgICAgICAgLy8gbWVzc2FnZXMuIFRodXMsIHN1cHBvcnRpbmcgfjIgR2lCIHdoZW4gc2VuZGluZy5cbiAgICAgICAgICAgIGNhblNlbmRNYXhNZXNzYWdlU2l6ZSA9IDIxNDc0ODM2Mzc7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIEN1cnJlbnRseSwgYWxsIEZGID49IDU3IHdpbGwgcmVzZXQgdGhlIHJlbW90ZSBtYXhpbXVtIG1lc3NhZ2Ugc2l6ZVxuICAgICAgICAgIC8vIHRvIHRoZSBkZWZhdWx0IHZhbHVlIHdoZW4gYSBkYXRhIGNoYW5uZWwgaXMgY3JlYXRlZCBhdCBhIGxhdGVyXG4gICAgICAgICAgLy8gc3RhZ2UuIDooXG4gICAgICAgICAgLy8gU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xNDI2ODMxXG4gICAgICAgICAgY2FuU2VuZE1heE1lc3NhZ2VTaXplID1cbiAgICAgICAgICAgIGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPT09IDU3ID8gNjU1MzUgOiA2NTUzNjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGNhblNlbmRNYXhNZXNzYWdlU2l6ZTtcbiAgICB9O1xuXG4gICAgdmFyIGdldE1heE1lc3NhZ2VTaXplID0gZnVuY3Rpb24oZGVzY3JpcHRpb24sIHJlbW90ZUlzRmlyZWZveCkge1xuICAgICAgLy8gTm90ZTogNjU1MzYgYnl0ZXMgaXMgdGhlIGRlZmF1bHQgdmFsdWUgZnJvbSB0aGUgU0RQIHNwZWMuIEFsc28sXG4gICAgICAvLyAgICAgICBldmVyeSBpbXBsZW1lbnRhdGlvbiB3ZSBrbm93IHN1cHBvcnRzIHJlY2VpdmluZyA2NTUzNiBieXRlcy5cbiAgICAgIHZhciBtYXhNZXNzYWdlU2l6ZSA9IDY1NTM2O1xuXG4gICAgICAvLyBGRiA1NyBoYXMgYSBzbGlnaHRseSBpbmNvcnJlY3QgZGVmYXVsdCByZW1vdGUgbWF4IG1lc3NhZ2Ugc2l6ZSwgc29cbiAgICAgIC8vIHdlIG5lZWQgdG8gYWRqdXN0IGl0IGhlcmUgdG8gYXZvaWQgYSBmYWlsdXJlIHdoZW4gc2VuZGluZy5cbiAgICAgIC8vIFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTQyNTY5N1xuICAgICAgaWYgKGJyb3dzZXJEZXRhaWxzLmJyb3dzZXIgPT09ICdmaXJlZm94J1xuICAgICAgICAgICAmJiBicm93c2VyRGV0YWlscy52ZXJzaW9uID09PSA1Nykge1xuICAgICAgICBtYXhNZXNzYWdlU2l6ZSA9IDY1NTM1O1xuICAgICAgfVxuXG4gICAgICB2YXIgbWF0Y2ggPSBTRFBVdGlscy5tYXRjaFByZWZpeChkZXNjcmlwdGlvbi5zZHAsICdhPW1heC1tZXNzYWdlLXNpemU6Jyk7XG4gICAgICBpZiAobWF0Y2gubGVuZ3RoID4gMCkge1xuICAgICAgICBtYXhNZXNzYWdlU2l6ZSA9IHBhcnNlSW50KG1hdGNoWzBdLnN1YnN0cigxOSksIDEwKTtcbiAgICAgIH0gZWxzZSBpZiAoYnJvd3NlckRldGFpbHMuYnJvd3NlciA9PT0gJ2ZpcmVmb3gnICYmXG4gICAgICAgICAgICAgICAgICByZW1vdGVJc0ZpcmVmb3ggIT09IC0xKSB7XG4gICAgICAgIC8vIElmIHRoZSBtYXhpbXVtIG1lc3NhZ2Ugc2l6ZSBpcyBub3QgcHJlc2VudCBpbiB0aGUgcmVtb3RlIFNEUCBhbmRcbiAgICAgICAgLy8gYm90aCBsb2NhbCBhbmQgcmVtb3RlIGFyZSBGaXJlZm94LCB0aGUgcmVtb3RlIHBlZXIgY2FuIHJlY2VpdmVcbiAgICAgICAgLy8gfjIgR2lCLlxuICAgICAgICBtYXhNZXNzYWdlU2l6ZSA9IDIxNDc0ODM2Mzc7XG4gICAgICB9XG4gICAgICByZXR1cm4gbWF4TWVzc2FnZVNpemU7XG4gICAgfTtcblxuICAgIHZhciBvcmlnU2V0UmVtb3RlRGVzY3JpcHRpb24gPVxuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnNldFJlbW90ZURlc2NyaXB0aW9uO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0UmVtb3RlRGVzY3JpcHRpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICBwYy5fc2N0cCA9IG51bGw7XG5cbiAgICAgIGlmIChzY3RwSW5EZXNjcmlwdGlvbihhcmd1bWVudHNbMF0pKSB7XG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSByZW1vdGUgaXMgRkYuXG4gICAgICAgIHZhciBpc0ZpcmVmb3ggPSBnZXRSZW1vdGVGaXJlZm94VmVyc2lvbihhcmd1bWVudHNbMF0pO1xuXG4gICAgICAgIC8vIEdldCB0aGUgbWF4aW11bSBtZXNzYWdlIHNpemUgdGhlIGxvY2FsIHBlZXIgaXMgY2FwYWJsZSBvZiBzZW5kaW5nXG4gICAgICAgIHZhciBjYW5TZW5kTU1TID0gZ2V0Q2FuU2VuZE1heE1lc3NhZ2VTaXplKGlzRmlyZWZveCk7XG5cbiAgICAgICAgLy8gR2V0IHRoZSBtYXhpbXVtIG1lc3NhZ2Ugc2l6ZSBvZiB0aGUgcmVtb3RlIHBlZXIuXG4gICAgICAgIHZhciByZW1vdGVNTVMgPSBnZXRNYXhNZXNzYWdlU2l6ZShhcmd1bWVudHNbMF0sIGlzRmlyZWZveCk7XG5cbiAgICAgICAgLy8gRGV0ZXJtaW5lIGZpbmFsIG1heGltdW0gbWVzc2FnZSBzaXplXG4gICAgICAgIHZhciBtYXhNZXNzYWdlU2l6ZTtcbiAgICAgICAgaWYgKGNhblNlbmRNTVMgPT09IDAgJiYgcmVtb3RlTU1TID09PSAwKSB7XG4gICAgICAgICAgbWF4TWVzc2FnZVNpemUgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG4gICAgICAgIH0gZWxzZSBpZiAoY2FuU2VuZE1NUyA9PT0gMCB8fCByZW1vdGVNTVMgPT09IDApIHtcbiAgICAgICAgICBtYXhNZXNzYWdlU2l6ZSA9IE1hdGgubWF4KGNhblNlbmRNTVMsIHJlbW90ZU1NUyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWF4TWVzc2FnZVNpemUgPSBNYXRoLm1pbihjYW5TZW5kTU1TLCByZW1vdGVNTVMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ3JlYXRlIGEgZHVtbXkgUlRDU2N0cFRyYW5zcG9ydCBvYmplY3QgYW5kIHRoZSAnbWF4TWVzc2FnZVNpemUnXG4gICAgICAgIC8vIGF0dHJpYnV0ZS5cbiAgICAgICAgdmFyIHNjdHAgPSB7fTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNjdHAsICdtYXhNZXNzYWdlU2l6ZScsIHtcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIG1heE1lc3NhZ2VTaXplO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHBjLl9zY3RwID0gc2N0cDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG9yaWdTZXRSZW1vdGVEZXNjcmlwdGlvbi5hcHBseShwYywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9LFxuXG4gIHNoaW1TZW5kVGhyb3dUeXBlRXJyb3I6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIGlmICghKHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiAmJlxuICAgICAgICAnY3JlYXRlRGF0YUNoYW5uZWwnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gTm90ZTogQWx0aG91Z2ggRmlyZWZveCA+PSA1NyBoYXMgYSBuYXRpdmUgaW1wbGVtZW50YXRpb24sIHRoZSBtYXhpbXVtXG4gICAgLy8gICAgICAgbWVzc2FnZSBzaXplIGNhbiBiZSByZXNldCBmb3IgYWxsIGRhdGEgY2hhbm5lbHMgYXQgYSBsYXRlciBzdGFnZS5cbiAgICAvLyAgICAgICBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTE0MjY4MzFcblxuICAgIHZhciBvcmlnQ3JlYXRlRGF0YUNoYW5uZWwgPVxuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5jcmVhdGVEYXRhQ2hhbm5lbDtcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmNyZWF0ZURhdGFDaGFubmVsID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgdmFyIGRhdGFDaGFubmVsID0gb3JpZ0NyZWF0ZURhdGFDaGFubmVsLmFwcGx5KHBjLCBhcmd1bWVudHMpO1xuICAgICAgdmFyIG9yaWdEYXRhQ2hhbm5lbFNlbmQgPSBkYXRhQ2hhbm5lbC5zZW5kO1xuXG4gICAgICAvLyBQYXRjaCAnc2VuZCcgbWV0aG9kXG4gICAgICBkYXRhQ2hhbm5lbC5zZW5kID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkYyA9IHRoaXM7XG4gICAgICAgIHZhciBkYXRhID0gYXJndW1lbnRzWzBdO1xuICAgICAgICB2YXIgbGVuZ3RoID0gZGF0YS5sZW5ndGggfHwgZGF0YS5zaXplIHx8IGRhdGEuYnl0ZUxlbmd0aDtcbiAgICAgICAgaWYgKGxlbmd0aCA+IHBjLnNjdHAubWF4TWVzc2FnZVNpemUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKCdNZXNzYWdlIHRvbyBsYXJnZSAoY2FuIHNlbmQgYSBtYXhpbXVtIG9mICcgK1xuICAgICAgICAgICAgcGMuc2N0cC5tYXhNZXNzYWdlU2l6ZSArICcgYnl0ZXMpJywgJ1R5cGVFcnJvcicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvcmlnRGF0YUNoYW5uZWxTZW5kLmFwcGx5KGRjLCBhcmd1bWVudHMpO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIGRhdGFDaGFubmVsO1xuICAgIH07XG4gIH1cbn07XG5cbn0se1wiLi91dGlsc1wiOjEzLFwic2RwXCI6Mn1dLDg6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLypcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcbiAqICB0cmVlLlxuICovXG4gLyogZXNsaW50LWVudiBub2RlICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG52YXIgc2hpbVJUQ1BlZXJDb25uZWN0aW9uID0gcmVxdWlyZSgncnRjcGVlcmNvbm5lY3Rpb24tc2hpbScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2hpbUdldFVzZXJNZWRpYTogcmVxdWlyZSgnLi9nZXR1c2VybWVkaWEnKSxcbiAgc2hpbVBlZXJDb25uZWN0aW9uOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICB2YXIgYnJvd3NlckRldGFpbHMgPSB1dGlscy5kZXRlY3RCcm93c2VyKHdpbmRvdyk7XG5cbiAgICBpZiAod2luZG93LlJUQ0ljZUdhdGhlcmVyKSB7XG4gICAgICBpZiAoIXdpbmRvdy5SVENJY2VDYW5kaWRhdGUpIHtcbiAgICAgICAgd2luZG93LlJUQ0ljZUNhbmRpZGF0ZSA9IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICAgICAgICByZXR1cm4gYXJncztcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGlmICghd2luZG93LlJUQ1Nlc3Npb25EZXNjcmlwdGlvbikge1xuICAgICAgICB3aW5kb3cuUlRDU2Vzc2lvbkRlc2NyaXB0aW9uID0gZnVuY3Rpb24oYXJncykge1xuICAgICAgICAgIHJldHVybiBhcmdzO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgLy8gdGhpcyBhZGRzIGFuIGFkZGl0aW9uYWwgZXZlbnQgbGlzdGVuZXIgdG8gTWVkaWFTdHJhY2tUcmFjayB0aGF0IHNpZ25hbHNcbiAgICAgIC8vIHdoZW4gYSB0cmFja3MgZW5hYmxlZCBwcm9wZXJ0eSB3YXMgY2hhbmdlZC4gV29ya2Fyb3VuZCBmb3IgYSBidWcgaW5cbiAgICAgIC8vIGFkZFN0cmVhbSwgc2VlIGJlbG93LiBObyBsb25nZXIgcmVxdWlyZWQgaW4gMTUwMjUrXG4gICAgICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDE1MDI1KSB7XG4gICAgICAgIHZhciBvcmlnTVNURW5hYmxlZCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoXG4gICAgICAgICAgICB3aW5kb3cuTWVkaWFTdHJlYW1UcmFjay5wcm90b3R5cGUsICdlbmFibGVkJyk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuTWVkaWFTdHJlYW1UcmFjay5wcm90b3R5cGUsICdlbmFibGVkJywge1xuICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIG9yaWdNU1RFbmFibGVkLnNldC5jYWxsKHRoaXMsIHZhbHVlKTtcbiAgICAgICAgICAgIHZhciBldiA9IG5ldyBFdmVudCgnZW5hYmxlZCcpO1xuICAgICAgICAgICAgZXYuZW5hYmxlZCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIE9SVEMgZGVmaW5lcyB0aGUgRFRNRiBzZW5kZXIgYSBiaXQgZGlmZmVyZW50LlxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS93M2Mvb3J0Yy9pc3N1ZXMvNzE0XG4gICAgaWYgKHdpbmRvdy5SVENSdHBTZW5kZXIgJiYgISgnZHRtZicgaW4gd2luZG93LlJUQ1J0cFNlbmRlci5wcm90b3R5cGUpKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1J0cFNlbmRlci5wcm90b3R5cGUsICdkdG1mJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICh0aGlzLl9kdG1mID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRyYWNrLmtpbmQgPT09ICdhdWRpbycpIHtcbiAgICAgICAgICAgICAgdGhpcy5fZHRtZiA9IG5ldyB3aW5kb3cuUlRDRHRtZlNlbmRlcih0aGlzKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy50cmFjay5raW5kID09PSAndmlkZW8nKSB7XG4gICAgICAgICAgICAgIHRoaXMuX2R0bWYgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhpcy5fZHRtZjtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIC8vIEVkZ2UgY3VycmVudGx5IG9ubHkgaW1wbGVtZW50cyB0aGUgUlRDRHRtZlNlbmRlciwgbm90IHRoZVxuICAgIC8vIFJUQ0RUTUZTZW5kZXIgYWxpYXMuIFNlZSBodHRwOi8vZHJhZnQub3J0Yy5vcmcvI3J0Y2R0bWZzZW5kZXIyKlxuICAgIGlmICh3aW5kb3cuUlRDRHRtZlNlbmRlciAmJiAhd2luZG93LlJUQ0RUTUZTZW5kZXIpIHtcbiAgICAgIHdpbmRvdy5SVENEVE1GU2VuZGVyID0gd2luZG93LlJUQ0R0bWZTZW5kZXI7XG4gICAgfVxuXG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uID1cbiAgICAgICAgc2hpbVJUQ1BlZXJDb25uZWN0aW9uKHdpbmRvdywgYnJvd3NlckRldGFpbHMudmVyc2lvbik7XG4gIH0sXG4gIHNoaW1SZXBsYWNlVHJhY2s6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIC8vIE9SVEMgaGFzIHJlcGxhY2VUcmFjayAtLSBodHRwczovL2dpdGh1Yi5jb20vdzNjL29ydGMvaXNzdWVzLzYxNFxuICAgIGlmICh3aW5kb3cuUlRDUnRwU2VuZGVyICYmXG4gICAgICAgICEoJ3JlcGxhY2VUcmFjaycgaW4gd2luZG93LlJUQ1J0cFNlbmRlci5wcm90b3R5cGUpKSB7XG4gICAgICB3aW5kb3cuUlRDUnRwU2VuZGVyLnByb3RvdHlwZS5yZXBsYWNlVHJhY2sgPVxuICAgICAgICAgIHdpbmRvdy5SVENSdHBTZW5kZXIucHJvdG90eXBlLnNldFRyYWNrO1xuICAgIH1cbiAgfVxufTtcblxufSx7XCIuLi91dGlsc1wiOjEzLFwiLi9nZXR1c2VybWVkaWFcIjo5LFwicnRjcGVlcmNvbm5lY3Rpb24tc2hpbVwiOjF9XSw5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8qXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXG4gKiAgdHJlZS5cbiAqL1xuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xuJ3VzZSBzdHJpY3QnO1xuXG4vLyBFeHBvc2UgcHVibGljIG1ldGhvZHMuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHdpbmRvdykge1xuICB2YXIgbmF2aWdhdG9yID0gd2luZG93ICYmIHdpbmRvdy5uYXZpZ2F0b3I7XG5cbiAgdmFyIHNoaW1FcnJvcl8gPSBmdW5jdGlvbihlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IHtQZXJtaXNzaW9uRGVuaWVkRXJyb3I6ICdOb3RBbGxvd2VkRXJyb3InfVtlLm5hbWVdIHx8IGUubmFtZSxcbiAgICAgIG1lc3NhZ2U6IGUubWVzc2FnZSxcbiAgICAgIGNvbnN0cmFpbnQ6IGUuY29uc3RyYWludCxcbiAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xuXG4gIC8vIGdldFVzZXJNZWRpYSBlcnJvciBzaGltLlxuICB2YXIgb3JpZ0dldFVzZXJNZWRpYSA9IG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhLlxuICAgICAgYmluZChuYXZpZ2F0b3IubWVkaWFEZXZpY2VzKTtcbiAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEgPSBmdW5jdGlvbihjKSB7XG4gICAgcmV0dXJuIG9yaWdHZXRVc2VyTWVkaWEoYykuY2F0Y2goZnVuY3Rpb24oZSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHNoaW1FcnJvcl8oZSkpO1xuICAgIH0pO1xuICB9O1xufTtcblxufSx7fV0sMTA6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLypcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcbiAqICB0cmVlLlxuICovXG4gLyogZXNsaW50LWVudiBub2RlICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzaGltR2V0VXNlck1lZGlhOiByZXF1aXJlKCcuL2dldHVzZXJtZWRpYScpLFxuICBzaGltT25UcmFjazogZnVuY3Rpb24od2luZG93KSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiAmJiAhKCdvbnRyYWNrJyBpblxuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUsICdvbnRyYWNrJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9vbnRyYWNrO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKGYpIHtcbiAgICAgICAgICBpZiAodGhpcy5fb250cmFjaykge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFjaycsIHRoaXMuX29udHJhY2spO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdhZGRzdHJlYW0nLCB0aGlzLl9vbnRyYWNrcG9seSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigndHJhY2snLCB0aGlzLl9vbnRyYWNrID0gZik7XG4gICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdhZGRzdHJlYW0nLCB0aGlzLl9vbnRyYWNrcG9seSA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUuc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcbiAgICAgICAgICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCd0cmFjaycpO1xuICAgICAgICAgICAgICBldmVudC50cmFjayA9IHRyYWNrO1xuICAgICAgICAgICAgICBldmVudC5yZWNlaXZlciA9IHt0cmFjazogdHJhY2t9O1xuICAgICAgICAgICAgICBldmVudC50cmFuc2NlaXZlciA9IHtyZWNlaXZlcjogZXZlbnQucmVjZWl2ZXJ9O1xuICAgICAgICAgICAgICBldmVudC5zdHJlYW1zID0gW2Uuc3RyZWFtXTtcbiAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiB3aW5kb3cuUlRDVHJhY2tFdmVudCAmJlxuICAgICAgICAoJ3JlY2VpdmVyJyBpbiB3aW5kb3cuUlRDVHJhY2tFdmVudC5wcm90b3R5cGUpICYmXG4gICAgICAgICEoJ3RyYW5zY2VpdmVyJyBpbiB3aW5kb3cuUlRDVHJhY2tFdmVudC5wcm90b3R5cGUpKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1RyYWNrRXZlbnQucHJvdG90eXBlLCAndHJhbnNjZWl2ZXInLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHtyZWNlaXZlcjogdGhpcy5yZWNlaXZlcn07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICBzaGltU291cmNlT2JqZWN0OiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICAvLyBGaXJlZm94IGhhcyBzdXBwb3J0ZWQgbW96U3JjT2JqZWN0IHNpbmNlIEZGMjIsIHVucHJlZml4ZWQgaW4gNDIuXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAod2luZG93LkhUTUxNZWRpYUVsZW1lbnQgJiZcbiAgICAgICAgISgnc3JjT2JqZWN0JyBpbiB3aW5kb3cuSFRNTE1lZGlhRWxlbWVudC5wcm90b3R5cGUpKSB7XG4gICAgICAgIC8vIFNoaW0gdGhlIHNyY09iamVjdCBwcm9wZXJ0eSwgb25jZSwgd2hlbiBIVE1MTWVkaWFFbGVtZW50IGlzIGZvdW5kLlxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LkhUTUxNZWRpYUVsZW1lbnQucHJvdG90eXBlLCAnc3JjT2JqZWN0Jywge1xuICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb3pTcmNPYmplY3Q7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgICAgICAgdGhpcy5tb3pTcmNPYmplY3QgPSBzdHJlYW07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgc2hpbVBlZXJDb25uZWN0aW9uOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICB2YXIgYnJvd3NlckRldGFpbHMgPSB1dGlscy5kZXRlY3RCcm93c2VyKHdpbmRvdyk7XG5cbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ29iamVjdCcgfHwgISh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gfHxcbiAgICAgICAgd2luZG93Lm1velJUQ1BlZXJDb25uZWN0aW9uKSkge1xuICAgICAgcmV0dXJuOyAvLyBwcm9iYWJseSBtZWRpYS5wZWVyY29ubmVjdGlvbi5lbmFibGVkPWZhbHNlIGluIGFib3V0OmNvbmZpZ1xuICAgIH1cbiAgICAvLyBUaGUgUlRDUGVlckNvbm5lY3Rpb24gb2JqZWN0LlxuICAgIGlmICghd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uKSB7XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gPSBmdW5jdGlvbihwY0NvbmZpZywgcGNDb25zdHJhaW50cykge1xuICAgICAgICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDM4KSB7XG4gICAgICAgICAgLy8gLnVybHMgaXMgbm90IHN1cHBvcnRlZCBpbiBGRiA8IDM4LlxuICAgICAgICAgIC8vIGNyZWF0ZSBSVENJY2VTZXJ2ZXJzIHdpdGggYSBzaW5nbGUgdXJsLlxuICAgICAgICAgIGlmIChwY0NvbmZpZyAmJiBwY0NvbmZpZy5pY2VTZXJ2ZXJzKSB7XG4gICAgICAgICAgICB2YXIgbmV3SWNlU2VydmVycyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwY0NvbmZpZy5pY2VTZXJ2ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHZhciBzZXJ2ZXIgPSBwY0NvbmZpZy5pY2VTZXJ2ZXJzW2ldO1xuICAgICAgICAgICAgICBpZiAoc2VydmVyLmhhc093blByb3BlcnR5KCd1cmxzJykpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNlcnZlci51cmxzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgbmV3U2VydmVyID0ge1xuICAgICAgICAgICAgICAgICAgICB1cmw6IHNlcnZlci51cmxzW2pdXG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgaWYgKHNlcnZlci51cmxzW2pdLmluZGV4T2YoJ3R1cm4nKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBuZXdTZXJ2ZXIudXNlcm5hbWUgPSBzZXJ2ZXIudXNlcm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIG5ld1NlcnZlci5jcmVkZW50aWFsID0gc2VydmVyLmNyZWRlbnRpYWw7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBuZXdJY2VTZXJ2ZXJzLnB1c2gobmV3U2VydmVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3SWNlU2VydmVycy5wdXNoKHBjQ29uZmlnLmljZVNlcnZlcnNbaV0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwY0NvbmZpZy5pY2VTZXJ2ZXJzID0gbmV3SWNlU2VydmVycztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyB3aW5kb3cubW96UlRDUGVlckNvbm5lY3Rpb24ocGNDb25maWcsIHBjQ29uc3RyYWludHMpO1xuICAgICAgfTtcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUgPVxuICAgICAgICAgIHdpbmRvdy5tb3pSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGU7XG5cbiAgICAgIC8vIHdyYXAgc3RhdGljIG1ldGhvZHMuIEN1cnJlbnRseSBqdXN0IGdlbmVyYXRlQ2VydGlmaWNhdGUuXG4gICAgICBpZiAod2luZG93Lm1velJUQ1BlZXJDb25uZWN0aW9uLmdlbmVyYXRlQ2VydGlmaWNhdGUpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiwgJ2dlbmVyYXRlQ2VydGlmaWNhdGUnLCB7XG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cubW96UlRDUGVlckNvbm5lY3Rpb24uZ2VuZXJhdGVDZXJ0aWZpY2F0ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB3aW5kb3cuUlRDU2Vzc2lvbkRlc2NyaXB0aW9uID0gd2luZG93Lm1velJUQ1Nlc3Npb25EZXNjcmlwdGlvbjtcbiAgICAgIHdpbmRvdy5SVENJY2VDYW5kaWRhdGUgPSB3aW5kb3cubW96UlRDSWNlQ2FuZGlkYXRlO1xuICAgIH1cblxuICAgIC8vIHNoaW0gYXdheSBuZWVkIGZvciBvYnNvbGV0ZSBSVENJY2VDYW5kaWRhdGUvUlRDU2Vzc2lvbkRlc2NyaXB0aW9uLlxuICAgIFsnc2V0TG9jYWxEZXNjcmlwdGlvbicsICdzZXRSZW1vdGVEZXNjcmlwdGlvbicsICdhZGRJY2VDYW5kaWRhdGUnXVxuICAgICAgICAuZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgICAgICB2YXIgbmF0aXZlTWV0aG9kID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdO1xuICAgICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYXJndW1lbnRzWzBdID0gbmV3ICgobWV0aG9kID09PSAnYWRkSWNlQ2FuZGlkYXRlJykgP1xuICAgICAgICAgICAgICAgIHdpbmRvdy5SVENJY2VDYW5kaWRhdGUgOlxuICAgICAgICAgICAgICAgIHdpbmRvdy5SVENTZXNzaW9uRGVzY3JpcHRpb24pKGFyZ3VtZW50c1swXSk7XG4gICAgICAgICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAvLyBzdXBwb3J0IGZvciBhZGRJY2VDYW5kaWRhdGUobnVsbCBvciB1bmRlZmluZWQpXG4gICAgdmFyIG5hdGl2ZUFkZEljZUNhbmRpZGF0ZSA9XG4gICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkSWNlQ2FuZGlkYXRlO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkSWNlQ2FuZGlkYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50c1swXSkge1xuICAgICAgICBpZiAoYXJndW1lbnRzWzFdKSB7XG4gICAgICAgICAgYXJndW1lbnRzWzFdLmFwcGx5KG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuYXRpdmVBZGRJY2VDYW5kaWRhdGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuXG4gICAgLy8gc2hpbSBnZXRTdGF0cyB3aXRoIG1hcGxpa2Ugc3VwcG9ydFxuICAgIHZhciBtYWtlTWFwU3RhdHMgPSBmdW5jdGlvbihzdGF0cykge1xuICAgICAgdmFyIG1hcCA9IG5ldyBNYXAoKTtcbiAgICAgIE9iamVjdC5rZXlzKHN0YXRzKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICBtYXAuc2V0KGtleSwgc3RhdHNba2V5XSk7XG4gICAgICAgIG1hcFtrZXldID0gc3RhdHNba2V5XTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG1hcDtcbiAgICB9O1xuXG4gICAgdmFyIG1vZGVyblN0YXRzVHlwZXMgPSB7XG4gICAgICBpbmJvdW5kcnRwOiAnaW5ib3VuZC1ydHAnLFxuICAgICAgb3V0Ym91bmRydHA6ICdvdXRib3VuZC1ydHAnLFxuICAgICAgY2FuZGlkYXRlcGFpcjogJ2NhbmRpZGF0ZS1wYWlyJyxcbiAgICAgIGxvY2FsY2FuZGlkYXRlOiAnbG9jYWwtY2FuZGlkYXRlJyxcbiAgICAgIHJlbW90ZWNhbmRpZGF0ZTogJ3JlbW90ZS1jYW5kaWRhdGUnXG4gICAgfTtcblxuICAgIHZhciBuYXRpdmVHZXRTdGF0cyA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U3RhdHM7XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTdGF0cyA9IGZ1bmN0aW9uKFxuICAgICAgc2VsZWN0b3IsXG4gICAgICBvblN1Y2MsXG4gICAgICBvbkVyclxuICAgICkge1xuICAgICAgcmV0dXJuIG5hdGl2ZUdldFN0YXRzLmFwcGx5KHRoaXMsIFtzZWxlY3RvciB8fCBudWxsXSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oc3RhdHMpIHtcbiAgICAgICAgICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDQ4KSB7XG4gICAgICAgICAgICBzdGF0cyA9IG1ha2VNYXBTdGF0cyhzdGF0cyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgNTMgJiYgIW9uU3VjYykge1xuICAgICAgICAgICAgLy8gU2hpbSBvbmx5IHByb21pc2UgZ2V0U3RhdHMgd2l0aCBzcGVjLWh5cGhlbnMgaW4gdHlwZSBuYW1lc1xuICAgICAgICAgICAgLy8gTGVhdmUgY2FsbGJhY2sgdmVyc2lvbiBhbG9uZTsgbWlzYyBvbGQgdXNlcyBvZiBmb3JFYWNoIGJlZm9yZSBNYXBcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIHN0YXRzLmZvckVhY2goZnVuY3Rpb24oc3RhdCkge1xuICAgICAgICAgICAgICAgIHN0YXQudHlwZSA9IG1vZGVyblN0YXRzVHlwZXNbc3RhdC50eXBlXSB8fCBzdGF0LnR5cGU7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICBpZiAoZS5uYW1lICE9PSAnVHlwZUVycm9yJykge1xuICAgICAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLy8gQXZvaWQgVHlwZUVycm9yOiBcInR5cGVcIiBpcyByZWFkLW9ubHksIGluIG9sZCB2ZXJzaW9ucy4gMzQtNDNpc2hcbiAgICAgICAgICAgICAgc3RhdHMuZm9yRWFjaChmdW5jdGlvbihzdGF0LCBpKSB7XG4gICAgICAgICAgICAgICAgc3RhdHMuc2V0KGksIE9iamVjdC5hc3NpZ24oe30sIHN0YXQsIHtcbiAgICAgICAgICAgICAgICAgIHR5cGU6IG1vZGVyblN0YXRzVHlwZXNbc3RhdC50eXBlXSB8fCBzdGF0LnR5cGVcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gc3RhdHM7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKG9uU3VjYywgb25FcnIpO1xuICAgIH07XG4gIH0sXG5cbiAgc2hpbVJlbW92ZVN0cmVhbTogZnVuY3Rpb24od2luZG93KSB7XG4gICAgaWYgKCF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gfHxcbiAgICAgICAgJ3JlbW92ZVN0cmVhbScgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgIHV0aWxzLmRlcHJlY2F0ZWQoJ3JlbW92ZVN0cmVhbScsICdyZW1vdmVUcmFjaycpO1xuICAgICAgdGhpcy5nZXRTZW5kZXJzKCkuZm9yRWFjaChmdW5jdGlvbihzZW5kZXIpIHtcbiAgICAgICAgaWYgKHNlbmRlci50cmFjayAmJiBzdHJlYW0uZ2V0VHJhY2tzKCkuaW5kZXhPZihzZW5kZXIudHJhY2spICE9PSAtMSkge1xuICAgICAgICAgIHBjLnJlbW92ZVRyYWNrKHNlbmRlcik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbn07XG5cbn0se1wiLi4vdXRpbHNcIjoxMyxcIi4vZ2V0dXNlcm1lZGlhXCI6MTF9XSwxMTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vKlxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxuICogIHRyZWUuXG4gKi9cbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcbnZhciBsb2dnaW5nID0gdXRpbHMubG9nO1xuXG4vLyBFeHBvc2UgcHVibGljIG1ldGhvZHMuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHdpbmRvdykge1xuICB2YXIgYnJvd3NlckRldGFpbHMgPSB1dGlscy5kZXRlY3RCcm93c2VyKHdpbmRvdyk7XG4gIHZhciBuYXZpZ2F0b3IgPSB3aW5kb3cgJiYgd2luZG93Lm5hdmlnYXRvcjtcbiAgdmFyIE1lZGlhU3RyZWFtVHJhY2sgPSB3aW5kb3cgJiYgd2luZG93Lk1lZGlhU3RyZWFtVHJhY2s7XG5cbiAgdmFyIHNoaW1FcnJvcl8gPSBmdW5jdGlvbihlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgSW50ZXJuYWxFcnJvcjogJ05vdFJlYWRhYmxlRXJyb3InLFxuICAgICAgICBOb3RTdXBwb3J0ZWRFcnJvcjogJ1R5cGVFcnJvcicsXG4gICAgICAgIFBlcm1pc3Npb25EZW5pZWRFcnJvcjogJ05vdEFsbG93ZWRFcnJvcicsXG4gICAgICAgIFNlY3VyaXR5RXJyb3I6ICdOb3RBbGxvd2VkRXJyb3InXG4gICAgICB9W2UubmFtZV0gfHwgZS5uYW1lLFxuICAgICAgbWVzc2FnZToge1xuICAgICAgICAnVGhlIG9wZXJhdGlvbiBpcyBpbnNlY3VyZS4nOiAnVGhlIHJlcXVlc3QgaXMgbm90IGFsbG93ZWQgYnkgdGhlICcgK1xuICAgICAgICAndXNlciBhZ2VudCBvciB0aGUgcGxhdGZvcm0gaW4gdGhlIGN1cnJlbnQgY29udGV4dC4nXG4gICAgICB9W2UubWVzc2FnZV0gfHwgZS5tZXNzYWdlLFxuICAgICAgY29uc3RyYWludDogZS5jb25zdHJhaW50LFxuICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lICsgKHRoaXMubWVzc2FnZSAmJiAnOiAnKSArIHRoaXMubWVzc2FnZTtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xuXG4gIC8vIGdldFVzZXJNZWRpYSBjb25zdHJhaW50cyBzaGltLlxuICB2YXIgZ2V0VXNlck1lZGlhXyA9IGZ1bmN0aW9uKGNvbnN0cmFpbnRzLCBvblN1Y2Nlc3MsIG9uRXJyb3IpIHtcbiAgICB2YXIgY29uc3RyYWludHNUb0ZGMzdfID0gZnVuY3Rpb24oYykge1xuICAgICAgaWYgKHR5cGVvZiBjICE9PSAnb2JqZWN0JyB8fCBjLnJlcXVpcmUpIHtcbiAgICAgICAgcmV0dXJuIGM7XG4gICAgICB9XG4gICAgICB2YXIgcmVxdWlyZSA9IFtdO1xuICAgICAgT2JqZWN0LmtleXMoYykuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gJ3JlcXVpcmUnIHx8IGtleSA9PT0gJ2FkdmFuY2VkJyB8fCBrZXkgPT09ICdtZWRpYVNvdXJjZScpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHIgPSBjW2tleV0gPSAodHlwZW9mIGNba2V5XSA9PT0gJ29iamVjdCcpID9cbiAgICAgICAgICAgIGNba2V5XSA6IHtpZGVhbDogY1trZXldfTtcbiAgICAgICAgaWYgKHIubWluICE9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIHIubWF4ICE9PSB1bmRlZmluZWQgfHwgci5leGFjdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmVxdWlyZS5wdXNoKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHIuZXhhY3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGlmICh0eXBlb2Ygci5leGFjdCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHIuIG1pbiA9IHIubWF4ID0gci5leGFjdDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY1trZXldID0gci5leGFjdDtcbiAgICAgICAgICB9XG4gICAgICAgICAgZGVsZXRlIHIuZXhhY3Q7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHIuaWRlYWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGMuYWR2YW5jZWQgPSBjLmFkdmFuY2VkIHx8IFtdO1xuICAgICAgICAgIHZhciBvYyA9IHt9O1xuICAgICAgICAgIGlmICh0eXBlb2Ygci5pZGVhbCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIG9jW2tleV0gPSB7bWluOiByLmlkZWFsLCBtYXg6IHIuaWRlYWx9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvY1trZXldID0gci5pZGVhbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgYy5hZHZhbmNlZC5wdXNoKG9jKTtcbiAgICAgICAgICBkZWxldGUgci5pZGVhbDtcbiAgICAgICAgICBpZiAoIU9iamVjdC5rZXlzKHIpLmxlbmd0aCkge1xuICAgICAgICAgICAgZGVsZXRlIGNba2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKHJlcXVpcmUubGVuZ3RoKSB7XG4gICAgICAgIGMucmVxdWlyZSA9IHJlcXVpcmU7XG4gICAgICB9XG4gICAgICByZXR1cm4gYztcbiAgICB9O1xuICAgIGNvbnN0cmFpbnRzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShjb25zdHJhaW50cykpO1xuICAgIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgMzgpIHtcbiAgICAgIGxvZ2dpbmcoJ3NwZWM6ICcgKyBKU09OLnN0cmluZ2lmeShjb25zdHJhaW50cykpO1xuICAgICAgaWYgKGNvbnN0cmFpbnRzLmF1ZGlvKSB7XG4gICAgICAgIGNvbnN0cmFpbnRzLmF1ZGlvID0gY29uc3RyYWludHNUb0ZGMzdfKGNvbnN0cmFpbnRzLmF1ZGlvKTtcbiAgICAgIH1cbiAgICAgIGlmIChjb25zdHJhaW50cy52aWRlbykge1xuICAgICAgICBjb25zdHJhaW50cy52aWRlbyA9IGNvbnN0cmFpbnRzVG9GRjM3Xyhjb25zdHJhaW50cy52aWRlbyk7XG4gICAgICB9XG4gICAgICBsb2dnaW5nKCdmZjM3OiAnICsgSlNPTi5zdHJpbmdpZnkoY29uc3RyYWludHMpKTtcbiAgICB9XG4gICAgcmV0dXJuIG5hdmlnYXRvci5tb3pHZXRVc2VyTWVkaWEoY29uc3RyYWludHMsIG9uU3VjY2VzcywgZnVuY3Rpb24oZSkge1xuICAgICAgb25FcnJvcihzaGltRXJyb3JfKGUpKTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIHRoZSByZXN1bHQgb2YgZ2V0VXNlck1lZGlhIGFzIGEgUHJvbWlzZS5cbiAgdmFyIGdldFVzZXJNZWRpYVByb21pc2VfID0gZnVuY3Rpb24oY29uc3RyYWludHMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBnZXRVc2VyTWVkaWFfKGNvbnN0cmFpbnRzLCByZXNvbHZlLCByZWplY3QpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIFNoaW0gZm9yIG1lZGlhRGV2aWNlcyBvbiBvbGRlciB2ZXJzaW9ucy5cbiAgaWYgKCFuYXZpZ2F0b3IubWVkaWFEZXZpY2VzKSB7XG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcyA9IHtnZXRVc2VyTWVkaWE6IGdldFVzZXJNZWRpYVByb21pc2VfLFxuICAgICAgYWRkRXZlbnRMaXN0ZW5lcjogZnVuY3Rpb24oKSB7IH0sXG4gICAgICByZW1vdmVFdmVudExpc3RlbmVyOiBmdW5jdGlvbigpIHsgfVxuICAgIH07XG4gIH1cbiAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzID1cbiAgICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlcyB8fCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiAgICAgICAgICB2YXIgaW5mb3MgPSBbXG4gICAgICAgICAgICB7a2luZDogJ2F1ZGlvaW5wdXQnLCBkZXZpY2VJZDogJ2RlZmF1bHQnLCBsYWJlbDogJycsIGdyb3VwSWQ6ICcnfSxcbiAgICAgICAgICAgIHtraW5kOiAndmlkZW9pbnB1dCcsIGRldmljZUlkOiAnZGVmYXVsdCcsIGxhYmVsOiAnJywgZ3JvdXBJZDogJyd9XG4gICAgICAgICAgXTtcbiAgICAgICAgICByZXNvbHZlKGluZm9zKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgNDEpIHtcbiAgICAvLyBXb3JrIGFyb3VuZCBodHRwOi8vYnVnemlsLmxhLzExNjk2NjVcbiAgICB2YXIgb3JnRW51bWVyYXRlRGV2aWNlcyA9XG4gICAgICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlcy5iaW5kKG5hdmlnYXRvci5tZWRpYURldmljZXMpO1xuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIG9yZ0VudW1lcmF0ZURldmljZXMoKS50aGVuKHVuZGVmaW5lZCwgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoZS5uYW1lID09PSAnTm90Rm91bmRFcnJvcicpIHtcbiAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbiAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCA0OSkge1xuICAgIHZhciBvcmlnR2V0VXNlck1lZGlhID0gbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEuXG4gICAgICAgIGJpbmQobmF2aWdhdG9yLm1lZGlhRGV2aWNlcyk7XG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEgPSBmdW5jdGlvbihjKSB7XG4gICAgICByZXR1cm4gb3JpZ0dldFVzZXJNZWRpYShjKS50aGVuKGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgICAvLyBXb3JrIGFyb3VuZCBodHRwczovL2J1Z3ppbC5sYS84MDIzMjZcbiAgICAgICAgaWYgKGMuYXVkaW8gJiYgIXN0cmVhbS5nZXRBdWRpb1RyYWNrcygpLmxlbmd0aCB8fFxuICAgICAgICAgICAgYy52aWRlbyAmJiAhc3RyZWFtLmdldFZpZGVvVHJhY2tzKCkubGVuZ3RoKSB7XG4gICAgICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcbiAgICAgICAgICAgIHRyYWNrLnN0b3AoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKCdUaGUgb2JqZWN0IGNhbiBub3QgYmUgZm91bmQgaGVyZS4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ05vdEZvdW5kRXJyb3InKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RyZWFtO1xuICAgICAgfSwgZnVuY3Rpb24oZSkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3Qoc2hpbUVycm9yXyhlKSk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG4gIGlmICghKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPiA1NSAmJlxuICAgICAgJ2F1dG9HYWluQ29udHJvbCcgaW4gbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRTdXBwb3J0ZWRDb25zdHJhaW50cygpKSkge1xuICAgIHZhciByZW1hcCA9IGZ1bmN0aW9uKG9iaiwgYSwgYikge1xuICAgICAgaWYgKGEgaW4gb2JqICYmICEoYiBpbiBvYmopKSB7XG4gICAgICAgIG9ialtiXSA9IG9ialthXTtcbiAgICAgICAgZGVsZXRlIG9ialthXTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIG5hdGl2ZUdldFVzZXJNZWRpYSA9IG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhLlxuICAgICAgICBiaW5kKG5hdmlnYXRvci5tZWRpYURldmljZXMpO1xuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhID0gZnVuY3Rpb24oYykge1xuICAgICAgaWYgKHR5cGVvZiBjID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgYy5hdWRpbyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgYyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYykpO1xuICAgICAgICByZW1hcChjLmF1ZGlvLCAnYXV0b0dhaW5Db250cm9sJywgJ21vekF1dG9HYWluQ29udHJvbCcpO1xuICAgICAgICByZW1hcChjLmF1ZGlvLCAnbm9pc2VTdXBwcmVzc2lvbicsICdtb3pOb2lzZVN1cHByZXNzaW9uJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmF0aXZlR2V0VXNlck1lZGlhKGMpO1xuICAgIH07XG5cbiAgICBpZiAoTWVkaWFTdHJlYW1UcmFjayAmJiBNZWRpYVN0cmVhbVRyYWNrLnByb3RvdHlwZS5nZXRTZXR0aW5ncykge1xuICAgICAgdmFyIG5hdGl2ZUdldFNldHRpbmdzID0gTWVkaWFTdHJlYW1UcmFjay5wcm90b3R5cGUuZ2V0U2V0dGluZ3M7XG4gICAgICBNZWRpYVN0cmVhbVRyYWNrLnByb3RvdHlwZS5nZXRTZXR0aW5ncyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgb2JqID0gbmF0aXZlR2V0U2V0dGluZ3MuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgcmVtYXAob2JqLCAnbW96QXV0b0dhaW5Db250cm9sJywgJ2F1dG9HYWluQ29udHJvbCcpO1xuICAgICAgICByZW1hcChvYmosICdtb3pOb2lzZVN1cHByZXNzaW9uJywgJ25vaXNlU3VwcHJlc3Npb24nKTtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKE1lZGlhU3RyZWFtVHJhY2sgJiYgTWVkaWFTdHJlYW1UcmFjay5wcm90b3R5cGUuYXBwbHlDb25zdHJhaW50cykge1xuICAgICAgdmFyIG5hdGl2ZUFwcGx5Q29uc3RyYWludHMgPSBNZWRpYVN0cmVhbVRyYWNrLnByb3RvdHlwZS5hcHBseUNvbnN0cmFpbnRzO1xuICAgICAgTWVkaWFTdHJlYW1UcmFjay5wcm90b3R5cGUuYXBwbHlDb25zdHJhaW50cyA9IGZ1bmN0aW9uKGMpIHtcbiAgICAgICAgaWYgKHRoaXMua2luZCA9PT0gJ2F1ZGlvJyAmJiB0eXBlb2YgYyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBjID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShjKSk7XG4gICAgICAgICAgcmVtYXAoYywgJ2F1dG9HYWluQ29udHJvbCcsICdtb3pBdXRvR2FpbkNvbnRyb2wnKTtcbiAgICAgICAgICByZW1hcChjLCAnbm9pc2VTdXBwcmVzc2lvbicsICdtb3pOb2lzZVN1cHByZXNzaW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5hdGl2ZUFwcGx5Q29uc3RyYWludHMuYXBwbHkodGhpcywgW2NdKTtcbiAgICAgIH07XG4gICAgfVxuICB9XG4gIG5hdmlnYXRvci5nZXRVc2VyTWVkaWEgPSBmdW5jdGlvbihjb25zdHJhaW50cywgb25TdWNjZXNzLCBvbkVycm9yKSB7XG4gICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCA0NCkge1xuICAgICAgcmV0dXJuIGdldFVzZXJNZWRpYV8oY29uc3RyYWludHMsIG9uU3VjY2Vzcywgb25FcnJvcik7XG4gICAgfVxuICAgIC8vIFJlcGxhY2UgRmlyZWZveCA0NCsncyBkZXByZWNhdGlvbiB3YXJuaW5nIHdpdGggdW5wcmVmaXhlZCB2ZXJzaW9uLlxuICAgIHV0aWxzLmRlcHJlY2F0ZWQoJ25hdmlnYXRvci5nZXRVc2VyTWVkaWEnLFxuICAgICAgICAnbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEnKTtcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYShjb25zdHJhaW50cykudGhlbihvblN1Y2Nlc3MsIG9uRXJyb3IpO1xuICB9O1xufTtcblxufSx7XCIuLi91dGlsc1wiOjEzfV0sMTI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLypcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcbiAqICB0cmVlLlxuICovXG4ndXNlIHN0cmljdCc7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2hpbUxvY2FsU3RyZWFtc0FQSTogZnVuY3Rpb24od2luZG93KSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICdvYmplY3QnIHx8ICF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCEoJ2dldExvY2FsU3RyZWFtcycgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkpIHtcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0TG9jYWxTdHJlYW1zID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghdGhpcy5fbG9jYWxTdHJlYW1zKSB7XG4gICAgICAgICAgdGhpcy5fbG9jYWxTdHJlYW1zID0gW107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsU3RyZWFtcztcbiAgICAgIH07XG4gICAgfVxuICAgIGlmICghKCdnZXRTdHJlYW1CeUlkJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTdHJlYW1CeUlkID0gZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IG51bGw7XG4gICAgICAgIGlmICh0aGlzLl9sb2NhbFN0cmVhbXMpIHtcbiAgICAgICAgICB0aGlzLl9sb2NhbFN0cmVhbXMuZm9yRWFjaChmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgICAgICAgIGlmIChzdHJlYW0uaWQgPT09IGlkKSB7XG4gICAgICAgICAgICAgIHJlc3VsdCA9IHN0cmVhbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fcmVtb3RlU3RyZWFtcykge1xuICAgICAgICAgIHRoaXMuX3JlbW90ZVN0cmVhbXMuZm9yRWFjaChmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgICAgICAgIGlmIChzdHJlYW0uaWQgPT09IGlkKSB7XG4gICAgICAgICAgICAgIHJlc3VsdCA9IHN0cmVhbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKCEoJ2FkZFN0cmVhbScgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkpIHtcbiAgICAgIHZhciBfYWRkVHJhY2sgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFRyYWNrO1xuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgICAgaWYgKCF0aGlzLl9sb2NhbFN0cmVhbXMpIHtcbiAgICAgICAgICB0aGlzLl9sb2NhbFN0cmVhbXMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fbG9jYWxTdHJlYW1zLmluZGV4T2Yoc3RyZWFtKSA9PT0gLTEpIHtcbiAgICAgICAgICB0aGlzLl9sb2NhbFN0cmVhbXMucHVzaChzdHJlYW0pO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XG4gICAgICAgICAgX2FkZFRyYWNrLmNhbGwocGMsIHRyYWNrLCBzdHJlYW0pO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2sgPSBmdW5jdGlvbih0cmFjaywgc3RyZWFtKSB7XG4gICAgICAgIGlmIChzdHJlYW0pIHtcbiAgICAgICAgICBpZiAoIXRoaXMuX2xvY2FsU3RyZWFtcykge1xuICAgICAgICAgICAgdGhpcy5fbG9jYWxTdHJlYW1zID0gW3N0cmVhbV07XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9sb2NhbFN0cmVhbXMuaW5kZXhPZihzdHJlYW0pID09PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5fbG9jYWxTdHJlYW1zLnB1c2goc3RyZWFtKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9hZGRUcmFjay5jYWxsKHRoaXMsIHRyYWNrLCBzdHJlYW0pO1xuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKCEoJ3JlbW92ZVN0cmVhbScgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkpIHtcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICAgIGlmICghdGhpcy5fbG9jYWxTdHJlYW1zKSB7XG4gICAgICAgICAgdGhpcy5fbG9jYWxTdHJlYW1zID0gW107XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5fbG9jYWxTdHJlYW1zLmluZGV4T2Yoc3RyZWFtKTtcbiAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sb2NhbFN0cmVhbXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgICAgdmFyIHRyYWNrcyA9IHN0cmVhbS5nZXRUcmFja3MoKTtcbiAgICAgICAgdGhpcy5nZXRTZW5kZXJzKCkuZm9yRWFjaChmdW5jdGlvbihzZW5kZXIpIHtcbiAgICAgICAgICBpZiAodHJhY2tzLmluZGV4T2Yoc2VuZGVyLnRyYWNrKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHBjLnJlbW92ZVRyYWNrKHNlbmRlcik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfVxuICB9LFxuICBzaGltUmVtb3RlU3RyZWFtc0FQSTogZnVuY3Rpb24od2luZG93KSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICdvYmplY3QnIHx8ICF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCEoJ2dldFJlbW90ZVN0cmVhbXMnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFJlbW90ZVN0cmVhbXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlbW90ZVN0cmVhbXMgPyB0aGlzLl9yZW1vdGVTdHJlYW1zIDogW107XG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAoISgnb25hZGRzdHJlYW0nIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSwgJ29uYWRkc3RyZWFtJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9vbmFkZHN0cmVhbTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbihmKSB7XG4gICAgICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgICAgICBpZiAodGhpcy5fb25hZGRzdHJlYW0pIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWRkc3RyZWFtJywgdGhpcy5fb25hZGRzdHJlYW0pO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFjaycsIHRoaXMuX29uYWRkc3RyZWFtcG9seSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignYWRkc3RyZWFtJywgdGhpcy5fb25hZGRzdHJlYW0gPSBmKTtcbiAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYWNrJywgdGhpcy5fb25hZGRzdHJlYW1wb2x5ID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5zdHJlYW1zLmZvckVhY2goZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICAgICAgICAgIGlmICghcGMuX3JlbW90ZVN0cmVhbXMpIHtcbiAgICAgICAgICAgICAgICBwYy5fcmVtb3RlU3RyZWFtcyA9IFtdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChwYy5fcmVtb3RlU3RyZWFtcy5pbmRleE9mKHN0cmVhbSkgPj0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBwYy5fcmVtb3RlU3RyZWFtcy5wdXNoKHN0cmVhbSk7XG4gICAgICAgICAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgnYWRkc3RyZWFtJyk7XG4gICAgICAgICAgICAgIGV2ZW50LnN0cmVhbSA9IHN0cmVhbTtcbiAgICAgICAgICAgICAgcGMuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9LFxuICBzaGltQ2FsbGJhY2tzQVBJOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ29iamVjdCcgfHwgIXdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgcHJvdG90eXBlID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZTtcbiAgICB2YXIgY3JlYXRlT2ZmZXIgPSBwcm90b3R5cGUuY3JlYXRlT2ZmZXI7XG4gICAgdmFyIGNyZWF0ZUFuc3dlciA9IHByb3RvdHlwZS5jcmVhdGVBbnN3ZXI7XG4gICAgdmFyIHNldExvY2FsRGVzY3JpcHRpb24gPSBwcm90b3R5cGUuc2V0TG9jYWxEZXNjcmlwdGlvbjtcbiAgICB2YXIgc2V0UmVtb3RlRGVzY3JpcHRpb24gPSBwcm90b3R5cGUuc2V0UmVtb3RlRGVzY3JpcHRpb247XG4gICAgdmFyIGFkZEljZUNhbmRpZGF0ZSA9IHByb3RvdHlwZS5hZGRJY2VDYW5kaWRhdGU7XG5cbiAgICBwcm90b3R5cGUuY3JlYXRlT2ZmZXIgPSBmdW5jdGlvbihzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjaykge1xuICAgICAgdmFyIG9wdGlvbnMgPSAoYXJndW1lbnRzLmxlbmd0aCA+PSAyKSA/IGFyZ3VtZW50c1syXSA6IGFyZ3VtZW50c1swXTtcbiAgICAgIHZhciBwcm9taXNlID0gY3JlYXRlT2ZmZXIuYXBwbHkodGhpcywgW29wdGlvbnNdKTtcbiAgICAgIGlmICghZmFpbHVyZUNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgICAgfVxuICAgICAgcHJvbWlzZS50aGVuKHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9O1xuXG4gICAgcHJvdG90eXBlLmNyZWF0ZUFuc3dlciA9IGZ1bmN0aW9uKHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKSB7XG4gICAgICB2YXIgb3B0aW9ucyA9IChhcmd1bWVudHMubGVuZ3RoID49IDIpID8gYXJndW1lbnRzWzJdIDogYXJndW1lbnRzWzBdO1xuICAgICAgdmFyIHByb21pc2UgPSBjcmVhdGVBbnN3ZXIuYXBwbHkodGhpcywgW29wdGlvbnNdKTtcbiAgICAgIGlmICghZmFpbHVyZUNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgICAgfVxuICAgICAgcHJvbWlzZS50aGVuKHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9O1xuXG4gICAgdmFyIHdpdGhDYWxsYmFjayA9IGZ1bmN0aW9uKGRlc2NyaXB0aW9uLCBzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjaykge1xuICAgICAgdmFyIHByb21pc2UgPSBzZXRMb2NhbERlc2NyaXB0aW9uLmFwcGx5KHRoaXMsIFtkZXNjcmlwdGlvbl0pO1xuICAgICAgaWYgKCFmYWlsdXJlQ2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgICB9XG4gICAgICBwcm9taXNlLnRoZW4oc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH07XG4gICAgcHJvdG90eXBlLnNldExvY2FsRGVzY3JpcHRpb24gPSB3aXRoQ2FsbGJhY2s7XG5cbiAgICB3aXRoQ2FsbGJhY2sgPSBmdW5jdGlvbihkZXNjcmlwdGlvbiwgc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spIHtcbiAgICAgIHZhciBwcm9taXNlID0gc2V0UmVtb3RlRGVzY3JpcHRpb24uYXBwbHkodGhpcywgW2Rlc2NyaXB0aW9uXSk7XG4gICAgICBpZiAoIWZhaWx1cmVDYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgIH1cbiAgICAgIHByb21pc2UudGhlbihzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjayk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfTtcbiAgICBwcm90b3R5cGUuc2V0UmVtb3RlRGVzY3JpcHRpb24gPSB3aXRoQ2FsbGJhY2s7XG5cbiAgICB3aXRoQ2FsbGJhY2sgPSBmdW5jdGlvbihjYW5kaWRhdGUsIHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKSB7XG4gICAgICB2YXIgcHJvbWlzZSA9IGFkZEljZUNhbmRpZGF0ZS5hcHBseSh0aGlzLCBbY2FuZGlkYXRlXSk7XG4gICAgICBpZiAoIWZhaWx1cmVDYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgIH1cbiAgICAgIHByb21pc2UudGhlbihzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjayk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfTtcbiAgICBwcm90b3R5cGUuYWRkSWNlQ2FuZGlkYXRlID0gd2l0aENhbGxiYWNrO1xuICB9LFxuICBzaGltR2V0VXNlck1lZGlhOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICB2YXIgbmF2aWdhdG9yID0gd2luZG93ICYmIHdpbmRvdy5uYXZpZ2F0b3I7XG5cbiAgICBpZiAoIW5hdmlnYXRvci5nZXRVc2VyTWVkaWEpIHtcbiAgICAgIGlmIChuYXZpZ2F0b3Iud2Via2l0R2V0VXNlck1lZGlhKSB7XG4gICAgICAgIG5hdmlnYXRvci5nZXRVc2VyTWVkaWEgPSBuYXZpZ2F0b3Iud2Via2l0R2V0VXNlck1lZGlhLmJpbmQobmF2aWdhdG9yKTtcbiAgICAgIH0gZWxzZSBpZiAobmF2aWdhdG9yLm1lZGlhRGV2aWNlcyAmJlxuICAgICAgICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKSB7XG4gICAgICAgIG5hdmlnYXRvci5nZXRVc2VyTWVkaWEgPSBmdW5jdGlvbihjb25zdHJhaW50cywgY2IsIGVycmNiKSB7XG4gICAgICAgICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoY29uc3RyYWludHMpXG4gICAgICAgICAgLnRoZW4oY2IsIGVycmNiKTtcbiAgICAgICAgfS5iaW5kKG5hdmlnYXRvcik7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBzaGltUlRDSWNlU2VydmVyVXJsczogZnVuY3Rpb24od2luZG93KSB7XG4gICAgLy8gbWlncmF0ZSBmcm9tIG5vbi1zcGVjIFJUQ0ljZVNlcnZlci51cmwgdG8gUlRDSWNlU2VydmVyLnVybHNcbiAgICB2YXIgT3JpZ1BlZXJDb25uZWN0aW9uID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiA9IGZ1bmN0aW9uKHBjQ29uZmlnLCBwY0NvbnN0cmFpbnRzKSB7XG4gICAgICBpZiAocGNDb25maWcgJiYgcGNDb25maWcuaWNlU2VydmVycykge1xuICAgICAgICB2YXIgbmV3SWNlU2VydmVycyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBjQ29uZmlnLmljZVNlcnZlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgc2VydmVyID0gcGNDb25maWcuaWNlU2VydmVyc1tpXTtcbiAgICAgICAgICBpZiAoIXNlcnZlci5oYXNPd25Qcm9wZXJ0eSgndXJscycpICYmXG4gICAgICAgICAgICAgIHNlcnZlci5oYXNPd25Qcm9wZXJ0eSgndXJsJykpIHtcbiAgICAgICAgICAgIHV0aWxzLmRlcHJlY2F0ZWQoJ1JUQ0ljZVNlcnZlci51cmwnLCAnUlRDSWNlU2VydmVyLnVybHMnKTtcbiAgICAgICAgICAgIHNlcnZlciA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoc2VydmVyKSk7XG4gICAgICAgICAgICBzZXJ2ZXIudXJscyA9IHNlcnZlci51cmw7XG4gICAgICAgICAgICBkZWxldGUgc2VydmVyLnVybDtcbiAgICAgICAgICAgIG5ld0ljZVNlcnZlcnMucHVzaChzZXJ2ZXIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdJY2VTZXJ2ZXJzLnB1c2gocGNDb25maWcuaWNlU2VydmVyc1tpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHBjQ29uZmlnLmljZVNlcnZlcnMgPSBuZXdJY2VTZXJ2ZXJzO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBPcmlnUGVlckNvbm5lY3Rpb24ocGNDb25maWcsIHBjQ29uc3RyYWludHMpO1xuICAgIH07XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSA9IE9yaWdQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGU7XG4gICAgLy8gd3JhcCBzdGF0aWMgbWV0aG9kcy4gQ3VycmVudGx5IGp1c3QgZ2VuZXJhdGVDZXJ0aWZpY2F0ZS5cbiAgICBpZiAoJ2dlbmVyYXRlQ2VydGlmaWNhdGUnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbikge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiwgJ2dlbmVyYXRlQ2VydGlmaWNhdGUnLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIE9yaWdQZWVyQ29ubmVjdGlvbi5nZW5lcmF0ZUNlcnRpZmljYXRlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIHNoaW1UcmFja0V2ZW50VHJhbnNjZWl2ZXI6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIC8vIEFkZCBldmVudC50cmFuc2NlaXZlciBtZW1iZXIgb3ZlciBkZXByZWNhdGVkIGV2ZW50LnJlY2VpdmVyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiAmJlxuICAgICAgICAoJ3JlY2VpdmVyJyBpbiB3aW5kb3cuUlRDVHJhY2tFdmVudC5wcm90b3R5cGUpICYmXG4gICAgICAgIC8vIGNhbid0IGNoZWNrICd0cmFuc2NlaXZlcicgaW4gd2luZG93LlJUQ1RyYWNrRXZlbnQucHJvdG90eXBlLCBhcyBpdCBpc1xuICAgICAgICAvLyBkZWZpbmVkIGZvciBzb21lIHJlYXNvbiBldmVuIHdoZW4gd2luZG93LlJUQ1RyYW5zY2VpdmVyIGlzIG5vdC5cbiAgICAgICAgIXdpbmRvdy5SVENUcmFuc2NlaXZlcikge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENUcmFja0V2ZW50LnByb3RvdHlwZSwgJ3RyYW5zY2VpdmVyJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB7cmVjZWl2ZXI6IHRoaXMucmVjZWl2ZXJ9O1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgc2hpbUNyZWF0ZU9mZmVyTGVnYWN5OiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICB2YXIgb3JpZ0NyZWF0ZU9mZmVyID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5jcmVhdGVPZmZlcjtcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmNyZWF0ZU9mZmVyID0gZnVuY3Rpb24ob2ZmZXJPcHRpb25zKSB7XG4gICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgaWYgKG9mZmVyT3B0aW9ucykge1xuICAgICAgICBpZiAodHlwZW9mIG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZUF1ZGlvICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIC8vIHN1cHBvcnQgYml0IHZhbHVlc1xuICAgICAgICAgIG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZUF1ZGlvID0gISFvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbztcbiAgICAgICAgfVxuICAgICAgICB2YXIgYXVkaW9UcmFuc2NlaXZlciA9IHBjLmdldFRyYW5zY2VpdmVycygpLmZpbmQoZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcbiAgICAgICAgICByZXR1cm4gdHJhbnNjZWl2ZXIuc2VuZGVyLnRyYWNrICYmXG4gICAgICAgICAgICAgIHRyYW5zY2VpdmVyLnNlbmRlci50cmFjay5raW5kID09PSAnYXVkaW8nO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZUF1ZGlvID09PSBmYWxzZSAmJiBhdWRpb1RyYW5zY2VpdmVyKSB7XG4gICAgICAgICAgaWYgKGF1ZGlvVHJhbnNjZWl2ZXIuZGlyZWN0aW9uID09PSAnc2VuZHJlY3YnKSB7XG4gICAgICAgICAgICBpZiAoYXVkaW9UcmFuc2NlaXZlci5zZXREaXJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgYXVkaW9UcmFuc2NlaXZlci5zZXREaXJlY3Rpb24oJ3NlbmRvbmx5Jyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBhdWRpb1RyYW5zY2VpdmVyLmRpcmVjdGlvbiA9ICdzZW5kb25seSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChhdWRpb1RyYW5zY2VpdmVyLmRpcmVjdGlvbiA9PT0gJ3JlY3Zvbmx5Jykge1xuICAgICAgICAgICAgaWYgKGF1ZGlvVHJhbnNjZWl2ZXIuc2V0RGlyZWN0aW9uKSB7XG4gICAgICAgICAgICAgIGF1ZGlvVHJhbnNjZWl2ZXIuc2V0RGlyZWN0aW9uKCdpbmFjdGl2ZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgYXVkaW9UcmFuc2NlaXZlci5kaXJlY3Rpb24gPSAnaW5hY3RpdmUnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbyA9PT0gdHJ1ZSAmJlxuICAgICAgICAgICAgIWF1ZGlvVHJhbnNjZWl2ZXIpIHtcbiAgICAgICAgICBwYy5hZGRUcmFuc2NlaXZlcignYXVkaW8nKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKHR5cGVvZiBvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAvLyBzdXBwb3J0IGJpdCB2YWx1ZXNcbiAgICAgICAgICBvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVWaWRlbyA9ICEhb2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlVmlkZW87XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHZpZGVvVHJhbnNjZWl2ZXIgPSBwYy5nZXRUcmFuc2NlaXZlcnMoKS5maW5kKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XG4gICAgICAgICAgcmV0dXJuIHRyYW5zY2VpdmVyLnNlbmRlci50cmFjayAmJlxuICAgICAgICAgICAgICB0cmFuc2NlaXZlci5zZW5kZXIudHJhY2sua2luZCA9PT0gJ3ZpZGVvJztcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVWaWRlbyA9PT0gZmFsc2UgJiYgdmlkZW9UcmFuc2NlaXZlcikge1xuICAgICAgICAgIGlmICh2aWRlb1RyYW5zY2VpdmVyLmRpcmVjdGlvbiA9PT0gJ3NlbmRyZWN2Jykge1xuICAgICAgICAgICAgdmlkZW9UcmFuc2NlaXZlci5zZXREaXJlY3Rpb24oJ3NlbmRvbmx5Jyk7XG4gICAgICAgICAgfSBlbHNlIGlmICh2aWRlb1RyYW5zY2VpdmVyLmRpcmVjdGlvbiA9PT0gJ3JlY3Zvbmx5Jykge1xuICAgICAgICAgICAgdmlkZW9UcmFuc2NlaXZlci5zZXREaXJlY3Rpb24oJ2luYWN0aXZlJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvID09PSB0cnVlICYmXG4gICAgICAgICAgICAhdmlkZW9UcmFuc2NlaXZlcikge1xuICAgICAgICAgIHBjLmFkZFRyYW5zY2VpdmVyKCd2aWRlbycpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gb3JpZ0NyZWF0ZU9mZmVyLmFwcGx5KHBjLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH1cbn07XG5cbn0se1wiLi4vdXRpbHNcIjoxM31dLDEzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8qXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXG4gKiAgdHJlZS5cbiAqL1xuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgbG9nRGlzYWJsZWRfID0gdHJ1ZTtcbnZhciBkZXByZWNhdGlvbldhcm5pbmdzXyA9IHRydWU7XG5cbi8qKlxuICogRXh0cmFjdCBicm93c2VyIHZlcnNpb24gb3V0IG9mIHRoZSBwcm92aWRlZCB1c2VyIGFnZW50IHN0cmluZy5cbiAqXG4gKiBAcGFyYW0geyFzdHJpbmd9IHVhc3RyaW5nIHVzZXJBZ2VudCBzdHJpbmcuXG4gKiBAcGFyYW0geyFzdHJpbmd9IGV4cHIgUmVndWxhciBleHByZXNzaW9uIHVzZWQgYXMgbWF0Y2ggY3JpdGVyaWEuXG4gKiBAcGFyYW0geyFudW1iZXJ9IHBvcyBwb3NpdGlvbiBpbiB0aGUgdmVyc2lvbiBzdHJpbmcgdG8gYmUgcmV0dXJuZWQuXG4gKiBAcmV0dXJuIHshbnVtYmVyfSBicm93c2VyIHZlcnNpb24uXG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3RWZXJzaW9uKHVhc3RyaW5nLCBleHByLCBwb3MpIHtcbiAgdmFyIG1hdGNoID0gdWFzdHJpbmcubWF0Y2goZXhwcik7XG4gIHJldHVybiBtYXRjaCAmJiBtYXRjaC5sZW5ndGggPj0gcG9zICYmIHBhcnNlSW50KG1hdGNoW3Bvc10sIDEwKTtcbn1cblxuLy8gV3JhcHMgdGhlIHBlZXJjb25uZWN0aW9uIGV2ZW50IGV2ZW50TmFtZVRvV3JhcCBpbiBhIGZ1bmN0aW9uXG4vLyB3aGljaCByZXR1cm5zIHRoZSBtb2RpZmllZCBldmVudCBvYmplY3QuXG5mdW5jdGlvbiB3cmFwUGVlckNvbm5lY3Rpb25FdmVudCh3aW5kb3csIGV2ZW50TmFtZVRvV3JhcCwgd3JhcHBlcikge1xuICBpZiAoIXdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbikge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgcHJvdG8gPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlO1xuICB2YXIgbmF0aXZlQWRkRXZlbnRMaXN0ZW5lciA9IHByb3RvLmFkZEV2ZW50TGlzdGVuZXI7XG4gIHByb3RvLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihuYXRpdmVFdmVudE5hbWUsIGNiKSB7XG4gICAgaWYgKG5hdGl2ZUV2ZW50TmFtZSAhPT0gZXZlbnROYW1lVG9XcmFwKSB7XG4gICAgICByZXR1cm4gbmF0aXZlQWRkRXZlbnRMaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgICB2YXIgd3JhcHBlZENhbGxiYWNrID0gZnVuY3Rpb24oZSkge1xuICAgICAgY2Iod3JhcHBlcihlKSk7XG4gICAgfTtcbiAgICB0aGlzLl9ldmVudE1hcCA9IHRoaXMuX2V2ZW50TWFwIHx8IHt9O1xuICAgIHRoaXMuX2V2ZW50TWFwW2NiXSA9IHdyYXBwZWRDYWxsYmFjaztcbiAgICByZXR1cm4gbmF0aXZlQWRkRXZlbnRMaXN0ZW5lci5hcHBseSh0aGlzLCBbbmF0aXZlRXZlbnROYW1lLFxuICAgICAgd3JhcHBlZENhbGxiYWNrXSk7XG4gIH07XG5cbiAgdmFyIG5hdGl2ZVJlbW92ZUV2ZW50TGlzdGVuZXIgPSBwcm90by5yZW1vdmVFdmVudExpc3RlbmVyO1xuICBwcm90by5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24obmF0aXZlRXZlbnROYW1lLCBjYikge1xuICAgIGlmIChuYXRpdmVFdmVudE5hbWUgIT09IGV2ZW50TmFtZVRvV3JhcCB8fCAhdGhpcy5fZXZlbnRNYXBcbiAgICAgICAgfHwgIXRoaXMuX2V2ZW50TWFwW2NiXSkge1xuICAgICAgcmV0dXJuIG5hdGl2ZVJlbW92ZUV2ZW50TGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gICAgdmFyIHVud3JhcHBlZENiID0gdGhpcy5fZXZlbnRNYXBbY2JdO1xuICAgIGRlbGV0ZSB0aGlzLl9ldmVudE1hcFtjYl07XG4gICAgcmV0dXJuIG5hdGl2ZVJlbW92ZUV2ZW50TGlzdGVuZXIuYXBwbHkodGhpcywgW25hdGl2ZUV2ZW50TmFtZSxcbiAgICAgIHVud3JhcHBlZENiXSk7XG4gIH07XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCAnb24nICsgZXZlbnROYW1lVG9XcmFwLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzWydfb24nICsgZXZlbnROYW1lVG9XcmFwXTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24oY2IpIHtcbiAgICAgIGlmICh0aGlzWydfb24nICsgZXZlbnROYW1lVG9XcmFwXSkge1xuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lVG9XcmFwLFxuICAgICAgICAgICAgdGhpc1snX29uJyArIGV2ZW50TmFtZVRvV3JhcF0pO1xuICAgICAgICBkZWxldGUgdGhpc1snX29uJyArIGV2ZW50TmFtZVRvV3JhcF07XG4gICAgICB9XG4gICAgICBpZiAoY2IpIHtcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZVRvV3JhcCxcbiAgICAgICAgICAgIHRoaXNbJ19vbicgKyBldmVudE5hbWVUb1dyYXBdID0gY2IpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5cbi8vIFV0aWxpdHkgbWV0aG9kcy5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBleHRyYWN0VmVyc2lvbjogZXh0cmFjdFZlcnNpb24sXG4gIHdyYXBQZWVyQ29ubmVjdGlvbkV2ZW50OiB3cmFwUGVlckNvbm5lY3Rpb25FdmVudCxcbiAgZGlzYWJsZUxvZzogZnVuY3Rpb24oYm9vbCkge1xuICAgIGlmICh0eXBlb2YgYm9vbCAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICByZXR1cm4gbmV3IEVycm9yKCdBcmd1bWVudCB0eXBlOiAnICsgdHlwZW9mIGJvb2wgK1xuICAgICAgICAgICcuIFBsZWFzZSB1c2UgYSBib29sZWFuLicpO1xuICAgIH1cbiAgICBsb2dEaXNhYmxlZF8gPSBib29sO1xuICAgIHJldHVybiAoYm9vbCkgPyAnYWRhcHRlci5qcyBsb2dnaW5nIGRpc2FibGVkJyA6XG4gICAgICAgICdhZGFwdGVyLmpzIGxvZ2dpbmcgZW5hYmxlZCc7XG4gIH0sXG5cbiAgLyoqXG4gICAqIERpc2FibGUgb3IgZW5hYmxlIGRlcHJlY2F0aW9uIHdhcm5pbmdzXG4gICAqIEBwYXJhbSB7IWJvb2xlYW59IGJvb2wgc2V0IHRvIHRydWUgdG8gZGlzYWJsZSB3YXJuaW5ncy5cbiAgICovXG4gIGRpc2FibGVXYXJuaW5nczogZnVuY3Rpb24oYm9vbCkge1xuICAgIGlmICh0eXBlb2YgYm9vbCAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICByZXR1cm4gbmV3IEVycm9yKCdBcmd1bWVudCB0eXBlOiAnICsgdHlwZW9mIGJvb2wgK1xuICAgICAgICAgICcuIFBsZWFzZSB1c2UgYSBib29sZWFuLicpO1xuICAgIH1cbiAgICBkZXByZWNhdGlvbldhcm5pbmdzXyA9ICFib29sO1xuICAgIHJldHVybiAnYWRhcHRlci5qcyBkZXByZWNhdGlvbiB3YXJuaW5ncyAnICsgKGJvb2wgPyAnZGlzYWJsZWQnIDogJ2VuYWJsZWQnKTtcbiAgfSxcblxuICBsb2c6IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKGxvZ0Rpc2FibGVkXykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBjb25zb2xlLmxvZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogU2hvd3MgYSBkZXByZWNhdGlvbiB3YXJuaW5nIHN1Z2dlc3RpbmcgdGhlIG1vZGVybiBhbmQgc3BlYy1jb21wYXRpYmxlIEFQSS5cbiAgICovXG4gIGRlcHJlY2F0ZWQ6IGZ1bmN0aW9uKG9sZE1ldGhvZCwgbmV3TWV0aG9kKSB7XG4gICAgaWYgKCFkZXByZWNhdGlvbldhcm5pbmdzXykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zb2xlLndhcm4ob2xkTWV0aG9kICsgJyBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlICcgKyBuZXdNZXRob2QgK1xuICAgICAgICAnIGluc3RlYWQuJyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEJyb3dzZXIgZGV0ZWN0b3IuXG4gICAqXG4gICAqIEByZXR1cm4ge29iamVjdH0gcmVzdWx0IGNvbnRhaW5pbmcgYnJvd3NlciBhbmQgdmVyc2lvblxuICAgKiAgICAgcHJvcGVydGllcy5cbiAgICovXG4gIGRldGVjdEJyb3dzZXI6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIHZhciBuYXZpZ2F0b3IgPSB3aW5kb3cgJiYgd2luZG93Lm5hdmlnYXRvcjtcblxuICAgIC8vIFJldHVybmVkIHJlc3VsdCBvYmplY3QuXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIHJlc3VsdC5icm93c2VyID0gbnVsbDtcbiAgICByZXN1bHQudmVyc2lvbiA9IG51bGw7XG5cbiAgICAvLyBGYWlsIGVhcmx5IGlmIGl0J3Mgbm90IGEgYnJvd3NlclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyB8fCAhd2luZG93Lm5hdmlnYXRvcikge1xuICAgICAgcmVzdWx0LmJyb3dzZXIgPSAnTm90IGEgYnJvd3Nlci4nO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBpZiAobmF2aWdhdG9yLm1vekdldFVzZXJNZWRpYSkgeyAvLyBGaXJlZm94LlxuICAgICAgcmVzdWx0LmJyb3dzZXIgPSAnZmlyZWZveCc7XG4gICAgICByZXN1bHQudmVyc2lvbiA9IGV4dHJhY3RWZXJzaW9uKG5hdmlnYXRvci51c2VyQWdlbnQsXG4gICAgICAgICAgL0ZpcmVmb3hcXC8oXFxkKylcXC4vLCAxKTtcbiAgICB9IGVsc2UgaWYgKG5hdmlnYXRvci53ZWJraXRHZXRVc2VyTWVkaWEpIHtcbiAgICAgIC8vIENocm9tZSwgQ2hyb21pdW0sIFdlYnZpZXcsIE9wZXJhLlxuICAgICAgLy8gVmVyc2lvbiBtYXRjaGVzIENocm9tZS9XZWJSVEMgdmVyc2lvbi5cbiAgICAgIHJlc3VsdC5icm93c2VyID0gJ2Nocm9tZSc7XG4gICAgICByZXN1bHQudmVyc2lvbiA9IGV4dHJhY3RWZXJzaW9uKG5hdmlnYXRvci51c2VyQWdlbnQsXG4gICAgICAgICAgL0Nocm9tKGV8aXVtKVxcLyhcXGQrKVxcLi8sIDIpO1xuICAgIH0gZWxzZSBpZiAobmF2aWdhdG9yLm1lZGlhRGV2aWNlcyAmJlxuICAgICAgICBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9FZGdlXFwvKFxcZCspLihcXGQrKSQvKSkgeyAvLyBFZGdlLlxuICAgICAgcmVzdWx0LmJyb3dzZXIgPSAnZWRnZSc7XG4gICAgICByZXN1bHQudmVyc2lvbiA9IGV4dHJhY3RWZXJzaW9uKG5hdmlnYXRvci51c2VyQWdlbnQsXG4gICAgICAgICAgL0VkZ2VcXC8oXFxkKykuKFxcZCspJC8sIDIpO1xuICAgIH0gZWxzZSBpZiAod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uICYmXG4gICAgICAgIG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0FwcGxlV2ViS2l0XFwvKFxcZCspXFwuLykpIHsgLy8gU2FmYXJpLlxuICAgICAgcmVzdWx0LmJyb3dzZXIgPSAnc2FmYXJpJztcbiAgICAgIHJlc3VsdC52ZXJzaW9uID0gZXh0cmFjdFZlcnNpb24obmF2aWdhdG9yLnVzZXJBZ2VudCxcbiAgICAgICAgICAvQXBwbGVXZWJLaXRcXC8oXFxkKylcXC4vLCAxKTtcbiAgICB9IGVsc2UgeyAvLyBEZWZhdWx0IGZhbGx0aHJvdWdoOiBub3Qgc3VwcG9ydGVkLlxuICAgICAgcmVzdWx0LmJyb3dzZXIgPSAnTm90IGEgc3VwcG9ydGVkIGJyb3dzZXIuJztcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufTtcblxufSx7fV19LHt9LFszXSkoMylcbn0pOyJdLCJzb3VyY2VSb290IjoiIn0=