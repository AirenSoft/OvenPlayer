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
    NETWORK_UNSTABLED
} from "api/constants";


const WebRTCLoader = function (provider, webSocketUrl, errorTrigger) {

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

    let statisticsTimer = null;

    (function() {
        let existingHandler = window.onbeforeunload;
        window.onbeforeunload = function(event) {
            if (existingHandler){
                existingHandler(event);
            }
            OvenPlayerConsole.log("This calls auto when browser closed.");
            closePeer();
        }
    })();

    function getPeerConnectionById(id) {

        if (mainPeerConnectionInfo && id === mainPeerConnectionInfo.id) {
            return mainPeerConnectionInfo.peerConnection;
        } else if (clientPeerConnections[id]) {

            return clientPeerConnections[id].peerConnection;
        }
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

    function createMainPeerConnection(id, resolve) {

        let peerConnection = new RTCPeerConnection(peerConnectionConfig);

        mainPeerConnectionInfo = {
            id: id,
            peer_id: peerId,
            peerConnection: peerConnection
        };

        peerConnection.onicecandidate = function (e) {
            if (e.candidate) {
                OvenPlayerConsole.log("WebRTCLoader send candidate to server : " + e.candidate);
                ws.send(JSON.stringify({
                    id: mainPeerConnectionInfo.id,
                    peer_id: mainPeerConnectionInfo.peer_id,
                    command: "candidate",
                    candidates: [e.candidate]
                }));
            }
        };

        peerConnection.ontrack = function (e) {

            OvenPlayerConsole.log("stream received.");

            extractLossPacketsOnNetworkStatus(mainPeerConnectionInfo);
            mainStream = e.streams[0];
            resolve(e.streams[0]);
        };
    }

    function createClientPeerConnection(id) {

        let peerConnection = new RTCPeerConnection(peerConnectionConfig);

        clientPeerConnections[id] = {
            id: id,
            peerConnection: peerConnection
        };

        peerConnection.addStream(mainStream);

        let offerOption = {
            offerToReceiveAudio: 1,
            offerToReceiveVideo: 1
        };

        peerConnection.createOffer(setLocalAndSendMessage, handleCreateOfferError, {});

        function setLocalAndSendMessage(sessionDescription) {
            peerConnection.setLocalDescription(sessionDescription);
            ws.send(JSON.stringify({
                id: id,
                peerId: mainPeerConnectionInfo.id,
                sdp: sessionDescription,
                command: 'offer_p2p'
            }));
        }

        function handleCreateOfferError(event) {
            console.log('createOffer() error: ', event);
        }

        peerConnection.onicecandidate = function (e) {
            if (e.candidate) {
                OvenPlayerConsole.log("WebRTCLoader send candidate to server : " + e.candidate);
                ws.send(JSON.stringify({
                    id: mainPeerConnectionInfo.id,
                    peer_id: id,
                    command: "candidate_p2p",
                    candidates: [e.candidate]
                }));
            }
        };
    }

    function initWebSocket(resolve, reject) {

        try {

            ws = new WebSocket(webSocketUrl);

            ws.onopen = function () {

                ws.send(JSON.stringify({command: "request_offer"}));
            };

            ws.onmessage = function (e) {

                const message = JSON.parse(e.data);

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

                if (!mainPeerConnectionInfo) {
                    createMainPeerConnection(message.id, message.peer_id, resolve, reject);
                }

                let peerConnection = getPeerConnectionById(message.id);

                if (message.sdp === 'offer') {

                    mainPeerConnectionInfo.peer_id = message.peer_id;

                    //Set remote description when I received sdp from server.
                    peerConnection.setRemoteDescription(new RTCSessionDescription(message.sdp))
                        .then(function () {
                            if (peerConnection.remoteDescription.type === 'offer') { // Will be always offer
                                // This creates answer when I received offer from publisher.
                                peerConnection.createAnswer()
                                    .then(function (desc) {

                                        OvenPlayerConsole.log("create Host Answer : success");

                                        peerConnection.setLocalDescription(desc).then(function () {
                                            // my SDP created.
                                            let localSDP = peerConnection.localDescription;
                                            OvenPlayerConsole.log('Local SDP', localSDP);

                                            // my sdp send to server.
                                            ws.send(JSON.stringify({
                                                id: mainPeerConnectionInfo.id,
                                                peer_id: mainPeerConnectionInfo.peer_id,
                                                command: 'answer',
                                                sdp: localSDP
                                            }));
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
                            }
                        })
                        .catch(function (error) {
                            let tempError = ERRORS[PLAYER_WEBRTC_SET_REMOTE_DESC_ERROR];
                            tempError.error = error;
                            closePeer(tempError);
                        });
                }

                if (message.command === 'request_offer_p2p') {

                    let clientId = message.id;
                    createClientPeerConnection(clientId);
                }

                if (message.command === 'answer_p2p') {
                    peerConnection.setRemoteDescription(new RTCSessionDescription(message.sdp))
                        .then(function (desc) {

                        })
                        .catch(function (error) {
                            let tempError = ERRORS[PLAYER_WEBRTC_SET_REMOTE_DESC_ERROR];
                            tempError.error = error;
                            closePeer(tempError);
                        });
                }

                if (message.candidates) {
                    // This receives ICE Candidate from server.
                    for (let i = 0; i < message.candidates.length; i++) {
                        if (message.candidates[i] && message.candidates[i].candidate) {

                            peerConnection.addIceCandidate(new RTCIceCandidate(message.candidates[i])).then(function () {
                                OvenPlayerConsole.log("addIceCandidate : success");
                            }).catch(function (error) {
                                console.log(error);
                                let tempError = ERRORS[PLAYER_WEBRTC_ADD_ICECANDIDATE_ERROR];
                                tempError.error = error;
                                closePeer(tempError);
                            });
                        }
                    }
                }

                if (message.command === 'close') {

                    if (message.peer_id === mainPeerConnectionInfo.peer_id) {

                        // close connection with host
                        mainPeerConnectionInfo.peerConnection.close();
                        mainPeerConnectionInfo = null;
                        ws.send(JSON.stringify({command: 'request_offer'}));
                    } else {

                        // close connection with client
                        if (clientPeerConnections[message.peer_id]) {
                            clientPeerConnections[message.peer_id].peerConnection.close();
                            delete clientPeerConnections[message.peer_id];
                        }
                    }
                }
            };

            ws.onerror = function (error) {
                let tempError = ERRORS[PLAYER_WEBRTC_WS_ERROR];
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
                ws.send(JSON.stringify({
                    command: 'stop',
                    id: mainPeerConnectionInfo.id,
                    peer_id: mainPeerConnectionInfo.peer_id
                }));
                ws.close();
            }
            ws = null;
        }
        if (mainPeerConnectionInfo) {
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

    that.connect = () => {
        return initialize();
    };

    that.destroy = () => {
        mainPeerConnectionInfo.log("WEBRTC LOADER destroy");
        closePeer();
    };

    return that;
};

export default WebRTCLoader;
