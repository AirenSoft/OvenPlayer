/*! For license information please see ovenplayer.provider.RtmpProvider.js.LICENSE */
/*! OvenPlayerv0.7.4 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{
/***/13:
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i(n(77)),u=n(2),a=i(n(81));function i(e){return e&&e.__esModule?e:{default:e}}
/**
 * @brief   rtmp provider
 * @param   element video element.
 * @param   playerConfig    config.
 * */
/**
    * Created by hoho on 2018. 8. 23..
    */
t.default=function(e,t){var n=(0,r.default)(e,u.PROVIDER_RTMP),i=n.create(),o=(0,a.default)(u.PROVIDER_RTMP,i,t),l=o.super("destroy");return OvenPlayerConsole.log("RTMP PROVIDER LOADED."),o.destroy=function(){n.destroy(),OvenPlayerConsole.log("RTMP : PROVIDER DESTROYED."),l()},o}},
/***/28:
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});
/**
 * Created by hoho on 2018. 8. 24..
 */
t.getBrowser=function(){if(-1!=(navigator.userAgent.indexOf("Opera")||navigator.userAgent.indexOf("OPR")))return"opera";if(-1!=navigator.userAgent.indexOf("Chrome"))return"chrome";if(-1!=navigator.userAgent.indexOf("Safari"))return"safari";if(-1!=navigator.userAgent.indexOf("Firefox"))return"firefox";if(-1!=navigator.userAgent.indexOf("MSIE")){var e=avigator.userAgent.indexOf("MSIE");return 1==!!document.documentMode?"ie":navigator.userAgent.match(/Trident.*rv\:11\./)?isNaN(parseInt(ua.substring(e+5,ua.indexOf(".",e))))?"unknown":"ie":"unknown"}return"unknown"};
/***/},
/***/76:
/***/function(e,t,n){e.exports=n.p+"OvenPlayerFlash.swf";
/***/},
/***/77:
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(28),u=n(2),a=function(e){return e&&e.__esModule?e:{default:e}}(n(76));
/**
    * @brief   미디어 엘리먼트를 관리하는 객체. 현재는 하는 일이 많지 않다.
    * @param   {element}   container   dom element
    *
    * */
t.default=function(e,t){var n={},i=e.getAttribute("data-parent-id"),o="",l=(0,r.getBrowser)();OvenPlayerConsole.log("MediaManager loaded. browserType : "+l);return n.create=function(){return OvenPlayerConsole.log("MediaManager createElement()"),o&&n.destroy(),function(){if(t!==u.PROVIDER_RTMP)(o=document.createElement("video")).setAttribute("disableRemotePlayback",""),o.setAttribute("webkit-playsinline",""),o.setAttribute("playsinline",""),e.appendChild(o);else{var n=void 0,r=void 0,l=void 0,s=void 0,f=void 0;(n=document.createElement("param")).setAttribute("name","movie"),n.setAttribute("value",a.default),(r=document.createElement("param")).setAttribute("name","flashvars"),
//playerId uses SWF for ExternalInterface.call().
r.setAttribute("value","playerId="+i),(l=document.createElement("param")).setAttribute("name","allowscriptaccess"),l.setAttribute("value","always"),(s=document.createElement("param")).setAttribute("name","allowfullscreen"),s.setAttribute("value","true"),(f=document.createElement("param")).setAttribute("name","quality"),f.setAttribute("value","height"),(o=document.createElement("object")).setAttribute("type","application/x-shockwave-flash"),o.setAttribute("data",a.default),o.setAttribute("id",i+"-flash"),o.setAttribute("name",i+"-flash"),o.setAttribute("width","100%"),o.setAttribute("height","100%"),o.appendChild(n),o.appendChild(r),o.appendChild(l),o.appendChild(s),
/*if(browserType !== "ie"){
                mediaElement.appendChild(inner);
            }*/
e.appendChild(o)}return o}()},n.destroy=function(){OvenPlayerConsole.log("MediaManager removeElement()"),e.removeChild(o),o=null},n}},
/***/80:
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(2);
/**
    * Created by hoho on 2018. 8. 27..
    */
