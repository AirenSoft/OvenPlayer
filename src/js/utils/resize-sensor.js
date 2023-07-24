(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], function () {
            return (root.returnExportsGlobal = factory());
        });
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        root['ResizeSensor'] = factory();
    }
}(this, function () {

    var ResizeSensor = function () {
        'use strict';
        var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (fn) {
            return window.setTimeout(fn, 20);
        };
        /**
         *
         * @constructor
         */
        function EventQueue() {
            this.q = [];
            this.add = function (ev) {
                this.q.push(ev);
            };
            var i, j;
            this.call = function () {
                for (i = 0, j = this.q.length; i < j; i++) {
                    this.q[i].call();
                }
            };
        }
        /**
         * @param {HTMLElement} element
         * @param {String}      prop
         * @returns {String|Number}
         */
        function getComputedStyle(element, prop) {
            if (element.currentStyle) {
                return element.currentStyle[prop];
            } else if (window.getComputedStyle) {
                return window.getComputedStyle(element, null).getPropertyValue(prop);
            } else {
                return element.style[prop];
            }
        }
        /**
         *
         * @param {HTMLElement} element
         * @param {Function}    resized
         */
        function attachResizeEvent(element, resized) {
            if (!element.resizedAttached) {
                element.resizedAttached = new EventQueue();
                element.resizedAttached.add(resized);
            } else if (element.resizedAttached) {
                element.resizedAttached.add(resized);
                return;
            }
            element.resizeSensor = document.createElement('div');
            element.resizeSensor.className = 'resize-sensor';
            var style = 'position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden; opacity: 0;direction: ltr;';
            var styleChild = 'position: absolute; left: 0; top: 0; transition: 0s;';
            element.resizeSensor.style.cssText = style;
            element.resizeSensor.innerHTML = '<div class="resize-sensor-expand" style="' + style + '">' + '<div style="' + styleChild + '"></div>' + '</div>' + '<div class="resize-sensor-shrink" style="' + style + '">' + '<div style="' + styleChild + ' width: 200%; height: 200%"></div>' + '</div>';
            element.appendChild(element.resizeSensor);
            if (getComputedStyle(element, 'position') == 'static') {
                element.style.position = 'relative';
            }
            var expand = element.resizeSensor.childNodes[0];
            var expandChild = expand.childNodes[0];
            var shrink = element.resizeSensor.childNodes[1];
            var reset = function () {
                expandChild.style.width = 100000 + 'px';
                expandChild.style.height = 100000 + 'px';
                expand.scrollLeft = 100000;
                expand.scrollTop = 100000;
                shrink.scrollLeft = 100000;
                shrink.scrollTop = 100000;
            };
            reset();
            var dirty = false;
            var dirtyChecking = function () {
                if (!element.resizedAttached)
                    return;
                if (dirty) {
                    element.resizedAttached.call();
                    dirty = false;
                }
                requestAnimationFrame(dirtyChecking);
            };
            requestAnimationFrame(dirtyChecking);
            var lastWidth, lastHeight;
            var cachedWidth, cachedHeight;
            //useful to not query offsetWidth twice
            var onScroll = function () {
                if ((cachedWidth = element.offsetWidth) != lastWidth || (cachedHeight = element.offsetHeight) != lastHeight) {
                    dirty = true;
                    lastWidth = cachedWidth;
                    lastHeight = cachedHeight;
                }
                reset();
            };
            var addEvent = function (el, name, cb) {
                if (el.attachEvent) {
                    el.attachEvent('on' + name, cb);
                } else {
                    el.addEventListener(name, cb);
                }
            };
            addEvent(expand, 'scroll', onScroll);
            addEvent(shrink, 'scroll', onScroll);
        }
        /**
         * Class for dimension change detection.
         *
         * @param {Element|Element[]|Elements|jQuery} element
         * @param {Function} callback
         *
         * @constructor
         */
        var ResizeSensor = function (element, callback) {
            var me = this;
            var elementType = Object.prototype.toString.call(element);
            var isCollectionTyped = me._isCollectionTyped = '[object Array]' === elementType || '[object NodeList]' === elementType || '[object HTMLCollection]' === elementType || 'undefined' !== typeof jQuery && element instanceof window.jQuery || 'undefined' !== typeof Elements && element instanceof window.Elements;
            me._element = element;
            if (isCollectionTyped) {
                var i = 0, j = element.length;
                for (; i < j; i++) {
                    attachResizeEvent(element[i], callback);
                }
            } else {
                attachResizeEvent(element, callback);
            }
        };
        ResizeSensor.prototype.detach = function () {
            var me = this;
            var isCollectionTyped = me._isCollectionTyped;
            var element = me._element;
            if (isCollectionTyped) {
                var i = 0, j = element.length;
                for (; i < j; i++) {
                    ResizeSensor.detach(element[i]);
                }
            } else {
                ResizeSensor.detach(element);
            }
        };
        ResizeSensor.detach = function (element) {
            if (element.resizeSensor) {
                if (element.hasChildNodes()) {
                    element.removeChild(element.resizeSensor);
                }
                delete element.resizeSensor;
                delete element.resizedAttached;
            }
        };
        return ResizeSensor;
    }();

    return ResizeSensor;

}));
