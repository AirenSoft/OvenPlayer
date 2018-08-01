/*! For license information please see ovenplayer.js.LICENSE */
/*! OvenPlayerv0.6.5 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
/******/4:0,
/******/3:0
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
/******/return o.p+""+({0:"ovenplayer.provider.DashProvider",1:"ovenplayer.provider.HlsProvider",2:"ovenplayer.provider.html5"}[e]||e)+".js"
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
/******/o(o.s=56);
/******/}
/************************************************************************/
/******/([
/* 0 */
/***/function(e,t,n){"use strict";
/* WEBPACK VAR INJECTION */
/* WEBPACK VAR INJECTION */(function(e,r){var o,u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(){var i="object"==("undefined"==typeof self?"undefined":u(self))&&self.self===self&&self||"object"==(void 0===e?"undefined":u(e))&&e.global===e&&e||this||{},a=i._,l=Array.prototype,c=Object.prototype,s="undefined"!=typeof Symbol?Symbol.prototype:null,f=l.push,d=l.slice,p=c.toString,v=c.hasOwnProperty,y=Array.isArray,g=Object.keys,m=Object.create,h=function(){},b=function e(t){return t instanceof e?t:this instanceof e?void(this._wrapped=t):new e(t)};void 0===t||t.nodeType?i._=b:(void 0!==r&&!r.nodeType&&r.exports&&(t=r.exports=b),t._=b),b.VERSION="1.9.1";var _,P=function(e,t,n){if(void 0===t)return e;switch(null==n?3:n){case 1:return function(n){return e.call(t,n)};case 3:return function(n,r,o){return e.call(t,n,r,o)};case 4:return function(n,r,o,u){return e.call(t,n,r,o,u)}}return function(){return e.apply(t,arguments)}},E=function(e,t,n){return b.iteratee!==_?b.iteratee(e,t):null==e?b.identity:b.isFunction(e)?P(e,t,n):b.isObject(e)&&!b.isArray(e)?b.matcher(e):b.property(e)};b.iteratee=_=function(e,t){return E(e,t,1/0)};var O=function(e,t){return t=null==t?e.length-1:+t,function(){for(var n=Math.max(arguments.length-t,0),r=Array(n),o=0;o<n;o++)r[o]=arguments[o+t];switch(t){case 0:return e.call(this,r);case 1:return e.call(this,arguments[0],r);case 2:return e.call(this,arguments[0],arguments[1],r)}var u=Array(t+1);for(o=0;o<t;o++)u[o]=arguments[o];return u[t]=r,e.apply(this,u)}},C=function(e){if(!b.isObject(e))return{};if(m)return m(e);h.prototype=e;var t=new h;return h.prototype=null,t},w=function(e){return function(t){return null==t?void 0:t[e]}},T=function(e,t){return null!=e&&v.call(e,t)},A=function(e,t){for(var n=t.length,r=0;r<n;r++){if(null==e)return;e=e[t[r]]}return n?e:void 0},R=Math.pow(2,53)-1,S=w("length"),k=function(e){var t=S(e);return"number"==typeof t&&0<=t&&t<=R};b.each=b.forEach=function(e,t,n){var r,o;if(t=P(t,n),k(e))for(r=0,o=e.length;r<o;r++)t(e[r],r,e);else{var u=b.keys(e);for(r=0,o=u.length;r<o;r++)t(e[u[r]],u[r],e)}return e},b.map=b.collect=function(e,t,n){t=E(t,n);for(var r=!k(e)&&b.keys(e),o=(r||e).length,u=Array(o),i=0;i<o;i++){var a=r?r[i]:i;u[i]=t(e[a],a,e)}return u};var M=function(e){return function(t,n,r,o){var u=3<=arguments.length;return function(t,n,r,o){var u=!k(t)&&b.keys(t),i=(u||t).length,a=0<e?0:i-1;for(o||(r=t[u?u[a]:a],a+=e);0<=a&&a<i;a+=e){var l=u?u[a]:a;r=n(r,t[l],l,t)}return r}(t,P(n,o,4),r,u)}};b.reduce=b.foldl=b.inject=M(1),b.reduceRight=b.foldr=M(-1),b.find=b.detect=function(e,t,n){var r=(k(e)?b.findIndex:b.findKey)(e,t,n);if(void 0!==r&&-1!==r)return e[r]},b.filter=b.select=function(e,t,n){var r=[];return t=E(t,n),b.each(e,function(e,n,o){t(e,n,o)&&r.push(e)}),r},b.reject=function(e,t,n){return b.filter(e,b.negate(E(t)),n)},b.every=b.all=function(e,t,n){t=E(t,n);for(var r=!k(e)&&b.keys(e),o=(r||e).length,u=0;u<o;u++){var i=r?r[u]:u;if(!t(e[i],i,e))return!1}return!0},b.some=b.any=function(e,t,n){t=E(t,n);for(var r=!k(e)&&b.keys(e),o=(r||e).length,u=0;u<o;u++){var i=r?r[u]:u;if(t(e[i],i,e))return!0}return!1},b.contains=b.includes=b.include=function(e,t,n,r){return k(e)||(e=b.values(e)),("number"!=typeof n||r)&&(n=0),0<=b.indexOf(e,t,n)},b.invoke=O(function(e,t,n){var r,o;return b.isFunction(t)?o=t:b.isArray(t)&&(r=t.slice(0,-1),t=t[t.length-1]),b.map(e,function(e){var u=o;if(!u){if(r&&r.length&&(e=A(e,r)),null==e)return;u=e[t]}return null==u?u:u.apply(e,n)})}),b.pluck=function(e,t){return b.map(e,b.property(t))},b.where=function(e,t){return b.filter(e,b.matcher(t))},b.findWhere=function(e,t){return b.find(e,b.matcher(t))},b.max=function(e,t,n){var r,o,i=-1/0,a=-1/0;if(null==t||"number"==typeof t&&"object"!=u(e[0])&&null!=e)for(var l=0,c=(e=k(e)?e:b.values(e)).length;l<c;l++)null!=(r=e[l])&&i<r&&(i=r);else t=E(t,n),b.each(e,function(e,n,r){o=t(e,n,r),(a<o||o===-1/0&&i===-1/0)&&(i=e,a=o)});return i},b.min=function(e,t,n){var r,o,i=1/0,a=1/0;if(null==t||"number"==typeof t&&"object"!=u(e[0])&&null!=e)for(var l=0,c=(e=k(e)?e:b.values(e)).length;l<c;l++)null!=(r=e[l])&&r<i&&(i=r);else t=E(t,n),b.each(e,function(e,n,r){((o=t(e,n,r))<a||o===1/0&&i===1/0)&&(i=e,a=o)});return i},b.shuffle=function(e){return b.sample(e,1/0)},b.sample=function(e,t,n){if(null==t||n)return k(e)||(e=b.values(e)),e[b.random(e.length-1)];var r=k(e)?b.clone(e):b.values(e),o=S(r);t=Math.max(Math.min(t,o),0);for(var u=o-1,i=0;i<t;i++){var a=b.random(i,u),l=r[i];r[i]=r[a],r[a]=l}return r.slice(0,t)},b.sortBy=function(e,t,n){var r=0;return t=E(t,n),b.pluck(b.map(e,function(e,n,o){return{value:e,index:r++,criteria:t(e,n,o)}}).sort(function(e,t){var n=e.criteria,r=t.criteria;if(n!==r){if(r<n||void 0===n)return 1;if(n<r||void 0===r)return-1}return e.index-t.index}),"value")};var x=function(e,t){return function(n,r,o){var u=t?[[],[]]:{};return r=E(r,o),b.each(n,function(t,o){var i=r(t,o,n);e(u,t,i)}),u}};b.groupBy=x(function(e,t,n){T(e,n)?e[n].push(t):e[n]=[t]}),b.indexBy=x(function(e,t,n){e[n]=t}),b.countBy=x(function(e,t,n){T(e,n)?e[n]++:e[n]=1});var j=/[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;b.toArray=function(e){return e?b.isArray(e)?d.call(e):b.isString(e)?e.match(j):k(e)?b.map(e,b.identity):b.values(e):[]},b.size=function(e){return null==e?0:k(e)?e.length:b.keys(e).length},b.partition=x(function(e,t,n){e[n?0:1].push(t)},!0),b.first=b.head=b.take=function(e,t,n){return null==e||e.length<1?null==t?void 0:[]:null==t||n?e[0]:b.initial(e,e.length-t)},b.initial=function(e,t,n){return d.call(e,0,Math.max(0,e.length-(null==t||n?1:t)))},b.last=function(e,t,n){return null==e||e.length<1?null==t?void 0:[]:null==t||n?e[e.length-1]:b.rest(e,Math.max(0,e.length-t))},b.rest=b.tail=b.drop=function(e,t,n){return d.call(e,null==t||n?1:t)},b.compact=function(e){return b.filter(e,Boolean)};var N=function e(t,n,r,o){for(var u=(o=o||[]).length,i=0,a=S(t);i<a;i++){var l=t[i];if(k(l)&&(b.isArray(l)||b.isArguments(l)))if(n)for(var c=0,s=l.length;c<s;)o[u++]=l[c++];else e(l,n,r,o),u=o.length;else r||(o[u++]=l)}return o};b.flatten=function(e,t){return N(e,t,!1)},b.without=O(function(e,t){return b.difference(e,t)}),b.uniq=b.unique=function(e,t,n,r){b.isBoolean(t)||(r=n,n=t,t=!1),null!=n&&(n=E(n,r));for(var o=[],u=[],i=0,a=S(e);i<a;i++){var l=e[i],c=n?n(l,i,e):l;t&&!n?(i&&u===c||o.push(l),u=c):n?b.contains(u,c)||(u.push(c),o.push(l)):b.contains(o,l)||o.push(l)}return o},b.union=O(function(e){return b.uniq(N(e,!0,!0))}),b.intersection=function(e){for(var t=[],n=arguments.length,r=0,o=S(e);r<o;r++){var u=e[r];if(!b.contains(t,u)){var i;for(i=1;i<n&&b.contains(arguments[i],u);i++);i===n&&t.push(u)}}return t},b.difference=O(function(e,t){return t=N(t,!0,!0),b.filter(e,function(e){return!b.contains(t,e)})}),b.zip=O(b.unzip=function(e){for(var t=e&&b.max(e,S).length||0,n=Array(t),r=0;r<t;r++)n[r]=b.pluck(e,r);return n}),b.object=function(e,t){for(var n={},r=0,o=S(e);r<o;r++)t?n[e[r]]=t[r]:n[e[r][0]]=e[r][1];return n};var L=function(e){return function(t,n,r){n=E(n,r);for(var o=S(t),u=0<e?0:o-1;0<=u&&u<o;u+=e)if(n(t[u],u,t))return u;return-1}};b.findIndex=L(1),b.findLastIndex=L(-1);var D=function(e,t,n){return function(r,o,u){var i=0,a=S(r);if("number"==typeof u)0<e?i=0<=u?u:Math.max(u+a,i):a=0<=u?Math.min(u+1,a):u+a+1;else if(n&&u&&a)return r[u=n(r,o)]===o?u:-1;if(o!=o)return 0<=(u=t(d.call(r,i,a),b.isNaN))?u+i:-1;for(u=0<e?i:a-1;0<=u&&u<a;u+=e)if(r[u]===o)return u;return-1}};b.indexOf=D(1,b.findIndex,b.sortedIndex=function(e,t,n,r){for(var o=(n=E(n,r,1))(t),u=0,i=S(e);u<i;){var a=Math.floor((u+i)/2);n(e[a])<o?u=a+1:i=a}return u}),b.lastIndexOf=D(-1,b.findLastIndex),b.range=function(e,t,n){null==t&&(t=e||0,e=0),n||(n=t<e?-1:1);for(var r=Math.max(Math.ceil((t-e)/n),0),o=Array(r),u=0;u<r;u++,e+=n)o[u]=e;return o},b.chunk=function(e,t){if(null==t||t<1)return[];for(var n=[],r=0,o=e.length;r<o;)n.push(d.call(e,r,r+=t));return n};var I=function(e,t,n,r,o){if(!(r instanceof t))return e.apply(n,o);var u=C(e.prototype),i=e.apply(u,o);return b.isObject(i)?i:u};b.bind=O(function(e,t,n){if(!b.isFunction(e))throw new TypeError("Bind must be called on a function");var r=O(function(o){return I(e,r,t,this,n.concat(o))});return r}),((b.partial=O(function(e,t){var n=b.partial.placeholder;return function r(){for(var o=0,u=t.length,i=Array(u),a=0;a<u;a++)i[a]=t[a]===n?arguments[o++]:t[a];for(;o<arguments.length;)i.push(arguments[o++]);return I(e,r,this,this,i)}})).placeholder=b).bindAll=O(function(e,t){var n=(t=N(t,!1,!1)).length;if(n<1)throw new Error("bindAll must be passed function names");for(;n--;){var r=t[n];e[r]=b.bind(e[r],e)}}),b.memoize=function(e,t){var n=function n(r){var o=n.cache,u=""+(t?t.apply(this,arguments):r);return T(o,u)||(o[u]=e.apply(this,arguments)),o[u]};return n.cache={},n},b.delay=O(function(e,t,n){return setTimeout(function(){return e.apply(null,n)},t)}),b.defer=b.partial(b.delay,b,1),b.throttle=function(e,t,n){var r,o,u,i,a=0;n||(n={});var l=function(){a=!1===n.leading?0:b.now(),r=null,i=e.apply(o,u),r||(o=u=null)},c=function(){var c=b.now();a||!1!==n.leading||(a=c);var s=t-(c-a);return o=this,u=arguments,s<=0||t<s?(r&&(clearTimeout(r),r=null),a=c,i=e.apply(o,u),r||(o=u=null)):r||!1===n.trailing||(r=setTimeout(l,s)),i};return c.cancel=function(){clearTimeout(r),a=0,r=o=u=null},c},b.debounce=function(e,t,n){var r,o,u=function(t,n){r=null,n&&(o=e.apply(t,n))},i=O(function(i){if(r&&clearTimeout(r),n){var a=!r;r=setTimeout(u,t),a&&(o=e.apply(this,i))}else r=b.delay(u,t,this,i);return o});return i.cancel=function(){clearTimeout(r),r=null},i},b.wrap=function(e,t){return b.partial(t,e)},b.negate=function(e){return function(){return!e.apply(this,arguments)}},b.compose=function(){var e=arguments,t=e.length-1;return function(){for(var n=t,r=e[t].apply(this,arguments);n--;)r=e[n].call(this,r);return r}},b.after=function(e,t){return function(){if(--e<1)return t.apply(this,arguments)}},b.once=b.partial(b.before=function(e,t){var n;return function(){return 0<--e&&(n=t.apply(this,arguments)),e<=1&&(t=null),n}},2),b.restArguments=O;var B=!{toString:null}.propertyIsEnumerable("toString"),F=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"],Y=function(e,t){var n=F.length,r=e.constructor,o=b.isFunction(r)&&r.prototype||c,u="constructor";for(T(e,u)&&!b.contains(t,u)&&t.push(u);n--;)(u=F[n])in e&&e[u]!==o[u]&&!b.contains(t,u)&&t.push(u)};b.keys=function(e){if(!b.isObject(e))return[];if(g)return g(e);var t=[];for(var n in e)T(e,n)&&t.push(n);return B&&Y(e,t),t},b.allKeys=function(e){if(!b.isObject(e))return[];var t=[];for(var n in e)t.push(n);return B&&Y(e,t),t},b.values=function(e){for(var t=b.keys(e),n=t.length,r=Array(n),o=0;o<n;o++)r[o]=e[t[o]];return r},b.mapObject=function(e,t,n){t=E(t,n);for(var r=b.keys(e),o=r.length,u={},i=0;i<o;i++){var a=r[i];u[a]=t(e[a],a,e)}return u},b.pairs=function(e){for(var t=b.keys(e),n=t.length,r=Array(n),o=0;o<n;o++)r[o]=[t[o],e[t[o]]];return r},b.invert=function(e){for(var t={},n=b.keys(e),r=0,o=n.length;r<o;r++)t[e[n[r]]]=n[r];return t},b.functions=b.methods=function(e){var t=[];for(var n in e)b.isFunction(e[n])&&t.push(n);return t.sort()};var Q=function(e,t){return function(n){var r=arguments.length;if(t&&(n=Object(n)),r<2||null==n)return n;for(var o=1;o<r;o++)for(var u=arguments[o],i=e(u),a=i.length,l=0;l<a;l++){var c=i[l];t&&void 0!==n[c]||(n[c]=u[c])}return n}};b.extend=Q(b.allKeys),b.extendOwn=b.assign=Q(b.keys),b.findKey=function(e,t,n){t=E(t,n);for(var r,o=b.keys(e),u=0,i=o.length;u<i;u++)if(t(e[r=o[u]],r,e))return r};var W,V,U=function(e,t,n){return t in n};b.pick=O(function(e,t){var n={},r=t[0];if(null==e)return n;b.isFunction(r)?(1<t.length&&(r=P(r,t[1])),t=b.allKeys(e)):(r=U,t=N(t,!1,!1),e=Object(e));for(var o=0,u=t.length;o<u;o++){var i=t[o],a=e[i];r(a,i,e)&&(n[i]=a)}return n}),b.omit=O(function(e,t){var n,r=t[0];return b.isFunction(r)?(r=b.negate(r),1<t.length&&(n=t[1])):(t=b.map(N(t,!1,!1),String),r=function(e,n){return!b.contains(t,n)}),b.pick(e,r,n)}),b.defaults=Q(b.allKeys,!0),b.create=function(e,t){var n=C(e);return t&&b.extendOwn(n,t),n},b.clone=function(e){return b.isObject(e)?b.isArray(e)?e.slice():b.extend({},e):e},b.tap=function(e,t){return t(e),e},b.isMatch=function(e,t){var n=b.keys(t),r=n.length;if(null==e)return!r;for(var o=Object(e),u=0;u<r;u++){var i=n[u];if(t[i]!==o[i]||!(i in o))return!1}return!0},W=function(e,t,n,r){if(e===t)return 0!==e||1/e==1/t;if(null==e||null==t)return!1;if(e!=e)return t!=t;var o=void 0===e?"undefined":u(e);return("function"===o||"object"===o||"object"==(void 0===t?"undefined":u(t)))&&V(e,t,n,r)},V=function(e,t,n,r){e instanceof b&&(e=e._wrapped),t instanceof b&&(t=t._wrapped);var o=p.call(e);if(o!==p.call(t))return!1;switch(o){case"[object RegExp]":case"[object String]":return""+e==""+t;case"[object Number]":return+e!=+e?+t!=+t:0==+e?1/+e==1/t:+e==+t;case"[object Date]":case"[object Boolean]":return+e==+t;case"[object Symbol]":return s.valueOf.call(e)===s.valueOf.call(t)}var i="[object Array]"===o;if(!i){if("object"!=(void 0===e?"undefined":u(e))||"object"!=(void 0===t?"undefined":u(t)))return!1;var a=e.constructor,l=t.constructor;if(a!==l&&!(b.isFunction(a)&&a instanceof a&&b.isFunction(l)&&l instanceof l)&&"constructor"in e&&"constructor"in t)return!1}r=r||[];for(var c=(n=n||[]).length;c--;)if(n[c]===e)return r[c]===t;if(n.push(e),r.push(t),i){if((c=e.length)!==t.length)return!1;for(;c--;)if(!W(e[c],t[c],n,r))return!1}else{var f,d=b.keys(e);if(c=d.length,b.keys(t).length!==c)return!1;for(;c--;)if(f=d[c],!T(t,f)||!W(e[f],t[f],n,r))return!1}return n.pop(),r.pop(),!0},b.isEqual=function(e,t){return W(e,t)},b.isEmpty=function(e){return null==e||(k(e)&&(b.isArray(e)||b.isString(e)||b.isArguments(e))?0===e.length:0===b.keys(e).length)},b.isElement=function(e){return!(!e||1!==e.nodeType)},b.isArray=y||function(e){return"[object Array]"===p.call(e)},b.isObject=function(e){var t=void 0===e?"undefined":u(e);return"function"===t||"object"===t&&!!e},b.each(["Arguments","Function","String","Number","Date","RegExp","Error","Symbol","Map","WeakMap","Set","WeakSet"],function(e){b["is"+e]=function(t){return p.call(t)==="[object "+e+"]"}}),b.isArguments(arguments)||(b.isArguments=function(e){return T(e,"callee")});var z=i.document&&i.document.childNodes;"function"!=typeof/./&&"object"!=("undefined"==typeof Int8Array?"undefined":u(Int8Array))&&"function"!=typeof z&&(b.isFunction=function(e){return"function"==typeof e||!1}),b.isFinite=function(e){return!b.isSymbol(e)&&isFinite(e)&&!isNaN(parseFloat(e))},b.isNaN=function(e){return b.isNumber(e)&&isNaN(e)},b.isBoolean=function(e){return!0===e||!1===e||"[object Boolean]"===p.call(e)},b.isNull=function(e){return null===e},b.isUndefined=function(e){return void 0===e},b.has=function(e,t){if(!b.isArray(t))return T(e,t);for(var n=t.length,r=0;r<n;r++){var o=t[r];if(null==e||!v.call(e,o))return!1;e=e[o]}return!!n},b.noConflict=function(){return i._=a,this},b.identity=function(e){return e},b.constant=function(e){return function(){return e}},b.noop=function(){},b.property=function(e){return b.isArray(e)?function(t){return A(t,e)}:w(e)},b.propertyOf=function(e){return null==e?function(){}:function(t){return b.isArray(t)?A(e,t):e[t]}},b.matcher=b.matches=function(e){return e=b.extendOwn({},e),function(t){return b.isMatch(t,e)}},b.times=function(e,t,n){var r=Array(Math.max(0,e));t=P(t,n,1);for(var o=0;o<e;o++)r[o]=t(o);return r},b.random=function(e,t){return null==t&&(t=e,e=0),e+Math.floor(Math.random()*(t-e+1))},b.now=Date.now||function(){return(new Date).getTime()};var q={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},K=b.invert(q),G=function(e){var t=function(t){return e[t]},n="(?:"+b.keys(e).join("|")+")",r=RegExp(n),o=RegExp(n,"g");return function(e){return e=null==e?"":""+e,r.test(e)?e.replace(o,t):e}};b.escape=G(q),b.unescape=G(K),b.result=function(e,t,n){b.isArray(t)||(t=[t]);var r=t.length;if(!r)return b.isFunction(n)?n.call(e):n;for(var o=0;o<r;o++){var u=null==e?void 0:e[t[o]];void 0===u&&(u=n,o=r),e=b.isFunction(u)?u.call(e):u}return e};var H=0;b.uniqueId=function(e){var t=++H+"";return e?e+t:t},b.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var $=/(.)^/,X={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},J=/\\|'|\r|\n|\u2028|\u2029/g,Z=function(e){return"\\"+X[e]};b.template=function(e,t,n){!t&&n&&(t=n),t=b.defaults({},t,b.templateSettings);var r,o=RegExp([(t.escape||$).source,(t.interpolate||$).source,(t.evaluate||$).source].join("|")+"|$","g"),u=0,i="__p+='";e.replace(o,function(t,n,r,o,a){return i+=e.slice(u,a).replace(J,Z),u=a+t.length,n?i+="'+\n((__t=("+n+"))==null?'':_.escape(__t))+\n'":r?i+="'+\n((__t=("+r+"))==null?'':__t)+\n'":o&&(i+="';\n"+o+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{r=new Function(t.variable||"obj","_",i)}catch(t){throw t.source=i,t}var a=function(e){return r.call(this,e,b)},l=t.variable||"obj";return a.source="function("+l+"){\n"+i+"}",a},b.chain=function(e){var t=b(e);return t._chain=!0,t};var ee=function(e,t){return e._chain?b(t).chain():t};b.mixin=function(e){return b.each(b.functions(e),function(t){var n=b[t]=e[t];b.prototype[t]=function(){var e=[this._wrapped];return f.apply(e,arguments),ee(this,n.apply(b,e))}}),b},b.mixin(b),b.each(["pop","push","reverse","shift","sort","splice","unshift"],function(e){var t=l[e];b.prototype[e]=function(){var n=this._wrapped;return t.apply(n,arguments),"shift"!==e&&"splice"!==e||0!==n.length||delete n[0],ee(this,n)}}),b.each(["concat","join","slice"],function(e){var t=l[e];b.prototype[e]=function(){return ee(this,t.apply(this._wrapped,arguments))}}),b.prototype.value=function(){return this._wrapped},b.prototype.valueOf=b.prototype.toJSON=b.prototype.value,b.prototype.toString=function(){return String(this._wrapped)},n(22)&&(void 0===(o=function(){return b}.apply(t,[]))||(r.exports=o))}()}).call(this,n(16),n(23)(e))
/***/},
/* 1 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i(n(54)),o=i(n(5)),u=i(n(0));function i(e){return e&&e.__esModule?e:{default:e}}
/**
 * @brief   This is simple ui renderer. This returns onRendered callback, onDestroyed callback on Template. And this bind events for Templates.
 * @param   container  dom element or LA$ object
 * @param   templateName    templateName
 * @param   data    preload data
 * @param   events    Template's events.
 * @param   onRendered    This callback occurs after append template.
 * @param   onDestroyed    This callback occurs after destroyed template.
 * @param   isRoot
 *
 * */
/**
    * Created by hoho on 2018. 7. 19..
    */
t.default=function(e,t,n,i,a,l,c){var s=u.default.isElement(e)?(0,o.default)(e):e,f=void 0,d={},p={},v=function(e){var t=document.createElement("div");return t.innerHTML=e,f=(0,o.default)(t.firstChild),t.firstChild};return c?s.replace(v(r.default[t+"Template"](n))):s.append(v(r.default[t+"Template"](n))),a&&a(f,p),Object.keys(i).forEach(function(e){var t=e.split(" "),n=t[0].replace(/ /gi,""),r=t[1].replace(/ /gi,""),u="";if(u="document"===r||"window"===r?(0,o.default)(r):f.find(r)||(f.hasClass(r.replace(".",""))?f:null),!(n&&r&&u))return!1;var a=Object.keys(d).length++,l=function(t){return i[e](t,f,p)};
//because It retuns another data.
d[a]={name:n,target:r,callback:l},
//sometimes target is NodeList
u.get().forEach?u.get().forEach(function(e){e.addEventListener(n,l)}):u.get().addEventListener(n,l)}),p.destroy=function(){Object.keys(d).forEach(function(e){var t=d[e],n="";
//sometimes target is NodeList
(n="document"===t.target||"window"===t.target?(0,o.default)(t.target):f.find(t.target)||(f.hasClass(t.target.replace(".",""))?f:null)).get().forEach?n.get().forEach(function(e){e.removeEventListener(t.name,t.callback)}):n.get().removeEventListener(t.name,t.callback),delete d[e]}),f&&f.remove(),l&&l()},p}},
/* 2 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});
// STATE
t.STATE_BUFFERING="buffering",t.STATE_IDLE="idle";var r=t.STATE_COMPLETE="complete";t.STATE_PAUSED="paused",t.STATE_PLAYING="playing",t.STATE_ERROR="error",t.STATE_LOADING="loading",t.STATE_STALLED="stalled",t.PROVIDER_HTML5="html5",t.PROVIDER_WEBRTC="webrtc",t.PROVIDER_DASH="dash",t.PROVIDER_HLS="hls",t.CONTENT_COMPLETE=r,t.READY="ready",t.DESTROY="destroy",t.CONTENT_SEEK="seek",t.CONTENT_BUFFER_FULL="bufferFull",t.DISPLAY_CLICK="displayClick",t.CONTENT_LOADED="loaded",t.CONTENT_SEEKED="seeked",t.NETWORK_UNSTABLED="unstableNetwork",t.ERROR="error",t.PLAYER_STATE="stateChanged",t.PLAYER_COMPLETE=r,t.PLAYER_PAUSE="pause",t.PLAYER_PLAY="play",t.CONTENT_BUFFER="bufferChanged",t.CONTENT_TIME="time",t.CONTENT_RATE_CHANGE="ratechange",t.CONTENT_VOLUME="volumeChanged",t.CONTENT_MUTE="mute",t.CONTENT_META="metaChanged",t.CONTENT_LEVELS="qualityLevelChanged",t.CONTENT_LEVEL_CHANGED="currentQualityLevelChanged",t.PLAYBACK_RATE_CHANGED="playbackRateChanged",t.CONTENT_CAPTION_CUE_CHANGED="cueChanged",t.CONTENT_CAPTION_CHANGED="captionChanged",t.INIT_ERROR=100,t.PLAYER_UNKNWON_ERROR=300,t.PLAYER_UNKNWON_OPERATION_ERROR=301,t.PLAYER_UNKNWON_NEWWORK_ERROR=302,t.PLAYER_UNKNWON_DECODE_ERROR=303,t.PLAYER_FILE_ERROR=304,t.PLAYER_CAPTION_ERROR=305,t.PLAYER_WEBRTC_WS_ERROR=501,t.PLAYER_WEBRTC_WS_CLOSED=502,t.PLAYER_WEBRTC_ADD_ICECANDIDATE_ERROR=503,t.PLAYER_WEBRTC_SET_REMOTE_DESC_ERROR=504,t.PLAYER_WEBRTC_CREATE_ANSWER_ERROR=505,t.PLAYER_WEBRTC_SET_LOCAL_DESC_ERROR=506,t.PLAYER_WEBRTC_NETWORK_SLOW=510},
/* 3 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isDash=t.isWebRTC=t.isRtmp=void 0;var r=n(4);t.isRtmp=function(e,t){return 0==e.indexOf("rtmp:")||"rtmp"==t},t.isWebRTC=function(e,t){return!!e&&(0===e.indexOf("ws:")||0===e.indexOf("wss:")||"webrtc"===t)},t.isDash=function(e,t){return"mpd"===t||"dash"===t||"application/dash+xml"===t||"mpd"==(0,r.extractExtension)(e)}},
/* 4 */
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
/* 5 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=o(n(0));o(n(39));function o(e){return e&&e.__esModule?e:{default:e}}
/**
 * @brief   It was replace jquery's selector. It Often used by OvenTemplate. (/view/engine/OvenTemplate.js)
 * @param   selectorOrElement  string or element
 *
 * */
/**
 * Created by hoho on 2018. 7. 23..
 */t.default=function e(t){var n={},o=function(e,t){var n=e.querySelectorAll(t);return n.length>1?n:n[0]},u="";return(u=r.default.every(t,function(e){return r.default.isElement(e)})?t:"document"===t?document:"window"===t?window:o(document,t))?(n.find=function(t){return e(o(u,t))},n.css=function(e,t){u.length>0?u.forEach(function(n){n.style[e]=t}):u.style[e]=t},n.addClass=function(e){u.classList?u.classList.add(e):-1===u.className.split(" ").indexOf(e)&&(u.className+=" "+e)},n.removeClass=function(e){u.classList?u.classList.remove(e):u.className=u.className.replace(new RegExp("(^|\\b)"+e.split(" ").join("|")+"(\\b|$)","gi")," ")},n.show=function(){u.style.display="block"},n.hide=function(){u.style.display="none"},n.append=function(e){u.innerHTML+=e},n.text=function(e){
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
/* 6 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=(window.setTimeout,window.setImmediate);
//      Promise Polyfill
//      https://github.com/taylorhakes/promise-polyfill
//      Copyright (c) 2014 Taylor Hakes
//      Copyright (c) 2014 Forbes Lindesay
//      taylorhakes/promise-polyfill is licensed under the MIT License
function u(){}
// Polyfill for Function.prototype.bind
var i=function(e){if(!(this instanceof d))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],f(e,this)},a=function(e,t){for(;3===e._state;)e=e._value;0!==e._state?(e._handled=!0,d._immediateFn(function(){var n=1===e._state?t.onFulfilled:t.onRejected;if(null!==n){var r;try{r=n(e._value)}catch(e){return void c(t.promise,e)}l(t.promise,r)}else(1===e._state?l:c)(t.promise,e._value)})):e._deferreds.push(t)},l=function(e,t){try{
// Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"===(void 0===t?"undefined":r(t))||"function"==typeof t)){var n=t.then;if(t instanceof d)return e._state=3,e._value=t,void s(e);if("function"==typeof n)return void f(function(e,t){return function(){e.apply(t,arguments)}}(n,t),e)}e._state=1,e._value=t,s(e)}catch(t){c(e,t)}},c=function(e,t){e._state=2,e._value=t,s(e)},s=function(e){2===e._state&&0===e._deferreds.length&&d._immediateFn(function(){e._handled||d._unhandledRejectionFn(e._value)});for(var t=0,n=e._deferreds.length;t<n;t++)a(e,e._deferreds[t]);e._deferreds=null},f=function(e,t){var n=!1;try{e(function(e){n||(n=!0,l(t,e))},function(e){n||(n=!0,c(t,e))})}catch(e){if(n)return;n=!0,c(t,e)}};i.prototype.catch=function(e){return this.then(null,e)},i.prototype.then=function(e,t){var n=new this.constructor(u);return a(this,new function(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}(e,t,n)),n},i.prototype.finally=function(e){var t=this.constructor;return this.then(function(n){return t.resolve(e()).then(function(){return n})},function(n){return t.resolve(e()).then(function(){return t.reject(n)})})},i.all=function(e){return new d(function(t,n){if(!e||void 0===e.length)throw new TypeError("Promise.all accepts an array");var o=Array.prototype.slice.call(e);if(0===o.length)return t([]);var u=o.length;function i(e,a){try{if(a&&("object"===(void 0===a?"undefined":r(a))||"function"==typeof a)){var l=a.then;if("function"==typeof l)return void l.call(a,function(t){i(e,t)},n)}o[e]=a,0==--u&&t(o)}catch(e){n(e)}}for(var a=0;a<o.length;a++)i(a,o[a])})},i.resolve=function(e){return e&&"object"===(void 0===e?"undefined":r(e))&&e.constructor===d?e:new d(function(t){t(e)})},i.reject=function(e){return new d(function(t,n){n(e)})},i.race=function(e){return new d(function(t,n){for(var r=0,o=e.length;r<o;r++)e[r].then(t,n)})},
// Use polyfill for setImmediate for performance gains
i._immediateFn="function"==typeof o&&function(e){o(e)}||function(e){o(e,0)},i._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)};var d=window.Promise||(window.Promise=i);t.resolved=d.resolve();t.default=d},
/* 7 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(3);
/**
 * @brief   This finds the provider that matches the input source.
 * @param
 * */t.default=function(){var e={};OvenPlayerConsole.log("SupportChecker loaded.");var t=[{name:"html5",checkSupport:function(e){var t=document.createElement("video");if(!t.canPlayType)return!1;var n=e.file,o=e.type;if(!o)return!1;var u=e.mimeType||{aac:"audio/mp4",mp4:"video/mp4",f4v:"video/mp4",m4v:"video/mp4",mov:"video/mp4",mp3:"audio/mpeg",mpeg:"audio/mpeg",ogv:"video/ogg",ogg:"video/ogg",oga:"video/ogg",vorbis:"video/ogg",webm:"video/webm",f4a:"video/aac",m3u8:"application/vnd.apple.mpegurl",m3u:"application/vnd.apple.mpegurl",hls:"application/vnd.apple.mpegurl"}[o];return!((0,r.isRtmp)(n,o)||(0,r.isWebRTC)(n,o)||!u||!t.canPlayType(u))}},{name:"webrtc",checkSupport:function(e){if(!document.createElement("video").canPlayType)return!1;var t=e.file,n=e.type;return!!(0,r.isWebRTC)(t,n)}},{name:"dash",checkSupport:function(e){var t=e.file,n=e.type;
//mpd application/dash+xml
return!!(0,r.isDash)(t,n)}},{name:"hls",checkSupport:function(e){var t=document.createElement("video");
//this method from hls.js
//Remove this '!!video.canPlayType('application/vnd.apple.mpegurl')' if you want to use hlsjs.
return function(){var e=function(){if("undefined"!=typeof window)return window.MediaSource||window.WebKitMediaSource}(),t=window.SourceBuffer||window.WebKitSourceBuffer,n=e&&"function"==typeof e.isTypeSupported&&e.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"'),r=!t||t.prototype&&"function"==typeof t.prototype.appendBuffer&&"function"==typeof t.prototype.remove;return!!n&&!!r}()&&!!t.canPlayType("application/vnd.apple.mpegurl")}}];return e.findProviderNameBySource=function(e){OvenPlayerConsole.log("SupportChecker : findProviderNameBySource()",e);for(var n=e===Object(e)?e:{},r=0;r<t.length;r++)if(t[r].checkSupport(n))return t[r].name},e.findProviderNamesByPlaylist=function(t){OvenPlayerConsole.log("SupportChecker : findProviderNamesByPlaylist()",t);for(var n=[],r=t.length;r--;)for(var o=t[r],u="",i=0;i<o.sources.length;i++)if(u=o.sources[i]){var a=e.findProviderNameBySource(u);a&&n.push(a)}return n},e}},
/* 8 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=[]},
/* 9 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});
/**
 * utils for webpack
 */
t.getScriptPath=function(e){for(var t=document.getElementsByTagName("script"),n=0;n<t.length;n++){var r=t[n].src;if(r){var o=r.lastIndexOf("/"+e);if(o>=0)return r.substr(0,o+1)}}return""};
/***/},
/* 10 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});
/**
 * Created by hoho on 2018. 6. 29..
 */
t.version="0.6.5-rev.18bda08";
/***/},
/* 11 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){var t=e,n=[],r=function(e,t,n){var r=0,o=e.length;for(r=0;r<o;r++){var u=e[r];u.listener.apply(u.context||n,t)}};return t.on=function(e,r,o){return(n[e]||(n[e]=[])).push({listener:r,context:o}),t},t.trigger=function(e){if(!n)return!1;var o=[].slice.call(arguments,1),u=n[e],i=n.all;u&&r(u,o,t),i&&r(i,arguments,t)},t.off=function(e,r,o){if(!n)return!1;if(!e&&!r&&!o)return n=[],t;for(var u=e?[e]:Object.keys(n),i=0,a=u.length;i<a;i++){e=u[i];var l=n[e];if(l){var c=n[e]=[];if(r||o)for(var s=0,f=l.length;s<f;s++){var d=l[s];(r&&r!==d.listener&&r!==d.listener.listener&&r!==d.listener._callback||o&&o!==d.context)&&c.push(d)}c.length||delete n[e]}}return t},t.once=function(e,n,r){var o=0,u=function r(){o++||(t.off(e,r),n.apply(t,arguments))};return u._listener=n,t.on(e,u,r)},t}},
/* 12 */
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/,
/* 16 */
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
/* 17 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=u(n(7)),o=u(n(6));function u(e){return e&&e.__esModule?e:{default:e}}
/**
 * @brief   This manages provider.
 * @param
 * */t.default=function(){var e=(0,r.default)(),t={},u={};OvenPlayerConsole.log("ProviderController loaded.");var i=function(e,n){t[e]||(OvenPlayerConsole.log("ProviderController _registerProvider() ",e),t[e]=n)},a={html5:function(){return n.e(/* require.ensure | ovenplayer.provider.html5 */2).then(function(e){var t=n(15).default;return i("html5",t),t}.bind(null,n)).catch(function(e){throw new Error("Network error")})},webrtc:function(){return n.e(/* require.ensure | ovenplayer.provider.HlsProvider */1).then(function(e){var t=n(14).default;return i("webrtc",t),t}.bind(null,n)).catch(function(e){throw new Error("Network error")})},dash:function(){return n.e(/* require.ensure | ovenplayer.provider.DashProvider */0).then(function(e){var r=n(13).default;return t.dash=r,i("dash",r),r}.bind(null,n)).catch(function(e){throw new Error("Network error")})},hls:function(){return n.e(/* require.ensure | ovenplayer.provider.HlsProvider */1).then(function(e){var t=n(12).default;return i("hls",t),t}.bind(null,n)).catch(function(e){throw new Error("Network error")})}};return u.loadProviders=function(t){var n=e.findProviderNamesByPlaylist(t);return OvenPlayerConsole.log("ProviderController loadProviders() ",n),o.default.all(n.filter(function(e){return!!a[e]}).map(function(e){return a[e]()}))},u.findByName=function(e){return OvenPlayerConsole.log("ProviderController findByName() ",e),t[e]},u.getProviderBySource=function(t){var n=e.findProviderNameBySource(t);return OvenPlayerConsole.log("ProviderController getProviderBySource() ",n),u.findByName(n)},u.isSameProvider=function(t,n){return OvenPlayerConsole.log("ProviderController isSameProvider() ",e.findProviderNameBySource(t),e.findProviderNameBySource(n)),e.findProviderNameBySource(t)==e.findProviderNameBySource(n)},u}},
/* 18 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=l(n(0)),u=n(3),i=n(4),a=l(n(7));function l(e){return e&&e.__esModule?e:{default:e}}
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
/* 19 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){var t={},n="";OvenPlayerConsole.log("MediaManager loaded.");var r=function(){return(n=document.createElement("video")).setAttribute("disableRemotePlayback",""),n.setAttribute("webkit-playsinline",""),n.setAttribute("playsinline",""),e.appendChild(n),n};return t.createElement=function(){return OvenPlayerConsole.log("MediaManager createElement()"),n?(e.removeChild(n),r()):r()},t}},
/* 20 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(){var e={},t=null;return window.OvenPlayerConsole={log:window.console.log},e.enable=function(){null!=t&&(OvenPlayerConsole.log=t)},e.disable=function(){t=console.log,OvenPlayerConsole.log=function(){}},e.destroy=function(){window.OvenPlayerConsole=null},e}},
/* 21 */
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
/* 22 */
/***/function(e,t){
/* WEBPACK VAR INJECTION */(function(t){/* globals __webpack_amd_options__ */
e.exports=t;
/* WEBPACK VAR INJECTION */}).call(this,{})
/***/},
/* 23 */
/***/function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],
// module.parent = undefined by default
e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e};
/***/},
/* 24 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(e){return e&&e.__esModule?e:{default:e}}
/**
 * @brief   This initializes the input options.
 * @param   options
 *
 * */(n(0));t.default=function(e){OvenPlayerConsole.log("Configurator loaded.",e);var t=function(e){var t=function(e){return e.slice&&"px"===e.slice(-2)&&(e=e.slice(0,-2)),e};!function(e){Object.keys(e).forEach(function(t){"id"!==t&&(e[t]=function(e){if(void 0===e)return null;if("string"==typeof e&&e.length<6){var t=e.toLowerCase();if("true"===t)return!0;if("false"===t)return!1;if(!isNaN(Number(e))&&!isNaN(parseFloat(e)))return Number(e)}return e}(e[t]))})}(e);var n=r({},{defaultPlaybackRate:1,playbackRateControls:!1,playbackRates:[.25,.5,1,1.5,2],mute:!1,volume:90,width:640,height:360},e);n.width=t(n.width),n.height=t(n.height),n.aspectratio=function(e,t){if(-1===t.toString().indexOf("%"))return 0;if("string"!=typeof e||!e)return 0;if(/^\d*\.?\d+%$/.test(e))return e;var n=e.indexOf(":");if(-1===n)return 0;var r=parseFloat(e.substr(0,n)),o=parseFloat(e.substr(n+1));return r<=0||o<=0?0:o/r*100+"%"}(n.aspectratio,n.width);var u=n.playbackRateControls;if(u){var i=n.playbackRates;Array.isArray(u)&&(i=u),(i=i.filter(function(e){return o.default.isNumber(e)&&e>=.25&&e<=4}).map(function(e){return Math.round(4*e)/4})).indexOf(1)<0&&i.push(1),i.sort(),n.playbackRateControls=!0,n.playbackRates=i}(!n.playbackRateControls||n.playbackRates.indexOf(n.defaultPlaybackRate)<0)&&(n.defaultPlaybackRate=1),n.playbackRate=n.defaultPlaybackRate,n.aspectratio||delete n.aspectratio;var a=n.playlist;if(a)o.default.isArray(a.playlist)&&(n.feedData=a,n.playlist=a.playlist);else{var l=o.default.pick(n,["title","description","type","mediaid","image","file","sources","tracks","preload","duration","host","application","stream"]);n.playlist=[l]}return delete n.duration,n}(e),n=t.aspectratio||"16:9",u=t.debug,i=t.defaultPlaybackRate||1,a=(t.image,t.playbackRateControls||!0),l=t.playbackRates||[.5,1,1.25,1.5,2],c=t.playlist||[],s=t.qualityLabel||"",f=t.repeat||!1,d=t.stretching||"uniform",p={getConfig:function(){return t},getAspectratio:function(){return n},setAspectratio:function(e){n=e},isDebug:function(){return u},getDefaultPlaybackRate:function(){return i},setDefaultPlaybackRate:function(e){return i=e,e},getQualityLabel:function(){return s},setQualityLabel:function(e){s=e},getPlaybackRates:function(){return l},isPlaybackRateControls:function(){return a},getPlaylist:function(){return c},setPlaylist:function(e){return c=o.default.isArray(e)?e:[e]},isRepeat:function(){return f},getStretching:function(){return d}};return p}},
/* 25 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=d(n(24)),o=d(n(11)),u=d(n(21)),i=d(n(20)),a=d(n(19)),l=d(n(18)),c=d(n(17)),s=(d(n(6)),n(2)),f=n(10);function d(e){return e&&e.__esModule?e:{default:e}}
/**
 * @brief   This object connects UI to the provider.
 * @param   {object}    container  dom element
 *
 * */
//import CaptionManager from "api/caption/Manager";
t.default=function(e){var t=(0,i.default)(),n={};(0,o.default)(n),OvenPlayerConsole.log("[[OvenPlayer]] v."+f.version),OvenPlayerConsole.log("API loaded.");
//let captionManager = CaptionManager(that);
var d=(0,a.default)(e),p=(0,l.default)(),v=(0,c.default)(),y="",g="",m="",h=function(e){return v.loadProviders(p.getPlaylist()).then(function(e){y&&(y.destroy(),y=null);var t=d.createElement(),r=function(e){var t=0;if(e)for(var n=0;n<e.length;n++)if(e[n].default&&(t=n),g.getQualityLabel()&&e[n].label===g.getQualityLabel())return n;return t}(p.getCurrentSources());OvenPlayerConsole.log("current source index : "+r),
//This passes the event created by the Provider to API.
(y=e[r](t,g)).on("all",function(e,t){
//Auto next source when player load was fail by amiss source.
if(n.trigger(e,t),e===s.ERROR&&(t.code===s.PLAYER_FILE_ERROR||5===parseInt(t.code/100))||e===s.NETWORK_UNSTABLED){var r=n.getCurrentQuality();r+1<n.getQualityLevels().length&&(
//this sequential has available source.
n.pause(),n.setCurrentQuality(r+1))}})}).then(function(){y.preload(p.getCurrentSources(),e),m.flush(),
//This is no reason to exist anymore.
m.destroy(),n.trigger(s.READY)}).catch(function(e){var t={code:s.INIT_ERROR,reason:"init error.",message:"Player init error.",error:e};n.trigger(s.ERROR,t),
//xxx : If you init empty sources. (I think this is strange case.)
//This works for this case.
//player = OvenPlayer.create("elId", {});
//player.load(soruces);
m.removeAndExcuteOnce("load")})};
/**
     * API 초기화 함수
     * init
     * @param      {object} options player initial option value.
     * @returns
     **/
return n.init=function(e){
//It collects the commands and executes them at the time when they are executable.
m=(0,u.default)(n,["load","play","pause","seek","stop","getDuration","getPosition","getVolume","getMute","getBuffer","getState"]),(g=(0,r.default)(e)).isDebug()||t.disable(),OvenPlayerConsole.log("API : init()"),OvenPlayerConsole.log("API : init() config : ",g),p.setPlaylist(g.getPlaylist()),OvenPlayerConsole.log("API : init() sources : ",p.getCurrentSources()),h()},n.getConfig=function(){return OvenPlayerConsole.log("API : getConfig()",g.getConfig()),g.getConfig()},n.getDuration=function(){return OvenPlayerConsole.log("API : getDuration()",y.getDuration()),y.getDuration()},n.getPosition=function(){return OvenPlayerConsole.log("API : getPosition()",y.getPosition()),y.getPosition()},n.getVolume=function(){return OvenPlayerConsole.log("API : getVolume()",y.getVolume()),y.getVolume()},n.setVolume=function(e){OvenPlayerConsole.log("API : setVolume() "+e),y.setVolume(e)},n.setMute=function(e){return OvenPlayerConsole.log("API : setMute() "+e),y.setMute(e)},n.getMute=function(){return OvenPlayerConsole.log("API : getMute() "+y.getMute()),y.getMute()},n.load=function(e){return OvenPlayerConsole.log("API : load() ",e),m=(0,u.default)(n,["play","seek","stop"]),e&&(y.setCurrentQuality(0),p.setPlaylist(e)),h()},n.play=function(){OvenPlayerConsole.log("API : play() "),y.play()},n.pause=function(){OvenPlayerConsole.log("API : pause() "),y.pause()},n.seek=function(e){OvenPlayerConsole.log("API : seek() "+e),y.seek(e)},n.setPlaybackRate=function(e){return OvenPlayerConsole.log("API : setPlaybackRate() ",e),y.setPlaybackRate(g.setDefaultPlaybackRate(e))},n.getPlaybackRate=function(){return OvenPlayerConsole.log("API : getPlaybackRate() ",y.getPlaybackRate()),y.getPlaybackRate()},n.getQualityLevels=function(){return OvenPlayerConsole.log("API : getQualityLevels() ",y.getQualityLevels()),y.getQualityLevels()},n.getCurrentQuality=function(){return OvenPlayerConsole.log("API : getCurrentQuality() ",y.getCurrentQuality()),y.getCurrentQuality()},n.setCurrentQuality=function(e){OvenPlayerConsole.log("API : setCurrentQuality() ",e);var t=p.getCurrentSources(),r=t[n.getCurrentQuality()],o=t[e],i=n.getPosition(),a=v.isSameProvider(r,o),l=y.setCurrentQuality(e,a);return o?(OvenPlayerConsole.log("API : setCurrentQuality() isSameProvider",a),a||(m=(0,u.default)(n,["play"]),h(i)),l):null},
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
n.getBuffer=function(){OvenPlayerConsole.log("API : getBuffer() ",y.getBuffer()),y.getBuffer()},n.getState=function(){return OvenPlayerConsole.log("API : getState() ",y.getState()),y.getState()},n.stop=function(){OvenPlayerConsole.log("API : stop() "),y.stop()},n.remove=function(){OvenPlayerConsole.log("API : remove() "),m.destroy(),y.destroy(),y=null,v=null,p=null,g=null,n.trigger(s.DESTROY),n.off(),OvenPlayerConsole.log("API : remove() - lazyQueue, currentProvider, providerController, playlistManager, playerConfig, api event destroed. "),t.destroy()},n}},
/* 26 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.checkAndGetContainerElement=void 0;var r=a(n(25)),o=n(3),u=a(n(0)),i=n(9);function a(e){return e&&e.__esModule?e:{default:e}}n.p=(0,i.getScriptPath)("ovenplayer.sdk.js");
/**
 * Main OvenPlayerSDK object
 */
var l=window.OvenPlayerSDK={},c=l.playerList=[],s=t.checkAndGetContainerElement=function(e){if(!e)
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
l.create=function(e,t){var n=s(e),o=(0,r.default)(n);return o.init(t),c.push(o),o},
/**
 * Gets the player instance list.
 *
 * @return     {array}  The player list.
 */
l.getPlayerList=function(){return c},
/**
 * Gets the player instance by container id.
 *
 * @param      {string}  containerId  The container identifier
 * @return     {obeject | null}  The player instance.
 */
l.getPlayerByContainerId=function(e){for(var t=0;t<c.length-1;t++)if(c[t].containerId===e)return c[t];return null},
/**
 * Gets the player instance by index.
 *
 * @param      {number}  index   The index
 * @return     {object | null}  The player instance.
 */
l.getPlayerByIndex=function(e){var t=c[e];return t||null},
/**
 * Generate webrtc source for player source type.
 *
 * @param      {Object | Array}  source   webrtc source
 * @return     {Array}  Player source Obejct.
 */
l.generateWebrtcUrls=function(e){return(u.default.isArray(e)?e:[e]).map(function(e,t){if(e.host&&(0,o.isWebRTC)(e.host)&&e.application&&e.stream)return{file:e.host+"/"+e.application+"/"+e.stream,type:"webrtc",label:e.label?e.label:"webrtc-"+(t+1)}})},t.default=l},
/* 27 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=u(n(1)),o=u(n(5));function u(e){return e&&e.__esModule?e:{default:e}}
/**
 * Created by hoho on 2018. 8. 1..
 */t.default=function(e,t,n){var u=(0,o.default)("#"+t.getId()),i={"click .ovp-context-item":function(e,t,n){e.preventDefault(),window.open("https://github.com/AirenSoft/OvenPlayer","_blank")}};return(0,r.default)(e,"ContextPanel",n,i,function(e,t){var r=e.width(),o=e.height(),i=Math.min(n.pageX-u.offset().left,u.width()-r),a=Math.min(n.pageY-u.offset().top,u.height()-o);e.css("left",i+"px"),e.css("top",a+"px")},function(){
//Do nothing.
})}},
/* 28 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a(n(1)),o=a(n(8)),u=a(n(5)),i=a(n(0));function a(e){return e&&e.__esModule?e:{default:e}}
/**
 * Created by hoho on 2018. 7. 26..
 */t.default=function e(t,n,a){var l=(0,u.default)("#"+n.getId()),c={"click .ovp-setting-main-item":function(r,i,a){r.preventDefault();var l=(0,u.default)(r.currentTarget).attr("ovp-panel-type");
//parent must be not $current!
o.default.push(e(t,n,function(e){var t={title:"",body:[],type:e};if("playbackrate"===e){t.title="Speed";for(var r=n.getConfig().playbackRates,o=n.getPlaybackRate(),u=0;u<r.length;u++){var i={title:1===r[u]?"Normal":r[u],isCheck:o===r[u],value:r[u]};t.body.push(i)}}else if("qualitylevel"===e){t.title="Source";for(var a=n.getQualityLevels(),l=n.getCurrentQuality(),c=0;c<a.length;c++){var s={title:a[c].label,isCheck:l===c,value:c};t.body.push(s)}}return t}(l)))},"click .ovp-setting-title":function(e,t,n){e.preventDefault(),o.default.pop().destroy()},"click .ovp-setting-item-value":function(e,t,r){e.preventDefault();var a=(0,u.default)(e.currentTarget).attr("ovp-panel-type"),l=(0,u.default)(e.currentTarget).attr("ovp-data-value");a&&l&&("playbackrate"===a?n.setPlaybackRate(parseFloat(l)):"qualitylevel"===a&&n.setCurrentQuality(parseInt(l)),
//clear all SettingPanelTemplate
i.default.each(o.default,function(e){e.destroy()}),o.default.splice(0,o.default.length))}};return(0,r.default)(t,"SettingPanel",a,c,function(e,t){220>l.height()&&l.find(".ovp-setting-panel").css("maxHeight","114px")},function(){
//Do nothing.
})}},
/* 29 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=u(n(1)),o=u(n(5));function u(e){return e&&e.__esModule?e:{default:e}}
/**
 * Created by hoho on 2018. 7. 26..
 */t.default=function(e,t){var n=(0,o.default)("#"+t.getId()),u=!1,i={onfullscreenchange:"fullscreenchange",onmozfullscreenchange:"mozfullscreenchange",onwebkitfullscreenchange:"webkitfullscreenchange",MSFullscreenChange:"MSFullscreenChange"},a=function(e){document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement?(n.addClass("ovp-fullscreen"),u=!0):(n.removeClass("ovp-fullscreen"),u=!1)},l=function(){u?document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen():n.get().requestFullscreen?n.get().requestFullscreen():n.get().webkitRequestFullscreen?n.get().webkitRequestFullscreen():n.get().mozRequestFullScreen?n.get().mozRequestFullScreen():n.get().msRequestFullscreen&&n.get().msRequestFullscreen()},c={"click .ovp-fullscreen-button":function(e,t,n){e.preventDefault(),l()}};return(0,r.default)(e,"FullScreenButton",null,c,function(e,t){e.find(".ovp-fullscreen-button-expandicon"),e.find(".ovp-fullscreen-button-compressicon"),
//Bind Global(document) Event
Object.keys(i).forEach(function(e){
//Difference between undefined and null.
//undefined is not support. null is support but not inited.
null===document[e]&&document.addEventListener(i[e],a)})},function(){
//Unbind Global(document) Event
Object.keys(i).forEach(function(e){null===document[e]&&document.removeEventListener(i[e],a)})})}},
/* 30 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){return e&&e.__esModule?e:{default:e}}
/**
 * Created by hoho on 2018. 7. 25..
 */(n(1)),o=n(4);t.default=function(e,t,n){var u="",i="",a=function(e){return(0,o.naturalHms)(e)};return(0,r.default)(e,"TimeDisplay",n,{},function(e,r){u=e.find(".ovp-time-current"),i=e.find(".ovp-time-duration"),n.duration!==1/0&&(i.text(a(n.duration)),t.on("time",function(e){u.text(a(e.position))}))},function(){
//Do nothing.
})}},
/* 31 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a(n(1)),o=a(n(8)),u=n(4),i=a(n(5));n(2);function a(e){return e&&e.__esModule?e:{default:e}}
/**
    * Created by hoho on 2018. 7. 24..
    */
t.default=function(e,t){var n=(0,i.default)("#"+t.getId()),a=0,l=0,c=0,s=!1,f="",d="",p="",v="",y="",g="",m=0,h="",b=function(e){var t=f.width(),n=t*e;p.css("width",n+"px"),v.css("left",n+"px");var r=(t-m)*e;y.css("left",r+"px"),a=n,l=e},_=function(e){var t=f.width()*e;v.css("width",0==e?e:t-a+"px")},P=function(e){var t=f.width()*e;d.css("width",t+"px"),c=e},E=function(e){var t=f.width(),n=f.offset().left,r=(e.pageX-n)/t;return r<0?0:r>1?1:r},O=function(e,n){if(o.default.length>0)h.hide();else{var r=t.getDuration()*e,i=(0,u.naturalHms)(r);h.text(i);var a=h.width(),l=f.width(),c=l*e,s=n.pageX-f.offset().left;h.css("left",(s<a/2?0:l-s<a/2?l-a:c-a/2)+"px")}},C=function(e){t.seek((t.getDuration()||0)*e)},w={"resize window":function(e,t,n){e.preventDefault(),b(l),P(c)},"mouseenter .ovp-progressbar":function(e,t,r){e.preventDefault(),n.addClass("ovp-progressbar-hover"),h.show()},"mouseleave .ovp-progressbar":function(e,t,r){e.preventDefault(),n.removeClass("ovp-progressbar-hover"),h.hide(),_(0)},"mousedown .ovp-progressbar":function(e,t,n){e.preventDefault(),s=!0;var r=E(e);b(r),_(0),C(r)},"mousemove .ovp-progressbar":function(e,t,n){if(e.preventDefault(),!s){var r=E(e);_(r),O(r,e)}},"mousemove document":function(e,t,n){if(e.preventDefault(),s){var r=E(e);b(r),_(0),C(r),O(r,e)}},"mouseup document":function(e,t,r){e.preventDefault(),s&&(s=!1,n.removeClass("ovp-progressbar-hover"))}};return(0,r.default)(e,"ProgressBar",null,w,function(e,n){f=e,d=e.find(".ovp-load-progress"),p=e.find(".ovp-play-progress"),v=e.find(".ovp-hover-progress"),y=e.find(".ovp-progressbar-knob-container"),g=e.find(".ovp-progressbar-knob"),m=g.width(),h=e.find(".ovp-progressbar-time"),t.on("time",function(e){e&&e.duration&&e.position&&b(e.position/e.duration)}),t.on("bufferChanged",function(e){e&&e.bufferPercent&&P(e.bufferPercent/100)})},function(){})}},
/* 32 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(e){return e&&e.__esModule?e:{default:e}}(n(1));
/**
                                                                                                                                                                                                                                                                   * Created by hoho on 2018. 7. 20..
                                                                                                                                                                                                                                                                   */t.default=function(e,t){var n="",u="",i="",a="",l="",c="",s="",f=!1,d=0,p=0,v=function(e){t.getMute()&&(e=0),function(e){l.hide(),c.hide(),s.hide(),e>=50?l.show():e<50&&e>0?c.show():0==e&&s.show()}(e);var n=p*e/100;i.css("left",n+"px"),a.css("width",n+"px")},y=function(e){var t=(e.pageX-u.offset().left)/70*100;return t<0&&(t=0),t>100&&(t=100),t},g={"click .ovp-volume-button":function(e,n,r){e.preventDefault(),0===t.getVolume()?(t.setMute(!1),t.setVolume(100)):t.setMute()},"mouseenter .ovp-volume-button":function(e,t,r){e.preventDefault(),n.addClass("ovp-volume-slider-container-active")},"mouseleave .ovp-volume-silder":function(e,t,n){e.preventDefault(),f=!1},"mousedown .ovp-volume-silder":function(e,n,r){e.preventDefault(),f=!0,t.setMute(!1),t.setVolume(y(e))},"mouseup .ovp-volume-silder":function(e,t,n){e.preventDefault(),f=!1},"mousemove .ovp-volume-silder":function(e,n,r){if(e.preventDefault(),!f)return!1;t.setVolume(y(e))}};return r((0,o.default)(e,"VolumeButton",null,g,function(e,r){n=e.find(".ovp-volume-slider-container"),u=e.find(".ovp-volume-silder"),i=e.find(".ovp-volume-slider-handle"),a=e.find(".ovp-volume-slider-value"),l=e.find(".ovp-volume-button-bigicon"),c=e.find(".ovp-volume-button-smallicon"),s=e.find(".ovp-volume-button-muteicon"),d=i.width(),p=70-d,t.on("ready",function(){v(t.getVolume())}),t.on("volumeChanged",function(e){v(e.volume)}),t.on("mute",function(e){e.mute?v(0):v(t.getVolume())})},function(){}),{setMouseDown:function(e){f=e}})}},
