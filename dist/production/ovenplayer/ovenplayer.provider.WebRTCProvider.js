/*! For license information please see ovenplayer.provider.WebRTCProvider.js.LICENSE */
/*! OvenPlayerv0.7.4 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{
/***/16:
/***/function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=c(r(77)),i=c(r(79)),a=c(r(83)),o=(c(r(6)),r(4)),s=r(2);function c(e){return e&&e.__esModule?e:{default:e}}
/**
 * @brief   webrtc provider extended core.
 * @param   element video element.
 * @param   playerConfig    config.
 * */
/**
 * Created by hoho on 2018. 6. 11..
 */t.default=function(e,t){var r=(0,n.default)(e,s.PROVIDER_WEBRTC),c=r.create(),d=null,p={},u="",l=function(e){p.setState(s.STATE_ERROR),p.pause(),p.trigger(s.ERROR,e)};return p=(0,i.default)(s.PROVIDER_WEBRTC,c,t,function(e){(0,o.isWebRTC)(e.file,e.type)&&(OvenPlayerConsole.log("WEBRTC : onBeforeLoad : ",e),d&&(d.destroy(),d=null),(d=(0,a.default)(p,e.file,l)).connect().then(function(e){c.srcObject=e,c.play()}))}),OvenPlayerConsole.log("WEBRTC PROVIDER LOADED."),u=p.super("destroy"),p.destroy=function(){d&&(d.destroy(),d=null),r.destroy(),u(),OvenPlayerConsole.log("WEBRTC :  PROVIDER DESTROYED.")},p}},
/***/28:
/***/function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});
/**
 * Created by hoho on 2018. 8. 24..
 */
t.getBrowser=function(){if(-1!=(navigator.userAgent.indexOf("Opera")||navigator.userAgent.indexOf("OPR")))return"opera";if(-1!=navigator.userAgent.indexOf("Chrome"))return"chrome";if(-1!=navigator.userAgent.indexOf("Safari"))return"safari";if(-1!=navigator.userAgent.indexOf("Firefox"))return"firefox";if(-1!=navigator.userAgent.indexOf("MSIE")){var e=avigator.userAgent.indexOf("MSIE");return 1==!!document.documentMode?"ie":navigator.userAgent.match(/Trident.*rv\:11\./)?isNaN(parseInt(ua.substring(e+5,ua.indexOf(".",e))))?"unknown":"ie":"unknown"}return"unknown"};
/***/},
/***/76:
/***/function(e,t,r){e.exports=r.p+"OvenPlayerFlash.swf";
/***/},
/***/77:
/***/function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(28),i=r(2),a=function(e){return e&&e.__esModule?e:{default:e}}(r(76));
/**
    * @brief   미디어 엘리먼트를 관리하는 객체. 현재는 하는 일이 많지 않다.
    * @param   {element}   container   dom element
    *
    * */
