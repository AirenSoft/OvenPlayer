/*! For license information please see ovenplayer.provider.RtmpProvider.js.LICENSE */
/*! OvenPlayerv0.7.1 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{
/***/13:
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i(n(76)),a=n(2),u=i(n(80));function i(e){return e&&e.__esModule?e:{default:e}}
/**
 * @brief   rtmp provider
 * @param   element video element.
 * @param   playerConfig    config.
 * */
/**
    * Created by hoho on 2018. 8. 23..
    */
t.default=function(e,t){var n=(0,r.default)(e,a.PROVIDER_RTMP),i=n.create(),o=(0,u.default)(a.PROVIDER_RTMP,i,t),l=o.super("destroy");return OvenPlayerConsole.log("RTMP PROVIDER LOADED."),o.destroy=function(){n.destroy(),OvenPlayerConsole.log("RTMP : PROVIDER DESTROYED."),l()},o}},
/***/28:
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});
/**
 * Created by hoho on 2018. 8. 24..
 */
t.getBrowser=function(){if(-1!=(navigator.userAgent.indexOf("Opera")||navigator.userAgent.indexOf("OPR")))return"opera";if(-1!=navigator.userAgent.indexOf("Chrome"))return"chrome";if(-1!=navigator.userAgent.indexOf("Safari"))return"safari";if(-1!=navigator.userAgent.indexOf("Firefox"))return"firefox";if(-1!=navigator.userAgent.indexOf("MSIE")){var e=avigator.userAgent.indexOf("MSIE");return 1==!!document.documentMode?"ie":navigator.userAgent.match(/Trident.*rv\:11\./)?isNaN(parseInt(ua.substring(e+5,ua.indexOf(".",e))))?"unknown":"ie":"unknown"}return"unknown"};
/***/},
/***/76:
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(28),a=n(2);t.default=function(e,t){var n={},u=e.getAttribute("data-parent-id"),i="",o=(0,r.getBrowser)();OvenPlayerConsole.log("MediaManager loaded. browserType : "+o);return n.create=function(){return OvenPlayerConsole.log("MediaManager createElement()"),i&&n.destroy(),function(){if(t!==a.PROVIDER_RTMP)(i=document.createElement("video")).setAttribute("disableRemotePlayback",""),i.setAttribute("webkit-playsinline",""),i.setAttribute("playsinline",""),e.appendChild(i);else{var n=void 0,r=void 0,o=void 0,l=void 0,s=void 0;(n=document.createElement("param")).setAttribute("name","movie"),n.setAttribute("value","./ovenplayer/OvenPlayerFlash.swf"),(r=document.createElement("param")).setAttribute("name","flashvars"),
//playerId uses SWF for ExternalInterface.call().
r.setAttribute("value","playerId="+u),(o=document.createElement("param")).setAttribute("name","allowscriptaccess"),o.setAttribute("value","always"),(l=document.createElement("param")).setAttribute("name","allowfullscreen"),l.setAttribute("value","true"),(s=document.createElement("param")).setAttribute("name","quality"),s.setAttribute("value","height"),(i=document.createElement("object")).setAttribute("type","application/x-shockwave-flash"),i.setAttribute("data","./ovenplayer/OvenPlayerFlash.swf"),i.setAttribute("id",u+"-flash"),i.setAttribute("name",u+"-flash"),i.setAttribute("width","100%"),i.setAttribute("height","100%"),i.appendChild(r),i.appendChild(o),i.appendChild(l),
/*if(browserType !== "ie"){
                mediaElement.appendChild(inner);
            }*/
e.appendChild(i)}return i}()},n.destroy=function(){OvenPlayerConsole.log("MediaManager removeElement()"),e.removeChild(i),i=null},n}},
/***/79:
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(2);
/**
    * Created by hoho on 2018. 8. 27..
    */
