/*! OvenPlayer | (c) 2021 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["downloader"],{

/***/ "./src/js/utils/downloader.js":
/*!************************************!*\
  !*** ./src/js/utils/downloader.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _iconvLite = __webpack_require__(/*! iconv-lite */ "./node_modules/iconv-lite/lib/index.js");

var _iconvLite2 = _interopRequireDefault(_iconvLite);

var _chardet = __webpack_require__(/*! chardet */ "./node_modules/chardet/index.js");

var _chardet2 = _interopRequireDefault(_chardet);

var _http = __webpack_require__(/*! http */ "./node_modules/stream-http/index.js");

var _http2 = _interopRequireDefault(_http);

var _url = __webpack_require__(/*! url */ "./node_modules/url/url.js");

var _url2 = _interopRequireDefault(_url);

var _path = __webpack_require__(/*! path */ "./node_modules/path-browserify/index.js");

var _path2 = _interopRequireDefault(_path);

var _querystring = __webpack_require__(/*! querystring */ "./node_modules/querystring-es3/index.js");

var _querystring2 = _interopRequireDefault(_querystring);

var _underscore = __webpack_require__(/*! utils/underscore */ "./src/js/utils/underscore.js");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @description
 * http request
 * @param {object|string} [options]
 * @param {function} [callback]
 * @example
 * request('url', function(err, res, body) { });
 * request({url: '', headers: {}, method: 'POST'}, function(err, res, body) { });
 */
function request(options, callback) {
    var opts = {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET',
        encoding: 'utf8',
        // If the callback body is buffer, it can hanlder document pipe simply
        isBuffer: false,
        json: false
    };

    if (_underscore2["default"].isString(options)) {
        opts.url = options;
    } else {
        _underscore2["default"].extend(opts, options);
    }

    // Append request data
    if (opts.data) {
        if (opts.method === 'GET') {
            opts.url += '?' + _querystring2["default"].stringify(opts.data);
        } else {
            opts.data = JSON.stringify(opts.data);
            opts.headers['Content-Length'] = new Buffer(opts.data).length;
        }
    }

    // Extend request url object
    //2018-12-14 underdog@airensoft.com Added 'protocol' params. cus This is don't loading https file.
    _underscore2["default"].extend(opts, _underscore2["default"].pick(_url2["default"].parse(opts.url), 'protocol', 'hostname', 'port', 'path', 'auth'));
    delete opts.url;

    var req = _http2["default"].request(opts, function (res) {
        var body = [];
        var size = 0;

        res.on('data', function (chunk) {
            body.push(chunk);
            size += chunk.length;
        });

        res.on('end', function () {
            var result = '';

            // Buffer
            if (opts.isBuffer) {
                result = Buffer.concat(body, size);
            } else {
                var buffer = new Buffer(size);
                for (var i = 0, pos = 0, l = body.length; i < l; i++) {
                    var chunk = body[i];
                    chunk.copy(buffer, pos);
                    pos += chunk.length;
                }
                result = _iconvLite2["default"].decode(buffer, _chardet2["default"].detect(buffer)).toString(); //buffer.toString(opts.encoding);

                if (opts.json) {
                    result = JSON.parse(result);
                }
            }

            callback(null, res, result);
        });
    });

    req.on('error', callback);

    if (opts.method !== 'GET' && opts.data) {
        req.write(opts.data);
    }

    req.end();
} /**
   * https://github.com/Tickaroo/request-ajax
   *
   * @fileoverview Http request in node.js
   * @author douzi <liaowei08@gmail.com>
   */

