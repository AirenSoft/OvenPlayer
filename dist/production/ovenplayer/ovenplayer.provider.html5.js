/*! For license information please see ovenplayer.provider.html5.js.LICENSE */
/*! OvenPlayerv0.6.6 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{
/***/15:
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(e){return e&&e.__esModule?e:{default:e}}
/**
 * @brief   html5 provider extended core.
 * @param   element video element.
 * @param   playerConfig    config.
 * */(n(74)),r=n(2);t.default=function(e,t){var n=(0,o.default)(r.PROVIDER_HTML5,e,t),a=n.super("destroy");return OvenPlayerConsole.log("HTML5 PROVIDER LOADED."),n.destroy=function(){a(),OvenPlayerConsole.log("HTML5 : PROVIDER DESTROYED.")},n}},
/***/74:
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=i(n(11)),r=i(n(75)),a=n(2),l=i(n(0));i(n(6));function i(e){return e&&e.__esModule?e:{default:e}}t.default=function(e,t,n,i){OvenPlayerConsole.log("CORE loaded. ");var u={};(0,o.default)(u);var s=function(e,t){return l.default.isElement(t)?t:e===a.PROVIDER_DASH?t.getVideoElement():e===a.PROVIDER_HLS?t.media:null}(e,t),E=(0,r.default)(e,t,s,u),g=!1,c=!1,O=a.STATE_IDLE,d=0,v=-1,C=[],f=n.getConfig().image||"";s.playbackRate=s.defaultPlaybackRate=n.getDefaultPlaybackRate();var y=function(e){v=function(e){var t=Math.max(0,v);if(e)for(var o=0;o<e.length;o++)if(e[o].default&&(t=o),n.getQualityLabel()&&e[o].label===n.getQualityLabel())return o;return t}(e)},P=function(e){var t=C[v];if(i)i(t,e);else{OvenPlayerConsole.log("source loaded : ",t,"lastPlayPosition : "+e);var n=s.src,o=document.createElement("source");o.src=t.file,o.src!==n?(s.src=C[v].file,
// Do not call load if src was not set. load() will cancel any active play promise.
n&&s.load()):0==e&&s.currentTime>0&&u.seek(e),e>0&&(u.seek(e),u.play()),u.trigger(a.CONTENT_LEVELS,{currentQuality:v}),f&&(s.poster=f)}};return u.getCurrentSource=function(){return OvenPlayerConsole.log("CORE : getCurrentSource() ",C[v]),C[v]},u.canSeek=function(){return OvenPlayerConsole.log("CORE : canSeek() ",g),g},u.setCanSeek=function(e){OvenPlayerConsole.log("CORE : setCanSeek() ",e),g=e},u.isSeeking=function(){return OvenPlayerConsole.log("CORE : isSeeking() ",c),c},u.setSeeking=function(e){OvenPlayerConsole.log("CORE : setSeeking() ",e),c=e},
//that.isLive = ()=>{return isLive;};
//that.setLive = (live)=>{isLive = live;};
u.setPlayerElement=function(e){OvenPlayerConsole.log("CORE : setPlayerElement() ",e),s=e},u.setState=function(e){if(O!=e){var t=O;switch(e){case a.STATE_COMPLETE:u.trigger(a.PLAYER_COMPLETE);break;case a.STATE_PAUSED:u.trigger(a.PLAYER_PAUSE,{prevState:O});break;case a.STATE_PLAYING:u.trigger(a.PLAYER_PLAY,{prevState:O})}O=e,OvenPlayerConsole.log("CORE : setState() ",O),u.trigger(a.PLAYER_STATE,{prevstate:t,newstate:O})}},u.getState=function(){return OvenPlayerConsole.log("CORE : getState() ",O),O},u.setBuffer=function(e){OvenPlayerConsole.log("CORE : setBuffer() ",e),d=e},u.getBuffer=function(){return OvenPlayerConsole.log("CORE : getBuffer() ",d),d},u.getDuration=function(){
//ToDo : You consider hlsjs. But not now because we don't support hlsjs.
var n=s.duration==1/0||e===a.PROVIDER_DASH&&t.isDynamic();return OvenPlayerConsole.log("CORE : getDuration() ",n?1/0:s.duration),n?1/0:s.duration},u.getPosition=function(){return OvenPlayerConsole.log("CORE : getPosition() ",s.currentTime),s.currentTime},u.setVolume=function(e){OvenPlayerConsole.log("CORE : setVolume() ",e),s.volume=e/100},u.getVolume=function(){return OvenPlayerConsole.log("CORE : getVolume() ",100*s.volume),100*s.volume},u.setMute=function(e){return void 0===e?(s.muted=!s.muted,u.trigger(a.CONTENT_MUTE,{mute:s.muted})):(s.muted=e,u.trigger(a.CONTENT_MUTE,{mute:s.muted})),OvenPlayerConsole.log("CORE : setMute() ",s.muted),s.muted},u.getMute=function(){return OvenPlayerConsole.log("CORE : setMute() ",s.muted),s.muted},u.preload=function(e,t){OvenPlayerConsole.log("CORE : preload() ",e,t),y(C=e),P(t||0)},u.load=function(e){OvenPlayerConsole.log("CORE : load() ",e),y(C=e),P(e.starttime||0)},u.play=function(){OvenPlayerConsole.log("CORE : play() "),u.getState()!==a.STATE_PLAYING&&s.play()},u.pause=function(){OvenPlayerConsole.log("CORE : pause() "),u.getState()==a.STATE_PLAYING&&s.pause()},u.seek=function(e){OvenPlayerConsole.log("CORE : seek() ",e),s.currentTime=e},u.setPlaybackRate=function(e){return u.trigger(a.PLAYBACK_RATE_CHANGED,{playbackRate:e}),OvenPlayerConsole.log("CORE : setPlaybackRate() ",e),s.playbackRate=s.defaultPlaybackRate=e},u.getPlaybackRate=function(){return OvenPlayerConsole.log("CORE : getPlaybackRate() ",s.playbackRate),s.playbackRate},u.getQualityLevels=function(){var e=C.map(function(e){return function(e){return{bitrate:e.bitrate,label:e.label,width:e.width,height:e.height}}(e)});return OvenPlayerConsole.log("CORE : getQualityLevels() ",e),e},u.getCurrentQuality=function(){return OvenPlayerConsole.log("CORE : getCurrentQuality() ",v),v},u.setCurrentQuality=function(e,t){return OvenPlayerConsole.log("CORE : setCurrentQuality() ",e,t),v!=e&&(e>-1&&C&&C.length>e?(
//that.pause();
u.setState(a.STATE_IDLE),OvenPlayerConsole.log("source changed : "+e),v=e,u.trigger(a.CONTENT_LEVEL_CHANGED,{currentQuality:e}),n.setQualityLabel(C[e].label),t&&P(s.currentTime||0),v):void 0)},u.stop=function(){for(OvenPlayerConsole.log("CORE : stop() "),s.removeAttribute("preload"),s.removeAttribute("src");s.firstChild;)s.removeChild(s.firstChild);u.pause(),u.setState(a.STATE_IDLE)},u.destroy=function(){u.stop(),E.destroy(),
//elVideo.remove();
u.off(),OvenPlayerConsole.log("CORE : destroy() player stop, listener, event destroied")},
//XXX : This is es6. So we can't "prototype export". Finally I consider this method.
u.super=function(e){var t=u[e];return function(){return t.apply(u,arguments)}},u}},
/***/75:
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(2);
/**
 * @brief   Trigger on various video events.
 * @param   providerName child Provider Name
 * @param   extendedElement extended media object by mse.
 * @param   element elVideo  video
 * @param   Provider provider  html5Provider
 * */t.default=function(e,t,n,r){var a={};OvenPlayerConsole.log("EventListener loaded.");var l={};
//Fires when the browser can start playing the audio/video
return a.canplay=function(){r.setCanSeek(!0),r.trigger(o.CONTENT_BUFFER_FULL),OvenPlayerConsole.log("EventListener : on canplay")},
//Fires when the duration of the audio/video is changed
a.durationchange=function(){a.progress(),OvenPlayerConsole.log("EventListener : on durationchange")},
//Fires when the current playlist is ended
a.ended=function(){OvenPlayerConsole.log("EventListener : on ended"),r.getState()!=o.STATE_IDLE&&r.getState()!=o.STATE_COMPLETE&&(r.trigger(o.CONTENT_COMPLETE),r.setState(o.STATE_COMPLETE))},
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
var a=n.duration==1/0||e===o.PROVIDER_DASH&&t.isDynamic(),l=r.getCurrentSource()?r.getCurrentSource().type:"",i={duration:a?1/0:n.duration,type:l};
//provider.setLive(isLive);
OvenPlayerConsole.log("EventListener : on loadedmetadata",i),r.trigger(o.CONTENT_META,i)},
//Fires when the audio/video has been paused
a.pause=function(){return r.getState()!==o.STATE_COMPLETE&&r.getState()!==o.STATE_ERROR&&!n.ended&&!n.error&&n.currentTime!==n.duration&&(OvenPlayerConsole.log("EventListener : on pause"),void r.setState(o.STATE_PAUSED))},
//Fires when the audio/video has been started or is no longer paused
a.play=function(){n.paused||r.getState()===o.STATE_PLAYING||(OvenPlayerConsole.log("EventListener : on play"),r.setState(o.STATE_LOADING))},
//Fires when the audio/video is playing after having been paused or stopped for buffering
a.playing=function(){OvenPlayerConsole.log("EventListener : on playing"),r.setState(o.STATE_PLAYING)},
//Fires when the browser is downloading the audio/video
a.progress=function(){var e=n.buffered;if(!e)return!1;var t=n.duration,a=n.currentTime,l=function(e,t,n){return Math.max(Math.min(e,n),t)}((e.length>0?e.end(e.length-1):0)/t,0,1);OvenPlayerConsole.log("EventListener : on progress",100*l),r.setBuffer(100*l),r.trigger(o.CONTENT_BUFFER,{bufferPercent:100*l,position:a,duration:t})},
//Fires when the browser is trying to get media data, but data is not available
a.stalled=function(){OvenPlayerConsole.log("EventListener : on stall")},
//Fires when the current playback position has changed
a.timeupdate=function(){var e=n.currentTime,t=n.duration;isNaN(t)||(r.isSeeking()||n.paused||r.setState(o.STATE_PLAYING),OvenPlayerConsole.log("EventListener : on timeupdate",{position:e,duration:t}),(r.getState()===o.STATE_PLAYING||r.isSeeking())&&r.trigger(o.CONTENT_TIME,{position:e,duration:t}))},a.resize=function(){OvenPlayerConsole.log("EventListener : on resize")},a.seeking=function(){r.setSeeking(!0),OvenPlayerConsole.log("EventListener : on seeking",n.currentTime),r.trigger(o.CONTENT_SEEK,{position:n.currentTime})},a.seeked=function(){r.isSeeking()&&(OvenPlayerConsole.log("EventListener : on seeked"),r.setSeeking(!1),r.trigger(o.CONTENT_SEEKED))},
//Fires when the video stops because it needs to buffer the next frame
a.waiting=function(){OvenPlayerConsole.log("EventListener : on waiting",r.getState()),r.isSeeking()?r.setState(o.STATE_LOADING):r.getState()==o.STATE_PLAYING&&r.setState(o.STATE_STALLED)},a.volumechange=function(){OvenPlayerConsole.log("EventListener : on volumechange",Math.round(100*n.volume)),r.trigger(o.CONTENT_VOLUME,{volume:Math.round(100*n.volume),mute:n.muted})},a.error=function(){var e=n.error&&n.error.code||0,t={0:{code:o.PLAYER_UNKNWON_ERROR,reason:"Unknown html5 video error",message:"Unknown html5 video error"},1:{code:o.PLAYER_UNKNWON_OPERATION_ERROR,reason:"Unknown operation aborted",message:"Unknown operation aborted"},2:{code:o.PLAYER_UNKNWON_NEWWORK_ERROR,reason:"Unknown network error",message:"Unknown network error"},3:{code:o.PLAYER_UNKNWON_DECODE_ERROR,reason:"Unknown decode error",message:"Unknown decode error"},4:{code:o.PLAYER_FILE_ERROR,reason:"File could not be played",message:"File could not be played"}}[e]||0;t.error=n.error,OvenPlayerConsole.log("EventListener : on error",t),function(e){r.setState(o.STATE_ERROR),r.pause(),
//PRIVATE_STATE_ERROR
r.trigger(o.ERROR,e)}(t)},Object.keys(a).forEach(function(e){n.removeEventListener(e,a[e]),n.addEventListener(e,a[e])}),l.destroy=function(){OvenPlayerConsole.log("EventListener : destroy()"),Object.keys(a).forEach(function(e){n.removeEventListener(e,a[e])})},l}}}]);
//# sourceMappingURL=ovenplayer.provider.html5.js.map