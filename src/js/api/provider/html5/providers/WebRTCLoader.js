import _ from "utils/underscore";
import {analUserAgent} from "utils/browser";
import {
    ERRORS,
    PLAYER_WEBRTC_WS_ERROR,
    PLAYER_WEBRTC_ADD_ICECANDIDATE_ERROR,
    PLAYER_WEBRTC_SET_REMOTE_DESC_ERROR,
    PLAYER_WEBRTC_CREATE_ANSWER_ERROR,
    PLAYER_WEBRTC_SET_LOCAL_DESC_ERROR,
    PLAYER_WEBRTC_NETWORK_SLOW,
    PLAYER_WEBRTC_UNEXPECTED_DISCONNECT,
    PLAYER_WEBRTC_INTERNAL_ERROR,
    OME_P2P_MODE
} from "api/constants";


const WebRTCLoader = function (provider, webSocketUrl, loadCallback, errorTrigger, playerConfig) {

    let defaultConnectionConfig = {};

    let that = {};

    let ws = null;

    let wsPing = null;

    let mainStream = null;

    // used for getting media stream from OME or host peer
    let mainPeerConnectionInfo = null;

    // used for send media stream to client peer.
    let clientPeerConnections = {};

    //closed websocket by ome or client.
    let wsClosedByPlayer = false;

    let recorverPacketLoss = false;

    if (playerConfig.getConfig().webrtcConfig &&
        playerConfig.getConfig().webrtcConfig.recorverPacketLoss === true) {

        recorverPacketLoss = true;
    }

    let generatePublicCandidate = true;

    if (playerConfig.getConfig().webrtcConfig &&
        playerConfig.getConfig().webrtcConfig.generatePublicCandidate === false) {

        generatePublicCandidate = playerConfig.getConfig().webrtcConfig.generatePublicCandidate;
    }

    let statisticsTimer = null;

    let currentBrowser = analUserAgent();

    (function () {
        let existingHandler = window.onbeforeunload;
        window.onbeforeunload = function (event) {
            if (existingHandler) {
                existingHandler(event);
            }
            OvenPlayerConsole.log("This calls auto when browser closed.");
            closePeer();
        }
    })();

    function getPeerConnectionById(id) {

        let peerConnection = null;

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
            peerConnectionInfo.status.avgMoreThanThresholdCount = 0;  //If avg8Loss more than threshold.
            peerConnectionInfo.status.threshold = 40;
        }

        let lostPacketsArr = peerConnectionInfo.status.lostPacketsArr,
            slotLength = peerConnectionInfo.status.slotLength, //8 statistics. every 2 seconds
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

                            let actualPacketLost = parseInt(state.packetsLost) - parseInt(prevPacketsLost);

                            lostPacketsArr.push(parseInt(state.packetsLost) - parseInt(prevPacketsLost));

                            if (lostPacketsArr.length > slotLength) {

                                lostPacketsArr.shift();
                            }

                            if (lostPacketsArr.length === slotLength) {

                                avg8Losses = _.reduce(lostPacketsArr, function (memo, num) {
                                    return memo + num;
                                }, 0) / slotLength;
                                OvenPlayerConsole.log("Last8 LOST PACKET AVG  : " + (avg8Losses), "Current Packet LOST: " + actualPacketLost, "Total Packet Lost: " + state.packetsLost, lostPacketsArr);

                                if (avg8Losses > threshold) {
                                    peerConnectionInfo.status.avgMoreThanThresholdCount = peerConnectionInfo.status.avgMoreThanThresholdCount + 1;
                                    if (peerConnectionInfo.status.avgMoreThanThresholdCount >= 60) {
                                        OvenPlayerConsole.log("NETWORK UNSTABLED!!! ");
                                        let tempError = ERRORS.codes[PLAYER_WEBRTC_NETWORK_SLOW];
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

        const lines = sdp.split('\n');
        let opusFormatNumber = -1;

        for (let i = 0; i < lines.length - 1; i++) {

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

        const lines = sdp.split('\n');

        let stereo = false;

        for (let i = 0; i < lines.length - 1; i++) {

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

        const lines = sdp.split('\n');

        // find this line and modify. "a=fmtp:102 minptime=10;useinbandfec=1"
        for (let i = 0; i < lines.length - 1; i++) {

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

        let peerConnectionConfig = {};

        // first priority using ice servers from player setting.
        if (playerConfig.getConfig().webrtcConfig && playerConfig.getConfig().webrtcConfig.iceServers) {

            peerConnectionConfig.iceServers = playerConfig.getConfig().webrtcConfig.iceServers;

            if (playerConfig.getConfig().webrtcConfig.iceTransportPolicy) {

                peerConnectionConfig.iceTransportPolicy = playerConfig.getConfig().webrtcConfig.iceTransportPolicy;
            }
        } else if (iceServers) {

            // second priority using ice servers from ome and force using TCP
            peerConnectionConfig.iceServers = [];

            for (let i = 0; i < iceServers.length; i++) {

                let iceServer = iceServers[i];

                let regIceServer = {};

                regIceServer.urls = iceServer.urls;

                let hasWebsocketUrl = false;
                let socketUrl = generateDomainFromUrl(webSocketUrl);

                for (let j = 0; j < regIceServer.urls.length; j++) {

                    let serverUrl = regIceServer.urls[j];

                    if (serverUrl.indexOf(socketUrl) > -1) {
                        hasWebsocketUrl = true;
                        break;
                    }
                }

                if (!hasWebsocketUrl) {

                    if (regIceServer.urls.length > 0) {

                        let cloneIceServer = _.clone(regIceServer.urls[0]);
                        let ip = findIp(cloneIceServer);

                        if (socketUrl && ip) {
                            regIceServer.urls.push(cloneIceServer.replace(ip, socketUrl));
                        }
                    }
                }

                regIceServer.username = iceServer.username || iceServer.user_name;
                regIceServer.credential = iceServer.credential;

                peerConnectionConfig.iceServers.push(regIceServer);
            }

            peerConnectionConfig.iceTransportPolicy = 'relay';

        } else {

            // last priority using default ice servers.
            peerConnectionConfig = defaultConnectionConfig;
        }

        OvenPlayerConsole.log("Main Peer Connection Config : ", peerConnectionConfig);

        let peerConnection = null;

        try {

            peerConnection = new RTCPeerConnection(peerConnectionConfig);

        } catch (error) {
            let tempError = ERRORS.codes[PLAYER_WEBRTC_INTERNAL_ERROR];
            tempError.error = error;
            closePeer(tempError);
            return;
        }

        mainPeerConnectionInfo = {
            id: id,
            peerId: peerId,
            peerConnection: peerConnection
        };

        //Set remote description when I received sdp from server.
        peerConnection.setRemoteDescription(new RTCSessionDescription(sdp))
            .then(function () {

                peerConnection.createAnswer()
                    .then(function (desc) {

                        const opusFormatNumber = getOpusFormatNumber(sdp.sdp);

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
                            let localSDP = peerConnection.localDescription;
                            OvenPlayerConsole.log('Local SDP', localSDP);

                            sendMessage(ws, {
                                id: id,
                                peer_id: peerId,
                                command: 'answer',
                                sdp: localSDP
                            });

                        }).catch(function (error) {

                            let tempError = ERRORS.codes[PLAYER_WEBRTC_SET_LOCAL_DESC_ERROR];
                            tempError.error = error;
                            closePeer(tempError);
                        });
                    })
                    .catch(function (error) {
                        let tempError = ERRORS.codes[PLAYER_WEBRTC_CREATE_ANSWER_ERROR];
                        tempError.error = error;
                        closePeer(tempError);
                    });
            })
            .catch(function (error) {
                let tempError = ERRORS.codes[PLAYER_WEBRTC_SET_REMOTE_DESC_ERROR];
                tempError.error = error;
                closePeer(tempError);
            });

        if (candidates) {

            addIceCandidate(peerConnection, candidates);
        }

        peerConnection.onicecandidate = function (e) {
            if (e.candidate) {

                OvenPlayerConsole.log("WebRTCLoader send candidate to server : " , e.candidate);

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
                        let tempError = ERRORS.codes[PLAYER_WEBRTC_UNEXPECTED_DISCONNECT];
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

                let hint = playerConfig.getConfig().webrtcConfig.playoutDelayHint;

                const receivers = mainPeerConnectionInfo.peerConnection.getReceivers();

                for (let i = 0; i < receivers.length; i++) {

                    let receiver = receivers[i];

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

        let peerConnection = new RTCPeerConnection(defaultConnectionConfig);

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

    function copyCandidate(basicCandidate) {

        let cloneCandidate = _.clone(basicCandidate);

        let newDomain = generateDomainFromUrl(webSocketUrl);
        let ip = findIp(cloneCandidate.candidate);

        if (ip === '' || ip === newDomain) {

            return null;
        }

        return new Promise(function (resolve, reject) {

            // firefox browser throws a candidate parsing exception when a domain name is set at the address property. So we resolve the dns using google dns resolve api.
            if (currentBrowser.browser === 'Firefox' && !findIp(newDomain)) {

                fetch('https://dns.google.com/resolve?name=' + newDomain)
                    .then(resp => resp.json())
                    .then(data => {

                        if (data && data.Answer && data.Answer.length > 0) {

                            if (data.Answer[0].data) {

                                let relsolvedIp = data.Answer[0].data;

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

        for (let i = 0; i < candidates.length; i++) {
            if (candidates[i] && candidates[i].candidate) {

                let basicCandidate = candidates[i];

                peerConnection.addIceCandidate(new RTCIceCandidate(basicCandidate)).then(function () {
                    OvenPlayerConsole.log("addIceCandidate : success");
                }).catch(function (error) {
                    let tempError = ERRORS.codes[PLAYER_WEBRTC_ADD_ICECANDIDATE_ERROR];
                    tempError.error = error;
                    closePeer(tempError);
                });

                if (generatePublicCandidate) {

                    let cloneCandidatePromise = copyCandidate(basicCandidate);

                    if (cloneCandidatePromise) {
                        cloneCandidatePromise.then(function (cloneCandidate) {

                            if (cloneCandidate) {

                                peerConnection.addIceCandidate(new RTCIceCandidate(cloneCandidate)).then(function () {
                                    OvenPlayerConsole.log("cloned addIceCandidate : success");

                                }).catch(function (error) {

                                    let tempError = ERRORS.codes[PLAYER_WEBRTC_ADD_ICECANDIDATE_ERROR];
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

                const message = JSON.parse(e.data);

                if (message.error) {
                    let tempError = ERRORS.codes[PLAYER_WEBRTC_WS_ERROR];
                    tempError.error = message.error;
                    closePeer(tempError);
                    return;
                }

                if (Object.keys(message).length === 0 && message.constructor === Object) {

                    OvenPlayerConsole.log('Empty Message');
                    return;
                }

                if (message.command === 'ping') {

                    sendMessage(ws, {command: 'pong'});
                    return;
                }

                if (!message.id) {

                    OvenPlayerConsole.log('ID must be not null');
                    return;
                }

                if (message.command === 'offer') {

                    let iceServers =  message.iceServers || message.ice_servers;

                    createMainPeerConnection(message.id, message.peer_id, message.sdp, message.candidates, iceServers, resolve);
                    if (message.peer_id === 0) {
                        provider.trigger(OME_P2P_MODE, false);
                    } else {
                        provider.trigger(OME_P2P_MODE, true);
                    }
                }

                if (message.command === 'request_offer_p2p') {

                    createClientPeerConnection(message.id, message.peer_id);
                }

                if (message.command === 'answer_p2p') {

                    let peerConnection1 = getPeerConnectionById(message.peer_id);

                    peerConnection1.setRemoteDescription(new RTCSessionDescription(message.sdp))
                        .then(function (desc) {

                        })
                        .catch(function (error) {
                            let tempError = ERRORS.codes[PLAYER_WEBRTC_SET_REMOTE_DESC_ERROR];
                            tempError.error = error;
                            closePeer(tempError);
                        });
                }

                if (message.command === 'candidate') {

                    // Candidates for new client peer
                    let peerConnection2 = getPeerConnectionById(message.id);

                    addIceCandidate(peerConnection2, message.candidates);
                }

                if (message.command === 'candidate_p2p') {

                    // Candidates for new client peer
                    let peerConnection3 = getPeerConnectionById(message.peer_id);

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

                    let tempError = ERRORS.codes[PLAYER_WEBRTC_WS_ERROR];

                    if (mainPeerConnectionInfo) {
                        tempError = ERRORS.codes[PLAYER_WEBRTC_UNEXPECTED_DISCONNECT];
                    }

                    closePeer(tempError);
                }
            };

            ws.onerror = function (error) {

                //Why Edge Browser calls onerror() when ws.close()?
                if (!wsClosedByPlayer) {
                    let tempError = ERRORS.codes[PLAYER_WEBRTC_WS_ERROR];
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

            for (let clientId in clientPeerConnections) {

                let clientPeerConnection = clientPeerConnections[clientId].peerConnection;

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

    that.connect = () => {
        return initialize();
    };

    that.destroy = () => {
        closePeer();
    };

    return that;
};

export default WebRTCLoader;
