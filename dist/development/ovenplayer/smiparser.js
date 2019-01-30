/*! OvenPlayerv0.8.3 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

var _browser = __webpack_require__(/*! utils/browser */ "./src/js/utils/browser.js");

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
    var definedLangs, duration, errors, getDefinedLangs, getLanguage, key, makeEndTime, parse, result, value, _ref, fixedLang;
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
            startTime = +((_ref1 = element.match(reStartTime)) != null ? parseFloat(_ref1[1] / 1000) : void 0); //HSLEE ms -> s 로 변경
            if (startTime === null || startTime < 0) {
                error('ERROR_INVALID_TIME');
            }

            // We don't need complex language. cus SMI doens't obey the rules...
            lang = getLanguage(element);
            //lang = "ko";
            if (!lang) {
                // continue;
                error('ERROR_INVALID_LANGUAGE');
            }
            lineNum += ((_ref2 = element.match(reLineEnding)) != null ? _ref2.length : void 0) || 0;
            element = element.replace(reLineEnding, '');
            element = element.replace(reBr, "\n");
            innerText = strip_tags(element).trim();

            //HSLEE : 20180530 - 우린 랭기지 구분이 필요 없다. 있는거 그대로 보여줄뿐
            item = {
                start: startTime,
                //languages: {},
                text: "",
                contents: innerText
            };
            if (lang) {
                //item.languages[lang] = innerText;
                item.text = innerText;
            }
            tempRet[lang] || (tempRet[lang] = []);
            //tempRet[lang].push(item);
            if (item.start) {
                tempRet[lang].push(item);
            }
        }

        //fixed by hslee 190130
        //SMI was designed for multi language. But global standard (my guess) SRT, VTT doesn't support multi language.
        //This update is handling if SMI has multiple languages.
        fixedLang = fixedLang || (0, _browser.getBrowserLanguage)();
        var convertedLanguageNames = Object.keys(tempRet);
        if (convertedLanguageNames && convertedLanguageNames.length > 0) {
            if (convertedLanguageNames.indexOf(fixedLang) > -1) {
                langItem = tempRet[fixedLang];
            } else {
                langItem = tempRet[convertedLanguageNames[0]];
            }
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
    fixedLang = options.fixedLang;
    sami = sami.trim();
    //getDefinedLangs();
    result = parse();
    return {
        result: result,
        errors: errors
    };
};

exports["default"] = SmiParser;

/***/ }),

/***/ "./src/js/utils/browser.js":
/*!*********************************!*\
  !*** ./src/js/utils/browser.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by hoho on 2018. 8. 24..
 */

var getBrowserLanguage = exports.getBrowserLanguage = function getBrowserLanguage() {
    var nav = window.navigator,
        browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
        i = void 0,
        language = void 0;

    // support for HTML 5.1 "navigator.languages"
    if (Array.isArray(nav.languages)) {
        for (i = 0; i < nav.languages.length; i++) {
            language = nav.languages[i];
            if (language && language.length) {
                return language;
            }
        }
    }

    // support for other well known properties in browsers
    for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
        language = nav[browserLanguagePropertyKeys[i]];
        if (language && language.length) {
            return language;
        }
    }

    return null;
};

