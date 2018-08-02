/*! For license information please see ovenplayer.js.LICENSE */
/*! OvenPlayerv0.6.6 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
/******/!function(e){// webpackBootstrap
/******/ // install a JSONP callback for chunk loading
/******/function t(t){
/******/for(
/******/var n,r,i=t[0],a=t[1],u=0,s=[]
/******/;u<i.length;u++)
/******/r=i[u],
/******/o[r]&&
/******/s.push(o[r][0])
/******/,o[r]=0;
/******/for(n in a)
/******/Object.prototype.hasOwnProperty.call(a,n)&&(
/******/e[n]=a[n])
/******/;
/******/
/******/
/******/for(l&&l(t);s.length;)
/******/s.shift()();
/******/
/******/
/******/}
/******/
/******/
/******/ // The module cache
/******/var n={},o={
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
/******/function r(t){
/******/
/******/ // Check if module is in cache
/******/if(n[t])
/******/return n[t].exports;
/******/
/******/ // Create a new module (and put it into the cache)
/******/var o=n[t]={
/******/i:t,
/******/l:!1,
/******/exports:{}
/******/};
/******/
/******/ // Execute the module function
/******/
/******/
/******/ // Return the exports of the module
/******/return e[t].call(o.exports,o,o.exports,r),
/******/
/******/ // Flag the module as loaded
/******/o.l=!0,o.exports;
/******/}
/******/
/******/ // This file contains only the entry chunk.
/******/ // The chunk loading function for additional chunks
/******/r.e=function(e){
/******/var t=[],n=o[e];
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
/******/var i=new Promise(function(t,r){
/******/n=o[e]=[t,r];
/******/});
/******/t.push(n[2]=i);
/******/
/******/ // start chunk loading
/******/var a,u=document.getElementsByTagName("head")[0],l=document.createElement("script");
/******/
/******/
/******/l.charset="utf-8",
/******/l.timeout=120,
/******/r.nc&&
/******/l.setAttribute("nonce",r.nc)
/******/,l.src=
/******/
/******/
/******/
/******/ // script path function
/******/function(e){
/******/return r.p+""+({0:"ovenplayer.provider.DashProvider",1:"ovenplayer.provider.HlsProvider",2:"ovenplayer.provider.html5"}[e]||e)+".js"
/******/}(e),
/******/
/******/a=function(t){
/******/ // avoid mem leaks in IE.
/******/l.onerror=l.onload=null,
/******/clearTimeout(s);
/******/var n=o[e];
/******/if(0!==n){
/******/if(n){
/******/var r=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src,a=new Error("Loading chunk "+e+" failed.\n("+r+": "+i+")");
/******/
/******/a.type=r,
/******/a.request=i,
/******/n[1](a)}
/******/o[e]=void 0}
/******/};
/******/var s=setTimeout(function(){
/******/a({type:"timeout",target:l});
/******/},12e4);
/******/l.onerror=l.onload=a,
/******/u.appendChild(l)}
/******/
/******/return Promise.all(t);
/******/},
/******/
/******/ // expose the modules object (__webpack_modules__)
/******/r.m=e,
/******/
/******/ // expose the module cache
/******/r.c=n,
/******/
/******/ // define getter function for harmony exports
/******/r.d=function(e,t,n){
/******/r.o(e,t)||
/******/Object.defineProperty(e,t,{enumerable:!0,get:n})
/******/},
/******/
/******/ // define __esModule on exports
/******/r.r=function(e){
/******/"undefined"!=typeof Symbol&&Symbol.toStringTag&&
/******/Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})
/******/,Object.defineProperty(e,"__esModule",{value:!0})},
/******/
/******/ // create a fake namespace object
/******/ // mode & 1: value is a module id, require it
/******/ // mode & 2: merge all properties of value into the ns
/******/ // mode & 4: return value when already ns object
/******/ // mode & 8|1: behave like require
/******/r.t=function(e,t){
/******/if(
/******/1&t&&(e=r(e)),8&t)return e;
/******/if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;
/******/var n=Object.create(null);
/******/
/******/if(r.r(n),
/******/Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));
/******/return n;
/******/},
/******/
/******/ // getDefaultExport function for compatibility with non-harmony modules
/******/r.n=function(e){
/******/var t=e&&e.__esModule?
/******/function(){return e.default}:
/******/function(){return e};
/******/
/******/return r.d(t,"a",t),t;
/******/},
/******/
/******/ // Object.prototype.hasOwnProperty.call
/******/r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},
/******/
/******/ // __webpack_public_path__
/******/r.p="",
/******/
/******/ // on error function for async loading
/******/r.oe=function(e){throw console.error(e),e};
/******/
/******/var i=window.webpackJsonp=window.webpackJsonp||[],a=i.push.bind(i);
/******/
/******/i.push=t,
/******/i=i.slice();
/******/for(var u=0;u<i.length;u++)t(i[u]);
/******/var l=a;
/******/
/******/
/******/ // Load entry module and return exports
/******/r(r.s=73);
/******/}
/************************************************************************/
/******/([
/* 0 */
/***/function(e,t,n){"use strict";
/* WEBPACK VAR INJECTION */
/* WEBPACK VAR INJECTION */(function(e,o){var r,i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(){var a="object"==("undefined"==typeof self?"undefined":i(self))&&self.self===self&&self||"object"==(void 0===e?"undefined":i(e))&&e.global===e&&e||this||{},u=a._,l=Array.prototype,s=Object.prototype,c="undefined"!=typeof Symbol?Symbol.prototype:null,p=l.push,f=l.slice,d=s.toString,v=s.hasOwnProperty,b=Array.isArray,g=Object.keys,m=Object.create,y=function(){},h=function e(t){return t instanceof e?t:this instanceof e?void(this._wrapped=t):new e(t)};void 0===t||t.nodeType?a._=h:(void 0!==o&&!o.nodeType&&o.exports&&(t=o.exports=h),t._=h),h.VERSION="1.9.1";var w,x=function(e,t,n){if(void 0===t)return e;switch(null==n?3:n){case 1:return function(n){return e.call(t,n)};case 3:return function(n,o,r){return e.call(t,n,o,r)};case 4:return function(n,o,r,i){return e.call(t,n,o,r,i)}}return function(){return e.apply(t,arguments)}},_=function(e,t,n){return h.iteratee!==w?h.iteratee(e,t):null==e?h.identity:h.isFunction(e)?x(e,t,n):h.isObject(e)&&!h.isArray(e)?h.matcher(e):h.property(e)};h.iteratee=w=function(e,t){return _(e,t,1/0)};var k=function(e,t){return t=null==t?e.length-1:+t,function(){for(var n=Math.max(arguments.length-t,0),o=Array(n),r=0;r<n;r++)o[r]=arguments[r+t];switch(t){case 0:return e.call(this,o);case 1:return e.call(this,arguments[0],o);case 2:return e.call(this,arguments[0],arguments[1],o)}var i=Array(t+1);for(r=0;r<t;r++)i[r]=arguments[r];return i[t]=o,e.apply(this,i)}},P=function(e){if(!h.isObject(e))return{};if(m)return m(e);y.prototype=e;var t=new y;return y.prototype=null,t},E=function(e){return function(t){return null==t?void 0:t[e]}},O=function(e,t){return null!=e&&v.call(e,t)},C=function(e,t){for(var n=t.length,o=0;o<n;o++){if(null==e)return;e=e[t[o]]}return n?e:void 0},T=Math.pow(2,53)-1,A=E("length"),R=function(e){var t=A(e);return"number"==typeof t&&0<=t&&t<=T};h.each=h.forEach=function(e,t,n){var o,r;if(t=x(t,n),R(e))for(o=0,r=e.length;o<r;o++)t(e[o],o,e);else{var i=h.keys(e);for(o=0,r=i.length;o<r;o++)t(e[i[o]],i[o],e)}return e},h.map=h.collect=function(e,t,n){t=_(t,n);for(var o=!R(e)&&h.keys(e),r=(o||e).length,i=Array(r),a=0;a<r;a++){var u=o?o[a]:a;i[a]=t(e[u],u,e)}return i};var S=function(e){return function(t,n,o,r){var i=3<=arguments.length;return function(t,n,o,r){var i=!R(t)&&h.keys(t),a=(i||t).length,u=0<e?0:a-1;for(r||(o=t[i?i[u]:u],u+=e);0<=u&&u<a;u+=e){var l=i?i[u]:u;o=n(o,t[l],l,t)}return o}(t,x(n,r,4),o,i)}};h.reduce=h.foldl=h.inject=S(1),h.reduceRight=h.foldr=S(-1),h.find=h.detect=function(e,t,n){var o=(R(e)?h.findIndex:h.findKey)(e,t,n);if(void 0!==o&&-1!==o)return e[o]},h.filter=h.select=function(e,t,n){var o=[];return t=_(t,n),h.each(e,function(e,n,r){t(e,n,r)&&o.push(e)}),o},h.reject=function(e,t,n){return h.filter(e,h.negate(_(t)),n)},h.every=h.all=function(e,t,n){t=_(t,n);for(var o=!R(e)&&h.keys(e),r=(o||e).length,i=0;i<r;i++){var a=o?o[i]:i;if(!t(e[a],a,e))return!1}return!0},h.some=h.any=function(e,t,n){t=_(t,n);for(var o=!R(e)&&h.keys(e),r=(o||e).length,i=0;i<r;i++){var a=o?o[i]:i;if(t(e[a],a,e))return!0}return!1},h.contains=h.includes=h.include=function(e,t,n,o){return R(e)||(e=h.values(e)),("number"!=typeof n||o)&&(n=0),0<=h.indexOf(e,t,n)},h.invoke=k(function(e,t,n){var o,r;return h.isFunction(t)?r=t:h.isArray(t)&&(o=t.slice(0,-1),t=t[t.length-1]),h.map(e,function(e){var i=r;if(!i){if(o&&o.length&&(e=C(e,o)),null==e)return;i=e[t]}return null==i?i:i.apply(e,n)})}),h.pluck=function(e,t){return h.map(e,h.property(t))},h.where=function(e,t){return h.filter(e,h.matcher(t))},h.findWhere=function(e,t){return h.find(e,h.matcher(t))},h.max=function(e,t,n){var o,r,a=-1/0,u=-1/0;if(null==t||"number"==typeof t&&"object"!=i(e[0])&&null!=e)for(var l=0,s=(e=R(e)?e:h.values(e)).length;l<s;l++)null!=(o=e[l])&&a<o&&(a=o);else t=_(t,n),h.each(e,function(e,n,o){r=t(e,n,o),(u<r||r===-1/0&&a===-1/0)&&(a=e,u=r)});return a},h.min=function(e,t,n){var o,r,a=1/0,u=1/0;if(null==t||"number"==typeof t&&"object"!=i(e[0])&&null!=e)for(var l=0,s=(e=R(e)?e:h.values(e)).length;l<s;l++)null!=(o=e[l])&&o<a&&(a=o);else t=_(t,n),h.each(e,function(e,n,o){((r=t(e,n,o))<u||r===1/0&&a===1/0)&&(a=e,u=r)});return a},h.shuffle=function(e){return h.sample(e,1/0)},h.sample=function(e,t,n){if(null==t||n)return R(e)||(e=h.values(e)),e[h.random(e.length-1)];var o=R(e)?h.clone(e):h.values(e),r=A(o);t=Math.max(Math.min(t,r),0);for(var i=r-1,a=0;a<t;a++){var u=h.random(a,i),l=o[a];o[a]=o[u],o[u]=l}return o.slice(0,t)},h.sortBy=function(e,t,n){var o=0;return t=_(t,n),h.pluck(h.map(e,function(e,n,r){return{value:e,index:o++,criteria:t(e,n,r)}}).sort(function(e,t){var n=e.criteria,o=t.criteria;if(n!==o){if(o<n||void 0===n)return 1;if(n<o||void 0===o)return-1}return e.index-t.index}),"value")};var M=function(e,t){return function(n,o,r){var i=t?[[],[]]:{};return o=_(o,r),h.each(n,function(t,r){var a=o(t,r,n);e(i,t,a)}),i}};h.groupBy=M(function(e,t,n){O(e,n)?e[n].push(t):e[n]=[t]}),h.indexBy=M(function(e,t,n){e[n]=t}),h.countBy=M(function(e,t,n){O(e,n)?e[n]++:e[n]=1});var j=/[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;h.toArray=function(e){return e?h.isArray(e)?f.call(e):h.isString(e)?e.match(j):R(e)?h.map(e,h.identity):h.values(e):[]},h.size=function(e){return null==e?0:R(e)?e.length:h.keys(e).length},h.partition=M(function(e,t,n){e[n?0:1].push(t)},!0),h.first=h.head=h.take=function(e,t,n){return null==e||e.length<1?null==t?void 0:[]:null==t||n?e[0]:h.initial(e,e.length-t)},h.initial=function(e,t,n){return f.call(e,0,Math.max(0,e.length-(null==t||n?1:t)))},h.last=function(e,t,n){return null==e||e.length<1?null==t?void 0:[]:null==t||n?e[e.length-1]:h.rest(e,Math.max(0,e.length-t))},h.rest=h.tail=h.drop=function(e,t,n){return f.call(e,null==t||n?1:t)},h.compact=function(e){return h.filter(e,Boolean)};var N=function e(t,n,o,r){for(var i=(r=r||[]).length,a=0,u=A(t);a<u;a++){var l=t[a];if(R(l)&&(h.isArray(l)||h.isArguments(l)))if(n)for(var s=0,c=l.length;s<c;)r[i++]=l[s++];else e(l,n,o,r),i=r.length;else o||(r[i++]=l)}return r};h.flatten=function(e,t){return N(e,t,!1)},h.without=k(function(e,t){return h.difference(e,t)}),h.uniq=h.unique=function(e,t,n,o){h.isBoolean(t)||(o=n,n=t,t=!1),null!=n&&(n=_(n,o));for(var r=[],i=[],a=0,u=A(e);a<u;a++){var l=e[a],s=n?n(l,a,e):l;t&&!n?(a&&i===s||r.push(l),i=s):n?h.contains(i,s)||(i.push(s),r.push(l)):h.contains(r,l)||r.push(l)}return r},h.union=k(function(e){return h.uniq(N(e,!0,!0))}),h.intersection=function(e){for(var t=[],n=arguments.length,o=0,r=A(e);o<r;o++){var i=e[o];if(!h.contains(t,i)){var a;for(a=1;a<n&&h.contains(arguments[a],i);a++);a===n&&t.push(i)}}return t},h.difference=k(function(e,t){return t=N(t,!0,!0),h.filter(e,function(e){return!h.contains(t,e)})}),h.zip=k(h.unzip=function(e){for(var t=e&&h.max(e,A).length||0,n=Array(t),o=0;o<t;o++)n[o]=h.pluck(e,o);return n}),h.object=function(e,t){for(var n={},o=0,r=A(e);o<r;o++)t?n[e[o]]=t[o]:n[e[o][0]]=e[o][1];return n};var L=function(e){return function(t,n,o){n=_(n,o);for(var r=A(t),i=0<e?0:r-1;0<=i&&i<r;i+=e)if(n(t[i],i,t))return i;return-1}};h.findIndex=L(1),h.findLastIndex=L(-1);var z=function(e,t,n){return function(o,r,i){var a=0,u=A(o);if("number"==typeof i)0<e?a=0<=i?i:Math.max(i+u,a):u=0<=i?Math.min(i+1,u):i+u+1;else if(n&&i&&u)return o[i=n(o,r)]===r?i:-1;if(r!=r)return 0<=(i=t(f.call(o,a,u),h.isNaN))?i+a:-1;for(i=0<e?a:u-1;0<=i&&i<u;i+=e)if(o[i]===r)return i;return-1}};h.indexOf=z(1,h.findIndex,h.sortedIndex=function(e,t,n,o){for(var r=(n=_(n,o,1))(t),i=0,a=A(e);i<a;){var u=Math.floor((i+a)/2);n(e[u])<r?i=u+1:a=u}return i}),h.lastIndexOf=z(-1,h.findLastIndex),h.range=function(e,t,n){null==t&&(t=e||0,e=0),n||(n=t<e?-1:1);for(var o=Math.max(Math.ceil((t-e)/n),0),r=Array(o),i=0;i<o;i++,e+=n)r[i]=e;return r},h.chunk=function(e,t){if(null==t||t<1)return[];for(var n=[],o=0,r=e.length;o<r;)n.push(f.call(e,o,o+=t));return n};var I=function(e,t,n,o,r){if(!(o instanceof t))return e.apply(n,r);var i=P(e.prototype),a=e.apply(i,r);return h.isObject(a)?a:i};h.bind=k(function(e,t,n){if(!h.isFunction(e))throw new TypeError("Bind must be called on a function");var o=k(function(r){return I(e,o,t,this,n.concat(r))});return o}),((h.partial=k(function(e,t){var n=h.partial.placeholder;return function o(){for(var r=0,i=t.length,a=Array(i),u=0;u<i;u++)a[u]=t[u]===n?arguments[r++]:t[u];for(;r<arguments.length;)a.push(arguments[r++]);return I(e,o,this,this,a)}})).placeholder=h).bindAll=k(function(e,t){var n=(t=N(t,!1,!1)).length;if(n<1)throw new Error("bindAll must be passed function names");for(;n--;){var o=t[n];e[o]=h.bind(e[o],e)}}),h.memoize=function(e,t){var n=function n(o){var r=n.cache,i=""+(t?t.apply(this,arguments):o);return O(r,i)||(r[i]=e.apply(this,arguments)),r[i]};return n.cache={},n},h.delay=k(function(e,t,n){return setTimeout(function(){return e.apply(null,n)},t)}),h.defer=h.partial(h.delay,h,1),h.throttle=function(e,t,n){var o,r,i,a,u=0;n||(n={});var l=function(){u=!1===n.leading?0:h.now(),o=null,a=e.apply(r,i),o||(r=i=null)},s=function(){var s=h.now();u||!1!==n.leading||(u=s);var c=t-(s-u);return r=this,i=arguments,c<=0||t<c?(o&&(clearTimeout(o),o=null),u=s,a=e.apply(r,i),o||(r=i=null)):o||!1===n.trailing||(o=setTimeout(l,c)),a};return s.cancel=function(){clearTimeout(o),u=0,o=r=i=null},s},h.debounce=function(e,t,n){var o,r,i=function(t,n){o=null,n&&(r=e.apply(t,n))},a=k(function(a){if(o&&clearTimeout(o),n){var u=!o;o=setTimeout(i,t),u&&(r=e.apply(this,a))}else o=h.delay(i,t,this,a);return r});return a.cancel=function(){clearTimeout(o),o=null},a},h.wrap=function(e,t){return h.partial(t,e)},h.negate=function(e){return function(){return!e.apply(this,arguments)}},h.compose=function(){var e=arguments,t=e.length-1;return function(){for(var n=t,o=e[t].apply(this,arguments);n--;)o=e[n].call(this,o);return o}},h.after=function(e,t){return function(){if(--e<1)return t.apply(this,arguments)}},h.once=h.partial(h.before=function(e,t){var n;return function(){return 0<--e&&(n=t.apply(this,arguments)),e<=1&&(t=null),n}},2),h.restArguments=k;var D=!{toString:null}.propertyIsEnumerable("toString"),B=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"],F=function(e,t){var n=B.length,o=e.constructor,r=h.isFunction(o)&&o.prototype||s,i="constructor";for(O(e,i)&&!h.contains(t,i)&&t.push(i);n--;)(i=B[n])in e&&e[i]!==r[i]&&!h.contains(t,i)&&t.push(i)};h.keys=function(e){if(!h.isObject(e))return[];if(g)return g(e);var t=[];for(var n in e)O(e,n)&&t.push(n);return D&&F(e,t),t},h.allKeys=function(e){if(!h.isObject(e))return[];var t=[];for(var n in e)t.push(n);return D&&F(e,t),t},h.values=function(e){for(var t=h.keys(e),n=t.length,o=Array(n),r=0;r<n;r++)o[r]=e[t[r]];return o},h.mapObject=function(e,t,n){t=_(t,n);for(var o=h.keys(e),r=o.length,i={},a=0;a<r;a++){var u=o[a];i[u]=t(e[u],u,e)}return i},h.pairs=function(e){for(var t=h.keys(e),n=t.length,o=Array(n),r=0;r<n;r++)o[r]=[t[r],e[t[r]]];return o},h.invert=function(e){for(var t={},n=h.keys(e),o=0,r=n.length;o<r;o++)t[e[n[o]]]=n[o];return t},h.functions=h.methods=function(e){var t=[];for(var n in e)h.isFunction(e[n])&&t.push(n);return t.sort()};var U=function(e,t){return function(n){var o=arguments.length;if(t&&(n=Object(n)),o<2||null==n)return n;for(var r=1;r<o;r++)for(var i=arguments[r],a=e(i),u=a.length,l=0;l<u;l++){var s=a[l];t&&void 0!==n[s]||(n[s]=i[s])}return n}};h.extend=U(h.allKeys),h.extendOwn=h.assign=U(h.keys),h.findKey=function(e,t,n){t=_(t,n);for(var o,r=h.keys(e),i=0,a=r.length;i<a;i++)if(t(e[o=r[i]],o,e))return o};var Y,Q,W=function(e,t,n){return t in n};h.pick=k(function(e,t){var n={},o=t[0];if(null==e)return n;h.isFunction(o)?(1<t.length&&(o=x(o,t[1])),t=h.allKeys(e)):(o=W,t=N(t,!1,!1),e=Object(e));for(var r=0,i=t.length;r<i;r++){var a=t[r],u=e[a];o(u,a,e)&&(n[a]=u)}return n}),h.omit=k(function(e,t){var n,o=t[0];return h.isFunction(o)?(o=h.negate(o),1<t.length&&(n=t[1])):(t=h.map(N(t,!1,!1),String),o=function(e,n){return!h.contains(t,n)}),h.pick(e,o,n)}),h.defaults=U(h.allKeys,!0),h.create=function(e,t){var n=P(e);return t&&h.extendOwn(n,t),n},h.clone=function(e){return h.isObject(e)?h.isArray(e)?e.slice():h.extend({},e):e},h.tap=function(e,t){return t(e),e},h.isMatch=function(e,t){var n=h.keys(t),o=n.length;if(null==e)return!o;for(var r=Object(e),i=0;i<o;i++){var a=n[i];if(t[a]!==r[a]||!(a in r))return!1}return!0},Y=function(e,t,n,o){if(e===t)return 0!==e||1/e==1/t;if(null==e||null==t)return!1;if(e!=e)return t!=t;var r=void 0===e?"undefined":i(e);return("function"===r||"object"===r||"object"==(void 0===t?"undefined":i(t)))&&Q(e,t,n,o)},Q=function(e,t,n,o){e instanceof h&&(e=e._wrapped),t instanceof h&&(t=t._wrapped);var r=d.call(e);if(r!==d.call(t))return!1;switch(r){case"[object RegExp]":case"[object String]":return""+e==""+t;case"[object Number]":return+e!=+e?+t!=+t:0==+e?1/+e==1/t:+e==+t;case"[object Date]":case"[object Boolean]":return+e==+t;case"[object Symbol]":return c.valueOf.call(e)===c.valueOf.call(t)}var a="[object Array]"===r;if(!a){if("object"!=(void 0===e?"undefined":i(e))||"object"!=(void 0===t?"undefined":i(t)))return!1;var u=e.constructor,l=t.constructor;if(u!==l&&!(h.isFunction(u)&&u instanceof u&&h.isFunction(l)&&l instanceof l)&&"constructor"in e&&"constructor"in t)return!1}o=o||[];for(var s=(n=n||[]).length;s--;)if(n[s]===e)return o[s]===t;if(n.push(e),o.push(t),a){if((s=e.length)!==t.length)return!1;for(;s--;)if(!Y(e[s],t[s],n,o))return!1}else{var p,f=h.keys(e);if(s=f.length,h.keys(t).length!==s)return!1;for(;s--;)if(p=f[s],!O(t,p)||!Y(e[p],t[p],n,o))return!1}return n.pop(),o.pop(),!0},h.isEqual=function(e,t){return Y(e,t)},h.isEmpty=function(e){return null==e||(R(e)&&(h.isArray(e)||h.isString(e)||h.isArguments(e))?0===e.length:0===h.keys(e).length)},h.isElement=function(e){return!(!e||1!==e.nodeType)},h.isArray=b||function(e){return"[object Array]"===d.call(e)},h.isObject=function(e){var t=void 0===e?"undefined":i(e);return"function"===t||"object"===t&&!!e},h.each(["Arguments","Function","String","Number","Date","RegExp","Error","Symbol","Map","WeakMap","Set","WeakSet"],function(e){h["is"+e]=function(t){return d.call(t)==="[object "+e+"]"}}),h.isArguments(arguments)||(h.isArguments=function(e){return O(e,"callee")});var V=a.document&&a.document.childNodes;"function"!=typeof/./&&"object"!=("undefined"==typeof Int8Array?"undefined":i(Int8Array))&&"function"!=typeof V&&(h.isFunction=function(e){return"function"==typeof e||!1}),h.isFinite=function(e){return!h.isSymbol(e)&&isFinite(e)&&!isNaN(parseFloat(e))},h.isNaN=function(e){return h.isNumber(e)&&isNaN(e)},h.isBoolean=function(e){return!0===e||!1===e||"[object Boolean]"===d.call(e)},h.isNull=function(e){return null===e},h.isUndefined=function(e){return void 0===e},h.has=function(e,t){if(!h.isArray(t))return O(e,t);for(var n=t.length,o=0;o<n;o++){var r=t[o];if(null==e||!v.call(e,r))return!1;e=e[r]}return!!n},h.noConflict=function(){return a._=u,this},h.identity=function(e){return e},h.constant=function(e){return function(){return e}},h.noop=function(){},h.property=function(e){return h.isArray(e)?function(t){return C(t,e)}:E(e)},h.propertyOf=function(e){return null==e?function(){}:function(t){return h.isArray(t)?C(e,t):e[t]}},h.matcher=h.matches=function(e){return e=h.extendOwn({},e),function(t){return h.isMatch(t,e)}},h.times=function(e,t,n){var o=Array(Math.max(0,e));t=x(t,n,1);for(var r=0;r<e;r++)o[r]=t(r);return o},h.random=function(e,t){return null==t&&(t=e,e=0),e+Math.floor(Math.random()*(t-e+1))},h.now=Date.now||function(){return(new Date).getTime()};var q={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},G=h.invert(q),H=function(e){var t=function(t){return e[t]},n="(?:"+h.keys(e).join("|")+")",o=RegExp(n),r=RegExp(n,"g");return function(e){return e=null==e?"":""+e,o.test(e)?e.replace(r,t):e}};h.escape=H(q),h.unescape=H(G),h.result=function(e,t,n){h.isArray(t)||(t=[t]);var o=t.length;if(!o)return h.isFunction(n)?n.call(e):n;for(var r=0;r<o;r++){var i=null==e?void 0:e[t[r]];void 0===i&&(i=n,r=o),e=h.isFunction(i)?i.call(e):i}return e};var K=0;h.uniqueId=function(e){var t=++K+"";return e?e+t:t},h.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var $=/(.)^/,J={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},X=/\\|'|\r|\n|\u2028|\u2029/g,Z=function(e){return"\\"+J[e]};h.template=function(e,t,n){!t&&n&&(t=n),t=h.defaults({},t,h.templateSettings);var o,r=RegExp([(t.escape||$).source,(t.interpolate||$).source,(t.evaluate||$).source].join("|")+"|$","g"),i=0,a="__p+='";e.replace(r,function(t,n,o,r,u){return a+=e.slice(i,u).replace(X,Z),i=u+t.length,n?a+="'+\n((__t=("+n+"))==null?'':_.escape(__t))+\n'":o?a+="'+\n((__t=("+o+"))==null?'':__t)+\n'":r&&(a+="';\n"+r+"\n__p+='"),t}),a+="';\n",t.variable||(a="with(obj||{}){\n"+a+"}\n"),a="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+a+"return __p;\n";try{o=new Function(t.variable||"obj","_",a)}catch(t){throw t.source=a,t}var u=function(e){return o.call(this,e,h)},l=t.variable||"obj";return u.source="function("+l+"){\n"+a+"}",u},h.chain=function(e){var t=h(e);return t._chain=!0,t};var ee=function(e,t){return e._chain?h(t).chain():t};h.mixin=function(e){return h.each(h.functions(e),function(t){var n=h[t]=e[t];h.prototype[t]=function(){var e=[this._wrapped];return p.apply(e,arguments),ee(this,n.apply(h,e))}}),h},h.mixin(h),h.each(["pop","push","reverse","shift","sort","splice","unshift"],function(e){var t=l[e];h.prototype[e]=function(){var n=this._wrapped;return t.apply(n,arguments),"shift"!==e&&"splice"!==e||0!==n.length||delete n[0],ee(this,n)}}),h.each(["concat","join","slice"],function(e){var t=l[e];h.prototype[e]=function(){return ee(this,t.apply(this._wrapped,arguments))}}),h.prototype.value=function(){return this._wrapped},h.prototype.valueOf=h.prototype.toJSON=h.prototype.value,h.prototype.toString=function(){return String(this._wrapped)},n(22)&&(void 0===(r=function(){return h}.apply(t,[]))||(o.exports=r))}()}).call(this,n(16),n(23)(e))
/***/},
/* 1 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a(n(71)),r=a(n(5)),i=a(n(0));function a(e){return e&&e.__esModule?e:{default:e}}
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
t.default=function(e,t,n,a,u,l,s){var c=i.default.isElement(e)?(0,r.default)(e):e,p=void 0,f={},d={},v=function(e){var t=document.createElement("div");return t.innerHTML=e,p=(0,r.default)(t.firstChild),t.firstChild};return s?c.replace(v(o.default[t+"Template"](n))):c.append(v(o.default[t+"Template"](n))),u&&u(p,d),Object.keys(a).forEach(function(e){var t=e.split(" "),n=t[0].replace(/ /gi,""),o=t[1].replace(/ /gi,""),i="";if(i="document"===o||"window"===o?(0,r.default)(o):p.find(o)||(p.hasClass(o.replace(".",""))?p:null),!(n&&o&&i))return!1;var u=Object.keys(f).length++,l=function(t){return a[e](t,p,d)};
//because It retuns another data.
f[u]={name:n,target:o,callback:l},
//sometimes target is NodeList
i.get().forEach?i.get().forEach(function(e){e.addEventListener(n,l)}):i.get().addEventListener(n,l)}),d.destroy=function(){Object.keys(f).forEach(function(e){var t=f[e],n="";
//sometimes target is NodeList
(n="document"===t.target||"window"===t.target?(0,r.default)(t.target):p.find(t.target)||(p.hasClass(t.target.replace(".",""))?p:null)).get().forEach?n.get().forEach(function(e){e.removeEventListener(t.name,t.callback)}):n.get().removeEventListener(t.name,t.callback),delete f[e]}),p&&p.remove(),l&&l()},d}},
/* 2 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});
// STATE
t.STATE_BUFFERING="buffering",t.STATE_IDLE="idle";var o=t.STATE_COMPLETE="complete";t.STATE_PAUSED="paused",t.STATE_PLAYING="playing",t.STATE_ERROR="error",t.STATE_LOADING="loading",t.STATE_STALLED="stalled",t.PROVIDER_HTML5="html5",t.PROVIDER_WEBRTC="webrtc",t.PROVIDER_DASH="dash",t.PROVIDER_HLS="hls",t.CONTENT_COMPLETE=o,t.READY="ready",t.DESTROY="destroy",t.CONTENT_SEEK="seek",t.CONTENT_BUFFER_FULL="bufferFull",t.DISPLAY_CLICK="displayClick",t.CONTENT_LOADED="loaded",t.CONTENT_SEEKED="seeked",t.NETWORK_UNSTABLED="unstableNetwork",t.ERROR="error",t.PLAYER_STATE="stateChanged",t.PLAYER_COMPLETE=o,t.PLAYER_PAUSE="pause",t.PLAYER_PLAY="play",t.CONTENT_BUFFER="bufferChanged",t.CONTENT_TIME="time",t.CONTENT_RATE_CHANGE="ratechange",t.CONTENT_VOLUME="volumeChanged",t.CONTENT_MUTE="mute",t.CONTENT_META="metaChanged",t.CONTENT_LEVELS="qualityLevelChanged",t.CONTENT_LEVEL_CHANGED="currentQualityLevelChanged",t.PLAYBACK_RATE_CHANGED="playbackRateChanged",t.CONTENT_CAPTION_CUE_CHANGED="cueChanged",t.CONTENT_CAPTION_CHANGED="captionChanged",t.INIT_ERROR=100,t.PLAYER_UNKNWON_ERROR=300,t.PLAYER_UNKNWON_OPERATION_ERROR=301,t.PLAYER_UNKNWON_NEWWORK_ERROR=302,t.PLAYER_UNKNWON_DECODE_ERROR=303,t.PLAYER_FILE_ERROR=304,t.PLAYER_CAPTION_ERROR=305,t.PLAYER_WEBRTC_WS_ERROR=501,t.PLAYER_WEBRTC_WS_CLOSED=502,t.PLAYER_WEBRTC_ADD_ICECANDIDATE_ERROR=503,t.PLAYER_WEBRTC_SET_REMOTE_DESC_ERROR=504,t.PLAYER_WEBRTC_CREATE_ANSWER_ERROR=505,t.PLAYER_WEBRTC_SET_LOCAL_DESC_ERROR=506,t.PLAYER_WEBRTC_NETWORK_SLOW=510},
/* 3 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isDash=t.isWebRTC=t.isRtmp=void 0;var o=n(4);t.isRtmp=function(e,t){return 0==e.indexOf("rtmp:")||"rtmp"==t},t.isWebRTC=function(e,t){return!!e&&(0===e.indexOf("ws:")||0===e.indexOf("wss:")||"webrtc"===t)},t.isDash=function(e,t){return"mpd"===t||"dash"===t||"application/dash+xml"===t||"mpd"==(0,o.extractExtension)(e)}},
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
function(e){var t=parseInt(e,10),n=Math.floor(t/3600),o=Math.floor((t-3600*n)/60),r=t-3600*n-60*o;n>0&&(o="0"+o);r<10&&(r="0"+r);return n>0?n+":"+o+":"+r:o+":"+r}
/***/;!function(e){e&&e.__esModule}(n(0));t.extractExtension=function(e){if(!e||"rtmp"==e.substr(0,4))return"";var t=function(e){var t="";return/[(,]format=mpd-/i.test(e)?t="mpd":/[(,]format=m3u8-/i.test(e)&&(t="m3u8"),t}(e);return t||((e=e.split("?")[0].split("#")[0]).lastIndexOf(".")>-1?e.substr(e.lastIndexOf(".")+1,e.length).toLowerCase():"")}},
/* 5 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=r(n(0));r(n(56));function r(e){return e&&e.__esModule?e:{default:e}}
/**
 * @brief   It was replace jquery's selector. It Often used by OvenTemplate. (/view/engine/OvenTemplate.js)
 * @param   selectorOrElement  string or element
 *
 * */
/**
 * Created by hoho on 2018. 7. 23..
 */t.default=function e(t){var n={},r=function(e,t){var n=e.querySelectorAll(t);return n.length>1?n:n[0]},i="";return(i=o.default.every(t,function(e){return o.default.isElement(e)})?t:"document"===t?document:"window"===t?window:r(document,t))?(n.find=function(t){return e(r(i,t))},n.css=function(e,t){i.length>0?i.forEach(function(n){n.style[e]=t}):i.style[e]=t},n.addClass=function(e){i.classList?i.classList.add(e):-1===i.className.split(" ").indexOf(e)&&(i.className+=" "+e)},n.removeClass=function(e){i.classList?i.classList.remove(e):i.className=i.className.replace(new RegExp("(^|\\b)"+e.split(" ").join("|")+"(\\b|$)","gi")," ")},n.show=function(){i.style.display="block"},n.hide=function(){i.style.display="none"},n.append=function(e){i.innerHTML+=e},n.text=function(e){
//IE8+
if(!e)return i.textContent;i.textContent=e},n.hasClass=function(e){
//IE8+
return i.classList?i.classList.contains(e):new RegExp("(^| )"+e+"( |$)","gi").test(i.name)},n.is=function(e){return i===e},n.offset=function(){
//IE8+
var e=i.getBoundingClientRect();return{top:e.top+document.body.scrollTop,left:e.left+document.body.scrollLeft}},n.width=function(){
//IE8+
return i.clientWidth},n.height=function(){
//IE8+
return i.clientHeight},n.attr=function(e){return i.getAttribute(e)},n.remove=function(){
//IE8+
i.parentNode.removeChild(i)},n.replace=function(e){i.replaceWith(e)},n.append=function(e){i.appendChild(e)},n.remove=function(){i.remove()},n.get=function(){return i},n.closest=function(e){return i.closest(e)},n):null}},
/* 6 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r=(window.setTimeout,window.setImmediate);
//      Promise Polyfill
//      https://github.com/taylorhakes/promise-polyfill
//      Copyright (c) 2014 Taylor Hakes
//      Copyright (c) 2014 Forbes Lindesay
//      taylorhakes/promise-polyfill is licensed under the MIT License
function i(){}
// Polyfill for Function.prototype.bind
var a=function(e){if(!(this instanceof f))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],p(e,this)},u=function(e,t){for(;3===e._state;)e=e._value;0!==e._state?(e._handled=!0,f._immediateFn(function(){var n=1===e._state?t.onFulfilled:t.onRejected;if(null!==n){var o;try{o=n(e._value)}catch(e){return void s(t.promise,e)}l(t.promise,o)}else(1===e._state?l:s)(t.promise,e._value)})):e._deferreds.push(t)},l=function(e,t){try{
// Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"===(void 0===t?"undefined":o(t))||"function"==typeof t)){var n=t.then;if(t instanceof f)return e._state=3,e._value=t,void c(e);if("function"==typeof n)return void p(function(e,t){return function(){e.apply(t,arguments)}}(n,t),e)}e._state=1,e._value=t,c(e)}catch(t){s(e,t)}},s=function(e,t){e._state=2,e._value=t,c(e)},c=function(e){2===e._state&&0===e._deferreds.length&&f._immediateFn(function(){e._handled||f._unhandledRejectionFn(e._value)});for(var t=0,n=e._deferreds.length;t<n;t++)u(e,e._deferreds[t]);e._deferreds=null},p=function(e,t){var n=!1;try{e(function(e){n||(n=!0,l(t,e))},function(e){n||(n=!0,s(t,e))})}catch(e){if(n)return;n=!0,s(t,e)}};a.prototype.catch=function(e){return this.then(null,e)},a.prototype.then=function(e,t){var n=new this.constructor(i);return u(this,new function(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}(e,t,n)),n},a.prototype.finally=function(e){var t=this.constructor;return this.then(function(n){return t.resolve(e()).then(function(){return n})},function(n){return t.resolve(e()).then(function(){return t.reject(n)})})},a.all=function(e){return new f(function(t,n){if(!e||void 0===e.length)throw new TypeError("Promise.all accepts an array");var r=Array.prototype.slice.call(e);if(0===r.length)return t([]);var i=r.length;function a(e,u){try{if(u&&("object"===(void 0===u?"undefined":o(u))||"function"==typeof u)){var l=u.then;if("function"==typeof l)return void l.call(u,function(t){a(e,t)},n)}r[e]=u,0==--i&&t(r)}catch(e){n(e)}}for(var u=0;u<r.length;u++)a(u,r[u])})},a.resolve=function(e){return e&&"object"===(void 0===e?"undefined":o(e))&&e.constructor===f?e:new f(function(t){t(e)})},a.reject=function(e){return new f(function(t,n){n(e)})},a.race=function(e){return new f(function(t,n){for(var o=0,r=e.length;o<r;o++)e[o].then(t,n)})},
// Use polyfill for setImmediate for performance gains
a._immediateFn="function"==typeof r&&function(e){r(e)}||function(e){r(e,0)},a._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)};var f=window.Promise||(window.Promise=a);t.resolved=f.resolve();t.default=f},
/* 7 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(3);
/**
 * @brief   This finds the provider that matches the input source.
 * @param
 * */t.default=function(){var e={};OvenPlayerConsole.log("SupportChecker loaded.");var t=[{name:"html5",checkSupport:function(e){var t=document.createElement("video");if(!t.canPlayType)return!1;var n=e.file,r=e.type;if(!r)return!1;var i=e.mimeType||{aac:"audio/mp4",mp4:"video/mp4",f4v:"video/mp4",m4v:"video/mp4",mov:"video/mp4",mp3:"audio/mpeg",mpeg:"audio/mpeg",ogv:"video/ogg",ogg:"video/ogg",oga:"video/ogg",vorbis:"video/ogg",webm:"video/webm",f4a:"video/aac",m3u8:"application/vnd.apple.mpegurl",m3u:"application/vnd.apple.mpegurl",hls:"application/vnd.apple.mpegurl"}[r];return!((0,o.isRtmp)(n,r)||(0,o.isWebRTC)(n,r)||!i||!t.canPlayType(i))}},{name:"webrtc",checkSupport:function(e){if(!document.createElement("video").canPlayType)return!1;var t=e.file,n=e.type;return!!(0,o.isWebRTC)(t,n)}},{name:"dash",checkSupport:function(e){var t=e.file,n=e.type;
//mpd application/dash+xml
return!!(0,o.isDash)(t,n)}},{name:"hls",checkSupport:function(e){var t=document.createElement("video");
//this method from hls.js
//Remove this '!!video.canPlayType('application/vnd.apple.mpegurl')' if you want to use hlsjs.
return function(){var e=function(){if("undefined"!=typeof window)return window.MediaSource||window.WebKitMediaSource}(),t=window.SourceBuffer||window.WebKitSourceBuffer,n=e&&"function"==typeof e.isTypeSupported&&e.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"'),o=!t||t.prototype&&"function"==typeof t.prototype.appendBuffer&&"function"==typeof t.prototype.remove;return!!n&&!!o}()&&!!t.canPlayType("application/vnd.apple.mpegurl")}}];return e.findProviderNameBySource=function(e){OvenPlayerConsole.log("SupportChecker : findProviderNameBySource()",e);for(var n=e===Object(e)?e:{},o=0;o<t.length;o++)if(t[o].checkSupport(n))return t[o].name},e.findProviderNamesByPlaylist=function(t){OvenPlayerConsole.log("SupportChecker : findProviderNamesByPlaylist()",t);for(var n=[],o=t.length;o--;)for(var r=t[o],i="",a=0;a<r.sources.length;a++)if(i=r.sources[a]){var u=e.findProviderNameBySource(i);u&&n.push(u)}return n},e}},
/* 8 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=[]},
/* 9 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});
/**
 * utils for webpack
 */
t.getScriptPath=function(e){for(var t=document.getElementsByTagName("script"),n=0;n<t.length;n++){var o=t[n].src;if(o){var r=o.lastIndexOf("/"+e);if(r>=0)return o.substr(0,r+1)}}return""};
/***/},
/* 10 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});
/**
 * Created by hoho on 2018. 6. 29..
 */
t.version="0.6.6-rev.1e799bb";
/***/},
/* 11 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){var t=e,n=[],o=function(e,t,n){var o=0,r=e.length;for(o=0;o<r;o++){var i=e[o];i.listener.apply(i.context||n,t)}};return t.on=function(e,o,r){return(n[e]||(n[e]=[])).push({listener:o,context:r}),t},t.trigger=function(e){if(!n)return!1;var r=[].slice.call(arguments,1),i=n[e],a=n.all;i&&o(i,r,t),a&&o(a,arguments,t)},t.off=function(e,o,r){if(!n)return!1;if(!e&&!o&&!r)return n=[],t;for(var i=e?[e]:Object.keys(n),a=0,u=i.length;a<u;a++){e=i[a];var l=n[e];if(l){var s=n[e]=[];if(o||r)for(var c=0,p=l.length;c<p;c++){var f=l[c];(o&&o!==f.listener&&o!==f.listener.listener&&o!==f.listener._callback||r&&r!==f.context)&&s.push(f)}s.length||delete n[e]}}return t},t.once=function(e,n,o){var r=0,i=function o(){r++||(t.off(e,o),n.apply(t,arguments))};return i._listener=n,t.on(e,i,o)},t}},
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
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=i(n(7)),r=i(n(6));function i(e){return e&&e.__esModule?e:{default:e}}
/**
 * @brief   This manages provider.
 * @param
 * */t.default=function(){var e=(0,o.default)(),t={},i={};OvenPlayerConsole.log("ProviderController loaded.");var a=function(e,n){t[e]||(OvenPlayerConsole.log("ProviderController _registerProvider() ",e),t[e]=n)},u={html5:function(){return n.e(/* require.ensure | ovenplayer.provider.html5 */2).then(function(e){var t=n(15).default;return a("html5",t),t}.bind(null,n)).catch(function(e){throw new Error("Network error")})},webrtc:function(){return n.e(/* require.ensure | ovenplayer.provider.HlsProvider */1).then(function(e){var t=n(14).default;return a("webrtc",t),t}.bind(null,n)).catch(function(e){throw new Error("Network error")})},dash:function(){return n.e(/* require.ensure | ovenplayer.provider.DashProvider */0).then(function(e){var o=n(13).default;return t.dash=o,a("dash",o),o}.bind(null,n)).catch(function(e){throw new Error("Network error")})},hls:function(){return n.e(/* require.ensure | ovenplayer.provider.HlsProvider */1).then(function(e){var t=n(12).default;return a("hls",t),t}.bind(null,n)).catch(function(e){throw new Error("Network error")})}};return i.loadProviders=function(t){var n=e.findProviderNamesByPlaylist(t);return OvenPlayerConsole.log("ProviderController loadProviders() ",n),r.default.all(n.filter(function(e){return!!u[e]}).map(function(e){return u[e]()}))},i.findByName=function(e){return OvenPlayerConsole.log("ProviderController findByName() ",e),t[e]},i.getProviderBySource=function(t){var n=e.findProviderNameBySource(t);return OvenPlayerConsole.log("ProviderController getProviderBySource() ",n),i.findByName(n)},i.isSameProvider=function(t,n){return OvenPlayerConsole.log("ProviderController isSameProvider() ",e.findProviderNameBySource(t),e.findProviderNameBySource(n)),e.findProviderNameBySource(t)==e.findProviderNameBySource(n)},i}},
/* 18 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},r=l(n(0)),i=n(3),a=n(4),u=l(n(7));function l(e){return e&&e.__esModule?e:{default:e}}
/**
 * @brief   This manages Playlist or Sources.
 * @param
 *
 * */t.default=function(){var e={},t=[],n=(0,u.default)();OvenPlayerConsole.log("PlaylistManager loaded.");var l=function(e){if(e&&(e.file||e.host||e.application||e.stream)){var t=o({},{default:!1},e);t.file=(0,a.trim)(""+t.file),t.host&&t.application&&t.stream&&(t.file=t.host+"/"+t.application+"/stream/"+t.stream,delete t.host,delete t.application,delete t.stream);var n=/^[^/]+\/(?:x-)?([^/]+)$/;if(n.test(t.type)&&(
// if type is given as a mimetype
t.mimeType=t.type,t.type=t.type.replace(n,"$1")),(0,i.isRtmp)(t.file)?t.type="rtmp":(0,i.isWebRTC)(t.file)?t.type="webrtc":(0,i.isDash)(t.file,t.type)?t.type="dash":t.type||(t.type=(0,a.extractExtension)(t.file)),t.type){
// normalize types
switch(t.type){case"m3u8":case"vnd.apple.mpegurl":t.type="hls";break;case"m4a":t.type="aac";break;case"smil":t.type="rtmp"}return Object.keys(t).forEach(function(e){""===t[e]&&delete t[e]}),t}}};return e.setPlaylist=function(e){OvenPlayerConsole.log("PlaylistManager setPlaylist() ",e);var i=(r.default.isArray(e)?e:[e]).map(function(e){r.default.isArray(e.tracks)||delete e.tracks;var t=o({},{sources:[],tracks:[]},e);t.sources!==Object(t.sources)||r.default.isArray(t.sources)||(t.sources=[l(t.sources)]),r.default.isArray(t.sources)&&0!==t.sources.length||(e.levels?t.sources=e.levels:t.sources=[l(e)]);for(var i=0;i<t.sources.length;i++){var a,u=t.sources[i];if(u){var s=u.default;u.default=!!s&&"true"===s.toString(),
// If the source doesn't have a label, number it
t.sources[i].label||(t.sources[i].label=t.sources[i].type+"-"+i.toString()),a=l(t.sources[i]),n.findProviderNameBySource(a)?t.sources[i]=a:t.sources[i]=null}}return t.sources=t.sources.filter(function(e){return!!e}),
// default 가 없을때 webrtc가 있다면 webrtc default : true로 자동 설정
/*let haveDefault = _.find(playlistItem.sources, function(source){return source.default == true;});
            let webrtcSource = [];
            if(!haveDefault){
                webrtcSource = _.find(playlistItem.sources, function(source){return source.type == "webrtc";});
                if(webrtcSource){
                    webrtcSource.default = true;
                }
            }*/
r.default.isArray(t.tracks)||(t.tracks=[]),r.default.isArray(t.captions)&&(t.tracks=t.tracks.concat(t.captions),delete t.captions),t.tracks=t.tracks.map(function(e){return!(!e||!e.file)&&o({},{kind:"captions",default:!1},e)}).filter(function(e){return!!e}),t});return t=i,i},e.getPlaylist=function(){return OvenPlayerConsole.log("PlaylistManager getPlaylist() ",t),t},e.getCurrentSources=function(){
//We do not support "PLAYLIST" not yet. So this returns playlist of 0.
return OvenPlayerConsole.log("PlaylistManager getCurrentSources() ",t[0].sources),t[0].sources},e}},
/* 19 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){var t={},n="";OvenPlayerConsole.log("MediaManager loaded.");var o=function(){return(n=document.createElement("video")).setAttribute("disableRemotePlayback",""),n.setAttribute("webkit-playsinline",""),n.setAttribute("playsinline",""),e.appendChild(n),n};return t.createElement=function(){return OvenPlayerConsole.log("MediaManager createElement()"),n?(e.removeChild(n),o()):o()},t}},
/* 20 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(){var e={},t=null;return window.OvenPlayerConsole={log:window.console.log},e.enable=function(){null!=t&&(OvenPlayerConsole.log=t)},e.disable=function(){t=console.log,OvenPlayerConsole.log=function(){}},e.destroy=function(){window.OvenPlayerConsole=null},e}},
/* 21 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(e){return e&&e.__esModule?e:{default:e}}
/**
 * @brief   This executes the input commands at a specific point in time.
 * @param   instance
 * @param   queuedCommands
 * */(n(0));t.default=function(e,t){var n=[],r={},i=!1,a={};OvenPlayerConsole.log("LazyCommandExecutor loaded."),t.forEach(function(t){var n=e[t];r[t]=n||function(){},e[t]=function(){var e=Array.prototype.slice.call(arguments,0);i?(u(),n&&n.apply(a,e)):
//commandQueue.push({ command, args });
a.addQueue(t,e)}});var u=function(){for(;n.length>0;){var t=n.shift(),o=t.command,i=t.args;(r[o]||e[o]).apply(e,i)}};return a.setExecuteMode=function(e){i=e,OvenPlayerConsole.log("LazyCommandExecutor : setExecuteMode()",e)},a.getUndecoratedMethods=function(){return OvenPlayerConsole.log("LazyCommandExecutor : getUndecoratedMethods()",r),r},a.getQueue=function(){return OvenPlayerConsole.log("LazyCommandExecutor : getQueue()",getQueue),n},a.addQueue=function(e,t){OvenPlayerConsole.log("LazyCommandExecutor : addQueue()",e,t),n.push({command:e,args:t})},a.flush=function(){OvenPlayerConsole.log("LazyCommandExecutor : flush()"),u()},a.empty=function(){OvenPlayerConsole.log("LazyCommandExecutor : empty()"),n.length=0},a.off=function(){OvenPlayerConsole.log("LazyCommandExecutor : off()"),t.forEach(function(t){var n=r[t];n&&(e[t]=n,delete r[t])})},
//Run once at the end
a.removeAndExcuteOnce=function(t){var i=o.default.findWhere(n,{command:t});OvenPlayerConsole.log("LazyCommandExecutor : removeAndExcuteOnce()",t),n.splice(o.default.findIndex(n,{command:t}),1);var a=r[t];a&&(OvenPlayerConsole.log("removeCommand()"),i&&(a||e[t]).apply(e,i.args),e[t]=a,delete r[t])},a.destroy=function(){OvenPlayerConsole.log("LazyCommandExecutor : destroy()"),a.off(),a.empty()},a}},
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
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},r=function(e){return e&&e.__esModule?e:{default:e}}
/**
 * @brief   This initializes the input options.
 * @param   options
 *
 * */(n(0));t.default=function(e){OvenPlayerConsole.log("Configurator loaded.",e);var t=function(e){var t=function(e){return e.slice&&"px"===e.slice(-2)&&(e=e.slice(0,-2)),e};!function(e){Object.keys(e).forEach(function(t){"id"!==t&&(e[t]=function(e){if(void 0===e)return null;if("string"==typeof e&&e.length<6){var t=e.toLowerCase();if("true"===t)return!0;if("false"===t)return!1;if(!isNaN(Number(e))&&!isNaN(parseFloat(e)))return Number(e)}return e}(e[t]))})}(e);var n=o({},{defaultPlaybackRate:1,playbackRateControls:!1,playbackRates:[.25,.5,1,1.5,2],mute:!1,volume:90,width:640,height:360},e);n.width=t(n.width),n.height=t(n.height),n.aspectratio=function(e,t){if(-1===t.toString().indexOf("%"))return 0;if("string"!=typeof e||!e)return 0;if(/^\d*\.?\d+%$/.test(e))return e;var n=e.indexOf(":");if(-1===n)return 0;var o=parseFloat(e.substr(0,n)),r=parseFloat(e.substr(n+1));return o<=0||r<=0?0:r/o*100+"%"}(n.aspectratio,n.width);var i=n.playbackRateControls;if(i){var a=n.playbackRates;Array.isArray(i)&&(a=i),(a=a.filter(function(e){return r.default.isNumber(e)&&e>=.25&&e<=4}).map(function(e){return Math.round(4*e)/4})).indexOf(1)<0&&a.push(1),a.sort(),n.playbackRateControls=!0,n.playbackRates=a}(!n.playbackRateControls||n.playbackRates.indexOf(n.defaultPlaybackRate)<0)&&(n.defaultPlaybackRate=1),n.playbackRate=n.defaultPlaybackRate,n.aspectratio||delete n.aspectratio;var u=n.playlist;if(u)r.default.isArray(u.playlist)&&(n.feedData=u,n.playlist=u.playlist);else{var l=r.default.pick(n,["title","description","type","mediaid","image","file","sources","tracks","preload","duration","host","application","stream"]);n.playlist=[l]}return delete n.duration,n}(e),n=t.aspectratio||"16:9",i=t.debug,a=t.defaultPlaybackRate||1,u=(t.image,t.playbackRateControls||!0),l=t.playbackRates||[.5,1,1.25,1.5,2],s=t.playlist||[],c=t.qualityLabel||"",p=t.repeat||!1,f=t.stretching||"uniform",d={getConfig:function(){return t},getAspectratio:function(){return n},setAspectratio:function(e){n=e},isDebug:function(){return i},getDefaultPlaybackRate:function(){return a},setDefaultPlaybackRate:function(e){return a=e,e},getQualityLabel:function(){return c},setQualityLabel:function(e){c=e},getPlaybackRates:function(){return l},isPlaybackRateControls:function(){return u},getPlaylist:function(){return s},setPlaylist:function(e){return s=r.default.isArray(e)?e:[e]},isRepeat:function(){return p},getStretching:function(){return f}};return d}},
