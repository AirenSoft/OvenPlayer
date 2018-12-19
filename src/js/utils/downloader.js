/**
 * https://github.com/Tickaroo/request-ajax
 *
 * @fileoverview Http request in node.js
 * @author douzi <liaowei08@gmail.com>
 */

//2018-12-14 underdog@airensoft.com pre decoding
import Iconv from "iconv-lite";
import Chardet from "chardet";
import http from "http";
import url from "url";
import path from "path";
import querystring from "querystring";
import _ from "utils/underscore";

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

    if (_.isString(options)) {
        opts.url = options;
    } else {
        _.extend(opts, options);
    }

    // Append request data
    if (opts.data) {
        if (opts.method === 'GET') {
            opts.url += '?' + querystring.stringify(opts.data);
        } else {
            opts.data = JSON.stringify(opts.data);
            opts.headers['Content-Length'] = new Buffer(opts.data).length;
        }
    }

    // Extend request url object
    //2018-12-14 underdog@airensoft.com Added 'protocol' params. cus This is don't loading https file.
    _.extend(opts, _.pick(url.parse(opts.url), 'protocol', 'hostname', 'port', 'path', 'auth'));
    delete opts.url;

    var req = http.request(opts, function(res) {
        var body = [];
        var size = 0;

        res.on('data', function(chunk) {
            body.push(chunk);
            size += chunk.length;
        });

        res.on('end', function() {
            var result = '';

            // Buffer
            if (opts.isBuffer) {
                result =  Buffer.concat(body, size);
            } else {
                var buffer = new Buffer(size);
                for (var i = 0, pos = 0, l = body.length; i < l; i++) {
                    var chunk = body[i];
                    chunk.copy(buffer, pos);
                    pos += chunk.length;
                }
                result = Iconv.decode(buffer, Chardet.detect(buffer)).toString(); //buffer.toString(opts.encoding);

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
}

export default request;