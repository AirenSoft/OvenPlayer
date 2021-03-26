(function () {

    'use strict';

    let self = {};

    const logHeader = 'OvenWebRTCInput.js :';
    const logEventHeader = 'OvenWebRTCInput.js ====';

    window.OvenWebRTCInput = self;

    function errorHandler(instance, error) {

        if (instance.callbacks.error) {

            instance.callbacks.error(error);
        }
    }

    // private methods
    function sendMessage(webSocket, message) {

        if (webSocket) {
            webSocket.send(JSON.stringify(message));
        }
    }

    function generateDomainFromUrl(url) {
        let result = '';
        let match;
        if (match = url.match(/^(?:wss?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im)) {
            result = match[1];
        }

        return result;
    }

    function findIp(string) {

        let result = '';
        let match;

        if (match = string.match(new RegExp("\\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b", 'gi'))) {
            result = match[0];
        }

        return result;
    }

    function getDevices(instance, callback) {

        navigator.mediaDevices.enumerateDevices()
            .then(function (deviceInfos) {

                let devices = {
                    'audioinput': [],
                    'audiooutput': [],
                    'videoinput': [],
                    'other': [],
                };

                for (let i = 0; i !== deviceInfos.length; ++i) {

                    const deviceInfo = deviceInfos[i];

                    let info = {};

                    info.deviceId = deviceInfo.deviceId;

                    if (deviceInfo.kind === 'audioinput') {

                        info.label = deviceInfo.label || `microphone ${devices.audioinput.length + 1}`;
                        devices.audioinput.push(info);
                    } else if (deviceInfo.kind === 'audiooutput') {

                        info.label = deviceInfo.label || `speaker ${devices.audiooutput.length + 1}`;
                        devices.audiooutput.push(info);
                    } else if (deviceInfo.kind === 'videoinput') {

                        info.label = deviceInfo.label || `camera ${devices.videoinput.length + 1}`;
                        devices.videoinput.push(info);
                    } else {

                        info.label = deviceInfo.label || `other ${devices.other.length + 1}`;
                        devices.other.push(info);
                    }
                }

                console.info(logHeader, 'All Input Devices', devices);

                instance.devices = devices;

                if (instance.callbacks.gotDevices) {
                    instance.callbacks.gotDevices(devices);
                }

                if (callback) {
                    callback();
                }
            })
            .catch(function (error) {
                console.error('navigator.mediaDevices.enumerateDevices', error);
                errorHandler(instance, error);
            });
    }

    function getUserMedia(instance) {

        let devices = instance.devices;

        let constraints = {};

        if (instance.config.mediaStreamConstraint) {

            constraints = instance.config.mediaStreamConstraint;
        } else {

            if (devices.audioinput.length > 0) {

                constraints.audio = {
                    deviceId: {
                        exact: devices.audioinput[0].deviceId
                    }
                };
            }

            if (devices.videoinput.length > 0) {

                constraints.video = {
                    deviceId: devices.videoinput[0].deviceId
                };
            }
        }

        console.info(logHeader, 'Requested Constraint To Input Devices', constraints);

        navigator.mediaDevices.getUserMedia(constraints)
            .then(function (stream) {

                console.info(logHeader, 'Recived Media Stream From Input Device', stream);

                instance.stream = stream;

                let elem = instance.videoElement;

                elem.srcObject = stream;

                elem.onloadedmetadata = function (e) {

                    elem.play();

                    if (instance.callbacks.gotStream) {

                        instance.callbacks.gotStream(elem, stream);
                    }
                };
            })
            .catch(function (error) {

                console.error(logHeader, 'Can\'t Get Media Stream From Input Device', error);
                errorHandler(instance, error);

            });
    }

    function addConfig(instance, options) {

        instance.stream = null;
        instance.webSocket = null;
        instance.peerConnection = null;

        instance.videoElement = options.videoElement;
        instance.connectionUrl = options.connectionUrl;

        if (options.config) {

            instance.config = options.config;
        } else {

            instance.config = {};
        }

        if (options.callbacks) {
            instance.callbacks = options.callbacks;
        }

    }

    function addMethod(instance) {

        function initWebSocket() {

            let webSocket = null;

            try {

                webSocket = new WebSocket(instance.connectionUrl);
            } catch (e) {

                errorHandler(instance, e);
            }


            instance.webSocket = webSocket;

            webSocket.onopen = function () {

                // Request offer at the first time.
                sendMessage(webSocket, {
                    command: "request_offer"
                });
            };

            webSocket.onmessage = function (e) {

                let message = JSON.parse(e.data);

                if (message.error) {
                    console.error('webSocket.onmessage', message.error);
                    errorHandler(instance, message.error);
                }

                if (message.command === 'offer') {

                    // OME returns offer. Start create peer connection.
                    createPeerConnection(
                        message.id,
                        message.peer_id,
                        message.sdp,
                        message.candidates,
                        message.ice_servers
                    );
                }
            };

            webSocket.onerror = function (error) {

                console.error('webSocket.onerror', error);
                errorHandler(instance, error);
            };

            webSocket.onclose = function (e) {

                if (!instance.removing) {
                    if (instance.callbacks.connectionClosed) {

                        instance.callbacks.connectionClosed('websocket', e);
                    }
                }
            };

        }

        function createPeerConnection(id, peerId, sdp, candidates, iceServers) {

            let peerConnectionConfig = {};

            if (instance.config.iceServers) {

                // first priority using ice servers from local config.
                peerConnectionConfig.iceServers = instance.config.iceServers;

                if (instance.config.iceTransportPolicy) {

                    peerConnectionConfig.iceTransportPolicy = instance.config.iceTransportPolicy;
                }
            } else if (iceServers) {

                // second priority using ice servers from ome and force using TCP
                peerConnectionConfig.iceServers = [];

                for (let i = 0; i < iceServers.length; i++) {

                    let iceServer = iceServers[i];

                    let regIceServer = {};

                    regIceServer.urls = iceServer.urls;

                    let hasWebSocketUrl = false;
                    let webSocketUrl = generateDomainFromUrl(instance.connectionUrl);

                    for (let j = 0; j < regIceServer.urls.length; j++) {

                        let serverUrl = regIceServer.urls[j];

                        if (serverUrl.indexOf(webSocketUrl) > -1) {
                            hasWebSocketUrl = true;
                            break;
                        }
                    }

                    if (!hasWebSocketUrl) {

                        if (regIceServer.urls.length > 0) {

                            let cloneIceServer = regIceServer.urls[0];
                            let ip = findIp(cloneIceServer);

                            if (webSocketUrl && ip) {
                                regIceServer.urls.push(cloneIceServer.replace(ip, webSocketUrl));
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

                if (instance.config.iceTransportPolicy) {

                    peerConnectionConfig.iceTransportPolicy = instance.config.iceTransportPolicy;
                }
            }

            console.info(logHeader, 'Create Peer Connection With Config', peerConnectionConfig);

            let peerConnection = new RTCPeerConnection(peerConnectionConfig);

            instance.peerConnection = peerConnection;

            // set local stream
            instance.stream.getTracks().forEach(function (track) {

                console.info(logHeader, 'Add Track To Peer Connection', track);
                peerConnection.addTrack(track, instance.stream);
            });

            peerConnection.setRemoteDescription(new RTCSessionDescription(sdp))
                .then(function () {

                    peerConnection.createAnswer()
                        .then(function (desc) {

                            peerConnection.setLocalDescription(desc)
                                .then(function () {

                                    let localSDP = peerConnection.localDescription;

                                    sendMessage(instance.webSocket, {
                                        id: id,
                                        peer_id: peerId,
                                        command: 'answer',
                                        sdp: localSDP
                                    });
                                })
                                .catch(function (error) {

                                    console.error('peerConnection.setLocalDescription', error);
                                    errorHandler(instance, error);
                                    // todo(rock): cleaning
                                });
                        })
                        .catch(function (error) {

                            console.error('peerConnection.createAnswer', error);
                            errorHandler(instance, error);
                            // todo(rock): cleaning
                        });
                })
                .catch(function (error) {

                    console.error('peerConnection.setRemoteDescription', error);
                    errorHandler(instance, error);
                    // todo(rock): cleaning
                });

            if (candidates) {

                addIceCandidate(peerConnection, candidates);
            }

            peerConnection.onicecandidate = function (e) {
                if (e.candidate) {

                    console.info(logHeader, 'Candidate Sent', '\n', e.candidate.candidate, '\n', e);

                    sendMessage(instance.webSocket, {
                        id: id,
                        peer_id: peerId,
                        command: 'candidate',
                        candidates: [e.candidate]
                    });
                }
            };

            peerConnection.oniceconnectionstatechange = function (e) {

                if (instance.callbacks.connectionClosed) {

                    let state = peerConnection.iceConnectionState;

                    console.info(logHeader, 'ICE State', state);
                    instance.callbacks.iceStateChange(state);
                }

                if (peerConnection.iceConnectionState === "failed" ||
                    peerConnection.iceConnectionState === "disconnected" ||
                    peerConnection.iceConnectionState === "closed") {

                    if (instance.callbacks.connectionClosed) {

                        console.error('iceconnection closed', e);
                        instance.callbacks.connectionClosed('ice', e);
                    }
                }
            }

            // peerConnection.onconnectionstatechange = function (e) {
            //     console.log('>>>>>>>>>>>>>>>>>>>>>>>>> peerconnection.onconnectionstatechange', peerConnection.connectionState);
            // }
        }

        function addIceCandidate(peerConnection, candidates) {

            for (let i = 0; i < candidates.length; i++) {

                if (candidates[i] && candidates[i].candidate) {

                    let basicCandidate = candidates[i];

                    peerConnection.addIceCandidate(new RTCIceCandidate(basicCandidate))
                        .then(function () {

                        })
                        .catch(function (error) {

                            console.error('peerConnection.addIceCandidate', error);
                            errorHandler(instance, error);
                            // todo(rock): cleaning
                        });
                }
            }
        }

        instance.startStreaming = function () {

            console.info(logEventHeader, 'Start Streaming');

            initWebSocket();
        };

        instance.remove = function () {

            instance.removing = true;

            // first release peer connection with ome
            if (instance.peerConnection) {

                // remove tracks from peer connection
                instance.peerConnection.getSenders().forEach(function (sender) {
                    instance.peerConnection.removeTrack(sender);
                });

                instance.peerConnection.close();
                instance.peerConnection = null;
            }

            // release video, audio stream
            if (instance.stream) {

                instance.stream.getTracks().forEach(track => {

                    track.stop();
                    instance.stream.removeTrack(track);
                });

                instance.stream = null;
                instance.videoElement.srcObject = null;

            }

            // release websocket
            if (instance.webSocket) {

                instance.webSocket.close();
                instance.webSocket = null;
            }

            console.info(logEventHeader, 'Removed');

        };
    }

    // public methods
    self.create = function (options) {

        console.info(logEventHeader, 'Create WebRTC Input');

        let instance = {};

        instance.removing = false;

        addConfig(instance, options);
        addMethod(instance);

        // first get permission
        navigator.mediaDevices.getUserMedia({audio: true, video: true}).then(function () {
            getDevices(instance, function () {
                getUserMedia(instance);
            });
        }).catch(function (error) {

            navigator.mediaDevices.getUserMedia({audio: false, video: true}).then(function () {
                getDevices(instance, function () {
                    getUserMedia(instance);
                });
            }).catch(function (error) {

                navigator.mediaDevices.getUserMedia({audio: true, video: false}).then(function () {
                    getDevices(instance, function () {
                        getUserMedia(instance);
                    });
                }).catch(function (error) {

                    console.error(error);
                    errorHandler(instance, error)
                });
            });
        });

        return instance;
    };


})();