/* 25 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=f(n(24)),r=f(n(11)),i=f(n(21)),a=f(n(20)),u=f(n(19)),l=f(n(18)),s=f(n(17)),c=(f(n(6)),n(2)),p=n(10);function f(e){return e&&e.__esModule?e:{default:e}}
/**
 * @brief   This object connects UI to the provider.
 * @param   {object}    container  dom element
 *
 * */
//import CaptionManager from "api/caption/Manager";
t.default=function(e){var t=(0,a.default)(),n={};(0,r.default)(n),OvenPlayerConsole.log("[[OvenPlayer]] v."+p.version),OvenPlayerConsole.log("API loaded.");
//let captionManager = CaptionManager(that);
var f=(0,u.default)(e),d=(0,l.default)(),v=(0,s.default)(),b="",g="",m="",y=function(e){return v.loadProviders(d.getPlaylist()).then(function(e){b&&(b.destroy(),b=null);var t=f.createElement(),o=function(e){var t=0;if(e)for(var n=0;n<e.length;n++)if(e[n].default&&(t=n),g.getQualityLabel()&&e[n].label===g.getQualityLabel())return n;return t}(d.getCurrentSources());OvenPlayerConsole.log("current source index : "+o),
//This passes the event created by the Provider to API.
(b=e[o](t,g)).on("all",function(e,t){
//Auto next source when player load was fail by amiss source.
if(n.trigger(e,t),e===c.ERROR&&(t.code===c.PLAYER_FILE_ERROR||5===parseInt(t.code/100))||e===c.NETWORK_UNSTABLED){var o=n.getCurrentQuality();o+1<n.getQualityLevels().length&&(
//this sequential has available source.
n.pause(),n.setCurrentQuality(o+1))}})}).then(function(){b.preload(d.getCurrentSources(),e),m.flush(),
//This is no reason to exist anymore.
m.destroy(),n.trigger(c.READY)}).catch(function(e){var t={code:c.INIT_ERROR,reason:"init error.",message:"Player init error.",error:e};n.trigger(c.ERROR,t),
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
m=(0,i.default)(n,["load","play","pause","seek","stop","getDuration","getPosition","getVolume","getMute","getBuffer","getState"]),(g=(0,o.default)(e)).isDebug()||t.disable(),OvenPlayerConsole.log("API : init()"),OvenPlayerConsole.log("API : init() config : ",g),d.setPlaylist(g.getPlaylist()),OvenPlayerConsole.log("API : init() sources : ",d.getCurrentSources()),y()},n.getConfig=function(){return OvenPlayerConsole.log("API : getConfig()",g.getConfig()),g.getConfig()},n.getDuration=function(){return OvenPlayerConsole.log("API : getDuration()",b.getDuration()),b.getDuration()},n.getPosition=function(){return OvenPlayerConsole.log("API : getPosition()",b.getPosition()),b.getPosition()},n.getVolume=function(){return OvenPlayerConsole.log("API : getVolume()",b.getVolume()),b.getVolume()},n.setVolume=function(e){OvenPlayerConsole.log("API : setVolume() "+e),b.setVolume(e)},n.setMute=function(e){return OvenPlayerConsole.log("API : setMute() "+e),b.setMute(e)},n.getMute=function(){return OvenPlayerConsole.log("API : getMute() "+b.getMute()),b.getMute()},n.load=function(e){return OvenPlayerConsole.log("API : load() ",e),m=(0,i.default)(n,["play","seek","stop"]),e&&(b.setCurrentQuality(0),d.setPlaylist(e)),y()},n.play=function(){OvenPlayerConsole.log("API : play() "),b.play()},n.pause=function(){OvenPlayerConsole.log("API : pause() "),b.pause()},n.seek=function(e){OvenPlayerConsole.log("API : seek() "+e),b.seek(e)},n.setPlaybackRate=function(e){return OvenPlayerConsole.log("API : setPlaybackRate() ",e),b.setPlaybackRate(g.setDefaultPlaybackRate(e))},n.getPlaybackRate=function(){return OvenPlayerConsole.log("API : getPlaybackRate() ",b.getPlaybackRate()),b.getPlaybackRate()},n.getQualityLevels=function(){return OvenPlayerConsole.log("API : getQualityLevels() ",b.getQualityLevels()),b.getQualityLevels()},n.getCurrentQuality=function(){return OvenPlayerConsole.log("API : getCurrentQuality() ",b.getCurrentQuality()),b.getCurrentQuality()},n.setCurrentQuality=function(e){OvenPlayerConsole.log("API : setCurrentQuality() ",e);var t=d.getCurrentSources(),o=t[n.getCurrentQuality()],r=t[e],a=n.getPosition(),u=v.isSameProvider(o,r),l=b.setCurrentQuality(e,u);return r?(OvenPlayerConsole.log("API : setCurrentQuality() isSameProvider",u),u||(m=(0,i.default)(n,["play"]),y(a)),l):null},
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
n.getBuffer=function(){OvenPlayerConsole.log("API : getBuffer() ",b.getBuffer()),b.getBuffer()},n.getState=function(){return OvenPlayerConsole.log("API : getState() ",b.getState()),b.getState()},n.stop=function(){OvenPlayerConsole.log("API : stop() "),b.stop()},n.remove=function(){OvenPlayerConsole.log("API : remove() "),m.destroy(),b.destroy(),b=null,v=null,d=null,g=null,n.trigger(c.DESTROY),n.off(),OvenPlayerConsole.log("API : remove() - lazyQueue, currentProvider, providerController, playlistManager, playerConfig, api event destroed. "),t.destroy()},n}},
/* 26 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.checkAndGetContainerElement=void 0;var o=u(n(25)),r=n(3),i=u(n(0)),a=n(9);function u(e){return e&&e.__esModule?e:{default:e}}n.p=(0,a.getScriptPath)("ovenplayer.sdk.js");
/**
 * Main OvenPlayerSDK object
 */
var l=window.OvenPlayerSDK={},s=l.playerList=[],c=t.checkAndGetContainerElement=function(e){if(!e)
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
l.create=function(e,t){var n=c(e),r=(0,o.default)(n);return r.init(t),s.push(r),r},
/**
 * Gets the player instance list.
 *
 * @return     {array}  The player list.
 */
l.getPlayerList=function(){return s},
/**
 * Gets the player instance by container id.
 *
 * @param      {string}  containerId  The container identifier
 * @return     {obeject | null}  The player instance.
 */
l.getPlayerByContainerId=function(e){for(var t=0;t<s.length-1;t++)if(s[t].containerId===e)return s[t];return null},
/**
 * Gets the player instance by index.
 *
 * @param      {number}  index   The index
 * @return     {object | null}  The player instance.
 */
l.getPlayerByIndex=function(e){var t=s[e];return t||null},
/**
 * Generate webrtc source for player source type.
 *
 * @param      {Object | Array}  source   webrtc source
 * @return     {Array}  Player source Obejct.
 */
l.generateWebrtcUrls=function(e){return(i.default.isArray(e)?e:[e]).map(function(e,t){if(e.host&&(0,r.isWebRTC)(e.host)&&e.application&&e.stream)return{file:e.host+"/"+e.application+"/"+e.stream,type:"webrtc",label:e.label?e.label:"webrtc-"+(t+1)}})},t.default=l},
/* 27 */
/***/function(e,t){
/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */
e.exports=function(e){
// get current location
var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");
// blank or null?
if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,o=n+t.pathname.replace(/\/[^\/]*$/,"/");
// send back the fixed css
return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){
// strip quotes (if they exist)
var r,i=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});
// already a full url? no change
return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)?e:(
//TODO: should we add protocol?
r=0===i.indexOf("//")?i:0===i.indexOf("/")?n+i:o+i.replace(/^\.\//,""),"url("+JSON.stringify(r)+")");
// convert the url to a full url
})};
/***/},
/* 28 */
/***/function(e,t,n){
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var o={},r=function(e){var t;return function(){return void 0===t&&(t=e.apply(this,arguments)),t}}(function(){
// Test for IE <= 9 as proposed by Browserhacks
// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
// Tests for existence of standard globals is to allow style-loader
// to operate correctly into non-standard environments
// @see https://github.com/webpack-contrib/style-loader/issues/177
return window&&document&&document.all&&!window.atob}),i=function(e){var t={};return function(e){
// If passing function in options, then use it for resolve "head" element.
// Useful for Shadow Root style i.e
// {
//   insertInto: function () { return document.querySelector("#foo").shadowRoot }
// }
if("function"==typeof e)return e();if(void 0===t[e]){var n=function(e){return document.querySelector(e)}.call(this,e);
// Special case to return head of iframe instead of iframe itself
if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{
// This will throw an exception if access to iframe is blocked
// due to cross-origin restrictions
n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}}(),a=null,u=0,l=[],s=n(27);function c(e,t){for(var n=0;n<e.length;n++){var r=e[n],i=o[r.id];if(i){i.refs++;for(var a=0;a<i.parts.length;a++)i.parts[a](r.parts[a]);for(;a<r.parts.length;a++)i.parts.push(g(r.parts[a],t))}else{var u=[];for(a=0;a<r.parts.length;a++)u.push(g(r.parts[a],t));o[r.id]={id:r.id,refs:1,parts:u}}}}function p(e,t){for(var n=[],o={},r=0;r<e.length;r++){var i=e[r],a=t.base?i[0]+t.base:i[0],u={css:i[1],media:i[2],sourceMap:i[3]};o[a]?o[a].parts.push(u):n.push(o[a]={id:a,parts:[u]})}return n}function f(e,t){var n=i(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var o=l[l.length-1];if("top"===e.insertAt)o?o.nextSibling?n.insertBefore(t,o.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),l.push(t);else if("bottom"===e.insertAt)n.appendChild(t);else{if("object"!=typeof e.insertAt||!e.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var r=i(e.insertInto+" "+e.insertAt.before);n.insertBefore(t,r)}}function d(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=l.indexOf(e);t>=0&&l.splice(t,1)}function v(e){var t=document.createElement("style");return void 0===e.attrs.type&&(e.attrs.type="text/css"),b(t,e.attrs),f(e,t),t}function b(e,t){Object.keys(t).forEach(function(n){e.setAttribute(n,t[n])})}function g(e,t){var n,o,r,i;
// If a transform function was defined, run it on the css
if(t.transform&&e.css){if(!(i=t.transform(e.css)))
// If the transform function returns a falsy value, don't add this css.
// This allows conditional loading of css
return function(){
// noop
};
// If transform returns a value, use that instead of the original css.
// This allows running runtime transformations on the css.
e.css=i}if(t.singleton){var l=u++;n=a||(a=v(t)),o=y.bind(null,n,l,!1),r=y.bind(null,n,l,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(e){var t=document.createElement("link");return void 0===e.attrs.type&&(e.attrs.type="text/css"),e.attrs.rel="stylesheet",b(t,e.attrs),f(e,t),t}(t),o=function(e,t,n){var o=n.css,r=n.sourceMap,i=void 0===t.convertToAbsoluteUrls&&r;(t.convertToAbsoluteUrls||i)&&(o=s(o));r&&(
// http://stackoverflow.com/a/26603875
o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var a=new Blob([o],{type:"text/css"}),u=e.href;e.href=URL.createObjectURL(a),u&&URL.revokeObjectURL(u)}
/***/.bind(null,n,t),r=function(){d(n),n.href&&URL.revokeObjectURL(n.href)}):(n=v(t),o=function(e,t){var n=t.css,o=t.media;o&&e.setAttribute("media",o);if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}.bind(null,n),r=function(){d(n)});return o(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;o(e=t)}else r()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},
// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
t.singleton||"boolean"==typeof t.singleton||(t.singleton=r()),
// By default, add <style> tags to the <head> element
t.insertInto||(t.insertInto="head"),
// By default, add <style> tags to the bottom of the target
t.insertAt||(t.insertAt="bottom");var n=p(e,t);return c(n,t),function(e){for(var r=[],i=0;i<n.length;i++){var a=n[i];(u=o[a.id]).refs--,r.push(u)}e&&c(p(e,t),t);for(i=0;i<r.length;i++){var u;if(0===(u=r[i]).refs){for(var l=0;l<u.parts.length;l++)u.parts[l]();delete o[u.id]}}}};var m=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}();function y(e,t,n,o){var r=n?"":o.css;if(e.styleSheet)e.styleSheet.cssText=m(t,r);else{var i=document.createTextNode(r),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(i,a[t]):e.appendChild(i)}}},
/* 29 */
/***/function(e,t){e.exports="ovenplayer/css/1a8254e953d483071f2374774e6a8bee.svg";
/***/},
/* 30 */
/***/function(e,t){e.exports="ovenplayer/css/b3c7a5e50a84d86375f49f4cc510d33c.svg";
/***/},
/* 31 */
/***/function(e,t){e.exports="ovenplayer/css/ad356d62af6472d167a53880f76a81bf.svg";
/***/},
/* 32 */
/***/function(e,t){e.exports="ovenplayer/css/c196916ae91709b9857673d445cc2514.svg";
/***/},
/* 33 */
/***/function(e,t){e.exports="ovenplayer/css/6b12b38daa32eedc10603db3aa46deea.svg";
/***/},
/* 34 */
/***/function(e,t){e.exports="ovenplayer/css/918ca6efa18e20e85deb8ee82fc39967.svg";
/***/},
/* 35 */
/***/function(e,t){e.exports="ovenplayer/css/20111bd23bd336231187c6fe729fdc53.svg";
/***/},
/* 36 */
/***/function(e,t){e.exports="ovenplayer/css/bd4a8beb3ca4869418d3af58e08a69b1.svg";
/***/},
/* 37 */
/***/function(e,t){e.exports="ovenplayer/css/824f7afb03898d888d9fd39ddda494e0.svg";
/***/},
/* 38 */
/***/function(e,t){e.exports="ovenplayer/css/ac1e52f9b386a8a49f2f6d99f2bf28ac.svg";
/***/},
/* 39 */
/***/function(e,t){e.exports="ovenplayer/css/dc278e7e5c8a172e5e7f345956bdbada.svg";
/***/},
/* 40 */
/***/function(e,t){
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
e.exports=function(e){var t=[];
// return the list of modules as css string
return t.toString=function(){return this.map(function(t){var n=function(e,t){var n=e[1]||"",o=e[3];if(!o)return n;if(t&&"function"==typeof btoa){var r=
// Adapted from convert-source-map (MIT)
function(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}
/***/(o),i=o.sources.map(function(e){return"/*# sourceURL="+o.sourceRoot+e+" */"});return[n].concat(i).concat([r]).join("\n")}return[n].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+n+"}":n}).join("")},
// import a list of modules into the list
t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var o={},r=0;r<this.length;r++){var i=this[r][0];"number"==typeof i&&(o[i]=!0)}for(r=0;r<e.length;r++){var a=e[r];
// skip already imported module
// this implementation is not 100% perfect for weird media query combinations
//  when a module is imported multiple times with different media queries.
//  I hope this will never occur (Hey this way we have smaller bundles)
"number"==typeof a[0]&&o[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),t.push(a))}},t}},
/* 41 */
/***/function(e,t){e.exports=function(e){return"string"!=typeof e?e:(
// If url is already wrapped in quotes, remove them
/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),
// Should url be wrapped?
// See https://drafts.csswg.org/css-values-3/#urls
/["'() \t\n]/.test(e)?'"'+e.replace(/"/g,'\\"').replace(/\n/g,"\\n")+'"':e)}
/***/},
/* 42 */
/***/function(e,t,n){var o=n(41);
// imports
// module
(e.exports=n(40)(!1)).push([e.i,"@charset \"UTF-8\";.ovp-wrapper{position:relative;max-height:100%;overflow:hidden;zoom:1 !important;width:100%;display:block;background-color:#000;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;color:#eee;font-family:'Noto Sans',sans-serif;font-size:11px;line-height:1.3;font-weight:normal;outline:0}.ovp-wrapper:before,.ovp-wrapper:after{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box}.ovp-wrapper *,.ovp-wrapper *:before,.ovp-wrapper *:after{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box}.ovp-wrapper.ovp-fullscreen{height:100% !important}.ovp-wrapper.ovp-autohide{cursor:none}.ovp-wrapper.ovp-autohide .ovp-gradient-top,.ovp-wrapper.ovp-autohide .ovp-gradient-bottom,.ovp-wrapper.ovp-autohide .ovp-bottom-panel{opacity:0}.ovp-wrapper.ovp-autohide .ovp-progressbar-container,.ovp-wrapper.ovp-autohide .ovp-controls .ovp-button{cursor:none}.ovp-wrapper.ovp-autohide .ovp-caption-text-container{bottom:25px}.ovp-wrapper .ovp-ratio{padding-bottom:56.25%}.ovp-player{position:absolute;top:0;bottom:0;width:100%}.ovp-player .ovp-media-element-container{display:block;position:absolute;top:0;bottom:0;left:0;right:0;height:100%;width:100%}.ovp-player .ovp-media-element-container>*{width:100%;height:100%}.ovp-player .ovp-ui{position:absolute;top:0;width:100%;height:100%}.ovp-button{display:inline-block;border:none;background:transparent;padding:0;color:inherit;text-align:inherit;overflow:hidden;font-weight:100}.ovp-button:focus,.ovp-button{outline:0}.ovp-gradient-top,.ovp-gradient-bottom{width:100%;position:absolute;background-color:#12121c;pointer-events:none;opacity:.3;-moz-transition:opacity .25s cubic-bezier(0, 0, .2, 1);-webkit-transition:opacity .25s cubic-bezier(0, 0, .2, 1);transition:opacity .25s cubic-bezier(0, 0, .2, 1)}.ovp-gradient-bottom{height:50px;bottom:0;z-index:22}.ovp-spinner-container{position:absolute;top:0;left:0;width:100%;height:100%;display:none}.ovp-spinner-container .ovp-spinner{width:70px;height:18px;position:absolute;top:50%;left:50%;margin-top:-9px;margin-left:-35px;text-align:center}.ovp-spinner-container .ovp-spinner>div{width:18px;height:18px;background-color:#50e3c2;border-radius:100%;display:inline-block;-webkit-animation:sk-bouncedelay 1.4s infinite ease-in-out both;animation:sk-bouncedelay 1.4s infinite ease-in-out both}.ovp-spinner-container .ovp-spinner .bounce1{-webkit-animation-delay:-0.32s;animation-delay:-0.32s}.ovp-spinner-container .ovp-spinner .bounce2{-webkit-animation-delay:-0.16s;animation-delay:-0.16s}@-webkit-keyframes sk-bouncedelay{0%,80%,100%{-webkit-transform:scale(0)}40%{-webkit-transform:scale(1)}}@keyframes sk-bouncedelay{0%,80%,100%{-webkit-transform:scale(0);transform:scale(0)}40%{-webkit-transform:scale(1);transform:scale(1)}}.ovp-message-box{position:absolute;top:0;left:0;width:100%;height:100%}.ovp-message-box .ovp-message-container{position:absolute;top:60px;width:100%;padding:0 12px;text-align:center}.ovp-message-box .ovp-message-container .ovp-message-text{font-size:140%;background-color:rgba(0,0,0,0.5);color:#fff;padding:.1em .3em;word-wrap:break-word;line-height:1.5em}.ovp-bigbutton-container{position:absolute;top:0;left:0;width:100%;height:100%}.ovp-bigbutton-container .ovp-bigbutton{position:absolute;top:50%;left:50%;width:80px;height:80px;margin-top:-40px;margin-left:-40px;text-align:center}.ovp-bigbutton-container .ovp-bigbutton.ovp-bigbutton-play{background:url("+o(n(39))+");background-size:100%}.ovp-bigbutton-container .ovp-bigbutton.ovp-bigbutton-pause{background:url("+o(n(38))+");background-size:100%}.ovp-bigbutton-container .ovp-bigbutton.ovp-bigbutton-replay{background:url("+o(n(37))+");background-size:100%}.ovp-setting-panel{position:absolute;bottom:55px;right:12px;overflow-y:auto;width:260px;font-size:120%;user-select:none;background-color:rgba(28,28,28,0.9);text-shadow:0 0 2px rgba(0,0,0,0.5)}.ovp-setting-panel .ovp-setting-title,.ovp-setting-panel .ovp-setting-item{width:100%;height:38px;line-height:38px;color:#eee;cursor:pointer;outline:none}.ovp-setting-panel .ovp-setting-title-container .ovp-setting-title .ovp-setting-title-title{padding-left:12px}.ovp-setting-panel .ovp-setting-title-container .ovp-setting-title .ovp-setting-title-previcon{padding:0 0 0 12px;margin-right:-6px}.ovp-setting-panel .ovp-setting-item-container .ovp-setting-item:hover{background-color:rgba(255,255,255,0.1)}.ovp-setting-panel .ovp-setting-item-container .ovp-setting-item .ovp-setting-item-title{padding-left:12px}.ovp-setting-panel .ovp-setting-item-container .ovp-setting-item .ovp-setting-item-nexticon{float:right;padding-right:12px;margin-left:-6px}.ovp-setting-panel .ovp-setting-item-container .ovp-setting-item span.ovp-setting-item-value{float:right;padding-right:12px}.ovp-setting-panel .ovp-setting-item-container .ovp-setting-item.ovp-setting-item-value .ovp-setting-item-title{margin-left:-6px}.ovp-setting-panel .ovp-setting-item-container .ovp-setting-item.ovp-setting-item-value .ovp-setting-item-checked{padding-left:12px;visibility:hidden}.ovp-setting-panel .ovp-setting-item-container .ovp-setting-item.ovp-setting-item-value .ovp-setting-item-checked.ovp-show{visibility:visible}.ovp-controls-container .ovp-bottom-panel{position:absolute;left:0px;right:0px;bottom:0px;height:50px;z-index:60;-moz-transition:opacity .25s cubic-bezier(0, 0, .2, 1);-webkit-transition:opacity .25s cubic-bezier(0, 0, .2, 1);transition:opacity .25s cubic-bezier(0, 0, .2, 1)}.ovp-controls-container .ovp-bottom-panel .ovp-progressbar-container{display:block;position:absolute;width:100%;bottom:50px;height:4px;cursor:pointer}.ovp-controls-container .ovp-bottom-panel .ovp-progressbar-container .ovp-progressbar-padding{position:absolute;width:100%;height:16px;bottom:0;z-index:28}.ovp-controls-container .ovp-bottom-panel .ovp-controls{position:absolute;bottom:0;width:100%;height:50px;text-align:left}.ovp-controls-container .ovp-bottom-panel .ovp-controls .ovp-button{min-width:30px;height:30px;cursor:pointer}.ovp-controls-container .ovp-bottom-panel .ovp-controls .ovp-left-controls{float:left;height:100%}.ovp-controls-container .ovp-bottom-panel .ovp-controls .ovp-right-controls{float:right;height:100%}.ovp-controls-container .ovp-bottom-panel .ovp-controls .ovp-right-controls .ovp-setting-button{position:relative;top:10px;margin-right:12px}.ovp-controls-container .ovp-bottom-panel .ovp-controls .ovp-right-controls .ovp-setting-button>i{display:inline-block;width:100%;height:100%;background-size:100%;background:url("+o(n(36))+")}.ovp-progressbar{position:absolute;bottom:0;left:0;width:100%;height:100%;z-index:31;outline:none}.ovp-progressbar .ovp-play-background-color{background-color:#50e3c2}.ovp-progressbar .ovp-progress-list{position:relative;height:100%;background:rgba(255,255,255,0.2);z-index:39}.ovp-progressbar .ovp-progress-list .ovp-load-progress,.ovp-progressbar .ovp-progress-list .ovp-play-progress,.ovp-progressbar .ovp-progress-list .ovp-hover-progress{position:absolute;left:0;bottom:0;width:100%;height:100%;-moz-transform-origin:0 0;-ms-transform-origin:0 0;-webkit-transform-origin:0 0;transform-origin:0 0}.ovp-progressbar .ovp-progress-list .ovp-play-progress{width:0;z-index:34;-webkit-transition:width .1s ease;transition:width .1s ease}.ovp-progressbar .ovp-progress-list .ovp-load-progress{width:0;z-index:33;background-color:rgba(255,255,255,0.5);-webkit-transition:width .5s ease;transition:width .5s ease}.ovp-progressbar .ovp-progress-list .ovp-hover-progress{left:0;width:0;z-index:35;background-color:rgba(255,255,255,0.6)}.ovp-progressbar .ovp-progressbar-knob-container{position:absolute;top:-5px;left:0px;z-index:43;-moz-transition:-moz-transform .1s cubic-bezier(.4, 0, 1, 1);-webkit-transition:-webkit-transform .1s cubic-bezier(.4, 0, 1, 1);-ms-transition:-ms-transform .1s cubic-bezier(.4, 0, 1, 1);transition:transform .1s cubic-bezier(.4, 0, 1, 1);-moz-transform:scale(0);-ms-transform:scale(0);-webkit-transform:scale(0);transform:scale(0)}.ovp-progressbar .ovp-progressbar-knob-container .ovp-progressbar-knob{width:14px;height:14px;border-radius:7px;-webkit-transition:width .1s ease;transition:width .1s ease}.ovp-progressbar .ovp-progressbar-time{display:none;position:absolute;bottom:15px;left:0;width:auto;background-color:rgba(28,28,28,0.9);border-radius:2px;padding:5px 9px;font-size:118%;line-height:15px;user-select:none}.ovp-progressbar-hover .ovp-progressbar-knob-container{-moz-transform:none;-ms-transform:none;-webkit-transform:none;transform:none;-moz-transition:-moz-transform .1s cubic-bezier(0, 0, .2, 1);-webkit-transition:-webkit-transform .1s cubic-bezier(0, 0, .2, 1);-ms-transition:-ms-transform .1s cubic-bezier(0, 0, .2, 1);transition:transform .1s cubic-bezier(0, 0, .2, 1)}.ovp-progressbar-hover .ovp-progressbar-time{display:inline-block}.ovp-on-error .ovp-progressbar-time{display:none}.ovp-play-button{position:relative;top:10px;margin-left:15px}.ovp-play-button>i{display:inline-block;width:100%;height:100%;background-size:100%}.ovp-play-button .ovp-play-button-playicon{background:url("+o(n(35))+")}.ovp-play-button .ovp-play-button-pauseicon{background:url("+o(n(34))+")}.ovp-volume-controller{display:inline-block;position:relative;top:10px;margin-left:12px;height:30px}.ovp-volume-controller .ovp-volume-button>i{display:inline-block;width:100%;height:100%;background-size:100%}.ovp-volume-controller .ovp-volume-button .ovp-volume-button-bigicon{background:url("+o(n(33))+")}.ovp-volume-controller .ovp-volume-button .ovp-volume-button-smallicon{background:url("+o(n(32))+")}.ovp-volume-controller .ovp-volume-button .ovp-volume-button-muteicon{background:url("+o(n(31))+")}.ovp-volume-controller .ovp-volume-slider-container{display:inline-block;position:relative;width:0px;height:100%;overflow:hidden;cursor:pointer;user-select:none;outline:none;-moz-transition:margin .2s cubic-bezier(.4, 0, 1, 1),width .2s cubic-bezier(.4, 0, 1, 1);-webkit-transition:margin .2s cubic-bezier(.4, 0, 1, 1),width .2s cubic-bezier(.4, 0, 1, 1);transition:margin .2s cubic-bezier(.4, 0, 1, 1),width .2s cubic-bezier(.4, 0, 1, 1)}.ovp-volume-controller .ovp-volume-slider-container.active{width:70px;margin-left:8px;margin-right:0;-moz-transition:margin .2s cubic-bezier(0, 0, .2, 1),width .2s cubic-bezier(0, 0, .2, 1);-webkit-transition:margin .2s cubic-bezier(0, 0, .2, 1),width .2s cubic-bezier(0, 0, .2, 1);transition:margin .2s cubic-bezier(0, 0, .2, 1),width .2s cubic-bezier(0, 0, .2, 1)}.ovp-volume-controller .ovp-volume-slider-container .ovp-volume-silder{height:100%;position:relative;overflow:hidden}.ovp-volume-controller .ovp-volume-slider-container .ovp-volume-silder .ovp-volume-slider-bg,.ovp-volume-controller .ovp-volume-slider-container .ovp-volume-silder .ovp-volume-slider-value{position:absolute;display:block;left:0;top:50%;height:4px;margin-top:-2px;border-radius:10px}.ovp-volume-controller .ovp-volume-slider-container .ovp-volume-silder .ovp-volume-slider-bg{width:100%;background:#fff}.ovp-volume-controller .ovp-volume-slider-container .ovp-volume-silder .ovp-volume-slider-value{width:100%;background:#50e3c2}.ovp-volume-controller .ovp-volume-slider-container .ovp-volume-silder .ovp-volume-slider-handle{position:absolute;top:50%;left:30px;width:12px;height:12px;border-radius:6px;margin-top:-6px;background:#fff}.ovp-volume-controller .ovp-volume-slider-container .ovp-volume-silder .ovp-volume-slider-handle:before,.ovp-volume-controller .ovp-volume-slider-container .ovp-volume-silder .ovp-volume-slider-handle:after{content:'';position:absolute;display:none;top:50%;height:4px;margin-top:-2px;width:80px;z-index:-1}.ovp-volume-controller .ovp-volume-slider-container .ovp-volume-silder .ovp-volume-slider-handle:before{left:-58px;background:#50e3c2}.ovp-volume-controller .ovp-volume-slider-container .ovp-volume-silder .ovp-volume-slider-handle:after{left:6px;background:#fff}.ovp-time-display{display:inline-block;position:relative;top:10px;margin-left:12px;height:30px;white-space:nowrap;line-height:30px;vertical-align:top;font-size:14px;user-select:none}.ovp-time-display .ovp-time-current,.ovp-time-display .ovp-time-separator,.ovp-time-display .ovp-time-duration{color:#fff}.ovp-time-display .ovp-live-badge{opacity:1;display:inline-block;width:auto;font-size:14px}.ovp-time-display .ovp-live-badge:before{background:#ff0000;display:inline-block;position:relative;top:-2px;width:6px;height:6px;margin-right:5px;content:'';border-radius:6px}.ovp-time-display .ovp-live-badge .ovp-live-badge-lowlatency{display:inline-block;margin-right:5px}.ovp-context-panel{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;display:block;position:absolute;overflow:hidden;width:200px;padding:6px 0;background:rgba(28,28,28,0.9);text-shadow:0 0 2px rgba(0,0,0,0.5);z-index:2300;font-family:Roboto,Arial,Helvetica,sans-serif;font-size:11px;font-weight:100;user-select:none}.ovp-context-panel:before,.ovp-context-panel:after{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box}.ovp-context-panel *,.ovp-context-panel *:before,.ovp-context-panel *:after{-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box}.ovp-context-panel .ovp-context-item{width:100%;height:38px;padding-left:12px;line-height:38px;color:#eee;cursor:pointer;outline:none;font-size:120%}.ovp-context-panel .ovp-context-item:hover{background-color:rgba(255,255,255,0.1)}.ovp-fullscreen-button{position:relative;top:10px;margin-right:15px}.ovp-fullscreen-button>i{display:inline-block;width:100%;height:100%;background-size:100%}.ovp-fullscreen-button .ovp-fullscreen-button-expandicon{background:url("+o(n(30))+")}.ovp-fullscreen-button .ovp-fullscreen-button-compressicon{background:url("+o(n(29))+")}@keyframes fade{from{opacity:.3}55%{opacity:1}75%{opacity:1}to{opacity:.3}}@-webkit-keyframes shake{from,to{-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0)}10%,30%,50%,70%,90%{-webkit-transform:translate3d(-10px, 0, 0);transform:translate3d(-10px, 0, 0)}20%,40%,60%,80%{-webkit-transform:translate3d(10px, 0, 0);transform:translate3d(10px, 0, 0)}}@keyframes shake{from,to{-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0)}10%,30%,50%,70%,90%{-webkit-transform:translate3d(-10px, 0, 0);transform:translate3d(-10px, 0, 0)}20%,40%,60%,80%{-webkit-transform:translate3d(10px, 0, 0);transform:translate3d(10px, 0, 0)}}.ovp-player .shake{-webkit-animation-name:shake;animation-name:shake}@-webkit-keyframes bounceIn{from,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215, .61, .355, 1);animation-timing-function:cubic-bezier(.215, .61, .355, 1)}0%{opacity:0;-webkit-transform:scale3d(.5, .5, .5);transform:scale3d(.5, .5, .5)}20%{-webkit-transform:scale3d(1.1, 1.1, 1.1);transform:scale3d(1.1, 1.1, 1.1)}40%{-webkit-transform:scale3d(.9, .9, .9);transform:scale3d(.9, .9, .9)}60%{opacity:1;-webkit-transform:scale3d(1.03, 1.03, 1.03);transform:scale3d(1.03, 1.03, 1.03)}80%{-webkit-transform:scale3d(.97, .97, .97);transform:scale3d(.97, .97, .97)}to{opacity:1;-webkit-transform:scale3d(1, 1, 1);transform:scale3d(1, 1, 1)}}@keyframes bounceIn{from,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215, .61, .355, 1);animation-timing-function:cubic-bezier(.215, .61, .355, 1)}0%{opacity:0;-webkit-transform:scale3d(.3, .3, .3);transform:scale3d(.3, .3, .3)}20%{-webkit-transform:scale3d(1.1, 1.1, 1.1);transform:scale3d(1.1, 1.1, 1.1)}40%{-webkit-transform:scale3d(.9, .9, .9);transform:scale3d(.9, .9, .9)}60%{opacity:1;-webkit-transform:scale3d(1.03, 1.03, 1.03);transform:scale3d(1.03, 1.03, 1.03)}80%{-webkit-transform:scale3d(.97, .97, .97);transform:scale3d(.97, .97, .97)}to{opacity:1;-webkit-transform:scale3d(1, 1, 1);transform:scale3d(1, 1, 1)}}.ovp-player .bounceIn{-webkit-animation-duration:.75s;animation-duration:.75s;-webkit-animation-name:bounceIn;animation-name:bounceIn}@-webkit-keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}.ovp-player .fadeIn{-webkit-animation-name:fadeIn;animation-name:fadeIn}.ovp-player .animated{-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-fill-mode:both;animation-fill-mode:both}@media (prefers-reduced-motion){.ovp-player .animated{-webkit-animation:unset !important;animation:unset !important;-webkit-transition:none !important;transition:none !important}}.ovp-caption-viewer{position:absolute;top:0;left:0;width:100%;height:100%}.ovp-caption-viewer .ovp-caption-text-container{position:absolute;bottom:60px;width:100%;padding:0 12px;text-align:center;-moz-transition:bottom .25s cubic-bezier(0, 0, .2, 1);-webkit-transition:bottom .25s cubic-bezier(0, 0, .2, 1);transition:bottom .25s cubic-bezier(0, 0, .2, 1)}.ovp-caption-viewer .ovp-caption-text-container .ovp-caption-text{display:none;font-size:220%;background-color:rgba(8,8,8,0.75);border-radius:3px;color:#fff;padding:.1em .3em;word-wrap:break-word;line-height:1.5em;user-select:none}.ovp-caption-button{width:36px}.ovp-caption-button>i{font-size:18px;-moz-transition:color .25s cubic-bezier(0, 0, .2, 1);-webkit-transition:color .25s cubic-bezier(0, 0, .2, 1);transition:color .25s cubic-bezier(0, 0, .2, 1)}.ovp-caption-active .ovp-caption-button>i{color:#F36446}",""])},
/* 43 */
/***/function(e,t,n){var o=n(42);"string"==typeof o&&(o=[[e.i,o,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(28)(o,r);o.locals&&(e.exports=o.locals)},
/* 44 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=i(n(1)),r=i(n(5));function i(e){return e&&e.__esModule?e:{default:e}}
/**
 * Created by hoho on 2018. 8. 1..
 */t.default=function(e,t,n){var i=(0,r.default)("#"+t.getId()),a={"click .ovp-context-item":function(e,t,n){e.preventDefault(),window.open("https://github.com/AirenSoft/OvenPlayer","_blank")}};return(0,o.default)(e,"ContextPanel",n,a,function(e,t){var o=e.width(),r=e.height(),a=Math.min(n.pageX-i.offset().left,i.width()-o),u=Math.min(n.pageY-i.offset().top,i.height()-r);e.css("left",a+"px"),e.css("top",u+"px")},function(){
//Do nothing.
})}},
/* 45 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=u(n(1)),r=u(n(8)),i=u(n(5)),a=u(n(0));function u(e){return e&&e.__esModule?e:{default:e}}
/**
 * Created by hoho on 2018. 7. 26..
 */t.default=function e(t,n,u){var l=(0,i.default)("#"+n.getId()),s={"click .ovp-setting-main-item":function(o,a,u){o.preventDefault();var l=(0,i.default)(o.currentTarget).attr("ovp-panel-type");
//parent must be not $current!
r.default.push(e(t,n,function(e){var t={title:"",body:[],type:e};if("playbackrate"===e){t.title="Speed";for(var o=n.getConfig().playbackRates,r=n.getPlaybackRate(),i=0;i<o.length;i++){var a={title:1===o[i]?"Normal":o[i],isCheck:r===o[i],value:o[i]};t.body.push(a)}}else if("qualitylevel"===e){t.title="Source";for(var u=n.getQualityLevels(),l=n.getCurrentQuality(),s=0;s<u.length;s++){var c={title:u[s].label,isCheck:l===s,value:s};t.body.push(c)}}return t}(l)))},"click .ovp-setting-title":function(e,t,n){e.preventDefault(),r.default.pop().destroy()},"click .ovp-setting-item-value":function(e,t,o){e.preventDefault();var u=(0,i.default)(e.currentTarget).attr("ovp-panel-type"),l=(0,i.default)(e.currentTarget).attr("ovp-data-value");u&&l&&("playbackrate"===u?n.setPlaybackRate(parseFloat(l)):"qualitylevel"===u&&n.setCurrentQuality(parseInt(l)),
//clear all SettingPanelTemplate
a.default.each(r.default,function(e){e.destroy()}),r.default.splice(0,r.default.length))}};return(0,o.default)(t,"SettingPanel",u,s,function(e,t){220>l.height()&&l.find(".ovp-setting-panel").css("maxHeight","114px")},function(){
//Do nothing.
})}},
/* 46 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=i(n(1)),r=i(n(5));function i(e){return e&&e.__esModule?e:{default:e}}
/**
 * Created by hoho on 2018. 7. 26..
 */t.default=function(e,t){var n=(0,r.default)("#"+t.getId()),i="",a="",u=!1,l={onfullscreenchange:"fullscreenchange",onmozfullscreenchange:"mozfullscreenchange",onwebkitfullscreenchange:"webkitfullscreenchange",MSFullscreenChange:"MSFullscreenChange"},s=function(e){document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement?(n.addClass("ovp-fullscreen"),u=!0,i.hide(),a.show()):(n.removeClass("ovp-fullscreen"),u=!1,i.show(),a.hide())},c=function(){u?document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen():n.get().requestFullscreen?n.get().requestFullscreen():n.get().webkitRequestFullscreen?n.get().webkitRequestFullscreen():n.get().mozRequestFullScreen?n.get().mozRequestFullScreen():n.get().msRequestFullscreen&&n.get().msRequestFullscreen()},p={"click .ovp-fullscreen-button":function(e,t,n){e.preventDefault(),c()}};return(0,o.default)(e,"FullScreenButton",null,p,function(e,t){i=e.find(".ovp-fullscreen-button-expandicon"),a=e.find(".ovp-fullscreen-button-compressicon"),
//Bind Global(document) Event
Object.keys(l).forEach(function(e){
//Difference between undefined and null.
//undefined is not support. null is support but not inited.
null===document[e]&&document.addEventListener(l[e],s)})},function(){
//Unbind Global(document) Event
Object.keys(l).forEach(function(e){null===document[e]&&document.removeEventListener(l[e],s)})})}},
/* 47 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(e){return e&&e.__esModule?e:{default:e}}
/**
 * Created by hoho on 2018. 7. 25..
 */(n(1)),r=n(4);t.default=function(e,t,n){var i="",a="",u=function(e){return(0,r.naturalHms)(e)};return(0,o.default)(e,"TimeDisplay",n,{},function(e,o){i=e.find(".ovp-time-current"),a=e.find(".ovp-time-duration"),n.duration!==1/0&&(a.text(u(n.duration)),t.on("time",function(e){i.text(u(e.position))}))},function(){
//Do nothing.
})}},
/* 48 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=u(n(1)),r=u(n(8)),i=n(4),a=u(n(5));n(2);function u(e){return e&&e.__esModule?e:{default:e}}
/**
    * Created by hoho on 2018. 7. 24..
    */
t.default=function(e,t){var n=(0,a.default)("#"+t.getId()),u=0,l=0,s=0,c=!1,p="",f="",d="",v="",b="",g="",m=0,y="",h=function(e){var t=p.width(),n=t*e;d.css("width",n+"px"),v.css("left",n+"px");var o=(t-m)*e;b.css("left",o+"px"),u=n,l=e},w=function(e){var t=p.width()*e;v.css("width",0==e?e:t-u+"px")},x=function(e){var t=p.width()*e;f.css("width",t+"px"),s=e},_=function(e){var t=p.width(),n=p.offset().left,o=(e.pageX-n)/t;return o<0?0:o>1?1:o},k=function(e,n){if(r.default.length>0)y.hide();else{var o=t.getDuration()*e,a=(0,i.naturalHms)(o);y.text(a);var u=y.width(),l=p.width(),s=l*e,c=n.pageX-p.offset().left;y.css("left",(c<u/2?0:l-c<u/2?l-u:s-u/2)+"px")}},P=function(e){t.seek((t.getDuration()||0)*e)},E={"resize window":function(e,t,n){e.preventDefault(),h(l),x(s)},"mouseenter .ovp-progressbar":function(e,t,o){e.preventDefault(),n.addClass("ovp-progressbar-hover"),y.show()},"mouseleave .ovp-progressbar":function(e,t,o){e.preventDefault(),n.removeClass("ovp-progressbar-hover"),y.hide(),w(0)},"mousedown .ovp-progressbar":function(e,t,n){e.preventDefault(),c=!0;var o=_(e);h(o),w(0),P(o)},"mousemove .ovp-progressbar":function(e,t,n){if(e.preventDefault(),!c){var o=_(e);w(o),k(o,e)}},"mousemove document":function(e,t,n){if(e.preventDefault(),c){var o=_(e);h(o),w(0),P(o),k(o,e)}},"mouseup document":function(e,t,o){e.preventDefault(),c&&(c=!1,n.removeClass("ovp-progressbar-hover"))}};return(0,o.default)(e,"ProgressBar",null,E,function(e,n){p=e,f=e.find(".ovp-load-progress"),d=e.find(".ovp-play-progress"),v=e.find(".ovp-hover-progress"),b=e.find(".ovp-progressbar-knob-container"),g=e.find(".ovp-progressbar-knob"),m=g.width(),y=e.find(".ovp-progressbar-time"),t.on("time",function(e){e&&e.duration&&e.position&&h(e.position/e.duration)}),t.on("bufferChanged",function(e){e&&e.bufferPercent&&x(e.bufferPercent/100)})},function(){})}},
/* 49 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},r=function(e){return e&&e.__esModule?e:{default:e}}(n(1));
/**
                                                                                                                                                                                                                                                                   * Created by hoho on 2018. 7. 20..
                                                                                                                                                                                                                                                                   */t.default=function(e,t){var n="",i="",a="",u="",l="",s="",c="",p=!1,f=0,d=0,v=function(e){t.getMute()&&(e=0),function(e){l.hide(),s.hide(),c.hide(),e>=50?l.show():e<50&&e>0?s.show():0==e&&c.show()}(e);var n=d*e/100;a.css("left",n+"px"),u.css("width",n+"px")},b=function(e){var t=(e.pageX-i.offset().left)/70*100;return t<0&&(t=0),t>100&&(t=100),t},g={"click .ovp-volume-button":function(e,n,o){e.preventDefault(),0===t.getVolume()?(t.setMute(!1),t.setVolume(100)):t.setMute()},"mouseenter .ovp-volume-button":function(e,t,o){e.preventDefault(),n.addClass("active")},"mouseleave .ovp-volume-silder":function(e,t,n){e.preventDefault(),p=!1},"mousedown .ovp-volume-silder":function(e,n,o){e.preventDefault(),p=!0,t.setMute(!1),t.setVolume(b(e))},"mouseup .ovp-volume-silder":function(e,t,n){e.preventDefault(),p=!1},"mousemove .ovp-volume-silder":function(e,n,o){if(e.preventDefault(),!p)return!1;t.setVolume(b(e))}};return o((0,r.default)(e,"VolumeButton",null,g,function(e,o){n=e.find(".ovp-volume-slider-container"),i=e.find(".ovp-volume-silder"),a=e.find(".ovp-volume-slider-handle"),u=e.find(".ovp-volume-slider-value"),l=e.find(".ovp-volume-button-bigicon"),s=e.find(".ovp-volume-button-smallicon"),c=e.find(".ovp-volume-button-muteicon"),f=a.width(),d=70-f,t.on("ready",function(){v(t.getVolume())}),t.on("volumeChanged",function(e){v(e.volume)}),t.on("mute",function(e){e.mute?v(0):v(t.getVolume())})},function(){}),{setMouseDown:function(e){p=e}})}},
/* 50 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(e){return e&&e.__esModule?e:{default:e}}
/**
 * Created by hoho on 2018. 7. 24..
 */(n(1)),r=n(2);t.default=function(e,t){var n="",i="",a="",u={"click .ovp-play-button":function(e,n,o){e.preventDefault();var i=t.getState();i===r.STATE_IDLE?t.play():i===r.STATE_PLAYING?t.pause():i===r.STATE_PAUSED?t.play():i===r.STATE_COMPLETE&&t.play()}};return(0,o.default)(e,"PlayButton",null,u,function(e,o){n=e.find(".ovp-play-button-playicon"),i=e.find(".ovp-play-button-pauseicon"),a=e.find(".ovp-play-button-replayicon"),t.on(r.PLAYER_STATE,function(e){e&&e.newstate&&function(e){n.hide(),i.hide(),a.hide(),e===r.STATE_PLAYING?i.show():e===r.STATE_PAUSED?n.show():(r.STATE_COMPLETE,n.show())}(e.newstate)})},function(){
//Do nothing.
})}},
/* 51 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=d(n(1)),r=d(n(50)),i=d(n(49)),a=d(n(48)),u=d(n(47)),l=d(n(46)),s=d(n(45)),c=d(n(8)),p=d(n(0)),f=n(2);function d(e){return e&&e.__esModule?e:{default:e}}
/**
 * Created by hoho on 2018. 7. 20..
 */t.default=function(e,t){var n="",d="",v="",b={"mouseleave .ovp-controls":function(e,t,o){e.preventDefault(),n.setMouseDown(!1),t.find(".ovp-volume-slider-container").removeClass("active")},"click .ovp-setting-button":function(e,n,o){e.preventDefault(),
//toggle
c.default.length>0?(
//clear all SettingPanelTemplate
p.default.each(c.default,function(e){e.destroy()}),c.default.splice(0,c.default.length)):c.default.push((0,s.default)(n,t,function(){var e={title:"Settings",isMain:!0,body:[]};if(t.getDuration()!==1/0){var n={title:"Speed",value:1===t.getPlaybackRate()?"Normal":t.getPlaybackRate(),type:"playbackrate"};e.body.push(n)}if(t.getQualityLevels().length>0){var o=t.getQualityLevels(),r=t.getCurrentQuality(),i={title:"Source",value:o[r]?o[r].label:"Default",type:"qualitylevel"};e.body.push(i)}return e}()))}};return(0,o.default)(e,"Controls",null,b,function(e,o){(0,r.default)(e.find(".ovp-left-controls"),t),n=(0,i.default)(e.find(".ovp-left-controls"),t),(0,l.default)(e.find(".ovp-right-controls"),t),t.on(f.CONTENT_META,function(n){!function(n){v&&v.destroy(),v=(0,u.default)(e.find(".ovp-left-controls"),t,n)}(n),n.duration===1/0?
//live
d&&d.destroy():(d&&d.destroy(),d=(0,a.default)(e.find(".ovp-progressbar-container"),t))}),t.on(f.ERROR,function(e){o.destroy()})},function(){
//Do nothing.
})}},
/* 52 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},r=function(e){return e&&e.__esModule?e:{default:e}}(n(1));
/**
                                                                                                                                                                                                                                                                   * Created by hoho on 2018. 7. 25..
                                                                                                                                                                                                                                                                   */t.default=function(e,t){var n="";return o((0,r.default)(e,"Spinner",null,{},function(e,t){n=e},function(){
//Do nothing.
}),{show:function(e){e?n.show():n.hide()}})}},
/* 53 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(e){return e&&e.__esModule?e:{default:e}}
/**
 * Created by hoho on 2018. 7. 24..
 */(n(1));n(2);t.default=function(e,t,n,r){var i="",a={"click .ovp-message-text":function(e,t,n){e.preventDefault(),i&&clearTimeout(i),n.destroy()}};return(0,o.default)(e,"MessageBox",n,a,function(e,t){r&&(i=setTimeout(function(){t.destroy()},r||5e3))},function(){})}},
