/*! For license information please see ovenplayer.sdk.js.LICENSE */
/*! OvenPlayerv0.6.3 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
/******/o(o.s=23);
/******/}
/************************************************************************/
/******/([
/* 0 */
/* 1 */
/***/,
/* 1 */
/***/function(e,t,n){"use strict";
/* WEBPACK VAR INJECTION */
/* WEBPACK VAR INJECTION */(function(e,n){Object.defineProperty(t,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o="object"==("undefined"==typeof self?"undefined":r(self))&&self.self===self&&self||"object"==(void 0===e?"undefined":r(e))&&e.global===e&&e||{},u=o._,i=Array.prototype,a=Object.prototype,l="undefined"!=typeof Symbol?Symbol.prototype:null,c=i.push,f=i.slice,s=a.toString,d=a.hasOwnProperty,p=Array.isArray,v=Object.keys,y=Object.create,g=function(){},h=function e(t){return t instanceof e?t:this instanceof e?void(this._wrapped=t):new e(t)};
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
void 0===t||t.nodeType?o._=h:(void 0!==n&&!n.nodeType&&n.exports&&(t=n.exports=h),t._=h),
// Current version.
h.VERSION="1.9.0";
// Internal function that returns an efficient (for current engines) version
// of the passed-in callback, to be repeatedly applied in other Underscore
// functions.
var m,P=function(e,t,n){if(void 0===t)return e;switch(null==n?3:n){case 1:return function(n){return e.call(t,n)};
// The 2-argument case is omitted because we’re not using it.
case 3:return function(n,r,o){return e.call(t,n,r,o)};case 4:return function(n,r,o,u){return e.call(t,n,r,o,u)}}return function(){return e.apply(t,arguments)}},b=function(e,t,n){return h.iteratee!==m?h.iteratee(e,t):null==e?h.identity:h.isFunction(e)?P(e,t,n):h.isObject(e)&&!h.isArray(e)?h.matcher(e):h.property(e)};
// External wrapper for our callback generator. Users may customize
// `_.iteratee` if they want additional predicate/iteratee shorthand styles.
// This abstraction hides the internal-only argCount argument.
h.iteratee=m=function(e,t){return b(e,t,1/0)};
// Some functions take a variable number of arguments, or a few expected
// arguments at the beginning and then a variable number of values to operate
// on. This helper accumulates all remaining arguments past the function’s
// argument length (or an explicit `startIndex`), into an array that becomes
// the last argument. Similar to ES6’s "rest parameter".
var _=function(e,t){return t=null==t?e.length-1:+t,function(){for(var n=Math.max(arguments.length-t,0),r=Array(n),o=0;o<n;o++)r[o]=arguments[o+t];switch(t){case 0:return e.call(this,r);case 1:return e.call(this,arguments[0],r);case 2:return e.call(this,arguments[0],arguments[1],r)}var u=Array(t+1);for(o=0;o<t;o++)u[o]=arguments[o];return u[t]=r,e.apply(this,u)}},O=function(e){if(!h.isObject(e))return{};if(y)return y(e);g.prototype=e;var t=new g;return g.prototype=null,t},E=function(e){return function(t){return null==t?void 0:t[e]}},C=function(e,t){for(var n=t.length,r=0;r<n;r++){if(null==e)return;e=e[t[r]]}return n?e:void 0},R=Math.pow(2,53)-1,A=E("length"),w=function(e){var t=A(e);return"number"==typeof t&&t>=0&&t<=R};
// An internal function for creating a new object that inherits from another.
// Collection Functions
// --------------------
// The cornerstone, an `each` implementation, aka `forEach`.
// Handles raw objects in addition to array-likes. Treats all
// sparse array-likes as if they were dense.
h.each=h.forEach=function(e,t,n){var r,o;if(t=P(t,n),w(e))for(r=0,o=e.length;r<o;r++)t(e[r],r,e);else{var u=h.keys(e);for(r=0,o=u.length;r<o;r++)t(e[u[r]],u[r],e)}return e},
// Return the results of applying the iteratee to each element.
h.map=h.collect=function(e,t,n){t=b(t,n);for(var r=!w(e)&&h.keys(e),o=(r||e).length,u=Array(o),i=0;i<o;i++){var a=r?r[i]:i;u[i]=t(e[a],a,e)}return u};
// Create a reducing function iterating left or right.
var T=function(e){return function(t,n,r,o){var u=arguments.length>=3;return function(t,n,r,o){var u=!w(t)&&h.keys(t),i=(u||t).length,a=e>0?0:i-1;for(o||(r=t[u?u[a]:a],a+=e);a>=0&&a<i;a+=e){var l=u?u[a]:a;r=n(r,t[l],l,t)}return r}(t,P(n,o,4),r,u)}};
// **Reduce** builds up a single result from a list of values, aka `inject`,
// or `foldl`.
h.reduce=h.foldl=h.inject=T(1),
// The right-associative version of reduce, also known as `foldr`.
h.reduceRight=h.foldr=T(-1),
// Return the first value which passes a truth test. Aliased as `detect`.
h.find=h.detect=function(e,t,n){var r=(w(e)?h.findIndex:h.findKey)(e,t,n);if(void 0!==r&&-1!==r)return e[r]},
// Return all the elements that pass a truth test.
// Aliased as `select`.
h.filter=h.select=function(e,t,n){var r=[];return t=b(t,n),h.each(e,function(e,n,o){t(e,n,o)&&r.push(e)}),r},
// Return all the elements for which a truth test fails.
h.reject=function(e,t,n){return h.filter(e,h.negate(b(t)),n)},
// Determine whether all of the elements match a truth test.
// Aliased as `all`.
h.every=h.all=function(e,t,n){t=b(t,n);for(var r=!w(e)&&h.keys(e),o=(r||e).length,u=0;u<o;u++){var i=r?r[u]:u;if(!t(e[i],i,e))return!1}return!0},
// Determine if at least one element in the object matches a truth test.
// Aliased as `any`.
h.some=h.any=function(e,t,n){t=b(t,n);for(var r=!w(e)&&h.keys(e),o=(r||e).length,u=0;u<o;u++){var i=r?r[u]:u;if(t(e[i],i,e))return!0}return!1},
// Determine if the array or object contains a given item (using `===`).
// Aliased as `includes` and `include`.
h.contains=h.includes=h.include=function(e,t,n,r){return w(e)||(e=h.values(e)),("number"!=typeof n||r)&&(n=0),h.indexOf(e,t,n)>=0},
// Invoke a method (with arguments) on every item in a collection.
h.invoke=_(function(e,t,n){var r,o;return h.isFunction(t)?o=t:h.isArray(t)&&(r=t.slice(0,-1),t=t[t.length-1]),h.map(e,function(e){var u=o;if(!u){if(r&&r.length&&(e=C(e,r)),null==e)return;u=e[t]}return null==u?u:u.apply(e,n)})}),
// Convenience version of a common use case of `map`: fetching a property.
h.pluck=function(e,t){return h.map(e,h.property(t))},
// Convenience version of a common use case of `filter`: selecting only objects
// containing specific `key:value` pairs.
h.where=function(e,t){return h.filter(e,h.matcher(t))},
// Convenience version of a common use case of `find`: getting the first object
// containing specific `key:value` pairs.
h.findWhere=function(e,t){return h.find(e,h.matcher(t))},
// Return the maximum element (or element-based computation).
h.max=function(e,t,n){var o,u,i=-1/0,a=-1/0;if(null==t||"number"==typeof t&&"object"!=r(e[0])&&null!=e)for(var l=0,c=(e=w(e)?e:h.values(e)).length;l<c;l++)null!=(o=e[l])&&o>i&&(i=o);else t=b(t,n),h.each(e,function(e,n,r){((u=t(e,n,r))>a||u===-1/0&&i===-1/0)&&(i=e,a=u)});return i},
// Return the minimum element (or element-based computation).
h.min=function(e,t,n){var o,u,i=1/0,a=1/0;if(null==t||"number"==typeof t&&"object"!=r(e[0])&&null!=e)for(var l=0,c=(e=w(e)?e:h.values(e)).length;l<c;l++)null!=(o=e[l])&&o<i&&(i=o);else t=b(t,n),h.each(e,function(e,n,r){((u=t(e,n,r))<a||u===1/0&&i===1/0)&&(i=e,a=u)});return i},
// Shuffle a collection.
h.shuffle=function(e){return h.sample(e,1/0)},
// Sample **n** random values from a collection using the modern version of the
// [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
// If **n** is not specified, returns a single random element.
// The internal `guard` argument allows it to work with `map`.
h.sample=function(e,t,n){if(null==t||n)return w(e)||(e=h.values(e)),e[h.random(e.length-1)];var r=w(e)?h.clone(e):h.values(e),o=A(r);t=Math.max(Math.min(t,o),0);for(var u=o-1,i=0;i<t;i++){var a=h.random(i,u),l=r[i];r[i]=r[a],r[a]=l}return r.slice(0,t)},
// Sort the object's values by a criterion produced by an iteratee.
h.sortBy=function(e,t,n){var r=0;return t=b(t,n),h.pluck(h.map(e,function(e,n,o){return{value:e,index:r++,criteria:t(e,n,o)}}).sort(function(e,t){var n=e.criteria,r=t.criteria;if(n!==r){if(n>r||void 0===n)return 1;if(n<r||void 0===r)return-1}return e.index-t.index}),"value")};
// An internal function used for aggregate "group by" operations.
var S=function(e,t){return function(n,r,o){var u=t?[[],[]]:{};return r=b(r,o),h.each(n,function(t,o){var i=r(t,o,n);e(u,t,i)}),u}};
// Groups the object's values by a criterion. Pass either a string attribute
// to group by, or a function that returns the criterion.
h.groupBy=S(function(e,t,n){h.has(e,n)?e[n].push(t):e[n]=[t]}),
// Indexes the object's values by a criterion, similar to `groupBy`, but for
// when you know that your index values will be unique.
h.indexBy=S(function(e,t,n){e[n]=t}),
// Counts instances of an object that group by a certain criterion. Pass
// either a string attribute to count by, or a function that returns the
// criterion.
h.countBy=S(function(e,t,n){h.has(e,n)?e[n]++:e[n]=1});var k=/[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
// Safely create a real, live array from anything iterable.
h.toArray=function(e){return e?h.isArray(e)?f.call(e):h.isString(e)?e.match(k):w(e)?h.map(e,h.identity):h.values(e):[]},
// Return the number of elements in an object.
h.size=function(e){return null==e?0:w(e)?e.length:h.keys(e).length},
// Split a collection into two arrays: one whose elements all satisfy the given
// predicate, and one whose elements all do not satisfy the predicate.
h.partition=S(function(e,t,n){e[n?0:1].push(t)},!0),
// Array Functions
// ---------------
// Get the first element of an array. Passing **n** will return the first N
// values in the array. Aliased as `head` and `take`. The **guard** check
// allows it to work with `_.map`.
h.first=h.head=h.take=function(e,t,n){if(!(null==e||e.length<1))return null==t||n?e[0]:h.initial(e,e.length-t)},
// Returns everything but the last entry of the array. Especially useful on
// the arguments object. Passing **n** will return all the values in
// the array, excluding the last N.
h.initial=function(e,t,n){return f.call(e,0,Math.max(0,e.length-(null==t||n?1:t)))},
// Get the last element of an array. Passing **n** will return the last N
// values in the array.
h.last=function(e,t,n){if(!(null==e||e.length<1))return null==t||n?e[e.length-1]:h.rest(e,Math.max(0,e.length-t))},
// Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
// Especially useful on the arguments object. Passing an **n** will return
// the rest N values in the array.
h.rest=h.tail=h.drop=function(e,t,n){return f.call(e,null==t||n?1:t)},
// Trim out all falsy values from an array.
h.compact=function(e){return h.filter(e,Boolean)};
// Internal implementation of a recursive `flatten` function.
var N=function e(t,n,r,o){for(var u=(o=o||[]).length,i=0,a=A(t);i<a;i++){var l=t[i];if(w(l)&&(h.isArray(l)||h.isArguments(l)))
// Flatten current level of array or arguments object.
if(n)for(var c=0,f=l.length;c<f;)o[u++]=l[c++];else e(l,n,r,o),u=o.length;else r||(o[u++]=l)}return o};
// Flatten out an array, either recursively (by default), or just one level.
h.flatten=function(e,t){return N(e,t,!1)},
// Return a version of the array that does not contain the specified value(s).
h.without=_(function(e,t){return h.difference(e,t)}),
// Produce a duplicate-free version of the array. If the array has already
// been sorted, you have the option of using a faster algorithm.
// The faster algorithm will not work with an iteratee if the iteratee
// is not a one-to-one function, so providing an iteratee will disable
// the faster algorithm.
// Aliased as `unique`.
h.uniq=h.unique=function(e,t,n,r){h.isBoolean(t)||(r=n,n=t,t=!1),null!=n&&(n=b(n,r));for(var o=[],u=[],i=0,a=A(e);i<a;i++){var l=e[i],c=n?n(l,i,e):l;t&&!n?(i&&u===c||o.push(l),u=c):n?h.contains(u,c)||(u.push(c),o.push(l)):h.contains(o,l)||o.push(l)}return o},
// Produce an array that contains the union: each distinct element from all of
// the passed-in arrays.
h.union=_(function(e){return h.uniq(N(e,!0,!0))}),
// Produce an array that contains every item shared between all the
// passed-in arrays.
h.intersection=function(e){for(var t=[],n=arguments.length,r=0,o=A(e);r<o;r++){var u=e[r];if(!h.contains(t,u)){var i;for(i=1;i<n&&h.contains(arguments[i],u);i++);i===n&&t.push(u)}}return t},
// Take the difference between one array and a number of other arrays.
// Only the elements present in just the first array will remain.
h.difference=_(function(e,t){return t=N(t,!0,!0),h.filter(e,function(e){return!h.contains(t,e)})}),
// Zip together multiple lists into a single array -- elements that share
// an index go together.
h.zip=_(
// Complement of _.zip. Unzip accepts an array of arrays and groups
// each array's elements on shared indices.
h.unzip=function(e){for(var t=e&&h.max(e,A).length||0,n=Array(t),r=0;r<t;r++)n[r]=h.pluck(e,r);return n}),
// Converts lists into objects. Pass either a single array of `[key, value]`
// pairs, or two parallel arrays of the same length -- one of keys, and one of
// the corresponding values. Passing by pairs is the reverse of _.pairs.
h.object=function(e,t){for(var n={},r=0,o=A(e);r<o;r++)t?n[e[r]]=t[r]:n[e[r][0]]=e[r][1];return n};
// Generator function to create the findIndex and findLastIndex functions.
var j=function(e){return function(t,n,r){n=b(n,r);for(var o=A(t),u=e>0?0:o-1;u>=0&&u<o;u+=e)if(n(t[u],u,t))return u;return-1}};
// Returns the first index on an array-like that passes a predicate test.
h.findIndex=j(1),h.findLastIndex=j(-1);
// Generator function to create the indexOf and lastIndexOf functions.
var x=function(e,t,n){return function(r,o,u){var i=0,a=A(r);if("number"==typeof u)e>0?i=u>=0?u:Math.max(u+a,i):a=u>=0?Math.min(u+1,a):u+a+1;else if(n&&u&&a)return r[u=n(r,o)]===o?u:-1;if(o!=o)return(u=t(f.call(r,i,a),h.isNaN))>=0?u+i:-1;for(u=e>0?i:a-1;u>=0&&u<a;u+=e)if(r[u]===o)return u;return-1}};
// Return the position of the first occurrence of an item in an array,
// or -1 if the item is not included in the array.
// If the array is large and already in sort order, pass `true`
// for **isSorted** to use binary search.
h.indexOf=x(1,h.findIndex,
// Use a comparator function to figure out the smallest index at which
// an object should be inserted so as to maintain order. Uses binary search.
h.sortedIndex=function(e,t,n,r){for(var o=(n=b(n,r,1))(t),u=0,i=A(e);u<i;){var a=Math.floor((u+i)/2);n(e[a])<o?u=a+1:i=a}return u}),h.lastIndexOf=x(-1,h.findLastIndex),
// Generate an integer Array containing an arithmetic progression. A port of
// the native Python `range()` function. See
// [the Python documentation](http://docs.python.org/library/functions.html#range).
h.range=function(e,t,n){null==t&&(t=e||0,e=0),n||(n=t<e?-1:1);for(var r=Math.max(Math.ceil((t-e)/n),0),o=Array(r),u=0;u<r;u++,e+=n)o[u]=e;return o},
// Chunk a single array into multiple arrays, each containing `count` or fewer
// items.
h.chunk=function(e,t){if(null==t||t<1)return[];for(var n=[],r=0,o=e.length;r<o;)n.push(f.call(e,r,r+=t));return n};
// Function (ahem) Functions
// ------------------
// Determines whether to execute a function as a constructor
// or a normal function with the provided arguments.
var M=function(e,t,n,r,o){if(!(r instanceof t))return e.apply(n,o);var u=O(e.prototype),i=e.apply(u,o);return h.isObject(i)?i:u};
// Create a function bound to a given object (assigning `this`, and arguments,
// optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
// available.
h.bind=_(function(e,t,n){if(!h.isFunction(e))throw new TypeError("Bind must be called on a function");var r=_(function(o){return M(e,r,t,this,n.concat(o))});return r}),(
// Partially apply a function by creating a version that has had some of its
// arguments pre-filled, without changing its dynamic `this` context. _ acts
// as a placeholder by default, allowing any combination of arguments to be
// pre-filled. Set `_.partial.placeholder` for a custom placeholder argument.
h.partial=_(function(e,t){var n=h.partial.placeholder;return function r(){for(var o=0,u=t.length,i=Array(u),a=0;a<u;a++)i[a]=t[a]===n?arguments[o++]:t[a];for(;o<arguments.length;)i.push(arguments[o++]);return M(e,r,this,this,i)}})).placeholder=h,
// Bind a number of an object's methods to that object. Remaining arguments
// are the method names to be bound. Useful for ensuring that all callbacks
// defined on an object belong to it.
h.bindAll=_(function(e,t){var n=(t=N(t,!1,!1)).length;if(n<1)throw new Error("bindAll must be passed function names");for(;n--;){var r=t[n];e[r]=h.bind(e[r],e)}}),
// Memoize an expensive function by storing its results.
h.memoize=function(e,t){var n=function n(r){var o=n.cache,u=""+(t?t.apply(this,arguments):r);return h.has(o,u)||(o[u]=e.apply(this,arguments)),o[u]};return n.cache={},n},
// Delays a function for the given number of milliseconds, and then calls
// it with the arguments supplied.
h.delay=_(function(e,t,n){return setTimeout(function(){return e.apply(null,n)},t)}),
// Defers a function, scheduling it to run after the current call stack has
// cleared.
h.defer=h.partial(h.delay,h,1),
// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.
h.throttle=function(e,t,n){var r,o,u,i,a=0;n||(n={});var l=function(){a=!1===n.leading?0:h.now(),r=null,i=e.apply(o,u),r||(o=u=null)},c=function(){var c=h.now();a||!1!==n.leading||(a=c);var f=t-(c-a);return o=this,u=arguments,f<=0||f>t?(r&&(clearTimeout(r),r=null),a=c,i=e.apply(o,u),r||(o=u=null)):r||!1===n.trailing||(r=setTimeout(l,f)),i};return c.cancel=function(){clearTimeout(r),a=0,r=o=u=null},c},
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
h.debounce=function(e,t,n){var r,o,u=function(t,n){r=null,n&&(o=e.apply(t,n))},i=_(function(i){if(r&&clearTimeout(r),n){var a=!r;r=setTimeout(u,t),a&&(o=e.apply(this,i))}else r=h.delay(u,t,this,i);return o});return i.cancel=function(){clearTimeout(r),r=null},i},
// Returns the first function passed as an argument to the second,
// allowing you to adjust arguments, run code before and after, and
// conditionally execute the original function.
h.wrap=function(e,t){return h.partial(t,e)},
// Returns a negated version of the passed-in predicate.
h.negate=function(e){return function(){return!e.apply(this,arguments)}},
// Returns a function that is the composition of a list of functions, each
// consuming the return value of the function that follows.
h.compose=function(){var e=arguments,t=e.length-1;return function(){for(var n=t,r=e[t].apply(this,arguments);n--;)r=e[n].call(this,r);return r}},
// Returns a function that will only be executed on and after the Nth call.
h.after=function(e,t){return function(){if(--e<1)return t.apply(this,arguments)}},
// Returns a function that will be executed at most one time, no matter how
// often you call it. Useful for lazy initialization.
h.once=h.partial(
// Returns a function that will only be executed up to (but not including) the Nth call.
h.before=function(e,t){var n;return function(){return--e>0&&(n=t.apply(this,arguments)),e<=1&&(t=null),n}},2),h.restArguments=_;
// Object Functions
// ----------------
// Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
var L=!{toString:null}.propertyIsEnumerable("toString"),I=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"],B=function(e,t){var n=I.length,r=e.constructor,o=h.isFunction(r)&&r.prototype||a,u="constructor";for(h.has(e,u)&&!h.contains(t,u)&&t.push(u);n--;)(u=I[n])in e&&e[u]!==o[u]&&!h.contains(t,u)&&t.push(u)};
// Retrieve the names of an object's own properties.
// Delegates to **ECMAScript 5**'s native `Object.keys`.
h.keys=function(e){if(!h.isObject(e))return[];if(v)return v(e);var t=[];for(var n in e)h.has(e,n)&&t.push(n);// Ahem, IE < 9.
return L&&B(e,t),t},
// Retrieve all the property names of an object.
h.allKeys=function(e){if(!h.isObject(e))return[];var t=[];for(var n in e)t.push(n);// Ahem, IE < 9.
return L&&B(e,t),t},
// Retrieve the values of an object's properties.
h.values=function(e){for(var t=h.keys(e),n=t.length,r=Array(n),o=0;o<n;o++)r[o]=e[t[o]];return r},
// Returns the results of applying the iteratee to each element of the object.
// In contrast to _.map it returns an object.
h.mapObject=function(e,t,n){t=b(t,n);for(var r=h.keys(e),o=r.length,u={},i=0;i<o;i++){var a=r[i];u[a]=t(e[a],a,e)}return u},
// Convert an object into a list of `[key, value]` pairs.
// The opposite of _.object.
h.pairs=function(e){for(var t=h.keys(e),n=t.length,r=Array(n),o=0;o<n;o++)r[o]=[t[o],e[t[o]]];return r},
// Invert the keys and values of an object. The values must be serializable.
h.invert=function(e){for(var t={},n=h.keys(e),r=0,o=n.length;r<o;r++)t[e[n[r]]]=n[r];return t},
// Return a sorted list of the function names available on the object.
// Aliased as `methods`.
h.functions=h.methods=function(e){var t=[];for(var n in e)h.isFunction(e[n])&&t.push(n);return t.sort()};
// An internal function for creating assigner functions.
var D=function(e,t){return function(n){var r=arguments.length;if(t&&(n=Object(n)),r<2||null==n)return n;for(var o=1;o<r;o++)for(var u=arguments[o],i=e(u),a=i.length,l=0;l<a;l++){var c=i[l];t&&void 0!==n[c]||(n[c]=u[c])}return n}};
// Extend a given object with all the properties in passed-in object(s).
h.extend=D(h.allKeys),
// Assigns a given object with all the own properties in the passed-in object(s).
// (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
h.extendOwn=h.assign=D(h.keys),
// Returns the first key on an object that passes a predicate test.
h.findKey=function(e,t,n){t=b(t,n);for(var r,o=h.keys(e),u=0,i=o.length;u<i;u++)if(t(e[r=o[u]],r,e))return r};
// Internal pick helper function to determine if `obj` has key `key`.
var F,W,Q=function(e,t,n){return t in n};
// Return a copy of the object only containing the whitelisted properties.
h.pick=_(function(e,t){var n={},r=t[0];if(null==e)return n;h.isFunction(r)?(t.length>1&&(r=P(r,t[1])),t=h.allKeys(e)):(r=Q,t=N(t,!1,!1),e=Object(e));for(var o=0,u=t.length;o<u;o++){var i=t[o],a=e[i];r(a,i,e)&&(n[i]=a)}return n}),
// Return a copy of the object without the blacklisted properties.
h.omit=_(function(e,t){var n,r=t[0];return h.isFunction(r)?(r=h.negate(r),t.length>1&&(n=t[1])):(t=h.map(N(t,!1,!1),String),r=function(e,n){return!h.contains(t,n)}),h.pick(e,r,n)}),
// Fill in a given object with default properties.
h.defaults=D(h.allKeys,!0),
// Creates an object that inherits from the given prototype object.
// If additional properties are provided then they will be added to the
// created object.
h.create=function(e,t){var n=O(e);return t&&h.extendOwn(n,t),n},
// Create a (shallow-cloned) duplicate of an object.
h.clone=function(e){return h.isObject(e)?h.isArray(e)?e.slice():h.extend({},e):e},
// Invokes interceptor with the obj, and then returns obj.
// The primary purpose of this method is to "tap into" a method chain, in
// order to perform operations on intermediate results within the chain.
h.tap=function(e,t){return t(e),e},
// Returns whether an object has a given set of `key:value` pairs.
h.isMatch=function(e,t){var n=h.keys(t),r=n.length;if(null==e)return!r;for(var o=Object(e),u=0;u<r;u++){var i=n[u];if(t[i]!==o[i]||!(i in o))return!1}return!0},F=function(e,t,n,o){
// Identical objects are equal. `0 === -0`, but they aren't identical.
// See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
if(e===t)return 0!==e||1/e==1/t;
// `null` or `undefined` only equal to itself (strict comparison).
if(null==e||null==t)return!1;
// `NaN`s are equivalent, but non-reflexive.
if(e!=e)return t!=t;
// Exhaust primitive checks
var u=void 0===e?"undefined":r(e);return("function"===u||"object"===u||"object"==(void 0===t?"undefined":r(t)))&&W(e,t,n,o)},
// Internal recursive comparison function for `isEqual`.
W=function(e,t,n,o){
// Unwrap any wrapped objects.
e instanceof h&&(e=e._wrapped),t instanceof h&&(t=t._wrapped);
// Compare `[[Class]]` names.
var u=s.call(e);if(u!==s.call(t))return!1;switch(u){
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
return+e==+t;case"[object Symbol]":return l.valueOf.call(e)===l.valueOf.call(t)}var i="[object Array]"===u;if(!i){if("object"!=(void 0===e?"undefined":r(e))||"object"!=(void 0===t?"undefined":r(t)))return!1;
// Objects with different constructors are not equivalent, but `Object`s or `Array`s
// from different frames are.
var a=e.constructor,c=t.constructor;if(a!==c&&!(h.isFunction(a)&&a instanceof a&&h.isFunction(c)&&c instanceof c)&&"constructor"in e&&"constructor"in t)return!1}
// Assume equality for cyclic structures. The algorithm for detecting cyclic
// structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
// Initializing stack of traversed objects.
// It's done here since we only need them for objects and arrays comparison.
n=n||[],o=o||[];for(var f=n.length;f--;)
// Linear search. Performance is inversely proportional to the number of
// unique nested structures.
if(n[f]===e)return o[f]===t;
// Add the first object to the stack of traversed objects.
// Recursively compare objects and arrays.
if(n.push(e),o.push(t),i){if((
// Compare array lengths to determine if a deep comparison is necessary.
f=e.length)!==t.length)return!1;
// Deep compare the contents, ignoring non-numeric properties.
for(;f--;)if(!F(e[f],t[f],n,o))return!1}else{
// Deep compare objects.
var d,p=h.keys(e);
// Ensure that both objects contain the same number of properties before comparing deep equality.
if(f=p.length,h.keys(t).length!==f)return!1;for(;f--;)if(
// Deep compare each member
d=p[f],!h.has(t,d)||!F(e[d],t[d],n,o))return!1}
// Remove the first object from the stack of traversed objects.
return n.pop(),o.pop(),!0},
// Perform a deep comparison to check if two objects are equal.
h.isEqual=function(e,t){return F(e,t)},
// Is a given array, string, or object empty?
// An "empty" object has no enumerable own-properties.
h.isEmpty=function(e){return null==e||(w(e)&&(h.isArray(e)||h.isString(e)||h.isArguments(e))?0===e.length:0===h.keys(e).length)},
// Is a given value a DOM element?
h.isElement=function(e){return!(!e||1!==e.nodeType)},
// Is a given value an array?
// Delegates to ECMA5's native Array.isArray
h.isArray=p||function(e){return"[object Array]"===s.call(e)},
// Is a given variable an object?
h.isObject=function(e){var t=void 0===e?"undefined":r(e);return"function"===t||"object"===t&&!!e},
// Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError, isMap, isWeakMap, isSet, isWeakSet.
h.each(["Arguments","Function","String","Number","Date","RegExp","Error","Symbol","Map","WeakMap","Set","WeakSet"],function(e){h["is"+e]=function(t){return s.call(t)==="[object "+e+"]"}}),
// Define a fallback version of the method in browsers (ahem, IE < 9), where
// there isn't any inspectable "Arguments" type.
h.isArguments(arguments)||(h.isArguments=function(e){return h.has(e,"callee")});
// Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
// IE 11 (#1621), Safari 8 (#1929), and PhantomJS (#2236).
var Y=o.document&&o.document.childNodes;"function"!=typeof/./&&"object"!=("undefined"==typeof Int8Array?"undefined":r(Int8Array))&&"function"!=typeof Y&&(h.isFunction=function(e){return"function"==typeof e||!1}),
// Is a given object a finite number?
h.isFinite=function(e){return!h.isSymbol(e)&&isFinite(e)&&!isNaN(parseFloat(e))},
// Is the given value `NaN`?
h.isNaN=function(e){return h.isNumber(e)&&isNaN(e)},
// Is a given value a boolean?
h.isBoolean=function(e){return!0===e||!1===e||"[object Boolean]"===s.call(e)},
// Is a given value equal to null?
h.isNull=function(e){return null===e},
// Is a given variable undefined?
h.isUndefined=function(e){return void 0===e},
// Shortcut function for checking if an object has a given property directly
// on itself (in other words, not on a prototype).
h.has=function(e,t){if(!h.isArray(t))return null!=e&&d.call(e,t);for(var n=t.length,r=0;r<n;r++){var o=t[r];if(null==e||!d.call(e,o))return!1;e=e[o]}return!!n},
// Utility Functions
// -----------------
// Run Underscore.js in *noConflict* mode, returning the `_` variable to its
// previous owner. Returns a reference to the Underscore object.
h.noConflict=function(){return o._=u,this},
// Keep the identity function around for default iteratees.
h.identity=function(e){return e},
// Predicate-generating functions. Often useful outside of Underscore.
h.constant=function(e){return function(){return e}},h.noop=function(){},
// Creates a function that, when passed an object, will traverse that object’s
// properties down the given `path`, specified as an array of keys or indexes.
h.property=function(e){return h.isArray(e)?function(t){return C(t,e)}:E(e)},
// Generates a function for a given object that returns a given property.
h.propertyOf=function(e){return null==e?function(){}:function(t){return h.isArray(t)?C(e,t):e[t]}},
// Returns a predicate for checking whether an object has a given set of
// `key:value` pairs.
h.matcher=h.matches=function(e){return e=h.extendOwn({},e),function(t){return h.isMatch(t,e)}},
// Run a function **n** times.
h.times=function(e,t,n){var r=Array(Math.max(0,e));t=P(t,n,1);for(var o=0;o<e;o++)r[o]=t(o);return r},
// Return a random integer between min and max (inclusive).
h.random=function(e,t){return null==t&&(t=e,e=0),e+Math.floor(Math.random()*(t-e+1))},
// A (possibly faster) way to get the current timestamp as an integer.
h.now=Date.now||function(){return(new Date).getTime()};
// List of HTML entities for escaping.
var K={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},U=h.invert(K),V=function(e){var t=function(t){return e[t]},n="(?:"+h.keys(e).join("|")+")",r=RegExp(n),o=RegExp(n,"g");
// Regexes for identifying a key that needs to be escaped.
return function(e){return e=null==e?"":""+e,r.test(e)?e.replace(o,t):e}};h.escape=V(K),h.unescape=V(U),
// Traverses the children of `obj` along `path`. If a child is a function, it
// is invoked with its parent as context. Returns the value of the final
// child, or `fallback` if any child is undefined.
h.result=function(e,t,n){h.isArray(t)||(t=[t]);var r=t.length;if(!r)return h.isFunction(n)?n.call(e):n;for(var o=0;o<r;o++){var u=null==e?void 0:e[t[o]];void 0===u&&(u=n,o=r),e=h.isFunction(u)?u.call(e):u}return e};
// Generate a unique integer id (unique within the entire client session).
// Useful for temporary DOM ids.
var z=0;h.uniqueId=function(e){var t=++z+"";return e?e+t:t},
// By default, Underscore uses ERB-style template delimiters, change the
// following template settings to use alternative delimiters.
h.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};
// When customizing `templateSettings`, if you don't want to define an
// interpolation, evaluation or escaping regex, we need one that is
// guaranteed not to match.
var G=/(.)^/,H={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},q=/\\|'|\r|\n|\u2028|\u2029/g,$=function(e){return"\\"+H[e]};
// Certain characters need to be escaped so that they can be put into a
// string literal.
// JavaScript micro-templating, similar to John Resig's implementation.
// Underscore templating handles arbitrary delimiters, preserves whitespace,
// and correctly escapes quotes within interpolated code.
// NB: `oldSettings` only exists for backwards compatibility.
h.template=function(e,t,n){!t&&n&&(t=n),t=h.defaults({},t,h.templateSettings);
// Combine delimiters into one regular expression via alternation.
var r,o=RegExp([(t.escape||G).source,(t.interpolate||G).source,(t.evaluate||G).source].join("|")+"|$","g"),u=0,i="__p+='";
// Compile the template source, escaping string literals appropriately.
e.replace(o,function(t,n,r,o,a){
// Adobe VMs need the match returned to produce the correct offset.
return i+=e.slice(u,a).replace(q,$),u=a+t.length,n?i+="'+\n((__t=("+n+"))==null?'':_.escape(__t))+\n'":r?i+="'+\n((__t=("+r+"))==null?'':__t)+\n'":o&&(i+="';\n"+o+"\n__p+='"),t}),i+="';\n",
// If a variable is not specified, place data values in local scope.
t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{r=new Function(t.variable||"obj","_",i)}catch(e){throw e.source=i,e}var a=function(e){return r.call(this,e,h)},l=t.variable||"obj";
// Provide the compiled source as a convenience for precompilation.
return a.source="function("+l+"){\n"+i+"}",a},
// Add a "chain" function. Start chaining a wrapped Underscore object.
h.chain=function(e){var t=h(e);return t._chain=!0,t};
// OOP
// ---------------
// If Underscore is called as a function, it returns a wrapped object that
// can be used OO-style. This wrapper holds altered versions of all the
// underscore functions. Wrapped objects may be chained.
// Helper function to continue chaining intermediate results.
var J=function(e,t){return e._chain?h(t).chain():t};
// Add your own custom functions to the Underscore object.
h.mixin=function(e){return h.each(h.functions(e),function(t){var n=h[t]=e[t];h.prototype[t]=function(){var e=[this._wrapped];return c.apply(e,arguments),J(this,n.apply(h,e))}}),h},
// Add all of the Underscore functions to the wrapper object.
h.mixin(h),
// Add all mutator Array functions to the wrapper.
h.each(["pop","push","reverse","shift","sort","splice","unshift"],function(e){var t=i[e];h.prototype[e]=function(){var n=this._wrapped;return t.apply(n,arguments),"shift"!==e&&"splice"!==e||0!==n.length||delete n[0],J(this,n)}}),
// Add all accessor Array functions to the wrapper.
h.each(["concat","join","slice"],function(e){var t=i[e];h.prototype[e]=function(){return J(this,t.apply(this._wrapped,arguments))}}),
// Extracts the result from a wrapped and chained object.
h.prototype.value=function(){return this._wrapped},
// Provide unwrapping proxy for some methods used in engine operations
// such as arithmetic and JSON stringification.
h.prototype.valueOf=h.prototype.toJSON=h.prototype.value,h.prototype.toString=function(){return String(this._wrapped)},t.default=h}).call(this,n(14),n(7)(e))
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
function u(){}
// Polyfill for Function.prototype.bind
var i=function(e){if(!(this instanceof d))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],s(e,this)},a=function(e,t){for(;3===e._state;)e=e._value;0!==e._state?(e._handled=!0,d._immediateFn(function(){var n=1===e._state?t.onFulfilled:t.onRejected;if(null!==n){var r;try{r=n(e._value)}catch(e){return void c(t.promise,e)}l(t.promise,r)}else(1===e._state?l:c)(t.promise,e._value)})):e._deferreds.push(t)},l=function(e,t){try{
// Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"===(void 0===t?"undefined":r(t))||"function"==typeof t)){var n=t.then;if(t instanceof d)return e._state=3,e._value=t,void f(e);if("function"==typeof n)return void s(function(e,t){return function(){e.apply(t,arguments)}}(n,t),e)}e._state=1,e._value=t,f(e)}catch(t){c(e,t)}},c=function(e,t){e._state=2,e._value=t,f(e)},f=function(e){2===e._state&&0===e._deferreds.length&&d._immediateFn(function(){e._handled||d._unhandledRejectionFn(e._value)});for(var t=0,n=e._deferreds.length;t<n;t++)a(e,e._deferreds[t]);e._deferreds=null},s=function(e,t){var n=!1;try{e(function(e){n||(n=!0,l(t,e))},function(e){n||(n=!0,c(t,e))})}catch(e){if(n)return;n=!0,c(t,e)}};i.prototype.catch=function(e){return this.then(null,e)},i.prototype.then=function(e,t){var n=new this.constructor(u);return a(this,new function(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}(e,t,n)),n},i.prototype.finally=function(e){var t=this.constructor;return this.then(function(n){return t.resolve(e()).then(function(){return n})},function(n){return t.resolve(e()).then(function(){return t.reject(n)})})},i.all=function(e){return new d(function(t,n){if(!e||void 0===e.length)throw new TypeError("Promise.all accepts an array");var o=Array.prototype.slice.call(e);if(0===o.length)return t([]);var u=o.length;function i(e,a){try{if(a&&("object"===(void 0===a?"undefined":r(a))||"function"==typeof a)){var l=a.then;if("function"==typeof l)return void l.call(a,function(t){i(e,t)},n)}o[e]=a,0==--u&&t(o)}catch(e){n(e)}}for(var a=0;a<o.length;a++)i(a,o[a])})},i.resolve=function(e){return e&&"object"===(void 0===e?"undefined":r(e))&&e.constructor===d?e:new d(function(t){t(e)})},i.reject=function(e){return new d(function(t,n){n(e)})},i.race=function(e){return new d(function(t,n){for(var r=0,o=e.length;r<o;r++)e[r].then(t,n)})},
// Use polyfill for setImmediate for performance gains
i._immediateFn="function"==typeof o&&function(e){o(e)}||function(e){o(e,0)},i._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)};var d=window.Promise||(window.Promise=i);t.resolved=d.resolve();t.default=d},
/* 5 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(2);
/**
 * @brief   This finds the provider that matches the input source.
 * @param
 * */t.default=function(){var e={};OvenPlayerConsole.log("SupportChecker loaded.");var t=[{name:"html5",checkSupport:function(e){var t=document.createElement("video");if(!t.canPlayType)return!1;var n=e.file,o=e.type;if(!o)return!1;var u=e.mimeType||{aac:"audio/mp4",mp4:"video/mp4",f4v:"video/mp4",m4v:"video/mp4",mov:"video/mp4",mp3:"audio/mpeg",mpeg:"audio/mpeg",ogv:"video/ogg",ogg:"video/ogg",oga:"video/ogg",vorbis:"video/ogg",webm:"video/webm",f4a:"video/aac",m3u8:"application/vnd.apple.mpegurl",m3u:"application/vnd.apple.mpegurl",hls:"application/vnd.apple.mpegurl"}[o];return!((0,r.isRtmp)(n,o)||(0,r.isWebRTC)(n,o)||!u||!t.canPlayType(u))}},{name:"webrtc",checkSupport:function(e){if(!document.createElement("video").canPlayType)return!1;var t=e.file,n=e.type;return!!(0,r.isWebRTC)(t,n)}},{name:"dash",checkSupport:function(e){var t=e.file,n=e.type;
//mpd application/dash+xml
return!!(0,r.isDash)(t,n)}},{name:"hls",checkSupport:function(e){var t=document.createElement("video");
//this method from hls.js
//Remove this '!!video.canPlayType('application/vnd.apple.mpegurl')' if you want to use hlsjs.
return function(){var e=function(){if("undefined"!=typeof window)return window.MediaSource||window.WebKitMediaSource}(),t=window.SourceBuffer||window.WebKitSourceBuffer,n=e&&"function"==typeof e.isTypeSupported&&e.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"'),r=!t||t.prototype&&"function"==typeof t.prototype.appendBuffer&&"function"==typeof t.prototype.remove;return!!n&&!!r}()&&!!t.canPlayType("application/vnd.apple.mpegurl")}}];return e.findProviderNameBySource=function(e){OvenPlayerConsole.log("SupportChecker : findProviderNameBySource()",e);for(var n=e===Object(e)?e:{},r=0;r<t.length;r++)if(t[r].checkSupport(n))return t[r].name},e.findProviderNamesByPlaylist=function(t){OvenPlayerConsole.log("SupportChecker : findProviderNamesByPlaylist()",t);for(var n=[],r=t.length;r--;)for(var o=t[r],u="",i=0;i<o.sources.length;i++)if(u=o.sources[i]){var a=e.findProviderNameBySource(u);a&&n.push(a)}return n},e}},
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
t.STATE_BUFFERING="buffering",t.STATE_IDLE="idle";var r=t.STATE_COMPLETE="complete";t.STATE_PAUSED="paused",t.STATE_PLAYING="playing",t.STATE_ERROR="error",t.STATE_LOADING="loading",t.STATE_STALLED="stalled",t.PROVIDER_HTML5="html5",t.PROVIDER_WEBRTC="webrtc",t.PROVIDER_DASH="dash",t.PROVIDER_HLS="hls",t.CONTENT_COMPLETE=r,t.READY="ready",t.DESTROY="destroy",t.CONTENT_SEEK="seek",t.CONTENT_BUFFER_FULL="bufferFull",t.DISPLAY_CLICK="displayClick",t.CONTENT_LOADED="loaded",t.CONTENT_SEEKED="seeked",t.NETWORK_UNSTABLE="unstable",t.ERROR="error",t.PLAYER_STATE="stateChanged",t.PLAYER_COMPLETE=r,t.PLAYER_PAUSE="pause",t.PLAYER_PLAY="play",t.CONTENT_BUFFER="bufferChanged",t.CONTENT_TIME="time",t.CONTENT_RATE_CHANGE="ratechange",t.CONTENT_VOLUME="volumeChanged",t.CONTENT_MUTE="mute",t.CONTENT_META="metaChanged",t.CONTENT_LEVELS="qualityLevelChanged",t.CONTENT_LEVEL_CHANGED="currentQualityLevelChanged",t.PLAYBACK_RATE_CHANGED="playbackRateChanged",t.CONTENT_CAPTION_CUE_CHANGED="cueChanged",t.CONTENT_CAPTION_CHANGED="captionChanged",t.INIT_ERROR=100,t.PLAYER_UNKNWON_ERROR=300,t.PLAYER_UNKNWON_OPERATION_ERROR=301,t.PLAYER_UNKNWON_NEWWORK_ERROR=302,t.PLAYER_UNKNWON_DECODE_ERROR=303,t.PLAYER_FILE_ERROR=304,t.PLAYER_CAPTION_ERROR=305,t.PLAYER_WEBRTC_WS_ERROR=501,t.PLAYER_WEBRTC_WS_CLOSED=502,t.PLAYER_WEBRTC_ADD_ICECANDIDATE_ERROR=503,t.PLAYER_WEBRTC_SET_REMOTE_DESC_ERROR=504,t.PLAYER_WEBRTC_CREATE_ANSWER_ERROR=505,t.PLAYER_WEBRTC_SET_LOCAL_DESC_ERROR=506},
/* 9 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){var t=e,n=[],r=function(e,t,n){var r=0,o=e.length;for(r=0;r<o;r++){var u=e[r];u.listener.apply(u.context||n,t)}};return t.on=function(e,r,o){return(n[e]||(n[e]=[])).push({listener:r,context:o}),t},t.trigger=function(e){if(!n)return!1;var o=[].slice.call(arguments,1),u=n[e],i=n.all;u&&r(u,o,t),i&&r(i,arguments,t)},t.off=function(e,r,o){if(!n)return!1;if(!e&&!r&&!o)return n=[],t;for(var u=e?[e]:Object.keys(n),i=0,a=u.length;i<a;i++){e=u[i];var l=n[e];if(l){var c=n[e]=[];if(r||o)for(var f=0,s=l.length;f<s;f++){var d=l[f];(r&&r!==d.listener&&r!==d.listener.listener&&r!==d.listener._callback||o&&o!==d.context)&&c.push(d)}c.length||delete n[e]}}return t},t.once=function(e,n,r){var o=0,u=function r(){o++||(t.off(e,r),n.apply(t,arguments))};return u._listener=n,t.on(e,u,r)},t}},
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
t.version="0.6.3-rev.8b5d025";
/***/},
/* 16 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=u(n(5)),o=u(n(4));function u(e){return e&&e.__esModule?e:{default:e}}
/**
 * @brief   This manages provider.
 * @param
 * */t.default=function(){var e=(0,r.default)(),t={},u={};OvenPlayerConsole.log("ProviderController loaded.");var i=function(e,n){t[e]||(OvenPlayerConsole.log("ProviderController _registerProvider() ",e),t[e]=n)},a={html5:function(){return n.e(/* require.ensure | ovenplayer.provider.html5 */2).then(function(e){var t=n(13).default;return i("html5",t),t}.bind(null,n)).catch(function(e){throw new Error("Network error")})},webrtc:function(){return n.e(/* require.ensure | ovenplayer.provider.HlsProvider */1).then(function(e){var t=n(12).default;return i("webrtc",t),t}.bind(null,n)).catch(function(e){throw new Error("Network error")})},dash:function(){return n.e(/* require.ensure | ovenplayer.provider.DashProvider */0).then(function(e){var r=n(11).default;return t.dash=r,i("dash",r),r}.bind(null,n)).catch(function(e){throw new Error("Network error")})},hls:function(){return n.e(/* require.ensure | ovenplayer.provider.HlsProvider */1).then(function(e){var t=n(10).default;return i("hls",t),t}.bind(null,n)).catch(function(e){throw new Error("Network error")})}};return u.loadProviders=function(t){var n=e.findProviderNamesByPlaylist(t);return OvenPlayerConsole.log("ProviderController loadProviders() ",n),o.default.all(n.filter(function(e){return!!a[e]}).map(function(e){return a[e]()}))},u.findByName=function(e){return OvenPlayerConsole.log("ProviderController findByName() ",e),t[e]},u.getProviderBySource=function(t){var n=e.findProviderNameBySource(t);return OvenPlayerConsole.log("ProviderController getProviderBySource() ",n),u.findByName(n)},u.isSameProvider=function(t,n){return OvenPlayerConsole.log("ProviderController isSameProvider() ",e.findProviderNameBySource(t),e.findProviderNameBySource(n)),e.findProviderNameBySource(t)==e.findProviderNameBySource(n)},u}},
/* 17 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=l(n(1)),u=n(2),i=n(3),a=l(n(5));function l(e){return e&&e.__esModule?e:{default:e}}
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
t.sources[u].label||(t.sources[u].label=u.toString()),i=l(t.sources[u]),n.findProviderNameBySource(i)?t.sources[u]=i:t.sources[u]=null}}return t.sources=t.sources.filter(function(e){return!!e}),
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
 * */(n(1));t.default=function(e,t){var n=[],o={},u=!1,i={};OvenPlayerConsole.log("LazyCommandExecutor loaded."),t.forEach(function(t){var n=e[t];o[t]=n||function(){},e[t]=function(){var e=Array.prototype.slice.call(arguments,0);u?(a(),n&&n.apply(i,e)):
//commandQueue.push({ command, args });
i.addQueue(t,e)}});var a=function(){for(;n.length>0;){var t=n.shift(),r=t.command,u=t.args;(o[r]||e[r]).apply(e,u)}};return i.setExecuteMode=function(e){u=e,OvenPlayerConsole.log("LazyCommandExecutor : setExecuteMode()",e)},i.getUndecoratedMethods=function(){return OvenPlayerConsole.log("LazyCommandExecutor : getUndecoratedMethods()",o),o},i.getQueue=function(){return OvenPlayerConsole.log("LazyCommandExecutor : getQueue()",getQueue),n},i.addQueue=function(e,t){OvenPlayerConsole.log("LazyCommandExecutor : addQueue()",e,t),n.push({command:e,args:t})},i.flush=function(){OvenPlayerConsole.log("LazyCommandExecutor : flush()"),a()},i.empty=function(){OvenPlayerConsole.log("LazyCommandExecutor : empty()"),n.length=0},i.off=function(){OvenPlayerConsole.log("LazyCommandExecutor : off()"),t.forEach(function(t){var n=o[t];n&&(e[t]=n,delete o[t])})},
//Run once at the end
i.removeAndExcuteOnce=function(t){var u=r.default.findWhere(n,{command:t});OvenPlayerConsole.log("LazyCommandExecutor : removeAndExcuteOnce()",t),n.splice(r.default.findIndex(n,{command:t}),1);var i=o[t];i&&(OvenPlayerConsole.log("removeCommand()"),u&&(i||e[t]).apply(e,u.args),e[t]=i,delete o[t])},i.destroy=function(){OvenPlayerConsole.log("LazyCommandExecutor : destroy()"),i.off(),i.empty()},i}},
/* 21 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(e){return e&&e.__esModule?e:{default:e}}
/**
 * @brief   This initializes the input options.
 * @param   options
 *
 * */(n(1));t.default=function(e){OvenPlayerConsole.log("Configurator loaded.",e);var t=function(e){var t=function(e){return e.slice&&"px"===e.slice(-2)&&(e=e.slice(0,-2)),e};!function(e){Object.keys(e).forEach(function(t){"id"!==t&&(e[t]=function(e){if(void 0===e)return null;if("string"==typeof e&&e.length<6){var t=e.toLowerCase();if("true"===t)return!0;if("false"===t)return!1;if(!isNaN(Number(e))&&!isNaN(parseFloat(e)))return Number(e)}return e}(e[t]))})}(e);var n=r({},{defaultPlaybackRate:1,playbackRateControls:!1,playbackRates:[.5,1,1.25,1.5,2],mute:!1,volume:90,width:640,height:360},e);n.width=t(n.width),n.height=t(n.height),n.aspectratio=function(e,t){if(-1===t.toString().indexOf("%"))return 0;if("string"!=typeof e||!e)return 0;if(/^\d*\.?\d+%$/.test(e))return e;var n=e.indexOf(":");if(-1===n)return 0;var r=parseFloat(e.substr(0,n)),o=parseFloat(e.substr(n+1));return r<=0||o<=0?0:o/r*100+"%"}(n.aspectratio,n.width);var u=n.playbackRateControls;if(u){var i=n.playbackRates;Array.isArray(u)&&(i=u),(i=i.filter(function(e){return o.default.isNumber(e)&&e>=.25&&e<=4}).map(function(e){return Math.round(4*e)/4})).indexOf(1)<0&&i.push(1),i.sort(),n.playbackRateControls=!0,n.playbackRates=i}(!n.playbackRateControls||n.playbackRates.indexOf(n.defaultPlaybackRate)<0)&&(n.defaultPlaybackRate=1),n.playbackRate=n.defaultPlaybackRate,n.aspectratio||delete n.aspectratio;var a=n.playlist;if(a)o.default.isArray(a.playlist)&&(n.feedData=a,n.playlist=a.playlist);else{var l=o.default.pick(n,["title","description","type","mediaid","image","file","sources","tracks","preload","duration","host","application","stream"]);n.playlist=[l]}return delete n.duration,n}(e),n=t.aspectratio||"16:9",u=t.debug,i=t.defaultPlaybackRate||1,a=(t.image,t.playbackRateControls||!0),l=t.playbackRates||[.5,1,1.25,1.5,2],c=t.playlist||[],f=t.qualityLabel||"",s=t.repeat||!1,d=t.stretching||"uniform",p={getConfig:function(){return t},getAspectratio:function(){return n},setAspectratio:function(e){n=e},isDebug:function(){return u},getDefaultPlaybackRate:function(){return i},setDefaultPlaybackRate:function(e){return i=e,e},getQualityLabel:function(){return f},setQualityLabel:function(e){f=e},getPlaybackRates:function(){return l},isPlaybackRateControls:function(){return a},getPlaylist:function(){return c},setPlaylist:function(e){return c=o.default.isArray(e)?e:[e]},isRepeat:function(){return s},getStretching:function(){return d}};return p}},
/* 22 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=d(n(21)),o=d(n(9)),u=d(n(20)),i=d(n(19)),a=d(n(18)),l=d(n(17)),c=d(n(16)),f=(d(n(4)),n(8)),s=n(15);function d(e){return e&&e.__esModule?e:{default:e}}
/**
 * @brief   This object connects UI to the provider.
 * @param   {object}    container  dom element
 *
 * */
//import CaptionManager from "api/caption/Manager";
t.default=function(e){var t=(0,i.default)(),n={};(0,o.default)(n),OvenPlayerConsole.log("[[OvenPlayer]] v."+s.version),OvenPlayerConsole.log("API loaded.");
//let captionManager = CaptionManager(that);
var d=(0,a.default)(e),p=(0,l.default)(),v=(0,c.default)(),y="",g="",h="",m=function(e){return v.loadProviders(p.getPlaylist()).then(function(e){y&&(y.destroy(),y=null);var t=d.createElement(),r=function(e){var t=0;if(e)for(var n=0;n<e.length;n++)if(e[n].default&&(t=n),g.getQualityLabel()&&e[n].label===g.getQualityLabel())return n;return t}(p.getCurrentSources());OvenPlayerConsole.log("current source index : "+r),
//This passes the event created by the Provider to API.
(y=e[r](t,g)).on("all",function(e,t){
//Auto next source when player load was fail by amiss source.
if(e===f.ERROR&&(t.code===f.PLAYER_FILE_ERROR||5===parseInt(t.code/100))||e===f.NETWORK_UNSTABLE){var r=n.getCurrentQuality();n.setCurrentQuality(r+1)}n.trigger(e,t)})}).then(function(){y.preload(p.getCurrentSources(),e),h.flush(),
//This is no reason to exist anymore.
h.destroy(),n.trigger(f.READY)}).catch(function(e){var t={code:f.INIT_ERROR,reason:"init error.",message:"Player init error.",error:e};n.trigger(f.ERROR,t),
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
h=(0,u.default)(n,["load","play","pause","seek","stop","getDuration","getPosition","getVolume","getMute","getBuffer","getState"]),(g=(0,r.default)(e)).isDebug()||t.disable(),OvenPlayerConsole.log("API : init()"),OvenPlayerConsole.log("API : init() config : ",g),p.setPlaylist(g.getPlaylist()),OvenPlayerConsole.log("API : init() sources : ",p.getCurrentSources()),m()},n.getConfig=function(){return OvenPlayerConsole.log("API : getConfig()",g.getConfig()),g.getConfig()},n.getDuration=function(){return OvenPlayerConsole.log("API : getDuration()",y.getDuration()),y.getDuration()},n.getPosition=function(){return OvenPlayerConsole.log("API : getPosition()",y.getPosition()),y.getPosition()},n.getVolume=function(){return OvenPlayerConsole.log("API : getVolume()",y.getVolume()),y.getVolume()},n.setVolume=function(e){OvenPlayerConsole.log("API : setVolume() "+e),y.setVolume(e)},n.setMute=function(e){return OvenPlayerConsole.log("API : setMute() "+e),y.setMute(e)},n.getMute=function(){return OvenPlayerConsole.log("API : getMute() "+y.getMute()),y.getMute()},n.load=function(e){return OvenPlayerConsole.log("API : load() ",e),h=(0,u.default)(n,["play","seek","stop"]),e&&(y.setCurrentQuality(0),p.setPlaylist(e)),m()},n.play=function(){OvenPlayerConsole.log("API : play() "),y.play()},n.pause=function(){OvenPlayerConsole.log("API : pause() "),y.pause()},n.seek=function(e){OvenPlayerConsole.log("API : seek() "+e),y.seek(e)},n.setPlaybackRate=function(e){return OvenPlayerConsole.log("API : setPlaybackRate() ",e),y.setPlaybackRate(g.setDefaultPlaybackRate(e))},n.getPlaybackRate=function(){return OvenPlayerConsole.log("API : getPlaybackRate() ",y.getPlaybackRate()),y.getPlaybackRate()},n.getQualityLevels=function(){return OvenPlayerConsole.log("API : getQualityLevels() ",y.getQualityLevels()),y.getQualityLevels()},n.getCurrentQuality=function(){return OvenPlayerConsole.log("API : getCurrentQuality() ",y.getCurrentQuality()),y.getCurrentQuality()},n.setCurrentQuality=function(e){OvenPlayerConsole.log("API : setCurrentQuality() ",e);var t=p.getCurrentSources(),r=t[n.getCurrentQuality()],o=t[e],i=n.getPosition(),a=v.isSameProvider(r,o),l=y.setCurrentQuality(e,a);return o?(OvenPlayerConsole.log("API : setCurrentQuality() isSameProvider",a),a||(h=(0,u.default)(n,["play"]),m(i)),l):null},
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
n.getBuffer=function(){OvenPlayerConsole.log("API : getBuffer() ",y.getBuffer()),y.getBuffer()},n.getState=function(){return OvenPlayerConsole.log("API : getState() ",y.getState()),y.getState()},n.stop=function(){OvenPlayerConsole.log("API : stop() "),y.stop()},n.remove=function(){OvenPlayerConsole.log("API : remove() "),h.destroy(),y.destroy(),y=null,v=null,p=null,g=null,n.trigger(f.DESTROY),n.off(),OvenPlayerConsole.log("API : remove() - lazyQueue, currentProvider, providerController, playlistManager, playerConfig, api event destroed. "),t.destroy()},n}},
/* 23 */
/***/function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.checkAndGetContainerElement=void 0;var r=a(n(22)),o=n(2),u=a(n(1)),i=n(6);function a(e){return e&&e.__esModule?e:{default:e}}n.p=(0,i.getScriptPath)("ovenplayer.sdk.js");
/**
 * Main OvenPlayerSDK object
 */
var l=window.OvenPlayerSDK={},c=l.playerList=[],f=t.checkAndGetContainerElement=function(e){if(!e)
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
l.create=function(e,t){var n=f(e),o=(0,r.default)(n);return o.init(t),c.push(o),o},
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
l.generateWebrtcUrls=function(e){return(u.default.isArray(e)?e:[e]).map(function(e,t){if(e.host&&(0,o.isWebRTC)(e.host)&&e.application&&e.stream)return{file:e.host+"/"+e.application+"/"+e.stream,type:"webrtc",label:e.label?e.label:"webrtc-"+(t+1)}})},t.default=l}
/******/]);
//# sourceMappingURL=ovenplayer.sdk.js.map