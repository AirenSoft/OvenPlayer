/*! For license information please see ovenplayer.sdk.js.LICENSE */
/*! OvenPlayerv0.7.2 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
/******/!function(e){// webpackBootstrap
/******/ // install a JSONP callback for chunk loading
/******/function t(t){
/******/for(
/******/var n,o,u=t[0],i=t[1],a=0,c=[]
/******/;a<u.length;a++)
/******/o=u[a],
/******/r[o]&&
/******/c.push(r[o][0])
/******/,r[o]=0;
/******/for(n in i)
/******/Object.prototype.hasOwnProperty.call(i,n)&&(
/******/e[n]=i[n])
/******/;
/******/
/******/
/******/for(l&&l(t);c.length;)
/******/c.shift()();
/******/
/******/
/******/}
/******/
/******/
/******/ // The module cache
/******/var n={},r={
/******/5:0
/******/};
/******/
/******/ // object to store loaded and loading chunks
/******/ // undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ // Promise = chunk loading, 0 = chunk loaded
/******/
/******/
/******/ // The require function
/******/function o(t){
/******/
/******/ // Check if module is in cache
/******/if(n[t])
/******/return n[t].exports;
/******/
/******/ // Create a new module (and put it into the cache)
/******/var r=n[t]={
/******/i:t,
/******/l:!1,
/******/exports:{}
/******/};
/******/
/******/ // Execute the module function
/******/
/******/
/******/ // Return the exports of the module
/******/return e[t].call(r.exports,r,r.exports,o),
/******/
/******/ // Flag the module as loaded
/******/r.l=!0,r.exports;
/******/}
/******/
/******/ // This file contains only the entry chunk.
/******/ // The chunk loading function for additional chunks
/******/o.e=function(e){
/******/var t=[],n=r[e];
/******/
/******/
/******/ // JSONP chunk loading for javascript
/******/
/******/
/******/if(0!==n)// 0 means "already installed".
/******/
/******/ // a Promise means "currently loading".
/******/if(n)
/******/t.push(n[2]);
/******/else{
/******/ // setup Promise in chunk cache
/******/var u=new Promise(function(t,o){
/******/n=r[e]=[t,o];
/******/});
/******/t.push(n[2]=u);
/******/
/******/ // start chunk loading
/******/var i,a=document.getElementsByTagName("head")[0],l=document.createElement("script");
/******/
/******/
/******/l.charset="utf-8",
/******/l.timeout=120,
/******/o.nc&&
/******/l.setAttribute("nonce",o.nc)
/******/,l.src=
/******/
/******/
/******/
/******/ // script path function
/******/function(e){
/******/return o.p+""+({0:"ovenplayer.provider.RtmpProvider",1:"ovenplayer.provider.HlsProvider",2:"ovenplayer.provider.DashProvider",3:"ovenplayer.provider.WebRTCProvider",4:"ovenplayer.provider.Html5"}[e]||e)+".js"
/******/}(e),
/******/
/******/i=function(t){
/******/ // avoid mem leaks in IE.
/******/l.onerror=l.onload=null,
/******/clearTimeout(c);
/******/var n=r[e];
/******/if(0!==n){
/******/if(n){
/******/var o=t&&("load"===t.type?"missing":t.type),u=t&&t.target&&t.target.src,i=new Error("Loading chunk "+e+" failed.\n("+o+": "+u+")");
/******/
/******/i.type=o,
/******/i.request=u,
/******/n[1](i)}
/******/r[e]=void 0}
/******/};
/******/var c=setTimeout(function(){
/******/i({type:"timeout",target:l});
/******/},12e4);
/******/l.onerror=l.onload=i,
/******/a.appendChild(l)}
/******/
/******/return Promise.all(t);
/******/},
/******/
/******/ // expose the modules object (__webpack_modules__)
/******/o.m=e,
/******/
/******/ // expose the module cache
/******/o.c=n,
/******/
/******/ // define getter function for harmony exports
/******/o.d=function(e,t,n){
/******/o.o(e,t)||
/******/Object.defineProperty(e,t,{enumerable:!0,get:n})
/******/},
/******/
/******/ // define __esModule on exports
/******/o.r=function(e){
/******/"undefined"!=typeof Symbol&&Symbol.toStringTag&&
/******/Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})
/******/,Object.defineProperty(e,"__esModule",{value:!0})},
/******/
/******/ // create a fake namespace object
/******/ // mode & 1: value is a module id, require it
/******/ // mode & 2: merge all properties of value into the ns
/******/ // mode & 4: return value when already ns object
/******/ // mode & 8|1: behave like require
/******/o.t=function(e,t){
/******/if(
/******/1&t&&(e=o(e)),8&t)return e;
/******/if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;
/******/var n=Object.create(null);
/******/
/******/if(o.r(n),
/******/Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));
/******/return n;
/******/},
/******/
/******/ // getDefaultExport function for compatibility with non-harmony modules
/******/o.n=function(e){
/******/var t=e&&e.__esModule?
/******/function(){return e.default}:
/******/function(){return e};
/******/
/******/return o.d(t,"a",t),t;
/******/},
/******/
/******/ // Object.prototype.hasOwnProperty.call
/******/o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},
/******/
/******/ // __webpack_public_path__
/******/o.p="",
/******/
/******/ // on error function for async loading
/******/o.oe=function(e){throw console.error(e),e};
/******/
/******/var u=window.webpackJsonp=window.webpackJsonp||[],i=u.push.bind(u);
/******/
/******/u.push=t,
/******/u=u.slice();
/******/for(var a=0;a<u.length;a++)t(u[a]);
/******/var l=i;
/******/
/******/
/******/ // Load entry module and return exports
/******/o(o.s=27);
/******/}
/************************************************************************/
/******/([
/* 0 */
/***/function(e,t,n){"use strict";
/* WEBPACK VAR INJECTION */
/* WEBPACK VAR INJECTION */(function(e,r){var o,u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(){var i="object"==("undefined"==typeof self?"undefined":u(self))&&self.self===self&&self||"object"==(void 0===e?"undefined":u(e))&&e.global===e&&e||this||{},a=i._,l=Array.prototype,c=Object.prototype,f="undefined"!=typeof Symbol?Symbol.prototype:null,s=l.push,d=l.slice,p=c.toString,v=c.hasOwnProperty,y=Array.isArray,g=Object.keys,h=Object.create,m=function(){},P=function e(t){return t instanceof e?t:this instanceof e?void(this._wrapped=t):new e(t)};void 0===t||t.nodeType?i._=P:(void 0!==r&&!r.nodeType&&r.exports&&(t=r.exports=P),t._=P),P.VERSION="1.9.1";var b,_=function(e,t,n){if(void 0===t)return e;switch(null==n?3:n){case 1:return function(n){return e.call(t,n)};case 3:return function(n,r,o){return e.call(t,n,r,o)};case 4:return function(n,r,o,u){return e.call(t,n,r,o,u)}}return function(){return e.apply(t,arguments)}},O=function(e,t,n){return P.iteratee!==b?P.iteratee(e,t):null==e?P.identity:P.isFunction(e)?_(e,t,n):P.isObject(e)&&!P.isArray(e)?P.matcher(e):P.property(e)};P.iteratee=b=function(e,t){return O(e,t,1/0)};var E=function(e,t){return t=null==t?e.length-1:+t,function(){for(var n=Math.max(arguments.length-t,0),r=Array(n),o=0;o<n;o++)r[o]=arguments[o+t];switch(t){case 0:return e.call(this,r);case 1:return e.call(this,arguments[0],r);case 2:return e.call(this,arguments[0],arguments[1],r)}var u=Array(t+1);for(o=0;o<t;o++)u[o]=arguments[o];return u[t]=r,e.apply(this,u)}},C=function(e){if(!P.isObject(e))return{};if(h)return h(e);m.prototype=e;var t=new m;return m.prototype=null,t},R=function(e){return function(t){return null==t?void 0:t[e]}},A=function(e,t){return null!=e&&v.call(e,t)},w=function(e,t){for(var n=t.length,r=0;r<n;r++){if(null==e)return;e=e[t[r]]}return n?e:void 0},T=Math.pow(2,53)-1,S=R("length"),N=function(e){var t=S(e);return"number"==typeof t&&0<=t&&t<=T};P.each=P.forEach=function(e,t,n){var r,o;if(t=_(t,n),N(e))for(r=0,o=e.length;r<o;r++)t(e[r],r,e);else{var u=P.keys(e);for(r=0,o=u.length;r<o;r++)t(e[u[r]],u[r],e)}return e},P.map=P.collect=function(e,t,n){t=O(t,n);for(var r=!N(e)&&P.keys(e),o=(r||e).length,u=Array(o),i=0;i<o;i++){var a=r?r[i]:i;u[i]=t(e[a],a,e)}return u};var k=function(e){return function(t,n,r,o){var u=3<=arguments.length;return function(t,n,r,o){var u=!N(t)&&P.keys(t),i=(u||t).length,a=0<e?0:i-1;for(o||(r=t[u?u[a]:a],a+=e);0<=a&&a<i;a+=e){var l=u?u[a]:a;r=n(r,t[l],l,t)}return r}(t,_(n,o,4),r,u)}};P.reduce=P.foldl=P.inject=k(1),P.reduceRight=P.foldr=k(-1),P.find=P.detect=function(e,t,n){var r=(N(e)?P.findIndex:P.findKey)(e,t,n);if(void 0!==r&&-1!==r)return e[r]},P.filter=P.select=function(e,t,n){var r=[];return t=O(t,n),P.each(e,function(e,n,o){t(e,n,o)&&r.push(e)}),r},P.reject=function(e,t,n){return P.filter(e,P.negate(O(t)),n)},P.every=P.all=function(e,t,n){t=O(t,n);for(var r=!N(e)&&P.keys(e),o=(r||e).length,u=0;u<o;u++){var i=r?r[u]:u;if(!t(e[i],i,e))return!1}return!0},P.some=P.any=function(e,t,n){t=O(t,n);for(var r=!N(e)&&P.keys(e),o=(r||e).length,u=0;u<o;u++){var i=r?r[u]:u;if(t(e[i],i,e))return!0}return!1},P.contains=P.includes=P.include=function(e,t,n,r){return N(e)||(e=P.values(e)),("number"!=typeof n||r)&&(n=0),0<=P.indexOf(e,t,n)},P.invoke=E(function(e,t,n){var r,o;return P.isFunction(t)?o=t:P.isArray(t)&&(r=t.slice(0,-1),t=t[t.length-1]),P.map(e,function(e){var u=o;if(!u){if(r&&r.length&&(e=w(e,r)),null==e)return;u=e[t]}return null==u?u:u.apply(e,n)})}),P.pluck=function(e,t){return P.map(e,P.property(t))},P.where=function(e,t){return P.filter(e,P.matcher(t))},P.findWhere=function(e,t){return P.find(e,P.matcher(t))},P.max=function(e,t,n){var r,o,i=-1/0,a=-1/0;if(null==t||"number"==typeof t&&"object"!=u(e[0])&&null!=e)for(var l=0,c=(e=N(e)?e:P.values(e)).length;l<c;l++)null!=(r=e[l])&&i<r&&(i=r);else t=O(t,n),P.each(e,function(e,n,r){o=t(e,n,r),(a<o||o===-1/0&&i===-1/0)&&(i=e,a=o)});return i},P.min=function(e,t,n){var r,o,i=1/0,a=1/0;if(null==t||"number"==typeof t&&"object"!=u(e[0])&&null!=e)for(var l=0,c=(e=N(e)?e:P.values(e)).length;l<c;l++)null!=(r=e[l])&&r<i&&(i=r);else t=O(t,n),P.each(e,function(e,n,r){((o=t(e,n,r))<a||o===1/0&&i===1/0)&&(i=e,a=o)});return i},P.shuffle=function(e){return P.sample(e,1/0)},P.sample=function(e,t,n){if(null==t||n)return N(e)||(e=P.values(e)),e[P.random(e.length-1)];var r=N(e)?P.clone(e):P.values(e),o=S(r);t=Math.max(Math.min(t,o),0);for(var u=o-1,i=0;i<t;i++){var a=P.random(i,u),l=r[i];r[i]=r[a],r[a]=l}return r.slice(0,t)},P.sortBy=function(e,t,n){var r=0;return t=O(t,n),P.pluck(P.map(e,function(e,n,o){return{value:e,index:r++,criteria:t(e,n,o)}}).sort(function(e,t){var n=e.criteria,r=t.criteria;if(n!==r){if(r<n||void 0===n)return 1;if(n<r||void 0===r)return-1}return e.index-t.index}),"value")};var x=function(e,t){return function(n,r,o){var u=t?[[],[]]:{};return r=O(r,o),P.each(n,function(t,o){var i=r(t,o,n);e(u,t,i)}),u}};P.groupBy=x(function(e,t,n){A(e,n)?e[n].push(t):e[n]=[t]}),P.indexBy=x(function(e,t,n){e[n]=t}),P.countBy=x(function(e,t,n){A(e,n)?e[n]++:e[n]=1});var j=/[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;P.toArray=function(e){return e?P.isArray(e)?d.call(e):P.isString(e)?e.match(j):N(e)?P.map(e,P.identity):P.values(e):[]},P.size=function(e){return null==e?0:N(e)?e.length:P.keys(e).length},P.partition=x(function(e,t,n){e[n?0:1].push(t)},!0),P.first=P.head=P.take=function(e,t,n){return null==e||e.length<1?null==t?void 0:[]:null==t||n?e[0]:P.initial(e,e.length-t)},P.initial=function(e,t,n){return d.call(e,0,Math.max(0,e.length-(null==t||n?1:t)))},P.last=function(e,t,n){return null==e||e.length<1?null==t?void 0:[]:null==t||n?e[e.length-1]:P.rest(e,Math.max(0,e.length-t))},P.rest=P.tail=P.drop=function(e,t,n){return d.call(e,null==t||n?1:t)},P.compact=function(e){return P.filter(e,Boolean)};var L=function e(t,n,r,o){for(var u=(o=o||[]).length,i=0,a=S(t);i<a;i++){var l=t[i];if(N(l)&&(P.isArray(l)||P.isArguments(l)))if(n)for(var c=0,f=l.length;c<f;)o[u++]=l[c++];else e(l,n,r,o),u=o.length;else r||(o[u++]=l)}return o};P.flatten=function(e,t){return L(e,t,!1)},P.without=E(function(e,t){return P.difference(e,t)}),P.uniq=P.unique=function(e,t,n,r){P.isBoolean(t)||(r=n,n=t,t=!1),null!=n&&(n=O(n,r));for(var o=[],u=[],i=0,a=S(e);i<a;i++){var l=e[i],c=n?n(l,i,e):l;t&&!n?(i&&u===c||o.push(l),u=c):n?P.contains(u,c)||(u.push(c),o.push(l)):P.contains(o,l)||o.push(l)}return o},P.union=E(function(e){return P.uniq(L(e,!0,!0))}),P.intersection=function(e){for(var t=[],n=arguments.length,r=0,o=S(e);r<o;r++){var u=e[r];if(!P.contains(t,u)){var i;for(i=1;i<n&&P.contains(arguments[i],u);i++);i===n&&t.push(u)}}return t},P.difference=E(function(e,t){return t=L(t,!0,!0),P.filter(e,function(e){return!P.contains(t,e)})}),P.zip=E(P.unzip=function(e){for(var t=e&&P.max(e,S).length||0,n=Array(t),r=0;r<t;r++)n[r]=P.pluck(e,r);return n}),P.object=function(e,t){for(var n={},r=0,o=S(e);r<o;r++)t?n[e[r]]=t[r]:n[e[r][0]]=e[r][1];return n};var M=function(e){return function(t,n,r){n=O(n,r);for(var o=S(t),u=0<e?0:o-1;0<=u&&u<o;u+=e)if(n(t[u],u,t))return u;return-1}};P.findIndex=M(1),P.findLastIndex=M(-1);var I=function(e,t,n){return function(r,o,u){var i=0,a=S(r);if("number"==typeof u)0<e?i=0<=u?u:Math.max(u+a,i):a=0<=u?Math.min(u+1,a):u+a+1;else if(n&&u&&a)return r[u=n(r,o)]===o?u:-1;if(o!=o)return 0<=(u=t(d.call(r,i,a),P.isNaN))?u+i:-1;for(u=0<e?i:a-1;0<=u&&u<a;u+=e)if(r[u]===o)return u;return-1}};P.indexOf=I(1,P.findIndex,P.sortedIndex=function(e,t,n,r){for(var o=(n=O(n,r,1))(t),u=0,i=S(e);u<i;){var a=Math.floor((u+i)/2);n(e[a])<o?u=a+1:i=a}return u}),P.lastIndexOf=I(-1,P.findLastIndex),P.range=function(e,t,n){null==t&&(t=e||0,e=0),n||(n=t<e?-1:1);for(var r=Math.max(Math.ceil((t-e)/n),0),o=Array(r),u=0;u<r;u++,e+=n)o[u]=e;return o},P.chunk=function(e,t){if(null==t||t<1)return[];for(var n=[],r=0,o=e.length;r<o;)n.push(d.call(e,r,r+=t));return n};var B=function(e,t,n,r,o){if(!(r instanceof t))return e.apply(n,o);var u=C(e.prototype),i=e.apply(u,o);return P.isObject(i)?i:u};P.bind=E(function(e,t,n){if(!P.isFunction(e))throw new TypeError("Bind must be called on a function");var r=E(function(o){return B(e,r,t,this,n.concat(o))});return r}),((P.partial=E(function(e,t){var n=P.partial.placeholder;return function r(){for(var o=0,u=t.length,i=Array(u),a=0;a<u;a++)i[a]=t[a]===n?arguments[o++]:t[a];for(;o<arguments.length;)i.push(arguments[o++]);return B(e,r,this,this,i)}})).placeholder=P).bindAll=E(function(e,t){var n=(t=L(t,!1,!1)).length;if(n<1)throw new Error("bindAll must be passed function names");for(;n--;){var r=t[n];e[r]=P.bind(e[r],e)}}),P.memoize=function(e,t){var n=function n(r){var o=n.cache,u=""+(t?t.apply(this,arguments):r);return A(o,u)||(o[u]=e.apply(this,arguments)),o[u]};return n.cache={},n},P.delay=E(function(e,t,n){return setTimeout(function(){return e.apply(null,n)},t)}),P.defer=P.partial(P.delay,P,1),P.throttle=function(e,t,n){var r,o,u,i,a=0;n||(n={});var l=function(){a=!1===n.leading?0:P.now(),r=null,i=e.apply(o,u),r||(o=u=null)},c=function(){var c=P.now();a||!1!==n.leading||(a=c);var f=t-(c-a);return o=this,u=arguments,f<=0||t<f?(r&&(clearTimeout(r),r=null),a=c,i=e.apply(o,u),r||(o=u=null)):r||!1===n.trailing||(r=setTimeout(l,f)),i};return c.cancel=function(){clearTimeout(r),a=0,r=o=u=null},c},P.debounce=function(e,t,n){var r,o,u=function(t,n){r=null,n&&(o=e.apply(t,n))},i=E(function(i){if(r&&clearTimeout(r),n){var a=!r;r=setTimeout(u,t),a&&(o=e.apply(this,i))}else r=P.delay(u,t,this,i);return o});return i.cancel=function(){clearTimeout(r),r=null},i},P.wrap=function(e,t){return P.partial(t,e)},P.negate=function(e){return function(){return!e.apply(this,arguments)}},P.compose=function(){var e=arguments,t=e.length-1;return function(){for(var n=t,r=e[t].apply(this,arguments);n--;)r=e[n].call(this,r);return r}},P.after=function(e,t){return function(){if(--e<1)return t.apply(this,arguments)}},P.once=P.partial(P.before=function(e,t){var n;return function(){return 0<--e&&(n=t.apply(this,arguments)),e<=1&&(t=null),n}},2),P.restArguments=E;var D=!{toString:null}.propertyIsEnumerable("toString"),F=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"],W=function(e,t){var n=F.length,r=e.constructor,o=P.isFunction(r)&&r.prototype||c,u="constructor";for(A(e,u)&&!P.contains(t,u)&&t.push(u);n--;)(u=F[n])in e&&e[u]!==o[u]&&!P.contains(t,u)&&t.push(u)};P.keys=function(e){if(!P.isObject(e))return[];if(g)return g(e);var t=[];for(var n in e)A(e,n)&&t.push(n);return D&&W(e,t),t},P.allKeys=function(e){if(!P.isObject(e))return[];var t=[];for(var n in e)t.push(n);return D&&W(e,t),t},P.values=function(e){for(var t=P.keys(e),n=t.length,r=Array(n),o=0;o<n;o++)r[o]=e[t[o]];return r},P.mapObject=function(e,t,n){t=O(t,n);for(var r=P.keys(e),o=r.length,u={},i=0;i<o;i++){var a=r[i];u[a]=t(e[a],a,e)}return u},P.pairs=function(e){for(var t=P.keys(e),n=t.length,r=Array(n),o=0;o<n;o++)r[o]=[t[o],e[t[o]]];return r},P.invert=function(e){for(var t={},n=P.keys(e),r=0,o=n.length;r<o;r++)t[e[n[r]]]=n[r];return t},P.functions=P.methods=function(e){var t=[];for(var n in e)P.isFunction(e[n])&&t.push(n);return t.sort()};var Q=function(e,t){return function(n){var r=arguments.length;if(t&&(n=Object(n)),r<2||null==n)return n;for(var o=1;o<r;o++)for(var u=arguments[o],i=e(u),a=i.length,l=0;l<a;l++){var c=i[l];t&&void 0!==n[c]||(n[c]=u[c])}return n}};P.extend=Q(P.allKeys),P.extendOwn=P.assign=Q(P.keys),P.findKey=function(e,t,n){t=O(t,n);for(var r,o=P.keys(e),u=0,i=o.length;u<i;u++)if(t(e[r=o[u]],r,e))return r};var Y,K,U=function(e,t,n){return t in n};P.pick=E(function(e,t){var n={},r=t[0];if(null==e)return n;P.isFunction(r)?(1<t.length&&(r=_(r,t[1])),t=P.allKeys(e)):(r=U,t=L(t,!1,!1),e=Object(e));for(var o=0,u=t.length;o<u;o++){var i=t[o],a=e[i];r(a,i,e)&&(n[i]=a)}return n}),P.omit=E(function(e,t){var n,r=t[0];return P.isFunction(r)?(r=P.negate(r),1<t.length&&(n=t[1])):(t=P.map(L(t,!1,!1),String),r=function(e,n){return!P.contains(t,n)}),P.pick(e,r,n)}),P.defaults=Q(P.allKeys,!0),P.create=function(e,t){var n=C(e);return t&&P.extendOwn(n,t),n},P.clone=function(e){return P.isObject(e)?P.isArray(e)?e.slice():P.extend({},e):e},P.tap=function(e,t){return t(e),e},P.isMatch=function(e,t){var n=P.keys(t),r=n.length;if(null==e)return!r;for(var o=Object(e),u=0;u<r;u++){var i=n[u];if(t[i]!==o[i]||!(i in o))return!1}return!0},Y=function(e,t,n,r){if(e===t)return 0!==e||1/e==1/t;if(null==e||null==t)return!1;if(e!=e)return t!=t;var o=void 0===e?"undefined":u(e);return("function"===o||"object"===o||"object"==(void 0===t?"undefined":u(t)))&&K(e,t,n,r)},K=function(e,t,n,r){e instanceof P&&(e=e._wrapped),t instanceof P&&(t=t._wrapped);var o=p.call(e);if(o!==p.call(t))return!1;switch(o){case"[object RegExp]":case"[object String]":return""+e==""+t;case"[object Number]":return+e!=+e?+t!=+t:0==+e?1/+e==1/t:+e==+t;case"[object Date]":case"[object Boolean]":return+e==+t;case"[object Symbol]":return f.valueOf.call(e)===f.valueOf.call(t)}var i="[object Array]"===o;if(!i){if("object"!=(void 0===e?"undefined":u(e))||"object"!=(void 0===t?"undefined":u(t)))return!1;var a=e.constructor,l=t.constructor;if(a!==l&&!(P.isFunction(a)&&a instanceof a&&P.isFunction(l)&&l instanceof l)&&"constructor"in e&&"constructor"in t)return!1}r=r||[];for(var c=(n=n||[]).length;c--;)if(n[c]===e)return r[c]===t;if(n.push(e),r.push(t),i){if((c=e.length)!==t.length)return!1;for(;c--;)if(!Y(e[c],t[c],n,r))return!1}else{var s,d=P.keys(e);if(c=d.length,P.keys(t).length!==c)return!1;for(;c--;)if(s=d[c],!A(t,s)||!Y(e[s],t[s],n,r))return!1}return n.pop(),r.pop(),!0},P.isEqual=function(e,t){return Y(e,t)},P.isEmpty=function(e){return null==e||(N(e)&&(P.isArray(e)||P.isString(e)||P.isArguments(e))?0===e.length:0===P.keys(e).length)},P.isElement=function(e){return!(!e||1!==e.nodeType)},P.isArray=y||function(e){return"[object Array]"===p.call(e)},P.isObject=function(e){var t=void 0===e?"undefined":u(e);return"function"===t||"object"===t&&!!e},P.each(["Arguments","Function","String","Number","Date","RegExp","Error","Symbol","Map","WeakMap","Set","WeakSet"],function(e){P["is"+e]=function(t){return p.call(t)==="[object "+e+"]"}}),P.isArguments(arguments)||(P.isArguments=function(e){return A(e,"callee")});var V=i.document&&i.document.childNodes;"function"!=typeof/./&&"object"!=("undefined"==typeof Int8Array?"undefined":u(Int8Array))&&"function"!=typeof V&&(P.isFunction=function(e){return"function"==typeof e||!1}),P.isFinite=function(e){return!P.isSymbol(e)&&isFinite(e)&&!isNaN(parseFloat(e))},P.isNaN=function(e){return P.isNumber(e)&&isNaN(e)},P.isBoolean=function(e){return!0===e||!1===e||"[object Boolean]"===p.call(e)},P.isNull=function(e){return null===e},P.isUndefined=function(e){return void 0===e},P.has=function(e,t){if(!P.isArray(t))return A(e,t);for(var n=t.length,r=0;r<n;r++){var o=t[r];if(null==e||!v.call(e,o))return!1;e=e[o]}return!!n},P.noConflict=function(){return i._=a,this},P.identity=function(e){return e},P.constant=function(e){return function(){return e}},P.noop=function(){},P.property=function(e){return P.isArray(e)?function(t){return w(t,e)}:R(e)},P.propertyOf=function(e){return null==e?function(){}:function(t){return P.isArray(t)?w(e,t):e[t]}},P.matcher=P.matches=function(e){return e=P.extendOwn({},e),function(t){return P.isMatch(t,e)}},P.times=function(e,t,n){var r=Array(Math.max(0,e));t=_(t,n,1);for(var o=0;o<e;o++)r[o]=t(o);return r},P.random=function(e,t){return null==t&&(t=e,e=0),e+Math.floor(Math.random()*(t-e+1))},P.now=Date.now||function(){return(new Date).getTime()};var z={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},H=P.invert(z),q=function(e){var t=function(t){return e[t]},n="(?:"+P.keys(e).join("|")+")",r=RegExp(n),o=RegExp(n,"g");return function(e){return e=null==e?"":""+e,r.test(e)?e.replace(o,t):e}};P.escape=q(z),P.unescape=q(H),P.result=function(e,t,n){P.isArray(t)||(t=[t]);var r=t.length;if(!r)return P.isFunction(n)?n.call(e):n;for(var o=0;o<r;o++){var u=null==e?void 0:e[t[o]];void 0===u&&(u=n,o=r),e=P.isFunction(u)?u.call(e):u}return e};var G=0;P.uniqueId=function(e){var t=++G+"";return e?e+t:t},P.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var $=/(.)^/,J={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},X=/\\|'|\r|\n|\u2028|\u2029/g,Z=function(e){return"\\"+J[e]};P.template=function(e,t,n){!t&&n&&(t=n),t=P.defaults({},t,P.templateSettings);var r,o=RegExp([(t.escape||$).source,(t.interpolate||$).source,(t.evaluate||$).source].join("|")+"|$","g"),u=0,i="__p+='";e.replace(o,function(t,n,r,o,a){return i+=e.slice(u,a).replace(X,Z),u=a+t.length,n?i+="'+\n((__t=("+n+"))==null?'':_.escape(__t))+\n'":r?i+="'+\n((__t=("+r+"))==null?'':__t)+\n'":o&&(i+="';\n"+o+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{r=new Function(t.variable||"obj","_",i)}catch(t){throw t.source=i,t}var a=function(e){return r.call(this,e,P)},l=t.variable||"obj";return a.source="function("+l+"){\n"+i+"}",a},P.chain=function(e){var t=P(e);return t._chain=!0,t};var ee=function(e,t){return e._chain?P(t).chain():t};P.mixin=function(e){return P.each(P.functions(e),function(t){var n=P[t]=e[t];P.prototype[t]=function(){var e=[this._wrapped];return s.apply(e,arguments),ee(this,n.apply(P,e))}}),P},P.mixin(P),P.each(["pop","push","reverse","shift","sort","splice","unshift"],function(e){var t=l[e];P.prototype[e]=function(){var n=this._wrapped;return t.apply(n,arguments),"shift"!==e&&"splice"!==e||0!==n.length||delete n[0],ee(this,n)}}),P.each(["concat","join","slice"],function(e){var t=l[e];P.prototype[e]=function(){return ee(this,t.apply(this._wrapped,arguments))}}),P.prototype.value=function(){return this._wrapped},P.prototype.valueOf=P.prototype.toJSON=P.prototype.value,P.prototype.toString=function(){return String(this._wrapped)},n(23)&&(void 0===(o=function(){return P}.apply(t,[]))||(r.exports=o))}()}).call(this,n(18),n(24)(e))
/***/},
/* 1 */
/* 2 */
/***/,
/* 2 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});
// STATE
t.STATE_BUFFERING="buffering",t.STATE_IDLE="idle";var r=t.STATE_COMPLETE="complete";t.STATE_PAUSED="paused",t.STATE_PLAYING="playing",t.STATE_ERROR="error",t.STATE_LOADING="loading",t.STATE_STALLED="stalled",t.PROVIDER_HTML5="html5",t.PROVIDER_WEBRTC="webrtc",t.PROVIDER_DASH="dash",t.PROVIDER_HLS="hls",t.PROVIDER_RTMP="rtmp",t.CONTENT_COMPLETE=r,t.READY="ready",t.DESTROY="destroy",t.CONTENT_SEEK="seek",t.CONTENT_BUFFER_FULL="bufferFull",t.DISPLAY_CLICK="displayClick",t.CONTENT_LOADED="loaded",t.CONTENT_SEEKED="seeked",t.NETWORK_UNSTABLED="unstableNetwork",t.ERROR="error",t.PLAYER_STATE="stateChanged",t.PLAYER_COMPLETE=r,t.PLAYER_PAUSE="pause",t.PLAYER_PLAY="play",t.CONTENT_BUFFER="bufferChanged",t.CONTENT_TIME="time",t.CONTENT_RATE_CHANGE="ratechange",t.CONTENT_VOLUME="volumeChanged",t.CONTENT_MUTE="mute",t.CONTENT_META="metaChanged",t.CONTENT_LEVELS="qualityLevelChanged",t.CONTENT_LEVEL_CHANGED="currentQualityLevelChanged",t.PLAYBACK_RATE_CHANGED="playbackRateChanged",t.CONTENT_CAPTION_CUE_CHANGED="cueChanged",t.CONTENT_CAPTION_CHANGED="captionChanged",t.INIT_ERROR=100,t.PLAYER_UNKNWON_ERROR=300,t.PLAYER_UNKNWON_OPERATION_ERROR=301,t.PLAYER_UNKNWON_NEWWORK_ERROR=302,t.PLAYER_UNKNWON_DECODE_ERROR=303,t.PLAYER_FILE_ERROR=304,t.PLAYER_CAPTION_ERROR=305,t.PLAYER_WEBRTC_WS_ERROR=501,t.PLAYER_WEBRTC_WS_CLOSED=502,t.PLAYER_WEBRTC_ADD_ICECANDIDATE_ERROR=503,t.PLAYER_WEBRTC_SET_REMOTE_DESC_ERROR=504,t.PLAYER_WEBRTC_CREATE_ANSWER_ERROR=505,t.PLAYER_WEBRTC_SET_LOCAL_DESC_ERROR=506,t.PLAYER_WEBRTC_NETWORK_SLOW=510},
/* 3 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){return e&&e.__esModule?e:{default:e}}
/**
 * @brief   It was replace jquery's selector. It Often used by OvenTemplate. (/view/engine/OvenTemplate.js)
 * @param   selectorOrElement  string or element
 *
 * */(n(0));
/**
    * Created by hoho on 2018. 7. 23..
    */
t.default=function e(t){var n={},o=function(e,t){var n=e.querySelectorAll(t);return n.length>1?n:n[0]},u="";return(u=r.default.every(t,function(e){return r.default.isElement(e)})?t:"document"===t?document:"window"===t?window:o(document,t))?(n.find=function(t){return e(o(u,t))},n.css=function(e,t){u.length>0?u.forEach(function(n){n.style[e]=t}):u.style[e]=t},n.addClass=function(e){u.classList?u.classList.add(e):-1===u.className.split(" ").indexOf(e)&&(u.className+=" "+e)},n.removeClass=function(e){u.classList?u.classList.remove(e):u.className=u.className.replace(new RegExp("(^|\\b)"+e.split(" ").join("|")+"(\\b|$)","gi")," ")},n.show=function(){u.style.display="block"},n.hide=function(){u.style.display="none"},n.append=function(e){u.innerHTML+=e},n.text=function(e){
//IE8+
if(!e)return u.textContent;u.textContent=e},n.hasClass=function(e){
//IE8+
return u.classList?u.classList.contains(e):new RegExp("(^| )"+e+"( |$)","gi").test(u.name)},n.is=function(e){return u===e},n.offset=function(){
//IE8+
var e=u.getBoundingClientRect();return{top:e.top+document.body.scrollTop,left:e.left+document.body.scrollLeft}},n.width=function(){
//IE8+
return u.clientWidth},n.height=function(){
//IE8+
return u.clientHeight},n.attr=function(e){return u.getAttribute(e)},n.remove=function(){
//IE8+
u.parentNode.removeChild(u)},n.replace=function(e){u.replaceWith(e)},n.append=function(e){u.appendChild(e)},n.remove=function(){u.remove()},n.get=function(){return u},n.closest=function(e){return u.closest(e)},n):null}},
/* 4 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isDash=t.isWebRTC=t.isRtmp=void 0;var r=n(5);t.isRtmp=function(e,t){return 0==e.indexOf("rtmp:")||"rtmp"==t},t.isWebRTC=function(e,t){return!!e&&(0===e.indexOf("ws:")||0===e.indexOf("wss:")||"webrtc"===t)},t.isDash=function(e,t){return"mpd"===t||"dash"===t||"application/dash+xml"===t||"mpd"==(0,r.extractExtension)(e)}},
/* 5 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.extractExtension=void 0,t.trim=function(e){return e.replace(/^\s+|\s+$/g,"")}
/**
 * extractExtension
 *
 * @param      {string} path for url
 * @return     {string}  Extension
 */,t.naturalHms=
/**
 * naturalHms
 *
 * @param      {number | string}  second  The second
 * @return     {string}  formatted String
 */
function(e){var t=parseInt(e,10),n=Math.floor(t/3600),r=Math.floor((t-3600*n)/60),o=t-3600*n-60*r;n>0&&(r="0"+r);o<10&&(o="0"+o);return n>0?n+":"+r+":"+o:r+":"+o}
/***/;!function(e){e&&e.__esModule}(n(0));t.extractExtension=function(e){if(!e||"rtmp"==e.substr(0,4))return"";var t=function(e){var t="";return/[(,]format=mpd-/i.test(e)?t="mpd":/[(,]format=m3u8-/i.test(e)&&(t="m3u8"),t}(e);return t||((e=e.split("?")[0].split("#")[0]).lastIndexOf(".")>-1?e.substr(e.lastIndexOf(".")+1,e.length).toLowerCase():"")}},
/* 6 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=(window.setTimeout,window.setImmediate);
//      Promise Polyfill
//      https://github.com/taylorhakes/promise-polyfill
//      Copyright (c) 2014 Taylor Hakes
//      Copyright (c) 2014 Forbes Lindesay
//      taylorhakes/promise-polyfill is licensed under the MIT License
function u(){}
// Polyfill for Function.prototype.bind
var i=function(e){if(!(this instanceof d))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],s(e,this)},a=function(e,t){for(;3===e._state;)e=e._value;0!==e._state?(e._handled=!0,d._immediateFn(function(){var n=1===e._state?t.onFulfilled:t.onRejected;if(null!==n){var r;try{r=n(e._value)}catch(e){return void c(t.promise,e)}l(t.promise,r)}else(1===e._state?l:c)(t.promise,e._value)})):e._deferreds.push(t)},l=function(e,t){try{
// Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"===(void 0===t?"undefined":r(t))||"function"==typeof t)){var n=t.then;if(t instanceof d)return e._state=3,e._value=t,void f(e);if("function"==typeof n)return void s(function(e,t){return function(){e.apply(t,arguments)}}(n,t),e)}e._state=1,e._value=t,f(e)}catch(t){c(e,t)}},c=function(e,t){e._state=2,e._value=t,f(e)},f=function(e){2===e._state&&0===e._deferreds.length&&d._immediateFn(function(){e._handled||d._unhandledRejectionFn(e._value)});for(var t=0,n=e._deferreds.length;t<n;t++)a(e,e._deferreds[t]);e._deferreds=null},s=function(e,t){var n=!1;try{e(function(e){n||(n=!0,l(t,e))},function(e){n||(n=!0,c(t,e))})}catch(e){if(n)return;n=!0,c(t,e)}};i.prototype.catch=function(e){return this.then(null,e)},i.prototype.then=function(e,t){var n=new this.constructor(u);return a(this,new function(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}(e,t,n)),n},i.prototype.finally=function(e){var t=this.constructor;return this.then(function(n){return t.resolve(e()).then(function(){return n})},function(n){return t.resolve(e()).then(function(){return t.reject(n)})})},i.all=function(e){return new d(function(t,n){if(!e||void 0===e.length)throw new TypeError("Promise.all accepts an array");var o=Array.prototype.slice.call(e);if(0===o.length)return t([]);var u=o.length;function i(e,a){try{if(a&&("object"===(void 0===a?"undefined":r(a))||"function"==typeof a)){var l=a.then;if("function"==typeof l)return void l.call(a,function(t){i(e,t)},n)}o[e]=a,0==--u&&t(o)}catch(e){n(e)}}for(var a=0;a<o.length;a++)i(a,o[a])})},i.resolve=function(e){return e&&"object"===(void 0===e?"undefined":r(e))&&e.constructor===d?e:new d(function(t){t(e)})},i.reject=function(e){return new d(function(t,n){n(e)})},i.race=function(e){return new d(function(t,n){for(var r=0,o=e.length;r<o;r++)e[r].then(t,n)})},
// Use polyfill for setImmediate for performance gains
i._immediateFn="function"==typeof o&&function(e){o(e)}||function(e){o(e,0)},i._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)};var d=window.Promise||(window.Promise=i);t.resolved=d.resolve();t.default=d},
/* 7 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});
/**
 * Created by hoho on 2018. 8. 24..
 */
t.ApiRtmpExpansion=function(e){return{externalCallbackCreep:function(t){return t.name&&t.data?e.triggerEventFromExternal(t.name,t.data):null}}};
/***/},
/* 8 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(4);
/**
 * @brief   This finds the provider that matches the input source.
 * @param
 * */t.default=function(){var e={};OvenPlayerConsole.log("SupportChecker loaded.");var t=[{name:"html5",checkSupport:function(e){var t=document.createElement("video");if(!t.canPlayType)return!1;var n=e.file,o=e.type;if(!o)return!1;var u=e.mimeType||{aac:"audio/mp4",mp4:"video/mp4",f4v:"video/mp4",m4v:"video/mp4",mov:"video/mp4",mp3:"audio/mpeg",mpeg:"audio/mpeg",ogv:"video/ogg",ogg:"video/ogg",oga:"video/ogg",vorbis:"video/ogg",webm:"video/webm",f4a:"video/aac",m3u8:"application/vnd.apple.mpegurl",m3u:"application/vnd.apple.mpegurl",hls:"application/vnd.apple.mpegurl"}[o];return!((0,r.isRtmp)(n,o)||(0,r.isWebRTC)(n,o)||!u||!t.canPlayType(u))}},{name:"webrtc",checkSupport:function(e){if(!document.createElement("video").canPlayType)return!1;var t=e.file,n=e.type;return!!(0,r.isWebRTC)(t,n)}},{name:"dash",checkSupport:function(e){var t=e.file,n=e.type;
//mpd application/dash+xml
return!!(0,r.isDash)(t,n)}},{name:"hls",checkSupport:function(e){var t=document.createElement("video");
//this method from hls.js
//Remove this '!!video.canPlayType('application/vnd.apple.mpegurl')' if you want to use hlsjs.
return function(){var e=function(){if("undefined"!=typeof window)return window.MediaSource||window.WebKitMediaSource}(),t=window.SourceBuffer||window.WebKitSourceBuffer,n=e&&"function"==typeof e.isTypeSupported&&e.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"'),r=!t||t.prototype&&"function"==typeof t.prototype.appendBuffer&&"function"==typeof t.prototype.remove;return!!n&&!!r}()&&!!t.canPlayType("application/vnd.apple.mpegurl")}},{name:"rtmp",checkSupport:function(e){var t=e.file,n=e.type;return!!(0,r.isRtmp)(t,n)}}];return e.findProviderNameBySource=function(e){OvenPlayerConsole.log("SupportChecker : findProviderNameBySource()",e);for(var n=e===Object(e)?e:{},r=0;r<t.length;r++)if(t[r].checkSupport(n))return t[r].name},e.findProviderNamesByPlaylist=function(t){OvenPlayerConsole.log("SupportChecker : findProviderNamesByPlaylist()",t);for(var n=[],r=t.length;r--;)for(var o=t[r],u="",i=0;i<o.sources.length;i++)if(u=o.sources[i]){var a=e.findProviderNameBySource(u);a&&n.push(a)}return n},e}},
/* 9 */
/* 10 */
/***/,
/* 10 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});
/**
 * utils for webpack
 */
t.getScriptPath=function(e){for(var t=document.getElementsByTagName("script"),n=0;n<t.length;n++){var r=t[n].src;if(r){var o=r.lastIndexOf("/"+e);if(o>=0)return r.substr(0,o+1)}}return""};
/***/},
/* 11 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});
/**
 * Created by hoho on 2018. 6. 29..
 */
t.version="0.7.2-rev.25b0f51";
/***/},
/* 12 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){var t=e,n=[],r=function(e,t,n){var r=0,o=e.length;for(r=0;r<o;r++){var u=e[r];u.listener.apply(u.context||n,t)}};return t.on=function(e,r,o){return(n[e]||(n[e]=[])).push({listener:r,context:o}),t},t.trigger=function(e){if(!n)return!1;var o=[].slice.call(arguments,1),u=n[e],i=n.all;u&&r(u,o,t),i&&r(i,arguments,t)},t.off=function(e,r,o){if(!n)return!1;if(!e&&!r&&!o)return n=[],t;for(var u=e?[e]:Object.keys(n),i=0,a=u.length;i<a;i++){e=u[i];var l=n[e];if(l){var c=n[e]=[];if(r||o)for(var f=0,s=l.length;f<s;f++){var d=l[f];(r&&r!==d.listener&&r!==d.listener.listener&&r!==d.listener._callback||o&&o!==d.context)&&c.push(d)}c.length||delete n[e]}}return t},t.once=function(e,n,r){var o=0,u=function r(){o++||(t.off(e,r),n.apply(t,arguments))};return u._listener=n,t.on(e,u,r)},t}},
/* 13 */
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/***/,
/* 18 */
/***/function(e,t){var n;
// This works in non-strict mode
n=function(){return this}();try{
// This works if eval is allowed (see CSP)
n=n||Function("return this")()||(0,eval)("this")}catch(e){
// This works if the window reference is available
"object"==typeof window&&(n=window)}
// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}
e.exports=n},
/* 19 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=u(n(8)),o=u(n(6));n(7);function u(e){return e&&e.__esModule?e:{default:e}}
/**
 * @brief   This manages provider.
 * @param
 * */t.default=function(){var e=(0,r.default)(),t={},u={};OvenPlayerConsole.log("ProviderController loaded.");var i=function(e,n){t[e]||(OvenPlayerConsole.log("ProviderController _registerProvider() ",e),t[e]=n)},a={html5:function(){return n.e(/* require.ensure | ovenplayer.provider.Html5 */4).then(function(e){var t=n(17).default;return i("html5",t),t}.bind(null,n)).catch(function(e){throw new Error("Network error")})},webrtc:function(){return n.e(/* require.ensure | ovenplayer.provider.WebRTCProvider */3).then(function(e){var t=n(16).default;return i("webrtc",t),t}.bind(null,n)).catch(function(e){throw new Error("Network error")})},dash:function(){return n.e(/* require.ensure | ovenplayer.provider.DashProvider */2).then(function(e){var t=n(15).default;return i("dash",t),t}.bind(null,n)).catch(function(e){throw new Error("Network error")})},hls:function(){return n.e(/* require.ensure | ovenplayer.provider.HlsProvider */1).then(function(e){var t=n(14).default;return i("hls",t),t}.bind(null,n)).catch(function(e){throw new Error("Network error")})},rtmp:function(){return n.e(/* require.ensure | ovenplayer.provider.RtmpProvider */0).then(function(e){var t=n(13).default;return i("rtmp",t),t}.bind(null,n)).catch(function(e){throw new Error("Network error")})}};return u.loadProviders=function(t){var n=e.findProviderNamesByPlaylist(t);return OvenPlayerConsole.log("ProviderController loadProviders() ",n),o.default.all(n.filter(function(e){return!!a[e]}).map(function(e){return a[e]()}))},u.findByName=function(e){return OvenPlayerConsole.log("ProviderController findByName() ",e),t[e]},u.getProviderBySource=function(t){var n=e.findProviderNameBySource(t);return OvenPlayerConsole.log("ProviderController getProviderBySource() ",n),u.findByName(n)},u.isSameProvider=function(t,n){return OvenPlayerConsole.log("ProviderController isSameProvider() ",e.findProviderNameBySource(t),e.findProviderNameBySource(n)),e.findProviderNameBySource(t)===e.findProviderNameBySource(n)},u}},
/* 20 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=l(n(0)),u=n(4),i=n(5),a=l(n(8));function l(e){return e&&e.__esModule?e:{default:e}}
/**
 * @brief   This manages Playlist or Sources.
 * @param
 *
 * */t.default=function(){var e={},t=[],n=(0,a.default)();OvenPlayerConsole.log("PlaylistManager loaded.");var l=function(e){if(e&&(e.file||e.host||e.application||e.stream)){var t=r({},{default:!1},e);t.file=(0,i.trim)(""+t.file),t.host&&t.application&&t.stream&&(t.file=t.host+"/"+t.application+"/stream/"+t.stream,delete t.host,delete t.application,delete t.stream);var n=/^[^/]+\/(?:x-)?([^/]+)$/;if(n.test(t.type)&&(
// if type is given as a mimetype
t.mimeType=t.type,t.type=t.type.replace(n,"$1")),(0,u.isRtmp)(t.file)?t.type="rtmp":(0,u.isWebRTC)(t.file)?t.type="webrtc":(0,u.isDash)(t.file,t.type)?t.type="dash":t.type||(t.type=(0,i.extractExtension)(t.file)),t.type){
// normalize types
switch(t.type){case"m3u8":case"vnd.apple.mpegurl":t.type="hls";break;case"m4a":t.type="aac";break;case"smil":t.type="rtmp"}return Object.keys(t).forEach(function(e){""===t[e]&&delete t[e]}),t}}};return e.setPlaylist=function(e){OvenPlayerConsole.log("PlaylistManager setPlaylist() ",e);var u=(o.default.isArray(e)?e:[e]).map(function(e){o.default.isArray(e.tracks)||delete e.tracks;var t=r({},{sources:[],tracks:[]},e);t.sources!==Object(t.sources)||o.default.isArray(t.sources)||(t.sources=[l(t.sources)]),o.default.isArray(t.sources)&&0!==t.sources.length||(e.levels?t.sources=e.levels:t.sources=[l(e)]);for(var u=0;u<t.sources.length;u++){var i,a=t.sources[u];if(a){var c=a.default;a.default=!!c&&"true"===c.toString(),
// If the source doesn't have a label, number it
t.sources[u].label||(t.sources[u].label=t.sources[u].type+"-"+u.toString()),i=l(t.sources[u]),n.findProviderNameBySource(i)?t.sources[u]=i:t.sources[u]=null}}return t.sources=t.sources.filter(function(e){return!!e}),
// default 가 없을때 webrtc가 있다면 webrtc default : true로 자동 설정
/*let haveDefault = _.find(playlistItem.sources, function(source){return source.default == true;});
            let webrtcSource = [];
            if(!haveDefault){
                webrtcSource = _.find(playlistItem.sources, function(source){return source.type == "webrtc";});
                if(webrtcSource){
                    webrtcSource.default = true;
                }
            }*/
o.default.isArray(t.tracks)||(t.tracks=[]),o.default.isArray(t.captions)&&(t.tracks=t.tracks.concat(t.captions),delete t.captions),t.tracks=t.tracks.map(function(e){return!(!e||!e.file)&&r({},{kind:"captions",default:!1},e)}).filter(function(e){return!!e}),t});return t=u,u},e.getPlaylist=function(){return OvenPlayerConsole.log("PlaylistManager getPlaylist() ",t),t},e.getCurrentSources=function(){
//We do not support "PLAYLIST" not yet. So this returns playlist of 0.
return OvenPlayerConsole.log("PlaylistManager getCurrentSources() ",t[0].sources),t[0].sources},e}},
/* 21 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(){var e={},t=null;return window.OvenPlayerConsole={log:window.console.log},e.enable=function(){null!=t&&(OvenPlayerConsole.log=t)},e.disable=function(){t=console.log,OvenPlayerConsole.log=function(){}},e.destroy=function(){window.OvenPlayerConsole=null},e}},
/* 22 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){return e&&e.__esModule?e:{default:e}}
/**
 * @brief   This executes the input commands at a specific point in time.
 * @param   instance
 * @param   queuedCommands
 * */(n(0));t.default=function(e,t){var n=[],o={},u=!1,i={};OvenPlayerConsole.log("LazyCommandExecutor loaded."),t.forEach(function(t){var n=e[t];o[t]=n||function(){},e[t]=function(){var e=Array.prototype.slice.call(arguments,0);u?(a(),n&&n.apply(i,e)):
//commandQueue.push({ command, args });
i.addQueue(t,e)}});var a=function(){for(;n.length>0;){var t=n.shift(),r=t.command,u=t.args;(o[r]||e[r]).apply(e,u)}};return i.setExecuteMode=function(e){u=e,OvenPlayerConsole.log("LazyCommandExecutor : setExecuteMode()",e)},i.getUndecoratedMethods=function(){return OvenPlayerConsole.log("LazyCommandExecutor : getUndecoratedMethods()",o),o},i.getQueue=function(){return OvenPlayerConsole.log("LazyCommandExecutor : getQueue()",getQueue),n},i.addQueue=function(e,t){OvenPlayerConsole.log("LazyCommandExecutor : addQueue()",e,t),n.push({command:e,args:t})},i.flush=function(){OvenPlayerConsole.log("LazyCommandExecutor : flush()"),a()},i.empty=function(){OvenPlayerConsole.log("LazyCommandExecutor : empty()"),n.length=0},i.off=function(){OvenPlayerConsole.log("LazyCommandExecutor : off()"),t.forEach(function(t){var n=o[t];n&&(e[t]=n,delete o[t])})},
//Run once at the end
i.removeAndExcuteOnce=function(t){var u=r.default.findWhere(n,{command:t});OvenPlayerConsole.log("LazyCommandExecutor : removeAndExcuteOnce()",t),n.splice(r.default.findIndex(n,{command:t}),1);var i=o[t];i&&(OvenPlayerConsole.log("removeCommand()"),u&&(i||e[t]).apply(e,u.args),e[t]=i,delete o[t])},i.destroy=function(){OvenPlayerConsole.log("LazyCommandExecutor : destroy()"),i.off(),i.empty()},i}},
/* 23 */
/***/function(e,t){
/* WEBPACK VAR INJECTION */(function(t){/* globals __webpack_amd_options__ */
e.exports=t;
/* WEBPACK VAR INJECTION */}).call(this,{})
/***/},
/* 24 */
/***/function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],
// module.parent = undefined by default
e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e};
/***/},
/* 25 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(e){return e&&e.__esModule?e:{default:e}}
/**
 * @brief   This initializes the input options.
 * @param   options
 *
 * */(n(0));t.default=function(e){OvenPlayerConsole.log("Configurator loaded.",e);var t=function(e){var t=function(e){return e.slice&&"px"===e.slice(-2)&&(e=e.slice(0,-2)),e};!function(e){Object.keys(e).forEach(function(t){"id"!==t&&(e[t]=function(e){if(void 0===e)return null;if("string"==typeof e&&e.length<6){var t=e.toLowerCase();if("true"===t)return!0;if("false"===t)return!1;if(!isNaN(Number(e))&&!isNaN(parseFloat(e)))return Number(e)}return e}(e[t]))})}(e);var n=r({},{defaultPlaybackRate:1,playbackRateControls:!1,playbackRates:[.25,.5,1,1.5,2],mute:!1,volume:90,width:640,height:360},e);n.width=t(n.width),n.height=t(n.height),n.aspectratio=function(e,t){if(-1===t.toString().indexOf("%"))return 0;if("string"!=typeof e||!e)return 0;if(/^\d*\.?\d+%$/.test(e))return e;var n=e.indexOf(":");if(-1===n)return 0;var r=parseFloat(e.substr(0,n)),o=parseFloat(e.substr(n+1));return r<=0||o<=0?0:o/r*100+"%"}(n.aspectratio,n.width);var u=n.playbackRateControls;if(u){var i=n.playbackRates;Array.isArray(u)&&(i=u),(i=i.filter(function(e){return o.default.isNumber(e)&&e>=.25&&e<=4}).map(function(e){return Math.round(4*e)/4})).indexOf(1)<0&&i.push(1),i.sort(),n.playbackRateControls=!0,n.playbackRates=i}(!n.playbackRateControls||n.playbackRates.indexOf(n.defaultPlaybackRate)<0)&&(n.defaultPlaybackRate=1),n.playbackRate=n.defaultPlaybackRate,n.aspectratio||delete n.aspectratio;var a=n.playlist;if(a)o.default.isArray(a.playlist)&&(n.feedData=a,n.playlist=a.playlist);else{var l=o.default.pick(n,["title","description","type","mediaid","image","file","sources","tracks","preload","duration","host","application","stream"]);n.playlist=[l]}return delete n.duration,n}(e),n=t.aspectratio||"16:9",u=t.debug,i=t.defaultPlaybackRate||1,a=(t.image,t.playbackRateControls||!0),l=t.playbackRates||[.5,1,1.25,1.5,2],c=t.playlist||[],f=t.qualityLabel||"",s=t.repeat||!1,d=t.stretching||"uniform",p={getConfig:function(){return t},getAspectratio:function(){return n},setAspectratio:function(e){n=e},isDebug:function(){return u},getDefaultPlaybackRate:function(){return i},setDefaultPlaybackRate:function(e){return i=e,e},getQualityLabel:function(){return f},setQualityLabel:function(e){f=e},getPlaybackRates:function(){return l},isPlaybackRateControls:function(){return a},getPlaylist:function(){return c},setPlaylist:function(e){return c=o.default.isArray(e)?e:[e]},isRepeat:function(){return s},getStretching:function(){return d}};return p}},
/* 26 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=p(n(25)),u=p(n(12)),i=p(n(22)),a=p(n(21)),l=p(n(20)),c=p(n(19)),f=(p(n(6)),n(2)),s=n(11),d=n(7);//import CaptionManager from "api/caption/Manager";
function p(e){return e&&e.__esModule?e:{default:e}}
/**
 * @brief   This object connects UI to the provider.
 * @param   {object}    container  dom element
 *
 * */t.default=function(e){var t=(0,a.default)(),n={};(0,u.default)(n),OvenPlayerConsole.log("[[OvenPlayer]] v."+s.version),OvenPlayerConsole.log("API loaded.");
//let captionManager = CaptionManager(that);
var p=(0,l.default)(),v=(0,c.default)(),y="",g="",h="",m=function(t){return v.loadProviders(p.getPlaylist()).then(function(t){y&&(y.destroy(),y=null);var o=function(e){var t=0;if(e)for(var n=0;n<e.length;n++)if(e[n].default&&(t=n),g.getQualityLabel()&&e[n].label===g.getQualityLabel())return n;return t}(p.getCurrentSources());OvenPlayerConsole.log("current source index : "+o),(
//Call Provider.
y=t[o](e,g)).getName()===f.PROVIDER_RTMP&&
//If provider type is RTMP, we accepts RtmpExpansion.
r(n,(0,d.ApiRtmpExpansion)(y)),
//This passes the event created by the Provider to API.
y.on("all",function(e,t){
//Auto next source when player load was fail by amiss source.
if(n.trigger(e,t),e===f.ERROR&&(t.code===f.PLAYER_FILE_ERROR||5===parseInt(t.code/100))||e===f.NETWORK_UNSTABLED){var r=n.getCurrentQuality();r.index+1<n.getQualityLevels().length&&(
//this sequential has available source.
n.pause(),n.setCurrentQuality(r.index+1))}})}).then(function(){
//provider's preload() have to made Promise. Cuz it overcomes 'flash loading timing problem'.
y.preload(p.getCurrentSources(),t).then(function(){h.flush(),
//This is no reason to exist anymore.
h.destroy(),n.trigger(f.READY)})}).catch(function(e){var t={code:f.INIT_ERROR,reason:"init error.",message:"Player init error.",error:e};n.trigger(f.ERROR,t),
//xxx : If you init empty sources. (I think this is strange case.)
//This works for this case.
//player = OvenPlayer.create("elId", {});
//player.load(soruces);
h.removeAndExcuteOnce("load")})};
/**
     * API 초기화 함수
     * init
     * @param      {object} options player initial option value.
     * @returns
     **/
return n.init=function(e){
//It collects the commands and executes them at the time when they are executable.
h=(0,i.default)(n,["load","play","pause","seek","stop","getDuration","getPosition","getVolume","getMute","getBuffer","getState"]),(g=(0,o.default)(e)).isDebug()||t.disable(),OvenPlayerConsole.log("API : init()"),OvenPlayerConsole.log("API : init() config : ",g),p.setPlaylist(g.getPlaylist()),OvenPlayerConsole.log("API : init() sources : ",p.getCurrentSources()),m()},
/*that.getContainerId = () =>{
        return container.id;
    };*/
n.getConfig=function(){return OvenPlayerConsole.log("API : getConfig()",g.getConfig()),g.getConfig()},n.getDuration=function(){if(y)return OvenPlayerConsole.log("API : getDuration()",y.getDuration()),y.getDuration()},n.getPosition=function(){if(y)return OvenPlayerConsole.log("API : getPosition()",y.getPosition()),y.getPosition()},n.getVolume=function(){if(y)return OvenPlayerConsole.log("API : getVolume()",y.getVolume()),y.getVolume()},n.setVolume=function(e){y&&(OvenPlayerConsole.log("API : setVolume() "+e),y.setVolume(e))},n.setMute=function(e){if(y)return OvenPlayerConsole.log("API : setMute() "+e),y.setMute(e)},n.getMute=function(){if(y)return OvenPlayerConsole.log("API : getMute() "+y.getMute()),y.getMute()},n.load=function(e){return OvenPlayerConsole.log("API : load() ",e),h=(0,i.default)(n,["play","seek","stop"]),e&&(y&&y.setCurrentQuality(0),p.setPlaylist(e)),m()},n.play=function(){OvenPlayerConsole.log("API : play() "),y.play()},n.pause=function(){OvenPlayerConsole.log("API : pause() "),y.pause()},n.seek=function(e){OvenPlayerConsole.log("API : seek() "+e),y.seek(e)},n.setPlaybackRate=function(e){return OvenPlayerConsole.log("API : setPlaybackRate() ",e),y.setPlaybackRate(g.setDefaultPlaybackRate(e))},n.getPlaybackRate=function(){return OvenPlayerConsole.log("API : getPlaybackRate() ",y.getPlaybackRate()),y.getPlaybackRate()},n.getQualityLevels=function(){return OvenPlayerConsole.log("API : getQualityLevels() ",y.getQualityLevels()),y.getQualityLevels()},n.getCurrentQuality=function(){return OvenPlayerConsole.log("API : getCurrentQuality() ",y.getCurrentQuality()),y.getCurrentQuality()},n.setCurrentQuality=function(e){OvenPlayerConsole.log("API : setCurrentQuality() ",e);var t=p.getCurrentSources(),r=t[n.getCurrentQuality().index],o=t[e],u=n.getPosition(),a=v.isSameProvider(r,o),l=y.setCurrentQuality(e,a);return o?(OvenPlayerConsole.log("API : setCurrentQuality() isSameProvider",a),a||(h=(0,i.default)(n,["play"]),m(u)),l):null},
/* Captions : This is not supported in the current version.*/
/*that.setCurrentCaption = (index) =>{
     return captionManager.setCurrentCaption(index);
     }
     that.getCurrentCaption = () =>{
     return captionManager.getCurrentCaption();
     }
     that.getCaptionList = () => {
     return captionManager.getCaptionList();
     }
     that.addCaption = (track) => {
     return captionManager.addCaption();
     }
     that.getCaptionList = () => {
     return captionManager.getCaptionList();
     }*/
n.getBuffer=function(){OvenPlayerConsole.log("API : getBuffer() ",y.getBuffer()),y.getBuffer()},n.getState=function(){if(y)return OvenPlayerConsole.log("API : getState() ",y.getState()),y.getState()},n.stop=function(){OvenPlayerConsole.log("API : stop() "),y.stop()},n.remove=function(){OvenPlayerConsole.log("API : remove() "),h.destroy(),y.destroy(),y=null,v=null,p=null,g=null,n.trigger(f.DESTROY),n.off(),OvenPlayerConsole.log("API : remove() - lazyQueue, currentProvider, providerController, playlistManager, playerConfig, api event destroed. "),t.destroy()},n}},
/* 27 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.checkAndGetContainerElement=void 0;var r=l(n(26)),o=n(4),u=l(n(0)),i=l(n(3)),a=n(10);function l(e){return e&&e.__esModule?e:{default:e}}n.p=(0,a.getScriptPath)("ovenplayer.sdk.js");
/**
 * Main OvenPlayerSDK object
 */
