import adapter from 'utils/adapter';
import Promise, {resolved} from "api/shims/promise";

import {
    PLAYER_WEBRTC_WS_ERROR,
    PLAYER_WEBRTC_WS_CLOSED,
    PLAYER_WEBRTC_ADD_ICECANDIDATE_ERROR,
    PLAYER_WEBRTC_SET_REMOTE_DESC_ERROR,
    PLAYER_WEBRTC_CREATE_ANSWER_ERROR,
    PLAYER_WEBRTC_SET_LOCAL_DESC_ERROR
} from "api/constants";

const WebRTCLoader = function(url, errorCallback){
    var url = url;
    let ws = "";
    let peerConnection = "";
    const config = {
        'iceServers': [{
            'urls': 'stun:stun.l.google.com:19302'
        }]
    };
    const that = {};
    let mySdp = "";


    (function() {
        var existingHandler = window.onbeforeunload;
        window.onbeforeunload = function(event) {
            if (existingHandler){
                existingHandler(event);
            };
            OvenPlayerConsole.log("This calls auto when browser closed.");
            closePeer();
        }
    })();


    function initialize() {
        OvenPlayerConsole.log("WebRTCLoader connecting...");

        const onLocalDescription = function(id, connection, desc) {
            connection.setLocalDescription(desc).then(function (){
                // my SDP created.
                var localSDP = connection.localDescription;
                OvenPlayerConsole.log('Local SDP', localSDP);
                mySdp = localSDP;   //test code
                // my sdp send to server.
                ws.send(JSON.stringify({
                    id: id,
                    command : "answer",
                    sdp: localSDP
                }));
            }).catch(function(error){
                closePeer({code : PLAYER_WEBRTC_SET_LOCAL_DESC_ERROR, reason : "setLocalDescription error occurred", message : "setLocalDescription error occurred", error : error});
            });
        };

        return new Promise(function(resolve, reject){
            OvenPlayerConsole.log("WebRTCLoader url : " + url);
            ws = new WebSocket(url);
            ws.onopen = function() {
                ws.send(JSON.stringify({command : "request_offer"}));
            };
            ws.onmessage = function(e) {
                const message = JSON.parse(e.data);
                if(message.error){
                    OvenPlayerConsole.log(message.error);
                    return false;
                }
                if(message.list) {
                    OvenPlayerConsole.log('List received');
                    return;
                }

                if(!message.id) {
                    OvenPlayerConsole.log('ID must be not null');
                    return;
                }

                if(!peerConnection){
                    peerConnection = new RTCPeerConnection(config);

                    peerConnection.onicecandidate = function(e) {
                        if(e.candidate){
                            OvenPlayerConsole.log("WebRTCLoader send candidate to server : " + e.candidate);
                            ws.send(JSON.stringify({
                                id: message.id,
                                command : "candidate",
                                candidates: [e.candidate]
                            }));
                        }
                    };

                    peerConnection.onnegotiationneeded = function() {
                        peerConnection.createOffer().then(function(desc) {
                            OvenPlayerConsole.log("createOffer : success")
                            onLocalDescription(message.id, peerConnection, desc);
                        }).catch(function(err){
                            closePeer({code : PLAYER_WEBRTC_CREATE_ANSWER_ERROR, reason : "createOffer error occurred", message : "createOffer error occurred", error : error});
                        });
                    };

                    peerConnection.onaddstream = function(e) {
                        OvenPlayerConsole.log("stream received.");
                        // stream received.
                        resolve(e.stream);
                    };
                }

                if(message.sdp) {
                    //Set remote description when I received sdp from server.
                    peerConnection.setRemoteDescription(new RTCSessionDescription(message.sdp)).then(function(){
                        if(peerConnection.remoteDescription.type === 'offer') {
                            // This creates answer when I received offer from publisher.
                            peerConnection.createAnswer().then(function(desc){
                                OvenPlayerConsole.log("createAnswer : success");
                                onLocalDescription(message.id, peerConnection, desc);
                            }).catch(function(error){
                                closePeer({code : PLAYER_WEBRTC_CREATE_ANSWER_ERROR, reason : "createAnswer error occurred", message : "createAnswer error occurred", error : error});
                            });
                        }
                    }).catch(function(error){
                        closePeer({code : PLAYER_WEBRTC_SET_REMOTE_DESC_ERROR, reason : "setRemoteDescription error occurred", message : "setRemoteDescription error occurred", error : error});
                    });
                }

                if(message.candidates) {
                    // This receives ICE Candidate from server.
                    for(let i = 0; i < message.candidates.length; i ++ ){
                        if(message.candidates[i] && message.candidates[i].candidate) {

                            peerConnection.addIceCandidate(new RTCIceCandidate(message.candidates[i])).then(function(){
                                OvenPlayerConsole.log("addIceCandidate : success");
                            }).catch(function(error){
                                closePeer({code : PLAYER_WEBRTC_ADD_ICECANDIDATE_ERROR, reason : "addIceCandidate error occurred", message : "addIceCandidate error occurred", error : error});
                            });
                        }
                    }
                }

            };
            ws.onerror = function(e) {
                closePeer({code : PLAYER_WEBRTC_WS_ERROR, reason : "websocket error occured", message : "websocket error occurred", error : e});
                reject(e);
            };
            ws.onclose = function(e) {
                closePeer({code : PLAYER_WEBRTC_WS_CLOSED, reason : "websocket closed", message : "websocket closed", error : e});
                reject(e);
            };
        });
    }

    function closePeer(error) {
        OvenPlayerConsole.log('WebRTC Loader closePeear()');
        if(!!ws) {
            OvenPlayerConsole.log('Closing websocket connection...');
            OvenPlayerConsole.log("Send Signaling : Stop.");
            ws.send(JSON.stringify({command : "stop"}));
            ws.close();
            ws = null;
        }
        if(peerConnection) {
            OvenPlayerConsole.log('Closing peer connection...');
            peerConnection.close();
            peerConnection = null;
        };
        if(error){
            errorCallback(error);
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