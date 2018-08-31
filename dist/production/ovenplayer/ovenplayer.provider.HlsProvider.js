/*! For license information please see ovenplayer.provider.HlsProvider.js.LICENSE */
/*! OvenPlayerv0.7.1 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{
/***/14:
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i(n(76)),o=i(n(78)),a=n(2);function i(e){return e&&e.__esModule?e:{default:e}}
/**
 * @brief   hlsjs provider extended core.
 * @param   element video element.
 * @param   playerConfig    config.
 * */
/**
    * Created by hoho on 2018. 6. 7..
    */
t.default=function e(t,n){var i=(0,r.default)(t,a.PROVIDER_HLS),u=i.create(),l="",s={},d="",c="";try{(l=new e({debug:!1})).attachMedia(u),s=(0,o.default)(a.PROVIDER_HLS,l,n,function(e,t){OvenPlayerConsole.log("HLS : onBeforeLoad : ",e,"lastPlayPosition : "+t),l.loadSource(e.file),t>0&&(u.seek(t),d())}),OvenPlayerConsole.log("HLS PROVIDER LOADED."),d=s.super("play"),c=s.super("destroy"),s.destroy=function(){l.destroy(),l=null,i.destroy(),OvenPlayerConsole.log("HLS : PROVIDER DESTROUYED."),c()}}catch(e){throw new Error(e)}return s}},
/***/28:
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});
/**
 * Created by hoho on 2018. 8. 24..
 */
