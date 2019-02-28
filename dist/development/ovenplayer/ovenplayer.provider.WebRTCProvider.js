/*! OvenPlayerv0.8.41 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
            webrtcLoader = (0, _WebRTCLoader2["default"])(that, source.file, _utils.errorTrigger);
            webrtcLoader.connect().then(function (stream) {
                element.srcObject = stream;
                that.play();
            })["catch"](function (error) {
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

var WebRTCLoader = function WebRTCLoader(provider, url, errorTrigger) {
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
                var tempError = _constants.ERRORS[_constants.PLAYER_WEBRTC_SET_LOCAL_DESC_ERROR];
                tempError.error = error;
                closePeer(tempError);
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
                        var tempError = _constants.ERRORS[_constants.PLAYER_WEBRTC_WS_ERROR];
                        tempError.error = message.error;
                        closePeer(tempError);
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
                            })["catch"](function (error) {
                                var tempError = _constants.ERRORS[_constants.PLAYER_WEBRTC_CREATE_ANSWER_ERROR];
                                tempError.error = error;
                                closePeer(tempError);
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
                                        stats.forEach(function (state) {
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
                                    var tempError = _constants.ERRORS[_constants.PLAYER_WEBRTC_CREATE_ANSWER_ERROR];
                                    tempError.error = error;
                                    closePeer(tempError);
                                });
                            }
                        })["catch"](function (error) {
                            var tempError = _constants.ERRORS[_constants.PLAYER_WEBRTC_SET_REMOTE_DESC_ERROR];
                            tempError.error = error;
                            closePeer(tempError);
                        });
                    }

                    if (message.candidates) {
                        // This receives ICE Candidate from server.
                        for (var i = 0; i < message.candidates.length; i++) {
                            if (message.candidates[i] && message.candidates[i].candidate) {

                                peerConnection.addIceCandidate(new RTCIceCandidate(message.candidates[i])).then(function () {
                                    OvenPlayerConsole.log("addIceCandidate : success");
                                })["catch"](function (error) {
                                    var tempError = _constants.ERRORS[_constants.PLAYER_WEBRTC_ADD_ICECANDIDATE_ERROR];
                                    tempError.error = error;
                                    closePeer(tempError);
                                });
                            }
                        }
                    }
                };
                ws.onerror = function (error) {
                    var tempError = _constants.ERRORS[_constants.PLAYER_WEBRTC_WS_ERROR];
                    tempError.error = error;
                    closePeer(tempError);
                    reject(error);
                };
            } catch (error) {
                closePeer(error);
            }
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
            if (ws.readyState == 1) {
                ws.send(JSON.stringify({ command: "stop" }));
                ws.close();
            }
            ws = null;
        }
        if (peerConnection) {
            OvenPlayerConsole.log('Closing peer connection...');
            if (statisticsTimer) {
                clearTimeout(statisticsTimer);
            }
            peerConnection.close();
            peerConnection = null;
        }
        if (error) {
            errorTrigger(error, provider);
        }
    }

    that.connect = function () {
        return initialize();
    };
    that.destroy = function () {
        peerConnection.log("WEBRTC LOADER destroy");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9XZWJSVEMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvV2ViUlRDTG9hZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9hZGFwdGVyLmpzIl0sIm5hbWVzIjpbIldlYlJUQyIsImNvbnRhaW5lciIsInBsYXllckNvbmZpZyIsInRoYXQiLCJ3ZWJydGNMb2FkZXIiLCJzdXBlckRlc3Ryb3lfZnVuYyIsIm1lZGlhTWFuYWdlciIsIlBST1ZJREVSX1dFQlJUQyIsImVsZW1lbnQiLCJjcmVhdGUiLCJzcGVjIiwibmFtZSIsImV4dGVuZGVkRWxlbWVudCIsImxpc3RlbmVyIiwiY2FuU2VlayIsImlzTGl2ZSIsInNlZWtpbmciLCJzdGF0ZSIsIlNUQVRFX0lETEUiLCJidWZmZXIiLCJmcmFtZXJhdGUiLCJjdXJyZW50UXVhbGl0eSIsImN1cnJlbnRTb3VyY2UiLCJxdWFsaXR5TGV2ZWxzIiwic291cmNlcyIsInNvdXJjZSIsImZpbGUiLCJ0eXBlIiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJkZXN0cm95IiwiZXJyb3JUcmlnZ2VyIiwiY29ubmVjdCIsInRoZW4iLCJzdHJlYW0iLCJzcmNPYmplY3QiLCJwbGF5IiwiZXJyb3IiLCJXZWJSVENMb2FkZXIiLCJwcm92aWRlciIsInVybCIsIndzIiwicGVlckNvbm5lY3Rpb24iLCJzdGF0aXN0aWNzVGltZXIiLCJjb25maWciLCJteVNkcCIsImV4aXN0aW5nSGFuZGxlciIsIndpbmRvdyIsIm9uYmVmb3JldW5sb2FkIiwiZXZlbnQiLCJjbG9zZVBlZXIiLCJpbml0aWFsaXplIiwib25Mb2NhbERlc2NyaXB0aW9uIiwiaWQiLCJjb25uZWN0aW9uIiwiZGVzYyIsInNldExvY2FsRGVzY3JpcHRpb24iLCJsb2NhbFNEUCIsImxvY2FsRGVzY3JpcHRpb24iLCJzZW5kIiwiSlNPTiIsInN0cmluZ2lmeSIsImNvbW1hbmQiLCJzZHAiLCJ0ZW1wRXJyb3IiLCJFUlJPUlMiLCJQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJXZWJTb2NrZXQiLCJvbm9wZW4iLCJvbm1lc3NhZ2UiLCJlIiwibWVzc2FnZSIsInBhcnNlIiwiZGF0YSIsIlBMQVlFUl9XRUJSVENfV1NfRVJST1IiLCJsaXN0IiwiUlRDUGVlckNvbm5lY3Rpb24iLCJvbmljZWNhbmRpZGF0ZSIsImNhbmRpZGF0ZSIsImNhbmRpZGF0ZXMiLCJvbm5lZ290aWF0aW9ubmVlZGVkIiwiY3JlYXRlT2ZmZXIiLCJQTEFZRVJfV0VCUlRDX0NSRUFURV9BTlNXRVJfRVJST1IiLCJvbmFkZHN0cmVhbSIsImxvc3RQYWNrZXRzQXJyIiwic2xvdExlbmd0aCIsInByZXZQYWNrZXRzTG9zdCIsImF2ZzhMb3NzZXMiLCJhdmdNb3JlVGhhblRocmVzaG9sZENvdW50IiwidGhyZXNob2xkIiwiZXh0cmFjdExvc3NQYWNrZXRzT25OZXR3b3JrU3RhdHVzIiwic2V0VGltZW91dCIsImdldFN0YXRzIiwic3RhdHMiLCJmb3JFYWNoIiwiaXNSZW1vdGUiLCJwdXNoIiwicGFyc2VJbnQiLCJwYWNrZXRzTG9zdCIsImxlbmd0aCIsInNsaWNlIiwiXyIsInJlZHVjZSIsIm1lbW8iLCJudW0iLCJjbGVhclRpbWVvdXQiLCJ0cmlnZ2VyIiwiTkVUV09SS19VTlNUQUJMRUQiLCJzZXRSZW1vdGVEZXNjcmlwdGlvbiIsIlJUQ1Nlc3Npb25EZXNjcmlwdGlvbiIsInJlbW90ZURlc2NyaXB0aW9uIiwiY3JlYXRlQW5zd2VyIiwiUExBWUVSX1dFQlJUQ19TRVRfUkVNT1RFX0RFU0NfRVJST1IiLCJpIiwiYWRkSWNlQ2FuZGlkYXRlIiwiUlRDSWNlQ2FuZGlkYXRlIiwiUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SIiwib25lcnJvciIsInJlYWR5U3RhdGUiLCJjbG9zZSIsImYiLCJleHBvcnRzIiwibW9kdWxlIiwiZGVmaW5lIiwidCIsIm4iLCJyIiwicyIsIm8iLCJ1IiwiYSIsInJlcXVpcmUiLCJFcnJvciIsImNvZGUiLCJsIiwiY2FsbCIsIlNEUFV0aWxzIiwid3JpdGVNZWRpYVNlY3Rpb24iLCJ0cmFuc2NlaXZlciIsImNhcHMiLCJkdGxzUm9sZSIsIndyaXRlUnRwRGVzY3JpcHRpb24iLCJraW5kIiwid3JpdGVJY2VQYXJhbWV0ZXJzIiwiaWNlR2F0aGVyZXIiLCJnZXRMb2NhbFBhcmFtZXRlcnMiLCJ3cml0ZUR0bHNQYXJhbWV0ZXJzIiwiZHRsc1RyYW5zcG9ydCIsIm1pZCIsInJ0cFNlbmRlciIsInJ0cFJlY2VpdmVyIiwidHJhY2tJZCIsIl9pbml0aWFsVHJhY2tJZCIsInRyYWNrIiwibXNpZCIsInNlbmRFbmNvZGluZ1BhcmFtZXRlcnMiLCJzc3JjIiwicnR4IiwibG9jYWxDTmFtZSIsImZpbHRlckljZVNlcnZlcnMiLCJpY2VTZXJ2ZXJzIiwiZWRnZVZlcnNpb24iLCJoYXNUdXJuIiwiZmlsdGVyIiwic2VydmVyIiwidXJscyIsImNvbnNvbGUiLCJ3YXJuIiwiaXNTdHJpbmciLCJ2YWxpZFR1cm4iLCJpbmRleE9mIiwiZ2V0Q29tbW9uQ2FwYWJpbGl0aWVzIiwibG9jYWxDYXBhYmlsaXRpZXMiLCJyZW1vdGVDYXBhYmlsaXRpZXMiLCJjb21tb25DYXBhYmlsaXRpZXMiLCJjb2RlY3MiLCJoZWFkZXJFeHRlbnNpb25zIiwiZmVjTWVjaGFuaXNtcyIsImZpbmRDb2RlY0J5UGF5bG9hZFR5cGUiLCJwdCIsInBheWxvYWRUeXBlIiwicHJlZmVycmVkUGF5bG9hZFR5cGUiLCJydHhDYXBhYmlsaXR5TWF0Y2hlcyIsImxSdHgiLCJyUnR4IiwibENvZGVjcyIsInJDb2RlY3MiLCJsQ29kZWMiLCJwYXJhbWV0ZXJzIiwiYXB0IiwickNvZGVjIiwidG9Mb3dlckNhc2UiLCJjbG9ja1JhdGUiLCJudW1DaGFubmVscyIsIk1hdGgiLCJtaW4iLCJydGNwRmVlZGJhY2siLCJmYiIsImoiLCJwYXJhbWV0ZXIiLCJsSGVhZGVyRXh0ZW5zaW9uIiwickhlYWRlckV4dGVuc2lvbiIsInVyaSIsImlzQWN0aW9uQWxsb3dlZEluU2lnbmFsaW5nU3RhdGUiLCJhY3Rpb24iLCJzaWduYWxpbmdTdGF0ZSIsIm9mZmVyIiwiYW5zd2VyIiwibWF5YmVBZGRDYW5kaWRhdGUiLCJpY2VUcmFuc3BvcnQiLCJhbHJlYWR5QWRkZWQiLCJnZXRSZW1vdGVDYW5kaWRhdGVzIiwiZmluZCIsInJlbW90ZUNhbmRpZGF0ZSIsImZvdW5kYXRpb24iLCJpcCIsInBvcnQiLCJwcmlvcml0eSIsInByb3RvY29sIiwiYWRkUmVtb3RlQ2FuZGlkYXRlIiwibWFrZUVycm9yIiwiZGVzY3JpcHRpb24iLCJOb3RTdXBwb3J0ZWRFcnJvciIsIkludmFsaWRTdGF0ZUVycm9yIiwiSW52YWxpZEFjY2Vzc0Vycm9yIiwiVHlwZUVycm9yIiwidW5kZWZpbmVkIiwiT3BlcmF0aW9uRXJyb3IiLCJhZGRUcmFja1RvU3RyZWFtQW5kRmlyZUV2ZW50IiwiYWRkVHJhY2siLCJkaXNwYXRjaEV2ZW50IiwiTWVkaWFTdHJlYW1UcmFja0V2ZW50IiwicmVtb3ZlVHJhY2tGcm9tU3RyZWFtQW5kRmlyZUV2ZW50IiwicmVtb3ZlVHJhY2siLCJmaXJlQWRkVHJhY2siLCJwYyIsInJlY2VpdmVyIiwic3RyZWFtcyIsInRyYWNrRXZlbnQiLCJFdmVudCIsIl9kaXNwYXRjaEV2ZW50IiwiX2V2ZW50VGFyZ2V0IiwiZG9jdW1lbnQiLCJjcmVhdGVEb2N1bWVudEZyYWdtZW50IiwibWV0aG9kIiwiYmluZCIsImNhblRyaWNrbGVJY2VDYW5kaWRhdGVzIiwibmVlZE5lZ290aWF0aW9uIiwibG9jYWxTdHJlYW1zIiwicmVtb3RlU3RyZWFtcyIsImljZUNvbm5lY3Rpb25TdGF0ZSIsImNvbm5lY3Rpb25TdGF0ZSIsImljZUdhdGhlcmluZ1N0YXRlIiwidXNpbmdCdW5kbGUiLCJidW5kbGVQb2xpY3kiLCJydGNwTXV4UG9saWN5IiwiaWNlVHJhbnNwb3J0UG9saWN5IiwiX2ljZUdhdGhlcmVycyIsImljZUNhbmRpZGF0ZVBvb2xTaXplIiwiUlRDSWNlR2F0aGVyZXIiLCJnYXRoZXJQb2xpY3kiLCJfY29uZmlnIiwidHJhbnNjZWl2ZXJzIiwiX3NkcFNlc3Npb25JZCIsImdlbmVyYXRlU2Vzc2lvbklkIiwiX3NkcFNlc3Npb25WZXJzaW9uIiwiX2R0bHNSb2xlIiwiX2lzQ2xvc2VkIiwicHJvdG90eXBlIiwib250cmFjayIsIm9ucmVtb3Zlc3RyZWFtIiwib25zaWduYWxpbmdzdGF0ZWNoYW5nZSIsIm9uaWNlY29ubmVjdGlvbnN0YXRlY2hhbmdlIiwib25jb25uZWN0aW9uc3RhdGVjaGFuZ2UiLCJvbmljZWdhdGhlcmluZ3N0YXRlY2hhbmdlIiwib25kYXRhY2hhbm5lbCIsIl9lbWl0R2F0aGVyaW5nU3RhdGVDaGFuZ2UiLCJnZXRDb25maWd1cmF0aW9uIiwiZ2V0TG9jYWxTdHJlYW1zIiwiZ2V0UmVtb3RlU3RyZWFtcyIsIl9jcmVhdGVUcmFuc2NlaXZlciIsImRvTm90QWRkIiwiaGFzQnVuZGxlVHJhbnNwb3J0IiwicmVjdkVuY29kaW5nUGFyYW1ldGVycyIsImFzc29jaWF0ZWRSZW1vdGVNZWRpYVN0cmVhbXMiLCJ3YW50UmVjZWl2ZSIsInRyYW5zcG9ydHMiLCJfY3JlYXRlSWNlQW5kRHRsc1RyYW5zcG9ydHMiLCJhbHJlYWR5RXhpc3RzIiwiX21heWJlRmlyZU5lZ290aWF0aW9uTmVlZGVkIiwiUlRDUnRwU2VuZGVyIiwiYWRkU3RyZWFtIiwiZ2V0VHJhY2tzIiwiY2xvbmVkU3RyZWFtIiwiY2xvbmUiLCJpZHgiLCJjbG9uZWRUcmFjayIsImFkZEV2ZW50TGlzdGVuZXIiLCJlbmFibGVkIiwic2VuZGVyIiwic3RvcCIsIm1hcCIsInNwbGljZSIsInJlbW92ZVN0cmVhbSIsImdldFNlbmRlcnMiLCJnZXRSZWNlaXZlcnMiLCJfY3JlYXRlSWNlR2F0aGVyZXIiLCJzZHBNTGluZUluZGV4Iiwic2hpZnQiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsInZhbHVlIiwid3JpdGFibGUiLCJidWZmZXJlZENhbmRpZGF0ZUV2ZW50cyIsImJ1ZmZlckNhbmRpZGF0ZXMiLCJlbmQiLCJrZXlzIiwiX2dhdGhlciIsIm9ubG9jYWxjYW5kaWRhdGUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZXZ0Iiwic2RwTWlkIiwiY2FuZCIsImNvbXBvbmVudCIsInVmcmFnIiwidXNlcm5hbWVGcmFnbWVudCIsInNlcmlhbGl6ZWRDYW5kaWRhdGUiLCJ3cml0ZUNhbmRpZGF0ZSIsInBhcnNlQ2FuZGlkYXRlIiwidG9KU09OIiwic2VjdGlvbnMiLCJnZXRNZWRpYVNlY3Rpb25zIiwiZ2V0RGVzY3JpcHRpb24iLCJqb2luIiwiY29tcGxldGUiLCJldmVyeSIsIlJUQ0ljZVRyYW5zcG9ydCIsIm9uaWNlc3RhdGVjaGFuZ2UiLCJfdXBkYXRlSWNlQ29ubmVjdGlvblN0YXRlIiwiX3VwZGF0ZUNvbm5lY3Rpb25TdGF0ZSIsIlJUQ0R0bHNUcmFuc3BvcnQiLCJvbmR0bHNzdGF0ZWNoYW5nZSIsIl9kaXNwb3NlSWNlQW5kRHRsc1RyYW5zcG9ydHMiLCJfdHJhbnNjZWl2ZSIsInJlY3YiLCJwYXJhbXMiLCJlbmNvZGluZ3MiLCJydGNwIiwiY25hbWUiLCJjb21wb3VuZCIsInJ0Y3BQYXJhbWV0ZXJzIiwicCIsInJlY2VpdmUiLCJzZXNzaW9ucGFydCIsInNwbGl0U2VjdGlvbnMiLCJtZWRpYVNlY3Rpb24iLCJwYXJzZVJ0cFBhcmFtZXRlcnMiLCJpc0ljZUxpdGUiLCJtYXRjaFByZWZpeCIsInJlamVjdGVkIiwiaXNSZWplY3RlZCIsInJlbW90ZUljZVBhcmFtZXRlcnMiLCJnZXRJY2VQYXJhbWV0ZXJzIiwicmVtb3RlRHRsc1BhcmFtZXRlcnMiLCJnZXREdGxzUGFyYW1ldGVycyIsInJvbGUiLCJzdGFydCIsIl91cGRhdGVTaWduYWxpbmdTdGF0ZSIsInJlY2VpdmVyTGlzdCIsImljZU9wdGlvbnMiLCJzdWJzdHIiLCJzcGxpdCIsImxpbmVzIiwic3BsaXRMaW5lcyIsImdldEtpbmQiLCJkaXJlY3Rpb24iLCJnZXREaXJlY3Rpb24iLCJyZW1vdGVNc2lkIiwicGFyc2VNc2lkIiwiZ2V0TWlkIiwiZ2VuZXJhdGVJZGVudGlmaWVyIiwicGFyc2VSdHBFbmNvZGluZ1BhcmFtZXRlcnMiLCJwYXJzZVJ0Y3BQYXJhbWV0ZXJzIiwiaXNDb21wbGV0ZSIsImNhbmRzIiwic2V0VHJhbnNwb3J0Iiwic2V0UmVtb3RlQ2FuZGlkYXRlcyIsIlJUQ1J0cFJlY2VpdmVyIiwiZ2V0Q2FwYWJpbGl0aWVzIiwiY29kZWMiLCJpc05ld1RyYWNrIiwiTWVkaWFTdHJlYW0iLCJnZXQiLCJuYXRpdmVUcmFjayIsInNpZCIsIml0ZW0iLCJuZXdTdGF0ZSIsInN0YXRlcyIsImNsb3NlZCIsImNoZWNraW5nIiwiY29ubmVjdGVkIiwiY29tcGxldGVkIiwiZGlzY29ubmVjdGVkIiwiZmFpbGVkIiwiY29ubmVjdGluZyIsIm51bUF1ZGlvVHJhY2tzIiwibnVtVmlkZW9UcmFja3MiLCJvZmZlck9wdGlvbnMiLCJhcmd1bWVudHMiLCJtYW5kYXRvcnkiLCJvcHRpb25hbCIsIm9mZmVyVG9SZWNlaXZlQXVkaW8iLCJvZmZlclRvUmVjZWl2ZVZpZGVvIiwid3JpdGVTZXNzaW9uQm9pbGVycGxhdGUiLCJyZW1vdGVDb2RlYyIsImhkckV4dCIsInJlbW90ZUV4dGVuc2lvbnMiLCJySGRyRXh0IiwiZ2V0TG9jYWxDYW5kaWRhdGVzIiwibWVkaWFTZWN0aW9uc0luT2ZmZXIiLCJsb2NhbFRyYWNrIiwiZ2V0QXVkaW9UcmFja3MiLCJnZXRWaWRlb1RyYWNrcyIsImhhc1J0eCIsImMiLCJyZWR1Y2VkU2l6ZSIsImNhbmRpZGF0ZVN0cmluZyIsInRyaW0iLCJwcm9taXNlcyIsImZpeFN0YXRzVHlwZSIsInN0YXQiLCJpbmJvdW5kcnRwIiwib3V0Ym91bmRydHAiLCJjYW5kaWRhdGVwYWlyIiwibG9jYWxjYW5kaWRhdGUiLCJyZW1vdGVjYW5kaWRhdGUiLCJyZXN1bHRzIiwiTWFwIiwiYWxsIiwicmVzIiwicmVzdWx0Iiwic2V0IiwibWV0aG9kcyIsIm5hdGl2ZU1ldGhvZCIsImFyZ3MiLCJhcHBseSIsInJhbmRvbSIsInRvU3RyaW5nIiwiYmxvYiIsImxpbmUiLCJwYXJ0cyIsInBhcnQiLCJpbmRleCIsInByZWZpeCIsInN1YnN0cmluZyIsInJlbGF0ZWRBZGRyZXNzIiwicmVsYXRlZFBvcnQiLCJ0Y3BUeXBlIiwidG9VcHBlckNhc2UiLCJwYXJzZUljZU9wdGlvbnMiLCJwYXJzZVJ0cE1hcCIsInBhcnNlZCIsIndyaXRlUnRwTWFwIiwicGFyc2VFeHRtYXAiLCJ3cml0ZUV4dG1hcCIsImhlYWRlckV4dGVuc2lvbiIsInByZWZlcnJlZElkIiwicGFyc2VGbXRwIiwia3YiLCJ3cml0ZUZtdHAiLCJwYXJhbSIsInBhcnNlUnRjcEZiIiwid3JpdGVSdGNwRmIiLCJwYXJzZVNzcmNNZWRpYSIsInNwIiwiY29sb24iLCJhdHRyaWJ1dGUiLCJwYXJzZUZpbmdlcnByaW50IiwiYWxnb3JpdGhtIiwiZmluZ2VycHJpbnRzIiwic2V0dXBUeXBlIiwiZnAiLCJjb25jYXQiLCJpY2VQYXJhbWV0ZXJzIiwicGFzc3dvcmQiLCJtbGluZSIsInJ0cG1hcGxpbmUiLCJmbXRwcyIsIm1heHB0aW1lIiwiZXh0ZW5zaW9uIiwiZW5jb2RpbmdQYXJhbWV0ZXJzIiwiaGFzUmVkIiwiaGFzVWxwZmVjIiwic3NyY3MiLCJwcmltYXJ5U3NyYyIsInNlY29uZGFyeVNzcmMiLCJmbG93cyIsImVuY1BhcmFtIiwiY29kZWNQYXlsb2FkVHlwZSIsImZlYyIsIm1lY2hhbmlzbSIsImJhbmR3aWR0aCIsIm1heEJpdHJhdGUiLCJyZW1vdGVTc3JjIiwib2JqIiwicnNpemUiLCJtdXgiLCJwbGFuQiIsInNlc3NJZCIsInNlc3NWZXIiLCJzZXNzaW9uSWQiLCJ2ZXJzaW9uIiwicGFyc2VNTGluZSIsImZtdCIsInBhcnNlT0xpbmUiLCJ1c2VybmFtZSIsInNlc3Npb25WZXJzaW9uIiwibmV0VHlwZSIsImFkZHJlc3NUeXBlIiwiYWRkcmVzcyIsImdsb2JhbCIsImFkYXB0ZXJGYWN0b3J5Iiwic2VsZiIsInV0aWxzIiwiZGVwZW5kZW5jaWVzIiwib3B0cyIsIm9wdGlvbnMiLCJzaGltQ2hyb21lIiwic2hpbUZpcmVmb3giLCJzaGltRWRnZSIsInNoaW1TYWZhcmkiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsImxvZ2dpbmciLCJicm93c2VyRGV0YWlscyIsImRldGVjdEJyb3dzZXIiLCJjaHJvbWVTaGltIiwiZWRnZVNoaW0iLCJmaXJlZm94U2hpbSIsInNhZmFyaVNoaW0iLCJjb21tb25TaGltIiwiYWRhcHRlciIsImV4dHJhY3RWZXJzaW9uIiwiZGlzYWJsZUxvZyIsImRpc2FibGVXYXJuaW5ncyIsImJyb3dzZXIiLCJzaGltUGVlckNvbm5lY3Rpb24iLCJicm93c2VyU2hpbSIsInNoaW1DcmVhdGVPYmplY3RVUkwiLCJzaGltR2V0VXNlck1lZGlhIiwic2hpbU1lZGlhU3RyZWFtIiwic2hpbVNvdXJjZU9iamVjdCIsInNoaW1PblRyYWNrIiwic2hpbUFkZFRyYWNrUmVtb3ZlVHJhY2siLCJzaGltR2V0U2VuZGVyc1dpdGhEdG1mIiwic2hpbVJUQ0ljZUNhbmRpZGF0ZSIsInNoaW1NYXhNZXNzYWdlU2l6ZSIsInNoaW1TZW5kVGhyb3dUeXBlRXJyb3IiLCJzaGltUmVtb3ZlU3RyZWFtIiwic2hpbVJlcGxhY2VUcmFjayIsInNoaW1SVENJY2VTZXJ2ZXJVcmxzIiwic2hpbUNhbGxiYWNrc0FQSSIsInNoaW1Mb2NhbFN0cmVhbXNBUEkiLCJzaGltUmVtb3RlU3RyZWFtc0FQSSIsInNoaW1UcmFja0V2ZW50VHJhbnNjZWl2ZXIiLCJzaGltQ3JlYXRlT2ZmZXJMZWdhY3kiLCJ3ZWJraXRNZWRpYVN0cmVhbSIsIl9vbnRyYWNrIiwib3JpZ1NldFJlbW90ZURlc2NyaXB0aW9uIiwiX29udHJhY2twb2x5IiwidGUiLCJ3cmFwUGVlckNvbm5lY3Rpb25FdmVudCIsInNoaW1TZW5kZXJXaXRoRHRtZiIsImR0bWYiLCJfZHRtZiIsImNyZWF0ZURUTUZTZW5kZXIiLCJfcGMiLCJfc2VuZGVycyIsIm9yaWdBZGRUcmFjayIsIm9yaWdSZW1vdmVUcmFjayIsIm9yaWdBZGRTdHJlYW0iLCJvcmlnUmVtb3ZlU3RyZWFtIiwib3JpZ0dldFNlbmRlcnMiLCJzZW5kZXJzIiwiVVJMIiwiSFRNTE1lZGlhRWxlbWVudCIsIl9zcmNPYmplY3QiLCJzcmMiLCJyZXZva2VPYmplY3RVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJzaGltQWRkVHJhY2tSZW1vdmVUcmFja1dpdGhOYXRpdmUiLCJfc2hpbW1lZExvY2FsU3RyZWFtcyIsInN0cmVhbUlkIiwiRE9NRXhjZXB0aW9uIiwiZXhpc3RpbmdTZW5kZXJzIiwibmV3U2VuZGVycyIsIm5ld1NlbmRlciIsIm9yaWdHZXRMb2NhbFN0cmVhbXMiLCJuYXRpdmVTdHJlYW1zIiwiX3JldmVyc2VTdHJlYW1zIiwiX3N0cmVhbXMiLCJuZXdTdHJlYW0iLCJvbGRTdHJlYW0iLCJyZXBsYWNlSW50ZXJuYWxTdHJlYW1JZCIsImludGVybmFsSWQiLCJleHRlcm5hbFN0cmVhbSIsImludGVybmFsU3RyZWFtIiwicmVwbGFjZSIsIlJlZ0V4cCIsInJlcGxhY2VFeHRlcm5hbFN0cmVhbUlkIiwiaXNMZWdhY3lDYWxsIiwiZXJyIiwib3JpZ1NldExvY2FsRGVzY3JpcHRpb24iLCJvcmlnTG9jYWxEZXNjcmlwdGlvbiIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImlzTG9jYWwiLCJzdHJlYW1pZCIsImhhc1RyYWNrIiwid2Via2l0UlRDUGVlckNvbm5lY3Rpb24iLCJwY0NvbmZpZyIsInBjQ29uc3RyYWludHMiLCJpY2VUcmFuc3BvcnRzIiwiZ2VuZXJhdGVDZXJ0aWZpY2F0ZSIsIk9yaWdQZWVyQ29ubmVjdGlvbiIsIm5ld0ljZVNlcnZlcnMiLCJkZXByZWNhdGVkIiwib3JpZ0dldFN0YXRzIiwic2VsZWN0b3IiLCJzdWNjZXNzQ2FsbGJhY2siLCJlcnJvckNhbGxiYWNrIiwiZml4Q2hyb21lU3RhdHNfIiwicmVzcG9uc2UiLCJzdGFuZGFyZFJlcG9ydCIsInJlcG9ydHMiLCJyZXBvcnQiLCJzdGFuZGFyZFN0YXRzIiwidGltZXN0YW1wIiwibmFtZXMiLCJtYWtlTWFwU3RhdHMiLCJzdWNjZXNzQ2FsbGJhY2tXcmFwcGVyXyIsInByb21pc2UiLCJuYXRpdmVBZGRJY2VDYW5kaWRhdGUiLCJuYXZpZ2F0b3IiLCJjb25zdHJhaW50c1RvQ2hyb21lXyIsImNjIiwiaWRlYWwiLCJleGFjdCIsIm1heCIsIm9sZG5hbWVfIiwiY2hhckF0Iiwib2MiLCJtaXgiLCJhZHZhbmNlZCIsInNoaW1Db25zdHJhaW50c18iLCJjb25zdHJhaW50cyIsImZ1bmMiLCJhdWRpbyIsInJlbWFwIiwiYiIsInZpZGVvIiwiZmFjZSIsImZhY2luZ01vZGUiLCJnZXRTdXBwb3J0ZWRGYWNpbmdNb2RlTGllcyIsIm1lZGlhRGV2aWNlcyIsImdldFN1cHBvcnRlZENvbnN0cmFpbnRzIiwibWF0Y2hlcyIsImVudW1lcmF0ZURldmljZXMiLCJkZXZpY2VzIiwiZCIsImRldiIsInNvbWUiLCJtYXRjaCIsImxhYmVsIiwiZGV2aWNlSWQiLCJzaGltRXJyb3JfIiwiUGVybWlzc2lvbkRlbmllZEVycm9yIiwiUGVybWlzc2lvbkRpc21pc3NlZEVycm9yIiwiRGV2aWNlc05vdEZvdW5kRXJyb3IiLCJDb25zdHJhaW50Tm90U2F0aXNmaWVkRXJyb3IiLCJUcmFja1N0YXJ0RXJyb3IiLCJNZWRpYURldmljZUZhaWxlZER1ZVRvU2h1dGRvd24iLCJNZWRpYURldmljZUtpbGxTd2l0Y2hPbiIsIlRhYkNhcHR1cmVFcnJvciIsIlNjcmVlbkNhcHR1cmVFcnJvciIsIkRldmljZUNhcHR1cmVFcnJvciIsImNvbnN0cmFpbnQiLCJjb25zdHJhaW50TmFtZSIsImdldFVzZXJNZWRpYV8iLCJvblN1Y2Nlc3MiLCJvbkVycm9yIiwid2Via2l0R2V0VXNlck1lZGlhIiwiZ2V0VXNlck1lZGlhIiwiZ2V0VXNlck1lZGlhUHJvbWlzZV8iLCJraW5kcyIsIk1lZGlhU3RyZWFtVHJhY2siLCJnZXRTb3VyY2VzIiwiZGV2aWNlIiwiZ3JvdXBJZCIsImVjaG9DYW5jZWxsYXRpb24iLCJmcmFtZVJhdGUiLCJoZWlnaHQiLCJ3aWR0aCIsIm9yaWdHZXRVc2VyTWVkaWEiLCJjcyIsIk5hdGl2ZVJUQ0ljZUNhbmRpZGF0ZSIsIm5hdGl2ZUNhbmRpZGF0ZSIsInBhcnNlZENhbmRpZGF0ZSIsImF1Z21lbnRlZENhbmRpZGF0ZSIsIm5hdGl2ZUNyZWF0ZU9iamVjdFVSTCIsIm5hdGl2ZVJldm9rZU9iamVjdFVSTCIsIm5ld0lkIiwiZHNjIiwibmF0aXZlU2V0QXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwiUlRDU2N0cFRyYW5zcG9ydCIsIl9zY3RwIiwic2N0cEluRGVzY3JpcHRpb24iLCJtTGluZSIsImdldFJlbW90ZUZpcmVmb3hWZXJzaW9uIiwiZ2V0Q2FuU2VuZE1heE1lc3NhZ2VTaXplIiwicmVtb3RlSXNGaXJlZm94IiwiY2FuU2VuZE1heE1lc3NhZ2VTaXplIiwiZ2V0TWF4TWVzc2FnZVNpemUiLCJtYXhNZXNzYWdlU2l6ZSIsImlzRmlyZWZveCIsImNhblNlbmRNTVMiLCJyZW1vdGVNTVMiLCJOdW1iZXIiLCJQT1NJVElWRV9JTkZJTklUWSIsInNjdHAiLCJvcmlnQ3JlYXRlRGF0YUNoYW5uZWwiLCJjcmVhdGVEYXRhQ2hhbm5lbCIsImRhdGFDaGFubmVsIiwib3JpZ0RhdGFDaGFubmVsU2VuZCIsImRjIiwic2l6ZSIsImJ5dGVMZW5ndGgiLCJzaGltUlRDUGVlckNvbm5lY3Rpb24iLCJvcmlnTVNURW5hYmxlZCIsImV2IiwiUlRDRHRtZlNlbmRlciIsIlJUQ0RUTUZTZW5kZXIiLCJyZXBsYWNlVHJhY2siLCJzZXRUcmFjayIsIlJUQ1RyYWNrRXZlbnQiLCJtb3pTcmNPYmplY3QiLCJtb3pSVENQZWVyQ29ubmVjdGlvbiIsIm5ld1NlcnZlciIsImNyZWRlbnRpYWwiLCJtb3pSVENTZXNzaW9uRGVzY3JpcHRpb24iLCJtb3pSVENJY2VDYW5kaWRhdGUiLCJtb2Rlcm5TdGF0c1R5cGVzIiwibmF0aXZlR2V0U3RhdHMiLCJvblN1Y2MiLCJvbkVyciIsIkludGVybmFsRXJyb3IiLCJTZWN1cml0eUVycm9yIiwiY29uc3RyYWludHNUb0ZGMzdfIiwibW96R2V0VXNlck1lZGlhIiwiaW5mb3MiLCJvcmdFbnVtZXJhdGVEZXZpY2VzIiwibmF0aXZlR2V0VXNlck1lZGlhIiwiZ2V0U2V0dGluZ3MiLCJuYXRpdmVHZXRTZXR0aW5ncyIsImFwcGx5Q29uc3RyYWludHMiLCJuYXRpdmVBcHBseUNvbnN0cmFpbnRzIiwiX2xvY2FsU3RyZWFtcyIsImdldFN0cmVhbUJ5SWQiLCJfcmVtb3RlU3RyZWFtcyIsIl9hZGRUcmFjayIsInRyYWNrcyIsIl9vbmFkZHN0cmVhbSIsIl9vbmFkZHN0cmVhbXBvbHkiLCJmYWlsdXJlQ2FsbGJhY2siLCJ3aXRoQ2FsbGJhY2siLCJjYiIsImVycmNiIiwiUlRDVHJhbnNjZWl2ZXIiLCJvcmlnQ3JlYXRlT2ZmZXIiLCJhdWRpb1RyYW5zY2VpdmVyIiwiZ2V0VHJhbnNjZWl2ZXJzIiwic2V0RGlyZWN0aW9uIiwiYWRkVHJhbnNjZWl2ZXIiLCJ2aWRlb1RyYW5zY2VpdmVyIiwibG9nRGlzYWJsZWRfIiwiZGVwcmVjYXRpb25XYXJuaW5nc18iLCJ1YXN0cmluZyIsImV4cHIiLCJwb3MiLCJldmVudE5hbWVUb1dyYXAiLCJ3cmFwcGVyIiwicHJvdG8iLCJuYXRpdmVBZGRFdmVudExpc3RlbmVyIiwibmF0aXZlRXZlbnROYW1lIiwid3JhcHBlZENhbGxiYWNrIiwiX2V2ZW50TWFwIiwibmF0aXZlUmVtb3ZlRXZlbnRMaXN0ZW5lciIsInVud3JhcHBlZENiIiwiYm9vbCIsIm9sZE1ldGhvZCIsIm5ld01ldGhvZCIsInVzZXJBZ2VudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBOzs7Ozs7QUFWQTs7O0FBZ0JBLElBQU1BLFNBQVMsU0FBVEEsTUFBUyxDQUFTQyxTQUFULEVBQW9CQyxZQUFwQixFQUFpQztBQUM1QyxR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QU5NLE1BTUEsSUFBSS9KLFVBQVVxQixZQUFWLElBQ1ByQixVQUFVK0osU0FBVixDQUFvQmxJLEtBQXBCLENBQTBCLG9CQUExQixDQURHLEVBQzhDO0FBQUU7QUFDckR2TyxtQkFBT3lHLE9BQVAsR0FBaUIsTUFBakI7QUFDQXpHLG1CQUFPdUUsT0FBUCxHQUFpQitCLGVBQWVvRyxVQUFVK0osU0FBekIsRUFDYixvQkFEYSxFQUNTLENBRFQsQ0FBakI7QUFFRCxXQUxNLE1BS0EsSUFBSXJ2QixPQUFPZ0MsaUJBQVAsSUFDUHNqQixVQUFVK0osU0FBVixDQUFvQmxJLEtBQXBCLENBQTBCLHNCQUExQixDQURHLEVBQ2dEO0FBQUU7QUFDdkR2TyxtQkFBT3lHLE9BQVAsR0FBaUIsUUFBakI7QUFDQXpHLG1CQUFPdUUsT0FBUCxHQUFpQitCLGVBQWVvRyxVQUFVK0osU0FBekIsRUFDYixzQkFEYSxFQUNXLENBRFgsQ0FBakI7QUFFRCxXQUxNLE1BS0E7QUFBRTtBQUNQelcsbUJBQU95RyxPQUFQLEdBQWlCLDBCQUFqQjtBQUNBLG1CQUFPekcsTUFBUDtBQUNEOztBQUVELGlCQUFPQSxNQUFQO0FBQ0Q7QUE5RmMsT0FBakI7QUFpR0MsS0FoTHFCLEVBZ0xwQixFQWhMb0IsQ0E5cEpveEIsRUFBM2IsRUE4MEp4VyxFQTkwSndXLEVBODBKclcsQ0FBQyxDQUFELENBOTBKcVcsRUE4MEpoVyxDQTkwSmdXLENBQVA7QUErMEp2VyxDQS8wSkQsRSIsImZpbGUiOiJvdmVucGxheWVyLnByb3ZpZGVyLldlYlJUQ1Byb3ZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA2LiAxMS4uXHJcbiAqL1xyXG5pbXBvcnQgTWVkaWFNYW5hZ2VyIGZyb20gXCJhcGkvbWVkaWEvTWFuYWdlclwiO1xyXG5pbXBvcnQgUHJvdmlkZXIgZnJvbSBcImFwaS9wcm92aWRlci9odG1sNS9Qcm92aWRlclwiO1xyXG5pbXBvcnQgV2ViUlRDTG9hZGVyIGZyb20gXCJhcGkvcHJvdmlkZXIvaHRtbDUvcHJvdmlkZXJzL1dlYlJUQ0xvYWRlclwiO1xyXG5pbXBvcnQge2lzV2ViUlRDfSBmcm9tIFwidXRpbHMvdmFsaWRhdG9yXCI7XHJcbmltcG9ydCB7ZXJyb3JUcmlnZ2VyfSBmcm9tIFwiYXBpL3Byb3ZpZGVyL3V0aWxzXCI7XHJcbmltcG9ydCB7UFJPVklERVJfV0VCUlRDLCBTVEFURV9JRExFfSBmcm9tIFwiYXBpL2NvbnN0YW50c1wiO1xyXG5cclxuLyoqXHJcbiAqIEBicmllZiAgIHdlYnJ0YyBwcm92aWRlciBleHRlbmRlZCBjb3JlLlxyXG4gKiBAcGFyYW0gICBjb250YWluZXIgcGxheWVyIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSAgIHBsYXllckNvbmZpZyAgICBjb25maWcuXHJcbiAqICovXHJcblxyXG5jb25zdCBXZWJSVEMgPSBmdW5jdGlvbihjb250YWluZXIsIHBsYXllckNvbmZpZyl7XHJcbiAgICBsZXQgdGhhdCA9IHt9O1xyXG4gICAgbGV0IHdlYnJ0Y0xvYWRlciA9IG51bGw7XHJcbiAgICBsZXQgc3VwZXJEZXN0cm95X2Z1bmMgID0gbnVsbDtcclxuXHJcbiAgICBsZXQgbWVkaWFNYW5hZ2VyID0gTWVkaWFNYW5hZ2VyKGNvbnRhaW5lciwgUFJPVklERVJfV0VCUlRDKTtcclxuICAgIGxldCBlbGVtZW50ID0gbWVkaWFNYW5hZ2VyLmNyZWF0ZSgpO1xyXG5cclxuICAgIGxldCBzcGVjID0ge1xyXG4gICAgICAgIG5hbWUgOiBQUk9WSURFUl9XRUJSVEMsXHJcbiAgICAgICAgZXh0ZW5kZWRFbGVtZW50IDogZWxlbWVudCxcclxuICAgICAgICBsaXN0ZW5lciA6IG51bGwsXHJcbiAgICAgICAgY2FuU2VlayA6IGZhbHNlLFxyXG4gICAgICAgIGlzTGl2ZSA6IGZhbHNlLFxyXG4gICAgICAgIHNlZWtpbmcgOiBmYWxzZSxcclxuICAgICAgICBzdGF0ZSA6IFNUQVRFX0lETEUsXHJcbiAgICAgICAgYnVmZmVyIDogMCxcclxuICAgICAgICBmcmFtZXJhdGUgOiAwLFxyXG4gICAgICAgIGN1cnJlbnRRdWFsaXR5IDogLTEsXHJcbiAgICAgICAgY3VycmVudFNvdXJjZSA6IC0xLFxyXG4gICAgICAgIHF1YWxpdHlMZXZlbHMgOiBbXSxcclxuICAgICAgICBzb3VyY2VzIDogW11cclxuICAgIH07XHJcblxyXG4gICAgdGhhdCA9IFByb3ZpZGVyKHNwZWMsIHBsYXllckNvbmZpZywgZnVuY3Rpb24oc291cmNlKXtcclxuICAgICAgICBpZihpc1dlYlJUQyhzb3VyY2UuZmlsZSwgc291cmNlLnR5cGUpKXtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiV0VCUlRDIDogb25CZWZvcmVMb2FkIDogXCIsIHNvdXJjZSk7XHJcbiAgICAgICAgICAgIGlmKHdlYnJ0Y0xvYWRlcil7XHJcbiAgICAgICAgICAgICAgICB3ZWJydGNMb2FkZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgd2VicnRjTG9hZGVyID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB3ZWJydGNMb2FkZXIgPSBXZWJSVENMb2FkZXIodGhhdCwgc291cmNlLmZpbGUsIGVycm9yVHJpZ2dlcik7XHJcbiAgICAgICAgICAgIHdlYnJ0Y0xvYWRlci5jb25uZWN0KCkudGhlbihmdW5jdGlvbihzdHJlYW0pe1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zcmNPYmplY3QgPSBzdHJlYW07XHJcbiAgICAgICAgICAgICAgICB0aGF0LnBsYXkoKTtcclxuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgLy90aGF0LmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIC8vRG8gbm90aGluZ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHN1cGVyRGVzdHJveV9mdW5jID0gdGhhdC5zdXBlcignZGVzdHJveScpO1xyXG5cclxuICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldFQlJUQyBQUk9WSURFUiBMT0FERUQuXCIpO1xyXG5cclxuXHJcbiAgICB0aGF0LmRlc3Ryb3kgPSAoKSA9PntcclxuICAgICAgICBpZih3ZWJydGNMb2FkZXIpe1xyXG4gICAgICAgICAgICB3ZWJydGNMb2FkZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB3ZWJydGNMb2FkZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtZWRpYU1hbmFnZXIuZGVzdHJveSgpO1xyXG4gICAgICAgIG1lZGlhTWFuYWdlciA9IG51bGw7XHJcbiAgICAgICAgZWxlbWVudCA9IG51bGw7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiV0VCUlRDIDogIFBST1ZJREVSIERFU1RST1lFRC5cIik7XHJcblxyXG4gICAgICAgIHN1cGVyRGVzdHJveV9mdW5jKCk7XHJcblxyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGF0O1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFdlYlJUQztcclxuIiwiaW1wb3J0IGFkYXB0ZXIgZnJvbSAndXRpbHMvYWRhcHRlcic7XHJcbmltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XHJcbmltcG9ydCB7XHJcbiAgICBFUlJPUlMsXHJcbiAgICBQTEFZRVJfV0VCUlRDX1dTX0VSUk9SLFxyXG4gICAgUExBWUVSX1dFQlJUQ19XU19DTE9TRUQsXHJcbiAgICBQTEFZRVJfV0VCUlRDX0FERF9JQ0VDQU5ESURBVEVfRVJST1IsXHJcbiAgICBQTEFZRVJfV0VCUlRDX1NFVF9SRU1PVEVfREVTQ19FUlJPUixcclxuICAgIFBMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUixcclxuICAgIFBMQVlFUl9XRUJSVENfU0VUX0xPQ0FMX0RFU0NfRVJST1IsXHJcbiAgICBQTEFZRVJfV0VCUlRDX05FVFdPUktfU0xPVyxcclxuICAgIE5FVFdPUktfVU5TVEFCTEVEXHJcbn0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuXHJcblxyXG5jb25zdCBXZWJSVENMb2FkZXIgPSBmdW5jdGlvbihwcm92aWRlciwgdXJsLCBlcnJvclRyaWdnZXIpe1xyXG4gICAgdmFyIHVybCA9IHVybDtcclxuICAgIGxldCB3cyA9IFwiXCI7XHJcbiAgICBsZXQgcGVlckNvbm5lY3Rpb24gPSBcIlwiO1xyXG4gICAgbGV0IHN0YXRpc3RpY3NUaW1lciA9IFwiXCI7XHJcbiAgICBjb25zdCBjb25maWcgPSB7XHJcbiAgICAgICAgJ2ljZVNlcnZlcnMnOiBbe1xyXG4gICAgICAgICAgICAndXJscyc6ICdzdHVuOnN0dW4ubC5nb29nbGUuY29tOjE5MzAyJ1xyXG4gICAgICAgIH1dXHJcbiAgICB9O1xyXG4gICAgY29uc3QgdGhhdCA9IHt9O1xyXG4gICAgbGV0IG15U2RwID0gXCJcIjtcclxuXHJcblxyXG4gICAgKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBleGlzdGluZ0hhbmRsZXIgPSB3aW5kb3cub25iZWZvcmV1bmxvYWQ7XHJcbiAgICAgICAgd2luZG93Lm9uYmVmb3JldW5sb2FkID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKGV4aXN0aW5nSGFuZGxlcil7XHJcbiAgICAgICAgICAgICAgICBleGlzdGluZ0hhbmRsZXIoZXZlbnQpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJUaGlzIGNhbGxzIGF1dG8gd2hlbiBicm93c2VyIGNsb3NlZC5cIik7XHJcbiAgICAgICAgICAgIGNsb3NlUGVlcigpO1xyXG4gICAgICAgIH1cclxuICAgIH0pKCk7XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiV2ViUlRDTG9hZGVyIGNvbm5lY3RpbmcuLi5cIik7XHJcblxyXG4gICAgICAgIGNvbnN0IG9uTG9jYWxEZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKGlkLCBjb25uZWN0aW9uLCBkZXNjKSB7XHJcbiAgICAgICAgICAgIGNvbm5lY3Rpb24uc2V0TG9jYWxEZXNjcmlwdGlvbihkZXNjKS50aGVuKGZ1bmN0aW9uICgpe1xyXG4gICAgICAgICAgICAgICAgLy8gbXkgU0RQIGNyZWF0ZWQuXHJcbiAgICAgICAgICAgICAgICB2YXIgbG9jYWxTRFAgPSBjb25uZWN0aW9uLmxvY2FsRGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coJ0xvY2FsIFNEUCcsIGxvY2FsU0RQKTtcclxuICAgICAgICAgICAgICAgIG15U2RwID0gbG9jYWxTRFA7ICAgLy90ZXN0IGNvZGVcclxuICAgICAgICAgICAgICAgIC8vIG15IHNkcCBzZW5kIHRvIHNlcnZlci5cclxuICAgICAgICAgICAgICAgIHdzLnNlbmQoSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBpZCxcclxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kIDogXCJhbnN3ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICBzZHA6IGxvY2FsU0RQXHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlNbUExBWUVSX1dFQlJUQ19TRVRfTE9DQUxfREVTQ19FUlJPUl07XHJcbiAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgIGNsb3NlUGVlcih0ZW1wRXJyb3IpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KXtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiV2ViUlRDTG9hZGVyIHVybCA6IFwiICsgdXJsKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHdzID0gbmV3IFdlYlNvY2tldCh1cmwpO1xyXG4gICAgICAgICAgICAgICAgd3Mub25vcGVuID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd3Muc2VuZChKU09OLnN0cmluZ2lmeSh7Y29tbWFuZCA6IFwicmVxdWVzdF9vZmZlclwifSkpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHdzLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gSlNPTi5wYXJzZShlLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKG1lc3NhZ2UuZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTW1BMQVlFUl9XRUJSVENfV1NfRVJST1JdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBtZXNzYWdlLmVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZihtZXNzYWdlLmxpc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKCdMaXN0IHJlY2VpdmVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFtZXNzYWdlLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZygnSUQgbXVzdCBiZSBub3QgbnVsbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZighcGVlckNvbm5lY3Rpb24pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbiA9IG5ldyBSVENQZWVyQ29ubmVjdGlvbihjb25maWcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24ub25pY2VjYW5kaWRhdGUgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihlLmNhbmRpZGF0ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiV2ViUlRDTG9hZGVyIHNlbmQgY2FuZGlkYXRlIHRvIHNlcnZlciA6IFwiICsgZS5jYW5kaWRhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdzLnNlbmQoSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogbWVzc2FnZS5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZCA6IFwiY2FuZGlkYXRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbmRpZGF0ZXM6IFtlLmNhbmRpZGF0ZV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbi5vbm5lZ290aWF0aW9ubmVlZGVkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbi5jcmVhdGVPZmZlcigpLnRoZW4oZnVuY3Rpb24oZGVzYykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcImNyZWF0ZU9mZmVyIDogc3VjY2Vzc1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uTG9jYWxEZXNjcmlwdGlvbihtZXNzYWdlLmlkLCBwZWVyQ29ubmVjdGlvbiwgZGVzYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SU1tQTEFZRVJfV0VCUlRDX0NSRUFURV9BTlNXRVJfRVJST1JdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcih0ZW1wRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbi5vbmFkZHN0cmVhbSA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcInN0cmVhbSByZWNlaXZlZC5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzdHJlYW0gcmVjZWl2ZWQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbG9zdFBhY2tldHNBcnIgPSBbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbG90TGVuZ3RoID0gOCwgLy84IHN0YXRpc3RpY3MuIGV2ZXJ5IDIgc2Vjb25kc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZQYWNrZXRzTG9zdCA9IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXZnOExvc3NlcyA9IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXZnTW9yZVRoYW5UaHJlc2hvbGRDb3VudCA9IDAsICAvL0lmIGF2ZzhMb3NzIG1vcmUgdGhhbiB0aHJlc2hvbGQuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyZXNob2xkID0gMjA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBleHRyYWN0TG9zc1BhY2tldHNPbk5ldHdvcmtTdGF0dXMgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpc3RpY3NUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIXBlZXJDb25uZWN0aW9uKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbi5nZXRTdGF0cygpLnRoZW4oZnVuY3Rpb24oc3RhdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRzLmZvckVhY2goZnVuY3Rpb24oc3RhdGUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHN0YXRlLnR5cGUgPT09IFwiaW5ib3VuZC1ydHBcIiAmJiAhc3RhdGUuaXNSZW1vdGUgKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKHN0YXRlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vKHN0YXRlLnBhY2tldHNMb3N0IC0gcHJldlBhY2tldHNMb3N0KSBpcyByZWFsIGN1cnJlbnQgbG9zdC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9zdFBhY2tldHNBcnIucHVzaChwYXJzZUludChzdGF0ZS5wYWNrZXRzTG9zdCktcGFyc2VJbnQocHJldlBhY2tldHNMb3N0KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihsb3N0UGFja2V0c0Fyci5sZW5ndGggPiBzbG90TGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvc3RQYWNrZXRzQXJyID0gbG9zdFBhY2tldHNBcnIuc2xpY2UobG9zdFBhY2tldHNBcnIubGVuZ3RoIC0gc2xvdExlbmd0aCwgbG9zdFBhY2tldHNBcnIubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF2ZzhMb3NzZXMgPSBfLnJlZHVjZShsb3N0UGFja2V0c0FyciwgZnVuY3Rpb24obWVtbywgbnVtKXsgcmV0dXJuIG1lbW8gKyBudW07IH0sIDApIC8gc2xvdExlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIkxhc3Q4IExPU1QgUEFDS0VUIEFWRyAgOiBcIisgKGF2ZzhMb3NzZXMpLCBzdGF0ZS5wYWNrZXRzTG9zdCAsIGxvc3RQYWNrZXRzQXJyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGF2ZzhMb3NzZXMgPiB0aHJlc2hvbGQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF2Z01vcmVUaGFuVGhyZXNob2xkQ291bnQgKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoYXZnTW9yZVRoYW5UaHJlc2hvbGRDb3VudCA9PT0gMyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIk5FVFdPUksgVU5TVEFCTEVEISEhIFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHN0YXRpc3RpY3NUaW1lcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGVyLnRyaWdnZXIoTkVUV09SS19VTlNUQUJMRUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF2Z01vcmVUaGFuVGhyZXNob2xkQ291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldlBhY2tldHNMb3N0ID0gc3RhdGUucGFja2V0c0xvc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHRyYWN0TG9zc1BhY2tldHNPbk5ldHdvcmtTdGF0dXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMjAwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4dHJhY3RMb3NzUGFja2V0c09uTmV0d29ya1N0YXR1cygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShlLnN0cmVhbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihtZXNzYWdlLnNkcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL1NldCByZW1vdGUgZGVzY3JpcHRpb24gd2hlbiBJIHJlY2VpdmVkIHNkcCBmcm9tIHNlcnZlci5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24uc2V0UmVtb3RlRGVzY3JpcHRpb24obmV3IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbihtZXNzYWdlLnNkcCkpLnRoZW4oZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHBlZXJDb25uZWN0aW9uLnJlbW90ZURlc2NyaXB0aW9uLnR5cGUgPT09ICdvZmZlcicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIGNyZWF0ZXMgYW5zd2VyIHdoZW4gSSByZWNlaXZlZCBvZmZlciBmcm9tIHB1Ymxpc2hlci5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbi5jcmVhdGVBbnN3ZXIoKS50aGVuKGZ1bmN0aW9uKGRlc2Mpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJjcmVhdGVBbnN3ZXIgOiBzdWNjZXNzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkxvY2FsRGVzY3JpcHRpb24obWVzc2FnZS5pZCwgcGVlckNvbm5lY3Rpb24sIGRlc2MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SU1tQTEFZRVJfV0VCUlRDX0NSRUFURV9BTlNXRVJfRVJST1JdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlNbUExBWUVSX1dFQlJUQ19TRVRfUkVNT1RFX0RFU0NfRVJST1JdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihtZXNzYWdlLmNhbmRpZGF0ZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyByZWNlaXZlcyBJQ0UgQ2FuZGlkYXRlIGZyb20gc2VydmVyLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgbWVzc2FnZS5jYW5kaWRhdGVzLmxlbmd0aDsgaSArKyApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYobWVzc2FnZS5jYW5kaWRhdGVzW2ldICYmIG1lc3NhZ2UuY2FuZGlkYXRlc1tpXS5jYW5kaWRhdGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24uYWRkSWNlQ2FuZGlkYXRlKG5ldyBSVENJY2VDYW5kaWRhdGUobWVzc2FnZS5jYW5kaWRhdGVzW2ldKSkudGhlbihmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJhZGRJY2VDYW5kaWRhdGUgOiBzdWNjZXNzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SU1tQTEFZRVJfV0VCUlRDX0FERF9JQ0VDQU5ESURBVEVfRVJST1JdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHdzLm9uZXJyb3IgPSBmdW5jdGlvbihlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0ZW1wRXJyb3IgPSBFUlJPUlNbUExBWUVSX1dFQlJUQ19XU19FUlJPUl07XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1jYXRjaChlcnJvcil7XHJcbiAgICAgICAgICAgICAgICBjbG9zZVBlZXIoZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VQZWVyKGVycm9yKSB7XHJcbiAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKCdXZWJSVEMgTG9hZGVyIGNsb3NlUGVlYXIoKScpO1xyXG4gICAgICAgIGlmKHdzKSB7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZygnQ2xvc2luZyB3ZWJzb2NrZXQgY29ubmVjdGlvbi4uLicpO1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJTZW5kIFNpZ25hbGluZyA6IFN0b3AuXCIpO1xyXG4gICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAwIChDT05ORUNUSU5HKVxyXG4gICAgICAgICAgICAxIChPUEVOKVxyXG4gICAgICAgICAgICAyIChDTE9TSU5HKVxyXG4gICAgICAgICAgICAzIChDTE9TRUQpXHJcbiAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGlmKHdzLnJlYWR5U3RhdGUgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICB3cy5zZW5kKEpTT04uc3RyaW5naWZ5KHtjb21tYW5kIDogXCJzdG9wXCJ9KSk7XHJcbiAgICAgICAgICAgICAgICB3cy5jbG9zZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHdzID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYocGVlckNvbm5lY3Rpb24pIHtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKCdDbG9zaW5nIHBlZXIgY29ubmVjdGlvbi4uLicpO1xyXG4gICAgICAgICAgICBpZihzdGF0aXN0aWNzVGltZXIpe2NsZWFyVGltZW91dChzdGF0aXN0aWNzVGltZXIpO31cclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24uY2xvc2UoKTtcclxuICAgICAgICAgICAgcGVlckNvbm5lY3Rpb24gPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihlcnJvcil7XHJcbiAgICAgICAgICAgIGVycm9yVHJpZ2dlcihlcnJvciwgcHJvdmlkZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgdGhhdC5jb25uZWN0ID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBpbml0aWFsaXplKCk7XHJcbiAgICB9O1xyXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT4ge1xyXG4gICAgICAgIHBlZXJDb25uZWN0aW9uLmxvZyhcIldFQlJUQyBMT0FERVIgZGVzdHJveVwiKTtcclxuICAgICAgICBjbG9zZVBlZXIoKTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFdlYlJUQ0xvYWRlcjtcclxuIiwiKGZ1bmN0aW9uKGYpe2lmKHR5cGVvZiBleHBvcnRzPT09XCJvYmplY3RcIiYmdHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCIpe21vZHVsZS5leHBvcnRzPWYoKX1lbHNlIGlmKHR5cGVvZiBkZWZpbmU9PT1cImZ1bmN0aW9uXCImJmRlZmluZS5hbWQpe2RlZmluZShbXSxmKX1lbHNle3ZhciBnO2lmKHR5cGVvZiB3aW5kb3chPT1cInVuZGVmaW5lZFwiKXtnPXdpbmRvd31lbHNlIGlmKHR5cGVvZiBnbG9iYWwhPT1cInVuZGVmaW5lZFwiKXtnPWdsb2JhbH1lbHNlIGlmKHR5cGVvZiBzZWxmIT09XCJ1bmRlZmluZWRcIil7Zz1zZWxmfWVsc2V7Zz10aGlzfWcuYWRhcHRlciA9IGYoKX19KShmdW5jdGlvbigpe3ZhciBkZWZpbmUsbW9kdWxlLGV4cG9ydHM7cmV0dXJuIChmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuLypcclxuICogIENvcHlyaWdodCAoYykgMjAxNyBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcclxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxyXG4gKiAgdHJlZS5cclxuICovXHJcbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIFNEUFV0aWxzID0gcmVxdWlyZSgnc2RwJyk7XHJcblxyXG5mdW5jdGlvbiB3cml0ZU1lZGlhU2VjdGlvbih0cmFuc2NlaXZlciwgY2FwcywgdHlwZSwgc3RyZWFtLCBkdGxzUm9sZSkge1xyXG4gIHZhciBzZHAgPSBTRFBVdGlscy53cml0ZVJ0cERlc2NyaXB0aW9uKHRyYW5zY2VpdmVyLmtpbmQsIGNhcHMpO1xyXG5cclxuICAvLyBNYXAgSUNFIHBhcmFtZXRlcnMgKHVmcmFnLCBwd2QpIHRvIFNEUC5cclxuICBzZHAgKz0gU0RQVXRpbHMud3JpdGVJY2VQYXJhbWV0ZXJzKFxyXG4gICAgICB0cmFuc2NlaXZlci5pY2VHYXRoZXJlci5nZXRMb2NhbFBhcmFtZXRlcnMoKSk7XHJcblxyXG4gIC8vIE1hcCBEVExTIHBhcmFtZXRlcnMgdG8gU0RQLlxyXG4gIHNkcCArPSBTRFBVdGlscy53cml0ZUR0bHNQYXJhbWV0ZXJzKFxyXG4gICAgICB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0LmdldExvY2FsUGFyYW1ldGVycygpLFxyXG4gICAgICB0eXBlID09PSAnb2ZmZXInID8gJ2FjdHBhc3MnIDogZHRsc1JvbGUgfHwgJ2FjdGl2ZScpO1xyXG5cclxuICBzZHAgKz0gJ2E9bWlkOicgKyB0cmFuc2NlaXZlci5taWQgKyAnXFxyXFxuJztcclxuXHJcbiAgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlciAmJiB0cmFuc2NlaXZlci5ydHBSZWNlaXZlcikge1xyXG4gICAgc2RwICs9ICdhPXNlbmRyZWN2XFxyXFxuJztcclxuICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlcikge1xyXG4gICAgc2RwICs9ICdhPXNlbmRvbmx5XFxyXFxuJztcclxuICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyKSB7XHJcbiAgICBzZHAgKz0gJ2E9cmVjdm9ubHlcXHJcXG4nO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBzZHAgKz0gJ2E9aW5hY3RpdmVcXHJcXG4nO1xyXG4gIH1cclxuXHJcbiAgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlcikge1xyXG4gICAgdmFyIHRyYWNrSWQgPSB0cmFuc2NlaXZlci5ydHBTZW5kZXIuX2luaXRpYWxUcmFja0lkIHx8XHJcbiAgICAgICAgdHJhbnNjZWl2ZXIucnRwU2VuZGVyLnRyYWNrLmlkO1xyXG4gICAgdHJhbnNjZWl2ZXIucnRwU2VuZGVyLl9pbml0aWFsVHJhY2tJZCA9IHRyYWNrSWQ7XHJcbiAgICAvLyBzcGVjLlxyXG4gICAgdmFyIG1zaWQgPSAnbXNpZDonICsgKHN0cmVhbSA/IHN0cmVhbS5pZCA6ICctJykgKyAnICcgK1xyXG4gICAgICAgIHRyYWNrSWQgKyAnXFxyXFxuJztcclxuICAgIHNkcCArPSAnYT0nICsgbXNpZDtcclxuICAgIC8vIGZvciBDaHJvbWUuIExlZ2FjeSBzaG91bGQgbm8gbG9uZ2VyIGJlIHJlcXVpcmVkLlxyXG4gICAgc2RwICs9ICdhPXNzcmM6JyArIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYyArXHJcbiAgICAgICAgJyAnICsgbXNpZDtcclxuXHJcbiAgICAvLyBSVFhcclxuICAgIGlmICh0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCkge1xyXG4gICAgICBzZHAgKz0gJ2E9c3NyYzonICsgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHguc3NyYyArXHJcbiAgICAgICAgICAnICcgKyBtc2lkO1xyXG4gICAgICBzZHAgKz0gJ2E9c3NyYy1ncm91cDpGSUQgJyArXHJcbiAgICAgICAgICB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmMgKyAnICcgK1xyXG4gICAgICAgICAgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHguc3NyYyArXHJcbiAgICAgICAgICAnXFxyXFxuJztcclxuICAgIH1cclxuICB9XHJcbiAgLy8gRklYTUU6IHRoaXMgc2hvdWxkIGJlIHdyaXR0ZW4gYnkgd3JpdGVSdHBEZXNjcmlwdGlvbi5cclxuICBzZHAgKz0gJ2E9c3NyYzonICsgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjICtcclxuICAgICAgJyBjbmFtZTonICsgU0RQVXRpbHMubG9jYWxDTmFtZSArICdcXHJcXG4nO1xyXG4gIGlmICh0cmFuc2NlaXZlci5ydHBTZW5kZXIgJiYgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHgpIHtcclxuICAgIHNkcCArPSAnYT1zc3JjOicgKyB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eC5zc3JjICtcclxuICAgICAgICAnIGNuYW1lOicgKyBTRFBVdGlscy5sb2NhbENOYW1lICsgJ1xcclxcbic7XHJcbiAgfVxyXG4gIHJldHVybiBzZHA7XHJcbn1cclxuXHJcbi8vIEVkZ2UgZG9lcyBub3QgbGlrZVxyXG4vLyAxKSBzdHVuOiBmaWx0ZXJlZCBhZnRlciAxNDM5MyB1bmxlc3MgP3RyYW5zcG9ydD11ZHAgaXMgcHJlc2VudFxyXG4vLyAyKSB0dXJuOiB0aGF0IGRvZXMgbm90IGhhdmUgYWxsIG9mIHR1cm46aG9zdDpwb3J0P3RyYW5zcG9ydD11ZHBcclxuLy8gMykgdHVybjogd2l0aCBpcHY2IGFkZHJlc3Nlc1xyXG4vLyA0KSB0dXJuOiBvY2N1cnJpbmcgbXVsaXBsZSB0aW1lc1xyXG5mdW5jdGlvbiBmaWx0ZXJJY2VTZXJ2ZXJzKGljZVNlcnZlcnMsIGVkZ2VWZXJzaW9uKSB7XHJcbiAgdmFyIGhhc1R1cm4gPSBmYWxzZTtcclxuICBpY2VTZXJ2ZXJzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShpY2VTZXJ2ZXJzKSk7XHJcbiAgcmV0dXJuIGljZVNlcnZlcnMuZmlsdGVyKGZ1bmN0aW9uKHNlcnZlcikge1xyXG4gICAgaWYgKHNlcnZlciAmJiAoc2VydmVyLnVybHMgfHwgc2VydmVyLnVybCkpIHtcclxuICAgICAgdmFyIHVybHMgPSBzZXJ2ZXIudXJscyB8fCBzZXJ2ZXIudXJsO1xyXG4gICAgICBpZiAoc2VydmVyLnVybCAmJiAhc2VydmVyLnVybHMpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oJ1JUQ0ljZVNlcnZlci51cmwgaXMgZGVwcmVjYXRlZCEgVXNlIHVybHMgaW5zdGVhZC4nKTtcclxuICAgICAgfVxyXG4gICAgICB2YXIgaXNTdHJpbmcgPSB0eXBlb2YgdXJscyA9PT0gJ3N0cmluZyc7XHJcbiAgICAgIGlmIChpc1N0cmluZykge1xyXG4gICAgICAgIHVybHMgPSBbdXJsc107XHJcbiAgICAgIH1cclxuICAgICAgdXJscyA9IHVybHMuZmlsdGVyKGZ1bmN0aW9uKHVybCkge1xyXG4gICAgICAgIHZhciB2YWxpZFR1cm4gPSB1cmwuaW5kZXhPZigndHVybjonKSA9PT0gMCAmJlxyXG4gICAgICAgICAgICB1cmwuaW5kZXhPZigndHJhbnNwb3J0PXVkcCcpICE9PSAtMSAmJlxyXG4gICAgICAgICAgICB1cmwuaW5kZXhPZigndHVybjpbJykgPT09IC0xICYmXHJcbiAgICAgICAgICAgICFoYXNUdXJuO1xyXG5cclxuICAgICAgICBpZiAodmFsaWRUdXJuKSB7XHJcbiAgICAgICAgICBoYXNUdXJuID0gdHJ1ZTtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdXJsLmluZGV4T2YoJ3N0dW46JykgPT09IDAgJiYgZWRnZVZlcnNpb24gPj0gMTQzOTMgJiZcclxuICAgICAgICAgICAgdXJsLmluZGV4T2YoJz90cmFuc3BvcnQ9dWRwJykgPT09IC0xO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGRlbGV0ZSBzZXJ2ZXIudXJsO1xyXG4gICAgICBzZXJ2ZXIudXJscyA9IGlzU3RyaW5nID8gdXJsc1swXSA6IHVybHM7XHJcbiAgICAgIHJldHVybiAhIXVybHMubGVuZ3RoO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG4vLyBEZXRlcm1pbmVzIHRoZSBpbnRlcnNlY3Rpb24gb2YgbG9jYWwgYW5kIHJlbW90ZSBjYXBhYmlsaXRpZXMuXHJcbmZ1bmN0aW9uIGdldENvbW1vbkNhcGFiaWxpdGllcyhsb2NhbENhcGFiaWxpdGllcywgcmVtb3RlQ2FwYWJpbGl0aWVzKSB7XHJcbiAgdmFyIGNvbW1vbkNhcGFiaWxpdGllcyA9IHtcclxuICAgIGNvZGVjczogW10sXHJcbiAgICBoZWFkZXJFeHRlbnNpb25zOiBbXSxcclxuICAgIGZlY01lY2hhbmlzbXM6IFtdXHJcbiAgfTtcclxuXHJcbiAgdmFyIGZpbmRDb2RlY0J5UGF5bG9hZFR5cGUgPSBmdW5jdGlvbihwdCwgY29kZWNzKSB7XHJcbiAgICBwdCA9IHBhcnNlSW50KHB0LCAxMCk7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvZGVjcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAoY29kZWNzW2ldLnBheWxvYWRUeXBlID09PSBwdCB8fFxyXG4gICAgICAgICAgY29kZWNzW2ldLnByZWZlcnJlZFBheWxvYWRUeXBlID09PSBwdCkge1xyXG4gICAgICAgIHJldHVybiBjb2RlY3NbaV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICB2YXIgcnR4Q2FwYWJpbGl0eU1hdGNoZXMgPSBmdW5jdGlvbihsUnR4LCByUnR4LCBsQ29kZWNzLCByQ29kZWNzKSB7XHJcbiAgICB2YXIgbENvZGVjID0gZmluZENvZGVjQnlQYXlsb2FkVHlwZShsUnR4LnBhcmFtZXRlcnMuYXB0LCBsQ29kZWNzKTtcclxuICAgIHZhciByQ29kZWMgPSBmaW5kQ29kZWNCeVBheWxvYWRUeXBlKHJSdHgucGFyYW1ldGVycy5hcHQsIHJDb2RlY3MpO1xyXG4gICAgcmV0dXJuIGxDb2RlYyAmJiByQ29kZWMgJiZcclxuICAgICAgICBsQ29kZWMubmFtZS50b0xvd2VyQ2FzZSgpID09PSByQ29kZWMubmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gIH07XHJcblxyXG4gIGxvY2FsQ2FwYWJpbGl0aWVzLmNvZGVjcy5mb3JFYWNoKGZ1bmN0aW9uKGxDb2RlYykge1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZW1vdGVDYXBhYmlsaXRpZXMuY29kZWNzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHZhciByQ29kZWMgPSByZW1vdGVDYXBhYmlsaXRpZXMuY29kZWNzW2ldO1xyXG4gICAgICBpZiAobENvZGVjLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gckNvZGVjLm5hbWUudG9Mb3dlckNhc2UoKSAmJlxyXG4gICAgICAgICAgbENvZGVjLmNsb2NrUmF0ZSA9PT0gckNvZGVjLmNsb2NrUmF0ZSkge1xyXG4gICAgICAgIGlmIChsQ29kZWMubmFtZS50b0xvd2VyQ2FzZSgpID09PSAncnR4JyAmJlxyXG4gICAgICAgICAgICBsQ29kZWMucGFyYW1ldGVycyAmJiByQ29kZWMucGFyYW1ldGVycy5hcHQpIHtcclxuICAgICAgICAgIC8vIGZvciBSVFggd2UgbmVlZCB0byBmaW5kIHRoZSBsb2NhbCBydHggdGhhdCBoYXMgYSBhcHRcclxuICAgICAgICAgIC8vIHdoaWNoIHBvaW50cyB0byB0aGUgc2FtZSBsb2NhbCBjb2RlYyBhcyB0aGUgcmVtb3RlIG9uZS5cclxuICAgICAgICAgIGlmICghcnR4Q2FwYWJpbGl0eU1hdGNoZXMobENvZGVjLCByQ29kZWMsXHJcbiAgICAgICAgICAgICAgbG9jYWxDYXBhYmlsaXRpZXMuY29kZWNzLCByZW1vdGVDYXBhYmlsaXRpZXMuY29kZWNzKSkge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgckNvZGVjID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShyQ29kZWMpKTsgLy8gZGVlcGNvcHlcclxuICAgICAgICAvLyBudW1iZXIgb2YgY2hhbm5lbHMgaXMgdGhlIGhpZ2hlc3QgY29tbW9uIG51bWJlciBvZiBjaGFubmVsc1xyXG4gICAgICAgIHJDb2RlYy5udW1DaGFubmVscyA9IE1hdGgubWluKGxDb2RlYy5udW1DaGFubmVscyxcclxuICAgICAgICAgICAgckNvZGVjLm51bUNoYW5uZWxzKTtcclxuICAgICAgICAvLyBwdXNoIHJDb2RlYyBzbyB3ZSByZXBseSB3aXRoIG9mZmVyZXIgcGF5bG9hZCB0eXBlXHJcbiAgICAgICAgY29tbW9uQ2FwYWJpbGl0aWVzLmNvZGVjcy5wdXNoKHJDb2RlYyk7XHJcblxyXG4gICAgICAgIC8vIGRldGVybWluZSBjb21tb24gZmVlZGJhY2sgbWVjaGFuaXNtc1xyXG4gICAgICAgIHJDb2RlYy5ydGNwRmVlZGJhY2sgPSByQ29kZWMucnRjcEZlZWRiYWNrLmZpbHRlcihmdW5jdGlvbihmYikge1xyXG4gICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBsQ29kZWMucnRjcEZlZWRiYWNrLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIGlmIChsQ29kZWMucnRjcEZlZWRiYWNrW2pdLnR5cGUgPT09IGZiLnR5cGUgJiZcclxuICAgICAgICAgICAgICAgIGxDb2RlYy5ydGNwRmVlZGJhY2tbal0ucGFyYW1ldGVyID09PSBmYi5wYXJhbWV0ZXIpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIEZJWE1FOiBhbHNvIG5lZWQgdG8gZGV0ZXJtaW5lIC5wYXJhbWV0ZXJzXHJcbiAgICAgICAgLy8gIHNlZSBodHRwczovL2dpdGh1Yi5jb20vb3BlbnBlZXIvb3J0Yy9pc3N1ZXMvNTY5XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgbG9jYWxDYXBhYmlsaXRpZXMuaGVhZGVyRXh0ZW5zaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGxIZWFkZXJFeHRlbnNpb24pIHtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVtb3RlQ2FwYWJpbGl0aWVzLmhlYWRlckV4dGVuc2lvbnMubGVuZ3RoO1xyXG4gICAgICAgICBpKyspIHtcclxuICAgICAgdmFyIHJIZWFkZXJFeHRlbnNpb24gPSByZW1vdGVDYXBhYmlsaXRpZXMuaGVhZGVyRXh0ZW5zaW9uc1tpXTtcclxuICAgICAgaWYgKGxIZWFkZXJFeHRlbnNpb24udXJpID09PSBySGVhZGVyRXh0ZW5zaW9uLnVyaSkge1xyXG4gICAgICAgIGNvbW1vbkNhcGFiaWxpdGllcy5oZWFkZXJFeHRlbnNpb25zLnB1c2gockhlYWRlckV4dGVuc2lvbik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gRklYTUU6IGZlY01lY2hhbmlzbXNcclxuICByZXR1cm4gY29tbW9uQ2FwYWJpbGl0aWVzO1xyXG59XHJcblxyXG4vLyBpcyBhY3Rpb249c2V0TG9jYWxEZXNjcmlwdGlvbiB3aXRoIHR5cGUgYWxsb3dlZCBpbiBzaWduYWxpbmdTdGF0ZVxyXG5mdW5jdGlvbiBpc0FjdGlvbkFsbG93ZWRJblNpZ25hbGluZ1N0YXRlKGFjdGlvbiwgdHlwZSwgc2lnbmFsaW5nU3RhdGUpIHtcclxuICByZXR1cm4ge1xyXG4gICAgb2ZmZXI6IHtcclxuICAgICAgc2V0TG9jYWxEZXNjcmlwdGlvbjogWydzdGFibGUnLCAnaGF2ZS1sb2NhbC1vZmZlciddLFxyXG4gICAgICBzZXRSZW1vdGVEZXNjcmlwdGlvbjogWydzdGFibGUnLCAnaGF2ZS1yZW1vdGUtb2ZmZXInXVxyXG4gICAgfSxcclxuICAgIGFuc3dlcjoge1xyXG4gICAgICBzZXRMb2NhbERlc2NyaXB0aW9uOiBbJ2hhdmUtcmVtb3RlLW9mZmVyJywgJ2hhdmUtbG9jYWwtcHJhbnN3ZXInXSxcclxuICAgICAgc2V0UmVtb3RlRGVzY3JpcHRpb246IFsnaGF2ZS1sb2NhbC1vZmZlcicsICdoYXZlLXJlbW90ZS1wcmFuc3dlciddXHJcbiAgICB9XHJcbiAgfVt0eXBlXVthY3Rpb25dLmluZGV4T2Yoc2lnbmFsaW5nU3RhdGUpICE9PSAtMTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWF5YmVBZGRDYW5kaWRhdGUoaWNlVHJhbnNwb3J0LCBjYW5kaWRhdGUpIHtcclxuICAvLyBFZGdlJ3MgaW50ZXJuYWwgcmVwcmVzZW50YXRpb24gYWRkcyBzb21lIGZpZWxkcyB0aGVyZWZvcmVcclxuICAvLyBub3QgYWxsIGZpZWxk0ZUgYXJlIHRha2VuIGludG8gYWNjb3VudC5cclxuICB2YXIgYWxyZWFkeUFkZGVkID0gaWNlVHJhbnNwb3J0LmdldFJlbW90ZUNhbmRpZGF0ZXMoKVxyXG4gICAgICAuZmluZChmdW5jdGlvbihyZW1vdGVDYW5kaWRhdGUpIHtcclxuICAgICAgICByZXR1cm4gY2FuZGlkYXRlLmZvdW5kYXRpb24gPT09IHJlbW90ZUNhbmRpZGF0ZS5mb3VuZGF0aW9uICYmXHJcbiAgICAgICAgICAgIGNhbmRpZGF0ZS5pcCA9PT0gcmVtb3RlQ2FuZGlkYXRlLmlwICYmXHJcbiAgICAgICAgICAgIGNhbmRpZGF0ZS5wb3J0ID09PSByZW1vdGVDYW5kaWRhdGUucG9ydCAmJlxyXG4gICAgICAgICAgICBjYW5kaWRhdGUucHJpb3JpdHkgPT09IHJlbW90ZUNhbmRpZGF0ZS5wcmlvcml0eSAmJlxyXG4gICAgICAgICAgICBjYW5kaWRhdGUucHJvdG9jb2wgPT09IHJlbW90ZUNhbmRpZGF0ZS5wcm90b2NvbCAmJlxyXG4gICAgICAgICAgICBjYW5kaWRhdGUudHlwZSA9PT0gcmVtb3RlQ2FuZGlkYXRlLnR5cGU7XHJcbiAgICAgIH0pO1xyXG4gIGlmICghYWxyZWFkeUFkZGVkKSB7XHJcbiAgICBpY2VUcmFuc3BvcnQuYWRkUmVtb3RlQ2FuZGlkYXRlKGNhbmRpZGF0ZSk7XHJcbiAgfVxyXG4gIHJldHVybiAhYWxyZWFkeUFkZGVkO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gbWFrZUVycm9yKG5hbWUsIGRlc2NyaXB0aW9uKSB7XHJcbiAgdmFyIGUgPSBuZXcgRXJyb3IoZGVzY3JpcHRpb24pO1xyXG4gIGUubmFtZSA9IG5hbWU7XHJcbiAgLy8gbGVnYWN5IGVycm9yIGNvZGVzIGZyb20gaHR0cHM6Ly9oZXljYW0uZ2l0aHViLmlvL3dlYmlkbC8jaWRsLURPTUV4Y2VwdGlvbi1lcnJvci1uYW1lc1xyXG4gIGUuY29kZSA9IHtcclxuICAgIE5vdFN1cHBvcnRlZEVycm9yOiA5LFxyXG4gICAgSW52YWxpZFN0YXRlRXJyb3I6IDExLFxyXG4gICAgSW52YWxpZEFjY2Vzc0Vycm9yOiAxNSxcclxuICAgIFR5cGVFcnJvcjogdW5kZWZpbmVkLFxyXG4gICAgT3BlcmF0aW9uRXJyb3I6IHVuZGVmaW5lZFxyXG4gIH1bbmFtZV07XHJcbiAgcmV0dXJuIGU7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24od2luZG93LCBlZGdlVmVyc2lvbikge1xyXG4gIC8vIGh0dHBzOi8vdzNjLmdpdGh1Yi5pby9tZWRpYWNhcHR1cmUtbWFpbi8jbWVkaWFzdHJlYW1cclxuICAvLyBIZWxwZXIgZnVuY3Rpb24gdG8gYWRkIHRoZSB0cmFjayB0byB0aGUgc3RyZWFtIGFuZFxyXG4gIC8vIGRpc3BhdGNoIHRoZSBldmVudCBvdXJzZWx2ZXMuXHJcbiAgZnVuY3Rpb24gYWRkVHJhY2tUb1N0cmVhbUFuZEZpcmVFdmVudCh0cmFjaywgc3RyZWFtKSB7XHJcbiAgICBzdHJlYW0uYWRkVHJhY2sodHJhY2spO1xyXG4gICAgc3RyZWFtLmRpc3BhdGNoRXZlbnQobmV3IHdpbmRvdy5NZWRpYVN0cmVhbVRyYWNrRXZlbnQoJ2FkZHRyYWNrJyxcclxuICAgICAgICB7dHJhY2s6IHRyYWNrfSkpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVtb3ZlVHJhY2tGcm9tU3RyZWFtQW5kRmlyZUV2ZW50KHRyYWNrLCBzdHJlYW0pIHtcclxuICAgIHN0cmVhbS5yZW1vdmVUcmFjayh0cmFjayk7XHJcbiAgICBzdHJlYW0uZGlzcGF0Y2hFdmVudChuZXcgd2luZG93Lk1lZGlhU3RyZWFtVHJhY2tFdmVudCgncmVtb3ZldHJhY2snLFxyXG4gICAgICAgIHt0cmFjazogdHJhY2t9KSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBmaXJlQWRkVHJhY2socGMsIHRyYWNrLCByZWNlaXZlciwgc3RyZWFtcykge1xyXG4gICAgdmFyIHRyYWNrRXZlbnQgPSBuZXcgRXZlbnQoJ3RyYWNrJyk7XHJcbiAgICB0cmFja0V2ZW50LnRyYWNrID0gdHJhY2s7XHJcbiAgICB0cmFja0V2ZW50LnJlY2VpdmVyID0gcmVjZWl2ZXI7XHJcbiAgICB0cmFja0V2ZW50LnRyYW5zY2VpdmVyID0ge3JlY2VpdmVyOiByZWNlaXZlcn07XHJcbiAgICB0cmFja0V2ZW50LnN0cmVhbXMgPSBzdHJlYW1zO1xyXG4gICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgIHBjLl9kaXNwYXRjaEV2ZW50KCd0cmFjaycsIHRyYWNrRXZlbnQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB2YXIgUlRDUGVlckNvbm5lY3Rpb24gPSBmdW5jdGlvbihjb25maWcpIHtcclxuICAgIHZhciBwYyA9IHRoaXM7XHJcblxyXG4gICAgdmFyIF9ldmVudFRhcmdldCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICAgIFsnYWRkRXZlbnRMaXN0ZW5lcicsICdyZW1vdmVFdmVudExpc3RlbmVyJywgJ2Rpc3BhdGNoRXZlbnQnXVxyXG4gICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xyXG4gICAgICAgICAgcGNbbWV0aG9kXSA9IF9ldmVudFRhcmdldFttZXRob2RdLmJpbmQoX2V2ZW50VGFyZ2V0KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB0aGlzLmNhblRyaWNrbGVJY2VDYW5kaWRhdGVzID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLm5lZWROZWdvdGlhdGlvbiA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMubG9jYWxTdHJlYW1zID0gW107XHJcbiAgICB0aGlzLnJlbW90ZVN0cmVhbXMgPSBbXTtcclxuXHJcbiAgICB0aGlzLmxvY2FsRGVzY3JpcHRpb24gPSBudWxsO1xyXG4gICAgdGhpcy5yZW1vdGVEZXNjcmlwdGlvbiA9IG51bGw7XHJcblxyXG4gICAgdGhpcy5zaWduYWxpbmdTdGF0ZSA9ICdzdGFibGUnO1xyXG4gICAgdGhpcy5pY2VDb25uZWN0aW9uU3RhdGUgPSAnbmV3JztcclxuICAgIHRoaXMuY29ubmVjdGlvblN0YXRlID0gJ25ldyc7XHJcbiAgICB0aGlzLmljZUdhdGhlcmluZ1N0YXRlID0gJ25ldyc7XHJcblxyXG4gICAgY29uZmlnID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShjb25maWcgfHwge30pKTtcclxuXHJcbiAgICB0aGlzLnVzaW5nQnVuZGxlID0gY29uZmlnLmJ1bmRsZVBvbGljeSA9PT0gJ21heC1idW5kbGUnO1xyXG4gICAgaWYgKGNvbmZpZy5ydGNwTXV4UG9saWN5ID09PSAnbmVnb3RpYXRlJykge1xyXG4gICAgICB0aHJvdyhtYWtlRXJyb3IoJ05vdFN1cHBvcnRlZEVycm9yJyxcclxuICAgICAgICAgICdydGNwTXV4UG9saWN5IFxcJ25lZ290aWF0ZVxcJyBpcyBub3Qgc3VwcG9ydGVkJykpO1xyXG4gICAgfSBlbHNlIGlmICghY29uZmlnLnJ0Y3BNdXhQb2xpY3kpIHtcclxuICAgICAgY29uZmlnLnJ0Y3BNdXhQb2xpY3kgPSAncmVxdWlyZSc7XHJcbiAgICB9XHJcblxyXG4gICAgc3dpdGNoIChjb25maWcuaWNlVHJhbnNwb3J0UG9saWN5KSB7XHJcbiAgICAgIGNhc2UgJ2FsbCc6XHJcbiAgICAgIGNhc2UgJ3JlbGF5JzpcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBjb25maWcuaWNlVHJhbnNwb3J0UG9saWN5ID0gJ2FsbCc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgc3dpdGNoIChjb25maWcuYnVuZGxlUG9saWN5KSB7XHJcbiAgICAgIGNhc2UgJ2JhbGFuY2VkJzpcclxuICAgICAgY2FzZSAnbWF4LWNvbXBhdCc6XHJcbiAgICAgIGNhc2UgJ21heC1idW5kbGUnOlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGNvbmZpZy5idW5kbGVQb2xpY3kgPSAnYmFsYW5jZWQnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbmZpZy5pY2VTZXJ2ZXJzID0gZmlsdGVySWNlU2VydmVycyhjb25maWcuaWNlU2VydmVycyB8fCBbXSwgZWRnZVZlcnNpb24pO1xyXG5cclxuICAgIHRoaXMuX2ljZUdhdGhlcmVycyA9IFtdO1xyXG4gICAgaWYgKGNvbmZpZy5pY2VDYW5kaWRhdGVQb29sU2l6ZSkge1xyXG4gICAgICBmb3IgKHZhciBpID0gY29uZmlnLmljZUNhbmRpZGF0ZVBvb2xTaXplOyBpID4gMDsgaS0tKSB7XHJcbiAgICAgICAgdGhpcy5faWNlR2F0aGVyZXJzLnB1c2gobmV3IHdpbmRvdy5SVENJY2VHYXRoZXJlcih7XHJcbiAgICAgICAgICBpY2VTZXJ2ZXJzOiBjb25maWcuaWNlU2VydmVycyxcclxuICAgICAgICAgIGdhdGhlclBvbGljeTogY29uZmlnLmljZVRyYW5zcG9ydFBvbGljeVxyXG4gICAgICAgIH0pKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uZmlnLmljZUNhbmRpZGF0ZVBvb2xTaXplID0gMDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XHJcblxyXG4gICAgLy8gcGVyLXRyYWNrIGljZUdhdGhlcnMsIGljZVRyYW5zcG9ydHMsIGR0bHNUcmFuc3BvcnRzLCBydHBTZW5kZXJzLCAuLi5cclxuICAgIC8vIGV2ZXJ5dGhpbmcgdGhhdCBpcyBuZWVkZWQgdG8gZGVzY3JpYmUgYSBTRFAgbS1saW5lLlxyXG4gICAgdGhpcy50cmFuc2NlaXZlcnMgPSBbXTtcclxuXHJcbiAgICB0aGlzLl9zZHBTZXNzaW9uSWQgPSBTRFBVdGlscy5nZW5lcmF0ZVNlc3Npb25JZCgpO1xyXG4gICAgdGhpcy5fc2RwU2Vzc2lvblZlcnNpb24gPSAwO1xyXG5cclxuICAgIHRoaXMuX2R0bHNSb2xlID0gdW5kZWZpbmVkOyAvLyByb2xlIGZvciBhPXNldHVwIHRvIHVzZSBpbiBhbnN3ZXJzLlxyXG5cclxuICAgIHRoaXMuX2lzQ2xvc2VkID0gZmFsc2U7XHJcbiAgfTtcclxuXHJcbiAgLy8gc2V0IHVwIGV2ZW50IGhhbmRsZXJzIG9uIHByb3RvdHlwZVxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5vbmljZWNhbmRpZGF0ZSA9IG51bGw7XHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9uYWRkc3RyZWFtID0gbnVsbDtcclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub250cmFjayA9IG51bGw7XHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9ucmVtb3Zlc3RyZWFtID0gbnVsbDtcclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub25zaWduYWxpbmdzdGF0ZWNoYW5nZSA9IG51bGw7XHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9uaWNlY29ubmVjdGlvbnN0YXRlY2hhbmdlID0gbnVsbDtcclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub25jb25uZWN0aW9uc3RhdGVjaGFuZ2UgPSBudWxsO1xyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5vbmljZWdhdGhlcmluZ3N0YXRlY2hhbmdlID0gbnVsbDtcclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub25uZWdvdGlhdGlvbm5lZWRlZCA9IG51bGw7XHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9uZGF0YWNoYW5uZWwgPSBudWxsO1xyXG5cclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX2Rpc3BhdGNoRXZlbnQgPSBmdW5jdGlvbihuYW1lLCBldmVudCkge1xyXG4gICAgaWYgKHRoaXMuX2lzQ2xvc2VkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbiAgICBpZiAodHlwZW9mIHRoaXNbJ29uJyArIG5hbWVdID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHRoaXNbJ29uJyArIG5hbWVdKGV2ZW50KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX2VtaXRHYXRoZXJpbmdTdGF0ZUNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdpY2VnYXRoZXJpbmdzdGF0ZWNoYW5nZScpO1xyXG4gICAgdGhpcy5fZGlzcGF0Y2hFdmVudCgnaWNlZ2F0aGVyaW5nc3RhdGVjaGFuZ2UnLCBldmVudCk7XHJcbiAgfTtcclxuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldENvbmZpZ3VyYXRpb24gPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLl9jb25maWc7XHJcbiAgfTtcclxuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldExvY2FsU3RyZWFtcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubG9jYWxTdHJlYW1zO1xyXG4gIH07XHJcblxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRSZW1vdGVTdHJlYW1zID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5yZW1vdGVTdHJlYW1zO1xyXG4gIH07XHJcblxyXG4gIC8vIGludGVybmFsIGhlbHBlciB0byBjcmVhdGUgYSB0cmFuc2NlaXZlciBvYmplY3QuXHJcbiAgLy8gKHdoaWNoIGlzIG5vdCB5ZXQgdGhlIHNhbWUgYXMgdGhlIFdlYlJUQyAxLjAgdHJhbnNjZWl2ZXIpXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl9jcmVhdGVUcmFuc2NlaXZlciA9IGZ1bmN0aW9uKGtpbmQsIGRvTm90QWRkKSB7XHJcbiAgICB2YXIgaGFzQnVuZGxlVHJhbnNwb3J0ID0gdGhpcy50cmFuc2NlaXZlcnMubGVuZ3RoID4gMDtcclxuICAgIHZhciB0cmFuc2NlaXZlciA9IHtcclxuICAgICAgdHJhY2s6IG51bGwsXHJcbiAgICAgIGljZUdhdGhlcmVyOiBudWxsLFxyXG4gICAgICBpY2VUcmFuc3BvcnQ6IG51bGwsXHJcbiAgICAgIGR0bHNUcmFuc3BvcnQ6IG51bGwsXHJcbiAgICAgIGxvY2FsQ2FwYWJpbGl0aWVzOiBudWxsLFxyXG4gICAgICByZW1vdGVDYXBhYmlsaXRpZXM6IG51bGwsXHJcbiAgICAgIHJ0cFNlbmRlcjogbnVsbCxcclxuICAgICAgcnRwUmVjZWl2ZXI6IG51bGwsXHJcbiAgICAgIGtpbmQ6IGtpbmQsXHJcbiAgICAgIG1pZDogbnVsbCxcclxuICAgICAgc2VuZEVuY29kaW5nUGFyYW1ldGVyczogbnVsbCxcclxuICAgICAgcmVjdkVuY29kaW5nUGFyYW1ldGVyczogbnVsbCxcclxuICAgICAgc3RyZWFtOiBudWxsLFxyXG4gICAgICBhc3NvY2lhdGVkUmVtb3RlTWVkaWFTdHJlYW1zOiBbXSxcclxuICAgICAgd2FudFJlY2VpdmU6IHRydWVcclxuICAgIH07XHJcbiAgICBpZiAodGhpcy51c2luZ0J1bmRsZSAmJiBoYXNCdW5kbGVUcmFuc3BvcnQpIHtcclxuICAgICAgdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0ID0gdGhpcy50cmFuc2NlaXZlcnNbMF0uaWNlVHJhbnNwb3J0O1xyXG4gICAgICB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0ID0gdGhpcy50cmFuc2NlaXZlcnNbMF0uZHRsc1RyYW5zcG9ydDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciB0cmFuc3BvcnRzID0gdGhpcy5fY3JlYXRlSWNlQW5kRHRsc1RyYW5zcG9ydHMoKTtcclxuICAgICAgdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0ID0gdHJhbnNwb3J0cy5pY2VUcmFuc3BvcnQ7XHJcbiAgICAgIHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQgPSB0cmFuc3BvcnRzLmR0bHNUcmFuc3BvcnQ7XHJcbiAgICB9XHJcbiAgICBpZiAoIWRvTm90QWRkKSB7XHJcbiAgICAgIHRoaXMudHJhbnNjZWl2ZXJzLnB1c2godHJhbnNjZWl2ZXIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRyYW5zY2VpdmVyO1xyXG4gIH07XHJcblxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjayA9IGZ1bmN0aW9uKHRyYWNrLCBzdHJlYW0pIHtcclxuICAgIGlmICh0aGlzLl9pc0Nsb3NlZCkge1xyXG4gICAgICB0aHJvdyBtYWtlRXJyb3IoJ0ludmFsaWRTdGF0ZUVycm9yJyxcclxuICAgICAgICAgICdBdHRlbXB0ZWQgdG8gY2FsbCBhZGRUcmFjayBvbiBhIGNsb3NlZCBwZWVyY29ubmVjdGlvbi4nKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgYWxyZWFkeUV4aXN0cyA9IHRoaXMudHJhbnNjZWl2ZXJzLmZpbmQoZnVuY3Rpb24ocykge1xyXG4gICAgICByZXR1cm4gcy50cmFjayA9PT0gdHJhY2s7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICB0aHJvdyBtYWtlRXJyb3IoJ0ludmFsaWRBY2Nlc3NFcnJvcicsICdUcmFjayBhbHJlYWR5IGV4aXN0cy4nKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgdHJhbnNjZWl2ZXI7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudHJhbnNjZWl2ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmICghdGhpcy50cmFuc2NlaXZlcnNbaV0udHJhY2sgJiZcclxuICAgICAgICAgIHRoaXMudHJhbnNjZWl2ZXJzW2ldLmtpbmQgPT09IHRyYWNrLmtpbmQpIHtcclxuICAgICAgICB0cmFuc2NlaXZlciA9IHRoaXMudHJhbnNjZWl2ZXJzW2ldO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoIXRyYW5zY2VpdmVyKSB7XHJcbiAgICAgIHRyYW5zY2VpdmVyID0gdGhpcy5fY3JlYXRlVHJhbnNjZWl2ZXIodHJhY2sua2luZCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fbWF5YmVGaXJlTmVnb3RpYXRpb25OZWVkZWQoKTtcclxuXHJcbiAgICBpZiAodGhpcy5sb2NhbFN0cmVhbXMuaW5kZXhPZihzdHJlYW0pID09PSAtMSkge1xyXG4gICAgICB0aGlzLmxvY2FsU3RyZWFtcy5wdXNoKHN0cmVhbSk7XHJcbiAgICB9XHJcblxyXG4gICAgdHJhbnNjZWl2ZXIudHJhY2sgPSB0cmFjaztcclxuICAgIHRyYW5zY2VpdmVyLnN0cmVhbSA9IHN0cmVhbTtcclxuICAgIHRyYW5zY2VpdmVyLnJ0cFNlbmRlciA9IG5ldyB3aW5kb3cuUlRDUnRwU2VuZGVyKHRyYWNrLFxyXG4gICAgICAgIHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQpO1xyXG4gICAgcmV0dXJuIHRyYW5zY2VpdmVyLnJ0cFNlbmRlcjtcclxuICB9O1xyXG5cclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgaWYgKGVkZ2VWZXJzaW9uID49IDE1MDI1KSB7XHJcbiAgICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XHJcbiAgICAgICAgcGMuYWRkVHJhY2sodHJhY2ssIHN0cmVhbSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gQ2xvbmUgaXMgbmVjZXNzYXJ5IGZvciBsb2NhbCBkZW1vcyBtb3N0bHksIGF0dGFjaGluZyBkaXJlY3RseVxyXG4gICAgICAvLyB0byB0d28gZGlmZmVyZW50IHNlbmRlcnMgZG9lcyBub3Qgd29yayAoYnVpbGQgMTA1NDcpLlxyXG4gICAgICAvLyBGaXhlZCBpbiAxNTAyNSAob3IgZWFybGllcilcclxuICAgICAgdmFyIGNsb25lZFN0cmVhbSA9IHN0cmVhbS5jbG9uZSgpO1xyXG4gICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaywgaWR4KSB7XHJcbiAgICAgICAgdmFyIGNsb25lZFRyYWNrID0gY2xvbmVkU3RyZWFtLmdldFRyYWNrcygpW2lkeF07XHJcbiAgICAgICAgdHJhY2suYWRkRXZlbnRMaXN0ZW5lcignZW5hYmxlZCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICBjbG9uZWRUcmFjay5lbmFibGVkID0gZXZlbnQuZW5hYmxlZDtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICAgIGNsb25lZFN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XHJcbiAgICAgICAgcGMuYWRkVHJhY2sodHJhY2ssIGNsb25lZFN0cmVhbSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVUcmFjayA9IGZ1bmN0aW9uKHNlbmRlcikge1xyXG4gICAgaWYgKHRoaXMuX2lzQ2xvc2VkKSB7XHJcbiAgICAgIHRocm93IG1ha2VFcnJvcignSW52YWxpZFN0YXRlRXJyb3InLFxyXG4gICAgICAgICAgJ0F0dGVtcHRlZCB0byBjYWxsIHJlbW92ZVRyYWNrIG9uIGEgY2xvc2VkIHBlZXJjb25uZWN0aW9uLicpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghKHNlbmRlciBpbnN0YW5jZW9mIHdpbmRvdy5SVENSdHBTZW5kZXIpKSB7XHJcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IDEgb2YgUlRDUGVlckNvbm5lY3Rpb24ucmVtb3ZlVHJhY2sgJyArXHJcbiAgICAgICAgICAnZG9lcyBub3QgaW1wbGVtZW50IGludGVyZmFjZSBSVENSdHBTZW5kZXIuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHRyYW5zY2VpdmVyID0gdGhpcy50cmFuc2NlaXZlcnMuZmluZChmdW5jdGlvbih0KSB7XHJcbiAgICAgIHJldHVybiB0LnJ0cFNlbmRlciA9PT0gc2VuZGVyO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCF0cmFuc2NlaXZlcikge1xyXG4gICAgICB0aHJvdyBtYWtlRXJyb3IoJ0ludmFsaWRBY2Nlc3NFcnJvcicsXHJcbiAgICAgICAgICAnU2VuZGVyIHdhcyBub3QgY3JlYXRlZCBieSB0aGlzIGNvbm5lY3Rpb24uJyk7XHJcbiAgICB9XHJcbiAgICB2YXIgc3RyZWFtID0gdHJhbnNjZWl2ZXIuc3RyZWFtO1xyXG5cclxuICAgIHRyYW5zY2VpdmVyLnJ0cFNlbmRlci5zdG9wKCk7XHJcbiAgICB0cmFuc2NlaXZlci5ydHBTZW5kZXIgPSBudWxsO1xyXG4gICAgdHJhbnNjZWl2ZXIudHJhY2sgPSBudWxsO1xyXG4gICAgdHJhbnNjZWl2ZXIuc3RyZWFtID0gbnVsbDtcclxuXHJcbiAgICAvLyByZW1vdmUgdGhlIHN0cmVhbSBmcm9tIHRoZSBzZXQgb2YgbG9jYWwgc3RyZWFtc1xyXG4gICAgdmFyIGxvY2FsU3RyZWFtcyA9IHRoaXMudHJhbnNjZWl2ZXJzLm1hcChmdW5jdGlvbih0KSB7XHJcbiAgICAgIHJldHVybiB0LnN0cmVhbTtcclxuICAgIH0pO1xyXG4gICAgaWYgKGxvY2FsU3RyZWFtcy5pbmRleE9mKHN0cmVhbSkgPT09IC0xICYmXHJcbiAgICAgICAgdGhpcy5sb2NhbFN0cmVhbXMuaW5kZXhPZihzdHJlYW0pID4gLTEpIHtcclxuICAgICAgdGhpcy5sb2NhbFN0cmVhbXMuc3BsaWNlKHRoaXMubG9jYWxTdHJlYW1zLmluZGV4T2Yoc3RyZWFtKSwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fbWF5YmVGaXJlTmVnb3RpYXRpb25OZWVkZWQoKTtcclxuICB9O1xyXG5cclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcclxuICAgICAgdmFyIHNlbmRlciA9IHBjLmdldFNlbmRlcnMoKS5maW5kKGZ1bmN0aW9uKHMpIHtcclxuICAgICAgICByZXR1cm4gcy50cmFjayA9PT0gdHJhY2s7XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAoc2VuZGVyKSB7XHJcbiAgICAgICAgcGMucmVtb3ZlVHJhY2soc2VuZGVyKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFNlbmRlcnMgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLnRyYW5zY2VpdmVycy5maWx0ZXIoZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcclxuICAgICAgcmV0dXJuICEhdHJhbnNjZWl2ZXIucnRwU2VuZGVyO1xyXG4gICAgfSlcclxuICAgIC5tYXAoZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcclxuICAgICAgcmV0dXJuIHRyYW5zY2VpdmVyLnJ0cFNlbmRlcjtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRSZWNlaXZlcnMgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLnRyYW5zY2VpdmVycy5maWx0ZXIoZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcclxuICAgICAgcmV0dXJuICEhdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXI7XHJcbiAgICB9KVxyXG4gICAgLm1hcChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xyXG4gICAgICByZXR1cm4gdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXI7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl9jcmVhdGVJY2VHYXRoZXJlciA9IGZ1bmN0aW9uKHNkcE1MaW5lSW5kZXgsXHJcbiAgICAgIHVzaW5nQnVuZGxlKSB7XHJcbiAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgaWYgKHVzaW5nQnVuZGxlICYmIHNkcE1MaW5lSW5kZXggPiAwKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnRyYW5zY2VpdmVyc1swXS5pY2VHYXRoZXJlcjtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5faWNlR2F0aGVyZXJzLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5faWNlR2F0aGVyZXJzLnNoaWZ0KCk7XHJcbiAgICB9XHJcbiAgICB2YXIgaWNlR2F0aGVyZXIgPSBuZXcgd2luZG93LlJUQ0ljZUdhdGhlcmVyKHtcclxuICAgICAgaWNlU2VydmVyczogdGhpcy5fY29uZmlnLmljZVNlcnZlcnMsXHJcbiAgICAgIGdhdGhlclBvbGljeTogdGhpcy5fY29uZmlnLmljZVRyYW5zcG9ydFBvbGljeVxyXG4gICAgfSk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoaWNlR2F0aGVyZXIsICdzdGF0ZScsXHJcbiAgICAgICAge3ZhbHVlOiAnbmV3Jywgd3JpdGFibGU6IHRydWV9XHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmJ1ZmZlcmVkQ2FuZGlkYXRlRXZlbnRzID0gW107XHJcbiAgICB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5idWZmZXJDYW5kaWRhdGVzID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgdmFyIGVuZCA9ICFldmVudC5jYW5kaWRhdGUgfHwgT2JqZWN0LmtleXMoZXZlbnQuY2FuZGlkYXRlKS5sZW5ndGggPT09IDA7XHJcbiAgICAgIC8vIHBvbHlmaWxsIHNpbmNlIFJUQ0ljZUdhdGhlcmVyLnN0YXRlIGlzIG5vdCBpbXBsZW1lbnRlZCBpblxyXG4gICAgICAvLyBFZGdlIDEwNTQ3IHlldC5cclxuICAgICAgaWNlR2F0aGVyZXIuc3RhdGUgPSBlbmQgPyAnY29tcGxldGVkJyA6ICdnYXRoZXJpbmcnO1xyXG4gICAgICBpZiAocGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmJ1ZmZlcmVkQ2FuZGlkYXRlRXZlbnRzICE9PSBudWxsKSB7XHJcbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmJ1ZmZlcmVkQ2FuZGlkYXRlRXZlbnRzLnB1c2goZXZlbnQpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgaWNlR2F0aGVyZXIuYWRkRXZlbnRMaXN0ZW5lcignbG9jYWxjYW5kaWRhdGUnLFxyXG4gICAgICB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5idWZmZXJDYW5kaWRhdGVzKTtcclxuICAgIHJldHVybiBpY2VHYXRoZXJlcjtcclxuICB9O1xyXG5cclxuICAvLyBzdGFydCBnYXRoZXJpbmcgZnJvbSBhbiBSVENJY2VHYXRoZXJlci5cclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX2dhdGhlciA9IGZ1bmN0aW9uKG1pZCwgc2RwTUxpbmVJbmRleCkge1xyXG4gICAgdmFyIHBjID0gdGhpcztcclxuICAgIHZhciBpY2VHYXRoZXJlciA9IHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmljZUdhdGhlcmVyO1xyXG4gICAgaWYgKGljZUdhdGhlcmVyLm9ubG9jYWxjYW5kaWRhdGUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdmFyIGJ1ZmZlcmVkQ2FuZGlkYXRlRXZlbnRzID1cclxuICAgICAgdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uYnVmZmVyZWRDYW5kaWRhdGVFdmVudHM7XHJcbiAgICB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5idWZmZXJlZENhbmRpZGF0ZUV2ZW50cyA9IG51bGw7XHJcbiAgICBpY2VHYXRoZXJlci5yZW1vdmVFdmVudExpc3RlbmVyKCdsb2NhbGNhbmRpZGF0ZScsXHJcbiAgICAgIHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmJ1ZmZlckNhbmRpZGF0ZXMpO1xyXG4gICAgaWNlR2F0aGVyZXIub25sb2NhbGNhbmRpZGF0ZSA9IGZ1bmN0aW9uKGV2dCkge1xyXG4gICAgICBpZiAocGMudXNpbmdCdW5kbGUgJiYgc2RwTUxpbmVJbmRleCA+IDApIHtcclxuICAgICAgICAvLyBpZiB3ZSBrbm93IHRoYXQgd2UgdXNlIGJ1bmRsZSB3ZSBjYW4gZHJvcCBjYW5kaWRhdGVzIHdpdGhcclxuICAgICAgICAvLyDRlWRwTUxpbmVJbmRleCA+IDAuIElmIHdlIGRvbid0IGRvIHRoaXMgdGhlbiBvdXIgc3RhdGUgZ2V0c1xyXG4gICAgICAgIC8vIGNvbmZ1c2VkIHNpbmNlIHdlIGRpc3Bvc2UgdGhlIGV4dHJhIGljZSBnYXRoZXJlci5cclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdpY2VjYW5kaWRhdGUnKTtcclxuICAgICAgZXZlbnQuY2FuZGlkYXRlID0ge3NkcE1pZDogbWlkLCBzZHBNTGluZUluZGV4OiBzZHBNTGluZUluZGV4fTtcclxuXHJcbiAgICAgIHZhciBjYW5kID0gZXZ0LmNhbmRpZGF0ZTtcclxuICAgICAgLy8gRWRnZSBlbWl0cyBhbiBlbXB0eSBvYmplY3QgZm9yIFJUQ0ljZUNhbmRpZGF0ZUNvbXBsZXRl4oClXHJcbiAgICAgIHZhciBlbmQgPSAhY2FuZCB8fCBPYmplY3Qua2V5cyhjYW5kKS5sZW5ndGggPT09IDA7XHJcbiAgICAgIGlmIChlbmQpIHtcclxuICAgICAgICAvLyBwb2x5ZmlsbCBzaW5jZSBSVENJY2VHYXRoZXJlci5zdGF0ZSBpcyBub3QgaW1wbGVtZW50ZWQgaW5cclxuICAgICAgICAvLyBFZGdlIDEwNTQ3IHlldC5cclxuICAgICAgICBpZiAoaWNlR2F0aGVyZXIuc3RhdGUgPT09ICduZXcnIHx8IGljZUdhdGhlcmVyLnN0YXRlID09PSAnZ2F0aGVyaW5nJykge1xyXG4gICAgICAgICAgaWNlR2F0aGVyZXIuc3RhdGUgPSAnY29tcGxldGVkJztcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGljZUdhdGhlcmVyLnN0YXRlID09PSAnbmV3Jykge1xyXG4gICAgICAgICAgaWNlR2F0aGVyZXIuc3RhdGUgPSAnZ2F0aGVyaW5nJztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUlRDSWNlQ2FuZGlkYXRlIGRvZXNuJ3QgaGF2ZSBhIGNvbXBvbmVudCwgbmVlZHMgdG8gYmUgYWRkZWRcclxuICAgICAgICBjYW5kLmNvbXBvbmVudCA9IDE7XHJcbiAgICAgICAgLy8gYWxzbyB0aGUgdXNlcm5hbWVGcmFnbWVudC4gVE9ETzogdXBkYXRlIFNEUCB0byB0YWtlIGJvdGggdmFyaWFudHMuXHJcbiAgICAgICAgY2FuZC51ZnJhZyA9IGljZUdhdGhlcmVyLmdldExvY2FsUGFyYW1ldGVycygpLnVzZXJuYW1lRnJhZ21lbnQ7XHJcblxyXG4gICAgICAgIHZhciBzZXJpYWxpemVkQ2FuZGlkYXRlID0gU0RQVXRpbHMud3JpdGVDYW5kaWRhdGUoY2FuZCk7XHJcbiAgICAgICAgZXZlbnQuY2FuZGlkYXRlID0gT2JqZWN0LmFzc2lnbihldmVudC5jYW5kaWRhdGUsXHJcbiAgICAgICAgICAgIFNEUFV0aWxzLnBhcnNlQ2FuZGlkYXRlKHNlcmlhbGl6ZWRDYW5kaWRhdGUpKTtcclxuXHJcbiAgICAgICAgZXZlbnQuY2FuZGlkYXRlLmNhbmRpZGF0ZSA9IHNlcmlhbGl6ZWRDYW5kaWRhdGU7XHJcbiAgICAgICAgZXZlbnQuY2FuZGlkYXRlLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY2FuZGlkYXRlOiBldmVudC5jYW5kaWRhdGUuY2FuZGlkYXRlLFxyXG4gICAgICAgICAgICBzZHBNaWQ6IGV2ZW50LmNhbmRpZGF0ZS5zZHBNaWQsXHJcbiAgICAgICAgICAgIHNkcE1MaW5lSW5kZXg6IGV2ZW50LmNhbmRpZGF0ZS5zZHBNTGluZUluZGV4LFxyXG4gICAgICAgICAgICB1c2VybmFtZUZyYWdtZW50OiBldmVudC5jYW5kaWRhdGUudXNlcm5hbWVGcmFnbWVudFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyB1cGRhdGUgbG9jYWwgZGVzY3JpcHRpb24uXHJcbiAgICAgIHZhciBzZWN0aW9ucyA9IFNEUFV0aWxzLmdldE1lZGlhU2VjdGlvbnMocGMubG9jYWxEZXNjcmlwdGlvbi5zZHApO1xyXG4gICAgICBpZiAoIWVuZCkge1xyXG4gICAgICAgIHNlY3Rpb25zW2V2ZW50LmNhbmRpZGF0ZS5zZHBNTGluZUluZGV4XSArPVxyXG4gICAgICAgICAgICAnYT0nICsgZXZlbnQuY2FuZGlkYXRlLmNhbmRpZGF0ZSArICdcXHJcXG4nO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNlY3Rpb25zW2V2ZW50LmNhbmRpZGF0ZS5zZHBNTGluZUluZGV4XSArPVxyXG4gICAgICAgICAgICAnYT1lbmQtb2YtY2FuZGlkYXRlc1xcclxcbic7XHJcbiAgICAgIH1cclxuICAgICAgcGMubG9jYWxEZXNjcmlwdGlvbi5zZHAgPVxyXG4gICAgICAgICAgU0RQVXRpbHMuZ2V0RGVzY3JpcHRpb24ocGMubG9jYWxEZXNjcmlwdGlvbi5zZHApICtcclxuICAgICAgICAgIHNlY3Rpb25zLmpvaW4oJycpO1xyXG4gICAgICB2YXIgY29tcGxldGUgPSBwYy50cmFuc2NlaXZlcnMuZXZlcnkoZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcclxuICAgICAgICByZXR1cm4gdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIgJiZcclxuICAgICAgICAgICAgdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIuc3RhdGUgPT09ICdjb21wbGV0ZWQnO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChwYy5pY2VHYXRoZXJpbmdTdGF0ZSAhPT0gJ2dhdGhlcmluZycpIHtcclxuICAgICAgICBwYy5pY2VHYXRoZXJpbmdTdGF0ZSA9ICdnYXRoZXJpbmcnO1xyXG4gICAgICAgIHBjLl9lbWl0R2F0aGVyaW5nU3RhdGVDaGFuZ2UoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gRW1pdCBjYW5kaWRhdGUuIEFsc28gZW1pdCBudWxsIGNhbmRpZGF0ZSB3aGVuIGFsbCBnYXRoZXJlcnMgYXJlXHJcbiAgICAgIC8vIGNvbXBsZXRlLlxyXG4gICAgICBpZiAoIWVuZCkge1xyXG4gICAgICAgIHBjLl9kaXNwYXRjaEV2ZW50KCdpY2VjYW5kaWRhdGUnLCBldmVudCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNvbXBsZXRlKSB7XHJcbiAgICAgICAgcGMuX2Rpc3BhdGNoRXZlbnQoJ2ljZWNhbmRpZGF0ZScsIG5ldyBFdmVudCgnaWNlY2FuZGlkYXRlJykpO1xyXG4gICAgICAgIHBjLmljZUdhdGhlcmluZ1N0YXRlID0gJ2NvbXBsZXRlJztcclxuICAgICAgICBwYy5fZW1pdEdhdGhlcmluZ1N0YXRlQ2hhbmdlKCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy8gZW1pdCBhbHJlYWR5IGdhdGhlcmVkIGNhbmRpZGF0ZXMuXHJcbiAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgYnVmZmVyZWRDYW5kaWRhdGVFdmVudHMuZm9yRWFjaChmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWNlR2F0aGVyZXIub25sb2NhbGNhbmRpZGF0ZShlKTtcclxuICAgICAgfSk7XHJcbiAgICB9LCAwKTtcclxuICB9O1xyXG5cclxuICAvLyBDcmVhdGUgSUNFIHRyYW5zcG9ydCBhbmQgRFRMUyB0cmFuc3BvcnQuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl9jcmVhdGVJY2VBbmREdGxzVHJhbnNwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHBjID0gdGhpcztcclxuICAgIHZhciBpY2VUcmFuc3BvcnQgPSBuZXcgd2luZG93LlJUQ0ljZVRyYW5zcG9ydChudWxsKTtcclxuICAgIGljZVRyYW5zcG9ydC5vbmljZXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHBjLl91cGRhdGVJY2VDb25uZWN0aW9uU3RhdGUoKTtcclxuICAgICAgcGMuX3VwZGF0ZUNvbm5lY3Rpb25TdGF0ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgZHRsc1RyYW5zcG9ydCA9IG5ldyB3aW5kb3cuUlRDRHRsc1RyYW5zcG9ydChpY2VUcmFuc3BvcnQpO1xyXG4gICAgZHRsc1RyYW5zcG9ydC5vbmR0bHNzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBwYy5fdXBkYXRlQ29ubmVjdGlvblN0YXRlKCk7XHJcbiAgICB9O1xyXG4gICAgZHRsc1RyYW5zcG9ydC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIC8vIG9uZXJyb3IgZG9lcyBub3Qgc2V0IHN0YXRlIHRvIGZhaWxlZCBieSBpdHNlbGYuXHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkdGxzVHJhbnNwb3J0LCAnc3RhdGUnLFxyXG4gICAgICAgICAge3ZhbHVlOiAnZmFpbGVkJywgd3JpdGFibGU6IHRydWV9KTtcclxuICAgICAgcGMuX3VwZGF0ZUNvbm5lY3Rpb25TdGF0ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBpY2VUcmFuc3BvcnQ6IGljZVRyYW5zcG9ydCxcclxuICAgICAgZHRsc1RyYW5zcG9ydDogZHRsc1RyYW5zcG9ydFxyXG4gICAgfTtcclxuICB9O1xyXG5cclxuICAvLyBEZXN0cm95IElDRSBnYXRoZXJlciwgSUNFIHRyYW5zcG9ydCBhbmQgRFRMUyB0cmFuc3BvcnQuXHJcbiAgLy8gV2l0aG91dCB0cmlnZ2VyaW5nIHRoZSBjYWxsYmFja3MuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl9kaXNwb3NlSWNlQW5kRHRsc1RyYW5zcG9ydHMgPSBmdW5jdGlvbihcclxuICAgICAgc2RwTUxpbmVJbmRleCkge1xyXG4gICAgdmFyIGljZUdhdGhlcmVyID0gdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uaWNlR2F0aGVyZXI7XHJcbiAgICBpZiAoaWNlR2F0aGVyZXIpIHtcclxuICAgICAgZGVsZXRlIGljZUdhdGhlcmVyLm9ubG9jYWxjYW5kaWRhdGU7XHJcbiAgICAgIGRlbGV0ZSB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5pY2VHYXRoZXJlcjtcclxuICAgIH1cclxuICAgIHZhciBpY2VUcmFuc3BvcnQgPSB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5pY2VUcmFuc3BvcnQ7XHJcbiAgICBpZiAoaWNlVHJhbnNwb3J0KSB7XHJcbiAgICAgIGRlbGV0ZSBpY2VUcmFuc3BvcnQub25pY2VzdGF0ZWNoYW5nZTtcclxuICAgICAgZGVsZXRlIHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmljZVRyYW5zcG9ydDtcclxuICAgIH1cclxuICAgIHZhciBkdGxzVHJhbnNwb3J0ID0gdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uZHRsc1RyYW5zcG9ydDtcclxuICAgIGlmIChkdGxzVHJhbnNwb3J0KSB7XHJcbiAgICAgIGRlbGV0ZSBkdGxzVHJhbnNwb3J0Lm9uZHRsc3N0YXRlY2hhbmdlO1xyXG4gICAgICBkZWxldGUgZHRsc1RyYW5zcG9ydC5vbmVycm9yO1xyXG4gICAgICBkZWxldGUgdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uZHRsc1RyYW5zcG9ydDtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvLyBTdGFydCB0aGUgUlRQIFNlbmRlciBhbmQgUmVjZWl2ZXIgZm9yIGEgdHJhbnNjZWl2ZXIuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl90cmFuc2NlaXZlID0gZnVuY3Rpb24odHJhbnNjZWl2ZXIsXHJcbiAgICAgIHNlbmQsIHJlY3YpIHtcclxuICAgIHZhciBwYXJhbXMgPSBnZXRDb21tb25DYXBhYmlsaXRpZXModHJhbnNjZWl2ZXIubG9jYWxDYXBhYmlsaXRpZXMsXHJcbiAgICAgICAgdHJhbnNjZWl2ZXIucmVtb3RlQ2FwYWJpbGl0aWVzKTtcclxuICAgIGlmIChzZW5kICYmIHRyYW5zY2VpdmVyLnJ0cFNlbmRlcikge1xyXG4gICAgICBwYXJhbXMuZW5jb2RpbmdzID0gdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVycztcclxuICAgICAgcGFyYW1zLnJ0Y3AgPSB7XHJcbiAgICAgICAgY25hbWU6IFNEUFV0aWxzLmxvY2FsQ05hbWUsXHJcbiAgICAgICAgY29tcG91bmQ6IHRyYW5zY2VpdmVyLnJ0Y3BQYXJhbWV0ZXJzLmNvbXBvdW5kXHJcbiAgICAgIH07XHJcbiAgICAgIGlmICh0cmFuc2NlaXZlci5yZWN2RW5jb2RpbmdQYXJhbWV0ZXJzLmxlbmd0aCkge1xyXG4gICAgICAgIHBhcmFtcy5ydGNwLnNzcmMgPSB0cmFuc2NlaXZlci5yZWN2RW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmM7XHJcbiAgICAgIH1cclxuICAgICAgdHJhbnNjZWl2ZXIucnRwU2VuZGVyLnNlbmQocGFyYW1zKTtcclxuICAgIH1cclxuICAgIGlmIChyZWN2ICYmIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyICYmIHBhcmFtcy5jb2RlY3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAvLyByZW1vdmUgUlRYIGZpZWxkIGluIEVkZ2UgMTQ5NDJcclxuICAgICAgaWYgKHRyYW5zY2VpdmVyLmtpbmQgPT09ICd2aWRlbydcclxuICAgICAgICAgICYmIHRyYW5zY2VpdmVyLnJlY3ZFbmNvZGluZ1BhcmFtZXRlcnNcclxuICAgICAgICAgICYmIGVkZ2VWZXJzaW9uIDwgMTUwMTkpIHtcclxuICAgICAgICB0cmFuc2NlaXZlci5yZWN2RW5jb2RpbmdQYXJhbWV0ZXJzLmZvckVhY2goZnVuY3Rpb24ocCkge1xyXG4gICAgICAgICAgZGVsZXRlIHAucnR4O1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0cmFuc2NlaXZlci5yZWN2RW5jb2RpbmdQYXJhbWV0ZXJzLmxlbmd0aCkge1xyXG4gICAgICAgIHBhcmFtcy5lbmNvZGluZ3MgPSB0cmFuc2NlaXZlci5yZWN2RW5jb2RpbmdQYXJhbWV0ZXJzO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHBhcmFtcy5lbmNvZGluZ3MgPSBbe31dO1xyXG4gICAgICB9XHJcbiAgICAgIHBhcmFtcy5ydGNwID0ge1xyXG4gICAgICAgIGNvbXBvdW5kOiB0cmFuc2NlaXZlci5ydGNwUGFyYW1ldGVycy5jb21wb3VuZFxyXG4gICAgICB9O1xyXG4gICAgICBpZiAodHJhbnNjZWl2ZXIucnRjcFBhcmFtZXRlcnMuY25hbWUpIHtcclxuICAgICAgICBwYXJhbXMucnRjcC5jbmFtZSA9IHRyYW5zY2VpdmVyLnJ0Y3BQYXJhbWV0ZXJzLmNuYW1lO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzLmxlbmd0aCkge1xyXG4gICAgICAgIHBhcmFtcy5ydGNwLnNzcmMgPSB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmM7XHJcbiAgICAgIH1cclxuICAgICAgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIucmVjZWl2ZShwYXJhbXMpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5zZXRMb2NhbERlc2NyaXB0aW9uID0gZnVuY3Rpb24oZGVzY3JpcHRpb24pIHtcclxuICAgIHZhciBwYyA9IHRoaXM7XHJcblxyXG4gICAgLy8gTm90ZTogcHJhbnN3ZXIgaXMgbm90IHN1cHBvcnRlZC5cclxuICAgIGlmIChbJ29mZmVyJywgJ2Fuc3dlciddLmluZGV4T2YoZGVzY3JpcHRpb24udHlwZSkgPT09IC0xKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChtYWtlRXJyb3IoJ1R5cGVFcnJvcicsXHJcbiAgICAgICAgICAnVW5zdXBwb3J0ZWQgdHlwZSBcIicgKyBkZXNjcmlwdGlvbi50eXBlICsgJ1wiJykpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghaXNBY3Rpb25BbGxvd2VkSW5TaWduYWxpbmdTdGF0ZSgnc2V0TG9jYWxEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgZGVzY3JpcHRpb24udHlwZSwgcGMuc2lnbmFsaW5nU3RhdGUpIHx8IHBjLl9pc0Nsb3NlZCkge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobWFrZUVycm9yKCdJbnZhbGlkU3RhdGVFcnJvcicsXHJcbiAgICAgICAgICAnQ2FuIG5vdCBzZXQgbG9jYWwgJyArIGRlc2NyaXB0aW9uLnR5cGUgK1xyXG4gICAgICAgICAgJyBpbiBzdGF0ZSAnICsgcGMuc2lnbmFsaW5nU3RhdGUpKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgc2VjdGlvbnM7XHJcbiAgICB2YXIgc2Vzc2lvbnBhcnQ7XHJcbiAgICBpZiAoZGVzY3JpcHRpb24udHlwZSA9PT0gJ29mZmVyJykge1xyXG4gICAgICAvLyBWRVJZIGxpbWl0ZWQgc3VwcG9ydCBmb3IgU0RQIG11bmdpbmcuIExpbWl0ZWQgdG86XHJcbiAgICAgIC8vICogY2hhbmdpbmcgdGhlIG9yZGVyIG9mIGNvZGVjc1xyXG4gICAgICBzZWN0aW9ucyA9IFNEUFV0aWxzLnNwbGl0U2VjdGlvbnMoZGVzY3JpcHRpb24uc2RwKTtcclxuICAgICAgc2Vzc2lvbnBhcnQgPSBzZWN0aW9ucy5zaGlmdCgpO1xyXG4gICAgICBzZWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKG1lZGlhU2VjdGlvbiwgc2RwTUxpbmVJbmRleCkge1xyXG4gICAgICAgIHZhciBjYXBzID0gU0RQVXRpbHMucGFyc2VSdHBQYXJhbWV0ZXJzKG1lZGlhU2VjdGlvbik7XHJcbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmxvY2FsQ2FwYWJpbGl0aWVzID0gY2FwcztcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBwYy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlciwgc2RwTUxpbmVJbmRleCkge1xyXG4gICAgICAgIHBjLl9nYXRoZXIodHJhbnNjZWl2ZXIubWlkLCBzZHBNTGluZUluZGV4KTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2UgaWYgKGRlc2NyaXB0aW9uLnR5cGUgPT09ICdhbnN3ZXInKSB7XHJcbiAgICAgIHNlY3Rpb25zID0gU0RQVXRpbHMuc3BsaXRTZWN0aW9ucyhwYy5yZW1vdGVEZXNjcmlwdGlvbi5zZHApO1xyXG4gICAgICBzZXNzaW9ucGFydCA9IHNlY3Rpb25zLnNoaWZ0KCk7XHJcbiAgICAgIHZhciBpc0ljZUxpdGUgPSBTRFBVdGlscy5tYXRjaFByZWZpeChzZXNzaW9ucGFydCxcclxuICAgICAgICAgICdhPWljZS1saXRlJykubGVuZ3RoID4gMDtcclxuICAgICAgc2VjdGlvbnMuZm9yRWFjaChmdW5jdGlvbihtZWRpYVNlY3Rpb24sIHNkcE1MaW5lSW5kZXgpIHtcclxuICAgICAgICB2YXIgdHJhbnNjZWl2ZXIgPSBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF07XHJcbiAgICAgICAgdmFyIGljZUdhdGhlcmVyID0gdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXI7XHJcbiAgICAgICAgdmFyIGljZVRyYW5zcG9ydCA9IHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydDtcclxuICAgICAgICB2YXIgZHRsc1RyYW5zcG9ydCA9IHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQ7XHJcbiAgICAgICAgdmFyIGxvY2FsQ2FwYWJpbGl0aWVzID0gdHJhbnNjZWl2ZXIubG9jYWxDYXBhYmlsaXRpZXM7XHJcbiAgICAgICAgdmFyIHJlbW90ZUNhcGFiaWxpdGllcyA9IHRyYW5zY2VpdmVyLnJlbW90ZUNhcGFiaWxpdGllcztcclxuXHJcbiAgICAgICAgLy8gdHJlYXQgYnVuZGxlLW9ubHkgYXMgbm90LXJlamVjdGVkLlxyXG4gICAgICAgIHZhciByZWplY3RlZCA9IFNEUFV0aWxzLmlzUmVqZWN0ZWQobWVkaWFTZWN0aW9uKSAmJlxyXG4gICAgICAgICAgICBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPWJ1bmRsZS1vbmx5JykubGVuZ3RoID09PSAwO1xyXG5cclxuICAgICAgICBpZiAoIXJlamVjdGVkICYmICF0cmFuc2NlaXZlci5yZWplY3RlZCkge1xyXG4gICAgICAgICAgdmFyIHJlbW90ZUljZVBhcmFtZXRlcnMgPSBTRFBVdGlscy5nZXRJY2VQYXJhbWV0ZXJzKFxyXG4gICAgICAgICAgICAgIG1lZGlhU2VjdGlvbiwgc2Vzc2lvbnBhcnQpO1xyXG4gICAgICAgICAgdmFyIHJlbW90ZUR0bHNQYXJhbWV0ZXJzID0gU0RQVXRpbHMuZ2V0RHRsc1BhcmFtZXRlcnMoXHJcbiAgICAgICAgICAgICAgbWVkaWFTZWN0aW9uLCBzZXNzaW9ucGFydCk7XHJcbiAgICAgICAgICBpZiAoaXNJY2VMaXRlKSB7XHJcbiAgICAgICAgICAgIHJlbW90ZUR0bHNQYXJhbWV0ZXJzLnJvbGUgPSAnc2VydmVyJztcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoIXBjLnVzaW5nQnVuZGxlIHx8IHNkcE1MaW5lSW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgcGMuX2dhdGhlcih0cmFuc2NlaXZlci5taWQsIHNkcE1MaW5lSW5kZXgpO1xyXG4gICAgICAgICAgICBpZiAoaWNlVHJhbnNwb3J0LnN0YXRlID09PSAnbmV3Jykge1xyXG4gICAgICAgICAgICAgIGljZVRyYW5zcG9ydC5zdGFydChpY2VHYXRoZXJlciwgcmVtb3RlSWNlUGFyYW1ldGVycyxcclxuICAgICAgICAgICAgICAgICAgaXNJY2VMaXRlID8gJ2NvbnRyb2xsaW5nJyA6ICdjb250cm9sbGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGR0bHNUcmFuc3BvcnQuc3RhdGUgPT09ICduZXcnKSB7XHJcbiAgICAgICAgICAgICAgZHRsc1RyYW5zcG9ydC5zdGFydChyZW1vdGVEdGxzUGFyYW1ldGVycyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBDYWxjdWxhdGUgaW50ZXJzZWN0aW9uIG9mIGNhcGFiaWxpdGllcy5cclxuICAgICAgICAgIHZhciBwYXJhbXMgPSBnZXRDb21tb25DYXBhYmlsaXRpZXMobG9jYWxDYXBhYmlsaXRpZXMsXHJcbiAgICAgICAgICAgICAgcmVtb3RlQ2FwYWJpbGl0aWVzKTtcclxuXHJcbiAgICAgICAgICAvLyBTdGFydCB0aGUgUlRDUnRwU2VuZGVyLiBUaGUgUlRDUnRwUmVjZWl2ZXIgZm9yIHRoaXNcclxuICAgICAgICAgIC8vIHRyYW5zY2VpdmVyIGhhcyBhbHJlYWR5IGJlZW4gc3RhcnRlZCBpbiBzZXRSZW1vdGVEZXNjcmlwdGlvbi5cclxuICAgICAgICAgIHBjLl90cmFuc2NlaXZlKHRyYW5zY2VpdmVyLFxyXG4gICAgICAgICAgICAgIHBhcmFtcy5jb2RlY3MubGVuZ3RoID4gMCxcclxuICAgICAgICAgICAgICBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwYy5sb2NhbERlc2NyaXB0aW9uID0ge1xyXG4gICAgICB0eXBlOiBkZXNjcmlwdGlvbi50eXBlLFxyXG4gICAgICBzZHA6IGRlc2NyaXB0aW9uLnNkcFxyXG4gICAgfTtcclxuICAgIGlmIChkZXNjcmlwdGlvbi50eXBlID09PSAnb2ZmZXInKSB7XHJcbiAgICAgIHBjLl91cGRhdGVTaWduYWxpbmdTdGF0ZSgnaGF2ZS1sb2NhbC1vZmZlcicpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcGMuX3VwZGF0ZVNpZ25hbGluZ1N0YXRlKCdzdGFibGUnKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgfTtcclxuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnNldFJlbW90ZURlc2NyaXB0aW9uID0gZnVuY3Rpb24oZGVzY3JpcHRpb24pIHtcclxuICAgIHZhciBwYyA9IHRoaXM7XHJcblxyXG4gICAgLy8gTm90ZTogcHJhbnN3ZXIgaXMgbm90IHN1cHBvcnRlZC5cclxuICAgIGlmIChbJ29mZmVyJywgJ2Fuc3dlciddLmluZGV4T2YoZGVzY3JpcHRpb24udHlwZSkgPT09IC0xKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChtYWtlRXJyb3IoJ1R5cGVFcnJvcicsXHJcbiAgICAgICAgICAnVW5zdXBwb3J0ZWQgdHlwZSBcIicgKyBkZXNjcmlwdGlvbi50eXBlICsgJ1wiJykpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghaXNBY3Rpb25BbGxvd2VkSW5TaWduYWxpbmdTdGF0ZSgnc2V0UmVtb3RlRGVzY3JpcHRpb24nLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uLnR5cGUsIHBjLnNpZ25hbGluZ1N0YXRlKSB8fCBwYy5faXNDbG9zZWQpIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG1ha2VFcnJvcignSW52YWxpZFN0YXRlRXJyb3InLFxyXG4gICAgICAgICAgJ0NhbiBub3Qgc2V0IHJlbW90ZSAnICsgZGVzY3JpcHRpb24udHlwZSArXHJcbiAgICAgICAgICAnIGluIHN0YXRlICcgKyBwYy5zaWduYWxpbmdTdGF0ZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBzdHJlYW1zID0ge307XHJcbiAgICBwYy5yZW1vdGVTdHJlYW1zLmZvckVhY2goZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICAgIHN0cmVhbXNbc3RyZWFtLmlkXSA9IHN0cmVhbTtcclxuICAgIH0pO1xyXG4gICAgdmFyIHJlY2VpdmVyTGlzdCA9IFtdO1xyXG4gICAgdmFyIHNlY3Rpb25zID0gU0RQVXRpbHMuc3BsaXRTZWN0aW9ucyhkZXNjcmlwdGlvbi5zZHApO1xyXG4gICAgdmFyIHNlc3Npb25wYXJ0ID0gc2VjdGlvbnMuc2hpZnQoKTtcclxuICAgIHZhciBpc0ljZUxpdGUgPSBTRFBVdGlscy5tYXRjaFByZWZpeChzZXNzaW9ucGFydCxcclxuICAgICAgICAnYT1pY2UtbGl0ZScpLmxlbmd0aCA+IDA7XHJcbiAgICB2YXIgdXNpbmdCdW5kbGUgPSBTRFBVdGlscy5tYXRjaFByZWZpeChzZXNzaW9ucGFydCxcclxuICAgICAgICAnYT1ncm91cDpCVU5ETEUgJykubGVuZ3RoID4gMDtcclxuICAgIHBjLnVzaW5nQnVuZGxlID0gdXNpbmdCdW5kbGU7XHJcbiAgICB2YXIgaWNlT3B0aW9ucyA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KHNlc3Npb25wYXJ0LFxyXG4gICAgICAgICdhPWljZS1vcHRpb25zOicpWzBdO1xyXG4gICAgaWYgKGljZU9wdGlvbnMpIHtcclxuICAgICAgcGMuY2FuVHJpY2tsZUljZUNhbmRpZGF0ZXMgPSBpY2VPcHRpb25zLnN1YnN0cigxNCkuc3BsaXQoJyAnKVxyXG4gICAgICAgICAgLmluZGV4T2YoJ3RyaWNrbGUnKSA+PSAwO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcGMuY2FuVHJpY2tsZUljZUNhbmRpZGF0ZXMgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBzZWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKG1lZGlhU2VjdGlvbiwgc2RwTUxpbmVJbmRleCkge1xyXG4gICAgICB2YXIgbGluZXMgPSBTRFBVdGlscy5zcGxpdExpbmVzKG1lZGlhU2VjdGlvbik7XHJcbiAgICAgIHZhciBraW5kID0gU0RQVXRpbHMuZ2V0S2luZChtZWRpYVNlY3Rpb24pO1xyXG4gICAgICAvLyB0cmVhdCBidW5kbGUtb25seSBhcyBub3QtcmVqZWN0ZWQuXHJcbiAgICAgIHZhciByZWplY3RlZCA9IFNEUFV0aWxzLmlzUmVqZWN0ZWQobWVkaWFTZWN0aW9uKSAmJlxyXG4gICAgICAgICAgU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1idW5kbGUtb25seScpLmxlbmd0aCA9PT0gMDtcclxuICAgICAgdmFyIHByb3RvY29sID0gbGluZXNbMF0uc3Vic3RyKDIpLnNwbGl0KCcgJylbMl07XHJcblxyXG4gICAgICB2YXIgZGlyZWN0aW9uID0gU0RQVXRpbHMuZ2V0RGlyZWN0aW9uKG1lZGlhU2VjdGlvbiwgc2Vzc2lvbnBhcnQpO1xyXG4gICAgICB2YXIgcmVtb3RlTXNpZCA9IFNEUFV0aWxzLnBhcnNlTXNpZChtZWRpYVNlY3Rpb24pO1xyXG5cclxuICAgICAgdmFyIG1pZCA9IFNEUFV0aWxzLmdldE1pZChtZWRpYVNlY3Rpb24pIHx8IFNEUFV0aWxzLmdlbmVyYXRlSWRlbnRpZmllcigpO1xyXG5cclxuICAgICAgLy8gUmVqZWN0IGRhdGFjaGFubmVscyB3aGljaCBhcmUgbm90IGltcGxlbWVudGVkIHlldC5cclxuICAgICAgaWYgKChraW5kID09PSAnYXBwbGljYXRpb24nICYmIHByb3RvY29sID09PSAnRFRMUy9TQ1RQJykgfHwgcmVqZWN0ZWQpIHtcclxuICAgICAgICAvLyBUT0RPOiB0aGlzIGlzIGRhbmdlcm91cyBpbiB0aGUgY2FzZSB3aGVyZSBhIG5vbi1yZWplY3RlZCBtLWxpbmVcclxuICAgICAgICAvLyAgICAgYmVjb21lcyByZWplY3RlZC5cclxuICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0gPSB7XHJcbiAgICAgICAgICBtaWQ6IG1pZCxcclxuICAgICAgICAgIGtpbmQ6IGtpbmQsXHJcbiAgICAgICAgICByZWplY3RlZDogdHJ1ZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIXJlamVjdGVkICYmIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XSAmJlxyXG4gICAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLnJlamVjdGVkKSB7XHJcbiAgICAgICAgLy8gcmVjeWNsZSBhIHJlamVjdGVkIHRyYW5zY2VpdmVyLlxyXG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XSA9IHBjLl9jcmVhdGVUcmFuc2NlaXZlcihraW5kLCB0cnVlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIHRyYW5zY2VpdmVyO1xyXG4gICAgICB2YXIgaWNlR2F0aGVyZXI7XHJcbiAgICAgIHZhciBpY2VUcmFuc3BvcnQ7XHJcbiAgICAgIHZhciBkdGxzVHJhbnNwb3J0O1xyXG4gICAgICB2YXIgcnRwUmVjZWl2ZXI7XHJcbiAgICAgIHZhciBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzO1xyXG4gICAgICB2YXIgcmVjdkVuY29kaW5nUGFyYW1ldGVycztcclxuICAgICAgdmFyIGxvY2FsQ2FwYWJpbGl0aWVzO1xyXG5cclxuICAgICAgdmFyIHRyYWNrO1xyXG4gICAgICAvLyBGSVhNRTogZW5zdXJlIHRoZSBtZWRpYVNlY3Rpb24gaGFzIHJ0Y3AtbXV4IHNldC5cclxuICAgICAgdmFyIHJlbW90ZUNhcGFiaWxpdGllcyA9IFNEUFV0aWxzLnBhcnNlUnRwUGFyYW1ldGVycyhtZWRpYVNlY3Rpb24pO1xyXG4gICAgICB2YXIgcmVtb3RlSWNlUGFyYW1ldGVycztcclxuICAgICAgdmFyIHJlbW90ZUR0bHNQYXJhbWV0ZXJzO1xyXG4gICAgICBpZiAoIXJlamVjdGVkKSB7XHJcbiAgICAgICAgcmVtb3RlSWNlUGFyYW1ldGVycyA9IFNEUFV0aWxzLmdldEljZVBhcmFtZXRlcnMobWVkaWFTZWN0aW9uLFxyXG4gICAgICAgICAgICBzZXNzaW9ucGFydCk7XHJcbiAgICAgICAgcmVtb3RlRHRsc1BhcmFtZXRlcnMgPSBTRFBVdGlscy5nZXREdGxzUGFyYW1ldGVycyhtZWRpYVNlY3Rpb24sXHJcbiAgICAgICAgICAgIHNlc3Npb25wYXJ0KTtcclxuICAgICAgICByZW1vdGVEdGxzUGFyYW1ldGVycy5yb2xlID0gJ2NsaWVudCc7XHJcbiAgICAgIH1cclxuICAgICAgcmVjdkVuY29kaW5nUGFyYW1ldGVycyA9XHJcbiAgICAgICAgICBTRFBVdGlscy5wYXJzZVJ0cEVuY29kaW5nUGFyYW1ldGVycyhtZWRpYVNlY3Rpb24pO1xyXG5cclxuICAgICAgdmFyIHJ0Y3BQYXJhbWV0ZXJzID0gU0RQVXRpbHMucGFyc2VSdGNwUGFyYW1ldGVycyhtZWRpYVNlY3Rpb24pO1xyXG5cclxuICAgICAgdmFyIGlzQ29tcGxldGUgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sXHJcbiAgICAgICAgICAnYT1lbmQtb2YtY2FuZGlkYXRlcycsIHNlc3Npb25wYXJ0KS5sZW5ndGggPiAwO1xyXG4gICAgICB2YXIgY2FuZHMgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPWNhbmRpZGF0ZTonKVxyXG4gICAgICAgICAgLm1hcChmdW5jdGlvbihjYW5kKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBTRFBVdGlscy5wYXJzZUNhbmRpZGF0ZShjYW5kKTtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uKGNhbmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNhbmQuY29tcG9uZW50ID09PSAxO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBDaGVjayBpZiB3ZSBjYW4gdXNlIEJVTkRMRSBhbmQgZGlzcG9zZSB0cmFuc3BvcnRzLlxyXG4gICAgICBpZiAoKGRlc2NyaXB0aW9uLnR5cGUgPT09ICdvZmZlcicgfHwgZGVzY3JpcHRpb24udHlwZSA9PT0gJ2Fuc3dlcicpICYmXHJcbiAgICAgICAgICAhcmVqZWN0ZWQgJiYgdXNpbmdCdW5kbGUgJiYgc2RwTUxpbmVJbmRleCA+IDAgJiZcclxuICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XSkge1xyXG4gICAgICAgIHBjLl9kaXNwb3NlSWNlQW5kRHRsc1RyYW5zcG9ydHMoc2RwTUxpbmVJbmRleCk7XHJcbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmljZUdhdGhlcmVyID1cclxuICAgICAgICAgICAgcGMudHJhbnNjZWl2ZXJzWzBdLmljZUdhdGhlcmVyO1xyXG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5pY2VUcmFuc3BvcnQgPVxyXG4gICAgICAgICAgICBwYy50cmFuc2NlaXZlcnNbMF0uaWNlVHJhbnNwb3J0O1xyXG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5kdGxzVHJhbnNwb3J0ID1cclxuICAgICAgICAgICAgcGMudHJhbnNjZWl2ZXJzWzBdLmR0bHNUcmFuc3BvcnQ7XHJcbiAgICAgICAgaWYgKHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5ydHBTZW5kZXIpIHtcclxuICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5ydHBTZW5kZXIuc2V0VHJhbnNwb3J0KFxyXG4gICAgICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1swXS5kdGxzVHJhbnNwb3J0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5ydHBSZWNlaXZlcikge1xyXG4gICAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLnJ0cFJlY2VpdmVyLnNldFRyYW5zcG9ydChcclxuICAgICAgICAgICAgICBwYy50cmFuc2NlaXZlcnNbMF0uZHRsc1RyYW5zcG9ydCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChkZXNjcmlwdGlvbi50eXBlID09PSAnb2ZmZXInICYmICFyZWplY3RlZCkge1xyXG4gICAgICAgIHRyYW5zY2VpdmVyID0gcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdIHx8XHJcbiAgICAgICAgICAgIHBjLl9jcmVhdGVUcmFuc2NlaXZlcihraW5kKTtcclxuICAgICAgICB0cmFuc2NlaXZlci5taWQgPSBtaWQ7XHJcblxyXG4gICAgICAgIGlmICghdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIpIHtcclxuICAgICAgICAgIHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyID0gcGMuX2NyZWF0ZUljZUdhdGhlcmVyKHNkcE1MaW5lSW5kZXgsXHJcbiAgICAgICAgICAgICAgdXNpbmdCdW5kbGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNhbmRzLmxlbmd0aCAmJiB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQuc3RhdGUgPT09ICduZXcnKSB7XHJcbiAgICAgICAgICBpZiAoaXNDb21wbGV0ZSAmJiAoIXVzaW5nQnVuZGxlIHx8IHNkcE1MaW5lSW5kZXggPT09IDApKSB7XHJcbiAgICAgICAgICAgIHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydC5zZXRSZW1vdGVDYW5kaWRhdGVzKGNhbmRzKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNhbmRzLmZvckVhY2goZnVuY3Rpb24oY2FuZGlkYXRlKSB7XHJcbiAgICAgICAgICAgICAgbWF5YmVBZGRDYW5kaWRhdGUodHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LCBjYW5kaWRhdGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxvY2FsQ2FwYWJpbGl0aWVzID0gd2luZG93LlJUQ1J0cFJlY2VpdmVyLmdldENhcGFiaWxpdGllcyhraW5kKTtcclxuXHJcbiAgICAgICAgLy8gZmlsdGVyIFJUWCB1bnRpbCBhZGRpdGlvbmFsIHN0dWZmIG5lZWRlZCBmb3IgUlRYIGlzIGltcGxlbWVudGVkXHJcbiAgICAgICAgLy8gaW4gYWRhcHRlci5qc1xyXG4gICAgICAgIGlmIChlZGdlVmVyc2lvbiA8IDE1MDE5KSB7XHJcbiAgICAgICAgICBsb2NhbENhcGFiaWxpdGllcy5jb2RlY3MgPSBsb2NhbENhcGFiaWxpdGllcy5jb2RlY3MuZmlsdGVyKFxyXG4gICAgICAgICAgICAgIGZ1bmN0aW9uKGNvZGVjKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29kZWMubmFtZSAhPT0gJ3J0eCc7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzID0gdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVycyB8fCBbe1xyXG4gICAgICAgICAgc3NyYzogKDIgKiBzZHBNTGluZUluZGV4ICsgMikgKiAxMDAxXHJcbiAgICAgICAgfV07XHJcblxyXG4gICAgICAgIC8vIFRPRE86IHJld3JpdGUgdG8gdXNlIGh0dHA6Ly93M2MuZ2l0aHViLmlvL3dlYnJ0Yy1wYy8jc2V0LWFzc29jaWF0ZWQtcmVtb3RlLXN0cmVhbXNcclxuICAgICAgICB2YXIgaXNOZXdUcmFjayA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09ICdzZW5kcmVjdicgfHwgZGlyZWN0aW9uID09PSAnc2VuZG9ubHknKSB7XHJcbiAgICAgICAgICBpc05ld1RyYWNrID0gIXRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyO1xyXG4gICAgICAgICAgcnRwUmVjZWl2ZXIgPSB0cmFuc2NlaXZlci5ydHBSZWNlaXZlciB8fFxyXG4gICAgICAgICAgICAgIG5ldyB3aW5kb3cuUlRDUnRwUmVjZWl2ZXIodHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydCwga2luZCk7XHJcblxyXG4gICAgICAgICAgaWYgKGlzTmV3VHJhY2spIHtcclxuICAgICAgICAgICAgdmFyIHN0cmVhbTtcclxuICAgICAgICAgICAgdHJhY2sgPSBydHBSZWNlaXZlci50cmFjaztcclxuICAgICAgICAgICAgLy8gRklYTUU6IGRvZXMgbm90IHdvcmsgd2l0aCBQbGFuIEIuXHJcbiAgICAgICAgICAgIGlmIChyZW1vdGVNc2lkICYmIHJlbW90ZU1zaWQuc3RyZWFtID09PSAnLScpIHtcclxuICAgICAgICAgICAgICAvLyBuby1vcC4gYSBzdHJlYW0gaWQgb2YgJy0nIG1lYW5zOiBubyBhc3NvY2lhdGVkIHN0cmVhbS5cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChyZW1vdGVNc2lkKSB7XHJcbiAgICAgICAgICAgICAgaWYgKCFzdHJlYW1zW3JlbW90ZU1zaWQuc3RyZWFtXSkge1xyXG4gICAgICAgICAgICAgICAgc3RyZWFtc1tyZW1vdGVNc2lkLnN0cmVhbV0gPSBuZXcgd2luZG93Lk1lZGlhU3RyZWFtKCk7XHJcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc3RyZWFtc1tyZW1vdGVNc2lkLnN0cmVhbV0sICdpZCcsIHtcclxuICAgICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVtb3RlTXNpZC5zdHJlYW07XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodHJhY2ssICdpZCcsIHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiByZW1vdGVNc2lkLnRyYWNrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIHN0cmVhbSA9IHN0cmVhbXNbcmVtb3RlTXNpZC5zdHJlYW1dO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGlmICghc3RyZWFtcy5kZWZhdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBzdHJlYW1zLmRlZmF1bHQgPSBuZXcgd2luZG93Lk1lZGlhU3RyZWFtKCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHN0cmVhbSA9IHN0cmVhbXMuZGVmYXVsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc3RyZWFtKSB7XHJcbiAgICAgICAgICAgICAgYWRkVHJhY2tUb1N0cmVhbUFuZEZpcmVFdmVudCh0cmFjaywgc3RyZWFtKTtcclxuICAgICAgICAgICAgICB0cmFuc2NlaXZlci5hc3NvY2lhdGVkUmVtb3RlTWVkaWFTdHJlYW1zLnB1c2goc3RyZWFtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZWNlaXZlckxpc3QucHVzaChbdHJhY2ssIHJ0cFJlY2VpdmVyLCBzdHJlYW1dKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyICYmIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyLnRyYWNrKSB7XHJcbiAgICAgICAgICB0cmFuc2NlaXZlci5hc3NvY2lhdGVkUmVtb3RlTWVkaWFTdHJlYW1zLmZvckVhY2goZnVuY3Rpb24ocykge1xyXG4gICAgICAgICAgICB2YXIgbmF0aXZlVHJhY2sgPSBzLmdldFRyYWNrcygpLmZpbmQoZnVuY3Rpb24odCkge1xyXG4gICAgICAgICAgICAgIHJldHVybiB0LmlkID09PSB0cmFuc2NlaXZlci5ydHBSZWNlaXZlci50cmFjay5pZDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmIChuYXRpdmVUcmFjaykge1xyXG4gICAgICAgICAgICAgIHJlbW92ZVRyYWNrRnJvbVN0cmVhbUFuZEZpcmVFdmVudChuYXRpdmVUcmFjaywgcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdHJhbnNjZWl2ZXIuYXNzb2NpYXRlZFJlbW90ZU1lZGlhU3RyZWFtcyA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdHJhbnNjZWl2ZXIubG9jYWxDYXBhYmlsaXRpZXMgPSBsb2NhbENhcGFiaWxpdGllcztcclxuICAgICAgICB0cmFuc2NlaXZlci5yZW1vdGVDYXBhYmlsaXRpZXMgPSByZW1vdGVDYXBhYmlsaXRpZXM7XHJcbiAgICAgICAgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIgPSBydHBSZWNlaXZlcjtcclxuICAgICAgICB0cmFuc2NlaXZlci5ydGNwUGFyYW1ldGVycyA9IHJ0Y3BQYXJhbWV0ZXJzO1xyXG4gICAgICAgIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnMgPSBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzO1xyXG4gICAgICAgIHRyYW5zY2VpdmVyLnJlY3ZFbmNvZGluZ1BhcmFtZXRlcnMgPSByZWN2RW5jb2RpbmdQYXJhbWV0ZXJzO1xyXG5cclxuICAgICAgICAvLyBTdGFydCB0aGUgUlRDUnRwUmVjZWl2ZXIgbm93LiBUaGUgUlRQU2VuZGVyIGlzIHN0YXJ0ZWQgaW5cclxuICAgICAgICAvLyBzZXRMb2NhbERlc2NyaXB0aW9uLlxyXG4gICAgICAgIHBjLl90cmFuc2NlaXZlKHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XSxcclxuICAgICAgICAgICAgZmFsc2UsXHJcbiAgICAgICAgICAgIGlzTmV3VHJhY2spO1xyXG4gICAgICB9IGVsc2UgaWYgKGRlc2NyaXB0aW9uLnR5cGUgPT09ICdhbnN3ZXInICYmICFyZWplY3RlZCkge1xyXG4gICAgICAgIHRyYW5zY2VpdmVyID0gcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdO1xyXG4gICAgICAgIGljZUdhdGhlcmVyID0gdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXI7XHJcbiAgICAgICAgaWNlVHJhbnNwb3J0ID0gdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0O1xyXG4gICAgICAgIGR0bHNUcmFuc3BvcnQgPSB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0O1xyXG4gICAgICAgIHJ0cFJlY2VpdmVyID0gdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXI7XHJcbiAgICAgICAgc2VuZEVuY29kaW5nUGFyYW1ldGVycyA9IHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnM7XHJcbiAgICAgICAgbG9jYWxDYXBhYmlsaXRpZXMgPSB0cmFuc2NlaXZlci5sb2NhbENhcGFiaWxpdGllcztcclxuXHJcbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLnJlY3ZFbmNvZGluZ1BhcmFtZXRlcnMgPVxyXG4gICAgICAgICAgICByZWN2RW5jb2RpbmdQYXJhbWV0ZXJzO1xyXG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5yZW1vdGVDYXBhYmlsaXRpZXMgPVxyXG4gICAgICAgICAgICByZW1vdGVDYXBhYmlsaXRpZXM7XHJcbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLnJ0Y3BQYXJhbWV0ZXJzID0gcnRjcFBhcmFtZXRlcnM7XHJcblxyXG4gICAgICAgIGlmIChjYW5kcy5sZW5ndGggJiYgaWNlVHJhbnNwb3J0LnN0YXRlID09PSAnbmV3Jykge1xyXG4gICAgICAgICAgaWYgKChpc0ljZUxpdGUgfHwgaXNDb21wbGV0ZSkgJiZcclxuICAgICAgICAgICAgICAoIXVzaW5nQnVuZGxlIHx8IHNkcE1MaW5lSW5kZXggPT09IDApKSB7XHJcbiAgICAgICAgICAgIGljZVRyYW5zcG9ydC5zZXRSZW1vdGVDYW5kaWRhdGVzKGNhbmRzKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNhbmRzLmZvckVhY2goZnVuY3Rpb24oY2FuZGlkYXRlKSB7XHJcbiAgICAgICAgICAgICAgbWF5YmVBZGRDYW5kaWRhdGUodHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LCBjYW5kaWRhdGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdXNpbmdCdW5kbGUgfHwgc2RwTUxpbmVJbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgaWYgKGljZVRyYW5zcG9ydC5zdGF0ZSA9PT0gJ25ldycpIHtcclxuICAgICAgICAgICAgaWNlVHJhbnNwb3J0LnN0YXJ0KGljZUdhdGhlcmVyLCByZW1vdGVJY2VQYXJhbWV0ZXJzLFxyXG4gICAgICAgICAgICAgICAgJ2NvbnRyb2xsaW5nJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoZHRsc1RyYW5zcG9ydC5zdGF0ZSA9PT0gJ25ldycpIHtcclxuICAgICAgICAgICAgZHRsc1RyYW5zcG9ydC5zdGFydChyZW1vdGVEdGxzUGFyYW1ldGVycyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwYy5fdHJhbnNjZWl2ZSh0cmFuc2NlaXZlcixcclxuICAgICAgICAgICAgZGlyZWN0aW9uID09PSAnc2VuZHJlY3YnIHx8IGRpcmVjdGlvbiA9PT0gJ3JlY3Zvbmx5JyxcclxuICAgICAgICAgICAgZGlyZWN0aW9uID09PSAnc2VuZHJlY3YnIHx8IGRpcmVjdGlvbiA9PT0gJ3NlbmRvbmx5Jyk7XHJcblxyXG4gICAgICAgIC8vIFRPRE86IHJld3JpdGUgdG8gdXNlIGh0dHA6Ly93M2MuZ2l0aHViLmlvL3dlYnJ0Yy1wYy8jc2V0LWFzc29jaWF0ZWQtcmVtb3RlLXN0cmVhbXNcclxuICAgICAgICBpZiAocnRwUmVjZWl2ZXIgJiZcclxuICAgICAgICAgICAgKGRpcmVjdGlvbiA9PT0gJ3NlbmRyZWN2JyB8fCBkaXJlY3Rpb24gPT09ICdzZW5kb25seScpKSB7XHJcbiAgICAgICAgICB0cmFjayA9IHJ0cFJlY2VpdmVyLnRyYWNrO1xyXG4gICAgICAgICAgaWYgKHJlbW90ZU1zaWQpIHtcclxuICAgICAgICAgICAgaWYgKCFzdHJlYW1zW3JlbW90ZU1zaWQuc3RyZWFtXSkge1xyXG4gICAgICAgICAgICAgIHN0cmVhbXNbcmVtb3RlTXNpZC5zdHJlYW1dID0gbmV3IHdpbmRvdy5NZWRpYVN0cmVhbSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFkZFRyYWNrVG9TdHJlYW1BbmRGaXJlRXZlbnQodHJhY2ssIHN0cmVhbXNbcmVtb3RlTXNpZC5zdHJlYW1dKTtcclxuICAgICAgICAgICAgcmVjZWl2ZXJMaXN0LnB1c2goW3RyYWNrLCBydHBSZWNlaXZlciwgc3RyZWFtc1tyZW1vdGVNc2lkLnN0cmVhbV1dKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICghc3RyZWFtcy5kZWZhdWx0KSB7XHJcbiAgICAgICAgICAgICAgc3RyZWFtcy5kZWZhdWx0ID0gbmV3IHdpbmRvdy5NZWRpYVN0cmVhbSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFkZFRyYWNrVG9TdHJlYW1BbmRGaXJlRXZlbnQodHJhY2ssIHN0cmVhbXMuZGVmYXVsdCk7XHJcbiAgICAgICAgICAgIHJlY2VpdmVyTGlzdC5wdXNoKFt0cmFjaywgcnRwUmVjZWl2ZXIsIHN0cmVhbXMuZGVmYXVsdF0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyBGSVhNRTogYWN0dWFsbHkgdGhlIHJlY2VpdmVyIHNob3VsZCBiZSBjcmVhdGVkIGxhdGVyLlxyXG4gICAgICAgICAgZGVsZXRlIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHBjLl9kdGxzUm9sZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHBjLl9kdGxzUm9sZSA9IGRlc2NyaXB0aW9uLnR5cGUgPT09ICdvZmZlcicgPyAnYWN0aXZlJyA6ICdwYXNzaXZlJztcclxuICAgIH1cclxuXHJcbiAgICBwYy5yZW1vdGVEZXNjcmlwdGlvbiA9IHtcclxuICAgICAgdHlwZTogZGVzY3JpcHRpb24udHlwZSxcclxuICAgICAgc2RwOiBkZXNjcmlwdGlvbi5zZHBcclxuICAgIH07XHJcbiAgICBpZiAoZGVzY3JpcHRpb24udHlwZSA9PT0gJ29mZmVyJykge1xyXG4gICAgICBwYy5fdXBkYXRlU2lnbmFsaW5nU3RhdGUoJ2hhdmUtcmVtb3RlLW9mZmVyJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBwYy5fdXBkYXRlU2lnbmFsaW5nU3RhdGUoJ3N0YWJsZScpO1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmtleXMoc3RyZWFtcykuZm9yRWFjaChmdW5jdGlvbihzaWQpIHtcclxuICAgICAgdmFyIHN0cmVhbSA9IHN0cmVhbXNbc2lkXTtcclxuICAgICAgaWYgKHN0cmVhbS5nZXRUcmFja3MoKS5sZW5ndGgpIHtcclxuICAgICAgICBpZiAocGMucmVtb3RlU3RyZWFtcy5pbmRleE9mKHN0cmVhbSkgPT09IC0xKSB7XHJcbiAgICAgICAgICBwYy5yZW1vdGVTdHJlYW1zLnB1c2goc3RyZWFtKTtcclxuICAgICAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgnYWRkc3RyZWFtJyk7XHJcbiAgICAgICAgICBldmVudC5zdHJlYW0gPSBzdHJlYW07XHJcbiAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcGMuX2Rpc3BhdGNoRXZlbnQoJ2FkZHN0cmVhbScsIGV2ZW50KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVjZWl2ZXJMaXN0LmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgICAgICAgdmFyIHRyYWNrID0gaXRlbVswXTtcclxuICAgICAgICAgIHZhciByZWNlaXZlciA9IGl0ZW1bMV07XHJcbiAgICAgICAgICBpZiAoc3RyZWFtLmlkICE9PSBpdGVtWzJdLmlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGZpcmVBZGRUcmFjayhwYywgdHJhY2ssIHJlY2VpdmVyLCBbc3RyZWFtXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmVjZWl2ZXJMaXN0LmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgICBpZiAoaXRlbVsyXSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBmaXJlQWRkVHJhY2socGMsIGl0ZW1bMF0sIGl0ZW1bMV0sIFtdKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIGNoZWNrIHdoZXRoZXIgYWRkSWNlQ2FuZGlkYXRlKHt9KSB3YXMgY2FsbGVkIHdpdGhpbiBmb3VyIHNlY29uZHMgYWZ0ZXJcclxuICAgIC8vIHNldFJlbW90ZURlc2NyaXB0aW9uLlxyXG4gICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmICghKHBjICYmIHBjLnRyYW5zY2VpdmVycykpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgcGMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcclxuICAgICAgICBpZiAodHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0ICYmXHJcbiAgICAgICAgICAgIHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydC5zdGF0ZSA9PT0gJ25ldycgJiZcclxuICAgICAgICAgICAgdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LmdldFJlbW90ZUNhbmRpZGF0ZXMoKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ1RpbWVvdXQgZm9yIGFkZFJlbW90ZUNhbmRpZGF0ZS4gQ29uc2lkZXIgc2VuZGluZyAnICtcclxuICAgICAgICAgICAgICAnYW4gZW5kLW9mLWNhbmRpZGF0ZXMgbm90aWZpY2F0aW9uJyk7XHJcbiAgICAgICAgICB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQuYWRkUmVtb3RlQ2FuZGlkYXRlKHt9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSwgNDAwMCk7XHJcblxyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gIH07XHJcblxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xyXG4gICAgICAvKiBub3QgeWV0XHJcbiAgICAgIGlmICh0cmFuc2NlaXZlci5pY2VHYXRoZXJlcikge1xyXG4gICAgICAgIHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyLmNsb3NlKCk7XHJcbiAgICAgIH1cclxuICAgICAgKi9cclxuICAgICAgaWYgKHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydCkge1xyXG4gICAgICAgIHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydC5zdG9wKCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQpIHtcclxuICAgICAgICB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0LnN0b3AoKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodHJhbnNjZWl2ZXIucnRwU2VuZGVyKSB7XHJcbiAgICAgICAgdHJhbnNjZWl2ZXIucnRwU2VuZGVyLnN0b3AoKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIpIHtcclxuICAgICAgICB0cmFuc2NlaXZlci5ydHBSZWNlaXZlci5zdG9wKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgLy8gRklYTUU6IGNsZWFuIHVwIHRyYWNrcywgbG9jYWwgc3RyZWFtcywgcmVtb3RlIHN0cmVhbXMsIGV0Y1xyXG4gICAgdGhpcy5faXNDbG9zZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5fdXBkYXRlU2lnbmFsaW5nU3RhdGUoJ2Nsb3NlZCcpO1xyXG4gIH07XHJcblxyXG4gIC8vIFVwZGF0ZSB0aGUgc2lnbmFsaW5nIHN0YXRlLlxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fdXBkYXRlU2lnbmFsaW5nU3RhdGUgPSBmdW5jdGlvbihuZXdTdGF0ZSkge1xyXG4gICAgdGhpcy5zaWduYWxpbmdTdGF0ZSA9IG5ld1N0YXRlO1xyXG4gICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdzaWduYWxpbmdzdGF0ZWNoYW5nZScpO1xyXG4gICAgdGhpcy5fZGlzcGF0Y2hFdmVudCgnc2lnbmFsaW5nc3RhdGVjaGFuZ2UnLCBldmVudCk7XHJcbiAgfTtcclxuXHJcbiAgLy8gRGV0ZXJtaW5lIHdoZXRoZXIgdG8gZmlyZSB0aGUgbmVnb3RpYXRpb25uZWVkZWQgZXZlbnQuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl9tYXliZUZpcmVOZWdvdGlhdGlvbk5lZWRlZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHBjID0gdGhpcztcclxuICAgIGlmICh0aGlzLnNpZ25hbGluZ1N0YXRlICE9PSAnc3RhYmxlJyB8fCB0aGlzLm5lZWROZWdvdGlhdGlvbiA9PT0gdHJ1ZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLm5lZWROZWdvdGlhdGlvbiA9IHRydWU7XHJcbiAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgaWYgKHBjLm5lZWROZWdvdGlhdGlvbikge1xyXG4gICAgICAgIHBjLm5lZWROZWdvdGlhdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgnbmVnb3RpYXRpb25uZWVkZWQnKTtcclxuICAgICAgICBwYy5fZGlzcGF0Y2hFdmVudCgnbmVnb3RpYXRpb25uZWVkZWQnLCBldmVudCk7XHJcbiAgICAgIH1cclxuICAgIH0sIDApO1xyXG4gIH07XHJcblxyXG4gIC8vIFVwZGF0ZSB0aGUgaWNlIGNvbm5lY3Rpb24gc3RhdGUuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl91cGRhdGVJY2VDb25uZWN0aW9uU3RhdGUgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBuZXdTdGF0ZTtcclxuICAgIHZhciBzdGF0ZXMgPSB7XHJcbiAgICAgICduZXcnOiAwLFxyXG4gICAgICBjbG9zZWQ6IDAsXHJcbiAgICAgIGNoZWNraW5nOiAwLFxyXG4gICAgICBjb25uZWN0ZWQ6IDAsXHJcbiAgICAgIGNvbXBsZXRlZDogMCxcclxuICAgICAgZGlzY29ubmVjdGVkOiAwLFxyXG4gICAgICBmYWlsZWQ6IDBcclxuICAgIH07XHJcbiAgICB0aGlzLnRyYW5zY2VpdmVycy5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XHJcbiAgICAgIHN0YXRlc1t0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQuc3RhdGVdKys7XHJcbiAgICB9KTtcclxuXHJcbiAgICBuZXdTdGF0ZSA9ICduZXcnO1xyXG4gICAgaWYgKHN0YXRlcy5mYWlsZWQgPiAwKSB7XHJcbiAgICAgIG5ld1N0YXRlID0gJ2ZhaWxlZCc7XHJcbiAgICB9IGVsc2UgaWYgKHN0YXRlcy5jaGVja2luZyA+IDApIHtcclxuICAgICAgbmV3U3RhdGUgPSAnY2hlY2tpbmcnO1xyXG4gICAgfSBlbHNlIGlmIChzdGF0ZXMuZGlzY29ubmVjdGVkID4gMCkge1xyXG4gICAgICBuZXdTdGF0ZSA9ICdkaXNjb25uZWN0ZWQnO1xyXG4gICAgfSBlbHNlIGlmIChzdGF0ZXMubmV3ID4gMCkge1xyXG4gICAgICBuZXdTdGF0ZSA9ICduZXcnO1xyXG4gICAgfSBlbHNlIGlmIChzdGF0ZXMuY29ubmVjdGVkID4gMCkge1xyXG4gICAgICBuZXdTdGF0ZSA9ICdjb25uZWN0ZWQnO1xyXG4gICAgfSBlbHNlIGlmIChzdGF0ZXMuY29tcGxldGVkID4gMCkge1xyXG4gICAgICBuZXdTdGF0ZSA9ICdjb21wbGV0ZWQnO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChuZXdTdGF0ZSAhPT0gdGhpcy5pY2VDb25uZWN0aW9uU3RhdGUpIHtcclxuICAgICAgdGhpcy5pY2VDb25uZWN0aW9uU3RhdGUgPSBuZXdTdGF0ZTtcclxuICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdpY2Vjb25uZWN0aW9uc3RhdGVjaGFuZ2UnKTtcclxuICAgICAgdGhpcy5fZGlzcGF0Y2hFdmVudCgnaWNlY29ubmVjdGlvbnN0YXRlY2hhbmdlJywgZXZlbnQpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8vIFVwZGF0ZSB0aGUgY29ubmVjdGlvbiBzdGF0ZS5cclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX3VwZGF0ZUNvbm5lY3Rpb25TdGF0ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIG5ld1N0YXRlO1xyXG4gICAgdmFyIHN0YXRlcyA9IHtcclxuICAgICAgJ25ldyc6IDAsXHJcbiAgICAgIGNsb3NlZDogMCxcclxuICAgICAgY29ubmVjdGluZzogMCxcclxuICAgICAgY29ubmVjdGVkOiAwLFxyXG4gICAgICBjb21wbGV0ZWQ6IDAsXHJcbiAgICAgIGRpc2Nvbm5lY3RlZDogMCxcclxuICAgICAgZmFpbGVkOiAwXHJcbiAgICB9O1xyXG4gICAgdGhpcy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xyXG4gICAgICBzdGF0ZXNbdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LnN0YXRlXSsrO1xyXG4gICAgICBzdGF0ZXNbdHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydC5zdGF0ZV0rKztcclxuICAgIH0pO1xyXG4gICAgLy8gSUNFVHJhbnNwb3J0LmNvbXBsZXRlZCBhbmQgY29ubmVjdGVkIGFyZSB0aGUgc2FtZSBmb3IgdGhpcyBwdXJwb3NlLlxyXG4gICAgc3RhdGVzLmNvbm5lY3RlZCArPSBzdGF0ZXMuY29tcGxldGVkO1xyXG5cclxuICAgIG5ld1N0YXRlID0gJ25ldyc7XHJcbiAgICBpZiAoc3RhdGVzLmZhaWxlZCA+IDApIHtcclxuICAgICAgbmV3U3RhdGUgPSAnZmFpbGVkJztcclxuICAgIH0gZWxzZSBpZiAoc3RhdGVzLmNvbm5lY3RpbmcgPiAwKSB7XHJcbiAgICAgIG5ld1N0YXRlID0gJ2Nvbm5lY3RpbmcnO1xyXG4gICAgfSBlbHNlIGlmIChzdGF0ZXMuZGlzY29ubmVjdGVkID4gMCkge1xyXG4gICAgICBuZXdTdGF0ZSA9ICdkaXNjb25uZWN0ZWQnO1xyXG4gICAgfSBlbHNlIGlmIChzdGF0ZXMubmV3ID4gMCkge1xyXG4gICAgICBuZXdTdGF0ZSA9ICduZXcnO1xyXG4gICAgfSBlbHNlIGlmIChzdGF0ZXMuY29ubmVjdGVkID4gMCkge1xyXG4gICAgICBuZXdTdGF0ZSA9ICdjb25uZWN0ZWQnO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChuZXdTdGF0ZSAhPT0gdGhpcy5jb25uZWN0aW9uU3RhdGUpIHtcclxuICAgICAgdGhpcy5jb25uZWN0aW9uU3RhdGUgPSBuZXdTdGF0ZTtcclxuICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdjb25uZWN0aW9uc3RhdGVjaGFuZ2UnKTtcclxuICAgICAgdGhpcy5fZGlzcGF0Y2hFdmVudCgnY29ubmVjdGlvbnN0YXRlY2hhbmdlJywgZXZlbnQpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5jcmVhdGVPZmZlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHBjID0gdGhpcztcclxuXHJcbiAgICBpZiAocGMuX2lzQ2xvc2VkKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChtYWtlRXJyb3IoJ0ludmFsaWRTdGF0ZUVycm9yJyxcclxuICAgICAgICAgICdDYW4gbm90IGNhbGwgY3JlYXRlT2ZmZXIgYWZ0ZXIgY2xvc2UnKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG51bUF1ZGlvVHJhY2tzID0gcGMudHJhbnNjZWl2ZXJzLmZpbHRlcihmdW5jdGlvbih0KSB7XHJcbiAgICAgIHJldHVybiB0LmtpbmQgPT09ICdhdWRpbyc7XHJcbiAgICB9KS5sZW5ndGg7XHJcbiAgICB2YXIgbnVtVmlkZW9UcmFja3MgPSBwYy50cmFuc2NlaXZlcnMuZmlsdGVyKGZ1bmN0aW9uKHQpIHtcclxuICAgICAgcmV0dXJuIHQua2luZCA9PT0gJ3ZpZGVvJztcclxuICAgIH0pLmxlbmd0aDtcclxuXHJcbiAgICAvLyBEZXRlcm1pbmUgbnVtYmVyIG9mIGF1ZGlvIGFuZCB2aWRlbyB0cmFja3Mgd2UgbmVlZCB0byBzZW5kL3JlY3YuXHJcbiAgICB2YXIgb2ZmZXJPcHRpb25zID0gYXJndW1lbnRzWzBdO1xyXG4gICAgaWYgKG9mZmVyT3B0aW9ucykge1xyXG4gICAgICAvLyBSZWplY3QgQ2hyb21lIGxlZ2FjeSBjb25zdHJhaW50cy5cclxuICAgICAgaWYgKG9mZmVyT3B0aW9ucy5tYW5kYXRvcnkgfHwgb2ZmZXJPcHRpb25zLm9wdGlvbmFsKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcclxuICAgICAgICAgICAgJ0xlZ2FjeSBtYW5kYXRvcnkvb3B0aW9uYWwgY29uc3RyYWludHMgbm90IHN1cHBvcnRlZC4nKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW8gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbyA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgbnVtQXVkaW9UcmFja3MgPSAxO1xyXG4gICAgICAgIH0gZWxzZSBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW8gPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICBudW1BdWRpb1RyYWNrcyA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG51bUF1ZGlvVHJhY2tzID0gb2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW87XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVWaWRlbyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvID09PSB0cnVlKSB7XHJcbiAgICAgICAgICBudW1WaWRlb1RyYWNrcyA9IDE7XHJcbiAgICAgICAgfSBlbHNlIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVWaWRlbyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgIG51bVZpZGVvVHJhY2tzID0gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbnVtVmlkZW9UcmFja3MgPSBvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVWaWRlbztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwYy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xyXG4gICAgICBpZiAodHJhbnNjZWl2ZXIua2luZCA9PT0gJ2F1ZGlvJykge1xyXG4gICAgICAgIG51bUF1ZGlvVHJhY2tzLS07XHJcbiAgICAgICAgaWYgKG51bUF1ZGlvVHJhY2tzIDwgMCkge1xyXG4gICAgICAgICAgdHJhbnNjZWl2ZXIud2FudFJlY2VpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIua2luZCA9PT0gJ3ZpZGVvJykge1xyXG4gICAgICAgIG51bVZpZGVvVHJhY2tzLS07XHJcbiAgICAgICAgaWYgKG51bVZpZGVvVHJhY2tzIDwgMCkge1xyXG4gICAgICAgICAgdHJhbnNjZWl2ZXIud2FudFJlY2VpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIENyZWF0ZSBNLWxpbmVzIGZvciByZWN2b25seSBzdHJlYW1zLlxyXG4gICAgd2hpbGUgKG51bUF1ZGlvVHJhY2tzID4gMCB8fCBudW1WaWRlb1RyYWNrcyA+IDApIHtcclxuICAgICAgaWYgKG51bUF1ZGlvVHJhY2tzID4gMCkge1xyXG4gICAgICAgIHBjLl9jcmVhdGVUcmFuc2NlaXZlcignYXVkaW8nKTtcclxuICAgICAgICBudW1BdWRpb1RyYWNrcy0tO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChudW1WaWRlb1RyYWNrcyA+IDApIHtcclxuICAgICAgICBwYy5fY3JlYXRlVHJhbnNjZWl2ZXIoJ3ZpZGVvJyk7XHJcbiAgICAgICAgbnVtVmlkZW9UcmFja3MtLTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBzZHAgPSBTRFBVdGlscy53cml0ZVNlc3Npb25Cb2lsZXJwbGF0ZShwYy5fc2RwU2Vzc2lvbklkLFxyXG4gICAgICAgIHBjLl9zZHBTZXNzaW9uVmVyc2lvbisrKTtcclxuICAgIHBjLnRyYW5zY2VpdmVycy5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zY2VpdmVyLCBzZHBNTGluZUluZGV4KSB7XHJcbiAgICAgIC8vIEZvciBlYWNoIHRyYWNrLCBjcmVhdGUgYW4gaWNlIGdhdGhlcmVyLCBpY2UgdHJhbnNwb3J0LFxyXG4gICAgICAvLyBkdGxzIHRyYW5zcG9ydCwgcG90ZW50aWFsbHkgcnRwc2VuZGVyIGFuZCBydHByZWNlaXZlci5cclxuICAgICAgdmFyIHRyYWNrID0gdHJhbnNjZWl2ZXIudHJhY2s7XHJcbiAgICAgIHZhciBraW5kID0gdHJhbnNjZWl2ZXIua2luZDtcclxuICAgICAgdmFyIG1pZCA9IHRyYW5zY2VpdmVyLm1pZCB8fCBTRFBVdGlscy5nZW5lcmF0ZUlkZW50aWZpZXIoKTtcclxuICAgICAgdHJhbnNjZWl2ZXIubWlkID0gbWlkO1xyXG5cclxuICAgICAgaWYgKCF0cmFuc2NlaXZlci5pY2VHYXRoZXJlcikge1xyXG4gICAgICAgIHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyID0gcGMuX2NyZWF0ZUljZUdhdGhlcmVyKHNkcE1MaW5lSW5kZXgsXHJcbiAgICAgICAgICAgIHBjLnVzaW5nQnVuZGxlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIGxvY2FsQ2FwYWJpbGl0aWVzID0gd2luZG93LlJUQ1J0cFNlbmRlci5nZXRDYXBhYmlsaXRpZXMoa2luZCk7XHJcbiAgICAgIC8vIGZpbHRlciBSVFggdW50aWwgYWRkaXRpb25hbCBzdHVmZiBuZWVkZWQgZm9yIFJUWCBpcyBpbXBsZW1lbnRlZFxyXG4gICAgICAvLyBpbiBhZGFwdGVyLmpzXHJcbiAgICAgIGlmIChlZGdlVmVyc2lvbiA8IDE1MDE5KSB7XHJcbiAgICAgICAgbG9jYWxDYXBhYmlsaXRpZXMuY29kZWNzID0gbG9jYWxDYXBhYmlsaXRpZXMuY29kZWNzLmZpbHRlcihcclxuICAgICAgICAgICAgZnVuY3Rpb24oY29kZWMpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gY29kZWMubmFtZSAhPT0gJ3J0eCc7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGxvY2FsQ2FwYWJpbGl0aWVzLmNvZGVjcy5mb3JFYWNoKGZ1bmN0aW9uKGNvZGVjKSB7XHJcbiAgICAgICAgLy8gd29yayBhcm91bmQgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3dlYnJ0Yy9pc3N1ZXMvZGV0YWlsP2lkPTY1NTJcclxuICAgICAgICAvLyBieSBhZGRpbmcgbGV2ZWwtYXN5bW1ldHJ5LWFsbG93ZWQ9MVxyXG4gICAgICAgIGlmIChjb2RlYy5uYW1lID09PSAnSDI2NCcgJiZcclxuICAgICAgICAgICAgY29kZWMucGFyYW1ldGVyc1snbGV2ZWwtYXN5bW1ldHJ5LWFsbG93ZWQnXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBjb2RlYy5wYXJhbWV0ZXJzWydsZXZlbC1hc3ltbWV0cnktYWxsb3dlZCddID0gJzEnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZm9yIHN1YnNlcXVlbnQgb2ZmZXJzLCB3ZSBtaWdodCBoYXZlIHRvIHJlLXVzZSB0aGUgcGF5bG9hZFxyXG4gICAgICAgIC8vIHR5cGUgb2YgdGhlIGxhc3Qgb2ZmZXIuXHJcbiAgICAgICAgaWYgKHRyYW5zY2VpdmVyLnJlbW90ZUNhcGFiaWxpdGllcyAmJlxyXG4gICAgICAgICAgICB0cmFuc2NlaXZlci5yZW1vdGVDYXBhYmlsaXRpZXMuY29kZWNzKSB7XHJcbiAgICAgICAgICB0cmFuc2NlaXZlci5yZW1vdGVDYXBhYmlsaXRpZXMuY29kZWNzLmZvckVhY2goZnVuY3Rpb24ocmVtb3RlQ29kZWMpIHtcclxuICAgICAgICAgICAgaWYgKGNvZGVjLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gcmVtb3RlQ29kZWMubmFtZS50b0xvd2VyQ2FzZSgpICYmXHJcbiAgICAgICAgICAgICAgICBjb2RlYy5jbG9ja1JhdGUgPT09IHJlbW90ZUNvZGVjLmNsb2NrUmF0ZSkge1xyXG4gICAgICAgICAgICAgIGNvZGVjLnByZWZlcnJlZFBheWxvYWRUeXBlID0gcmVtb3RlQ29kZWMucGF5bG9hZFR5cGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIGxvY2FsQ2FwYWJpbGl0aWVzLmhlYWRlckV4dGVuc2lvbnMuZm9yRWFjaChmdW5jdGlvbihoZHJFeHQpIHtcclxuICAgICAgICB2YXIgcmVtb3RlRXh0ZW5zaW9ucyA9IHRyYW5zY2VpdmVyLnJlbW90ZUNhcGFiaWxpdGllcyAmJlxyXG4gICAgICAgICAgICB0cmFuc2NlaXZlci5yZW1vdGVDYXBhYmlsaXRpZXMuaGVhZGVyRXh0ZW5zaW9ucyB8fCBbXTtcclxuICAgICAgICByZW1vdGVFeHRlbnNpb25zLmZvckVhY2goZnVuY3Rpb24ockhkckV4dCkge1xyXG4gICAgICAgICAgaWYgKGhkckV4dC51cmkgPT09IHJIZHJFeHQudXJpKSB7XHJcbiAgICAgICAgICAgIGhkckV4dC5pZCA9IHJIZHJFeHQuaWQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gZ2VuZXJhdGUgYW4gc3NyYyBub3csIHRvIGJlIHVzZWQgbGF0ZXIgaW4gcnRwU2VuZGVyLnNlbmRcclxuICAgICAgdmFyIHNlbmRFbmNvZGluZ1BhcmFtZXRlcnMgPSB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzIHx8IFt7XHJcbiAgICAgICAgc3NyYzogKDIgKiBzZHBNTGluZUluZGV4ICsgMSkgKiAxMDAxXHJcbiAgICAgIH1dO1xyXG4gICAgICBpZiAodHJhY2spIHtcclxuICAgICAgICAvLyBhZGQgUlRYXHJcbiAgICAgICAgaWYgKGVkZ2VWZXJzaW9uID49IDE1MDE5ICYmIGtpbmQgPT09ICd2aWRlbycgJiZcclxuICAgICAgICAgICAgIXNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4KSB7XHJcbiAgICAgICAgICBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCA9IHtcclxuICAgICAgICAgICAgc3NyYzogc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjICsgMVxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0cmFuc2NlaXZlci53YW50UmVjZWl2ZSkge1xyXG4gICAgICAgIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyID0gbmV3IHdpbmRvdy5SVENSdHBSZWNlaXZlcihcclxuICAgICAgICAgICAgdHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydCwga2luZCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRyYW5zY2VpdmVyLmxvY2FsQ2FwYWJpbGl0aWVzID0gbG9jYWxDYXBhYmlsaXRpZXM7XHJcbiAgICAgIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnMgPSBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gYWx3YXlzIG9mZmVyIEJVTkRMRSBhbmQgZGlzcG9zZSBvbiByZXR1cm4gaWYgbm90IHN1cHBvcnRlZC5cclxuICAgIGlmIChwYy5fY29uZmlnLmJ1bmRsZVBvbGljeSAhPT0gJ21heC1jb21wYXQnKSB7XHJcbiAgICAgIHNkcCArPSAnYT1ncm91cDpCVU5ETEUgJyArIHBjLnRyYW5zY2VpdmVycy5tYXAoZnVuY3Rpb24odCkge1xyXG4gICAgICAgIHJldHVybiB0Lm1pZDtcclxuICAgICAgfSkuam9pbignICcpICsgJ1xcclxcbic7XHJcbiAgICB9XHJcbiAgICBzZHAgKz0gJ2E9aWNlLW9wdGlvbnM6dHJpY2tsZVxcclxcbic7XHJcblxyXG4gICAgcGMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIsIHNkcE1MaW5lSW5kZXgpIHtcclxuICAgICAgc2RwICs9IHdyaXRlTWVkaWFTZWN0aW9uKHRyYW5zY2VpdmVyLCB0cmFuc2NlaXZlci5sb2NhbENhcGFiaWxpdGllcyxcclxuICAgICAgICAgICdvZmZlcicsIHRyYW5zY2VpdmVyLnN0cmVhbSwgcGMuX2R0bHNSb2xlKTtcclxuICAgICAgc2RwICs9ICdhPXJ0Y3AtcnNpemVcXHJcXG4nO1xyXG5cclxuICAgICAgaWYgKHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyICYmIHBjLmljZUdhdGhlcmluZ1N0YXRlICE9PSAnbmV3JyAmJlxyXG4gICAgICAgICAgKHNkcE1MaW5lSW5kZXggPT09IDAgfHwgIXBjLnVzaW5nQnVuZGxlKSkge1xyXG4gICAgICAgIHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyLmdldExvY2FsQ2FuZGlkYXRlcygpLmZvckVhY2goZnVuY3Rpb24oY2FuZCkge1xyXG4gICAgICAgICAgY2FuZC5jb21wb25lbnQgPSAxO1xyXG4gICAgICAgICAgc2RwICs9ICdhPScgKyBTRFBVdGlscy53cml0ZUNhbmRpZGF0ZShjYW5kKSArICdcXHJcXG4nO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAodHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIuc3RhdGUgPT09ICdjb21wbGV0ZWQnKSB7XHJcbiAgICAgICAgICBzZHAgKz0gJ2E9ZW5kLW9mLWNhbmRpZGF0ZXNcXHJcXG4nO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIGRlc2MgPSBuZXcgd2luZG93LlJUQ1Nlc3Npb25EZXNjcmlwdGlvbih7XHJcbiAgICAgIHR5cGU6ICdvZmZlcicsXHJcbiAgICAgIHNkcDogc2RwXHJcbiAgICB9KTtcclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZGVzYyk7XHJcbiAgfTtcclxuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmNyZWF0ZUFuc3dlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHBjID0gdGhpcztcclxuXHJcbiAgICBpZiAocGMuX2lzQ2xvc2VkKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChtYWtlRXJyb3IoJ0ludmFsaWRTdGF0ZUVycm9yJyxcclxuICAgICAgICAgICdDYW4gbm90IGNhbGwgY3JlYXRlQW5zd2VyIGFmdGVyIGNsb3NlJykpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghKHBjLnNpZ25hbGluZ1N0YXRlID09PSAnaGF2ZS1yZW1vdGUtb2ZmZXInIHx8XHJcbiAgICAgICAgcGMuc2lnbmFsaW5nU3RhdGUgPT09ICdoYXZlLWxvY2FsLXByYW5zd2VyJykpIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG1ha2VFcnJvcignSW52YWxpZFN0YXRlRXJyb3InLFxyXG4gICAgICAgICAgJ0NhbiBub3QgY2FsbCBjcmVhdGVBbnN3ZXIgaW4gc2lnbmFsaW5nU3RhdGUgJyArIHBjLnNpZ25hbGluZ1N0YXRlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHNkcCA9IFNEUFV0aWxzLndyaXRlU2Vzc2lvbkJvaWxlcnBsYXRlKHBjLl9zZHBTZXNzaW9uSWQsXHJcbiAgICAgICAgcGMuX3NkcFNlc3Npb25WZXJzaW9uKyspO1xyXG4gICAgaWYgKHBjLnVzaW5nQnVuZGxlKSB7XHJcbiAgICAgIHNkcCArPSAnYT1ncm91cDpCVU5ETEUgJyArIHBjLnRyYW5zY2VpdmVycy5tYXAoZnVuY3Rpb24odCkge1xyXG4gICAgICAgIHJldHVybiB0Lm1pZDtcclxuICAgICAgfSkuam9pbignICcpICsgJ1xcclxcbic7XHJcbiAgICB9XHJcbiAgICB2YXIgbWVkaWFTZWN0aW9uc0luT2ZmZXIgPSBTRFBVdGlscy5nZXRNZWRpYVNlY3Rpb25zKFxyXG4gICAgICAgIHBjLnJlbW90ZURlc2NyaXB0aW9uLnNkcCkubGVuZ3RoO1xyXG4gICAgcGMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIsIHNkcE1MaW5lSW5kZXgpIHtcclxuICAgICAgaWYgKHNkcE1MaW5lSW5kZXggKyAxID4gbWVkaWFTZWN0aW9uc0luT2ZmZXIpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRyYW5zY2VpdmVyLnJlamVjdGVkKSB7XHJcbiAgICAgICAgaWYgKHRyYW5zY2VpdmVyLmtpbmQgPT09ICdhcHBsaWNhdGlvbicpIHtcclxuICAgICAgICAgIHNkcCArPSAnbT1hcHBsaWNhdGlvbiAwIERUTFMvU0NUUCA1MDAwXFxyXFxuJztcclxuICAgICAgICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLmtpbmQgPT09ICdhdWRpbycpIHtcclxuICAgICAgICAgIHNkcCArPSAnbT1hdWRpbyAwIFVEUC9UTFMvUlRQL1NBVlBGIDBcXHJcXG4nICtcclxuICAgICAgICAgICAgICAnYT1ydHBtYXA6MCBQQ01VLzgwMDBcXHJcXG4nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIua2luZCA9PT0gJ3ZpZGVvJykge1xyXG4gICAgICAgICAgc2RwICs9ICdtPXZpZGVvIDAgVURQL1RMUy9SVFAvU0FWUEYgMTIwXFxyXFxuJyArXHJcbiAgICAgICAgICAgICAgJ2E9cnRwbWFwOjEyMCBWUDgvOTAwMDBcXHJcXG4nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZHAgKz0gJ2M9SU4gSVA0IDAuMC4wLjBcXHJcXG4nICtcclxuICAgICAgICAgICAgJ2E9aW5hY3RpdmVcXHJcXG4nICtcclxuICAgICAgICAgICAgJ2E9bWlkOicgKyB0cmFuc2NlaXZlci5taWQgKyAnXFxyXFxuJztcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEZJWE1FOiBsb29rIGF0IGRpcmVjdGlvbi5cclxuICAgICAgaWYgKHRyYW5zY2VpdmVyLnN0cmVhbSkge1xyXG4gICAgICAgIHZhciBsb2NhbFRyYWNrO1xyXG4gICAgICAgIGlmICh0cmFuc2NlaXZlci5raW5kID09PSAnYXVkaW8nKSB7XHJcbiAgICAgICAgICBsb2NhbFRyYWNrID0gdHJhbnNjZWl2ZXIuc3RyZWFtLmdldEF1ZGlvVHJhY2tzKClbMF07XHJcbiAgICAgICAgfSBlbHNlIGlmICh0cmFuc2NlaXZlci5raW5kID09PSAndmlkZW8nKSB7XHJcbiAgICAgICAgICBsb2NhbFRyYWNrID0gdHJhbnNjZWl2ZXIuc3RyZWFtLmdldFZpZGVvVHJhY2tzKClbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChsb2NhbFRyYWNrKSB7XHJcbiAgICAgICAgICAvLyBhZGQgUlRYXHJcbiAgICAgICAgICBpZiAoZWRnZVZlcnNpb24gPj0gMTUwMTkgJiYgdHJhbnNjZWl2ZXIua2luZCA9PT0gJ3ZpZGVvJyAmJlxyXG4gICAgICAgICAgICAgICF0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCkge1xyXG4gICAgICAgICAgICB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCA9IHtcclxuICAgICAgICAgICAgICBzc3JjOiB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmMgKyAxXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBDYWxjdWxhdGUgaW50ZXJzZWN0aW9uIG9mIGNhcGFiaWxpdGllcy5cclxuICAgICAgdmFyIGNvbW1vbkNhcGFiaWxpdGllcyA9IGdldENvbW1vbkNhcGFiaWxpdGllcyhcclxuICAgICAgICAgIHRyYW5zY2VpdmVyLmxvY2FsQ2FwYWJpbGl0aWVzLFxyXG4gICAgICAgICAgdHJhbnNjZWl2ZXIucmVtb3RlQ2FwYWJpbGl0aWVzKTtcclxuXHJcbiAgICAgIHZhciBoYXNSdHggPSBjb21tb25DYXBhYmlsaXRpZXMuY29kZWNzLmZpbHRlcihmdW5jdGlvbihjKSB7XHJcbiAgICAgICAgcmV0dXJuIGMubmFtZS50b0xvd2VyQ2FzZSgpID09PSAncnR4JztcclxuICAgICAgfSkubGVuZ3RoO1xyXG4gICAgICBpZiAoIWhhc1J0eCAmJiB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCkge1xyXG4gICAgICAgIGRlbGV0ZSB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eDtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2RwICs9IHdyaXRlTWVkaWFTZWN0aW9uKHRyYW5zY2VpdmVyLCBjb21tb25DYXBhYmlsaXRpZXMsXHJcbiAgICAgICAgICAnYW5zd2VyJywgdHJhbnNjZWl2ZXIuc3RyZWFtLCBwYy5fZHRsc1JvbGUpO1xyXG4gICAgICBpZiAodHJhbnNjZWl2ZXIucnRjcFBhcmFtZXRlcnMgJiZcclxuICAgICAgICAgIHRyYW5zY2VpdmVyLnJ0Y3BQYXJhbWV0ZXJzLnJlZHVjZWRTaXplKSB7XHJcbiAgICAgICAgc2RwICs9ICdhPXJ0Y3AtcnNpemVcXHJcXG4nO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgZGVzYyA9IG5ldyB3aW5kb3cuUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKHtcclxuICAgICAgdHlwZTogJ2Fuc3dlcicsXHJcbiAgICAgIHNkcDogc2RwXHJcbiAgICB9KTtcclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZGVzYyk7XHJcbiAgfTtcclxuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZEljZUNhbmRpZGF0ZSA9IGZ1bmN0aW9uKGNhbmRpZGF0ZSkge1xyXG4gICAgdmFyIHBjID0gdGhpcztcclxuICAgIHZhciBzZWN0aW9ucztcclxuICAgIGlmIChjYW5kaWRhdGUgJiYgIShjYW5kaWRhdGUuc2RwTUxpbmVJbmRleCAhPT0gdW5kZWZpbmVkIHx8XHJcbiAgICAgICAgY2FuZGlkYXRlLnNkcE1pZCkpIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoJ3NkcE1MaW5lSW5kZXggb3Igc2RwTWlkIHJlcXVpcmVkJykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRPRE86IG5lZWRzIHRvIGdvIGludG8gb3BzIHF1ZXVlLlxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICBpZiAoIXBjLnJlbW90ZURlc2NyaXB0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlamVjdChtYWtlRXJyb3IoJ0ludmFsaWRTdGF0ZUVycm9yJyxcclxuICAgICAgICAgICAgJ0NhbiBub3QgYWRkIElDRSBjYW5kaWRhdGUgd2l0aG91dCBhIHJlbW90ZSBkZXNjcmlwdGlvbicpKTtcclxuICAgICAgfSBlbHNlIGlmICghY2FuZGlkYXRlIHx8IGNhbmRpZGF0ZS5jYW5kaWRhdGUgPT09ICcnKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBwYy50cmFuc2NlaXZlcnMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgIGlmIChwYy50cmFuc2NlaXZlcnNbal0ucmVqZWN0ZWQpIHtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBwYy50cmFuc2NlaXZlcnNbal0uaWNlVHJhbnNwb3J0LmFkZFJlbW90ZUNhbmRpZGF0ZSh7fSk7XHJcbiAgICAgICAgICBzZWN0aW9ucyA9IFNEUFV0aWxzLmdldE1lZGlhU2VjdGlvbnMocGMucmVtb3RlRGVzY3JpcHRpb24uc2RwKTtcclxuICAgICAgICAgIHNlY3Rpb25zW2pdICs9ICdhPWVuZC1vZi1jYW5kaWRhdGVzXFxyXFxuJztcclxuICAgICAgICAgIHBjLnJlbW90ZURlc2NyaXB0aW9uLnNkcCA9XHJcbiAgICAgICAgICAgICAgU0RQVXRpbHMuZ2V0RGVzY3JpcHRpb24ocGMucmVtb3RlRGVzY3JpcHRpb24uc2RwKSArXHJcbiAgICAgICAgICAgICAgc2VjdGlvbnMuam9pbignJyk7XHJcbiAgICAgICAgICBpZiAocGMudXNpbmdCdW5kbGUpIHtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBzZHBNTGluZUluZGV4ID0gY2FuZGlkYXRlLnNkcE1MaW5lSW5kZXg7XHJcbiAgICAgICAgaWYgKGNhbmRpZGF0ZS5zZHBNaWQpIHtcclxuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGMudHJhbnNjZWl2ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChwYy50cmFuc2NlaXZlcnNbaV0ubWlkID09PSBjYW5kaWRhdGUuc2RwTWlkKSB7XHJcbiAgICAgICAgICAgICAgc2RwTUxpbmVJbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHRyYW5zY2VpdmVyID0gcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdO1xyXG4gICAgICAgIGlmICh0cmFuc2NlaXZlcikge1xyXG4gICAgICAgICAgaWYgKHRyYW5zY2VpdmVyLnJlamVjdGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB2YXIgY2FuZCA9IE9iamVjdC5rZXlzKGNhbmRpZGF0ZS5jYW5kaWRhdGUpLmxlbmd0aCA+IDAgP1xyXG4gICAgICAgICAgICAgIFNEUFV0aWxzLnBhcnNlQ2FuZGlkYXRlKGNhbmRpZGF0ZS5jYW5kaWRhdGUpIDoge307XHJcbiAgICAgICAgICAvLyBJZ25vcmUgQ2hyb21lJ3MgaW52YWxpZCBjYW5kaWRhdGVzIHNpbmNlIEVkZ2UgZG9lcyBub3QgbGlrZSB0aGVtLlxyXG4gICAgICAgICAgaWYgKGNhbmQucHJvdG9jb2wgPT09ICd0Y3AnICYmIChjYW5kLnBvcnQgPT09IDAgfHwgY2FuZC5wb3J0ID09PSA5KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgLy8gSWdub3JlIFJUQ1AgY2FuZGlkYXRlcywgd2UgYXNzdW1lIFJUQ1AtTVVYLlxyXG4gICAgICAgICAgaWYgKGNhbmQuY29tcG9uZW50ICYmIGNhbmQuY29tcG9uZW50ICE9PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAvLyB3aGVuIHVzaW5nIGJ1bmRsZSwgYXZvaWQgYWRkaW5nIGNhbmRpZGF0ZXMgdG8gdGhlIHdyb25nXHJcbiAgICAgICAgICAvLyBpY2UgdHJhbnNwb3J0LiBBbmQgYXZvaWQgYWRkaW5nIGNhbmRpZGF0ZXMgYWRkZWQgaW4gdGhlIFNEUC5cclxuICAgICAgICAgIGlmIChzZHBNTGluZUluZGV4ID09PSAwIHx8IChzZHBNTGluZUluZGV4ID4gMCAmJlxyXG4gICAgICAgICAgICAgIHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydCAhPT0gcGMudHJhbnNjZWl2ZXJzWzBdLmljZVRyYW5zcG9ydCkpIHtcclxuICAgICAgICAgICAgaWYgKCFtYXliZUFkZENhbmRpZGF0ZSh0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQsIGNhbmQpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChtYWtlRXJyb3IoJ09wZXJhdGlvbkVycm9yJyxcclxuICAgICAgICAgICAgICAgICAgJ0NhbiBub3QgYWRkIElDRSBjYW5kaWRhdGUnKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyB1cGRhdGUgdGhlIHJlbW90ZURlc2NyaXB0aW9uLlxyXG4gICAgICAgICAgdmFyIGNhbmRpZGF0ZVN0cmluZyA9IGNhbmRpZGF0ZS5jYW5kaWRhdGUudHJpbSgpO1xyXG4gICAgICAgICAgaWYgKGNhbmRpZGF0ZVN0cmluZy5pbmRleE9mKCdhPScpID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNhbmRpZGF0ZVN0cmluZyA9IGNhbmRpZGF0ZVN0cmluZy5zdWJzdHIoMik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBzZWN0aW9ucyA9IFNEUFV0aWxzLmdldE1lZGlhU2VjdGlvbnMocGMucmVtb3RlRGVzY3JpcHRpb24uc2RwKTtcclxuICAgICAgICAgIHNlY3Rpb25zW3NkcE1MaW5lSW5kZXhdICs9ICdhPScgK1xyXG4gICAgICAgICAgICAgIChjYW5kLnR5cGUgPyBjYW5kaWRhdGVTdHJpbmcgOiAnZW5kLW9mLWNhbmRpZGF0ZXMnKVxyXG4gICAgICAgICAgICAgICsgJ1xcclxcbic7XHJcbiAgICAgICAgICBwYy5yZW1vdGVEZXNjcmlwdGlvbi5zZHAgPVxyXG4gICAgICAgICAgICAgIFNEUFV0aWxzLmdldERlc2NyaXB0aW9uKHBjLnJlbW90ZURlc2NyaXB0aW9uLnNkcCkgK1xyXG4gICAgICAgICAgICAgIHNlY3Rpb25zLmpvaW4oJycpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gcmVqZWN0KG1ha2VFcnJvcignT3BlcmF0aW9uRXJyb3InLFxyXG4gICAgICAgICAgICAgICdDYW4gbm90IGFkZCBJQ0UgY2FuZGlkYXRlJykpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXNvbHZlKCk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U3RhdHMgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBwcm9taXNlcyA9IFtdO1xyXG4gICAgdGhpcy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xyXG4gICAgICBbJ3J0cFNlbmRlcicsICdydHBSZWNlaXZlcicsICdpY2VHYXRoZXJlcicsICdpY2VUcmFuc3BvcnQnLFxyXG4gICAgICAgICAgJ2R0bHNUcmFuc3BvcnQnXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xyXG4gICAgICAgICAgICBpZiAodHJhbnNjZWl2ZXJbbWV0aG9kXSkge1xyXG4gICAgICAgICAgICAgIHByb21pc2VzLnB1c2godHJhbnNjZWl2ZXJbbWV0aG9kXS5nZXRTdGF0cygpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIHZhciBmaXhTdGF0c1R5cGUgPSBmdW5jdGlvbihzdGF0KSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgaW5ib3VuZHJ0cDogJ2luYm91bmQtcnRwJyxcclxuICAgICAgICBvdXRib3VuZHJ0cDogJ291dGJvdW5kLXJ0cCcsXHJcbiAgICAgICAgY2FuZGlkYXRlcGFpcjogJ2NhbmRpZGF0ZS1wYWlyJyxcclxuICAgICAgICBsb2NhbGNhbmRpZGF0ZTogJ2xvY2FsLWNhbmRpZGF0ZScsXHJcbiAgICAgICAgcmVtb3RlY2FuZGlkYXRlOiAncmVtb3RlLWNhbmRpZGF0ZSdcclxuICAgICAgfVtzdGF0LnR5cGVdIHx8IHN0YXQudHlwZTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xyXG4gICAgICAvLyBzaGltIGdldFN0YXRzIHdpdGggbWFwbGlrZSBzdXBwb3J0XHJcbiAgICAgIHZhciByZXN1bHRzID0gbmV3IE1hcCgpO1xyXG4gICAgICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICByZXMuZm9yRWFjaChmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgIE9iamVjdC5rZXlzKHJlc3VsdCkuZm9yRWFjaChmdW5jdGlvbihpZCkge1xyXG4gICAgICAgICAgICByZXN1bHRbaWRdLnR5cGUgPSBmaXhTdGF0c1R5cGUocmVzdWx0W2lkXSk7XHJcbiAgICAgICAgICAgIHJlc3VsdHMuc2V0KGlkLCByZXN1bHRbaWRdKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJlc29sdmUocmVzdWx0cyk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgLy8gbGVnYWN5IGNhbGxiYWNrIHNoaW1zLiBTaG91bGQgYmUgbW92ZWQgdG8gYWRhcHRlci5qcyBzb21lIGRheXMuXHJcbiAgdmFyIG1ldGhvZHMgPSBbJ2NyZWF0ZU9mZmVyJywgJ2NyZWF0ZUFuc3dlciddO1xyXG4gIG1ldGhvZHMuZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcclxuICAgIHZhciBuYXRpdmVNZXRob2QgPSBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXTtcclxuICAgIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xyXG4gICAgICBpZiAodHlwZW9mIGFyZ3NbMF0gPT09ICdmdW5jdGlvbicgfHxcclxuICAgICAgICAgIHR5cGVvZiBhcmdzWzFdID09PSAnZnVuY3Rpb24nKSB7IC8vIGxlZ2FjeVxyXG4gICAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkodGhpcywgW2FyZ3VtZW50c1syXV0pXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oZGVzY3JpcHRpb24pIHtcclxuICAgICAgICAgIGlmICh0eXBlb2YgYXJnc1swXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICBhcmdzWzBdLmFwcGx5KG51bGwsIFtkZXNjcmlwdGlvbl0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIGFyZ3NbMV0gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgYXJnc1sxXS5hcHBseShudWxsLCBbZXJyb3JdKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xyXG4gIH0pO1xyXG5cclxuICBtZXRob2RzID0gWydzZXRMb2NhbERlc2NyaXB0aW9uJywgJ3NldFJlbW90ZURlc2NyaXB0aW9uJywgJ2FkZEljZUNhbmRpZGF0ZSddO1xyXG4gIG1ldGhvZHMuZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcclxuICAgIHZhciBuYXRpdmVNZXRob2QgPSBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXTtcclxuICAgIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xyXG4gICAgICBpZiAodHlwZW9mIGFyZ3NbMV0gPT09ICdmdW5jdGlvbicgfHxcclxuICAgICAgICAgIHR5cGVvZiBhcmdzWzJdID09PSAnZnVuY3Rpb24nKSB7IC8vIGxlZ2FjeVxyXG4gICAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBhcmdzWzFdID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIGFyZ3NbMV0uYXBwbHkobnVsbCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcclxuICAgICAgICAgIGlmICh0eXBlb2YgYXJnc1syXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICBhcmdzWzJdLmFwcGx5KG51bGwsIFtlcnJvcl0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIH07XHJcbiAgfSk7XHJcblxyXG4gIC8vIGdldFN0YXRzIGlzIHNwZWNpYWwuIEl0IGRvZXNuJ3QgaGF2ZSBhIHNwZWMgbGVnYWN5IG1ldGhvZCB5ZXQgd2Ugc3VwcG9ydFxyXG4gIC8vIGdldFN0YXRzKHNvbWV0aGluZywgY2IpIHdpdGhvdXQgZXJyb3IgY2FsbGJhY2tzLlxyXG4gIFsnZ2V0U3RhdHMnXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xyXG4gICAgdmFyIG5hdGl2ZU1ldGhvZCA9IFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdO1xyXG4gICAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XHJcbiAgICAgIGlmICh0eXBlb2YgYXJnc1sxXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBhcmdzWzFdID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIGFyZ3NbMV0uYXBwbHkobnVsbCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgfTtcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIFJUQ1BlZXJDb25uZWN0aW9uO1xyXG59O1xyXG5cclxufSx7XCJzZHBcIjoyfV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gU0RQIGhlbHBlcnMuXHJcbnZhciBTRFBVdGlscyA9IHt9O1xyXG5cclxuLy8gR2VuZXJhdGUgYW4gYWxwaGFudW1lcmljIGlkZW50aWZpZXIgZm9yIGNuYW1lIG9yIG1pZHMuXHJcbi8vIFRPRE86IHVzZSBVVUlEcyBpbnN0ZWFkPyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9qZWQvOTgyODgzXHJcblNEUFV0aWxzLmdlbmVyYXRlSWRlbnRpZmllciA9IGZ1bmN0aW9uKCkge1xyXG4gIHJldHVybiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgMTApO1xyXG59O1xyXG5cclxuLy8gVGhlIFJUQ1AgQ05BTUUgdXNlZCBieSBhbGwgcGVlcmNvbm5lY3Rpb25zIGZyb20gdGhlIHNhbWUgSlMuXHJcblNEUFV0aWxzLmxvY2FsQ05hbWUgPSBTRFBVdGlscy5nZW5lcmF0ZUlkZW50aWZpZXIoKTtcclxuXHJcbi8vIFNwbGl0cyBTRFAgaW50byBsaW5lcywgZGVhbGluZyB3aXRoIGJvdGggQ1JMRiBhbmQgTEYuXHJcblNEUFV0aWxzLnNwbGl0TGluZXMgPSBmdW5jdGlvbihibG9iKSB7XHJcbiAgcmV0dXJuIGJsb2IudHJpbSgpLnNwbGl0KCdcXG4nKS5tYXAoZnVuY3Rpb24obGluZSkge1xyXG4gICAgcmV0dXJuIGxpbmUudHJpbSgpO1xyXG4gIH0pO1xyXG59O1xyXG4vLyBTcGxpdHMgU0RQIGludG8gc2Vzc2lvbnBhcnQgYW5kIG1lZGlhc2VjdGlvbnMuIEVuc3VyZXMgQ1JMRi5cclxuU0RQVXRpbHMuc3BsaXRTZWN0aW9ucyA9IGZ1bmN0aW9uKGJsb2IpIHtcclxuICB2YXIgcGFydHMgPSBibG9iLnNwbGl0KCdcXG5tPScpO1xyXG4gIHJldHVybiBwYXJ0cy5tYXAoZnVuY3Rpb24ocGFydCwgaW5kZXgpIHtcclxuICAgIHJldHVybiAoaW5kZXggPiAwID8gJ209JyArIHBhcnQgOiBwYXJ0KS50cmltKCkgKyAnXFxyXFxuJztcclxuICB9KTtcclxufTtcclxuXHJcbi8vIHJldHVybnMgdGhlIHNlc3Npb24gZGVzY3JpcHRpb24uXHJcblNEUFV0aWxzLmdldERlc2NyaXB0aW9uID0gZnVuY3Rpb24oYmxvYikge1xyXG4gIHZhciBzZWN0aW9ucyA9IFNEUFV0aWxzLnNwbGl0U2VjdGlvbnMoYmxvYik7XHJcbiAgcmV0dXJuIHNlY3Rpb25zICYmIHNlY3Rpb25zWzBdO1xyXG59O1xyXG5cclxuLy8gcmV0dXJucyB0aGUgaW5kaXZpZHVhbCBtZWRpYSBzZWN0aW9ucy5cclxuU0RQVXRpbHMuZ2V0TWVkaWFTZWN0aW9ucyA9IGZ1bmN0aW9uKGJsb2IpIHtcclxuICB2YXIgc2VjdGlvbnMgPSBTRFBVdGlscy5zcGxpdFNlY3Rpb25zKGJsb2IpO1xyXG4gIHNlY3Rpb25zLnNoaWZ0KCk7XHJcbiAgcmV0dXJuIHNlY3Rpb25zO1xyXG59O1xyXG5cclxuLy8gUmV0dXJucyBsaW5lcyB0aGF0IHN0YXJ0IHdpdGggYSBjZXJ0YWluIHByZWZpeC5cclxuU0RQVXRpbHMubWF0Y2hQcmVmaXggPSBmdW5jdGlvbihibG9iLCBwcmVmaXgpIHtcclxuICByZXR1cm4gU0RQVXRpbHMuc3BsaXRMaW5lcyhibG9iKS5maWx0ZXIoZnVuY3Rpb24obGluZSkge1xyXG4gICAgcmV0dXJuIGxpbmUuaW5kZXhPZihwcmVmaXgpID09PSAwO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuLy8gUGFyc2VzIGFuIElDRSBjYW5kaWRhdGUgbGluZS4gU2FtcGxlIGlucHV0OlxyXG4vLyBjYW5kaWRhdGU6NzAyNzg2MzUwIDIgdWRwIDQxODE5OTAyIDguOC44LjggNjA3NjkgdHlwIHJlbGF5IHJhZGRyIDguOC44LjhcclxuLy8gcnBvcnQgNTU5OTZcIlxyXG5TRFBVdGlscy5wYXJzZUNhbmRpZGF0ZSA9IGZ1bmN0aW9uKGxpbmUpIHtcclxuICB2YXIgcGFydHM7XHJcbiAgLy8gUGFyc2UgYm90aCB2YXJpYW50cy5cclxuICBpZiAobGluZS5pbmRleE9mKCdhPWNhbmRpZGF0ZTonKSA9PT0gMCkge1xyXG4gICAgcGFydHMgPSBsaW5lLnN1YnN0cmluZygxMikuc3BsaXQoJyAnKTtcclxuICB9IGVsc2Uge1xyXG4gICAgcGFydHMgPSBsaW5lLnN1YnN0cmluZygxMCkuc3BsaXQoJyAnKTtcclxuICB9XHJcblxyXG4gIHZhciBjYW5kaWRhdGUgPSB7XHJcbiAgICBmb3VuZGF0aW9uOiBwYXJ0c1swXSxcclxuICAgIGNvbXBvbmVudDogcGFyc2VJbnQocGFydHNbMV0sIDEwKSxcclxuICAgIHByb3RvY29sOiBwYXJ0c1syXS50b0xvd2VyQ2FzZSgpLFxyXG4gICAgcHJpb3JpdHk6IHBhcnNlSW50KHBhcnRzWzNdLCAxMCksXHJcbiAgICBpcDogcGFydHNbNF0sXHJcbiAgICBwb3J0OiBwYXJzZUludChwYXJ0c1s1XSwgMTApLFxyXG4gICAgLy8gc2tpcCBwYXJ0c1s2XSA9PSAndHlwJ1xyXG4gICAgdHlwZTogcGFydHNbN11cclxuICB9O1xyXG5cclxuICBmb3IgKHZhciBpID0gODsgaSA8IHBhcnRzLmxlbmd0aDsgaSArPSAyKSB7XHJcbiAgICBzd2l0Y2ggKHBhcnRzW2ldKSB7XHJcbiAgICAgIGNhc2UgJ3JhZGRyJzpcclxuICAgICAgICBjYW5kaWRhdGUucmVsYXRlZEFkZHJlc3MgPSBwYXJ0c1tpICsgMV07XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3Jwb3J0JzpcclxuICAgICAgICBjYW5kaWRhdGUucmVsYXRlZFBvcnQgPSBwYXJzZUludChwYXJ0c1tpICsgMV0sIDEwKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAndGNwdHlwZSc6XHJcbiAgICAgICAgY2FuZGlkYXRlLnRjcFR5cGUgPSBwYXJ0c1tpICsgMV07XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3VmcmFnJzpcclxuICAgICAgICBjYW5kaWRhdGUudWZyYWcgPSBwYXJ0c1tpICsgMV07IC8vIGZvciBiYWNrd2FyZCBjb21wYWJpbGl0eS5cclxuICAgICAgICBjYW5kaWRhdGUudXNlcm5hbWVGcmFnbWVudCA9IHBhcnRzW2kgKyAxXTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDogLy8gZXh0ZW5zaW9uIGhhbmRsaW5nLCBpbiBwYXJ0aWN1bGFyIHVmcmFnXHJcbiAgICAgICAgY2FuZGlkYXRlW3BhcnRzW2ldXSA9IHBhcnRzW2kgKyAxXTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIGNhbmRpZGF0ZTtcclxufTtcclxuXHJcbi8vIFRyYW5zbGF0ZXMgYSBjYW5kaWRhdGUgb2JqZWN0IGludG8gU0RQIGNhbmRpZGF0ZSBhdHRyaWJ1dGUuXHJcblNEUFV0aWxzLndyaXRlQ2FuZGlkYXRlID0gZnVuY3Rpb24oY2FuZGlkYXRlKSB7XHJcbiAgdmFyIHNkcCA9IFtdO1xyXG4gIHNkcC5wdXNoKGNhbmRpZGF0ZS5mb3VuZGF0aW9uKTtcclxuICBzZHAucHVzaChjYW5kaWRhdGUuY29tcG9uZW50KTtcclxuICBzZHAucHVzaChjYW5kaWRhdGUucHJvdG9jb2wudG9VcHBlckNhc2UoKSk7XHJcbiAgc2RwLnB1c2goY2FuZGlkYXRlLnByaW9yaXR5KTtcclxuICBzZHAucHVzaChjYW5kaWRhdGUuaXApO1xyXG4gIHNkcC5wdXNoKGNhbmRpZGF0ZS5wb3J0KTtcclxuXHJcbiAgdmFyIHR5cGUgPSBjYW5kaWRhdGUudHlwZTtcclxuICBzZHAucHVzaCgndHlwJyk7XHJcbiAgc2RwLnB1c2godHlwZSk7XHJcbiAgaWYgKHR5cGUgIT09ICdob3N0JyAmJiBjYW5kaWRhdGUucmVsYXRlZEFkZHJlc3MgJiZcclxuICAgICAgY2FuZGlkYXRlLnJlbGF0ZWRQb3J0KSB7XHJcbiAgICBzZHAucHVzaCgncmFkZHInKTtcclxuICAgIHNkcC5wdXNoKGNhbmRpZGF0ZS5yZWxhdGVkQWRkcmVzcyk7IC8vIHdhczogcmVsQWRkclxyXG4gICAgc2RwLnB1c2goJ3Jwb3J0Jyk7XHJcbiAgICBzZHAucHVzaChjYW5kaWRhdGUucmVsYXRlZFBvcnQpOyAvLyB3YXM6IHJlbFBvcnRcclxuICB9XHJcbiAgaWYgKGNhbmRpZGF0ZS50Y3BUeXBlICYmIGNhbmRpZGF0ZS5wcm90b2NvbC50b0xvd2VyQ2FzZSgpID09PSAndGNwJykge1xyXG4gICAgc2RwLnB1c2goJ3RjcHR5cGUnKTtcclxuICAgIHNkcC5wdXNoKGNhbmRpZGF0ZS50Y3BUeXBlKTtcclxuICB9XHJcbiAgaWYgKGNhbmRpZGF0ZS51c2VybmFtZUZyYWdtZW50IHx8IGNhbmRpZGF0ZS51ZnJhZykge1xyXG4gICAgc2RwLnB1c2goJ3VmcmFnJyk7XHJcbiAgICBzZHAucHVzaChjYW5kaWRhdGUudXNlcm5hbWVGcmFnbWVudCB8fCBjYW5kaWRhdGUudWZyYWcpO1xyXG4gIH1cclxuICByZXR1cm4gJ2NhbmRpZGF0ZTonICsgc2RwLmpvaW4oJyAnKTtcclxufTtcclxuXHJcbi8vIFBhcnNlcyBhbiBpY2Utb3B0aW9ucyBsaW5lLCByZXR1cm5zIGFuIGFycmF5IG9mIG9wdGlvbiB0YWdzLlxyXG4vLyBhPWljZS1vcHRpb25zOmZvbyBiYXJcclxuU0RQVXRpbHMucGFyc2VJY2VPcHRpb25zID0gZnVuY3Rpb24obGluZSkge1xyXG4gIHJldHVybiBsaW5lLnN1YnN0cigxNCkuc3BsaXQoJyAnKTtcclxufVxyXG5cclxuLy8gUGFyc2VzIGFuIHJ0cG1hcCBsaW5lLCByZXR1cm5zIFJUQ1J0cENvZGRlY1BhcmFtZXRlcnMuIFNhbXBsZSBpbnB1dDpcclxuLy8gYT1ydHBtYXA6MTExIG9wdXMvNDgwMDAvMlxyXG5TRFBVdGlscy5wYXJzZVJ0cE1hcCA9IGZ1bmN0aW9uKGxpbmUpIHtcclxuICB2YXIgcGFydHMgPSBsaW5lLnN1YnN0cig5KS5zcGxpdCgnICcpO1xyXG4gIHZhciBwYXJzZWQgPSB7XHJcbiAgICBwYXlsb2FkVHlwZTogcGFyc2VJbnQocGFydHMuc2hpZnQoKSwgMTApIC8vIHdhczogaWRcclxuICB9O1xyXG5cclxuICBwYXJ0cyA9IHBhcnRzWzBdLnNwbGl0KCcvJyk7XHJcblxyXG4gIHBhcnNlZC5uYW1lID0gcGFydHNbMF07XHJcbiAgcGFyc2VkLmNsb2NrUmF0ZSA9IHBhcnNlSW50KHBhcnRzWzFdLCAxMCk7IC8vIHdhczogY2xvY2tyYXRlXHJcbiAgLy8gd2FzOiBjaGFubmVsc1xyXG4gIHBhcnNlZC5udW1DaGFubmVscyA9IHBhcnRzLmxlbmd0aCA9PT0gMyA/IHBhcnNlSW50KHBhcnRzWzJdLCAxMCkgOiAxO1xyXG4gIHJldHVybiBwYXJzZWQ7XHJcbn07XHJcblxyXG4vLyBHZW5lcmF0ZSBhbiBhPXJ0cG1hcCBsaW5lIGZyb20gUlRDUnRwQ29kZWNDYXBhYmlsaXR5IG9yXHJcbi8vIFJUQ1J0cENvZGVjUGFyYW1ldGVycy5cclxuU0RQVXRpbHMud3JpdGVSdHBNYXAgPSBmdW5jdGlvbihjb2RlYykge1xyXG4gIHZhciBwdCA9IGNvZGVjLnBheWxvYWRUeXBlO1xyXG4gIGlmIChjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBwdCA9IGNvZGVjLnByZWZlcnJlZFBheWxvYWRUeXBlO1xyXG4gIH1cclxuICByZXR1cm4gJ2E9cnRwbWFwOicgKyBwdCArICcgJyArIGNvZGVjLm5hbWUgKyAnLycgKyBjb2RlYy5jbG9ja1JhdGUgK1xyXG4gICAgICAoY29kZWMubnVtQ2hhbm5lbHMgIT09IDEgPyAnLycgKyBjb2RlYy5udW1DaGFubmVscyA6ICcnKSArICdcXHJcXG4nO1xyXG59O1xyXG5cclxuLy8gUGFyc2VzIGFuIGE9ZXh0bWFwIGxpbmUgKGhlYWRlcmV4dGVuc2lvbiBmcm9tIFJGQyA1Mjg1KS4gU2FtcGxlIGlucHV0OlxyXG4vLyBhPWV4dG1hcDoyIHVybjppZXRmOnBhcmFtczpydHAtaGRyZXh0OnRvZmZzZXRcclxuLy8gYT1leHRtYXA6Mi9zZW5kb25seSB1cm46aWV0ZjpwYXJhbXM6cnRwLWhkcmV4dDp0b2Zmc2V0XHJcblNEUFV0aWxzLnBhcnNlRXh0bWFwID0gZnVuY3Rpb24obGluZSkge1xyXG4gIHZhciBwYXJ0cyA9IGxpbmUuc3Vic3RyKDkpLnNwbGl0KCcgJyk7XHJcbiAgcmV0dXJuIHtcclxuICAgIGlkOiBwYXJzZUludChwYXJ0c1swXSwgMTApLFxyXG4gICAgZGlyZWN0aW9uOiBwYXJ0c1swXS5pbmRleE9mKCcvJykgPiAwID8gcGFydHNbMF0uc3BsaXQoJy8nKVsxXSA6ICdzZW5kcmVjdicsXHJcbiAgICB1cmk6IHBhcnRzWzFdXHJcbiAgfTtcclxufTtcclxuXHJcbi8vIEdlbmVyYXRlcyBhPWV4dG1hcCBsaW5lIGZyb20gUlRDUnRwSGVhZGVyRXh0ZW5zaW9uUGFyYW1ldGVycyBvclxyXG4vLyBSVENSdHBIZWFkZXJFeHRlbnNpb24uXHJcblNEUFV0aWxzLndyaXRlRXh0bWFwID0gZnVuY3Rpb24oaGVhZGVyRXh0ZW5zaW9uKSB7XHJcbiAgcmV0dXJuICdhPWV4dG1hcDonICsgKGhlYWRlckV4dGVuc2lvbi5pZCB8fCBoZWFkZXJFeHRlbnNpb24ucHJlZmVycmVkSWQpICtcclxuICAgICAgKGhlYWRlckV4dGVuc2lvbi5kaXJlY3Rpb24gJiYgaGVhZGVyRXh0ZW5zaW9uLmRpcmVjdGlvbiAhPT0gJ3NlbmRyZWN2J1xyXG4gICAgICAgICAgPyAnLycgKyBoZWFkZXJFeHRlbnNpb24uZGlyZWN0aW9uXHJcbiAgICAgICAgICA6ICcnKSArXHJcbiAgICAgICcgJyArIGhlYWRlckV4dGVuc2lvbi51cmkgKyAnXFxyXFxuJztcclxufTtcclxuXHJcbi8vIFBhcnNlcyBhbiBmdG1wIGxpbmUsIHJldHVybnMgZGljdGlvbmFyeS4gU2FtcGxlIGlucHV0OlxyXG4vLyBhPWZtdHA6OTYgdmJyPW9uO2NuZz1vblxyXG4vLyBBbHNvIGRlYWxzIHdpdGggdmJyPW9uOyBjbmc9b25cclxuU0RQVXRpbHMucGFyc2VGbXRwID0gZnVuY3Rpb24obGluZSkge1xyXG4gIHZhciBwYXJzZWQgPSB7fTtcclxuICB2YXIga3Y7XHJcbiAgdmFyIHBhcnRzID0gbGluZS5zdWJzdHIobGluZS5pbmRleE9mKCcgJykgKyAxKS5zcGxpdCgnOycpO1xyXG4gIGZvciAodmFyIGogPSAwOyBqIDwgcGFydHMubGVuZ3RoOyBqKyspIHtcclxuICAgIGt2ID0gcGFydHNbal0udHJpbSgpLnNwbGl0KCc9Jyk7XHJcbiAgICBwYXJzZWRba3ZbMF0udHJpbSgpXSA9IGt2WzFdO1xyXG4gIH1cclxuICByZXR1cm4gcGFyc2VkO1xyXG59O1xyXG5cclxuLy8gR2VuZXJhdGVzIGFuIGE9ZnRtcCBsaW5lIGZyb20gUlRDUnRwQ29kZWNDYXBhYmlsaXR5IG9yIFJUQ1J0cENvZGVjUGFyYW1ldGVycy5cclxuU0RQVXRpbHMud3JpdGVGbXRwID0gZnVuY3Rpb24oY29kZWMpIHtcclxuICB2YXIgbGluZSA9ICcnO1xyXG4gIHZhciBwdCA9IGNvZGVjLnBheWxvYWRUeXBlO1xyXG4gIGlmIChjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBwdCA9IGNvZGVjLnByZWZlcnJlZFBheWxvYWRUeXBlO1xyXG4gIH1cclxuICBpZiAoY29kZWMucGFyYW1ldGVycyAmJiBPYmplY3Qua2V5cyhjb2RlYy5wYXJhbWV0ZXJzKS5sZW5ndGgpIHtcclxuICAgIHZhciBwYXJhbXMgPSBbXTtcclxuICAgIE9iamVjdC5rZXlzKGNvZGVjLnBhcmFtZXRlcnMpLmZvckVhY2goZnVuY3Rpb24ocGFyYW0pIHtcclxuICAgICAgcGFyYW1zLnB1c2gocGFyYW0gKyAnPScgKyBjb2RlYy5wYXJhbWV0ZXJzW3BhcmFtXSk7XHJcbiAgICB9KTtcclxuICAgIGxpbmUgKz0gJ2E9Zm10cDonICsgcHQgKyAnICcgKyBwYXJhbXMuam9pbignOycpICsgJ1xcclxcbic7XHJcbiAgfVxyXG4gIHJldHVybiBsaW5lO1xyXG59O1xyXG5cclxuLy8gUGFyc2VzIGFuIHJ0Y3AtZmIgbGluZSwgcmV0dXJucyBSVENQUnRjcEZlZWRiYWNrIG9iamVjdC4gU2FtcGxlIGlucHV0OlxyXG4vLyBhPXJ0Y3AtZmI6OTggbmFjayBycHNpXHJcblNEUFV0aWxzLnBhcnNlUnRjcEZiID0gZnVuY3Rpb24obGluZSkge1xyXG4gIHZhciBwYXJ0cyA9IGxpbmUuc3Vic3RyKGxpbmUuaW5kZXhPZignICcpICsgMSkuc3BsaXQoJyAnKTtcclxuICByZXR1cm4ge1xyXG4gICAgdHlwZTogcGFydHMuc2hpZnQoKSxcclxuICAgIHBhcmFtZXRlcjogcGFydHMuam9pbignICcpXHJcbiAgfTtcclxufTtcclxuLy8gR2VuZXJhdGUgYT1ydGNwLWZiIGxpbmVzIGZyb20gUlRDUnRwQ29kZWNDYXBhYmlsaXR5IG9yIFJUQ1J0cENvZGVjUGFyYW1ldGVycy5cclxuU0RQVXRpbHMud3JpdGVSdGNwRmIgPSBmdW5jdGlvbihjb2RlYykge1xyXG4gIHZhciBsaW5lcyA9ICcnO1xyXG4gIHZhciBwdCA9IGNvZGVjLnBheWxvYWRUeXBlO1xyXG4gIGlmIChjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBwdCA9IGNvZGVjLnByZWZlcnJlZFBheWxvYWRUeXBlO1xyXG4gIH1cclxuICBpZiAoY29kZWMucnRjcEZlZWRiYWNrICYmIGNvZGVjLnJ0Y3BGZWVkYmFjay5sZW5ndGgpIHtcclxuICAgIC8vIEZJWE1FOiBzcGVjaWFsIGhhbmRsaW5nIGZvciB0cnItaW50P1xyXG4gICAgY29kZWMucnRjcEZlZWRiYWNrLmZvckVhY2goZnVuY3Rpb24oZmIpIHtcclxuICAgICAgbGluZXMgKz0gJ2E9cnRjcC1mYjonICsgcHQgKyAnICcgKyBmYi50eXBlICtcclxuICAgICAgKGZiLnBhcmFtZXRlciAmJiBmYi5wYXJhbWV0ZXIubGVuZ3RoID8gJyAnICsgZmIucGFyYW1ldGVyIDogJycpICtcclxuICAgICAgICAgICdcXHJcXG4nO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHJldHVybiBsaW5lcztcclxufTtcclxuXHJcbi8vIFBhcnNlcyBhbiBSRkMgNTU3NiBzc3JjIG1lZGlhIGF0dHJpYnV0ZS4gU2FtcGxlIGlucHV0OlxyXG4vLyBhPXNzcmM6MzczNTkyODU1OSBjbmFtZTpzb21ldGhpbmdcclxuU0RQVXRpbHMucGFyc2VTc3JjTWVkaWEgPSBmdW5jdGlvbihsaW5lKSB7XHJcbiAgdmFyIHNwID0gbGluZS5pbmRleE9mKCcgJyk7XHJcbiAgdmFyIHBhcnRzID0ge1xyXG4gICAgc3NyYzogcGFyc2VJbnQobGluZS5zdWJzdHIoNywgc3AgLSA3KSwgMTApXHJcbiAgfTtcclxuICB2YXIgY29sb24gPSBsaW5lLmluZGV4T2YoJzonLCBzcCk7XHJcbiAgaWYgKGNvbG9uID4gLTEpIHtcclxuICAgIHBhcnRzLmF0dHJpYnV0ZSA9IGxpbmUuc3Vic3RyKHNwICsgMSwgY29sb24gLSBzcCAtIDEpO1xyXG4gICAgcGFydHMudmFsdWUgPSBsaW5lLnN1YnN0cihjb2xvbiArIDEpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBwYXJ0cy5hdHRyaWJ1dGUgPSBsaW5lLnN1YnN0cihzcCArIDEpO1xyXG4gIH1cclxuICByZXR1cm4gcGFydHM7XHJcbn07XHJcblxyXG4vLyBFeHRyYWN0cyB0aGUgTUlEIChSRkMgNTg4OCkgZnJvbSBhIG1lZGlhIHNlY3Rpb24uXHJcbi8vIHJldHVybnMgdGhlIE1JRCBvciB1bmRlZmluZWQgaWYgbm8gbWlkIGxpbmUgd2FzIGZvdW5kLlxyXG5TRFBVdGlscy5nZXRNaWQgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcclxuICB2YXIgbWlkID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1taWQ6JylbMF07XHJcbiAgaWYgKG1pZCkge1xyXG4gICAgcmV0dXJuIG1pZC5zdWJzdHIoNik7XHJcbiAgfVxyXG59XHJcblxyXG5TRFBVdGlscy5wYXJzZUZpbmdlcnByaW50ID0gZnVuY3Rpb24obGluZSkge1xyXG4gIHZhciBwYXJ0cyA9IGxpbmUuc3Vic3RyKDE0KS5zcGxpdCgnICcpO1xyXG4gIHJldHVybiB7XHJcbiAgICBhbGdvcml0aG06IHBhcnRzWzBdLnRvTG93ZXJDYXNlKCksIC8vIGFsZ29yaXRobSBpcyBjYXNlLXNlbnNpdGl2ZSBpbiBFZGdlLlxyXG4gICAgdmFsdWU6IHBhcnRzWzFdXHJcbiAgfTtcclxufTtcclxuXHJcbi8vIEV4dHJhY3RzIERUTFMgcGFyYW1ldGVycyBmcm9tIFNEUCBtZWRpYSBzZWN0aW9uIG9yIHNlc3Npb25wYXJ0LlxyXG4vLyBGSVhNRTogZm9yIGNvbnNpc3RlbmN5IHdpdGggb3RoZXIgZnVuY3Rpb25zIHRoaXMgc2hvdWxkIG9ubHlcclxuLy8gICBnZXQgdGhlIGZpbmdlcnByaW50IGxpbmUgYXMgaW5wdXQuIFNlZSBhbHNvIGdldEljZVBhcmFtZXRlcnMuXHJcblNEUFV0aWxzLmdldER0bHNQYXJhbWV0ZXJzID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uLCBzZXNzaW9ucGFydCkge1xyXG4gIHZhciBsaW5lcyA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiArIHNlc3Npb25wYXJ0LFxyXG4gICAgICAnYT1maW5nZXJwcmludDonKTtcclxuICAvLyBOb3RlOiBhPXNldHVwIGxpbmUgaXMgaWdub3JlZCBzaW5jZSB3ZSB1c2UgdGhlICdhdXRvJyByb2xlLlxyXG4gIC8vIE5vdGUyOiAnYWxnb3JpdGhtJyBpcyBub3QgY2FzZSBzZW5zaXRpdmUgZXhjZXB0IGluIEVkZ2UuXHJcbiAgcmV0dXJuIHtcclxuICAgIHJvbGU6ICdhdXRvJyxcclxuICAgIGZpbmdlcnByaW50czogbGluZXMubWFwKFNEUFV0aWxzLnBhcnNlRmluZ2VycHJpbnQpXHJcbiAgfTtcclxufTtcclxuXHJcbi8vIFNlcmlhbGl6ZXMgRFRMUyBwYXJhbWV0ZXJzIHRvIFNEUC5cclxuU0RQVXRpbHMud3JpdGVEdGxzUGFyYW1ldGVycyA9IGZ1bmN0aW9uKHBhcmFtcywgc2V0dXBUeXBlKSB7XHJcbiAgdmFyIHNkcCA9ICdhPXNldHVwOicgKyBzZXR1cFR5cGUgKyAnXFxyXFxuJztcclxuICBwYXJhbXMuZmluZ2VycHJpbnRzLmZvckVhY2goZnVuY3Rpb24oZnApIHtcclxuICAgIHNkcCArPSAnYT1maW5nZXJwcmludDonICsgZnAuYWxnb3JpdGhtICsgJyAnICsgZnAudmFsdWUgKyAnXFxyXFxuJztcclxuICB9KTtcclxuICByZXR1cm4gc2RwO1xyXG59O1xyXG4vLyBQYXJzZXMgSUNFIGluZm9ybWF0aW9uIGZyb20gU0RQIG1lZGlhIHNlY3Rpb24gb3Igc2Vzc2lvbnBhcnQuXHJcbi8vIEZJWE1FOiBmb3IgY29uc2lzdGVuY3kgd2l0aCBvdGhlciBmdW5jdGlvbnMgdGhpcyBzaG91bGQgb25seVxyXG4vLyAgIGdldCB0aGUgaWNlLXVmcmFnIGFuZCBpY2UtcHdkIGxpbmVzIGFzIGlucHV0LlxyXG5TRFBVdGlscy5nZXRJY2VQYXJhbWV0ZXJzID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uLCBzZXNzaW9ucGFydCkge1xyXG4gIHZhciBsaW5lcyA9IFNEUFV0aWxzLnNwbGl0TGluZXMobWVkaWFTZWN0aW9uKTtcclxuICAvLyBTZWFyY2ggaW4gc2Vzc2lvbiBwYXJ0LCB0b28uXHJcbiAgbGluZXMgPSBsaW5lcy5jb25jYXQoU0RQVXRpbHMuc3BsaXRMaW5lcyhzZXNzaW9ucGFydCkpO1xyXG4gIHZhciBpY2VQYXJhbWV0ZXJzID0ge1xyXG4gICAgdXNlcm5hbWVGcmFnbWVudDogbGluZXMuZmlsdGVyKGZ1bmN0aW9uKGxpbmUpIHtcclxuICAgICAgcmV0dXJuIGxpbmUuaW5kZXhPZignYT1pY2UtdWZyYWc6JykgPT09IDA7XHJcbiAgICB9KVswXS5zdWJzdHIoMTIpLFxyXG4gICAgcGFzc3dvcmQ6IGxpbmVzLmZpbHRlcihmdW5jdGlvbihsaW5lKSB7XHJcbiAgICAgIHJldHVybiBsaW5lLmluZGV4T2YoJ2E9aWNlLXB3ZDonKSA9PT0gMDtcclxuICAgIH0pWzBdLnN1YnN0cigxMClcclxuICB9O1xyXG4gIHJldHVybiBpY2VQYXJhbWV0ZXJzO1xyXG59O1xyXG5cclxuLy8gU2VyaWFsaXplcyBJQ0UgcGFyYW1ldGVycyB0byBTRFAuXHJcblNEUFV0aWxzLndyaXRlSWNlUGFyYW1ldGVycyA9IGZ1bmN0aW9uKHBhcmFtcykge1xyXG4gIHJldHVybiAnYT1pY2UtdWZyYWc6JyArIHBhcmFtcy51c2VybmFtZUZyYWdtZW50ICsgJ1xcclxcbicgK1xyXG4gICAgICAnYT1pY2UtcHdkOicgKyBwYXJhbXMucGFzc3dvcmQgKyAnXFxyXFxuJztcclxufTtcclxuXHJcbi8vIFBhcnNlcyB0aGUgU0RQIG1lZGlhIHNlY3Rpb24gYW5kIHJldHVybnMgUlRDUnRwUGFyYW1ldGVycy5cclxuU0RQVXRpbHMucGFyc2VSdHBQYXJhbWV0ZXJzID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XHJcbiAgdmFyIGRlc2NyaXB0aW9uID0ge1xyXG4gICAgY29kZWNzOiBbXSxcclxuICAgIGhlYWRlckV4dGVuc2lvbnM6IFtdLFxyXG4gICAgZmVjTWVjaGFuaXNtczogW10sXHJcbiAgICBydGNwOiBbXVxyXG4gIH07XHJcbiAgdmFyIGxpbmVzID0gU0RQVXRpbHMuc3BsaXRMaW5lcyhtZWRpYVNlY3Rpb24pO1xyXG4gIHZhciBtbGluZSA9IGxpbmVzWzBdLnNwbGl0KCcgJyk7XHJcbiAgZm9yICh2YXIgaSA9IDM7IGkgPCBtbGluZS5sZW5ndGg7IGkrKykgeyAvLyBmaW5kIGFsbCBjb2RlY3MgZnJvbSBtbGluZVszLi5dXHJcbiAgICB2YXIgcHQgPSBtbGluZVtpXTtcclxuICAgIHZhciBydHBtYXBsaW5lID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgoXHJcbiAgICAgICAgbWVkaWFTZWN0aW9uLCAnYT1ydHBtYXA6JyArIHB0ICsgJyAnKVswXTtcclxuICAgIGlmIChydHBtYXBsaW5lKSB7XHJcbiAgICAgIHZhciBjb2RlYyA9IFNEUFV0aWxzLnBhcnNlUnRwTWFwKHJ0cG1hcGxpbmUpO1xyXG4gICAgICB2YXIgZm10cHMgPSBTRFBVdGlscy5tYXRjaFByZWZpeChcclxuICAgICAgICAgIG1lZGlhU2VjdGlvbiwgJ2E9Zm10cDonICsgcHQgKyAnICcpO1xyXG4gICAgICAvLyBPbmx5IHRoZSBmaXJzdCBhPWZtdHA6PHB0PiBpcyBjb25zaWRlcmVkLlxyXG4gICAgICBjb2RlYy5wYXJhbWV0ZXJzID0gZm10cHMubGVuZ3RoID8gU0RQVXRpbHMucGFyc2VGbXRwKGZtdHBzWzBdKSA6IHt9O1xyXG4gICAgICBjb2RlYy5ydGNwRmVlZGJhY2sgPSBTRFBVdGlscy5tYXRjaFByZWZpeChcclxuICAgICAgICAgIG1lZGlhU2VjdGlvbiwgJ2E9cnRjcC1mYjonICsgcHQgKyAnICcpXHJcbiAgICAgICAgLm1hcChTRFBVdGlscy5wYXJzZVJ0Y3BGYik7XHJcbiAgICAgIGRlc2NyaXB0aW9uLmNvZGVjcy5wdXNoKGNvZGVjKTtcclxuICAgICAgLy8gcGFyc2UgRkVDIG1lY2hhbmlzbXMgZnJvbSBydHBtYXAgbGluZXMuXHJcbiAgICAgIHN3aXRjaCAoY29kZWMubmFtZS50b1VwcGVyQ2FzZSgpKSB7XHJcbiAgICAgICAgY2FzZSAnUkVEJzpcclxuICAgICAgICBjYXNlICdVTFBGRUMnOlxyXG4gICAgICAgICAgZGVzY3JpcHRpb24uZmVjTWVjaGFuaXNtcy5wdXNoKGNvZGVjLm5hbWUudG9VcHBlckNhc2UoKSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OiAvLyBvbmx5IFJFRCBhbmQgVUxQRkVDIGFyZSByZWNvZ25pemVkIGFzIEZFQyBtZWNoYW5pc21zLlxyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1leHRtYXA6JykuZm9yRWFjaChmdW5jdGlvbihsaW5lKSB7XHJcbiAgICBkZXNjcmlwdGlvbi5oZWFkZXJFeHRlbnNpb25zLnB1c2goU0RQVXRpbHMucGFyc2VFeHRtYXAobGluZSkpO1xyXG4gIH0pO1xyXG4gIC8vIEZJWE1FOiBwYXJzZSBydGNwLlxyXG4gIHJldHVybiBkZXNjcmlwdGlvbjtcclxufTtcclxuXHJcbi8vIEdlbmVyYXRlcyBwYXJ0cyBvZiB0aGUgU0RQIG1lZGlhIHNlY3Rpb24gZGVzY3JpYmluZyB0aGUgY2FwYWJpbGl0aWVzIC9cclxuLy8gcGFyYW1ldGVycy5cclxuU0RQVXRpbHMud3JpdGVSdHBEZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKGtpbmQsIGNhcHMpIHtcclxuICB2YXIgc2RwID0gJyc7XHJcblxyXG4gIC8vIEJ1aWxkIHRoZSBtbGluZS5cclxuICBzZHAgKz0gJ209JyArIGtpbmQgKyAnICc7XHJcbiAgc2RwICs9IGNhcHMuY29kZWNzLmxlbmd0aCA+IDAgPyAnOScgOiAnMCc7IC8vIHJlamVjdCBpZiBubyBjb2RlY3MuXHJcbiAgc2RwICs9ICcgVURQL1RMUy9SVFAvU0FWUEYgJztcclxuICBzZHAgKz0gY2Fwcy5jb2RlY3MubWFwKGZ1bmN0aW9uKGNvZGVjKSB7XHJcbiAgICBpZiAoY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICByZXR1cm4gY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY29kZWMucGF5bG9hZFR5cGU7XHJcbiAgfSkuam9pbignICcpICsgJ1xcclxcbic7XHJcblxyXG4gIHNkcCArPSAnYz1JTiBJUDQgMC4wLjAuMFxcclxcbic7XHJcbiAgc2RwICs9ICdhPXJ0Y3A6OSBJTiBJUDQgMC4wLjAuMFxcclxcbic7XHJcblxyXG4gIC8vIEFkZCBhPXJ0cG1hcCBsaW5lcyBmb3IgZWFjaCBjb2RlYy4gQWxzbyBmbXRwIGFuZCBydGNwLWZiLlxyXG4gIGNhcHMuY29kZWNzLmZvckVhY2goZnVuY3Rpb24oY29kZWMpIHtcclxuICAgIHNkcCArPSBTRFBVdGlscy53cml0ZVJ0cE1hcChjb2RlYyk7XHJcbiAgICBzZHAgKz0gU0RQVXRpbHMud3JpdGVGbXRwKGNvZGVjKTtcclxuICAgIHNkcCArPSBTRFBVdGlscy53cml0ZVJ0Y3BGYihjb2RlYyk7XHJcbiAgfSk7XHJcbiAgdmFyIG1heHB0aW1lID0gMDtcclxuICBjYXBzLmNvZGVjcy5mb3JFYWNoKGZ1bmN0aW9uKGNvZGVjKSB7XHJcbiAgICBpZiAoY29kZWMubWF4cHRpbWUgPiBtYXhwdGltZSkge1xyXG4gICAgICBtYXhwdGltZSA9IGNvZGVjLm1heHB0aW1lO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIGlmIChtYXhwdGltZSA+IDApIHtcclxuICAgIHNkcCArPSAnYT1tYXhwdGltZTonICsgbWF4cHRpbWUgKyAnXFxyXFxuJztcclxuICB9XHJcbiAgc2RwICs9ICdhPXJ0Y3AtbXV4XFxyXFxuJztcclxuXHJcbiAgY2Fwcy5oZWFkZXJFeHRlbnNpb25zLmZvckVhY2goZnVuY3Rpb24oZXh0ZW5zaW9uKSB7XHJcbiAgICBzZHAgKz0gU0RQVXRpbHMud3JpdGVFeHRtYXAoZXh0ZW5zaW9uKTtcclxuICB9KTtcclxuICAvLyBGSVhNRTogd3JpdGUgZmVjTWVjaGFuaXNtcy5cclxuICByZXR1cm4gc2RwO1xyXG59O1xyXG5cclxuLy8gUGFyc2VzIHRoZSBTRFAgbWVkaWEgc2VjdGlvbiBhbmQgcmV0dXJucyBhbiBhcnJheSBvZlxyXG4vLyBSVENSdHBFbmNvZGluZ1BhcmFtZXRlcnMuXHJcblNEUFV0aWxzLnBhcnNlUnRwRW5jb2RpbmdQYXJhbWV0ZXJzID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XHJcbiAgdmFyIGVuY29kaW5nUGFyYW1ldGVycyA9IFtdO1xyXG4gIHZhciBkZXNjcmlwdGlvbiA9IFNEUFV0aWxzLnBhcnNlUnRwUGFyYW1ldGVycyhtZWRpYVNlY3Rpb24pO1xyXG4gIHZhciBoYXNSZWQgPSBkZXNjcmlwdGlvbi5mZWNNZWNoYW5pc21zLmluZGV4T2YoJ1JFRCcpICE9PSAtMTtcclxuICB2YXIgaGFzVWxwZmVjID0gZGVzY3JpcHRpb24uZmVjTWVjaGFuaXNtcy5pbmRleE9mKCdVTFBGRUMnKSAhPT0gLTE7XHJcblxyXG4gIC8vIGZpbHRlciBhPXNzcmM6Li4uIGNuYW1lOiwgaWdub3JlIFBsYW5CLW1zaWRcclxuICB2YXIgc3NyY3MgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPXNzcmM6JylcclxuICAubWFwKGZ1bmN0aW9uKGxpbmUpIHtcclxuICAgIHJldHVybiBTRFBVdGlscy5wYXJzZVNzcmNNZWRpYShsaW5lKTtcclxuICB9KVxyXG4gIC5maWx0ZXIoZnVuY3Rpb24ocGFydHMpIHtcclxuICAgIHJldHVybiBwYXJ0cy5hdHRyaWJ1dGUgPT09ICdjbmFtZSc7XHJcbiAgfSk7XHJcbiAgdmFyIHByaW1hcnlTc3JjID0gc3NyY3MubGVuZ3RoID4gMCAmJiBzc3Jjc1swXS5zc3JjO1xyXG4gIHZhciBzZWNvbmRhcnlTc3JjO1xyXG5cclxuICB2YXIgZmxvd3MgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPXNzcmMtZ3JvdXA6RklEJylcclxuICAubWFwKGZ1bmN0aW9uKGxpbmUpIHtcclxuICAgIHZhciBwYXJ0cyA9IGxpbmUuc3BsaXQoJyAnKTtcclxuICAgIHBhcnRzLnNoaWZ0KCk7XHJcbiAgICByZXR1cm4gcGFydHMubWFwKGZ1bmN0aW9uKHBhcnQpIHtcclxuICAgICAgcmV0dXJuIHBhcnNlSW50KHBhcnQsIDEwKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG4gIGlmIChmbG93cy5sZW5ndGggPiAwICYmIGZsb3dzWzBdLmxlbmd0aCA+IDEgJiYgZmxvd3NbMF1bMF0gPT09IHByaW1hcnlTc3JjKSB7XHJcbiAgICBzZWNvbmRhcnlTc3JjID0gZmxvd3NbMF1bMV07XHJcbiAgfVxyXG5cclxuICBkZXNjcmlwdGlvbi5jb2RlY3MuZm9yRWFjaChmdW5jdGlvbihjb2RlYykge1xyXG4gICAgaWYgKGNvZGVjLm5hbWUudG9VcHBlckNhc2UoKSA9PT0gJ1JUWCcgJiYgY29kZWMucGFyYW1ldGVycy5hcHQpIHtcclxuICAgICAgdmFyIGVuY1BhcmFtID0ge1xyXG4gICAgICAgIHNzcmM6IHByaW1hcnlTc3JjLFxyXG4gICAgICAgIGNvZGVjUGF5bG9hZFR5cGU6IHBhcnNlSW50KGNvZGVjLnBhcmFtZXRlcnMuYXB0LCAxMCksXHJcbiAgICAgICAgcnR4OiB7XHJcbiAgICAgICAgICBzc3JjOiBzZWNvbmRhcnlTc3JjXHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgICBlbmNvZGluZ1BhcmFtZXRlcnMucHVzaChlbmNQYXJhbSk7XHJcbiAgICAgIGlmIChoYXNSZWQpIHtcclxuICAgICAgICBlbmNQYXJhbSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZW5jUGFyYW0pKTtcclxuICAgICAgICBlbmNQYXJhbS5mZWMgPSB7XHJcbiAgICAgICAgICBzc3JjOiBzZWNvbmRhcnlTc3JjLFxyXG4gICAgICAgICAgbWVjaGFuaXNtOiBoYXNVbHBmZWMgPyAncmVkK3VscGZlYycgOiAncmVkJ1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgZW5jb2RpbmdQYXJhbWV0ZXJzLnB1c2goZW5jUGFyYW0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgaWYgKGVuY29kaW5nUGFyYW1ldGVycy5sZW5ndGggPT09IDAgJiYgcHJpbWFyeVNzcmMpIHtcclxuICAgIGVuY29kaW5nUGFyYW1ldGVycy5wdXNoKHtcclxuICAgICAgc3NyYzogcHJpbWFyeVNzcmNcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gd2Ugc3VwcG9ydCBib3RoIGI9QVMgYW5kIGI9VElBUyBidXQgaW50ZXJwcmV0IEFTIGFzIFRJQVMuXHJcbiAgdmFyIGJhbmR3aWR0aCA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2I9Jyk7XHJcbiAgaWYgKGJhbmR3aWR0aC5sZW5ndGgpIHtcclxuICAgIGlmIChiYW5kd2lkdGhbMF0uaW5kZXhPZignYj1USUFTOicpID09PSAwKSB7XHJcbiAgICAgIGJhbmR3aWR0aCA9IHBhcnNlSW50KGJhbmR3aWR0aFswXS5zdWJzdHIoNyksIDEwKTtcclxuICAgIH0gZWxzZSBpZiAoYmFuZHdpZHRoWzBdLmluZGV4T2YoJ2I9QVM6JykgPT09IDApIHtcclxuICAgICAgLy8gdXNlIGZvcm11bGEgZnJvbSBKU0VQIHRvIGNvbnZlcnQgYj1BUyB0byBUSUFTIHZhbHVlLlxyXG4gICAgICBiYW5kd2lkdGggPSBwYXJzZUludChiYW5kd2lkdGhbMF0uc3Vic3RyKDUpLCAxMCkgKiAxMDAwICogMC45NVxyXG4gICAgICAgICAgLSAoNTAgKiA0MCAqIDgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYmFuZHdpZHRoID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgZW5jb2RpbmdQYXJhbWV0ZXJzLmZvckVhY2goZnVuY3Rpb24ocGFyYW1zKSB7XHJcbiAgICAgIHBhcmFtcy5tYXhCaXRyYXRlID0gYmFuZHdpZHRoO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHJldHVybiBlbmNvZGluZ1BhcmFtZXRlcnM7XHJcbn07XHJcblxyXG4vLyBwYXJzZXMgaHR0cDovL2RyYWZ0Lm9ydGMub3JnLyNydGNydGNwcGFyYW1ldGVycypcclxuU0RQVXRpbHMucGFyc2VSdGNwUGFyYW1ldGVycyA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbikge1xyXG4gIHZhciBydGNwUGFyYW1ldGVycyA9IHt9O1xyXG5cclxuICB2YXIgY25hbWU7XHJcbiAgLy8gR2V0cyB0aGUgZmlyc3QgU1NSQy4gTm90ZSB0aGF0IHdpdGggUlRYIHRoZXJlIG1pZ2h0IGJlIG11bHRpcGxlXHJcbiAgLy8gU1NSQ3MuXHJcbiAgdmFyIHJlbW90ZVNzcmMgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPXNzcmM6JylcclxuICAgICAgLm1hcChmdW5jdGlvbihsaW5lKSB7XHJcbiAgICAgICAgcmV0dXJuIFNEUFV0aWxzLnBhcnNlU3NyY01lZGlhKGxpbmUpO1xyXG4gICAgICB9KVxyXG4gICAgICAuZmlsdGVyKGZ1bmN0aW9uKG9iaikge1xyXG4gICAgICAgIHJldHVybiBvYmouYXR0cmlidXRlID09PSAnY25hbWUnO1xyXG4gICAgICB9KVswXTtcclxuICBpZiAocmVtb3RlU3NyYykge1xyXG4gICAgcnRjcFBhcmFtZXRlcnMuY25hbWUgPSByZW1vdGVTc3JjLnZhbHVlO1xyXG4gICAgcnRjcFBhcmFtZXRlcnMuc3NyYyA9IHJlbW90ZVNzcmMuc3NyYztcclxuICB9XHJcblxyXG4gIC8vIEVkZ2UgdXNlcyB0aGUgY29tcG91bmQgYXR0cmlidXRlIGluc3RlYWQgb2YgcmVkdWNlZFNpemVcclxuICAvLyBjb21wb3VuZCBpcyAhcmVkdWNlZFNpemVcclxuICB2YXIgcnNpemUgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPXJ0Y3AtcnNpemUnKTtcclxuICBydGNwUGFyYW1ldGVycy5yZWR1Y2VkU2l6ZSA9IHJzaXplLmxlbmd0aCA+IDA7XHJcbiAgcnRjcFBhcmFtZXRlcnMuY29tcG91bmQgPSByc2l6ZS5sZW5ndGggPT09IDA7XHJcblxyXG4gIC8vIHBhcnNlcyB0aGUgcnRjcC1tdXggYXR0ctGWYnV0ZS5cclxuICAvLyBOb3RlIHRoYXQgRWRnZSBkb2VzIG5vdCBzdXBwb3J0IHVubXV4ZWQgUlRDUC5cclxuICB2YXIgbXV4ID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1ydGNwLW11eCcpO1xyXG4gIHJ0Y3BQYXJhbWV0ZXJzLm11eCA9IG11eC5sZW5ndGggPiAwO1xyXG5cclxuICByZXR1cm4gcnRjcFBhcmFtZXRlcnM7XHJcbn07XHJcblxyXG4vLyBwYXJzZXMgZWl0aGVyIGE9bXNpZDogb3IgYT1zc3JjOi4uLiBtc2lkIGxpbmVzIGFuZCByZXR1cm5zXHJcbi8vIHRoZSBpZCBvZiB0aGUgTWVkaWFTdHJlYW0gYW5kIE1lZGlhU3RyZWFtVHJhY2suXHJcblNEUFV0aWxzLnBhcnNlTXNpZCA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbikge1xyXG4gIHZhciBwYXJ0cztcclxuICB2YXIgc3BlYyA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9bXNpZDonKTtcclxuICBpZiAoc3BlYy5sZW5ndGggPT09IDEpIHtcclxuICAgIHBhcnRzID0gc3BlY1swXS5zdWJzdHIoNykuc3BsaXQoJyAnKTtcclxuICAgIHJldHVybiB7c3RyZWFtOiBwYXJ0c1swXSwgdHJhY2s6IHBhcnRzWzFdfTtcclxuICB9XHJcbiAgdmFyIHBsYW5CID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1zc3JjOicpXHJcbiAgLm1hcChmdW5jdGlvbihsaW5lKSB7XHJcbiAgICByZXR1cm4gU0RQVXRpbHMucGFyc2VTc3JjTWVkaWEobGluZSk7XHJcbiAgfSlcclxuICAuZmlsdGVyKGZ1bmN0aW9uKHBhcnRzKSB7XHJcbiAgICByZXR1cm4gcGFydHMuYXR0cmlidXRlID09PSAnbXNpZCc7XHJcbiAgfSk7XHJcbiAgaWYgKHBsYW5CLmxlbmd0aCA+IDApIHtcclxuICAgIHBhcnRzID0gcGxhbkJbMF0udmFsdWUuc3BsaXQoJyAnKTtcclxuICAgIHJldHVybiB7c3RyZWFtOiBwYXJ0c1swXSwgdHJhY2s6IHBhcnRzWzFdfTtcclxuICB9XHJcbn07XHJcblxyXG4vLyBHZW5lcmF0ZSBhIHNlc3Npb24gSUQgZm9yIFNEUC5cclxuLy8gaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL2RyYWZ0LWlldGYtcnRjd2ViLWpzZXAtMjAjc2VjdGlvbi01LjIuMVxyXG4vLyByZWNvbW1lbmRzIHVzaW5nIGEgY3J5cHRvZ3JhcGhpY2FsbHkgcmFuZG9tICt2ZSA2NC1iaXQgdmFsdWVcclxuLy8gYnV0IHJpZ2h0IG5vdyB0aGlzIHNob3VsZCBiZSBhY2NlcHRhYmxlIGFuZCB3aXRoaW4gdGhlIHJpZ2h0IHJhbmdlXHJcblNEUFV0aWxzLmdlbmVyYXRlU2Vzc2lvbklkID0gZnVuY3Rpb24oKSB7XHJcbiAgcmV0dXJuIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKS5zdWJzdHIoMiwgMjEpO1xyXG59O1xyXG5cclxuLy8gV3JpdGUgYm9pbGRlciBwbGF0ZSBmb3Igc3RhcnQgb2YgU0RQXHJcbi8vIHNlc3NJZCBhcmd1bWVudCBpcyBvcHRpb25hbCAtIGlmIG5vdCBzdXBwbGllZCBpdCB3aWxsXHJcbi8vIGJlIGdlbmVyYXRlZCByYW5kb21seVxyXG4vLyBzZXNzVmVyc2lvbiBpcyBvcHRpb25hbCBhbmQgZGVmYXVsdHMgdG8gMlxyXG5TRFBVdGlscy53cml0ZVNlc3Npb25Cb2lsZXJwbGF0ZSA9IGZ1bmN0aW9uKHNlc3NJZCwgc2Vzc1Zlcikge1xyXG4gIHZhciBzZXNzaW9uSWQ7XHJcbiAgdmFyIHZlcnNpb24gPSBzZXNzVmVyICE9PSB1bmRlZmluZWQgPyBzZXNzVmVyIDogMjtcclxuICBpZiAoc2Vzc0lkKSB7XHJcbiAgICBzZXNzaW9uSWQgPSBzZXNzSWQ7XHJcbiAgfSBlbHNlIHtcclxuICAgIHNlc3Npb25JZCA9IFNEUFV0aWxzLmdlbmVyYXRlU2Vzc2lvbklkKCk7XHJcbiAgfVxyXG4gIC8vIEZJWE1FOiBzZXNzLWlkIHNob3VsZCBiZSBhbiBOVFAgdGltZXN0YW1wLlxyXG4gIHJldHVybiAndj0wXFxyXFxuJyArXHJcbiAgICAgICdvPXRoaXNpc2FkYXB0ZXJvcnRjICcgKyBzZXNzaW9uSWQgKyAnICcgKyB2ZXJzaW9uICsgJyBJTiBJUDQgMTI3LjAuMC4xXFxyXFxuJyArXHJcbiAgICAgICdzPS1cXHJcXG4nICtcclxuICAgICAgJ3Q9MCAwXFxyXFxuJztcclxufTtcclxuXHJcblNEUFV0aWxzLndyaXRlTWVkaWFTZWN0aW9uID0gZnVuY3Rpb24odHJhbnNjZWl2ZXIsIGNhcHMsIHR5cGUsIHN0cmVhbSkge1xyXG4gIHZhciBzZHAgPSBTRFBVdGlscy53cml0ZVJ0cERlc2NyaXB0aW9uKHRyYW5zY2VpdmVyLmtpbmQsIGNhcHMpO1xyXG5cclxuICAvLyBNYXAgSUNFIHBhcmFtZXRlcnMgKHVmcmFnLCBwd2QpIHRvIFNEUC5cclxuICBzZHAgKz0gU0RQVXRpbHMud3JpdGVJY2VQYXJhbWV0ZXJzKFxyXG4gICAgICB0cmFuc2NlaXZlci5pY2VHYXRoZXJlci5nZXRMb2NhbFBhcmFtZXRlcnMoKSk7XHJcblxyXG4gIC8vIE1hcCBEVExTIHBhcmFtZXRlcnMgdG8gU0RQLlxyXG4gIHNkcCArPSBTRFBVdGlscy53cml0ZUR0bHNQYXJhbWV0ZXJzKFxyXG4gICAgICB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0LmdldExvY2FsUGFyYW1ldGVycygpLFxyXG4gICAgICB0eXBlID09PSAnb2ZmZXInID8gJ2FjdHBhc3MnIDogJ2FjdGl2ZScpO1xyXG5cclxuICBzZHAgKz0gJ2E9bWlkOicgKyB0cmFuc2NlaXZlci5taWQgKyAnXFxyXFxuJztcclxuXHJcbiAgaWYgKHRyYW5zY2VpdmVyLmRpcmVjdGlvbikge1xyXG4gICAgc2RwICs9ICdhPScgKyB0cmFuc2NlaXZlci5kaXJlY3Rpb24gKyAnXFxyXFxuJztcclxuICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlciAmJiB0cmFuc2NlaXZlci5ydHBSZWNlaXZlcikge1xyXG4gICAgc2RwICs9ICdhPXNlbmRyZWN2XFxyXFxuJztcclxuICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlcikge1xyXG4gICAgc2RwICs9ICdhPXNlbmRvbmx5XFxyXFxuJztcclxuICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyKSB7XHJcbiAgICBzZHAgKz0gJ2E9cmVjdm9ubHlcXHJcXG4nO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBzZHAgKz0gJ2E9aW5hY3RpdmVcXHJcXG4nO1xyXG4gIH1cclxuXHJcbiAgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlcikge1xyXG4gICAgLy8gc3BlYy5cclxuICAgIHZhciBtc2lkID0gJ21zaWQ6JyArIHN0cmVhbS5pZCArICcgJyArXHJcbiAgICAgICAgdHJhbnNjZWl2ZXIucnRwU2VuZGVyLnRyYWNrLmlkICsgJ1xcclxcbic7XHJcbiAgICBzZHAgKz0gJ2E9JyArIG1zaWQ7XHJcblxyXG4gICAgLy8gZm9yIENocm9tZS5cclxuICAgIHNkcCArPSAnYT1zc3JjOicgKyB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmMgK1xyXG4gICAgICAgICcgJyArIG1zaWQ7XHJcbiAgICBpZiAodHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHgpIHtcclxuICAgICAgc2RwICs9ICdhPXNzcmM6JyArIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4LnNzcmMgK1xyXG4gICAgICAgICAgJyAnICsgbXNpZDtcclxuICAgICAgc2RwICs9ICdhPXNzcmMtZ3JvdXA6RklEICcgK1xyXG4gICAgICAgICAgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjICsgJyAnICtcclxuICAgICAgICAgIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4LnNzcmMgK1xyXG4gICAgICAgICAgJ1xcclxcbic7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8vIEZJWE1FOiB0aGlzIHNob3VsZCBiZSB3cml0dGVuIGJ5IHdyaXRlUnRwRGVzY3JpcHRpb24uXHJcbiAgc2RwICs9ICdhPXNzcmM6JyArIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYyArXHJcbiAgICAgICcgY25hbWU6JyArIFNEUFV0aWxzLmxvY2FsQ05hbWUgKyAnXFxyXFxuJztcclxuICBpZiAodHJhbnNjZWl2ZXIucnRwU2VuZGVyICYmIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4KSB7XHJcbiAgICBzZHAgKz0gJ2E9c3NyYzonICsgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHguc3NyYyArXHJcbiAgICAgICAgJyBjbmFtZTonICsgU0RQVXRpbHMubG9jYWxDTmFtZSArICdcXHJcXG4nO1xyXG4gIH1cclxuICByZXR1cm4gc2RwO1xyXG59O1xyXG5cclxuLy8gR2V0cyB0aGUgZGlyZWN0aW9uIGZyb20gdGhlIG1lZGlhU2VjdGlvbiBvciB0aGUgc2Vzc2lvbnBhcnQuXHJcblNEUFV0aWxzLmdldERpcmVjdGlvbiA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbiwgc2Vzc2lvbnBhcnQpIHtcclxuICAvLyBMb29rIGZvciBzZW5kcmVjdiwgc2VuZG9ubHksIHJlY3Zvbmx5LCBpbmFjdGl2ZSwgZGVmYXVsdCB0byBzZW5kcmVjdi5cclxuICB2YXIgbGluZXMgPSBTRFBVdGlscy5zcGxpdExpbmVzKG1lZGlhU2VjdGlvbik7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgc3dpdGNoIChsaW5lc1tpXSkge1xyXG4gICAgICBjYXNlICdhPXNlbmRyZWN2JzpcclxuICAgICAgY2FzZSAnYT1zZW5kb25seSc6XHJcbiAgICAgIGNhc2UgJ2E9cmVjdm9ubHknOlxyXG4gICAgICBjYXNlICdhPWluYWN0aXZlJzpcclxuICAgICAgICByZXR1cm4gbGluZXNbaV0uc3Vic3RyKDIpO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIC8vIEZJWE1FOiBXaGF0IHNob3VsZCBoYXBwZW4gaGVyZT9cclxuICAgIH1cclxuICB9XHJcbiAgaWYgKHNlc3Npb25wYXJ0KSB7XHJcbiAgICByZXR1cm4gU0RQVXRpbHMuZ2V0RGlyZWN0aW9uKHNlc3Npb25wYXJ0KTtcclxuICB9XHJcbiAgcmV0dXJuICdzZW5kcmVjdic7XHJcbn07XHJcblxyXG5TRFBVdGlscy5nZXRLaW5kID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XHJcbiAgdmFyIGxpbmVzID0gU0RQVXRpbHMuc3BsaXRMaW5lcyhtZWRpYVNlY3Rpb24pO1xyXG4gIHZhciBtbGluZSA9IGxpbmVzWzBdLnNwbGl0KCcgJyk7XHJcbiAgcmV0dXJuIG1saW5lWzBdLnN1YnN0cigyKTtcclxufTtcclxuXHJcblNEUFV0aWxzLmlzUmVqZWN0ZWQgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcclxuICByZXR1cm4gbWVkaWFTZWN0aW9uLnNwbGl0KCcgJywgMilbMV0gPT09ICcwJztcclxufTtcclxuXHJcblNEUFV0aWxzLnBhcnNlTUxpbmUgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcclxuICB2YXIgbGluZXMgPSBTRFBVdGlscy5zcGxpdExpbmVzKG1lZGlhU2VjdGlvbik7XHJcbiAgdmFyIHBhcnRzID0gbGluZXNbMF0uc3Vic3RyKDIpLnNwbGl0KCcgJyk7XHJcbiAgcmV0dXJuIHtcclxuICAgIGtpbmQ6IHBhcnRzWzBdLFxyXG4gICAgcG9ydDogcGFyc2VJbnQocGFydHNbMV0sIDEwKSxcclxuICAgIHByb3RvY29sOiBwYXJ0c1syXSxcclxuICAgIGZtdDogcGFydHMuc2xpY2UoMykuam9pbignICcpXHJcbiAgfTtcclxufTtcclxuXHJcblNEUFV0aWxzLnBhcnNlT0xpbmUgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcclxuICB2YXIgbGluZSA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ289JylbMF07XHJcbiAgdmFyIHBhcnRzID0gbGluZS5zdWJzdHIoMikuc3BsaXQoJyAnKTtcclxuICByZXR1cm4ge1xyXG4gICAgdXNlcm5hbWU6IHBhcnRzWzBdLFxyXG4gICAgc2Vzc2lvbklkOiBwYXJ0c1sxXSxcclxuICAgIHNlc3Npb25WZXJzaW9uOiBwYXJzZUludChwYXJ0c1syXSwgMTApLFxyXG4gICAgbmV0VHlwZTogcGFydHNbM10sXHJcbiAgICBhZGRyZXNzVHlwZTogcGFydHNbNF0sXHJcbiAgICBhZGRyZXNzOiBwYXJ0c1s1XSxcclxuICB9O1xyXG59XHJcblxyXG4vLyBFeHBvc2UgcHVibGljIG1ldGhvZHMuXHJcbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jykge1xyXG4gIG1vZHVsZS5leHBvcnRzID0gU0RQVXRpbHM7XHJcbn1cclxuXHJcbn0se31dLDM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG4oZnVuY3Rpb24gKGdsb2JhbCl7XHJcbi8qXHJcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXHJcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcclxuICogIHRyZWUuXHJcbiAqL1xyXG4gLyogZXNsaW50LWVudiBub2RlICovXHJcblxyXG4ndXNlIHN0cmljdCc7XHJcblxyXG52YXIgYWRhcHRlckZhY3RvcnkgPSByZXF1aXJlKCcuL2FkYXB0ZXJfZmFjdG9yeS5qcycpO1xyXG5tb2R1bGUuZXhwb3J0cyA9IGFkYXB0ZXJGYWN0b3J5KHt3aW5kb3c6IGdsb2JhbC53aW5kb3d9KTtcclxuXHJcbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxyXG59LHtcIi4vYWRhcHRlcl9mYWN0b3J5LmpzXCI6NH1dLDQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG4vKlxyXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKlxyXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxyXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXHJcbiAqICB0cmVlLlxyXG4gKi9cclxuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xyXG4vLyBTaGltbWluZyBzdGFydHMgaGVyZS5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkZXBlbmRlbmNpZXMsIG9wdHMpIHtcclxuICB2YXIgd2luZG93ID0gZGVwZW5kZW5jaWVzICYmIGRlcGVuZGVuY2llcy53aW5kb3c7XHJcblxyXG4gIHZhciBvcHRpb25zID0ge1xyXG4gICAgc2hpbUNocm9tZTogdHJ1ZSxcclxuICAgIHNoaW1GaXJlZm94OiB0cnVlLFxyXG4gICAgc2hpbUVkZ2U6IHRydWUsXHJcbiAgICBzaGltU2FmYXJpOiB0cnVlLFxyXG4gIH07XHJcblxyXG4gIGZvciAodmFyIGtleSBpbiBvcHRzKSB7XHJcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvcHRzLCBrZXkpKSB7XHJcbiAgICAgIG9wdGlvbnNba2V5XSA9IG9wdHNba2V5XTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIFV0aWxzLlxyXG4gIHZhciBsb2dnaW5nID0gdXRpbHMubG9nO1xyXG4gIHZhciBicm93c2VyRGV0YWlscyA9IHV0aWxzLmRldGVjdEJyb3dzZXIod2luZG93KTtcclxuXHJcbiAgLy8gVW5jb21tZW50IHRoZSBsaW5lIGJlbG93IGlmIHlvdSB3YW50IGxvZ2dpbmcgdG8gb2NjdXIsIGluY2x1ZGluZyBsb2dnaW5nXHJcbiAgLy8gZm9yIHRoZSBzd2l0Y2ggc3RhdGVtZW50IGJlbG93LiBDYW4gYWxzbyBiZSB0dXJuZWQgb24gaW4gdGhlIGJyb3dzZXIgdmlhXHJcbiAgLy8gYWRhcHRlci5kaXNhYmxlTG9nKGZhbHNlKSwgYnV0IHRoZW4gbG9nZ2luZyBmcm9tIHRoZSBzd2l0Y2ggc3RhdGVtZW50IGJlbG93XHJcbiAgLy8gd2lsbCBub3QgYXBwZWFyLlxyXG4gIC8vIHJlcXVpcmUoJy4vdXRpbHMnKS5kaXNhYmxlTG9nKGZhbHNlKTtcclxuXHJcbiAgLy8gQnJvd3NlciBzaGltcy5cclxuICB2YXIgY2hyb21lU2hpbSA9IHJlcXVpcmUoJy4vY2hyb21lL2Nocm9tZV9zaGltJykgfHwgbnVsbDtcclxuICB2YXIgZWRnZVNoaW0gPSByZXF1aXJlKCcuL2VkZ2UvZWRnZV9zaGltJykgfHwgbnVsbDtcclxuICB2YXIgZmlyZWZveFNoaW0gPSByZXF1aXJlKCcuL2ZpcmVmb3gvZmlyZWZveF9zaGltJykgfHwgbnVsbDtcclxuICB2YXIgc2FmYXJpU2hpbSA9IHJlcXVpcmUoJy4vc2FmYXJpL3NhZmFyaV9zaGltJykgfHwgbnVsbDtcclxuICB2YXIgY29tbW9uU2hpbSA9IHJlcXVpcmUoJy4vY29tbW9uX3NoaW0nKSB8fCBudWxsO1xyXG5cclxuICAvLyBFeHBvcnQgdG8gdGhlIGFkYXB0ZXIgZ2xvYmFsIG9iamVjdCB2aXNpYmxlIGluIHRoZSBicm93c2VyLlxyXG4gIHZhciBhZGFwdGVyID0ge1xyXG4gICAgYnJvd3NlckRldGFpbHM6IGJyb3dzZXJEZXRhaWxzLFxyXG4gICAgY29tbW9uU2hpbTogY29tbW9uU2hpbSxcclxuICAgIGV4dHJhY3RWZXJzaW9uOiB1dGlscy5leHRyYWN0VmVyc2lvbixcclxuICAgIGRpc2FibGVMb2c6IHV0aWxzLmRpc2FibGVMb2csXHJcbiAgICBkaXNhYmxlV2FybmluZ3M6IHV0aWxzLmRpc2FibGVXYXJuaW5nc1xyXG4gIH07XHJcblxyXG4gIC8vIFNoaW0gYnJvd3NlciBpZiBmb3VuZC5cclxuICBzd2l0Y2ggKGJyb3dzZXJEZXRhaWxzLmJyb3dzZXIpIHtcclxuICAgIGNhc2UgJ2Nocm9tZSc6XHJcbiAgICAgIGlmICghY2hyb21lU2hpbSB8fCAhY2hyb21lU2hpbS5zaGltUGVlckNvbm5lY3Rpb24gfHxcclxuICAgICAgICAgICFvcHRpb25zLnNoaW1DaHJvbWUpIHtcclxuICAgICAgICBsb2dnaW5nKCdDaHJvbWUgc2hpbSBpcyBub3QgaW5jbHVkZWQgaW4gdGhpcyBhZGFwdGVyIHJlbGVhc2UuJyk7XHJcbiAgICAgICAgcmV0dXJuIGFkYXB0ZXI7XHJcbiAgICAgIH1cclxuICAgICAgbG9nZ2luZygnYWRhcHRlci5qcyBzaGltbWluZyBjaHJvbWUuJyk7XHJcbiAgICAgIC8vIEV4cG9ydCB0byB0aGUgYWRhcHRlciBnbG9iYWwgb2JqZWN0IHZpc2libGUgaW4gdGhlIGJyb3dzZXIuXHJcbiAgICAgIGFkYXB0ZXIuYnJvd3NlclNoaW0gPSBjaHJvbWVTaGltO1xyXG4gICAgICBjb21tb25TaGltLnNoaW1DcmVhdGVPYmplY3RVUkwod2luZG93KTtcclxuXHJcbiAgICAgIGNocm9tZVNoaW0uc2hpbUdldFVzZXJNZWRpYSh3aW5kb3cpO1xyXG4gICAgICBjaHJvbWVTaGltLnNoaW1NZWRpYVN0cmVhbSh3aW5kb3cpO1xyXG4gICAgICBjaHJvbWVTaGltLnNoaW1Tb3VyY2VPYmplY3Qod2luZG93KTtcclxuICAgICAgY2hyb21lU2hpbS5zaGltUGVlckNvbm5lY3Rpb24od2luZG93KTtcclxuICAgICAgY2hyb21lU2hpbS5zaGltT25UcmFjayh3aW5kb3cpO1xyXG4gICAgICBjaHJvbWVTaGltLnNoaW1BZGRUcmFja1JlbW92ZVRyYWNrKHdpbmRvdyk7XHJcbiAgICAgIGNocm9tZVNoaW0uc2hpbUdldFNlbmRlcnNXaXRoRHRtZih3aW5kb3cpO1xyXG5cclxuICAgICAgY29tbW9uU2hpbS5zaGltUlRDSWNlQ2FuZGlkYXRlKHdpbmRvdyk7XHJcbiAgICAgIGNvbW1vblNoaW0uc2hpbU1heE1lc3NhZ2VTaXplKHdpbmRvdyk7XHJcbiAgICAgIGNvbW1vblNoaW0uc2hpbVNlbmRUaHJvd1R5cGVFcnJvcih3aW5kb3cpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ2ZpcmVmb3gnOlxyXG4gICAgICBpZiAoIWZpcmVmb3hTaGltIHx8ICFmaXJlZm94U2hpbS5zaGltUGVlckNvbm5lY3Rpb24gfHxcclxuICAgICAgICAgICFvcHRpb25zLnNoaW1GaXJlZm94KSB7XHJcbiAgICAgICAgbG9nZ2luZygnRmlyZWZveCBzaGltIGlzIG5vdCBpbmNsdWRlZCBpbiB0aGlzIGFkYXB0ZXIgcmVsZWFzZS4nKTtcclxuICAgICAgICByZXR1cm4gYWRhcHRlcjtcclxuICAgICAgfVxyXG4gICAgICBsb2dnaW5nKCdhZGFwdGVyLmpzIHNoaW1taW5nIGZpcmVmb3guJyk7XHJcbiAgICAgIC8vIEV4cG9ydCB0byB0aGUgYWRhcHRlciBnbG9iYWwgb2JqZWN0IHZpc2libGUgaW4gdGhlIGJyb3dzZXIuXHJcbiAgICAgIGFkYXB0ZXIuYnJvd3NlclNoaW0gPSBmaXJlZm94U2hpbTtcclxuICAgICAgY29tbW9uU2hpbS5zaGltQ3JlYXRlT2JqZWN0VVJMKHdpbmRvdyk7XHJcblxyXG4gICAgICBmaXJlZm94U2hpbS5zaGltR2V0VXNlck1lZGlhKHdpbmRvdyk7XHJcbiAgICAgIGZpcmVmb3hTaGltLnNoaW1Tb3VyY2VPYmplY3Qod2luZG93KTtcclxuICAgICAgZmlyZWZveFNoaW0uc2hpbVBlZXJDb25uZWN0aW9uKHdpbmRvdyk7XHJcbiAgICAgIGZpcmVmb3hTaGltLnNoaW1PblRyYWNrKHdpbmRvdyk7XHJcbiAgICAgIGZpcmVmb3hTaGltLnNoaW1SZW1vdmVTdHJlYW0od2luZG93KTtcclxuXHJcbiAgICAgIGNvbW1vblNoaW0uc2hpbVJUQ0ljZUNhbmRpZGF0ZSh3aW5kb3cpO1xyXG4gICAgICBjb21tb25TaGltLnNoaW1NYXhNZXNzYWdlU2l6ZSh3aW5kb3cpO1xyXG4gICAgICBjb21tb25TaGltLnNoaW1TZW5kVGhyb3dUeXBlRXJyb3Iod2luZG93KTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdlZGdlJzpcclxuICAgICAgaWYgKCFlZGdlU2hpbSB8fCAhZWRnZVNoaW0uc2hpbVBlZXJDb25uZWN0aW9uIHx8ICFvcHRpb25zLnNoaW1FZGdlKSB7XHJcbiAgICAgICAgbG9nZ2luZygnTVMgZWRnZSBzaGltIGlzIG5vdCBpbmNsdWRlZCBpbiB0aGlzIGFkYXB0ZXIgcmVsZWFzZS4nKTtcclxuICAgICAgICByZXR1cm4gYWRhcHRlcjtcclxuICAgICAgfVxyXG4gICAgICBsb2dnaW5nKCdhZGFwdGVyLmpzIHNoaW1taW5nIGVkZ2UuJyk7XHJcbiAgICAgIC8vIEV4cG9ydCB0byB0aGUgYWRhcHRlciBnbG9iYWwgb2JqZWN0IHZpc2libGUgaW4gdGhlIGJyb3dzZXIuXHJcbiAgICAgIGFkYXB0ZXIuYnJvd3NlclNoaW0gPSBlZGdlU2hpbTtcclxuICAgICAgY29tbW9uU2hpbS5zaGltQ3JlYXRlT2JqZWN0VVJMKHdpbmRvdyk7XHJcblxyXG4gICAgICBlZGdlU2hpbS5zaGltR2V0VXNlck1lZGlhKHdpbmRvdyk7XHJcbiAgICAgIGVkZ2VTaGltLnNoaW1QZWVyQ29ubmVjdGlvbih3aW5kb3cpO1xyXG4gICAgICBlZGdlU2hpbS5zaGltUmVwbGFjZVRyYWNrKHdpbmRvdyk7XHJcblxyXG4gICAgICAvLyB0aGUgZWRnZSBzaGltIGltcGxlbWVudHMgdGhlIGZ1bGwgUlRDSWNlQ2FuZGlkYXRlIG9iamVjdC5cclxuXHJcbiAgICAgIGNvbW1vblNoaW0uc2hpbU1heE1lc3NhZ2VTaXplKHdpbmRvdyk7XHJcbiAgICAgIGNvbW1vblNoaW0uc2hpbVNlbmRUaHJvd1R5cGVFcnJvcih3aW5kb3cpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ3NhZmFyaSc6XHJcbiAgICAgIGlmICghc2FmYXJpU2hpbSB8fCAhb3B0aW9ucy5zaGltU2FmYXJpKSB7XHJcbiAgICAgICAgbG9nZ2luZygnU2FmYXJpIHNoaW0gaXMgbm90IGluY2x1ZGVkIGluIHRoaXMgYWRhcHRlciByZWxlYXNlLicpO1xyXG4gICAgICAgIHJldHVybiBhZGFwdGVyO1xyXG4gICAgICB9XHJcbiAgICAgIGxvZ2dpbmcoJ2FkYXB0ZXIuanMgc2hpbW1pbmcgc2FmYXJpLicpO1xyXG4gICAgICAvLyBFeHBvcnQgdG8gdGhlIGFkYXB0ZXIgZ2xvYmFsIG9iamVjdCB2aXNpYmxlIGluIHRoZSBicm93c2VyLlxyXG4gICAgICBhZGFwdGVyLmJyb3dzZXJTaGltID0gc2FmYXJpU2hpbTtcclxuICAgICAgY29tbW9uU2hpbS5zaGltQ3JlYXRlT2JqZWN0VVJMKHdpbmRvdyk7XHJcblxyXG4gICAgICBzYWZhcmlTaGltLnNoaW1SVENJY2VTZXJ2ZXJVcmxzKHdpbmRvdyk7XHJcbiAgICAgIHNhZmFyaVNoaW0uc2hpbUNhbGxiYWNrc0FQSSh3aW5kb3cpO1xyXG4gICAgICBzYWZhcmlTaGltLnNoaW1Mb2NhbFN0cmVhbXNBUEkod2luZG93KTtcclxuICAgICAgc2FmYXJpU2hpbS5zaGltUmVtb3RlU3RyZWFtc0FQSSh3aW5kb3cpO1xyXG4gICAgICBzYWZhcmlTaGltLnNoaW1UcmFja0V2ZW50VHJhbnNjZWl2ZXIod2luZG93KTtcclxuICAgICAgc2FmYXJpU2hpbS5zaGltR2V0VXNlck1lZGlhKHdpbmRvdyk7XHJcbiAgICAgIHNhZmFyaVNoaW0uc2hpbUNyZWF0ZU9mZmVyTGVnYWN5KHdpbmRvdyk7XHJcblxyXG4gICAgICBjb21tb25TaGltLnNoaW1SVENJY2VDYW5kaWRhdGUod2luZG93KTtcclxuICAgICAgY29tbW9uU2hpbS5zaGltTWF4TWVzc2FnZVNpemUod2luZG93KTtcclxuICAgICAgY29tbW9uU2hpbS5zaGltU2VuZFRocm93VHlwZUVycm9yKHdpbmRvdyk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgbG9nZ2luZygnVW5zdXBwb3J0ZWQgYnJvd3NlciEnKTtcclxuICAgICAgYnJlYWs7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gYWRhcHRlcjtcclxufTtcclxuXHJcbn0se1wiLi9jaHJvbWUvY2hyb21lX3NoaW1cIjo1LFwiLi9jb21tb25fc2hpbVwiOjcsXCIuL2VkZ2UvZWRnZV9zaGltXCI6OCxcIi4vZmlyZWZveC9maXJlZm94X3NoaW1cIjoxMCxcIi4vc2FmYXJpL3NhZmFyaV9zaGltXCI6MTIsXCIuL3V0aWxzXCI6MTN9XSw1OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuXHJcbi8qXHJcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXHJcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcclxuICogIHRyZWUuXHJcbiAqL1xyXG4gLyogZXNsaW50LWVudiBub2RlICovXHJcbid1c2Ugc3RyaWN0JztcclxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMuanMnKTtcclxudmFyIGxvZ2dpbmcgPSB1dGlscy5sb2c7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBzaGltR2V0VXNlck1lZGlhOiByZXF1aXJlKCcuL2dldHVzZXJtZWRpYScpLFxyXG4gIHNoaW1NZWRpYVN0cmVhbTogZnVuY3Rpb24od2luZG93KSB7XHJcbiAgICB3aW5kb3cuTWVkaWFTdHJlYW0gPSB3aW5kb3cuTWVkaWFTdHJlYW0gfHwgd2luZG93LndlYmtpdE1lZGlhU3RyZWFtO1xyXG4gIH0sXHJcblxyXG4gIHNoaW1PblRyYWNrOiBmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gJiYgISgnb250cmFjaycgaW5cclxuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSwgJ29udHJhY2snLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLl9vbnRyYWNrO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbihmKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5fb250cmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYWNrJywgdGhpcy5fb250cmFjayk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYWNrJywgdGhpcy5fb250cmFjayA9IGYpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHZhciBvcmlnU2V0UmVtb3RlRGVzY3JpcHRpb24gPVxyXG4gICAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5zZXRSZW1vdGVEZXNjcmlwdGlvbjtcclxuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5zZXRSZW1vdGVEZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgICAgaWYgKCFwYy5fb250cmFja3BvbHkpIHtcclxuICAgICAgICAgIHBjLl9vbnRyYWNrcG9seSA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgLy8gb25hZGRzdHJlYW0gZG9lcyBub3QgZmlyZSB3aGVuIGEgdHJhY2sgaXMgYWRkZWQgdG8gYW4gZXhpc3RpbmdcclxuICAgICAgICAgICAgLy8gc3RyZWFtLiBCdXQgc3RyZWFtLm9uYWRkdHJhY2sgaXMgaW1wbGVtZW50ZWQgc28gd2UgdXNlIHRoYXQuXHJcbiAgICAgICAgICAgIGUuc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoJ2FkZHRyYWNrJywgZnVuY3Rpb24odGUpIHtcclxuICAgICAgICAgICAgICB2YXIgcmVjZWl2ZXI7XHJcbiAgICAgICAgICAgICAgaWYgKHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0UmVjZWl2ZXJzKSB7XHJcbiAgICAgICAgICAgICAgICByZWNlaXZlciA9IHBjLmdldFJlY2VpdmVycygpLmZpbmQoZnVuY3Rpb24ocikge1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gci50cmFjayAmJiByLnRyYWNrLmlkID09PSB0ZS50cmFjay5pZDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZWNlaXZlciA9IHt0cmFjazogdGUudHJhY2t9O1xyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCd0cmFjaycpO1xyXG4gICAgICAgICAgICAgIGV2ZW50LnRyYWNrID0gdGUudHJhY2s7XHJcbiAgICAgICAgICAgICAgZXZlbnQucmVjZWl2ZXIgPSByZWNlaXZlcjtcclxuICAgICAgICAgICAgICBldmVudC50cmFuc2NlaXZlciA9IHtyZWNlaXZlcjogcmVjZWl2ZXJ9O1xyXG4gICAgICAgICAgICAgIGV2ZW50LnN0cmVhbXMgPSBbZS5zdHJlYW1dO1xyXG4gICAgICAgICAgICAgIHBjLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZS5zdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xyXG4gICAgICAgICAgICAgIHZhciByZWNlaXZlcjtcclxuICAgICAgICAgICAgICBpZiAod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRSZWNlaXZlcnMpIHtcclxuICAgICAgICAgICAgICAgIHJlY2VpdmVyID0gcGMuZ2V0UmVjZWl2ZXJzKCkuZmluZChmdW5jdGlvbihyKSB7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiByLnRyYWNrICYmIHIudHJhY2suaWQgPT09IHRyYWNrLmlkO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlY2VpdmVyID0ge3RyYWNrOiB0cmFja307XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgndHJhY2snKTtcclxuICAgICAgICAgICAgICBldmVudC50cmFjayA9IHRyYWNrO1xyXG4gICAgICAgICAgICAgIGV2ZW50LnJlY2VpdmVyID0gcmVjZWl2ZXI7XHJcbiAgICAgICAgICAgICAgZXZlbnQudHJhbnNjZWl2ZXIgPSB7cmVjZWl2ZXI6IHJlY2VpdmVyfTtcclxuICAgICAgICAgICAgICBldmVudC5zdHJlYW1zID0gW2Uuc3RyZWFtXTtcclxuICAgICAgICAgICAgICBwYy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgcGMuYWRkRXZlbnRMaXN0ZW5lcignYWRkc3RyZWFtJywgcGMuX29udHJhY2twb2x5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9yaWdTZXRSZW1vdGVEZXNjcmlwdGlvbi5hcHBseShwYywgYXJndW1lbnRzKTtcclxuICAgICAgfTtcclxuICAgIH0gZWxzZSBpZiAoISgnUlRDUnRwVHJhbnNjZWl2ZXInIGluIHdpbmRvdykpIHtcclxuICAgICAgdXRpbHMud3JhcFBlZXJDb25uZWN0aW9uRXZlbnQod2luZG93LCAndHJhY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWYgKCFlLnRyYW5zY2VpdmVyKSB7XHJcbiAgICAgICAgICBlLnRyYW5zY2VpdmVyID0ge3JlY2VpdmVyOiBlLnJlY2VpdmVyfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGU7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHNoaW1HZXRTZW5kZXJzV2l0aER0bWY6IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgLy8gT3ZlcnJpZGVzIGFkZFRyYWNrL3JlbW92ZVRyYWNrLCBkZXBlbmRzIG9uIHNoaW1BZGRUcmFja1JlbW92ZVRyYWNrLlxyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiAmJlxyXG4gICAgICAgICEoJ2dldFNlbmRlcnMnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpICYmXHJcbiAgICAgICAgJ2NyZWF0ZURUTUZTZW5kZXInIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpIHtcclxuICAgICAgdmFyIHNoaW1TZW5kZXJXaXRoRHRtZiA9IGZ1bmN0aW9uKHBjLCB0cmFjaykge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0cmFjazogdHJhY2ssXHJcbiAgICAgICAgICBnZXQgZHRtZigpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2R0bWYgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgIGlmICh0cmFjay5raW5kID09PSAnYXVkaW8nKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kdG1mID0gcGMuY3JlYXRlRFRNRlNlbmRlcih0cmFjayk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2R0bWYgPSBudWxsO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZHRtZjtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBfcGM6IHBjXHJcbiAgICAgICAgfTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIGF1Z21lbnQgYWRkVHJhY2sgd2hlbiBnZXRTZW5kZXJzIGlzIG5vdCBhdmFpbGFibGUuXHJcbiAgICAgIGlmICghd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTZW5kZXJzKSB7XHJcbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTZW5kZXJzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB0aGlzLl9zZW5kZXJzID0gdGhpcy5fc2VuZGVycyB8fCBbXTtcclxuICAgICAgICAgIHJldHVybiB0aGlzLl9zZW5kZXJzLnNsaWNlKCk7IC8vIHJldHVybiBhIGNvcHkgb2YgdGhlIGludGVybmFsIHN0YXRlLlxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIG9yaWdBZGRUcmFjayA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2s7XHJcbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjayA9IGZ1bmN0aW9uKHRyYWNrLCBzdHJlYW0pIHtcclxuICAgICAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyID0gb3JpZ0FkZFRyYWNrLmFwcGx5KHBjLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgaWYgKCFzZW5kZXIpIHtcclxuICAgICAgICAgICAgc2VuZGVyID0gc2hpbVNlbmRlcldpdGhEdG1mKHBjLCB0cmFjayk7XHJcbiAgICAgICAgICAgIHBjLl9zZW5kZXJzLnB1c2goc2VuZGVyKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBzZW5kZXI7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmFyIG9yaWdSZW1vdmVUcmFjayA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlVHJhY2s7XHJcbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVUcmFjayA9IGZ1bmN0aW9uKHNlbmRlcikge1xyXG4gICAgICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgICAgIG9yaWdSZW1vdmVUcmFjay5hcHBseShwYywgYXJndW1lbnRzKTtcclxuICAgICAgICAgIHZhciBpZHggPSBwYy5fc2VuZGVycy5pbmRleE9mKHNlbmRlcik7XHJcbiAgICAgICAgICBpZiAoaWR4ICE9PSAtMSkge1xyXG4gICAgICAgICAgICBwYy5fc2VuZGVycy5zcGxpY2UoaWR4LCAxKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICAgIHZhciBvcmlnQWRkU3RyZWFtID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRTdHJlYW07XHJcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgICBwYy5fc2VuZGVycyA9IHBjLl9zZW5kZXJzIHx8IFtdO1xyXG4gICAgICAgIG9yaWdBZGRTdHJlYW0uYXBwbHkocGMsIFtzdHJlYW1dKTtcclxuICAgICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xyXG4gICAgICAgICAgcGMuX3NlbmRlcnMucHVzaChzaGltU2VuZGVyV2l0aER0bWYocGMsIHRyYWNrKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICB2YXIgb3JpZ1JlbW92ZVN0cmVhbSA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlU3RyZWFtO1xyXG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xyXG4gICAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgICAgcGMuX3NlbmRlcnMgPSBwYy5fc2VuZGVycyB8fCBbXTtcclxuICAgICAgICBvcmlnUmVtb3ZlU3RyZWFtLmFwcGx5KHBjLCBbc3RyZWFtXSk7XHJcblxyXG4gICAgICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XHJcbiAgICAgICAgICB2YXIgc2VuZGVyID0gcGMuX3NlbmRlcnMuZmluZChmdW5jdGlvbihzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzLnRyYWNrID09PSB0cmFjaztcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgaWYgKHNlbmRlcikge1xyXG4gICAgICAgICAgICBwYy5fc2VuZGVycy5zcGxpY2UocGMuX3NlbmRlcnMuaW5kZXhPZihzZW5kZXIpLCAxKTsgLy8gcmVtb3ZlIHNlbmRlclxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9O1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gJiZcclxuICAgICAgICAgICAgICAgJ2dldFNlbmRlcnMnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUgJiZcclxuICAgICAgICAgICAgICAgJ2NyZWF0ZURUTUZTZW5kZXInIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUgJiZcclxuICAgICAgICAgICAgICAgd2luZG93LlJUQ1J0cFNlbmRlciAmJlxyXG4gICAgICAgICAgICAgICAhKCdkdG1mJyBpbiB3aW5kb3cuUlRDUnRwU2VuZGVyLnByb3RvdHlwZSkpIHtcclxuICAgICAgdmFyIG9yaWdHZXRTZW5kZXJzID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTZW5kZXJzO1xyXG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFNlbmRlcnMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBzZW5kZXJzID0gb3JpZ0dldFNlbmRlcnMuYXBwbHkocGMsIFtdKTtcclxuICAgICAgICBzZW5kZXJzLmZvckVhY2goZnVuY3Rpb24oc2VuZGVyKSB7XHJcbiAgICAgICAgICBzZW5kZXIuX3BjID0gcGM7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHNlbmRlcnM7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1J0cFNlbmRlci5wcm90b3R5cGUsICdkdG1mJywge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5fZHRtZiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRyYWNrLmtpbmQgPT09ICdhdWRpbycpIHtcclxuICAgICAgICAgICAgICB0aGlzLl9kdG1mID0gdGhpcy5fcGMuY3JlYXRlRFRNRlNlbmRlcih0aGlzLnRyYWNrKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB0aGlzLl9kdG1mID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2R0bWY7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBzaGltU291cmNlT2JqZWN0OiBmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIHZhciBVUkwgPSB3aW5kb3cgJiYgd2luZG93LlVSTDtcclxuXHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgaWYgKHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50ICYmXHJcbiAgICAgICAgISgnc3JjT2JqZWN0JyBpbiB3aW5kb3cuSFRNTE1lZGlhRWxlbWVudC5wcm90b3R5cGUpKSB7XHJcbiAgICAgICAgLy8gU2hpbSB0aGUgc3JjT2JqZWN0IHByb3BlcnR5LCBvbmNlLCB3aGVuIEhUTUxNZWRpYUVsZW1lbnQgaXMgZm91bmQuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50LnByb3RvdHlwZSwgJ3NyY09iamVjdCcsIHtcclxuICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zcmNPYmplY3Q7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgc2V0OiBmdW5jdGlvbihzdHJlYW0pIHtcclxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICAvLyBVc2UgX3NyY09iamVjdCBhcyBhIHByaXZhdGUgcHJvcGVydHkgZm9yIHRoaXMgc2hpbVxyXG4gICAgICAgICAgICB0aGlzLl9zcmNPYmplY3QgPSBzdHJlYW07XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNyYykge1xyXG4gICAgICAgICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwodGhpcy5zcmMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIXN0cmVhbSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuc3JjID0gJyc7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoc3RyZWFtKTtcclxuICAgICAgICAgICAgLy8gV2UgbmVlZCB0byByZWNyZWF0ZSB0aGUgYmxvYiB1cmwgd2hlbiBhIHRyYWNrIGlzIGFkZGVkIG9yXHJcbiAgICAgICAgICAgIC8vIHJlbW92ZWQuIERvaW5nIGl0IG1hbnVhbGx5IHNpbmNlIHdlIHdhbnQgdG8gYXZvaWQgYSByZWN1cnNpb24uXHJcbiAgICAgICAgICAgIHN0cmVhbS5hZGRFdmVudExpc3RlbmVyKCdhZGR0cmFjaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgIGlmIChzZWxmLnNyYykge1xyXG4gICAgICAgICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChzZWxmLnNyYyk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHNlbGYuc3JjID0gVVJMLmNyZWF0ZU9iamVjdFVSTChzdHJlYW0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoJ3JlbW92ZXRyYWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgaWYgKHNlbGYuc3JjKSB7XHJcbiAgICAgICAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHNlbGYuc3JjKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgc2VsZi5zcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKHN0cmVhbSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgc2hpbUFkZFRyYWNrUmVtb3ZlVHJhY2tXaXRoTmF0aXZlOiBmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIC8vIHNoaW0gYWRkVHJhY2svcmVtb3ZlVHJhY2sgd2l0aCBuYXRpdmUgdmFyaWFudHMgaW4gb3JkZXIgdG8gbWFrZVxyXG4gICAgLy8gdGhlIGludGVyYWN0aW9ucyB3aXRoIGxlZ2FjeSBnZXRMb2NhbFN0cmVhbXMgYmVoYXZlIGFzIGluIG90aGVyIGJyb3dzZXJzLlxyXG4gICAgLy8gS2VlcHMgYSBtYXBwaW5nIHN0cmVhbS5pZCA9PiBbc3RyZWFtLCBydHBzZW5kZXJzLi4uXVxyXG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRMb2NhbFN0cmVhbXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcyA9IHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMgfHwge307XHJcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zKS5tYXAoZnVuY3Rpb24oc3RyZWFtSWQpIHtcclxuICAgICAgICByZXR1cm4gcGMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtSWRdWzBdO1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIG9yaWdBZGRUcmFjayA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2s7XHJcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFRyYWNrID0gZnVuY3Rpb24odHJhY2ssIHN0cmVhbSkge1xyXG4gICAgICBpZiAoIXN0cmVhbSkge1xyXG4gICAgICAgIHJldHVybiBvcmlnQWRkVHJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zID0gdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcyB8fCB7fTtcclxuXHJcbiAgICAgIHZhciBzZW5kZXIgPSBvcmlnQWRkVHJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgaWYgKCF0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbS5pZF0pIHtcclxuICAgICAgICB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbS5pZF0gPSBbc3RyZWFtLCBzZW5kZXJdO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtLmlkXS5pbmRleE9mKHNlbmRlcikgPT09IC0xKSB7XHJcbiAgICAgICAgdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW0uaWRdLnB1c2goc2VuZGVyKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc2VuZGVyO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgb3JpZ0FkZFN0cmVhbSA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkU3RyZWFtO1xyXG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcclxuICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcyA9IHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMgfHwge307XHJcblxyXG4gICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xyXG4gICAgICAgIHZhciBhbHJlYWR5RXhpc3RzID0gcGMuZ2V0U2VuZGVycygpLmZpbmQoZnVuY3Rpb24ocykge1xyXG4gICAgICAgICAgcmV0dXJuIHMudHJhY2sgPT09IHRyYWNrO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChhbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKCdUcmFjayBhbHJlYWR5IGV4aXN0cy4nLFxyXG4gICAgICAgICAgICAgICdJbnZhbGlkQWNjZXNzRXJyb3InKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICB2YXIgZXhpc3RpbmdTZW5kZXJzID0gcGMuZ2V0U2VuZGVycygpO1xyXG4gICAgICBvcmlnQWRkU3RyZWFtLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgIHZhciBuZXdTZW5kZXJzID0gcGMuZ2V0U2VuZGVycygpLmZpbHRlcihmdW5jdGlvbihuZXdTZW5kZXIpIHtcclxuICAgICAgICByZXR1cm4gZXhpc3RpbmdTZW5kZXJzLmluZGV4T2YobmV3U2VuZGVyKSA9PT0gLTE7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbS5pZF0gPSBbc3RyZWFtXS5jb25jYXQobmV3U2VuZGVycyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBvcmlnUmVtb3ZlU3RyZWFtID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVTdHJlYW07XHJcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xyXG4gICAgICB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zID0gdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcyB8fCB7fTtcclxuICAgICAgZGVsZXRlIHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtLmlkXTtcclxuICAgICAgcmV0dXJuIG9yaWdSZW1vdmVTdHJlYW0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIG9yaWdSZW1vdmVUcmFjayA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlVHJhY2s7XHJcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVRyYWNrID0gZnVuY3Rpb24oc2VuZGVyKSB7XHJcbiAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgIHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMgPSB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zIHx8IHt9O1xyXG4gICAgICBpZiAoc2VuZGVyKSB7XHJcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcykuZm9yRWFjaChmdW5jdGlvbihzdHJlYW1JZCkge1xyXG4gICAgICAgICAgdmFyIGlkeCA9IHBjLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbUlkXS5pbmRleE9mKHNlbmRlcik7XHJcbiAgICAgICAgICBpZiAoaWR4ICE9PSAtMSkge1xyXG4gICAgICAgICAgICBwYy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW1JZF0uc3BsaWNlKGlkeCwgMSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAocGMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtSWRdLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICBkZWxldGUgcGMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtSWRdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBvcmlnUmVtb3ZlVHJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIH07XHJcbiAgfSxcclxuXHJcbiAgc2hpbUFkZFRyYWNrUmVtb3ZlVHJhY2s6IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgdmFyIGJyb3dzZXJEZXRhaWxzID0gdXRpbHMuZGV0ZWN0QnJvd3Nlcih3aW5kb3cpO1xyXG4gICAgLy8gc2hpbSBhZGRUcmFjayBhbmQgcmVtb3ZlVHJhY2suXHJcbiAgICBpZiAod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjayAmJlxyXG4gICAgICAgIGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPj0gNjUpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuc2hpbUFkZFRyYWNrUmVtb3ZlVHJhY2tXaXRoTmF0aXZlKHdpbmRvdyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gYWxzbyBzaGltIHBjLmdldExvY2FsU3RyZWFtcyB3aGVuIGFkZFRyYWNrIGlzIHNoaW1tZWRcclxuICAgIC8vIHRvIHJldHVybiB0aGUgb3JpZ2luYWwgc3RyZWFtcy5cclxuICAgIHZhciBvcmlnR2V0TG9jYWxTdHJlYW1zID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVxyXG4gICAgICAgIC5nZXRMb2NhbFN0cmVhbXM7XHJcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldExvY2FsU3RyZWFtcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICB2YXIgbmF0aXZlU3RyZWFtcyA9IG9yaWdHZXRMb2NhbFN0cmVhbXMuYXBwbHkodGhpcyk7XHJcbiAgICAgIHBjLl9yZXZlcnNlU3RyZWFtcyA9IHBjLl9yZXZlcnNlU3RyZWFtcyB8fCB7fTtcclxuICAgICAgcmV0dXJuIG5hdGl2ZVN0cmVhbXMubWFwKGZ1bmN0aW9uKHN0cmVhbSkge1xyXG4gICAgICAgIHJldHVybiBwYy5fcmV2ZXJzZVN0cmVhbXNbc3RyZWFtLmlkXTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBvcmlnQWRkU3RyZWFtID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRTdHJlYW07XHJcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xyXG4gICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICBwYy5fc3RyZWFtcyA9IHBjLl9zdHJlYW1zIHx8IHt9O1xyXG4gICAgICBwYy5fcmV2ZXJzZVN0cmVhbXMgPSBwYy5fcmV2ZXJzZVN0cmVhbXMgfHwge307XHJcblxyXG4gICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xyXG4gICAgICAgIHZhciBhbHJlYWR5RXhpc3RzID0gcGMuZ2V0U2VuZGVycygpLmZpbmQoZnVuY3Rpb24ocykge1xyXG4gICAgICAgICAgcmV0dXJuIHMudHJhY2sgPT09IHRyYWNrO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChhbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKCdUcmFjayBhbHJlYWR5IGV4aXN0cy4nLFxyXG4gICAgICAgICAgICAgICdJbnZhbGlkQWNjZXNzRXJyb3InKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBBZGQgaWRlbnRpdHkgbWFwcGluZyBmb3IgY29uc2lzdGVuY3kgd2l0aCBhZGRUcmFjay5cclxuICAgICAgLy8gVW5sZXNzIHRoaXMgaXMgYmVpbmcgdXNlZCB3aXRoIGEgc3RyZWFtIGZyb20gYWRkVHJhY2suXHJcbiAgICAgIGlmICghcGMuX3JldmVyc2VTdHJlYW1zW3N0cmVhbS5pZF0pIHtcclxuICAgICAgICB2YXIgbmV3U3RyZWFtID0gbmV3IHdpbmRvdy5NZWRpYVN0cmVhbShzdHJlYW0uZ2V0VHJhY2tzKCkpO1xyXG4gICAgICAgIHBjLl9zdHJlYW1zW3N0cmVhbS5pZF0gPSBuZXdTdHJlYW07XHJcbiAgICAgICAgcGMuX3JldmVyc2VTdHJlYW1zW25ld1N0cmVhbS5pZF0gPSBzdHJlYW07XHJcbiAgICAgICAgc3RyZWFtID0gbmV3U3RyZWFtO1xyXG4gICAgICB9XHJcbiAgICAgIG9yaWdBZGRTdHJlYW0uYXBwbHkocGMsIFtzdHJlYW1dKTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIG9yaWdSZW1vdmVTdHJlYW0gPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVN0cmVhbTtcclxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgIHBjLl9zdHJlYW1zID0gcGMuX3N0cmVhbXMgfHwge307XHJcbiAgICAgIHBjLl9yZXZlcnNlU3RyZWFtcyA9IHBjLl9yZXZlcnNlU3RyZWFtcyB8fCB7fTtcclxuXHJcbiAgICAgIG9yaWdSZW1vdmVTdHJlYW0uYXBwbHkocGMsIFsocGMuX3N0cmVhbXNbc3RyZWFtLmlkXSB8fCBzdHJlYW0pXSk7XHJcbiAgICAgIGRlbGV0ZSBwYy5fcmV2ZXJzZVN0cmVhbXNbKHBjLl9zdHJlYW1zW3N0cmVhbS5pZF0gP1xyXG4gICAgICAgICAgcGMuX3N0cmVhbXNbc3RyZWFtLmlkXS5pZCA6IHN0cmVhbS5pZCldO1xyXG4gICAgICBkZWxldGUgcGMuX3N0cmVhbXNbc3RyZWFtLmlkXTtcclxuICAgIH07XHJcblxyXG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjayA9IGZ1bmN0aW9uKHRyYWNrLCBzdHJlYW0pIHtcclxuICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgaWYgKHBjLnNpZ25hbGluZ1N0YXRlID09PSAnY2xvc2VkJykge1xyXG4gICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oXHJcbiAgICAgICAgICAnVGhlIFJUQ1BlZXJDb25uZWN0aW9uXFwncyBzaWduYWxpbmdTdGF0ZSBpcyBcXCdjbG9zZWRcXCcuJyxcclxuICAgICAgICAgICdJbnZhbGlkU3RhdGVFcnJvcicpO1xyXG4gICAgICB9XHJcbiAgICAgIHZhciBzdHJlYW1zID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xyXG4gICAgICBpZiAoc3RyZWFtcy5sZW5ndGggIT09IDEgfHxcclxuICAgICAgICAgICFzdHJlYW1zWzBdLmdldFRyYWNrcygpLmZpbmQoZnVuY3Rpb24odCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdCA9PT0gdHJhY2s7XHJcbiAgICAgICAgICB9KSkge1xyXG4gICAgICAgIC8vIHRoaXMgaXMgbm90IGZ1bGx5IGNvcnJlY3QgYnV0IGFsbCB3ZSBjYW4gbWFuYWdlIHdpdGhvdXRcclxuICAgICAgICAvLyBbW2Fzc29jaWF0ZWQgTWVkaWFTdHJlYW1zXV0gaW50ZXJuYWwgc2xvdC5cclxuICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKFxyXG4gICAgICAgICAgJ1RoZSBhZGFwdGVyLmpzIGFkZFRyYWNrIHBvbHlmaWxsIG9ubHkgc3VwcG9ydHMgYSBzaW5nbGUgJyArXHJcbiAgICAgICAgICAnIHN0cmVhbSB3aGljaCBpcyBhc3NvY2lhdGVkIHdpdGggdGhlIHNwZWNpZmllZCB0cmFjay4nLFxyXG4gICAgICAgICAgJ05vdFN1cHBvcnRlZEVycm9yJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBhbHJlYWR5RXhpc3RzID0gcGMuZ2V0U2VuZGVycygpLmZpbmQoZnVuY3Rpb24ocykge1xyXG4gICAgICAgIHJldHVybiBzLnRyYWNrID09PSB0cmFjaztcclxuICAgICAgfSk7XHJcbiAgICAgIGlmIChhbHJlYWR5RXhpc3RzKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbignVHJhY2sgYWxyZWFkeSBleGlzdHMuJyxcclxuICAgICAgICAgICAgJ0ludmFsaWRBY2Nlc3NFcnJvcicpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwYy5fc3RyZWFtcyA9IHBjLl9zdHJlYW1zIHx8IHt9O1xyXG4gICAgICBwYy5fcmV2ZXJzZVN0cmVhbXMgPSBwYy5fcmV2ZXJzZVN0cmVhbXMgfHwge307XHJcbiAgICAgIHZhciBvbGRTdHJlYW0gPSBwYy5fc3RyZWFtc1tzdHJlYW0uaWRdO1xyXG4gICAgICBpZiAob2xkU3RyZWFtKSB7XHJcbiAgICAgICAgLy8gdGhpcyBpcyB1c2luZyBvZGQgQ2hyb21lIGJlaGF2aW91ciwgdXNlIHdpdGggY2F1dGlvbjpcclxuICAgICAgICAvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3Avd2VicnRjL2lzc3Vlcy9kZXRhaWw/aWQ9NzgxNVxyXG4gICAgICAgIC8vIE5vdGU6IHdlIHJlbHkgb24gdGhlIGhpZ2gtbGV2ZWwgYWRkVHJhY2svZHRtZiBzaGltIHRvXHJcbiAgICAgICAgLy8gY3JlYXRlIHRoZSBzZW5kZXIgd2l0aCBhIGR0bWYgc2VuZGVyLlxyXG4gICAgICAgIG9sZFN0cmVhbS5hZGRUcmFjayh0cmFjayk7XHJcblxyXG4gICAgICAgIC8vIFRyaWdnZXIgT05OIGFzeW5jLlxyXG4gICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBwYy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnbmVnb3RpYXRpb25uZWVkZWQnKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIG5ld1N0cmVhbSA9IG5ldyB3aW5kb3cuTWVkaWFTdHJlYW0oW3RyYWNrXSk7XHJcbiAgICAgICAgcGMuX3N0cmVhbXNbc3RyZWFtLmlkXSA9IG5ld1N0cmVhbTtcclxuICAgICAgICBwYy5fcmV2ZXJzZVN0cmVhbXNbbmV3U3RyZWFtLmlkXSA9IHN0cmVhbTtcclxuICAgICAgICBwYy5hZGRTdHJlYW0obmV3U3RyZWFtKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcGMuZ2V0U2VuZGVycygpLmZpbmQoZnVuY3Rpb24ocykge1xyXG4gICAgICAgIHJldHVybiBzLnRyYWNrID09PSB0cmFjaztcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIHJlcGxhY2UgdGhlIGludGVybmFsIHN0cmVhbSBpZCB3aXRoIHRoZSBleHRlcm5hbCBvbmUgYW5kXHJcbiAgICAvLyB2aWNlIHZlcnNhLlxyXG4gICAgZnVuY3Rpb24gcmVwbGFjZUludGVybmFsU3RyZWFtSWQocGMsIGRlc2NyaXB0aW9uKSB7XHJcbiAgICAgIHZhciBzZHAgPSBkZXNjcmlwdGlvbi5zZHA7XHJcbiAgICAgIE9iamVjdC5rZXlzKHBjLl9yZXZlcnNlU3RyZWFtcyB8fCBbXSkuZm9yRWFjaChmdW5jdGlvbihpbnRlcm5hbElkKSB7XHJcbiAgICAgICAgdmFyIGV4dGVybmFsU3RyZWFtID0gcGMuX3JldmVyc2VTdHJlYW1zW2ludGVybmFsSWRdO1xyXG4gICAgICAgIHZhciBpbnRlcm5hbFN0cmVhbSA9IHBjLl9zdHJlYW1zW2V4dGVybmFsU3RyZWFtLmlkXTtcclxuICAgICAgICBzZHAgPSBzZHAucmVwbGFjZShuZXcgUmVnRXhwKGludGVybmFsU3RyZWFtLmlkLCAnZycpLFxyXG4gICAgICAgICAgICBleHRlcm5hbFN0cmVhbS5pZCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gbmV3IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbih7XHJcbiAgICAgICAgdHlwZTogZGVzY3JpcHRpb24udHlwZSxcclxuICAgICAgICBzZHA6IHNkcFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHJlcGxhY2VFeHRlcm5hbFN0cmVhbUlkKHBjLCBkZXNjcmlwdGlvbikge1xyXG4gICAgICB2YXIgc2RwID0gZGVzY3JpcHRpb24uc2RwO1xyXG4gICAgICBPYmplY3Qua2V5cyhwYy5fcmV2ZXJzZVN0cmVhbXMgfHwgW10pLmZvckVhY2goZnVuY3Rpb24oaW50ZXJuYWxJZCkge1xyXG4gICAgICAgIHZhciBleHRlcm5hbFN0cmVhbSA9IHBjLl9yZXZlcnNlU3RyZWFtc1tpbnRlcm5hbElkXTtcclxuICAgICAgICB2YXIgaW50ZXJuYWxTdHJlYW0gPSBwYy5fc3RyZWFtc1tleHRlcm5hbFN0cmVhbS5pZF07XHJcbiAgICAgICAgc2RwID0gc2RwLnJlcGxhY2UobmV3IFJlZ0V4cChleHRlcm5hbFN0cmVhbS5pZCwgJ2cnKSxcclxuICAgICAgICAgICAgaW50ZXJuYWxTdHJlYW0uaWQpO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIG5ldyBSVENTZXNzaW9uRGVzY3JpcHRpb24oe1xyXG4gICAgICAgIHR5cGU6IGRlc2NyaXB0aW9uLnR5cGUsXHJcbiAgICAgICAgc2RwOiBzZHBcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBbJ2NyZWF0ZU9mZmVyJywgJ2NyZWF0ZUFuc3dlciddLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XHJcbiAgICAgIHZhciBuYXRpdmVNZXRob2QgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF07XHJcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XHJcbiAgICAgICAgdmFyIGlzTGVnYWN5Q2FsbCA9IGFyZ3VtZW50cy5sZW5ndGggJiZcclxuICAgICAgICAgICAgdHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ2Z1bmN0aW9uJztcclxuICAgICAgICBpZiAoaXNMZWdhY3lDYWxsKSB7XHJcbiAgICAgICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHBjLCBbXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uKGRlc2NyaXB0aW9uKSB7XHJcbiAgICAgICAgICAgICAgdmFyIGRlc2MgPSByZXBsYWNlSW50ZXJuYWxTdHJlYW1JZChwYywgZGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgIGFyZ3NbMF0uYXBwbHkobnVsbCwgW2Rlc2NdKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgaWYgKGFyZ3NbMV0pIHtcclxuICAgICAgICAgICAgICAgIGFyZ3NbMV0uYXBwbHkobnVsbCwgZXJyKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGFyZ3VtZW50c1syXVxyXG4gICAgICAgICAgXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkocGMsIGFyZ3VtZW50cylcclxuICAgICAgICAudGhlbihmdW5jdGlvbihkZXNjcmlwdGlvbikge1xyXG4gICAgICAgICAgcmV0dXJuIHJlcGxhY2VJbnRlcm5hbFN0cmVhbUlkKHBjLCBkZXNjcmlwdGlvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgb3JpZ1NldExvY2FsRGVzY3JpcHRpb24gPVxyXG4gICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0TG9jYWxEZXNjcmlwdGlvbjtcclxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0TG9jYWxEZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGggfHwgIWFyZ3VtZW50c1swXS50eXBlKSB7XHJcbiAgICAgICAgcmV0dXJuIG9yaWdTZXRMb2NhbERlc2NyaXB0aW9uLmFwcGx5KHBjLCBhcmd1bWVudHMpO1xyXG4gICAgICB9XHJcbiAgICAgIGFyZ3VtZW50c1swXSA9IHJlcGxhY2VFeHRlcm5hbFN0cmVhbUlkKHBjLCBhcmd1bWVudHNbMF0pO1xyXG4gICAgICByZXR1cm4gb3JpZ1NldExvY2FsRGVzY3JpcHRpb24uYXBwbHkocGMsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIFRPRE86IG1hbmdsZSBnZXRTdGF0czogaHR0cHM6Ly93M2MuZ2l0aHViLmlvL3dlYnJ0Yy1zdGF0cy8jZG9tLXJ0Y21lZGlhc3RyZWFtc3RhdHMtc3RyZWFtaWRlbnRpZmllclxyXG5cclxuICAgIHZhciBvcmlnTG9jYWxEZXNjcmlwdGlvbiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoXHJcbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSwgJ2xvY2FsRGVzY3JpcHRpb24nKTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLFxyXG4gICAgICAgICdsb2NhbERlc2NyaXB0aW9uJywge1xyXG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgICAgICAgdmFyIGRlc2NyaXB0aW9uID0gb3JpZ0xvY2FsRGVzY3JpcHRpb24uZ2V0LmFwcGx5KHRoaXMpO1xyXG4gICAgICAgICAgICBpZiAoZGVzY3JpcHRpb24udHlwZSA9PT0gJycpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gZGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJlcGxhY2VJbnRlcm5hbFN0cmVhbUlkKHBjLCBkZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVUcmFjayA9IGZ1bmN0aW9uKHNlbmRlcikge1xyXG4gICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICBpZiAocGMuc2lnbmFsaW5nU3RhdGUgPT09ICdjbG9zZWQnKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbihcclxuICAgICAgICAgICdUaGUgUlRDUGVlckNvbm5lY3Rpb25cXCdzIHNpZ25hbGluZ1N0YXRlIGlzIFxcJ2Nsb3NlZFxcJy4nLFxyXG4gICAgICAgICAgJ0ludmFsaWRTdGF0ZUVycm9yJyk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gV2UgY2FuIG5vdCB5ZXQgY2hlY2sgZm9yIHNlbmRlciBpbnN0YW5jZW9mIFJUQ1J0cFNlbmRlclxyXG4gICAgICAvLyBzaW5jZSB3ZSBzaGltIFJUUFNlbmRlci4gU28gd2UgY2hlY2sgaWYgc2VuZGVyLl9wYyBpcyBzZXQuXHJcbiAgICAgIGlmICghc2VuZGVyLl9wYykge1xyXG4gICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oJ0FyZ3VtZW50IDEgb2YgUlRDUGVlckNvbm5lY3Rpb24ucmVtb3ZlVHJhY2sgJyArXHJcbiAgICAgICAgICAgICdkb2VzIG5vdCBpbXBsZW1lbnQgaW50ZXJmYWNlIFJUQ1J0cFNlbmRlci4nLCAnVHlwZUVycm9yJyk7XHJcbiAgICAgIH1cclxuICAgICAgdmFyIGlzTG9jYWwgPSBzZW5kZXIuX3BjID09PSBwYztcclxuICAgICAgaWYgKCFpc0xvY2FsKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbignU2VuZGVyIHdhcyBub3QgY3JlYXRlZCBieSB0aGlzIGNvbm5lY3Rpb24uJyxcclxuICAgICAgICAgICAgJ0ludmFsaWRBY2Nlc3NFcnJvcicpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBTZWFyY2ggZm9yIHRoZSBuYXRpdmUgc3RyZWFtIHRoZSBzZW5kZXJzIHRyYWNrIGJlbG9uZ3MgdG8uXHJcbiAgICAgIHBjLl9zdHJlYW1zID0gcGMuX3N0cmVhbXMgfHwge307XHJcbiAgICAgIHZhciBzdHJlYW07XHJcbiAgICAgIE9iamVjdC5rZXlzKHBjLl9zdHJlYW1zKS5mb3JFYWNoKGZ1bmN0aW9uKHN0cmVhbWlkKSB7XHJcbiAgICAgICAgdmFyIGhhc1RyYWNrID0gcGMuX3N0cmVhbXNbc3RyZWFtaWRdLmdldFRyYWNrcygpLmZpbmQoZnVuY3Rpb24odHJhY2spIHtcclxuICAgICAgICAgIHJldHVybiBzZW5kZXIudHJhY2sgPT09IHRyYWNrO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChoYXNUcmFjaykge1xyXG4gICAgICAgICAgc3RyZWFtID0gcGMuX3N0cmVhbXNbc3RyZWFtaWRdO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoc3RyZWFtKSB7XHJcbiAgICAgICAgaWYgKHN0cmVhbS5nZXRUcmFja3MoKS5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgIC8vIGlmIHRoaXMgaXMgdGhlIGxhc3QgdHJhY2sgb2YgdGhlIHN0cmVhbSwgcmVtb3ZlIHRoZSBzdHJlYW0uIFRoaXNcclxuICAgICAgICAgIC8vIHRha2VzIGNhcmUgb2YgYW55IHNoaW1tZWQgX3NlbmRlcnMuXHJcbiAgICAgICAgICBwYy5yZW1vdmVTdHJlYW0ocGMuX3JldmVyc2VTdHJlYW1zW3N0cmVhbS5pZF0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyByZWx5aW5nIG9uIHRoZSBzYW1lIG9kZCBjaHJvbWUgYmVoYXZpb3VyIGFzIGFib3ZlLlxyXG4gICAgICAgICAgc3RyZWFtLnJlbW92ZVRyYWNrKHNlbmRlci50cmFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBjLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCduZWdvdGlhdGlvbm5lZWRlZCcpKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9LFxyXG5cclxuICBzaGltUGVlckNvbm5lY3Rpb246IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgdmFyIGJyb3dzZXJEZXRhaWxzID0gdXRpbHMuZGV0ZWN0QnJvd3Nlcih3aW5kb3cpO1xyXG5cclxuICAgIC8vIFRoZSBSVENQZWVyQ29ubmVjdGlvbiBvYmplY3QuXHJcbiAgICBpZiAoIXdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiAmJiB3aW5kb3cud2Via2l0UlRDUGVlckNvbm5lY3Rpb24pIHtcclxuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uID0gZnVuY3Rpb24ocGNDb25maWcsIHBjQ29uc3RyYWludHMpIHtcclxuICAgICAgICAvLyBUcmFuc2xhdGUgaWNlVHJhbnNwb3J0UG9saWN5IHRvIGljZVRyYW5zcG9ydHMsXHJcbiAgICAgICAgLy8gc2VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3Avd2VicnRjL2lzc3Vlcy9kZXRhaWw/aWQ9NDg2OVxyXG4gICAgICAgIC8vIHRoaXMgd2FzIGZpeGVkIGluIE01NiBhbG9uZyB3aXRoIHVucHJlZml4aW5nIFJUQ1BlZXJDb25uZWN0aW9uLlxyXG4gICAgICAgIGxvZ2dpbmcoJ1BlZXJDb25uZWN0aW9uJyk7XHJcbiAgICAgICAgaWYgKHBjQ29uZmlnICYmIHBjQ29uZmlnLmljZVRyYW5zcG9ydFBvbGljeSkge1xyXG4gICAgICAgICAgcGNDb25maWcuaWNlVHJhbnNwb3J0cyA9IHBjQ29uZmlnLmljZVRyYW5zcG9ydFBvbGljeTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgd2luZG93LndlYmtpdFJUQ1BlZXJDb25uZWN0aW9uKHBjQ29uZmlnLCBwY0NvbnN0cmFpbnRzKTtcclxuICAgICAgfTtcclxuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSA9XHJcbiAgICAgICAgICB3aW5kb3cud2Via2l0UlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlO1xyXG4gICAgICAvLyB3cmFwIHN0YXRpYyBtZXRob2RzLiBDdXJyZW50bHkganVzdCBnZW5lcmF0ZUNlcnRpZmljYXRlLlxyXG4gICAgICBpZiAod2luZG93LndlYmtpdFJUQ1BlZXJDb25uZWN0aW9uLmdlbmVyYXRlQ2VydGlmaWNhdGUpIHtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLCAnZ2VuZXJhdGVDZXJ0aWZpY2F0ZScsIHtcclxuICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cud2Via2l0UlRDUGVlckNvbm5lY3Rpb24uZ2VuZXJhdGVDZXJ0aWZpY2F0ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gbWlncmF0ZSBmcm9tIG5vbi1zcGVjIFJUQ0ljZVNlcnZlci51cmwgdG8gUlRDSWNlU2VydmVyLnVybHNcclxuICAgICAgdmFyIE9yaWdQZWVyQ29ubmVjdGlvbiA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbjtcclxuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uID0gZnVuY3Rpb24ocGNDb25maWcsIHBjQ29uc3RyYWludHMpIHtcclxuICAgICAgICBpZiAocGNDb25maWcgJiYgcGNDb25maWcuaWNlU2VydmVycykge1xyXG4gICAgICAgICAgdmFyIG5ld0ljZVNlcnZlcnMgPSBbXTtcclxuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGNDb25maWcuaWNlU2VydmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgc2VydmVyID0gcGNDb25maWcuaWNlU2VydmVyc1tpXTtcclxuICAgICAgICAgICAgaWYgKCFzZXJ2ZXIuaGFzT3duUHJvcGVydHkoJ3VybHMnKSAmJlxyXG4gICAgICAgICAgICAgICAgc2VydmVyLmhhc093blByb3BlcnR5KCd1cmwnKSkge1xyXG4gICAgICAgICAgICAgIHV0aWxzLmRlcHJlY2F0ZWQoJ1JUQ0ljZVNlcnZlci51cmwnLCAnUlRDSWNlU2VydmVyLnVybHMnKTtcclxuICAgICAgICAgICAgICBzZXJ2ZXIgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHNlcnZlcikpO1xyXG4gICAgICAgICAgICAgIHNlcnZlci51cmxzID0gc2VydmVyLnVybDtcclxuICAgICAgICAgICAgICBuZXdJY2VTZXJ2ZXJzLnB1c2goc2VydmVyKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBuZXdJY2VTZXJ2ZXJzLnB1c2gocGNDb25maWcuaWNlU2VydmVyc1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHBjQ29uZmlnLmljZVNlcnZlcnMgPSBuZXdJY2VTZXJ2ZXJzO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IE9yaWdQZWVyQ29ubmVjdGlvbihwY0NvbmZpZywgcGNDb25zdHJhaW50cyk7XHJcbiAgICAgIH07XHJcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUgPSBPcmlnUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlO1xyXG4gICAgICAvLyB3cmFwIHN0YXRpYyBtZXRob2RzLiBDdXJyZW50bHkganVzdCBnZW5lcmF0ZUNlcnRpZmljYXRlLlxyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLCAnZ2VuZXJhdGVDZXJ0aWZpY2F0ZScsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmV0dXJuIE9yaWdQZWVyQ29ubmVjdGlvbi5nZW5lcmF0ZUNlcnRpZmljYXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG9yaWdHZXRTdGF0cyA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U3RhdHM7XHJcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFN0YXRzID0gZnVuY3Rpb24oc2VsZWN0b3IsXHJcbiAgICAgICAgc3VjY2Vzc0NhbGxiYWNrLCBlcnJvckNhbGxiYWNrKSB7XHJcbiAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xyXG5cclxuICAgICAgLy8gSWYgc2VsZWN0b3IgaXMgYSBmdW5jdGlvbiB0aGVuIHdlIGFyZSBpbiB0aGUgb2xkIHN0eWxlIHN0YXRzIHNvIGp1c3RcclxuICAgICAgLy8gcGFzcyBiYWNrIHRoZSBvcmlnaW5hbCBnZXRTdGF0cyBmb3JtYXQgdG8gYXZvaWQgYnJlYWtpbmcgb2xkIHVzZXJzLlxyXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgdHlwZW9mIHNlbGVjdG9yID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgcmV0dXJuIG9yaWdHZXRTdGF0cy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBXaGVuIHNwZWMtc3R5bGUgZ2V0U3RhdHMgaXMgc3VwcG9ydGVkLCByZXR1cm4gdGhvc2Ugd2hlbiBjYWxsZWQgd2l0aFxyXG4gICAgICAvLyBlaXRoZXIgbm8gYXJndW1lbnRzIG9yIHRoZSBzZWxlY3RvciBhcmd1bWVudCBpcyBudWxsLlxyXG4gICAgICBpZiAob3JpZ0dldFN0YXRzLmxlbmd0aCA9PT0gMCAmJiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCB8fFxyXG4gICAgICAgICAgdHlwZW9mIGFyZ3VtZW50c1swXSAhPT0gJ2Z1bmN0aW9uJykpIHtcclxuICAgICAgICByZXR1cm4gb3JpZ0dldFN0YXRzLmFwcGx5KHRoaXMsIFtdKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIGZpeENocm9tZVN0YXRzXyA9IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgdmFyIHN0YW5kYXJkUmVwb3J0ID0ge307XHJcbiAgICAgICAgdmFyIHJlcG9ydHMgPSByZXNwb25zZS5yZXN1bHQoKTtcclxuICAgICAgICByZXBvcnRzLmZvckVhY2goZnVuY3Rpb24ocmVwb3J0KSB7XHJcbiAgICAgICAgICB2YXIgc3RhbmRhcmRTdGF0cyA9IHtcclxuICAgICAgICAgICAgaWQ6IHJlcG9ydC5pZCxcclxuICAgICAgICAgICAgdGltZXN0YW1wOiByZXBvcnQudGltZXN0YW1wLFxyXG4gICAgICAgICAgICB0eXBlOiB7XHJcbiAgICAgICAgICAgICAgbG9jYWxjYW5kaWRhdGU6ICdsb2NhbC1jYW5kaWRhdGUnLFxyXG4gICAgICAgICAgICAgIHJlbW90ZWNhbmRpZGF0ZTogJ3JlbW90ZS1jYW5kaWRhdGUnXHJcbiAgICAgICAgICAgIH1bcmVwb3J0LnR5cGVdIHx8IHJlcG9ydC50eXBlXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgcmVwb3J0Lm5hbWVzKCkuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgICAgIHN0YW5kYXJkU3RhdHNbbmFtZV0gPSByZXBvcnQuc3RhdChuYW1lKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgc3RhbmRhcmRSZXBvcnRbc3RhbmRhcmRTdGF0cy5pZF0gPSBzdGFuZGFyZFN0YXRzO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gc3RhbmRhcmRSZXBvcnQ7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBzaGltIGdldFN0YXRzIHdpdGggbWFwbGlrZSBzdXBwb3J0XHJcbiAgICAgIHZhciBtYWtlTWFwU3RhdHMgPSBmdW5jdGlvbihzdGF0cykge1xyXG4gICAgICAgIHJldHVybiBuZXcgTWFwKE9iamVjdC5rZXlzKHN0YXRzKS5tYXAoZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgICByZXR1cm4gW2tleSwgc3RhdHNba2V5XV07XHJcbiAgICAgICAgfSkpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gMikge1xyXG4gICAgICAgIHZhciBzdWNjZXNzQ2FsbGJhY2tXcmFwcGVyXyA9IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICBhcmdzWzFdKG1ha2VNYXBTdGF0cyhmaXhDaHJvbWVTdGF0c18ocmVzcG9uc2UpKSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG9yaWdHZXRTdGF0cy5hcHBseSh0aGlzLCBbc3VjY2Vzc0NhbGxiYWNrV3JhcHBlcl8sXHJcbiAgICAgICAgICBhcmd1bWVudHNbMF1dKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gcHJvbWlzZS1zdXBwb3J0XHJcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBvcmlnR2V0U3RhdHMuYXBwbHkocGMsIFtcclxuICAgICAgICAgIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUobWFrZU1hcFN0YXRzKGZpeENocm9tZVN0YXRzXyhyZXNwb25zZSkpKTtcclxuICAgICAgICAgIH0sIHJlamVjdF0pO1xyXG4gICAgICB9KS50aGVuKHN1Y2Nlc3NDYWxsYmFjaywgZXJyb3JDYWxsYmFjayk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIGFkZCBwcm9taXNlIHN1cHBvcnQgLS0gbmF0aXZlbHkgYXZhaWxhYmxlIGluIENocm9tZSA1MVxyXG4gICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCA1MSkge1xyXG4gICAgICBbJ3NldExvY2FsRGVzY3JpcHRpb24nLCAnc2V0UmVtb3RlRGVzY3JpcHRpb24nLCAnYWRkSWNlQ2FuZGlkYXRlJ11cclxuICAgICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xyXG4gICAgICAgICAgICB2YXIgbmF0aXZlTWV0aG9kID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdO1xyXG4gICAgICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcclxuICAgICAgICAgICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICAgICAgICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgICAgICBuYXRpdmVNZXRob2QuYXBwbHkocGMsIFthcmdzWzBdLCByZXNvbHZlLCByZWplY3RdKTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGFyZ3NbMV0uYXBwbHkobnVsbCwgW10pO1xyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJncy5sZW5ndGggPj0gMykge1xyXG4gICAgICAgICAgICAgICAgICBhcmdzWzJdLmFwcGx5KG51bGwsIFtlcnJdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHByb21pc2Ugc3VwcG9ydCBmb3IgY3JlYXRlT2ZmZXIgYW5kIGNyZWF0ZUFuc3dlci4gQXZhaWxhYmxlICh3aXRob3V0XHJcbiAgICAvLyBidWdzKSBzaW5jZSBNNTI6IGNyYnVnLzYxOTI4OVxyXG4gICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCA1Mikge1xyXG4gICAgICBbJ2NyZWF0ZU9mZmVyJywgJ2NyZWF0ZUFuc3dlciddLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XHJcbiAgICAgICAgdmFyIG5hdGl2ZU1ldGhvZCA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXTtcclxuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDEgfHwgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiZcclxuICAgICAgICAgICAgICB0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnb2JqZWN0JykpIHtcclxuICAgICAgICAgICAgdmFyIG9wdHMgPSBhcmd1bWVudHMubGVuZ3RoID09PSAxID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgICAgbmF0aXZlTWV0aG9kLmFwcGx5KHBjLCBbcmVzb2x2ZSwgcmVqZWN0LCBvcHRzXSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHNoaW0gaW1wbGljaXQgY3JlYXRpb24gb2YgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uL1JUQ0ljZUNhbmRpZGF0ZVxyXG4gICAgWydzZXRMb2NhbERlc2NyaXB0aW9uJywgJ3NldFJlbW90ZURlc2NyaXB0aW9uJywgJ2FkZEljZUNhbmRpZGF0ZSddXHJcbiAgICAgICAgLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XHJcbiAgICAgICAgICB2YXIgbmF0aXZlTWV0aG9kID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdO1xyXG4gICAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGFyZ3VtZW50c1swXSA9IG5ldyAoKG1ldGhvZCA9PT0gJ2FkZEljZUNhbmRpZGF0ZScpID9cclxuICAgICAgICAgICAgICAgIHdpbmRvdy5SVENJY2VDYW5kaWRhdGUgOlxyXG4gICAgICAgICAgICAgICAgd2luZG93LlJUQ1Nlc3Npb25EZXNjcmlwdGlvbikoYXJndW1lbnRzWzBdKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyBzdXBwb3J0IGZvciBhZGRJY2VDYW5kaWRhdGUobnVsbCBvciB1bmRlZmluZWQpXHJcbiAgICB2YXIgbmF0aXZlQWRkSWNlQ2FuZGlkYXRlID1cclxuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZEljZUNhbmRpZGF0ZTtcclxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkSWNlQ2FuZGlkYXRlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmICghYXJndW1lbnRzWzBdKSB7XHJcbiAgICAgICAgaWYgKGFyZ3VtZW50c1sxXSkge1xyXG4gICAgICAgICAgYXJndW1lbnRzWzFdLmFwcGx5KG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG5hdGl2ZUFkZEljZUNhbmRpZGF0ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgfTtcclxuICB9XHJcbn07XHJcblxyXG59LHtcIi4uL3V0aWxzLmpzXCI6MTMsXCIuL2dldHVzZXJtZWRpYVwiOjZ9XSw2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuLypcclxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcclxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxyXG4gKiAgdHJlZS5cclxuICovXHJcbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscy5qcycpO1xyXG52YXIgbG9nZ2luZyA9IHV0aWxzLmxvZztcclxuXHJcbi8vIEV4cG9zZSBwdWJsaWMgbWV0aG9kcy5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih3aW5kb3cpIHtcclxuICB2YXIgYnJvd3NlckRldGFpbHMgPSB1dGlscy5kZXRlY3RCcm93c2VyKHdpbmRvdyk7XHJcbiAgdmFyIG5hdmlnYXRvciA9IHdpbmRvdyAmJiB3aW5kb3cubmF2aWdhdG9yO1xyXG5cclxuICB2YXIgY29uc3RyYWludHNUb0Nocm9tZV8gPSBmdW5jdGlvbihjKSB7XHJcbiAgICBpZiAodHlwZW9mIGMgIT09ICdvYmplY3QnIHx8IGMubWFuZGF0b3J5IHx8IGMub3B0aW9uYWwpIHtcclxuICAgICAgcmV0dXJuIGM7XHJcbiAgICB9XHJcbiAgICB2YXIgY2MgPSB7fTtcclxuICAgIE9iamVjdC5rZXlzKGMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgIGlmIChrZXkgPT09ICdyZXF1aXJlJyB8fCBrZXkgPT09ICdhZHZhbmNlZCcgfHwga2V5ID09PSAnbWVkaWFTb3VyY2UnKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHZhciByID0gKHR5cGVvZiBjW2tleV0gPT09ICdvYmplY3QnKSA/IGNba2V5XSA6IHtpZGVhbDogY1trZXldfTtcclxuICAgICAgaWYgKHIuZXhhY3QgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygci5leGFjdCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICByLm1pbiA9IHIubWF4ID0gci5leGFjdDtcclxuICAgICAgfVxyXG4gICAgICB2YXIgb2xkbmFtZV8gPSBmdW5jdGlvbihwcmVmaXgsIG5hbWUpIHtcclxuICAgICAgICBpZiAocHJlZml4KSB7XHJcbiAgICAgICAgICByZXR1cm4gcHJlZml4ICsgbmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIG5hbWUuc2xpY2UoMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAobmFtZSA9PT0gJ2RldmljZUlkJykgPyAnc291cmNlSWQnIDogbmFtZTtcclxuICAgICAgfTtcclxuICAgICAgaWYgKHIuaWRlYWwgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGNjLm9wdGlvbmFsID0gY2Mub3B0aW9uYWwgfHwgW107XHJcbiAgICAgICAgdmFyIG9jID0ge307XHJcbiAgICAgICAgaWYgKHR5cGVvZiByLmlkZWFsID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgb2Nbb2xkbmFtZV8oJ21pbicsIGtleSldID0gci5pZGVhbDtcclxuICAgICAgICAgIGNjLm9wdGlvbmFsLnB1c2gob2MpO1xyXG4gICAgICAgICAgb2MgPSB7fTtcclxuICAgICAgICAgIG9jW29sZG5hbWVfKCdtYXgnLCBrZXkpXSA9IHIuaWRlYWw7XHJcbiAgICAgICAgICBjYy5vcHRpb25hbC5wdXNoKG9jKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgb2Nbb2xkbmFtZV8oJycsIGtleSldID0gci5pZGVhbDtcclxuICAgICAgICAgIGNjLm9wdGlvbmFsLnB1c2gob2MpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAoci5leGFjdCAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiByLmV4YWN0ICE9PSAnbnVtYmVyJykge1xyXG4gICAgICAgIGNjLm1hbmRhdG9yeSA9IGNjLm1hbmRhdG9yeSB8fCB7fTtcclxuICAgICAgICBjYy5tYW5kYXRvcnlbb2xkbmFtZV8oJycsIGtleSldID0gci5leGFjdDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBbJ21pbicsICdtYXgnXS5mb3JFYWNoKGZ1bmN0aW9uKG1peCkge1xyXG4gICAgICAgICAgaWYgKHJbbWl4XSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGNjLm1hbmRhdG9yeSA9IGNjLm1hbmRhdG9yeSB8fCB7fTtcclxuICAgICAgICAgICAgY2MubWFuZGF0b3J5W29sZG5hbWVfKG1peCwga2V5KV0gPSByW21peF07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgaWYgKGMuYWR2YW5jZWQpIHtcclxuICAgICAgY2Mub3B0aW9uYWwgPSAoY2Mub3B0aW9uYWwgfHwgW10pLmNvbmNhdChjLmFkdmFuY2VkKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjYztcclxuICB9O1xyXG5cclxuICB2YXIgc2hpbUNvbnN0cmFpbnRzXyA9IGZ1bmN0aW9uKGNvbnN0cmFpbnRzLCBmdW5jKSB7XHJcbiAgICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA+PSA2MSkge1xyXG4gICAgICByZXR1cm4gZnVuYyhjb25zdHJhaW50cyk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJhaW50cyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoY29uc3RyYWludHMpKTtcclxuICAgIGlmIChjb25zdHJhaW50cyAmJiB0eXBlb2YgY29uc3RyYWludHMuYXVkaW8gPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIHZhciByZW1hcCA9IGZ1bmN0aW9uKG9iaiwgYSwgYikge1xyXG4gICAgICAgIGlmIChhIGluIG9iaiAmJiAhKGIgaW4gb2JqKSkge1xyXG4gICAgICAgICAgb2JqW2JdID0gb2JqW2FdO1xyXG4gICAgICAgICAgZGVsZXRlIG9ialthXTtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICAgIGNvbnN0cmFpbnRzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShjb25zdHJhaW50cykpO1xyXG4gICAgICByZW1hcChjb25zdHJhaW50cy5hdWRpbywgJ2F1dG9HYWluQ29udHJvbCcsICdnb29nQXV0b0dhaW5Db250cm9sJyk7XHJcbiAgICAgIHJlbWFwKGNvbnN0cmFpbnRzLmF1ZGlvLCAnbm9pc2VTdXBwcmVzc2lvbicsICdnb29nTm9pc2VTdXBwcmVzc2lvbicpO1xyXG4gICAgICBjb25zdHJhaW50cy5hdWRpbyA9IGNvbnN0cmFpbnRzVG9DaHJvbWVfKGNvbnN0cmFpbnRzLmF1ZGlvKTtcclxuICAgIH1cclxuICAgIGlmIChjb25zdHJhaW50cyAmJiB0eXBlb2YgY29uc3RyYWludHMudmlkZW8gPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIC8vIFNoaW0gZmFjaW5nTW9kZSBmb3IgbW9iaWxlICYgc3VyZmFjZSBwcm8uXHJcbiAgICAgIHZhciBmYWNlID0gY29uc3RyYWludHMudmlkZW8uZmFjaW5nTW9kZTtcclxuICAgICAgZmFjZSA9IGZhY2UgJiYgKCh0eXBlb2YgZmFjZSA9PT0gJ29iamVjdCcpID8gZmFjZSA6IHtpZGVhbDogZmFjZX0pO1xyXG4gICAgICB2YXIgZ2V0U3VwcG9ydGVkRmFjaW5nTW9kZUxpZXMgPSBicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgNjY7XHJcblxyXG4gICAgICBpZiAoKGZhY2UgJiYgKGZhY2UuZXhhY3QgPT09ICd1c2VyJyB8fCBmYWNlLmV4YWN0ID09PSAnZW52aXJvbm1lbnQnIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgZmFjZS5pZGVhbCA9PT0gJ3VzZXInIHx8IGZhY2UuaWRlYWwgPT09ICdlbnZpcm9ubWVudCcpKSAmJlxyXG4gICAgICAgICAgIShuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFN1cHBvcnRlZENvbnN0cmFpbnRzICYmXHJcbiAgICAgICAgICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0U3VwcG9ydGVkQ29uc3RyYWludHMoKS5mYWNpbmdNb2RlICYmXHJcbiAgICAgICAgICAgICFnZXRTdXBwb3J0ZWRGYWNpbmdNb2RlTGllcykpIHtcclxuICAgICAgICBkZWxldGUgY29uc3RyYWludHMudmlkZW8uZmFjaW5nTW9kZTtcclxuICAgICAgICB2YXIgbWF0Y2hlcztcclxuICAgICAgICBpZiAoZmFjZS5leGFjdCA9PT0gJ2Vudmlyb25tZW50JyB8fCBmYWNlLmlkZWFsID09PSAnZW52aXJvbm1lbnQnKSB7XHJcbiAgICAgICAgICBtYXRjaGVzID0gWydiYWNrJywgJ3JlYXInXTtcclxuICAgICAgICB9IGVsc2UgaWYgKGZhY2UuZXhhY3QgPT09ICd1c2VyJyB8fCBmYWNlLmlkZWFsID09PSAndXNlcicpIHtcclxuICAgICAgICAgIG1hdGNoZXMgPSBbJ2Zyb250J107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtYXRjaGVzKSB7XHJcbiAgICAgICAgICAvLyBMb29rIGZvciBtYXRjaGVzIGluIGxhYmVsLCBvciB1c2UgbGFzdCBjYW0gZm9yIGJhY2sgKHR5cGljYWwpLlxyXG4gICAgICAgICAgcmV0dXJuIG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlcygpXHJcbiAgICAgICAgICAudGhlbihmdW5jdGlvbihkZXZpY2VzKSB7XHJcbiAgICAgICAgICAgIGRldmljZXMgPSBkZXZpY2VzLmZpbHRlcihmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGQua2luZCA9PT0gJ3ZpZGVvaW5wdXQnO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIGRldiA9IGRldmljZXMuZmluZChmdW5jdGlvbihkKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXMuc29tZShmdW5jdGlvbihtYXRjaCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGQubGFiZWwudG9Mb3dlckNhc2UoKS5pbmRleE9mKG1hdGNoKSAhPT0gLTE7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoIWRldiAmJiBkZXZpY2VzLmxlbmd0aCAmJiBtYXRjaGVzLmluZGV4T2YoJ2JhY2snKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICBkZXYgPSBkZXZpY2VzW2RldmljZXMubGVuZ3RoIC0gMV07IC8vIG1vcmUgbGlrZWx5IHRoZSBiYWNrIGNhbVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkZXYpIHtcclxuICAgICAgICAgICAgICBjb25zdHJhaW50cy52aWRlby5kZXZpY2VJZCA9IGZhY2UuZXhhY3QgPyB7ZXhhY3Q6IGRldi5kZXZpY2VJZH0gOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpZGVhbDogZGV2LmRldmljZUlkfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdHJhaW50cy52aWRlbyA9IGNvbnN0cmFpbnRzVG9DaHJvbWVfKGNvbnN0cmFpbnRzLnZpZGVvKTtcclxuICAgICAgICAgICAgbG9nZ2luZygnY2hyb21lOiAnICsgSlNPTi5zdHJpbmdpZnkoY29uc3RyYWludHMpKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmMoY29uc3RyYWludHMpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0cmFpbnRzLnZpZGVvID0gY29uc3RyYWludHNUb0Nocm9tZV8oY29uc3RyYWludHMudmlkZW8pO1xyXG4gICAgfVxyXG4gICAgbG9nZ2luZygnY2hyb21lOiAnICsgSlNPTi5zdHJpbmdpZnkoY29uc3RyYWludHMpKTtcclxuICAgIHJldHVybiBmdW5jKGNvbnN0cmFpbnRzKTtcclxuICB9O1xyXG5cclxuICB2YXIgc2hpbUVycm9yXyA9IGZ1bmN0aW9uKGUpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5hbWU6IHtcclxuICAgICAgICBQZXJtaXNzaW9uRGVuaWVkRXJyb3I6ICdOb3RBbGxvd2VkRXJyb3InLFxyXG4gICAgICAgIFBlcm1pc3Npb25EaXNtaXNzZWRFcnJvcjogJ05vdEFsbG93ZWRFcnJvcicsXHJcbiAgICAgICAgSW52YWxpZFN0YXRlRXJyb3I6ICdOb3RBbGxvd2VkRXJyb3InLFxyXG4gICAgICAgIERldmljZXNOb3RGb3VuZEVycm9yOiAnTm90Rm91bmRFcnJvcicsXHJcbiAgICAgICAgQ29uc3RyYWludE5vdFNhdGlzZmllZEVycm9yOiAnT3ZlcmNvbnN0cmFpbmVkRXJyb3InLFxyXG4gICAgICAgIFRyYWNrU3RhcnRFcnJvcjogJ05vdFJlYWRhYmxlRXJyb3InLFxyXG4gICAgICAgIE1lZGlhRGV2aWNlRmFpbGVkRHVlVG9TaHV0ZG93bjogJ05vdEFsbG93ZWRFcnJvcicsXHJcbiAgICAgICAgTWVkaWFEZXZpY2VLaWxsU3dpdGNoT246ICdOb3RBbGxvd2VkRXJyb3InLFxyXG4gICAgICAgIFRhYkNhcHR1cmVFcnJvcjogJ0Fib3J0RXJyb3InLFxyXG4gICAgICAgIFNjcmVlbkNhcHR1cmVFcnJvcjogJ0Fib3J0RXJyb3InLFxyXG4gICAgICAgIERldmljZUNhcHR1cmVFcnJvcjogJ0Fib3J0RXJyb3InXHJcbiAgICAgIH1bZS5uYW1lXSB8fCBlLm5hbWUsXHJcbiAgICAgIG1lc3NhZ2U6IGUubWVzc2FnZSxcclxuICAgICAgY29uc3RyYWludDogZS5jb25zdHJhaW50TmFtZSxcclxuICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5hbWUgKyAodGhpcy5tZXNzYWdlICYmICc6ICcpICsgdGhpcy5tZXNzYWdlO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH07XHJcblxyXG4gIHZhciBnZXRVc2VyTWVkaWFfID0gZnVuY3Rpb24oY29uc3RyYWludHMsIG9uU3VjY2Vzcywgb25FcnJvcikge1xyXG4gICAgc2hpbUNvbnN0cmFpbnRzXyhjb25zdHJhaW50cywgZnVuY3Rpb24oYykge1xyXG4gICAgICBuYXZpZ2F0b3Iud2Via2l0R2V0VXNlck1lZGlhKGMsIG9uU3VjY2VzcywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmIChvbkVycm9yKSB7XHJcbiAgICAgICAgICBvbkVycm9yKHNoaW1FcnJvcl8oZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhID0gZ2V0VXNlck1lZGlhXztcclxuXHJcbiAgLy8gUmV0dXJucyB0aGUgcmVzdWx0IG9mIGdldFVzZXJNZWRpYSBhcyBhIFByb21pc2UuXHJcbiAgdmFyIGdldFVzZXJNZWRpYVByb21pc2VfID0gZnVuY3Rpb24oY29uc3RyYWludHMpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgbmF2aWdhdG9yLmdldFVzZXJNZWRpYShjb25zdHJhaW50cywgcmVzb2x2ZSwgcmVqZWN0KTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIGlmICghbmF2aWdhdG9yLm1lZGlhRGV2aWNlcykge1xyXG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcyA9IHtcclxuICAgICAgZ2V0VXNlck1lZGlhOiBnZXRVc2VyTWVkaWFQcm9taXNlXyxcclxuICAgICAgZW51bWVyYXRlRGV2aWNlczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcclxuICAgICAgICAgIHZhciBraW5kcyA9IHthdWRpbzogJ2F1ZGlvaW5wdXQnLCB2aWRlbzogJ3ZpZGVvaW5wdXQnfTtcclxuICAgICAgICAgIHJldHVybiB3aW5kb3cuTWVkaWFTdHJlYW1UcmFjay5nZXRTb3VyY2VzKGZ1bmN0aW9uKGRldmljZXMpIHtcclxuICAgICAgICAgICAgcmVzb2x2ZShkZXZpY2VzLm1hcChmdW5jdGlvbihkZXZpY2UpIHtcclxuICAgICAgICAgICAgICByZXR1cm4ge2xhYmVsOiBkZXZpY2UubGFiZWwsXHJcbiAgICAgICAgICAgICAgICBraW5kOiBraW5kc1tkZXZpY2Uua2luZF0sXHJcbiAgICAgICAgICAgICAgICBkZXZpY2VJZDogZGV2aWNlLmlkLFxyXG4gICAgICAgICAgICAgICAgZ3JvdXBJZDogJyd9O1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSxcclxuICAgICAgZ2V0U3VwcG9ydGVkQ29uc3RyYWludHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBkZXZpY2VJZDogdHJ1ZSwgZWNob0NhbmNlbGxhdGlvbjogdHJ1ZSwgZmFjaW5nTW9kZTogdHJ1ZSxcclxuICAgICAgICAgIGZyYW1lUmF0ZTogdHJ1ZSwgaGVpZ2h0OiB0cnVlLCB3aWR0aDogdHJ1ZVxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvLyBBIHNoaW0gZm9yIGdldFVzZXJNZWRpYSBtZXRob2Qgb24gdGhlIG1lZGlhRGV2aWNlcyBvYmplY3QuXHJcbiAgLy8gVE9ETyhLYXB0ZW5KYW5zc29uKSByZW1vdmUgb25jZSBpbXBsZW1lbnRlZCBpbiBDaHJvbWUgc3RhYmxlLlxyXG4gIGlmICghbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEpIHtcclxuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhID0gZnVuY3Rpb24oY29uc3RyYWludHMpIHtcclxuICAgICAgcmV0dXJuIGdldFVzZXJNZWRpYVByb21pc2VfKGNvbnN0cmFpbnRzKTtcclxuICAgIH07XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIEV2ZW4gdGhvdWdoIENocm9tZSA0NSBoYXMgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcyBhbmQgYSBnZXRVc2VyTWVkaWFcclxuICAgIC8vIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYSBQcm9taXNlLCBpdCBkb2VzIG5vdCBhY2NlcHQgc3BlYy1zdHlsZVxyXG4gICAgLy8gY29uc3RyYWludHMuXHJcbiAgICB2YXIgb3JpZ0dldFVzZXJNZWRpYSA9IG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhLlxyXG4gICAgICAgIGJpbmQobmF2aWdhdG9yLm1lZGlhRGV2aWNlcyk7XHJcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSA9IGZ1bmN0aW9uKGNzKSB7XHJcbiAgICAgIHJldHVybiBzaGltQ29uc3RyYWludHNfKGNzLCBmdW5jdGlvbihjKSB7XHJcbiAgICAgICAgcmV0dXJuIG9yaWdHZXRVc2VyTWVkaWEoYykudGhlbihmdW5jdGlvbihzdHJlYW0pIHtcclxuICAgICAgICAgIGlmIChjLmF1ZGlvICYmICFzdHJlYW0uZ2V0QXVkaW9UcmFja3MoKS5sZW5ndGggfHxcclxuICAgICAgICAgICAgICBjLnZpZGVvICYmICFzdHJlYW0uZ2V0VmlkZW9UcmFja3MoKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcclxuICAgICAgICAgICAgICB0cmFjay5zdG9wKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKCcnLCAnTm90Rm91bmRFcnJvcicpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIHN0cmVhbTtcclxuICAgICAgICB9LCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3Qoc2hpbUVycm9yXyhlKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8vIER1bW15IGRldmljZWNoYW5nZSBldmVudCBtZXRob2RzLlxyXG4gIC8vIFRPRE8oS2FwdGVuSmFuc3NvbikgcmVtb3ZlIG9uY2UgaW1wbGVtZW50ZWQgaW4gQ2hyb21lIHN0YWJsZS5cclxuICBpZiAodHlwZW9mIG5hdmlnYXRvci5tZWRpYURldmljZXMuYWRkRXZlbnRMaXN0ZW5lciA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBsb2dnaW5nKCdEdW1teSBtZWRpYURldmljZXMuYWRkRXZlbnRMaXN0ZW5lciBjYWxsZWQuJyk7XHJcbiAgICB9O1xyXG4gIH1cclxuICBpZiAodHlwZW9mIG5hdmlnYXRvci5tZWRpYURldmljZXMucmVtb3ZlRXZlbnRMaXN0ZW5lciA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBsb2dnaW5nKCdEdW1teSBtZWRpYURldmljZXMucmVtb3ZlRXZlbnRMaXN0ZW5lciBjYWxsZWQuJyk7XHJcbiAgICB9O1xyXG4gIH1cclxufTtcclxuXHJcbn0se1wiLi4vdXRpbHMuanNcIjoxM31dLDc6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG4vKlxyXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE3IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKlxyXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxyXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXHJcbiAqICB0cmVlLlxyXG4gKi9cclxuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG52YXIgU0RQVXRpbHMgPSByZXF1aXJlKCdzZHAnKTtcclxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgc2hpbVJUQ0ljZUNhbmRpZGF0ZTogZnVuY3Rpb24od2luZG93KSB7XHJcbiAgICAvLyBmb3VuZGF0aW9uIGlzIGFyYml0cmFyaWx5IGNob3NlbiBhcyBhbiBpbmRpY2F0b3IgZm9yIGZ1bGwgc3VwcG9ydCBmb3JcclxuICAgIC8vIGh0dHBzOi8vdzNjLmdpdGh1Yi5pby93ZWJydGMtcGMvI3J0Y2ljZWNhbmRpZGF0ZS1pbnRlcmZhY2VcclxuICAgIGlmICghd2luZG93LlJUQ0ljZUNhbmRpZGF0ZSB8fCAod2luZG93LlJUQ0ljZUNhbmRpZGF0ZSAmJiAnZm91bmRhdGlvbicgaW5cclxuICAgICAgICB3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlLnByb3RvdHlwZSkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBOYXRpdmVSVENJY2VDYW5kaWRhdGUgPSB3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlO1xyXG4gICAgd2luZG93LlJUQ0ljZUNhbmRpZGF0ZSA9IGZ1bmN0aW9uKGFyZ3MpIHtcclxuICAgICAgLy8gUmVtb3ZlIHRoZSBhPSB3aGljaCBzaG91bGRuJ3QgYmUgcGFydCBvZiB0aGUgY2FuZGlkYXRlIHN0cmluZy5cclxuICAgICAgaWYgKHR5cGVvZiBhcmdzID09PSAnb2JqZWN0JyAmJiBhcmdzLmNhbmRpZGF0ZSAmJlxyXG4gICAgICAgICAgYXJncy5jYW5kaWRhdGUuaW5kZXhPZignYT0nKSA9PT0gMCkge1xyXG4gICAgICAgIGFyZ3MgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGFyZ3MpKTtcclxuICAgICAgICBhcmdzLmNhbmRpZGF0ZSA9IGFyZ3MuY2FuZGlkYXRlLnN1YnN0cigyKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGFyZ3MuY2FuZGlkYXRlICYmIGFyZ3MuY2FuZGlkYXRlLmxlbmd0aCkge1xyXG4gICAgICAgIC8vIEF1Z21lbnQgdGhlIG5hdGl2ZSBjYW5kaWRhdGUgd2l0aCB0aGUgcGFyc2VkIGZpZWxkcy5cclxuICAgICAgICB2YXIgbmF0aXZlQ2FuZGlkYXRlID0gbmV3IE5hdGl2ZVJUQ0ljZUNhbmRpZGF0ZShhcmdzKTtcclxuICAgICAgICB2YXIgcGFyc2VkQ2FuZGlkYXRlID0gU0RQVXRpbHMucGFyc2VDYW5kaWRhdGUoYXJncy5jYW5kaWRhdGUpO1xyXG4gICAgICAgIHZhciBhdWdtZW50ZWRDYW5kaWRhdGUgPSBPYmplY3QuYXNzaWduKG5hdGl2ZUNhbmRpZGF0ZSxcclxuICAgICAgICAgICAgcGFyc2VkQ2FuZGlkYXRlKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIGEgc2VyaWFsaXplciB0aGF0IGRvZXMgbm90IHNlcmlhbGl6ZSB0aGUgZXh0cmEgYXR0cmlidXRlcy5cclxuICAgICAgICBhdWdtZW50ZWRDYW5kaWRhdGUudG9KU09OID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjYW5kaWRhdGU6IGF1Z21lbnRlZENhbmRpZGF0ZS5jYW5kaWRhdGUsXHJcbiAgICAgICAgICAgIHNkcE1pZDogYXVnbWVudGVkQ2FuZGlkYXRlLnNkcE1pZCxcclxuICAgICAgICAgICAgc2RwTUxpbmVJbmRleDogYXVnbWVudGVkQ2FuZGlkYXRlLnNkcE1MaW5lSW5kZXgsXHJcbiAgICAgICAgICAgIHVzZXJuYW1lRnJhZ21lbnQ6IGF1Z21lbnRlZENhbmRpZGF0ZS51c2VybmFtZUZyYWdtZW50LFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBhdWdtZW50ZWRDYW5kaWRhdGU7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG5ldyBOYXRpdmVSVENJY2VDYW5kaWRhdGUoYXJncyk7XHJcbiAgICB9O1xyXG4gICAgd2luZG93LlJUQ0ljZUNhbmRpZGF0ZS5wcm90b3R5cGUgPSBOYXRpdmVSVENJY2VDYW5kaWRhdGUucHJvdG90eXBlO1xyXG5cclxuICAgIC8vIEhvb2sgdXAgdGhlIGF1Z21lbnRlZCBjYW5kaWRhdGUgaW4gb25pY2VjYW5kaWRhdGUgYW5kXHJcbiAgICAvLyBhZGRFdmVudExpc3RlbmVyKCdpY2VjYW5kaWRhdGUnLCAuLi4pXHJcbiAgICB1dGlscy53cmFwUGVlckNvbm5lY3Rpb25FdmVudCh3aW5kb3csICdpY2VjYW5kaWRhdGUnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgIGlmIChlLmNhbmRpZGF0ZSkge1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlLCAnY2FuZGlkYXRlJywge1xyXG4gICAgICAgICAgdmFsdWU6IG5ldyB3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlKGUuY2FuZGlkYXRlKSxcclxuICAgICAgICAgIHdyaXRhYmxlOiAnZmFsc2UnXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGU7XHJcbiAgICB9KTtcclxuICB9LFxyXG5cclxuICAvLyBzaGltQ3JlYXRlT2JqZWN0VVJMIG11c3QgYmUgY2FsbGVkIGJlZm9yZSBzaGltU291cmNlT2JqZWN0IHRvIGF2b2lkIGxvb3AuXHJcblxyXG4gIHNoaW1DcmVhdGVPYmplY3RVUkw6IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgdmFyIFVSTCA9IHdpbmRvdyAmJiB3aW5kb3cuVVJMO1xyXG5cclxuICAgIGlmICghKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50ICYmXHJcbiAgICAgICAgICAnc3JjT2JqZWN0JyBpbiB3aW5kb3cuSFRNTE1lZGlhRWxlbWVudC5wcm90b3R5cGUgJiZcclxuICAgICAgICBVUkwuY3JlYXRlT2JqZWN0VVJMICYmIFVSTC5yZXZva2VPYmplY3RVUkwpKSB7XHJcbiAgICAgIC8vIE9ubHkgc2hpbSBDcmVhdGVPYmplY3RVUkwgdXNpbmcgc3JjT2JqZWN0IGlmIHNyY09iamVjdCBleGlzdHMuXHJcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG5hdGl2ZUNyZWF0ZU9iamVjdFVSTCA9IFVSTC5jcmVhdGVPYmplY3RVUkwuYmluZChVUkwpO1xyXG4gICAgdmFyIG5hdGl2ZVJldm9rZU9iamVjdFVSTCA9IFVSTC5yZXZva2VPYmplY3RVUkwuYmluZChVUkwpO1xyXG4gICAgdmFyIHN0cmVhbXMgPSBuZXcgTWFwKCksIG5ld0lkID0gMDtcclxuXHJcbiAgICBVUkwuY3JlYXRlT2JqZWN0VVJMID0gZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICAgIGlmICgnZ2V0VHJhY2tzJyBpbiBzdHJlYW0pIHtcclxuICAgICAgICB2YXIgdXJsID0gJ3BvbHlibG9iOicgKyAoKytuZXdJZCk7XHJcbiAgICAgICAgc3RyZWFtcy5zZXQodXJsLCBzdHJlYW0pO1xyXG4gICAgICAgIHV0aWxzLmRlcHJlY2F0ZWQoJ1VSTC5jcmVhdGVPYmplY3RVUkwoc3RyZWFtKScsXHJcbiAgICAgICAgICAgICdlbGVtLnNyY09iamVjdCA9IHN0cmVhbScpO1xyXG4gICAgICAgIHJldHVybiB1cmw7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG5hdGl2ZUNyZWF0ZU9iamVjdFVSTChzdHJlYW0pO1xyXG4gICAgfTtcclxuICAgIFVSTC5yZXZva2VPYmplY3RVUkwgPSBmdW5jdGlvbih1cmwpIHtcclxuICAgICAgbmF0aXZlUmV2b2tlT2JqZWN0VVJMKHVybCk7XHJcbiAgICAgIHN0cmVhbXMuZGVsZXRlKHVybCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBkc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50LnByb3RvdHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzcmMnKTtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuSFRNTE1lZGlhRWxlbWVudC5wcm90b3R5cGUsICdzcmMnLCB7XHJcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGRzYy5nZXQuYXBwbHkodGhpcyk7XHJcbiAgICAgIH0sXHJcbiAgICAgIHNldDogZnVuY3Rpb24odXJsKSB7XHJcbiAgICAgICAgdGhpcy5zcmNPYmplY3QgPSBzdHJlYW1zLmdldCh1cmwpIHx8IG51bGw7XHJcbiAgICAgICAgcmV0dXJuIGRzYy5zZXQuYXBwbHkodGhpcywgW3VybF0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgbmF0aXZlU2V0QXR0cmlidXRlID0gd2luZG93LkhUTUxNZWRpYUVsZW1lbnQucHJvdG90eXBlLnNldEF0dHJpYnV0ZTtcclxuICAgIHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50LnByb3RvdHlwZS5zZXRBdHRyaWJ1dGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIgJiZcclxuICAgICAgICAgICgnJyArIGFyZ3VtZW50c1swXSkudG9Mb3dlckNhc2UoKSA9PT0gJ3NyYycpIHtcclxuICAgICAgICB0aGlzLnNyY09iamVjdCA9IHN0cmVhbXMuZ2V0KGFyZ3VtZW50c1sxXSkgfHwgbnVsbDtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbmF0aXZlU2V0QXR0cmlidXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xyXG4gIH0sXHJcblxyXG4gIHNoaW1NYXhNZXNzYWdlU2l6ZTogZnVuY3Rpb24od2luZG93KSB7XHJcbiAgICBpZiAod2luZG93LlJUQ1NjdHBUcmFuc3BvcnQgfHwgIXdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB2YXIgYnJvd3NlckRldGFpbHMgPSB1dGlscy5kZXRlY3RCcm93c2VyKHdpbmRvdyk7XHJcblxyXG4gICAgaWYgKCEoJ3NjdHAnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLCAnc2N0cCcsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLl9zY3RwID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiB0aGlzLl9zY3RwO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHNjdHBJbkRlc2NyaXB0aW9uID0gZnVuY3Rpb24oZGVzY3JpcHRpb24pIHtcclxuICAgICAgdmFyIHNlY3Rpb25zID0gU0RQVXRpbHMuc3BsaXRTZWN0aW9ucyhkZXNjcmlwdGlvbi5zZHApO1xyXG4gICAgICBzZWN0aW9ucy5zaGlmdCgpO1xyXG4gICAgICByZXR1cm4gc2VjdGlvbnMuc29tZShmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcclxuICAgICAgICB2YXIgbUxpbmUgPSBTRFBVdGlscy5wYXJzZU1MaW5lKG1lZGlhU2VjdGlvbik7XHJcbiAgICAgICAgcmV0dXJuIG1MaW5lICYmIG1MaW5lLmtpbmQgPT09ICdhcHBsaWNhdGlvbidcclxuICAgICAgICAgICAgJiYgbUxpbmUucHJvdG9jb2wuaW5kZXhPZignU0NUUCcpICE9PSAtMTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBnZXRSZW1vdGVGaXJlZm94VmVyc2lvbiA9IGZ1bmN0aW9uKGRlc2NyaXB0aW9uKSB7XHJcbiAgICAgIC8vIFRPRE86IElzIHRoZXJlIGEgYmV0dGVyIHNvbHV0aW9uIGZvciBkZXRlY3RpbmcgRmlyZWZveD9cclxuICAgICAgdmFyIG1hdGNoID0gZGVzY3JpcHRpb24uc2RwLm1hdGNoKC9tb3ppbGxhLi4uVEhJU19JU19TRFBBUlRBLShcXGQrKS8pO1xyXG4gICAgICBpZiAobWF0Y2ggPT09IG51bGwgfHwgbWF0Y2gubGVuZ3RoIDwgMikge1xyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgICAgfVxyXG4gICAgICB2YXIgdmVyc2lvbiA9IHBhcnNlSW50KG1hdGNoWzFdLCAxMCk7XHJcbiAgICAgIC8vIFRlc3QgZm9yIE5hTiAoeWVzLCB0aGlzIGlzIHVnbHkpXHJcbiAgICAgIHJldHVybiB2ZXJzaW9uICE9PSB2ZXJzaW9uID8gLTEgOiB2ZXJzaW9uO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgZ2V0Q2FuU2VuZE1heE1lc3NhZ2VTaXplID0gZnVuY3Rpb24ocmVtb3RlSXNGaXJlZm94KSB7XHJcbiAgICAgIC8vIEV2ZXJ5IGltcGxlbWVudGF0aW9uIHdlIGtub3cgY2FuIHNlbmQgYXQgbGVhc3QgNjQgS2lCLlxyXG4gICAgICAvLyBOb3RlOiBBbHRob3VnaCBDaHJvbWUgaXMgdGVjaG5pY2FsbHkgYWJsZSB0byBzZW5kIHVwIHRvIDI1NiBLaUIsIHRoZVxyXG4gICAgICAvLyAgICAgICBkYXRhIGRvZXMgbm90IHJlYWNoIHRoZSBvdGhlciBwZWVyIHJlbGlhYmx5LlxyXG4gICAgICAvLyAgICAgICBTZWU6IGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC93ZWJydGMvaXNzdWVzL2RldGFpbD9pZD04NDE5XHJcbiAgICAgIHZhciBjYW5TZW5kTWF4TWVzc2FnZVNpemUgPSA2NTUzNjtcclxuICAgICAgaWYgKGJyb3dzZXJEZXRhaWxzLmJyb3dzZXIgPT09ICdmaXJlZm94Jykge1xyXG4gICAgICAgIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgNTcpIHtcclxuICAgICAgICAgIGlmIChyZW1vdGVJc0ZpcmVmb3ggPT09IC0xKSB7XHJcbiAgICAgICAgICAgIC8vIEZGIDwgNTcgd2lsbCBzZW5kIGluIDE2IEtpQiBjaHVua3MgdXNpbmcgdGhlIGRlcHJlY2F0ZWQgUFBJRFxyXG4gICAgICAgICAgICAvLyBmcmFnbWVudGF0aW9uLlxyXG4gICAgICAgICAgICBjYW5TZW5kTWF4TWVzc2FnZVNpemUgPSAxNjM4NDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIEhvd2V2ZXIsIG90aGVyIEZGIChhbmQgUkFXUlRDKSBjYW4gcmVhc3NlbWJsZSBQUElELWZyYWdtZW50ZWRcclxuICAgICAgICAgICAgLy8gbWVzc2FnZXMuIFRodXMsIHN1cHBvcnRpbmcgfjIgR2lCIHdoZW4gc2VuZGluZy5cclxuICAgICAgICAgICAgY2FuU2VuZE1heE1lc3NhZ2VTaXplID0gMjE0NzQ4MzYzNztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gQ3VycmVudGx5LCBhbGwgRkYgPj0gNTcgd2lsbCByZXNldCB0aGUgcmVtb3RlIG1heGltdW0gbWVzc2FnZSBzaXplXHJcbiAgICAgICAgICAvLyB0byB0aGUgZGVmYXVsdCB2YWx1ZSB3aGVuIGEgZGF0YSBjaGFubmVsIGlzIGNyZWF0ZWQgYXQgYSBsYXRlclxyXG4gICAgICAgICAgLy8gc3RhZ2UuIDooXHJcbiAgICAgICAgICAvLyBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTE0MjY4MzFcclxuICAgICAgICAgIGNhblNlbmRNYXhNZXNzYWdlU2l6ZSA9XHJcbiAgICAgICAgICAgIGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPT09IDU3ID8gNjU1MzUgOiA2NTUzNjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGNhblNlbmRNYXhNZXNzYWdlU2l6ZTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIGdldE1heE1lc3NhZ2VTaXplID0gZnVuY3Rpb24oZGVzY3JpcHRpb24sIHJlbW90ZUlzRmlyZWZveCkge1xyXG4gICAgICAvLyBOb3RlOiA2NTUzNiBieXRlcyBpcyB0aGUgZGVmYXVsdCB2YWx1ZSBmcm9tIHRoZSBTRFAgc3BlYy4gQWxzbyxcclxuICAgICAgLy8gICAgICAgZXZlcnkgaW1wbGVtZW50YXRpb24gd2Uga25vdyBzdXBwb3J0cyByZWNlaXZpbmcgNjU1MzYgYnl0ZXMuXHJcbiAgICAgIHZhciBtYXhNZXNzYWdlU2l6ZSA9IDY1NTM2O1xyXG5cclxuICAgICAgLy8gRkYgNTcgaGFzIGEgc2xpZ2h0bHkgaW5jb3JyZWN0IGRlZmF1bHQgcmVtb3RlIG1heCBtZXNzYWdlIHNpemUsIHNvXHJcbiAgICAgIC8vIHdlIG5lZWQgdG8gYWRqdXN0IGl0IGhlcmUgdG8gYXZvaWQgYSBmYWlsdXJlIHdoZW4gc2VuZGluZy5cclxuICAgICAgLy8gU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xNDI1Njk3XHJcbiAgICAgIGlmIChicm93c2VyRGV0YWlscy5icm93c2VyID09PSAnZmlyZWZveCdcclxuICAgICAgICAgICAmJiBicm93c2VyRGV0YWlscy52ZXJzaW9uID09PSA1Nykge1xyXG4gICAgICAgIG1heE1lc3NhZ2VTaXplID0gNjU1MzU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBtYXRjaCA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KGRlc2NyaXB0aW9uLnNkcCwgJ2E9bWF4LW1lc3NhZ2Utc2l6ZTonKTtcclxuICAgICAgaWYgKG1hdGNoLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBtYXhNZXNzYWdlU2l6ZSA9IHBhcnNlSW50KG1hdGNoWzBdLnN1YnN0cigxOSksIDEwKTtcclxuICAgICAgfSBlbHNlIGlmIChicm93c2VyRGV0YWlscy5icm93c2VyID09PSAnZmlyZWZveCcgJiZcclxuICAgICAgICAgICAgICAgICAgcmVtb3RlSXNGaXJlZm94ICE9PSAtMSkge1xyXG4gICAgICAgIC8vIElmIHRoZSBtYXhpbXVtIG1lc3NhZ2Ugc2l6ZSBpcyBub3QgcHJlc2VudCBpbiB0aGUgcmVtb3RlIFNEUCBhbmRcclxuICAgICAgICAvLyBib3RoIGxvY2FsIGFuZCByZW1vdGUgYXJlIEZpcmVmb3gsIHRoZSByZW1vdGUgcGVlciBjYW4gcmVjZWl2ZVxyXG4gICAgICAgIC8vIH4yIEdpQi5cclxuICAgICAgICBtYXhNZXNzYWdlU2l6ZSA9IDIxNDc0ODM2Mzc7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG1heE1lc3NhZ2VTaXplO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgb3JpZ1NldFJlbW90ZURlc2NyaXB0aW9uID1cclxuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnNldFJlbW90ZURlc2NyaXB0aW9uO1xyXG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5zZXRSZW1vdGVEZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICBwYy5fc2N0cCA9IG51bGw7XHJcblxyXG4gICAgICBpZiAoc2N0cEluRGVzY3JpcHRpb24oYXJndW1lbnRzWzBdKSkge1xyXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSByZW1vdGUgaXMgRkYuXHJcbiAgICAgICAgdmFyIGlzRmlyZWZveCA9IGdldFJlbW90ZUZpcmVmb3hWZXJzaW9uKGFyZ3VtZW50c1swXSk7XHJcblxyXG4gICAgICAgIC8vIEdldCB0aGUgbWF4aW11bSBtZXNzYWdlIHNpemUgdGhlIGxvY2FsIHBlZXIgaXMgY2FwYWJsZSBvZiBzZW5kaW5nXHJcbiAgICAgICAgdmFyIGNhblNlbmRNTVMgPSBnZXRDYW5TZW5kTWF4TWVzc2FnZVNpemUoaXNGaXJlZm94KTtcclxuXHJcbiAgICAgICAgLy8gR2V0IHRoZSBtYXhpbXVtIG1lc3NhZ2Ugc2l6ZSBvZiB0aGUgcmVtb3RlIHBlZXIuXHJcbiAgICAgICAgdmFyIHJlbW90ZU1NUyA9IGdldE1heE1lc3NhZ2VTaXplKGFyZ3VtZW50c1swXSwgaXNGaXJlZm94KTtcclxuXHJcbiAgICAgICAgLy8gRGV0ZXJtaW5lIGZpbmFsIG1heGltdW0gbWVzc2FnZSBzaXplXHJcbiAgICAgICAgdmFyIG1heE1lc3NhZ2VTaXplO1xyXG4gICAgICAgIGlmIChjYW5TZW5kTU1TID09PSAwICYmIHJlbW90ZU1NUyA9PT0gMCkge1xyXG4gICAgICAgICAgbWF4TWVzc2FnZVNpemUgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjYW5TZW5kTU1TID09PSAwIHx8IHJlbW90ZU1NUyA9PT0gMCkge1xyXG4gICAgICAgICAgbWF4TWVzc2FnZVNpemUgPSBNYXRoLm1heChjYW5TZW5kTU1TLCByZW1vdGVNTVMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBtYXhNZXNzYWdlU2l6ZSA9IE1hdGgubWluKGNhblNlbmRNTVMsIHJlbW90ZU1NUyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDcmVhdGUgYSBkdW1teSBSVENTY3RwVHJhbnNwb3J0IG9iamVjdCBhbmQgdGhlICdtYXhNZXNzYWdlU2l6ZSdcclxuICAgICAgICAvLyBhdHRyaWJ1dGUuXHJcbiAgICAgICAgdmFyIHNjdHAgPSB7fTtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2N0cCwgJ21heE1lc3NhZ2VTaXplJywge1xyXG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1heE1lc3NhZ2VTaXplO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBjLl9zY3RwID0gc2N0cDtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG9yaWdTZXRSZW1vdGVEZXNjcmlwdGlvbi5hcHBseShwYywgYXJndW1lbnRzKTtcclxuICAgIH07XHJcbiAgfSxcclxuXHJcbiAgc2hpbVNlbmRUaHJvd1R5cGVFcnJvcjogZnVuY3Rpb24od2luZG93KSB7XHJcbiAgICBpZiAoISh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gJiZcclxuICAgICAgICAnY3JlYXRlRGF0YUNoYW5uZWwnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBOb3RlOiBBbHRob3VnaCBGaXJlZm94ID49IDU3IGhhcyBhIG5hdGl2ZSBpbXBsZW1lbnRhdGlvbiwgdGhlIG1heGltdW1cclxuICAgIC8vICAgICAgIG1lc3NhZ2Ugc2l6ZSBjYW4gYmUgcmVzZXQgZm9yIGFsbCBkYXRhIGNoYW5uZWxzIGF0IGEgbGF0ZXIgc3RhZ2UuXHJcbiAgICAvLyAgICAgICBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTE0MjY4MzFcclxuXHJcbiAgICB2YXIgb3JpZ0NyZWF0ZURhdGFDaGFubmVsID1cclxuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5jcmVhdGVEYXRhQ2hhbm5lbDtcclxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlRGF0YUNoYW5uZWwgPSBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgdmFyIGRhdGFDaGFubmVsID0gb3JpZ0NyZWF0ZURhdGFDaGFubmVsLmFwcGx5KHBjLCBhcmd1bWVudHMpO1xyXG4gICAgICB2YXIgb3JpZ0RhdGFDaGFubmVsU2VuZCA9IGRhdGFDaGFubmVsLnNlbmQ7XHJcblxyXG4gICAgICAvLyBQYXRjaCAnc2VuZCcgbWV0aG9kXHJcbiAgICAgIGRhdGFDaGFubmVsLnNlbmQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZGMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBkYXRhID0gYXJndW1lbnRzWzBdO1xyXG4gICAgICAgIHZhciBsZW5ndGggPSBkYXRhLmxlbmd0aCB8fCBkYXRhLnNpemUgfHwgZGF0YS5ieXRlTGVuZ3RoO1xyXG4gICAgICAgIGlmIChsZW5ndGggPiBwYy5zY3RwLm1heE1lc3NhZ2VTaXplKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKCdNZXNzYWdlIHRvbyBsYXJnZSAoY2FuIHNlbmQgYSBtYXhpbXVtIG9mICcgK1xyXG4gICAgICAgICAgICBwYy5zY3RwLm1heE1lc3NhZ2VTaXplICsgJyBieXRlcyknLCAnVHlwZUVycm9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvcmlnRGF0YUNoYW5uZWxTZW5kLmFwcGx5KGRjLCBhcmd1bWVudHMpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgcmV0dXJuIGRhdGFDaGFubmVsO1xyXG4gICAgfTtcclxuICB9XHJcbn07XHJcblxyXG59LHtcIi4vdXRpbHNcIjoxMyxcInNkcFwiOjJ9XSw4OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuLypcclxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcclxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxyXG4gKiAgdHJlZS5cclxuICovXHJcbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcclxudmFyIHNoaW1SVENQZWVyQ29ubmVjdGlvbiA9IHJlcXVpcmUoJ3J0Y3BlZXJjb25uZWN0aW9uLXNoaW0nKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIHNoaW1HZXRVc2VyTWVkaWE6IHJlcXVpcmUoJy4vZ2V0dXNlcm1lZGlhJyksXHJcbiAgc2hpbVBlZXJDb25uZWN0aW9uOiBmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIHZhciBicm93c2VyRGV0YWlscyA9IHV0aWxzLmRldGVjdEJyb3dzZXIod2luZG93KTtcclxuXHJcbiAgICBpZiAod2luZG93LlJUQ0ljZUdhdGhlcmVyKSB7XHJcbiAgICAgIGlmICghd2luZG93LlJUQ0ljZUNhbmRpZGF0ZSkge1xyXG4gICAgICAgIHdpbmRvdy5SVENJY2VDYW5kaWRhdGUgPSBmdW5jdGlvbihhcmdzKSB7XHJcbiAgICAgICAgICByZXR1cm4gYXJncztcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghd2luZG93LlJUQ1Nlc3Npb25EZXNjcmlwdGlvbikge1xyXG4gICAgICAgIHdpbmRvdy5SVENTZXNzaW9uRGVzY3JpcHRpb24gPSBmdW5jdGlvbihhcmdzKSB7XHJcbiAgICAgICAgICByZXR1cm4gYXJncztcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICAgIC8vIHRoaXMgYWRkcyBhbiBhZGRpdGlvbmFsIGV2ZW50IGxpc3RlbmVyIHRvIE1lZGlhU3RyYWNrVHJhY2sgdGhhdCBzaWduYWxzXHJcbiAgICAgIC8vIHdoZW4gYSB0cmFja3MgZW5hYmxlZCBwcm9wZXJ0eSB3YXMgY2hhbmdlZC4gV29ya2Fyb3VuZCBmb3IgYSBidWcgaW5cclxuICAgICAgLy8gYWRkU3RyZWFtLCBzZWUgYmVsb3cuIE5vIGxvbmdlciByZXF1aXJlZCBpbiAxNTAyNStcclxuICAgICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCAxNTAyNSkge1xyXG4gICAgICAgIHZhciBvcmlnTVNURW5hYmxlZCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoXHJcbiAgICAgICAgICAgIHdpbmRvdy5NZWRpYVN0cmVhbVRyYWNrLnByb3RvdHlwZSwgJ2VuYWJsZWQnKTtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93Lk1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLCAnZW5hYmxlZCcsIHtcclxuICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgb3JpZ01TVEVuYWJsZWQuc2V0LmNhbGwodGhpcywgdmFsdWUpO1xyXG4gICAgICAgICAgICB2YXIgZXYgPSBuZXcgRXZlbnQoJ2VuYWJsZWQnKTtcclxuICAgICAgICAgICAgZXYuZW5hYmxlZCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXYpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gT1JUQyBkZWZpbmVzIHRoZSBEVE1GIHNlbmRlciBhIGJpdCBkaWZmZXJlbnQuXHJcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdzNjL29ydGMvaXNzdWVzLzcxNFxyXG4gICAgaWYgKHdpbmRvdy5SVENSdHBTZW5kZXIgJiYgISgnZHRtZicgaW4gd2luZG93LlJUQ1J0cFNlbmRlci5wcm90b3R5cGUpKSB7XHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUnRwU2VuZGVyLnByb3RvdHlwZSwgJ2R0bWYnLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGlmICh0aGlzLl9kdG1mID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudHJhY2sua2luZCA9PT0gJ2F1ZGlvJykge1xyXG4gICAgICAgICAgICAgIHRoaXMuX2R0bWYgPSBuZXcgd2luZG93LlJUQ0R0bWZTZW5kZXIodGhpcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy50cmFjay5raW5kID09PSAndmlkZW8nKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5fZHRtZiA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiB0aGlzLl9kdG1mO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvLyBFZGdlIGN1cnJlbnRseSBvbmx5IGltcGxlbWVudHMgdGhlIFJUQ0R0bWZTZW5kZXIsIG5vdCB0aGVcclxuICAgIC8vIFJUQ0RUTUZTZW5kZXIgYWxpYXMuIFNlZSBodHRwOi8vZHJhZnQub3J0Yy5vcmcvI3J0Y2R0bWZzZW5kZXIyKlxyXG4gICAgaWYgKHdpbmRvdy5SVENEdG1mU2VuZGVyICYmICF3aW5kb3cuUlRDRFRNRlNlbmRlcikge1xyXG4gICAgICB3aW5kb3cuUlRDRFRNRlNlbmRlciA9IHdpbmRvdy5SVENEdG1mU2VuZGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiA9XHJcbiAgICAgICAgc2hpbVJUQ1BlZXJDb25uZWN0aW9uKHdpbmRvdywgYnJvd3NlckRldGFpbHMudmVyc2lvbik7XHJcbiAgfSxcclxuICBzaGltUmVwbGFjZVRyYWNrOiBmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIC8vIE9SVEMgaGFzIHJlcGxhY2VUcmFjayAtLSBodHRwczovL2dpdGh1Yi5jb20vdzNjL29ydGMvaXNzdWVzLzYxNFxyXG4gICAgaWYgKHdpbmRvdy5SVENSdHBTZW5kZXIgJiZcclxuICAgICAgICAhKCdyZXBsYWNlVHJhY2snIGluIHdpbmRvdy5SVENSdHBTZW5kZXIucHJvdG90eXBlKSkge1xyXG4gICAgICB3aW5kb3cuUlRDUnRwU2VuZGVyLnByb3RvdHlwZS5yZXBsYWNlVHJhY2sgPVxyXG4gICAgICAgICAgd2luZG93LlJUQ1J0cFNlbmRlci5wcm90b3R5cGUuc2V0VHJhY2s7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxufSx7XCIuLi91dGlsc1wiOjEzLFwiLi9nZXR1c2VybWVkaWFcIjo5LFwicnRjcGVlcmNvbm5lY3Rpb24tc2hpbVwiOjF9XSw5OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuLypcclxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcclxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxyXG4gKiAgdHJlZS5cclxuICovXHJcbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gRXhwb3NlIHB1YmxpYyBtZXRob2RzLlxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gIHZhciBuYXZpZ2F0b3IgPSB3aW5kb3cgJiYgd2luZG93Lm5hdmlnYXRvcjtcclxuXHJcbiAgdmFyIHNoaW1FcnJvcl8gPSBmdW5jdGlvbihlKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuYW1lOiB7UGVybWlzc2lvbkRlbmllZEVycm9yOiAnTm90QWxsb3dlZEVycm9yJ31bZS5uYW1lXSB8fCBlLm5hbWUsXHJcbiAgICAgIG1lc3NhZ2U6IGUubWVzc2FnZSxcclxuICAgICAgY29uc3RyYWludDogZS5jb25zdHJhaW50LFxyXG4gICAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9O1xyXG5cclxuICAvLyBnZXRVc2VyTWVkaWEgZXJyb3Igc2hpbS5cclxuICB2YXIgb3JpZ0dldFVzZXJNZWRpYSA9IG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhLlxyXG4gICAgICBiaW5kKG5hdmlnYXRvci5tZWRpYURldmljZXMpO1xyXG4gIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhID0gZnVuY3Rpb24oYykge1xyXG4gICAgcmV0dXJuIG9yaWdHZXRVc2VyTWVkaWEoYykuY2F0Y2goZnVuY3Rpb24oZSkge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3Qoc2hpbUVycm9yXyhlKSk7XHJcbiAgICB9KTtcclxuICB9O1xyXG59O1xyXG5cclxufSx7fV0sMTA6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG4vKlxyXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKlxyXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxyXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXHJcbiAqICB0cmVlLlxyXG4gKi9cclxuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgc2hpbUdldFVzZXJNZWRpYTogcmVxdWlyZSgnLi9nZXR1c2VybWVkaWEnKSxcclxuICBzaGltT25UcmFjazogZnVuY3Rpb24od2luZG93KSB7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uICYmICEoJ29udHJhY2snIGluXHJcbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkpIHtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUsICdvbnRyYWNrJywge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5fb250cmFjaztcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldDogZnVuY3Rpb24oZikge1xyXG4gICAgICAgICAgaWYgKHRoaXMuX29udHJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFjaycsIHRoaXMuX29udHJhY2spO1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2FkZHN0cmVhbScsIHRoaXMuX29udHJhY2twb2x5KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigndHJhY2snLCB0aGlzLl9vbnRyYWNrID0gZik7XHJcbiAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2FkZHN0cmVhbScsIHRoaXMuX29udHJhY2twb2x5ID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XHJcbiAgICAgICAgICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCd0cmFjaycpO1xyXG4gICAgICAgICAgICAgIGV2ZW50LnRyYWNrID0gdHJhY2s7XHJcbiAgICAgICAgICAgICAgZXZlbnQucmVjZWl2ZXIgPSB7dHJhY2s6IHRyYWNrfTtcclxuICAgICAgICAgICAgICBldmVudC50cmFuc2NlaXZlciA9IHtyZWNlaXZlcjogZXZlbnQucmVjZWl2ZXJ9O1xyXG4gICAgICAgICAgICAgIGV2ZW50LnN0cmVhbXMgPSBbZS5zdHJlYW1dO1xyXG4gICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgd2luZG93LlJUQ1RyYWNrRXZlbnQgJiZcclxuICAgICAgICAoJ3JlY2VpdmVyJyBpbiB3aW5kb3cuUlRDVHJhY2tFdmVudC5wcm90b3R5cGUpICYmXHJcbiAgICAgICAgISgndHJhbnNjZWl2ZXInIGluIHdpbmRvdy5SVENUcmFja0V2ZW50LnByb3RvdHlwZSkpIHtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENUcmFja0V2ZW50LnByb3RvdHlwZSwgJ3RyYW5zY2VpdmVyJywge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZXR1cm4ge3JlY2VpdmVyOiB0aGlzLnJlY2VpdmVyfTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHNoaW1Tb3VyY2VPYmplY3Q6IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgLy8gRmlyZWZveCBoYXMgc3VwcG9ydGVkIG1velNyY09iamVjdCBzaW5jZSBGRjIyLCB1bnByZWZpeGVkIGluIDQyLlxyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGlmICh3aW5kb3cuSFRNTE1lZGlhRWxlbWVudCAmJlxyXG4gICAgICAgICEoJ3NyY09iamVjdCcgaW4gd2luZG93LkhUTUxNZWRpYUVsZW1lbnQucHJvdG90eXBlKSkge1xyXG4gICAgICAgIC8vIFNoaW0gdGhlIHNyY09iamVjdCBwcm9wZXJ0eSwgb25jZSwgd2hlbiBIVE1MTWVkaWFFbGVtZW50IGlzIGZvdW5kLlxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuSFRNTE1lZGlhRWxlbWVudC5wcm90b3R5cGUsICdzcmNPYmplY3QnLCB7XHJcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb3pTcmNPYmplY3Q7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgc2V0OiBmdW5jdGlvbihzdHJlYW0pIHtcclxuICAgICAgICAgICAgdGhpcy5tb3pTcmNPYmplY3QgPSBzdHJlYW07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBzaGltUGVlckNvbm5lY3Rpb246IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgdmFyIGJyb3dzZXJEZXRhaWxzID0gdXRpbHMuZGV0ZWN0QnJvd3Nlcih3aW5kb3cpO1xyXG5cclxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAnb2JqZWN0JyB8fCAhKHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiB8fFxyXG4gICAgICAgIHdpbmRvdy5tb3pSVENQZWVyQ29ubmVjdGlvbikpIHtcclxuICAgICAgcmV0dXJuOyAvLyBwcm9iYWJseSBtZWRpYS5wZWVyY29ubmVjdGlvbi5lbmFibGVkPWZhbHNlIGluIGFib3V0OmNvbmZpZ1xyXG4gICAgfVxyXG4gICAgLy8gVGhlIFJUQ1BlZXJDb25uZWN0aW9uIG9iamVjdC5cclxuICAgIGlmICghd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uKSB7XHJcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiA9IGZ1bmN0aW9uKHBjQ29uZmlnLCBwY0NvbnN0cmFpbnRzKSB7XHJcbiAgICAgICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCAzOCkge1xyXG4gICAgICAgICAgLy8gLnVybHMgaXMgbm90IHN1cHBvcnRlZCBpbiBGRiA8IDM4LlxyXG4gICAgICAgICAgLy8gY3JlYXRlIFJUQ0ljZVNlcnZlcnMgd2l0aCBhIHNpbmdsZSB1cmwuXHJcbiAgICAgICAgICBpZiAocGNDb25maWcgJiYgcGNDb25maWcuaWNlU2VydmVycykge1xyXG4gICAgICAgICAgICB2YXIgbmV3SWNlU2VydmVycyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBjQ29uZmlnLmljZVNlcnZlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICB2YXIgc2VydmVyID0gcGNDb25maWcuaWNlU2VydmVyc1tpXTtcclxuICAgICAgICAgICAgICBpZiAoc2VydmVyLmhhc093blByb3BlcnR5KCd1cmxzJykpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc2VydmVyLnVybHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIG5ld1NlcnZlciA9IHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IHNlcnZlci51cmxzW2pdXHJcbiAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgIGlmIChzZXJ2ZXIudXJsc1tqXS5pbmRleE9mKCd0dXJuJykgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdTZXJ2ZXIudXNlcm5hbWUgPSBzZXJ2ZXIudXNlcm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3U2VydmVyLmNyZWRlbnRpYWwgPSBzZXJ2ZXIuY3JlZGVudGlhbDtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICBuZXdJY2VTZXJ2ZXJzLnB1c2gobmV3U2VydmVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmV3SWNlU2VydmVycy5wdXNoKHBjQ29uZmlnLmljZVNlcnZlcnNbaV0pO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwY0NvbmZpZy5pY2VTZXJ2ZXJzID0gbmV3SWNlU2VydmVycztcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyB3aW5kb3cubW96UlRDUGVlckNvbm5lY3Rpb24ocGNDb25maWcsIHBjQ29uc3RyYWludHMpO1xyXG4gICAgICB9O1xyXG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlID1cclxuICAgICAgICAgIHdpbmRvdy5tb3pSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGU7XHJcblxyXG4gICAgICAvLyB3cmFwIHN0YXRpYyBtZXRob2RzLiBDdXJyZW50bHkganVzdCBnZW5lcmF0ZUNlcnRpZmljYXRlLlxyXG4gICAgICBpZiAod2luZG93Lm1velJUQ1BlZXJDb25uZWN0aW9uLmdlbmVyYXRlQ2VydGlmaWNhdGUpIHtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLCAnZ2VuZXJhdGVDZXJ0aWZpY2F0ZScsIHtcclxuICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cubW96UlRDUGVlckNvbm5lY3Rpb24uZ2VuZXJhdGVDZXJ0aWZpY2F0ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgd2luZG93LlJUQ1Nlc3Npb25EZXNjcmlwdGlvbiA9IHdpbmRvdy5tb3pSVENTZXNzaW9uRGVzY3JpcHRpb247XHJcbiAgICAgIHdpbmRvdy5SVENJY2VDYW5kaWRhdGUgPSB3aW5kb3cubW96UlRDSWNlQ2FuZGlkYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHNoaW0gYXdheSBuZWVkIGZvciBvYnNvbGV0ZSBSVENJY2VDYW5kaWRhdGUvUlRDU2Vzc2lvbkRlc2NyaXB0aW9uLlxyXG4gICAgWydzZXRMb2NhbERlc2NyaXB0aW9uJywgJ3NldFJlbW90ZURlc2NyaXB0aW9uJywgJ2FkZEljZUNhbmRpZGF0ZSddXHJcbiAgICAgICAgLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XHJcbiAgICAgICAgICB2YXIgbmF0aXZlTWV0aG9kID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdO1xyXG4gICAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGFyZ3VtZW50c1swXSA9IG5ldyAoKG1ldGhvZCA9PT0gJ2FkZEljZUNhbmRpZGF0ZScpID9cclxuICAgICAgICAgICAgICAgIHdpbmRvdy5SVENJY2VDYW5kaWRhdGUgOlxyXG4gICAgICAgICAgICAgICAgd2luZG93LlJUQ1Nlc3Npb25EZXNjcmlwdGlvbikoYXJndW1lbnRzWzBdKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAvLyBzdXBwb3J0IGZvciBhZGRJY2VDYW5kaWRhdGUobnVsbCBvciB1bmRlZmluZWQpXHJcbiAgICB2YXIgbmF0aXZlQWRkSWNlQ2FuZGlkYXRlID1cclxuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZEljZUNhbmRpZGF0ZTtcclxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkSWNlQ2FuZGlkYXRlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmICghYXJndW1lbnRzWzBdKSB7XHJcbiAgICAgICAgaWYgKGFyZ3VtZW50c1sxXSkge1xyXG4gICAgICAgICAgYXJndW1lbnRzWzFdLmFwcGx5KG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG5hdGl2ZUFkZEljZUNhbmRpZGF0ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBzaGltIGdldFN0YXRzIHdpdGggbWFwbGlrZSBzdXBwb3J0XHJcbiAgICB2YXIgbWFrZU1hcFN0YXRzID0gZnVuY3Rpb24oc3RhdHMpIHtcclxuICAgICAgdmFyIG1hcCA9IG5ldyBNYXAoKTtcclxuICAgICAgT2JqZWN0LmtleXMoc3RhdHMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgbWFwLnNldChrZXksIHN0YXRzW2tleV0pO1xyXG4gICAgICAgIG1hcFtrZXldID0gc3RhdHNba2V5XTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBtYXA7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBtb2Rlcm5TdGF0c1R5cGVzID0ge1xyXG4gICAgICBpbmJvdW5kcnRwOiAnaW5ib3VuZC1ydHAnLFxyXG4gICAgICBvdXRib3VuZHJ0cDogJ291dGJvdW5kLXJ0cCcsXHJcbiAgICAgIGNhbmRpZGF0ZXBhaXI6ICdjYW5kaWRhdGUtcGFpcicsXHJcbiAgICAgIGxvY2FsY2FuZGlkYXRlOiAnbG9jYWwtY2FuZGlkYXRlJyxcclxuICAgICAgcmVtb3RlY2FuZGlkYXRlOiAncmVtb3RlLWNhbmRpZGF0ZSdcclxuICAgIH07XHJcblxyXG4gICAgdmFyIG5hdGl2ZUdldFN0YXRzID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTdGF0cztcclxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U3RhdHMgPSBmdW5jdGlvbihcclxuICAgICAgc2VsZWN0b3IsXHJcbiAgICAgIG9uU3VjYyxcclxuICAgICAgb25FcnJcclxuICAgICkge1xyXG4gICAgICByZXR1cm4gbmF0aXZlR2V0U3RhdHMuYXBwbHkodGhpcywgW3NlbGVjdG9yIHx8IG51bGxdKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKHN0YXRzKSB7XHJcbiAgICAgICAgICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDQ4KSB7XHJcbiAgICAgICAgICAgIHN0YXRzID0gbWFrZU1hcFN0YXRzKHN0YXRzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgNTMgJiYgIW9uU3VjYykge1xyXG4gICAgICAgICAgICAvLyBTaGltIG9ubHkgcHJvbWlzZSBnZXRTdGF0cyB3aXRoIHNwZWMtaHlwaGVucyBpbiB0eXBlIG5hbWVzXHJcbiAgICAgICAgICAgIC8vIExlYXZlIGNhbGxiYWNrIHZlcnNpb24gYWxvbmU7IG1pc2Mgb2xkIHVzZXMgb2YgZm9yRWFjaCBiZWZvcmUgTWFwXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgc3RhdHMuZm9yRWFjaChmdW5jdGlvbihzdGF0KSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0LnR5cGUgPSBtb2Rlcm5TdGF0c1R5cGVzW3N0YXQudHlwZV0gfHwgc3RhdC50eXBlO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgaWYgKGUubmFtZSAhPT0gJ1R5cGVFcnJvcicpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIC8vIEF2b2lkIFR5cGVFcnJvcjogXCJ0eXBlXCIgaXMgcmVhZC1vbmx5LCBpbiBvbGQgdmVyc2lvbnMuIDM0LTQzaXNoXHJcbiAgICAgICAgICAgICAgc3RhdHMuZm9yRWFjaChmdW5jdGlvbihzdGF0LCBpKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0cy5zZXQoaSwgT2JqZWN0LmFzc2lnbih7fSwgc3RhdCwge1xyXG4gICAgICAgICAgICAgICAgICB0eXBlOiBtb2Rlcm5TdGF0c1R5cGVzW3N0YXQudHlwZV0gfHwgc3RhdC50eXBlXHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBzdGF0cztcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKG9uU3VjYywgb25FcnIpO1xyXG4gICAgfTtcclxuICB9LFxyXG5cclxuICBzaGltUmVtb3ZlU3RyZWFtOiBmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIGlmICghd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uIHx8XHJcbiAgICAgICAgJ3JlbW92ZVN0cmVhbScgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xyXG4gICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICB1dGlscy5kZXByZWNhdGVkKCdyZW1vdmVTdHJlYW0nLCAncmVtb3ZlVHJhY2snKTtcclxuICAgICAgdGhpcy5nZXRTZW5kZXJzKCkuZm9yRWFjaChmdW5jdGlvbihzZW5kZXIpIHtcclxuICAgICAgICBpZiAoc2VuZGVyLnRyYWNrICYmIHN0cmVhbS5nZXRUcmFja3MoKS5pbmRleE9mKHNlbmRlci50cmFjaykgIT09IC0xKSB7XHJcbiAgICAgICAgICBwYy5yZW1vdmVUcmFjayhzZW5kZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG4gIH1cclxufTtcclxuXHJcbn0se1wiLi4vdXRpbHNcIjoxMyxcIi4vZ2V0dXNlcm1lZGlhXCI6MTF9XSwxMTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcbi8qXHJcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXHJcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcclxuICogIHRyZWUuXHJcbiAqL1xyXG4gLyogZXNsaW50LWVudiBub2RlICovXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XHJcbnZhciBsb2dnaW5nID0gdXRpbHMubG9nO1xyXG5cclxuLy8gRXhwb3NlIHB1YmxpYyBtZXRob2RzLlxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gIHZhciBicm93c2VyRGV0YWlscyA9IHV0aWxzLmRldGVjdEJyb3dzZXIod2luZG93KTtcclxuICB2YXIgbmF2aWdhdG9yID0gd2luZG93ICYmIHdpbmRvdy5uYXZpZ2F0b3I7XHJcbiAgdmFyIE1lZGlhU3RyZWFtVHJhY2sgPSB3aW5kb3cgJiYgd2luZG93Lk1lZGlhU3RyZWFtVHJhY2s7XHJcblxyXG4gIHZhciBzaGltRXJyb3JfID0gZnVuY3Rpb24oZSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmFtZToge1xyXG4gICAgICAgIEludGVybmFsRXJyb3I6ICdOb3RSZWFkYWJsZUVycm9yJyxcclxuICAgICAgICBOb3RTdXBwb3J0ZWRFcnJvcjogJ1R5cGVFcnJvcicsXHJcbiAgICAgICAgUGVybWlzc2lvbkRlbmllZEVycm9yOiAnTm90QWxsb3dlZEVycm9yJyxcclxuICAgICAgICBTZWN1cml0eUVycm9yOiAnTm90QWxsb3dlZEVycm9yJ1xyXG4gICAgICB9W2UubmFtZV0gfHwgZS5uYW1lLFxyXG4gICAgICBtZXNzYWdlOiB7XHJcbiAgICAgICAgJ1RoZSBvcGVyYXRpb24gaXMgaW5zZWN1cmUuJzogJ1RoZSByZXF1ZXN0IGlzIG5vdCBhbGxvd2VkIGJ5IHRoZSAnICtcclxuICAgICAgICAndXNlciBhZ2VudCBvciB0aGUgcGxhdGZvcm0gaW4gdGhlIGN1cnJlbnQgY29udGV4dC4nXHJcbiAgICAgIH1bZS5tZXNzYWdlXSB8fCBlLm1lc3NhZ2UsXHJcbiAgICAgIGNvbnN0cmFpbnQ6IGUuY29uc3RyYWludCxcclxuICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5hbWUgKyAodGhpcy5tZXNzYWdlICYmICc6ICcpICsgdGhpcy5tZXNzYWdlO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH07XHJcblxyXG4gIC8vIGdldFVzZXJNZWRpYSBjb25zdHJhaW50cyBzaGltLlxyXG4gIHZhciBnZXRVc2VyTWVkaWFfID0gZnVuY3Rpb24oY29uc3RyYWludHMsIG9uU3VjY2Vzcywgb25FcnJvcikge1xyXG4gICAgdmFyIGNvbnN0cmFpbnRzVG9GRjM3XyA9IGZ1bmN0aW9uKGMpIHtcclxuICAgICAgaWYgKHR5cGVvZiBjICE9PSAnb2JqZWN0JyB8fCBjLnJlcXVpcmUpIHtcclxuICAgICAgICByZXR1cm4gYztcclxuICAgICAgfVxyXG4gICAgICB2YXIgcmVxdWlyZSA9IFtdO1xyXG4gICAgICBPYmplY3Qua2V5cyhjKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgIGlmIChrZXkgPT09ICdyZXF1aXJlJyB8fCBrZXkgPT09ICdhZHZhbmNlZCcgfHwga2V5ID09PSAnbWVkaWFTb3VyY2UnKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByID0gY1trZXldID0gKHR5cGVvZiBjW2tleV0gPT09ICdvYmplY3QnKSA/XHJcbiAgICAgICAgICAgIGNba2V5XSA6IHtpZGVhbDogY1trZXldfTtcclxuICAgICAgICBpZiAoci5taW4gIT09IHVuZGVmaW5lZCB8fFxyXG4gICAgICAgICAgICByLm1heCAhPT0gdW5kZWZpbmVkIHx8IHIuZXhhY3QgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgcmVxdWlyZS5wdXNoKGtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyLmV4YWN0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIGlmICh0eXBlb2Ygci5leGFjdCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgci4gbWluID0gci5tYXggPSByLmV4YWN0O1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY1trZXldID0gci5leGFjdDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGRlbGV0ZSByLmV4YWN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoci5pZGVhbCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBjLmFkdmFuY2VkID0gYy5hZHZhbmNlZCB8fCBbXTtcclxuICAgICAgICAgIHZhciBvYyA9IHt9O1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiByLmlkZWFsID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICBvY1trZXldID0ge21pbjogci5pZGVhbCwgbWF4OiByLmlkZWFsfTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG9jW2tleV0gPSByLmlkZWFsO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgYy5hZHZhbmNlZC5wdXNoKG9jKTtcclxuICAgICAgICAgIGRlbGV0ZSByLmlkZWFsO1xyXG4gICAgICAgICAgaWYgKCFPYmplY3Qua2V5cyhyKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgZGVsZXRlIGNba2V5XTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAocmVxdWlyZS5sZW5ndGgpIHtcclxuICAgICAgICBjLnJlcXVpcmUgPSByZXF1aXJlO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBjO1xyXG4gICAgfTtcclxuICAgIGNvbnN0cmFpbnRzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShjb25zdHJhaW50cykpO1xyXG4gICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCAzOCkge1xyXG4gICAgICBsb2dnaW5nKCdzcGVjOiAnICsgSlNPTi5zdHJpbmdpZnkoY29uc3RyYWludHMpKTtcclxuICAgICAgaWYgKGNvbnN0cmFpbnRzLmF1ZGlvKSB7XHJcbiAgICAgICAgY29uc3RyYWludHMuYXVkaW8gPSBjb25zdHJhaW50c1RvRkYzN18oY29uc3RyYWludHMuYXVkaW8pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjb25zdHJhaW50cy52aWRlbykge1xyXG4gICAgICAgIGNvbnN0cmFpbnRzLnZpZGVvID0gY29uc3RyYWludHNUb0ZGMzdfKGNvbnN0cmFpbnRzLnZpZGVvKTtcclxuICAgICAgfVxyXG4gICAgICBsb2dnaW5nKCdmZjM3OiAnICsgSlNPTi5zdHJpbmdpZnkoY29uc3RyYWludHMpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBuYXZpZ2F0b3IubW96R2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzLCBvblN1Y2Nlc3MsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgb25FcnJvcihzaGltRXJyb3JfKGUpKTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIC8vIFJldHVybnMgdGhlIHJlc3VsdCBvZiBnZXRVc2VyTWVkaWEgYXMgYSBQcm9taXNlLlxyXG4gIHZhciBnZXRVc2VyTWVkaWFQcm9taXNlXyA9IGZ1bmN0aW9uKGNvbnN0cmFpbnRzKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgIGdldFVzZXJNZWRpYV8oY29uc3RyYWludHMsIHJlc29sdmUsIHJlamVjdCk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICAvLyBTaGltIGZvciBtZWRpYURldmljZXMgb24gb2xkZXIgdmVyc2lvbnMuXHJcbiAgaWYgKCFuYXZpZ2F0b3IubWVkaWFEZXZpY2VzKSB7XHJcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzID0ge2dldFVzZXJNZWRpYTogZ2V0VXNlck1lZGlhUHJvbWlzZV8sXHJcbiAgICAgIGFkZEV2ZW50TGlzdGVuZXI6IGZ1bmN0aW9uKCkgeyB9LFxyXG4gICAgICByZW1vdmVFdmVudExpc3RlbmVyOiBmdW5jdGlvbigpIHsgfVxyXG4gICAgfTtcclxuICB9XHJcbiAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzID1cclxuICAgICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzIHx8IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XHJcbiAgICAgICAgICB2YXIgaW5mb3MgPSBbXHJcbiAgICAgICAgICAgIHtraW5kOiAnYXVkaW9pbnB1dCcsIGRldmljZUlkOiAnZGVmYXVsdCcsIGxhYmVsOiAnJywgZ3JvdXBJZDogJyd9LFxyXG4gICAgICAgICAgICB7a2luZDogJ3ZpZGVvaW5wdXQnLCBkZXZpY2VJZDogJ2RlZmF1bHQnLCBsYWJlbDogJycsIGdyb3VwSWQ6ICcnfVxyXG4gICAgICAgICAgXTtcclxuICAgICAgICAgIHJlc29sdmUoaW5mb3MpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9O1xyXG5cclxuICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDQxKSB7XHJcbiAgICAvLyBXb3JrIGFyb3VuZCBodHRwOi8vYnVnemlsLmxhLzExNjk2NjVcclxuICAgIHZhciBvcmdFbnVtZXJhdGVEZXZpY2VzID1cclxuICAgICAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmVudW1lcmF0ZURldmljZXMuYmluZChuYXZpZ2F0b3IubWVkaWFEZXZpY2VzKTtcclxuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gb3JnRW51bWVyYXRlRGV2aWNlcygpLnRoZW4odW5kZWZpbmVkLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWYgKGUubmFtZSA9PT0gJ05vdEZvdW5kRXJyb3InKSB7XHJcbiAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRocm93IGU7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuICB9XHJcbiAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCA0OSkge1xyXG4gICAgdmFyIG9yaWdHZXRVc2VyTWVkaWEgPSBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYS5cclxuICAgICAgICBiaW5kKG5hdmlnYXRvci5tZWRpYURldmljZXMpO1xyXG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEgPSBmdW5jdGlvbihjKSB7XHJcbiAgICAgIHJldHVybiBvcmlnR2V0VXNlck1lZGlhKGMpLnRoZW4oZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICAgICAgLy8gV29yayBhcm91bmQgaHR0cHM6Ly9idWd6aWwubGEvODAyMzI2XHJcbiAgICAgICAgaWYgKGMuYXVkaW8gJiYgIXN0cmVhbS5nZXRBdWRpb1RyYWNrcygpLmxlbmd0aCB8fFxyXG4gICAgICAgICAgICBjLnZpZGVvICYmICFzdHJlYW0uZ2V0VmlkZW9UcmFja3MoKS5sZW5ndGgpIHtcclxuICAgICAgICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XHJcbiAgICAgICAgICAgIHRyYWNrLnN0b3AoKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbignVGhlIG9iamVjdCBjYW4gbm90IGJlIGZvdW5kIGhlcmUuJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ05vdEZvdW5kRXJyb3InKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0cmVhbTtcclxuICAgICAgfSwgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChzaGltRXJyb3JfKGUpKTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG4gIH1cclxuICBpZiAoIShicm93c2VyRGV0YWlscy52ZXJzaW9uID4gNTUgJiZcclxuICAgICAgJ2F1dG9HYWluQ29udHJvbCcgaW4gbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRTdXBwb3J0ZWRDb25zdHJhaW50cygpKSkge1xyXG4gICAgdmFyIHJlbWFwID0gZnVuY3Rpb24ob2JqLCBhLCBiKSB7XHJcbiAgICAgIGlmIChhIGluIG9iaiAmJiAhKGIgaW4gb2JqKSkge1xyXG4gICAgICAgIG9ialtiXSA9IG9ialthXTtcclxuICAgICAgICBkZWxldGUgb2JqW2FdO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBuYXRpdmVHZXRVc2VyTWVkaWEgPSBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYS5cclxuICAgICAgICBiaW5kKG5hdmlnYXRvci5tZWRpYURldmljZXMpO1xyXG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEgPSBmdW5jdGlvbihjKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgYyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIGMuYXVkaW8gPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgYyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYykpO1xyXG4gICAgICAgIHJlbWFwKGMuYXVkaW8sICdhdXRvR2FpbkNvbnRyb2wnLCAnbW96QXV0b0dhaW5Db250cm9sJyk7XHJcbiAgICAgICAgcmVtYXAoYy5hdWRpbywgJ25vaXNlU3VwcHJlc3Npb24nLCAnbW96Tm9pc2VTdXBwcmVzc2lvbicpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBuYXRpdmVHZXRVc2VyTWVkaWEoYyk7XHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChNZWRpYVN0cmVhbVRyYWNrICYmIE1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLmdldFNldHRpbmdzKSB7XHJcbiAgICAgIHZhciBuYXRpdmVHZXRTZXR0aW5ncyA9IE1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLmdldFNldHRpbmdzO1xyXG4gICAgICBNZWRpYVN0cmVhbVRyYWNrLnByb3RvdHlwZS5nZXRTZXR0aW5ncyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBvYmogPSBuYXRpdmVHZXRTZXR0aW5ncy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgIHJlbWFwKG9iaiwgJ21vekF1dG9HYWluQ29udHJvbCcsICdhdXRvR2FpbkNvbnRyb2wnKTtcclxuICAgICAgICByZW1hcChvYmosICdtb3pOb2lzZVN1cHByZXNzaW9uJywgJ25vaXNlU3VwcHJlc3Npb24nKTtcclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChNZWRpYVN0cmVhbVRyYWNrICYmIE1lZGlhU3RyZWFtVHJhY2sucHJvdG90eXBlLmFwcGx5Q29uc3RyYWludHMpIHtcclxuICAgICAgdmFyIG5hdGl2ZUFwcGx5Q29uc3RyYWludHMgPSBNZWRpYVN0cmVhbVRyYWNrLnByb3RvdHlwZS5hcHBseUNvbnN0cmFpbnRzO1xyXG4gICAgICBNZWRpYVN0cmVhbVRyYWNrLnByb3RvdHlwZS5hcHBseUNvbnN0cmFpbnRzID0gZnVuY3Rpb24oYykge1xyXG4gICAgICAgIGlmICh0aGlzLmtpbmQgPT09ICdhdWRpbycgJiYgdHlwZW9mIGMgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICBjID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShjKSk7XHJcbiAgICAgICAgICByZW1hcChjLCAnYXV0b0dhaW5Db250cm9sJywgJ21vekF1dG9HYWluQ29udHJvbCcpO1xyXG4gICAgICAgICAgcmVtYXAoYywgJ25vaXNlU3VwcHJlc3Npb24nLCAnbW96Tm9pc2VTdXBwcmVzc2lvbicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmF0aXZlQXBwbHlDb25zdHJhaW50cy5hcHBseSh0aGlzLCBbY10pO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH1cclxuICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhID0gZnVuY3Rpb24oY29uc3RyYWludHMsIG9uU3VjY2Vzcywgb25FcnJvcikge1xyXG4gICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCA0NCkge1xyXG4gICAgICByZXR1cm4gZ2V0VXNlck1lZGlhXyhjb25zdHJhaW50cywgb25TdWNjZXNzLCBvbkVycm9yKTtcclxuICAgIH1cclxuICAgIC8vIFJlcGxhY2UgRmlyZWZveCA0NCsncyBkZXByZWNhdGlvbiB3YXJuaW5nIHdpdGggdW5wcmVmaXhlZCB2ZXJzaW9uLlxyXG4gICAgdXRpbHMuZGVwcmVjYXRlZCgnbmF2aWdhdG9yLmdldFVzZXJNZWRpYScsXHJcbiAgICAgICAgJ25hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhJyk7XHJcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYShjb25zdHJhaW50cykudGhlbihvblN1Y2Nlc3MsIG9uRXJyb3IpO1xyXG4gIH07XHJcbn07XHJcblxyXG59LHtcIi4uL3V0aWxzXCI6MTN9XSwxMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcbi8qXHJcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXHJcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcclxuICogIHRyZWUuXHJcbiAqL1xyXG4ndXNlIHN0cmljdCc7XHJcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBzaGltTG9jYWxTdHJlYW1zQVBJOiBmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAnb2JqZWN0JyB8fCAhd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICghKCdnZXRMb2NhbFN0cmVhbXMnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XHJcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0TG9jYWxTdHJlYW1zID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9sb2NhbFN0cmVhbXMpIHtcclxuICAgICAgICAgIHRoaXMuX2xvY2FsU3RyZWFtcyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxTdHJlYW1zO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgaWYgKCEoJ2dldFN0cmVhbUJ5SWQnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XHJcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U3RyZWFtQnlJZCA9IGZ1bmN0aW9uKGlkKSB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IG51bGw7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xvY2FsU3RyZWFtcykge1xyXG4gICAgICAgICAgdGhpcy5fbG9jYWxTdHJlYW1zLmZvckVhY2goZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICAgICAgICAgIGlmIChzdHJlYW0uaWQgPT09IGlkKSB7XHJcbiAgICAgICAgICAgICAgcmVzdWx0ID0gc3RyZWFtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX3JlbW90ZVN0cmVhbXMpIHtcclxuICAgICAgICAgIHRoaXMuX3JlbW90ZVN0cmVhbXMuZm9yRWFjaChmdW5jdGlvbihzdHJlYW0pIHtcclxuICAgICAgICAgICAgaWYgKHN0cmVhbS5pZCA9PT0gaWQpIHtcclxuICAgICAgICAgICAgICByZXN1bHQgPSBzdHJlYW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgaWYgKCEoJ2FkZFN0cmVhbScgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkpIHtcclxuICAgICAgdmFyIF9hZGRUcmFjayA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2s7XHJcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9sb2NhbFN0cmVhbXMpIHtcclxuICAgICAgICAgIHRoaXMuX2xvY2FsU3RyZWFtcyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fbG9jYWxTdHJlYW1zLmluZGV4T2Yoc3RyZWFtKSA9PT0gLTEpIHtcclxuICAgICAgICAgIHRoaXMuX2xvY2FsU3RyZWFtcy5wdXNoKHN0cmVhbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcclxuICAgICAgICAgIF9hZGRUcmFjay5jYWxsKHBjLCB0cmFjaywgc3RyZWFtKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2sgPSBmdW5jdGlvbih0cmFjaywgc3RyZWFtKSB7XHJcbiAgICAgICAgaWYgKHN0cmVhbSkge1xyXG4gICAgICAgICAgaWYgKCF0aGlzLl9sb2NhbFN0cmVhbXMpIHtcclxuICAgICAgICAgICAgdGhpcy5fbG9jYWxTdHJlYW1zID0gW3N0cmVhbV07XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2xvY2FsU3RyZWFtcy5pbmRleE9mKHN0cmVhbSkgPT09IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvY2FsU3RyZWFtcy5wdXNoKHN0cmVhbSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBfYWRkVHJhY2suY2FsbCh0aGlzLCB0cmFjaywgc3RyZWFtKTtcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIGlmICghKCdyZW1vdmVTdHJlYW0nIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XHJcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9sb2NhbFN0cmVhbXMpIHtcclxuICAgICAgICAgIHRoaXMuX2xvY2FsU3RyZWFtcyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLl9sb2NhbFN0cmVhbXMuaW5kZXhPZihzdHJlYW0pO1xyXG4gICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbG9jYWxTdHJlYW1zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgICB2YXIgdHJhY2tzID0gc3RyZWFtLmdldFRyYWNrcygpO1xyXG4gICAgICAgIHRoaXMuZ2V0U2VuZGVycygpLmZvckVhY2goZnVuY3Rpb24oc2VuZGVyKSB7XHJcbiAgICAgICAgICBpZiAodHJhY2tzLmluZGV4T2Yoc2VuZGVyLnRyYWNrKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgcGMucmVtb3ZlVHJhY2soc2VuZGVyKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfTtcclxuICAgIH1cclxuICB9LFxyXG4gIHNoaW1SZW1vdGVTdHJlYW1zQVBJOiBmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAnb2JqZWN0JyB8fCAhd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICghKCdnZXRSZW1vdGVTdHJlYW1zJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xyXG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFJlbW90ZVN0cmVhbXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVtb3RlU3RyZWFtcyA/IHRoaXMuX3JlbW90ZVN0cmVhbXMgOiBbXTtcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIGlmICghKCdvbmFkZHN0cmVhbScgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkpIHtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUsICdvbmFkZHN0cmVhbScsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuX29uYWRkc3RyZWFtO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbihmKSB7XHJcbiAgICAgICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICAgICAgaWYgKHRoaXMuX29uYWRkc3RyZWFtKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWRkc3RyZWFtJywgdGhpcy5fb25hZGRzdHJlYW0pO1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYWNrJywgdGhpcy5fb25hZGRzdHJlYW1wb2x5KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcignYWRkc3RyZWFtJywgdGhpcy5fb25hZGRzdHJlYW0gPSBmKTtcclxuICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigndHJhY2snLCB0aGlzLl9vbmFkZHN0cmVhbXBvbHkgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUuc3RyZWFtcy5mb3JFYWNoKGZ1bmN0aW9uKHN0cmVhbSkge1xyXG4gICAgICAgICAgICAgIGlmICghcGMuX3JlbW90ZVN0cmVhbXMpIHtcclxuICAgICAgICAgICAgICAgIHBjLl9yZW1vdGVTdHJlYW1zID0gW107XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGlmIChwYy5fcmVtb3RlU3RyZWFtcy5pbmRleE9mKHN0cmVhbSkgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBwYy5fcmVtb3RlU3RyZWFtcy5wdXNoKHN0cmVhbSk7XHJcbiAgICAgICAgICAgICAgdmFyIGV2ZW50ID0gbmV3IEV2ZW50KCdhZGRzdHJlYW0nKTtcclxuICAgICAgICAgICAgICBldmVudC5zdHJlYW0gPSBzdHJlYW07XHJcbiAgICAgICAgICAgICAgcGMuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIHNoaW1DYWxsYmFja3NBUEk6IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICdvYmplY3QnIHx8ICF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdmFyIHByb3RvdHlwZSA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGU7XHJcbiAgICB2YXIgY3JlYXRlT2ZmZXIgPSBwcm90b3R5cGUuY3JlYXRlT2ZmZXI7XHJcbiAgICB2YXIgY3JlYXRlQW5zd2VyID0gcHJvdG90eXBlLmNyZWF0ZUFuc3dlcjtcclxuICAgIHZhciBzZXRMb2NhbERlc2NyaXB0aW9uID0gcHJvdG90eXBlLnNldExvY2FsRGVzY3JpcHRpb247XHJcbiAgICB2YXIgc2V0UmVtb3RlRGVzY3JpcHRpb24gPSBwcm90b3R5cGUuc2V0UmVtb3RlRGVzY3JpcHRpb247XHJcbiAgICB2YXIgYWRkSWNlQ2FuZGlkYXRlID0gcHJvdG90eXBlLmFkZEljZUNhbmRpZGF0ZTtcclxuXHJcbiAgICBwcm90b3R5cGUuY3JlYXRlT2ZmZXIgPSBmdW5jdGlvbihzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjaykge1xyXG4gICAgICB2YXIgb3B0aW9ucyA9IChhcmd1bWVudHMubGVuZ3RoID49IDIpID8gYXJndW1lbnRzWzJdIDogYXJndW1lbnRzWzBdO1xyXG4gICAgICB2YXIgcHJvbWlzZSA9IGNyZWF0ZU9mZmVyLmFwcGx5KHRoaXMsIFtvcHRpb25zXSk7XHJcbiAgICAgIGlmICghZmFpbHVyZUNhbGxiYWNrKSB7XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICAgIH1cclxuICAgICAgcHJvbWlzZS50aGVuKHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKTtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcm90b3R5cGUuY3JlYXRlQW5zd2VyID0gZnVuY3Rpb24oc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spIHtcclxuICAgICAgdmFyIG9wdGlvbnMgPSAoYXJndW1lbnRzLmxlbmd0aCA+PSAyKSA/IGFyZ3VtZW50c1syXSA6IGFyZ3VtZW50c1swXTtcclxuICAgICAgdmFyIHByb21pc2UgPSBjcmVhdGVBbnN3ZXIuYXBwbHkodGhpcywgW29wdGlvbnNdKTtcclxuICAgICAgaWYgKCFmYWlsdXJlQ2FsbGJhY2spIHtcclxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgICAgfVxyXG4gICAgICBwcm9taXNlLnRoZW4oc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spO1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciB3aXRoQ2FsbGJhY2sgPSBmdW5jdGlvbihkZXNjcmlwdGlvbiwgc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spIHtcclxuICAgICAgdmFyIHByb21pc2UgPSBzZXRMb2NhbERlc2NyaXB0aW9uLmFwcGx5KHRoaXMsIFtkZXNjcmlwdGlvbl0pO1xyXG4gICAgICBpZiAoIWZhaWx1cmVDYWxsYmFjaykge1xyXG4gICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgICB9XHJcbiAgICAgIHByb21pc2UudGhlbihzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjayk7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgIH07XHJcbiAgICBwcm90b3R5cGUuc2V0TG9jYWxEZXNjcmlwdGlvbiA9IHdpdGhDYWxsYmFjaztcclxuXHJcbiAgICB3aXRoQ2FsbGJhY2sgPSBmdW5jdGlvbihkZXNjcmlwdGlvbiwgc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spIHtcclxuICAgICAgdmFyIHByb21pc2UgPSBzZXRSZW1vdGVEZXNjcmlwdGlvbi5hcHBseSh0aGlzLCBbZGVzY3JpcHRpb25dKTtcclxuICAgICAgaWYgKCFmYWlsdXJlQ2FsbGJhY2spIHtcclxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgICAgfVxyXG4gICAgICBwcm9taXNlLnRoZW4oc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spO1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICB9O1xyXG4gICAgcHJvdG90eXBlLnNldFJlbW90ZURlc2NyaXB0aW9uID0gd2l0aENhbGxiYWNrO1xyXG5cclxuICAgIHdpdGhDYWxsYmFjayA9IGZ1bmN0aW9uKGNhbmRpZGF0ZSwgc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spIHtcclxuICAgICAgdmFyIHByb21pc2UgPSBhZGRJY2VDYW5kaWRhdGUuYXBwbHkodGhpcywgW2NhbmRpZGF0ZV0pO1xyXG4gICAgICBpZiAoIWZhaWx1cmVDYWxsYmFjaykge1xyXG4gICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgICB9XHJcbiAgICAgIHByb21pc2UudGhlbihzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjayk7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgIH07XHJcbiAgICBwcm90b3R5cGUuYWRkSWNlQ2FuZGlkYXRlID0gd2l0aENhbGxiYWNrO1xyXG4gIH0sXHJcbiAgc2hpbUdldFVzZXJNZWRpYTogZnVuY3Rpb24od2luZG93KSB7XHJcbiAgICB2YXIgbmF2aWdhdG9yID0gd2luZG93ICYmIHdpbmRvdy5uYXZpZ2F0b3I7XHJcblxyXG4gICAgaWYgKCFuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhKSB7XHJcbiAgICAgIGlmIChuYXZpZ2F0b3Iud2Via2l0R2V0VXNlck1lZGlhKSB7XHJcbiAgICAgICAgbmF2aWdhdG9yLmdldFVzZXJNZWRpYSA9IG5hdmlnYXRvci53ZWJraXRHZXRVc2VyTWVkaWEuYmluZChuYXZpZ2F0b3IpO1xyXG4gICAgICB9IGVsc2UgaWYgKG5hdmlnYXRvci5tZWRpYURldmljZXMgJiZcclxuICAgICAgICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKSB7XHJcbiAgICAgICAgbmF2aWdhdG9yLmdldFVzZXJNZWRpYSA9IGZ1bmN0aW9uKGNvbnN0cmFpbnRzLCBjYiwgZXJyY2IpIHtcclxuICAgICAgICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzKVxyXG4gICAgICAgICAgLnRoZW4oY2IsIGVycmNiKTtcclxuICAgICAgICB9LmJpbmQobmF2aWdhdG9yKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2hpbVJUQ0ljZVNlcnZlclVybHM6IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgLy8gbWlncmF0ZSBmcm9tIG5vbi1zcGVjIFJUQ0ljZVNlcnZlci51cmwgdG8gUlRDSWNlU2VydmVyLnVybHNcclxuICAgIHZhciBPcmlnUGVlckNvbm5lY3Rpb24gPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb247XHJcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gPSBmdW5jdGlvbihwY0NvbmZpZywgcGNDb25zdHJhaW50cykge1xyXG4gICAgICBpZiAocGNDb25maWcgJiYgcGNDb25maWcuaWNlU2VydmVycykge1xyXG4gICAgICAgIHZhciBuZXdJY2VTZXJ2ZXJzID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwY0NvbmZpZy5pY2VTZXJ2ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICB2YXIgc2VydmVyID0gcGNDb25maWcuaWNlU2VydmVyc1tpXTtcclxuICAgICAgICAgIGlmICghc2VydmVyLmhhc093blByb3BlcnR5KCd1cmxzJykgJiZcclxuICAgICAgICAgICAgICBzZXJ2ZXIuaGFzT3duUHJvcGVydHkoJ3VybCcpKSB7XHJcbiAgICAgICAgICAgIHV0aWxzLmRlcHJlY2F0ZWQoJ1JUQ0ljZVNlcnZlci51cmwnLCAnUlRDSWNlU2VydmVyLnVybHMnKTtcclxuICAgICAgICAgICAgc2VydmVyID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShzZXJ2ZXIpKTtcclxuICAgICAgICAgICAgc2VydmVyLnVybHMgPSBzZXJ2ZXIudXJsO1xyXG4gICAgICAgICAgICBkZWxldGUgc2VydmVyLnVybDtcclxuICAgICAgICAgICAgbmV3SWNlU2VydmVycy5wdXNoKHNlcnZlcik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBuZXdJY2VTZXJ2ZXJzLnB1c2gocGNDb25maWcuaWNlU2VydmVyc1tpXSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBjQ29uZmlnLmljZVNlcnZlcnMgPSBuZXdJY2VTZXJ2ZXJzO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBuZXcgT3JpZ1BlZXJDb25uZWN0aW9uKHBjQ29uZmlnLCBwY0NvbnN0cmFpbnRzKTtcclxuICAgIH07XHJcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlID0gT3JpZ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZTtcclxuICAgIC8vIHdyYXAgc3RhdGljIG1ldGhvZHMuIEN1cnJlbnRseSBqdXN0IGdlbmVyYXRlQ2VydGlmaWNhdGUuXHJcbiAgICBpZiAoJ2dlbmVyYXRlQ2VydGlmaWNhdGUnIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbikge1xyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLCAnZ2VuZXJhdGVDZXJ0aWZpY2F0ZScsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmV0dXJuIE9yaWdQZWVyQ29ubmVjdGlvbi5nZW5lcmF0ZUNlcnRpZmljYXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBzaGltVHJhY2tFdmVudFRyYW5zY2VpdmVyOiBmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIC8vIEFkZCBldmVudC50cmFuc2NlaXZlciBtZW1iZXIgb3ZlciBkZXByZWNhdGVkIGV2ZW50LnJlY2VpdmVyXHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uICYmXHJcbiAgICAgICAgKCdyZWNlaXZlcicgaW4gd2luZG93LlJUQ1RyYWNrRXZlbnQucHJvdG90eXBlKSAmJlxyXG4gICAgICAgIC8vIGNhbid0IGNoZWNrICd0cmFuc2NlaXZlcicgaW4gd2luZG93LlJUQ1RyYWNrRXZlbnQucHJvdG90eXBlLCBhcyBpdCBpc1xyXG4gICAgICAgIC8vIGRlZmluZWQgZm9yIHNvbWUgcmVhc29uIGV2ZW4gd2hlbiB3aW5kb3cuUlRDVHJhbnNjZWl2ZXIgaXMgbm90LlxyXG4gICAgICAgICF3aW5kb3cuUlRDVHJhbnNjZWl2ZXIpIHtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENUcmFja0V2ZW50LnByb3RvdHlwZSwgJ3RyYW5zY2VpdmVyJywge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZXR1cm4ge3JlY2VpdmVyOiB0aGlzLnJlY2VpdmVyfTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHNoaW1DcmVhdGVPZmZlckxlZ2FjeTogZnVuY3Rpb24od2luZG93KSB7XHJcbiAgICB2YXIgb3JpZ0NyZWF0ZU9mZmVyID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5jcmVhdGVPZmZlcjtcclxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlT2ZmZXIgPSBmdW5jdGlvbihvZmZlck9wdGlvbnMpIHtcclxuICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgaWYgKG9mZmVyT3B0aW9ucykge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW8gIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAvLyBzdXBwb3J0IGJpdCB2YWx1ZXNcclxuICAgICAgICAgIG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZUF1ZGlvID0gISFvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbztcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGF1ZGlvVHJhbnNjZWl2ZXIgPSBwYy5nZXRUcmFuc2NlaXZlcnMoKS5maW5kKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJhbnNjZWl2ZXIuc2VuZGVyLnRyYWNrICYmXHJcbiAgICAgICAgICAgICAgdHJhbnNjZWl2ZXIuc2VuZGVyLnRyYWNrLmtpbmQgPT09ICdhdWRpbyc7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZUF1ZGlvID09PSBmYWxzZSAmJiBhdWRpb1RyYW5zY2VpdmVyKSB7XHJcbiAgICAgICAgICBpZiAoYXVkaW9UcmFuc2NlaXZlci5kaXJlY3Rpb24gPT09ICdzZW5kcmVjdicpIHtcclxuICAgICAgICAgICAgaWYgKGF1ZGlvVHJhbnNjZWl2ZXIuc2V0RGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgYXVkaW9UcmFuc2NlaXZlci5zZXREaXJlY3Rpb24oJ3NlbmRvbmx5Jyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgYXVkaW9UcmFuc2NlaXZlci5kaXJlY3Rpb24gPSAnc2VuZG9ubHknO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGF1ZGlvVHJhbnNjZWl2ZXIuZGlyZWN0aW9uID09PSAncmVjdm9ubHknKSB7XHJcbiAgICAgICAgICAgIGlmIChhdWRpb1RyYW5zY2VpdmVyLnNldERpcmVjdGlvbikge1xyXG4gICAgICAgICAgICAgIGF1ZGlvVHJhbnNjZWl2ZXIuc2V0RGlyZWN0aW9uKCdpbmFjdGl2ZScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGF1ZGlvVHJhbnNjZWl2ZXIuZGlyZWN0aW9uID0gJ2luYWN0aXZlJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW8gPT09IHRydWUgJiZcclxuICAgICAgICAgICAgIWF1ZGlvVHJhbnNjZWl2ZXIpIHtcclxuICAgICAgICAgIHBjLmFkZFRyYW5zY2VpdmVyKCdhdWRpbycpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygb2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW8gIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAvLyBzdXBwb3J0IGJpdCB2YWx1ZXNcclxuICAgICAgICAgIG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvID0gISFvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVWaWRlbztcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHZpZGVvVHJhbnNjZWl2ZXIgPSBwYy5nZXRUcmFuc2NlaXZlcnMoKS5maW5kKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJhbnNjZWl2ZXIuc2VuZGVyLnRyYWNrICYmXHJcbiAgICAgICAgICAgICAgdHJhbnNjZWl2ZXIuc2VuZGVyLnRyYWNrLmtpbmQgPT09ICd2aWRlbyc7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvID09PSBmYWxzZSAmJiB2aWRlb1RyYW5zY2VpdmVyKSB7XHJcbiAgICAgICAgICBpZiAodmlkZW9UcmFuc2NlaXZlci5kaXJlY3Rpb24gPT09ICdzZW5kcmVjdicpIHtcclxuICAgICAgICAgICAgdmlkZW9UcmFuc2NlaXZlci5zZXREaXJlY3Rpb24oJ3NlbmRvbmx5Jyk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHZpZGVvVHJhbnNjZWl2ZXIuZGlyZWN0aW9uID09PSAncmVjdm9ubHknKSB7XHJcbiAgICAgICAgICAgIHZpZGVvVHJhbnNjZWl2ZXIuc2V0RGlyZWN0aW9uKCdpbmFjdGl2ZScpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlVmlkZW8gPT09IHRydWUgJiZcclxuICAgICAgICAgICAgIXZpZGVvVHJhbnNjZWl2ZXIpIHtcclxuICAgICAgICAgIHBjLmFkZFRyYW5zY2VpdmVyKCd2aWRlbycpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gb3JpZ0NyZWF0ZU9mZmVyLmFwcGx5KHBjLCBhcmd1bWVudHMpO1xyXG4gICAgfTtcclxuICB9XHJcbn07XHJcblxyXG59LHtcIi4uL3V0aWxzXCI6MTN9XSwxMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcbi8qXHJcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXHJcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcclxuICogIHRyZWUuXHJcbiAqL1xyXG4gLyogZXNsaW50LWVudiBub2RlICovXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBsb2dEaXNhYmxlZF8gPSB0cnVlO1xyXG52YXIgZGVwcmVjYXRpb25XYXJuaW5nc18gPSB0cnVlO1xyXG5cclxuLyoqXHJcbiAqIEV4dHJhY3QgYnJvd3NlciB2ZXJzaW9uIG91dCBvZiB0aGUgcHJvdmlkZWQgdXNlciBhZ2VudCBzdHJpbmcuXHJcbiAqXHJcbiAqIEBwYXJhbSB7IXN0cmluZ30gdWFzdHJpbmcgdXNlckFnZW50IHN0cmluZy5cclxuICogQHBhcmFtIHshc3RyaW5nfSBleHByIFJlZ3VsYXIgZXhwcmVzc2lvbiB1c2VkIGFzIG1hdGNoIGNyaXRlcmlhLlxyXG4gKiBAcGFyYW0geyFudW1iZXJ9IHBvcyBwb3NpdGlvbiBpbiB0aGUgdmVyc2lvbiBzdHJpbmcgdG8gYmUgcmV0dXJuZWQuXHJcbiAqIEByZXR1cm4geyFudW1iZXJ9IGJyb3dzZXIgdmVyc2lvbi5cclxuICovXHJcbmZ1bmN0aW9uIGV4dHJhY3RWZXJzaW9uKHVhc3RyaW5nLCBleHByLCBwb3MpIHtcclxuICB2YXIgbWF0Y2ggPSB1YXN0cmluZy5tYXRjaChleHByKTtcclxuICByZXR1cm4gbWF0Y2ggJiYgbWF0Y2gubGVuZ3RoID49IHBvcyAmJiBwYXJzZUludChtYXRjaFtwb3NdLCAxMCk7XHJcbn1cclxuXHJcbi8vIFdyYXBzIHRoZSBwZWVyY29ubmVjdGlvbiBldmVudCBldmVudE5hbWVUb1dyYXAgaW4gYSBmdW5jdGlvblxyXG4vLyB3aGljaCByZXR1cm5zIHRoZSBtb2RpZmllZCBldmVudCBvYmplY3QuXHJcbmZ1bmN0aW9uIHdyYXBQZWVyQ29ubmVjdGlvbkV2ZW50KHdpbmRvdywgZXZlbnROYW1lVG9XcmFwLCB3cmFwcGVyKSB7XHJcbiAgaWYgKCF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24pIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgdmFyIHByb3RvID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZTtcclxuICB2YXIgbmF0aXZlQWRkRXZlbnRMaXN0ZW5lciA9IHByb3RvLmFkZEV2ZW50TGlzdGVuZXI7XHJcbiAgcHJvdG8uYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKG5hdGl2ZUV2ZW50TmFtZSwgY2IpIHtcclxuICAgIGlmIChuYXRpdmVFdmVudE5hbWUgIT09IGV2ZW50TmFtZVRvV3JhcCkge1xyXG4gICAgICByZXR1cm4gbmF0aXZlQWRkRXZlbnRMaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgfVxyXG4gICAgdmFyIHdyYXBwZWRDYWxsYmFjayA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgY2Iod3JhcHBlcihlKSk7XHJcbiAgICB9O1xyXG4gICAgdGhpcy5fZXZlbnRNYXAgPSB0aGlzLl9ldmVudE1hcCB8fCB7fTtcclxuICAgIHRoaXMuX2V2ZW50TWFwW2NiXSA9IHdyYXBwZWRDYWxsYmFjaztcclxuICAgIHJldHVybiBuYXRpdmVBZGRFdmVudExpc3RlbmVyLmFwcGx5KHRoaXMsIFtuYXRpdmVFdmVudE5hbWUsXHJcbiAgICAgIHdyYXBwZWRDYWxsYmFja10pO1xyXG4gIH07XHJcblxyXG4gIHZhciBuYXRpdmVSZW1vdmVFdmVudExpc3RlbmVyID0gcHJvdG8ucmVtb3ZlRXZlbnRMaXN0ZW5lcjtcclxuICBwcm90by5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24obmF0aXZlRXZlbnROYW1lLCBjYikge1xyXG4gICAgaWYgKG5hdGl2ZUV2ZW50TmFtZSAhPT0gZXZlbnROYW1lVG9XcmFwIHx8ICF0aGlzLl9ldmVudE1hcFxyXG4gICAgICAgIHx8ICF0aGlzLl9ldmVudE1hcFtjYl0pIHtcclxuICAgICAgcmV0dXJuIG5hdGl2ZVJlbW92ZUV2ZW50TGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIH1cclxuICAgIHZhciB1bndyYXBwZWRDYiA9IHRoaXMuX2V2ZW50TWFwW2NiXTtcclxuICAgIGRlbGV0ZSB0aGlzLl9ldmVudE1hcFtjYl07XHJcbiAgICByZXR1cm4gbmF0aXZlUmVtb3ZlRXZlbnRMaXN0ZW5lci5hcHBseSh0aGlzLCBbbmF0aXZlRXZlbnROYW1lLFxyXG4gICAgICB1bndyYXBwZWRDYl0pO1xyXG4gIH07XHJcblxyXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgJ29uJyArIGV2ZW50TmFtZVRvV3JhcCwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIHRoaXNbJ19vbicgKyBldmVudE5hbWVUb1dyYXBdO1xyXG4gICAgfSxcclxuICAgIHNldDogZnVuY3Rpb24oY2IpIHtcclxuICAgICAgaWYgKHRoaXNbJ19vbicgKyBldmVudE5hbWVUb1dyYXBdKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZVRvV3JhcCxcclxuICAgICAgICAgICAgdGhpc1snX29uJyArIGV2ZW50TmFtZVRvV3JhcF0pO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzWydfb24nICsgZXZlbnROYW1lVG9XcmFwXTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY2IpIHtcclxuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lVG9XcmFwLFxyXG4gICAgICAgICAgICB0aGlzWydfb24nICsgZXZlbnROYW1lVG9XcmFwXSA9IGNiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG4vLyBVdGlsaXR5IG1ldGhvZHMuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIGV4dHJhY3RWZXJzaW9uOiBleHRyYWN0VmVyc2lvbixcclxuICB3cmFwUGVlckNvbm5lY3Rpb25FdmVudDogd3JhcFBlZXJDb25uZWN0aW9uRXZlbnQsXHJcbiAgZGlzYWJsZUxvZzogZnVuY3Rpb24oYm9vbCkge1xyXG4gICAgaWYgKHR5cGVvZiBib29sICE9PSAnYm9vbGVhbicpIHtcclxuICAgICAgcmV0dXJuIG5ldyBFcnJvcignQXJndW1lbnQgdHlwZTogJyArIHR5cGVvZiBib29sICtcclxuICAgICAgICAgICcuIFBsZWFzZSB1c2UgYSBib29sZWFuLicpO1xyXG4gICAgfVxyXG4gICAgbG9nRGlzYWJsZWRfID0gYm9vbDtcclxuICAgIHJldHVybiAoYm9vbCkgPyAnYWRhcHRlci5qcyBsb2dnaW5nIGRpc2FibGVkJyA6XHJcbiAgICAgICAgJ2FkYXB0ZXIuanMgbG9nZ2luZyBlbmFibGVkJztcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBEaXNhYmxlIG9yIGVuYWJsZSBkZXByZWNhdGlvbiB3YXJuaW5nc1xyXG4gICAqIEBwYXJhbSB7IWJvb2xlYW59IGJvb2wgc2V0IHRvIHRydWUgdG8gZGlzYWJsZSB3YXJuaW5ncy5cclxuICAgKi9cclxuICBkaXNhYmxlV2FybmluZ3M6IGZ1bmN0aW9uKGJvb2wpIHtcclxuICAgIGlmICh0eXBlb2YgYm9vbCAhPT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoJ0FyZ3VtZW50IHR5cGU6ICcgKyB0eXBlb2YgYm9vbCArXHJcbiAgICAgICAgICAnLiBQbGVhc2UgdXNlIGEgYm9vbGVhbi4nKTtcclxuICAgIH1cclxuICAgIGRlcHJlY2F0aW9uV2FybmluZ3NfID0gIWJvb2w7XHJcbiAgICByZXR1cm4gJ2FkYXB0ZXIuanMgZGVwcmVjYXRpb24gd2FybmluZ3MgJyArIChib29sID8gJ2Rpc2FibGVkJyA6ICdlbmFibGVkJyk7XHJcbiAgfSxcclxuXHJcbiAgbG9nOiBmdW5jdGlvbigpIHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBpZiAobG9nRGlzYWJsZWRfKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGNvbnNvbGUubG9nID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3dzIGEgZGVwcmVjYXRpb24gd2FybmluZyBzdWdnZXN0aW5nIHRoZSBtb2Rlcm4gYW5kIHNwZWMtY29tcGF0aWJsZSBBUEkuXHJcbiAgICovXHJcbiAgZGVwcmVjYXRlZDogZnVuY3Rpb24ob2xkTWV0aG9kLCBuZXdNZXRob2QpIHtcclxuICAgIGlmICghZGVwcmVjYXRpb25XYXJuaW5nc18pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS53YXJuKG9sZE1ldGhvZCArICcgaXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSAnICsgbmV3TWV0aG9kICtcclxuICAgICAgICAnIGluc3RlYWQuJyk7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogQnJvd3NlciBkZXRlY3Rvci5cclxuICAgKlxyXG4gICAqIEByZXR1cm4ge29iamVjdH0gcmVzdWx0IGNvbnRhaW5pbmcgYnJvd3NlciBhbmQgdmVyc2lvblxyXG4gICAqICAgICBwcm9wZXJ0aWVzLlxyXG4gICAqL1xyXG4gIGRldGVjdEJyb3dzZXI6IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgdmFyIG5hdmlnYXRvciA9IHdpbmRvdyAmJiB3aW5kb3cubmF2aWdhdG9yO1xyXG5cclxuICAgIC8vIFJldHVybmVkIHJlc3VsdCBvYmplY3QuXHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICByZXN1bHQuYnJvd3NlciA9IG51bGw7XHJcbiAgICByZXN1bHQudmVyc2lvbiA9IG51bGw7XHJcblxyXG4gICAgLy8gRmFpbCBlYXJseSBpZiBpdCdzIG5vdCBhIGJyb3dzZXJcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyB8fCAhd2luZG93Lm5hdmlnYXRvcikge1xyXG4gICAgICByZXN1bHQuYnJvd3NlciA9ICdOb3QgYSBicm93c2VyLic7XHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG5hdmlnYXRvci5tb3pHZXRVc2VyTWVkaWEpIHsgLy8gRmlyZWZveC5cclxuICAgICAgcmVzdWx0LmJyb3dzZXIgPSAnZmlyZWZveCc7XHJcbiAgICAgIHJlc3VsdC52ZXJzaW9uID0gZXh0cmFjdFZlcnNpb24obmF2aWdhdG9yLnVzZXJBZ2VudCxcclxuICAgICAgICAgIC9GaXJlZm94XFwvKFxcZCspXFwuLywgMSk7XHJcbiAgICB9IGVsc2UgaWYgKG5hdmlnYXRvci53ZWJraXRHZXRVc2VyTWVkaWEpIHtcclxuICAgICAgLy8gQ2hyb21lLCBDaHJvbWl1bSwgV2VidmlldywgT3BlcmEuXHJcbiAgICAgIC8vIFZlcnNpb24gbWF0Y2hlcyBDaHJvbWUvV2ViUlRDIHZlcnNpb24uXHJcbiAgICAgIHJlc3VsdC5icm93c2VyID0gJ2Nocm9tZSc7XHJcbiAgICAgIHJlc3VsdC52ZXJzaW9uID0gZXh0cmFjdFZlcnNpb24obmF2aWdhdG9yLnVzZXJBZ2VudCxcclxuICAgICAgICAgIC9DaHJvbShlfGl1bSlcXC8oXFxkKylcXC4vLCAyKTtcclxuICAgIH0gZWxzZSBpZiAobmF2aWdhdG9yLm1lZGlhRGV2aWNlcyAmJlxyXG4gICAgICAgIG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0VkZ2VcXC8oXFxkKykuKFxcZCspJC8pKSB7IC8vIEVkZ2UuXHJcbiAgICAgIHJlc3VsdC5icm93c2VyID0gJ2VkZ2UnO1xyXG4gICAgICByZXN1bHQudmVyc2lvbiA9IGV4dHJhY3RWZXJzaW9uKG5hdmlnYXRvci51c2VyQWdlbnQsXHJcbiAgICAgICAgICAvRWRnZVxcLyhcXGQrKS4oXFxkKykkLywgMik7XHJcbiAgICB9IGVsc2UgaWYgKHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiAmJlxyXG4gICAgICAgIG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0FwcGxlV2ViS2l0XFwvKFxcZCspXFwuLykpIHsgLy8gU2FmYXJpLlxyXG4gICAgICByZXN1bHQuYnJvd3NlciA9ICdzYWZhcmknO1xyXG4gICAgICByZXN1bHQudmVyc2lvbiA9IGV4dHJhY3RWZXJzaW9uKG5hdmlnYXRvci51c2VyQWdlbnQsXHJcbiAgICAgICAgICAvQXBwbGVXZWJLaXRcXC8oXFxkKylcXC4vLCAxKTtcclxuICAgIH0gZWxzZSB7IC8vIERlZmF1bHQgZmFsbHRocm91Z2g6IG5vdCBzdXBwb3J0ZWQuXHJcbiAgICAgIHJlc3VsdC5icm93c2VyID0gJ05vdCBhIHN1cHBvcnRlZCBicm93c2VyLic7XHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbn07XHJcblxyXG59LHt9XX0se30sWzNdKSgzKVxyXG59KTsiXSwic291cmNlUm9vdCI6IiJ9