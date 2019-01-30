/*! OvenPlayerv0.8.3 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
                        tempError.error = error;
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
                    reject(e);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9XZWJSVEMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FwaS9wcm92aWRlci9odG1sNS9wcm92aWRlcnMvV2ViUlRDTG9hZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlscy9hZGFwdGVyLmpzIl0sIm5hbWVzIjpbIldlYlJUQyIsImNvbnRhaW5lciIsInBsYXllckNvbmZpZyIsInRoYXQiLCJ3ZWJydGNMb2FkZXIiLCJzdXBlckRlc3Ryb3lfZnVuYyIsIm1lZGlhTWFuYWdlciIsIlBST1ZJREVSX1dFQlJUQyIsImVsZW1lbnQiLCJjcmVhdGUiLCJzcGVjIiwibmFtZSIsImV4dGVuZGVkRWxlbWVudCIsImxpc3RlbmVyIiwiY2FuU2VlayIsImlzTGl2ZSIsInNlZWtpbmciLCJzdGF0ZSIsIlNUQVRFX0lETEUiLCJidWZmZXIiLCJmcmFtZXJhdGUiLCJjdXJyZW50UXVhbGl0eSIsImN1cnJlbnRTb3VyY2UiLCJxdWFsaXR5TGV2ZWxzIiwic291cmNlcyIsInNvdXJjZSIsImZpbGUiLCJ0eXBlIiwiT3ZlblBsYXllckNvbnNvbGUiLCJsb2ciLCJkZXN0cm95IiwiZXJyb3JUcmlnZ2VyIiwiY29ubmVjdCIsInRoZW4iLCJzdHJlYW0iLCJzcmNPYmplY3QiLCJwbGF5IiwiZXJyb3IiLCJXZWJSVENMb2FkZXIiLCJwcm92aWRlciIsInVybCIsIndzIiwicGVlckNvbm5lY3Rpb24iLCJzdGF0aXN0aWNzVGltZXIiLCJjb25maWciLCJteVNkcCIsImV4aXN0aW5nSGFuZGxlciIsIndpbmRvdyIsIm9uYmVmb3JldW5sb2FkIiwiZXZlbnQiLCJjbG9zZVBlZXIiLCJpbml0aWFsaXplIiwib25Mb2NhbERlc2NyaXB0aW9uIiwiaWQiLCJjb25uZWN0aW9uIiwiZGVzYyIsInNldExvY2FsRGVzY3JpcHRpb24iLCJsb2NhbFNEUCIsImxvY2FsRGVzY3JpcHRpb24iLCJzZW5kIiwiSlNPTiIsInN0cmluZ2lmeSIsImNvbW1hbmQiLCJzZHAiLCJ0ZW1wRXJyb3IiLCJFUlJPUlMiLCJQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJXZWJTb2NrZXQiLCJvbm9wZW4iLCJvbm1lc3NhZ2UiLCJlIiwibWVzc2FnZSIsInBhcnNlIiwiZGF0YSIsIlBMQVlFUl9XRUJSVENfV1NfRVJST1IiLCJsaXN0IiwiUlRDUGVlckNvbm5lY3Rpb24iLCJvbmljZWNhbmRpZGF0ZSIsImNhbmRpZGF0ZSIsImNhbmRpZGF0ZXMiLCJvbm5lZ290aWF0aW9ubmVlZGVkIiwiY3JlYXRlT2ZmZXIiLCJQTEFZRVJfV0VCUlRDX0NSRUFURV9BTlNXRVJfRVJST1IiLCJvbmFkZHN0cmVhbSIsImxvc3RQYWNrZXRzQXJyIiwic2xvdExlbmd0aCIsInByZXZQYWNrZXRzTG9zdCIsImF2ZzhMb3NzZXMiLCJhdmdNb3JlVGhhblRocmVzaG9sZENvdW50IiwidGhyZXNob2xkIiwiZXh0cmFjdExvc3NQYWNrZXRzT25OZXR3b3JrU3RhdHVzIiwic2V0VGltZW91dCIsImdldFN0YXRzIiwic3RhdHMiLCJmb3JFYWNoIiwiaXNSZW1vdGUiLCJwdXNoIiwicGFyc2VJbnQiLCJwYWNrZXRzTG9zdCIsImxlbmd0aCIsInNsaWNlIiwiXyIsInJlZHVjZSIsIm1lbW8iLCJudW0iLCJjbGVhclRpbWVvdXQiLCJ0cmlnZ2VyIiwiTkVUV09SS19VTlNUQUJMRUQiLCJzZXRSZW1vdGVEZXNjcmlwdGlvbiIsIlJUQ1Nlc3Npb25EZXNjcmlwdGlvbiIsInJlbW90ZURlc2NyaXB0aW9uIiwiY3JlYXRlQW5zd2VyIiwiUExBWUVSX1dFQlJUQ19TRVRfUkVNT1RFX0RFU0NfRVJST1IiLCJpIiwiYWRkSWNlQ2FuZGlkYXRlIiwiUlRDSWNlQ2FuZGlkYXRlIiwiUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SIiwib25lcnJvciIsInJlYWR5U3RhdGUiLCJjbG9zZSIsImYiLCJleHBvcnRzIiwibW9kdWxlIiwiZGVmaW5lIiwidCIsIm4iLCJyIiwicyIsIm8iLCJ1IiwiYSIsInJlcXVpcmUiLCJFcnJvciIsImNvZGUiLCJsIiwiY2FsbCIsIlNEUFV0aWxzIiwid3JpdGVNZWRpYVNlY3Rpb24iLCJ0cmFuc2NlaXZlciIsImNhcHMiLCJkdGxzUm9sZSIsIndyaXRlUnRwRGVzY3JpcHRpb24iLCJraW5kIiwid3JpdGVJY2VQYXJhbWV0ZXJzIiwiaWNlR2F0aGVyZXIiLCJnZXRMb2NhbFBhcmFtZXRlcnMiLCJ3cml0ZUR0bHNQYXJhbWV0ZXJzIiwiZHRsc1RyYW5zcG9ydCIsIm1pZCIsInJ0cFNlbmRlciIsInJ0cFJlY2VpdmVyIiwidHJhY2tJZCIsIl9pbml0aWFsVHJhY2tJZCIsInRyYWNrIiwibXNpZCIsInNlbmRFbmNvZGluZ1BhcmFtZXRlcnMiLCJzc3JjIiwicnR4IiwibG9jYWxDTmFtZSIsImZpbHRlckljZVNlcnZlcnMiLCJpY2VTZXJ2ZXJzIiwiZWRnZVZlcnNpb24iLCJoYXNUdXJuIiwiZmlsdGVyIiwic2VydmVyIiwidXJscyIsImNvbnNvbGUiLCJ3YXJuIiwiaXNTdHJpbmciLCJ2YWxpZFR1cm4iLCJpbmRleE9mIiwiZ2V0Q29tbW9uQ2FwYWJpbGl0aWVzIiwibG9jYWxDYXBhYmlsaXRpZXMiLCJyZW1vdGVDYXBhYmlsaXRpZXMiLCJjb21tb25DYXBhYmlsaXRpZXMiLCJjb2RlY3MiLCJoZWFkZXJFeHRlbnNpb25zIiwiZmVjTWVjaGFuaXNtcyIsImZpbmRDb2RlY0J5UGF5bG9hZFR5cGUiLCJwdCIsInBheWxvYWRUeXBlIiwicHJlZmVycmVkUGF5bG9hZFR5cGUiLCJydHhDYXBhYmlsaXR5TWF0Y2hlcyIsImxSdHgiLCJyUnR4IiwibENvZGVjcyIsInJDb2RlY3MiLCJsQ29kZWMiLCJwYXJhbWV0ZXJzIiwiYXB0IiwickNvZGVjIiwidG9Mb3dlckNhc2UiLCJjbG9ja1JhdGUiLCJudW1DaGFubmVscyIsIk1hdGgiLCJtaW4iLCJydGNwRmVlZGJhY2siLCJmYiIsImoiLCJwYXJhbWV0ZXIiLCJsSGVhZGVyRXh0ZW5zaW9uIiwickhlYWRlckV4dGVuc2lvbiIsInVyaSIsImlzQWN0aW9uQWxsb3dlZEluU2lnbmFsaW5nU3RhdGUiLCJhY3Rpb24iLCJzaWduYWxpbmdTdGF0ZSIsIm9mZmVyIiwiYW5zd2VyIiwibWF5YmVBZGRDYW5kaWRhdGUiLCJpY2VUcmFuc3BvcnQiLCJhbHJlYWR5QWRkZWQiLCJnZXRSZW1vdGVDYW5kaWRhdGVzIiwiZmluZCIsInJlbW90ZUNhbmRpZGF0ZSIsImZvdW5kYXRpb24iLCJpcCIsInBvcnQiLCJwcmlvcml0eSIsInByb3RvY29sIiwiYWRkUmVtb3RlQ2FuZGlkYXRlIiwibWFrZUVycm9yIiwiZGVzY3JpcHRpb24iLCJOb3RTdXBwb3J0ZWRFcnJvciIsIkludmFsaWRTdGF0ZUVycm9yIiwiSW52YWxpZEFjY2Vzc0Vycm9yIiwiVHlwZUVycm9yIiwidW5kZWZpbmVkIiwiT3BlcmF0aW9uRXJyb3IiLCJhZGRUcmFja1RvU3RyZWFtQW5kRmlyZUV2ZW50IiwiYWRkVHJhY2siLCJkaXNwYXRjaEV2ZW50IiwiTWVkaWFTdHJlYW1UcmFja0V2ZW50IiwicmVtb3ZlVHJhY2tGcm9tU3RyZWFtQW5kRmlyZUV2ZW50IiwicmVtb3ZlVHJhY2siLCJmaXJlQWRkVHJhY2siLCJwYyIsInJlY2VpdmVyIiwic3RyZWFtcyIsInRyYWNrRXZlbnQiLCJFdmVudCIsIl9kaXNwYXRjaEV2ZW50IiwiX2V2ZW50VGFyZ2V0IiwiZG9jdW1lbnQiLCJjcmVhdGVEb2N1bWVudEZyYWdtZW50IiwibWV0aG9kIiwiYmluZCIsImNhblRyaWNrbGVJY2VDYW5kaWRhdGVzIiwibmVlZE5lZ290aWF0aW9uIiwibG9jYWxTdHJlYW1zIiwicmVtb3RlU3RyZWFtcyIsImljZUNvbm5lY3Rpb25TdGF0ZSIsImNvbm5lY3Rpb25TdGF0ZSIsImljZUdhdGhlcmluZ1N0YXRlIiwidXNpbmdCdW5kbGUiLCJidW5kbGVQb2xpY3kiLCJydGNwTXV4UG9saWN5IiwiaWNlVHJhbnNwb3J0UG9saWN5IiwiX2ljZUdhdGhlcmVycyIsImljZUNhbmRpZGF0ZVBvb2xTaXplIiwiUlRDSWNlR2F0aGVyZXIiLCJnYXRoZXJQb2xpY3kiLCJfY29uZmlnIiwidHJhbnNjZWl2ZXJzIiwiX3NkcFNlc3Npb25JZCIsImdlbmVyYXRlU2Vzc2lvbklkIiwiX3NkcFNlc3Npb25WZXJzaW9uIiwiX2R0bHNSb2xlIiwiX2lzQ2xvc2VkIiwicHJvdG90eXBlIiwib250cmFjayIsIm9ucmVtb3Zlc3RyZWFtIiwib25zaWduYWxpbmdzdGF0ZWNoYW5nZSIsIm9uaWNlY29ubmVjdGlvbnN0YXRlY2hhbmdlIiwib25jb25uZWN0aW9uc3RhdGVjaGFuZ2UiLCJvbmljZWdhdGhlcmluZ3N0YXRlY2hhbmdlIiwib25kYXRhY2hhbm5lbCIsIl9lbWl0R2F0aGVyaW5nU3RhdGVDaGFuZ2UiLCJnZXRDb25maWd1cmF0aW9uIiwiZ2V0TG9jYWxTdHJlYW1zIiwiZ2V0UmVtb3RlU3RyZWFtcyIsIl9jcmVhdGVUcmFuc2NlaXZlciIsImRvTm90QWRkIiwiaGFzQnVuZGxlVHJhbnNwb3J0IiwicmVjdkVuY29kaW5nUGFyYW1ldGVycyIsImFzc29jaWF0ZWRSZW1vdGVNZWRpYVN0cmVhbXMiLCJ3YW50UmVjZWl2ZSIsInRyYW5zcG9ydHMiLCJfY3JlYXRlSWNlQW5kRHRsc1RyYW5zcG9ydHMiLCJhbHJlYWR5RXhpc3RzIiwiX21heWJlRmlyZU5lZ290aWF0aW9uTmVlZGVkIiwiUlRDUnRwU2VuZGVyIiwiYWRkU3RyZWFtIiwiZ2V0VHJhY2tzIiwiY2xvbmVkU3RyZWFtIiwiY2xvbmUiLCJpZHgiLCJjbG9uZWRUcmFjayIsImFkZEV2ZW50TGlzdGVuZXIiLCJlbmFibGVkIiwic2VuZGVyIiwic3RvcCIsIm1hcCIsInNwbGljZSIsInJlbW92ZVN0cmVhbSIsImdldFNlbmRlcnMiLCJnZXRSZWNlaXZlcnMiLCJfY3JlYXRlSWNlR2F0aGVyZXIiLCJzZHBNTGluZUluZGV4Iiwic2hpZnQiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsInZhbHVlIiwid3JpdGFibGUiLCJidWZmZXJlZENhbmRpZGF0ZUV2ZW50cyIsImJ1ZmZlckNhbmRpZGF0ZXMiLCJlbmQiLCJrZXlzIiwiX2dhdGhlciIsIm9ubG9jYWxjYW5kaWRhdGUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZXZ0Iiwic2RwTWlkIiwiY2FuZCIsImNvbXBvbmVudCIsInVmcmFnIiwidXNlcm5hbWVGcmFnbWVudCIsInNlcmlhbGl6ZWRDYW5kaWRhdGUiLCJ3cml0ZUNhbmRpZGF0ZSIsInBhcnNlQ2FuZGlkYXRlIiwidG9KU09OIiwic2VjdGlvbnMiLCJnZXRNZWRpYVNlY3Rpb25zIiwiZ2V0RGVzY3JpcHRpb24iLCJqb2luIiwiY29tcGxldGUiLCJldmVyeSIsIlJUQ0ljZVRyYW5zcG9ydCIsIm9uaWNlc3RhdGVjaGFuZ2UiLCJfdXBkYXRlSWNlQ29ubmVjdGlvblN0YXRlIiwiX3VwZGF0ZUNvbm5lY3Rpb25TdGF0ZSIsIlJUQ0R0bHNUcmFuc3BvcnQiLCJvbmR0bHNzdGF0ZWNoYW5nZSIsIl9kaXNwb3NlSWNlQW5kRHRsc1RyYW5zcG9ydHMiLCJfdHJhbnNjZWl2ZSIsInJlY3YiLCJwYXJhbXMiLCJlbmNvZGluZ3MiLCJydGNwIiwiY25hbWUiLCJjb21wb3VuZCIsInJ0Y3BQYXJhbWV0ZXJzIiwicCIsInJlY2VpdmUiLCJzZXNzaW9ucGFydCIsInNwbGl0U2VjdGlvbnMiLCJtZWRpYVNlY3Rpb24iLCJwYXJzZVJ0cFBhcmFtZXRlcnMiLCJpc0ljZUxpdGUiLCJtYXRjaFByZWZpeCIsInJlamVjdGVkIiwiaXNSZWplY3RlZCIsInJlbW90ZUljZVBhcmFtZXRlcnMiLCJnZXRJY2VQYXJhbWV0ZXJzIiwicmVtb3RlRHRsc1BhcmFtZXRlcnMiLCJnZXREdGxzUGFyYW1ldGVycyIsInJvbGUiLCJzdGFydCIsIl91cGRhdGVTaWduYWxpbmdTdGF0ZSIsInJlY2VpdmVyTGlzdCIsImljZU9wdGlvbnMiLCJzdWJzdHIiLCJzcGxpdCIsImxpbmVzIiwic3BsaXRMaW5lcyIsImdldEtpbmQiLCJkaXJlY3Rpb24iLCJnZXREaXJlY3Rpb24iLCJyZW1vdGVNc2lkIiwicGFyc2VNc2lkIiwiZ2V0TWlkIiwiZ2VuZXJhdGVJZGVudGlmaWVyIiwicGFyc2VSdHBFbmNvZGluZ1BhcmFtZXRlcnMiLCJwYXJzZVJ0Y3BQYXJhbWV0ZXJzIiwiaXNDb21wbGV0ZSIsImNhbmRzIiwic2V0VHJhbnNwb3J0Iiwic2V0UmVtb3RlQ2FuZGlkYXRlcyIsIlJUQ1J0cFJlY2VpdmVyIiwiZ2V0Q2FwYWJpbGl0aWVzIiwiY29kZWMiLCJpc05ld1RyYWNrIiwiTWVkaWFTdHJlYW0iLCJnZXQiLCJuYXRpdmVUcmFjayIsInNpZCIsIml0ZW0iLCJuZXdTdGF0ZSIsInN0YXRlcyIsImNsb3NlZCIsImNoZWNraW5nIiwiY29ubmVjdGVkIiwiY29tcGxldGVkIiwiZGlzY29ubmVjdGVkIiwiZmFpbGVkIiwiY29ubmVjdGluZyIsIm51bUF1ZGlvVHJhY2tzIiwibnVtVmlkZW9UcmFja3MiLCJvZmZlck9wdGlvbnMiLCJhcmd1bWVudHMiLCJtYW5kYXRvcnkiLCJvcHRpb25hbCIsIm9mZmVyVG9SZWNlaXZlQXVkaW8iLCJvZmZlclRvUmVjZWl2ZVZpZGVvIiwid3JpdGVTZXNzaW9uQm9pbGVycGxhdGUiLCJyZW1vdGVDb2RlYyIsImhkckV4dCIsInJlbW90ZUV4dGVuc2lvbnMiLCJySGRyRXh0IiwiZ2V0TG9jYWxDYW5kaWRhdGVzIiwibWVkaWFTZWN0aW9uc0luT2ZmZXIiLCJsb2NhbFRyYWNrIiwiZ2V0QXVkaW9UcmFja3MiLCJnZXRWaWRlb1RyYWNrcyIsImhhc1J0eCIsImMiLCJyZWR1Y2VkU2l6ZSIsImNhbmRpZGF0ZVN0cmluZyIsInRyaW0iLCJwcm9taXNlcyIsImZpeFN0YXRzVHlwZSIsInN0YXQiLCJpbmJvdW5kcnRwIiwib3V0Ym91bmRydHAiLCJjYW5kaWRhdGVwYWlyIiwibG9jYWxjYW5kaWRhdGUiLCJyZW1vdGVjYW5kaWRhdGUiLCJyZXN1bHRzIiwiTWFwIiwiYWxsIiwicmVzIiwicmVzdWx0Iiwic2V0IiwibWV0aG9kcyIsIm5hdGl2ZU1ldGhvZCIsImFyZ3MiLCJhcHBseSIsInJhbmRvbSIsInRvU3RyaW5nIiwiYmxvYiIsImxpbmUiLCJwYXJ0cyIsInBhcnQiLCJpbmRleCIsInByZWZpeCIsInN1YnN0cmluZyIsInJlbGF0ZWRBZGRyZXNzIiwicmVsYXRlZFBvcnQiLCJ0Y3BUeXBlIiwidG9VcHBlckNhc2UiLCJwYXJzZUljZU9wdGlvbnMiLCJwYXJzZVJ0cE1hcCIsInBhcnNlZCIsIndyaXRlUnRwTWFwIiwicGFyc2VFeHRtYXAiLCJ3cml0ZUV4dG1hcCIsImhlYWRlckV4dGVuc2lvbiIsInByZWZlcnJlZElkIiwicGFyc2VGbXRwIiwia3YiLCJ3cml0ZUZtdHAiLCJwYXJhbSIsInBhcnNlUnRjcEZiIiwid3JpdGVSdGNwRmIiLCJwYXJzZVNzcmNNZWRpYSIsInNwIiwiY29sb24iLCJhdHRyaWJ1dGUiLCJwYXJzZUZpbmdlcnByaW50IiwiYWxnb3JpdGhtIiwiZmluZ2VycHJpbnRzIiwic2V0dXBUeXBlIiwiZnAiLCJjb25jYXQiLCJpY2VQYXJhbWV0ZXJzIiwicGFzc3dvcmQiLCJtbGluZSIsInJ0cG1hcGxpbmUiLCJmbXRwcyIsIm1heHB0aW1lIiwiZXh0ZW5zaW9uIiwiZW5jb2RpbmdQYXJhbWV0ZXJzIiwiaGFzUmVkIiwiaGFzVWxwZmVjIiwic3NyY3MiLCJwcmltYXJ5U3NyYyIsInNlY29uZGFyeVNzcmMiLCJmbG93cyIsImVuY1BhcmFtIiwiY29kZWNQYXlsb2FkVHlwZSIsImZlYyIsIm1lY2hhbmlzbSIsImJhbmR3aWR0aCIsIm1heEJpdHJhdGUiLCJyZW1vdGVTc3JjIiwib2JqIiwicnNpemUiLCJtdXgiLCJwbGFuQiIsInNlc3NJZCIsInNlc3NWZXIiLCJzZXNzaW9uSWQiLCJ2ZXJzaW9uIiwicGFyc2VNTGluZSIsImZtdCIsInBhcnNlT0xpbmUiLCJ1c2VybmFtZSIsInNlc3Npb25WZXJzaW9uIiwibmV0VHlwZSIsImFkZHJlc3NUeXBlIiwiYWRkcmVzcyIsImdsb2JhbCIsImFkYXB0ZXJGYWN0b3J5Iiwic2VsZiIsInV0aWxzIiwiZGVwZW5kZW5jaWVzIiwib3B0cyIsIm9wdGlvbnMiLCJzaGltQ2hyb21lIiwic2hpbUZpcmVmb3giLCJzaGltRWRnZSIsInNoaW1TYWZhcmkiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsImxvZ2dpbmciLCJicm93c2VyRGV0YWlscyIsImRldGVjdEJyb3dzZXIiLCJjaHJvbWVTaGltIiwiZWRnZVNoaW0iLCJmaXJlZm94U2hpbSIsInNhZmFyaVNoaW0iLCJjb21tb25TaGltIiwiYWRhcHRlciIsImV4dHJhY3RWZXJzaW9uIiwiZGlzYWJsZUxvZyIsImRpc2FibGVXYXJuaW5ncyIsImJyb3dzZXIiLCJzaGltUGVlckNvbm5lY3Rpb24iLCJicm93c2VyU2hpbSIsInNoaW1DcmVhdGVPYmplY3RVUkwiLCJzaGltR2V0VXNlck1lZGlhIiwic2hpbU1lZGlhU3RyZWFtIiwic2hpbVNvdXJjZU9iamVjdCIsInNoaW1PblRyYWNrIiwic2hpbUFkZFRyYWNrUmVtb3ZlVHJhY2siLCJzaGltR2V0U2VuZGVyc1dpdGhEdG1mIiwic2hpbVJUQ0ljZUNhbmRpZGF0ZSIsInNoaW1NYXhNZXNzYWdlU2l6ZSIsInNoaW1TZW5kVGhyb3dUeXBlRXJyb3IiLCJzaGltUmVtb3ZlU3RyZWFtIiwic2hpbVJlcGxhY2VUcmFjayIsInNoaW1SVENJY2VTZXJ2ZXJVcmxzIiwic2hpbUNhbGxiYWNrc0FQSSIsInNoaW1Mb2NhbFN0cmVhbXNBUEkiLCJzaGltUmVtb3RlU3RyZWFtc0FQSSIsInNoaW1UcmFja0V2ZW50VHJhbnNjZWl2ZXIiLCJzaGltQ3JlYXRlT2ZmZXJMZWdhY3kiLCJ3ZWJraXRNZWRpYVN0cmVhbSIsIl9vbnRyYWNrIiwib3JpZ1NldFJlbW90ZURlc2NyaXB0aW9uIiwiX29udHJhY2twb2x5IiwidGUiLCJ3cmFwUGVlckNvbm5lY3Rpb25FdmVudCIsInNoaW1TZW5kZXJXaXRoRHRtZiIsImR0bWYiLCJfZHRtZiIsImNyZWF0ZURUTUZTZW5kZXIiLCJfcGMiLCJfc2VuZGVycyIsIm9yaWdBZGRUcmFjayIsIm9yaWdSZW1vdmVUcmFjayIsIm9yaWdBZGRTdHJlYW0iLCJvcmlnUmVtb3ZlU3RyZWFtIiwib3JpZ0dldFNlbmRlcnMiLCJzZW5kZXJzIiwiVVJMIiwiSFRNTE1lZGlhRWxlbWVudCIsIl9zcmNPYmplY3QiLCJzcmMiLCJyZXZva2VPYmplY3RVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJzaGltQWRkVHJhY2tSZW1vdmVUcmFja1dpdGhOYXRpdmUiLCJfc2hpbW1lZExvY2FsU3RyZWFtcyIsInN0cmVhbUlkIiwiRE9NRXhjZXB0aW9uIiwiZXhpc3RpbmdTZW5kZXJzIiwibmV3U2VuZGVycyIsIm5ld1NlbmRlciIsIm9yaWdHZXRMb2NhbFN0cmVhbXMiLCJuYXRpdmVTdHJlYW1zIiwiX3JldmVyc2VTdHJlYW1zIiwiX3N0cmVhbXMiLCJuZXdTdHJlYW0iLCJvbGRTdHJlYW0iLCJyZXBsYWNlSW50ZXJuYWxTdHJlYW1JZCIsImludGVybmFsSWQiLCJleHRlcm5hbFN0cmVhbSIsImludGVybmFsU3RyZWFtIiwicmVwbGFjZSIsIlJlZ0V4cCIsInJlcGxhY2VFeHRlcm5hbFN0cmVhbUlkIiwiaXNMZWdhY3lDYWxsIiwiZXJyIiwib3JpZ1NldExvY2FsRGVzY3JpcHRpb24iLCJvcmlnTG9jYWxEZXNjcmlwdGlvbiIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImlzTG9jYWwiLCJzdHJlYW1pZCIsImhhc1RyYWNrIiwid2Via2l0UlRDUGVlckNvbm5lY3Rpb24iLCJwY0NvbmZpZyIsInBjQ29uc3RyYWludHMiLCJpY2VUcmFuc3BvcnRzIiwiZ2VuZXJhdGVDZXJ0aWZpY2F0ZSIsIk9yaWdQZWVyQ29ubmVjdGlvbiIsIm5ld0ljZVNlcnZlcnMiLCJkZXByZWNhdGVkIiwib3JpZ0dldFN0YXRzIiwic2VsZWN0b3IiLCJzdWNjZXNzQ2FsbGJhY2siLCJlcnJvckNhbGxiYWNrIiwiZml4Q2hyb21lU3RhdHNfIiwicmVzcG9uc2UiLCJzdGFuZGFyZFJlcG9ydCIsInJlcG9ydHMiLCJyZXBvcnQiLCJzdGFuZGFyZFN0YXRzIiwidGltZXN0YW1wIiwibmFtZXMiLCJtYWtlTWFwU3RhdHMiLCJzdWNjZXNzQ2FsbGJhY2tXcmFwcGVyXyIsInByb21pc2UiLCJuYXRpdmVBZGRJY2VDYW5kaWRhdGUiLCJuYXZpZ2F0b3IiLCJjb25zdHJhaW50c1RvQ2hyb21lXyIsImNjIiwiaWRlYWwiLCJleGFjdCIsIm1heCIsIm9sZG5hbWVfIiwiY2hhckF0Iiwib2MiLCJtaXgiLCJhZHZhbmNlZCIsInNoaW1Db25zdHJhaW50c18iLCJjb25zdHJhaW50cyIsImZ1bmMiLCJhdWRpbyIsInJlbWFwIiwiYiIsInZpZGVvIiwiZmFjZSIsImZhY2luZ01vZGUiLCJnZXRTdXBwb3J0ZWRGYWNpbmdNb2RlTGllcyIsIm1lZGlhRGV2aWNlcyIsImdldFN1cHBvcnRlZENvbnN0cmFpbnRzIiwibWF0Y2hlcyIsImVudW1lcmF0ZURldmljZXMiLCJkZXZpY2VzIiwiZCIsImRldiIsInNvbWUiLCJtYXRjaCIsImxhYmVsIiwiZGV2aWNlSWQiLCJzaGltRXJyb3JfIiwiUGVybWlzc2lvbkRlbmllZEVycm9yIiwiUGVybWlzc2lvbkRpc21pc3NlZEVycm9yIiwiRGV2aWNlc05vdEZvdW5kRXJyb3IiLCJDb25zdHJhaW50Tm90U2F0aXNmaWVkRXJyb3IiLCJUcmFja1N0YXJ0RXJyb3IiLCJNZWRpYURldmljZUZhaWxlZER1ZVRvU2h1dGRvd24iLCJNZWRpYURldmljZUtpbGxTd2l0Y2hPbiIsIlRhYkNhcHR1cmVFcnJvciIsIlNjcmVlbkNhcHR1cmVFcnJvciIsIkRldmljZUNhcHR1cmVFcnJvciIsImNvbnN0cmFpbnQiLCJjb25zdHJhaW50TmFtZSIsImdldFVzZXJNZWRpYV8iLCJvblN1Y2Nlc3MiLCJvbkVycm9yIiwid2Via2l0R2V0VXNlck1lZGlhIiwiZ2V0VXNlck1lZGlhIiwiZ2V0VXNlck1lZGlhUHJvbWlzZV8iLCJraW5kcyIsIk1lZGlhU3RyZWFtVHJhY2siLCJnZXRTb3VyY2VzIiwiZGV2aWNlIiwiZ3JvdXBJZCIsImVjaG9DYW5jZWxsYXRpb24iLCJmcmFtZVJhdGUiLCJoZWlnaHQiLCJ3aWR0aCIsIm9yaWdHZXRVc2VyTWVkaWEiLCJjcyIsIk5hdGl2ZVJUQ0ljZUNhbmRpZGF0ZSIsIm5hdGl2ZUNhbmRpZGF0ZSIsInBhcnNlZENhbmRpZGF0ZSIsImF1Z21lbnRlZENhbmRpZGF0ZSIsIm5hdGl2ZUNyZWF0ZU9iamVjdFVSTCIsIm5hdGl2ZVJldm9rZU9iamVjdFVSTCIsIm5ld0lkIiwiZHNjIiwibmF0aXZlU2V0QXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwiUlRDU2N0cFRyYW5zcG9ydCIsIl9zY3RwIiwic2N0cEluRGVzY3JpcHRpb24iLCJtTGluZSIsImdldFJlbW90ZUZpcmVmb3hWZXJzaW9uIiwiZ2V0Q2FuU2VuZE1heE1lc3NhZ2VTaXplIiwicmVtb3RlSXNGaXJlZm94IiwiY2FuU2VuZE1heE1lc3NhZ2VTaXplIiwiZ2V0TWF4TWVzc2FnZVNpemUiLCJtYXhNZXNzYWdlU2l6ZSIsImlzRmlyZWZveCIsImNhblNlbmRNTVMiLCJyZW1vdGVNTVMiLCJOdW1iZXIiLCJQT1NJVElWRV9JTkZJTklUWSIsInNjdHAiLCJvcmlnQ3JlYXRlRGF0YUNoYW5uZWwiLCJjcmVhdGVEYXRhQ2hhbm5lbCIsImRhdGFDaGFubmVsIiwib3JpZ0RhdGFDaGFubmVsU2VuZCIsImRjIiwic2l6ZSIsImJ5dGVMZW5ndGgiLCJzaGltUlRDUGVlckNvbm5lY3Rpb24iLCJvcmlnTVNURW5hYmxlZCIsImV2IiwiUlRDRHRtZlNlbmRlciIsIlJUQ0RUTUZTZW5kZXIiLCJyZXBsYWNlVHJhY2siLCJzZXRUcmFjayIsIlJUQ1RyYWNrRXZlbnQiLCJtb3pTcmNPYmplY3QiLCJtb3pSVENQZWVyQ29ubmVjdGlvbiIsIm5ld1NlcnZlciIsImNyZWRlbnRpYWwiLCJtb3pSVENTZXNzaW9uRGVzY3JpcHRpb24iLCJtb3pSVENJY2VDYW5kaWRhdGUiLCJtb2Rlcm5TdGF0c1R5cGVzIiwibmF0aXZlR2V0U3RhdHMiLCJvblN1Y2MiLCJvbkVyciIsIkludGVybmFsRXJyb3IiLCJTZWN1cml0eUVycm9yIiwiY29uc3RyYWludHNUb0ZGMzdfIiwibW96R2V0VXNlck1lZGlhIiwiaW5mb3MiLCJvcmdFbnVtZXJhdGVEZXZpY2VzIiwibmF0aXZlR2V0VXNlck1lZGlhIiwiZ2V0U2V0dGluZ3MiLCJuYXRpdmVHZXRTZXR0aW5ncyIsImFwcGx5Q29uc3RyYWludHMiLCJuYXRpdmVBcHBseUNvbnN0cmFpbnRzIiwiX2xvY2FsU3RyZWFtcyIsImdldFN0cmVhbUJ5SWQiLCJfcmVtb3RlU3RyZWFtcyIsIl9hZGRUcmFjayIsInRyYWNrcyIsIl9vbmFkZHN0cmVhbSIsIl9vbmFkZHN0cmVhbXBvbHkiLCJmYWlsdXJlQ2FsbGJhY2siLCJ3aXRoQ2FsbGJhY2siLCJjYiIsImVycmNiIiwiUlRDVHJhbnNjZWl2ZXIiLCJvcmlnQ3JlYXRlT2ZmZXIiLCJhdWRpb1RyYW5zY2VpdmVyIiwiZ2V0VHJhbnNjZWl2ZXJzIiwic2V0RGlyZWN0aW9uIiwiYWRkVHJhbnNjZWl2ZXIiLCJ2aWRlb1RyYW5zY2VpdmVyIiwibG9nRGlzYWJsZWRfIiwiZGVwcmVjYXRpb25XYXJuaW5nc18iLCJ1YXN0cmluZyIsImV4cHIiLCJwb3MiLCJldmVudE5hbWVUb1dyYXAiLCJ3cmFwcGVyIiwicHJvdG8iLCJuYXRpdmVBZGRFdmVudExpc3RlbmVyIiwibmF0aXZlRXZlbnROYW1lIiwid3JhcHBlZENhbGxiYWNrIiwiX2V2ZW50TWFwIiwibmF0aXZlUmVtb3ZlRXZlbnRMaXN0ZW5lciIsInVud3JhcHBlZENiIiwiYm9vbCIsIm9sZE1ldGhvZCIsIm5ld01ldGhvZCIsInVzZXJBZ2VudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBOzs7Ozs7QUFWQTs7O0FBZ0JBLElBQU1BLFNBQVMsU0FBVEEsTUFBUyxDQUFTQyxTQUFULEVBQW9CQyxZQUFwQixFQUFpQztBQUM1QyxR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LElBQUkvSixVQUFVcUIsWUFBVixJQUNQckIsVUFBVStKLFNBQVYsQ0FBb0JsSSxLQUFwQixDQUEwQixvQkFBMUIsQ0FERyxFQUM4QztBQUFFO0FBQ3JEdk8sbUJBQU95RyxPQUFQLEdBQWlCLE1BQWpCO0FBQ0F6RyxtQkFBT3VFLE9BQVAsR0FBaUIrQixlQUFlb0csVUFBVStKLFNBQXpCLEVBQ2Isb0JBRGEsRUFDUyxDQURULENBQWpCO0FBRUQsV0FMTSxNQUtBLElBQUlydkIsT0FBT2dDLGlCQUFQLElBQ1BzakIsVUFBVStKLFNBQVYsQ0FBb0JsSSxLQUFwQixDQUEwQixzQkFBMUIsQ0FERyxFQUNnRDtBQUFFO0FBQ3ZEdk8sbUJBQU95RyxPQUFQLEdBQWlCLFFBQWpCO0FBQ0F6RyxtQkFBT3VFLE9BQVAsR0FBaUIrQixlQUFlb0csVUFBVStKLFNBQXpCLEVBQ2Isc0JBRGEsRUFDVyxDQURYLENBQWpCO0FBRUQsV0FMTSxNQUtBO0FBQUU7QUFDUHpXLG1CQUFPeUcsT0FBUCxHQUFpQiwwQkFBakI7QUFDQSxtQkFBT3pHLE1BQVA7QUFDRDs7QUFFRCxpQkFBT0EsTUFBUDtBQUNEO0FBOUZjLE9BQWpCO0FBaUdDLEtBaExxQixFQWdMcEIsRUFoTG9CLENBOXBKb3hCLEVBQTNiLEVBODBKeFcsRUE5MEp3VyxFQTgwSnJXLENBQUMsQ0FBRCxDQTkwSnFXLEVBODBKaFcsQ0E5MEpnVyxDQUFQO0FBKzBKdlcsQ0EvMEpELEUiLCJmaWxlIjoib3ZlbnBsYXllci5wcm92aWRlci5XZWJSVENQcm92aWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGhvaG8gb24gMjAxOC4gNi4gMTEuLlxyXG4gKi9cclxuaW1wb3J0IE1lZGlhTWFuYWdlciBmcm9tIFwiYXBpL21lZGlhL01hbmFnZXJcIjtcclxuaW1wb3J0IFByb3ZpZGVyIGZyb20gXCJhcGkvcHJvdmlkZXIvaHRtbDUvUHJvdmlkZXJcIjtcclxuaW1wb3J0IFdlYlJUQ0xvYWRlciBmcm9tIFwiYXBpL3Byb3ZpZGVyL2h0bWw1L3Byb3ZpZGVycy9XZWJSVENMb2FkZXJcIjtcclxuaW1wb3J0IHtpc1dlYlJUQ30gZnJvbSBcInV0aWxzL3ZhbGlkYXRvclwiO1xyXG5pbXBvcnQge2Vycm9yVHJpZ2dlcn0gZnJvbSBcImFwaS9wcm92aWRlci91dGlsc1wiO1xyXG5pbXBvcnQge1BST1ZJREVSX1dFQlJUQywgU1RBVEVfSURMRX0gZnJvbSBcImFwaS9jb25zdGFudHNcIjtcclxuXHJcbi8qKlxyXG4gKiBAYnJpZWYgICB3ZWJydGMgcHJvdmlkZXIgZXh0ZW5kZWQgY29yZS5cclxuICogQHBhcmFtICAgY29udGFpbmVyIHBsYXllciBlbGVtZW50LlxyXG4gKiBAcGFyYW0gICBwbGF5ZXJDb25maWcgICAgY29uZmlnLlxyXG4gKiAqL1xyXG5cclxuY29uc3QgV2ViUlRDID0gZnVuY3Rpb24oY29udGFpbmVyLCBwbGF5ZXJDb25maWcpe1xyXG4gICAgbGV0IHRoYXQgPSB7fTtcclxuICAgIGxldCB3ZWJydGNMb2FkZXIgPSBudWxsO1xyXG4gICAgbGV0IHN1cGVyRGVzdHJveV9mdW5jICA9IG51bGw7XHJcblxyXG4gICAgbGV0IG1lZGlhTWFuYWdlciA9IE1lZGlhTWFuYWdlcihjb250YWluZXIsIFBST1ZJREVSX1dFQlJUQyk7XHJcbiAgICBsZXQgZWxlbWVudCA9IG1lZGlhTWFuYWdlci5jcmVhdGUoKTtcclxuXHJcbiAgICBsZXQgc3BlYyA9IHtcclxuICAgICAgICBuYW1lIDogUFJPVklERVJfV0VCUlRDLFxyXG4gICAgICAgIGV4dGVuZGVkRWxlbWVudCA6IGVsZW1lbnQsXHJcbiAgICAgICAgbGlzdGVuZXIgOiBudWxsLFxyXG4gICAgICAgIGNhblNlZWsgOiBmYWxzZSxcclxuICAgICAgICBpc0xpdmUgOiBmYWxzZSxcclxuICAgICAgICBzZWVraW5nIDogZmFsc2UsXHJcbiAgICAgICAgc3RhdGUgOiBTVEFURV9JRExFLFxyXG4gICAgICAgIGJ1ZmZlciA6IDAsXHJcbiAgICAgICAgZnJhbWVyYXRlIDogMCxcclxuICAgICAgICBjdXJyZW50UXVhbGl0eSA6IC0xLFxyXG4gICAgICAgIGN1cnJlbnRTb3VyY2UgOiAtMSxcclxuICAgICAgICBxdWFsaXR5TGV2ZWxzIDogW10sXHJcbiAgICAgICAgc291cmNlcyA6IFtdXHJcbiAgICB9O1xyXG5cclxuICAgIHRoYXQgPSBQcm92aWRlcihzcGVjLCBwbGF5ZXJDb25maWcsIGZ1bmN0aW9uKHNvdXJjZSl7XHJcbiAgICAgICAgaWYoaXNXZWJSVEMoc291cmNlLmZpbGUsIHNvdXJjZS50eXBlKSl7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldFQlJUQyA6IG9uQmVmb3JlTG9hZCA6IFwiLCBzb3VyY2UpO1xyXG4gICAgICAgICAgICBpZih3ZWJydGNMb2FkZXIpe1xyXG4gICAgICAgICAgICAgICAgd2VicnRjTG9hZGVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIHdlYnJ0Y0xvYWRlciA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd2VicnRjTG9hZGVyID0gV2ViUlRDTG9hZGVyKHRoYXQsIHNvdXJjZS5maWxlLCBlcnJvclRyaWdnZXIpO1xyXG4gICAgICAgICAgICB3ZWJydGNMb2FkZXIuY29ubmVjdCgpLnRoZW4oZnVuY3Rpb24oc3RyZWFtKXtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3JjT2JqZWN0ID0gc3RyZWFtO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5wbGF5KCk7XHJcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKXtcclxuICAgICAgICAgICAgICAgIC8vdGhhdC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAvL0RvIG5vdGhpbmdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBzdXBlckRlc3Ryb3lfZnVuYyA9IHRoYXQuc3VwZXIoJ2Rlc3Ryb3knKTtcclxuXHJcbiAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJXRUJSVEMgUFJPVklERVIgTE9BREVELlwiKTtcclxuXHJcblxyXG4gICAgdGhhdC5kZXN0cm95ID0gKCkgPT57XHJcbiAgICAgICAgaWYod2VicnRjTG9hZGVyKXtcclxuICAgICAgICAgICAgd2VicnRjTG9hZGVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgd2VicnRjTG9hZGVyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbWVkaWFNYW5hZ2VyLmRlc3Ryb3koKTtcclxuICAgICAgICBtZWRpYU1hbmFnZXIgPSBudWxsO1xyXG4gICAgICAgIGVsZW1lbnQgPSBudWxsO1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldFQlJUQyA6ICBQUk9WSURFUiBERVNUUk9ZRUQuXCIpO1xyXG5cclxuICAgICAgICBzdXBlckRlc3Ryb3lfZnVuYygpO1xyXG5cclxuICAgIH07XHJcbiAgICByZXR1cm4gdGhhdDtcclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBXZWJSVEM7XHJcbiIsImltcG9ydCBhZGFwdGVyIGZyb20gJ3V0aWxzL2FkYXB0ZXInO1xyXG5pbXBvcnQgXyBmcm9tIFwidXRpbHMvdW5kZXJzY29yZVwiO1xyXG5pbXBvcnQge1xyXG4gICAgRVJST1JTLFxyXG4gICAgUExBWUVSX1dFQlJUQ19XU19FUlJPUixcclxuICAgIFBMQVlFUl9XRUJSVENfV1NfQ0xPU0VELFxyXG4gICAgUExBWUVSX1dFQlJUQ19BRERfSUNFQ0FORElEQVRFX0VSUk9SLFxyXG4gICAgUExBWUVSX1dFQlJUQ19TRVRfUkVNT1RFX0RFU0NfRVJST1IsXHJcbiAgICBQTEFZRVJfV0VCUlRDX0NSRUFURV9BTlNXRVJfRVJST1IsXHJcbiAgICBQTEFZRVJfV0VCUlRDX1NFVF9MT0NBTF9ERVNDX0VSUk9SLFxyXG4gICAgUExBWUVSX1dFQlJUQ19ORVRXT1JLX1NMT1csXHJcbiAgICBORVRXT1JLX1VOU1RBQkxFRFxyXG59IGZyb20gXCJhcGkvY29uc3RhbnRzXCI7XHJcblxyXG5cclxuY29uc3QgV2ViUlRDTG9hZGVyID0gZnVuY3Rpb24ocHJvdmlkZXIsIHVybCwgZXJyb3JUcmlnZ2VyKXtcclxuICAgIHZhciB1cmwgPSB1cmw7XHJcbiAgICBsZXQgd3MgPSBcIlwiO1xyXG4gICAgbGV0IHBlZXJDb25uZWN0aW9uID0gXCJcIjtcclxuICAgIGxldCBzdGF0aXN0aWNzVGltZXIgPSBcIlwiO1xyXG4gICAgY29uc3QgY29uZmlnID0ge1xyXG4gICAgICAgICdpY2VTZXJ2ZXJzJzogW3tcclxuICAgICAgICAgICAgJ3VybHMnOiAnc3R1bjpzdHVuLmwuZ29vZ2xlLmNvbToxOTMwMidcclxuICAgICAgICB9XVxyXG4gICAgfTtcclxuICAgIGNvbnN0IHRoYXQgPSB7fTtcclxuICAgIGxldCBteVNkcCA9IFwiXCI7XHJcblxyXG5cclxuICAgIChmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZXhpc3RpbmdIYW5kbGVyID0gd2luZG93Lm9uYmVmb3JldW5sb2FkO1xyXG4gICAgICAgIHdpbmRvdy5vbmJlZm9yZXVubG9hZCA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChleGlzdGluZ0hhbmRsZXIpe1xyXG4gICAgICAgICAgICAgICAgZXhpc3RpbmdIYW5kbGVyKGV2ZW50KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiVGhpcyBjYWxscyBhdXRvIHdoZW4gYnJvd3NlciBjbG9zZWQuXCIpO1xyXG4gICAgICAgICAgICBjbG9zZVBlZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9KSgpO1xyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldlYlJUQ0xvYWRlciBjb25uZWN0aW5nLi4uXCIpO1xyXG5cclxuICAgICAgICBjb25zdCBvbkxvY2FsRGVzY3JpcHRpb24gPSBmdW5jdGlvbihpZCwgY29ubmVjdGlvbiwgZGVzYykge1xyXG4gICAgICAgICAgICBjb25uZWN0aW9uLnNldExvY2FsRGVzY3JpcHRpb24oZGVzYykudGhlbihmdW5jdGlvbiAoKXtcclxuICAgICAgICAgICAgICAgIC8vIG15IFNEUCBjcmVhdGVkLlxyXG4gICAgICAgICAgICAgICAgdmFyIGxvY2FsU0RQID0gY29ubmVjdGlvbi5sb2NhbERlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKCdMb2NhbCBTRFAnLCBsb2NhbFNEUCk7XHJcbiAgICAgICAgICAgICAgICBteVNkcCA9IGxvY2FsU0RQOyAgIC8vdGVzdCBjb2RlXHJcbiAgICAgICAgICAgICAgICAvLyBteSBzZHAgc2VuZCB0byBzZXJ2ZXIuXHJcbiAgICAgICAgICAgICAgICB3cy5zZW5kKEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZCA6IFwiYW5zd2VyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2RwOiBsb2NhbFNEUFxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcil7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTW1BMQVlFUl9XRUJSVENfU0VUX0xPQ0FMX0RFU0NfRVJST1JdO1xyXG4gICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCl7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcIldlYlJUQ0xvYWRlciB1cmwgOiBcIiArIHVybCk7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB3cyA9IG5ldyBXZWJTb2NrZXQodXJsKTtcclxuICAgICAgICAgICAgICAgIHdzLm9ub3BlbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdzLnNlbmQoSlNPTi5zdHJpbmdpZnkoe2NvbW1hbmQgOiBcInJlcXVlc3Rfb2ZmZXJcIn0pKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB3cy5vbm1lc3NhZ2UgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IEpTT04ucGFyc2UoZS5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihtZXNzYWdlLmVycm9yKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SU1tQTEFZRVJfV0VCUlRDX1dTX0VSUk9SXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcih0ZW1wRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKG1lc3NhZ2UubGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coJ0xpc3QgcmVjZWl2ZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIW1lc3NhZ2UuaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKCdJRCBtdXN0IGJlIG5vdCBudWxsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFwZWVyQ29ubmVjdGlvbil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uID0gbmV3IFJUQ1BlZXJDb25uZWN0aW9uKGNvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbi5vbmljZWNhbmRpZGF0ZSA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGUuY2FuZGlkYXRlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coXCJXZWJSVENMb2FkZXIgc2VuZCBjYW5kaWRhdGUgdG8gc2VydmVyIDogXCIgKyBlLmNhbmRpZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3Muc2VuZChKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBtZXNzYWdlLmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kIDogXCJjYW5kaWRhdGVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuZGlkYXRlczogW2UuY2FuZGlkYXRlXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uLm9ubmVnb3RpYXRpb25uZWVkZWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uLmNyZWF0ZU9mZmVyKCkudGhlbihmdW5jdGlvbihkZXNjKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiY3JlYXRlT2ZmZXIgOiBzdWNjZXNzXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Mb2NhbERlc2NyaXB0aW9uKG1lc3NhZ2UuaWQsIHBlZXJDb25uZWN0aW9uLCBkZXNjKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTW1BMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcEVycm9yLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2VQZWVyKHRlbXBFcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uLm9uYWRkc3RyZWFtID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwic3RyZWFtIHJlY2VpdmVkLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHN0cmVhbSByZWNlaXZlZC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsb3N0UGFja2V0c0FyciA9IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsb3RMZW5ndGggPSA4LCAvLzggc3RhdGlzdGljcy4gZXZlcnkgMiBzZWNvbmRzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldlBhY2tldHNMb3N0ID0gMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdmc4TG9zc2VzID0gMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdmdNb3JlVGhhblRocmVzaG9sZENvdW50ID0gMCwgIC8vSWYgYXZnOExvc3MgbW9yZSB0aGFuIHRocmVzaG9sZC5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJlc2hvbGQgPSAyMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGV4dHJhY3RMb3NzUGFja2V0c09uTmV0d29ya1N0YXR1cyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGlzdGljc1RpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZighcGVlckNvbm5lY3Rpb24pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uLmdldFN0YXRzKCkudGhlbihmdW5jdGlvbihzdGF0cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHMuZm9yRWFjaChmdW5jdGlvbihzdGF0ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoc3RhdGUudHlwZSA9PT0gXCJpbmJvdW5kLXJ0cFwiICYmICFzdGF0ZS5pc1JlbW90ZSApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coc3RhdGUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8oc3RhdGUucGFja2V0c0xvc3QgLSBwcmV2UGFja2V0c0xvc3QpIGlzIHJlYWwgY3VycmVudCBsb3N0LlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb3N0UGFja2V0c0Fyci5wdXNoKHBhcnNlSW50KHN0YXRlLnBhY2tldHNMb3N0KS1wYXJzZUludChwcmV2UGFja2V0c0xvc3QpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGxvc3RQYWNrZXRzQXJyLmxlbmd0aCA+IHNsb3RMZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9zdFBhY2tldHNBcnIgPSBsb3N0UGFja2V0c0Fyci5zbGljZShsb3N0UGFja2V0c0Fyci5sZW5ndGggLSBzbG90TGVuZ3RoLCBsb3N0UGFja2V0c0Fyci5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXZnOExvc3NlcyA9IF8ucmVkdWNlKGxvc3RQYWNrZXRzQXJyLCBmdW5jdGlvbihtZW1vLCBudW0peyByZXR1cm4gbWVtbyArIG51bTsgfSwgMCkgLyBzbG90TGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTGFzdDggTE9TVCBQQUNLRVQgQVZHICA6IFwiKyAoYXZnOExvc3NlcyksIHN0YXRlLnBhY2tldHNMb3N0ICwgbG9zdFBhY2tldHNBcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoYXZnOExvc3NlcyA+IHRocmVzaG9sZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXZnTW9yZVRoYW5UaHJlc2hvbGRDb3VudCArKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihhdmdNb3JlVGhhblRocmVzaG9sZENvdW50ID09PSAzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiTkVUV09SSyBVTlNUQUJMRUQhISEgXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoc3RhdGlzdGljc1RpbWVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXIudHJpZ2dlcihORVRXT1JLX1VOU1RBQkxFRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXZnTW9yZVRoYW5UaHJlc2hvbGRDb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2UGFja2V0c0xvc3QgPSBzdGF0ZS5wYWNrZXRzTG9zdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4dHJhY3RMb3NzUGFja2V0c09uTmV0d29ya1N0YXR1cygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAyMDAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXh0cmFjdExvc3NQYWNrZXRzT25OZXR3b3JrU3RhdHVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGUuc3RyZWFtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKG1lc3NhZ2Uuc2RwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vU2V0IHJlbW90ZSBkZXNjcmlwdGlvbiB3aGVuIEkgcmVjZWl2ZWQgc2RwIGZyb20gc2VydmVyLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbi5zZXRSZW1vdGVEZXNjcmlwdGlvbihuZXcgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKG1lc3NhZ2Uuc2RwKSkudGhlbihmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocGVlckNvbm5lY3Rpb24ucmVtb3RlRGVzY3JpcHRpb24udHlwZSA9PT0gJ29mZmVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgY3JlYXRlcyBhbnN3ZXIgd2hlbiBJIHJlY2VpdmVkIG9mZmVyIGZyb20gcHVibGlzaGVyLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uLmNyZWF0ZUFuc3dlcigpLnRoZW4oZnVuY3Rpb24oZGVzYyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcImNyZWF0ZUFuc3dlciA6IHN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uTG9jYWxEZXNjcmlwdGlvbihtZXNzYWdlLmlkLCBwZWVyQ29ubmVjdGlvbiwgZGVzYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTW1BMQVlFUl9XRUJSVENfQ1JFQVRFX0FOU1dFUl9FUlJPUl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SU1tQTEFZRVJfV0VCUlRDX1NFVF9SRU1PVEVfREVTQ19FUlJPUl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlUGVlcih0ZW1wRXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKG1lc3NhZ2UuY2FuZGlkYXRlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGlzIHJlY2VpdmVzIElDRSBDYW5kaWRhdGUgZnJvbSBzZXJ2ZXIuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBtZXNzYWdlLmNhbmRpZGF0ZXMubGVuZ3RoOyBpICsrICl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihtZXNzYWdlLmNhbmRpZGF0ZXNbaV0gJiYgbWVzc2FnZS5jYW5kaWRhdGVzW2ldLmNhbmRpZGF0ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZWVyQ29ubmVjdGlvbi5hZGRJY2VDYW5kaWRhdGUobmV3IFJUQ0ljZUNhbmRpZGF0ZShtZXNzYWdlLmNhbmRpZGF0ZXNbaV0pKS50aGVuKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZyhcImFkZEljZUNhbmRpZGF0ZSA6IHN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGVtcEVycm9yID0gRVJST1JTW1BMQVlFUl9XRUJSVENfQUREX0lDRUNBTkRJREFURV9FUlJPUl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBFcnJvci5lcnJvciA9IGVycm9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgd3Mub25lcnJvciA9IGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBFcnJvciA9IEVSUk9SU1tQTEFZRVJfV0VCUlRDX1dTX0VSUk9SXTtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wRXJyb3IuZXJyb3IgPSBlcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZVBlZXIodGVtcEVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QoZSk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9Y2F0Y2goZXJyb3Ipe1xyXG4gICAgICAgICAgICAgICAgY2xvc2VQZWVyKGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlUGVlcihlcnJvcikge1xyXG4gICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZygnV2ViUlRDIExvYWRlciBjbG9zZVBlZWFyKCknKTtcclxuICAgICAgICBpZih3cykge1xyXG4gICAgICAgICAgICBPdmVuUGxheWVyQ29uc29sZS5sb2coJ0Nsb3Npbmcgd2Vic29ja2V0IGNvbm5lY3Rpb24uLi4nKTtcclxuICAgICAgICAgICAgT3ZlblBsYXllckNvbnNvbGUubG9nKFwiU2VuZCBTaWduYWxpbmcgOiBTdG9wLlwiKTtcclxuICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgMCAoQ09OTkVDVElORylcclxuICAgICAgICAgICAgMSAoT1BFTilcclxuICAgICAgICAgICAgMiAoQ0xPU0lORylcclxuICAgICAgICAgICAgMyAoQ0xPU0VEKVxyXG4gICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBpZih3cy5yZWFkeVN0YXRlID09IDEpe1xyXG4gICAgICAgICAgICAgICAgd3Muc2VuZChKU09OLnN0cmluZ2lmeSh7Y29tbWFuZCA6IFwic3RvcFwifSkpO1xyXG4gICAgICAgICAgICAgICAgd3MuY2xvc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB3cyA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHBlZXJDb25uZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIE92ZW5QbGF5ZXJDb25zb2xlLmxvZygnQ2xvc2luZyBwZWVyIGNvbm5lY3Rpb24uLi4nKTtcclxuICAgICAgICAgICAgaWYoc3RhdGlzdGljc1RpbWVyKXtjbGVhclRpbWVvdXQoc3RhdGlzdGljc1RpbWVyKTt9XHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIHBlZXJDb25uZWN0aW9uID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZXJyb3Ipe1xyXG4gICAgICAgICAgICBlcnJvclRyaWdnZXIoZXJyb3IsIHByb3ZpZGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHRoYXQuY29ubmVjdCA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gaW5pdGlhbGl6ZSgpO1xyXG4gICAgfTtcclxuICAgIHRoYXQuZGVzdHJveSA9ICgpID0+IHtcclxuICAgICAgICBwZWVyQ29ubmVjdGlvbi5sb2coXCJXRUJSVEMgTE9BREVSIGRlc3Ryb3lcIik7XHJcbiAgICAgICAgY2xvc2VQZWVyKCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHRoYXQ7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBXZWJSVENMb2FkZXI7XHJcbiIsIihmdW5jdGlvbihmKXtpZih0eXBlb2YgZXhwb3J0cz09PVwib2JqZWN0XCImJnR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiKXttb2R1bGUuZXhwb3J0cz1mKCl9ZWxzZSBpZih0eXBlb2YgZGVmaW5lPT09XCJmdW5jdGlvblwiJiZkZWZpbmUuYW1kKXtkZWZpbmUoW10sZil9ZWxzZXt2YXIgZztpZih0eXBlb2Ygd2luZG93IT09XCJ1bmRlZmluZWRcIil7Zz13aW5kb3d9ZWxzZSBpZih0eXBlb2YgZ2xvYmFsIT09XCJ1bmRlZmluZWRcIil7Zz1nbG9iYWx9ZWxzZSBpZih0eXBlb2Ygc2VsZiE9PVwidW5kZWZpbmVkXCIpe2c9c2VsZn1lbHNle2c9dGhpc31nLmFkYXB0ZXIgPSBmKCl9fSkoZnVuY3Rpb24oKXt2YXIgZGVmaW5lLG1vZHVsZSxleHBvcnRzO3JldHVybiAoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcbi8qXHJcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTcgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXHJcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcclxuICogIHRyZWUuXHJcbiAqL1xyXG4gLyogZXNsaW50LWVudiBub2RlICovXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBTRFBVdGlscyA9IHJlcXVpcmUoJ3NkcCcpO1xyXG5cclxuZnVuY3Rpb24gd3JpdGVNZWRpYVNlY3Rpb24odHJhbnNjZWl2ZXIsIGNhcHMsIHR5cGUsIHN0cmVhbSwgZHRsc1JvbGUpIHtcclxuICB2YXIgc2RwID0gU0RQVXRpbHMud3JpdGVSdHBEZXNjcmlwdGlvbih0cmFuc2NlaXZlci5raW5kLCBjYXBzKTtcclxuXHJcbiAgLy8gTWFwIElDRSBwYXJhbWV0ZXJzICh1ZnJhZywgcHdkKSB0byBTRFAuXHJcbiAgc2RwICs9IFNEUFV0aWxzLndyaXRlSWNlUGFyYW1ldGVycyhcclxuICAgICAgdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIuZ2V0TG9jYWxQYXJhbWV0ZXJzKCkpO1xyXG5cclxuICAvLyBNYXAgRFRMUyBwYXJhbWV0ZXJzIHRvIFNEUC5cclxuICBzZHAgKz0gU0RQVXRpbHMud3JpdGVEdGxzUGFyYW1ldGVycyhcclxuICAgICAgdHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydC5nZXRMb2NhbFBhcmFtZXRlcnMoKSxcclxuICAgICAgdHlwZSA9PT0gJ29mZmVyJyA/ICdhY3RwYXNzJyA6IGR0bHNSb2xlIHx8ICdhY3RpdmUnKTtcclxuXHJcbiAgc2RwICs9ICdhPW1pZDonICsgdHJhbnNjZWl2ZXIubWlkICsgJ1xcclxcbic7XHJcblxyXG4gIGlmICh0cmFuc2NlaXZlci5ydHBTZW5kZXIgJiYgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIpIHtcclxuICAgIHNkcCArPSAnYT1zZW5kcmVjdlxcclxcbic7XHJcbiAgfSBlbHNlIGlmICh0cmFuc2NlaXZlci5ydHBTZW5kZXIpIHtcclxuICAgIHNkcCArPSAnYT1zZW5kb25seVxcclxcbic7XHJcbiAgfSBlbHNlIGlmICh0cmFuc2NlaXZlci5ydHBSZWNlaXZlcikge1xyXG4gICAgc2RwICs9ICdhPXJlY3Zvbmx5XFxyXFxuJztcclxuICB9IGVsc2Uge1xyXG4gICAgc2RwICs9ICdhPWluYWN0aXZlXFxyXFxuJztcclxuICB9XHJcblxyXG4gIGlmICh0cmFuc2NlaXZlci5ydHBTZW5kZXIpIHtcclxuICAgIHZhciB0cmFja0lkID0gdHJhbnNjZWl2ZXIucnRwU2VuZGVyLl9pbml0aWFsVHJhY2tJZCB8fFxyXG4gICAgICAgIHRyYW5zY2VpdmVyLnJ0cFNlbmRlci50cmFjay5pZDtcclxuICAgIHRyYW5zY2VpdmVyLnJ0cFNlbmRlci5faW5pdGlhbFRyYWNrSWQgPSB0cmFja0lkO1xyXG4gICAgLy8gc3BlYy5cclxuICAgIHZhciBtc2lkID0gJ21zaWQ6JyArIChzdHJlYW0gPyBzdHJlYW0uaWQgOiAnLScpICsgJyAnICtcclxuICAgICAgICB0cmFja0lkICsgJ1xcclxcbic7XHJcbiAgICBzZHAgKz0gJ2E9JyArIG1zaWQ7XHJcbiAgICAvLyBmb3IgQ2hyb21lLiBMZWdhY3kgc2hvdWxkIG5vIGxvbmdlciBiZSByZXF1aXJlZC5cclxuICAgIHNkcCArPSAnYT1zc3JjOicgKyB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmMgK1xyXG4gICAgICAgICcgJyArIG1zaWQ7XHJcblxyXG4gICAgLy8gUlRYXHJcbiAgICBpZiAodHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHgpIHtcclxuICAgICAgc2RwICs9ICdhPXNzcmM6JyArIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4LnNzcmMgK1xyXG4gICAgICAgICAgJyAnICsgbXNpZDtcclxuICAgICAgc2RwICs9ICdhPXNzcmMtZ3JvdXA6RklEICcgK1xyXG4gICAgICAgICAgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjICsgJyAnICtcclxuICAgICAgICAgIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4LnNzcmMgK1xyXG4gICAgICAgICAgJ1xcclxcbic7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8vIEZJWE1FOiB0aGlzIHNob3VsZCBiZSB3cml0dGVuIGJ5IHdyaXRlUnRwRGVzY3JpcHRpb24uXHJcbiAgc2RwICs9ICdhPXNzcmM6JyArIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYyArXHJcbiAgICAgICcgY25hbWU6JyArIFNEUFV0aWxzLmxvY2FsQ05hbWUgKyAnXFxyXFxuJztcclxuICBpZiAodHJhbnNjZWl2ZXIucnRwU2VuZGVyICYmIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4KSB7XHJcbiAgICBzZHAgKz0gJ2E9c3NyYzonICsgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHguc3NyYyArXHJcbiAgICAgICAgJyBjbmFtZTonICsgU0RQVXRpbHMubG9jYWxDTmFtZSArICdcXHJcXG4nO1xyXG4gIH1cclxuICByZXR1cm4gc2RwO1xyXG59XHJcblxyXG4vLyBFZGdlIGRvZXMgbm90IGxpa2VcclxuLy8gMSkgc3R1bjogZmlsdGVyZWQgYWZ0ZXIgMTQzOTMgdW5sZXNzID90cmFuc3BvcnQ9dWRwIGlzIHByZXNlbnRcclxuLy8gMikgdHVybjogdGhhdCBkb2VzIG5vdCBoYXZlIGFsbCBvZiB0dXJuOmhvc3Q6cG9ydD90cmFuc3BvcnQ9dWRwXHJcbi8vIDMpIHR1cm46IHdpdGggaXB2NiBhZGRyZXNzZXNcclxuLy8gNCkgdHVybjogb2NjdXJyaW5nIG11bGlwbGUgdGltZXNcclxuZnVuY3Rpb24gZmlsdGVySWNlU2VydmVycyhpY2VTZXJ2ZXJzLCBlZGdlVmVyc2lvbikge1xyXG4gIHZhciBoYXNUdXJuID0gZmFsc2U7XHJcbiAgaWNlU2VydmVycyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoaWNlU2VydmVycykpO1xyXG4gIHJldHVybiBpY2VTZXJ2ZXJzLmZpbHRlcihmdW5jdGlvbihzZXJ2ZXIpIHtcclxuICAgIGlmIChzZXJ2ZXIgJiYgKHNlcnZlci51cmxzIHx8IHNlcnZlci51cmwpKSB7XHJcbiAgICAgIHZhciB1cmxzID0gc2VydmVyLnVybHMgfHwgc2VydmVyLnVybDtcclxuICAgICAgaWYgKHNlcnZlci51cmwgJiYgIXNlcnZlci51cmxzKSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKCdSVENJY2VTZXJ2ZXIudXJsIGlzIGRlcHJlY2F0ZWQhIFVzZSB1cmxzIGluc3RlYWQuJyk7XHJcbiAgICAgIH1cclxuICAgICAgdmFyIGlzU3RyaW5nID0gdHlwZW9mIHVybHMgPT09ICdzdHJpbmcnO1xyXG4gICAgICBpZiAoaXNTdHJpbmcpIHtcclxuICAgICAgICB1cmxzID0gW3VybHNdO1xyXG4gICAgICB9XHJcbiAgICAgIHVybHMgPSB1cmxzLmZpbHRlcihmdW5jdGlvbih1cmwpIHtcclxuICAgICAgICB2YXIgdmFsaWRUdXJuID0gdXJsLmluZGV4T2YoJ3R1cm46JykgPT09IDAgJiZcclxuICAgICAgICAgICAgdXJsLmluZGV4T2YoJ3RyYW5zcG9ydD11ZHAnKSAhPT0gLTEgJiZcclxuICAgICAgICAgICAgdXJsLmluZGV4T2YoJ3R1cm46WycpID09PSAtMSAmJlxyXG4gICAgICAgICAgICAhaGFzVHVybjtcclxuXHJcbiAgICAgICAgaWYgKHZhbGlkVHVybikge1xyXG4gICAgICAgICAgaGFzVHVybiA9IHRydWU7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVybC5pbmRleE9mKCdzdHVuOicpID09PSAwICYmIGVkZ2VWZXJzaW9uID49IDE0MzkzICYmXHJcbiAgICAgICAgICAgIHVybC5pbmRleE9mKCc/dHJhbnNwb3J0PXVkcCcpID09PSAtMTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBkZWxldGUgc2VydmVyLnVybDtcclxuICAgICAgc2VydmVyLnVybHMgPSBpc1N0cmluZyA/IHVybHNbMF0gOiB1cmxzO1xyXG4gICAgICByZXR1cm4gISF1cmxzLmxlbmd0aDtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuLy8gRGV0ZXJtaW5lcyB0aGUgaW50ZXJzZWN0aW9uIG9mIGxvY2FsIGFuZCByZW1vdGUgY2FwYWJpbGl0aWVzLlxyXG5mdW5jdGlvbiBnZXRDb21tb25DYXBhYmlsaXRpZXMobG9jYWxDYXBhYmlsaXRpZXMsIHJlbW90ZUNhcGFiaWxpdGllcykge1xyXG4gIHZhciBjb21tb25DYXBhYmlsaXRpZXMgPSB7XHJcbiAgICBjb2RlY3M6IFtdLFxyXG4gICAgaGVhZGVyRXh0ZW5zaW9uczogW10sXHJcbiAgICBmZWNNZWNoYW5pc21zOiBbXVxyXG4gIH07XHJcblxyXG4gIHZhciBmaW5kQ29kZWNCeVBheWxvYWRUeXBlID0gZnVuY3Rpb24ocHQsIGNvZGVjcykge1xyXG4gICAgcHQgPSBwYXJzZUludChwdCwgMTApO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb2RlY3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKGNvZGVjc1tpXS5wYXlsb2FkVHlwZSA9PT0gcHQgfHxcclxuICAgICAgICAgIGNvZGVjc1tpXS5wcmVmZXJyZWRQYXlsb2FkVHlwZSA9PT0gcHQpIHtcclxuICAgICAgICByZXR1cm4gY29kZWNzW2ldO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgdmFyIHJ0eENhcGFiaWxpdHlNYXRjaGVzID0gZnVuY3Rpb24obFJ0eCwgclJ0eCwgbENvZGVjcywgckNvZGVjcykge1xyXG4gICAgdmFyIGxDb2RlYyA9IGZpbmRDb2RlY0J5UGF5bG9hZFR5cGUobFJ0eC5wYXJhbWV0ZXJzLmFwdCwgbENvZGVjcyk7XHJcbiAgICB2YXIgckNvZGVjID0gZmluZENvZGVjQnlQYXlsb2FkVHlwZShyUnR4LnBhcmFtZXRlcnMuYXB0LCByQ29kZWNzKTtcclxuICAgIHJldHVybiBsQ29kZWMgJiYgckNvZGVjICYmXHJcbiAgICAgICAgbENvZGVjLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gckNvZGVjLm5hbWUudG9Mb3dlckNhc2UoKTtcclxuICB9O1xyXG5cclxuICBsb2NhbENhcGFiaWxpdGllcy5jb2RlY3MuZm9yRWFjaChmdW5jdGlvbihsQ29kZWMpIHtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVtb3RlQ2FwYWJpbGl0aWVzLmNvZGVjcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICB2YXIgckNvZGVjID0gcmVtb3RlQ2FwYWJpbGl0aWVzLmNvZGVjc1tpXTtcclxuICAgICAgaWYgKGxDb2RlYy5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IHJDb2RlYy5uYW1lLnRvTG93ZXJDYXNlKCkgJiZcclxuICAgICAgICAgIGxDb2RlYy5jbG9ja1JhdGUgPT09IHJDb2RlYy5jbG9ja1JhdGUpIHtcclxuICAgICAgICBpZiAobENvZGVjLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3J0eCcgJiZcclxuICAgICAgICAgICAgbENvZGVjLnBhcmFtZXRlcnMgJiYgckNvZGVjLnBhcmFtZXRlcnMuYXB0KSB7XHJcbiAgICAgICAgICAvLyBmb3IgUlRYIHdlIG5lZWQgdG8gZmluZCB0aGUgbG9jYWwgcnR4IHRoYXQgaGFzIGEgYXB0XHJcbiAgICAgICAgICAvLyB3aGljaCBwb2ludHMgdG8gdGhlIHNhbWUgbG9jYWwgY29kZWMgYXMgdGhlIHJlbW90ZSBvbmUuXHJcbiAgICAgICAgICBpZiAoIXJ0eENhcGFiaWxpdHlNYXRjaGVzKGxDb2RlYywgckNvZGVjLFxyXG4gICAgICAgICAgICAgIGxvY2FsQ2FwYWJpbGl0aWVzLmNvZGVjcywgcmVtb3RlQ2FwYWJpbGl0aWVzLmNvZGVjcykpIHtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJDb2RlYyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkockNvZGVjKSk7IC8vIGRlZXBjb3B5XHJcbiAgICAgICAgLy8gbnVtYmVyIG9mIGNoYW5uZWxzIGlzIHRoZSBoaWdoZXN0IGNvbW1vbiBudW1iZXIgb2YgY2hhbm5lbHNcclxuICAgICAgICByQ29kZWMubnVtQ2hhbm5lbHMgPSBNYXRoLm1pbihsQ29kZWMubnVtQ2hhbm5lbHMsXHJcbiAgICAgICAgICAgIHJDb2RlYy5udW1DaGFubmVscyk7XHJcbiAgICAgICAgLy8gcHVzaCByQ29kZWMgc28gd2UgcmVwbHkgd2l0aCBvZmZlcmVyIHBheWxvYWQgdHlwZVxyXG4gICAgICAgIGNvbW1vbkNhcGFiaWxpdGllcy5jb2RlY3MucHVzaChyQ29kZWMpO1xyXG5cclxuICAgICAgICAvLyBkZXRlcm1pbmUgY29tbW9uIGZlZWRiYWNrIG1lY2hhbmlzbXNcclxuICAgICAgICByQ29kZWMucnRjcEZlZWRiYWNrID0gckNvZGVjLnJ0Y3BGZWVkYmFjay5maWx0ZXIoZnVuY3Rpb24oZmIpIHtcclxuICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbENvZGVjLnJ0Y3BGZWVkYmFjay5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICBpZiAobENvZGVjLnJ0Y3BGZWVkYmFja1tqXS50eXBlID09PSBmYi50eXBlICYmXHJcbiAgICAgICAgICAgICAgICBsQ29kZWMucnRjcEZlZWRiYWNrW2pdLnBhcmFtZXRlciA9PT0gZmIucGFyYW1ldGVyKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBGSVhNRTogYWxzbyBuZWVkIHRvIGRldGVybWluZSAucGFyYW1ldGVyc1xyXG4gICAgICAgIC8vICBzZWUgaHR0cHM6Ly9naXRodWIuY29tL29wZW5wZWVyL29ydGMvaXNzdWVzLzU2OVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIGxvY2FsQ2FwYWJpbGl0aWVzLmhlYWRlckV4dGVuc2lvbnMuZm9yRWFjaChmdW5jdGlvbihsSGVhZGVyRXh0ZW5zaW9uKSB7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlbW90ZUNhcGFiaWxpdGllcy5oZWFkZXJFeHRlbnNpb25zLmxlbmd0aDtcclxuICAgICAgICAgaSsrKSB7XHJcbiAgICAgIHZhciBySGVhZGVyRXh0ZW5zaW9uID0gcmVtb3RlQ2FwYWJpbGl0aWVzLmhlYWRlckV4dGVuc2lvbnNbaV07XHJcbiAgICAgIGlmIChsSGVhZGVyRXh0ZW5zaW9uLnVyaSA9PT0gckhlYWRlckV4dGVuc2lvbi51cmkpIHtcclxuICAgICAgICBjb21tb25DYXBhYmlsaXRpZXMuaGVhZGVyRXh0ZW5zaW9ucy5wdXNoKHJIZWFkZXJFeHRlbnNpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8vIEZJWE1FOiBmZWNNZWNoYW5pc21zXHJcbiAgcmV0dXJuIGNvbW1vbkNhcGFiaWxpdGllcztcclxufVxyXG5cclxuLy8gaXMgYWN0aW9uPXNldExvY2FsRGVzY3JpcHRpb24gd2l0aCB0eXBlIGFsbG93ZWQgaW4gc2lnbmFsaW5nU3RhdGVcclxuZnVuY3Rpb24gaXNBY3Rpb25BbGxvd2VkSW5TaWduYWxpbmdTdGF0ZShhY3Rpb24sIHR5cGUsIHNpZ25hbGluZ1N0YXRlKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIG9mZmVyOiB7XHJcbiAgICAgIHNldExvY2FsRGVzY3JpcHRpb246IFsnc3RhYmxlJywgJ2hhdmUtbG9jYWwtb2ZmZXInXSxcclxuICAgICAgc2V0UmVtb3RlRGVzY3JpcHRpb246IFsnc3RhYmxlJywgJ2hhdmUtcmVtb3RlLW9mZmVyJ11cclxuICAgIH0sXHJcbiAgICBhbnN3ZXI6IHtcclxuICAgICAgc2V0TG9jYWxEZXNjcmlwdGlvbjogWydoYXZlLXJlbW90ZS1vZmZlcicsICdoYXZlLWxvY2FsLXByYW5zd2VyJ10sXHJcbiAgICAgIHNldFJlbW90ZURlc2NyaXB0aW9uOiBbJ2hhdmUtbG9jYWwtb2ZmZXInLCAnaGF2ZS1yZW1vdGUtcHJhbnN3ZXInXVxyXG4gICAgfVxyXG4gIH1bdHlwZV1bYWN0aW9uXS5pbmRleE9mKHNpZ25hbGluZ1N0YXRlKSAhPT0gLTE7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1heWJlQWRkQ2FuZGlkYXRlKGljZVRyYW5zcG9ydCwgY2FuZGlkYXRlKSB7XHJcbiAgLy8gRWRnZSdzIGludGVybmFsIHJlcHJlc2VudGF0aW9uIGFkZHMgc29tZSBmaWVsZHMgdGhlcmVmb3JlXHJcbiAgLy8gbm90IGFsbCBmaWVsZNGVIGFyZSB0YWtlbiBpbnRvIGFjY291bnQuXHJcbiAgdmFyIGFscmVhZHlBZGRlZCA9IGljZVRyYW5zcG9ydC5nZXRSZW1vdGVDYW5kaWRhdGVzKClcclxuICAgICAgLmZpbmQoZnVuY3Rpb24ocmVtb3RlQ2FuZGlkYXRlKSB7XHJcbiAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZS5mb3VuZGF0aW9uID09PSByZW1vdGVDYW5kaWRhdGUuZm91bmRhdGlvbiAmJlxyXG4gICAgICAgICAgICBjYW5kaWRhdGUuaXAgPT09IHJlbW90ZUNhbmRpZGF0ZS5pcCAmJlxyXG4gICAgICAgICAgICBjYW5kaWRhdGUucG9ydCA9PT0gcmVtb3RlQ2FuZGlkYXRlLnBvcnQgJiZcclxuICAgICAgICAgICAgY2FuZGlkYXRlLnByaW9yaXR5ID09PSByZW1vdGVDYW5kaWRhdGUucHJpb3JpdHkgJiZcclxuICAgICAgICAgICAgY2FuZGlkYXRlLnByb3RvY29sID09PSByZW1vdGVDYW5kaWRhdGUucHJvdG9jb2wgJiZcclxuICAgICAgICAgICAgY2FuZGlkYXRlLnR5cGUgPT09IHJlbW90ZUNhbmRpZGF0ZS50eXBlO1xyXG4gICAgICB9KTtcclxuICBpZiAoIWFscmVhZHlBZGRlZCkge1xyXG4gICAgaWNlVHJhbnNwb3J0LmFkZFJlbW90ZUNhbmRpZGF0ZShjYW5kaWRhdGUpO1xyXG4gIH1cclxuICByZXR1cm4gIWFscmVhZHlBZGRlZDtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIG1ha2VFcnJvcihuYW1lLCBkZXNjcmlwdGlvbikge1xyXG4gIHZhciBlID0gbmV3IEVycm9yKGRlc2NyaXB0aW9uKTtcclxuICBlLm5hbWUgPSBuYW1lO1xyXG4gIC8vIGxlZ2FjeSBlcnJvciBjb2RlcyBmcm9tIGh0dHBzOi8vaGV5Y2FtLmdpdGh1Yi5pby93ZWJpZGwvI2lkbC1ET01FeGNlcHRpb24tZXJyb3ItbmFtZXNcclxuICBlLmNvZGUgPSB7XHJcbiAgICBOb3RTdXBwb3J0ZWRFcnJvcjogOSxcclxuICAgIEludmFsaWRTdGF0ZUVycm9yOiAxMSxcclxuICAgIEludmFsaWRBY2Nlc3NFcnJvcjogMTUsXHJcbiAgICBUeXBlRXJyb3I6IHVuZGVmaW5lZCxcclxuICAgIE9wZXJhdGlvbkVycm9yOiB1bmRlZmluZWRcclxuICB9W25hbWVdO1xyXG4gIHJldHVybiBlO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHdpbmRvdywgZWRnZVZlcnNpb24pIHtcclxuICAvLyBodHRwczovL3czYy5naXRodWIuaW8vbWVkaWFjYXB0dXJlLW1haW4vI21lZGlhc3RyZWFtXHJcbiAgLy8gSGVscGVyIGZ1bmN0aW9uIHRvIGFkZCB0aGUgdHJhY2sgdG8gdGhlIHN0cmVhbSBhbmRcclxuICAvLyBkaXNwYXRjaCB0aGUgZXZlbnQgb3Vyc2VsdmVzLlxyXG4gIGZ1bmN0aW9uIGFkZFRyYWNrVG9TdHJlYW1BbmRGaXJlRXZlbnQodHJhY2ssIHN0cmVhbSkge1xyXG4gICAgc3RyZWFtLmFkZFRyYWNrKHRyYWNrKTtcclxuICAgIHN0cmVhbS5kaXNwYXRjaEV2ZW50KG5ldyB3aW5kb3cuTWVkaWFTdHJlYW1UcmFja0V2ZW50KCdhZGR0cmFjaycsXHJcbiAgICAgICAge3RyYWNrOiB0cmFja30pKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlbW92ZVRyYWNrRnJvbVN0cmVhbUFuZEZpcmVFdmVudCh0cmFjaywgc3RyZWFtKSB7XHJcbiAgICBzdHJlYW0ucmVtb3ZlVHJhY2sodHJhY2spO1xyXG4gICAgc3RyZWFtLmRpc3BhdGNoRXZlbnQobmV3IHdpbmRvdy5NZWRpYVN0cmVhbVRyYWNrRXZlbnQoJ3JlbW92ZXRyYWNrJyxcclxuICAgICAgICB7dHJhY2s6IHRyYWNrfSkpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZmlyZUFkZFRyYWNrKHBjLCB0cmFjaywgcmVjZWl2ZXIsIHN0cmVhbXMpIHtcclxuICAgIHZhciB0cmFja0V2ZW50ID0gbmV3IEV2ZW50KCd0cmFjaycpO1xyXG4gICAgdHJhY2tFdmVudC50cmFjayA9IHRyYWNrO1xyXG4gICAgdHJhY2tFdmVudC5yZWNlaXZlciA9IHJlY2VpdmVyO1xyXG4gICAgdHJhY2tFdmVudC50cmFuc2NlaXZlciA9IHtyZWNlaXZlcjogcmVjZWl2ZXJ9O1xyXG4gICAgdHJhY2tFdmVudC5zdHJlYW1zID0gc3RyZWFtcztcclxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICBwYy5fZGlzcGF0Y2hFdmVudCgndHJhY2snLCB0cmFja0V2ZW50KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdmFyIFJUQ1BlZXJDb25uZWN0aW9uID0gZnVuY3Rpb24oY29uZmlnKSB7XHJcbiAgICB2YXIgcGMgPSB0aGlzO1xyXG5cclxuICAgIHZhciBfZXZlbnRUYXJnZXQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICBbJ2FkZEV2ZW50TGlzdGVuZXInLCAncmVtb3ZlRXZlbnRMaXN0ZW5lcicsICdkaXNwYXRjaEV2ZW50J11cclxuICAgICAgICAuZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcclxuICAgICAgICAgIHBjW21ldGhvZF0gPSBfZXZlbnRUYXJnZXRbbWV0aG9kXS5iaW5kKF9ldmVudFRhcmdldCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgdGhpcy5jYW5Ucmlja2xlSWNlQ2FuZGlkYXRlcyA9IG51bGw7XHJcblxyXG4gICAgdGhpcy5uZWVkTmVnb3RpYXRpb24gPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmxvY2FsU3RyZWFtcyA9IFtdO1xyXG4gICAgdGhpcy5yZW1vdGVTdHJlYW1zID0gW107XHJcblxyXG4gICAgdGhpcy5sb2NhbERlc2NyaXB0aW9uID0gbnVsbDtcclxuICAgIHRoaXMucmVtb3RlRGVzY3JpcHRpb24gPSBudWxsO1xyXG5cclxuICAgIHRoaXMuc2lnbmFsaW5nU3RhdGUgPSAnc3RhYmxlJztcclxuICAgIHRoaXMuaWNlQ29ubmVjdGlvblN0YXRlID0gJ25ldyc7XHJcbiAgICB0aGlzLmNvbm5lY3Rpb25TdGF0ZSA9ICduZXcnO1xyXG4gICAgdGhpcy5pY2VHYXRoZXJpbmdTdGF0ZSA9ICduZXcnO1xyXG5cclxuICAgIGNvbmZpZyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoY29uZmlnIHx8IHt9KSk7XHJcblxyXG4gICAgdGhpcy51c2luZ0J1bmRsZSA9IGNvbmZpZy5idW5kbGVQb2xpY3kgPT09ICdtYXgtYnVuZGxlJztcclxuICAgIGlmIChjb25maWcucnRjcE11eFBvbGljeSA9PT0gJ25lZ290aWF0ZScpIHtcclxuICAgICAgdGhyb3cobWFrZUVycm9yKCdOb3RTdXBwb3J0ZWRFcnJvcicsXHJcbiAgICAgICAgICAncnRjcE11eFBvbGljeSBcXCduZWdvdGlhdGVcXCcgaXMgbm90IHN1cHBvcnRlZCcpKTtcclxuICAgIH0gZWxzZSBpZiAoIWNvbmZpZy5ydGNwTXV4UG9saWN5KSB7XHJcbiAgICAgIGNvbmZpZy5ydGNwTXV4UG9saWN5ID0gJ3JlcXVpcmUnO1xyXG4gICAgfVxyXG5cclxuICAgIHN3aXRjaCAoY29uZmlnLmljZVRyYW5zcG9ydFBvbGljeSkge1xyXG4gICAgICBjYXNlICdhbGwnOlxyXG4gICAgICBjYXNlICdyZWxheSc6XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgY29uZmlnLmljZVRyYW5zcG9ydFBvbGljeSA9ICdhbGwnO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIHN3aXRjaCAoY29uZmlnLmJ1bmRsZVBvbGljeSkge1xyXG4gICAgICBjYXNlICdiYWxhbmNlZCc6XHJcbiAgICAgIGNhc2UgJ21heC1jb21wYXQnOlxyXG4gICAgICBjYXNlICdtYXgtYnVuZGxlJzpcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBjb25maWcuYnVuZGxlUG9saWN5ID0gJ2JhbGFuY2VkJztcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICBjb25maWcuaWNlU2VydmVycyA9IGZpbHRlckljZVNlcnZlcnMoY29uZmlnLmljZVNlcnZlcnMgfHwgW10sIGVkZ2VWZXJzaW9uKTtcclxuXHJcbiAgICB0aGlzLl9pY2VHYXRoZXJlcnMgPSBbXTtcclxuICAgIGlmIChjb25maWcuaWNlQ2FuZGlkYXRlUG9vbFNpemUpIHtcclxuICAgICAgZm9yICh2YXIgaSA9IGNvbmZpZy5pY2VDYW5kaWRhdGVQb29sU2l6ZTsgaSA+IDA7IGktLSkge1xyXG4gICAgICAgIHRoaXMuX2ljZUdhdGhlcmVycy5wdXNoKG5ldyB3aW5kb3cuUlRDSWNlR2F0aGVyZXIoe1xyXG4gICAgICAgICAgaWNlU2VydmVyczogY29uZmlnLmljZVNlcnZlcnMsXHJcbiAgICAgICAgICBnYXRoZXJQb2xpY3k6IGNvbmZpZy5pY2VUcmFuc3BvcnRQb2xpY3lcclxuICAgICAgICB9KSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbmZpZy5pY2VDYW5kaWRhdGVQb29sU2l6ZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xyXG5cclxuICAgIC8vIHBlci10cmFjayBpY2VHYXRoZXJzLCBpY2VUcmFuc3BvcnRzLCBkdGxzVHJhbnNwb3J0cywgcnRwU2VuZGVycywgLi4uXHJcbiAgICAvLyBldmVyeXRoaW5nIHRoYXQgaXMgbmVlZGVkIHRvIGRlc2NyaWJlIGEgU0RQIG0tbGluZS5cclxuICAgIHRoaXMudHJhbnNjZWl2ZXJzID0gW107XHJcblxyXG4gICAgdGhpcy5fc2RwU2Vzc2lvbklkID0gU0RQVXRpbHMuZ2VuZXJhdGVTZXNzaW9uSWQoKTtcclxuICAgIHRoaXMuX3NkcFNlc3Npb25WZXJzaW9uID0gMDtcclxuXHJcbiAgICB0aGlzLl9kdGxzUm9sZSA9IHVuZGVmaW5lZDsgLy8gcm9sZSBmb3IgYT1zZXR1cCB0byB1c2UgaW4gYW5zd2Vycy5cclxuXHJcbiAgICB0aGlzLl9pc0Nsb3NlZCA9IGZhbHNlO1xyXG4gIH07XHJcblxyXG4gIC8vIHNldCB1cCBldmVudCBoYW5kbGVycyBvbiBwcm90b3R5cGVcclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub25pY2VjYW5kaWRhdGUgPSBudWxsO1xyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5vbmFkZHN0cmVhbSA9IG51bGw7XHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9udHJhY2sgPSBudWxsO1xyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5vbnJlbW92ZXN0cmVhbSA9IG51bGw7XHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9uc2lnbmFsaW5nc3RhdGVjaGFuZ2UgPSBudWxsO1xyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5vbmljZWNvbm5lY3Rpb25zdGF0ZWNoYW5nZSA9IG51bGw7XHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9uY29ubmVjdGlvbnN0YXRlY2hhbmdlID0gbnVsbDtcclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUub25pY2VnYXRoZXJpbmdzdGF0ZWNoYW5nZSA9IG51bGw7XHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLm9ubmVnb3RpYXRpb25uZWVkZWQgPSBudWxsO1xyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5vbmRhdGFjaGFubmVsID0gbnVsbDtcclxuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl9kaXNwYXRjaEV2ZW50ID0gZnVuY3Rpb24obmFtZSwgZXZlbnQpIHtcclxuICAgIGlmICh0aGlzLl9pc0Nsb3NlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG4gICAgaWYgKHR5cGVvZiB0aGlzWydvbicgKyBuYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICB0aGlzWydvbicgKyBuYW1lXShldmVudCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl9lbWl0R2F0aGVyaW5nU3RhdGVDaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgnaWNlZ2F0aGVyaW5nc3RhdGVjaGFuZ2UnKTtcclxuICAgIHRoaXMuX2Rpc3BhdGNoRXZlbnQoJ2ljZWdhdGhlcmluZ3N0YXRlY2hhbmdlJywgZXZlbnQpO1xyXG4gIH07XHJcblxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRDb25maWd1cmF0aW9uID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xyXG4gIH07XHJcblxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRMb2NhbFN0cmVhbXMgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLmxvY2FsU3RyZWFtcztcclxuICB9O1xyXG5cclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0UmVtb3RlU3RyZWFtcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucmVtb3RlU3RyZWFtcztcclxuICB9O1xyXG5cclxuICAvLyBpbnRlcm5hbCBoZWxwZXIgdG8gY3JlYXRlIGEgdHJhbnNjZWl2ZXIgb2JqZWN0LlxyXG4gIC8vICh3aGljaCBpcyBub3QgeWV0IHRoZSBzYW1lIGFzIHRoZSBXZWJSVEMgMS4wIHRyYW5zY2VpdmVyKVxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fY3JlYXRlVHJhbnNjZWl2ZXIgPSBmdW5jdGlvbihraW5kLCBkb05vdEFkZCkge1xyXG4gICAgdmFyIGhhc0J1bmRsZVRyYW5zcG9ydCA9IHRoaXMudHJhbnNjZWl2ZXJzLmxlbmd0aCA+IDA7XHJcbiAgICB2YXIgdHJhbnNjZWl2ZXIgPSB7XHJcbiAgICAgIHRyYWNrOiBudWxsLFxyXG4gICAgICBpY2VHYXRoZXJlcjogbnVsbCxcclxuICAgICAgaWNlVHJhbnNwb3J0OiBudWxsLFxyXG4gICAgICBkdGxzVHJhbnNwb3J0OiBudWxsLFxyXG4gICAgICBsb2NhbENhcGFiaWxpdGllczogbnVsbCxcclxuICAgICAgcmVtb3RlQ2FwYWJpbGl0aWVzOiBudWxsLFxyXG4gICAgICBydHBTZW5kZXI6IG51bGwsXHJcbiAgICAgIHJ0cFJlY2VpdmVyOiBudWxsLFxyXG4gICAgICBraW5kOiBraW5kLFxyXG4gICAgICBtaWQ6IG51bGwsXHJcbiAgICAgIHNlbmRFbmNvZGluZ1BhcmFtZXRlcnM6IG51bGwsXHJcbiAgICAgIHJlY3ZFbmNvZGluZ1BhcmFtZXRlcnM6IG51bGwsXHJcbiAgICAgIHN0cmVhbTogbnVsbCxcclxuICAgICAgYXNzb2NpYXRlZFJlbW90ZU1lZGlhU3RyZWFtczogW10sXHJcbiAgICAgIHdhbnRSZWNlaXZlOiB0cnVlXHJcbiAgICB9O1xyXG4gICAgaWYgKHRoaXMudXNpbmdCdW5kbGUgJiYgaGFzQnVuZGxlVHJhbnNwb3J0KSB7XHJcbiAgICAgIHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydCA9IHRoaXMudHJhbnNjZWl2ZXJzWzBdLmljZVRyYW5zcG9ydDtcclxuICAgICAgdHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydCA9IHRoaXMudHJhbnNjZWl2ZXJzWzBdLmR0bHNUcmFuc3BvcnQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgdHJhbnNwb3J0cyA9IHRoaXMuX2NyZWF0ZUljZUFuZER0bHNUcmFuc3BvcnRzKCk7XHJcbiAgICAgIHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydCA9IHRyYW5zcG9ydHMuaWNlVHJhbnNwb3J0O1xyXG4gICAgICB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0ID0gdHJhbnNwb3J0cy5kdGxzVHJhbnNwb3J0O1xyXG4gICAgfVxyXG4gICAgaWYgKCFkb05vdEFkZCkge1xyXG4gICAgICB0aGlzLnRyYW5zY2VpdmVycy5wdXNoKHRyYW5zY2VpdmVyKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cmFuc2NlaXZlcjtcclxuICB9O1xyXG5cclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2sgPSBmdW5jdGlvbih0cmFjaywgc3RyZWFtKSB7XHJcbiAgICBpZiAodGhpcy5faXNDbG9zZWQpIHtcclxuICAgICAgdGhyb3cgbWFrZUVycm9yKCdJbnZhbGlkU3RhdGVFcnJvcicsXHJcbiAgICAgICAgICAnQXR0ZW1wdGVkIHRvIGNhbGwgYWRkVHJhY2sgb24gYSBjbG9zZWQgcGVlcmNvbm5lY3Rpb24uJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGFscmVhZHlFeGlzdHMgPSB0aGlzLnRyYW5zY2VpdmVycy5maW5kKGZ1bmN0aW9uKHMpIHtcclxuICAgICAgcmV0dXJuIHMudHJhY2sgPT09IHRyYWNrO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKGFscmVhZHlFeGlzdHMpIHtcclxuICAgICAgdGhyb3cgbWFrZUVycm9yKCdJbnZhbGlkQWNjZXNzRXJyb3InLCAnVHJhY2sgYWxyZWFkeSBleGlzdHMuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHRyYW5zY2VpdmVyO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnRyYW5zY2VpdmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAoIXRoaXMudHJhbnNjZWl2ZXJzW2ldLnRyYWNrICYmXHJcbiAgICAgICAgICB0aGlzLnRyYW5zY2VpdmVyc1tpXS5raW5kID09PSB0cmFjay5raW5kKSB7XHJcbiAgICAgICAgdHJhbnNjZWl2ZXIgPSB0aGlzLnRyYW5zY2VpdmVyc1tpXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKCF0cmFuc2NlaXZlcikge1xyXG4gICAgICB0cmFuc2NlaXZlciA9IHRoaXMuX2NyZWF0ZVRyYW5zY2VpdmVyKHRyYWNrLmtpbmQpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX21heWJlRmlyZU5lZ290aWF0aW9uTmVlZGVkKCk7XHJcblxyXG4gICAgaWYgKHRoaXMubG9jYWxTdHJlYW1zLmluZGV4T2Yoc3RyZWFtKSA9PT0gLTEpIHtcclxuICAgICAgdGhpcy5sb2NhbFN0cmVhbXMucHVzaChzdHJlYW0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRyYW5zY2VpdmVyLnRyYWNrID0gdHJhY2s7XHJcbiAgICB0cmFuc2NlaXZlci5zdHJlYW0gPSBzdHJlYW07XHJcbiAgICB0cmFuc2NlaXZlci5ydHBTZW5kZXIgPSBuZXcgd2luZG93LlJUQ1J0cFNlbmRlcih0cmFjayxcclxuICAgICAgICB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0KTtcclxuICAgIHJldHVybiB0cmFuc2NlaXZlci5ydHBTZW5kZXI7XHJcbiAgfTtcclxuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xyXG4gICAgdmFyIHBjID0gdGhpcztcclxuICAgIGlmIChlZGdlVmVyc2lvbiA+PSAxNTAyNSkge1xyXG4gICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xyXG4gICAgICAgIHBjLmFkZFRyYWNrKHRyYWNrLCBzdHJlYW0pO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIENsb25lIGlzIG5lY2Vzc2FyeSBmb3IgbG9jYWwgZGVtb3MgbW9zdGx5LCBhdHRhY2hpbmcgZGlyZWN0bHlcclxuICAgICAgLy8gdG8gdHdvIGRpZmZlcmVudCBzZW5kZXJzIGRvZXMgbm90IHdvcmsgKGJ1aWxkIDEwNTQ3KS5cclxuICAgICAgLy8gRml4ZWQgaW4gMTUwMjUgKG9yIGVhcmxpZXIpXHJcbiAgICAgIHZhciBjbG9uZWRTdHJlYW0gPSBzdHJlYW0uY2xvbmUoKTtcclxuICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2ssIGlkeCkge1xyXG4gICAgICAgIHZhciBjbG9uZWRUcmFjayA9IGNsb25lZFN0cmVhbS5nZXRUcmFja3MoKVtpZHhdO1xyXG4gICAgICAgIHRyYWNrLmFkZEV2ZW50TGlzdGVuZXIoJ2VuYWJsZWQnLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgY2xvbmVkVHJhY2suZW5hYmxlZCA9IGV2ZW50LmVuYWJsZWQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBjbG9uZWRTdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xyXG4gICAgICAgIHBjLmFkZFRyYWNrKHRyYWNrLCBjbG9uZWRTdHJlYW0pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlVHJhY2sgPSBmdW5jdGlvbihzZW5kZXIpIHtcclxuICAgIGlmICh0aGlzLl9pc0Nsb3NlZCkge1xyXG4gICAgICB0aHJvdyBtYWtlRXJyb3IoJ0ludmFsaWRTdGF0ZUVycm9yJyxcclxuICAgICAgICAgICdBdHRlbXB0ZWQgdG8gY2FsbCByZW1vdmVUcmFjayBvbiBhIGNsb3NlZCBwZWVyY29ubmVjdGlvbi4nKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIShzZW5kZXIgaW5zdGFuY2VvZiB3aW5kb3cuUlRDUnRwU2VuZGVyKSkge1xyXG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCAxIG9mIFJUQ1BlZXJDb25uZWN0aW9uLnJlbW92ZVRyYWNrICcgK1xyXG4gICAgICAgICAgJ2RvZXMgbm90IGltcGxlbWVudCBpbnRlcmZhY2UgUlRDUnRwU2VuZGVyLicpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciB0cmFuc2NlaXZlciA9IHRoaXMudHJhbnNjZWl2ZXJzLmZpbmQoZnVuY3Rpb24odCkge1xyXG4gICAgICByZXR1cm4gdC5ydHBTZW5kZXIgPT09IHNlbmRlcjtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICghdHJhbnNjZWl2ZXIpIHtcclxuICAgICAgdGhyb3cgbWFrZUVycm9yKCdJbnZhbGlkQWNjZXNzRXJyb3InLFxyXG4gICAgICAgICAgJ1NlbmRlciB3YXMgbm90IGNyZWF0ZWQgYnkgdGhpcyBjb25uZWN0aW9uLicpO1xyXG4gICAgfVxyXG4gICAgdmFyIHN0cmVhbSA9IHRyYW5zY2VpdmVyLnN0cmVhbTtcclxuXHJcbiAgICB0cmFuc2NlaXZlci5ydHBTZW5kZXIuc3RvcCgpO1xyXG4gICAgdHJhbnNjZWl2ZXIucnRwU2VuZGVyID0gbnVsbDtcclxuICAgIHRyYW5zY2VpdmVyLnRyYWNrID0gbnVsbDtcclxuICAgIHRyYW5zY2VpdmVyLnN0cmVhbSA9IG51bGw7XHJcblxyXG4gICAgLy8gcmVtb3ZlIHRoZSBzdHJlYW0gZnJvbSB0aGUgc2V0IG9mIGxvY2FsIHN0cmVhbXNcclxuICAgIHZhciBsb2NhbFN0cmVhbXMgPSB0aGlzLnRyYW5zY2VpdmVycy5tYXAoZnVuY3Rpb24odCkge1xyXG4gICAgICByZXR1cm4gdC5zdHJlYW07XHJcbiAgICB9KTtcclxuICAgIGlmIChsb2NhbFN0cmVhbXMuaW5kZXhPZihzdHJlYW0pID09PSAtMSAmJlxyXG4gICAgICAgIHRoaXMubG9jYWxTdHJlYW1zLmluZGV4T2Yoc3RyZWFtKSA+IC0xKSB7XHJcbiAgICAgIHRoaXMubG9jYWxTdHJlYW1zLnNwbGljZSh0aGlzLmxvY2FsU3RyZWFtcy5pbmRleE9mKHN0cmVhbSksIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX21heWJlRmlyZU5lZ290aWF0aW9uTmVlZGVkKCk7XHJcbiAgfTtcclxuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xyXG4gICAgdmFyIHBjID0gdGhpcztcclxuICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XHJcbiAgICAgIHZhciBzZW5kZXIgPSBwYy5nZXRTZW5kZXJzKCkuZmluZChmdW5jdGlvbihzKSB7XHJcbiAgICAgICAgcmV0dXJuIHMudHJhY2sgPT09IHRyYWNrO1xyXG4gICAgICB9KTtcclxuICAgICAgaWYgKHNlbmRlcikge1xyXG4gICAgICAgIHBjLnJlbW92ZVRyYWNrKHNlbmRlcik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTZW5kZXJzID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy50cmFuc2NlaXZlcnMuZmlsdGVyKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XHJcbiAgICAgIHJldHVybiAhIXRyYW5zY2VpdmVyLnJ0cFNlbmRlcjtcclxuICAgIH0pXHJcbiAgICAubWFwKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XHJcbiAgICAgIHJldHVybiB0cmFuc2NlaXZlci5ydHBTZW5kZXI7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0UmVjZWl2ZXJzID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy50cmFuc2NlaXZlcnMuZmlsdGVyKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XHJcbiAgICAgIHJldHVybiAhIXRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyO1xyXG4gICAgfSlcclxuICAgIC5tYXAoZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcclxuICAgICAgcmV0dXJuIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcblxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fY3JlYXRlSWNlR2F0aGVyZXIgPSBmdW5jdGlvbihzZHBNTGluZUluZGV4LFxyXG4gICAgICB1c2luZ0J1bmRsZSkge1xyXG4gICAgdmFyIHBjID0gdGhpcztcclxuICAgIGlmICh1c2luZ0J1bmRsZSAmJiBzZHBNTGluZUluZGV4ID4gMCkge1xyXG4gICAgICByZXR1cm4gdGhpcy50cmFuc2NlaXZlcnNbMF0uaWNlR2F0aGVyZXI7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2ljZUdhdGhlcmVycy5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX2ljZUdhdGhlcmVycy5zaGlmdCgpO1xyXG4gICAgfVxyXG4gICAgdmFyIGljZUdhdGhlcmVyID0gbmV3IHdpbmRvdy5SVENJY2VHYXRoZXJlcih7XHJcbiAgICAgIGljZVNlcnZlcnM6IHRoaXMuX2NvbmZpZy5pY2VTZXJ2ZXJzLFxyXG4gICAgICBnYXRoZXJQb2xpY3k6IHRoaXMuX2NvbmZpZy5pY2VUcmFuc3BvcnRQb2xpY3lcclxuICAgIH0pO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGljZUdhdGhlcmVyLCAnc3RhdGUnLFxyXG4gICAgICAgIHt2YWx1ZTogJ25ldycsIHdyaXRhYmxlOiB0cnVlfVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5idWZmZXJlZENhbmRpZGF0ZUV2ZW50cyA9IFtdO1xyXG4gICAgdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uYnVmZmVyQ2FuZGlkYXRlcyA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIHZhciBlbmQgPSAhZXZlbnQuY2FuZGlkYXRlIHx8IE9iamVjdC5rZXlzKGV2ZW50LmNhbmRpZGF0ZSkubGVuZ3RoID09PSAwO1xyXG4gICAgICAvLyBwb2x5ZmlsbCBzaW5jZSBSVENJY2VHYXRoZXJlci5zdGF0ZSBpcyBub3QgaW1wbGVtZW50ZWQgaW5cclxuICAgICAgLy8gRWRnZSAxMDU0NyB5ZXQuXHJcbiAgICAgIGljZUdhdGhlcmVyLnN0YXRlID0gZW5kID8gJ2NvbXBsZXRlZCcgOiAnZ2F0aGVyaW5nJztcclxuICAgICAgaWYgKHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5idWZmZXJlZENhbmRpZGF0ZUV2ZW50cyAhPT0gbnVsbCkge1xyXG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5idWZmZXJlZENhbmRpZGF0ZUV2ZW50cy5wdXNoKGV2ZW50KTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIGljZUdhdGhlcmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvY2FsY2FuZGlkYXRlJyxcclxuICAgICAgdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uYnVmZmVyQ2FuZGlkYXRlcyk7XHJcbiAgICByZXR1cm4gaWNlR2F0aGVyZXI7XHJcbiAgfTtcclxuXHJcbiAgLy8gc3RhcnQgZ2F0aGVyaW5nIGZyb20gYW4gUlRDSWNlR2F0aGVyZXIuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl9nYXRoZXIgPSBmdW5jdGlvbihtaWQsIHNkcE1MaW5lSW5kZXgpIHtcclxuICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICB2YXIgaWNlR2F0aGVyZXIgPSB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5pY2VHYXRoZXJlcjtcclxuICAgIGlmIChpY2VHYXRoZXJlci5vbmxvY2FsY2FuZGlkYXRlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHZhciBidWZmZXJlZENhbmRpZGF0ZUV2ZW50cyA9XHJcbiAgICAgIHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmJ1ZmZlcmVkQ2FuZGlkYXRlRXZlbnRzO1xyXG4gICAgdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uYnVmZmVyZWRDYW5kaWRhdGVFdmVudHMgPSBudWxsO1xyXG4gICAgaWNlR2F0aGVyZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbG9jYWxjYW5kaWRhdGUnLFxyXG4gICAgICB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5idWZmZXJDYW5kaWRhdGVzKTtcclxuICAgIGljZUdhdGhlcmVyLm9ubG9jYWxjYW5kaWRhdGUgPSBmdW5jdGlvbihldnQpIHtcclxuICAgICAgaWYgKHBjLnVzaW5nQnVuZGxlICYmIHNkcE1MaW5lSW5kZXggPiAwKSB7XHJcbiAgICAgICAgLy8gaWYgd2Uga25vdyB0aGF0IHdlIHVzZSBidW5kbGUgd2UgY2FuIGRyb3AgY2FuZGlkYXRlcyB3aXRoXHJcbiAgICAgICAgLy8g0ZVkcE1MaW5lSW5kZXggPiAwLiBJZiB3ZSBkb24ndCBkbyB0aGlzIHRoZW4gb3VyIHN0YXRlIGdldHNcclxuICAgICAgICAvLyBjb25mdXNlZCBzaW5jZSB3ZSBkaXNwb3NlIHRoZSBleHRyYSBpY2UgZ2F0aGVyZXIuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgnaWNlY2FuZGlkYXRlJyk7XHJcbiAgICAgIGV2ZW50LmNhbmRpZGF0ZSA9IHtzZHBNaWQ6IG1pZCwgc2RwTUxpbmVJbmRleDogc2RwTUxpbmVJbmRleH07XHJcblxyXG4gICAgICB2YXIgY2FuZCA9IGV2dC5jYW5kaWRhdGU7XHJcbiAgICAgIC8vIEVkZ2UgZW1pdHMgYW4gZW1wdHkgb2JqZWN0IGZvciBSVENJY2VDYW5kaWRhdGVDb21wbGV0ZeKApVxyXG4gICAgICB2YXIgZW5kID0gIWNhbmQgfHwgT2JqZWN0LmtleXMoY2FuZCkubGVuZ3RoID09PSAwO1xyXG4gICAgICBpZiAoZW5kKSB7XHJcbiAgICAgICAgLy8gcG9seWZpbGwgc2luY2UgUlRDSWNlR2F0aGVyZXIuc3RhdGUgaXMgbm90IGltcGxlbWVudGVkIGluXHJcbiAgICAgICAgLy8gRWRnZSAxMDU0NyB5ZXQuXHJcbiAgICAgICAgaWYgKGljZUdhdGhlcmVyLnN0YXRlID09PSAnbmV3JyB8fCBpY2VHYXRoZXJlci5zdGF0ZSA9PT0gJ2dhdGhlcmluZycpIHtcclxuICAgICAgICAgIGljZUdhdGhlcmVyLnN0YXRlID0gJ2NvbXBsZXRlZCc7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChpY2VHYXRoZXJlci5zdGF0ZSA9PT0gJ25ldycpIHtcclxuICAgICAgICAgIGljZUdhdGhlcmVyLnN0YXRlID0gJ2dhdGhlcmluZyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFJUQ0ljZUNhbmRpZGF0ZSBkb2Vzbid0IGhhdmUgYSBjb21wb25lbnQsIG5lZWRzIHRvIGJlIGFkZGVkXHJcbiAgICAgICAgY2FuZC5jb21wb25lbnQgPSAxO1xyXG4gICAgICAgIC8vIGFsc28gdGhlIHVzZXJuYW1lRnJhZ21lbnQuIFRPRE86IHVwZGF0ZSBTRFAgdG8gdGFrZSBib3RoIHZhcmlhbnRzLlxyXG4gICAgICAgIGNhbmQudWZyYWcgPSBpY2VHYXRoZXJlci5nZXRMb2NhbFBhcmFtZXRlcnMoKS51c2VybmFtZUZyYWdtZW50O1xyXG5cclxuICAgICAgICB2YXIgc2VyaWFsaXplZENhbmRpZGF0ZSA9IFNEUFV0aWxzLndyaXRlQ2FuZGlkYXRlKGNhbmQpO1xyXG4gICAgICAgIGV2ZW50LmNhbmRpZGF0ZSA9IE9iamVjdC5hc3NpZ24oZXZlbnQuY2FuZGlkYXRlLFxyXG4gICAgICAgICAgICBTRFBVdGlscy5wYXJzZUNhbmRpZGF0ZShzZXJpYWxpemVkQ2FuZGlkYXRlKSk7XHJcblxyXG4gICAgICAgIGV2ZW50LmNhbmRpZGF0ZS5jYW5kaWRhdGUgPSBzZXJpYWxpemVkQ2FuZGlkYXRlO1xyXG4gICAgICAgIGV2ZW50LmNhbmRpZGF0ZS50b0pTT04gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNhbmRpZGF0ZTogZXZlbnQuY2FuZGlkYXRlLmNhbmRpZGF0ZSxcclxuICAgICAgICAgICAgc2RwTWlkOiBldmVudC5jYW5kaWRhdGUuc2RwTWlkLFxyXG4gICAgICAgICAgICBzZHBNTGluZUluZGV4OiBldmVudC5jYW5kaWRhdGUuc2RwTUxpbmVJbmRleCxcclxuICAgICAgICAgICAgdXNlcm5hbWVGcmFnbWVudDogZXZlbnQuY2FuZGlkYXRlLnVzZXJuYW1lRnJhZ21lbnRcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gdXBkYXRlIGxvY2FsIGRlc2NyaXB0aW9uLlxyXG4gICAgICB2YXIgc2VjdGlvbnMgPSBTRFBVdGlscy5nZXRNZWRpYVNlY3Rpb25zKHBjLmxvY2FsRGVzY3JpcHRpb24uc2RwKTtcclxuICAgICAgaWYgKCFlbmQpIHtcclxuICAgICAgICBzZWN0aW9uc1tldmVudC5jYW5kaWRhdGUuc2RwTUxpbmVJbmRleF0gKz1cclxuICAgICAgICAgICAgJ2E9JyArIGV2ZW50LmNhbmRpZGF0ZS5jYW5kaWRhdGUgKyAnXFxyXFxuJztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZWN0aW9uc1tldmVudC5jYW5kaWRhdGUuc2RwTUxpbmVJbmRleF0gKz1cclxuICAgICAgICAgICAgJ2E9ZW5kLW9mLWNhbmRpZGF0ZXNcXHJcXG4nO1xyXG4gICAgICB9XHJcbiAgICAgIHBjLmxvY2FsRGVzY3JpcHRpb24uc2RwID1cclxuICAgICAgICAgIFNEUFV0aWxzLmdldERlc2NyaXB0aW9uKHBjLmxvY2FsRGVzY3JpcHRpb24uc2RwKSArXHJcbiAgICAgICAgICBzZWN0aW9ucy5qb2luKCcnKTtcclxuICAgICAgdmFyIGNvbXBsZXRlID0gcGMudHJhbnNjZWl2ZXJzLmV2ZXJ5KGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyICYmXHJcbiAgICAgICAgICAgIHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyLnN0YXRlID09PSAnY29tcGxldGVkJztcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAocGMuaWNlR2F0aGVyaW5nU3RhdGUgIT09ICdnYXRoZXJpbmcnKSB7XHJcbiAgICAgICAgcGMuaWNlR2F0aGVyaW5nU3RhdGUgPSAnZ2F0aGVyaW5nJztcclxuICAgICAgICBwYy5fZW1pdEdhdGhlcmluZ1N0YXRlQ2hhbmdlKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEVtaXQgY2FuZGlkYXRlLiBBbHNvIGVtaXQgbnVsbCBjYW5kaWRhdGUgd2hlbiBhbGwgZ2F0aGVyZXJzIGFyZVxyXG4gICAgICAvLyBjb21wbGV0ZS5cclxuICAgICAgaWYgKCFlbmQpIHtcclxuICAgICAgICBwYy5fZGlzcGF0Y2hFdmVudCgnaWNlY2FuZGlkYXRlJywgZXZlbnQpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChjb21wbGV0ZSkge1xyXG4gICAgICAgIHBjLl9kaXNwYXRjaEV2ZW50KCdpY2VjYW5kaWRhdGUnLCBuZXcgRXZlbnQoJ2ljZWNhbmRpZGF0ZScpKTtcclxuICAgICAgICBwYy5pY2VHYXRoZXJpbmdTdGF0ZSA9ICdjb21wbGV0ZSc7XHJcbiAgICAgICAgcGMuX2VtaXRHYXRoZXJpbmdTdGF0ZUNoYW5nZSgpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIGVtaXQgYWxyZWFkeSBnYXRoZXJlZCBjYW5kaWRhdGVzLlxyXG4gICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgIGJ1ZmZlcmVkQ2FuZGlkYXRlRXZlbnRzLmZvckVhY2goZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGljZUdhdGhlcmVyLm9ubG9jYWxjYW5kaWRhdGUoZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSwgMCk7XHJcbiAgfTtcclxuXHJcbiAgLy8gQ3JlYXRlIElDRSB0cmFuc3BvcnQgYW5kIERUTFMgdHJhbnNwb3J0LlxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fY3JlYXRlSWNlQW5kRHRsc1RyYW5zcG9ydHMgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICB2YXIgaWNlVHJhbnNwb3J0ID0gbmV3IHdpbmRvdy5SVENJY2VUcmFuc3BvcnQobnVsbCk7XHJcbiAgICBpY2VUcmFuc3BvcnQub25pY2VzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBwYy5fdXBkYXRlSWNlQ29ubmVjdGlvblN0YXRlKCk7XHJcbiAgICAgIHBjLl91cGRhdGVDb25uZWN0aW9uU3RhdGUoKTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIGR0bHNUcmFuc3BvcnQgPSBuZXcgd2luZG93LlJUQ0R0bHNUcmFuc3BvcnQoaWNlVHJhbnNwb3J0KTtcclxuICAgIGR0bHNUcmFuc3BvcnQub25kdGxzc3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgcGMuX3VwZGF0ZUNvbm5lY3Rpb25TdGF0ZSgpO1xyXG4gICAgfTtcclxuICAgIGR0bHNUcmFuc3BvcnQub25lcnJvciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAvLyBvbmVycm9yIGRvZXMgbm90IHNldCBzdGF0ZSB0byBmYWlsZWQgYnkgaXRzZWxmLlxyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZHRsc1RyYW5zcG9ydCwgJ3N0YXRlJyxcclxuICAgICAgICAgIHt2YWx1ZTogJ2ZhaWxlZCcsIHdyaXRhYmxlOiB0cnVlfSk7XHJcbiAgICAgIHBjLl91cGRhdGVDb25uZWN0aW9uU3RhdGUoKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgaWNlVHJhbnNwb3J0OiBpY2VUcmFuc3BvcnQsXHJcbiAgICAgIGR0bHNUcmFuc3BvcnQ6IGR0bHNUcmFuc3BvcnRcclxuICAgIH07XHJcbiAgfTtcclxuXHJcbiAgLy8gRGVzdHJveSBJQ0UgZ2F0aGVyZXIsIElDRSB0cmFuc3BvcnQgYW5kIERUTFMgdHJhbnNwb3J0LlxyXG4gIC8vIFdpdGhvdXQgdHJpZ2dlcmluZyB0aGUgY2FsbGJhY2tzLlxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fZGlzcG9zZUljZUFuZER0bHNUcmFuc3BvcnRzID0gZnVuY3Rpb24oXHJcbiAgICAgIHNkcE1MaW5lSW5kZXgpIHtcclxuICAgIHZhciBpY2VHYXRoZXJlciA9IHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmljZUdhdGhlcmVyO1xyXG4gICAgaWYgKGljZUdhdGhlcmVyKSB7XHJcbiAgICAgIGRlbGV0ZSBpY2VHYXRoZXJlci5vbmxvY2FsY2FuZGlkYXRlO1xyXG4gICAgICBkZWxldGUgdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uaWNlR2F0aGVyZXI7XHJcbiAgICB9XHJcbiAgICB2YXIgaWNlVHJhbnNwb3J0ID0gdGhpcy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uaWNlVHJhbnNwb3J0O1xyXG4gICAgaWYgKGljZVRyYW5zcG9ydCkge1xyXG4gICAgICBkZWxldGUgaWNlVHJhbnNwb3J0Lm9uaWNlc3RhdGVjaGFuZ2U7XHJcbiAgICAgIGRlbGV0ZSB0aGlzLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5pY2VUcmFuc3BvcnQ7XHJcbiAgICB9XHJcbiAgICB2YXIgZHRsc1RyYW5zcG9ydCA9IHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmR0bHNUcmFuc3BvcnQ7XHJcbiAgICBpZiAoZHRsc1RyYW5zcG9ydCkge1xyXG4gICAgICBkZWxldGUgZHRsc1RyYW5zcG9ydC5vbmR0bHNzdGF0ZWNoYW5nZTtcclxuICAgICAgZGVsZXRlIGR0bHNUcmFuc3BvcnQub25lcnJvcjtcclxuICAgICAgZGVsZXRlIHRoaXMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdLmR0bHNUcmFuc3BvcnQ7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLy8gU3RhcnQgdGhlIFJUUCBTZW5kZXIgYW5kIFJlY2VpdmVyIGZvciBhIHRyYW5zY2VpdmVyLlxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fdHJhbnNjZWl2ZSA9IGZ1bmN0aW9uKHRyYW5zY2VpdmVyLFxyXG4gICAgICBzZW5kLCByZWN2KSB7XHJcbiAgICB2YXIgcGFyYW1zID0gZ2V0Q29tbW9uQ2FwYWJpbGl0aWVzKHRyYW5zY2VpdmVyLmxvY2FsQ2FwYWJpbGl0aWVzLFxyXG4gICAgICAgIHRyYW5zY2VpdmVyLnJlbW90ZUNhcGFiaWxpdGllcyk7XHJcbiAgICBpZiAoc2VuZCAmJiB0cmFuc2NlaXZlci5ydHBTZW5kZXIpIHtcclxuICAgICAgcGFyYW1zLmVuY29kaW5ncyA9IHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnM7XHJcbiAgICAgIHBhcmFtcy5ydGNwID0ge1xyXG4gICAgICAgIGNuYW1lOiBTRFBVdGlscy5sb2NhbENOYW1lLFxyXG4gICAgICAgIGNvbXBvdW5kOiB0cmFuc2NlaXZlci5ydGNwUGFyYW1ldGVycy5jb21wb3VuZFxyXG4gICAgICB9O1xyXG4gICAgICBpZiAodHJhbnNjZWl2ZXIucmVjdkVuY29kaW5nUGFyYW1ldGVycy5sZW5ndGgpIHtcclxuICAgICAgICBwYXJhbXMucnRjcC5zc3JjID0gdHJhbnNjZWl2ZXIucmVjdkVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjO1xyXG4gICAgICB9XHJcbiAgICAgIHRyYW5zY2VpdmVyLnJ0cFNlbmRlci5zZW5kKHBhcmFtcyk7XHJcbiAgICB9XHJcbiAgICBpZiAocmVjdiAmJiB0cmFuc2NlaXZlci5ydHBSZWNlaXZlciAmJiBwYXJhbXMuY29kZWNzLmxlbmd0aCA+IDApIHtcclxuICAgICAgLy8gcmVtb3ZlIFJUWCBmaWVsZCBpbiBFZGdlIDE0OTQyXHJcbiAgICAgIGlmICh0cmFuc2NlaXZlci5raW5kID09PSAndmlkZW8nXHJcbiAgICAgICAgICAmJiB0cmFuc2NlaXZlci5yZWN2RW5jb2RpbmdQYXJhbWV0ZXJzXHJcbiAgICAgICAgICAmJiBlZGdlVmVyc2lvbiA8IDE1MDE5KSB7XHJcbiAgICAgICAgdHJhbnNjZWl2ZXIucmVjdkVuY29kaW5nUGFyYW1ldGVycy5mb3JFYWNoKGZ1bmN0aW9uKHApIHtcclxuICAgICAgICAgIGRlbGV0ZSBwLnJ0eDtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodHJhbnNjZWl2ZXIucmVjdkVuY29kaW5nUGFyYW1ldGVycy5sZW5ndGgpIHtcclxuICAgICAgICBwYXJhbXMuZW5jb2RpbmdzID0gdHJhbnNjZWl2ZXIucmVjdkVuY29kaW5nUGFyYW1ldGVycztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBwYXJhbXMuZW5jb2RpbmdzID0gW3t9XTtcclxuICAgICAgfVxyXG4gICAgICBwYXJhbXMucnRjcCA9IHtcclxuICAgICAgICBjb21wb3VuZDogdHJhbnNjZWl2ZXIucnRjcFBhcmFtZXRlcnMuY29tcG91bmRcclxuICAgICAgfTtcclxuICAgICAgaWYgKHRyYW5zY2VpdmVyLnJ0Y3BQYXJhbWV0ZXJzLmNuYW1lKSB7XHJcbiAgICAgICAgcGFyYW1zLnJ0Y3AuY25hbWUgPSB0cmFuc2NlaXZlci5ydGNwUGFyYW1ldGVycy5jbmFtZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVycy5sZW5ndGgpIHtcclxuICAgICAgICBwYXJhbXMucnRjcC5zc3JjID0gdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjO1xyXG4gICAgICB9XHJcbiAgICAgIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyLnJlY2VpdmUocGFyYW1zKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0TG9jYWxEZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKGRlc2NyaXB0aW9uKSB7XHJcbiAgICB2YXIgcGMgPSB0aGlzO1xyXG5cclxuICAgIC8vIE5vdGU6IHByYW5zd2VyIGlzIG5vdCBzdXBwb3J0ZWQuXHJcbiAgICBpZiAoWydvZmZlcicsICdhbnN3ZXInXS5pbmRleE9mKGRlc2NyaXB0aW9uLnR5cGUpID09PSAtMSkge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobWFrZUVycm9yKCdUeXBlRXJyb3InLFxyXG4gICAgICAgICAgJ1Vuc3VwcG9ydGVkIHR5cGUgXCInICsgZGVzY3JpcHRpb24udHlwZSArICdcIicpKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWlzQWN0aW9uQWxsb3dlZEluU2lnbmFsaW5nU3RhdGUoJ3NldExvY2FsRGVzY3JpcHRpb24nLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uLnR5cGUsIHBjLnNpZ25hbGluZ1N0YXRlKSB8fCBwYy5faXNDbG9zZWQpIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG1ha2VFcnJvcignSW52YWxpZFN0YXRlRXJyb3InLFxyXG4gICAgICAgICAgJ0NhbiBub3Qgc2V0IGxvY2FsICcgKyBkZXNjcmlwdGlvbi50eXBlICtcclxuICAgICAgICAgICcgaW4gc3RhdGUgJyArIHBjLnNpZ25hbGluZ1N0YXRlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHNlY3Rpb25zO1xyXG4gICAgdmFyIHNlc3Npb25wYXJ0O1xyXG4gICAgaWYgKGRlc2NyaXB0aW9uLnR5cGUgPT09ICdvZmZlcicpIHtcclxuICAgICAgLy8gVkVSWSBsaW1pdGVkIHN1cHBvcnQgZm9yIFNEUCBtdW5naW5nLiBMaW1pdGVkIHRvOlxyXG4gICAgICAvLyAqIGNoYW5naW5nIHRoZSBvcmRlciBvZiBjb2RlY3NcclxuICAgICAgc2VjdGlvbnMgPSBTRFBVdGlscy5zcGxpdFNlY3Rpb25zKGRlc2NyaXB0aW9uLnNkcCk7XHJcbiAgICAgIHNlc3Npb25wYXJ0ID0gc2VjdGlvbnMuc2hpZnQoKTtcclxuICAgICAgc2VjdGlvbnMuZm9yRWFjaChmdW5jdGlvbihtZWRpYVNlY3Rpb24sIHNkcE1MaW5lSW5kZXgpIHtcclxuICAgICAgICB2YXIgY2FwcyA9IFNEUFV0aWxzLnBhcnNlUnRwUGFyYW1ldGVycyhtZWRpYVNlY3Rpb24pO1xyXG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5sb2NhbENhcGFiaWxpdGllcyA9IGNhcHM7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcGMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIsIHNkcE1MaW5lSW5kZXgpIHtcclxuICAgICAgICBwYy5fZ2F0aGVyKHRyYW5zY2VpdmVyLm1pZCwgc2RwTUxpbmVJbmRleCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIGlmIChkZXNjcmlwdGlvbi50eXBlID09PSAnYW5zd2VyJykge1xyXG4gICAgICBzZWN0aW9ucyA9IFNEUFV0aWxzLnNwbGl0U2VjdGlvbnMocGMucmVtb3RlRGVzY3JpcHRpb24uc2RwKTtcclxuICAgICAgc2Vzc2lvbnBhcnQgPSBzZWN0aW9ucy5zaGlmdCgpO1xyXG4gICAgICB2YXIgaXNJY2VMaXRlID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgoc2Vzc2lvbnBhcnQsXHJcbiAgICAgICAgICAnYT1pY2UtbGl0ZScpLmxlbmd0aCA+IDA7XHJcbiAgICAgIHNlY3Rpb25zLmZvckVhY2goZnVuY3Rpb24obWVkaWFTZWN0aW9uLCBzZHBNTGluZUluZGV4KSB7XHJcbiAgICAgICAgdmFyIHRyYW5zY2VpdmVyID0gcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdO1xyXG4gICAgICAgIHZhciBpY2VHYXRoZXJlciA9IHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyO1xyXG4gICAgICAgIHZhciBpY2VUcmFuc3BvcnQgPSB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQ7XHJcbiAgICAgICAgdmFyIGR0bHNUcmFuc3BvcnQgPSB0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0O1xyXG4gICAgICAgIHZhciBsb2NhbENhcGFiaWxpdGllcyA9IHRyYW5zY2VpdmVyLmxvY2FsQ2FwYWJpbGl0aWVzO1xyXG4gICAgICAgIHZhciByZW1vdGVDYXBhYmlsaXRpZXMgPSB0cmFuc2NlaXZlci5yZW1vdGVDYXBhYmlsaXRpZXM7XHJcblxyXG4gICAgICAgIC8vIHRyZWF0IGJ1bmRsZS1vbmx5IGFzIG5vdC1yZWplY3RlZC5cclxuICAgICAgICB2YXIgcmVqZWN0ZWQgPSBTRFBVdGlscy5pc1JlamVjdGVkKG1lZGlhU2VjdGlvbikgJiZcclxuICAgICAgICAgICAgU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1idW5kbGUtb25seScpLmxlbmd0aCA9PT0gMDtcclxuXHJcbiAgICAgICAgaWYgKCFyZWplY3RlZCAmJiAhdHJhbnNjZWl2ZXIucmVqZWN0ZWQpIHtcclxuICAgICAgICAgIHZhciByZW1vdGVJY2VQYXJhbWV0ZXJzID0gU0RQVXRpbHMuZ2V0SWNlUGFyYW1ldGVycyhcclxuICAgICAgICAgICAgICBtZWRpYVNlY3Rpb24sIHNlc3Npb25wYXJ0KTtcclxuICAgICAgICAgIHZhciByZW1vdGVEdGxzUGFyYW1ldGVycyA9IFNEUFV0aWxzLmdldER0bHNQYXJhbWV0ZXJzKFxyXG4gICAgICAgICAgICAgIG1lZGlhU2VjdGlvbiwgc2Vzc2lvbnBhcnQpO1xyXG4gICAgICAgICAgaWYgKGlzSWNlTGl0ZSkge1xyXG4gICAgICAgICAgICByZW1vdGVEdGxzUGFyYW1ldGVycy5yb2xlID0gJ3NlcnZlcic7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKCFwYy51c2luZ0J1bmRsZSB8fCBzZHBNTGluZUluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgICAgIHBjLl9nYXRoZXIodHJhbnNjZWl2ZXIubWlkLCBzZHBNTGluZUluZGV4KTtcclxuICAgICAgICAgICAgaWYgKGljZVRyYW5zcG9ydC5zdGF0ZSA9PT0gJ25ldycpIHtcclxuICAgICAgICAgICAgICBpY2VUcmFuc3BvcnQuc3RhcnQoaWNlR2F0aGVyZXIsIHJlbW90ZUljZVBhcmFtZXRlcnMsXHJcbiAgICAgICAgICAgICAgICAgIGlzSWNlTGl0ZSA/ICdjb250cm9sbGluZycgOiAnY29udHJvbGxlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkdGxzVHJhbnNwb3J0LnN0YXRlID09PSAnbmV3Jykge1xyXG4gICAgICAgICAgICAgIGR0bHNUcmFuc3BvcnQuc3RhcnQocmVtb3RlRHRsc1BhcmFtZXRlcnMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gQ2FsY3VsYXRlIGludGVyc2VjdGlvbiBvZiBjYXBhYmlsaXRpZXMuXHJcbiAgICAgICAgICB2YXIgcGFyYW1zID0gZ2V0Q29tbW9uQ2FwYWJpbGl0aWVzKGxvY2FsQ2FwYWJpbGl0aWVzLFxyXG4gICAgICAgICAgICAgIHJlbW90ZUNhcGFiaWxpdGllcyk7XHJcblxyXG4gICAgICAgICAgLy8gU3RhcnQgdGhlIFJUQ1J0cFNlbmRlci4gVGhlIFJUQ1J0cFJlY2VpdmVyIGZvciB0aGlzXHJcbiAgICAgICAgICAvLyB0cmFuc2NlaXZlciBoYXMgYWxyZWFkeSBiZWVuIHN0YXJ0ZWQgaW4gc2V0UmVtb3RlRGVzY3JpcHRpb24uXHJcbiAgICAgICAgICBwYy5fdHJhbnNjZWl2ZSh0cmFuc2NlaXZlcixcclxuICAgICAgICAgICAgICBwYXJhbXMuY29kZWNzLmxlbmd0aCA+IDAsXHJcbiAgICAgICAgICAgICAgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcGMubG9jYWxEZXNjcmlwdGlvbiA9IHtcclxuICAgICAgdHlwZTogZGVzY3JpcHRpb24udHlwZSxcclxuICAgICAgc2RwOiBkZXNjcmlwdGlvbi5zZHBcclxuICAgIH07XHJcbiAgICBpZiAoZGVzY3JpcHRpb24udHlwZSA9PT0gJ29mZmVyJykge1xyXG4gICAgICBwYy5fdXBkYXRlU2lnbmFsaW5nU3RhdGUoJ2hhdmUtbG9jYWwtb2ZmZXInKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHBjLl91cGRhdGVTaWduYWxpbmdTdGF0ZSgnc3RhYmxlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gIH07XHJcblxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5zZXRSZW1vdGVEZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKGRlc2NyaXB0aW9uKSB7XHJcbiAgICB2YXIgcGMgPSB0aGlzO1xyXG5cclxuICAgIC8vIE5vdGU6IHByYW5zd2VyIGlzIG5vdCBzdXBwb3J0ZWQuXHJcbiAgICBpZiAoWydvZmZlcicsICdhbnN3ZXInXS5pbmRleE9mKGRlc2NyaXB0aW9uLnR5cGUpID09PSAtMSkge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobWFrZUVycm9yKCdUeXBlRXJyb3InLFxyXG4gICAgICAgICAgJ1Vuc3VwcG9ydGVkIHR5cGUgXCInICsgZGVzY3JpcHRpb24udHlwZSArICdcIicpKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWlzQWN0aW9uQWxsb3dlZEluU2lnbmFsaW5nU3RhdGUoJ3NldFJlbW90ZURlc2NyaXB0aW9uJyxcclxuICAgICAgICBkZXNjcmlwdGlvbi50eXBlLCBwYy5zaWduYWxpbmdTdGF0ZSkgfHwgcGMuX2lzQ2xvc2VkKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChtYWtlRXJyb3IoJ0ludmFsaWRTdGF0ZUVycm9yJyxcclxuICAgICAgICAgICdDYW4gbm90IHNldCByZW1vdGUgJyArIGRlc2NyaXB0aW9uLnR5cGUgK1xyXG4gICAgICAgICAgJyBpbiBzdGF0ZSAnICsgcGMuc2lnbmFsaW5nU3RhdGUpKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgc3RyZWFtcyA9IHt9O1xyXG4gICAgcGMucmVtb3RlU3RyZWFtcy5mb3JFYWNoKGZ1bmN0aW9uKHN0cmVhbSkge1xyXG4gICAgICBzdHJlYW1zW3N0cmVhbS5pZF0gPSBzdHJlYW07XHJcbiAgICB9KTtcclxuICAgIHZhciByZWNlaXZlckxpc3QgPSBbXTtcclxuICAgIHZhciBzZWN0aW9ucyA9IFNEUFV0aWxzLnNwbGl0U2VjdGlvbnMoZGVzY3JpcHRpb24uc2RwKTtcclxuICAgIHZhciBzZXNzaW9ucGFydCA9IHNlY3Rpb25zLnNoaWZ0KCk7XHJcbiAgICB2YXIgaXNJY2VMaXRlID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgoc2Vzc2lvbnBhcnQsXHJcbiAgICAgICAgJ2E9aWNlLWxpdGUnKS5sZW5ndGggPiAwO1xyXG4gICAgdmFyIHVzaW5nQnVuZGxlID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgoc2Vzc2lvbnBhcnQsXHJcbiAgICAgICAgJ2E9Z3JvdXA6QlVORExFICcpLmxlbmd0aCA+IDA7XHJcbiAgICBwYy51c2luZ0J1bmRsZSA9IHVzaW5nQnVuZGxlO1xyXG4gICAgdmFyIGljZU9wdGlvbnMgPSBTRFBVdGlscy5tYXRjaFByZWZpeChzZXNzaW9ucGFydCxcclxuICAgICAgICAnYT1pY2Utb3B0aW9uczonKVswXTtcclxuICAgIGlmIChpY2VPcHRpb25zKSB7XHJcbiAgICAgIHBjLmNhblRyaWNrbGVJY2VDYW5kaWRhdGVzID0gaWNlT3B0aW9ucy5zdWJzdHIoMTQpLnNwbGl0KCcgJylcclxuICAgICAgICAgIC5pbmRleE9mKCd0cmlja2xlJykgPj0gMDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHBjLmNhblRyaWNrbGVJY2VDYW5kaWRhdGVzID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgc2VjdGlvbnMuZm9yRWFjaChmdW5jdGlvbihtZWRpYVNlY3Rpb24sIHNkcE1MaW5lSW5kZXgpIHtcclxuICAgICAgdmFyIGxpbmVzID0gU0RQVXRpbHMuc3BsaXRMaW5lcyhtZWRpYVNlY3Rpb24pO1xyXG4gICAgICB2YXIga2luZCA9IFNEUFV0aWxzLmdldEtpbmQobWVkaWFTZWN0aW9uKTtcclxuICAgICAgLy8gdHJlYXQgYnVuZGxlLW9ubHkgYXMgbm90LXJlamVjdGVkLlxyXG4gICAgICB2YXIgcmVqZWN0ZWQgPSBTRFBVdGlscy5pc1JlamVjdGVkKG1lZGlhU2VjdGlvbikgJiZcclxuICAgICAgICAgIFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9YnVuZGxlLW9ubHknKS5sZW5ndGggPT09IDA7XHJcbiAgICAgIHZhciBwcm90b2NvbCA9IGxpbmVzWzBdLnN1YnN0cigyKS5zcGxpdCgnICcpWzJdO1xyXG5cclxuICAgICAgdmFyIGRpcmVjdGlvbiA9IFNEUFV0aWxzLmdldERpcmVjdGlvbihtZWRpYVNlY3Rpb24sIHNlc3Npb25wYXJ0KTtcclxuICAgICAgdmFyIHJlbW90ZU1zaWQgPSBTRFBVdGlscy5wYXJzZU1zaWQobWVkaWFTZWN0aW9uKTtcclxuXHJcbiAgICAgIHZhciBtaWQgPSBTRFBVdGlscy5nZXRNaWQobWVkaWFTZWN0aW9uKSB8fCBTRFBVdGlscy5nZW5lcmF0ZUlkZW50aWZpZXIoKTtcclxuXHJcbiAgICAgIC8vIFJlamVjdCBkYXRhY2hhbm5lbHMgd2hpY2ggYXJlIG5vdCBpbXBsZW1lbnRlZCB5ZXQuXHJcbiAgICAgIGlmICgoa2luZCA9PT0gJ2FwcGxpY2F0aW9uJyAmJiBwcm90b2NvbCA9PT0gJ0RUTFMvU0NUUCcpIHx8IHJlamVjdGVkKSB7XHJcbiAgICAgICAgLy8gVE9ETzogdGhpcyBpcyBkYW5nZXJvdXMgaW4gdGhlIGNhc2Ugd2hlcmUgYSBub24tcmVqZWN0ZWQgbS1saW5lXHJcbiAgICAgICAgLy8gICAgIGJlY29tZXMgcmVqZWN0ZWQuXHJcbiAgICAgICAgcGMudHJhbnNjZWl2ZXJzW3NkcE1MaW5lSW5kZXhdID0ge1xyXG4gICAgICAgICAgbWlkOiBtaWQsXHJcbiAgICAgICAgICBraW5kOiBraW5kLFxyXG4gICAgICAgICAgcmVqZWN0ZWQ6IHRydWVcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFyZWplY3RlZCAmJiBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0gJiZcclxuICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5yZWplY3RlZCkge1xyXG4gICAgICAgIC8vIHJlY3ljbGUgYSByZWplY3RlZCB0cmFuc2NlaXZlci5cclxuICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0gPSBwYy5fY3JlYXRlVHJhbnNjZWl2ZXIoa2luZCwgdHJ1ZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciB0cmFuc2NlaXZlcjtcclxuICAgICAgdmFyIGljZUdhdGhlcmVyO1xyXG4gICAgICB2YXIgaWNlVHJhbnNwb3J0O1xyXG4gICAgICB2YXIgZHRsc1RyYW5zcG9ydDtcclxuICAgICAgdmFyIHJ0cFJlY2VpdmVyO1xyXG4gICAgICB2YXIgc2VuZEVuY29kaW5nUGFyYW1ldGVycztcclxuICAgICAgdmFyIHJlY3ZFbmNvZGluZ1BhcmFtZXRlcnM7XHJcbiAgICAgIHZhciBsb2NhbENhcGFiaWxpdGllcztcclxuXHJcbiAgICAgIHZhciB0cmFjaztcclxuICAgICAgLy8gRklYTUU6IGVuc3VyZSB0aGUgbWVkaWFTZWN0aW9uIGhhcyBydGNwLW11eCBzZXQuXHJcbiAgICAgIHZhciByZW1vdGVDYXBhYmlsaXRpZXMgPSBTRFBVdGlscy5wYXJzZVJ0cFBhcmFtZXRlcnMobWVkaWFTZWN0aW9uKTtcclxuICAgICAgdmFyIHJlbW90ZUljZVBhcmFtZXRlcnM7XHJcbiAgICAgIHZhciByZW1vdGVEdGxzUGFyYW1ldGVycztcclxuICAgICAgaWYgKCFyZWplY3RlZCkge1xyXG4gICAgICAgIHJlbW90ZUljZVBhcmFtZXRlcnMgPSBTRFBVdGlscy5nZXRJY2VQYXJhbWV0ZXJzKG1lZGlhU2VjdGlvbixcclxuICAgICAgICAgICAgc2Vzc2lvbnBhcnQpO1xyXG4gICAgICAgIHJlbW90ZUR0bHNQYXJhbWV0ZXJzID0gU0RQVXRpbHMuZ2V0RHRsc1BhcmFtZXRlcnMobWVkaWFTZWN0aW9uLFxyXG4gICAgICAgICAgICBzZXNzaW9ucGFydCk7XHJcbiAgICAgICAgcmVtb3RlRHRsc1BhcmFtZXRlcnMucm9sZSA9ICdjbGllbnQnO1xyXG4gICAgICB9XHJcbiAgICAgIHJlY3ZFbmNvZGluZ1BhcmFtZXRlcnMgPVxyXG4gICAgICAgICAgU0RQVXRpbHMucGFyc2VSdHBFbmNvZGluZ1BhcmFtZXRlcnMobWVkaWFTZWN0aW9uKTtcclxuXHJcbiAgICAgIHZhciBydGNwUGFyYW1ldGVycyA9IFNEUFV0aWxzLnBhcnNlUnRjcFBhcmFtZXRlcnMobWVkaWFTZWN0aW9uKTtcclxuXHJcbiAgICAgIHZhciBpc0NvbXBsZXRlID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLFxyXG4gICAgICAgICAgJ2E9ZW5kLW9mLWNhbmRpZGF0ZXMnLCBzZXNzaW9ucGFydCkubGVuZ3RoID4gMDtcclxuICAgICAgdmFyIGNhbmRzID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1jYW5kaWRhdGU6JylcclxuICAgICAgICAgIC5tYXAoZnVuY3Rpb24oY2FuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gU0RQVXRpbHMucGFyc2VDYW5kaWRhdGUoY2FuZCk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmZpbHRlcihmdW5jdGlvbihjYW5kKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjYW5kLmNvbXBvbmVudCA9PT0gMTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gQ2hlY2sgaWYgd2UgY2FuIHVzZSBCVU5ETEUgYW5kIGRpc3Bvc2UgdHJhbnNwb3J0cy5cclxuICAgICAgaWYgKChkZXNjcmlwdGlvbi50eXBlID09PSAnb2ZmZXInIHx8IGRlc2NyaXB0aW9uLnR5cGUgPT09ICdhbnN3ZXInKSAmJlxyXG4gICAgICAgICAgIXJlamVjdGVkICYmIHVzaW5nQnVuZGxlICYmIHNkcE1MaW5lSW5kZXggPiAwICYmXHJcbiAgICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0pIHtcclxuICAgICAgICBwYy5fZGlzcG9zZUljZUFuZER0bHNUcmFuc3BvcnRzKHNkcE1MaW5lSW5kZXgpO1xyXG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5pY2VHYXRoZXJlciA9XHJcbiAgICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1swXS5pY2VHYXRoZXJlcjtcclxuICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uaWNlVHJhbnNwb3J0ID1cclxuICAgICAgICAgICAgcGMudHJhbnNjZWl2ZXJzWzBdLmljZVRyYW5zcG9ydDtcclxuICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0uZHRsc1RyYW5zcG9ydCA9XHJcbiAgICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1swXS5kdGxzVHJhbnNwb3J0O1xyXG4gICAgICAgIGlmIChwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0ucnRwU2VuZGVyKSB7XHJcbiAgICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0ucnRwU2VuZGVyLnNldFRyYW5zcG9ydChcclxuICAgICAgICAgICAgICBwYy50cmFuc2NlaXZlcnNbMF0uZHRsc1RyYW5zcG9ydCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0ucnRwUmVjZWl2ZXIpIHtcclxuICAgICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5ydHBSZWNlaXZlci5zZXRUcmFuc3BvcnQoXHJcbiAgICAgICAgICAgICAgcGMudHJhbnNjZWl2ZXJzWzBdLmR0bHNUcmFuc3BvcnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAoZGVzY3JpcHRpb24udHlwZSA9PT0gJ29mZmVyJyAmJiAhcmVqZWN0ZWQpIHtcclxuICAgICAgICB0cmFuc2NlaXZlciA9IHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XSB8fFxyXG4gICAgICAgICAgICBwYy5fY3JlYXRlVHJhbnNjZWl2ZXIoa2luZCk7XHJcbiAgICAgICAgdHJhbnNjZWl2ZXIubWlkID0gbWlkO1xyXG5cclxuICAgICAgICBpZiAoIXRyYW5zY2VpdmVyLmljZUdhdGhlcmVyKSB7XHJcbiAgICAgICAgICB0cmFuc2NlaXZlci5pY2VHYXRoZXJlciA9IHBjLl9jcmVhdGVJY2VHYXRoZXJlcihzZHBNTGluZUluZGV4LFxyXG4gICAgICAgICAgICAgIHVzaW5nQnVuZGxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjYW5kcy5sZW5ndGggJiYgdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LnN0YXRlID09PSAnbmV3Jykge1xyXG4gICAgICAgICAgaWYgKGlzQ29tcGxldGUgJiYgKCF1c2luZ0J1bmRsZSB8fCBzZHBNTGluZUluZGV4ID09PSAwKSkge1xyXG4gICAgICAgICAgICB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQuc2V0UmVtb3RlQ2FuZGlkYXRlcyhjYW5kcyk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYW5kcy5mb3JFYWNoKGZ1bmN0aW9uKGNhbmRpZGF0ZSkge1xyXG4gICAgICAgICAgICAgIG1heWJlQWRkQ2FuZGlkYXRlKHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydCwgY2FuZGlkYXRlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsb2NhbENhcGFiaWxpdGllcyA9IHdpbmRvdy5SVENSdHBSZWNlaXZlci5nZXRDYXBhYmlsaXRpZXMoa2luZCk7XHJcblxyXG4gICAgICAgIC8vIGZpbHRlciBSVFggdW50aWwgYWRkaXRpb25hbCBzdHVmZiBuZWVkZWQgZm9yIFJUWCBpcyBpbXBsZW1lbnRlZFxyXG4gICAgICAgIC8vIGluIGFkYXB0ZXIuanNcclxuICAgICAgICBpZiAoZWRnZVZlcnNpb24gPCAxNTAxOSkge1xyXG4gICAgICAgICAgbG9jYWxDYXBhYmlsaXRpZXMuY29kZWNzID0gbG9jYWxDYXBhYmlsaXRpZXMuY29kZWNzLmZpbHRlcihcclxuICAgICAgICAgICAgICBmdW5jdGlvbihjb2RlYykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvZGVjLm5hbWUgIT09ICdydHgnO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VuZEVuY29kaW5nUGFyYW1ldGVycyA9IHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnMgfHwgW3tcclxuICAgICAgICAgIHNzcmM6ICgyICogc2RwTUxpbmVJbmRleCArIDIpICogMTAwMVxyXG4gICAgICAgIH1dO1xyXG5cclxuICAgICAgICAvLyBUT0RPOiByZXdyaXRlIHRvIHVzZSBodHRwOi8vdzNjLmdpdGh1Yi5pby93ZWJydGMtcGMvI3NldC1hc3NvY2lhdGVkLXJlbW90ZS1zdHJlYW1zXHJcbiAgICAgICAgdmFyIGlzTmV3VHJhY2sgPSBmYWxzZTtcclxuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAnc2VuZHJlY3YnIHx8IGRpcmVjdGlvbiA9PT0gJ3NlbmRvbmx5Jykge1xyXG4gICAgICAgICAgaXNOZXdUcmFjayA9ICF0cmFuc2NlaXZlci5ydHBSZWNlaXZlcjtcclxuICAgICAgICAgIHJ0cFJlY2VpdmVyID0gdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIgfHxcclxuICAgICAgICAgICAgICBuZXcgd2luZG93LlJUQ1J0cFJlY2VpdmVyKHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQsIGtpbmQpO1xyXG5cclxuICAgICAgICAgIGlmIChpc05ld1RyYWNrKSB7XHJcbiAgICAgICAgICAgIHZhciBzdHJlYW07XHJcbiAgICAgICAgICAgIHRyYWNrID0gcnRwUmVjZWl2ZXIudHJhY2s7XHJcbiAgICAgICAgICAgIC8vIEZJWE1FOiBkb2VzIG5vdCB3b3JrIHdpdGggUGxhbiBCLlxyXG4gICAgICAgICAgICBpZiAocmVtb3RlTXNpZCAmJiByZW1vdGVNc2lkLnN0cmVhbSA9PT0gJy0nKSB7XHJcbiAgICAgICAgICAgICAgLy8gbm8tb3AuIGEgc3RyZWFtIGlkIG9mICctJyBtZWFuczogbm8gYXNzb2NpYXRlZCBzdHJlYW0uXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVtb3RlTXNpZCkge1xyXG4gICAgICAgICAgICAgIGlmICghc3RyZWFtc1tyZW1vdGVNc2lkLnN0cmVhbV0pIHtcclxuICAgICAgICAgICAgICAgIHN0cmVhbXNbcmVtb3RlTXNpZC5zdHJlYW1dID0gbmV3IHdpbmRvdy5NZWRpYVN0cmVhbSgpO1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHN0cmVhbXNbcmVtb3RlTXNpZC5zdHJlYW1dLCAnaWQnLCB7XHJcbiAgICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlbW90ZU1zaWQuc3RyZWFtO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRyYWNrLCAnaWQnLCB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gcmVtb3RlTXNpZC50cmFjaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICBzdHJlYW0gPSBzdHJlYW1zW3JlbW90ZU1zaWQuc3RyZWFtXTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBpZiAoIXN0cmVhbXMuZGVmYXVsdCkge1xyXG4gICAgICAgICAgICAgICAgc3RyZWFtcy5kZWZhdWx0ID0gbmV3IHdpbmRvdy5NZWRpYVN0cmVhbSgpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBzdHJlYW0gPSBzdHJlYW1zLmRlZmF1bHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHN0cmVhbSkge1xyXG4gICAgICAgICAgICAgIGFkZFRyYWNrVG9TdHJlYW1BbmRGaXJlRXZlbnQodHJhY2ssIHN0cmVhbSk7XHJcbiAgICAgICAgICAgICAgdHJhbnNjZWl2ZXIuYXNzb2NpYXRlZFJlbW90ZU1lZGlhU3RyZWFtcy5wdXNoKHN0cmVhbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVjZWl2ZXJMaXN0LnB1c2goW3RyYWNrLCBydHBSZWNlaXZlciwgc3RyZWFtXSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICh0cmFuc2NlaXZlci5ydHBSZWNlaXZlciAmJiB0cmFuc2NlaXZlci5ydHBSZWNlaXZlci50cmFjaykge1xyXG4gICAgICAgICAgdHJhbnNjZWl2ZXIuYXNzb2NpYXRlZFJlbW90ZU1lZGlhU3RyZWFtcy5mb3JFYWNoKGZ1bmN0aW9uKHMpIHtcclxuICAgICAgICAgICAgdmFyIG5hdGl2ZVRyYWNrID0gcy5nZXRUcmFja3MoKS5maW5kKGZ1bmN0aW9uKHQpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gdC5pZCA9PT0gdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIudHJhY2suaWQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAobmF0aXZlVHJhY2spIHtcclxuICAgICAgICAgICAgICByZW1vdmVUcmFja0Zyb21TdHJlYW1BbmRGaXJlRXZlbnQobmF0aXZlVHJhY2ssIHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHRyYW5zY2VpdmVyLmFzc29jaWF0ZWRSZW1vdGVNZWRpYVN0cmVhbXMgPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRyYW5zY2VpdmVyLmxvY2FsQ2FwYWJpbGl0aWVzID0gbG9jYWxDYXBhYmlsaXRpZXM7XHJcbiAgICAgICAgdHJhbnNjZWl2ZXIucmVtb3RlQ2FwYWJpbGl0aWVzID0gcmVtb3RlQ2FwYWJpbGl0aWVzO1xyXG4gICAgICAgIHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyID0gcnRwUmVjZWl2ZXI7XHJcbiAgICAgICAgdHJhbnNjZWl2ZXIucnRjcFBhcmFtZXRlcnMgPSBydGNwUGFyYW1ldGVycztcclxuICAgICAgICB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzID0gc2VuZEVuY29kaW5nUGFyYW1ldGVycztcclxuICAgICAgICB0cmFuc2NlaXZlci5yZWN2RW5jb2RpbmdQYXJhbWV0ZXJzID0gcmVjdkVuY29kaW5nUGFyYW1ldGVycztcclxuXHJcbiAgICAgICAgLy8gU3RhcnQgdGhlIFJUQ1J0cFJlY2VpdmVyIG5vdy4gVGhlIFJUUFNlbmRlciBpcyBzdGFydGVkIGluXHJcbiAgICAgICAgLy8gc2V0TG9jYWxEZXNjcmlwdGlvbi5cclxuICAgICAgICBwYy5fdHJhbnNjZWl2ZShwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0sXHJcbiAgICAgICAgICAgIGZhbHNlLFxyXG4gICAgICAgICAgICBpc05ld1RyYWNrKTtcclxuICAgICAgfSBlbHNlIGlmIChkZXNjcmlwdGlvbi50eXBlID09PSAnYW5zd2VyJyAmJiAhcmVqZWN0ZWQpIHtcclxuICAgICAgICB0cmFuc2NlaXZlciA9IHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XTtcclxuICAgICAgICBpY2VHYXRoZXJlciA9IHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyO1xyXG4gICAgICAgIGljZVRyYW5zcG9ydCA9IHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydDtcclxuICAgICAgICBkdGxzVHJhbnNwb3J0ID0gdHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydDtcclxuICAgICAgICBydHBSZWNlaXZlciA9IHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyO1xyXG4gICAgICAgIHNlbmRFbmNvZGluZ1BhcmFtZXRlcnMgPSB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzO1xyXG4gICAgICAgIGxvY2FsQ2FwYWJpbGl0aWVzID0gdHJhbnNjZWl2ZXIubG9jYWxDYXBhYmlsaXRpZXM7XHJcblxyXG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5yZWN2RW5jb2RpbmdQYXJhbWV0ZXJzID1cclxuICAgICAgICAgICAgcmVjdkVuY29kaW5nUGFyYW1ldGVycztcclxuICAgICAgICBwYy50cmFuc2NlaXZlcnNbc2RwTUxpbmVJbmRleF0ucmVtb3RlQ2FwYWJpbGl0aWVzID1cclxuICAgICAgICAgICAgcmVtb3RlQ2FwYWJpbGl0aWVzO1xyXG4gICAgICAgIHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XS5ydGNwUGFyYW1ldGVycyA9IHJ0Y3BQYXJhbWV0ZXJzO1xyXG5cclxuICAgICAgICBpZiAoY2FuZHMubGVuZ3RoICYmIGljZVRyYW5zcG9ydC5zdGF0ZSA9PT0gJ25ldycpIHtcclxuICAgICAgICAgIGlmICgoaXNJY2VMaXRlIHx8IGlzQ29tcGxldGUpICYmXHJcbiAgICAgICAgICAgICAgKCF1c2luZ0J1bmRsZSB8fCBzZHBNTGluZUluZGV4ID09PSAwKSkge1xyXG4gICAgICAgICAgICBpY2VUcmFuc3BvcnQuc2V0UmVtb3RlQ2FuZGlkYXRlcyhjYW5kcyk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYW5kcy5mb3JFYWNoKGZ1bmN0aW9uKGNhbmRpZGF0ZSkge1xyXG4gICAgICAgICAgICAgIG1heWJlQWRkQ2FuZGlkYXRlKHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydCwgY2FuZGlkYXRlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXVzaW5nQnVuZGxlIHx8IHNkcE1MaW5lSW5kZXggPT09IDApIHtcclxuICAgICAgICAgIGlmIChpY2VUcmFuc3BvcnQuc3RhdGUgPT09ICduZXcnKSB7XHJcbiAgICAgICAgICAgIGljZVRyYW5zcG9ydC5zdGFydChpY2VHYXRoZXJlciwgcmVtb3RlSWNlUGFyYW1ldGVycyxcclxuICAgICAgICAgICAgICAgICdjb250cm9sbGluZycpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKGR0bHNUcmFuc3BvcnQuc3RhdGUgPT09ICduZXcnKSB7XHJcbiAgICAgICAgICAgIGR0bHNUcmFuc3BvcnQuc3RhcnQocmVtb3RlRHRsc1BhcmFtZXRlcnMpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcGMuX3RyYW5zY2VpdmUodHJhbnNjZWl2ZXIsXHJcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9PT0gJ3NlbmRyZWN2JyB8fCBkaXJlY3Rpb24gPT09ICdyZWN2b25seScsXHJcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9PT0gJ3NlbmRyZWN2JyB8fCBkaXJlY3Rpb24gPT09ICdzZW5kb25seScpO1xyXG5cclxuICAgICAgICAvLyBUT0RPOiByZXdyaXRlIHRvIHVzZSBodHRwOi8vdzNjLmdpdGh1Yi5pby93ZWJydGMtcGMvI3NldC1hc3NvY2lhdGVkLXJlbW90ZS1zdHJlYW1zXHJcbiAgICAgICAgaWYgKHJ0cFJlY2VpdmVyICYmXHJcbiAgICAgICAgICAgIChkaXJlY3Rpb24gPT09ICdzZW5kcmVjdicgfHwgZGlyZWN0aW9uID09PSAnc2VuZG9ubHknKSkge1xyXG4gICAgICAgICAgdHJhY2sgPSBydHBSZWNlaXZlci50cmFjaztcclxuICAgICAgICAgIGlmIChyZW1vdGVNc2lkKSB7XHJcbiAgICAgICAgICAgIGlmICghc3RyZWFtc1tyZW1vdGVNc2lkLnN0cmVhbV0pIHtcclxuICAgICAgICAgICAgICBzdHJlYW1zW3JlbW90ZU1zaWQuc3RyZWFtXSA9IG5ldyB3aW5kb3cuTWVkaWFTdHJlYW0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhZGRUcmFja1RvU3RyZWFtQW5kRmlyZUV2ZW50KHRyYWNrLCBzdHJlYW1zW3JlbW90ZU1zaWQuc3RyZWFtXSk7XHJcbiAgICAgICAgICAgIHJlY2VpdmVyTGlzdC5wdXNoKFt0cmFjaywgcnRwUmVjZWl2ZXIsIHN0cmVhbXNbcmVtb3RlTXNpZC5zdHJlYW1dXSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoIXN0cmVhbXMuZGVmYXVsdCkge1xyXG4gICAgICAgICAgICAgIHN0cmVhbXMuZGVmYXVsdCA9IG5ldyB3aW5kb3cuTWVkaWFTdHJlYW0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhZGRUcmFja1RvU3RyZWFtQW5kRmlyZUV2ZW50KHRyYWNrLCBzdHJlYW1zLmRlZmF1bHQpO1xyXG4gICAgICAgICAgICByZWNlaXZlckxpc3QucHVzaChbdHJhY2ssIHJ0cFJlY2VpdmVyLCBzdHJlYW1zLmRlZmF1bHRdKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gRklYTUU6IGFjdHVhbGx5IHRoZSByZWNlaXZlciBzaG91bGQgYmUgY3JlYXRlZCBsYXRlci5cclxuICAgICAgICAgIGRlbGV0ZSB0cmFuc2NlaXZlci5ydHBSZWNlaXZlcjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChwYy5fZHRsc1JvbGUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBwYy5fZHRsc1JvbGUgPSBkZXNjcmlwdGlvbi50eXBlID09PSAnb2ZmZXInID8gJ2FjdGl2ZScgOiAncGFzc2l2ZSc7XHJcbiAgICB9XHJcblxyXG4gICAgcGMucmVtb3RlRGVzY3JpcHRpb24gPSB7XHJcbiAgICAgIHR5cGU6IGRlc2NyaXB0aW9uLnR5cGUsXHJcbiAgICAgIHNkcDogZGVzY3JpcHRpb24uc2RwXHJcbiAgICB9O1xyXG4gICAgaWYgKGRlc2NyaXB0aW9uLnR5cGUgPT09ICdvZmZlcicpIHtcclxuICAgICAgcGMuX3VwZGF0ZVNpZ25hbGluZ1N0YXRlKCdoYXZlLXJlbW90ZS1vZmZlcicpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcGMuX3VwZGF0ZVNpZ25hbGluZ1N0YXRlKCdzdGFibGUnKTtcclxuICAgIH1cclxuICAgIE9iamVjdC5rZXlzKHN0cmVhbXMpLmZvckVhY2goZnVuY3Rpb24oc2lkKSB7XHJcbiAgICAgIHZhciBzdHJlYW0gPSBzdHJlYW1zW3NpZF07XHJcbiAgICAgIGlmIChzdHJlYW0uZ2V0VHJhY2tzKCkubGVuZ3RoKSB7XHJcbiAgICAgICAgaWYgKHBjLnJlbW90ZVN0cmVhbXMuaW5kZXhPZihzdHJlYW0pID09PSAtMSkge1xyXG4gICAgICAgICAgcGMucmVtb3RlU3RyZWFtcy5wdXNoKHN0cmVhbSk7XHJcbiAgICAgICAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ2FkZHN0cmVhbScpO1xyXG4gICAgICAgICAgZXZlbnQuc3RyZWFtID0gc3RyZWFtO1xyXG4gICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHBjLl9kaXNwYXRjaEV2ZW50KCdhZGRzdHJlYW0nLCBldmVudCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlY2VpdmVyTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgICAgICAgIHZhciB0cmFjayA9IGl0ZW1bMF07XHJcbiAgICAgICAgICB2YXIgcmVjZWl2ZXIgPSBpdGVtWzFdO1xyXG4gICAgICAgICAgaWYgKHN0cmVhbS5pZCAhPT0gaXRlbVsyXS5pZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBmaXJlQWRkVHJhY2socGMsIHRyYWNrLCByZWNlaXZlciwgW3N0cmVhbV0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJlY2VpdmVyTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgICAgaWYgKGl0ZW1bMl0pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgZmlyZUFkZFRyYWNrKHBjLCBpdGVtWzBdLCBpdGVtWzFdLCBbXSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBjaGVjayB3aGV0aGVyIGFkZEljZUNhbmRpZGF0ZSh7fSkgd2FzIGNhbGxlZCB3aXRoaW4gZm91ciBzZWNvbmRzIGFmdGVyXHJcbiAgICAvLyBzZXRSZW1vdGVEZXNjcmlwdGlvbi5cclxuICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICBpZiAoIShwYyAmJiBwYy50cmFuc2NlaXZlcnMpKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHBjLnRyYW5zY2VpdmVycy5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zY2VpdmVyKSB7XHJcbiAgICAgICAgaWYgKHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydCAmJlxyXG4gICAgICAgICAgICB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQuc3RhdGUgPT09ICduZXcnICYmXHJcbiAgICAgICAgICAgIHRyYW5zY2VpdmVyLmljZVRyYW5zcG9ydC5nZXRSZW1vdGVDYW5kaWRhdGVzKCkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgY29uc29sZS53YXJuKCdUaW1lb3V0IGZvciBhZGRSZW1vdGVDYW5kaWRhdGUuIENvbnNpZGVyIHNlbmRpbmcgJyArXHJcbiAgICAgICAgICAgICAgJ2FuIGVuZC1vZi1jYW5kaWRhdGVzIG5vdGlmaWNhdGlvbicpO1xyXG4gICAgICAgICAgdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LmFkZFJlbW90ZUNhbmRpZGF0ZSh7fSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0sIDQwMDApO1xyXG5cclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICB9O1xyXG5cclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcclxuICAgICAgLyogbm90IHlldFxyXG4gICAgICBpZiAodHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIpIHtcclxuICAgICAgICB0cmFuc2NlaXZlci5pY2VHYXRoZXJlci5jbG9zZSgpO1xyXG4gICAgICB9XHJcbiAgICAgICovXHJcbiAgICAgIGlmICh0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQpIHtcclxuICAgICAgICB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQuc3RvcCgpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0cmFuc2NlaXZlci5kdGxzVHJhbnNwb3J0KSB7XHJcbiAgICAgICAgdHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydC5zdG9wKCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlcikge1xyXG4gICAgICAgIHRyYW5zY2VpdmVyLnJ0cFNlbmRlci5zdG9wKCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRyYW5zY2VpdmVyLnJ0cFJlY2VpdmVyKSB7XHJcbiAgICAgICAgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIuc3RvcCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIC8vIEZJWE1FOiBjbGVhbiB1cCB0cmFja3MsIGxvY2FsIHN0cmVhbXMsIHJlbW90ZSBzdHJlYW1zLCBldGNcclxuICAgIHRoaXMuX2lzQ2xvc2VkID0gdHJ1ZTtcclxuICAgIHRoaXMuX3VwZGF0ZVNpZ25hbGluZ1N0YXRlKCdjbG9zZWQnKTtcclxuICB9O1xyXG5cclxuICAvLyBVcGRhdGUgdGhlIHNpZ25hbGluZyBzdGF0ZS5cclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuX3VwZGF0ZVNpZ25hbGluZ1N0YXRlID0gZnVuY3Rpb24obmV3U3RhdGUpIHtcclxuICAgIHRoaXMuc2lnbmFsaW5nU3RhdGUgPSBuZXdTdGF0ZTtcclxuICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgnc2lnbmFsaW5nc3RhdGVjaGFuZ2UnKTtcclxuICAgIHRoaXMuX2Rpc3BhdGNoRXZlbnQoJ3NpZ25hbGluZ3N0YXRlY2hhbmdlJywgZXZlbnQpO1xyXG4gIH07XHJcblxyXG4gIC8vIERldGVybWluZSB3aGV0aGVyIHRvIGZpcmUgdGhlIG5lZ290aWF0aW9ubmVlZGVkIGV2ZW50LlxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fbWF5YmVGaXJlTmVnb3RpYXRpb25OZWVkZWQgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICBpZiAodGhpcy5zaWduYWxpbmdTdGF0ZSAhPT0gJ3N0YWJsZScgfHwgdGhpcy5uZWVkTmVnb3RpYXRpb24gPT09IHRydWUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5uZWVkTmVnb3RpYXRpb24gPSB0cnVlO1xyXG4gICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmIChwYy5uZWVkTmVnb3RpYXRpb24pIHtcclxuICAgICAgICBwYy5uZWVkTmVnb3RpYXRpb24gPSBmYWxzZTtcclxuICAgICAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ25lZ290aWF0aW9ubmVlZGVkJyk7XHJcbiAgICAgICAgcGMuX2Rpc3BhdGNoRXZlbnQoJ25lZ290aWF0aW9ubmVlZGVkJywgZXZlbnQpO1xyXG4gICAgICB9XHJcbiAgICB9LCAwKTtcclxuICB9O1xyXG5cclxuICAvLyBVcGRhdGUgdGhlIGljZSBjb25uZWN0aW9uIHN0YXRlLlxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5fdXBkYXRlSWNlQ29ubmVjdGlvblN0YXRlID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgbmV3U3RhdGU7XHJcbiAgICB2YXIgc3RhdGVzID0ge1xyXG4gICAgICAnbmV3JzogMCxcclxuICAgICAgY2xvc2VkOiAwLFxyXG4gICAgICBjaGVja2luZzogMCxcclxuICAgICAgY29ubmVjdGVkOiAwLFxyXG4gICAgICBjb21wbGV0ZWQ6IDAsXHJcbiAgICAgIGRpc2Nvbm5lY3RlZDogMCxcclxuICAgICAgZmFpbGVkOiAwXHJcbiAgICB9O1xyXG4gICAgdGhpcy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xyXG4gICAgICBzdGF0ZXNbdHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LnN0YXRlXSsrO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbmV3U3RhdGUgPSAnbmV3JztcclxuICAgIGlmIChzdGF0ZXMuZmFpbGVkID4gMCkge1xyXG4gICAgICBuZXdTdGF0ZSA9ICdmYWlsZWQnO1xyXG4gICAgfSBlbHNlIGlmIChzdGF0ZXMuY2hlY2tpbmcgPiAwKSB7XHJcbiAgICAgIG5ld1N0YXRlID0gJ2NoZWNraW5nJztcclxuICAgIH0gZWxzZSBpZiAoc3RhdGVzLmRpc2Nvbm5lY3RlZCA+IDApIHtcclxuICAgICAgbmV3U3RhdGUgPSAnZGlzY29ubmVjdGVkJztcclxuICAgIH0gZWxzZSBpZiAoc3RhdGVzLm5ldyA+IDApIHtcclxuICAgICAgbmV3U3RhdGUgPSAnbmV3JztcclxuICAgIH0gZWxzZSBpZiAoc3RhdGVzLmNvbm5lY3RlZCA+IDApIHtcclxuICAgICAgbmV3U3RhdGUgPSAnY29ubmVjdGVkJztcclxuICAgIH0gZWxzZSBpZiAoc3RhdGVzLmNvbXBsZXRlZCA+IDApIHtcclxuICAgICAgbmV3U3RhdGUgPSAnY29tcGxldGVkJztcclxuICAgIH1cclxuXHJcbiAgICBpZiAobmV3U3RhdGUgIT09IHRoaXMuaWNlQ29ubmVjdGlvblN0YXRlKSB7XHJcbiAgICAgIHRoaXMuaWNlQ29ubmVjdGlvblN0YXRlID0gbmV3U3RhdGU7XHJcbiAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgnaWNlY29ubmVjdGlvbnN0YXRlY2hhbmdlJyk7XHJcbiAgICAgIHRoaXMuX2Rpc3BhdGNoRXZlbnQoJ2ljZWNvbm5lY3Rpb25zdGF0ZWNoYW5nZScsIGV2ZW50KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvLyBVcGRhdGUgdGhlIGNvbm5lY3Rpb24gc3RhdGUuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLl91cGRhdGVDb25uZWN0aW9uU3RhdGUgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBuZXdTdGF0ZTtcclxuICAgIHZhciBzdGF0ZXMgPSB7XHJcbiAgICAgICduZXcnOiAwLFxyXG4gICAgICBjbG9zZWQ6IDAsXHJcbiAgICAgIGNvbm5lY3Rpbmc6IDAsXHJcbiAgICAgIGNvbm5lY3RlZDogMCxcclxuICAgICAgY29tcGxldGVkOiAwLFxyXG4gICAgICBkaXNjb25uZWN0ZWQ6IDAsXHJcbiAgICAgIGZhaWxlZDogMFxyXG4gICAgfTtcclxuICAgIHRoaXMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcclxuICAgICAgc3RhdGVzW3RyYW5zY2VpdmVyLmljZVRyYW5zcG9ydC5zdGF0ZV0rKztcclxuICAgICAgc3RhdGVzW3RyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQuc3RhdGVdKys7XHJcbiAgICB9KTtcclxuICAgIC8vIElDRVRyYW5zcG9ydC5jb21wbGV0ZWQgYW5kIGNvbm5lY3RlZCBhcmUgdGhlIHNhbWUgZm9yIHRoaXMgcHVycG9zZS5cclxuICAgIHN0YXRlcy5jb25uZWN0ZWQgKz0gc3RhdGVzLmNvbXBsZXRlZDtcclxuXHJcbiAgICBuZXdTdGF0ZSA9ICduZXcnO1xyXG4gICAgaWYgKHN0YXRlcy5mYWlsZWQgPiAwKSB7XHJcbiAgICAgIG5ld1N0YXRlID0gJ2ZhaWxlZCc7XHJcbiAgICB9IGVsc2UgaWYgKHN0YXRlcy5jb25uZWN0aW5nID4gMCkge1xyXG4gICAgICBuZXdTdGF0ZSA9ICdjb25uZWN0aW5nJztcclxuICAgIH0gZWxzZSBpZiAoc3RhdGVzLmRpc2Nvbm5lY3RlZCA+IDApIHtcclxuICAgICAgbmV3U3RhdGUgPSAnZGlzY29ubmVjdGVkJztcclxuICAgIH0gZWxzZSBpZiAoc3RhdGVzLm5ldyA+IDApIHtcclxuICAgICAgbmV3U3RhdGUgPSAnbmV3JztcclxuICAgIH0gZWxzZSBpZiAoc3RhdGVzLmNvbm5lY3RlZCA+IDApIHtcclxuICAgICAgbmV3U3RhdGUgPSAnY29ubmVjdGVkJztcclxuICAgIH1cclxuXHJcbiAgICBpZiAobmV3U3RhdGUgIT09IHRoaXMuY29ubmVjdGlvblN0YXRlKSB7XHJcbiAgICAgIHRoaXMuY29ubmVjdGlvblN0YXRlID0gbmV3U3RhdGU7XHJcbiAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgnY29ubmVjdGlvbnN0YXRlY2hhbmdlJyk7XHJcbiAgICAgIHRoaXMuX2Rpc3BhdGNoRXZlbnQoJ2Nvbm5lY3Rpb25zdGF0ZWNoYW5nZScsIGV2ZW50KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlT2ZmZXIgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBwYyA9IHRoaXM7XHJcblxyXG4gICAgaWYgKHBjLl9pc0Nsb3NlZCkge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobWFrZUVycm9yKCdJbnZhbGlkU3RhdGVFcnJvcicsXHJcbiAgICAgICAgICAnQ2FuIG5vdCBjYWxsIGNyZWF0ZU9mZmVyIGFmdGVyIGNsb3NlJykpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBudW1BdWRpb1RyYWNrcyA9IHBjLnRyYW5zY2VpdmVycy5maWx0ZXIoZnVuY3Rpb24odCkge1xyXG4gICAgICByZXR1cm4gdC5raW5kID09PSAnYXVkaW8nO1xyXG4gICAgfSkubGVuZ3RoO1xyXG4gICAgdmFyIG51bVZpZGVvVHJhY2tzID0gcGMudHJhbnNjZWl2ZXJzLmZpbHRlcihmdW5jdGlvbih0KSB7XHJcbiAgICAgIHJldHVybiB0LmtpbmQgPT09ICd2aWRlbyc7XHJcbiAgICB9KS5sZW5ndGg7XHJcblxyXG4gICAgLy8gRGV0ZXJtaW5lIG51bWJlciBvZiBhdWRpbyBhbmQgdmlkZW8gdHJhY2tzIHdlIG5lZWQgdG8gc2VuZC9yZWN2LlxyXG4gICAgdmFyIG9mZmVyT3B0aW9ucyA9IGFyZ3VtZW50c1swXTtcclxuICAgIGlmIChvZmZlck9wdGlvbnMpIHtcclxuICAgICAgLy8gUmVqZWN0IENocm9tZSBsZWdhY3kgY29uc3RyYWludHMuXHJcbiAgICAgIGlmIChvZmZlck9wdGlvbnMubWFuZGF0b3J5IHx8IG9mZmVyT3B0aW9ucy5vcHRpb25hbCkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXHJcbiAgICAgICAgICAgICdMZWdhY3kgbWFuZGF0b3J5L29wdGlvbmFsIGNvbnN0cmFpbnRzIG5vdCBzdXBwb3J0ZWQuJyk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZUF1ZGlvICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW8gPT09IHRydWUpIHtcclxuICAgICAgICAgIG51bUF1ZGlvVHJhY2tzID0gMTtcclxuICAgICAgICB9IGVsc2UgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZUF1ZGlvID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgbnVtQXVkaW9UcmFja3MgPSAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBudW1BdWRpb1RyYWNrcyA9IG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZUF1ZGlvO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlVmlkZW8gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVWaWRlbyA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgbnVtVmlkZW9UcmFja3MgPSAxO1xyXG4gICAgICAgIH0gZWxzZSBpZiAob2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlVmlkZW8gPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICBudW1WaWRlb1RyYWNrcyA9IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG51bVZpZGVvVHJhY2tzID0gb2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlVmlkZW87XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcGMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcclxuICAgICAgaWYgKHRyYW5zY2VpdmVyLmtpbmQgPT09ICdhdWRpbycpIHtcclxuICAgICAgICBudW1BdWRpb1RyYWNrcy0tO1xyXG4gICAgICAgIGlmIChudW1BdWRpb1RyYWNrcyA8IDApIHtcclxuICAgICAgICAgIHRyYW5zY2VpdmVyLndhbnRSZWNlaXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLmtpbmQgPT09ICd2aWRlbycpIHtcclxuICAgICAgICBudW1WaWRlb1RyYWNrcy0tO1xyXG4gICAgICAgIGlmIChudW1WaWRlb1RyYWNrcyA8IDApIHtcclxuICAgICAgICAgIHRyYW5zY2VpdmVyLndhbnRSZWNlaXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBDcmVhdGUgTS1saW5lcyBmb3IgcmVjdm9ubHkgc3RyZWFtcy5cclxuICAgIHdoaWxlIChudW1BdWRpb1RyYWNrcyA+IDAgfHwgbnVtVmlkZW9UcmFja3MgPiAwKSB7XHJcbiAgICAgIGlmIChudW1BdWRpb1RyYWNrcyA+IDApIHtcclxuICAgICAgICBwYy5fY3JlYXRlVHJhbnNjZWl2ZXIoJ2F1ZGlvJyk7XHJcbiAgICAgICAgbnVtQXVkaW9UcmFja3MtLTtcclxuICAgICAgfVxyXG4gICAgICBpZiAobnVtVmlkZW9UcmFja3MgPiAwKSB7XHJcbiAgICAgICAgcGMuX2NyZWF0ZVRyYW5zY2VpdmVyKCd2aWRlbycpO1xyXG4gICAgICAgIG51bVZpZGVvVHJhY2tzLS07XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgc2RwID0gU0RQVXRpbHMud3JpdGVTZXNzaW9uQm9pbGVycGxhdGUocGMuX3NkcFNlc3Npb25JZCxcclxuICAgICAgICBwYy5fc2RwU2Vzc2lvblZlcnNpb24rKyk7XHJcbiAgICBwYy50cmFuc2NlaXZlcnMuZm9yRWFjaChmdW5jdGlvbih0cmFuc2NlaXZlciwgc2RwTUxpbmVJbmRleCkge1xyXG4gICAgICAvLyBGb3IgZWFjaCB0cmFjaywgY3JlYXRlIGFuIGljZSBnYXRoZXJlciwgaWNlIHRyYW5zcG9ydCxcclxuICAgICAgLy8gZHRscyB0cmFuc3BvcnQsIHBvdGVudGlhbGx5IHJ0cHNlbmRlciBhbmQgcnRwcmVjZWl2ZXIuXHJcbiAgICAgIHZhciB0cmFjayA9IHRyYW5zY2VpdmVyLnRyYWNrO1xyXG4gICAgICB2YXIga2luZCA9IHRyYW5zY2VpdmVyLmtpbmQ7XHJcbiAgICAgIHZhciBtaWQgPSB0cmFuc2NlaXZlci5taWQgfHwgU0RQVXRpbHMuZ2VuZXJhdGVJZGVudGlmaWVyKCk7XHJcbiAgICAgIHRyYW5zY2VpdmVyLm1pZCA9IG1pZDtcclxuXHJcbiAgICAgIGlmICghdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIpIHtcclxuICAgICAgICB0cmFuc2NlaXZlci5pY2VHYXRoZXJlciA9IHBjLl9jcmVhdGVJY2VHYXRoZXJlcihzZHBNTGluZUluZGV4LFxyXG4gICAgICAgICAgICBwYy51c2luZ0J1bmRsZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBsb2NhbENhcGFiaWxpdGllcyA9IHdpbmRvdy5SVENSdHBTZW5kZXIuZ2V0Q2FwYWJpbGl0aWVzKGtpbmQpO1xyXG4gICAgICAvLyBmaWx0ZXIgUlRYIHVudGlsIGFkZGl0aW9uYWwgc3R1ZmYgbmVlZGVkIGZvciBSVFggaXMgaW1wbGVtZW50ZWRcclxuICAgICAgLy8gaW4gYWRhcHRlci5qc1xyXG4gICAgICBpZiAoZWRnZVZlcnNpb24gPCAxNTAxOSkge1xyXG4gICAgICAgIGxvY2FsQ2FwYWJpbGl0aWVzLmNvZGVjcyA9IGxvY2FsQ2FwYWJpbGl0aWVzLmNvZGVjcy5maWx0ZXIoXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uKGNvZGVjKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGNvZGVjLm5hbWUgIT09ICdydHgnO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBsb2NhbENhcGFiaWxpdGllcy5jb2RlY3MuZm9yRWFjaChmdW5jdGlvbihjb2RlYykge1xyXG4gICAgICAgIC8vIHdvcmsgYXJvdW5kIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC93ZWJydGMvaXNzdWVzL2RldGFpbD9pZD02NTUyXHJcbiAgICAgICAgLy8gYnkgYWRkaW5nIGxldmVsLWFzeW1tZXRyeS1hbGxvd2VkPTFcclxuICAgICAgICBpZiAoY29kZWMubmFtZSA9PT0gJ0gyNjQnICYmXHJcbiAgICAgICAgICAgIGNvZGVjLnBhcmFtZXRlcnNbJ2xldmVsLWFzeW1tZXRyeS1hbGxvd2VkJ10gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgY29kZWMucGFyYW1ldGVyc1snbGV2ZWwtYXN5bW1ldHJ5LWFsbG93ZWQnXSA9ICcxJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGZvciBzdWJzZXF1ZW50IG9mZmVycywgd2UgbWlnaHQgaGF2ZSB0byByZS11c2UgdGhlIHBheWxvYWRcclxuICAgICAgICAvLyB0eXBlIG9mIHRoZSBsYXN0IG9mZmVyLlxyXG4gICAgICAgIGlmICh0cmFuc2NlaXZlci5yZW1vdGVDYXBhYmlsaXRpZXMgJiZcclxuICAgICAgICAgICAgdHJhbnNjZWl2ZXIucmVtb3RlQ2FwYWJpbGl0aWVzLmNvZGVjcykge1xyXG4gICAgICAgICAgdHJhbnNjZWl2ZXIucmVtb3RlQ2FwYWJpbGl0aWVzLmNvZGVjcy5mb3JFYWNoKGZ1bmN0aW9uKHJlbW90ZUNvZGVjKSB7XHJcbiAgICAgICAgICAgIGlmIChjb2RlYy5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IHJlbW90ZUNvZGVjLm5hbWUudG9Mb3dlckNhc2UoKSAmJlxyXG4gICAgICAgICAgICAgICAgY29kZWMuY2xvY2tSYXRlID09PSByZW1vdGVDb2RlYy5jbG9ja1JhdGUpIHtcclxuICAgICAgICAgICAgICBjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZSA9IHJlbW90ZUNvZGVjLnBheWxvYWRUeXBlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBsb2NhbENhcGFiaWxpdGllcy5oZWFkZXJFeHRlbnNpb25zLmZvckVhY2goZnVuY3Rpb24oaGRyRXh0KSB7XHJcbiAgICAgICAgdmFyIHJlbW90ZUV4dGVuc2lvbnMgPSB0cmFuc2NlaXZlci5yZW1vdGVDYXBhYmlsaXRpZXMgJiZcclxuICAgICAgICAgICAgdHJhbnNjZWl2ZXIucmVtb3RlQ2FwYWJpbGl0aWVzLmhlYWRlckV4dGVuc2lvbnMgfHwgW107XHJcbiAgICAgICAgcmVtb3RlRXh0ZW5zaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHJIZHJFeHQpIHtcclxuICAgICAgICAgIGlmIChoZHJFeHQudXJpID09PSBySGRyRXh0LnVyaSkge1xyXG4gICAgICAgICAgICBoZHJFeHQuaWQgPSBySGRyRXh0LmlkO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIGdlbmVyYXRlIGFuIHNzcmMgbm93LCB0byBiZSB1c2VkIGxhdGVyIGluIHJ0cFNlbmRlci5zZW5kXHJcbiAgICAgIHZhciBzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzID0gdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVycyB8fCBbe1xyXG4gICAgICAgIHNzcmM6ICgyICogc2RwTUxpbmVJbmRleCArIDEpICogMTAwMVxyXG4gICAgICB9XTtcclxuICAgICAgaWYgKHRyYWNrKSB7XHJcbiAgICAgICAgLy8gYWRkIFJUWFxyXG4gICAgICAgIGlmIChlZGdlVmVyc2lvbiA+PSAxNTAxOSAmJiBraW5kID09PSAndmlkZW8nICYmXHJcbiAgICAgICAgICAgICFzZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCkge1xyXG4gICAgICAgICAgc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHggPSB7XHJcbiAgICAgICAgICAgIHNzcmM6IHNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYyArIDFcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodHJhbnNjZWl2ZXIud2FudFJlY2VpdmUpIHtcclxuICAgICAgICB0cmFuc2NlaXZlci5ydHBSZWNlaXZlciA9IG5ldyB3aW5kb3cuUlRDUnRwUmVjZWl2ZXIoXHJcbiAgICAgICAgICAgIHRyYW5zY2VpdmVyLmR0bHNUcmFuc3BvcnQsIGtpbmQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0cmFuc2NlaXZlci5sb2NhbENhcGFiaWxpdGllcyA9IGxvY2FsQ2FwYWJpbGl0aWVzO1xyXG4gICAgICB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzID0gc2VuZEVuY29kaW5nUGFyYW1ldGVycztcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIGFsd2F5cyBvZmZlciBCVU5ETEUgYW5kIGRpc3Bvc2Ugb24gcmV0dXJuIGlmIG5vdCBzdXBwb3J0ZWQuXHJcbiAgICBpZiAocGMuX2NvbmZpZy5idW5kbGVQb2xpY3kgIT09ICdtYXgtY29tcGF0Jykge1xyXG4gICAgICBzZHAgKz0gJ2E9Z3JvdXA6QlVORExFICcgKyBwYy50cmFuc2NlaXZlcnMubWFwKGZ1bmN0aW9uKHQpIHtcclxuICAgICAgICByZXR1cm4gdC5taWQ7XHJcbiAgICAgIH0pLmpvaW4oJyAnKSArICdcXHJcXG4nO1xyXG4gICAgfVxyXG4gICAgc2RwICs9ICdhPWljZS1vcHRpb25zOnRyaWNrbGVcXHJcXG4nO1xyXG5cclxuICAgIHBjLnRyYW5zY2VpdmVycy5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zY2VpdmVyLCBzZHBNTGluZUluZGV4KSB7XHJcbiAgICAgIHNkcCArPSB3cml0ZU1lZGlhU2VjdGlvbih0cmFuc2NlaXZlciwgdHJhbnNjZWl2ZXIubG9jYWxDYXBhYmlsaXRpZXMsXHJcbiAgICAgICAgICAnb2ZmZXInLCB0cmFuc2NlaXZlci5zdHJlYW0sIHBjLl9kdGxzUm9sZSk7XHJcbiAgICAgIHNkcCArPSAnYT1ydGNwLXJzaXplXFxyXFxuJztcclxuXHJcbiAgICAgIGlmICh0cmFuc2NlaXZlci5pY2VHYXRoZXJlciAmJiBwYy5pY2VHYXRoZXJpbmdTdGF0ZSAhPT0gJ25ldycgJiZcclxuICAgICAgICAgIChzZHBNTGluZUluZGV4ID09PSAwIHx8ICFwYy51c2luZ0J1bmRsZSkpIHtcclxuICAgICAgICB0cmFuc2NlaXZlci5pY2VHYXRoZXJlci5nZXRMb2NhbENhbmRpZGF0ZXMoKS5mb3JFYWNoKGZ1bmN0aW9uKGNhbmQpIHtcclxuICAgICAgICAgIGNhbmQuY29tcG9uZW50ID0gMTtcclxuICAgICAgICAgIHNkcCArPSAnYT0nICsgU0RQVXRpbHMud3JpdGVDYW5kaWRhdGUoY2FuZCkgKyAnXFxyXFxuJztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHRyYW5zY2VpdmVyLmljZUdhdGhlcmVyLnN0YXRlID09PSAnY29tcGxldGVkJykge1xyXG4gICAgICAgICAgc2RwICs9ICdhPWVuZC1vZi1jYW5kaWRhdGVzXFxyXFxuJztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBkZXNjID0gbmV3IHdpbmRvdy5SVENTZXNzaW9uRGVzY3JpcHRpb24oe1xyXG4gICAgICB0eXBlOiAnb2ZmZXInLFxyXG4gICAgICBzZHA6IHNkcFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRlc2MpO1xyXG4gIH07XHJcblxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5jcmVhdGVBbnN3ZXIgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBwYyA9IHRoaXM7XHJcblxyXG4gICAgaWYgKHBjLl9pc0Nsb3NlZCkge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobWFrZUVycm9yKCdJbnZhbGlkU3RhdGVFcnJvcicsXHJcbiAgICAgICAgICAnQ2FuIG5vdCBjYWxsIGNyZWF0ZUFuc3dlciBhZnRlciBjbG9zZScpKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIShwYy5zaWduYWxpbmdTdGF0ZSA9PT0gJ2hhdmUtcmVtb3RlLW9mZmVyJyB8fFxyXG4gICAgICAgIHBjLnNpZ25hbGluZ1N0YXRlID09PSAnaGF2ZS1sb2NhbC1wcmFuc3dlcicpKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChtYWtlRXJyb3IoJ0ludmFsaWRTdGF0ZUVycm9yJyxcclxuICAgICAgICAgICdDYW4gbm90IGNhbGwgY3JlYXRlQW5zd2VyIGluIHNpZ25hbGluZ1N0YXRlICcgKyBwYy5zaWduYWxpbmdTdGF0ZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBzZHAgPSBTRFBVdGlscy53cml0ZVNlc3Npb25Cb2lsZXJwbGF0ZShwYy5fc2RwU2Vzc2lvbklkLFxyXG4gICAgICAgIHBjLl9zZHBTZXNzaW9uVmVyc2lvbisrKTtcclxuICAgIGlmIChwYy51c2luZ0J1bmRsZSkge1xyXG4gICAgICBzZHAgKz0gJ2E9Z3JvdXA6QlVORExFICcgKyBwYy50cmFuc2NlaXZlcnMubWFwKGZ1bmN0aW9uKHQpIHtcclxuICAgICAgICByZXR1cm4gdC5taWQ7XHJcbiAgICAgIH0pLmpvaW4oJyAnKSArICdcXHJcXG4nO1xyXG4gICAgfVxyXG4gICAgdmFyIG1lZGlhU2VjdGlvbnNJbk9mZmVyID0gU0RQVXRpbHMuZ2V0TWVkaWFTZWN0aW9ucyhcclxuICAgICAgICBwYy5yZW1vdGVEZXNjcmlwdGlvbi5zZHApLmxlbmd0aDtcclxuICAgIHBjLnRyYW5zY2VpdmVycy5mb3JFYWNoKGZ1bmN0aW9uKHRyYW5zY2VpdmVyLCBzZHBNTGluZUluZGV4KSB7XHJcbiAgICAgIGlmIChzZHBNTGluZUluZGV4ICsgMSA+IG1lZGlhU2VjdGlvbnNJbk9mZmVyKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0cmFuc2NlaXZlci5yZWplY3RlZCkge1xyXG4gICAgICAgIGlmICh0cmFuc2NlaXZlci5raW5kID09PSAnYXBwbGljYXRpb24nKSB7XHJcbiAgICAgICAgICBzZHAgKz0gJ209YXBwbGljYXRpb24gMCBEVExTL1NDVFAgNTAwMFxcclxcbic7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0cmFuc2NlaXZlci5raW5kID09PSAnYXVkaW8nKSB7XHJcbiAgICAgICAgICBzZHAgKz0gJ209YXVkaW8gMCBVRFAvVExTL1JUUC9TQVZQRiAwXFxyXFxuJyArXHJcbiAgICAgICAgICAgICAgJ2E9cnRwbWFwOjAgUENNVS84MDAwXFxyXFxuJztcclxuICAgICAgICB9IGVsc2UgaWYgKHRyYW5zY2VpdmVyLmtpbmQgPT09ICd2aWRlbycpIHtcclxuICAgICAgICAgIHNkcCArPSAnbT12aWRlbyAwIFVEUC9UTFMvUlRQL1NBVlBGIDEyMFxcclxcbicgK1xyXG4gICAgICAgICAgICAgICdhPXJ0cG1hcDoxMjAgVlA4LzkwMDAwXFxyXFxuJztcclxuICAgICAgICB9XHJcbiAgICAgICAgc2RwICs9ICdjPUlOIElQNCAwLjAuMC4wXFxyXFxuJyArXHJcbiAgICAgICAgICAgICdhPWluYWN0aXZlXFxyXFxuJyArXHJcbiAgICAgICAgICAgICdhPW1pZDonICsgdHJhbnNjZWl2ZXIubWlkICsgJ1xcclxcbic7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBGSVhNRTogbG9vayBhdCBkaXJlY3Rpb24uXHJcbiAgICAgIGlmICh0cmFuc2NlaXZlci5zdHJlYW0pIHtcclxuICAgICAgICB2YXIgbG9jYWxUcmFjaztcclxuICAgICAgICBpZiAodHJhbnNjZWl2ZXIua2luZCA9PT0gJ2F1ZGlvJykge1xyXG4gICAgICAgICAgbG9jYWxUcmFjayA9IHRyYW5zY2VpdmVyLnN0cmVhbS5nZXRBdWRpb1RyYWNrcygpWzBdO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHJhbnNjZWl2ZXIua2luZCA9PT0gJ3ZpZGVvJykge1xyXG4gICAgICAgICAgbG9jYWxUcmFjayA9IHRyYW5zY2VpdmVyLnN0cmVhbS5nZXRWaWRlb1RyYWNrcygpWzBdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobG9jYWxUcmFjaykge1xyXG4gICAgICAgICAgLy8gYWRkIFJUWFxyXG4gICAgICAgICAgaWYgKGVkZ2VWZXJzaW9uID49IDE1MDE5ICYmIHRyYW5zY2VpdmVyLmtpbmQgPT09ICd2aWRlbycgJiZcclxuICAgICAgICAgICAgICAhdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHgpIHtcclxuICAgICAgICAgICAgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHggPSB7XHJcbiAgICAgICAgICAgICAgc3NyYzogdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjICsgMVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQ2FsY3VsYXRlIGludGVyc2VjdGlvbiBvZiBjYXBhYmlsaXRpZXMuXHJcbiAgICAgIHZhciBjb21tb25DYXBhYmlsaXRpZXMgPSBnZXRDb21tb25DYXBhYmlsaXRpZXMoXHJcbiAgICAgICAgICB0cmFuc2NlaXZlci5sb2NhbENhcGFiaWxpdGllcyxcclxuICAgICAgICAgIHRyYW5zY2VpdmVyLnJlbW90ZUNhcGFiaWxpdGllcyk7XHJcblxyXG4gICAgICB2YXIgaGFzUnR4ID0gY29tbW9uQ2FwYWJpbGl0aWVzLmNvZGVjcy5maWx0ZXIoZnVuY3Rpb24oYykge1xyXG4gICAgICAgIHJldHVybiBjLm5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3J0eCc7XHJcbiAgICAgIH0pLmxlbmd0aDtcclxuICAgICAgaWYgKCFoYXNSdHggJiYgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHgpIHtcclxuICAgICAgICBkZWxldGUgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5ydHg7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNkcCArPSB3cml0ZU1lZGlhU2VjdGlvbih0cmFuc2NlaXZlciwgY29tbW9uQ2FwYWJpbGl0aWVzLFxyXG4gICAgICAgICAgJ2Fuc3dlcicsIHRyYW5zY2VpdmVyLnN0cmVhbSwgcGMuX2R0bHNSb2xlKTtcclxuICAgICAgaWYgKHRyYW5zY2VpdmVyLnJ0Y3BQYXJhbWV0ZXJzICYmXHJcbiAgICAgICAgICB0cmFuc2NlaXZlci5ydGNwUGFyYW1ldGVycy5yZWR1Y2VkU2l6ZSkge1xyXG4gICAgICAgIHNkcCArPSAnYT1ydGNwLXJzaXplXFxyXFxuJztcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIGRlc2MgPSBuZXcgd2luZG93LlJUQ1Nlc3Npb25EZXNjcmlwdGlvbih7XHJcbiAgICAgIHR5cGU6ICdhbnN3ZXInLFxyXG4gICAgICBzZHA6IHNkcFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRlc2MpO1xyXG4gIH07XHJcblxyXG4gIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRJY2VDYW5kaWRhdGUgPSBmdW5jdGlvbihjYW5kaWRhdGUpIHtcclxuICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICB2YXIgc2VjdGlvbnM7XHJcbiAgICBpZiAoY2FuZGlkYXRlICYmICEoY2FuZGlkYXRlLnNkcE1MaW5lSW5kZXggIT09IHVuZGVmaW5lZCB8fFxyXG4gICAgICAgIGNhbmRpZGF0ZS5zZHBNaWQpKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgVHlwZUVycm9yKCdzZHBNTGluZUluZGV4IG9yIHNkcE1pZCByZXF1aXJlZCcpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUT0RPOiBuZWVkcyB0byBnbyBpbnRvIG9wcyBxdWV1ZS5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgaWYgKCFwYy5yZW1vdGVEZXNjcmlwdGlvbikge1xyXG4gICAgICAgIHJldHVybiByZWplY3QobWFrZUVycm9yKCdJbnZhbGlkU3RhdGVFcnJvcicsXHJcbiAgICAgICAgICAgICdDYW4gbm90IGFkZCBJQ0UgY2FuZGlkYXRlIHdpdGhvdXQgYSByZW1vdGUgZGVzY3JpcHRpb24nKSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoIWNhbmRpZGF0ZSB8fCBjYW5kaWRhdGUuY2FuZGlkYXRlID09PSAnJykge1xyXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcGMudHJhbnNjZWl2ZXJzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICBpZiAocGMudHJhbnNjZWl2ZXJzW2pdLnJlamVjdGVkKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcGMudHJhbnNjZWl2ZXJzW2pdLmljZVRyYW5zcG9ydC5hZGRSZW1vdGVDYW5kaWRhdGUoe30pO1xyXG4gICAgICAgICAgc2VjdGlvbnMgPSBTRFBVdGlscy5nZXRNZWRpYVNlY3Rpb25zKHBjLnJlbW90ZURlc2NyaXB0aW9uLnNkcCk7XHJcbiAgICAgICAgICBzZWN0aW9uc1tqXSArPSAnYT1lbmQtb2YtY2FuZGlkYXRlc1xcclxcbic7XHJcbiAgICAgICAgICBwYy5yZW1vdGVEZXNjcmlwdGlvbi5zZHAgPVxyXG4gICAgICAgICAgICAgIFNEUFV0aWxzLmdldERlc2NyaXB0aW9uKHBjLnJlbW90ZURlc2NyaXB0aW9uLnNkcCkgK1xyXG4gICAgICAgICAgICAgIHNlY3Rpb25zLmpvaW4oJycpO1xyXG4gICAgICAgICAgaWYgKHBjLnVzaW5nQnVuZGxlKSB7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgc2RwTUxpbmVJbmRleCA9IGNhbmRpZGF0ZS5zZHBNTGluZUluZGV4O1xyXG4gICAgICAgIGlmIChjYW5kaWRhdGUuc2RwTWlkKSB7XHJcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBjLnRyYW5zY2VpdmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAocGMudHJhbnNjZWl2ZXJzW2ldLm1pZCA9PT0gY2FuZGlkYXRlLnNkcE1pZCkge1xyXG4gICAgICAgICAgICAgIHNkcE1MaW5lSW5kZXggPSBpO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciB0cmFuc2NlaXZlciA9IHBjLnRyYW5zY2VpdmVyc1tzZHBNTGluZUluZGV4XTtcclxuICAgICAgICBpZiAodHJhbnNjZWl2ZXIpIHtcclxuICAgICAgICAgIGlmICh0cmFuc2NlaXZlci5yZWplY3RlZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdmFyIGNhbmQgPSBPYmplY3Qua2V5cyhjYW5kaWRhdGUuY2FuZGlkYXRlKS5sZW5ndGggPiAwID9cclxuICAgICAgICAgICAgICBTRFBVdGlscy5wYXJzZUNhbmRpZGF0ZShjYW5kaWRhdGUuY2FuZGlkYXRlKSA6IHt9O1xyXG4gICAgICAgICAgLy8gSWdub3JlIENocm9tZSdzIGludmFsaWQgY2FuZGlkYXRlcyBzaW5jZSBFZGdlIGRvZXMgbm90IGxpa2UgdGhlbS5cclxuICAgICAgICAgIGlmIChjYW5kLnByb3RvY29sID09PSAndGNwJyAmJiAoY2FuZC5wb3J0ID09PSAwIHx8IGNhbmQucG9ydCA9PT0gOSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIC8vIElnbm9yZSBSVENQIGNhbmRpZGF0ZXMsIHdlIGFzc3VtZSBSVENQLU1VWC5cclxuICAgICAgICAgIGlmIChjYW5kLmNvbXBvbmVudCAmJiBjYW5kLmNvbXBvbmVudCAhPT0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgLy8gd2hlbiB1c2luZyBidW5kbGUsIGF2b2lkIGFkZGluZyBjYW5kaWRhdGVzIHRvIHRoZSB3cm9uZ1xyXG4gICAgICAgICAgLy8gaWNlIHRyYW5zcG9ydC4gQW5kIGF2b2lkIGFkZGluZyBjYW5kaWRhdGVzIGFkZGVkIGluIHRoZSBTRFAuXHJcbiAgICAgICAgICBpZiAoc2RwTUxpbmVJbmRleCA9PT0gMCB8fCAoc2RwTUxpbmVJbmRleCA+IDAgJiZcclxuICAgICAgICAgICAgICB0cmFuc2NlaXZlci5pY2VUcmFuc3BvcnQgIT09IHBjLnRyYW5zY2VpdmVyc1swXS5pY2VUcmFuc3BvcnQpKSB7XHJcbiAgICAgICAgICAgIGlmICghbWF5YmVBZGRDYW5kaWRhdGUodHJhbnNjZWl2ZXIuaWNlVHJhbnNwb3J0LCBjYW5kKSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiByZWplY3QobWFrZUVycm9yKCdPcGVyYXRpb25FcnJvcicsXHJcbiAgICAgICAgICAgICAgICAgICdDYW4gbm90IGFkZCBJQ0UgY2FuZGlkYXRlJykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gdXBkYXRlIHRoZSByZW1vdGVEZXNjcmlwdGlvbi5cclxuICAgICAgICAgIHZhciBjYW5kaWRhdGVTdHJpbmcgPSBjYW5kaWRhdGUuY2FuZGlkYXRlLnRyaW0oKTtcclxuICAgICAgICAgIGlmIChjYW5kaWRhdGVTdHJpbmcuaW5kZXhPZignYT0nKSA9PT0gMCkge1xyXG4gICAgICAgICAgICBjYW5kaWRhdGVTdHJpbmcgPSBjYW5kaWRhdGVTdHJpbmcuc3Vic3RyKDIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgc2VjdGlvbnMgPSBTRFBVdGlscy5nZXRNZWRpYVNlY3Rpb25zKHBjLnJlbW90ZURlc2NyaXB0aW9uLnNkcCk7XHJcbiAgICAgICAgICBzZWN0aW9uc1tzZHBNTGluZUluZGV4XSArPSAnYT0nICtcclxuICAgICAgICAgICAgICAoY2FuZC50eXBlID8gY2FuZGlkYXRlU3RyaW5nIDogJ2VuZC1vZi1jYW5kaWRhdGVzJylcclxuICAgICAgICAgICAgICArICdcXHJcXG4nO1xyXG4gICAgICAgICAgcGMucmVtb3RlRGVzY3JpcHRpb24uc2RwID1cclxuICAgICAgICAgICAgICBTRFBVdGlscy5nZXREZXNjcmlwdGlvbihwYy5yZW1vdGVEZXNjcmlwdGlvbi5zZHApICtcclxuICAgICAgICAgICAgICBzZWN0aW9ucy5qb2luKCcnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIHJlamVjdChtYWtlRXJyb3IoJ09wZXJhdGlvbkVycm9yJyxcclxuICAgICAgICAgICAgICAnQ2FuIG5vdCBhZGQgSUNFIGNhbmRpZGF0ZScpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFN0YXRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgcHJvbWlzZXMgPSBbXTtcclxuICAgIHRoaXMudHJhbnNjZWl2ZXJzLmZvckVhY2goZnVuY3Rpb24odHJhbnNjZWl2ZXIpIHtcclxuICAgICAgWydydHBTZW5kZXInLCAncnRwUmVjZWl2ZXInLCAnaWNlR2F0aGVyZXInLCAnaWNlVHJhbnNwb3J0JyxcclxuICAgICAgICAgICdkdGxzVHJhbnNwb3J0J10uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcclxuICAgICAgICAgICAgaWYgKHRyYW5zY2VpdmVyW21ldGhvZF0pIHtcclxuICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKHRyYW5zY2VpdmVyW21ldGhvZF0uZ2V0U3RhdHMoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICB2YXIgZml4U3RhdHNUeXBlID0gZnVuY3Rpb24oc3RhdCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGluYm91bmRydHA6ICdpbmJvdW5kLXJ0cCcsXHJcbiAgICAgICAgb3V0Ym91bmRydHA6ICdvdXRib3VuZC1ydHAnLFxyXG4gICAgICAgIGNhbmRpZGF0ZXBhaXI6ICdjYW5kaWRhdGUtcGFpcicsXHJcbiAgICAgICAgbG9jYWxjYW5kaWRhdGU6ICdsb2NhbC1jYW5kaWRhdGUnLFxyXG4gICAgICAgIHJlbW90ZWNhbmRpZGF0ZTogJ3JlbW90ZS1jYW5kaWRhdGUnXHJcbiAgICAgIH1bc3RhdC50eXBlXSB8fCBzdGF0LnR5cGU7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcclxuICAgICAgLy8gc2hpbSBnZXRTdGF0cyB3aXRoIG1hcGxpa2Ugc3VwcG9ydFxyXG4gICAgICB2YXIgcmVzdWx0cyA9IG5ldyBNYXAoKTtcclxuICAgICAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgcmVzLmZvckVhY2goZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICBPYmplY3Qua2V5cyhyZXN1bHQpLmZvckVhY2goZnVuY3Rpb24oaWQpIHtcclxuICAgICAgICAgICAgcmVzdWx0W2lkXS50eXBlID0gZml4U3RhdHNUeXBlKHJlc3VsdFtpZF0pO1xyXG4gICAgICAgICAgICByZXN1bHRzLnNldChpZCwgcmVzdWx0W2lkXSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXNvbHZlKHJlc3VsdHMpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIC8vIGxlZ2FjeSBjYWxsYmFjayBzaGltcy4gU2hvdWxkIGJlIG1vdmVkIHRvIGFkYXB0ZXIuanMgc29tZSBkYXlzLlxyXG4gIHZhciBtZXRob2RzID0gWydjcmVhdGVPZmZlcicsICdjcmVhdGVBbnN3ZXInXTtcclxuICBtZXRob2RzLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XHJcbiAgICB2YXIgbmF0aXZlTWV0aG9kID0gUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF07XHJcbiAgICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcclxuICAgICAgaWYgKHR5cGVvZiBhcmdzWzBdID09PSAnZnVuY3Rpb24nIHx8XHJcbiAgICAgICAgICB0eXBlb2YgYXJnc1sxXSA9PT0gJ2Z1bmN0aW9uJykgeyAvLyBsZWdhY3lcclxuICAgICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHRoaXMsIFthcmd1bWVudHNbMl1dKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKGRlc2NyaXB0aW9uKSB7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIGFyZ3NbMF0gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgYXJnc1swXS5hcHBseShudWxsLCBbZGVzY3JpcHRpb25dKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBhcmdzWzFdID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIGFyZ3NbMV0uYXBwbHkobnVsbCwgW2Vycm9yXSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgfTtcclxuICB9KTtcclxuXHJcbiAgbWV0aG9kcyA9IFsnc2V0TG9jYWxEZXNjcmlwdGlvbicsICdzZXRSZW1vdGVEZXNjcmlwdGlvbicsICdhZGRJY2VDYW5kaWRhdGUnXTtcclxuICBtZXRob2RzLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XHJcbiAgICB2YXIgbmF0aXZlTWV0aG9kID0gUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF07XHJcbiAgICBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcclxuICAgICAgaWYgKHR5cGVvZiBhcmdzWzFdID09PSAnZnVuY3Rpb24nIHx8XHJcbiAgICAgICAgICB0eXBlb2YgYXJnc1syXSA9PT0gJ2Z1bmN0aW9uJykgeyAvLyBsZWdhY3lcclxuICAgICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcclxuICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGlmICh0eXBlb2YgYXJnc1sxXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICBhcmdzWzFdLmFwcGx5KG51bGwpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIGFyZ3NbMl0gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgYXJnc1syXS5hcHBseShudWxsLCBbZXJyb3JdKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xyXG4gIH0pO1xyXG5cclxuICAvLyBnZXRTdGF0cyBpcyBzcGVjaWFsLiBJdCBkb2Vzbid0IGhhdmUgYSBzcGVjIGxlZ2FjeSBtZXRob2QgeWV0IHdlIHN1cHBvcnRcclxuICAvLyBnZXRTdGF0cyhzb21ldGhpbmcsIGNiKSB3aXRob3V0IGVycm9yIGNhbGxiYWNrcy5cclxuICBbJ2dldFN0YXRzJ10uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcclxuICAgIHZhciBuYXRpdmVNZXRob2QgPSBSVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXTtcclxuICAgIFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xyXG4gICAgICBpZiAodHlwZW9mIGFyZ3NbMV0gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcclxuICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGlmICh0eXBlb2YgYXJnc1sxXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICBhcmdzWzFdLmFwcGx5KG51bGwpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIH07XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBSVENQZWVyQ29ubmVjdGlvbjtcclxufTtcclxuXHJcbn0se1wic2RwXCI6Mn1dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG4gLyogZXNsaW50LWVudiBub2RlICovXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIFNEUCBoZWxwZXJzLlxyXG52YXIgU0RQVXRpbHMgPSB7fTtcclxuXHJcbi8vIEdlbmVyYXRlIGFuIGFscGhhbnVtZXJpYyBpZGVudGlmaWVyIGZvciBjbmFtZSBvciBtaWRzLlxyXG4vLyBUT0RPOiB1c2UgVVVJRHMgaW5zdGVhZD8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vamVkLzk4Mjg4M1xyXG5TRFBVdGlscy5nZW5lcmF0ZUlkZW50aWZpZXIgPSBmdW5jdGlvbigpIHtcclxuICByZXR1cm4gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsIDEwKTtcclxufTtcclxuXHJcbi8vIFRoZSBSVENQIENOQU1FIHVzZWQgYnkgYWxsIHBlZXJjb25uZWN0aW9ucyBmcm9tIHRoZSBzYW1lIEpTLlxyXG5TRFBVdGlscy5sb2NhbENOYW1lID0gU0RQVXRpbHMuZ2VuZXJhdGVJZGVudGlmaWVyKCk7XHJcblxyXG4vLyBTcGxpdHMgU0RQIGludG8gbGluZXMsIGRlYWxpbmcgd2l0aCBib3RoIENSTEYgYW5kIExGLlxyXG5TRFBVdGlscy5zcGxpdExpbmVzID0gZnVuY3Rpb24oYmxvYikge1xyXG4gIHJldHVybiBibG9iLnRyaW0oKS5zcGxpdCgnXFxuJykubWFwKGZ1bmN0aW9uKGxpbmUpIHtcclxuICAgIHJldHVybiBsaW5lLnRyaW0oKTtcclxuICB9KTtcclxufTtcclxuLy8gU3BsaXRzIFNEUCBpbnRvIHNlc3Npb25wYXJ0IGFuZCBtZWRpYXNlY3Rpb25zLiBFbnN1cmVzIENSTEYuXHJcblNEUFV0aWxzLnNwbGl0U2VjdGlvbnMgPSBmdW5jdGlvbihibG9iKSB7XHJcbiAgdmFyIHBhcnRzID0gYmxvYi5zcGxpdCgnXFxubT0nKTtcclxuICByZXR1cm4gcGFydHMubWFwKGZ1bmN0aW9uKHBhcnQsIGluZGV4KSB7XHJcbiAgICByZXR1cm4gKGluZGV4ID4gMCA/ICdtPScgKyBwYXJ0IDogcGFydCkudHJpbSgpICsgJ1xcclxcbic7XHJcbiAgfSk7XHJcbn07XHJcblxyXG4vLyByZXR1cm5zIHRoZSBzZXNzaW9uIGRlc2NyaXB0aW9uLlxyXG5TRFBVdGlscy5nZXREZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKGJsb2IpIHtcclxuICB2YXIgc2VjdGlvbnMgPSBTRFBVdGlscy5zcGxpdFNlY3Rpb25zKGJsb2IpO1xyXG4gIHJldHVybiBzZWN0aW9ucyAmJiBzZWN0aW9uc1swXTtcclxufTtcclxuXHJcbi8vIHJldHVybnMgdGhlIGluZGl2aWR1YWwgbWVkaWEgc2VjdGlvbnMuXHJcblNEUFV0aWxzLmdldE1lZGlhU2VjdGlvbnMgPSBmdW5jdGlvbihibG9iKSB7XHJcbiAgdmFyIHNlY3Rpb25zID0gU0RQVXRpbHMuc3BsaXRTZWN0aW9ucyhibG9iKTtcclxuICBzZWN0aW9ucy5zaGlmdCgpO1xyXG4gIHJldHVybiBzZWN0aW9ucztcclxufTtcclxuXHJcbi8vIFJldHVybnMgbGluZXMgdGhhdCBzdGFydCB3aXRoIGEgY2VydGFpbiBwcmVmaXguXHJcblNEUFV0aWxzLm1hdGNoUHJlZml4ID0gZnVuY3Rpb24oYmxvYiwgcHJlZml4KSB7XHJcbiAgcmV0dXJuIFNEUFV0aWxzLnNwbGl0TGluZXMoYmxvYikuZmlsdGVyKGZ1bmN0aW9uKGxpbmUpIHtcclxuICAgIHJldHVybiBsaW5lLmluZGV4T2YocHJlZml4KSA9PT0gMDtcclxuICB9KTtcclxufTtcclxuXHJcbi8vIFBhcnNlcyBhbiBJQ0UgY2FuZGlkYXRlIGxpbmUuIFNhbXBsZSBpbnB1dDpcclxuLy8gY2FuZGlkYXRlOjcwMjc4NjM1MCAyIHVkcCA0MTgxOTkwMiA4LjguOC44IDYwNzY5IHR5cCByZWxheSByYWRkciA4LjguOC44XHJcbi8vIHJwb3J0IDU1OTk2XCJcclxuU0RQVXRpbHMucGFyc2VDYW5kaWRhdGUgPSBmdW5jdGlvbihsaW5lKSB7XHJcbiAgdmFyIHBhcnRzO1xyXG4gIC8vIFBhcnNlIGJvdGggdmFyaWFudHMuXHJcbiAgaWYgKGxpbmUuaW5kZXhPZignYT1jYW5kaWRhdGU6JykgPT09IDApIHtcclxuICAgIHBhcnRzID0gbGluZS5zdWJzdHJpbmcoMTIpLnNwbGl0KCcgJyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHBhcnRzID0gbGluZS5zdWJzdHJpbmcoMTApLnNwbGl0KCcgJyk7XHJcbiAgfVxyXG5cclxuICB2YXIgY2FuZGlkYXRlID0ge1xyXG4gICAgZm91bmRhdGlvbjogcGFydHNbMF0sXHJcbiAgICBjb21wb25lbnQ6IHBhcnNlSW50KHBhcnRzWzFdLCAxMCksXHJcbiAgICBwcm90b2NvbDogcGFydHNbMl0udG9Mb3dlckNhc2UoKSxcclxuICAgIHByaW9yaXR5OiBwYXJzZUludChwYXJ0c1szXSwgMTApLFxyXG4gICAgaXA6IHBhcnRzWzRdLFxyXG4gICAgcG9ydDogcGFyc2VJbnQocGFydHNbNV0sIDEwKSxcclxuICAgIC8vIHNraXAgcGFydHNbNl0gPT0gJ3R5cCdcclxuICAgIHR5cGU6IHBhcnRzWzddXHJcbiAgfTtcclxuXHJcbiAgZm9yICh2YXIgaSA9IDg7IGkgPCBwYXJ0cy5sZW5ndGg7IGkgKz0gMikge1xyXG4gICAgc3dpdGNoIChwYXJ0c1tpXSkge1xyXG4gICAgICBjYXNlICdyYWRkcic6XHJcbiAgICAgICAgY2FuZGlkYXRlLnJlbGF0ZWRBZGRyZXNzID0gcGFydHNbaSArIDFdO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdycG9ydCc6XHJcbiAgICAgICAgY2FuZGlkYXRlLnJlbGF0ZWRQb3J0ID0gcGFyc2VJbnQocGFydHNbaSArIDFdLCAxMCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3RjcHR5cGUnOlxyXG4gICAgICAgIGNhbmRpZGF0ZS50Y3BUeXBlID0gcGFydHNbaSArIDFdO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd1ZnJhZyc6XHJcbiAgICAgICAgY2FuZGlkYXRlLnVmcmFnID0gcGFydHNbaSArIDFdOyAvLyBmb3IgYmFja3dhcmQgY29tcGFiaWxpdHkuXHJcbiAgICAgICAgY2FuZGlkYXRlLnVzZXJuYW1lRnJhZ21lbnQgPSBwYXJ0c1tpICsgMV07XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6IC8vIGV4dGVuc2lvbiBoYW5kbGluZywgaW4gcGFydGljdWxhciB1ZnJhZ1xyXG4gICAgICAgIGNhbmRpZGF0ZVtwYXJ0c1tpXV0gPSBwYXJ0c1tpICsgMV07XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBjYW5kaWRhdGU7XHJcbn07XHJcblxyXG4vLyBUcmFuc2xhdGVzIGEgY2FuZGlkYXRlIG9iamVjdCBpbnRvIFNEUCBjYW5kaWRhdGUgYXR0cmlidXRlLlxyXG5TRFBVdGlscy53cml0ZUNhbmRpZGF0ZSA9IGZ1bmN0aW9uKGNhbmRpZGF0ZSkge1xyXG4gIHZhciBzZHAgPSBbXTtcclxuICBzZHAucHVzaChjYW5kaWRhdGUuZm91bmRhdGlvbik7XHJcbiAgc2RwLnB1c2goY2FuZGlkYXRlLmNvbXBvbmVudCk7XHJcbiAgc2RwLnB1c2goY2FuZGlkYXRlLnByb3RvY29sLnRvVXBwZXJDYXNlKCkpO1xyXG4gIHNkcC5wdXNoKGNhbmRpZGF0ZS5wcmlvcml0eSk7XHJcbiAgc2RwLnB1c2goY2FuZGlkYXRlLmlwKTtcclxuICBzZHAucHVzaChjYW5kaWRhdGUucG9ydCk7XHJcblxyXG4gIHZhciB0eXBlID0gY2FuZGlkYXRlLnR5cGU7XHJcbiAgc2RwLnB1c2goJ3R5cCcpO1xyXG4gIHNkcC5wdXNoKHR5cGUpO1xyXG4gIGlmICh0eXBlICE9PSAnaG9zdCcgJiYgY2FuZGlkYXRlLnJlbGF0ZWRBZGRyZXNzICYmXHJcbiAgICAgIGNhbmRpZGF0ZS5yZWxhdGVkUG9ydCkge1xyXG4gICAgc2RwLnB1c2goJ3JhZGRyJyk7XHJcbiAgICBzZHAucHVzaChjYW5kaWRhdGUucmVsYXRlZEFkZHJlc3MpOyAvLyB3YXM6IHJlbEFkZHJcclxuICAgIHNkcC5wdXNoKCdycG9ydCcpO1xyXG4gICAgc2RwLnB1c2goY2FuZGlkYXRlLnJlbGF0ZWRQb3J0KTsgLy8gd2FzOiByZWxQb3J0XHJcbiAgfVxyXG4gIGlmIChjYW5kaWRhdGUudGNwVHlwZSAmJiBjYW5kaWRhdGUucHJvdG9jb2wudG9Mb3dlckNhc2UoKSA9PT0gJ3RjcCcpIHtcclxuICAgIHNkcC5wdXNoKCd0Y3B0eXBlJyk7XHJcbiAgICBzZHAucHVzaChjYW5kaWRhdGUudGNwVHlwZSk7XHJcbiAgfVxyXG4gIGlmIChjYW5kaWRhdGUudXNlcm5hbWVGcmFnbWVudCB8fCBjYW5kaWRhdGUudWZyYWcpIHtcclxuICAgIHNkcC5wdXNoKCd1ZnJhZycpO1xyXG4gICAgc2RwLnB1c2goY2FuZGlkYXRlLnVzZXJuYW1lRnJhZ21lbnQgfHwgY2FuZGlkYXRlLnVmcmFnKTtcclxuICB9XHJcbiAgcmV0dXJuICdjYW5kaWRhdGU6JyArIHNkcC5qb2luKCcgJyk7XHJcbn07XHJcblxyXG4vLyBQYXJzZXMgYW4gaWNlLW9wdGlvbnMgbGluZSwgcmV0dXJucyBhbiBhcnJheSBvZiBvcHRpb24gdGFncy5cclxuLy8gYT1pY2Utb3B0aW9uczpmb28gYmFyXHJcblNEUFV0aWxzLnBhcnNlSWNlT3B0aW9ucyA9IGZ1bmN0aW9uKGxpbmUpIHtcclxuICByZXR1cm4gbGluZS5zdWJzdHIoMTQpLnNwbGl0KCcgJyk7XHJcbn1cclxuXHJcbi8vIFBhcnNlcyBhbiBydHBtYXAgbGluZSwgcmV0dXJucyBSVENSdHBDb2RkZWNQYXJhbWV0ZXJzLiBTYW1wbGUgaW5wdXQ6XHJcbi8vIGE9cnRwbWFwOjExMSBvcHVzLzQ4MDAwLzJcclxuU0RQVXRpbHMucGFyc2VSdHBNYXAgPSBmdW5jdGlvbihsaW5lKSB7XHJcbiAgdmFyIHBhcnRzID0gbGluZS5zdWJzdHIoOSkuc3BsaXQoJyAnKTtcclxuICB2YXIgcGFyc2VkID0ge1xyXG4gICAgcGF5bG9hZFR5cGU6IHBhcnNlSW50KHBhcnRzLnNoaWZ0KCksIDEwKSAvLyB3YXM6IGlkXHJcbiAgfTtcclxuXHJcbiAgcGFydHMgPSBwYXJ0c1swXS5zcGxpdCgnLycpO1xyXG5cclxuICBwYXJzZWQubmFtZSA9IHBhcnRzWzBdO1xyXG4gIHBhcnNlZC5jbG9ja1JhdGUgPSBwYXJzZUludChwYXJ0c1sxXSwgMTApOyAvLyB3YXM6IGNsb2NrcmF0ZVxyXG4gIC8vIHdhczogY2hhbm5lbHNcclxuICBwYXJzZWQubnVtQ2hhbm5lbHMgPSBwYXJ0cy5sZW5ndGggPT09IDMgPyBwYXJzZUludChwYXJ0c1syXSwgMTApIDogMTtcclxuICByZXR1cm4gcGFyc2VkO1xyXG59O1xyXG5cclxuLy8gR2VuZXJhdGUgYW4gYT1ydHBtYXAgbGluZSBmcm9tIFJUQ1J0cENvZGVjQ2FwYWJpbGl0eSBvclxyXG4vLyBSVENSdHBDb2RlY1BhcmFtZXRlcnMuXHJcblNEUFV0aWxzLndyaXRlUnRwTWFwID0gZnVuY3Rpb24oY29kZWMpIHtcclxuICB2YXIgcHQgPSBjb2RlYy5wYXlsb2FkVHlwZTtcclxuICBpZiAoY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgcHQgPSBjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZTtcclxuICB9XHJcbiAgcmV0dXJuICdhPXJ0cG1hcDonICsgcHQgKyAnICcgKyBjb2RlYy5uYW1lICsgJy8nICsgY29kZWMuY2xvY2tSYXRlICtcclxuICAgICAgKGNvZGVjLm51bUNoYW5uZWxzICE9PSAxID8gJy8nICsgY29kZWMubnVtQ2hhbm5lbHMgOiAnJykgKyAnXFxyXFxuJztcclxufTtcclxuXHJcbi8vIFBhcnNlcyBhbiBhPWV4dG1hcCBsaW5lIChoZWFkZXJleHRlbnNpb24gZnJvbSBSRkMgNTI4NSkuIFNhbXBsZSBpbnB1dDpcclxuLy8gYT1leHRtYXA6MiB1cm46aWV0ZjpwYXJhbXM6cnRwLWhkcmV4dDp0b2Zmc2V0XHJcbi8vIGE9ZXh0bWFwOjIvc2VuZG9ubHkgdXJuOmlldGY6cGFyYW1zOnJ0cC1oZHJleHQ6dG9mZnNldFxyXG5TRFBVdGlscy5wYXJzZUV4dG1hcCA9IGZ1bmN0aW9uKGxpbmUpIHtcclxuICB2YXIgcGFydHMgPSBsaW5lLnN1YnN0cig5KS5zcGxpdCgnICcpO1xyXG4gIHJldHVybiB7XHJcbiAgICBpZDogcGFyc2VJbnQocGFydHNbMF0sIDEwKSxcclxuICAgIGRpcmVjdGlvbjogcGFydHNbMF0uaW5kZXhPZignLycpID4gMCA/IHBhcnRzWzBdLnNwbGl0KCcvJylbMV0gOiAnc2VuZHJlY3YnLFxyXG4gICAgdXJpOiBwYXJ0c1sxXVxyXG4gIH07XHJcbn07XHJcblxyXG4vLyBHZW5lcmF0ZXMgYT1leHRtYXAgbGluZSBmcm9tIFJUQ1J0cEhlYWRlckV4dGVuc2lvblBhcmFtZXRlcnMgb3JcclxuLy8gUlRDUnRwSGVhZGVyRXh0ZW5zaW9uLlxyXG5TRFBVdGlscy53cml0ZUV4dG1hcCA9IGZ1bmN0aW9uKGhlYWRlckV4dGVuc2lvbikge1xyXG4gIHJldHVybiAnYT1leHRtYXA6JyArIChoZWFkZXJFeHRlbnNpb24uaWQgfHwgaGVhZGVyRXh0ZW5zaW9uLnByZWZlcnJlZElkKSArXHJcbiAgICAgIChoZWFkZXJFeHRlbnNpb24uZGlyZWN0aW9uICYmIGhlYWRlckV4dGVuc2lvbi5kaXJlY3Rpb24gIT09ICdzZW5kcmVjdidcclxuICAgICAgICAgID8gJy8nICsgaGVhZGVyRXh0ZW5zaW9uLmRpcmVjdGlvblxyXG4gICAgICAgICAgOiAnJykgK1xyXG4gICAgICAnICcgKyBoZWFkZXJFeHRlbnNpb24udXJpICsgJ1xcclxcbic7XHJcbn07XHJcblxyXG4vLyBQYXJzZXMgYW4gZnRtcCBsaW5lLCByZXR1cm5zIGRpY3Rpb25hcnkuIFNhbXBsZSBpbnB1dDpcclxuLy8gYT1mbXRwOjk2IHZicj1vbjtjbmc9b25cclxuLy8gQWxzbyBkZWFscyB3aXRoIHZicj1vbjsgY25nPW9uXHJcblNEUFV0aWxzLnBhcnNlRm10cCA9IGZ1bmN0aW9uKGxpbmUpIHtcclxuICB2YXIgcGFyc2VkID0ge307XHJcbiAgdmFyIGt2O1xyXG4gIHZhciBwYXJ0cyA9IGxpbmUuc3Vic3RyKGxpbmUuaW5kZXhPZignICcpICsgMSkuc3BsaXQoJzsnKTtcclxuICBmb3IgKHZhciBqID0gMDsgaiA8IHBhcnRzLmxlbmd0aDsgaisrKSB7XHJcbiAgICBrdiA9IHBhcnRzW2pdLnRyaW0oKS5zcGxpdCgnPScpO1xyXG4gICAgcGFyc2VkW2t2WzBdLnRyaW0oKV0gPSBrdlsxXTtcclxuICB9XHJcbiAgcmV0dXJuIHBhcnNlZDtcclxufTtcclxuXHJcbi8vIEdlbmVyYXRlcyBhbiBhPWZ0bXAgbGluZSBmcm9tIFJUQ1J0cENvZGVjQ2FwYWJpbGl0eSBvciBSVENSdHBDb2RlY1BhcmFtZXRlcnMuXHJcblNEUFV0aWxzLndyaXRlRm10cCA9IGZ1bmN0aW9uKGNvZGVjKSB7XHJcbiAgdmFyIGxpbmUgPSAnJztcclxuICB2YXIgcHQgPSBjb2RlYy5wYXlsb2FkVHlwZTtcclxuICBpZiAoY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgcHQgPSBjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZTtcclxuICB9XHJcbiAgaWYgKGNvZGVjLnBhcmFtZXRlcnMgJiYgT2JqZWN0LmtleXMoY29kZWMucGFyYW1ldGVycykubGVuZ3RoKSB7XHJcbiAgICB2YXIgcGFyYW1zID0gW107XHJcbiAgICBPYmplY3Qua2V5cyhjb2RlYy5wYXJhbWV0ZXJzKS5mb3JFYWNoKGZ1bmN0aW9uKHBhcmFtKSB7XHJcbiAgICAgIHBhcmFtcy5wdXNoKHBhcmFtICsgJz0nICsgY29kZWMucGFyYW1ldGVyc1twYXJhbV0pO1xyXG4gICAgfSk7XHJcbiAgICBsaW5lICs9ICdhPWZtdHA6JyArIHB0ICsgJyAnICsgcGFyYW1zLmpvaW4oJzsnKSArICdcXHJcXG4nO1xyXG4gIH1cclxuICByZXR1cm4gbGluZTtcclxufTtcclxuXHJcbi8vIFBhcnNlcyBhbiBydGNwLWZiIGxpbmUsIHJldHVybnMgUlRDUFJ0Y3BGZWVkYmFjayBvYmplY3QuIFNhbXBsZSBpbnB1dDpcclxuLy8gYT1ydGNwLWZiOjk4IG5hY2sgcnBzaVxyXG5TRFBVdGlscy5wYXJzZVJ0Y3BGYiA9IGZ1bmN0aW9uKGxpbmUpIHtcclxuICB2YXIgcGFydHMgPSBsaW5lLnN1YnN0cihsaW5lLmluZGV4T2YoJyAnKSArIDEpLnNwbGl0KCcgJyk7XHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGU6IHBhcnRzLnNoaWZ0KCksXHJcbiAgICBwYXJhbWV0ZXI6IHBhcnRzLmpvaW4oJyAnKVxyXG4gIH07XHJcbn07XHJcbi8vIEdlbmVyYXRlIGE9cnRjcC1mYiBsaW5lcyBmcm9tIFJUQ1J0cENvZGVjQ2FwYWJpbGl0eSBvciBSVENSdHBDb2RlY1BhcmFtZXRlcnMuXHJcblNEUFV0aWxzLndyaXRlUnRjcEZiID0gZnVuY3Rpb24oY29kZWMpIHtcclxuICB2YXIgbGluZXMgPSAnJztcclxuICB2YXIgcHQgPSBjb2RlYy5wYXlsb2FkVHlwZTtcclxuICBpZiAoY29kZWMucHJlZmVycmVkUGF5bG9hZFR5cGUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgcHQgPSBjb2RlYy5wcmVmZXJyZWRQYXlsb2FkVHlwZTtcclxuICB9XHJcbiAgaWYgKGNvZGVjLnJ0Y3BGZWVkYmFjayAmJiBjb2RlYy5ydGNwRmVlZGJhY2subGVuZ3RoKSB7XHJcbiAgICAvLyBGSVhNRTogc3BlY2lhbCBoYW5kbGluZyBmb3IgdHJyLWludD9cclxuICAgIGNvZGVjLnJ0Y3BGZWVkYmFjay5mb3JFYWNoKGZ1bmN0aW9uKGZiKSB7XHJcbiAgICAgIGxpbmVzICs9ICdhPXJ0Y3AtZmI6JyArIHB0ICsgJyAnICsgZmIudHlwZSArXHJcbiAgICAgIChmYi5wYXJhbWV0ZXIgJiYgZmIucGFyYW1ldGVyLmxlbmd0aCA/ICcgJyArIGZiLnBhcmFtZXRlciA6ICcnKSArXHJcbiAgICAgICAgICAnXFxyXFxuJztcclxuICAgIH0pO1xyXG4gIH1cclxuICByZXR1cm4gbGluZXM7XHJcbn07XHJcblxyXG4vLyBQYXJzZXMgYW4gUkZDIDU1NzYgc3NyYyBtZWRpYSBhdHRyaWJ1dGUuIFNhbXBsZSBpbnB1dDpcclxuLy8gYT1zc3JjOjM3MzU5Mjg1NTkgY25hbWU6c29tZXRoaW5nXHJcblNEUFV0aWxzLnBhcnNlU3NyY01lZGlhID0gZnVuY3Rpb24obGluZSkge1xyXG4gIHZhciBzcCA9IGxpbmUuaW5kZXhPZignICcpO1xyXG4gIHZhciBwYXJ0cyA9IHtcclxuICAgIHNzcmM6IHBhcnNlSW50KGxpbmUuc3Vic3RyKDcsIHNwIC0gNyksIDEwKVxyXG4gIH07XHJcbiAgdmFyIGNvbG9uID0gbGluZS5pbmRleE9mKCc6Jywgc3ApO1xyXG4gIGlmIChjb2xvbiA+IC0xKSB7XHJcbiAgICBwYXJ0cy5hdHRyaWJ1dGUgPSBsaW5lLnN1YnN0cihzcCArIDEsIGNvbG9uIC0gc3AgLSAxKTtcclxuICAgIHBhcnRzLnZhbHVlID0gbGluZS5zdWJzdHIoY29sb24gKyAxKTtcclxuICB9IGVsc2Uge1xyXG4gICAgcGFydHMuYXR0cmlidXRlID0gbGluZS5zdWJzdHIoc3AgKyAxKTtcclxuICB9XHJcbiAgcmV0dXJuIHBhcnRzO1xyXG59O1xyXG5cclxuLy8gRXh0cmFjdHMgdGhlIE1JRCAoUkZDIDU4ODgpIGZyb20gYSBtZWRpYSBzZWN0aW9uLlxyXG4vLyByZXR1cm5zIHRoZSBNSUQgb3IgdW5kZWZpbmVkIGlmIG5vIG1pZCBsaW5lIHdhcyBmb3VuZC5cclxuU0RQVXRpbHMuZ2V0TWlkID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XHJcbiAgdmFyIG1pZCA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9bWlkOicpWzBdO1xyXG4gIGlmIChtaWQpIHtcclxuICAgIHJldHVybiBtaWQuc3Vic3RyKDYpO1xyXG4gIH1cclxufVxyXG5cclxuU0RQVXRpbHMucGFyc2VGaW5nZXJwcmludCA9IGZ1bmN0aW9uKGxpbmUpIHtcclxuICB2YXIgcGFydHMgPSBsaW5lLnN1YnN0cigxNCkuc3BsaXQoJyAnKTtcclxuICByZXR1cm4ge1xyXG4gICAgYWxnb3JpdGhtOiBwYXJ0c1swXS50b0xvd2VyQ2FzZSgpLCAvLyBhbGdvcml0aG0gaXMgY2FzZS1zZW5zaXRpdmUgaW4gRWRnZS5cclxuICAgIHZhbHVlOiBwYXJ0c1sxXVxyXG4gIH07XHJcbn07XHJcblxyXG4vLyBFeHRyYWN0cyBEVExTIHBhcmFtZXRlcnMgZnJvbSBTRFAgbWVkaWEgc2VjdGlvbiBvciBzZXNzaW9ucGFydC5cclxuLy8gRklYTUU6IGZvciBjb25zaXN0ZW5jeSB3aXRoIG90aGVyIGZ1bmN0aW9ucyB0aGlzIHNob3VsZCBvbmx5XHJcbi8vICAgZ2V0IHRoZSBmaW5nZXJwcmludCBsaW5lIGFzIGlucHV0LiBTZWUgYWxzbyBnZXRJY2VQYXJhbWV0ZXJzLlxyXG5TRFBVdGlscy5nZXREdGxzUGFyYW1ldGVycyA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbiwgc2Vzc2lvbnBhcnQpIHtcclxuICB2YXIgbGluZXMgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24gKyBzZXNzaW9ucGFydCxcclxuICAgICAgJ2E9ZmluZ2VycHJpbnQ6Jyk7XHJcbiAgLy8gTm90ZTogYT1zZXR1cCBsaW5lIGlzIGlnbm9yZWQgc2luY2Ugd2UgdXNlIHRoZSAnYXV0bycgcm9sZS5cclxuICAvLyBOb3RlMjogJ2FsZ29yaXRobScgaXMgbm90IGNhc2Ugc2Vuc2l0aXZlIGV4Y2VwdCBpbiBFZGdlLlxyXG4gIHJldHVybiB7XHJcbiAgICByb2xlOiAnYXV0bycsXHJcbiAgICBmaW5nZXJwcmludHM6IGxpbmVzLm1hcChTRFBVdGlscy5wYXJzZUZpbmdlcnByaW50KVxyXG4gIH07XHJcbn07XHJcblxyXG4vLyBTZXJpYWxpemVzIERUTFMgcGFyYW1ldGVycyB0byBTRFAuXHJcblNEUFV0aWxzLndyaXRlRHRsc1BhcmFtZXRlcnMgPSBmdW5jdGlvbihwYXJhbXMsIHNldHVwVHlwZSkge1xyXG4gIHZhciBzZHAgPSAnYT1zZXR1cDonICsgc2V0dXBUeXBlICsgJ1xcclxcbic7XHJcbiAgcGFyYW1zLmZpbmdlcnByaW50cy5mb3JFYWNoKGZ1bmN0aW9uKGZwKSB7XHJcbiAgICBzZHAgKz0gJ2E9ZmluZ2VycHJpbnQ6JyArIGZwLmFsZ29yaXRobSArICcgJyArIGZwLnZhbHVlICsgJ1xcclxcbic7XHJcbiAgfSk7XHJcbiAgcmV0dXJuIHNkcDtcclxufTtcclxuLy8gUGFyc2VzIElDRSBpbmZvcm1hdGlvbiBmcm9tIFNEUCBtZWRpYSBzZWN0aW9uIG9yIHNlc3Npb25wYXJ0LlxyXG4vLyBGSVhNRTogZm9yIGNvbnNpc3RlbmN5IHdpdGggb3RoZXIgZnVuY3Rpb25zIHRoaXMgc2hvdWxkIG9ubHlcclxuLy8gICBnZXQgdGhlIGljZS11ZnJhZyBhbmQgaWNlLXB3ZCBsaW5lcyBhcyBpbnB1dC5cclxuU0RQVXRpbHMuZ2V0SWNlUGFyYW1ldGVycyA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbiwgc2Vzc2lvbnBhcnQpIHtcclxuICB2YXIgbGluZXMgPSBTRFBVdGlscy5zcGxpdExpbmVzKG1lZGlhU2VjdGlvbik7XHJcbiAgLy8gU2VhcmNoIGluIHNlc3Npb24gcGFydCwgdG9vLlxyXG4gIGxpbmVzID0gbGluZXMuY29uY2F0KFNEUFV0aWxzLnNwbGl0TGluZXMoc2Vzc2lvbnBhcnQpKTtcclxuICB2YXIgaWNlUGFyYW1ldGVycyA9IHtcclxuICAgIHVzZXJuYW1lRnJhZ21lbnQ6IGxpbmVzLmZpbHRlcihmdW5jdGlvbihsaW5lKSB7XHJcbiAgICAgIHJldHVybiBsaW5lLmluZGV4T2YoJ2E9aWNlLXVmcmFnOicpID09PSAwO1xyXG4gICAgfSlbMF0uc3Vic3RyKDEyKSxcclxuICAgIHBhc3N3b3JkOiBsaW5lcy5maWx0ZXIoZnVuY3Rpb24obGluZSkge1xyXG4gICAgICByZXR1cm4gbGluZS5pbmRleE9mKCdhPWljZS1wd2Q6JykgPT09IDA7XHJcbiAgICB9KVswXS5zdWJzdHIoMTApXHJcbiAgfTtcclxuICByZXR1cm4gaWNlUGFyYW1ldGVycztcclxufTtcclxuXHJcbi8vIFNlcmlhbGl6ZXMgSUNFIHBhcmFtZXRlcnMgdG8gU0RQLlxyXG5TRFBVdGlscy53cml0ZUljZVBhcmFtZXRlcnMgPSBmdW5jdGlvbihwYXJhbXMpIHtcclxuICByZXR1cm4gJ2E9aWNlLXVmcmFnOicgKyBwYXJhbXMudXNlcm5hbWVGcmFnbWVudCArICdcXHJcXG4nICtcclxuICAgICAgJ2E9aWNlLXB3ZDonICsgcGFyYW1zLnBhc3N3b3JkICsgJ1xcclxcbic7XHJcbn07XHJcblxyXG4vLyBQYXJzZXMgdGhlIFNEUCBtZWRpYSBzZWN0aW9uIGFuZCByZXR1cm5zIFJUQ1J0cFBhcmFtZXRlcnMuXHJcblNEUFV0aWxzLnBhcnNlUnRwUGFyYW1ldGVycyA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbikge1xyXG4gIHZhciBkZXNjcmlwdGlvbiA9IHtcclxuICAgIGNvZGVjczogW10sXHJcbiAgICBoZWFkZXJFeHRlbnNpb25zOiBbXSxcclxuICAgIGZlY01lY2hhbmlzbXM6IFtdLFxyXG4gICAgcnRjcDogW11cclxuICB9O1xyXG4gIHZhciBsaW5lcyA9IFNEUFV0aWxzLnNwbGl0TGluZXMobWVkaWFTZWN0aW9uKTtcclxuICB2YXIgbWxpbmUgPSBsaW5lc1swXS5zcGxpdCgnICcpO1xyXG4gIGZvciAodmFyIGkgPSAzOyBpIDwgbWxpbmUubGVuZ3RoOyBpKyspIHsgLy8gZmluZCBhbGwgY29kZWNzIGZyb20gbWxpbmVbMy4uXVxyXG4gICAgdmFyIHB0ID0gbWxpbmVbaV07XHJcbiAgICB2YXIgcnRwbWFwbGluZSA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KFxyXG4gICAgICAgIG1lZGlhU2VjdGlvbiwgJ2E9cnRwbWFwOicgKyBwdCArICcgJylbMF07XHJcbiAgICBpZiAocnRwbWFwbGluZSkge1xyXG4gICAgICB2YXIgY29kZWMgPSBTRFBVdGlscy5wYXJzZVJ0cE1hcChydHBtYXBsaW5lKTtcclxuICAgICAgdmFyIGZtdHBzID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgoXHJcbiAgICAgICAgICBtZWRpYVNlY3Rpb24sICdhPWZtdHA6JyArIHB0ICsgJyAnKTtcclxuICAgICAgLy8gT25seSB0aGUgZmlyc3QgYT1mbXRwOjxwdD4gaXMgY29uc2lkZXJlZC5cclxuICAgICAgY29kZWMucGFyYW1ldGVycyA9IGZtdHBzLmxlbmd0aCA/IFNEUFV0aWxzLnBhcnNlRm10cChmbXRwc1swXSkgOiB7fTtcclxuICAgICAgY29kZWMucnRjcEZlZWRiYWNrID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgoXHJcbiAgICAgICAgICBtZWRpYVNlY3Rpb24sICdhPXJ0Y3AtZmI6JyArIHB0ICsgJyAnKVxyXG4gICAgICAgIC5tYXAoU0RQVXRpbHMucGFyc2VSdGNwRmIpO1xyXG4gICAgICBkZXNjcmlwdGlvbi5jb2RlY3MucHVzaChjb2RlYyk7XHJcbiAgICAgIC8vIHBhcnNlIEZFQyBtZWNoYW5pc21zIGZyb20gcnRwbWFwIGxpbmVzLlxyXG4gICAgICBzd2l0Y2ggKGNvZGVjLm5hbWUudG9VcHBlckNhc2UoKSkge1xyXG4gICAgICAgIGNhc2UgJ1JFRCc6XHJcbiAgICAgICAgY2FzZSAnVUxQRkVDJzpcclxuICAgICAgICAgIGRlc2NyaXB0aW9uLmZlY01lY2hhbmlzbXMucHVzaChjb2RlYy5uYW1lLnRvVXBwZXJDYXNlKCkpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDogLy8gb25seSBSRUQgYW5kIFVMUEZFQyBhcmUgcmVjb2duaXplZCBhcyBGRUMgbWVjaGFuaXNtcy5cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9ZXh0bWFwOicpLmZvckVhY2goZnVuY3Rpb24obGluZSkge1xyXG4gICAgZGVzY3JpcHRpb24uaGVhZGVyRXh0ZW5zaW9ucy5wdXNoKFNEUFV0aWxzLnBhcnNlRXh0bWFwKGxpbmUpKTtcclxuICB9KTtcclxuICAvLyBGSVhNRTogcGFyc2UgcnRjcC5cclxuICByZXR1cm4gZGVzY3JpcHRpb247XHJcbn07XHJcblxyXG4vLyBHZW5lcmF0ZXMgcGFydHMgb2YgdGhlIFNEUCBtZWRpYSBzZWN0aW9uIGRlc2NyaWJpbmcgdGhlIGNhcGFiaWxpdGllcyAvXHJcbi8vIHBhcmFtZXRlcnMuXHJcblNEUFV0aWxzLndyaXRlUnRwRGVzY3JpcHRpb24gPSBmdW5jdGlvbihraW5kLCBjYXBzKSB7XHJcbiAgdmFyIHNkcCA9ICcnO1xyXG5cclxuICAvLyBCdWlsZCB0aGUgbWxpbmUuXHJcbiAgc2RwICs9ICdtPScgKyBraW5kICsgJyAnO1xyXG4gIHNkcCArPSBjYXBzLmNvZGVjcy5sZW5ndGggPiAwID8gJzknIDogJzAnOyAvLyByZWplY3QgaWYgbm8gY29kZWNzLlxyXG4gIHNkcCArPSAnIFVEUC9UTFMvUlRQL1NBVlBGICc7XHJcbiAgc2RwICs9IGNhcHMuY29kZWNzLm1hcChmdW5jdGlvbihjb2RlYykge1xyXG4gICAgaWYgKGNvZGVjLnByZWZlcnJlZFBheWxvYWRUeXBlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIGNvZGVjLnByZWZlcnJlZFBheWxvYWRUeXBlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvZGVjLnBheWxvYWRUeXBlO1xyXG4gIH0pLmpvaW4oJyAnKSArICdcXHJcXG4nO1xyXG5cclxuICBzZHAgKz0gJ2M9SU4gSVA0IDAuMC4wLjBcXHJcXG4nO1xyXG4gIHNkcCArPSAnYT1ydGNwOjkgSU4gSVA0IDAuMC4wLjBcXHJcXG4nO1xyXG5cclxuICAvLyBBZGQgYT1ydHBtYXAgbGluZXMgZm9yIGVhY2ggY29kZWMuIEFsc28gZm10cCBhbmQgcnRjcC1mYi5cclxuICBjYXBzLmNvZGVjcy5mb3JFYWNoKGZ1bmN0aW9uKGNvZGVjKSB7XHJcbiAgICBzZHAgKz0gU0RQVXRpbHMud3JpdGVSdHBNYXAoY29kZWMpO1xyXG4gICAgc2RwICs9IFNEUFV0aWxzLndyaXRlRm10cChjb2RlYyk7XHJcbiAgICBzZHAgKz0gU0RQVXRpbHMud3JpdGVSdGNwRmIoY29kZWMpO1xyXG4gIH0pO1xyXG4gIHZhciBtYXhwdGltZSA9IDA7XHJcbiAgY2Fwcy5jb2RlY3MuZm9yRWFjaChmdW5jdGlvbihjb2RlYykge1xyXG4gICAgaWYgKGNvZGVjLm1heHB0aW1lID4gbWF4cHRpbWUpIHtcclxuICAgICAgbWF4cHRpbWUgPSBjb2RlYy5tYXhwdGltZTtcclxuICAgIH1cclxuICB9KTtcclxuICBpZiAobWF4cHRpbWUgPiAwKSB7XHJcbiAgICBzZHAgKz0gJ2E9bWF4cHRpbWU6JyArIG1heHB0aW1lICsgJ1xcclxcbic7XHJcbiAgfVxyXG4gIHNkcCArPSAnYT1ydGNwLW11eFxcclxcbic7XHJcblxyXG4gIGNhcHMuaGVhZGVyRXh0ZW5zaW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGV4dGVuc2lvbikge1xyXG4gICAgc2RwICs9IFNEUFV0aWxzLndyaXRlRXh0bWFwKGV4dGVuc2lvbik7XHJcbiAgfSk7XHJcbiAgLy8gRklYTUU6IHdyaXRlIGZlY01lY2hhbmlzbXMuXHJcbiAgcmV0dXJuIHNkcDtcclxufTtcclxuXHJcbi8vIFBhcnNlcyB0aGUgU0RQIG1lZGlhIHNlY3Rpb24gYW5kIHJldHVybnMgYW4gYXJyYXkgb2ZcclxuLy8gUlRDUnRwRW5jb2RpbmdQYXJhbWV0ZXJzLlxyXG5TRFBVdGlscy5wYXJzZVJ0cEVuY29kaW5nUGFyYW1ldGVycyA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbikge1xyXG4gIHZhciBlbmNvZGluZ1BhcmFtZXRlcnMgPSBbXTtcclxuICB2YXIgZGVzY3JpcHRpb24gPSBTRFBVdGlscy5wYXJzZVJ0cFBhcmFtZXRlcnMobWVkaWFTZWN0aW9uKTtcclxuICB2YXIgaGFzUmVkID0gZGVzY3JpcHRpb24uZmVjTWVjaGFuaXNtcy5pbmRleE9mKCdSRUQnKSAhPT0gLTE7XHJcbiAgdmFyIGhhc1VscGZlYyA9IGRlc2NyaXB0aW9uLmZlY01lY2hhbmlzbXMuaW5kZXhPZignVUxQRkVDJykgIT09IC0xO1xyXG5cclxuICAvLyBmaWx0ZXIgYT1zc3JjOi4uLiBjbmFtZTosIGlnbm9yZSBQbGFuQi1tc2lkXHJcbiAgdmFyIHNzcmNzID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1zc3JjOicpXHJcbiAgLm1hcChmdW5jdGlvbihsaW5lKSB7XHJcbiAgICByZXR1cm4gU0RQVXRpbHMucGFyc2VTc3JjTWVkaWEobGluZSk7XHJcbiAgfSlcclxuICAuZmlsdGVyKGZ1bmN0aW9uKHBhcnRzKSB7XHJcbiAgICByZXR1cm4gcGFydHMuYXR0cmlidXRlID09PSAnY25hbWUnO1xyXG4gIH0pO1xyXG4gIHZhciBwcmltYXJ5U3NyYyA9IHNzcmNzLmxlbmd0aCA+IDAgJiYgc3NyY3NbMF0uc3NyYztcclxuICB2YXIgc2Vjb25kYXJ5U3NyYztcclxuXHJcbiAgdmFyIGZsb3dzID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1zc3JjLWdyb3VwOkZJRCcpXHJcbiAgLm1hcChmdW5jdGlvbihsaW5lKSB7XHJcbiAgICB2YXIgcGFydHMgPSBsaW5lLnNwbGl0KCcgJyk7XHJcbiAgICBwYXJ0cy5zaGlmdCgpO1xyXG4gICAgcmV0dXJuIHBhcnRzLm1hcChmdW5jdGlvbihwYXJ0KSB7XHJcbiAgICAgIHJldHVybiBwYXJzZUludChwYXJ0LCAxMCk7XHJcbiAgICB9KTtcclxuICB9KTtcclxuICBpZiAoZmxvd3MubGVuZ3RoID4gMCAmJiBmbG93c1swXS5sZW5ndGggPiAxICYmIGZsb3dzWzBdWzBdID09PSBwcmltYXJ5U3NyYykge1xyXG4gICAgc2Vjb25kYXJ5U3NyYyA9IGZsb3dzWzBdWzFdO1xyXG4gIH1cclxuXHJcbiAgZGVzY3JpcHRpb24uY29kZWNzLmZvckVhY2goZnVuY3Rpb24oY29kZWMpIHtcclxuICAgIGlmIChjb2RlYy5uYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdSVFgnICYmIGNvZGVjLnBhcmFtZXRlcnMuYXB0KSB7XHJcbiAgICAgIHZhciBlbmNQYXJhbSA9IHtcclxuICAgICAgICBzc3JjOiBwcmltYXJ5U3NyYyxcclxuICAgICAgICBjb2RlY1BheWxvYWRUeXBlOiBwYXJzZUludChjb2RlYy5wYXJhbWV0ZXJzLmFwdCwgMTApLFxyXG4gICAgICAgIHJ0eDoge1xyXG4gICAgICAgICAgc3NyYzogc2Vjb25kYXJ5U3NyY1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgICAgZW5jb2RpbmdQYXJhbWV0ZXJzLnB1c2goZW5jUGFyYW0pO1xyXG4gICAgICBpZiAoaGFzUmVkKSB7XHJcbiAgICAgICAgZW5jUGFyYW0gPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGVuY1BhcmFtKSk7XHJcbiAgICAgICAgZW5jUGFyYW0uZmVjID0ge1xyXG4gICAgICAgICAgc3NyYzogc2Vjb25kYXJ5U3NyYyxcclxuICAgICAgICAgIG1lY2hhbmlzbTogaGFzVWxwZmVjID8gJ3JlZCt1bHBmZWMnIDogJ3JlZCdcclxuICAgICAgICB9O1xyXG4gICAgICAgIGVuY29kaW5nUGFyYW1ldGVycy5wdXNoKGVuY1BhcmFtKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG4gIGlmIChlbmNvZGluZ1BhcmFtZXRlcnMubGVuZ3RoID09PSAwICYmIHByaW1hcnlTc3JjKSB7XHJcbiAgICBlbmNvZGluZ1BhcmFtZXRlcnMucHVzaCh7XHJcbiAgICAgIHNzcmM6IHByaW1hcnlTc3JjXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vIHdlIHN1cHBvcnQgYm90aCBiPUFTIGFuZCBiPVRJQVMgYnV0IGludGVycHJldCBBUyBhcyBUSUFTLlxyXG4gIHZhciBiYW5kd2lkdGggPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdiPScpO1xyXG4gIGlmIChiYW5kd2lkdGgubGVuZ3RoKSB7XHJcbiAgICBpZiAoYmFuZHdpZHRoWzBdLmluZGV4T2YoJ2I9VElBUzonKSA9PT0gMCkge1xyXG4gICAgICBiYW5kd2lkdGggPSBwYXJzZUludChiYW5kd2lkdGhbMF0uc3Vic3RyKDcpLCAxMCk7XHJcbiAgICB9IGVsc2UgaWYgKGJhbmR3aWR0aFswXS5pbmRleE9mKCdiPUFTOicpID09PSAwKSB7XHJcbiAgICAgIC8vIHVzZSBmb3JtdWxhIGZyb20gSlNFUCB0byBjb252ZXJ0IGI9QVMgdG8gVElBUyB2YWx1ZS5cclxuICAgICAgYmFuZHdpZHRoID0gcGFyc2VJbnQoYmFuZHdpZHRoWzBdLnN1YnN0cig1KSwgMTApICogMTAwMCAqIDAuOTVcclxuICAgICAgICAgIC0gKDUwICogNDAgKiA4KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGJhbmR3aWR0aCA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIGVuY29kaW5nUGFyYW1ldGVycy5mb3JFYWNoKGZ1bmN0aW9uKHBhcmFtcykge1xyXG4gICAgICBwYXJhbXMubWF4Qml0cmF0ZSA9IGJhbmR3aWR0aDtcclxuICAgIH0pO1xyXG4gIH1cclxuICByZXR1cm4gZW5jb2RpbmdQYXJhbWV0ZXJzO1xyXG59O1xyXG5cclxuLy8gcGFyc2VzIGh0dHA6Ly9kcmFmdC5vcnRjLm9yZy8jcnRjcnRjcHBhcmFtZXRlcnMqXHJcblNEUFV0aWxzLnBhcnNlUnRjcFBhcmFtZXRlcnMgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcclxuICB2YXIgcnRjcFBhcmFtZXRlcnMgPSB7fTtcclxuXHJcbiAgdmFyIGNuYW1lO1xyXG4gIC8vIEdldHMgdGhlIGZpcnN0IFNTUkMuIE5vdGUgdGhhdCB3aXRoIFJUWCB0aGVyZSBtaWdodCBiZSBtdWx0aXBsZVxyXG4gIC8vIFNTUkNzLlxyXG4gIHZhciByZW1vdGVTc3JjID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1zc3JjOicpXHJcbiAgICAgIC5tYXAoZnVuY3Rpb24obGluZSkge1xyXG4gICAgICAgIHJldHVybiBTRFBVdGlscy5wYXJzZVNzcmNNZWRpYShsaW5lKTtcclxuICAgICAgfSlcclxuICAgICAgLmZpbHRlcihmdW5jdGlvbihvYmopIHtcclxuICAgICAgICByZXR1cm4gb2JqLmF0dHJpYnV0ZSA9PT0gJ2NuYW1lJztcclxuICAgICAgfSlbMF07XHJcbiAgaWYgKHJlbW90ZVNzcmMpIHtcclxuICAgIHJ0Y3BQYXJhbWV0ZXJzLmNuYW1lID0gcmVtb3RlU3NyYy52YWx1ZTtcclxuICAgIHJ0Y3BQYXJhbWV0ZXJzLnNzcmMgPSByZW1vdGVTc3JjLnNzcmM7XHJcbiAgfVxyXG5cclxuICAvLyBFZGdlIHVzZXMgdGhlIGNvbXBvdW5kIGF0dHJpYnV0ZSBpbnN0ZWFkIG9mIHJlZHVjZWRTaXplXHJcbiAgLy8gY29tcG91bmQgaXMgIXJlZHVjZWRTaXplXHJcbiAgdmFyIHJzaXplID0gU0RQVXRpbHMubWF0Y2hQcmVmaXgobWVkaWFTZWN0aW9uLCAnYT1ydGNwLXJzaXplJyk7XHJcbiAgcnRjcFBhcmFtZXRlcnMucmVkdWNlZFNpemUgPSByc2l6ZS5sZW5ndGggPiAwO1xyXG4gIHJ0Y3BQYXJhbWV0ZXJzLmNvbXBvdW5kID0gcnNpemUubGVuZ3RoID09PSAwO1xyXG5cclxuICAvLyBwYXJzZXMgdGhlIHJ0Y3AtbXV4IGF0dHLRlmJ1dGUuXHJcbiAgLy8gTm90ZSB0aGF0IEVkZ2UgZG9lcyBub3Qgc3VwcG9ydCB1bm11eGVkIFJUQ1AuXHJcbiAgdmFyIG11eCA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9cnRjcC1tdXgnKTtcclxuICBydGNwUGFyYW1ldGVycy5tdXggPSBtdXgubGVuZ3RoID4gMDtcclxuXHJcbiAgcmV0dXJuIHJ0Y3BQYXJhbWV0ZXJzO1xyXG59O1xyXG5cclxuLy8gcGFyc2VzIGVpdGhlciBhPW1zaWQ6IG9yIGE9c3NyYzouLi4gbXNpZCBsaW5lcyBhbmQgcmV0dXJuc1xyXG4vLyB0aGUgaWQgb2YgdGhlIE1lZGlhU3RyZWFtIGFuZCBNZWRpYVN0cmVhbVRyYWNrLlxyXG5TRFBVdGlscy5wYXJzZU1zaWQgPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24pIHtcclxuICB2YXIgcGFydHM7XHJcbiAgdmFyIHNwZWMgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdhPW1zaWQ6Jyk7XHJcbiAgaWYgKHNwZWMubGVuZ3RoID09PSAxKSB7XHJcbiAgICBwYXJ0cyA9IHNwZWNbMF0uc3Vic3RyKDcpLnNwbGl0KCcgJyk7XHJcbiAgICByZXR1cm4ge3N0cmVhbTogcGFydHNbMF0sIHRyYWNrOiBwYXJ0c1sxXX07XHJcbiAgfVxyXG4gIHZhciBwbGFuQiA9IFNEUFV0aWxzLm1hdGNoUHJlZml4KG1lZGlhU2VjdGlvbiwgJ2E9c3NyYzonKVxyXG4gIC5tYXAoZnVuY3Rpb24obGluZSkge1xyXG4gICAgcmV0dXJuIFNEUFV0aWxzLnBhcnNlU3NyY01lZGlhKGxpbmUpO1xyXG4gIH0pXHJcbiAgLmZpbHRlcihmdW5jdGlvbihwYXJ0cykge1xyXG4gICAgcmV0dXJuIHBhcnRzLmF0dHJpYnV0ZSA9PT0gJ21zaWQnO1xyXG4gIH0pO1xyXG4gIGlmIChwbGFuQi5sZW5ndGggPiAwKSB7XHJcbiAgICBwYXJ0cyA9IHBsYW5CWzBdLnZhbHVlLnNwbGl0KCcgJyk7XHJcbiAgICByZXR1cm4ge3N0cmVhbTogcGFydHNbMF0sIHRyYWNrOiBwYXJ0c1sxXX07XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gR2VuZXJhdGUgYSBzZXNzaW9uIElEIGZvciBTRFAuXHJcbi8vIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9kcmFmdC1pZXRmLXJ0Y3dlYi1qc2VwLTIwI3NlY3Rpb24tNS4yLjFcclxuLy8gcmVjb21tZW5kcyB1c2luZyBhIGNyeXB0b2dyYXBoaWNhbGx5IHJhbmRvbSArdmUgNjQtYml0IHZhbHVlXHJcbi8vIGJ1dCByaWdodCBub3cgdGhpcyBzaG91bGQgYmUgYWNjZXB0YWJsZSBhbmQgd2l0aGluIHRoZSByaWdodCByYW5nZVxyXG5TRFBVdGlscy5nZW5lcmF0ZVNlc3Npb25JZCA9IGZ1bmN0aW9uKCkge1xyXG4gIHJldHVybiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCkuc3Vic3RyKDIsIDIxKTtcclxufTtcclxuXHJcbi8vIFdyaXRlIGJvaWxkZXIgcGxhdGUgZm9yIHN0YXJ0IG9mIFNEUFxyXG4vLyBzZXNzSWQgYXJndW1lbnQgaXMgb3B0aW9uYWwgLSBpZiBub3Qgc3VwcGxpZWQgaXQgd2lsbFxyXG4vLyBiZSBnZW5lcmF0ZWQgcmFuZG9tbHlcclxuLy8gc2Vzc1ZlcnNpb24gaXMgb3B0aW9uYWwgYW5kIGRlZmF1bHRzIHRvIDJcclxuU0RQVXRpbHMud3JpdGVTZXNzaW9uQm9pbGVycGxhdGUgPSBmdW5jdGlvbihzZXNzSWQsIHNlc3NWZXIpIHtcclxuICB2YXIgc2Vzc2lvbklkO1xyXG4gIHZhciB2ZXJzaW9uID0gc2Vzc1ZlciAhPT0gdW5kZWZpbmVkID8gc2Vzc1ZlciA6IDI7XHJcbiAgaWYgKHNlc3NJZCkge1xyXG4gICAgc2Vzc2lvbklkID0gc2Vzc0lkO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBzZXNzaW9uSWQgPSBTRFBVdGlscy5nZW5lcmF0ZVNlc3Npb25JZCgpO1xyXG4gIH1cclxuICAvLyBGSVhNRTogc2Vzcy1pZCBzaG91bGQgYmUgYW4gTlRQIHRpbWVzdGFtcC5cclxuICByZXR1cm4gJ3Y9MFxcclxcbicgK1xyXG4gICAgICAnbz10aGlzaXNhZGFwdGVyb3J0YyAnICsgc2Vzc2lvbklkICsgJyAnICsgdmVyc2lvbiArICcgSU4gSVA0IDEyNy4wLjAuMVxcclxcbicgK1xyXG4gICAgICAncz0tXFxyXFxuJyArXHJcbiAgICAgICd0PTAgMFxcclxcbic7XHJcbn07XHJcblxyXG5TRFBVdGlscy53cml0ZU1lZGlhU2VjdGlvbiA9IGZ1bmN0aW9uKHRyYW5zY2VpdmVyLCBjYXBzLCB0eXBlLCBzdHJlYW0pIHtcclxuICB2YXIgc2RwID0gU0RQVXRpbHMud3JpdGVSdHBEZXNjcmlwdGlvbih0cmFuc2NlaXZlci5raW5kLCBjYXBzKTtcclxuXHJcbiAgLy8gTWFwIElDRSBwYXJhbWV0ZXJzICh1ZnJhZywgcHdkKSB0byBTRFAuXHJcbiAgc2RwICs9IFNEUFV0aWxzLndyaXRlSWNlUGFyYW1ldGVycyhcclxuICAgICAgdHJhbnNjZWl2ZXIuaWNlR2F0aGVyZXIuZ2V0TG9jYWxQYXJhbWV0ZXJzKCkpO1xyXG5cclxuICAvLyBNYXAgRFRMUyBwYXJhbWV0ZXJzIHRvIFNEUC5cclxuICBzZHAgKz0gU0RQVXRpbHMud3JpdGVEdGxzUGFyYW1ldGVycyhcclxuICAgICAgdHJhbnNjZWl2ZXIuZHRsc1RyYW5zcG9ydC5nZXRMb2NhbFBhcmFtZXRlcnMoKSxcclxuICAgICAgdHlwZSA9PT0gJ29mZmVyJyA/ICdhY3RwYXNzJyA6ICdhY3RpdmUnKTtcclxuXHJcbiAgc2RwICs9ICdhPW1pZDonICsgdHJhbnNjZWl2ZXIubWlkICsgJ1xcclxcbic7XHJcblxyXG4gIGlmICh0cmFuc2NlaXZlci5kaXJlY3Rpb24pIHtcclxuICAgIHNkcCArPSAnYT0nICsgdHJhbnNjZWl2ZXIuZGlyZWN0aW9uICsgJ1xcclxcbic7XHJcbiAgfSBlbHNlIGlmICh0cmFuc2NlaXZlci5ydHBTZW5kZXIgJiYgdHJhbnNjZWl2ZXIucnRwUmVjZWl2ZXIpIHtcclxuICAgIHNkcCArPSAnYT1zZW5kcmVjdlxcclxcbic7XHJcbiAgfSBlbHNlIGlmICh0cmFuc2NlaXZlci5ydHBTZW5kZXIpIHtcclxuICAgIHNkcCArPSAnYT1zZW5kb25seVxcclxcbic7XHJcbiAgfSBlbHNlIGlmICh0cmFuc2NlaXZlci5ydHBSZWNlaXZlcikge1xyXG4gICAgc2RwICs9ICdhPXJlY3Zvbmx5XFxyXFxuJztcclxuICB9IGVsc2Uge1xyXG4gICAgc2RwICs9ICdhPWluYWN0aXZlXFxyXFxuJztcclxuICB9XHJcblxyXG4gIGlmICh0cmFuc2NlaXZlci5ydHBTZW5kZXIpIHtcclxuICAgIC8vIHNwZWMuXHJcbiAgICB2YXIgbXNpZCA9ICdtc2lkOicgKyBzdHJlYW0uaWQgKyAnICcgK1xyXG4gICAgICAgIHRyYW5zY2VpdmVyLnJ0cFNlbmRlci50cmFjay5pZCArICdcXHJcXG4nO1xyXG4gICAgc2RwICs9ICdhPScgKyBtc2lkO1xyXG5cclxuICAgIC8vIGZvciBDaHJvbWUuXHJcbiAgICBzZHAgKz0gJ2E9c3NyYzonICsgdHJhbnNjZWl2ZXIuc2VuZEVuY29kaW5nUGFyYW1ldGVyc1swXS5zc3JjICtcclxuICAgICAgICAnICcgKyBtc2lkO1xyXG4gICAgaWYgKHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4KSB7XHJcbiAgICAgIHNkcCArPSAnYT1zc3JjOicgKyB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eC5zc3JjICtcclxuICAgICAgICAgICcgJyArIG1zaWQ7XHJcbiAgICAgIHNkcCArPSAnYT1zc3JjLWdyb3VwOkZJRCAnICtcclxuICAgICAgICAgIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0uc3NyYyArICcgJyArXHJcbiAgICAgICAgICB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eC5zc3JjICtcclxuICAgICAgICAgICdcXHJcXG4nO1xyXG4gICAgfVxyXG4gIH1cclxuICAvLyBGSVhNRTogdGhpcyBzaG91bGQgYmUgd3JpdHRlbiBieSB3cml0ZVJ0cERlc2NyaXB0aW9uLlxyXG4gIHNkcCArPSAnYT1zc3JjOicgKyB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnNzcmMgK1xyXG4gICAgICAnIGNuYW1lOicgKyBTRFBVdGlscy5sb2NhbENOYW1lICsgJ1xcclxcbic7XHJcbiAgaWYgKHRyYW5zY2VpdmVyLnJ0cFNlbmRlciAmJiB0cmFuc2NlaXZlci5zZW5kRW5jb2RpbmdQYXJhbWV0ZXJzWzBdLnJ0eCkge1xyXG4gICAgc2RwICs9ICdhPXNzcmM6JyArIHRyYW5zY2VpdmVyLnNlbmRFbmNvZGluZ1BhcmFtZXRlcnNbMF0ucnR4LnNzcmMgK1xyXG4gICAgICAgICcgY25hbWU6JyArIFNEUFV0aWxzLmxvY2FsQ05hbWUgKyAnXFxyXFxuJztcclxuICB9XHJcbiAgcmV0dXJuIHNkcDtcclxufTtcclxuXHJcbi8vIEdldHMgdGhlIGRpcmVjdGlvbiBmcm9tIHRoZSBtZWRpYVNlY3Rpb24gb3IgdGhlIHNlc3Npb25wYXJ0LlxyXG5TRFBVdGlscy5nZXREaXJlY3Rpb24gPSBmdW5jdGlvbihtZWRpYVNlY3Rpb24sIHNlc3Npb25wYXJ0KSB7XHJcbiAgLy8gTG9vayBmb3Igc2VuZHJlY3YsIHNlbmRvbmx5LCByZWN2b25seSwgaW5hY3RpdmUsIGRlZmF1bHQgdG8gc2VuZHJlY3YuXHJcbiAgdmFyIGxpbmVzID0gU0RQVXRpbHMuc3BsaXRMaW5lcyhtZWRpYVNlY3Rpb24pO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcclxuICAgIHN3aXRjaCAobGluZXNbaV0pIHtcclxuICAgICAgY2FzZSAnYT1zZW5kcmVjdic6XHJcbiAgICAgIGNhc2UgJ2E9c2VuZG9ubHknOlxyXG4gICAgICBjYXNlICdhPXJlY3Zvbmx5JzpcclxuICAgICAgY2FzZSAnYT1pbmFjdGl2ZSc6XHJcbiAgICAgICAgcmV0dXJuIGxpbmVzW2ldLnN1YnN0cigyKTtcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICAvLyBGSVhNRTogV2hhdCBzaG91bGQgaGFwcGVuIGhlcmU/XHJcbiAgICB9XHJcbiAgfVxyXG4gIGlmIChzZXNzaW9ucGFydCkge1xyXG4gICAgcmV0dXJuIFNEUFV0aWxzLmdldERpcmVjdGlvbihzZXNzaW9ucGFydCk7XHJcbiAgfVxyXG4gIHJldHVybiAnc2VuZHJlY3YnO1xyXG59O1xyXG5cclxuU0RQVXRpbHMuZ2V0S2luZCA9IGZ1bmN0aW9uKG1lZGlhU2VjdGlvbikge1xyXG4gIHZhciBsaW5lcyA9IFNEUFV0aWxzLnNwbGl0TGluZXMobWVkaWFTZWN0aW9uKTtcclxuICB2YXIgbWxpbmUgPSBsaW5lc1swXS5zcGxpdCgnICcpO1xyXG4gIHJldHVybiBtbGluZVswXS5zdWJzdHIoMik7XHJcbn07XHJcblxyXG5TRFBVdGlscy5pc1JlamVjdGVkID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XHJcbiAgcmV0dXJuIG1lZGlhU2VjdGlvbi5zcGxpdCgnICcsIDIpWzFdID09PSAnMCc7XHJcbn07XHJcblxyXG5TRFBVdGlscy5wYXJzZU1MaW5lID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XHJcbiAgdmFyIGxpbmVzID0gU0RQVXRpbHMuc3BsaXRMaW5lcyhtZWRpYVNlY3Rpb24pO1xyXG4gIHZhciBwYXJ0cyA9IGxpbmVzWzBdLnN1YnN0cigyKS5zcGxpdCgnICcpO1xyXG4gIHJldHVybiB7XHJcbiAgICBraW5kOiBwYXJ0c1swXSxcclxuICAgIHBvcnQ6IHBhcnNlSW50KHBhcnRzWzFdLCAxMCksXHJcbiAgICBwcm90b2NvbDogcGFydHNbMl0sXHJcbiAgICBmbXQ6IHBhcnRzLnNsaWNlKDMpLmpvaW4oJyAnKVxyXG4gIH07XHJcbn07XHJcblxyXG5TRFBVdGlscy5wYXJzZU9MaW5lID0gZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XHJcbiAgdmFyIGxpbmUgPSBTRFBVdGlscy5tYXRjaFByZWZpeChtZWRpYVNlY3Rpb24sICdvPScpWzBdO1xyXG4gIHZhciBwYXJ0cyA9IGxpbmUuc3Vic3RyKDIpLnNwbGl0KCcgJyk7XHJcbiAgcmV0dXJuIHtcclxuICAgIHVzZXJuYW1lOiBwYXJ0c1swXSxcclxuICAgIHNlc3Npb25JZDogcGFydHNbMV0sXHJcbiAgICBzZXNzaW9uVmVyc2lvbjogcGFyc2VJbnQocGFydHNbMl0sIDEwKSxcclxuICAgIG5ldFR5cGU6IHBhcnRzWzNdLFxyXG4gICAgYWRkcmVzc1R5cGU6IHBhcnRzWzRdLFxyXG4gICAgYWRkcmVzczogcGFydHNbNV0sXHJcbiAgfTtcclxufVxyXG5cclxuLy8gRXhwb3NlIHB1YmxpYyBtZXRob2RzLlxyXG5pZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpIHtcclxuICBtb2R1bGUuZXhwb3J0cyA9IFNEUFV0aWxzO1xyXG59XHJcblxyXG59LHt9XSwzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuKGZ1bmN0aW9uIChnbG9iYWwpe1xyXG4vKlxyXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKlxyXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxyXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXHJcbiAqICB0cmVlLlxyXG4gKi9cclxuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xyXG5cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIGFkYXB0ZXJGYWN0b3J5ID0gcmVxdWlyZSgnLi9hZGFwdGVyX2ZhY3RvcnkuanMnKTtcclxubW9kdWxlLmV4cG9ydHMgPSBhZGFwdGVyRmFjdG9yeSh7d2luZG93OiBnbG9iYWwud2luZG93fSk7XHJcblxyXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcclxufSx7XCIuL2FkYXB0ZXJfZmFjdG9yeS5qc1wiOjR9XSw0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuLypcclxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcclxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxyXG4gKiAgdHJlZS5cclxuICovXHJcbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cclxuXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcclxuLy8gU2hpbW1pbmcgc3RhcnRzIGhlcmUuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZGVwZW5kZW5jaWVzLCBvcHRzKSB7XHJcbiAgdmFyIHdpbmRvdyA9IGRlcGVuZGVuY2llcyAmJiBkZXBlbmRlbmNpZXMud2luZG93O1xyXG5cclxuICB2YXIgb3B0aW9ucyA9IHtcclxuICAgIHNoaW1DaHJvbWU6IHRydWUsXHJcbiAgICBzaGltRmlyZWZveDogdHJ1ZSxcclxuICAgIHNoaW1FZGdlOiB0cnVlLFxyXG4gICAgc2hpbVNhZmFyaTogdHJ1ZSxcclxuICB9O1xyXG5cclxuICBmb3IgKHZhciBrZXkgaW4gb3B0cykge1xyXG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob3B0cywga2V5KSkge1xyXG4gICAgICBvcHRpb25zW2tleV0gPSBvcHRzW2tleV07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBVdGlscy5cclxuICB2YXIgbG9nZ2luZyA9IHV0aWxzLmxvZztcclxuICB2YXIgYnJvd3NlckRldGFpbHMgPSB1dGlscy5kZXRlY3RCcm93c2VyKHdpbmRvdyk7XHJcblxyXG4gIC8vIFVuY29tbWVudCB0aGUgbGluZSBiZWxvdyBpZiB5b3Ugd2FudCBsb2dnaW5nIHRvIG9jY3VyLCBpbmNsdWRpbmcgbG9nZ2luZ1xyXG4gIC8vIGZvciB0aGUgc3dpdGNoIHN0YXRlbWVudCBiZWxvdy4gQ2FuIGFsc28gYmUgdHVybmVkIG9uIGluIHRoZSBicm93c2VyIHZpYVxyXG4gIC8vIGFkYXB0ZXIuZGlzYWJsZUxvZyhmYWxzZSksIGJ1dCB0aGVuIGxvZ2dpbmcgZnJvbSB0aGUgc3dpdGNoIHN0YXRlbWVudCBiZWxvd1xyXG4gIC8vIHdpbGwgbm90IGFwcGVhci5cclxuICAvLyByZXF1aXJlKCcuL3V0aWxzJykuZGlzYWJsZUxvZyhmYWxzZSk7XHJcblxyXG4gIC8vIEJyb3dzZXIgc2hpbXMuXHJcbiAgdmFyIGNocm9tZVNoaW0gPSByZXF1aXJlKCcuL2Nocm9tZS9jaHJvbWVfc2hpbScpIHx8IG51bGw7XHJcbiAgdmFyIGVkZ2VTaGltID0gcmVxdWlyZSgnLi9lZGdlL2VkZ2Vfc2hpbScpIHx8IG51bGw7XHJcbiAgdmFyIGZpcmVmb3hTaGltID0gcmVxdWlyZSgnLi9maXJlZm94L2ZpcmVmb3hfc2hpbScpIHx8IG51bGw7XHJcbiAgdmFyIHNhZmFyaVNoaW0gPSByZXF1aXJlKCcuL3NhZmFyaS9zYWZhcmlfc2hpbScpIHx8IG51bGw7XHJcbiAgdmFyIGNvbW1vblNoaW0gPSByZXF1aXJlKCcuL2NvbW1vbl9zaGltJykgfHwgbnVsbDtcclxuXHJcbiAgLy8gRXhwb3J0IHRvIHRoZSBhZGFwdGVyIGdsb2JhbCBvYmplY3QgdmlzaWJsZSBpbiB0aGUgYnJvd3Nlci5cclxuICB2YXIgYWRhcHRlciA9IHtcclxuICAgIGJyb3dzZXJEZXRhaWxzOiBicm93c2VyRGV0YWlscyxcclxuICAgIGNvbW1vblNoaW06IGNvbW1vblNoaW0sXHJcbiAgICBleHRyYWN0VmVyc2lvbjogdXRpbHMuZXh0cmFjdFZlcnNpb24sXHJcbiAgICBkaXNhYmxlTG9nOiB1dGlscy5kaXNhYmxlTG9nLFxyXG4gICAgZGlzYWJsZVdhcm5pbmdzOiB1dGlscy5kaXNhYmxlV2FybmluZ3NcclxuICB9O1xyXG5cclxuICAvLyBTaGltIGJyb3dzZXIgaWYgZm91bmQuXHJcbiAgc3dpdGNoIChicm93c2VyRGV0YWlscy5icm93c2VyKSB7XHJcbiAgICBjYXNlICdjaHJvbWUnOlxyXG4gICAgICBpZiAoIWNocm9tZVNoaW0gfHwgIWNocm9tZVNoaW0uc2hpbVBlZXJDb25uZWN0aW9uIHx8XHJcbiAgICAgICAgICAhb3B0aW9ucy5zaGltQ2hyb21lKSB7XHJcbiAgICAgICAgbG9nZ2luZygnQ2hyb21lIHNoaW0gaXMgbm90IGluY2x1ZGVkIGluIHRoaXMgYWRhcHRlciByZWxlYXNlLicpO1xyXG4gICAgICAgIHJldHVybiBhZGFwdGVyO1xyXG4gICAgICB9XHJcbiAgICAgIGxvZ2dpbmcoJ2FkYXB0ZXIuanMgc2hpbW1pbmcgY2hyb21lLicpO1xyXG4gICAgICAvLyBFeHBvcnQgdG8gdGhlIGFkYXB0ZXIgZ2xvYmFsIG9iamVjdCB2aXNpYmxlIGluIHRoZSBicm93c2VyLlxyXG4gICAgICBhZGFwdGVyLmJyb3dzZXJTaGltID0gY2hyb21lU2hpbTtcclxuICAgICAgY29tbW9uU2hpbS5zaGltQ3JlYXRlT2JqZWN0VVJMKHdpbmRvdyk7XHJcblxyXG4gICAgICBjaHJvbWVTaGltLnNoaW1HZXRVc2VyTWVkaWEod2luZG93KTtcclxuICAgICAgY2hyb21lU2hpbS5zaGltTWVkaWFTdHJlYW0od2luZG93KTtcclxuICAgICAgY2hyb21lU2hpbS5zaGltU291cmNlT2JqZWN0KHdpbmRvdyk7XHJcbiAgICAgIGNocm9tZVNoaW0uc2hpbVBlZXJDb25uZWN0aW9uKHdpbmRvdyk7XHJcbiAgICAgIGNocm9tZVNoaW0uc2hpbU9uVHJhY2sod2luZG93KTtcclxuICAgICAgY2hyb21lU2hpbS5zaGltQWRkVHJhY2tSZW1vdmVUcmFjayh3aW5kb3cpO1xyXG4gICAgICBjaHJvbWVTaGltLnNoaW1HZXRTZW5kZXJzV2l0aER0bWYod2luZG93KTtcclxuXHJcbiAgICAgIGNvbW1vblNoaW0uc2hpbVJUQ0ljZUNhbmRpZGF0ZSh3aW5kb3cpO1xyXG4gICAgICBjb21tb25TaGltLnNoaW1NYXhNZXNzYWdlU2l6ZSh3aW5kb3cpO1xyXG4gICAgICBjb21tb25TaGltLnNoaW1TZW5kVGhyb3dUeXBlRXJyb3Iod2luZG93KTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdmaXJlZm94JzpcclxuICAgICAgaWYgKCFmaXJlZm94U2hpbSB8fCAhZmlyZWZveFNoaW0uc2hpbVBlZXJDb25uZWN0aW9uIHx8XHJcbiAgICAgICAgICAhb3B0aW9ucy5zaGltRmlyZWZveCkge1xyXG4gICAgICAgIGxvZ2dpbmcoJ0ZpcmVmb3ggc2hpbSBpcyBub3QgaW5jbHVkZWQgaW4gdGhpcyBhZGFwdGVyIHJlbGVhc2UuJyk7XHJcbiAgICAgICAgcmV0dXJuIGFkYXB0ZXI7XHJcbiAgICAgIH1cclxuICAgICAgbG9nZ2luZygnYWRhcHRlci5qcyBzaGltbWluZyBmaXJlZm94LicpO1xyXG4gICAgICAvLyBFeHBvcnQgdG8gdGhlIGFkYXB0ZXIgZ2xvYmFsIG9iamVjdCB2aXNpYmxlIGluIHRoZSBicm93c2VyLlxyXG4gICAgICBhZGFwdGVyLmJyb3dzZXJTaGltID0gZmlyZWZveFNoaW07XHJcbiAgICAgIGNvbW1vblNoaW0uc2hpbUNyZWF0ZU9iamVjdFVSTCh3aW5kb3cpO1xyXG5cclxuICAgICAgZmlyZWZveFNoaW0uc2hpbUdldFVzZXJNZWRpYSh3aW5kb3cpO1xyXG4gICAgICBmaXJlZm94U2hpbS5zaGltU291cmNlT2JqZWN0KHdpbmRvdyk7XHJcbiAgICAgIGZpcmVmb3hTaGltLnNoaW1QZWVyQ29ubmVjdGlvbih3aW5kb3cpO1xyXG4gICAgICBmaXJlZm94U2hpbS5zaGltT25UcmFjayh3aW5kb3cpO1xyXG4gICAgICBmaXJlZm94U2hpbS5zaGltUmVtb3ZlU3RyZWFtKHdpbmRvdyk7XHJcblxyXG4gICAgICBjb21tb25TaGltLnNoaW1SVENJY2VDYW5kaWRhdGUod2luZG93KTtcclxuICAgICAgY29tbW9uU2hpbS5zaGltTWF4TWVzc2FnZVNpemUod2luZG93KTtcclxuICAgICAgY29tbW9uU2hpbS5zaGltU2VuZFRocm93VHlwZUVycm9yKHdpbmRvdyk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnZWRnZSc6XHJcbiAgICAgIGlmICghZWRnZVNoaW0gfHwgIWVkZ2VTaGltLnNoaW1QZWVyQ29ubmVjdGlvbiB8fCAhb3B0aW9ucy5zaGltRWRnZSkge1xyXG4gICAgICAgIGxvZ2dpbmcoJ01TIGVkZ2Ugc2hpbSBpcyBub3QgaW5jbHVkZWQgaW4gdGhpcyBhZGFwdGVyIHJlbGVhc2UuJyk7XHJcbiAgICAgICAgcmV0dXJuIGFkYXB0ZXI7XHJcbiAgICAgIH1cclxuICAgICAgbG9nZ2luZygnYWRhcHRlci5qcyBzaGltbWluZyBlZGdlLicpO1xyXG4gICAgICAvLyBFeHBvcnQgdG8gdGhlIGFkYXB0ZXIgZ2xvYmFsIG9iamVjdCB2aXNpYmxlIGluIHRoZSBicm93c2VyLlxyXG4gICAgICBhZGFwdGVyLmJyb3dzZXJTaGltID0gZWRnZVNoaW07XHJcbiAgICAgIGNvbW1vblNoaW0uc2hpbUNyZWF0ZU9iamVjdFVSTCh3aW5kb3cpO1xyXG5cclxuICAgICAgZWRnZVNoaW0uc2hpbUdldFVzZXJNZWRpYSh3aW5kb3cpO1xyXG4gICAgICBlZGdlU2hpbS5zaGltUGVlckNvbm5lY3Rpb24od2luZG93KTtcclxuICAgICAgZWRnZVNoaW0uc2hpbVJlcGxhY2VUcmFjayh3aW5kb3cpO1xyXG5cclxuICAgICAgLy8gdGhlIGVkZ2Ugc2hpbSBpbXBsZW1lbnRzIHRoZSBmdWxsIFJUQ0ljZUNhbmRpZGF0ZSBvYmplY3QuXHJcblxyXG4gICAgICBjb21tb25TaGltLnNoaW1NYXhNZXNzYWdlU2l6ZSh3aW5kb3cpO1xyXG4gICAgICBjb21tb25TaGltLnNoaW1TZW5kVGhyb3dUeXBlRXJyb3Iod2luZG93KTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdzYWZhcmknOlxyXG4gICAgICBpZiAoIXNhZmFyaVNoaW0gfHwgIW9wdGlvbnMuc2hpbVNhZmFyaSkge1xyXG4gICAgICAgIGxvZ2dpbmcoJ1NhZmFyaSBzaGltIGlzIG5vdCBpbmNsdWRlZCBpbiB0aGlzIGFkYXB0ZXIgcmVsZWFzZS4nKTtcclxuICAgICAgICByZXR1cm4gYWRhcHRlcjtcclxuICAgICAgfVxyXG4gICAgICBsb2dnaW5nKCdhZGFwdGVyLmpzIHNoaW1taW5nIHNhZmFyaS4nKTtcclxuICAgICAgLy8gRXhwb3J0IHRvIHRoZSBhZGFwdGVyIGdsb2JhbCBvYmplY3QgdmlzaWJsZSBpbiB0aGUgYnJvd3Nlci5cclxuICAgICAgYWRhcHRlci5icm93c2VyU2hpbSA9IHNhZmFyaVNoaW07XHJcbiAgICAgIGNvbW1vblNoaW0uc2hpbUNyZWF0ZU9iamVjdFVSTCh3aW5kb3cpO1xyXG5cclxuICAgICAgc2FmYXJpU2hpbS5zaGltUlRDSWNlU2VydmVyVXJscyh3aW5kb3cpO1xyXG4gICAgICBzYWZhcmlTaGltLnNoaW1DYWxsYmFja3NBUEkod2luZG93KTtcclxuICAgICAgc2FmYXJpU2hpbS5zaGltTG9jYWxTdHJlYW1zQVBJKHdpbmRvdyk7XHJcbiAgICAgIHNhZmFyaVNoaW0uc2hpbVJlbW90ZVN0cmVhbXNBUEkod2luZG93KTtcclxuICAgICAgc2FmYXJpU2hpbS5zaGltVHJhY2tFdmVudFRyYW5zY2VpdmVyKHdpbmRvdyk7XHJcbiAgICAgIHNhZmFyaVNoaW0uc2hpbUdldFVzZXJNZWRpYSh3aW5kb3cpO1xyXG4gICAgICBzYWZhcmlTaGltLnNoaW1DcmVhdGVPZmZlckxlZ2FjeSh3aW5kb3cpO1xyXG5cclxuICAgICAgY29tbW9uU2hpbS5zaGltUlRDSWNlQ2FuZGlkYXRlKHdpbmRvdyk7XHJcbiAgICAgIGNvbW1vblNoaW0uc2hpbU1heE1lc3NhZ2VTaXplKHdpbmRvdyk7XHJcbiAgICAgIGNvbW1vblNoaW0uc2hpbVNlbmRUaHJvd1R5cGVFcnJvcih3aW5kb3cpO1xyXG4gICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIGxvZ2dpbmcoJ1Vuc3VwcG9ydGVkIGJyb3dzZXIhJyk7XHJcbiAgICAgIGJyZWFrO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGFkYXB0ZXI7XHJcbn07XHJcblxyXG59LHtcIi4vY2hyb21lL2Nocm9tZV9zaGltXCI6NSxcIi4vY29tbW9uX3NoaW1cIjo3LFwiLi9lZGdlL2VkZ2Vfc2hpbVwiOjgsXCIuL2ZpcmVmb3gvZmlyZWZveF9zaGltXCI6MTAsXCIuL3NhZmFyaS9zYWZhcmlfc2hpbVwiOjEyLFwiLi91dGlsc1wiOjEzfV0sNTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcblxyXG4vKlxyXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKlxyXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxyXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXHJcbiAqICB0cmVlLlxyXG4gKi9cclxuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xyXG4ndXNlIHN0cmljdCc7XHJcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzLmpzJyk7XHJcbnZhciBsb2dnaW5nID0gdXRpbHMubG9nO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgc2hpbUdldFVzZXJNZWRpYTogcmVxdWlyZSgnLi9nZXR1c2VybWVkaWEnKSxcclxuICBzaGltTWVkaWFTdHJlYW06IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgd2luZG93Lk1lZGlhU3RyZWFtID0gd2luZG93Lk1lZGlhU3RyZWFtIHx8IHdpbmRvdy53ZWJraXRNZWRpYVN0cmVhbTtcclxuICB9LFxyXG5cclxuICBzaGltT25UcmFjazogZnVuY3Rpb24od2luZG93KSB7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uICYmICEoJ29udHJhY2snIGluXHJcbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkpIHtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUsICdvbnRyYWNrJywge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5fb250cmFjaztcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldDogZnVuY3Rpb24oZikge1xyXG4gICAgICAgICAgaWYgKHRoaXMuX29udHJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFjaycsIHRoaXMuX29udHJhY2spO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCd0cmFjaycsIHRoaXMuX29udHJhY2sgPSBmKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICB2YXIgb3JpZ1NldFJlbW90ZURlc2NyaXB0aW9uID1cclxuICAgICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0UmVtb3RlRGVzY3JpcHRpb247XHJcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0UmVtb3RlRGVzY3JpcHRpb24gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICAgIGlmICghcGMuX29udHJhY2twb2x5KSB7XHJcbiAgICAgICAgICBwYy5fb250cmFja3BvbHkgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIC8vIG9uYWRkc3RyZWFtIGRvZXMgbm90IGZpcmUgd2hlbiBhIHRyYWNrIGlzIGFkZGVkIHRvIGFuIGV4aXN0aW5nXHJcbiAgICAgICAgICAgIC8vIHN0cmVhbS4gQnV0IHN0cmVhbS5vbmFkZHRyYWNrIGlzIGltcGxlbWVudGVkIHNvIHdlIHVzZSB0aGF0LlxyXG4gICAgICAgICAgICBlLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKCdhZGR0cmFjaycsIGZ1bmN0aW9uKHRlKSB7XHJcbiAgICAgICAgICAgICAgdmFyIHJlY2VpdmVyO1xyXG4gICAgICAgICAgICAgIGlmICh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFJlY2VpdmVycykge1xyXG4gICAgICAgICAgICAgICAgcmVjZWl2ZXIgPSBwYy5nZXRSZWNlaXZlcnMoKS5maW5kKGZ1bmN0aW9uKHIpIHtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHIudHJhY2sgJiYgci50cmFjay5pZCA9PT0gdGUudHJhY2suaWQ7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVjZWl2ZXIgPSB7dHJhY2s6IHRlLnRyYWNrfTtcclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgndHJhY2snKTtcclxuICAgICAgICAgICAgICBldmVudC50cmFjayA9IHRlLnRyYWNrO1xyXG4gICAgICAgICAgICAgIGV2ZW50LnJlY2VpdmVyID0gcmVjZWl2ZXI7XHJcbiAgICAgICAgICAgICAgZXZlbnQudHJhbnNjZWl2ZXIgPSB7cmVjZWl2ZXI6IHJlY2VpdmVyfTtcclxuICAgICAgICAgICAgICBldmVudC5zdHJlYW1zID0gW2Uuc3RyZWFtXTtcclxuICAgICAgICAgICAgICBwYy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGUuc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcclxuICAgICAgICAgICAgICB2YXIgcmVjZWl2ZXI7XHJcbiAgICAgICAgICAgICAgaWYgKHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0UmVjZWl2ZXJzKSB7XHJcbiAgICAgICAgICAgICAgICByZWNlaXZlciA9IHBjLmdldFJlY2VpdmVycygpLmZpbmQoZnVuY3Rpb24ocikge1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gci50cmFjayAmJiByLnRyYWNrLmlkID09PSB0cmFjay5pZDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZWNlaXZlciA9IHt0cmFjazogdHJhY2t9O1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB2YXIgZXZlbnQgPSBuZXcgRXZlbnQoJ3RyYWNrJyk7XHJcbiAgICAgICAgICAgICAgZXZlbnQudHJhY2sgPSB0cmFjaztcclxuICAgICAgICAgICAgICBldmVudC5yZWNlaXZlciA9IHJlY2VpdmVyO1xyXG4gICAgICAgICAgICAgIGV2ZW50LnRyYW5zY2VpdmVyID0ge3JlY2VpdmVyOiByZWNlaXZlcn07XHJcbiAgICAgICAgICAgICAgZXZlbnQuc3RyZWFtcyA9IFtlLnN0cmVhbV07XHJcbiAgICAgICAgICAgICAgcGMuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIHBjLmFkZEV2ZW50TGlzdGVuZXIoJ2FkZHN0cmVhbScsIHBjLl9vbnRyYWNrcG9seSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvcmlnU2V0UmVtb3RlRGVzY3JpcHRpb24uYXBwbHkocGMsIGFyZ3VtZW50cyk7XHJcbiAgICAgIH07XHJcbiAgICB9IGVsc2UgaWYgKCEoJ1JUQ1J0cFRyYW5zY2VpdmVyJyBpbiB3aW5kb3cpKSB7XHJcbiAgICAgIHV0aWxzLndyYXBQZWVyQ29ubmVjdGlvbkV2ZW50KHdpbmRvdywgJ3RyYWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmICghZS50cmFuc2NlaXZlcikge1xyXG4gICAgICAgICAgZS50cmFuc2NlaXZlciA9IHtyZWNlaXZlcjogZS5yZWNlaXZlcn07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBzaGltR2V0U2VuZGVyc1dpdGhEdG1mOiBmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIC8vIE92ZXJyaWRlcyBhZGRUcmFjay9yZW1vdmVUcmFjaywgZGVwZW5kcyBvbiBzaGltQWRkVHJhY2tSZW1vdmVUcmFjay5cclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gJiZcclxuICAgICAgICAhKCdnZXRTZW5kZXJzJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSAmJlxyXG4gICAgICAgICdjcmVhdGVEVE1GU2VuZGVyJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSB7XHJcbiAgICAgIHZhciBzaGltU2VuZGVyV2l0aER0bWYgPSBmdW5jdGlvbihwYywgdHJhY2spIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdHJhY2s6IHRyYWNrLFxyXG4gICAgICAgICAgZ2V0IGR0bWYoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9kdG1mID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICBpZiAodHJhY2sua2luZCA9PT0gJ2F1ZGlvJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZHRtZiA9IHBjLmNyZWF0ZURUTUZTZW5kZXIodHJhY2spO1xyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kdG1mID0gbnVsbDtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2R0bWY7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgX3BjOiBwY1xyXG4gICAgICAgIH07XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBhdWdtZW50IGFkZFRyYWNrIHdoZW4gZ2V0U2VuZGVycyBpcyBub3QgYXZhaWxhYmxlLlxyXG4gICAgICBpZiAoIXdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U2VuZGVycykge1xyXG4gICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U2VuZGVycyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgdGhpcy5fc2VuZGVycyA9IHRoaXMuX3NlbmRlcnMgfHwgW107XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5fc2VuZGVycy5zbGljZSgpOyAvLyByZXR1cm4gYSBjb3B5IG9mIHRoZSBpbnRlcm5hbCBzdGF0ZS5cclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciBvcmlnQWRkVHJhY2sgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFRyYWNrO1xyXG4gICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2sgPSBmdW5jdGlvbih0cmFjaywgc3RyZWFtKSB7XHJcbiAgICAgICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICAgICAgdmFyIHNlbmRlciA9IG9yaWdBZGRUcmFjay5hcHBseShwYywgYXJndW1lbnRzKTtcclxuICAgICAgICAgIGlmICghc2VuZGVyKSB7XHJcbiAgICAgICAgICAgIHNlbmRlciA9IHNoaW1TZW5kZXJXaXRoRHRtZihwYywgdHJhY2spO1xyXG4gICAgICAgICAgICBwYy5fc2VuZGVycy5wdXNoKHNlbmRlcik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gc2VuZGVyO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZhciBvcmlnUmVtb3ZlVHJhY2sgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVRyYWNrO1xyXG4gICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlVHJhY2sgPSBmdW5jdGlvbihzZW5kZXIpIHtcclxuICAgICAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgICAgICBvcmlnUmVtb3ZlVHJhY2suYXBwbHkocGMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICB2YXIgaWR4ID0gcGMuX3NlbmRlcnMuaW5kZXhPZihzZW5kZXIpO1xyXG4gICAgICAgICAgaWYgKGlkeCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgcGMuX3NlbmRlcnMuc3BsaWNlKGlkeCwgMSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG4gICAgICB2YXIgb3JpZ0FkZFN0cmVhbSA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkU3RyZWFtO1xyXG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xyXG4gICAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgICAgcGMuX3NlbmRlcnMgPSBwYy5fc2VuZGVycyB8fCBbXTtcclxuICAgICAgICBvcmlnQWRkU3RyZWFtLmFwcGx5KHBjLCBbc3RyZWFtXSk7XHJcbiAgICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcclxuICAgICAgICAgIHBjLl9zZW5kZXJzLnB1c2goc2hpbVNlbmRlcldpdGhEdG1mKHBjLCB0cmFjaykpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgdmFyIG9yaWdSZW1vdmVTdHJlYW0gPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVN0cmVhbTtcclxuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcclxuICAgICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICAgIHBjLl9zZW5kZXJzID0gcGMuX3NlbmRlcnMgfHwgW107XHJcbiAgICAgICAgb3JpZ1JlbW92ZVN0cmVhbS5hcHBseShwYywgW3N0cmVhbV0pO1xyXG5cclxuICAgICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xyXG4gICAgICAgICAgdmFyIHNlbmRlciA9IHBjLl9zZW5kZXJzLmZpbmQoZnVuY3Rpb24ocykge1xyXG4gICAgICAgICAgICByZXR1cm4gcy50cmFjayA9PT0gdHJhY2s7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGlmIChzZW5kZXIpIHtcclxuICAgICAgICAgICAgcGMuX3NlbmRlcnMuc3BsaWNlKHBjLl9zZW5kZXJzLmluZGV4T2Yoc2VuZGVyKSwgMSk7IC8vIHJlbW92ZSBzZW5kZXJcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcgJiYgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uICYmXHJcbiAgICAgICAgICAgICAgICdnZXRTZW5kZXJzJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlICYmXHJcbiAgICAgICAgICAgICAgICdjcmVhdGVEVE1GU2VuZGVyJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlICYmXHJcbiAgICAgICAgICAgICAgIHdpbmRvdy5SVENSdHBTZW5kZXIgJiZcclxuICAgICAgICAgICAgICAgISgnZHRtZicgaW4gd2luZG93LlJUQ1J0cFNlbmRlci5wcm90b3R5cGUpKSB7XHJcbiAgICAgIHZhciBvcmlnR2V0U2VuZGVycyA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U2VuZGVycztcclxuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTZW5kZXJzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgICB2YXIgc2VuZGVycyA9IG9yaWdHZXRTZW5kZXJzLmFwcGx5KHBjLCBbXSk7XHJcbiAgICAgICAgc2VuZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHNlbmRlcikge1xyXG4gICAgICAgICAgc2VuZGVyLl9wYyA9IHBjO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBzZW5kZXJzO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENSdHBTZW5kZXIucHJvdG90eXBlLCAnZHRtZicsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgaWYgKHRoaXMuX2R0bWYgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy50cmFjay5raW5kID09PSAnYXVkaW8nKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5fZHRtZiA9IHRoaXMuX3BjLmNyZWF0ZURUTUZTZW5kZXIodGhpcy50cmFjayk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5fZHRtZiA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiB0aGlzLl9kdG1mO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgc2hpbVNvdXJjZU9iamVjdDogZnVuY3Rpb24od2luZG93KSB7XHJcbiAgICB2YXIgVVJMID0gd2luZG93ICYmIHdpbmRvdy5VUkw7XHJcblxyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIGlmICh3aW5kb3cuSFRNTE1lZGlhRWxlbWVudCAmJlxyXG4gICAgICAgICEoJ3NyY09iamVjdCcgaW4gd2luZG93LkhUTUxNZWRpYUVsZW1lbnQucHJvdG90eXBlKSkge1xyXG4gICAgICAgIC8vIFNoaW0gdGhlIHNyY09iamVjdCBwcm9wZXJ0eSwgb25jZSwgd2hlbiBIVE1MTWVkaWFFbGVtZW50IGlzIGZvdW5kLlxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuSFRNTE1lZGlhRWxlbWVudC5wcm90b3R5cGUsICdzcmNPYmplY3QnLCB7XHJcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3JjT2JqZWN0O1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHNldDogZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgLy8gVXNlIF9zcmNPYmplY3QgYXMgYSBwcml2YXRlIHByb3BlcnR5IGZvciB0aGlzIHNoaW1cclxuICAgICAgICAgICAgdGhpcy5fc3JjT2JqZWN0ID0gc3RyZWFtO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zcmMpIHtcclxuICAgICAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHRoaXMuc3JjKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCFzdHJlYW0pIHtcclxuICAgICAgICAgICAgICB0aGlzLnNyYyA9ICcnO1xyXG4gICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKHN0cmVhbSk7XHJcbiAgICAgICAgICAgIC8vIFdlIG5lZWQgdG8gcmVjcmVhdGUgdGhlIGJsb2IgdXJsIHdoZW4gYSB0cmFjayBpcyBhZGRlZCBvclxyXG4gICAgICAgICAgICAvLyByZW1vdmVkLiBEb2luZyBpdCBtYW51YWxseSBzaW5jZSB3ZSB3YW50IHRvIGF2b2lkIGEgcmVjdXJzaW9uLlxyXG4gICAgICAgICAgICBzdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcignYWRkdHJhY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICBpZiAoc2VsZi5zcmMpIHtcclxuICAgICAgICAgICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwoc2VsZi5zcmMpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBzZWxmLnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoc3RyZWFtKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHN0cmVhbS5hZGRFdmVudExpc3RlbmVyKCdyZW1vdmV0cmFjaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgIGlmIChzZWxmLnNyYykge1xyXG4gICAgICAgICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChzZWxmLnNyYyk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHNlbGYuc3JjID0gVVJMLmNyZWF0ZU9iamVjdFVSTChzdHJlYW0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHNoaW1BZGRUcmFja1JlbW92ZVRyYWNrV2l0aE5hdGl2ZTogZnVuY3Rpb24od2luZG93KSB7XHJcbiAgICAvLyBzaGltIGFkZFRyYWNrL3JlbW92ZVRyYWNrIHdpdGggbmF0aXZlIHZhcmlhbnRzIGluIG9yZGVyIHRvIG1ha2VcclxuICAgIC8vIHRoZSBpbnRlcmFjdGlvbnMgd2l0aCBsZWdhY3kgZ2V0TG9jYWxTdHJlYW1zIGJlaGF2ZSBhcyBpbiBvdGhlciBicm93c2Vycy5cclxuICAgIC8vIEtlZXBzIGEgbWFwcGluZyBzdHJlYW0uaWQgPT4gW3N0cmVhbSwgcnRwc2VuZGVycy4uLl1cclxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0TG9jYWxTdHJlYW1zID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgIHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMgPSB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zIHx8IHt9O1xyXG4gICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcykubWFwKGZ1bmN0aW9uKHN0cmVhbUlkKSB7XHJcbiAgICAgICAgcmV0dXJuIHBjLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbUlkXVswXTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBvcmlnQWRkVHJhY2sgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFRyYWNrO1xyXG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjayA9IGZ1bmN0aW9uKHRyYWNrLCBzdHJlYW0pIHtcclxuICAgICAgaWYgKCFzdHJlYW0pIHtcclxuICAgICAgICByZXR1cm4gb3JpZ0FkZFRyYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcyA9IHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMgfHwge307XHJcblxyXG4gICAgICB2YXIgc2VuZGVyID0gb3JpZ0FkZFRyYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgIGlmICghdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW0uaWRdKSB7XHJcbiAgICAgICAgdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW0uaWRdID0gW3N0cmVhbSwgc2VuZGVyXTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbS5pZF0uaW5kZXhPZihzZW5kZXIpID09PSAtMSkge1xyXG4gICAgICAgIHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtLmlkXS5wdXNoKHNlbmRlcik7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHNlbmRlcjtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIG9yaWdBZGRTdHJlYW0gPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFN0cmVhbTtcclxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkU3RyZWFtID0gZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgIHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMgPSB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zIHx8IHt9O1xyXG5cclxuICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcclxuICAgICAgICB2YXIgYWxyZWFkeUV4aXN0cyA9IHBjLmdldFNlbmRlcnMoKS5maW5kKGZ1bmN0aW9uKHMpIHtcclxuICAgICAgICAgIHJldHVybiBzLnRyYWNrID09PSB0cmFjaztcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbignVHJhY2sgYWxyZWFkeSBleGlzdHMuJyxcclxuICAgICAgICAgICAgICAnSW52YWxpZEFjY2Vzc0Vycm9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgdmFyIGV4aXN0aW5nU2VuZGVycyA9IHBjLmdldFNlbmRlcnMoKTtcclxuICAgICAgb3JpZ0FkZFN0cmVhbS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICB2YXIgbmV3U2VuZGVycyA9IHBjLmdldFNlbmRlcnMoKS5maWx0ZXIoZnVuY3Rpb24obmV3U2VuZGVyKSB7XHJcbiAgICAgICAgcmV0dXJuIGV4aXN0aW5nU2VuZGVycy5pbmRleE9mKG5ld1NlbmRlcikgPT09IC0xO1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW0uaWRdID0gW3N0cmVhbV0uY29uY2F0KG5ld1NlbmRlcnMpO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgb3JpZ1JlbW92ZVN0cmVhbSA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlU3RyZWFtO1xyXG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcclxuICAgICAgdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcyA9IHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMgfHwge307XHJcbiAgICAgIGRlbGV0ZSB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbS5pZF07XHJcbiAgICAgIHJldHVybiBvcmlnUmVtb3ZlU3RyZWFtLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBvcmlnUmVtb3ZlVHJhY2sgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVRyYWNrO1xyXG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVUcmFjayA9IGZ1bmN0aW9uKHNlbmRlcikge1xyXG4gICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICB0aGlzLl9zaGltbWVkTG9jYWxTdHJlYW1zID0gdGhpcy5fc2hpbW1lZExvY2FsU3RyZWFtcyB8fCB7fTtcclxuICAgICAgaWYgKHNlbmRlcikge1xyXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuX3NoaW1tZWRMb2NhbFN0cmVhbXMpLmZvckVhY2goZnVuY3Rpb24oc3RyZWFtSWQpIHtcclxuICAgICAgICAgIHZhciBpZHggPSBwYy5fc2hpbW1lZExvY2FsU3RyZWFtc1tzdHJlYW1JZF0uaW5kZXhPZihzZW5kZXIpO1xyXG4gICAgICAgICAgaWYgKGlkeCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgcGMuX3NoaW1tZWRMb2NhbFN0cmVhbXNbc3RyZWFtSWRdLnNwbGljZShpZHgsIDEpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHBjLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbUlkXS5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgZGVsZXRlIHBjLl9zaGltbWVkTG9jYWxTdHJlYW1zW3N0cmVhbUlkXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gb3JpZ1JlbW92ZVRyYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xyXG4gIH0sXHJcblxyXG4gIHNoaW1BZGRUcmFja1JlbW92ZVRyYWNrOiBmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIHZhciBicm93c2VyRGV0YWlscyA9IHV0aWxzLmRldGVjdEJyb3dzZXIod2luZG93KTtcclxuICAgIC8vIHNoaW0gYWRkVHJhY2sgYW5kIHJlbW92ZVRyYWNrLlxyXG4gICAgaWYgKHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2sgJiZcclxuICAgICAgICBicm93c2VyRGV0YWlscy52ZXJzaW9uID49IDY1KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnNoaW1BZGRUcmFja1JlbW92ZVRyYWNrV2l0aE5hdGl2ZSh3aW5kb3cpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGFsc28gc2hpbSBwYy5nZXRMb2NhbFN0cmVhbXMgd2hlbiBhZGRUcmFjayBpcyBzaGltbWVkXHJcbiAgICAvLyB0byByZXR1cm4gdGhlIG9yaWdpbmFsIHN0cmVhbXMuXHJcbiAgICB2YXIgb3JpZ0dldExvY2FsU3RyZWFtcyA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVcclxuICAgICAgICAuZ2V0TG9jYWxTdHJlYW1zO1xyXG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRMb2NhbFN0cmVhbXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgdmFyIG5hdGl2ZVN0cmVhbXMgPSBvcmlnR2V0TG9jYWxTdHJlYW1zLmFwcGx5KHRoaXMpO1xyXG4gICAgICBwYy5fcmV2ZXJzZVN0cmVhbXMgPSBwYy5fcmV2ZXJzZVN0cmVhbXMgfHwge307XHJcbiAgICAgIHJldHVybiBuYXRpdmVTdHJlYW1zLm1hcChmdW5jdGlvbihzdHJlYW0pIHtcclxuICAgICAgICByZXR1cm4gcGMuX3JldmVyc2VTdHJlYW1zW3N0cmVhbS5pZF07XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgb3JpZ0FkZFN0cmVhbSA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkU3RyZWFtO1xyXG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcclxuICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgcGMuX3N0cmVhbXMgPSBwYy5fc3RyZWFtcyB8fCB7fTtcclxuICAgICAgcGMuX3JldmVyc2VTdHJlYW1zID0gcGMuX3JldmVyc2VTdHJlYW1zIHx8IHt9O1xyXG5cclxuICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcclxuICAgICAgICB2YXIgYWxyZWFkeUV4aXN0cyA9IHBjLmdldFNlbmRlcnMoKS5maW5kKGZ1bmN0aW9uKHMpIHtcclxuICAgICAgICAgIHJldHVybiBzLnRyYWNrID09PSB0cmFjaztcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbignVHJhY2sgYWxyZWFkeSBleGlzdHMuJyxcclxuICAgICAgICAgICAgICAnSW52YWxpZEFjY2Vzc0Vycm9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgLy8gQWRkIGlkZW50aXR5IG1hcHBpbmcgZm9yIGNvbnNpc3RlbmN5IHdpdGggYWRkVHJhY2suXHJcbiAgICAgIC8vIFVubGVzcyB0aGlzIGlzIGJlaW5nIHVzZWQgd2l0aCBhIHN0cmVhbSBmcm9tIGFkZFRyYWNrLlxyXG4gICAgICBpZiAoIXBjLl9yZXZlcnNlU3RyZWFtc1tzdHJlYW0uaWRdKSB7XHJcbiAgICAgICAgdmFyIG5ld1N0cmVhbSA9IG5ldyB3aW5kb3cuTWVkaWFTdHJlYW0oc3RyZWFtLmdldFRyYWNrcygpKTtcclxuICAgICAgICBwYy5fc3RyZWFtc1tzdHJlYW0uaWRdID0gbmV3U3RyZWFtO1xyXG4gICAgICAgIHBjLl9yZXZlcnNlU3RyZWFtc1tuZXdTdHJlYW0uaWRdID0gc3RyZWFtO1xyXG4gICAgICAgIHN0cmVhbSA9IG5ld1N0cmVhbTtcclxuICAgICAgfVxyXG4gICAgICBvcmlnQWRkU3RyZWFtLmFwcGx5KHBjLCBbc3RyZWFtXSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBvcmlnUmVtb3ZlU3RyZWFtID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVTdHJlYW07XHJcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xyXG4gICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICBwYy5fc3RyZWFtcyA9IHBjLl9zdHJlYW1zIHx8IHt9O1xyXG4gICAgICBwYy5fcmV2ZXJzZVN0cmVhbXMgPSBwYy5fcmV2ZXJzZVN0cmVhbXMgfHwge307XHJcblxyXG4gICAgICBvcmlnUmVtb3ZlU3RyZWFtLmFwcGx5KHBjLCBbKHBjLl9zdHJlYW1zW3N0cmVhbS5pZF0gfHwgc3RyZWFtKV0pO1xyXG4gICAgICBkZWxldGUgcGMuX3JldmVyc2VTdHJlYW1zWyhwYy5fc3RyZWFtc1tzdHJlYW0uaWRdID9cclxuICAgICAgICAgIHBjLl9zdHJlYW1zW3N0cmVhbS5pZF0uaWQgOiBzdHJlYW0uaWQpXTtcclxuICAgICAgZGVsZXRlIHBjLl9zdHJlYW1zW3N0cmVhbS5pZF07XHJcbiAgICB9O1xyXG5cclxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuYWRkVHJhY2sgPSBmdW5jdGlvbih0cmFjaywgc3RyZWFtKSB7XHJcbiAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgIGlmIChwYy5zaWduYWxpbmdTdGF0ZSA9PT0gJ2Nsb3NlZCcpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKFxyXG4gICAgICAgICAgJ1RoZSBSVENQZWVyQ29ubmVjdGlvblxcJ3Mgc2lnbmFsaW5nU3RhdGUgaXMgXFwnY2xvc2VkXFwnLicsXHJcbiAgICAgICAgICAnSW52YWxpZFN0YXRlRXJyb3InKTtcclxuICAgICAgfVxyXG4gICAgICB2YXIgc3RyZWFtcyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcclxuICAgICAgaWYgKHN0cmVhbXMubGVuZ3RoICE9PSAxIHx8XHJcbiAgICAgICAgICAhc3RyZWFtc1swXS5nZXRUcmFja3MoKS5maW5kKGZ1bmN0aW9uKHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHQgPT09IHRyYWNrO1xyXG4gICAgICAgICAgfSkpIHtcclxuICAgICAgICAvLyB0aGlzIGlzIG5vdCBmdWxseSBjb3JyZWN0IGJ1dCBhbGwgd2UgY2FuIG1hbmFnZSB3aXRob3V0XHJcbiAgICAgICAgLy8gW1thc3NvY2lhdGVkIE1lZGlhU3RyZWFtc11dIGludGVybmFsIHNsb3QuXHJcbiAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbihcclxuICAgICAgICAgICdUaGUgYWRhcHRlci5qcyBhZGRUcmFjayBwb2x5ZmlsbCBvbmx5IHN1cHBvcnRzIGEgc2luZ2xlICcgK1xyXG4gICAgICAgICAgJyBzdHJlYW0gd2hpY2ggaXMgYXNzb2NpYXRlZCB3aXRoIHRoZSBzcGVjaWZpZWQgdHJhY2suJyxcclxuICAgICAgICAgICdOb3RTdXBwb3J0ZWRFcnJvcicpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgYWxyZWFkeUV4aXN0cyA9IHBjLmdldFNlbmRlcnMoKS5maW5kKGZ1bmN0aW9uKHMpIHtcclxuICAgICAgICByZXR1cm4gcy50cmFjayA9PT0gdHJhY2s7XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAoYWxyZWFkeUV4aXN0cykge1xyXG4gICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oJ1RyYWNrIGFscmVhZHkgZXhpc3RzLicsXHJcbiAgICAgICAgICAgICdJbnZhbGlkQWNjZXNzRXJyb3InKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcGMuX3N0cmVhbXMgPSBwYy5fc3RyZWFtcyB8fCB7fTtcclxuICAgICAgcGMuX3JldmVyc2VTdHJlYW1zID0gcGMuX3JldmVyc2VTdHJlYW1zIHx8IHt9O1xyXG4gICAgICB2YXIgb2xkU3RyZWFtID0gcGMuX3N0cmVhbXNbc3RyZWFtLmlkXTtcclxuICAgICAgaWYgKG9sZFN0cmVhbSkge1xyXG4gICAgICAgIC8vIHRoaXMgaXMgdXNpbmcgb2RkIENocm9tZSBiZWhhdmlvdXIsIHVzZSB3aXRoIGNhdXRpb246XHJcbiAgICAgICAgLy8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3dlYnJ0Yy9pc3N1ZXMvZGV0YWlsP2lkPTc4MTVcclxuICAgICAgICAvLyBOb3RlOiB3ZSByZWx5IG9uIHRoZSBoaWdoLWxldmVsIGFkZFRyYWNrL2R0bWYgc2hpbSB0b1xyXG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgc2VuZGVyIHdpdGggYSBkdG1mIHNlbmRlci5cclxuICAgICAgICBvbGRTdHJlYW0uYWRkVHJhY2sodHJhY2spO1xyXG5cclxuICAgICAgICAvLyBUcmlnZ2VyIE9OTiBhc3luYy5cclxuICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcGMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ25lZ290aWF0aW9ubmVlZGVkJykpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciBuZXdTdHJlYW0gPSBuZXcgd2luZG93Lk1lZGlhU3RyZWFtKFt0cmFja10pO1xyXG4gICAgICAgIHBjLl9zdHJlYW1zW3N0cmVhbS5pZF0gPSBuZXdTdHJlYW07XHJcbiAgICAgICAgcGMuX3JldmVyc2VTdHJlYW1zW25ld1N0cmVhbS5pZF0gPSBzdHJlYW07XHJcbiAgICAgICAgcGMuYWRkU3RyZWFtKG5ld1N0cmVhbSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHBjLmdldFNlbmRlcnMoKS5maW5kKGZ1bmN0aW9uKHMpIHtcclxuICAgICAgICByZXR1cm4gcy50cmFjayA9PT0gdHJhY2s7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyByZXBsYWNlIHRoZSBpbnRlcm5hbCBzdHJlYW0gaWQgd2l0aCB0aGUgZXh0ZXJuYWwgb25lIGFuZFxyXG4gICAgLy8gdmljZSB2ZXJzYS5cclxuICAgIGZ1bmN0aW9uIHJlcGxhY2VJbnRlcm5hbFN0cmVhbUlkKHBjLCBkZXNjcmlwdGlvbikge1xyXG4gICAgICB2YXIgc2RwID0gZGVzY3JpcHRpb24uc2RwO1xyXG4gICAgICBPYmplY3Qua2V5cyhwYy5fcmV2ZXJzZVN0cmVhbXMgfHwgW10pLmZvckVhY2goZnVuY3Rpb24oaW50ZXJuYWxJZCkge1xyXG4gICAgICAgIHZhciBleHRlcm5hbFN0cmVhbSA9IHBjLl9yZXZlcnNlU3RyZWFtc1tpbnRlcm5hbElkXTtcclxuICAgICAgICB2YXIgaW50ZXJuYWxTdHJlYW0gPSBwYy5fc3RyZWFtc1tleHRlcm5hbFN0cmVhbS5pZF07XHJcbiAgICAgICAgc2RwID0gc2RwLnJlcGxhY2UobmV3IFJlZ0V4cChpbnRlcm5hbFN0cmVhbS5pZCwgJ2cnKSxcclxuICAgICAgICAgICAgZXh0ZXJuYWxTdHJlYW0uaWQpO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIG5ldyBSVENTZXNzaW9uRGVzY3JpcHRpb24oe1xyXG4gICAgICAgIHR5cGU6IGRlc2NyaXB0aW9uLnR5cGUsXHJcbiAgICAgICAgc2RwOiBzZHBcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiByZXBsYWNlRXh0ZXJuYWxTdHJlYW1JZChwYywgZGVzY3JpcHRpb24pIHtcclxuICAgICAgdmFyIHNkcCA9IGRlc2NyaXB0aW9uLnNkcDtcclxuICAgICAgT2JqZWN0LmtleXMocGMuX3JldmVyc2VTdHJlYW1zIHx8IFtdKS5mb3JFYWNoKGZ1bmN0aW9uKGludGVybmFsSWQpIHtcclxuICAgICAgICB2YXIgZXh0ZXJuYWxTdHJlYW0gPSBwYy5fcmV2ZXJzZVN0cmVhbXNbaW50ZXJuYWxJZF07XHJcbiAgICAgICAgdmFyIGludGVybmFsU3RyZWFtID0gcGMuX3N0cmVhbXNbZXh0ZXJuYWxTdHJlYW0uaWRdO1xyXG4gICAgICAgIHNkcCA9IHNkcC5yZXBsYWNlKG5ldyBSZWdFeHAoZXh0ZXJuYWxTdHJlYW0uaWQsICdnJyksXHJcbiAgICAgICAgICAgIGludGVybmFsU3RyZWFtLmlkKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBuZXcgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKHtcclxuICAgICAgICB0eXBlOiBkZXNjcmlwdGlvbi50eXBlLFxyXG4gICAgICAgIHNkcDogc2RwXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgWydjcmVhdGVPZmZlcicsICdjcmVhdGVBbnN3ZXInXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xyXG4gICAgICB2YXIgbmF0aXZlTWV0aG9kID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdO1xyXG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xyXG4gICAgICAgIHZhciBpc0xlZ2FjeUNhbGwgPSBhcmd1bWVudHMubGVuZ3RoICYmXHJcbiAgICAgICAgICAgIHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdmdW5jdGlvbic7XHJcbiAgICAgICAgaWYgKGlzTGVnYWN5Q2FsbCkge1xyXG4gICAgICAgICAgcmV0dXJuIG5hdGl2ZU1ldGhvZC5hcHBseShwYywgW1xyXG4gICAgICAgICAgICBmdW5jdGlvbihkZXNjcmlwdGlvbikge1xyXG4gICAgICAgICAgICAgIHZhciBkZXNjID0gcmVwbGFjZUludGVybmFsU3RyZWFtSWQocGMsIGRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgICBhcmdzWzBdLmFwcGx5KG51bGwsIFtkZXNjXSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgIGlmIChhcmdzWzFdKSB7XHJcbiAgICAgICAgICAgICAgICBhcmdzWzFdLmFwcGx5KG51bGwsIGVycik7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBhcmd1bWVudHNbMl1cclxuICAgICAgICAgIF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmF0aXZlTWV0aG9kLmFwcGx5KHBjLCBhcmd1bWVudHMpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oZGVzY3JpcHRpb24pIHtcclxuICAgICAgICAgIHJldHVybiByZXBsYWNlSW50ZXJuYWxTdHJlYW1JZChwYywgZGVzY3JpcHRpb24pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIG9yaWdTZXRMb2NhbERlc2NyaXB0aW9uID1cclxuICAgICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnNldExvY2FsRGVzY3JpcHRpb247XHJcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnNldExvY2FsRGVzY3JpcHRpb24gPSBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoIHx8ICFhcmd1bWVudHNbMF0udHlwZSkge1xyXG4gICAgICAgIHJldHVybiBvcmlnU2V0TG9jYWxEZXNjcmlwdGlvbi5hcHBseShwYywgYXJndW1lbnRzKTtcclxuICAgICAgfVxyXG4gICAgICBhcmd1bWVudHNbMF0gPSByZXBsYWNlRXh0ZXJuYWxTdHJlYW1JZChwYywgYXJndW1lbnRzWzBdKTtcclxuICAgICAgcmV0dXJuIG9yaWdTZXRMb2NhbERlc2NyaXB0aW9uLmFwcGx5KHBjLCBhcmd1bWVudHMpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBUT0RPOiBtYW5nbGUgZ2V0U3RhdHM6IGh0dHBzOi8vdzNjLmdpdGh1Yi5pby93ZWJydGMtc3RhdHMvI2RvbS1ydGNtZWRpYXN0cmVhbXN0YXRzLXN0cmVhbWlkZW50aWZpZXJcclxuXHJcbiAgICB2YXIgb3JpZ0xvY2FsRGVzY3JpcHRpb24gPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKFxyXG4gICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUsICdsb2NhbERlc2NyaXB0aW9uJyk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSxcclxuICAgICAgICAnbG9jYWxEZXNjcmlwdGlvbicsIHtcclxuICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgICAgICAgIHZhciBkZXNjcmlwdGlvbiA9IG9yaWdMb2NhbERlc2NyaXB0aW9uLmdldC5hcHBseSh0aGlzKTtcclxuICAgICAgICAgICAgaWYgKGRlc2NyaXB0aW9uLnR5cGUgPT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXBsYWNlSW50ZXJuYWxTdHJlYW1JZChwYywgZGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUucmVtb3ZlVHJhY2sgPSBmdW5jdGlvbihzZW5kZXIpIHtcclxuICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgaWYgKHBjLnNpZ25hbGluZ1N0YXRlID09PSAnY2xvc2VkJykge1xyXG4gICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oXHJcbiAgICAgICAgICAnVGhlIFJUQ1BlZXJDb25uZWN0aW9uXFwncyBzaWduYWxpbmdTdGF0ZSBpcyBcXCdjbG9zZWRcXCcuJyxcclxuICAgICAgICAgICdJbnZhbGlkU3RhdGVFcnJvcicpO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIFdlIGNhbiBub3QgeWV0IGNoZWNrIGZvciBzZW5kZXIgaW5zdGFuY2VvZiBSVENSdHBTZW5kZXJcclxuICAgICAgLy8gc2luY2Ugd2Ugc2hpbSBSVFBTZW5kZXIuIFNvIHdlIGNoZWNrIGlmIHNlbmRlci5fcGMgaXMgc2V0LlxyXG4gICAgICBpZiAoIXNlbmRlci5fcGMpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRE9NRXhjZXB0aW9uKCdBcmd1bWVudCAxIG9mIFJUQ1BlZXJDb25uZWN0aW9uLnJlbW92ZVRyYWNrICcgK1xyXG4gICAgICAgICAgICAnZG9lcyBub3QgaW1wbGVtZW50IGludGVyZmFjZSBSVENSdHBTZW5kZXIuJywgJ1R5cGVFcnJvcicpO1xyXG4gICAgICB9XHJcbiAgICAgIHZhciBpc0xvY2FsID0gc2VuZGVyLl9wYyA9PT0gcGM7XHJcbiAgICAgIGlmICghaXNMb2NhbCkge1xyXG4gICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oJ1NlbmRlciB3YXMgbm90IGNyZWF0ZWQgYnkgdGhpcyBjb25uZWN0aW9uLicsXHJcbiAgICAgICAgICAgICdJbnZhbGlkQWNjZXNzRXJyb3InKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gU2VhcmNoIGZvciB0aGUgbmF0aXZlIHN0cmVhbSB0aGUgc2VuZGVycyB0cmFjayBiZWxvbmdzIHRvLlxyXG4gICAgICBwYy5fc3RyZWFtcyA9IHBjLl9zdHJlYW1zIHx8IHt9O1xyXG4gICAgICB2YXIgc3RyZWFtO1xyXG4gICAgICBPYmplY3Qua2V5cyhwYy5fc3RyZWFtcykuZm9yRWFjaChmdW5jdGlvbihzdHJlYW1pZCkge1xyXG4gICAgICAgIHZhciBoYXNUcmFjayA9IHBjLl9zdHJlYW1zW3N0cmVhbWlkXS5nZXRUcmFja3MoKS5maW5kKGZ1bmN0aW9uKHRyYWNrKSB7XHJcbiAgICAgICAgICByZXR1cm4gc2VuZGVyLnRyYWNrID09PSB0cmFjaztcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoaGFzVHJhY2spIHtcclxuICAgICAgICAgIHN0cmVhbSA9IHBjLl9zdHJlYW1zW3N0cmVhbWlkXTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKHN0cmVhbSkge1xyXG4gICAgICAgIGlmIChzdHJlYW0uZ2V0VHJhY2tzKCkubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAvLyBpZiB0aGlzIGlzIHRoZSBsYXN0IHRyYWNrIG9mIHRoZSBzdHJlYW0sIHJlbW92ZSB0aGUgc3RyZWFtLiBUaGlzXHJcbiAgICAgICAgICAvLyB0YWtlcyBjYXJlIG9mIGFueSBzaGltbWVkIF9zZW5kZXJzLlxyXG4gICAgICAgICAgcGMucmVtb3ZlU3RyZWFtKHBjLl9yZXZlcnNlU3RyZWFtc1tzdHJlYW0uaWRdKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gcmVseWluZyBvbiB0aGUgc2FtZSBvZGQgY2hyb21lIGJlaGF2aW91ciBhcyBhYm92ZS5cclxuICAgICAgICAgIHN0cmVhbS5yZW1vdmVUcmFjayhzZW5kZXIudHJhY2spO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwYy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnbmVnb3RpYXRpb25uZWVkZWQnKSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfSxcclxuXHJcbiAgc2hpbVBlZXJDb25uZWN0aW9uOiBmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIHZhciBicm93c2VyRGV0YWlscyA9IHV0aWxzLmRldGVjdEJyb3dzZXIod2luZG93KTtcclxuXHJcbiAgICAvLyBUaGUgUlRDUGVlckNvbm5lY3Rpb24gb2JqZWN0LlxyXG4gICAgaWYgKCF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gJiYgd2luZG93LndlYmtpdFJUQ1BlZXJDb25uZWN0aW9uKSB7XHJcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiA9IGZ1bmN0aW9uKHBjQ29uZmlnLCBwY0NvbnN0cmFpbnRzKSB7XHJcbiAgICAgICAgLy8gVHJhbnNsYXRlIGljZVRyYW5zcG9ydFBvbGljeSB0byBpY2VUcmFuc3BvcnRzLFxyXG4gICAgICAgIC8vIHNlZSBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3dlYnJ0Yy9pc3N1ZXMvZGV0YWlsP2lkPTQ4NjlcclxuICAgICAgICAvLyB0aGlzIHdhcyBmaXhlZCBpbiBNNTYgYWxvbmcgd2l0aCB1bnByZWZpeGluZyBSVENQZWVyQ29ubmVjdGlvbi5cclxuICAgICAgICBsb2dnaW5nKCdQZWVyQ29ubmVjdGlvbicpO1xyXG4gICAgICAgIGlmIChwY0NvbmZpZyAmJiBwY0NvbmZpZy5pY2VUcmFuc3BvcnRQb2xpY3kpIHtcclxuICAgICAgICAgIHBjQ29uZmlnLmljZVRyYW5zcG9ydHMgPSBwY0NvbmZpZy5pY2VUcmFuc3BvcnRQb2xpY3k7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IHdpbmRvdy53ZWJraXRSVENQZWVyQ29ubmVjdGlvbihwY0NvbmZpZywgcGNDb25zdHJhaW50cyk7XHJcbiAgICAgIH07XHJcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUgPVxyXG4gICAgICAgICAgd2luZG93LndlYmtpdFJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZTtcclxuICAgICAgLy8gd3JhcCBzdGF0aWMgbWV0aG9kcy4gQ3VycmVudGx5IGp1c3QgZ2VuZXJhdGVDZXJ0aWZpY2F0ZS5cclxuICAgICAgaWYgKHdpbmRvdy53ZWJraXRSVENQZWVyQ29ubmVjdGlvbi5nZW5lcmF0ZUNlcnRpZmljYXRlKSB7XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiwgJ2dlbmVyYXRlQ2VydGlmaWNhdGUnLCB7XHJcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gd2luZG93LndlYmtpdFJUQ1BlZXJDb25uZWN0aW9uLmdlbmVyYXRlQ2VydGlmaWNhdGU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIG1pZ3JhdGUgZnJvbSBub24tc3BlYyBSVENJY2VTZXJ2ZXIudXJsIHRvIFJUQ0ljZVNlcnZlci51cmxzXHJcbiAgICAgIHZhciBPcmlnUGVlckNvbm5lY3Rpb24gPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb247XHJcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiA9IGZ1bmN0aW9uKHBjQ29uZmlnLCBwY0NvbnN0cmFpbnRzKSB7XHJcbiAgICAgICAgaWYgKHBjQ29uZmlnICYmIHBjQ29uZmlnLmljZVNlcnZlcnMpIHtcclxuICAgICAgICAgIHZhciBuZXdJY2VTZXJ2ZXJzID0gW107XHJcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBjQ29uZmlnLmljZVNlcnZlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHNlcnZlciA9IHBjQ29uZmlnLmljZVNlcnZlcnNbaV07XHJcbiAgICAgICAgICAgIGlmICghc2VydmVyLmhhc093blByb3BlcnR5KCd1cmxzJykgJiZcclxuICAgICAgICAgICAgICAgIHNlcnZlci5oYXNPd25Qcm9wZXJ0eSgndXJsJykpIHtcclxuICAgICAgICAgICAgICB1dGlscy5kZXByZWNhdGVkKCdSVENJY2VTZXJ2ZXIudXJsJywgJ1JUQ0ljZVNlcnZlci51cmxzJyk7XHJcbiAgICAgICAgICAgICAgc2VydmVyID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShzZXJ2ZXIpKTtcclxuICAgICAgICAgICAgICBzZXJ2ZXIudXJscyA9IHNlcnZlci51cmw7XHJcbiAgICAgICAgICAgICAgbmV3SWNlU2VydmVycy5wdXNoKHNlcnZlcik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgbmV3SWNlU2VydmVycy5wdXNoKHBjQ29uZmlnLmljZVNlcnZlcnNbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBwY0NvbmZpZy5pY2VTZXJ2ZXJzID0gbmV3SWNlU2VydmVycztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBPcmlnUGVlckNvbm5lY3Rpb24ocGNDb25maWcsIHBjQ29uc3RyYWludHMpO1xyXG4gICAgICB9O1xyXG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlID0gT3JpZ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZTtcclxuICAgICAgLy8gd3JhcCBzdGF0aWMgbWV0aG9kcy4gQ3VycmVudGx5IGp1c3QgZ2VuZXJhdGVDZXJ0aWZpY2F0ZS5cclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiwgJ2dlbmVyYXRlQ2VydGlmaWNhdGUnLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHJldHVybiBPcmlnUGVlckNvbm5lY3Rpb24uZ2VuZXJhdGVDZXJ0aWZpY2F0ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBvcmlnR2V0U3RhdHMgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFN0YXRzO1xyXG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRTdGF0cyA9IGZ1bmN0aW9uKHNlbGVjdG9yLFxyXG4gICAgICAgIHN1Y2Nlc3NDYWxsYmFjaywgZXJyb3JDYWxsYmFjaykge1xyXG4gICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcclxuXHJcbiAgICAgIC8vIElmIHNlbGVjdG9yIGlzIGEgZnVuY3Rpb24gdGhlbiB3ZSBhcmUgaW4gdGhlIG9sZCBzdHlsZSBzdGF0cyBzbyBqdXN0XHJcbiAgICAgIC8vIHBhc3MgYmFjayB0aGUgb3JpZ2luYWwgZ2V0U3RhdHMgZm9ybWF0IHRvIGF2b2lkIGJyZWFraW5nIG9sZCB1c2Vycy5cclxuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIHR5cGVvZiBzZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIHJldHVybiBvcmlnR2V0U3RhdHMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gV2hlbiBzcGVjLXN0eWxlIGdldFN0YXRzIGlzIHN1cHBvcnRlZCwgcmV0dXJuIHRob3NlIHdoZW4gY2FsbGVkIHdpdGhcclxuICAgICAgLy8gZWl0aGVyIG5vIGFyZ3VtZW50cyBvciB0aGUgc2VsZWN0b3IgYXJndW1lbnQgaXMgbnVsbC5cclxuICAgICAgaWYgKG9yaWdHZXRTdGF0cy5sZW5ndGggPT09IDAgJiYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDAgfHxcclxuICAgICAgICAgIHR5cGVvZiBhcmd1bWVudHNbMF0gIT09ICdmdW5jdGlvbicpKSB7XHJcbiAgICAgICAgcmV0dXJuIG9yaWdHZXRTdGF0cy5hcHBseSh0aGlzLCBbXSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBmaXhDaHJvbWVTdGF0c18gPSBmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgIHZhciBzdGFuZGFyZFJlcG9ydCA9IHt9O1xyXG4gICAgICAgIHZhciByZXBvcnRzID0gcmVzcG9uc2UucmVzdWx0KCk7XHJcbiAgICAgICAgcmVwb3J0cy5mb3JFYWNoKGZ1bmN0aW9uKHJlcG9ydCkge1xyXG4gICAgICAgICAgdmFyIHN0YW5kYXJkU3RhdHMgPSB7XHJcbiAgICAgICAgICAgIGlkOiByZXBvcnQuaWQsXHJcbiAgICAgICAgICAgIHRpbWVzdGFtcDogcmVwb3J0LnRpbWVzdGFtcCxcclxuICAgICAgICAgICAgdHlwZToge1xyXG4gICAgICAgICAgICAgIGxvY2FsY2FuZGlkYXRlOiAnbG9jYWwtY2FuZGlkYXRlJyxcclxuICAgICAgICAgICAgICByZW1vdGVjYW5kaWRhdGU6ICdyZW1vdGUtY2FuZGlkYXRlJ1xyXG4gICAgICAgICAgICB9W3JlcG9ydC50eXBlXSB8fCByZXBvcnQudHlwZVxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIHJlcG9ydC5uYW1lcygpLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgICAgICBzdGFuZGFyZFN0YXRzW25hbWVdID0gcmVwb3J0LnN0YXQobmFtZSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHN0YW5kYXJkUmVwb3J0W3N0YW5kYXJkU3RhdHMuaWRdID0gc3RhbmRhcmRTdGF0cztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHN0YW5kYXJkUmVwb3J0O1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gc2hpbSBnZXRTdGF0cyB3aXRoIG1hcGxpa2Ugc3VwcG9ydFxyXG4gICAgICB2YXIgbWFrZU1hcFN0YXRzID0gZnVuY3Rpb24oc3RhdHMpIHtcclxuICAgICAgICByZXR1cm4gbmV3IE1hcChPYmplY3Qua2V5cyhzdGF0cykubWFwKGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgICAgcmV0dXJuIFtrZXksIHN0YXRzW2tleV1dO1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID49IDIpIHtcclxuICAgICAgICB2YXIgc3VjY2Vzc0NhbGxiYWNrV3JhcHBlcl8gPSBmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgYXJnc1sxXShtYWtlTWFwU3RhdHMoZml4Q2hyb21lU3RhdHNfKHJlc3BvbnNlKSkpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBvcmlnR2V0U3RhdHMuYXBwbHkodGhpcywgW3N1Y2Nlc3NDYWxsYmFja1dyYXBwZXJfLFxyXG4gICAgICAgICAgYXJndW1lbnRzWzBdXSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHByb21pc2Utc3VwcG9ydFxyXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgb3JpZ0dldFN0YXRzLmFwcGx5KHBjLCBbXHJcbiAgICAgICAgICBmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgICByZXNvbHZlKG1ha2VNYXBTdGF0cyhmaXhDaHJvbWVTdGF0c18ocmVzcG9uc2UpKSk7XHJcbiAgICAgICAgICB9LCByZWplY3RdKTtcclxuICAgICAgfSkudGhlbihzdWNjZXNzQ2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBhZGQgcHJvbWlzZSBzdXBwb3J0IC0tIG5hdGl2ZWx5IGF2YWlsYWJsZSBpbiBDaHJvbWUgNTFcclxuICAgIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgNTEpIHtcclxuICAgICAgWydzZXRMb2NhbERlc2NyaXB0aW9uJywgJ3NldFJlbW90ZURlc2NyaXB0aW9uJywgJ2FkZEljZUNhbmRpZGF0ZSddXHJcbiAgICAgICAgICAuZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcclxuICAgICAgICAgICAgdmFyIG5hdGl2ZU1ldGhvZCA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXTtcclxuICAgICAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XHJcbiAgICAgICAgICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgICAgICAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICAgICAgbmF0aXZlTWV0aG9kLmFwcGx5KHBjLCBbYXJnc1swXSwgcmVzb2x2ZSwgcmVqZWN0XSk7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoIDwgMikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHJldHVybiBwcm9taXNlLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBhcmdzWzFdLmFwcGx5KG51bGwsIFtdKTtcclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID49IDMpIHtcclxuICAgICAgICAgICAgICAgICAgYXJnc1syXS5hcHBseShudWxsLCBbZXJyXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBwcm9taXNlIHN1cHBvcnQgZm9yIGNyZWF0ZU9mZmVyIGFuZCBjcmVhdGVBbnN3ZXIuIEF2YWlsYWJsZSAod2l0aG91dFxyXG4gICAgLy8gYnVncykgc2luY2UgTTUyOiBjcmJ1Zy82MTkyODlcclxuICAgIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgNTIpIHtcclxuICAgICAgWydjcmVhdGVPZmZlcicsICdjcmVhdGVBbnN3ZXInXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xyXG4gICAgICAgIHZhciBuYXRpdmVNZXRob2QgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlW21ldGhvZF07XHJcbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAxIHx8IChhcmd1bWVudHMubGVuZ3RoID09PSAxICYmXHJcbiAgICAgICAgICAgICAgdHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ29iamVjdCcpKSB7XHJcbiAgICAgICAgICAgIHZhciBvcHRzID0gYXJndW1lbnRzLmxlbmd0aCA9PT0gMSA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICAgIG5hdGl2ZU1ldGhvZC5hcHBseShwYywgW3Jlc29sdmUsIHJlamVjdCwgb3B0c10pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICB9O1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzaGltIGltcGxpY2l0IGNyZWF0aW9uIG9mIFJUQ1Nlc3Npb25EZXNjcmlwdGlvbi9SVENJY2VDYW5kaWRhdGVcclxuICAgIFsnc2V0TG9jYWxEZXNjcmlwdGlvbicsICdzZXRSZW1vdGVEZXNjcmlwdGlvbicsICdhZGRJY2VDYW5kaWRhdGUnXVxyXG4gICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xyXG4gICAgICAgICAgdmFyIG5hdGl2ZU1ldGhvZCA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXTtcclxuICAgICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBhcmd1bWVudHNbMF0gPSBuZXcgKChtZXRob2QgPT09ICdhZGRJY2VDYW5kaWRhdGUnKSA/XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlIDpcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5SVENTZXNzaW9uRGVzY3JpcHRpb24pKGFyZ3VtZW50c1swXSk7XHJcbiAgICAgICAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgLy8gc3VwcG9ydCBmb3IgYWRkSWNlQ2FuZGlkYXRlKG51bGwgb3IgdW5kZWZpbmVkKVxyXG4gICAgdmFyIG5hdGl2ZUFkZEljZUNhbmRpZGF0ZSA9XHJcbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRJY2VDYW5kaWRhdGU7XHJcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZEljZUNhbmRpZGF0ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBpZiAoIWFyZ3VtZW50c1swXSkge1xyXG4gICAgICAgIGlmIChhcmd1bWVudHNbMV0pIHtcclxuICAgICAgICAgIGFyZ3VtZW50c1sxXS5hcHBseShudWxsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBuYXRpdmVBZGRJY2VDYW5kaWRhdGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIH07XHJcbiAgfVxyXG59O1xyXG5cclxufSx7XCIuLi91dGlscy5qc1wiOjEzLFwiLi9nZXR1c2VybWVkaWFcIjo2fV0sNjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcbi8qXHJcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXHJcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcclxuICogIHRyZWUuXHJcbiAqL1xyXG4gLyogZXNsaW50LWVudiBub2RlICovXHJcbid1c2Ugc3RyaWN0JztcclxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMuanMnKTtcclxudmFyIGxvZ2dpbmcgPSB1dGlscy5sb2c7XHJcblxyXG4vLyBFeHBvc2UgcHVibGljIG1ldGhvZHMuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24od2luZG93KSB7XHJcbiAgdmFyIGJyb3dzZXJEZXRhaWxzID0gdXRpbHMuZGV0ZWN0QnJvd3Nlcih3aW5kb3cpO1xyXG4gIHZhciBuYXZpZ2F0b3IgPSB3aW5kb3cgJiYgd2luZG93Lm5hdmlnYXRvcjtcclxuXHJcbiAgdmFyIGNvbnN0cmFpbnRzVG9DaHJvbWVfID0gZnVuY3Rpb24oYykge1xyXG4gICAgaWYgKHR5cGVvZiBjICE9PSAnb2JqZWN0JyB8fCBjLm1hbmRhdG9yeSB8fCBjLm9wdGlvbmFsKSB7XHJcbiAgICAgIHJldHVybiBjO1xyXG4gICAgfVxyXG4gICAgdmFyIGNjID0ge307XHJcbiAgICBPYmplY3Qua2V5cyhjKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICBpZiAoa2V5ID09PSAncmVxdWlyZScgfHwga2V5ID09PSAnYWR2YW5jZWQnIHx8IGtleSA9PT0gJ21lZGlhU291cmNlJykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICB2YXIgciA9ICh0eXBlb2YgY1trZXldID09PSAnb2JqZWN0JykgPyBjW2tleV0gOiB7aWRlYWw6IGNba2V5XX07XHJcbiAgICAgIGlmIChyLmV4YWN0ICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIHIuZXhhY3QgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgci5taW4gPSByLm1heCA9IHIuZXhhY3Q7XHJcbiAgICAgIH1cclxuICAgICAgdmFyIG9sZG5hbWVfID0gZnVuY3Rpb24ocHJlZml4LCBuYW1lKSB7XHJcbiAgICAgICAgaWYgKHByZWZpeCkge1xyXG4gICAgICAgICAgcmV0dXJuIHByZWZpeCArIG5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBuYW1lLnNsaWNlKDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKG5hbWUgPT09ICdkZXZpY2VJZCcpID8gJ3NvdXJjZUlkJyA6IG5hbWU7XHJcbiAgICAgIH07XHJcbiAgICAgIGlmIChyLmlkZWFsICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBjYy5vcHRpb25hbCA9IGNjLm9wdGlvbmFsIHx8IFtdO1xyXG4gICAgICAgIHZhciBvYyA9IHt9O1xyXG4gICAgICAgIGlmICh0eXBlb2Ygci5pZGVhbCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgIG9jW29sZG5hbWVfKCdtaW4nLCBrZXkpXSA9IHIuaWRlYWw7XHJcbiAgICAgICAgICBjYy5vcHRpb25hbC5wdXNoKG9jKTtcclxuICAgICAgICAgIG9jID0ge307XHJcbiAgICAgICAgICBvY1tvbGRuYW1lXygnbWF4Jywga2V5KV0gPSByLmlkZWFsO1xyXG4gICAgICAgICAgY2Mub3B0aW9uYWwucHVzaChvYyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG9jW29sZG5hbWVfKCcnLCBrZXkpXSA9IHIuaWRlYWw7XHJcbiAgICAgICAgICBjYy5vcHRpb25hbC5wdXNoKG9jKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHIuZXhhY3QgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygci5leGFjdCAhPT0gJ251bWJlcicpIHtcclxuICAgICAgICBjYy5tYW5kYXRvcnkgPSBjYy5tYW5kYXRvcnkgfHwge307XHJcbiAgICAgICAgY2MubWFuZGF0b3J5W29sZG5hbWVfKCcnLCBrZXkpXSA9IHIuZXhhY3Q7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgWydtaW4nLCAnbWF4J10uZm9yRWFjaChmdW5jdGlvbihtaXgpIHtcclxuICAgICAgICAgIGlmIChyW21peF0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBjYy5tYW5kYXRvcnkgPSBjYy5tYW5kYXRvcnkgfHwge307XHJcbiAgICAgICAgICAgIGNjLm1hbmRhdG9yeVtvbGRuYW1lXyhtaXgsIGtleSldID0gclttaXhdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGlmIChjLmFkdmFuY2VkKSB7XHJcbiAgICAgIGNjLm9wdGlvbmFsID0gKGNjLm9wdGlvbmFsIHx8IFtdKS5jb25jYXQoYy5hZHZhbmNlZCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY2M7XHJcbiAgfTtcclxuXHJcbiAgdmFyIHNoaW1Db25zdHJhaW50c18gPSBmdW5jdGlvbihjb25zdHJhaW50cywgZnVuYykge1xyXG4gICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPj0gNjEpIHtcclxuICAgICAgcmV0dXJuIGZ1bmMoY29uc3RyYWludHMpO1xyXG4gICAgfVxyXG4gICAgY29uc3RyYWludHMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGNvbnN0cmFpbnRzKSk7XHJcbiAgICBpZiAoY29uc3RyYWludHMgJiYgdHlwZW9mIGNvbnN0cmFpbnRzLmF1ZGlvID09PSAnb2JqZWN0Jykge1xyXG4gICAgICB2YXIgcmVtYXAgPSBmdW5jdGlvbihvYmosIGEsIGIpIHtcclxuICAgICAgICBpZiAoYSBpbiBvYmogJiYgIShiIGluIG9iaikpIHtcclxuICAgICAgICAgIG9ialtiXSA9IG9ialthXTtcclxuICAgICAgICAgIGRlbGV0ZSBvYmpbYV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgICBjb25zdHJhaW50cyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoY29uc3RyYWludHMpKTtcclxuICAgICAgcmVtYXAoY29uc3RyYWludHMuYXVkaW8sICdhdXRvR2FpbkNvbnRyb2wnLCAnZ29vZ0F1dG9HYWluQ29udHJvbCcpO1xyXG4gICAgICByZW1hcChjb25zdHJhaW50cy5hdWRpbywgJ25vaXNlU3VwcHJlc3Npb24nLCAnZ29vZ05vaXNlU3VwcHJlc3Npb24nKTtcclxuICAgICAgY29uc3RyYWludHMuYXVkaW8gPSBjb25zdHJhaW50c1RvQ2hyb21lXyhjb25zdHJhaW50cy5hdWRpbyk7XHJcbiAgICB9XHJcbiAgICBpZiAoY29uc3RyYWludHMgJiYgdHlwZW9mIGNvbnN0cmFpbnRzLnZpZGVvID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAvLyBTaGltIGZhY2luZ01vZGUgZm9yIG1vYmlsZSAmIHN1cmZhY2UgcHJvLlxyXG4gICAgICB2YXIgZmFjZSA9IGNvbnN0cmFpbnRzLnZpZGVvLmZhY2luZ01vZGU7XHJcbiAgICAgIGZhY2UgPSBmYWNlICYmICgodHlwZW9mIGZhY2UgPT09ICdvYmplY3QnKSA/IGZhY2UgOiB7aWRlYWw6IGZhY2V9KTtcclxuICAgICAgdmFyIGdldFN1cHBvcnRlZEZhY2luZ01vZGVMaWVzID0gYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDY2O1xyXG5cclxuICAgICAgaWYgKChmYWNlICYmIChmYWNlLmV4YWN0ID09PSAndXNlcicgfHwgZmFjZS5leGFjdCA9PT0gJ2Vudmlyb25tZW50JyB8fFxyXG4gICAgICAgICAgICAgICAgICAgIGZhY2UuaWRlYWwgPT09ICd1c2VyJyB8fCBmYWNlLmlkZWFsID09PSAnZW52aXJvbm1lbnQnKSkgJiZcclxuICAgICAgICAgICEobmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRTdXBwb3J0ZWRDb25zdHJhaW50cyAmJlxyXG4gICAgICAgICAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFN1cHBvcnRlZENvbnN0cmFpbnRzKCkuZmFjaW5nTW9kZSAmJlxyXG4gICAgICAgICAgICAhZ2V0U3VwcG9ydGVkRmFjaW5nTW9kZUxpZXMpKSB7XHJcbiAgICAgICAgZGVsZXRlIGNvbnN0cmFpbnRzLnZpZGVvLmZhY2luZ01vZGU7XHJcbiAgICAgICAgdmFyIG1hdGNoZXM7XHJcbiAgICAgICAgaWYgKGZhY2UuZXhhY3QgPT09ICdlbnZpcm9ubWVudCcgfHwgZmFjZS5pZGVhbCA9PT0gJ2Vudmlyb25tZW50Jykge1xyXG4gICAgICAgICAgbWF0Y2hlcyA9IFsnYmFjaycsICdyZWFyJ107XHJcbiAgICAgICAgfSBlbHNlIGlmIChmYWNlLmV4YWN0ID09PSAndXNlcicgfHwgZmFjZS5pZGVhbCA9PT0gJ3VzZXInKSB7XHJcbiAgICAgICAgICBtYXRjaGVzID0gWydmcm9udCddO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobWF0Y2hlcykge1xyXG4gICAgICAgICAgLy8gTG9vayBmb3IgbWF0Y2hlcyBpbiBsYWJlbCwgb3IgdXNlIGxhc3QgY2FtIGZvciBiYWNrICh0eXBpY2FsKS5cclxuICAgICAgICAgIHJldHVybiBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmVudW1lcmF0ZURldmljZXMoKVxyXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24oZGV2aWNlcykge1xyXG4gICAgICAgICAgICBkZXZpY2VzID0gZGV2aWNlcy5maWx0ZXIoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgIHJldHVybiBkLmtpbmQgPT09ICd2aWRlb2lucHV0JztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHZhciBkZXYgPSBkZXZpY2VzLmZpbmQoZnVuY3Rpb24oZCkge1xyXG4gICAgICAgICAgICAgIHJldHVybiBtYXRjaGVzLnNvbWUoZnVuY3Rpb24obWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkLmxhYmVsLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihtYXRjaCkgIT09IC0xO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKCFkZXYgJiYgZGV2aWNlcy5sZW5ndGggJiYgbWF0Y2hlcy5pbmRleE9mKCdiYWNrJykgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgZGV2ID0gZGV2aWNlc1tkZXZpY2VzLmxlbmd0aCAtIDFdOyAvLyBtb3JlIGxpa2VseSB0aGUgYmFjayBjYW1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZGV2KSB7XHJcbiAgICAgICAgICAgICAgY29uc3RyYWludHMudmlkZW8uZGV2aWNlSWQgPSBmYWNlLmV4YWN0ID8ge2V4YWN0OiBkZXYuZGV2aWNlSWR9IDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aWRlYWw6IGRldi5kZXZpY2VJZH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3RyYWludHMudmlkZW8gPSBjb25zdHJhaW50c1RvQ2hyb21lXyhjb25zdHJhaW50cy52aWRlbyk7XHJcbiAgICAgICAgICAgIGxvZ2dpbmcoJ2Nocm9tZTogJyArIEpTT04uc3RyaW5naWZ5KGNvbnN0cmFpbnRzKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jKGNvbnN0cmFpbnRzKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBjb25zdHJhaW50cy52aWRlbyA9IGNvbnN0cmFpbnRzVG9DaHJvbWVfKGNvbnN0cmFpbnRzLnZpZGVvKTtcclxuICAgIH1cclxuICAgIGxvZ2dpbmcoJ2Nocm9tZTogJyArIEpTT04uc3RyaW5naWZ5KGNvbnN0cmFpbnRzKSk7XHJcbiAgICByZXR1cm4gZnVuYyhjb25zdHJhaW50cyk7XHJcbiAgfTtcclxuXHJcbiAgdmFyIHNoaW1FcnJvcl8gPSBmdW5jdGlvbihlKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuYW1lOiB7XHJcbiAgICAgICAgUGVybWlzc2lvbkRlbmllZEVycm9yOiAnTm90QWxsb3dlZEVycm9yJyxcclxuICAgICAgICBQZXJtaXNzaW9uRGlzbWlzc2VkRXJyb3I6ICdOb3RBbGxvd2VkRXJyb3InLFxyXG4gICAgICAgIEludmFsaWRTdGF0ZUVycm9yOiAnTm90QWxsb3dlZEVycm9yJyxcclxuICAgICAgICBEZXZpY2VzTm90Rm91bmRFcnJvcjogJ05vdEZvdW5kRXJyb3InLFxyXG4gICAgICAgIENvbnN0cmFpbnROb3RTYXRpc2ZpZWRFcnJvcjogJ092ZXJjb25zdHJhaW5lZEVycm9yJyxcclxuICAgICAgICBUcmFja1N0YXJ0RXJyb3I6ICdOb3RSZWFkYWJsZUVycm9yJyxcclxuICAgICAgICBNZWRpYURldmljZUZhaWxlZER1ZVRvU2h1dGRvd246ICdOb3RBbGxvd2VkRXJyb3InLFxyXG4gICAgICAgIE1lZGlhRGV2aWNlS2lsbFN3aXRjaE9uOiAnTm90QWxsb3dlZEVycm9yJyxcclxuICAgICAgICBUYWJDYXB0dXJlRXJyb3I6ICdBYm9ydEVycm9yJyxcclxuICAgICAgICBTY3JlZW5DYXB0dXJlRXJyb3I6ICdBYm9ydEVycm9yJyxcclxuICAgICAgICBEZXZpY2VDYXB0dXJlRXJyb3I6ICdBYm9ydEVycm9yJ1xyXG4gICAgICB9W2UubmFtZV0gfHwgZS5uYW1lLFxyXG4gICAgICBtZXNzYWdlOiBlLm1lc3NhZ2UsXHJcbiAgICAgIGNvbnN0cmFpbnQ6IGUuY29uc3RyYWludE5hbWUsXHJcbiAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5uYW1lICsgKHRoaXMubWVzc2FnZSAmJiAnOiAnKSArIHRoaXMubWVzc2FnZTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9O1xyXG5cclxuICB2YXIgZ2V0VXNlck1lZGlhXyA9IGZ1bmN0aW9uKGNvbnN0cmFpbnRzLCBvblN1Y2Nlc3MsIG9uRXJyb3IpIHtcclxuICAgIHNoaW1Db25zdHJhaW50c18oY29uc3RyYWludHMsIGZ1bmN0aW9uKGMpIHtcclxuICAgICAgbmF2aWdhdG9yLndlYmtpdEdldFVzZXJNZWRpYShjLCBvblN1Y2Nlc3MsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAob25FcnJvcikge1xyXG4gICAgICAgICAgb25FcnJvcihzaGltRXJyb3JfKGUpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgbmF2aWdhdG9yLmdldFVzZXJNZWRpYSA9IGdldFVzZXJNZWRpYV87XHJcblxyXG4gIC8vIFJldHVybnMgdGhlIHJlc3VsdCBvZiBnZXRVc2VyTWVkaWEgYXMgYSBQcm9taXNlLlxyXG4gIHZhciBnZXRVc2VyTWVkaWFQcm9taXNlXyA9IGZ1bmN0aW9uKGNvbnN0cmFpbnRzKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgIG5hdmlnYXRvci5nZXRVc2VyTWVkaWEoY29uc3RyYWludHMsIHJlc29sdmUsIHJlamVjdCk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICBpZiAoIW5hdmlnYXRvci5tZWRpYURldmljZXMpIHtcclxuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMgPSB7XHJcbiAgICAgIGdldFVzZXJNZWRpYTogZ2V0VXNlck1lZGlhUHJvbWlzZV8sXHJcbiAgICAgIGVudW1lcmF0ZURldmljZXM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XHJcbiAgICAgICAgICB2YXIga2luZHMgPSB7YXVkaW86ICdhdWRpb2lucHV0JywgdmlkZW86ICd2aWRlb2lucHV0J307XHJcbiAgICAgICAgICByZXR1cm4gd2luZG93Lk1lZGlhU3RyZWFtVHJhY2suZ2V0U291cmNlcyhmdW5jdGlvbihkZXZpY2VzKSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoZGV2aWNlcy5tYXAoZnVuY3Rpb24oZGV2aWNlKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHtsYWJlbDogZGV2aWNlLmxhYmVsLFxyXG4gICAgICAgICAgICAgICAga2luZDoga2luZHNbZGV2aWNlLmtpbmRdLFxyXG4gICAgICAgICAgICAgICAgZGV2aWNlSWQ6IGRldmljZS5pZCxcclxuICAgICAgICAgICAgICAgIGdyb3VwSWQ6ICcnfTtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIGdldFN1cHBvcnRlZENvbnN0cmFpbnRzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgZGV2aWNlSWQ6IHRydWUsIGVjaG9DYW5jZWxsYXRpb246IHRydWUsIGZhY2luZ01vZGU6IHRydWUsXHJcbiAgICAgICAgICBmcmFtZVJhdGU6IHRydWUsIGhlaWdodDogdHJ1ZSwgd2lkdGg6IHRydWVcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLy8gQSBzaGltIGZvciBnZXRVc2VyTWVkaWEgbWV0aG9kIG9uIHRoZSBtZWRpYURldmljZXMgb2JqZWN0LlxyXG4gIC8vIFRPRE8oS2FwdGVuSmFuc3NvbikgcmVtb3ZlIG9uY2UgaW1wbGVtZW50ZWQgaW4gQ2hyb21lIHN0YWJsZS5cclxuICBpZiAoIW5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKSB7XHJcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSA9IGZ1bmN0aW9uKGNvbnN0cmFpbnRzKSB7XHJcbiAgICAgIHJldHVybiBnZXRVc2VyTWVkaWFQcm9taXNlXyhjb25zdHJhaW50cyk7XHJcbiAgICB9O1xyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyBFdmVuIHRob3VnaCBDaHJvbWUgNDUgaGFzIG5hdmlnYXRvci5tZWRpYURldmljZXMgYW5kIGEgZ2V0VXNlck1lZGlhXHJcbiAgICAvLyBmdW5jdGlvbiB3aGljaCByZXR1cm5zIGEgUHJvbWlzZSwgaXQgZG9lcyBub3QgYWNjZXB0IHNwZWMtc3R5bGVcclxuICAgIC8vIGNvbnN0cmFpbnRzLlxyXG4gICAgdmFyIG9yaWdHZXRVc2VyTWVkaWEgPSBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYS5cclxuICAgICAgICBiaW5kKG5hdmlnYXRvci5tZWRpYURldmljZXMpO1xyXG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEgPSBmdW5jdGlvbihjcykge1xyXG4gICAgICByZXR1cm4gc2hpbUNvbnN0cmFpbnRzXyhjcywgZnVuY3Rpb24oYykge1xyXG4gICAgICAgIHJldHVybiBvcmlnR2V0VXNlck1lZGlhKGMpLnRoZW4oZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICAgICAgICBpZiAoYy5hdWRpbyAmJiAhc3RyZWFtLmdldEF1ZGlvVHJhY2tzKCkubGVuZ3RoIHx8XHJcbiAgICAgICAgICAgICAgYy52aWRlbyAmJiAhc3RyZWFtLmdldFZpZGVvVHJhY2tzKCkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XHJcbiAgICAgICAgICAgICAgdHJhY2suc3RvcCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbignJywgJ05vdEZvdW5kRXJyb3InKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBzdHJlYW07XHJcbiAgICAgICAgfSwgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHNoaW1FcnJvcl8oZSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvLyBEdW1teSBkZXZpY2VjaGFuZ2UgZXZlbnQgbWV0aG9kcy5cclxuICAvLyBUT0RPKEthcHRlbkphbnNzb24pIHJlbW92ZSBvbmNlIGltcGxlbWVudGVkIGluIENocm9tZSBzdGFibGUuXHJcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmFkZEV2ZW50TGlzdGVuZXIgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgbG9nZ2luZygnRHVtbXkgbWVkaWFEZXZpY2VzLmFkZEV2ZW50TGlzdGVuZXIgY2FsbGVkLicpO1xyXG4gICAgfTtcclxuICB9XHJcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLnJlbW92ZUV2ZW50TGlzdGVuZXIgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgbG9nZ2luZygnRHVtbXkgbWVkaWFEZXZpY2VzLnJlbW92ZUV2ZW50TGlzdGVuZXIgY2FsbGVkLicpO1xyXG4gICAgfTtcclxuICB9XHJcbn07XHJcblxyXG59LHtcIi4uL3V0aWxzLmpzXCI6MTN9XSw3OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuLypcclxuICogIENvcHlyaWdodCAoYykgMjAxNyBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcclxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxyXG4gKiAgdHJlZS5cclxuICovXHJcbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIFNEUFV0aWxzID0gcmVxdWlyZSgnc2RwJyk7XHJcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIHNoaW1SVENJY2VDYW5kaWRhdGU6IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgLy8gZm91bmRhdGlvbiBpcyBhcmJpdHJhcmlseSBjaG9zZW4gYXMgYW4gaW5kaWNhdG9yIGZvciBmdWxsIHN1cHBvcnQgZm9yXHJcbiAgICAvLyBodHRwczovL3czYy5naXRodWIuaW8vd2VicnRjLXBjLyNydGNpY2VjYW5kaWRhdGUtaW50ZXJmYWNlXHJcbiAgICBpZiAoIXdpbmRvdy5SVENJY2VDYW5kaWRhdGUgfHwgKHdpbmRvdy5SVENJY2VDYW5kaWRhdGUgJiYgJ2ZvdW5kYXRpb24nIGluXHJcbiAgICAgICAgd2luZG93LlJUQ0ljZUNhbmRpZGF0ZS5wcm90b3R5cGUpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgTmF0aXZlUlRDSWNlQ2FuZGlkYXRlID0gd2luZG93LlJUQ0ljZUNhbmRpZGF0ZTtcclxuICAgIHdpbmRvdy5SVENJY2VDYW5kaWRhdGUgPSBmdW5jdGlvbihhcmdzKSB7XHJcbiAgICAgIC8vIFJlbW92ZSB0aGUgYT0gd2hpY2ggc2hvdWxkbid0IGJlIHBhcnQgb2YgdGhlIGNhbmRpZGF0ZSBzdHJpbmcuXHJcbiAgICAgIGlmICh0eXBlb2YgYXJncyA9PT0gJ29iamVjdCcgJiYgYXJncy5jYW5kaWRhdGUgJiZcclxuICAgICAgICAgIGFyZ3MuY2FuZGlkYXRlLmluZGV4T2YoJ2E9JykgPT09IDApIHtcclxuICAgICAgICBhcmdzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShhcmdzKSk7XHJcbiAgICAgICAgYXJncy5jYW5kaWRhdGUgPSBhcmdzLmNhbmRpZGF0ZS5zdWJzdHIoMik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChhcmdzLmNhbmRpZGF0ZSAmJiBhcmdzLmNhbmRpZGF0ZS5sZW5ndGgpIHtcclxuICAgICAgICAvLyBBdWdtZW50IHRoZSBuYXRpdmUgY2FuZGlkYXRlIHdpdGggdGhlIHBhcnNlZCBmaWVsZHMuXHJcbiAgICAgICAgdmFyIG5hdGl2ZUNhbmRpZGF0ZSA9IG5ldyBOYXRpdmVSVENJY2VDYW5kaWRhdGUoYXJncyk7XHJcbiAgICAgICAgdmFyIHBhcnNlZENhbmRpZGF0ZSA9IFNEUFV0aWxzLnBhcnNlQ2FuZGlkYXRlKGFyZ3MuY2FuZGlkYXRlKTtcclxuICAgICAgICB2YXIgYXVnbWVudGVkQ2FuZGlkYXRlID0gT2JqZWN0LmFzc2lnbihuYXRpdmVDYW5kaWRhdGUsXHJcbiAgICAgICAgICAgIHBhcnNlZENhbmRpZGF0ZSk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBhIHNlcmlhbGl6ZXIgdGhhdCBkb2VzIG5vdCBzZXJpYWxpemUgdGhlIGV4dHJhIGF0dHJpYnV0ZXMuXHJcbiAgICAgICAgYXVnbWVudGVkQ2FuZGlkYXRlLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY2FuZGlkYXRlOiBhdWdtZW50ZWRDYW5kaWRhdGUuY2FuZGlkYXRlLFxyXG4gICAgICAgICAgICBzZHBNaWQ6IGF1Z21lbnRlZENhbmRpZGF0ZS5zZHBNaWQsXHJcbiAgICAgICAgICAgIHNkcE1MaW5lSW5kZXg6IGF1Z21lbnRlZENhbmRpZGF0ZS5zZHBNTGluZUluZGV4LFxyXG4gICAgICAgICAgICB1c2VybmFtZUZyYWdtZW50OiBhdWdtZW50ZWRDYW5kaWRhdGUudXNlcm5hbWVGcmFnbWVudCxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gYXVnbWVudGVkQ2FuZGlkYXRlO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBuZXcgTmF0aXZlUlRDSWNlQ2FuZGlkYXRlKGFyZ3MpO1xyXG4gICAgfTtcclxuICAgIHdpbmRvdy5SVENJY2VDYW5kaWRhdGUucHJvdG90eXBlID0gTmF0aXZlUlRDSWNlQ2FuZGlkYXRlLnByb3RvdHlwZTtcclxuXHJcbiAgICAvLyBIb29rIHVwIHRoZSBhdWdtZW50ZWQgY2FuZGlkYXRlIGluIG9uaWNlY2FuZGlkYXRlIGFuZFxyXG4gICAgLy8gYWRkRXZlbnRMaXN0ZW5lcignaWNlY2FuZGlkYXRlJywgLi4uKVxyXG4gICAgdXRpbHMud3JhcFBlZXJDb25uZWN0aW9uRXZlbnQod2luZG93LCAnaWNlY2FuZGlkYXRlJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICBpZiAoZS5jYW5kaWRhdGUpIHtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZSwgJ2NhbmRpZGF0ZScsIHtcclxuICAgICAgICAgIHZhbHVlOiBuZXcgd2luZG93LlJUQ0ljZUNhbmRpZGF0ZShlLmNhbmRpZGF0ZSksXHJcbiAgICAgICAgICB3cml0YWJsZTogJ2ZhbHNlJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBlO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuXHJcbiAgLy8gc2hpbUNyZWF0ZU9iamVjdFVSTCBtdXN0IGJlIGNhbGxlZCBiZWZvcmUgc2hpbVNvdXJjZU9iamVjdCB0byBhdm9pZCBsb29wLlxyXG5cclxuICBzaGltQ3JlYXRlT2JqZWN0VVJMOiBmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIHZhciBVUkwgPSB3aW5kb3cgJiYgd2luZG93LlVSTDtcclxuXHJcbiAgICBpZiAoISh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JyAmJiB3aW5kb3cuSFRNTE1lZGlhRWxlbWVudCAmJlxyXG4gICAgICAgICAgJ3NyY09iamVjdCcgaW4gd2luZG93LkhUTUxNZWRpYUVsZW1lbnQucHJvdG90eXBlICYmXHJcbiAgICAgICAgVVJMLmNyZWF0ZU9iamVjdFVSTCAmJiBVUkwucmV2b2tlT2JqZWN0VVJMKSkge1xyXG4gICAgICAvLyBPbmx5IHNoaW0gQ3JlYXRlT2JqZWN0VVJMIHVzaW5nIHNyY09iamVjdCBpZiBzcmNPYmplY3QgZXhpc3RzLlxyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBuYXRpdmVDcmVhdGVPYmplY3RVUkwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMLmJpbmQoVVJMKTtcclxuICAgIHZhciBuYXRpdmVSZXZva2VPYmplY3RVUkwgPSBVUkwucmV2b2tlT2JqZWN0VVJMLmJpbmQoVVJMKTtcclxuICAgIHZhciBzdHJlYW1zID0gbmV3IE1hcCgpLCBuZXdJZCA9IDA7XHJcblxyXG4gICAgVVJMLmNyZWF0ZU9iamVjdFVSTCA9IGZ1bmN0aW9uKHN0cmVhbSkge1xyXG4gICAgICBpZiAoJ2dldFRyYWNrcycgaW4gc3RyZWFtKSB7XHJcbiAgICAgICAgdmFyIHVybCA9ICdwb2x5YmxvYjonICsgKCsrbmV3SWQpO1xyXG4gICAgICAgIHN0cmVhbXMuc2V0KHVybCwgc3RyZWFtKTtcclxuICAgICAgICB1dGlscy5kZXByZWNhdGVkKCdVUkwuY3JlYXRlT2JqZWN0VVJMKHN0cmVhbSknLFxyXG4gICAgICAgICAgICAnZWxlbS5zcmNPYmplY3QgPSBzdHJlYW0nKTtcclxuICAgICAgICByZXR1cm4gdXJsO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBuYXRpdmVDcmVhdGVPYmplY3RVUkwoc3RyZWFtKTtcclxuICAgIH07XHJcbiAgICBVUkwucmV2b2tlT2JqZWN0VVJMID0gZnVuY3Rpb24odXJsKSB7XHJcbiAgICAgIG5hdGl2ZVJldm9rZU9iamVjdFVSTCh1cmwpO1xyXG4gICAgICBzdHJlYW1zLmRlbGV0ZSh1cmwpO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgZHNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih3aW5kb3cuSFRNTE1lZGlhRWxlbWVudC5wcm90b3R5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc3JjJyk7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LkhUTUxNZWRpYUVsZW1lbnQucHJvdG90eXBlLCAnc3JjJywge1xyXG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBkc2MuZ2V0LmFwcGx5KHRoaXMpO1xyXG4gICAgICB9LFxyXG4gICAgICBzZXQ6IGZ1bmN0aW9uKHVybCkge1xyXG4gICAgICAgIHRoaXMuc3JjT2JqZWN0ID0gc3RyZWFtcy5nZXQodXJsKSB8fCBudWxsO1xyXG4gICAgICAgIHJldHVybiBkc2Muc2V0LmFwcGx5KHRoaXMsIFt1cmxdKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIG5hdGl2ZVNldEF0dHJpYnV0ZSA9IHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50LnByb3RvdHlwZS5zZXRBdHRyaWJ1dGU7XHJcbiAgICB3aW5kb3cuSFRNTE1lZGlhRWxlbWVudC5wcm90b3R5cGUuc2V0QXR0cmlidXRlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyICYmXHJcbiAgICAgICAgICAoJycgKyBhcmd1bWVudHNbMF0pLnRvTG93ZXJDYXNlKCkgPT09ICdzcmMnKSB7XHJcbiAgICAgICAgdGhpcy5zcmNPYmplY3QgPSBzdHJlYW1zLmdldChhcmd1bWVudHNbMV0pIHx8IG51bGw7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG5hdGl2ZVNldEF0dHJpYnV0ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgfTtcclxuICB9LFxyXG5cclxuICBzaGltTWF4TWVzc2FnZVNpemU6IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgaWYgKHdpbmRvdy5SVENTY3RwVHJhbnNwb3J0IHx8ICF3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdmFyIGJyb3dzZXJEZXRhaWxzID0gdXRpbHMuZGV0ZWN0QnJvd3Nlcih3aW5kb3cpO1xyXG5cclxuICAgIGlmICghKCdzY3RwJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSwgJ3NjdHAnLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHJldHVybiB0eXBlb2YgdGhpcy5fc2N0cCA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogdGhpcy5fc2N0cDtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBzY3RwSW5EZXNjcmlwdGlvbiA9IGZ1bmN0aW9uKGRlc2NyaXB0aW9uKSB7XHJcbiAgICAgIHZhciBzZWN0aW9ucyA9IFNEUFV0aWxzLnNwbGl0U2VjdGlvbnMoZGVzY3JpcHRpb24uc2RwKTtcclxuICAgICAgc2VjdGlvbnMuc2hpZnQoKTtcclxuICAgICAgcmV0dXJuIHNlY3Rpb25zLnNvbWUoZnVuY3Rpb24obWVkaWFTZWN0aW9uKSB7XHJcbiAgICAgICAgdmFyIG1MaW5lID0gU0RQVXRpbHMucGFyc2VNTGluZShtZWRpYVNlY3Rpb24pO1xyXG4gICAgICAgIHJldHVybiBtTGluZSAmJiBtTGluZS5raW5kID09PSAnYXBwbGljYXRpb24nXHJcbiAgICAgICAgICAgICYmIG1MaW5lLnByb3RvY29sLmluZGV4T2YoJ1NDVFAnKSAhPT0gLTE7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgZ2V0UmVtb3RlRmlyZWZveFZlcnNpb24gPSBmdW5jdGlvbihkZXNjcmlwdGlvbikge1xyXG4gICAgICAvLyBUT0RPOiBJcyB0aGVyZSBhIGJldHRlciBzb2x1dGlvbiBmb3IgZGV0ZWN0aW5nIEZpcmVmb3g/XHJcbiAgICAgIHZhciBtYXRjaCA9IGRlc2NyaXB0aW9uLnNkcC5tYXRjaCgvbW96aWxsYS4uLlRISVNfSVNfU0RQQVJUQS0oXFxkKykvKTtcclxuICAgICAgaWYgKG1hdGNoID09PSBudWxsIHx8IG1hdGNoLmxlbmd0aCA8IDIpIHtcclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgIH1cclxuICAgICAgdmFyIHZlcnNpb24gPSBwYXJzZUludChtYXRjaFsxXSwgMTApO1xyXG4gICAgICAvLyBUZXN0IGZvciBOYU4gKHllcywgdGhpcyBpcyB1Z2x5KVxyXG4gICAgICByZXR1cm4gdmVyc2lvbiAhPT0gdmVyc2lvbiA/IC0xIDogdmVyc2lvbjtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIGdldENhblNlbmRNYXhNZXNzYWdlU2l6ZSA9IGZ1bmN0aW9uKHJlbW90ZUlzRmlyZWZveCkge1xyXG4gICAgICAvLyBFdmVyeSBpbXBsZW1lbnRhdGlvbiB3ZSBrbm93IGNhbiBzZW5kIGF0IGxlYXN0IDY0IEtpQi5cclxuICAgICAgLy8gTm90ZTogQWx0aG91Z2ggQ2hyb21lIGlzIHRlY2huaWNhbGx5IGFibGUgdG8gc2VuZCB1cCB0byAyNTYgS2lCLCB0aGVcclxuICAgICAgLy8gICAgICAgZGF0YSBkb2VzIG5vdCByZWFjaCB0aGUgb3RoZXIgcGVlciByZWxpYWJseS5cclxuICAgICAgLy8gICAgICAgU2VlOiBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3Avd2VicnRjL2lzc3Vlcy9kZXRhaWw/aWQ9ODQxOVxyXG4gICAgICB2YXIgY2FuU2VuZE1heE1lc3NhZ2VTaXplID0gNjU1MzY7XHJcbiAgICAgIGlmIChicm93c2VyRGV0YWlscy5icm93c2VyID09PSAnZmlyZWZveCcpIHtcclxuICAgICAgICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDU3KSB7XHJcbiAgICAgICAgICBpZiAocmVtb3RlSXNGaXJlZm94ID09PSAtMSkge1xyXG4gICAgICAgICAgICAvLyBGRiA8IDU3IHdpbGwgc2VuZCBpbiAxNiBLaUIgY2h1bmtzIHVzaW5nIHRoZSBkZXByZWNhdGVkIFBQSURcclxuICAgICAgICAgICAgLy8gZnJhZ21lbnRhdGlvbi5cclxuICAgICAgICAgICAgY2FuU2VuZE1heE1lc3NhZ2VTaXplID0gMTYzODQ7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBIb3dldmVyLCBvdGhlciBGRiAoYW5kIFJBV1JUQykgY2FuIHJlYXNzZW1ibGUgUFBJRC1mcmFnbWVudGVkXHJcbiAgICAgICAgICAgIC8vIG1lc3NhZ2VzLiBUaHVzLCBzdXBwb3J0aW5nIH4yIEdpQiB3aGVuIHNlbmRpbmcuXHJcbiAgICAgICAgICAgIGNhblNlbmRNYXhNZXNzYWdlU2l6ZSA9IDIxNDc0ODM2Mzc7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIEN1cnJlbnRseSwgYWxsIEZGID49IDU3IHdpbGwgcmVzZXQgdGhlIHJlbW90ZSBtYXhpbXVtIG1lc3NhZ2Ugc2l6ZVxyXG4gICAgICAgICAgLy8gdG8gdGhlIGRlZmF1bHQgdmFsdWUgd2hlbiBhIGRhdGEgY2hhbm5lbCBpcyBjcmVhdGVkIGF0IGEgbGF0ZXJcclxuICAgICAgICAgIC8vIHN0YWdlLiA6KFxyXG4gICAgICAgICAgLy8gU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xNDI2ODMxXHJcbiAgICAgICAgICBjYW5TZW5kTWF4TWVzc2FnZVNpemUgPVxyXG4gICAgICAgICAgICBicm93c2VyRGV0YWlscy52ZXJzaW9uID09PSA1NyA/IDY1NTM1IDogNjU1MzY7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBjYW5TZW5kTWF4TWVzc2FnZVNpemU7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBnZXRNYXhNZXNzYWdlU2l6ZSA9IGZ1bmN0aW9uKGRlc2NyaXB0aW9uLCByZW1vdGVJc0ZpcmVmb3gpIHtcclxuICAgICAgLy8gTm90ZTogNjU1MzYgYnl0ZXMgaXMgdGhlIGRlZmF1bHQgdmFsdWUgZnJvbSB0aGUgU0RQIHNwZWMuIEFsc28sXHJcbiAgICAgIC8vICAgICAgIGV2ZXJ5IGltcGxlbWVudGF0aW9uIHdlIGtub3cgc3VwcG9ydHMgcmVjZWl2aW5nIDY1NTM2IGJ5dGVzLlxyXG4gICAgICB2YXIgbWF4TWVzc2FnZVNpemUgPSA2NTUzNjtcclxuXHJcbiAgICAgIC8vIEZGIDU3IGhhcyBhIHNsaWdodGx5IGluY29ycmVjdCBkZWZhdWx0IHJlbW90ZSBtYXggbWVzc2FnZSBzaXplLCBzb1xyXG4gICAgICAvLyB3ZSBuZWVkIHRvIGFkanVzdCBpdCBoZXJlIHRvIGF2b2lkIGEgZmFpbHVyZSB3aGVuIHNlbmRpbmcuXHJcbiAgICAgIC8vIFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTQyNTY5N1xyXG4gICAgICBpZiAoYnJvd3NlckRldGFpbHMuYnJvd3NlciA9PT0gJ2ZpcmVmb3gnXHJcbiAgICAgICAgICAgJiYgYnJvd3NlckRldGFpbHMudmVyc2lvbiA9PT0gNTcpIHtcclxuICAgICAgICBtYXhNZXNzYWdlU2l6ZSA9IDY1NTM1O1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgbWF0Y2ggPSBTRFBVdGlscy5tYXRjaFByZWZpeChkZXNjcmlwdGlvbi5zZHAsICdhPW1heC1tZXNzYWdlLXNpemU6Jyk7XHJcbiAgICAgIGlmIChtYXRjaC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgbWF4TWVzc2FnZVNpemUgPSBwYXJzZUludChtYXRjaFswXS5zdWJzdHIoMTkpLCAxMCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoYnJvd3NlckRldGFpbHMuYnJvd3NlciA9PT0gJ2ZpcmVmb3gnICYmXHJcbiAgICAgICAgICAgICAgICAgIHJlbW90ZUlzRmlyZWZveCAhPT0gLTEpIHtcclxuICAgICAgICAvLyBJZiB0aGUgbWF4aW11bSBtZXNzYWdlIHNpemUgaXMgbm90IHByZXNlbnQgaW4gdGhlIHJlbW90ZSBTRFAgYW5kXHJcbiAgICAgICAgLy8gYm90aCBsb2NhbCBhbmQgcmVtb3RlIGFyZSBGaXJlZm94LCB0aGUgcmVtb3RlIHBlZXIgY2FuIHJlY2VpdmVcclxuICAgICAgICAvLyB+MiBHaUIuXHJcbiAgICAgICAgbWF4TWVzc2FnZVNpemUgPSAyMTQ3NDgzNjM3O1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBtYXhNZXNzYWdlU2l6ZTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIG9yaWdTZXRSZW1vdGVEZXNjcmlwdGlvbiA9XHJcbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5zZXRSZW1vdGVEZXNjcmlwdGlvbjtcclxuICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0UmVtb3RlRGVzY3JpcHRpb24gPSBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgcGMuX3NjdHAgPSBudWxsO1xyXG5cclxuICAgICAgaWYgKHNjdHBJbkRlc2NyaXB0aW9uKGFyZ3VtZW50c1swXSkpIHtcclxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgcmVtb3RlIGlzIEZGLlxyXG4gICAgICAgIHZhciBpc0ZpcmVmb3ggPSBnZXRSZW1vdGVGaXJlZm94VmVyc2lvbihhcmd1bWVudHNbMF0pO1xyXG5cclxuICAgICAgICAvLyBHZXQgdGhlIG1heGltdW0gbWVzc2FnZSBzaXplIHRoZSBsb2NhbCBwZWVyIGlzIGNhcGFibGUgb2Ygc2VuZGluZ1xyXG4gICAgICAgIHZhciBjYW5TZW5kTU1TID0gZ2V0Q2FuU2VuZE1heE1lc3NhZ2VTaXplKGlzRmlyZWZveCk7XHJcblxyXG4gICAgICAgIC8vIEdldCB0aGUgbWF4aW11bSBtZXNzYWdlIHNpemUgb2YgdGhlIHJlbW90ZSBwZWVyLlxyXG4gICAgICAgIHZhciByZW1vdGVNTVMgPSBnZXRNYXhNZXNzYWdlU2l6ZShhcmd1bWVudHNbMF0sIGlzRmlyZWZveCk7XHJcblxyXG4gICAgICAgIC8vIERldGVybWluZSBmaW5hbCBtYXhpbXVtIG1lc3NhZ2Ugc2l6ZVxyXG4gICAgICAgIHZhciBtYXhNZXNzYWdlU2l6ZTtcclxuICAgICAgICBpZiAoY2FuU2VuZE1NUyA9PT0gMCAmJiByZW1vdGVNTVMgPT09IDApIHtcclxuICAgICAgICAgIG1heE1lc3NhZ2VTaXplID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY2FuU2VuZE1NUyA9PT0gMCB8fCByZW1vdGVNTVMgPT09IDApIHtcclxuICAgICAgICAgIG1heE1lc3NhZ2VTaXplID0gTWF0aC5tYXgoY2FuU2VuZE1NUywgcmVtb3RlTU1TKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbWF4TWVzc2FnZVNpemUgPSBNYXRoLm1pbihjYW5TZW5kTU1TLCByZW1vdGVNTVMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGEgZHVtbXkgUlRDU2N0cFRyYW5zcG9ydCBvYmplY3QgYW5kIHRoZSAnbWF4TWVzc2FnZVNpemUnXHJcbiAgICAgICAgLy8gYXR0cmlidXRlLlxyXG4gICAgICAgIHZhciBzY3RwID0ge307XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNjdHAsICdtYXhNZXNzYWdlU2l6ZScsIHtcclxuICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXhNZXNzYWdlU2l6ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBwYy5fc2N0cCA9IHNjdHA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBvcmlnU2V0UmVtb3RlRGVzY3JpcHRpb24uYXBwbHkocGMsIGFyZ3VtZW50cyk7XHJcbiAgICB9O1xyXG4gIH0sXHJcblxyXG4gIHNoaW1TZW5kVGhyb3dUeXBlRXJyb3I6IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgaWYgKCEod2luZG93LlJUQ1BlZXJDb25uZWN0aW9uICYmXHJcbiAgICAgICAgJ2NyZWF0ZURhdGFDaGFubmVsJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTm90ZTogQWx0aG91Z2ggRmlyZWZveCA+PSA1NyBoYXMgYSBuYXRpdmUgaW1wbGVtZW50YXRpb24sIHRoZSBtYXhpbXVtXHJcbiAgICAvLyAgICAgICBtZXNzYWdlIHNpemUgY2FuIGJlIHJlc2V0IGZvciBhbGwgZGF0YSBjaGFubmVscyBhdCBhIGxhdGVyIHN0YWdlLlxyXG4gICAgLy8gICAgICAgU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xNDI2ODMxXHJcblxyXG4gICAgdmFyIG9yaWdDcmVhdGVEYXRhQ2hhbm5lbCA9XHJcbiAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlRGF0YUNoYW5uZWw7XHJcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmNyZWF0ZURhdGFDaGFubmVsID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgIHZhciBkYXRhQ2hhbm5lbCA9IG9yaWdDcmVhdGVEYXRhQ2hhbm5lbC5hcHBseShwYywgYXJndW1lbnRzKTtcclxuICAgICAgdmFyIG9yaWdEYXRhQ2hhbm5lbFNlbmQgPSBkYXRhQ2hhbm5lbC5zZW5kO1xyXG5cclxuICAgICAgLy8gUGF0Y2ggJ3NlbmQnIG1ldGhvZFxyXG4gICAgICBkYXRhQ2hhbm5lbC5zZW5kID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGRjID0gdGhpcztcclxuICAgICAgICB2YXIgZGF0YSA9IGFyZ3VtZW50c1swXTtcclxuICAgICAgICB2YXIgbGVuZ3RoID0gZGF0YS5sZW5ndGggfHwgZGF0YS5zaXplIHx8IGRhdGEuYnl0ZUxlbmd0aDtcclxuICAgICAgICBpZiAobGVuZ3RoID4gcGMuc2N0cC5tYXhNZXNzYWdlU2l6ZSkge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IERPTUV4Y2VwdGlvbignTWVzc2FnZSB0b28gbGFyZ2UgKGNhbiBzZW5kIGEgbWF4aW11bSBvZiAnICtcclxuICAgICAgICAgICAgcGMuc2N0cC5tYXhNZXNzYWdlU2l6ZSArICcgYnl0ZXMpJywgJ1R5cGVFcnJvcicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3JpZ0RhdGFDaGFubmVsU2VuZC5hcHBseShkYywgYXJndW1lbnRzKTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHJldHVybiBkYXRhQ2hhbm5lbDtcclxuICAgIH07XHJcbiAgfVxyXG59O1xyXG5cclxufSx7XCIuL3V0aWxzXCI6MTMsXCJzZHBcIjoyfV0sODpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcbi8qXHJcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXHJcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcclxuICogIHRyZWUuXHJcbiAqL1xyXG4gLyogZXNsaW50LWVudiBub2RlICovXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XHJcbnZhciBzaGltUlRDUGVlckNvbm5lY3Rpb24gPSByZXF1aXJlKCdydGNwZWVyY29ubmVjdGlvbi1zaGltJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBzaGltR2V0VXNlck1lZGlhOiByZXF1aXJlKCcuL2dldHVzZXJtZWRpYScpLFxyXG4gIHNoaW1QZWVyQ29ubmVjdGlvbjogZnVuY3Rpb24od2luZG93KSB7XHJcbiAgICB2YXIgYnJvd3NlckRldGFpbHMgPSB1dGlscy5kZXRlY3RCcm93c2VyKHdpbmRvdyk7XHJcblxyXG4gICAgaWYgKHdpbmRvdy5SVENJY2VHYXRoZXJlcikge1xyXG4gICAgICBpZiAoIXdpbmRvdy5SVENJY2VDYW5kaWRhdGUpIHtcclxuICAgICAgICB3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlID0gZnVuY3Rpb24oYXJncykge1xyXG4gICAgICAgICAgcmV0dXJuIGFyZ3M7XHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIXdpbmRvdy5SVENTZXNzaW9uRGVzY3JpcHRpb24pIHtcclxuICAgICAgICB3aW5kb3cuUlRDU2Vzc2lvbkRlc2NyaXB0aW9uID0gZnVuY3Rpb24oYXJncykge1xyXG4gICAgICAgICAgcmV0dXJuIGFyZ3M7XHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG4gICAgICAvLyB0aGlzIGFkZHMgYW4gYWRkaXRpb25hbCBldmVudCBsaXN0ZW5lciB0byBNZWRpYVN0cmFja1RyYWNrIHRoYXQgc2lnbmFsc1xyXG4gICAgICAvLyB3aGVuIGEgdHJhY2tzIGVuYWJsZWQgcHJvcGVydHkgd2FzIGNoYW5nZWQuIFdvcmthcm91bmQgZm9yIGEgYnVnIGluXHJcbiAgICAgIC8vIGFkZFN0cmVhbSwgc2VlIGJlbG93LiBObyBsb25nZXIgcmVxdWlyZWQgaW4gMTUwMjUrXHJcbiAgICAgIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgMTUwMjUpIHtcclxuICAgICAgICB2YXIgb3JpZ01TVEVuYWJsZWQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKFxyXG4gICAgICAgICAgICB3aW5kb3cuTWVkaWFTdHJlYW1UcmFjay5wcm90b3R5cGUsICdlbmFibGVkJyk7XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5NZWRpYVN0cmVhbVRyYWNrLnByb3RvdHlwZSwgJ2VuYWJsZWQnLCB7XHJcbiAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIG9yaWdNU1RFbmFibGVkLnNldC5jYWxsKHRoaXMsIHZhbHVlKTtcclxuICAgICAgICAgICAgdmFyIGV2ID0gbmV3IEV2ZW50KCdlbmFibGVkJyk7XHJcbiAgICAgICAgICAgIGV2LmVuYWJsZWQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIE9SVEMgZGVmaW5lcyB0aGUgRFRNRiBzZW5kZXIgYSBiaXQgZGlmZmVyZW50LlxyXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3czYy9vcnRjL2lzc3Vlcy83MTRcclxuICAgIGlmICh3aW5kb3cuUlRDUnRwU2VuZGVyICYmICEoJ2R0bWYnIGluIHdpbmRvdy5SVENSdHBTZW5kZXIucHJvdG90eXBlKSkge1xyXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LlJUQ1J0cFNlbmRlci5wcm90b3R5cGUsICdkdG1mJywge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5fZHRtZiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRyYWNrLmtpbmQgPT09ICdhdWRpbycpIHtcclxuICAgICAgICAgICAgICB0aGlzLl9kdG1mID0gbmV3IHdpbmRvdy5SVENEdG1mU2VuZGVyKHRoaXMpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHJhY2sua2luZCA9PT0gJ3ZpZGVvJykge1xyXG4gICAgICAgICAgICAgIHRoaXMuX2R0bWYgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5fZHRtZjtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLy8gRWRnZSBjdXJyZW50bHkgb25seSBpbXBsZW1lbnRzIHRoZSBSVENEdG1mU2VuZGVyLCBub3QgdGhlXHJcbiAgICAvLyBSVENEVE1GU2VuZGVyIGFsaWFzLiBTZWUgaHR0cDovL2RyYWZ0Lm9ydGMub3JnLyNydGNkdG1mc2VuZGVyMipcclxuICAgIGlmICh3aW5kb3cuUlRDRHRtZlNlbmRlciAmJiAhd2luZG93LlJUQ0RUTUZTZW5kZXIpIHtcclxuICAgICAgd2luZG93LlJUQ0RUTUZTZW5kZXIgPSB3aW5kb3cuUlRDRHRtZlNlbmRlcjtcclxuICAgIH1cclxuXHJcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gPVxyXG4gICAgICAgIHNoaW1SVENQZWVyQ29ubmVjdGlvbih3aW5kb3csIGJyb3dzZXJEZXRhaWxzLnZlcnNpb24pO1xyXG4gIH0sXHJcbiAgc2hpbVJlcGxhY2VUcmFjazogZnVuY3Rpb24od2luZG93KSB7XHJcbiAgICAvLyBPUlRDIGhhcyByZXBsYWNlVHJhY2sgLS0gaHR0cHM6Ly9naXRodWIuY29tL3czYy9vcnRjL2lzc3Vlcy82MTRcclxuICAgIGlmICh3aW5kb3cuUlRDUnRwU2VuZGVyICYmXHJcbiAgICAgICAgISgncmVwbGFjZVRyYWNrJyBpbiB3aW5kb3cuUlRDUnRwU2VuZGVyLnByb3RvdHlwZSkpIHtcclxuICAgICAgd2luZG93LlJUQ1J0cFNlbmRlci5wcm90b3R5cGUucmVwbGFjZVRyYWNrID1cclxuICAgICAgICAgIHdpbmRvdy5SVENSdHBTZW5kZXIucHJvdG90eXBlLnNldFRyYWNrO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbn0se1wiLi4vdXRpbHNcIjoxMyxcIi4vZ2V0dXNlcm1lZGlhXCI6OSxcInJ0Y3BlZXJjb25uZWN0aW9uLXNoaW1cIjoxfV0sOTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XHJcbi8qXHJcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTYgVGhlIFdlYlJUQyBwcm9qZWN0IGF1dGhvcnMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqXHJcbiAqICBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIEJTRC1zdHlsZSBsaWNlbnNlXHJcbiAqICB0aGF0IGNhbiBiZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IG9mIHRoZSBzb3VyY2VcclxuICogIHRyZWUuXHJcbiAqL1xyXG4gLyogZXNsaW50LWVudiBub2RlICovXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIEV4cG9zZSBwdWJsaWMgbWV0aG9kcy5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih3aW5kb3cpIHtcclxuICB2YXIgbmF2aWdhdG9yID0gd2luZG93ICYmIHdpbmRvdy5uYXZpZ2F0b3I7XHJcblxyXG4gIHZhciBzaGltRXJyb3JfID0gZnVuY3Rpb24oZSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmFtZToge1Blcm1pc3Npb25EZW5pZWRFcnJvcjogJ05vdEFsbG93ZWRFcnJvcid9W2UubmFtZV0gfHwgZS5uYW1lLFxyXG4gICAgICBtZXNzYWdlOiBlLm1lc3NhZ2UsXHJcbiAgICAgIGNvbnN0cmFpbnQ6IGUuY29uc3RyYWludCxcclxuICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5hbWU7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfTtcclxuXHJcbiAgLy8gZ2V0VXNlck1lZGlhIGVycm9yIHNoaW0uXHJcbiAgdmFyIG9yaWdHZXRVc2VyTWVkaWEgPSBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYS5cclxuICAgICAgYmluZChuYXZpZ2F0b3IubWVkaWFEZXZpY2VzKTtcclxuICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSA9IGZ1bmN0aW9uKGMpIHtcclxuICAgIHJldHVybiBvcmlnR2V0VXNlck1lZGlhKGMpLmNhdGNoKGZ1bmN0aW9uKGUpIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHNoaW1FcnJvcl8oZSkpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxufTtcclxuXHJcbn0se31dLDEwOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcclxuLypcclxuICogIENvcHlyaWdodCAoYykgMjAxNiBUaGUgV2ViUlRDIHByb2plY3QgYXV0aG9ycy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGEgQlNELXN0eWxlIGxpY2Vuc2VcclxuICogIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3Qgb2YgdGhlIHNvdXJjZVxyXG4gKiAgdHJlZS5cclxuICovXHJcbiAvKiBlc2xpbnQtZW52IG5vZGUgKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIHNoaW1HZXRVc2VyTWVkaWE6IHJlcXVpcmUoJy4vZ2V0dXNlcm1lZGlhJyksXHJcbiAgc2hpbU9uVHJhY2s6IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiAmJiAhKCdvbnRyYWNrJyBpblxyXG4gICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLCAnb250cmFjaycsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuX29udHJhY2s7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IGZ1bmN0aW9uKGYpIHtcclxuICAgICAgICAgIGlmICh0aGlzLl9vbnRyYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhY2snLCB0aGlzLl9vbnRyYWNrKTtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdhZGRzdHJlYW0nLCB0aGlzLl9vbnRyYWNrcG9seSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYWNrJywgdGhpcy5fb250cmFjayA9IGYpO1xyXG4gICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdhZGRzdHJlYW0nLCB0aGlzLl9vbnRyYWNrcG9seSA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgZS5zdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xyXG4gICAgICAgICAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgndHJhY2snKTtcclxuICAgICAgICAgICAgICBldmVudC50cmFjayA9IHRyYWNrO1xyXG4gICAgICAgICAgICAgIGV2ZW50LnJlY2VpdmVyID0ge3RyYWNrOiB0cmFja307XHJcbiAgICAgICAgICAgICAgZXZlbnQudHJhbnNjZWl2ZXIgPSB7cmVjZWl2ZXI6IGV2ZW50LnJlY2VpdmVyfTtcclxuICAgICAgICAgICAgICBldmVudC5zdHJlYW1zID0gW2Uuc3RyZWFtXTtcclxuICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHdpbmRvdy5SVENUcmFja0V2ZW50ICYmXHJcbiAgICAgICAgKCdyZWNlaXZlcicgaW4gd2luZG93LlJUQ1RyYWNrRXZlbnQucHJvdG90eXBlKSAmJlxyXG4gICAgICAgICEoJ3RyYW5zY2VpdmVyJyBpbiB3aW5kb3cuUlRDVHJhY2tFdmVudC5wcm90b3R5cGUpKSB7XHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDVHJhY2tFdmVudC5wcm90b3R5cGUsICd0cmFuc2NlaXZlcicsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHtyZWNlaXZlcjogdGhpcy5yZWNlaXZlcn07XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBzaGltU291cmNlT2JqZWN0OiBmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIC8vIEZpcmVmb3ggaGFzIHN1cHBvcnRlZCBtb3pTcmNPYmplY3Qgc2luY2UgRkYyMiwgdW5wcmVmaXhlZCBpbiA0Mi5cclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBpZiAod2luZG93LkhUTUxNZWRpYUVsZW1lbnQgJiZcclxuICAgICAgICAhKCdzcmNPYmplY3QnIGluIHdpbmRvdy5IVE1MTWVkaWFFbGVtZW50LnByb3RvdHlwZSkpIHtcclxuICAgICAgICAvLyBTaGltIHRoZSBzcmNPYmplY3QgcHJvcGVydHksIG9uY2UsIHdoZW4gSFRNTE1lZGlhRWxlbWVudCBpcyBmb3VuZC5cclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LkhUTUxNZWRpYUVsZW1lbnQucHJvdG90eXBlLCAnc3JjT2JqZWN0Jywge1xyXG4gICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW96U3JjT2JqZWN0O1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHNldDogZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW96U3JjT2JqZWN0ID0gc3RyZWFtO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgc2hpbVBlZXJDb25uZWN0aW9uOiBmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIHZhciBicm93c2VyRGV0YWlscyA9IHV0aWxzLmRldGVjdEJyb3dzZXIod2luZG93KTtcclxuXHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ29iamVjdCcgfHwgISh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gfHxcclxuICAgICAgICB3aW5kb3cubW96UlRDUGVlckNvbm5lY3Rpb24pKSB7XHJcbiAgICAgIHJldHVybjsgLy8gcHJvYmFibHkgbWVkaWEucGVlcmNvbm5lY3Rpb24uZW5hYmxlZD1mYWxzZSBpbiBhYm91dDpjb25maWdcclxuICAgIH1cclxuICAgIC8vIFRoZSBSVENQZWVyQ29ubmVjdGlvbiBvYmplY3QuXHJcbiAgICBpZiAoIXdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbikge1xyXG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gPSBmdW5jdGlvbihwY0NvbmZpZywgcGNDb25zdHJhaW50cykge1xyXG4gICAgICAgIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgMzgpIHtcclxuICAgICAgICAgIC8vIC51cmxzIGlzIG5vdCBzdXBwb3J0ZWQgaW4gRkYgPCAzOC5cclxuICAgICAgICAgIC8vIGNyZWF0ZSBSVENJY2VTZXJ2ZXJzIHdpdGggYSBzaW5nbGUgdXJsLlxyXG4gICAgICAgICAgaWYgKHBjQ29uZmlnICYmIHBjQ29uZmlnLmljZVNlcnZlcnMpIHtcclxuICAgICAgICAgICAgdmFyIG5ld0ljZVNlcnZlcnMgPSBbXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwY0NvbmZpZy5pY2VTZXJ2ZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgdmFyIHNlcnZlciA9IHBjQ29uZmlnLmljZVNlcnZlcnNbaV07XHJcbiAgICAgICAgICAgICAgaWYgKHNlcnZlci5oYXNPd25Qcm9wZXJ0eSgndXJscycpKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNlcnZlci51cmxzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBuZXdTZXJ2ZXIgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBzZXJ2ZXIudXJsc1tqXVxyXG4gICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICBpZiAoc2VydmVyLnVybHNbal0uaW5kZXhPZigndHVybicpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3U2VydmVyLnVzZXJuYW1lID0gc2VydmVyLnVzZXJuYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld1NlcnZlci5jcmVkZW50aWFsID0gc2VydmVyLmNyZWRlbnRpYWw7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgbmV3SWNlU2VydmVycy5wdXNoKG5ld1NlcnZlcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5ld0ljZVNlcnZlcnMucHVzaChwY0NvbmZpZy5pY2VTZXJ2ZXJzW2ldKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcGNDb25maWcuaWNlU2VydmVycyA9IG5ld0ljZVNlcnZlcnM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgd2luZG93Lm1velJUQ1BlZXJDb25uZWN0aW9uKHBjQ29uZmlnLCBwY0NvbnN0cmFpbnRzKTtcclxuICAgICAgfTtcclxuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSA9XHJcbiAgICAgICAgICB3aW5kb3cubW96UlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlO1xyXG5cclxuICAgICAgLy8gd3JhcCBzdGF0aWMgbWV0aG9kcy4gQ3VycmVudGx5IGp1c3QgZ2VuZXJhdGVDZXJ0aWZpY2F0ZS5cclxuICAgICAgaWYgKHdpbmRvdy5tb3pSVENQZWVyQ29ubmVjdGlvbi5nZW5lcmF0ZUNlcnRpZmljYXRlKSB7XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiwgJ2dlbmVyYXRlQ2VydGlmaWNhdGUnLCB7XHJcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gd2luZG93Lm1velJUQ1BlZXJDb25uZWN0aW9uLmdlbmVyYXRlQ2VydGlmaWNhdGU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHdpbmRvdy5SVENTZXNzaW9uRGVzY3JpcHRpb24gPSB3aW5kb3cubW96UlRDU2Vzc2lvbkRlc2NyaXB0aW9uO1xyXG4gICAgICB3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlID0gd2luZG93Lm1velJUQ0ljZUNhbmRpZGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzaGltIGF3YXkgbmVlZCBmb3Igb2Jzb2xldGUgUlRDSWNlQ2FuZGlkYXRlL1JUQ1Nlc3Npb25EZXNjcmlwdGlvbi5cclxuICAgIFsnc2V0TG9jYWxEZXNjcmlwdGlvbicsICdzZXRSZW1vdGVEZXNjcmlwdGlvbicsICdhZGRJY2VDYW5kaWRhdGUnXVxyXG4gICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xyXG4gICAgICAgICAgdmFyIG5hdGl2ZU1ldGhvZCA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXTtcclxuICAgICAgICAgIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBhcmd1bWVudHNbMF0gPSBuZXcgKChtZXRob2QgPT09ICdhZGRJY2VDYW5kaWRhdGUnKSA/XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuUlRDSWNlQ2FuZGlkYXRlIDpcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5SVENTZXNzaW9uRGVzY3JpcHRpb24pKGFyZ3VtZW50c1swXSk7XHJcbiAgICAgICAgICAgIHJldHVybiBuYXRpdmVNZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgLy8gc3VwcG9ydCBmb3IgYWRkSWNlQ2FuZGlkYXRlKG51bGwgb3IgdW5kZWZpbmVkKVxyXG4gICAgdmFyIG5hdGl2ZUFkZEljZUNhbmRpZGF0ZSA9XHJcbiAgICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRJY2VDYW5kaWRhdGU7XHJcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZEljZUNhbmRpZGF0ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBpZiAoIWFyZ3VtZW50c1swXSkge1xyXG4gICAgICAgIGlmIChhcmd1bWVudHNbMV0pIHtcclxuICAgICAgICAgIGFyZ3VtZW50c1sxXS5hcHBseShudWxsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBuYXRpdmVBZGRJY2VDYW5kaWRhdGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gc2hpbSBnZXRTdGF0cyB3aXRoIG1hcGxpa2Ugc3VwcG9ydFxyXG4gICAgdmFyIG1ha2VNYXBTdGF0cyA9IGZ1bmN0aW9uKHN0YXRzKSB7XHJcbiAgICAgIHZhciBtYXAgPSBuZXcgTWFwKCk7XHJcbiAgICAgIE9iamVjdC5rZXlzKHN0YXRzKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgIG1hcC5zZXQoa2V5LCBzdGF0c1trZXldKTtcclxuICAgICAgICBtYXBba2V5XSA9IHN0YXRzW2tleV07XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gbWFwO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgbW9kZXJuU3RhdHNUeXBlcyA9IHtcclxuICAgICAgaW5ib3VuZHJ0cDogJ2luYm91bmQtcnRwJyxcclxuICAgICAgb3V0Ym91bmRydHA6ICdvdXRib3VuZC1ydHAnLFxyXG4gICAgICBjYW5kaWRhdGVwYWlyOiAnY2FuZGlkYXRlLXBhaXInLFxyXG4gICAgICBsb2NhbGNhbmRpZGF0ZTogJ2xvY2FsLWNhbmRpZGF0ZScsXHJcbiAgICAgIHJlbW90ZWNhbmRpZGF0ZTogJ3JlbW90ZS1jYW5kaWRhdGUnXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBuYXRpdmVHZXRTdGF0cyA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U3RhdHM7XHJcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFN0YXRzID0gZnVuY3Rpb24oXHJcbiAgICAgIHNlbGVjdG9yLFxyXG4gICAgICBvblN1Y2MsXHJcbiAgICAgIG9uRXJyXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIG5hdGl2ZUdldFN0YXRzLmFwcGx5KHRoaXMsIFtzZWxlY3RvciB8fCBudWxsXSlcclxuICAgICAgICAudGhlbihmdW5jdGlvbihzdGF0cykge1xyXG4gICAgICAgICAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCA0OCkge1xyXG4gICAgICAgICAgICBzdGF0cyA9IG1ha2VNYXBTdGF0cyhzdGF0cyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoYnJvd3NlckRldGFpbHMudmVyc2lvbiA8IDUzICYmICFvblN1Y2MpIHtcclxuICAgICAgICAgICAgLy8gU2hpbSBvbmx5IHByb21pc2UgZ2V0U3RhdHMgd2l0aCBzcGVjLWh5cGhlbnMgaW4gdHlwZSBuYW1lc1xyXG4gICAgICAgICAgICAvLyBMZWF2ZSBjYWxsYmFjayB2ZXJzaW9uIGFsb25lOyBtaXNjIG9sZCB1c2VzIG9mIGZvckVhY2ggYmVmb3JlIE1hcFxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgIHN0YXRzLmZvckVhY2goZnVuY3Rpb24oc3RhdCkge1xyXG4gICAgICAgICAgICAgICAgc3RhdC50eXBlID0gbW9kZXJuU3RhdHNUeXBlc1tzdGF0LnR5cGVdIHx8IHN0YXQudHlwZTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgIGlmIChlLm5hbWUgIT09ICdUeXBlRXJyb3InKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAvLyBBdm9pZCBUeXBlRXJyb3I6IFwidHlwZVwiIGlzIHJlYWQtb25seSwgaW4gb2xkIHZlcnNpb25zLiAzNC00M2lzaFxyXG4gICAgICAgICAgICAgIHN0YXRzLmZvckVhY2goZnVuY3Rpb24oc3RhdCwgaSkge1xyXG4gICAgICAgICAgICAgICAgc3RhdHMuc2V0KGksIE9iamVjdC5hc3NpZ24oe30sIHN0YXQsIHtcclxuICAgICAgICAgICAgICAgICAgdHlwZTogbW9kZXJuU3RhdHNUeXBlc1tzdGF0LnR5cGVdIHx8IHN0YXQudHlwZVxyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gc3RhdHM7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihvblN1Y2MsIG9uRXJyKTtcclxuICAgIH07XHJcbiAgfSxcclxuXHJcbiAgc2hpbVJlbW92ZVN0cmVhbTogZnVuY3Rpb24od2luZG93KSB7XHJcbiAgICBpZiAoIXdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiB8fFxyXG4gICAgICAgICdyZW1vdmVTdHJlYW0nIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVTdHJlYW0gPSBmdW5jdGlvbihzdHJlYW0pIHtcclxuICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgdXRpbHMuZGVwcmVjYXRlZCgncmVtb3ZlU3RyZWFtJywgJ3JlbW92ZVRyYWNrJyk7XHJcbiAgICAgIHRoaXMuZ2V0U2VuZGVycygpLmZvckVhY2goZnVuY3Rpb24oc2VuZGVyKSB7XHJcbiAgICAgICAgaWYgKHNlbmRlci50cmFjayAmJiBzdHJlYW0uZ2V0VHJhY2tzKCkuaW5kZXhPZihzZW5kZXIudHJhY2spICE9PSAtMSkge1xyXG4gICAgICAgICAgcGMucmVtb3ZlVHJhY2soc2VuZGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuICB9XHJcbn07XHJcblxyXG59LHtcIi4uL3V0aWxzXCI6MTMsXCIuL2dldHVzZXJtZWRpYVwiOjExfV0sMTE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG4vKlxyXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKlxyXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxyXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXHJcbiAqICB0cmVlLlxyXG4gKi9cclxuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xyXG52YXIgbG9nZ2luZyA9IHV0aWxzLmxvZztcclxuXHJcbi8vIEV4cG9zZSBwdWJsaWMgbWV0aG9kcy5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih3aW5kb3cpIHtcclxuICB2YXIgYnJvd3NlckRldGFpbHMgPSB1dGlscy5kZXRlY3RCcm93c2VyKHdpbmRvdyk7XHJcbiAgdmFyIG5hdmlnYXRvciA9IHdpbmRvdyAmJiB3aW5kb3cubmF2aWdhdG9yO1xyXG4gIHZhciBNZWRpYVN0cmVhbVRyYWNrID0gd2luZG93ICYmIHdpbmRvdy5NZWRpYVN0cmVhbVRyYWNrO1xyXG5cclxuICB2YXIgc2hpbUVycm9yXyA9IGZ1bmN0aW9uKGUpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5hbWU6IHtcclxuICAgICAgICBJbnRlcm5hbEVycm9yOiAnTm90UmVhZGFibGVFcnJvcicsXHJcbiAgICAgICAgTm90U3VwcG9ydGVkRXJyb3I6ICdUeXBlRXJyb3InLFxyXG4gICAgICAgIFBlcm1pc3Npb25EZW5pZWRFcnJvcjogJ05vdEFsbG93ZWRFcnJvcicsXHJcbiAgICAgICAgU2VjdXJpdHlFcnJvcjogJ05vdEFsbG93ZWRFcnJvcidcclxuICAgICAgfVtlLm5hbWVdIHx8IGUubmFtZSxcclxuICAgICAgbWVzc2FnZToge1xyXG4gICAgICAgICdUaGUgb3BlcmF0aW9uIGlzIGluc2VjdXJlLic6ICdUaGUgcmVxdWVzdCBpcyBub3QgYWxsb3dlZCBieSB0aGUgJyArXHJcbiAgICAgICAgJ3VzZXIgYWdlbnQgb3IgdGhlIHBsYXRmb3JtIGluIHRoZSBjdXJyZW50IGNvbnRleHQuJ1xyXG4gICAgICB9W2UubWVzc2FnZV0gfHwgZS5tZXNzYWdlLFxyXG4gICAgICBjb25zdHJhaW50OiBlLmNvbnN0cmFpbnQsXHJcbiAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5uYW1lICsgKHRoaXMubWVzc2FnZSAmJiAnOiAnKSArIHRoaXMubWVzc2FnZTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9O1xyXG5cclxuICAvLyBnZXRVc2VyTWVkaWEgY29uc3RyYWludHMgc2hpbS5cclxuICB2YXIgZ2V0VXNlck1lZGlhXyA9IGZ1bmN0aW9uKGNvbnN0cmFpbnRzLCBvblN1Y2Nlc3MsIG9uRXJyb3IpIHtcclxuICAgIHZhciBjb25zdHJhaW50c1RvRkYzN18gPSBmdW5jdGlvbihjKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgYyAhPT0gJ29iamVjdCcgfHwgYy5yZXF1aXJlKSB7XHJcbiAgICAgICAgcmV0dXJuIGM7XHJcbiAgICAgIH1cclxuICAgICAgdmFyIHJlcXVpcmUgPSBbXTtcclxuICAgICAgT2JqZWN0LmtleXMoYykuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcclxuICAgICAgICBpZiAoa2V5ID09PSAncmVxdWlyZScgfHwga2V5ID09PSAnYWR2YW5jZWQnIHx8IGtleSA9PT0gJ21lZGlhU291cmNlJykge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgciA9IGNba2V5XSA9ICh0eXBlb2YgY1trZXldID09PSAnb2JqZWN0JykgP1xyXG4gICAgICAgICAgICBjW2tleV0gOiB7aWRlYWw6IGNba2V5XX07XHJcbiAgICAgICAgaWYgKHIubWluICE9PSB1bmRlZmluZWQgfHxcclxuICAgICAgICAgICAgci5tYXggIT09IHVuZGVmaW5lZCB8fCByLmV4YWN0ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHJlcXVpcmUucHVzaChrZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoci5leGFjdCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIHIuZXhhY3QgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIHIuIG1pbiA9IHIubWF4ID0gci5leGFjdDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNba2V5XSA9IHIuZXhhY3Q7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBkZWxldGUgci5leGFjdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHIuaWRlYWwgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgYy5hZHZhbmNlZCA9IGMuYWR2YW5jZWQgfHwgW107XHJcbiAgICAgICAgICB2YXIgb2MgPSB7fTtcclxuICAgICAgICAgIGlmICh0eXBlb2Ygci5pZGVhbCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgb2Nba2V5XSA9IHttaW46IHIuaWRlYWwsIG1heDogci5pZGVhbH07XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBvY1trZXldID0gci5pZGVhbDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGMuYWR2YW5jZWQucHVzaChvYyk7XHJcbiAgICAgICAgICBkZWxldGUgci5pZGVhbDtcclxuICAgICAgICAgIGlmICghT2JqZWN0LmtleXMocikubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBjW2tleV07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgaWYgKHJlcXVpcmUubGVuZ3RoKSB7XHJcbiAgICAgICAgYy5yZXF1aXJlID0gcmVxdWlyZTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gYztcclxuICAgIH07XHJcbiAgICBjb25zdHJhaW50cyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoY29uc3RyYWludHMpKTtcclxuICAgIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgMzgpIHtcclxuICAgICAgbG9nZ2luZygnc3BlYzogJyArIEpTT04uc3RyaW5naWZ5KGNvbnN0cmFpbnRzKSk7XHJcbiAgICAgIGlmIChjb25zdHJhaW50cy5hdWRpbykge1xyXG4gICAgICAgIGNvbnN0cmFpbnRzLmF1ZGlvID0gY29uc3RyYWludHNUb0ZGMzdfKGNvbnN0cmFpbnRzLmF1ZGlvKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY29uc3RyYWludHMudmlkZW8pIHtcclxuICAgICAgICBjb25zdHJhaW50cy52aWRlbyA9IGNvbnN0cmFpbnRzVG9GRjM3Xyhjb25zdHJhaW50cy52aWRlbyk7XHJcbiAgICAgIH1cclxuICAgICAgbG9nZ2luZygnZmYzNzogJyArIEpTT04uc3RyaW5naWZ5KGNvbnN0cmFpbnRzKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmF2aWdhdG9yLm1vekdldFVzZXJNZWRpYShjb25zdHJhaW50cywgb25TdWNjZXNzLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgIG9uRXJyb3Ioc2hpbUVycm9yXyhlKSk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICAvLyBSZXR1cm5zIHRoZSByZXN1bHQgb2YgZ2V0VXNlck1lZGlhIGFzIGEgUHJvbWlzZS5cclxuICB2YXIgZ2V0VXNlck1lZGlhUHJvbWlzZV8gPSBmdW5jdGlvbihjb25zdHJhaW50cykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICBnZXRVc2VyTWVkaWFfKGNvbnN0cmFpbnRzLCByZXNvbHZlLCByZWplY3QpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgLy8gU2hpbSBmb3IgbWVkaWFEZXZpY2VzIG9uIG9sZGVyIHZlcnNpb25zLlxyXG4gIGlmICghbmF2aWdhdG9yLm1lZGlhRGV2aWNlcykge1xyXG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcyA9IHtnZXRVc2VyTWVkaWE6IGdldFVzZXJNZWRpYVByb21pc2VfLFxyXG4gICAgICBhZGRFdmVudExpc3RlbmVyOiBmdW5jdGlvbigpIHsgfSxcclxuICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcjogZnVuY3Rpb24oKSB7IH1cclxuICAgIH07XHJcbiAgfVxyXG4gIG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlcyA9XHJcbiAgICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlcyB8fCBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xyXG4gICAgICAgICAgdmFyIGluZm9zID0gW1xyXG4gICAgICAgICAgICB7a2luZDogJ2F1ZGlvaW5wdXQnLCBkZXZpY2VJZDogJ2RlZmF1bHQnLCBsYWJlbDogJycsIGdyb3VwSWQ6ICcnfSxcclxuICAgICAgICAgICAge2tpbmQ6ICd2aWRlb2lucHV0JywgZGV2aWNlSWQ6ICdkZWZhdWx0JywgbGFiZWw6ICcnLCBncm91cElkOiAnJ31cclxuICAgICAgICAgIF07XHJcbiAgICAgICAgICByZXNvbHZlKGluZm9zKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfTtcclxuXHJcbiAgaWYgKGJyb3dzZXJEZXRhaWxzLnZlcnNpb24gPCA0MSkge1xyXG4gICAgLy8gV29yayBhcm91bmQgaHR0cDovL2J1Z3ppbC5sYS8xMTY5NjY1XHJcbiAgICB2YXIgb3JnRW51bWVyYXRlRGV2aWNlcyA9XHJcbiAgICAgICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzLmJpbmQobmF2aWdhdG9yLm1lZGlhRGV2aWNlcyk7XHJcbiAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmVudW1lcmF0ZURldmljZXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIG9yZ0VudW1lcmF0ZURldmljZXMoKS50aGVuKHVuZGVmaW5lZCwgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmIChlLm5hbWUgPT09ICdOb3RGb3VuZEVycm9yJykge1xyXG4gICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aHJvdyBlO1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcbiAgfVxyXG4gIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgNDkpIHtcclxuICAgIHZhciBvcmlnR2V0VXNlck1lZGlhID0gbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEuXHJcbiAgICAgICAgYmluZChuYXZpZ2F0b3IubWVkaWFEZXZpY2VzKTtcclxuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhID0gZnVuY3Rpb24oYykge1xyXG4gICAgICByZXR1cm4gb3JpZ0dldFVzZXJNZWRpYShjKS50aGVuKGZ1bmN0aW9uKHN0cmVhbSkge1xyXG4gICAgICAgIC8vIFdvcmsgYXJvdW5kIGh0dHBzOi8vYnVnemlsLmxhLzgwMjMyNlxyXG4gICAgICAgIGlmIChjLmF1ZGlvICYmICFzdHJlYW0uZ2V0QXVkaW9UcmFja3MoKS5sZW5ndGggfHxcclxuICAgICAgICAgICAgYy52aWRlbyAmJiAhc3RyZWFtLmdldFZpZGVvVHJhY2tzKCkubGVuZ3RoKSB7XHJcbiAgICAgICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xyXG4gICAgICAgICAgICB0cmFjay5zdG9wKCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHRocm93IG5ldyBET01FeGNlcHRpb24oJ1RoZSBvYmplY3QgY2FuIG5vdCBiZSBmb3VuZCBoZXJlLicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdOb3RGb3VuZEVycm9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdHJlYW07XHJcbiAgICAgIH0sIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3Qoc2hpbUVycm9yXyhlKSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuICB9XHJcbiAgaWYgKCEoYnJvd3NlckRldGFpbHMudmVyc2lvbiA+IDU1ICYmXHJcbiAgICAgICdhdXRvR2FpbkNvbnRyb2wnIGluIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0U3VwcG9ydGVkQ29uc3RyYWludHMoKSkpIHtcclxuICAgIHZhciByZW1hcCA9IGZ1bmN0aW9uKG9iaiwgYSwgYikge1xyXG4gICAgICBpZiAoYSBpbiBvYmogJiYgIShiIGluIG9iaikpIHtcclxuICAgICAgICBvYmpbYl0gPSBvYmpbYV07XHJcbiAgICAgICAgZGVsZXRlIG9ialthXTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgbmF0aXZlR2V0VXNlck1lZGlhID0gbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEuXHJcbiAgICAgICAgYmluZChuYXZpZ2F0b3IubWVkaWFEZXZpY2VzKTtcclxuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhID0gZnVuY3Rpb24oYykge1xyXG4gICAgICBpZiAodHlwZW9mIGMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBjLmF1ZGlvID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIGMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGMpKTtcclxuICAgICAgICByZW1hcChjLmF1ZGlvLCAnYXV0b0dhaW5Db250cm9sJywgJ21vekF1dG9HYWluQ29udHJvbCcpO1xyXG4gICAgICAgIHJlbWFwKGMuYXVkaW8sICdub2lzZVN1cHByZXNzaW9uJywgJ21vek5vaXNlU3VwcHJlc3Npb24nKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbmF0aXZlR2V0VXNlck1lZGlhKGMpO1xyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoTWVkaWFTdHJlYW1UcmFjayAmJiBNZWRpYVN0cmVhbVRyYWNrLnByb3RvdHlwZS5nZXRTZXR0aW5ncykge1xyXG4gICAgICB2YXIgbmF0aXZlR2V0U2V0dGluZ3MgPSBNZWRpYVN0cmVhbVRyYWNrLnByb3RvdHlwZS5nZXRTZXR0aW5ncztcclxuICAgICAgTWVkaWFTdHJlYW1UcmFjay5wcm90b3R5cGUuZ2V0U2V0dGluZ3MgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgb2JqID0gbmF0aXZlR2V0U2V0dGluZ3MuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICByZW1hcChvYmosICdtb3pBdXRvR2FpbkNvbnRyb2wnLCAnYXV0b0dhaW5Db250cm9sJyk7XHJcbiAgICAgICAgcmVtYXAob2JqLCAnbW96Tm9pc2VTdXBwcmVzc2lvbicsICdub2lzZVN1cHByZXNzaW9uJyk7XHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoTWVkaWFTdHJlYW1UcmFjayAmJiBNZWRpYVN0cmVhbVRyYWNrLnByb3RvdHlwZS5hcHBseUNvbnN0cmFpbnRzKSB7XHJcbiAgICAgIHZhciBuYXRpdmVBcHBseUNvbnN0cmFpbnRzID0gTWVkaWFTdHJlYW1UcmFjay5wcm90b3R5cGUuYXBwbHlDb25zdHJhaW50cztcclxuICAgICAgTWVkaWFTdHJlYW1UcmFjay5wcm90b3R5cGUuYXBwbHlDb25zdHJhaW50cyA9IGZ1bmN0aW9uKGMpIHtcclxuICAgICAgICBpZiAodGhpcy5raW5kID09PSAnYXVkaW8nICYmIHR5cGVvZiBjID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgYyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYykpO1xyXG4gICAgICAgICAgcmVtYXAoYywgJ2F1dG9HYWluQ29udHJvbCcsICdtb3pBdXRvR2FpbkNvbnRyb2wnKTtcclxuICAgICAgICAgIHJlbWFwKGMsICdub2lzZVN1cHByZXNzaW9uJywgJ21vek5vaXNlU3VwcHJlc3Npb24nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5hdGl2ZUFwcGx5Q29uc3RyYWludHMuYXBwbHkodGhpcywgW2NdKTtcclxuICAgICAgfTtcclxuICAgIH1cclxuICB9XHJcbiAgbmF2aWdhdG9yLmdldFVzZXJNZWRpYSA9IGZ1bmN0aW9uKGNvbnN0cmFpbnRzLCBvblN1Y2Nlc3MsIG9uRXJyb3IpIHtcclxuICAgIGlmIChicm93c2VyRGV0YWlscy52ZXJzaW9uIDwgNDQpIHtcclxuICAgICAgcmV0dXJuIGdldFVzZXJNZWRpYV8oY29uc3RyYWludHMsIG9uU3VjY2Vzcywgb25FcnJvcik7XHJcbiAgICB9XHJcbiAgICAvLyBSZXBsYWNlIEZpcmVmb3ggNDQrJ3MgZGVwcmVjYXRpb24gd2FybmluZyB3aXRoIHVucHJlZml4ZWQgdmVyc2lvbi5cclxuICAgIHV0aWxzLmRlcHJlY2F0ZWQoJ25hdmlnYXRvci5nZXRVc2VyTWVkaWEnLFxyXG4gICAgICAgICduYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYScpO1xyXG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoY29uc3RyYWludHMpLnRoZW4ob25TdWNjZXNzLCBvbkVycm9yKTtcclxuICB9O1xyXG59O1xyXG5cclxufSx7XCIuLi91dGlsc1wiOjEzfV0sMTI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG4vKlxyXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKlxyXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxyXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXHJcbiAqICB0cmVlLlxyXG4gKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgc2hpbUxvY2FsU3RyZWFtc0FQSTogZnVuY3Rpb24od2luZG93KSB7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ29iamVjdCcgfHwgIXdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoISgnZ2V0TG9jYWxTdHJlYW1zJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xyXG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldExvY2FsU3RyZWFtcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbG9jYWxTdHJlYW1zKSB7XHJcbiAgICAgICAgICB0aGlzLl9sb2NhbFN0cmVhbXMgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsU3RyZWFtcztcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIGlmICghKCdnZXRTdHJlYW1CeUlkJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xyXG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmdldFN0cmVhbUJ5SWQgPSBmdW5jdGlvbihpZCkge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBudWxsO1xyXG4gICAgICAgIGlmICh0aGlzLl9sb2NhbFN0cmVhbXMpIHtcclxuICAgICAgICAgIHRoaXMuX2xvY2FsU3RyZWFtcy5mb3JFYWNoKGZ1bmN0aW9uKHN0cmVhbSkge1xyXG4gICAgICAgICAgICBpZiAoc3RyZWFtLmlkID09PSBpZCkge1xyXG4gICAgICAgICAgICAgIHJlc3VsdCA9IHN0cmVhbTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9yZW1vdGVTdHJlYW1zKSB7XHJcbiAgICAgICAgICB0aGlzLl9yZW1vdGVTdHJlYW1zLmZvckVhY2goZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICAgICAgICAgIGlmIChzdHJlYW0uaWQgPT09IGlkKSB7XHJcbiAgICAgICAgICAgICAgcmVzdWx0ID0gc3RyZWFtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIGlmICghKCdhZGRTdHJlYW0nIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XHJcbiAgICAgIHZhciBfYWRkVHJhY2sgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFRyYWNrO1xyXG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbG9jYWxTdHJlYW1zKSB7XHJcbiAgICAgICAgICB0aGlzLl9sb2NhbFN0cmVhbXMgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2xvY2FsU3RyZWFtcy5pbmRleE9mKHN0cmVhbSkgPT09IC0xKSB7XHJcbiAgICAgICAgICB0aGlzLl9sb2NhbFN0cmVhbXMucHVzaChzdHJlYW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcGMgPSB0aGlzO1xyXG4gICAgICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XHJcbiAgICAgICAgICBfYWRkVHJhY2suY2FsbChwYywgdHJhY2ssIHN0cmVhbSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFRyYWNrID0gZnVuY3Rpb24odHJhY2ssIHN0cmVhbSkge1xyXG4gICAgICAgIGlmIChzdHJlYW0pIHtcclxuICAgICAgICAgIGlmICghdGhpcy5fbG9jYWxTdHJlYW1zKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvY2FsU3RyZWFtcyA9IFtzdHJlYW1dO1xyXG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9sb2NhbFN0cmVhbXMuaW5kZXhPZihzdHJlYW0pID09PSAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9sb2NhbFN0cmVhbXMucHVzaChzdHJlYW0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gX2FkZFRyYWNrLmNhbGwodGhpcywgdHJhY2ssIHN0cmVhbSk7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICBpZiAoISgncmVtb3ZlU3RyZWFtJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlKSkge1xyXG4gICAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnJlbW92ZVN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xyXG4gICAgICAgIGlmICghdGhpcy5fbG9jYWxTdHJlYW1zKSB7XHJcbiAgICAgICAgICB0aGlzLl9sb2NhbFN0cmVhbXMgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5fbG9jYWxTdHJlYW1zLmluZGV4T2Yoc3RyZWFtKTtcclxuICAgICAgICBpZiAoaW5kZXggPT09IC0xKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2xvY2FsU3RyZWFtcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHRyYWNrcyA9IHN0cmVhbS5nZXRUcmFja3MoKTtcclxuICAgICAgICB0aGlzLmdldFNlbmRlcnMoKS5mb3JFYWNoKGZ1bmN0aW9uKHNlbmRlcikge1xyXG4gICAgICAgICAgaWYgKHRyYWNrcy5pbmRleE9mKHNlbmRlci50cmFjaykgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIHBjLnJlbW92ZVRyYWNrKHNlbmRlcik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgfSxcclxuICBzaGltUmVtb3RlU3RyZWFtc0FQSTogZnVuY3Rpb24od2luZG93KSB7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ29iamVjdCcgfHwgIXdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoISgnZ2V0UmVtb3RlU3RyZWFtcycgaW4gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSkpIHtcclxuICAgICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5nZXRSZW1vdGVTdHJlYW1zID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlbW90ZVN0cmVhbXMgPyB0aGlzLl9yZW1vdGVTdHJlYW1zIDogW107XHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICBpZiAoISgnb25hZGRzdHJlYW0nIGluIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUpKSB7XHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLCAnb25hZGRzdHJlYW0nLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLl9vbmFkZHN0cmVhbTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldDogZnVuY3Rpb24oZikge1xyXG4gICAgICAgICAgdmFyIHBjID0gdGhpcztcclxuICAgICAgICAgIGlmICh0aGlzLl9vbmFkZHN0cmVhbSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2FkZHN0cmVhbScsIHRoaXMuX29uYWRkc3RyZWFtKTtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFjaycsIHRoaXMuX29uYWRkc3RyZWFtcG9seSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2FkZHN0cmVhbScsIHRoaXMuX29uYWRkc3RyZWFtID0gZik7XHJcbiAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYWNrJywgdGhpcy5fb25hZGRzdHJlYW1wb2x5ID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnN0cmVhbXMuZm9yRWFjaChmdW5jdGlvbihzdHJlYW0pIHtcclxuICAgICAgICAgICAgICBpZiAoIXBjLl9yZW1vdGVTdHJlYW1zKSB7XHJcbiAgICAgICAgICAgICAgICBwYy5fcmVtb3RlU3RyZWFtcyA9IFtdO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBpZiAocGMuX3JlbW90ZVN0cmVhbXMuaW5kZXhPZihzdHJlYW0pID49IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgcGMuX3JlbW90ZVN0cmVhbXMucHVzaChzdHJlYW0pO1xyXG4gICAgICAgICAgICAgIHZhciBldmVudCA9IG5ldyBFdmVudCgnYWRkc3RyZWFtJyk7XHJcbiAgICAgICAgICAgICAgZXZlbnQuc3RyZWFtID0gc3RyZWFtO1xyXG4gICAgICAgICAgICAgIHBjLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBzaGltQ2FsbGJhY2tzQVBJOiBmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAnb2JqZWN0JyB8fCAhd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHZhciBwcm90b3R5cGUgPSB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlO1xyXG4gICAgdmFyIGNyZWF0ZU9mZmVyID0gcHJvdG90eXBlLmNyZWF0ZU9mZmVyO1xyXG4gICAgdmFyIGNyZWF0ZUFuc3dlciA9IHByb3RvdHlwZS5jcmVhdGVBbnN3ZXI7XHJcbiAgICB2YXIgc2V0TG9jYWxEZXNjcmlwdGlvbiA9IHByb3RvdHlwZS5zZXRMb2NhbERlc2NyaXB0aW9uO1xyXG4gICAgdmFyIHNldFJlbW90ZURlc2NyaXB0aW9uID0gcHJvdG90eXBlLnNldFJlbW90ZURlc2NyaXB0aW9uO1xyXG4gICAgdmFyIGFkZEljZUNhbmRpZGF0ZSA9IHByb3RvdHlwZS5hZGRJY2VDYW5kaWRhdGU7XHJcblxyXG4gICAgcHJvdG90eXBlLmNyZWF0ZU9mZmVyID0gZnVuY3Rpb24oc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spIHtcclxuICAgICAgdmFyIG9wdGlvbnMgPSAoYXJndW1lbnRzLmxlbmd0aCA+PSAyKSA/IGFyZ3VtZW50c1syXSA6IGFyZ3VtZW50c1swXTtcclxuICAgICAgdmFyIHByb21pc2UgPSBjcmVhdGVPZmZlci5hcHBseSh0aGlzLCBbb3B0aW9uc10pO1xyXG4gICAgICBpZiAoIWZhaWx1cmVDYWxsYmFjaykge1xyXG4gICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgICB9XHJcbiAgICAgIHByb21pc2UudGhlbihzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjayk7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgIH07XHJcblxyXG4gICAgcHJvdG90eXBlLmNyZWF0ZUFuc3dlciA9IGZ1bmN0aW9uKHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKSB7XHJcbiAgICAgIHZhciBvcHRpb25zID0gKGFyZ3VtZW50cy5sZW5ndGggPj0gMikgPyBhcmd1bWVudHNbMl0gOiBhcmd1bWVudHNbMF07XHJcbiAgICAgIHZhciBwcm9taXNlID0gY3JlYXRlQW5zd2VyLmFwcGx5KHRoaXMsIFtvcHRpb25zXSk7XHJcbiAgICAgIGlmICghZmFpbHVyZUNhbGxiYWNrKSB7XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICAgIH1cclxuICAgICAgcHJvbWlzZS50aGVuKHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKTtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgd2l0aENhbGxiYWNrID0gZnVuY3Rpb24oZGVzY3JpcHRpb24sIHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKSB7XHJcbiAgICAgIHZhciBwcm9taXNlID0gc2V0TG9jYWxEZXNjcmlwdGlvbi5hcHBseSh0aGlzLCBbZGVzY3JpcHRpb25dKTtcclxuICAgICAgaWYgKCFmYWlsdXJlQ2FsbGJhY2spIHtcclxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgICAgfVxyXG4gICAgICBwcm9taXNlLnRoZW4oc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spO1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICB9O1xyXG4gICAgcHJvdG90eXBlLnNldExvY2FsRGVzY3JpcHRpb24gPSB3aXRoQ2FsbGJhY2s7XHJcblxyXG4gICAgd2l0aENhbGxiYWNrID0gZnVuY3Rpb24oZGVzY3JpcHRpb24sIHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKSB7XHJcbiAgICAgIHZhciBwcm9taXNlID0gc2V0UmVtb3RlRGVzY3JpcHRpb24uYXBwbHkodGhpcywgW2Rlc2NyaXB0aW9uXSk7XHJcbiAgICAgIGlmICghZmFpbHVyZUNhbGxiYWNrKSB7XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICAgIH1cclxuICAgICAgcHJvbWlzZS50aGVuKHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKTtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgfTtcclxuICAgIHByb3RvdHlwZS5zZXRSZW1vdGVEZXNjcmlwdGlvbiA9IHdpdGhDYWxsYmFjaztcclxuXHJcbiAgICB3aXRoQ2FsbGJhY2sgPSBmdW5jdGlvbihjYW5kaWRhdGUsIHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKSB7XHJcbiAgICAgIHZhciBwcm9taXNlID0gYWRkSWNlQ2FuZGlkYXRlLmFwcGx5KHRoaXMsIFtjYW5kaWRhdGVdKTtcclxuICAgICAgaWYgKCFmYWlsdXJlQ2FsbGJhY2spIHtcclxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgICAgfVxyXG4gICAgICBwcm9taXNlLnRoZW4oc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spO1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICB9O1xyXG4gICAgcHJvdG90eXBlLmFkZEljZUNhbmRpZGF0ZSA9IHdpdGhDYWxsYmFjaztcclxuICB9LFxyXG4gIHNoaW1HZXRVc2VyTWVkaWE6IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgdmFyIG5hdmlnYXRvciA9IHdpbmRvdyAmJiB3aW5kb3cubmF2aWdhdG9yO1xyXG5cclxuICAgIGlmICghbmF2aWdhdG9yLmdldFVzZXJNZWRpYSkge1xyXG4gICAgICBpZiAobmF2aWdhdG9yLndlYmtpdEdldFVzZXJNZWRpYSkge1xyXG4gICAgICAgIG5hdmlnYXRvci5nZXRVc2VyTWVkaWEgPSBuYXZpZ2F0b3Iud2Via2l0R2V0VXNlck1lZGlhLmJpbmQobmF2aWdhdG9yKTtcclxuICAgICAgfSBlbHNlIGlmIChuYXZpZ2F0b3IubWVkaWFEZXZpY2VzICYmXHJcbiAgICAgICAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSkge1xyXG4gICAgICAgIG5hdmlnYXRvci5nZXRVc2VyTWVkaWEgPSBmdW5jdGlvbihjb25zdHJhaW50cywgY2IsIGVycmNiKSB7XHJcbiAgICAgICAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYShjb25zdHJhaW50cylcclxuICAgICAgICAgIC50aGVuKGNiLCBlcnJjYik7XHJcbiAgICAgICAgfS5iaW5kKG5hdmlnYXRvcik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHNoaW1SVENJY2VTZXJ2ZXJVcmxzOiBmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIC8vIG1pZ3JhdGUgZnJvbSBub24tc3BlYyBSVENJY2VTZXJ2ZXIudXJsIHRvIFJUQ0ljZVNlcnZlci51cmxzXHJcbiAgICB2YXIgT3JpZ1BlZXJDb25uZWN0aW9uID0gd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uO1xyXG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uID0gZnVuY3Rpb24ocGNDb25maWcsIHBjQ29uc3RyYWludHMpIHtcclxuICAgICAgaWYgKHBjQ29uZmlnICYmIHBjQ29uZmlnLmljZVNlcnZlcnMpIHtcclxuICAgICAgICB2YXIgbmV3SWNlU2VydmVycyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGNDb25maWcuaWNlU2VydmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgdmFyIHNlcnZlciA9IHBjQ29uZmlnLmljZVNlcnZlcnNbaV07XHJcbiAgICAgICAgICBpZiAoIXNlcnZlci5oYXNPd25Qcm9wZXJ0eSgndXJscycpICYmXHJcbiAgICAgICAgICAgICAgc2VydmVyLmhhc093blByb3BlcnR5KCd1cmwnKSkge1xyXG4gICAgICAgICAgICB1dGlscy5kZXByZWNhdGVkKCdSVENJY2VTZXJ2ZXIudXJsJywgJ1JUQ0ljZVNlcnZlci51cmxzJyk7XHJcbiAgICAgICAgICAgIHNlcnZlciA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoc2VydmVyKSk7XHJcbiAgICAgICAgICAgIHNlcnZlci51cmxzID0gc2VydmVyLnVybDtcclxuICAgICAgICAgICAgZGVsZXRlIHNlcnZlci51cmw7XHJcbiAgICAgICAgICAgIG5ld0ljZVNlcnZlcnMucHVzaChzZXJ2ZXIpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbmV3SWNlU2VydmVycy5wdXNoKHBjQ29uZmlnLmljZVNlcnZlcnNbaV0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwY0NvbmZpZy5pY2VTZXJ2ZXJzID0gbmV3SWNlU2VydmVycztcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbmV3IE9yaWdQZWVyQ29ubmVjdGlvbihwY0NvbmZpZywgcGNDb25zdHJhaW50cyk7XHJcbiAgICB9O1xyXG4gICAgd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZSA9IE9yaWdQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGU7XHJcbiAgICAvLyB3cmFwIHN0YXRpYyBtZXRob2RzLiBDdXJyZW50bHkganVzdCBnZW5lcmF0ZUNlcnRpZmljYXRlLlxyXG4gICAgaWYgKCdnZW5lcmF0ZUNlcnRpZmljYXRlJyBpbiB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24pIHtcclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiwgJ2dlbmVyYXRlQ2VydGlmaWNhdGUnLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHJldHVybiBPcmlnUGVlckNvbm5lY3Rpb24uZ2VuZXJhdGVDZXJ0aWZpY2F0ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2hpbVRyYWNrRXZlbnRUcmFuc2NlaXZlcjogZnVuY3Rpb24od2luZG93KSB7XHJcbiAgICAvLyBBZGQgZXZlbnQudHJhbnNjZWl2ZXIgbWVtYmVyIG92ZXIgZGVwcmVjYXRlZCBldmVudC5yZWNlaXZlclxyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnICYmIHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbiAmJlxyXG4gICAgICAgICgncmVjZWl2ZXInIGluIHdpbmRvdy5SVENUcmFja0V2ZW50LnByb3RvdHlwZSkgJiZcclxuICAgICAgICAvLyBjYW4ndCBjaGVjayAndHJhbnNjZWl2ZXInIGluIHdpbmRvdy5SVENUcmFja0V2ZW50LnByb3RvdHlwZSwgYXMgaXQgaXNcclxuICAgICAgICAvLyBkZWZpbmVkIGZvciBzb21lIHJlYXNvbiBldmVuIHdoZW4gd2luZG93LlJUQ1RyYW5zY2VpdmVyIGlzIG5vdC5cclxuICAgICAgICAhd2luZG93LlJUQ1RyYW5zY2VpdmVyKSB7XHJcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3aW5kb3cuUlRDVHJhY2tFdmVudC5wcm90b3R5cGUsICd0cmFuc2NlaXZlcicsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHtyZWNlaXZlcjogdGhpcy5yZWNlaXZlcn07XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBzaGltQ3JlYXRlT2ZmZXJMZWdhY3k6IGZ1bmN0aW9uKHdpbmRvdykge1xyXG4gICAgdmFyIG9yaWdDcmVhdGVPZmZlciA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlT2ZmZXI7XHJcbiAgICB3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmNyZWF0ZU9mZmVyID0gZnVuY3Rpb24ob2ZmZXJPcHRpb25zKSB7XHJcbiAgICAgIHZhciBwYyA9IHRoaXM7XHJcbiAgICAgIGlmIChvZmZlck9wdGlvbnMpIHtcclxuICAgICAgICBpZiAodHlwZW9mIG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZUF1ZGlvICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgLy8gc3VwcG9ydCBiaXQgdmFsdWVzXHJcbiAgICAgICAgICBvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbyA9ICEhb2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlQXVkaW87XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBhdWRpb1RyYW5zY2VpdmVyID0gcGMuZ2V0VHJhbnNjZWl2ZXJzKCkuZmluZChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xyXG4gICAgICAgICAgcmV0dXJuIHRyYW5zY2VpdmVyLnNlbmRlci50cmFjayAmJlxyXG4gICAgICAgICAgICAgIHRyYW5zY2VpdmVyLnNlbmRlci50cmFjay5raW5kID09PSAnYXVkaW8nO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVBdWRpbyA9PT0gZmFsc2UgJiYgYXVkaW9UcmFuc2NlaXZlcikge1xyXG4gICAgICAgICAgaWYgKGF1ZGlvVHJhbnNjZWl2ZXIuZGlyZWN0aW9uID09PSAnc2VuZHJlY3YnKSB7XHJcbiAgICAgICAgICAgIGlmIChhdWRpb1RyYW5zY2VpdmVyLnNldERpcmVjdGlvbikge1xyXG4gICAgICAgICAgICAgIGF1ZGlvVHJhbnNjZWl2ZXIuc2V0RGlyZWN0aW9uKCdzZW5kb25seScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGF1ZGlvVHJhbnNjZWl2ZXIuZGlyZWN0aW9uID0gJ3NlbmRvbmx5JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIGlmIChhdWRpb1RyYW5zY2VpdmVyLmRpcmVjdGlvbiA9PT0gJ3JlY3Zvbmx5Jykge1xyXG4gICAgICAgICAgICBpZiAoYXVkaW9UcmFuc2NlaXZlci5zZXREaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgICBhdWRpb1RyYW5zY2VpdmVyLnNldERpcmVjdGlvbignaW5hY3RpdmUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBhdWRpb1RyYW5zY2VpdmVyLmRpcmVjdGlvbiA9ICdpbmFjdGl2ZSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZUF1ZGlvID09PSB0cnVlICYmXHJcbiAgICAgICAgICAgICFhdWRpb1RyYW5zY2VpdmVyKSB7XHJcbiAgICAgICAgICBwYy5hZGRUcmFuc2NlaXZlcignYXVkaW8nKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZUF1ZGlvICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgLy8gc3VwcG9ydCBiaXQgdmFsdWVzXHJcbiAgICAgICAgICBvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVWaWRlbyA9ICEhb2ZmZXJPcHRpb25zLm9mZmVyVG9SZWNlaXZlVmlkZW87XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciB2aWRlb1RyYW5zY2VpdmVyID0gcGMuZ2V0VHJhbnNjZWl2ZXJzKCkuZmluZChmdW5jdGlvbih0cmFuc2NlaXZlcikge1xyXG4gICAgICAgICAgcmV0dXJuIHRyYW5zY2VpdmVyLnNlbmRlci50cmFjayAmJlxyXG4gICAgICAgICAgICAgIHRyYW5zY2VpdmVyLnNlbmRlci50cmFjay5raW5kID09PSAndmlkZW8nO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChvZmZlck9wdGlvbnMub2ZmZXJUb1JlY2VpdmVWaWRlbyA9PT0gZmFsc2UgJiYgdmlkZW9UcmFuc2NlaXZlcikge1xyXG4gICAgICAgICAgaWYgKHZpZGVvVHJhbnNjZWl2ZXIuZGlyZWN0aW9uID09PSAnc2VuZHJlY3YnKSB7XHJcbiAgICAgICAgICAgIHZpZGVvVHJhbnNjZWl2ZXIuc2V0RGlyZWN0aW9uKCdzZW5kb25seScpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmICh2aWRlb1RyYW5zY2VpdmVyLmRpcmVjdGlvbiA9PT0gJ3JlY3Zvbmx5Jykge1xyXG4gICAgICAgICAgICB2aWRlb1RyYW5zY2VpdmVyLnNldERpcmVjdGlvbignaW5hY3RpdmUnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKG9mZmVyT3B0aW9ucy5vZmZlclRvUmVjZWl2ZVZpZGVvID09PSB0cnVlICYmXHJcbiAgICAgICAgICAgICF2aWRlb1RyYW5zY2VpdmVyKSB7XHJcbiAgICAgICAgICBwYy5hZGRUcmFuc2NlaXZlcigndmlkZW8nKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG9yaWdDcmVhdGVPZmZlci5hcHBseShwYywgYXJndW1lbnRzKTtcclxuICAgIH07XHJcbiAgfVxyXG59O1xyXG5cclxufSx7XCIuLi91dGlsc1wiOjEzfV0sMTM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xyXG4vKlxyXG4gKiAgQ29weXJpZ2h0IChjKSAyMDE2IFRoZSBXZWJSVEMgcHJvamVjdCBhdXRob3JzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxyXG4gKlxyXG4gKiAgVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYSBCU0Qtc3R5bGUgbGljZW5zZVxyXG4gKiAgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBvZiB0aGUgc291cmNlXHJcbiAqICB0cmVlLlxyXG4gKi9cclxuIC8qIGVzbGludC1lbnYgbm9kZSAqL1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG52YXIgbG9nRGlzYWJsZWRfID0gdHJ1ZTtcclxudmFyIGRlcHJlY2F0aW9uV2FybmluZ3NfID0gdHJ1ZTtcclxuXHJcbi8qKlxyXG4gKiBFeHRyYWN0IGJyb3dzZXIgdmVyc2lvbiBvdXQgb2YgdGhlIHByb3ZpZGVkIHVzZXIgYWdlbnQgc3RyaW5nLlxyXG4gKlxyXG4gKiBAcGFyYW0geyFzdHJpbmd9IHVhc3RyaW5nIHVzZXJBZ2VudCBzdHJpbmcuXHJcbiAqIEBwYXJhbSB7IXN0cmluZ30gZXhwciBSZWd1bGFyIGV4cHJlc3Npb24gdXNlZCBhcyBtYXRjaCBjcml0ZXJpYS5cclxuICogQHBhcmFtIHshbnVtYmVyfSBwb3MgcG9zaXRpb24gaW4gdGhlIHZlcnNpb24gc3RyaW5nIHRvIGJlIHJldHVybmVkLlxyXG4gKiBAcmV0dXJuIHshbnVtYmVyfSBicm93c2VyIHZlcnNpb24uXHJcbiAqL1xyXG5mdW5jdGlvbiBleHRyYWN0VmVyc2lvbih1YXN0cmluZywgZXhwciwgcG9zKSB7XHJcbiAgdmFyIG1hdGNoID0gdWFzdHJpbmcubWF0Y2goZXhwcik7XHJcbiAgcmV0dXJuIG1hdGNoICYmIG1hdGNoLmxlbmd0aCA+PSBwb3MgJiYgcGFyc2VJbnQobWF0Y2hbcG9zXSwgMTApO1xyXG59XHJcblxyXG4vLyBXcmFwcyB0aGUgcGVlcmNvbm5lY3Rpb24gZXZlbnQgZXZlbnROYW1lVG9XcmFwIGluIGEgZnVuY3Rpb25cclxuLy8gd2hpY2ggcmV0dXJucyB0aGUgbW9kaWZpZWQgZXZlbnQgb2JqZWN0LlxyXG5mdW5jdGlvbiB3cmFwUGVlckNvbm5lY3Rpb25FdmVudCh3aW5kb3csIGV2ZW50TmFtZVRvV3JhcCwgd3JhcHBlcikge1xyXG4gIGlmICghd2luZG93LlJUQ1BlZXJDb25uZWN0aW9uKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIHZhciBwcm90byA9IHdpbmRvdy5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGU7XHJcbiAgdmFyIG5hdGl2ZUFkZEV2ZW50TGlzdGVuZXIgPSBwcm90by5hZGRFdmVudExpc3RlbmVyO1xyXG4gIHByb3RvLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihuYXRpdmVFdmVudE5hbWUsIGNiKSB7XHJcbiAgICBpZiAobmF0aXZlRXZlbnROYW1lICE9PSBldmVudE5hbWVUb1dyYXApIHtcclxuICAgICAgcmV0dXJuIG5hdGl2ZUFkZEV2ZW50TGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgIH1cclxuICAgIHZhciB3cmFwcGVkQ2FsbGJhY2sgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgIGNiKHdyYXBwZXIoZSkpO1xyXG4gICAgfTtcclxuICAgIHRoaXMuX2V2ZW50TWFwID0gdGhpcy5fZXZlbnRNYXAgfHwge307XHJcbiAgICB0aGlzLl9ldmVudE1hcFtjYl0gPSB3cmFwcGVkQ2FsbGJhY2s7XHJcbiAgICByZXR1cm4gbmF0aXZlQWRkRXZlbnRMaXN0ZW5lci5hcHBseSh0aGlzLCBbbmF0aXZlRXZlbnROYW1lLFxyXG4gICAgICB3cmFwcGVkQ2FsbGJhY2tdKTtcclxuICB9O1xyXG5cclxuICB2YXIgbmF0aXZlUmVtb3ZlRXZlbnRMaXN0ZW5lciA9IHByb3RvLnJlbW92ZUV2ZW50TGlzdGVuZXI7XHJcbiAgcHJvdG8ucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKG5hdGl2ZUV2ZW50TmFtZSwgY2IpIHtcclxuICAgIGlmIChuYXRpdmVFdmVudE5hbWUgIT09IGV2ZW50TmFtZVRvV3JhcCB8fCAhdGhpcy5fZXZlbnRNYXBcclxuICAgICAgICB8fCAhdGhpcy5fZXZlbnRNYXBbY2JdKSB7XHJcbiAgICAgIHJldHVybiBuYXRpdmVSZW1vdmVFdmVudExpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcbiAgICB2YXIgdW53cmFwcGVkQ2IgPSB0aGlzLl9ldmVudE1hcFtjYl07XHJcbiAgICBkZWxldGUgdGhpcy5fZXZlbnRNYXBbY2JdO1xyXG4gICAgcmV0dXJuIG5hdGl2ZVJlbW92ZUV2ZW50TGlzdGVuZXIuYXBwbHkodGhpcywgW25hdGl2ZUV2ZW50TmFtZSxcclxuICAgICAgdW53cmFwcGVkQ2JdKTtcclxuICB9O1xyXG5cclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICdvbicgKyBldmVudE5hbWVUb1dyYXAsIHtcclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiB0aGlzWydfb24nICsgZXZlbnROYW1lVG9XcmFwXTtcclxuICAgIH0sXHJcbiAgICBzZXQ6IGZ1bmN0aW9uKGNiKSB7XHJcbiAgICAgIGlmICh0aGlzWydfb24nICsgZXZlbnROYW1lVG9XcmFwXSkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWVUb1dyYXAsXHJcbiAgICAgICAgICAgIHRoaXNbJ19vbicgKyBldmVudE5hbWVUb1dyYXBdKTtcclxuICAgICAgICBkZWxldGUgdGhpc1snX29uJyArIGV2ZW50TmFtZVRvV3JhcF07XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGNiKSB7XHJcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZVRvV3JhcCxcclxuICAgICAgICAgICAgdGhpc1snX29uJyArIGV2ZW50TmFtZVRvV3JhcF0gPSBjYik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuLy8gVXRpbGl0eSBtZXRob2RzLlxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBleHRyYWN0VmVyc2lvbjogZXh0cmFjdFZlcnNpb24sXHJcbiAgd3JhcFBlZXJDb25uZWN0aW9uRXZlbnQ6IHdyYXBQZWVyQ29ubmVjdGlvbkV2ZW50LFxyXG4gIGRpc2FibGVMb2c6IGZ1bmN0aW9uKGJvb2wpIHtcclxuICAgIGlmICh0eXBlb2YgYm9vbCAhPT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoJ0FyZ3VtZW50IHR5cGU6ICcgKyB0eXBlb2YgYm9vbCArXHJcbiAgICAgICAgICAnLiBQbGVhc2UgdXNlIGEgYm9vbGVhbi4nKTtcclxuICAgIH1cclxuICAgIGxvZ0Rpc2FibGVkXyA9IGJvb2w7XHJcbiAgICByZXR1cm4gKGJvb2wpID8gJ2FkYXB0ZXIuanMgbG9nZ2luZyBkaXNhYmxlZCcgOlxyXG4gICAgICAgICdhZGFwdGVyLmpzIGxvZ2dpbmcgZW5hYmxlZCc7XHJcbiAgfSxcclxuXHJcbiAgLyoqXHJcbiAgICogRGlzYWJsZSBvciBlbmFibGUgZGVwcmVjYXRpb24gd2FybmluZ3NcclxuICAgKiBAcGFyYW0geyFib29sZWFufSBib29sIHNldCB0byB0cnVlIHRvIGRpc2FibGUgd2FybmluZ3MuXHJcbiAgICovXHJcbiAgZGlzYWJsZVdhcm5pbmdzOiBmdW5jdGlvbihib29sKSB7XHJcbiAgICBpZiAodHlwZW9mIGJvb2wgIT09ICdib29sZWFuJykge1xyXG4gICAgICByZXR1cm4gbmV3IEVycm9yKCdBcmd1bWVudCB0eXBlOiAnICsgdHlwZW9mIGJvb2wgK1xyXG4gICAgICAgICAgJy4gUGxlYXNlIHVzZSBhIGJvb2xlYW4uJyk7XHJcbiAgICB9XHJcbiAgICBkZXByZWNhdGlvbldhcm5pbmdzXyA9ICFib29sO1xyXG4gICAgcmV0dXJuICdhZGFwdGVyLmpzIGRlcHJlY2F0aW9uIHdhcm5pbmdzICcgKyAoYm9vbCA/ICdkaXNhYmxlZCcgOiAnZW5hYmxlZCcpO1xyXG4gIH0sXHJcblxyXG4gIGxvZzogZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgaWYgKGxvZ0Rpc2FibGVkXykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBjb25zb2xlLmxvZyA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBTaG93cyBhIGRlcHJlY2F0aW9uIHdhcm5pbmcgc3VnZ2VzdGluZyB0aGUgbW9kZXJuIGFuZCBzcGVjLWNvbXBhdGlibGUgQVBJLlxyXG4gICAqL1xyXG4gIGRlcHJlY2F0ZWQ6IGZ1bmN0aW9uKG9sZE1ldGhvZCwgbmV3TWV0aG9kKSB7XHJcbiAgICBpZiAoIWRlcHJlY2F0aW9uV2FybmluZ3NfKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnNvbGUud2FybihvbGRNZXRob2QgKyAnIGlzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgJyArIG5ld01ldGhvZCArXHJcbiAgICAgICAgJyBpbnN0ZWFkLicpO1xyXG4gIH0sXHJcblxyXG4gIC8qKlxyXG4gICAqIEJyb3dzZXIgZGV0ZWN0b3IuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtvYmplY3R9IHJlc3VsdCBjb250YWluaW5nIGJyb3dzZXIgYW5kIHZlcnNpb25cclxuICAgKiAgICAgcHJvcGVydGllcy5cclxuICAgKi9cclxuICBkZXRlY3RCcm93c2VyOiBmdW5jdGlvbih3aW5kb3cpIHtcclxuICAgIHZhciBuYXZpZ2F0b3IgPSB3aW5kb3cgJiYgd2luZG93Lm5hdmlnYXRvcjtcclxuXHJcbiAgICAvLyBSZXR1cm5lZCByZXN1bHQgb2JqZWN0LlxyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgcmVzdWx0LmJyb3dzZXIgPSBudWxsO1xyXG4gICAgcmVzdWx0LnZlcnNpb24gPSBudWxsO1xyXG5cclxuICAgIC8vIEZhaWwgZWFybHkgaWYgaXQncyBub3QgYSBicm93c2VyXHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgfHwgIXdpbmRvdy5uYXZpZ2F0b3IpIHtcclxuICAgICAgcmVzdWx0LmJyb3dzZXIgPSAnTm90IGEgYnJvd3Nlci4nO1xyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChuYXZpZ2F0b3IubW96R2V0VXNlck1lZGlhKSB7IC8vIEZpcmVmb3guXHJcbiAgICAgIHJlc3VsdC5icm93c2VyID0gJ2ZpcmVmb3gnO1xyXG4gICAgICByZXN1bHQudmVyc2lvbiA9IGV4dHJhY3RWZXJzaW9uKG5hdmlnYXRvci51c2VyQWdlbnQsXHJcbiAgICAgICAgICAvRmlyZWZveFxcLyhcXGQrKVxcLi8sIDEpO1xyXG4gICAgfSBlbHNlIGlmIChuYXZpZ2F0b3Iud2Via2l0R2V0VXNlck1lZGlhKSB7XHJcbiAgICAgIC8vIENocm9tZSwgQ2hyb21pdW0sIFdlYnZpZXcsIE9wZXJhLlxyXG4gICAgICAvLyBWZXJzaW9uIG1hdGNoZXMgQ2hyb21lL1dlYlJUQyB2ZXJzaW9uLlxyXG4gICAgICByZXN1bHQuYnJvd3NlciA9ICdjaHJvbWUnO1xyXG4gICAgICByZXN1bHQudmVyc2lvbiA9IGV4dHJhY3RWZXJzaW9uKG5hdmlnYXRvci51c2VyQWdlbnQsXHJcbiAgICAgICAgICAvQ2hyb20oZXxpdW0pXFwvKFxcZCspXFwuLywgMik7XHJcbiAgICB9IGVsc2UgaWYgKG5hdmlnYXRvci5tZWRpYURldmljZXMgJiZcclxuICAgICAgICBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9FZGdlXFwvKFxcZCspLihcXGQrKSQvKSkgeyAvLyBFZGdlLlxyXG4gICAgICByZXN1bHQuYnJvd3NlciA9ICdlZGdlJztcclxuICAgICAgcmVzdWx0LnZlcnNpb24gPSBleHRyYWN0VmVyc2lvbihuYXZpZ2F0b3IudXNlckFnZW50LFxyXG4gICAgICAgICAgL0VkZ2VcXC8oXFxkKykuKFxcZCspJC8sIDIpO1xyXG4gICAgfSBlbHNlIGlmICh3aW5kb3cuUlRDUGVlckNvbm5lY3Rpb24gJiZcclxuICAgICAgICBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9BcHBsZVdlYktpdFxcLyhcXGQrKVxcLi8pKSB7IC8vIFNhZmFyaS5cclxuICAgICAgcmVzdWx0LmJyb3dzZXIgPSAnc2FmYXJpJztcclxuICAgICAgcmVzdWx0LnZlcnNpb24gPSBleHRyYWN0VmVyc2lvbihuYXZpZ2F0b3IudXNlckFnZW50LFxyXG4gICAgICAgICAgL0FwcGxlV2ViS2l0XFwvKFxcZCspXFwuLywgMSk7XHJcbiAgICB9IGVsc2UgeyAvLyBEZWZhdWx0IGZhbGx0aHJvdWdoOiBub3Qgc3VwcG9ydGVkLlxyXG4gICAgICByZXN1bHQuYnJvd3NlciA9ICdOb3QgYSBzdXBwb3J0ZWQgYnJvd3Nlci4nO1xyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG59O1xyXG5cclxufSx7fV19LHt9LFszXSkoMylcclxufSk7Il0sInNvdXJjZVJvb3QiOiIifQ==