/* 33 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){return e&&e.__esModule?e:{default:e}}
/**
 * Created by hoho on 2018. 7. 24..
 */(n(1)),o=n(2);t.default=function(e,t){var n="",u="",i="",a={"click .ovp-play-button":function(e,n,r){e.preventDefault();var u=t.getState();u===o.STATE_IDLE?t.play():u===o.STATE_PLAYING?t.pause():u===o.STATE_PAUSED?t.play():u===o.STATE_COMPLETE&&t.play()}};return(0,r.default)(e,"PlayButton",null,a,function(e,r){n=e.find(".ovp-play-button-playicon"),u=e.find(".ovp-play-button-pauseicon"),i=e.find(".ovp-play-button-replayicon"),t.on(o.PLAYER_STATE,function(e){e&&e.newstate&&function(e){n.hide(),u.hide(),i.hide(),e===o.STATE_PLAYING?u.show():e===o.STATE_PAUSED?n.show():(o.STATE_COMPLETE,n.show())}(e.newstate)})},function(){
//Do nothing.
})}},
/* 34 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=p(n(1)),o=p(n(33)),u=p(n(32)),i=p(n(31)),a=p(n(30)),l=p(n(29)),c=p(n(28)),s=p(n(8)),f=p(n(0)),d=n(2);function p(e){return e&&e.__esModule?e:{default:e}}
/**
 * Created by hoho on 2018. 7. 20..
 */t.default=function(e,t){var n="",p="",v="",y={"mouseleave .ovp-controls-container":function(e,t,r){e.preventDefault(),n.setMouseDown(!1),t.find(".ovp-volume-slider-container").removeClass("ovp-volume-slider-container-active")},"click .ovp-setting-button":function(e,n,r){e.preventDefault(),
//toggle
s.default.length>0?(
//clear all SettingPanelTemplate
f.default.each(s.default,function(e){e.destroy()}),s.default.splice(0,s.default.length)):s.default.push((0,c.default)(n,t,function(){var e={title:"Settings",isMain:!0,body:[]};if(t.getDuration()!==1/0){var n={title:"Speed",value:1===t.getPlaybackRate()?"Normal":t.getPlaybackRate(),type:"playbackrate"};e.body.push(n)}if(t.getQualityLevels().length>0){var r=t.getQualityLevels(),o=t.getCurrentQuality(),u={title:"Source",value:r[o]?r[o].label:"Default",type:"qualitylevel"};e.body.push(u)}return e}()))}};return(0,r.default)(e,"Controls",null,y,function(e,r){(0,o.default)(e.find(".ovp-left-controls"),t),n=(0,u.default)(e.find(".ovp-left-controls"),t),(0,l.default)(e.find(".ovp-right-controls"),t),t.on(d.CONTENT_META,function(n){!function(n){v&&v.destroy(),v=(0,a.default)(e.find(".ovp-left-controls"),t,n)}(n),n.duration===1/0?
//live
p&&p.destroy():(p&&p.destroy(),p=(0,i.default)(e.find(".ovp-progressbar-container"),t))}),t.on(d.ERROR,function(e){r.destroy()})},function(){
//Do nothing.
})}},
/* 35 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(e){return e&&e.__esModule?e:{default:e}}(n(1));
/**
                                                                                                                                                                                                                                                                   * Created by hoho on 2018. 7. 25..
                                                                                                                                                                                                                                                                   */t.default=function(e,t){var n="";return r((0,o.default)(e,"Spinner",null,{},function(e,t){n=e},function(){
//Do nothing.
}),{show:function(e){e?n.show():n.hide()}})}},
/* 36 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){return e&&e.__esModule?e:{default:e}}
/**
 * Created by hoho on 2018. 7. 24..
 */(n(1));n(2);t.default=function(e,t,n,o){var u="",i={"click .ovp-message-text":function(e,t,n){e.preventDefault(),u&&clearTimeout(u),n.destroy()}};return(0,r.default)(e,"MessageBox",n,i,function(e,t){o&&(u=setTimeout(function(){t.destroy()},o||5e3))},function(){})}},