t.getBrowser=function(){if(-1!=(navigator.userAgent.indexOf("Opera")||navigator.userAgent.indexOf("OPR")))return"opera";if(-1!=navigator.userAgent.indexOf("Chrome"))return"chrome";if(-1!=navigator.userAgent.indexOf("Safari"))return"safari";if(-1!=navigator.userAgent.indexOf("Firefox"))return"firefox";if(-1!=navigator.userAgent.indexOf("MSIE")){var e=avigator.userAgent.indexOf("MSIE");return 1==!!document.documentMode?"ie":navigator.userAgent.match(/Trident.*rv\:11\./)?isNaN(parseInt(ua.substring(e+5,ua.indexOf(".",e))))?"unknown":"ie":"unknown"}return"unknown"};
/***/},
/***/76:
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(28),o=n(2);t.default=function(e,t){var n={},a=e.getAttribute("data-parent-id"),i="",u=(0,r.getBrowser)();OvenPlayerConsole.log("MediaManager loaded. browserType : "+u);return n.create=function(){return OvenPlayerConsole.log("MediaManager createElement()"),i&&n.destroy(),function(){if(t!==o.PROVIDER_RTMP)(i=document.createElement("video")).setAttribute("disableRemotePlayback",""),i.setAttribute("webkit-playsinline",""),i.setAttribute("playsinline",""),e.appendChild(i);else{var n=void 0,r=void 0,u=void 0,l=void 0,s=void 0;(n=document.createElement("param")).setAttribute("name","movie"),n.setAttribute("value","./ovenplayer/OvenPlayerFlash.swf"),(r=document.createElement("param")).setAttribute("name","flashvars"),
//playerId uses SWF for ExternalInterface.call().
r.setAttribute("value","playerId="+a),(u=document.createElement("param")).setAttribute("name","allowscriptaccess"),u.setAttribute("value","always"),(l=document.createElement("param")).setAttribute("name","allowfullscreen"),l.setAttribute("value","true"),(s=document.createElement("param")).setAttribute("name","quality"),s.setAttribute("value","height"),(i=document.createElement("object")).setAttribute("type","application/x-shockwave-flash"),i.setAttribute("data","./ovenplayer/OvenPlayerFlash.swf"),i.setAttribute("id",a+"-flash"),i.setAttribute("name",a+"-flash"),i.setAttribute("width","100%"),i.setAttribute("height","100%"),i.appendChild(r),i.appendChild(u),i.appendChild(l),
/*if(browserType !== "ie"){
                mediaElement.appendChild(inner);
            }*/
e.appendChild(i)}return i}()},n.destroy=function(){OvenPlayerConsole.log("MediaManager removeElement()"),e.removeChild(i),i=null},n}},
/***/77:
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(2);
/**
 * @brief   Trigger on various video events.
 * @param   providerName child Provider Name
 * @param   extendedElement extended media object by mse.
 * @param   element elVideo  video
 * @param   Provider provider  html5Provider
 * */t.default=function(e,t,n,o){var a={};OvenPlayerConsole.log("EventListener loaded.");var i={};
//Fires when the browser can start playing the audio/video
return a.canplay=function(){o.setCanSeek(!0),o.trigger(r.CONTENT_BUFFER_FULL),OvenPlayerConsole.log("EventListener : on canplay")},
//Fires when the duration of the audio/video is changed
a.durationchange=function(){a.progress(),OvenPlayerConsole.log("EventListener : on durationchange")},
//Fires when the current playlist is ended
a.ended=function(){OvenPlayerConsole.log("EventListener : on ended"),o.getState()!=r.STATE_IDLE&&o.getState()!=r.STATE_COMPLETE&&(o.trigger(r.CONTENT_COMPLETE),o.setState(r.STATE_COMPLETE))},
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
var a=n.duration==1/0||e===r.PROVIDER_DASH&&t.isDynamic(),i=o.getCurrentQuality()?o.getCurrentQuality().type:"",u={duration:a?1/0:n.duration,type:i};
//provider.setLive(isLive);
OvenPlayerConsole.log("EventListener : on loadedmetadata",u),o.trigger(r.CONTENT_META,u)},
//Fires when the audio/video has been paused
a.pause=function(){return o.getState()!==r.STATE_COMPLETE&&o.getState()!==r.STATE_ERROR&&!n.ended&&!n.error&&n.currentTime!==n.duration&&(OvenPlayerConsole.log("EventListener : on pause"),void o.setState(r.STATE_PAUSED))},
//Fires when the audio/video has been started or is no longer paused
a.play=function(){n.paused||o.getState()===r.STATE_PLAYING||(OvenPlayerConsole.log("EventListener : on play"),o.setState(r.STATE_LOADING))},
//Fires when the audio/video is playing after having been paused or stopped for buffering
a.playing=function(){OvenPlayerConsole.log("EventListener : on playing"),o.setState(r.STATE_PLAYING)},
//Fires when the browser is downloading the audio/video
a.progress=function(){var e=n.buffered;if(!e)return!1;var t=n.duration,a=n.currentTime,i=function(e,t,n){return Math.max(Math.min(e,n),t)}((e.length>0?e.end(e.length-1):0)/t,0,1);OvenPlayerConsole.log("EventListener : on progress",100*i),o.setBuffer(100*i),o.trigger(r.CONTENT_BUFFER,{bufferPercent:100*i,position:a,duration:t})},
//Fires when the browser is trying to get media data, but data is not available
a.stalled=function(){OvenPlayerConsole.log("EventListener : on stall")},
//Fires when the current playback position has changed
a.timeupdate=function(){var e=n.currentTime,t=n.duration;isNaN(t)||(o.isSeeking()||n.paused||o.setState(r.STATE_PLAYING),OvenPlayerConsole.log("EventListener : on timeupdate",{position:e,duration:t}),(o.getState()===r.STATE_PLAYING||o.isSeeking())&&o.trigger(r.CONTENT_TIME,{position:e,duration:t}))},a.resize=function(){OvenPlayerConsole.log("EventListener : on resize")},a.seeking=function(){o.setSeeking(!0),OvenPlayerConsole.log("EventListener : on seeking",n.currentTime),o.trigger(r.CONTENT_SEEK,{position:n.currentTime})},a.seeked=function(){o.isSeeking()&&(OvenPlayerConsole.log("EventListener : on seeked"),o.setSeeking(!1),o.trigger(r.CONTENT_SEEKED))},
//Fires when the video stops because it needs to buffer the next frame
a.waiting=function(){OvenPlayerConsole.log("EventListener : on waiting",o.getState()),o.isSeeking()?o.setState(r.STATE_LOADING):o.getState()==r.STATE_PLAYING&&o.setState(r.STATE_STALLED)},a.volumechange=function(){OvenPlayerConsole.log("EventListener : on volumechange",Math.round(100*n.volume)),o.trigger(r.CONTENT_VOLUME,{volume:Math.round(100*n.volume),mute:n.muted})},a.error=function(){var e=n.error&&n.error.code||0,t={0:{code:r.PLAYER_UNKNWON_ERROR,reason:"Unknown html5 video error",message:"Unknown html5 video error"},1:{code:r.PLAYER_UNKNWON_OPERATION_ERROR,reason:"Unknown operation aborted",message:"Unknown operation aborted"},2:{code:r.PLAYER_UNKNWON_NEWWORK_ERROR,reason:"Unknown network error",message:"Unknown network error"},3:{code:r.PLAYER_UNKNWON_DECODE_ERROR,reason:"Unknown decode error",message:"Unknown decode error"},4:{code:r.PLAYER_FILE_ERROR,reason:"File could not be played",message:"File could not be played"}}[e]||0;t.error=n.error,OvenPlayerConsole.log("EventListener : on error",t),function(e){o.setState(r.STATE_ERROR),o.pause(),
//PRIVATE_STATE_ERROR
o.trigger(r.ERROR,e)}(t)},Object.keys(a).forEach(function(e){n.removeEventListener(e,a[e]),n.addEventListener(e,a[e])}),i.destroy=function(){OvenPlayerConsole.log("EventListener : destroy()"),Object.keys(a).forEach(function(e){n.removeEventListener(e,a[e])})},i}},
/***/78:
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=l(n(12)),o=l(n(77)),a=l(n(0)),i=l(n(6)),u=n(2);function l(e){return e&&e.__esModule?e:{default:e}}t.default=function(e,t,n,l){OvenPlayerConsole.log("CORE loaded. ");var s={};(0,r.default)(s);var d=function(e,t){return a.default.isElement(t)?t:e===u.PROVIDER_DASH?t.getVideoElement():e===u.PROVIDER_HLS?t.media:null}(e,t),c=(0,o.default)(e,t,d,s),f=!1,g=!1,E=u.STATE_IDLE,v=0,y=-1,O=[],T=n.getConfig().image||"";d.playbackRate=d.defaultPlaybackRate=n.getDefaultPlaybackRate();var p=function(e){var t=Math.max(0,y);if(e)for(var r=0;r<e.length;r++)if(e[r].default&&(t=r),n.getQualityLabel()&&e[r].label===n.getQualityLabel())return r;return t},m=function(e){var t=O[y];if(l)l(t,e);else{OvenPlayerConsole.log("source loaded : ",t,"lastPlayPosition : "+e);var n=d.src,r=document.createElement("source");r.src=t.file,r.src!==n?(d.src=O[y].file,
// Do not call load if src was not set. load() will cancel any active play promise.
n&&d.load()):0==e&&d.currentTime>0&&s.seek(e),e>0&&(s.seek(e),s.play()),s.trigger(u.CONTENT_LEVELS,{currentQuality:y}),T&&(d.poster=T)}};return s.getName=function(){return e},s.canSeek=function(){return f},s.setCanSeek=function(e){f=e},s.isSeeking=function(){return g},s.setSeeking=function(e){g=e},s.setState=function(e){if(E!=e){var t=E;switch(e){case u.STATE_COMPLETE:s.trigger(u.PLAYER_COMPLETE);break;case u.STATE_PAUSED:s.trigger(u.PLAYER_PAUSE,{prevState:E});break;case u.STATE_PLAYING:s.trigger(u.PLAYER_PLAY,{prevState:E})}E=e,s.trigger(u.PLAYER_STATE,{prevstate:t,newstate:E})}},s.getState=function(){return E},s.setBuffer=function(e){v=e},s.getBuffer=function(){return v},s.getDuration=function(){return d.duration==1/0||e===u.PROVIDER_DASH&&t.isDynamic()?1/0:d.duration},s.getPosition=function(){return d.currentTime},s.setVolume=function(e){d.volume=e/100},s.getVolume=function(){return 100*d.volume},s.setMute=function(e){return void 0===e?(d.muted=!d.muted,s.trigger(u.CONTENT_MUTE,{mute:d.muted})):(d.muted=e,s.trigger(u.CONTENT_MUTE,{mute:d.muted})),d.muted},s.getMute=function(){return d.muted},s.preload=function(e,t){return y=p(O=e),m(t||0),new i.default(function(e,t){e()})},s.load=function(e){y=p(O=e),m(e.starttime||0)},s.play=function(){s.getState()!==u.STATE_PLAYING&&d.play()},s.pause=function(){s.getState()==u.STATE_PLAYING&&d.pause()},s.seek=function(e){d.currentTime=e},s.setPlaybackRate=function(e){return s.trigger(u.PLAYBACK_RATE_CHANGED,{playbackRate:e}),d.playbackRate=d.defaultPlaybackRate=e},s.getPlaybackRate=function(){return d.playbackRate},s.getQualityLevels=function(){return O.map(function(e,t){return{file:e.file,type:e.type,label:e.label,index:t}})},s.getCurrentQuality=function(){var e=O[y];return{file:e.file,type:e.type,label:e.label,index:y}},s.setCurrentQuality=function(e,t){return y!=e&&(e>-1&&O&&O.length>e?(
//that.pause();
s.setState(u.STATE_IDLE),OvenPlayerConsole.log("source changed : "+e),y=e,s.trigger(u.CONTENT_LEVEL_CHANGED,{currentQuality:e}),n.setQualityLabel(O[e].label),t&&m(d.currentTime||0),y):void 0)},s.stop=function(){for(OvenPlayerConsole.log("CORE : stop() "),d.removeAttribute("preload"),d.removeAttribute("src");d.firstChild;)d.removeChild(d.firstChild);s.pause(),s.setState(u.STATE_IDLE)},s.destroy=function(){s.stop(),c.destroy(),
//elVideo.remove();
s.off(),OvenPlayerConsole.log("CORE : destroy() player stop, listener, event destroied")},
//XXX : I hope using es6 classes. but I think to occur problem from Old IE. Then I choice function inherit. Finally using super function is so difficult.
// use : let super_destroy  = that.super('destroy'); ... super_destroy();
s.super=function(e){var t=s[e];return function(){return t.apply(s,arguments)}},s}}}]);
//# sourceMappingURL=ovenplayer.provider.HlsProvider.js.map