/* 54 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(e){return e&&e.__esModule?e:{default:e}}
/**
 * Created by hoho on 2018. 7. 24..
 */(n(1));n(2);t.default=function(e,t,n){return(0,o.default)(e,"BigButton",n,{},function(e,t,n){
//Do nothing!
},function(){
//Do nothing!
})}},
/* 55 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=l(n(1)),r=l(n(54)),i=l(n(53)),a=l(n(52)),u=n(2);function l(e){return e&&e.__esModule?e:{default:e}}
/**
    * Created by hoho on 2018. 7. 24..
    */
t.default=function(e,t){var n="",l="",s="";return(0,o.default)(e,"Helper",null,{},function(e,o){var c=function(o){n&&n.destroy(),n=(0,r.default)(e,t,o)},p=function(n,o){l&&l.destroy(),l=(0,i.default)(e,t,n,o)};s=(0,a.default)(e,t),t.on(u.READY,function(){c(u.STATE_PAUSED)}),t.on(u.PLAYER_STATE,function(e){e&&e.newstate&&(e.newstate===u.STATE_PLAYING?(n.destroy(),s.show(!1)):(c(e.newstate),e.newstate===u.STATE_STALLED||e.newstate===u.STATE_LOADING?s.show(!0):s.show(!1)))}),t.on(u.ERROR,function(e){var t="";t=100===e.code?"Initialization failed.":301===e.code?"Media playback was canceled.":302===e.code?"Some of the media could not be downloaded due to a network error.":303===e.code?"Unable to load media. This may be due to a server or network error, or due to an unsupported format.":304===e.code?"Media playback has been canceled. It looks like your media is corrupted or your browser does not support the features your media uses.":5===parseInt(e.code/100)?"Connection with low-latency server failed.":"Can not play due to unknown reasons.",p(t,null)}),t.on(u.NETWORK_UNSTABLED,function(e){var n="Because the network connection is unstable, the following media source will be played.";t.getCurrentQuality()+1===t.getQualityLevels().length&&(n="Network connection is unstable. Check the network connection."),p(n,5e3)})},function(){
//Do nothing.
})}},
/* 56 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(){window.Element&&!Element.prototype.closest&&(Element.prototype.closest=function(e){var t,n=(this.document||this.ownerDocument).querySelectorAll(e),o=this;do{for(t=n.length;--t>=0&&n.item(t)!==o;);}while(t<0&&(o=o.parentElement));return o})}},
/* 57 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.settingValueTemplate=t.settingItemTemplate=void 0;var o=function(e){return e&&e.__esModule?e:{default:e}}(n(0));t.default=function(e){var t='<div class="ovp-setting-panel '+(e.isMain?"animated fadeIn":"")+'"><div class="ovp-setting-title-container"><div class="ovp-setting-title" tabindex="0">'+(e.isMain?"":'<span class="ovp-setting-title-previcon">&lt;</span>')+'<span class="ovp-setting-title-title">'+e.title+'</span></div></div><div class="ovp-setting-item-container">';return o.default.forEach(e.body,function(n){e.isMain?t+=r(n.title,n.value,n.type):t+=i(n.title,n.value,e.type,n.isCheck)}),t+="</div></div>"};var r=t.settingItemTemplate=function(e,t,n){return'<div class="ovp-setting-item ovp-setting-main-item" ovp-panel-type="'+n+'"><span class="ovp-setting-item-title">'+e+'</span><span class="ovp-setting-item-nexticon">&gt;</span><span class="ovp-setting-item-value">'+t+"</span></div>"},i=t.settingValueTemplate=function(e,t,n,o){return'<div class="ovp-setting-item ovp-setting-item-value" ovp-panel-type="'+n+'" ovp-data-value="'+t+'"><span class="ovp-setting-item-checked '+(o?"ovp-show":"")+'">&#x2713;</span><span class="ovp-setting-item-title">'+e+"</span></div>"}},
/* 58 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return'<button class="ovp-button ovp-fullscreen-button"><i class="ovp-fullscreen-button-expandicon"></i><i class="ovp-fullscreen-button-compressicon"></i></button>'}},
/* 59 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return'<div class="ovp-time-display">'+(e.duration===1/0?'<button class="ovp-live-badge ovp-button" disabled="disabled">'+("webrtc"==e.type?'<span class="ovp-live-badge-lowlatency">low latency live</span>':"<span>live</span>")+"</button>":'<span class="ovp-time-current">0:00</span><span class="ovp-time-separator"> / </span><span class="ovp-time-duration">0:00</span>')+"</div>"}},
/* 60 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return'<button class="ovp-button ovp-play-button" type="button"><i class="ovp-play-button-playicon"></i><i class="ovp-play-button-pauseicon"></i><i class="ovp-play-button-replayicon"></i></button>'}},
/* 61 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return'<div class="ovp-progressbar" tabindex="0"><div class="ovp-progressbar-padding"></div><div class="ovp-progress-list"><div class="ovp-load-progress"></div><div class="ovp-play-progress ovp-play-background-color"></div><div class="ovp-hover-progress"></div></div><div class="ovp-progressbar-knob-container"><div class="ovp-progressbar-knob ovp-play-background-color"></div></div><span class="ovp-progressbar-time">0:00</span></div>'}},
/* 62 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),
/**
 * Created by hoho on 2018. 7. 20..
 */