//2018-12-14 underdog@airensoft.com pre decoding
exports["default"] = request;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ 0:
/*!***************************!*\
  !*** ./streams (ignored) ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1:
/*!*******************************!*\
  !*** ./extend-node (ignored) ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvZG93bmxvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zdHJlYW1zIChpZ25vcmVkKSIsIndlYnBhY2s6Ly8vLi9leHRlbmQtbm9kZSAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vL3V0aWwgKGlnbm9yZWQpIiwid2VicGFjazovLy91dGlsIChpZ25vcmVkKT9iYTMzIl0sIm5hbWVzIjpbInJlcXVlc3QiLCJvcHRpb25zIiwiY2FsbGJhY2siLCJvcHRzIiwiaGVhZGVycyIsIm1ldGhvZCIsImVuY29kaW5nIiwiaXNCdWZmZXIiLCJqc29uIiwiXyIsImlzU3RyaW5nIiwidXJsIiwiZXh0ZW5kIiwiZGF0YSIsInF1ZXJ5c3RyaW5nIiwic3RyaW5naWZ5IiwiSlNPTiIsIkJ1ZmZlciIsImxlbmd0aCIsInBpY2siLCJwYXJzZSIsInJlcSIsImh0dHAiLCJyZXMiLCJib2R5Iiwic2l6ZSIsIm9uIiwiY2h1bmsiLCJwdXNoIiwicmVzdWx0IiwiY29uY2F0IiwiYnVmZmVyIiwiaSIsInBvcyIsImwiLCJjb3B5IiwiSWNvbnYiLCJkZWNvZGUiLCJDaGFyZGV0IiwiZGV0ZWN0IiwidG9TdHJpbmciLCJ3cml0ZSIsImVuZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFRQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUE7Ozs7Ozs7OztBQVNBLFNBQVNBLE9BQVQsQ0FBaUJDLE9BQWpCLEVBQTBCQyxRQUExQixFQUFvQztBQUNoQyxRQUFJQyxPQUFPO0FBQ1BDLGlCQUFTO0FBQ0wsNEJBQWdCO0FBRFgsU0FERjtBQUlQQyxnQkFBUSxLQUpEO0FBS1BDLGtCQUFVLE1BTEg7QUFNUDtBQUNBQyxrQkFBVSxLQVBIO0FBUVBDLGNBQU07QUFSQyxLQUFYOztBQVdBLFFBQUlDLHdCQUFFQyxRQUFGLENBQVdULE9BQVgsQ0FBSixFQUF5QjtBQUNyQkUsYUFBS1EsR0FBTCxHQUFXVixPQUFYO0FBQ0gsS0FGRCxNQUVPO0FBQ0hRLGdDQUFFRyxNQUFGLENBQVNULElBQVQsRUFBZUYsT0FBZjtBQUNIOztBQUVEO0FBQ0EsUUFBSUUsS0FBS1UsSUFBVCxFQUFlO0FBQ1gsWUFBSVYsS0FBS0UsTUFBTCxLQUFnQixLQUFwQixFQUEyQjtBQUN2QkYsaUJBQUtRLEdBQUwsSUFBWSxNQUFNRyx5QkFBWUMsU0FBWixDQUFzQlosS0FBS1UsSUFBM0IsQ0FBbEI7QUFDSCxTQUZELE1BRU87QUFDSFYsaUJBQUtVLElBQUwsR0FBWUcsS0FBS0QsU0FBTCxDQUFlWixLQUFLVSxJQUFwQixDQUFaO0FBQ0FWLGlCQUFLQyxPQUFMLENBQWEsZ0JBQWIsSUFBaUMsSUFBSWEsTUFBSixDQUFXZCxLQUFLVSxJQUFoQixFQUFzQkssTUFBdkQ7QUFDSDtBQUNKOztBQUVEO0FBQ0E7QUFDQVQsNEJBQUVHLE1BQUYsQ0FBU1QsSUFBVCxFQUFlTSx3QkFBRVUsSUFBRixDQUFPUixpQkFBSVMsS0FBSixDQUFVakIsS0FBS1EsR0FBZixDQUFQLEVBQTRCLFVBQTVCLEVBQXdDLFVBQXhDLEVBQW9ELE1BQXBELEVBQTRELE1BQTVELEVBQW9FLE1BQXBFLENBQWY7QUFDQSxXQUFPUixLQUFLUSxHQUFaOztBQUVBLFFBQUlVLE1BQU1DLGtCQUFLdEIsT0FBTCxDQUFhRyxJQUFiLEVBQW1CLFVBQVNvQixHQUFULEVBQWM7QUFDdkMsWUFBSUMsT0FBTyxFQUFYO0FBQ0EsWUFBSUMsT0FBTyxDQUFYOztBQUVBRixZQUFJRyxFQUFKLENBQU8sTUFBUCxFQUFlLFVBQVNDLEtBQVQsRUFBZ0I7QUFDM0JILGlCQUFLSSxJQUFMLENBQVVELEtBQVY7QUFDQUYsb0JBQVFFLE1BQU1ULE1BQWQ7QUFDSCxTQUhEOztBQUtBSyxZQUFJRyxFQUFKLENBQU8sS0FBUCxFQUFjLFlBQVc7QUFDckIsZ0JBQUlHLFNBQVMsRUFBYjs7QUFFQTtBQUNBLGdCQUFJMUIsS0FBS0ksUUFBVCxFQUFtQjtBQUNmc0IseUJBQVVaLE9BQU9hLE1BQVAsQ0FBY04sSUFBZCxFQUFvQkMsSUFBcEIsQ0FBVjtBQUNILGFBRkQsTUFFTztBQUNILG9CQUFJTSxTQUFTLElBQUlkLE1BQUosQ0FBV1EsSUFBWCxDQUFiO0FBQ0EscUJBQUssSUFBSU8sSUFBSSxDQUFSLEVBQVdDLE1BQU0sQ0FBakIsRUFBb0JDLElBQUlWLEtBQUtOLE1BQWxDLEVBQTBDYyxJQUFJRSxDQUE5QyxFQUFpREYsR0FBakQsRUFBc0Q7QUFDbEQsd0JBQUlMLFFBQVFILEtBQUtRLENBQUwsQ0FBWjtBQUNBTCwwQkFBTVEsSUFBTixDQUFXSixNQUFYLEVBQW1CRSxHQUFuQjtBQUNBQSwyQkFBT04sTUFBTVQsTUFBYjtBQUNIO0FBQ0RXLHlCQUFTTyx1QkFBTUMsTUFBTixDQUFhTixNQUFiLEVBQXFCTyxxQkFBUUMsTUFBUixDQUFlUixNQUFmLENBQXJCLEVBQTZDUyxRQUE3QyxFQUFULENBUEcsQ0FPK0Q7O0FBRWxFLG9CQUFJckMsS0FBS0ssSUFBVCxFQUFlO0FBQ1hxQiw2QkFBU2IsS0FBS0ksS0FBTCxDQUFXUyxNQUFYLENBQVQ7QUFDSDtBQUNKOztBQUVEM0IscUJBQVMsSUFBVCxFQUFlcUIsR0FBZixFQUFvQk0sTUFBcEI7QUFDSCxTQXJCRDtBQXNCSCxLQS9CUyxDQUFWOztBQWlDQVIsUUFBSUssRUFBSixDQUFPLE9BQVAsRUFBZ0J4QixRQUFoQjs7QUFFQSxRQUFJQyxLQUFLRSxNQUFMLEtBQWdCLEtBQWhCLElBQXlCRixLQUFLVSxJQUFsQyxFQUF3QztBQUNwQ1EsWUFBSW9CLEtBQUosQ0FBVXRDLEtBQUtVLElBQWY7QUFDSDs7QUFFRFEsUUFBSXFCLEdBQUo7QUFDSCxDLENBbEdEOzs7Ozs7O0FBT0E7cUJBNkZlMUMsTzs7Ozs7Ozs7Ozs7O0FDcEdmLGU7Ozs7Ozs7Ozs7O0FDQUEsZTs7Ozs7Ozs7Ozs7QUNBQSxlOzs7Ozs7Ozs7OztBQ0FBLGUiLCJmaWxlIjoiZG93bmxvYWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vVGlja2Fyb28vcmVxdWVzdC1hamF4XHJcbiAqXHJcbiAqIEBmaWxlb3ZlcnZpZXcgSHR0cCByZXF1ZXN0IGluIG5vZGUuanNcclxuICogQGF1dGhvciBkb3V6aSA8bGlhb3dlaTA4QGdtYWlsLmNvbT5cclxuICovXHJcblxyXG4vLzIwMTgtMTItMTQgdW5kZXJkb2dAYWlyZW5zb2Z0LmNvbSBwcmUgZGVjb2RpbmdcclxuaW1wb3J0IEljb252IGZyb20gXCJpY29udi1saXRlXCI7XHJcbmltcG9ydCBDaGFyZGV0IGZyb20gXCJjaGFyZGV0XCI7XHJcbmltcG9ydCBodHRwIGZyb20gXCJodHRwXCI7XHJcbmltcG9ydCB1cmwgZnJvbSBcInVybFwiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgcXVlcnlzdHJpbmcgZnJvbSBcInF1ZXJ5c3RyaW5nXCI7XHJcbmltcG9ydCBfIGZyb20gXCJ1dGlscy91bmRlcnNjb3JlXCI7XHJcblxyXG4vKipcclxuICogQGRlc2NyaXB0aW9uXHJcbiAqIGh0dHAgcmVxdWVzdFxyXG4gKiBAcGFyYW0ge29iamVjdHxzdHJpbmd9IFtvcHRpb25zXVxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBbY2FsbGJhY2tdXHJcbiAqIEBleGFtcGxlXHJcbiAqIHJlcXVlc3QoJ3VybCcsIGZ1bmN0aW9uKGVyciwgcmVzLCBib2R5KSB7IH0pO1xyXG4gKiByZXF1ZXN0KHt1cmw6ICcnLCBoZWFkZXJzOiB7fSwgbWV0aG9kOiAnUE9TVCd9LCBmdW5jdGlvbihlcnIsIHJlcywgYm9keSkgeyB9KTtcclxuICovXHJcbmZ1bmN0aW9uIHJlcXVlc3Qob3B0aW9ucywgY2FsbGJhY2spIHtcclxuICAgIHZhciBvcHRzID0ge1xyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICBlbmNvZGluZzogJ3V0ZjgnLFxyXG4gICAgICAgIC8vIElmIHRoZSBjYWxsYmFjayBib2R5IGlzIGJ1ZmZlciwgaXQgY2FuIGhhbmxkZXIgZG9jdW1lbnQgcGlwZSBzaW1wbHlcclxuICAgICAgICBpc0J1ZmZlcjogZmFsc2UsXHJcbiAgICAgICAganNvbjogZmFsc2VcclxuICAgIH07XHJcblxyXG4gICAgaWYgKF8uaXNTdHJpbmcob3B0aW9ucykpIHtcclxuICAgICAgICBvcHRzLnVybCA9IG9wdGlvbnM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIF8uZXh0ZW5kKG9wdHMsIG9wdGlvbnMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEFwcGVuZCByZXF1ZXN0IGRhdGFcclxuICAgIGlmIChvcHRzLmRhdGEpIHtcclxuICAgICAgICBpZiAob3B0cy5tZXRob2QgPT09ICdHRVQnKSB7XHJcbiAgICAgICAgICAgIG9wdHMudXJsICs9ICc/JyArIHF1ZXJ5c3RyaW5nLnN0cmluZ2lmeShvcHRzLmRhdGEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG9wdHMuZGF0YSA9IEpTT04uc3RyaW5naWZ5KG9wdHMuZGF0YSk7XHJcbiAgICAgICAgICAgIG9wdHMuaGVhZGVyc1snQ29udGVudC1MZW5ndGgnXSA9IG5ldyBCdWZmZXIob3B0cy5kYXRhKS5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEV4dGVuZCByZXF1ZXN0IHVybCBvYmplY3RcclxuICAgIC8vMjAxOC0xMi0xNCB1bmRlcmRvZ0BhaXJlbnNvZnQuY29tIEFkZGVkICdwcm90b2NvbCcgcGFyYW1zLiBjdXMgVGhpcyBpcyBkb24ndCBsb2FkaW5nIGh0dHBzIGZpbGUuXHJcbiAgICBfLmV4dGVuZChvcHRzLCBfLnBpY2sodXJsLnBhcnNlKG9wdHMudXJsKSwgJ3Byb3RvY29sJywgJ2hvc3RuYW1lJywgJ3BvcnQnLCAncGF0aCcsICdhdXRoJykpO1xyXG4gICAgZGVsZXRlIG9wdHMudXJsO1xyXG5cclxuICAgIHZhciByZXEgPSBodHRwLnJlcXVlc3Qob3B0cywgZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgdmFyIGJvZHkgPSBbXTtcclxuICAgICAgICB2YXIgc2l6ZSA9IDA7XHJcblxyXG4gICAgICAgIHJlcy5vbignZGF0YScsIGZ1bmN0aW9uKGNodW5rKSB7XHJcbiAgICAgICAgICAgIGJvZHkucHVzaChjaHVuayk7XHJcbiAgICAgICAgICAgIHNpemUgKz0gY2h1bmsubGVuZ3RoO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXMub24oJ2VuZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gJyc7XHJcblxyXG4gICAgICAgICAgICAvLyBCdWZmZXJcclxuICAgICAgICAgICAgaWYgKG9wdHMuaXNCdWZmZXIpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9ICBCdWZmZXIuY29uY2F0KGJvZHksIHNpemUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIGJ1ZmZlciA9IG5ldyBCdWZmZXIoc2l6ZSk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgcG9zID0gMCwgbCA9IGJvZHkubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNodW5rID0gYm9keVtpXTtcclxuICAgICAgICAgICAgICAgICAgICBjaHVuay5jb3B5KGJ1ZmZlciwgcG9zKTtcclxuICAgICAgICAgICAgICAgICAgICBwb3MgKz0gY2h1bmsubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gSWNvbnYuZGVjb2RlKGJ1ZmZlciwgQ2hhcmRldC5kZXRlY3QoYnVmZmVyKSkudG9TdHJpbmcoKTsgLy9idWZmZXIudG9TdHJpbmcob3B0cy5lbmNvZGluZyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG9wdHMuanNvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IEpTT04ucGFyc2UocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgcmVzLCByZXN1bHQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmVxLm9uKCdlcnJvcicsIGNhbGxiYWNrKTtcclxuXHJcbiAgICBpZiAob3B0cy5tZXRob2QgIT09ICdHRVQnICYmIG9wdHMuZGF0YSkge1xyXG4gICAgICAgIHJlcS53cml0ZShvcHRzLmRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlcS5lbmQoKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmVxdWVzdDsiLCIvKiAoaWdub3JlZCkgKi8iLCIvKiAoaWdub3JlZCkgKi8iLCIvKiAoaWdub3JlZCkgKi8iLCIvKiAoaWdub3JlZCkgKi8iXSwic291cmNlUm9vdCI6IiJ9