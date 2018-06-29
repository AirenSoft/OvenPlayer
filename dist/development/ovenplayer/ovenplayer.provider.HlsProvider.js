/*! OvenPlayerv0.6.1 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ovenplayer.provider.HlsProvider"],{

/***/ "./src/js/api/provider/hls/Hls.js":
/*!****************************************!*\
  !*** ./src/js/api/provider/hls/Hls.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Core = __webpack_require__(/*! api/provider/Core */ "./src/js/api/provider/Core.js");

var _Core2 = _interopRequireDefault(_Core);

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @brief   hlsjs provider extended core.
 * @param   element video element.
 * @param   playerConfig    config.
 * */

/**
 * Created by hoho on 2018. 6. 7..
 */
var HlsProvider = function HlsProvider(element, playerConfig) {
    var hls = "";
    var that = {};
    var super_play = "";
    var super_destroy = "";

    try {
        hls = new Hls({ debug: false });
        hls.attachMedia(element);

        var sourceLoaded = function sourceLoaded(source, lastPlayPosition) {
            OvenPlayerConsole.log("HLS : source loaded : ", source, "lastPlayPosition : " + lastPlayPosition);
            hls.loadSource(source.file);
            if (lastPlayPosition > 0) {
                element.seek(lastPlayPosition);
                super_play();
            }
        };

        that = (0, _Core2.default)(_constants.PROVIDER_HLS, element, playerConfig, sourceLoaded);
        OvenPlayerConsole.log("HLS PROVIDER LOADED.");
        super_play = that.super('play');
        super_destroy = that.super('destroy');

        that.destroy = function () {
            hls.destroy();
            hls = null;

            OvenPlayerConsole.log("HLS : PROVIDER DESTROUYED.");

            super_destroy();
        };
    } catch (error) {
        throw new Error(error);
    }

    return that;
};

exports.default = HlsProvider;

/***/ }),

/***/ "./src/js/api/provider/webrtc/WebRTC.js":
/*!**********************************************!*\
  !*** ./src/js/api/provider/webrtc/WebRTC.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Core = __webpack_require__(/*! api/provider/Core */ "./src/js/api/provider/Core.js");

var _Core2 = _interopRequireDefault(_Core);

var _validator = __webpack_require__(/*! utils/validator */ "./src/js/utils/validator.js");

var _WebRTCLoader = __webpack_require__(/*! api/provider/webrtc/WebRTCLoader */ "./src/js/api/provider/webrtc/WebRTCLoader.js");

var _WebRTCLoader2 = _interopRequireDefault(_WebRTCLoader);

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

var _promise = __webpack_require__(/*! api/shims/promise */ "./src/js/api/shims/promise.js");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @brief   webrtc provider extended core.
 * @param   element video element.
 * @param   playerConfig    config.
 * */

var WebRTC = function WebRTC(element, playerConfig) {
    var webrtcLoader = null;
    var that = {},
        super_destroy = "",
        listener = "";

    var errorHandler = function errorHandler(error) {
        that.setState(_constants.STATE_ERROR);
        that.pause();
        that.trigger(_constants.ERROR, error);
    };
    var sourceLoaded = function sourceLoaded(source) {
        if ((0, _validator.isWebRTC)(source.file, source.type)) {
            OvenPlayerConsole.log("WEBRTC : source loaded : ", source);
            if (webrtcLoader) {
                webrtcLoader.destroy();
                webrtcLoader = null;
            }
            webrtcLoader = (0, _WebRTCLoader2.default)(source.file, errorHandler);
            webrtcLoader.connect().then(function (stream) {
                element.srcObject = stream;
                element.play();
            });
        }
    };

    that = (0, _Core2.default)(_constants.PROVIDER_WEBRTC, element, playerConfig, sourceLoaded);
    OvenPlayerConsole.log("WEBRTC PROVIDER LOADED.");
    super_destroy = that.super('destroy');

    that.destroy = function () {

        if (webrtcLoader) {
            webrtcLoader.destroy();
            webrtcLoader = null;
        }

        super_destroy();
        OvenPlayerConsole.log("WEBRTC :  PROVIDER DESTROYED.");
    };
    return that;
}; /**
    * Created by hoho on 2018. 6. 11..
    */
exports.default = WebRTC;

/***/ }),

/***/ "./src/js/api/provider/webrtc/WebRTCLoader.js":
/*!****************************************************!*\
  !*** ./src/js/api/provider/webrtc/WebRTCLoader.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _adapter = __webpack_require__(/*! utils/adapter */ "./src/js/utils/adapter.js");

var _adapter2 = _interopRequireDefault(_adapter);

var _promise = __webpack_require__(/*! api/shims/promise */ "./src/js/api/shims/promise.js");

var _promise2 = _interopRequireDefault(_promise);

var _constants = __webpack_require__(/*! api/constants */ "./src/js/api/constants.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WebRTCLoader = function WebRTCLoader(url, errorCallback) {
    var url = url;
    var ws = "";
    var peerConnection = "";
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
            }).catch(function (error) {
                closePeer({ code: _constants.PLAYER_WEBRTC_SET_LOCAL_DESC_ERROR, reason: "setLocalDescription error occurred", message: "setLocalDescription error occurred", error: error });
            });
        };

        return new _promise2.default(function (resolve, reject) {
            OvenPlayerConsole.log("WebRTCLoader url : " + url);
            ws = new WebSocket(url);
            ws.onopen = function () {
                ws.send(JSON.stringify({ command: "request_offer" }));
            };
            ws.onmessage = function (e) {
                var message = JSON.parse(e.data);
                if (message.error) {
                    OvenPlayerConsole.log(message.error);
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
                        }).catch(function (err) {
                            closePeer({ code: _constants.PLAYER_WEBRTC_CREATE_ANSWER_ERROR, reason: "createOffer error occurred", message: "createOffer error occurred", error: error });
                        });
                    };

                    peerConnection.onaddstream = function (e) {
                        OvenPlayerConsole.log("stream received.");
                        // stream received.
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
                            }).catch(function (error) {
                                closePeer({ code: _constants.PLAYER_WEBRTC_CREATE_ANSWER_ERROR, reason: "createAnswer error occurred", message: "createAnswer error occurred", error: error });
                            });
                        }
                    }).catch(function (error) {
                        closePeer({ code: _constants.PLAYER_WEBRTC_SET_REMOTE_DESC_ERROR, reason: "setRemoteDescription error occurred", message: "setRemoteDescription error occurred", error: error });
                    });
                }

                if (message.candidates) {
                    // This receives ICE Candidate from server.
                    for (var i = 0; i < message.candidates.length; i++) {
                        if (message.candidates[i] && message.candidates[i].candidate) {

                            peerConnection.addIceCandidate(new RTCIceCandidate(message.candidates[i])).then(function () {
                                OvenPlayerConsole.log("addIceCandidate : success");
                            }).catch(function (error) {
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
            ws.onclose = function (e) {
                closePeer({ code: _constants.PLAYER_WEBRTC_WS_CLOSED, reason: "websocket closed", message: "websocket closed", error: e });
                reject(e);
            };
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

exports.default = WebRTCLoader;

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
                    if (!streams.default) {
                      streams.default = new window.MediaStream();
                    }
                    stream = streams.default;
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
                  if (!streams.default) {
                    streams.default = new window.MediaStream();
                  }
                  addTrackToStreamAndFireEvent(track, streams.default);
                  receiverList.push([track, rtpReceiver, streams.default]);
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
          } else if (states.new > 0) {
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
          } else if (states.new > 0) {
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
            streams.delete(url);
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
          return origGetUserMedia(c).catch(function (e) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2hscy9IbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci93ZWJydGMvV2ViUlRDLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcGkvcHJvdmlkZXIvd2VicnRjL1dlYlJUQ0xvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvYWRhcHRlci5qcyJdLCJuYW1lcyI6WyJIbHNQcm92aWRlciIsImVsZW1lbnQiLCJwbGF5ZXJDb25maWciLCJobHMiLCJ0aGF0Iiwic3VwZXJfcGxheSIsInN1cGVyX2Rlc3Ryb3kiLCJIbHMiLCJkZWJ1ZyIsImF0dGFjaE1lZGlhIiwic291cmNlTG9hZGVkIiwic291cmNlIiwibGFzdFBsYXlQb3NpdGlvbiIsIk92ZW5QbGF5ZXJDb25zb2xlIiwibG9nIiwibG9hZFNvdXJjZSIsImZpbGUiLCJzZWVrIiwiUFJPVklERVJfSExTIiwic3VwZXIiLCJkZXN0cm95IiwiZXJyb3IiLCJFcnJvciIsIldlYlJUQyIsIndlYnJ0Y0xvYWRlciIsImxpc3RlbmVyIiwiZXJyb3JIYW5kbGVyIiwic2V0U3RhdGUiLCJTVEFURV9FUlJPUiIsInBhdXNlIiwidHJpZ2dlciIsIkVSUk9SIiwidHlwZSIsImNvbm5lY3QiLCJ0aGVuIiwic3RyZWFtIiwic3JjT2JqZWN0IiwicGxheSIsIlBST1ZJREVSX1dFQlJUQyIsIldlYlJUQ0xvYWRlciIsInVybCIsImVycm9yQ2FsbGJhY2siLCJ3cyIsInBlZXJDb25uZWN0aW9uIiwiY29uZmlnIiwibXlTZHAiLCJleGlzdGluZ0hhbmRsZXIiLCJ3aW5kb3ciLCJvbmJlZm9yZXVubG9hZCIsImV2ZW50IiwiY2xvc2VQZWVyIiwiaW5pdGlhbGl6ZSIsIm9uTG9jYWxEZXNjcmlwdGlvbiIsImlkIiwiY29ubmVjdGlvbiIsImRlc2MiLCJzZXRMb2NhbERlc2NyaXB0aW9uIiwibG9jYWxTRFAiLCJsb2NhbERlc2NyaXB0aW9uIiwic2VuZCIsIkpTT04iLCJzdHJpbmdpZnkiLCJjb21tYW5kIiwic2RwIiwiY2F0Y2giLCJjb2RlIiwiUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUiIsInJlYXNvbiIsIm1lc3NhZ2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsIldlYlNvY2tldCIsIm9ub3BlbiIsIm9ubWVzc2FnZSIsImUiLCJwYXJzZSIsImRhdGEiLCJsaXN0IiwiUlRDUGVlckNvbm5lY3Rpb24iLCJvbmljZWNhbmRpZGF0ZSIsImNhbmRpZGF0ZSIsImNhbmRpZGF0ZXMiLCJvbm5lZ290aWF0aW9ubmVlZGVkIiwiY3JlYXRlT2ZmZXIiLCJlcnIiLCJQTEFZRVJfV0VCUlRDX0NSRUFURV9BTlNXRVJfRVJST1IiLCJvbmFkZHN0cmVhbSIsInNldFJlbW90ZURlc2NyaXB0aW9uIiwiUlRDU2Vzc2lvbkRlc2NyaXB0aW9uIiwicmVtb3RlRGVzY3JpcHRpb24iLCJjcmVhdGVBbnN3ZXIiLCJQTEFZRVJfV0VCUlRDX1NFVF9SRU1PVEVfREVTQ19FUlJPUiIsImkiLCJsZW5ndGgiLCJhZGRJY2VDYW5kaWRhdGUiLCJSVENJY2VDYW5kaWRhdGUiLCJQTEFZRVJfV0VCUlRDX0FERF9JQ0VDQU5ESURBVEVfRVJST1IiLCJvbmVycm9yIiwiUExBWUVSX1dFQlJUQ19XU19FUlJPUiIsIm9uY2xvc2UiLCJQTEFZRVJfV0VCUlRDX1dTX0NMT1NFRCIsImNsb3NlIiwiZiIsImV4cG9ydHMiLCJtb2R1bGUiLCJkZWZpbmUiLCJ0IiwibiIsInIiLCJzIiwibyIsInUiLCJhIiwicmVxdWlyZSIsImwiLCJjYWxsIiwiU0RQVXRpbHMiLCJ3cml0ZU1lZGlhU2VjdGlvbiIsInRyYW5zY2VpdmVyIiwiY2FwcyIsImR0bHNSb2xlIiwid3JpdGVSdHBEZXNjcmlwdGlvbiIsImtpbmQiLCJ3cml0ZUljZVBhcmFtZXRlcnMiLCJpY2VHYXRoZXJlciIsImdldExvY2FsUGFyYW1ldGVycyIsIndyaXRlRHRsc1BhcmFtZXRlcnMiLCJkdGxzVHJhbnNwb3J0IiwibWlkIiwicnRwU2VuZGVyIiwicnRwUmVjZWl2ZXIiLCJ0cmFja0lkIiwiX2luaXRpYWxUcmFja0lkIiwidHJhY2siLCJtc2lkIiwic2VuZEVuY29kaW5nUGFyYW1ldGVycyIsInNzcmMiLCJydHgiLCJsb2NhbENOYW1lIiwiZmlsdGVySWNlU2VydmVycyIsImljZVNlcnZlcnMiLCJlZGdlVmVyc2lvbiIsImhhc1R1cm4iLCJmaWx0ZXIiLCJzZXJ2ZXIiLCJ1cmxzIiwiY29uc29sZSIsIndhcm4iLCJpc1N0cmluZyIsInZhbGlkVHVybiIsImluZGV4T2YiLCJnZXRDb21tb25DYXBhYmlsaXRpZXMiLCJsb2NhbENhcGFiaWxpdGllcyIsInJlbW90ZUNhcGFiaWxpdGllcyIsImNvbW1vbkNhcGFiaWxpdGllcyIsImNvZGVjcyIsImhlYWRlckV4dGVuc2lvbnMiLCJmZWNNZWNoYW5pc21zIiwiZmluZENvZGVjQnlQYXlsb2FkVHlwZSIsInB0IiwicGFyc2VJbnQiLCJwYXlsb2FkVHlwZSIsInByZWZlcnJlZFBheWxvYWRUeXBlIiwicnR4Q2FwYWJpbGl0eU1hdGNoZXMiLCJsUnR4IiwiclJ0eCIsImxDb2RlY3MiLCJyQ29kZWNzIiwibENvZGVjIiwicGFyYW1ldGVycyIsImFwdCIsInJDb2RlYyIsIm5hbWUiLCJ0b0xvd2VyQ2FzZSIsImZvckVhY2giLCJjbG9ja1JhdGUiLCJudW1DaGFubmVscyIsIk1hdGgiLCJtaW4iLCJwdXNoIiwicnRjcEZlZWRiYWNrIiwiZmIiLCJqIiwicGFyYW1ldGVyIiwibEhlYWRlckV4dGVuc2lvbiIsInJIZWFkZXJFeHRlbnNpb24iLCJ1cmkiLCJpc0FjdGlvbkFsbG93ZWRJblNpZ25hbGluZ1N0YXRlIiwiYWN0aW9uIiwic2lnbmFsaW5nU3RhdGUiLCJvZmZlciIsImFuc3dlciIsIm1heWJlQWRkQ2FuZGlkYXRlIiwiaWNlVHJhbnNwb3J0IiwiYWxyZWFkeUFkZGVkIiwiZ2V0UmVtb3RlQ2FuZGlkYXRlcyIsImZpbmQiLCJyZW1vdGVDYW5kaWRhdGUiLCJmb3VuZGF0aW9uIiwiaXAiLCJwb3J0IiwicHJpb3JpdHkiLCJwcm90b2NvbCIsImFkZFJlbW90ZUNhbmRpZGF0ZSIsIm1ha2VFcnJvciIsImRlc2NyaXB0aW9uIiwiTm90U3VwcG9ydGVkRXJyb3IiLCJJbnZhbGlkU3RhdGVFcnJvciIsIkludmFsaWRBY2Nlc3NFcnJvciIsIlR5cGVFcnJvciIsInVuZGVmaW5lZCIsIk9wZXJhdGlvbkVycm9yIiwiYWRkVHJhY2tUb1N0cmVhbUFuZEZpcmVFdmVudCIsImFkZFRyYWNrIiwiZGlzcGF0Y2hFdmVudCIsIk1lZGlhU3RyZWFtVHJhY2tFdmVudCIsInJlbW92ZVRyYWNrRnJvbVN0cmVhbUFuZEZpcmVFdmVudCIsInJlbW92ZVRyYWNrIiwiZmlyZUFkZFRyYWNrIiwicGMiLCJyZWNlaXZlciIsInN0cmVhbXMiLCJ0cmFja0V2ZW50IiwiRXZlbnQiLCJzZXRUaW1lb3V0IiwiX2Rpc3BhdGNoRXZlbnQiLCJfZXZlbnRUYXJnZXQiLCJkb2N1bWVudCIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJtZXRob2QiLCJiaW5kIiwiY2FuVHJpY2tsZUljZUNhbmRpZGF0ZXMiLCJuZWVkTmVnb3RpYXRpb24iLCJsb2NhbFN0cmVhbXMiLCJyZW1vdGVTdHJlYW1zIiwiaWNlQ29ubmVjdGlvblN0YXRlIiwiY29ubmVjdGlvblN0YXRlIiwiaWNlR2F0aGVyaW5nU3RhdGUiLCJ1c2luZ0J1bmRsZSIsImJ1bmRsZVBvbGljeSIsInJ0Y3BNdXhQb2xpY3kiLCJpY2VUcmFuc3BvcnRQb2xpY3kiLCJfaWNlR2F0aGVyZXJzIiwiaWNlQ2FuZGlkYXRlUG9vbFNpemUiLCJSVENJY2VHYXRoZXJlciIsImdhdGhlclBvbGljeSIsIl9jb25maWciLCJ0cmFuc2NlaXZlcnMiLCJfc2RwU2Vzc2lvbklkIiwiZ2VuZXJhdGVTZXNzaW9uSWQiLCJfc2RwU2Vzc2lvblZlcnNpb24iLCJfZHRsc1JvbGUiLCJfaXNDbG9zZWQiLCJwcm90b3R5cGUiLCJvbnRyYWNrIiwib25yZW1vdmVzdHJlYW0iLCJvbnNpZ25hbGluZ3N0YXRlY2hhbmdlIiwib25pY2Vjb25uZWN0aW9uc3RhdGVjaGFuZ2UiLCJvbmNvbm5lY3Rpb25zdGF0ZWNoYW5nZSIsIm9uaWNlZ2F0aGVyaW5nc3RhdGVjaGFuZ2UiLCJvbmRhdGFjaGFubmVsIiwiX2VtaXRHYXRoZXJpbmdTdGF0ZUNoYW5nZSIsImdldENvbmZpZ3VyYXRpb24iLCJnZXRMb2NhbFN0cmVhbXMiLCJnZXRSZW1vdGVTdHJlYW1zIiwiX2NyZWF0ZVRyYW5zY2VpdmVyIiwiZG9Ob3RBZGQiLCJoYXNCdW5kbGVUcmFuc3BvcnQiLCJyZWN2RW5jb2RpbmdQYXJhbWV0ZXJzIiwiYXNzb2NpYXRlZFJlbW90ZU1lZGlhU3RyZWFtcyIsIndhbnRSZWNlaXZlIiwidHJhbnNwb3J0cyIsIl9jcmVhdGVJY2VBbmREdGxzVHJhbnNwb3J0cyIsImFscmVhZHlFeGlzdHMiLCJfbWF5YmVGaXJlTmVnb3RpYXRpb25OZWVkZWQiLCJSVENSdHBTZW5kZXIiLCJhZGRTdHJlYW0iLCJnZXRUcmFja3MiLCJjbG9uZWRTdHJlYW0iLCJjbG9uZSIsImlkeCIsImNsb25lZFRyYWNrIiwiYWRkRXZlbnRMaXN0ZW5lciIsImVuYWJsZWQiLCJzZW5kZXIiLCJzdG9wIiwibWFwIiwic3BsaWNlIiwicmVtb3ZlU3RyZWFtIiwiZ2V0U2VuZGVycyIsImdldFJlY2VpdmVycyIsIl9jcmVhdGVJY2VHYXRoZXJlciIsInNkcE1MaW5lSW5kZXgiLCJzaGlmdCIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJ3cml0YWJsZSIsImJ1ZmZlcmVkQ2FuZGlkYXRlRXZlbnRzIiwiYnVmZmVyQ2FuZGlkYXRlcyIsImVuZCIsImtleXMiLCJzdGF0ZSIsIl9nYXRoZXIiLCJvbmxvY2FsY2FuZGlkYXRlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImV2dCIsInNkcE1pZCIsImNhbmQiLCJjb21wb25lbnQiLCJ1ZnJhZyIsInVzZXJuYW1lRnJhZ21lbnQiLCJzZXJpYWxpemVkQ2FuZGlkYXRlIiwid3JpdGVDYW5kaWRhdGUiLCJwYXJzZUNhbmRpZGF0ZSIsInRvSlNPTiIsInNlY3Rpb25zIiwiZ2V0TWVkaWFTZWN0aW9ucyIsImdldERlc2NyaXB0aW9uIiwiam9pbiIsImNvbXBsZXRlIiwiZXZlcnkiLCJSVENJY2VUcmFuc3BvcnQiLCJvbmljZXN0YXRlY2hhbmdlIiwiX3VwZGF0ZUljZUNvbm5lY3Rpb25TdGF0ZSIsIl91cGRhdGVDb25uZWN0aW9uU3RhdGUiLCJSVENEdGxzVHJhbnNwb3J0Iiwib25kdGxzc3RhdGVjaGFuZ2UiLCJfZGlzcG9zZUljZUFuZER0bHNUcmFuc3BvcnRzIiwiX3RyYW5zY2VpdmUiLCJyZWN2IiwicGFyYW1zIiwiZW5jb2RpbmdzIiwicnRjcCIsImNuYW1lIiwiY29tcG91bmQiLCJydGNwUGFyYW1ldGVycyIsInAiLCJyZWNlaXZlIiwic2Vzc2lvbnBhcnQiLCJzcGxpdFNlY3Rpb25zIiwibWVkaWFTZWN0aW9uIiwicGFyc2VSdHBQYXJhbWV0ZXJzIiwiaXNJY2VMaXRlIiwibWF0Y2hQcmVmaXgiLCJyZWplY3RlZCIsImlzUmVqZWN0ZWQiLCJyZW1vdGVJY2VQYXJhbWV0ZXJzIiwiZ2V0SWNlUGFyYW1ldGVycyIsInJlbW90ZUR0bHNQYXJhbWV0ZXJzIiwiZ2V0RHRsc1BhcmFtZXRlcnMiLCJyb2xlIiwic3RhcnQiLCJfdXBkYXRlU2lnbmFsaW5nU3RhdGUiLCJyZWNlaXZlckxpc3QiLCJpY2VPcHRpb25zIiwic3Vic3RyIiwic3BsaXQiLCJsaW5lcyIsInNwbGl0TGluZXMiLCJnZXRLaW5kIiwiZGlyZWN0aW9uIiwiZ2V0RGlyZWN0aW9uIiwicmVtb3RlTXNpZCIsInBhcnNlTXNpZCIsImdldE1pZCIsImdlbmVyYXRlSWRlbnRpZmllciIsInBhcnNlUnRwRW5jb2RpbmdQYXJhbWV0ZXJzIiwicGFyc2VSdGNwUGFyYW1ldGVycyIsImlzQ29tcGxldGUiLCJjYW5kcyIsInNldFRyYW5zcG9ydCIsInNldFJlbW90ZUNhbmRpZGF0ZXMiLCJSVENSdHBSZWNlaXZlciIsImdldENhcGFiaWxpdGllcyIsImNvZGVjIiwiaXNOZXdUcmFjayIsIk1lZGlhU3RyZWFtIiwiZ2V0IiwiZGVmYXVsdCIsIm5hdGl2ZVRyYWNrIiwic2lkIiwiaXRlbSIsIm5ld1N0YXRlIiwic3RhdGVzIiwiY2xvc2VkIiwiY2hlY2tpbmciLCJjb25uZWN0ZWQiLCJjb21wbGV0ZWQiLCJkaXNjb25uZWN0ZWQiLCJmYWlsZWQiLCJuZXciLCJjb25uZWN0aW5nIiwibnVtQXVkaW9UcmFja3MiLCJudW1WaWRlb1RyYWNrcyIsIm9mZmVyT3B0aW9ucyIsImFyZ3VtZW50cyIsIm1hbmRhdG9yeSIsIm9wdGlvbmFsIiwib2ZmZXJUb1JlY2VpdmVBdWRpbyIsIm9mZmVyVG9SZWNlaXZlVmlkZW8iLCJ3cml0ZVNlc3Npb25Cb2lsZXJwbGF0ZSIsInJlbW90ZUNvZGVjIiwiaGRyRXh0IiwicmVtb3RlRXh0ZW5zaW9ucyIsInJIZHJFeHQiLCJnZXRMb2NhbENhbmRpZGF0ZXMiLCJtZWRpYVNlY3Rpb25zSW5PZmZlciIsImxvY2FsVHJhY2siLCJnZXRBdWRpb1RyYWNrcyIsImdldFZpZGVvVHJhY2tzIiwiaGFzUnR4IiwiYyIsInJlZHVjZWRTaXplIiwiY2FuZGlkYXRlU3RyaW5nIiwidHJpbSIsImdldFN0YXRzIiwicHJvbWlzZXMiLCJmaXhTdGF0c1R5cGUiLCJzdGF0IiwiaW5ib3VuZHJ0cCIsIm91dGJvdW5kcnRwIiwiY2FuZGlkYXRlcGFpciIsImxvY2FsY2FuZGlkYXRlIiwicmVtb3RlY2FuZGlkYXRlIiwicmVzdWx0cyIsIk1hcCIsImFsbCIsInJlcyIsInJlc3VsdCIsInNldCIsIm1ldGhvZHMiLCJuYXRpdmVNZXRob2QiLCJhcmdzIiwiYXBwbHkiLCJyYW5kb20iLCJ0b1N0cmluZyIsImJsb2IiLCJsaW5lIiwicGFydHMiLCJwYXJ0IiwiaW5kZXgiLCJwcmVmaXgiLCJzdWJzdHJpbmciLCJyZWxhdGVkQWRkcmVzcyIsInJlbGF0ZWRQb3J0IiwidGNwVHlwZSIsInRvVXBwZXJDYXNlIiwicGFyc2VJY2VPcHRpb25zIiwicGFyc2VSdHBNYXAiLCJwYXJzZWQiLCJ3cml0ZVJ0cE1hcCIsInBhcnNlRXh0bWFwIiwid3JpdGVFeHRtYXAiLCJoZWFkZXJFeHRlbnNpb24iLCJwcmVmZXJyZWRJZCIsInBhcnNlRm10cCIsImt2Iiwid3JpdGVGbXRwIiwicGFyYW0iLCJwYXJzZVJ0Y3BGYiIsIndyaXRlUnRjcEZiIiwicGFyc2VTc3JjTWVkaWEiLCJzcCIsImNvbG9uIiwiYXR0cmlidXRlIiwicGFyc2VGaW5nZXJwcmludCIsImFsZ29yaXRobSIsImZpbmdlcnByaW50cyIsInNldHVwVHlwZSIsImZwIiwiY29uY2F0IiwiaWNlUGFyYW1ldGVycyIsInBhc3N3b3JkIiwibWxpbmUiLCJydHBtYXBsaW5lIiwiZm10cHMiLCJtYXhwdGltZSIsImV4dGVuc2lvbiIsImVuY29kaW5nUGFyYW1ldGVycyIsImhhc1JlZCIsImhhc1VscGZlYyIsInNzcmNzIiwicHJpbWFyeVNzcmMiLCJzZWNvbmRhcnlTc3JjIiwiZmxvd3MiLCJlbmNQYXJhbSIsImNvZGVjUGF5bG9hZFR5cGUiLCJmZWMiLCJtZWNoYW5pc20iLCJiYW5kd2lkdGgiLCJtYXhCaXRyYXRlIiwicmVtb3RlU3NyYyIsIm9iaiIsInJzaXplIiwibXV4Iiwic3BlYyIsInBsYW5CIiwic2Vzc0lkIiwic2Vzc1ZlciIsInNlc3Npb25JZCIsInZlcnNpb24iLCJwYXJzZU1MaW5lIiwiZm10Iiwic2xpY2UiLCJwYXJzZU9MaW5lIiwidXNlcm5hbWUiLCJzZXNzaW9uVmVyc2lvbiIsIm5ldFR5cGUiLCJhZGRyZXNzVHlwZSIsImFkZHJlc3MiLCJnbG9iYWwiLCJhZGFwdGVyRmFjdG9yeSIsInNlbGYiLCJ1dGlscyIsImRlcGVuZGVuY2llcyIsIm9wdHMiLCJvcHRpb25zIiwic2hpbUNocm9tZSIsInNoaW1GaXJlZm94Iiwic2hpbUVkZ2UiLCJzaGltU2FmYXJpIiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJsb2dnaW5nIiwiYnJvd3NlckRldGFpbHMiLCJkZXRlY3RCcm93c2VyIiwiY2hyb21lU2hpbSIsImVkZ2VTaGltIiwiZmlyZWZveFNoaW0iLCJzYWZhcmlTaGltIiwiY29tbW9uU2hpbSIsImFkYXB0ZXIiLCJleHRyYWN0VmVyc2lvbiIsImRpc2FibGVMb2ciLCJkaXNhYmxlV2FybmluZ3MiLCJicm93c2VyIiwic2hpbVBlZXJDb25uZWN0aW9uIiwiYnJvd3NlclNoaW0iLCJzaGltQ3JlYXRlT2JqZWN0VVJMIiwic2hpbUdldFVzZXJNZWRpYSIsInNoaW1NZWRpYVN0cmVhbSIsInNoaW1Tb3VyY2VPYmplY3QiLCJzaGltT25UcmFjayIsInNoaW1BZGRUcmFja1JlbW92ZVRyYWNrIiwic2hpbUdldFNlbmRlcnNXaXRoRHRtZiIsInNoaW1SVENJY2VDYW5kaWRhdGUiLCJzaGltTWF4TWVzc2FnZVNpemUiLCJzaGltU2VuZFRocm93VHlwZUVycm9yIiwic2hpbVJlbW92ZVN0cmVhbSIsInNoaW1SZXBsYWNlVHJhY2siLCJzaGltUlRDSWNlU2VydmVyVXJscyIsInNoaW1DYWxsYmFja3NBUEkiLCJzaGltTG9jYWxTdHJlYW1zQVBJIiwic2hpbVJlbW90ZVN0cmVhbXNBUEkiLCJzaGltVHJhY2tFdmVudFRyYW5zY2VpdmVyIiwic2hpbUNyZWF0ZU9mZmVyTGVnYWN5Iiwid2Via2l0TWVkaWFTdHJlYW0iLCJfb250cmFjayIsIm9yaWdTZXRSZW1vdGVEZXNjcmlwdGlvbiIsIl9vbnRyYWNrcG9seSIsInRlIiwid3JhcFBlZXJDb25uZWN0aW9uRXZlbnQiLCJzaGltU2VuZGVyV2l0aER0bWYiLCJkdG1mIiwiX2R0bWYiLCJjcmVhdGVEVE1GU2VuZGVyIiwiX3BjIiwiX3NlbmRlcnMiLCJvcmlnQWRkVHJhY2siLCJvcmlnUmVtb3ZlVHJhY2siLCJvcmlnQWRkU3RyZWFtIiwib3JpZ1JlbW92ZVN0cmVhbSIsIm9yaWdHZXRTZW5kZXJzIiwic2VuZGVycyIsIlVSTCIsIkhUTUxNZWRpYUVsZW1lbnQiLCJfc3JjT2JqZWN0Iiwic3JjIiwicmV2b2tlT2JqZWN0VVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwic2hpbUFkZFRyYWNrUmVtb3ZlVHJhY2tXaXRoTmF0aXZlIiwiX3NoaW1tZWRMb2NhbFN0cmVhbXMiLCJzdHJlYW1JZCIsIkRPTUV4Y2VwdGlvbiIsImV4aXN0aW5nU2VuZGVycyIsIm5ld1NlbmRlcnMiLCJuZXdTZW5kZXIiLCJvcmlnR2V0TG9jYWxTdHJlYW1zIiwibmF0aXZlU3RyZWFtcyIsIl9yZXZlcnNlU3RyZWFtcyIsIl9zdHJlYW1zIiwibmV3U3RyZWFtIiwib2xkU3RyZWFtIiwicmVwbGFjZUludGVybmFsU3RyZWFtSWQiLCJpbnRlcm5hbElkIiwiZXh0ZXJuYWxTdHJlYW0iLCJpbnRlcm5hbFN0cmVhbSIsInJlcGxhY2UiLCJSZWdFeHAiLCJyZXBsYWNlRXh0ZXJuYWxTdHJlYW1JZCIsImlzTGVnYWN5Q2FsbCIsIm9yaWdTZXRMb2NhbERlc2NyaXB0aW9uIiwib3JpZ0xvY2FsRGVzY3JpcHRpb24iLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJpc0xvY2FsIiwic3RyZWFtaWQiLCJoYXNUcmFjayIsIndlYmtpdFJUQ1BlZXJDb25uZWN0aW9uIiwicGNDb25maWciLCJwY0NvbnN0cmFpbnRzIiwiaWNlVHJhbnNwb3J0cyIsImdlbmVyYXRlQ2VydGlmaWNhdGUiLCJPcmlnUGVlckNvbm5lY3Rpb24iLCJuZXdJY2VTZXJ2ZXJzIiwiZGVwcmVjYXRlZCIsIm9yaWdHZXRTdGF0cyIsInNlbGVjdG9yIiwic3VjY2Vzc0NhbGxiYWNrIiwiZml4Q2hyb21lU3RhdHNfIiwicmVzcG9uc2UiLCJzdGFuZGFyZFJlcG9ydCIsInJlcG9ydHMiLCJyZXBvcnQiLCJzdGFuZGFyZFN0YXRzIiwidGltZXN0YW1wIiwibmFtZXMiLCJtYWtlTWFwU3RhdHMiLCJzdGF0cyIsInN1Y2Nlc3NDYWxsYmFja1dyYXBwZXJfIiwicHJvbWlzZSIsIm5hdGl2ZUFkZEljZUNhbmRpZGF0ZSIsIm5hdmlnYXRvciIsImNvbnN0cmFpbnRzVG9DaHJvbWVfIiwiY2MiLCJpZGVhbCIsImV4YWN0IiwibWF4Iiwib2xkbmFtZV8iLCJjaGFyQXQiLCJvYyIsIm1peCIsImFkdmFuY2VkIiwic2hpbUNvbnN0cmFpbnRzXyIsImNvbnN0cmFpbnRzIiwiZnVuYyIsImF1ZGlvIiwicmVtYXAiLCJiIiwidmlkZW8iLCJmYWNlIiwiZmFjaW5nTW9kZSIsImdldFN1cHBvcnRlZEZhY2luZ01vZGVMaWVzIiwibWVkaWFEZXZpY2VzIiwiZ2V0U3VwcG9ydGVkQ29uc3RyYWludHMiLCJtYXRjaGVzIiwiZW51bWVyYXRlRGV2aWNlcyIsImRldmljZXMiLCJkIiwiZGV2Iiwic29tZSIsIm1hdGNoIiwibGFiZWwiLCJkZXZpY2VJZCIsInNoaW1FcnJvcl8iLCJQZXJtaXNzaW9uRGVuaWVkRXJyb3IiLCJQZXJtaXNzaW9uRGlzbWlzc2VkRXJyb3IiLCJEZXZpY2VzTm90Rm91bmRFcnJvciIsIkNvbnN0cmFpbnROb3RTYXRpc2ZpZWRFcnJvciIsIlRyYWNrU3RhcnRFcnJvciIsIk1lZGlhRGV2aWNlRmFpbGVkRHVlVG9TaHV0ZG93biIsIk1lZGlhRGV2aWNlS2lsbFN3aXRjaE9uIiwiVGFiQ2FwdHVyZUVycm9yIiwiU2NyZWVuQ2FwdHVyZUVycm9yIiwiRGV2aWNlQ2FwdHVyZUVycm9yIiwiY29uc3RyYWludCIsImNvbnN0cmFpbnROYW1lIiwiZ2V0VXNlck1lZGlhXyIsIm9uU3VjY2VzcyIsIm9uRXJyb3IiLCJ3ZWJraXRHZXRVc2VyTWVkaWEiLCJnZXRVc2VyTWVkaWEiLCJnZXRVc2VyTWVkaWFQcm9taXNlXyIsImtpbmRzIiwiTWVkaWFTdHJlYW1UcmFjayIsImdldFNvdXJjZXMiLCJkZXZpY2UiLCJncm91cElkIiwiZWNob0NhbmNlbGxhdGlvbiIsImZyYW1lUmF0ZSIsImhlaWdodCIsIndpZHRoIiwib3JpZ0dldFVzZXJNZWRpYSIsImNzIiwiTmF0aXZlUlRDSWNlQ2FuZGlkYXRlIiwibmF0aXZlQ2FuZGlkYXRlIiwicGFyc2VkQ2FuZGlkYXRlIiwiYXVnbWVudGVkQ2FuZGlkYXRlIiwibmF0aXZlQ3JlYXRlT2JqZWN0VVJMIiwibmF0aXZlUmV2b2tlT2JqZWN0VVJMIiwibmV3SWQiLCJkZWxldGUiLCJkc2MiLCJuYXRpdmVTZXRBdHRyaWJ1dGUiLCJzZXRBdHRyaWJ1dGUiLCJSVENTY3RwVHJhbnNwb3J0IiwiX3NjdHAiLCJzY3RwSW5EZXNjcmlwdGlvbiIsIm1MaW5lIiwiZ2V0UmVtb3RlRmlyZWZveFZlcnNpb24iLCJnZXRDYW5TZW5kTWF4TWVzc2FnZVNpemUiLCJyZW1vdGVJc0ZpcmVmb3giLCJjYW5TZW5kTWF4TWVzc2FnZVNpemUiLCJnZXRNYXhNZXNzYWdlU2l6ZSIsIm1heE1lc3NhZ2VTaXplIiwiaXNGaXJlZm94IiwiY2FuU2VuZE1NUyIsInJlbW90ZU1NUyIsIk51bWJlciIsIlBPU0lUSVZFX0lORklOSVRZIiwic2N0cCIsIm9yaWdDcmVhdGVEYXRhQ2hhbm5lbCIsImNyZWF0ZURhdGFDaGFubmVsIiwiZGF0YUNoYW5uZWwiLCJvcmlnRGF0YUNoYW5uZWxTZW5kIiwiZGMiLCJzaXplIiwiYnl0ZUxlbmd0aCIsInNoaW1SVENQZWVyQ29ubmVjdGlvbiIsIm9yaWdNU1RFbmFibGVkIiwiZXYiLCJSVENEdG1mU2VuZGVyIiwiUlRDRFRNRlNlbmRlciIsInJlcGxhY2VUcmFjayIsInNldFRyYWNrIiwiUlRDVHJhY2tFdmVudCIsIm1velNyY09iamVjdCIsIm1velJUQ1BlZXJDb25uZWN0aW9uIiwibmV3U2VydmVyIiwiY3JlZGVudGlhbCIsIm1velJUQ1Nlc3Npb25EZXNjcmlwdGlvbiIsIm1velJUQ0ljZUNhbmRpZGF0ZSIsIm1vZGVyblN0YXRzVHlwZXMiLCJuYXRpdmVHZXRTdGF0cyIsIm9uU3VjYyIsIm9uRXJyIiwiSW50ZXJuYWxFcnJvciIsIlNlY3VyaXR5RXJyb3IiLCJjb25zdHJhaW50c1RvRkYzN18iLCJtb3pHZXRVc2VyTWVkaWEiLCJpbmZvcyIsIm9yZ0VudW1lcmF0ZURldmljZXMiLCJuYXRpdmVHZXRVc2VyTWVkaWEiLCJnZXRTZXR0aW5ncyIsIm5hdGl2ZUdldFNldHRpbmdzIiwiYXBwbHlDb25zdHJhaW50cyIsIm5hdGl2ZUFwcGx5Q29uc3RyYWludHMiLCJfbG9jYWxTdHJlYW1zIiwiZ2V0U3RyZWFtQnlJZCIsIl9yZW1vdGVTdHJlYW1zIiwiX2FkZFRyYWNrIiwidHJhY2tzIiwiX29uYWRkc3RyZWFtIiwiX29uYWRkc3RyZWFtcG9seSIsImZhaWx1cmVDYWxsYmFjayIsIndpdGhDYWxsYmFjayIsImNiIiwiZXJyY2IiLCJSVENUcmFuc2NlaXZlciIsIm9yaWdDcmVhdGVPZmZlciIsImF1ZGlvVHJhbnNjZWl2ZXIiLCJnZXRUcmFuc2NlaXZlcnMiLCJzZXREaXJlY3Rpb24iLCJhZGRUcmFuc2NlaXZlciIsInZpZGVvVHJhbnNjZWl2ZXIiLCJsb2dEaXNhYmxlZF8iLCJkZXByZWNhdGlvbldhcm5pbmdzXyIsInVhc3RyaW5nIiwiZXhwciIsInBvcyIsImV2ZW50TmFtZVRvV3JhcCIsIndyYXBwZXIiLCJwcm90byIsIm5hdGl2ZUFkZEV2ZW50TGlzdGVuZXIiLCJuYXRpdmVFdmVudE5hbWUiLCJ3cmFwcGVkQ2FsbGJhY2siLCJfZXZlbnRNYXAiLCJuYXRpdmVSZW1vdmVFdmVudExpc3RlbmVyIiwidW53cmFwcGVkQ2IiLCJib29sIiwib2xkTWV0aG9kIiwibmV3TWV0aG9kIiwidXNlckFnZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7O0FBTkE7OztBQWFBLElBQU1BLGNBQWMsU0FBZEEsV0FBYyxDQUFTQyxPQUFULEVBQWtCQyxZQUFsQixFQUErQjtBQUMvQyxRQUFJQyxNQUFNLEVBQVY7QUFDQSxRQUFJQyxPQUFPLEVBQVg7QUFDQSxRQUFJQyxhQUFhLEVBQWpCO0FBQ0EsUUFBSUMsZ0JBQWdCLEVBQXBCOztBQUVBLFFBQUk7QUFDQUgsY0FBTSxJQUFJSSxHQUFKLENBQVEsRUFBQ0MsT0FBTyxLQUFSLEVBQVIsQ0FBTjtBQUNBTCxZQUFJTSxXQUFKLENBQWdCUixPQUFoQjs7QUFFQSxZQUFNUyxlQUFlLFNBQWZBLFlBQWUsQ0FBQ0Ms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ZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gNy4uXG4gKi9cbmltcG9ydCBDb3JlUHJvdmlkZXIgZnJvbSBcImFwaS9wcm92aWRlci9Db3JlXCI7XG5pbXBvcnQge1BST1ZJREVSX0hMU30gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcblxuLyoqXG4gKiBAYnJpZWYgICBobHNqcyBwcm92aWRlciBleHRlbmRlZCBjb3JlLlxuICogQHBhcmFtICAgZWxlbWVudCB2aWRlbyBlbGVtZW50LlxuICogQHBhcmFtICAgcGxheWVyQ29uZmlnICAgIGNvbmZpZy5cbiAqICovXG5cblxuY29uc3QgSGxzUHJvdmlkZXIgPSBmdW5jdGlvbihlbGVtZW50LCBwbGF5ZXJDb25maWcpe1xuICAgIGxldCBobHMgPSBcIlwiO1xuICAgIGxldCB0aGF0ID0ge307XG4gICAgbGV0IHN1cGVyX3BsYXkgPSBcIlwiO1xuICAgIGxldCBzdXBlcl9kZXN0cm95ID0gXCJcIjtcblxuICAgIHRyeSB7XG4gICAgICAgIGhscyA9IG5ldyBIbHMoe2RlYnVnOiBmYWxzZX0pO1xuICAgICAgICBobHMuYXR0YWNoTWVkaWEoZWxlbWVudCk7XG5cbiAgICAgICAgY29uc3Qgc291cmNlTG9hZGVkID0gKHNvdXJjZSwgbGFzdFBsYXlQb3NpdGlvbikgPT4ge1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiSExTIDogc291cmNlIGxvYWRlZCA6IFwiLCBzb3VyY2UsIFwibGFzdFBsYXlQb3NpdGlvbiA6IFwiKyBsYXN0UGxheVBvc2l0aW9uKTtcbiAgICAgICAgICAgIGhscy5sb2FkU291cmNlKHNvdXJjZS5maWxlKTtcbiAgICAgICAgICAgIGlmKGxhc3RQbGF5UG9zaXRpb24gPiAwKXtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnNlZWsobGFzdFBsYXlQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgc3VwZXJfcGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoYXQgPSBDb3JlUHJvdmlkZXIoUFJPVklERVJfSExTLCBlbGVtZW50LCBwbGF5ZXJDb25maWcsIHNvdXJjZUxvYWRlZCk7XG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkhMUyBQUk9WSURFUiBMT0FERUQuXCIpO1xuICAgICAgICBzdXBlcl9wbGF5ID0gdGhhdC5zdXBlcigncGxheScpO1xuICAgICAgICBzdXBlcl9kZXN0cm95ID0gdGhhdC5zdXBlcignZGVzdHJveScpO1xuXG4gICAgICAgIHRoYXQuZGVzdHJveSA9ICgpID0+e1xuICAgICAgICAgICAgaGxzLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIGhscyA9IG51bGw7XG5cbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkhMUyA6IFBST1ZJREVSIERFU1RST1VZRUQuXCIpO1xuXG4gICAgICAgICAgICBzdXBlcl9kZXN0cm95KCk7XG4gICAgICAgIH07XG4gICAgfWNhdGNoKGVycm9yKXtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhhdDtcbn07XG5cblxuZXhwb3J0IGRlZmF1bHQgSGxzUHJvdmlkZXI7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gMTEuLlxuICovXG5pbXBvcnQgQ29yZVByb3ZpZGVyIGZyb20gXCJhcGkvcHJvdmlkZXIvQ29yZVwiO1xuaW1wb3J0IHtpc1dlYlJUQ30gZnJvbSBcInV0aWxzL3ZhbGlkYXRvclwiO1xuaW1wb3J0IFdlYlJUQ0xvYWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL3dlYnJ0Yy9XZWJSVENMb2FkZXJcIjtcbmltcG9ydCB7UFJPVklERVJfV0VCUlRDLCBFUlJPUiwgU1RBVEVfRVJST1J9IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5pbXBvcnQgUHJvbWlzZSwge3Jlc29sdmVkfSBmcm9tIFwiYXBpL3NoaW1zL3Byb21pc2VcIjtcblxuLyoqXG4gKiBAYnJpZWYgICB3ZWJydGMgcHJvdmlkZXIgZXh0ZW5kZWQgY29yZS5cbiAqIEBwYXJhbSAgIGVsZW1lbnQgdmlkZW8gZWxlbWVudC5cbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXG4gKiAqL1xuXG5jb25zdCBXZWJSVEMgPSBmdW5jdGlvbihlbGVtZW50LCBwbGF5ZXJDb25maWcpe1xuICAgIGxldCB3ZWJydGNMb2FkZXIgPSBudWxsO1xuICAgIGxldCB0aGF0ID0ge30sIHN1cGVyX2Rlc3Ryb3kgID0gXCJcIiwgbGlzdGVuZXIgPSBcIlwiO1xuXG4gICAgbGV0IGVycm9ySGFuZGxlciA9IGZ1bmN0aW9uKGVycm9yKXtcbiAgICAgICAgdGhhdC5zZXRTdGF0ZShTVEFURV9FUlJPUik7XG4gICAgICAgIHRoYXQucGF1c2UoKTtcbiAgICAgICAgdGhhdC50cmlnZ2VyKEVSUk9SLCBlcnJvciApO1xuICAgIH07XG4gICAgY29uc3Qgc291cmNlTG9hZGVkID0gKHNvdXJjZSkgPT4ge1xuICAgICAgICBpZihpc1dlYlJUQyhzb3VyY2UuZmlsZSwgc291cmNlLnR5cGUpKXtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldFQlJUQyA6IHNvdXJjZSBsb2FkZWQgOiBcIiwgc291cmNlKTtcbiAgICAgICAgICAgIGlmKHdlYnJ0Y0xvYWRlcil7XG4gICAgICAgICAgICAgICAgd2VicnRjTG9hZGVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB3ZWJydGNMb2FkZXIgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2VicnRjTG9hZGVyID0gV2ViUlRDTG9hZGVyKHNvdXJjZS5maWxlLCBlcnJvckhhbmRsZXIpO1xuICAgICAgICAgICAgd2VicnRjTG9hZGVyLmNvbm5lY3QoKS50aGVuKGZ1bmN0aW9uKHN0cmVhbSl7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zcmNPYmplY3QgPSBzdHJlYW07XG4gICAgICAgICAgICAgICAgZWxlbWVudC5wbGF5KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGF0ID0gQ29yZVByb3ZpZGVyKFBST1ZJREVSX1dFQlJUQywgZWxlbWVudCwgcGxheWVyQ29uZmlnLCBzb3VyY2VMb2FkZWQpO1xuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldFQlJUQyBQUk9WSURFUiBMT0FERUQuXCIpO1xuICAgIHN1cGVyX2Rlc3Ryb3kgPSB0aGF0LnN1cGVyKCdkZXN0cm95Jyk7XG5cblxuXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XG5cbiAgICAgICAgaWYod2VicnRjTG9hZGVyKXtcbiAgICAgICAgICAgIHdlYnJ0Y0xvYWRlci5kZXN0cm95KCk7XG4gICAgICAgICAgICB3ZWJydGNMb2FkZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgc3VwZXJfZGVzdHJveSgpO1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJXRUJSVEMgOiAgUFJPVklERVIgREVTVFJPWUVELlwiKTtcblxuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IFdlYlJUQzsiLCJpbXBvcnQgYWRhcHRlciBmcm9tICd1dGlscy9hZGFwdGVyJztcbmltcG9ydCBQcm9taXNlLCB7cmVzb2x2ZWR9IGZyb20gXCJhcGkvc2hpbXMvcHJvbWlzZVwiO1xuXG5pbXBvcnQge1xuICAgIFBMQVlFUl9XRUJSVENfV1NfRVJST1IsXG4gICAgUExBWUVSX1dFQlJUQ19XU19DTE9TRUQsXG4gICAgUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SLFxuICAgIFBMQVlFUl9XRUJSVENfU0VUX1JFTU9URV9ERVNDX0VSUk9SLFxuICAgIFBMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUixcbiAgICBQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XG5cbmNvbnN0IFdlYlJUQ0xvYWRlciA9IGZ1bmN0aW9uKHVybCwgZXJyb3JDYWxsYmFjayl7XG4gICAgdmFyIHVybCA9IHVybDtcbiAgICBsZXQgd3MgPSBcIlwiO1xuICAgIGxldCBwZWVyQ29ubmVjdGlvbiA9IFwiXCI7XG4gICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgICAnaWNlU2VydmVycyc6IFt7XG4gICAgICAgICAgICAndXJscyc6ICdzdHVuOnN0dW4ubC5nb29nbGUuY29tOjE5MzAyJ1xuICAgICAgICB9XVxuICAgIH07XG4gICAgY29uc3QgdGhhdCA9IHt9O1xuICAgIGxldCBteVNkcCA9IFwiXCI7XG5cblxuICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGV4aXN0aW5nSGFuZGxlciA9IHdpbmRvdy5vbmJlZm9yZXVubG9hZDtcbiAgICAgICAgd2luZG93Lm9uYmVmb3JldW5sb2FkID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChleGlzdGluZ0hhbmRsZXIpe1xuICAgICAgICAgICAgICAgIGV4aXN0aW5nSGFuZGxlcihldmVudCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVGhpcyBjYWxscyBhdXRvIHdoZW4gYnJvd3NlciBjbG9zZWQuXCIpO1xuICAgICAgICAgICAgY2xvc2VQZWVyKCk7XG4gICAgICAgIH1cbiAgICB9KSgpO1xuXG5cbiAgICBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJXZWJSVENMb2FkZXIgY29ubmVjdGluZy4uLlwiKTtcblxuICAgICAgICBjb25zdCBvbkxvY2FsRGVzY3JpcHRpb24gPSBmdW5jdGlvbihpZCwgY29ubmVjdGlvbiwgZGVzYykge1xuICAgICAgICAgICAgY29ubmVjdGlvbi5zZXRMb2NhbERlc2NyaXB0aW9uKGRlc2MpLnRoZW4oZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgLy8gbXkgU0RQIGNyZWF0ZWQuXG4gICAgICAgICAgICAgICAgdmFyIGxvY2FsU0RQID0gY29ubmVjdGlvbi5sb2NhbERlc2NyaXB0aW9uO1xuICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZygnTG9jYWwgU0RQJywgbG9jYWxTRFApO1xuICAgICAgICAgICAgICAgIG15U2RwID0gbG9jYWxTRFA7ICAgLy90ZXN0IGNvZGVcbiAgICAgICAgICAgICAgICAvLyBteSBzZHAgc2VuZCB0byBzZXJ2ZXIuXG4gICAgICAgICAgICAgICAgd3Muc2VuZChKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZCA6IFwiYW5zd2VyXCIsXG4gICAgICAgICAgICAgICAgICAgIHNkcDogbG9jYWxTRFBcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcil7XG4gICAgICAgICAgICAgICAgY2xvc2VQZWVyKHtjb2RlIDogUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUiwgcmVhc29uIDogXCJzZXRMb2NhbERlc2NyaXB0aW9uIGVycm9yIG9jY3VycmVkXCIsIG1lc3NhZ2UgOiBcInNldExvY2FsRGVzY3JpcHRpb24gZXJyb3Igb2NjdXJyZWRcIiwgZXJyb3IgOiBlcnJvcn0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJXZWJSVENMb2FkZXIgdXJsIDogXCIgKyB1cmwpO1xuICAgICAgICAgICAgd3MgPSBuZXcgV2ViU29ja2V0KHVybCk7XG4gICAgICAgICAgICB3cy5vbm9wZW4gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB3cy5zZW5kKEpTT04uc3RyaW5naWZ5KHtjb21tYW5kIDogXCJyZXF1ZXN0X29mZmVyXCJ9KSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd3Mub25tZXNzYWdlID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBKU09OLnBhcnNlKGUuZGF0YSk7XG4gICAgICAgICAgICAgICAgaWYobWVzc2FnZS5lcnJvcil7XG4gICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhtZXNzYWdlLmVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihtZXNzYWdlLmxpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKCdMaXN0IHJlY2VpdmVkJyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZighbWVzc2FnZS5pZCkge1xuICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coJ0lEIG11c3QgYmUgbm90IG51bGwnKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKCFwZWVyQ29ubmVjdGlvbil7XG4gICAgICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uID0gbmV3IFJUQ1BlZXJDb25uZWN0aW9uKGNvbmZpZyk7XG5cbiAgICAgICAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24ub25pY2VjYW5kaWRhdGUgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihlLmNhbmRpZGF0ZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiV2ViUlRDTG9hZGVyIHNlbmQgY2FuZGlkYXRlIHRvIHNlcnZlciA6IFwiICsgZS5jYW5kaWRhdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdzLnNlbmQoSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogbWVzc2FnZS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZCA6IFwiY2FuZGlkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbmRpZGF0ZXM6IFtlLmNhbmRpZGF0ZV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24ub25uZWdvdGlhdGlvbm5lZWRlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24uY3JlYXRlT2ZmZXIoKS50aGVuKGZ1bmN0aW9uKGRlc2MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJjcmVhdGVPZmZlciA6IHN1Y2Nlc3NcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkxvY2FsRGVzY3JpcHRpb24obWVzc2FnZS5pZCwgcGVlckNvbm5lY3Rpb24sIGRlc2MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZVBlZXIoe2NvZGUgOiBQTEFZRVJfV0VCUlRDX0NSRUFURV9BTlNXRVJfRVJST1IsIHJlYXNvbiA6IFwiY3JlYXRlT2ZmZXIgZXJyb3Igb2NjdXJyZWRcIiwgbWVzc2FnZSA6IFwiY3JlYXRlT2ZmZXIgZXJyb3Igb2NjdXJyZWRcIiwgZXJyb3IgOiBlcnJvcn0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24ub25hZGRzdHJlYW0gPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJzdHJlYW0gcmVjZWl2ZWQuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3RyZWFtIHJlY2VpdmVkLlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShlLnN0cmVhbSk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYobWVzc2FnZS5zZHApIHtcbiAgICAgICAgICAgICAgICAgICAgLy9TZXQgcmVtb3RlIGRlc2NyaXB0aW9uIHdoZW4gSSByZWNlaXZlZCBzZHAgZnJvbSBzZXJ2ZXIuXG4gICAgICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uLnNldFJlbW90ZURlc2NyaXB0aW9uKG5ldyBSVENTZXNzaW9uRGVzY3JpcHRpb24obWVzc2FnZS5zZHApKS50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihwZWVyQ29ubmVjdGlvbi5yZW1vdGVEZXNjcmlwdGlvbi50eXBlID09PSAnb2ZmZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyBjcmVhdGVzIGFuc3dlciB3aGVuIEkgcmVjZWl2ZWQgb2ZmZXIgZnJvbSBwdWJsaXNoZXIuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24uY3JlYXRlQW5zd2VyKCkudGhlbihmdW5jdGlvbihkZXNjKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiY3JlYXRlQW5zd2VyIDogc3VjY2Vzc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Mb2NhbERlc2NyaXB0aW9uKG1lc3NhZ2UuaWQsIHBlZXJDb25uZWN0aW9uLCBkZXNjKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcih7Y29kZSA6IFBMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUiwgcmVhc29uIDogXCJjcmVhdGVBbnN3ZXIgZXJyb3Igb2NjdXJyZWRcIiwgbWVzc2FnZSA6IFwiY3JlYXRlQW5zd2VyIGVycm9yIG9jY3VycmVkXCIsIGVycm9yIDogZXJyb3J9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHtjb2RlIDogUExBWUVSX1dFQlJUQ19TRVRfUkVNT1RFX0RFU0NfRVJST1IsIHJlYXNvbiA6IFwic2V0UmVtb3RlRGVzY3JpcHRpb24gZXJyb3Igb2NjdXJyZWRcIiwgbWVzc2FnZSA6IFwic2V0UmVtb3RlRGVzY3JpcHRpb24gZXJyb3Igb2NjdXJyZWRcIiwgZXJyb3IgOiBlcnJvcn0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihtZXNzYWdlLmNhbmRpZGF0ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyByZWNlaXZlcyBJQ0UgQ2FuZGlkYXRlIGZyb20gc2VydmVyLlxuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgbWVzc2FnZS5jYW5kaWRhdGVzLmxlbmd0aDsgaSArKyApe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYobWVzc2FnZS5jYW5kaWRhdGVzW2ldICYmIG1lc3NhZ2UuY2FuZGlkYXRlc1tpXS5jYW5kaWRhdGUpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uLmFkZEljZUNhbmRpZGF0ZShuZXcgUlRDSWNlQ2FuZGlkYXRlKG1lc3NhZ2UuY2FuZGlkYXRlc1tpXSkpLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiYWRkSWNlQ2FuZGlkYXRlIDogc3VjY2Vzc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcih7Y29kZSA6IFBMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUiwgcmVhc29uIDogXCJhZGRJY2VDYW5kaWRhdGUgZXJyb3Igb2NjdXJyZWRcIiwgbWVzc2FnZSA6IFwiYWRkSWNlQ2FuZGlkYXRlIGVycm9yIG9jY3VycmVkXCIsIGVycm9yIDogZXJyb3J9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdzLm9uZXJyb3IgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgY2xvc2VQZWVyKHtjb2RlIDogUExBWUVSX1dFQlJUQ19XU19FUlJPUiwgcmVhc29uIDogXCJ3ZWJzb2NrZXQgZXJyb3Igb2NjdXJlZFwiLCBtZXNzYWdlIDogXCJ3ZWJzb2NrZXQgZXJyb3Igb2NjdXJyZWRcIiwgZXJyb3IgOiBlfSk7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdzLm9uY2xvc2UgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgY2xvc2VQZWVyKHtjb2RlIDogUExBWUVSX1dFQlJUQ19XU19DTE9TRUQsIHJlYXNvbiA6IFwid2Vic29ja2V0IGNsb3NlZFwiLCBtZXNzYWdlIDogXCJ3ZWJzb2NrZXQgY2xvc2VkXCIsIGVycm9yIDogZX0pO1xuICAgICAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb3NlUGVlcihlcnJvcikge1xuICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coJ1dlYlJUQyBMb2FkZXIgY2xvc2VQZWVhcigpJyk7XG4gICAgICAgIGlmKCEhd3MpIHtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZygnQ2xvc2luZyB3ZWJzb2NrZXQgY29ubmVjdGlvbi4uLicpO1xuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU2VuZCBTaWduYWxpbmcgOiBTdG9wLlwiKTtcbiAgICAgICAgICAgIHdzLnNlbmQoSlNPTi5zdHJpbmdpZnkoe2NvbW1hbmQgOiBcInN0b3BcIn0pKTtcbiAgICAgICAgICAgIHdzLmNsb3NlKCk7XG4gICAgICAgICAgICB3cyA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYocGVlckNvbm5lY3Rpb24pIHtcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZygnQ2xvc2luZyBwZWVyIGNvbm5lY3Rpb24uLi4nKTtcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uLmNsb3NlKCk7XG4gICAgICAgICAgICBwZWVyQ29ubmVjdGlvbiA9IG51bGw7XG4gICAgICAgIH07XG4gICAgICAgIGlmKGVycm9yKXtcbiAgICAgICAgICAgIGVycm9yQ2FsbGJhY2soZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICB0aGF0LmNvbm5lY3QgPSAoKSA9PiB7XG4gICAgICAgIHJldHVybiBpbml0aWFsaXplKCk7XG4gICAgfTtcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgICAgIGNsb3NlUGVlcigpO1xuICAgIH07XG4gICAgcmV0dXJuIHRoYXQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBXZWJSVENMb2FkZXI7IiwiKGZ1bmN0aW9uKGYpe2lmKHR5cGVvZiBleHBvcnRzPT09XCJvYmplY3RcIiYmdHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCIpe21vZHVsZS5leHBvcnRzPWYoKX1lbHNlIGlmKHR5cGVvZiBkZWZpbmU9PT1cImZ1bmN0aW9uXCImJmRlZmluZS5hbWQpe2RlZmluZShbXSxmKX1lbHNle3ZhciBnO2lmKHR5cGVvZiB3aW5kb3chPT1cInVuZGVmaW5lZFwiKXtnPXdpbmRvd31lbHNlIGlmKHR5cGVvZiBnbG9iYWwhPT1cInVuZGVmaW5lZFwiKXtnPWdsb2JhbH1lbHNlIGlmKHR5cGVvZiBzZWxmIT09XCJ1bmRlZmluZWRcIil7Zz1zZWxmfWVsc2V7Zz10aGlzfWcuYWRhcHRlciA9IGYoKX19KShmdW5jdGlvbigpe3ZhciBkZWZpbmUsbW9kdWxlLGV4cG9ydHM7cmV0dXJuIChmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8qXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE3IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXG4gKiAgdHJlZS5cbiAqL1xuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgU0RQVXRpbHMgPSByZXF1aXJlKCdzZHAnKTtcblxuZnVuY3Rpb24gd3JpdGVNZWRpYVNlY3Rpb24odHJhbnNjZWl2ZXIsIGNhcHMsIHR5cGUsIHN0cmVhbSwgZHRsc1JvbGUpIHtcbiAgdmFyIHNkcCA9IFNEUFV0aWxzLndyaXRlUnRwRGVzY3JpcHRpb24odHJhbnNjZWl2ZXIua2luZCwgY2Fwcyk7XG5cbiAgLy8gTWFwIElDRSBwYXJhbWV0ZXJzICh1ZnJhZywgcHdkKSB0byBTRFAuXG4gIHNkcCArPSBTRFBVdGlscy53cml0ZUljZVBhcmFtZXRlcnMoXG4gICAgICB0cmFuc2NlaXZlci5pY2VHYXRoZXJlci5nZXRMb2NhbFBhcmFtZXRlcnMoKSk7XG5cbiAgLy8gTWFwIERUTFMgcGFyYW1ldGVycyB0byBTRFAuXG4gIHNkcCArPSBTRFBVdGlscy53cml0ZUR0bHNQYXJhbWV0ZXJzKFxuICAgICAgdHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydC5nZXRMb2NhbFBhcmFtZXRlcnMoKSxcbiAgICAgIHR5cGUgPT09ICdvZmZlcicgPyAnYWN0cGFzcycgOiBkdGxzUm9sZSB8fCAnYWN0aXZlJyk7XG5cbiAgc2RwICs9ICdhPW1pZDonICsgdHJhbnNjZWl2ZXIubWlkICsgJ1xcclxcbic7XG5cbiAgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlciAmJiB0cmFuc2NlaXZlci5ydHBSZWNlaXZlcikge1xuICAgIHNkcCArPSAnYT1zZW5kcmVjdlxcclxcbic7XG4gIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIucnRwU2VuZGVyKSB7XG4gICAgc2RwICs9ICdhPXNlbmRvbmx5XFxyXFxuJztcbiAgfSBlbHNlIGlmICh0cmFuc2NlaXZlci5ydHBSZWNlaXZlcikge1xuICAgIHNkcCArPSAnYT1yZWN2b25seVxcclxcbic7XG4gIH0gZWxzZSB7XG4gICAgc2RwICs9ICdhPWluYWN0aXZlXFxyXFxuJztcbiAgfVxuXG4gIGlmICh0cmFuc2NlaXZlci5ydHBTZW5kZXIpIHtcbiAgICB2YXIgdHJhY2tJZCA9IHRyYW5zY2VpdmVyLnJ0cFNlbmRlci5faW5pdGlhbFRyYWNrSWQgfHxcbiAgICAgICAgdHJhbnNjZWl2ZXIucnRwU2VuZGVyLnRyYWNrLmlkO1xuICAgIHRyYW5zY2VpdmVyLnJ0cFNlbmRlci5faW5pdGlhbFRyYWNrSWQgPSB0cmFja0lkO1xuICAgIC8vIHNwZWMuXG4gICAgdmFyIG1zaWQgPSAnbXNpZDonICsgKHN0cmVhbSA/IHN0cmVhbS5pZCA6ICctJykgKyAnICcgK1xuICAgICAgICB0cmFja0lkICsgJ1xcclxcbic7XG4gICAgc2RwICs9ICdhPScgKyBtc2lkO1xuICAgIC8vIGZvciBDaHJvbWUuIExlZ2FjeSBzaG91bGQgbm8gbG9uZ2VyIGJlIHJlcXVpcmVkLlxuICAgIHNkcCArPSAnYT1zc3JjOicgKyB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmMgK1xuICAgICAgICAnICcgKyBtc2lkO1xuXG4gICAgLy8gUlRYXG4gICAgaWYgKHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4KSB7XG4gICAgICBzZHAgKz0gJ2E9c3NyYzonICsgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHguc3NyYyArXG4gICAgICAgICAgJyAnICsgbXNpZDtcbiAgICAgIHNkcCArPSAnYT1zc3JjLWdyb3VwOkZJRCAnICtcbiAgICAgICAgICB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmMgKyAnICcgK1xuICAgICAgICAgIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4LnNzcmMgK1xuICAgICAgICAgICdcXHJcXG4nO1xuICAgIH1cbiAgfVxuICAvLyBGSVhNRTogdGhpcyBzaG91bGQgYmUgd3JpdHRlbiBieSB3cml0ZVJ0cERlc2NyaXB0aW9uLlxuICBzZHAgKz0gJ2E9c3NyYzonICsgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjICtcbiAgICAgICcgY25hbWU6JyArIFNEUFV0aWxzLmxvY2FsQ05hbWUgKyAnXFxyXFxuJztcbiAgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlciAmJiB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCkge1xuICAgIHNkcCArPSAnYT1zc3JjOicgKyB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eC5zc3JjICtcbiAgICAgICAgJyBjbmFtZTonICsgU0RQVXRpbHMubG9jYWxDTmFtZSArICdcXHJcXG4nO1xuICB9XG4gIHJldHVybiBzZHA7XG59XG5cbi8vIEVkZ2UgZG9lcyBub3QgbGlrZVxuLy8gMSkgc3R1bjogZmlsdGVyZWQgYWZ0ZXIgMTQzOTMgdW5sZXNzID90cmFuc3BvcnQ9dWRwIGlzIHByZXNlbnRcbi8vIDIpIHR1cm46IHRoYXQgZG9lcyBub3QgaGF2ZSBhbGwgb2YgdHVybjpob3N0OnBvcnQ/dHJhbnNwb3J0PXVkcFxuLy8gMykgdHVybjogd2l0aCBpcHY2IGFkZHJlc3Nlc1xuLy8gNCkgdHVybjogb2NjdXJyaW5nIG11bGlwbGUgdGltZXNcbmZ1bmN0aW9uIGZpbHRlckljZVNlcnZlcnMoaWNlU2VydmVycywgZWRnZVZlcnNpb24pIHtcbiAgdmFyIGhhc1R1cm4gPSBmYWxzZTtcbiAgaWNlU2VydmVycyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoaWNlU2VydmVycykpO1xuICByZXR1cm4gaWNlU2VydmVycy5maWx0ZXIoZnVuY3Rpb24oc2VydmVyKSB7XG4gICAgaWYgKHNlcnZlciAmJiAoc2VydmVyLnVybHMgfHwgc2VydmVyLnVybCkpIHtcbiAgICAgIHZhciB1cmxzID0gc2VydmVyLnVybHMgfHwgc2VydmVyLnVybDtcbiAgICAgIGlmIChzZXJ2ZXIudXJsICYmICFzZXJ2ZXIudXJscykge1xuICAgICAgICBjb25zb2xlLndhcm4oJ1JUQ0ljZVNlcnZlci51cmwgaXMgZGVwcmVjYXRlZCEgVXNlIHVybHMgaW5zdGVhZC4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBpc1N0cmluZyA9IHR5cGVvZiB1cmxzID09PSAnc3RyaW5nJztcbiAgICAgIGlmIChpc1N0cmluZykge1xuICAgICAgICB1cmxzID0gW3VybHNdO1xuICAgICAgfVxuICAgICAgdXJscyA9IHVybHMuZmlsdGVyKGZ1bmN0aW9uKHVybCkge1xuICAgICAgICB2YXIgdmFsaWRUdXJuID0gdXJsLmluZGV4T2YoJ3R1cm46JykgPT09IDAgJiZcbiAgICAgICAgICAgIHVybC5pbmRleE9mKCd0cmFuc3BvcnQ9dWRwJykgIT09IC0xICYmXG4gICAgICAgICAgICB1cmwuaW5kZXhPZigndHVybjpbJykgPT09IC0xICYmXG4gICAgICAgICAgICAhaGFzVHVybjtcblxuICAgICAgICBpZiAodmFsaWRUdXJuKSB7XG4gICAgICAgICAgaGFzVHVybiA9IHRydWU7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVybC5pbmRleE9mKCdzdHVuOicpID09PSAwICYmIGVkZ2VWZXJzaW9uID49IDE0MzkzICYmXG4gICAgICAgICAgICB1cmwuaW5kZXhPZignP3RyYW5zcG9ydD11ZHAnKSA9PT0gLTE7XG4gICAgICB9KTtcblxuICAgICAgZGVsZXRlIHNlcnZlci51cmw7XG4gICAgICBzZXJ2ZXIudXJscyA9IGlzU3RyaW5nID8gdXJsc1swXSA6IHVybHM7XG4gICAgICByZXR1cm4gISF1cmxzLmxlbmd0aDtcbiAgICB9XG4gIH0pO1xufVxuXG4vLyBEZXRlcm1pbmVzIHRoZSBpbnRlcnNlY3Rpb24gb2YgbG9jYWwgYW5kIHJlbW90ZSBjYXBhYmlsaXRpZXMuXG5mdW5jdGlvbiBnZXRDb21tb25DYXBhYmlsaXRpZXMobG9jYWxDYXBhYmlsaXRpZXMsIHJlbW90ZUNhcGFiaWxpdGllcykge1xuICB2YXIgY29tbW9uQ2FwYWJpbGl0aWVzID0ge1xuICAgIGNvZGVjczogW10sXG4gICAgaGVhZGVyRXh0ZW5zaW9uczogW10sXG4gICAgZmVjTWVjaGFuaXNtczogW11cbiAgfTtcblxuICB2YXIgZmluZENvZGVjQnlQYXlsb2FkVHlwZSA9IGZ1bmN0aW9uKHB0LCBjb2RlY3MpIHtcbiAgICBwdCA9IHBhcnNlSW50KHB0LCAxMCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb2RlY3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChjb2RlY3NbaV0ucGF5bG9hZFR5cGUgPT09IHB0IHx8XG4gICAgICAgICAgY29kZWNzW2ldLnByZWZlcnJlZFBheWxvYWRUeXBlID09PSBwdCkge1xuICAgICAgICByZXR1cm4gY29kZWNzW2ldO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB2YXIgcnR4Q2FwYWJpbGl0eU1hdGNoZXMgPSBmdW5jdGlvbihsUnR4LCByUnR4LCBsQ29kZWNzLCByQ29kZWNzKSB7XG4gICAgdmFyIGxDb2RlYyA9IGZpbmRDb2RlY0J5UGF5bG9hZFR5cGUobFJ0eC5wYXJhbWV0ZXJzLmFwdCwgbENvZGVjcyk7XG4gICAgdmFyIHJDb2RlYyA9IGZpbmRDb2RlY0J5UGF5bG9hZFR5cGUoclJ0eC5wYXJhbWV0ZXJzLmFwdCwgckNvZGVjcyk7XG4gICAgcmV0dXJuIGxDb2RlYyAmJiByQ29kZWMgJiZcbiAgICAgICAgbENvZGVjLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gckNvZGVjLm5hbWUudG9Mb3dlckNhc2UoKTtcbiAgfTtcblxuICBsb2NhbENhcGFiaWxpdGllcy5jb2RlY3MuZm9yRWFjaChmdW5jdGlvbihsQ29kZWMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlbW90ZUNhcGFiaWxpdGllcy5jb2RlY3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciByQ29kZWMgPSByZW1vdGVDYXBhYmlsaXRpZXMuY29kZWNzW2ldO1xuICAgICAgaWYgKGxDb2RlYy5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IHJDb2RlYy5uYW1lLnRvTG93ZXJDYXNlKCkgJiZcbiAgICAgICAgICBsQ29kZWMuY2xvY2tSYXRlID09PSByQ29kZWMuY2xvY2tSYXRlKSB7XG4gICAgICAgIGlmIChsQ29kZWMubmFtZS50b0xvd2VyQ2FzZSgpID09PSAncnR4JyAmJlxuICAgICAgICAgICAgbENvZGVjLnBhcmFtZXRlcnMgJiYgckNvZGVjLnBhcmFtZXRlcnMuYXB0KSB7XG4gICAgICAgICAgLy8gZm9yIFJUWCB3ZSBuZWVkIHRvIGZpbmQgdGhlIGxvY2FsIHJ0eCB0aGF0IGhhcyBhIGFwdFxuICAgICAgICAgIC8vIHdoaWNoIHBvaW50cyB0byB0aGUgc2FtZSBsb2NhbCBjb2RlYyBhcyB0aGUgcmVtb3RlIG9uZS5cbiAgICAgICAgICBpZiAoIXJ0eENhcGFiaWxpdHlNYXRjaGVzKGxDb2RlYywgckNvZGVjLFxuICAgICAgICAgICAgICBsb2NhbENhcGFiaWxpdGllcy5jb2RlY3MsIHJlbW90ZUNhcGFiaWxpdGllcy5jb2RlY3MpKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgckNvZGVjID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShyQ29kZWMpKTsgLy8gZGVlcGNvcHlcbiAgICAgICAgLy8gbnVtYmVyIG9mIGNoYW5uZWxzIGlzIHRoZSBoaWdoZXN0IGNvbW1vbiBudW1iZXIgb2YgY2hhbm5lbHNcbiAgICAgICAgckNvZGVjLm51bUNoYW5uZWxzID0gTWF0aC5taW4obENvZGVjLm51bUNoYW5uZWxzLFxuICAgICAgICAgICAgckNvZGVjLm51bUNoYW5uZWxzKTtcbiAgICAgICAgLy8gcHVzaCByQ29kZWMgc28gd2UgcmVwbHkgd2l0aCBvZmZlcmVyIHBheWxvYWQgdHlwZVxuICAgICAgICBjb21tb25DYXBhYmlsaXRpZXMuY29kZWNzLnB1c2gockNvZGVjKTtcblxuICAgICAgICAvLyBkZXRlcm1pbmUgY29tbW9uIGZlZWRiYWNrIG1lY2hhbmlzbXNcbiAgICAgICAgckNvZGVjLnJ0Y3BGZWVkYmFjayA9IHJDb2RlYy5ydGNwRmVlZGJhY2suZmlsdGVyKGZ1bmN0aW9uKGZiKSB7XG4gICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBsQ29kZWMucnRjcEZlZWRiYWNrLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAobENvZGVjLnJ0Y3BGZWVkYmFja1tqXS50eXBlID09PSBmYi50eXBlICYmXG4gICAgICAgICAgICAgICAgbENvZGVjLnJ0Y3BGZWVkYmFja1tqXS5wYXJhbWV0ZXIgPT09IGZiLnBhcmFtZXRlcikge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gRklYTUU6IGFsc28gbmVlZCB0byBkZXRlcm1pbmUgLnBhcmFtZXRlcnNcbiAgICAgICAgLy8gIHNlZSBodHRwczovL2dpdGh1Yi5jb20vb3BlbnBlZXIvb3J0Yy9pc3N1ZXMvNTY5XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgbG9jYWxDYXBhYmlsaXRpZXMuaGVhZGVyRXh0ZW5zaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGxIZWFkZXJFeHRlbnNpb24pIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlbW90ZUNhcGFiaWxpdGllcy5oZWFkZXJFeHRlbnNpb25zLmxlbmd0aDtcbiAgICAgICAgIGkrKykge1xuICAgICAgdmFyIHJIZWFkZXJFeHRlbnNpb24gPSByZW1vdGVDYXBhYmlsaXRpZXMuaGVhZGVyRXh0ZW5zaW9uc1tpXTtcbiAgICAgIGlmIChsSGVhZGVyRXh0ZW5zaW9uLnVyaSA9PT0gckhlYWRlckV4dGVuc2lvbi51cmkpIHtcbiAgICAgICAgY29tbW9uQ2FwYWJpbGl0aWVzLmhlYWRlckV4dGVuc2lvbnMucHVzaChySGVhZGVyRXh0ZW5zaW9uKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICAvLyBGSVhNRTogZmVjTWVjaGFuaXNtc1xuICByZXR1cm4gY29tbW9uQ2FwYWJpbGl0aWVzO1xufVxuXG4vLyBpcyBhY3Rpb249c2V0TG9jYWxEZXNjcmlwdGlvbiB3aXRoIHR5cGUgYWxsb3dlZCBpbiBzaWduYWxpbmdTdGF0ZVxuZnVuY3Rpb24gaXNBY3Rpb25BbGxvd2VkSW5TaWduYWxpbmdTdGF0ZShhY3Rpb24sIHR5cGUsIHNpZ25hbGluZ1N0YXRlKSB7XG4gIHJldHVybiB7XG4gICAgb2ZmZXI6IHtcbiAgICAgIHNldExvY2FsRGVzY3JpcHRpb246IFsnc3RhYmxlJywgJ2hhdmUtbG9jYWwtb2ZmZXInXSxcbiAgICAgIHNldFJlbW90ZURlc2NyaXB0aW9uOiBbJ3N0YWJsZScsICdoYXZlLXJlbW90ZS1vZmZlciddXG4gICAgfSxcbiAgICBhbnN3ZXI6IHtcbiAgICAgIHNldExvY2FsRGVzY3JpcHRpb246IFsnaGF2ZS1yZW1vdGUtb2ZmZXInLCAnaGF2ZS1sb2NhbC1wcmFuc3dlciddLFxuICAgICAgc2V0UmVtb3RlRGVzY3JpcHRpb246IFsnaGF2ZS1sb2NhbC1vZmZlcicsICdoYXZlLXJlbW90ZS1wcmFuc3dlciddXG4gICAgfVxuICB9W3R5cGVdW2FjdGlvbl0uaW5kZXhPZihzaWduYWxpbmdTdGF0ZSkgIT09IC0xO1xufVxuXG5mdW5jdGlvbiBtYXliZUFkZENhbmRpZGF0ZShpY2VUcmFuc3BvcnQsIGNhbmRpZGF0ZSkge1xuICAvLyBFZGdlJ3MgaW50ZXJuYWwgcmVwcmVzZW50YXRpb24gYWRkcyBzb21lIGZpZWxkcyB0aGVyZWZvcmVcbiAgLy8gbm90IGFsbCBmaWVsZNGVIGFyZSB0YWtlbiBpbnRvIGFjY291bnQuXG4gIHZhciBhbHJlYWR5QWRkZWQgPSBpY2VUcmFuc3BvcnQuZ2V0UmVtb3RlQ2FuZGlkYXRlcygpXG4gICAgICAuZmluZChmdW5jdGlvbihyZW1vdGVDYW5kaWRhdGUpIHtcbiAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZS5mb3VuZGF0aW9uID09PSByZW1vdGVDYW5kaWRhdGUuZm91bmRhdGlvbiAmJlxuICAgICAgICAgICAgY2FuZGlkYXRlLmlwID09PSByZW1vdGVDYW5kaWRhdGUuaXAgJiZcbiAgICAgICAgICAgIGNhbmRpZGF0ZS5wb3J0ID09PSByZW1vdGVDYW5kaWRhdGUucG9ydCAmJlxuICAgICAgICAgICAgY2FuZGlkYXRlLnByaW9yaXR5ID09PSByZW1vdGVDYW5kaWRhdGUucHJpb3JpdHkgJiZcbiAgICAgICAgICAgIGNhbmRpZGF0ZS5wcm90b2NvbCA9PT0gcmVtb3RlQ2FuZGlkYXRlLnByb3RvY29sICYmXG4gICAgICAgICAgICBjYW5kaWRhdGUudHlwZSA9PT0gcmVtb3RlQ2FuZGlkYXRlLnR5cGU7XG4gICAgICB9KTtcbiAgaWYgKCFhbHJlYWR5QWRkZWQpIHtcbiAgICBpY2VUcmFuc3BvcnQuYWRkUmVtb3RlQ2FuZGlkYXRlKGNhbmRpZGF0ZSk7XG4gIH1cbiAgcmV0dXJuICFhbHJlYWR5QWRkZWQ7XG59XG5cblxuZnVuY3Rpb24gbWFrZUVycm9yKG5hbWUsIGRlc2NyaXB0aW9uKSB7XG4gIHZhciBlID0gbmV3IEVycm9yKGRlc2NyaXB0aW9uKTtcbiAgZS5uYW1lID0gbmFtZTtcbiAgLy8gbGVnYWN5IGVycm9yIGNvZGVzIGZyb20gaHR0cHM6Ly9oZXljYW0uZ2l0aHViLmlvL3dlYmlkbC8jaWRsLURPTUV4Y2VwdGlvbi1lcnJvci1uYW1lc1xuICBlLmNvZGUgPSB7XG4gICAgTm90U3VwcG9ydGVkRXJyb3I6IDksXG4gICAgSW52YWxpZFN0YXRlRXJyb3I6IDExLFxuICAgIEludmFsaWRBY2Nlc3NFcnJvcjogMTUsXG4gICAgVHlwZUVycm9yOiB1bmRlZmluZWQsXG4gICAgT3BlcmF0aW9uRXJyb3I6IHVuZGVmaW5lZFxuICB9W25hbWVdO1xuICByZXR1cm4gZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih3aW5kb3csIGVkZ2VWZXJzaW9uKSB7XG4gIC8vIGh0dHBzOi8vdzNjLmdpdGh1Yi5pby9tZWRpYWNhcHR1cmUtbWFpbi8jbWVkaWFzdHJlYW1cbiAgLy8gSGVscGVyIGZ1bmN0aW9uIHRvIGFkZCB0aGUgdHJhY2sgdG8gdGhlIHN0cmVhbSBhbmRcbiAgLy8gZGlzcGF0Y2ggdGhlIGV2ZW50IG91cnNlbHZlcy5cbiAgZnVuY3Rpb24gYWRkVHJhY2tUb1N0cmVhbUFuZEZpcmVFdmVudCh0cmFjaywgc3RyZWFtKSB7XG4gICAgc3RyZWFtLmFkZFRyYWNrKHRyYWNrKTtcbiAgICBzdHJlYW0uZGlzcGF0Y2hFdmVudChuZXcgd2luZG93Lk1lZGlhU3RyZWFtVHJhY2tFdmVudCgnYWRkdHJhY2snLFxuICAgICAgICB7dHJhY2s6IHRyYWNrfSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlVHJhY2tGcm9tU3RyZWFtQW5kRmlyZUV2ZW50KHRyYWNrLCBzdHJlYW0pIHtcbiAgICBzdHJlYW0ucmVtb3ZlVHJhY2sodHJhY2spO1xuICAgIHN0cmVhbS5kaXNwYXRjaEV2ZW50KG5ldyB3aW5kb3cuTWVkaWFTdHJlYW1UcmFja0V2ZW50KCdyZW1vdmV0cmFjaycsXG4gICAgICAgIHt0cmFjazogdHJhY2t9KSk7XG4gIH1cblxuICBmdW5jdGlvbiBmaXJlQWRkVHJhY2socGMsIHRyYWNrLCByZWNlaXZlciwgc3RyZWFtcykge1xuICAgIHZhciB0cmFja0V2ZW50ID0gbmV3IEV2ZW50KCd0cmFjaycpO1xuICAgIHRyYWNrRXZlbnQudHJhY2sgPSB0cmFjaztcbiAgICB0cmFja0V2ZW50LnJlY2VpdmVyID0gcmVjZWl2ZXI7XG4gICAgdHJhY2tFdmVudC50cmFuc2NlaXZlciA9IHtyZWNlaXZlcjogcmVjZWl2ZXJ9O1xuICAgIHRyYWNrRXZlbnQuc3RyZWFtcyA9IHN0cmVhbXM7XG4gICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBwYy5fZGlzcGF0Y2hFdmVudCgndHJhY2snLCB0cmFja0V2ZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBSVENQZWVyQ29ubmVjdGlvbiA9IGZ1bmN0aW9uKGNvbmZpZykge1xuICAgIHZhciBwYyA9IHRoaXM7XG5cbiAgICB2YXIgX2V2ZW50VGFyZ2V0ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIFsnYWRkRXZlbnRMaXN0ZW5lcicsICdyZW1vdmVFdmVudExpc3RlbmVyJywgJ2Rpc3BhdGNoRXZlbnQnXVxuICAgICAgICAuZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgICAgICBwY1ttZXRob2RdID0gX2V2ZW50VGFyZ2V0W21ldGhvZF0uYmluZChfZXZlbnRUYXJnZXQpO1xuICAgICAgICB9KTtcblxuICAgIHRoaXMuY2FuVHJpY2tsZUljZUNhbmRpZGF0ZXMgPSBudWxsO1xuXG4gICAgdGhpcy5uZWVkTmVnb3RpYXRpb24gPSBmYWxzZTtcblxuICAgIHRoaXMubG9jYWxTdHJlYW1zID0gW107XG4gICAgdGhpcy5yZW1vdGVTdHJlYW1zID0gW107XG5cbiAgICB0aGlzLmxvY2FsRGVzY3JpcHRpb24gPSBudWxsO1xuICAgIHRoaXMucmVtb3RlRGVzY3JpcHRpb24gPSBudWxsO1xuXG4gICAgdGhpcy5zaWduYWxpbmdTdGF0ZSA9ICdzdGFibGUnO1xuICAgIHRoaXMuaWNlQ29ubmVjdGlvblN0YXRlID0gJ25ldyc7XG4gICAgdGhpcy5jb25uZWN0aW9uU3RhdGUgPSAnbmV3JztcbiAgICB0aGlzLmljZUdhdGhlcmluZ1N0YXRlID0gJ25ldyc7XG5cbiAgICBjb25maWcgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGNvbmZpZyB8fCB7fSkpO1xuXG4gICAgdGhpcy51c2luZ0J1bmRsZSA9IGNvbmZpZy5idW5kbGVQb2xpY3kgPT09ICdtYXgtYnVuZGxlJztcbiAgICBpZiAoY29uZmlnLnJ0Y3BNdXhQb2xpY3kgPT09ICduZWdvdGlhdGUnKSB7XG4gICAgICB0aHJvdyhtYWtlRXJyb3IoJ05vdFN1cHBvcnRlZEVycm9yJyxcbiAgICAgICAgICAncnRjcE11eFBvbGljeSBcXCduZWdvdGlhdGVcXCcgaXMgbm90IHN1cHBvcnRlZCcpKTtcbiAgICB9IGVsc2UgaWYgKCFjb25maWcucnRjcE11eFBvbGljeSkge1xuICAgICAgY29uZmlnLnJ0Y3BNdXhQb2xpY3kgPSAncmVxdWlyZSc7XG4gICAgfVxuXG4gICAgc3dpdGNoIChjb25maWcuaWNlVHJhbnNwb3J0UG9saWN5KSB7XG4gICAgICBjYXNlICdhbGwnOlxuICAgICAgY2FzZSAncmVsYXknOlxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbmZpZy5pY2VUcmFuc3BvcnRQb2xpY3kgPSAnYWxsJztcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgc3dpdGNoIChjb25maWcuYnVuZGxlUG9saWN5KSB7XG4gICAgICBjYXNlICdiYWxhbmNlZCc6XG4gICAgICBjYXNlICdtYXgtY29tcGF0JzpcbiAgICAgIGNhc2UgJ21heC1idW5kbGUnOlxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbmZpZy5idW5kbGVQb2xpY3kgPSAnYmFsYW5jZWQnO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjb25maWcuaWNlU2VydmVycyA9IGZpbHRlckljZVNlcnZlcnMoY29uZmlnLmljZVNlcnZlcnMgfHwgW10sIGVkZ2VWZXJzaW9uKTtcblxuICAgIHRoaXMuX2ljZUdhdGhlcmVycyA9IFtdO1xuICAgIGlmIChjb25maWcuaWNlQ2FuZGlkYXRlUG9vbFNpemUpIHtcbiAgICAgIGZvciAodmFyIGkgPSBjb25maWcuaWNlQ2FuZGlkYXRlUG9vbFNpemU7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgdGhpcy5faWNlR2F0aGVyZXJzLnB1c2gobmV3IHdpbmRvdy5SVENJY2VHYXRoZXJlcih7XG4gICAgICAgICAgaWNlU2VydmVyczogY29uZmlnLmljZVNlcnZlcnMsXG4gICAgICAgICAgZ2F0aGVyUG9saWN5OiBjb25maWcuaWNlVHJhbnNwb3J0UG9saWN5XG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uZmlnLmljZUNhbmRpZGF0ZVBvb2xTaXplID0gMDtcbiAgICB9XG5cbiAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XG5cbiAgICAvLyBwZXItdHJhY2sgaWNlR2F0aGVycywgaWNlVHJhbnNwb3J0cywgZHRsc1RyYW5zcG9ydHMsIHJ0cFNlbmRlcnMsIC4uLlxuICAgIC8vIGV2ZXJ5dGhpbmcgdGhhdCBpcyBuZWVkZWQgdG8gZGVzY3JpYmUgYSBTRFAgbS1saW5lLlxuICAgIHRoaXMudHJhbnNjZWl2ZXJzID0gW107XG5cbiAgICB0aGlzLl9zZHBTZXNzaW9uSWQgPSBTRFBVdGlscy5nZW5lcmF0ZVNlc3Npb25JZCgpO1xuICAgIHRoaXMuX3NkcFNlc3Npb25WZXJzaW9uID0gMDtcblxuICAgIHRoaXMuX2R0bHNSb2xlID0gdW5kZWZpbmVkOyAvLyByb2xlIGZvciBhPXNldHVwIHRvIHVzZSBpbiBhbnN3ZXJzLlxuXG4gICAgdGhpcy5faXNDbG9zZWQgPSBmYWxzZTtcbiAgfTtcblxuICAvLyBzZXQgdXAgZXZlbnQgaGFuZGxlcnMgb24gcHJvdG90eXBlXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5vbmljZWNhbmRpZGF0ZSA9IG51bGw7XG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5vbmFkZHN0cmVhbSA9IG51bGw7XG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5vbnRyYWNrID0gbnVsbDtcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9ucmVtb3Zlc3RyZWFtID0gbnVsbDtcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9uc2lnbmFsaW5nc3RhdGVjaGFuZ2UgPSBudWxsO1xuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub25pY2Vjb25uZWN0aW9uc3RhdGVjaGFuZ2UgPSBudWxsO1xuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub25jb25uZWN0aW9uc3RhdGVjaGFuZ2UgPSBudWxsO1xuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub25pY2VnYXRoZXJpbmdzdGF0ZWNoYW5nZSA9IG51bGw7XG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5vbm5lZ290aWF0aW9ubmVlZGVkID0gbnVsbDtcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9uZGF0YWNoYW5uZWwgPSBudWxsO1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fZGlzcGF0Y2hFdmVudCA9IGZ1bmN0aW9uKG5hbWUsIGV2ZW50KSB7XG4gICAgaWYgKHRoaXMuX2lzQ2xvc2VkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgaWYgKHR5cGVvZiB0aGlzWydvbicgKyBuYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpc1snb24nICsgbmFtZV0oZXZlbnQpO1xuICAgIH1cbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX2VtaXRHYXRoZXJpbmdTdGF0ZUNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgnaWNlZ2F0aGVyaW5nc3RhdGVjaGFuZ2UnKTtcbiAgICB0aGlzLl9kaXNwYXRjaEV2ZW50KCdpY2VnYXRoZXJpbmdzdGF0ZWNoYW5nZScsIGV2ZW50KTtcbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0Q29uZmlndXJhdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9jb25maWc7XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldExvY2FsU3RyZWFtcyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmxvY2FsU3RyZWFtcztcbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0UmVtb3RlU3RyZWFtcyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnJlbW90ZVN0cmVhbXM7XG4gIH07XG5cbiAgLy8gaW50ZXJuYWwgaGVscGVyIHRvIGNyZWF0ZSBhIHRyYW5zY2VpdmVyIG9iamVjdC5cbiAgLy8gKHdoaWNoIGlzIG5vdCB5ZXQgdGhlIHNhbWUgYXMgdGhlIFdlYlJUQyAxLjAgdHJhbnNjZWl2ZXIpXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fY3JlYXRlVHJhbnNjZWl2ZXIgPSBmdW5jdGlvbihraW5kLCBkb05vdEFkZCkge1xuICAgIHZhciBoYXNCdW5kbGVUcmFuc3BvcnQgPSB0aGlzLnRyYW5zY2VpdmVycy5sZW5ndGggPiAwO1xuICAgIHZhciB0cmFuc2NlaXZlciA9IHtcbiAgICAgIHRyYWNrOiBudWxsLFxuICAgICAgaWNlR2F0aGVyZXI6IG51bGwsXG4gICAgICBpY2VUcmFuc3BvcnQ6IG51bGwsXG4gICAgICBkdGxzVHJhbnNwb3J0OiBudWxsLFxuICAgICAgbG9jYWxDYXBhYmlsaXRpZXM6IG51bGwsXG4gICAgICByZW1vdGVDYXBhYmlsaXRpZXM6IG51bGwsXG4gICAgICBydHBTZW5kZXI6IG51bGwsXG4gICAgICBydHBSZWNlaXZlcjogbnVsbCxcbiAgICAgIGtpbmQ6IGtpbmQsXG4gICAgICBtaWQ6IG51bGwsXG4gICAgICBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzOiBudWxsLFxuICAgICAgcmVjdkVuY29kaW5nUGFyYW1ldGVyczogbnVsbCxcbiAgICAgIHN0cmVhbTogbnVsbCxcbiAgICAgIGFzc29jaWF0ZWRSZW1vdGVNZWRpYVN0cmVhbXM6IFtdLFxuICAgICAgd2FudFJlY2VpdmU6IHRydWVcbiAgICB9O1xuICAgIGlmICh0aGlzLnVzaW5nQnVuZGxlICYmIGhhc0J1bmRsZVRyYW5zcG9ydCkge1xuICAgICAgdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0ID0gdGhpcy50cmFuc2NlaXZlcnNbMF0uaWNlVHJhbnNwb3J0O1xuICAgICAgdHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydCA9IHRoaXMudHJhbnNjZWl2ZXJzWzBdLmR0bHNUcmFuc3BvcnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB0cmFuc3BvcnRzID0gdGhpcy5fY3JlYXRlSWNlQW5kRHRsc1RyYW5zcG9ydHMoKTtcbiAgICAgIHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydCA9IHRyYW5zcG9ydHMuaWNlVHJhbnNwb3J0O1xuICAgICAgdHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydCA9IHRyYW5zcG9ydHMuZHRsc1RyYW5zcG9ydDtcbiAgICB9XG4gICAgaWYgKCFkb05vdEFkZCkge1xuICAgICAgdGhpcy50cmFuc2NlaXZlcnMucHVzaCh0cmFuc2NlaXZlcik7XG4gICAgfVxuICAgIHJldHVybiB0cmFuc2NlaXZlcjtcbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2sgPSBmdW5jdGlvbih0cmFjaywgc3RyZWFtKSB7XG4gICAgaWYgKHRoaXMuX2lzQ2xvc2VkKSB7XG4gICAgICB0aHJvdyBtYWtlRXJyb3IoJ0ludmFsaWRTdGF0ZUVycm9yJyxcbiAgICAgICAgICAnQXR0ZW1wdGVkIHRvIGNhbGwgYWRkVHJhY2sgb24gYSBjbG9zZWQgcGVlcmNvbm5lY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlFeGlzdHMgPSB0aGlzLnRyYW5zY2VpdmVycy5maW5kKGZ1bmN0aW9uKHMpIHtcbiAgICAgIHJldHVybiBzLnRyYWNrID09PSB0cmFjaztcbiAgICB9KTtcblxuICAgIGlmIChhbHJlYWR5RXhpc3RzKSB7XG4gICAgICB0aHJvdyBtYWtlRXJyb3IoJ0ludmFsaWRBY2Nlc3NFcnJvcicsICdUcmFjayBhbHJlYWR5IGV4aXN0cy4nKTtcbiAgICB9XG5cbiAgICB2YXIgdHJhbnNjZWl2ZXI7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnRyYW5zY2VpdmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKCF0aGlzLnRyYW5zY2VpdmVyc1tpXS50cmFjayAmJlxuICAgICAgICAgIHRoaXMudHJhbnNjZWl2ZXJzW2ldLmtpbmQgPT09IHRyYWNrLmtpbmQpIHtcbiAgICAgICAgdHJhbnNjZWl2ZXIgPSB0aGlzLnRyYW5zY2VpdmVyc1tpXTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCF0cmFuc2NlaXZlcikge1xuICAgICAgdHJhbnNjZWl2ZXIgPSB0aGlzLl9jcmVhdGVUcmFuc2NlaXZlcih0cmFjay5raW5kKTtcbiAgICB9XG5cbiAgICB0aGlzLl9tYXliZUZpcmVOZWdvdGlhdGlvbk5lZWRlZCgpO1xuXG4gICAgaWYgKHRoaXMubG9jYWxTdHJlYW1zLmluZGV4T2Yoc3RyZWFtKSA9PT0gLTEpIHtcbiAgICAgIHRoaXMubG9jYWxTdHJlYW1zLnB1c2goc3RyZWFtKTtcbiAgICB9XG5cbiAgICB0cmFuc2NlaXZlci50cmFjayA9IHRyYWNrO1xuICAgIHRyYW5zY2VpdmVyLnN0cmVhbSA9IHN0cmVhbTtcbiAgICB0cmFuc2NlaXZlci5ydHBTZW5kZXIgPSBuZXcgd2luZG93LlJUQ1J0cFNlbmRlcih0cmFjayxcbiAgICAgICAgdHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydCk7XG4gICAgcmV0dXJuIHRyYW5zY2VpdmVyLnJ0cFNlbmRlcjtcbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgdmFyIHBjID0gdGhpcztcbiAgICBpZiAoZWRnZVZlcnNpb24gPj0gMTUwMjUpIHtcbiAgICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XG4gICAgICAgIHBjLmFkZFRyYWNrKHRyYWNrLCBzdHJlYW0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIENsb25lIGlzIG5lY2Vzc2FyeSBmb3IgbG9jYWwgZGVtb3MgbW9zdGx5LCBhdHRhY2hpbmcgZGlyZWN0bHlcbiAgICAgIC8vIHRvIHR3byBkaWZmZXJlbnQgc2VuZGVycyBkb2VzIG5vdCB3b3JrIChidWlsZCAxMDU0NykuXG4gICAgICAvLyBGaXhlZCBpbiAxNTAyNSAob3IgZWFybGllcilcbiAgICAgIHZhciBjbG9uZWRTdHJlYW0gPSBzdHJlYW0uY2xvbmUoKTtcbiAgICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrLCBpZHgpIHtcbiAgICAgICAgdmFyIGNsb25lZFRyYWNrID0gY2xvbmVkU3RyZWFtLmdldFRyYWNrcygpW2lkeF07XG4gICAgICAgIHRyYWNrLmFkZEV2ZW50TGlzdGVuZXIoJ2VuYWJsZWQnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGNsb25lZFRyYWNrLmVuYWJsZWQgPSBldmVudC5lbmFibGVkO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgY2xvbmVkU3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcbiAgICAgICAgcGMuYWRkVHJhY2sodHJhY2ssIGNsb25lZFN0cmVhbSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVRyYWNrID0gZnVuY3Rpb24oc2VuZGVyKSB7XG4gICAgaWYgKHRoaXMuX2lzQ2xvc2VkKSB7XG4gICAgICB0aHJvdyBtYWtlRXJyb3IoJ0ludmFsaWRTdGF0ZUVycm9yJyxcbiAgICAgICAgICAnQXR0ZW1wdGVkIHRvIGNhbGwgcmVtb3ZlVHJhY2sgb24gYSBjbG9zZWQgcGVlcmNvbm5lY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgaWYgKCEoc2VuZGVyIGluc3RhbmNlb2Ygd2luZG93LlJUQ1J0cFNlbmRlcikpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IDEgb2YgUlRDUGVlckNvbm5lY3Rpb24ucmVtb3ZlVHJhY2sgJyArXG4gICAgICAgICAgJ2RvZXMgbm90IGltcGxlbWVudCBpbnRlcmZhY2UgUlRDUnRwU2VuZGVyLicpO1xuICAgIH1cblxuICAgIHZhciB0cmFuc2NlaXZlciA9IHRoaXMudHJhbnNjZWl2ZXJzLmZpbmQoZnVuY3Rpb24odCkge1xuICAgICAgcmV0dXJuIHQucnRwU2VuZGVyID09PSBzZW5kZXI7XG4gICAgfSk7XG5cbiAgICBpZiAoIXRyYW5zY2VpdmVyKSB7XG4gICAgICB0aHJvdyBtYWtlRXJyb3IoJ0ludmFsaWRBY2Nlc3NFcnJvcicsXG4gICAgICAgICAgJ1NlbmRlciB3YXMgbm90IGNyZWF0ZWQgYnkgdGhpcyBjb25uZWN0aW9uLicpO1xuICAgIH1cbiAgICB2YXIgc3RyZWFtID0gdHJhbnNjZWl2ZXIuc3RyZWFtO1xuXG4gICAgdHJhbnNjZWl2ZXIucnRwU2VuZGVyLnN0b3AoKTtcbiAgICB0cmFuc2NlaXZlci5ydHBTZW5kZXIgPSBudWxsO1xuICAgIHRyYW5zY2VpdmVyLnRyYWNrID0gbnVsbDtcbiAgICB0cmFuc2NlaXZlci5zdHJlYW0gPSBudWxsO1xuXG4gICAgLy8gcmVtb3ZlIHRoZSBzdHJlYW0gZnJvbSB0aGUgc2V0IG9mIGxvY2FsIHN0cmVhbXNcbiAgICB2YXIgbG9jYWxTdHJlYW1zID0gdGhpcy50cmFuc2NlaXZlcnMubWFwKGZ1bmN0aW9uKHQpIHtcbiAgICAgIHJldHVybiB0LnN0cmVhbTtcbiAgICB9KTtcbiAgICBpZiAobG9jYWxTdHJlYW1zLmluZGV4T2Yoc3RyZWFtKSA9PT0gLTEgJiZcbiAgICAgICAgdGhpcy5sb2NhbFN0cmVhbXMuaW5kZXhPZihzdHJlYW0pID4gLTEpIHtcbiAgICAgIHRoaXMubG9jYWxTdHJlYW1zLnNwbGljZSh0aGlzLmxvY2FsU3RyZWFtcy5pbmRleE9mKHN0cmVhbSksIDEpO1xuICAgIH1cblxuICAgIHRoaXMuX21heWJlRmlyZU5lZ290aWF0aW9uTmVlZGVkKCk7XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgIHZhciBwYyA9IHRoaXM7XG4gICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcbiAgICAgIHZhciBzZW5kZXIgPSBwYy5nZXRTZW5kZXJzKCkuZmluZChmdW5jdGlvbihzKSB7XG4gICAgICAgIHJldHVybiBzLnRyYWNrID09PSB0cmFjaztcbiAgICAgIH0pO1xuICAgICAgaWYgKHNlbmRlcikge1xuICAgICAgICBwYy5yZW1vdmVUcmFjayhzZW5kZXIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTZW5kZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMudHJhbnNjZWl2ZXJzLmZpbHRlcihmdW5jdGlvbih0cmFuc2NlaXZlcikge1xuICAgICAgcmV0dXJuICEhdHJhbnNjZWl2ZXIucnRwU2VuZGVyO1xuICAgIH0pXG4gICAgLm1hcChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xuICAgICAgcmV0dXJuIHRyYW5zY2VpdmVyLnJ0cFNlbmRlcjtcbiAgICB9KTtcbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0UmVjZWl2ZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMudHJhbnNjZWl2ZXJzLmZpbHRlcihmdW5jdGlvbih0cmFuc2NlaXZlcikge1xuICAgICAgcmV0dXJuICEhdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXI7XG4gICAgfSlcbiAgICAubWFwKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XG4gICAgICByZXR1cm4gdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXI7XG4gICAgfSk7XG4gIH07XG5cblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX2NyZWF0ZUljZUdhdGhlcmVyID0gZnVuY3Rpb24oc2RwTUxpbmVJbmRleCxcbiAgICAgIHVzaW5nQnVuZGxlKSB7XG4gICAgdmFyIHBjID0gdGhpcztcbiAgICBpZiAodXNpbmdCdW5kbGUgJiYgc2RwTUxpbmVJbmRleCA+IDApIHtcbiAgICAgIHJldHVybiB0aGlzLnRyYW5zY2VpdmVyc1swXS5pY2VHYXRoZXJlcjtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2ljZUdhdGhlcmVycy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9pY2VHYXRoZXJlcnMuc2hpZnQoKTtcbiAgICB9XG4gICAgdmFyIGljZUdhdGhlcmVyID0gbmV3IHdpbmRvdy5SVENJY2VHYXRoZXJlcih7XG4gICAgICBpY2VTZXJ2ZXJzOiB0aGlzLl9jb25maWcuaWNlU2VydmVycyxcbiAgICAgIGdhdGhlclBvbGljeTogdGhpcy5fY29uZmlnLmljZVRyYW5zcG9ydFBvbGljeVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpY2VHYXRoZXJlciwgJ3N0YXRlJyxcbiAgICAgICAge3ZhbHVlOiAnbmV3Jywgd3JpdGFibGU6IHRydWV9XG4gICAgKTtcblxuICAgIHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmJ1ZmZlcmVkQ2FuZGlkYXRlRXZlbnRzID0gW107XG4gICAgdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uYnVmZmVyQ2FuZGlkYXRlcyA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICB2YXIgZW5kID0gIWV2ZW50LmNhbmRpZGF0ZSB8fCBPYmplY3Qua2V5cyhldmVudC5jYW5kaWRhdGUpLmxlbmd0aCA9PT0gMDtcbiAgICAgIC8vIHBvbHlmaWxsIHNpbmNlIFJUQ0ljZUdhdGhlcmVyLnN0YXRlIGlzIG5vdCBpbXBsZW1lbnRlZCBpblxuICAgICAgLy8gRWRnZSAxMDU0NyB5ZXQuXG4gICAgICBpY2VHYXRoZXJlci5zdGF0ZSA9IGVuZCA/ICdjb21wbGV0ZWQnIDogJ2dhdGhlcmluZyc7XG4gICAgICBpZiAocGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmJ1ZmZlcmVkQ2FuZGlkYXRlRXZlbnRzICE9PSBudWxsKSB7XG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5idWZmZXJlZENhbmRpZGF0ZUV2ZW50cy5wdXNoKGV2ZW50KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGljZUdhdGhlcmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvY2FsY2FuZGlkYXRlJyxcbiAgICAgIHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmJ1ZmZlckNhbmRpZGF0ZXMpO1xuICAgIHJldHVybiBpY2VHYXRoZXJlcjtcbiAgfTtcblxuICAvLyBzdGFydCBnYXRoZXJpbmcgZnJvbSBhbiBSVENJY2VHYXRoZXJlci5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl9nYXRoZXIgPSBmdW5jdGlvbihtaWQsIHNkcE1MaW5lSW5kZXgpIHtcbiAgICB2YXIgcGMgPSB0aGlzO1xuICAgIHZhciBpY2VHYXRoZXJlciA9IHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmljZUdhdGhlcmVyO1xuICAgIGlmIChpY2VHYXRoZXJlci5vbmxvY2FsY2FuZGlkYXRlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBidWZmZXJlZENhbmRpZGF0ZUV2ZW50cyA9XG4gICAgICB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5idWZmZXJlZENhbmRpZGF0ZUV2ZW50cztcbiAgICB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5idWZmZXJlZENhbmRpZGF0ZUV2ZW50cyA9IG51bGw7XG4gICAgaWNlR2F0aGVyZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbG9jYWxjYW5kaWRhdGUnLFxuICAgICAgdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uYnVmZmVyQ2FuZGlkYXRlcyk7XG4gICAgaWNlR2F0aGVyZXIub25sb2NhbGNhbmRpZGF0ZSA9IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgaWYgKHBjLnVzaW5nQnVuZGxlICYmIHNkcE1MaW5lSW5kZXggPiAwKSB7XG4gICAgICAgIC8vIGlmIHdlIGtub3cgdGhhdCB3ZSB1c2UgYnVuZGxlIHdlIGNhbiBkcm9wIGNhbmRpZGF0ZXMgd2l0aFxuICAgICAgICAvLyDRlWRwTUxpbmVJbmRleCA+IDAuIElmIHdlIGRvbid0IGRvIHRoaXMgdGhlbiBvdXIgc3RhdGUgZ2V0c1xuICAgICAgICAvLyBjb25mdXNlZCBzaW5jZSB3ZSBkaXNwb3NlIHRoZSBleHRyYSBpY2UgZ2F0aGVyZXIuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgnaWNlY2FuZGlkYXRlJyk7XG4gICAgICBldmVudC5jYW5kaWRhdGUgPSB7c2RwTWlkOiBtaWQsIHNkcE1MaW5lSW5kZXg6IHNkcE1MaW5lSW5kZXh9O1xuXG4gICAgICB2YXIgY2FuZCA9IGV2dC5jYW5kaWRhdGU7XG4gICAgICAvLyBFZGdlIGVtaXRzIGFuIGVtcHR5IG9iamVjdCBmb3IgUlRDSWNlQ2FuZGlkYXRlQ29tcGxldGXigKVcbiAgICAgIHZhciBlbmQgPSAhY2FuZCB8fCBPYmplY3Qua2V5cyhjYW5kKS5sZW5ndGggPT09IDA7XG4gICAgICBpZiAoZW5kKSB7XG4gICAgICAgIC8vIHBvbHlmaWxsIHNpbmNlIFJUQ0ljZUdhdGhlcmVyLnN0YXRlIGlzIG5vdCBpbXBsZW1lbnRlZCBpblxuICAgICAgICAvLyBFZGdlIDEwNTQ3IHlldC5cbiAgICAgICAgaWYgKGljZUdhdGhlcmVyLnN0YXRlID09PSAnbmV3JyB8fCBpY2VHYXRoZXJlci5zdGF0ZSA9PT0gJ2dhdGhlcmluZycpIHtcbiAgICAgICAgICBpY2VHYXRoZXJlci5zdGF0ZSA9ICdjb21wbGV0ZWQnO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoaWNlR2F0aGVyZXIuc3RhdGUgPT09ICduZXcnKSB7XG4gICAgICAgICAgaWNlR2F0aGVyZXIuc3RhdGUgPSAnZ2F0aGVyaW5nJztcbiAgICAgICAgfVxuICAgICAgICAvLyBSVENJY2VDYW5kaWRhdGUgZG9lc24ndCBoYXZlIGEgY29tcG9uZW50LCBuZWVkcyB0byBiZSBhZGRlZFxuICAgICAgICBjYW5kLmNvbXBvbmVudCA9IDE7XG4gICAgICAgIC8vIGFsc28gdGhlIHVzZXJuYW1lRnJhZ21lbnQuIFRPRE86IHVwZGF0ZSBTRFAgdG8gdGFrZSBib3RoIHZhcmlhbnRzLlxuICAgICAgICBjYW5kLnVmcmFnID0gaWNlR2F0aGVyZXIuZ2V0TG9jYWxQYXJhbWV0ZXJzKCkudXNlcm5hbWVGcmFnbWVudDtcblxuICAgICAgICB2YXIgc2VyaWFsaXplZENhbmRpZGF0ZSA9IFNEUFV0aWxzLndyaXRlQ2FuZGlkYXRlKGNhbmQpO1xuICAgICAgICBldmVudC5jYW5kaWRhdGUgPSBPYmplY3QuYXNzaWduKGV2ZW50LmNhbmRpZGF0ZSxcbiAgICAgICAgICAgIFNEUFV0aWxzLnBhcnNlQ2FuZGlkYXRlKHNlcmlhbGl6ZWRDYW5kaWRhdGUpKTtcblxuICAgICAgICBldmVudC5jYW5kaWRhdGUuY2FuZGlkYXRlID0gc2VyaWFsaXplZENhbmRpZGF0ZTtcbiAgICAgICAgZXZlbnQuY2FuZGlkYXRlLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjYW5kaWRhdGU6IGV2ZW50LmNhbmRpZGF0ZS5jYW5kaWRhdGUsXG4gICAgICAgICAgICBzZHBNaWQ6IGV2ZW50LmNhbmRpZGF0ZS5zZHBNaWQsXG4gICAgICAgICAgICBzZHBNTGluZUluZGV4OiBldmVudC5jYW5kaWRhdGUuc2RwTUxpbmVJbmRleCxcbiAgICAgICAgICAgIHVzZXJuYW1lRnJhZ21lbnQ6IGV2ZW50LmNhbmRpZGF0ZS51c2VybmFtZUZyYWdtZW50XG4gICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgLy8gdXBkYXRlIGxvY2FsIGRlc2NyaXB0aW9uLlxuICAgICAgdmFyIHNlY3Rpb25zID0gU0RQVXRpbHMuZ2V0TWVkaWFTZWN0aW9ucyhwYy5sb2NhbERlc2NyaXB0aW9uLnNkcCk7XG4gICAgICBpZiAoIWVuZCkge1xuICAgICAgICBzZWN0aW9uc1tldmVudC5jYW5kaWRhdGUuc2RwTUxpbmVJbmRleF0gKz1cbiAgICAgICAgICAgICdhPScgKyBldmVudC5jYW5kaWRhdGUuY2FuZGlkYXRlICsgJ1xcclxcbic7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWN0aW9uc1tldmVudC5jYW5kaWRhdGUuc2RwTUxpbmVJbmRleF0gKz1cbiAgICAgICAgICAgICdhPWVuZC1vZi1jYW5kaWRhdGVzXFxyXFxuJztcbiAgICAgIH1cbiAgICAgIHBjLmxvY2FsRGVzY3JpcHRpb24uc2RwID1cbiAgICAgICAgICBTRFBVdGlscy5nZXREZXNjcmlwdGlvbihwYy5sb2NhbERlc2NyaXB0aW9uLnNkcCkgK1xuICAgICAgICAgIHNlY3Rpb25zLmpvaW4oJycpO1xuICAgICAgdmFyIGNvbXBsZXRlID0gcGMudHJhbnNjZWl2ZXJzLmV2ZXJ5KGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XG4gICAgICAgIHJldHVybiB0cmFuc2NlaXZlci5pY2VHYXRoZXJlciAmJlxuICAgICAgICAgICAgdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIuc3RhdGUgPT09ICdjb21wbGV0ZWQnO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChwYy5pY2VHYXRoZXJpbmdTdGF0ZSAhPT0gJ2dhdGhlcmluZycpIHtcbiAgICAgICAgcGMuaWNlR2F0aGVyaW5nU3RhdGUgPSAnZ2F0aGVyaW5nJztcbiAgICAgICAgcGMuX2VtaXRHYXRoZXJpbmdTdGF0ZUNoYW5nZSgpO1xuICAgICAgfVxuXG4gICAgICAvLyBFbWl0IGNhbmRpZGF0ZS4gQWxzbyBlbWl0IG51bGwgY2FuZGlkYXRlIHdoZW4gYWxsIGdhdGhlcmVycyBhcmVcbiAgICAgIC8vIGNvbXBsZXRlLlxuICAgICAgaWYgKCFlbmQpIHtcbiAgICAgICAgcGMuX2Rpc3BhdGNoRXZlbnQoJ2ljZWNhbmRpZGF0ZScsIGV2ZW50KTtcbiAgICAgIH1cbiAgICAgIGlmIChjb21wbGV0ZSkge1xuICAgICAgICBwYy5fZGlzcGF0Y2hFdmVudCgnaWNlY2FuZGlkYXRlJywgbmV3IEV2ZW50KCdpY2VjYW5kaWRhdGUnKSk7XG4gICAgICAgIHBjLmljZUdhdGhlcmluZ1N0YXRlID0gJ2NvbXBsZXRlJztcbiAgICAgICAgcGMuX2VtaXRHYXRoZXJpbmdTdGF0ZUNoYW5nZSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBlbWl0IGFscmVhZHkgZ2F0aGVyZWQgY2FuZGlkYXRlcy5cbiAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIGJ1ZmZlcmVkQ2FuZGlkYXRlRXZlbnRzLmZvckVhY2goZnVuY3Rpb24oZSkge1xuICAgICAgICBpY2VHYXRoZXJlci5vbmxvY2FsY2FuZGlkYXRlKGUpO1xuICAgICAgfSk7XG4gICAgfSwgMCk7XG4gIH07XG5cbiAgLy8gQ3JlYXRlIElDRSB0cmFuc3BvcnQgYW5kIERUTFMgdHJhbnNwb3J0LlxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX2NyZWF0ZUljZUFuZER0bHNUcmFuc3BvcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHBjID0gdGhpcztcbiAgICB2YXIgaWNlVHJhbnNwb3J0ID0gbmV3IHdpbmRvdy5SVENJY2VUcmFuc3BvcnQobnVsbCk7XG4gICAgaWNlVHJhbnNwb3J0Lm9uaWNlc3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgIHBjLl91cGRhdGVJY2VDb25uZWN0aW9uU3RhdGUoKTtcbiAgICAgIHBjLl91cGRhdGVDb25uZWN0aW9uU3RhdGUoKTtcbiAgICB9O1xuXG4gICAgdmFyIGR0bHNUcmFuc3BvcnQgPSBuZXcgd2luZG93LlJUQ0R0bHNUcmFuc3BvcnQoaWNlVHJhbnNwb3J0KTtcbiAgICBkdGxzVHJhbnNwb3J0Lm9uZHRsc3N0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICBwYy5fdXBkYXRlQ29ubmVjdGlvblN0YXRlKCk7XG4gICAgfTtcbiAgICBkdGxzVHJhbnNwb3J0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgIC8vIG9uZXJyb3IgZG9lcyBub3Qgc2V0IHN0YXRlIHRvIGZhaWxlZCBieSBpdHNlbGYuXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZHRsc1RyYW5zcG9ydCwgJ3N0YXRlJyxcbiAgICAgICAgICB7dmFsdWU6ICdmYWlsZWQnLCB3cml0YWJsZTogdHJ1ZX0pO1xuICAgICAgcGMuX3VwZGF0ZUNvbm5lY3Rpb25TdGF0ZSgpO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgaWNlVHJhbnNwb3J0OiBpY2VUcmFuc3BvcnQsXG4gICAgICBkdGxzVHJhbnNwb3J0OiBkdGxzVHJhbnNwb3J0XG4gICAgfTtcbiAgfTtcblxuICAvLyBEZXN0cm95IElDRSBnYXRoZXJlciwgSUNFIHRyYW5zcG9ydCBhbmQgRFRMUyB0cmFuc3BvcnQuXG4gIC8vIFdpdGhvdXQgdHJpZ2dlcmluZyB0aGUgY2FsbGJhY2tzLlxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX2Rpc3Bvc2VJY2VBbmREdGxzVHJhbnNwb3J0cyA9IGZ1bmN0aW9uKFxuICAgICAgc2RwTUxpbmVJbmRleCkge1xuICAgIHZhciBpY2VHYXRoZXJlciA9IHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmljZUdhdGhlcmVyO1xuICAgIGlmIChpY2VHYXRoZXJlcikge1xuICAgICAgZGVsZXRlIGljZUdhdGhlcmVyLm9ubG9jYWxjYW5kaWRhdGU7XG4gICAgICBkZWxldGUgdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uaWNlR2F0aGVyZXI7XG4gICAgfVxuICAgIHZhciBpY2VUcmFuc3BvcnQgPSB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5pY2VUcmFuc3BvcnQ7XG4gICAgaWYgKGljZVRyYW5zcG9ydCkge1xuICAgICAgZGVsZXRlIGljZVRyYW5zcG9ydC5vbmljZXN0YXRlY2hhbmdlO1xuICAgICAgZGVsZXRlIHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmljZVRyYW5zcG9ydDtcbiAgICB9XG4gICAgdmFyIGR0bHNUcmFuc3BvcnQgPSB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5kdGxzVHJhbnNwb3J0O1xuICAgIGlmIChkdGxzVHJhbnNwb3J0KSB7XG4gICAgICBkZWxldGUgZHRsc1RyYW5zcG9ydC5vbmR0bHNzdGF0ZWNoYW5nZTtcbiAgICAgIGRlbGV0ZSBkdGxzVHJhbnNwb3J0Lm9uZXJyb3I7XG4gICAgICBkZWxldGUgdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uZHRsc1RyYW5zcG9ydDtcbiAgICB9XG4gIH07XG5cbiAgLy8gU3RhcnQgdGhlIFJUUCBTZW5kZXIgYW5kIFJlY2VpdmVyIGZvciBhIHRyYW5zY2VpdmVyLlxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX3RyYW5zY2VpdmUgPSBmdW5jdGlvbih0cmFuc2NlaXZlcixcbiAgICAgIHNlbmQsIHJlY3YpIHtcbiAgICB2YXIgcGFyYW1zID0gZ2V0Q29tbW9uQ2FwYWJpbGl0aWVzKHRyYW5zY2VpdmVyLmxvY2FsQ2FwYWJpbGl0aWVzLFxuICAgICAgICB0cmFuc2NlaXZlci5yZW1vdGVDYXBhYmlsaXRpZXMpO1xuICAgIGlmIChzZW5kICYmIHRyYW5zY2VpdmVyLnJ0cFNlbmRlcikge1xuICAgICAgcGFyYW1zLmVuY29kaW5ncyA9IHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnM7XG4gICAgICBwYXJhbXMucnRjcCA9IHtcbiAgICAgICAgY25hbWU6IFNEUFV0aWxzLmxvY2FsQ05hbWUsXG4gICAgICAgIGNvbXBvdW5kOiB0cmFuc2NlaXZlci5ydGNwUGFyYW1ldGVycy5jb21wb3VuZFxuICAgICAgfTtcbiAgICAgIGlmICh0cmFuc2NlaXZlci5yZWN2RW5jb2RpbmdQYXJhbWV0ZXJzLmxlbmd0aCkge1xuICAgICAgICBwYXJhbXMucnRjcC5zc3JjID0gdHJhbnNjZWl2ZXIucmVjdkVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjO1xuICAgICAgfVxuICAgICAgdHJhbnNjZWl2ZXIucnRwU2VuZGVyLnNlbmQocGFyYW1zKTtcbiAgICB9XG4gICAgaWYgKHJlY3YgJiYgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIgJiYgcGFyYW1zLmNvZGVjcy5sZW5ndGggPiAwKSB7XG4gICAgICAvLyByZW1vdmUgUlRYIGZpZWxkIGluIEVkZ2UgMTQ5NDJcbiAgICAgIGlmICh0cmFuc2NlaXZlci5raW5kID09PSAndmlkZW8nXG4gICAgICAgICAgJiYgdHJhbnNjZWl2ZXIucmVjdkVuY29kaW5nUGFyYW1ldGVyc1xuICAgICAgICAgICYmIGVkZ2VWZXJzaW9uIDwgMTUwMTkpIHtcbiAgICAgICAgdHJhbnNjZWl2ZXIucmVjdkVuY29kaW5nUGFyYW1ldGVycy5mb3JFYWNoKGZ1bmN0aW9uKHApIHtcbiAgICAgICAgICBkZWxldGUgcC5ydHg7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKHRyYW5zY2VpdmVyLnJlY3ZFbmNvZGluZ1BhcmFtZXRlcnMubGVuZ3RoKSB7XG4gICAgICAgIHBhcmFtcy5lbmNvZGluZ3MgPSB0cmFuc2NlaXZlci5yZWN2RW5jb2RpbmdQYXJhbWV0ZXJzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyYW1zLmVuY29kaW5ncyA9IFt7fV07XG4gICAgICB9XG4gICAgICBwYXJhbXMucnRjcCA9IHtcbiAgICAgICAgY29tcG91bmQ6IHRyYW5zY2VpdmVyLnJ0Y3BQYXJhbWV0ZXJzLmNvbXBvdW5kXG4gICAgICB9O1xuICAgICAgaWYgKHRyYW5zY2VpdmVyLnJ0Y3BQYXJhbWV0ZXJzLmNuYW1lKSB7XG4gICAgICAgIHBhcmFtcy5ydGNwLmNuYW1lID0gdHJhbnNjZWl2ZXIucnRjcFBhcmFtZXRlcnMuY25hbWU7XG4gICAgICB9XG4gICAgICBpZiAodHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVycy5sZW5ndGgpIHtcbiAgICAgICAgcGFyYW1zLnJ0Y3Auc3NyYyA9IHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYztcbiAgICAgIH1cbiAgICAgIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyLnJlY2VpdmUocGFyYW1zKTtcbiAgICB9XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnNldExvY2FsRGVzY3JpcHRpb24gPSBmdW5jdGlvbihkZXNjcmlwdGlvbikge1xuICAgIHZhciBwYyA9IHRoaXM7XG5cbiAgICAvLyBOb3RlOiBwcmFuc3dlciBpcyBub3Qgc3VwcG9ydGVkLlxuICAgIGlmIChbJ29mZmVyJywgJ2Fuc3dlciddLmluZGV4T2YoZGVzY3JpcHRpb24udHlwZSkgPT09IC0xKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobWFrZUVycm9yKCdUeXBlRXJyb3InLFxuICAgICAgICAgICdVbnN1cHBvcnRlZCB0eXBlIFwiJyArIGRlc2NyaXB0aW9uLnR5cGUgKyAnXCInKSk7XG4gICAgfVxuXG4gICAgaWYgKCFpc0FjdGlvbkFsbG93ZWRJblNpZ25hbGluZ1N0YXRlKCdzZXRMb2NhbERlc2NyaXB0aW9uJyxcbiAgICAgICAgZGVzY3JpcHRpb24udHlwZSwgcGMuc2lnbmFsaW5nU3RhdGUpIHx8IHBjLl9pc0Nsb3NlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG1ha2VFcnJvcignSW52YWxpZFN0YXRlRXJyb3InLFxuICAgICAgICAgICdDYW4gbm90IHNldCBsb2NhbCAnICsgZGVzY3JpcHRpb24udHlwZSArXG4gICAgICAgICAgJyBpbiBzdGF0ZSAnICsgcGMuc2lnbmFsaW5nU3RhdGUpKTtcbiAgICB9XG5cbiAgICB2YXIgc2VjdGlvbnM7XG4gICAgdmFyIHNlc3Npb25wYXJ0O1xuICAgIGlmIChkZXNjcmlwdGlvbi50eXBlID09PSAnb2ZmZXInKSB7XG4gICAgICAvLyBWRVJZIGxpbWl0ZWQgc3VwcG9ydCBmb3IgU0RQIG11bmdpbmcuIExpbWl0ZWQgdG86XG4gICAgICAvLyAqIGNoYW5naW5nIHRoZSBvcmRlciBvZiBjb2RlY3NcbiAgICAgIHNlY3Rpb25zID0gU0RQVXRpbHMuc3BsaXRTZWN0aW9ucyhkZXNjcmlwdGlvbi5zZHApO1xuICAgICAgc2Vzc2lvbnBhcnQgPSBzZWN0aW9ucy5zaGlmdCgpO1xuICAgICAgc2VjdGlvbnMuZm9yRWFjaChmdW5jdGlvbihtZWRpYVNlY3Rpb24sIHNkcE1MaW5lSW5kZXgpIHtcbiAgICAgICAgdmFyIGNhcHMgPSBTRFBVdGlscy5wYXJzZVJ0cFBhcmFtZXRlcnMobWVkaWFTZWN0aW9uKTtcbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmxvY2FsQ2FwYWJpbGl0aWVzID0gY2FwcztcbiAgICAgIH0pO1xuXG4gICAgICBwYy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlciwgc2RwTUxpbmVJbmRleCkge1xuICAgICAgICBwYy5fZ2F0aGVyKHRyYW5zY2VpdmVyLm1pZCwgc2RwTUxpbmVJbmRleCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGRlc2NyaXB0aW9uLnR5cGUgPT09ICdhbnN3ZXInKSB7XG4gICAgICBzZWN0aW9ucyA9IFNEUFV0aWxzLnNwbGl0U2VjdGlvbnMocGMucmVtb3RlRGVzY3JpcHRpb24uc2RwKTtcbiAgICAgIHNlc3Npb25wYXJ0ID0gc2VjdGlvbnMuc2hpZnQoKTtcbiAgICAgIHZhciBpc0ljZUxpdGUgPSBTRFBVdGlscy5tYXRjaFByZWZpeChzZXNzaW9ucGFydCxcbiAgICAgICAgICAnYT1pY2UtbGl0ZScpLmxlbmd0aCA+IDA7XG4gICAgICBzZWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKG1lZGlhU2VjdGlvbiwgc2RwTUxpbmVJbmRleCkge1xuICAgICAgICB2YXIgdHJhbnNjZWl2ZXIgPSBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF07XG4gICAgICAgIHZhciBpY2VHYXRoZXJlciA9IHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyO1xuICAgICAgICB2YXIgaWNlVHJhbnNwb3J0ID0gdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0O1xuICAgICAgICB2YXIgZHRsc1RyYW5zcG9ydCA9IHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQ7XG4gICAgICAgIHZhciBsb2NhbENhcGFiaWxpdGllcyA9IHRyYW5zY2VpdmVyLmxvY2FsQ2FwYWJpbGl0aWVzO1xuICAgICAgICB2YXIgcmVtb3RlQ2FwYWJpbGl0aWVzID0gdHJhbnNjZWl2ZXIucmVtb3RlQ2FwYWJpbGl0aWVzO1xuXG4gICAgICAgIC8vIHRyZWF0IGJ1bmRsZS1vbmx5IGFzIG5vdC1yZWplY3RlZC5cbiAgICAgICAgdmFyIHJlamVjdGVkID0gU0RQVXRpbHMuaXNSZWplY3RlZChtZWRpYVNlY3Rpb24pICYmXG4gICAgICAgICAgICBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPWJ1bmRsZS1vbmx5JykubGVuZ3RoID09PSAwO1xuXG4gICAgICAgIGlmICghcmVqZWN0ZWQgJiYgIXRyYW5zY2VpdmVyLnJlamVjdGVkKSB7XG4gICAgICAgICAgdmFyIHJlbW90ZUljZVBhcmFtZXRlcnMgPSBTRFBVdGlscy5nZXRJY2VQYXJhbWV0ZXJzKFxuICAgICAgICAgICAgICBtZWRpYVNlY3Rpb24sIHNlc3Npb25wYXJ0KTtcbiAgICAgICAgICB2YXIgcmVtb3RlRHRsc1BhcmFtZXRlcnMgPSBTRFBVdGlscy5nZXREdGxzUGFyYW1ldGVycyhcbiAgICAgICAgICAgICAgbWVkaWFTZWN0aW9uLCBzZXNzaW9ucGFydCk7XG4gICAgICAgICAgaWYgKGlzSWNlTGl0ZSkge1xuICAgICAgICAgICAgcmVtb3RlRHRsc1BhcmFtZXRlcnMucm9sZSA9ICdzZXJ2ZXInO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghcGMudXNpbmdCdW5kbGUgfHwgc2RwTUxpbmVJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgcGMuX2dhdGhlcih0cmFuc2NlaXZlci5taWQsIHNkcE1MaW5lSW5kZXgpO1xuICAgICAgICAgICAgaWYgKGljZVRyYW5zcG9ydC5zdGF0ZSA9PT0gJ25ldycpIHtcbiAgICAgICAgICAgICAgaWNlVHJhbnNwb3J0LnN0YXJ0KGljZUdhdGhlcmVyLCByZW1vdGVJY2VQYXJhbWV0ZXJzLFxuICAgICAgICAgICAgICAgICAgaXNJY2VMaXRlID8gJ2NvbnRyb2xsaW5nJyA6ICdjb250cm9sbGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZHRsc1RyYW5zcG9ydC5zdGF0ZSA9PT0gJ25ldycpIHtcbiAgICAgICAgICAgICAgZHRsc1RyYW5zcG9ydC5zdGFydChyZW1vdGVEdGxzUGFyYW1ldGVycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gQ2FsY3VsYXRlIGludGVyc2VjdGlvbiBvZiBjYXBhYmlsaXRpZXMuXG4gICAgICAgICAgdmFyIHBhcmFtcyA9IGdldENvbW1vbkNhcGFiaWxpdGllcyhsb2NhbENhcGFiaWxpdGllcyxcbiAgICAgICAgICAgICAgcmVtb3RlQ2FwYWJpbGl0aWVzKTtcblxuICAgICAgICAgIC8vIFN0YXJ0IHRoZSBSVENSdHBTZW5kZXIuIFRoZSBSVENSdHBSZWNlaXZlciBmb3IgdGhpc1xuICAgICAgICAgIC8vIHRyYW5zY2VpdmVyIGhhcyBhbHJlYWR5IGJlZW4gc3RhcnRlZCBpbiBzZXRSZW1vdGVEZXNjcmlwdGlvbi5cbiAgICAgICAgICBwYy5fdHJhbnNjZWl2ZSh0cmFuc2NlaXZlcixcbiAgICAgICAgICAgICAgcGFyYW1zLmNvZGVjcy5sZW5ndGggPiAwLFxuICAgICAgICAgICAgICBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHBjLmxvY2FsRGVzY3JpcHRpb24gPSB7XG4gICAgICB0eXBlOiBkZXNjcmlwdGlvbi50eXBlLFxuICAgICAgc2RwOiBkZXNjcmlwdGlvbi5zZHBcbiAgICB9O1xuICAgIGlmIChkZXNjcmlwdGlvbi50eXBlID09PSAnb2ZmZXInKSB7XG4gICAgICBwYy5fdXBkYXRlU2lnbmFsaW5nU3RhdGUoJ2hhdmUtbG9jYWwtb2ZmZXInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGMuX3VwZGF0ZVNpZ25hbGluZ1N0YXRlKCdzdGFibGUnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnNldFJlbW90ZURlc2NyaXB0aW9uID0gZnVuY3Rpb24oZGVzY3JpcHRpb24pIHtcbiAgICB2YXIgcGMgPSB0aGlzO1xuXG4gICAgLy8gTm90ZTogcHJhbnN3ZXIgaXMgbm90IHN1cHBvcnRlZC5cbiAgICBpZiAoWydvZmZlcicsICdhbnN3ZXInXS5pbmRleE9mKGRlc2NyaXB0aW9uLnR5cGUpID09PSAtMSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG1ha2VFcnJvcignVHlwZUVycm9yJyxcbiAgICAgICAgICAnVW5zdXBwb3J0ZWQgdHlwZSBcIicgKyBkZXNjcmlwdGlvbi50eXBlICsgJ1wiJykpO1xuICAgIH1cblxuICAgIGlmICghaXNBY3Rpb25BbGxvd2VkSW5TaWduYWxpbmdTdGF0ZSgnc2V0UmVtb3RlRGVzY3JpcHRpb24nLFxuICAgICAgICBkZXNjcmlwdGlvbi50eXBlLCBwYy5zaWduYWxpbmdTdGF0ZSkgfHwgcGMuX2lzQ2xvc2VkKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobWFrZUVycm9yKCdJbnZhbGlkU3RhdGVFcnJvcicsXG4gICAgICAgICAgJ0NhbiBub3Qgc2V0IHJlbW90ZSAnICsgZGVzY3JpcHRpb24udHlwZSArXG4gICAgICAgICAgJyBpbiBzdGF0ZSAnICsgcGMuc2lnbmFsaW5nU3RhdGUpKTtcbiAgICB9XG5cbiAgICB2YXIgc3RyZWFtcyA9IHt9O1xuICAgIHBjLnJlbW90ZVN0cmVhbXMuZm9yRWFjaChmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgIHN0cmVhbXNbc3RyZWFtLmlkXSA9IHN0cmVhbTtcbiAgICB9KTtcbiAgICB2YXIgcmVjZWl2ZXJMaXN0ID0gW107XG4gICAgdmFyIHNlY3Rpb25zID0gU0RQVXRpbHMuc3BsaXRTZWN0aW9ucyhkZXNjcmlwdGlvbi5zZHApO1xuICAgIHZhciBzZXNzaW9ucGFydCA9IHNlY3Rpb25zLnNoaWZ0KCk7XG4gICAgdmFyIGlzSWNlTGl0ZSA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KHNlc3Npb25wYXJ0LFxuICAgICAgICAnYT1pY2UtbGl0ZScpLmxlbmd0aCA+IDA7XG4gICAgdmFyIHVzaW5nQnVuZGxlID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgoc2Vzc2lvbnBhcnQsXG4gICAgICAgICdhPWdyb3VwOkJVTkRMRSAnKS5sZW5ndGggPiAwO1xuICAgIHBjLnVzaW5nQnVuZGxlID0gdXNpbmdCdW5kbGU7XG4gICAgdmFyIGljZU9wdGlvbnMgPSBTRFBVdGlscy5tYXRjaFByZWZpeChzZXNzaW9ucGFydCxcbiAgICAgICAgJ2E9aWNlLW9wdGlvbnM6JylbMF07XG4gICAgaWYgKGljZU9wdGlvbnMpIHtcbiAgICAgIHBjLmNhblRyaWNrbGVJY2VDYW5kaWRhdGVzID0gaWNlT3B0aW9ucy5zdWJzdHIoMTQpLnNwbGl0KCcgJylcbiAgICAgICAgICAuaW5kZXhPZigndHJpY2tsZScpID49IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBjLmNhblRyaWNrbGVJY2VDYW5kaWRhdGVzID0gZmFsc2U7XG4gICAgfVxuXG4gICAgc2VjdGlvbnMuZm9yRWFjaChmdW5jdGlvbihtZWRpYVNlY3Rpb24sIHNkcE1MaW5lSW5kZXgpIHtcbiAgICAgIHZhciBsaW5lcyA9IFNEUFV0aWxzLnNwbGl0TGluZXMobWVkaWFTZWN0aW9uKTtcbiAgICAgIHZhciBraW5kID0gU0RQVXRpbHMuZ2V0S2luZChtZWRpYVNlY3Rpb24pO1xuICAgICAgLy8gdHJlYXQgYnVuZGxlLW9ubHkgYXMgbm90LXJlamVjdGVkLlxuICAgICAgdmFyIHJlamVjdGVkID0gU0RQVXRpbHMuaXNSZWplY3RlZChtZWRpYVNlY3Rpb24pICYmXG4gICAgICAgICAgU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1idW5kbGUtb25seScpLmxlbmd0aCA9PT0gMDtcbiAgICAgIHZhciBwcm90b2NvbCA9IGxpbmVzWzBdLnN1YnN0cigyKS5zcGxpdCgnICcpWzJdO1xuXG4gICAgICB2YXIgZGlyZWN0aW9uID0gU0RQVXRpbHMuZ2V0RGlyZWN0aW9uKG1lZGlhU2VjdGlvbiwgc2Vzc2lvbnBhcnQpO1xuICAgICAgdmFyIHJlbW90ZU1zaWQgPSBTRFBVdGlscy5wYXJzZU1zaWQobWVkaWFTZWN0aW9uKTtcblxuICAgICAgdmFyIG1pZCA9IFNEUFV0aWxzLmdldE1pZChtZWRpYVNlY3Rpb24pIHx8IFNEUFV0aWxzLmdlbmVyYXRlSWRlbnRpZmllcigpO1xuXG4gICAgICAvLyBSZWplY3QgZGF0YWNoYW5uZWxzIHdoaWNoIGFyZSBub3QgaW1wbGVtZW50ZWQgeWV0LlxuICAgICAgaWYgKChraW5kID09PSAnYXBwbGljYXRpb24nICYmIHByb3RvY29sID09PSAnRFRMUy9TQ1RQJykgfHwgcmVqZWN0ZWQpIHtcbiAgICAgICAgLy8gVE9ETzogdGhpcyBpcyBkYW5nZXJvdXMgaW4gdGhlIGNhc2Ugd2hlcmUgYSBub24tcmVqZWN0ZWQgbS1saW5lXG4gICAgICAgIC8vICAgICBiZWNvbWVzIHJlamVjdGVkLlxuICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0gPSB7XG4gICAgICAgICAgbWlkOiBtaWQsXG4gICAgICAgICAga2luZDoga2luZCxcbiAgICAgICAgICByZWplY3RlZDogdHJ1ZVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICghcmVqZWN0ZWQgJiYgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdICYmXG4gICAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLnJlamVjdGVkKSB7XG4gICAgICAgIC8vIHJlY3ljbGUgYSByZWplY3RlZCB0cmFuc2NlaXZlci5cbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdID0gcGMuX2NyZWF0ZVRyYW5zY2VpdmVyKGtpbmQsIHRydWUpO1xuICAgICAgfVxuXG4gICAgICB2YXIgdHJhbnNjZWl2ZXI7XG4gICAgICB2YXIgaWNlR2F0aGVyZXI7XG4gICAgICB2YXIgaWNlVHJhbnNwb3J0O1xuICAgICAgdmFyIGR0bHNUcmFuc3BvcnQ7XG4gICAgICB2YXIgcnRwUmVjZWl2ZXI7XG4gICAgICB2YXIgc2VuZEVuY29kaW5nUGFyYW1ldGVycztcbiAgICAgIHZhciByZWN2RW5jb2RpbmdQYXJhbWV0ZXJzO1xuICAgICAgdmFyIGxvY2FsQ2FwYWJpbGl0aWVzO1xuXG4gICAgICB2YXIgdHJhY2s7XG4gICAgICAvLyBGSVhNRTogZW5zdXJlIHRoZSBtZWRpYVNlY3Rpb24gaGFzIHJ0Y3AtbXV4IHNldC5cbiAgICAgIHZhciByZW1vdGVDYXBhYmlsaXRpZXMgPSBTRFBVdGlscy5wYXJzZVJ0cFBhcmFtZXRlcnMobWVkaWFTZWN0aW9uKTtcbiAgICAgIHZhciByZW1vdGVJY2VQYXJhbWV0ZXJzO1xuICAgICAgdmFyIHJlbW90ZUR0bHNQYXJhbWV0ZXJzO1xuICAgICAgaWYgKCFyZWplY3RlZCkge1xuICAgICAgICByZW1vdGVJY2VQYXJhbWV0ZXJzID0gU0RQVXRpbHMuZ2V0SWNlUGFyYW1ldGVycyhtZWRpYVNlY3Rpb24sXG4gICAgICAgICAgICBzZXNzaW9ucGFydCk7XG4gICAgICAgIHJlbW90ZUR0bHNQYXJhbWV0ZXJzID0gU0RQVXRpbHMuZ2V0RHRsc1BhcmFtZXRlcnMobWVkaWFTZWN0aW9uLFxuICAgICAgICAgICAgc2Vzc2lvbnBhcnQpO1xuICAgICAgICByZW1vdGVEdGxzUGFyYW1ldGVycy5yb2xlID0gJ2NsaWVudCc7XG4gICAgICB9XG4gICAgICByZWN2RW5jb2RpbmdQYXJhbWV0ZXJzID1cbiAgICAgICAgICBTRFBVdGlscy5wYXJzZVJ0cEVuY29kaW5nUGFyYW1ldGVycyhtZWRpYVNlY3Rpb24pO1xuXG4gICAgICB2YXIgcnRjcFBhcmFtZXRlcnMgPSBTRFBVdGlscy5wYXJzZVJ0Y3BQYXJhbWV0ZXJzKG1lZGlhU2VjdGlvbik7XG5cbiAgICAgIHZhciBpc0NvbXBsZXRlID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLFxuICAgICAgICAgICdhPWVuZC1vZi1jYW5kaWRhdGVzJywgc2Vzc2lvbnBhcnQpLmxlbmd0aCA+IDA7XG4gICAgICB2YXIgY2FuZHMgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPWNhbmRpZGF0ZTonKVxuICAgICAgICAgIC5tYXAoZnVuY3Rpb24oY2FuZCkge1xuICAgICAgICAgICAgcmV0dXJuIFNEUFV0aWxzLnBhcnNlQ2FuZGlkYXRlKGNhbmQpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmZpbHRlcihmdW5jdGlvbihjYW5kKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FuZC5jb21wb25lbnQgPT09IDE7XG4gICAgICAgICAgfSk7XG5cbiAgICAgIC8vIENoZWNrIGlmIHdlIGNhbiB1c2UgQlVORExFIGFuZCBkaXNwb3NlIHRyYW5zcG9ydHMuXG4gICAgICBpZiAoKGRlc2NyaXB0aW9uLnR5cGUgPT09ICdvZmZlcicgfHwgZGVzY3JpcHRpb24udHlwZSA9PT0gJ2Fuc3dlcicpICYmXG4gICAgICAgICAgIXJlamVjdGVkICYmIHVzaW5nQnVuZGxlICYmIHNkcE1MaW5lSW5kZXggPiAwICYmXG4gICAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdKSB7XG4gICAgICAgIHBjLl9kaXNwb3NlSWNlQW5kRHRsc1RyYW5zcG9ydHMoc2RwTUxpbmVJbmRleCk7XG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5pY2VHYXRoZXJlciA9XG4gICAgICAgICAgICBwYy50cmFuc2NlaXZlcnNbMF0uaWNlR2F0aGVyZXI7XG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5pY2VUcmFuc3BvcnQgPVxuICAgICAgICAgICAgcGMudHJhbnNjZWl2ZXJzWzBdLmljZVRyYW5zcG9ydDtcbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmR0bHNUcmFuc3BvcnQgPVxuICAgICAgICAgICAgcGMudHJhbnNjZWl2ZXJzWzBdLmR0bHNUcmFuc3BvcnQ7XG4gICAgICAgIGlmIChwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0ucnRwU2VuZGVyKSB7XG4gICAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLnJ0cFNlbmRlci5zZXRUcmFuc3BvcnQoXG4gICAgICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1swXS5kdGxzVHJhbnNwb3J0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLnJ0cFJlY2VpdmVyKSB7XG4gICAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLnJ0cFJlY2VpdmVyLnNldFRyYW5zcG9ydChcbiAgICAgICAgICAgICAgcGMudHJhbnNjZWl2ZXJzWzBdLmR0bHNUcmFuc3BvcnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZGVzY3JpcHRpb24udHlwZSA9PT0gJ29mZmVyJyAmJiAhcmVqZWN0ZWQpIHtcbiAgICAgICAgdHJhbnNjZWl2ZXIgPSBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0gfHxcbiAgICAgICAgICAgIHBjLl9jcmVhdGVUcmFuc2NlaXZlcihraW5kKTtcbiAgICAgICAgdHJhbnNjZWl2ZXIubWlkID0gbWlkO1xuXG4gICAgICAgIGlmICghdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIpIHtcbiAgICAgICAgICB0cmFuc2NlaXZlci5pY2VHYXRoZXJlciA9IHBjLl9jcmVhdGVJY2VHYXRoZXJlcihzZHBNTGluZUluZGV4LFxuICAgICAgICAgICAgICB1c2luZ0J1bmRsZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2FuZHMubGVuZ3RoICYmIHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydC5zdGF0ZSA9PT0gJ25ldycpIHtcbiAgICAgICAgICBpZiAoaXNDb21wbGV0ZSAmJiAoIXVzaW5nQnVuZGxlIHx8IHNkcE1MaW5lSW5kZXggPT09IDApKSB7XG4gICAgICAgICAgICB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQuc2V0UmVtb3RlQ2FuZGlkYXRlcyhjYW5kcyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhbmRzLmZvckVhY2goZnVuY3Rpb24oY2FuZGlkYXRlKSB7XG4gICAgICAgICAgICAgIG1heWJlQWRkQ2FuZGlkYXRlKHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydCwgY2FuZGlkYXRlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxvY2FsQ2FwYWJpbGl0aWVzID0gd2luZG93LlJUQ1J0cFJlY2VpdmVyLmdldENhcGFiaWxpdGllcyhraW5kKTtcblxuICAgICAgICAvLyBmaWx0ZXIgUlRYIHVudGlsIGFkZGl0aW9uYWwgc3R1ZmYgbmVlZGVkIGZvciBSVFggaXMgaW1wbGVtZW50ZWRcbiAgICAgICAgLy8gaW4gYWRhcHRlci5qc1xuICAgICAgICBpZiAoZWRnZVZlcnNpb24gPCAxNTAxOSkge1xuICAgICAgICAgIGxvY2FsQ2FwYWJpbGl0aWVzLmNvZGVjcyA9IGxvY2FsQ2FwYWJpbGl0aWVzLmNvZGVjcy5maWx0ZXIoXG4gICAgICAgICAgICAgIGZ1bmN0aW9uKGNvZGVjKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvZGVjLm5hbWUgIT09ICdydHgnO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbmRFbmNvZGluZ1BhcmFtZXRlcnMgPSB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzIHx8IFt7XG4gICAgICAgICAgc3NyYzogKDIgKiBzZHBNTGluZUluZGV4ICsgMikgKiAxMDAxXG4gICAgICAgIH1dO1xuXG4gICAgICAgIC8vIFRPRE86IHJld3JpdGUgdG8gdXNlIGh0dHA6Ly93M2MuZ2l0aHViLmlvL3dlYnJ0Yy1wYy8jc2V0LWFzc29jaWF0ZWQtcmVtb3RlLXN0cmVhbXNcbiAgICAgICAgdmFyIGlzTmV3VHJhY2sgPSBmYWxzZTtcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3NlbmRyZWN2JyB8fCBkaXJlY3Rpb24gPT09ICdzZW5kb25seScpIHtcbiAgICAgICAgICBpc05ld1RyYWNrID0gIXRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyO1xuICAgICAgICAgIHJ0cFJlY2VpdmVyID0gdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIgfHxcbiAgICAgICAgICAgICAgbmV3IHdpbmRvdy5SVENSdHBSZWNlaXZlcih0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0LCBraW5kKTtcblxuICAgICAgICAgIGlmIChpc05ld1RyYWNrKSB7XG4gICAgICAgICAgICB2YXIgc3RyZWFtO1xuICAgICAgICAgICAgdHJhY2sgPSBydHBSZWNlaXZlci50cmFjaztcbiAgICAgICAgICAgIC8vIEZJWE1FOiBkb2VzIG5vdCB3b3JrIHdpdGggUGxhbiBCLlxuICAgICAgICAgICAgaWYgKHJlbW90ZU1zaWQgJiYgcmVtb3RlTXNpZC5zdHJlYW0gPT09ICctJykge1xuICAgICAgICAgICAgICAvLyBuby1vcC4gYSBzdHJlYW0gaWQgb2YgJy0nIG1lYW5zOiBubyBhc3NvY2lhdGVkIHN0cmVhbS5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVtb3RlTXNpZCkge1xuICAgICAgICAgICAgICBpZiAoIXN0cmVhbXNbcmVtb3RlTXNpZC5zdHJlYW1dKSB7XG4gICAgICAgICAgICAgICAgc3RyZWFtc1tyZW1vdGVNc2lkLnN0cmVhbV0gPSBuZXcgd2luZG93Lk1lZGlhU3RyZWFtKCk7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHN0cmVhbXNbcmVtb3RlTXNpZC5zdHJlYW1dLCAnaWQnLCB7XG4gICAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVtb3RlTXNpZC5zdHJlYW07XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRyYWNrLCAnaWQnLCB7XG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiByZW1vdGVNc2lkLnRyYWNrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHN0cmVhbSA9IHN0cmVhbXNbcmVtb3RlTXNpZC5zdHJlYW1dO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKCFzdHJlYW1zLmRlZmF1bHQpIHtcbiAgICAgICAgICAgICAgICBzdHJlYW1zLmRlZmF1bHQgPSBuZXcgd2luZG93Lk1lZGlhU3RyZWFtKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc3RyZWFtID0gc3RyZWFtcy5kZWZhdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN0cmVhbSkge1xuICAgICAgICAgICAgICBhZGRUcmFja1RvU3RyZWFtQW5kRmlyZUV2ZW50KHRyYWNrLCBzdHJlYW0pO1xuICAgICAgICAgICAgICB0cmFuc2NlaXZlci5hc3NvY2lhdGVkUmVtb3RlTWVkaWFTdHJlYW1zLnB1c2goc3RyZWFtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlY2VpdmVyTGlzdC5wdXNoKFt0cmFjaywgcnRwUmVjZWl2ZXIsIHN0cmVhbV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0cmFuc2NlaXZlci5ydHBSZWNlaXZlciAmJiB0cmFuc2NlaXZlci5ydHBSZWNlaXZlci50cmFjaykge1xuICAgICAgICAgIHRyYW5zY2VpdmVyLmFzc29jaWF0ZWRSZW1vdGVNZWRpYVN0cmVhbXMuZm9yRWFjaChmdW5jdGlvbihzKSB7XG4gICAgICAgICAgICB2YXIgbmF0aXZlVHJhY2sgPSBzLmdldFRyYWNrcygpLmZpbmQoZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgICByZXR1cm4gdC5pZCA9PT0gdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIudHJhY2suaWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChuYXRpdmVUcmFjaykge1xuICAgICAgICAgICAgICByZW1vdmVUcmFja0Zyb21TdHJlYW1BbmRGaXJlRXZlbnQobmF0aXZlVHJhY2ssIHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRyYW5zY2VpdmVyLmFzc29jaWF0ZWRSZW1vdGVNZWRpYVN0cmVhbXMgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyYW5zY2VpdmVyLmxvY2FsQ2FwYWJpbGl0aWVzID0gbG9jYWxDYXBhYmlsaXRpZXM7XG4gICAgICAgIHRyYW5zY2VpdmVyLnJlbW90ZUNhcGFiaWxpdGllcyA9IHJlbW90ZUNhcGFiaWxpdGllcztcbiAgICAgICAgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIgPSBydHBSZWNlaXZlcjtcbiAgICAgICAgdHJhbnNjZWl2ZXIucnRjcFBhcmFtZXRlcnMgPSBydGNwUGFyYW1ldGVycztcbiAgICAgICAgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVycyA9IHNlbmRFbmNvZGluZ1BhcmFtZXRlcnM7XG4gICAgICAgIHRyYW5zY2VpdmVyLnJlY3ZFbmNvZGluZ1BhcmFtZXRlcnMgPSByZWN2RW5jb2RpbmdQYXJhbWV0ZXJzO1xuXG4gICAgICAgIC8vIFN0YXJ0IHRoZSBSVENSdHBSZWNlaXZlciBub3cuIFRoZSBSVFBTZW5kZXIgaXMgc3RhcnRlZCBpblxuICAgICAgICAvLyBzZXRMb2NhbERlc2NyaXB0aW9uLlxuICAgICAgICBwYy5fdHJhbnNjZWl2ZShwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0sXG4gICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgIGlzTmV3VHJhY2spO1xuICAgICAgfSBlbHNlIGlmIChkZXNjcmlwdGlvbi50eXBlID09PSAnYW5zd2VyJyAmJiAhcmVqZWN0ZWQpIHtcbiAgICAgICAgdHJhbnNjZWl2ZXIgPSBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF07XG4gICAgICAgIGljZUdhdGhlcmVyID0gdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXI7XG4gICAgICAgIGljZVRyYW5zcG9ydCA9IHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydDtcbiAgICAgICAgZHRsc1RyYW5zcG9ydCA9IHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQ7XG4gICAgICAgIHJ0cFJlY2VpdmVyID0gdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXI7XG4gICAgICAgIHNlbmRFbmNvZGluZ1BhcmFtZXRlcnMgPSB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzO1xuICAgICAgICBsb2NhbENhcGFiaWxpdGllcyA9IHRyYW5zY2VpdmVyLmxvY2FsQ2FwYWJpbGl0aWVzO1xuXG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5yZWN2RW5jb2RpbmdQYXJhbWV0ZXJzID1cbiAgICAgICAgICAgIHJlY3ZFbmNvZGluZ1BhcmFtZXRlcnM7XG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5yZW1vdGVDYXBhYmlsaXRpZXMgPVxuICAgICAgICAgICAgcmVtb3RlQ2FwYWJpbGl0aWVzO1xuICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0ucnRjcFBhcmFtZXRlcnMgPSBydGNwUGFyYW1ldGVycztcblxuICAgICAgICBpZiAoY2FuZHMubGVuZ3RoICYmIGljZVRyYW5zcG9ydC5zdGF0ZSA9PT0gJ25ldycpIHtcbiAgICAgICAgICBpZiAoKGlzSWNlTGl0ZSB8fCBpc0NvbXBsZXRlKSAmJlxuICAgICAgICAgICAgICAoIXVzaW5nQnVuZGxlIHx8IHNkcE1MaW5lSW5kZXggPT09IDApKSB7XG4gICAgICAgICAgICBpY2VUcmFuc3BvcnQuc2V0UmVtb3RlQ2FuZGlkYXRlcyhjYW5kcyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhbmRzLmZvckVhY2goZnVuY3Rpb24oY2FuZGlkYXRlKSB7XG4gICAgICAgICAgICAgIG1heWJlQWRkQ2FuZGlkYXRlKHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydCwgY2FuZGlkYXRlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdXNpbmdCdW5kbGUgfHwgc2RwTUxpbmVJbmRleCA9PT0gMCkge1xuICAgICAgICAgIGlmIChpY2VUcmFuc3BvcnQuc3RhdGUgPT09ICduZXcnKSB7XG4gICAgICAgICAgICBpY2VUcmFuc3BvcnQuc3RhcnQoaWNlR2F0aGVyZXIsIHJlbW90ZUljZVBhcmFtZXRlcnMsXG4gICAgICAgICAgICAgICAgJ2NvbnRyb2xsaW5nJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChkdGxzVHJhbnNwb3J0LnN0YXRlID09PSAnbmV3Jykge1xuICAgICAgICAgICAgZHRsc1RyYW5zcG9ydC5zdGFydChyZW1vdGVEdGxzUGFyYW1ldGVycyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcGMuX3RyYW5zY2VpdmUodHJhbnNjZWl2ZXIsXG4gICAgICAgICAgICBkaXJlY3Rpb24gPT09ICdzZW5kcmVjdicgfHwgZGlyZWN0aW9uID09PSAncmVjdm9ubHknLFxuICAgICAgICAgICAgZGlyZWN0aW9uID09PSAnc2VuZHJlY3YnIHx8IGRpcmVjdGlvbiA9PT0gJ3NlbmRvbmx5Jyk7XG5cbiAgICAgICAgLy8gVE9ETzogcmV3cml0ZSB0byB1c2UgaHR0cDovL3czYy5naXRodWIuaW8vd2VicnRjLXBjLyNzZXQtYXNzb2NpYXRlZC1yZW1vdGUtc3RyZWFtc1xuICAgICAgICBpZiAocnRwUmVjZWl2ZXIgJiZcbiAgICAgICAgICAgIChkaXJlY3Rpb24gPT09ICdzZW5kcmVjdicgfHwgZGlyZWN0aW9uID09PSAnc2VuZG9ubHknKSkge1xuICAgICAgICAgIHRyYWNrID0gcnRwUmVjZWl2ZXIudHJhY2s7XG4gICAgICAgICAgaWYgKHJlbW90ZU1zaWQpIHtcbiAgICAgICAgICAgIGlmICghc3RyZWFtc1tyZW1vdGVNc2lkLnN0cmVhbV0pIHtcbiAgICAgICAgICAgICAgc3RyZWFtc1tyZW1vdGVNc2lkLnN0cmVhbV0gPSBuZXcgd2luZG93Lk1lZGlhU3RyZWFtKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhZGRUcmFja1RvU3RyZWFtQW5kRmlyZUV2ZW50KHRyYWNrLCBzdHJlYW1zW3JlbW90ZU1zaWQuc3RyZWFtXSk7XG4gICAgICAgICAgICByZWNlaXZlckxpc3QucHVzaChbdHJhY2ssIHJ0cFJlY2VpdmVyLCBzdHJlYW1zW3JlbW90ZU1zaWQuc3RyZWFtXV0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXN0cmVhbXMuZGVmYXVsdCkge1xuICAgICAgICAgICAgICBzdHJlYW1zLmRlZmF1bHQgPSBuZXcgd2luZG93Lk1lZGlhU3RyZWFtKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhZGRUcmFja1RvU3RyZWFtQW5kRmlyZUV2ZW50KHRyYWNrLCBzdHJlYW1zLmRlZmF1bHQpO1xuICAgICAgICAgICAgcmVjZWl2ZXJMaXN0LnB1c2goW3RyYWNrLCBydHBSZWNlaXZlciwgc3RyZWFtcy5kZWZhdWx0XSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIEZJWE1FOiBhY3R1YWxseSB0aGUgcmVjZWl2ZXIgc2hvdWxkIGJlIGNyZWF0ZWQgbGF0ZXIuXG4gICAgICAgICAgZGVsZXRlIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAocGMuX2R0bHNSb2xlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHBjLl9kdGxzUm9sZSA9IGRlc2NyaXB0aW9uLnR5cGUgPT09ICdvZmZlcicgPyAnYWN0aXZlJyA6ICdwYXNzaXZlJztcbiAgICB9XG5cbiAgICBwYy5yZW1vdGVEZXNjcmlwdGlvbiA9IHtcbiAgICAgIHR5cGU6IGRlc2NyaXB0aW9uLnR5cGUsXG4gICAgICBzZHA6IGRlc2NyaXB0aW9uLnNkcFxuICAgIH07XG4gICAgaWYgKGRlc2NyaXB0aW9uLnR5cGUgPT09ICdvZmZlcicpIHtcbiAgICAgIHBjLl91cGRhdGVTaWduYWxpbmdTdGF0ZSgnaGF2ZS1yZW1vdGUtb2ZmZXInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGMuX3VwZGF0ZVNpZ25hbGluZ1N0YXRlKCdzdGFibGUnKTtcbiAgICB9XG4gICAgT2JqZWN0LmtleXMoc3RyZWFtcykuZm9yRWFjaChmdW5jdGlvbihzaWQpIHtcbiAgICAgIHZhciBzdHJlYW0gPSBzdHJlYW1zW3NpZF07XG4gICAgICBpZiAoc3RyZWFtLmdldFRyYWNrcygpLmxlbmd0aCkge1xuICAgICAgICBpZiAocGMucmVtb3RlU3RyZWFtcy5pbmRleE9mKHN0cmVhbSkgPT09IC0xKSB7XG4gICAgICAgICAgcGMucmVtb3RlU3RyZWFtcy5wdXNoKHN0cmVhbSk7XG4gICAgICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdhZGRzdHJlYW0nKTtcbiAgICAgICAgICBldmVudC5zdHJlYW0gPSBzdHJlYW07XG4gICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBwYy5fZGlzcGF0Y2hFdmVudCgnYWRkc3RyZWFtJywgZXZlbnQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVjZWl2ZXJMaXN0LmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgIHZhciB0cmFjayA9IGl0ZW1bMF07XG4gICAgICAgICAgdmFyIHJlY2VpdmVyID0gaXRlbVsxXTtcbiAgICAgICAgICBpZiAoc3RyZWFtLmlkICE9PSBpdGVtWzJdLmlkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGZpcmVBZGRUcmFjayhwYywgdHJhY2ssIHJlY2VpdmVyLCBbc3RyZWFtXSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJlY2VpdmVyTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGZpcmVBZGRUcmFjayhwYywgaXRlbVswXSwgaXRlbVsxXSwgW10pO1xuICAgIH0pO1xuXG4gICAgLy8gY2hlY2sgd2hldGhlciBhZGRJY2VDYW5kaWRhdGUoe30pIHdhcyBjYWxsZWQgd2l0aGluIGZvdXIgc2Vjb25kcyBhZnRlclxuICAgIC8vIHNldFJlbW90ZURlc2NyaXB0aW9uLlxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCEocGMgJiYgcGMudHJhbnNjZWl2ZXJzKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBwYy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xuICAgICAgICBpZiAodHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0ICYmXG4gICAgICAgICAgICB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQuc3RhdGUgPT09ICduZXcnICYmXG4gICAgICAgICAgICB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQuZ2V0UmVtb3RlQ2FuZGlkYXRlcygpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ1RpbWVvdXQgZm9yIGFkZFJlbW90ZUNhbmRpZGF0ZS4gQ29uc2lkZXIgc2VuZGluZyAnICtcbiAgICAgICAgICAgICAgJ2FuIGVuZC1vZi1jYW5kaWRhdGVzIG5vdGlmaWNhdGlvbicpO1xuICAgICAgICAgIHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydC5hZGRSZW1vdGVDYW5kaWRhdGUoe30pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCA0MDAwKTtcblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnRyYW5zY2VpdmVycy5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XG4gICAgICAvKiBub3QgeWV0XG4gICAgICBpZiAodHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIpIHtcbiAgICAgICAgdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIuY2xvc2UoKTtcbiAgICAgIH1cbiAgICAgICovXG4gICAgICBpZiAodHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0KSB7XG4gICAgICAgIHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydC5zdG9wKCk7XG4gICAgICB9XG4gICAgICBpZiAodHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydCkge1xuICAgICAgICB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0LnN0b3AoKTtcbiAgICAgIH1cbiAgICAgIGlmICh0cmFuc2NlaXZlci5ydHBTZW5kZXIpIHtcbiAgICAgICAgdHJhbnNjZWl2ZXIucnRwU2VuZGVyLnN0b3AoKTtcbiAgICAgIH1cbiAgICAgIGlmICh0cmFuc2NlaXZlci5ydHBSZWNlaXZlcikge1xuICAgICAgICB0cmFuc2NlaXZlci5ydHBSZWNlaXZlci5zdG9wKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgLy8gRklYTUU6IGNsZWFuIHVwIHRyYWNrcywgbG9jYWwgc3RyZWFtcywgcmVtb3RlIHN0cmVhbXMsIGV0Y1xuICAgIHRoaXMuX2lzQ2xvc2VkID0gdHJ1ZTtcbiAgICB0aGlzLl91cGRhdGVTaWduYWxpbmdTdGF0ZSgnY2xvc2VkJyk7XG4gIH07XG5cbiAgLy8gVXBkYXRlIHRoZSBzaWduYWxpbmcgc3RhdGUuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fdXBkYXRlU2lnbmFsaW5nU3RhdGUgPSBmdW5jdGlvbihuZXdTdGF0ZSkge1xuICAgIHRoaXMuc2lnbmFsaW5nU3RhdGUgPSBuZXdTdGF0ZTtcbiAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ3NpZ25hbGluZ3N0YXRlY2hhbmdlJyk7XG4gICAgdGhpcy5fZGlzcGF0Y2hFdmVudCgnc2lnbmFsaW5nc3RhdGVjaGFuZ2UnLCBldmVudCk7XG4gIH07XG5cbiAgLy8gRGV0ZXJtaW5lIHdoZXRoZXIgdG8gZmlyZSB0aGUgbmVnb3RpYXRpb25uZWVkZWQgZXZlbnQuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fbWF5YmVGaXJlTmVnb3RpYXRpb25OZWVkZWQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcGMgPSB0aGlzO1xuICAgIGlmICh0aGlzLnNpZ25hbGluZ1N0YXRlICE9PSAnc3RhYmxlJyB8fCB0aGlzLm5lZWROZWdvdGlhdGlvbiA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLm5lZWROZWdvdGlhdGlvbiA9IHRydWU7XG4gICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBpZiAocGMubmVlZE5lZ290aWF0aW9uKSB7XG4gICAgICAgIHBjLm5lZWROZWdvdGlhdGlvbiA9IGZhbHNlO1xuICAgICAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ25lZ290aWF0aW9ubmVlZGVkJyk7XG4gICAgICAgIHBjLl9kaXNwYXRjaEV2ZW50KCduZWdvdGlhdGlvbm5lZWRlZCcsIGV2ZW50KTtcbiAgICAgIH1cbiAgICB9LCAwKTtcbiAgfTtcblxuICAvLyBVcGRhdGUgdGhlIGljZSBjb25uZWN0aW9uIHN0YXRlLlxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX3VwZGF0ZUljZUNvbm5lY3Rpb25TdGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBuZXdTdGF0ZTtcbiAgICB2YXIgc3RhdGVzID0ge1xuICAgICAgJ25ldyc6IDAsXG4gICAgICBjbG9zZWQ6IDAsXG4gICAgICBjaGVja2luZzogMCxcbiAgICAgIGNvbm5lY3RlZDogMCxcbiAgICAgIGNvbXBsZXRlZDogMCxcbiAgICAgIGRpc2Nvbm5lY3RlZDogMCxcbiAgICAgIGZhaWxlZDogMFxuICAgIH07XG4gICAgdGhpcy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xuICAgICAgc3RhdGVzW3RyYW5zY2VpdmVyLmljZVRyYW5zcG9ydC5zdGF0ZV0rKztcbiAgICB9KTtcblxuICAgIG5ld1N0YXRlID0gJ25ldyc7XG4gICAgaWYgKHN0YXRlcy5mYWlsZWQgPiAwKSB7XG4gICAgICBuZXdTdGF0ZSA9ICdmYWlsZWQnO1xuICAgIH0gZWxzZSBpZiAoc3RhdGVzLmNoZWNraW5nID4gMCkge1xuICAgICAgbmV3U3RhdGUgPSAnY2hlY2tpbmcnO1xuICAgIH0gZWxzZSBpZiAoc3RhdGVzLmRpc2Nvbm5lY3RlZCA+IDApIHtcbiAgICAgIG5ld1N0YXRlID0gJ2Rpc2Nvbm5lY3RlZCc7XG4gICAgfSBlbHNlIGlmIChzdGF0ZXMubmV3ID4gMCkge1xuICAgICAgbmV3U3RhdGUgPSAnbmV3JztcbiAgICB9IGVsc2UgaWYgKHN0YXRlcy5jb25uZWN0ZWQgPiAwKSB7XG4gICAgICBuZXdTdGF0ZSA9ICdjb25uZWN0ZWQnO1xuICAgIH0gZWxzZSBpZiAoc3RhdGVzLmNvbXBsZXRlZCA+IDApIHtcbiAgICAgIG5ld1N0YXRlID0gJ2NvbXBsZXRlZCc7XG4gICAgfVxuXG4gICAgaWYgKG5ld1N0YXRlICE9PSB0aGlzLmljZUNvbm5lY3Rpb25TdGF0ZSkge1xuICAgICAgdGhpcy5pY2VDb25uZWN0aW9uU3RhdGUgPSBuZXdTdGF0ZTtcbiAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgnaWNlY29ubmVjdGlvbnN0YXRlY2hhbmdlJyk7XG4gICAgICB0aGlzLl9kaXNwYXRjaEV2ZW50KCdpY2Vjb25uZWN0aW9uc3RhdGVjaGFuZ2UnLCBldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIC8vIFVwZGF0ZSB0aGUgY29ubmVjdGlvbiBzdGF0ZS5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl91cGRhdGVDb25uZWN0aW9uU3RhdGUgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgbmV3U3RhdGU7XG4gICAgdmFyIHN0YXRlcyA9IHtcbiAgICAgICduZXcnOiAwLFxuICAgICAgY2xvc2VkOiAwLFxuICAgICAgY29ubmVjdGluZzogMCxcbiAgICAgIGNvbm5lY3RlZDogMCxcbiAgICAgIGNvbXBsZXRlZDogMCxcbiAgICAgIGRpc2Nvbm5lY3RlZDogMCxcbiAgICAgIGZhaWxlZDogMFxuICAgIH07XG4gICAgdGhpcy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xuICAgICAgc3RhdGVzW3RyYW5zY2VpdmVyLmljZVRyYW5zcG9ydC5zdGF0ZV0rKztcbiAgICAgIHN0YXRlc1t0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0LnN0YXRlXSsrO1xuICAgIH0pO1xuICAgIC8vIElDRVRyYW5zcG9ydC5jb21wbGV0ZWQgYW5kIGNvbm5lY3RlZCBhcmUgdGhlIHNhbWUgZm9yIHRoaXMgcHVycG9zZS5cbiAgICBzdGF0ZXMuY29ubmVjdGVkICs9IHN0YXRlcy5jb21wbGV0ZWQ7XG5cbiAgICBuZXdTdGF0ZSA9ICduZXcnO1xuICAgIGlmIChzdGF0ZXMuZmFpbGVkID4gMCkge1xuICAgICAgbmV3U3RhdGUgPSAnZmFpbGVkJztcbiAgICB9IGVsc2UgaWYgKHN0YXRlcy5jb25uZWN0aW5nID4gMCkge1xuICAgICAgbmV3U3RhdGUgPSAnY29ubmVjdGluZyc7XG4gICAgfSBlbHNlIGlmIChzdGF0ZXMuZGlzY29ubmVjdGVkID4gMCkge1xuICAgICAgbmV3U3RhdGUgPSAnZGlzY29ubmVjdGVkJztcbiAgICB9IGVsc2UgaWYgKHN0YXRlcy5uZXcgPiAwKSB7XG4gICAgICBuZXdTdGF0ZSA9ICduZXcnO1xuICAgIH0gZWxzZSBpZiAoc3RhdGVzLmNvbm5lY3RlZCA+IDApIHtcbiAgICAgIG5ld1N0YXRlID0gJ2Nvbm5lY3RlZCc7XG4gICAgfVxuXG4gICAgaWYgKG5ld1N0YXRlICE9PSB0aGlzLmNvbm5lY3Rpb25TdGF0ZSkge1xuICAgICAgdGhpcy5jb25uZWN0aW9uU3RhdGUgPSBuZXdTdGF0ZTtcbiAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgnY29ubmVjdGlvbnN0YXRlY2hhbmdlJyk7XG4gICAgICB0aGlzLl9kaXNwYXRjaEV2ZW50KCdjb25uZWN0aW9uc3RhdGVjaGFuZ2UnLCBldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5jcmVhdGVPZmZlciA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBwYyA9IHRoaXM7XG5cbiAgICBpZiAocGMuX2lzQ2xvc2VkKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobWFrZUVycm9yKCdJbnZhbGlkU3RhdGVFcnJvcicsXG4gICAgICAgICAgJ0NhbiBub3QgY2FsbCBjcmVhdGVPZmZlciBhZnRlciBjbG9zZScpKTtcbiAgICB9XG5cbiAgICB2YXIgbnVtQXVkaW9UcmFja3MgPSBwYy50cmFuc2NlaXZlcnMuZmlsdGVyKGZ1bmN0aW9uKHQpIHtcbiAgICAgIHJldHVybiB0LmtpbmQgPT09ICdhdWRpbyc7XG4gICAgfSkubGVuZ3RoO1xuICAgIHZhciBudW1WaWRlb1RyYWNrcyA9IHBjLnRyYW5zY2VpdmVycy5maWx0ZXIoZnVuY3Rpb24odCkge1xuICAgICAgcmV0dXJuIHQua2luZCA9PT0gJ3ZpZGVvJztcbiAgICB9KS5sZW5ndGg7XG5cbiAgICAvLyBEZXRlcm1pbmUgbnVtYmVyIG9mIGF1ZGlvIGFuZCB2aWRlbyB0cmFja3Mgd2UgbmVlZCB0byBzZW5kL3JlY3YuXG4gICAgdmFyIG9mZmVyT3B0aW9ucyA9IGFyZ3VtZW50c1swXTtcbiAgICBpZiAob2ZmZXJPcHRpb25zKSB7XG4gICAgICAvLyBSZWplY3QgQ2hyb21lIGxlZ2FjeSBjb25zdHJhaW50cy5cbiAgICAgIGlmIChvZmZlck9wdGlvbnMubWFuZGF0b3J5IHx8IG9mZmVyT3B0aW9ucy5vcHRpb25hbCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgICAgJ0xlZ2FjeSBtYW5kYXRvcnkvb3B0aW9uYWwgY29uc3RyYWludHMgbm90IHN1cHBvcnRlZC4nKTtcbiAgICAgIH1cbiAgICAgIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIG51bUF1ZGlvVHJhY2tzID0gMTtcbiAgICAgICAgfSBlbHNlIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBudW1BdWRpb1RyYWNrcyA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbnVtQXVkaW9UcmFja3MgPSBvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvID09PSB0cnVlKSB7XG4gICAgICAgICAgbnVtVmlkZW9UcmFja3MgPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvID09PSBmYWxzZSkge1xuICAgICAgICAgIG51bVZpZGVvVHJhY2tzID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBudW1WaWRlb1RyYWNrcyA9IG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcGMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcbiAgICAgIGlmICh0cmFuc2NlaXZlci5raW5kID09PSAnYXVkaW8nKSB7XG4gICAgICAgIG51bUF1ZGlvVHJhY2tzLS07XG4gICAgICAgIGlmIChudW1BdWRpb1RyYWNrcyA8IDApIHtcbiAgICAgICAgICB0cmFuc2NlaXZlci53YW50UmVjZWl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLmtpbmQgPT09ICd2aWRlbycpIHtcbiAgICAgICAgbnVtVmlkZW9UcmFja3MtLTtcbiAgICAgICAgaWYgKG51bVZpZGVvVHJhY2tzIDwgMCkge1xuICAgICAgICAgIHRyYW5zY2VpdmVyLndhbnRSZWNlaXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIENyZWF0ZSBNLWxpbmVzIGZvciByZWN2b25seSBzdHJlYW1zLlxuICAgIHdoaWxlIChudW1BdWRpb1RyYWNrcyA+IDAgfHwgbnVtVmlkZW9UcmFja3MgPiAwKSB7XG4gICAgICBpZiAobnVtQXVkaW9UcmFja3MgPiAwKSB7XG4gICAgICAgIHBjLl9jcmVhdGVUcmFuc2NlaXZlcignYXVkaW8nKTtcbiAgICAgICAgbnVtQXVkaW9UcmFja3MtLTtcbiAgICAgIH1cbiAgICAgIGlmIChudW1WaWRlb1RyYWNrcyA+IDApIHtcbiAgICAgICAgcGMuX2NyZWF0ZVRyYW5zY2VpdmVyKCd2aWRlbycpO1xuICAgICAgICBudW1WaWRlb1RyYWNrcy0tO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBzZHAgPSBTRFBVdGlscy53cml0ZVNlc3Npb25Cb2lsZXJwbGF0ZShwYy5fc2RwU2Vzc2lvbklkLFxuICAgICAgICBwYy5fc2RwU2Vzc2lvblZlcnNpb24rKyk7XG4gICAgcGMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIsIHNkcE1MaW5lSW5kZXgpIHtcbiAgICAgIC8vIEZvciBlYWNoIHRyYWNrLCBjcmVhdGUgYW4gaWNlIGdhdGhlcmVyLCBpY2UgdHJhbnNwb3J0LFxuICAgICAgLy8gZHRscyB0cmFuc3BvcnQsIHBvdGVudGlhbGx5IHJ0cHNlbmRlciBhbmQgcnRwcmVjZWl2ZXIuXG4gICAgICB2YXIgdHJhY2sgPSB0cmFuc2NlaXZlci50cmFjaztcbiAgICAgIHZhciBraW5kID0gdHJhbnNjZWl2ZXIua2luZDtcbiAgICAgIHZhciBtaWQgPSB0cmFuc2NlaXZlci5taWQgfHwgU0RQVXRpbHMuZ2VuZXJhdGVJZGVudGlmaWVyKCk7XG4gICAgICB0cmFuc2NlaXZlci5taWQgPSBtaWQ7XG5cbiAgICAgIGlmICghdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIpIHtcbiAgICAgICAgdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIgPSBwYy5fY3JlYXRlSWNlR2F0aGVyZXIoc2RwTUxpbmVJbmRleCxcbiAgICAgICAgICAgIHBjLnVzaW5nQnVuZGxlKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGxvY2FsQ2FwYWJpbGl0aWVzID0gd2luZG93LlJUQ1J0cFNlbmRlci5nZXRDYXBhYmlsaXRpZXMoa2luZCk7XG4gICAgICAvLyBmaWx0ZXIgUlRYIHVudGlsIGFkZGl0aW9uYWwgc3R1ZmYgbmVlZGVkIGZvciBSVFggaXMgaW1wbGVtZW50ZWRcbiAgICAgIC8vIGluIGFkYXB0ZXIuanNcbiAgICAgIGlmIChlZGdlVmVyc2lvbiA8IDE1MDE5KSB7XG4gICAgICAgIGxvY2FsQ2FwYWJpbGl0aWVzLmNvZGVjcyA9IGxvY2FsQ2FwYWJpbGl0aWVzLmNvZGVjcy5maWx0ZXIoXG4gICAgICAgICAgICBmdW5jdGlvbihjb2RlYykge1xuICAgICAgICAgICAgICByZXR1cm4gY29kZWMubmFtZSAhPT0gJ3J0eCc7XG4gICAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGxvY2FsQ2FwYWJpbGl0aWVzLmNvZGVjcy5mb3JFYWNoKGZ1bmN0aW9uKGNvZGVjKSB7XG4gICAgICAgIC8vIHdvcmsgYXJvdW5kIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC93ZWJydGMvaXNzdWVzL2RldGFpbD9pZD02NTUyXG4gICAgICAgIC8vIGJ5IGFkZGluZyBsZXZlbC1hc3ltbWV0cnktYWxsb3dlZD0xXG4gICAgICAgIGlmIChjb2RlYy5uYW1lID09PSAnSDI2NCcgJiZcbiAgICAgICAgICAgIGNvZGVjLnBhcmFtZXRlcnNbJ2xldmVsLWFzeW1tZXRyeS1hbGxvd2VkJ10gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGNvZGVjLnBhcmFtZXRlcnNbJ2xldmVsLWFzeW1tZXRyeS1hbGxvd2VkJ10gPSAnMSc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmb3Igc3Vic2VxdWVudCBvZmZlcnMsIHdlIG1pZ2h0IGhhdmUgdG8gcmUtdXNlIHRoZSBwYXlsb2FkXG4gICAgICAgIC8vIHR5cGUgb2YgdGhlIGxhc3Qgb2ZmZXIuXG4gICAgICAgIGlmICh0cmFuc2NlaXZlci5yZW1vdGVDYXBhYmlsaXRpZXMgJiZcbiAgICAgICAgICAgIHRyYW5zY2VpdmVyLnJlbW90ZUNhcGFiaWxpdGllcy5jb2RlY3MpIHtcbiAgICAgICAgICB0cmFuc2NlaXZlci5yZW1vdGVDYXBhYmlsaXRpZXMuY29kZWNzLmZvckVhY2goZnVuY3Rpb24ocmVtb3RlQ29kZWMpIHtcbiAgICAgICAgICAgIGlmIChjb2RlYy5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IHJlbW90ZUNvZGVjLm5hbWUudG9Mb3dlckNhc2UoKSAmJlxuICAgICAgICAgICAgICAgIGNvZGVjLmNsb2NrUmF0ZSA9PT0gcmVtb3RlQ29kZWMuY2xvY2tSYXRlKSB7XG4gICAgICAgICAgICAgIGNvZGVjLnByZWZlcnJlZFBheWxvYWRUeXBlID0gcmVtb3RlQ29kZWMucGF5bG9hZFR5cGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgbG9jYWxDYXBhYmlsaXRpZXMuaGVhZGVyRXh0ZW5zaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGhkckV4dCkge1xuICAgICAgICB2YXIgcmVtb3RlRXh0ZW5zaW9ucyA9IHRyYW5zY2VpdmVyLnJlbW90ZUNhcGFiaWxpdGllcyAmJlxuICAgICAgICAgICAgdHJhbnNjZWl2ZXIucmVtb3RlQ2FwYWJpbGl0aWVzLmhlYWRlckV4dGVuc2lvbnMgfHwgW107XG4gICAgICAgIHJlbW90ZUV4dGVuc2lvbnMuZm9yRWFjaChmdW5jdGlvbihySGRyRXh0KSB7XG4gICAgICAgICAgaWYgKGhkckV4dC51cmkgPT09IHJIZHJFeHQudXJpKSB7XG4gICAgICAgICAgICBoZHJFeHQuaWQgPSBySGRyRXh0LmlkO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgLy8gZ2VuZXJhdGUgYW4gc3NyYyBub3csIHRvIGJlIHVzZWQgbGF0ZXIgaW4gcnRwU2VuZGVyLnNlbmRcbiAgICAgIHZhciBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzID0gdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVycyB8fCBbe1xuICAgICAgICBzc3JjOiAoMiAqIHNkcE1MaW5lSW5kZXggKyAxKSAqIDEwMDFcbiAgICAgIH1dO1xuICAgICAgaWYgKHRyYWNrKSB7XG4gICAgICAgIC8vIGFkZCBSVFhcbiAgICAgICAgaWYgKGVkZ2VWZXJzaW9uID49IDE1MDE5ICYmIGtpbmQgPT09ICd2aWRlbycgJiZcbiAgICAgICAgICAgICFzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCkge1xuICAgICAgICAgIHNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4ID0ge1xuICAgICAgICAgICAgc3NyYzogc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjICsgMVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRyYW5zY2VpdmVyLndhbnRSZWNlaXZlKSB7XG4gICAgICAgIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyID0gbmV3IHdpbmRvdy5SVENSdHBSZWNlaXZlcihcbiAgICAgICAgICAgIHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQsIGtpbmQpO1xuICAgICAgfVxuXG4gICAgICB0cmFuc2NlaXZlci5sb2NhbENhcGFiaWxpdGllcyA9IGxvY2FsQ2FwYWJpbGl0aWVzO1xuICAgICAgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVycyA9IHNlbmRFbmNvZGluZ1BhcmFtZXRlcnM7XG4gICAgfSk7XG5cbiAgICAvLyBhbHdheXMgb2ZmZXIgQlVORExFIGFuZCBkaXNwb3NlIG9uIHJldHVybiBpZiBub3Qgc3VwcG9ydGVkLlxuICAgIGlmIChwYy5fY29uZmlnLmJ1bmRsZVBvbGljeSAhPT0gJ21heC1jb21wYXQnKSB7XG4gICAgICBzZHAgKz0gJ2E9Z3JvdXA6QlVORExFICcgKyBwYy50cmFuc2NlaXZlcnMubWFwKGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgcmV0dXJuIHQubWlkO1xuICAgICAgfSkuam9pbignICcpICsgJ1xcclxcbic7XG4gICAgfVxuICAgIHNkcCArPSAnYT1pY2Utb3B0aW9uczp0cmlja2xlXFxyXFxuJztcblxuICAgIHBjLnRyYW5zY2VpdmVycy5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zY2VpdmVyLCBzZHBNTGluZUluZGV4KSB7XG4gICAgICBzZHAgKz0gd3JpdGVNZWRpYVNlY3Rpb24odHJhbnNjZWl2ZXIsIHRyYW5zY2VpdmVyLmxvY2FsQ2FwYWJpbGl0aWVzLFxuICAgICAgICAgICdvZmZlcicsIHRyYW5zY2VpdmVyLnN0cmVhbSwgcGMuX2R0bHNSb2xlKTtcbiAgICAgIHNkcCArPSAnYT1ydGNwLXJzaXplXFxyXFxuJztcblxuICAgICAgaWYgKHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyICYmIHBjLmljZUdhdGhlcmluZ1N0YXRlICE9PSAnbmV3JyAmJlxuICAgICAgICAgIChzZHBNTGluZUluZGV4ID09PSAwIHx8ICFwYy51c2luZ0J1bmRsZSkpIHtcbiAgICAgICAgdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIuZ2V0TG9jYWxDYW5kaWRhdGVzKCkuZm9yRWFjaChmdW5jdGlvbihjYW5kKSB7XG4gICAgICAgICAgY2FuZC5jb21wb25lbnQgPSAxO1xuICAgICAgICAgIHNkcCArPSAnYT0nICsgU0RQVXRpbHMud3JpdGVDYW5kaWRhdGUoY2FuZCkgKyAnXFxyXFxuJztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyLnN0YXRlID09PSAnY29tcGxldGVkJykge1xuICAgICAgICAgIHNkcCArPSAnYT1lbmQtb2YtY2FuZGlkYXRlc1xcclxcbic7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHZhciBkZXNjID0gbmV3IHdpbmRvdy5SVENTZXNzaW9uRGVzY3JpcHRpb24oe1xuICAgICAgdHlwZTogJ29mZmVyJyxcbiAgICAgIHNkcDogc2RwXG4gICAgfSk7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShkZXNjKTtcbiAgfTtcblxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlQW5zd2VyID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHBjID0gdGhpcztcblxuICAgIGlmIChwYy5faXNDbG9zZWQpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChtYWtlRXJyb3IoJ0ludmFsaWRTdGF0ZUVycm9yJyxcbiAgICAgICAgICAnQ2FuIG5vdCBjYWxsIGNyZWF0ZUFuc3dlciBhZnRlciBjbG9zZScpKTtcbiAgICB9XG5cbiAgICBpZiAoIShwYy5zaWduYWxpbmdTdGF0ZSA9PT0gJ2hhdmUtcmVtb3RlLW9mZmVyJyB8fFxuICAgICAgICBwYy5zaWduYWxpbmdTdGF0ZSA9PT0gJ2hhdmUtbG9jYWwtcHJhbnN3ZXInKSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG1ha2VFcnJvcignSW52YWxpZFN0YXRlRXJyb3InLFxuICAgICAgICAgICdDYW4gbm90IGNhbGwgY3JlYXRlQW5zd2VyIGluIHNpZ25hbGluZ1N0YXRlICcgKyBwYy5zaWduYWxpbmdTdGF0ZSkpO1xuICAgIH1cblxuICAgIHZhciBzZHAgPSBTRFBVdGlscy53cml0ZVNlc3Npb25Cb2lsZXJwbGF0ZShwYy5fc2RwU2Vzc2lvbklkLFxuICAgICAgICBwYy5fc2RwU2Vzc2lvblZlcnNpb24rKyk7XG4gICAgaWYgKHBjLnVzaW5nQnVuZGxlKSB7XG4gICAgICBzZHAgKz0gJ2E9Z3JvdXA6QlVORExFICcgKyBwYy50cmFuc2NlaXZlcnMubWFwKGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgcmV0dXJuIHQubWlkO1xuICAgICAgfSkuam9pbignICcpICsgJ1xcclxcbic7XG4gICAgfVxuICAgIHZhciBtZWRpYVNlY3Rpb25zSW5PZmZlciA9IFNEUFV0aWxzLmdldE1lZGlhU2VjdGlvbnMoXG4gICAgICAgIHBjLnJlbW90ZURlc2NyaXB0aW9uLnNkcCkubGVuZ3RoO1xuICAgIHBjLnRyYW5zY2VpdmVycy5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zY2VpdmVyLCBzZHBNTGluZUluZGV4KSB7XG4gICAgICBpZiAoc2RwTUxpbmVJbmRleCArIDEgPiBtZWRpYVNlY3Rpb25zSW5PZmZlcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAodHJhbnNjZWl2ZXIucmVqZWN0ZWQpIHtcbiAgICAgICAgaWYgKHRyYW5zY2VpdmVyLmtpbmQgPT09ICdhcHBsaWNhdGlvbicpIHtcbiAgICAgICAgICBzZHAgKz0gJ209YXBwbGljYXRpb24gMCBEVExTL1NDVFAgNTAwMFxcclxcbic7XG4gICAgICAgIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIua2luZCA9PT0gJ2F1ZGlvJykge1xuICAgICAgICAgIHNkcCArPSAnbT1hdWRpbyAwIFVEUC9UTFMvUlRQL1NBVlBGIDBcXHJcXG4nICtcbiAgICAgICAgICAgICAgJ2E9cnRwbWFwOjAgUENNVS84MDAwXFxyXFxuJztcbiAgICAgICAgfSBlbHNlIGlmICh0cmFuc2NlaXZlci5raW5kID09PSAndmlkZW8nKSB7XG4gICAgICAgICAgc2RwICs9ICdtPXZpZGVvIDAgVURQL1RMUy9SVFAvU0FWUEYgMTIwXFxyXFxuJyArXG4gICAgICAgICAgICAgICdhPXJ0cG1hcDoxMjAgVlA4LzkwMDAwXFxyXFxuJztcbiAgICAgICAgfVxuICAgICAgICBzZHAgKz0gJ2M9SU4gSVA0IDAuMC4wLjBcXHJcXG4nICtcbiAgICAgICAgICAgICdhPWluYWN0aXZlXFxyXFxuJyArXG4gICAgICAgICAgICAnYT1taWQ6JyArIHRyYW5zY2VpdmVyLm1pZCArICdcXHJcXG4nO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIEZJWE1FOiBsb29rIGF0IGRpcmVjdGlvbi5cbiAgICAgIGlmICh0cmFuc2NlaXZlci5zdHJlYW0pIHtcbiAgICAgICAgdmFyIGxvY2FsVHJhY2s7XG4gICAgICAgIGlmICh0cmFuc2NlaXZlci5raW5kID09PSAnYXVkaW8nKSB7XG4gICAgICAgICAgbG9jYWxUcmFjayA9IHRyYW5zY2VpdmVyLnN0cmVhbS5nZXRBdWRpb1RyYWNrcygpWzBdO1xuICAgICAgICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLmtpbmQgPT09ICd2aWRlbycpIHtcbiAgICAgICAgICBsb2NhbFRyYWNrID0gdHJhbnNjZWl2ZXIuc3RyZWFtLmdldFZpZGVvVHJhY2tzKClbMF07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxvY2FsVHJhY2spIHtcbiAgICAgICAgICAvLyBhZGQgUlRYXG4gICAgICAgICAgaWYgKGVkZ2VWZXJzaW9uID49IDE1MDE5ICYmIHRyYW5zY2VpdmVyLmtpbmQgPT09ICd2aWRlbycgJiZcbiAgICAgICAgICAgICAgIXRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4KSB7XG4gICAgICAgICAgICB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCA9IHtcbiAgICAgICAgICAgICAgc3NyYzogdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjICsgMVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQ2FsY3VsYXRlIGludGVyc2VjdGlvbiBvZiBjYXBhYmlsaXRpZXMuXG4gICAgICB2YXIgY29tbW9uQ2FwYWJpbGl0aWVzID0gZ2V0Q29tbW9uQ2FwYWJpbGl0aWVzKFxuICAgICAgICAgIHRyYW5zY2VpdmVyLmxvY2FsQ2FwYWJpbGl0aWVzLFxuICAgICAgICAgIHRyYW5zY2VpdmVyLnJlbW90ZUNhcGFiaWxpdGllcyk7XG5cbiAgICAgIHZhciBoYXNSdHggPSBjb21tb25DYXBhYmlsaXRpZXMuY29kZWNzLmZpbHRlcihmdW5jdGlvbihjKSB7XG4gICAgICAgIHJldHVybiBjLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3J0eCc7XG4gICAgICB9KS5sZW5ndGg7XG4gICAgICBpZiAoIWhhc1J0eCAmJiB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCkge1xuICAgICAgICBkZWxldGUgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHg7XG4gICAgICB9XG5cbiAgICAgIHNkcCArPSB3cml0ZU1lZGlhU2VjdGlvbih0cmFuc2NlaXZlciwgY29tbW9uQ2FwYWJpbGl0aWVzLFxuICAgICAgICAgICdhbnN3ZXInLCB0cmFuc2NlaXZlci5zdHJlYW0sIHBjLl9kdGxzUm9sZSk7XG4gICAgICBpZiAodHJhbnNjZWl2ZXIucnRjcFBhcmFtZXRlcnMgJiZcbiAgICAgICAgICB0cmFuc2NlaXZlci5ydGNwUGFyYW1ldGVycy5yZWR1Y2VkU2l6ZSkge1xuICAgICAgICBzZHAgKz0gJ2E9cnRjcC1yc2l6ZVxcclxcbic7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB2YXIgZGVzYyA9IG5ldyB3aW5kb3cuUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKHtcbiAgICAgIHR5cGU6ICdhbnN3ZXInLFxuICAgICAgc2RwOiBzZHBcbiAgICB9KTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRlc2MpO1xuICB9O1xuXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRJY2VDYW5kaWRhdGUgPSBmdW5jdGlvbihjYW5kaWRhdGUpIHtcbiAgICB2YXIgcGMgPSB0aGlzO1xuICAgIHZhciBzZWN0aW9ucztcbiAgICBpZiAoY2FuZGlkYXRlICYmICEoY2FuZGlkYXRlLnNkcE1MaW5lSW5kZXggIT09IHVuZGVmaW5lZCB8fFxuICAgICAgICBjYW5kaWRhdGUuc2RwTWlkKSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoJ3NkcE1MaW5lSW5kZXggb3Igc2RwTWlkIHJlcXVpcmVkJykpO1xuICAgIH1cblxuICAgIC8vIFRPRE86IG5lZWRzIHRvIGdvIGludG8gb3BzIHF1ZXVlLlxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGlmICghcGMucmVtb3RlRGVzY3JpcHRpb24pIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdChtYWtlRXJyb3IoJ0ludmFsaWRTdGF0ZUVycm9yJyxcbiAgICAgICAgICAgICdDYW4gbm90IGFkZCBJQ0UgY2FuZGlkYXRlIHdpdGhvdXQgYSByZW1vdGUgZGVzY3JpcHRpb24nKSk7XG4gICAgICB9IGVsc2UgaWYgKCFjYW5kaWRhdGUgfHwgY2FuZGlkYXRlLmNhbmRpZGF0ZSA9PT0gJycpIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBwYy50cmFuc2NlaXZlcnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICBpZiAocGMudHJhbnNjZWl2ZXJzW2pdLnJlamVjdGVkKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcGMudHJhbnNjZWl2ZXJzW2pdLmljZVRyYW5zcG9ydC5hZGRSZW1vdGVDYW5kaWRhdGUoe30pO1xuICAgICAgICAgIHNlY3Rpb25zID0gU0RQVXRpbHMuZ2V0TWVkaWFTZWN0aW9ucyhwYy5yZW1vdGVEZXNjcmlwdGlvbi5zZHApO1xuICAgICAgICAgIHNlY3Rpb25zW2pdICs9ICdhPWVuZC1vZi1jYW5kaWRhdGVzXFxyXFxuJztcbiAgICAgICAgICBwYy5yZW1vdGVEZXNjcmlwdGlvbi5zZHAgPVxuICAgICAgICAgICAgICBTRFBVdGlscy5nZXREZXNjcmlwdGlvbihwYy5yZW1vdGVEZXNjcmlwdGlvbi5zZHApICtcbiAgICAgICAgICAgICAgc2VjdGlvbnMuam9pbignJyk7XG4gICAgICAgICAgaWYgKHBjLnVzaW5nQnVuZGxlKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBzZHBNTGluZUluZGV4ID0gY2FuZGlkYXRlLnNkcE1MaW5lSW5kZXg7XG4gICAgICAgIGlmIChjYW5kaWRhdGUuc2RwTWlkKSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYy50cmFuc2NlaXZlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChwYy50cmFuc2NlaXZlcnNbaV0ubWlkID09PSBjYW5kaWRhdGUuc2RwTWlkKSB7XG4gICAgICAgICAgICAgIHNkcE1MaW5lSW5kZXggPSBpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRyYW5zY2VpdmVyID0gcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdO1xuICAgICAgICBpZiAodHJhbnNjZWl2ZXIpIHtcbiAgICAgICAgICBpZiAodHJhbnNjZWl2ZXIucmVqZWN0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBjYW5kID0gT2JqZWN0LmtleXMoY2FuZGlkYXRlLmNhbmRpZGF0ZSkubGVuZ3RoID4gMCA/XG4gICAgICAgICAgICAgIFNEUFV0aWxzLnBhcnNlQ2FuZGlkYXRlKGNhbmRpZGF0ZS5jYW5kaWRhdGUpIDoge307XG4gICAgICAgICAgLy8gSWdub3JlIENocm9tZSdzIGludmFsaWQgY2FuZGlkYXRlcyBzaW5jZSBFZGdlIGRvZXMgbm90IGxpa2UgdGhlbS5cbiAgICAgICAgICBpZiAoY2FuZC5wcm90b2NvbCA9PT0gJ3RjcCcgJiYgKGNhbmQucG9ydCA9PT0gMCB8fCBjYW5kLnBvcnQgPT09IDkpKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBJZ25vcmUgUlRDUCBjYW5kaWRhdGVzLCB3ZSBhc3N1bWUgUlRDUC1NVVguXG4gICAgICAgICAgaWYgKGNhbmQuY29tcG9uZW50ICYmIGNhbmQuY29tcG9uZW50ICE9PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyB3aGVuIHVzaW5nIGJ1bmRsZSwgYXZvaWQgYWRkaW5nIGNhbmRpZGF0ZXMgdG8gdGhlIHdyb25nXG4gICAgICAgICAgLy8gaWNlIHRyYW5zcG9ydC4gQW5kIGF2b2lkIGFkZGluZyBjYW5kaWRhdGVzIGFkZGVkIGluIHRoZSBTRFAuXG4gICAgICAgICAgaWYgKHNkcE1MaW5lSW5kZXggPT09IDAgfHwgKHNkcE1MaW5lSW5kZXggPiAwICYmXG4gICAgICAgICAgICAgIHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydCAhPT0gcGMudHJhbnNjZWl2ZXJzWzBdLmljZVRyYW5zcG9ydCkpIHtcbiAgICAgICAgICAgIGlmICghbWF5YmVBZGRDYW5kaWRhdGUodHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LCBjYW5kKSkge1xuICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KG1ha2VFcnJvcignT3BlcmF0aW9uRXJyb3InLFxuICAgICAgICAgICAgICAgICAgJ0NhbiBub3QgYWRkIElDRSBjYW5kaWRhdGUnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gdXBkYXRlIHRoZSByZW1vdGVEZXNjcmlwdGlvbi5cbiAgICAgICAgICB2YXIgY2FuZGlkYXRlU3RyaW5nID0gY2FuZGlkYXRlLmNhbmRpZGF0ZS50cmltKCk7XG4gICAgICAgICAgaWYgKGNhbmRpZGF0ZVN0cmluZy5pbmRleE9mKCdhPScpID09PSAwKSB7XG4gICAgICAgICAgICBjYW5kaWRhdGVTdHJpbmcgPSBjYW5kaWRhdGVTdHJpbmcuc3Vic3RyKDIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzZWN0aW9ucyA9IFNEUFV0aWxzLmdldE1lZGlhU2VjdGlvbnMocGMucmVtb3RlRGVzY3JpcHRpb24uc2RwKTtcbiAgICAgICAgICBzZWN0aW9uc1tzZHBNTGluZUluZGV4XSArPSAnYT0nICtcbiAgICAgICAgICAgICAgKGNhbmQudHlwZSA/IGNhbmRpZGF0ZVN0cmluZyA6ICdlbmQtb2YtY2FuZGlkYXRlcycpXG4gICAgICAgICAgICAgICsgJ1xcclxcbic7XG4gICAgICAgICAgcGMucmVtb3RlRGVzY3JpcHRpb24uc2RwID1cbiAgICAgICAgICAgICAgU0RQVXRpbHMuZ2V0RGVzY3JpcHRpb24ocGMucmVtb3RlRGVzY3JpcHRpb24uc2RwKSArXG4gICAgICAgICAgICAgIHNlY3Rpb25zLmpvaW4oJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiByZWplY3QobWFrZUVycm9yKCdPcGVyYXRpb25FcnJvcicsXG4gICAgICAgICAgICAgICdDYW4gbm90IGFkZCBJQ0UgY2FuZGlkYXRlJykpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH07XG5cbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFN0YXRzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHByb21pc2VzID0gW107XG4gICAgdGhpcy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xuICAgICAgWydydHBTZW5kZXInLCAncnRwUmVjZWl2ZXInLCAnaWNlR2F0aGVyZXInLCAnaWNlVHJhbnNwb3J0JyxcbiAgICAgICAgICAnZHRsc1RyYW5zcG9ydCddLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgICAgICBpZiAodHJhbnNjZWl2ZXJbbWV0aG9kXSkge1xuICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKHRyYW5zY2VpdmVyW21ldGhvZF0uZ2V0U3RhdHMoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgdmFyIGZpeFN0YXRzVHlwZSA9IGZ1bmN0aW9uKHN0YXQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGluYm91bmRydHA6ICdpbmJvdW5kLXJ0cCcsXG4gICAgICAgIG91dGJvdW5kcnRwOiAnb3V0Ym91bmQtcnRwJyxcbiAgICAgICAgY2FuZGlkYXRlcGFpcjogJ2NhbmRpZGF0ZS1wYWlyJyxcbiAgICAgICAgbG9jYWxjYW5kaWRhdGU6ICdsb2NhbC1jYW5kaWRhdGUnLFxuICAgICAgICByZW1vdGVjYW5kaWRhdGU6ICdyZW1vdGUtY2FuZGlkYXRlJ1xuICAgICAgfVtzdGF0LnR5cGVdIHx8IHN0YXQudHlwZTtcbiAgICB9O1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICAvLyBzaGltIGdldFN0YXRzIHdpdGggbWFwbGlrZSBzdXBwb3J0XG4gICAgICB2YXIgcmVzdWx0cyA9IG5ldyBNYXAoKTtcbiAgICAgIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICByZXMuZm9yRWFjaChmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICBPYmplY3Qua2V5cyhyZXN1bHQpLmZvckVhY2goZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgICAgIHJlc3VsdFtpZF0udHlwZSA9IGZpeFN0YXRzVHlwZShyZXN1bHRbaWRdKTtcbiAgICAgICAgICAgIHJlc3VsdHMuc2V0KGlkLCByZXN1bHRbaWRdKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJlc29sdmUocmVzdWx0cyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBsZWdhY3kgY2FsbGJhY2sgc2hpbXMuIFNob3VsZCBiZSBtb3ZlZCB0byBhZGFwdGVyLmpzIHNvbWUgZGF5cy5cbiAgdmFyIG1ldGhvZHMgPSBbJ2NyZWF0ZU9mZmVyJywgJ2NyZWF0ZUFuc3dlciddO1xuICBtZXRob2RzLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgdmFyIG5hdGl2ZU1ldGhvZCA9IFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdO1xuICAgIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIGlmICh0eXBlb2YgYXJnc1swXSA9PT0gJ2Z1bmN0aW9uJyB8fFxuICAgICAgICAgIHR5cGVvZiBhcmdzWzFdID09PSAnZnVuY3Rpb24nKSB7IC8vIGxlZ2FjeVxuICAgICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHRoaXMsIFthcmd1bWVudHNbMl1dKVxuICAgICAgICAudGhlbihmdW5jdGlvbihkZXNjcmlwdGlvbikge1xuICAgICAgICAgIGlmICh0eXBlb2YgYXJnc1swXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgYXJnc1swXS5hcHBseShudWxsLCBbZGVzY3JpcHRpb25dKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBhcmdzWzFdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBhcmdzWzFdLmFwcGx5KG51bGwsIFtlcnJvcl0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfSk7XG5cbiAgbWV0aG9kcyA9IFsnc2V0TG9jYWxEZXNjcmlwdGlvbicsICdzZXRSZW1vdGVEZXNjcmlwdGlvbicsICdhZGRJY2VDYW5kaWRhdGUnXTtcbiAgbWV0aG9kcy5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgIHZhciBuYXRpdmVNZXRob2QgPSBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXTtcbiAgICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICBpZiAodHlwZW9mIGFyZ3NbMV0gPT09ICdmdW5jdGlvbicgfHxcbiAgICAgICAgICB0eXBlb2YgYXJnc1syXSA9PT0gJ2Z1bmN0aW9uJykgeyAvLyBsZWdhY3lcbiAgICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICh0eXBlb2YgYXJnc1sxXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgYXJnc1sxXS5hcHBseShudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBhcmdzWzJdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBhcmdzWzJdLmFwcGx5KG51bGwsIFtlcnJvcl0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfSk7XG5cbiAgLy8gZ2V0U3RhdHMgaXMgc3BlY2lhbC4gSXQgZG9lc24ndCBoYXZlIGEgc3BlYyBsZWdhY3kgbWV0aG9kIHlldCB3ZSBzdXBwb3J0XG4gIC8vIGdldFN0YXRzKHNvbWV0aGluZywgY2IpIHdpdGhvdXQgZXJyb3IgY2FsbGJhY2tzLlxuICBbJ2dldFN0YXRzJ10uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICB2YXIgbmF0aXZlTWV0aG9kID0gUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF07XG4gICAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgaWYgKHR5cGVvZiBhcmdzWzFdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGFyZ3NbMV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGFyZ3NbMV0uYXBwbHkobnVsbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9KTtcblxuICByZXR1cm4gUlRDUGVlckNvbm5lY3Rpb247XG59O1xuXG59LHtcInNkcFwiOjJ9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cbid1c2Ugc3RyaWN0JztcblxuLy8gU0RQIGhlbHBlcnMuXG52YXIgU0RQVXRpbHMgPSB7fTtcblxuLy8gR2VuZXJhdGUgYW4gYWxwaGFudW1lcmljIGlkZW50aWZpZXIgZm9yIGNuYW1lIG9yIG1pZHMuXG4vLyBUT0RPOiB1c2UgVVVJRHMgaW5zdGVhZD8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vamVkLzk4Mjg4M1xuU0RQVXRpbHMuZ2VuZXJhdGVJZGVudGlmaWVyID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgMTApO1xufTtcblxuLy8gVGhlIFJUQ1AgQ05BTUUgdXNlZCBieSBhbGwgcGVlcmNvbm5lY3Rpb25zIGZyb20gdGhlIHNhbWUgSlMuXG5TRFBVdGlscy5sb2NhbENOYW1lID0gU0RQVXRpbHMuZ2VuZXJhdGVJZGVudGlmaWVyKCk7XG5cbi8vIFNwbGl0cyBTRFAgaW50byBsaW5lcywgZGVhbGluZyB3aXRoIGJvdGggQ1JMRiBhbmQgTEYuXG5TRFBVdGlscy5zcGxpdExpbmVzID0gZnVuY3Rpb24oYmxvYikge1xuICByZXR1cm4gYmxvYi50cmltKCkuc3BsaXQoJ1xcbicpLm1hcChmdW5jdGlvbihsaW5lKSB7XG4gICAgcmV0dXJuIGxpbmUudHJpbSgpO1xuICB9KTtcbn07XG4vLyBTcGxpdHMgU0RQIGludG8gc2Vzc2lvbnBhcnQgYW5kIG1lZGlhc2VjdGlvbnMuIEVuc3VyZXMgQ1JMRi5cblNEUFV0aWxzLnNwbGl0U2VjdGlvbnMgPSBmdW5jdGlvbihibG9iKSB7XG4gIHZhciBwYXJ0cyA9IGJsb2Iuc3BsaXQoJ1xcbm09Jyk7XG4gIHJldHVybiBwYXJ0cy5tYXAoZnVuY3Rpb24ocGFydCwgaW5kZXgpIHtcbiAgICByZXR1cm4gKGluZGV4ID4gMCA/ICdtPScgKyBwYXJ0IDogcGFydCkudHJpbSgpICsgJ1xcclxcbic7XG4gIH0pO1xufTtcblxuLy8gcmV0dXJucyB0aGUgc2Vzc2lvbiBkZXNjcmlwdGlvbi5cblNEUFV0aWxzLmdldERlc2NyaXB0aW9uID0gZnVuY3Rpb24oYmxvYikge1xuICB2YXIgc2VjdGlvbnMgPSBTRFBVdGlscy5zcGxpdFNlY3Rpb25zKGJsb2IpO1xuICByZXR1cm4gc2VjdGlvbnMgJiYgc2VjdGlvbnNbMF07XG59O1xuXG4vLyByZXR1cm5zIHRoZSBpbmRpdmlkdWFsIG1lZGlhIHNlY3Rpb25zLlxuU0RQVXRpbHMuZ2V0TWVkaWFTZWN0aW9ucyA9IGZ1bmN0aW9uKGJsb2IpIHtcbiAgdmFyIHNlY3Rpb25zID0gU0RQVXRpbHMuc3BsaXRTZWN0aW9ucyhibG9iKTtcbiAgc2VjdGlvbnMuc2hpZnQoKTtcbiAgcmV0dXJuIHNlY3Rpb25zO1xufTtcblxuLy8gUmV0dXJucyBsaW5lcyB0aGF0IHN0YXJ0IHdpdGggYSBjZXJ0YWluIHByZWZpeC5cblNEUFV0aWxzLm1hdGNoUHJlZml4ID0gZnVuY3Rpb24oYmxvYiwgcHJlZml4KSB7XG4gIHJldHVybiBTRFBVdGlscy5zcGxpdExpbmVzKGJsb2IpLmZpbHRlcihmdW5jdGlvbihsaW5lKSB7XG4gICAgcmV0dXJuIGxpbmUuaW5kZXhPZihwcmVmaXgpID09PSAwO1xuICB9KTtcbn07XG5cbi8vIFBhcnNlcyBhbiBJQ0UgY2FuZGlkYXRlIGxpbmUuIFNhbXBsZSBpbnB1dDpcbi8vIGNhbmRpZGF0ZTo3MDI3ODYzNTAgMiB1ZHAgNDE4MTk5MDIgOC44LjguOCA2MDc2OSB0eXAgcmVsYXkgcmFkZHIgOC44LjguOFxuLy8gcnBvcnQgNTU5OTZcIlxuU0RQVXRpbHMucGFyc2VDYW5kaWRhdGUgPSBmdW5jdGlvbihsaW5lKSB7XG4gIHZhciBwYXJ0cztcbiAgLy8gUGFyc2UgYm90aCB2YXJpYW50cy5cbiAgaWYgKGxpbmUuaW5kZXhPZignYT1jYW5kaWRhdGU6JykgPT09IDApIHtcbiAgICBwYXJ0cyA9IGxpbmUuc3Vic3RyaW5nKDEyKS5zcGxpdCgnICcpO1xuICB9IGVsc2Uge1xuICAgIHBhcnRzID0gbGluZS5zdWJzdHJpbmcoMTApLnNwbGl0KCcgJyk7XG4gIH1cblxuICB2YXIgY2FuZGlkYXRlID0ge1xuICAgIGZvdW5kYXRpb246IHBhcnRzWzBdLFxuICAgIGNvbXBvbmVudDogcGFyc2VJbnQocGFydHNbMV0sIDEwKSxcbiAgICBwcm90b2NvbDogcGFydHNbMl0udG9Mb3dlckNhc2UoKSxcbiAgICBwcmlvcml0eTogcGFyc2VJbnQocGFydHNbM10sIDEwKSxcbiAgICBpcDogcGFydHNbNF0sXG4gICAgcG9ydDogcGFyc2VJbnQocGFydHNbNV0sIDEwKSxcbiAgICAvLyBza2lwIHBhcnRzWzZdID09ICd0eXAnXG4gICAgdHlwZTogcGFydHNbN11cbiAgfTtcblxuICBmb3IgKHZhciBpID0gODsgaSA8IHBhcnRzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgc3dpdGNoIChwYXJ0c1tpXSkge1xuICAgICAgY2FzZSAncmFkZHInOlxuICAgICAgICBjYW5kaWRhdGUucmVsYXRlZEFkZHJlc3MgPSBwYXJ0c1tpICsgMV07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncnBvcnQnOlxuICAgICAgICBjYW5kaWRhdGUucmVsYXRlZFBvcnQgPSBwYXJzZUludChwYXJ0c1tpICsgMV0sIDEwKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0Y3B0eXBlJzpcbiAgICAgICAgY2FuZGlkYXRlLnRjcFR5cGUgPSBwYXJ0c1tpICsgMV07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndWZyYWcnOlxuICAgICAgICBjYW5kaWRhdGUudWZyYWcgPSBwYXJ0c1tpICsgMV07IC8vIGZvciBiYWNrd2FyZCBjb21wYWJpbGl0eS5cbiAgICAgICAgY2FuZGlkYXRlLnVzZXJuYW1lRnJhZ21lbnQgPSBwYXJ0c1tpICsgMV07XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDogLy8gZXh0ZW5zaW9uIGhhbmRsaW5nLCBpbiBwYXJ0aWN1bGFyIHVmcmFnXG4gICAgICAgIGNhbmRpZGF0ZVtwYXJ0c1tpXV0gPSBwYXJ0c1tpICsgMV07XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY2FuZGlkYXRlO1xufTtcblxuLy8gVHJhbnNsYXRlcyBhIGNhbmRpZGF0ZSBvYmplY3QgaW50byBTRFAgY2FuZGlkYXRlIGF0dHJpYnV0ZS5cblNEUFV0aWxzLndyaXRlQ2FuZGlkYXRlID0gZnVuY3Rpb24oY2FuZGlkYXRlKSB7XG4gIHZhciBzZHAgPSBbXTtcbiAgc2RwLnB1c2goY2FuZGlkYXRlLmZvdW5kYXRpb24pO1xuICBzZHAucHVzaChjYW5kaWRhdGUuY29tcG9uZW50KTtcbiAgc2RwLnB1c2goY2FuZGlkYXRlLnByb3RvY29sLnRvVXBwZXJDYXNlKCkpO1xuICBzZHAucHVzaChjYW5kaWRhdGUucHJpb3JpdHkpO1xuICBzZHAucHVzaChjYW5kaWRhdGUuaXApO1xuICBzZHAucHVzaChjYW5kaWRhdGUucG9ydCk7XG5cbiAgdmFyIHR5cGUgPSBjYW5kaWRhdGUudHlwZTtcbiAgc2RwLnB1c2goJ3R5cCcpO1xuICBzZHAucHVzaCh0eXBlKTtcbiAgaWYgKHR5cGUgIT09ICdob3N0JyAmJiBjYW5kaWRhdGUucmVsYXRlZEFkZHJlc3MgJiZcbiAgICAgIGNhbmRpZGF0ZS5yZWxhdGVkUG9ydCkge1xuICAgIHNkcC5wdXNoKCdyYWRkcicpO1xuICAgIHNkcC5wdXNoKGNhbmRpZGF0ZS5yZWxhdGVkQWRkcmVzcyk7IC8vIHdhczogcmVsQWRkclxuICAgIHNkcC5wdXNoKCdycG9ydCcpO1xuICAgIHNkcC5wdXNoKGNhbmRpZGF0ZS5yZWxhdGVkUG9ydCk7IC8vIHdhczogcmVsUG9ydFxuICB9XG4gIGlmIChjYW5kaWRhdGUudGNwVHlwZSAmJiBjYW5kaWRhdGUucHJvdG9jb2wudG9Mb3dlckNhc2UoKSA9PT0gJ3RjcCcpIHtcbiAgICBzZHAucHVzaCgndGNwdHlwZScpO1xuICAgIHNkcC5wdXNoKGNhbmRpZGF0ZS50Y3BUeXBlKTtcbiAgfVxuICBpZiAoY2FuZGlkYXRlLnVzZXJuYW1lRnJhZ21lbnQgfHwgY2FuZGlkYXRlLnVmcmFnKSB7XG4gICAgc2RwLnB1c2goJ3VmcmFnJyk7XG4gICAgc2RwLnB1c2goY2FuZGlkYXRlLnVzZXJuYW1lRnJhZ21lbnQgfHwgY2FuZGlkYXRlLnVmcmFnKTtcbiAgfVxuICByZXR1cm4gJ2NhbmRpZGF0ZTonICsgc2RwLmpvaW4oJyAnKTtcbn07XG5cbi8vIFBhcnNlcyBhbiBpY2Utb3B0aW9ucyBsaW5lLCByZXR1cm5zIGFuIGFycmF5IG9mIG9wdGlvbiB0YWdzLlxuLy8gYT1pY2Utb3B0aW9uczpmb28gYmFyXG5TRFBVdGlscy5wYXJzZUljZU9wdGlvbnMgPSBmdW5jdGlvbihsaW5lKSB7XG4gIHJldHVybiBsaW5lLnN1YnN0cigxNCkuc3BsaXQoJyAnKTtcbn1cblxuLy8gUGFyc2VzIGFuIHJ0cG1hcCBsaW5lLCByZXR1cm5zIFJUQ1J0cENvZGRlY1BhcmFtZXRlcnMuIFNhbXBsZSBpbnB1dDpcbi8vIGE9cnRwbWFwOjExMSBvcHVzLzQ4MDAwLzJcblNEUFV0aWxzLnBhcnNlUnRwTWFwID0gZnVuY3Rpb24obGluZSkge1xuICB2YXIgcGFydHMgPSBsaW5lLnN1YnN0cig5KS5zcGxpdCgnICcpO1xuICB2YXIgcGFyc2VkID0ge1xuICAgIHBheWxvYWRUeXBlOiBwYXJzZUludChwYXJ0cy5zaGlmdCgpLCAxMCkgLy8gd2FzOiBpZFxuICB9O1xuXG4gIHBhcnRzID0gcGFydHNbMF0uc3BsaXQoJy8nKTtcblxuICBwYXJzZWQubmFtZSA9IHBhcnRzWzBdO1xuICBwYXJzZWQuY2xvY2tSYXRlID0gcGFyc2VJbnQocGFydHNbMV0sIDEwKTsgLy8gd2FzOiBjbG9ja3JhdGVcbiAgLy8gd2FzOiBjaGFubmVsc1xuICBwYXJzZWQubnVtQ2hhbm5lbHMgPSBwYXJ0cy5sZW5ndGggPT09IDMgPyBwYXJzZUludChwYXJ0c1syXSwgMTApIDogMTtcbiAgcmV0dXJuIHBhcnNlZDtcbn07XG5cbi8vIEdlbmVyYXRlIGFuIGE9cnRwbWFwIGxpbmUgZnJvbSBSVENSdHBDb2RlY0NhcGFiaWxpdHkgb3Jcbi8vIFJUQ1J0cENvZGVjUGFyYW1ldGVycy5cblNEUFV0aWxzLndyaXRlUnRwTWFwID0gZnVuY3Rpb24oY29kZWMpIHtcbiAgdmFyIHB0ID0gY29kZWMucGF5bG9hZFR5cGU7XG4gIGlmIChjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcHQgPSBjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZTtcbiAgfVxuICByZXR1cm4gJ2E9cnRwbWFwOicgKyBwdCArICcgJyArIGNvZGVjLm5hbWUgKyAnLycgKyBjb2RlYy5jbG9ja1JhdGUgK1xuICAgICAgKGNvZGVjLm51bUNoYW5uZWxzICE9PSAxID8gJy8nICsgY29kZWMubnVtQ2hhbm5lbHMgOiAnJykgKyAnXFxyXFxuJztcbn07XG5cbi8vIFBhcnNlcyBhbiBhPWV4dG1hcCBsaW5lIChoZWFkZXJleHRlbnNpb24gZnJvbSBSRkMgNTI4NSkuIFNhbXBsZSBpbnB1dDpcbi8vIGE9ZXh0bWFwOjIgdXJuOmlldGY6cGFyYW1zOnJ0cC1oZHJleHQ6dG9mZnNldFxuLy8gYT1leHRtYXA6Mi9zZW5kb25seSB1cm46aWV0ZjpwYXJhbXM6cnRwLWhkcmV4dDp0b2Zmc2V0XG5TRFBVdGlscy5wYXJzZUV4dG1hcCA9IGZ1bmN0aW9uKGxpbmUpIHtcbiAgdmFyIHBhcnRzID0gbGluZS5zdWJzdHIoOSkuc3BsaXQoJyAnKTtcbiAgcmV0dXJuIHtcbiAgICBpZDogcGFyc2VJbnQocGFydHNbMF0sIDEwKSxcbiAgICBkaXJlY3Rpb246IHBhcnRzWzBdLmluZGV4T2YoJy8nKSA+IDAgPyBwYXJ0c1swXS5zcGxpdCgnLycpWzFdIDogJ3NlbmRyZWN2JyxcbiAgICB1cmk6IHBhcnRzWzFdXG4gIH07XG59O1xuXG4vLyBHZW5lcmF0ZXMgYT1leHRtYXAgbGluZSBmcm9tIFJUQ1J0cEhlYWRlckV4dGVuc2lvblBhcmFtZXRlcnMgb3Jcbi8vIFJUQ1J0cEhlYWRlckV4dGVuc2lvbi5cblNEUFV0aWxzLndyaXRlRXh0bWFwID0gZnVuY3Rpb24oaGVhZGVyRXh0ZW5zaW9uKSB7XG4gIHJldHVybiAnYT1leHRtYXA6JyArIChoZWFkZXJFeHRlbnNpb24uaWQgfHwgaGVhZGVyRXh0ZW5zaW9uLnByZWZlcnJlZElkKSArXG4gICAgICAoaGVhZGVyRXh0ZW5zaW9uLmRpcmVjdGlvbiAmJiBoZWFkZXJFeHRlbnNpb24uZGlyZWN0aW9uICE9PSAnc2VuZHJlY3YnXG4gICAgICAgICAgPyAnLycgKyBoZWFkZXJFeHRlbnNpb24uZGlyZWN0aW9uXG4gICAgICAgICAgOiAnJykgK1xuICAgICAgJyAnICsgaGVhZGVyRXh0ZW5zaW9uLnVyaSArICdcXHJcXG4nO1xufTtcblxuLy8gUGFyc2VzIGFuIGZ0bXAgbGluZSwgcmV0dXJucyBkaWN0aW9uYXJ5LiBTYW1wbGUgaW5wdXQ6XG4vLyBhPWZtdHA6OTYgdmJyPW9uO2NuZz1vblxuLy8gQWxzbyBkZWFscyB3aXRoIHZicj1vbjsgY25nPW9uXG5TRFBVdGlscy5wYXJzZUZtdHAgPSBmdW5jdGlvbihsaW5lKSB7XG4gIHZhciBwYXJzZWQgPSB7fTtcbiAgdmFyIGt2O1xuICB2YXIgcGFydHMgPSBsaW5lLnN1YnN0cihsaW5lLmluZGV4T2YoJyAnKSArIDEpLnNwbGl0KCc7Jyk7XG4gIGZvciAodmFyIGogPSAwOyBqIDwgcGFydHMubGVuZ3RoOyBqKyspIHtcbiAgICBrdiA9IHBhcnRzW2pdLnRyaW0oKS5zcGxpdCgnPScpO1xuICAgIHBhcnNlZFtrdlswXS50cmltKCldID0ga3ZbMV07XG4gIH1cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG5cbi8vIEdlbmVyYXRlcyBhbiBhPWZ0bXAgbGluZSBmcm9tIFJUQ1J0cENvZGVjQ2FwYWJpbGl0eSBvciBSVENSdHBDb2RlY1BhcmFtZXRlcnMuXG5TRFBVdGlscy53cml0ZUZtdHAgPSBmdW5jdGlvbihjb2RlYykge1xuICB2YXIgbGluZSA9ICcnO1xuICB2YXIgcHQgPSBjb2RlYy5wYXlsb2FkVHlwZTtcbiAgaWYgKGNvZGVjLnByZWZlcnJlZFBheWxvYWRUeXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICBwdCA9IGNvZGVjLnByZWZlcnJlZFBheWxvYWRUeXBlO1xuICB9XG4gIGlmIChjb2RlYy5wYXJhbWV0ZXJzICYmIE9iamVjdC5rZXlzKGNvZGVjLnBhcmFtZXRlcnMpLmxlbmd0aCkge1xuICAgIHZhciBwYXJhbXMgPSBbXTtcbiAgICBPYmplY3Qua2V5cyhjb2RlYy5wYXJhbWV0ZXJzKS5mb3JFYWNoKGZ1bmN0aW9uKHBhcmFtKSB7XG4gICAgICBwYXJhbXMucHVzaChwYXJhbSArICc9JyArIGNvZGVjLnBhcmFtZXRlcnNbcGFyYW1dKTtcbiAgICB9KTtcbiAgICBsaW5lICs9ICdhPWZtdHA6JyArIHB0ICsgJyAnICsgcGFyYW1zLmpvaW4oJzsnKSArICdcXHJcXG4nO1xuICB9XG4gIHJldHVybiBsaW5lO1xufTtcblxuLy8gUGFyc2VzIGFuIHJ0Y3AtZmIgbGluZSwgcmV0dXJucyBSVENQUnRjcEZlZWRiYWNrIG9iamVjdC4gU2FtcGxlIGlucHV0OlxuLy8gYT1ydGNwLWZiOjk4IG5hY2sgcnBzaVxuU0RQVXRpbHMucGFyc2VSdGNwRmIgPSBmdW5jdGlvbihsaW5lKSB7XG4gIHZhciBwYXJ0cyA9IGxpbmUuc3Vic3RyKGxpbmUuaW5kZXhPZignICcpICsgMSkuc3BsaXQoJyAnKTtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBwYXJ0cy5zaGlmdCgpLFxuICAgIHBhcmFtZXRlcjogcGFydHMuam9pbignICcpXG4gIH07XG59O1xuLy8gR2VuZXJhdGUgYT1ydGNwLWZiIGxpbmVzIGZyb20gUlRDUnRwQ29kZWNDYXBhYmlsaXR5IG9yIFJUQ1J0cENvZGVjUGFyYW1ldGVycy5cblNEUFV0aWxzLndyaXRlUnRjcEZiID0gZnVuY3Rpb24oY29kZWMpIHtcbiAgdmFyIGxpbmVzID0gJyc7XG4gIHZhciBwdCA9IGNvZGVjLnBheWxvYWRUeXBlO1xuICBpZiAoY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgIHB0ID0gY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGU7XG4gIH1cbiAgaWYgKGNvZGVjLnJ0Y3BGZWVkYmFjayAmJiBjb2RlYy5ydGNwRmVlZGJhY2subGVuZ3RoKSB7XG4gICAgLy8gRklYTUU6IHNwZWNpYWwgaGFuZGxpbmcgZm9yIHRyci1pbnQ/XG4gICAgY29kZWMucnRjcEZlZWRiYWNrLmZvckVhY2goZnVuY3Rpb24oZmIpIHtcbiAgICAgIGxpbmVzICs9ICdhPXJ0Y3AtZmI6JyArIHB0ICsgJyAnICsgZmIudHlwZSArXG4gICAgICAoZmIucGFyYW1ldGVyICYmIGZiLnBhcmFtZXRlci5sZW5ndGggPyAnICcgKyBmYi5wYXJhbWV0ZXIgOiAnJykgK1xuICAgICAgICAgICdcXHJcXG4nO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBsaW5lcztcbn07XG5cbi8vIFBhcnNlcyBhbiBSRkMgNTU3NiBzc3JjIG1lZGlhIGF0dHJpYnV0ZS4gU2FtcGxlIGlucHV0OlxuLy8gYT1zc3JjOjM3MzU5Mjg1NTkgY25hbWU6c29tZXRoaW5nXG5TRFBVdGlscy5wYXJzZVNzcmNNZWRpYSA9IGZ1bmN0aW9uKGxpbmUpIHtcbiAgdmFyIHNwID0gbGluZS5pbmRleE9mKCcgJyk7XG4gIHZhciBwYXJ0cyA9IHtcbiAgICBzc3JjOiBwYXJzZUludChsaW5lLnN1YnN0cig3LCBzcCAtIDcpLCAxMClcbiAgfTtcbiAgdmFyIGNvbG9uID0gbGluZS5pbmRleE9mKCc6Jywgc3ApO1xuICBpZiAoY29sb24gPiAtMSkge1xuICAgIHBhcnRzLmF0dHJpYnV0ZSA9IGxpbmUuc3Vic3RyKHNwICsgMSwgY29sb24gLSBzcCAtIDEpO1xuICAgIHBhcnRzLnZhbHVlID0gbGluZS5zdWJzdHIoY29sb24gKyAxKTtcbiAgfSBlbHNlIHtcbiAgICBwYXJ0cy5hdHRyaWJ1dGUgPSBsaW5lLnN1YnN0cihzcCArIDEpO1xuICB9XG4gIHJldHVybiBwYXJ0cztcbn07XG5cbi8vIEV4dHJhY3RzIHRoZSBNSUQgKFJGQyA1ODg4KSBmcm9tIGEgbWVkaWEgc2VjdGlvbi5cbi8vIHJldHVybnMgdGhlIE1JRCBvciB1bmRlZmluZWQgaWYgbm8gbWlkIGxpbmUgd2FzIGZvdW5kLlxuU0RQVXRpbHMuZ2V0TWlkID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XG4gIHZhciBtaWQgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPW1pZDonKVswXTtcbiAgaWYgKG1pZCkge1xuICAgIHJldHVybiBtaWQuc3Vic3RyKDYpO1xuICB9XG59XG5cblNEUFV0aWxzLnBhcnNlRmluZ2VycHJpbnQgPSBmdW5jdGlvbihsaW5lKSB7XG4gIHZhciBwYXJ0cyA9IGxpbmUuc3Vic3RyKDE0KS5zcGxpdCgnICcpO1xuICByZXR1cm4ge1xuICAgIGFsZ29yaXRobTogcGFydHNbMF0udG9Mb3dlckNhc2UoKSwgLy8gYWxnb3JpdGhtIGlzIGNhc2Utc2Vuc2l0aXZlIGluIEVkZ2UuXG4gICAgdmFsdWU6IHBhcnRzWzFdXG4gIH07XG59O1xuXG4vLyBFeHRyYWN0cyBEVExTIHBhcmFtZXRlcnMgZnJvbSBTRFAgbWVkaWEgc2VjdGlvbiBvciBzZXNzaW9ucGFydC5cbi8vIEZJWE1FOiBmb3IgY29uc2lzdGVuY3kgd2l0aCBvdGhlciBmdW5jdGlvbnMgdGhpcyBzaG91bGQgb25seVxuLy8gICBnZXQgdGhlIGZpbmdlcnByaW50IGxpbmUgYXMgaW5wdXQuIFNlZSBhbHNvIGdldEljZVBhcmFtZXRlcnMuXG5TRFBVdGlscy5nZXREdGxzUGFyYW1ldGVycyA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbiwgc2Vzc2lvbnBhcnQpIHtcbiAgdmFyIGxpbmVzID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uICsgc2Vzc2lvbnBhcnQsXG4gICAgICAnYT1maW5nZXJwcmludDonKTtcbiAgLy8gTm90ZTogYT1zZXR1cCBsaW5lIGlzIGlnbm9yZWQgc2luY2Ugd2UgdXNlIHRoZSAnYXV0bycgcm9sZS5cbiAgLy8gTm90ZTI6ICdhbGdvcml0aG0nIGlzIG5vdCBjYXNlIHNlbnNpdGl2ZSBleGNlcHQgaW4gRWRnZS5cbiAgcmV0dXJuIHtcbiAgICByb2xlOiAnYXV0bycsXG4gICAgZmluZ2VycHJpbnRzOiBsaW5lcy5tYXAoU0RQVXRpbHMucGFyc2VGaW5nZXJwcmludClcbiAgfTtcbn07XG5cbi8vIFNlcmlhbGl6ZXMgRFRMUyBwYXJhbWV0ZXJzIHRvIFNEUC5cblNEUFV0aWxzLndyaXRlRHRsc1BhcmFtZXRlcnMgPSBmdW5jdGlvbihwYXJhbXMsIHNldHVwVHlwZSkge1xuICB2YXIgc2RwID0gJ2E9c2V0dXA6JyArIHNldHVwVHlwZSArICdcXHJcXG4nO1xuICBwYXJhbXMuZmluZ2VycHJpbnRzLmZvckVhY2goZnVuY3Rpb24oZnApIHtcbiAgICBzZHAgKz0gJ2E9ZmluZ2VycHJpbnQ6JyArIGZwLmFsZ29yaXRobSArICcgJyArIGZwLnZhbHVlICsgJ1xcclxcbic7XG4gIH0pO1xuICByZXR1cm4gc2RwO1xufTtcbi8vIFBhcnNlcyBJQ0UgaW5mb3JtYXRpb24gZnJvbSBTRFAgbWVkaWEgc2VjdGlvbiBvciBzZXNzaW9ucGFydC5cbi8vIEZJWE1FOiBmb3IgY29uc2lzdGVuY3kgd2l0aCBvdGhlciBmdW5jdGlvbnMgdGhpcyBzaG91bGQgb25seVxuLy8gICBnZXQgdGhlIGljZS11ZnJhZyBhbmQgaWNlLXB3ZCBsaW5lcyBhcyBpbnB1dC5cblNEUFV0aWxzLmdldEljZVBhcmFtZXRlcnMgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24sIHNlc3Npb25wYXJ0KSB7XG4gIHZhciBsaW5lcyA9IFNEUFV0aWxzLnNwbGl0TGluZXMobWVkaWFTZWN0aW9uKTtcbiAgLy8gU2VhcmNoIGluIHNlc3Npb24gcGFydCwgdG9vLlxuICBsaW5lcyA9IGxpbmVzLmNvbmNhdChTRFBVdGlscy5zcGxpdExpbmVzKHNlc3Npb25wYXJ0KSk7XG4gIHZhciBpY2VQYXJhbWV0ZXJzID0ge1xuICAgIHVzZXJuYW1lRnJhZ21lbnQ6IGxpbmVzLmZpbHRlcihmdW5jdGlvbihsaW5lKSB7XG4gICAgICByZXR1cm4gbGluZS5pbmRleE9mKCdhPWljZS11ZnJhZzonKSA9PT0gMDtcbiAgICB9KVswXS5zdWJzdHIoMTIpLFxuICAgIHBhc3N3b3JkOiBsaW5lcy5maWx0ZXIoZnVuY3Rpb24obGluZSkge1xuICAgICAgcmV0dXJuIGxpbmUuaW5kZXhPZignYT1pY2UtcHdkOicpID09PSAwO1xuICAgIH0pWzBdLnN1YnN0cigxMClcbiAgfTtcbiAgcmV0dXJuIGljZVBhcmFtZXRlcnM7XG59O1xuXG4vLyBTZXJpYWxpemVzIElDRSBwYXJhbWV0ZXJzIHRvIFNEUC5cblNEUFV0aWxzLndyaXRlSWNlUGFyYW1ldGVycyA9IGZ1bmN0aW9uKHBhcmFtcykge1xuICByZXR1cm4gJ2E9aWNlLXVmcmFnOicgKyBwYXJhbXMudXNlcm5hbWVGcmFnbWVudCArICdcXHJcXG4nICtcbiAgICAgICdhPWljZS1wd2Q6JyArIHBhcmFtcy5wYXNzd29yZCArICdcXHJcXG4nO1xufTtcblxuLy8gUGFyc2VzIHRoZSBTRFAgbWVkaWEgc2VjdGlvbiBhbmQgcmV0dXJucyBSVENSdHBQYXJhbWV0ZXJzLlxuU0RQVXRpbHMucGFyc2VSdHBQYXJhbWV0ZXJzID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XG4gIHZhciBkZXNjcmlwdGlvbiA9IHtcbiAgICBjb2RlY3M6IFtdLFxuICAgIGhlYWRlckV4dGVuc2lvbnM6IFtdLFxuICAgIGZlY01lY2hhbmlzbXM6IFtdLFxuICAgIHJ0Y3A6IFtdXG4gIH07XG4gIHZhciBsaW5lcyA9IFNEUFV0aWxzLnNwbGl0TGluZXMobWVkaWFTZWN0aW9uKTtcbiAgdmFyIG1saW5lID0gbGluZXNbMF0uc3BsaXQoJyAnKTtcbiAgZm9yICh2YXIgaSA9IDM7IGkgPCBtbGluZS5sZW5ndGg7IGkrKykgeyAvLyBmaW5kIGFsbCBjb2RlY3MgZnJvbSBtbGluZVszLi5dXG4gICAgdmFyIHB0ID0gbWxpbmVbaV07XG4gICAgdmFyIHJ0cG1hcGxpbmUgPSBTRFBVdGlscy5tYXRjaFByZWZpeChcbiAgICAgICAgbWVkaWFTZWN0aW9uLCAnYT1ydHBtYXA6JyArIHB0ICsgJyAnKVswXTtcbiAgICBpZiAocnRwbWFwbGluZSkge1xuICAgICAgdmFyIGNvZGVjID0gU0RQVXRpbHMucGFyc2VSdHBNYXAocnRwbWFwbGluZSk7XG4gICAgICB2YXIgZm10cHMgPSBTRFBVdGlscy5tYXRjaFByZWZpeChcbiAgICAgICAgICBtZWRpYVNlY3Rpb24sICdhPWZtdHA6JyArIHB0ICsgJyAnKTtcbiAgICAgIC8vIE9ubHkgdGhlIGZpcnN0IGE9Zm10cDo8cHQ+IGlzIGNvbnNpZGVyZWQuXG4gICAgICBjb2RlYy5wYXJhbWV0ZXJzID0gZm10cHMubGVuZ3RoID8gU0RQVXRpbHMucGFyc2VGbXRwKGZtdHBzWzBdKSA6IHt9O1xuICAgICAgY29kZWMucnRjcEZlZWRiYWNrID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgoXG4gICAgICAgICAgbWVkaWFTZWN0aW9uLCAnYT1ydGNwLWZiOicgKyBwdCArICcgJylcbiAgICAgICAgLm1hcChTRFBVdGlscy5wYXJzZVJ0Y3BGYik7XG4gICAgICBkZXNjcmlwdGlvbi5jb2RlY3MucHVzaChjb2RlYyk7XG4gICAgICAvLyBwYXJzZSBGRUMgbWVjaGFuaXNtcyBmcm9tIHJ0cG1hcCBsaW5lcy5cbiAgICAgIHN3aXRjaCAoY29kZWMubmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICAgIGNhc2UgJ1JFRCc6XG4gICAgICAgIGNhc2UgJ1VMUEZFQyc6XG4gICAgICAgICAgZGVzY3JpcHRpb24uZmVjTWVjaGFuaXNtcy5wdXNoKGNvZGVjLm5hbWUudG9VcHBlckNhc2UoKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6IC8vIG9ubHkgUkVEIGFuZCBVTFBGRUMgYXJlIHJlY29nbml6ZWQgYXMgRkVDIG1lY2hhbmlzbXMuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9ZXh0bWFwOicpLmZvckVhY2goZnVuY3Rpb24obGluZSkge1xuICAgIGRlc2NyaXB0aW9uLmhlYWRlckV4dGVuc2lvbnMucHVzaChTRFBVdGlscy5wYXJzZUV4dG1hcChsaW5lKSk7XG4gIH0pO1xuICAvLyBGSVhNRTogcGFyc2UgcnRjcC5cbiAgcmV0dXJuIGRlc2NyaXB0aW9uO1xufTtcblxuLy8gR2VuZXJhdGVzIHBhcnRzIG9mIHRoZSBTRFAgbWVkaWEgc2VjdGlvbiBkZXNjcmliaW5nIHRoZSBjYXBhYmlsaXRpZXMgL1xuLy8gcGFyYW1ldGVycy5cblNEUFV0aWxzLndyaXRlUnRwRGVzY3JpcHRpb24gPSBmdW5jdGlvbihraW5kLCBjYXBzKSB7XG4gIHZhciBzZHAgPSAnJztcblxuICAvLyBCdWlsZCB0aGUgbWxpbmUuXG4gIHNkcCArPSAnbT0nICsga2luZCArICcgJztcbiAgc2RwICs9IGNhcHMuY29kZWNzLmxlbmd0aCA+IDAgPyAnOScgOiAnMCc7IC8vIHJlamVjdCBpZiBubyBjb2RlY3MuXG4gIHNkcCArPSAnIFVEUC9UTFMvUlRQL1NBVlBGICc7XG4gIHNkcCArPSBjYXBzLmNvZGVjcy5tYXAoZnVuY3Rpb24oY29kZWMpIHtcbiAgICBpZiAoY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGNvZGVjLnByZWZlcnJlZFBheWxvYWRUeXBlO1xuICAgIH1cbiAgICByZXR1cm4gY29kZWMucGF5bG9hZFR5cGU7XG4gIH0pLmpvaW4oJyAnKSArICdcXHJcXG4nO1xuXG4gIHNkcCArPSAnYz1JTiBJUDQgMC4wLjAuMFxcclxcbic7XG4gIHNkcCArPSAnYT1ydGNwOjkgSU4gSVA0IDAuMC4wLjBcXHJcXG4nO1xuXG4gIC8vIEFkZCBhPXJ0cG1hcCBsaW5lcyBmb3IgZWFjaCBjb2RlYy4gQWxzbyBmbXRwIGFuZCBydGNwLWZiLlxuICBjYXBzLmNvZGVjcy5mb3JFYWNoKGZ1bmN0aW9uKGNvZGVjKSB7XG4gICAgc2RwICs9IFNEUFV0aWxzLndyaXRlUnRwTWFwKGNvZGVjKTtcbiAgICBzZHAgKz0gU0RQVXRpbHMud3JpdGVGbXRwKGNvZGVjKTtcbiAgICBzZHAgKz0gU0RQVXRpbHMud3JpdGVSdGNwRmIoY29kZWMpO1xuICB9KTtcbiAgdmFyIG1heHB0aW1lID0gMDtcbiAgY2Fwcy5jb2RlY3MuZm9yRWFjaChmdW5jdGlvbihjb2RlYykge1xuICAgIGlmIChjb2RlYy5tYXhwdGltZSA+IG1heHB0aW1lKSB7XG4gICAgICBtYXhwdGltZSA9IGNvZGVjLm1heHB0aW1lO1xuICAgIH1cbiAgfSk7XG4gIGlmIChtYXhwdGltZSA+IDApIHtcbiAgICBzZHAgKz0gJ2E9bWF4cHRpbWU6JyArIG1heHB0aW1lICsgJ1xcclxcbic7XG4gIH1cbiAgc2RwICs9ICdhPXJ0Y3AtbXV4XFxyXFxuJztcblxuICBjYXBzLmhlYWRlckV4dGVuc2lvbnMuZm9yRWFjaChmdW5jdGlvbihleHRlbnNpb24pIHtcbiAgICBzZHAgKz0gU0RQVXRpbHMud3JpdGVFeHRtYXAoZXh0ZW5zaW9uKTtcbiAgfSk7XG4gIC8vIEZJWE1FOiB3cml0ZSBmZWNNZWNoYW5pc21zLlxuICByZXR1cm4gc2RwO1xufTtcblxuLy8gUGFyc2VzIHRoZSBTRFAgbWVkaWEgc2VjdGlvbiBhbmQgcmV0dXJucyBhbiBhcnJheSBvZlxuLy8gUlRDUnRwRW5jb2RpbmdQYXJhbWV0ZXJzLlxuU0RQVXRpbHMucGFyc2VSdHBFbmNvZGluZ1BhcmFtZXRlcnMgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcbiAgdmFyIGVuY29kaW5nUGFyYW1ldGVycyA9IFtdO1xuICB2YXIgZGVzY3JpcHRpb24gPSBTRFBVdGlscy5wYXJzZVJ0cFBhcmFtZXRlcnMobWVkaWFTZWN0aW9uKTtcbiAgdmFyIGhhc1JlZCA9IGRlc2NyaXB0aW9uLmZlY01lY2hhbmlzbXMuaW5kZXhPZignUkVEJykgIT09IC0xO1xuICB2YXIgaGFzVWxwZmVjID0gZGVzY3JpcHRpb24uZmVjTWVjaGFuaXNtcy5pbmRleE9mKCdVTFBGRUMnKSAhPT0gLTE7XG5cbiAgLy8gZmlsdGVyIGE9c3NyYzouLi4gY25hbWU6LCBpZ25vcmUgUGxhbkItbXNpZFxuICB2YXIgc3NyY3MgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPXNzcmM6JylcbiAgLm1hcChmdW5jdGlvbihsaW5lKSB7XG4gICAgcmV0dXJuIFNEUFV0aWxzLnBhcnNlU3NyY01lZGlhKGxpbmUpO1xuICB9KVxuICAuZmlsdGVyKGZ1bmN0aW9uKHBhcnRzKSB7XG4gICAgcmV0dXJuIHBhcnRzLmF0dHJpYnV0ZSA9PT0gJ2NuYW1lJztcbiAgfSk7XG4gIHZhciBwcmltYXJ5U3NyYyA9IHNzcmNzLmxlbmd0aCA+IDAgJiYgc3NyY3NbMF0uc3NyYztcbiAgdmFyIHNlY29uZGFyeVNzcmM7XG5cbiAgdmFyIGZsb3dzID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1zc3JjLWdyb3VwOkZJRCcpXG4gIC5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgIHZhciBwYXJ0cyA9IGxpbmUuc3BsaXQoJyAnKTtcbiAgICBwYXJ0cy5zaGlmdCgpO1xuICAgIHJldHVybiBwYXJ0cy5tYXAoZnVuY3Rpb24ocGFydCkge1xuICAgICAgcmV0dXJuIHBhcnNlSW50KHBhcnQsIDEwKTtcbiAgICB9KTtcbiAgfSk7XG4gIGlmIChmbG93cy5sZW5ndGggPiAwICYmIGZsb3dzWzBdLmxlbmd0aCA+IDEgJiYgZmxvd3NbMF1bMF0gPT09IHByaW1hcnlTc3JjKSB7XG4gICAgc2Vjb25kYXJ5U3NyYyA9IGZsb3dzWzBdWzFdO1xuICB9XG5cbiAgZGVzY3JpcHRpb24uY29kZWNzLmZvckVhY2goZnVuY3Rpb24oY29kZWMpIHtcbiAgICBpZiAoY29kZWMubmFtZS50b1VwcGVyQ2FzZSgpID09PSAnUlRYJyAmJiBjb2RlYy5wYXJhbWV0ZXJzLmFwdCkge1xuICAgICAgdmFyIGVuY1BhcmFtID0ge1xuICAgICAgICBzc3JjOiBwcmltYXJ5U3NyYyxcbiAgICAgICAgY29kZWNQYXlsb2FkVHlwZTogcGFyc2VJbnQoY29kZWMucGFyYW1ldGVycy5hcHQsIDEwKSxcbiAgICAgICAgcnR4OiB7XG4gICAgICAgICAgc3NyYzogc2Vjb25kYXJ5U3NyY1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgZW5jb2RpbmdQYXJhbWV0ZXJzLnB1c2goZW5jUGFyYW0pO1xuICAgICAgaWYgKGhhc1JlZCkge1xuICAgICAgICBlbmNQYXJhbSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZW5jUGFyYW0pKTtcbiAgICAgICAgZW5jUGFyYW0uZmVjID0ge1xuICAgICAgICAgIHNzcmM6IHNlY29uZGFyeVNzcmMsXG4gICAgICAgICAgbWVjaGFuaXNtOiBoYXNVbHBmZWMgPyAncmVkK3VscGZlYycgOiAncmVkJ1xuICAgICAgICB9O1xuICAgICAgICBlbmNvZGluZ1BhcmFtZXRlcnMucHVzaChlbmNQYXJhbSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgaWYgKGVuY29kaW5nUGFyYW1ldGVycy5sZW5ndGggPT09IDAgJiYgcHJpbWFyeVNzcmMpIHtcbiAgICBlbmNvZGluZ1BhcmFtZXRlcnMucHVzaCh7XG4gICAgICBzc3JjOiBwcmltYXJ5U3NyY1xuICAgIH0pO1xuICB9XG5cbiAgLy8gd2Ugc3VwcG9ydCBib3RoIGI9QVMgYW5kIGI9VElBUyBidXQgaW50ZXJwcmV0IEFTIGFzIFRJQVMuXG4gIHZhciBiYW5kd2lkdGggPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdiPScpO1xuICBpZiAoYmFuZHdpZHRoLmxlbmd0aCkge1xuICAgIGlmIChiYW5kd2lkdGhbMF0uaW5kZXhPZignYj1USUFTOicpID09PSAwKSB7XG4gICAgICBiYW5kd2lkdGggPSBwYXJzZUludChiYW5kd2lkdGhbMF0uc3Vic3RyKDcpLCAxMCk7XG4gICAgfSBlbHNlIGlmIChiYW5kd2lkdGhbMF0uaW5kZXhPZignYj1BUzonKSA9PT0gMCkge1xuICAgICAgLy8gdXNlIGZvcm11bGEgZnJvbSBKU0VQIHRvIGNvbnZlcnQgYj1BUyB0byBUSUFTIHZhbHVlLlxuICAgICAgYmFuZHdpZHRoID0gcGFyc2VJbnQoYmFuZHdpZHRoWzBdLnN1YnN0cig1KSwgMTApICogMTAwMCAqIDAuOTVcbiAgICAgICAgICAtICg1MCAqIDQwICogOCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJhbmR3aWR0aCA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgZW5jb2RpbmdQYXJhbWV0ZXJzLmZvckVhY2goZnVuY3Rpb24ocGFyYW1zKSB7XG4gICAgICBwYXJhbXMubWF4Qml0cmF0ZSA9IGJhbmR3aWR0aDtcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gZW5jb2RpbmdQYXJhbWV0ZXJzO1xufTtcblxuLy8gcGFyc2VzIGh0dHA6Ly9kcmFmdC5vcnRjLm9yZy8jcnRjcnRjcHBhcmFtZXRlcnMqXG5TRFBVdGlscy5wYXJzZVJ0Y3BQYXJhbWV0ZXJzID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XG4gIHZhciBydGNwUGFyYW1ldGVycyA9IHt9O1xuXG4gIHZhciBjbmFtZTtcbiAgLy8gR2V0cyB0aGUgZmlyc3QgU1NSQy4gTm90ZSB0aGF0IHdpdGggUlRYIHRoZXJlIG1pZ2h0IGJlIG11bHRpcGxlXG4gIC8vIFNTUkNzLlxuICB2YXIgcmVtb3RlU3NyYyA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9c3NyYzonKVxuICAgICAgLm1hcChmdW5jdGlvbihsaW5lKSB7XG4gICAgICAgIHJldHVybiBTRFBVdGlscy5wYXJzZVNzcmNNZWRpYShsaW5lKTtcbiAgICAgIH0pXG4gICAgICAuZmlsdGVyKGZ1bmN0aW9uKG9iaikge1xuICAgICAgICByZXR1cm4gb2JqLmF0dHJpYnV0ZSA9PT0gJ2NuYW1lJztcbiAgICAgIH0pWzBdO1xuICBpZiAocmVtb3RlU3NyYykge1xuICAgIHJ0Y3BQYXJhbWV0ZXJzLmNuYW1lID0gcmVtb3RlU3NyYy52YWx1ZTtcbiAgICBydGNwUGFyYW1ldGVycy5zc3JjID0gcmVtb3RlU3NyYy5zc3JjO1xuICB9XG5cbiAgLy8gRWRnZSB1c2VzIHRoZSBjb21wb3VuZCBhdHRyaWJ1dGUgaW5zdGVhZCBvZiByZWR1Y2VkU2l6ZVxuICAvLyBjb21wb3VuZCBpcyAhcmVkdWNlZFNpemVcbiAgdmFyIHJzaXplID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1ydGNwLXJzaXplJyk7XG4gIHJ0Y3BQYXJhbWV0ZXJzLnJlZHVjZWRTaXplID0gcnNpemUubGVuZ3RoID4gMDtcbiAgcnRjcFBhcmFtZXRlcnMuY29tcG91bmQgPSByc2l6ZS5sZW5ndGggPT09IDA7XG5cbiAgLy8gcGFyc2VzIHRoZSBydGNwLW11eCBhdHRy0ZZidXRlLlxuICAvLyBOb3RlIHRoYXQgRWRnZSBkb2VzIG5vdCBzdXBwb3J0IHVubXV4ZWQgUlRDUC5cbiAgdmFyIG11eCA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9cnRjcC1tdXgnKTtcbiAgcnRjcFBhcmFtZXRlcnMubXV4ID0gbXV4Lmxlbmd0aCA+IDA7XG5cbiAgcmV0dXJuIHJ0Y3BQYXJhbWV0ZXJzO1xufTtcblxuLy8gcGFyc2VzIGVpdGhlciBhPW1zaWQ6IG9yIGE9c3NyYzouLi4gbXNpZCBsaW5lcyBhbmQgcmV0dXJuc1xuLy8gdGhlIGlkIG9mIHRoZSBNZWRpYVN0cmVhbSBhbmQgTWVkaWFTdHJlYW1UcmFjay5cblNEUFV0aWxzLnBhcnNlTXNpZCA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbikge1xuICB2YXIgcGFydHM7XG4gIHZhciBzcGVjID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1tc2lkOicpO1xuICBpZiAoc3BlYy5sZW5ndGggPT09IDEpIHtcbiAgICBwYXJ0cyA9IHNwZWNbMF0uc3Vic3RyKDcpLnNwbGl0KCcgJyk7XG4gICAgcmV0dXJuIHtzdHJlYW06IHBhcnRzWzBdLCB0cmFjazogcGFydHNbMV19O1xuICB9XG4gIHZhciBwbGFuQiA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9c3NyYzonKVxuICAubWFwKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICByZXR1cm4gU0RQVXRpbHMucGFyc2VTc3JjTWVkaWEobGluZSk7XG4gIH0pXG4gIC5maWx0ZXIoZnVuY3Rpb24ocGFydHMpIHtcbiAgICByZXR1cm4gcGFydHMuYXR0cmlidXRlID09PSAnbXNpZCc7XG4gIH0pO1xuICBpZiAocGxhbkIubGVuZ3RoID4gMCkge1xuICAgIHBhcnRzID0gcGxhbkJbMF0udmFsdWUuc3BsaXQoJyAnKTtcbiAgICByZXR1cm4ge3N0cmVhbTogcGFydHNbMF0sIHRyYWNrOiBwYXJ0c1sxXX07XG4gIH1cbn07XG5cbi8vIEdlbmVyYXRlIGEgc2Vzc2lvbiBJRCBmb3IgU0RQLlxuLy8gaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL2RyYWZ0LWlldGYtcnRjd2ViLWpzZXAtMjAjc2VjdGlvbi01LjIuMVxuLy8gcmVjb21tZW5kcyB1c2luZyBhIGNyeXB0b2dyYXBoaWNhbGx5IHJhbmRvbSArdmUgNjQtYml0IHZhbHVlXG4vLyBidXQgcmlnaHQgbm93IHRoaXMgc2hvdWxkIGJlIGFjY2VwdGFibGUgYW5kIHdpdGhpbiB0aGUgcmlnaHQgcmFuZ2VcblNEUFV0aWxzLmdlbmVyYXRlU2Vzc2lvbklkID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCkuc3Vic3RyKDIsIDIxKTtcbn07XG5cbi8vIFdyaXRlIGJvaWxkZXIgcGxhdGUgZm9yIHN0YXJ0IG9mIFNEUFxuLy8gc2Vzc0lkIGFyZ3VtZW50IGlzIG9wdGlvbmFsIC0gaWYgbm90IHN1cHBsaWVkIGl0IHdpbGxcbi8vIGJlIGdlbmVyYXRlZCByYW5kb21seVxuLy8gc2Vzc1ZlcnNpb24gaXMgb3B0aW9uYWwgYW5kIGRlZmF1bHRzIHRvIDJcblNEUFV0aWxzLndyaXRlU2Vzc2lvbkJvaWxlcnBsYXRlID0gZnVuY3Rpb24oc2Vzc0lkLCBzZXNzVmVyKSB7XG4gIHZhciBzZXNzaW9uSWQ7XG4gIHZhciB2ZXJzaW9uID0gc2Vzc1ZlciAhPT0gdW5kZWZpbmVkID8gc2Vzc1ZlciA6IDI7XG4gIGlmIChzZXNzSWQpIHtcbiAgICBzZXNzaW9uSWQgPSBzZXNzSWQ7XG4gIH0gZWxzZSB7XG4gICAgc2Vzc2lvbklkID0gU0RQVXRpbHMuZ2VuZXJhdGVTZXNzaW9uSWQoKTtcbiAgfVxuICAvLyBGSVhNRTogc2Vzcy1pZCBzaG91bGQgYmUgYW4gTlRQIHRpbWVzdGFtcC5cbiAgcmV0dXJuICd2PTBcXHJcXG4nICtcbiAgICAgICdvPXRoaXNpc2FkYXB0ZXJvcnRjICcgKyBzZXNzaW9uSWQgKyAnICcgKyB2ZXJzaW9uICsgJyBJTiBJUDQgMTI3LjAuMC4xXFxyXFxuJyArXG4gICAgICAncz0tXFxyXFxuJyArXG4gICAgICAndD0wIDBcXHJcXG4nO1xufTtcblxuU0RQVXRpbHMud3JpdGVNZWRpYVNlY3Rpb24gPSBmdW5jdGlvbih0cmFuc2NlaXZlciwgY2FwcywgdHlwZSwgc3RyZWFtKSB7XG4gIHZhciBzZHAgPSBTRFBVdGlscy53cml0ZVJ0cERlc2NyaXB0aW9uKHRyYW5zY2VpdmVyLmtpbmQsIGNhcHMpO1xuXG4gIC8vIE1hcCBJQ0UgcGFyYW1ldGVycyAodWZyYWcsIHB3ZCkgdG8gU0RQLlxuICBzZHAgKz0gU0RQVXRpbHMud3JpdGVJY2VQYXJhbWV0ZXJzKFxuICAgICAgdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIuZ2V0TG9jYWxQYXJhbWV0ZXJzKCkpO1xuXG4gIC8vIE1hcCBEVExTIHBhcmFtZXRlcnMgdG8gU0RQLlxuICBzZHAgKz0gU0RQVXRpbHMud3JpdGVEdGxzUGFyYW1ldGVycyhcbiAgICAgIHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQuZ2V0TG9jYWxQYXJhbWV0ZXJzKCksXG4gICAgICB0eXBlID09PSAnb2ZmZXInID8gJ2FjdHBhc3MnIDogJ2FjdGl2ZScpO1xuXG4gIHNkcCArPSAnYT1taWQ6JyArIHRyYW5zY2VpdmVyLm1pZCArICdcXHJcXG4nO1xuXG4gIGlmICh0cmFuc2NlaXZlci5kaXJlY3Rpb24pIHtcbiAgICBzZHAgKz0gJ2E9JyArIHRyYW5zY2VpdmVyLmRpcmVjdGlvbiArICdcXHJcXG4nO1xuICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlciAmJiB0cmFuc2NlaXZlci5ydHBSZWNlaXZlcikge1xuICAgIHNkcCArPSAnYT1zZW5kcmVjdlxcclxcbic7XG4gIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIucnRwU2VuZGVyKSB7XG4gICAgc2RwICs9ICdhPXNlbmRvbmx5XFxyXFxuJztcbiAgfSBlbHNlIGlmICh0cmFuc2NlaXZlci5ydHBSZWNlaXZlcikge1xuICAgIHNkcCArPSAnYT1yZWN2b25seVxcclxcbic7XG4gIH0gZWxzZSB7XG4gICAgc2RwICs9ICdhPWluYWN0aXZlXFxyXFxuJztcbiAgfVxuXG4gIGlmICh0cmFuc2NlaXZlci5ydHBTZW5kZXIpIHtcbiAgICAvLyBzcGVjLlxuICAgIHZhciBtc2lkID0gJ21zaWQ6JyArIHN0cmVhbS5pZCArICcgJyArXG4gICAgICAgIHRyYW5zY2VpdmVyLnJ0cFNlbmRlci50cmFjay5pZCArICdcXHJcXG4nO1xuICAgIHNkcCArPSAnYT0nICsgbXNpZDtcblxuICAgIC8vIGZvciBDaHJvbWUuXG4gICAgc2RwICs9ICdhPXNzcmM6JyArIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYyArXG4gICAgICAgICcgJyArIG1zaWQ7XG4gICAgaWYgKHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4KSB7XG4gICAgICBzZHAgKz0gJ2E9c3NyYzonICsgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHguc3NyYyArXG4gICAgICAgICAgJyAnICsgbXNpZDtcbiAgICAgIHNkcCArPSAnYT1zc3JjLWdyb3VwOkZJRCAnICtcbiAgICAgICAgICB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmMgKyAnICcgK1xuICAgICAgICAgIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4LnNzcmMgK1xuICAgICAgICAgICdcXHJcXG4nO1xuICAgIH1cbiAgfVxuICAvLyBGSVhNRTogdGhpcyBzaG91bGQgYmUgd3JpdHRlbiBieSB3cml0ZVJ0cERlc2NyaXB0aW9uLlxuICBzZHAgKz0gJ2E9c3NyYzonICsgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjICtcbiAgICAgICcgY25hbWU6JyArIFNEUFV0aWxzLmxvY2FsQ05hbWUgKyAnXFxyXFxuJztcbiAgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlciAmJiB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCkge1xuICAgIHNkcCArPSAnYT1zc3JjOicgKyB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eC5zc3JjICtcbiAgICAgICAgJyBjbmFtZTonICsgU0RQVXRpbHMubG9jYWxDTmFtZSArICdcXHJcXG4nO1xuICB9XG4gIHJldHVybiBzZHA7XG59O1xuXG4vLyBHZXRzIHRoZSBkaXJlY3Rpb24gZnJvbSB0aGUgbWVkaWFTZWN0aW9uIG9yIHRoZSBzZXNzaW9ucGFydC5cblNEUFV0aWxzLmdldERpcmVjdGlvbiA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbiwgc2Vzc2lvbnBhcnQpIHtcbiAgLy8gTG9vayBmb3Igc2VuZHJlY3YsIHNlbmRvbmx5LCByZWN2b25seSwgaW5hY3RpdmUsIGRlZmF1bHQgdG8gc2VuZHJlY3YuXG4gIHZhciBsaW5lcyA9IFNEUFV0aWxzLnNwbGl0TGluZXMobWVkaWFTZWN0aW9uKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xuICAgIHN3aXRjaCAobGluZXNbaV0pIHtcbiAgICAgIGNhc2UgJ2E9c2VuZHJlY3YnOlxuICAgICAgY2FzZSAnYT1zZW5kb25seSc6XG4gICAgICBjYXNlICdhPXJlY3Zvbmx5JzpcbiAgICAgIGNhc2UgJ2E9aW5hY3RpdmUnOlxuICAgICAgICByZXR1cm4gbGluZXNbaV0uc3Vic3RyKDIpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgLy8gRklYTUU6IFdoYXQgc2hvdWxkIGhhcHBlbiBoZXJlP1xuICAgIH1cbiAgfVxuICBpZiAoc2Vzc2lvbnBhcnQpIHtcbiAgICByZXR1cm4gU0RQVXRpbHMuZ2V0RGlyZWN0aW9uKHNlc3Npb25wYXJ0KTtcbiAgfVxuICByZXR1cm4gJ3NlbmRyZWN2Jztcbn07XG5cblNEUFV0aWxzLmdldEtpbmQgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcbiAgdmFyIGxpbmVzID0gU0RQVXRpbHMuc3BsaXRMaW5lcyhtZWRpYVNlY3Rpb24pO1xuICB2YXIgbWxpbmUgPSBsaW5lc1swXS5zcGxpdCgnICcpO1xuICByZXR1cm4gbWxpbmVbMF0uc3Vic3RyKDIpO1xufTtcblxuU0RQVXRpbHMuaXNSZWplY3RlZCA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbikge1xuICByZXR1cm4gbWVkaWFTZWN0aW9uLnNwbGl0KCcgJywgMilbMV0gPT09ICcwJztcbn07XG5cblNEUFV0aWxzLnBhcnNlTUxpbmUgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcbiAgdmFyIGxpbmVzID0gU0RQVXRpbHMuc3BsaXRMaW5lcyhtZWRpYVNlY3Rpb24pO1xuICB2YXIgcGFydHMgPSBsaW5lc1swXS5zdWJzdHIoMikuc3BsaXQoJyAnKTtcbiAgcmV0dXJuIHtcbiAgICBraW5kOiBwYXJ0c1swXSxcbiAgICBwb3J0OiBwYXJzZUludChwYXJ0c1sxXSwgMTApLFxuICAgIHByb3RvY29sOiBwYXJ0c1syXSxcbiAgICBmbXQ6IHBhcnRzLnNsaWNlKDMpLmpvaW4oJyAnKVxuICB9O1xufTtcblxuU0RQVXRpbHMucGFyc2VPTGluZSA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbikge1xuICB2YXIgbGluZSA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ289JylbMF07XG4gIHZhciBwYXJ0cyA9IGxpbmUuc3Vic3RyKDIpLnNwbGl0KCcgJyk7XG4gIHJldHVybiB7XG4gICAgdXNlcm5hbWU6IHBhcnRzWzBdLFxuICAgIHNlc3Npb25JZDogcGFydHNbMV0sXG4gICAgc2Vzc2lvblZlcnNpb246IHBhcnNlSW50KHBhcnRzWzJdLCAxMCksXG4gICAgbmV0VHlwZTogcGFydHNbM10sXG4gICAgYWRkcmVzc1R5cGU6IHBhcnRzWzRdLFxuICAgIGFkZHJlc3M6IHBhcnRzWzVdLFxuICB9O1xufVxuXG4vLyBFeHBvc2UgcHVibGljIG1ldGhvZHMuXG5pZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBTRFBVdGlscztcbn1cblxufSx7fV0sMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24gKGdsb2JhbCl7XG4vKlxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxuICogIHRyZWUuXG4gKi9cbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgYWRhcHRlckZhY3RvcnkgPSByZXF1aXJlKCcuL2FkYXB0ZXJfZmFjdG9yeS5qcycpO1xubW9kdWxlLmV4cG9ydHMgPSBhZGFwdGVyRmFjdG9yeSh7d2luZG93OiBnbG9iYWwud2luZG93fSk7XG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxufSx7XCIuL2FkYXB0ZXJfZmFjdG9yeS5qc1wiOjR9XSw0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8qXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXG4gKiAgdHJlZS5cbiAqL1xuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbi8vIFNoaW1taW5nIHN0YXJ0cyBoZXJlLlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkZXBlbmRlbmNpZXMsIG9wdHMpIHtcbiAgdmFyIHdpbmRvdyA9IGRlcGVuZGVuY2llcyAmJiBkZXBlbmRlbmNpZXMud2luZG93O1xuXG4gIHZhciBvcHRpb25zID0ge1xuICAgIHNoaW1DaHJvbWU6IHRydWUsXG4gICAgc2hpbUZpcmVmb3g6IHRydWUsXG4gICAgc2hpbUVkZ2U6IHRydWUsXG4gICAgc2hpbVNhZmFyaTogdHJ1ZSxcbiAgfTtcblxuICBmb3IgKHZhciBrZXkgaW4gb3B0cykge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9wdHMsIGtleSkpIHtcbiAgICAgIG9wdGlvbnNba2V5XSA9IG9wdHNba2V5XTtcbiAgICB9XG4gIH1cblxuICAvLyBVdGlscy5cbiAgdmFyIGxvZ2dpbmcgPSB1dGlscy5sb2c7XG4gIHZhciBicm93c2VyRGV0YWlscyA9IHV0aWxzLmRldGVjdEJyb3dzZXIod2luZG93KTtcblxuICAvLyBVbmNvbW1lbnQgdGhlIGxpbmUgYmVsb3cgaWYgeW91IHdhbnQgbG9nZ2luZyB0byBvY2N1ciwgaW5jbHVkaW5nIGxvZ2dpbmdcbiAgLy8gZm9yIHRoZSBzd2l0Y2ggc3RhdGVtZW50IGJlbG93LiBDYW4gYWxzbyBiZSB0dXJuZWQgb24gaW4gdGhlIGJyb3dzZXIgdmlhXG4gIC8vIGFkYXB0ZXIuZGlzYWJsZUxvZyhmYWxzZSksIGJ1dCB0aGVuIGxvZ2dpbmcgZnJvbSB0aGUgc3dpdGNoIHN0YXRlbWVudCBiZWxvd1xuICAvLyB3aWxsIG5vdCBhcHBlYXIuXG4gIC8vIHJlcXVpcmUoJy4vdXRpbHMnKS5kaXNhYmxlTG9nKGZhbHNlKTtcblxuICAvLyBCcm93c2VyIHNoaW1zLlxuICB2YXIgY2hyb21lU2hpbSA9IHJlcXVpcmUoJy4vY2hyb21lL2Nocm9tZV9zaGltJykgfHwgbnVsbDtcbiAgdmFyIGVkZ2VTaGltID0gcmVxdWlyZSgnLi9lZGdlL2VkZ2Vfc2hpbScpIHx8IG51bGw7XG4gIHZhciBmaXJlZm94U2hpbSA9IHJlcXVpcmUoJy4vZmlyZWZveC9maXJlZm94X3NoaW0nKSB8fCBudWxsO1xuICB2YXIgc2FmYXJpU2hpbSA9IHJlcXVpcmUoJy4vc2FmYXJpL3NhZmFyaV9zaGltJykgfHwgbnVsbDtcbiAgdmFyIGNvbW1vblNoaW0gPSByZXF1aXJlKCcuL2NvbW1vbl9zaGltJykgfHwgbnVsbDtcblxuICAvLyBFeHBvcnQgdG8gdGhlIGFkYXB0ZXIgZ2xvYmFsIG9iamVjdCB2aXNpYmxlIGluIHRoZSBicm93c2VyLlxuICB2YXIgYWRhcHRlciA9IHtcbiAgICBicm93c2VyRGV0YWlsczogYnJvd3NlckRldGFpbHMsXG4gICAgY29tbW9uU2hpbTogY29tbW9uU2hpbSxcbiAgICBleHRyYWN0VmVyc2lvbjogdXRpbHMuZXh0cmFjdFZlcnNpb24sXG4gICAgZGlzYWJsZUxvZzogdXRpbHMuZGlzYWJsZUxvZyxcbiAgICBkaXNhYmxlV2FybmluZ3M6IHV0aWxzLmRpc2FibGVXYXJuaW5nc1xuICB9O1xuXG4gIC8vIFNoaW0gYnJvd3NlciBpZiBmb3VuZC5cbiAgc3dpdGNoIChicm93c2VyRGV0YWlscy5icm93c2VyKSB7XG4gICAgY2FzZSAnY2hyb21lJzpcbiAgICAgIGlmICghY2hyb21lU2hpbSB8fCAhY2hyb21lU2hpbS5zaGltUGVlckNvbm5lY3Rpb24gfHxcbiAgICAgICAgICAhb3B0aW9ucy5zaGltQ2hyb21lKSB7XG4gICAgICAgIGxvZ2dpbmcoJ0Nocm9tZSBzaGltIGlzIG5vdCBpbmNsdWRlZCBpbiB0aGlzIGFkYXB0ZXIgcmVsZWFzZS4nKTtcbiAgICAgICAgcmV0dXJuIGFkYXB0ZXI7XG4gICAgICB9XG4gICAgICBsb2dnaW5nKCdhZGFwdGVyLmpzIHNoaW1taW5nIGNocm9tZS4nKTtcbiAgICAgIC8vIEV4cG9ydCB0byB0aGUgYWRhcHRlciBnbG9iYWwgb2JqZWN0IHZpc2libGUgaW4gdGhlIGJyb3dzZXIuXG4gICAgICBhZGFwdGVyLmJyb3dzZXJTaGltID0gY2hyb21lU2hpbTtcbiAgICAgIGNvbW1vblNoaW0uc2hpbUNyZWF0ZU9iamVjdFVSTCh3aW5kb3cpO1xuXG4gICAgICBjaHJvbWVTaGltLnNoaW1HZXRVc2VyTWVkaWEod2luZG93KTtcbiAgICAgIGNocm9tZVNoaW0uc2hpbU1lZGlhU3RyZWFtKHdpbmRvdyk7XG4gICAgICBjaHJvbWVTaGltLnNoaW1Tb3VyY2VPYmplY3Qod2luZG93KTtcbiAgICAgIGNocm9tZVNoaW0uc2hpbVBlZXJDb25uZWN0aW9uKHdpbmRvdyk7XG4gICAgICBjaHJvbWVTaGltLnNoaW1PblRyYWNrKHdpbmRvdyk7XG4gICAgICBjaHJvbWVTaGltLnNoaW1BZGRUcmFja1JlbW92ZVRyYWNrKHdpbmRvdyk7XG4gICAgICBjaHJvbWVTaGltLnNoaW1HZXRTZW5kZXJzV2l0aER0bWYod2luZG93KTtcblxuICAgICAgY29tbW9uU2hpbS5zaGltUlRDSWNlQ2FuZGlkYXRlKHdpbmRvdyk7XG4gICAgICBjb21tb25TaGltLnNoaW1NYXhNZXNzYWdlU2l6ZSh3aW5kb3cpO1xuICAgICAgY29tbW9uU2hpbS5zaGltU2VuZFRocm93VHlwZUVycm9yKHdpbmRvdyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdmaXJlZm94JzpcbiAgICAgIGlmICghZmlyZWZveFNoaW0gfHwgIWZpcmVmb3hTaGltLnNoaW1QZWVyQ29ubmVjdGlvbiB8fFxuICAgICAgICAgICFvcHRpb25zLnNoaW1GaXJlZm94KSB7XG4gICAgICAgIGxvZ2dpbmcoJ0ZpcmVmb3ggc2hpbSBpcyBub3QgaW5jbHVkZWQgaW4gdGhpcyBhZGFwdGVyIHJlbGVhc2UuJyk7XG4gICAgICAgIHJldHVybiBhZGFwdGVyO1xuICAgICAgfVxuICAgICAgbG9nZ2luZygnYWRhcHRlci5qcyBzaGltbWluZyBmaXJlZm94LicpO1xuICAgICAgLy8gRXhwb3J0IHRvIHRoZSBhZGFwdGVyIGdsb2JhbCBvYmplY3QgdmlzaWJsZSBpbiB0aGUgYnJvd3Nlci5cbiAgICAgIGFkYXB0ZXIuYnJvd3NlclNoaW0gPSBmaXJlZm94U2hpbTtcbiAgICAgIGNvbW1vblNoaW0uc2hpbUNyZWF0ZU9iamVjdFVSTCh3aW5kb3cpO1xuXG4gICAgICBmaXJlZm94U2hpbS5zaGltR2V0VXNlck1lZGlhKHdpbmRvdyk7XG4gICAgICBmaXJlZm94U2hpbS5zaGltU291cmNlT2JqZWN0KHdpbmRvdyk7XG4gICAgICBmaXJlZm94U2hpbS5zaGltUGVlckNvbm5lY3Rpb24od2luZG93KTtcbiAgICAgIGZpcmVmb3hTaGltLnNoaW1PblRyYWNrKHdpbmRvdyk7XG4gICAgICBmaXJlZm94U2hpbS5zaGltUmVtb3ZlU3RyZWFtKHdpbmRvdyk7XG5cbiAgICAgIGNvbW1vblNoaW0uc2hpbVJUQ0ljZUNhbmRpZGF0ZSh3aW5kb3cpO1xuICAgICAgY29tbW9uU2hpbS5zaGltTWF4TWVzc2FnZVNpemUod2luZG93KTtcbiAgICAgIGNvbW1vblNoaW0uc2hpbVNlbmRUaHJvd1R5cGVFcnJvcih3aW5kb3cpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnZWRnZSc6XG4gICAgICBpZiAoIWVkZ2VTaGltIHx8ICFlZGdlU2hpbS5zaGltUGVlckNvbm5lY3Rpb24gfHwgIW9wdGlvbnMuc2hpbUVkZ2UpIHtcbiAgICAgICAgbG9nZ2luZygnTVMgZWRnZSBzaGltIGlzIG5vdCBpbmNsdWRlZCBpbiB0aGlzIGFkYXB0ZXIgcmVsZWFzZS4nKTtcbiAgICAgICAgcmV0dXJuIGFkYXB0ZXI7XG4gICAgICB9XG4gICAgICBsb2dnaW5nKCdhZGFwdGVyLmpzIHNoaW1taW5nIGVkZ2UuJyk7XG4gICAgICAvLyBFeHBvcnQgdG8gdGhlIGFkYXB0ZXIgZ2xvYmFsIG9iamVjdCB2aXNpYmxlIGluIHRoZSBicm93c2VyLlxuICAgICAgYWRhcHRlci5icm93c2VyU2hpbSA9IGVkZ2VTaGltO1xuICAgICAgY29tbW9uU2hpbS5zaGltQ3JlYXRlT2JqZWN0VVJMKHdpbmRvdyk7XG5cbiAgICAgIGVkZ2VTaGltLnNoaW1HZXRVc2VyTWVkaWEod2luZG93KTtcbiAgICAgIGVkZ2VTaGltLnNoaW1QZWVyQ29ubmVjdGlvbih3aW5kb3cpO1xuICAgICAgZWRnZVNoaW0uc2hpbVJlcGxhY2VUcmFjayh3aW5kb3cpO1xuXG4gICAgICAvLyB0aGUgZWRnZSBzaGltIGltcGxlbWVudHMgdGhlIGZ1bGwgUlRDSWNlQ2FuZGlkYXRlIG9iamVjdC5cblxuICAgICAgY29tbW9uU2hpbS5zaGltTWF4TWVzc2FnZVNpemUod2luZG93KTtcbiAgICAgIGNvbW1vblNoaW0uc2hpbVNlbmRUaHJvd1R5cGVFcnJvcih3aW5kb3cpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnc2FmYXJpJzpcbiAgICAgIGlmICghc2FmYXJpU2hpbSB8fCAhb3B0aW9ucy5zaGltU2FmYXJpKSB7XG4gICAgICAgIGxvZ2dpbmcoJ1NhZmFyaSBzaGltIGlzIG5vdCBpbmNsdWRlZCBpbiB0aGlzIGFkYXB0ZXIgcmVsZWFzZS4nKTtcbiAgICAgICAgcmV0dXJuIGFkYXB0ZXI7XG4gICAgICB9XG4gICAgICBsb2dnaW5nKCdhZGFwdGVyLmpzIHNoaW1taW5nIHNhZmFyaS4nKTtcbiAgICAgIC8vIEV4cG9ydCB0byB0aGUgYWRhcHRlciBnbG9iYWwgb2JqZWN0IHZpc2libGUgaW4gdGhlIGJyb3dzZXIuXG4gICAgICBhZGFwdGVyLmJyb3dzZXJTaGltID0gc2FmYXJpU2hpbTtcbiAgICAgIGNvbW1vblNoaW0uc2hpbUNyZWF0ZU9iamVjdFVSTCh3aW5kb3cpO1xuXG4gICAgICBzYWZhcmlTaGltLnNoaW1SVENJY2VTZXJ2ZXJVcmxzKHdpbmRvdyk7XG4gICAgICBzYWZhcmlTaGltLnNoaW1DYWxsYmFja3NBUEkod2luZG93KTtcbiAgICAgIHNhZmFyaVNoaW0uc2hpbUxvY2FsU3RyZWFtc0FQSSh3aW5kb3cpO1xuICAgICAgc2FmYXJpU2hpbS5zaGltUmVtb3RlU3RyZWFtc0FQSSh3aW5kb3cpO1xuICAgICAgc2FmYXJpU2hpbS5zaGltVHJhY2tFdmVudFRyYW5zY2VpdmVyKHdpbmRvdyk7XG4gICAgICBzYWZhcmlTaGltLnNoaW1HZXRVc2VyTWVkaWEod2luZG93KTtcbiAgICAgIHNhZmFyaVNoaW0uc2hpbUNyZWF0ZU9mZmVyTGVnYWN5KHdpbmRvdyk7XG5cbiAgICAgIGNvbW1vblNoaW0uc2hpbVJUQ0ljZUNhbmRpZGF0ZSh3aW5kb3cpO1xuICAgICAgY29tbW9uU2hpbS5zaGltTWF4TWVzc2FnZVNpemUod2luZG93KTtcbiAgICAgIGNvbW1vblNoaW0uc2hpbVNlbmRUaHJvd1R5cGVFcnJvcih3aW5kb3cpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGxvZ2dpbmcoJ1Vuc3VwcG9ydGVkIGJyb3dzZXIhJyk7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIHJldHVybiBhZGFwdGVyO1xufTtcblxufSx7XCIuL2Nocm9tZS9jaHJvbWVfc2hpbVwiOjUsXCIuL2NvbW1vbl9zaGltXCI6NyxcIi4vZWRnZS9lZGdlX3NoaW1cIjo4LFwiLi9maXJlZm94L2ZpcmVmb3hfc2hpbVwiOjEwLFwiLi9zYWZhcmkvc2FmYXJpX3NoaW1cIjoxMixcIi4vdXRpbHNcIjoxM31dLDU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG4vKlxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxuICogIHRyZWUuXG4gKi9cbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cbid1c2Ugc3RyaWN0JztcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzLmpzJyk7XG52YXIgbG9nZ2luZyA9IHV0aWxzLmxvZztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNoaW1HZXRVc2VyTWVkaWE6IHJlcXVpcmUoJy4vZ2V0dXNlcm1lZGlhJyksXG4gIHNoaW1NZWRpYVN0cmVhbTogZnVuY3Rpb24od2luZG93KSB7XG4gICAgd2luZG93Lk1lZGlhU3RyZWFtID0gd2luZG93Lk1lZGlhU3RyZWFtIHx8IHdpbmRvdy53ZWJraXRNZWRpYVN0cmVhbTtcbiAgfSxcblxuICBzaGltT25UcmFjazogZnVuY3Rpb24od2luZG93KSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiAmJiAhKCdvbnRyYWNrJyBpblxuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUsICdvbnRyYWNrJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9vbnRyYWNrO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKGYpIHtcbiAgICAgICAgICBpZiAodGhpcy5fb250cmFjaykge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFjaycsIHRoaXMuX29udHJhY2spO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYWNrJywgdGhpcy5fb250cmFjayA9IGYpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHZhciBvcmlnU2V0UmVtb3RlRGVzY3JpcHRpb24gPVxuICAgICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0UmVtb3RlRGVzY3JpcHRpb247XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnNldFJlbW90ZURlc2NyaXB0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICAgIGlmICghcGMuX29udHJhY2twb2x5KSB7XG4gICAgICAgICAgcGMuX29udHJhY2twb2x5ID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgLy8gb25hZGRzdHJlYW0gZG9lcyBub3QgZmlyZSB3aGVuIGEgdHJhY2sgaXMgYWRkZWQgdG8gYW4gZXhpc3RpbmdcbiAgICAgICAgICAgIC8vIHN0cmVhbS4gQnV0IHN0cmVhbS5vbmFkZHRyYWNrIGlzIGltcGxlbWVudGVkIHNvIHdlIHVzZSB0aGF0LlxuICAgICAgICAgICAgZS5zdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcignYWRkdHJhY2snLCBmdW5jdGlvbih0ZSkge1xuICAgICAgICAgICAgICB2YXIgcmVjZWl2ZXI7XG4gICAgICAgICAgICAgIGlmICh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFJlY2VpdmVycykge1xuICAgICAgICAgICAgICAgIHJlY2VpdmVyID0gcGMuZ2V0UmVjZWl2ZXJzKCkuZmluZChmdW5jdGlvbihyKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gci50cmFjayAmJiByLnRyYWNrLmlkID09PSB0ZS50cmFjay5pZDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWNlaXZlciA9IHt0cmFjazogdGUudHJhY2t9O1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCd0cmFjaycpO1xuICAgICAgICAgICAgICBldmVudC50cmFjayA9IHRlLnRyYWNrO1xuICAgICAgICAgICAgICBldmVudC5yZWNlaXZlciA9IHJlY2VpdmVyO1xuICAgICAgICAgICAgICBldmVudC50cmFuc2NlaXZlciA9IHtyZWNlaXZlcjogcmVjZWl2ZXJ9O1xuICAgICAgICAgICAgICBldmVudC5zdHJlYW1zID0gW2Uuc3RyZWFtXTtcbiAgICAgICAgICAgICAgcGMuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGUuc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcbiAgICAgICAgICAgICAgdmFyIHJlY2VpdmVyO1xuICAgICAgICAgICAgICBpZiAod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRSZWNlaXZlcnMpIHtcbiAgICAgICAgICAgICAgICByZWNlaXZlciA9IHBjLmdldFJlY2VpdmVycygpLmZpbmQoZnVuY3Rpb24ocikge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHIudHJhY2sgJiYgci50cmFjay5pZCA9PT0gdHJhY2suaWQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVjZWl2ZXIgPSB7dHJhY2s6IHRyYWNrfTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ3RyYWNrJyk7XG4gICAgICAgICAgICAgIGV2ZW50LnRyYWNrID0gdHJhY2s7XG4gICAgICAgICAgICAgIGV2ZW50LnJlY2VpdmVyID0gcmVjZWl2ZXI7XG4gICAgICAgICAgICAgIGV2ZW50LnRyYW5zY2VpdmVyID0ge3JlY2VpdmVyOiByZWNlaXZlcn07XG4gICAgICAgICAgICAgIGV2ZW50LnN0cmVhbXMgPSBbZS5zdHJlYW1dO1xuICAgICAgICAgICAgICBwYy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH07XG4gICAgICAgICAgcGMuYWRkRXZlbnRMaXN0ZW5lcignYWRkc3RyZWFtJywgcGMuX29udHJhY2twb2x5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3JpZ1NldFJlbW90ZURlc2NyaXB0aW9uLmFwcGx5KHBjLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKCEoJ1JUQ1J0cFRyYW5zY2VpdmVyJyBpbiB3aW5kb3cpKSB7XG4gICAgICB1dGlscy53cmFwUGVlckNvbm5lY3Rpb25FdmVudCh3aW5kb3csICd0cmFjaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKCFlLnRyYW5zY2VpdmVyKSB7XG4gICAgICAgICAgZS50cmFuc2NlaXZlciA9IHtyZWNlaXZlcjogZS5yZWNlaXZlcn07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGU7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgc2hpbUdldFNlbmRlcnNXaXRoRHRtZjogZnVuY3Rpb24od2luZG93KSB7XG4gICAgLy8gT3ZlcnJpZGVzIGFkZFRyYWNrL3JlbW92ZVRyYWNrLCBkZXBlbmRzIG9uIHNoaW1BZGRUcmFja1JlbW92ZVRyYWNrLlxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gJiZcbiAgICAgICAgISgnZ2V0U2VuZGVycycgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkgJiZcbiAgICAgICAgJ2NyZWF0ZURUTUZTZW5kZXInIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpIHtcbiAgICAgIHZhciBzaGltU2VuZGVyV2l0aER0bWYgPSBmdW5jdGlvbihwYywgdHJhY2spIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0cmFjazogdHJhY2ssXG4gICAgICAgICAgZ2V0IGR0bWYoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fZHRtZiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIGlmICh0cmFjay5raW5kID09PSAnYXVkaW8nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZHRtZiA9IHBjLmNyZWF0ZURUTUZTZW5kZXIodHJhY2spO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2R0bWYgPSBudWxsO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZHRtZjtcbiAgICAgICAgICB9LFxuICAgICAgICAgIF9wYzogcGNcbiAgICAgICAgfTtcbiAgICAgIH07XG5cbiAgICAgIC8vIGF1Z21lbnQgYWRkVHJhY2sgd2hlbiBnZXRTZW5kZXJzIGlzIG5vdCBhdmFpbGFibGUuXG4gICAgICBpZiAoIXdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U2VuZGVycykge1xuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFNlbmRlcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aGlzLl9zZW5kZXJzID0gdGhpcy5fc2VuZGVycyB8fCBbXTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fc2VuZGVycy5zbGljZSgpOyAvLyByZXR1cm4gYSBjb3B5IG9mIHRoZSBpbnRlcm5hbCBzdGF0ZS5cbiAgICAgICAgfTtcbiAgICAgICAgdmFyIG9yaWdBZGRUcmFjayA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2s7XG4gICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2sgPSBmdW5jdGlvbih0cmFjaywgc3RyZWFtKSB7XG4gICAgICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgICAgICB2YXIgc2VuZGVyID0gb3JpZ0FkZFRyYWNrLmFwcGx5KHBjLCBhcmd1bWVudHMpO1xuICAgICAgICAgIGlmICghc2VuZGVyKSB7XG4gICAgICAgICAgICBzZW5kZXIgPSBzaGltU2VuZGVyV2l0aER0bWYocGMsIHRyYWNrKTtcbiAgICAgICAgICAgIHBjLl9zZW5kZXJzLnB1c2goc2VuZGVyKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHNlbmRlcjtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgb3JpZ1JlbW92ZVRyYWNrID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVUcmFjaztcbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVUcmFjayA9IGZ1bmN0aW9uKHNlbmRlcikge1xuICAgICAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICAgICAgb3JpZ1JlbW92ZVRyYWNrLmFwcGx5KHBjLCBhcmd1bWVudHMpO1xuICAgICAgICAgIHZhciBpZHggPSBwYy5fc2VuZGVycy5pbmRleE9mKHNlbmRlcik7XG4gICAgICAgICAgaWYgKGlkeCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHBjLl9zZW5kZXJzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHZhciBvcmlnQWRkU3RyZWFtID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRTdHJlYW07XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgICBwYy5fc2VuZGVycyA9IHBjLl9zZW5kZXJzIHx8IFtdO1xuICAgICAgICBvcmlnQWRkU3RyZWFtLmFwcGx5KHBjLCBbc3RyZWFtXSk7XG4gICAgICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XG4gICAgICAgICAgcGMuX3NlbmRlcnMucHVzaChzaGltU2VuZGVyV2l0aER0bWYocGMsIHRyYWNrKSk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgdmFyIG9yaWdSZW1vdmVTdHJlYW0gPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVN0cmVhbTtcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICAgIHBjLl9zZW5kZXJzID0gcGMuX3NlbmRlcnMgfHwgW107XG4gICAgICAgIG9yaWdSZW1vdmVTdHJlYW0uYXBwbHkocGMsIFtzdHJlYW1dKTtcblxuICAgICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xuICAgICAgICAgIHZhciBzZW5kZXIgPSBwYy5fc2VuZGVycy5maW5kKGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgICAgIHJldHVybiBzLnRyYWNrID09PSB0cmFjaztcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoc2VuZGVyKSB7XG4gICAgICAgICAgICBwYy5fc2VuZGVycy5zcGxpY2UocGMuX3NlbmRlcnMuaW5kZXhPZihzZW5kZXIpLCAxKTsgLy8gcmVtb3ZlIHNlbmRlclxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uICYmXG4gICAgICAgICAgICAgICAnZ2V0U2VuZGVycycgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSAmJlxuICAgICAgICAgICAgICAgJ2NyZWF0ZURUTUZTZW5kZXInIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUgJiZcbiAgICAgICAgICAgICAgIHdpbmRvdy5SVENSdHBTZW5kZXIgJiZcbiAgICAgICAgICAgICAgICEoJ2R0bWYnIGluIHdpbmRvdy5SVENSdHBTZW5kZXIucHJvdG90eXBlKSkge1xuICAgICAgdmFyIG9yaWdHZXRTZW5kZXJzID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTZW5kZXJzO1xuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTZW5kZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICAgIHZhciBzZW5kZXJzID0gb3JpZ0dldFNlbmRlcnMuYXBwbHkocGMsIFtdKTtcbiAgICAgICAgc2VuZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHNlbmRlcikge1xuICAgICAgICAgIHNlbmRlci5fcGMgPSBwYztcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzZW5kZXJzO1xuICAgICAgfTtcblxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENSdHBTZW5kZXIucHJvdG90eXBlLCAnZHRtZicsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAodGhpcy5fZHRtZiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50cmFjay5raW5kID09PSAnYXVkaW8nKSB7XG4gICAgICAgICAgICAgIHRoaXMuX2R0bWYgPSB0aGlzLl9wYy5jcmVhdGVEVE1GU2VuZGVyKHRoaXMudHJhY2spO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5fZHRtZiA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aGlzLl9kdG1mO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgc2hpbVNvdXJjZU9iamVjdDogZnVuY3Rpb24od2luZG93KSB7XG4gICAgdmFyIFVSTCA9IHdpbmRvdyAmJiB3aW5kb3cuVVJMO1xuXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAod2luZG93LkhUTUxNZWRpYUVsZW1lbnQgJiZcbiAgICAgICAgISgnc3JjT2JqZWN0JyBpbiB3aW5kb3cuSFRNTE1lZGlhRWxlbWVudC5wcm90b3R5cGUpKSB7XG4gICAgICAgIC8vIFNoaW0gdGhlIHNyY09iamVjdCBwcm9wZXJ0eSwgb25jZSwgd2hlbiBIVE1MTWVkaWFFbGVtZW50IGlzIGZvdW5kLlxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LkhUTUxNZWRpYUVsZW1lbnQucHJvdG90eXBlLCAnc3JjT2JqZWN0Jywge1xuICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3JjT2JqZWN0O1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc2V0OiBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIC8vIFVzZSBfc3JjT2JqZWN0IGFzIGEgcHJpdmF0ZSBwcm9wZXJ0eSBmb3IgdGhpcyBzaGltXG4gICAgICAgICAgICB0aGlzLl9zcmNPYmplY3QgPSBzdHJlYW07XG4gICAgICAgICAgICBpZiAodGhpcy5zcmMpIHtcbiAgICAgICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTCh0aGlzLnNyYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghc3RyZWFtKSB7XG4gICAgICAgICAgICAgIHRoaXMuc3JjID0gJyc7XG4gICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoc3RyZWFtKTtcbiAgICAgICAgICAgIC8vIFdlIG5lZWQgdG8gcmVjcmVhdGUgdGhlIGJsb2IgdXJsIHdoZW4gYSB0cmFjayBpcyBhZGRlZCBvclxuICAgICAgICAgICAgLy8gcmVtb3ZlZC4gRG9pbmcgaXQgbWFudWFsbHkgc2luY2Ugd2Ugd2FudCB0byBhdm9pZCBhIHJlY3Vyc2lvbi5cbiAgICAgICAgICAgIHN0cmVhbS5hZGRFdmVudExpc3RlbmVyKCdhZGR0cmFjaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBpZiAoc2VsZi5zcmMpIHtcbiAgICAgICAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHNlbGYuc3JjKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzZWxmLnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoc3RyZWFtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoJ3JlbW92ZXRyYWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGlmIChzZWxmLnNyYykge1xuICAgICAgICAgICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwoc2VsZi5zcmMpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNlbGYuc3JjID0gVVJMLmNyZWF0ZU9iamVjdFVSTChzdHJlYW0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgc2hpbUFkZFRyYWNrUmVtb3ZlVHJhY2tXaXRoTmF0aXZlOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICAvLyBzaGltIGFkZFRyYWNrL3JlbW92ZVRyYWNrIHdpdGggbmF0aXZlIHZhcmlhbnRzIGluIG9yZGVyIHRvIG1ha2VcbiAgICAvLyB0aGUgaW50ZXJhY3Rpb25zIHdpdGggbGVnYWN5IGdldExvY2FsU3RyZWFtcyBiZWhhdmUgYXMgaW4gb3RoZXIgYnJvd3NlcnMuXG4gICAgLy8gS2VlcHMgYSBtYXBwaW5nIHN0cmVhbS5pZCA9PiBbc3RyZWFtLCBydHBzZW5kZXJzLi4uXVxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0TG9jYWxTdHJlYW1zID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcyA9IHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMgfHwge307XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcykubWFwKGZ1bmN0aW9uKHN0cmVhbUlkKSB7XG4gICAgICAgIHJldHVybiBwYy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW1JZF1bMF07XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIG9yaWdBZGRUcmFjayA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2s7XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjayA9IGZ1bmN0aW9uKHRyYWNrLCBzdHJlYW0pIHtcbiAgICAgIGlmICghc3RyZWFtKSB7XG4gICAgICAgIHJldHVybiBvcmlnQWRkVHJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMgPSB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zIHx8IHt9O1xuXG4gICAgICB2YXIgc2VuZGVyID0gb3JpZ0FkZFRyYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICBpZiAoIXRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtLmlkXSkge1xuICAgICAgICB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbS5pZF0gPSBbc3RyZWFtLCBzZW5kZXJdO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbS5pZF0uaW5kZXhPZihzZW5kZXIpID09PSAtMSkge1xuICAgICAgICB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbS5pZF0ucHVzaChzZW5kZXIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNlbmRlcjtcbiAgICB9O1xuXG4gICAgdmFyIG9yaWdBZGRTdHJlYW0gPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFN0cmVhbTtcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgIHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMgPSB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zIHx8IHt9O1xuXG4gICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xuICAgICAgICB2YXIgYWxyZWFkeUV4aXN0cyA9IHBjLmdldFNlbmRlcnMoKS5maW5kKGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgICByZXR1cm4gcy50cmFjayA9PT0gdHJhY2s7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoYWxyZWFkeUV4aXN0cykge1xuICAgICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oJ1RyYWNrIGFscmVhZHkgZXhpc3RzLicsXG4gICAgICAgICAgICAgICdJbnZhbGlkQWNjZXNzRXJyb3InKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB2YXIgZXhpc3RpbmdTZW5kZXJzID0gcGMuZ2V0U2VuZGVycygpO1xuICAgICAgb3JpZ0FkZFN0cmVhbS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgdmFyIG5ld1NlbmRlcnMgPSBwYy5nZXRTZW5kZXJzKCkuZmlsdGVyKGZ1bmN0aW9uKG5ld1NlbmRlcikge1xuICAgICAgICByZXR1cm4gZXhpc3RpbmdTZW5kZXJzLmluZGV4T2YobmV3U2VuZGVyKSA9PT0gLTE7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtLmlkXSA9IFtzdHJlYW1dLmNvbmNhdChuZXdTZW5kZXJzKTtcbiAgICB9O1xuXG4gICAgdmFyIG9yaWdSZW1vdmVTdHJlYW0gPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVN0cmVhbTtcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcyA9IHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMgfHwge307XG4gICAgICBkZWxldGUgdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW0uaWRdO1xuICAgICAgcmV0dXJuIG9yaWdSZW1vdmVTdHJlYW0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuXG4gICAgdmFyIG9yaWdSZW1vdmVUcmFjayA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlVHJhY2s7XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVUcmFjayA9IGZ1bmN0aW9uKHNlbmRlcikge1xuICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgIHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMgPSB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zIHx8IHt9O1xuICAgICAgaWYgKHNlbmRlcikge1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zKS5mb3JFYWNoKGZ1bmN0aW9uKHN0cmVhbUlkKSB7XG4gICAgICAgICAgdmFyIGlkeCA9IHBjLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbUlkXS5pbmRleE9mKHNlbmRlcik7XG4gICAgICAgICAgaWYgKGlkeCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHBjLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbUlkXS5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHBjLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbUlkXS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBwYy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW1JZF07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvcmlnUmVtb3ZlVHJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9LFxuXG4gIHNoaW1BZGRUcmFja1JlbW92ZVRyYWNrOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICB2YXIgYnJvd3NlckRldGFpbHMgPSB1dGlscy5kZXRlY3RCcm93c2VyKHdpbmRvdyk7XG4gICAgLy8gc2hpbSBhZGRUcmFjayBhbmQgcmVtb3ZlVHJhY2suXG4gICAgaWYgKHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2sgJiZcbiAgICAgICAgYnJvd3NlckRldGFpbHMudmVyc2lvbiA+PSA2NSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2hpbUFkZFRyYWNrUmVtb3ZlVHJhY2tXaXRoTmF0aXZlKHdpbmRvdyk7XG4gICAgfVxuXG4gICAgLy8gYWxzbyBzaGltIHBjLmdldExvY2FsU3RyZWFtcyB3aGVuIGFkZFRyYWNrIGlzIHNoaW1tZWRcbiAgICAvLyB0byByZXR1cm4gdGhlIG9yaWdpbmFsIHN0cmVhbXMuXG4gICAgdmFyIG9yaWdHZXRMb2NhbFN0cmVhbXMgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlXG4gICAgICAgIC5nZXRMb2NhbFN0cmVhbXM7XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRMb2NhbFN0cmVhbXMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICB2YXIgbmF0aXZlU3RyZWFtcyA9IG9yaWdHZXRMb2NhbFN0cmVhbXMuYXBwbHkodGhpcyk7XG4gICAgICBwYy5fcmV2ZXJzZVN0cmVhbXMgPSBwYy5fcmV2ZXJzZVN0cmVhbXMgfHwge307XG4gICAgICByZXR1cm4gbmF0aXZlU3RyZWFtcy5tYXAoZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICAgIHJldHVybiBwYy5fcmV2ZXJzZVN0cmVhbXNbc3RyZWFtLmlkXTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgb3JpZ0FkZFN0cmVhbSA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkU3RyZWFtO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgcGMuX3N0cmVhbXMgPSBwYy5fc3RyZWFtcyB8fCB7fTtcbiAgICAgIHBjLl9yZXZlcnNlU3RyZWFtcyA9IHBjLl9yZXZlcnNlU3RyZWFtcyB8fCB7fTtcblxuICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcbiAgICAgICAgdmFyIGFscmVhZHlFeGlzdHMgPSBwYy5nZXRTZW5kZXJzKCkuZmluZChmdW5jdGlvbihzKSB7XG4gICAgICAgICAgcmV0dXJuIHMudHJhY2sgPT09IHRyYWNrO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGFscmVhZHlFeGlzdHMpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKCdUcmFjayBhbHJlYWR5IGV4aXN0cy4nLFxuICAgICAgICAgICAgICAnSW52YWxpZEFjY2Vzc0Vycm9yJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgLy8gQWRkIGlkZW50aXR5IG1hcHBpbmcgZm9yIGNvbnNpc3RlbmN5IHdpdGggYWRkVHJhY2suXG4gICAgICAvLyBVbmxlc3MgdGhpcyBpcyBiZWluZyB1c2VkIHdpdGggYSBzdHJlYW0gZnJvbSBhZGRUcmFjay5cbiAgICAgIGlmICghcGMuX3JldmVyc2VTdHJlYW1zW3N0cmVhbS5pZF0pIHtcbiAgICAgICAgdmFyIG5ld1N0cmVhbSA9IG5ldyB3aW5kb3cuTWVkaWFTdHJlYW0oc3RyZWFtLmdldFRyYWNrcygpKTtcbiAgICAgICAgcGMuX3N0cmVhbXNbc3RyZWFtLmlkXSA9IG5ld1N0cmVhbTtcbiAgICAgICAgcGMuX3JldmVyc2VTdHJlYW1zW25ld1N0cmVhbS5pZF0gPSBzdHJlYW07XG4gICAgICAgIHN0cmVhbSA9IG5ld1N0cmVhbTtcbiAgICAgIH1cbiAgICAgIG9yaWdBZGRTdHJlYW0uYXBwbHkocGMsIFtzdHJlYW1dKTtcbiAgICB9O1xuXG4gICAgdmFyIG9yaWdSZW1vdmVTdHJlYW0gPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVN0cmVhbTtcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgIHBjLl9zdHJlYW1zID0gcGMuX3N0cmVhbXMgfHwge307XG4gICAgICBwYy5fcmV2ZXJzZVN0cmVhbXMgPSBwYy5fcmV2ZXJzZVN0cmVhbXMgfHwge307XG5cbiAgICAgIG9yaWdSZW1vdmVTdHJlYW0uYXBwbHkocGMsIFsocGMuX3N0cmVhbXNbc3RyZWFtLmlkXSB8fCBzdHJlYW0pXSk7XG4gICAgICBkZWxldGUgcGMuX3JldmVyc2VTdHJlYW1zWyhwYy5fc3RyZWFtc1tzdHJlYW0uaWRdID9cbiAgICAgICAgICBwYy5fc3RyZWFtc1tzdHJlYW0uaWRdLmlkIDogc3RyZWFtLmlkKV07XG4gICAgICBkZWxldGUgcGMuX3N0cmVhbXNbc3RyZWFtLmlkXTtcbiAgICB9O1xuXG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjayA9IGZ1bmN0aW9uKHRyYWNrLCBzdHJlYW0pIHtcbiAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICBpZiAocGMuc2lnbmFsaW5nU3RhdGUgPT09ICdjbG9zZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oXG4gICAgICAgICAgJ1RoZSBSVENQZWVyQ29ubmVjdGlvblxcJ3Mgc2lnbmFsaW5nU3RhdGUgaXMgXFwnY2xvc2VkXFwnLicsXG4gICAgICAgICAgJ0ludmFsaWRTdGF0ZUVycm9yJyk7XG4gICAgICB9XG4gICAgICB2YXIgc3RyZWFtcyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgIGlmIChzdHJlYW1zLmxlbmd0aCAhPT0gMSB8fFxuICAgICAgICAgICFzdHJlYW1zWzBdLmdldFRyYWNrcygpLmZpbmQoZnVuY3Rpb24odCkge1xuICAgICAgICAgICAgcmV0dXJuIHQgPT09IHRyYWNrO1xuICAgICAgICAgIH0pKSB7XG4gICAgICAgIC8vIHRoaXMgaXMgbm90IGZ1bGx5IGNvcnJlY3QgYnV0IGFsbCB3ZSBjYW4gbWFuYWdlIHdpdGhvdXRcbiAgICAgICAgLy8gW1thc3NvY2lhdGVkIE1lZGlhU3RyZWFtc11dIGludGVybmFsIHNsb3QuXG4gICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oXG4gICAgICAgICAgJ1RoZSBhZGFwdGVyLmpzIGFkZFRyYWNrIHBvbHlmaWxsIG9ubHkgc3VwcG9ydHMgYSBzaW5nbGUgJyArXG4gICAgICAgICAgJyBzdHJlYW0gd2hpY2ggaXMgYXNzb2NpYXRlZCB3aXRoIHRoZSBzcGVjaWZpZWQgdHJhY2suJyxcbiAgICAgICAgICAnTm90U3VwcG9ydGVkRXJyb3InKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGFscmVhZHlFeGlzdHMgPSBwYy5nZXRTZW5kZXJzKCkuZmluZChmdW5jdGlvbihzKSB7XG4gICAgICAgIHJldHVybiBzLnRyYWNrID09PSB0cmFjaztcbiAgICAgIH0pO1xuICAgICAgaWYgKGFscmVhZHlFeGlzdHMpIHtcbiAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbignVHJhY2sgYWxyZWFkeSBleGlzdHMuJyxcbiAgICAgICAgICAgICdJbnZhbGlkQWNjZXNzRXJyb3InKTtcbiAgICAgIH1cblxuICAgICAgcGMuX3N0cmVhbXMgPSBwYy5fc3RyZWFtcyB8fCB7fTtcbiAgICAgIHBjLl9yZXZlcnNlU3RyZWFtcyA9IHBjLl9yZXZlcnNlU3RyZWFtcyB8fCB7fTtcbiAgICAgIHZhciBvbGRTdHJlYW0gPSBwYy5fc3RyZWFtc1tzdHJlYW0uaWRdO1xuICAgICAgaWYgKG9sZFN0cmVhbSkge1xuICAgICAgICAvLyB0aGlzIGlzIHVzaW5nIG9kZCBDaHJvbWUgYmVoYXZpb3VyLCB1c2Ugd2l0aCBjYXV0aW9uOlxuICAgICAgICAvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3Avd2VicnRjL2lzc3Vlcy9kZXRhaWw/aWQ9NzgxNVxuICAgICAgICAvLyBOb3RlOiB3ZSByZWx5IG9uIHRoZSBoaWdoLWxldmVsIGFkZFRyYWNrL2R0bWYgc2hpbSB0b1xuICAgICAgICAvLyBjcmVhdGUgdGhlIHNlbmRlciB3aXRoIGEgZHRtZiBzZW5kZXIuXG4gICAgICAgIG9sZFN0cmVhbS5hZGRUcmFjayh0cmFjayk7XG5cbiAgICAgICAgLy8gVHJpZ2dlciBPTk4gYXN5bmMuXG4gICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcGMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ25lZ290aWF0aW9ubmVlZGVkJykpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBuZXdTdHJlYW0gPSBuZXcgd2luZG93Lk1lZGlhU3RyZWFtKFt0cmFja10pO1xuICAgICAgICBwYy5fc3RyZWFtc1tzdHJlYW0uaWRdID0gbmV3U3RyZWFtO1xuICAgICAgICBwYy5fcmV2ZXJzZVN0cmVhbXNbbmV3U3RyZWFtLmlkXSA9IHN0cmVhbTtcbiAgICAgICAgcGMuYWRkU3RyZWFtKG5ld1N0cmVhbSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcGMuZ2V0U2VuZGVycygpLmZpbmQoZnVuY3Rpb24ocykge1xuICAgICAgICByZXR1cm4gcy50cmFjayA9PT0gdHJhY2s7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gcmVwbGFjZSB0aGUgaW50ZXJuYWwgc3RyZWFtIGlkIHdpdGggdGhlIGV4dGVybmFsIG9uZSBhbmRcbiAgICAvLyB2aWNlIHZlcnNhLlxuICAgIGZ1bmN0aW9uIHJlcGxhY2VJbnRlcm5hbFN0cmVhbUlkKHBjLCBkZXNjcmlwdGlvbikge1xuICAgICAgdmFyIHNkcCA9IGRlc2NyaXB0aW9uLnNkcDtcbiAgICAgIE9iamVjdC5rZXlzKHBjLl9yZXZlcnNlU3RyZWFtcyB8fCBbXSkuZm9yRWFjaChmdW5jdGlvbihpbnRlcm5hbElkKSB7XG4gICAgICAgIHZhciBleHRlcm5hbFN0cmVhbSA9IHBjLl9yZXZlcnNlU3RyZWFtc1tpbnRlcm5hbElkXTtcbiAgICAgICAgdmFyIGludGVybmFsU3RyZWFtID0gcGMuX3N0cmVhbXNbZXh0ZXJuYWxTdHJlYW0uaWRdO1xuICAgICAgICBzZHAgPSBzZHAucmVwbGFjZShuZXcgUmVnRXhwKGludGVybmFsU3RyZWFtLmlkLCAnZycpLFxuICAgICAgICAgICAgZXh0ZXJuYWxTdHJlYW0uaWQpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbmV3IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbih7XG4gICAgICAgIHR5cGU6IGRlc2NyaXB0aW9uLnR5cGUsXG4gICAgICAgIHNkcDogc2RwXG4gICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVwbGFjZUV4dGVybmFsU3RyZWFtSWQocGMsIGRlc2NyaXB0aW9uKSB7XG4gICAgICB2YXIgc2RwID0gZGVzY3JpcHRpb24uc2RwO1xuICAgICAgT2JqZWN0LmtleXMocGMuX3JldmVyc2VTdHJlYW1zIHx8IFtdKS5mb3JFYWNoKGZ1bmN0aW9uKGludGVybmFsSWQpIHtcbiAgICAgICAgdmFyIGV4dGVybmFsU3RyZWFtID0gcGMuX3JldmVyc2VTdHJlYW1zW2ludGVybmFsSWRdO1xuICAgICAgICB2YXIgaW50ZXJuYWxTdHJlYW0gPSBwYy5fc3RyZWFtc1tleHRlcm5hbFN0cmVhbS5pZF07XG4gICAgICAgIHNkcCA9IHNkcC5yZXBsYWNlKG5ldyBSZWdFeHAoZXh0ZXJuYWxTdHJlYW0uaWQsICdnJyksXG4gICAgICAgICAgICBpbnRlcm5hbFN0cmVhbS5pZCk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXcgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKHtcbiAgICAgICAgdHlwZTogZGVzY3JpcHRpb24udHlwZSxcbiAgICAgICAgc2RwOiBzZHBcbiAgICAgIH0pO1xuICAgIH1cbiAgICBbJ2NyZWF0ZU9mZmVyJywgJ2NyZWF0ZUFuc3dlciddLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICB2YXIgbmF0aXZlTWV0aG9kID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdO1xuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICB2YXIgaXNMZWdhY3lDYWxsID0gYXJndW1lbnRzLmxlbmd0aCAmJlxuICAgICAgICAgICAgdHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ2Z1bmN0aW9uJztcbiAgICAgICAgaWYgKGlzTGVnYWN5Q2FsbCkge1xuICAgICAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkocGMsIFtcbiAgICAgICAgICAgIGZ1bmN0aW9uKGRlc2NyaXB0aW9uKSB7XG4gICAgICAgICAgICAgIHZhciBkZXNjID0gcmVwbGFjZUludGVybmFsU3RyZWFtSWQocGMsIGRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgICAgYXJnc1swXS5hcHBseShudWxsLCBbZGVzY10pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICBpZiAoYXJnc1sxXSkge1xuICAgICAgICAgICAgICAgIGFyZ3NbMV0uYXBwbHkobnVsbCwgZXJyKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgYXJndW1lbnRzWzJdXG4gICAgICAgICAgXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseShwYywgYXJndW1lbnRzKVxuICAgICAgICAudGhlbihmdW5jdGlvbihkZXNjcmlwdGlvbikge1xuICAgICAgICAgIHJldHVybiByZXBsYWNlSW50ZXJuYWxTdHJlYW1JZChwYywgZGVzY3JpcHRpb24pO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICB2YXIgb3JpZ1NldExvY2FsRGVzY3JpcHRpb24gPVxuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnNldExvY2FsRGVzY3JpcHRpb247XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5zZXRMb2NhbERlc2NyaXB0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoIHx8ICFhcmd1bWVudHNbMF0udHlwZSkge1xuICAgICAgICByZXR1cm4gb3JpZ1NldExvY2FsRGVzY3JpcHRpb24uYXBwbHkocGMsIGFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgICBhcmd1bWVudHNbMF0gPSByZXBsYWNlRXh0ZXJuYWxTdHJlYW1JZChwYywgYXJndW1lbnRzWzBdKTtcbiAgICAgIHJldHVybiBvcmlnU2V0TG9jYWxEZXNjcmlwdGlvbi5hcHBseShwYywgYXJndW1lbnRzKTtcbiAgICB9O1xuXG4gICAgLy8gVE9ETzogbWFuZ2xlIGdldFN0YXRzOiBodHRwczovL3czYy5naXRodWIuaW8vd2VicnRjLXN0YXRzLyNkb20tcnRjbWVkaWFzdHJlYW1zdGF0cy1zdHJlYW1pZGVudGlmaWVyXG5cbiAgICB2YXIgb3JpZ0xvY2FsRGVzY3JpcHRpb24gPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKFxuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLCAnbG9jYWxEZXNjcmlwdGlvbicpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLFxuICAgICAgICAnbG9jYWxEZXNjcmlwdGlvbicsIHtcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgICAgICAgIHZhciBkZXNjcmlwdGlvbiA9IG9yaWdMb2NhbERlc2NyaXB0aW9uLmdldC5hcHBseSh0aGlzKTtcbiAgICAgICAgICAgIGlmIChkZXNjcmlwdGlvbi50eXBlID09PSAnJykge1xuICAgICAgICAgICAgICByZXR1cm4gZGVzY3JpcHRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVwbGFjZUludGVybmFsU3RyZWFtSWQocGMsIGRlc2NyaXB0aW9uKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVUcmFjayA9IGZ1bmN0aW9uKHNlbmRlcikge1xuICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgIGlmIChwYy5zaWduYWxpbmdTdGF0ZSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbihcbiAgICAgICAgICAnVGhlIFJUQ1BlZXJDb25uZWN0aW9uXFwncyBzaWduYWxpbmdTdGF0ZSBpcyBcXCdjbG9zZWRcXCcuJyxcbiAgICAgICAgICAnSW52YWxpZFN0YXRlRXJyb3InKTtcbiAgICAgIH1cbiAgICAgIC8vIFdlIGNhbiBub3QgeWV0IGNoZWNrIGZvciBzZW5kZXIgaW5zdGFuY2VvZiBSVENSdHBTZW5kZXJcbiAgICAgIC8vIHNpbmNlIHdlIHNoaW0gUlRQU2VuZGVyLiBTbyB3ZSBjaGVjayBpZiBzZW5kZXIuX3BjIGlzIHNldC5cbiAgICAgIGlmICghc2VuZGVyLl9wYykge1xuICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKCdBcmd1bWVudCAxIG9mIFJUQ1BlZXJDb25uZWN0aW9uLnJlbW92ZVRyYWNrICcgK1xuICAgICAgICAgICAgJ2RvZXMgbm90IGltcGxlbWVudCBpbnRlcmZhY2UgUlRDUnRwU2VuZGVyLicsICdUeXBlRXJyb3InKTtcbiAgICAgIH1cbiAgICAgIHZhciBpc0xvY2FsID0gc2VuZGVyLl9wYyA9PT0gcGM7XG4gICAgICBpZiAoIWlzTG9jYWwpIHtcbiAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbignU2VuZGVyIHdhcyBub3QgY3JlYXRlZCBieSB0aGlzIGNvbm5lY3Rpb24uJyxcbiAgICAgICAgICAgICdJbnZhbGlkQWNjZXNzRXJyb3InKTtcbiAgICAgIH1cblxuICAgICAgLy8gU2VhcmNoIGZvciB0aGUgbmF0aXZlIHN0cmVhbSB0aGUgc2VuZGVycyB0cmFjayBiZWxvbmdzIHRvLlxuICAgICAgcGMuX3N0cmVhbXMgPSBwYy5fc3RyZWFtcyB8fCB7fTtcbiAgICAgIHZhciBzdHJlYW07XG4gICAgICBPYmplY3Qua2V5cyhwYy5fc3RyZWFtcykuZm9yRWFjaChmdW5jdGlvbihzdHJlYW1pZCkge1xuICAgICAgICB2YXIgaGFzVHJhY2sgPSBwYy5fc3RyZWFtc1tzdHJlYW1pZF0uZ2V0VHJhY2tzKCkuZmluZChmdW5jdGlvbih0cmFjaykge1xuICAgICAgICAgIHJldHVybiBzZW5kZXIudHJhY2sgPT09IHRyYWNrO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGhhc1RyYWNrKSB7XG4gICAgICAgICAgc3RyZWFtID0gcGMuX3N0cmVhbXNbc3RyZWFtaWRdO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKHN0cmVhbSkge1xuICAgICAgICBpZiAoc3RyZWFtLmdldFRyYWNrcygpLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIC8vIGlmIHRoaXMgaXMgdGhlIGxhc3QgdHJhY2sgb2YgdGhlIHN0cmVhbSwgcmVtb3ZlIHRoZSBzdHJlYW0uIFRoaXNcbiAgICAgICAgICAvLyB0YWtlcyBjYXJlIG9mIGFueSBzaGltbWVkIF9zZW5kZXJzLlxuICAgICAgICAgIHBjLnJlbW92ZVN0cmVhbShwYy5fcmV2ZXJzZVN0cmVhbXNbc3RyZWFtLmlkXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gcmVseWluZyBvbiB0aGUgc2FtZSBvZGQgY2hyb21lIGJlaGF2aW91ciBhcyBhYm92ZS5cbiAgICAgICAgICBzdHJlYW0ucmVtb3ZlVHJhY2soc2VuZGVyLnRyYWNrKTtcbiAgICAgICAgfVxuICAgICAgICBwYy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnbmVnb3RpYXRpb25uZWVkZWQnKSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSxcblxuICBzaGltUGVlckNvbm5lY3Rpb246IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIHZhciBicm93c2VyRGV0YWlscyA9IHV0aWxzLmRldGVjdEJyb3dzZXIod2luZG93KTtcblxuICAgIC8vIFRoZSBSVENQZWVyQ29ubmVjdGlvbiBvYmplY3QuXG4gICAgaWYgKCF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gJiYgd2luZG93LndlYmtpdFJUQ1BlZXJDb25uZWN0aW9uKSB7XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gPSBmdW5jdGlvbihwY0NvbmZpZywgcGNDb25zdHJhaW50cykge1xuICAgICAgICAvLyBUcmFuc2xhdGUgaWNlVHJhbnNwb3J0UG9saWN5IHRvIGljZVRyYW5zcG9ydHMsXG4gICAgICAgIC8vIHNlZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3dlYnJ0Yy9pc3N1ZXMvZGV0YWlsP2lkPTQ4NjlcbiAgICAgICAgLy8gdGhpcyB3YXMgZml4ZWQgaW4gTTU2IGFsb25nIHdpdGggdW5wcmVmaXhpbmcgUlRDUGVlckNvbm5lY3Rpb24uXG4gICAgICAgIGxvZ2dpbmcoJ1BlZXJDb25uZWN0aW9uJyk7XG4gICAgICAgIGlmIChwY0NvbmZpZyAmJiBwY0NvbmZpZy5pY2VUcmFuc3BvcnRQb2xpY3kpIHtcbiAgICAgICAgICBwY0NvbmZpZy5pY2VUcmFuc3BvcnRzID0gcGNDb25maWcuaWNlVHJhbnNwb3J0UG9saWN5O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyB3aW5kb3cud2Via2l0UlRDUGVlckNvbm5lY3Rpb24ocGNDb25maWcsIHBjQ29uc3RyYWludHMpO1xuICAgICAgfTtcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUgPVxuICAgICAgICAgIHdpbmRvdy53ZWJraXRSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGU7XG4gICAgICAvLyB3cmFwIHN0YXRpYyBtZXRob2RzLiBDdXJyZW50bHkganVzdCBnZW5lcmF0ZUNlcnRpZmljYXRlLlxuICAgICAgaWYgKHdpbmRvdy53ZWJraXRSVENQZWVyQ29ubmVjdGlvbi5nZW5lcmF0ZUNlcnRpZmljYXRlKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24sICdnZW5lcmF0ZUNlcnRpZmljYXRlJywge1xuICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93LndlYmtpdFJUQ1BlZXJDb25uZWN0aW9uLmdlbmVyYXRlQ2VydGlmaWNhdGU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gbWlncmF0ZSBmcm9tIG5vbi1zcGVjIFJUQ0ljZVNlcnZlci51cmwgdG8gUlRDSWNlU2VydmVyLnVybHNcbiAgICAgIHZhciBPcmlnUGVlckNvbm5lY3Rpb24gPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb247XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gPSBmdW5jdGlvbihwY0NvbmZpZywgcGNDb25zdHJhaW50cykge1xuICAgICAgICBpZiAocGNDb25maWcgJiYgcGNDb25maWcuaWNlU2VydmVycykge1xuICAgICAgICAgIHZhciBuZXdJY2VTZXJ2ZXJzID0gW107XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwY0NvbmZpZy5pY2VTZXJ2ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgc2VydmVyID0gcGNDb25maWcuaWNlU2VydmVyc1tpXTtcbiAgICAgICAgICAgIGlmICghc2VydmVyLmhhc093blByb3BlcnR5KCd1cmxzJykgJiZcbiAgICAgICAgICAgICAgICBzZXJ2ZXIuaGFzT3duUHJvcGVydHkoJ3VybCcpKSB7XG4gICAgICAgICAgICAgIHV0aWxzLmRlcHJlY2F0ZWQoJ1JUQ0ljZVNlcnZlci51cmwnLCAnUlRDSWNlU2VydmVyLnVybHMnKTtcbiAgICAgICAgICAgICAgc2VydmVyID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShzZXJ2ZXIpKTtcbiAgICAgICAgICAgICAgc2VydmVyLnVybHMgPSBzZXJ2ZXIudXJsO1xuICAgICAgICAgICAgICBuZXdJY2VTZXJ2ZXJzLnB1c2goc2VydmVyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG5ld0ljZVNlcnZlcnMucHVzaChwY0NvbmZpZy5pY2VTZXJ2ZXJzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcGNDb25maWcuaWNlU2VydmVycyA9IG5ld0ljZVNlcnZlcnM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBPcmlnUGVlckNvbm5lY3Rpb24ocGNDb25maWcsIHBjQ29uc3RyYWludHMpO1xuICAgICAgfTtcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUgPSBPcmlnUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlO1xuICAgICAgLy8gd3JhcCBzdGF0aWMgbWV0aG9kcy4gQ3VycmVudGx5IGp1c3QgZ2VuZXJhdGVDZXJ0aWZpY2F0ZS5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24sICdnZW5lcmF0ZUNlcnRpZmljYXRlJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBPcmlnUGVlckNvbm5lY3Rpb24uZ2VuZXJhdGVDZXJ0aWZpY2F0ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIG9yaWdHZXRTdGF0cyA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U3RhdHM7XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTdGF0cyA9IGZ1bmN0aW9uKHNlbGVjdG9yLFxuICAgICAgICBzdWNjZXNzQ2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spIHtcbiAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcblxuICAgICAgLy8gSWYgc2VsZWN0b3IgaXMgYSBmdW5jdGlvbiB0aGVuIHdlIGFyZSBpbiB0aGUgb2xkIHN0eWxlIHN0YXRzIHNvIGp1c3RcbiAgICAgIC8vIHBhc3MgYmFjayB0aGUgb3JpZ2luYWwgZ2V0U3RhdHMgZm9ybWF0IHRvIGF2b2lkIGJyZWFraW5nIG9sZCB1c2Vycy5cbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMCAmJiB0eXBlb2Ygc2VsZWN0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG9yaWdHZXRTdGF0cy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuXG4gICAgICAvLyBXaGVuIHNwZWMtc3R5bGUgZ2V0U3RhdHMgaXMgc3VwcG9ydGVkLCByZXR1cm4gdGhvc2Ugd2hlbiBjYWxsZWQgd2l0aFxuICAgICAgLy8gZWl0aGVyIG5vIGFyZ3VtZW50cyBvciB0aGUgc2VsZWN0b3IgYXJndW1lbnQgaXMgbnVsbC5cbiAgICAgIGlmIChvcmlnR2V0U3RhdHMubGVuZ3RoID09PSAwICYmIChhcmd1bWVudHMubGVuZ3RoID09PSAwIHx8XG4gICAgICAgICAgdHlwZW9mIGFyZ3VtZW50c1swXSAhPT0gJ2Z1bmN0aW9uJykpIHtcbiAgICAgICAgcmV0dXJuIG9yaWdHZXRTdGF0cy5hcHBseSh0aGlzLCBbXSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBmaXhDaHJvbWVTdGF0c18gPSBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICB2YXIgc3RhbmRhcmRSZXBvcnQgPSB7fTtcbiAgICAgICAgdmFyIHJlcG9ydHMgPSByZXNwb25zZS5yZXN1bHQoKTtcbiAgICAgICAgcmVwb3J0cy5mb3JFYWNoKGZ1bmN0aW9uKHJlcG9ydCkge1xuICAgICAgICAgIHZhciBzdGFuZGFyZFN0YXRzID0ge1xuICAgICAgICAgICAgaWQ6IHJlcG9ydC5pZCxcbiAgICAgICAgICAgIHRpbWVzdGFtcDogcmVwb3J0LnRpbWVzdGFtcCxcbiAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgbG9jYWxjYW5kaWRhdGU6ICdsb2NhbC1jYW5kaWRhdGUnLFxuICAgICAgICAgICAgICByZW1vdGVjYW5kaWRhdGU6ICdyZW1vdGUtY2FuZGlkYXRlJ1xuICAgICAgICAgICAgfVtyZXBvcnQudHlwZV0gfHwgcmVwb3J0LnR5cGVcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJlcG9ydC5uYW1lcygpLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xuICAgICAgICAgICAgc3RhbmRhcmRTdGF0c1tuYW1lXSA9IHJlcG9ydC5zdGF0KG5hbWUpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHN0YW5kYXJkUmVwb3J0W3N0YW5kYXJkU3RhdHMuaWRdID0gc3RhbmRhcmRTdGF0cztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHN0YW5kYXJkUmVwb3J0O1xuICAgICAgfTtcblxuICAgICAgLy8gc2hpbSBnZXRTdGF0cyB3aXRoIG1hcGxpa2Ugc3VwcG9ydFxuICAgICAgdmFyIG1ha2VNYXBTdGF0cyA9IGZ1bmN0aW9uKHN0YXRzKSB7XG4gICAgICAgIHJldHVybiBuZXcgTWFwKE9iamVjdC5rZXlzKHN0YXRzKS5tYXAoZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgcmV0dXJuIFtrZXksIHN0YXRzW2tleV1dO1xuICAgICAgICB9KSk7XG4gICAgICB9O1xuXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgIHZhciBzdWNjZXNzQ2FsbGJhY2tXcmFwcGVyXyA9IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgYXJnc1sxXShtYWtlTWFwU3RhdHMoZml4Q2hyb21lU3RhdHNfKHJlc3BvbnNlKSkpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBvcmlnR2V0U3RhdHMuYXBwbHkodGhpcywgW3N1Y2Nlc3NDYWxsYmFja1dyYXBwZXJfLFxuICAgICAgICAgIGFyZ3VtZW50c1swXV0pO1xuICAgICAgfVxuXG4gICAgICAvLyBwcm9taXNlLXN1cHBvcnRcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgb3JpZ0dldFN0YXRzLmFwcGx5KHBjLCBbXG4gICAgICAgICAgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJlc29sdmUobWFrZU1hcFN0YXRzKGZpeENocm9tZVN0YXRzXyhyZXNwb25zZSkpKTtcbiAgICAgICAgICB9LCByZWplY3RdKTtcbiAgICAgIH0pLnRoZW4oc3VjY2Vzc0NhbGxiYWNrLCBlcnJvckNhbGxiYWNrKTtcbiAgICB9O1xuXG4gICAgLy8gYWRkIHByb21pc2Ugc3VwcG9ydCAtLSBuYXRpdmVseSBhdmFpbGFibGUgaW4gQ2hyb21lIDUxXG4gICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCA1MSkge1xuICAgICAgWydzZXRMb2NhbERlc2NyaXB0aW9uJywgJ3NldFJlbW90ZURlc2NyaXB0aW9uJywgJ2FkZEljZUNhbmRpZGF0ZSddXG4gICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAgICAgICB2YXIgbmF0aXZlTWV0aG9kID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdO1xuICAgICAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICAgICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgICAgICAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIG5hdGl2ZU1ldGhvZC5hcHBseShwYywgW2FyZ3NbMF0sIHJlc29sdmUsIHJlamVjdF0pO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBwcm9taXNlLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYXJnc1sxXS5hcHBseShudWxsLCBbXSk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgIGlmIChhcmdzLmxlbmd0aCA+PSAzKSB7XG4gICAgICAgICAgICAgICAgICBhcmdzWzJdLmFwcGx5KG51bGwsIFtlcnJdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBwcm9taXNlIHN1cHBvcnQgZm9yIGNyZWF0ZU9mZmVyIGFuZCBjcmVhdGVBbnN3ZXIuIEF2YWlsYWJsZSAod2l0aG91dFxuICAgIC8vIGJ1Z3MpIHNpbmNlIE01MjogY3JidWcvNjE5Mjg5XG4gICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCA1Mikge1xuICAgICAgWydjcmVhdGVPZmZlcicsICdjcmVhdGVBbnN3ZXInXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgICB2YXIgbmF0aXZlTWV0aG9kID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdO1xuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMSB8fCAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJlxuICAgICAgICAgICAgICB0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnb2JqZWN0JykpIHtcbiAgICAgICAgICAgIHZhciBvcHRzID0gYXJndW1lbnRzLmxlbmd0aCA9PT0gMSA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgbmF0aXZlTWV0aG9kLmFwcGx5KHBjLCBbcmVzb2x2ZSwgcmVqZWN0LCBvcHRzXSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gc2hpbSBpbXBsaWNpdCBjcmVhdGlvbiBvZiBSVENTZXNzaW9uRGVzY3JpcHRpb24vUlRDSWNlQ2FuZGlkYXRlXG4gICAgWydzZXRMb2NhbERlc2NyaXB0aW9uJywgJ3NldFJlbW90ZURlc2NyaXB0aW9uJywgJ2FkZEljZUNhbmRpZGF0ZSddXG4gICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgICAgIHZhciBuYXRpdmVNZXRob2QgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF07XG4gICAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhcmd1bWVudHNbMF0gPSBuZXcgKChtZXRob2QgPT09ICdhZGRJY2VDYW5kaWRhdGUnKSA/XG4gICAgICAgICAgICAgICAgd2luZG93LlJUQ0ljZUNhbmRpZGF0ZSA6XG4gICAgICAgICAgICAgICAgd2luZG93LlJUQ1Nlc3Npb25EZXNjcmlwdGlvbikoYXJndW1lbnRzWzBdKTtcbiAgICAgICAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgIC8vIHN1cHBvcnQgZm9yIGFkZEljZUNhbmRpZGF0ZShudWxsIG9yIHVuZGVmaW5lZClcbiAgICB2YXIgbmF0aXZlQWRkSWNlQ2FuZGlkYXRlID1cbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRJY2VDYW5kaWRhdGU7XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRJY2VDYW5kaWRhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghYXJndW1lbnRzWzBdKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHNbMV0pIHtcbiAgICAgICAgICBhcmd1bWVudHNbMV0uYXBwbHkobnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5hdGl2ZUFkZEljZUNhbmRpZGF0ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH1cbn07XG5cbn0se1wiLi4vdXRpbHMuanNcIjoxMyxcIi4vZ2V0dXNlcm1lZGlhXCI6Nn1dLDY6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLypcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcbiAqICB0cmVlLlxuICovXG4gLyogZXNsaW50LWVudiBub2RlICovXG4ndXNlIHN0cmljdCc7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscy5qcycpO1xudmFyIGxvZ2dpbmcgPSB1dGlscy5sb2c7XG5cbi8vIEV4cG9zZSBwdWJsaWMgbWV0aG9kcy5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24od2luZG93KSB7XG4gIHZhciBicm93c2VyRGV0YWlscyA9IHV0aWxzLmRldGVjdEJyb3dzZXIod2luZG93KTtcbiAgdmFyIG5hdmlnYXRvciA9IHdpbmRvdyAmJiB3aW5kb3cubmF2aWdhdG9yO1xuXG4gIHZhciBjb25zdHJhaW50c1RvQ2hyb21lXyA9IGZ1bmN0aW9uKGMpIHtcbiAgICBpZiAodHlwZW9mIGMgIT09ICdvYmplY3QnIHx8IGMubWFuZGF0b3J5IHx8IGMub3B0aW9uYWwpIHtcbiAgICAgIHJldHVybiBjO1xuICAgIH1cbiAgICB2YXIgY2MgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhjKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgaWYgKGtleSA9PT0gJ3JlcXVpcmUnIHx8IGtleSA9PT0gJ2FkdmFuY2VkJyB8fCBrZXkgPT09ICdtZWRpYVNvdXJjZScpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIHIgPSAodHlwZW9mIGNba2V5XSA9PT0gJ29iamVjdCcpID8gY1trZXldIDoge2lkZWFsOiBjW2tleV19O1xuICAgICAgaWYgKHIuZXhhY3QgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygci5leGFjdCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgci5taW4gPSByLm1heCA9IHIuZXhhY3Q7XG4gICAgICB9XG4gICAgICB2YXIgb2xkbmFtZV8gPSBmdW5jdGlvbihwcmVmaXgsIG5hbWUpIHtcbiAgICAgICAgaWYgKHByZWZpeCkge1xuICAgICAgICAgIHJldHVybiBwcmVmaXggKyBuYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbmFtZS5zbGljZSgxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKG5hbWUgPT09ICdkZXZpY2VJZCcpID8gJ3NvdXJjZUlkJyA6IG5hbWU7XG4gICAgICB9O1xuICAgICAgaWYgKHIuaWRlYWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjYy5vcHRpb25hbCA9IGNjLm9wdGlvbmFsIHx8IFtdO1xuICAgICAgICB2YXIgb2MgPSB7fTtcbiAgICAgICAgaWYgKHR5cGVvZiByLmlkZWFsID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIG9jW29sZG5hbWVfKCdtaW4nLCBrZXkpXSA9IHIuaWRlYWw7XG4gICAgICAgICAgY2Mub3B0aW9uYWwucHVzaChvYyk7XG4gICAgICAgICAgb2MgPSB7fTtcbiAgICAgICAgICBvY1tvbGRuYW1lXygnbWF4Jywga2V5KV0gPSByLmlkZWFsO1xuICAgICAgICAgIGNjLm9wdGlvbmFsLnB1c2gob2MpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9jW29sZG5hbWVfKCcnLCBrZXkpXSA9IHIuaWRlYWw7XG4gICAgICAgICAgY2Mub3B0aW9uYWwucHVzaChvYyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChyLmV4YWN0ICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIHIuZXhhY3QgIT09ICdudW1iZXInKSB7XG4gICAgICAgIGNjLm1hbmRhdG9yeSA9IGNjLm1hbmRhdG9yeSB8fCB7fTtcbiAgICAgICAgY2MubWFuZGF0b3J5W29sZG5hbWVfKCcnLCBrZXkpXSA9IHIuZXhhY3Q7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBbJ21pbicsICdtYXgnXS5mb3JFYWNoKGZ1bmN0aW9uKG1peCkge1xuICAgICAgICAgIGlmIChyW21peF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY2MubWFuZGF0b3J5ID0gY2MubWFuZGF0b3J5IHx8IHt9O1xuICAgICAgICAgICAgY2MubWFuZGF0b3J5W29sZG5hbWVfKG1peCwga2V5KV0gPSByW21peF07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoYy5hZHZhbmNlZCkge1xuICAgICAgY2Mub3B0aW9uYWwgPSAoY2Mub3B0aW9uYWwgfHwgW10pLmNvbmNhdChjLmFkdmFuY2VkKTtcbiAgICB9XG4gICAgcmV0dXJuIGNjO1xuICB9O1xuXG4gIHZhciBzaGltQ29uc3RyYWludHNfID0gZnVuY3Rpb24oY29uc3RyYWludHMsIGZ1bmMpIHtcbiAgICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA+PSA2MSkge1xuICAgICAgcmV0dXJuIGZ1bmMoY29uc3RyYWludHMpO1xuICAgIH1cbiAgICBjb25zdHJhaW50cyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoY29uc3RyYWludHMpKTtcbiAgICBpZiAoY29uc3RyYWludHMgJiYgdHlwZW9mIGNvbnN0cmFpbnRzLmF1ZGlvID09PSAnb2JqZWN0Jykge1xuICAgICAgdmFyIHJlbWFwID0gZnVuY3Rpb24ob2JqLCBhLCBiKSB7XG4gICAgICAgIGlmIChhIGluIG9iaiAmJiAhKGIgaW4gb2JqKSkge1xuICAgICAgICAgIG9ialtiXSA9IG9ialthXTtcbiAgICAgICAgICBkZWxldGUgb2JqW2FdO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY29uc3RyYWludHMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGNvbnN0cmFpbnRzKSk7XG4gICAgICByZW1hcChjb25zdHJhaW50cy5hdWRpbywgJ2F1dG9HYWluQ29udHJvbCcsICdnb29nQXV0b0dhaW5Db250cm9sJyk7XG4gICAgICByZW1hcChjb25zdHJhaW50cy5hdWRpbywgJ25vaXNlU3VwcHJlc3Npb24nLCAnZ29vZ05vaXNlU3VwcHJlc3Npb24nKTtcbiAgICAgIGNvbnN0cmFpbnRzLmF1ZGlvID0gY29uc3RyYWludHNUb0Nocm9tZV8oY29uc3RyYWludHMuYXVkaW8pO1xuICAgIH1cbiAgICBpZiAoY29uc3RyYWludHMgJiYgdHlwZW9mIGNvbnN0cmFpbnRzLnZpZGVvID09PSAnb2JqZWN0Jykge1xuICAgICAgLy8gU2hpbSBmYWNpbmdNb2RlIGZvciBtb2JpbGUgJiBzdXJmYWNlIHByby5cbiAgICAgIHZhciBmYWNlID0gY29uc3RyYWludHMudmlkZW8uZmFjaW5nTW9kZTtcbiAgICAgIGZhY2UgPSBmYWNlICYmICgodHlwZW9mIGZhY2UgPT09ICdvYmplY3QnKSA/IGZhY2UgOiB7aWRlYWw6IGZhY2V9KTtcbiAgICAgIHZhciBnZXRTdXBwb3J0ZWRGYWNpbmdNb2RlTGllcyA9IGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCA2NjtcblxuICAgICAgaWYgKChmYWNlICYmIChmYWNlLmV4YWN0ID09PSAndXNlcicgfHwgZmFjZS5leGFjdCA9PT0gJ2Vudmlyb25tZW50JyB8fFxuICAgICAgICAgICAgICAgICAgICBmYWNlLmlkZWFsID09PSAndXNlcicgfHwgZmFjZS5pZGVhbCA9PT0gJ2Vudmlyb25tZW50JykpICYmXG4gICAgICAgICAgIShuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFN1cHBvcnRlZENvbnN0cmFpbnRzICYmXG4gICAgICAgICAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFN1cHBvcnRlZENvbnN0cmFpbnRzKCkuZmFjaW5nTW9kZSAmJlxuICAgICAgICAgICAgIWdldFN1cHBvcnRlZEZhY2luZ01vZGVMaWVzKSkge1xuICAgICAgICBkZWxldGUgY29uc3RyYWludHMudmlkZW8uZmFjaW5nTW9kZTtcbiAgICAgICAgdmFyIG1hdGNoZXM7XG4gICAgICAgIGlmIChmYWNlLmV4YWN0ID09PSAnZW52aXJvbm1lbnQnIHx8IGZhY2UuaWRlYWwgPT09ICdlbnZpcm9ubWVudCcpIHtcbiAgICAgICAgICBtYXRjaGVzID0gWydiYWNrJywgJ3JlYXInXTtcbiAgICAgICAgfSBlbHNlIGlmIChmYWNlLmV4YWN0ID09PSAndXNlcicgfHwgZmFjZS5pZGVhbCA9PT0gJ3VzZXInKSB7XG4gICAgICAgICAgbWF0Y2hlcyA9IFsnZnJvbnQnXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWF0Y2hlcykge1xuICAgICAgICAgIC8vIExvb2sgZm9yIG1hdGNoZXMgaW4gbGFiZWwsIG9yIHVzZSBsYXN0IGNhbSBmb3IgYmFjayAodHlwaWNhbCkuXG4gICAgICAgICAgcmV0dXJuIG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlcygpXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24oZGV2aWNlcykge1xuICAgICAgICAgICAgZGV2aWNlcyA9IGRldmljZXMuZmlsdGVyKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGQua2luZCA9PT0gJ3ZpZGVvaW5wdXQnO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgZGV2ID0gZGV2aWNlcy5maW5kKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXMuc29tZShmdW5jdGlvbihtYXRjaCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmxhYmVsLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihtYXRjaCkgIT09IC0xO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFkZXYgJiYgZGV2aWNlcy5sZW5ndGggJiYgbWF0Y2hlcy5pbmRleE9mKCdiYWNrJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgIGRldiA9IGRldmljZXNbZGV2aWNlcy5sZW5ndGggLSAxXTsgLy8gbW9yZSBsaWtlbHkgdGhlIGJhY2sgY2FtXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGV2KSB7XG4gICAgICAgICAgICAgIGNvbnN0cmFpbnRzLnZpZGVvLmRldmljZUlkID0gZmFjZS5leGFjdCA/IHtleGFjdDogZGV2LmRldmljZUlkfSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpZGVhbDogZGV2LmRldmljZUlkfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0cmFpbnRzLnZpZGVvID0gY29uc3RyYWludHNUb0Nocm9tZV8oY29uc3RyYWludHMudmlkZW8pO1xuICAgICAgICAgICAgbG9nZ2luZygnY2hyb21lOiAnICsgSlNPTi5zdHJpbmdpZnkoY29uc3RyYWludHMpKTtcbiAgICAgICAgICAgIHJldHVybiBmdW5jKGNvbnN0cmFpbnRzKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3RyYWludHMudmlkZW8gPSBjb25zdHJhaW50c1RvQ2hyb21lXyhjb25zdHJhaW50cy52aWRlbyk7XG4gICAgfVxuICAgIGxvZ2dpbmcoJ2Nocm9tZTogJyArIEpTT04uc3RyaW5naWZ5KGNvbnN0cmFpbnRzKSk7XG4gICAgcmV0dXJuIGZ1bmMoY29uc3RyYWludHMpO1xuICB9O1xuXG4gIHZhciBzaGltRXJyb3JfID0gZnVuY3Rpb24oZSkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiB7XG4gICAgICAgIFBlcm1pc3Npb25EZW5pZWRFcnJvcjogJ05vdEFsbG93ZWRFcnJvcicsXG4gICAgICAgIFBlcm1pc3Npb25EaXNtaXNzZWRFcnJvcjogJ05vdEFsbG93ZWRFcnJvcicsXG4gICAgICAgIEludmFsaWRTdGF0ZUVycm9yOiAnTm90QWxsb3dlZEVycm9yJyxcbiAgICAgICAgRGV2aWNlc05vdEZvdW5kRXJyb3I6ICdOb3RGb3VuZEVycm9yJyxcbiAgICAgICAgQ29uc3RyYWludE5vdFNhdGlzZmllZEVycm9yOiAnT3ZlcmNvbnN0cmFpbmVkRXJyb3InLFxuICAgICAgICBUcmFja1N0YXJ0RXJyb3I6ICdOb3RSZWFkYWJsZUVycm9yJyxcbiAgICAgICAgTWVkaWFEZXZpY2VGYWlsZWREdWVUb1NodXRkb3duOiAnTm90QWxsb3dlZEVycm9yJyxcbiAgICAgICAgTWVkaWFEZXZpY2VLaWxsU3dpdGNoT246ICdOb3RBbGxvd2VkRXJyb3InLFxuICAgICAgICBUYWJDYXB0dXJlRXJyb3I6ICdBYm9ydEVycm9yJyxcbiAgICAgICAgU2NyZWVuQ2FwdHVyZUVycm9yOiAnQWJvcnRFcnJvcicsXG4gICAgICAgIERldmljZUNhcHR1cmVFcnJvcjogJ0Fib3J0RXJyb3InXG4gICAgICB9W2UubmFtZV0gfHwgZS5uYW1lLFxuICAgICAgbWVzc2FnZTogZS5tZXNzYWdlLFxuICAgICAgY29uc3RyYWludDogZS5jb25zdHJhaW50TmFtZSxcbiAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZSArICh0aGlzLm1lc3NhZ2UgJiYgJzogJykgKyB0aGlzLm1lc3NhZ2U7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICB2YXIgZ2V0VXNlck1lZGlhXyA9IGZ1bmN0aW9uKGNvbnN0cmFpbnRzLCBvblN1Y2Nlc3MsIG9uRXJyb3IpIHtcbiAgICBzaGltQ29uc3RyYWludHNfKGNvbnN0cmFpbnRzLCBmdW5jdGlvbihjKSB7XG4gICAgICBuYXZpZ2F0b3Iud2Via2l0R2V0VXNlck1lZGlhKGMsIG9uU3VjY2VzcywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAob25FcnJvcikge1xuICAgICAgICAgIG9uRXJyb3Ioc2hpbUVycm9yXyhlKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIG5hdmlnYXRvci5nZXRVc2VyTWVkaWEgPSBnZXRVc2VyTWVkaWFfO1xuXG4gIC8vIFJldHVybnMgdGhlIHJlc3VsdCBvZiBnZXRVc2VyTWVkaWEgYXMgYSBQcm9taXNlLlxuICB2YXIgZ2V0VXNlck1lZGlhUHJvbWlzZV8gPSBmdW5jdGlvbihjb25zdHJhaW50cykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIG5hdmlnYXRvci5nZXRVc2VyTWVkaWEoY29uc3RyYWludHMsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgfSk7XG4gIH07XG5cbiAgaWYgKCFuYXZpZ2F0b3IubWVkaWFEZXZpY2VzKSB7XG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcyA9IHtcbiAgICAgIGdldFVzZXJNZWRpYTogZ2V0VXNlck1lZGlhUHJvbWlzZV8sXG4gICAgICBlbnVtZXJhdGVEZXZpY2VzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiAgICAgICAgICB2YXIga2luZHMgPSB7YXVkaW86ICdhdWRpb2lucHV0JywgdmlkZW86ICd2aWRlb2lucHV0J307XG4gICAgICAgICAgcmV0dXJuIHdpbmRvdy5NZWRpYVN0cmVhbVRyYWNrLmdldFNvdXJjZXMoZnVuY3Rpb24oZGV2aWNlcykge1xuICAgICAgICAgICAgcmVzb2x2ZShkZXZpY2VzLm1hcChmdW5jdGlvbihkZXZpY2UpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtsYWJlbDogZGV2aWNlLmxhYmVsLFxuICAgICAgICAgICAgICAgIGtpbmQ6IGtpbmRzW2RldmljZS5raW5kXSxcbiAgICAgICAgICAgICAgICBkZXZpY2VJZDogZGV2aWNlLmlkLFxuICAgICAgICAgICAgICAgIGdyb3VwSWQ6ICcnfTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgZ2V0U3VwcG9ydGVkQ29uc3RyYWludHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGRldmljZUlkOiB0cnVlLCBlY2hvQ2FuY2VsbGF0aW9uOiB0cnVlLCBmYWNpbmdNb2RlOiB0cnVlLFxuICAgICAgICAgIGZyYW1lUmF0ZTogdHJ1ZSwgaGVpZ2h0OiB0cnVlLCB3aWR0aDogdHJ1ZVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBBIHNoaW0gZm9yIGdldFVzZXJNZWRpYSBtZXRob2Qgb24gdGhlIG1lZGlhRGV2aWNlcyBvYmplY3QuXG4gIC8vIFRPRE8oS2FwdGVuSmFuc3NvbikgcmVtb3ZlIG9uY2UgaW1wbGVtZW50ZWQgaW4gQ2hyb21lIHN0YWJsZS5cbiAgaWYgKCFuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSkge1xuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhID0gZnVuY3Rpb24oY29uc3RyYWludHMpIHtcbiAgICAgIHJldHVybiBnZXRVc2VyTWVkaWFQcm9taXNlXyhjb25zdHJhaW50cyk7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICAvLyBFdmVuIHRob3VnaCBDaHJvbWUgNDUgaGFzIG5hdmlnYXRvci5tZWRpYURldmljZXMgYW5kIGEgZ2V0VXNlck1lZGlhXG4gICAgLy8gZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhIFByb21pc2UsIGl0IGRvZXMgbm90IGFjY2VwdCBzcGVjLXN0eWxlXG4gICAgLy8gY29uc3RyYWludHMuXG4gICAgdmFyIG9yaWdHZXRVc2VyTWVkaWEgPSBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYS5cbiAgICAgICAgYmluZChuYXZpZ2F0b3IubWVkaWFEZXZpY2VzKTtcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSA9IGZ1bmN0aW9uKGNzKSB7XG4gICAgICByZXR1cm4gc2hpbUNvbnN0cmFpbnRzXyhjcywgZnVuY3Rpb24oYykge1xuICAgICAgICByZXR1cm4gb3JpZ0dldFVzZXJNZWRpYShjKS50aGVuKGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgICAgIGlmIChjLmF1ZGlvICYmICFzdHJlYW0uZ2V0QXVkaW9UcmFja3MoKS5sZW5ndGggfHxcbiAgICAgICAgICAgICAgYy52aWRlbyAmJiAhc3RyZWFtLmdldFZpZGVvVHJhY2tzKCkubGVuZ3RoKSB7XG4gICAgICAgICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xuICAgICAgICAgICAgICB0cmFjay5zdG9wKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oJycsICdOb3RGb3VuZEVycm9yJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBzdHJlYW07XG4gICAgICAgIH0sIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3Qoc2hpbUVycm9yXyhlKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfVxuXG4gIC8vIER1bW15IGRldmljZWNoYW5nZSBldmVudCBtZXRob2RzLlxuICAvLyBUT0RPKEthcHRlbkphbnNzb24pIHJlbW92ZSBvbmNlIGltcGxlbWVudGVkIGluIENocm9tZSBzdGFibGUuXG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5hZGRFdmVudExpc3RlbmVyID09PSAndW5kZWZpbmVkJykge1xuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xuICAgICAgbG9nZ2luZygnRHVtbXkgbWVkaWFEZXZpY2VzLmFkZEV2ZW50TGlzdGVuZXIgY2FsbGVkLicpO1xuICAgIH07XG4gIH1cbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLnJlbW92ZUV2ZW50TGlzdGVuZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICBsb2dnaW5nKCdEdW1teSBtZWRpYURldmljZXMucmVtb3ZlRXZlbnRMaXN0ZW5lciBjYWxsZWQuJyk7XG4gICAgfTtcbiAgfVxufTtcblxufSx7XCIuLi91dGlscy5qc1wiOjEzfV0sNzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vKlxuICogIENvcHlyaWdodCAoYykgMjAxNyBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxuICogIHRyZWUuXG4gKi9cbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIFNEUFV0aWxzID0gcmVxdWlyZSgnc2RwJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzaGltUlRDSWNlQ2FuZGlkYXRlOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICAvLyBmb3VuZGF0aW9uIGlzIGFyYml0cmFyaWx5IGNob3NlbiBhcyBhbiBpbmRpY2F0b3IgZm9yIGZ1bGwgc3VwcG9ydCBmb3JcbiAgICAvLyBodHRwczovL3czYy5naXRodWIuaW8vd2VicnRjLXBjLyNydGNpY2VjYW5kaWRhdGUtaW50ZXJmYWNlXG4gICAgaWYgKCF3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlIHx8ICh3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlICYmICdmb3VuZGF0aW9uJyBpblxuICAgICAgICB3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlLnByb3RvdHlwZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgTmF0aXZlUlRDSWNlQ2FuZGlkYXRlID0gd2luZG93LlJUQ0ljZUNhbmRpZGF0ZTtcbiAgICB3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlID0gZnVuY3Rpb24oYXJncykge1xuICAgICAgLy8gUmVtb3ZlIHRoZSBhPSB3aGljaCBzaG91bGRuJ3QgYmUgcGFydCBvZiB0aGUgY2FuZGlkYXRlIHN0cmluZy5cbiAgICAgIGlmICh0eXBlb2YgYXJncyA9PT0gJ29iamVjdCcgJiYgYXJncy5jYW5kaWRhdGUgJiZcbiAgICAgICAgICBhcmdzLmNhbmRpZGF0ZS5pbmRleE9mKCdhPScpID09PSAwKSB7XG4gICAgICAgIGFyZ3MgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGFyZ3MpKTtcbiAgICAgICAgYXJncy5jYW5kaWRhdGUgPSBhcmdzLmNhbmRpZGF0ZS5zdWJzdHIoMik7XG4gICAgICB9XG5cbiAgICAgIGlmIChhcmdzLmNhbmRpZGF0ZSAmJiBhcmdzLmNhbmRpZGF0ZS5sZW5ndGgpIHtcbiAgICAgICAgLy8gQXVnbWVudCB0aGUgbmF0aXZlIGNhbmRpZGF0ZSB3aXRoIHRoZSBwYXJzZWQgZmllbGRzLlxuICAgICAgICB2YXIgbmF0aXZlQ2FuZGlkYXRlID0gbmV3IE5hdGl2ZVJUQ0ljZUNhbmRpZGF0ZShhcmdzKTtcbiAgICAgICAgdmFyIHBhcnNlZENhbmRpZGF0ZSA9IFNEUFV0aWxzLnBhcnNlQ2FuZGlkYXRlKGFyZ3MuY2FuZGlkYXRlKTtcbiAgICAgICAgdmFyIGF1Z21lbnRlZENhbmRpZGF0ZSA9IE9iamVjdC5hc3NpZ24obmF0aXZlQ2FuZGlkYXRlLFxuICAgICAgICAgICAgcGFyc2VkQ2FuZGlkYXRlKTtcblxuICAgICAgICAvLyBBZGQgYSBzZXJpYWxpemVyIHRoYXQgZG9lcyBub3Qgc2VyaWFsaXplIHRoZSBleHRyYSBhdHRyaWJ1dGVzLlxuICAgICAgICBhdWdtZW50ZWRDYW5kaWRhdGUudG9KU09OID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNhbmRpZGF0ZTogYXVnbWVudGVkQ2FuZGlkYXRlLmNhbmRpZGF0ZSxcbiAgICAgICAgICAgIHNkcE1pZDogYXVnbWVudGVkQ2FuZGlkYXRlLnNkcE1pZCxcbiAgICAgICAgICAgIHNkcE1MaW5lSW5kZXg6IGF1Z21lbnRlZENhbmRpZGF0ZS5zZHBNTGluZUluZGV4LFxuICAgICAgICAgICAgdXNlcm5hbWVGcmFnbWVudDogYXVnbWVudGVkQ2FuZGlkYXRlLnVzZXJuYW1lRnJhZ21lbnQsXG4gICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGF1Z21lbnRlZENhbmRpZGF0ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgTmF0aXZlUlRDSWNlQ2FuZGlkYXRlKGFyZ3MpO1xuICAgIH07XG4gICAgd2luZG93LlJUQ0ljZUNhbmRpZGF0ZS5wcm90b3R5cGUgPSBOYXRpdmVSVENJY2VDYW5kaWRhdGUucHJvdG90eXBlO1xuXG4gICAgLy8gSG9vayB1cCB0aGUgYXVnbWVudGVkIGNhbmRpZGF0ZSBpbiBvbmljZWNhbmRpZGF0ZSBhbmRcbiAgICAvLyBhZGRFdmVudExpc3RlbmVyKCdpY2VjYW5kaWRhdGUnLCAuLi4pXG4gICAgdXRpbHMud3JhcFBlZXJDb25uZWN0aW9uRXZlbnQod2luZG93LCAnaWNlY2FuZGlkYXRlJywgZnVuY3Rpb24oZSkge1xuICAgICAgaWYgKGUuY2FuZGlkYXRlKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCAnY2FuZGlkYXRlJywge1xuICAgICAgICAgIHZhbHVlOiBuZXcgd2luZG93LlJUQ0ljZUNhbmRpZGF0ZShlLmNhbmRpZGF0ZSksXG4gICAgICAgICAgd3JpdGFibGU6ICdmYWxzZSdcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZTtcbiAgICB9KTtcbiAgfSxcblxuICAvLyBzaGltQ3JlYXRlT2JqZWN0VVJMIG11c3QgYmUgY2FsbGVkIGJlZm9yZSBzaGltU291cmNlT2JqZWN0IHRvIGF2b2lkIGxvb3AuXG5cbiAgc2hpbUNyZWF0ZU9iamVjdFVSTDogZnVuY3Rpb24od2luZG93KSB7XG4gICAgdmFyIFVSTCA9IHdpbmRvdyAmJiB3aW5kb3cuVVJMO1xuXG4gICAgaWYgKCEodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgd2luZG93LkhUTUxNZWRpYUVsZW1lbnQgJiZcbiAgICAgICAgICAnc3JjT2JqZWN0JyBpbiB3aW5kb3cuSFRNTE1lZGlhRWxlbWVudC5wcm90b3R5cGUgJiZcbiAgICAgICAgVVJMLmNyZWF0ZU9iamVjdFVSTCAmJiBVUkwucmV2b2tlT2JqZWN0VVJMKSkge1xuICAgICAgLy8gT25seSBzaGltIENyZWF0ZU9iamVjdFVSTCB1c2luZyBzcmNPYmplY3QgaWYgc3JjT2JqZWN0IGV4aXN0cy5cbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgdmFyIG5hdGl2ZUNyZWF0ZU9iamVjdFVSTCA9IFVSTC5jcmVhdGVPYmplY3RVUkwuYmluZChVUkwpO1xuICAgIHZhciBuYXRpdmVSZXZva2VPYmplY3RVUkwgPSBVUkwucmV2b2tlT2JqZWN0VVJMLmJpbmQoVVJMKTtcbiAgICB2YXIgc3RyZWFtcyA9IG5ldyBNYXAoKSwgbmV3SWQgPSAwO1xuXG4gICAgVVJMLmNyZWF0ZU9iamVjdFVSTCA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgaWYgKCdnZXRUcmFja3MnIGluIHN0cmVhbSkge1xuICAgICAgICB2YXIgdXJsID0gJ3BvbHlibG9iOicgKyAoKytuZXdJZCk7XG4gICAgICAgIHN0cmVhbXMuc2V0KHVybCwgc3RyZWFtKTtcbiAgICAgICAgdXRpbHMuZGVwcmVjYXRlZCgnVVJMLmNyZWF0ZU9iamVjdFVSTChzdHJlYW0pJyxcbiAgICAgICAgICAgICdlbGVtLnNyY09iamVjdCA9IHN0cmVhbScpO1xuICAgICAgICByZXR1cm4gdXJsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5hdGl2ZUNyZWF0ZU9iamVjdFVSTChzdHJlYW0pO1xuICAgIH07XG4gICAgVVJMLnJldm9rZU9iamVjdFVSTCA9IGZ1bmN0aW9uKHVybCkge1xuICAgICAgbmF0aXZlUmV2b2tlT2JqZWN0VVJMKHVybCk7XG4gICAgICBzdHJlYW1zLmRlbGV0ZSh1cmwpO1xuICAgIH07XG5cbiAgICB2YXIgZHNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih3aW5kb3cuSFRNTE1lZGlhRWxlbWVudC5wcm90b3R5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3NyYycpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuSFRNTE1lZGlhRWxlbWVudC5wcm90b3R5cGUsICdzcmMnLCB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZHNjLmdldC5hcHBseSh0aGlzKTtcbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uKHVybCkge1xuICAgICAgICB0aGlzLnNyY09iamVjdCA9IHN0cmVhbXMuZ2V0KHVybCkgfHwgbnVsbDtcbiAgICAgICAgcmV0dXJuIGRzYy5zZXQuYXBwbHkodGhpcywgW3VybF0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIG5hdGl2ZVNldEF0dHJpYnV0ZSA9IHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50LnByb3RvdHlwZS5zZXRBdHRyaWJ1dGU7XG4gICAgd2luZG93LkhUTUxNZWRpYUVsZW1lbnQucHJvdG90eXBlLnNldEF0dHJpYnV0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIgJiZcbiAgICAgICAgICAoJycgKyBhcmd1bWVudHNbMF0pLnRvTG93ZXJDYXNlKCkgPT09ICdzcmMnKSB7XG4gICAgICAgIHRoaXMuc3JjT2JqZWN0ID0gc3RyZWFtcy5nZXQoYXJndW1lbnRzWzFdKSB8fCBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5hdGl2ZVNldEF0dHJpYnV0ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH0sXG5cbiAgc2hpbU1heE1lc3NhZ2VTaXplOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICBpZiAod2luZG93LlJUQ1NjdHBUcmFuc3BvcnQgfHwgIXdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgYnJvd3NlckRldGFpbHMgPSB1dGlscy5kZXRlY3RCcm93c2VyKHdpbmRvdyk7XG5cbiAgICBpZiAoISgnc2N0cCcgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLCAnc2N0cCcsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdHlwZW9mIHRoaXMuX3NjdHAgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IHRoaXMuX3NjdHA7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhciBzY3RwSW5EZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKGRlc2NyaXB0aW9uKSB7XG4gICAgICB2YXIgc2VjdGlvbnMgPSBTRFBVdGlscy5zcGxpdFNlY3Rpb25zKGRlc2NyaXB0aW9uLnNkcCk7XG4gICAgICBzZWN0aW9ucy5zaGlmdCgpO1xuICAgICAgcmV0dXJuIHNlY3Rpb25zLnNvbWUoZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XG4gICAgICAgIHZhciBtTGluZSA9IFNEUFV0aWxzLnBhcnNlTUxpbmUobWVkaWFTZWN0aW9uKTtcbiAgICAgICAgcmV0dXJuIG1MaW5lICYmIG1MaW5lLmtpbmQgPT09ICdhcHBsaWNhdGlvbidcbiAgICAgICAgICAgICYmIG1MaW5lLnByb3RvY29sLmluZGV4T2YoJ1NDVFAnKSAhPT0gLTE7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIGdldFJlbW90ZUZpcmVmb3hWZXJzaW9uID0gZnVuY3Rpb24oZGVzY3JpcHRpb24pIHtcbiAgICAgIC8vIFRPRE86IElzIHRoZXJlIGEgYmV0dGVyIHNvbHV0aW9uIGZvciBkZXRlY3RpbmcgRmlyZWZveD9cbiAgICAgIHZhciBtYXRjaCA9IGRlc2NyaXB0aW9uLnNkcC5tYXRjaCgvbW96aWxsYS4uLlRISVNfSVNfU0RQQVJUQS0oXFxkKykvKTtcbiAgICAgIGlmIChtYXRjaCA9PT0gbnVsbCB8fCBtYXRjaC5sZW5ndGggPCAyKSB7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICAgIH1cbiAgICAgIHZhciB2ZXJzaW9uID0gcGFyc2VJbnQobWF0Y2hbMV0sIDEwKTtcbiAgICAgIC8vIFRlc3QgZm9yIE5hTiAoeWVzLCB0aGlzIGlzIHVnbHkpXG4gICAgICByZXR1cm4gdmVyc2lvbiAhPT0gdmVyc2lvbiA/IC0xIDogdmVyc2lvbjtcbiAgICB9O1xuXG4gICAgdmFyIGdldENhblNlbmRNYXhNZXNzYWdlU2l6ZSA9IGZ1bmN0aW9uKHJlbW90ZUlzRmlyZWZveCkge1xuICAgICAgLy8gRXZlcnkgaW1wbGVtZW50YXRpb24gd2Uga25vdyBjYW4gc2VuZCBhdCBsZWFzdCA2NCBLaUIuXG4gICAgICAvLyBOb3RlOiBBbHRob3VnaCBDaHJvbWUgaXMgdGVjaG5pY2FsbHkgYWJsZSB0byBzZW5kIHVwIHRvIDI1NiBLaUIsIHRoZVxuICAgICAgLy8gICAgICAgZGF0YSBkb2VzIG5vdCByZWFjaCB0aGUgb3RoZXIgcGVlciByZWxpYWJseS5cbiAgICAgIC8vICAgICAgIFNlZTogaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3dlYnJ0Yy9pc3N1ZXMvZGV0YWlsP2lkPTg0MTlcbiAgICAgIHZhciBjYW5TZW5kTWF4TWVzc2FnZVNpemUgPSA2NTUzNjtcbiAgICAgIGlmIChicm93c2VyRGV0YWlscy5icm93c2VyID09PSAnZmlyZWZveCcpIHtcbiAgICAgICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCA1Nykge1xuICAgICAgICAgIGlmIChyZW1vdGVJc0ZpcmVmb3ggPT09IC0xKSB7XG4gICAgICAgICAgICAvLyBGRiA8IDU3IHdpbGwgc2VuZCBpbiAxNiBLaUIgY2h1bmtzIHVzaW5nIHRoZSBkZXByZWNhdGVkIFBQSURcbiAgICAgICAgICAgIC8vIGZyYWdtZW50YXRpb24uXG4gICAgICAgICAgICBjYW5TZW5kTWF4TWVzc2FnZVNpemUgPSAxNjM4NDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSG93ZXZlciwgb3RoZXIgRkYgKGFuZCBSQVdSVEMpIGNhbiByZWFzc2VtYmxlIFBQSUQtZnJhZ21lbnRlZFxuICAgICAgICAgICAgLy8gbWVzc2FnZXMuIFRodXMsIHN1cHBvcnRpbmcgfjIgR2lCIHdoZW4gc2VuZGluZy5cbiAgICAgICAgICAgIGNhblNlbmRNYXhNZXNzYWdlU2l6ZSA9IDIxNDc0ODM2Mzc7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIEN1cnJlbnRseSwgYWxsIEZGID49IDU3IHdpbGwgcmVzZXQgdGhlIHJlbW90ZSBtYXhpbXVtIG1lc3NhZ2Ugc2l6ZVxuICAgICAgICAgIC8vIHRvIHRoZSBkZWZhdWx0IHZhbHVlIHdoZW4gYSBkYXRhIGNoYW5uZWwgaXMgY3JlYXRlZCBhdCBhIGxhdGVyXG4gICAgICAgICAgLy8gc3RhZ2UuIDooXG4gICAgICAgICAgLy8gU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xNDI2ODMxXG4gICAgICAgICAgY2FuU2VuZE1heE1lc3NhZ2VTaXplID1cbiAgICAgICAgICAgIGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPT09IDU3ID8gNjU1MzUgOiA2NTUzNjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGNhblNlbmRNYXhNZXNzYWdlU2l6ZTtcbiAgICB9O1xuXG4gICAgdmFyIGdldE1heE1lc3NhZ2VTaXplID0gZnVuY3Rpb24oZGVzY3JpcHRpb24sIHJlbW90ZUlzRmlyZWZveCkge1xuICAgICAgLy8gTm90ZTogNjU1MzYgYnl0ZXMgaXMgdGhlIGRlZmF1bHQgdmFsdWUgZnJvbSB0aGUgU0RQIHNwZWMuIEFsc28sXG4gICAgICAvLyAgICAgICBldmVyeSBpbXBsZW1lbnRhdGlvbiB3ZSBrbm93IHN1cHBvcnRzIHJlY2VpdmluZyA2NTUzNiBieXRlcy5cbiAgICAgIHZhciBtYXhNZXNzYWdlU2l6ZSA9IDY1NTM2O1xuXG4gICAgICAvLyBGRiA1NyBoYXMgYSBzbGlnaHRseSBpbmNvcnJlY3QgZGVmYXVsdCByZW1vdGUgbWF4IG1lc3NhZ2Ugc2l6ZSwgc29cbiAgICAgIC8vIHdlIG5lZWQgdG8gYWRqdXN0IGl0IGhlcmUgdG8gYXZvaWQgYSBmYWlsdXJlIHdoZW4gc2VuZGluZy5cbiAgICAgIC8vIFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTQyNTY5N1xuICAgICAgaWYgKGJyb3dzZXJEZXRhaWxzLmJyb3dzZXIgPT09ICdmaXJlZm94J1xuICAgICAgICAgICAmJiBicm93c2VyRGV0YWlscy52ZXJzaW9uID09PSA1Nykge1xuICAgICAgICBtYXhNZXNzYWdlU2l6ZSA9IDY1NTM1O1xuICAgICAgfVxuXG4gICAgICB2YXIgbWF0Y2ggPSBTRFBVdGlscy5tYXRjaFByZWZpeChkZXNjcmlwdGlvbi5zZHAsICdhPW1heC1tZXNzYWdlLXNpemU6Jyk7XG4gICAgICBpZiAobWF0Y2gubGVuZ3RoID4gMCkge1xuICAgICAgICBtYXhNZXNzYWdlU2l6ZSA9IHBhcnNlSW50KG1hdGNoWzBdLnN1YnN0cigxOSksIDEwKTtcbiAgICAgIH0gZWxzZSBpZiAoYnJvd3NlckRldGFpbHMuYnJvd3NlciA9PT0gJ2ZpcmVmb3gnICYmXG4gICAgICAgICAgICAgICAgICByZW1vdGVJc0ZpcmVmb3ggIT09IC0xKSB7XG4gICAgICAgIC8vIElmIHRoZSBtYXhpbXVtIG1lc3NhZ2Ugc2l6ZSBpcyBub3QgcHJlc2VudCBpbiB0aGUgcmVtb3RlIFNEUCBhbmRcbiAgICAgICAgLy8gYm90aCBsb2NhbCBhbmQgcmVtb3RlIGFyZSBGaXJlZm94LCB0aGUgcmVtb3RlIHBlZXIgY2FuIHJlY2VpdmVcbiAgICAgICAgLy8gfjIgR2lCLlxuICAgICAgICBtYXhNZXNzYWdlU2l6ZSA9IDIxNDc0ODM2Mzc7XG4gICAgICB9XG4gICAgICByZXR1cm4gbWF4TWVzc2FnZVNpemU7XG4gICAgfTtcblxuICAgIHZhciBvcmlnU2V0UmVtb3RlRGVzY3JpcHRpb24gPVxuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnNldFJlbW90ZURlc2NyaXB0aW9uO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0UmVtb3RlRGVzY3JpcHRpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICBwYy5fc2N0cCA9IG51bGw7XG5cbiAgICAgIGlmIChzY3RwSW5EZXNjcmlwdGlvbihhcmd1bWVudHNbMF0pKSB7XG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSByZW1vdGUgaXMgRkYuXG4gICAgICAgIHZhciBpc0ZpcmVmb3ggPSBnZXRSZW1vdGVGaXJlZm94VmVyc2lvbihhcmd1bWVudHNbMF0pO1xuXG4gICAgICAgIC8vIEdldCB0aGUgbWF4aW11bSBtZXNzYWdlIHNpemUgdGhlIGxvY2FsIHBlZXIgaXMgY2FwYWJsZSBvZiBzZW5kaW5nXG4gICAgICAgIHZhciBjYW5TZW5kTU1TID0gZ2V0Q2FuU2VuZE1heE1lc3NhZ2VTaXplKGlzRmlyZWZveCk7XG5cbiAgICAgICAgLy8gR2V0IHRoZSBtYXhpbXVtIG1lc3NhZ2Ugc2l6ZSBvZiB0aGUgcmVtb3RlIHBlZXIuXG4gICAgICAgIHZhciByZW1vdGVNTVMgPSBnZXRNYXhNZXNzYWdlU2l6ZShhcmd1bWVudHNbMF0sIGlzRmlyZWZveCk7XG5cbiAgICAgICAgLy8gRGV0ZXJtaW5lIGZpbmFsIG1heGltdW0gbWVzc2FnZSBzaXplXG4gICAgICAgIHZhciBtYXhNZXNzYWdlU2l6ZTtcbiAgICAgICAgaWYgKGNhblNlbmRNTVMgPT09IDAgJiYgcmVtb3RlTU1TID09PSAwKSB7XG4gICAgICAgICAgbWF4TWVzc2FnZVNpemUgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG4gICAgICAgIH0gZWxzZSBpZiAoY2FuU2VuZE1NUyA9PT0gMCB8fCByZW1vdGVNTVMgPT09IDApIHtcbiAgICAgICAgICBtYXhNZXNzYWdlU2l6ZSA9IE1hdGgubWF4KGNhblNlbmRNTVMsIHJlbW90ZU1NUyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWF4TWVzc2FnZVNpemUgPSBNYXRoLm1pbihjYW5TZW5kTU1TLCByZW1vdGVNTVMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ3JlYXRlIGEgZHVtbXkgUlRDU2N0cFRyYW5zcG9ydCBvYmplY3QgYW5kIHRoZSAnbWF4TWVzc2FnZVNpemUnXG4gICAgICAgIC8vIGF0dHJpYnV0ZS5cbiAgICAgICAgdmFyIHNjdHAgPSB7fTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNjdHAsICdtYXhNZXNzYWdlU2l6ZScsIHtcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIG1heE1lc3NhZ2VTaXplO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHBjLl9zY3RwID0gc2N0cDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG9yaWdTZXRSZW1vdGVEZXNjcmlwdGlvbi5hcHBseShwYywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9LFxuXG4gIHNoaW1TZW5kVGhyb3dUeXBlRXJyb3I6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIGlmICghKHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiAmJlxuICAgICAgICAnY3JlYXRlRGF0YUNoYW5uZWwnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gTm90ZTogQWx0aG91Z2ggRmlyZWZveCA+PSA1NyBoYXMgYSBuYXRpdmUgaW1wbGVtZW50YXRpb24sIHRoZSBtYXhpbXVtXG4gICAgLy8gICAgICAgbWVzc2FnZSBzaXplIGNhbiBiZSByZXNldCBmb3IgYWxsIGRhdGEgY2hhbm5lbHMgYXQgYSBsYXRlciBzdGFnZS5cbiAgICAvLyAgICAgICBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTE0MjY4MzFcblxuICAgIHZhciBvcmlnQ3JlYXRlRGF0YUNoYW5uZWwgPVxuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5jcmVhdGVEYXRhQ2hhbm5lbDtcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmNyZWF0ZURhdGFDaGFubmVsID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgdmFyIGRhdGFDaGFubmVsID0gb3JpZ0NyZWF0ZURhdGFDaGFubmVsLmFwcGx5KHBjLCBhcmd1bWVudHMpO1xuICAgICAgdmFyIG9yaWdEYXRhQ2hhbm5lbFNlbmQgPSBkYXRhQ2hhbm5lbC5zZW5kO1xuXG4gICAgICAvLyBQYXRjaCAnc2VuZCcgbWV0aG9kXG4gICAgICBkYXRhQ2hhbm5lbC5zZW5kID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkYyA9IHRoaXM7XG4gICAgICAgIHZhciBkYXRhID0gYXJndW1lbnRzWzBdO1xuICAgICAgICB2YXIgbGVuZ3RoID0gZGF0YS5sZW5ndGggfHwgZGF0YS5zaXplIHx8IGRhdGEuYnl0ZUxlbmd0aDtcbiAgICAgICAgaWYgKGxlbmd0aCA+IHBjLnNjdHAubWF4TWVzc2FnZVNpemUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKCdNZXNzYWdlIHRvbyBsYXJnZSAoY2FuIHNlbmQgYSBtYXhpbXVtIG9mICcgK1xuICAgICAgICAgICAgcGMuc2N0cC5tYXhNZXNzYWdlU2l6ZSArICcgYnl0ZXMpJywgJ1R5cGVFcnJvcicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvcmlnRGF0YUNoYW5uZWxTZW5kLmFwcGx5KGRjLCBhcmd1bWVudHMpO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIGRhdGFDaGFubmVsO1xuICAgIH07XG4gIH1cbn07XG5cbn0se1wiLi91dGlsc1wiOjEzLFwic2RwXCI6Mn1dLDg6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLypcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcbiAqICB0cmVlLlxuICovXG4gLyogZXNsaW50LWVudiBub2RlICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG52YXIgc2hpbVJUQ1BlZXJDb25uZWN0aW9uID0gcmVxdWlyZSgncnRjcGVlcmNvbm5lY3Rpb24tc2hpbScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2hpbUdldFVzZXJNZWRpYTogcmVxdWlyZSgnLi9nZXR1c2VybWVkaWEnKSxcbiAgc2hpbVBlZXJDb25uZWN0aW9uOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICB2YXIgYnJvd3NlckRldGFpbHMgPSB1dGlscy5kZXRlY3RCcm93c2VyKHdpbmRvdyk7XG5cbiAgICBpZiAod2luZG93LlJUQ0ljZUdhdGhlcmVyKSB7XG4gICAgICBpZiAoIXdpbmRvdy5SVENJY2VDYW5kaWRhdGUpIHtcbiAgICAgICAgd2luZG93LlJUQ0ljZUNhbmRpZGF0ZSA9IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICAgICAgICByZXR1cm4gYXJncztcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGlmICghd2luZG93LlJUQ1Nlc3Npb25EZXNjcmlwdGlvbikge1xuICAgICAgICB3aW5kb3cuUlRDU2Vzc2lvbkRlc2NyaXB0aW9uID0gZnVuY3Rpb24oYXJncykge1xuICAgICAgICAgIHJldHVybiBhcmdzO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgLy8gdGhpcyBhZGRzIGFuIGFkZGl0aW9uYWwgZXZlbnQgbGlzdGVuZXIgdG8gTWVkaWFTdHJhY2tUcmFjayB0aGF0IHNpZ25hbHNcbiAgICAgIC8vIHdoZW4gYSB0cmFja3MgZW5hYmxlZCBwcm9wZXJ0eSB3YXMgY2hhbmdlZC4gV29ya2Fyb3VuZCBmb3IgYSBidWcgaW5cbiAgICAgIC8vIGFkZFN0cmVhbSwgc2VlIGJlbG93LiBObyBsb25nZXIgcmVxdWlyZWQgaW4gMTUwMjUrXG4gICAgICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDE1MDI1KSB7XG4gICAgICAgIHZhciBvcmlnTVNURW5hYmxlZCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoXG4gICAgICAgICAgICB3aW5kb3cuTWVkaWFTdHJlYW1UcmFjay5wcm90b3R5cGUsICdlbmFibGVkJyk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuTWVkaWFTdHJlYW1UcmFjay5wcm90b3R5cGUsICdlbmFibGVkJywge1xuICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIG9yaWdNU1RFbmFibGVkLnNldC5jYWxsKHRoaXMsIHZhbHVlKTtcbiAgICAgICAgICAgIHZhciBldiA9IG5ldyBFdmVudCgnZW5hYmxlZCcpO1xuICAgICAgICAgICAgZXYuZW5hYmxlZCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIE9SVEMgZGVmaW5lcyB0aGUgRFRNRiBzZW5kZXIgYSBiaXQgZGlmZmVyZW50LlxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS93M2Mvb3J0Yy9pc3N1ZXMvNzE0XG4gICAgaWYgKHdpbmRvdy5SVENSdHBTZW5kZXIgJiYgISgnZHRtZicgaW4gd2luZG93LlJUQ1J0cFNlbmRlci5wcm90b3R5cGUpKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1J0cFNlbmRlci5wcm90b3R5cGUsICdkdG1mJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICh0aGlzLl9kdG1mID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRyYWNrLmtpbmQgPT09ICdhdWRpbycpIHtcbiAgICAgICAgICAgICAgdGhpcy5fZHRtZiA9IG5ldyB3aW5kb3cuUlRDRHRtZlNlbmRlcih0aGlzKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy50cmFjay5raW5kID09PSAndmlkZW8nKSB7XG4gICAgICAgICAgICAgIHRoaXMuX2R0bWYgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhpcy5fZHRtZjtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIC8vIEVkZ2UgY3VycmVudGx5IG9ubHkgaW1wbGVtZW50cyB0aGUgUlRDRHRtZlNlbmRlciwgbm90IHRoZVxuICAgIC8vIFJUQ0RUTUZTZW5kZXIgYWxpYXMuIFNlZSBodHRwOi8vZHJhZnQub3J0Yy5vcmcvI3J0Y2R0bWZzZW5kZXIyKlxuICAgIGlmICh3aW5kb3cuUlRDRHRtZlNlbmRlciAmJiAhd2luZG93LlJUQ0RUTUZTZW5kZXIpIHtcbiAgICAgIHdpbmRvdy5SVENEVE1GU2VuZGVyID0gd2luZG93LlJUQ0R0bWZTZW5kZXI7XG4gICAgfVxuXG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uID1cbiAgICAgICAgc2hpbVJUQ1BlZXJDb25uZWN0aW9uKHdpbmRvdywgYnJvd3NlckRldGFpbHMudmVyc2lvbik7XG4gIH0sXG4gIHNoaW1SZXBsYWNlVHJhY2s6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIC8vIE9SVEMgaGFzIHJlcGxhY2VUcmFjayAtLSBodHRwczovL2dpdGh1Yi5jb20vdzNjL29ydGMvaXNzdWVzLzYxNFxuICAgIGlmICh3aW5kb3cuUlRDUnRwU2VuZGVyICYmXG4gICAgICAgICEoJ3JlcGxhY2VUcmFjaycgaW4gd2luZG93LlJUQ1J0cFNlbmRlci5wcm90b3R5cGUpKSB7XG4gICAgICB3aW5kb3cuUlRDUnRwU2VuZGVyLnByb3RvdHlwZS5yZXBsYWNlVHJhY2sgPVxuICAgICAgICAgIHdpbmRvdy5SVENSdHBTZW5kZXIucHJvdG90eXBlLnNldFRyYWNrO1xuICAgIH1cbiAgfVxufTtcblxufSx7XCIuLi91dGlsc1wiOjEzLFwiLi9nZXR1c2VybWVkaWFcIjo5LFwicnRjcGVlcmNvbm5lY3Rpb24tc2hpbVwiOjF9XSw5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8qXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXG4gKiAgdHJlZS5cbiAqL1xuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xuJ3VzZSBzdHJpY3QnO1xuXG4vLyBFeHBvc2UgcHVibGljIG1ldGhvZHMuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHdpbmRvdykge1xuICB2YXIgbmF2aWdhdG9yID0gd2luZG93ICYmIHdpbmRvdy5uYXZpZ2F0b3I7XG5cbiAgdmFyIHNoaW1FcnJvcl8gPSBmdW5jdGlvbihlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IHtQZXJtaXNzaW9uRGVuaWVkRXJyb3I6ICdOb3RBbGxvd2VkRXJyb3InfVtlLm5hbWVdIHx8IGUubmFtZSxcbiAgICAgIG1lc3NhZ2U6IGUubWVzc2FnZSxcbiAgICAgIGNvbnN0cmFpbnQ6IGUuY29uc3RyYWludCxcbiAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xuXG4gIC8vIGdldFVzZXJNZWRpYSBlcnJvciBzaGltLlxuICB2YXIgb3JpZ0dldFVzZXJNZWRpYSA9IG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhLlxuICAgICAgYmluZChuYXZpZ2F0b3IubWVkaWFEZXZpY2VzKTtcbiAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEgPSBmdW5jdGlvbihjKSB7XG4gICAgcmV0dXJuIG9yaWdHZXRVc2VyTWVkaWEoYykuY2F0Y2goZnVuY3Rpb24oZSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHNoaW1FcnJvcl8oZSkpO1xuICAgIH0pO1xuICB9O1xufTtcblxufSx7fV0sMTA6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLypcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcbiAqICB0cmVlLlxuICovXG4gLyogZXNsaW50LWVudiBub2RlICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzaGltR2V0VXNlck1lZGlhOiByZXF1aXJlKCcuL2dldHVzZXJtZWRpYScpLFxuICBzaGltT25UcmFjazogZnVuY3Rpb24od2luZG93KSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiAmJiAhKCdvbnRyYWNrJyBpblxuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUsICdvbnRyYWNrJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9vbnRyYWNrO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKGYpIHtcbiAgICAgICAgICBpZiAodGhpcy5fb250cmFjaykge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFjaycsIHRoaXMuX29udHJhY2spO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdhZGRzdHJlYW0nLCB0aGlzLl9vbnRyYWNrcG9seSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigndHJhY2snLCB0aGlzLl9vbnRyYWNrID0gZik7XG4gICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdhZGRzdHJlYW0nLCB0aGlzLl9vbnRyYWNrcG9seSA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUuc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcbiAgICAgICAgICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCd0cmFjaycpO1xuICAgICAgICAgICAgICBldmVudC50cmFjayA9IHRyYWNrO1xuICAgICAgICAgICAgICBldmVudC5yZWNlaXZlciA9IHt0cmFjazogdHJhY2t9O1xuICAgICAgICAgICAgICBldmVudC50cmFuc2NlaXZlciA9IHtyZWNlaXZlcjogZXZlbnQucmVjZWl2ZXJ9O1xuICAgICAgICAgICAgICBldmVudC5zdHJlYW1zID0gW2Uuc3RyZWFtXTtcbiAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiB3aW5kb3cuUlRDVHJhY2tFdmVudCAmJlxuICAgICAgICAoJ3JlY2VpdmVyJyBpbiB3aW5kb3cuUlRDVHJhY2tFdmVudC5wcm90b3R5cGUpICYmXG4gICAgICAgICEoJ3RyYW5zY2VpdmVyJyBpbiB3aW5kb3cuUlRDVHJhY2tFdmVudC5wcm90b3R5cGUpKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1RyYWNrRXZlbnQucHJvdG90eXBlLCAndHJhbnNjZWl2ZXInLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHtyZWNlaXZlcjogdGhpcy5yZWNlaXZlcn07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICBzaGltU291cmNlT2JqZWN0OiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICAvLyBGaXJlZm94IGhhcyBzdXBwb3J0ZWQgbW96U3JjT2JqZWN0IHNpbmNlIEZGMjIsIHVucHJlZml4ZWQgaW4gNDIuXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAod2luZG93LkhUTUxNZWRpYUVsZW1lbnQgJiZcbiAgICAgICAgISgnc3JjT2JqZWN0JyBpbiB3aW5kb3cuSFRNTE1lZGlhRWxlbWVudC5wcm90b3R5cGUpKSB7XG4gICAgICAgIC8vIFNoaW0gdGhlIHNyY09iamVjdCBwcm9wZXJ0eSwgb25jZSwgd2hlbiBIVE1MTWVkaWFFbGVtZW50IGlzIGZvdW5kLlxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LkhUTUxNZWRpYUVsZW1lbnQucHJvdG90eXBlLCAnc3JjT2JqZWN0Jywge1xuICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb3pTcmNPYmplY3Q7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgICAgICAgdGhpcy5tb3pTcmNPYmplY3QgPSBzdHJlYW07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgc2hpbVBlZXJDb25uZWN0aW9uOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICB2YXIgYnJvd3NlckRldGFpbHMgPSB1dGlscy5kZXRlY3RCcm93c2VyKHdpbmRvdyk7XG5cbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ29iamVjdCcgfHwgISh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gfHxcbiAgICAgICAgd2luZG93Lm1velJUQ1BlZXJDb25uZWN0aW9uKSkge1xuICAgICAgcmV0dXJuOyAvLyBwcm9iYWJseSBtZWRpYS5wZWVyY29ubmVjdGlvbi5lbmFibGVkPWZhbHNlIGluIGFib3V0OmNvbmZpZ1xuICAgIH1cbiAgICAvLyBUaGUgUlRDUGVlckNvbm5lY3Rpb24gb2JqZWN0LlxuICAgIGlmICghd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uKSB7XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gPSBmdW5jdGlvbihwY0NvbmZpZywgcGNDb25zdHJhaW50cykge1xuICAgICAgICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDM4KSB7XG4gICAgICAgICAgLy8gLnVybHMgaXMgbm90IHN1cHBvcnRlZCBpbiBGRiA8IDM4LlxuICAgICAgICAgIC8vIGNyZWF0ZSBSVENJY2VTZXJ2ZXJzIHdpdGggYSBzaW5nbGUgdXJsLlxuICAgICAgICAgIGlmIChwY0NvbmZpZyAmJiBwY0NvbmZpZy5pY2VTZXJ2ZXJzKSB7XG4gICAgICAgICAgICB2YXIgbmV3SWNlU2VydmVycyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwY0NvbmZpZy5pY2VTZXJ2ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHZhciBzZXJ2ZXIgPSBwY0NvbmZpZy5pY2VTZXJ2ZXJzW2ldO1xuICAgICAgICAgICAgICBpZiAoc2VydmVyLmhhc093blByb3BlcnR5KCd1cmxzJykpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNlcnZlci51cmxzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgbmV3U2VydmVyID0ge1xuICAgICAgICAgICAgICAgICAgICB1cmw6IHNlcnZlci51cmxzW2pdXG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgaWYgKHNlcnZlci51cmxzW2pdLmluZGV4T2YoJ3R1cm4nKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBuZXdTZXJ2ZXIudXNlcm5hbWUgPSBzZXJ2ZXIudXNlcm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIG5ld1NlcnZlci5jcmVkZW50aWFsID0gc2VydmVyLmNyZWRlbnRpYWw7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBuZXdJY2VTZXJ2ZXJzLnB1c2gobmV3U2VydmVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3SWNlU2VydmVycy5wdXNoKHBjQ29uZmlnLmljZVNlcnZlcnNbaV0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwY0NvbmZpZy5pY2VTZXJ2ZXJzID0gbmV3SWNlU2VydmVycztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyB3aW5kb3cubW96UlRDUGVlckNvbm5lY3Rpb24ocGNDb25maWcsIHBjQ29uc3RyYWludHMpO1xuICAgICAgfTtcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUgPVxuICAgICAgICAgIHdpbmRvdy5tb3pSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGU7XG5cbiAgICAgIC8vIHdyYXAgc3RhdGljIG1ldGhvZHMuIEN1cnJlbnRseSBqdXN0IGdlbmVyYXRlQ2VydGlmaWNhdGUuXG4gICAgICBpZiAod2luZG93Lm1velJUQ1BlZXJDb25uZWN0aW9uLmdlbmVyYXRlQ2VydGlmaWNhdGUpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiwgJ2dlbmVyYXRlQ2VydGlmaWNhdGUnLCB7XG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cubW96UlRDUGVlckNvbm5lY3Rpb24uZ2VuZXJhdGVDZXJ0aWZpY2F0ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB3aW5kb3cuUlRDU2Vzc2lvbkRlc2NyaXB0aW9uID0gd2luZG93Lm1velJUQ1Nlc3Npb25EZXNjcmlwdGlvbjtcbiAgICAgIHdpbmRvdy5SVENJY2VDYW5kaWRhdGUgPSB3aW5kb3cubW96UlRDSWNlQ2FuZGlkYXRlO1xuICAgIH1cblxuICAgIC8vIHNoaW0gYXdheSBuZWVkIGZvciBvYnNvbGV0ZSBSVENJY2VDYW5kaWRhdGUvUlRDU2Vzc2lvbkRlc2NyaXB0aW9uLlxuICAgIFsnc2V0TG9jYWxEZXNjcmlwdGlvbicsICdzZXRSZW1vdGVEZXNjcmlwdGlvbicsICdhZGRJY2VDYW5kaWRhdGUnXVxuICAgICAgICAuZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgICAgICB2YXIgbmF0aXZlTWV0aG9kID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdO1xuICAgICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYXJndW1lbnRzWzBdID0gbmV3ICgobWV0aG9kID09PSAnYWRkSWNlQ2FuZGlkYXRlJykgP1xuICAgICAgICAgICAgICAgIHdpbmRvdy5SVENJY2VDYW5kaWRhdGUgOlxuICAgICAgICAgICAgICAgIHdpbmRvdy5SVENTZXNzaW9uRGVzY3JpcHRpb24pKGFyZ3VtZW50c1swXSk7XG4gICAgICAgICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAvLyBzdXBwb3J0IGZvciBhZGRJY2VDYW5kaWRhdGUobnVsbCBvciB1bmRlZmluZWQpXG4gICAgdmFyIG5hdGl2ZUFkZEljZUNhbmRpZGF0ZSA9XG4gICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkSWNlQ2FuZGlkYXRlO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkSWNlQ2FuZGlkYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50c1swXSkge1xuICAgICAgICBpZiAoYXJndW1lbnRzWzFdKSB7XG4gICAgICAgICAgYXJndW1lbnRzWzFdLmFwcGx5KG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuYXRpdmVBZGRJY2VDYW5kaWRhdGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuXG4gICAgLy8gc2hpbSBnZXRTdGF0cyB3aXRoIG1hcGxpa2Ugc3VwcG9ydFxuICAgIHZhciBtYWtlTWFwU3RhdHMgPSBmdW5jdGlvbihzdGF0cykge1xuICAgICAgdmFyIG1hcCA9IG5ldyBNYXAoKTtcbiAgICAgIE9iamVjdC5rZXlzKHN0YXRzKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICBtYXAuc2V0KGtleSwgc3RhdHNba2V5XSk7XG4gICAgICAgIG1hcFtrZXldID0gc3RhdHNba2V5XTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG1hcDtcbiAgICB9O1xuXG4gICAgdmFyIG1vZGVyblN0YXRzVHlwZXMgPSB7XG4gICAgICBpbmJvdW5kcnRwOiAnaW5ib3VuZC1ydHAnLFxuICAgICAgb3V0Ym91bmRydHA6ICdvdXRib3VuZC1ydHAnLFxuICAgICAgY2FuZGlkYXRlcGFpcjogJ2NhbmRpZGF0ZS1wYWlyJyxcbiAgICAgIGxvY2FsY2FuZGlkYXRlOiAnbG9jYWwtY2FuZGlkYXRlJyxcbiAgICAgIHJlbW90ZWNhbmRpZGF0ZTogJ3JlbW90ZS1jYW5kaWRhdGUnXG4gICAgfTtcblxuICAgIHZhciBuYXRpdmVHZXRTdGF0cyA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U3RhdHM7XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTdGF0cyA9IGZ1bmN0aW9uKFxuICAgICAgc2VsZWN0b3IsXG4gICAgICBvblN1Y2MsXG4gICAgICBvbkVyclxuICAgICkge1xuICAgICAgcmV0dXJuIG5hdGl2ZUdldFN0YXRzLmFwcGx5KHRoaXMsIFtzZWxlY3RvciB8fCBudWxsXSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oc3RhdHMpIHtcbiAgICAgICAgICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDQ4KSB7XG4gICAgICAgICAgICBzdGF0cyA9IG1ha2VNYXBTdGF0cyhzdGF0cyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgNTMgJiYgIW9uU3VjYykge1xuICAgICAgICAgICAgLy8gU2hpbSBvbmx5IHByb21pc2UgZ2V0U3RhdHMgd2l0aCBzcGVjLWh5cGhlbnMgaW4gdHlwZSBuYW1lc1xuICAgICAgICAgICAgLy8gTGVhdmUgY2FsbGJhY2sgdmVyc2lvbiBhbG9uZTsgbWlzYyBvbGQgdXNlcyBvZiBmb3JFYWNoIGJlZm9yZSBNYXBcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIHN0YXRzLmZvckVhY2goZnVuY3Rpb24oc3RhdCkge1xuICAgICAgICAgICAgICAgIHN0YXQudHlwZSA9IG1vZGVyblN0YXRzVHlwZXNbc3RhdC50eXBlXSB8fCBzdGF0LnR5cGU7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICBpZiAoZS5uYW1lICE9PSAnVHlwZUVycm9yJykge1xuICAgICAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLy8gQXZvaWQgVHlwZUVycm9yOiBcInR5cGVcIiBpcyByZWFkLW9ubHksIGluIG9sZCB2ZXJzaW9ucy4gMzQtNDNpc2hcbiAgICAgICAgICAgICAgc3RhdHMuZm9yRWFjaChmdW5jdGlvbihzdGF0LCBpKSB7XG4gICAgICAgICAgICAgICAgc3RhdHMuc2V0KGksIE9iamVjdC5hc3NpZ24oe30sIHN0YXQsIHtcbiAgICAgICAgICAgICAgICAgIHR5cGU6IG1vZGVyblN0YXRzVHlwZXNbc3RhdC50eXBlXSB8fCBzdGF0LnR5cGVcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gc3RhdHM7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKG9uU3VjYywgb25FcnIpO1xuICAgIH07XG4gIH0sXG5cbiAgc2hpbVJlbW92ZVN0cmVhbTogZnVuY3Rpb24od2luZG93KSB7XG4gICAgaWYgKCF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gfHxcbiAgICAgICAgJ3JlbW92ZVN0cmVhbScgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgIHV0aWxzLmRlcHJlY2F0ZWQoJ3JlbW92ZVN0cmVhbScsICdyZW1vdmVUcmFjaycpO1xuICAgICAgdGhpcy5nZXRTZW5kZXJzKCkuZm9yRWFjaChmdW5jdGlvbihzZW5kZXIpIHtcbiAgICAgICAgaWYgKHNlbmRlci50cmFjayAmJiBzdHJlYW0uZ2V0VHJhY2tzKCkuaW5kZXhPZihzZW5kZXIudHJhY2spICE9PSAtMSkge1xuICAgICAgICAgIHBjLnJlbW92ZVRyYWNrKHNlbmRlcik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbn07XG5cbn0se1wiLi4vdXRpbHNcIjoxMyxcIi4vZ2V0dXNlcm1lZGlhXCI6MTF9XSwxMTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vKlxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxuICogIHRyZWUuXG4gKi9cbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcbnZhciBsb2dnaW5nID0gdXRpbHMubG9nO1xuXG4vLyBFeHBvc2UgcHVibGljIG1ldGhvZHMuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHdpbmRvdykge1xuICB2YXIgYnJvd3NlckRldGFpbHMgPSB1dGlscy5kZXRlY3RCcm93c2VyKHdpbmRvdyk7XG4gIHZhciBuYXZpZ2F0b3IgPSB3aW5kb3cgJiYgd2luZG93Lm5hdmlnYXRvcjtcbiAgdmFyIE1lZGlhU3RyZWFtVHJhY2sgPSB3aW5kb3cgJiYgd2luZG93Lk1lZGlhU3RyZWFtVHJhY2s7XG5cbiAgdmFyIHNoaW1FcnJvcl8gPSBmdW5jdGlvbihlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgSW50ZXJuYWxFcnJvcjogJ05vdFJlYWRhYmxlRXJyb3InLFxuICAgICAgICBOb3RTdXBwb3J0ZWRFcnJvcjogJ1R5cGVFcnJvcicsXG4gICAgICAgIFBlcm1pc3Npb25EZW5pZWRFcnJvcjogJ05vdEFsbG93ZWRFcnJvcicsXG4gICAgICAgIFNlY3VyaXR5RXJyb3I6ICdOb3RBbGxvd2VkRXJyb3InXG4gICAgICB9W2UubmFtZV0gfHwgZS5uYW1lLFxuICAgICAgbWVzc2FnZToge1xuICAgICAgICAnVGhlIG9wZXJhdGlvbiBpcyBpbnNlY3VyZS4nOiAnVGhlIHJlcXVlc3QgaXMgbm90IGFsbG93ZWQgYnkgdGhlICcgK1xuICAgICAgICAndXNlciBhZ2VudCBvciB0aGUgcGxhdGZvcm0gaW4gdGhlIGN1cnJlbnQgY29udGV4dC4nXG4gICAgICB9W2UubWVzc2FnZV0gfHwgZS5tZXNzYWdlLFxuICAgICAgY29uc3RyYWludDogZS5jb25zdHJhaW50LFxuICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lICsgKHRoaXMubWVzc2FnZSAmJiAnOiAnKSArIHRoaXMubWVzc2FnZTtcbiAgICAgIH1cbiAgICB9O1xuICB9O1xuXG4gIC8vIGdldFVzZXJNZWRpYSBjb25zdHJhaW50cyBzaGltLlxuICB2YXIgZ2V0VXNlck1lZGlhXyA9IGZ1bmN0aW9uKGNvbnN0cmFpbnRzLCBvblN1Y2Nlc3MsIG9uRXJyb3IpIHtcbiAgICB2YXIgY29uc3RyYWludHNUb0ZGMzdfID0gZnVuY3Rpb24oYykge1xuICAgICAgaWYgKHR5cGVvZiBjICE9PSAnb2JqZWN0JyB8fCBjLnJlcXVpcmUpIHtcbiAgICAgICAgcmV0dXJuIGM7XG4gICAgICB9XG4gICAgICB2YXIgcmVxdWlyZSA9IFtdO1xuICAgICAgT2JqZWN0LmtleXMoYykuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gJ3JlcXVpcmUnIHx8IGtleSA9PT0gJ2FkdmFuY2VkJyB8fCBrZXkgPT09ICdtZWRpYVNvdXJjZScpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHIgPSBjW2tleV0gPSAodHlwZW9mIGNba2V5XSA9PT0gJ29iamVjdCcpID9cbiAgICAgICAgICAgIGNba2V5XSA6IHtpZGVhbDogY1trZXldfTtcbiAgICAgICAgaWYgKHIubWluICE9PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIHIubWF4ICE9PSB1bmRlZmluZWQgfHwgci5leGFjdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmVxdWlyZS5wdXNoKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHIuZXhhY3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGlmICh0eXBlb2Ygci5leGFjdCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHIuIG1pbiA9IHIubWF4ID0gci5leGFjdDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY1trZXldID0gci5leGFjdDtcbiAgICAgICAgICB9XG4gICAgICAgICAgZGVsZXRlIHIuZXhhY3Q7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHIuaWRlYWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGMuYWR2YW5jZWQgPSBjLmFkdmFuY2VkIHx8IFtdO1xuICAgICAgICAgIHZhciBvYyA9IHt9O1xuICAgICAgICAgIGlmICh0eXBlb2Ygci5pZGVhbCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIG9jW2tleV0gPSB7bWluOiByLmlkZWFsLCBtYXg6IHIuaWRlYWx9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvY1trZXldID0gci5pZGVhbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgYy5hZHZhbmNlZC5wdXNoKG9jKTtcbiAgICAgICAgICBkZWxldGUgci5pZGVhbDtcbiAgICAgICAgICBpZiAoIU9iamVjdC5rZXlzKHIpLmxlbmd0aCkge1xuICAgICAgICAgICAgZGVsZXRlIGNba2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKHJlcXVpcmUubGVuZ3RoKSB7XG4gICAgICAgIGMucmVxdWlyZSA9IHJlcXVpcmU7XG4gICAgICB9XG4gICAgICByZXR1cm4gYztcbiAgICB9O1xuICAgIGNvbnN0cmFpbnRzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShjb25zdHJhaW50cykpO1xuICAgIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgMzgpIHtcbiAgICAgIGxvZ2dpbmcoJ3NwZWM6ICcgKyBKU09OLnN0cmluZ2lmeShjb25zdHJhaW50cykpO1xuICAgICAgaWYgKGNvbnN0cmFpbnRzLmF1ZGlvKSB7XG4gICAgICAgIGNvbnN0cmFpbnRzLmF1ZGlvID0gY29uc3RyYWludHNUb0ZGMzdfKGNvbnN0cmFpbnRzLmF1ZGlvKTtcbiAgICAgIH1cbiAgICAgIGlmIChjb25zdHJhaW50cy52aWRlbykge1xuICAgICAgICBjb25zdHJhaW50cy52aWRlbyA9IGNvbnN0cmFpbnRzVG9GRjM3Xyhjb25zdHJhaW50cy52aWRlbyk7XG4gICAgICB9XG4gICAgICBsb2dnaW5nKCdmZjM3OiAnICsgSlNPTi5zdHJpbmdpZnkoY29uc3RyYWludHMpKTtcbiAgICB9XG4gICAgcmV0dXJuIG5hdmlnYXRvci5tb3pHZXRVc2VyTWVkaWEoY29uc3RyYWludHMsIG9uU3VjY2VzcywgZnVuY3Rpb24oZSkge1xuICAgICAgb25FcnJvcihzaGltRXJyb3JfKGUpKTtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIHRoZSByZXN1bHQgb2YgZ2V0VXNlck1lZGlhIGFzIGEgUHJvbWlzZS5cbiAgdmFyIGdldFVzZXJNZWRpYVByb21pc2VfID0gZnVuY3Rpb24oY29uc3RyYWludHMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBnZXRVc2VyTWVkaWFfKGNvbnN0cmFpbnRzLCByZXNvbHZlLCByZWplY3QpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIFNoaW0gZm9yIG1lZGlhRGV2aWNlcyBvbiBvbGRlciB2ZXJzaW9ucy5cbiAgaWYgKCFuYXZpZ2F0b3IubWVkaWFEZXZpY2VzKSB7XG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcyA9IHtnZXRVc2VyTWVkaWE6IGdldFVzZXJNZWRpYVByb21pc2VfLFxuICAgICAgYWRkRXZlbnRMaXN0ZW5lcjogZnVuY3Rpb24oKSB7IH0sXG4gICAgICByZW1vdmVFdmVudExpc3RlbmVyOiBmdW5jdGlvbigpIHsgfVxuICAgIH07XG4gIH1cbiAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzID1cbiAgICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlcyB8fCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiAgICAgICAgICB2YXIgaW5mb3MgPSBbXG4gICAgICAgICAgICB7a2luZDogJ2F1ZGlvaW5wdXQnLCBkZXZpY2VJZDogJ2RlZmF1bHQnLCBsYWJlbDogJycsIGdyb3VwSWQ6ICcnfSxcbiAgICAgICAgICAgIHtraW5kOiAndmlkZW9pbnB1dCcsIGRldmljZUlkOiAnZGVmYXVsdCcsIGxhYmVsOiAnJywgZ3JvdXBJZDogJyd9XG4gICAgICAgICAgXTtcbiAgICAgICAgICByZXNvbHZlKGluZm9zKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgNDEpIHtcbiAgICAvLyBXb3JrIGFyb3VuZCBodHRwOi8vYnVnemlsLmxhLzExNjk2NjVcbiAgICB2YXIgb3JnRW51bWVyYXRlRGV2aWNlcyA9XG4gICAgICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlcy5iaW5kKG5hdmlnYXRvci5tZWRpYURldmljZXMpO1xuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIG9yZ0VudW1lcmF0ZURldmljZXMoKS50aGVuKHVuZGVmaW5lZCwgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoZS5uYW1lID09PSAnTm90Rm91bmRFcnJvcicpIHtcbiAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbiAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCA0OSkge1xuICAgIHZhciBvcmlnR2V0VXNlck1lZGlhID0gbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEuXG4gICAgICAgIGJpbmQobmF2aWdhdG9yLm1lZGlhRGV2aWNlcyk7XG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEgPSBmdW5jdGlvbihjKSB7XG4gICAgICByZXR1cm4gb3JpZ0dldFVzZXJNZWRpYShjKS50aGVuKGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgICAvLyBXb3JrIGFyb3VuZCBodHRwczovL2J1Z3ppbC5sYS84MDIzMjZcbiAgICAgICAgaWYgKGMuYXVkaW8gJiYgIXN0cmVhbS5nZXRBdWRpb1RyYWNrcygpLmxlbmd0aCB8fFxuICAgICAgICAgICAgYy52aWRlbyAmJiAhc3RyZWFtLmdldFZpZGVvVHJhY2tzKCkubGVuZ3RoKSB7XG4gICAgICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcbiAgICAgICAgICAgIHRyYWNrLnN0b3AoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKCdUaGUgb2JqZWN0IGNhbiBub3QgYmUgZm91bmQgaGVyZS4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ05vdEZvdW5kRXJyb3InKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RyZWFtO1xuICAgICAgfSwgZnVuY3Rpb24oZSkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3Qoc2hpbUVycm9yXyhlKSk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG4gIGlmICghKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPiA1NSAmJlxuICAgICAgJ2F1dG9HYWluQ29udHJvbCcgaW4gbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRTdXBwb3J0ZWRDb25zdHJhaW50cygpKSkge1xuICAgIHZhciByZW1hcCA9IGZ1bmN0aW9uKG9iaiwgYSwgYikge1xuICAgICAgaWYgKGEgaW4gb2JqICYmICEoYiBpbiBvYmopKSB7XG4gICAgICAgIG9ialtiXSA9IG9ialthXTtcbiAgICAgICAgZGVsZXRlIG9ialthXTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIG5hdGl2ZUdldFVzZXJNZWRpYSA9IG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhLlxuICAgICAgICBiaW5kKG5hdmlnYXRvci5tZWRpYURldmljZXMpO1xuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhID0gZnVuY3Rpb24oYykge1xuICAgICAgaWYgKHR5cGVvZiBjID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgYy5hdWRpbyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgYyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYykpO1xuICAgICAgICByZW1hcChjLmF1ZGlvLCAnYXV0b0dhaW5Db250cm9sJywgJ21vekF1dG9HYWluQ29udHJvbCcpO1xuICAgICAgICByZW1hcChjLmF1ZGlvLCAnbm9pc2VTdXBwcmVzc2lvbicsICdtb3pOb2lzZVN1cHByZXNzaW9uJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmF0aXZlR2V0VXNlck1lZGlhKGMpO1xuICAgIH07XG5cbiAgICBpZiAoTWVkaWFTdHJlYW1UcmFjayAmJiBNZWRpYVN0cmVhbVRyYWNrLnByb3RvdHlwZS5nZXRTZXR0aW5ncykge1xuICAgICAgdmFyIG5hdGl2ZUdldFNldHRpbmdzID0gTWVkaWFTdHJlYW1UcmFjay5wcm90b3R5cGUuZ2V0U2V0dGluZ3M7XG4gICAgICBNZWRpYVN0cmVhbVRyYWNrLnByb3RvdHlwZS5nZXRTZXR0aW5ncyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgb2JqID0gbmF0aXZlR2V0U2V0dGluZ3MuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgcmVtYXAob2JqLCAnbW96QXV0b0dhaW5Db250cm9sJywgJ2F1dG9HYWluQ29udHJvbCcpO1xuICAgICAgICByZW1hcChvYmosICdtb3pOb2lzZVN1cHByZXNzaW9uJywgJ25vaXNlU3VwcHJlc3Npb24nKTtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKE1lZGlhU3RyZWFtVHJhY2sgJiYgTWVkaWFTdHJlYW1UcmFjay5wcm90b3R5cGUuYXBwbHlDb25zdHJhaW50cykge1xuICAgICAgdmFyIG5hdGl2ZUFwcGx5Q29uc3RyYWludHMgPSBNZWRpYVN0cmVhbVRyYWNrLnByb3RvdHlwZS5hcHBseUNvbnN0cmFpbnRzO1xuICAgICAgTWVkaWFTdHJlYW1UcmFjay5wcm90b3R5cGUuYXBwbHlDb25zdHJhaW50cyA9IGZ1bmN0aW9uKGMpIHtcbiAgICAgICAgaWYgKHRoaXMua2luZCA9PT0gJ2F1ZGlvJyAmJiB0eXBlb2YgYyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBjID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShjKSk7XG4gICAgICAgICAgcmVtYXAoYywgJ2F1dG9HYWluQ29udHJvbCcsICdtb3pBdXRvR2FpbkNvbnRyb2wnKTtcbiAgICAgICAgICByZW1hcChjLCAnbm9pc2VTdXBwcmVzc2lvbicsICdtb3pOb2lzZVN1cHByZXNzaW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5hdGl2ZUFwcGx5Q29uc3RyYWludHMuYXBwbHkodGhpcywgW2NdKTtcbiAgICAgIH07XG4gICAgfVxuICB9XG4gIG5hdmlnYXRvci5nZXRVc2VyTWVkaWEgPSBmdW5jdGlvbihjb25zdHJhaW50cywgb25TdWNjZXNzLCBvbkVycm9yKSB7XG4gICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCA0NCkge1xuICAgICAgcmV0dXJuIGdldFVzZXJNZWRpYV8oY29uc3RyYWludHMsIG9uU3VjY2Vzcywgb25FcnJvcik7XG4gICAgfVxuICAgIC8vIFJlcGxhY2UgRmlyZWZveCA0NCsncyBkZXByZWNhdGlvbiB3YXJuaW5nIHdpdGggdW5wcmVmaXhlZCB2ZXJzaW9uLlxuICAgIHV0aWxzLmRlcHJlY2F0ZWQoJ25hdmlnYXRvci5nZXRVc2VyTWVkaWEnLFxuICAgICAgICAnbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEnKTtcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYShjb25zdHJhaW50cykudGhlbihvblN1Y2Nlc3MsIG9uRXJyb3IpO1xuICB9O1xufTtcblxufSx7XCIuLi91dGlsc1wiOjEzfV0sMTI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLypcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcbiAqICB0cmVlLlxuICovXG4ndXNlIHN0cmljdCc7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2hpbUxvY2FsU3RyZWFtc0FQSTogZnVuY3Rpb24od2luZG93KSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICdvYmplY3QnIHx8ICF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCEoJ2dldExvY2FsU3RyZWFtcycgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkpIHtcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0TG9jYWxTdHJlYW1zID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghdGhpcy5fbG9jYWxTdHJlYW1zKSB7XG4gICAgICAgICAgdGhpcy5fbG9jYWxTdHJlYW1zID0gW107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsU3RyZWFtcztcbiAgICAgIH07XG4gICAgfVxuICAgIGlmICghKCdnZXRTdHJlYW1CeUlkJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTdHJlYW1CeUlkID0gZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IG51bGw7XG4gICAgICAgIGlmICh0aGlzLl9sb2NhbFN0cmVhbXMpIHtcbiAgICAgICAgICB0aGlzLl9sb2NhbFN0cmVhbXMuZm9yRWFjaChmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgICAgICAgIGlmIChzdHJlYW0uaWQgPT09IGlkKSB7XG4gICAgICAgICAgICAgIHJlc3VsdCA9IHN0cmVhbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fcmVtb3RlU3RyZWFtcykge1xuICAgICAgICAgIHRoaXMuX3JlbW90ZVN0cmVhbXMuZm9yRWFjaChmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgICAgICAgIGlmIChzdHJlYW0uaWQgPT09IGlkKSB7XG4gICAgICAgICAgICAgIHJlc3VsdCA9IHN0cmVhbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKCEoJ2FkZFN0cmVhbScgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkpIHtcbiAgICAgIHZhciBfYWRkVHJhY2sgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFRyYWNrO1xuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgICAgaWYgKCF0aGlzLl9sb2NhbFN0cmVhbXMpIHtcbiAgICAgICAgICB0aGlzLl9sb2NhbFN0cmVhbXMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fbG9jYWxTdHJlYW1zLmluZGV4T2Yoc3RyZWFtKSA9PT0gLTEpIHtcbiAgICAgICAgICB0aGlzLl9sb2NhbFN0cmVhbXMucHVzaChzdHJlYW0pO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwYyA9IHRoaXM7XG4gICAgICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XG4gICAgICAgICAgX2FkZFRyYWNrLmNhbGwocGMsIHRyYWNrLCBzdHJlYW0pO1xuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2sgPSBmdW5jdGlvbih0cmFjaywgc3RyZWFtKSB7XG4gICAgICAgIGlmIChzdHJlYW0pIHtcbiAgICAgICAgICBpZiAoIXRoaXMuX2xvY2FsU3RyZWFtcykge1xuICAgICAgICAgICAgdGhpcy5fbG9jYWxTdHJlYW1zID0gW3N0cmVhbV07XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9sb2NhbFN0cmVhbXMuaW5kZXhPZihzdHJlYW0pID09PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5fbG9jYWxTdHJlYW1zLnB1c2goc3RyZWFtKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9hZGRUcmFjay5jYWxsKHRoaXMsIHRyYWNrLCBzdHJlYW0pO1xuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKCEoJ3JlbW92ZVN0cmVhbScgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkpIHtcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICAgIGlmICghdGhpcy5fbG9jYWxTdHJlYW1zKSB7XG4gICAgICAgICAgdGhpcy5fbG9jYWxTdHJlYW1zID0gW107XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5fbG9jYWxTdHJlYW1zLmluZGV4T2Yoc3RyZWFtKTtcbiAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sb2NhbFN0cmVhbXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgICAgdmFyIHRyYWNrcyA9IHN0cmVhbS5nZXRUcmFja3MoKTtcbiAgICAgICAgdGhpcy5nZXRTZW5kZXJzKCkuZm9yRWFjaChmdW5jdGlvbihzZW5kZXIpIHtcbiAgICAgICAgICBpZiAodHJhY2tzLmluZGV4T2Yoc2VuZGVyLnRyYWNrKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHBjLnJlbW92ZVRyYWNrKHNlbmRlcik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfVxuICB9LFxuICBzaGltUmVtb3RlU3RyZWFtc0FQSTogZnVuY3Rpb24od2luZG93KSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICdvYmplY3QnIHx8ICF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCEoJ2dldFJlbW90ZVN0cmVhbXMnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFJlbW90ZVN0cmVhbXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlbW90ZVN0cmVhbXMgPyB0aGlzLl9yZW1vdGVTdHJlYW1zIDogW107XG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAoISgnb25hZGRzdHJlYW0nIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSwgJ29uYWRkc3RyZWFtJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9vbmFkZHN0cmVhbTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbihmKSB7XG4gICAgICAgICAgdmFyIHBjID0gdGhpcztcbiAgICAgICAgICBpZiAodGhpcy5fb25hZGRzdHJlYW0pIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWRkc3RyZWFtJywgdGhpcy5fb25hZGRzdHJlYW0pO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFjaycsIHRoaXMuX29uYWRkc3RyZWFtcG9seSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignYWRkc3RyZWFtJywgdGhpcy5fb25hZGRzdHJlYW0gPSBmKTtcbiAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYWNrJywgdGhpcy5fb25hZGRzdHJlYW1wb2x5ID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5zdHJlYW1zLmZvckVhY2goZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICAgICAgICAgIGlmICghcGMuX3JlbW90ZVN0cmVhbXMpIHtcbiAgICAgICAgICAgICAgICBwYy5fcmVtb3RlU3RyZWFtcyA9IFtdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChwYy5fcmVtb3RlU3RyZWFtcy5pbmRleE9mKHN0cmVhbSkgPj0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBwYy5fcmVtb3RlU3RyZWFtcy5wdXNoKHN0cmVhbSk7XG4gICAgICAgICAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgnYWRkc3RyZWFtJyk7XG4gICAgICAgICAgICAgIGV2ZW50LnN0cmVhbSA9IHN0cmVhbTtcbiAgICAgICAgICAgICAgcGMuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9LFxuICBzaGltQ2FsbGJhY2tzQVBJOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ29iamVjdCcgfHwgIXdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgcHJvdG90eXBlID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZTtcbiAgICB2YXIgY3JlYXRlT2ZmZXIgPSBwcm90b3R5cGUuY3JlYXRlT2ZmZXI7XG4gICAgdmFyIGNyZWF0ZUFuc3dlciA9IHByb3RvdHlwZS5jcmVhdGVBbnN3ZXI7XG4gICAgdmFyIHNldExvY2FsRGVzY3JpcHRpb24gPSBwcm90b3R5cGUuc2V0TG9jYWxEZXNjcmlwdGlvbjtcbiAgICB2YXIgc2V0UmVtb3RlRGVzY3JpcHRpb24gPSBwcm90b3R5cGUuc2V0UmVtb3RlRGVzY3JpcHRpb247XG4gICAgdmFyIGFkZEljZUNhbmRpZGF0ZSA9IHByb3RvdHlwZS5hZGRJY2VDYW5kaWRhdGU7XG5cbiAgICBwcm90b3R5cGUuY3JlYXRlT2ZmZXIgPSBmdW5jdGlvbihzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjaykge1xuICAgICAgdmFyIG9wdGlvbnMgPSAoYXJndW1lbnRzLmxlbmd0aCA+PSAyKSA/IGFyZ3VtZW50c1syXSA6IGFyZ3VtZW50c1swXTtcbiAgICAgIHZhciBwcm9taXNlID0gY3JlYXRlT2ZmZXIuYXBwbHkodGhpcywgW29wdGlvbnNdKTtcbiAgICAgIGlmICghZmFpbHVyZUNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgICAgfVxuICAgICAgcHJvbWlzZS50aGVuKHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9O1xuXG4gICAgcHJvdG90eXBlLmNyZWF0ZUFuc3dlciA9IGZ1bmN0aW9uKHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKSB7XG4gICAgICB2YXIgb3B0aW9ucyA9IChhcmd1bWVudHMubGVuZ3RoID49IDIpID8gYXJndW1lbnRzWzJdIDogYXJndW1lbnRzWzBdO1xuICAgICAgdmFyIHByb21pc2UgPSBjcmVhdGVBbnN3ZXIuYXBwbHkodGhpcywgW29wdGlvbnNdKTtcbiAgICAgIGlmICghZmFpbHVyZUNhbGxiYWNrKSB7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgICAgfVxuICAgICAgcHJvbWlzZS50aGVuKHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9O1xuXG4gICAgdmFyIHdpdGhDYWxsYmFjayA9IGZ1bmN0aW9uKGRlc2NyaXB0aW9uLCBzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjaykge1xuICAgICAgdmFyIHByb21pc2UgPSBzZXRMb2NhbERlc2NyaXB0aW9uLmFwcGx5KHRoaXMsIFtkZXNjcmlwdGlvbl0pO1xuICAgICAgaWYgKCFmYWlsdXJlQ2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgICB9XG4gICAgICBwcm9taXNlLnRoZW4oc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH07XG4gICAgcHJvdG90eXBlLnNldExvY2FsRGVzY3JpcHRpb24gPSB3aXRoQ2FsbGJhY2s7XG5cbiAgICB3aXRoQ2FsbGJhY2sgPSBmdW5jdGlvbihkZXNjcmlwdGlvbiwgc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spIHtcbiAgICAgIHZhciBwcm9taXNlID0gc2V0UmVtb3RlRGVzY3JpcHRpb24uYXBwbHkodGhpcywgW2Rlc2NyaXB0aW9uXSk7XG4gICAgICBpZiAoIWZhaWx1cmVDYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgIH1cbiAgICAgIHByb21pc2UudGhlbihzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjayk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfTtcbiAgICBwcm90b3R5cGUuc2V0UmVtb3RlRGVzY3JpcHRpb24gPSB3aXRoQ2FsbGJhY2s7XG5cbiAgICB3aXRoQ2FsbGJhY2sgPSBmdW5jdGlvbihjYW5kaWRhdGUsIHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKSB7XG4gICAgICB2YXIgcHJvbWlzZSA9IGFkZEljZUNhbmRpZGF0ZS5hcHBseSh0aGlzLCBbY2FuZGlkYXRlXSk7XG4gICAgICBpZiAoIWZhaWx1cmVDYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgIH1cbiAgICAgIHByb21pc2UudGhlbihzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjayk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfTtcbiAgICBwcm90b3R5cGUuYWRkSWNlQ2FuZGlkYXRlID0gd2l0aENhbGxiYWNrO1xuICB9LFxuICBzaGltR2V0VXNlck1lZGlhOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICB2YXIgbmF2aWdhdG9yID0gd2luZG93ICYmIHdpbmRvdy5uYXZpZ2F0b3I7XG5cbiAgICBpZiAoIW5hdmlnYXRvci5nZXRVc2VyTWVkaWEpIHtcbiAgICAgIGlmIChuYXZpZ2F0b3Iud2Via2l0R2V0VXNlck1lZGlhKSB7XG4gICAgICAgIG5hdmlnYXRvci5nZXRVc2VyTWVkaWEgPSBuYXZpZ2F0b3Iud2Via2l0R2V0VXNlck1lZGlhLmJpbmQobmF2aWdhdG9yKTtcbiAgICAgIH0gZWxzZSBpZiAobmF2aWdhdG9yLm1lZGlhRGV2aWNlcyAmJlxuICAgICAgICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKSB7XG4gICAgICAgIG5hdmlnYXRvci5nZXRVc2VyTWVkaWEgPSBmdW5jdGlvbihjb25zdHJhaW50cywgY2IsIGVycmNiKSB7XG4gICAgICAgICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoY29uc3RyYWludHMpXG4gICAgICAgICAgLnRoZW4oY2IsIGVycmNiKTtcbiAgICAgICAgfS5iaW5kKG5hdmlnYXRvcik7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBzaGltUlRDSWNlU2VydmVyVXJsczogZnVuY3Rpb24od2luZG93KSB7XG4gICAgLy8gbWlncmF0ZSBmcm9tIG5vbi1zcGVjIFJUQ0ljZVNlcnZlci51cmwgdG8gUlRDSWNlU2VydmVyLnVybHNcbiAgICB2YXIgT3JpZ1BlZXJDb25uZWN0aW9uID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uO1xuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiA9IGZ1bmN0aW9uKHBjQ29uZmlnLCBwY0NvbnN0cmFpbnRzKSB7XG4gICAgICBpZiAocGNDb25maWcgJiYgcGNDb25maWcuaWNlU2VydmVycykge1xuICAgICAgICB2YXIgbmV3SWNlU2VydmVycyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBjQ29uZmlnLmljZVNlcnZlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgc2VydmVyID0gcGNDb25maWcuaWNlU2VydmVyc1tpXTtcbiAgICAgICAgICBpZiAoIXNlcnZlci5oYXNPd25Qcm9wZXJ0eSgndXJscycpICYmXG4gICAgICAgICAgICAgIHNlcnZlci5oYXNPd25Qcm9wZXJ0eSgndXJsJykpIHtcbiAgICAgICAgICAgIHV0aWxzLmRlcHJlY2F0ZWQoJ1JUQ0ljZVNlcnZlci51cmwnLCAnUlRDSWNlU2VydmVyLnVybHMnKTtcbiAgICAgICAgICAgIHNlcnZlciA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoc2VydmVyKSk7XG4gICAgICAgICAgICBzZXJ2ZXIudXJscyA9IHNlcnZlci51cmw7XG4gICAgICAgICAgICBkZWxldGUgc2VydmVyLnVybDtcbiAgICAgICAgICAgIG5ld0ljZVNlcnZlcnMucHVzaChzZXJ2ZXIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdJY2VTZXJ2ZXJzLnB1c2gocGNDb25maWcuaWNlU2VydmVyc1tpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHBjQ29uZmlnLmljZVNlcnZlcnMgPSBuZXdJY2VTZXJ2ZXJzO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBPcmlnUGVlckNvbm5lY3Rpb24ocGNDb25maWcsIHBjQ29uc3RyYWludHMpO1xuICAgIH07XG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSA9IE9yaWdQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGU7XG4gICAgLy8gd3JhcCBzdGF0aWMgbWV0aG9kcy4gQ3VycmVudGx5IGp1c3QgZ2VuZXJhdGVDZXJ0aWZpY2F0ZS5cbiAgICBpZiAoJ2dlbmVyYXRlQ2VydGlmaWNhdGUnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbikge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiwgJ2dlbmVyYXRlQ2VydGlmaWNhdGUnLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIE9yaWdQZWVyQ29ubmVjdGlvbi5nZW5lcmF0ZUNlcnRpZmljYXRlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIHNoaW1UcmFja0V2ZW50VHJhbnNjZWl2ZXI6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIC8vIEFkZCBldmVudC50cmFuc2NlaXZlciBtZW1iZXIgb3ZlciBkZXByZWNhdGVkIGV2ZW50LnJlY2VpdmVyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiAmJlxuICAgICAgICAoJ3JlY2VpdmVyJyBpbiB3aW5kb3cuUlRDVHJhY2tFdmVudC5wcm90b3R5cGUpICYmXG4gICAgICAgIC8vIGNhbid0IGNoZWNrICd0cmFuc2NlaXZlcicgaW4gd2luZG93LlJUQ1RyYWNrRXZlbnQucHJvdG90eXBlLCBhcyBpdCBpc1xuICAgICAgICAvLyBkZWZpbmVkIGZvciBzb21lIHJlYXNvbiBldmVuIHdoZW4gd2luZG93LlJUQ1RyYW5zY2VpdmVyIGlzIG5vdC5cbiAgICAgICAgIXdpbmRvdy5SVENUcmFuc2NlaXZlcikge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENUcmFja0V2ZW50LnByb3RvdHlwZSwgJ3RyYW5zY2VpdmVyJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB7cmVjZWl2ZXI6IHRoaXMucmVjZWl2ZXJ9O1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG5cbiAgc2hpbUNyZWF0ZU9mZmVyTGVnYWN5OiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICB2YXIgb3JpZ0NyZWF0ZU9mZmVyID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5jcmVhdGVPZmZlcjtcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmNyZWF0ZU9mZmVyID0gZnVuY3Rpb24ob2ZmZXJPcHRpb25zKSB7XG4gICAgICB2YXIgcGMgPSB0aGlzO1xuICAgICAgaWYgKG9mZmVyT3B0aW9ucykge1xuICAgICAgICBpZiAodHlwZW9mIG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZUF1ZGlvICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIC8vIHN1cHBvcnQgYml0IHZhbHVlc1xuICAgICAgICAgIG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZUF1ZGlvID0gISFvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbztcbiAgICAgICAgfVxuICAgICAgICB2YXIgYXVkaW9UcmFuc2NlaXZlciA9IHBjLmdldFRyYW5zY2VpdmVycygpLmZpbmQoZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcbiAgICAgICAgICByZXR1cm4gdHJhbnNjZWl2ZXIuc2VuZGVyLnRyYWNrICYmXG4gICAgICAgICAgICAgIHRyYW5zY2VpdmVyLnNlbmRlci50cmFjay5raW5kID09PSAnYXVkaW8nO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZUF1ZGlvID09PSBmYWxzZSAmJiBhdWRpb1RyYW5zY2VpdmVyKSB7XG4gICAgICAgICAgaWYgKGF1ZGlvVHJhbnNjZWl2ZXIuZGlyZWN0aW9uID09PSAnc2VuZHJlY3YnKSB7XG4gICAgICAgICAgICBpZiAoYXVkaW9UcmFuc2NlaXZlci5zZXREaXJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgYXVkaW9UcmFuc2NlaXZlci5zZXREaXJlY3Rpb24oJ3NlbmRvbmx5Jyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBhdWRpb1RyYW5zY2VpdmVyLmRpcmVjdGlvbiA9ICdzZW5kb25seSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChhdWRpb1RyYW5zY2VpdmVyLmRpcmVjdGlvbiA9PT0gJ3JlY3Zvbmx5Jykge1xuICAgICAgICAgICAgaWYgKGF1ZGlvVHJhbnNjZWl2ZXIuc2V0RGlyZWN0aW9uKSB7XG4gICAgICAgICAgICAgIGF1ZGlvVHJhbnNjZWl2ZXIuc2V0RGlyZWN0aW9uKCdpbmFjdGl2ZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgYXVkaW9UcmFuc2NlaXZlci5kaXJlY3Rpb24gPSAnaW5hY3RpdmUnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbyA9PT0gdHJ1ZSAmJlxuICAgICAgICAgICAgIWF1ZGlvVHJhbnNjZWl2ZXIpIHtcbiAgICAgICAgICBwYy5hZGRUcmFuc2NlaXZlcignYXVkaW8nKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKHR5cGVvZiBvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAvLyBzdXBwb3J0IGJpdCB2YWx1ZXNcbiAgICAgICAgICBvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVWaWRlbyA9ICEhb2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlVmlkZW87XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHZpZGVvVHJhbnNjZWl2ZXIgPSBwYy5nZXRUcmFuc2NlaXZlcnMoKS5maW5kKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XG4gICAgICAgICAgcmV0dXJuIHRyYW5zY2VpdmVyLnNlbmRlci50cmFjayAmJlxuICAgICAgICAgICAgICB0cmFuc2NlaXZlci5zZW5kZXIudHJhY2sua2luZCA9PT0gJ3ZpZGVvJztcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVWaWRlbyA9PT0gZmFsc2UgJiYgdmlkZW9UcmFuc2NlaXZlcikge1xuICAgICAgICAgIGlmICh2aWRlb1RyYW5zY2VpdmVyLmRpcmVjdGlvbiA9PT0gJ3NlbmRyZWN2Jykge1xuICAgICAgICAgICAgdmlkZW9UcmFuc2NlaXZlci5zZXREaXJlY3Rpb24oJ3NlbmRvbmx5Jyk7XG4gICAgICAgICAgfSBlbHNlIGlmICh2aWRlb1RyYW5zY2VpdmVyLmRpcmVjdGlvbiA9PT0gJ3JlY3Zvbmx5Jykge1xuICAgICAgICAgICAgdmlkZW9UcmFuc2NlaXZlci5zZXREaXJlY3Rpb24oJ2luYWN0aXZlJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvID09PSB0cnVlICYmXG4gICAgICAgICAgICAhdmlkZW9UcmFuc2NlaXZlcikge1xuICAgICAgICAgIHBjLmFkZFRyYW5zY2VpdmVyKCd2aWRlbycpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gb3JpZ0NyZWF0ZU9mZmVyLmFwcGx5KHBjLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH1cbn07XG5cbn0se1wiLi4vdXRpbHNcIjoxM31dLDEzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8qXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXG4gKiAgdHJlZS5cbiAqL1xuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgbG9nRGlzYWJsZWRfID0gdHJ1ZTtcbnZhciBkZXByZWNhdGlvbldhcm5pbmdzXyA9IHRydWU7XG5cbi8qKlxuICogRXh0cmFjdCBicm93c2VyIHZlcnNpb24gb3V0IG9mIHRoZSBwcm92aWRlZCB1c2VyIGFnZW50IHN0cmluZy5cbiAqXG4gKiBAcGFyYW0geyFzdHJpbmd9IHVhc3RyaW5nIHVzZXJBZ2VudCBzdHJpbmcuXG4gKiBAcGFyYW0geyFzdHJpbmd9IGV4cHIgUmVndWxhciBleHByZXNzaW9uIHVzZWQgYXMgbWF0Y2ggY3JpdGVyaWEuXG4gKiBAcGFyYW0geyFudW1iZXJ9IHBvcyBwb3NpdGlvbiBpbiB0aGUgdmVyc2lvbiBzdHJpbmcgdG8gYmUgcmV0dXJuZWQuXG4gKiBAcmV0dXJuIHshbnVtYmVyfSBicm93c2VyIHZlcnNpb24uXG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3RWZXJzaW9uKHVhc3RyaW5nLCBleHByLCBwb3MpIHtcbiAgdmFyIG1hdGNoID0gdWFzdHJpbmcubWF0Y2goZXhwcik7XG4gIHJldHVybiBtYXRjaCAmJiBtYXRjaC5sZW5ndGggPj0gcG9zICYmIHBhcnNlSW50KG1hdGNoW3Bvc10sIDEwKTtcbn1cblxuLy8gV3JhcHMgdGhlIHBlZXJjb25uZWN0aW9uIGV2ZW50IGV2ZW50TmFtZVRvV3JhcCBpbiBhIGZ1bmN0aW9uXG4vLyB3aGljaCByZXR1cm5zIHRoZSBtb2RpZmllZCBldmVudCBvYmplY3QuXG5mdW5jdGlvbiB3cmFwUGVlckNvbm5lY3Rpb25FdmVudCh3aW5kb3csIGV2ZW50TmFtZVRvV3JhcCwgd3JhcHBlcikge1xuICBpZiAoIXdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbikge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgcHJvdG8gPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlO1xuICB2YXIgbmF0aXZlQWRkRXZlbnRMaXN0ZW5lciA9IHByb3RvLmFkZEV2ZW50TGlzdGVuZXI7XG4gIHByb3RvLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihuYXRpdmVFdmVudE5hbWUsIGNiKSB7XG4gICAgaWYgKG5hdGl2ZUV2ZW50TmFtZSAhPT0gZXZlbnROYW1lVG9XcmFwKSB7XG4gICAgICByZXR1cm4gbmF0aXZlQWRkRXZlbnRMaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgICB2YXIgd3JhcHBlZENhbGxiYWNrID0gZnVuY3Rpb24oZSkge1xuICAgICAgY2Iod3JhcHBlcihlKSk7XG4gICAgfTtcbiAgICB0aGlzLl9ldmVudE1hcCA9IHRoaXMuX2V2ZW50TWFwIHx8IHt9O1xuICAgIHRoaXMuX2V2ZW50TWFwW2NiXSA9IHdyYXBwZWRDYWxsYmFjaztcbiAgICByZXR1cm4gbmF0aXZlQWRkRXZlbnRMaXN0ZW5lci5hcHBseSh0aGlzLCBbbmF0aXZlRXZlbnROYW1lLFxuICAgICAgd3JhcHBlZENhbGxiYWNrXSk7XG4gIH07XG5cbiAgdmFyIG5hdGl2ZVJlbW92ZUV2ZW50TGlzdGVuZXIgPSBwcm90by5yZW1vdmVFdmVudExpc3RlbmVyO1xuICBwcm90by5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24obmF0aXZlRXZlbnROYW1lLCBjYikge1xuICAgIGlmIChuYXRpdmVFdmVudE5hbWUgIT09IGV2ZW50TmFtZVRvV3JhcCB8fCAhdGhpcy5fZXZlbnRNYXBcbiAgICAgICAgfHwgIXRoaXMuX2V2ZW50TWFwW2NiXSkge1xuICAgICAgcmV0dXJuIG5hdGl2ZVJlbW92ZUV2ZW50TGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gICAgdmFyIHVud3JhcHBlZENiID0gdGhpcy5fZXZlbnRNYXBbY2JdO1xuICAgIGRlbGV0ZSB0aGlzLl9ldmVudE1hcFtjYl07XG4gICAgcmV0dXJuIG5hdGl2ZVJlbW92ZUV2ZW50TGlzdGVuZXIuYXBwbHkodGhpcywgW25hdGl2ZUV2ZW50TmFtZSxcbiAgICAgIHVud3JhcHBlZENiXSk7XG4gIH07XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCAnb24nICsgZXZlbnROYW1lVG9XcmFwLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzWydfb24nICsgZXZlbnROYW1lVG9XcmFwXTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24oY2IpIHtcbiAgICAgIGlmICh0aGlzWydfb24nICsgZXZlbnROYW1lVG9XcmFwXSkge1xuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lVG9XcmFwLFxuICAgICAgICAgICAgdGhpc1snX29uJyArIGV2ZW50TmFtZVRvV3JhcF0pO1xuICAgICAgICBkZWxldGUgdGhpc1snX29uJyArIGV2ZW50TmFtZVRvV3JhcF07XG4gICAgICB9XG4gICAgICBpZiAoY2IpIHtcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZVRvV3JhcCxcbiAgICAgICAgICAgIHRoaXNbJ19vbicgKyBldmVudE5hbWVUb1dyYXBdID0gY2IpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5cbi8vIFV0aWxpdHkgbWV0aG9kcy5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBleHRyYWN0VmVyc2lvbjogZXh0cmFjdFZlcnNpb24sXG4gIHdyYXBQZWVyQ29ubmVjdGlvbkV2ZW50OiB3cmFwUGVlckNvbm5lY3Rpb25FdmVudCxcbiAgZGlzYWJsZUxvZzogZnVuY3Rpb24oYm9vbCkge1xuICAgIGlmICh0eXBlb2YgYm9vbCAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICByZXR1cm4gbmV3IEVycm9yKCdBcmd1bWVudCB0eXBlOiAnICsgdHlwZW9mIGJvb2wgK1xuICAgICAgICAgICcuIFBsZWFzZSB1c2UgYSBib29sZWFuLicpO1xuICAgIH1cbiAgICBsb2dEaXNhYmxlZF8gPSBib29sO1xuICAgIHJldHVybiAoYm9vbCkgPyAnYWRhcHRlci5qcyBsb2dnaW5nIGRpc2FibGVkJyA6XG4gICAgICAgICdhZGFwdGVyLmpzIGxvZ2dpbmcgZW5hYmxlZCc7XG4gIH0sXG5cbiAgLyoqXG4gICAqIERpc2FibGUgb3IgZW5hYmxlIGRlcHJlY2F0aW9uIHdhcm5pbmdzXG4gICAqIEBwYXJhbSB7IWJvb2xlYW59IGJvb2wgc2V0IHRvIHRydWUgdG8gZGlzYWJsZSB3YXJuaW5ncy5cbiAgICovXG4gIGRpc2FibGVXYXJuaW5nczogZnVuY3Rpb24oYm9vbCkge1xuICAgIGlmICh0eXBlb2YgYm9vbCAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICByZXR1cm4gbmV3IEVycm9yKCdBcmd1bWVudCB0eXBlOiAnICsgdHlwZW9mIGJvb2wgK1xuICAgICAgICAgICcuIFBsZWFzZSB1c2UgYSBib29sZWFuLicpO1xuICAgIH1cbiAgICBkZXByZWNhdGlvbldhcm5pbmdzXyA9ICFib29sO1xuICAgIHJldHVybiAnYWRhcHRlci5qcyBkZXByZWNhdGlvbiB3YXJuaW5ncyAnICsgKGJvb2wgPyAnZGlzYWJsZWQnIDogJ2VuYWJsZWQnKTtcbiAgfSxcblxuICBsb2c6IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKGxvZ0Rpc2FibGVkXykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBjb25zb2xlLmxvZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogU2hvd3MgYSBkZXByZWNhdGlvbiB3YXJuaW5nIHN1Z2dlc3RpbmcgdGhlIG1vZGVybiBhbmQgc3BlYy1jb21wYXRpYmxlIEFQSS5cbiAgICovXG4gIGRlcHJlY2F0ZWQ6IGZ1bmN0aW9uKG9sZE1ldGhvZCwgbmV3TWV0aG9kKSB7XG4gICAgaWYgKCFkZXByZWNhdGlvbldhcm5pbmdzXykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zb2xlLndhcm4ob2xkTWV0aG9kICsgJyBpcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlICcgKyBuZXdNZXRob2QgK1xuICAgICAgICAnIGluc3RlYWQuJyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEJyb3dzZXIgZGV0ZWN0b3IuXG4gICAqXG4gICAqIEByZXR1cm4ge29iamVjdH0gcmVzdWx0IGNvbnRhaW5pbmcgYnJvd3NlciBhbmQgdmVyc2lvblxuICAgKiAgICAgcHJvcGVydGllcy5cbiAgICovXG4gIGRldGVjdEJyb3dzZXI6IGZ1bmN0aW9uKHdpbmRvdykge1xuICAgIHZhciBuYXZpZ2F0b3IgPSB3aW5kb3cgJiYgd2luZG93Lm5hdmlnYXRvcjtcblxuICAgIC8vIFJldHVybmVkIHJlc3VsdCBvYmplY3QuXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIHJlc3VsdC5icm93c2VyID0gbnVsbDtcbiAgICByZXN1bHQudmVyc2lvbiA9IG51bGw7XG5cbiAgICAvLyBGYWlsIGVhcmx5IGlmIGl0J3Mgbm90IGEgYnJvd3NlclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyB8fCAhd2luZG93Lm5hdmlnYXRvcikge1xuICAgICAgcmVzdWx0LmJyb3dzZXIgPSAnTm90IGEgYnJvd3Nlci4nO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBpZiAobmF2aWdhdG9yLm1vekdldFVzZXJNZWRpYSkgeyAvLyBGaXJlZm94LlxuICAgICAgcmVzdWx0LmJyb3dzZXIgPSAnZmlyZWZveCc7XG4gICAgICByZXN1bHQudmVyc2lvbiA9IGV4dHJhY3RWZXJzaW9uKG5hdmlnYXRvci51c2VyQWdlbnQsXG4gICAgICAgICAgL0ZpcmVmb3hcXC8oXFxkKylcXC4vLCAxKTtcbiAgICB9IGVsc2UgaWYgKG5hdmlnYXRvci53ZWJraXRHZXRVc2VyTWVkaWEpIHtcbiAgICAgIC8vIENocm9tZSwgQ2hyb21pdW0sIFdlYnZpZXcsIE9wZXJhLlxuICAgICAgLy8gVmVyc2lvbiBtYXRjaGVzIENocm9tZS9XZWJSVEMgdmVyc2lvbi5cbiAgICAgIHJlc3VsdC5icm93c2VyID0gJ2Nocm9tZSc7XG4gICAgICByZXN1bHQudmVyc2lvbiA9IGV4dHJhY3RWZXJzaW9uKG5hdmlnYXRvci51c2VyQWdlbnQsXG4gICAgICAgICAgL0Nocm9tKGV8aXVtKVxcLyhcXGQrKVxcLi8sIDIpO1xuICAgIH0gZWxzZSBpZiAobmF2aWdhdG9yLm1lZGlhRGV2aWNlcyAmJlxuICAgICAgICBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9FZGdlXFwvKFxcZCspLihcXGQrKSQvKSkgeyAvLyBFZGdlLlxuICAgICAgcmVzdWx0LmJyb3dzZXIgPSAnZWRnZSc7XG4gICAgICByZXN1bHQudmVyc2lvbiA9IGV4dHJhY3RWZXJzaW9uKG5hdmlnYXRvci51c2VyQWdlbnQsXG4gICAgICAgICAgL0VkZ2VcXC8oXFxkKykuKFxcZCspJC8sIDIpO1xuICAgIH0gZWxzZSBpZiAod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uICYmXG4gICAgICAgIG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0FwcGxlV2ViS2l0XFwvKFxcZCspXFwuLykpIHsgLy8gU2FmYXJpLlxuICAgICAgcmVzdWx0LmJyb3dzZXIgPSAnc2FmYXJpJztcbiAgICAgIHJlc3VsdC52ZXJzaW9uID0gZXh0cmFjdFZlcnNpb24obmF2aWdhdG9yLnVzZXJBZ2VudCxcbiAgICAgICAgICAvQXBwbGVXZWJLaXRcXC8oXFxkKylcXC4vLCAxKTtcbiAgICB9IGVsc2UgeyAvLyBEZWZhdWx0IGZhbGx0aHJvdWdoOiBub3Qgc3VwcG9ydGVkLlxuICAgICAgcmVzdWx0LmJyb3dzZXIgPSAnTm90IGEgc3VwcG9ydGVkIGJyb3dzZXIuJztcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufTtcblxufSx7fV19LHt9LFszXSkoMylcbn0pOyJdLCJzb3VyY2VSb290IjoiIn0=