/* 37 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){return e&&e.__esModule?e:{default:e}}
/**
 * Created by hoho on 2018. 7. 24..
 */(n(1));n(2);t.default=function(e,t,n){return(0,r.default)(e,"BigButton",n,{},function(e,t,n){
//Do nothing!
},function(){
//Do nothing!
})}},
/* 38 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=l(n(1)),o=l(n(37)),u=l(n(36)),i=l(n(35)),a=n(2);function l(e){return e&&e.__esModule?e:{default:e}}
/**
    * Created by hoho on 2018. 7. 24..
    */
t.default=function(e,t){var n="",l="",c="";return(0,r.default)(e,"Helper",null,{},function(e,r){var s=function(r){n&&n.destroy(),n=(0,o.default)(e,t,r)},f=function(n,r){l&&l.destroy(),l=(0,u.default)(e,t,n,r)};c=(0,i.default)(e,t),t.on(a.READY,function(){s(a.STATE_PAUSED)}),t.on(a.PLAYER_STATE,function(e){e&&e.newstate&&(e.newstate===a.STATE_PLAYING?(n.destroy(),c.show(!1)):(s(e.newstate),e.newstate===a.STATE_STALLED||e.newstate===a.STATE_LOADING?c.show(!0):c.show(!1)))}),t.on(a.ERROR,function(e){var t="";t=100===e.code?"Initialization failed.":301===e.code?"Media playback was canceled.":302===e.code?"Some of the media could not be downloaded due to a network error.":303===e.code?"Unable to load media. This may be due to a server or network error, or due to an unsupported format.":304===e.code?"Media playback has been canceled. It looks like your media is corrupted or your browser does not support the features your media uses.":5===parseInt(e.code/100)?"Connection with low-latency server failed.":"Can not play due to unknown reasons.",f(t,null)}),t.on(a.NETWORK_UNSTABLED,function(e){var n="Because the network connection is unstable, the following media source will be played.";t.getCurrentQuality()+1===t.getQualityLevels().length&&(n="Network connection is unstable. Check the network connection."),f(n,5e3)})},function(){
//Do nothing.
})}},
/* 39 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(){window.Element&&!Element.prototype.closest&&(Element.prototype.closest=function(e){var t,n=(this.document||this.ownerDocument).querySelectorAll(e),r=this;do{for(t=n.length;--t>=0&&n.item(t)!==r;);}while(t<0&&(r=r.parentElement));return r})}},
/* 40 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.settingValueTemplate=t.settingItemTemplate=void 0;var r=function(e){return e&&e.__esModule?e:{default:e}}(n(0));t.default=function(e){var t='<div class="ovp-setting-panel '+(e.isMain?"animated fadeIn":"")+'"><div class="ovp-setting-title-container"><div class="ovp-setting-title" tabindex="0">'+(e.isMain?"":'<span class="ovp-setting-title-previcon">&lt;</span>')+'<span class="ovp-setting-title-title">'+e.title+'</span></div></div><div class="ovp-setting-item-container">';return r.default.forEach(e.body,function(n){e.isMain?t+=o(n.title,n.value,n.type):t+=u(n.title,n.value,e.type,n.isCheck)}),t+="</div></div>"};var o=t.settingItemTemplate=function(e,t,n){return'<div class="ovp-setting-item ovp-setting-main-item" ovp-panel-type="'+n+'"><span class="ovp-setting-item-title">'+e+'</span><span class="ovp-setting-item-nexticon">&gt;</span><span class="ovp-setting-item-value">'+t+"</span></div>"},u=t.settingValueTemplate=function(e,t,n,r){return'<div class="ovp-setting-item ovp-setting-item-value" ovp-panel-type="'+n+'" ovp-data-value="'+t+'"><span class="ovp-setting-item-checked '+(r?"ovp-show":"")+'">&#x2713;</span><span class="ovp-setting-item-title">'+e+"</span></div>"}},
/* 41 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return'<button class="ovp-button ovp-fullscreen-button"><i class="ovp-fullscreen-button-expandicon"></i><i class="ovp-fullscreen-button-compressicon"></i></button>'}},
/* 42 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return'<div class="ovp-time-display">'+(e.duration===1/0?'<button class="ovp-live-badge ovp-button" disabled="disabled">'+("webrtc"==e.type?'<span class="ovp-live-badge-lowlatency">low latency live</span>':"<span>live</span>")+"</button>":'<span class="ovp-time-current">0:00</span><span class="ovp-time-separator"> / </span><span class="ovp-time-duration">0:00</span>')+"</div>"}},
/* 43 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return'<button class="ovp-button ovp-play-button" type="button"><i class="ovp-play-button-playicon"></i><i class="ovp-play-button-pauseicon"></i><i class="ovp-play-button-replayicon"></i></button>'}},
/* 44 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return'<div class="ovp-progressbar" tabindex="0"><div class="ovp-progressbar-padding"></div><div class="ovp-progress-list"><div class="ovp-load-progress"></div><div class="ovp-play-progress ovp-play-background-color"></div><div class="ovp-hover-progress"></div></div><div class="ovp-progressbar-knob-container"><div class="ovp-progressbar-knob ovp-play-background-color"></div></div><span class="ovp-progressbar-time">0:00</span></div>'}},
/* 45 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),
/**
 * Created by hoho on 2018. 7. 20..
 */