t.default=function(){return'<div class="ovp-volume-controller"><button class="ovp-button ovp-volume-button"><i class="ovp-volume-button-bigicon"></i><i class="ovp-volume-button-smallicon"></i><i class="ovp-volume-button-muteicon"></i></button><div class="ovp-volume-slider-container"><div class="ovp-volume-silder"><div class="ovp-volume-slider-bg"></div><div class="ovp-volume-slider-value"></div><div class="ovp-volume-slider-handle"></div></div></div></div>'}},
/* 63 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(){return'<div class="ovp-controls-container"><div class="ovp-gradient-bottom"></div><div class="ovp-bottom-panel">    <div class="ovp-progressbar-container">    </div>    <div class="ovp-controls">        <div class="ovp-left-controls">        </div>        <div class="ovp-right-controls">               <button class="ovp-button ovp-setting-button"><i class="ovp-setting-button-icon"></i></button>        </div>    </div></div>'}},
/* 64 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(10);t.default=function(){return'<div class="ovp-context-panel animated fadeIn"><div class="ovp-context-item" tabindex="0"><span class="ovp-context-item-text">Help</span></div><div class="ovp-context-item" tabindex="1"><span class="ovp-context-item-text">About OvenPlayer '+o.version+"</span></div></div>"}},
/* 65 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return'<div class="ovp-spinner-container"><div class="ovp-spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>'}},
/* 66 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return'<div class="ovp-message-box animated shake"><div class="ovp-message-container"><span class="ovp-message-text">'+e+"</span></div></div>"}},
/* 67 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(2);t.default=function(e){return'<div class="ovp-bigbutton-container ">'+(//animated bounceIn
e===o.STATE_PLAYING?'<i class="ovp-bigbutton ovp-bigbutton-pause"></i>':"")+(e===o.STATE_PAUSED?'<i class="ovp-bigbutton ovp-bigbutton-play"></i>':"")+(e===o.STATE_COMPLETE?'<i class="ovp-bigbutton ovp-bigbutton-replay"></i>':"")+"</div>"}},
/* 68 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){return'<div class="ovp-helpers-container"></div>'}},
/* 69 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){return'<div class="ovenplayer ovp-wrapper" tabindex="-1" aria-label="" id="'+e+'"><div class="ovp-ratio"></div><div class="ovp-player"><div class="ovp-media-element-container"></div><div class="ovp-ui"></div></div></div>'}},
/* 70 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){return'<div class="textView" style="padding : 5px; background: red"><h3>'+e+'</h3><button type="button" class="btn">닫기</button></div>'}},
/* 71 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=m(n(70)),r=m(n(69)),i=m(n(68)),a=m(n(67)),u=m(n(66)),l=m(n(65)),s=m(n(64)),c=m(n(63)),p=m(n(62)),f=m(n(61)),d=m(n(60)),v=m(n(59)),b=m(n(58)),g=m(n(57));function m(e){return e&&e.__esModule?e:{default:e}}
/**
 * Created by hoho on 2018. 7. 20..
 */var y={TextViewTemplate:o.default,ViewTemplate:r.default,HelperTemplate:i.default,BigButtonTemplate:a.default,MessageBoxTemplate:u.default,SpinnerTemplate:l.default,ContextPanelTemplate:s.default,ControlsTemplate:c.default,VolumeButtonTemplate:p.default,ProgressBarTemplate:f.default,PlayButtonTemplate:d.default,TimeDisplayTemplate:v.default,FullScreenButtonTemplate:b.default,SettingPanelTemplate:g.default};t.default=y},
