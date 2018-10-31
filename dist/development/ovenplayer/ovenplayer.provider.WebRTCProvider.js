/*! OvenPlayerv0.7.62 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L1dlYlJUQy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L1dlYlJUQ0xvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvYWRhcHRlci5qcyJdLCJuYW1lcyI6WyJXZWJSVEMiLCJjb250YWluZXIiLCJwbGF5ZXJDb25maWciLCJtZWRpYU1hbmFnZXIiLCJQUk9WSURFUl9XRUJSVEMiLCJlbGVtZW50IiwiY3JlYXRlIiwid2VicnRjTG9hZGVyIiwidGhhdCIsInN1cGVyX2Rlc3Ryb3kiLCJsaXN0ZW5lciIsImVycm9ySGFuZGxlciIsImVycm9yIiwic2V0U3RhdGUiLCJTVEFURV9FUlJPUiIsInBhdXNlIiwidHJpZ2dlciIsIkVSUk9SIiwib25CZWZvcmVMb2FkIiwic291cmNlIiwiZmlsZSIsInR5cGUiLCJPdmVuUGxheWVyQ29uc29sZSIsImxvZyIsImRlc3Ryb3kiLCJjb25uZWN0IiwidGhlbiIsInN0cmVhbSIsInNyY09iamVjdCIsInBsYXkiLCJXZWJSVENMb2FkZXIiLCJwcm92aWRlciIsInVybCIsImVycm9yQ2FsbGJhY2siLCJ3cyIsInBlZXJDb25uZWN0aW9uIiwic3RhdGlzdGljc1RpbWVyIiwiY29uZmlnIiwibXlTZHAiLCJleGlzdGluZ0hhbmRsZXIiLCJ3aW5kb3ciLCJvbmJlZm9yZXVubG9hZCIsImV2ZW50IiwiY2xvc2VQZWVyIiwiaW5pdGlhbGl6ZSIsIm9uTG9jYWxEZXNjcmlwdGlvbiIsImlkIiwiY29ubmVjdGlvbiIsImRlc2MiLCJzZXRMb2NhbERlc2NyaXB0aW9uIiwibG9jYWxTRFAiLCJsb2NhbERlc2NyaXB0aW9uIiwic2VuZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJjb21tYW5kIiwic2RwIiwiY29kZSIsIlBMQVlFUl9XRUJSVENfU0VUX0xPQ0FMX0RFU0NfRVJST1IiLCJyZWFzb24iLCJtZXNzYWdlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJXZWJTb2NrZXQiLCJvbm9wZW4iLCJvbm1lc3NhZ2UiLCJlIiwicGFyc2UiLCJkYXRhIiwiUExBWUVSX1dFQlJUQ19XU19FUlJPUiIsImxpc3QiLCJSVENQZWVyQ29ubmVjdGlvbiIsIm9uaWNlY2FuZGlkYXRlIiwiY2FuZGlkYXRlIiwiY2FuZGlkYXRlcyIsIm9ubmVnb3RpYXRpb25uZWVkZWQiLCJjcmVhdGVPZmZlciIsImVyciIsIlBMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUiIsIm9uYWRkc3RyZWFtIiwibG9zdFBhY2tldHNBcnIiLCJzbG90TGVuZ3RoIiwicHJldlBhY2tldHNMb3N0IiwiYXZnOExvc3NlcyIsImF2Z01vcmVUaGFuVGhyZXNob2xkQ291bnQiLCJ0aHJlc2hvbGQiLCJleHRyYWN0TG9zc1BhY2tldHNPbk5ldHdvcmtTdGF0dXMiLCJzZXRUaW1lb3V0IiwiZ2V0U3RhdHMiLCJzdGF0cyIsImZvckVhY2giLCJzdGF0ZSIsImlzUmVtb3RlIiwicHVzaCIsInBhcnNlSW50IiwicGFja2V0c0xvc3QiLCJsZW5ndGgiLCJzbGljZSIsIl8iLCJyZWR1Y2UiLCJtZW1vIiwibnVtIiwiY2xlYXJUaW1lb3V0IiwiTkVUV09SS19VTlNUQUJMRUQiLCJzZXRSZW1vdGVEZXNjcmlwdGlvbiIsIlJUQ1Nlc3Npb25EZXNjcmlwdGlvbiIsInJlbW90ZURlc2NyaXB0aW9uIiwiY3JlYXRlQW5zd2VyIiwiUExBWUVSX1dFQlJUQ19TRVRfUkVNT1RFX0RFU0NfRVJST1IiLCJpIiwiYWRkSWNlQ2FuZGlkYXRlIiwiUlRDSWNlQ2FuZGlkYXRlIiwiUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SIiwib25lcnJvciIsImNsb3NlIiwiZiIsImV4cG9ydHMiLCJtb2R1bGUiLCJkZWZpbmUiLCJ0IiwibiIsInIiLCJzIiwibyIsInUiLCJhIiwicmVxdWlyZSIsIkVycm9yIiwibCIsImNhbGwiLCJTRFBVdGlscyIsIndyaXRlTWVkaWFTZWN0aW9uIiwidHJhbnNjZWl2ZXIiLCJjYXBzIiwiZHRsc1JvbGUiLCJ3cml0ZVJ0cERlc2NyaXB0aW9uIiwia2luZCIsIndyaXRlSWNlUGFyYW1ldGVycyIsImljZUdhdGhlcmVyIiwiZ2V0TG9jYWxQYXJhbWV0ZXJzIiwid3JpdGVEdGxzUGFyYW1ldGVycyIsImR0bHNUcmFuc3BvcnQiLCJtaWQiLCJydHBTZW5kZXIiLCJydHBSZWNlaXZlciIsInRyYWNrSWQiLCJfaW5pdGlhbFRyYWNrSWQiLCJ0cmFjayIsIm1zaWQiLCJzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzIiwic3NyYyIsInJ0eCIsImxvY2FsQ05hbWUiLCJmaWx0ZXJJY2VTZXJ2ZXJzIiwiaWNlU2VydmVycyIsImVkZ2VWZXJzaW9uIiwiaGFzVHVybiIsImZpbHRlciIsInNlcnZlciIsInVybHMiLCJjb25zb2xlIiwid2FybiIsImlzU3RyaW5nIiwidmFsaWRUdXJuIiwiaW5kZXhPZiIsImdldENvbW1vbkNhcGFiaWxpdGllcyIsImxvY2FsQ2FwYWJpbGl0aWVzIiwicmVtb3RlQ2FwYWJpbGl0aWVzIiwiY29tbW9uQ2FwYWJpbGl0aWVzIiwiY29kZWNzIiwiaGVhZGVyRXh0ZW5zaW9ucyIsImZlY01lY2hhbmlzbXMiLCJmaW5kQ29kZWNCeVBheWxvYWRUeXBlIiwicHQiLCJwYXlsb2FkVHlwZSIsInByZWZlcnJlZFBheWxvYWRUeXBlIiwicnR4Q2FwYWJpbGl0eU1hdGNoZXMiLCJsUnR4IiwiclJ0eCIsImxDb2RlY3MiLCJyQ29kZWNzIiwibENvZGVjIiwicGFyYW1ldGVycyIsImFwdCIsInJDb2RlYyIsIm5hbWUiLCJ0b0xvd2VyQ2FzZSIsImNsb2NrUmF0ZSIsIm51bUNoYW5uZWxzIiwiTWF0aCIsIm1pbiIsInJ0Y3BGZWVkYmFjayIsImZiIiwiaiIsInBhcmFtZXRlciIsImxIZWFkZXJFeHRlbnNpb24iLCJySGVhZGVyRXh0ZW5zaW9uIiwidXJpIiwiaXNBY3Rpb25BbGxvd2VkSW5TaWduYWxpbmdTdGF0ZSIsImFjdGlvbiIsInNpZ25hbGluZ1N0YXRlIiwib2ZmZXIiLCJhbnN3ZXIiLCJtYXliZUFkZENhbmRpZGF0ZSIsImljZVRyYW5zcG9ydCIsImFscmVhZHlBZGRlZCIsImdldFJlbW90ZUNhbmRpZGF0ZXMiLCJmaW5kIiwicmVtb3RlQ2FuZGlkYXRlIiwiZm91bmRhdGlvbiIsImlwIiwicG9ydCIsInByaW9yaXR5IiwicHJvdG9jb2wiLCJhZGRSZW1vdGVDYW5kaWRhdGUiLCJtYWtlRXJyb3IiLCJkZXNjcmlwdGlvbiIsIk5vdFN1cHBvcnRlZEVycm9yIiwiSW52YWxpZFN0YXRlRXJyb3IiLCJJbnZhbGlkQWNjZXNzRXJyb3IiLCJUeXBlRXJyb3IiLCJ1bmRlZmluZWQiLCJPcGVyYXRpb25FcnJvciIsImFkZFRyYWNrVG9TdHJlYW1BbmRGaXJlRXZlbnQiLCJhZGRUcmFjayIsImRpc3BhdGNoRXZlbnQiLCJNZWRpYVN0cmVhbVRyYWNrRXZlbnQiLCJyZW1vdmVUcmFja0Zyb21TdHJlYW1BbmRGaXJlRXZlbnQiLCJyZW1vdmVUcmFjayIsImZpcmVBZGRUcmFjayIsInBjIiwicmVjZWl2ZXIiLCJzdHJlYW1zIiwidHJhY2tFdmVudCIsIkV2ZW50IiwiX2Rpc3BhdGNoRXZlbnQiLCJfZXZlbnRUYXJnZXQiLCJkb2N1bWVudCIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJtZXRob2QiLCJiaW5kIiwiY2FuVHJpY2tsZUljZUNhbmRpZGF0ZXMiLCJuZWVkTmVnb3RpYXRpb24iLCJsb2NhbFN0cmVhbXMiLCJyZW1vdGVTdHJlYW1zIiwiaWNlQ29ubmVjdGlvblN0YXRlIiwiY29ubmVjdGlvblN0YXRlIiwiaWNlR2F0aGVyaW5nU3RhdGUiLCJ1c2luZ0J1bmRsZSIsImJ1bmRsZVBvbGljeSIsInJ0Y3BNdXhQb2xpY3kiLCJpY2VUcmFuc3BvcnRQb2xpY3kiLCJfaWNlR2F0aGVyZXJzIiwiaWNlQ2FuZGlkYXRlUG9vbFNpemUiLCJSVENJY2VHYXRoZXJlciIsImdhdGhlclBvbGljeSIsIl9jb25maWciLCJ0cmFuc2NlaXZlcnMiLCJfc2RwU2Vzc2lvbklkIiwiZ2VuZXJhdGVTZXNzaW9uSWQiLCJfc2RwU2Vzc2lvblZlcnNpb24iLCJfZHRsc1JvbGUiLCJfaXNDbG9zZWQiLCJwcm90b3R5cGUiLCJvbnRyYWNrIiwib25yZW1vdmVzdHJlYW0iLCJvbnNpZ25hbGluZ3N0YXRlY2hhbmdlIiwib25pY2Vjb25uZWN0aW9uc3RhdGVjaGFuZ2UiLCJvbmNvbm5lY3Rpb25zdGF0ZWNoYW5nZSIsIm9uaWNlZ2F0aGVyaW5nc3RhdGVjaGFuZ2UiLCJvbmRhdGFjaGFubmVsIiwiX2VtaXRHYXRoZXJpbmdTdGF0ZUNoYW5nZSIsImdldENvbmZpZ3VyYXRpb24iLCJnZXRMb2NhbFN0cmVhbXMiLCJnZXRSZW1vdGVTdHJlYW1zIiwiX2NyZWF0ZVRyYW5zY2VpdmVyIiwiZG9Ob3RBZGQiLCJoYXNCdW5kbGVUcmFuc3BvcnQiLCJyZWN2RW5jb2RpbmdQYXJhbWV0ZXJzIiwiYXNzb2NpYXRlZFJlbW90ZU1lZGlhU3RyZWFtcyIsIndhbnRSZWNlaXZlIiwidHJhbnNwb3J0cyIsIl9jcmVhdGVJY2VBbmREdGxzVHJhbnNwb3J0cyIsImFscmVhZHlFeGlzdHMiLCJfbWF5YmVGaXJlTmVnb3RpYXRpb25OZWVkZWQiLCJSVENSdHBTZW5kZXIiLCJhZGRTdHJlYW0iLCJnZXRUcmFja3MiLCJjbG9uZWRTdHJlYW0iLCJjbG9uZSIsImlkeCIsImNsb25lZFRyYWNrIiwiYWRkRXZlbnRMaXN0ZW5lciIsImVuYWJsZWQiLCJzZW5kZXIiLCJzdG9wIiwibWFwIiwic3BsaWNlIiwicmVtb3ZlU3RyZWFtIiwiZ2V0U2VuZGVycyIsImdldFJlY2VpdmVycyIsIl9jcmVhdGVJY2VHYXRoZXJlciIsInNkcE1MaW5lSW5kZXgiLCJzaGlmdCIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJ3cml0YWJsZSIsImJ1ZmZlcmVkQ2FuZGlkYXRlRXZlbnRzIiwiYnVmZmVyQ2FuZGlkYXRlcyIsImVuZCIsImtleXMiLCJfZ2F0aGVyIiwib25sb2NhbGNhbmRpZGF0ZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJldnQiLCJzZHBNaWQiLCJjYW5kIiwiY29tcG9uZW50IiwidWZyYWciLCJ1c2VybmFtZUZyYWdtZW50Iiwic2VyaWFsaXplZENhbmRpZGF0ZSIsIndyaXRlQ2FuZGlkYXRlIiwicGFyc2VDYW5kaWRhdGUiLCJ0b0pTT04iLCJzZWN0aW9ucyIsImdldE1lZGlhU2VjdGlvbnMiLCJnZXREZXNjcmlwdGlvbiIsImpvaW4iLCJjb21wbGV0ZSIsImV2ZXJ5IiwiUlRDSWNlVHJhbnNwb3J0Iiwib25pY2VzdGF0ZWNoYW5nZSIsIl91cGRhdGVJY2VDb25uZWN0aW9uU3RhdGUiLCJfdXBkYXRlQ29ubmVjdGlvblN0YXRlIiwiUlRDRHRsc1RyYW5zcG9ydCIsIm9uZHRsc3N0YXRlY2hhbmdlIiwiX2Rpc3Bvc2VJY2VBbmREdGxzVHJhbnNwb3J0cyIsIl90cmFuc2NlaXZlIiwicmVjdiIsInBhcmFtcyIsImVuY29kaW5ncyIsInJ0Y3AiLCJjbmFtZSIsImNvbXBvdW5kIiwicnRjcFBhcmFtZXRlcnMiLCJwIiwicmVjZWl2ZSIsInNlc3Npb25wYXJ0Iiwic3BsaXRTZWN0aW9ucyIsIm1lZGlhU2VjdGlvbiIsInBhcnNlUnRwUGFyYW1ldGVycyIsImlzSWNlTGl0ZSIsIm1hdGNoUHJlZml4IiwicmVqZWN0ZWQiLCJpc1JlamVjdGVkIiwicmVtb3RlSWNlUGFyYW1ldGVycyIsImdldEljZVBhcmFtZXRlcnMiLCJyZW1vdGVEdGxzUGFyYW1ldGVycyIsImdldER0bHNQYXJhbWV0ZXJzIiwicm9sZSIsInN0YXJ0IiwiX3VwZGF0ZVNpZ25hbGluZ1N0YXRlIiwicmVjZWl2ZXJMaXN0IiwiaWNlT3B0aW9ucyIsInN1YnN0ciIsInNwbGl0IiwibGluZXMiLCJzcGxpdExpbmVzIiwiZ2V0S2luZCIsImRpcmVjdGlvbiIsImdldERpcmVjdGlvbiIsInJlbW90ZU1zaWQiLCJwYXJzZU1zaWQiLCJnZXRNaWQiLCJnZW5lcmF0ZUlkZW50aWZpZXIiLCJwYXJzZVJ0cEVuY29kaW5nUGFyYW1ldGVycyIsInBhcnNlUnRjcFBhcmFtZXRlcnMiLCJpc0NvbXBsZXRlIiwiY2FuZHMiLCJzZXRUcmFuc3BvcnQiLCJzZXRSZW1vdGVDYW5kaWRhdGVzIiwiUlRDUnRwUmVjZWl2ZXIiLCJnZXRDYXBhYmlsaXRpZXMiLCJjb2RlYyIsImlzTmV3VHJhY2siLCJNZWRpYVN0cmVhbSIsImdldCIsIm5hdGl2ZVRyYWNrIiwic2lkIiwiaXRlbSIsIm5ld1N0YXRlIiwic3RhdGVzIiwiY2xvc2VkIiwiY2hlY2tpbmciLCJjb25uZWN0ZWQiLCJjb21wbGV0ZWQiLCJkaXNjb25uZWN0ZWQiLCJmYWlsZWQiLCJjb25uZWN0aW5nIiwibnVtQXVkaW9UcmFja3MiLCJudW1WaWRlb1RyYWNrcyIsIm9mZmVyT3B0aW9ucyIsImFyZ3VtZW50cyIsIm1hbmRhdG9yeSIsIm9wdGlvbmFsIiwib2ZmZXJUb1JlY2VpdmVBdWRpbyIsIm9mZmVyVG9SZWNlaXZlVmlkZW8iLCJ3cml0ZVNlc3Npb25Cb2lsZXJwbGF0ZSIsInJlbW90ZUNvZGVjIiwiaGRyRXh0IiwicmVtb3RlRXh0ZW5zaW9ucyIsInJIZHJFeHQiLCJnZXRMb2NhbENhbmRpZGF0ZXMiLCJtZWRpYVNlY3Rpb25zSW5PZmZlciIsImxvY2FsVHJhY2siLCJnZXRBdWRpb1RyYWNrcyIsImdldFZpZGVvVHJhY2tzIiwiaGFzUnR4IiwiYyIsInJlZHVjZWRTaXplIiwiY2FuZGlkYXRlU3RyaW5nIiwidHJpbSIsInByb21pc2VzIiwiZml4U3RhdHNUeXBlIiwic3RhdCIsImluYm91bmRydHAiLCJvdXRib3VuZHJ0cCIsImNhbmRpZGF0ZXBhaXIiLCJsb2NhbGNhbmRpZGF0ZSIsInJlbW90ZWNhbmRpZGF0ZSIsInJlc3VsdHMiLCJNYXAiLCJhbGwiLCJyZXMiLCJyZXN1bHQiLCJzZXQiLCJtZXRob2RzIiwibmF0aXZlTWV0aG9kIiwiYXJncyIsImFwcGx5IiwicmFuZG9tIiwidG9TdHJpbmciLCJibG9iIiwibGluZSIsInBhcnRzIiwicGFydCIsImluZGV4IiwicHJlZml4Iiwic3Vic3RyaW5nIiwicmVsYXRlZEFkZHJlc3MiLCJyZWxhdGVkUG9ydCIsInRjcFR5cGUiLCJ0b1VwcGVyQ2FzZSIsInBhcnNlSWNlT3B0aW9ucyIsInBhcnNlUnRwTWFwIiwicGFyc2VkIiwid3JpdGVSdHBNYXAiLCJwYXJzZUV4dG1hcCIsIndyaXRlRXh0bWFwIiwiaGVhZGVyRXh0ZW5zaW9uIiwicHJlZmVycmVkSWQiLCJwYXJzZUZtdHAiLCJrdiIsIndyaXRlRm10cCIsInBhcmFtIiwicGFyc2VSdGNwRmIiLCJ3cml0ZVJ0Y3BGYiIsInBhcnNlU3NyY01lZGlhIiwic3AiLCJjb2xvbiIsImF0dHJpYnV0ZSIsInBhcnNlRmluZ2VycHJpbnQiLCJhbGdvcml0aG0iLCJmaW5nZXJwcmludHMiLCJzZXR1cFR5cGUiLCJmcCIsImNvbmNhdCIsImljZVBhcmFtZXRlcnMiLCJwYXNzd29yZCIsIm1saW5lIiwicnRwbWFwbGluZSIsImZtdHBzIiwibWF4cHRpbWUiLCJleHRlbnNpb24iLCJlbmNvZGluZ1BhcmFtZXRlcnMiLCJoYXNSZWQiLCJoYXNVbHBmZWMiLCJzc3JjcyIsInByaW1hcnlTc3JjIiwic2Vjb25kYXJ5U3NyYyIsImZsb3dzIiwiZW5jUGFyYW0iLCJjb2RlY1BheWxvYWRUeXBlIiwiZmVjIiwibWVjaGFuaXNtIiwiYmFuZHdpZHRoIiwibWF4Qml0cmF0ZSIsInJlbW90ZVNzcmMiLCJvYmoiLCJyc2l6ZSIsIm11eCIsInNwZWMiLCJwbGFuQiIsInNlc3NJZCIsInNlc3NWZXIiLCJzZXNzaW9uSWQiLCJ2ZXJzaW9uIiwicGFyc2VNTGluZSIsImZtdCIsInBhcnNlT0xpbmUiLCJ1c2VybmFtZSIsInNlc3Npb25WZXJzaW9uIiwibmV0VHlwZSIsImFkZHJlc3NUeXBlIiwiYWRkcmVzcyIsImdsb2JhbCIsImFkYXB0ZXJGYWN0b3J5Iiwic2VsZiIsInV0aWxzIiwiZGVwZW5kZW5jaWVzIiwib3B0cyIsIm9wdGlvbnMiLCJzaGltQ2hyb21lIiwic2hpbUZpcmVmb3giLCJzaGltRWRnZSIsInNoaW1TYWZhcmkiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsImxvZ2dpbmciLCJicm93c2VyRGV0YWlscyIsImRldGVjdEJyb3dzZXIiLCJjaHJvbWVTaGltIiwiZWRnZVNoaW0iLCJmaXJlZm94U2hpbSIsInNhZmFyaVNoaW0iLCJjb21tb25TaGltIiwiYWRhcHRlciIsImV4dHJhY3RWZXJzaW9uIiwiZGlzYWJsZUxvZyIsImRpc2FibGVXYXJuaW5ncyIsImJyb3dzZXIiLCJzaGltUGVlckNvbm5lY3Rpb24iLCJicm93c2VyU2hpbSIsInNoaW1DcmVhdGVPYmplY3RVUkwiLCJzaGltR2V0VXNlck1lZGlhIiwic2hpbU1lZGlhU3RyZWFtIiwic2hpbVNvdXJjZU9iamVjdCIsInNoaW1PblRyYWNrIiwic2hpbUFkZFRyYWNrUmVtb3ZlVHJhY2siLCJzaGltR2V0U2VuZGVyc1dpdGhEdG1mIiwic2hpbVJUQ0ljZUNhbmRpZGF0ZSIsInNoaW1NYXhNZXNzYWdlU2l6ZSIsInNoaW1TZW5kVGhyb3dUeXBlRXJyb3IiLCJzaGltUmVtb3ZlU3RyZWFtIiwic2hpbVJlcGxhY2VUcmFjayIsInNoaW1SVENJY2VTZXJ2ZXJVcmxzIiwic2hpbUNhbGxiYWNrc0FQSSIsInNoaW1Mb2NhbFN0cmVhbXNBUEkiLCJzaGltUmVtb3RlU3RyZWFtc0FQSSIsInNoaW1UcmFja0V2ZW50VHJhbnNjZWl2ZXIiLCJzaGltQ3JlYXRlT2ZmZXJMZWdhY3kiLCJ3ZWJraXRNZWRpYVN0cmVhbSIsIl9vbnRyYWNrIiwib3JpZ1NldFJlbW90ZURlc2NyaXB0aW9uIiwiX29udHJhY2twb2x5IiwidGUiLCJ3cmFwUGVlckNvbm5lY3Rpb25FdmVudCIsInNoaW1TZW5kZXJXaXRoRHRtZiIsImR0bWYiLCJfZHRtZiIsImNyZWF0ZURUTUZTZW5kZXIiLCJfcGMiLCJfc2VuZGVycyIsIm9yaWdBZGRUcmFjayIsIm9yaWdSZW1vdmVUcmFjayIsIm9yaWdBZGRTdHJlYW0iLCJvcmlnUmVtb3ZlU3RyZWFtIiwib3JpZ0dldFNlbmRlcnMiLCJzZW5kZXJzIiwiVVJMIiwiSFRNTE1lZGlhRWxlbWVudCIsIl9zcmNPYmplY3QiLCJzcmMiLCJyZXZva2VPYmplY3RVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJzaGltQWRkVHJhY2tSZW1vdmVUcmFja1dpdGhOYXRpdmUiLCJfc2hpbW1lZExvY2FsU3RyZWFtcyIsInN0cmVhbUlkIiwiRE9NRXhjZXB0aW9uIiwiZXhpc3RpbmdTZW5kZXJzIiwibmV3U2VuZGVycyIsIm5ld1NlbmRlciIsIm9yaWdHZXRMb2NhbFN0cmVhbXMiLCJuYXRpdmVTdHJlYW1zIiwiX3JldmVyc2VTdHJlYW1zIiwiX3N0cmVhbXMiLCJuZXdTdHJlYW0iLCJvbGRTdHJlYW0iLCJyZXBsYWNlSW50ZXJuYWxTdHJlYW1JZCIsImludGVybmFsSWQiLCJleHRlcm5hbFN0cmVhbSIsImludGVybmFsU3RyZWFtIiwicmVwbGFjZSIsIlJlZ0V4cCIsInJlcGxhY2VFeHRlcm5hbFN0cmVhbUlkIiwiaXNMZWdhY3lDYWxsIiwib3JpZ1NldExvY2FsRGVzY3JpcHRpb24iLCJvcmlnTG9jYWxEZXNjcmlwdGlvbiIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImlzTG9jYWwiLCJzdHJlYW1pZCIsImhhc1RyYWNrIiwid2Via2l0UlRDUGVlckNvbm5lY3Rpb24iLCJwY0NvbmZpZyIsInBjQ29uc3RyYWludHMiLCJpY2VUcmFuc3BvcnRzIiwiZ2VuZXJhdGVDZXJ0aWZpY2F0ZSIsIk9yaWdQZWVyQ29ubmVjdGlvbiIsIm5ld0ljZVNlcnZlcnMiLCJkZXByZWNhdGVkIiwib3JpZ0dldFN0YXRzIiwic2VsZWN0b3IiLCJzdWNjZXNzQ2FsbGJhY2siLCJmaXhDaHJvbWVTdGF0c18iLCJyZXNwb25zZSIsInN0YW5kYXJkUmVwb3J0IiwicmVwb3J0cyIsInJlcG9ydCIsInN0YW5kYXJkU3RhdHMiLCJ0aW1lc3RhbXAiLCJuYW1lcyIsIm1ha2VNYXBTdGF0cyIsInN1Y2Nlc3NDYWxsYmFja1dyYXBwZXJfIiwicHJvbWlzZSIsIm5hdGl2ZUFkZEljZUNhbmRpZGF0ZSIsIm5hdmlnYXRvciIsImNvbnN0cmFpbnRzVG9DaHJvbWVfIiwiY2MiLCJpZGVhbCIsImV4YWN0IiwibWF4Iiwib2xkbmFtZV8iLCJjaGFyQXQiLCJvYyIsIm1peCIsImFkdmFuY2VkIiwic2hpbUNvbnN0cmFpbnRzXyIsImNvbnN0cmFpbnRzIiwiZnVuYyIsImF1ZGlvIiwicmVtYXAiLCJiIiwidmlkZW8iLCJmYWNlIiwiZmFjaW5nTW9kZSIsImdldFN1cHBvcnRlZEZhY2luZ01vZGVMaWVzIiwibWVkaWFEZXZpY2VzIiwiZ2V0U3VwcG9ydGVkQ29uc3RyYWludHMiLCJtYXRjaGVzIiwiZW51bWVyYXRlRGV2aWNlcyIsImRldmljZXMiLCJkIiwiZGV2Iiwic29tZSIsIm1hdGNoIiwibGFiZWwiLCJkZXZpY2VJZCIsInNoaW1FcnJvcl8iLCJQZXJtaXNzaW9uRGVuaWVkRXJyb3IiLCJQZXJtaXNzaW9uRGlzbWlzc2VkRXJyb3IiLCJEZXZpY2VzTm90Rm91bmRFcnJvciIsIkNvbnN0cmFpbnROb3RTYXRpc2ZpZWRFcnJvciIsIlRyYWNrU3RhcnRFcnJvciIsIk1lZGlhRGV2aWNlRmFpbGVkRHVlVG9TaHV0ZG93biIsIk1lZGlhRGV2aWNlS2lsbFN3aXRjaE9uIiwiVGFiQ2FwdHVyZUVycm9yIiwiU2NyZWVuQ2FwdHVyZUVycm9yIiwiRGV2aWNlQ2FwdHVyZUVycm9yIiwiY29uc3RyYWludCIsImNvbnN0cmFpbnROYW1lIiwiZ2V0VXNlck1lZGlhXyIsIm9uU3VjY2VzcyIsIm9uRXJyb3IiLCJ3ZWJraXRHZXRVc2VyTWVkaWEiLCJnZXRVc2VyTWVkaWEiLCJnZXRVc2VyTWVkaWFQcm9taXNlXyIsImtpbmRzIiwiTWVkaWFTdHJlYW1UcmFjayIsImdldFNvdXJjZXMiLCJkZXZpY2UiLCJncm91cElkIiwiZWNob0NhbmNlbGxhdGlvbiIsImZyYW1lUmF0ZSIsImhlaWdodCIsIndpZHRoIiwib3JpZ0dldFVzZXJNZWRpYSIsImNzIiwiTmF0aXZlUlRDSWNlQ2FuZGlkYXRlIiwibmF0aXZlQ2FuZGlkYXRlIiwicGFyc2VkQ2FuZGlkYXRlIiwiYXVnbWVudGVkQ2FuZGlkYXRlIiwibmF0aXZlQ3JlYXRlT2JqZWN0VVJMIiwibmF0aXZlUmV2b2tlT2JqZWN0VVJMIiwibmV3SWQiLCJkc2MiLCJuYXRpdmVTZXRBdHRyaWJ1dGUiLCJzZXRBdHRyaWJ1dGUiLCJSVENTY3RwVHJhbnNwb3J0IiwiX3NjdHAiLCJzY3RwSW5EZXNjcmlwdGlvbiIsIm1MaW5lIiwiZ2V0UmVtb3RlRmlyZWZveFZlcnNpb24iLCJnZXRDYW5TZW5kTWF4TWVzc2FnZVNpemUiLCJyZW1vdGVJc0ZpcmVmb3giLCJjYW5TZW5kTWF4TWVzc2FnZVNpemUiLCJnZXRNYXhNZXNzYWdlU2l6ZSIsIm1heE1lc3NhZ2VTaXplIiwiaXNGaXJlZm94IiwiY2FuU2VuZE1NUyIsInJlbW90ZU1NUyIsIk51bWJlciIsIlBPU0lUSVZFX0lORklOSVRZIiwic2N0cCIsIm9yaWdDcmVhdGVEYXRhQ2hhbm5lbCIsImNyZWF0ZURhdGFDaGFubmVsIiwiZGF0YUNoYW5uZWwiLCJvcmlnRGF0YUNoYW5uZWxTZW5kIiwiZGMiLCJzaXplIiwiYnl0ZUxlbmd0aCIsInNoaW1SVENQZWVyQ29ubmVjdGlvbiIsIm9yaWdNU1RFbmFibGVkIiwiZXYiLCJSVENEdG1mU2VuZGVyIiwiUlRDRFRNRlNlbmRlciIsInJlcGxhY2VUcmFjayIsInNldFRyYWNrIiwiUlRDVHJhY2tFdmVudCIsIm1velNyY09iamVjdCIsIm1velJUQ1BlZXJDb25uZWN0aW9uIiwibmV3U2VydmVyIiwiY3JlZGVudGlhbCIsIm1velJUQ1Nlc3Npb25EZXNjcmlwdGlvbiIsIm1velJUQ0ljZUNhbmRpZGF0ZSIsIm1vZGVyblN0YXRzVHlwZXMiLCJuYXRpdmVHZXRTdGF0cyIsIm9uU3VjYyIsIm9uRXJyIiwiSW50ZXJuYWxFcnJvciIsIlNlY3VyaXR5RXJyb3IiLCJjb25zdHJhaW50c1RvRkYzN18iLCJtb3pHZXRVc2VyTWVkaWEiLCJpbmZvcyIsIm9yZ0VudW1lcmF0ZURldmljZXMiLCJuYXRpdmVHZXRVc2VyTWVkaWEiLCJnZXRTZXR0aW5ncyIsIm5hdGl2ZUdldFNldHRpbmdzIiwiYXBwbHlDb25zdHJhaW50cyIsIm5hdGl2ZUFwcGx5Q29uc3RyYWludHMiLCJfbG9jYWxTdHJlYW1zIiwiZ2V0U3RyZWFtQnlJZCIsIl9yZW1vdGVTdHJlYW1zIiwiX2FkZFRyYWNrIiwidHJhY2tzIiwiX29uYWRkc3RyZWFtIiwiX29uYWRkc3RyZWFtcG9seSIsImZhaWx1cmVDYWxsYmFjayIsIndpdGhDYWxsYmFjayIsImNiIiwiZXJyY2IiLCJSVENUcmFuc2NlaXZlciIsIm9yaWdDcmVhdGVPZmZlciIsImF1ZGlvVHJhbnNjZWl2ZXIiLCJnZXRUcmFuc2NlaXZlcnMiLCJzZXREaXJlY3Rpb24iLCJhZGRUcmFuc2NlaXZlciIsInZpZGVvVHJhbnNjZWl2ZXIiLCJsb2dEaXNhYmxlZF8iLCJkZXByZWNhdGlvbldhcm5pbmdzXyIsInVhc3RyaW5nIiwiZXhwciIsInBvcyIsImV2ZW50TmFtZVRvV3JhcCIsIndyYXBwZXIiLCJwcm90byIsIm5hdGl2ZUFkZEV2ZW50TGlzdGVuZXIiLCJuYXRpdmVFdmVudE5hbWUiLCJ3cmFwcGVkQ2FsbGJhY2siLCJfZXZlbnRNYXAiLCJuYXRpdmVSZW1vdmVFdmVudExpc3RlbmVyIiwidW53cmFwcGVkQ2IiLCJib29sIiwib2xkTWV0aG9kIiwibmV3TWV0aG9kIiwidXNlckFnZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBRUE7Ozs7OztBQU1BLElBQU1BLFNBQVMsU0FBVEEsTUFBUyxDQUFTQyxTQUFULEVBQW9CQyxZQUFwQixFQUFpQzs7QUFFNUMsUUFBSUMsZUFBZSwwQkFBYUYsU0FBYixFQUF3QkcsMEJBQXhCLENBQW5CO0FBQ0EsUUFBSUMsVUFBVUYsYUFBYUcsTUFBYixFQUFkOztBQUVBLFFBQUlDLGVBQWUsSUFBbkI7QUFDQSxRQUFJQyxPQUFPLEVBQVg7QUFBQSxRQUFlQyxnQkFBaUIsRUFBaEM7QUFB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aUJBQVAsSUFDUHFqQixVQUFVK0osU0FBVixDQUFvQmxJLEtBQXBCLENBQTBCLHNCQUExQixDQURHLEVBQ2dEO0FBQUU7QUFDdkR0TyxtQkFBTzBHLE9BQVAsR0FBaUIsUUFBakI7QUFDQTFHLG1CQUFPd0UsT0FBUCxHQUFpQitCLGVBQWVrRyxVQUFVK0osU0FBekIsRUFDYixzQkFEYSxFQUNXLENBRFgsQ0FBakI7QUFFRCxXQUxNLE1BS0E7QUFBRTtBQUNQeFcsbUJBQU8wRyxPQUFQLEdBQWlCLDBCQUFqQjtBQUNBLG1CQUFPMUcsTUFBUDtBQUNEOztBQUVELGlCQUFPQSxNQUFQO0FBQ0Q7QUE5RmMsT0FBakI7QUFpR0MsS0FoTHFCLEVBZ0xwQixFQWhMb0IsQ0E5cEpveEIsRUFBM2IsRUE4MEp4VyxFQTkwSndXLEVBODBKclcsQ0FBQyxDQUFELENBOTBKcVcsRUE4MEpoVyxDQTkwSmdXLENBQVA7QUErMEp2VyxDQS8wSkQsRSIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLldlYlJUQ1Byb3ZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiAxMS4uXHJcbiAqL1xyXG5pbXBvcnQgTWVkaWFNYW5hZ2VyIGZyb20gXCJhcGkvbWVkaWEvTWFuYWdlclwiO1xyXG5pbXBvcnQgUHJvdmlkZXIgZnJvbSBcImFwaS9wcm92aWRlci9odG1sNS9Qcm92aWRlclwiO1xyXG5pbXBvcnQgV2ViUlRDTG9hZGVyIGZyb20gXCJhcGkvcHJvdmlkZXIvaHRtbDUvV2ViUlRDTG9hZGVyXCI7XHJcbmltcG9ydCB7aXNXZWJSVEN9IGZyb20gXCJ1dGlscy92YWxpZGF0b3JcIjtcclxuaW1wb3J0IHtFUlJPUiwgU1RBVEVfRVJST1IsIFBST1ZJREVSX1dFQlJUQ30gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICB3ZWJydGMgcHJvdmlkZXIgZXh0ZW5kZWQgY29yZS5cclxuICogQHBhcmFtICAgZWxlbWVudCB2aWRlbyBlbGVtZW50LlxyXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgICAgY29uZmlnLlxyXG4gKiAqL1xyXG5cclxuY29uc3QgV2ViUlRDID0gZnVuY3Rpb24oY29udGFpbmVyLCBwbGF5ZXJDb25maWcpe1xyXG5cclxuICAgIGxldCBtZWRpYU1hbmFnZXIgPSBNZWRpYU1hbmFnZXIoY29udGFpbmVyLCBQUk9WSURFUl9XRUJSVEMpO1xyXG4gICAgbGV0IGVsZW1lbnQgPSBtZWRpYU1hbmFnZXIuY3JlYXRlKCk7XHJcblxyXG4gICAgbGV0IHdlYnJ0Y0xvYWRlciA9IG51bGw7XHJcbiAgICBsZXQgdGhhdCA9IHt9LCBzdXBlcl9kZXN0cm95ICA9IFwiXCIsIGxpc3RlbmVyID0gXCJcIjtcclxuXHJcbiAgICBsZXQgZXJyb3JIYW5kbGVyID0gZnVuY3Rpb24oZXJyb3Ipe1xyXG4gICAgICAgIHRoYXQuc2V0U3RhdGUoU1RBVEVfRVJST1IpO1xyXG4gICAgICAgIHRoYXQucGF1c2UoKTtcclxuICAgICAgICB0aGF0LnRyaWdnZXIoRVJST1IsIGVycm9yICk7XHJcbiAgICB9O1xyXG4gICAgY29uc3Qgb25CZWZvcmVMb2FkID0gKHNvdXJjZSkgPT4ge1xyXG4gICAgICAgIGlmKGlzV2ViUlRDKHNvdXJjZS5maWxlLCBzb3VyY2UudHlwZSkpe1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJXRUJSVEMgOiBvbkJlZm9yZUxvYWQgOiBcIiwgc291cmNlKTtcclxuICAgICAgICAgICAgaWYod2VicnRjTG9hZGVyKXtcclxuICAgICAgICAgICAgICAgIHdlYnJ0Y0xvYWRlci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB3ZWJydGNMb2FkZXIgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHdlYnJ0Y0xvYWRlciA9IFdlYlJUQ0xvYWRlcih0aGF0LCBzb3VyY2UuZmlsZSwgZXJyb3JIYW5kbGVyKTtcclxuICAgICAgICAgICAgd2VicnRjTG9hZGVyLmNvbm5lY3QoKS50aGVuKGZ1bmN0aW9uKHN0cmVhbSl7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnNyY09iamVjdCA9IHN0cmVhbTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQucGxheSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQgPSBQcm92aWRlcihQUk9WSURFUl9XRUJSVEMsIGVsZW1lbnQsIHBsYXllckNvbmZpZywgb25CZWZvcmVMb2FkKTtcclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldFQlJUQyBQUk9WSURFUiBMT0FERUQuXCIpO1xyXG4gICAgc3VwZXJfZGVzdHJveSA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTtcclxuXHJcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcclxuICAgICAgICBpZih3ZWJydGNMb2FkZXIpe1xyXG4gICAgICAgICAgICB3ZWJydGNMb2FkZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB3ZWJydGNMb2FkZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtZWRpYU1hbmFnZXIuZGVzdHJveSgpO1xyXG5cclxuICAgICAgICBzdXBlcl9kZXN0cm95KCk7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiV0VCUlRDIDogIFBST1ZJREVSIERFU1RST1lFRC5cIik7XHJcblxyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFdlYlJUQztcclxuIiwiaW1wb3J0IGFkYXB0ZXIgZnJvbSAndXRpbHMvYWRhcHRlcic7XHJcbmltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XHJcbmltcG9ydCB7XHJcbiAgICBQTEFZRVJfV0VCUlRDX1dTX0VSUk9SLFxyXG4gICAgUExBWUVSX1dFQlJUQ19XU19DTE9TRUQsXHJcbiAgICBQTEFZRVJfV0VCUlRDX0FERF9JQ0VDQU5ESURBVEVfRVJST1IsXHJcbiAgICBQTEFZRVJfV0VCUlRDX1NFVF9SRU1PVEVfREVTQ19FUlJPUixcclxuICAgIFBMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUixcclxuICAgIFBMQVlFUl9XRUJSVENfU0VUX0xPQ0FMX0RFU0NfRVJST1IsXHJcbiAgICBQTEFZRVJfV0VCUlRDX05FVFdPUktfU0xPVyxcclxuICAgIE5FVFdPUktfVU5TVEFCTEVEXHJcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuXHJcblxyXG5jb25zdCBXZWJSVENMb2FkZXIgPSBmdW5jdGlvbihwcm92aWRlciwgdXJsLCBlcnJvckNhbGxiYWNrKXtcclxuICAgIHZhciB1cmwgPSB1cmw7XHJcbiAgICBsZXQgd3MgPSBcIlwiO1xyXG4gICAgbGV0IHBlZXJDb25uZWN0aW9uID0gXCJcIjtcclxuICAgIGxldCBzdGF0aXN0aWNzVGltZXIgPSBcIlwiO1xyXG4gICAgY29uc3QgY29uZmlnID0ge1xyXG4gICAgICAgICdpY2VTZXJ2ZXJzJzogW3tcclxuICAgICAgICAgICAgJ3VybHMnOiAnc3R1bjpzdHVuLmwuZ29vZ2xlLmNvbToxOTMwMidcclxuICAgICAgICB9XVxyXG4gICAgfTtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIGxldCBteVNkcCA9IFwiXCI7XHJcblxyXG5cclxuICAgIChmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZXhpc3RpbmdIYW5kbGVyID0gd2luZG93Lm9uYmVmb3JldW5sb2FkO1xyXG4gICAgICAgIHdpbmRvdy5vbmJlZm9yZXVubG9hZCA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChleGlzdGluZ0hhbmRsZXIpe1xyXG4gICAgICAgICAgICAgICAgZXhpc3RpbmdIYW5kbGVyKGV2ZW50KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVGhpcyBjYWxscyBhdXRvIHdoZW4gYnJvd3NlciBjbG9zZWQuXCIpO1xyXG4gICAgICAgICAgICBjbG9zZVBlZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9KSgpO1xyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldlYlJUQ0xvYWRlciBjb25uZWN0aW5nLi4uXCIpO1xyXG5cclxuICAgICAgICBjb25zdCBvbkxvY2FsRGVzY3JpcHRpb24gPSBmdW5jdGlvbihpZCwgY29ubmVjdGlvbiwgZGVzYykge1xyXG4gICAgICAgICAgICBjb25uZWN0aW9uLnNldExvY2FsRGVzY3JpcHRpb24oZGVzYykudGhlbihmdW5jdGlvbiAoKXtcclxuICAgICAgICAgICAgICAgIC8vIG15IFNEUCBjcmVhdGVkLlxyXG4gICAgICAgICAgICAgICAgdmFyIGxvY2FsU0RQID0gY29ubmVjdGlvbi5sb2NhbERlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKCdMb2NhbCBTRFAnLCBsb2NhbFNEUCk7XHJcbiAgICAgICAgICAgICAgICBteVNkcCA9IGxvY2FsU0RQOyAgIC8vdGVzdCBjb2RlXHJcbiAgICAgICAgICAgICAgICAvLyBteSBzZHAgc2VuZCB0byBzZXJ2ZXIuXHJcbiAgICAgICAgICAgICAgICB3cy5zZW5kKEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZCA6IFwiYW5zd2VyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2RwOiBsb2NhbFNEUFxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICBjbG9zZVBlZXIoe2NvZGUgOiBQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SLCByZWFzb24gOiBcInNldExvY2FsRGVzY3JpcHRpb24gZXJyb3Igb2NjdXJyZWRcIiwgbWVzc2FnZSA6IFwic2V0TG9jYWxEZXNjcmlwdGlvbiBlcnJvciBvY2N1cnJlZFwiLCBlcnJvciA6IGVycm9yfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3Qpe1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJXZWJSVENMb2FkZXIgdXJsIDogXCIgKyB1cmwpO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgd3MgPSBuZXcgV2ViU29ja2V0KHVybCk7XHJcbiAgICAgICAgICAgICAgICB3cy5vbm9wZW4gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB3cy5zZW5kKEpTT04uc3RyaW5naWZ5KHtjb21tYW5kIDogXCJyZXF1ZXN0X29mZmVyXCJ9KSk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgd3Mub25tZXNzYWdlID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBKU09OLnBhcnNlKGUuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYobWVzc2FnZS5lcnJvcil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhtZXNzYWdlLmVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHtjb2RlIDogUExBWUVSX1dFQlJUQ19XU19FUlJPUiwgcmVhc29uIDogXCJ3ZWJzb2NrZXQgZXJyb3Igb2NjdXJlZFwiLCBtZXNzYWdlIDogXCJ3ZWJzb2NrZXQgZXJyb3Igb2NjdXJyZWRcIiwgZXJyb3IgOiBtZXNzYWdlfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKG1lc3NhZ2UubGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coJ0xpc3QgcmVjZWl2ZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIW1lc3NhZ2UuaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKCdJRCBtdXN0IGJlIG5vdCBudWxsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFwZWVyQ29ubmVjdGlvbil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uID0gbmV3IFJUQ1BlZXJDb25uZWN0aW9uKGNvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbi5vbmljZWNhbmRpZGF0ZSA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGUuY2FuZGlkYXRlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJXZWJSVENMb2FkZXIgc2VuZCBjYW5kaWRhdGUgdG8gc2VydmVyIDogXCIgKyBlLmNhbmRpZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3Muc2VuZChKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBtZXNzYWdlLmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kIDogXCJjYW5kaWRhdGVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuZGlkYXRlczogW2UuY2FuZGlkYXRlXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uLm9ubmVnb3RpYXRpb25uZWVkZWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uLmNyZWF0ZU9mZmVyKCkudGhlbihmdW5jdGlvbihkZXNjKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiY3JlYXRlT2ZmZXIgOiBzdWNjZXNzXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Mb2NhbERlc2NyaXB0aW9uKG1lc3NhZ2UuaWQsIHBlZXJDb25uZWN0aW9uLCBkZXNjKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHtjb2RlIDogUExBWUVSX1dFQlJUQ19DUkVBVEVfQU5TV0VSX0VSUk9SLCByZWFzb24gOiBcImNyZWF0ZU9mZmVyIGVycm9yIG9jY3VycmVkXCIsIG1lc3NhZ2UgOiBcImNyZWF0ZU9mZmVyIGVycm9yIG9jY3VycmVkXCIsIGVycm9yIDogZXJyb3J9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24ub25hZGRzdHJlYW0gPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJzdHJlYW0gcmVjZWl2ZWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3RyZWFtIHJlY2VpdmVkLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxvc3RQYWNrZXRzQXJyID0gW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xvdExlbmd0aCA9IDgsIC8vOCBzdGF0aXN0aWNzLiBldmVyeSAyIHNlY29uZHNcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2UGFja2V0c0xvc3QgPSAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF2ZzhMb3NzZXMgPSAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF2Z01vcmVUaGFuVGhyZXNob2xkQ291bnQgPSAwLCAgLy9JZiBhdmc4TG9zcyBtb3JlIHRoYW4gdGhyZXNob2xkLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocmVzaG9sZCA9IDIwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZXh0cmFjdExvc3NQYWNrZXRzT25OZXR3b3JrU3RhdHVzID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aXN0aWNzVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFwZWVyQ29ubmVjdGlvbil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24uZ2V0U3RhdHMoKS50aGVuKGZ1bmN0aW9uKHN0YXRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHN0YXRzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRzLmZvckVhY2goZnVuY3Rpb24oc3RhdGUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coc3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHN0YXRlLnR5cGUgPT09IFwiaW5ib3VuZC1ydHBcIiAmJiAhc3RhdGUuaXNSZW1vdGUgKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKHN0YXRlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vKHN0YXRlLnBhY2tldHNMb3N0IC0gcHJldlBhY2tldHNMb3N0KSBpcyByZWFsIGN1cnJlbnQgbG9zdC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9zdFBhY2tldHNBcnIucHVzaChwYXJzZUludChzdGF0ZS5wYWNrZXRzTG9zdCktcGFyc2VJbnQocHJldlBhY2tldHNMb3N0KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihsb3N0UGFja2V0c0Fyci5sZW5ndGggPiBzbG90TGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvc3RQYWNrZXRzQXJyID0gbG9zdFBhY2tldHNBcnIuc2xpY2UobG9zdFBhY2tldHNBcnIubGVuZ3RoIC0gc2xvdExlbmd0aCwgbG9zdFBhY2tldHNBcnIubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF2ZzhMb3NzZXMgPSBfLnJlZHVjZShsb3N0UGFja2V0c0FyciwgZnVuY3Rpb24obWVtbywgbnVtKXsgcmV0dXJuIG1lbW8gKyBudW07IH0sIDApIC8gc2xvdExlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhc3Q4IExPU1QgUEFDS0VUIEFWRyAgOiBcIisgKGF2ZzhMb3NzZXMpLCBzdGF0ZS5wYWNrZXRzTG9zdCAsIGxvc3RQYWNrZXRzQXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGF2ZzhMb3NzZXMgPiB0aHJlc2hvbGQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF2Z01vcmVUaGFuVGhyZXNob2xkQ291bnQgKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoYXZnTW9yZVRoYW5UaHJlc2hvbGRDb3VudCA9PT0gMyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIk5FVFdPUksgVU5TVEFCTEVEISEhIFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHN0YXRpc3RpY3NUaW1lcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoTkVUV09SS19VTlNUQUJMRUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF2Z01vcmVUaGFuVGhyZXNob2xkQ291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldlBhY2tldHNMb3N0ID0gc3RhdGUucGFja2V0c0xvc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHRyYWN0TG9zc1BhY2tldHNPbk5ldHdvcmtTdGF0dXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMjAwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4dHJhY3RMb3NzUGFja2V0c09uTmV0d29ya1N0YXR1cygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShlLnN0cmVhbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihtZXNzYWdlLnNkcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1NldCByZW1vdGUgZGVzY3JpcHRpb24gd2hlbiBJIHJlY2VpdmVkIHNkcCBmcm9tIHNlcnZlci5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24uc2V0UmVtb3RlRGVzY3JpcHRpb24obmV3IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbihtZXNzYWdlLnNkcCkpLnRoZW4oZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHBlZXJDb25uZWN0aW9uLnJlbW90ZURlc2NyaXB0aW9uLnR5cGUgPT09ICdvZmZlcicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIGNyZWF0ZXMgYW5zd2VyIHdoZW4gSSByZWNlaXZlZCBvZmZlciBmcm9tIHB1Ymxpc2hlci5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbi5jcmVhdGVBbnN3ZXIoKS50aGVuKGZ1bmN0aW9uKGRlc2Mpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJjcmVhdGVBbnN3ZXIgOiBzdWNjZXNzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkxvY2FsRGVzY3JpcHRpb24obWVzc2FnZS5pZCwgcGVlckNvbm5lY3Rpb24sIGRlc2MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHtjb2RlIDogUExBWUVSX1dFQlJUQ19DUkVBVEVfQU5TV0VSX0VSUk9SLCByZWFzb24gOiBcImNyZWF0ZUFuc3dlciBlcnJvciBvY2N1cnJlZFwiLCBtZXNzYWdlIDogXCJjcmVhdGVBbnN3ZXIgZXJyb3Igb2NjdXJyZWRcIiwgZXJyb3IgOiBlcnJvcn0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZVBlZXIoe2NvZGUgOiBQTEFZRVJfV0VCUlRDX1NFVF9SRU1PVEVfREVTQ19FUlJPUiwgcmVhc29uIDogXCJzZXRSZW1vdGVEZXNjcmlwdGlvbiBlcnJvciBvY2N1cnJlZFwiLCBtZXNzYWdlIDogXCJzZXRSZW1vdGVEZXNjcmlwdGlvbiBlcnJvciBvY2N1cnJlZFwiLCBlcnJvciA6IGVycm9yfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYobWVzc2FnZS5jYW5kaWRhdGVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgcmVjZWl2ZXMgSUNFIENhbmRpZGF0ZSBmcm9tIHNlcnZlci5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IG1lc3NhZ2UuY2FuZGlkYXRlcy5sZW5ndGg7IGkgKysgKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKG1lc3NhZ2UuY2FuZGlkYXRlc1tpXSAmJiBtZXNzYWdlLmNhbmRpZGF0ZXNbaV0uY2FuZGlkYXRlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uLmFkZEljZUNhbmRpZGF0ZShuZXcgUlRDSWNlQ2FuZGlkYXRlKG1lc3NhZ2UuY2FuZGlkYXRlc1tpXSkpLnRoZW4oZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiYWRkSWNlQ2FuZGlkYXRlIDogc3VjY2Vzc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcih7Y29kZSA6IFBMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUiwgcmVhc29uIDogXCJhZGRJY2VDYW5kaWRhdGUgZXJyb3Igb2NjdXJyZWRcIiwgbWVzc2FnZSA6IFwiYWRkSWNlQ2FuZGlkYXRlIGVycm9yIG9jY3VycmVkXCIsIGVycm9yIDogZXJyb3J9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgd3Mub25lcnJvciA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZVBlZXIoe2NvZGUgOiBQTEFZRVJfV0VCUlRDX1dTX0VSUk9SLCByZWFzb24gOiBcIndlYnNvY2tldCBlcnJvciBvY2N1cmVkXCIsIG1lc3NhZ2UgOiBcIndlYnNvY2tldCBlcnJvciBvY2N1cnJlZFwiLCBlcnJvciA6IGV9KTtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9Y2F0Y2goZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY2xvc2VQZWVyKHtjb2RlIDogUExBWUVSX1dFQlJUQ19XU19FUlJPUiwgcmVhc29uIDogXCJ3ZWJzb2NrZXQgZXJyb3Igb2NjdXJlZFwiLCBtZXNzYWdlIDogXCJ3ZWJzb2NrZXQgZXJyb3Igb2NjdXJyZWRcIiwgZXJyb3IgOiBlcnJvcn0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VQZWVyKGVycm9yKSB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKCdXZWJSVEMgTG9hZGVyIGNsb3NlUGVlYXIoKScpO1xyXG4gICAgICAgIGlmKCEhd3MpIHtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKCdDbG9zaW5nIHdlYnNvY2tldCBjb25uZWN0aW9uLi4uJyk7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIlNlbmQgU2lnbmFsaW5nIDogU3RvcC5cIik7XHJcbiAgICAgICAgICAgIHdzLnNlbmQoSlNPTi5zdHJpbmdpZnkoe2NvbW1hbmQgOiBcInN0b3BcIn0pKTtcclxuICAgICAgICAgICAgd3MuY2xvc2UoKTtcclxuICAgICAgICAgICAgd3MgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihwZWVyQ29ubmVjdGlvbikge1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coJ0Nsb3NpbmcgcGVlciBjb25uZWN0aW9uLi4uJyk7XHJcbiAgICAgICAgICAgIGlmKHN0YXRpc3RpY3NUaW1lcil7Y2xlYXJUaW1lb3V0KHN0YXRpc3RpY3NUaW1lcik7fVxyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbi5jbG9zZSgpO1xyXG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbiA9IG51bGw7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgIGVycm9yQ2FsbGJhY2soZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgdGhhdC5jb25uZWN0ID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBpbml0aWFsaXplKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT4ge1xyXG4gICAgICAgIGNsb3NlUGVlcigpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgV2ViUlRDTG9hZGVyO1xyXG4iLCIoZnVuY3Rpb24oZil7aWYodHlwZW9mIGV4cG9ydHM9PT1cIm9iamVjdFwiJiZ0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIil7bW9kdWxlLmV4cG9ydHM9ZigpfWVsc2UgaWYodHlwZW9mIGRlZmluZT09PVwiZnVuY3Rpb25cIiYmZGVmaW5lLmFtZCl7ZGVmaW5lKFtdLGYpfWVsc2V7dmFyIGc7aWYodHlwZW9mIHdpbmRvdyE9PVwidW5kZWZpbmVkXCIpe2c9d2luZG93fWVsc2UgaWYodHlwZW9mIGdsb2JhbCE9PVwidW5kZWZpbmVkXCIpe2c9Z2xvYmFsfWVsc2UgaWYodHlwZW9mIHNlbGYhPT1cInVuZGVmaW5lZFwiKXtnPXNlbGZ9ZWxzZXtnPXRoaXN9Zy5hZGFwdGVyID0gZigpfX0pKGZ1bmN0aW9uKCl7dmFyIGRlZmluZSxtb2R1bGUsZXhwb3J0cztyZXR1cm4gKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLypcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTcgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcbiAqICB0cmVlLlxuICovXG4gLyogZXNsaW50LWVudiBub2RlICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBTRFBVdGlscyA9IHJlcXVpcmUoJ3NkcCcpO1xuXG5mdW5jdGlvbiB3cml0ZU1lZGlhU2VjdGlvbih0cmFuc2NlaXZlciwgY2FwcywgdHlwZSwgc3RyZWFtLCBkdGxzUm9sZSkge1xuICB2YXIgc2RwID0gU0RQVXRpbHMud3JpdGVSdHBEZXNjcmlwdGlvbih0cmFuc2NlaXZlci5raW5kLCBjYXBzKTtcblxuICAvLyBNYXAgSUNFIHBhcmFtZXRlcnMgKHVmcmFnLCBwd2QpIHRvIFNEUC5cbiAgc2RwICs9IFNEUFV0aWxzLndyaXRlSWNlUGFyYW1ldGVycyhcbiAgICAgIHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyLmdldExvY2FsUGFyYW1ldGVycygpKTtcblxuICAvLyBNYXAgRFRMUyBwYXJhbWV0ZXJzIHRvIFNEUC5cbiAgc2RwICs9IFNEUFV0aWxzLndyaXRlRHRsc1BhcmFtZXRlcnMoXG4gICAgICB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0LmdldExvY2FsUGFyYW1ldGVycygpLFxuICAgICAgdHlwZSA9PT0gJ29mZmVyJyA/ICdhY3RwYXNzJyA6IGR0bHNSb2xlIHx8ICdhY3RpdmUnKTtcblxuICBzZHAgKz0gJ2E9bWlkOicgKyB0cmFuc2NlaXZlci5taWQgKyAnXFxyXFxuJztcblxuICBpZiAodHJhbnNjZWl2ZXIucnRwU2VuZGVyICYmIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyKSB7XG4gICAgc2RwICs9ICdhPXNlbmRyZWN2XFxyXFxuJztcbiAgfSBlbHNlIGlmICh0cmFuc2NlaXZlci5ydHBTZW5kZXIpIHtcbiAgICBzZHAgKz0gJ2E9c2VuZG9ubHlcXHJcXG4nO1xuICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyKSB7XG4gICAgc2RwICs9ICdhPXJlY3Zvbmx5XFxyXFxuJztcbiAgfSBlbHNlIHtcbiAgICBzZHAgKz0gJ2E9aW5hY3RpdmVcXHJcXG4nO1xuICB9XG5cbiAgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlcikge1xuICAgIHZhciB0cmFja0lkID0gdHJhbnNjZWl2ZXIucnRwU2VuZGVyLl9pbml0aWFsVHJhY2tJZCB8fFxuICAgICAgICB0cmFuc2NlaXZlci5ydHBTZW5kZXIudHJhY2suaWQ7XG4gICAgdHJhbnNjZWl2ZXIucnRwU2VuZGVyLl9pbml0aWFsVHJhY2tJZCA9IHRyYWNrSWQ7XG4gICAgLy8gc3BlYy5cbiAgICB2YXIgbXNpZCA9ICdtc2lkOicgKyAoc3RyZWFtID8gc3RyZWFtLmlkIDogJy0nKSArICcgJyArXG4gICAgICAgIHRyYWNrSWQgKyAnXFxyXFxuJztcbiAgICBzZHAgKz0gJ2E9JyArIG1zaWQ7XG4gICAgLy8gZm9yIENocm9tZS4gTGVnYWN5IHNob3VsZCBubyBsb25nZXIgYmUgcmVxdWlyZWQuXG4gICAgc2RwICs9ICdhPXNzcmM6JyArIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYyArXG4gICAgICAgICcgJyArIG1zaWQ7XG5cbiAgICAvLyBSVFhcbiAgICBpZiAodHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHgpIHtcbiAgICAgIHNkcCArPSAnYT1zc3JjOicgKyB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eC5zc3JjICtcbiAgICAgICAgICAnICcgKyBtc2lkO1xuICAgICAgc2RwICs9ICdhPXNzcmMtZ3JvdXA6RklEICcgK1xuICAgICAgICAgIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYyArICcgJyArXG4gICAgICAgICAgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHguc3NyYyArXG4gICAgICAgICAgJ1xcclxcbic7XG4gICAgfVxuICB9XG4gIC8vIEZJWE1FOiB0aGlzIHNob3VsZCBiZSB3cml0dGVuIGJ5IHdyaXRlUnRwRGVzY3JpcHRpb24uXG4gIHNkcCArPSAnYT1zc3JjOicgKyB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmMgK1xuICAgICAgJyBjbmFtZTonICsgU0RQVXRpbHMubG9jYWxDTmFtZSArICdcXHJcXG4nO1xuICBpZiAodHJhbnNjZWl2ZXIucnRwU2VuZGVyICYmIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4KSB7XG4gICAgc2RwICs9ICdhPXNzcmM6JyArIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4LnNzcmMgK1xuICAgICAgICAnIGNuYW1lOicgKyBTRFBVdGlscy5sb2NhbENOYW1lICsgJ1xcclxcbic7XG4gIH1cbiAgcmV0dXJuIHNkcDtcbn1cblxuLy8gRWRnZSBkb2VzIG5vdCBsaWtlXG4vLyAxKSBzdHVuOiBmaWx0ZXJlZCBhZnRlciAxNDM5MyB1bmxlc3MgP3RyYW5zcG9ydD11ZHAgaXMgcHJlc2VudFxuLy8gMikgdHVybjogdGhhdCBkb2VzIG5vdCBoYXZlIGFsbCBvZiB0dXJuOmhvc3Q6cG9ydD90cmFuc3BvcnQ9dWRwXG4vLyAzKSB0dXJuOiB3aXRoIGlwdjYgYWRkcmVzc2VzXG4vLyA0KSB0dXJuOiBvY2N1cnJpbmcgbXVsaXBsZSB0aW1lc1xuZnVuY3Rpb24gZmlsdGVySWNlU2VydmVycyhpY2VTZXJ2ZXJzLCBlZGdlVmVyc2lvbikge1xuICB2YXIgaGFzVHVybiA9IGZhbHNlO1xuICBpY2VTZXJ2ZXJzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShpY2VTZXJ2ZXJzKSk7XG4gIHJldHVybiBpY2VTZXJ2ZXJzLmZpbHRlcihmdW5jdGlvbihzZXJ2ZXIpIHtcbiAgICBpZiAoc2VydmVyICYmIChzZXJ2ZXIudXJscyB8fCBzZXJ2ZXIudXJsKSkge1xuICAgICAgdmFyIHVybHMgPSBzZXJ2ZXIudXJscyB8fCBzZXJ2ZXIudXJsO1xuICAgICAgaWYgKHNlcnZlci51cmwgJiYgIXNlcnZlci51cmxzKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignUlRDSWNlU2VydmVyLnVybCBpcyBkZXByZWNhdGVkISBVc2UgdXJscyBpbnN0ZWFkLicpO1xuICAgICAgfVxuICAgICAgdmFyIGlzU3RyaW5nID0gdHlwZW9mIHVybHMgPT09ICdzdHJpbmcnO1xuICAgICAgaWYgKGlzU3RyaW5nKSB7XG4gICAgICAgIHVybHMgPSBbdXJsc107XG4gICAgICB9XG4gICAgICB1cmxzID0gdXJscy5maWx0ZXIoZnVuY3Rpb24odXJsKSB7XG4gICAgICAgIHZhciB2YWxpZFR1cm4gPSB1cmwuaW5kZXhPZigndHVybjonKSA9PT0gMCAmJlxuICAgICAgICAgICAgdXJsLmluZGV4T2YoJ3RyYW5zcG9ydD11ZHAnKSAhPT0gLTEgJiZcbiAgICAgICAgICAgIHVybC5pbmRleE9mKCd0dXJuOlsnKSA9PT0gLTEgJiZcbiAgICAgICAgICAgICFoYXNUdXJuO1xuXG4gICAgICAgIGlmICh2YWxpZFR1cm4pIHtcbiAgICAgICAgICBoYXNUdXJuID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdXJsLmluZGV4T2YoJ3N0dW46JykgPT09IDAgJiYgZWRnZVZlcnNpb24gPj0gMTQzOTMgJiZcbiAgICAgICAgICAgIHVybC5pbmRleE9mKCc/dHJhbnNwb3J0PXVkcCcpID09PSAtMTtcbiAgICAgIH0pO1xuXG4gICAgICBkZWxldGUgc2VydmVyLnVybDtcbiAgICAgIHNlcnZlci51cmxzID0gaXNTdHJpbmcgPyB1cmxzWzBdIDogdXJscztcbiAgICAgIHJldHVybiAhIXVybHMubGVuZ3RoO1xuICAgIH1cbiAgfSk7XG59XG5cbi8vIERldGVybWluZXMgdGhlIGludGVyc2VjdGlvbiBvZiBsb2NhbCBhbmQgcmVtb3RlIGNhcGFiaWxpdGllcy5cbmZ1bmN0aW9uIGdldENvbW1vbkNhcGFiaWxpdGllcyhsb2NhbENhcGFiaWxpdGllcywgcmVtb3RlQ2FwYWJpbGl0aWVzKSB7XG4gIHZhciBjb21tb25DYXBhYmlsaXRpZXMgPSB7XG4gICAgY29kZWNzOiBbXSxcbiAgICBoZWFkZXJFeHRlbnNpb25zOiBbXSxcbiAgICBmZWNNZWNoYW5pc21zOiBbXVxuICB9O1xuXG4gIHZhciBmaW5kQ29kZWNCeVBheWxvYWRUeXBlID0gZnVuY3Rpb24ocHQsIGNvZGVjcykge1xuICAgIHB0ID0gcGFyc2VJbnQocHQsIDEwKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvZGVjcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGNvZGVjc1tpXS5wYXlsb2FkVHlwZSA9PT0gcHQgfHxcbiAgICAgICAgICBjb2RlY3NbaV0ucHJlZmVycmVkUGF5bG9hZFR5cGUgPT09IHB0KSB7XG4gICAgICAgIHJldHVybiBjb2RlY3NbaV07XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHZhciBydHhDYXBhYmlsaXR5TWF0Y2hlcyA9IGZ1bmN0aW9uKGxSdHgsIHJSdHgsIGxDb2RlY3MsIHJDb2RlY3MpIHtcbiAgICB2YXIgbENvZGVjID0gZmluZENvZGVjQnlQYXlsb2FkVHlwZShsUnR4LnBhcmFtZXRlcnMuYXB0LCBsQ29kZWNzKTtcbiAgICB2YXIgckNvZGVjID0gZmluZENvZGVjQnlQYXlsb2FkVHlwZShyUnR4LnBhcmFtZXRlcnMuYXB0LCByQ29kZWNzKTtcbiAgICByZXR1cm4gbENvZGVjICYmIHJDb2RlYyAmJlxuICAgICAgICBsQ29kZWMubmFtZS50b0xvd2VyQ2FzZSgpID09PSByQ29kZWMubmFtZS50b0xvd2VyQ2FzZSgpO1xuICB9O1xuXG4gIGxvY2FsQ2FwYWJpbGl0aWVzLmNvZGVjcy5mb3JFYWNoKGZ1bmN0aW9uKGxDb2RlYykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVtb3RlQ2FwYWJpbGl0aWVzLmNvZGVjcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHJDb2RlYyA9IHJlbW90ZUNhcGFiaWxpdGllcy5jb2RlY3NbaV07XG4gICAgICBpZiAobENvZGVjLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gckNvZGVjLm5hbWUudG9Mb3dlckNhc2UoKSAmJlxuICAgICAgICAgIGxDb2RlYy5jbG9ja1JhdGUgPT09IHJDb2RlYy5jbG9ja1JhdGUpIHtcbiAgICAgICAgaWYgKGxDb2RlYy5uYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdydHgnICYmXG4gICAgICAgICAgICBsQ29kZWMucGFyYW1ldGVycyAmJiByQ29kZWMucGFyYW1ldGVycy5hcHQpIHtcbiAgICAgICAgICAvLyBmb3IgUlRYIHdlIG5lZWQgdG8gZmluZCB0aGUgbG9jYWwgcnR4IHRoYXQgaGFzIGEgYXB0XG4gICAgICAgICAgLy8gd2hpY2ggcG9pbnRzIHRvIHRoZSBzYW1lIGxvY2FsIGNvZGVjIGFzIHRoZSByZW1vdGUgb25lLlxuICAgICAgICAgIGlmICghcnR4Q2FwYWJpbGl0eU1hdGNoZXMobENvZGVjLCByQ29kZWMsXG4gICAgICAgICAgICAgIGxvY2FsQ2FwYWJpbGl0aWVzLmNvZGVjcywgcmVtb3RlQ2FwYWJpbGl0aWVzLmNvZGVjcykpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByQ29kZWMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHJDb2RlYykpOyAvLyBkZWVwY29weVxuICAgICAgICAvLyBudW1iZXIgb2YgY2hhbm5lbHMgaXMgdGhlIGhpZ2hlc3QgY29tbW9uIG51bWJlciBvZiBjaGFubmVsc1xuICAgICAgICByQ29kZWMubnVtQ2hhbm5lbHMgPSBNYXRoLm1pbihsQ29kZWMubnVtQ2hhbm5lbHMsXG4gICAgICAgICAgICByQ29kZWMubnVtQ2hhbm5lbHMpO1xuICAgICAgICAvLyBwdXNoIHJDb2RlYyBzbyB3ZSByZXBseSB3aXRoIG9mZmVyZXIgcGF5bG9hZCB0eXBlXG4gICAgICAgIGNvbW1vbkNhcGFiaWxpdGllcy5jb2RlY3MucHVzaChyQ29kZWMpO1xuXG4gICAgICAgIC8vIGRldGVybWluZSBjb21tb24gZmVlZGJhY2sgbWVjaGFuaXNtc1xuICAgICAgICByQ29kZWMucnRjcEZlZWRiYWNrID0gckNvZGVjLnJ0Y3BGZWVkYmFjay5maWx0ZXIoZnVuY3Rpb24oZmIpIHtcbiAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGxDb2RlYy5ydGNwRmVlZGJhY2subGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGlmIChsQ29kZWMucnRjcEZlZWRiYWNrW2pdLnR5cGUgPT09IGZiLnR5cGUgJiZcbiAgICAgICAgICAgICAgICBsQ29kZWMucnRjcEZlZWRiYWNrW2pdLnBhcmFtZXRlciA9PT0gZmIucGFyYW1ldGVyKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBGSVhNRTogYWxzbyBuZWVkIHRvIGRldGVybWluZSAucGFyYW1ldGVyc1xuICAgICAgICAvLyAgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9vcGVucGVlci9vcnRjL2lzc3Vlcy81NjlcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBsb2NhbENhcGFiaWxpdGllcy5oZWFkZXJFeHRlbnNpb25zLmZvckVhY2goZnVuY3Rpb24obEhlYWRlckV4dGVuc2lvbikge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVtb3RlQ2FwYWJpbGl0aWVzLmhlYWRlckV4dGVuc2lvbnMubGVuZ3RoO1xuICAgICAgICAgaSsrKSB7XG4gICAgICB2YXIgckhlYWRlckV4dGVuc2lvbiA9IHJlbW90ZUNhcGFiaWxpdGllcy5oZWFkZXJFeHRlbnNpb25zW2ldO1xuICAgICAgaWYgKGxIZWFkZXJFeHRlbnNpb24udXJpID09PSBySGVhZGVyRXh0ZW5zaW9uLnVyaSkge1xuICAgICAgICBjb21tb25DYXBhYmlsaXRpZXMuaGVhZGVyRXh0ZW5zaW9ucy5wdXNoKHJIZWFkZXJFeHRlbnNpb24pO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIC8vIEZJWE1FOiBmZWNNZWNoYW5pc21zXG4gIHJldHVybiBjb21tb25DYXBhYmlsaXRpZXM7XG59XG5cbi8vIGlzIGFjdGlvbj1zZXRMb2NhbERlc2NyaXB0aW9uIHdpdGggdHlwZSBhbGxvd2VkIGluIHNpZ25hbGluZ1N0YXRlXG5mdW5jdGlvbiBpc0FjdGlvbkFsbG93ZWRJblNpZ25hbGluZ1N0YXRlKGFjdGlvbiwgdHlwZSwgc2lnbmFsaW5nU3RhdGUpIHtcbiAgcmV0dXJuIHtcbiAgICBvZmZlcjoge1xuICAgICAgc2V0TG9jYWxEZXNjcmlwdGlvbjogWydzdGFibGUnLCAnaGF2ZS1sb2NhbC1vZmZlciddLFxuICAgICAgc2V0UmVtb3RlRGVzY3JpcHRpb246IFsnc3RhYmxlJywgJ2hhdmUtcmVtb3RlLW9mZmVyJ11cbiAgICB9LFxuICAgIGFuc3dlcjoge1xuICAgICAgc2V0TG9jYWxEZXNjcmlwdGlvbjogWydoYXZlLXJlbW90ZS1vZmZlcicsICdoYXZlLWxvY2FsLXByYW5zd2VyJ10sXG4gICAgICBzZXRSZW1vdGVEZXNjcmlwdGlvbjogWydoYXZlLWxvY2FsLW9mZmVyJywgJ2hhdmUtcmVtb3RlLXByYW5zd2VyJ11cbiAgICB9XG4gIH1bdHlwZV1bYWN0aW9uXS5pbmRleE9mKHNpZ25hbGluZ1N0YXRlKSAhPT0gLTE7XG59XG5cbmZ1bmN0aW9uIG1heWJlQWRkQ2FuZGlkYXRlKGljZVRyYW5zcG9ydCwgY2FuZGlkYXRlKSB7XG4gIC8vIEVkZ2UncyBpbnRlcm5hbCByZXByZXNlbnRhdGlvbiBhZGRzIHNvbWUgZmllbGRzIHRoZXJlZm9yZVxuICAvLyBub3QgYWxsIGZpZWxk0ZUgYXJlIHRha2VuIGludG8gYWNjb3VudC5cbiAgdmFyIGFscmVhZHlBZGRlZCA9IGljZVRyYW5zcG9ydC5nZXRSZW1vdGVDYW5kaWRhdGVzKClcbiAgICAgIC5maW5kKGZ1bmN0aW9uKHJlbW90ZUNhbmRpZGF0ZSkge1xuICAgICAgICByZXR1cm4gY2FuZGlkYXRlLmZvdW5kYXRpb24gPT09IHJlbW90ZUNhbmRpZGF0ZS5mb3VuZGF0aW9uICYmXG4gICAgICAgICAgICBjYW5kaWRhdGUuaXAgPT09IHJlbW90ZUNhbmRpZGF0ZS5pcCAmJlxuICAgICAgICAgICAgY2FuZGlkYXRlLnBvcnQgPT09IHJlbW90ZUNhbmRpZGF0ZS5wb3J0ICYmXG4gICAgICAgICAgICBjYW5kaWRhdGUucHJpb3JpdHkgPT09IHJlbW90ZUNhbmRpZGF0ZS5wcmlvcml0eSAmJlxuICAgICAgICAgICAgY2FuZGlkYXRlLnByb3RvY29sID09PSByZW1vdGVDYW5kaWRhdGUucHJvdG9jb2wgJiZcbiAgICAgICAgICAgIGNhbmRpZGF0ZS50eXBlID09PSByZW1vdGVDYW5kaWRhdGUudHlwZTtcbiAgICAgIH0pO1xuICBpZiAoIWFscmVhZHlBZGRlZCkge1xuICAgIGljZVRyYW5zcG9ydC5hZGRSZW1vdGVDYW5kaWRhdGUoY2FuZGlkYXRlKTtcbiAgfVxuICByZXR1cm4gIWFscmVhZHlBZGRlZDtcbn1cblxuXG5mdW5jdGlvbiBtYWtlRXJyb3IobmFtZSwgZGVzY3JpcHRpb24pIHtcbiAgdmFyIGUgPSBuZXcgRXJyb3IoZGVzY3JpcHRpb24pO1xuICBlLm5hbWUgPSBuYW1lO1xuICAvLyBsZWdhY3kgZXJyb3IgY29kZXMgZnJvbSBodHRwczovL2hleWNhbS5naXRodWIuaW8vd2ViaWRsLyNpZGwtRE9NRXhjZXB0aW9uLWVycm9yLW5hbWVzXG4gIGUuY29kZSA9IHtcbiAgICBOb3RTdXBwb3J0ZWRFcnJvcjogOSxcbiAgICBJbnZhbGlkU3RhdGVFcnJvcjogMTEsXG4gICAgSW52YWxpZEFjY2Vzc0Vycm9yOiAxNSxcbiAgICBUeXBlRXJyb3I6IHVuZGVmaW5lZCxcbiAgICBPcGVyYXRpb25FcnJvcjogdW5kZWZpbmVkXG4gIH1bbmFtZV07XG4gIHJldHVybiBlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHdpbmRvdywgZWRnZVZlcnNpb24pIHtcbiAgLy8gaHR0cHM6Ly93M2MuZ2l0aHViLmlvL21lZGlhY2FwdHVyZS1tYWluLyNtZWRpYXN0cmVhbVxuICAvLyBIZWxwZXIgZnVuY3Rpb24gdG8gYWRkIHRoZSB0cmFjayB0byB0aGUgc3RyZWFtIGFuZFxuICAvLyBkaXNwYXRjaCB0aGUgZXZlbnQgb3Vyc2VsdmVzLlxuICBmdW5jdGlvbiBhZGRUcmFja1RvU3RyZWFtQW5kRmlyZUV2ZW50KHRyYWNrLCBzdHJlYW0pIHtcbiAgICBzdHJlYW0uYWRkVHJhY2sodHJhY2spO1xuICAgIHN0cmVhbS5kaXNwYXRjaEV2ZW50KG5ldyB3aW5kb3cuTWVkaWFTdHJlYW1UcmFja0V2ZW50KCdhZGR0cmFjaycsXG4gICAgICAgIHt0cmFjazogdHJhY2t9KSk7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVUcmFja0Zyb21TdHJlYW1BbmRGaXJlRXZlbnQodHJhY2ssIHN0cmVhbSkge1xuICAgIHN0cmVhbS5yZW1vdmVUcmFjayh0cmFjayk7XG4gICAgc3RyZWFtLmRpc3BhdGNoRXZlbnQobmV3IHdpbmRvdy5NZWRpYVN0cmVhbVRyYWNrRXZlbnQoJ3JlbW92ZXRyYWNrJyxcbiAgICAgICAge3RyYWNrOiB0cmFja30pKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpcmVBZGRUcmFjayhwYywgdHJhY2ssIHJlY2VpdmVyLCBzdHJlYW1zKSB7XG4gICAgdmFyIHRyYWNrRXZlbnQgPSBuZXcgRXZlbnQoJ3RyYWNrJyk7XG4gICAgdHJhY2tFdmVudC50cmFjayA9IHRyYWNrO1xuICAgIHRyYWNrRXZlbnQucmVjZWl2ZXIgPSByZWNlaXZlcjtcbiAgICB0cmFja0V2ZW50LnRyYW5zY2VpdmVyID0ge3JlY2VpdmVyOiByZWNlaXZlcn07XG4gICAgdHJhY2tFdmVudC5zdHJlYW1zID0gc3RyZWFtcztcbiAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIHBjLl9kaXNwYXRjaEV2ZW50KCd0cmFjaycsIHRyYWNrRXZlbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgdmFyIFJUQ1BlZXJDb25uZWN0aW9uID0gZnVuY3Rpb24oY29uZmlnKSB7XG4gICAgdmFyIHBjID0gdGhpcztcblxuICAgIHZhciBfZXZlbnRUYXJnZXQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgWydhZGRFdmVudExpc3RlbmVyJywgJ3JlbW92ZUV2ZW50TGlzdGVuZXInLCAnZGlzcGF0Y2hFdmVudCddXG4gICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgICAgIHBjW21ldGhvZF0gPSBfZXZlbnRUYXJnZXRbbWV0aG9kXS5iaW5kKF9ldmVudFRhcmdldCk7XG4gICAgICAgIH0pO1xuXG4gICAgdGhpcy5jYW5Ucmlja2xlSWNlQ2FuZGlkYXRlcyA9IG51bGw7XG5cbiAgICB0aGlzLm5lZWROZWdvdGlhdGlvbiA9IGZhbHNlO1xuXG4gICAgdGhpcy5sb2NhbFN0cmVhbXMgPSBbXTtcbiAgICB0aGlzLnJlbW90ZVN0cmVhbXMgPSBbXTtcblxuICAgIHRoaXMubG9jYWxEZXNjcmlwdGlvbiA9IG51bGw7XG4gICAgdGhpcy5yZW1vdGVEZXNjcmlwdGlvbiA9IG51bGw7XG5cbiAgICB0aGlzLnNpZ25hbGluZ1N0YXRlID0gJ3N0YWJsZSc7XG4gICAgdGhpcy5pY2VDb25uZWN0aW9uU3RhdGUgPSAnbmV3JztcbiAgICB0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9ICduZXcnO1xuICAgIHRoaXMuaWNlR2F0aGVyaW5nU3RhdGUgPSAnbmV3JztcblxuICAgIGNvbmZpZyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoY29uZmlnIHx8IHt9KSk7XG5cbiAgICB0aGlzLnVzaW5nQnVuZGxlID0gY29uZmlnLmJ1bmRsZVBvbGljeSA9PT0gJ21heC1idW5kbGUnO1xuICAgIGlmIChjb25maWcucnRjcE11eFBvbGljeSA9PT0gJ25lZ290aWF0ZScpIHtcbiAgICAgIHRocm93KG1ha2VFcnJvcignTm90U3VwcG9ydGVkRXJyb3InLFxuICAgICAgICAgICdydGNwTXV4UG9saWN5IFxcJ25lZ290aWF0ZVxcJyBpcyBub3Qgc3VwcG9ydGVkJykpO1xuICAgIH0gZWxzZSBpZiAoIWNvbmZpZy5ydGNwTXV4UG9saWN5KSB7XG4gICAgICBjb25maWcucnRjcE11eFBvbGljeSA9ICdyZXF1aXJlJztcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGNvbmZpZy5pY2VUcmFuc3BvcnRQb2xpY3kpIHtcbiAgICAgIGNhc2UgJ2FsbCc6XG4gICAgICBjYXNlICdyZWxheSc6XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uZmlnLmljZVRyYW5zcG9ydFBvbGljeSA9ICdhbGwnO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGNvbmZpZy5idW5kbGVQb2xpY3kpIHtcbiAgICAgIGNhc2UgJ2JhbGFuY2VkJzpcbiAgICAgIGNhc2UgJ21heC1jb21wYXQnOlxuICAgICAgY2FzZSAnbWF4LWJ1bmRsZSc6XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uZmlnLmJ1bmRsZVBvbGljeSA9ICdiYWxhbmNlZCc7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNvbmZpZy5pY2VTZXJ2ZXJzID0gZmlsdGVySWNlU2VydmVycyhjb25maWcuaWNlU2VydmVycyB8fCBbXSwgZWRnZVZlcnNpb24pO1xuXG4gICAgdGhpcy5faWNlR2F0aGVyZXJzID0gW107XG4gICAgaWYgKGNvbmZpZy5pY2VDYW5kaWRhdGVQb29sU2l6ZSkge1xuICAgICAgZm9yICh2YXIgaSA9IGNvbmZpZy5pY2VDYW5kaWRhdGVQb29sU2l6ZTsgaSA+IDA7IGktLSkge1xuICAgICAgICB0aGlzLl9pY2VHYXRoZXJlcnMucHVzaChuZXcgd2luZG93LlJUQ0ljZUdhdGhlcmVyKHtcbiAgICAgICAgICBpY2VTZXJ2ZXJzOiBjb25maWcuaWNlU2VydmVycyxcbiAgICAgICAgICBnYXRoZXJQb2xpY3k6IGNvbmZpZy5pY2VUcmFuc3BvcnRQb2xpY3lcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25maWcuaWNlQ2FuZGlkYXRlUG9vbFNpemUgPSAwO1xuICAgIH1cblxuICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcblxuICAgIC8vIHBlci10cmFjayBpY2VHYXRoZXJzLCBpY2VUcmFuc3BvcnRzLCBkdGxzVHJhbnNwb3J0cywgcnRwU2VuZGVycywgLi4uXG4gICAgLy8gZXZlcnl0aGluZyB0aGF0IGlzIG5lZWRlZCB0byBkZXNjcmliZSBhIFNEUCBtLWxpbmUuXG4gICAgdGhpcy50cmFuc2NlaXZlcnMgPSBbXTtcblxuICAgIHRoaXMuX3NkcFNlc3Npb25JZCA9IFNEUFV0aWxzLmdlbmVyYXRlU2Vzc2lvbklkKCk7XG4gICAgdGhpcy5fc2RwU2Vzc2lvblZlcnNpb24gPSAwO1xuXG4gICAgdGhpcy5fZHRsc1JvbGUgPSB1bmRlZmluZWQ7IC8vIHJvbGUgZm9yIGE9c2V0dXAgdG8gdXNlIGluIGFuc3dlcnMuXG5cbiAgICB0aGlzLl9pc0Nsb3NlZCA9IGZhbHNlO1xuICB9O1xuXG4gIC8vIHNldCB1cCBldmVudCBoYW5kbGVycyBvbiBwcm90b3R5cGVcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9uaWNlY2FuZGlkYXRlID0gbnVsbDtcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9uYWRkc3RyZWFtID0gbnVsbDtcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9udHJhY2sgPSBudWxsO1xuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub25yZW1vdmVzdHJlYW0gPSBudWxsO1xuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub25zaWduYWxpbmdzdGF0ZWNoYW5nZSA9IG51bGw7XG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5vbmljZWNvbm5lY3Rpb25zdGF0ZWNoYW5nZSA9IG51bGw7XG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5vbmNvbm5lY3Rpb25zdGF0ZWNoYW5nZSA9IG51bGw7XG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5vbmljZWdhdGhlcmluZ3N0YXRlY2hhbmdlID0gbnVsbDtcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9ubmVnb3RpYXRpb25uZWVkZWQgPSBudWxsO1xuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub25kYXRhY2hhbm5lbCA9IG51bGw7XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl9kaXNwYXRjaEV2ZW50ID0gZnVuY3Rpb24obmFtZSwgZXZlbnQpIHtcbiAgICBpZiAodGhpcy5faXNDbG9zZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICBpZiAodHlwZW9mIHRoaXNbJ29uJyArIG5hbWVdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzWydvbicgKyBuYW1lXShldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fZW1pdEdhdGhlcmluZ1N0YXRlQ2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdpY2VnYXRoZXJpbmdzdGF0ZWNoYW5nZScpO1xuICAgIHRoaXMuX2Rpc3BhdGNoRXZlbnQoJ2ljZWdhdGhlcmluZ3N0YXRlY2hhbmdlJywgZXZlbnQpO1xuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRDb25maWd1cmF0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0TG9jYWxTdHJlYW1zID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMubG9jYWxTdHJlYW1zO1xuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRSZW1vdGVTdHJlYW1zID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucmVtb3RlU3RyZWFtcztcbiAgfTtcblxuICAvLyBpbnRlcm5hbCBoZWxwZXIgdG8gY3JlYXRlIGEgdHJhbnNjZWl2ZXIgb2JqZWN0LlxuICAvLyAod2hpY2ggaXMgbm90IHlldCB0aGUgc2FtZSBhcyB0aGUgV2ViUlRDIDEuMCB0cmFuc2NlaXZlcilcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl9jcmVhdGVUcmFuc2NlaXZlciA9IGZ1bmN0aW9uKGtpbmQsIGRvTm90QWRkKSB7XG4gICAgdmFyIGhhc0J1bmRsZVRyYW5zcG9ydCA9IHRoaXMudHJhbnNjZWl2ZXJzLmxlbmd0aCA+IDA7XG4gICAgdmFyIHRyYW5zY2VpdmVyID0ge1xuICAgICAgdHJhY2s6IG51bGwsXG4gICAgICBpY2VHYXRoZXJlcjogbnVsbCxcbiAgICAgIGljZVRyYW5zcG9ydDogbnVsbCxcbiAgICAgIGR0bHNUcmFuc3BvcnQ6IG51bGwsXG4gICAgICBsb2NhbENhcGFiaWxpdGllczogbnVsbCxcbiAgICAgIHJlbW90ZUNhcGFiaWxpdGllczogbnVsbCxcbiAgICAgIHJ0cFNlbmRlcjogbnVsbCxcbiAgICAgIHJ0cFJlY2VpdmVyOiBudWxsLFxuICAgICAga2luZDoga2luZCxcbiAgICAgIG1pZDogbnVsbCxcbiAgICAgIHNlbmRFbmNvZGluZ1BhcmFtZXRlcnM6IG51bGwsXG4gICAgICByZWN2RW5jb2RpbmdQYXJhbWV0ZXJzOiBudWxsLFxuICAgICAgc3RyZWFtOiBudWxsLFxuICAgICAgYXNzb2NpYXRlZFJlbW90ZU1lZGlhU3RyZWFtczogW10sXG4gICAgICB3YW50UmVjZWl2ZTogdHJ1ZVxuICAgIH07XG4gICAgaWYgKHRoaXMudXNpbmdCdW5kbGUgJiYgaGFzQnVuZGxlVHJhbnNwb3J0KSB7XG4gICAgICB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQgPSB0aGlzLnRyYW5zY2VpdmVyc1swXS5pY2VUcmFuc3BvcnQ7XG4gICAgICB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0ID0gdGhpcy50cmFuc2NlaXZlcnNbMF0uZHRsc1RyYW5zcG9ydDtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHRyYW5zcG9ydHMgPSB0aGlzLl9jcmVhdGVJY2VBbmREdGxzVHJhbnNwb3J0cygpO1xuICAgICAgdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0ID0gdHJhbnNwb3J0cy5pY2VUcmFuc3BvcnQ7XG4gICAgICB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0ID0gdHJhbnNwb3J0cy5kdGxzVHJhbnNwb3J0O1xuICAgIH1cbiAgICBpZiAoIWRvTm90QWRkKSB7XG4gICAgICB0aGlzLnRyYW5zY2VpdmVycy5wdXNoKHRyYW5zY2VpdmVyKTtcbiAgICB9XG4gICAgcmV0dXJuIHRyYW5zY2VpdmVyO1xuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjayA9IGZ1bmN0aW9uKHRyYWNrLCBzdHJlYW0pIHtcbiAgICBpZiAodGhpcy5faXNDbG9zZWQpIHtcbiAgICAgIHRocm93IG1ha2VFcnJvcignSW52YWxpZFN0YXRlRXJyb3InLFxuICAgICAgICAgICdBdHRlbXB0ZWQgdG8gY2FsbCBhZGRUcmFjayBvbiBhIGNsb3NlZCBwZWVyY29ubmVjdGlvbi4nKTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUV4aXN0cyA9IHRoaXMudHJhbnNjZWl2ZXJzLmZpbmQoZnVuY3Rpb24ocykge1xuICAgICAgcmV0dXJuIHMudHJhY2sgPT09IHRyYWNrO1xuICAgIH0pO1xuXG4gICAgaWYgKGFscmVhZHlFeGlzdHMpIHtcbiAgICAgIHRocm93IG1ha2VFcnJvcignSW52YWxpZEFjY2Vzc0Vycm9yJywgJ1RyYWNrIGFscmVhZHkgZXhpc3RzLicpO1xuICAgIH1cblxuICAgIHZhciB0cmFuc2NlaXZlcjtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudHJhbnNjZWl2ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoIXRoaXMudHJhbnNjZWl2ZXJzW2ldLnRyYWNrICYmXG4gICAgICAgICAgdGhpcy50cmFuc2NlaXZlcnNbaV0ua2luZCA9PT0gdHJhY2sua2luZCkge1xuICAgICAgICB0cmFuc2NlaXZlciA9IHRoaXMudHJhbnNjZWl2ZXJzW2ldO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXRyYW5zY2VpdmVyKSB7XG4gICAgICB0cmFuc2NlaXZlciA9IHRoaXMuX2NyZWF0ZVRyYW5zY2VpdmVyKHRyYWNrLmtpbmQpO1xuICAgIH1cblxuICAgIHRoaXMuX21heWJlRmlyZU5lZ290aWF0aW9uTmVlZGVkKCk7XG5cbiAgICBpZiAodGhpcy5sb2NhbFN0cmVhbXMuaW5kZXhPZihzdHJlYW0pID09PSAtMSkge1xuICAgICAgdGhpcy5sb2NhbFN0cmVhbXMucHVzaChzdHJlYW0pO1xuICAgIH1cblxuICAgIHRyYW5zY2VpdmVyLnRyYWNrID0gdHJhY2s7XG4gICAgdHJhbnNjZWl2ZXIuc3RyZWFtID0gc3RyZWFtO1xuICAgIHRyYW5zY2VpdmVyLnJ0cFNlbmRlciA9IG5ldyB3aW5kb3cuUlRDUnRwU2VuZGVyKHRyYWNrLFxuICAgICAgICB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0KTtcbiAgICByZXR1cm4gdHJhbnNjZWl2ZXIucnRwU2VuZGVyO1xuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICB2YXIgcGMgPSB0aGlzO1xuICAgIGlmIChlZGdlVmVyc2lvbiA+PSAxNTAyNSkge1xuICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcbiAgICAgICAgcGMuYWRkVHJhY2sodHJhY2ssIHN0cmVhbSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQ2xvbmUgaXMgbmVjZXNzYXJ5IGZvciBsb2NhbCBkZW1vcyBtb3N0bHksIGF0dGFjaGluZyBkaXJlY3RseVxuICAgICAgLy8gdG8gdHdvIGRpZmZlcmVudCBzZW5kZXJzIGRvZXMgbm90IHdvcmsgKGJ1aWxkIDEwNTQ3KS5cbiAgICAgIC8vIEZpeGVkIGluIDE1MDI1IChvciBlYXJsaWVyKVxuICAgICAgdmFyIGNsb25lZFN0cmVhbSA9IHN0cmVhbS5jbG9uZSgpO1xuICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2ssIGlkeCkge1xuICAgICAgICB2YXIgY2xvbmVkVHJhY2sgPSBjbG9uZWRTdHJlYW0uZ2V0VHJhY2tzKClbaWR4XTtcbiAgICAgICAgdHJhY2suYWRkRXZlbnRMaXN0ZW5lcignZW5hYmxlZCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgY2xvbmVkVHJhY2suZW5hYmxlZCA9IGV2ZW50LmVuYWJsZWQ7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBjbG9uZWRTdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xuICAgICAgICBwYy5hZGRUcmFjayh0cmFjaywgY2xvbmVkU3RyZWFtKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlVHJhY2sgPSBmdW5jdGlvbihzZW5kZXIpIHtcbiAgICBpZiAodGhpcy5faXNDbG9zZWQpIHtcbiAgICAgIHRocm93IG1ha2VFcnJvcignSW52YWxpZFN0YXRlRXJyb3InLFxuICAgICAgICAgICdBdHRlbXB0ZWQgdG8gY2FsbCByZW1vdmVUcmFjayBvbiBhIGNsb3NlZCBwZWVyY29ubmVjdGlvbi4nKTtcbiAgICB9XG5cbiAgICBpZiAoIShzZW5kZXIgaW5zdGFuY2VvZiB3aW5kb3cuUlRDUnRwU2VuZGVyKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgMSBvZiBSVENQZWVyQ29ubmVjdGlvbi5yZW1vdmVUcmFjayAnICtcbiAgICAgICAgICAnZG9lcyBub3QgaW1wbGVtZW50IGludGVyZmFjZSBSVENSdHBTZW5kZXIuJyk7XG4gICAgfVxuXG4gICAgdmFyIHRyYW5zY2VpdmVyID0gdGhpcy50cmFuc2NlaXZlcnMuZmluZChmdW5jdGlvbih0KSB7XG4gICAgICByZXR1cm4gdC5ydHBTZW5kZXIgPT09IHNlbmRlcjtcbiAgICB9KTtcblxuICAgIGlmICghdHJhbnNjZWl2ZXIpIHtcbiAgICAgIHRocm93IG1ha2VFcnJvcignSW52YWxpZEFjY2Vzc0Vycm9yJyxcbiAgICAgICAgICAnU2VuZGVyIHdhcyBub3QgY3JlYXRlZCBieSB0aGlzIGNvbm5lY3Rpb24uJyk7XG4gICAgfVxuICAgIHZhciBzdHJlYW0gPSB0cmFuc2NlaXZlci5zdHJlYW07XG5cbiAgICB0cmFuc2NlaXZlci5ydHBTZW5kZXIuc3RvcCgpO1xuICAgIHRyYW5zY2VpdmVyLnJ0cFNlbmRlciA9IG51bGw7XG4gICAgdHJhbnNjZWl2ZXIudHJhY2sgPSBudWxsO1xuICAgIHRyYW5zY2VpdmVyLnN0cmVhbSA9IG51bGw7XG5cbiAgICAvLyByZW1vdmUgdGhlIHN0cmVhbSBmcm9tIHRoZSBzZXQgb2YgbG9jYWwgc3RyZWFtc1xuICAgIHZhciBsb2NhbFN0cmVhbXMgPSB0aGlzLnRyYW5zY2VpdmVycy5tYXAoZnVuY3Rpb24odCkge1xuICAgICAgcmV0dXJuIHQuc3RyZWFtO1xuICAgIH0pO1xuICAgIGlmIChsb2NhbFN0cmVhbXMuaW5kZXhPZihzdHJlYW0pID09PSAtMSAmJlxuICAgICAgICB0aGlzLmxvY2FsU3RyZWFtcy5pbmRleE9mKHN0cmVhbSkgPiAtMSkge1xuICAgICAgdGhpcy5sb2NhbFN0cmVhbXMuc3BsaWNlKHRoaXMubG9jYWxTdHJlYW1zLmluZGV4T2Yoc3RyZWFtKSwgMSk7XG4gICAgfVxuXG4gICAgdGhpcy5fbWF5YmVGaXJlTmVnb3RpYXRpb25OZWVkZWQoKTtcbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgdmFyIHBjID0gdGhpcztcbiAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xuICAgICAgdmFyIHNlbmRlciA9IHBjLmdldFNlbmRlcnMoKS5maW5kKGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgcmV0dXJuIHMudHJhY2sgPT09IHRyYWNrO1xuICAgICAgfSk7XG4gICAgICBpZiAoc2VuZGVyKSB7XG4gICAgICAgIHBjLnJlbW92ZVRyYWNrKHNlbmRlcik7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFNlbmRlcnMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy50cmFuc2NlaXZlcnMuZmlsdGVyKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XG4gICAgICByZXR1cm4gISF0cmFuc2NlaXZlci5ydHBTZW5kZXI7XG4gICAgfSlcbiAgICAubWFwKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XG4gICAgICByZXR1cm4gdHJhbnNjZWl2ZXIucnRwU2VuZGVyO1xuICAgIH0pO1xuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRSZWNlaXZlcnMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy50cmFuc2NlaXZlcnMuZmlsdGVyKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XG4gICAgICByZXR1cm4gISF0cmFuc2NlaXZlci5ydHBSZWNlaXZlcjtcbiAgICB9KVxuICAgIC5tYXAoZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcbiAgICAgIHJldHVybiB0cmFuc2NlaXZlci5ydHBSZWNlaXZlcjtcbiAgICB9KTtcbiAgfTtcblxuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fY3JlYXRlSWNlR2F0aGVyZXIgPSBmdW5jdGlvbihzZHBNTGluZUluZGV4LFxuICAgICAgdXNpbmdCdW5kbGUpIHtcbiAgICB2YXIgcGMgPSB0aGlzO1xuICAgIGlmICh1c2luZ0J1bmRsZSAmJiBzZHBNTGluZUluZGV4ID4gMCkge1xuICAgICAgcmV0dXJuIHRoaXMudHJhbnNjZWl2ZXJzWzBdLmljZUdhdGhlcmVyO1xuICAgIH0gZWxzZSBpZiAodGhpcy5faWNlR2F0aGVyZXJzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2ljZUdhdGhlcmVycy5zaGlmdCgpO1xuICAgIH1cbiAgICB2YXIgaWNlR2F0aGVyZXIgPSBuZXcgd2luZG93LlJUQ0ljZUdhdGhlcmVyKHtcbiAgICAgIGljZVNlcnZlcnM6IHRoaXMuX2NvbmZpZy5pY2VTZXJ2ZXJzLFxuICAgICAgZ2F0aGVyUG9saWN5OiB0aGlzLl9jb25maWcuaWNlVHJhbnNwb3J0UG9saWN5XG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGljZUdhdGhlcmVyLCAnc3RhdGUnLFxuICAgICAgICB7dmFsdWU6ICduZXcnLCB3cml0YWJsZTogdHJ1ZX1cbiAgICApO1xuXG4gICAgdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uYnVmZmVyZWRDYW5kaWRhdGVFdmVudHMgPSBbXTtcbiAgICB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5idWZmZXJDYW5kaWRhdGVzID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIHZhciBlbmQgPSAhZXZlbnQuY2FuZGlkYXRlIHx8IE9iamVjdC5rZXlzKGV2ZW50LmNhbmRpZGF0ZSkubGVuZ3RoID09PSAwO1xuICAgICAgLy8gcG9seWZpbGwgc2luY2UgUlRDSWNlR2F0aGVyZXIuc3RhdGUgaXMgbm90IGltcGxlbWVudGVkIGluXG4gICAgICAvLyBFZGdlIDEwNTQ3IHlldC5cbiAgICAgIGljZUdhdGhlcmVyLnN0YXRlID0gZW5kID8gJ2NvbXBsZXRlZCcgOiAnZ2F0aGVyaW5nJztcbiAgICAgIGlmIChwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uYnVmZmVyZWRDYW5kaWRhdGVFdmVudHMgIT09IG51bGwpIHtcbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmJ1ZmZlcmVkQ2FuZGlkYXRlRXZlbnRzLnB1c2goZXZlbnQpO1xuICAgICAgfVxuICAgIH07XG4gICAgaWNlR2F0aGVyZXIuYWRkRXZlbnRMaXN0ZW5lcignbG9jYWxjYW5kaWRhdGUnLFxuICAgICAgdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uYnVmZmVyQ2FuZGlkYXRlcyk7XG4gICAgcmV0dXJuIGljZUdhdGhlcmVyO1xuICB9O1xuXG4gIC8vIHN0YXJ0IGdhdGhlcmluZyBmcm9tIGFuIFJUQ0ljZUdhdGhlcmVyLlxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX2dhdGhlciA9IGZ1bmN0aW9uKG1pZCwgc2RwTUxpbmVJbmRleCkge1xuICAgIHZhciBwYyA9IHRoaXM7XG4gICAgdmFyIGljZUdhdGhlcmVyID0gdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uaWNlR2F0aGVyZXI7XG4gICAgaWYgKGljZUdhdGhlcmVyLm9ubG9jYWxjYW5kaWRhdGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGJ1ZmZlcmVkQ2FuZGlkYXRlRXZlbnRzID1cbiAgICAgIHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmJ1ZmZlcmVkQ2FuZGlkYXRlRXZlbnRzO1xuICAgIHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmJ1ZmZlcmVkQ2FuZGlkYXRlRXZlbnRzID0gbnVsbDtcbiAgICBpY2VHYXRoZXJlci5yZW1vdmVFdmVudExpc3RlbmVyKCdsb2NhbGNhbmRpZGF0ZScsXG4gICAgICB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5idWZmZXJDYW5kaWRhdGVzKTtcbiAgICBpY2VHYXRoZXJlci5vbmxvY2FsY2FuZGlkYXRlID0gZnVuY3Rpb24oZXZ0KSB7XG4gICAgICBpZiAocGMudXNpbmdCdW5kbGUgJiYgc2RwTUxpbmVJbmRleCA+IDApIHtcbiAgICAgICAgLy8gaWYgd2Uga25vdyB0aGF0IHdlIHVzZSBidW5kbGUgd2UgY2FuIGRyb3AgY2FuZGlkYXRlcyB3aXRoXG4gICAgICAgIC8vINGVZHBNTGluZUluZGV4ID4gMC4gSWYgd2UgZG9uJ3QgZG8gdGhpcyB0aGVuIG91ciBzdGF0ZSBnZXRzXG4gICAgICAgIC8vIGNvbmZ1c2VkIHNpbmNlIHdlIGRpc3Bvc2UgdGhlIGV4dHJhIGljZSBnYXRoZXJlci5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdpY2VjYW5kaWRhdGUnKTtcbiAgICAgIGV2ZW50LmNhbmRpZGF0ZSA9IHtzZHBNaWQ6IG1pZCwgc2RwTUxpbmVJbmRleDogc2RwTUxpbmVJbmRleH07XG5cbiAgICAgIHZhciBjYW5kID0gZXZ0LmNhbmRpZGF0ZTtcbiAgICAgIC8vIEVkZ2UgZW1pdHMgYW4gZW1wdHkgb2JqZWN0IGZvciBSVENJY2VDYW5kaWRhdGVDb21wbGV0ZeKApVxuICAgICAgdmFyIGVuZCA9ICFjYW5kIHx8IE9iamVjdC5rZXlzKGNhbmQpLmxlbmd0aCA9PT0gMDtcbiAgICAgIGlmIChlbmQpIHtcbiAgICAgICAgLy8gcG9seWZpbGwgc2luY2UgUlRDSWNlR2F0aGVyZXIuc3RhdGUgaXMgbm90IGltcGxlbWVudGVkIGluXG4gICAgICAgIC8vIEVkZ2UgMTA1NDcgeWV0LlxuICAgICAgICBpZiAoaWNlR2F0aGVyZXIuc3RhdGUgPT09ICduZXcnIHx8IGljZUdhdGhlcmVyLnN0YXRlID09PSAnZ2F0aGVyaW5nJykge1xuICAgICAgICAgIGljZUdhdGhlcmVyLnN0YXRlID0gJ2NvbXBsZXRlZCc7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChpY2VHYXRoZXJlci5zdGF0ZSA9PT0gJ25ldycpIHtcbiAgICAgICAgICBpY2VHYXRoZXJlci5zdGF0ZSA9ICdnYXRoZXJpbmcnO1xuICAgICAgICB9XG4gICAgICAgIC8vIFJUQ0ljZUNhbmRpZGF0ZSBkb2Vzbid0IGhhdmUgYSBjb21wb25lbnQsIG5lZWRzIHRvIGJlIGFkZGVkXG4gICAgICAgIGNhbmQuY29tcG9uZW50ID0gMTtcbiAgICAgICAgLy8gYWxzbyB0aGUgdXNlcm5hbWVGcmFnbWVudC4gVE9ETzogdXBkYXRlIFNEUCB0byB0YWtlIGJvdGggdmFyaWFudHMuXG4gICAgICAgIGNhbmQudWZyYWcgPSBpY2VHYXRoZXJlci5nZXRMb2NhbFBhcmFtZXRlcnMoKS51c2VybmFtZUZyYWdtZW50O1xuXG4gICAgICAgIHZhciBzZXJpYWxpemVkQ2FuZGlkYXRlID0gU0RQVXRpbHMud3JpdGVDYW5kaWRhdGUoY2FuZCk7XG4gICAgICAgIGV2ZW50LmNhbmRpZGF0ZSA9IE9iamVjdC5hc3NpZ24oZXZlbnQuY2FuZGlkYXRlLFxuICAgICAgICAgICAgU0RQVXRpbHMucGFyc2VDYW5kaWRhdGUoc2VyaWFsaXplZENhbmRpZGF0ZSkpO1xuXG4gICAgICAgIGV2ZW50LmNhbmRpZGF0ZS5jYW5kaWRhdGUgPSBzZXJpYWxpemVkQ2FuZGlkYXRlO1xuICAgICAgICBldmVudC5jYW5kaWRhdGUudG9KU09OID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNhbmRpZGF0ZTogZXZlbnQuY2FuZGlkYXRlLmNhbmRpZGF0ZSxcbiAgICAgICAgICAgIHNkcE1pZDogZXZlbnQuY2FuZGlkYXRlLnNkcE1pZCxcbiAgICAgICAgICAgIHNkcE1MaW5lSW5kZXg6IGV2ZW50LmNhbmRpZGF0ZS5zZHBNTGluZUluZGV4LFxuICAgICAgICAgICAgdXNlcm5hbWVGcmFnbWVudDogZXZlbnQuY2FuZGlkYXRlLnVzZXJuYW1lRnJhZ21lbnRcbiAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICAvLyB1cGRhdGUgbG9jYWwgZGVzY3JpcHRpb24uXG4gICAgICB2YXIgc2VjdGlvbnMgPSBTRFBVdGlscy5nZXRNZWRpYVNlY3Rpb25zKHBjLmxvY2FsRGVzY3JpcHRpb24uc2RwKTtcbiAgICAgIGlmICghZW5kKSB7XG4gICAgICAgIHNlY3Rpb25zW2V2ZW50LmNhbmRpZGF0ZS5zZHBNTGluZUluZGV4XSArPVxuICAgICAgICAgICAgJ2E9JyArIGV2ZW50LmNhbmRpZGF0ZS5jYW5kaWRhdGUgKyAnXFxyXFxuJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlY3Rpb25zW2V2ZW50LmNhbmRpZGF0ZS5zZHBNTGluZUluZGV4XSArPVxuICAgICAgICAgICAgJ2E9ZW5kLW9mLWNhbmRpZGF0ZXNcXHJcXG4nO1xuICAgICAgfVxuICAgICAgcGMubG9jYWxEZXNjcmlwdGlvbi5zZHAgPVxuICAgICAgICAgIFNEUFV0aWxzLmdldERlc2NyaXB0aW9uKHBjLmxvY2FsRGVzY3JpcHRpb24uc2RwKSArXG4gICAgICAgICAgc2VjdGlvbnMuam9pbignJyk7XG4gICAgICB2YXIgY29tcGxldGUgPSBwYy50cmFuc2NlaXZlcnMuZXZlcnkoZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcbiAgICAgICAgcmV0dXJuIHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyICYmXG4gICAgICAgICAgICB0cmFuc2NlaXZlci5pY2VHYXRoZXJlci5zdGF0ZSA9PT0gJ2NvbXBsZXRlZCc7XG4gICAgICB9KTtcblxuICAgICAgaWYgKHBjLmljZUdhdGhlcmluZ1N0YXRlICE9PSAnZ2F0aGVyaW5nJykge1xuICAgICAgICBwYy5pY2VHYXRoZXJpbmdTdGF0ZSA9ICdnYXRoZXJpbmcnO1xuICAgICAgICBwYy5fZW1pdEdhdGhlcmluZ1N0YXRlQ2hhbmdlKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIEVtaXQgY2FuZGlkYXRlLiBBbHNvIGVtaXQgbnVsbCBjYW5kaWRhdGUgd2hlbiBhbGwgZ2F0aGVyZXJzIGFyZVxuICAgICAgLy8gY29tcGxldGUuXG4gICAgICBpZiAoIWVuZCkge1xuICAgICAgICBwYy5fZGlzcGF0Y2hFdmVudCgnaWNlY2FuZGlkYXRlJywgZXZlbnQpO1xuICAgICAgfVxuICAgICAgaWYgKGNvbXBsZXRlKSB7XG4gICAgICAgIHBjLl9kaXNwYXRjaEV2ZW50KCdpY2VjYW5kaWRhdGUnLCBuZXcgRXZlbnQoJ2ljZWNhbmRpZGF0ZScpKTtcbiAgICAgICAgcGMuaWNlR2F0aGVyaW5nU3RhdGUgPSAnY29tcGxldGUnO1xuICAgICAgICBwYy5fZW1pdEdhdGhlcmluZ1N0YXRlQ2hhbmdlKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8vIGVtaXQgYWxyZWFkeSBnYXRoZXJlZCBjYW5kaWRhdGVzLlxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgYnVmZmVyZWRDYW5kaWRhdGVFdmVudHMuZm9yRWFjaChmdW5jdGlvbihlKSB7XG4gICAgICAgIGljZUdhdGhlcmVyLm9ubG9jYWxjYW5kaWRhdGUoZSk7XG4gICAgICB9KTtcbiAgICB9LCAwKTtcbiAgfTtcblxuICAvLyBDcmVhdGUgSUNFIHRyYW5zcG9ydCBhbmQgRFRMUyB0cmFuc3BvcnQuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fY3JlYXRlSWNlQW5kRHRsc1RyYW5zcG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcGMgPSB0aGlzO1xuICAgIHZhciBpY2VUcmFuc3BvcnQgPSBuZXcgd2luZG93LlJUQ0ljZVRyYW5zcG9ydChudWxsKTtcbiAgICBpY2VUcmFuc3BvcnQub25pY2VzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcGMuX3VwZGF0ZUljZUNvbm5lY3Rpb25TdGF0ZSgpO1xuICAgICAgcGMuX3VwZGF0ZUNvbm5lY3Rpb25TdGF0ZSgpO1xuICAgIH07XG5cbiAgICB2YXIgZHRsc1RyYW5zcG9ydCA9IG5ldyB3aW5kb3cuUlRDRHRsc1RyYW5zcG9ydChpY2VUcmFuc3BvcnQpO1xuICAgIGR0bHNUcmFuc3BvcnQub25kdGxzc3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgIHBjLl91cGRhdGVDb25uZWN0aW9uU3RhdGUoKTtcbiAgICB9O1xuICAgIGR0bHNUcmFuc3BvcnQub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gb25lcnJvciBkb2VzIG5vdCBzZXQgc3RhdGUgdG8gZmFpbGVkIGJ5IGl0c2VsZi5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkdGxzVHJhbnNwb3J0LCAnc3RhdGUnLFxuICAgICAgICAgIHt2YWx1ZTogJ2ZhaWxlZCcsIHdyaXRhYmxlOiB0cnVlfSk7XG4gICAgICBwYy5fdXBkYXRlQ29ubmVjdGlvblN0YXRlKCk7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICBpY2VUcmFuc3BvcnQ6IGljZVRyYW5zcG9ydCxcbiAgICAgIGR0bHNUcmFuc3BvcnQ6IGR0bHNUcmFuc3BvcnRcbiAgICB9O1xuICB9O1xuXG4gIC8vIERlc3Ryb3kgSUNFIGdhdGhlcmVyLCBJQ0UgdHJhbnNwb3J0IGFuZCBEVExTIHRyYW5zcG9ydC5cbiAgLy8gV2l0aG91dCB0cmlnZ2VyaW5nIHRoZSBjYWxsYmFja3MuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fZGlzcG9zZUljZUFuZER0bHNUcmFuc3BvcnRzID0gZnVuY3Rpb24oXG4gICAgICBzZHBNTGluZUluZGV4KSB7XG4gICAgdmFyIGljZUdhdGhlcmVyID0gdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uaWNlR2F0aGVyZXI7XG4gICAgaWYgKGljZUdhdGhlcmVyKSB7XG4gICAgICBkZWxldGUgaWNlR2F0aGVyZXIub25sb2NhbGNhbmRpZGF0ZTtcbiAgICAgIGRlbGV0ZSB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5pY2VHYXRoZXJlcjtcbiAgICB9XG4gICAgdmFyIGljZVRyYW5zcG9ydCA9IHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmljZVRyYW5zcG9ydDtcbiAgICBpZiAoaWNlVHJhbnNwb3J0KSB7XG4gICAgICBkZWxldGUgaWNlVHJhbnNwb3J0Lm9uaWNlc3RhdGVjaGFuZ2U7XG4gICAgICBkZWxldGUgdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uaWNlVHJhbnNwb3J0O1xuICAgIH1cbiAgICB2YXIgZHRsc1RyYW5zcG9ydCA9IHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmR0bHNUcmFuc3BvcnQ7XG4gICAgaWYgKGR0bHNUcmFuc3BvcnQpIHtcbiAgICAgIGRlbGV0ZSBkdGxzVHJhbnNwb3J0Lm9uZHRsc3N0YXRlY2hhbmdlO1xuICAgICAgZGVsZXRlIGR0bHNUcmFuc3BvcnQub25lcnJvcjtcbiAgICAgIGRlbGV0ZSB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5kdGxzVHJhbnNwb3J0O1xuICAgIH1cbiAgfTtcblxuICAvLyBTdGFydCB0aGUgUlRQIFNlbmRlciBhbmQgUmVjZWl2ZXIgZm9yIGEgdHJhbnNjZWl2ZXIuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fdHJhbnNjZWl2ZSA9IGZ1bmN0aW9uKHRyYW5zY2VpdmVyLFxuICAgICAgc2VuZCwgcmVjdikge1xuICAgIHZhciBwYXJhbXMgPSBnZXRDb21tb25DYXBhYmlsaXRpZXModHJhbnNjZWl2ZXIubG9jYWxDYXBhYmlsaXRpZXMsXG4gICAgICAgIHRyYW5zY2VpdmVyLnJlbW90ZUNhcGFiaWxpdGllcyk7XG4gICAgaWYgKHNlbmQgJiYgdHJhbnNjZWl2ZXIucnRwU2VuZGVyKSB7XG4gICAgICBwYXJhbXMuZW5jb2RpbmdzID0gdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVycztcbiAgICAgIHBhcmFtcy5ydGNwID0ge1xuICAgICAgICBjbmFtZTogU0RQVXRpbHMubG9jYWxDTmFtZSxcbiAgICAgICAgY29tcG91bmQ6IHRyYW5zY2VpdmVyLnJ0Y3BQYXJhbWV0ZXJzLmNvbXBvdW5kXG4gICAgICB9O1xuICAgICAgaWYgKHRyYW5zY2VpdmVyLnJlY3ZFbmNvZGluZ1BhcmFtZXRlcnMubGVuZ3RoKSB7XG4gICAgICAgIHBhcmFtcy5ydGNwLnNzcmMgPSB0cmFuc2NlaXZlci5yZWN2RW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmM7XG4gICAgICB9XG4gICAgICB0cmFuc2NlaXZlci5ydHBTZW5kZXIuc2VuZChwYXJhbXMpO1xuICAgIH1cbiAgICBpZiAocmVjdiAmJiB0cmFuc2NlaXZlci5ydHBSZWNlaXZlciAmJiBwYXJhbXMuY29kZWNzLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIHJlbW92ZSBSVFggZmllbGQgaW4gRWRnZSAxNDk0MlxuICAgICAgaWYgKHRyYW5zY2VpdmVyLmtpbmQgPT09ICd2aWRlbydcbiAgICAgICAgICAmJiB0cmFuc2NlaXZlci5yZWN2RW5jb2RpbmdQYXJhbWV0ZXJzXG4gICAgICAgICAgJiYgZWRnZVZlcnNpb24gPCAxNTAxOSkge1xuICAgICAgICB0cmFuc2NlaXZlci5yZWN2RW5jb2RpbmdQYXJhbWV0ZXJzLmZvckVhY2goZnVuY3Rpb24ocCkge1xuICAgICAgICAgIGRlbGV0ZSBwLnJ0eDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAodHJhbnNjZWl2ZXIucmVjdkVuY29kaW5nUGFyYW1ldGVycy5sZW5ndGgpIHtcbiAgICAgICAgcGFyYW1zLmVuY29kaW5ncyA9IHRyYW5zY2VpdmVyLnJlY3ZFbmNvZGluZ1BhcmFtZXRlcnM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJhbXMuZW5jb2RpbmdzID0gW3t9XTtcbiAgICAgIH1cbiAgICAgIHBhcmFtcy5ydGNwID0ge1xuICAgICAgICBjb21wb3VuZDogdHJhbnNjZWl2ZXIucnRjcFBhcmFtZXRlcnMuY29tcG91bmRcbiAgICAgIH07XG4gICAgICBpZiAodHJhbnNjZWl2ZXIucnRjcFBhcmFtZXRlcnMuY25hbWUpIHtcbiAgICAgICAgcGFyYW1zLnJ0Y3AuY25hbWUgPSB0cmFuc2NlaXZlci5ydGNwUGFyYW1ldGVycy5jbmFtZTtcbiAgICAgIH1cbiAgICAgIGlmICh0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzLmxlbmd0aCkge1xuICAgICAgICBwYXJhbXMucnRjcC5zc3JjID0gdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjO1xuICAgICAgfVxuICAgICAgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIucmVjZWl2ZShwYXJhbXMpO1xuICAgIH1cbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0TG9jYWxEZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKGRlc2NyaXB0aW9uKSB7XG4gICAgdmFyIHBjID0gdGhpcztcblxuICAgIC8vIE5vdGU6IHByYW5zd2VyIGlzIG5vdCBzdXBwb3J0ZWQuXG4gICAgaWYgKFsnb2ZmZXInLCAnYW5zd2VyJ10uaW5kZXhPZihkZXNjcmlwdGlvbi50eXBlKSA9PT0gLTEpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChtYWtlRXJyb3IoJ1R5cGVFcnJvcicsXG4gICAgICAgICAgJ1Vuc3VwcG9ydGVkIHR5cGUgXCInICsgZGVzY3JpcHRpb24udHlwZSArICdcIicpKTtcbiAgICB9XG5cbiAgICBpZiAoIWlzQWN0aW9uQWxsb3dlZEluU2lnbmFsaW5nU3RhdGUoJ3NldExvY2FsRGVzY3JpcHRpb24nLFxuICAgICAgICBkZXNjcmlwdGlvbi50eXBlLCBwYy5zaWduYWxpbmdTdGF0ZSkgfHwgcGMuX2lzQ2xvc2VkKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobWFrZUVycm9yKCdJbnZhbGlkU3RhdGVFcnJvcicsXG4gICAgICAgICAgJ0NhbiBub3Qgc2V0IGxvY2FsICcgKyBkZXNjcmlwdGlvbi50eXBlICtcbiAgICAgICAgICAnIGluIHN0YXRlICcgKyBwYy5zaWduYWxpbmdTdGF0ZSkpO1xuICAgIH1cblxuICAgIHZhciBzZWN0aW9ucztcbiAgICB2YXIgc2Vzc2lvbnBhcnQ7XG4gICAgaWYgKGRlc2NyaXB0aW9uLnR5cGUgPT09ICdvZmZlcicpIHtcbiAgICAgIC8vIFZFUlkgbGltaXRlZCBzdXBwb3J0IGZvciBTRFAgbXVuZ2luZy4gTGltaXRlZCB0bzpcbiAgICAgIC8vICogY2hhbmdpbmcgdGhlIG9yZGVyIG9mIGNvZGVjc1xuICAgICAgc2VjdGlvbnMgPSBTRFBVdGlscy5zcGxpdFNlY3Rpb25zKGRlc2NyaXB0aW9uLnNkcCk7XG4gICAgICBzZXNzaW9ucGFydCA9IHNlY3Rpb25zLnNoaWZ0KCk7XG4gICAgICBzZWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKG1lZGlhU2VjdGlvbiwgc2RwTUxpbmVJbmRleCkge1xuICAgICAgICB2YXIgY2FwcyA9IFNEUFV0aWxzLnBhcnNlUnRwUGFyYW1ldGVycyhtZWRpYVNlY3Rpb24pO1xuICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0ubG9jYWxDYXBhYmlsaXRpZXMgPSBjYXBzO1xuICAgICAgfSk7XG5cbiAgICAgIHBjLnRyYW5zY2VpdmVycy5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zY2VpdmVyLCBzZHBNTGluZUluZGV4KSB7XG4gICAgICAgIHBjLl9nYXRoZXIodHJhbnNjZWl2ZXIubWlkLCBzZHBNTGluZUluZGV4KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoZGVzY3JpcHRpb24udHlwZSA9PT0gJ2Fuc3dlcicpIHtcbiAgICAgIHNlY3Rpb25zID0gU0RQVXRpbHMuc3BsaXRTZWN0aW9ucyhwYy5yZW1vdGVEZXNjcmlwdGlvbi5zZHApO1xuICAgICAgc2Vzc2lvbnBhcnQgPSBzZWN0aW9ucy5zaGlmdCgpO1xuICAgICAgdmFyIGlzSWNlTGl0ZSA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KHNlc3Npb25wYXJ0LFxuICAgICAgICAgICdhPWljZS1saXRlJykubGVuZ3RoID4gMDtcbiAgICAgIHNlY3Rpb25zLmZvckVhY2goZnVuY3Rpb24obWVkaWFTZWN0aW9uLCBzZHBNTGluZUluZGV4KSB7XG4gICAgICAgIHZhciB0cmFuc2NlaXZlciA9IHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XTtcbiAgICAgICAgdmFyIGljZUdhdGhlcmVyID0gdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXI7XG4gICAgICAgIHZhciBpY2VUcmFuc3BvcnQgPSB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQ7XG4gICAgICAgIHZhciBkdGxzVHJhbnNwb3J0ID0gdHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydDtcbiAgICAgICAgdmFyIGxvY2FsQ2FwYWJpbGl0aWVzID0gdHJhbnNjZWl2ZXIubG9jYWxDYXBhYmlsaXRpZXM7XG4gICAgICAgIHZhciByZW1vdGVDYXBhYmlsaXRpZXMgPSB0cmFuc2NlaXZlci5yZW1vdGVDYXBhYmlsaXRpZXM7XG5cbiAgICAgICAgLy8gdHJlYXQgYnVuZGxlLW9ubHkgYXMgbm90LXJlamVjdGVkLlxuICAgICAgICB2YXIgcmVqZWN0ZWQgPSBTRFBVdGlscy5pc1JlamVjdGVkKG1lZGlhU2VjdGlvbikgJiZcbiAgICAgICAgICAgIFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9YnVuZGxlLW9ubHknKS5sZW5ndGggPT09IDA7XG5cbiAgICAgICAgaWYgKCFyZWplY3RlZCAmJiAhdHJhbnNjZWl2ZXIucmVqZWN0ZWQpIHtcbiAgICAgICAgICB2YXIgcmVtb3RlSWNlUGFyYW1ldGVycyA9IFNEUFV0aWxzLmdldEljZVBhcmFtZXRlcnMoXG4gICAgICAgICAgICAgIG1lZGlhU2VjdGlvbiwgc2Vzc2lvbnBhcnQpO1xuICAgICAgICAgIHZhciByZW1vdGVEdGxzUGFyYW1ldGVycyA9IFNEUFV0aWxzLmdldER0bHNQYXJhbWV0ZXJzKFxuICAgICAgICAgICAgICBtZWRpYVNlY3Rpb24sIHNlc3Npb25wYXJ0KTtcbiAgICAgICAgICBpZiAoaXNJY2VMaXRlKSB7XG4gICAgICAgICAgICByZW1vdGVEdGxzUGFyYW1ldGVycy5yb2xlID0gJ3NlcnZlcic7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCFwYy51c2luZ0J1bmRsZSB8fCBzZHBNTGluZUluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICBwYy5fZ2F0aGVyKHRyYW5zY2VpdmVyLm1pZCwgc2RwTUxpbmVJbmRleCk7XG4gICAgICAgICAgICBpZiAoaWNlVHJhbnNwb3J0LnN0YXRlID09PSAnbmV3Jykge1xuICAgICAgICAgICAgICBpY2VUcmFuc3BvcnQuc3RhcnQoaWNlR2F0aGVyZXIsIHJlbW90ZUljZVBhcmFtZXRlcnMsXG4gICAgICAgICAgICAgICAgICBpc0ljZUxpdGUgPyAnY29udHJvbGxpbmcnIDogJ2NvbnRyb2xsZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkdGxzVHJhbnNwb3J0LnN0YXRlID09PSAnbmV3Jykge1xuICAgICAgICAgICAgICBkdGxzVHJhbnNwb3J0LnN0YXJ0KHJlbW90ZUR0bHNQYXJhbWV0ZXJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBDYWxjdWxhdGUgaW50ZXJzZWN0aW9uIG9mIGNhcGFiaWxpdGllcy5cbiAgICAgICAgICB2YXIgcGFyYW1zID0gZ2V0Q29tbW9uQ2FwYWJpbGl0aWVzKGxvY2FsQ2FwYWJpbGl0aWVzLFxuICAgICAgICAgICAgICByZW1vdGVDYXBhYmlsaXRpZXMpO1xuXG4gICAgICAgICAgLy8gU3RhcnQgdGhlIFJUQ1J0cFNlbmRlci4gVGhlIFJUQ1J0cFJlY2VpdmVyIGZvciB0aGlzXG4gICAgICAgICAgLy8gdHJhbnNjZWl2ZXIgaGFzIGFscmVhZHkgYmVlbiBzdGFydGVkIGluIHNldFJlbW90ZURlc2NyaXB0aW9uLlxuICAgICAgICAgIHBjLl90cmFuc2NlaXZlKHRyYW5zY2VpdmVyLFxuICAgICAgICAgICAgICBwYXJhbXMuY29kZWNzLmxlbmd0aCA+IDAsXG4gICAgICAgICAgICAgIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcGMubG9jYWxEZXNjcmlwdGlvbiA9IHtcbiAgICAgIHR5cGU6IGRlc2NyaXB0aW9uLnR5cGUsXG4gICAgICBzZHA6IGRlc2NyaXB0aW9uLnNkcFxuICAgIH07XG4gICAgaWYgKGRlc2NyaXB0aW9uLnR5cGUgPT09ICdvZmZlcicpIHtcbiAgICAgIHBjLl91cGRhdGVTaWduYWxpbmdTdGF0ZSgnaGF2ZS1sb2NhbC1vZmZlcicpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYy5fdXBkYXRlU2lnbmFsaW5nU3RhdGUoJ3N0YWJsZScpO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0UmVtb3RlRGVzY3JpcHRpb24gPSBmdW5jdGlvbihkZXNjcmlwdGlvbikge1xuICAgIHZhciBwYyA9IHRoaXM7XG5cbiAgICAvLyBOb3RlOiBwcmFuc3dlciBpcyBub3Qgc3VwcG9ydGVkLlxuICAgIGlmIChbJ29mZmVyJywgJ2Fuc3dlciddLmluZGV4T2YoZGVzY3JpcHRpb24udHlwZSkgPT09IC0xKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobWFrZUVycm9yKCdUeXBlRXJyb3InLFxuICAgICAgICAgICdVbnN1cHBvcnRlZCB0eXBlIFwiJyArIGRlc2NyaXB0aW9uLnR5cGUgKyAnXCInKSk7XG4gICAgfVxuXG4gICAgaWYgKCFpc0FjdGlvbkFsbG93ZWRJblNpZ25hbGluZ1N0YXRlKCdzZXRSZW1vdGVEZXNjcmlwdGlvbicsXG4gICAgICAgIGRlc2NyaXB0aW9uLnR5cGUsIHBjLnNpZ25hbGluZ1N0YXRlKSB8fCBwYy5faXNDbG9zZWQpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChtYWtlRXJyb3IoJ0ludmFsaWRTdGF0ZUVycm9yJyxcbiAgICAgICAgICAnQ2FuIG5vdCBzZXQgcmVtb3RlICcgKyBkZXNjcmlwdGlvbi50eXBlICtcbiAgICAgICAgICAnIGluIHN0YXRlICcgKyBwYy5zaWduYWxpbmdTdGF0ZSkpO1xuICAgIH1cblxuICAgIHZhciBzdHJlYW1zID0ge307XG4gICAgcGMucmVtb3RlU3RyZWFtcy5mb3JFYWNoKGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgc3RyZWFtc1tzdHJlYW0uaWRdID0gc3RyZWFtO1xuICAgIH0pO1xuICAgIHZhciByZWNlaXZlckxpc3QgPSBbXTtcbiAgICB2YXIgc2VjdGlvbnMgPSBTRFBVdGlscy5zcGxpdFNlY3Rpb25zKGRlc2NyaXB0aW9uLnNkcCk7XG4gICAgdmFyIHNlc3Npb25wYXJ0ID0gc2VjdGlvbnMuc2hpZnQoKTtcbiAgICB2YXIgaXNJY2VMaXRlID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgoc2Vzc2lvbnBhcnQsXG4gICAgICAgICdhPWljZS1saXRlJykubGVuZ3RoID4gMDtcbiAgICB2YXIgdXNpbmdCdW5kbGUgPSBTRFBVdGlscy5tYXRjaFByZWZpeChzZXNzaW9ucGFydCxcbiAgICAgICAgJ2E9Z3JvdXA6QlVORExFICcpLmxlbmd0aCA+IDA7XG4gICAgcGMudXNpbmdCdW5kbGUgPSB1c2luZ0J1bmRsZTtcbiAgICB2YXIgaWNlT3B0aW9ucyA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KHNlc3Npb25wYXJ0LFxuICAgICAgICAnYT1pY2Utb3B0aW9uczonKVswXTtcbiAgICBpZiAoaWNlT3B0aW9ucykge1xuICAgICAgcGMuY2FuVHJpY2tsZUljZUNhbmRpZGF0ZXMgPSBpY2VPcHRpb25zLnN1YnN0cigxNCkuc3BsaXQoJyAnKVxuICAgICAgICAgIC5pbmRleE9mKCd0cmlja2xlJykgPj0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgcGMuY2FuVHJpY2tsZUljZUNhbmRpZGF0ZXMgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBzZWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKG1lZGlhU2VjdGlvbiwgc2RwTUxpbmVJbmRleCkge1xuICAgICAgdmFyIGxpbmVzID0gU0RQVXRpbHMuc3BsaXRMaW5lcyhtZWRpYVNlY3Rpb24pO1xuICAgICAgdmFyIGtpbmQgPSBTRFBVdGlscy5nZXRLaW5kKG1lZGlhU2VjdGlvbik7XG4gICAgICAvLyB0cmVhdCBidW5kbGUtb25seSBhcyBub3QtcmVqZWN0ZWQuXG4gICAgICB2YXIgcmVqZWN0ZWQgPSBTRFBVdGlscy5pc1JlamVjdGVkKG1lZGlhU2VjdGlvbikgJiZcbiAgICAgICAgICBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPWJ1bmRsZS1vbmx5JykubGVuZ3RoID09PSAwO1xuICAgICAgdmFyIHByb3RvY29sID0gbGluZXNbMF0uc3Vic3RyKDIpLnNwbGl0KCcgJylbMl07XG5cbiAgICAgIHZhciBkaXJlY3Rpb24gPSBTRFBVdGlscy5nZXREaXJlY3Rpb24obWVkaWFTZWN0aW9uLCBzZXNzaW9ucGFydCk7XG4gICAgICB2YXIgcmVtb3RlTXNpZCA9IFNEUFV0aWxzLnBhcnNlTXNpZChtZWRpYVNlY3Rpb24pO1xuXG4gICAgICB2YXIgbWlkID0gU0RQVXRpbHMuZ2V0TWlkKG1lZGlhU2VjdGlvbikgfHwgU0RQVXRpbHMuZ2VuZXJhdGVJZGVudGlmaWVyKCk7XG5cbiAgICAgIC8vIFJlamVjdCBkYXRhY2hhbm5lbHMgd2hpY2ggYXJlIG5vdCBpbXBsZW1lbnRlZCB5ZXQuXG4gICAgICBpZiAoKGtpbmQgPT09ICdhcHBsaWNhdGlvbicgJiYgcHJvdG9jb2wgPT09ICdEVExTL1NDVFAnKSB8fCByZWplY3RlZCkge1xuICAgICAgICAvLyBUT0RPOiB0aGlzIGlzIGRhbmdlcm91cyBpbiB0aGUgY2FzZSB3aGVyZSBhIG5vbi1yZWplY3RlZCBtLWxpbmVcbiAgICAgICAgLy8gICAgIGJlY29tZXMgcmVqZWN0ZWQuXG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XSA9IHtcbiAgICAgICAgICBtaWQ6IG1pZCxcbiAgICAgICAgICBraW5kOiBraW5kLFxuICAgICAgICAgIHJlamVjdGVkOiB0cnVlXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKCFyZWplY3RlZCAmJiBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0gJiZcbiAgICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0ucmVqZWN0ZWQpIHtcbiAgICAgICAgLy8gcmVjeWNsZSBhIHJlamVjdGVkIHRyYW5zY2VpdmVyLlxuICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0gPSBwYy5fY3JlYXRlVHJhbnNjZWl2ZXIoa2luZCwgdHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIHZhciB0cmFuc2NlaXZlcjtcbiAgICAgIHZhciBpY2VHYXRoZXJlcjtcbiAgICAgIHZhciBpY2VUcmFuc3BvcnQ7XG4gICAgICB2YXIgZHRsc1RyYW5zcG9ydDtcbiAgICAgIHZhciBydHBSZWNlaXZlcjtcbiAgICAgIHZhciBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzO1xuICAgICAgdmFyIHJlY3ZFbmNvZGluZ1BhcmFtZXRlcnM7XG4gICAgICB2YXIgbG9jYWxDYXBhYmlsaXRpZXM7XG5cbiAgICAgIHZhciB0cmFjaztcbiAgICAgIC8vIEZJWE1FOiBlbnN1cmUgdGhlIG1lZGlhU2VjdGlvbiBoYXMgcnRjcC1tdXggc2V0LlxuICAgICAgdmFyIHJlbW90ZUNhcGFiaWxpdGllcyA9IFNEUFV0aWxzLnBhcnNlUnRwUGFyYW1ldGVycyhtZWRpYVNlY3Rpb24pO1xuICAgICAgdmFyIHJlbW90ZUljZVBhcmFtZXRlcnM7XG4gICAgICB2YXIgcmVtb3RlRHRsc1BhcmFtZXRlcnM7XG4gICAgICBpZiAoIXJlamVjdGVkKSB7XG4gICAgICAgIHJlbW90ZUljZVBhcmFtZXRlcnMgPSBTRFBVdGlscy5nZXRJY2VQYXJhbWV0ZXJzKG1lZGlhU2VjdGlvbixcbiAgICAgICAgICAgIHNlc3Npb25wYXJ0KTtcbiAgICAgICAgcmVtb3RlRHRsc1BhcmFtZXRlcnMgPSBTRFBVdGlscy5nZXREdGxzUGFyYW1ldGVycyhtZWRpYVNlY3Rpb24sXG4gICAgICAgICAgICBzZXNzaW9ucGFydCk7XG4gICAgICAgIHJlbW90ZUR0bHNQYXJhbWV0ZXJzLnJvbGUgPSAnY2xpZW50JztcbiAgICAgIH1cbiAgICAgIHJlY3ZFbmNvZGluZ1BhcmFtZXRlcnMgPVxuICAgICAgICAgIFNEUFV0aWxzLnBhcnNlUnRwRW5jb2RpbmdQYXJhbWV0ZXJzKG1lZGlhU2VjdGlvbik7XG5cbiAgICAgIHZhciBydGNwUGFyYW1ldGVycyA9IFNEUFV0aWxzLnBhcnNlUnRjcFBhcmFtZXRlcnMobWVkaWFTZWN0aW9uKTtcblxuICAgICAgdmFyIGlzQ29tcGxldGUgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sXG4gICAgICAgICAgJ2E9ZW5kLW9mLWNhbmRpZGF0ZXMnLCBzZXNzaW9ucGFydCkubGVuZ3RoID4gMDtcbiAgICAgIHZhciBjYW5kcyA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9Y2FuZGlkYXRlOicpXG4gICAgICAgICAgLm1hcChmdW5jdGlvbihjYW5kKSB7XG4gICAgICAgICAgICByZXR1cm4gU0RQVXRpbHMucGFyc2VDYW5kaWRhdGUoY2FuZCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uKGNhbmQpIHtcbiAgICAgICAgICAgIHJldHVybiBjYW5kLmNvbXBvbmVudCA9PT0gMTtcbiAgICAgICAgICB9KTtcblxuICAgICAgLy8gQ2hlY2sgaWYgd2UgY2FuIHVzZSBCVU5ETEUgYW5kIGRpc3Bvc2UgdHJhbnNwb3J0cy5cbiAgICAgIGlmICgoZGVzY3JpcHRpb24udHlwZSA9PT0gJ29mZmVyJyB8fCBkZXNjcmlwdGlvbi50eXBlID09PSAnYW5zd2VyJykgJiZcbiAgICAgICAgICAhcmVqZWN0ZWQgJiYgdXNpbmdCdW5kbGUgJiYgc2RwTUxpbmVJbmRleCA+IDAgJiZcbiAgICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0pIHtcbiAgICAgICAgcGMuX2Rpc3Bvc2VJY2VBbmREdGxzVHJhbnNwb3J0cyhzZHBNTGluZUluZGV4KTtcbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmljZUdhdGhlcmVyID1cbiAgICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1swXS5pY2VHYXRoZXJlcjtcbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmljZVRyYW5zcG9ydCA9XG4gICAgICAgICAgICBwYy50cmFuc2NlaXZlcnNbMF0uaWNlVHJhbnNwb3J0O1xuICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uZHRsc1RyYW5zcG9ydCA9XG4gICAgICAgICAgICBwYy50cmFuc2NlaXZlcnNbMF0uZHRsc1RyYW5zcG9ydDtcbiAgICAgICAgaWYgKHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5ydHBTZW5kZXIpIHtcbiAgICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0ucnRwU2VuZGVyLnNldFRyYW5zcG9ydChcbiAgICAgICAgICAgICAgcGMudHJhbnNjZWl2ZXJzWzBdLmR0bHNUcmFuc3BvcnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0ucnRwUmVjZWl2ZXIpIHtcbiAgICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0ucnRwUmVjZWl2ZXIuc2V0VHJhbnNwb3J0KFxuICAgICAgICAgICAgICBwYy50cmFuc2NlaXZlcnNbMF0uZHRsc1RyYW5zcG9ydCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChkZXNjcmlwdGlvbi50eXBlID09PSAnb2ZmZXInICYmICFyZWplY3RlZCkge1xuICAgICAgICB0cmFuc2NlaXZlciA9IHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XSB8fFxuICAgICAgICAgICAgcGMuX2NyZWF0ZVRyYW5zY2VpdmVyKGtpbmQpO1xuICAgICAgICB0cmFuc2NlaXZlci5taWQgPSBtaWQ7XG5cbiAgICAgICAgaWYgKCF0cmFuc2NlaXZlci5pY2VHYXRoZXJlcikge1xuICAgICAgICAgIHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyID0gcGMuX2NyZWF0ZUljZUdhdGhlcmVyKHNkcE1MaW5lSW5kZXgsXG4gICAgICAgICAgICAgIHVzaW5nQnVuZGxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjYW5kcy5sZW5ndGggJiYgdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LnN0YXRlID09PSAnbmV3Jykge1xuICAgICAgICAgIGlmIChpc0NvbXBsZXRlICYmICghdXNpbmdCdW5kbGUgfHwgc2RwTUxpbmVJbmRleCA9PT0gMCkpIHtcbiAgICAgICAgICAgIHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydC5zZXRSZW1vdGVDYW5kaWRhdGVzKGNhbmRzKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FuZHMuZm9yRWFjaChmdW5jdGlvbihjYW5kaWRhdGUpIHtcbiAgICAgICAgICAgICAgbWF5YmVBZGRDYW5kaWRhdGUodHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LCBjYW5kaWRhdGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbG9jYWxDYXBhYmlsaXRpZXMgPSB3aW5kb3cuUlRDUnRwUmVjZWl2ZXIuZ2V0Q2FwYWJpbGl0aWVzKGtpbmQpO1xuXG4gICAgICAgIC8vIGZpbHRlciBSVFggdW50aWwgYWRkaXRpb25hbCBzdHVmZiBuZWVkZWQgZm9yIFJUWCBpcyBpbXBsZW1lbnRlZFxuICAgICAgICAvLyBpbiBhZGFwdGVyLmpzXG4gICAgICAgIGlmIChlZGdlVmVyc2lvbiA8IDE1MDE5KSB7XG4gICAgICAgICAgbG9jYWxDYXBhYmlsaXRpZXMuY29kZWNzID0gbG9jYWxDYXBhYmlsaXRpZXMuY29kZWNzLmZpbHRlcihcbiAgICAgICAgICAgICAgZnVuY3Rpb24oY29kZWMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29kZWMubmFtZSAhPT0gJ3J0eCc7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VuZEVuY29kaW5nUGFyYW1ldGVycyA9IHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnMgfHwgW3tcbiAgICAgICAgICBzc3JjOiAoMiAqIHNkcE1MaW5lSW5kZXggKyAyKSAqIDEwMDFcbiAgICAgICAgfV07XG5cbiAgICAgICAgLy8gVE9ETzogcmV3cml0ZSB0byB1c2UgaHR0cDovL3czYy5naXRodWIuaW8vd2VicnRjLXBjLyNzZXQtYXNzb2NpYXRlZC1yZW1vdGUtc3RyZWFtc1xuICAgICAgICB2YXIgaXNOZXdUcmFjayA9IGZhbHNlO1xuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAnc2VuZHJlY3YnIHx8IGRpcmVjdGlvbiA9PT0gJ3NlbmRvbmx5Jykge1xuICAgICAgICAgIGlzTmV3VHJhY2sgPSAhdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXI7XG4gICAgICAgICAgcnRwUmVjZWl2ZXIgPSB0cmFuc2NlaXZlci5ydHBSZWNlaXZlciB8fFxuICAgICAgICAgICAgICBuZXcgd2luZG93LlJUQ1J0cFJlY2VpdmVyKHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQsIGtpbmQpO1xuXG4gICAgICAgICAgaWYgKGlzTmV3VHJhY2spIHtcbiAgICAgICAgICAgIHZhciBzdHJlYW07XG4gICAgICAgICAgICB0cmFjayA9IHJ0cFJlY2VpdmVyLnRyYWNrO1xuICAgICAgICAgICAgLy8gRklYTUU6IGRvZXMgbm90IHdvcmsgd2l0aCBQbGFuIEIuXG4gICAgICAgICAgICBpZiAocmVtb3RlTXNpZCAmJiByZW1vdGVNc2lkLnN0cmVhbSA9PT0gJy0nKSB7XG4gICAgICAgICAgICAgIC8vIG5vLW9wLiBhIHN0cmVhbSBpZCBvZiAnLScgbWVhbnM6IG5vIGFzc29jaWF0ZWQgc3RyZWFtLlxuICAgICAgICAgICAgfSBlbHNlIGlmIChyZW1vdGVNc2lkKSB7XG4gICAgICAgICAgICAgIGlmICghc3RyZWFtc1tyZW1vdGVNc2lkLnN0cmVhbV0pIHtcbiAgICAgICAgICAgICAgICBzdHJlYW1zW3JlbW90ZU1zaWQuc3RyZWFtXSA9IG5ldyB3aW5kb3cuTWVkaWFTdHJlYW0oKTtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc3RyZWFtc1tyZW1vdGVNc2lkLnN0cmVhbV0sICdpZCcsIHtcbiAgICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZW1vdGVNc2lkLnN0cmVhbTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodHJhY2ssICdpZCcsIHtcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlbW90ZU1zaWQudHJhY2s7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgc3RyZWFtID0gc3RyZWFtc1tyZW1vdGVNc2lkLnN0cmVhbV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoIXN0cmVhbXMuZGVmYXVsdCkge1xuICAgICAgICAgICAgICAgIHN0cmVhbXMuZGVmYXVsdCA9IG5ldyB3aW5kb3cuTWVkaWFTdHJlYW0oKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzdHJlYW0gPSBzdHJlYW1zLmRlZmF1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3RyZWFtKSB7XG4gICAgICAgICAgICAgIGFkZFRyYWNrVG9TdHJlYW1BbmRGaXJlRXZlbnQodHJhY2ssIHN0cmVhbSk7XG4gICAgICAgICAgICAgIHRyYW5zY2VpdmVyLmFzc29jaWF0ZWRSZW1vdGVNZWRpYVN0cmVhbXMucHVzaChzdHJlYW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVjZWl2ZXJMaXN0LnB1c2goW3RyYWNrLCBydHBSZWNlaXZlciwgc3RyZWFtXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyICYmIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyLnRyYWNrKSB7XG4gICAgICAgICAgdHJhbnNjZWl2ZXIuYXNzb2NpYXRlZFJlbW90ZU1lZGlhU3RyZWFtcy5mb3JFYWNoKGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgICAgIHZhciBuYXRpdmVUcmFjayA9IHMuZ2V0VHJhY2tzKCkuZmluZChmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICAgIHJldHVybiB0LmlkID09PSB0cmFuc2NlaXZlci5ydHBSZWNlaXZlci50cmFjay5pZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKG5hdGl2ZVRyYWNrKSB7XG4gICAgICAgICAgICAgIHJlbW92ZVRyYWNrRnJvbVN0cmVhbUFuZEZpcmVFdmVudChuYXRpdmVUcmFjaywgcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdHJhbnNjZWl2ZXIuYXNzb2NpYXRlZFJlbW90ZU1lZGlhU3RyZWFtcyA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJhbnNjZWl2ZXIubG9jYWxDYXBhYmlsaXRpZXMgPSBsb2NhbENhcGFiaWxpdGllcztcbiAgICAgICAgdHJhbnNjZWl2ZXIucmVtb3RlQ2FwYWJpbGl0aWVzID0gcmVtb3RlQ2FwYWJpbGl0aWVzO1xuICAgICAgICB0cmFuc2NlaXZlci5ydHBSZWNlaXZlciA9IHJ0cFJlY2VpdmVyO1xuICAgICAgICB0cmFuc2NlaXZlci5ydGNwUGFyYW1ldGVycyA9IHJ0Y3BQYXJhbWV0ZXJzO1xuICAgICAgICB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzID0gc2VuZEVuY29kaW5nUGFyYW1ldGVycztcbiAgICAgICAgdHJhbnNjZWl2ZXIucmVjdkVuY29kaW5nUGFyYW1ldGVycyA9IHJlY3ZFbmNvZGluZ1BhcmFtZXRlcnM7XG5cbiAgICAgICAgLy8gU3RhcnQgdGhlIFJUQ1J0cFJlY2VpdmVyIG5vdy4gVGhlIFJUUFNlbmRlciBpcyBzdGFydGVkIGluXG4gICAgICAgIC8vIHNldExvY2FsRGVzY3JpcHRpb24uXG4gICAgICAgIHBjLl90cmFuc2NlaXZlKHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XSxcbiAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgaXNOZXdUcmFjayk7XG4gICAgICB9IGVsc2UgaWYgKGRlc2NyaXB0aW9uLnR5cGUgPT09ICdhbnN3ZXInICYmICFyZWplY3RlZCkge1xuICAgICAgICB0cmFuc2NlaXZlciA9IHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XTtcbiAgICAgICAgaWNlR2F0aGVyZXIgPSB0cmFuc2NlaXZlci5pY2VHYXRoZXJlcjtcbiAgICAgICAgaWNlVHJhbnNwb3J0ID0gdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0O1xuICAgICAgICBkdGxzVHJhbnNwb3J0ID0gdHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydDtcbiAgICAgICAgcnRwUmVjZWl2ZXIgPSB0cmFuc2NlaXZlci5ydHBSZWNlaXZlcjtcbiAgICAgICAgc2VuZEVuY29kaW5nUGFyYW1ldGVycyA9IHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnM7XG4gICAgICAgIGxvY2FsQ2FwYWJpbGl0aWVzID0gdHJhbnNjZWl2ZXIubG9jYWxDYXBhYmlsaXRpZXM7XG5cbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLnJlY3ZFbmNvZGluZ1BhcmFtZXRlcnMgPVxuICAgICAgICAgICAgcmVjdkVuY29kaW5nUGFyYW1ldGVycztcbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLnJlbW90ZUNhcGFiaWxpdGllcyA9XG4gICAgICAgICAgICByZW1vdGVDYXBhYmlsaXRpZXM7XG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5ydGNwUGFyYW1ldGVycyA9IHJ0Y3BQYXJhbWV0ZXJzO1xuXG4gICAgICAgIGlmIChjYW5kcy5sZW5ndGggJiYgaWNlVHJhbnNwb3J0LnN0YXRlID09PSAnbmV3Jykge1xuICAgICAgICAgIGlmICgoaXNJY2VMaXRlIHx8IGlzQ29tcGxldGUpICYmXG4gICAgICAgICAgICAgICghdXNpbmdCdW5kbGUgfHwgc2RwTUxpbmVJbmRleCA9PT0gMCkpIHtcbiAgICAgICAgICAgIGljZVRyYW5zcG9ydC5zZXRSZW1vdGVDYW5kaWRhdGVzKGNhbmRzKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FuZHMuZm9yRWFjaChmdW5jdGlvbihjYW5kaWRhdGUpIHtcbiAgICAgICAgICAgICAgbWF5YmVBZGRDYW5kaWRhdGUodHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LCBjYW5kaWRhdGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF1c2luZ0J1bmRsZSB8fCBzZHBNTGluZUluZGV4ID09PSAwKSB7XG4gICAgICAgICAgaWYgKGljZVRyYW5zcG9ydC5zdGF0ZSA9PT0gJ25ldycpIHtcbiAgICAgICAgICAgIGljZVRyYW5zcG9ydC5zdGFydChpY2VHYXRoZXJlciwgcmVtb3RlSWNlUGFyYW1ldGVycyxcbiAgICAgICAgICAgICAgICAnY29udHJvbGxpbmcnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGR0bHNUcmFuc3BvcnQuc3RhdGUgPT09ICduZXcnKSB7XG4gICAgICAgICAgICBkdGxzVHJhbnNwb3J0LnN0YXJ0KHJlbW90ZUR0bHNQYXJhbWV0ZXJzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwYy5fdHJhbnNjZWl2ZSh0cmFuc2NlaXZlcixcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9PT0gJ3NlbmRyZWN2JyB8fCBkaXJlY3Rpb24gPT09ICdyZWN2b25seScsXG4gICAgICAgICAgICBkaXJlY3Rpb24gPT09ICdzZW5kcmVjdicgfHwgZGlyZWN0aW9uID09PSAnc2VuZG9ubHknKTtcblxuICAgICAgICAvLyBUT0RPOiByZXdyaXRlIHRvIHVzZSBodHRwOi8vdzNjLmdpdGh1Yi5pby93ZWJydGMtcGMvI3NldC1hc3NvY2lhdGVkLXJlbW90ZS1zdHJlYW1zXG4gICAgICAgIGlmIChydHBSZWNlaXZlciAmJlxuICAgICAgICAgICAgKGRpcmVjdGlvbiA9PT0gJ3NlbmRyZWN2JyB8fCBkaXJlY3Rpb24gPT09ICdzZW5kb25seScpKSB7XG4gICAgICAgICAgdHJhY2sgPSBydHBSZWNlaXZlci50cmFjaztcbiAgICAgICAgICBpZiAocmVtb3RlTXNpZCkge1xuICAgICAgICAgICAgaWYgKCFzdHJlYW1zW3JlbW90ZU1zaWQuc3RyZWFtXSkge1xuICAgICAgICAgICAgICBzdHJlYW1zW3JlbW90ZU1zaWQuc3RyZWFtXSA9IG5ldyB3aW5kb3cuTWVkaWFTdHJlYW0oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFkZFRyYWNrVG9TdHJlYW1BbmRGaXJlRXZlbnQodHJhY2ssIHN0cmVhbXNbcmVtb3RlTXNpZC5zdHJlYW1dKTtcbiAgICAgICAgICAgIHJlY2VpdmVyTGlzdC5wdXNoKFt0cmFjaywgcnRwUmVjZWl2ZXIsIHN0cmVhbXNbcmVtb3RlTXNpZC5zdHJlYW1dXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghc3RyZWFtcy5kZWZhdWx0KSB7XG4gICAgICAgICAgICAgIHN0cmVhbXMuZGVmYXVsdCA9IG5ldyB3aW5kb3cuTWVkaWFTdHJlYW0oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFkZFRyYWNrVG9TdHJlYW1BbmRGaXJlRXZlbnQodHJhY2ssIHN0cmVhbXMuZGVmYXVsdCk7XG4gICAgICAgICAgICByZWNlaXZlckxpc3QucHVzaChbdHJhY2ssIHJ0cFJlY2VpdmVyLCBzdHJlYW1zLmRlZmF1bHRdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gRklYTUU6IGFjdHVhbGx5IHRoZSByZWNlaXZlciBzaG91bGQgYmUgY3JlYXRlZCBsYXRlci5cbiAgICAgICAgICBkZWxldGUgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChwYy5fZHRsc1JvbGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcGMuX2R0bHNSb2xlID0gZGVzY3JpcHRpb24udHlwZSA9PT0gJ29mZmVyJyA/ICdhY3RpdmUnIDogJ3Bhc3NpdmUnO1xuICAgIH1cblxuICAgIHBjLnJlbW90ZURlc2NyaXB0aW9uID0ge1xuICAgICAgdHlwZTogZGVzY3JpcHRpb24udHlwZSxcbiAgICAgIHNkcDogZGVzY3JpcHRpb24uc2RwXG4gICAgfTtcbiAgICBpZiAoZGVzY3JpcHRpb24udHlwZSA9PT0gJ29mZmVyJykge1xuICAgICAgcGMuX3VwZGF0ZVNpZ25hbGluZ1N0YXRlKCdoYXZlLXJlbW90ZS1vZmZlcicpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYy5fdXBkYXRlU2lnbmFsaW5nU3RhdGUoJ3N0YWJsZScpO1xuICAgIH1cbiAgICBPYmplY3Qua2V5cyhzdHJlYW1zKS5mb3JFYWNoKGZ1bmN0aW9uKHNpZCkge1xuICAgICAgdmFyIHN0cmVhbSA9IHN0cmVhbXNbc2lkXTtcbiAgICAgIGlmIChzdHJlYW0uZ2V0VHJhY2tzKCkubGVuZ3RoKSB7XG4gICAgICAgIGlmIChwYy5yZW1vdGVTdHJlYW1zLmluZGV4T2Yoc3RyZWFtKSA9PT0gLTEpIHtcbiAgICAgICAgICBwYy5yZW1vdGVTdHJlYW1zLnB1c2goc3RyZWFtKTtcbiAgICAgICAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ2FkZHN0cmVhbScpO1xuICAgICAgICAgIGV2ZW50LnN0cmVhbSA9IHN0cmVhbTtcbiAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHBjLl9kaXNwYXRjaEV2ZW50KCdhZGRzdHJlYW0nLCBldmVudCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZWNlaXZlckxpc3QuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgdmFyIHRyYWNrID0gaXRlbVswXTtcbiAgICAgICAgICB2YXIgcmVjZWl2ZXIgPSBpdGVtWzFdO1xuICAgICAgICAgIGlmIChzdHJlYW0uaWQgIT09IGl0ZW1bMl0uaWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZmlyZUFkZFRyYWNrKHBjLCB0cmFjaywgcmVjZWl2ZXIsIFtzdHJlYW1dKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmVjZWl2ZXJMaXN0LmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZmlyZUFkZFRyYWNrKHBjLCBpdGVtWzBdLCBpdGVtWzFdLCBbXSk7XG4gICAgfSk7XG5cbiAgICAvLyBjaGVjayB3aGV0aGVyIGFkZEljZUNhbmRpZGF0ZSh7fSkgd2FzIGNhbGxlZCB3aXRoaW4gZm91ciBzZWNvbmRzIGFmdGVyXG4gICAgLy8gc2V0UmVtb3RlRGVzY3JpcHRpb24uXG4gICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIShwYyAmJiBwYy50cmFuc2NlaXZlcnMpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHBjLnRyYW5zY2VpdmVycy5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XG4gICAgICAgIGlmICh0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQgJiZcbiAgICAgICAgICAgIHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydC5zdGF0ZSA9PT0gJ25ldycgJiZcbiAgICAgICAgICAgIHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydC5nZXRSZW1vdGVDYW5kaWRhdGVzKCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGNvbnNvbGUud2FybignVGltZW91dCBmb3IgYWRkUmVtb3RlQ2FuZGlkYXRlLiBDb25zaWRlciBzZW5kaW5nICcgK1xuICAgICAgICAgICAgICAnYW4gZW5kLW9mLWNhbmRpZGF0ZXMgbm90aWZpY2F0aW9uJyk7XG4gICAgICAgICAgdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LmFkZFJlbW90ZUNhbmRpZGF0ZSh7fSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIDQwMDApO1xuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcbiAgICAgIC8qIG5vdCB5ZXRcbiAgICAgIGlmICh0cmFuc2NlaXZlci5pY2VHYXRoZXJlcikge1xuICAgICAgICB0cmFuc2NlaXZlci5pY2VHYXRoZXJlci5jbG9zZSgpO1xuICAgICAgfVxuICAgICAgKi9cbiAgICAgIGlmICh0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQpIHtcbiAgICAgICAgdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LnN0b3AoKTtcbiAgICAgIH1cbiAgICAgIGlmICh0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0KSB7XG4gICAgICAgIHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQuc3RvcCgpO1xuICAgICAgfVxuICAgICAgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlcikge1xuICAgICAgICB0cmFuc2NlaXZlci5ydHBTZW5kZXIuc3RvcCgpO1xuICAgICAgfVxuICAgICAgaWYgKHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyKSB7XG4gICAgICAgIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyLnN0b3AoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBGSVhNRTogY2xlYW4gdXAgdHJhY2tzLCBsb2NhbCBzdHJlYW1zLCByZW1vdGUgc3RyZWFtcywgZXRjXG4gICAgdGhpcy5faXNDbG9zZWQgPSB0cnVlO1xuICAgIHRoaXMuX3VwZGF0ZVNpZ25hbGluZ1N0YXRlKCdjbG9zZWQnKTtcbiAgfTtcblxuICAvLyBVcGRhdGUgdGhlIHNpZ25hbGluZyBzdGF0ZS5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl91cGRhdGVTaWduYWxpbmdTdGF0ZSA9IGZ1bmN0aW9uKG5ld1N0YXRlKSB7XG4gICAgdGhpcy5zaWduYWxpbmdTdGF0ZSA9IG5ld1N0YXRlO1xuICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgnc2lnbmFsaW5nc3RhdGVjaGFuZ2UnKTtcbiAgICB0aGlzLl9kaXNwYXRjaEV2ZW50KCdzaWduYWxpbmdzdGF0ZWNoYW5nZScsIGV2ZW50KTtcbiAgfTtcblxuICAvLyBEZXRlcm1pbmUgd2hldGhlciB0byBmaXJlIHRoZSBuZWdvdGlhdGlvbm5lZWRlZCBldmVudC5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl9tYXliZUZpcmVOZWdvdGlhdGlvbk5lZWRlZCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBwYyA9IHRoaXM7XG4gICAgaWYgKHRoaXMuc2lnbmFsaW5nU3RhdGUgIT09ICdzdGFibGUnIHx8IHRoaXMubmVlZE5lZ290aWF0aW9uID09PSB0cnVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMubmVlZE5lZ290aWF0aW9uID0gdHJ1ZTtcbiAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIGlmIChwYy5uZWVkTmVnb3RpYXRpb24pIHtcbiAgICAgICAgcGMubmVlZE5lZ290aWF0aW9uID0gZmFsc2U7XG4gICAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgnbmVnb3RpYXRpb25uZWVkZWQnKTtcbiAgICAgICAgcGMuX2Rpc3BhdGNoRXZlbnQoJ25lZ290aWF0aW9ubmVlZGVkJywgZXZlbnQpO1xuICAgICAgfVxuICAgIH0sIDApO1xuICB9O1xuXG4gIC8vIFVwZGF0ZSB0aGUgaWNlIGNvbm5lY3Rpb24gc3RhdGUuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fdXBkYXRlSWNlQ29ubmVjdGlvblN0YXRlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG5ld1N0YXRlO1xuICAgIHZhciBzdGF0ZXMgPSB7XG4gICAgICAnbmV3JzogMCxcbiAgICAgIGNsb3NlZDogMCxcbiAgICAgIGNoZWNraW5nOiAwLFxuICAgICAgY29ubmVjdGVkOiAwLFxuICAgICAgY29tcGxldGVkOiAwLFxuICAgICAgZGlzY29ubmVjdGVkOiAwLFxuICAgICAgZmFpbGVkOiAwXG4gICAgfTtcbiAgICB0aGlzLnRyYW5zY2VpdmVycy5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XG4gICAgICBzdGF0ZXNbdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LnN0YXRlXSsrO1xuICAgIH0pO1xuXG4gICAgbmV3U3RhdGUgPSAnbmV3JztcbiAgICBpZiAoc3RhdGVzLmZhaWxlZCA+IDApIHtcbiAgICAgIG5ld1N0YXRlID0gJ2ZhaWxlZCc7XG4gICAgfSBlbHNlIGlmIChzdGF0ZXMuY2hlY2tpbmcgPiAwKSB7XG4gICAgICBuZXdTdGF0ZSA9ICdjaGVja2luZyc7XG4gICAgfSBlbHNlIGlmIChzdGF0ZXMuZGlzY29ubmVjdGVkID4gMCkge1xuICAgICAgbmV3U3RhdGUgPSAnZGlzY29ubmVjdGVkJztcbiAgICB9IGVsc2UgaWYgKHN0YXRlcy5uZXcgPiAwKSB7XG4gICAgICBuZXdTdGF0ZSA9ICduZXcnO1xuICAgIH0gZWxzZSBpZiAoc3RhdGVzLmNvbm5lY3RlZCA+IDApIHtcbiAgICAgIG5ld1N0YXRlID0gJ2Nvbm5lY3RlZCc7XG4gICAgfSBlbHNlIGlmIChzdGF0ZXMuY29tcGxldGVkID4gMCkge1xuICAgICAgbmV3U3RhdGUgPSAnY29tcGxldGVkJztcbiAgICB9XG5cbiAgICBpZiAobmV3U3RhdGUgIT09IHRoaXMuaWNlQ29ubmVjdGlvblN0YXRlKSB7XG4gICAgICB0aGlzLmljZUNvbm5lY3Rpb25TdGF0ZSA9IG5ld1N0YXRlO1xuICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdpY2Vjb25uZWN0aW9uc3RhdGVjaGFuZ2UnKTtcbiAgICAgIHRoaXMuX2Rpc3BhdGNoRXZlbnQoJ2ljZWNvbm5lY3Rpb25zdGF0ZWNoYW5nZScsIGV2ZW50KTtcbiAgICB9XG4gIH07XG5cbiAgLy8gVXBkYXRlIHRoZSBjb25uZWN0aW9uIHN0YXRlLlxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX3VwZGF0ZUNvbm5lY3Rpb25TdGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBuZXdTdGF0ZTtcbiAgICB2YXIgc3RhdGVzID0ge1xuICAgICAgJ25ldyc6IDAsXG4gICAgICBjbG9zZWQ6IDAsXG4gICAgICBjb25uZWN0aW5nOiAwLFxuICAgICAgY29ubmVjdGVkOiAwLFxuICAgICAgY29tcGxldGVkOiAwLFxuICAgICAgZGlzY29ubmVjdGVkOiAwLFxuICAgICAgZmFpbGVkOiAwXG4gICAgfTtcbiAgICB0aGlzLnRyYW5zY2VpdmVycy5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XG4gICAgICBzdGF0ZXNbdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LnN0YXRlXSsrO1xuICAgICAgc3RhdGVzW3RyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQuc3RhdGVdKys7XG4gICAgfSk7XG4gICAgLy8gSUNFVHJhbnNwb3J0LmNvbXBsZXRlZCBhbmQgY29ubmVjdGVkIGFyZSB0aGUgc2FtZSBmb3IgdGhpcyBwdXJwb3NlLlxuICAgIHN0YXRlcy5jb25uZWN0ZWQgKz0gc3RhdGVzLmNvbXBsZXRlZDtcblxuICAgIG5ld1N0YXRlID0gJ25ldyc7XG4gICAgaWYgKHN0YXRlcy5mYWlsZWQgPiAwKSB7XG4gICAgICBuZXdTdGF0ZSA9ICdmYWlsZWQnO1xuICAgIH0gZWxzZSBpZiAoc3RhdGVzLmNvbm5lY3RpbmcgPiAwKSB7XG4gICAgICBuZXdTdGF0ZSA9ICdjb25uZWN0aW5nJztcbiAgICB9IGVsc2UgaWYgKHN0YXRlcy5kaXNjb25uZWN0ZWQgPiAwKSB7XG4gICAgICBuZXdTdGF0ZSA9ICdkaXNjb25uZWN0ZWQnO1xuICAgIH0gZWxzZSBpZiAoc3RhdGVzLm5ldyA+IDApIHtcbiAgICAgIG5ld1N0YXRlID0gJ25ldyc7XG4gICAgfSBlbHNlIGlmIChzdGF0ZXMuY29ubmVjdGVkID4gMCkge1xuICAgICAgbmV3U3RhdGUgPSAnY29ubmVjdGVkJztcbiAgICB9XG5cbiAgICBpZiAobmV3U3RhdGUgIT09IHRoaXMuY29ubmVjdGlvblN0YXRlKSB7XG4gICAgICB0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9IG5ld1N0YXRlO1xuICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdjb25uZWN0aW9uc3RhdGVjaGFuZ2UnKTtcbiAgICAgIHRoaXMuX2Rpc3BhdGNoRXZlbnQoJ2Nvbm5lY3Rpb25zdGF0ZWNoYW5nZScsIGV2ZW50KTtcbiAgICB9XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmNyZWF0ZU9mZmVyID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHBjID0gdGhpcztcblxuICAgIGlmIChwYy5faXNDbG9zZWQpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChtYWtlRXJyb3IoJ0ludmFsaWRTdGF0ZUVycm9yJyxcbiAgICAgICAgICAnQ2FuIG5vdCBjYWxsIGNyZWF0ZU9mZmVyIGFmdGVyIGNsb3NlJykpO1xuICAgIH1cblxuICAgIHZhciBudW1BdWRpb1RyYWNrcyA9IHBjLnRyYW5zY2VpdmVycy5maWx0ZXIoZnVuY3Rpb24odCkge1xuICAgICAgcmV0dXJuIHQua2luZCA9PT0gJ2F1ZGlvJztcbiAgICB9KS5sZW5ndGg7XG4gICAgdmFyIG51bVZpZGVvVHJhY2tzID0gcGMudHJhbnNjZWl2ZXJzLmZpbHRlcihmdW5jdGlvbih0KSB7XG4gICAgICByZXR1cm4gdC5raW5kID09PSAndmlkZW8nO1xuICAgIH0pLmxlbmd0aDtcblxuICAgIC8vIERldGVybWluZSBudW1iZXIgb2YgYXVkaW8gYW5kIHZpZGVvIHRyYWNrcyB3ZSBuZWVkIHRvIHNlbmQvcmVjdi5cbiAgICB2YXIgb2ZmZXJPcHRpb25zID0gYXJndW1lbnRzWzBdO1xuICAgIGlmIChvZmZlck9wdGlvbnMpIHtcbiAgICAgIC8vIFJlamVjdCBDaHJvbWUgbGVnYWN5IGNvbnN0cmFpbnRzLlxuICAgICAgaWYgKG9mZmVyT3B0aW9ucy5tYW5kYXRvcnkgfHwgb2ZmZXJPcHRpb25zLm9wdGlvbmFsKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgICAnTGVnYWN5IG1hbmRhdG9yeS9vcHRpb25hbCBjb25zdHJhaW50cyBub3Qgc3VwcG9ydGVkLicpO1xuICAgICAgfVxuICAgICAgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZUF1ZGlvICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZUF1ZGlvID09PSB0cnVlKSB7XG4gICAgICAgICAgbnVtQXVkaW9UcmFja3MgPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZUF1ZGlvID09PSBmYWxzZSkge1xuICAgICAgICAgIG51bUF1ZGlvVHJhY2tzID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBudW1BdWRpb1RyYWNrcyA9IG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZUF1ZGlvO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlVmlkZW8gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlVmlkZW8gPT09IHRydWUpIHtcbiAgICAgICAgICBudW1WaWRlb1RyYWNrcyA9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlVmlkZW8gPT09IGZhbHNlKSB7XG4gICAgICAgICAgbnVtVmlkZW9UcmFja3MgPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG51bVZpZGVvVHJhY2tzID0gb2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlVmlkZW87XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBwYy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xuICAgICAgaWYgKHRyYW5zY2VpdmVyLmtpbmQgPT09ICdhdWRpbycpIHtcbiAgICAgICAgbnVtQXVkaW9UcmFja3MtLTtcbiAgICAgICAgaWYgKG51bUF1ZGlvVHJhY2tzIDwgMCkge1xuICAgICAgICAgIHRyYW5zY2VpdmVyLndhbnRSZWNlaXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIua2luZCA9PT0gJ3ZpZGVvJykge1xuICAgICAgICBudW1WaWRlb1RyYWNrcy0tO1xuICAgICAgICBpZiAobnVtVmlkZW9UcmFja3MgPCAwKSB7XG4gICAgICAgICAgdHJhbnNjZWl2ZXIud2FudFJlY2VpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gQ3JlYXRlIE0tbGluZXMgZm9yIHJlY3Zvbmx5IHN0cmVhbXMuXG4gICAgd2hpbGUgKG51bUF1ZGlvVHJhY2tzID4gMCB8fCBudW1WaWRlb1RyYWNrcyA+IDApIHtcbiAgICAgIGlmIChudW1BdWRpb1RyYWNrcyA+IDApIHtcbiAgICAgICAgcGMuX2NyZWF0ZVRyYW5zY2VpdmVyKCdhdWRpbycpO1xuICAgICAgICBudW1BdWRpb1RyYWNrcy0tO1xuICAgICAgfVxuICAgICAgaWYgKG51bVZpZGVvVHJhY2tzID4gMCkge1xuICAgICAgICBwYy5fY3JlYXRlVHJhbnNjZWl2ZXIoJ3ZpZGVvJyk7XG4gICAgICAgIG51bVZpZGVvVHJhY2tzLS07XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHNkcCA9IFNEUFV0aWxzLndyaXRlU2Vzc2lvbkJvaWxlcnBsYXRlKHBjLl9zZHBTZXNzaW9uSWQsXG4gICAgICAgIHBjLl9zZHBTZXNzaW9uVmVyc2lvbisrKTtcbiAgICBwYy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlciwgc2RwTUxpbmVJbmRleCkge1xuICAgICAgLy8gRm9yIGVhY2ggdHJhY2ssIGNyZWF0ZSBhbiBpY2UgZ2F0aGVyZXIsIGljZSB0cmFuc3BvcnQsXG4gICAgICAvLyBkdGxzIHRyYW5zcG9ydCwgcG90ZW50aWFsbHkgcnRwc2VuZGVyIGFuZCBydHByZWNlaXZlci5cbiAgICAgIHZhciB0cmFjayA9IHRyYW5zY2VpdmVyLnRyYWNrO1xuICAgICAgdmFyIGtpbmQgPSB0cmFuc2NlaXZlci5raW5kO1xuICAgICAgdmFyIG1pZCA9IHRyYW5zY2VpdmVyLm1pZCB8fCBTRFBVdGlscy5nZW5lcmF0ZUlkZW50aWZpZXIoKTtcbiAgICAgIHRyYW5zY2VpdmVyLm1pZCA9IG1pZDtcblxuICAgICAgaWYgKCF0cmFuc2NlaXZlci5pY2VHYXRoZXJlcikge1xuICAgICAgICB0cmFuc2NlaXZlci5pY2VHYXRoZXJlciA9IHBjLl9jcmVhdGVJY2VHYXRoZXJlcihzZHBNTGluZUluZGV4LFxuICAgICAgICAgICAgcGMudXNpbmdCdW5kbGUpO1xuICAgICAgfVxuXG4gICAgICB2YXIgbG9jYWxDYXBhYmlsaXRpZXMgPSB3aW5kb3cuUlRDUnRwU2VuZGVyLmdldENhcGFiaWxpdGllcyhraW5kKTtcbiAgICAgIC8vIGZpbHRlciBSVFggdW50aWwgYWRkaXRpb25hbCBzdHVmZiBuZWVkZWQgZm9yIFJUWCBpcyBpbXBsZW1lbnRlZFxuICAgICAgLy8gaW4gYWRhcHRlci5qc1xuICAgICAgaWYgKGVkZ2VWZXJzaW9uIDwgMTUwMTkpIHtcbiAgICAgICAgbG9jYWxDYXBhYmlsaXRpZXMuY29kZWNzID0gbG9jYWxDYXBhYmlsaXRpZXMuY29kZWNzLmZpbHRlcihcbiAgICAgICAgICAgIGZ1bmN0aW9uKGNvZGVjKSB7XG4gICAgICAgICAgICAgIHJldHVybiBjb2RlYy5uYW1lICE9PSAncnR4JztcbiAgICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgbG9jYWxDYXBhYmlsaXRpZXMuY29kZWNzLmZvckVhY2goZnVuY3Rpb24oY29kZWMpIHtcbiAgICAgICAgLy8gd29yayBhcm91bmQgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3dlYnJ0Yy9pc3N1ZXMvZGV0YWlsP2lkPTY1NTJcbiAgICAgICAgLy8gYnkgYWRkaW5nIGxldmVsLWFzeW1tZXRyeS1hbGxvd2VkPTFcbiAgICAgICAgaWYgKGNvZGVjLm5hbWUgPT09ICdIMjY0JyAmJlxuICAgICAgICAgICAgY29kZWMucGFyYW1ldGVyc1snbGV2ZWwtYXN5bW1ldHJ5LWFsbG93ZWQnXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY29kZWMucGFyYW1ldGVyc1snbGV2ZWwtYXN5bW1ldHJ5LWFsbG93ZWQnXSA9ICcxJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZvciBzdWJzZXF1ZW50IG9mZmVycywgd2UgbWlnaHQgaGF2ZSB0byByZS11c2UgdGhlIHBheWxvYWRcbiAgICAgICAgLy8gdHlwZSBvZiB0aGUgbGFzdCBvZmZlci5cbiAgICAgICAgaWYgKHRyYW5zY2VpdmVyLnJlbW90ZUNhcGFiaWxpdGllcyAmJlxuICAgICAgICAgICAgdHJhbnNjZWl2ZXIucmVtb3RlQ2FwYWJpbGl0aWVzLmNvZGVjcykge1xuICAgICAgICAgIHRyYW5zY2VpdmVyLnJlbW90ZUNhcGFiaWxpdGllcy5jb2RlY3MuZm9yRWFjaChmdW5jdGlvbihyZW1vdGVDb2RlYykge1xuICAgICAgICAgICAgaWYgKGNvZGVjLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gcmVtb3RlQ29kZWMubmFtZS50b0xvd2VyQ2FzZSgpICYmXG4gICAgICAgICAgICAgICAgY29kZWMuY2xvY2tSYXRlID09PSByZW1vdGVDb2RlYy5jbG9ja1JhdGUpIHtcbiAgICAgICAgICAgICAgY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGUgPSByZW1vdGVDb2RlYy5wYXlsb2FkVHlwZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBsb2NhbENhcGFiaWxpdGllcy5oZWFkZXJFeHRlbnNpb25zLmZvckVhY2goZnVuY3Rpb24oaGRyRXh0KSB7XG4gICAgICAgIHZhciByZW1vdGVFeHRlbnNpb25zID0gdHJhbnNjZWl2ZXIucmVtb3RlQ2FwYWJpbGl0aWVzICYmXG4gICAgICAgICAgICB0cmFuc2NlaXZlci5yZW1vdGVDYXBhYmlsaXRpZXMuaGVhZGVyRXh0ZW5zaW9ucyB8fCBbXTtcbiAgICAgICAgcmVtb3RlRXh0ZW5zaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHJIZHJFeHQpIHtcbiAgICAgICAgICBpZiAoaGRyRXh0LnVyaSA9PT0gckhkckV4dC51cmkpIHtcbiAgICAgICAgICAgIGhkckV4dC5pZCA9IHJIZHJFeHQuaWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBnZW5lcmF0ZSBhbiBzc3JjIG5vdywgdG8gYmUgdXNlZCBsYXRlciBpbiBydHBTZW5kZXIuc2VuZFxuICAgICAgdmFyIHNlbmRFbmNvZGluZ1BhcmFtZXRlcnMgPSB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzIHx8IFt7XG4gICAgICAgIHNzcmM6ICgyICogc2RwTUxpbmVJbmRleCArIDEpICogMTAwMVxuICAgICAgfV07XG4gICAgICBpZiAodHJhY2spIHtcbiAgICAgICAgLy8gYWRkIFJUWFxuICAgICAgICBpZiAoZWRnZVZlcnNpb24gPj0gMTUwMTkgJiYga2luZCA9PT0gJ3ZpZGVvJyAmJlxuICAgICAgICAgICAgIXNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4KSB7XG4gICAgICAgICAgc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHggPSB7XG4gICAgICAgICAgICBzc3JjOiBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmMgKyAxXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodHJhbnNjZWl2ZXIud2FudFJlY2VpdmUpIHtcbiAgICAgICAgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIgPSBuZXcgd2luZG93LlJUQ1J0cFJlY2VpdmVyKFxuICAgICAgICAgICAgdHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydCwga2luZCk7XG4gICAgICB9XG5cbiAgICAgIHRyYW5zY2VpdmVyLmxvY2FsQ2FwYWJpbGl0aWVzID0gbG9jYWxDYXBhYmlsaXRpZXM7XG4gICAgICB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzID0gc2VuZEVuY29kaW5nUGFyYW1ldGVycztcbiAgICB9KTtcblxuICAgIC8vIGFsd2F5cyBvZmZlciBCVU5ETEUgYW5kIGRpc3Bvc2Ugb24gcmV0dXJuIGlmIG5vdCBzdXBwb3J0ZWQuXG4gICAgaWYgKHBjLl9jb25maWcuYnVuZGxlUG9saWN5ICE9PSAnbWF4LWNvbXBhdCcpIHtcbiAgICAgIHNkcCArPSAnYT1ncm91cDpCVU5ETEUgJyArIHBjLnRyYW5zY2VpdmVycy5tYXAoZnVuY3Rpb24odCkge1xuICAgICAgICByZXR1cm4gdC5taWQ7XG4gICAgICB9KS5qb2luKCcgJykgKyAnXFxyXFxuJztcbiAgICB9XG4gICAgc2RwICs9ICdhPWljZS1vcHRpb25zOnRyaWNrbGVcXHJcXG4nO1xuXG4gICAgcGMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIsIHNkcE1MaW5lSW5kZXgpIHtcbiAgICAgIHNkcCArPSB3cml0ZU1lZGlhU2VjdGlvbih0cmFuc2NlaXZlciwgdHJhbnNjZWl2ZXIubG9jYWxDYXBhYmlsaXRpZXMsXG4gICAgICAgICAgJ29mZmVyJywgdHJhbnNjZWl2ZXIuc3RyZWFtLCBwYy5fZHRsc1JvbGUpO1xuICAgICAgc2RwICs9ICdhPXJ0Y3AtcnNpemVcXHJcXG4nO1xuXG4gICAgICBpZiAodHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIgJiYgcGMuaWNlR2F0aGVyaW5nU3RhdGUgIT09ICduZXcnICYmXG4gICAgICAgICAgKHNkcE1MaW5lSW5kZXggPT09IDAgfHwgIXBjLnVzaW5nQnVuZGxlKSkge1xuICAgICAgICB0cmFuc2NlaXZlci5pY2VHYXRoZXJlci5nZXRMb2NhbENhbmRpZGF0ZXMoKS5mb3JFYWNoKGZ1bmN0aW9uKGNhbmQpIHtcbiAgICAgICAgICBjYW5kLmNvbXBvbmVudCA9IDE7XG4gICAgICAgICAgc2RwICs9ICdhPScgKyBTRFBVdGlscy53cml0ZUNhbmRpZGF0ZShjYW5kKSArICdcXHJcXG4nO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIuc3RhdGUgPT09ICdjb21wbGV0ZWQnKSB7XG4gICAgICAgICAgc2RwICs9ICdhPWVuZC1vZi1jYW5kaWRhdGVzXFxyXFxuJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIGRlc2MgPSBuZXcgd2luZG93LlJUQ1Nlc3Npb25EZXNjcmlwdGlvbih7XG4gICAgICB0eXBlOiAnb2ZmZXInLFxuICAgICAgc2RwOiBzZHBcbiAgICB9KTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRlc2MpO1xuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5jcmVhdGVBbnN3ZXIgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcGMgPSB0aGlzO1xuXG4gICAgaWYgKHBjLl9pc0Nsb3NlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG1ha2VFcnJvcignSW52YWxpZFN0YXRlRXJyb3InLFxuICAgICAgICAgICdDYW4gbm90IGNhbGwgY3JlYXRlQW5zd2VyIGFmdGVyIGNsb3NlJykpO1xuICAgIH1cblxuICAgIGlmICghKHBjLnNpZ25hbGluZ1N0YXRlID09PSAnaGF2ZS1yZW1vdGUtb2ZmZXInIHx8XG4gICAgICAgIHBjLnNpZ25hbGluZ1N0YXRlID09PSAnaGF2ZS1sb2NhbC1wcmFuc3dlcicpKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobWFrZUVycm9yKCdJbnZhbGlkU3RhdGVFcnJvcicsXG4gICAgICAgICAgJ0NhbiBub3QgY2FsbCBjcmVhdGVBbnN3ZXIgaW4gc2lnbmFsaW5nU3RhdGUgJyArIHBjLnNpZ25hbGluZ1N0YXRlKSk7XG4gICAgfVxuXG4gICAgdmFyIHNkcCA9IFNEUFV0aWxzLndyaXRlU2Vzc2lvbkJvaWxlcnBsYXRlKHBjLl9zZHBTZXNzaW9uSWQsXG4gICAgICAgIHBjLl9zZHBTZXNzaW9uVmVyc2lvbisrKTtcbiAgICBpZiAocGMudXNpbmdCdW5kbGUpIHtcbiAgICAgIHNkcCArPSAnYT1ncm91cDpCVU5ETEUgJyArIHBjLnRyYW5zY2VpdmVycy5tYXAoZnVuY3Rpb24odCkge1xuICAgICAgICByZXR1cm4gdC5taWQ7XG4gICAgICB9KS5qb2luKCcgJykgKyAnXFxyXFxuJztcbiAgICB9XG4gICAgdmFyIG1lZGlhU2VjdGlvbnNJbk9mZmVyID0gU0RQVXRpbHMuZ2V0TWVkaWFTZWN0aW9ucyhcbiAgICAgICAgcGMucmVtb3RlRGVzY3JpcHRpb24uc2RwKS5sZW5ndGg7XG4gICAgcGMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIsIHNkcE1MaW5lSW5kZXgpIHtcbiAgICAgIGlmIChzZHBNTGluZUluZGV4ICsgMSA+IG1lZGlhU2VjdGlvbnNJbk9mZmVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh0cmFuc2NlaXZlci5yZWplY3RlZCkge1xuICAgICAgICBpZiAodHJhbnNjZWl2ZXIua2luZCA9PT0gJ2FwcGxpY2F0aW9uJykge1xuICAgICAgICAgIHNkcCArPSAnbT1hcHBsaWNhdGlvbiAwIERUTFMvU0NUUCA1MDAwXFxyXFxuJztcbiAgICAgICAgfSBlbHNlIGlmICh0cmFuc2NlaXZlci5raW5kID09PSAnYXVkaW8nKSB7XG4gICAgICAgICAgc2RwICs9ICdtPWF1ZGlvIDAgVURQL1RMUy9SVFAvU0FWUEYgMFxcclxcbicgK1xuICAgICAgICAgICAgICAnYT1ydHBtYXA6MCBQQ01VLzgwMDBcXHJcXG4nO1xuICAgICAgICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLmtpbmQgPT09ICd2aWRlbycpIHtcbiAgICAgICAgICBzZHAgKz0gJ209dmlkZW8gMCBVRFAvVExTL1JUUC9TQVZQRiAxMjBcXHJcXG4nICtcbiAgICAgICAgICAgICAgJ2E9cnRwbWFwOjEyMCBWUDgvOTAwMDBcXHJcXG4nO1xuICAgICAgICB9XG4gICAgICAgIHNkcCArPSAnYz1JTiBJUDQgMC4wLjAuMFxcclxcbicgK1xuICAgICAgICAgICAgJ2E9aW5hY3RpdmVcXHJcXG4nICtcbiAgICAgICAgICAgICdhPW1pZDonICsgdHJhbnNjZWl2ZXIubWlkICsgJ1xcclxcbic7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gRklYTUU6IGxvb2sgYXQgZGlyZWN0aW9uLlxuICAgICAgaWYgKHRyYW5zY2VpdmVyLnN0cmVhbSkge1xuICAgICAgICB2YXIgbG9jYWxUcmFjaztcbiAgICAgICAgaWYgKHRyYW5zY2VpdmVyLmtpbmQgPT09ICdhdWRpbycpIHtcbiAgICAgICAgICBsb2NhbFRyYWNrID0gdHJhbnNjZWl2ZXIuc3RyZWFtLmdldEF1ZGlvVHJhY2tzKClbMF07XG4gICAgICAgIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIua2luZCA9PT0gJ3ZpZGVvJykge1xuICAgICAgICAgIGxvY2FsVHJhY2sgPSB0cmFuc2NlaXZlci5zdHJlYW0uZ2V0VmlkZW9UcmFja3MoKVswXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobG9jYWxUcmFjaykge1xuICAgICAgICAgIC8vIGFkZCBSVFhcbiAgICAgICAgICBpZiAoZWRnZVZlcnNpb24gPj0gMTUwMTkgJiYgdHJhbnNjZWl2ZXIua2luZCA9PT0gJ3ZpZGVvJyAmJlxuICAgICAgICAgICAgICAhdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHgpIHtcbiAgICAgICAgICAgIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4ID0ge1xuICAgICAgICAgICAgICBzc3JjOiB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmMgKyAxXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBDYWxjdWxhdGUgaW50ZXJzZWN0aW9uIG9mIGNhcGFiaWxpdGllcy5cbiAgICAgIHZhciBjb21tb25DYXBhYmlsaXRpZXMgPSBnZXRDb21tb25DYXBhYmlsaXRpZXMoXG4gICAgICAgICAgdHJhbnNjZWl2ZXIubG9jYWxDYXBhYmlsaXRpZXMsXG4gICAgICAgICAgdHJhbnNjZWl2ZXIucmVtb3RlQ2FwYWJpbGl0aWVzKTtcblxuICAgICAgdmFyIGhhc1J0eCA9IGNvbW1vbkNhcGFiaWxpdGllcy5jb2RlY3MuZmlsdGVyKGZ1bmN0aW9uKGMpIHtcbiAgICAgICAgcmV0dXJuIGMubmFtZS50b0xvd2VyQ2FzZSgpID09PSAncnR4JztcbiAgICAgIH0pLmxlbmd0aDtcbiAgICAgIGlmICghaGFzUnR4ICYmIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4KSB7XG4gICAgICAgIGRlbGV0ZSB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eDtcbiAgICAgIH1cblxuICAgICAgc2RwICs9IHdyaXRlTWVkaWFTZWN0aW9uKHRyYW5zY2VpdmVyLCBjb21tb25DYXBhYmlsaXRpZXMsXG4gICAgICAgICAgJ2Fuc3dlcicsIHRyYW5zY2VpdmVyLnN0cmVhbSwgcGMuX2R0bHNSb2xlKTtcbiAgICAgIGlmICh0cmFuc2NlaXZlci5ydGNwUGFyYW1ldGVycyAmJlxuICAgICAgICAgIHRyYW5zY2VpdmVyLnJ0Y3BQYXJhbWV0ZXJzLnJlZHVjZWRTaXplKSB7XG4gICAgICAgIHNkcCArPSAnYT1ydGNwLXJzaXplXFxyXFxuJztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHZhciBkZXNjID0gbmV3IHdpbmRvdy5SVENTZXNzaW9uRGVzY3JpcHRpb24oe1xuICAgICAgdHlwZTogJ2Fuc3dlcicsXG4gICAgICBzZHA6IHNkcFxuICAgIH0pO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZGVzYyk7XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZEljZUNhbmRpZGF0ZSA9IGZ1bmN0aW9uKGNhbmRpZGF0ZSkge1xuICAgIHZhciBwYyA9IHRoaXM7XG4gICAgdmFyIHNlY3Rpb25zO1xuICAgIGlmIChjYW5kaWRhdGUgJiYgIShjYW5kaWRhdGUuc2RwTUxpbmVJbmRleCAhPT0gdW5kZWZpbmVkIHx8XG4gICAgICAgIGNhbmRpZGF0ZS5zZHBNaWQpKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFR5cGVFcnJvcignc2RwTUxpbmVJbmRleCBvciBzZHBNaWQgcmVxdWlyZWQnKSk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogbmVlZHMgdG8gZ28gaW50byBvcHMgcXVldWUuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgaWYgKCFwYy5yZW1vdGVEZXNjcmlwdGlvbikge1xuICAgICAgICByZXR1cm4gcmVqZWN0KG1ha2VFcnJvcignSW52YWxpZFN0YXRlRXJyb3InLFxuICAgICAgICAgICAgJ0NhbiBub3QgYWRkIElDRSBjYW5kaWRhdGUgd2l0aG91dCBhIHJlbW90ZSBkZXNjcmlwdGlvbicpKTtcbiAgICAgIH0gZWxzZSBpZiAoIWNhbmRpZGF0ZSB8fCBjYW5kaWRhdGUuY2FuZGlkYXRlID09PSAnJykge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHBjLnRyYW5zY2VpdmVycy5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGlmIChwYy50cmFuc2NlaXZlcnNbal0ucmVqZWN0ZWQpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBwYy50cmFuc2NlaXZlcnNbal0uaWNlVHJhbnNwb3J0LmFkZFJlbW90ZUNhbmRpZGF0ZSh7fSk7XG4gICAgICAgICAgc2VjdGlvbnMgPSBTRFBVdGlscy5nZXRNZWRpYVNlY3Rpb25zKHBjLnJlbW90ZURlc2NyaXB0aW9uLnNkcCk7XG4gICAgICAgICAgc2VjdGlvbnNbal0gKz0gJ2E9ZW5kLW9mLWNhbmRpZGF0ZXNcXHJcXG4nO1xuICAgICAgICAgIHBjLnJlbW90ZURlc2NyaXB0aW9uLnNkcCA9XG4gICAgICAgICAgICAgIFNEUFV0aWxzLmdldERlc2NyaXB0aW9uKHBjLnJlbW90ZURlc2NyaXB0aW9uLnNkcCkgK1xuICAgICAgICAgICAgICBzZWN0aW9ucy5qb2luKCcnKTtcbiAgICAgICAgICBpZiAocGMudXNpbmdCdW5kbGUpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHNkcE1MaW5lSW5kZXggPSBjYW5kaWRhdGUuc2RwTUxpbmVJbmRleDtcbiAgICAgICAgaWYgKGNhbmRpZGF0ZS5zZHBNaWQpIHtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBjLnRyYW5zY2VpdmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHBjLnRyYW5zY2VpdmVyc1tpXS5taWQgPT09IGNhbmRpZGF0ZS5zZHBNaWQpIHtcbiAgICAgICAgICAgICAgc2RwTUxpbmVJbmRleCA9IGk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgdHJhbnNjZWl2ZXIgPSBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF07XG4gICAgICAgIGlmICh0cmFuc2NlaXZlcikge1xuICAgICAgICAgIGlmICh0cmFuc2NlaXZlci5yZWplY3RlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIGNhbmQgPSBPYmplY3Qua2V5cyhjYW5kaWRhdGUuY2FuZGlkYXRlKS5sZW5ndGggPiAwID9cbiAgICAgICAgICAgICAgU0RQVXRpbHMucGFyc2VDYW5kaWRhdGUoY2FuZGlkYXRlLmNhbmRpZGF0ZSkgOiB7fTtcbiAgICAgICAgICAvLyBJZ25vcmUgQ2hyb21lJ3MgaW52YWxpZCBjYW5kaWRhdGVzIHNpbmNlIEVkZ2UgZG9lcyBub3QgbGlrZSB0aGVtLlxuICAgICAgICAgIGlmIChjYW5kLnByb3RvY29sID09PSAndGNwJyAmJiAoY2FuZC5wb3J0ID09PSAwIHx8IGNhbmQucG9ydCA9PT0gOSkpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIElnbm9yZSBSVENQIGNhbmRpZGF0ZXMsIHdlIGFzc3VtZSBSVENQLU1VWC5cbiAgICAgICAgICBpZiAoY2FuZC5jb21wb25lbnQgJiYgY2FuZC5jb21wb25lbnQgIT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHdoZW4gdXNpbmcgYnVuZGxlLCBhdm9pZCBhZGRpbmcgY2FuZGlkYXRlcyB0byB0aGUgd3JvbmdcbiAgICAgICAgICAvLyBpY2UgdHJhbnNwb3J0LiBBbmQgYXZvaWQgYWRkaW5nIGNhbmRpZGF0ZXMgYWRkZWQgaW4gdGhlIFNEUC5cbiAgICAgICAgICBpZiAoc2RwTUxpbmVJbmRleCA9PT0gMCB8fCAoc2RwTUxpbmVJbmRleCA+IDAgJiZcbiAgICAgICAgICAgICAgdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0ICE9PSBwYy50cmFuc2NlaXZlcnNbMF0uaWNlVHJhbnNwb3J0KSkge1xuICAgICAgICAgICAgaWYgKCFtYXliZUFkZENhbmRpZGF0ZSh0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQsIGNhbmQpKSB7XG4gICAgICAgICAgICAgIHJldHVybiByZWplY3QobWFrZUVycm9yKCdPcGVyYXRpb25FcnJvcicsXG4gICAgICAgICAgICAgICAgICAnQ2FuIG5vdCBhZGQgSUNFIGNhbmRpZGF0ZScpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyB1cGRhdGUgdGhlIHJlbW90ZURlc2NyaXB0aW9uLlxuICAgICAgICAgIHZhciBjYW5kaWRhdGVTdHJpbmcgPSBjYW5kaWRhdGUuY2FuZGlkYXRlLnRyaW0oKTtcbiAgICAgICAgICBpZiAoY2FuZGlkYXRlU3RyaW5nLmluZGV4T2YoJ2E9JykgPT09IDApIHtcbiAgICAgICAgICAgIGNhbmRpZGF0ZVN0cmluZyA9IGNhbmRpZGF0ZVN0cmluZy5zdWJzdHIoMik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNlY3Rpb25zID0gU0RQVXRpbHMuZ2V0TWVkaWFTZWN0aW9ucyhwYy5yZW1vdGVEZXNjcmlwdGlvbi5zZHApO1xuICAgICAgICAgIHNlY3Rpb25zW3NkcE1MaW5lSW5kZXhdICs9ICdhPScgK1xuICAgICAgICAgICAgICAoY2FuZC50eXBlID8gY2FuZGlkYXRlU3RyaW5nIDogJ2VuZC1vZi1jYW5kaWRhdGVzJylcbiAgICAgICAgICAgICAgKyAnXFxyXFxuJztcbiAgICAgICAgICBwYy5yZW1vdGVEZXNjcmlwdGlvbi5zZHAgPVxuICAgICAgICAgICAgICBTRFBVdGlscy5nZXREZXNjcmlwdGlvbihwYy5yZW1vdGVEZXNjcmlwdGlvbi5zZHApICtcbiAgICAgICAgICAgICAgc2VjdGlvbnMuam9pbignJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdChtYWtlRXJyb3IoJ09wZXJhdGlvbkVycm9yJyxcbiAgICAgICAgICAgICAgJ0NhbiBub3QgYWRkIElDRSBjYW5kaWRhdGUnKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U3RhdHMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcHJvbWlzZXMgPSBbXTtcbiAgICB0aGlzLnRyYW5zY2VpdmVycy5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XG4gICAgICBbJ3J0cFNlbmRlcicsICdydHBSZWNlaXZlcicsICdpY2VHYXRoZXJlcicsICdpY2VUcmFuc3BvcnQnLFxuICAgICAgICAgICdkdGxzVHJhbnNwb3J0J10uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgICAgICAgIGlmICh0cmFuc2NlaXZlclttZXRob2RdKSB7XG4gICAgICAgICAgICAgIHByb21pc2VzLnB1c2godHJhbnNjZWl2ZXJbbWV0aG9kXS5nZXRTdGF0cygpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICB9KTtcbiAgICB2YXIgZml4U3RhdHNUeXBlID0gZnVuY3Rpb24oc3RhdCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaW5ib3VuZHJ0cDogJ2luYm91bmQtcnRwJyxcbiAgICAgICAgb3V0Ym91bmRydHA6ICdvdXRib3VuZC1ydHAnLFxuICAgICAgICBjYW5kaWRhdGVwYWlyOiAnY2FuZGlkYXRlLXBhaXInLFxuICAgICAgICBsb2NhbGNhbmRpZGF0ZTogJ2xvY2FsLWNhbmRpZGF0ZScsXG4gICAgICAgIHJlbW90ZWNhbmRpZGF0ZTogJ3JlbW90ZS1jYW5kaWRhdGUnXG4gICAgICB9W3N0YXQudHlwZV0gfHwgc3RhdC50eXBlO1xuICAgIH07XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiAgICAgIC8vIHNoaW0gZ2V0U3RhdHMgd2l0aCBtYXBsaWtlIHN1cHBvcnRcbiAgICAgIHZhciByZXN1bHRzID0gbmV3IE1hcCgpO1xuICAgICAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIHJlcy5mb3JFYWNoKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIE9iamVjdC5rZXlzKHJlc3VsdCkuZm9yRWFjaChmdW5jdGlvbihpZCkge1xuICAgICAgICAgICAgcmVzdWx0W2lkXS50eXBlID0gZml4U3RhdHNUeXBlKHJlc3VsdFtpZF0pO1xuICAgICAgICAgICAgcmVzdWx0cy5zZXQoaWQsIHJlc3VsdFtpZF0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmVzb2x2ZShyZXN1bHRzKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIGxlZ2FjeSBjYWxsYmFjayBzaGltcy4gU2hvdWxkIGJlIG1vdmVkIHRvIGFkYXB0ZXIuanMgc29tZSBkYXlzLlxuICB2YXIgbWV0aG9kcyA9IFsnY3JlYXRlT2ZmZXInLCAnY3JlYXRlQW5zd2VyJ107XG4gIG1ldGhvZHMuZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICB2YXIgbmF0aXZlTWV0aG9kID0gUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF07XG4gICAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgaWYgKHR5cGVvZiBhcmdzWzBdID09PSAnZnVuY3Rpb24nIHx8XG4gICAgICAgICAgdHlwZW9mIGFyZ3NbMV0gPT09ICdmdW5jdGlvbicpIHsgLy8gbGVnYWN5XG4gICAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkodGhpcywgW2FyZ3VtZW50c1syXV0pXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKGRlc2NyaXB0aW9uKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBhcmdzWzBdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBhcmdzWzBdLmFwcGx5KG51bGwsIFtkZXNjcmlwdGlvbl0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGFyZ3NbMV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGFyZ3NbMV0uYXBwbHkobnVsbCwgW2Vycm9yXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9KTtcblxuICBtZXRob2RzID0gWydzZXRMb2NhbERlc2NyaXB0aW9uJywgJ3NldFJlbW90ZURlc2NyaXB0aW9uJywgJ2FkZEljZUNhbmRpZGF0ZSddO1xuICBtZXRob2RzLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgdmFyIG5hdGl2ZU1ldGhvZCA9IFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdO1xuICAgIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIGlmICh0eXBlb2YgYXJnc1sxXSA9PT0gJ2Z1bmN0aW9uJyB8fFxuICAgICAgICAgIHR5cGVvZiBhcmdzWzJdID09PSAnZnVuY3Rpb24nKSB7IC8vIGxlZ2FjeVxuICAgICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBhcmdzWzFdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBhcmdzWzFdLmFwcGx5KG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGFyZ3NbMl0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGFyZ3NbMl0uYXBwbHkobnVsbCwgW2Vycm9yXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9KTtcblxuICAvLyBnZXRTdGF0cyBpcyBzcGVjaWFsLiBJdCBkb2Vzbid0IGhhdmUgYSBzcGVjIGxlZ2FjeSBtZXRob2QgeWV0IHdlIHN1cHBvcnRcbiAgLy8gZ2V0U3RhdHMoc29tZXRoaW5nLCBjYikgd2l0aG91dCBlcnJvciBjYWxsYmFja3MuXG4gIFsnZ2V0U3RhdHMnXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgIHZhciBuYXRpdmVNZXRob2QgPSBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXTtcbiAgICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICBpZiAodHlwZW9mIGFyZ3NbMV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICh0eXBlb2YgYXJnc1sxXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgYXJnc1sxXS5hcHBseShudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH0pO1xuXG4gIHJldHVybiBSVENQZWVyQ29ubmVjdGlvbjtcbn07XG5cbn0se1wic2RwXCI6Mn1dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xuJ3VzZSBzdHJpY3QnO1xuXG4vLyBTRFAgaGVscGVycy5cbnZhciBTRFBVdGlscyA9IHt9O1xuXG4vLyBHZW5lcmF0ZSBhbiBhbHBoYW51bWVyaWMgaWRlbnRpZmllciBmb3IgY25hbWUgb3IgbWlkcy5cbi8vIFRPRE86IHVzZSBVVUlEcyBpbnN0ZWFkPyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9qZWQvOTgyODgzXG5TRFBVdGlscy5nZW5lcmF0ZUlkZW50aWZpZXIgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCAxMCk7XG59O1xuXG4vLyBUaGUgUlRDUCBDTkFNRSB1c2VkIGJ5IGFsbCBwZWVyY29ubmVjdGlvbnMgZnJvbSB0aGUgc2FtZSBKUy5cblNEUFV0aWxzLmxvY2FsQ05hbWUgPSBTRFBVdGlscy5nZW5lcmF0ZUlkZW50aWZpZXIoKTtcblxuLy8gU3BsaXRzIFNEUCBpbnRvIGxpbmVzLCBkZWFsaW5nIHdpdGggYm90aCBDUkxGIGFuZCBMRi5cblNEUFV0aWxzLnNwbGl0TGluZXMgPSBmdW5jdGlvbihibG9iKSB7XG4gIHJldHVybiBibG9iLnRyaW0oKS5zcGxpdCgnXFxuJykubWFwKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICByZXR1cm4gbGluZS50cmltKCk7XG4gIH0pO1xufTtcbi8vIFNwbGl0cyBTRFAgaW50byBzZXNzaW9ucGFydCBhbmQgbWVkaWFzZWN0aW9ucy4gRW5zdXJlcyBDUkxGLlxuU0RQVXRpbHMuc3BsaXRTZWN0aW9ucyA9IGZ1bmN0aW9uKGJsb2IpIHtcbiAgdmFyIHBhcnRzID0gYmxvYi5zcGxpdCgnXFxubT0nKTtcbiAgcmV0dXJuIHBhcnRzLm1hcChmdW5jdGlvbihwYXJ0LCBpbmRleCkge1xuICAgIHJldHVybiAoaW5kZXggPiAwID8gJ209JyArIHBhcnQgOiBwYXJ0KS50cmltKCkgKyAnXFxyXFxuJztcbiAgfSk7XG59O1xuXG4vLyByZXR1cm5zIHRoZSBzZXNzaW9uIGRlc2NyaXB0aW9uLlxuU0RQVXRpbHMuZ2V0RGVzY3JpcHRpb24gPSBmdW5jdGlvbihibG9iKSB7XG4gIHZhciBzZWN0aW9ucyA9IFNEUFV0aWxzLnNwbGl0U2VjdGlvbnMoYmxvYik7XG4gIHJldHVybiBzZWN0aW9ucyAmJiBzZWN0aW9uc1swXTtcbn07XG5cbi8vIHJldHVybnMgdGhlIGluZGl2aWR1YWwgbWVkaWEgc2VjdGlvbnMuXG5TRFBVdGlscy5nZXRNZWRpYVNlY3Rpb25zID0gZnVuY3Rpb24oYmxvYikge1xuICB2YXIgc2VjdGlvbnMgPSBTRFBVdGlscy5zcGxpdFNlY3Rpb25zKGJsb2IpO1xuICBzZWN0aW9ucy5zaGlmdCgpO1xuICByZXR1cm4gc2VjdGlvbnM7XG59O1xuXG4vLyBSZXR1cm5zIGxpbmVzIHRoYXQgc3RhcnQgd2l0aCBhIGNlcnRhaW4gcHJlZml4LlxuU0RQVXRpbHMubWF0Y2hQcmVmaXggPSBmdW5jdGlvbihibG9iLCBwcmVmaXgpIHtcbiAgcmV0dXJuIFNEUFV0aWxzLnNwbGl0TGluZXMoYmxvYikuZmlsdGVyKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICByZXR1cm4gbGluZS5pbmRleE9mKHByZWZpeCkgPT09IDA7XG4gIH0pO1xufTtcblxuLy8gUGFyc2VzIGFuIElDRSBjYW5kaWRhdGUgbGluZS4gU2FtcGxlIGlucHV0OlxuLy8gY2FuZGlkYXRlOjcwMjc4NjM1MCAyIHVkcCA0MTgxOTkwMiA4LjguOC44IDYwNzY5IHR5cCByZWxheSByYWRkciA4LjguOC44XG4vLyBycG9ydCA1NTk5NlwiXG5TRFBVdGlscy5wYXJzZUNhbmRpZGF0ZSA9IGZ1bmN0aW9uKGxpbmUpIHtcbiAgdmFyIHBhcnRzO1xuICAvLyBQYXJzZSBib3RoIHZhcmlhbnRzLlxuICBpZiAobGluZS5pbmRleE9mKCdhPWNhbmRpZGF0ZTonKSA9PT0gMCkge1xuICAgIHBhcnRzID0gbGluZS5zdWJzdHJpbmcoMTIpLnNwbGl0KCcgJyk7XG4gIH0gZWxzZSB7XG4gICAgcGFydHMgPSBsaW5lLnN1YnN0cmluZygxMCkuc3BsaXQoJyAnKTtcbiAgfVxuXG4gIHZhciBjYW5kaWRhdGUgPSB7XG4gICAgZm91bmRhdGlvbjogcGFydHNbMF0sXG4gICAgY29tcG9uZW50OiBwYXJzZUludChwYXJ0c1sxXSwgMTApLFxuICAgIHByb3RvY29sOiBwYXJ0c1syXS50b0xvd2VyQ2FzZSgpLFxuICAgIHByaW9yaXR5OiBwYXJzZUludChwYXJ0c1szXSwgMTApLFxuICAgIGlwOiBwYXJ0c1s0XSxcbiAgICBwb3J0OiBwYXJzZUludChwYXJ0c1s1XSwgMTApLFxuICAgIC8vIHNraXAgcGFydHNbNl0gPT0gJ3R5cCdcbiAgICB0eXBlOiBwYXJ0c1s3XVxuICB9O1xuXG4gIGZvciAodmFyIGkgPSA4OyBpIDwgcGFydHMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICBzd2l0Y2ggKHBhcnRzW2ldKSB7XG4gICAgICBjYXNlICdyYWRkcic6XG4gICAgICAgIGNhbmRpZGF0ZS5yZWxhdGVkQWRkcmVzcyA9IHBhcnRzW2kgKyAxXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdycG9ydCc6XG4gICAgICAgIGNhbmRpZGF0ZS5yZWxhdGVkUG9ydCA9IHBhcnNlSW50KHBhcnRzW2kgKyAxXSwgMTApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RjcHR5cGUnOlxuICAgICAgICBjYW5kaWRhdGUudGNwVHlwZSA9IHBhcnRzW2kgKyAxXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd1ZnJhZyc6XG4gICAgICAgIGNhbmRpZGF0ZS51ZnJhZyA9IHBhcnRzW2kgKyAxXTsgLy8gZm9yIGJhY2t3YXJkIGNvbXBhYmlsaXR5LlxuICAgICAgICBjYW5kaWRhdGUudXNlcm5hbWVGcmFnbWVudCA9IHBhcnRzW2kgKyAxXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OiAvLyBleHRlbnNpb24gaGFuZGxpbmcsIGluIHBhcnRpY3VsYXIgdWZyYWdcbiAgICAgICAgY2FuZGlkYXRlW3BhcnRzW2ldXSA9IHBhcnRzW2kgKyAxXTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBjYW5kaWRhdGU7XG59O1xuXG4vLyBUcmFuc2xhdGVzIGEgY2FuZGlkYXRlIG9iamVjdCBpbnRvIFNEUCBjYW5kaWRhdGUgYXR0cmlidXRlLlxuU0RQVXRpbHMud3JpdGVDYW5kaWRhdGUgPSBmdW5jdGlvbihjYW5kaWRhdGUpIHtcbiAgdmFyIHNkcCA9IFtdO1xuICBzZHAucHVzaChjYW5kaWRhdGUuZm91bmRhdGlvbik7XG4gIHNkcC5wdXNoKGNhbmRpZGF0ZS5jb21wb25lbnQpO1xuICBzZHAucHVzaChjYW5kaWRhdGUucHJvdG9jb2wudG9VcHBlckNhc2UoKSk7XG4gIHNkcC5wdXNoKGNhbmRpZGF0ZS5wcmlvcml0eSk7XG4gIHNkcC5wdXNoKGNhbmRpZGF0ZS5pcCk7XG4gIHNkcC5wdXNoKGNhbmRpZGF0ZS5wb3J0KTtcblxuICB2YXIgdHlwZSA9IGNhbmRpZGF0ZS50eXBlO1xuICBzZHAucHVzaCgndHlwJyk7XG4gIHNkcC5wdXNoKHR5cGUpO1xuICBpZiAodHlwZSAhPT0gJ2hvc3QnICYmIGNhbmRpZGF0ZS5yZWxhdGVkQWRkcmVzcyAmJlxuICAgICAgY2FuZGlkYXRlLnJlbGF0ZWRQb3J0KSB7XG4gICAgc2RwLnB1c2goJ3JhZGRyJyk7XG4gICAgc2RwLnB1c2goY2FuZGlkYXRlLnJlbGF0ZWRBZGRyZXNzKTsgLy8gd2FzOiByZWxBZGRyXG4gICAgc2RwLnB1c2goJ3Jwb3J0Jyk7XG4gICAgc2RwLnB1c2goY2FuZGlkYXRlLnJlbGF0ZWRQb3J0KTsgLy8gd2FzOiByZWxQb3J0XG4gIH1cbiAgaWYgKGNhbmRpZGF0ZS50Y3BUeXBlICYmIGNhbmRpZGF0ZS5wcm90b2NvbC50b0xvd2VyQ2FzZSgpID09PSAndGNwJykge1xuICAgIHNkcC5wdXNoKCd0Y3B0eXBlJyk7XG4gICAgc2RwLnB1c2goY2FuZGlkYXRlLnRjcFR5cGUpO1xuICB9XG4gIGlmIChjYW5kaWRhdGUudXNlcm5hbWVGcmFnbWVudCB8fCBjYW5kaWRhdGUudWZyYWcpIHtcbiAgICBzZHAucHVzaCgndWZyYWcnKTtcbiAgICBzZHAucHVzaChjYW5kaWRhdGUudXNlcm5hbWVGcmFnbWVudCB8fCBjYW5kaWRhdGUudWZyYWcpO1xuICB9XG4gIHJldHVybiAnY2FuZGlkYXRlOicgKyBzZHAuam9pbignICcpO1xufTtcblxuLy8gUGFyc2VzIGFuIGljZS1vcHRpb25zIGxpbmUsIHJldHVybnMgYW4gYXJyYXkgb2Ygb3B0aW9uIHRhZ3MuXG4vLyBhPWljZS1vcHRpb25zOmZvbyBiYXJcblNEUFV0aWxzLnBhcnNlSWNlT3B0aW9ucyA9IGZ1bmN0aW9uKGxpbmUpIHtcbiAgcmV0dXJuIGxpbmUuc3Vic3RyKDE0KS5zcGxpdCgnICcpO1xufVxuXG4vLyBQYXJzZXMgYW4gcnRwbWFwIGxpbmUsIHJldHVybnMgUlRDUnRwQ29kZGVjUGFyYW1ldGVycy4gU2FtcGxlIGlucHV0OlxuLy8gYT1ydHBtYXA6MTExIG9wdXMvNDgwMDAvMlxuU0RQVXRpbHMucGFyc2VSdHBNYXAgPSBmdW5jdGlvbihsaW5lKSB7XG4gIHZhciBwYXJ0cyA9IGxpbmUuc3Vic3RyKDkpLnNwbGl0KCcgJyk7XG4gIHZhciBwYXJzZWQgPSB7XG4gICAgcGF5bG9hZFR5cGU6IHBhcnNlSW50KHBhcnRzLnNoaWZ0KCksIDEwKSAvLyB3YXM6IGlkXG4gIH07XG5cbiAgcGFydHMgPSBwYXJ0c1swXS5zcGxpdCgnLycpO1xuXG4gIHBhcnNlZC5uYW1lID0gcGFydHNbMF07XG4gIHBhcnNlZC5jbG9ja1JhdGUgPSBwYXJzZUludChwYXJ0c1sxXSwgMTApOyAvLyB3YXM6IGNsb2NrcmF0ZVxuICAvLyB3YXM6IGNoYW5uZWxzXG4gIHBhcnNlZC5udW1DaGFubmVscyA9IHBhcnRzLmxlbmd0aCA9PT0gMyA/IHBhcnNlSW50KHBhcnRzWzJdLCAxMCkgOiAxO1xuICByZXR1cm4gcGFyc2VkO1xufTtcblxuLy8gR2VuZXJhdGUgYW4gYT1ydHBtYXAgbGluZSBmcm9tIFJUQ1J0cENvZGVjQ2FwYWJpbGl0eSBvclxuLy8gUlRDUnRwQ29kZWNQYXJhbWV0ZXJzLlxuU0RQVXRpbHMud3JpdGVSdHBNYXAgPSBmdW5jdGlvbihjb2RlYykge1xuICB2YXIgcHQgPSBjb2RlYy5wYXlsb2FkVHlwZTtcbiAgaWYgKGNvZGVjLnByZWZlcnJlZFBheWxvYWRUeXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICBwdCA9IGNvZGVjLnByZWZlcnJlZFBheWxvYWRUeXBlO1xuICB9XG4gIHJldHVybiAnYT1ydHBtYXA6JyArIHB0ICsgJyAnICsgY29kZWMubmFtZSArICcvJyArIGNvZGVjLmNsb2NrUmF0ZSArXG4gICAgICAoY29kZWMubnVtQ2hhbm5lbHMgIT09IDEgPyAnLycgKyBjb2RlYy5udW1DaGFubmVscyA6ICcnKSArICdcXHJcXG4nO1xufTtcblxuLy8gUGFyc2VzIGFuIGE9ZXh0bWFwIGxpbmUgKGhlYWRlcmV4dGVuc2lvbiBmcm9tIFJGQyA1Mjg1KS4gU2FtcGxlIGlucHV0OlxuLy8gYT1leHRtYXA6MiB1cm46aWV0ZjpwYXJhbXM6cnRwLWhkcmV4dDp0b2Zmc2V0XG4vLyBhPWV4dG1hcDoyL3NlbmRvbmx5IHVybjppZXRmOnBhcmFtczpydHAtaGRyZXh0OnRvZmZzZXRcblNEUFV0aWxzLnBhcnNlRXh0bWFwID0gZnVuY3Rpb24obGluZSkge1xuICB2YXIgcGFydHMgPSBsaW5lLnN1YnN0cig5KS5zcGxpdCgnICcpO1xuICByZXR1cm4ge1xuICAgIGlkOiBwYXJzZUludChwYXJ0c1swXSwgMTApLFxuICAgIGRpcmVjdGlvbjogcGFydHNbMF0uaW5kZXhPZignLycpID4gMCA/IHBhcnRzWzBdLnNwbGl0KCcvJylbMV0gOiAnc2VuZHJlY3YnLFxuICAgIHVyaTogcGFydHNbMV1cbiAgfTtcbn07XG5cbi8vIEdlbmVyYXRlcyBhPWV4dG1hcCBsaW5lIGZyb20gUlRDUnRwSGVhZGVyRXh0ZW5zaW9uUGFyYW1ldGVycyBvclxuLy8gUlRDUnRwSGVhZGVyRXh0ZW5zaW9uLlxuU0RQVXRpbHMud3JpdGVFeHRtYXAgPSBmdW5jdGlvbihoZWFkZXJFeHRlbnNpb24pIHtcbiAgcmV0dXJuICdhPWV4dG1hcDonICsgKGhlYWRlckV4dGVuc2lvbi5pZCB8fCBoZWFkZXJFeHRlbnNpb24ucHJlZmVycmVkSWQpICtcbiAgICAgIChoZWFkZXJFeHRlbnNpb24uZGlyZWN0aW9uICYmIGhlYWRlckV4dGVuc2lvbi5kaXJlY3Rpb24gIT09ICdzZW5kcmVjdidcbiAgICAgICAgICA/ICcvJyArIGhlYWRlckV4dGVuc2lvbi5kaXJlY3Rpb25cbiAgICAgICAgICA6ICcnKSArXG4gICAgICAnICcgKyBoZWFkZXJFeHRlbnNpb24udXJpICsgJ1xcclxcbic7XG59O1xuXG4vLyBQYXJzZXMgYW4gZnRtcCBsaW5lLCByZXR1cm5zIGRpY3Rpb25hcnkuIFNhbXBsZSBpbnB1dDpcbi8vIGE9Zm10cDo5NiB2YnI9b247Y25nPW9uXG4vLyBBbHNvIGRlYWxzIHdpdGggdmJyPW9uOyBjbmc9b25cblNEUFV0aWxzLnBhcnNlRm10cCA9IGZ1bmN0aW9uKGxpbmUpIHtcbiAgdmFyIHBhcnNlZCA9IHt9O1xuICB2YXIga3Y7XG4gIHZhciBwYXJ0cyA9IGxpbmUuc3Vic3RyKGxpbmUuaW5kZXhPZignICcpICsgMSkuc3BsaXQoJzsnKTtcbiAgZm9yICh2YXIgaiA9IDA7IGogPCBwYXJ0cy5sZW5ndGg7IGorKykge1xuICAgIGt2ID0gcGFydHNbal0udHJpbSgpLnNwbGl0KCc9Jyk7XG4gICAgcGFyc2VkW2t2WzBdLnRyaW0oKV0gPSBrdlsxXTtcbiAgfVxuICByZXR1cm4gcGFyc2VkO1xufTtcblxuLy8gR2VuZXJhdGVzIGFuIGE9ZnRtcCBsaW5lIGZyb20gUlRDUnRwQ29kZWNDYXBhYmlsaXR5IG9yIFJUQ1J0cENvZGVjUGFyYW1ldGVycy5cblNEUFV0aWxzLndyaXRlRm10cCA9IGZ1bmN0aW9uKGNvZGVjKSB7XG4gIHZhciBsaW5lID0gJyc7XG4gIHZhciBwdCA9IGNvZGVjLnBheWxvYWRUeXBlO1xuICBpZiAoY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgIHB0ID0gY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGU7XG4gIH1cbiAgaWYgKGNvZGVjLnBhcmFtZXRlcnMgJiYgT2JqZWN0LmtleXMoY29kZWMucGFyYW1ldGVycykubGVuZ3RoKSB7XG4gICAgdmFyIHBhcmFtcyA9IFtdO1xuICAgIE9iamVjdC5rZXlzKGNvZGVjLnBhcmFtZXRlcnMpLmZvckVhY2goZnVuY3Rpb24ocGFyYW0pIHtcbiAgICAgIHBhcmFtcy5wdXNoKHBhcmFtICsgJz0nICsgY29kZWMucGFyYW1ldGVyc1twYXJhbV0pO1xuICAgIH0pO1xuICAgIGxpbmUgKz0gJ2E9Zm10cDonICsgcHQgKyAnICcgKyBwYXJhbXMuam9pbignOycpICsgJ1xcclxcbic7XG4gIH1cbiAgcmV0dXJuIGxpbmU7XG59O1xuXG4vLyBQYXJzZXMgYW4gcnRjcC1mYiBsaW5lLCByZXR1cm5zIFJUQ1BSdGNwRmVlZGJhY2sgb2JqZWN0LiBTYW1wbGUgaW5wdXQ6XG4vLyBhPXJ0Y3AtZmI6OTggbmFjayBycHNpXG5TRFBVdGlscy5wYXJzZVJ0Y3BGYiA9IGZ1bmN0aW9uKGxpbmUpIHtcbiAgdmFyIHBhcnRzID0gbGluZS5zdWJzdHIobGluZS5pbmRleE9mKCcgJykgKyAxKS5zcGxpdCgnICcpO1xuICByZXR1cm4ge1xuICAgIHR5cGU6IHBhcnRzLnNoaWZ0KCksXG4gICAgcGFyYW1ldGVyOiBwYXJ0cy5qb2luKCcgJylcbiAgfTtcbn07XG4vLyBHZW5lcmF0ZSBhPXJ0Y3AtZmIgbGluZXMgZnJvbSBSVENSdHBDb2RlY0NhcGFiaWxpdHkgb3IgUlRDUnRwQ29kZWNQYXJhbWV0ZXJzLlxuU0RQVXRpbHMud3JpdGVSdGNwRmIgPSBmdW5jdGlvbihjb2RlYykge1xuICB2YXIgbGluZXMgPSAnJztcbiAgdmFyIHB0ID0gY29kZWMucGF5bG9hZFR5cGU7XG4gIGlmIChjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcHQgPSBjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZTtcbiAgfVxuICBpZiAoY29kZWMucnRjcEZlZWRiYWNrICYmIGNvZGVjLnJ0Y3BGZWVkYmFjay5sZW5ndGgpIHtcbiAgICAvLyBGSVhNRTogc3BlY2lhbCBoYW5kbGluZyBmb3IgdHJyLWludD9cbiAgICBjb2RlYy5ydGNwRmVlZGJhY2suZm9yRWFjaChmdW5jdGlvbihmYikge1xuICAgICAgbGluZXMgKz0gJ2E9cnRjcC1mYjonICsgcHQgKyAnICcgKyBmYi50eXBlICtcbiAgICAgIChmYi5wYXJhbWV0ZXIgJiYgZmIucGFyYW1ldGVyLmxlbmd0aCA/ICcgJyArIGZiLnBhcmFtZXRlciA6ICcnKSArXG4gICAgICAgICAgJ1xcclxcbic7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIGxpbmVzO1xufTtcblxuLy8gUGFyc2VzIGFuIFJGQyA1NTc2IHNzcmMgbWVkaWEgYXR0cmlidXRlLiBTYW1wbGUgaW5wdXQ6XG4vLyBhPXNzcmM6MzczNTkyODU1OSBjbmFtZTpzb21ldGhpbmdcblNEUFV0aWxzLnBhcnNlU3NyY01lZGlhID0gZnVuY3Rpb24obGluZSkge1xuICB2YXIgc3AgPSBsaW5lLmluZGV4T2YoJyAnKTtcbiAgdmFyIHBhcnRzID0ge1xuICAgIHNzcmM6IHBhcnNlSW50KGxpbmUuc3Vic3RyKDcsIHNwIC0gNyksIDEwKVxuICB9O1xuICB2YXIgY29sb24gPSBsaW5lLmluZGV4T2YoJzonLCBzcCk7XG4gIGlmIChjb2xvbiA+IC0xKSB7XG4gICAgcGFydHMuYXR0cmlidXRlID0gbGluZS5zdWJzdHIoc3AgKyAxLCBjb2xvbiAtIHNwIC0gMSk7XG4gICAgcGFydHMudmFsdWUgPSBsaW5lLnN1YnN0cihjb2xvbiArIDEpO1xuICB9IGVsc2Uge1xuICAgIHBhcnRzLmF0dHJpYnV0ZSA9IGxpbmUuc3Vic3RyKHNwICsgMSk7XG4gIH1cbiAgcmV0dXJuIHBhcnRzO1xufTtcblxuLy8gRXh0cmFjdHMgdGhlIE1JRCAoUkZDIDU4ODgpIGZyb20gYSBtZWRpYSBzZWN0aW9uLlxuLy8gcmV0dXJucyB0aGUgTUlEIG9yIHVuZGVmaW5lZCBpZiBubyBtaWQgbGluZSB3YXMgZm91bmQuXG5TRFBVdGlscy5nZXRNaWQgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcbiAgdmFyIG1pZCA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9bWlkOicpWzBdO1xuICBpZiAobWlkKSB7XG4gICAgcmV0dXJuIG1pZC5zdWJzdHIoNik7XG4gIH1cbn1cblxuU0RQVXRpbHMucGFyc2VGaW5nZXJwcmludCA9IGZ1bmN0aW9uKGxpbmUpIHtcbiAgdmFyIHBhcnRzID0gbGluZS5zdWJzdHIoMTQpLnNwbGl0KCcgJyk7XG4gIHJldHVybiB7XG4gICAgYWxnb3JpdGhtOiBwYXJ0c1swXS50b0xvd2VyQ2FzZSgpLCAvLyBhbGdvcml0aG0gaXMgY2FzZS1zZW5zaXRpdmUgaW4gRWRnZS5cbiAgICB2YWx1ZTogcGFydHNbMV1cbiAgfTtcbn07XG5cbi8vIEV4dHJhY3RzIERUTFMgcGFyYW1ldGVycyBmcm9tIFNEUCBtZWRpYSBzZWN0aW9uIG9yIHNlc3Npb25wYXJ0LlxuLy8gRklYTUU6IGZvciBjb25zaXN0ZW5jeSB3aXRoIG90aGVyIGZ1bmN0aW9ucyB0aGlzIHNob3VsZCBvbmx5XG4vLyAgIGdldCB0aGUgZmluZ2VycHJpbnQgbGluZSBhcyBpbnB1dC4gU2VlIGFsc28gZ2V0SWNlUGFyYW1ldGVycy5cblNEUFV0aWxzLmdldER0bHNQYXJhbWV0ZXJzID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uLCBzZXNzaW9ucGFydCkge1xuICB2YXIgbGluZXMgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24gKyBzZXNzaW9ucGFydCxcbiAgICAgICdhPWZpbmdlcnByaW50OicpO1xuICAvLyBOb3RlOiBhPXNldHVwIGxpbmUgaXMgaWdub3JlZCBzaW5jZSB3ZSB1c2UgdGhlICdhdXRvJyByb2xlLlxuICAvLyBOb3RlMjogJ2FsZ29yaXRobScgaXMgbm90IGNhc2Ugc2Vuc2l0aXZlIGV4Y2VwdCBpbiBFZGdlLlxuICByZXR1cm4ge1xuICAgIHJvbGU6ICdhdXRvJyxcbiAgICBmaW5nZXJwcmludHM6IGxpbmVzLm1hcChTRFBVdGlscy5wYXJzZUZpbmdlcnByaW50KVxuICB9O1xufTtcblxuLy8gU2VyaWFsaXplcyBEVExTIHBhcmFtZXRlcnMgdG8gU0RQLlxuU0RQVXRpbHMud3JpdGVEdGxzUGFyYW1ldGVycyA9IGZ1bmN0aW9uKHBhcmFtcywgc2V0dXBUeXBlKSB7XG4gIHZhciBzZHAgPSAnYT1zZXR1cDonICsgc2V0dXBUeXBlICsgJ1xcclxcbic7XG4gIHBhcmFtcy5maW5nZXJwcmludHMuZm9yRWFjaChmdW5jdGlvbihmcCkge1xuICAgIHNkcCArPSAnYT1maW5nZXJwcmludDonICsgZnAuYWxnb3JpdGhtICsgJyAnICsgZnAudmFsdWUgKyAnXFxyXFxuJztcbiAgfSk7XG4gIHJldHVybiBzZHA7XG59O1xuLy8gUGFyc2VzIElDRSBpbmZvcm1hdGlvbiBmcm9tIFNEUCBtZWRpYSBzZWN0aW9uIG9yIHNlc3Npb25wYXJ0LlxuLy8gRklYTUU6IGZvciBjb25zaXN0ZW5jeSB3aXRoIG90aGVyIGZ1bmN0aW9ucyB0aGlzIHNob3VsZCBvbmx5XG4vLyAgIGdldCB0aGUgaWNlLXVmcmFnIGFuZCBpY2UtcHdkIGxpbmVzIGFzIGlucHV0LlxuU0RQVXRpbHMuZ2V0SWNlUGFyYW1ldGVycyA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbiwgc2Vzc2lvbnBhcnQpIHtcbiAgdmFyIGxpbmVzID0gU0RQVXRpbHMuc3BsaXRMaW5lcyhtZWRpYVNlY3Rpb24pO1xuICAvLyBTZWFyY2ggaW4gc2Vzc2lvbiBwYXJ0LCB0b28uXG4gIGxpbmVzID0gbGluZXMuY29uY2F0KFNEUFV0aWxzLnNwbGl0TGluZXMoc2Vzc2lvbnBhcnQpKTtcbiAgdmFyIGljZVBhcmFtZXRlcnMgPSB7XG4gICAgdXNlcm5hbWVGcmFnbWVudDogbGluZXMuZmlsdGVyKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgIHJldHVybiBsaW5lLmluZGV4T2YoJ2E9aWNlLXVmcmFnOicpID09PSAwO1xuICAgIH0pWzBdLnN1YnN0cigxMiksXG4gICAgcGFzc3dvcmQ6IGxpbmVzLmZpbHRlcihmdW5jdGlvbihsaW5lKSB7XG4gICAgICByZXR1cm4gbGluZS5pbmRleE9mKCdhPWljZS1wd2Q6JykgPT09IDA7XG4gICAgfSlbMF0uc3Vic3RyKDEwKVxuICB9O1xuICByZXR1cm4gaWNlUGFyYW1ldGVycztcbn07XG5cbi8vIFNlcmlhbGl6ZXMgSUNFIHBhcmFtZXRlcnMgdG8gU0RQLlxuU0RQVXRpbHMud3JpdGVJY2VQYXJhbWV0ZXJzID0gZnVuY3Rpb24ocGFyYW1zKSB7XG4gIHJldHVybiAnYT1pY2UtdWZyYWc6JyArIHBhcmFtcy51c2VybmFtZUZyYWdtZW50ICsgJ1xcclxcbicgK1xuICAgICAgJ2E9aWNlLXB3ZDonICsgcGFyYW1zLnBhc3N3b3JkICsgJ1xcclxcbic7XG59O1xuXG4vLyBQYXJzZXMgdGhlIFNEUCBtZWRpYSBzZWN0aW9uIGFuZCByZXR1cm5zIFJUQ1J0cFBhcmFtZXRlcnMuXG5TRFBVdGlscy5wYXJzZVJ0cFBhcmFtZXRlcnMgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcbiAgdmFyIGRlc2NyaXB0aW9uID0ge1xuICAgIGNvZGVjczogW10sXG4gICAgaGVhZGVyRXh0ZW5zaW9uczogW10sXG4gICAgZmVjTWVjaGFuaXNtczogW10sXG4gICAgcnRjcDogW11cbiAgfTtcbiAgdmFyIGxpbmVzID0gU0RQVXRpbHMuc3BsaXRMaW5lcyhtZWRpYVNlY3Rpb24pO1xuICB2YXIgbWxpbmUgPSBsaW5lc1swXS5zcGxpdCgnICcpO1xuICBmb3IgKHZhciBpID0gMzsgaSA8IG1saW5lLmxlbmd0aDsgaSsrKSB7IC8vIGZpbmQgYWxsIGNvZGVjcyBmcm9tIG1saW5lWzMuLl1cbiAgICB2YXIgcHQgPSBtbGluZVtpXTtcbiAgICB2YXIgcnRwbWFwbGluZSA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KFxuICAgICAgICBtZWRpYVNlY3Rpb24sICdhPXJ0cG1hcDonICsgcHQgKyAnICcpWzBdO1xuICAgIGlmIChydHBtYXBsaW5lKSB7XG4gICAgICB2YXIgY29kZWMgPSBTRFBVdGlscy5wYXJzZVJ0cE1hcChydHBtYXBsaW5lKTtcbiAgICAgIHZhciBmbXRwcyA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KFxuICAgICAgICAgIG1lZGlhU2VjdGlvbiwgJ2E9Zm10cDonICsgcHQgKyAnICcpO1xuICAgICAgLy8gT25seSB0aGUgZmlyc3QgYT1mbXRwOjxwdD4gaXMgY29uc2lkZXJlZC5cbiAgICAgIGNvZGVjLnBhcmFtZXRlcnMgPSBmbXRwcy5sZW5ndGggPyBTRFBVdGlscy5wYXJzZUZtdHAoZm10cHNbMF0pIDoge307XG4gICAgICBjb2RlYy5ydGNwRmVlZGJhY2sgPSBTRFBVdGlscy5tYXRjaFByZWZpeChcbiAgICAgICAgICBtZWRpYVNlY3Rpb24sICdhPXJ0Y3AtZmI6JyArIHB0ICsgJyAnKVxuICAgICAgICAubWFwKFNEUFV0aWxzLnBhcnNlUnRjcEZiKTtcbiAgICAgIGRlc2NyaXB0aW9uLmNvZGVjcy5wdXNoKGNvZGVjKTtcbiAgICAgIC8vIHBhcnNlIEZFQyBtZWNoYW5pc21zIGZyb20gcnRwbWFwIGxpbmVzLlxuICAgICAgc3dpdGNoIChjb2RlYy5uYW1lLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgICAgY2FzZSAnUkVEJzpcbiAgICAgICAgY2FzZSAnVUxQRkVDJzpcbiAgICAgICAgICBkZXNjcmlwdGlvbi5mZWNNZWNoYW5pc21zLnB1c2goY29kZWMubmFtZS50b1VwcGVyQ2FzZSgpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDogLy8gb25seSBSRUQgYW5kIFVMUEZFQyBhcmUgcmVjb2duaXplZCBhcyBGRUMgbWVjaGFuaXNtcy5cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1leHRtYXA6JykuZm9yRWFjaChmdW5jdGlvbihsaW5lKSB7XG4gICAgZGVzY3JpcHRpb24uaGVhZGVyRXh0ZW5zaW9ucy5wdXNoKFNEUFV0aWxzLnBhcnNlRXh0bWFwKGxpbmUpKTtcbiAgfSk7XG4gIC8vIEZJWE1FOiBwYXJzZSBydGNwLlxuICByZXR1cm4gZGVzY3JpcHRpb247XG59O1xuXG4vLyBHZW5lcmF0ZXMgcGFydHMgb2YgdGhlIFNEUCBtZWRpYSBzZWN0aW9uIGRlc2NyaWJpbmcgdGhlIGNhcGFiaWxpdGllcyAvXG4vLyBwYXJhbWV0ZXJzLlxuU0RQVXRpbHMud3JpdGVSdHBEZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKGtpbmQsIGNhcHMpIHtcbiAgdmFyIHNkcCA9ICcnO1xuXG4gIC8vIEJ1aWxkIHRoZSBtbGluZS5cbiAgc2RwICs9ICdtPScgKyBraW5kICsgJyAnO1xuICBzZHAgKz0gY2Fwcy5jb2RlY3MubGVuZ3RoID4gMCA/ICc5JyA6ICcwJzsgLy8gcmVqZWN0IGlmIG5vIGNvZGVjcy5cbiAgc2RwICs9ICcgVURQL1RMUy9SVFAvU0FWUEYgJztcbiAgc2RwICs9IGNhcHMuY29kZWNzLm1hcChmdW5jdGlvbihjb2RlYykge1xuICAgIGlmIChjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGU7XG4gICAgfVxuICAgIHJldHVybiBjb2RlYy5wYXlsb2FkVHlwZTtcbiAgfSkuam9pbignICcpICsgJ1xcclxcbic7XG5cbiAgc2RwICs9ICdjPUlOIElQNCAwLjAuMC4wXFxyXFxuJztcbiAgc2RwICs9ICdhPXJ0Y3A6OSBJTiBJUDQgMC4wLjAuMFxcclxcbic7XG5cbiAgLy8gQWRkIGE9cnRwbWFwIGxpbmVzIGZvciBlYWNoIGNvZGVjLiBBbHNvIGZtdHAgYW5kIHJ0Y3AtZmIuXG4gIGNhcHMuY29kZWNzLmZvckVhY2goZnVuY3Rpb24oY29kZWMpIHtcbiAgICBzZHAgKz0gU0RQVXRpbHMud3JpdGVSdHBNYXAoY29kZWMpO1xuICAgIHNkcCArPSBTRFBVdGlscy53cml0ZUZtdHAoY29kZWMpO1xuICAgIHNkcCArPSBTRFBVdGlscy53cml0ZVJ0Y3BGYihjb2RlYyk7XG4gIH0pO1xuICB2YXIgbWF4cHRpbWUgPSAwO1xuICBjYXBzLmNvZGVjcy5mb3JFYWNoKGZ1bmN0aW9uKGNvZGVjKSB7XG4gICAgaWYgKGNvZGVjLm1heHB0aW1lID4gbWF4cHRpbWUpIHtcbiAgICAgIG1heHB0aW1lID0gY29kZWMubWF4cHRpbWU7XG4gICAgfVxuICB9KTtcbiAgaWYgKG1heHB0aW1lID4gMCkge1xuICAgIHNkcCArPSAnYT1tYXhwdGltZTonICsgbWF4cHRpbWUgKyAnXFxyXFxuJztcbiAgfVxuICBzZHAgKz0gJ2E9cnRjcC1tdXhcXHJcXG4nO1xuXG4gIGNhcHMuaGVhZGVyRXh0ZW5zaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGV4dGVuc2lvbikge1xuICAgIHNkcCArPSBTRFBVdGlscy53cml0ZUV4dG1hcChleHRlbnNpb24pO1xuICB9KTtcbiAgLy8gRklYTUU6IHdyaXRlIGZlY01lY2hhbmlzbXMuXG4gIHJldHVybiBzZHA7XG59O1xuXG4vLyBQYXJzZXMgdGhlIFNEUCBtZWRpYSBzZWN0aW9uIGFuZCByZXR1cm5zIGFuIGFycmF5IG9mXG4vLyBSVENSdHBFbmNvZGluZ1BhcmFtZXRlcnMuXG5TRFBVdGlscy5wYXJzZVJ0cEVuY29kaW5nUGFyYW1ldGVycyA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbikge1xuICB2YXIgZW5jb2RpbmdQYXJhbWV0ZXJzID0gW107XG4gIHZhciBkZXNjcmlwdGlvbiA9IFNEUFV0aWxzLnBhcnNlUnRwUGFyYW1ldGVycyhtZWRpYVNlY3Rpb24pO1xuICB2YXIgaGFzUmVkID0gZGVzY3JpcHRpb24uZmVjTWVjaGFuaXNtcy5pbmRleE9mKCdSRUQnKSAhPT0gLTE7XG4gIHZhciBoYXNVbHBmZWMgPSBkZXNjcmlwdGlvbi5mZWNNZWNoYW5pc21zLmluZGV4T2YoJ1VMUEZFQycpICE9PSAtMTtcblxuICAvLyBmaWx0ZXIgYT1zc3JjOi4uLiBjbmFtZTosIGlnbm9yZSBQbGFuQi1tc2lkXG4gIHZhciBzc3JjcyA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9c3NyYzonKVxuICAubWFwKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICByZXR1cm4gU0RQVXRpbHMucGFyc2VTc3JjTWVkaWEobGluZSk7XG4gIH0pXG4gIC5maWx0ZXIoZnVuY3Rpb24ocGFydHMpIHtcbiAgICByZXR1cm4gcGFydHMuYXR0cmlidXRlID09PSAnY25hbWUnO1xuICB9KTtcbiAgdmFyIHByaW1hcnlTc3JjID0gc3NyY3MubGVuZ3RoID4gMCAmJiBzc3Jjc1swXS5zc3JjO1xuICB2YXIgc2Vjb25kYXJ5U3NyYztcblxuICB2YXIgZmxvd3MgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPXNzcmMtZ3JvdXA6RklEJylcbiAgLm1hcChmdW5jdGlvbihsaW5lKSB7XG4gICAgdmFyIHBhcnRzID0gbGluZS5zcGxpdCgnICcpO1xuICAgIHBhcnRzLnNoaWZ0KCk7XG4gICAgcmV0dXJuIHBhcnRzLm1hcChmdW5jdGlvbihwYXJ0KSB7XG4gICAgICByZXR1cm4gcGFyc2VJbnQocGFydCwgMTApO1xuICAgIH0pO1xuICB9KTtcbiAgaWYgKGZsb3dzLmxlbmd0aCA+IDAgJiYgZmxvd3NbMF0ubGVuZ3RoID4gMSAmJiBmbG93c1swXVswXSA9PT0gcHJpbWFyeVNzcmMpIHtcbiAgICBzZWNvbmRhcnlTc3JjID0gZmxvd3NbMF1bMV07XG4gIH1cblxuICBkZXNjcmlwdGlvbi5jb2RlY3MuZm9yRWFjaChmdW5jdGlvbihjb2RlYykge1xuICAgIGlmIChjb2RlYy5uYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdSVFgnICYmIGNvZGVjLnBhcmFtZXRlcnMuYXB0KSB7XG4gICAgICB2YXIgZW5jUGFyYW0gPSB7XG4gICAgICAgIHNzcmM6IHByaW1hcnlTc3JjLFxuICAgICAgICBjb2RlY1BheWxvYWRUeXBlOiBwYXJzZUludChjb2RlYy5wYXJhbWV0ZXJzLmFwdCwgMTApLFxuICAgICAgICBydHg6IHtcbiAgICAgICAgICBzc3JjOiBzZWNvbmRhcnlTc3JjXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBlbmNvZGluZ1BhcmFtZXRlcnMucHVzaChlbmNQYXJhbSk7XG4gICAgICBpZiAoaGFzUmVkKSB7XG4gICAgICAgIGVuY1BhcmFtID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShlbmNQYXJhbSkpO1xuICAgICAgICBlbmNQYXJhbS5mZWMgPSB7XG4gICAgICAgICAgc3NyYzogc2Vjb25kYXJ5U3NyYyxcbiAgICAgICAgICBtZWNoYW5pc206IGhhc1VscGZlYyA/ICdyZWQrdWxwZmVjJyA6ICdyZWQnXG4gICAgICAgIH07XG4gICAgICAgIGVuY29kaW5nUGFyYW1ldGVycy5wdXNoKGVuY1BhcmFtKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICBpZiAoZW5jb2RpbmdQYXJhbWV0ZXJzLmxlbmd0aCA9PT0gMCAmJiBwcmltYXJ5U3NyYykge1xuICAgIGVuY29kaW5nUGFyYW1ldGVycy5wdXNoKHtcbiAgICAgIHNzcmM6IHByaW1hcnlTc3JjXG4gICAgfSk7XG4gIH1cblxuICAvLyB3ZSBzdXBwb3J0IGJvdGggYj1BUyBhbmQgYj1USUFTIGJ1dCBpbnRlcnByZXQgQVMgYXMgVElBUy5cbiAgdmFyIGJhbmR3aWR0aCA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2I9Jyk7XG4gIGlmIChiYW5kd2lkdGgubGVuZ3RoKSB7XG4gICAgaWYgKGJhbmR3aWR0aFswXS5pbmRleE9mKCdiPVRJQVM6JykgPT09IDApIHtcbiAgICAgIGJhbmR3aWR0aCA9IHBhcnNlSW50KGJhbmR3aWR0aFswXS5zdWJzdHIoNyksIDEwKTtcbiAgICB9IGVsc2UgaWYgKGJhbmR3aWR0aFswXS5pbmRleE9mKCdiPUFTOicpID09PSAwKSB7XG4gICAgICAvLyB1c2UgZm9ybXVsYSBmcm9tIEpTRVAgdG8gY29udmVydCBiPUFTIHRvIFRJQVMgdmFsdWUuXG4gICAgICBiYW5kd2lkdGggPSBwYXJzZUludChiYW5kd2lkdGhbMF0uc3Vic3RyKDUpLCAxMCkgKiAxMDAwICogMC45NVxuICAgICAgICAgIC0gKDUwICogNDAgKiA4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgYmFuZHdpZHRoID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBlbmNvZGluZ1BhcmFtZXRlcnMuZm9yRWFjaChmdW5jdGlvbihwYXJhbXMpIHtcbiAgICAgIHBhcmFtcy5tYXhCaXRyYXRlID0gYmFuZHdpZHRoO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBlbmNvZGluZ1BhcmFtZXRlcnM7XG59O1xuXG4vLyBwYXJzZXMgaHR0cDovL2RyYWZ0Lm9ydGMub3JnLyNydGNydGNwcGFyYW1ldGVycypcblNEUFV0aWxzLnBhcnNlUnRjcFBhcmFtZXRlcnMgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcbiAgdmFyIHJ0Y3BQYXJhbWV0ZXJzID0ge307XG5cbiAgdmFyIGNuYW1lO1xuICAvLyBHZXRzIHRoZSBmaXJzdCBTU1JDLiBOb3RlIHRoYXQgd2l0aCBSVFggdGhlcmUgbWlnaHQgYmUgbXVsdGlwbGVcbiAgLy8gU1NSQ3MuXG4gIHZhciByZW1vdGVTc3JjID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1zc3JjOicpXG4gICAgICAubWFwKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgcmV0dXJuIFNEUFV0aWxzLnBhcnNlU3NyY01lZGlhKGxpbmUpO1xuICAgICAgfSlcbiAgICAgIC5maWx0ZXIoZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIHJldHVybiBvYmouYXR0cmlidXRlID09PSAnY25hbWUnO1xuICAgICAgfSlbMF07XG4gIGlmIChyZW1vdGVTc3JjKSB7XG4gICAgcnRjcFBhcmFtZXRlcnMuY25hbWUgPSByZW1vdGVTc3JjLnZhbHVlO1xuICAgIHJ0Y3BQYXJhbWV0ZXJzLnNzcmMgPSByZW1vdGVTc3JjLnNzcmM7XG4gIH1cblxuICAvLyBFZGdlIHVzZXMgdGhlIGNvbXBvdW5kIGF0dHJpYnV0ZSBpbnN0ZWFkIG9mIHJlZHVjZWRTaXplXG4gIC8vIGNvbXBvdW5kIGlzICFyZWR1Y2VkU2l6ZVxuICB2YXIgcnNpemUgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPXJ0Y3AtcnNpemUnKTtcbiAgcnRjcFBhcmFtZXRlcnMucmVkdWNlZFNpemUgPSByc2l6ZS5sZW5ndGggPiAwO1xuICBydGNwUGFyYW1ldGVycy5jb21wb3VuZCA9IHJzaXplLmxlbmd0aCA9PT0gMDtcblxuICAvLyBwYXJzZXMgdGhlIHJ0Y3AtbXV4IGF0dHLRlmJ1dGUuXG4gIC8vIE5vdGUgdGhhdCBFZGdlIGRvZXMgbm90IHN1cHBvcnQgdW5tdXhlZCBSVENQLlxuICB2YXIgbXV4ID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1ydGNwLW11eCcpO1xuICBydGNwUGFyYW1ldGVycy5tdXggPSBtdXgubGVuZ3RoID4gMDtcblxuICByZXR1cm4gcnRjcFBhcmFtZXRlcnM7XG59O1xuXG4vLyBwYXJzZXMgZWl0aGVyIGE9bXNpZDogb3IgYT1zc3JjOi4uLiBtc2lkIGxpbmVzIGFuZCByZXR1cm5zXG4vLyB0aGUgaWQgb2YgdGhlIE1lZGlhU3RyZWFtIGFuZCBNZWRpYVN0cmVhbVRyYWNrLlxuU0RQVXRpbHMucGFyc2VNc2lkID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XG4gIHZhciBwYXJ0cztcbiAgdmFyIHNwZWMgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPW1zaWQ6Jyk7XG4gIGlmIChzcGVjLmxlbmd0aCA9PT0gMSkge1xuICAgIHBhcnRzID0gc3BlY1swXS5zdWJzdHIoNykuc3BsaXQoJyAnKTtcbiAgICByZXR1cm4ge3N0cmVhbTogcGFydHNbMF0sIHRyYWNrOiBwYXJ0c1sxXX07XG4gIH1cbiAgdmFyIHBsYW5CID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1zc3JjOicpXG4gIC5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgIHJldHVybiBTRFBVdGlscy5wYXJzZVNzcmNNZWRpYShsaW5lKTtcbiAgfSlcbiAgLmZpbHRlcihmdW5jdGlvbihwYXJ0cykge1xuICAgIHJldHVybiBwYXJ0cy5hdHRyaWJ1dGUgPT09ICdtc2lkJztcbiAgfSk7XG4gIGlmIChwbGFuQi5sZW5ndGggPiAwKSB7XG4gICAgcGFydHMgPSBwbGFuQlswXS52YWx1ZS5zcGxpdCgnICcpO1xuICAgIHJldHVybiB7c3RyZWFtOiBwYXJ0c1swXSwgdHJhY2s6IHBhcnRzWzFdfTtcbiAgfVxufTtcblxuLy8gR2VuZXJhdGUgYSBzZXNzaW9uIElEIGZvciBTRFAuXG4vLyBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvZHJhZnQtaWV0Zi1ydGN3ZWItanNlcC0yMCNzZWN0aW9uLTUuMi4xXG4vLyByZWNvbW1lbmRzIHVzaW5nIGEgY3J5cHRvZ3JhcGhpY2FsbHkgcmFuZG9tICt2ZSA2NC1iaXQgdmFsdWVcbi8vIGJ1dCByaWdodCBub3cgdGhpcyBzaG91bGQgYmUgYWNjZXB0YWJsZSBhbmQgd2l0aGluIHRoZSByaWdodCByYW5nZVxuU0RQVXRpbHMuZ2VuZXJhdGVTZXNzaW9uSWQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKS5zdWJzdHIoMiwgMjEpO1xufTtcblxuLy8gV3JpdGUgYm9pbGRlciBwbGF0ZSBmb3Igc3RhcnQgb2YgU0RQXG4vLyBzZXNzSWQgYXJndW1lbnQgaXMgb3B0aW9uYWwgLSBpZiBub3Qgc3VwcGxpZWQgaXQgd2lsbFxuLy8gYmUgZ2VuZXJhdGVkIHJhbmRvbWx5XG4vLyBzZXNzVmVyc2lvbiBpcyBvcHRpb25hbCBhbmQgZGVmYXVsdHMgdG8gMlxuU0RQVXRpbHMud3JpdGVTZXNzaW9uQm9pbGVycGxhdGUgPSBmdW5jdGlvbihzZXNzSWQsIHNlc3NWZXIpIHtcbiAgdmFyIHNlc3Npb25JZDtcbiAgdmFyIHZlcnNpb24gPSBzZXNzVmVyICE9PSB1bmRlZmluZWQgPyBzZXNzVmVyIDogMjtcbiAgaWYgKHNlc3NJZCkge1xuICAgIHNlc3Npb25JZCA9IHNlc3NJZDtcbiAgfSBlbHNlIHtcbiAgICBzZXNzaW9uSWQgPSBTRFBVdGlscy5nZW5lcmF0ZVNlc3Npb25JZCgpO1xuICB9XG4gIC8vIEZJWE1FOiBzZXNzLWlkIHNob3VsZCBiZSBhbiBOVFAgdGltZXN0YW1wLlxuICByZXR1cm4gJ3Y9MFxcclxcbicgK1xuICAgICAgJ289dGhpc2lzYWRhcHRlcm9ydGMgJyArIHNlc3Npb25JZCArICcgJyArIHZlcnNpb24gKyAnIElOIElQNCAxMjcuMC4wLjFcXHJcXG4nICtcbiAgICAgICdzPS1cXHJcXG4nICtcbiAgICAgICd0PTAgMFxcclxcbic7XG59O1xuXG5TRFBVdGlscy53cml0ZU1lZGlhU2VjdGlvbiA9IGZ1bmN0aW9uKHRyYW5zY2VpdmVyLCBjYXBzLCB0eXBlLCBzdHJlYW0pIHtcbiAgdmFyIHNkcCA9IFNEUFV0aWxzLndyaXRlUnRwRGVzY3JpcHRpb24odHJhbnNjZWl2ZXIua2luZCwgY2Fwcyk7XG5cbiAgLy8gTWFwIElDRSBwYXJhbWV0ZXJzICh1ZnJhZywgcHdkKSB0byBTRFAuXG4gIHNkcCArPSBTRFBVdGlscy53cml0ZUljZVBhcmFtZXRlcnMoXG4gICAgICB0cmFuc2NlaXZlci5pY2VHYXRoZXJlci5nZXRMb2NhbFBhcmFtZXRlcnMoKSk7XG5cbiAgLy8gTWFwIERUTFMgcGFyYW1ldGVycyB0byBTRFAuXG4gIHNkcCArPSBTRFBVdGlscy53cml0ZUR0bHNQYXJhbWV0ZXJzKFxuICAgICAgdHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydC5nZXRMb2NhbFBhcmFtZXRlcnMoKSxcbiAgICAgIHR5cGUgPT09ICdvZmZlcicgPyAnYWN0cGFzcycgOiAnYWN0aXZlJyk7XG5cbiAgc2RwICs9ICdhPW1pZDonICsgdHJhbnNjZWl2ZXIubWlkICsgJ1xcclxcbic7XG5cbiAgaWYgKHRyYW5zY2VpdmVyLmRpcmVjdGlvbikge1xuICAgIHNkcCArPSAnYT0nICsgdHJhbnNjZWl2ZXIuZGlyZWN0aW9uICsgJ1xcclxcbic7XG4gIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIucnRwU2VuZGVyICYmIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyKSB7XG4gICAgc2RwICs9ICdhPXNlbmRyZWN2XFxyXFxuJztcbiAgfSBlbHNlIGlmICh0cmFuc2NlaXZlci5ydHBTZW5kZXIpIHtcbiAgICBzZHAgKz0gJ2E9c2VuZG9ubHlcXHJcXG4nO1xuICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyKSB7XG4gICAgc2RwICs9ICdhPXJlY3Zvbmx5XFxyXFxuJztcbiAgfSBlbHNlIHtcbiAgICBzZHAgKz0gJ2E9aW5hY3RpdmVcXHJcXG4nO1xuICB9XG5cbiAgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlcikge1xuICAgIC8vIHNwZWMuXG4gICAgdmFyIG1zaWQgPSAnbXNpZDonICsgc3RyZWFtLmlkICsgJyAnICtcbiAgICAgICAgdHJhbnNjZWl2ZXIucnRwU2VuZGVyLnRyYWNrLmlkICsgJ1xcclxcbic7XG4gICAgc2RwICs9ICdhPScgKyBtc2lkO1xuXG4gICAgLy8gZm9yIENocm9tZS5cbiAgICBzZHAgKz0gJ2E9c3NyYzonICsgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjICtcbiAgICAgICAgJyAnICsgbXNpZDtcbiAgICBpZiAodHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHgpIHtcbiAgICAgIHNkcCArPSAnYT1zc3JjOicgKyB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eC5zc3JjICtcbiAgICAgICAgICAnICcgKyBtc2lkO1xuICAgICAgc2RwICs9ICdhPXNzcmMtZ3JvdXA6RklEICcgK1xuICAgICAgICAgIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYyArICcgJyArXG4gICAgICAgICAgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHguc3NyYyArXG4gICAgICAgICAgJ1xcclxcbic7XG4gICAgfVxuICB9XG4gIC8vIEZJWE1FOiB0aGlzIHNob3VsZCBiZSB3cml0dGVuIGJ5IHdyaXRlUnRwRGVzY3JpcHRpb24uXG4gIHNkcCArPSAnYT1zc3JjOicgKyB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmMgK1xuICAgICAgJyBjbmFtZTonICsgU0RQVXRpbHMubG9jYWxDTmFtZSArICdcXHJcXG4nO1xuICBpZiAodHJhbnNjZWl2ZXIucnRwU2VuZGVyICYmIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4KSB7XG4gICAgc2RwICs9ICdhPXNzcmM6JyArIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4LnNzcmMgK1xuICAgICAgICAnIGNuYW1lOicgKyBTRFBVdGlscy5sb2NhbENOYW1lICsgJ1xcclxcbic7XG4gIH1cbiAgcmV0dXJuIHNkcDtcbn07XG5cbi8vIEdldHMgdGhlIGRpcmVjdGlvbiBmcm9tIHRoZSBtZWRpYVNlY3Rpb24gb3IgdGhlIHNlc3Npb25wYXJ0LlxuU0RQVXRpbHMuZ2V0RGlyZWN0aW9uID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uLCBzZXNzaW9ucGFydCkge1xuICAvLyBMb29rIGZvciBzZW5kcmVjdiwgc2VuZG9ubHksIHJlY3Zvbmx5LCBpbmFjdGl2ZSwgZGVmYXVsdCB0byBzZW5kcmVjdi5cbiAgdmFyIGxpbmVzID0gU0RQVXRpbHMuc3BsaXRMaW5lcyhtZWRpYVNlY3Rpb24pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgc3dpdGNoIChsaW5lc1tpXSkge1xuICAgICAgY2FzZSAnYT1zZW5kcmVjdic6XG4gICAgICBjYXNlICdhPXNlbmRvbmx5JzpcbiAgICAgIGNhc2UgJ2E9cmVjdm9ubHknOlxuICAgICAgY2FzZSAnYT1pbmFjdGl2ZSc6XG4gICAgICAgIHJldHVybiBsaW5lc1tpXS5zdWJzdHIoMik7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBGSVhNRTogV2hhdCBzaG91bGQgaGFwcGVuIGhlcmU/XG4gICAgfVxuICB9XG4gIGlmIChzZXNzaW9ucGFydCkge1xuICAgIHJldHVybiBTRFBVdGlscy5nZXREaXJlY3Rpb24oc2Vzc2lvbnBhcnQpO1xuICB9XG4gIHJldHVybiAnc2VuZHJlY3YnO1xufTtcblxuU0RQVXRpbHMuZ2V0S2luZCA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbikge1xuICB2YXIgbGluZXMgPSBTRFBVdGlscy5zcGxpdExpbmVzKG1lZGlhU2VjdGlvbik7XG4gIHZhciBtbGluZSA9IGxpbmVzWzBdLnNwbGl0KCcgJyk7XG4gIHJldHVybiBtbGluZVswXS5zdWJzdHIoMik7XG59O1xuXG5TRFBVdGlscy5pc1JlamVjdGVkID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XG4gIHJldHVybiBtZWRpYVNlY3Rpb24uc3BsaXQoJyAnLCAyKVsxXSA9PT0gJzAnO1xufTtcblxuU0RQVXRpbHMucGFyc2VNTGluZSA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbikge1xuICB2YXIgbGluZXMgPSBTRFBVdGlscy5zcGxpdExpbmVzKG1lZGlhU2VjdGlvbik7XG4gIHZhciBwYXJ0cyA9IGxpbmVzWzBdLnN1YnN0cigyKS5zcGxpdCgnICcpO1xuICByZXR1cm4ge1xuICAgIGtpbmQ6IHBhcnRzWzBdLFxuICAgIHBvcnQ6IHBhcnNlSW50KHBhcnRzWzFdLCAxMCksXG4gICAgcHJvdG9jb2w6IHBhcnRzWzJdLFxuICAgIGZtdDogcGFydHMuc2xpY2UoMykuam9pbignICcpXG4gIH07XG59O1xuXG5TRFBVdGlscy5wYXJzZU9MaW5lID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XG4gIHZhciBsaW5lID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnbz0nKVswXTtcbiAgdmFyIHBhcnRzID0gbGluZS5zdWJzdHIoMikuc3BsaXQoJyAnKTtcbiAgcmV0dXJuIHtcbiAgICB1c2VybmFtZTogcGFydHNbMF0sXG4gICAgc2Vzc2lvbklkOiBwYXJ0c1sxXSxcbiAgICBzZXNzaW9uVmVyc2lvbjogcGFyc2VJbnQocGFydHNbMl0sIDEwKSxcbiAgICBuZXRUeXBlOiBwYXJ0c1szXSxcbiAgICBhZGRyZXNzVHlwZTogcGFydHNbNF0sXG4gICAgYWRkcmVzczogcGFydHNbNV0sXG4gIH07XG59XG5cbi8vIEV4cG9zZSBwdWJsaWMgbWV0aG9kcy5cbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jykge1xuICBtb2R1bGUuZXhwb3J0cyA9IFNEUFV0aWxzO1xufVxuXG59LHt9XSwzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbihmdW5jdGlvbiAoZ2xvYmFsKXtcbi8qXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXG4gKiAgdHJlZS5cbiAqL1xuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBhZGFwdGVyRmFjdG9yeSA9IHJlcXVpcmUoJy4vYWRhcHRlcl9mYWN0b3J5LmpzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGFkYXB0ZXJGYWN0b3J5KHt3aW5kb3c6IGdsb2JhbC53aW5kb3d9KTtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG59LHtcIi4vYWRhcHRlcl9mYWN0b3J5LmpzXCI6NH1dLDQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLypcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcbiAqICB0cmVlLlxuICovXG4gLyogZXNsaW50LWVudiBub2RlICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuLy8gU2hpbW1pbmcgc3RhcnRzIGhlcmUuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRlcGVuZGVuY2llcywgb3B0cykge1xuICB2YXIgd2luZG93ID0gZGVwZW5kZW5jaWVzICYmIGRlcGVuZGVuY2llcy53aW5kb3c7XG5cbiAgdmFyIG9wdGlvbnMgPSB7XG4gICAgc2hpbUNocm9tZTogdHJ1ZSxcbiAgICBzaGltRmlyZWZveDogdHJ1ZSxcbiAgICBzaGltRWRnZTogdHJ1ZSxcbiAgICBzaGltU2FmYXJpOiB0cnVlLFxuICB9O1xuXG4gIGZvciAodmFyIGtleSBpbiBvcHRzKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob3B0cywga2V5KSkge1xuICAgICAgb3B0aW9uc1trZXldID0gb3B0c1trZXldO1xuICAgIH1cbiAgfVxuXG4gIC8vIFV0aWxzLlxuICB2YXIgbG9nZ2luZyA9IHV0aWxzLmxvZztcbiAgdmFyIGJyb3dzZXJEZXRhaWxzID0gdXRpbHMuZGV0ZWN0QnJvd3Nlcih3aW5kb3cpO1xuXG4gIC8vIFVuY29tbWVudCB0aGUgbGluZSBiZWxvdyBpZiB5b3Ugd2FudCBsb2dnaW5nIHRvIG9jY3VyLCBpbmNsdWRpbmcgbG9nZ2luZ1xuICAvLyBmb3IgdGhlIHN3aXRjaCBzdGF0ZW1lbnQgYmVsb3cuIENhbiBhbHNvIGJlIHR1cm5lZCBvbiBpbiB0aGUgYnJvd3NlciB2aWFcbiAgLy8gYWRhcHRlci5kaXNhYmxlTG9nKGZhbHNlKSwgYnV0IHRoZW4gbG9nZ2luZyBmcm9tIHRoZSBzd2l0Y2ggc3RhdGVtZW50IGJlbG93XG4gIC8vIHdpbGwgbm90IGFwcGVhci5cbiAgLy8gcmVxdWlyZSgnLi91dGlscycpLmRpc2FibGVMb2coZmFsc2UpO1xuXG4gIC8vIEJyb3dzZXIgc2hpbXMuXG4gIHZhciBjaHJvbWVTaGltID0gcmVxdWlyZSgnLi9jaHJvbWUvY2hyb21lX3NoaW0nKSB8fCBudWxsO1xuICB2YXIgZWRnZVNoaW0gPSByZXF1aXJlKCcuL2VkZ2UvZWRnZV9zaGltJykgfHwgbnVsbDtcbiAgdmFyIGZpcmVmb3hTaGltID0gcmVxdWlyZSgnLi9maXJlZm94L2ZpcmVmb3hfc2hpbScpIHx8IG51bGw7XG4gIHZhciBzYWZhcmlTaGltID0gcmVxdWlyZSgnLi9zYWZhcmkvc2FmYXJpX3NoaW0nKSB8fCBudWxsO1xuICB2YXIgY29tbW9uU2hpbSA9IHJlcXVpcmUoJy4vY29tbW9uX3NoaW0nKSB8fCBudWxsO1xuXG4gIC8vIEV4cG9ydCB0byB0aGUgYWRhcHRlciBnbG9iYWwgb2JqZWN0IHZpc2libGUgaW4gdGhlIGJyb3dzZXIuXG4gIHZhciBhZGFwdGVyID0ge1xuICAgIGJyb3dzZXJEZXRhaWxzOiBicm93c2VyRGV0YWlscyxcbiAgICBjb21tb25TaGltOiBjb21tb25TaGltLFxuICAgIGV4dHJhY3RWZXJzaW9uOiB1dGlscy5leHRyYWN0VmVyc2lvbixcbiAgICBkaXNhYmxlTG9nOiB1dGlscy5kaXNhYmxlTG9nLFxuICAgIGRpc2FibGVXYXJuaW5nczogdXRpbHMuZGlzYWJsZVdhcm5pbmdzXG4gIH07XG5cbiAgLy8gU2hpbSBicm93c2VyIGlmIGZvdW5kLlxuICBzd2l0Y2ggKGJyb3dzZXJEZXRhaWxzLmJyb3dzZXIpIHtcbiAgICBjYXNlICdjaHJvbWUnOlxuICAgICAgaWYgKCFjaHJvbWVTaGltIHx8ICFjaHJvbWVTaGltLnNoaW1QZWVyQ29ubmVjdGlvbiB8fFxuICAgICAgICAgICFvcHRpb25zLnNoaW1DaHJvbWUpIHtcbiAgICAgICAgbG9nZ2luZygnQ2hyb21lIHNoaW0gaXMgbm90IGluY2x1ZGVkIGluIHRoaXMgYWRhcHRlciByZWxlYXNlLicpO1xuICAgICAgICByZXR1cm4gYWRhcHRlcjtcbiAgICAgIH1cbiAgICAgIGxvZ2dpbmcoJ2FkYXB0ZXIuanMgc2hpbW1pbmcgY2hyb21lLicpO1xuICAgICAgLy8gRXhwb3J0IHRvIHRoZSBhZGFwdGVyIGdsb2JhbCBvYmplY3QgdmlzaWJsZSBpbiB0aGUgYnJvd3Nlci5cbiAgICAgIGFkYXB0ZXIuYnJvd3NlclNoaW0gPSBjaHJvbWVTaGltO1xuICAgICAgY29tbW9uU2hpbS5zaGltQ3JlYXRlT2JqZWN0VVJMKHdpbmRvdyk7XG5cbiAgICAgIGNocm9tZVNoaW0uc2hpbUdldFVzZXJNZWRpYSh3aW5kb3cpO1xuICAgICAgY2hyb21lU2hpbS5zaGltTWVkaWFTdHJlYW0od2luZG93KTtcbiAgICAgIGNocm9tZVNoaW0uc2hpbVNvdXJjZU9iamVjdCh3aW5kb3cpO1xuICAgICAgY2hyb21lU2hpbS5zaGltUGVlckNvbm5lY3Rpb24od2luZG93KTtcbiAgICAgIGNocm9tZVNoaW0uc2hpbU9uVHJhY2sod2luZG93KTtcbiAgICAgIGNocm9tZVNoaW0uc2hpbUFkZFRyYWNrUmVtb3ZlVHJhY2sod2luZG93KTtcbiAgICAgIGNocm9tZVNoaW0uc2hpbUdldFNlbmRlcnNXaXRoRHRtZih3aW5kb3cpO1xuXG4gICAgICBjb21tb25TaGltLnNoaW1SVENJY2VDYW5kaWRhdGUod2luZG93KTtcbiAgICAgIGNvbW1vblNoaW0uc2hpbU1heE1lc3NhZ2VTaXplKHdpbmRvdyk7XG4gICAgICBjb21tb25TaGltLnNoaW1TZW5kVGhyb3dUeXBlRXJyb3Iod2luZG93KTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2ZpcmVmb3gnOlxuICAgICAgaWYgKCFmaXJlZm94U2hpbSB8fCAhZmlyZWZveFNoaW0uc2hpbVBlZXJDb25uZWN0aW9uIHx8XG4gICAgICAgICAgIW9wdGlvbnMuc2hpbUZpcmVmb3gpIHtcbiAgICAgICAgbG9nZ2luZygnRmlyZWZveCBzaGltIGlzIG5vdCBpbmNsdWRlZCBpbiB0aGlzIGFkYXB0ZXIgcmVsZWFzZS4nKTtcbiAgICAgICAgcmV0dXJuIGFkYXB0ZXI7XG4gICAgICB9XG4gICAgICBsb2dnaW5nKCdhZGFwdGVyLmpzIHNoaW1taW5nIGZpcmVmb3guJyk7XG4gICAgICAvLyBFeHBvcnQgdG8gdGhlIGFkYXB0ZXIgZ2xvYmFsIG9iamVjdCB2aXNpYmxlIGluIHRoZSBicm93c2VyLlxuICAgICAgYWRhcHRlci5icm93c2VyU2hpbSA9IGZpcmVmb3hTaGltO1xuICAgICAgY29tbW9uU2hpbS5zaGltQ3JlYXRlT2JqZWN0VVJMKHdpbmRvdyk7XG5cbiAgICAgIGZpcmVmb3hTaGltLnNoaW1HZXRVc2VyTWVkaWEod2luZG93KTtcbiAgICAgIGZpcmVmb3hTaGltLnNoaW1Tb3VyY2VPYmplY3Qod2luZG93KTtcbiAgICAgIGZpcmVmb3hTaGltLnNoaW1QZWVyQ29ubmVjdGlvbih3aW5kb3cpO1xuICAgICAgZmlyZWZveFNoaW0uc2hpbU9uVHJhY2sod2luZG93KTtcbiAgICAgIGZpcmVmb3hTaGltLnNoaW1SZW1vdmVTdHJlYW0od2luZG93KTtcblxuICAgICAgY29tbW9uU2hpbS5zaGltUlRDSWNlQ2FuZGlkYXRlKHdpbmRvdyk7XG4gICAgICBjb21tb25TaGltLnNoaW1NYXhNZXNzYWdlU2l6ZSh3aW5kb3cpO1xuICAgICAgY29tbW9uU2hpbS5zaGltU2VuZFRocm93VHlwZUVycm9yKHdpbmRvdyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdlZGdlJzpcbiAgICAgIGlmICghZWRnZVNoaW0gfHwgIWVkZ2VTaGltLnNoaW1QZWVyQ29ubmVjdGlvbiB8fCAhb3B0aW9ucy5zaGltRWRnZSkge1xuICAgICAgICBsb2dnaW5nKCdNUyBlZGdlIHNoaW0gaXMgbm90IGluY2x1ZGVkIGluIHRoaXMgYWRhcHRlciByZWxlYXNlLicpO1xuICAgICAgICByZXR1cm4gYWRhcHRlcjtcbiAgICAgIH1cbiAgICAgIGxvZ2dpbmcoJ2FkYXB0ZXIuanMgc2hpbW1pbmcgZWRnZS4nKTtcbiAgICAgIC8vIEV4cG9ydCB0byB0aGUgYWRhcHRlciBnbG9iYWwgb2JqZWN0IHZpc2libGUgaW4gdGhlIGJyb3dzZXIuXG4gICAgICBhZGFwdGVyLmJyb3dzZXJTaGltID0gZWRnZVNoaW07XG4gICAgICBjb21tb25TaGltLnNoaW1DcmVhdGVPYmplY3RVUkwod2luZG93KTtcblxuICAgICAgZWRnZVNoaW0uc2hpbUdldFVzZXJNZWRpYSh3aW5kb3cpO1xuICAgICAgZWRnZVNoaW0uc2hpbVBlZXJDb25uZWN0aW9uKHdpbmRvdyk7XG4gICAgICBlZGdlU2hpbS5zaGltUmVwbGFjZVRyYWNrKHdpbmRvdyk7XG5cbiAgICAgIC8vIHRoZSBlZGdlIHNoaW0gaW1wbGVtZW50cyB0aGUgZnVsbCBSVENJY2VDYW5kaWRhdGUgb2JqZWN0LlxuXG4gICAgICBjb21tb25TaGltLnNoaW1NYXhNZXNzYWdlU2l6ZSh3aW5kb3cpO1xuICAgICAgY29tbW9uU2hpbS5zaGltU2VuZFRocm93VHlwZUVycm9yKHdpbmRvdyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdzYWZhcmknOlxuICAgICAgaWYgKCFzYWZhcmlTaGltIHx8ICFvcHRpb25zLnNoaW1TYWZhcmkpIHtcbiAgICAgICAgbG9nZ2luZygnU2FmYXJpIHNoaW0gaXMgbm90IGluY2x1ZGVkIGluIHRoaXMgYWRhcHRlciByZWxlYXNlLicpO1xuICAgICAgICByZXR1cm4gYWRhcHRlcjtcbiAgICAgIH1cbiAgICAgIGxvZ2dpbmcoJ2FkYXB0ZXIuanMgc2hpbW1pbmcgc2FmYXJpLicpO1xuICAgICAgLy8gRXhwb3J0IHRvIHRoZSBhZGFwdGVyIGdsb2JhbCBvYmplY3QgdmlzaWJsZSBpbiB0aGUgYnJvd3Nlci5cbiAgICAgIGFkYXB0ZXIuYnJvd3NlclNoaW0gPSBzYWZhcmlTaGltO1xuICAgICAgY29tbW9uU2hpbS5zaGltQ3JlYXRlT2JqZWN0VVJMKHdpbmRvdyk7XG5cbiAgICAgIHNhZmFyaVNoaW0uc2hpbVJUQ0ljZVNlcnZlclVybHMod2luZG93KTtcbiAgICAgIHNhZmFyaVNoaW0uc2hpbUNhbGxiYWNrc0FQSSh3aW5kb3cpO1xuICAgICAgc2FmYXJpU2hpbS5zaGltTG9jYWxTdHJlYW1zQVBJKHdpbmRvdyk7XG4gICAgICBzYWZhcmlTaGltLnNoaW1SZW1vdGVTdHJlYW1zQVBJKHdpbmRvdyk7XG4gICAgICBzYWZhcmlTaGltLnNoaW1UcmFja0V2ZW50VHJhbnNjZWl2ZXIod2luZG93KTtcbiAgICAgIHNhZmFyaVNoaW0uc2hpbUdldFVzZXJNZWRpYSh3aW5kb3cpO1xuICAgICAgc2FmYXJpU2hpbS5zaGltQ3JlYXRlT2ZmZXJMZWdhY3kod2luZG93KTtcblxuICAgICAgY29tbW9uU2hpbS5zaGltUlRDSWNlQ2FuZGlkYXRlKHdpbmRvdyk7XG4gICAgICBjb21tb25TaGltLnNoaW1NYXhNZXNzYWdlU2l6ZSh3aW5kb3cpO1xuICAgICAgY29tbW9uU2hpbS5zaGltU2VuZFRocm93VHlwZUVycm9yKHdpbmRvdyk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgbG9nZ2luZygnVW5zdXBwb3J0ZWQgYnJvd3NlciEnKTtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuIGFkYXB0ZXI7XG59O1xuXG59LHtcIi4vY2hyb21lL2Nocm9tZV9zaGltXCI6NSxcIi4vY29tbW9uX3NoaW1cIjo3LFwiLi9lZGdlL2VkZ2Vfc2hpbVwiOjgsXCIuL2ZpcmVmb3gvZmlyZWZveF9zaGltXCI6MTAsXCIuL3NhZmFyaS9zYWZhcmlfc2hpbVwiOjEyLFwiLi91dGlsc1wiOjEzfV0sNTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbi8qXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXG4gKiAgdHJlZS5cbiAqL1xuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xuJ3VzZSBzdHJpY3QnO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMuanMnKTtcbnZhciBsb2dnaW5nID0gdXRpbHMubG9nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2hpbUdldFVzZXJNZWRpYTogcmVxdWlyZSgnLi9nZXR1c2VybWVkaWEnKSxcbiAgc2hpbU1lZGlhU3RyZWFtOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICB3aW5kb3cuTWVkaWFTdHJlYW0gPSB3aW5kb3cuTWVkaWFTdHJlYW0gfHwgd2luZG93LndlYmtpdE1lZGlhU3RyZWFtO1xuICB9LFxuXG4gIHNoaW1PblRyYWNrOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uICYmICEoJ29udHJhY2snIGluXG4gICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSwgJ29udHJhY2snLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX29udHJhY2s7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24oZikge1xuICAgICAgICAgIGlmICh0aGlzLl9vbnRyYWNrKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYWNrJywgdGhpcy5fb250cmFjayk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigndHJhY2snLCB0aGlzLl9vbnRyYWNrID0gZik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdmFyIG9yaWdTZXRSZW1vdGVEZXNjcmlwdGlvbiA9XG4gICAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5zZXRSZW1vdGVEZXNjcmlwdGlvbjtcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0UmVtb3RlRGVzY3JpcHRpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgICAgaWYgKCFwYy5fb250cmFja3BvbHkpIHtcbiAgICAgICAgICBwYy5fb250cmFja3BvbHkgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAvLyBvbmFkZHN0cmVhbSBkb2VzIG5vdCBmaXJlIHdoZW4gYSB0cmFjayBpcyBhZGRlZCB0byBhbiBleGlzdGluZ1xuICAgICAgICAgICAgLy8gc3RyZWFtLiBCdXQgc3RyZWFtLm9uYWRkdHJhY2sgaXMgaW1wbGVtZW50ZWQgc28gd2UgdXNlIHRoYXQuXG4gICAgICAgICAgICBlLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKCdhZGR0cmFjaycsIGZ1bmN0aW9uKHRlKSB7XG4gICAgICAgICAgICAgIHZhciByZWNlaXZlcjtcbiAgICAgICAgICAgICAgaWYgKHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0UmVjZWl2ZXJzKSB7XG4gICAgICAgICAgICAgICAgcmVjZWl2ZXIgPSBwYy5nZXRSZWNlaXZlcnMoKS5maW5kKGZ1bmN0aW9uKHIpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiByLnRyYWNrICYmIHIudHJhY2suaWQgPT09IHRlLnRyYWNrLmlkO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlY2VpdmVyID0ge3RyYWNrOiB0ZS50cmFja307XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ3RyYWNrJyk7XG4gICAgICAgICAgICAgIGV2ZW50LnRyYWNrID0gdGUudHJhY2s7XG4gICAgICAgICAgICAgIGV2ZW50LnJlY2VpdmVyID0gcmVjZWl2ZXI7XG4gICAgICAgICAgICAgIGV2ZW50LnRyYW5zY2VpdmVyID0ge3JlY2VpdmVyOiByZWNlaXZlcn07XG4gICAgICAgICAgICAgIGV2ZW50LnN0cmVhbXMgPSBbZS5zdHJlYW1dO1xuICAgICAgICAgICAgICBwYy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZS5zdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xuICAgICAgICAgICAgICB2YXIgcmVjZWl2ZXI7XG4gICAgICAgICAgICAgIGlmICh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFJlY2VpdmVycykge1xuICAgICAgICAgICAgICAgIHJlY2VpdmVyID0gcGMuZ2V0UmVjZWl2ZXJzKCkuZmluZChmdW5jdGlvbihyKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gci50cmFjayAmJiByLnRyYWNrLmlkID09PSB0cmFjay5pZDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWNlaXZlciA9IHt0cmFjazogdHJhY2t9O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgndHJhY2snKTtcbiAgICAgICAgICAgICAgZXZlbnQudHJhY2sgPSB0cmFjaztcbiAgICAgICAgICAgICAgZXZlbnQucmVjZWl2ZXIgPSByZWNlaXZlcjtcbiAgICAgICAgICAgICAgZXZlbnQudHJhbnNjZWl2ZXIgPSB7cmVjZWl2ZXI6IHJlY2VpdmVyfTtcbiAgICAgICAgICAgICAgZXZlbnQuc3RyZWFtcyA9IFtlLnN0cmVhbV07XG4gICAgICAgICAgICAgIHBjLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICBwYy5hZGRFdmVudExpc3RlbmVyKCdhZGRzdHJlYW0nLCBwYy5fb250cmFja3BvbHkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvcmlnU2V0UmVtb3RlRGVzY3JpcHRpb24uYXBwbHkocGMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAoISgnUlRDUnRwVHJhbnNjZWl2ZXInIGluIHdpbmRvdykpIHtcbiAgICAgIHV0aWxzLndyYXBQZWVyQ29ubmVjdGlvbkV2ZW50KHdpbmRvdywgJ3RyYWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoIWUudHJhbnNjZWl2ZXIpIHtcbiAgICAgICAgICBlLnRyYW5zY2VpdmVyID0ge3JlY2VpdmVyOiBlLnJlY2VpdmVyfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICBzaGltR2V0U2VuZGVyc1dpdGhEdG1mOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICAvLyBPdmVycmlkZXMgYWRkVHJhY2svcmVtb3ZlVHJhY2ssIGRlcGVuZHMgb24gc2hpbUFkZFRyYWNrUmVtb3ZlVHJhY2suXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiAmJlxuICAgICAgICAhKCdnZXRTZW5kZXJzJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSAmJlxuICAgICAgICAnY3JlYXRlRFRNRlNlbmRlcicgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkge1xuICAgICAgdmFyIHNoaW1TZW5kZXJXaXRoRHRtZiA9IGZ1bmN0aW9uKHBjLCB0cmFjaykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRyYWNrOiB0cmFjayxcbiAgICAgICAgICBnZXQgZHRtZigpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9kdG1mID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgaWYgKHRyYWNrLmtpbmQgPT09ICdhdWRpbycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kdG1mID0gcGMuY3JlYXRlRFRNRlNlbmRlcih0cmFjayk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZHRtZiA9IG51bGw7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kdG1mO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgX3BjOiBwY1xuICAgICAgICB9O1xuICAgICAgfTtcblxuICAgICAgLy8gYXVnbWVudCBhZGRUcmFjayB3aGVuIGdldFNlbmRlcnMgaXMgbm90IGF2YWlsYWJsZS5cbiAgICAgIGlmICghd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTZW5kZXJzKSB7XG4gICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U2VuZGVycyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRoaXMuX3NlbmRlcnMgPSB0aGlzLl9zZW5kZXJzIHx8IFtdO1xuICAgICAgICAgIHJldHVybiB0aGlzLl9zZW5kZXJzLnNsaWNlKCk7IC8vIHJldHVybiBhIGNvcHkgb2YgdGhlIGludGVybmFsIHN0YXRlLlxuICAgICAgICB9O1xuICAgICAgICB2YXIgb3JpZ0FkZFRyYWNrID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjaztcbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjayA9IGZ1bmN0aW9uKHRyYWNrLCBzdHJlYW0pIHtcbiAgICAgICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgICAgIHZhciBzZW5kZXIgPSBvcmlnQWRkVHJhY2suYXBwbHkocGMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgaWYgKCFzZW5kZXIpIHtcbiAgICAgICAgICAgIHNlbmRlciA9IHNoaW1TZW5kZXJXaXRoRHRtZihwYywgdHJhY2spO1xuICAgICAgICAgICAgcGMuX3NlbmRlcnMucHVzaChzZW5kZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gc2VuZGVyO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBvcmlnUmVtb3ZlVHJhY2sgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVRyYWNrO1xuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVRyYWNrID0gZnVuY3Rpb24oc2VuZGVyKSB7XG4gICAgICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgICAgICBvcmlnUmVtb3ZlVHJhY2suYXBwbHkocGMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgdmFyIGlkeCA9IHBjLl9zZW5kZXJzLmluZGV4T2Yoc2VuZGVyKTtcbiAgICAgICAgICBpZiAoaWR4ICE9PSAtMSkge1xuICAgICAgICAgICAgcGMuX3NlbmRlcnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgdmFyIG9yaWdBZGRTdHJlYW0gPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFN0cmVhbTtcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICAgIHBjLl9zZW5kZXJzID0gcGMuX3NlbmRlcnMgfHwgW107XG4gICAgICAgIG9yaWdBZGRTdHJlYW0uYXBwbHkocGMsIFtzdHJlYW1dKTtcbiAgICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcbiAgICAgICAgICBwYy5fc2VuZGVycy5wdXNoKHNoaW1TZW5kZXJXaXRoRHRtZihwYywgdHJhY2spKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICB2YXIgb3JpZ1JlbW92ZVN0cmVhbSA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlU3RyZWFtO1xuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgICAgcGMuX3NlbmRlcnMgPSBwYy5fc2VuZGVycyB8fCBbXTtcbiAgICAgICAgb3JpZ1JlbW92ZVN0cmVhbS5hcHBseShwYywgW3N0cmVhbV0pO1xuXG4gICAgICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XG4gICAgICAgICAgdmFyIHNlbmRlciA9IHBjLl9zZW5kZXJzLmZpbmQoZnVuY3Rpb24ocykge1xuICAgICAgICAgICAgcmV0dXJuIHMudHJhY2sgPT09IHRyYWNrO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChzZW5kZXIpIHtcbiAgICAgICAgICAgIHBjLl9zZW5kZXJzLnNwbGljZShwYy5fc2VuZGVycy5pbmRleE9mKHNlbmRlciksIDEpOyAvLyByZW1vdmUgc2VuZGVyXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gJiZcbiAgICAgICAgICAgICAgICdnZXRTZW5kZXJzJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlICYmXG4gICAgICAgICAgICAgICAnY3JlYXRlRFRNRlNlbmRlcicgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSAmJlxuICAgICAgICAgICAgICAgd2luZG93LlJUQ1J0cFNlbmRlciAmJlxuICAgICAgICAgICAgICAgISgnZHRtZicgaW4gd2luZG93LlJUQ1J0cFNlbmRlci5wcm90b3R5cGUpKSB7XG4gICAgICB2YXIgb3JpZ0dldFNlbmRlcnMgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFNlbmRlcnM7XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFNlbmRlcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgICAgdmFyIHNlbmRlcnMgPSBvcmlnR2V0U2VuZGVycy5hcHBseShwYywgW10pO1xuICAgICAgICBzZW5kZXJzLmZvckVhY2goZnVuY3Rpb24oc2VuZGVyKSB7XG4gICAgICAgICAgc2VuZGVyLl9wYyA9IHBjO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHNlbmRlcnM7XG4gICAgICB9O1xuXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1J0cFNlbmRlci5wcm90b3R5cGUsICdkdG1mJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICh0aGlzLl9kdG1mID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRyYWNrLmtpbmQgPT09ICdhdWRpbycpIHtcbiAgICAgICAgICAgICAgdGhpcy5fZHRtZiA9IHRoaXMuX3BjLmNyZWF0ZURUTUZTZW5kZXIodGhpcy50cmFjayk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLl9kdG1mID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2R0bWY7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICBzaGltU291cmNlT2JqZWN0OiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICB2YXIgVVJMID0gd2luZG93ICYmIHdpbmRvdy5VUkw7XG5cbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmICh3aW5kb3cuSFRNTE1lZGlhRWxlbWVudCAmJlxuICAgICAgICAhKCdzcmNPYmplY3QnIGluIHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50LnByb3RvdHlwZSkpIHtcbiAgICAgICAgLy8gU2hpbSB0aGUgc3JjT2JqZWN0IHByb3BlcnR5LCBvbmNlLCB3aGVuIEhUTUxNZWRpYUVsZW1lbnQgaXMgZm91bmQuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuSFRNTE1lZGlhRWxlbWVudC5wcm90b3R5cGUsICdzcmNPYmplY3QnLCB7XG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zcmNPYmplY3Q7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgLy8gVXNlIF9zcmNPYmplY3QgYXMgYSBwcml2YXRlIHByb3BlcnR5IGZvciB0aGlzIHNoaW1cbiAgICAgICAgICAgIHRoaXMuX3NyY09iamVjdCA9IHN0cmVhbTtcbiAgICAgICAgICAgIGlmICh0aGlzLnNyYykge1xuICAgICAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHRoaXMuc3JjKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFzdHJlYW0pIHtcbiAgICAgICAgICAgICAgdGhpcy5zcmMgPSAnJztcbiAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc3JjID0gVVJMLmNyZWF0ZU9iamVjdFVSTChzdHJlYW0pO1xuICAgICAgICAgICAgLy8gV2UgbmVlZCB0byByZWNyZWF0ZSB0aGUgYmxvYiB1cmwgd2hlbiBhIHRyYWNrIGlzIGFkZGVkIG9yXG4gICAgICAgICAgICAvLyByZW1vdmVkLiBEb2luZyBpdCBtYW51YWxseSBzaW5jZSB3ZSB3YW50IHRvIGF2b2lkIGEgcmVjdXJzaW9uLlxuICAgICAgICAgICAgc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoJ2FkZHRyYWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGlmIChzZWxmLnNyYykge1xuICAgICAgICAgICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwoc2VsZi5zcmMpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNlbGYuc3JjID0gVVJMLmNyZWF0ZU9iamVjdFVSTChzdHJlYW0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcigncmVtb3ZldHJhY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYgKHNlbGYuc3JjKSB7XG4gICAgICAgICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChzZWxmLnNyYyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2VsZi5zcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKHN0cmVhbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBzaGltQWRkVHJhY2tSZW1vdmVUcmFja1dpdGhOYXRpdmU6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIC8vIHNoaW0gYWRkVHJhY2svcmVtb3ZlVHJhY2sgd2l0aCBuYXRpdmUgdmFyaWFudHMgaW4gb3JkZXIgdG8gbWFrZVxuICAgIC8vIHRoZSBpbnRlcmFjdGlvbnMgd2l0aCBsZWdhY3kgZ2V0TG9jYWxTdHJlYW1zIGJlaGF2ZSBhcyBpbiBvdGhlciBicm93c2Vycy5cbiAgICAvLyBLZWVwcyBhIG1hcHBpbmcgc3RyZWFtLmlkID0+IFtzdHJlYW0sIHJ0cHNlbmRlcnMuLi5dXG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRMb2NhbFN0cmVhbXMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zID0gdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcyB8fCB7fTtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zKS5tYXAoZnVuY3Rpb24oc3RyZWFtSWQpIHtcbiAgICAgICAgcmV0dXJuIHBjLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbUlkXVswXTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgb3JpZ0FkZFRyYWNrID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjaztcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFRyYWNrID0gZnVuY3Rpb24odHJhY2ssIHN0cmVhbSkge1xuICAgICAgaWYgKCFzdHJlYW0pIHtcbiAgICAgICAgcmV0dXJuIG9yaWdBZGRUcmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuICAgICAgdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcyA9IHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMgfHwge307XG5cbiAgICAgIHZhciBzZW5kZXIgPSBvcmlnQWRkVHJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIGlmICghdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW0uaWRdKSB7XG4gICAgICAgIHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtLmlkXSA9IFtzdHJlYW0sIHNlbmRlcl07XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtLmlkXS5pbmRleE9mKHNlbmRlcikgPT09IC0xKSB7XG4gICAgICAgIHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtLmlkXS5wdXNoKHNlbmRlcik7XG4gICAgICB9XG4gICAgICByZXR1cm4gc2VuZGVyO1xuICAgIH07XG5cbiAgICB2YXIgb3JpZ0FkZFN0cmVhbSA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkU3RyZWFtO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcyA9IHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMgfHwge307XG5cbiAgICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XG4gICAgICAgIHZhciBhbHJlYWR5RXhpc3RzID0gcGMuZ2V0U2VuZGVycygpLmZpbmQoZnVuY3Rpb24ocykge1xuICAgICAgICAgIHJldHVybiBzLnRyYWNrID09PSB0cmFjaztcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChhbHJlYWR5RXhpc3RzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbignVHJhY2sgYWxyZWFkeSBleGlzdHMuJyxcbiAgICAgICAgICAgICAgJ0ludmFsaWRBY2Nlc3NFcnJvcicpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHZhciBleGlzdGluZ1NlbmRlcnMgPSBwYy5nZXRTZW5kZXJzKCk7XG4gICAgICBvcmlnQWRkU3RyZWFtLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB2YXIgbmV3U2VuZGVycyA9IHBjLmdldFNlbmRlcnMoKS5maWx0ZXIoZnVuY3Rpb24obmV3U2VuZGVyKSB7XG4gICAgICAgIHJldHVybiBleGlzdGluZ1NlbmRlcnMuaW5kZXhPZihuZXdTZW5kZXIpID09PSAtMTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW0uaWRdID0gW3N0cmVhbV0uY29uY2F0KG5ld1NlbmRlcnMpO1xuICAgIH07XG5cbiAgICB2YXIgb3JpZ1JlbW92ZVN0cmVhbSA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlU3RyZWFtO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zID0gdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcyB8fCB7fTtcbiAgICAgIGRlbGV0ZSB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbS5pZF07XG4gICAgICByZXR1cm4gb3JpZ1JlbW92ZVN0cmVhbS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG5cbiAgICB2YXIgb3JpZ1JlbW92ZVRyYWNrID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVUcmFjaztcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVRyYWNrID0gZnVuY3Rpb24oc2VuZGVyKSB7XG4gICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcyA9IHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMgfHwge307XG4gICAgICBpZiAoc2VuZGVyKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMpLmZvckVhY2goZnVuY3Rpb24oc3RyZWFtSWQpIHtcbiAgICAgICAgICB2YXIgaWR4ID0gcGMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtSWRdLmluZGV4T2Yoc2VuZGVyKTtcbiAgICAgICAgICBpZiAoaWR4ICE9PSAtMSkge1xuICAgICAgICAgICAgcGMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtSWRdLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocGMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtSWRdLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgZGVsZXRlIHBjLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbUlkXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9yaWdSZW1vdmVUcmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH0sXG5cbiAgc2hpbUFkZFRyYWNrUmVtb3ZlVHJhY2s6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIHZhciBicm93c2VyRGV0YWlscyA9IHV0aWxzLmRldGVjdEJyb3dzZXIod2luZG93KTtcbiAgICAvLyBzaGltIGFkZFRyYWNrIGFuZCByZW1vdmVUcmFjay5cbiAgICBpZiAod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjayAmJlxuICAgICAgICBicm93c2VyRGV0YWlscy52ZXJzaW9uID49IDY1KSB7XG4gICAgICByZXR1cm4gdGhpcy5zaGltQWRkVHJhY2tSZW1vdmVUcmFja1dpdGhOYXRpdmUod2luZG93KTtcbiAgICB9XG5cbiAgICAvLyBhbHNvIHNoaW0gcGMuZ2V0TG9jYWxTdHJlYW1zIHdoZW4gYWRkVHJhY2sgaXMgc2hpbW1lZFxuICAgIC8vIHRvIHJldHVybiB0aGUgb3JpZ2luYWwgc3RyZWFtcy5cbiAgICB2YXIgb3JpZ0dldExvY2FsU3RyZWFtcyA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVcbiAgICAgICAgLmdldExvY2FsU3RyZWFtcztcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldExvY2FsU3RyZWFtcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgIHZhciBuYXRpdmVTdHJlYW1zID0gb3JpZ0dldExvY2FsU3RyZWFtcy5hcHBseSh0aGlzKTtcbiAgICAgIHBjLl9yZXZlcnNlU3RyZWFtcyA9IHBjLl9yZXZlcnNlU3RyZWFtcyB8fCB7fTtcbiAgICAgIHJldHVybiBuYXRpdmVTdHJlYW1zLm1hcChmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgICAgcmV0dXJuIHBjLl9yZXZlcnNlU3RyZWFtc1tzdHJlYW0uaWRdO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBvcmlnQWRkU3RyZWFtID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRTdHJlYW07XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICBwYy5fc3RyZWFtcyA9IHBjLl9zdHJlYW1zIHx8IHt9O1xuICAgICAgcGMuX3JldmVyc2VTdHJlYW1zID0gcGMuX3JldmVyc2VTdHJlYW1zIHx8IHt9O1xuXG4gICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xuICAgICAgICB2YXIgYWxyZWFkeUV4aXN0cyA9IHBjLmdldFNlbmRlcnMoKS5maW5kKGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgICByZXR1cm4gcy50cmFjayA9PT0gdHJhY2s7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoYWxyZWFkeUV4aXN0cykge1xuICAgICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oJ1RyYWNrIGFscmVhZHkgZXhpc3RzLicsXG4gICAgICAgICAgICAgICdJbnZhbGlkQWNjZXNzRXJyb3InKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvLyBBZGQgaWRlbnRpdHkgbWFwcGluZyBmb3IgY29uc2lzdGVuY3kgd2l0aCBhZGRUcmFjay5cbiAgICAgIC8vIFVubGVzcyB0aGlzIGlzIGJlaW5nIHVzZWQgd2l0aCBhIHN0cmVhbSBmcm9tIGFkZFRyYWNrLlxuICAgICAgaWYgKCFwYy5fcmV2ZXJzZVN0cmVhbXNbc3RyZWFtLmlkXSkge1xuICAgICAgICB2YXIgbmV3U3RyZWFtID0gbmV3IHdpbmRvdy5NZWRpYVN0cmVhbShzdHJlYW0uZ2V0VHJhY2tzKCkpO1xuICAgICAgICBwYy5fc3RyZWFtc1tzdHJlYW0uaWRdID0gbmV3U3RyZWFtO1xuICAgICAgICBwYy5fcmV2ZXJzZVN0cmVhbXNbbmV3U3RyZWFtLmlkXSA9IHN0cmVhbTtcbiAgICAgICAgc3RyZWFtID0gbmV3U3RyZWFtO1xuICAgICAgfVxuICAgICAgb3JpZ0FkZFN0cmVhbS5hcHBseShwYywgW3N0cmVhbV0pO1xuICAgIH07XG5cbiAgICB2YXIgb3JpZ1JlbW92ZVN0cmVhbSA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlU3RyZWFtO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgcGMuX3N0cmVhbXMgPSBwYy5fc3RyZWFtcyB8fCB7fTtcbiAgICAgIHBjLl9yZXZlcnNlU3RyZWFtcyA9IHBjLl9yZXZlcnNlU3RyZWFtcyB8fCB7fTtcblxuICAgICAgb3JpZ1JlbW92ZVN0cmVhbS5hcHBseShwYywgWyhwYy5fc3RyZWFtc1tzdHJlYW0uaWRdIHx8IHN0cmVhbSldKTtcbiAgICAgIGRlbGV0ZSBwYy5fcmV2ZXJzZVN0cmVhbXNbKHBjLl9zdHJlYW1zW3N0cmVhbS5pZF0gP1xuICAgICAgICAgIHBjLl9zdHJlYW1zW3N0cmVhbS5pZF0uaWQgOiBzdHJlYW0uaWQpXTtcbiAgICAgIGRlbGV0ZSBwYy5fc3RyZWFtc1tzdHJlYW0uaWRdO1xuICAgIH07XG5cbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFRyYWNrID0gZnVuY3Rpb24odHJhY2ssIHN0cmVhbSkge1xuICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgIGlmIChwYy5zaWduYWxpbmdTdGF0ZSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbihcbiAgICAgICAgICAnVGhlIFJUQ1BlZXJDb25uZWN0aW9uXFwncyBzaWduYWxpbmdTdGF0ZSBpcyBcXCdjbG9zZWRcXCcuJyxcbiAgICAgICAgICAnSW52YWxpZFN0YXRlRXJyb3InKTtcbiAgICAgIH1cbiAgICAgIHZhciBzdHJlYW1zID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgaWYgKHN0cmVhbXMubGVuZ3RoICE9PSAxIHx8XG4gICAgICAgICAgIXN0cmVhbXNbMF0uZ2V0VHJhY2tzKCkuZmluZChmdW5jdGlvbih0KSB7XG4gICAgICAgICAgICByZXR1cm4gdCA9PT0gdHJhY2s7XG4gICAgICAgICAgfSkpIHtcbiAgICAgICAgLy8gdGhpcyBpcyBub3QgZnVsbHkgY29ycmVjdCBidXQgYWxsIHdlIGNhbiBtYW5hZ2Ugd2l0aG91dFxuICAgICAgICAvLyBbW2Fzc29jaWF0ZWQgTWVkaWFTdHJlYW1zXV0gaW50ZXJuYWwgc2xvdC5cbiAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbihcbiAgICAgICAgICAnVGhlIGFkYXB0ZXIuanMgYWRkVHJhY2sgcG9seWZpbGwgb25seSBzdXBwb3J0cyBhIHNpbmdsZSAnICtcbiAgICAgICAgICAnIHN0cmVhbSB3aGljaCBpcyBhc3NvY2lhdGVkIHdpdGggdGhlIHNwZWNpZmllZCB0cmFjay4nLFxuICAgICAgICAgICdOb3RTdXBwb3J0ZWRFcnJvcicpO1xuICAgICAgfVxuXG4gICAgICB2YXIgYWxyZWFkeUV4aXN0cyA9IHBjLmdldFNlbmRlcnMoKS5maW5kKGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgcmV0dXJuIHMudHJhY2sgPT09IHRyYWNrO1xuICAgICAgfSk7XG4gICAgICBpZiAoYWxyZWFkeUV4aXN0cykge1xuICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKCdUcmFjayBhbHJlYWR5IGV4aXN0cy4nLFxuICAgICAgICAgICAgJ0ludmFsaWRBY2Nlc3NFcnJvcicpO1xuICAgICAgfVxuXG4gICAgICBwYy5fc3RyZWFtcyA9IHBjLl9zdHJlYW1zIHx8IHt9O1xuICAgICAgcGMuX3JldmVyc2VTdHJlYW1zID0gcGMuX3JldmVyc2VTdHJlYW1zIHx8IHt9O1xuICAgICAgdmFyIG9sZFN0cmVhbSA9IHBjLl9zdHJlYW1zW3N0cmVhbS5pZF07XG4gICAgICBpZiAob2xkU3RyZWFtKSB7XG4gICAgICAgIC8vIHRoaXMgaXMgdXNpbmcgb2RkIENocm9tZSBiZWhhdmlvdXIsIHVzZSB3aXRoIGNhdXRpb246XG4gICAgICAgIC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC93ZWJydGMvaXNzdWVzL2RldGFpbD9pZD03ODE1XG4gICAgICAgIC8vIE5vdGU6IHdlIHJlbHkgb24gdGhlIGhpZ2gtbGV2ZWwgYWRkVHJhY2svZHRtZiBzaGltIHRvXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgc2VuZGVyIHdpdGggYSBkdG1mIHNlbmRlci5cbiAgICAgICAgb2xkU3RyZWFtLmFkZFRyYWNrKHRyYWNrKTtcblxuICAgICAgICAvLyBUcmlnZ2VyIE9OTiBhc3luYy5cbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICBwYy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnbmVnb3RpYXRpb25uZWVkZWQnKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIG5ld1N0cmVhbSA9IG5ldyB3aW5kb3cuTWVkaWFTdHJlYW0oW3RyYWNrXSk7XG4gICAgICAgIHBjLl9zdHJlYW1zW3N0cmVhbS5pZF0gPSBuZXdTdHJlYW07XG4gICAgICAgIHBjLl9yZXZlcnNlU3RyZWFtc1tuZXdTdHJlYW0uaWRdID0gc3RyZWFtO1xuICAgICAgICBwYy5hZGRTdHJlYW0obmV3U3RyZWFtKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwYy5nZXRTZW5kZXJzKCkuZmluZChmdW5jdGlvbihzKSB7XG4gICAgICAgIHJldHVybiBzLnRyYWNrID09PSB0cmFjaztcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyByZXBsYWNlIHRoZSBpbnRlcm5hbCBzdHJlYW0gaWQgd2l0aCB0aGUgZXh0ZXJuYWwgb25lIGFuZFxuICAgIC8vIHZpY2UgdmVyc2EuXG4gICAgZnVuY3Rpb24gcmVwbGFjZUludGVybmFsU3RyZWFtSWQocGMsIGRlc2NyaXB0aW9uKSB7XG4gICAgICB2YXIgc2RwID0gZGVzY3JpcHRpb24uc2RwO1xuICAgICAgT2JqZWN0LmtleXMocGMuX3JldmVyc2VTdHJlYW1zIHx8IFtdKS5mb3JFYWNoKGZ1bmN0aW9uKGludGVybmFsSWQpIHtcbiAgICAgICAgdmFyIGV4dGVybmFsU3RyZWFtID0gcGMuX3JldmVyc2VTdHJlYW1zW2ludGVybmFsSWRdO1xuICAgICAgICB2YXIgaW50ZXJuYWxTdHJlYW0gPSBwYy5fc3RyZWFtc1tleHRlcm5hbFN0cmVhbS5pZF07XG4gICAgICAgIHNkcCA9IHNkcC5yZXBsYWNlKG5ldyBSZWdFeHAoaW50ZXJuYWxTdHJlYW0uaWQsICdnJyksXG4gICAgICAgICAgICBleHRlcm5hbFN0cmVhbS5pZCk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXcgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKHtcbiAgICAgICAgdHlwZTogZGVzY3JpcHRpb24udHlwZSxcbiAgICAgICAgc2RwOiBzZHBcbiAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZXBsYWNlRXh0ZXJuYWxTdHJlYW1JZChwYywgZGVzY3JpcHRpb24pIHtcbiAgICAgIHZhciBzZHAgPSBkZXNjcmlwdGlvbi5zZHA7XG4gICAgICBPYmplY3Qua2V5cyhwYy5fcmV2ZXJzZVN0cmVhbXMgfHwgW10pLmZvckVhY2goZnVuY3Rpb24oaW50ZXJuYWxJZCkge1xuICAgICAgICB2YXIgZXh0ZXJuYWxTdHJlYW0gPSBwYy5fcmV2ZXJzZVN0cmVhbXNbaW50ZXJuYWxJZF07XG4gICAgICAgIHZhciBpbnRlcm5hbFN0cmVhbSA9IHBjLl9zdHJlYW1zW2V4dGVybmFsU3RyZWFtLmlkXTtcbiAgICAgICAgc2RwID0gc2RwLnJlcGxhY2UobmV3IFJlZ0V4cChleHRlcm5hbFN0cmVhbS5pZCwgJ2cnKSxcbiAgICAgICAgICAgIGludGVybmFsU3RyZWFtLmlkKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG5ldyBSVENTZXNzaW9uRGVzY3JpcHRpb24oe1xuICAgICAgICB0eXBlOiBkZXNjcmlwdGlvbi50eXBlLFxuICAgICAgICBzZHA6IHNkcFxuICAgICAgfSk7XG4gICAgfVxuICAgIFsnY3JlYXRlT2ZmZXInLCAnY3JlYXRlQW5zd2VyJ10uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIHZhciBuYXRpdmVNZXRob2QgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF07XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgIHZhciBpc0xlZ2FjeUNhbGwgPSBhcmd1bWVudHMubGVuZ3RoICYmXG4gICAgICAgICAgICB0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnZnVuY3Rpb24nO1xuICAgICAgICBpZiAoaXNMZWdhY3lDYWxsKSB7XG4gICAgICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseShwYywgW1xuICAgICAgICAgICAgZnVuY3Rpb24oZGVzY3JpcHRpb24pIHtcbiAgICAgICAgICAgICAgdmFyIGRlc2MgPSByZXBsYWNlSW50ZXJuYWxTdHJlYW1JZChwYywgZGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgICBhcmdzWzBdLmFwcGx5KG51bGwsIFtkZXNjXSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgIGlmIChhcmdzWzFdKSB7XG4gICAgICAgICAgICAgICAgYXJnc1sxXS5hcHBseShudWxsLCBlcnIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBhcmd1bWVudHNbMl1cbiAgICAgICAgICBdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHBjLCBhcmd1bWVudHMpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKGRlc2NyaXB0aW9uKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcGxhY2VJbnRlcm5hbFN0cmVhbUlkKHBjLCBkZXNjcmlwdGlvbik7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9KTtcblxuICAgIHZhciBvcmlnU2V0TG9jYWxEZXNjcmlwdGlvbiA9XG4gICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0TG9jYWxEZXNjcmlwdGlvbjtcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnNldExvY2FsRGVzY3JpcHRpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGggfHwgIWFyZ3VtZW50c1swXS50eXBlKSB7XG4gICAgICAgIHJldHVybiBvcmlnU2V0TG9jYWxEZXNjcmlwdGlvbi5hcHBseShwYywgYXJndW1lbnRzKTtcbiAgICAgIH1cbiAgICAgIGFyZ3VtZW50c1swXSA9IHJlcGxhY2VFeHRlcm5hbFN0cmVhbUlkKHBjLCBhcmd1bWVudHNbMF0pO1xuICAgICAgcmV0dXJuIG9yaWdTZXRMb2NhbERlc2NyaXB0aW9uLmFwcGx5KHBjLCBhcmd1bWVudHMpO1xuICAgIH07XG5cbiAgICAvLyBUT0RPOiBtYW5nbGUgZ2V0U3RhdHM6IGh0dHBzOi8vdzNjLmdpdGh1Yi5pby93ZWJydGMtc3RhdHMvI2RvbS1ydGNtZWRpYXN0cmVhbXN0YXRzLXN0cmVhbWlkZW50aWZpZXJcblxuICAgIHZhciBvcmlnTG9jYWxEZXNjcmlwdGlvbiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoXG4gICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUsICdsb2NhbERlc2NyaXB0aW9uJyk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUsXG4gICAgICAgICdsb2NhbERlc2NyaXB0aW9uJywge1xuICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgICAgICAgdmFyIGRlc2NyaXB0aW9uID0gb3JpZ0xvY2FsRGVzY3JpcHRpb24uZ2V0LmFwcGx5KHRoaXMpO1xuICAgICAgICAgICAgaWYgKGRlc2NyaXB0aW9uLnR5cGUgPT09ICcnKSB7XG4gICAgICAgICAgICAgIHJldHVybiBkZXNjcmlwdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXBsYWNlSW50ZXJuYWxTdHJlYW1JZChwYywgZGVzY3JpcHRpb24pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVRyYWNrID0gZnVuY3Rpb24oc2VuZGVyKSB7XG4gICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgaWYgKHBjLnNpZ25hbGluZ1N0YXRlID09PSAnY2xvc2VkJykge1xuICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKFxuICAgICAgICAgICdUaGUgUlRDUGVlckNvbm5lY3Rpb25cXCdzIHNpZ25hbGluZ1N0YXRlIGlzIFxcJ2Nsb3NlZFxcJy4nLFxuICAgICAgICAgICdJbnZhbGlkU3RhdGVFcnJvcicpO1xuICAgICAgfVxuICAgICAgLy8gV2UgY2FuIG5vdCB5ZXQgY2hlY2sgZm9yIHNlbmRlciBpbnN0YW5jZW9mIFJUQ1J0cFNlbmRlclxuICAgICAgLy8gc2luY2Ugd2Ugc2hpbSBSVFBTZW5kZXIuIFNvIHdlIGNoZWNrIGlmIHNlbmRlci5fcGMgaXMgc2V0LlxuICAgICAgaWYgKCFzZW5kZXIuX3BjKSB7XG4gICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oJ0FyZ3VtZW50IDEgb2YgUlRDUGVlckNvbm5lY3Rpb24ucmVtb3ZlVHJhY2sgJyArXG4gICAgICAgICAgICAnZG9lcyBub3QgaW1wbGVtZW50IGludGVyZmFjZSBSVENSdHBTZW5kZXIuJywgJ1R5cGVFcnJvcicpO1xuICAgICAgfVxuICAgICAgdmFyIGlzTG9jYWwgPSBzZW5kZXIuX3BjID09PSBwYztcbiAgICAgIGlmICghaXNMb2NhbCkge1xuICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKCdTZW5kZXIgd2FzIG5vdCBjcmVhdGVkIGJ5IHRoaXMgY29ubmVjdGlvbi4nLFxuICAgICAgICAgICAgJ0ludmFsaWRBY2Nlc3NFcnJvcicpO1xuICAgICAgfVxuXG4gICAgICAvLyBTZWFyY2ggZm9yIHRoZSBuYXRpdmUgc3RyZWFtIHRoZSBzZW5kZXJzIHRyYWNrIGJlbG9uZ3MgdG8uXG4gICAgICBwYy5fc3RyZWFtcyA9IHBjLl9zdHJlYW1zIHx8IHt9O1xuICAgICAgdmFyIHN0cmVhbTtcbiAgICAgIE9iamVjdC5rZXlzKHBjLl9zdHJlYW1zKS5mb3JFYWNoKGZ1bmN0aW9uKHN0cmVhbWlkKSB7XG4gICAgICAgIHZhciBoYXNUcmFjayA9IHBjLl9zdHJlYW1zW3N0cmVhbWlkXS5nZXRUcmFja3MoKS5maW5kKGZ1bmN0aW9uKHRyYWNrKSB7XG4gICAgICAgICAgcmV0dXJuIHNlbmRlci50cmFjayA9PT0gdHJhY2s7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoaGFzVHJhY2spIHtcbiAgICAgICAgICBzdHJlYW0gPSBwYy5fc3RyZWFtc1tzdHJlYW1pZF07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAoc3RyZWFtKSB7XG4gICAgICAgIGlmIChzdHJlYW0uZ2V0VHJhY2tzKCkubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgLy8gaWYgdGhpcyBpcyB0aGUgbGFzdCB0cmFjayBvZiB0aGUgc3RyZWFtLCByZW1vdmUgdGhlIHN0cmVhbS4gVGhpc1xuICAgICAgICAgIC8vIHRha2VzIGNhcmUgb2YgYW55IHNoaW1tZWQgX3NlbmRlcnMuXG4gICAgICAgICAgcGMucmVtb3ZlU3RyZWFtKHBjLl9yZXZlcnNlU3RyZWFtc1tzdHJlYW0uaWRdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyByZWx5aW5nIG9uIHRoZSBzYW1lIG9kZCBjaHJvbWUgYmVoYXZpb3VyIGFzIGFib3ZlLlxuICAgICAgICAgIHN0cmVhbS5yZW1vdmVUcmFjayhzZW5kZXIudHJhY2spO1xuICAgICAgICB9XG4gICAgICAgIHBjLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCduZWdvdGlhdGlvbm5lZWRlZCcpKTtcbiAgICAgIH1cbiAgICB9O1xuICB9LFxuXG4gIHNoaW1QZWVyQ29ubmVjdGlvbjogZnVuY3Rpb24od2luZG93KSB7XG4gICAgdmFyIGJyb3dzZXJEZXRhaWxzID0gdXRpbHMuZGV0ZWN0QnJvd3Nlcih3aW5kb3cpO1xuXG4gICAgLy8gVGhlIFJUQ1BlZXJDb25uZWN0aW9uIG9iamVjdC5cbiAgICBpZiAoIXdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiAmJiB3aW5kb3cud2Via2l0UlRDUGVlckNvbm5lY3Rpb24pIHtcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiA9IGZ1bmN0aW9uKHBjQ29uZmlnLCBwY0NvbnN0cmFpbnRzKSB7XG4gICAgICAgIC8vIFRyYW5zbGF0ZSBpY2VUcmFuc3BvcnRQb2xpY3kgdG8gaWNlVHJhbnNwb3J0cyxcbiAgICAgICAgLy8gc2VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3Avd2VicnRjL2lzc3Vlcy9kZXRhaWw/aWQ9NDg2OVxuICAgICAgICAvLyB0aGlzIHdhcyBmaXhlZCBpbiBNNTYgYWxvbmcgd2l0aCB1bnByZWZpeGluZyBSVENQZWVyQ29ubmVjdGlvbi5cbiAgICAgICAgbG9nZ2luZygnUGVlckNvbm5lY3Rpb24nKTtcbiAgICAgICAgaWYgKHBjQ29uZmlnICYmIHBjQ29uZmlnLmljZVRyYW5zcG9ydFBvbGljeSkge1xuICAgICAgICAgIHBjQ29uZmlnLmljZVRyYW5zcG9ydHMgPSBwY0NvbmZpZy5pY2VUcmFuc3BvcnRQb2xpY3k7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IHdpbmRvdy53ZWJraXRSVENQZWVyQ29ubmVjdGlvbihwY0NvbmZpZywgcGNDb25zdHJhaW50cyk7XG4gICAgICB9O1xuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSA9XG4gICAgICAgICAgd2luZG93LndlYmtpdFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZTtcbiAgICAgIC8vIHdyYXAgc3RhdGljIG1ldGhvZHMuIEN1cnJlbnRseSBqdXN0IGdlbmVyYXRlQ2VydGlmaWNhdGUuXG4gICAgICBpZiAod2luZG93LndlYmtpdFJUQ1BlZXJDb25uZWN0aW9uLmdlbmVyYXRlQ2VydGlmaWNhdGUpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiwgJ2dlbmVyYXRlQ2VydGlmaWNhdGUnLCB7XG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cud2Via2l0UlRDUGVlckNvbm5lY3Rpb24uZ2VuZXJhdGVDZXJ0aWZpY2F0ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBtaWdyYXRlIGZyb20gbm9uLXNwZWMgUlRDSWNlU2VydmVyLnVybCB0byBSVENJY2VTZXJ2ZXIudXJsc1xuICAgICAgdmFyIE9yaWdQZWVyQ29ubmVjdGlvbiA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbjtcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiA9IGZ1bmN0aW9uKHBjQ29uZmlnLCBwY0NvbnN0cmFpbnRzKSB7XG4gICAgICAgIGlmIChwY0NvbmZpZyAmJiBwY0NvbmZpZy5pY2VTZXJ2ZXJzKSB7XG4gICAgICAgICAgdmFyIG5ld0ljZVNlcnZlcnMgPSBbXTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBjQ29uZmlnLmljZVNlcnZlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBzZXJ2ZXIgPSBwY0NvbmZpZy5pY2VTZXJ2ZXJzW2ldO1xuICAgICAgICAgICAgaWYgKCFzZXJ2ZXIuaGFzT3duUHJvcGVydHkoJ3VybHMnKSAmJlxuICAgICAgICAgICAgICAgIHNlcnZlci5oYXNPd25Qcm9wZXJ0eSgndXJsJykpIHtcbiAgICAgICAgICAgICAgdXRpbHMuZGVwcmVjYXRlZCgnUlRDSWNlU2VydmVyLnVybCcsICdSVENJY2VTZXJ2ZXIudXJscycpO1xuICAgICAgICAgICAgICBzZXJ2ZXIgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHNlcnZlcikpO1xuICAgICAgICAgICAgICBzZXJ2ZXIudXJscyA9IHNlcnZlci51cmw7XG4gICAgICAgICAgICAgIG5ld0ljZVNlcnZlcnMucHVzaChzZXJ2ZXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbmV3SWNlU2VydmVycy5wdXNoKHBjQ29uZmlnLmljZVNlcnZlcnNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBwY0NvbmZpZy5pY2VTZXJ2ZXJzID0gbmV3SWNlU2VydmVycztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IE9yaWdQZWVyQ29ubmVjdGlvbihwY0NvbmZpZywgcGNDb25zdHJhaW50cyk7XG4gICAgICB9O1xuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSA9IE9yaWdQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGU7XG4gICAgICAvLyB3cmFwIHN0YXRpYyBtZXRob2RzLiBDdXJyZW50bHkganVzdCBnZW5lcmF0ZUNlcnRpZmljYXRlLlxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiwgJ2dlbmVyYXRlQ2VydGlmaWNhdGUnLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIE9yaWdQZWVyQ29ubmVjdGlvbi5nZW5lcmF0ZUNlcnRpZmljYXRlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB2YXIgb3JpZ0dldFN0YXRzID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTdGF0cztcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFN0YXRzID0gZnVuY3Rpb24oc2VsZWN0b3IsXG4gICAgICAgIHN1Y2Nlc3NDYWxsYmFjaywgZXJyb3JDYWxsYmFjaykge1xuICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuXG4gICAgICAvLyBJZiBzZWxlY3RvciBpcyBhIGZ1bmN0aW9uIHRoZW4gd2UgYXJlIGluIHRoZSBvbGQgc3R5bGUgc3RhdHMgc28ganVzdFxuICAgICAgLy8gcGFzcyBiYWNrIHRoZSBvcmlnaW5hbCBnZXRTdGF0cyBmb3JtYXQgdG8gYXZvaWQgYnJlYWtpbmcgb2xkIHVzZXJzLlxuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIHR5cGVvZiBzZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gb3JpZ0dldFN0YXRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG5cbiAgICAgIC8vIFdoZW4gc3BlYy1zdHlsZSBnZXRTdGF0cyBpcyBzdXBwb3J0ZWQsIHJldHVybiB0aG9zZSB3aGVuIGNhbGxlZCB3aXRoXG4gICAgICAvLyBlaXRoZXIgbm8gYXJndW1lbnRzIG9yIHRoZSBzZWxlY3RvciBhcmd1bWVudCBpcyBudWxsLlxuICAgICAgaWYgKG9yaWdHZXRTdGF0cy5sZW5ndGggPT09IDAgJiYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDAgfHxcbiAgICAgICAgICB0eXBlb2YgYXJndW1lbnRzWzBdICE9PSAnZnVuY3Rpb24nKSkge1xuICAgICAgICByZXR1cm4gb3JpZ0dldFN0YXRzLmFwcGx5KHRoaXMsIFtdKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGZpeENocm9tZVN0YXRzXyA9IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIHZhciBzdGFuZGFyZFJlcG9ydCA9IHt9O1xuICAgICAgICB2YXIgcmVwb3J0cyA9IHJlc3BvbnNlLnJlc3VsdCgpO1xuICAgICAgICByZXBvcnRzLmZvckVhY2goZnVuY3Rpb24ocmVwb3J0KSB7XG4gICAgICAgICAgdmFyIHN0YW5kYXJkU3RhdHMgPSB7XG4gICAgICAgICAgICBpZDogcmVwb3J0LmlkLFxuICAgICAgICAgICAgdGltZXN0YW1wOiByZXBvcnQudGltZXN0YW1wLFxuICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICBsb2NhbGNhbmRpZGF0ZTogJ2xvY2FsLWNhbmRpZGF0ZScsXG4gICAgICAgICAgICAgIHJlbW90ZWNhbmRpZGF0ZTogJ3JlbW90ZS1jYW5kaWRhdGUnXG4gICAgICAgICAgICB9W3JlcG9ydC50eXBlXSB8fCByZXBvcnQudHlwZVxuICAgICAgICAgIH07XG4gICAgICAgICAgcmVwb3J0Lm5hbWVzKCkuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgICAgICBzdGFuZGFyZFN0YXRzW25hbWVdID0gcmVwb3J0LnN0YXQobmFtZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgc3RhbmRhcmRSZXBvcnRbc3RhbmRhcmRTdGF0cy5pZF0gPSBzdGFuZGFyZFN0YXRzO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc3RhbmRhcmRSZXBvcnQ7XG4gICAgICB9O1xuXG4gICAgICAvLyBzaGltIGdldFN0YXRzIHdpdGggbWFwbGlrZSBzdXBwb3J0XG4gICAgICB2YXIgbWFrZU1hcFN0YXRzID0gZnVuY3Rpb24oc3RhdHMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNYXAoT2JqZWN0LmtleXMoc3RhdHMpLm1hcChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICByZXR1cm4gW2tleSwgc3RhdHNba2V5XV07XG4gICAgICAgIH0pKTtcbiAgICAgIH07XG5cbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID49IDIpIHtcbiAgICAgICAgdmFyIHN1Y2Nlc3NDYWxsYmFja1dyYXBwZXJfID0gZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICBhcmdzWzFdKG1ha2VNYXBTdGF0cyhmaXhDaHJvbWVTdGF0c18ocmVzcG9uc2UpKSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG9yaWdHZXRTdGF0cy5hcHBseSh0aGlzLCBbc3VjY2Vzc0NhbGxiYWNrV3JhcHBlcl8sXG4gICAgICAgICAgYXJndW1lbnRzWzBdXSk7XG4gICAgICB9XG5cbiAgICAgIC8vIHByb21pc2Utc3VwcG9ydFxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBvcmlnR2V0U3RhdHMuYXBwbHkocGMsIFtcbiAgICAgICAgICBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgcmVzb2x2ZShtYWtlTWFwU3RhdHMoZml4Q2hyb21lU3RhdHNfKHJlc3BvbnNlKSkpO1xuICAgICAgICAgIH0sIHJlamVjdF0pO1xuICAgICAgfSkudGhlbihzdWNjZXNzQ2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spO1xuICAgIH07XG5cbiAgICAvLyBhZGQgcHJvbWlzZSBzdXBwb3J0IC0tIG5hdGl2ZWx5IGF2YWlsYWJsZSBpbiBDaHJvbWUgNTFcbiAgICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDUxKSB7XG4gICAgICBbJ3NldExvY2FsRGVzY3JpcHRpb24nLCAnc2V0UmVtb3RlRGVzY3JpcHRpb24nLCAnYWRkSWNlQ2FuZGlkYXRlJ11cbiAgICAgICAgICAuZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgICAgICAgIHZhciBuYXRpdmVNZXRob2QgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF07XG4gICAgICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgICAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICAgICAgICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgbmF0aXZlTWV0aG9kLmFwcGx5KHBjLCBbYXJnc1swXSwgcmVzb2x2ZSwgcmVqZWN0XSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBhcmdzWzFdLmFwcGx5KG51bGwsIFtdKTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID49IDMpIHtcbiAgICAgICAgICAgICAgICAgIGFyZ3NbMl0uYXBwbHkobnVsbCwgW2Vycl0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIHByb21pc2Ugc3VwcG9ydCBmb3IgY3JlYXRlT2ZmZXIgYW5kIGNyZWF0ZUFuc3dlci4gQXZhaWxhYmxlICh3aXRob3V0XG4gICAgLy8gYnVncykgc2luY2UgTTUyOiBjcmJ1Zy82MTkyODlcbiAgICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDUyKSB7XG4gICAgICBbJ2NyZWF0ZU9mZmVyJywgJ2NyZWF0ZUFuc3dlciddLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgIHZhciBuYXRpdmVNZXRob2QgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF07XG4gICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAxIHx8IChhcmd1bWVudHMubGVuZ3RoID09PSAxICYmXG4gICAgICAgICAgICAgIHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdvYmplY3QnKSkge1xuICAgICAgICAgICAgdmFyIG9wdHMgPSBhcmd1bWVudHMubGVuZ3RoID09PSAxID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICBuYXRpdmVNZXRob2QuYXBwbHkocGMsIFtyZXNvbHZlLCByZWplY3QsIG9wdHNdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBzaGltIGltcGxpY2l0IGNyZWF0aW9uIG9mIFJUQ1Nlc3Npb25EZXNjcmlwdGlvbi9SVENJY2VDYW5kaWRhdGVcbiAgICBbJ3NldExvY2FsRGVzY3JpcHRpb24nLCAnc2V0UmVtb3RlRGVzY3JpcHRpb24nLCAnYWRkSWNlQ2FuZGlkYXRlJ11cbiAgICAgICAgLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgICAgdmFyIG5hdGl2ZU1ldGhvZCA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXTtcbiAgICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGFyZ3VtZW50c1swXSA9IG5ldyAoKG1ldGhvZCA9PT0gJ2FkZEljZUNhbmRpZGF0ZScpID9cbiAgICAgICAgICAgICAgICB3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlIDpcbiAgICAgICAgICAgICAgICB3aW5kb3cuUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKShhcmd1bWVudHNbMF0pO1xuICAgICAgICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgLy8gc3VwcG9ydCBmb3IgYWRkSWNlQ2FuZGlkYXRlKG51bGwgb3IgdW5kZWZpbmVkKVxuICAgIHZhciBuYXRpdmVBZGRJY2VDYW5kaWRhdGUgPVxuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZEljZUNhbmRpZGF0ZTtcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZEljZUNhbmRpZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCFhcmd1bWVudHNbMF0pIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50c1sxXSkge1xuICAgICAgICAgIGFyZ3VtZW50c1sxXS5hcHBseShudWxsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmF0aXZlQWRkSWNlQ2FuZGlkYXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfVxufTtcblxufSx7XCIuLi91dGlscy5qc1wiOjEzLFwiLi9nZXR1c2VybWVkaWFcIjo2fV0sNjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vKlxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxuICogIHRyZWUuXG4gKi9cbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cbid1c2Ugc3RyaWN0JztcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzLmpzJyk7XG52YXIgbG9nZ2luZyA9IHV0aWxzLmxvZztcblxuLy8gRXhwb3NlIHB1YmxpYyBtZXRob2RzLlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih3aW5kb3cpIHtcbiAgdmFyIGJyb3dzZXJEZXRhaWxzID0gdXRpbHMuZGV0ZWN0QnJvd3Nlcih3aW5kb3cpO1xuICB2YXIgbmF2aWdhdG9yID0gd2luZG93ICYmIHdpbmRvdy5uYXZpZ2F0b3I7XG5cbiAgdmFyIGNvbnN0cmFpbnRzVG9DaHJvbWVfID0gZnVuY3Rpb24oYykge1xuICAgIGlmICh0eXBlb2YgYyAhPT0gJ29iamVjdCcgfHwgYy5tYW5kYXRvcnkgfHwgYy5vcHRpb25hbCkge1xuICAgICAgcmV0dXJuIGM7XG4gICAgfVxuICAgIHZhciBjYyA9IHt9O1xuICAgIE9iamVjdC5rZXlzKGMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICBpZiAoa2V5ID09PSAncmVxdWlyZScgfHwga2V5ID09PSAnYWR2YW5jZWQnIHx8IGtleSA9PT0gJ21lZGlhU291cmNlJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgciA9ICh0eXBlb2YgY1trZXldID09PSAnb2JqZWN0JykgPyBjW2tleV0gOiB7aWRlYWw6IGNba2V5XX07XG4gICAgICBpZiAoci5leGFjdCAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiByLmV4YWN0ID09PSAnbnVtYmVyJykge1xuICAgICAgICByLm1pbiA9IHIubWF4ID0gci5leGFjdDtcbiAgICAgIH1cbiAgICAgIHZhciBvbGRuYW1lXyA9IGZ1bmN0aW9uKHByZWZpeCwgbmFtZSkge1xuICAgICAgICBpZiAocHJlZml4KSB7XG4gICAgICAgICAgcmV0dXJuIHByZWZpeCArIG5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBuYW1lLnNsaWNlKDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAobmFtZSA9PT0gJ2RldmljZUlkJykgPyAnc291cmNlSWQnIDogbmFtZTtcbiAgICAgIH07XG4gICAgICBpZiAoci5pZGVhbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNjLm9wdGlvbmFsID0gY2Mub3B0aW9uYWwgfHwgW107XG4gICAgICAgIHZhciBvYyA9IHt9O1xuICAgICAgICBpZiAodHlwZW9mIHIuaWRlYWwgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgb2Nbb2xkbmFtZV8oJ21pbicsIGtleSldID0gci5pZGVhbDtcbiAgICAgICAgICBjYy5vcHRpb25hbC5wdXNoKG9jKTtcbiAgICAgICAgICBvYyA9IHt9O1xuICAgICAgICAgIG9jW29sZG5hbWVfKCdtYXgnLCBrZXkpXSA9IHIuaWRlYWw7XG4gICAgICAgICAgY2Mub3B0aW9uYWwucHVzaChvYyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2Nbb2xkbmFtZV8oJycsIGtleSldID0gci5pZGVhbDtcbiAgICAgICAgICBjYy5vcHRpb25hbC5wdXNoKG9jKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHIuZXhhY3QgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygci5leGFjdCAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgY2MubWFuZGF0b3J5ID0gY2MubWFuZGF0b3J5IHx8IHt9O1xuICAgICAgICBjYy5tYW5kYXRvcnlbb2xkbmFtZV8oJycsIGtleSldID0gci5leGFjdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFsnbWluJywgJ21heCddLmZvckVhY2goZnVuY3Rpb24obWl4KSB7XG4gICAgICAgICAgaWYgKHJbbWl4XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjYy5tYW5kYXRvcnkgPSBjYy5tYW5kYXRvcnkgfHwge307XG4gICAgICAgICAgICBjYy5tYW5kYXRvcnlbb2xkbmFtZV8obWl4LCBrZXkpXSA9IHJbbWl4XTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChjLmFkdmFuY2VkKSB7XG4gICAgICBjYy5vcHRpb25hbCA9IChjYy5vcHRpb25hbCB8fCBbXSkuY29uY2F0KGMuYWR2YW5jZWQpO1xuICAgIH1cbiAgICByZXR1cm4gY2M7XG4gIH07XG5cbiAgdmFyIHNoaW1Db25zdHJhaW50c18gPSBmdW5jdGlvbihjb25zdHJhaW50cywgZnVuYykge1xuICAgIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uID49IDYxKSB7XG4gICAgICByZXR1cm4gZnVuYyhjb25zdHJhaW50cyk7XG4gICAgfVxuICAgIGNvbnN0cmFpbnRzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShjb25zdHJhaW50cykpO1xuICAgIGlmIChjb25zdHJhaW50cyAmJiB0eXBlb2YgY29uc3RyYWludHMuYXVkaW8gPT09ICdvYmplY3QnKSB7XG4gICAgICB2YXIgcmVtYXAgPSBmdW5jdGlvbihvYmosIGEsIGIpIHtcbiAgICAgICAgaWYgKGEgaW4gb2JqICYmICEoYiBpbiBvYmopKSB7XG4gICAgICAgICAgb2JqW2JdID0gb2JqW2FdO1xuICAgICAgICAgIGRlbGV0ZSBvYmpbYV07XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBjb25zdHJhaW50cyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoY29uc3RyYWludHMpKTtcbiAgICAgIHJlbWFwKGNvbnN0cmFpbnRzLmF1ZGlvLCAnYXV0b0dhaW5Db250cm9sJywgJ2dvb2dBdXRvR2FpbkNvbnRyb2wnKTtcbiAgICAgIHJlbWFwKGNvbnN0cmFpbnRzLmF1ZGlvLCAnbm9pc2VTdXBwcmVzc2lvbicsICdnb29nTm9pc2VTdXBwcmVzc2lvbicpO1xuICAgICAgY29uc3RyYWludHMuYXVkaW8gPSBjb25zdHJhaW50c1RvQ2hyb21lXyhjb25zdHJhaW50cy5hdWRpbyk7XG4gICAgfVxuICAgIGlmIChjb25zdHJhaW50cyAmJiB0eXBlb2YgY29uc3RyYWludHMudmlkZW8gPT09ICdvYmplY3QnKSB7XG4gICAgICAvLyBTaGltIGZhY2luZ01vZGUgZm9yIG1vYmlsZSAmIHN1cmZhY2UgcHJvLlxuICAgICAgdmFyIGZhY2UgPSBjb25zdHJhaW50cy52aWRlby5mYWNpbmdNb2RlO1xuICAgICAgZmFjZSA9IGZhY2UgJiYgKCh0eXBlb2YgZmFjZSA9PT0gJ29iamVjdCcpID8gZmFjZSA6IHtpZGVhbDogZmFjZX0pO1xuICAgICAgdmFyIGdldFN1cHBvcnRlZEZhY2luZ01vZGVMaWVzID0gYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDY2O1xuXG4gICAgICBpZiAoKGZhY2UgJiYgKGZhY2UuZXhhY3QgPT09ICd1c2VyJyB8fCBmYWNlLmV4YWN0ID09PSAnZW52aXJvbm1lbnQnIHx8XG4gICAgICAgICAgICAgICAgICAgIGZhY2UuaWRlYWwgPT09ICd1c2VyJyB8fCBmYWNlLmlkZWFsID09PSAnZW52aXJvbm1lbnQnKSkgJiZcbiAgICAgICAgICAhKG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0U3VwcG9ydGVkQ29uc3RyYWludHMgJiZcbiAgICAgICAgICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0U3VwcG9ydGVkQ29uc3RyYWludHMoKS5mYWNpbmdNb2RlICYmXG4gICAgICAgICAgICAhZ2V0U3VwcG9ydGVkRmFjaW5nTW9kZUxpZXMpKSB7XG4gICAgICAgIGRlbGV0ZSBjb25zdHJhaW50cy52aWRlby5mYWNpbmdNb2RlO1xuICAgICAgICB2YXIgbWF0Y2hlcztcbiAgICAgICAgaWYgKGZhY2UuZXhhY3QgPT09ICdlbnZpcm9ubWVudCcgfHwgZmFjZS5pZGVhbCA9PT0gJ2Vudmlyb25tZW50Jykge1xuICAgICAgICAgIG1hdGNoZXMgPSBbJ2JhY2snLCAncmVhciddO1xuICAgICAgICB9IGVsc2UgaWYgKGZhY2UuZXhhY3QgPT09ICd1c2VyJyB8fCBmYWNlLmlkZWFsID09PSAndXNlcicpIHtcbiAgICAgICAgICBtYXRjaGVzID0gWydmcm9udCddO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAgICAgLy8gTG9vayBmb3IgbWF0Y2hlcyBpbiBsYWJlbCwgb3IgdXNlIGxhc3QgY2FtIGZvciBiYWNrICh0eXBpY2FsKS5cbiAgICAgICAgICByZXR1cm4gbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzKClcbiAgICAgICAgICAudGhlbihmdW5jdGlvbihkZXZpY2VzKSB7XG4gICAgICAgICAgICBkZXZpY2VzID0gZGV2aWNlcy5maWx0ZXIoZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICByZXR1cm4gZC5raW5kID09PSAndmlkZW9pbnB1dCc7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBkZXYgPSBkZXZpY2VzLmZpbmQoZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICByZXR1cm4gbWF0Y2hlcy5zb21lKGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQubGFiZWwudG9Mb3dlckNhc2UoKS5pbmRleE9mKG1hdGNoKSAhPT0gLTE7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIWRldiAmJiBkZXZpY2VzLmxlbmd0aCAmJiBtYXRjaGVzLmluZGV4T2YoJ2JhY2snKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgZGV2ID0gZGV2aWNlc1tkZXZpY2VzLmxlbmd0aCAtIDFdOyAvLyBtb3JlIGxpa2VseSB0aGUgYmFjayBjYW1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkZXYpIHtcbiAgICAgICAgICAgICAgY29uc3RyYWludHMudmlkZW8uZGV2aWNlSWQgPSBmYWNlLmV4YWN0ID8ge2V4YWN0OiBkZXYuZGV2aWNlSWR9IDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2lkZWFsOiBkZXYuZGV2aWNlSWR9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3RyYWludHMudmlkZW8gPSBjb25zdHJhaW50c1RvQ2hyb21lXyhjb25zdHJhaW50cy52aWRlbyk7XG4gICAgICAgICAgICBsb2dnaW5nKCdjaHJvbWU6ICcgKyBKU09OLnN0cmluZ2lmeShjb25zdHJhaW50cykpO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmMoY29uc3RyYWludHMpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdHJhaW50cy52aWRlbyA9IGNvbnN0cmFpbnRzVG9DaHJvbWVfKGNvbnN0cmFpbnRzLnZpZGVvKTtcbiAgICB9XG4gICAgbG9nZ2luZygnY2hyb21lOiAnICsgSlNPTi5zdHJpbmdpZnkoY29uc3RyYWludHMpKTtcbiAgICByZXR1cm4gZnVuYyhjb25zdHJhaW50cyk7XG4gIH07XG5cbiAgdmFyIHNoaW1FcnJvcl8gPSBmdW5jdGlvbihlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgUGVybWlzc2lvbkRlbmllZEVycm9yOiAnTm90QWxsb3dlZEVycm9yJyxcbiAgICAgICAgUGVybWlzc2lvbkRpc21pc3NlZEVycm9yOiAnTm90QWxsb3dlZEVycm9yJyxcbiAgICAgICAgSW52YWxpZFN0YXRlRXJyb3I6ICdOb3RBbGxvd2VkRXJyb3InLFxuICAgICAgICBEZXZpY2VzTm90Rm91bmRFcnJvcjogJ05vdEZvdW5kRXJyb3InLFxuICAgICAgICBDb25zdHJhaW50Tm90U2F0aXNmaWVkRXJyb3I6ICdPdmVyY29uc3RyYWluZWRFcnJvcicsXG4gICAgICAgIFRyYWNrU3RhcnRFcnJvcjogJ05vdFJlYWRhYmxlRXJyb3InLFxuICAgICAgICBNZWRpYURldmljZUZhaWxlZER1ZVRvU2h1dGRvd246ICdOb3RBbGxvd2VkRXJyb3InLFxuICAgICAgICBNZWRpYURldmljZUtpbGxTd2l0Y2hPbjogJ05vdEFsbG93ZWRFcnJvcicsXG4gICAgICAgIFRhYkNhcHR1cmVFcnJvcjogJ0Fib3J0RXJyb3InLFxuICAgICAgICBTY3JlZW5DYXB0dXJlRXJyb3I6ICdBYm9ydEVycm9yJyxcbiAgICAgICAgRGV2aWNlQ2FwdHVyZUVycm9yOiAnQWJvcnRFcnJvcidcbiAgICAgIH1bZS5uYW1lXSB8fCBlLm5hbWUsXG4gICAgICBtZXNzYWdlOiBlLm1lc3NhZ2UsXG4gICAgICBjb25zdHJhaW50OiBlLmNvbnN0cmFpbnROYW1lLFxuICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lICsgKHRoaXMubWVzc2FnZSAmJiAnOiAnKSArIHRoaXMubWVzc2FnZTtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xuXG4gIHZhciBnZXRVc2VyTWVkaWFfID0gZnVuY3Rpb24oY29uc3RyYWludHMsIG9uU3VjY2Vzcywgb25FcnJvcikge1xuICAgIHNoaW1Db25zdHJhaW50c18oY29uc3RyYWludHMsIGZ1bmN0aW9uKGMpIHtcbiAgICAgIG5hdmlnYXRvci53ZWJraXRHZXRVc2VyTWVkaWEoYywgb25TdWNjZXNzLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChvbkVycm9yKSB7XG4gICAgICAgICAgb25FcnJvcihzaGltRXJyb3JfKGUpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgbmF2aWdhdG9yLmdldFVzZXJNZWRpYSA9IGdldFVzZXJNZWRpYV87XG5cbiAgLy8gUmV0dXJucyB0aGUgcmVzdWx0IG9mIGdldFVzZXJNZWRpYSBhcyBhIFByb21pc2UuXG4gIHZhciBnZXRVc2VyTWVkaWFQcm9taXNlXyA9IGZ1bmN0aW9uKGNvbnN0cmFpbnRzKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgbmF2aWdhdG9yLmdldFVzZXJNZWRpYShjb25zdHJhaW50cywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICB9KTtcbiAgfTtcblxuICBpZiAoIW5hdmlnYXRvci5tZWRpYURldmljZXMpIHtcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzID0ge1xuICAgICAgZ2V0VXNlck1lZGlhOiBnZXRVc2VyTWVkaWFQcm9taXNlXyxcbiAgICAgIGVudW1lcmF0ZURldmljZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuICAgICAgICAgIHZhciBraW5kcyA9IHthdWRpbzogJ2F1ZGlvaW5wdXQnLCB2aWRlbzogJ3ZpZGVvaW5wdXQnfTtcbiAgICAgICAgICByZXR1cm4gd2luZG93Lk1lZGlhU3RyZWFtVHJhY2suZ2V0U291cmNlcyhmdW5jdGlvbihkZXZpY2VzKSB7XG4gICAgICAgICAgICByZXNvbHZlKGRldmljZXMubWFwKGZ1bmN0aW9uKGRldmljZSkge1xuICAgICAgICAgICAgICByZXR1cm4ge2xhYmVsOiBkZXZpY2UubGFiZWwsXG4gICAgICAgICAgICAgICAga2luZDoga2luZHNbZGV2aWNlLmtpbmRdLFxuICAgICAgICAgICAgICAgIGRldmljZUlkOiBkZXZpY2UuaWQsXG4gICAgICAgICAgICAgICAgZ3JvdXBJZDogJyd9O1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBnZXRTdXBwb3J0ZWRDb25zdHJhaW50czogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgZGV2aWNlSWQ6IHRydWUsIGVjaG9DYW5jZWxsYXRpb246IHRydWUsIGZhY2luZ01vZGU6IHRydWUsXG4gICAgICAgICAgZnJhbWVSYXRlOiB0cnVlLCBoZWlnaHQ6IHRydWUsIHdpZHRoOiB0cnVlXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIEEgc2hpbSBmb3IgZ2V0VXNlck1lZGlhIG1ldGhvZCBvbiB0aGUgbWVkaWFEZXZpY2VzIG9iamVjdC5cbiAgLy8gVE9ETyhLYXB0ZW5KYW5zc29uKSByZW1vdmUgb25jZSBpbXBsZW1lbnRlZCBpbiBDaHJvbWUgc3RhYmxlLlxuICBpZiAoIW5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKSB7XG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEgPSBmdW5jdGlvbihjb25zdHJhaW50cykge1xuICAgICAgcmV0dXJuIGdldFVzZXJNZWRpYVByb21pc2VfKGNvbnN0cmFpbnRzKTtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIC8vIEV2ZW4gdGhvdWdoIENocm9tZSA0NSBoYXMgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcyBhbmQgYSBnZXRVc2VyTWVkaWFcbiAgICAvLyBmdW5jdGlvbiB3aGljaCByZXR1cm5zIGEgUHJvbWlzZSwgaXQgZG9lcyBub3QgYWNjZXB0IHNwZWMtc3R5bGVcbiAgICAvLyBjb25zdHJhaW50cy5cbiAgICB2YXIgb3JpZ0dldFVzZXJNZWRpYSA9IG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhLlxuICAgICAgICBiaW5kKG5hdmlnYXRvci5tZWRpYURldmljZXMpO1xuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhID0gZnVuY3Rpb24oY3MpIHtcbiAgICAgIHJldHVybiBzaGltQ29uc3RyYWludHNfKGNzLCBmdW5jdGlvbihjKSB7XG4gICAgICAgIHJldHVybiBvcmlnR2V0VXNlck1lZGlhKGMpLnRoZW4oZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICAgICAgaWYgKGMuYXVkaW8gJiYgIXN0cmVhbS5nZXRBdWRpb1RyYWNrcygpLmxlbmd0aCB8fFxuICAgICAgICAgICAgICBjLnZpZGVvICYmICFzdHJlYW0uZ2V0VmlkZW9UcmFja3MoKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XG4gICAgICAgICAgICAgIHRyYWNrLnN0b3AoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbignJywgJ05vdEZvdW5kRXJyb3InKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHN0cmVhbTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChzaGltRXJyb3JfKGUpKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG5cbiAgLy8gRHVtbXkgZGV2aWNlY2hhbmdlIGV2ZW50IG1ldGhvZHMuXG4gIC8vIFRPRE8oS2FwdGVuSmFuc3NvbikgcmVtb3ZlIG9uY2UgaW1wbGVtZW50ZWQgaW4gQ2hyb21lIHN0YWJsZS5cbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmFkZEV2ZW50TGlzdGVuZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICBsb2dnaW5nKCdEdW1teSBtZWRpYURldmljZXMuYWRkRXZlbnRMaXN0ZW5lciBjYWxsZWQuJyk7XG4gICAgfTtcbiAgfVxuICBpZiAodHlwZW9mIG5hdmlnYXRvci5tZWRpYURldmljZXMucmVtb3ZlRXZlbnRMaXN0ZW5lciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIGxvZ2dpbmcoJ0R1bW15IG1lZGlhRGV2aWNlcy5yZW1vdmVFdmVudExpc3RlbmVyIGNhbGxlZC4nKTtcbiAgICB9O1xuICB9XG59O1xuXG59LHtcIi4uL3V0aWxzLmpzXCI6MTN9XSw3OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8qXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE3IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXG4gKiAgdHJlZS5cbiAqL1xuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgU0RQVXRpbHMgPSByZXF1aXJlKCdzZHAnKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNoaW1SVENJY2VDYW5kaWRhdGU6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIC8vIGZvdW5kYXRpb24gaXMgYXJiaXRyYXJpbHkgY2hvc2VuIGFzIGFuIGluZGljYXRvciBmb3IgZnVsbCBzdXBwb3J0IGZvclxuICAgIC8vIGh0dHBzOi8vdzNjLmdpdGh1Yi5pby93ZWJydGMtcGMvI3J0Y2ljZWNhbmRpZGF0ZS1pbnRlcmZhY2VcbiAgICBpZiAoIXdpbmRvdy5SVENJY2VDYW5kaWRhdGUgfHwgKHdpbmRvdy5SVENJY2VDYW5kaWRhdGUgJiYgJ2ZvdW5kYXRpb24nIGluXG4gICAgICAgIHdpbmRvdy5SVENJY2VDYW5kaWRhdGUucHJvdG90eXBlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBOYXRpdmVSVENJY2VDYW5kaWRhdGUgPSB3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlO1xuICAgIHdpbmRvdy5SVENJY2VDYW5kaWRhdGUgPSBmdW5jdGlvbihhcmdzKSB7XG4gICAgICAvLyBSZW1vdmUgdGhlIGE9IHdoaWNoIHNob3VsZG4ndCBiZSBwYXJ0IG9mIHRoZSBjYW5kaWRhdGUgc3RyaW5nLlxuICAgICAgaWYgKHR5cGVvZiBhcmdzID09PSAnb2JqZWN0JyAmJiBhcmdzLmNhbmRpZGF0ZSAmJlxuICAgICAgICAgIGFyZ3MuY2FuZGlkYXRlLmluZGV4T2YoJ2E9JykgPT09IDApIHtcbiAgICAgICAgYXJncyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYXJncykpO1xuICAgICAgICBhcmdzLmNhbmRpZGF0ZSA9IGFyZ3MuY2FuZGlkYXRlLnN1YnN0cigyKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGFyZ3MuY2FuZGlkYXRlICYmIGFyZ3MuY2FuZGlkYXRlLmxlbmd0aCkge1xuICAgICAgICAvLyBBdWdtZW50IHRoZSBuYXRpdmUgY2FuZGlkYXRlIHdpdGggdGhlIHBhcnNlZCBmaWVsZHMuXG4gICAgICAgIHZhciBuYXRpdmVDYW5kaWRhdGUgPSBuZXcgTmF0aXZlUlRDSWNlQ2FuZGlkYXRlKGFyZ3MpO1xuICAgICAgICB2YXIgcGFyc2VkQ2FuZGlkYXRlID0gU0RQVXRpbHMucGFyc2VDYW5kaWRhdGUoYXJncy5jYW5kaWRhdGUpO1xuICAgICAgICB2YXIgYXVnbWVudGVkQ2FuZGlkYXRlID0gT2JqZWN0LmFzc2lnbihuYXRpdmVDYW5kaWRhdGUsXG4gICAgICAgICAgICBwYXJzZWRDYW5kaWRhdGUpO1xuXG4gICAgICAgIC8vIEFkZCBhIHNlcmlhbGl6ZXIgdGhhdCBkb2VzIG5vdCBzZXJpYWxpemUgdGhlIGV4dHJhIGF0dHJpYnV0ZXMuXG4gICAgICAgIGF1Z21lbnRlZENhbmRpZGF0ZS50b0pTT04gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY2FuZGlkYXRlOiBhdWdtZW50ZWRDYW5kaWRhdGUuY2FuZGlkYXRlLFxuICAgICAgICAgICAgc2RwTWlkOiBhdWdtZW50ZWRDYW5kaWRhdGUuc2RwTWlkLFxuICAgICAgICAgICAgc2RwTUxpbmVJbmRleDogYXVnbWVudGVkQ2FuZGlkYXRlLnNkcE1MaW5lSW5kZXgsXG4gICAgICAgICAgICB1c2VybmFtZUZyYWdtZW50OiBhdWdtZW50ZWRDYW5kaWRhdGUudXNlcm5hbWVGcmFnbWVudCxcbiAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYXVnbWVudGVkQ2FuZGlkYXRlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBOYXRpdmVSVENJY2VDYW5kaWRhdGUoYXJncyk7XG4gICAgfTtcbiAgICB3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlLnByb3RvdHlwZSA9IE5hdGl2ZVJUQ0ljZUNhbmRpZGF0ZS5wcm90b3R5cGU7XG5cbiAgICAvLyBIb29rIHVwIHRoZSBhdWdtZW50ZWQgY2FuZGlkYXRlIGluIG9uaWNlY2FuZGlkYXRlIGFuZFxuICAgIC8vIGFkZEV2ZW50TGlzdGVuZXIoJ2ljZWNhbmRpZGF0ZScsIC4uLilcbiAgICB1dGlscy53cmFwUGVlckNvbm5lY3Rpb25FdmVudCh3aW5kb3csICdpY2VjYW5kaWRhdGUnLCBmdW5jdGlvbihlKSB7XG4gICAgICBpZiAoZS5jYW5kaWRhdGUpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGUsICdjYW5kaWRhdGUnLCB7XG4gICAgICAgICAgdmFsdWU6IG5ldyB3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlKGUuY2FuZGlkYXRlKSxcbiAgICAgICAgICB3cml0YWJsZTogJ2ZhbHNlJ1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBlO1xuICAgIH0pO1xuICB9LFxuXG4gIC8vIHNoaW1DcmVhdGVPYmplY3RVUkwgbXVzdCBiZSBjYWxsZWQgYmVmb3JlIHNoaW1Tb3VyY2VPYmplY3QgdG8gYXZvaWQgbG9vcC5cblxuICBzaGltQ3JlYXRlT2JqZWN0VVJMOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICB2YXIgVVJMID0gd2luZG93ICYmIHdpbmRvdy5VUkw7XG5cbiAgICBpZiAoISh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiB3aW5kb3cuSFRNTE1lZGlhRWxlbWVudCAmJlxuICAgICAgICAgICdzcmNPYmplY3QnIGluIHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50LnByb3RvdHlwZSAmJlxuICAgICAgICBVUkwuY3JlYXRlT2JqZWN0VVJMICYmIFVSTC5yZXZva2VPYmplY3RVUkwpKSB7XG4gICAgICAvLyBPbmx5IHNoaW0gQ3JlYXRlT2JqZWN0VVJMIHVzaW5nIHNyY09iamVjdCBpZiBzcmNPYmplY3QgZXhpc3RzLlxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICB2YXIgbmF0aXZlQ3JlYXRlT2JqZWN0VVJMID0gVVJMLmNyZWF0ZU9iamVjdFVSTC5iaW5kKFVSTCk7XG4gICAgdmFyIG5hdGl2ZVJldm9rZU9iamVjdFVSTCA9IFVSTC5yZXZva2VPYmplY3RVUkwuYmluZChVUkwpO1xuICAgIHZhciBzdHJlYW1zID0gbmV3IE1hcCgpLCBuZXdJZCA9IDA7XG5cbiAgICBVUkwuY3JlYXRlT2JqZWN0VVJMID0gZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICBpZiAoJ2dldFRyYWNrcycgaW4gc3RyZWFtKSB7XG4gICAgICAgIHZhciB1cmwgPSAncG9seWJsb2I6JyArICgrK25ld0lkKTtcbiAgICAgICAgc3RyZWFtcy5zZXQodXJsLCBzdHJlYW0pO1xuICAgICAgICB1dGlscy5kZXByZWNhdGVkKCdVUkwuY3JlYXRlT2JqZWN0VVJMKHN0cmVhbSknLFxuICAgICAgICAgICAgJ2VsZW0uc3JjT2JqZWN0ID0gc3RyZWFtJyk7XG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmF0aXZlQ3JlYXRlT2JqZWN0VVJMKHN0cmVhbSk7XG4gICAgfTtcbiAgICBVUkwucmV2b2tlT2JqZWN0VVJMID0gZnVuY3Rpb24odXJsKSB7XG4gICAgICBuYXRpdmVSZXZva2VPYmplY3RVUkwodXJsKTtcbiAgICAgIHN0cmVhbXMuZGVsZXRlKHVybCk7XG4gICAgfTtcblxuICAgIHZhciBkc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50LnByb3RvdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc3JjJyk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50LnByb3RvdHlwZSwgJ3NyYycsIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBkc2MuZ2V0LmFwcGx5KHRoaXMpO1xuICAgICAgfSxcbiAgICAgIHNldDogZnVuY3Rpb24odXJsKSB7XG4gICAgICAgIHRoaXMuc3JjT2JqZWN0ID0gc3RyZWFtcy5nZXQodXJsKSB8fCBudWxsO1xuICAgICAgICByZXR1cm4gZHNjLnNldC5hcHBseSh0aGlzLCBbdXJsXSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB2YXIgbmF0aXZlU2V0QXR0cmlidXRlID0gd2luZG93LkhUTUxNZWRpYUVsZW1lbnQucHJvdG90eXBlLnNldEF0dHJpYnV0ZTtcbiAgICB3aW5kb3cuSFRNTE1lZGlhRWxlbWVudC5wcm90b3R5cGUuc2V0QXR0cmlidXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMiAmJlxuICAgICAgICAgICgnJyArIGFyZ3VtZW50c1swXSkudG9Mb3dlckNhc2UoKSA9PT0gJ3NyYycpIHtcbiAgICAgICAgdGhpcy5zcmNPYmplY3QgPSBzdHJlYW1zLmdldChhcmd1bWVudHNbMV0pIHx8IG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmF0aXZlU2V0QXR0cmlidXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfSxcblxuICBzaGltTWF4TWVzc2FnZVNpemU6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIGlmICh3aW5kb3cuUlRDU2N0cFRyYW5zcG9ydCB8fCAhd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBicm93c2VyRGV0YWlscyA9IHV0aWxzLmRldGVjdEJyb3dzZXIod2luZG93KTtcblxuICAgIGlmICghKCdzY3RwJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUsICdzY3RwJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB0eXBlb2YgdGhpcy5fc2N0cCA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogdGhpcy5fc2N0cDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIHNjdHBJbkRlc2NyaXB0aW9uID0gZnVuY3Rpb24oZGVzY3JpcHRpb24pIHtcbiAgICAgIHZhciBzZWN0aW9ucyA9IFNEUFV0aWxzLnNwbGl0U2VjdGlvbnMoZGVzY3JpcHRpb24uc2RwKTtcbiAgICAgIHNlY3Rpb25zLnNoaWZ0KCk7XG4gICAgICByZXR1cm4gc2VjdGlvbnMuc29tZShmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcbiAgICAgICAgdmFyIG1MaW5lID0gU0RQVXRpbHMucGFyc2VNTGluZShtZWRpYVNlY3Rpb24pO1xuICAgICAgICByZXR1cm4gbUxpbmUgJiYgbUxpbmUua2luZCA9PT0gJ2FwcGxpY2F0aW9uJ1xuICAgICAgICAgICAgJiYgbUxpbmUucHJvdG9jb2wuaW5kZXhPZignU0NUUCcpICE9PSAtMTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgZ2V0UmVtb3RlRmlyZWZveFZlcnNpb24gPSBmdW5jdGlvbihkZXNjcmlwdGlvbikge1xuICAgICAgLy8gVE9ETzogSXMgdGhlcmUgYSBiZXR0ZXIgc29sdXRpb24gZm9yIGRldGVjdGluZyBGaXJlZm94P1xuICAgICAgdmFyIG1hdGNoID0gZGVzY3JpcHRpb24uc2RwLm1hdGNoKC9tb3ppbGxhLi4uVEhJU19JU19TRFBBUlRBLShcXGQrKS8pO1xuICAgICAgaWYgKG1hdGNoID09PSBudWxsIHx8IG1hdGNoLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgfVxuICAgICAgdmFyIHZlcnNpb24gPSBwYXJzZUludChtYXRjaFsxXSwgMTApO1xuICAgICAgLy8gVGVzdCBmb3IgTmFOICh5ZXMsIHRoaXMgaXMgdWdseSlcbiAgICAgIHJldHVybiB2ZXJzaW9uICE9PSB2ZXJzaW9uID8gLTEgOiB2ZXJzaW9uO1xuICAgIH07XG5cbiAgICB2YXIgZ2V0Q2FuU2VuZE1heE1lc3NhZ2VTaXplID0gZnVuY3Rpb24ocmVtb3RlSXNGaXJlZm94KSB7XG4gICAgICAvLyBFdmVyeSBpbXBsZW1lbnRhdGlvbiB3ZSBrbm93IGNhbiBzZW5kIGF0IGxlYXN0IDY0IEtpQi5cbiAgICAgIC8vIE5vdGU6IEFsdGhvdWdoIENocm9tZSBpcyB0ZWNobmljYWxseSBhYmxlIHRvIHNlbmQgdXAgdG8gMjU2IEtpQiwgdGhlXG4gICAgICAvLyAgICAgICBkYXRhIGRvZXMgbm90IHJlYWNoIHRoZSBvdGhlciBwZWVyIHJlbGlhYmx5LlxuICAgICAgLy8gICAgICAgU2VlOiBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3Avd2VicnRjL2lzc3Vlcy9kZXRhaWw/aWQ9ODQxOVxuICAgICAgdmFyIGNhblNlbmRNYXhNZXNzYWdlU2l6ZSA9IDY1NTM2O1xuICAgICAgaWYgKGJyb3dzZXJEZXRhaWxzLmJyb3dzZXIgPT09ICdmaXJlZm94Jykge1xuICAgICAgICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDU3KSB7XG4gICAgICAgICAgaWYgKHJlbW90ZUlzRmlyZWZveCA9PT0gLTEpIHtcbiAgICAgICAgICAgIC8vIEZGIDwgNTcgd2lsbCBzZW5kIGluIDE2IEtpQiBjaHVua3MgdXNpbmcgdGhlIGRlcHJlY2F0ZWQgUFBJRFxuICAgICAgICAgICAgLy8gZnJhZ21lbnRhdGlvbi5cbiAgICAgICAgICAgIGNhblNlbmRNYXhNZXNzYWdlU2l6ZSA9IDE2Mzg0O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBIb3dldmVyLCBvdGhlciBGRiAoYW5kIFJBV1JUQykgY2FuIHJlYXNzZW1ibGUgUFBJRC1mcmFnbWVudGVkXG4gICAgICAgICAgICAvLyBtZXNzYWdlcy4gVGh1cywgc3VwcG9ydGluZyB+MiBHaUIgd2hlbiBzZW5kaW5nLlxuICAgICAgICAgICAgY2FuU2VuZE1heE1lc3NhZ2VTaXplID0gMjE0NzQ4MzYzNztcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gQ3VycmVudGx5LCBhbGwgRkYgPj0gNTcgd2lsbCByZXNldCB0aGUgcmVtb3RlIG1heGltdW0gbWVzc2FnZSBzaXplXG4gICAgICAgICAgLy8gdG8gdGhlIGRlZmF1bHQgdmFsdWUgd2hlbiBhIGRhdGEgY2hhbm5lbCBpcyBjcmVhdGVkIGF0IGEgbGF0ZXJcbiAgICAgICAgICAvLyBzdGFnZS4gOihcbiAgICAgICAgICAvLyBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTE0MjY4MzFcbiAgICAgICAgICBjYW5TZW5kTWF4TWVzc2FnZVNpemUgPVxuICAgICAgICAgICAgYnJvd3NlckRldGFpbHMudmVyc2lvbiA9PT0gNTcgPyA2NTUzNSA6IDY1NTM2O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gY2FuU2VuZE1heE1lc3NhZ2VTaXplO1xuICAgIH07XG5cbiAgICB2YXIgZ2V0TWF4TWVzc2FnZVNpemUgPSBmdW5jdGlvbihkZXNjcmlwdGlvbiwgcmVtb3RlSXNGaXJlZm94KSB7XG4gICAgICAvLyBOb3RlOiA2NTUzNiBieXRlcyBpcyB0aGUgZGVmYXVsdCB2YWx1ZSBmcm9tIHRoZSBTRFAgc3BlYy4gQWxzbyxcbiAgICAgIC8vICAgICAgIGV2ZXJ5IGltcGxlbWVudGF0aW9uIHdlIGtub3cgc3VwcG9ydHMgcmVjZWl2aW5nIDY1NTM2IGJ5dGVzLlxuICAgICAgdmFyIG1heE1lc3NhZ2VTaXplID0gNjU1MzY7XG5cbiAgICAgIC8vIEZGIDU3IGhhcyBhIHNsaWdodGx5IGluY29ycmVjdCBkZWZhdWx0IHJlbW90ZSBtYXggbWVzc2FnZSBzaXplLCBzb1xuICAgICAgLy8gd2UgbmVlZCB0byBhZGp1c3QgaXQgaGVyZSB0byBhdm9pZCBhIGZhaWx1cmUgd2hlbiBzZW5kaW5nLlxuICAgICAgLy8gU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xNDI1Njk3XG4gICAgICBpZiAoYnJvd3NlckRldGFpbHMuYnJvd3NlciA9PT0gJ2ZpcmVmb3gnXG4gICAgICAgICAgICYmIGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPT09IDU3KSB7XG4gICAgICAgIG1heE1lc3NhZ2VTaXplID0gNjU1MzU7XG4gICAgICB9XG5cbiAgICAgIHZhciBtYXRjaCA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KGRlc2NyaXB0aW9uLnNkcCwgJ2E9bWF4LW1lc3NhZ2Utc2l6ZTonKTtcbiAgICAgIGlmIChtYXRjaC5sZW5ndGggPiAwKSB7XG4gICAgICAgIG1heE1lc3NhZ2VTaXplID0gcGFyc2VJbnQobWF0Y2hbMF0uc3Vic3RyKDE5KSwgMTApO1xuICAgICAgfSBlbHNlIGlmIChicm93c2VyRGV0YWlscy5icm93c2VyID09PSAnZmlyZWZveCcgJiZcbiAgICAgICAgICAgICAgICAgIHJlbW90ZUlzRmlyZWZveCAhPT0gLTEpIHtcbiAgICAgICAgLy8gSWYgdGhlIG1heGltdW0gbWVzc2FnZSBzaXplIGlzIG5vdCBwcmVzZW50IGluIHRoZSByZW1vdGUgU0RQIGFuZFxuICAgICAgICAvLyBib3RoIGxvY2FsIGFuZCByZW1vdGUgYXJlIEZpcmVmb3gsIHRoZSByZW1vdGUgcGVlciBjYW4gcmVjZWl2ZVxuICAgICAgICAvLyB+MiBHaUIuXG4gICAgICAgIG1heE1lc3NhZ2VTaXplID0gMjE0NzQ4MzYzNztcbiAgICAgIH1cbiAgICAgIHJldHVybiBtYXhNZXNzYWdlU2l6ZTtcbiAgICB9O1xuXG4gICAgdmFyIG9yaWdTZXRSZW1vdGVEZXNjcmlwdGlvbiA9XG4gICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0UmVtb3RlRGVzY3JpcHRpb247XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5zZXRSZW1vdGVEZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgIHBjLl9zY3RwID0gbnVsbDtcblxuICAgICAgaWYgKHNjdHBJbkRlc2NyaXB0aW9uKGFyZ3VtZW50c1swXSkpIHtcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHJlbW90ZSBpcyBGRi5cbiAgICAgICAgdmFyIGlzRmlyZWZveCA9IGdldFJlbW90ZUZpcmVmb3hWZXJzaW9uKGFyZ3VtZW50c1swXSk7XG5cbiAgICAgICAgLy8gR2V0IHRoZSBtYXhpbXVtIG1lc3NhZ2Ugc2l6ZSB0aGUgbG9jYWwgcGVlciBpcyBjYXBhYmxlIG9mIHNlbmRpbmdcbiAgICAgICAgdmFyIGNhblNlbmRNTVMgPSBnZXRDYW5TZW5kTWF4TWVzc2FnZVNpemUoaXNGaXJlZm94KTtcblxuICAgICAgICAvLyBHZXQgdGhlIG1heGltdW0gbWVzc2FnZSBzaXplIG9mIHRoZSByZW1vdGUgcGVlci5cbiAgICAgICAgdmFyIHJlbW90ZU1NUyA9IGdldE1heE1lc3NhZ2VTaXplKGFyZ3VtZW50c1swXSwgaXNGaXJlZm94KTtcblxuICAgICAgICAvLyBEZXRlcm1pbmUgZmluYWwgbWF4aW11bSBtZXNzYWdlIHNpemVcbiAgICAgICAgdmFyIG1heE1lc3NhZ2VTaXplO1xuICAgICAgICBpZiAoY2FuU2VuZE1NUyA9PT0gMCAmJiByZW1vdGVNTVMgPT09IDApIHtcbiAgICAgICAgICBtYXhNZXNzYWdlU2l6ZSA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcbiAgICAgICAgfSBlbHNlIGlmIChjYW5TZW5kTU1TID09PSAwIHx8IHJlbW90ZU1NUyA9PT0gMCkge1xuICAgICAgICAgIG1heE1lc3NhZ2VTaXplID0gTWF0aC5tYXgoY2FuU2VuZE1NUywgcmVtb3RlTU1TKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtYXhNZXNzYWdlU2l6ZSA9IE1hdGgubWluKGNhblNlbmRNTVMsIHJlbW90ZU1NUyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDcmVhdGUgYSBkdW1teSBSVENTY3RwVHJhbnNwb3J0IG9iamVjdCBhbmQgdGhlICdtYXhNZXNzYWdlU2l6ZSdcbiAgICAgICAgLy8gYXR0cmlidXRlLlxuICAgICAgICB2YXIgc2N0cCA9IHt9O1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2N0cCwgJ21heE1lc3NhZ2VTaXplJywge1xuICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gbWF4TWVzc2FnZVNpemU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcGMuX3NjdHAgPSBzY3RwO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gb3JpZ1NldFJlbW90ZURlc2NyaXB0aW9uLmFwcGx5KHBjLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH0sXG5cbiAgc2hpbVNlbmRUaHJvd1R5cGVFcnJvcjogZnVuY3Rpb24od2luZG93KSB7XG4gICAgaWYgKCEod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uICYmXG4gICAgICAgICdjcmVhdGVEYXRhQ2hhbm5lbCcgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBOb3RlOiBBbHRob3VnaCBGaXJlZm94ID49IDU3IGhhcyBhIG5hdGl2ZSBpbXBsZW1lbnRhdGlvbiwgdGhlIG1heGltdW1cbiAgICAvLyAgICAgICBtZXNzYWdlIHNpemUgY2FuIGJlIHJlc2V0IGZvciBhbGwgZGF0YSBjaGFubmVscyBhdCBhIGxhdGVyIHN0YWdlLlxuICAgIC8vICAgICAgIFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTQyNjgzMVxuXG4gICAgdmFyIG9yaWdDcmVhdGVEYXRhQ2hhbm5lbCA9XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmNyZWF0ZURhdGFDaGFubmVsO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlRGF0YUNoYW5uZWwgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICB2YXIgZGF0YUNoYW5uZWwgPSBvcmlnQ3JlYXRlRGF0YUNoYW5uZWwuYXBwbHkocGMsIGFyZ3VtZW50cyk7XG4gICAgICB2YXIgb3JpZ0RhdGFDaGFubmVsU2VuZCA9IGRhdGFDaGFubmVsLnNlbmQ7XG5cbiAgICAgIC8vIFBhdGNoICdzZW5kJyBtZXRob2RcbiAgICAgIGRhdGFDaGFubmVsLnNlbmQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRjID0gdGhpcztcbiAgICAgICAgdmFyIGRhdGEgPSBhcmd1bWVudHNbMF07XG4gICAgICAgIHZhciBsZW5ndGggPSBkYXRhLmxlbmd0aCB8fCBkYXRhLnNpemUgfHwgZGF0YS5ieXRlTGVuZ3RoO1xuICAgICAgICBpZiAobGVuZ3RoID4gcGMuc2N0cC5tYXhNZXNzYWdlU2l6ZSkge1xuICAgICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oJ01lc3NhZ2UgdG9vIGxhcmdlIChjYW4gc2VuZCBhIG1heGltdW0gb2YgJyArXG4gICAgICAgICAgICBwYy5zY3RwLm1heE1lc3NhZ2VTaXplICsgJyBieXRlcyknLCAnVHlwZUVycm9yJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9yaWdEYXRhQ2hhbm5lbFNlbmQuYXBwbHkoZGMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gZGF0YUNoYW5uZWw7XG4gICAgfTtcbiAgfVxufTtcblxufSx7XCIuL3V0aWxzXCI6MTMsXCJzZHBcIjoyfV0sODpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vKlxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxuICogIHRyZWUuXG4gKi9cbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcbnZhciBzaGltUlRDUGVlckNvbm5lY3Rpb24gPSByZXF1aXJlKCdydGNwZWVyY29ubmVjdGlvbi1zaGltJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzaGltR2V0VXNlck1lZGlhOiByZXF1aXJlKCcuL2dldHVzZXJtZWRpYScpLFxuICBzaGltUGVlckNvbm5lY3Rpb246IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIHZhciBicm93c2VyRGV0YWlscyA9IHV0aWxzLmRldGVjdEJyb3dzZXIod2luZG93KTtcblxuICAgIGlmICh3aW5kb3cuUlRDSWNlR2F0aGVyZXIpIHtcbiAgICAgIGlmICghd2luZG93LlJUQ0ljZUNhbmRpZGF0ZSkge1xuICAgICAgICB3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlID0gZnVuY3Rpb24oYXJncykge1xuICAgICAgICAgIHJldHVybiBhcmdzO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgaWYgKCF3aW5kb3cuUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKSB7XG4gICAgICAgIHdpbmRvdy5SVENTZXNzaW9uRGVzY3JpcHRpb24gPSBmdW5jdGlvbihhcmdzKSB7XG4gICAgICAgICAgcmV0dXJuIGFyZ3M7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICAvLyB0aGlzIGFkZHMgYW4gYWRkaXRpb25hbCBldmVudCBsaXN0ZW5lciB0byBNZWRpYVN0cmFja1RyYWNrIHRoYXQgc2lnbmFsc1xuICAgICAgLy8gd2hlbiBhIHRyYWNrcyBlbmFibGVkIHByb3BlcnR5IHdhcyBjaGFuZ2VkLiBXb3JrYXJvdW5kIGZvciBhIGJ1ZyBpblxuICAgICAgLy8gYWRkU3RyZWFtLCBzZWUgYmVsb3cuIE5vIGxvbmdlciByZXF1aXJlZCBpbiAxNTAyNStcbiAgICAgIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgMTUwMjUpIHtcbiAgICAgICAgdmFyIG9yaWdNU1RFbmFibGVkID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihcbiAgICAgICAgICAgIHdpbmRvdy5NZWRpYVN0cmVhbVRyYWNrLnByb3RvdHlwZSwgJ2VuYWJsZWQnKTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5NZWRpYVN0cmVhbVRyYWNrLnByb3RvdHlwZSwgJ2VuYWJsZWQnLCB7XG4gICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgb3JpZ01TVEVuYWJsZWQuc2V0LmNhbGwodGhpcywgdmFsdWUpO1xuICAgICAgICAgICAgdmFyIGV2ID0gbmV3IEV2ZW50KCdlbmFibGVkJyk7XG4gICAgICAgICAgICBldi5lbmFibGVkID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXYpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gT1JUQyBkZWZpbmVzIHRoZSBEVE1GIHNlbmRlciBhIGJpdCBkaWZmZXJlbnQuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3czYy9vcnRjL2lzc3Vlcy83MTRcbiAgICBpZiAod2luZG93LlJUQ1J0cFNlbmRlciAmJiAhKCdkdG1mJyBpbiB3aW5kb3cuUlRDUnRwU2VuZGVyLnByb3RvdHlwZSkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUnRwU2VuZGVyLnByb3RvdHlwZSwgJ2R0bWYnLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX2R0bWYgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMudHJhY2sua2luZCA9PT0gJ2F1ZGlvJykge1xuICAgICAgICAgICAgICB0aGlzLl9kdG1mID0gbmV3IHdpbmRvdy5SVENEdG1mU2VuZGVyKHRoaXMpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRyYWNrLmtpbmQgPT09ICd2aWRlbycpIHtcbiAgICAgICAgICAgICAgdGhpcy5fZHRtZiA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aGlzLl9kdG1mO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgLy8gRWRnZSBjdXJyZW50bHkgb25seSBpbXBsZW1lbnRzIHRoZSBSVENEdG1mU2VuZGVyLCBub3QgdGhlXG4gICAgLy8gUlRDRFRNRlNlbmRlciBhbGlhcy4gU2VlIGh0dHA6Ly9kcmFmdC5vcnRjLm9yZy8jcnRjZHRtZnNlbmRlcjIqXG4gICAgaWYgKHdpbmRvdy5SVENEdG1mU2VuZGVyICYmICF3aW5kb3cuUlRDRFRNRlNlbmRlcikge1xuICAgICAgd2luZG93LlJUQ0RUTUZTZW5kZXIgPSB3aW5kb3cuUlRDRHRtZlNlbmRlcjtcbiAgICB9XG5cbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gPVxuICAgICAgICBzaGltUlRDUGVlckNvbm5lY3Rpb24od2luZG93LCBicm93c2VyRGV0YWlscy52ZXJzaW9uKTtcbiAgfSxcbiAgc2hpbVJlcGxhY2VUcmFjazogZnVuY3Rpb24od2luZG93KSB7XG4gICAgLy8gT1JUQyBoYXMgcmVwbGFjZVRyYWNrIC0tIGh0dHBzOi8vZ2l0aHViLmNvbS93M2Mvb3J0Yy9pc3N1ZXMvNjE0XG4gICAgaWYgKHdpbmRvdy5SVENSdHBTZW5kZXIgJiZcbiAgICAgICAgISgncmVwbGFjZVRyYWNrJyBpbiB3aW5kb3cuUlRDUnRwU2VuZGVyLnByb3RvdHlwZSkpIHtcbiAgICAgIHdpbmRvdy5SVENSdHBTZW5kZXIucHJvdG90eXBlLnJlcGxhY2VUcmFjayA9XG4gICAgICAgICAgd2luZG93LlJUQ1J0cFNlbmRlci5wcm90b3R5cGUuc2V0VHJhY2s7XG4gICAgfVxuICB9XG59O1xuXG59LHtcIi4uL3V0aWxzXCI6MTMsXCIuL2dldHVzZXJtZWRpYVwiOjksXCJydGNwZWVyY29ubmVjdGlvbi1zaGltXCI6MX1dLDk6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLypcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcbiAqICB0cmVlLlxuICovXG4gLyogZXNsaW50LWVudiBub2RlICovXG4ndXNlIHN0cmljdCc7XG5cbi8vIEV4cG9zZSBwdWJsaWMgbWV0aG9kcy5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24od2luZG93KSB7XG4gIHZhciBuYXZpZ2F0b3IgPSB3aW5kb3cgJiYgd2luZG93Lm5hdmlnYXRvcjtcblxuICB2YXIgc2hpbUVycm9yXyA9IGZ1bmN0aW9uKGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZToge1Blcm1pc3Npb25EZW5pZWRFcnJvcjogJ05vdEFsbG93ZWRFcnJvcid9W2UubmFtZV0gfHwgZS5uYW1lLFxuICAgICAgbWVzc2FnZTogZS5tZXNzYWdlLFxuICAgICAgY29uc3RyYWludDogZS5jb25zdHJhaW50LFxuICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lO1xuICAgICAgfVxuICAgIH07XG4gIH07XG5cbiAgLy8gZ2V0VXNlck1lZGlhIGVycm9yIHNoaW0uXG4gIHZhciBvcmlnR2V0VXNlck1lZGlhID0gbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEuXG4gICAgICBiaW5kKG5hdmlnYXRvci5tZWRpYURldmljZXMpO1xuICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSA9IGZ1bmN0aW9uKGMpIHtcbiAgICByZXR1cm4gb3JpZ0dldFVzZXJNZWRpYShjKS5jYXRjaChmdW5jdGlvbihlKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3Qoc2hpbUVycm9yXyhlKSk7XG4gICAgfSk7XG4gIH07XG59O1xuXG59LHt9XSwxMDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vKlxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxuICogIHRyZWUuXG4gKi9cbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNoaW1HZXRVc2VyTWVkaWE6IHJlcXVpcmUoJy4vZ2V0dXNlcm1lZGlhJyksXG4gIHNoaW1PblRyYWNrOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uICYmICEoJ29udHJhY2snIGluXG4gICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSwgJ29udHJhY2snLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX29udHJhY2s7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24oZikge1xuICAgICAgICAgIGlmICh0aGlzLl9vbnRyYWNrKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYWNrJywgdGhpcy5fb250cmFjayk7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2FkZHN0cmVhbScsIHRoaXMuX29udHJhY2twb2x5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCd0cmFjaycsIHRoaXMuX29udHJhY2sgPSBmKTtcbiAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2FkZHN0cmVhbScsIHRoaXMuX29udHJhY2twb2x5ID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5zdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xuICAgICAgICAgICAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ3RyYWNrJyk7XG4gICAgICAgICAgICAgIGV2ZW50LnRyYWNrID0gdHJhY2s7XG4gICAgICAgICAgICAgIGV2ZW50LnJlY2VpdmVyID0ge3RyYWNrOiB0cmFja307XG4gICAgICAgICAgICAgIGV2ZW50LnRyYW5zY2VpdmVyID0ge3JlY2VpdmVyOiBldmVudC5yZWNlaXZlcn07XG4gICAgICAgICAgICAgIGV2ZW50LnN0cmVhbXMgPSBbZS5zdHJlYW1dO1xuICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHdpbmRvdy5SVENUcmFja0V2ZW50ICYmXG4gICAgICAgICgncmVjZWl2ZXInIGluIHdpbmRvdy5SVENUcmFja0V2ZW50LnByb3RvdHlwZSkgJiZcbiAgICAgICAgISgndHJhbnNjZWl2ZXInIGluIHdpbmRvdy5SVENUcmFja0V2ZW50LnByb3RvdHlwZSkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDVHJhY2tFdmVudC5wcm90b3R5cGUsICd0cmFuc2NlaXZlcicsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4ge3JlY2VpdmVyOiB0aGlzLnJlY2VpdmVyfTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIHNoaW1Tb3VyY2VPYmplY3Q6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIC8vIEZpcmVmb3ggaGFzIHN1cHBvcnRlZCBtb3pTcmNPYmplY3Qgc2luY2UgRkYyMiwgdW5wcmVmaXhlZCBpbiA0Mi5cbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmICh3aW5kb3cuSFRNTE1lZGlhRWxlbWVudCAmJlxuICAgICAgICAhKCdzcmNPYmplY3QnIGluIHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50LnByb3RvdHlwZSkpIHtcbiAgICAgICAgLy8gU2hpbSB0aGUgc3JjT2JqZWN0IHByb3BlcnR5LCBvbmNlLCB3aGVuIEhUTUxNZWRpYUVsZW1lbnQgaXMgZm91bmQuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuSFRNTE1lZGlhRWxlbWVudC5wcm90b3R5cGUsICdzcmNPYmplY3QnLCB7XG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1velNyY09iamVjdDtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNldDogZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICAgICAgICB0aGlzLm1velNyY09iamVjdCA9IHN0cmVhbTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBzaGltUGVlckNvbm5lY3Rpb246IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIHZhciBicm93c2VyRGV0YWlscyA9IHV0aWxzLmRldGVjdEJyb3dzZXIod2luZG93KTtcblxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAnb2JqZWN0JyB8fCAhKHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiB8fFxuICAgICAgICB3aW5kb3cubW96UlRDUGVlckNvbm5lY3Rpb24pKSB7XG4gICAgICByZXR1cm47IC8vIHByb2JhYmx5IG1lZGlhLnBlZXJjb25uZWN0aW9uLmVuYWJsZWQ9ZmFsc2UgaW4gYWJvdXQ6Y29uZmlnXG4gICAgfVxuICAgIC8vIFRoZSBSVENQZWVyQ29ubmVjdGlvbiBvYmplY3QuXG4gICAgaWYgKCF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24pIHtcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiA9IGZ1bmN0aW9uKHBjQ29uZmlnLCBwY0NvbnN0cmFpbnRzKSB7XG4gICAgICAgIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgMzgpIHtcbiAgICAgICAgICAvLyAudXJscyBpcyBub3Qgc3VwcG9ydGVkIGluIEZGIDwgMzguXG4gICAgICAgICAgLy8gY3JlYXRlIFJUQ0ljZVNlcnZlcnMgd2l0aCBhIHNpbmdsZSB1cmwuXG4gICAgICAgICAgaWYgKHBjQ29uZmlnICYmIHBjQ29uZmlnLmljZVNlcnZlcnMpIHtcbiAgICAgICAgICAgIHZhciBuZXdJY2VTZXJ2ZXJzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBjQ29uZmlnLmljZVNlcnZlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgdmFyIHNlcnZlciA9IHBjQ29uZmlnLmljZVNlcnZlcnNbaV07XG4gICAgICAgICAgICAgIGlmIChzZXJ2ZXIuaGFzT3duUHJvcGVydHkoJ3VybHMnKSkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc2VydmVyLnVybHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgIHZhciBuZXdTZXJ2ZXIgPSB7XG4gICAgICAgICAgICAgICAgICAgIHVybDogc2VydmVyLnVybHNbal1cbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICBpZiAoc2VydmVyLnVybHNbal0uaW5kZXhPZigndHVybicpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1NlcnZlci51c2VybmFtZSA9IHNlcnZlci51c2VybmFtZTtcbiAgICAgICAgICAgICAgICAgICAgbmV3U2VydmVyLmNyZWRlbnRpYWwgPSBzZXJ2ZXIuY3JlZGVudGlhbDtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIG5ld0ljZVNlcnZlcnMucHVzaChuZXdTZXJ2ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdJY2VTZXJ2ZXJzLnB1c2gocGNDb25maWcuaWNlU2VydmVyc1tpXSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBjQ29uZmlnLmljZVNlcnZlcnMgPSBuZXdJY2VTZXJ2ZXJzO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IHdpbmRvdy5tb3pSVENQZWVyQ29ubmVjdGlvbihwY0NvbmZpZywgcGNDb25zdHJhaW50cyk7XG4gICAgICB9O1xuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSA9XG4gICAgICAgICAgd2luZG93Lm1velJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZTtcblxuICAgICAgLy8gd3JhcCBzdGF0aWMgbWV0aG9kcy4gQ3VycmVudGx5IGp1c3QgZ2VuZXJhdGVDZXJ0aWZpY2F0ZS5cbiAgICAgIGlmICh3aW5kb3cubW96UlRDUGVlckNvbm5lY3Rpb24uZ2VuZXJhdGVDZXJ0aWZpY2F0ZSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLCAnZ2VuZXJhdGVDZXJ0aWZpY2F0ZScsIHtcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5tb3pSVENQZWVyQ29ubmVjdGlvbi5nZW5lcmF0ZUNlcnRpZmljYXRlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHdpbmRvdy5SVENTZXNzaW9uRGVzY3JpcHRpb24gPSB3aW5kb3cubW96UlRDU2Vzc2lvbkRlc2NyaXB0aW9uO1xuICAgICAgd2luZG93LlJUQ0ljZUNhbmRpZGF0ZSA9IHdpbmRvdy5tb3pSVENJY2VDYW5kaWRhdGU7XG4gICAgfVxuXG4gICAgLy8gc2hpbSBhd2F5IG5lZWQgZm9yIG9ic29sZXRlIFJUQ0ljZUNhbmRpZGF0ZS9SVENTZXNzaW9uRGVzY3JpcHRpb24uXG4gICAgWydzZXRMb2NhbERlc2NyaXB0aW9uJywgJ3NldFJlbW90ZURlc2NyaXB0aW9uJywgJ2FkZEljZUNhbmRpZGF0ZSddXG4gICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgICAgIHZhciBuYXRpdmVNZXRob2QgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF07XG4gICAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhcmd1bWVudHNbMF0gPSBuZXcgKChtZXRob2QgPT09ICdhZGRJY2VDYW5kaWRhdGUnKSA/XG4gICAgICAgICAgICAgICAgd2luZG93LlJUQ0ljZUNhbmRpZGF0ZSA6XG4gICAgICAgICAgICAgICAgd2luZG93LlJUQ1Nlc3Npb25EZXNjcmlwdGlvbikoYXJndW1lbnRzWzBdKTtcbiAgICAgICAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgIC8vIHN1cHBvcnQgZm9yIGFkZEljZUNhbmRpZGF0ZShudWxsIG9yIHVuZGVmaW5lZClcbiAgICB2YXIgbmF0aXZlQWRkSWNlQ2FuZGlkYXRlID1cbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRJY2VDYW5kaWRhdGU7XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRJY2VDYW5kaWRhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghYXJndW1lbnRzWzBdKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHNbMV0pIHtcbiAgICAgICAgICBhcmd1bWVudHNbMV0uYXBwbHkobnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5hdGl2ZUFkZEljZUNhbmRpZGF0ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG5cbiAgICAvLyBzaGltIGdldFN0YXRzIHdpdGggbWFwbGlrZSBzdXBwb3J0XG4gICAgdmFyIG1ha2VNYXBTdGF0cyA9IGZ1bmN0aW9uKHN0YXRzKSB7XG4gICAgICB2YXIgbWFwID0gbmV3IE1hcCgpO1xuICAgICAgT2JqZWN0LmtleXMoc3RhdHMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIG1hcC5zZXQoa2V5LCBzdGF0c1trZXldKTtcbiAgICAgICAgbWFwW2tleV0gPSBzdGF0c1trZXldO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbWFwO1xuICAgIH07XG5cbiAgICB2YXIgbW9kZXJuU3RhdHNUeXBlcyA9IHtcbiAgICAgIGluYm91bmRydHA6ICdpbmJvdW5kLXJ0cCcsXG4gICAgICBvdXRib3VuZHJ0cDogJ291dGJvdW5kLXJ0cCcsXG4gICAgICBjYW5kaWRhdGVwYWlyOiAnY2FuZGlkYXRlLXBhaXInLFxuICAgICAgbG9jYWxjYW5kaWRhdGU6ICdsb2NhbC1jYW5kaWRhdGUnLFxuICAgICAgcmVtb3RlY2FuZGlkYXRlOiAncmVtb3RlLWNhbmRpZGF0ZSdcbiAgICB9O1xuXG4gICAgdmFyIG5hdGl2ZUdldFN0YXRzID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTdGF0cztcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFN0YXRzID0gZnVuY3Rpb24oXG4gICAgICBzZWxlY3RvcixcbiAgICAgIG9uU3VjYyxcbiAgICAgIG9uRXJyXG4gICAgKSB7XG4gICAgICByZXR1cm4gbmF0aXZlR2V0U3RhdHMuYXBwbHkodGhpcywgW3NlbGVjdG9yIHx8IG51bGxdKVxuICAgICAgICAudGhlbihmdW5jdGlvbihzdGF0cykge1xuICAgICAgICAgIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgNDgpIHtcbiAgICAgICAgICAgIHN0YXRzID0gbWFrZU1hcFN0YXRzKHN0YXRzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCA1MyAmJiAhb25TdWNjKSB7XG4gICAgICAgICAgICAvLyBTaGltIG9ubHkgcHJvbWlzZSBnZXRTdGF0cyB3aXRoIHNwZWMtaHlwaGVucyBpbiB0eXBlIG5hbWVzXG4gICAgICAgICAgICAvLyBMZWF2ZSBjYWxsYmFjayB2ZXJzaW9uIGFsb25lOyBtaXNjIG9sZCB1c2VzIG9mIGZvckVhY2ggYmVmb3JlIE1hcFxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgc3RhdHMuZm9yRWFjaChmdW5jdGlvbihzdGF0KSB7XG4gICAgICAgICAgICAgICAgc3RhdC50eXBlID0gbW9kZXJuU3RhdHNUeXBlc1tzdGF0LnR5cGVdIHx8IHN0YXQudHlwZTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgIGlmIChlLm5hbWUgIT09ICdUeXBlRXJyb3InKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyBBdm9pZCBUeXBlRXJyb3I6IFwidHlwZVwiIGlzIHJlYWQtb25seSwgaW4gb2xkIHZlcnNpb25zLiAzNC00M2lzaFxuICAgICAgICAgICAgICBzdGF0cy5mb3JFYWNoKGZ1bmN0aW9uKHN0YXQsIGkpIHtcbiAgICAgICAgICAgICAgICBzdGF0cy5zZXQoaSwgT2JqZWN0LmFzc2lnbih7fSwgc3RhdCwge1xuICAgICAgICAgICAgICAgICAgdHlwZTogbW9kZXJuU3RhdHNUeXBlc1tzdGF0LnR5cGVdIHx8IHN0YXQudHlwZVxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBzdGF0cztcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ob25TdWNjLCBvbkVycik7XG4gICAgfTtcbiAgfSxcblxuICBzaGltUmVtb3ZlU3RyZWFtOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICBpZiAoIXdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiB8fFxuICAgICAgICAncmVtb3ZlU3RyZWFtJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgdXRpbHMuZGVwcmVjYXRlZCgncmVtb3ZlU3RyZWFtJywgJ3JlbW92ZVRyYWNrJyk7XG4gICAgICB0aGlzLmdldFNlbmRlcnMoKS5mb3JFYWNoKGZ1bmN0aW9uKHNlbmRlcikge1xuICAgICAgICBpZiAoc2VuZGVyLnRyYWNrICYmIHN0cmVhbS5nZXRUcmFja3MoKS5pbmRleE9mKHNlbmRlci50cmFjaykgIT09IC0xKSB7XG4gICAgICAgICAgcGMucmVtb3ZlVHJhY2soc2VuZGVyKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcbiAgfVxufTtcblxufSx7XCIuLi91dGlsc1wiOjEzLFwiLi9nZXR1c2VybWVkaWFcIjoxMX1dLDExOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8qXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXG4gKiAgdHJlZS5cbiAqL1xuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xudmFyIGxvZ2dpbmcgPSB1dGlscy5sb2c7XG5cbi8vIEV4cG9zZSBwdWJsaWMgbWV0aG9kcy5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24od2luZG93KSB7XG4gIHZhciBicm93c2VyRGV0YWlscyA9IHV0aWxzLmRldGVjdEJyb3dzZXIod2luZG93KTtcbiAgdmFyIG5hdmlnYXRvciA9IHdpbmRvdyAmJiB3aW5kb3cubmF2aWdhdG9yO1xuICB2YXIgTWVkaWFTdHJlYW1UcmFjayA9IHdpbmRvdyAmJiB3aW5kb3cuTWVkaWFTdHJlYW1UcmFjaztcblxuICB2YXIgc2hpbUVycm9yXyA9IGZ1bmN0aW9uKGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZToge1xuICAgICAgICBJbnRlcm5hbEVycm9yOiAnTm90UmVhZGFibGVFcnJvcicsXG4gICAgICAgIE5vdFN1cHBvcnRlZEVycm9yOiAnVHlwZUVycm9yJyxcbiAgICAgICAgUGVybWlzc2lvbkRlbmllZEVycm9yOiAnTm90QWxsb3dlZEVycm9yJyxcbiAgICAgICAgU2VjdXJpdHlFcnJvcjogJ05vdEFsbG93ZWRFcnJvcidcbiAgICAgIH1bZS5uYW1lXSB8fCBlLm5hbWUsXG4gICAgICBtZXNzYWdlOiB7XG4gICAgICAgICdUaGUgb3BlcmF0aW9uIGlzIGluc2VjdXJlLic6ICdUaGUgcmVxdWVzdCBpcyBub3QgYWxsb3dlZCBieSB0aGUgJyArXG4gICAgICAgICd1c2VyIGFnZW50IG9yIHRoZSBwbGF0Zm9ybSBpbiB0aGUgY3VycmVudCBjb250ZXh0LidcbiAgICAgIH1bZS5tZXNzYWdlXSB8fCBlLm1lc3NhZ2UsXG4gICAgICBjb25zdHJhaW50OiBlLmNvbnN0cmFpbnQsXG4gICAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWUgKyAodGhpcy5tZXNzYWdlICYmICc6ICcpICsgdGhpcy5tZXNzYWdlO1xuICAgICAgfVxuICAgIH07XG4gIH07XG5cbiAgLy8gZ2V0VXNlck1lZGlhIGNvbnN0cmFpbnRzIHNoaW0uXG4gIHZhciBnZXRVc2VyTWVkaWFfID0gZnVuY3Rpb24oY29uc3RyYWludHMsIG9uU3VjY2Vzcywgb25FcnJvcikge1xuICAgIHZhciBjb25zdHJhaW50c1RvRkYzN18gPSBmdW5jdGlvbihjKSB7XG4gICAgICBpZiAodHlwZW9mIGMgIT09ICdvYmplY3QnIHx8IGMucmVxdWlyZSkge1xuICAgICAgICByZXR1cm4gYztcbiAgICAgIH1cbiAgICAgIHZhciByZXF1aXJlID0gW107XG4gICAgICBPYmplY3Qua2V5cyhjKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICBpZiAoa2V5ID09PSAncmVxdWlyZScgfHwga2V5ID09PSAnYWR2YW5jZWQnIHx8IGtleSA9PT0gJ21lZGlhU291cmNlJykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgciA9IGNba2V5XSA9ICh0eXBlb2YgY1trZXldID09PSAnb2JqZWN0JykgP1xuICAgICAgICAgICAgY1trZXldIDoge2lkZWFsOiBjW2tleV19O1xuICAgICAgICBpZiAoci5taW4gIT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgci5tYXggIT09IHVuZGVmaW5lZCB8fCByLmV4YWN0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXF1aXJlLnB1c2goa2V5KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoci5leGFjdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiByLmV4YWN0ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgci4gbWluID0gci5tYXggPSByLmV4YWN0O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjW2tleV0gPSByLmV4YWN0O1xuICAgICAgICAgIH1cbiAgICAgICAgICBkZWxldGUgci5leGFjdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoci5pZGVhbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgYy5hZHZhbmNlZCA9IGMuYWR2YW5jZWQgfHwgW107XG4gICAgICAgICAgdmFyIG9jID0ge307XG4gICAgICAgICAgaWYgKHR5cGVvZiByLmlkZWFsID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgb2Nba2V5XSA9IHttaW46IHIuaWRlYWwsIG1heDogci5pZGVhbH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9jW2tleV0gPSByLmlkZWFsO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjLmFkdmFuY2VkLnB1c2gob2MpO1xuICAgICAgICAgIGRlbGV0ZSByLmlkZWFsO1xuICAgICAgICAgIGlmICghT2JqZWN0LmtleXMocikubGVuZ3RoKSB7XG4gICAgICAgICAgICBkZWxldGUgY1trZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAocmVxdWlyZS5sZW5ndGgpIHtcbiAgICAgICAgYy5yZXF1aXJlID0gcmVxdWlyZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjO1xuICAgIH07XG4gICAgY29uc3RyYWludHMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGNvbnN0cmFpbnRzKSk7XG4gICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCAzOCkge1xuICAgICAgbG9nZ2luZygnc3BlYzogJyArIEpTT04uc3RyaW5naWZ5KGNvbnN0cmFpbnRzKSk7XG4gICAgICBpZiAoY29uc3RyYWludHMuYXVkaW8pIHtcbiAgICAgICAgY29uc3RyYWludHMuYXVkaW8gPSBjb25zdHJhaW50c1RvRkYzN18oY29uc3RyYWludHMuYXVkaW8pO1xuICAgICAgfVxuICAgICAgaWYgKGNvbnN0cmFpbnRzLnZpZGVvKSB7XG4gICAgICAgIGNvbnN0cmFpbnRzLnZpZGVvID0gY29uc3RyYWludHNUb0ZGMzdfKGNvbnN0cmFpbnRzLnZpZGVvKTtcbiAgICAgIH1cbiAgICAgIGxvZ2dpbmcoJ2ZmMzc6ICcgKyBKU09OLnN0cmluZ2lmeShjb25zdHJhaW50cykpO1xuICAgIH1cbiAgICByZXR1cm4gbmF2aWdhdG9yLm1vekdldFVzZXJNZWRpYShjb25zdHJhaW50cywgb25TdWNjZXNzLCBmdW5jdGlvbihlKSB7XG4gICAgICBvbkVycm9yKHNoaW1FcnJvcl8oZSkpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIFJldHVybnMgdGhlIHJlc3VsdCBvZiBnZXRVc2VyTWVkaWEgYXMgYSBQcm9taXNlLlxuICB2YXIgZ2V0VXNlck1lZGlhUHJvbWlzZV8gPSBmdW5jdGlvbihjb25zdHJhaW50cykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGdldFVzZXJNZWRpYV8oY29uc3RyYWludHMsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gU2hpbSBmb3IgbWVkaWFEZXZpY2VzIG9uIG9sZGVyIHZlcnNpb25zLlxuICBpZiAoIW5hdmlnYXRvci5tZWRpYURldmljZXMpIHtcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzID0ge2dldFVzZXJNZWRpYTogZ2V0VXNlck1lZGlhUHJvbWlzZV8sXG4gICAgICBhZGRFdmVudExpc3RlbmVyOiBmdW5jdGlvbigpIHsgfSxcbiAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXI6IGZ1bmN0aW9uKCkgeyB9XG4gICAgfTtcbiAgfVxuICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmVudW1lcmF0ZURldmljZXMgPVxuICAgICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzIHx8IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuICAgICAgICAgIHZhciBpbmZvcyA9IFtcbiAgICAgICAgICAgIHtraW5kOiAnYXVkaW9pbnB1dCcsIGRldmljZUlkOiAnZGVmYXVsdCcsIGxhYmVsOiAnJywgZ3JvdXBJZDogJyd9LFxuICAgICAgICAgICAge2tpbmQ6ICd2aWRlb2lucHV0JywgZGV2aWNlSWQ6ICdkZWZhdWx0JywgbGFiZWw6ICcnLCBncm91cElkOiAnJ31cbiAgICAgICAgICBdO1xuICAgICAgICAgIHJlc29sdmUoaW5mb3MpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCA0MSkge1xuICAgIC8vIFdvcmsgYXJvdW5kIGh0dHA6Ly9idWd6aWwubGEvMTE2OTY2NVxuICAgIHZhciBvcmdFbnVtZXJhdGVEZXZpY2VzID1cbiAgICAgICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzLmJpbmQobmF2aWdhdG9yLm1lZGlhRGV2aWNlcyk7XG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gb3JnRW51bWVyYXRlRGV2aWNlcygpLnRoZW4odW5kZWZpbmVkLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChlLm5hbWUgPT09ICdOb3RGb3VuZEVycm9yJykge1xuICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBlO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfVxuICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDQ5KSB7XG4gICAgdmFyIG9yaWdHZXRVc2VyTWVkaWEgPSBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYS5cbiAgICAgICAgYmluZChuYXZpZ2F0b3IubWVkaWFEZXZpY2VzKTtcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSA9IGZ1bmN0aW9uKGMpIHtcbiAgICAgIHJldHVybiBvcmlnR2V0VXNlck1lZGlhKGMpLnRoZW4oZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICAgIC8vIFdvcmsgYXJvdW5kIGh0dHBzOi8vYnVnemlsLmxhLzgwMjMyNlxuICAgICAgICBpZiAoYy5hdWRpbyAmJiAhc3RyZWFtLmdldEF1ZGlvVHJhY2tzKCkubGVuZ3RoIHx8XG4gICAgICAgICAgICBjLnZpZGVvICYmICFzdHJlYW0uZ2V0VmlkZW9UcmFja3MoKS5sZW5ndGgpIHtcbiAgICAgICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xuICAgICAgICAgICAgdHJhY2suc3RvcCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oJ1RoZSBvYmplY3QgY2FuIG5vdCBiZSBmb3VuZCBoZXJlLicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnTm90Rm91bmRFcnJvcicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHJlYW07XG4gICAgICB9LCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChzaGltRXJyb3JfKGUpKTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbiAgaWYgKCEoYnJvd3NlckRldGFpbHMudmVyc2lvbiA+IDU1ICYmXG4gICAgICAnYXV0b0dhaW5Db250cm9sJyBpbiBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFN1cHBvcnRlZENvbnN0cmFpbnRzKCkpKSB7XG4gICAgdmFyIHJlbWFwID0gZnVuY3Rpb24ob2JqLCBhLCBiKSB7XG4gICAgICBpZiAoYSBpbiBvYmogJiYgIShiIGluIG9iaikpIHtcbiAgICAgICAgb2JqW2JdID0gb2JqW2FdO1xuICAgICAgICBkZWxldGUgb2JqW2FdO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgbmF0aXZlR2V0VXNlck1lZGlhID0gbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEuXG4gICAgICAgIGJpbmQobmF2aWdhdG9yLm1lZGlhRGV2aWNlcyk7XG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEgPSBmdW5jdGlvbihjKSB7XG4gICAgICBpZiAodHlwZW9mIGMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBjLmF1ZGlvID09PSAnb2JqZWN0Jykge1xuICAgICAgICBjID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShjKSk7XG4gICAgICAgIHJlbWFwKGMuYXVkaW8sICdhdXRvR2FpbkNvbnRyb2wnLCAnbW96QXV0b0dhaW5Db250cm9sJyk7XG4gICAgICAgIHJlbWFwKGMuYXVkaW8sICdub2lzZVN1cHByZXNzaW9uJywgJ21vek5vaXNlU3VwcHJlc3Npb24nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuYXRpdmVHZXRVc2VyTWVkaWEoYyk7XG4gICAgfTtcblxuICAgIGlmIChNZWRpYVN0cmVhbVRyYWNrICYmIE1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLmdldFNldHRpbmdzKSB7XG4gICAgICB2YXIgbmF0aXZlR2V0U2V0dGluZ3MgPSBNZWRpYVN0cmVhbVRyYWNrLnByb3RvdHlwZS5nZXRTZXR0aW5ncztcbiAgICAgIE1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLmdldFNldHRpbmdzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBvYmogPSBuYXRpdmVHZXRTZXR0aW5ncy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICByZW1hcChvYmosICdtb3pBdXRvR2FpbkNvbnRyb2wnLCAnYXV0b0dhaW5Db250cm9sJyk7XG4gICAgICAgIHJlbWFwKG9iaiwgJ21vek5vaXNlU3VwcHJlc3Npb24nLCAnbm9pc2VTdXBwcmVzc2lvbicpO1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoTWVkaWFTdHJlYW1UcmFjayAmJiBNZWRpYVN0cmVhbVRyYWNrLnByb3RvdHlwZS5hcHBseUNvbnN0cmFpbnRzKSB7XG4gICAgICB2YXIgbmF0aXZlQXBwbHlDb25zdHJhaW50cyA9IE1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLmFwcGx5Q29uc3RyYWludHM7XG4gICAgICBNZWRpYVN0cmVhbVRyYWNrLnByb3RvdHlwZS5hcHBseUNvbnN0cmFpbnRzID0gZnVuY3Rpb24oYykge1xuICAgICAgICBpZiAodGhpcy5raW5kID09PSAnYXVkaW8nICYmIHR5cGVvZiBjID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGMpKTtcbiAgICAgICAgICByZW1hcChjLCAnYXV0b0dhaW5Db250cm9sJywgJ21vekF1dG9HYWluQ29udHJvbCcpO1xuICAgICAgICAgIHJlbWFwKGMsICdub2lzZVN1cHByZXNzaW9uJywgJ21vek5vaXNlU3VwcHJlc3Npb24nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmF0aXZlQXBwbHlDb25zdHJhaW50cy5hcHBseSh0aGlzLCBbY10pO1xuICAgICAgfTtcbiAgICB9XG4gIH1cbiAgbmF2aWdhdG9yLmdldFVzZXJNZWRpYSA9IGZ1bmN0aW9uKGNvbnN0cmFpbnRzLCBvblN1Y2Nlc3MsIG9uRXJyb3IpIHtcbiAgICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDQ0KSB7XG4gICAgICByZXR1cm4gZ2V0VXNlck1lZGlhXyhjb25zdHJhaW50cywgb25TdWNjZXNzLCBvbkVycm9yKTtcbiAgICB9XG4gICAgLy8gUmVwbGFjZSBGaXJlZm94IDQ0KydzIGRlcHJlY2F0aW9uIHdhcm5pbmcgd2l0aCB1bnByZWZpeGVkIHZlcnNpb24uXG4gICAgdXRpbHMuZGVwcmVjYXRlZCgnbmF2aWdhdG9yLmdldFVzZXJNZWRpYScsXG4gICAgICAgICduYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYScpO1xuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzKS50aGVuKG9uU3VjY2Vzcywgb25FcnJvcik7XG4gIH07XG59O1xuXG59LHtcIi4uL3V0aWxzXCI6MTN9XSwxMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vKlxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxuICogIHRyZWUuXG4gKi9cbid1c2Ugc3RyaWN0JztcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzaGltTG9jYWxTdHJlYW1zQVBJOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ29iamVjdCcgfHwgIXdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoISgnZ2V0TG9jYWxTdHJlYW1zJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRMb2NhbFN0cmVhbXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9sb2NhbFN0cmVhbXMpIHtcbiAgICAgICAgICB0aGlzLl9sb2NhbFN0cmVhbXMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxTdHJlYW1zO1xuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKCEoJ2dldFN0cmVhbUJ5SWQnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFN0cmVhbUJ5SWQgPSBmdW5jdGlvbihpZCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuX2xvY2FsU3RyZWFtcykge1xuICAgICAgICAgIHRoaXMuX2xvY2FsU3RyZWFtcy5mb3JFYWNoKGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgICAgICAgaWYgKHN0cmVhbS5pZCA9PT0gaWQpIHtcbiAgICAgICAgICAgICAgcmVzdWx0ID0gc3RyZWFtO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9yZW1vdGVTdHJlYW1zKSB7XG4gICAgICAgICAgdGhpcy5fcmVtb3RlU3RyZWFtcy5mb3JFYWNoKGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgICAgICAgaWYgKHN0cmVhbS5pZCA9PT0gaWQpIHtcbiAgICAgICAgICAgICAgcmVzdWx0ID0gc3RyZWFtO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAoISgnYWRkU3RyZWFtJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xuICAgICAgdmFyIF9hZGRUcmFjayA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2s7XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgICBpZiAoIXRoaXMuX2xvY2FsU3RyZWFtcykge1xuICAgICAgICAgIHRoaXMuX2xvY2FsU3RyZWFtcyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9sb2NhbFN0cmVhbXMuaW5kZXhPZihzdHJlYW0pID09PSAtMSkge1xuICAgICAgICAgIHRoaXMuX2xvY2FsU3RyZWFtcy5wdXNoKHN0cmVhbSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcbiAgICAgICAgICBfYWRkVHJhY2suY2FsbChwYywgdHJhY2ssIHN0cmVhbSk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjayA9IGZ1bmN0aW9uKHRyYWNrLCBzdHJlYW0pIHtcbiAgICAgICAgaWYgKHN0cmVhbSkge1xuICAgICAgICAgIGlmICghdGhpcy5fbG9jYWxTdHJlYW1zKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2NhbFN0cmVhbXMgPSBbc3RyZWFtXTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2xvY2FsU3RyZWFtcy5pbmRleE9mKHN0cmVhbSkgPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2NhbFN0cmVhbXMucHVzaChzdHJlYW0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX2FkZFRyYWNrLmNhbGwodGhpcywgdHJhY2ssIHN0cmVhbSk7XG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAoISgncmVtb3ZlU3RyZWFtJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgICAgaWYgKCF0aGlzLl9sb2NhbFN0cmVhbXMpIHtcbiAgICAgICAgICB0aGlzLl9sb2NhbFN0cmVhbXMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLl9sb2NhbFN0cmVhbXMuaW5kZXhPZihzdHJlYW0pO1xuICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xvY2FsU3RyZWFtcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgICB2YXIgdHJhY2tzID0gc3RyZWFtLmdldFRyYWNrcygpO1xuICAgICAgICB0aGlzLmdldFNlbmRlcnMoKS5mb3JFYWNoKGZ1bmN0aW9uKHNlbmRlcikge1xuICAgICAgICAgIGlmICh0cmFja3MuaW5kZXhPZihzZW5kZXIudHJhY2spICE9PSAtMSkge1xuICAgICAgICAgICAgcGMucmVtb3ZlVHJhY2soc2VuZGVyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9XG4gIH0sXG4gIHNoaW1SZW1vdGVTdHJlYW1zQVBJOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ29iamVjdCcgfHwgIXdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoISgnZ2V0UmVtb3RlU3RyZWFtcycgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkpIHtcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0UmVtb3RlU3RyZWFtcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVtb3RlU3RyZWFtcyA/IHRoaXMuX3JlbW90ZVN0cmVhbXMgOiBbXTtcbiAgICAgIH07XG4gICAgfVxuICAgIGlmICghKCdvbmFkZHN0cmVhbScgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLCAnb25hZGRzdHJlYW0nLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX29uYWRkc3RyZWFtO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKGYpIHtcbiAgICAgICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgICAgIGlmICh0aGlzLl9vbmFkZHN0cmVhbSkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdhZGRzdHJlYW0nLCB0aGlzLl9vbmFkZHN0cmVhbSk7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYWNrJywgdGhpcy5fb25hZGRzdHJlYW1wb2x5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdhZGRzdHJlYW0nLCB0aGlzLl9vbmFkZHN0cmVhbSA9IGYpO1xuICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigndHJhY2snLCB0aGlzLl9vbmFkZHN0cmVhbXBvbHkgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnN0cmVhbXMuZm9yRWFjaChmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgICAgICAgICAgaWYgKCFwYy5fcmVtb3RlU3RyZWFtcykge1xuICAgICAgICAgICAgICAgIHBjLl9yZW1vdGVTdHJlYW1zID0gW107XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKHBjLl9yZW1vdGVTdHJlYW1zLmluZGV4T2Yoc3RyZWFtKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHBjLl9yZW1vdGVTdHJlYW1zLnB1c2goc3RyZWFtKTtcbiAgICAgICAgICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdhZGRzdHJlYW0nKTtcbiAgICAgICAgICAgICAgZXZlbnQuc3RyZWFtID0gc3RyZWFtO1xuICAgICAgICAgICAgICBwYy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIHNoaW1DYWxsYmFja3NBUEk6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAnb2JqZWN0JyB8fCAhd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBwcm90b3R5cGUgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlO1xuICAgIHZhciBjcmVhdGVPZmZlciA9IHByb3RvdHlwZS5jcmVhdGVPZmZlcjtcbiAgICB2YXIgY3JlYXRlQW5zd2VyID0gcHJvdG90eXBlLmNyZWF0ZUFuc3dlcjtcbiAgICB2YXIgc2V0TG9jYWxEZXNjcmlwdGlvbiA9IHByb3RvdHlwZS5zZXRMb2NhbERlc2NyaXB0aW9uO1xuICAgIHZhciBzZXRSZW1vdGVEZXNjcmlwdGlvbiA9IHByb3RvdHlwZS5zZXRSZW1vdGVEZXNjcmlwdGlvbjtcbiAgICB2YXIgYWRkSWNlQ2FuZGlkYXRlID0gcHJvdG90eXBlLmFkZEljZUNhbmRpZGF0ZTtcblxuICAgIHByb3RvdHlwZS5jcmVhdGVPZmZlciA9IGZ1bmN0aW9uKHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKSB7XG4gICAgICB2YXIgb3B0aW9ucyA9IChhcmd1bWVudHMubGVuZ3RoID49IDIpID8gYXJndW1lbnRzWzJdIDogYXJndW1lbnRzWzBdO1xuICAgICAgdmFyIHByb21pc2UgPSBjcmVhdGVPZmZlci5hcHBseSh0aGlzLCBbb3B0aW9uc10pO1xuICAgICAgaWYgKCFmYWlsdXJlQ2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgICB9XG4gICAgICBwcm9taXNlLnRoZW4oc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH07XG5cbiAgICBwcm90b3R5cGUuY3JlYXRlQW5zd2VyID0gZnVuY3Rpb24oc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spIHtcbiAgICAgIHZhciBvcHRpb25zID0gKGFyZ3VtZW50cy5sZW5ndGggPj0gMikgPyBhcmd1bWVudHNbMl0gOiBhcmd1bWVudHNbMF07XG4gICAgICB2YXIgcHJvbWlzZSA9IGNyZWF0ZUFuc3dlci5hcHBseSh0aGlzLCBbb3B0aW9uc10pO1xuICAgICAgaWYgKCFmYWlsdXJlQ2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgICB9XG4gICAgICBwcm9taXNlLnRoZW4oc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH07XG5cbiAgICB2YXIgd2l0aENhbGxiYWNrID0gZnVuY3Rpb24oZGVzY3JpcHRpb24sIHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKSB7XG4gICAgICB2YXIgcHJvbWlzZSA9IHNldExvY2FsRGVzY3JpcHRpb24uYXBwbHkodGhpcywgW2Rlc2NyaXB0aW9uXSk7XG4gICAgICBpZiAoIWZhaWx1cmVDYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgIH1cbiAgICAgIHByb21pc2UudGhlbihzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjayk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfTtcbiAgICBwcm90b3R5cGUuc2V0TG9jYWxEZXNjcmlwdGlvbiA9IHdpdGhDYWxsYmFjaztcblxuICAgIHdpdGhDYWxsYmFjayA9IGZ1bmN0aW9uKGRlc2NyaXB0aW9uLCBzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjaykge1xuICAgICAgdmFyIHByb21pc2UgPSBzZXRSZW1vdGVEZXNjcmlwdGlvbi5hcHBseSh0aGlzLCBbZGVzY3JpcHRpb25dKTtcbiAgICAgIGlmICghZmFpbHVyZUNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgICAgfVxuICAgICAgcHJvbWlzZS50aGVuKHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9O1xuICAgIHByb3RvdHlwZS5zZXRSZW1vdGVEZXNjcmlwdGlvbiA9IHdpdGhDYWxsYmFjaztcblxuICAgIHdpdGhDYWxsYmFjayA9IGZ1bmN0aW9uKGNhbmRpZGF0ZSwgc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spIHtcbiAgICAgIHZhciBwcm9taXNlID0gYWRkSWNlQ2FuZGlkYXRlLmFwcGx5KHRoaXMsIFtjYW5kaWRhdGVdKTtcbiAgICAgIGlmICghZmFpbHVyZUNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgICAgfVxuICAgICAgcHJvbWlzZS50aGVuKHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9O1xuICAgIHByb3RvdHlwZS5hZGRJY2VDYW5kaWRhdGUgPSB3aXRoQ2FsbGJhY2s7XG4gIH0sXG4gIHNoaW1HZXRVc2VyTWVkaWE6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIHZhciBuYXZpZ2F0b3IgPSB3aW5kb3cgJiYgd2luZG93Lm5hdmlnYXRvcjtcblxuICAgIGlmICghbmF2aWdhdG9yLmdldFVzZXJNZWRpYSkge1xuICAgICAgaWYgKG5hdmlnYXRvci53ZWJraXRHZXRVc2VyTWVkaWEpIHtcbiAgICAgICAgbmF2aWdhdG9yLmdldFVzZXJNZWRpYSA9IG5hdmlnYXRvci53ZWJraXRHZXRVc2VyTWVkaWEuYmluZChuYXZpZ2F0b3IpO1xuICAgICAgfSBlbHNlIGlmIChuYXZpZ2F0b3IubWVkaWFEZXZpY2VzICYmXG4gICAgICAgICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEpIHtcbiAgICAgICAgbmF2aWdhdG9yLmdldFVzZXJNZWRpYSA9IGZ1bmN0aW9uKGNvbnN0cmFpbnRzLCBjYiwgZXJyY2IpIHtcbiAgICAgICAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYShjb25zdHJhaW50cylcbiAgICAgICAgICAudGhlbihjYiwgZXJyY2IpO1xuICAgICAgICB9LmJpbmQobmF2aWdhdG9yKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHNoaW1SVENJY2VTZXJ2ZXJVcmxzOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICAvLyBtaWdyYXRlIGZyb20gbm9uLXNwZWMgUlRDSWNlU2VydmVyLnVybCB0byBSVENJY2VTZXJ2ZXIudXJsc1xuICAgIHZhciBPcmlnUGVlckNvbm5lY3Rpb24gPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb247XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uID0gZnVuY3Rpb24ocGNDb25maWcsIHBjQ29uc3RyYWludHMpIHtcbiAgICAgIGlmIChwY0NvbmZpZyAmJiBwY0NvbmZpZy5pY2VTZXJ2ZXJzKSB7XG4gICAgICAgIHZhciBuZXdJY2VTZXJ2ZXJzID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGNDb25maWcuaWNlU2VydmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBzZXJ2ZXIgPSBwY0NvbmZpZy5pY2VTZXJ2ZXJzW2ldO1xuICAgICAgICAgIGlmICghc2VydmVyLmhhc093blByb3BlcnR5KCd1cmxzJykgJiZcbiAgICAgICAgICAgICAgc2VydmVyLmhhc093blByb3BlcnR5KCd1cmwnKSkge1xuICAgICAgICAgICAgdXRpbHMuZGVwcmVjYXRlZCgnUlRDSWNlU2VydmVyLnVybCcsICdSVENJY2VTZXJ2ZXIudXJscycpO1xuICAgICAgICAgICAgc2VydmVyID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShzZXJ2ZXIpKTtcbiAgICAgICAgICAgIHNlcnZlci51cmxzID0gc2VydmVyLnVybDtcbiAgICAgICAgICAgIGRlbGV0ZSBzZXJ2ZXIudXJsO1xuICAgICAgICAgICAgbmV3SWNlU2VydmVycy5wdXNoKHNlcnZlcik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld0ljZVNlcnZlcnMucHVzaChwY0NvbmZpZy5pY2VTZXJ2ZXJzW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcGNDb25maWcuaWNlU2VydmVycyA9IG5ld0ljZVNlcnZlcnM7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IE9yaWdQZWVyQ29ubmVjdGlvbihwY0NvbmZpZywgcGNDb25zdHJhaW50cyk7XG4gICAgfTtcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlID0gT3JpZ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZTtcbiAgICAvLyB3cmFwIHN0YXRpYyBtZXRob2RzLiBDdXJyZW50bHkganVzdCBnZW5lcmF0ZUNlcnRpZmljYXRlLlxuICAgIGlmICgnZ2VuZXJhdGVDZXJ0aWZpY2F0ZScgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLCAnZ2VuZXJhdGVDZXJ0aWZpY2F0ZScsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gT3JpZ1BlZXJDb25uZWN0aW9uLmdlbmVyYXRlQ2VydGlmaWNhdGU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgc2hpbVRyYWNrRXZlbnRUcmFuc2NlaXZlcjogZnVuY3Rpb24od2luZG93KSB7XG4gICAgLy8gQWRkIGV2ZW50LnRyYW5zY2VpdmVyIG1lbWJlciBvdmVyIGRlcHJlY2F0ZWQgZXZlbnQucmVjZWl2ZXJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uICYmXG4gICAgICAgICgncmVjZWl2ZXInIGluIHdpbmRvdy5SVENUcmFja0V2ZW50LnByb3RvdHlwZSkgJiZcbiAgICAgICAgLy8gY2FuJ3QgY2hlY2sgJ3RyYW5zY2VpdmVyJyBpbiB3aW5kb3cuUlRDVHJhY2tFdmVudC5wcm90b3R5cGUsIGFzIGl0IGlzXG4gICAgICAgIC8vIGRlZmluZWQgZm9yIHNvbWUgcmVhc29uIGV2ZW4gd2hlbiB3aW5kb3cuUlRDVHJhbnNjZWl2ZXIgaXMgbm90LlxuICAgICAgICAhd2luZG93LlJUQ1RyYW5zY2VpdmVyKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1RyYWNrRXZlbnQucHJvdG90eXBlLCAndHJhbnNjZWl2ZXInLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHtyZWNlaXZlcjogdGhpcy5yZWNlaXZlcn07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICBzaGltQ3JlYXRlT2ZmZXJMZWdhY3k6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIHZhciBvcmlnQ3JlYXRlT2ZmZXIgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmNyZWF0ZU9mZmVyO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlT2ZmZXIgPSBmdW5jdGlvbihvZmZlck9wdGlvbnMpIHtcbiAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICBpZiAob2ZmZXJPcHRpb25zKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW8gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgLy8gc3VwcG9ydCBiaXQgdmFsdWVzXG4gICAgICAgICAgb2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW8gPSAhIW9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZUF1ZGlvO1xuICAgICAgICB9XG4gICAgICAgIHZhciBhdWRpb1RyYW5zY2VpdmVyID0gcGMuZ2V0VHJhbnNjZWl2ZXJzKCkuZmluZChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xuICAgICAgICAgIHJldHVybiB0cmFuc2NlaXZlci5zZW5kZXIudHJhY2sgJiZcbiAgICAgICAgICAgICAgdHJhbnNjZWl2ZXIuc2VuZGVyLnRyYWNrLmtpbmQgPT09ICdhdWRpbyc7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW8gPT09IGZhbHNlICYmIGF1ZGlvVHJhbnNjZWl2ZXIpIHtcbiAgICAgICAgICBpZiAoYXVkaW9UcmFuc2NlaXZlci5kaXJlY3Rpb24gPT09ICdzZW5kcmVjdicpIHtcbiAgICAgICAgICAgIGlmIChhdWRpb1RyYW5zY2VpdmVyLnNldERpcmVjdGlvbikge1xuICAgICAgICAgICAgICBhdWRpb1RyYW5zY2VpdmVyLnNldERpcmVjdGlvbignc2VuZG9ubHknKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGF1ZGlvVHJhbnNjZWl2ZXIuZGlyZWN0aW9uID0gJ3NlbmRvbmx5JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGF1ZGlvVHJhbnNjZWl2ZXIuZGlyZWN0aW9uID09PSAncmVjdm9ubHknKSB7XG4gICAgICAgICAgICBpZiAoYXVkaW9UcmFuc2NlaXZlci5zZXREaXJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgYXVkaW9UcmFuc2NlaXZlci5zZXREaXJlY3Rpb24oJ2luYWN0aXZlJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBhdWRpb1RyYW5zY2VpdmVyLmRpcmVjdGlvbiA9ICdpbmFjdGl2ZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZUF1ZGlvID09PSB0cnVlICYmXG4gICAgICAgICAgICAhYXVkaW9UcmFuc2NlaXZlcikge1xuICAgICAgICAgIHBjLmFkZFRyYW5zY2VpdmVyKCdhdWRpbycpO1xuICAgICAgICB9XG5cblxuICAgICAgICBpZiAodHlwZW9mIG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZUF1ZGlvICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIC8vIHN1cHBvcnQgYml0IHZhbHVlc1xuICAgICAgICAgIG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvID0gISFvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVWaWRlbztcbiAgICAgICAgfVxuICAgICAgICB2YXIgdmlkZW9UcmFuc2NlaXZlciA9IHBjLmdldFRyYW5zY2VpdmVycygpLmZpbmQoZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcbiAgICAgICAgICByZXR1cm4gdHJhbnNjZWl2ZXIuc2VuZGVyLnRyYWNrICYmXG4gICAgICAgICAgICAgIHRyYW5zY2VpdmVyLnNlbmRlci50cmFjay5raW5kID09PSAndmlkZW8nO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvID09PSBmYWxzZSAmJiB2aWRlb1RyYW5zY2VpdmVyKSB7XG4gICAgICAgICAgaWYgKHZpZGVvVHJhbnNjZWl2ZXIuZGlyZWN0aW9uID09PSAnc2VuZHJlY3YnKSB7XG4gICAgICAgICAgICB2aWRlb1RyYW5zY2VpdmVyLnNldERpcmVjdGlvbignc2VuZG9ubHknKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHZpZGVvVHJhbnNjZWl2ZXIuZGlyZWN0aW9uID09PSAncmVjdm9ubHknKSB7XG4gICAgICAgICAgICB2aWRlb1RyYW5zY2VpdmVyLnNldERpcmVjdGlvbignaW5hY3RpdmUnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlVmlkZW8gPT09IHRydWUgJiZcbiAgICAgICAgICAgICF2aWRlb1RyYW5zY2VpdmVyKSB7XG4gICAgICAgICAgcGMuYWRkVHJhbnNjZWl2ZXIoJ3ZpZGVvJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBvcmlnQ3JlYXRlT2ZmZXIuYXBwbHkocGMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfVxufTtcblxufSx7XCIuLi91dGlsc1wiOjEzfV0sMTM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLypcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcbiAqICB0cmVlLlxuICovXG4gLyogZXNsaW50LWVudiBub2RlICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBsb2dEaXNhYmxlZF8gPSB0cnVlO1xudmFyIGRlcHJlY2F0aW9uV2FybmluZ3NfID0gdHJ1ZTtcblxuLyoqXG4gKiBFeHRyYWN0IGJyb3dzZXIgdmVyc2lvbiBvdXQgb2YgdGhlIHByb3ZpZGVkIHVzZXIgYWdlbnQgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7IXN0cmluZ30gdWFzdHJpbmcgdXNlckFnZW50IHN0cmluZy5cbiAqIEBwYXJhbSB7IXN0cmluZ30gZXhwciBSZWd1bGFyIGV4cHJlc3Npb24gdXNlZCBhcyBtYXRjaCBjcml0ZXJpYS5cbiAqIEBwYXJhbSB7IW51bWJlcn0gcG9zIHBvc2l0aW9uIGluIHRoZSB2ZXJzaW9uIHN0cmluZyB0byBiZSByZXR1cm5lZC5cbiAqIEByZXR1cm4geyFudW1iZXJ9IGJyb3dzZXIgdmVyc2lvbi5cbiAqL1xuZnVuY3Rpb24gZXh0cmFjdFZlcnNpb24odWFzdHJpbmcsIGV4cHIsIHBvcykge1xuICB2YXIgbWF0Y2ggPSB1YXN0cmluZy5tYXRjaChleHByKTtcbiAgcmV0dXJuIG1hdGNoICYmIG1hdGNoLmxlbmd0aCA+PSBwb3MgJiYgcGFyc2VJbnQobWF0Y2hbcG9zXSwgMTApO1xufVxuXG4vLyBXcmFwcyB0aGUgcGVlcmNvbm5lY3Rpb24gZXZlbnQgZXZlbnROYW1lVG9XcmFwIGluIGEgZnVuY3Rpb25cbi8vIHdoaWNoIHJldHVybnMgdGhlIG1vZGlmaWVkIGV2ZW50IG9iamVjdC5cbmZ1bmN0aW9uIHdyYXBQZWVyQ29ubmVjdGlvbkV2ZW50KHdpbmRvdywgZXZlbnROYW1lVG9XcmFwLCB3cmFwcGVyKSB7XG4gIGlmICghd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBwcm90byA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGU7XG4gIHZhciBuYXRpdmVBZGRFdmVudExpc3RlbmVyID0gcHJvdG8uYWRkRXZlbnRMaXN0ZW5lcjtcbiAgcHJvdG8uYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKG5hdGl2ZUV2ZW50TmFtZSwgY2IpIHtcbiAgICBpZiAobmF0aXZlRXZlbnROYW1lICE9PSBldmVudE5hbWVUb1dyYXApIHtcbiAgICAgIHJldHVybiBuYXRpdmVBZGRFdmVudExpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICAgIHZhciB3cmFwcGVkQ2FsbGJhY2sgPSBmdW5jdGlvbihlKSB7XG4gICAgICBjYih3cmFwcGVyKGUpKTtcbiAgICB9O1xuICAgIHRoaXMuX2V2ZW50TWFwID0gdGhpcy5fZXZlbnRNYXAgfHwge307XG4gICAgdGhpcy5fZXZlbnRNYXBbY2JdID0gd3JhcHBlZENhbGxiYWNrO1xuICAgIHJldHVybiBuYXRpdmVBZGRFdmVudExpc3RlbmVyLmFwcGx5KHRoaXMsIFtuYXRpdmVFdmVudE5hbWUsXG4gICAgICB3cmFwcGVkQ2FsbGJhY2tdKTtcbiAgfTtcblxuICB2YXIgbmF0aXZlUmVtb3ZlRXZlbnRMaXN0ZW5lciA9IHByb3RvLnJlbW92ZUV2ZW50TGlzdGVuZXI7XG4gIHByb3RvLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihuYXRpdmVFdmVudE5hbWUsIGNiKSB7XG4gICAgaWYgKG5hdGl2ZUV2ZW50TmFtZSAhPT0gZXZlbnROYW1lVG9XcmFwIHx8ICF0aGlzLl9ldmVudE1hcFxuICAgICAgICB8fCAhdGhpcy5fZXZlbnRNYXBbY2JdKSB7XG4gICAgICByZXR1cm4gbmF0aXZlUmVtb3ZlRXZlbnRMaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgICB2YXIgdW53cmFwcGVkQ2IgPSB0aGlzLl9ldmVudE1hcFtjYl07XG4gICAgZGVsZXRlIHRoaXMuX2V2ZW50TWFwW2NiXTtcbiAgICByZXR1cm4gbmF0aXZlUmVtb3ZlRXZlbnRMaXN0ZW5lci5hcHBseSh0aGlzLCBbbmF0aXZlRXZlbnROYW1lLFxuICAgICAgdW53cmFwcGVkQ2JdKTtcbiAgfTtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICdvbicgKyBldmVudE5hbWVUb1dyYXAsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXNbJ19vbicgKyBldmVudE5hbWVUb1dyYXBdO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbihjYikge1xuICAgICAgaWYgKHRoaXNbJ19vbicgKyBldmVudE5hbWVUb1dyYXBdKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWVUb1dyYXAsXG4gICAgICAgICAgICB0aGlzWydfb24nICsgZXZlbnROYW1lVG9XcmFwXSk7XG4gICAgICAgIGRlbGV0ZSB0aGlzWydfb24nICsgZXZlbnROYW1lVG9XcmFwXTtcbiAgICAgIH1cbiAgICAgIGlmIChjYikge1xuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lVG9XcmFwLFxuICAgICAgICAgICAgdGhpc1snX29uJyArIGV2ZW50TmFtZVRvV3JhcF0gPSBjYik7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cblxuLy8gVXRpbGl0eSBtZXRob2RzLlxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGV4dHJhY3RWZXJzaW9uOiBleHRyYWN0VmVyc2lvbixcbiAgd3JhcFBlZXJDb25uZWN0aW9uRXZlbnQ6IHdyYXBQZWVyQ29ubmVjdGlvbkV2ZW50LFxuICBkaXNhYmxlTG9nOiBmdW5jdGlvbihib29sKSB7XG4gICAgaWYgKHR5cGVvZiBib29sICE9PSAnYm9vbGVhbicpIHtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoJ0FyZ3VtZW50IHR5cGU6ICcgKyB0eXBlb2YgYm9vbCArXG4gICAgICAgICAgJy4gUGxlYXNlIHVzZSBhIGJvb2xlYW4uJyk7XG4gICAgfVxuICAgIGxvZ0Rpc2FibGVkXyA9IGJvb2w7XG4gICAgcmV0dXJuIChib29sKSA/ICdhZGFwdGVyLmpzIGxvZ2dpbmcgZGlzYWJsZWQnIDpcbiAgICAgICAgJ2FkYXB0ZXIuanMgbG9nZ2luZyBlbmFibGVkJztcbiAgfSxcblxuICAvKipcbiAgICogRGlzYWJsZSBvciBlbmFibGUgZGVwcmVjYXRpb24gd2FybmluZ3NcbiAgICogQHBhcmFtIHshYm9vbGVhbn0gYm9vbCBzZXQgdG8gdHJ1ZSB0byBkaXNhYmxlIHdhcm5pbmdzLlxuICAgKi9cbiAgZGlzYWJsZVdhcm5pbmdzOiBmdW5jdGlvbihib29sKSB7XG4gICAgaWYgKHR5cGVvZiBib29sICE9PSAnYm9vbGVhbicpIHtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoJ0FyZ3VtZW50IHR5cGU6ICcgKyB0eXBlb2YgYm9vbCArXG4gICAgICAgICAgJy4gUGxlYXNlIHVzZSBhIGJvb2xlYW4uJyk7XG4gICAgfVxuICAgIGRlcHJlY2F0aW9uV2FybmluZ3NfID0gIWJvb2w7XG4gICAgcmV0dXJuICdhZGFwdGVyLmpzIGRlcHJlY2F0aW9uIHdhcm5pbmdzICcgKyAoYm9vbCA/ICdkaXNhYmxlZCcgOiAnZW5hYmxlZCcpO1xuICB9LFxuXG4gIGxvZzogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAobG9nRGlzYWJsZWRfKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGNvbnNvbGUubG9nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBTaG93cyBhIGRlcHJlY2F0aW9uIHdhcm5pbmcgc3VnZ2VzdGluZyB0aGUgbW9kZXJuIGFuZCBzcGVjLWNvbXBhdGlibGUgQVBJLlxuICAgKi9cbiAgZGVwcmVjYXRlZDogZnVuY3Rpb24ob2xkTWV0aG9kLCBuZXdNZXRob2QpIHtcbiAgICBpZiAoIWRlcHJlY2F0aW9uV2FybmluZ3NfKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnNvbGUud2FybihvbGRNZXRob2QgKyAnIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgJyArIG5ld01ldGhvZCArXG4gICAgICAgICcgaW5zdGVhZC4nKTtcbiAgfSxcblxuICAvKipcbiAgICogQnJvd3NlciBkZXRlY3Rvci5cbiAgICpcbiAgICogQHJldHVybiB7b2JqZWN0fSByZXN1bHQgY29udGFpbmluZyBicm93c2VyIGFuZCB2ZXJzaW9uXG4gICAqICAgICBwcm9wZXJ0aWVzLlxuICAgKi9cbiAgZGV0ZWN0QnJvd3NlcjogZnVuY3Rpb24od2luZG93KSB7XG4gICAgdmFyIG5hdmlnYXRvciA9IHdpbmRvdyAmJiB3aW5kb3cubmF2aWdhdG9yO1xuXG4gICAgLy8gUmV0dXJuZWQgcmVzdWx0IG9iamVjdC5cbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgcmVzdWx0LmJyb3dzZXIgPSBudWxsO1xuICAgIHJlc3VsdC52ZXJzaW9uID0gbnVsbDtcblxuICAgIC8vIEZhaWwgZWFybHkgaWYgaXQncyBub3QgYSBicm93c2VyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnIHx8ICF3aW5kb3cubmF2aWdhdG9yKSB7XG4gICAgICByZXN1bHQuYnJvd3NlciA9ICdOb3QgYSBicm93c2VyLic7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGlmIChuYXZpZ2F0b3IubW96R2V0VXNlck1lZGlhKSB7IC8vIEZpcmVmb3guXG4gICAgICByZXN1bHQuYnJvd3NlciA9ICdmaXJlZm94JztcbiAgICAgIHJlc3VsdC52ZXJzaW9uID0gZXh0cmFjdFZlcnNpb24obmF2aWdhdG9yLnVzZXJBZ2VudCxcbiAgICAgICAgICAvRmlyZWZveFxcLyhcXGQrKVxcLi8sIDEpO1xuICAgIH0gZWxzZSBpZiAobmF2aWdhdG9yLndlYmtpdEdldFVzZXJNZWRpYSkge1xuICAgICAgLy8gQ2hyb21lLCBDaHJvbWl1bSwgV2VidmlldywgT3BlcmEuXG4gICAgICAvLyBWZXJzaW9uIG1hdGNoZXMgQ2hyb21lL1dlYlJUQyB2ZXJzaW9uLlxuICAgICAgcmVzdWx0LmJyb3dzZXIgPSAnY2hyb21lJztcbiAgICAgIHJlc3VsdC52ZXJzaW9uID0gZXh0cmFjdFZlcnNpb24obmF2aWdhdG9yLnVzZXJBZ2VudCxcbiAgICAgICAgICAvQ2hyb20oZXxpdW0pXFwvKFxcZCspXFwuLywgMik7XG4gICAgfSBlbHNlIGlmIChuYXZpZ2F0b3IubWVkaWFEZXZpY2VzICYmXG4gICAgICAgIG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0VkZ2VcXC8oXFxkKykuKFxcZCspJC8pKSB7IC8vIEVkZ2UuXG4gICAgICByZXN1bHQuYnJvd3NlciA9ICdlZGdlJztcbiAgICAgIHJlc3VsdC52ZXJzaW9uID0gZXh0cmFjdFZlcnNpb24obmF2aWdhdG9yLnVzZXJBZ2VudCxcbiAgICAgICAgICAvRWRnZVxcLyhcXGQrKS4oXFxkKykkLywgMik7XG4gICAgfSBlbHNlIGlmICh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gJiZcbiAgICAgICAgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQXBwbGVXZWJLaXRcXC8oXFxkKylcXC4vKSkgeyAvLyBTYWZhcmkuXG4gICAgICByZXN1bHQuYnJvd3NlciA9ICdzYWZhcmknO1xuICAgICAgcmVzdWx0LnZlcnNpb24gPSBleHRyYWN0VmVyc2lvbihuYXZpZ2F0b3IudXNlckFnZW50LFxuICAgICAgICAgIC9BcHBsZVdlYktpdFxcLyhcXGQrKVxcLi8sIDEpO1xuICAgIH0gZWxzZSB7IC8vIERlZmF1bHQgZmFsbHRocm91Z2g6IG5vdCBzdXBwb3J0ZWQuXG4gICAgICByZXN1bHQuYnJvd3NlciA9ICdOb3QgYSBzdXBwb3J0ZWQgYnJvd3Nlci4nO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59O1xuXG59LHt9XX0se30sWzNdKSgzKVxufSk7Il0sInNvdXJjZVJvb3QiOiIifQ==