t.default=function(){return'<div class="ovp-volume-controller"><button class="ovp-button ovp-volume-button"><i class="ovp-volume-button-bigicon"></i><i class="ovp-volume-button-smallicon"></i><i class="ovp-volume-button-muteicon"></i></button><div class="ovp-volume-slider-container"><div class="ovp-volume-silder"><div class="ovp-volume-slider-bg"></div><div class="ovp-volume-slider-value"></div><div class="ovp-volume-slider-handle"></div></div></div></div>'}},
/* 46 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(){return'<div class="ovp-controls"><div class="ovp-gradient-bottom"></div><div class="ovp-bottom-panel">    <div class="ovp-progressbar-container">    </div>    <div class="ovp-controls-container">        <div class="ovp-left-controls">        </div>        <div class="ovp-right-controls">               <button class="ovp-button ovp-setting-button"><i class="ovp-setting-button-icon"></i></button>        </div>    </div></div>'}},
/* 47 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(10);t.default=function(){return'<div class="ovp-context-panel animated fadeIn"><div class="ovp-context-item" tabindex="0"><span class="ovp-context-item-text">Help</span></div><div class="ovp-context-item" tabindex="1"><span class="ovp-context-item-text">About OvenPlayer '+r.version+"</span></div></div>"}},
/* 48 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return'<div class="ovp-spinner-container"><div class="ovp-spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>'}},
/* 49 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return'<div class="ovp-message-box animated shake"><div class="ovp-message-container"><span class="ovp-message-text">'+e+"</span></div></div>"}},
/* 50 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(2);t.default=function(e){return'<div class="ovp-bigbutton-container ">'+(//animated bounceIn
e===r.STATE_PLAYING?'<i class="ovp-bigbutton ovp-bigbutton-pause"></i>':"")+(e===r.STATE_PAUSED?'<i class="ovp-bigbutton ovp-bigbutton-play"></i>':"")+(e===r.STATE_COMPLETE?'<i class="ovp-bigbutton ovp-bigbutton-replay"></i>':"")+"</div>"}},
/* 51 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){return'<div class="ovp-helper"></div>'}},
/* 52 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){return'<div class="ovenplayer ovp-wrapper" tabindex="-1" aria-label="" id="'+e+'"><div class="ovp-ratio"></div><div class="ovp-player"><div class="ovp-media-element-container"></div><div class="ovp-ui"></div></div></div>'}},
/* 53 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){return'<div class="textView" style="padding : 5px; background: red"><h3>'+e+'</h3><button type="button" class="btn">닫기</button></div>'}},
/* 54 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=m(n(53)),o=m(n(52)),u=m(n(51)),i=m(n(50)),a=m(n(49)),l=m(n(48)),c=m(n(47)),s=m(n(46)),f=m(n(45)),d=m(n(44)),p=m(n(43)),v=m(n(42)),y=m(n(41)),g=m(n(40));function m(e){return e&&e.__esModule?e:{default:e}}
/**
 * Created by hoho on 2018. 7. 20..
 */var h={TextViewTemplate:r.default,ViewTemplate:o.default,HelperTemplate:u.default,BigButtonTemplate:i.default,MessageBoxTemplate:a.default,SpinnerTemplate:l.default,ContextPanelTemplate:c.default,ControlsTemplate:s.default,VolumeButtonTemplate:f.default,ProgressBarTemplate:d.default,PlayButtonTemplate:p.default,TimeDisplayTemplate:v.default,FullScreenButtonTemplate:y.default,SettingPanelTemplate:g.default};t.default=h},