var c=window.OvenPlayerSDK={},f=c.playerList=[],s=t.checkAndGetContainerElement=function(e){if(!e)
// TODO(rock): Should cause an error.
return null;var t=null;if("string"==typeof e)t=document.getElementById(e);else{if(!e.nodeType)
// TODO(rock): Should cause an error.
return null;t=e}return t};
/**
 * Create player instance and return it.
 *
 * @param      {string | dom element} container  Id of container element or container element
 * @param      {object} options  The options
 */
c.create=function(e,t){var n=s(e),o=(0,r.default)(n);return o.init(t),f.push(o),o},
/**
 * Gets the player instance list.
 *
 * @return     {array}  The player list.
 */
c.getPlayerList=function(){return f},
/**
 * Gets the player instance by container id.
 *
 * @param      {string}  containerId  The container identifier
 * @return     {obeject | null}  The player instance.
 */
c.getPlayerByContainerId=function(e){i.default;for(var t=0;t<f.length;t++)if(f[t].getContainerId()===e)return f[t];return null},
/**
 * Gets the player instance by index.
 *
 * @param      {number}  index   The index
 * @return     {object | null}  The player instance.
 */
c.getPlayerByIndex=function(e){var t=f[e];return t||null},
/**
 * Generate webrtc source for player source type.
 *
 * @param      {Object | Array}  source   webrtc source
 * @return     {Array}  Player source Obejct.
 */
c.generateWebrtcUrls=function(e){return(u.default.isArray(e)?e:[e]).map(function(e,t){if(e.host&&(0,o.isWebRTC)(e.host)&&e.application&&e.stream)return{file:e.host+"/"+e.application+"/"+e.stream,type:"webrtc",label:e.label?e.label:"webrtc-"+(t+1)}})},t.default=c}
/******/]);
//# sourceMappingURL=ovenplayer.sdk.js.map