/*! OvenPlayerv0.7.91 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["smiparser"],{

/***/ "./src/js/api/caption/parser/SmiParser.js":
/*!************************************************!*\
  !*** ./src/js/api/caption/parser/SmiParser.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
 *  sami-parser
 *  The MIT License (MIT)
 *
 *  Copyright (c) 2013 Constantine Kim <elegantcoder@gmail.com>
 *  https://github.com/elegantcoder/sami-parser
 *
 */

var langCodes = ["ab", "aa", "af", "ak", "sq", "am", "ar", "an", "hy", "as", "av", "ae", "ay", "az", "bm", "ba", "eu", "be", "bn", "bh", "bi", "nb", "bs", "br", "bg", "my", "es", "ca", "km", "ch", "ce", "ny", "ny", "zh", "za", "cu", "cu", "cv", "kw", "co", "cr", "hr", "cs", "da", "dv", "dv", "nl", "dz", "en", "eo", "et", "ee", "fo", "fj", "fi", "nl", "fr", "ff", "gd", "gl", "lg", "ka", "de", "ki", "el", "kl", "gn", "gu", "ht", "ht", "ha", "he", "hz", "hi", "ho", "hu", "is", "io", "ig", "id", "ia", "ie", "iu", "ik", "ga", "it", "ja", "jv", "kl", "kn", "kr", "ks", "kk", "ki", "rw", "ky", "kv", "kg", "ko", "kj", "ku", "kj", "ky", "lo", "la", "lv", "lb", "li", "li", "li", "ln", "lt", "lu", "lb", "mk", "mg", "ms", "ml", "dv", "mt", "gv", "mi", "mr", "mh", "ro", "ro", "mn", "na", "nv", "nv", "nd", "nr", "ng", "ne", "nd", "se", "no", "nb", "nn", "ii", "ny", "nn", "ie", "oc", "oj", "cu", "cu", "cu", "or", "om", "os", "os", "pi", "pa", "ps", "fa", "pl", "pt", "pa", "ps", "qu", "ro", "rm", "rn", "ru", "sm", "sg", "sa", "sc", "gd", "sr", "sn", "ii", "sd", "si", "si", "sk", "sl", "so", "st", "nr", "es", "su", "sw", "ss", "sv", "tl", "ty", "tg", "ta", "tt", "te", "th", "bo", "ti", "to", "ts", "tn", "tr", "tk", "tw", "ug", "uk", "ur", "ug", "uz", "ca", "ve", "vi", "vo", "wa", "cy", "fy", "wo", "xh", "yi", "yo", "za", "zu"];

var reOpenSync = /<sync/i;

var reCloseSync = /<sync|<\/body|<\/sami/i;

var reLineEnding = /\r\n?|\n/g;

var reBrokenTag = /<[a-z]*[^>]*<[a-z]*/g;

var reStartTime = /<sync[^>]+?start[^=]*=[^0-9]*([0-9]*)["^0-9"]*/i;

var reBr = /<br[^>]*>/ig;

var reStyle = /<style[^>]*>([\s\S]*?)<\/style[^>]*>/i;

var reComment = /(<!--|-->)/g;

var clone = function clone(obj) {
    var flags, key, newInstance;
    if (obj == null || (typeof obj === "undefined" ? "undefined" : _typeof(obj)) !== 'object') {
        return obj;
    }
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }
    if (obj instanceof RegExp) {
        flags = '';
        if (obj.global != null) {
            flags += 'g';
        }
        if (obj.ignoreCase != null) {
            flags += 'i';
        }
        if (obj.multiline != null) {
            flags += 'm';
        }
        if (obj.sticky != null) {
            flags += 'y';
        }
        return new RegExp(obj.source, flags);
    }
    newInstance = new obj.constructor();
    for (key in obj) {
        newInstance[key] = clone(obj[key]);
    }
    return newInstance;
};

var strip_tags = function strip_tags(input, allowed) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Luke Godfrey
    // +      input by: Pul
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +      input by: Alex
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Marc Palau
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Eric Nagel
    // +      input by: Bobby Drake
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Tomasz Wesolowski
    // +      input by: Evertjan Garretsen
    // +    revised by: Rafał Kukawski (http://blog.kukawski.pl/)
    // *     example 1: strip_tags('<p>Kevin</p> <br /><b>van</b> <i>Zonneveld</i>', '<i><b>');
    // *     returns 1: 'Kevin <b>van</b> <i>Zonneveld</i>'
    // *     example 2: strip_tags('<p>Kevin <img src="someimage.png" onmouseover="someFunction()">van <i>Zonneveld</i></p>', '<p>');
    // *     returns 2: '<p>Kevin van Zonneveld</p>'
    // *     example 3: strip_tags("<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>", "<a>");
    // *     returns 3: '<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>'
    // *     example 4: strip_tags('1 < 5 5 > 1');
    // *     returns 4: '1 < 5 5 > 1'
    // *     example 5: strip_tags('1 <br/> 1');
    // *     returns 5: '1  1'
    // *     example 6: strip_tags('1 <br/> 1', '<br>');
    // *     returns 6: '1  1'
    // *     example 7: strip_tags('1 <br/> 1', '<br><br/>');
    // *     returns 7: '1 <br/> 1'
    allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
        commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
};

var _sort = function _sort(langItem) {
    return langItem.sort(function (a, b) {
        var res;
        if ((res = a.start - b.start) === 0) {
            return a.end - b.end;
        } else {
            return res;
        }
    });
};

var _mergeMultiLanguages = function _mergeMultiLanguages(arr) {
    var content, dict, i, idx, key, lang, ret, val, _i, _len, _ref;
    dict = {};
    i = arr.length;
    ret = [];
    for (i = _i = 0, _len = arr.length; _i < _len; i = ++_i) {
        val = arr[i];
        key = val.startTime + ',' + val.endTime;
        if ((idx = dict[key]) !== void 0) {
            _ref = val.languages;
            for (lang in _ref) {
                content = _ref[lang];
                ret[idx].languages[lang] = content;
            }
        } else {
            ret.push(val);
            dict[key] = ret.length - 1;
        }
    }
    return ret;
};