t.default=function(e,t){var n={isJSReady:function(){return!0},time:function(e){t.trigger(r.CONTENT_TIME,e),t.trigger(r.CONTENT_BUFFER,e)},volumeChanged:function(e){t.trigger(r.CONTENT_VOLUME,e)},stateChanged:function(e){t.setState(e.newstate),t.trigger(r.PLAYER_STATE,e)},metaChanged:function(e){t.trigger(r.CONTENT_META,e)},error:function(e){t.setState(r.STATE_ERROR),t.pause(),
//PRIVATE_STATE_ERROR
t.trigger(r.ERROR,e)}};return n}},
/***/80:
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=o(n(12)),a=o(n(79)),u=o(n(6)),i=n(2);function o(e){return e&&e.__esModule?e:{default:e}}
/**
 * @brief   Core For Flash Video.
 * @param   element flash object element
 * @param   playerConfig  player config
 * */
/**
 * Created by hoho on 2018. 8. 23..
 */t.default=function(e,t,n){OvenPlayerConsole.log("CORE loaded. ");var o={};(0,r.default)(o);var l=t,s=(0,a.default)(l,o),f=!1,c=!1,d=i.STATE_IDLE,g=-1,v=[],p=function(e){var t=Math.max(0,g);if(e)for(var r=0;r<e.length;r++)if(e[r].default&&(t=r),n.getQualityLabel()&&e[r].label===n.getQualityLabel())return r;return t},y=function(e){var t=v[g];OvenPlayerConsole.log("source loaded : ",t,"lastPlayPosition : "+e);var n=l.getCurrentSource();t.file!==n?l.load(t.file):0===e&&o.getPosition()>0&&o.seek(e),e>0&&(o.seek(e),o.play()),o.trigger(i.CONTENT_LEVELS,{currentQuality:g})};
//This is why. Flash does not self trig to ads,lmalm,
return o.triggerEventFromExternal=function(e,t){return s[e]?s[e](t):null},o.getName=function(){return e},o.canSeek=function(){return f},o.setCanSeek=function(e){f=e},o.isSeeking=function(){return c},o.setSeeking=function(e){c=e},o.setState=function(e){d=e},o.getState=function(){return d},o.setBuffer=function(e){},o.getBuffer=function(){return l.getBuffer()},o.getDuration=function(){return l.getDuration()},o.getPosition=function(){return l.getPosition()},o.setVolume=function(e){return l.setVolume(e)},o.getVolume=function(){return l.getVolume()},o.setMute=function(){l.setMute()},o.getMute=function(){return l.getMute()},o.preload=function(e,t){OvenPlayerConsole.log("CORE : preload() ",e,t);var n=0;return g=p(v=e),new u.default(function(e,r){!function a(){return n++,l.isFlashReady&&l.isFlashReady()?(y(t||0),e()):n<30?void setTimeout(a,100):r()}()})},o.load=function(e){g=p(v=e),y(e.starttime||0)},o.play=function(){l.play()},o.pause=function(){l.pause()},o.seek=function(e){l.seek(e)},o.setPlaybackRate=function(e){return 0},o.getPlaybackRate=function(){return 0},o.getQualityLevels=function(){return v.map(function(e,t){return{file:e.file,type:e.type,label:e.label,index:t}})},o.getCurrentQuality=function(){var e=v[g];return{file:e.file,type:e.type,label:e.label,index:g}},o.setCurrentQuality=function(e,t){return g!=e&&(e>-1&&v&&v.length>e?(
//that.pause();
o.setState(i.STATE_IDLE),OvenPlayerConsole.log("source changed : "+e),g=e,o.trigger(i.CONTENT_LEVEL_CHANGED,{currentQuality:e}),n.setQualityLabel(v[e].label),t&&y(l.getCurrentTime()||0),g):void 0)},o.stop=function(){OvenPlayerConsole.log("CORE : stop() "),l.stop()},o.destroy=function(){OvenPlayerConsole.log("CORE : destroy() player stop, listener, event destroied"),l.remove()},
//XXX : I hope using es6 classes. but I think to occur problem from Old IE. Then I choice function inherit. Finally using super function is so difficult.
// use : let super_destroy  = that.super('destroy'); ... super_destroy();
o.super=function(e){var t=o[e];return function(){return t.apply(o,arguments)}},o}}}]);
//# sourceMappingURL=ovenplayer.provider.RtmpProvider.js.map