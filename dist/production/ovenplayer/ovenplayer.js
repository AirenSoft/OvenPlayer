/*! For license information please see ovenplayer.js.LICENSE */
/*! OvenPlayerv0.6.2 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
/******/!function(e){// webpackBootstrap
/******/ // install a JSONP callback for chunk loading
/******/function t(t){
/******/for(
/******/var n,o,i=t[0],a=t[1],u=0,l=[]
/******/;u<i.length;u++)
/******/o=i[u],
/******/r[o]&&
/******/l.push(r[o][0])
/******/,r[o]=0;
/******/for(n in a)
/******/Object.prototype.hasOwnProperty.call(a,n)&&(
/******/e[n]=a[n])
/******/;
/******/
/******/
/******/for(s&&s(t);l.length;)
/******/l.shift()();
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
/******/var i=new Promise(function(t,o){
/******/n=r[e]=[t,o];
/******/});
/******/t.push(n[2]=i);
/******/
/******/ // start chunk loading
/******/var a,u=document.getElementsByTagName("head")[0],s=document.createElement("script");
/******/
/******/
/******/s.charset="utf-8",
/******/s.timeout=120,
/******/o.nc&&
/******/s.setAttribute("nonce",o.nc)
/******/,s.src=
/******/
/******/
/******/
/******/ // script path function
/******/function(e){
/******/return o.p+""+({0:"ovenplayer.provider.DashProvider",1:"ovenplayer.provider.HlsProvider",2:"ovenplayer.provider.html5"}[e]||e)+".js"
/******/}(e),
/******/
/******/a=function(t){
/******/ // avoid mem leaks in IE.
/******/s.onerror=s.onload=null,
/******/clearTimeout(l);
/******/var n=r[e];
/******/if(0!==n){
/******/if(n){
/******/var o=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src,a=new Error("Loading chunk "+e+" failed.\n("+o+": "+i+")");
/******/
/******/a.type=o,
/******/a.request=i,
/******/n[1](a)}
/******/r[e]=void 0}
/******/};
/******/var l=setTimeout(function(){
/******/a({type:"timeout",target:s});
/******/},12e4);
/******/s.onerror=s.onload=a,
/******/u.appendChild(s)}
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
/******/var i=window.webpackJsonp=window.webpackJsonp||[],a=i.push.bind(i);
/******/
/******/i.push=t,
/******/i=i.slice();
/******/for(var u=0;u<i.length;u++)t(i[u]);
/******/var s=a;
/******/
/******/
/******/ // Load entry module and return exports
/******/o(o.s=58);
/******/}
/************************************************************************/
/******/([
/* 0 */
/***/function(e,t,n){"use strict";
/* WEBPACK VAR INJECTION */
/* WEBPACK VAR INJECTION */(function(e){var r,o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(t,n){"object"==o(e)&&"object"==o(e.exports)?e.exports=t.document?n(t,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return n(e)}:n(t)}("undefined"!=typeof window?window:void 0,function(i,a){var u=[],s=i.document,l=Object.getPrototypeOf,c=u.slice,f=u.concat,d=u.push,p=u.indexOf,v={},h=v.toString,y=v.hasOwnProperty,g=y.toString,m=g.call(Object),b={},x=function(e){return"function"==typeof e&&"number"!=typeof e.nodeType},w=function(e){return null!=e&&e===e.window},C={type:!0,src:!0,noModule:!0};function E(e,t,n){var r,o=(t=t||s).createElement("script");if(o.text=e,n)for(r in C)n[r]&&(o[r]=n[r]);t.head.appendChild(o).parentNode.removeChild(o)}function P(e){return null==e?e+"":"object"==(void 0===e?"undefined":o(e))||"function"==typeof e?v[h.call(e)]||"object":void 0===e?"undefined":o(e)}var T=function e(t,n){return new e.fn.init(t,n)},_=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;function k(e){var t=!!e&&"length"in e&&e.length,n=P(e);return!x(e)&&!w(e)&&("array"===n||0===t||"number"==typeof t&&t>0&&t-1 in e)}T.fn=T.prototype={jquery:"3.3.1",constructor:T,length:0,toArray:function(){return c.call(this)},get:function(e){return null==e?c.call(this):e<0?this[e+this.length]:this[e]},pushStack:function(e){var t=T.merge(this.constructor(),e);return t.prevObject=this,t},each:function(e){return T.each(this,e)},map:function(e){return this.pushStack(T.map(this,function(t,n){return e.call(t,n,t)}))},slice:function(){return this.pushStack(c.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(e<0?t:0);return this.pushStack(n>=0&&n<t?[this[n]]:[])},end:function(){return this.prevObject||this.constructor()},push:d,sort:u.sort,splice:u.splice},T.extend=T.fn.extend=function(){var e,t,n,r,i,a,u=arguments[0]||{},s=1,l=arguments.length,c=!1;for("boolean"==typeof u&&(c=u,u=arguments[s]||{},s++),"object"==(void 0===u?"undefined":o(u))||x(u)||(u={}),s===l&&(u=this,s--);s<l;s++)if(null!=(e=arguments[s]))for(t in e)n=u[t],u!==(r=e[t])&&(c&&r&&(T.isPlainObject(r)||(i=Array.isArray(r)))?(i?(i=!1,a=n&&Array.isArray(n)?n:[]):a=n&&T.isPlainObject(n)?n:{},u[t]=T.extend(c,a,r)):void 0!==r&&(u[t]=r));return u},T.extend({expando:"jQuery"+("3.3.1"+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isPlainObject:function(e){var t,n;return!(!e||"[object Object]"!==h.call(e)||(t=l(e))&&("function"!=typeof(n=y.call(t,"constructor")&&t.constructor)||g.call(n)!==m))},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},globalEval:function(e){E(e)},each:function(e,t){var n,r=0;if(k(e))for(n=e.length;r<n&&!1!==t.call(e[r],r,e[r]);r++);else for(r in e)if(!1===t.call(e[r],r,e[r]))break;return e},trim:function(e){return null==e?"":(e+"").replace(_,"")},makeArray:function(e,t){var n=t||[];return null!=e&&(k(Object(e))?T.merge(n,"string"==typeof e?[e]:e):d.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:p.call(t,e,n)},merge:function(e,t){for(var n=+t.length,r=0,o=e.length;r<n;r++)e[o++]=t[r];return e.length=o,e},grep:function(e,t,n){for(var r=[],o=0,i=e.length,a=!n;o<i;o++)!t(e[o],o)!==a&&r.push(e[o]);return r},map:function(e,t,n){var r,o,i=0,a=[];if(k(e))for(r=e.length;i<r;i++)null!=(o=t(e[i],i,n))&&a.push(o);else for(i in e)null!=(o=t(e[i],i,n))&&a.push(o);return f.apply([],a)},guid:1,support:b}),"function"==typeof Symbol&&(T.fn[Symbol.iterator]=u[Symbol.iterator]),T.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(e,t){v["[object "+t+"]"]=t.toLowerCase()});var O=function(e){var t,n,r,o,i,a,u,s,l,c,f,d,p,v,h,y,g,m,b,x="sizzle"+1*new Date,w=e.document,C=0,E=0,P=ae(),T=ae(),_=ae(),k=function(e,t){return e===t&&(f=!0),0},O={}.hasOwnProperty,S=[],A=S.pop,N=S.push,j=S.push,M=S.slice,D=function(e,t){for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1},R="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",I="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",q="\\["+L+"*("+I+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+I+"))|)"+L+"*\\]",B=":("+I+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+q+")*)|.*)\\)|)",H=new RegExp(L+"+","g"),F=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),W=new RegExp("^"+L+"*,"+L+"*"),U=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),$=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),Y=new RegExp(B),V=new RegExp("^"+I+"$"),z={ID:new RegExp("^#("+I+")"),CLASS:new RegExp("^\\.("+I+")"),TAG:new RegExp("^("+I+"|[*])"),ATTR:new RegExp("^"+q),PSEUDO:new RegExp("^"+B),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+R+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},Q=/^(?:input|select|textarea|button)$/i,G=/^h\d$/i,X=/^[^{]+\{\s*\[native \w/,K=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,J=/[+~]/,Z=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),ee=function(e,t,n){var r="0x"+t-65536;return r!=r||n?t:r<0?String.fromCharCode(r+65536):String.fromCharCode(r>>10|55296,1023&r|56320)},te=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,ne=function(e,t){return t?"\0"===e?"�":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e},re=function(){d()},oe=me(function(e){return!0===e.disabled&&("form"in e||"label"in e)},{dir:"parentNode",next:"legend"});try{j.apply(S=M.call(w.childNodes),w.childNodes),S[w.childNodes.length].nodeType}catch(e){j={apply:S.length?function(e,t){N.apply(e,M.call(t))}:function(e,t){for(var n=e.length,r=0;e[n++]=t[r++];);e.length=n-1}}}function ie(e,t,r,o){var i,u,l,c,f,v,g,m=t&&t.ownerDocument,C=t?t.nodeType:9;if(r=r||[],"string"!=typeof e||!e||1!==C&&9!==C&&11!==C)return r;if(!o&&((t?t.ownerDocument||t:w)!==p&&d(t),t=t||p,h)){if(11!==C&&(f=K.exec(e)))if(i=f[1]){if(9===C){if(!(l=t.getElementById(i)))return r;if(l.id===i)return r.push(l),r}else if(m&&(l=m.getElementById(i))&&b(t,l)&&l.id===i)return r.push(l),r}else{if(f[2])return j.apply(r,t.getElementsByTagName(e)),r;if((i=f[3])&&n.getElementsByClassName&&t.getElementsByClassName)return j.apply(r,t.getElementsByClassName(i)),r}if(n.qsa&&!_[e+" "]&&(!y||!y.test(e))){if(1!==C)m=t,g=e;else if("object"!==t.nodeName.toLowerCase()){for((c=t.getAttribute("id"))?c=c.replace(te,ne):t.setAttribute("id",c=x),u=(v=a(e)).length;u--;)v[u]="#"+c+" "+ge(v[u]);g=v.join(","),m=J.test(e)&&he(t.parentNode)||t}if(g)try{return j.apply(r,m.querySelectorAll(g)),r}catch(e){}finally{c===x&&t.removeAttribute("id")}}}return s(e.replace(F,"$1"),t,r,o)}function ae(){var e=[];return function t(n,o){return e.push(n+" ")>r.cacheLength&&delete t[e.shift()],t[n+" "]=o}}function ue(e){return e[x]=!0,e}function se(e){var t=p.createElement("fieldset");try{return!!e(t)}catch(e){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function le(e,t){for(var n=e.split("|"),o=n.length;o--;)r.attrHandle[n[o]]=t}function ce(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&e.sourceIndex-t.sourceIndex;if(r)return r;if(n)for(;n=n.nextSibling;)if(n===t)return-1;return e?1:-1}function fe(e){return function(t){return"input"===t.nodeName.toLowerCase()&&t.type===e}}function de(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function pe(e){return function(t){return"form"in t?t.parentNode&&!1===t.disabled?"label"in t?"label"in t.parentNode?t.parentNode.disabled===e:t.disabled===e:t.isDisabled===e||t.isDisabled!==!e&&oe(t)===e:t.disabled===e:"label"in t&&t.disabled===e}}function ve(e){return ue(function(t){return t=+t,ue(function(n,r){for(var o,i=e([],n.length,t),a=i.length;a--;)n[o=i[a]]&&(n[o]=!(r[o]=n[o]))})})}function he(e){return e&&void 0!==e.getElementsByTagName&&e}for(t in n=ie.support={},i=ie.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return!!t&&"HTML"!==t.nodeName},d=ie.setDocument=function(e){var t,o,a=e?e.ownerDocument||e:w;return a!==p&&9===a.nodeType&&a.documentElement?(v=(p=a).documentElement,h=!i(p),w!==p&&(o=p.defaultView)&&o.top!==o&&(o.addEventListener?o.addEventListener("unload",re,!1):o.attachEvent&&o.attachEvent("onunload",re)),n.attributes=se(function(e){return e.className="i",!e.getAttribute("className")}),n.getElementsByTagName=se(function(e){return e.appendChild(p.createComment("")),!e.getElementsByTagName("*").length}),n.getElementsByClassName=X.test(p.getElementsByClassName),n.getById=se(function(e){return v.appendChild(e).id=x,!p.getElementsByName||!p.getElementsByName(x).length}),n.getById?(r.filter.ID=function(e){var t=e.replace(Z,ee);return function(e){return e.getAttribute("id")===t}},r.find.ID=function(e,t){if(void 0!==t.getElementById&&h){var n=t.getElementById(e);return n?[n]:[]}}):(r.filter.ID=function(e){var t=e.replace(Z,ee);return function(e){var n=void 0!==e.getAttributeNode&&e.getAttributeNode("id");return n&&n.value===t}},r.find.ID=function(e,t){if(void 0!==t.getElementById&&h){var n,r,o,i=t.getElementById(e);if(i){if((n=i.getAttributeNode("id"))&&n.value===e)return[i];for(o=t.getElementsByName(e),r=0;i=o[r++];)if((n=i.getAttributeNode("id"))&&n.value===e)return[i]}return[]}}),r.find.TAG=n.getElementsByTagName?function(e,t){return void 0!==t.getElementsByTagName?t.getElementsByTagName(e):n.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,r=[],o=0,i=t.getElementsByTagName(e);if("*"===e){for(;n=i[o++];)1===n.nodeType&&r.push(n);return r}return i},r.find.CLASS=n.getElementsByClassName&&function(e,t){if(void 0!==t.getElementsByClassName&&h)return t.getElementsByClassName(e)},g=[],y=[],(n.qsa=X.test(p.querySelectorAll))&&(se(function(e){v.appendChild(e).innerHTML="<a id='"+x+"'></a><select id='"+x+"-\r\\' msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&y.push("[*^$]="+L+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||y.push("\\["+L+"*(?:value|"+R+")"),e.querySelectorAll("[id~="+x+"-]").length||y.push("~="),e.querySelectorAll(":checked").length||y.push(":checked"),e.querySelectorAll("a#"+x+"+*").length||y.push(".#.+[+~]")}),se(function(e){e.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var t=p.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&y.push("name"+L+"*[*^$|!~]?="),2!==e.querySelectorAll(":enabled").length&&y.push(":enabled",":disabled"),v.appendChild(e).disabled=!0,2!==e.querySelectorAll(":disabled").length&&y.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),y.push(",.*:")})),(n.matchesSelector=X.test(m=v.matches||v.webkitMatchesSelector||v.mozMatchesSelector||v.oMatchesSelector||v.msMatchesSelector))&&se(function(e){n.disconnectedMatch=m.call(e,"*"),m.call(e,"[s!='']:x"),g.push("!=",B)}),y=y.length&&new RegExp(y.join("|")),g=g.length&&new RegExp(g.join("|")),t=X.test(v.compareDocumentPosition),b=t||X.test(v.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)for(;t=t.parentNode;)if(t===e)return!0;return!1},k=t?function(e,t){if(e===t)return f=!0,0;var r=!e.compareDocumentPosition-!t.compareDocumentPosition;return r||(1&(r=(e.ownerDocument||e)===(t.ownerDocument||t)?e.compareDocumentPosition(t):1)||!n.sortDetached&&t.compareDocumentPosition(e)===r?e===p||e.ownerDocument===w&&b(w,e)?-1:t===p||t.ownerDocument===w&&b(w,t)?1:c?D(c,e)-D(c,t):0:4&r?-1:1)}:function(e,t){if(e===t)return f=!0,0;var n,r=0,o=e.parentNode,i=t.parentNode,a=[e],u=[t];if(!o||!i)return e===p?-1:t===p?1:o?-1:i?1:c?D(c,e)-D(c,t):0;if(o===i)return ce(e,t);for(n=e;n=n.parentNode;)a.unshift(n);for(n=t;n=n.parentNode;)u.unshift(n);for(;a[r]===u[r];)r++;return r?ce(a[r],u[r]):a[r]===w?-1:u[r]===w?1:0},p):p},ie.matches=function(e,t){return ie(e,null,null,t)},ie.matchesSelector=function(e,t){if((e.ownerDocument||e)!==p&&d(e),t=t.replace($,"='$1']"),n.matchesSelector&&h&&!_[t+" "]&&(!g||!g.test(t))&&(!y||!y.test(t)))try{var r=m.call(e,t);if(r||n.disconnectedMatch||e.document&&11!==e.document.nodeType)return r}catch(e){}return ie(t,p,null,[e]).length>0},ie.contains=function(e,t){return(e.ownerDocument||e)!==p&&d(e),b(e,t)},ie.attr=function(e,t){(e.ownerDocument||e)!==p&&d(e);var o=r.attrHandle[t.toLowerCase()],i=o&&O.call(r.attrHandle,t.toLowerCase())?o(e,t,!h):void 0;return void 0!==i?i:n.attributes||!h?e.getAttribute(t):(i=e.getAttributeNode(t))&&i.specified?i.value:null},ie.escape=function(e){return(e+"").replace(te,ne)},ie.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},ie.uniqueSort=function(e){var t,r=[],o=0,i=0;if(f=!n.detectDuplicates,c=!n.sortStable&&e.slice(0),e.sort(k),f){for(;t=e[i++];)t===e[i]&&(o=r.push(i));for(;o--;)e.splice(r[o],1)}return c=null,e},o=ie.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r++];)n+=o(t);return n},(r=ie.selectors={cacheLength:50,createPseudo:ue,match:z,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(Z,ee),e[3]=(e[3]||e[4]||e[5]||"").replace(Z,ee),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||ie.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&ie.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return z.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&Y.test(n)&&(t=a(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(Z,ee).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=P[e+" "];return t||(t=new RegExp("(^|"+L+")"+e+"("+L+"|$)"))&&P(e,function(e){return t.test("string"==typeof e.className&&e.className||void 0!==e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var o=ie.attr(r,e);return null==o?"!="===t:!t||(o+="","="===t?o===n:"!="===t?o!==n:"^="===t?n&&0===o.indexOf(n):"*="===t?n&&o.indexOf(n)>-1:"$="===t?n&&o.slice(-n.length)===n:"~="===t?(" "+o.replace(H," ")+" ").indexOf(n)>-1:"|="===t&&(o===n||o.slice(0,n.length+1)===n+"-"))}},CHILD:function(e,t,n,r,o){var i="nth"!==e.slice(0,3),a="last"!==e.slice(-4),u="of-type"===t;return 1===r&&0===o?function(e){return!!e.parentNode}:function(t,n,s){var l,c,f,d,p,v,h=i!==a?"nextSibling":"previousSibling",y=t.parentNode,g=u&&t.nodeName.toLowerCase(),m=!s&&!u,b=!1;if(y){if(i){for(;h;){for(d=t;d=d[h];)if(u?d.nodeName.toLowerCase()===g:1===d.nodeType)return!1;v=h="only"===e&&!v&&"nextSibling"}return!0}if(v=[a?y.firstChild:y.lastChild],a&&m){for(b=(p=(l=(c=(f=(d=y)[x]||(d[x]={}))[d.uniqueID]||(f[d.uniqueID]={}))[e]||[])[0]===C&&l[1])&&l[2],d=p&&y.childNodes[p];d=++p&&d&&d[h]||(b=p=0)||v.pop();)if(1===d.nodeType&&++b&&d===t){c[e]=[C,p,b];break}}else if(m&&(b=p=(l=(c=(f=(d=t)[x]||(d[x]={}))[d.uniqueID]||(f[d.uniqueID]={}))[e]||[])[0]===C&&l[1]),!1===b)for(;(d=++p&&d&&d[h]||(b=p=0)||v.pop())&&((u?d.nodeName.toLowerCase()!==g:1!==d.nodeType)||!++b||(m&&((c=(f=d[x]||(d[x]={}))[d.uniqueID]||(f[d.uniqueID]={}))[e]=[C,b]),d!==t)););return(b-=o)===r||b%r==0&&b/r>=0}}},PSEUDO:function(e,t){var n,o=r.pseudos[e]||r.setFilters[e.toLowerCase()]||ie.error("unsupported pseudo: "+e);return o[x]?o(t):o.length>1?(n=[e,e,"",t],r.setFilters.hasOwnProperty(e.toLowerCase())?ue(function(e,n){for(var r,i=o(e,t),a=i.length;a--;)e[r=D(e,i[a])]=!(n[r]=i[a])}):function(e){return o(e,0,n)}):o}},pseudos:{not:ue(function(e){var t=[],n=[],r=u(e.replace(F,"$1"));return r[x]?ue(function(e,t,n,o){for(var i,a=r(e,null,o,[]),u=e.length;u--;)(i=a[u])&&(e[u]=!(t[u]=i))}):function(e,o,i){return t[0]=e,r(t,null,i,n),t[0]=null,!n.pop()}}),has:ue(function(e){return function(t){return ie(e,t).length>0}}),contains:ue(function(e){return e=e.replace(Z,ee),function(t){return(t.textContent||t.innerText||o(t)).indexOf(e)>-1}}),lang:ue(function(e){return V.test(e||"")||ie.error("unsupported lang: "+e),e=e.replace(Z,ee).toLowerCase(),function(t){var n;do{if(n=h?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return(n=n.toLowerCase())===e||0===n.indexOf(e+"-")}while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===v},focus:function(e){return e===p.activeElement&&(!p.hasFocus||p.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:pe(!1),disabled:pe(!0),checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,!0===e.selected},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!r.pseudos.empty(e)},header:function(e){return G.test(e.nodeName)},input:function(e){return Q.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:ve(function(){return[0]}),last:ve(function(e,t){return[t-1]}),eq:ve(function(e,t,n){return[n<0?n+t:n]}),even:ve(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:ve(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:ve(function(e,t,n){for(var r=n<0?n+t:n;--r>=0;)e.push(r);return e}),gt:ve(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}}).pseudos.nth=r.pseudos.eq,{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})r.pseudos[t]=fe(t);for(t in{submit:!0,reset:!0})r.pseudos[t]=de(t);function ye(){}function ge(e){for(var t=0,n=e.length,r="";t<n;t++)r+=e[t].value;return r}function me(e,t,n){var r=t.dir,o=t.next,i=o||r,a=n&&"parentNode"===i,u=E++;return t.first?function(t,n,o){for(;t=t[r];)if(1===t.nodeType||a)return e(t,n,o);return!1}:function(t,n,s){var l,c,f,d=[C,u];if(s){for(;t=t[r];)if((1===t.nodeType||a)&&e(t,n,s))return!0}else for(;t=t[r];)if(1===t.nodeType||a)if(c=(f=t[x]||(t[x]={}))[t.uniqueID]||(f[t.uniqueID]={}),o&&o===t.nodeName.toLowerCase())t=t[r]||t;else{if((l=c[i])&&l[0]===C&&l[1]===u)return d[2]=l[2];if(c[i]=d,d[2]=e(t,n,s))return!0}return!1}}function be(e){return e.length>1?function(t,n,r){for(var o=e.length;o--;)if(!e[o](t,n,r))return!1;return!0}:e[0]}function xe(e,t,n,r,o){for(var i,a=[],u=0,s=e.length,l=null!=t;u<s;u++)(i=e[u])&&(n&&!n(i,r,o)||(a.push(i),l&&t.push(u)));return a}function we(e,t,n,r,o,i){return r&&!r[x]&&(r=we(r)),o&&!o[x]&&(o=we(o,i)),ue(function(i,a,u,s){var l,c,f,d=[],p=[],v=a.length,h=i||function(e,t,n){for(var r=0,o=t.length;r<o;r++)ie(e,t[r],n);return n}(t||"*",u.nodeType?[u]:u,[]),y=!e||!i&&t?h:xe(h,d,e,u,s),g=n?o||(i?e:v||r)?[]:a:y;if(n&&n(y,g,u,s),r)for(l=xe(g,p),r(l,[],u,s),c=l.length;c--;)(f=l[c])&&(g[p[c]]=!(y[p[c]]=f));if(i){if(o||e){if(o){for(l=[],c=g.length;c--;)(f=g[c])&&l.push(y[c]=f);o(null,g=[],l,s)}for(c=g.length;c--;)(f=g[c])&&(l=o?D(i,f):d[c])>-1&&(i[l]=!(a[l]=f))}}else g=xe(g===a?g.splice(v,g.length):g),o?o(null,a,g,s):j.apply(a,g)})}function Ce(e){for(var t,n,o,i=e.length,a=r.relative[e[0].type],u=a||r.relative[" "],s=a?1:0,c=me(function(e){return e===t},u,!0),f=me(function(e){return D(t,e)>-1},u,!0),d=[function(e,n,r){var o=!a&&(r||n!==l)||((t=n).nodeType?c(e,n,r):f(e,n,r));return t=null,o}];s<i;s++)if(n=r.relative[e[s].type])d=[me(be(d),n)];else{if((n=r.filter[e[s].type].apply(null,e[s].matches))[x]){for(o=++s;o<i&&!r.relative[e[o].type];o++);return we(s>1&&be(d),s>1&&ge(e.slice(0,s-1).concat({value:" "===e[s-2].type?"*":""})).replace(F,"$1"),n,s<o&&Ce(e.slice(s,o)),o<i&&Ce(e=e.slice(o)),o<i&&ge(e))}d.push(n)}return be(d)}function Ee(e,t){var n=t.length>0,o=e.length>0,i=function(i,a,u,s,c){var f,v,y,g=0,m="0",b=i&&[],x=[],w=l,E=i||o&&r.find.TAG("*",c),P=C+=null==w?1:Math.random()||.1,T=E.length;for(c&&(l=a===p||a||c);m!==T&&null!=(f=E[m]);m++){if(o&&f){for(v=0,a||f.ownerDocument===p||(d(f),u=!h);y=e[v++];)if(y(f,a||p,u)){s.push(f);break}c&&(C=P)}n&&((f=!y&&f)&&g--,i&&b.push(f))}if(g+=m,n&&m!==g){for(v=0;y=t[v++];)y(b,x,a,u);if(i){if(g>0)for(;m--;)b[m]||x[m]||(x[m]=A.call(s));x=xe(x)}j.apply(s,x),c&&!i&&x.length>0&&g+t.length>1&&ie.uniqueSort(s)}return c&&(C=P,l=w),b};return n?ue(i):i}return ye.prototype=r.filters=r.pseudos,r.setFilters=new ye,a=ie.tokenize=function(e,t){var n,o,i,a,u,s,l,c=T[e+" "];if(c)return t?0:c.slice(0);for(u=e,s=[],l=r.preFilter;u;){for(a in n&&!(o=W.exec(u))||(o&&(u=u.slice(o[0].length)||u),s.push(i=[])),n=!1,(o=U.exec(u))&&(n=o.shift(),i.push({value:n,type:o[0].replace(F," ")}),u=u.slice(n.length)),r.filter)!(o=z[a].exec(u))||l[a]&&!(o=l[a](o))||(n=o.shift(),i.push({value:n,type:a,matches:o}),u=u.slice(n.length));if(!n)break}return t?u.length:u?ie.error(e):T(e,s).slice(0)},u=ie.compile=function(e,t){var n,r=[],o=[],i=_[e+" "];if(!i){for(t||(t=a(e)),n=t.length;n--;)(i=Ce(t[n]))[x]?r.push(i):o.push(i);(i=_(e,Ee(o,r))).selector=e}return i},s=ie.select=function(e,t,n,o){var i,s,l,c,f,d="function"==typeof e&&e,p=!o&&a(e=d.selector||e);if(n=n||[],1===p.length){if((s=p[0]=p[0].slice(0)).length>2&&"ID"===(l=s[0]).type&&9===t.nodeType&&h&&r.relative[s[1].type]){if(!(t=(r.find.ID(l.matches[0].replace(Z,ee),t)||[])[0]))return n;d&&(t=t.parentNode),e=e.slice(s.shift().value.length)}for(i=z.needsContext.test(e)?0:s.length;i--&&(l=s[i],!r.relative[c=l.type]);)if((f=r.find[c])&&(o=f(l.matches[0].replace(Z,ee),J.test(s[0].type)&&he(t.parentNode)||t))){if(s.splice(i,1),!(e=o.length&&ge(s)))return j.apply(n,o),n;break}}return(d||u(e,p))(o,t,!h,n,!t||J.test(e)&&he(t.parentNode)||t),n},n.sortStable=x.split("").sort(k).join("")===x,n.detectDuplicates=!!f,d(),n.sortDetached=se(function(e){return 1&e.compareDocumentPosition(p.createElement("fieldset"))}),se(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||le("type|href|height|width",function(e,t,n){if(!n)return e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),n.attributes&&se(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||le("value",function(e,t,n){if(!n&&"input"===e.nodeName.toLowerCase())return e.defaultValue}),se(function(e){return null==e.getAttribute("disabled")})||le(R,function(e,t,n){var r;if(!n)return!0===e[t]?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null}),ie}(i);T.find=O,T.expr=O.selectors,T.expr[":"]=T.expr.pseudos,T.uniqueSort=T.unique=O.uniqueSort,T.text=O.getText,T.isXMLDoc=O.isXML,T.contains=O.contains,T.escapeSelector=O.escape;var S=function(e,t,n){for(var r=[],o=void 0!==n;(e=e[t])&&9!==e.nodeType;)if(1===e.nodeType){if(o&&T(e).is(n))break;r.push(e)}return r},A=function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n},N=T.expr.match.needsContext;function j(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()}var M=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;function D(e,t,n){return x(t)?T.grep(e,function(e,r){return!!t.call(e,r,e)!==n}):t.nodeType?T.grep(e,function(e){return e===t!==n}):"string"!=typeof t?T.grep(e,function(e){return p.call(t,e)>-1!==n}):T.filter(t,e,n)}T.filter=function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?T.find.matchesSelector(r,e)?[r]:[]:T.find.matches(e,T.grep(t,function(e){return 1===e.nodeType}))},T.fn.extend({find:function(e){var t,n,r=this.length,o=this;if("string"!=typeof e)return this.pushStack(T(e).filter(function(){for(t=0;t<r;t++)if(T.contains(o[t],this))return!0}));for(n=this.pushStack([]),t=0;t<r;t++)T.find(e,o[t],n);return r>1?T.uniqueSort(n):n},filter:function(e){return this.pushStack(D(this,e||[],!1))},not:function(e){return this.pushStack(D(this,e||[],!0))},is:function(e){return!!D(this,"string"==typeof e&&N.test(e)?T(e):e||[],!1).length}});var R,L=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;(T.fn.init=function(e,t,n){var r,o;if(!e)return this;if(n=n||R,"string"==typeof e){if(!(r="<"===e[0]&&">"===e[e.length-1]&&e.length>=3?[null,e,null]:L.exec(e))||!r[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(r[1]){if(t=t instanceof T?t[0]:t,T.merge(this,T.parseHTML(r[1],t&&t.nodeType?t.ownerDocument||t:s,!0)),M.test(r[1])&&T.isPlainObject(t))for(r in t)x(this[r])?this[r](t[r]):this.attr(r,t[r]);return this}return(o=s.getElementById(r[2]))&&(this[0]=o,this.length=1),this}return e.nodeType?(this[0]=e,this.length=1,this):x(e)?void 0!==n.ready?n.ready(e):e(T):T.makeArray(e,this)}).prototype=T.fn,R=T(s);var I=/^(?:parents|prev(?:Until|All))/,q={children:!0,contents:!0,next:!0,prev:!0};function B(e,t){for(;(e=e[t])&&1!==e.nodeType;);return e}T.fn.extend({has:function(e){var t=T(e,this),n=t.length;return this.filter(function(){for(var e=0;e<n;e++)if(T.contains(this,t[e]))return!0})},closest:function(e,t){var n,r=0,o=this.length,i=[],a="string"!=typeof e&&T(e);if(!N.test(e))for(;r<o;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(a?a.index(n)>-1:1===n.nodeType&&T.find.matchesSelector(n,e))){i.push(n);break}return this.pushStack(i.length>1?T.uniqueSort(i):i)},index:function(e){return e?"string"==typeof e?p.call(T(e),this[0]):p.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(T.uniqueSort(T.merge(this.get(),T(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),T.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return S(e,"parentNode")},parentsUntil:function(e,t,n){return S(e,"parentNode",n)},next:function(e){return B(e,"nextSibling")},prev:function(e){return B(e,"previousSibling")},nextAll:function(e){return S(e,"nextSibling")},prevAll:function(e){return S(e,"previousSibling")},nextUntil:function(e,t,n){return S(e,"nextSibling",n)},prevUntil:function(e,t,n){return S(e,"previousSibling",n)},siblings:function(e){return A((e.parentNode||{}).firstChild,e)},children:function(e){return A(e.firstChild)},contents:function(e){return j(e,"iframe")?e.contentDocument:(j(e,"template")&&(e=e.content||e),T.merge([],e.childNodes))}},function(e,t){T.fn[e]=function(n,r){var o=T.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(o=T.filter(r,o)),this.length>1&&(q[e]||T.uniqueSort(o),I.test(e)&&o.reverse()),this.pushStack(o)}});var H=/[^\x20\t\r\n\f]+/g;function F(e){return e}function W(e){throw e}function U(e,t,n,r){var o;try{e&&x(o=e.promise)?o.call(e).done(t).fail(n):e&&x(o=e.then)?o.call(e,t,n):t.apply(void 0,[e].slice(r))}catch(e){n.apply(void 0,[e])}}T.Callbacks=function(e){e="string"==typeof e?function(e){var t={};return T.each(e.match(H)||[],function(e,n){t[n]=!0}),t}(e):T.extend({},e);var t,n,r,o,i=[],a=[],u=-1,s=function(){for(o=o||e.once,r=t=!0;a.length;u=-1)for(n=a.shift();++u<i.length;)!1===i[u].apply(n[0],n[1])&&e.stopOnFalse&&(u=i.length,n=!1);e.memory||(n=!1),t=!1,o&&(i=n?[]:"")},l={add:function(){return i&&(n&&!t&&(u=i.length-1,a.push(n)),function t(n){T.each(n,function(n,r){x(r)?e.unique&&l.has(r)||i.push(r):r&&r.length&&"string"!==P(r)&&t(r)})}(arguments),n&&!t&&s()),this},remove:function(){return T.each(arguments,function(e,t){for(var n;(n=T.inArray(t,i,n))>-1;)i.splice(n,1),n<=u&&u--}),this},has:function(e){return e?T.inArray(e,i)>-1:i.length>0},empty:function(){return i&&(i=[]),this},disable:function(){return o=a=[],i=n="",this},disabled:function(){return!i},lock:function(){return o=a=[],n||t||(i=n=""),this},locked:function(){return!!o},fireWith:function(e,n){return o||(n=[e,(n=n||[]).slice?n.slice():n],a.push(n),t||s()),this},fire:function(){return l.fireWith(this,arguments),this},fired:function(){return!!r}};return l},T.extend({Deferred:function(e){var t=[["notify","progress",T.Callbacks("memory"),T.Callbacks("memory"),2],["resolve","done",T.Callbacks("once memory"),T.Callbacks("once memory"),0,"resolved"],["reject","fail",T.Callbacks("once memory"),T.Callbacks("once memory"),1,"rejected"]],n="pending",r={state:function(){return n},always:function(){return a.done(arguments).fail(arguments),this},catch:function(e){return r.then(null,e)},pipe:function(){var e=arguments;return T.Deferred(function(n){T.each(t,function(t,r){var o=x(e[r[4]])&&e[r[4]];a[r[1]](function(){var e=o&&o.apply(this,arguments);e&&x(e.promise)?e.promise().progress(n.notify).done(n.resolve).fail(n.reject):n[r[0]+"With"](this,o?[e]:arguments)})}),e=null}).promise()},then:function(e,n,r){var a=0;function u(e,t,n,r){return function(){var s=this,l=arguments,c=function(){var i,c;if(!(e<a)){if((i=n.apply(s,l))===t.promise())throw new TypeError("Thenable self-resolution");c=i&&("object"==(void 0===i?"undefined":o(i))||"function"==typeof i)&&i.then,x(c)?r?c.call(i,u(a,t,F,r),u(a,t,W,r)):(a++,c.call(i,u(a,t,F,r),u(a,t,W,r),u(a,t,F,t.notifyWith))):(n!==F&&(s=void 0,l=[i]),(r||t.resolveWith)(s,l))}},f=r?c:function(){try{c()}catch(r){T.Deferred.exceptionHook&&T.Deferred.exceptionHook(r,f.stackTrace),e+1>=a&&(n!==W&&(s=void 0,l=[r]),t.rejectWith(s,l))}};e?f():(T.Deferred.getStackHook&&(f.stackTrace=T.Deferred.getStackHook()),i.setTimeout(f))}}return T.Deferred(function(o){t[0][3].add(u(0,o,x(r)?r:F,o.notifyWith)),t[1][3].add(u(0,o,x(e)?e:F)),t[2][3].add(u(0,o,x(n)?n:W))}).promise()},promise:function(e){return null!=e?T.extend(e,r):r}},a={};return T.each(t,function(e,o){var i=o[2],u=o[5];r[o[1]]=i.add,u&&i.add(function(){n=u},t[3-e][2].disable,t[3-e][3].disable,t[0][2].lock,t[0][3].lock),i.add(o[3].fire),a[o[0]]=function(){return a[o[0]+"With"](this===a?void 0:this,arguments),this},a[o[0]+"With"]=i.fireWith}),r.promise(a),e&&e.call(a,a),a},when:function(e){var t=arguments.length,n=t,r=Array(n),o=c.call(arguments),i=T.Deferred(),a=function(e){return function(n){r[e]=this,o[e]=arguments.length>1?c.call(arguments):n,--t||i.resolveWith(r,o)}};if(t<=1&&(U(e,i.done(a(n)).resolve,i.reject,!t),"pending"===i.state()||x(o[n]&&o[n].then)))return i.then();for(;n--;)U(o[n],a(n),i.reject);return i.promise()}});var $=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;T.Deferred.exceptionHook=function(e,t){i.console&&i.console.warn&&e&&$.test(e.name)&&i.console.warn("jQuery.Deferred exception: "+e.message,e.stack,t)},T.readyException=function(e){i.setTimeout(function(){throw e})};var Y=T.Deferred();function V(){s.removeEventListener("DOMContentLoaded",V),i.removeEventListener("load",V),T.ready()}T.fn.ready=function(e){return Y.then(e).catch(function(e){T.readyException(e)}),this},T.extend({isReady:!1,readyWait:1,ready:function(e){(!0===e?--T.readyWait:T.isReady)||(T.isReady=!0,!0!==e&&--T.readyWait>0||Y.resolveWith(s,[T]))}}),T.ready.then=Y.then,"complete"===s.readyState||"loading"!==s.readyState&&!s.documentElement.doScroll?i.setTimeout(T.ready):(s.addEventListener("DOMContentLoaded",V),i.addEventListener("load",V));var z=function e(t,n,r,o,i,a,u){var s=0,l=t.length,c=null==r;if("object"===P(r))for(s in i=!0,r)e(t,n,s,r[s],!0,a,u);else if(void 0!==o&&(i=!0,x(o)||(u=!0),c&&(u?(n.call(t,o),n=null):(c=n,n=function(e,t,n){return c.call(T(e),n)})),n))for(;s<l;s++)n(t[s],r,u?o:o.call(t[s],s,n(t[s],r)));return i?t:c?n.call(t):l?n(t[0],r):a},Q=/^-ms-/,G=/-([a-z])/g;function X(e,t){return t.toUpperCase()}function K(e){return e.replace(Q,"ms-").replace(G,X)}var J=function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType};function Z(){this.expando=T.expando+Z.uid++}Z.uid=1,Z.prototype={cache:function(e){var t=e[this.expando];return t||(t={},J(e)&&(e.nodeType?e[this.expando]=t:Object.defineProperty(e,this.expando,{value:t,configurable:!0}))),t},set:function(e,t,n){var r,o=this.cache(e);if("string"==typeof t)o[K(t)]=n;else for(r in t)o[K(r)]=t[r];return o},get:function(e,t){return void 0===t?this.cache(e):e[this.expando]&&e[this.expando][K(t)]},access:function(e,t,n){return void 0===t||t&&"string"==typeof t&&void 0===n?this.get(e,t):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,r=e[this.expando];if(void 0!==r){if(void 0!==t){n=(t=Array.isArray(t)?t.map(K):(t=K(t))in r?[t]:t.match(H)||[]).length;for(;n--;)delete r[t[n]]}(void 0===t||T.isEmptyObject(r))&&(e.nodeType?e[this.expando]=void 0:delete e[this.expando])}},hasData:function(e){var t=e[this.expando];return void 0!==t&&!T.isEmptyObject(t)}};var ee=new Z,te=new Z,ne=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,re=/[A-Z]/g;function oe(e,t,n){var r;if(void 0===n&&1===e.nodeType)if(r="data-"+t.replace(re,"-$&").toLowerCase(),"string"==typeof(n=e.getAttribute(r))){try{n=function(e){return"true"===e||"false"!==e&&("null"===e?null:e===+e+""?+e:ne.test(e)?JSON.parse(e):e)}(n)}catch(e){}te.set(e,t,n)}else n=void 0;return n}T.extend({hasData:function(e){return te.hasData(e)||ee.hasData(e)},data:function(e,t,n){return te.access(e,t,n)},removeData:function(e,t){te.remove(e,t)},_data:function(e,t,n){return ee.access(e,t,n)},_removeData:function(e,t){ee.remove(e,t)}}),T.fn.extend({data:function(e,t){var n,r,i,a=this[0],u=a&&a.attributes;if(void 0===e){if(this.length&&(i=te.get(a),1===a.nodeType&&!ee.get(a,"hasDataAttrs"))){for(n=u.length;n--;)u[n]&&0===(r=u[n].name).indexOf("data-")&&(r=K(r.slice(5)),oe(a,r,i[r]));ee.set(a,"hasDataAttrs",!0)}return i}return"object"==(void 0===e?"undefined":o(e))?this.each(function(){te.set(this,e)}):z(this,function(t){var n;if(a&&void 0===t){if(void 0!==(n=te.get(a,e)))return n;if(void 0!==(n=oe(a,e)))return n}else this.each(function(){te.set(this,e,t)})},null,t,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){te.remove(this,e)})}}),T.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=ee.get(e,t),n&&(!r||Array.isArray(n)?r=ee.access(e,t,T.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=T.queue(e,t),r=n.length,o=n.shift(),i=T._queueHooks(e,t);"inprogress"===o&&(o=n.shift(),r--),o&&("fx"===t&&n.unshift("inprogress"),delete i.stop,o.call(e,function(){T.dequeue(e,t)},i)),!r&&i&&i.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return ee.get(e,n)||ee.access(e,n,{empty:T.Callbacks("once memory").add(function(){ee.remove(e,[t+"queue",n])})})}}),T.fn.extend({queue:function(e,t){var n=2;return"string"!=typeof e&&(t=e,e="fx",n--),arguments.length<n?T.queue(this[0],e):void 0===t?this:this.each(function(){var n=T.queue(this,e,t);T._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&T.dequeue(this,e)})},dequeue:function(e){return this.each(function(){T.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,o=T.Deferred(),i=this,a=this.length,u=function(){--r||o.resolveWith(i,[i])};for("string"!=typeof e&&(t=e,e=void 0),e=e||"fx";a--;)(n=ee.get(i[a],e+"queueHooks"))&&n.empty&&(r++,n.empty.add(u));return u(),o.promise(t)}});var ie=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,ae=new RegExp("^(?:([+-])=|)("+ie+")([a-z%]*)$","i"),ue=["Top","Right","Bottom","Left"],se=function(e,t){return"none"===(e=t||e).style.display||""===e.style.display&&T.contains(e.ownerDocument,e)&&"none"===T.css(e,"display")},le=function(e,t,n,r){var o,i,a={};for(i in t)a[i]=e.style[i],e.style[i]=t[i];for(i in o=n.apply(e,r||[]),t)e.style[i]=a[i];return o};function ce(e,t,n,r){var o,i,a=20,u=r?function(){return r.cur()}:function(){return T.css(e,t,"")},s=u(),l=n&&n[3]||(T.cssNumber[t]?"":"px"),c=(T.cssNumber[t]||"px"!==l&&+s)&&ae.exec(T.css(e,t));if(c&&c[3]!==l){for(s/=2,l=l||c[3],c=+s||1;a--;)T.style(e,t,c+l),(1-i)*(1-(i=u()/s||.5))<=0&&(a=0),c/=i;c*=2,T.style(e,t,c+l),n=n||[]}return n&&(c=+c||+s||0,o=n[1]?c+(n[1]+1)*n[2]:+n[2],r&&(r.unit=l,r.start=c,r.end=o)),o}var fe={};function de(e){var t,n=e.ownerDocument,r=e.nodeName,o=fe[r];return o||(t=n.body.appendChild(n.createElement(r)),o=T.css(t,"display"),t.parentNode.removeChild(t),"none"===o&&(o="block"),fe[r]=o,o)}function pe(e,t){for(var n,r,o=[],i=0,a=e.length;i<a;i++)(r=e[i]).style&&(n=r.style.display,t?("none"===n&&(o[i]=ee.get(r,"display")||null,o[i]||(r.style.display="")),""===r.style.display&&se(r)&&(o[i]=de(r))):"none"!==n&&(o[i]="none",ee.set(r,"display",n)));for(i=0;i<a;i++)null!=o[i]&&(e[i].style.display=o[i]);return e}T.fn.extend({show:function(){return pe(this,!0)},hide:function(){return pe(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){se(this)?T(this).show():T(this).hide()})}});var ve=/^(?:checkbox|radio)$/i,he=/<([a-z][^\/\0>\x20\t\r\n\f]+)/i,ye=/^$|^module$|\/(?:java|ecma)script/i,ge={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};function me(e,t){var n;return n=void 0!==e.getElementsByTagName?e.getElementsByTagName(t||"*"):void 0!==e.querySelectorAll?e.querySelectorAll(t||"*"):[],void 0===t||t&&j(e,t)?T.merge([e],n):n}function be(e,t){for(var n=0,r=e.length;n<r;n++)ee.set(e[n],"globalEval",!t||ee.get(t[n],"globalEval"))}ge.optgroup=ge.option,ge.tbody=ge.tfoot=ge.colgroup=ge.caption=ge.thead,ge.th=ge.td;var xe=/<|&#?\w+;/;function we(e,t,n,r,o){for(var i,a,u,s,l,c,f=t.createDocumentFragment(),d=[],p=0,v=e.length;p<v;p++)if((i=e[p])||0===i)if("object"===P(i))T.merge(d,i.nodeType?[i]:i);else if(xe.test(i)){for(a=a||f.appendChild(t.createElement("div")),u=(he.exec(i)||["",""])[1].toLowerCase(),s=ge[u]||ge._default,a.innerHTML=s[1]+T.htmlPrefilter(i)+s[2],c=s[0];c--;)a=a.lastChild;T.merge(d,a.childNodes),(a=f.firstChild).textContent=""}else d.push(t.createTextNode(i));for(f.textContent="",p=0;i=d[p++];)if(r&&T.inArray(i,r)>-1)o&&o.push(i);else if(l=T.contains(i.ownerDocument,i),a=me(f.appendChild(i),"script"),l&&be(a),n)for(c=0;i=a[c++];)ye.test(i.type||"")&&n.push(i);return f}!function(){var e=s.createDocumentFragment().appendChild(s.createElement("div")),t=s.createElement("input");t.setAttribute("type","radio"),t.setAttribute("checked","checked"),t.setAttribute("name","t"),e.appendChild(t),b.checkClone=e.cloneNode(!0).cloneNode(!0).lastChild.checked,e.innerHTML="<textarea>x</textarea>",b.noCloneChecked=!!e.cloneNode(!0).lastChild.defaultValue}();var Ce=s.documentElement,Ee=/^key/,Pe=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,Te=/^([^.]*)(?:\.(.+)|)/;function _e(){return!0}function ke(){return!1}function Oe(){try{return s.activeElement}catch(e){}}function Se(e,t,n,r,i,a){var u,s;if("object"==(void 0===t?"undefined":o(t))){for(s in"string"!=typeof n&&(r=r||n,n=void 0),t)Se(e,s,n,r,t[s],a);return e}if(null==r&&null==i?(i=n,r=n=void 0):null==i&&("string"==typeof n?(i=r,r=void 0):(i=r,r=n,n=void 0)),!1===i)i=ke;else if(!i)return e;return 1===a&&(u=i,(i=function(e){return T().off(e),u.apply(this,arguments)}).guid=u.guid||(u.guid=T.guid++)),e.each(function(){T.event.add(this,t,i,r,n)})}T.event={global:{},add:function(e,t,n,r,o){var i,a,u,s,l,c,f,d,p,v,h,y=ee.get(e);if(y)for(n.handler&&(n=(i=n).handler,o=i.selector),o&&T.find.matchesSelector(Ce,o),n.guid||(n.guid=T.guid++),(s=y.events)||(s=y.events={}),(a=y.handle)||(a=y.handle=function(t){return void 0!==T&&T.event.triggered!==t.type?T.event.dispatch.apply(e,arguments):void 0}),l=(t=(t||"").match(H)||[""]).length;l--;)p=h=(u=Te.exec(t[l])||[])[1],v=(u[2]||"").split(".").sort(),p&&(f=T.event.special[p]||{},p=(o?f.delegateType:f.bindType)||p,f=T.event.special[p]||{},c=T.extend({type:p,origType:h,data:r,handler:n,guid:n.guid,selector:o,needsContext:o&&T.expr.match.needsContext.test(o),namespace:v.join(".")},i),(d=s[p])||((d=s[p]=[]).delegateCount=0,f.setup&&!1!==f.setup.call(e,r,v,a)||e.addEventListener&&e.addEventListener(p,a)),f.add&&(f.add.call(e,c),c.handler.guid||(c.handler.guid=n.guid)),o?d.splice(d.delegateCount++,0,c):d.push(c),T.event.global[p]=!0)},remove:function(e,t,n,r,o){var i,a,u,s,l,c,f,d,p,v,h,y=ee.hasData(e)&&ee.get(e);if(y&&(s=y.events)){for(l=(t=(t||"").match(H)||[""]).length;l--;)if(p=h=(u=Te.exec(t[l])||[])[1],v=(u[2]||"").split(".").sort(),p){for(f=T.event.special[p]||{},d=s[p=(r?f.delegateType:f.bindType)||p]||[],u=u[2]&&new RegExp("(^|\\.)"+v.join("\\.(?:.*\\.|)")+"(\\.|$)"),a=i=d.length;i--;)c=d[i],!o&&h!==c.origType||n&&n.guid!==c.guid||u&&!u.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(d.splice(i,1),c.selector&&d.delegateCount--,f.remove&&f.remove.call(e,c));a&&!d.length&&(f.teardown&&!1!==f.teardown.call(e,v,y.handle)||T.removeEvent(e,p,y.handle),delete s[p])}else for(p in s)T.event.remove(e,p+t[l],n,r,!0);T.isEmptyObject(s)&&ee.remove(e,"handle events")}},dispatch:function(e){var t,n,r,o,i,a,u=T.event.fix(e),s=new Array(arguments.length),l=(ee.get(this,"events")||{})[u.type]||[],c=T.event.special[u.type]||{};for(s[0]=u,t=1;t<arguments.length;t++)s[t]=arguments[t];if(u.delegateTarget=this,!c.preDispatch||!1!==c.preDispatch.call(this,u)){for(a=T.event.handlers.call(this,u,l),t=0;(o=a[t++])&&!u.isPropagationStopped();)for(u.currentTarget=o.elem,n=0;(i=o.handlers[n++])&&!u.isImmediatePropagationStopped();)u.rnamespace&&!u.rnamespace.test(i.namespace)||(u.handleObj=i,u.data=i.data,void 0!==(r=((T.event.special[i.origType]||{}).handle||i.handler).apply(o.elem,s))&&!1===(u.result=r)&&(u.preventDefault(),u.stopPropagation()));return c.postDispatch&&c.postDispatch.call(this,u),u.result}},handlers:function(e,t){var n,r,o,i,a,u=[],s=t.delegateCount,l=e.target;if(s&&l.nodeType&&!("click"===e.type&&e.button>=1))for(;l!==this;l=l.parentNode||this)if(1===l.nodeType&&("click"!==e.type||!0!==l.disabled)){for(i=[],a={},n=0;n<s;n++)void 0===a[o=(r=t[n]).selector+" "]&&(a[o]=r.needsContext?T(o,this).index(l)>-1:T.find(o,this,null,[l]).length),a[o]&&i.push(r);i.length&&u.push({elem:l,handlers:i})}return l=this,s<t.length&&u.push({elem:l,handlers:t.slice(s)}),u},addProp:function(e,t){Object.defineProperty(T.Event.prototype,e,{enumerable:!0,configurable:!0,get:x(t)?function(){if(this.originalEvent)return t(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[e]},set:function(t){Object.defineProperty(this,e,{enumerable:!0,configurable:!0,writable:!0,value:t})}})},fix:function(e){return e[T.expando]?e:new T.Event(e)},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==Oe()&&this.focus)return this.focus(),!1},delegateType:"focusin"},blur:{trigger:function(){if(this===Oe()&&this.blur)return this.blur(),!1},delegateType:"focusout"},click:{trigger:function(){if("checkbox"===this.type&&this.click&&j(this,"input"))return this.click(),!1},_default:function(e){return j(e.target,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}},T.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n)},T.Event=function(e,t){if(!(this instanceof T.Event))return new T.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&!1===e.returnValue?_e:ke,this.target=e.target&&3===e.target.nodeType?e.target.parentNode:e.target,this.currentTarget=e.currentTarget,this.relatedTarget=e.relatedTarget):this.type=e,t&&T.extend(this,t),this.timeStamp=e&&e.timeStamp||Date.now(),this[T.expando]=!0},T.Event.prototype={constructor:T.Event,isDefaultPrevented:ke,isPropagationStopped:ke,isImmediatePropagationStopped:ke,isSimulated:!1,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=_e,e&&!this.isSimulated&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=_e,e&&!this.isSimulated&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=_e,e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}},T.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,char:!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(e){var t=e.button;return null==e.which&&Ee.test(e.type)?null!=e.charCode?e.charCode:e.keyCode:!e.which&&void 0!==t&&Pe.test(e.type)?1&t?1:2&t?3:4&t?2:0:e.which}},T.event.addProp),T.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,t){T.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=e.relatedTarget,o=e.handleObj;return r&&(r===this||T.contains(this,r))||(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),T.fn.extend({on:function(e,t,n,r){return Se(this,e,t,n,r)},one:function(e,t,n,r){return Se(this,e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,T(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==(void 0===e?"undefined":o(e))){for(i in e)this.off(i,t,e[i]);return this}return!1!==t&&"function"!=typeof t||(n=t,t=void 0),!1===n&&(n=ke),this.each(function(){T.event.remove(this,e,n,t)})}});var Ae=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,Ne=/<script|<style|<link/i,je=/checked\s*(?:[^=]|=\s*.checked.)/i,Me=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function De(e,t){return j(e,"table")&&j(11!==t.nodeType?t:t.firstChild,"tr")&&T(e).children("tbody")[0]||e}function Re(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function Le(e){return"true/"===(e.type||"").slice(0,5)?e.type=e.type.slice(5):e.removeAttribute("type"),e}function Ie(e,t){var n,r,o,i,a,u,s,l;if(1===t.nodeType){if(ee.hasData(e)&&(i=ee.access(e),a=ee.set(t,i),l=i.events))for(o in delete a.handle,a.events={},l)for(n=0,r=l[o].length;n<r;n++)T.event.add(t,o,l[o][n]);te.hasData(e)&&(u=te.access(e),s=T.extend({},u),te.set(t,s))}}function qe(e,t){var n=t.nodeName.toLowerCase();"input"===n&&ve.test(e.type)?t.checked=e.checked:"input"!==n&&"textarea"!==n||(t.defaultValue=e.defaultValue)}function Be(e,t,n,r){t=f.apply([],t);var o,i,a,u,s,l,c=0,d=e.length,p=d-1,v=t[0],h=x(v);if(h||d>1&&"string"==typeof v&&!b.checkClone&&je.test(v))return e.each(function(o){var i=e.eq(o);h&&(t[0]=v.call(this,o,i.html())),Be(i,t,n,r)});if(d&&(i=(o=we(t,e[0].ownerDocument,!1,e,r)).firstChild,1===o.childNodes.length&&(o=i),i||r)){for(u=(a=T.map(me(o,"script"),Re)).length;c<d;c++)s=o,c!==p&&(s=T.clone(s,!0,!0),u&&T.merge(a,me(s,"script"))),n.call(e[c],s,c);if(u)for(l=a[a.length-1].ownerDocument,T.map(a,Le),c=0;c<u;c++)s=a[c],ye.test(s.type||"")&&!ee.access(s,"globalEval")&&T.contains(l,s)&&(s.src&&"module"!==(s.type||"").toLowerCase()?T._evalUrl&&T._evalUrl(s.src):E(s.textContent.replace(Me,""),l,s))}return e}function He(e,t,n){for(var r,o=t?T.filter(t,e):e,i=0;null!=(r=o[i]);i++)n||1!==r.nodeType||T.cleanData(me(r)),r.parentNode&&(n&&T.contains(r.ownerDocument,r)&&be(me(r,"script")),r.parentNode.removeChild(r));return e}T.extend({htmlPrefilter:function(e){return e.replace(Ae,"<$1></$2>")},clone:function(e,t,n){var r,o,i,a,u=e.cloneNode(!0),s=T.contains(e.ownerDocument,e);if(!(b.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||T.isXMLDoc(e)))for(a=me(u),r=0,o=(i=me(e)).length;r<o;r++)qe(i[r],a[r]);if(t)if(n)for(i=i||me(e),a=a||me(u),r=0,o=i.length;r<o;r++)Ie(i[r],a[r]);else Ie(e,u);return(a=me(u,"script")).length>0&&be(a,!s&&me(e,"script")),u},cleanData:function(e){for(var t,n,r,o=T.event.special,i=0;void 0!==(n=e[i]);i++)if(J(n)){if(t=n[ee.expando]){if(t.events)for(r in t.events)o[r]?T.event.remove(n,r):T.removeEvent(n,r,t.handle);n[ee.expando]=void 0}n[te.expando]&&(n[te.expando]=void 0)}}}),T.fn.extend({detach:function(e){return He(this,e,!0)},remove:function(e){return He(this,e)},text:function(e){return z(this,function(e){return void 0===e?T.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=e)})},null,e,arguments.length)},append:function(){return Be(this,arguments,function(e){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||De(this,e).appendChild(e)})},prepend:function(){return Be(this,arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=De(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return Be(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return Be(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(T.cleanData(me(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null!=e&&e,t=null==t?e:t,this.map(function(){return T.clone(this,e,t)})},html:function(e){return z(this,function(e){var t=this[0]||{},n=0,r=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!Ne.test(e)&&!ge[(he.exec(e)||["",""])[1].toLowerCase()]){e=T.htmlPrefilter(e);try{for(;n<r;n++)1===(t=this[n]||{}).nodeType&&(T.cleanData(me(t,!1)),t.innerHTML=e);t=0}catch(e){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=[];return Be(this,arguments,function(t){var n=this.parentNode;T.inArray(this,e)<0&&(T.cleanData(me(this)),n&&n.replaceChild(t,this))},e)}}),T.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){T.fn[e]=function(e){for(var n,r=[],o=T(e),i=o.length-1,a=0;a<=i;a++)n=a===i?this:this.clone(!0),T(o[a])[t](n),d.apply(r,n.get());return this.pushStack(r)}});var Fe=new RegExp("^("+ie+")(?!px)[a-z%]+$","i"),We=function(e){var t=e.ownerDocument.defaultView;return t&&t.opener||(t=i),t.getComputedStyle(e)},Ue=new RegExp(ue.join("|"),"i");function $e(e,t,n){var r,o,i,a,u=e.style;return(n=n||We(e))&&(""!==(a=n.getPropertyValue(t)||n[t])||T.contains(e.ownerDocument,e)||(a=T.style(e,t)),!b.pixelBoxStyles()&&Fe.test(a)&&Ue.test(t)&&(r=u.width,o=u.minWidth,i=u.maxWidth,u.minWidth=u.maxWidth=u.width=a,a=n.width,u.width=r,u.minWidth=o,u.maxWidth=i)),void 0!==a?a+"":a}function Ye(e,t){return{get:function(){if(!e())return(this.get=t).apply(this,arguments);delete this.get}}}!function(){function e(){if(c){l.style.cssText="position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",c.style.cssText="position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",Ce.appendChild(l).appendChild(c);var e=i.getComputedStyle(c);n="1%"!==e.top,u=12===t(e.marginLeft),c.style.right="60%",a=36===t(e.right),r=36===t(e.width),c.style.position="absolute",o=36===c.offsetWidth||"absolute",Ce.removeChild(l),c=null}}function t(e){return Math.round(parseFloat(e))}var n,r,o,a,u,l=s.createElement("div"),c=s.createElement("div");c.style&&(c.style.backgroundClip="content-box",c.cloneNode(!0).style.backgroundClip="",b.clearCloneStyle="content-box"===c.style.backgroundClip,T.extend(b,{boxSizingReliable:function(){return e(),r},pixelBoxStyles:function(){return e(),a},pixelPosition:function(){return e(),n},reliableMarginLeft:function(){return e(),u},scrollboxSize:function(){return e(),o}}))}();var Ve=/^(none|table(?!-c[ea]).+)/,ze=/^--/,Qe={position:"absolute",visibility:"hidden",display:"block"},Ge={letterSpacing:"0",fontWeight:"400"},Xe=["Webkit","Moz","ms"],Ke=s.createElement("div").style;function Je(e){var t=T.cssProps[e];return t||(t=T.cssProps[e]=function(e){if(e in Ke)return e;for(var t=e[0].toUpperCase()+e.slice(1),n=Xe.length;n--;)if((e=Xe[n]+t)in Ke)return e}(e)||e),t}function Ze(e,t,n){var r=ae.exec(t);return r?Math.max(0,r[2]-(n||0))+(r[3]||"px"):t}function et(e,t,n,r,o,i){var a="width"===t?1:0,u=0,s=0;if(n===(r?"border":"content"))return 0;for(;a<4;a+=2)"margin"===n&&(s+=T.css(e,n+ue[a],!0,o)),r?("content"===n&&(s-=T.css(e,"padding"+ue[a],!0,o)),"margin"!==n&&(s-=T.css(e,"border"+ue[a]+"Width",!0,o))):(s+=T.css(e,"padding"+ue[a],!0,o),"padding"!==n?s+=T.css(e,"border"+ue[a]+"Width",!0,o):u+=T.css(e,"border"+ue[a]+"Width",!0,o));return!r&&i>=0&&(s+=Math.max(0,Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-i-s-u-.5))),s}function tt(e,t,n){var r=We(e),o=$e(e,t,r),i="border-box"===T.css(e,"boxSizing",!1,r),a=i;if(Fe.test(o)){if(!n)return o;o="auto"}return a=a&&(b.boxSizingReliable()||o===e.style[t]),("auto"===o||!parseFloat(o)&&"inline"===T.css(e,"display",!1,r))&&(o=e["offset"+t[0].toUpperCase()+t.slice(1)],a=!0),(o=parseFloat(o)||0)+et(e,t,n||(i?"border":"content"),a,r,o)+"px"}function nt(e,t,n,r,o){return new nt.prototype.init(e,t,n,r,o)}T.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=$e(e,"opacity");return""===n?"1":n}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,a,u,s=K(t),l=ze.test(t),c=e.style;if(l||(t=Je(s)),u=T.cssHooks[t]||T.cssHooks[s],void 0===n)return u&&"get"in u&&void 0!==(i=u.get(e,!1,r))?i:c[t];"string"==(a=void 0===n?"undefined":o(n))&&(i=ae.exec(n))&&i[1]&&(n=ce(e,t,i),a="number"),null!=n&&n==n&&("number"===a&&(n+=i&&i[3]||(T.cssNumber[s]?"":"px")),b.clearCloneStyle||""!==n||0!==t.indexOf("background")||(c[t]="inherit"),u&&"set"in u&&void 0===(n=u.set(e,n,r))||(l?c.setProperty(t,n):c[t]=n))}},css:function(e,t,n,r){var o,i,a,u=K(t);return ze.test(t)||(t=Je(u)),(a=T.cssHooks[t]||T.cssHooks[u])&&"get"in a&&(o=a.get(e,!0,n)),void 0===o&&(o=$e(e,t,r)),"normal"===o&&t in Ge&&(o=Ge[t]),""===n||n?(i=parseFloat(o),!0===n||isFinite(i)?i||0:o):o}}),T.each(["height","width"],function(e,t){T.cssHooks[t]={get:function(e,n,r){if(n)return!Ve.test(T.css(e,"display"))||e.getClientRects().length&&e.getBoundingClientRect().width?tt(e,t,r):le(e,Qe,function(){return tt(e,t,r)})},set:function(e,n,r){var o,i=We(e),a="border-box"===T.css(e,"boxSizing",!1,i),u=r&&et(e,t,r,a,i);return a&&b.scrollboxSize()===i.position&&(u-=Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-parseFloat(i[t])-et(e,t,"border",!1,i)-.5)),u&&(o=ae.exec(n))&&"px"!==(o[3]||"px")&&(e.style[t]=n,n=T.css(e,t)),Ze(0,n,u)}}}),T.cssHooks.marginLeft=Ye(b.reliableMarginLeft,function(e,t){if(t)return(parseFloat($e(e,"marginLeft"))||e.getBoundingClientRect().left-le(e,{marginLeft:0},function(){return e.getBoundingClientRect().left}))+"px"}),T.each({margin:"",padding:"",border:"Width"},function(e,t){T.cssHooks[e+t]={expand:function(n){for(var r=0,o={},i="string"==typeof n?n.split(" "):[n];r<4;r++)o[e+ue[r]+t]=i[r]||i[r-2]||i[0];return o}},"margin"!==e&&(T.cssHooks[e+t].set=Ze)}),T.fn.extend({css:function(e,t){return z(this,function(e,t,n){var r,o,i={},a=0;if(Array.isArray(t)){for(r=We(e),o=t.length;a<o;a++)i[t[a]]=T.css(e,t[a],!1,r);return i}return void 0!==n?T.style(e,t,n):T.css(e,t)},e,t,arguments.length>1)}}),T.Tween=nt,nt.prototype={constructor:nt,init:function(e,t,n,r,o,i){this.elem=e,this.prop=n,this.easing=o||T.easing._default,this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=i||(T.cssNumber[n]?"":"px")},cur:function(){var e=nt.propHooks[this.prop];return e&&e.get?e.get(this):nt.propHooks._default.get(this)},run:function(e){var t,n=nt.propHooks[this.prop];return this.options.duration?this.pos=t=T.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):nt.propHooks._default.set(this),this}},nt.prototype.init.prototype=nt.prototype,nt.propHooks={_default:{get:function(e){var t;return 1!==e.elem.nodeType||null!=e.elem[e.prop]&&null==e.elem.style[e.prop]?e.elem[e.prop]:(t=T.css(e.elem,e.prop,""))&&"auto"!==t?t:0},set:function(e){T.fx.step[e.prop]?T.fx.step[e.prop](e):1!==e.elem.nodeType||null==e.elem.style[T.cssProps[e.prop]]&&!T.cssHooks[e.prop]?e.elem[e.prop]=e.now:T.style(e.elem,e.prop,e.now+e.unit)}}},nt.propHooks.scrollTop=nt.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},T.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},_default:"swing"},T.fx=nt.prototype.init,T.fx.step={};var rt,ot,it=/^(?:toggle|show|hide)$/,at=/queueHooks$/;function ut(){ot&&(!1===s.hidden&&i.requestAnimationFrame?i.requestAnimationFrame(ut):i.setTimeout(ut,T.fx.interval),T.fx.tick())}function st(){return i.setTimeout(function(){rt=void 0}),rt=Date.now()}function lt(e,t){var n,r=0,o={height:e};for(t=t?1:0;r<4;r+=2-t)o["margin"+(n=ue[r])]=o["padding"+n]=e;return t&&(o.opacity=o.width=e),o}function ct(e,t,n){for(var r,o=(ft.tweeners[t]||[]).concat(ft.tweeners["*"]),i=0,a=o.length;i<a;i++)if(r=o[i].call(n,t,e))return r}function ft(e,t,n){var r,o,i=0,a=ft.prefilters.length,u=T.Deferred().always(function(){delete s.elem}),s=function(){if(o)return!1;for(var t=rt||st(),n=Math.max(0,l.startTime+l.duration-t),r=1-(n/l.duration||0),i=0,a=l.tweens.length;i<a;i++)l.tweens[i].run(r);return u.notifyWith(e,[l,r,n]),r<1&&a?n:(a||u.notifyWith(e,[l,1,0]),u.resolveWith(e,[l]),!1)},l=u.promise({elem:e,props:T.extend({},t),opts:T.extend(!0,{specialEasing:{},easing:T.easing._default},n),originalProperties:t,originalOptions:n,startTime:rt||st(),duration:n.duration,tweens:[],createTween:function(t,n){var r=T.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(o)return this;for(o=!0;n<r;n++)l.tweens[n].run(1);return t?(u.notifyWith(e,[l,1,0]),u.resolveWith(e,[l,t])):u.rejectWith(e,[l,t]),this}}),c=l.props;for(function(e,t){var n,r,o,i,a;for(n in e)if(o=t[r=K(n)],i=e[n],Array.isArray(i)&&(o=i[1],i=e[n]=i[0]),n!==r&&(e[r]=i,delete e[n]),(a=T.cssHooks[r])&&"expand"in a)for(n in i=a.expand(i),delete e[r],i)n in e||(e[n]=i[n],t[n]=o);else t[r]=o}(c,l.opts.specialEasing);i<a;i++)if(r=ft.prefilters[i].call(l,e,c,l.opts))return x(r.stop)&&(T._queueHooks(l.elem,l.opts.queue).stop=r.stop.bind(r)),r;return T.map(c,ct,l),x(l.opts.start)&&l.opts.start.call(e,l),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always),T.fx.timer(T.extend(s,{elem:e,anim:l,queue:l.opts.queue})),l}T.Animation=T.extend(ft,{tweeners:{"*":[function(e,t){var n=this.createTween(e,t);return ce(n.elem,e,ae.exec(t),n),n}]},tweener:function(e,t){x(e)?(t=e,e=["*"]):e=e.match(H);for(var n,r=0,o=e.length;r<o;r++)n=e[r],ft.tweeners[n]=ft.tweeners[n]||[],ft.tweeners[n].unshift(t)},prefilters:[function(e,t,n){var r,o,i,a,u,s,l,c,f="width"in t||"height"in t,d=this,p={},v=e.style,h=e.nodeType&&se(e),y=ee.get(e,"fxshow");for(r in n.queue||(null==(a=T._queueHooks(e,"fx")).unqueued&&(a.unqueued=0,u=a.empty.fire,a.empty.fire=function(){a.unqueued||u()}),a.unqueued++,d.always(function(){d.always(function(){a.unqueued--,T.queue(e,"fx").length||a.empty.fire()})})),t)if(o=t[r],it.test(o)){if(delete t[r],i=i||"toggle"===o,o===(h?"hide":"show")){if("show"!==o||!y||void 0===y[r])continue;h=!0}p[r]=y&&y[r]||T.style(e,r)}if((s=!T.isEmptyObject(t))||!T.isEmptyObject(p))for(r in f&&1===e.nodeType&&(n.overflow=[v.overflow,v.overflowX,v.overflowY],null==(l=y&&y.display)&&(l=ee.get(e,"display")),"none"===(c=T.css(e,"display"))&&(l?c=l:(pe([e],!0),l=e.style.display||l,c=T.css(e,"display"),pe([e]))),("inline"===c||"inline-block"===c&&null!=l)&&"none"===T.css(e,"float")&&(s||(d.done(function(){v.display=l}),null==l&&(c=v.display,l="none"===c?"":c)),v.display="inline-block")),n.overflow&&(v.overflow="hidden",d.always(function(){v.overflow=n.overflow[0],v.overflowX=n.overflow[1],v.overflowY=n.overflow[2]})),s=!1,p)s||(y?"hidden"in y&&(h=y.hidden):y=ee.access(e,"fxshow",{display:l}),i&&(y.hidden=!h),h&&pe([e],!0),d.done(function(){for(r in h||pe([e]),ee.remove(e,"fxshow"),p)T.style(e,r,p[r])})),s=ct(h?y[r]:0,r,d),r in y||(y[r]=s.start,h&&(s.end=s.start,s.start=0))}],prefilter:function(e,t){t?ft.prefilters.unshift(e):ft.prefilters.push(e)}}),T.speed=function(e,t,n){var r=e&&"object"==(void 0===e?"undefined":o(e))?T.extend({},e):{complete:n||!n&&t||x(e)&&e,duration:e,easing:n&&t||t&&!x(t)&&t};return T.fx.off?r.duration=0:"number"!=typeof r.duration&&(r.duration in T.fx.speeds?r.duration=T.fx.speeds[r.duration]:r.duration=T.fx.speeds._default),null!=r.queue&&!0!==r.queue||(r.queue="fx"),r.old=r.complete,r.complete=function(){x(r.old)&&r.old.call(this),r.queue&&T.dequeue(this,r.queue)},r},T.fn.extend({fadeTo:function(e,t,n,r){return this.filter(se).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var o=T.isEmptyObject(e),i=T.speed(t,n,r),a=function(){var t=ft(this,T.extend({},e),i);(o||ee.get(this,"finish"))&&t.stop(!0)};return a.finish=a,o||!1===i.queue?this.each(a):this.queue(i.queue,a)},stop:function(e,t,n){var r=function(e){var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=void 0),t&&!1!==e&&this.queue(e||"fx",[]),this.each(function(){var t=!0,o=null!=e&&e+"queueHooks",i=T.timers,a=ee.get(this);if(o)a[o]&&a[o].stop&&r(a[o]);else for(o in a)a[o]&&a[o].stop&&at.test(o)&&r(a[o]);for(o=i.length;o--;)i[o].elem!==this||null!=e&&i[o].queue!==e||(i[o].anim.stop(n),t=!1,i.splice(o,1));!t&&n||T.dequeue(this,e)})},finish:function(e){return!1!==e&&(e=e||"fx"),this.each(function(){var t,n=ee.get(this),r=n[e+"queue"],o=n[e+"queueHooks"],i=T.timers,a=r?r.length:0;for(n.finish=!0,T.queue(this,e,[]),o&&o.stop&&o.stop.call(this,!0),t=i.length;t--;)i[t].elem===this&&i[t].queue===e&&(i[t].anim.stop(!0),i.splice(t,1));for(t=0;t<a;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}}),T.each(["toggle","show","hide"],function(e,t){var n=T.fn[t];T.fn[t]=function(e,r,o){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(lt(t,!0),e,r,o)}}),T.each({slideDown:lt("show"),slideUp:lt("hide"),slideToggle:lt("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){T.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),T.timers=[],T.fx.tick=function(){var e,t=0,n=T.timers;for(rt=Date.now();t<n.length;t++)(e=n[t])()||n[t]!==e||n.splice(t--,1);n.length||T.fx.stop(),rt=void 0},T.fx.timer=function(e){T.timers.push(e),T.fx.start()},T.fx.interval=13,T.fx.start=function(){ot||(ot=!0,ut())},T.fx.stop=function(){ot=null},T.fx.speeds={slow:600,fast:200,_default:400},T.fn.delay=function(e,t){return e=T.fx&&T.fx.speeds[e]||e,t=t||"fx",this.queue(t,function(t,n){var r=i.setTimeout(t,e);n.stop=function(){i.clearTimeout(r)}})},function(){var e=s.createElement("input"),t=s.createElement("select").appendChild(s.createElement("option"));e.type="checkbox",b.checkOn=""!==e.value,b.optSelected=t.selected,(e=s.createElement("input")).value="t",e.type="radio",b.radioValue="t"===e.value}();var dt,pt=T.expr.attrHandle;T.fn.extend({attr:function(e,t){return z(this,T.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){T.removeAttr(this,e)})}}),T.extend({attr:function(e,t,n){var r,o,i=e.nodeType;if(3!==i&&8!==i&&2!==i)return void 0===e.getAttribute?T.prop(e,t,n):(1===i&&T.isXMLDoc(e)||(o=T.attrHooks[t.toLowerCase()]||(T.expr.match.bool.test(t)?dt:void 0)),void 0!==n?null===n?void T.removeAttr(e,t):o&&"set"in o&&void 0!==(r=o.set(e,n,t))?r:(e.setAttribute(t,n+""),n):o&&"get"in o&&null!==(r=o.get(e,t))?r:null==(r=T.find.attr(e,t))?void 0:r)},attrHooks:{type:{set:function(e,t){if(!b.radioValue&&"radio"===t&&j(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},removeAttr:function(e,t){var n,r=0,o=t&&t.match(H);if(o&&1===e.nodeType)for(;n=o[r++];)e.removeAttribute(n)}}),dt={set:function(e,t,n){return!1===t?T.removeAttr(e,n):e.setAttribute(n,n),n}},T.each(T.expr.match.bool.source.match(/\w+/g),function(e,t){var n=pt[t]||T.find.attr;pt[t]=function(e,t,r){var o,i,a=t.toLowerCase();return r||(i=pt[a],pt[a]=o,o=null!=n(e,t,r)?a:null,pt[a]=i),o}});var vt=/^(?:input|select|textarea|button)$/i,ht=/^(?:a|area)$/i;function yt(e){return(e.match(H)||[]).join(" ")}function gt(e){return e.getAttribute&&e.getAttribute("class")||""}function mt(e){return Array.isArray(e)?e:"string"==typeof e&&e.match(H)||[]}T.fn.extend({prop:function(e,t){return z(this,T.prop,e,t,arguments.length>1)},removeProp:function(e){return this.each(function(){delete this[T.propFix[e]||e]})}}),T.extend({prop:function(e,t,n){var r,o,i=e.nodeType;if(3!==i&&8!==i&&2!==i)return 1===i&&T.isXMLDoc(e)||(t=T.propFix[t]||t,o=T.propHooks[t]),void 0!==n?o&&"set"in o&&void 0!==(r=o.set(e,n,t))?r:e[t]=n:o&&"get"in o&&null!==(r=o.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){var t=T.find.attr(e,"tabindex");return t?parseInt(t,10):vt.test(e.nodeName)||ht.test(e.nodeName)&&e.href?0:-1}}},propFix:{for:"htmlFor",class:"className"}}),b.optSelected||(T.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null},set:function(e){var t=e.parentNode;t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex)}}),T.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){T.propFix[this.toLowerCase()]=this}),T.fn.extend({addClass:function(e){var t,n,r,o,i,a,u,s=0;if(x(e))return this.each(function(t){T(this).addClass(e.call(this,t,gt(this)))});if((t=mt(e)).length)for(;n=this[s++];)if(o=gt(n),r=1===n.nodeType&&" "+yt(o)+" "){for(a=0;i=t[a++];)r.indexOf(" "+i+" ")<0&&(r+=i+" ");o!==(u=yt(r))&&n.setAttribute("class",u)}return this},removeClass:function(e){var t,n,r,o,i,a,u,s=0;if(x(e))return this.each(function(t){T(this).removeClass(e.call(this,t,gt(this)))});if(!arguments.length)return this.attr("class","");if((t=mt(e)).length)for(;n=this[s++];)if(o=gt(n),r=1===n.nodeType&&" "+yt(o)+" "){for(a=0;i=t[a++];)for(;r.indexOf(" "+i+" ")>-1;)r=r.replace(" "+i+" "," ");o!==(u=yt(r))&&n.setAttribute("class",u)}return this},toggleClass:function(e,t){var n=void 0===e?"undefined":o(e),r="string"===n||Array.isArray(e);return"boolean"==typeof t&&r?t?this.addClass(e):this.removeClass(e):x(e)?this.each(function(n){T(this).toggleClass(e.call(this,n,gt(this),t),t)}):this.each(function(){var t,o,i,a;if(r)for(o=0,i=T(this),a=mt(e);t=a[o++];)i.hasClass(t)?i.removeClass(t):i.addClass(t);else void 0!==e&&"boolean"!==n||((t=gt(this))&&ee.set(this,"__className__",t),this.setAttribute&&this.setAttribute("class",t||!1===e?"":ee.get(this,"__className__")||""))})},hasClass:function(e){var t,n,r=0;for(t=" "+e+" ";n=this[r++];)if(1===n.nodeType&&(" "+yt(gt(n))+" ").indexOf(t)>-1)return!0;return!1}});var bt=/\r/g;T.fn.extend({val:function(e){var t,n,r,o=this[0];return arguments.length?(r=x(e),this.each(function(n){var o;1===this.nodeType&&(null==(o=r?e.call(this,n,T(this).val()):e)?o="":"number"==typeof o?o+="":Array.isArray(o)&&(o=T.map(o,function(e){return null==e?"":e+""})),(t=T.valHooks[this.type]||T.valHooks[this.nodeName.toLowerCase()])&&"set"in t&&void 0!==t.set(this,o,"value")||(this.value=o))})):o?(t=T.valHooks[o.type]||T.valHooks[o.nodeName.toLowerCase()])&&"get"in t&&void 0!==(n=t.get(o,"value"))?n:"string"==typeof(n=o.value)?n.replace(bt,""):null==n?"":n:void 0}}),T.extend({valHooks:{option:{get:function(e){var t=T.find.attr(e,"value");return null!=t?t:yt(T.text(e))}},select:{get:function(e){var t,n,r,o=e.options,i=e.selectedIndex,a="select-one"===e.type,u=a?null:[],s=a?i+1:o.length;for(r=i<0?s:a?i:0;r<s;r++)if(((n=o[r]).selected||r===i)&&!n.disabled&&(!n.parentNode.disabled||!j(n.parentNode,"optgroup"))){if(t=T(n).val(),a)return t;u.push(t)}return u},set:function(e,t){for(var n,r,o=e.options,i=T.makeArray(t),a=o.length;a--;)((r=o[a]).selected=T.inArray(T.valHooks.option.get(r),i)>-1)&&(n=!0);return n||(e.selectedIndex=-1),i}}}}),T.each(["radio","checkbox"],function(){T.valHooks[this]={set:function(e,t){if(Array.isArray(t))return e.checked=T.inArray(T(e).val(),t)>-1}},b.checkOn||(T.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})}),b.focusin="onfocusin"in i;var xt=/^(?:focusinfocus|focusoutblur)$/,wt=function(e){e.stopPropagation()};T.extend(T.event,{trigger:function(e,t,n,r){var a,u,l,c,f,d,p,v,h=[n||s],g=y.call(e,"type")?e.type:e,m=y.call(e,"namespace")?e.namespace.split("."):[];if(u=v=l=n=n||s,3!==n.nodeType&&8!==n.nodeType&&!xt.test(g+T.event.triggered)&&(g.indexOf(".")>-1&&(g=(m=g.split(".")).shift(),m.sort()),f=g.indexOf(":")<0&&"on"+g,(e=e[T.expando]?e:new T.Event(g,"object"==(void 0===e?"undefined":o(e))&&e)).isTrigger=r?2:3,e.namespace=m.join("."),e.rnamespace=e.namespace?new RegExp("(^|\\.)"+m.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,e.result=void 0,e.target||(e.target=n),t=null==t?[e]:T.makeArray(t,[e]),p=T.event.special[g]||{},r||!p.trigger||!1!==p.trigger.apply(n,t))){if(!r&&!p.noBubble&&!w(n)){for(c=p.delegateType||g,xt.test(c+g)||(u=u.parentNode);u;u=u.parentNode)h.push(u),l=u;l===(n.ownerDocument||s)&&h.push(l.defaultView||l.parentWindow||i)}for(a=0;(u=h[a++])&&!e.isPropagationStopped();)v=u,e.type=a>1?c:p.bindType||g,(d=(ee.get(u,"events")||{})[e.type]&&ee.get(u,"handle"))&&d.apply(u,t),(d=f&&u[f])&&d.apply&&J(u)&&(e.result=d.apply(u,t),!1===e.result&&e.preventDefault());return e.type=g,r||e.isDefaultPrevented()||p._default&&!1!==p._default.apply(h.pop(),t)||!J(n)||f&&x(n[g])&&!w(n)&&((l=n[f])&&(n[f]=null),T.event.triggered=g,e.isPropagationStopped()&&v.addEventListener(g,wt),n[g](),e.isPropagationStopped()&&v.removeEventListener(g,wt),T.event.triggered=void 0,l&&(n[f]=l)),e.result}},simulate:function(e,t,n){var r=T.extend(new T.Event,n,{type:e,isSimulated:!0});T.event.trigger(r,null,t)}}),T.fn.extend({trigger:function(e,t){return this.each(function(){T.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];if(n)return T.event.trigger(e,t,n,!0)}}),b.focusin||T.each({focus:"focusin",blur:"focusout"},function(e,t){var n=function(e){T.event.simulate(t,e.target,T.event.fix(e))};T.event.special[t]={setup:function(){var r=this.ownerDocument||this,o=ee.access(r,t);o||r.addEventListener(e,n,!0),ee.access(r,t,(o||0)+1)},teardown:function(){var r=this.ownerDocument||this,o=ee.access(r,t)-1;o?ee.access(r,t,o):(r.removeEventListener(e,n,!0),ee.remove(r,t))}}});var Ct=i.location,Et=Date.now(),Pt=/\?/;T.parseXML=function(e){var t;if(!e||"string"!=typeof e)return null;try{t=(new i.DOMParser).parseFromString(e,"text/xml")}catch(e){t=void 0}return t&&!t.getElementsByTagName("parsererror").length||T.error("Invalid XML: "+e),t};var Tt=/\[\]$/,_t=/\r?\n/g,kt=/^(?:submit|button|image|reset|file)$/i,Ot=/^(?:input|select|textarea|keygen)/i;function St(e,t,n,r){var i;if(Array.isArray(t))T.each(t,function(t,i){n||Tt.test(e)?r(e,i):St(e+"["+("object"==(void 0===i?"undefined":o(i))&&null!=i?t:"")+"]",i,n,r)});else if(n||"object"!==P(t))r(e,t);else for(i in t)St(e+"["+i+"]",t[i],n,r)}T.param=function(e,t){var n,r=[],o=function(e,t){var n=x(t)?t():t;r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(null==n?"":n)};if(Array.isArray(e)||e.jquery&&!T.isPlainObject(e))T.each(e,function(){o(this.name,this.value)});else for(n in e)St(n,e[n],t,o);return r.join("&")},T.fn.extend({serialize:function(){return T.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=T.prop(this,"elements");return e?T.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!T(this).is(":disabled")&&Ot.test(this.nodeName)&&!kt.test(e)&&(this.checked||!ve.test(e))}).map(function(e,t){var n=T(this).val();return null==n?null:Array.isArray(n)?T.map(n,function(e){return{name:t.name,value:e.replace(_t,"\r\n")}}):{name:t.name,value:n.replace(_t,"\r\n")}}).get()}});var At=/%20/g,Nt=/#.*$/,jt=/([?&])_=[^&]*/,Mt=/^(.*?):[ \t]*([^\r\n]*)$/gm,Dt=/^(?:GET|HEAD)$/,Rt=/^\/\//,Lt={},It={},qt="*/".concat("*"),Bt=s.createElement("a");function Ht(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,o=0,i=t.toLowerCase().match(H)||[];if(x(n))for(;r=i[o++];)"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function Ft(e,t,n,r){var o={},i=e===It;function a(u){var s;return o[u]=!0,T.each(e[u]||[],function(e,u){var l=u(t,n,r);return"string"!=typeof l||i||o[l]?i?!(s=l):void 0:(t.dataTypes.unshift(l),a(l),!1)}),s}return a(t.dataTypes[0])||!o["*"]&&a("*")}function Wt(e,t){var n,r,o=T.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((o[n]?e:r||(r={}))[n]=t[n]);return r&&T.extend(!0,e,r),e}Bt.href=Ct.href,T.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Ct.href,type:"GET",isLocal:/^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Ct.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":qt,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":T.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?Wt(Wt(e,T.ajaxSettings),t):Wt(T.ajaxSettings,e)},ajaxPrefilter:Ht(Lt),ajaxTransport:Ht(It),ajax:function(e,t){"object"==(void 0===e?"undefined":o(e))&&(t=e,e=void 0),t=t||{};var n,r,a,u,l,c,f,d,p,v,h=T.ajaxSetup({},t),y=h.context||h,g=h.context&&(y.nodeType||y.jquery)?T(y):T.event,m=T.Deferred(),b=T.Callbacks("once memory"),x=h.statusCode||{},w={},C={},E="canceled",P={readyState:0,getResponseHeader:function(e){var t;if(f){if(!u)for(u={};t=Mt.exec(a);)u[t[1].toLowerCase()]=t[2];t=u[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return f?a:null},setRequestHeader:function(e,t){return null==f&&(e=C[e.toLowerCase()]=C[e.toLowerCase()]||e,w[e]=t),this},overrideMimeType:function(e){return null==f&&(h.mimeType=e),this},statusCode:function(e){var t;if(e)if(f)P.always(e[P.status]);else for(t in e)x[t]=[x[t],e[t]];return this},abort:function(e){var t=e||E;return n&&n.abort(t),_(0,t),this}};if(m.promise(P),h.url=((e||h.url||Ct.href)+"").replace(Rt,Ct.protocol+"//"),h.type=t.method||t.type||h.method||h.type,h.dataTypes=(h.dataType||"*").toLowerCase().match(H)||[""],null==h.crossDomain){c=s.createElement("a");try{c.href=h.url,c.href=c.href,h.crossDomain=Bt.protocol+"//"+Bt.host!=c.protocol+"//"+c.host}catch(e){h.crossDomain=!0}}if(h.data&&h.processData&&"string"!=typeof h.data&&(h.data=T.param(h.data,h.traditional)),Ft(Lt,h,t,P),f)return P;for(p in(d=T.event&&h.global)&&0==T.active++&&T.event.trigger("ajaxStart"),h.type=h.type.toUpperCase(),h.hasContent=!Dt.test(h.type),r=h.url.replace(Nt,""),h.hasContent?h.data&&h.processData&&0===(h.contentType||"").indexOf("application/x-www-form-urlencoded")&&(h.data=h.data.replace(At,"+")):(v=h.url.slice(r.length),h.data&&(h.processData||"string"==typeof h.data)&&(r+=(Pt.test(r)?"&":"?")+h.data,delete h.data),!1===h.cache&&(r=r.replace(jt,"$1"),v=(Pt.test(r)?"&":"?")+"_="+Et+++v),h.url=r+v),h.ifModified&&(T.lastModified[r]&&P.setRequestHeader("If-Modified-Since",T.lastModified[r]),T.etag[r]&&P.setRequestHeader("If-None-Match",T.etag[r])),(h.data&&h.hasContent&&!1!==h.contentType||t.contentType)&&P.setRequestHeader("Content-Type",h.contentType),P.setRequestHeader("Accept",h.dataTypes[0]&&h.accepts[h.dataTypes[0]]?h.accepts[h.dataTypes[0]]+("*"!==h.dataTypes[0]?", "+qt+"; q=0.01":""):h.accepts["*"]),h.headers)P.setRequestHeader(p,h.headers[p]);if(h.beforeSend&&(!1===h.beforeSend.call(y,P,h)||f))return P.abort();if(E="abort",b.add(h.complete),P.done(h.success),P.fail(h.error),n=Ft(It,h,t,P)){if(P.readyState=1,d&&g.trigger("ajaxSend",[P,h]),f)return P;h.async&&h.timeout>0&&(l=i.setTimeout(function(){P.abort("timeout")},h.timeout));try{f=!1,n.send(w,_)}catch(e){if(f)throw e;_(-1,e)}}else _(-1,"No Transport");function _(e,t,o,u){var s,c,p,v,w,C=t;f||(f=!0,l&&i.clearTimeout(l),n=void 0,a=u||"",P.readyState=e>0?4:0,s=e>=200&&e<300||304===e,o&&(v=function(e,t,n){for(var r,o,i,a,u=e.contents,s=e.dataTypes;"*"===s[0];)s.shift(),void 0===r&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(o in u)if(u[o]&&u[o].test(r)){s.unshift(o);break}if(s[0]in n)i=s[0];else{for(o in n){if(!s[0]||e.converters[o+" "+s[0]]){i=o;break}a||(a=o)}i=i||a}if(i)return i!==s[0]&&s.unshift(i),n[i]}(h,P,o)),v=function(e,t,n,r){var o,i,a,u,s,l={},c=e.dataTypes.slice();if(c[1])for(a in e.converters)l[a.toLowerCase()]=e.converters[a];for(i=c.shift();i;)if(e.responseFields[i]&&(n[e.responseFields[i]]=t),!s&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),s=i,i=c.shift())if("*"===i)i=s;else if("*"!==s&&s!==i){if(!(a=l[s+" "+i]||l["* "+i]))for(o in l)if((u=o.split(" "))[1]===i&&(a=l[s+" "+u[0]]||l["* "+u[0]])){!0===a?a=l[o]:!0!==l[o]&&(i=u[0],c.unshift(u[1]));break}if(!0!==a)if(a&&e.throws)t=a(t);else try{t=a(t)}catch(e){return{state:"parsererror",error:a?e:"No conversion from "+s+" to "+i}}}return{state:"success",data:t}}(h,v,P,s),s?(h.ifModified&&((w=P.getResponseHeader("Last-Modified"))&&(T.lastModified[r]=w),(w=P.getResponseHeader("etag"))&&(T.etag[r]=w)),204===e||"HEAD"===h.type?C="nocontent":304===e?C="notmodified":(C=v.state,c=v.data,s=!(p=v.error))):(p=C,!e&&C||(C="error",e<0&&(e=0))),P.status=e,P.statusText=(t||C)+"",s?m.resolveWith(y,[c,C,P]):m.rejectWith(y,[P,C,p]),P.statusCode(x),x=void 0,d&&g.trigger(s?"ajaxSuccess":"ajaxError",[P,h,s?c:p]),b.fireWith(y,[P,C]),d&&(g.trigger("ajaxComplete",[P,h]),--T.active||T.event.trigger("ajaxStop")))}return P},getJSON:function(e,t,n){return T.get(e,t,n,"json")},getScript:function(e,t){return T.get(e,void 0,t,"script")}}),T.each(["get","post"],function(e,t){T[t]=function(e,n,r,o){return x(n)&&(o=o||r,r=n,n=void 0),T.ajax(T.extend({url:e,type:t,dataType:o,data:n,success:r},T.isPlainObject(e)&&e))}}),T._evalUrl=function(e){return T.ajax({url:e,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,throws:!0})},T.fn.extend({wrapAll:function(e){var t;return this[0]&&(x(e)&&(e=e.call(this[0])),t=T(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){for(var e=this;e.firstElementChild;)e=e.firstElementChild;return e}).append(this)),this},wrapInner:function(e){return x(e)?this.each(function(t){T(this).wrapInner(e.call(this,t))}):this.each(function(){var t=T(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=x(e);return this.each(function(n){T(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(e){return this.parent(e).not("body").each(function(){T(this).replaceWith(this.childNodes)}),this}}),T.expr.pseudos.hidden=function(e){return!T.expr.pseudos.visible(e)},T.expr.pseudos.visible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},T.ajaxSettings.xhr=function(){try{return new i.XMLHttpRequest}catch(e){}};var Ut={0:200,1223:204},$t=T.ajaxSettings.xhr();b.cors=!!$t&&"withCredentials"in $t,b.ajax=$t=!!$t,T.ajaxTransport(function(e){var t,n;if(b.cors||$t&&!e.crossDomain)return{send:function(r,o){var a,u=e.xhr();if(u.open(e.type,e.url,e.async,e.username,e.password),e.xhrFields)for(a in e.xhrFields)u[a]=e.xhrFields[a];for(a in e.mimeType&&u.overrideMimeType&&u.overrideMimeType(e.mimeType),e.crossDomain||r["X-Requested-With"]||(r["X-Requested-With"]="XMLHttpRequest"),r)u.setRequestHeader(a,r[a]);t=function(e){return function(){t&&(t=n=u.onload=u.onerror=u.onabort=u.ontimeout=u.onreadystatechange=null,"abort"===e?u.abort():"error"===e?"number"!=typeof u.status?o(0,"error"):o(u.status,u.statusText):o(Ut[u.status]||u.status,u.statusText,"text"!==(u.responseType||"text")||"string"!=typeof u.responseText?{binary:u.response}:{text:u.responseText},u.getAllResponseHeaders()))}},u.onload=t(),n=u.onerror=u.ontimeout=t("error"),void 0!==u.onabort?u.onabort=n:u.onreadystatechange=function(){4===u.readyState&&i.setTimeout(function(){t&&n()})},t=t("abort");try{u.send(e.hasContent&&e.data||null)}catch(e){if(t)throw e}},abort:function(){t&&t()}}}),T.ajaxPrefilter(function(e){e.crossDomain&&(e.contents.script=!1)}),T.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(e){return T.globalEval(e),e}}}),T.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),T.ajaxTransport("script",function(e){var t,n;if(e.crossDomain)return{send:function(r,o){t=T("<script>").prop({charset:e.scriptCharset,src:e.url}).on("load error",n=function(e){t.remove(),n=null,e&&o("error"===e.type?404:200,e.type)}),s.head.appendChild(t[0])},abort:function(){n&&n()}}});var Yt=[],Vt=/(=)\?(?=&|$)|\?\?/;T.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Yt.pop()||T.expando+"_"+Et++;return this[e]=!0,e}}),T.ajaxPrefilter("json jsonp",function(e,t,n){var r,o,a,u=!1!==e.jsonp&&(Vt.test(e.url)?"url":"string"==typeof e.data&&0===(e.contentType||"").indexOf("application/x-www-form-urlencoded")&&Vt.test(e.data)&&"data");if(u||"jsonp"===e.dataTypes[0])return r=e.jsonpCallback=x(e.jsonpCallback)?e.jsonpCallback():e.jsonpCallback,u?e[u]=e[u].replace(Vt,"$1"+r):!1!==e.jsonp&&(e.url+=(Pt.test(e.url)?"&":"?")+e.jsonp+"="+r),e.converters["script json"]=function(){return a||T.error(r+" was not called"),a[0]},e.dataTypes[0]="json",o=i[r],i[r]=function(){a=arguments},n.always(function(){void 0===o?T(i).removeProp(r):i[r]=o,e[r]&&(e.jsonpCallback=t.jsonpCallback,Yt.push(r)),a&&x(o)&&o(a[0]),a=o=void 0}),"script"}),b.createHTMLDocument=function(){var e=s.implementation.createHTMLDocument("").body;return e.innerHTML="<form></form><form></form>",2===e.childNodes.length}(),T.parseHTML=function(e,t,n){return"string"!=typeof e?[]:("boolean"==typeof t&&(n=t,t=!1),t||(b.createHTMLDocument?((r=(t=s.implementation.createHTMLDocument("")).createElement("base")).href=s.location.href,t.head.appendChild(r)):t=s),o=M.exec(e),i=!n&&[],o?[t.createElement(o[1])]:(o=we([e],t,i),i&&i.length&&T(i).remove(),T.merge([],o.childNodes)));var r,o,i},T.fn.load=function(e,t,n){var r,i,a,u=this,s=e.indexOf(" ");return s>-1&&(r=yt(e.slice(s)),e=e.slice(0,s)),x(t)?(n=t,t=void 0):t&&"object"==(void 0===t?"undefined":o(t))&&(i="POST"),u.length>0&&T.ajax({url:e,type:i||"GET",dataType:"html",data:t}).done(function(e){a=arguments,u.html(r?T("<div>").append(T.parseHTML(e)).find(r):e)}).always(n&&function(e,t){u.each(function(){n.apply(this,a||[e.responseText,t,e])})}),this},T.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){T.fn[t]=function(e){return this.on(t,e)}}),T.expr.pseudos.animated=function(e){return T.grep(T.timers,function(t){return e===t.elem}).length},T.offset={setOffset:function(e,t,n){var r,o,i,a,u,s,l=T.css(e,"position"),c=T(e),f={};"static"===l&&(e.style.position="relative"),u=c.offset(),i=T.css(e,"top"),s=T.css(e,"left"),("absolute"===l||"fixed"===l)&&(i+s).indexOf("auto")>-1?(a=(r=c.position()).top,o=r.left):(a=parseFloat(i)||0,o=parseFloat(s)||0),x(t)&&(t=t.call(e,n,T.extend({},u))),null!=t.top&&(f.top=t.top-u.top+a),null!=t.left&&(f.left=t.left-u.left+o),"using"in t?t.using.call(e,f):c.css(f)}},T.fn.extend({offset:function(e){if(arguments.length)return void 0===e?this:this.each(function(t){T.offset.setOffset(this,e,t)});var t,n,r=this[0];return r?r.getClientRects().length?(t=r.getBoundingClientRect(),n=r.ownerDocument.defaultView,{top:t.top+n.pageYOffset,left:t.left+n.pageXOffset}):{top:0,left:0}:void 0},position:function(){if(this[0]){var e,t,n,r=this[0],o={top:0,left:0};if("fixed"===T.css(r,"position"))t=r.getBoundingClientRect();else{for(t=this.offset(),n=r.ownerDocument,e=r.offsetParent||n.documentElement;e&&(e===n.body||e===n.documentElement)&&"static"===T.css(e,"position");)e=e.parentNode;e&&e!==r&&1===e.nodeType&&((o=T(e).offset()).top+=T.css(e,"borderTopWidth",!0),o.left+=T.css(e,"borderLeftWidth",!0))}return{top:t.top-o.top-T.css(r,"marginTop",!0),left:t.left-o.left-T.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){for(var e=this.offsetParent;e&&"static"===T.css(e,"position");)e=e.offsetParent;return e||Ce})}}),T.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,t){var n="pageYOffset"===t;T.fn[e]=function(r){return z(this,function(e,r,o){var i;if(w(e)?i=e:9===e.nodeType&&(i=e.defaultView),void 0===o)return i?i[t]:e[r];i?i.scrollTo(n?i.pageXOffset:o,n?o:i.pageYOffset):e[r]=o},e,r,arguments.length)}}),T.each(["top","left"],function(e,t){T.cssHooks[t]=Ye(b.pixelPosition,function(e,n){if(n)return n=$e(e,t),Fe.test(n)?T(e).position()[t]+"px":n})}),T.each({Height:"height",Width:"width"},function(e,t){T.each({padding:"inner"+e,content:t,"":"outer"+e},function(n,r){T.fn[r]=function(o,i){var a=arguments.length&&(n||"boolean"!=typeof o),u=n||(!0===o||!0===i?"margin":"border");return z(this,function(t,n,o){var i;return w(t)?0===r.indexOf("outer")?t["inner"+e]:t.document.documentElement["client"+e]:9===t.nodeType?(i=t.documentElement,Math.max(t.body["scroll"+e],i["scroll"+e],t.body["offset"+e],i["offset"+e],i["client"+e])):void 0===o?T.css(t,n,u):T.style(t,n,o,u)},t,a?o:void 0,a)}})}),T.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(e,t){T.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),T.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),T.fn.extend({bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}}),T.proxy=function(e,t){var n,r,o;if("string"==typeof t&&(n=e[t],t=e,e=n),x(e))return r=c.call(arguments,2),(o=function(){return e.apply(t||this,r.concat(c.call(arguments)))}).guid=e.guid=e.guid||T.guid++,o},T.holdReady=function(e){e?T.readyWait++:T.ready(!0)},T.isArray=Array.isArray,T.parseJSON=JSON.parse,T.nodeName=j,T.isFunction=x,T.isWindow=w,T.camelCase=K,T.type=P,T.now=Date.now,T.isNumeric=function(e){var t=T.type(e);return("number"===t||"string"===t)&&!isNaN(e-parseFloat(e))},n(56)&&(void 0===(r=function(){return T}.apply(t,[]))||(e.exports=r));var zt=i.jQuery,Qt=i.$;return T.noConflict=function(e){return i.$===T&&(i.$=Qt),e&&i.jQuery===T&&(i.jQuery=zt),T},a||(i.jQuery=i.$=T),T})}).call(this,n(7)(e))
/***/},
/* 1 */
/***/function(e,t,n){"use strict";
/* WEBPACK VAR INJECTION */
/* WEBPACK VAR INJECTION */(function(e,n){Object.defineProperty(t,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o="object"==("undefined"==typeof self?"undefined":r(self))&&self.self===self&&self||"object"==(void 0===e?"undefined":r(e))&&e.global===e&&e||{},i=o._,a=Array.prototype,u=Object.prototype,s="undefined"!=typeof Symbol?Symbol.prototype:null,l=a.push,c=a.slice,f=u.toString,d=u.hasOwnProperty,p=Array.isArray,v=Object.keys,h=Object.create,y=function(){},g=function e(t){return t instanceof e?t:this instanceof e?void(this._wrapped=t):new e(t)};
//     Underscore.js 1.9.0
//     http://underscorejs.org
//     (c) 2009-2018 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
// Baseline setup
// --------------
// Establish the root object, `window` (`self`) in the browser, `global`
// on the server, or `this` in some virtual machines. We use `self`
// instead of `window` for `WebWorker` support.
// Export the Underscore object for **Node.js**, with
// backwards-compatibility for their old module API. If we're in
// the browser, add `_` as a global object.
// (`nodeType` is checked to ensure that `module`
// and `exports` are not HTML elements.)
void 0===t||t.nodeType?o._=g:(void 0!==n&&!n.nodeType&&n.exports&&(t=n.exports=g),t._=g),
// Current version.
g.VERSION="1.9.0";
// Internal function that returns an efficient (for current engines) version
// of the passed-in callback, to be repeatedly applied in other Underscore
// functions.
var m,b=function(e,t,n){if(void 0===t)return e;switch(null==n?3:n){case 1:return function(n){return e.call(t,n)};
// The 2-argument case is omitted because we’re not using it.
case 3:return function(n,r,o){return e.call(t,n,r,o)};case 4:return function(n,r,o,i){return e.call(t,n,r,o,i)}}return function(){return e.apply(t,arguments)}},x=function(e,t,n){return g.iteratee!==m?g.iteratee(e,t):null==e?g.identity:g.isFunction(e)?b(e,t,n):g.isObject(e)&&!g.isArray(e)?g.matcher(e):g.property(e)};
// External wrapper for our callback generator. Users may customize
// `_.iteratee` if they want additional predicate/iteratee shorthand styles.
// This abstraction hides the internal-only argCount argument.
g.iteratee=m=function(e,t){return x(e,t,1/0)};
// Some functions take a variable number of arguments, or a few expected
// arguments at the beginning and then a variable number of values to operate
// on. This helper accumulates all remaining arguments past the function’s
// argument length (or an explicit `startIndex`), into an array that becomes
// the last argument. Similar to ES6’s "rest parameter".
var w=function(e,t){return t=null==t?e.length-1:+t,function(){for(var n=Math.max(arguments.length-t,0),r=Array(n),o=0;o<n;o++)r[o]=arguments[o+t];switch(t){case 0:return e.call(this,r);case 1:return e.call(this,arguments[0],r);case 2:return e.call(this,arguments[0],arguments[1],r)}var i=Array(t+1);for(o=0;o<t;o++)i[o]=arguments[o];return i[t]=r,e.apply(this,i)}},C=function(e){if(!g.isObject(e))return{};if(h)return h(e);y.prototype=e;var t=new y;return y.prototype=null,t},E=function(e){return function(t){return null==t?void 0:t[e]}},P=function(e,t){for(var n=t.length,r=0;r<n;r++){if(null==e)return;e=e[t[r]]}return n?e:void 0},T=Math.pow(2,53)-1,_=E("length"),k=function(e){var t=_(e);return"number"==typeof t&&t>=0&&t<=T};
// An internal function for creating a new object that inherits from another.
// Collection Functions
// --------------------
// The cornerstone, an `each` implementation, aka `forEach`.
// Handles raw objects in addition to array-likes. Treats all
// sparse array-likes as if they were dense.
g.each=g.forEach=function(e,t,n){var r,o;if(t=b(t,n),k(e))for(r=0,o=e.length;r<o;r++)t(e[r],r,e);else{var i=g.keys(e);for(r=0,o=i.length;r<o;r++)t(e[i[r]],i[r],e)}return e},
// Return the results of applying the iteratee to each element.
g.map=g.collect=function(e,t,n){t=x(t,n);for(var r=!k(e)&&g.keys(e),o=(r||e).length,i=Array(o),a=0;a<o;a++){var u=r?r[a]:a;i[a]=t(e[u],u,e)}return i};
// Create a reducing function iterating left or right.
var O=function(e){return function(t,n,r,o){var i=arguments.length>=3;return function(t,n,r,o){var i=!k(t)&&g.keys(t),a=(i||t).length,u=e>0?0:a-1;for(o||(r=t[i?i[u]:u],u+=e);u>=0&&u<a;u+=e){var s=i?i[u]:u;r=n(r,t[s],s,t)}return r}(t,b(n,o,4),r,i)}};
// **Reduce** builds up a single result from a list of values, aka `inject`,
// or `foldl`.
g.reduce=g.foldl=g.inject=O(1),
// The right-associative version of reduce, also known as `foldr`.
g.reduceRight=g.foldr=O(-1),
// Return the first value which passes a truth test. Aliased as `detect`.
g.find=g.detect=function(e,t,n){var r=(k(e)?g.findIndex:g.findKey)(e,t,n);if(void 0!==r&&-1!==r)return e[r]},
// Return all the elements that pass a truth test.
// Aliased as `select`.
g.filter=g.select=function(e,t,n){var r=[];return t=x(t,n),g.each(e,function(e,n,o){t(e,n,o)&&r.push(e)}),r},
// Return all the elements for which a truth test fails.
g.reject=function(e,t,n){return g.filter(e,g.negate(x(t)),n)},
// Determine whether all of the elements match a truth test.
// Aliased as `all`.
g.every=g.all=function(e,t,n){t=x(t,n);for(var r=!k(e)&&g.keys(e),o=(r||e).length,i=0;i<o;i++){var a=r?r[i]:i;if(!t(e[a],a,e))return!1}return!0},
// Determine if at least one element in the object matches a truth test.
// Aliased as `any`.
g.some=g.any=function(e,t,n){t=x(t,n);for(var r=!k(e)&&g.keys(e),o=(r||e).length,i=0;i<o;i++){var a=r?r[i]:i;if(t(e[a],a,e))return!0}return!1},
// Determine if the array or object contains a given item (using `===`).
// Aliased as `includes` and `include`.
g.contains=g.includes=g.include=function(e,t,n,r){return k(e)||(e=g.values(e)),("number"!=typeof n||r)&&(n=0),g.indexOf(e,t,n)>=0},
// Invoke a method (with arguments) on every item in a collection.
g.invoke=w(function(e,t,n){var r,o;return g.isFunction(t)?o=t:g.isArray(t)&&(r=t.slice(0,-1),t=t[t.length-1]),g.map(e,function(e){var i=o;if(!i){if(r&&r.length&&(e=P(e,r)),null==e)return;i=e[t]}return null==i?i:i.apply(e,n)})}),
// Convenience version of a common use case of `map`: fetching a property.
g.pluck=function(e,t){return g.map(e,g.property(t))},
// Convenience version of a common use case of `filter`: selecting only objects
// containing specific `key:value` pairs.
g.where=function(e,t){return g.filter(e,g.matcher(t))},
// Convenience version of a common use case of `find`: getting the first object
// containing specific `key:value` pairs.
g.findWhere=function(e,t){return g.find(e,g.matcher(t))},
// Return the maximum element (or element-based computation).
g.max=function(e,t,n){var o,i,a=-1/0,u=-1/0;if(null==t||"number"==typeof t&&"object"!=r(e[0])&&null!=e)for(var s=0,l=(e=k(e)?e:g.values(e)).length;s<l;s++)null!=(o=e[s])&&o>a&&(a=o);else t=x(t,n),g.each(e,function(e,n,r){((i=t(e,n,r))>u||i===-1/0&&a===-1/0)&&(a=e,u=i)});return a},
// Return the minimum element (or element-based computation).
g.min=function(e,t,n){var o,i,a=1/0,u=1/0;if(null==t||"number"==typeof t&&"object"!=r(e[0])&&null!=e)for(var s=0,l=(e=k(e)?e:g.values(e)).length;s<l;s++)null!=(o=e[s])&&o<a&&(a=o);else t=x(t,n),g.each(e,function(e,n,r){((i=t(e,n,r))<u||i===1/0&&a===1/0)&&(a=e,u=i)});return a},
// Shuffle a collection.
g.shuffle=function(e){return g.sample(e,1/0)},
// Sample **n** random values from a collection using the modern version of the
// [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
// If **n** is not specified, returns a single random element.
// The internal `guard` argument allows it to work with `map`.
g.sample=function(e,t,n){if(null==t||n)return k(e)||(e=g.values(e)),e[g.random(e.length-1)];var r=k(e)?g.clone(e):g.values(e),o=_(r);t=Math.max(Math.min(t,o),0);for(var i=o-1,a=0;a<t;a++){var u=g.random(a,i),s=r[a];r[a]=r[u],r[u]=s}return r.slice(0,t)},
// Sort the object's values by a criterion produced by an iteratee.
g.sortBy=function(e,t,n){var r=0;return t=x(t,n),g.pluck(g.map(e,function(e,n,o){return{value:e,index:r++,criteria:t(e,n,o)}}).sort(function(e,t){var n=e.criteria,r=t.criteria;if(n!==r){if(n>r||void 0===n)return 1;if(n<r||void 0===r)return-1}return e.index-t.index}),"value")};
// An internal function used for aggregate "group by" operations.
var S=function(e,t){return function(n,r,o){var i=t?[[],[]]:{};return r=x(r,o),g.each(n,function(t,o){var a=r(t,o,n);e(i,t,a)}),i}};
// Groups the object's values by a criterion. Pass either a string attribute
// to group by, or a function that returns the criterion.
g.groupBy=S(function(e,t,n){g.has(e,n)?e[n].push(t):e[n]=[t]}),
// Indexes the object's values by a criterion, similar to `groupBy`, but for
// when you know that your index values will be unique.
g.indexBy=S(function(e,t,n){e[n]=t}),
// Counts instances of an object that group by a certain criterion. Pass
// either a string attribute to count by, or a function that returns the
// criterion.
g.countBy=S(function(e,t,n){g.has(e,n)?e[n]++:e[n]=1});var A=/[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
// Safely create a real, live array from anything iterable.
g.toArray=function(e){return e?g.isArray(e)?c.call(e):g.isString(e)?e.match(A):k(e)?g.map(e,g.identity):g.values(e):[]},
// Return the number of elements in an object.
g.size=function(e){return null==e?0:k(e)?e.length:g.keys(e).length},
// Split a collection into two arrays: one whose elements all satisfy the given
// predicate, and one whose elements all do not satisfy the predicate.
g.partition=S(function(e,t,n){e[n?0:1].push(t)},!0),
// Array Functions
// ---------------
// Get the first element of an array. Passing **n** will return the first N
// values in the array. Aliased as `head` and `take`. The **guard** check
// allows it to work with `_.map`.
g.first=g.head=g.take=function(e,t,n){if(!(null==e||e.length<1))return null==t||n?e[0]:g.initial(e,e.length-t)},
// Returns everything but the last entry of the array. Especially useful on
// the arguments object. Passing **n** will return all the values in
// the array, excluding the last N.
g.initial=function(e,t,n){return c.call(e,0,Math.max(0,e.length-(null==t||n?1:t)))},
// Get the last element of an array. Passing **n** will return the last N
// values in the array.
g.last=function(e,t,n){if(!(null==e||e.length<1))return null==t||n?e[e.length-1]:g.rest(e,Math.max(0,e.length-t))},
// Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
// Especially useful on the arguments object. Passing an **n** will return
// the rest N values in the array.
g.rest=g.tail=g.drop=function(e,t,n){return c.call(e,null==t||n?1:t)},
// Trim out all falsy values from an array.
g.compact=function(e){return g.filter(e,Boolean)};
// Internal implementation of a recursive `flatten` function.
var N=function e(t,n,r,o){for(var i=(o=o||[]).length,a=0,u=_(t);a<u;a++){var s=t[a];if(k(s)&&(g.isArray(s)||g.isArguments(s)))
// Flatten current level of array or arguments object.
if(n)for(var l=0,c=s.length;l<c;)o[i++]=s[l++];else e(s,n,r,o),i=o.length;else r||(o[i++]=s)}return o};
// Flatten out an array, either recursively (by default), or just one level.
g.flatten=function(e,t){return N(e,t,!1)},
// Return a version of the array that does not contain the specified value(s).
g.without=w(function(e,t){return g.difference(e,t)}),
// Produce a duplicate-free version of the array. If the array has already
// been sorted, you have the option of using a faster algorithm.
// The faster algorithm will not work with an iteratee if the iteratee
// is not a one-to-one function, so providing an iteratee will disable
// the faster algorithm.
// Aliased as `unique`.
g.uniq=g.unique=function(e,t,n,r){g.isBoolean(t)||(r=n,n=t,t=!1),null!=n&&(n=x(n,r));for(var o=[],i=[],a=0,u=_(e);a<u;a++){var s=e[a],l=n?n(s,a,e):s;t&&!n?(a&&i===l||o.push(s),i=l):n?g.contains(i,l)||(i.push(l),o.push(s)):g.contains(o,s)||o.push(s)}return o},
// Produce an array that contains the union: each distinct element from all of
// the passed-in arrays.
g.union=w(function(e){return g.uniq(N(e,!0,!0))}),
// Produce an array that contains every item shared between all the
// passed-in arrays.
g.intersection=function(e){for(var t=[],n=arguments.length,r=0,o=_(e);r<o;r++){var i=e[r];if(!g.contains(t,i)){var a;for(a=1;a<n&&g.contains(arguments[a],i);a++);a===n&&t.push(i)}}return t},
// Take the difference between one array and a number of other arrays.
// Only the elements present in just the first array will remain.
g.difference=w(function(e,t){return t=N(t,!0,!0),g.filter(e,function(e){return!g.contains(t,e)})}),
// Zip together multiple lists into a single array -- elements that share
// an index go together.
g.zip=w(
// Complement of _.zip. Unzip accepts an array of arrays and groups
// each array's elements on shared indices.
g.unzip=function(e){for(var t=e&&g.max(e,_).length||0,n=Array(t),r=0;r<t;r++)n[r]=g.pluck(e,r);return n}),
// Converts lists into objects. Pass either a single array of `[key, value]`
// pairs, or two parallel arrays of the same length -- one of keys, and one of
// the corresponding values. Passing by pairs is the reverse of _.pairs.
g.object=function(e,t){for(var n={},r=0,o=_(e);r<o;r++)t?n[e[r]]=t[r]:n[e[r][0]]=e[r][1];return n};
// Generator function to create the findIndex and findLastIndex functions.
var j=function(e){return function(t,n,r){n=x(n,r);for(var o=_(t),i=e>0?0:o-1;i>=0&&i<o;i+=e)if(n(t[i],i,t))return i;return-1}};
// Returns the first index on an array-like that passes a predicate test.
g.findIndex=j(1),g.findLastIndex=j(-1);
// Generator function to create the indexOf and lastIndexOf functions.
var M=function(e,t,n){return function(r,o,i){var a=0,u=_(r);if("number"==typeof i)e>0?a=i>=0?i:Math.max(i+u,a):u=i>=0?Math.min(i+1,u):i+u+1;else if(n&&i&&u)return r[i=n(r,o)]===o?i:-1;if(o!=o)return(i=t(c.call(r,a,u),g.isNaN))>=0?i+a:-1;for(i=e>0?a:u-1;i>=0&&i<u;i+=e)if(r[i]===o)return i;return-1}};
// Return the position of the first occurrence of an item in an array,
// or -1 if the item is not included in the array.
// If the array is large and already in sort order, pass `true`
// for **isSorted** to use binary search.
g.indexOf=M(1,g.findIndex,
// Use a comparator function to figure out the smallest index at which
// an object should be inserted so as to maintain order. Uses binary search.
g.sortedIndex=function(e,t,n,r){for(var o=(n=x(n,r,1))(t),i=0,a=_(e);i<a;){var u=Math.floor((i+a)/2);n(e[u])<o?i=u+1:a=u}return i}),g.lastIndexOf=M(-1,g.findLastIndex),
// Generate an integer Array containing an arithmetic progression. A port of
// the native Python `range()` function. See
// [the Python documentation](http://docs.python.org/library/functions.html#range).
g.range=function(e,t,n){null==t&&(t=e||0,e=0),n||(n=t<e?-1:1);for(var r=Math.max(Math.ceil((t-e)/n),0),o=Array(r),i=0;i<r;i++,e+=n)o[i]=e;return o},
// Chunk a single array into multiple arrays, each containing `count` or fewer
// items.
g.chunk=function(e,t){if(null==t||t<1)return[];for(var n=[],r=0,o=e.length;r<o;)n.push(c.call(e,r,r+=t));return n};
// Function (ahem) Functions
// ------------------
// Determines whether to execute a function as a constructor
// or a normal function with the provided arguments.
var D=function(e,t,n,r,o){if(!(r instanceof t))return e.apply(n,o);var i=C(e.prototype),a=e.apply(i,o);return g.isObject(a)?a:i};
// Create a function bound to a given object (assigning `this`, and arguments,
// optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
// available.
g.bind=w(function(e,t,n){if(!g.isFunction(e))throw new TypeError("Bind must be called on a function");var r=w(function(o){return D(e,r,t,this,n.concat(o))});return r}),(
// Partially apply a function by creating a version that has had some of its
// arguments pre-filled, without changing its dynamic `this` context. _ acts
// as a placeholder by default, allowing any combination of arguments to be
// pre-filled. Set `_.partial.placeholder` for a custom placeholder argument.
g.partial=w(function(e,t){var n=g.partial.placeholder;return function r(){for(var o=0,i=t.length,a=Array(i),u=0;u<i;u++)a[u]=t[u]===n?arguments[o++]:t[u];for(;o<arguments.length;)a.push(arguments[o++]);return D(e,r,this,this,a)}})).placeholder=g,
// Bind a number of an object's methods to that object. Remaining arguments
// are the method names to be bound. Useful for ensuring that all callbacks
// defined on an object belong to it.
g.bindAll=w(function(e,t){var n=(t=N(t,!1,!1)).length;if(n<1)throw new Error("bindAll must be passed function names");for(;n--;){var r=t[n];e[r]=g.bind(e[r],e)}}),
// Memoize an expensive function by storing its results.
g.memoize=function(e,t){var n=function n(r){var o=n.cache,i=""+(t?t.apply(this,arguments):r);return g.has(o,i)||(o[i]=e.apply(this,arguments)),o[i]};return n.cache={},n},
// Delays a function for the given number of milliseconds, and then calls
// it with the arguments supplied.
g.delay=w(function(e,t,n){return setTimeout(function(){return e.apply(null,n)},t)}),
// Defers a function, scheduling it to run after the current call stack has
// cleared.
g.defer=g.partial(g.delay,g,1),
// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.
g.throttle=function(e,t,n){var r,o,i,a,u=0;n||(n={});var s=function(){u=!1===n.leading?0:g.now(),r=null,a=e.apply(o,i),r||(o=i=null)},l=function(){var l=g.now();u||!1!==n.leading||(u=l);var c=t-(l-u);return o=this,i=arguments,c<=0||c>t?(r&&(clearTimeout(r),r=null),u=l,a=e.apply(o,i),r||(o=i=null)):r||!1===n.trailing||(r=setTimeout(s,c)),a};return l.cancel=function(){clearTimeout(r),u=0,r=o=i=null},l},
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
g.debounce=function(e,t,n){var r,o,i=function(t,n){r=null,n&&(o=e.apply(t,n))},a=w(function(a){if(r&&clearTimeout(r),n){var u=!r;r=setTimeout(i,t),u&&(o=e.apply(this,a))}else r=g.delay(i,t,this,a);return o});return a.cancel=function(){clearTimeout(r),r=null},a},
// Returns the first function passed as an argument to the second,
// allowing you to adjust arguments, run code before and after, and
// conditionally execute the original function.
g.wrap=function(e,t){return g.partial(t,e)},
// Returns a negated version of the passed-in predicate.
g.negate=function(e){return function(){return!e.apply(this,arguments)}},
// Returns a function that is the composition of a list of functions, each
// consuming the return value of the function that follows.
g.compose=function(){var e=arguments,t=e.length-1;return function(){for(var n=t,r=e[t].apply(this,arguments);n--;)r=e[n].call(this,r);return r}},
// Returns a function that will only be executed on and after the Nth call.
g.after=function(e,t){return function(){if(--e<1)return t.apply(this,arguments)}},
// Returns a function that will be executed at most one time, no matter how
// often you call it. Useful for lazy initialization.
g.once=g.partial(
// Returns a function that will only be executed up to (but not including) the Nth call.
g.before=function(e,t){var n;return function(){return--e>0&&(n=t.apply(this,arguments)),e<=1&&(t=null),n}},2),g.restArguments=w;
// Object Functions
// ----------------
// Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
var R=!{toString:null}.propertyIsEnumerable("toString"),L=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"],I=function(e,t){var n=L.length,r=e.constructor,o=g.isFunction(r)&&r.prototype||u,i="constructor";for(g.has(e,i)&&!g.contains(t,i)&&t.push(i);n--;)(i=L[n])in e&&e[i]!==o[i]&&!g.contains(t,i)&&t.push(i)};
// Retrieve the names of an object's own properties.
// Delegates to **ECMAScript 5**'s native `Object.keys`.
g.keys=function(e){if(!g.isObject(e))return[];if(v)return v(e);var t=[];for(var n in e)g.has(e,n)&&t.push(n);// Ahem, IE < 9.
return R&&I(e,t),t},
// Retrieve all the property names of an object.
g.allKeys=function(e){if(!g.isObject(e))return[];var t=[];for(var n in e)t.push(n);// Ahem, IE < 9.
return R&&I(e,t),t},
// Retrieve the values of an object's properties.
g.values=function(e){for(var t=g.keys(e),n=t.length,r=Array(n),o=0;o<n;o++)r[o]=e[t[o]];return r},
// Returns the results of applying the iteratee to each element of the object.
// In contrast to _.map it returns an object.
g.mapObject=function(e,t,n){t=x(t,n);for(var r=g.keys(e),o=r.length,i={},a=0;a<o;a++){var u=r[a];i[u]=t(e[u],u,e)}return i},
// Convert an object into a list of `[key, value]` pairs.
// The opposite of _.object.
g.pairs=function(e){for(var t=g.keys(e),n=t.length,r=Array(n),o=0;o<n;o++)r[o]=[t[o],e[t[o]]];return r},
// Invert the keys and values of an object. The values must be serializable.
g.invert=function(e){for(var t={},n=g.keys(e),r=0,o=n.length;r<o;r++)t[e[n[r]]]=n[r];return t},
// Return a sorted list of the function names available on the object.
// Aliased as `methods`.
g.functions=g.methods=function(e){var t=[];for(var n in e)g.isFunction(e[n])&&t.push(n);return t.sort()};
// An internal function for creating assigner functions.
var q=function(e,t){return function(n){var r=arguments.length;if(t&&(n=Object(n)),r<2||null==n)return n;for(var o=1;o<r;o++)for(var i=arguments[o],a=e(i),u=a.length,s=0;s<u;s++){var l=a[s];t&&void 0!==n[l]||(n[l]=i[l])}return n}};
// Extend a given object with all the properties in passed-in object(s).
g.extend=q(g.allKeys),
// Assigns a given object with all the own properties in the passed-in object(s).
// (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
g.extendOwn=g.assign=q(g.keys),
// Returns the first key on an object that passes a predicate test.
g.findKey=function(e,t,n){t=x(t,n);for(var r,o=g.keys(e),i=0,a=o.length;i<a;i++)if(t(e[r=o[i]],r,e))return r};
// Internal pick helper function to determine if `obj` has key `key`.
var B,H,F=function(e,t,n){return t in n};
// Return a copy of the object only containing the whitelisted properties.
g.pick=w(function(e,t){var n={},r=t[0];if(null==e)return n;g.isFunction(r)?(t.length>1&&(r=b(r,t[1])),t=g.allKeys(e)):(r=F,t=N(t,!1,!1),e=Object(e));for(var o=0,i=t.length;o<i;o++){var a=t[o],u=e[a];r(u,a,e)&&(n[a]=u)}return n}),
// Return a copy of the object without the blacklisted properties.
g.omit=w(function(e,t){var n,r=t[0];return g.isFunction(r)?(r=g.negate(r),t.length>1&&(n=t[1])):(t=g.map(N(t,!1,!1),String),r=function(e,n){return!g.contains(t,n)}),g.pick(e,r,n)}),
// Fill in a given object with default properties.
g.defaults=q(g.allKeys,!0),
// Creates an object that inherits from the given prototype object.
// If additional properties are provided then they will be added to the
// created object.
g.create=function(e,t){var n=C(e);return t&&g.extendOwn(n,t),n},
// Create a (shallow-cloned) duplicate of an object.
g.clone=function(e){return g.isObject(e)?g.isArray(e)?e.slice():g.extend({},e):e},
// Invokes interceptor with the obj, and then returns obj.
// The primary purpose of this method is to "tap into" a method chain, in
// order to perform operations on intermediate results within the chain.
g.tap=function(e,t){return t(e),e},
// Returns whether an object has a given set of `key:value` pairs.
g.isMatch=function(e,t){var n=g.keys(t),r=n.length;if(null==e)return!r;for(var o=Object(e),i=0;i<r;i++){var a=n[i];if(t[a]!==o[a]||!(a in o))return!1}return!0},B=function(e,t,n,o){
// Identical objects are equal. `0 === -0`, but they aren't identical.
// See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
if(e===t)return 0!==e||1/e==1/t;
// `null` or `undefined` only equal to itself (strict comparison).
if(null==e||null==t)return!1;
// `NaN`s are equivalent, but non-reflexive.
if(e!=e)return t!=t;
// Exhaust primitive checks
var i=void 0===e?"undefined":r(e);return("function"===i||"object"===i||"object"==(void 0===t?"undefined":r(t)))&&H(e,t,n,o)},
// Internal recursive comparison function for `isEqual`.
H=function(e,t,n,o){
// Unwrap any wrapped objects.
e instanceof g&&(e=e._wrapped),t instanceof g&&(t=t._wrapped);
// Compare `[[Class]]` names.
var i=f.call(e);if(i!==f.call(t))return!1;switch(i){
// Strings, numbers, regular expressions, dates, and booleans are compared by value.
case"[object RegExp]":
// RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
case"[object String]":
// Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
// equivalent to `new String("5")`.
return""+e==""+t;case"[object Number]":
// `NaN`s are equivalent, but non-reflexive.
// Object(NaN) is equivalent to NaN.
return+e!=+e?+t!=+t:0==+e?1/+e==1/t:+e==+t;
// An `egal` comparison is performed for other numeric values.
case"[object Date]":case"[object Boolean]":
// Coerce dates and booleans to numeric primitive values. Dates are compared by their
// millisecond representations. Note that invalid dates with millisecond representations
// of `NaN` are not equivalent.
return+e==+t;case"[object Symbol]":return s.valueOf.call(e)===s.valueOf.call(t)}var a="[object Array]"===i;if(!a){if("object"!=(void 0===e?"undefined":r(e))||"object"!=(void 0===t?"undefined":r(t)))return!1;
// Objects with different constructors are not equivalent, but `Object`s or `Array`s
// from different frames are.
var u=e.constructor,l=t.constructor;if(u!==l&&!(g.isFunction(u)&&u instanceof u&&g.isFunction(l)&&l instanceof l)&&"constructor"in e&&"constructor"in t)return!1}
// Assume equality for cyclic structures. The algorithm for detecting cyclic
// structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
// Initializing stack of traversed objects.
// It's done here since we only need them for objects and arrays comparison.
n=n||[],o=o||[];for(var c=n.length;c--;)
// Linear search. Performance is inversely proportional to the number of
// unique nested structures.
if(n[c]===e)return o[c]===t;
// Add the first object to the stack of traversed objects.
// Recursively compare objects and arrays.
if(n.push(e),o.push(t),a){if((
// Compare array lengths to determine if a deep comparison is necessary.
c=e.length)!==t.length)return!1;
// Deep compare the contents, ignoring non-numeric properties.
for(;c--;)if(!B(e[c],t[c],n,o))return!1}else{
// Deep compare objects.
var d,p=g.keys(e);
// Ensure that both objects contain the same number of properties before comparing deep equality.
if(c=p.length,g.keys(t).length!==c)return!1;for(;c--;)if(
// Deep compare each member
d=p[c],!g.has(t,d)||!B(e[d],t[d],n,o))return!1}
// Remove the first object from the stack of traversed objects.
return n.pop(),o.pop(),!0},
// Perform a deep comparison to check if two objects are equal.
g.isEqual=function(e,t){return B(e,t)},
// Is a given array, string, or object empty?
// An "empty" object has no enumerable own-properties.
g.isEmpty=function(e){return null==e||(k(e)&&(g.isArray(e)||g.isString(e)||g.isArguments(e))?0===e.length:0===g.keys(e).length)},
// Is a given value a DOM element?
g.isElement=function(e){return!(!e||1!==e.nodeType)},
// Is a given value an array?
// Delegates to ECMA5's native Array.isArray
g.isArray=p||function(e){return"[object Array]"===f.call(e)},
// Is a given variable an object?
g.isObject=function(e){var t=void 0===e?"undefined":r(e);return"function"===t||"object"===t&&!!e},
// Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError, isMap, isWeakMap, isSet, isWeakSet.
g.each(["Arguments","Function","String","Number","Date","RegExp","Error","Symbol","Map","WeakMap","Set","WeakSet"],function(e){g["is"+e]=function(t){return f.call(t)==="[object "+e+"]"}}),
// Define a fallback version of the method in browsers (ahem, IE < 9), where
// there isn't any inspectable "Arguments" type.
g.isArguments(arguments)||(g.isArguments=function(e){return g.has(e,"callee")});
// Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
// IE 11 (#1621), Safari 8 (#1929), and PhantomJS (#2236).
var W=o.document&&o.document.childNodes;"function"!=typeof/./&&"object"!=("undefined"==typeof Int8Array?"undefined":r(Int8Array))&&"function"!=typeof W&&(g.isFunction=function(e){return"function"==typeof e||!1}),
// Is a given object a finite number?
g.isFinite=function(e){return!g.isSymbol(e)&&isFinite(e)&&!isNaN(parseFloat(e))},
// Is the given value `NaN`?
g.isNaN=function(e){return g.isNumber(e)&&isNaN(e)},
// Is a given value a boolean?
g.isBoolean=function(e){return!0===e||!1===e||"[object Boolean]"===f.call(e)},
// Is a given value equal to null?
g.isNull=function(e){return null===e},
// Is a given variable undefined?
g.isUndefined=function(e){return void 0===e},
// Shortcut function for checking if an object has a given property directly
// on itself (in other words, not on a prototype).
g.has=function(e,t){if(!g.isArray(t))return null!=e&&d.call(e,t);for(var n=t.length,r=0;r<n;r++){var o=t[r];if(null==e||!d.call(e,o))return!1;e=e[o]}return!!n},
// Utility Functions
// -----------------
// Run Underscore.js in *noConflict* mode, returning the `_` variable to its
// previous owner. Returns a reference to the Underscore object.
g.noConflict=function(){return o._=i,this},
// Keep the identity function around for default iteratees.
g.identity=function(e){return e},
// Predicate-generating functions. Often useful outside of Underscore.
g.constant=function(e){return function(){return e}},g.noop=function(){},
// Creates a function that, when passed an object, will traverse that object’s
// properties down the given `path`, specified as an array of keys or indexes.
g.property=function(e){return g.isArray(e)?function(t){return P(t,e)}:E(e)},
// Generates a function for a given object that returns a given property.
g.propertyOf=function(e){return null==e?function(){}:function(t){return g.isArray(t)?P(e,t):e[t]}},
// Returns a predicate for checking whether an object has a given set of
// `key:value` pairs.
g.matcher=g.matches=function(e){return e=g.extendOwn({},e),function(t){return g.isMatch(t,e)}},
// Run a function **n** times.
g.times=function(e,t,n){var r=Array(Math.max(0,e));t=b(t,n,1);for(var o=0;o<e;o++)r[o]=t(o);return r},
// Return a random integer between min and max (inclusive).
g.random=function(e,t){return null==t&&(t=e,e=0),e+Math.floor(Math.random()*(t-e+1))},
// A (possibly faster) way to get the current timestamp as an integer.
g.now=Date.now||function(){return(new Date).getTime()};
// List of HTML entities for escaping.
var U={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},$=g.invert(U),Y=function(e){var t=function(t){return e[t]},n="(?:"+g.keys(e).join("|")+")",r=RegExp(n),o=RegExp(n,"g");
// Regexes for identifying a key that needs to be escaped.
return function(e){return e=null==e?"":""+e,r.test(e)?e.replace(o,t):e}};g.escape=Y(U),g.unescape=Y($),
// Traverses the children of `obj` along `path`. If a child is a function, it
// is invoked with its parent as context. Returns the value of the final
// child, or `fallback` if any child is undefined.
g.result=function(e,t,n){g.isArray(t)||(t=[t]);var r=t.length;if(!r)return g.isFunction(n)?n.call(e):n;for(var o=0;o<r;o++){var i=null==e?void 0:e[t[o]];void 0===i&&(i=n,o=r),e=g.isFunction(i)?i.call(e):i}return e};
// Generate a unique integer id (unique within the entire client session).
// Useful for temporary DOM ids.
var V=0;g.uniqueId=function(e){var t=++V+"";return e?e+t:t},
// By default, Underscore uses ERB-style template delimiters, change the
// following template settings to use alternative delimiters.
g.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};
// When customizing `templateSettings`, if you don't want to define an
// interpolation, evaluation or escaping regex, we need one that is
// guaranteed not to match.
var z=/(.)^/,Q={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},G=/\\|'|\r|\n|\u2028|\u2029/g,X=function(e){return"\\"+Q[e]};
// Certain characters need to be escaped so that they can be put into a
// string literal.
// JavaScript micro-templating, similar to John Resig's implementation.
// Underscore templating handles arbitrary delimiters, preserves whitespace,
// and correctly escapes quotes within interpolated code.
// NB: `oldSettings` only exists for backwards compatibility.
g.template=function(e,t,n){!t&&n&&(t=n),t=g.defaults({},t,g.templateSettings);
// Combine delimiters into one regular expression via alternation.
var r,o=RegExp([(t.escape||z).source,(t.interpolate||z).source,(t.evaluate||z).source].join("|")+"|$","g"),i=0,a="__p+='";
// Compile the template source, escaping string literals appropriately.
e.replace(o,function(t,n,r,o,u){
// Adobe VMs need the match returned to produce the correct offset.
return a+=e.slice(i,u).replace(G,X),i=u+t.length,n?a+="'+\n((__t=("+n+"))==null?'':_.escape(__t))+\n'":r?a+="'+\n((__t=("+r+"))==null?'':__t)+\n'":o&&(a+="';\n"+o+"\n__p+='"),t}),a+="';\n",
// If a variable is not specified, place data values in local scope.
t.variable||(a="with(obj||{}){\n"+a+"}\n"),a="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+a+"return __p;\n";try{r=new Function(t.variable||"obj","_",a)}catch(e){throw e.source=a,e}var u=function(e){return r.call(this,e,g)},s=t.variable||"obj";
// Provide the compiled source as a convenience for precompilation.
return u.source="function("+s+"){\n"+a+"}",u},
// Add a "chain" function. Start chaining a wrapped Underscore object.
g.chain=function(e){var t=g(e);return t._chain=!0,t};
// OOP
// ---------------
// If Underscore is called as a function, it returns a wrapped object that
// can be used OO-style. This wrapper holds altered versions of all the
// underscore functions. Wrapped objects may be chained.
// Helper function to continue chaining intermediate results.
var K=function(e,t){return e._chain?g(t).chain():t};
// Add your own custom functions to the Underscore object.
g.mixin=function(e){return g.each(g.functions(e),function(t){var n=g[t]=e[t];g.prototype[t]=function(){var e=[this._wrapped];return l.apply(e,arguments),K(this,n.apply(g,e))}}),g},
// Add all of the Underscore functions to the wrapper object.
g.mixin(g),
// Add all mutator Array functions to the wrapper.
g.each(["pop","push","reverse","shift","sort","splice","unshift"],function(e){var t=a[e];g.prototype[e]=function(){var n=this._wrapped;return t.apply(n,arguments),"shift"!==e&&"splice"!==e||0!==n.length||delete n[0],K(this,n)}}),
// Add all accessor Array functions to the wrapper.
g.each(["concat","join","slice"],function(e){var t=a[e];g.prototype[e]=function(){return K(this,t.apply(this._wrapped,arguments))}}),
// Extracts the result from a wrapped and chained object.
g.prototype.value=function(){return this._wrapped},
// Provide unwrapping proxy for some methods used in engine operations
// such as arithmetic and JSON stringification.
g.prototype.valueOf=g.prototype.toJSON=g.prototype.value,g.prototype.toString=function(){return String(this._wrapped)},t.default=g}).call(this,n(14),n(7)(e))
/***/},
/* 2 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.isDash=t.isWebRTC=t.isRtmp=void 0;var r=n(3);t.isRtmp=function(e,t){return 0==e.indexOf("rtmp:")||"rtmp"==t},t.isWebRTC=function(e,t){return 0===e.indexOf("ws:")||0===e.indexOf("wss:")||"webrtc"===t},t.isDash=function(e,t){return"mpd"===t||"dash"===t||"application/dash+xml"===t||"mpd"==(0,r.extractExtension)(e)}},
/* 3 */
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
/***/;!function(e){e&&e.__esModule}(n(1));t.extractExtension=function(e){if(!e||"rtmp"==e.substr(0,4))return"";var t=function(e){var t="";return/[(,]format=mpd-/i.test(e)?t="mpd":/[(,]format=m3u8-/i.test(e)&&(t="m3u8"),t}(e);return t||((e=e.split("?")[0].split("#")[0]).lastIndexOf(".")>-1?e.substr(e.lastIndexOf(".")+1,e.length).toLowerCase():"")}},
/* 4 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=(window.setTimeout,window.setImmediate);
//      Promise Polyfill
//      https://github.com/taylorhakes/promise-polyfill
//      Copyright (c) 2014 Taylor Hakes
//      Copyright (c) 2014 Forbes Lindesay
//      taylorhakes/promise-polyfill is licensed under the MIT License
function i(){}
// Polyfill for Function.prototype.bind
var a=function(e){if(!(this instanceof d))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],f(e,this)},u=function(e,t){for(;3===e._state;)e=e._value;0!==e._state?(e._handled=!0,d._immediateFn(function(){var n=1===e._state?t.onFulfilled:t.onRejected;if(null!==n){var r;try{r=n(e._value)}catch(e){return void l(t.promise,e)}s(t.promise,r)}else(1===e._state?s:l)(t.promise,e._value)})):e._deferreds.push(t)},s=function(e,t){try{
// Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"===(void 0===t?"undefined":r(t))||"function"==typeof t)){var n=t.then;if(t instanceof d)return e._state=3,e._value=t,void c(e);if("function"==typeof n)return void f(function(e,t){return function(){e.apply(t,arguments)}}(n,t),e)}e._state=1,e._value=t,c(e)}catch(t){l(e,t)}},l=function(e,t){e._state=2,e._value=t,c(e)},c=function(e){2===e._state&&0===e._deferreds.length&&d._immediateFn(function(){e._handled||d._unhandledRejectionFn(e._value)});for(var t=0,n=e._deferreds.length;t<n;t++)u(e,e._deferreds[t]);e._deferreds=null},f=function(e,t){var n=!1;try{e(function(e){n||(n=!0,s(t,e))},function(e){n||(n=!0,l(t,e))})}catch(e){if(n)return;n=!0,l(t,e)}};a.prototype.catch=function(e){return this.then(null,e)},a.prototype.then=function(e,t){var n=new this.constructor(i);return u(this,new function(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}(e,t,n)),n},a.prototype.finally=function(e){var t=this.constructor;return this.then(function(n){return t.resolve(e()).then(function(){return n})},function(n){return t.resolve(e()).then(function(){return t.reject(n)})})},a.all=function(e){return new d(function(t,n){if(!e||void 0===e.length)throw new TypeError("Promise.all accepts an array");var o=Array.prototype.slice.call(e);if(0===o.length)return t([]);var i=o.length;function a(e,u){try{if(u&&("object"===(void 0===u?"undefined":r(u))||"function"==typeof u)){var s=u.then;if("function"==typeof s)return void s.call(u,function(t){a(e,t)},n)}o[e]=u,0==--i&&t(o)}catch(e){n(e)}}for(var u=0;u<o.length;u++)a(u,o[u])})},a.resolve=function(e){return e&&"object"===(void 0===e?"undefined":r(e))&&e.constructor===d?e:new d(function(t){t(e)})},a.reject=function(e){return new d(function(t,n){n(e)})},a.race=function(e){return new d(function(t,n){for(var r=0,o=e.length;r<o;r++)e[r].then(t,n)})},
// Use polyfill for setImmediate for performance gains
a._immediateFn="function"==typeof o&&function(e){o(e)}||function(e){o(e,0)},a._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)};var d=window.Promise||(window.Promise=a);t.resolved=d.resolve();t.default=d},
/* 5 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(2);
/**
 * @brief   This finds the provider that matches the input source.
 * @param
 * */t.default=function(){var e={};OvenPlayerConsole.log("SupportChecker loaded.");var t=[{name:"html5",checkSupport:function(e){var t=document.createElement("video");if(!t.canPlayType)return!1;var n=e.file,o=e.type;if(!o)return!1;var i=e.mimeType||{aac:"audio/mp4",mp4:"video/mp4",f4v:"video/mp4",m4v:"video/mp4",mov:"video/mp4",mp3:"audio/mpeg",mpeg:"audio/mpeg",ogv:"video/ogg",ogg:"video/ogg",oga:"video/ogg",vorbis:"video/ogg",webm:"video/webm",f4a:"video/aac",m3u8:"application/vnd.apple.mpegurl",m3u:"application/vnd.apple.mpegurl",hls:"application/vnd.apple.mpegurl"}[o];return!((0,r.isRtmp)(n,o)||(0,r.isWebRTC)(n,o)||!i||!t.canPlayType(i))}},{name:"webrtc",checkSupport:function(e){if(!document.createElement("video").canPlayType)return!1;var t=e.file,n=e.type;return!!(0,r.isWebRTC)(t,n)}},{name:"dash",checkSupport:function(e){var t=e.file,n=e.type;
//mpd application/dash+xml
return!!(0,r.isDash)(t,n)}},{name:"hls",checkSupport:function(e){var t=document.createElement("video");
//this method from hls.js
//Remove this '!!video.canPlayType('application/vnd.apple.mpegurl')' if you want to use hlsjs.
return function(){var e=function(){if("undefined"!=typeof window)return window.MediaSource||window.WebKitMediaSource}(),t=window.SourceBuffer||window.WebKitSourceBuffer,n=e&&"function"==typeof e.isTypeSupported&&e.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"'),r=!t||t.prototype&&"function"==typeof t.prototype.appendBuffer&&"function"==typeof t.prototype.remove;return!!n&&!!r}()&&!!t.canPlayType("application/vnd.apple.mpegurl")}}];return e.findProviderNameBySource=function(e){OvenPlayerConsole.log("SupportChecker : findProviderNameBySource()",e);for(var n=e===Object(e)?e:{},r=0;r<t.length;r++)if(t[r].checkSupport(n))return t[r].name},e.findProviderNamesByPlaylist=function(t){OvenPlayerConsole.log("SupportChecker : findProviderNamesByPlaylist()",t);for(var n=[],r=t.length;r--;)for(var o=t[r],i="",a=0;a<o.sources.length;a++)if(i=o.sources[a]){var u=e.findProviderNameBySource(i);u&&n.push(u)}return n},e}},
/* 6 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});
/**
 * utils for webpack
 */
t.getScriptPath=function(e){for(var t=document.getElementsByTagName("script"),n=0;n<t.length;n++){var r=t[n].src;if(r){var o=r.lastIndexOf("/"+e);if(o>=0)return r.substr(0,o+1)}}return""};
/***/},
/* 7 */
/***/function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],
// module.parent = undefined by default
e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e};
/***/},
/* 8 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});
// STATE
t.STATE_BUFFERING="buffering",t.STATE_IDLE="idle";var r=t.STATE_COMPLETE="complete";t.STATE_PAUSED="paused",t.STATE_PLAYING="playing",t.STATE_ERROR="error",t.STATE_LOADING="loading",t.STATE_STALLED="stalled",t.PROVIDER_HTML5="html5",t.PROVIDER_WEBRTC="webrtc",t.PROVIDER_DASH="dash",t.PROVIDER_HLS="hls",t.CONTENT_COMPLETE=r,t.READY="ready",t.DESTROY="destroy",t.CONTENT_SEEK="seek",t.CONTENT_BUFFER_FULL="bufferFull",t.DISPLAY_CLICK="displayClick",t.CONTENT_LOADED="loaded",t.CONTENT_SEEKED="seeked",t.ERROR="error",t.PLAYER_STATE="stateChanged",t.PLAYER_COMPLETE=r,t.PLAYER_PAUSE="pause",t.PLAYER_PLAY="play",t.CONTENT_BUFFER="bufferChanged",t.CONTENT_TIME="time",t.CONTENT_RATE_CHANGE="ratechange",t.CONTENT_VOLUME="volumeChanged",t.CONTENT_MUTE="mute",t.CONTENT_META="metaChanged",t.CONTENT_LEVELS="qualityLevelChanged",t.CONTENT_LEVEL_CHANGED="currentQualityLevelChanged",t.PLAYBACK_RATE_CHANGED="playbackRateChanged",t.CONTENT_CAPTION_CUE_CHANGED="cueChanged",t.CONTENT_CAPTION_CHANGED="captionChanged",t.INIT_ERROR=100,t.PLAYER_UNKNWON_ERROR=300,t.PLAYER_UNKNWON_OPERATION_ERROR=301,t.PLAYER_UNKNWON_NEWWORK_ERROR=302,t.PLAYER_UNKNWON_DECODE_ERROR=303,t.PLAYER_FILE_ERROR=304,t.PLAYER_CAPTION_ERROR=305,t.PLAYER_WEBRTC_WS_ERROR=501,t.PLAYER_WEBRTC_WS_CLOSED=502,t.PLAYER_WEBRTC_ADD_ICECANDIDATE_ERROR=503,t.PLAYER_WEBRTC_SET_REMOTE_DESC_ERROR=504,t.PLAYER_WEBRTC_CREATE_ANSWER_ERROR=505,t.PLAYER_WEBRTC_SET_LOCAL_DESC_ERROR=506},
/* 9 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){var t=e,n=[],r=function(e,t,n){var r=0,o=e.length;for(r=0;r<o;r++){var i=e[r];i.listener.apply(i.context||n,t)}};return t.on=function(e,r,o){return(n[e]||(n[e]=[])).push({listener:r,context:o}),t},t.trigger=function(e){if(!n)return!1;var o=[].slice.call(arguments,1),i=n[e],a=n.all;i&&r(i,o,t),a&&r(a,arguments,t)},t.off=function(e,r,o){if(!n)return!1;if(!e&&!r&&!o)return n=[],t;for(var i=e?[e]:Object.keys(n),a=0,u=i.length;a<u;a++){e=i[a];var s=n[e];if(s){var l=n[e]=[];if(r||o)for(var c=0,f=s.length;c<f;c++){var d=s[c];(r&&r!==d.listener&&r!==d.listener.listener&&r!==d.listener._callback||o&&o!==d.context)&&l.push(d)}l.length||delete n[e]}}return t},t.once=function(e,n,r){var o=0,i=function r(){o++||(t.off(e,r),n.apply(t,arguments))};return i._listener=n,t.on(e,i,r)},t}},
/* 10 */
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/,
/* 14 */
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
/* 15 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});
/**
 * Created by hoho on 2018. 6. 29..
 */
t.version="0.6.2-rev.9bcdd8d";
/***/},
/* 16 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i(n(5)),o=i(n(4));function i(e){return e&&e.__esModule?e:{default:e}}
/**
 * @brief   This manages provider.
 * @param
 * */t.default=function(){var e=(0,r.default)(),t={},i={};OvenPlayerConsole.log("ProviderController loaded.");var a=function(e,n){t[e]||(OvenPlayerConsole.log("ProviderController _registerProvider() ",e),t[e]=n)},u={html5:function(){return n.e(/* require.ensure | ovenplayer.provider.html5 */2).then(function(e){var t=n(13).default;return a("html5",t),t}.bind(null,n)).catch(function(e){throw new Error("Network error")})},webrtc:function(){return n.e(/* require.ensure | ovenplayer.provider.HlsProvider */1).then(function(e){var t=n(12).default;return a("webrtc",t),t}.bind(null,n)).catch(function(e){throw new Error("Network error")})},dash:function(){return n.e(/* require.ensure | ovenplayer.provider.DashProvider */0).then(function(e){var r=n(11).default;return t.dash=r,a("dash",r),r}.bind(null,n)).catch(function(e){throw new Error("Network error")})},hls:function(){return n.e(/* require.ensure | ovenplayer.provider.HlsProvider */1).then(function(e){var t=n(10).default;return a("hls",t),t}.bind(null,n)).catch(function(e){throw new Error("Network error")})}};return i.loadProviders=function(t){var n=e.findProviderNamesByPlaylist(t);return OvenPlayerConsole.log("ProviderController loadProviders() ",n),o.default.all(n.filter(function(e){return!!u[e]}).map(function(e){return u[e]()}))},i.findByName=function(e){return OvenPlayerConsole.log("ProviderController findByName() ",e),t[e]},i.getProviderBySource=function(t){var n=e.findProviderNameBySource(t);return OvenPlayerConsole.log("ProviderController getProviderBySource() ",n),i.findByName(n)},i.isSameProvider=function(t,n){return OvenPlayerConsole.log("ProviderController isSameProvider() ",e.findProviderNameBySource(t),e.findProviderNameBySource(n)),e.findProviderNameBySource(t)==e.findProviderNameBySource(n)},i}},
/* 17 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=s(n(1)),i=n(2),a=n(3),u=s(n(5));function s(e){return e&&e.__esModule?e:{default:e}}
/**
 * @brief   This manages Playlist or Sources.
 * @param
 *
 * */t.default=function(){var e={},t=[],n=(0,u.default)();OvenPlayerConsole.log("PlaylistManager loaded.");var s=function(e){if(e&&(e.file||e.host||e.application||e.stream)){var t=r({},{default:!1},e);t.file=(0,a.trim)(""+t.file),t.host&&t.application&&t.stream&&(t.file=t.host+"/"+t.application+"/stream/"+t.stream,delete t.host,delete t.application,delete t.stream);var n=/^[^/]+\/(?:x-)?([^/]+)$/;if(n.test(t.type)&&(
// if type is given as a mimetype
t.mimeType=t.type,t.type=t.type.replace(n,"$1")),(0,i.isRtmp)(t.file)?t.type="rtmp":(0,i.isWebRTC)(t.file)?t.type="webrtc":(0,i.isDash)(t.file,t.type)?t.type="dash":t.type||(t.type=(0,a.extractExtension)(t.file)),t.type){
// normalize types
switch(t.type){case"m3u8":case"vnd.apple.mpegurl":t.type="hls";break;case"m4a":t.type="aac";break;case"smil":t.type="rtmp"}return Object.keys(t).forEach(function(e){""===t[e]&&delete t[e]}),t}}};return e.setPlaylist=function(e){OvenPlayerConsole.log("PlaylistManager setPlaylist() ",e);var i=(o.default.isArray(e)?e:[e]).map(function(e){o.default.isArray(e.tracks)||delete e.tracks;var t=r({},{sources:[],tracks:[]},e);t.sources!==Object(t.sources)||o.default.isArray(t.sources)||(t.sources=[s(t.sources)]),o.default.isArray(t.sources)&&0!==t.sources.length||(e.levels?t.sources=e.levels:t.sources=[s(e)]);for(var i=0;i<t.sources.length;i++){var a,u=t.sources[i];if(u){var l=u.default;u.default=!!l&&"true"===l.toString(),
// If the source doesn't have a label, number it
t.sources[i].label||(t.sources[i].label=i.toString()),a=s(t.sources[i]),n.findProviderNameBySource(a)?t.sources[i]=a:t.sources[i]=null}}return t.sources=t.sources.filter(function(e){return!!e}),
// default 가 없을때 webrtc가 있다면 webrtc default : true로 자동 설정
/*let haveDefault = _.find(playlistItem.sources, function(source){return source.default == true;});
            let webrtcSource = [];
            if(!haveDefault){
                webrtcSource = _.find(playlistItem.sources, function(source){return source.type == "webrtc";});
                if(webrtcSource){
                    webrtcSource.default = true;
                }
            }*/
o.default.isArray(t.tracks)||(t.tracks=[]),o.default.isArray(t.captions)&&(t.tracks=t.tracks.concat(t.captions),delete t.captions),t.tracks=t.tracks.map(function(e){return!(!e||!e.file)&&r({},{kind:"captions",default:!1},e)}).filter(function(e){return!!e}),t});return t=i,i},e.getPlaylist=function(){return OvenPlayerConsole.log("PlaylistManager getPlaylist() ",t),t},e.getCurrentSources=function(){
//We do not support "PLAYLIST" not yet. So this returns playlist of 0.
return OvenPlayerConsole.log("PlaylistManager getCurrentSources() ",t[0].sources),t[0].sources},e}},
/* 18 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){var t={},n="";OvenPlayerConsole.log("MediaManager loaded.");var r=function(){return(n=document.createElement("video")).setAttribute("disableRemotePlayback",""),n.setAttribute("webkit-playsinline",""),n.setAttribute("playsinline",""),e.appendChild(n),n};return t.createElement=function(){return OvenPlayerConsole.log("MediaManager createElement()"),n?(e.removeChild(n),r()):r()},t}},
/* 19 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(){var e={},t=null;return window.OvenPlayerConsole={log:window.console.log},e.enable=function(){null!=t&&(OvenPlayerConsole.log=t)},e.disable=function(){t=console.log,OvenPlayerConsole.log=function(){}},e.destroy=function(){window.OvenPlayerConsole=null},e}},
/* 20 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){return e&&e.__esModule?e:{default:e}}
/**
 * @brief   This executes the input commands at a specific point in time.
 * @param   instance
 * @param   queuedCommands
 * */(n(1));t.default=function(e,t){var n=[],o={},i=!1,a={};OvenPlayerConsole.log("LazyCommandExecutor loaded."),t.forEach(function(t){var n=e[t];o[t]=n||function(){},e[t]=function(){var e=Array.prototype.slice.call(arguments,0);i?(u(),n&&n.apply(a,e)):
//commandQueue.push({ command, args });
a.addQueue(t,e)}});var u=function(){for(;n.length>0;){var t=n.shift(),r=t.command,i=t.args;(o[r]||e[r]).apply(e,i)}};return a.setExecuteMode=function(e){i=e,OvenPlayerConsole.log("LazyCommandExecutor : setExecuteMode()",e)},a.getUndecoratedMethods=function(){return OvenPlayerConsole.log("LazyCommandExecutor : getUndecoratedMethods()",o),o},a.getQueue=function(){return OvenPlayerConsole.log("LazyCommandExecutor : getQueue()",getQueue),n},a.addQueue=function(e,t){OvenPlayerConsole.log("LazyCommandExecutor : addQueue()",e,t),n.push({command:e,args:t})},a.flush=function(){OvenPlayerConsole.log("LazyCommandExecutor : flush()"),u()},a.empty=function(){OvenPlayerConsole.log("LazyCommandExecutor : empty()"),n.length=0},a.off=function(){OvenPlayerConsole.log("LazyCommandExecutor : off()"),t.forEach(function(t){var n=o[t];n&&(e[t]=n,delete o[t])})},
//Run once at the end
a.removeAndExcuteOnce=function(t){var i=r.default.findWhere(n,{command:t});OvenPlayerConsole.log("LazyCommandExecutor : removeAndExcuteOnce()",t),n.splice(r.default.findIndex(n,{command:t}),1);var a=o[t];a&&(OvenPlayerConsole.log("removeCommand()"),i&&(a||e[t]).apply(e,i.args),e[t]=a,delete o[t])},a.destroy=function(){OvenPlayerConsole.log("LazyCommandExecutor : destroy()"),a.off(),a.empty()},a}},
/* 21 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(e){return e&&e.__esModule?e:{default:e}}
/**
 * @brief   This initializes the input options.
 * @param   options
 *
 * */(n(1));t.default=function(e){OvenPlayerConsole.log("Configurator loaded.",e);var t=function(e){var t=function(e){return e.slice&&"px"===e.slice(-2)&&(e=e.slice(0,-2)),e};!function(e){Object.keys(e).forEach(function(t){"id"!==t&&(e[t]=function(e){if(void 0===e)return null;if("string"==typeof e&&e.length<6){var t=e.toLowerCase();if("true"===t)return!0;if("false"===t)return!1;if(!isNaN(Number(e))&&!isNaN(parseFloat(e)))return Number(e)}return e}(e[t]))})}(e);var n=r({},{defaultPlaybackRate:1,playbackRateControls:!1,playbackRates:[.5,1,1.25,1.5,2],mute:!1,volume:90,width:640,height:360},e);n.width=t(n.width),n.height=t(n.height),n.aspectratio=function(e,t){if(-1===t.toString().indexOf("%"))return 0;if("string"!=typeof e||!e)return 0;if(/^\d*\.?\d+%$/.test(e))return e;var n=e.indexOf(":");if(-1===n)return 0;var r=parseFloat(e.substr(0,n)),o=parseFloat(e.substr(n+1));return r<=0||o<=0?0:o/r*100+"%"}(n.aspectratio,n.width);var i=n.playbackRateControls;if(i){var a=n.playbackRates;Array.isArray(i)&&(a=i),(a=a.filter(function(e){return o.default.isNumber(e)&&e>=.25&&e<=4}).map(function(e){return Math.round(4*e)/4})).indexOf(1)<0&&a.push(1),a.sort(),n.playbackRateControls=!0,n.playbackRates=a}(!n.playbackRateControls||n.playbackRates.indexOf(n.defaultPlaybackRate)<0)&&(n.defaultPlaybackRate=1),n.playbackRate=n.defaultPlaybackRate,n.aspectratio||delete n.aspectratio;var u=n.playlist;if(u)o.default.isArray(u.playlist)&&(n.feedData=u,n.playlist=u.playlist);else{var s=o.default.pick(n,["title","description","type","mediaid","image","file","sources","tracks","preload","duration","host","application","stream"]);n.playlist=[s]}return delete n.duration,n}(e),n=t.aspectratio||"16:9",i=t.debug,a=t.defaultPlaybackRate||1,u=(t.image,t.playbackRateControls||!0),s=t.playbackRates||[.5,1,1.25,1.5,2],l=t.playlist||[],c=t.qualityLabel||"",f=t.repeat||!1,d=t.stretching||"uniform",p={getConfig:function(){return t},getAspectratio:function(){return n},setAspectratio:function(e){n=e},isDebug:function(){return i},getDefaultPlaybackRate:function(){return a},setDefaultPlaybackRate:function(e){return a=e,e},getQualityLabel:function(){return c},setQualityLabel:function(e){c=e},getPlaybackRates:function(){return s},isPlaybackRateControls:function(){return u},getPlaylist:function(){return l},setPlaylist:function(e){return l=o.default.isArray(e)?e:[e]},isRepeat:function(){return f},getStretching:function(){return d}};return p}},
/* 22 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=d(n(21)),o=d(n(9)),i=d(n(20)),a=d(n(19)),u=d(n(18)),s=d(n(17)),l=d(n(16)),c=(d(n(4)),n(8)),f=n(15);function d(e){return e&&e.__esModule?e:{default:e}}
/**
 * @brief   This object connects UI to the provider.
 * @param   {object}    container  dom element
 *
 * */
//import CaptionManager from "api/caption/Manager";
t.default=function(e){var t=(0,a.default)(),n={};(0,o.default)(n),OvenPlayerConsole.log("[[OvenPlayer]] v."+f.version),OvenPlayerConsole.log("API loaded.");
//let captionManager = CaptionManager(that);
var d=(0,u.default)(e),p=(0,s.default)(),v=(0,l.default)(),h="",y="",g="",m=function(e){return v.loadProviders(p.getPlaylist()).then(function(e){h&&(h.destroy(),h=null);var t=d.createElement(),r=function(e){var t=0;if(e)for(var n=0;n<e.length;n++)if(e[n].default&&(t=n),y.getQualityLabel()&&e[n].label===y.getQualityLabel())return n;return t}(p.getCurrentSources());OvenPlayerConsole.log("current source index : "+r),
//This passes the event created by the Provider to API.
(h=e[r](t,y)).on("all",function(e,t){n.trigger(e,t)})}).then(function(){h.preload(p.getCurrentSources(),e),g.flush(),
//This is no reason to exist anymore.
g.destroy(),n.trigger(c.READY)}).catch(function(e){var t={code:c.INIT_ERROR,reason:"init error.",message:"Player init error.",error:e};n.trigger(c.ERROR,t),
/*
                init()시 src가 없이 초기화 하는 경우. (src 없이 초기화 하는게 모순이라 생각이 들지만)
                playerInstance.create("elId", {});
                playerInstance.load(src);
                를 대응하기 위해 src없어 프로바이드 로드 못해 initError 발생하는 경우 load는 한번 실행할 수 있게 해주즈아
            */
g.removeAndExcuteOnce("load")})};
/**
     * API 초기화 함수
     * init
     * @param      {object} options player initial option value.
     * @returns
     **/
return n.init=function(e){
//It collects the commands and executes them at the time when they are executable.
g=(0,i.default)(n,["load","play","pause","seek","stop","getDuration","getPosition","getVolume","getMute","getBuffer","getState"]),(y=(0,r.default)(e)).isDebug()||t.disable(),OvenPlayerConsole.log("API : init()"),OvenPlayerConsole.log("API : init() config : ",y),p.setPlaylist(y.getPlaylist()),OvenPlayerConsole.log("API : init() sources : ",p.getCurrentSources()),m()},n.getConfig=function(){return OvenPlayerConsole.log("API : getConfig()",y.getConfig()),y.getConfig()},n.getDuration=function(){return OvenPlayerConsole.log("API : getDuration()",h.getDuration()),h.getDuration()},n.getPosition=function(){return OvenPlayerConsole.log("API : getPosition()",h.getPosition()),h.getPosition()},n.getVolume=function(){return OvenPlayerConsole.log("API : getVolume()",h.getVolume()),h.getVolume()},n.setVolume=function(e){OvenPlayerConsole.log("API : setVolume() "+e),h.setVolume(e)},n.setMute=function(e){return OvenPlayerConsole.log("API : setMute() "+e),h.setMute(e)},n.getMute=function(){return OvenPlayerConsole.log("API : getMute() "+h.getMute()),h.getMute()},n.load=function(e){return OvenPlayerConsole.log("API : load() ",e),g=(0,i.default)(n,["play","seek","stop"]),e&&(h.setCurrentQuality(0),p.setPlaylist(e)),m()},n.play=function(){OvenPlayerConsole.log("API : play() "),h.play()},n.pause=function(){OvenPlayerConsole.log("API : pause() "),h.pause()},n.seek=function(e){OvenPlayerConsole.log("API : seek() "+e),h.seek(e)},n.setPlaybackRate=function(e){return OvenPlayerConsole.log("API : setPlaybackRate() ",e),h.setPlaybackRate(y.setDefaultPlaybackRate(e))},n.getPlaybackRate=function(){return OvenPlayerConsole.log("API : getPlaybackRate() ",h.getPlaybackRate()),h.getPlaybackRate()},n.getQualityLevels=function(){return OvenPlayerConsole.log("API : getQualityLevels() ",h.getQualityLevels()),h.getQualityLevels()},n.getCurrentQuality=function(){return OvenPlayerConsole.log("API : getCurrentQuality() ",h.getCurrentQuality()),h.getCurrentQuality()},n.setCurrentQuality=function(e){OvenPlayerConsole.log("API : setCurrentQuality() ",e);
//현재 재생중인 소스의 프로바이더와 새로운 qualityIndex 소스의 프로바이더가 같다면 기존 프로바이더를 재활용한다. 그렇지 않으면 initProvider()를 통해 재로딩
var t=p.getCurrentSources(),r=t[n.getCurrentQuality()],o=t[e],a=n.getPosition(),u=v.isSameProvider(r,o),s=h.setCurrentQuality(e,u);return OvenPlayerConsole.log("API : setCurrentQuality() isSameProvider",u),u||(g=(0,i.default)(n,["play"]),
//프로바이더가 변경될때 기존 상태를 유지 할 수 없기 때문에 프로바이더 변경 전 마지막 재생 포지션을 가져온다.
m(a)),s},
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
n.getBuffer=function(){OvenPlayerConsole.log("API : getBuffer() ",h.getBuffer()),h.getBuffer()},n.getState=function(){return OvenPlayerConsole.log("API : getState() ",h.getState()),h.getState()},n.stop=function(){OvenPlayerConsole.log("API : stop() "),h.stop()},n.remove=function(){OvenPlayerConsole.log("API : remove() "),g.destroy(),h.destroy(),h=null,v=null,p=null,y=null,n.trigger(c.DESTROY),n.off(),OvenPlayerConsole.log("API : remove() - lazyQueue, currentProvider, providerController, playlistManager, playerConfig, api event destroed. "),t.destroy()},n}},
/* 23 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.checkAndGetContainerElement=void 0;var r=u(n(22)),o=n(2),i=u(n(1)),a=n(6);function u(e){return e&&e.__esModule?e:{default:e}}n.p=(0,a.getScriptPath)("ovenplayer.sdk.js");
/**
 * Main OvenPlayerSDK object
 */
var s=window.OvenPlayerSDK={},l=s.playerList=[],c=t.checkAndGetContainerElement=function(e){if(!e)
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
s.create=function(e,t){var n=c(e),o=(0,r.default)(n);return o.init(t),l.push(o),o},
/**
 * Gets the player instance list.
 *
 * @return     {array}  The player list.
 */
s.getPlayerList=function(){return l},
/**
 * Gets the player instance by container id.
 *
 * @param      {string}  containerId  The container identifier
 * @return     {obeject | null}  The player instance.
 */
s.getPlayerByContainerId=function(e){for(var t=0;t<l.length-1;t++)if(l[t].containerId===e)return l[t];return null},
/**
 * Gets the player instance by index.
 *
 * @param      {number}  index   The index
 * @return     {object | null}  The player instance.
 */
s.getPlayerByIndex=function(e){var t=l[e];return t||null},
/**
 * Generate webrtc source for player source type.
 *
 * @param      {Object | Array}  source   webrtc source
 * @return     {Array}  Player source Obejct.
 */
s.generateWebrtcUrls=function(e){return(i.default.isArray(e)?e:[e]).map(function(e,t){if(e.host&&(0,o.isWebRTC)(e.host)&&e.application&&e.stream)return{file:e.host+"/"+e.application+"/"+e.stream,type:"webrtc",label:e.label?e.label:"webrtc-"+(t+1)}})},t.default=s},
/* 24 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});!function(e){e&&e.__esModule}(n(0));t.default=function(e,t,n){function r(){var e=t.getState();"idle"===e?t.play():"playing"===e?t.pause():"paused"===e?t.play():"complete"===e&&t.play()}function o(e){t.getDuration();var n=t.getPosition(),r=Math.max(n-e,0);t.seek(r)}function i(e){var n=t.getDuration(),r=t.getPosition(),o=Math.min(r+e,n);t.seek(o)}e.on("keydown.Space",function(e){32===e.keyCode&&(e.preventDefault(),r())}),e.on("keydown.k",function(e){75===e.keyCode&&r()}),e.on("keydown.ArrowLeft",function(e){37===e.keyCode&&o(5)}),e.on("keydown.j",function(e){74===e.keyCode&&o(10)}),e.on("keydown.ArrowRight",function(e){39===e.keyCode&&i(5)}),e.on("keydown.k",function(e){76===e.keyCode&&i(10)}),e.on("keydown.Home",function(e){36===e.keyCode&&t.seek(0)}),e.on("keydown.End",function(e){35===e.keyCode&&t.seek(t.getDuration())}),e.on("keydown.ArrowUp",function(e){if(38===e.keyCode){var n=t.getVolume(),r=Math.min(n+5,100);t.setVolume(r)}}),e.on("keydown.ArrowDown",function(e){if(40===e.keyCode){var n=t.getVolume(),r=Math.max(n-5,0);t.setVolume(r)}}),e.on("keydown.m",function(e){77===e.keyCode&&t.setMute()}),e.on("keydown.Numbers",function(e){if(e.keyCode>=48&&e.keyCode<=57){var n=(e.keyCode-48)/10;t.seek(t.getDuration()*n)}}),e.on("keydown.f",function(e){70===e.keyCode&&n.toggleFullScreen()}),e.on("keydown.c",function(e){67===e.keyCode&&t.toggleCaption()})}},
/* 25 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return'<div class="ovp-context-panel"></div>'};t.contextItemTemplate=function(e){return'<div class="ovp-context-item" tabindex="0"><span class="ovp-context-item-text">'+e+"</span></div>"};
/***/},
/* 26 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a(n(0)),o=n(25),i=a(o);function a(e){return e&&e.__esModule?e:{default:e}}t.default=function(e,t,n){n.contextShown=!1;var a=null;function u(e){e.on("click",function(e){l()})}function s(e){!function(){null!=a&&l(),a=(0,r.default)((0,i.default)()),(0,r.default)("body").append(a),a.attr("data-player-id",n.containerElem.id),a.empty();var e=(0,r.default)((0,o.contextItemTemplate)("Help"));a.append(e),u(e);var t=(0,r.default)((0,o.contextItemTemplate)("About OvenPlayer"));a.append(t),u(t)}(),function(e,t){var n=a.width(),r=a.height(),o=Math.max(e+n-window.innerWidth,0),i=Math.max(t+r-window.innerHeight,0);a.css("left",e-o),a.css("top",t-i)}(e.pageX,e.pageY),a.addClass("ovp-context-panel-active"),n.contextShown=!0,a.on("click",function(e){e.stopPropagation()}),a.on("contextmenu",function(e){e.preventDefault()}),(0,r.default)(document).one("click.contextPanel",function(e){l()})}function l(){a.removeClass("ovp-context-panel-active"),(0,r.default)(document).off("click.contextPanel"),a.remove(),a=null,n.contextShown=!1}n.data("ovpElement").on("contextmenu",function(e){e.preventDefault(),s(e)}),t.on("destroy",function(e){null!=a&&l()})}},
/* 27 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return'<div class="ovp-lowlatency-info-panel"><div class="ovp-lowlatency-info-container"><span class="ovp-live-badge"></span><span class="ovp-lowlatency-info-text">Low latency live streaming.</span></div></div>'}},
/* 28 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i(n(0)),o=i(n(27));function i(e){return e&&e.__esModule?e:{default:e}}t.default=function(e,t,n){var i=(0,r.default)((0,o.default)());e.append(i)}},
/* 29 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return'<button class="ovp-button ovp-caption-button"><i class="ovp-caption-button-icon far fa-closed-captioning"></i></button>'}},
/* 30 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i(n(0)),o=i(n(29));function i(e){return e&&e.__esModule?e:{default:e}}t.default=function(e,t,n){var i=(0,r.default)((0,o.default)());function a(){i.hide()}e.append(i),n.data("ovpElement"),i.on("click",function(e){t.toggleCaption()}),t.on("captionsList",function(e){t.getCaptionsList().length>0?i.css("display","inline-block"):a()}),a()}},
/* 31 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return'<button class="ovp-button ovp-setting-button"><i class="ovp-setting-button-icon"></i></button>'}},
/* 32 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i(n(0)),o=i(n(31));function i(e){return e&&e.__esModule?e:{default:e}}t.default=function(e,t,n){var i=(0,r.default)((0,o.default)());e.append(i),i.on("click",function(e){e.stopPropagation(),n.toggleSettingPanel()})}},
/* 33 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return'<button class="ovp-button ovp-fullscreen-button"><i class="ovp-fullscreen-button-expandicon"></i><i class="ovp-fullscreen-button-compressicon"></i></button>'}},
/* 34 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i(n(0)),o=i(n(33));function i(e){return e&&e.__esModule?e:{default:e}}t.default=function(e,t,n){var i=!1,a=n.data("ovpElement"),u=(0,r.default)((0,o.default)());function s(){i?document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen():function(){var e=a[0];e.requestFullscreen?e.requestFullscreen():e.webkitRequestFullscreen?e.webkitRequestFullscreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.msRequestFullscreen&&e.msRequestFullscreen()}()}e.append(u),u.find(".ovp-fullscreen-button-expandicon"),u.find(".ovp-fullscreen-button-compressicon"),u.on("click",function(e){s()}),n.toggleFullScreen=s,function(e){null===document.onfullscreenchange?(0,r.default)(document).on("fullscreenchange",function(t){e()}):null===document.onmozfullscreenchange?(0,r.default)(document).on("mozfullscreenchange",function(t){e()}):null===document.onwebkitfullscreenchange?(0,r.default)(document).on("webkitfullscreenchange",function(t){e()}):null===document.MSFullscreenChange&&(0,r.default)(document).on("MSFullscreenChange",function(t){e()})}(function(e){document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement?(a.addClass("ovp-fullscreen"),i=!0):(a.removeClass("ovp-fullscreen"),i=!1)})}},
/* 35 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return'<div class="ovp-time-display"><span class="ovp-time-current">0:00</span><span class="ovp-time-separator"> / </span><span class="ovp-time-duration">7:21</span><button class="ovp-live-badge ovp-button" disabled="disabled"><span class="ovp-live-badge-lowlatency">low latency</span><span>live</span></button></div>'}},
/* 36 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a(n(0)),o=n(3),i=a(n(35));function a(e){return e&&e.__esModule?e:{default:e}}t.default=function(e,t,n){var a="ovp-live",u="ovp-live-lowlatency",s=(0,r.default)((0,i.default)());e.append(s);var l=s.find(".ovp-time-current"),c=s.find(".ovp-time-duration");function f(e){l.text((0,o.naturalHms)(e))}function d(e){c.text((0,o.naturalHms)(e))}function p(){n.data("ovpElement").removeClass(u),n.data("ovpElement").removeClass(a)}t.on("metaChanged",function(e){p(),e.duration===1/0?"webrtc"===e.type?(n.data("ovpElement").addClass(a),n.data("ovpElement").addClass(u)):n.data("ovpElement").addClass(a):(p(),d(e.duration))}),t.on("time",function(e){f(e.position)}),f(0),d(0)}},
/* 37 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return'<div class="ovp-volume-controller"><button class="ovp-button ovp-volume-button"><i class="ovp-volume-button-bigicon"></i><i class="ovp-volume-button-smallicon"></i><i class="ovp-volume-button-muteicon"></i></button><div class="ovp-volume-slider-container"><div class="ovp-volume-silder"><div class="ovp-volume-slider-bg"></div><div class="ovp-volume-slider-value"></div><div class="ovp-volume-slider-handle"></div></div></div></div>'}},
/* 38 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i(n(0)),o=i(n(37));function i(e){return e&&e.__esModule?e:{default:e}}t.default=function(e,t,n){var i=(0,r.default)((0,o.default)());e.append(i);var a=i.find(".ovp-volume-button"),u=i.find(".ovp-volume-button-bigicon"),s=i.find(".ovp-volume-button-smallicon"),l=i.find(".ovp-volume-button-muteicon"),c=i.find(".ovp-volume-slider-container"),f=i.find(".ovp-volume-silder"),d=i.find(".ovp-volume-slider-handle"),p=i.find(".ovp-volume-slider-value"),v=70,h=d.width(),y=v-h,g=!1;function m(e){var t=(e.pageX-f.offset().left)/v*100;return t<0&&(t=0),t>100&&(t=100),t}function b(e){t.getMute()&&(e=0),function(e){u.hide(),s.hide(),l.hide(),e>=30?u.show():e<30&&e>0?s.show():0==e&&l.show()}(e);var n=y*e/100;d.css("left",n),p.css("width",e+"%")}u.show(),a.on("click",function(e){e.preventDefault(),0==t.getVolume()?(t.setMute(!1),t.setVolume(100)):t.setMute()}),a.on("mouseenter",function(e){c.addClass("ovp-volume-slider-container-active"),b(t.getVolume())}),e.on("mouseleave",function(e){g||c.removeClass("ovp-volume-slider-container-active")}),f.on("mousedown",function(e){g=!0;var n=m(e);t.setMute(!1),t.setVolume(n)}),(0,r.default)(document).on("mousemove.OvpVolumeSlider",function(e){if(g){var n=m(e);t.setVolume(n)}}),(0,r.default)(document).on("mouseup.OvpVolumeSlider",function(e){g=!1}),t.on("mute",function(e){e.mute?b(0):b(t.getVolume())}),t.on("volumeChanged",function(e){b(e.volume)}),t.on("ready",function(e){b(t.getVolume())})}},
/* 39 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return'<button class="ovp-button ovp-play-button"><i class="ovp-play-button-playicon"></i><i class="ovp-play-button-pauseicon"></i><i class="ovp-play-button-replayicon"></i></button>'}},
/* 40 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i(n(0)),o=i(n(39));function i(e){return e&&e.__esModule?e:{default:e}}t.default=function(e,t,n){var i=this,a=(0,r.default)((0,o.default)());e.append(a);var u=a.find(".ovp-play-button-playicon"),s=a.find(".ovp-play-button-pauseicon"),l=a.find(".ovp-play-button-replayicon");
/**
     * Depending on the player's status, the button icon changes to play or pause.
     *
     * @param      {string}  state the state
     */
i.changeButtonState=function(e){!function(e){u.hide(),s.hide(),l.hide(),"play"===e?u.show():"pause"===e?s.show():"complete"===e&&l.show()}(e)},a.on("click",function(){var e=t.getState();"idle"===e?t.play():"playing"===e?t.pause():"paused"===e?t.play():"complete"===e&&t.play()}),t.on("ready",function(){i.changeButtonState("play")}),t.on("play",function(){i.changeButtonState("pause")}),t.on("pause",function(){i.changeButtonState("play")}),t.on("complete",function(){i.changeButtonState("play")}),t.on("error",function(e){i.changeButtonState("play")}),u.show()}},
/* 41 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return'<div class="ovp-progressbar" tabindex="0"><div class="ovp-progressbar-padding"></div><div class="ovp-progress-list"><div class="ovp-load-progress"></div><div class="ovp-play-progress ovp-play-background-color"></div><div class="ovp-hover-progress"></div></div><div class="ovp-progressbar-knob-container"><div class="ovp-progressbar-knob ovp-play-background-color"></div></div><span class="ovp-progressbar-time">0:00</span></div>'}},
/* 42 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a(n(0)),o=n(3),i=a(n(41));function a(e){return e&&e.__esModule?e:{default:e}}t.default=function(e,t,n){var a=!1,u=0,s=0,l=0,c=!1,f=!1,d=(0,r.default)((0,i.default)());
/**
     * Current playback position px value
     *
     * @type       {number} px
     */e.append(d);var p=d.find(".ovp-load-progress"),v=d.find(".ovp-play-progress"),h=d.find(".ovp-hover-progress"),y=d.find(".ovp-progressbar-knob-container"),g=d.find(".ovp-progressbar-knob").width(),m=d.find(".ovp-progressbar-time");function b(e){var t=d.width(),n=d.offset().left,r=(e.pageX-n)/t;return r<0?0:r>1?1:r}function x(e){var t=d.width(),n=t*e;v.width(n),h.css("left",n);var r=(t-g)*e;y.css("left",r),u=n,s=e}function w(e){var t=d.width()*e;h.width(t-u)}function C(e){var t=d.width()*e;p.width(t),l=e}function E(e){if(!a)
// TODO(rock): Let's think about whether we can make this part neat.
if(n.settingsShown)m.hide();else{m.show();var r=t.getDuration()*e,i=(0,o.naturalHms)(r);m.text(i);var u=m.outerWidth(),s=d.width()*e;m.css("left",s-u/2)}}function P(e){var n=t.getDuration()*e;t.seek(n)}d.on("mouseenter",function(e){f=!0,n.data("ovpElement").addClass("ovp-progressbar-hover")}),d.on("mouseleave",function(e){f=!1,c||n.data("ovpElement").removeClass("ovp-progressbar-hover"),w(0)}),d.on("mousedown",function(e){c=!0;var t=b(e);x(t),w(0),P(t)}),d.on("mousemove",function(e){var t=b(e);w(t),E(t)}),(0,r.default)(document).on("mousemove.OvpProgressBar",function(e){if(c){var t=b(e);x(t),w(0),E(t),P(t)}}),(0,r.default)(document).on("mouseup.OvpProgressBar",function(e){c=!1,f||n.data("ovpElement").removeClass("ovp-progressbar-hover")}),(0,r.default)(window).on("resize.OvpProgressBar",function(e){x(s),C(l)}),t.on("time",function(e){var t=e.duration;x(e.position/t)}),t.on("bufferChanged",function(e){C(e.bufferPercent/100)}),t.on("error",function(e){a=!0})}},
/* 43 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return'<div class="ovp-gradient-bottom"></div><div class="ovp-bottom-panel"><div class="ovp-progressbar-container"></div><div class="ovp-controls-container"><div class="ovp-left-controls"></div><div class="ovp-right-controls"></div></div></div>'}},
/* 44 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=d(n(0)),o=d(n(43)),i=d(n(42)),a=d(n(40)),u=d(n(38)),s=d(n(36)),l=d(n(34)),c=d(n(32)),f=d(n(30));function d(e){return e&&e.__esModule?e:{default:e}}
/**
 * A panel located on the bottom for storing player seek and control buttons
 *
 * @class      BottomPanel asdasdasdasd
 * @param      {jQueryElem}  container  The container
 */t.default=function(e,t,n){var d=(0,r.default)((0,o.default)());e.append(d);var p=d.find(".ovp-progressbar-container"),v=d.find(".ovp-left-controls"),h=d.find(".ovp-right-controls");new i.default(p,t,n),new a.default(v,t,n),new u.default(v,t,n),new s.default(v,t,n),new f.default(h,t,n),new c.default(h,t,n),new l.default(h,t,n)}},
/* 45 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return'<div class="ovp-message-box"><div class="ovp-message-container"><span class="ovp-message-text"></span></div></div>'}},
/* 46 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i(n(0)),o=i(n(45));function i(e){return e&&e.__esModule?e:{default:e}}t.default=function(e,t,n){var i=(0,r.default)((0,o.default)());e.append(i);var a=i.find(".ovp-message-text"),u=null;function s(){null!=u&&(clearTimeout(u),u=null),i.removeClass("ovp-message-box-active"),a.empty()}function l(e,t,n){s(),i.addClass("ovp-message-box-active"),a.html(e);var r=5e3;n&&(r=n),t&&(u=setTimeout(function(){s()},r))}function c(){s()}n.showMessage=l,n.hideMessage=c,t.on("ready",function(e){c()}),t.on("error",function(e){l(100===e.code?"Initialization failed.":301===e.code?"Media playback was canceled.":302===e.code?"Some of the media could not be downloaded due to a network error.":303===e.code?"Unable to load media. This may be due to a server or network error, or due to an unsupported format.":304===e.code?"Media playback has been canceled. It looks like your media is corrupted or your browser does not support the features your media uses.":5===parseInt(e.code/100)?"Connection with low-latency server failed.":"Can not play due to unknown reasons.")})}},
/* 47 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return'<div class="ovp-caption-viewer"><div class="ovp-caption-text-container"><span class="ovp-caption-text"></span></div></div>'}},
/* 48 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i(n(0)),o=i(n(47));function i(e){return e&&e.__esModule?e:{default:e}}t.default=function(e,t,n){var i=(0,r.default)((0,o.default)());e.append(i);var a=i.find(".ovp-caption-text");function u(){a.empty(),a.hide()}t.on("cueChanged",function(e){u(),e&&e.text&&(a.html(e.text),a.show())}),t.on("captionChanged",function(e){u()})}},
/* 49 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return'<div class="ovp-setting-panel"><div class="ovp-setting-title-container"></div><div class="ovp-setting-item-container"></div></div>'};t.settingTitleTemplate=function(e){return'<div class="ovp-setting-title" tabindex="0"><span class="ovp-setting-title-previcon">&lt;</span><span class="ovp-setting-title-title">'+e+"</span></div>"},t.settingItemTemplate=function(e,t){return'<div class="ovp-setting-item" tabindex="0"><span class="ovp-setting-item-title">'+e+'</span><span class="ovp-setting-item-nexticon">&gt;</span><span class="ovp-setting-item-value">'+t+"</span></div>"},t.settingValueTemplate=function(e){return'<div class="ovp-setting-item ovp-setting-item-value" tabindex="0"><span class="ovp-setting-item-checked">&#x2713;</span><span class="ovp-setting-item-title">'+e+"</span></div>"}},
/* 50 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a(n(0)),o=n(49),i=a(o);function a(e){return e&&e.__esModule?e:{default:e}}t.default=function(e,t,n){var a=!1,u=(0,r.default)((0,i.default)());e.append(u);var s=u.find(".ovp-setting-title-container"),l=u.find(".ovp-setting-item-container");function c(){s.empty(),l.empty(),u.hide(),a=!1,n.settingsShown=!1,n.data("ovpElement").removeClass("ovp-settings-shown"),(0,r.default)(document).off("click.settingPanel"),n.ovpElement.focus()}function f(){u.show(),s.empty(),l.empty();var e=(0,r.default)((0,o.settingTitleTemplate)("Settings"));e.find(".ovp-setting-title-previcon").remove(),s.append(e),e.on("click",function(e){e.stopPropagation()}),t.getDuration()!==1/0&&function(){var e=t.getPlaybackRate(),n=e;1===e&&(n="Normal");var i=(0,r.default)((0,o.settingItemTemplate)("Speed",n));l.append(i),i.on("click",function(e){e.stopPropagation(),function(){s.empty(),l.empty();var e=(0,r.default)((0,o.settingTitleTemplate)("Playback speed"));s.append(e),d(e);var n=function(e){var n=e;1===e&&(n="Normal");var i=(0,r.default)((0,o.settingValueTemplate)(n));t.getPlaybackRate()==e&&v(i),l.append(i),p(i,function(){t.setPlaybackRate(e)})},i=!0,a=!1,u=void 0;try{for(var c,f=[.25,.5,.75,1,1.25,1.5,2][Symbol.iterator]();!(i=(c=f.next()).done);i=!0){var h=c.value;n(h)}}catch(e){a=!0,u=e}finally{try{!i&&f.return&&f.return()}finally{if(a)throw u}}}()})}(),
// addCaptionsSettingItem();
t.getQualityLevels().length>1&&function(){var e=t.getQualityLevels(),n=t.getCurrentQuality(),i=e[n],a="Default";i&&(a=i.label);var u=(0,r.default)((0,o.settingItemTemplate)("Source",a));l.append(u),u.on("click",function(e){e.stopPropagation(),function(){s.empty(),l.empty();var e=(0,r.default)((0,o.settingTitleTemplate)("Playback source"));s.append(e),d(e);for(var n=t.getQualityLevels(),i=function(e){var i=n[e].label,a=(0,r.default)((0,o.settingValueTemplate)(i));t.getCurrentQuality()===e&&v(a),l.append(a),p(a,function(){t.setCurrentQuality(e)})},a=0;a<n.length;a++)i(a)}()})}()}function d(e,t){e.on("click",function(e){e.stopPropagation(),f()})}function p(e,t){e.on("click",function(e){e.stopPropagation(),t(),c()})}function v(e){e.find(".ovp-setting-item-checked").css("visibility","visible")}n.toggleSettingPanel=function(){a?c():(f(),a=!0,n.settingsShown=!0,n.data("ovpElement").addClass("ovp-settings-shown"),(0,r.default)(document).one("click.settingPanel",function(e){(0,r.default)(e.target).closest(u).length>0||(c(),0==(0,r.default)(e.target).closest(".ovenplayer").length&&"playing"==t.getState()&&n.setAutoHide(!0))}))}}},
/* 51 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return'<div class=ovp-bigbutton-container><i class="ovp-bigbutton ovp-bigbutton-play"></i><i class="ovp-bigbutton ovp-bigbutton-pause"></i><i class="ovp-bigbutton ovp-bigbutton-replay"></i></div>'}},
/* 52 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i(n(0)),o=i(n(51));function i(e){return e&&e.__esModule?e:{default:e}}
/**
 *
 *
 * @class      BigButton (name)
 * @param      {<type>}  container  The operation element
 * @param      {<type>}  player        The player
 * @param      {<type>}  ui      The ui
 */t.default=function(e,t,n){var i=this,a=!0,u=(0,r.default)((0,o.default)());e.append(u);var s=u.find(".ovp-bigbutton-play"),l=u.find(".ovp-bigbutton-pause"),c=u.find(".ovp-bigbutton-replay");
/**
     * Depending on the player's status, the big button icon changes to play or pause.
     *
     * @param      {boolean}  paused  The paused
     */
i.changeButtonState=function(e){!function(e){s.hide(),l.hide(),c.hide(),"play"===e?s.show():"pause"===e?l.show():"complete"===e&&c.show()}(e)},i.show=function(e,t){u.css("opacity","1")},i.wink=function(e,t){a||(u.css("opacity","1"),u.animate({start:function(){u.css("opacity","1")},duration:250,opacity:0,queue:!1}))},i.hide=function(e){u.css("opacity","0")},u.on("click",function(){if(!n.settingsShown&&!n.contextShown){var e=t.getState();"idle"===e?t.play():"playing"===e?t.pause():"paused"===e?t.play():"complete"===e&&t.play()}}),t.on("ready",function(){i.changeButtonState("play"),a=!1}),t.on("play",function(e){i.changeButtonState("play"),i.wink(),a=!0}),t.on("pause",function(){a=!1,i.changeButtonState("pause"),i.wink()}),t.on("complete",function(){a=!1,i.changeButtonState("play"),i.show()}),t.on("error",function(e){i.hide()})}},
/* 53 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return'<div class="ovp-spinner-container"><i class="ovp-spinner fas fa-spinner"></i></div>'}},
/* 54 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i(n(0)),o=i(n(53));function i(e){return e&&e.__esModule?e:{default:e}}t.default=function(e,t,n){var i=(0,r.default)((0,o.default)());e.append(i),
// TODO(rock): Actual test required
t.on("buffer",function(){i.addClass("ovp-spinner-active")})}},
/* 55 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){return'<div class="ovenplayer ovp-wrapper" tabindex="-1" aria-label=""><div class="ovp-ratio"></div><div class="ovp-player"><div class="ovp-media-element-container"></div><div class="ovp-ui"></div></div></div>'}},
/* 56 */
/***/function(e,t){
/* WEBPACK VAR INJECTION */(function(t){/* globals __webpack_amd_options__ */
e.exports=t;
/* WEBPACK VAR INJECTION */}).call(this,{})
/***/},
/* 57 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=v(n(0)),o=v(n(55)),i=v(n(54)),a=v(n(52)),u=v(n(50)),s=v(n(48)),l=v(n(46)),c=v(n(44)),f=v(n(28)),d=v(n(26)),p=v(n(24));function v(e){return e&&e.__esModule?e:{default:e}}t.default=function(){
/**
     * View object
     */
var e=this,t=e.ui=(0,r.default)({}),n=null;
/**
     * ui model.
     * 
     * @type       {jQueryElem}
     */t.PLAYING_MODE={READY:"READY",PLAYING:"PLAYING",PAUSED:"PAUSED",ENDED:"ENDED"},t.UI_STATUS={PLAYER_MOUSE_IN:"PLAYER_MOUSE_IN",PLAYER_MOUSE_OUT:"PLAYER_MOUSE_OUT",BOTTOM_PANEL_MOUSE_IN:"BOTTOM_PANEL_MOUSE_IN",BOTTOM_PANEL_MOUSE_OUT:"BOTTOM_PANEL_MOUSE_OUT",SETTING_PANEL_ACITVE:"SETTING_PANEL_ACITVE",SETTING_PANEL_DEACTIVE:"SETTING_PANEL_DEACTIVE"},e.appendPlayerMarkup=function(e){var i=(0,r.default)(e);t.data("containerElem",i),t.containerElem=e,n=(0,r.default)((0,o.default)()),i.append(n),t.data("ovpElement",n),t.ovpElement=n[0];var a=n.find(".ovp-media-element-container");t.data("mediaElementContainer",a[0]),t.mediaElementContainer=a[0]},e.getMediaElementContainer=function(){return t.mediaElementContainer},e.addComponentsAndFunctions=function(r,o){
/**
         * Bind options to ui model.
         */
t.options=o;
/**
         * The parent element of the player's UI elements
         */
var v=n.find(".ovp-ui"),h=new f.default(v,r,t);
// Low latency display part
e.lowLatencyInfoPanel=h;
// Subtitle display part
var y=new s.default(v,r,t);e.captionViewer=y;
// Message box
var g=new l.default(v,r,t);e.messageBox=g;
// Add spinner
var m=new i.default(v,r,t);e.spinner=m;
// Add Big Button
var b=new a.default(v,r,t);e.bigButton=b;
// Add setting panel
var x=new u.default(v,r,t);e.settingPanel=x;
// Add bottom panel
var w=new c.default(v,r,t);e.bottomPanel=w;
// Add Context Panel
var C=new d.default(v,r,t);function E(e){n.removeClass("ovp-playing-mode"),n.removeClass("ovp-paused-mode"),n.removeClass("ovp-ended-mode"),"play"===e?(t.playingMode=t.PLAYING_MODE.PLAYING,n.addClass("ovp-playing-mode"),T(!1,!0)):"pause"===e?(t.playingMode=t.PLAYING_MODE.PAUSED,n.addClass("ovp-paused-mode"),T(!1)):"complete"===e&&(t.playingMode=t.PLAYING_MODE.ENDED,n.addClass("ovp-ended-mode"),T(!1))}e.contextPanel=C,t.playingMode="ready",t.setPlayingModeUI=E;var P=null;function T(e,t){null!=P&&(clearTimeout(P),P=null),e?_():(n.removeClass("ovp-autohide"),t&&(P=setTimeout(function(){_()},1800)))}function _(){t.settingsShown||n.addClass("ovp-autohide")}t.setAutoHide=T,
/**
         * Events
         */
r.on("error",function(e){n.addClass("ovp-on-error")}),r.on("metaChanged",function(e){n.removeClass("ovp-on-error")}),r.on("play",function(e){E("play"),n.removeClass("ovp-on-error")}),r.on("pause",function(e){E("pause")}),r.on("complete",function(e){E("complete")}),r.on("seek",function(e){T(!1,!0)}),r.on("volume",function(e){T(!1,!0)}),r.on("mute",function(e){T(!1,!0)}),r.on("stateChaged",function(e){}),r.on("captionChanged",function(e,o){T(!1,!0),r.getCurrentCaptions()>-1?(n.addClass("ovp-caption-active"),t.showMessage(o.label+" 자막이 활성화됐습니다.",!0,1800)):(n.removeClass("ovp-caption-active"),t.hideMessage())}),n.on("mouseenter",function(e){t.playingMode==t.PLAYING_MODE.PLAYING?T(!1,!0):T(!1)}),n.on("mousemove",function(e){t.playingMode==t.PLAYING_MODE.PLAYING?T(!1,!0):T(!1)}),n.on("mouseleave",function(e){t.playingMode==t.PLAYING_MODE.PLAYING&&T(!0)}),
// Add keyboard events
new p.default(n,r,t),
// when player removed.
r.on("destroy",function(e){t.data("containerElem").empty()})}}},
/* 58 */
/***/function(e,t,n){"use strict";var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=n(23),i=s(o),a=s(n(57)),u=n(6);function s(e){return e&&e.__esModule?e:{default:e}}n.p=(0,u.getScriptPath)("ovenplayer.js");var l={};window.OvenPlayer=l,
/**
 * Copy properties from OvenPlayerSDK object to OvenPlayer object
 */
r(l,i.default),l.create=function(e,t){var n=(0,o.checkAndGetContainerElement)(e),r=new a.default;r.appendPlayerMarkup(n);var u=i.default.create(r.getMediaElementContainer(),t);return r.addComponentsAndFunctions(u,t),u}}
/******/]);
//# sourceMappingURL=ovenplayer.js.map