t.default=function(e,t){var r={},o=e.getAttribute("data-parent-id"),s="",c=(0,n.getBrowser)();OvenPlayerConsole.log("MediaManager loaded. browserType : "+c);return r.create=function(){return OvenPlayerConsole.log("MediaManager createElement()"),s&&r.destroy(),function(){if(t!==i.PROVIDER_RTMP)(s=document.createElement("video")).setAttribute("disableRemotePlayback",""),s.setAttribute("webkit-playsinline",""),s.setAttribute("playsinline",""),e.appendChild(s);else{var r=void 0,n=void 0,c=void 0,d=void 0,p=void 0;(r=document.createElement("param")).setAttribute("name","movie"),r.setAttribute("value",a.default),(n=document.createElement("param")).setAttribute("name","flashvars"),
//playerId uses SWF for ExternalInterface.call().
n.setAttribute("value","playerId="+o),(c=document.createElement("param")).setAttribute("name","allowscriptaccess"),c.setAttribute("value","always"),(d=document.createElement("param")).setAttribute("name","allowfullscreen"),d.setAttribute("value","true"),(p=document.createElement("param")).setAttribute("name","quality"),p.setAttribute("value","height"),(s=document.createElement("object")).setAttribute("type","application/x-shockwave-flash"),s.setAttribute("data",a.default),s.setAttribute("id",o+"-flash"),s.setAttribute("name",o+"-flash"),s.setAttribute("width","100%"),s.setAttribute("height","100%"),s.appendChild(r),s.appendChild(n),s.appendChild(c),s.appendChild(d),
/*if(browserType !== "ie"){
                mediaElement.appendChild(inner);
            }*/
e.appendChild(s)}return s}()},r.destroy=function(){OvenPlayerConsole.log("MediaManager removeElement()"),e.removeChild(s),s=null},r}},
/***/78:
/***/function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(2);
/**
 * @brief   Trigger on various video events.
 * @param   providerName child Provider Name
 * @param   extendedElement extended media object by mse.
 * @param   element elVideo  video
 * @param   Provider provider  html5Provider
 * */t.default=function(e,t,r,i){var a={};OvenPlayerConsole.log("EventListener loaded.");var o={};
//Fires when the browser can start playing the audio/video
return a.canplay=function(){i.setCanSeek(!0),i.trigger(n.CONTENT_BUFFER_FULL),OvenPlayerConsole.log("EventListener : on canplay")},
//Fires when the duration of the audio/video is changed
a.durationchange=function(){a.progress(),OvenPlayerConsole.log("EventListener : on durationchange")},
//Fires when the current playlist is ended
a.ended=function(){OvenPlayerConsole.log("EventListener : on ended"),i.getState()!=n.STATE_IDLE&&i.getState()!=n.STATE_COMPLETE&&(i.trigger(n.CONTENT_COMPLETE),i.setState(n.STATE_COMPLETE))},
//Fires when the browser has loaded the current frame of the audio/video
a.loadeddata=function(){
//Do nothing Because this causes chaos by loadedmetadata.
/*
        var metadata = {
            duration: elVideo.duration,
            height: elVideo.videoHeight,
            width: elVideo.videoWidth
        };
        provider.trigger(CONTENT_META, metadata);*/
OvenPlayerConsole.log("EventListener : on loadeddata")},
//Fires when the browser has loaded meta data for the audio/video
a.loadedmetadata=function(){
//ToDo : You consider hlsjs. But not now because we don't support hlsjs.
var a=r.duration==1/0||e===n.PROVIDER_DASH&&t.isDynamic(),o=i.getCurrentQuality()?i.getCurrentQuality().type:"",s={duration:a?1/0:r.duration,type:o};
//provider.setLive(isLive);
OvenPlayerConsole.log("EventListener : on loadedmetadata",s),i.trigger(n.CONTENT_META,s)},
//Fires when the audio/video has been paused
a.pause=function(){return i.getState()!==n.STATE_COMPLETE&&i.getState()!==n.STATE_ERROR&&!r.ended&&!r.error&&r.currentTime!==r.duration&&(OvenPlayerConsole.log("EventListener : on pause"),void i.setState(n.STATE_PAUSED))},
//Fires when the audio/video has been started or is no longer paused
a.play=function(){r.paused||i.getState()===n.STATE_PLAYING||(OvenPlayerConsole.log("EventListener : on play"),i.setState(n.STATE_LOADING))},
//Fires when the audio/video is playing after having been paused or stopped for buffering
a.playing=function(){OvenPlayerConsole.log("EventListener : on playing"),i.setState(n.STATE_PLAYING)},
//Fires when the browser is downloading the audio/video
a.progress=function(){var e=r.buffered;if(!e)return!1;var t=r.duration,a=r.currentTime,o=function(e,t,r){return Math.max(Math.min(e,r),t)}((e.length>0?e.end(e.length-1):0)/t,0,1);OvenPlayerConsole.log("EventListener : on progress",100*o),i.setBuffer(100*o),i.trigger(n.CONTENT_BUFFER,{bufferPercent:100*o,position:a,duration:t})},
//Fires when the browser is trying to get media data, but data is not available
a.stalled=function(){OvenPlayerConsole.log("EventListener : on stall")},
//Fires when the current playback position has changed
a.timeupdate=function(){var e=r.currentTime,t=r.duration;isNaN(t)||(i.isSeeking()||r.paused||i.setState(n.STATE_PLAYING),OvenPlayerConsole.log("EventListener : on timeupdate",{position:e,duration:t}),(i.getState()===n.STATE_PLAYING||i.isSeeking())&&i.trigger(n.CONTENT_TIME,{position:e,duration:t}))},a.resize=function(){OvenPlayerConsole.log("EventListener : on resize")},a.seeking=function(){i.setSeeking(!0),OvenPlayerConsole.log("EventListener : on seeking",r.currentTime),i.trigger(n.CONTENT_SEEK,{position:r.currentTime})},a.seeked=function(){i.isSeeking()&&(OvenPlayerConsole.log("EventListener : on seeked"),i.setSeeking(!1),i.trigger(n.CONTENT_SEEKED))},
//Fires when the video stops because it needs to buffer the next frame
a.waiting=function(){OvenPlayerConsole.log("EventListener : on waiting",i.getState()),i.isSeeking()?i.setState(n.STATE_LOADING):i.getState()==n.STATE_PLAYING&&i.setState(n.STATE_STALLED)},a.volumechange=function(){OvenPlayerConsole.log("EventListener : on volumechange",Math.round(100*r.volume)),i.trigger(n.CONTENT_VOLUME,{volume:Math.round(100*r.volume),mute:r.muted})},a.error=function(){var e=r.error&&r.error.code||0,t={0:{code:n.PLAYER_UNKNWON_ERROR,reason:"Unknown html5 video error",message:"Unknown html5 video error"},1:{code:n.PLAYER_UNKNWON_OPERATION_ERROR,reason:"Unknown operation aborted",message:"Unknown operation aborted"},2:{code:n.PLAYER_UNKNWON_NEWWORK_ERROR,reason:"Unknown network error",message:"Unknown network error"},3:{code:n.PLAYER_UNKNWON_DECODE_ERROR,reason:"Unknown decode error",message:"Unknown decode error"},4:{code:n.PLAYER_FILE_ERROR,reason:"File could not be played",message:"File could not be played"}}[e]||0;t.error=r.error,OvenPlayerConsole.log("EventListener : on error",t),function(e){i.setState(n.STATE_ERROR),i.pause(),
//PRIVATE_STATE_ERROR
i.trigger(n.ERROR,e)}(t)},Object.keys(a).forEach(function(e){r.removeEventListener(e,a[e]),r.addEventListener(e,a[e])}),o.destroy=function(){OvenPlayerConsole.log("EventListener : destroy()"),Object.keys(a).forEach(function(e){r.removeEventListener(e,a[e])})},o}},
/***/79:
/***/function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=c(r(12)),i=c(r(78)),a=c(r(0)),o=c(r(6)),s=r(2);function c(e){return e&&e.__esModule?e:{default:e}}t.default=function(e,t,r,c){OvenPlayerConsole.log("CORE loaded. ");var d={};(0,n.default)(d);var p=function(e,t){return a.default.isElement(t)?t:e===s.PROVIDER_DASH?t.getVideoElement():e===s.PROVIDER_HLS?t.media:null}(e,t),u=(0,i.default)(e,t,p,d),l=!1,f=!1,m=s.STATE_IDLE,v=0,h=-1,g=[],C=r.getConfig().image||"";p.playbackRate=p.defaultPlaybackRate=r.getDefaultPlaybackRate();var y=function(e){var t=Math.max(0,h);if(e)for(var n=0;n<e.length;n++)if(e[n].default&&(t=n),r.getQualityLabel()&&e[n].label===r.getQualityLabel())return n;return t},T=function(e){var t=g[h];if(c)c(t,e);else{OvenPlayerConsole.log("source loaded : ",t,"lastPlayPosition : "+e);var r=p.src,n=document.createElement("source");n.src=t.file,n.src!==r?(p.src=g[h].file,
// Do not call load if src was not set. load() will cancel any active play promise.
r&&p.load()):0==e&&p.currentTime>0&&d.seek(e),e>0&&(d.seek(e),d.play()),d.trigger(s.CONTENT_LEVELS,{currentQuality:h}),C&&(p.poster=C)}};return d.getName=function(){return e},d.canSeek=function(){return l},d.setCanSeek=function(e){l=e},d.isSeeking=function(){return f},d.setSeeking=function(e){f=e},d.setState=function(e){if(m!=e){var t=m;switch(e){case s.STATE_COMPLETE:d.trigger(s.PLAYER_COMPLETE);break;case s.STATE_PAUSED:d.trigger(s.PLAYER_PAUSE,{prevState:m});break;case s.STATE_PLAYING:d.trigger(s.PLAYER_PLAY,{prevState:m})}m=e,d.trigger(s.PLAYER_STATE,{prevstate:t,newstate:m})}},d.getState=function(){return m},d.setBuffer=function(e){v=e},d.getBuffer=function(){return v},d.getDuration=function(){return p.duration==1/0||e===s.PROVIDER_DASH&&t.isDynamic()?1/0:p.duration},d.getPosition=function(){return p.currentTime},d.setVolume=function(e){p.volume=e/100},d.getVolume=function(){return 100*p.volume},d.setMute=function(e){return void 0===e?(p.muted=!p.muted,d.trigger(s.CONTENT_MUTE,{mute:p.muted})):(p.muted=e,d.trigger(s.CONTENT_MUTE,{mute:p.muted})),p.muted},d.getMute=function(){return p.muted},d.preload=function(e,t){return h=y(g=e),T(t||0),new o.default(function(e,t){e()})},d.load=function(e){h=y(g=e),T(e.starttime||0)},d.play=function(){d.getState()!==s.STATE_PLAYING&&p.play()},d.pause=function(){d.getState()==s.STATE_PLAYING&&p.pause()},d.seek=function(e){p.currentTime=e},d.setPlaybackRate=function(e){return d.trigger(s.PLAYBACK_RATE_CHANGED,{playbackRate:e}),p.playbackRate=p.defaultPlaybackRate=e},d.getPlaybackRate=function(){return p.playbackRate},d.getQualityLevels=function(){return g.map(function(e,t){return{file:e.file,type:e.type,label:e.label,index:t}})},d.getCurrentQuality=function(){var e=g[h];return{file:e.file,type:e.type,label:e.label,index:h}},d.setCurrentQuality=function(e,t){return h!=e&&(e>-1&&g&&g.length>e?(
//that.pause();
d.setState(s.STATE_IDLE),OvenPlayerConsole.log("source changed : "+e),h=e,d.trigger(s.CONTENT_LEVEL_CHANGED,{currentQuality:e}),r.setQualityLabel(g[e].label),t&&T(p.currentTime||0),h):void 0)},d.stop=function(){for(OvenPlayerConsole.log("CORE : stop() "),p.removeAttribute("preload"),p.removeAttribute("src");p.firstChild;)p.removeChild(p.firstChild);d.pause(),d.setState(s.STATE_IDLE)},d.destroy=function(){d.stop(),u.destroy(),
//elVideo.remove();
d.off(),OvenPlayerConsole.log("CORE : destroy() player stop, listener, event destroied")},
//XXX : I hope using es6 classes. but I think to occur problem from Old IE. Then I choice function inherit. Finally using super function is so difficult.
// use : let super_destroy  = that.super('destroy'); ... super_destroy();
d.super=function(e){var t=d[e];return function(){return t.apply(d,arguments)}},d}},
/***/82:
/***/function(e,t,r){"use strict";
/* WEBPACK VAR INJECTION */
/* WEBPACK VAR INJECTION */(function(r){var n,i,a,o,s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(r){"object"===c(t)&&void 0!==e?e.exports=r():(i=[],void 0===(a="function"==typeof(n=r)?n.apply(t,i):n)||(e.exports=a))}(function(){return function e(t,r,n){function i(s,c){if(!r[s]){if(!t[s]){if(!c&&("function"==typeof o&&o))return o(s,!0);if(a)return a(s,!0);var d=new Error("Cannot find module '"+s+"'");throw d.code="MODULE_NOT_FOUND",d}var p=r[s]={exports:{}};t[s][0].call(p.exports,function(e){var r=t[s][1][e];return i(r||e)},p,p.exports,e,t,r,n)}return r[s].exports}for(var a="function"==typeof o&&o,s=0;s<n.length;s++)i(n[s]);return i}({1:[function(e,t,r){var n=e("sdp");function i(e,t,r,i,a){var o=n.writeRtpDescription(e.kind,t);
// Map ICE parameters (ufrag, pwd) to SDP.
if(o+=n.writeIceParameters(e.iceGatherer.getLocalParameters()),
// Map DTLS parameters to SDP.
o+=n.writeDtlsParameters(e.dtlsTransport.getLocalParameters(),"offer"===r?"actpass":a||"active"),o+="a=mid:"+e.mid+"\r\n",e.rtpSender&&e.rtpReceiver?o+="a=sendrecv\r\n":e.rtpSender?o+="a=sendonly\r\n":e.rtpReceiver?o+="a=recvonly\r\n":o+="a=inactive\r\n",e.rtpSender){var s=e.rtpSender._initialTrackId||e.rtpSender.track.id;e.rtpSender._initialTrackId=s;
// spec.
var c="msid:"+(i?i.id:"-")+" "+s+"\r\n";o+="a="+c,
// for Chrome. Legacy should no longer be required.
o+="a=ssrc:"+e.sendEncodingParameters[0].ssrc+" "+c,
// RTX
e.sendEncodingParameters[0].rtx&&(o+="a=ssrc:"+e.sendEncodingParameters[0].rtx.ssrc+" "+c,o+="a=ssrc-group:FID "+e.sendEncodingParameters[0].ssrc+" "+e.sendEncodingParameters[0].rtx.ssrc+"\r\n")}
// FIXME: this should be written by writeRtpDescription.
return o+="a=ssrc:"+e.sendEncodingParameters[0].ssrc+" cname:"+n.localCName+"\r\n",e.rtpSender&&e.sendEncodingParameters[0].rtx&&(o+="a=ssrc:"+e.sendEncodingParameters[0].rtx.ssrc+" cname:"+n.localCName+"\r\n"),o}
// Edge does not like
// 1) stun: filtered after 14393 unless ?transport=udp is present
// 2) turn: that does not have all of turn:host:port?transport=udp
// 3) turn: with ipv6 addresses
// 4) turn: occurring muliple times
// Determines the intersection of local and remote capabilities.
function a(e,t){var r={codecs:[],headerExtensions:[],fecMechanisms:[]},n=function(e,t){e=parseInt(e,10);for(var r=0;r<t.length;r++)if(t[r].payloadType===e||t[r].preferredPayloadType===e)return t[r]},i=function(e,t,r,i){var a=n(e.parameters.apt,r),o=n(t.parameters.apt,i);return a&&o&&a.name.toLowerCase()===o.name.toLowerCase()};
// FIXME: fecMechanisms
return e.codecs.forEach(function(n){for(var a=0;a<t.codecs.length;a++){var o=t.codecs[a];if(n.name.toLowerCase()===o.name.toLowerCase()&&n.clockRate===o.clockRate){if("rtx"===n.name.toLowerCase()&&n.parameters&&o.parameters.apt&&!i(n,o,e.codecs,t.codecs))continue;// deepcopy
// number of channels is the highest common number of channels
(o=JSON.parse(JSON.stringify(o))).numChannels=Math.min(n.numChannels,o.numChannels),
// push rCodec so we reply with offerer payload type
r.codecs.push(o),
// determine common feedback mechanisms
o.rtcpFeedback=o.rtcpFeedback.filter(function(e){for(var t=0;t<n.rtcpFeedback.length;t++)if(n.rtcpFeedback[t].type===e.type&&n.rtcpFeedback[t].parameter===e.parameter)return!0;return!1});
// FIXME: also need to determine .parameters
//  see https://github.com/openpeer/ortc/issues/569
break}}}),e.headerExtensions.forEach(function(e){for(var n=0;n<t.headerExtensions.length;n++){var i=t.headerExtensions[n];if(e.uri===i.uri){r.headerExtensions.push(i);break}}}),r}
// is action=setLocalDescription with type allowed in signalingState
function o(e,t,r){return-1!=={offer:{setLocalDescription:["stable","have-local-offer"],setRemoteDescription:["stable","have-remote-offer"]},answer:{setLocalDescription:["have-remote-offer","have-local-pranswer"],setRemoteDescription:["have-local-offer","have-remote-pranswer"]}}[t][e].indexOf(r)}function c(e,t){
// Edge's internal representation adds some fields therefore
// not all fieldѕ are taken into account.
var r=e.getRemoteCandidates().find(function(e){return t.foundation===e.foundation&&t.ip===e.ip&&t.port===e.port&&t.priority===e.priority&&t.protocol===e.protocol&&t.type===e.type});return r||e.addRemoteCandidate(t),!r}function d(e,t){var r=new Error(t);return r.name=e,
// legacy error codes from https://heycam.github.io/webidl/#idl-DOMException-error-names
r.code={NotSupportedError:9,InvalidStateError:11,InvalidAccessError:15,TypeError:void 0,OperationError:void 0}[e],r}t.exports=function(e,t){
// https://w3c.github.io/mediacapture-main/#mediastream
// Helper function to add the track to the stream and
// dispatch the event ourselves.
function r(t,r){r.addTrack(t),r.dispatchEvent(new e.MediaStreamTrackEvent("addtrack",{track:t}))}function p(t,r,n,i){var a=new Event("track");a.track=r,a.receiver=n,a.transceiver={receiver:n},a.streams=i,e.setTimeout(function(){t._dispatchEvent("track",a)})}var u=function(r){var i=this,a=document.createDocumentFragment();if(["addEventListener","removeEventListener","dispatchEvent"].forEach(function(e){i[e]=a[e].bind(a)}),this.canTrickleIceCandidates=null,this.needNegotiation=!1,this.localStreams=[],this.remoteStreams=[],this.localDescription=null,this.remoteDescription=null,this.signalingState="stable",this.iceConnectionState="new",this.connectionState="new",this.iceGatheringState="new",r=JSON.parse(JSON.stringify(r||{})),this.usingBundle="max-bundle"===r.bundlePolicy,"negotiate"===r.rtcpMuxPolicy)throw d("NotSupportedError","rtcpMuxPolicy 'negotiate' is not supported");switch(r.rtcpMuxPolicy||(r.rtcpMuxPolicy="require"),r.iceTransportPolicy){case"all":case"relay":break;default:r.iceTransportPolicy="all"}switch(r.bundlePolicy){case"balanced":case"max-compat":case"max-bundle":break;default:r.bundlePolicy="balanced"}if(r.iceServers=function(e,t){var r=!1;return(e=JSON.parse(JSON.stringify(e))).filter(function(e){if(e&&(e.urls||e.url)){var n=e.urls||e.url;e.url&&!e.urls&&console.warn("RTCIceServer.url is deprecated! Use urls instead.");var i="string"==typeof n;return i&&(n=[n]),n=n.filter(function(e){return 0!==e.indexOf("turn:")||-1===e.indexOf("transport=udp")||-1!==e.indexOf("turn:[")||r?0===e.indexOf("stun:")&&t>=14393&&-1===e.indexOf("?transport=udp"):(r=!0,!0)}),delete e.url,e.urls=i?n[0]:n,!!n.length}})}(r.iceServers||[],t),this._iceGatherers=[],r.iceCandidatePoolSize)for(var o=r.iceCandidatePoolSize;o>0;o--)this._iceGatherers.push(new e.RTCIceGatherer({iceServers:r.iceServers,gatherPolicy:r.iceTransportPolicy}));else r.iceCandidatePoolSize=0;this._config=r,
// per-track iceGathers, iceTransports, dtlsTransports, rtpSenders, ...
// everything that is needed to describe a SDP m-line.
this.transceivers=[],this._sdpSessionId=n.generateSessionId(),this._sdpSessionVersion=0,this._dtlsRole=void 0,// role for a=setup to use in answers.
this._isClosed=!1};
// set up event handlers on prototype
u.prototype.onicecandidate=null,u.prototype.onaddstream=null,u.prototype.ontrack=null,u.prototype.onremovestream=null,u.prototype.onsignalingstatechange=null,u.prototype.oniceconnectionstatechange=null,u.prototype.onconnectionstatechange=null,u.prototype.onicegatheringstatechange=null,u.prototype.onnegotiationneeded=null,u.prototype.ondatachannel=null,u.prototype._dispatchEvent=function(e,t){this._isClosed||(this.dispatchEvent(t),"function"==typeof this["on"+e]&&this["on"+e](t))},u.prototype._emitGatheringStateChange=function(){var e=new Event("icegatheringstatechange");this._dispatchEvent("icegatheringstatechange",e)},u.prototype.getConfiguration=function(){return this._config},u.prototype.getLocalStreams=function(){return this.localStreams},u.prototype.getRemoteStreams=function(){return this.remoteStreams},
// internal helper to create a transceiver object.
// (which is not yet the same as the WebRTC 1.0 transceiver)
u.prototype._createTransceiver=function(e,t){var r=this.transceivers.length>0,n={track:null,iceGatherer:null,iceTransport:null,dtlsTransport:null,localCapabilities:null,remoteCapabilities:null,rtpSender:null,rtpReceiver:null,kind:e,mid:null,sendEncodingParameters:null,recvEncodingParameters:null,stream:null,associatedRemoteMediaStreams:[],wantReceive:!0};if(this.usingBundle&&r)n.iceTransport=this.transceivers[0].iceTransport,n.dtlsTransport=this.transceivers[0].dtlsTransport;else{var i=this._createIceAndDtlsTransports();n.iceTransport=i.iceTransport,n.dtlsTransport=i.dtlsTransport}return t||this.transceivers.push(n),n},u.prototype.addTrack=function(t,r){if(this._isClosed)throw d("InvalidStateError","Attempted to call addTrack on a closed peerconnection.");var n;if(this.transceivers.find(function(e){return e.track===t}))throw d("InvalidAccessError","Track already exists.");for(var i=0;i<this.transceivers.length;i++)this.transceivers[i].track||this.transceivers[i].kind!==t.kind||(n=this.transceivers[i]);return n||(n=this._createTransceiver(t.kind)),this._maybeFireNegotiationNeeded(),-1===this.localStreams.indexOf(r)&&this.localStreams.push(r),n.track=t,n.stream=r,n.rtpSender=new e.RTCRtpSender(t,n.dtlsTransport),n.rtpSender},u.prototype.addStream=function(e){var r=this;if(t>=15025)e.getTracks().forEach(function(t){r.addTrack(t,e)});else{
// Clone is necessary for local demos mostly, attaching directly
// to two different senders does not work (build 10547).
// Fixed in 15025 (or earlier)
var n=e.clone();e.getTracks().forEach(function(e,t){var r=n.getTracks()[t];e.addEventListener("enabled",function(e){r.enabled=e.enabled})}),n.getTracks().forEach(function(e){r.addTrack(e,n)})}},u.prototype.removeTrack=function(t){if(this._isClosed)throw d("InvalidStateError","Attempted to call removeTrack on a closed peerconnection.");if(!(t instanceof e.RTCRtpSender))throw new TypeError("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.");var r=this.transceivers.find(function(e){return e.rtpSender===t});if(!r)throw d("InvalidAccessError","Sender was not created by this connection.");var n=r.stream;r.rtpSender.stop(),r.rtpSender=null,r.track=null,r.stream=null,-1===this.transceivers.map(function(e){return e.stream}).indexOf(n)&&this.localStreams.indexOf(n)>-1&&this.localStreams.splice(this.localStreams.indexOf(n),1),this._maybeFireNegotiationNeeded()},u.prototype.removeStream=function(e){var t=this;e.getTracks().forEach(function(e){var r=t.getSenders().find(function(t){return t.track===e});r&&t.removeTrack(r)})},u.prototype.getSenders=function(){return this.transceivers.filter(function(e){return!!e.rtpSender}).map(function(e){return e.rtpSender})},u.prototype.getReceivers=function(){return this.transceivers.filter(function(e){return!!e.rtpReceiver}).map(function(e){return e.rtpReceiver})},u.prototype._createIceGatherer=function(t,r){var n=this;if(r&&t>0)return this.transceivers[0].iceGatherer;if(this._iceGatherers.length)return this._iceGatherers.shift();var i=new e.RTCIceGatherer({iceServers:this._config.iceServers,gatherPolicy:this._config.iceTransportPolicy});return Object.defineProperty(i,"state",{value:"new",writable:!0}),this.transceivers[t].bufferedCandidateEvents=[],this.transceivers[t].bufferCandidates=function(e){var r=!e.candidate||0===Object.keys(e.candidate).length;
// polyfill since RTCIceGatherer.state is not implemented in
// Edge 10547 yet.
i.state=r?"completed":"gathering",null!==n.transceivers[t].bufferedCandidateEvents&&n.transceivers[t].bufferedCandidateEvents.push(e)},i.addEventListener("localcandidate",this.transceivers[t].bufferCandidates),i},
// start gathering from an RTCIceGatherer.
u.prototype._gather=function(t,r){var i=this,a=this.transceivers[r].iceGatherer;if(!a.onlocalcandidate){var o=this.transceivers[r].bufferedCandidateEvents;this.transceivers[r].bufferedCandidateEvents=null,a.removeEventListener("localcandidate",this.transceivers[r].bufferCandidates),a.onlocalcandidate=function(e){if(!(i.usingBundle&&r>0)){var o=new Event("icecandidate");o.candidate={sdpMid:t,sdpMLineIndex:r};var c=e.candidate,d=!c||0===Object.keys(c).length;
// Edge emits an empty object for RTCIceCandidateComplete‥
if(d)
// polyfill since RTCIceGatherer.state is not implemented in
// Edge 10547 yet.
"new"!==a.state&&"gathering"!==a.state||(a.state="completed");else{"new"===a.state&&(a.state="gathering"),
// RTCIceCandidate doesn't have a component, needs to be added
c.component=1,
// also the usernameFragment. TODO: update SDP to take both variants.
c.ufrag=a.getLocalParameters().usernameFragment;var p=n.writeCandidate(c);o.candidate=s(o.candidate,n.parseCandidate(p)),o.candidate.candidate=p,o.candidate.toJSON=function(){return{candidate:o.candidate.candidate,sdpMid:o.candidate.sdpMid,sdpMLineIndex:o.candidate.sdpMLineIndex,usernameFragment:o.candidate.usernameFragment}}}
// update local description.
var u=n.getMediaSections(i.localDescription.sdp);u[o.candidate.sdpMLineIndex]+=d?"a=end-of-candidates\r\n":"a="+o.candidate.candidate+"\r\n",i.localDescription.sdp=n.getDescription(i.localDescription.sdp)+u.join("");var l=i.transceivers.every(function(e){return e.iceGatherer&&"completed"===e.iceGatherer.state});"gathering"!==i.iceGatheringState&&(i.iceGatheringState="gathering",i._emitGatheringStateChange()),
// Emit candidate. Also emit null candidate when all gatherers are
// complete.
d||i._dispatchEvent("icecandidate",o),l&&(i._dispatchEvent("icecandidate",new Event("icecandidate")),i.iceGatheringState="complete",i._emitGatheringStateChange())}},
// emit already gathered candidates.
e.setTimeout(function(){o.forEach(function(e){a.onlocalcandidate(e)})},0)}},
// Create ICE transport and DTLS transport.
u.prototype._createIceAndDtlsTransports=function(){var t=this,r=new e.RTCIceTransport(null);r.onicestatechange=function(){t._updateIceConnectionState(),t._updateConnectionState()};var n=new e.RTCDtlsTransport(r);return n.ondtlsstatechange=function(){t._updateConnectionState()},n.onerror=function(){
// onerror does not set state to failed by itself.
Object.defineProperty(n,"state",{value:"failed",writable:!0}),t._updateConnectionState()},{iceTransport:r,dtlsTransport:n}},
// Destroy ICE gatherer, ICE transport and DTLS transport.
// Without triggering the callbacks.
u.prototype._disposeIceAndDtlsTransports=function(e){var t=this.transceivers[e].iceGatherer;t&&(delete t.onlocalcandidate,delete this.transceivers[e].iceGatherer);var r=this.transceivers[e].iceTransport;r&&(delete r.onicestatechange,delete this.transceivers[e].iceTransport);var n=this.transceivers[e].dtlsTransport;n&&(delete n.ondtlsstatechange,delete n.onerror,delete this.transceivers[e].dtlsTransport)},
// Start the RTP Sender and Receiver for a transceiver.
u.prototype._transceive=function(e,r,i){var o=a(e.localCapabilities,e.remoteCapabilities);r&&e.rtpSender&&(o.encodings=e.sendEncodingParameters,o.rtcp={cname:n.localCName,compound:e.rtcpParameters.compound},e.recvEncodingParameters.length&&(o.rtcp.ssrc=e.recvEncodingParameters[0].ssrc),e.rtpSender.send(o)),i&&e.rtpReceiver&&o.codecs.length>0&&(
// remove RTX field in Edge 14942
"video"===e.kind&&e.recvEncodingParameters&&t<15019&&e.recvEncodingParameters.forEach(function(e){delete e.rtx}),e.recvEncodingParameters.length?o.encodings=e.recvEncodingParameters:o.encodings=[{}],o.rtcp={compound:e.rtcpParameters.compound},e.rtcpParameters.cname&&(o.rtcp.cname=e.rtcpParameters.cname),e.sendEncodingParameters.length&&(o.rtcp.ssrc=e.sendEncodingParameters[0].ssrc),e.rtpReceiver.receive(o))},u.prototype.setLocalDescription=function(e){var t,r,i=this;
// Note: pranswer is not supported.
if(-1===["offer","answer"].indexOf(e.type))return Promise.reject(d("TypeError",'Unsupported type "'+e.type+'"'));if(!o("setLocalDescription",e.type,i.signalingState)||i._isClosed)return Promise.reject(d("InvalidStateError","Can not set local "+e.type+" in state "+i.signalingState));if("offer"===e.type)
// VERY limited support for SDP munging. Limited to:
// * changing the order of codecs
t=n.splitSections(e.sdp),r=t.shift(),t.forEach(function(e,t){var r=n.parseRtpParameters(e);i.transceivers[t].localCapabilities=r}),i.transceivers.forEach(function(e,t){i._gather(e.mid,t)});else if("answer"===e.type){t=n.splitSections(i.remoteDescription.sdp),r=t.shift();var s=n.matchPrefix(r,"a=ice-lite").length>0;t.forEach(function(e,t){var o=i.transceivers[t],c=o.iceGatherer,d=o.iceTransport,p=o.dtlsTransport,u=o.localCapabilities,l=o.remoteCapabilities;if(!(n.isRejected(e)&&0===n.matchPrefix(e,"a=bundle-only").length)&&!o.rejected){var f=n.getIceParameters(e,r),m=n.getDtlsParameters(e,r);s&&(m.role="server"),i.usingBundle&&0!==t||(i._gather(o.mid,t),"new"===d.state&&d.start(c,f,s?"controlling":"controlled"),"new"===p.state&&p.start(m));
// Calculate intersection of capabilities.
var v=a(u,l);
// Start the RTCRtpSender. The RTCRtpReceiver for this
// transceiver has already been started in setRemoteDescription.
i._transceive(o,v.codecs.length>0,!1)}})}return i.localDescription={type:e.type,sdp:e.sdp},"offer"===e.type?i._updateSignalingState("have-local-offer"):i._updateSignalingState("stable"),Promise.resolve()},u.prototype.setRemoteDescription=function(i){var a=this;
// Note: pranswer is not supported.
if(-1===["offer","answer"].indexOf(i.type))return Promise.reject(d("TypeError",'Unsupported type "'+i.type+'"'));if(!o("setRemoteDescription",i.type,a.signalingState)||a._isClosed)return Promise.reject(d("InvalidStateError","Can not set remote "+i.type+" in state "+a.signalingState));var s={};a.remoteStreams.forEach(function(e){s[e.id]=e});var u=[],l=n.splitSections(i.sdp),f=l.shift(),m=n.matchPrefix(f,"a=ice-lite").length>0,v=n.matchPrefix(f,"a=group:BUNDLE ").length>0;a.usingBundle=v;var h=n.matchPrefix(f,"a=ice-options:")[0];return a.canTrickleIceCandidates=!!h&&h.substr(14).split(" ").indexOf("trickle")>=0,l.forEach(function(o,d){var p=n.splitLines(o),l=n.getKind(o),h=n.isRejected(o)&&0===n.matchPrefix(o,"a=bundle-only").length,g=p[0].substr(2).split(" ")[2],C=n.getDirection(o,f),y=n.parseMsid(o),T=n.getMid(o)||n.generateIdentifier();
// Reject datachannels which are not implemented yet.
if("application"===l&&"DTLS/SCTP"===g||h)
// TODO: this is dangerous in the case where a non-rejected m-line
//     becomes rejected.
a.transceivers[d]={mid:T,kind:l,rejected:!0};else{var S,E,R,P,b,_,k,O,w;!h&&a.transceivers[d]&&a.transceivers[d].rejected&&(
// recycle a rejected transceiver.
a.transceivers[d]=a._createTransceiver(l,!0));
// FIXME: ensure the mediaSection has rtcp-mux set.
var L,x,D=n.parseRtpParameters(o);h||(L=n.getIceParameters(o,f),(x=n.getDtlsParameters(o,f)).role="client"),k=n.parseRtpEncodingParameters(o);var M=n.parseRtcpParameters(o),I=n.matchPrefix(o,"a=end-of-candidates",f).length>0,A=n.matchPrefix(o,"a=candidate:").map(function(e){return n.parseCandidate(e)}).filter(function(e){return 1===e.component});if(
// Check if we can use BUNDLE and dispose transports.
("offer"===i.type||"answer"===i.type)&&!h&&v&&d>0&&a.transceivers[d]&&(a._disposeIceAndDtlsTransports(d),a.transceivers[d].iceGatherer=a.transceivers[0].iceGatherer,a.transceivers[d].iceTransport=a.transceivers[0].iceTransport,a.transceivers[d].dtlsTransport=a.transceivers[0].dtlsTransport,a.transceivers[d].rtpSender&&a.transceivers[d].rtpSender.setTransport(a.transceivers[0].dtlsTransport),a.transceivers[d].rtpReceiver&&a.transceivers[d].rtpReceiver.setTransport(a.transceivers[0].dtlsTransport)),"offer"!==i.type||h)"answer"!==i.type||h||(E=(S=a.transceivers[d]).iceGatherer,R=S.iceTransport,P=S.dtlsTransport,b=S.rtpReceiver,_=S.sendEncodingParameters,O=S.localCapabilities,a.transceivers[d].recvEncodingParameters=k,a.transceivers[d].remoteCapabilities=D,a.transceivers[d].rtcpParameters=M,A.length&&"new"===R.state&&(!m&&!I||v&&0!==d?A.forEach(function(e){c(S.iceTransport,e)}):R.setRemoteCandidates(A)),v&&0!==d||("new"===R.state&&R.start(E,L,"controlling"),"new"===P.state&&P.start(x)),a._transceive(S,"sendrecv"===C||"recvonly"===C,"sendrecv"===C||"sendonly"===C),
// TODO: rewrite to use http://w3c.github.io/webrtc-pc/#set-associated-remote-streams
!b||"sendrecv"!==C&&"sendonly"!==C?
// FIXME: actually the receiver should be created later.
delete S.rtpReceiver:(w=b.track,y?(s[y.stream]||(s[y.stream]=new e.MediaStream),r(w,s[y.stream]),u.push([w,b,s[y.stream]])):(s.default||(s.default=new e.MediaStream),r(w,s.default),u.push([w,b,s.default]))));else{(S=a.transceivers[d]||a._createTransceiver(l)).mid=T,S.iceGatherer||(S.iceGatherer=a._createIceGatherer(d,v)),A.length&&"new"===S.iceTransport.state&&(!I||v&&0!==d?A.forEach(function(e){c(S.iceTransport,e)}):S.iceTransport.setRemoteCandidates(A)),O=e.RTCRtpReceiver.getCapabilities(l),
// filter RTX until additional stuff needed for RTX is implemented
// in adapter.js
t<15019&&(O.codecs=O.codecs.filter(function(e){return"rtx"!==e.name})),_=S.sendEncodingParameters||[{ssrc:1001*(2*d+2)}];
// TODO: rewrite to use http://w3c.github.io/webrtc-pc/#set-associated-remote-streams
var j,N=!1;if("sendrecv"===C||"sendonly"===C){if(N=!S.rtpReceiver,b=S.rtpReceiver||new e.RTCRtpReceiver(S.dtlsTransport,l),N)w=b.track,
// FIXME: does not work with Plan B.
y&&"-"===y.stream||(y?(s[y.stream]||(s[y.stream]=new e.MediaStream,Object.defineProperty(s[y.stream],"id",{get:function(){return y.stream}})),Object.defineProperty(w,"id",{get:function(){return y.track}}),j=s[y.stream]):(s.default||(s.default=new e.MediaStream),j=s.default)),j&&(r(w,j),S.associatedRemoteMediaStreams.push(j)),u.push([w,b,j])}else S.rtpReceiver&&S.rtpReceiver.track&&(S.associatedRemoteMediaStreams.forEach(function(t){var r=t.getTracks().find(function(e){return e.id===S.rtpReceiver.track.id});r&&function(t,r){r.removeTrack(t),r.dispatchEvent(new e.MediaStreamTrackEvent("removetrack",{track:t}))}(r,t)}),S.associatedRemoteMediaStreams=[]);S.localCapabilities=O,S.remoteCapabilities=D,S.rtpReceiver=b,S.rtcpParameters=M,S.sendEncodingParameters=_,S.recvEncodingParameters=k,
// Start the RTCRtpReceiver now. The RTPSender is started in
// setLocalDescription.
a._transceive(a.transceivers[d],!1,N)}}}),void 0===a._dtlsRole&&(a._dtlsRole="offer"===i.type?"active":"passive"),a.remoteDescription={type:i.type,sdp:i.sdp},"offer"===i.type?a._updateSignalingState("have-remote-offer"):a._updateSignalingState("stable"),Object.keys(s).forEach(function(t){var r=s[t];if(r.getTracks().length){if(-1===a.remoteStreams.indexOf(r)){a.remoteStreams.push(r);var n=new Event("addstream");n.stream=r,e.setTimeout(function(){a._dispatchEvent("addstream",n)})}u.forEach(function(e){var t=e[0],n=e[1];r.id===e[2].id&&p(a,t,n,[r])})}}),u.forEach(function(e){e[2]||p(a,e[0],e[1],[])}),
// check whether addIceCandidate({}) was called within four seconds after
// setRemoteDescription.
e.setTimeout(function(){a&&a.transceivers&&a.transceivers.forEach(function(e){e.iceTransport&&"new"===e.iceTransport.state&&e.iceTransport.getRemoteCandidates().length>0&&(console.warn("Timeout for addRemoteCandidate. Consider sending an end-of-candidates notification"),e.iceTransport.addRemoteCandidate({}))})},4e3),Promise.resolve()},u.prototype.close=function(){this.transceivers.forEach(function(e){
/* not yet
            if (transceiver.iceGatherer) {
              transceiver.iceGatherer.close();
            }
            */
e.iceTransport&&e.iceTransport.stop(),e.dtlsTransport&&e.dtlsTransport.stop(),e.rtpSender&&e.rtpSender.stop(),e.rtpReceiver&&e.rtpReceiver.stop()}),
// FIXME: clean up tracks, local streams, remote streams, etc
this._isClosed=!0,this._updateSignalingState("closed")},
// Update the signaling state.
u.prototype._updateSignalingState=function(e){this.signalingState=e;var t=new Event("signalingstatechange");this._dispatchEvent("signalingstatechange",t)},
// Determine whether to fire the negotiationneeded event.
u.prototype._maybeFireNegotiationNeeded=function(){var t=this;"stable"===this.signalingState&&!0!==this.needNegotiation&&(this.needNegotiation=!0,e.setTimeout(function(){if(t.needNegotiation){t.needNegotiation=!1;var e=new Event("negotiationneeded");t._dispatchEvent("negotiationneeded",e)}},0))},
// Update the ice connection state.
u.prototype._updateIceConnectionState=function(){var e,t={new:0,closed:0,checking:0,connected:0,completed:0,disconnected:0,failed:0};if(this.transceivers.forEach(function(e){t[e.iceTransport.state]++}),e="new",t.failed>0?e="failed":t.checking>0?e="checking":t.disconnected>0?e="disconnected":t.new>0?e="new":t.connected>0?e="connected":t.completed>0&&(e="completed"),e!==this.iceConnectionState){this.iceConnectionState=e;var r=new Event("iceconnectionstatechange");this._dispatchEvent("iceconnectionstatechange",r)}},
// Update the connection state.
u.prototype._updateConnectionState=function(){var e,t={new:0,closed:0,connecting:0,connected:0,completed:0,disconnected:0,failed:0};if(this.transceivers.forEach(function(e){t[e.iceTransport.state]++,t[e.dtlsTransport.state]++}),
// ICETransport.completed and connected are the same for this purpose.
t.connected+=t.completed,e="new",t.failed>0?e="failed":t.connecting>0?e="connecting":t.disconnected>0?e="disconnected":t.new>0?e="new":t.connected>0&&(e="connected"),e!==this.connectionState){this.connectionState=e;var r=new Event("connectionstatechange");this._dispatchEvent("connectionstatechange",r)}},u.prototype.createOffer=function(){var r=this;if(r._isClosed)return Promise.reject(d("InvalidStateError","Can not call createOffer after close"));var a=r.transceivers.filter(function(e){return"audio"===e.kind}).length,o=r.transceivers.filter(function(e){return"video"===e.kind}).length,s=arguments[0];if(s){
// Reject Chrome legacy constraints.
if(s.mandatory||s.optional)throw new TypeError("Legacy mandatory/optional constraints not supported.");void 0!==s.offerToReceiveAudio&&(a=!0===s.offerToReceiveAudio?1:!1===s.offerToReceiveAudio?0:s.offerToReceiveAudio),void 0!==s.offerToReceiveVideo&&(o=!0===s.offerToReceiveVideo?1:!1===s.offerToReceiveVideo?0:s.offerToReceiveVideo)}
// Create M-lines for recvonly streams.
for(r.transceivers.forEach(function(e){"audio"===e.kind?--a<0&&(e.wantReceive=!1):"video"===e.kind&&--o<0&&(e.wantReceive=!1)});a>0||o>0;)a>0&&(r._createTransceiver("audio"),a--),o>0&&(r._createTransceiver("video"),o--);var c=n.writeSessionBoilerplate(r._sdpSessionId,r._sdpSessionVersion++);r.transceivers.forEach(function(i,a){
// For each track, create an ice gatherer, ice transport,
// dtls transport, potentially rtpsender and rtpreceiver.
var o=i.track,s=i.kind,c=i.mid||n.generateIdentifier();i.mid=c,i.iceGatherer||(i.iceGatherer=r._createIceGatherer(a,r.usingBundle));var d=e.RTCRtpSender.getCapabilities(s);
// filter RTX until additional stuff needed for RTX is implemented
// in adapter.js
t<15019&&(d.codecs=d.codecs.filter(function(e){return"rtx"!==e.name})),d.codecs.forEach(function(e){
// work around https://bugs.chromium.org/p/webrtc/issues/detail?id=6552
// by adding level-asymmetry-allowed=1
"H264"===e.name&&void 0===e.parameters["level-asymmetry-allowed"]&&(e.parameters["level-asymmetry-allowed"]="1"),
// for subsequent offers, we might have to re-use the payload
// type of the last offer.
i.remoteCapabilities&&i.remoteCapabilities.codecs&&i.remoteCapabilities.codecs.forEach(function(t){e.name.toLowerCase()===t.name.toLowerCase()&&e.clockRate===t.clockRate&&(e.preferredPayloadType=t.payloadType)})}),d.headerExtensions.forEach(function(e){(i.remoteCapabilities&&i.remoteCapabilities.headerExtensions||[]).forEach(function(t){e.uri===t.uri&&(e.id=t.id)})});
// generate an ssrc now, to be used later in rtpSender.send
var p=i.sendEncodingParameters||[{ssrc:1001*(2*a+1)}];o&&t>=15019&&"video"===s&&!p[0].rtx&&(p[0].rtx={ssrc:p[0].ssrc+1}),i.wantReceive&&(i.rtpReceiver=new e.RTCRtpReceiver(i.dtlsTransport,s)),i.localCapabilities=d,i.sendEncodingParameters=p}),
// always offer BUNDLE and dispose on return if not supported.
"max-compat"!==r._config.bundlePolicy&&(c+="a=group:BUNDLE "+r.transceivers.map(function(e){return e.mid}).join(" ")+"\r\n"),c+="a=ice-options:trickle\r\n",r.transceivers.forEach(function(e,t){c+=i(e,e.localCapabilities,"offer",e.stream,r._dtlsRole),c+="a=rtcp-rsize\r\n",!e.iceGatherer||"new"===r.iceGatheringState||0!==t&&r.usingBundle||(e.iceGatherer.getLocalCandidates().forEach(function(e){e.component=1,c+="a="+n.writeCandidate(e)+"\r\n"}),"completed"===e.iceGatherer.state&&(c+="a=end-of-candidates\r\n"))});var p=new e.RTCSessionDescription({type:"offer",sdp:c});return Promise.resolve(p)},u.prototype.createAnswer=function(){var r=this;if(r._isClosed)return Promise.reject(d("InvalidStateError","Can not call createAnswer after close"));if("have-remote-offer"!==r.signalingState&&"have-local-pranswer"!==r.signalingState)return Promise.reject(d("InvalidStateError","Can not call createAnswer in signalingState "+r.signalingState));var o=n.writeSessionBoilerplate(r._sdpSessionId,r._sdpSessionVersion++);r.usingBundle&&(o+="a=group:BUNDLE "+r.transceivers.map(function(e){return e.mid}).join(" ")+"\r\n");var s=n.getMediaSections(r.remoteDescription.sdp).length;r.transceivers.forEach(function(e,n){if(!(n+1>s)){if(e.rejected)return"application"===e.kind?o+="m=application 0 DTLS/SCTP 5000\r\n":"audio"===e.kind?o+="m=audio 0 UDP/TLS/RTP/SAVPF 0\r\na=rtpmap:0 PCMU/8000\r\n":"video"===e.kind&&(o+="m=video 0 UDP/TLS/RTP/SAVPF 120\r\na=rtpmap:120 VP8/90000\r\n"),void(o+="c=IN IP4 0.0.0.0\r\na=inactive\r\na=mid:"+e.mid+"\r\n");
// FIXME: look at direction.
var c;if(e.stream)"audio"===e.kind?c=e.stream.getAudioTracks()[0]:"video"===e.kind&&(c=e.stream.getVideoTracks()[0]),c&&t>=15019&&"video"===e.kind&&!e.sendEncodingParameters[0].rtx&&(e.sendEncodingParameters[0].rtx={ssrc:e.sendEncodingParameters[0].ssrc+1});
// Calculate intersection of capabilities.
var d=a(e.localCapabilities,e.remoteCapabilities);!d.codecs.filter(function(e){return"rtx"===e.name.toLowerCase()}).length&&e.sendEncodingParameters[0].rtx&&delete e.sendEncodingParameters[0].rtx,o+=i(e,d,"answer",e.stream,r._dtlsRole),e.rtcpParameters&&e.rtcpParameters.reducedSize&&(o+="a=rtcp-rsize\r\n")}});var c=new e.RTCSessionDescription({type:"answer",sdp:o});return Promise.resolve(c)},u.prototype.addIceCandidate=function(e){var t,r=this;return e&&void 0===e.sdpMLineIndex&&!e.sdpMid?Promise.reject(new TypeError("sdpMLineIndex or sdpMid required")):new Promise(function(i,a){if(!r.remoteDescription)return a(d("InvalidStateError","Can not add ICE candidate without a remote description"));if(e&&""!==e.candidate){var o=e.sdpMLineIndex;if(e.sdpMid)for(var s=0;s<r.transceivers.length;s++)if(r.transceivers[s].mid===e.sdpMid){o=s;break}var p=r.transceivers[o];if(!p)return a(d("OperationError","Can not add ICE candidate"));if(p.rejected)return i();var u=Object.keys(e.candidate).length>0?n.parseCandidate(e.candidate):{};
// Ignore Chrome's invalid candidates since Edge does not like them.
if("tcp"===u.protocol&&(0===u.port||9===u.port))return i();
// Ignore RTCP candidates, we assume RTCP-MUX.
if(u.component&&1!==u.component)return i();
// when using bundle, avoid adding candidates to the wrong
// ice transport. And avoid adding candidates added in the SDP.
if((0===o||o>0&&p.iceTransport!==r.transceivers[0].iceTransport)&&!c(p.iceTransport,u))return a(d("OperationError","Can not add ICE candidate"));
// update the remoteDescription.
var l=e.candidate.trim();0===l.indexOf("a=")&&(l=l.substr(2)),(t=n.getMediaSections(r.remoteDescription.sdp))[o]+="a="+(u.type?l:"end-of-candidates")+"\r\n",r.remoteDescription.sdp=n.getDescription(r.remoteDescription.sdp)+t.join("")}else for(var f=0;f<r.transceivers.length&&(r.transceivers[f].rejected||(r.transceivers[f].iceTransport.addRemoteCandidate({}),(t=n.getMediaSections(r.remoteDescription.sdp))[f]+="a=end-of-candidates\r\n",r.remoteDescription.sdp=n.getDescription(r.remoteDescription.sdp)+t.join(""),!r.usingBundle));f++);i()});
// TODO: needs to go into ops queue.
},u.prototype.getStats=function(){var e=[];this.transceivers.forEach(function(t){["rtpSender","rtpReceiver","iceGatherer","iceTransport","dtlsTransport"].forEach(function(r){t[r]&&e.push(t[r].getStats())})});return new Promise(function(t){
// shim getStats with maplike support
var r=new Map;Promise.all(e).then(function(e){e.forEach(function(e){Object.keys(e).forEach(function(t){e[t].type=function(e){return{inboundrtp:"inbound-rtp",outboundrtp:"outbound-rtp",candidatepair:"candidate-pair",localcandidate:"local-candidate",remotecandidate:"remote-candidate"}[e.type]||e.type}(e[t]),r.set(t,e[t])})}),t(r)})})};
// legacy callback shims. Should be moved to adapter.js some days.
var l=["createOffer","createAnswer"];return l.forEach(function(e){var t=u.prototype[e];u.prototype[e]=function(){var e=arguments;return"function"==typeof e[0]||"function"==typeof e[1]?t.apply(this,[arguments[2]]).then(function(t){"function"==typeof e[0]&&e[0].apply(null,[t])},function(t){"function"==typeof e[1]&&e[1].apply(null,[t])}):t.apply(this,arguments)}}),(l=["setLocalDescription","setRemoteDescription","addIceCandidate"]).forEach(function(e){var t=u.prototype[e];u.prototype[e]=function(){var e=arguments;return"function"==typeof e[1]||"function"==typeof e[2]?t.apply(this,arguments).then(function(){"function"==typeof e[1]&&e[1].apply(null)},function(t){"function"==typeof e[2]&&e[2].apply(null,[t])}):t.apply(this,arguments)}}),
// getStats is special. It doesn't have a spec legacy method yet we support
// getStats(something, cb) without error callbacks.
["getStats"].forEach(function(e){var t=u.prototype[e];u.prototype[e]=function(){var e=arguments;return"function"==typeof e[1]?t.apply(this,arguments).then(function(){"function"==typeof e[1]&&e[1].apply(null)}):t.apply(this,arguments)}}),u}},{sdp:2}],2:[function(e,t,r){
// SDP helpers.
var n={
// Generate an alphanumeric identifier for cname or mids.
// TODO: use UUIDs instead? https://gist.github.com/jed/982883
generateIdentifier:function(){return Math.random().toString(36).substr(2,10)}};
// The RTCP CNAME used by all peerconnections from the same JS.
n.localCName=n.generateIdentifier(),
// Splits SDP into lines, dealing with both CRLF and LF.
n.splitLines=function(e){return e.trim().split("\n").map(function(e){return e.trim()})},
// Splits SDP into sessionpart and mediasections. Ensures CRLF.
n.splitSections=function(e){return e.split("\nm=").map(function(e,t){return(t>0?"m="+e:e).trim()+"\r\n"})},
// returns the session description.
n.getDescription=function(e){var t=n.splitSections(e);return t&&t[0]},
// returns the individual media sections.
n.getMediaSections=function(e){var t=n.splitSections(e);return t.shift(),t},
// Returns lines that start with a certain prefix.
n.matchPrefix=function(e,t){return n.splitLines(e).filter(function(e){return 0===e.indexOf(t)})},
// Parses an ICE candidate line. Sample input:
// candidate:702786350 2 udp 41819902 8.8.8.8 60769 typ relay raddr 8.8.8.8
// rport 55996"
n.parseCandidate=function(e){for(var t,r={foundation:(
// Parse both variants.
t=0===e.indexOf("a=candidate:")?e.substring(12).split(" "):e.substring(10).split(" "))[0],component:parseInt(t[1],10),protocol:t[2].toLowerCase(),priority:parseInt(t[3],10),ip:t[4],port:parseInt(t[5],10),
// skip parts[6] == 'typ'
type:t[7]},n=8;n<t.length;n+=2)switch(t[n]){case"raddr":r.relatedAddress=t[n+1];break;case"rport":r.relatedPort=parseInt(t[n+1],10);break;case"tcptype":r.tcpType=t[n+1];break;case"ufrag":r.ufrag=t[n+1],// for backward compability.
r.usernameFragment=t[n+1];break;default:
// extension handling, in particular ufrag
r[t[n]]=t[n+1]}return r},
// Translates a candidate object into SDP candidate attribute.
n.writeCandidate=function(e){var t=[];t.push(e.foundation),t.push(e.component),t.push(e.protocol.toUpperCase()),t.push(e.priority),t.push(e.ip),t.push(e.port);var r=e.type;return t.push("typ"),t.push(r),"host"!==r&&e.relatedAddress&&e.relatedPort&&(t.push("raddr"),t.push(e.relatedAddress),// was: relAddr
t.push("rport"),t.push(e.relatedPort)),e.tcpType&&"tcp"===e.protocol.toLowerCase()&&(t.push("tcptype"),t.push(e.tcpType)),(e.usernameFragment||e.ufrag)&&(t.push("ufrag"),t.push(e.usernameFragment||e.ufrag)),"candidate:"+t.join(" ")},
// Parses an ice-options line, returns an array of option tags.
// a=ice-options:foo bar
n.parseIceOptions=function(e){return e.substr(14).split(" ")},
// Parses an rtpmap line, returns RTCRtpCoddecParameters. Sample input:
// a=rtpmap:111 opus/48000/2
n.parseRtpMap=function(e){var t=e.substr(9).split(" "),r={payloadType:parseInt(t.shift(),10)};return t=t[0].split("/"),r.name=t[0],r.clockRate=parseInt(t[1],10),// was: clockrate
// was: channels
r.numChannels=3===t.length?parseInt(t[2],10):1,r},
// Generate an a=rtpmap line from RTCRtpCodecCapability or
// RTCRtpCodecParameters.
n.writeRtpMap=function(e){var t=e.payloadType;return void 0!==e.preferredPayloadType&&(t=e.preferredPayloadType),"a=rtpmap:"+t+" "+e.name+"/"+e.clockRate+(1!==e.numChannels?"/"+e.numChannels:"")+"\r\n"},
// Parses an a=extmap line (headerextension from RFC 5285). Sample input:
// a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
// a=extmap:2/sendonly urn:ietf:params:rtp-hdrext:toffset
n.parseExtmap=function(e){var t=e.substr(9).split(" ");return{id:parseInt(t[0],10),direction:t[0].indexOf("/")>0?t[0].split("/")[1]:"sendrecv",uri:t[1]}},
// Generates a=extmap line from RTCRtpHeaderExtensionParameters or
// RTCRtpHeaderExtension.
n.writeExtmap=function(e){return"a=extmap:"+(e.id||e.preferredId)+(e.direction&&"sendrecv"!==e.direction?"/"+e.direction:"")+" "+e.uri+"\r\n"},
// Parses an ftmp line, returns dictionary. Sample input:
// a=fmtp:96 vbr=on;cng=on
// Also deals with vbr=on; cng=on
n.parseFmtp=function(e){for(var t,r={},n=e.substr(e.indexOf(" ")+1).split(";"),i=0;i<n.length;i++)r[(t=n[i].trim().split("="))[0].trim()]=t[1];return r},
// Generates an a=ftmp line from RTCRtpCodecCapability or RTCRtpCodecParameters.
n.writeFmtp=function(e){var t="",r=e.payloadType;if(void 0!==e.preferredPayloadType&&(r=e.preferredPayloadType),e.parameters&&Object.keys(e.parameters).length){var n=[];Object.keys(e.parameters).forEach(function(t){n.push(t+"="+e.parameters[t])}),t+="a=fmtp:"+r+" "+n.join(";")+"\r\n"}return t},
// Parses an rtcp-fb line, returns RTCPRtcpFeedback object. Sample input:
// a=rtcp-fb:98 nack rpsi
n.parseRtcpFb=function(e){var t=e.substr(e.indexOf(" ")+1).split(" ");return{type:t.shift(),parameter:t.join(" ")}},
// Generate a=rtcp-fb lines from RTCRtpCodecCapability or RTCRtpCodecParameters.
n.writeRtcpFb=function(e){var t="",r=e.payloadType;return void 0!==e.preferredPayloadType&&(r=e.preferredPayloadType),e.rtcpFeedback&&e.rtcpFeedback.length&&
// FIXME: special handling for trr-int?
e.rtcpFeedback.forEach(function(e){t+="a=rtcp-fb:"+r+" "+e.type+(e.parameter&&e.parameter.length?" "+e.parameter:"")+"\r\n"}),t},
// Parses an RFC 5576 ssrc media attribute. Sample input:
// a=ssrc:3735928559 cname:something
n.parseSsrcMedia=function(e){var t=e.indexOf(" "),r={ssrc:parseInt(e.substr(7,t-7),10)},n=e.indexOf(":",t);return n>-1?(r.attribute=e.substr(t+1,n-t-1),r.value=e.substr(n+1)):r.attribute=e.substr(t+1),r},
// Extracts the MID (RFC 5888) from a media section.
// returns the MID or undefined if no mid line was found.
n.getMid=function(e){var t=n.matchPrefix(e,"a=mid:")[0];if(t)return t.substr(6)},n.parseFingerprint=function(e){var t=e.substr(14).split(" ");return{algorithm:t[0].toLowerCase(),// algorithm is case-sensitive in Edge.
value:t[1]}},
// Extracts DTLS parameters from SDP media section or sessionpart.
// FIXME: for consistency with other functions this should only
//   get the fingerprint line as input. See also getIceParameters.
n.getDtlsParameters=function(e,t){
// Note: a=setup line is ignored since we use the 'auto' role.
// Note2: 'algorithm' is not case sensitive except in Edge.
return{role:"auto",fingerprints:n.matchPrefix(e+t,"a=fingerprint:").map(n.parseFingerprint)}},
// Serializes DTLS parameters to SDP.
n.writeDtlsParameters=function(e,t){var r="a=setup:"+t+"\r\n";return e.fingerprints.forEach(function(e){r+="a=fingerprint:"+e.algorithm+" "+e.value+"\r\n"}),r},
// Parses ICE information from SDP media section or sessionpart.
// FIXME: for consistency with other functions this should only
//   get the ice-ufrag and ice-pwd lines as input.
n.getIceParameters=function(e,t){var r=n.splitLines(e);
// Search in session part, too.
return{usernameFragment:(r=r.concat(n.splitLines(t))).filter(function(e){return 0===e.indexOf("a=ice-ufrag:")})[0].substr(12),password:r.filter(function(e){return 0===e.indexOf("a=ice-pwd:")})[0].substr(10)}},
// Serializes ICE parameters to SDP.
n.writeIceParameters=function(e){return"a=ice-ufrag:"+e.usernameFragment+"\r\na=ice-pwd:"+e.password+"\r\n"},
// Parses the SDP media section and returns RTCRtpParameters.
n.parseRtpParameters=function(e){for(var t={codecs:[],headerExtensions:[],fecMechanisms:[],rtcp:[]},r=n.splitLines(e)[0].split(" "),i=3;i<r.length;i++){
// find all codecs from mline[3..]
var a=r[i],o=n.matchPrefix(e,"a=rtpmap:"+a+" ")[0];if(o){var s=n.parseRtpMap(o),c=n.matchPrefix(e,"a=fmtp:"+a+" ");
// parse FEC mechanisms from rtpmap lines.
switch(
// Only the first a=fmtp:<pt> is considered.
s.parameters=c.length?n.parseFmtp(c[0]):{},s.rtcpFeedback=n.matchPrefix(e,"a=rtcp-fb:"+a+" ").map(n.parseRtcpFb),t.codecs.push(s),s.name.toUpperCase()){case"RED":case"ULPFEC":t.fecMechanisms.push(s.name.toUpperCase())}}}
// FIXME: parse rtcp.
return n.matchPrefix(e,"a=extmap:").forEach(function(e){t.headerExtensions.push(n.parseExtmap(e))}),t},
// Generates parts of the SDP media section describing the capabilities /
// parameters.
n.writeRtpDescription=function(e,t){var r="";
// Build the mline.
r+="m="+e+" ",r+=t.codecs.length>0?"9":"0",// reject if no codecs.
r+=" UDP/TLS/RTP/SAVPF ",r+=t.codecs.map(function(e){return void 0!==e.preferredPayloadType?e.preferredPayloadType:e.payloadType}).join(" ")+"\r\n",r+="c=IN IP4 0.0.0.0\r\n",r+="a=rtcp:9 IN IP4 0.0.0.0\r\n",
// Add a=rtpmap lines for each codec. Also fmtp and rtcp-fb.
t.codecs.forEach(function(e){r+=n.writeRtpMap(e),r+=n.writeFmtp(e),r+=n.writeRtcpFb(e)});var i=0;
// FIXME: write fecMechanisms.
return t.codecs.forEach(function(e){e.maxptime>i&&(i=e.maxptime)}),i>0&&(r+="a=maxptime:"+i+"\r\n"),r+="a=rtcp-mux\r\n",t.headerExtensions.forEach(function(e){r+=n.writeExtmap(e)}),r},
// Parses the SDP media section and returns an array of
// RTCRtpEncodingParameters.
n.parseRtpEncodingParameters=function(e){var t,r=[],i=n.parseRtpParameters(e),a=-1!==i.fecMechanisms.indexOf("RED"),o=-1!==i.fecMechanisms.indexOf("ULPFEC"),s=n.matchPrefix(e,"a=ssrc:").map(function(e){return n.parseSsrcMedia(e)}).filter(function(e){return"cname"===e.attribute}),c=s.length>0&&s[0].ssrc,d=n.matchPrefix(e,"a=ssrc-group:FID").map(function(e){var t=e.split(" ");return t.shift(),t.map(function(e){return parseInt(e,10)})});d.length>0&&d[0].length>1&&d[0][0]===c&&(t=d[0][1]),i.codecs.forEach(function(e){if("RTX"===e.name.toUpperCase()&&e.parameters.apt){var n={ssrc:c,codecPayloadType:parseInt(e.parameters.apt,10),rtx:{ssrc:t}};r.push(n),a&&((n=JSON.parse(JSON.stringify(n))).fec={ssrc:t,mechanism:o?"red+ulpfec":"red"},r.push(n))}}),0===r.length&&c&&r.push({ssrc:c});
// we support both b=AS and b=TIAS but interpret AS as TIAS.
var p=n.matchPrefix(e,"b=");return p.length&&(p=0===p[0].indexOf("b=TIAS:")?parseInt(p[0].substr(7),10):0===p[0].indexOf("b=AS:")?1e3*parseInt(p[0].substr(5),10)*.95-16e3:void 0,r.forEach(function(e){e.maxBitrate=p})),r},
// parses http://draft.ortc.org/#rtcrtcpparameters*
n.parseRtcpParameters=function(e){var t={},r=n.matchPrefix(e,"a=ssrc:").map(function(e){return n.parseSsrcMedia(e)}).filter(function(e){return"cname"===e.attribute})[0];r&&(t.cname=r.value,t.ssrc=r.ssrc);
// Edge uses the compound attribute instead of reducedSize
// compound is !reducedSize
var i=n.matchPrefix(e,"a=rtcp-rsize");t.reducedSize=i.length>0,t.compound=0===i.length;
// parses the rtcp-mux attrіbute.
// Note that Edge does not support unmuxed RTCP.
var a=n.matchPrefix(e,"a=rtcp-mux");return t.mux=a.length>0,t},
// parses either a=msid: or a=ssrc:... msid lines and returns
// the id of the MediaStream and MediaStreamTrack.
n.parseMsid=function(e){var t,r=n.matchPrefix(e,"a=msid:");if(1===r.length)return{stream:(t=r[0].substr(7).split(" "))[0],track:t[1]};var i=n.matchPrefix(e,"a=ssrc:").map(function(e){return n.parseSsrcMedia(e)}).filter(function(e){return"msid"===e.attribute});return i.length>0?{stream:(t=i[0].value.split(" "))[0],track:t[1]}:void 0},
// Generate a session ID for SDP.
// https://tools.ietf.org/html/draft-ietf-rtcweb-jsep-20#section-5.2.1
// recommends using a cryptographically random +ve 64-bit value
// but right now this should be acceptable and within the right range
n.generateSessionId=function(){return Math.random().toString().substr(2,21)},
// Write boilder plate for start of SDP
// sessId argument is optional - if not supplied it will
// be generated randomly
// sessVersion is optional and defaults to 2
n.writeSessionBoilerplate=function(e,t){var r=void 0!==t?t:2;
// FIXME: sess-id should be an NTP timestamp.
return"v=0\r\no=thisisadapterortc "+(e||n.generateSessionId())+" "+r+" IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n"},n.writeMediaSection=function(e,t,r,i){var a=n.writeRtpDescription(e.kind,t);
// Map ICE parameters (ufrag, pwd) to SDP.
if(a+=n.writeIceParameters(e.iceGatherer.getLocalParameters()),
// Map DTLS parameters to SDP.
a+=n.writeDtlsParameters(e.dtlsTransport.getLocalParameters(),"offer"===r?"actpass":"active"),a+="a=mid:"+e.mid+"\r\n",e.direction?a+="a="+e.direction+"\r\n":e.rtpSender&&e.rtpReceiver?a+="a=sendrecv\r\n":e.rtpSender?a+="a=sendonly\r\n":e.rtpReceiver?a+="a=recvonly\r\n":a+="a=inactive\r\n",e.rtpSender){
// spec.
var o="msid:"+i.id+" "+e.rtpSender.track.id+"\r\n";a+="a="+o,
// for Chrome.
a+="a=ssrc:"+e.sendEncodingParameters[0].ssrc+" "+o,e.sendEncodingParameters[0].rtx&&(a+="a=ssrc:"+e.sendEncodingParameters[0].rtx.ssrc+" "+o,a+="a=ssrc-group:FID "+e.sendEncodingParameters[0].ssrc+" "+e.sendEncodingParameters[0].rtx.ssrc+"\r\n")}
// FIXME: this should be written by writeRtpDescription.
return a+="a=ssrc:"+e.sendEncodingParameters[0].ssrc+" cname:"+n.localCName+"\r\n",e.rtpSender&&e.sendEncodingParameters[0].rtx&&(a+="a=ssrc:"+e.sendEncodingParameters[0].rtx.ssrc+" cname:"+n.localCName+"\r\n"),a},
// Gets the direction from the mediaSection or the sessionpart.
n.getDirection=function(e,t){for(
// Look for sendrecv, sendonly, recvonly, inactive, default to sendrecv.
var r=n.splitLines(e),i=0;i<r.length;i++)switch(r[i]){case"a=sendrecv":case"a=sendonly":case"a=recvonly":case"a=inactive":return r[i].substr(2)}return t?n.getDirection(t):"sendrecv"},n.getKind=function(e){return n.splitLines(e)[0].split(" ")[0].substr(2)},n.isRejected=function(e){return"0"===e.split(" ",2)[1]},n.parseMLine=function(e){var t=n.splitLines(e)[0].substr(2).split(" ");return{kind:t[0],port:parseInt(t[1],10),protocol:t[2],fmt:t.slice(3).join(" ")}},n.parseOLine=function(e){var t=n.matchPrefix(e,"o=")[0].substr(2).split(" ");return{username:t[0],sessionId:t[1],sessionVersion:parseInt(t[2],10),netType:t[3],addressType:t[4],address:t[5]}},
// Expose public methods.
"object"===(void 0===t?"undefined":c(t))&&(t.exports=n)},{}],3:[function(e,t,n){(function(r){var n=e("./adapter_factory.js");t.exports=n({window:r.window})}).call(this,void 0!==r?r:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./adapter_factory.js":4}],4:[function(e,t,r){var n=e("./utils");
// Shimming starts here.
t.exports=function(t,r){var i=t&&t.window,a={shimChrome:!0,shimFirefox:!0,shimEdge:!0,shimSafari:!0};for(var o in r)hasOwnProperty.call(r,o)&&(a[o]=r[o]);
// Utils.
var s=n.log,c=n.detectBrowser(i),d=e("./chrome/chrome_shim")||null,p=e("./edge/edge_shim")||null,u=e("./firefox/firefox_shim")||null,l=e("./safari/safari_shim")||null,f=e("./common_shim")||null,m={browserDetails:c,commonShim:f,extractVersion:n.extractVersion,disableLog:n.disableLog,disableWarnings:n.disableWarnings};
// Shim browser if found.
switch(c.browser){case"chrome":if(!d||!d.shimPeerConnection||!a.shimChrome)return s("Chrome shim is not included in this adapter release."),m;s("adapter.js shimming chrome."),
// Export to the adapter global object visible in the browser.
m.browserShim=d,f.shimCreateObjectURL(i),d.shimGetUserMedia(i),d.shimMediaStream(i),d.shimSourceObject(i),d.shimPeerConnection(i),d.shimOnTrack(i),d.shimAddTrackRemoveTrack(i),d.shimGetSendersWithDtmf(i),f.shimRTCIceCandidate(i),f.shimMaxMessageSize(i),f.shimSendThrowTypeError(i);break;case"firefox":if(!u||!u.shimPeerConnection||!a.shimFirefox)return s("Firefox shim is not included in this adapter release."),m;s("adapter.js shimming firefox."),
// Export to the adapter global object visible in the browser.
m.browserShim=u,f.shimCreateObjectURL(i),u.shimGetUserMedia(i),u.shimSourceObject(i),u.shimPeerConnection(i),u.shimOnTrack(i),u.shimRemoveStream(i),f.shimRTCIceCandidate(i),f.shimMaxMessageSize(i),f.shimSendThrowTypeError(i);break;case"edge":if(!p||!p.shimPeerConnection||!a.shimEdge)return s("MS edge shim is not included in this adapter release."),m;s("adapter.js shimming edge."),
// Export to the adapter global object visible in the browser.
m.browserShim=p,f.shimCreateObjectURL(i),p.shimGetUserMedia(i),p.shimPeerConnection(i),p.shimReplaceTrack(i),
// the edge shim implements the full RTCIceCandidate object.
f.shimMaxMessageSize(i),f.shimSendThrowTypeError(i);break;case"safari":if(!l||!a.shimSafari)return s("Safari shim is not included in this adapter release."),m;s("adapter.js shimming safari."),
// Export to the adapter global object visible in the browser.
m.browserShim=l,f.shimCreateObjectURL(i),l.shimRTCIceServerUrls(i),l.shimCallbacksAPI(i),l.shimLocalStreamsAPI(i),l.shimRemoteStreamsAPI(i),l.shimTrackEventTransceiver(i),l.shimGetUserMedia(i),l.shimCreateOfferLegacy(i),f.shimRTCIceCandidate(i),f.shimMaxMessageSize(i),f.shimSendThrowTypeError(i);break;default:s("Unsupported browser!")}return m}},{"./chrome/chrome_shim":5,"./common_shim":7,"./edge/edge_shim":8,"./firefox/firefox_shim":10,"./safari/safari_shim":12,"./utils":13}],5:[function(e,t,r){var n=e("../utils.js"),i=n.log;t.exports={shimGetUserMedia:e("./getusermedia"),shimMediaStream:function(e){e.MediaStream=e.MediaStream||e.webkitMediaStream},shimOnTrack:function(e){if("object"!==(void 0===e?"undefined":c(e))||!e.RTCPeerConnection||"ontrack"in e.RTCPeerConnection.prototype)"RTCRtpTransceiver"in e||n.wrapPeerConnectionEvent(e,"track",function(e){return e.transceiver||(e.transceiver={receiver:e.receiver}),e});else{Object.defineProperty(e.RTCPeerConnection.prototype,"ontrack",{get:function(){return this._ontrack},set:function(e){this._ontrack&&this.removeEventListener("track",this._ontrack),this.addEventListener("track",this._ontrack=e)}});var t=e.RTCPeerConnection.prototype.setRemoteDescription;e.RTCPeerConnection.prototype.setRemoteDescription=function(){var r=this;return r._ontrackpoly||(r._ontrackpoly=function(t){
// onaddstream does not fire when a track is added to an existing
// stream. But stream.onaddtrack is implemented so we use that.
t.stream.addEventListener("addtrack",function(n){var i;i=e.RTCPeerConnection.prototype.getReceivers?r.getReceivers().find(function(e){return e.track&&e.track.id===n.track.id}):{track:n.track};var a=new Event("track");a.track=n.track,a.receiver=i,a.transceiver={receiver:i},a.streams=[t.stream],r.dispatchEvent(a)}),t.stream.getTracks().forEach(function(n){var i;i=e.RTCPeerConnection.prototype.getReceivers?r.getReceivers().find(function(e){return e.track&&e.track.id===n.id}):{track:n};var a=new Event("track");a.track=n,a.receiver=i,a.transceiver={receiver:i},a.streams=[t.stream],r.dispatchEvent(a)})},r.addEventListener("addstream",r._ontrackpoly)),t.apply(r,arguments)}}},shimGetSendersWithDtmf:function(e){
// Overrides addTrack/removeTrack, depends on shimAddTrackRemoveTrack.
if("object"===(void 0===e?"undefined":c(e))&&e.RTCPeerConnection&&!("getSenders"in e.RTCPeerConnection.prototype)&&"createDTMFSender"in e.RTCPeerConnection.prototype){var t=function(e,t){return{track:t,get dtmf(){return void 0===this._dtmf&&("audio"===t.kind?this._dtmf=e.createDTMFSender(t):this._dtmf=null),this._dtmf},_pc:e}};
// augment addTrack when getSenders is not available.
if(!e.RTCPeerConnection.prototype.getSenders){e.RTCPeerConnection.prototype.getSenders=function(){return this._senders=this._senders||[],this._senders.slice();// return a copy of the internal state.
};var r=e.RTCPeerConnection.prototype.addTrack;e.RTCPeerConnection.prototype.addTrack=function(e,n){var i=r.apply(this,arguments);return i||(i=t(this,e),this._senders.push(i)),i};var n=e.RTCPeerConnection.prototype.removeTrack;e.RTCPeerConnection.prototype.removeTrack=function(e){n.apply(this,arguments);var t=this._senders.indexOf(e);-1!==t&&this._senders.splice(t,1)}}var i=e.RTCPeerConnection.prototype.addStream;e.RTCPeerConnection.prototype.addStream=function(e){var r=this;r._senders=r._senders||[],i.apply(r,[e]),e.getTracks().forEach(function(e){r._senders.push(t(r,e))})};var a=e.RTCPeerConnection.prototype.removeStream;e.RTCPeerConnection.prototype.removeStream=function(e){var t=this;t._senders=t._senders||[],a.apply(t,[e]),e.getTracks().forEach(function(e){var r=t._senders.find(function(t){return t.track===e});r&&t._senders.splice(t._senders.indexOf(r),1)})}}else if("object"===(void 0===e?"undefined":c(e))&&e.RTCPeerConnection&&"getSenders"in e.RTCPeerConnection.prototype&&"createDTMFSender"in e.RTCPeerConnection.prototype&&e.RTCRtpSender&&!("dtmf"in e.RTCRtpSender.prototype)){var o=e.RTCPeerConnection.prototype.getSenders;e.RTCPeerConnection.prototype.getSenders=function(){var e=this,t=o.apply(e,[]);return t.forEach(function(t){t._pc=e}),t},Object.defineProperty(e.RTCRtpSender.prototype,"dtmf",{get:function(){return void 0===this._dtmf&&("audio"===this.track.kind?this._dtmf=this._pc.createDTMFSender(this.track):this._dtmf=null),this._dtmf}})}},shimSourceObject:function(e){var t=e&&e.URL;"object"===(void 0===e?"undefined":c(e))&&(!e.HTMLMediaElement||"srcObject"in e.HTMLMediaElement.prototype||
// Shim the srcObject property, once, when HTMLMediaElement is found.
Object.defineProperty(e.HTMLMediaElement.prototype,"srcObject",{get:function(){return this._srcObject},set:function(e){var r=this;
// Use _srcObject as a private property for this shim
this._srcObject=e,this.src&&t.revokeObjectURL(this.src),e?(this.src=t.createObjectURL(e),
// We need to recreate the blob url when a track is added or
// removed. Doing it manually since we want to avoid a recursion.
e.addEventListener("addtrack",function(){r.src&&t.revokeObjectURL(r.src),r.src=t.createObjectURL(e)}),e.addEventListener("removetrack",function(){r.src&&t.revokeObjectURL(r.src),r.src=t.createObjectURL(e)})):this.src=""}}))},shimAddTrackRemoveTrackWithNative:function(e){
// shim addTrack/removeTrack with native variants in order to make
// the interactions with legacy getLocalStreams behave as in other browsers.
// Keeps a mapping stream.id => [stream, rtpsenders...]
e.RTCPeerConnection.prototype.getLocalStreams=function(){var e=this;return this._shimmedLocalStreams=this._shimmedLocalStreams||{},Object.keys(this._shimmedLocalStreams).map(function(t){return e._shimmedLocalStreams[t][0]})};var t=e.RTCPeerConnection.prototype.addTrack;e.RTCPeerConnection.prototype.addTrack=function(e,r){if(!r)return t.apply(this,arguments);this._shimmedLocalStreams=this._shimmedLocalStreams||{};var n=t.apply(this,arguments);return this._shimmedLocalStreams[r.id]?-1===this._shimmedLocalStreams[r.id].indexOf(n)&&this._shimmedLocalStreams[r.id].push(n):this._shimmedLocalStreams[r.id]=[r,n],n};var r=e.RTCPeerConnection.prototype.addStream;e.RTCPeerConnection.prototype.addStream=function(e){var t=this;this._shimmedLocalStreams=this._shimmedLocalStreams||{},e.getTracks().forEach(function(e){if(t.getSenders().find(function(t){return t.track===e}))throw new DOMException("Track already exists.","InvalidAccessError")});var n=t.getSenders();r.apply(this,arguments);var i=t.getSenders().filter(function(e){return-1===n.indexOf(e)});this._shimmedLocalStreams[e.id]=[e].concat(i)};var n=e.RTCPeerConnection.prototype.removeStream;e.RTCPeerConnection.prototype.removeStream=function(e){return this._shimmedLocalStreams=this._shimmedLocalStreams||{},delete this._shimmedLocalStreams[e.id],n.apply(this,arguments)};var i=e.RTCPeerConnection.prototype.removeTrack;e.RTCPeerConnection.prototype.removeTrack=function(e){var t=this;return this._shimmedLocalStreams=this._shimmedLocalStreams||{},e&&Object.keys(this._shimmedLocalStreams).forEach(function(r){var n=t._shimmedLocalStreams[r].indexOf(e);-1!==n&&t._shimmedLocalStreams[r].splice(n,1),1===t._shimmedLocalStreams[r].length&&delete t._shimmedLocalStreams[r]}),i.apply(this,arguments)}},shimAddTrackRemoveTrack:function(e){var t=n.detectBrowser(e);
// shim addTrack and removeTrack.
if(e.RTCPeerConnection.prototype.addTrack&&t.version>=65)return this.shimAddTrackRemoveTrackWithNative(e);
// also shim pc.getLocalStreams when addTrack is shimmed
// to return the original streams.
var r=e.RTCPeerConnection.prototype.getLocalStreams;e.RTCPeerConnection.prototype.getLocalStreams=function(){var e=this,t=r.apply(this);return e._reverseStreams=e._reverseStreams||{},t.map(function(t){return e._reverseStreams[t.id]})};var i=e.RTCPeerConnection.prototype.addStream;e.RTCPeerConnection.prototype.addStream=function(t){var r=this;
// Add identity mapping for consistency with addTrack.
// Unless this is being used with a stream from addTrack.
if(r._streams=r._streams||{},r._reverseStreams=r._reverseStreams||{},t.getTracks().forEach(function(e){if(r.getSenders().find(function(t){return t.track===e}))throw new DOMException("Track already exists.","InvalidAccessError")}),!r._reverseStreams[t.id]){var n=new e.MediaStream(t.getTracks());r._streams[t.id]=n,r._reverseStreams[n.id]=t,t=n}i.apply(r,[t])};var a=e.RTCPeerConnection.prototype.removeStream;
// replace the internal stream id with the external one and
// vice versa.
function o(e,t){var r=t.sdp;return Object.keys(e._reverseStreams||[]).forEach(function(t){var n=e._reverseStreams[t],i=e._streams[n.id];r=r.replace(new RegExp(i.id,"g"),n.id)}),new RTCSessionDescription({type:t.type,sdp:r})}e.RTCPeerConnection.prototype.removeStream=function(e){var t=this;t._streams=t._streams||{},t._reverseStreams=t._reverseStreams||{},a.apply(t,[t._streams[e.id]||e]),delete t._reverseStreams[t._streams[e.id]?t._streams[e.id].id:e.id],delete t._streams[e.id]},e.RTCPeerConnection.prototype.addTrack=function(t,r){var n=this;if("closed"===n.signalingState)throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");var i=[].slice.call(arguments,1);if(1!==i.length||!i[0].getTracks().find(function(e){return e===t}))
// this is not fully correct but all we can manage without
// [[associated MediaStreams]] internal slot.
throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.","NotSupportedError");if(n.getSenders().find(function(e){return e.track===t}))throw new DOMException("Track already exists.","InvalidAccessError");n._streams=n._streams||{},n._reverseStreams=n._reverseStreams||{};var a=n._streams[r.id];if(a)
// this is using odd Chrome behaviour, use with caution:
// https://bugs.chromium.org/p/webrtc/issues/detail?id=7815
// Note: we rely on the high-level addTrack/dtmf shim to
// create the sender with a dtmf sender.
a.addTrack(t),
// Trigger ONN async.
Promise.resolve().then(function(){n.dispatchEvent(new Event("negotiationneeded"))});else{var o=new e.MediaStream([t]);n._streams[r.id]=o,n._reverseStreams[o.id]=r,n.addStream(o)}return n.getSenders().find(function(e){return e.track===t})},["createOffer","createAnswer"].forEach(function(t){var r=e.RTCPeerConnection.prototype[t];e.RTCPeerConnection.prototype[t]=function(){var e=this,t=arguments;return arguments.length&&"function"==typeof arguments[0]?r.apply(e,[function(r){var n=o(e,r);t[0].apply(null,[n])},function(e){t[1]&&t[1].apply(null,e)},arguments[2]]):r.apply(e,arguments).then(function(t){return o(e,t)})}});var s=e.RTCPeerConnection.prototype.setLocalDescription;e.RTCPeerConnection.prototype.setLocalDescription=function(){return arguments.length&&arguments[0].type?(arguments[0]=function(e,t){var r=t.sdp;return Object.keys(e._reverseStreams||[]).forEach(function(t){var n=e._reverseStreams[t],i=e._streams[n.id];r=r.replace(new RegExp(n.id,"g"),i.id)}),new RTCSessionDescription({type:t.type,sdp:r})}(this,arguments[0]),s.apply(this,arguments)):s.apply(this,arguments)};
// TODO: mangle getStats: https://w3c.github.io/webrtc-stats/#dom-rtcmediastreamstats-streamidentifier
var c=Object.getOwnPropertyDescriptor(e.RTCPeerConnection.prototype,"localDescription");Object.defineProperty(e.RTCPeerConnection.prototype,"localDescription",{get:function(){var e=c.get.apply(this);return""===e.type?e:o(this,e)}}),e.RTCPeerConnection.prototype.removeTrack=function(e){var t,r=this;if("closed"===r.signalingState)throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.","InvalidStateError");
// We can not yet check for sender instanceof RTCRtpSender
// since we shim RTPSender. So we check if sender._pc is set.
if(!e._pc)throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.","TypeError");if(!(e._pc===r))throw new DOMException("Sender was not created by this connection.","InvalidAccessError");
// Search for the native stream the senders track belongs to.
r._streams=r._streams||{},Object.keys(r._streams).forEach(function(n){r._streams[n].getTracks().find(function(t){return e.track===t})&&(t=r._streams[n])}),t&&(1===t.getTracks().length?
// if this is the last track of the stream, remove the stream. This
// takes care of any shimmed _senders.
r.removeStream(r._reverseStreams[t.id]):
// relying on the same odd chrome behaviour as above.
t.removeTrack(e.track),r.dispatchEvent(new Event("negotiationneeded")))}},shimPeerConnection:function(e){var t=n.detectBrowser(e);
// The RTCPeerConnection object.
if(!e.RTCPeerConnection&&e.webkitRTCPeerConnection)e.RTCPeerConnection=function(t,r){
// Translate iceTransportPolicy to iceTransports,
// see https://code.google.com/p/webrtc/issues/detail?id=4869
// this was fixed in M56 along with unprefixing RTCPeerConnection.
return i("PeerConnection"),t&&t.iceTransportPolicy&&(t.iceTransports=t.iceTransportPolicy),new e.webkitRTCPeerConnection(t,r)},e.RTCPeerConnection.prototype=e.webkitRTCPeerConnection.prototype,
// wrap static methods. Currently just generateCertificate.
e.webkitRTCPeerConnection.generateCertificate&&Object.defineProperty(e.RTCPeerConnection,"generateCertificate",{get:function(){return e.webkitRTCPeerConnection.generateCertificate}});else{
// migrate from non-spec RTCIceServer.url to RTCIceServer.urls
var r=e.RTCPeerConnection;e.RTCPeerConnection=function(e,t){if(e&&e.iceServers){for(var i=[],a=0;a<e.iceServers.length;a++){var o=e.iceServers[a];!o.hasOwnProperty("urls")&&o.hasOwnProperty("url")?(n.deprecated("RTCIceServer.url","RTCIceServer.urls"),(o=JSON.parse(JSON.stringify(o))).urls=o.url,i.push(o)):i.push(e.iceServers[a])}e.iceServers=i}return new r(e,t)},e.RTCPeerConnection.prototype=r.prototype,
// wrap static methods. Currently just generateCertificate.
Object.defineProperty(e.RTCPeerConnection,"generateCertificate",{get:function(){return r.generateCertificate}})}var a=e.RTCPeerConnection.prototype.getStats;e.RTCPeerConnection.prototype.getStats=function(e,t,r){var n=this,i=arguments;
// If selector is a function then we are in the old style stats so just
// pass back the original getStats format to avoid breaking old users.
if(arguments.length>0&&"function"==typeof e)return a.apply(this,arguments);
// When spec-style getStats is supported, return those when called with
// either no arguments or the selector argument is null.
if(0===a.length&&(0===arguments.length||"function"!=typeof arguments[0]))return a.apply(this,[]);var o=function(e){var t={};return e.result().forEach(function(e){var r={id:e.id,timestamp:e.timestamp,type:{localcandidate:"local-candidate",remotecandidate:"remote-candidate"}[e.type]||e.type};e.names().forEach(function(t){r[t]=e.stat(t)}),t[r.id]=r}),t},s=function(e){return new Map(Object.keys(e).map(function(t){return[t,e[t]]}))};
// shim getStats with maplike support
if(arguments.length>=2){return a.apply(this,[function(e){i[1](s(o(e)))},arguments[0]])}
// promise-support
return new Promise(function(e,t){a.apply(n,[function(t){e(s(o(t)))},t])}).then(t,r)},
// add promise support -- natively available in Chrome 51
t.version<51&&["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(t){var r=e.RTCPeerConnection.prototype[t];e.RTCPeerConnection.prototype[t]=function(){var e=arguments,t=this,n=new Promise(function(n,i){r.apply(t,[e[0],n,i])});return e.length<2?n:n.then(function(){e[1].apply(null,[])},function(t){e.length>=3&&e[2].apply(null,[t])})}}),
// promise support for createOffer and createAnswer. Available (without
// bugs) since M52: crbug/619289
t.version<52&&["createOffer","createAnswer"].forEach(function(t){var r=e.RTCPeerConnection.prototype[t];e.RTCPeerConnection.prototype[t]=function(){var e=this;if(arguments.length<1||1===arguments.length&&"object"===c(arguments[0])){var t=1===arguments.length?arguments[0]:void 0;return new Promise(function(n,i){r.apply(e,[n,i,t])})}return r.apply(this,arguments)}}),
// shim implicit creation of RTCSessionDescription/RTCIceCandidate
["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(t){var r=e.RTCPeerConnection.prototype[t];e.RTCPeerConnection.prototype[t]=function(){return arguments[0]=new("addIceCandidate"===t?e.RTCIceCandidate:e.RTCSessionDescription)(arguments[0]),r.apply(this,arguments)}});
// support for addIceCandidate(null or undefined)
var o=e.RTCPeerConnection.prototype.addIceCandidate;e.RTCPeerConnection.prototype.addIceCandidate=function(){return arguments[0]?o.apply(this,arguments):(arguments[1]&&arguments[1].apply(null),Promise.resolve())}}}},{"../utils.js":13,"./getusermedia":6}],6:[function(e,t,r){var n=e("../utils.js"),i=n.log;
// Expose public methods.
t.exports=function(e){var t=n.detectBrowser(e),r=e&&e.navigator,a=function(e){if("object"!==(void 0===e?"undefined":c(e))||e.mandatory||e.optional)return e;var t={};return Object.keys(e).forEach(function(r){if("require"!==r&&"advanced"!==r&&"mediaSource"!==r){var n="object"===c(e[r])?e[r]:{ideal:e[r]};void 0!==n.exact&&"number"==typeof n.exact&&(n.min=n.max=n.exact);var i=function(e,t){return e?e+t.charAt(0).toUpperCase()+t.slice(1):"deviceId"===t?"sourceId":t};if(void 0!==n.ideal){t.optional=t.optional||[];var a={};"number"==typeof n.ideal?(a[i("min",r)]=n.ideal,t.optional.push(a),(a={})[i("max",r)]=n.ideal,t.optional.push(a)):(a[i("",r)]=n.ideal,t.optional.push(a))}void 0!==n.exact&&"number"!=typeof n.exact?(t.mandatory=t.mandatory||{},t.mandatory[i("",r)]=n.exact):["min","max"].forEach(function(e){void 0!==n[e]&&(t.mandatory=t.mandatory||{},t.mandatory[i(e,r)]=n[e])})}}),e.advanced&&(t.optional=(t.optional||[]).concat(e.advanced)),t},o=function(e,n){if(t.version>=61)return n(e);if((e=JSON.parse(JSON.stringify(e)))&&"object"===c(e.audio)){var o=function(e,t,r){t in e&&!(r in e)&&(e[r]=e[t],delete e[t])};o((e=JSON.parse(JSON.stringify(e))).audio,"autoGainControl","googAutoGainControl"),o(e.audio,"noiseSuppression","googNoiseSuppression"),e.audio=a(e.audio)}if(e&&"object"===c(e.video)){
// Shim facingMode for mobile & surface pro.
var s=e.video.facingMode;s=s&&("object"===(void 0===s?"undefined":c(s))?s:{ideal:s});var d,p=t.version<66;if(s&&("user"===s.exact||"environment"===s.exact||"user"===s.ideal||"environment"===s.ideal)&&(!r.mediaDevices.getSupportedConstraints||!r.mediaDevices.getSupportedConstraints().facingMode||p))if(delete e.video.facingMode,"environment"===s.exact||"environment"===s.ideal?d=["back","rear"]:"user"!==s.exact&&"user"!==s.ideal||(d=["front"]),d)
// Look for matches in label, or use last cam for back (typical).
return r.mediaDevices.enumerateDevices().then(function(t){var r=(t=t.filter(function(e){return"videoinput"===e.kind})).find(function(e){return d.some(function(t){return-1!==e.label.toLowerCase().indexOf(t)})});return!r&&t.length&&-1!==d.indexOf("back")&&(r=t[t.length-1]),r&&(e.video.deviceId=s.exact?{exact:r.deviceId}:{ideal:r.deviceId}),e.video=a(e.video),i("chrome: "+JSON.stringify(e)),n(e)});e.video=a(e.video)}return i("chrome: "+JSON.stringify(e)),n(e)},s=function(e){return{name:{PermissionDeniedError:"NotAllowedError",PermissionDismissedError:"NotAllowedError",InvalidStateError:"NotAllowedError",DevicesNotFoundError:"NotFoundError",ConstraintNotSatisfiedError:"OverconstrainedError",TrackStartError:"NotReadableError",MediaDeviceFailedDueToShutdown:"NotAllowedError",MediaDeviceKillSwitchOn:"NotAllowedError",TabCaptureError:"AbortError",ScreenCaptureError:"AbortError",DeviceCaptureError:"AbortError"}[e.name]||e.name,message:e.message,constraint:e.constraintName,toString:function(){return this.name+(this.message&&": ")+this.message}}};r.getUserMedia=function(e,t,n){o(e,function(e){r.webkitGetUserMedia(e,t,function(e){n&&n(s(e))})})};
// Returns the result of getUserMedia as a Promise.
var d=function(e){return new Promise(function(t,n){r.getUserMedia(e,t,n)})};
// A shim for getUserMedia method on the mediaDevices object.
// TODO(KaptenJansson) remove once implemented in Chrome stable.
if(r.mediaDevices||(r.mediaDevices={getUserMedia:d,enumerateDevices:function(){return new Promise(function(t){var r={audio:"audioinput",video:"videoinput"};return e.MediaStreamTrack.getSources(function(e){t(e.map(function(e){return{label:e.label,kind:r[e.kind],deviceId:e.id,groupId:""}}))})})},getSupportedConstraints:function(){return{deviceId:!0,echoCancellation:!0,facingMode:!0,frameRate:!0,height:!0,width:!0}}}),r.mediaDevices.getUserMedia){
// Even though Chrome 45 has navigator.mediaDevices and a getUserMedia
// function which returns a Promise, it does not accept spec-style
// constraints.
var p=r.mediaDevices.getUserMedia.bind(r.mediaDevices);r.mediaDevices.getUserMedia=function(e){return o(e,function(e){return p(e).then(function(t){if(e.audio&&!t.getAudioTracks().length||e.video&&!t.getVideoTracks().length)throw t.getTracks().forEach(function(e){e.stop()}),new DOMException("","NotFoundError");return t},function(e){return Promise.reject(s(e))})})}}
// Dummy devicechange event methods.
// TODO(KaptenJansson) remove once implemented in Chrome stable.
else r.mediaDevices.getUserMedia=function(e){return d(e)};void 0===r.mediaDevices.addEventListener&&(r.mediaDevices.addEventListener=function(){i("Dummy mediaDevices.addEventListener called.")}),void 0===r.mediaDevices.removeEventListener&&(r.mediaDevices.removeEventListener=function(){i("Dummy mediaDevices.removeEventListener called.")})}},{"../utils.js":13}],7:[function(e,t,r){var n=e("sdp"),i=e("./utils");t.exports={shimRTCIceCandidate:function(e){
// foundation is arbitrarily chosen as an indicator for full support for
// https://w3c.github.io/webrtc-pc/#rtcicecandidate-interface
if(e.RTCIceCandidate&&!(e.RTCIceCandidate&&"foundation"in e.RTCIceCandidate.prototype)){var t=e.RTCIceCandidate;e.RTCIceCandidate=function(e){if(
// Remove the a= which shouldn't be part of the candidate string.
"object"===(void 0===e?"undefined":c(e))&&e.candidate&&0===e.candidate.indexOf("a=")&&((e=JSON.parse(JSON.stringify(e))).candidate=e.candidate.substr(2)),e.candidate&&e.candidate.length){
// Augment the native candidate with the parsed fields.
var r=new t(e),i=n.parseCandidate(e.candidate),a=s(r,i);
// Add a serializer that does not serialize the extra attributes.
return a.toJSON=function(){return{candidate:a.candidate,sdpMid:a.sdpMid,sdpMLineIndex:a.sdpMLineIndex,usernameFragment:a.usernameFragment}},a}return new t(e)},e.RTCIceCandidate.prototype=t.prototype,
// Hook up the augmented candidate in onicecandidate and
// addEventListener('icecandidate', ...)
i.wrapPeerConnectionEvent(e,"icecandidate",function(t){return t.candidate&&Object.defineProperty(t,"candidate",{value:new e.RTCIceCandidate(t.candidate),writable:"false"}),t})}},
// shimCreateObjectURL must be called before shimSourceObject to avoid loop.
shimCreateObjectURL:function(e){var t=e&&e.URL;if("object"===(void 0===e?"undefined":c(e))&&e.HTMLMediaElement&&"srcObject"in e.HTMLMediaElement.prototype&&t.createObjectURL&&t.revokeObjectURL){var r=t.createObjectURL.bind(t),n=t.revokeObjectURL.bind(t),a=new Map,o=0;t.createObjectURL=function(e){if("getTracks"in e){var t="polyblob:"+ ++o;return a.set(t,e),i.deprecated("URL.createObjectURL(stream)","elem.srcObject = stream"),t}return r(e)},t.revokeObjectURL=function(e){n(e),a.delete(e)};var s=Object.getOwnPropertyDescriptor(e.HTMLMediaElement.prototype,"src");Object.defineProperty(e.HTMLMediaElement.prototype,"src",{get:function(){return s.get.apply(this)},set:function(e){return this.srcObject=a.get(e)||null,s.set.apply(this,[e])}});var d=e.HTMLMediaElement.prototype.setAttribute;e.HTMLMediaElement.prototype.setAttribute=function(){return 2===arguments.length&&"src"===(""+arguments[0]).toLowerCase()&&(this.srcObject=a.get(arguments[1])||null),d.apply(this,arguments)}}},shimMaxMessageSize:function(e){if(!e.RTCSctpTransport&&e.RTCPeerConnection){var t=i.detectBrowser(e);"sctp"in e.RTCPeerConnection.prototype||Object.defineProperty(e.RTCPeerConnection.prototype,"sctp",{get:function(){return void 0===this._sctp?null:this._sctp}});var r=e.RTCPeerConnection.prototype.setRemoteDescription;e.RTCPeerConnection.prototype.setRemoteDescription=function(){if(this._sctp=null,function(e){var t=n.splitSections(e.sdp);return t.shift(),t.some(function(e){var t=n.parseMLine(e);return t&&"application"===t.kind&&-1!==t.protocol.indexOf("SCTP")})}(arguments[0])){
// Check if the remote is FF.
var e,i=function(e){
// TODO: Is there a better solution for detecting Firefox?
var t=e.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);if(null===t||t.length<2)return-1;var r=parseInt(t[1],10);
// Test for NaN (yes, this is ugly)
return r!=r?-1:r}(arguments[0]),a=function(e){
// Every implementation we know can send at least 64 KiB.
// Note: Although Chrome is technically able to send up to 256 KiB, the
//       data does not reach the other peer reliably.
//       See: https://bugs.chromium.org/p/webrtc/issues/detail?id=8419
var r=65536;return"firefox"===t.browser&&(
// FF < 57 will send in 16 KiB chunks using the deprecated PPID
// fragmentation.
r=t.version<57?-1===e?16384:2147483637:57===t.version?65535:65536),r}(i),o=function(e,r){
// Note: 65536 bytes is the default value from the SDP spec. Also,
//       every implementation we know supports receiving 65536 bytes.
var i=65536;
// FF 57 has a slightly incorrect default remote max message size, so
// we need to adjust it here to avoid a failure when sending.
// See: https://bugzilla.mozilla.org/show_bug.cgi?id=1425697
"firefox"===t.browser&&57===t.version&&(i=65535);var a=n.matchPrefix(e.sdp,"a=max-message-size:");return a.length>0?i=parseInt(a[0].substr(19),10):"firefox"===t.browser&&-1!==r&&(
// If the maximum message size is not present in the remote SDP and
// both local and remote are Firefox, the remote peer can receive
// ~2 GiB.
i=2147483637),i}(arguments[0],i);
// Get the maximum message size the local peer is capable of sending
e=0===a&&0===o?Number.POSITIVE_INFINITY:0===a||0===o?Math.max(a,o):Math.min(a,o);
// Create a dummy RTCSctpTransport object and the 'maxMessageSize'
// attribute.
var s={};Object.defineProperty(s,"maxMessageSize",{get:function(){return e}}),this._sctp=s}return r.apply(this,arguments)}}},shimSendThrowTypeError:function(e){if(e.RTCPeerConnection&&"createDataChannel"in e.RTCPeerConnection.prototype){
// Note: Although Firefox >= 57 has a native implementation, the maximum
//       message size can be reset for all data channels at a later stage.
//       See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831
var t=e.RTCPeerConnection.prototype.createDataChannel;e.RTCPeerConnection.prototype.createDataChannel=function(){var e=this,r=t.apply(e,arguments),n=r.send;
// Patch 'send' method
return r.send=function(){var t=arguments[0];if((t.length||t.size||t.byteLength)>e.sctp.maxMessageSize)throw new DOMException("Message too large (can send a maximum of "+e.sctp.maxMessageSize+" bytes)","TypeError");return n.apply(this,arguments)},r}}}}},{"./utils":13,sdp:2}],8:[function(e,t,r){var n=e("../utils"),i=e("rtcpeerconnection-shim");t.exports={shimGetUserMedia:e("./getusermedia"),shimPeerConnection:function(e){var t=n.detectBrowser(e);if(e.RTCIceGatherer&&(e.RTCIceCandidate||(e.RTCIceCandidate=function(e){return e}),e.RTCSessionDescription||(e.RTCSessionDescription=function(e){return e}),t.version<15025)){var r=Object.getOwnPropertyDescriptor(e.MediaStreamTrack.prototype,"enabled");Object.defineProperty(e.MediaStreamTrack.prototype,"enabled",{set:function(e){r.set.call(this,e);var t=new Event("enabled");t.enabled=e,this.dispatchEvent(t)}})}
// ORTC defines the DTMF sender a bit different.
// https://github.com/w3c/ortc/issues/714
!e.RTCRtpSender||"dtmf"in e.RTCRtpSender.prototype||Object.defineProperty(e.RTCRtpSender.prototype,"dtmf",{get:function(){return void 0===this._dtmf&&("audio"===this.track.kind?this._dtmf=new e.RTCDtmfSender(this):"video"===this.track.kind&&(this._dtmf=null)),this._dtmf}}),
// Edge currently only implements the RTCDtmfSender, not the
// RTCDTMFSender alias. See http://draft.ortc.org/#rtcdtmfsender2*
e.RTCDtmfSender&&!e.RTCDTMFSender&&(e.RTCDTMFSender=e.RTCDtmfSender),e.RTCPeerConnection=i(e,t.version)},shimReplaceTrack:function(e){
// ORTC has replaceTrack -- https://github.com/w3c/ortc/issues/614
!e.RTCRtpSender||"replaceTrack"in e.RTCRtpSender.prototype||(e.RTCRtpSender.prototype.replaceTrack=e.RTCRtpSender.prototype.setTrack)}}},{"../utils":13,"./getusermedia":9,"rtcpeerconnection-shim":1}],9:[function(e,t,r){
// Expose public methods.
t.exports=function(e){var t=e&&e.navigator,r=t.mediaDevices.getUserMedia.bind(t.mediaDevices);t.mediaDevices.getUserMedia=function(e){return r(e).catch(function(e){return Promise.reject(function(e){return{name:{PermissionDeniedError:"NotAllowedError"}[e.name]||e.name,message:e.message,constraint:e.constraint,toString:function(){return this.name}}}(e))})}}},{}],10:[function(e,t,r){var n=e("../utils");t.exports={shimGetUserMedia:e("./getusermedia"),shimOnTrack:function(e){"object"!==(void 0===e?"undefined":c(e))||!e.RTCPeerConnection||"ontrack"in e.RTCPeerConnection.prototype||Object.defineProperty(e.RTCPeerConnection.prototype,"ontrack",{get:function(){return this._ontrack},set:function(e){this._ontrack&&(this.removeEventListener("track",this._ontrack),this.removeEventListener("addstream",this._ontrackpoly)),this.addEventListener("track",this._ontrack=e),this.addEventListener("addstream",this._ontrackpoly=function(e){e.stream.getTracks().forEach(function(t){var r=new Event("track");r.track=t,r.receiver={track:t},r.transceiver={receiver:r.receiver},r.streams=[e.stream],this.dispatchEvent(r)}.bind(this))}.bind(this))}}),"object"===(void 0===e?"undefined":c(e))&&e.RTCTrackEvent&&"receiver"in e.RTCTrackEvent.prototype&&!("transceiver"in e.RTCTrackEvent.prototype)&&Object.defineProperty(e.RTCTrackEvent.prototype,"transceiver",{get:function(){return{receiver:this.receiver}}})},shimSourceObject:function(e){
// Firefox has supported mozSrcObject since FF22, unprefixed in 42.
"object"===(void 0===e?"undefined":c(e))&&(!e.HTMLMediaElement||"srcObject"in e.HTMLMediaElement.prototype||
// Shim the srcObject property, once, when HTMLMediaElement is found.
Object.defineProperty(e.HTMLMediaElement.prototype,"srcObject",{get:function(){return this.mozSrcObject},set:function(e){this.mozSrcObject=e}}))},shimPeerConnection:function(e){var t=n.detectBrowser(e);if("object"===(void 0===e?"undefined":c(e))&&(e.RTCPeerConnection||e.mozRTCPeerConnection)){
// The RTCPeerConnection object.
e.RTCPeerConnection||(e.RTCPeerConnection=function(r,n){if(t.version<38&&r&&r.iceServers){for(var i=[],a=0;a<r.iceServers.length;a++){var o=r.iceServers[a];if(o.hasOwnProperty("urls"))for(var s=0;s<o.urls.length;s++){var c={url:o.urls[s]};0===o.urls[s].indexOf("turn")&&(c.username=o.username,c.credential=o.credential),i.push(c)}else i.push(r.iceServers[a])}r.iceServers=i}return new e.mozRTCPeerConnection(r,n)},e.RTCPeerConnection.prototype=e.mozRTCPeerConnection.prototype,
// wrap static methods. Currently just generateCertificate.
e.mozRTCPeerConnection.generateCertificate&&Object.defineProperty(e.RTCPeerConnection,"generateCertificate",{get:function(){return e.mozRTCPeerConnection.generateCertificate}}),e.RTCSessionDescription=e.mozRTCSessionDescription,e.RTCIceCandidate=e.mozRTCIceCandidate),
// shim away need for obsolete RTCIceCandidate/RTCSessionDescription.
["setLocalDescription","setRemoteDescription","addIceCandidate"].forEach(function(t){var r=e.RTCPeerConnection.prototype[t];e.RTCPeerConnection.prototype[t]=function(){return arguments[0]=new("addIceCandidate"===t?e.RTCIceCandidate:e.RTCSessionDescription)(arguments[0]),r.apply(this,arguments)}});
// support for addIceCandidate(null or undefined)
var r=e.RTCPeerConnection.prototype.addIceCandidate;e.RTCPeerConnection.prototype.addIceCandidate=function(){return arguments[0]?r.apply(this,arguments):(arguments[1]&&arguments[1].apply(null),Promise.resolve())};
// shim getStats with maplike support
var i={inboundrtp:"inbound-rtp",outboundrtp:"outbound-rtp",candidatepair:"candidate-pair",localcandidate:"local-candidate",remotecandidate:"remote-candidate"},a=e.RTCPeerConnection.prototype.getStats;e.RTCPeerConnection.prototype.getStats=function(e,r,n){return a.apply(this,[e||null]).then(function(e){if(t.version<48&&(e=function(e){var t=new Map;return Object.keys(e).forEach(function(r){t.set(r,e[r]),t[r]=e[r]}),t}(e)),t.version<53&&!r)
// Shim only promise getStats with spec-hyphens in type names
// Leave callback version alone; misc old uses of forEach before Map
try{e.forEach(function(e){e.type=i[e.type]||e.type})}catch(t){if("TypeError"!==t.name)throw t;
// Avoid TypeError: "type" is read-only, in old versions. 34-43ish
e.forEach(function(t,r){e.set(r,s({},t,{type:i[t.type]||t.type}))})}return e}).then(r,n)}}},shimRemoveStream:function(e){!e.RTCPeerConnection||"removeStream"in e.RTCPeerConnection.prototype||(e.RTCPeerConnection.prototype.removeStream=function(e){var t=this;n.deprecated("removeStream","removeTrack"),this.getSenders().forEach(function(r){r.track&&-1!==e.getTracks().indexOf(r.track)&&t.removeTrack(r)})})}}},{"../utils":13,"./getusermedia":11}],11:[function(e,t,r){var n=e("../utils"),i=n.log;
// Expose public methods.
t.exports=function(e){var t=n.detectBrowser(e),r=e&&e.navigator,a=e&&e.MediaStreamTrack,o=function(e){return{name:{InternalError:"NotReadableError",NotSupportedError:"TypeError",PermissionDeniedError:"NotAllowedError",SecurityError:"NotAllowedError"}[e.name]||e.name,message:{"The operation is insecure.":"The request is not allowed by the user agent or the platform in the current context."}[e.message]||e.message,constraint:e.constraint,toString:function(){return this.name+(this.message&&": ")+this.message}}},s=function(e,n,a){var s=function(e){if("object"!==(void 0===e?"undefined":c(e))||e.require)return e;var t=[];return Object.keys(e).forEach(function(r){if("require"!==r&&"advanced"!==r&&"mediaSource"!==r){var n=e[r]="object"===c(e[r])?e[r]:{ideal:e[r]};if(void 0===n.min&&void 0===n.max&&void 0===n.exact||t.push(r),void 0!==n.exact&&("number"==typeof n.exact?n.min=n.max=n.exact:e[r]=n.exact,delete n.exact),void 0!==n.ideal){e.advanced=e.advanced||[];var i={};"number"==typeof n.ideal?i[r]={min:n.ideal,max:n.ideal}:i[r]=n.ideal,e.advanced.push(i),delete n.ideal,Object.keys(n).length||delete e[r]}}}),t.length&&(e.require=t),e};return e=JSON.parse(JSON.stringify(e)),t.version<38&&(i("spec: "+JSON.stringify(e)),e.audio&&(e.audio=s(e.audio)),e.video&&(e.video=s(e.video)),i("ff37: "+JSON.stringify(e))),r.mozGetUserMedia(e,n,function(e){a(o(e))})};if(
// Shim for mediaDevices on older versions.
r.mediaDevices||(r.mediaDevices={getUserMedia:function(e){return new Promise(function(t,r){s(e,t,r)})},addEventListener:function(){},removeEventListener:function(){}}),r.mediaDevices.enumerateDevices=r.mediaDevices.enumerateDevices||function(){return new Promise(function(e){e([{kind:"audioinput",deviceId:"default",label:"",groupId:""},{kind:"videoinput",deviceId:"default",label:"",groupId:""}])})},t.version<41){
// Work around http://bugzil.la/1169665
var d=r.mediaDevices.enumerateDevices.bind(r.mediaDevices);r.mediaDevices.enumerateDevices=function(){return d().then(void 0,function(e){if("NotFoundError"===e.name)return[];throw e})}}if(t.version<49){var p=r.mediaDevices.getUserMedia.bind(r.mediaDevices);r.mediaDevices.getUserMedia=function(e){return p(e).then(function(t){
// Work around https://bugzil.la/802326
if(e.audio&&!t.getAudioTracks().length||e.video&&!t.getVideoTracks().length)throw t.getTracks().forEach(function(e){e.stop()}),new DOMException("The object can not be found here.","NotFoundError");return t},function(e){return Promise.reject(o(e))})}}if(!(t.version>55&&"autoGainControl"in r.mediaDevices.getSupportedConstraints())){var u=function(e,t,r){t in e&&!(r in e)&&(e[r]=e[t],delete e[t])},l=r.mediaDevices.getUserMedia.bind(r.mediaDevices);if(r.mediaDevices.getUserMedia=function(e){return"object"===(void 0===e?"undefined":c(e))&&"object"===c(e.audio)&&(e=JSON.parse(JSON.stringify(e)),u(e.audio,"autoGainControl","mozAutoGainControl"),u(e.audio,"noiseSuppression","mozNoiseSuppression")),l(e)},a&&a.prototype.getSettings){var f=a.prototype.getSettings;a.prototype.getSettings=function(){var e=f.apply(this,arguments);return u(e,"mozAutoGainControl","autoGainControl"),u(e,"mozNoiseSuppression","noiseSuppression"),e}}if(a&&a.prototype.applyConstraints){var m=a.prototype.applyConstraints;a.prototype.applyConstraints=function(e){return"audio"===this.kind&&"object"===(void 0===e?"undefined":c(e))&&(e=JSON.parse(JSON.stringify(e)),u(e,"autoGainControl","mozAutoGainControl"),u(e,"noiseSuppression","mozNoiseSuppression")),m.apply(this,[e])}}}r.getUserMedia=function(e,i,a){if(t.version<44)return s(e,i,a);
// Replace Firefox 44+'s deprecation warning with unprefixed version.
n.deprecated("navigator.getUserMedia","navigator.mediaDevices.getUserMedia"),r.mediaDevices.getUserMedia(e).then(i,a)}}},{"../utils":13}],12:[function(e,t,r){var n=e("../utils");t.exports={shimLocalStreamsAPI:function(e){if("object"===(void 0===e?"undefined":c(e))&&e.RTCPeerConnection){if("getLocalStreams"in e.RTCPeerConnection.prototype||(e.RTCPeerConnection.prototype.getLocalStreams=function(){return this._localStreams||(this._localStreams=[]),this._localStreams}),"getStreamById"in e.RTCPeerConnection.prototype||(e.RTCPeerConnection.prototype.getStreamById=function(e){var t=null;return this._localStreams&&this._localStreams.forEach(function(r){r.id===e&&(t=r)}),this._remoteStreams&&this._remoteStreams.forEach(function(r){r.id===e&&(t=r)}),t}),!("addStream"in e.RTCPeerConnection.prototype)){var t=e.RTCPeerConnection.prototype.addTrack;e.RTCPeerConnection.prototype.addStream=function(e){this._localStreams||(this._localStreams=[]),-1===this._localStreams.indexOf(e)&&this._localStreams.push(e);var r=this;e.getTracks().forEach(function(n){t.call(r,n,e)})},e.RTCPeerConnection.prototype.addTrack=function(e,r){return r&&(this._localStreams?-1===this._localStreams.indexOf(r)&&this._localStreams.push(r):this._localStreams=[r]),t.call(this,e,r)}}"removeStream"in e.RTCPeerConnection.prototype||(e.RTCPeerConnection.prototype.removeStream=function(e){this._localStreams||(this._localStreams=[]);var t=this._localStreams.indexOf(e);if(-1!==t){this._localStreams.splice(t,1);var r=this,n=e.getTracks();this.getSenders().forEach(function(e){-1!==n.indexOf(e.track)&&r.removeTrack(e)})}})}},shimRemoteStreamsAPI:function(e){"object"===(void 0===e?"undefined":c(e))&&e.RTCPeerConnection&&("getRemoteStreams"in e.RTCPeerConnection.prototype||(e.RTCPeerConnection.prototype.getRemoteStreams=function(){return this._remoteStreams?this._remoteStreams:[]}),"onaddstream"in e.RTCPeerConnection.prototype||Object.defineProperty(e.RTCPeerConnection.prototype,"onaddstream",{get:function(){return this._onaddstream},set:function(e){var t=this;this._onaddstream&&(this.removeEventListener("addstream",this._onaddstream),this.removeEventListener("track",this._onaddstreampoly)),this.addEventListener("addstream",this._onaddstream=e),this.addEventListener("track",this._onaddstreampoly=function(e){e.streams.forEach(function(e){if(t._remoteStreams||(t._remoteStreams=[]),!(t._remoteStreams.indexOf(e)>=0)){t._remoteStreams.push(e);var r=new Event("addstream");r.stream=e,t.dispatchEvent(r)}})})}}))},shimCallbacksAPI:function(e){if("object"===(void 0===e?"undefined":c(e))&&e.RTCPeerConnection){var t=e.RTCPeerConnection.prototype,r=t.createOffer,n=t.createAnswer,i=t.setLocalDescription,a=t.setRemoteDescription,o=t.addIceCandidate;t.createOffer=function(e,t){var n=arguments.length>=2?arguments[2]:arguments[0],i=r.apply(this,[n]);return t?(i.then(e,t),Promise.resolve()):i},t.createAnswer=function(e,t){var r=arguments.length>=2?arguments[2]:arguments[0],i=n.apply(this,[r]);return t?(i.then(e,t),Promise.resolve()):i};var s=function(e,t,r){var n=i.apply(this,[e]);return r?(n.then(t,r),Promise.resolve()):n};t.setLocalDescription=s,s=function(e,t,r){var n=a.apply(this,[e]);return r?(n.then(t,r),Promise.resolve()):n},t.setRemoteDescription=s,s=function(e,t,r){var n=o.apply(this,[e]);return r?(n.then(t,r),Promise.resolve()):n},t.addIceCandidate=s}},shimGetUserMedia:function(e){var t=e&&e.navigator;t.getUserMedia||(t.webkitGetUserMedia?t.getUserMedia=t.webkitGetUserMedia.bind(t):t.mediaDevices&&t.mediaDevices.getUserMedia&&(t.getUserMedia=function(e,r,n){t.mediaDevices.getUserMedia(e).then(r,n)}.bind(t)))},shimRTCIceServerUrls:function(e){
// migrate from non-spec RTCIceServer.url to RTCIceServer.urls
var t=e.RTCPeerConnection;e.RTCPeerConnection=function(e,r){if(e&&e.iceServers){for(var i=[],a=0;a<e.iceServers.length;a++){var o=e.iceServers[a];!o.hasOwnProperty("urls")&&o.hasOwnProperty("url")?(n.deprecated("RTCIceServer.url","RTCIceServer.urls"),(o=JSON.parse(JSON.stringify(o))).urls=o.url,delete o.url,i.push(o)):i.push(e.iceServers[a])}e.iceServers=i}return new t(e,r)},e.RTCPeerConnection.prototype=t.prototype,
// wrap static methods. Currently just generateCertificate.
"generateCertificate"in e.RTCPeerConnection&&Object.defineProperty(e.RTCPeerConnection,"generateCertificate",{get:function(){return t.generateCertificate}})},shimTrackEventTransceiver:function(e){
// Add event.transceiver member over deprecated event.receiver
"object"===(void 0===e?"undefined":c(e))&&e.RTCPeerConnection&&"receiver"in e.RTCTrackEvent.prototype&&
// can't check 'transceiver' in window.RTCTrackEvent.prototype, as it is
// defined for some reason even when window.RTCTransceiver is not.
!e.RTCTransceiver&&Object.defineProperty(e.RTCTrackEvent.prototype,"transceiver",{get:function(){return{receiver:this.receiver}}})},shimCreateOfferLegacy:function(e){var t=e.RTCPeerConnection.prototype.createOffer;e.RTCPeerConnection.prototype.createOffer=function(e){var r=this;if(e){void 0!==e.offerToReceiveAudio&&(
// support bit values
e.offerToReceiveAudio=!!e.offerToReceiveAudio);var n=r.getTransceivers().find(function(e){return e.sender.track&&"audio"===e.sender.track.kind});!1===e.offerToReceiveAudio&&n?"sendrecv"===n.direction?n.setDirection?n.setDirection("sendonly"):n.direction="sendonly":"recvonly"===n.direction&&(n.setDirection?n.setDirection("inactive"):n.direction="inactive"):!0!==e.offerToReceiveAudio||n||r.addTransceiver("audio"),void 0!==e.offerToReceiveAudio&&(
// support bit values
e.offerToReceiveVideo=!!e.offerToReceiveVideo);var i=r.getTransceivers().find(function(e){return e.sender.track&&"video"===e.sender.track.kind});!1===e.offerToReceiveVideo&&i?"sendrecv"===i.direction?i.setDirection("sendonly"):"recvonly"===i.direction&&i.setDirection("inactive"):!0!==e.offerToReceiveVideo||i||r.addTransceiver("video")}return t.apply(r,arguments)}}}},{"../utils":13}],13:[function(e,t,r){var n=!0,i=!0;
/**
       * Extract browser version out of the provided user agent string.
       *
       * @param {!string} uastring userAgent string.
       * @param {!string} expr Regular expression used as match criteria.
       * @param {!number} pos position in the version string to be returned.
       * @return {!number} browser version.
       */
function a(e,t,r){var n=e.match(t);return n&&n.length>=r&&parseInt(n[r],10)}
// Wraps the peerconnection event eventNameToWrap in a function
// which returns the modified event object.
// Utility methods.
t.exports={extractVersion:a,wrapPeerConnectionEvent:function(e,t,r){if(e.RTCPeerConnection){var n=e.RTCPeerConnection.prototype,i=n.addEventListener;n.addEventListener=function(e,n){if(e!==t)return i.apply(this,arguments);var a=function(e){n(r(e))};return this._eventMap=this._eventMap||{},this._eventMap[n]=a,i.apply(this,[e,a])};var a=n.removeEventListener;n.removeEventListener=function(e,r){if(e!==t||!this._eventMap||!this._eventMap[r])return a.apply(this,arguments);var n=this._eventMap[r];return delete this._eventMap[r],a.apply(this,[e,n])},Object.defineProperty(n,"on"+t,{get:function(){return this["_on"+t]},set:function(e){this["_on"+t]&&(this.removeEventListener(t,this["_on"+t]),delete this["_on"+t]),e&&this.addEventListener(t,this["_on"+t]=e)}})}},disableLog:function(e){return"boolean"!=typeof e?new Error("Argument type: "+(void 0===e?"undefined":c(e))+". Please use a boolean."):(n=e,e?"adapter.js logging disabled":"adapter.js logging enabled")},
/**
         * Disable or enable deprecation warnings
         * @param {!boolean} bool set to true to disable warnings.
         */
disableWarnings:function(e){return"boolean"!=typeof e?new Error("Argument type: "+(void 0===e?"undefined":c(e))+". Please use a boolean."):(i=!e,"adapter.js deprecation warnings "+(e?"disabled":"enabled"))},log:function(){if("object"===("undefined"==typeof window?"undefined":c(window))){if(n)return;"undefined"!=typeof console&&"function"==typeof console.log&&console.log.apply(console,arguments)}},
/**
         * Shows a deprecation warning suggesting the modern and spec-compatible API.
         */
deprecated:function(e,t){i&&console.warn(e+" is deprecated, please use "+t+" instead.")},
/**
         * Browser detector.
         *
         * @return {object} result containing browser and version
         *     properties.
         */
detectBrowser:function(e){var t=e&&e.navigator,r={browser:null,version:null};
// Returned result object.
// Fail early if it's not a browser
if(void 0===e||!e.navigator)return r.browser="Not a browser.",r;if(t.mozGetUserMedia)
// Firefox.
r.browser="firefox",r.version=a(t.userAgent,/Firefox\/(\d+)\./,1);else if(t.webkitGetUserMedia)
// Chrome, Chromium, Webview, Opera.
// Version matches Chrome/WebRTC version.
r.browser="chrome",r.version=a(t.userAgent,/Chrom(e|ium)\/(\d+)\./,2);else if(t.mediaDevices&&t.userAgent.match(/Edge\/(\d+).(\d+)$/))
// Edge.
r.browser="edge",r.version=a(t.userAgent,/Edge\/(\d+).(\d+)$/,2);else{if(!e.RTCPeerConnection||!t.userAgent.match(/AppleWebKit\/(\d+)\./))
// Default fallthrough: not supported.
return r.browser="Not a supported browser.",r;
// Safari.
r.browser="safari",r.version=a(t.userAgent,/AppleWebKit\/(\d+)\./,1)}return r}}},{}]},{},[3])(3)})}).call(this,r(18))
/***/},
/***/83:
/***/function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});o(r(82));var n=o(r(6)),i=o(r(0)),a=r(2);function o(e){return e&&e.__esModule?e:{default:e}}t.default=function(e,t,r){t=t;var o="",s="",c="",d={iceServers:[{urls:"stun:stun.l.google.com:19302"}]},p={};function u(e){OvenPlayerConsole.log("WebRTC Loader closePeear()"),o&&(OvenPlayerConsole.log("Closing websocket connection..."),OvenPlayerConsole.log("Send Signaling : Stop."),o.send(JSON.stringify({command:"stop"})),o.close(),o=null),s&&(OvenPlayerConsole.log("Closing peer connection..."),c&&clearTimeout(c),s.close(),s=null),e&&r(e)}return function(){var e=window.onbeforeunload;window.onbeforeunload=function(t){e&&e(t),OvenPlayerConsole.log("This calls auto when browser closed."),u()}}(),p.connect=function(){return function(){OvenPlayerConsole.log("WebRTCLoader connecting...");var r=function(e,t,r){t.setLocalDescription(r).then(function(){
// my SDP created.
var r=t.localDescription;OvenPlayerConsole.log("Local SDP",r),//test code
// my sdp send to server.
o.send(JSON.stringify({id:e,command:"answer",sdp:r}))}).catch(function(e){u({code:a.PLAYER_WEBRTC_SET_LOCAL_DESC_ERROR,reason:"setLocalDescription error occurred",message:"setLocalDescription error occurred",error:e})})};return new n.default(function(n,p){OvenPlayerConsole.log("WebRTCLoader url : "+t);try{(o=new WebSocket(t)).onopen=function(){o.send(JSON.stringify({command:"request_offer"}))},o.onmessage=function(t){var p=JSON.parse(t.data);if(p.error)return OvenPlayerConsole.log(p.error),u({code:a.PLAYER_WEBRTC_WS_ERROR,reason:"websocket error occured",message:"websocket error occurred",error:p}),!1;if(p.list)OvenPlayerConsole.log("List received");else if(p.id){if(s||((s=new RTCPeerConnection(d)).onicecandidate=function(e){e.candidate&&(OvenPlayerConsole.log("WebRTCLoader send candidate to server : "+e.candidate),o.send(JSON.stringify({id:p.id,command:"candidate",candidates:[e.candidate]})))},s.onnegotiationneeded=function(){s.createOffer().then(function(e){OvenPlayerConsole.log("createOffer : success"),r(p.id,s,e)}).catch(function(e){u({code:a.PLAYER_WEBRTC_CREATE_ANSWER_ERROR,reason:"createOffer error occurred",message:"createOffer error occurred",error:error})})},s.onaddstream=function(t){OvenPlayerConsole.log("stream received.");
// stream received.
var r=[],
//8 statistics. every 2 seconds
o=0,d=0,p=0;!function t(){c=setTimeout(function(){if(!s)return!1;s.getStats().then(function(n){
//console.log(stats);
n.forEach(function(t){
//console.log(state);
"inbound-rtp"!==t.type||t.isRemote||(OvenPlayerConsole.log(t),
//(state.packetsLost - prevPacketsLost) is real current lost.
r.push(parseInt(t.packetsLost)-parseInt(o)),r.length>8&&(r=r.slice(r.length-8,r.length),d=i.default.reduce(r,function(e,t){return e+t},0)/8,OvenPlayerConsole.log("Last8 LOST PACKET AVG  : "+d,t.packetsLost,r),d>20?3==++p&&(OvenPlayerConsole.log("NETWORK UNSTABLED!!! "),clearTimeout(c),e.trigger(a.NETWORK_UNSTABLED)):p=0),o=t.packetsLost)}),t()})},2e3)}(),n(t.stream)}),p.sdp&&
//Set remote description when I received sdp from server.
s.setRemoteDescription(new RTCSessionDescription(p.sdp)).then(function(){"offer"===s.remoteDescription.type&&
// This creates answer when I received offer from publisher.
s.createAnswer().then(function(e){OvenPlayerConsole.log("createAnswer : success"),r(p.id,s,e)}).catch(function(e){u({code:a.PLAYER_WEBRTC_CREATE_ANSWER_ERROR,reason:"createAnswer error occurred",message:"createAnswer error occurred",error:e})})}).catch(function(e){u({code:a.PLAYER_WEBRTC_SET_REMOTE_DESC_ERROR,reason:"setRemoteDescription error occurred",message:"setRemoteDescription error occurred",error:e})}),p.candidates)
// This receives ICE Candidate from server.
for(var l=0;l<p.candidates.length;l++)p.candidates[l]&&p.candidates[l].candidate&&s.addIceCandidate(new RTCIceCandidate(p.candidates[l])).then(function(){OvenPlayerConsole.log("addIceCandidate : success")}).catch(function(e){u({code:a.PLAYER_WEBRTC_ADD_ICECANDIDATE_ERROR,reason:"addIceCandidate error occurred",message:"addIceCandidate error occurred",error:e})})}else OvenPlayerConsole.log("ID must be not null")},o.onerror=function(e){u({code:a.PLAYER_WEBRTC_WS_ERROR,reason:"websocket error occured",message:"websocket error occurred",error:e}),p(e)}}catch(e){u({code:a.PLAYER_WEBRTC_WS_ERROR,reason:"websocket error occured",message:"websocket error occurred",error:e})}})}()},p.destroy=function(){u()},p}}}]);
//# sourceMappingURL=ovenplayer.provider.WebRTCProvider.js.map