t.default=function(e,t){var n={isJSReady:function(){return!0},time:function(e){t.trigger(r.CONTENT_TIME,e),t.trigger(r.CONTENT_BUFFER,e)},volumeChanged:function(e){t.trigger(r.CONTENT_VOLUME,e)},stateChanged:function(e){t.setState(e.newstate),t.trigger(r.PLAYER_STATE,e)},metaChanged:function(e){t.trigger(r.CONTENT_META,e)},error:function(e){t.setState(r.STATE_ERROR),t.pause(),
//PRIVATE_STATE_ERROR
t.trigger(r.ERROR,e)}};return n}},
/***/81:
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=o(n(12)),u=o(n(80)),a=o(n(6)),i=n(2);function o(e){return e&&e.__esModule?e:{default:e}}
/**
 * @brief   Core For Flash Video.
 * @param   element flash object element
 * @param   playerConfig  player config
 * */
/**
 * Created by hoho on 2018. 8. 23..
 */t.default=function(e,t,n){OvenPlayerConsole.log("CORE loaded. ");var o={};(0,r.default)(o);var l=t,s=(0,u.default)(l,o),f=!1,c=!1,d=i.STATE_IDLE,g=-1,v=[],p=function(e){var t=Math.max(0,g);if(e)for(var r=0;r<e.length;r++)if(e[r].default&&(t=r),n.getQualityLabel()&&e[r].label===n.getQualityLabel())return r;return t},y=function(e){var t=v[g];OvenPlayerConsole.log("source loaded : ",t,"lastPlayPosition : "+e);var n=l.getCurrentSource();t.file!==n?l.load(t.file):0===e&&o.getPosition()>0&&o.seek(e),e>0&&(o.seek(e),o.play()),o.trigger(i.CONTENT_LEVELS,{currentQuality:g})};
//This is why. Flash does not self trig to ads,lmalm,
return o.triggerEventFromExternal=function(e,t){return s[e]?s[e](t):null},o.getName=function(){return e},o.canSeek=function(){return f},o.setCanSeek=function(e){f=e},o.isSeeking=function(){return c},o.setSeeking=function(e){c=e},o.setState=function(e){d=e},o.getState=function(){return d},o.setBuffer=function(e){},o.getBuffer=function(){return l.getBuffer()},o.getDuration=function(){return l.getDuration()},o.getPosition=function(){return l.getPosition()},o.setVolume=function(e){return l.setVolume(e)},o.getVolume=function(){return l.getVolume()},o.setMute=function(){l.setMute()},o.getMute=function(){return l.getMute()},o.preload=function(e,t){OvenPlayerConsole.log("CORE : preload() ",e,t);var n=0;return g=p(v=e),new a.default(function(e,r){!function u(){return n++,l.isFlashReady&&l.isFlashReady()?(y(t||0),e()):n<30?void setTimeout(u,100):r()}()})},o.load=function(e){g=p(v=e),y(e.starttime||0)},o.play=function(){l.play()},o.pause=function(){l.pause()},o.seek=function(e){l.seek(e)},o.setPlaybackRate=function(e){return 0},o.getPlaybackRate=function(){return 0},o.getQualityLevels=function(){return v.map(function(e,t){return{file:e.file,type:e.type,label:e.label,index:t}})},o.getCurrentQuality=function(){var e=v[g];return{file:e.file,type:e.type,label:e.label,index:g}},o.setCurrentQuality=function(e,t){return g!=e&&(e>-1&&v&&v.length>e?(
//that.pause();
o.setState(i.STATE_IDLE),OvenPlayerConsole.log("source changed : "+e),g=e,o.trigger(i.CONTENT_LEVEL_CHANGED,{currentQuality:e}),n.setQualityLabel(v[e].label),t&&y(l.getCurrentTime()||0),g):void 0)},o.stop=function(){OvenPlayerConsole.log("CORE : stop() "),l.stop()},o.destroy=function(){OvenPlayerConsole.log("CORE : destroy() player stop, listener, event destroied"),l.remove()},
//XXX : I hope using es6 classes. but I think to occur problem from Old IE. Then I choice function inherit. Finally using super function is so difficult.
// use : let super_destroy  = that.super('destroy'); ... super_destroy();
o.super=function(e){var t=o[e];return function(){return t.apply(o,arguments)}},o}}}]);
//# sourceMappingURL=ovenplayer.provider.RtmpProvider.js.map