var getBrowser = exports.getBrowser = function getBrowser() {
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
        return 'opera';
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
        return 'chrome';
    } else if (navigator.userAgent.indexOf("Safari") != -1) {
        return 'safari';
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
        return 'firefox';
    } else if (navigator.userAgent.indexOf("MSIE") != -1) {
        var msie = navigator.userAgent.indexOf("MSIE");
        /*if(!!document.documentMode == true ){
            return 'ie';
        }else if(!!navigator.userAgent.match(/Trident.*rv\:11\./)){
            if (!isNaN(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))))) {
                return 'ie';
            }else{
                return 'unknown';
            }
        }else{
            return 'unknown';
        }*/
        var ie = function () {

            var undef,
                v = 3,
                div = document.createElement('div'),
                all = div.getElementsByTagName('i');

            while (div.innerHTML = '<!--[if gt IE ' + ++v + ']><i></i><![endif]-->', all[0]) {}

            return v > 4 ? v : undef;
        }();
        if (ie < 9) {
            return 'oldIE';
        } else {
            return 'modernIE';
        }
    } else {
        return 'unknown';
    }
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2NhcHRpb24vcGFyc2VyL1NtaVBhcnNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvYnJvd3Nlci5qcyJdLCJuYW1lcyI6WyJsYW5nQ29kZXMiLCJyZU9wZW5TeW5jIiwicmVDbG9zZVN5bmMiLCJyZUxpbmVFbmRpbmciLCJyZUJyb2tlblRhZyIsInJlU3RhcnRUaW1lIiwicmVCciIsInJlU3R5bGUiLCJyZUNvbW1lbnQiLCJjbG9uZSIsIm9iaiIsImZsYWdzIiwia2V5IiwibmV3SW5zdGFuY2UiLCJEYXRlIiwiZ2V0VGltZSIsIlJlZ0V4cCIsImdsb2JhbCIsImlnbm9yZUNhc2UiLCJtdWx0aWxpbmUiLCJzdGlja3kiLCJzb3VyY2UiLCJjb25zdHJ1Y3RvciIsInN0cmlwX3RhZ3MiLCJpbnB1dCIsImFsbG93ZWQiLCJ0b0xvd2VyQ2FzZSIsIm1hdGNoIiwiam9pbiIsInRhZ3MiLCJjb21tZW50c0FuZFBocFRhZ3MiLCJyZXBsYWNlIiwiJDAiLCIkMSIsImluZGV4T2YiLCJfc29ydCIsImxhbmdJdGVtIiwic29ydCIsImEiLCJiIiwicmVzIiwic3RhcnQiLCJlbmQiLCJfbWVyZ2VNdWx0aUxhbmd1YWdlcyIsImFyciIsImNvbnRlbnQiLCJkaWN0IiwiaSIsImlkeCIsImxhbmciLCJyZXQiLCJ2YWwiLCJfaSIsIl9sZW4iLCJfcmVmIiwibGVuZ3RoIiwic3RhcnRUaW1lIiwiZW5kVGltZSIsImxhbmd1YWdlcyIsInB1c2giLCJTbWlQYXJzZXIiLCJzYW1pIiwib3B0aW9ucyIsImRlZmluZWRMYW5ncyIsImR1cmF0aW9uIiwiZXJyb3JzIiwiZ2V0RGVmaW5lZExhbmdzIiwiZ2V0TGFuZ3VhZ2UiLCJtYWtlRW5kVGltZSIsInBhcnNlIiwicmVzdWx0IiwidmFsdWUiLCJmaXhlZExhbmciLCJlbGVtZW50IiwiZXJyb3IiLCJpbm5lclRleHQiLCJpc0Jyb2tlbiIsIml0ZW0iLCJsaW5lTnVtIiwibmV4dFN0YXJ0VGFnSWR4Iiwic3RhcnRUYWdJZHgiLCJzdHIiLCJ0ZW1wUmV0IiwiX3JlZjEiLCJfcmVmMiIsImUiLCJFcnJvciIsImxpbmUiLCJjb250ZXh0Iiwic2VhcmNoIiwic2xpY2UiLCJ0ZXN0IiwicGFyc2VGbG9hdCIsInRyaW0iLCJ0ZXh0IiwiY29udGVudHMiLCJjb252ZXJ0ZWRMYW5ndWFnZU5hbWVzIiwiT2JqZWN0Iiwia2V5cyIsImNvbmNhdCIsImNsYXNzTmFtZSIsInJlQ2xhc3NOYW1lIiwiZGVjbGFyYXRpb24iLCJtYXRjaGVkIiwicGFyc2VkIiwicnVsZSIsInNlbGVjdG9yIiwiX3Jlc3VsdHMiLCJjc3NQYXJzZSIsInN0eWxlc2hlZXQiLCJydWxlcyIsInNlbGVjdG9ycyIsIl9qIiwiX2xlbjEiLCJfcmVzdWx0czEiLCJkZWNsYXJhdGlvbnMiLCJwcm9wZXJ0eSIsIl9lcnJvciIsInNwbGljZSIsIktSQ0MiLCJLT0NDIiwiS1IiLCJFTkNDIiwiRUdDQyIsIkVOIiwiSlBDQyIsImdldEJyb3dzZXJMYW5ndWFnZSIsIm5hdiIsIndpbmRvdyIsIm5hdmlnYXRvciIsImJyb3dzZXJMYW5ndWFnZVByb3BlcnR5S2V5cyIsImxhbmd1YWdlIiwiQXJyYXkiLCJpc0FycmF5IiwiZ2V0QnJvd3NlciIsInVzZXJBZ2VudCIsIm1zaWUiLCJpZSIsInVuZGVmIiwidiIsImRpdiIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImFsbCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiaW5uZXJIVE1MIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7Ozs7OztBQVNBLElBQU1BLFlBQVksQ0FBQyxJQUFELEVBQU0sSUFBTixFQUFXLElBQVgsRUFBaUIsSUFBakIsRUFBdUIsSUFBdkIsRUFBNkIsSUFBN0IsRUFBbUMsSUFBbkMsRUFBeUMsSUFBekMsRUFBK0MsSUFBL0MsRUFBcUQsSUFBckQsRUFBMkQsSUFBM0QsRUFBaUUsSUFBakUsRUFBdUUsSUFBdkUsRUFBNkUsSUFB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VU0sU0FBVixDQUFvQnJHLE9BQXBCLENBQTRCLE1BQTVCLEtBQXVDLENBQUMsQ0FBNUMsRUFBZ0Q7QUFDbEQsWUFBSXNHLE9BQU9QLFVBQVVNLFNBQVYsQ0FBb0JyRyxPQUFwQixDQUE0QixNQUE1QixDQUFYO0FBQ0E7Ozs7Ozs7Ozs7O0FBV0EsWUFBSXVHLEtBQU0sWUFBVTs7QUFFaEIsZ0JBQUlDLEtBQUo7QUFBQSxnQkFDSUMsSUFBSSxDQURSO0FBQUEsZ0JBRUlDLE1BQU1DLFNBQVNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FGVjtBQUFBLGdCQUdJQyxNQUFNSCxJQUFJSSxvQkFBSixDQUF5QixHQUF6QixDQUhWOztBQUtBLG1CQUNJSixJQUFJSyxTQUFKLEdBQWdCLG1CQUFvQixFQUFFTixDQUF0QixHQUEyQix1QkFBM0MsRUFDSUksSUFBSSxDQUFKLENBRlI7O0FBS0EsbUJBQU9KLElBQUksQ0FBSixHQUFRQSxDQUFSLEdBQVlELEtBQW5CO0FBRUgsU0FkUyxFQUFWO0FBZUEsWUFBR0QsS0FBSyxDQUFSLEVBQVU7QUFDTixtQkFBTyxPQUFQO0FBQ0gsU0FGRCxNQUVLO0FBQ0QsbUJBQU8sVUFBUDtBQUNIO0FBRUosS0FsQ0ssTUFrQ0Q7QUFDRCxlQUFPLFNBQVA7QUFDSDtBQUVKLENBL0NNLEMiLCJmaWxlIjoic21pcGFyc2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtnZXRCcm93c2VyTGFuZ3VhZ2V9IGZyb20gXCJ1dGlscy9icm93c2VyXCI7XHJcbi8qXHJcbiAqICBzYW1pLXBhcnNlclxyXG4gKiAgVGhlIE1JVCBMaWNlbnNlIChNSVQpXHJcbiAqXHJcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTMgQ29uc3RhbnRpbmUgS2ltIDxlbGVnYW50Y29kZXJAZ21haWwuY29tPlxyXG4gKiAgaHR0cHM6Ly9naXRodWIuY29tL2VsZWdhbnRjb2Rlci9zYW1pLXBhcnNlclxyXG4gKlxyXG4gKi9cclxuXHJcbmNvbnN0IGxhbmdDb2RlcyA9IFtcImFiXCIsXCJhYVwiLFwiYWZcIiwgXCJha1wiLCBcInNxXCIsIFwiYW1cIiwgXCJhclwiLCBcImFuXCIsIFwiaHlcIiwgXCJhc1wiLCBcImF2XCIsIFwiYWVcIiwgXCJheVwiLCBcImF6XCIsIFwiYm1cIiwgXCJiYVwiLCBcImV1XCIsIFwiYmVcIiwgXCJiblwiLCBcImJoXCIsIFwiYmlcIiwgXCJuYlwiLFwiYnNcIixcImJyXCIsXCJiZ1wiLFwibXlcIixcImVzXCIsXCJjYVwiLFwia21cIixcImNoXCIsXCJjZVwiLFwibnlcIixcIm55XCIsXCJ6aFwiLFwiemFcIixcImN1XCIsXCJjdVwiLFwiY3ZcIixcImt3XCIsXHJcbiAgICBcImNvXCIsXCJjclwiLFwiaHJcIixcImNzXCIsXCJkYVwiLFwiZHZcIixcImR2XCIsXCJubFwiLFwiZHpcIixcImVuXCIsXCJlb1wiLFwiZXRcIixcImVlXCIsXCJmb1wiLFwiZmpcIixcImZpXCIsXCJubFwiLFwiZnJcIixcImZmXCIsXCJnZFwiLFwiZ2xcIixcImxnXCIsXCJrYVwiLFwiZGVcIixcImtpXCIsXCJlbFwiLFwia2xcIixcImduXCIsXCJndVwiLFwiaHRcIixcImh0XCIsXCJoYVwiLFwiaGVcIixcImh6XCIsXCJoaVwiLFwiaG9cIixcImh1XCIsXCJpc1wiLFwiaW9cIixcImlnXCIsXCJpZFwiLFwiaWFcIixcImllXCIsXCJpdVwiLFwiaWtcIixcImdhXCIsXHJcbiAgICBcIml0XCIsXCJqYVwiLFwianZcIixcImtsXCIsXCJrblwiLFwia3JcIixcImtzXCIsXCJra1wiLFwia2lcIixcInJ3XCIsXCJreVwiLFwia3ZcIixcImtnXCIsXCJrb1wiLFwia2pcIixcImt1XCIsXCJralwiLFwia3lcIixcImxvXCIsXCJsYVwiLFwibHZcIixcImxiXCIsXCJsaVwiLFwibGlcIixcImxpXCIsXCJsblwiLFwibHRcIixcImx1XCIsXCJsYlwiLFwibWtcIixcIm1nXCIsXCJtc1wiLFwibWxcIixcImR2XCIsXCJtdFwiLFwiZ3ZcIixcIm1pXCIsXCJtclwiLFwibWhcIixcInJvXCIsXCJyb1wiLFwibW5cIixcIm5hXCIsXCJudlwiLFwibnZcIixcIm5kXCIsXHJcbiAgICBcIm5yXCIsXCJuZ1wiLFwibmVcIixcIm5kXCIsXCJzZVwiLFwibm9cIixcIm5iXCIsXCJublwiLFwiaWlcIixcIm55XCIsXCJublwiLFwiaWVcIixcIm9jXCIsXCJvalwiLFwiY3VcIixcImN1XCIsXCJjdVwiLFwib3JcIixcIm9tXCIsXCJvc1wiLFwib3NcIixcInBpXCIsXCJwYVwiLFwicHNcIixcImZhXCIsXCJwbFwiLFwicHRcIixcInBhXCIsXCJwc1wiLFwicXVcIixcInJvXCIsXCJybVwiLFwicm5cIixcInJ1XCIsXCJzbVwiLFwic2dcIixcInNhXCIsXCJzY1wiLFwiZ2RcIixcInNyXCIsXCJzblwiLFwiaWlcIixcInNkXCIsXCJzaVwiLFwic2lcIixcInNrXCIsXHJcbiAgICBcInNsXCIsXCJzb1wiLFwic3RcIixcIm5yXCIsXCJlc1wiLFwic3VcIixcInN3XCIsXCJzc1wiLFwic3ZcIixcInRsXCIsXCJ0eVwiLFwidGdcIixcInRhXCIsXCJ0dFwiLFwidGVcIixcInRoXCIsXCJib1wiLFwidGlcIixcInRvXCIsXCJ0c1wiLFwidG5cIixcInRyXCIsXCJ0a1wiLFwidHdcIixcInVnXCIsXCJ1a1wiLFwidXJcIixcInVnXCIsXCJ1elwiLFwiY2FcIixcInZlXCIsXCJ2aVwiLFwidm9cIixcIndhXCIsXCJjeVwiLFwiZnlcIixcIndvXCIsXCJ4aFwiLFwieWlcIixcInlvXCIsXCJ6YVwiLFwienVcIl07XHJcblxyXG5jb25zdCByZU9wZW5TeW5jID0gLzxzeW5jL2k7XHJcblxyXG5jb25zdCByZUNsb3NlU3luYyA9IC88c3luY3w8XFwvYm9keXw8XFwvc2FtaS9pO1xyXG5cclxuY29uc3QgcmVMaW5lRW5kaW5nID0gL1xcclxcbj98XFxuL2c7XHJcblxyXG5jb25zdCByZUJyb2tlblRhZyA9IC88W2Etel0qW14+XSo8W2Etel0qL2c7XHJcblxyXG5jb25zdCByZVN0YXJ0VGltZSA9IC88c3luY1tePl0rP3N0YXJ0W149XSo9W14wLTldKihbMC05XSopW1wiXjAtOVwiXSovaTtcclxuXHJcbmNvbnN0IHJlQnIgPSAvPGJyW14+XSo+L2lnO1xyXG5cclxuY29uc3QgcmVTdHlsZSA9IC88c3R5bGVbXj5dKj4oW1xcc1xcU10qPyk8XFwvc3R5bGVbXj5dKj4vaTtcclxuXHJcbmNvbnN0IHJlQ29tbWVudCA9IC8oPCEtLXwtLT4pL2c7XHJcblxyXG5jb25zdCBjbG9uZSA9IGZ1bmN0aW9uKG9iaikge1xyXG4gICAgdmFyIGZsYWdzLCBrZXksIG5ld0luc3RhbmNlO1xyXG4gICAgaWYgKChvYmogPT0gbnVsbCkgfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfVxyXG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mIERhdGUpIHtcclxuICAgICAgICByZXR1cm4gbmV3IERhdGUob2JqLmdldFRpbWUoKSk7XHJcbiAgICB9XHJcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgUmVnRXhwKSB7XHJcbiAgICAgICAgZmxhZ3MgPSAnJztcclxuICAgICAgICBpZiAob2JqLmdsb2JhbCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGZsYWdzICs9ICdnJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9iai5pZ25vcmVDYXNlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgZmxhZ3MgKz0gJ2knO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob2JqLm11bHRpbGluZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGZsYWdzICs9ICdtJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9iai5zdGlja3kgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBmbGFncyArPSAneSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKG9iai5zb3VyY2UsIGZsYWdzKTtcclxuICAgIH1cclxuICAgIG5ld0luc3RhbmNlID0gbmV3IG9iai5jb25zdHJ1Y3RvcigpO1xyXG4gICAgZm9yIChrZXkgaW4gb2JqKSB7XHJcbiAgICAgICAgbmV3SW5zdGFuY2Vba2V5XSA9IGNsb25lKG9ialtrZXldKTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXdJbnN0YW5jZTtcclxufTtcclxuXHJcbmNvbnN0IHN0cmlwX3RhZ3MgPSBmdW5jdGlvbiAoaW5wdXQsIGFsbG93ZWQpIHtcclxuICAgIC8vIGh0dHA6Ly9rZXZpbi52YW56b25uZXZlbGQubmV0XHJcbiAgICAvLyArICAgb3JpZ2luYWwgYnk6IEtldmluIHZhbiBab25uZXZlbGQgKGh0dHA6Ly9rZXZpbi52YW56b25uZXZlbGQubmV0KVxyXG4gICAgLy8gKyAgIGltcHJvdmVkIGJ5OiBMdWtlIEdvZGZyZXlcclxuICAgIC8vICsgICAgICBpbnB1dCBieTogUHVsXHJcbiAgICAvLyArICAgYnVnZml4ZWQgYnk6IEtldmluIHZhbiBab25uZXZlbGQgKGh0dHA6Ly9rZXZpbi52YW56b25uZXZlbGQubmV0KVxyXG4gICAgLy8gKyAgIGJ1Z2ZpeGVkIGJ5OiBPbm5vIE1hcnNtYW5cclxuICAgIC8vICsgICAgICBpbnB1dCBieTogQWxleFxyXG4gICAgLy8gKyAgIGJ1Z2ZpeGVkIGJ5OiBLZXZpbiB2YW4gWm9ubmV2ZWxkIChodHRwOi8va2V2aW4udmFuem9ubmV2ZWxkLm5ldClcclxuICAgIC8vICsgICAgICBpbnB1dCBieTogTWFyYyBQYWxhdVxyXG4gICAgLy8gKyAgIGltcHJvdmVkIGJ5OiBLZXZpbiB2YW4gWm9ubmV2ZWxkIChodHRwOi8va2V2aW4udmFuem9ubmV2ZWxkLm5ldClcclxuICAgIC8vICsgICAgICBpbnB1dCBieTogQnJldHQgWmFtaXIgKGh0dHA6Ly9icmV0dC16YW1pci5tZSlcclxuICAgIC8vICsgICBidWdmaXhlZCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cDovL2tldmluLnZhbnpvbm5ldmVsZC5uZXQpXHJcbiAgICAvLyArICAgYnVnZml4ZWQgYnk6IEVyaWMgTmFnZWxcclxuICAgIC8vICsgICAgICBpbnB1dCBieTogQm9iYnkgRHJha2VcclxuICAgIC8vICsgICBidWdmaXhlZCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cDovL2tldmluLnZhbnpvbm5ldmVsZC5uZXQpXHJcbiAgICAvLyArICAgYnVnZml4ZWQgYnk6IFRvbWFzeiBXZXNvbG93c2tpXHJcbiAgICAvLyArICAgICAgaW5wdXQgYnk6IEV2ZXJ0amFuIEdhcnJldHNlblxyXG4gICAgLy8gKyAgICByZXZpc2VkIGJ5OiBSYWZhxYIgS3VrYXdza2kgKGh0dHA6Ly9ibG9nLmt1a2F3c2tpLnBsLylcclxuICAgIC8vICogICAgIGV4YW1wbGUgMTogc3RyaXBfdGFncygnPHA+S2V2aW48L3A+IDxiciAvPjxiPnZhbjwvYj4gPGk+Wm9ubmV2ZWxkPC9pPicsICc8aT48Yj4nKTtcclxuICAgIC8vICogICAgIHJldHVybnMgMTogJ0tldmluIDxiPnZhbjwvYj4gPGk+Wm9ubmV2ZWxkPC9pPidcclxuICAgIC8vICogICAgIGV4YW1wbGUgMjogc3RyaXBfdGFncygnPHA+S2V2aW4gPGltZyBzcmM9XCJzb21laW1hZ2UucG5nXCIgb25tb3VzZW92ZXI9XCJzb21lRnVuY3Rpb24oKVwiPnZhbiA8aT5ab25uZXZlbGQ8L2k+PC9wPicsICc8cD4nKTtcclxuICAgIC8vICogICAgIHJldHVybnMgMjogJzxwPktldmluIHZhbiBab25uZXZlbGQ8L3A+J1xyXG4gICAgLy8gKiAgICAgZXhhbXBsZSAzOiBzdHJpcF90YWdzKFwiPGEgaHJlZj0naHR0cDovL2tldmluLnZhbnpvbm5ldmVsZC5uZXQnPktldmluIHZhbiBab25uZXZlbGQ8L2E+XCIsIFwiPGE+XCIpO1xyXG4gICAgLy8gKiAgICAgcmV0dXJucyAzOiAnPGEgaHJlZj0naHR0cDovL2tldmluLnZhbnpvbm5ldmVsZC5uZXQnPktldmluIHZhbiBab25uZXZlbGQ8L2E+J1xyXG4gICAgLy8gKiAgICAgZXhhbXBsZSA0OiBzdHJpcF90YWdzKCcxIDwgNSA1ID4gMScpO1xyXG4gICAgLy8gKiAgICAgcmV0dXJucyA0OiAnMSA8IDUgNSA+IDEnXHJcbiAgICAvLyAqICAgICBleGFtcGxlIDU6IHN0cmlwX3RhZ3MoJzEgPGJyLz4gMScpO1xyXG4gICAgLy8gKiAgICAgcmV0dXJucyA1OiAnMSAgMSdcclxuICAgIC8vICogICAgIGV4YW1wbGUgNjogc3RyaXBfdGFncygnMSA8YnIvPiAxJywgJzxicj4nKTtcclxuICAgIC8vICogICAgIHJldHVybnMgNjogJzEgIDEnXHJcbiAgICAvLyAqICAgICBleGFtcGxlIDc6IHN0cmlwX3RhZ3MoJzEgPGJyLz4gMScsICc8YnI+PGJyLz4nKTtcclxuICAgIC8vICogICAgIHJldHVybnMgNzogJzEgPGJyLz4gMSdcclxuICAgIGFsbG93ZWQgPSAoKChhbGxvd2VkIHx8IFwiXCIpICsgXCJcIikudG9Mb3dlckNhc2UoKS5tYXRjaCgvPFthLXpdW2EtejAtOV0qPi9nKSB8fCBbXSkuam9pbignJyk7IC8vIG1ha2luZyBzdXJlIHRoZSBhbGxvd2VkIGFyZyBpcyBhIHN0cmluZyBjb250YWluaW5nIG9ubHkgdGFncyBpbiBsb3dlcmNhc2UgKDxhPjxiPjxjPilcclxuICAgIHZhciB0YWdzID0gLzxcXC8/KFthLXpdW2EtejAtOV0qKVxcYltePl0qPi9naSxcclxuICAgICAgICBjb21tZW50c0FuZFBocFRhZ3MgPSAvPCEtLVtcXHNcXFNdKj8tLT58PFxcPyg/OnBocCk/W1xcc1xcU10qP1xcPz4vZ2k7XHJcbiAgICByZXR1cm4gaW5wdXQucmVwbGFjZShjb21tZW50c0FuZFBocFRhZ3MsICcnKS5yZXBsYWNlKHRhZ3MsIGZ1bmN0aW9uKCQwLCAkMSkge1xyXG4gICAgICAgIHJldHVybiBhbGxvd2VkLmluZGV4T2YoJzwnICsgJDEudG9Mb3dlckNhc2UoKSArICc+JykgPiAtMSA/ICQwIDogJyc7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbmNvbnN0IF9zb3J0ID0gZnVuY3Rpb24obGFuZ0l0ZW0pIHtcclxuICAgIHJldHVybiBsYW5nSXRlbS5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcclxuICAgICAgICB2YXIgcmVzO1xyXG4gICAgICAgIGlmICgocmVzID0gYS5zdGFydCAtIGIuc3RhcnQpID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhLmVuZCAtIGIuZW5kO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG5jb25zdCBfbWVyZ2VNdWx0aUxhbmd1YWdlcyA9IGZ1bmN0aW9uKGFycikge1xyXG4gICAgdmFyIGNvbnRlbnQsIGRpY3QsIGksIGlkeCwga2V5LCBsYW5nLCByZXQsIHZhbCwgX2ksIF9sZW4sIF9yZWY7XHJcbiAgICBkaWN0ID0ge307XHJcbiAgICBpID0gYXJyLmxlbmd0aDtcclxuICAgIHJldCA9IFtdO1xyXG4gICAgZm9yIChpID0gX2kgPSAwLCBfbGVuID0gYXJyLmxlbmd0aDsgX2kgPCBfbGVuOyBpID0gKytfaSkge1xyXG4gICAgICAgIHZhbCA9IGFycltpXTtcclxuICAgICAgICBrZXkgPSB2YWwuc3RhcnRUaW1lICsgJywnICsgdmFsLmVuZFRpbWU7XHJcbiAgICAgICAgaWYgKChpZHggPSBkaWN0W2tleV0pICE9PSB2b2lkIDApIHtcclxuICAgICAgICAgICAgX3JlZiA9IHZhbC5sYW5ndWFnZXM7XHJcbiAgICAgICAgICAgIGZvciAobGFuZyBpbiBfcmVmKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gX3JlZltsYW5nXTtcclxuICAgICAgICAgICAgICAgIHJldFtpZHhdLmxhbmd1YWdlc1tsYW5nXSA9IGNvbnRlbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXQucHVzaCh2YWwpO1xyXG4gICAgICAgICAgICBkaWN0W2tleV0gPSByZXQubGVuZ3RoIC0gMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmV0O1xyXG59O1xyXG5cclxuY29uc3QgU21pUGFyc2VyID0gZnVuY3Rpb24oc2FtaSwgb3B0aW9ucykge1xyXG4gICAgdmFyIGRlZmluZWRMYW5ncywgZHVyYXRpb24sIGVycm9ycywgZ2V0RGVmaW5lZExhbmdzLCBnZXRMYW5ndWFnZSwga2V5LCBtYWtlRW5kVGltZSwgcGFyc2UsIHJlc3VsdCwgdmFsdWUsIF9yZWYsIGZpeGVkTGFuZztcclxuICAgIHBhcnNlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQsIGVycm9yLCBpbm5lclRleHQsIGlzQnJva2VuLCBpdGVtLCBsYW5nLCBsYW5nSXRlbSwgbGluZU51bSwgbmV4dFN0YXJ0VGFnSWR4LCByZXQsIHN0YXJ0VGFnSWR4LCBzdGFydFRpbWUsIHN0ciwgdGVtcFJldCwgX3JlZiwgX3JlZjEsIF9yZWYyO1xyXG4gICAgICAgIGVycm9yID0gZnVuY3Rpb24oZXJyb3IpIHtcclxuICAgICAgICAgICAgdmFyIGU7XHJcbiAgICAgICAgICAgIGUgPSBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICBlLmxpbmUgPSBsaW5lTnVtO1xyXG4gICAgICAgICAgICBlLmNvbnRleHQgPSBlbGVtZW50O1xyXG4gICAgICAgICAgICByZXR1cm4gZXJyb3JzLnB1c2goZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsaW5lTnVtID0gMTtcclxuICAgICAgICByZXQgPSBbXTtcclxuICAgICAgICB0ZW1wUmV0ID0ge307XHJcbiAgICAgICAgc3RyID0gc2FtaTtcclxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgICAgICBzdGFydFRhZ0lkeCA9IHN0ci5zZWFyY2goKTtcclxuICAgICAgICAgICAgaWYgKG5leHRTdGFydFRhZ0lkeCA8PSAwIHx8IHN0YXJ0VGFnSWR4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV4dFN0YXJ0VGFnSWR4ID0gc3RyLnNsaWNlKHN0YXJ0VGFnSWR4ICsgMSkuc2VhcmNoKHJlQ2xvc2VTeW5jKSArIDE7XHJcbiAgICAgICAgICAgIGlmIChuZXh0U3RhcnRUYWdJZHggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gc3RyLnNsaWNlKHN0YXJ0VGFnSWR4LCBzdGFydFRhZ0lkeCArIG5leHRTdGFydFRhZ0lkeCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gc3RyLnNsaWNlKHN0YXJ0VGFnSWR4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsaW5lTnVtICs9ICgoX3JlZiA9IHN0ci5zbGljZSgwLCBzdGFydFRhZ0lkeCkubWF0Y2gocmVMaW5lRW5kaW5nKSkgIT0gbnVsbCA/IF9yZWYubGVuZ3RoIDogdm9pZCAwKSB8fCAwO1xyXG4gICAgICAgICAgICBpZiAoaXNCcm9rZW4gPSByZUJyb2tlblRhZy50ZXN0KGVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICBlcnJvcignRVJST1JfQlJPS0VOX1RBR1MnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdHIgPSBzdHIuc2xpY2Uoc3RhcnRUYWdJZHggKyBuZXh0U3RhcnRUYWdJZHgpO1xyXG4gICAgICAgICAgICBzdGFydFRpbWUgPSArKChfcmVmMSA9IGVsZW1lbnQubWF0Y2gocmVTdGFydFRpbWUpKSAhPSBudWxsID8gcGFyc2VGbG9hdChfcmVmMVsxXS8xMDAwKSA6IHZvaWQgMCk7ICAvL0hTTEVFIG1zIC0+IHMg66GcIOuzgOqyvVxyXG4gICAgICAgICAgICBpZiAoc3RhcnRUaW1lID09PSBudWxsIHx8IHN0YXJ0VGltZSA8IDApIHtcclxuICAgICAgICAgICAgICAgIGVycm9yKCdFUlJPUl9JTlZBTElEX1RJTUUnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gV2UgZG9uJ3QgbmVlZCBjb21wbGV4IGxhbmd1YWdlLiBjdXMgU01JIGRvZW5zJ3Qgb2JleSB0aGUgcnVsZXMuLi5cclxuICAgICAgICAgICAgbGFuZyA9IGdldExhbmd1YWdlKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAvL2xhbmcgPSBcImtvXCI7XHJcbiAgICAgICAgICAgIGlmICghbGFuZykge1xyXG4gICAgICAgICAgICAgICAvLyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGVycm9yKCdFUlJPUl9JTlZBTElEX0xBTkdVQUdFJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGluZU51bSArPSAoKF9yZWYyID0gZWxlbWVudC5tYXRjaChyZUxpbmVFbmRpbmcpKSAhPSBudWxsID8gX3JlZjIubGVuZ3RoIDogdm9pZCAwKSB8fCAwO1xyXG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5yZXBsYWNlKHJlTGluZUVuZGluZywgJycpO1xyXG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5yZXBsYWNlKHJlQnIsIFwiXFxuXCIpO1xyXG4gICAgICAgICAgICBpbm5lclRleHQgPSBzdHJpcF90YWdzKGVsZW1lbnQpLnRyaW0oKTtcclxuXHJcbiAgICAgICAgICAgIC8vSFNMRUUgOiAyMDE4MDUzMCAtIOyasOumsCDrnq3quLDsp4Ag6rWs67aE7J20IO2VhOyalCDsl4bri6QuIOyeiOuKlOqxsCDqt7jrjIDroZwg67O07Jes7KSE67+QXHJcbiAgICAgICAgICAgIGl0ZW0gPSB7XHJcbiAgICAgICAgICAgICAgICBzdGFydDogc3RhcnRUaW1lLFxyXG4gICAgICAgICAgICAgICAgLy9sYW5ndWFnZXM6IHt9LFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJcIixcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRzOiBpbm5lclRleHRcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaWYgKGxhbmcpIHtcclxuICAgICAgICAgICAgICAgIC8vaXRlbS5sYW5ndWFnZXNbbGFuZ10gPSBpbm5lclRleHQ7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnRleHQgPSBpbm5lclRleHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGVtcFJldFtsYW5nXSB8fCAodGVtcFJldFtsYW5nXSA9IFtdKTtcclxuICAgICAgICAgICAgLy90ZW1wUmV0W2xhbmddLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgIGlmKGl0ZW0uc3RhcnQpe1xyXG4gICAgICAgICAgICAgICAgdGVtcFJldFtsYW5nXS5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9maXhlZCBieSBoc2xlZSAxOTAxMzBcclxuICAgICAgICAvL1NNSSB3YXMgZGVzaWduZWQgZm9yIG11bHRpIGxhbmd1YWdlLiBCdXQgZ2xvYmFsIHN0YW5kYXJkIChteSBndWVzcykgU1JULCBWVFQgZG9lc24ndCBzdXBwb3J0IG11bHRpIGxhbmd1YWdlLlxyXG4gICAgICAgIC8vVGhpcyB1cGRhdGUgaXMgaGFuZGxpbmcgaWYgU01JIGhhcyBtdWx0aXBsZSBsYW5ndWFnZXMuXHJcbiAgICAgICAgZml4ZWRMYW5nID0gZml4ZWRMYW5nIHx8IGdldEJyb3dzZXJMYW5ndWFnZSgpO1xyXG4gICAgICAgIGxldCBjb252ZXJ0ZWRMYW5ndWFnZU5hbWVzID0gT2JqZWN0LmtleXModGVtcFJldCk7XHJcbiAgICAgICAgaWYoY29udmVydGVkTGFuZ3VhZ2VOYW1lcyAmJiBjb252ZXJ0ZWRMYW5ndWFnZU5hbWVzLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICBpZihjb252ZXJ0ZWRMYW5ndWFnZU5hbWVzLmluZGV4T2YoZml4ZWRMYW5nKSA+IC0xKXtcclxuICAgICAgICAgICAgICAgIGxhbmdJdGVtID0gdGVtcFJldFtmaXhlZExhbmddO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGxhbmdJdGVtID0gdGVtcFJldFtjb252ZXJ0ZWRMYW5ndWFnZU5hbWVzWzBdXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsYW5nSXRlbSA9IF9zb3J0KGxhbmdJdGVtKTtcclxuICAgICAgICAgICAgbGFuZ0l0ZW0gPSBtYWtlRW5kVGltZShsYW5nSXRlbSk7XHJcbiAgICAgICAgICAgIHJldCA9IHJldC5jb25jYXQobGFuZ0l0ZW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9yZXQgPSBfbWVyZ2VNdWx0aUxhbmd1YWdlcyhyZXQpO1xyXG4gICAgICAgIHJldCA9IF9zb3J0KHJldCk7XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH07XHJcbiAgICBnZXRMYW5ndWFnZSA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgICAgICB2YXIgY2xhc3NOYW1lLCBsYW5nO1xyXG4gICAgICAgIGlmKCFlbGVtZW50KXtyZXR1cm4gO31cclxuICAgICAgICBmb3IgKGNsYXNzTmFtZSBpbiBkZWZpbmVkTGFuZ3MpIHtcclxuICAgICAgICAgICAgbGFuZyA9IGRlZmluZWRMYW5nc1tjbGFzc05hbWVdO1xyXG4gICAgICAgICAgICBpZiAobGFuZy5yZUNsYXNzTmFtZS50ZXN0KGVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbGFuZy5sYW5nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGdldERlZmluZWRMYW5ncyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBjbGFzc05hbWUsIGRlY2xhcmF0aW9uLCBlLCBlcnJvciwgbGFuZywgbWF0Y2hlZCwgcGFyc2VkLCBydWxlLCBzZWxlY3RvciwgX2ksIF9sZW4sIF9yZWYsIF9yZWYxLCBfcmVzdWx0cztcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBtYXRjaGVkID0gKChfcmVmID0gc2FtaS5tYXRjaChyZVN0eWxlKSkgIT0gbnVsbCA/IF9yZWZbMV0gOiB2b2lkIDApIHx8ICcnO1xyXG4gICAgICAgICAgICBtYXRjaGVkID0gbWF0Y2hlZC5yZXBsYWNlKHJlQ29tbWVudCwgJycpO1xyXG4gICAgICAgICAgICBwYXJzZWQgPSBjc3NQYXJzZShtYXRjaGVkKTtcclxuICAgICAgICAgICAgX3JlZjEgPSBwYXJzZWQuc3R5bGVzaGVldC5ydWxlcztcclxuICAgICAgICAgICAgX3Jlc3VsdHMgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBfcmVmMS5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xyXG4gICAgICAgICAgICAgICAgcnVsZSA9IF9yZWYxW19pXTtcclxuICAgICAgICAgICAgICAgIHNlbGVjdG9yID0gcnVsZS5zZWxlY3RvcnNbMF07XHJcbiAgICAgICAgICAgICAgICBpZiAoKHNlbGVjdG9yICE9IG51bGwgPyBzZWxlY3RvclswXSA6IHZvaWQgMCkgPT09ICcuJykge1xyXG4gICAgICAgICAgICAgICAgICAgIF9yZXN1bHRzLnB1c2goKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2osIF9sZW4xLCBfcmVmMiwgX3Jlc3VsdHMxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVmMiA9IHJ1bGUuZGVjbGFyYXRpb25zO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVzdWx0czEgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChfaiA9IDAsIF9sZW4xID0gX3JlZjIubGVuZ3RoOyBfaiA8IF9sZW4xOyBfaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWNsYXJhdGlvbiA9IF9yZWYyW19qXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZWNsYXJhdGlvbi5wcm9wZXJ0eS50b0xvd2VyQ2FzZSgpID09PSAnbGFuZycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSBzZWxlY3Rvci5zbGljZSgxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYW5nID0gZGVjbGFyYXRpb24udmFsdWUuc2xpY2UoMCwgMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKH5sYW5nQ29kZXMuaW5kZXhPZihsYW5nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVzdWx0czEucHVzaChkZWZpbmVkTGFuZ3NbY2xhc3NOYW1lXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhbmc6IGxhbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZUNsYXNzTmFtZTogbmV3IFJlZ0V4cChcImNsYXNzW149XSo/PVtcXFwiJ1xcU10qKFwiICsgY2xhc3NOYW1lICsgXCIpWydcXFwiXFxTXT9cIiwgJ2knKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3Jlc3VsdHMxLnB1c2godm9pZCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3Jlc3VsdHMxO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKCkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBfcmVzdWx0cy5wdXNoKHZvaWQgMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIF9yZXN1bHRzO1xyXG4gICAgICAgIH0gY2F0Y2ggKF9lcnJvcikge1xyXG4gICAgICAgICAgICBlID0gX2Vycm9yO1xyXG4gICAgICAgICAgICBlcnJvcnMucHVzaChlcnJvciA9IG5ldyBFcnJvcignRVJST1JfSU5WQUxJRF9MQU5HVUFHRV9ERUZJTklUSU9OJykpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBtYWtlRW5kVGltZSA9IGZ1bmN0aW9uKGxhbmdJdGVtKSB7XHJcbiAgICAgICAgdmFyIGksIGl0ZW0sIF9yZWY7XHJcbiAgICAgICAgaSA9IGxhbmdJdGVtLmxlbmd0aDtcclxuICAgICAgICB3aGlsZSAoaS0tKSB7XHJcbiAgICAgICAgICAgIGl0ZW0gPSBsYW5nSXRlbVtpXTtcclxuICAgICAgICAgICAgaWYgKChfcmVmID0gbGFuZ0l0ZW1baSAtIDFdKSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvL0hTTEVFIDog7J207JmV7J2066m0IFNSVCDtjIzshJzsmYAg7Y+s66e37J2EIOunnuy2lOyekFxyXG4gICAgICAgICAgICAgICAgX3JlZi5lbmQgPSBpdGVtLnN0YXJ0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaXRlbS5jb250ZW50cyB8fCBpdGVtLmNvbnRlbnRzID09PSAnJm5ic3A7Jykge1xyXG4gICAgICAgICAgICAgICAgbGFuZ0l0ZW0uc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGxhbmdJdGVtW2ldLmNvbnRlbnRzO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpdGVtLmVuZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZW5kID0gaXRlbS5zdGFydCArIGR1cmF0aW9uO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsYW5nSXRlbTtcclxuICAgIH07XHJcbiAgICBlcnJvcnMgPSBbXTtcclxuICAgIGRlZmluZWRMYW5ncyA9IHtcclxuICAgICAgICBLUkNDOiB7XHJcbiAgICAgICAgICAgIGxhbmc6ICdrbycsXHJcbiAgICAgICAgICAgIHJlQ2xhc3NOYW1lOiBuZXcgUmVnRXhwKFwiY2xhc3NbXj1dKj89W1xcXCInXFxTXSooS1JDQylbJ1xcXCJcXFNdP1wiLCAnaScpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBLT0NDOiB7XHJcbiAgICAgICAgICAgIGxhbmc6ICdrbycsXHJcbiAgICAgICAgICAgIHJlQ2xhc3NOYW1lOiBuZXcgUmVnRXhwKFwiY2xhc3NbXj1dKj89W1xcXCInXFxTXSooS09DQylbJ1xcXCJcXFNdP1wiLCAnaScpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBLUjoge1xyXG4gICAgICAgICAgICBsYW5nOiAna28nLFxyXG4gICAgICAgICAgICByZUNsYXNzTmFtZTogbmV3IFJlZ0V4cChcImNsYXNzW149XSo/PVtcXFwiJ1xcU10qKEtSKVsnXFxcIlxcU10/XCIsICdpJylcclxuICAgICAgICB9LFxyXG4gICAgICAgIEVOQ0M6IHtcclxuICAgICAgICAgICAgbGFuZzogJ2VuJyxcclxuICAgICAgICAgICAgcmVDbGFzc05hbWU6IG5ldyBSZWdFeHAoXCJjbGFzc1tePV0qPz1bXFxcIidcXFNdKihFTkNDKVsnXFxcIlxcU10/XCIsICdpJylcclxuICAgICAgICB9LFxyXG4gICAgICAgIEVHQ0M6IHtcclxuICAgICAgICAgICAgbGFuZzogJ2VuJyxcclxuICAgICAgICAgICAgcmVDbGFzc05hbWU6IG5ldyBSZWdFeHAoXCJjbGFzc1tePV0qPz1bXFxcIidcXFNdKihFR0NDKVsnXFxcIlxcU10/XCIsICdpJylcclxuICAgICAgICB9LFxyXG4gICAgICAgIEVOOiB7XHJcbiAgICAgICAgICAgIGxhbmc6ICdlbicsXHJcbiAgICAgICAgICAgIHJlQ2xhc3NOYW1lOiBuZXcgUmVnRXhwKFwiY2xhc3NbXj1dKj89W1xcXCInXFxTXSooRU4pWydcXFwiXFxTXT9cIiwgJ2knKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgSlBDQzoge1xyXG4gICAgICAgICAgICBsYW5nOiAnamEnLFxyXG4gICAgICAgICAgICByZUNsYXNzTmFtZTogbmV3IFJlZ0V4cChcImNsYXNzW149XSo/PVtcXFwiJ1xcU10qKEpQQ0MpWydcXFwiXFxTXT9cIiwgJ2knKVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBpZiAob3B0aW9ucyAhPSBudWxsID8gb3B0aW9ucy5kZWZpbmVkTGFuZ3MgOiB2b2lkIDApIHtcclxuICAgICAgICBfcmVmID0gb3B0aW9ucy5kZWZpbmVkTGFuZ3M7XHJcbiAgICAgICAgZm9yIChrZXkgaW4gX3JlZikge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IF9yZWZba2V5XTtcclxuICAgICAgICAgICAgZGVmaW5lZExhbmdzW2tleV0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBkdXJhdGlvbiA9IChvcHRpb25zICE9IG51bGwgPyBvcHRpb25zLmR1cmF0aW9uIDogdm9pZCAwKSB8fCAxMDsgLy9IU0xFRSBtcyAtPiBzIOuhnCDrs4Dqsr1cclxuICAgIGZpeGVkTGFuZyA9IG9wdGlvbnMuZml4ZWRMYW5nO1xyXG4gICAgc2FtaSA9IHNhbWkudHJpbSgpO1xyXG4gICAgLy9nZXREZWZpbmVkTGFuZ3MoKTtcclxuICAgIHJlc3VsdCA9IHBhcnNlKCk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3VsdDogcmVzdWx0LFxyXG4gICAgICAgIGVycm9yczogZXJyb3JzXHJcbiAgICB9O1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNtaVBhcnNlcjsiLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDguIDI0Li5cclxuICovXHJcblxyXG5leHBvcnQgY29uc3QgZ2V0QnJvd3Nlckxhbmd1YWdlID0gZnVuY3Rpb24oKXtcclxuICAgIGxldCBuYXYgPSB3aW5kb3cubmF2aWdhdG9yLFxyXG4gICAgICAgIGJyb3dzZXJMYW5ndWFnZVByb3BlcnR5S2V5cyA9IFsnbGFuZ3VhZ2UnLCAnYnJvd3Nlckxhbmd1YWdlJywgJ3N5c3RlbUxhbmd1YWdlJywgJ3VzZXJMYW5ndWFnZSddLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgbGFuZ3VhZ2U7XHJcblxyXG4gICAgLy8gc3VwcG9ydCBmb3IgSFRNTCA1LjEgXCJuYXZpZ2F0b3IubGFuZ3VhZ2VzXCJcclxuICAgIGlmIChBcnJheS5pc0FycmF5KG5hdi5sYW5ndWFnZXMpKSB7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IG5hdi5sYW5ndWFnZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGFuZ3VhZ2UgPSBuYXYubGFuZ3VhZ2VzW2ldO1xyXG4gICAgICAgICAgICBpZiAobGFuZ3VhZ2UgJiYgbGFuZ3VhZ2UubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbGFuZ3VhZ2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc3VwcG9ydCBmb3Igb3RoZXIgd2VsbCBrbm93biBwcm9wZXJ0aWVzIGluIGJyb3dzZXJzXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgYnJvd3Nlckxhbmd1YWdlUHJvcGVydHlLZXlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGFuZ3VhZ2UgPSBuYXZbYnJvd3Nlckxhbmd1YWdlUHJvcGVydHlLZXlzW2ldXTtcclxuICAgICAgICBpZiAobGFuZ3VhZ2UgJiYgbGFuZ3VhZ2UubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsYW5ndWFnZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0QnJvd3NlciA9IGZ1bmN0aW9uKCl7XHJcbiAgICBpZigobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiT3BlcmFcIikgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdPUFInKSkgIT0gLTEgKXtcclxuICAgICAgICByZXR1cm4gJ29wZXJhJztcclxuICAgIH1lbHNlIGlmKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIkNocm9tZVwiKSAhPSAtMSApe1xyXG4gICAgICAgIHJldHVybiAnY2hyb21lJztcclxuICAgIH1lbHNlIGlmKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIlNhZmFyaVwiKSAhPSAtMSl7XHJcbiAgICAgICAgcmV0dXJuICdzYWZhcmknO1xyXG4gICAgfWVsc2UgaWYobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiRmlyZWZveFwiKSAhPSAtMSApe1xyXG4gICAgICAgIHJldHVybiAnZmlyZWZveCc7XHJcbiAgICB9ZWxzZSBpZigobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiTVNJRVwiKSAhPSAtMSApKXtcclxuICAgICAgICBsZXQgbXNpZSA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIk1TSUVcIik7XHJcbiAgICAgICAgLyppZighIWRvY3VtZW50LmRvY3VtZW50TW9kZSA9PSB0cnVlICl7XHJcbiAgICAgICAgICAgIHJldHVybiAnaWUnO1xyXG4gICAgICAgIH1lbHNlIGlmKCEhbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvVHJpZGVudC4qcnZcXDoxMVxcLi8pKXtcclxuICAgICAgICAgICAgaWYgKCFpc05hTihwYXJzZUludCh1YS5zdWJzdHJpbmcobXNpZSArIDUsIHVhLmluZGV4T2YoXCIuXCIsIG1zaWUpKSkpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2llJztcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3Vua25vd24nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiAndW5rbm93bic7XHJcbiAgICAgICAgfSovXHJcbiAgICAgICAgdmFyIGllID0gKGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgICAgICB2YXIgdW5kZWYsXHJcbiAgICAgICAgICAgICAgICB2ID0gMyxcclxuICAgICAgICAgICAgICAgIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG4gICAgICAgICAgICAgICAgYWxsID0gZGl2LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpJyk7XHJcblxyXG4gICAgICAgICAgICB3aGlsZSAoXHJcbiAgICAgICAgICAgICAgICBkaXYuaW5uZXJIVE1MID0gJzwhLS1baWYgZ3QgSUUgJyArICgrK3YpICsgJ10+PGk+PC9pPjwhW2VuZGlmXS0tPicsXHJcbiAgICAgICAgICAgICAgICAgICAgYWxsWzBdXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHYgPiA0ID8gdiA6IHVuZGVmO1xyXG5cclxuICAgICAgICB9KCkpO1xyXG4gICAgICAgIGlmKGllIDwgOSl7XHJcbiAgICAgICAgICAgIHJldHVybiAnb2xkSUUnO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gJ21vZGVybklFJztcclxuICAgICAgICB9XHJcblxyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgcmV0dXJuICd1bmtub3duJztcclxuICAgIH1cclxuXHJcbn07XHJcblxyXG4iXSwic291cmNlUm9vdCI6IiJ9