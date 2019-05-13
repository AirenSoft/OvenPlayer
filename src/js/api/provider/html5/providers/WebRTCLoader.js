import adapter from 'utils/adapter';
import _ from "utils/underscore";
import {
    ERRORS,
    PLAYER_WEBRTC_WS_ERROR,
    PLAYER_WEBRTC_WS_CLOSED,
    PLAYER_WEBRTC_ADD_ICECANDIDATE_ERROR,
    PLAYER_WEBRTC_SET_REMOTE_DESC_ERROR,
    PLAYER_WEBRTC_CREATE_ANSWER_ERROR,
    PLAYER_WEBRTC_SET_LOCAL_DESC_ERROR,
    PLAYER_WEBRTC_NETWORK_SLOW,
    NETWORK_UNSTABLED,
    OME_P2P_MODE
} from "api/constants";


const WebRTCLoader = function (provider, webSocketUrl, loadCallback, errorTrigger) {

    const peerConnectionConfig = {
        'iceServers': [{
            'urls': 'stun:stun.l.google.com:19302'
        }]
    };

    let that = {};

    let ws = null;

    let mainStream = null;

    // used for getting media stream from OME or host peer
    let mainPeerConnectionInfo = null;

    // used for send media stream to client peer.
    let clientPeerConnections = {};

    //closed websocket by ome or client.
    let wsClosedByPlayer = false;

    let statisticsTimer = null;

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

        if (!peerConnectionInfo.status) {
            peerConnectionInfo.status = {};
            peerConnectionInfo.status.lostPacketsArr = [];
            peerConnectionInfo.status.slotLength = 8; //8 statistics. every 2 seconds
            peerConnectionInfo.status.prevPacketsLost = 0;
            peerConnectionInfo.status.avg8Losses = 0;
            peerConnectionInfo.status.avgMoreThanThresholdCount = 0;  //If avg8Loss more than threshold.
            peerConnectionInfo.status.threshold = 20;
        }

        let lostPacketsArr = peerConnectionInfo.status.lostPacketsArr,
            slotLength = peerConnectionInfo.status.slotLength, //8 statistics. every 2 seconds
            prevPacketsLost = peerConnectionInfo.status.prevPacketsLost,
            avg8Losses = peerConnectionInfo.status.avg8Losses,
            avgMoreThanThresholdCount = peerConnectionInfo.status.avgMoreThanThresholdCount,  //If avg8Loss more than threshold.
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
                            avg8Losses = _.reduce(lostPacketsArr, function (memo, num) {
                                return memo + num;
                            }, 0) / slotLength;
                            OvenPlayerConsole.log("Last8 LOST PACKET AVG  : " + (avg8Losses), state.packetsLost, lostPacketsArr);
                            if (avg8Losses > threshold) {
                                avgMoreThanThresholdCount++;
                                if (avgMoreThanThresholdCount === 3) {
                                    OvenPlayerConsole.log("NETWORK UNSTABLED!!! ");
                                    // clearTimeout(statisticsTimer);
                                    // provider.trigger(NETWORK_UNSTABLED);
                                    closePeer(NETWORK_UNSTABLED);
                                }
                            } else {
                                avgMoreThanThresholdCount = 0;
                            }

                        }

                        prevPacketsLost = state.packetsLost;
                    }
                });

                extractLossPacketsOnNetworkStatus(peerConnectionInfo);
            })

        }, 2000);

    }

    function createMainPeerConnection(id, peerId, sdp, candidates, resolve) {

        let peerConnection = new RTCPeerConnection(peerConnectionConfig);

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

                            let tempError = ERRORS[PLAYER_WEBRTC_SET_LOCAL_DESC_ERROR];
                            tempError.error = error;
                            closePeer(tempError);
                        });
                    })
                    .catch(function (error) {
                        let tempError = ERRORS[PLAYER_WEBRTC_CREATE_ANSWER_ERROR];
                        tempError.error = error;
                        closePeer(tempError);
                    });
            })
            .catch(function (error) {
                let tempError = ERRORS[PLAYER_WEBRTC_SET_REMOTE_DESC_ERROR];
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

        let peerConnection = new RTCPeerConnection(peerConnectionConfig);

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

        for (let i = 0; i < candidates.length; i++) {
            if (candidates[i] && candidates[i].candidate) {

                peerConnection.addIceCandidate(new RTCIceCandidate(candidates[i])).then(function () {
                    OvenPlayerConsole.log("addIceCandidate : success");
                }).catch(function (error) {
                    let tempError = ERRORS[PLAYER_WEBRTC_ADD_ICECANDIDATE_ERROR];
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

                const message = JSON.parse(e.data);

                // console.log('Receive message', message);

                if (message.error) {
                    let tempError = ERRORS[PLAYER_WEBRTC_WS_ERROR];
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
                    if(message.peer_id === 0){
                        provider.trigger(OME_P2P_MODE, false);
                    }else{
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
                            let tempError = ERRORS[PLAYER_WEBRTC_SET_REMOTE_DESC_ERROR];
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
                if(!wsClosedByPlayer){
                    let tempError = ERRORS[PLAYER_WEBRTC_WS_ERROR];
                    closePeer(tempError);
                }
            };

            ws.onerror = function (error) {
                //Why Edge Browser calls onerror() when ws.close()?
                if(!wsClosedByPlayer){
                    let tempError = ERRORS[PLAYER_WEBRTC_WS_ERROR];
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
        }else{
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

            for (let clientId in clientPeerConnections) {

                let clientPeerConnection = clientPeerConnections[clientId].peerConnection;

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

    that.connect = () => {
        return initialize();
    };

    that.destroy = () => {
        // console.log("WEBRTC LOADER destroy");
        closePeer();
    };

    return that;
};

export default WebRTCLoader;