/* 72 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},r=f(n(1)),i=f(n(55)),a=f(n(51)),u=f(n(8)),l=f(n(44)),s=f(n(5)),c=f(n(0)),p=n(2);
/**
                                                                                                                                                                                                                                                                   * Created by hoho on 2018. 7. 20..
                                                                                                                                                                                                                                                                   */function f(e){return e&&e.__esModule?e:{default:e}}n(43);t.default=function(e){var t=void 0,n="",f="",d="",v=function(e,n){if(d&&(clearTimeout(d),d=null),e){if(u.default.length>0)return!1;t.addClass("ovp-autohide")}else t.removeClass("ovp-autohide"),n&&(d=setTimeout(function(){if(u.default.length>0)return!1;t.addClass("ovp-autohide")},1800))},b=function(){var e=f.getState();e===p.STATE_IDLE||e===p.STATE_PAUSED||e===p.STATE_COMPLETE?f.play():e===p.STATE_PLAYING&&f.pause()},g=function(e,t){var n=f.getDuration(),o=f.getPosition(),r=0;r=t?Math.max(o-e,0):Math.min(o+e,n),f.seek(r)},m=function(e){var t=f.getVolume(),n=0;n=e?Math.min(t+5,100):Math.max(t-5,0),f.setVolume(n)},y={"click .ovenplayer":function(e,t,o){if(e.preventDefault(),n)return n.destroy(),n=null,!1;(0,s.default)(e.target).closest(".ovp-controls")||(0,s.default)(e.target).closest(".ovp-setting-panel")||b(),!(0,s.default)(e.target).closest(".ovp-setting-panel")&&!(0,s.default)(e.target).closest(".ovp-setting-button")&&u.default.length>0&&(
//clear all SettingPanelTemplate
c.default.each(u.default,function(e){e.destroy()}),u.default.splice(0,u.default.length))},"mouseenter .ovenplayer":function(e,t,n){e.preventDefault(),f.getState()===p.STATE_PLAYING?v(!1,!0):v(!1)},"mousemove .ovenplayer":function(e,t,n){e.preventDefault(),f.getState()===p.STATE_PLAYING?v(!1,!0):v(!1)},"mouseleave .ovenplayer":function(e,t,n){e.preventDefault(),f.getState()===p.STATE_PLAYING&&v(!0)},"keydown .ovenplayer":function(e,t,n){switch(e.keyCode){case 32:
//sapce
e.preventDefault(),b();break;case 37:
//arrow left
e.preventDefault(),g(5,!0);break;case 39:
//arrow right
e.preventDefault(),g(5,!1);break;case 38:
//arrow up
e.preventDefault(),m(!0);break;case 40:
//arrow up
e.preventDefault(),m(!1)}},"contextmenu .ovenplayer":function(e,o,r){return e.preventDefault(),function(e,o){n&&(n.destroy(),n=null),n=(0,l.default)(t,f,{pageX:e,pageY:o})}(e.pageX,e.pageY),!1}};return o((0,r.default)(e,"View",e.id,y,function(e,n){t=e},function(){
//Do nothing.
},!0),{getMediaElementContainer:function(){return t.find(".ovp-media-element-container").get()},setApi:function(e){f=e,(0,i.default)(t.find(".ovp-ui"),e),(0,a.default)(t.find(".ovp-ui"),e),f.on(p.PLAYER_STATE,function(e){e&&e.newstate&&(e.newstate===p.STATE_PLAYING?v(!1,!0):v(!1))})}})}},
/* 73 */
/***/function(e,t,n){"use strict";var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},r=n(26),i=l(r),a=l(n(72)),u=n(9);function l(e){return e&&e.__esModule?e:{default:e}}n.p=(0,u.getScriptPath)("ovenplayer.js");var s={};window.OvenPlayer=s,
/**
 * Copy properties from OvenPlayerSDK object to OvenPlayer object
 */
o(s,i.default),s.create=function(e,t){var n=(0,r.checkAndGetContainerElement)(e),u=(0,a.default)(n),l=i.default.create(u.getMediaElementContainer(),t);
/*const view = new View();
     view.appendPlayerMarkup(containerElement);
     const playerInstance = OvenPlayerSDK.create(view.getMediaElementContainer(), options);
      view.addComponentsAndFunctions(playerInstance, options);*/
//console.log(containerElement);
return o(l,{getId:function(){return n.id}}),u.setApi(l),l}}
/******/]);
//# sourceMappingURL=ovenplayer.js.map