var SmiParser = function SmiParser(sami, options) {
    var definedLangs, duration, errors, getDefinedLangs, getLanguage, key, makeEndTime, parse, result, value, _ref;
    parse = function parse() {
        var element, error, innerText, isBroken, item, lang, langItem, lineNum, nextStartTagIdx, ret, startTagIdx, startTime, str, tempRet, _ref, _ref1, _ref2;
        error = function error(_error2) {
            var e;
            e = new Error(_error2);
            e.line = lineNum;
            e.context = element;
            return errors.push(e);
        };
        lineNum = 1;
        ret = [];
        tempRet = {};
        str = sami;
        while (true) {
            startTagIdx = str.search();
            if (nextStartTagIdx <= 0 || startTagIdx < 0) {
                break;
            }
            nextStartTagIdx = str.slice(startTagIdx + 1).search(reCloseSync) + 1;
            if (nextStartTagIdx > 0) {
                element = str.slice(startTagIdx, startTagIdx + nextStartTagIdx);
            } else {
                element = str.slice(startTagIdx);
            }
            lineNum += ((_ref = str.slice(0, startTagIdx).match(reLineEnding)) != null ? _ref.length : void 0) || 0;
            if (isBroken = reBrokenTag.test(element)) {
                error('ERROR_BROKEN_TAGS');
            }
            str = str.slice(startTagIdx + nextStartTagIdx);
            startTime = +((_ref1 = element.match(reStartTime)) != null ? _ref1[1] / 1000 : void 0); //HSLEE ms -> s 로 변경
            if (startTime === null || startTime < 0) {
                error('ERROR_INVALID_TIME');
            }

            // We don't need complex language. cus SMI doens't obey the rules...
            //lang = getLanguage(element);
            lang = "ko";
            /*if (!lang) {
                error('ERROR_INVALID_LANGUAGE');
            }*/
            lineNum += ((_ref2 = element.match(reLineEnding)) != null ? _ref2.length : void 0) || 0;
            element = element.replace(reLineEnding, '');
            element = element.replace(reBr, "\n");
            innerText = strip_tags(element).trim();

            //HSLEE : 20180530 - 우린 랭기지 구분이 필요 없다. 있는거 그대로 보여줄뿐
            item = {
                start: startTime,
                //languages: {},
                //language : lang,
                text: "",
                contents: innerText
            };
            if (lang) {
                //item.languages[lang] = innerText;
                item.text = innerText;
            }
            tempRet[lang] || (tempRet[lang] = []);
            if (item.start) {
                tempRet[lang].push(item);
            }
        }
        for (lang in tempRet) {
            langItem = tempRet[lang];
            langItem = _sort(langItem);
            langItem = makeEndTime(langItem);
            ret = ret.concat(langItem);
        }
        //ret = _mergeMultiLanguages(ret);
        ret = _sort(ret);
        return ret;
    };
    getLanguage = function getLanguage(element) {
        var className, lang;
        if (!element) {
            return;
        }
        for (className in definedLangs) {
            lang = definedLangs[className];
            if (lang.reClassName.test(element)) {
                return lang.lang;
            }
        }
    };
    getDefinedLangs = function getDefinedLangs() {
        var className, declaration, e, error, lang, matched, parsed, rule, selector, _i, _len, _ref, _ref1, _results;
        try {
            matched = ((_ref = sami.match(reStyle)) != null ? _ref[1] : void 0) || '';
            matched = matched.replace(reComment, '');
            parsed = cssParse(matched);
            _ref1 = parsed.stylesheet.rules;
            _results = [];
            for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                rule = _ref1[_i];
                selector = rule.selectors[0];
                if ((selector != null ? selector[0] : void 0) === '.') {
                    _results.push(function () {
                        var _j, _len1, _ref2, _results1;
                        _ref2 = rule.declarations;
                        _results1 = [];
                        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
                            declaration = _ref2[_j];
                            if (declaration.property.toLowerCase() === 'lang') {
                                className = selector.slice(1);
                                lang = declaration.value.slice(0, 2);
                                if (~langCodes.indexOf(lang)) {
                                    _results1.push(definedLangs[className] = {
                                        lang: lang,
                                        reClassName: new RegExp("class[^=]*?=[\"'\S]*(" + className + ")['\"\S]?", 'i')
                                    });
                                } else {
                                    throw Error();
                                }
                            } else {
                                _results1.push(void 0);
                            }
                        }
                        return _results1;
                    }());
                } else {
                    _results.push(void 0);
                }
            }
            return _results;
        } catch (_error) {
            e = _error;
            errors.push(error = new Error('ERROR_INVALID_LANGUAGE_DEFINITION'));
        }
    };
    makeEndTime = function makeEndTime(langItem) {
        var i, item, _ref;
        i = langItem.length;
        while (i--) {
            item = langItem[i];
            if ((_ref = langItem[i - 1]) != null) {
                //HSLEE : 이왕이면 SRT 파서와 포맷을 맞추자
                _ref.end = item.start;
            }
            if (!item.contents || item.contents === '&nbsp;') {
                langItem.splice(i, 1);
            } else {
                delete langItem[i].contents;
                if (!item.end) {
                    item.end = item.start + duration;
                }
            }
        }
        return langItem;
    };
    errors = [];
    definedLangs = {
        KRCC: {
            lang: 'ko',
            reClassName: new RegExp("class[^=]*?=[\"'\S]*(KRCC)['\"\S]?", 'i')
        },
        KOCC: {
            lang: 'ko',
            reClassName: new RegExp("class[^=]*?=[\"'\S]*(KOCC)['\"\S]?", 'i')
        },
        KR: {
            lang: 'ko',
            reClassName: new RegExp("class[^=]*?=[\"'\S]*(KR)['\"\S]?", 'i')
        },
        ENCC: {
            lang: 'en',
            reClassName: new RegExp("class[^=]*?=[\"'\S]*(ENCC)['\"\S]?", 'i')
        },
        EGCC: {
            lang: 'en',
            reClassName: new RegExp("class[^=]*?=[\"'\S]*(EGCC)['\"\S]?", 'i')
        },
        EN: {
            lang: 'en',
            reClassName: new RegExp("class[^=]*?=[\"'\S]*(EN)['\"\S]?", 'i')
        },
        JPCC: {
            lang: 'ja',
            reClassName: new RegExp("class[^=]*?=[\"'\S]*(JPCC)['\"\S]?", 'i')
        }
    };
    if (options != null ? options.definedLangs : void 0) {
        _ref = options.definedLangs;
        for (key in _ref) {
            value = _ref[key];
            definedLangs[key] = value;
        }
    }
    duration = (options != null ? options.duration : void 0) || 10; //HSLEE ms -> s 로 변경
    sami = sami.trim();
    //getDefinedLangs();
    result = parse();
    return {
        result: result,
        errors: errors
    };
};

