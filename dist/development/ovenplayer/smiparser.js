/*! OvenPlayerv0.9.0 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
                langItem = tempRet[convertedLanguageNames.filter(function (name) {
                    return name !== "undefined";
                })[0]];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2NhcHRpb24vcGFyc2VyL1NtaVBhcnNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvYnJvd3Nlci5qcyJdLCJuYW1lcyI6WyJsYW5nQ29kZXMiLCJyZU9wZW5TeW5jIiwicmVDbG9zZVN5bmMiLCJyZUxpbmVFbmRpbmciLCJyZUJyb2tlblRhZyIsInJlU3RhcnRUaW1lIiwicmVCciIsInJlU3R5bGUiLCJyZUNvbW1lbnQiLCJjbG9uZSIsIm9iaiIsImZsYWdzIiwia2V5IiwibmV3SW5zdGFuY2UiLCJEYXRlIiwiZ2V0VGltZSIsIlJlZ0V4cCIsImdsb2JhbCIsImlnbm9yZUNhc2UiLCJtdWx0aWxpbmUiLCJzdGlja3kiLCJzb3VyY2UiLCJjb25zdHJ1Y3RvciIsInN0cmlwX3RhZ3MiLCJpbnB1dCIsImFsbG93ZWQiLCJ0b0xvd2VyQ2FzZSIsIm1hdGNoIiwiam9pbiIsInRhZ3MiLCJjb21tZW50c0FuZFBocFRhZ3MiLCJyZXBsYWNlIiwiJDAiLCIkMSIsImluZGV4T2YiLCJfc29ydCIsImxhbmdJdGVtIiwic29ydCIsImEiLCJiIiwicmVzIiwic3RhcnQiLCJlbmQiLCJfbWVyZ2VNdWx0aUxhbmd1YWdlcyIsImFyciIsImNvbnRlbnQiLCJkaWN0IiwiaSIsImlkeCIsImxhbmciLCJyZXQiLCJ2YWwiLCJfaSIsIl9sZW4iLCJfcmVmIiwibGVuZ3RoIiwic3RhcnRUaW1lIiwiZW5kVGltZSIsImxhbmd1YWdlcyIsInB1c2giLCJTbWlQYXJzZXIiLCJzYW1pIiwib3B0aW9ucyIsImRlZmluZWRMYW5ncyIsImR1cmF0aW9uIiwiZXJyb3JzIiwiZ2V0RGVmaW5lZExhbmdzIiwiZ2V0TGFuZ3VhZ2UiLCJtYWtlRW5kVGltZSIsInBhcnNlIiwicmVzdWx0IiwidmFsdWUiLCJmaXhlZExhbmciLCJlbGVtZW50IiwiZXJyb3IiLCJpbm5lclRleHQiLCJpc0Jyb2tlbiIsIml0ZW0iLCJsaW5lTnVtIiwibmV4dFN0YXJ0VGFnSWR4Iiwic3RhcnRUYWdJZHgiLCJzdHIiLCJ0ZW1wUmV0IiwiX3JlZjEiLCJfcmVmMiIsImUiLCJFcnJvciIsImxpbmUiLCJjb250ZXh0Iiwic2VhcmNoIiwic2xpY2UiLCJ0ZXN0IiwicGFyc2VGbG9hdCIsInRyaW0iLCJ0ZXh0IiwiY29udGVudHMiLCJjb252ZXJ0ZWRMYW5ndWFnZU5hbWVzIiwiT2JqZWN0Iiwia2V5cyIsImZpbHRlciIsIm5hbWUiLCJjb25jYXQiLCJjbGFzc05hbWUiLCJyZUNsYXNzTmFtZSIsImRlY2xhcmF0aW9uIiwibWF0Y2hlZCIsInBhcnNlZCIsInJ1bGUiLCJzZWxlY3RvciIsIl9yZXN1bHRzIiwiY3NzUGFyc2UiLCJzdHlsZXNoZWV0IiwicnVsZXMiLCJzZWxlY3RvcnMiLCJfaiIsIl9sZW4xIiwiX3Jlc3VsdHMxIiwiZGVjbGFyYXRpb25zIiwicHJvcGVydHkiLCJfZXJyb3IiLCJzcGxpY2UiLCJLUkNDIiwiS09DQyIsIktSIiwiRU5DQyIsIkVHQ0MiLCJFTiIsIkpQQ0MiLCJnZXRCcm93c2VyTGFuZ3VhZ2UiLCJuYXYiLCJ3aW5kb3ciLCJuYXZpZ2F0b3IiLCJicm93c2VyTGFuZ3VhZ2VQcm9wZXJ0eUtleXMiLCJsYW5ndWFnZSIsIkFycmF5IiwiaXNBcnJheSIsImdldEJyb3dzZXIiLCJ1c2VyQWdlbnQiLCJtc2llIiwiaWUiLCJ1bmRlZiIsInYiLCJkaXYiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJhbGwiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImlubmVySFRNTCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7Ozs7QUFTQSxJQUFNQSxZQUFZLENBQUMsSUFBRCxFQUFNLElBQU4sRUFBVyxJQUFYLEVBQWlCLElBQWpCLEVBQXVCLElBQXZCLEVBQTZCLElBQTdCLEVBQW1DLElBQW5DLEVBQXlDLElBQXpDLEVBQStDLElBQS9DLEVBQXFELElBQXJELEVBQTJELElBQTNELEVBQWlFLElBQWpFLEVBQXVF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QUFvQnZHLE9BQXBCLENBQTRCLFNBQTVCLEtBQTBDLENBQUMsQ0FBOUMsRUFBaUQ7QUFDbkQsZUFBTyxTQUFQO0FBQ0gsS0FGSyxNQUVBLElBQUlpRyxVQUFVTSxTQUFWLENBQW9CdkcsT0FBcEIsQ0FBNEIsTUFBNUIsS0FBdUMsQ0FBQyxDQUE1QyxFQUFnRDtBQUNsRCxZQUFJd0csT0FBT1AsVUFBVU0sU0FBVixDQUFvQnZHLE9BQXBCLENBQTRCLE1BQTVCLENBQVg7QUFDQTs7Ozs7Ozs7Ozs7QUFXQSxZQUFJeUcsS0FBTSxZQUFVOztBQUVoQixnQkFBSUMsS0FBSjtBQUFBLGdCQUNJQyxJQUFJLENBRFI7QUFBQSxnQkFFSUMsTUFBTUMsU0FBU0MsYUFBVCxDQUF1QixLQUF2QixDQUZWO0FBQUEsZ0JBR0lDLE1BQU1ILElBQUlJLG9CQUFKLENBQXlCLEdBQXpCLENBSFY7O0FBS0EsbUJBQ0lKLElBQUlLLFNBQUosR0FBZ0IsbUJBQW9CLEVBQUVOLENBQXRCLEdBQTJCLHVCQUEzQyxFQUNJSSxJQUFJLENBQUosQ0FGUjs7QUFLQSxtQkFBT0osSUFBSSxDQUFKLEdBQVFBLENBQVIsR0FBWUQsS0FBbkI7QUFFSCxTQWRTLEVBQVY7QUFlQSxZQUFHRCxLQUFLLENBQVIsRUFBVTtBQUNOLG1CQUFPLE9BQVA7QUFDSCxTQUZELE1BRUs7QUFDRCxtQkFBTyxVQUFQO0FBQ0g7QUFFSixLQWxDSyxNQWtDRDtBQUNELGVBQU8sU0FBUDtBQUNIO0FBRUosQ0EvQ00sQyIsImZpbGUiOiJzbWlwYXJzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2dldEJyb3dzZXJMYW5ndWFnZX0gZnJvbSBcInV0aWxzL2Jyb3dzZXJcIjtcclxuLypcclxuICogIHNhbWktcGFyc2VyXHJcbiAqICBUaGUgTUlUIExpY2Vuc2UgKE1JVClcclxuICpcclxuICogIENvcHlyaWdodCAoYykgMjAxMyBDb25zdGFudGluZSBLaW0gPGVsZWdhbnRjb2RlckBnbWFpbC5jb20+XHJcbiAqICBodHRwczovL2dpdGh1Yi5jb20vZWxlZ2FudGNvZGVyL3NhbWktcGFyc2VyXHJcbiAqXHJcbiAqL1xyXG5cclxuY29uc3QgbGFuZ0NvZGVzID0gW1wiYWJcIixcImFhXCIsXCJhZlwiLCBcImFrXCIsIFwic3FcIiwgXCJhbVwiLCBcImFyXCIsIFwiYW5cIiwgXCJoeVwiLCBcImFzXCIsIFwiYXZcIiwgXCJhZVwiLCBcImF5XCIsIFwiYXpcIiwgXCJibVwiLCBcImJhXCIsIFwiZXVcIiwgXCJiZVwiLCBcImJuXCIsIFwiYmhcIiwgXCJiaVwiLCBcIm5iXCIsXCJic1wiLFwiYnJcIixcImJnXCIsXCJteVwiLFwiZXNcIixcImNhXCIsXCJrbVwiLFwiY2hcIixcImNlXCIsXCJueVwiLFwibnlcIixcInpoXCIsXCJ6YVwiLFwiY3VcIixcImN1XCIsXCJjdlwiLFwia3dcIixcclxuICAgIFwiY29cIixcImNyXCIsXCJoclwiLFwiY3NcIixcImRhXCIsXCJkdlwiLFwiZHZcIixcIm5sXCIsXCJkelwiLFwiZW5cIixcImVvXCIsXCJldFwiLFwiZWVcIixcImZvXCIsXCJmalwiLFwiZmlcIixcIm5sXCIsXCJmclwiLFwiZmZcIixcImdkXCIsXCJnbFwiLFwibGdcIixcImthXCIsXCJkZVwiLFwia2lcIixcImVsXCIsXCJrbFwiLFwiZ25cIixcImd1XCIsXCJodFwiLFwiaHRcIixcImhhXCIsXCJoZVwiLFwiaHpcIixcImhpXCIsXCJob1wiLFwiaHVcIixcImlzXCIsXCJpb1wiLFwiaWdcIixcImlkXCIsXCJpYVwiLFwiaWVcIixcIml1XCIsXCJpa1wiLFwiZ2FcIixcclxuICAgIFwiaXRcIixcImphXCIsXCJqdlwiLFwia2xcIixcImtuXCIsXCJrclwiLFwia3NcIixcImtrXCIsXCJraVwiLFwicndcIixcImt5XCIsXCJrdlwiLFwia2dcIixcImtvXCIsXCJralwiLFwia3VcIixcImtqXCIsXCJreVwiLFwibG9cIixcImxhXCIsXCJsdlwiLFwibGJcIixcImxpXCIsXCJsaVwiLFwibGlcIixcImxuXCIsXCJsdFwiLFwibHVcIixcImxiXCIsXCJta1wiLFwibWdcIixcIm1zXCIsXCJtbFwiLFwiZHZcIixcIm10XCIsXCJndlwiLFwibWlcIixcIm1yXCIsXCJtaFwiLFwicm9cIixcInJvXCIsXCJtblwiLFwibmFcIixcIm52XCIsXCJudlwiLFwibmRcIixcclxuICAgIFwibnJcIixcIm5nXCIsXCJuZVwiLFwibmRcIixcInNlXCIsXCJub1wiLFwibmJcIixcIm5uXCIsXCJpaVwiLFwibnlcIixcIm5uXCIsXCJpZVwiLFwib2NcIixcIm9qXCIsXCJjdVwiLFwiY3VcIixcImN1XCIsXCJvclwiLFwib21cIixcIm9zXCIsXCJvc1wiLFwicGlcIixcInBhXCIsXCJwc1wiLFwiZmFcIixcInBsXCIsXCJwdFwiLFwicGFcIixcInBzXCIsXCJxdVwiLFwicm9cIixcInJtXCIsXCJyblwiLFwicnVcIixcInNtXCIsXCJzZ1wiLFwic2FcIixcInNjXCIsXCJnZFwiLFwic3JcIixcInNuXCIsXCJpaVwiLFwic2RcIixcInNpXCIsXCJzaVwiLFwic2tcIixcclxuICAgIFwic2xcIixcInNvXCIsXCJzdFwiLFwibnJcIixcImVzXCIsXCJzdVwiLFwic3dcIixcInNzXCIsXCJzdlwiLFwidGxcIixcInR5XCIsXCJ0Z1wiLFwidGFcIixcInR0XCIsXCJ0ZVwiLFwidGhcIixcImJvXCIsXCJ0aVwiLFwidG9cIixcInRzXCIsXCJ0blwiLFwidHJcIixcInRrXCIsXCJ0d1wiLFwidWdcIixcInVrXCIsXCJ1clwiLFwidWdcIixcInV6XCIsXCJjYVwiLFwidmVcIixcInZpXCIsXCJ2b1wiLFwid2FcIixcImN5XCIsXCJmeVwiLFwid29cIixcInhoXCIsXCJ5aVwiLFwieW9cIixcInphXCIsXCJ6dVwiXTtcclxuXHJcbmNvbnN0IHJlT3BlblN5bmMgPSAvPHN5bmMvaTtcclxuXHJcbmNvbnN0IHJlQ2xvc2VTeW5jID0gLzxzeW5jfDxcXC9ib2R5fDxcXC9zYW1pL2k7XHJcblxyXG5jb25zdCByZUxpbmVFbmRpbmcgPSAvXFxyXFxuP3xcXG4vZztcclxuXHJcbmNvbnN0IHJlQnJva2VuVGFnID0gLzxbYS16XSpbXj5dKjxbYS16XSovZztcclxuXHJcbmNvbnN0IHJlU3RhcnRUaW1lID0gLzxzeW5jW14+XSs/c3RhcnRbXj1dKj1bXjAtOV0qKFswLTldKilbXCJeMC05XCJdKi9pO1xyXG5cclxuY29uc3QgcmVCciA9IC88YnJbXj5dKj4vaWc7XHJcblxyXG5jb25zdCByZVN0eWxlID0gLzxzdHlsZVtePl0qPihbXFxzXFxTXSo/KTxcXC9zdHlsZVtePl0qPi9pO1xyXG5cclxuY29uc3QgcmVDb21tZW50ID0gLyg8IS0tfC0tPikvZztcclxuXHJcbmNvbnN0IGNsb25lID0gZnVuY3Rpb24ob2JqKSB7XHJcbiAgICB2YXIgZmxhZ3MsIGtleSwgbmV3SW5zdGFuY2U7XHJcbiAgICBpZiAoKG9iaiA9PSBudWxsKSB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9XHJcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgRGF0ZSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgRGF0ZShvYmouZ2V0VGltZSgpKTtcclxuICAgIH1cclxuICAgIGlmIChvYmogaW5zdGFuY2VvZiBSZWdFeHApIHtcclxuICAgICAgICBmbGFncyA9ICcnO1xyXG4gICAgICAgIGlmIChvYmouZ2xvYmFsICE9IG51bGwpIHtcclxuICAgICAgICAgICAgZmxhZ3MgKz0gJ2cnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob2JqLmlnbm9yZUNhc2UgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBmbGFncyArPSAnaSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvYmoubXVsdGlsaW5lICE9IG51bGwpIHtcclxuICAgICAgICAgICAgZmxhZ3MgKz0gJ20nO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob2JqLnN0aWNreSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGZsYWdzICs9ICd5JztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAob2JqLnNvdXJjZSwgZmxhZ3MpO1xyXG4gICAgfVxyXG4gICAgbmV3SW5zdGFuY2UgPSBuZXcgb2JqLmNvbnN0cnVjdG9yKCk7XHJcbiAgICBmb3IgKGtleSBpbiBvYmopIHtcclxuICAgICAgICBuZXdJbnN0YW5jZVtrZXldID0gY2xvbmUob2JqW2tleV0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ld0luc3RhbmNlO1xyXG59O1xyXG5cclxuY29uc3Qgc3RyaXBfdGFncyA9IGZ1bmN0aW9uIChpbnB1dCwgYWxsb3dlZCkge1xyXG4gICAgLy8gaHR0cDovL2tldmluLnZhbnpvbm5ldmVsZC5uZXRcclxuICAgIC8vICsgICBvcmlnaW5hbCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cDovL2tldmluLnZhbnpvbm5ldmVsZC5uZXQpXHJcbiAgICAvLyArICAgaW1wcm92ZWQgYnk6IEx1a2UgR29kZnJleVxyXG4gICAgLy8gKyAgICAgIGlucHV0IGJ5OiBQdWxcclxuICAgIC8vICsgICBidWdmaXhlZCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cDovL2tldmluLnZhbnpvbm5ldmVsZC5uZXQpXHJcbiAgICAvLyArICAgYnVnZml4ZWQgYnk6IE9ubm8gTWFyc21hblxyXG4gICAgLy8gKyAgICAgIGlucHV0IGJ5OiBBbGV4XHJcbiAgICAvLyArICAgYnVnZml4ZWQgYnk6IEtldmluIHZhbiBab25uZXZlbGQgKGh0dHA6Ly9rZXZpbi52YW56b25uZXZlbGQubmV0KVxyXG4gICAgLy8gKyAgICAgIGlucHV0IGJ5OiBNYXJjIFBhbGF1XHJcbiAgICAvLyArICAgaW1wcm92ZWQgYnk6IEtldmluIHZhbiBab25uZXZlbGQgKGh0dHA6Ly9rZXZpbi52YW56b25uZXZlbGQubmV0KVxyXG4gICAgLy8gKyAgICAgIGlucHV0IGJ5OiBCcmV0dCBaYW1pciAoaHR0cDovL2JyZXR0LXphbWlyLm1lKVxyXG4gICAgLy8gKyAgIGJ1Z2ZpeGVkIGJ5OiBLZXZpbiB2YW4gWm9ubmV2ZWxkIChodHRwOi8va2V2aW4udmFuem9ubmV2ZWxkLm5ldClcclxuICAgIC8vICsgICBidWdmaXhlZCBieTogRXJpYyBOYWdlbFxyXG4gICAgLy8gKyAgICAgIGlucHV0IGJ5OiBCb2JieSBEcmFrZVxyXG4gICAgLy8gKyAgIGJ1Z2ZpeGVkIGJ5OiBLZXZpbiB2YW4gWm9ubmV2ZWxkIChodHRwOi8va2V2aW4udmFuem9ubmV2ZWxkLm5ldClcclxuICAgIC8vICsgICBidWdmaXhlZCBieTogVG9tYXN6IFdlc29sb3dza2lcclxuICAgIC8vICsgICAgICBpbnB1dCBieTogRXZlcnRqYW4gR2FycmV0c2VuXHJcbiAgICAvLyArICAgIHJldmlzZWQgYnk6IFJhZmHFgiBLdWthd3NraSAoaHR0cDovL2Jsb2cua3VrYXdza2kucGwvKVxyXG4gICAgLy8gKiAgICAgZXhhbXBsZSAxOiBzdHJpcF90YWdzKCc8cD5LZXZpbjwvcD4gPGJyIC8+PGI+dmFuPC9iPiA8aT5ab25uZXZlbGQ8L2k+JywgJzxpPjxiPicpO1xyXG4gICAgLy8gKiAgICAgcmV0dXJucyAxOiAnS2V2aW4gPGI+dmFuPC9iPiA8aT5ab25uZXZlbGQ8L2k+J1xyXG4gICAgLy8gKiAgICAgZXhhbXBsZSAyOiBzdHJpcF90YWdzKCc8cD5LZXZpbiA8aW1nIHNyYz1cInNvbWVpbWFnZS5wbmdcIiBvbm1vdXNlb3Zlcj1cInNvbWVGdW5jdGlvbigpXCI+dmFuIDxpPlpvbm5ldmVsZDwvaT48L3A+JywgJzxwPicpO1xyXG4gICAgLy8gKiAgICAgcmV0dXJucyAyOiAnPHA+S2V2aW4gdmFuIFpvbm5ldmVsZDwvcD4nXHJcbiAgICAvLyAqICAgICBleGFtcGxlIDM6IHN0cmlwX3RhZ3MoXCI8YSBocmVmPSdodHRwOi8va2V2aW4udmFuem9ubmV2ZWxkLm5ldCc+S2V2aW4gdmFuIFpvbm5ldmVsZDwvYT5cIiwgXCI8YT5cIik7XHJcbiAgICAvLyAqICAgICByZXR1cm5zIDM6ICc8YSBocmVmPSdodHRwOi8va2V2aW4udmFuem9ubmV2ZWxkLm5ldCc+S2V2aW4gdmFuIFpvbm5ldmVsZDwvYT4nXHJcbiAgICAvLyAqICAgICBleGFtcGxlIDQ6IHN0cmlwX3RhZ3MoJzEgPCA1IDUgPiAxJyk7XHJcbiAgICAvLyAqICAgICByZXR1cm5zIDQ6ICcxIDwgNSA1ID4gMSdcclxuICAgIC8vICogICAgIGV4YW1wbGUgNTogc3RyaXBfdGFncygnMSA8YnIvPiAxJyk7XHJcbiAgICAvLyAqICAgICByZXR1cm5zIDU6ICcxICAxJ1xyXG4gICAgLy8gKiAgICAgZXhhbXBsZSA2OiBzdHJpcF90YWdzKCcxIDxici8+IDEnLCAnPGJyPicpO1xyXG4gICAgLy8gKiAgICAgcmV0dXJucyA2OiAnMSAgMSdcclxuICAgIC8vICogICAgIGV4YW1wbGUgNzogc3RyaXBfdGFncygnMSA8YnIvPiAxJywgJzxicj48YnIvPicpO1xyXG4gICAgLy8gKiAgICAgcmV0dXJucyA3OiAnMSA8YnIvPiAxJ1xyXG4gICAgYWxsb3dlZCA9ICgoKGFsbG93ZWQgfHwgXCJcIikgKyBcIlwiKS50b0xvd2VyQ2FzZSgpLm1hdGNoKC88W2Etel1bYS16MC05XSo+L2cpIHx8IFtdKS5qb2luKCcnKTsgLy8gbWFraW5nIHN1cmUgdGhlIGFsbG93ZWQgYXJnIGlzIGEgc3RyaW5nIGNvbnRhaW5pbmcgb25seSB0YWdzIGluIGxvd2VyY2FzZSAoPGE+PGI+PGM+KVxyXG4gICAgdmFyIHRhZ3MgPSAvPFxcLz8oW2Etel1bYS16MC05XSopXFxiW14+XSo+L2dpLFxyXG4gICAgICAgIGNvbW1lbnRzQW5kUGhwVGFncyA9IC88IS0tW1xcc1xcU10qPy0tPnw8XFw/KD86cGhwKT9bXFxzXFxTXSo/XFw/Pi9naTtcclxuICAgIHJldHVybiBpbnB1dC5yZXBsYWNlKGNvbW1lbnRzQW5kUGhwVGFncywgJycpLnJlcGxhY2UodGFncywgZnVuY3Rpb24oJDAsICQxKSB7XHJcbiAgICAgICAgcmV0dXJuIGFsbG93ZWQuaW5kZXhPZignPCcgKyAkMS50b0xvd2VyQ2FzZSgpICsgJz4nKSA+IC0xID8gJDAgOiAnJztcclxuICAgIH0pO1xyXG59O1xyXG5cclxuY29uc3QgX3NvcnQgPSBmdW5jdGlvbihsYW5nSXRlbSkge1xyXG4gICAgcmV0dXJuIGxhbmdJdGVtLnNvcnQoZnVuY3Rpb24oYSwgYikge1xyXG4gICAgICAgIHZhciByZXM7XHJcbiAgICAgICAgaWYgKChyZXMgPSBhLnN0YXJ0IC0gYi5zdGFydCkgPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGEuZW5kIC0gYi5lbmQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXHJcbmNvbnN0IF9tZXJnZU11bHRpTGFuZ3VhZ2VzID0gZnVuY3Rpb24oYXJyKSB7XHJcbiAgICB2YXIgY29udGVudCwgZGljdCwgaSwgaWR4LCBrZXksIGxhbmcsIHJldCwgdmFsLCBfaSwgX2xlbiwgX3JlZjtcclxuICAgIGRpY3QgPSB7fTtcclxuICAgIGkgPSBhcnIubGVuZ3RoO1xyXG4gICAgcmV0ID0gW107XHJcbiAgICBmb3IgKGkgPSBfaSA9IDAsIF9sZW4gPSBhcnIubGVuZ3RoOyBfaSA8IF9sZW47IGkgPSArK19pKSB7XHJcbiAgICAgICAgdmFsID0gYXJyW2ldO1xyXG4gICAgICAgIGtleSA9IHZhbC5zdGFydFRpbWUgKyAnLCcgKyB2YWwuZW5kVGltZTtcclxuICAgICAgICBpZiAoKGlkeCA9IGRpY3Rba2V5XSkgIT09IHZvaWQgMCkge1xyXG4gICAgICAgICAgICBfcmVmID0gdmFsLmxhbmd1YWdlcztcclxuICAgICAgICAgICAgZm9yIChsYW5nIGluIF9yZWYpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBfcmVmW2xhbmddO1xyXG4gICAgICAgICAgICAgICAgcmV0W2lkeF0ubGFuZ3VhZ2VzW2xhbmddID0gY29udGVudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldC5wdXNoKHZhbCk7XHJcbiAgICAgICAgICAgIGRpY3Rba2V5XSA9IHJldC5sZW5ndGggLSAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXQ7XHJcbn07XHJcblxyXG5jb25zdCBTbWlQYXJzZXIgPSBmdW5jdGlvbihzYW1pLCBvcHRpb25zKSB7XHJcbiAgICB2YXIgZGVmaW5lZExhbmdzLCBkdXJhdGlvbiwgZXJyb3JzLCBnZXREZWZpbmVkTGFuZ3MsIGdldExhbmd1YWdlLCBrZXksIG1ha2VFbmRUaW1lLCBwYXJzZSwgcmVzdWx0LCB2YWx1ZSwgX3JlZiwgZml4ZWRMYW5nO1xyXG4gICAgcGFyc2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZWxlbWVudCwgZXJyb3IsIGlubmVyVGV4dCwgaXNCcm9rZW4sIGl0ZW0sIGxhbmcsIGxhbmdJdGVtLCBsaW5lTnVtLCBuZXh0U3RhcnRUYWdJZHgsIHJldCwgc3RhcnRUYWdJZHgsIHN0YXJ0VGltZSwgc3RyLCB0ZW1wUmV0LCBfcmVmLCBfcmVmMSwgX3JlZjI7XHJcbiAgICAgICAgZXJyb3IgPSBmdW5jdGlvbihlcnJvcikge1xyXG4gICAgICAgICAgICB2YXIgZTtcclxuICAgICAgICAgICAgZSA9IG5ldyBFcnJvcihlcnJvcik7XHJcbiAgICAgICAgICAgIGUubGluZSA9IGxpbmVOdW07XHJcbiAgICAgICAgICAgIGUuY29udGV4dCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHJldHVybiBlcnJvcnMucHVzaChlKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxpbmVOdW0gPSAxO1xyXG4gICAgICAgIHJldCA9IFtdO1xyXG4gICAgICAgIHRlbXBSZXQgPSB7fTtcclxuICAgICAgICBzdHIgPSBzYW1pO1xyXG4gICAgICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgICAgIHN0YXJ0VGFnSWR4ID0gc3RyLnNlYXJjaCgpO1xyXG4gICAgICAgICAgICBpZiAobmV4dFN0YXJ0VGFnSWR4IDw9IDAgfHwgc3RhcnRUYWdJZHggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXh0U3RhcnRUYWdJZHggPSBzdHIuc2xpY2Uoc3RhcnRUYWdJZHggKyAxKS5zZWFyY2gocmVDbG9zZVN5bmMpICsgMTtcclxuICAgICAgICAgICAgaWYgKG5leHRTdGFydFRhZ0lkeCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBzdHIuc2xpY2Uoc3RhcnRUYWdJZHgsIHN0YXJ0VGFnSWR4ICsgbmV4dFN0YXJ0VGFnSWR4KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBzdHIuc2xpY2Uoc3RhcnRUYWdJZHgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxpbmVOdW0gKz0gKChfcmVmID0gc3RyLnNsaWNlKDAsIHN0YXJ0VGFnSWR4KS5tYXRjaChyZUxpbmVFbmRpbmcpKSAhPSBudWxsID8gX3JlZi5sZW5ndGggOiB2b2lkIDApIHx8IDA7XHJcbiAgICAgICAgICAgIGlmIChpc0Jyb2tlbiA9IHJlQnJva2VuVGFnLnRlc3QoZWxlbWVudCkpIHtcclxuICAgICAgICAgICAgICAgIGVycm9yKCdFUlJPUl9CUk9LRU5fVEFHUycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN0ciA9IHN0ci5zbGljZShzdGFydFRhZ0lkeCArIG5leHRTdGFydFRhZ0lkeCk7XHJcbiAgICAgICAgICAgIHN0YXJ0VGltZSA9ICsoKF9yZWYxID0gZWxlbWVudC5tYXRjaChyZVN0YXJ0VGltZSkpICE9IG51bGwgPyBwYXJzZUZsb2F0KF9yZWYxWzFdLzEwMDApIDogdm9pZCAwKTsgIC8vSFNMRUUgbXMgLT4gcyDroZwg67OA6rK9XHJcbiAgICAgICAgICAgIGlmIChzdGFydFRpbWUgPT09IG51bGwgfHwgc3RhcnRUaW1lIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgZXJyb3IoJ0VSUk9SX0lOVkFMSURfVElNRScpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBXZSBkb24ndCBuZWVkIGNvbXBsZXggbGFuZ3VhZ2UuIGN1cyBTTUkgZG9lbnMndCBvYmV5IHRoZSBydWxlcy4uLlxyXG4gICAgICAgICAgICBsYW5nID0gZ2V0TGFuZ3VhZ2UoZWxlbWVudCk7XHJcbiAgICAgICAgICAgIC8vbGFuZyA9IFwia29cIjtcclxuICAgICAgICAgICAgaWYgKCFsYW5nKSB7XHJcbiAgICAgICAgICAgICAgIC8vIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZXJyb3IoJ0VSUk9SX0lOVkFMSURfTEFOR1VBR0UnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsaW5lTnVtICs9ICgoX3JlZjIgPSBlbGVtZW50Lm1hdGNoKHJlTGluZUVuZGluZykpICE9IG51bGwgPyBfcmVmMi5sZW5ndGggOiB2b2lkIDApIHx8IDA7XHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LnJlcGxhY2UocmVMaW5lRW5kaW5nLCAnJyk7XHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LnJlcGxhY2UocmVCciwgXCJcXG5cIik7XHJcbiAgICAgICAgICAgIGlubmVyVGV4dCA9IHN0cmlwX3RhZ3MoZWxlbWVudCkudHJpbSgpO1xyXG5cclxuICAgICAgICAgICAgLy9IU0xFRSA6IDIwMTgwNTMwIC0g7Jqw66awIOuereq4sOyngCDqtazrtoTsnbQg7ZWE7JqUIOyXhuuLpC4g7J6I64qU6rGwIOq3uOuMgOuhnCDrs7Tsl6zspITrv5BcclxuICAgICAgICAgICAgaXRlbSA9IHtcclxuICAgICAgICAgICAgICAgIHN0YXJ0OiBzdGFydFRpbWUsXHJcbiAgICAgICAgICAgICAgICAvL2xhbmd1YWdlczoge30sXHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgY29udGVudHM6IGlubmVyVGV4dFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpZiAobGFuZykge1xyXG4gICAgICAgICAgICAgICAgLy9pdGVtLmxhbmd1YWdlc1tsYW5nXSA9IGlubmVyVGV4dDtcclxuICAgICAgICAgICAgICAgIGl0ZW0udGV4dCA9IGlubmVyVGV4dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0ZW1wUmV0W2xhbmddIHx8ICh0ZW1wUmV0W2xhbmddID0gW10pO1xyXG4gICAgICAgICAgICAvL3RlbXBSZXRbbGFuZ10ucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgaWYoaXRlbS5zdGFydCl7XHJcbiAgICAgICAgICAgICAgICB0ZW1wUmV0W2xhbmddLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2ZpeGVkIGJ5IGhzbGVlIDE5MDEzMFxyXG4gICAgICAgIC8vU01JIHdhcyBkZXNpZ25lZCBmb3IgbXVsdGkgbGFuZ3VhZ2UuIEJ1dCBnbG9iYWwgc3RhbmRhcmQgKG15IGd1ZXNzKSBTUlQsIFZUVCBkb2Vzbid0IHN1cHBvcnQgbXVsdGkgbGFuZ3VhZ2UuXHJcbiAgICAgICAgLy9UaGlzIHVwZGF0ZSBpcyBoYW5kbGluZyBpZiBTTUkgaGFzIG11bHRpcGxlIGxhbmd1YWdlcy5cclxuICAgICAgICBmaXhlZExhbmcgPSBmaXhlZExhbmcgfHwgZ2V0QnJvd3Nlckxhbmd1YWdlKCk7XHJcbiAgICAgICAgbGV0IGNvbnZlcnRlZExhbmd1YWdlTmFtZXMgPSBPYmplY3Qua2V5cyh0ZW1wUmV0KTtcclxuXHJcbiAgICAgICAgaWYoY29udmVydGVkTGFuZ3VhZ2VOYW1lcyAmJiBjb252ZXJ0ZWRMYW5ndWFnZU5hbWVzLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICBpZihjb252ZXJ0ZWRMYW5ndWFnZU5hbWVzLmluZGV4T2YoZml4ZWRMYW5nKSA+IC0xKXtcclxuICAgICAgICAgICAgICAgIGxhbmdJdGVtID0gdGVtcFJldFtmaXhlZExhbmddO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGxhbmdJdGVtID0gdGVtcFJldFtjb252ZXJ0ZWRMYW5ndWFnZU5hbWVzLmZpbHRlcihmdW5jdGlvbihuYW1lKXtyZXR1cm4gbmFtZSAhPT0gXCJ1bmRlZmluZWRcIn0pWzBdXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsYW5nSXRlbSA9IF9zb3J0KGxhbmdJdGVtKTtcclxuICAgICAgICAgICAgbGFuZ0l0ZW0gPSBtYWtlRW5kVGltZShsYW5nSXRlbSk7XHJcbiAgICAgICAgICAgIHJldCA9IHJldC5jb25jYXQobGFuZ0l0ZW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9yZXQgPSBfbWVyZ2VNdWx0aUxhbmd1YWdlcyhyZXQpO1xyXG4gICAgICAgIHJldCA9IF9zb3J0KHJldCk7XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH07XHJcbiAgICBnZXRMYW5ndWFnZSA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgICAgICB2YXIgY2xhc3NOYW1lLCBsYW5nO1xyXG4gICAgICAgIGlmKCFlbGVtZW50KXtyZXR1cm4gO31cclxuICAgICAgICBmb3IgKGNsYXNzTmFtZSBpbiBkZWZpbmVkTGFuZ3MpIHtcclxuICAgICAgICAgICAgbGFuZyA9IGRlZmluZWRMYW5nc1tjbGFzc05hbWVdO1xyXG4gICAgICAgICAgICBpZiAobGFuZy5yZUNsYXNzTmFtZS50ZXN0KGVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbGFuZy5sYW5nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGdldERlZmluZWRMYW5ncyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBjbGFzc05hbWUsIGRlY2xhcmF0aW9uLCBlLCBlcnJvciwgbGFuZywgbWF0Y2hlZCwgcGFyc2VkLCBydWxlLCBzZWxlY3RvciwgX2ksIF9sZW4sIF9yZWYsIF9yZWYxLCBfcmVzdWx0cztcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBtYXRjaGVkID0gKChfcmVmID0gc2FtaS5tYXRjaChyZVN0eWxlKSkgIT0gbnVsbCA/IF9yZWZbMV0gOiB2b2lkIDApIHx8ICcnO1xyXG4gICAgICAgICAgICBtYXRjaGVkID0gbWF0Y2hlZC5yZXBsYWNlKHJlQ29tbWVudCwgJycpO1xyXG4gICAgICAgICAgICBwYXJzZWQgPSBjc3NQYXJzZShtYXRjaGVkKTtcclxuICAgICAgICAgICAgX3JlZjEgPSBwYXJzZWQuc3R5bGVzaGVldC5ydWxlcztcclxuICAgICAgICAgICAgX3Jlc3VsdHMgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChfaSA9IDAsIF9sZW4gPSBfcmVmMS5sZW5ndGg7IF9pIDwgX2xlbjsgX2krKykge1xyXG4gICAgICAgICAgICAgICAgcnVsZSA9IF9yZWYxW19pXTtcclxuICAgICAgICAgICAgICAgIHNlbGVjdG9yID0gcnVsZS5zZWxlY3RvcnNbMF07XHJcbiAgICAgICAgICAgICAgICBpZiAoKHNlbGVjdG9yICE9IG51bGwgPyBzZWxlY3RvclswXSA6IHZvaWQgMCkgPT09ICcuJykge1xyXG4gICAgICAgICAgICAgICAgICAgIF9yZXN1bHRzLnB1c2goKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2osIF9sZW4xLCBfcmVmMiwgX3Jlc3VsdHMxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVmMiA9IHJ1bGUuZGVjbGFyYXRpb25zO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVzdWx0czEgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChfaiA9IDAsIF9sZW4xID0gX3JlZjIubGVuZ3RoOyBfaiA8IF9sZW4xOyBfaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWNsYXJhdGlvbiA9IF9yZWYyW19qXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZWNsYXJhdGlvbi5wcm9wZXJ0eS50b0xvd2VyQ2FzZSgpID09PSAnbGFuZycpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSBzZWxlY3Rvci5zbGljZSgxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYW5nID0gZGVjbGFyYXRpb24udmFsdWUuc2xpY2UoMCwgMik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKH5sYW5nQ29kZXMuaW5kZXhPZihsYW5nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVzdWx0czEucHVzaChkZWZpbmVkTGFuZ3NbY2xhc3NOYW1lXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhbmc6IGxhbmcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZUNsYXNzTmFtZTogbmV3IFJlZ0V4cChcImNsYXNzW149XSo/PVtcXFwiJ1xcU10qKFwiICsgY2xhc3NOYW1lICsgXCIpWydcXFwiXFxTXT9cIiwgJ2knKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3Jlc3VsdHMxLnB1c2godm9pZCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3Jlc3VsdHMxO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pKCkpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBfcmVzdWx0cy5wdXNoKHZvaWQgMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIF9yZXN1bHRzO1xyXG4gICAgICAgIH0gY2F0Y2ggKF9lcnJvcikge1xyXG4gICAgICAgICAgICBlID0gX2Vycm9yO1xyXG4gICAgICAgICAgICBlcnJvcnMucHVzaChlcnJvciA9IG5ldyBFcnJvcignRVJST1JfSU5WQUxJRF9MQU5HVUFHRV9ERUZJTklUSU9OJykpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBtYWtlRW5kVGltZSA9IGZ1bmN0aW9uKGxhbmdJdGVtKSB7XHJcbiAgICAgICAgdmFyIGksIGl0ZW0sIF9yZWY7XHJcbiAgICAgICAgaSA9IGxhbmdJdGVtLmxlbmd0aDtcclxuICAgICAgICB3aGlsZSAoaS0tKSB7XHJcbiAgICAgICAgICAgIGl0ZW0gPSBsYW5nSXRlbVtpXTtcclxuICAgICAgICAgICAgaWYgKChfcmVmID0gbGFuZ0l0ZW1baSAtIDFdKSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvL0hTTEVFIDog7J207JmV7J2066m0IFNSVCDtjIzshJzsmYAg7Y+s66e37J2EIOunnuy2lOyekFxyXG4gICAgICAgICAgICAgICAgX3JlZi5lbmQgPSBpdGVtLnN0YXJ0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaXRlbS5jb250ZW50cyB8fCBpdGVtLmNvbnRlbnRzID09PSAnJm5ic3A7Jykge1xyXG4gICAgICAgICAgICAgICAgbGFuZ0l0ZW0uc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIGxhbmdJdGVtW2ldLmNvbnRlbnRzO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpdGVtLmVuZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uZW5kID0gaXRlbS5zdGFydCArIGR1cmF0aW9uO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsYW5nSXRlbTtcclxuICAgIH07XHJcbiAgICBlcnJvcnMgPSBbXTtcclxuICAgIGRlZmluZWRMYW5ncyA9IHtcclxuICAgICAgICBLUkNDOiB7XHJcbiAgICAgICAgICAgIGxhbmc6ICdrbycsXHJcbiAgICAgICAgICAgIHJlQ2xhc3NOYW1lOiBuZXcgUmVnRXhwKFwiY2xhc3NbXj1dKj89W1xcXCInXFxTXSooS1JDQylbJ1xcXCJcXFNdP1wiLCAnaScpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBLT0NDOiB7XHJcbiAgICAgICAgICAgIGxhbmc6ICdrbycsXHJcbiAgICAgICAgICAgIHJlQ2xhc3NOYW1lOiBuZXcgUmVnRXhwKFwiY2xhc3NbXj1dKj89W1xcXCInXFxTXSooS09DQylbJ1xcXCJcXFNdP1wiLCAnaScpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBLUjoge1xyXG4gICAgICAgICAgICBsYW5nOiAna28nLFxyXG4gICAgICAgICAgICByZUNsYXNzTmFtZTogbmV3IFJlZ0V4cChcImNsYXNzW149XSo/PVtcXFwiJ1xcU10qKEtSKVsnXFxcIlxcU10/XCIsICdpJylcclxuICAgICAgICB9LFxyXG4gICAgICAgIEVOQ0M6IHtcclxuICAgICAgICAgICAgbGFuZzogJ2VuJyxcclxuICAgICAgICAgICAgcmVDbGFzc05hbWU6IG5ldyBSZWdFeHAoXCJjbGFzc1tePV0qPz1bXFxcIidcXFNdKihFTkNDKVsnXFxcIlxcU10/XCIsICdpJylcclxuICAgICAgICB9LFxyXG4gICAgICAgIEVHQ0M6IHtcclxuICAgICAgICAgICAgbGFuZzogJ2VuJyxcclxuICAgICAgICAgICAgcmVDbGFzc05hbWU6IG5ldyBSZWdFeHAoXCJjbGFzc1tePV0qPz1bXFxcIidcXFNdKihFR0NDKVsnXFxcIlxcU10/XCIsICdpJylcclxuICAgICAgICB9LFxyXG4gICAgICAgIEVOOiB7XHJcbiAgICAgICAgICAgIGxhbmc6ICdlbicsXHJcbiAgICAgICAgICAgIHJlQ2xhc3NOYW1lOiBuZXcgUmVnRXhwKFwiY2xhc3NbXj1dKj89W1xcXCInXFxTXSooRU4pWydcXFwiXFxTXT9cIiwgJ2knKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgSlBDQzoge1xyXG4gICAgICAgICAgICBsYW5nOiAnamEnLFxyXG4gICAgICAgICAgICByZUNsYXNzTmFtZTogbmV3IFJlZ0V4cChcImNsYXNzW149XSo/PVtcXFwiJ1xcU10qKEpQQ0MpWydcXFwiXFxTXT9cIiwgJ2knKVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBpZiAob3B0aW9ucyAhPSBudWxsID8gb3B0aW9ucy5kZWZpbmVkTGFuZ3MgOiB2b2lkIDApIHtcclxuICAgICAgICBfcmVmID0gb3B0aW9ucy5kZWZpbmVkTGFuZ3M7XHJcbiAgICAgICAgZm9yIChrZXkgaW4gX3JlZikge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IF9yZWZba2V5XTtcclxuICAgICAgICAgICAgZGVmaW5lZExhbmdzW2tleV0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBkdXJhdGlvbiA9IChvcHRpb25zICE9IG51bGwgPyBvcHRpb25zLmR1cmF0aW9uIDogdm9pZCAwKSB8fCAxMDsgLy9IU0xFRSBtcyAtPiBzIOuhnCDrs4Dqsr1cclxuICAgIGZpeGVkTGFuZyA9IG9wdGlvbnMuZml4ZWRMYW5nO1xyXG4gICAgc2FtaSA9IHNhbWkudHJpbSgpO1xyXG4gICAgLy9nZXREZWZpbmVkTGFuZ3MoKTtcclxuICAgIHJlc3VsdCA9IHBhcnNlKCk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3VsdDogcmVzdWx0LFxyXG4gICAgICAgIGVycm9yczogZXJyb3JzXHJcbiAgICB9O1xyXG59O1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNtaVBhcnNlcjsiLCIvKipcclxuICogQ3JlYXRlZCBieSBob2hvIG9uIDIwMTguIDguIDI0Li5cclxuICovXHJcblxyXG5leHBvcnQgY29uc3QgZ2V0QnJvd3Nlckxhbmd1YWdlID0gZnVuY3Rpb24oKXtcclxuICAgIGxldCBuYXYgPSB3aW5kb3cubmF2aWdhdG9yLFxyXG4gICAgICAgIGJyb3dzZXJMYW5ndWFnZVByb3BlcnR5S2V5cyA9IFsnbGFuZ3VhZ2UnLCAnYnJvd3Nlckxhbmd1YWdlJywgJ3N5c3RlbUxhbmd1YWdlJywgJ3VzZXJMYW5ndWFnZSddLFxyXG4gICAgICAgIGksXHJcbiAgICAgICAgbGFuZ3VhZ2U7XHJcblxyXG4gICAgLy8gc3VwcG9ydCBmb3IgSFRNTCA1LjEgXCJuYXZpZ2F0b3IubGFuZ3VhZ2VzXCJcclxuICAgIGlmIChBcnJheS5pc0FycmF5KG5hdi5sYW5ndWFnZXMpKSB7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IG5hdi5sYW5ndWFnZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGFuZ3VhZ2UgPSBuYXYubGFuZ3VhZ2VzW2ldO1xyXG4gICAgICAgICAgICBpZiAobGFuZ3VhZ2UgJiYgbGFuZ3VhZ2UubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbGFuZ3VhZ2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc3VwcG9ydCBmb3Igb3RoZXIgd2VsbCBrbm93biBwcm9wZXJ0aWVzIGluIGJyb3dzZXJzXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgYnJvd3Nlckxhbmd1YWdlUHJvcGVydHlLZXlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGFuZ3VhZ2UgPSBuYXZbYnJvd3Nlckxhbmd1YWdlUHJvcGVydHlLZXlzW2ldXTtcclxuICAgICAgICBpZiAobGFuZ3VhZ2UgJiYgbGFuZ3VhZ2UubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsYW5ndWFnZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0QnJvd3NlciA9IGZ1bmN0aW9uKCl7XHJcbiAgICBpZigobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiT3BlcmFcIikgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdPUFInKSkgIT0gLTEgKXtcclxuICAgICAgICByZXR1cm4gJ29wZXJhJztcclxuICAgIH1lbHNlIGlmKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIkNocm9tZVwiKSAhPSAtMSApe1xyXG4gICAgICAgIHJldHVybiAnY2hyb21lJztcclxuICAgIH1lbHNlIGlmKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIlNhZmFyaVwiKSAhPSAtMSl7XHJcbiAgICAgICAgcmV0dXJuICdzYWZhcmknO1xyXG4gICAgfWVsc2UgaWYobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiRmlyZWZveFwiKSAhPSAtMSApe1xyXG4gICAgICAgIHJldHVybiAnZmlyZWZveCc7XHJcbiAgICB9ZWxzZSBpZigobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiTVNJRVwiKSAhPSAtMSApKXtcclxuICAgICAgICBsZXQgbXNpZSA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIk1TSUVcIik7XHJcbiAgICAgICAgLyppZighIWRvY3VtZW50LmRvY3VtZW50TW9kZSA9PSB0cnVlICl7XHJcbiAgICAgICAgICAgIHJldHVybiAnaWUnO1xyXG4gICAgICAgIH1lbHNlIGlmKCEhbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvVHJpZGVudC4qcnZcXDoxMVxcLi8pKXtcclxuICAgICAgICAgICAgaWYgKCFpc05hTihwYXJzZUludCh1YS5zdWJzdHJpbmcobXNpZSArIDUsIHVhLmluZGV4T2YoXCIuXCIsIG1zaWUpKSkpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2llJztcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3Vua25vd24nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiAndW5rbm93bic7XHJcbiAgICAgICAgfSovXHJcbiAgICAgICAgdmFyIGllID0gKGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgICAgICB2YXIgdW5kZWYsXHJcbiAgICAgICAgICAgICAgICB2ID0gMyxcclxuICAgICAgICAgICAgICAgIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxyXG4gICAgICAgICAgICAgICAgYWxsID0gZGl2LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpJyk7XHJcblxyXG4gICAgICAgICAgICB3aGlsZSAoXHJcbiAgICAgICAgICAgICAgICBkaXYuaW5uZXJIVE1MID0gJzwhLS1baWYgZ3QgSUUgJyArICgrK3YpICsgJ10+PGk+PC9pPjwhW2VuZGlmXS0tPicsXHJcbiAgICAgICAgICAgICAgICAgICAgYWxsWzBdXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHYgPiA0ID8gdiA6IHVuZGVmO1xyXG5cclxuICAgICAgICB9KCkpO1xyXG4gICAgICAgIGlmKGllIDwgOSl7XHJcbiAgICAgICAgICAgIHJldHVybiAnb2xkSUUnO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gJ21vZGVybklFJztcclxuICAgICAgICB9XHJcblxyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgcmV0dXJuICd1bmtub3duJztcclxuICAgIH1cclxuXHJcbn07XHJcblxyXG4iXSwic291cmNlUm9vdCI6IiJ9