/* 55 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=d(n(1)),u=d(n(38)),i=d(n(34)),a=d(n(8)),l=d(n(27)),c=d(n(5)),s=d(n(0)),f=n(2);
/**
                                                                                                                                                                                                                                                                   * Created by hoho on 2018. 7. 20..
                                                                                                                                                                                                                                                                   */function d(e){return e&&e.__esModule?e:{default:e}}t.default=function(e){var t=void 0,n="",d="",p="",v=function(e,n){if(p&&(clearTimeout(p),p=null),e){if(a.default.length>0)return!1;t.addClass("ovp-autohide")}else t.removeClass("ovp-autohide"),n&&(p=setTimeout(function(){if(a.default.length>0)return!1;t.addClass("ovp-autohide")},1800))},y=function(){var e=d.getState();e===f.STATE_IDLE||e===f.STATE_PAUSED||e===f.STATE_COMPLETE?d.play():e===f.STATE_PLAYING&&d.pause()},g=function(e,t){var n=d.getDuration(),r=d.getPosition(),o=0;o=t?Math.max(r-e,0):Math.min(r+e,n),d.seek(o)},m=function(e){var t=d.getVolume(),n=0;n=e?Math.min(t+5,100):Math.max(t-5,0),d.setVolume(n)},h={"click .ovenplayer":function(e,t,r){if(e.preventDefault(),n)return n.destroy(),n=null,!1;(0,c.default)(e.target).closest(".ovp-controls")||(0,c.default)(e.target).closest(".ovp-setting-panel")||y(),!(0,c.default)(e.target).closest(".ovp-setting-panel")&&!(0,c.default)(e.target).closest(".ovp-setting-button")&&a.default.length>0&&(
//clear all SettingPanelTemplate
s.default.each(a.default,function(e){e.destroy()}),a.default.splice(0,a.default.length))},"mouseenter .ovenplayer":function(e,t,n){e.preventDefault(),d.getState()===f.STATE_PLAYING?v(!1,!0):v(!1)},"mousemove .ovenplayer":function(e,t,n){e.preventDefault(),d.getState()===f.STATE_PLAYING?v(!1,!0):v(!1)},"mouseleave .ovenplayer":function(e,t,n){e.preventDefault(),d.getState()===f.STATE_PLAYING&&v(!0)},"keydown .ovenplayer":function(e,t,n){switch(e.keyCode){case 32:
//sapce
e.preventDefault(),y();break;case 37:
//arrow left
e.preventDefault(),g(5,!0);break;case 39:
//arrow right
e.preventDefault(),g(5,!1);break;case 38:
//arrow up
e.preventDefault(),m(!0);break;case 40:
//arrow up
e.preventDefault(),m(!1)}},"contextmenu .ovenplayer":function(e,r,o){return e.preventDefault(),function(e,r){n&&(n.destroy(),n=null),n=(0,l.default)(t,d,{pageX:e,pageY:r})}(e.pageX,e.pageY),!1}};return r((0,o.default)(e,"View",e.id,h,function(e,n){t=e},function(){
//Do nothing.
},!0),{getMediaElementContainer:function(){return t.find(".ovp-media-element-container").get()},setApi:function(e){d=e,(0,u.default)(t,e),(0,i.default)(t,e),d.on(f.PLAYER_STATE,function(e){e&&e.newstate&&(e.newstate===f.STATE_PLAYING?v(!1,!0):v(!1))})}})}},
/* 56 */
/***/function(e,t,n){"use strict";var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=n(26),u=l(o),i=l(n(55)),a=n(9);function l(e){return e&&e.__esModule?e:{default:e}}n.p=(0,a.getScriptPath)("ovenplayer.js");var c={};window.OvenPlayer=c,
/**
 * Copy properties from OvenPlayerSDK object to OvenPlayer object
 */
r(c,u.default),c.create=function(e,t){var n=(0,o.checkAndGetContainerElement)(e),a=(0,i.default)(n),l=u.default.create(a.getMediaElementContainer(),t);
/*const view = new View();
     view.appendPlayerMarkup(containerElement);
     const playerInstance = OvenPlayerSDK.create(view.getMediaElementContainer(), options);
      view.addComponentsAndFunctions(playerInstance, options);*/
//console.log(containerElement);
return r(l,{getId:function(){return n.id}}),a.setApi(l),l}}
/******/]);
//# sourceMappingURL=ovenplayer.js.map