exports["default"] = SmiParser;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2NhcHRpb24vcGFyc2VyL1NtaVBhcnNlci5qcyJdLCJuYW1lcyI6WyJsYW5nQ29kZXMiLCJyZU9wZW5TeW5jIiwicmVDbG9zZVN5bmMiLCJyZUxpbmVFbmRpbmciLCJyZUJyb2tlblRhZyIsInJlU3RhcnRUaW1lIiwicmVCciIsInJlU3R5bGUiLCJyZUNvbW1lbnQiLCJjbG9uZSIsIm9iaiIsImZsYWdzIiwia2V5IiwibmV3SW5zdGFuY2UiLCJEYXRlIiwiZ2V0VGltZSIsIlJlZ0V4cCIsImdsb2JhbCIsImlnbm9yZUNhc2UiLCJtdWx0aWxpbmUiLCJzdGlja3kiLCJzb3VyY2UiLCJjb25zdHJ1Y3RvciIsInN0cmlwX3RhZ3MiLCJpbnB1dCIsImFsbG93ZWQiLCJ0b0xvd2VyQ2FzZSIsIm1hdGNoIiwiam9pbiIsInRhZ3MiLCJjb21tZW50c0FuZFBocFRhZ3MiLCJyZXBsYWNlIiwiJDAiLCIkMSIsImluZGV4T2YiLCJfc29ydCIsImxhbmdJdGVtIiwic29ydCIsImEiLCJiIiwicmVzIiwic3RhcnQiLCJlbmQiLCJfbWVyZ2VNdWx0aUxhbmd1YWdlcyIsImFyciIsImNvbnRlbnQiLCJkaWN0IiwiaSIsImlkeCIsImxhbmciLCJyZXQiLCJ2YWwiLCJfaSIsIl9sZW4iLCJfcmVmIiwibGVuZ3RoIiwic3RhcnRUaW1lIiwiZW5kVGltZSIsImxhbmd1YWdlcyIsInB1c2giLCJTbWlQYXJzZXIiLCJzYW1pIiwib3B0aW9ucyIsImRlZmluZWRMYW5ncyIsImR1cmF0aW9uIiwiZXJyb3JzIiwiZ2V0RGVmaW5lZExhbmdzIiwiZ2V0TGFuZ3VhZ2UiLCJtYWtlRW5kVGltZSIsInBhcnNlIiwicmVzdWx0IiwidmFsdWUiLCJlbGVtZW50IiwiZXJyb3IiLCJpbm5lclRleHQiLCJpc0Jyb2tlbiIsIml0ZW0iLCJsaW5lTnVtIiwibmV4dFN0YXJ0VGFnSWR4Iiwic3RhcnRUYWdJZHgiLCJzdHIiLCJ0ZW1wUmV0IiwiX3JlZjEiLCJfcmVmMiIsImUiLCJFcnJvciIsImxpbmUiLCJjb250ZXh0Iiwic2VhcmNoIiwic2xpY2UiLCJ0ZXN0IiwidHJpbSIsInRleHQiLCJjb250ZW50cyIsImNvbmNhdCIsImNsYXNzTmFtZSIsInJlQ2xhc3NOYW1lIiwiZGVjbGFyYXRpb24iLCJtYXRjaGVkIiwicGFyc2VkIiwicnVsZSIsInNlbGVjdG9yIiwiX3Jlc3VsdHMiLCJjc3NQYXJzZSIsInN0eWxlc2hlZXQiLCJydWxlcyIsInNlbGVjdG9ycyIsIl9qIiwiX2xlbjEiLCJfcmVzdWx0czEiLCJkZWNsYXJhdGlvbnMiLCJwcm9wZXJ0eSIsIl9lcnJvciIsInNwbGljZSIsIktSQ0MiLCJLT0NDIiwiS1IiLCJFTkNDIiwiRUdDQyIsIkVOIiwiSlBDQyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7QUFTQSxJQUFNQSxZQUFZLENBQUMsSUFBRCxFQUFNLElBQU4sRUFBVyxJQUFYLEVBQWlCLElBQWpCLEVBQXVCLElBQXZCLEVBQTZCLElBQTdCLEVBQW1DLElBQW5DLEVBQXlDLElBQXpDLEVBQStDLElBQS9DLEVBQXFELElBQXJELEVBQTJELElBQTNELEVBQWlFLElBQWpFLEVBQXVFLElBQXZFLEVBQTZFLElBQTdFLEVBQW1GLElBQW5GLEVBQXlGLElBQXpGLEVBQStGLElBQS9GLEVBQXFHLElBQXJHLEVBQTJHLElBQTNHLEVBQWlILElBQWpILEVBQXVILElBQXZILEVBQTZILElBQTdILEVBQWtJLElBQWxJLEVBQXVJLElBQXZJLEVBQTRJLElBQTVJLEVBQWlKLElBQWpKLEVBQXNKLElBQXRKLEVBQTJKLElBQTNKLEVBQWdLLElBQWhLLEVBQXFLLElBQXJLLEVBQTBLLElBQTFLLEVBQStLLElBQS9LLEVBQW9MLElBQXBMLEVBQXlMLElBQXpMLEVBQThMLElBQTlMLEVBQW1NLElBQW5NLEVBQXdNLElBQXhNLEVBQTZNLElBQTdNLEVBQWtOLElBQWxOLEVBQ2QsSUFEYyxFQUNULElBRFMsRUFDSixJQURJLEVBQ0MsSUFE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cGFyc2VyXHJcbiAqICBUaGUgTUlUIExpY2Vuc2UgKE1JVClcclxuICpcclxuICogIENvcHlyaWdodCAoYykgMjAxMyBDb25zdGFudGluZSBLaW0gPGVsZWdhbnRjb2RlckBnbWFpbC5jb20+XHJcbiAqICBodHRwczovL2dpdGh1Yi5jb20vZWxlZ2FudGNvZGVyL3NhbWktcGFyc2VyXHJcbiAqXHJcbiAqL1xyXG5cclxuY29uc3QgbGFuZ0NvZGVzID0gW1wiYWJcIixcImFhXCIsXCJhZlwiLCBcImFrXCIsIFwic3FcIiwgXCJhbVwiLCBcImFyXCIsIFwiYW5cIiwgXCJoeVwiLCBcImFzXCIsIFwiYXZcIiwgXCJhZVwiLCBcImF5XCIsIFwiYXpcIiwgXCJibVwiLCBcImJhXCIsIFwiZXVcIiwgXCJiZVwiLCBcImJuXCIsIFwiYmhcIiwgXCJiaVwiLCBcIm5iXCIsXCJic1wiLFwiYnJcIixcImJnXCIsXCJteVwiLFwiZXNcIixcImNhXCIsXCJrbVwiLFwiY2hcIixcImNlXCIsXCJueVwiLFwibnlcIixcInpoXCIsXCJ6YVwiLFwiY3VcIixcImN1XCIsXCJjdlwiLFwia3dcIixcclxuICAgIFwiY29cIixcImNyXCIsXCJoclwiLFwiY3NcIixcImRhXCIsXCJkdlwiLFwiZHZcIixcIm5sXCIsXCJkelwiLFwiZW5cIixcImVvXCIsXCJldFwiLFwiZWVcIixcImZvXCIsXCJmalwiLFwiZmlcIixcIm5sXCIsXCJmclwiLFwiZmZcIixcImdkXCIsXCJnbFwiLFwibGdcIixcImthXCIsXCJkZVwiLFwia2lcIixcImVsXCIsXCJrbFwiLFwiZ25cIixcImd1XCIsXCJodFwiLFwiaHRcIixcImhhXCIsXCJoZVwiLFwiaHpcIixcImhpXCIsXCJob1wiLFwiaHVcIixcImlzXCIsXCJpb1wiLFwiaWdcIixcImlkXCIsXCJpYVwiLFwiaWVcIixcIml1XCIsXCJpa1wiLFwiZ2FcIixcclxuICAgIFwiaXRcIixcImphXCIsXCJqdlwiLFwia2xcIixcImtuXCIsXCJrclwiLFwia3NcIixcImtrXCIsXCJraVwiLFwicndcIixcImt5XCIsXCJrdlwiLFwia2dcIixcImtvXCIsXCJralwiLFwia3VcIixcImtqXCIsXCJreVwiLFwibG9cIixcImxhXCIsXCJsdlwiLFwibGJcIixcImxpXCIsXCJsaVwiLFwibGlcIixcImxuXCIsXCJsdFwiLFwibHVcIixcImxiXCIsXCJta1wiLFwibWdcIixcIm1zXCIsXCJtbFwiLFwiZHZcIixcIm10XCIsXCJndlwiLFwibWlcIixcIm1yXCIsXCJtaFwiLFwicm9cIixcInJvXCIsXCJtblwiLFwibmFcIixcIm52XCIsXCJudlwiLFwibmRcIixcclxuICAgIFwibnJcIixcIm5nXCIsXCJuZVwiLFwibmRcIixcInNlXCIsXCJub1wiLFwibmJcIixcIm5uXCIsXCJpaVwiLFwibnlcIixcIm5uXCIsXCJpZVwiLFwib2NcIixcIm9qXCIsXCJjdVwiLFwiY3VcIixcImN1XCIsXCJvclwiLFwib21cIixcIm9zXCIsXCJvc1wiLFwicGlcIixcInBhXCIsXCJwc1wiLFwiZmFcIixcInBsXCIsXCJwdFwiLFwicGFcIixcInBzXCIsXCJxdVwiLFwicm9cIixcInJtXCIsXCJyblwiLFwicnVcIixcInNtXCIsXCJzZ1wiLFwic2FcIixcInNjXCIsXCJnZFwiLFwic3JcIixcInNuXCIsXCJpaVwiLFwic2RcIixcInNpXCIsXCJzaVwiLFwic2tcIixcclxuICAgIFwic2xcIixcInNvXCIsXCJzdFwiLFwibnJcIixcImVzXCIsXCJzdVwiLFwic3dcIixcInNzXCIsXCJzdlwiLFwidGxcIixcInR5XCIsXCJ0Z1wiLFwidGFcIixcInR0XCIsXCJ0ZVwiLFwidGhcIixcImJvXCIsXCJ0aVwiLFwidG9cIixcInRzXCIsXCJ0blwiLFwidHJcIixcInRrXCIsXCJ0d1wiLFwidWdcIixcInVrXCIsXCJ1clwiLFwidWdcIixcInV6XCIsXCJjYVwiLFwidmVcIixcInZpXCIsXCJ2b1wiLFwid2FcIixcImN5XCIsXCJmeVwiLFwid29cIixcInhoXCIsXCJ5aVwiLFwieW9cIixcInphXCIsXCJ6dVwiXTtcclxuXHJcbmNvbnN0IHJlT3BlblN5bmMgPSAvPHN5bmMvaTtcclxuXHJcbmNvbnN0IHJlQ2xvc2VTeW5jID0gLzxzeW5jfDxcXC9ib2R5fDxcXC9zYW1pL2k7XHJcblxyXG5jb25zdCByZUxpbmVFbmRpbmcgPSAvXFxyXFxuP3xcXG4vZztcclxuXHJcbmNvbnN0IHJlQnJva2VuVGFnID0gLzxbYS16XSpbXj5dKjxbYS16XSovZztcclxuXHJcbmNvbnN0IHJlU3RhcnRUaW1lID0gLzxzeW5jW14+XSs/c3RhcnRbXj1dKj1bXjAtOV0qKFswLTldKilbXCJeMC05XCJdKi9pO1xyXG5cclxuY29uc3QgcmVCciA9IC88YnJbXj5dKj4vaWc7XHJcblxyXG5jb25zdCByZVN0eWxlID0gLzxzdHlsZVtePl0qPihbXFxzXFxTXSo/KTxcXC9zdHlsZVtePl0qPi9pO1xyXG5cclxuY29uc3QgcmVDb21tZW50ID0gLyg8IS0tfC0tPikvZztcclxuXHJcbmNvbnN0IGNsb25lID0gZnVuY3Rpb24ob2JqKSB7XHJcbiAgICB2YXIgZmxhZ3MsIGtleSwgbmV3SW5zdGFuY2U7XHJcbiAgICBpZiAoKG9iaiA9PSBudWxsKSB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9XHJcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgRGF0ZSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgRGF0ZShvYmouZ2V0VGltZSgpKTtcclxuICAgIH1cclxuICAgIGlmIChvYmogaW5zdGFuY2VvZiBSZWdFeHApIHtcclxuICAgICAgICBmbGFncyA9ICcnO1xyXG4gICAgICAgIGlmIChvYmouZ2xvYmFsICE9IG51bGwpIHtcclxuICAgICAgICAgICAgZmxhZ3MgKz0gJ2cnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob2JqLmlnbm9yZUNhc2UgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBmbGFncyArPSAnaSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvYmoubXVsdGlsaW5lICE9IG51bGwpIHtcclxuICAgICAgICAgICAgZmxhZ3MgKz0gJ20nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob2JqLnN0aWNreSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGZsYWdzICs9ICd5JztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAob2JqLnNvdXJjZSwgZmxhZ3MpO1xyXG4gICAgfVxyXG4gICAgbmV3SW5zdGFuY2UgPSBuZXcgb2JqLmNvbnN0cnVjdG9yKCk7XHJcbiAgICBmb3IgKGtleSBpbiBvYmopIHtcclxuICAgICAgICBuZXdJbnN0YW5jZVtrZXldID0gY2xvbmUob2JqW2tleV0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ld0luc3RhbmNlO1xyXG59O1xyXG5cclxuY29uc3Qgc3RyaXBfdGFncyA9IGZ1bmN0aW9uIChpbnB1dCwgYWxsb3dlZCkge1xyXG4gICAgLy8gaHR0cDovL2tldmluLnZhbnpvbm5ldmVsZC5uZXRcclxuICAgIC8vICsgICBvcmlnaW5hbCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cDovL2tldmluLnZhbnpvbm5ldmVsZC5uZXQpXHJcbiAgICAvLyArICAgaW1wcm92ZWQgYnk6IEx1a2UgR29kZnJleVxyXG4gICAgLy8gKyAgICAgIGlucHV0IGJ5OiBQdWxcclxuICAgIC8vICsgICBidWdmaXhlZCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cDovL2tldmluLnZhbnpvbm5ldmVsZC5uZXQpXHJcbiAgICAvLyArICAgYnVnZml4ZWQgYnk6IE9ubm8gTWFyc21hblxyXG4gICAgLy8gKyAgICAgIGlucHV0IGJ5OiBBbGV4XHJcbiAgICAvLyArICAgYnVnZml4ZWQgYnk6IEtldmluIHZhbiBab25uZXZlbGQgKGh0dHA6Ly9rZXZpbi52YW56b25uZXZlbGQubmV0KVxyXG4gICAgLy8gKyAgICAgIGlucHV0IGJ5OiBNYXJjIFBhbGF1XHJcbiAgICAvLyArICAgaW1wcm92ZWQgYnk6IEtldmluIHZhbiBab25uZXZlbGQgKGh0dHA6Ly9rZXZpbi52YW56b25uZXZlbGQubmV0KVxyXG4gICAgLy8gKyAgICAgIGlucHV0IGJ5OiBCcmV0dCBaYW1pciAoaHR0cDovL2JyZXR0LXphbWlyLm1lKVxyXG4gICAgLy8gKyAgIGJ1Z2ZpeGVkIGJ5OiBLZXZpbiB2YW4gWm9ubmV2ZWxkIChodHRwOi8va2V2aW4udmFuem9ubmV2ZWxkLm5ldClcclxuICAgIC8vICsgICBidWdmaXhlZCBieTogRXJpYyBOYWdlbFxyXG4gICAgLy8gKyAgICAgIGlucHV0IGJ5OiBCb2JieSBEcmFrZVxyXG4gICAgLy8gKyAgIGJ1Z2ZpeGVkIGJ5OiBLZXZpbiB2YW4gWm9ubmV2ZWxkIChodHRwOi8va2V2aW4udmFuem9ubmV2ZWxkLm5ldClcclxuICAgIC8vICsgICBidWdmaXhlZCBieTogVG9tYXN6IFdlc29sb3dza2lcclxuICAgIC8vICsgICAgICBpbnB1dCBieTogRXZlcnRqYW4gR2FycmV0c2VuXHJcbiAgICAvLyArICAgIHJldmlzZWQgYnk6IFJhZmHFgiBLdWthd3NraSAoaHR0cDovL2Jsb2cua3VrYXdza2kucGwvKVxyXG4gICAgLy8gKiAgICAgZXhhbXBsZSAxOiBzdHJpcF90YWdzKCc8cD5LZXZpbjwvcD4gPGJyIC8+PGI+dmFuPC9iPiA8aT5ab25uZXZlbGQ8L2k+JywgJzxpPjxiPicpO1xyXG4gICAgLy8gKiAgICAgcmV0dXJucyAxOiAnS2V2aW4gPGI+dmFuPC9iPiA8aT5ab25uZXZlbGQ8L2k+J1xyXG4gICAgLy8gKiAgICAgZXhhbXBsZSAyOiBzdHJpcF90YWdzKCc8cD5LZXZpbiA8aW1nIHNyYz1cInNvbWVpbWFnZS5wbmdcIiBvbm1vdXNlb3Zlcj1cInNvbWVGdW5jdGlvbigpXCI+dmFuIDxpPlpvbm5ldmVsZDwvaT48L3A+JywgJzxwPicpO1xyXG4gICAgLy8gKiAgICAgcmV0dXJucyAyOiAnPHA+S2V2aW4gdmFuIFpvbm5ldmVsZDwvcD4nXHJcbiAgICAvLyAqICAgICBleGFtcGxlIDM6IHN0cmlwX3RhZ3MoXCI8YSBocmVmPSdodHRwOi8va2V2aW4udmFuem9ubmV2ZWxkLm5ldCc+S2V2aW4gdmFuIFpvbm5ldmVsZDwvYT5cIiwgXCI8YT5cIik7XHJcbiAgICAvLyAqICAgICByZXR1cm5zIDM6ICc8YSBocmVmPSdodHRwOi8va2V2aW4udmFuem9ubmV2ZWxkLm5ldCc+S2V2aW4gdmFuIFpvbm5ldmVsZDwvYT4nXHJcbiAgICAvLyAqICAgICBleGFtcGxlIDQ6IHN0cmlwX3RhZ3MoJzEgPCA1IDUgPiAxJyk7XHJcbiAgICAvLyAqICAgICByZXR1cm5zIDQ6ICcxIDwgNSA1ID4gMSdcclxuICAgIC8vICogICAgIGV4YW1wbGUgNTogc3RyaXBfdGFncygnMSA8YnIvPiAxJyk7XHJcbiAgICAvLyAqICAgICByZXR1cm5zIDU6ICcxICAxJ1xyXG4gICAgLy8gKiAgICAgZXhhbXBsZSA2OiBzdHJpcF90YWdzKCcxIDxici8+IDEnLCAnPGJyPicpO1xyXG4gICAgLy8gKiAgICAgcmV0dXJucyA2OiAnMSAgMSdcclxuICAgIC8vICogICAgIGV4YW1wbGUgNzogc3RyaXBfdGFncygnMSA8YnIvPiAxJywgJzxicj48YnIvPicpO1xyXG4gICAgLy8gKiAgICAgcmV0dXJucyA3OiAnMSA8YnIvPiAxJ1xyXG4gICAgYWxsb3dlZCA9ICgoKGFsbG93ZWQgfHwgXCJcIikgKyBcIlwiKS50b0xvd2VyQ2FzZSgpLm1hdGNoKC88W2Etel1bYS16MC05XSo+L2cpIHx8IFtdKS5qb2luKCcnKTsgLy8gbWFraW5nIHN1cmUgdGhlIGFsbG93ZWQgYXJnIGlzIGEgc3RyaW5nIGNvbnRhaW5pbmcgb25seSB0YWdzIGluIGxvd2VyY2FzZSAoPGE+PGI+PGM+KVxyXG4gICAgdmFyIHRhZ3MgPSAvPFxcLz8oW2Etel1bYS16MC05XSopXFxiW14+XSo+L2dpLFxyXG4gICAgICAgIGNvbW1lbnRzQW5kUGhwVGFncyA9IC88IS0tW1xcc1xcU10qPy0tPnw8XFw/KD86cGhwKT9bXFxzXFxTXSo/XFw/Pi9naTtcclxuICAgIHJldHVybiBpbnB1dC5yZXBsYWNlKGNvbW1lbnRzQW5kUGhwVGFncywgJycpLnJlcGxhY2UodGFncywgZnVuY3Rpb24oJDAsICQxKSB7XHJcbiAgICAgICAgcmV0dXJuIGFsbG93ZWQuaW5kZXhPZignPCcgKyAkMS50b0xvd2VyQ2FzZSgpICsgJz4nKSA+IC0xID8gJDAgOiAnJztcclxuICAgIH0pO1xyXG59O1xyXG5cclxuY29uc3QgX3NvcnQgPSBmdW5jdGlvbihsYW5nSXRlbSkge1xyXG4gICAgcmV0dXJuIGxhbmdJdGVtLnNvcnQoZnVuY3Rpb24oYSwgYikge1xyXG4gICAgICAgIHZhciByZXM7XHJcbiAgICAgICAgaWYgKChyZXMgPSBhLnN0YXJ0IC0gYi5zdGFydCkgPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGEuZW5kIC0gYi5lbmQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXHJcbmNvbnN0IF9tZXJnZU11bHRpTGFuZ3VhZ2VzID0gZnVuY3Rpb24oYXJyKSB7XHJcbiAgICB2YXIgY29udGVudCwgZGljdCwgaSwgaWR4LCBrZXksIGxhbmcsIHJldCwgdmFsLCBfaSwgX2xlbiwgX3JlZjtcclxuICAgIGRpY3QgPSB7fTtcclxuICAgIGkgPSBhcnIubGVuZ3RoO1xyXG4gICAgcmV0ID0gW107XHJcbiAgICBmb3IgKGkgPSBfaSA9IDAsIF9sZW4gPSBhcnIubGVuZ3RoOyBfaSA8IF9sZW47IGkgPSArK19pKSB7XHJcbiAgICAgICAgdmFsID0gYXJyW2ldO1xyXG4gICAgICAgIGtleSA9IHZhbC5zdGFydFRpbWUgKyAnLCcgKyB2YWwuZW5kVGltZTtcclxuICAgICAgICBpZiAoKGlkeCA9IGRpY3Rba2V5XSkgIT09IHZvaWQgMCkge1xyXG4gICAgICAgICAgICBfcmVmID0gdmFsLmxhbmd1YWdlcztcclxuICAgICAgICAgICAgZm9yIChsYW5nIGluIF9yZWYpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBfcmVmW2xhbmddO1xyXG4gICAgICAgICAgICAgICAgcmV0W2lkeF0ubGFuZ3VhZ2VzW2xhbmddID0gY29udGVudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldC5wdXNoKHZhbCk7XHJcbiAgICAgICAgICAgIGRpY3Rba2V5XSA9IHJldC5sZW5ndGggLSAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXQ7XHJcbn07XHJcblxyXG5jb25zdCBTbWlQYXJzZXIgPSBmdW5jdGlvbihzYW1pLCBvcHRpb25zKSB7XHJcbiAgICB2YXIgZGVmaW5lZExhbmdzLCBkdXJhdGlvbiwgZXJyb3JzLCBnZXREZWZpbmVkTGFuZ3MsIGdldExhbmd1YWdlLCBrZXksIG1ha2VFbmRUaW1lLCBwYXJzZSwgcmVzdWx0LCB2YWx1ZSwgX3JlZjtcclxuICAgIHBhcnNlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQsIGVycm9yLCBpbm5lclRleHQsIGlzQnJva2VuLCBpdGVtLCBsYW5nLCBsYW5nSXRlbSwgbGluZU51bSwgbmV4dFN0YXJ0VGFnSWR4LCByZXQsIHN0YXJ0VGFnSWR4LCBzdGFydFRpbWUsIHN0ciwgdGVtcFJldCwgX3JlZiwgX3JlZjEsIF9yZWYyO1xyXG4gICAgICAgIGVycm9yID0gZnVuY3Rpb24oZXJyb3IpIHtcclxuICAgICAgICAgICAgdmFyIGU7XHJcbiAgICAgICAgICAgIGUgPSBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICBlLmxpbmUgPSBsaW5lTnVtO1xyXG4gICAgICAgICAgICBlLmNvbnRleHQgPSBlbGVtZW50O1xyXG4gICAgICAgICAgICByZXR1cm4gZXJyb3JzLnB1c2goZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsaW5lTnVtID0gMTtcclxuICAgICAgICByZXQgPSBbXTtcclxuICAgICAgICB0ZW1wUmV0ID0ge307XHJcbiAgICAgICAgc3RyID0gc2FtaTtcclxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgICAgICBzdGFydFRhZ0lkeCA9IHN0ci5zZWFyY2goKTtcclxuICAgICAgICAgICAgaWYgKG5leHRTdGFydFRhZ0lkeCA8PSAwIHx8IHN0YXJ0VGFnSWR4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV4dFN0YXJ0VGFnSWR4ID0gc3RyLnNsaWNlKHN0YXJ0VGFnSWR4ICsgMSkuc2VhcmNoKHJlQ2xvc2VTeW5jKSArIDE7XHJcbiAgICAgICAgICAgIGlmIChuZXh0U3RhcnRUYWdJZHggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gc3RyLnNsaWNlKHN0YXJ0VGFnSWR4LCBzdGFydFRhZ0lkeCArIG5leHRTdGFydFRhZ0lkeCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gc3RyLnNsaWNlKHN0YXJ0VGFnSWR4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsaW5lTnVtICs9ICgoX3JlZiA9IHN0ci5zbGljZSgwLCBzdGFydFRhZ0lkeCkubWF0Y2gocmVMaW5lRW5kaW5nKSkgIT0gbnVsbCA/IF9yZWYubGVuZ3RoIDogdm9pZCAwKSB8fCAwO1xyXG4gICAgICAgICAgICBpZiAoaXNCcm9rZW4gPSByZUJyb2tlblRhZy50ZXN0KGVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICBlcnJvcignRVJST1JfQlJPS0VOX1RBR1MnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdHIgPSBzdHIuc2xpY2Uoc3RhcnRUYWdJZHggKyBuZXh0U3RhcnRUYWdJZHgpO1xyXG4gICAgICAgICAgICBzdGFydFRpbWUgPSArKChfcmVmMSA9IGVsZW1lbnQubWF0Y2gocmVTdGFydFRpbWUpKSAhPSBudWxsID8gX3JlZjFbMV0vMTAwMCA6IHZvaWQgMCk7ICAvL0hTTEVFIG1zIC0+IHMg66GcIOuzgOqyvVxyXG4gICAgICAgICAgICBpZiAoc3RhcnRUaW1lID09PSBudWxsIHx8IHN0YXJ0VGltZSA8IDApIHtcclxuICAgICAgICAgICAgICAgIGVycm9yKCdFUlJPUl9JTlZBTElEX1RJTUUnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gV2UgZG9uJ3QgbmVlZCBjb21wbGV4IGxhbmd1YWdlLiBjdXMgU01JIGRvZW5zJ3Qgb2JleSB0aGUgcnVsZXMuLi5cclxuICAgICAgICAgICAgLy9sYW5nID0gZ2V0TGFuZ3VhZ2UoZWxlbWVudCk7XHJcbiAgICAgICAgICAgIGxhbmcgPSBcImtvXCI7XHJcbiAgICAgICAgICAgIC8qaWYgKCFsYW5nKSB7XHJcbiAgICAgICAgICAgICAgICBlcnJvcignRVJST1JfSU5WQUxJRF9MQU5HVUFHRScpO1xyXG4gICAgICAgICAgICB9Ki9cclxuICAgICAgICAgICAgbGluZU51bSArPSAoKF9yZWYyID0gZWxlbWVudC5tYXRjaChyZUxpbmVFbmRpbmcpKSAhPSBudWxsID8gX3JlZjIubGVuZ3RoIDogdm9pZCAwKSB8fCAwO1xyXG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5yZXBsYWNlKHJlTGluZUVuZGluZywgJycpO1xyXG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5yZXBsYWNlKHJlQnIsIFwiXFxuXCIpO1xyXG4gICAgICAgICAgICBpbm5lclRleHQgPSBzdHJpcF90YWdzKGVsZW1lbnQpLnRyaW0oKTtcclxuXHJcbiAgICAgICAgICAgIC8vSFNMRUUgOiAyMDE4MDUzMCAtIOyasOumsCDrnq3quLDsp4Ag6rWs67aE7J20IO2VhOyalCDsl4bri6QuIOyeiOuKlOqxsCDqt7jrjIDroZwg67O07Jes7KSE67+QXHJcbiAgICAgICAgICAgIGl0ZW0gPSB7XHJcbiAgICAgICAgICAgICAgICBzdGFydDogc3RhcnRUaW1lLFxyXG4gICAgICAgICAgICAgICAgLy9sYW5ndWFnZXM6IHt9LFxyXG4gICAgICAgICAgICAgICAgLy9sYW5ndWFnZSA6IGxhbmcsXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgY29udGVudHM6IGlubmVyVGV4dFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZiAobGFuZykge1xyXG4gICAgICAgICAgICAgICAgLy9pdGVtLmxhbmd1YWdlc1tsYW5nXSA9IGlubmVyVGV4dDtcclxuICAgICAgICAgICAgICAgIGl0ZW0udGV4dCA9IGlubmVyVGV4dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0ZW1wUmV0W2xhbmddIHx8ICh0ZW1wUmV0W2xhbmddID0gW10pO1xyXG4gICAgICAgICAgICBpZihpdGVtLnN0YXJ0KXtcclxuICAgICAgICAgICAgICAgIHRlbXBSZXRbbGFuZ10ucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsYW5nIGluIHRlbXBSZXQpIHtcclxuICAgICAgICAgICAgbGFuZ0l0ZW0gPSB0ZW1wUmV0W2xhbmddO1xyXG4gICAgICAgICAgICBsYW5nSXRlbSA9IF9zb3J0KGxhbmdJdGVtKTtcclxuICAgICAgICAgICAgbGFuZ0l0ZW0gPSBtYWtlRW5kVGltZShsYW5nSXRlbSk7XHJcbiAgICAgICAgICAgIHJldCA9IHJldC5jb25jYXQobGFuZ0l0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL3JldCA9IF9tZXJnZU11bHRpTGFuZ3VhZ2VzKHJldCk7XHJcbiAgICAgICAgcmV0ID0gX3NvcnQocmV0KTtcclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfTtcclxuICAgIGdldExhbmd1YWdlID0gZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICAgICAgIHZhciBjbGFzc05hbWUsIGxhbmc7XHJcbiAgICAgICAgaWYoIWVsZW1lbnQpe3JldHVybiA7fVxyXG4gICAgICAgIGZvciAoY2xhc3NOYW1lIGluIGRlZmluZWRMYW5ncykge1xyXG4gICAgICAgICAgICBsYW5nID0gZGVmaW5lZExhbmdzW2NsYXNzTmFtZV07XHJcbiAgICAgICAgICAgIGlmIChsYW5nLnJlQ2xhc3NOYW1lLnRlc3QoZWxlbWVudCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsYW5nLmxhbmc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgZ2V0RGVmaW5lZExhbmdzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGNsYXNzTmFtZSwgZGVjbGFyYXRpb24sIGUsIGVycm9yLCBsYW5nLCBtYXRjaGVkLCBwYXJzZWQsIHJ1bGUsIHNlbGVjdG9yLCBfaSwgX2xlbiwgX3JlZiwgX3JlZjEsIF9yZXN1bHRzO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIG1hdGNoZWQgPSAoKF9yZWYgPSBzYW1pLm1hdGNoKHJlU3R5bGUpKSAhPSBudWxsID8gX3JlZlsxXSA6IHZvaWQgMCkgfHwgJyc7XHJcbiAgICAgICAgICAgIG1hdGNoZWQgPSBtYXRjaGVkLnJlcGxhY2UocmVDb21tZW50LCAnJyk7XHJcbiAgICAgICAgICAgIHBhcnNlZCA9IGNzc1BhcnNlKG1hdGNoZWQpO1xyXG4gICAgICAgICAgICBfcmVmMSA9IHBhcnNlZC5zdHlsZXNoZWV0LnJ1bGVzO1xyXG4gICAgICAgICAgICBfcmVzdWx0cyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IF9yZWYxLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBydWxlID0gX3JlZjFbX2ldO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0b3IgPSBydWxlLnNlbGVjdG9yc1swXTtcclxuICAgICAgICAgICAgICAgIGlmICgoc2VsZWN0b3IgIT0gbnVsbCA/IHNlbGVjdG9yWzBdIDogdm9pZCAwKSA9PT0gJy4nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3Jlc3VsdHMucHVzaCgoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfaiwgX2xlbjEsIF9yZWYyLCBfcmVzdWx0czE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZWYyID0gcnVsZS5kZWNsYXJhdGlvbnM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZXN1bHRzMSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKF9qID0gMCwgX2xlbjEgPSBfcmVmMi5sZW5ndGg7IF9qIDwgX2xlbjE7IF9qKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlY2xhcmF0aW9uID0gX3JlZjJbX2pdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlY2xhcmF0aW9uLnByb3BlcnR5LnRvTG93ZXJDYXNlKCkgPT09ICdsYW5nJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9IHNlbGVjdG9yLnNsaWNlKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhbmcgPSBkZWNsYXJhdGlvbi52YWx1ZS5zbGljZSgwLCAyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAofmxhbmdDb2Rlcy5pbmRleE9mKGxhbmcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZXN1bHRzMS5wdXNoKGRlZmluZWRMYW5nc1tjbGFzc05hbWVdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFuZzogbGFuZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlQ2xhc3NOYW1lOiBuZXcgUmVnRXhwKFwiY2xhc3NbXj1dKj89W1xcXCInXFxTXSooXCIgKyBjbGFzc05hbWUgKyBcIilbJ1xcXCJcXFNdP1wiLCAnaScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IEVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVzdWx0czEucHVzaCh2b2lkIDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVzdWx0czE7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkoKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIF9yZXN1bHRzLnB1c2godm9pZCAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gX3Jlc3VsdHM7XHJcbiAgICAgICAgfSBjYXRjaCAoX2Vycm9yKSB7XHJcbiAgICAgICAgICAgIGUgPSBfZXJyb3I7XHJcbiAgICAgICAgICAgIGVycm9ycy5wdXNoKGVycm9yID0gbmV3IEVycm9yKCdFUlJPUl9JTlZBTElEX0xBTkdVQUdFX0RFRklOSVRJT04nKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIG1ha2VFbmRUaW1lID0gZnVuY3Rpb24obGFuZ0l0ZW0pIHtcclxuICAgICAgICB2YXIgaSwgaXRlbSwgX3JlZjtcclxuICAgICAgICBpID0gbGFuZ0l0ZW0ubGVuZ3RoO1xyXG4gICAgICAgIHdoaWxlIChpLS0pIHtcclxuICAgICAgICAgICAgaXRlbSA9IGxhbmdJdGVtW2ldO1xyXG4gICAgICAgICAgICBpZiAoKF9yZWYgPSBsYW5nSXRlbVtpIC0gMV0pICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIC8vSFNMRUUgOiDsnbTsmZXsnbTrqbQgU1JUIO2MjOyEnOyZgCDtj6zrp7fsnYQg66ee7LaU7J6QXHJcbiAgICAgICAgICAgICAgICBfcmVmLmVuZCA9IGl0ZW0uc3RhcnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFpdGVtLmNvbnRlbnRzIHx8IGl0ZW0uY29udGVudHMgPT09ICcmbmJzcDsnKSB7XHJcbiAgICAgICAgICAgICAgICBsYW5nSXRlbS5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgbGFuZ0l0ZW1baV0uY29udGVudHM7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWl0ZW0uZW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5lbmQgPSBpdGVtLnN0YXJ0ICsgZHVyYXRpb247XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxhbmdJdGVtO1xyXG4gICAgfTtcclxuICAgIGVycm9ycyA9IFtdO1xyXG4gICAgZGVmaW5lZExhbmdzID0ge1xyXG4gICAgICAgIEtSQ0M6IHtcclxuICAgICAgICAgICAgbGFuZzogJ2tvJyxcclxuICAgICAgICAgICAgcmVDbGFzc05hbWU6IG5ldyBSZWdFeHAoXCJjbGFzc1tePV0qPz1bXFxcIidcXFNdKihLUkNDKVsnXFxcIlxcU10/XCIsICdpJylcclxuICAgICAgICB9LFxyXG4gICAgICAgIEtPQ0M6IHtcclxuICAgICAgICAgICAgbGFuZzogJ2tvJyxcclxuICAgICAgICAgICAgcmVDbGFzc05hbWU6IG5ldyBSZWdFeHAoXCJjbGFzc1tePV0qPz1bXFxcIidcXFNdKihLT0NDKVsnXFxcIlxcU10/XCIsICdpJylcclxuICAgICAgICB9LFxyXG4gICAgICAgIEtSOiB7XHJcbiAgICAgICAgICAgIGxhbmc6ICdrbycsXHJcbiAgICAgICAgICAgIHJlQ2xhc3NOYW1lOiBuZXcgUmVnRXhwKFwiY2xhc3NbXj1dKj89W1xcXCInXFxTXSooS1IpWydcXFwiXFxTXT9cIiwgJ2knKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgRU5DQzoge1xyXG4gICAgICAgICAgICBsYW5nOiAnZW4nLFxyXG4gICAgICAgICAgICByZUNsYXNzTmFtZTogbmV3IFJlZ0V4cChcImNsYXNzW149XSo/PVtcXFwiJ1xcU10qKEVOQ0MpWydcXFwiXFxTXT9cIiwgJ2knKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgRUdDQzoge1xyXG4gICAgICAgICAgICBsYW5nOiAnZW4nLFxyXG4gICAgICAgICAgICByZUNsYXNzTmFtZTogbmV3IFJlZ0V4cChcImNsYXNzW149XSo/PVtcXFwiJ1xcU10qKEVHQ0MpWydcXFwiXFxTXT9cIiwgJ2knKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgRU46IHtcclxuICAgICAgICAgICAgbGFuZzogJ2VuJyxcclxuICAgICAgICAgICAgcmVDbGFzc05hbWU6IG5ldyBSZWdFeHAoXCJjbGFzc1tePV0qPz1bXFxcIidcXFNdKihFTilbJ1xcXCJcXFNdP1wiLCAnaScpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBKUENDOiB7XHJcbiAgICAgICAgICAgIGxhbmc6ICdqYScsXHJcbiAgICAgICAgICAgIHJlQ2xhc3NOYW1lOiBuZXcgUmVnRXhwKFwiY2xhc3NbXj1dKj89W1xcXCInXFxTXSooSlBDQylbJ1xcXCJcXFNdP1wiLCAnaScpXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGlmIChvcHRpb25zICE9IG51bGwgPyBvcHRpb25zLmRlZmluZWRMYW5ncyA6IHZvaWQgMCkge1xyXG4gICAgICAgIF9yZWYgPSBvcHRpb25zLmRlZmluZWRMYW5ncztcclxuICAgICAgICBmb3IgKGtleSBpbiBfcmVmKSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gX3JlZltrZXldO1xyXG4gICAgICAgICAgICBkZWZpbmVkTGFuZ3Nba2V5XSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGR1cmF0aW9uID0gKG9wdGlvbnMgIT0gbnVsbCA/IG9wdGlvbnMuZHVyYXRpb24gOiB2b2lkIDApIHx8IDEwOyAvL0hTTEVFIG1zIC0+IHMg66GcIOuzgOqyvVxyXG4gICAgc2FtaSA9IHNhbWkudHJpbSgpO1xyXG4gICAgLy9nZXREZWZpbmVkTGFuZ3MoKTtcclxuICAgIHJlc3VsdCA9IHBhcnNlKCk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3VsdDogcmVzdWx0LFxyXG4gICAgICAgIGVycm9yczogZXJyb3JzXHJcbiAgICB9O1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNtaVBhcnNlcjsiXSwic291cmNlUm9vdCI6IiJ9