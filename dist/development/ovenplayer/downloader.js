/*! OvenPlayerv0.9.741 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvZG93bmxvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zdHJlYW1zIChpZ25vcmVkKSIsIndlYnBhY2s6Ly8vLi9leHRlbmQtbm9kZSAoaWdub3JlZCkiLCJ3ZWJwYWNrOi8vL3V0aWwgKGlnbm9yZWQpIiwid2VicGFjazovLy91dGlsIChpZ25vcmVkKT9kY2E5Il0sIm5hbWVzIjpbInJlcXVlc3QiLCJvcHRpb25zIiwiY2FsbGJhY2siLCJvcHRzIiwiaGVhZGVycyIsIm1ldGhvZCIsImVuY29kaW5nIiwiaXNCdWZmZXIiLCJqc29uIiwiXyIsImlzU3RyaW5nIiwidXJsIiwiZXh0ZW5kIiwiZGF0YSIsInF1ZXJ5c3RyaW5nIiwic3RyaW5naWZ5IiwiSlNPTiIsIkJ1ZmZlciIsImxlbmd0aCIsInBpY2siLCJwYXJzZSIsInJlcSIsImh0dHAiLCJyZXMiLCJib2R5Iiwic2l6ZSIsIm9uIiwiY2h1bmsiLCJwdXNoIiwicmVzdWx0IiwiY29uY2F0IiwiYnVmZmVyIiwiaSIsInBvcyIsImwiLCJjb3B5IiwiSWNvbnYiLCJkZWNvZGUiLCJDaGFyZGV0IiwiZGV0ZWN0IiwidG9TdHJpbmciLCJ3cml0ZSIsImVuZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFRQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUE7Ozs7Ozs7OztBQVNBLFNBQVNBLE9BQVQsQ0FBaUJDLE9BQWpCLEVBQTBCQyxRQUExQixFQUFvQztBQUNoQyxRQUFJQyxPQUFPO0FBQ1BDLGlCQUFTO0FBQ0wsNEJBQWdCO0FBRFgsU0FERjtBQUlQQyxnQkFBUSxLQUpEO0FBS1BDLGtCQUFVLE1BTEg7QUFNUDtBQUNBQyxrQkFBVSxLQVBIO0FBUVBDLGNBQU07QUFSQyxLQUFYOztBQVdBLFFBQUlDLHdCQUFFQyxRQUFGLENBQVdULE9BQVgsQ0FBSixFQUF5QjtBQUNyQkUsYUFBS1EsR0FBTCxHQUFXVixPQUFYO0FBQ0gsS0FGRCxNQUVPO0FBQ0hRLGdDQUFFRyxNQUFGLENBQVNULElBQVQsRUFBZUYsT0FBZjtBQUNIOztBQUVEO0FBQ0EsUUFBSUUsS0FBS1UsSUFBVCxFQUFlO0FBQ1gsWUFBSVYsS0FBS0UsTUFBTCxLQUFnQixLQUFwQixFQUEyQjtBQUN2QkYsaUJBQUtRLEdBQUwsSUFBWSxNQUFNRyx5QkFBWUMsU0FBWixDQUFzQlosS0FBS1UsSUFBM0IsQ0FBbEI7QUFDSCxTQUZELE1BRU87QUFDSFYsaUJBQUtVLElBQUwsR0FBWUcsS0FBS0QsU0FBTCxDQUFlWixLQUFLVSxJQUFwQixDQUFaO0FBQ0FWLGlCQUFLQyxPQUFMLENBQWEsZ0JBQWIsSUFBaUMsSUFBSWEsTUFBSixDQUFXZCxLQUFLVSxJQUFoQixFQUFzQkssTUFBdkQ7QUFDSDtBQUNKOztBQUVEO0FBQ0E7QUFDQVQsNEJBQUVHLE1BQUYsQ0FBU1QsSUFBVCxFQUFlTSx3QkFBRVUsSUFBRixDQUFPUixpQkFBSVMsS0FBSixDQUFVakIsS0FBS1EsR0FBZixDQUFQLEVBQTRCLFVBQTVCLEVBQXdDLFVBQXhDLEVBQW9ELE1BQXBELEVBQTRELE1BQTVELEVBQW9FLE1BQXBFLENBQWY7QUFDQSxXQUFPUixLQUFLUSxHQUFaOztBQUVBLFFBQUlVLE1BQU1DLGtCQUFLdEIsT0FBTCxDQUFhRyxJQUFiLEVBQW1CLFVBQVNvQixHQUFULEVBQWM7QUFDdkMsWUFBSUMsT0FBTyxFQUFYO0FBQ0EsWUFBSUMsT0FBTyxDQUFYOztBQUVBRixZQUFJRyxFQUFKLENBQU8sTUFBUCxFQUFlLFVBQVNDLEtBQVQsRUFBZ0I7QUFDM0JILGlCQUFLSSxJQUFMLENBQVVELEtBQVY7QUFDQUYsb0JBQVFFLE1BQU1ULE1BQWQ7QUFDSCxTQUhEOztBQUtBSyxZQUFJRyxFQUFKLENBQU8sS0FBUCxFQUFjLFlBQVc7QUFDckIsZ0JBQUlHLFNBQVMsRUFBYjs7QUFFQTtBQUNBLGdCQUFJMUIsS0FBS0ksUUFBVCxFQUFtQjtBQUNmc0IseUJBQVVaLE9BQU9hLE1BQVAsQ0FBY04sSUFBZCxFQUFvQkMsSUFBcEIsQ0FBVjtBQUNILGFBRkQsTUFFTztBQUNILG9CQUFJTSxTQUFTLElBQUlkLE1BQUosQ0FBV1EsSUFBWCxDQUFiO0FBQ0EscUJBQUssSUFBSU8sSUFBSSxDQUFSLEVBQVdDLE1BQU0sQ0FBakIsRUFBb0JDLElBQUlWLEtBQUtOLE1BQWxDLEVBQTBDYyxJQUFJRSxDQUE5QyxFQUFpREYsR0FBakQsRUFBc0Q7QUFDbEQsd0JBQUlMLFFBQVFILEtBQUtRLENBQUwsQ0FBWjtBQUNBTCwwQkFBTVEsSUFBTixDQUFXSixNQUFYLEVBQW1CRSxHQUFuQjtBQUNBQSwyQkFBT04sTUFBTVQsTUFBYjtBQUNIO0FBQ0RXLHlCQUFTTyx1QkFBTUMsTUFBTixDQUFhTixNQUFiLEVBQXFCTyxxQkFBUUMsTUFBUixDQUFlUixNQUFmLENBQXJCLEVBQTZDUyxRQUE3QyxFQUFULENBUEcsQ0FPK0Q7O0FBRWxFLG9CQUFJckMsS0FBS0ssSUFBVCxFQUFlO0FBQ1hxQiw2QkFBU2IsS0FBS0ksS0FBTCxDQUFXUyxNQUFYLENBQVQ7QUFDSDtBQUNKOztBQUVEM0IscUJBQVMsSUFBVCxFQUFlcUIsR0FBZixFQUFvQk0sTUFBcEI7QUFDSCxTQXJCRDtBQXNCSCxLQS9CUyxDQUFWOztBQWlDQVIsUUFBSUssRUFBSixDQUFPLE9BQVAsRUFBZ0J4QixRQUFoQjs7QUFFQSxRQUFJQyxLQUFLRSxNQUFMLEtBQWdCLEtBQWhCLElBQXlCRixLQUFLVSxJQUFsQyxFQUF3QztBQUNwQ1EsWUFBSW9CLEtBQUosQ0FBVXRDLEtBQUtVLElBQWY7QUFDSDs7QUFFRFEsUUFBSXFCLEdBQUo7QUFDSCxDLENBbEdEOzs7Ozs7O0FBT0E7cUJBNkZlMUMsTzs7Ozs7Ozs7Ozs7O0FDcEdmLGU7Ozs7Ozs7Ozs7O0FDQUEsZTs7Ozs7Ozs7Ozs7QUNBQSxlOzs7Ozs7Ozs7OztBQ0FBLGUiLCJmaWxlIjoiZG93bmxvYWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogaHR0cHM6Ly9naXRodWIuY29tL1RpY2thcm9vL3JlcXVlc3QtYWpheFxuICpcbiAqIEBmaWxlb3ZlcnZpZXcgSHR0cCByZXF1ZXN0IGluIG5vZGUuanNcbiAqIEBhdXRob3IgZG91emkgPGxpYW93ZWkwOEBnbWFpbC5jb20+XG4gKi9cblxuLy8yMDE4LTEyLTE0IHVuZGVyZG9nQGFpcmVuc29mdC5jb20gcHJlIGRlY29kaW5nXG5pbXBvcnQgSWNvbnYgZnJvbSBcImljb252LWxpdGVcIjtcbmltcG9ydCBDaGFyZGV0IGZyb20gXCJjaGFyZGV0XCI7XG5pbXBvcnQgaHR0cCBmcm9tIFwiaHR0cFwiO1xuaW1wb3J0IHVybCBmcm9tIFwidXJsXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHF1ZXJ5c3RyaW5nIGZyb20gXCJxdWVyeXN0cmluZ1wiO1xuaW1wb3J0IF8gZnJvbSBcInV0aWxzL3VuZGVyc2NvcmVcIjtcblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqIGh0dHAgcmVxdWVzdFxuICogQHBhcmFtIHtvYmplY3R8c3RyaW5nfSBbb3B0aW9uc11cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IFtjYWxsYmFja11cbiAqIEBleGFtcGxlXG4gKiByZXF1ZXN0KCd1cmwnLCBmdW5jdGlvbihlcnIsIHJlcywgYm9keSkgeyB9KTtcbiAqIHJlcXVlc3Qoe3VybDogJycsIGhlYWRlcnM6IHt9LCBtZXRob2Q6ICdQT1NUJ30sIGZ1bmN0aW9uKGVyciwgcmVzLCBib2R5KSB7IH0pO1xuICovXG5mdW5jdGlvbiByZXF1ZXN0KG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIG9wdHMgPSB7XG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgZW5jb2Rpbmc6ICd1dGY4JyxcbiAgICAgICAgLy8gSWYgdGhlIGNhbGxiYWNrIGJvZHkgaXMgYnVmZmVyLCBpdCBjYW4gaGFubGRlciBkb2N1bWVudCBwaXBlIHNpbXBseVxuICAgICAgICBpc0J1ZmZlcjogZmFsc2UsXG4gICAgICAgIGpzb246IGZhbHNlXG4gICAgfTtcblxuICAgIGlmIChfLmlzU3RyaW5nKG9wdGlvbnMpKSB7XG4gICAgICAgIG9wdHMudXJsID0gb3B0aW9ucztcbiAgICB9IGVsc2Uge1xuICAgICAgICBfLmV4dGVuZChvcHRzLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvLyBBcHBlbmQgcmVxdWVzdCBkYXRhXG4gICAgaWYgKG9wdHMuZGF0YSkge1xuICAgICAgICBpZiAob3B0cy5tZXRob2QgPT09ICdHRVQnKSB7XG4gICAgICAgICAgICBvcHRzLnVybCArPSAnPycgKyBxdWVyeXN0cmluZy5zdHJpbmdpZnkob3B0cy5kYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9wdHMuZGF0YSA9IEpTT04uc3RyaW5naWZ5KG9wdHMuZGF0YSk7XG4gICAgICAgICAgICBvcHRzLmhlYWRlcnNbJ0NvbnRlbnQtTGVuZ3RoJ10gPSBuZXcgQnVmZmVyKG9wdHMuZGF0YSkubGVuZ3RoO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gRXh0ZW5kIHJlcXVlc3QgdXJsIG9iamVjdFxuICAgIC8vMjAxOC0xMi0xNCB1bmRlcmRvZ0BhaXJlbnNvZnQuY29tIEFkZGVkICdwcm90b2NvbCcgcGFyYW1zLiBjdXMgVGhpcyBpcyBkb24ndCBsb2FkaW5nIGh0dHBzIGZpbGUuXG4gICAgXy5leHRlbmQob3B0cywgXy5waWNrKHVybC5wYXJzZShvcHRzLnVybCksICdwcm90b2NvbCcsICdob3N0bmFtZScsICdwb3J0JywgJ3BhdGgnLCAnYXV0aCcpKTtcbiAgICBkZWxldGUgb3B0cy51cmw7XG5cbiAgICB2YXIgcmVxID0gaHR0cC5yZXF1ZXN0KG9wdHMsIGZ1bmN0aW9uKHJlcykge1xuICAgICAgICB2YXIgYm9keSA9IFtdO1xuICAgICAgICB2YXIgc2l6ZSA9IDA7XG5cbiAgICAgICAgcmVzLm9uKCdkYXRhJywgZnVuY3Rpb24oY2h1bmspIHtcbiAgICAgICAgICAgIGJvZHkucHVzaChjaHVuayk7XG4gICAgICAgICAgICBzaXplICs9IGNodW5rLmxlbmd0aDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmVzLm9uKCdlbmQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSAnJztcblxuICAgICAgICAgICAgLy8gQnVmZmVyXG4gICAgICAgICAgICBpZiAob3B0cy5pc0J1ZmZlcikge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9ICBCdWZmZXIuY29uY2F0KGJvZHksIHNpemUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgYnVmZmVyID0gbmV3IEJ1ZmZlcihzaXplKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgcG9zID0gMCwgbCA9IGJvZHkubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjaHVuayA9IGJvZHlbaV07XG4gICAgICAgICAgICAgICAgICAgIGNodW5rLmNvcHkoYnVmZmVyLCBwb3MpO1xuICAgICAgICAgICAgICAgICAgICBwb3MgKz0gY2h1bmsubGVuZ3RoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXN1bHQgPSBJY29udi5kZWNvZGUoYnVmZmVyLCBDaGFyZGV0LmRldGVjdChidWZmZXIpKS50b1N0cmluZygpOyAvL2J1ZmZlci50b1N0cmluZyhvcHRzLmVuY29kaW5nKTtcblxuICAgICAgICAgICAgICAgIGlmIChvcHRzLmpzb24pIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gSlNPTi5wYXJzZShyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgcmVzLCByZXN1bHQpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJlcS5vbignZXJyb3InLCBjYWxsYmFjayk7XG5cbiAgICBpZiAob3B0cy5tZXRob2QgIT09ICdHRVQnICYmIG9wdHMuZGF0YSkge1xuICAgICAgICByZXEud3JpdGUob3B0cy5kYXRhKTtcbiAgICB9XG5cbiAgICByZXEuZW5kKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJlcXVlc3Q7IiwiLyogKGlnbm9yZWQpICovIiwiLyogKGlnbm9yZWQpICovIiwiLyogKGlnbm9yZWQpICovIiwiLyogKGlnbm9yZWQpICovIl0sInNvdXJjZVJvb3QiOiIifQ==