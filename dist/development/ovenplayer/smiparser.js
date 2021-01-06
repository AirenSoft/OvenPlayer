/*! OvenPlayer | (c) 2021 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2NhcHRpb24vcGFyc2VyL1NtaVBhcnNlci5qcyJdLCJuYW1lcyI6WyJsYW5nQ29kZXMiLCJyZU9wZW5TeW5jIiwicmVDbG9zZVN5bmMiLCJyZUxpbmVFbmRpbmciLCJyZUJyb2tlblRhZyIsInJlU3RhcnRUaW1lIiwicmVCciIsInJlU3R5bGUiLCJyZUNvbW1lbnQiLCJjbG9uZSIsIm9iaiIsImZsYWdzIiwia2V5IiwibmV3SW5zdGFuY2UiLCJEYXRlIiwiZ2V0VGltZSIsIlJlZ0V4cCIsImdsb2JhbCIsImlnbm9yZUNhc2UiLCJtdWx0aWxpbmUiLCJzdGlja3kiLCJzb3VyY2UiLCJjb25zdHJ1Y3RvciIsInN0cmlwX3RhZ3MiLCJpbnB1dCIsImFsbG93ZWQiLCJ0b0xvd2VyQ2FzZSIsIm1hdGNoIiwiam9pbiIsInRhZ3MiLCJjb21tZW50c0FuZFBocFRhZ3MiLCJyZXBsYWNlIiwiJDAiLCIkMSIsImluZGV4T2YiLCJfc29ydCIsImxhbmdJdGVtIiwic29ydCIsImEiLCJiIiwicmVzIiwic3RhcnQiLCJlbmQiLCJfbWVyZ2VNdWx0aUxhbmd1YWdlcyIsImFyciIsImNvbnRlbnQiLCJkaWN0IiwiaSIsImlkeCIsImxhbmciLCJyZXQiLCJ2YWwiLCJfaSIsIl9sZW4iLCJfcmVmIiwibGVuZ3RoIiwic3RhcnRUaW1lIiwiZW5kVGltZSIsImxhbmd1YWdlcyIsInB1c2giLCJTbWlQYXJzZXIiLCJzYW1pIiwib3B0aW9ucyIsImRlZmluZWRMYW5ncyIsImR1cmF0aW9uIiwiZXJyb3JzIiwiZ2V0RGVmaW5lZExhbmdzIiwiZ2V0TGFuZ3VhZ2UiLCJtYWtlRW5kVGltZSIsInBhcnNlIiwicmVzdWx0IiwidmFsdWUiLCJmaXhlZExhbmciLCJlbGVtZW50IiwiZXJyb3IiLCJpbm5lclRleHQiLCJpc0Jyb2tlbiIsIml0ZW0iLCJsaW5lTnVtIiwibmV4dFN0YXJ0VGFnSWR4Iiwic3RhcnRUYWdJZHgiLCJzdHIiLCJ0ZW1wUmV0IiwiX3JlZjEiLCJfcmVmMiIsImUiLCJFcnJvciIsImxpbmUiLCJjb250ZXh0Iiwic2VhcmNoIiwic2xpY2UiLCJ0ZXN0IiwicGFyc2VGbG9hdCIsInRyaW0iLCJ0ZXh0IiwiY29udGVudHMiLCJjb252ZXJ0ZWRMYW5ndWFnZU5hbWVzIiwiT2JqZWN0Iiwia2V5cyIsImZpbHRlciIsIm5hbWUiLCJjb25jYXQiLCJjbGFzc05hbWUiLCJyZUNsYXNzTmFtZSIsImRlY2xhcmF0aW9uIiwibWF0Y2hlZCIsInBhcnNlZCIsInJ1bGUiLCJzZWxlY3RvciIsIl9yZXN1bHRzIiwiY3NzUGFyc2UiLCJzdHlsZXNoZWV0IiwicnVsZXMiLCJzZWxlY3RvcnMiLCJfaiIsIl9sZW4xIiwiX3Jlc3VsdHMxIiwiZGVjbGFyYXRpb25zIiwicHJvcGVydHkiLCJfZXJyb3IiLCJzcGxpY2UiLCJLUkNDIiwiS09DQyIsIktSIiwiRU5DQyIsIkVHQ0MiLCJFTiIsIkpQQ0MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7O0FBU0EsSUFBTUEsWUFBWSxDQUFDLElBQUQsRUFBTSxJQUFOLEVBQVcsSUFBWCxFQUFpQixJQUFqQixFQUF1QixJQUF2QixFQUE2QixJQUE3QixFQUFtQyxJQUFuQyxFQUF5QyxJQUF6QyxFQUErQyxJQUEvQyxFQUFxRCxJQUFyRCxFQUEyRCxJQUEzRCxFQUFpRSxJQUFqRSxFQUF1RSxJQUF2RSxFQUE2RSxJQUE3RSxFQUFtRixJQUFuRixFQUF5RixJQUF6RixFQUErRixJQUEvRixFQUFxRyxJQUFyRyxFQUEyRyxJQUEzRyxFQUFpSCxJQUFqSCxFQUF1SCxJQUF2SCxFQUE2SCxJQUE3SCxFQUFrSSxJQUFsSSxFQUF1SSxJQUF2SSxFQUE0SSxJQUE1SSxFQUFpSixJQUFqSixFQUFzSixJQUF0SixFQUEySixJQUEzSixFQUFnSyxJQUFoSyxFQUFxSyxJQUFySyxFQUEwSyxJQUExSyxFQUErSyxJQUEvSyxFQUFvTCxJQUFwTCxFQUF5TCxJQUF6TCxFQUE4TCxJQUE5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akQ7QUFGWDtBQXpCSyxLQUFmO0FBOEJBLFFBQUk4QyxXQUFXLElBQVgsR0FBa0JBLFFBQVFDLFlBQTFCLEdBQXlDLEtBQUssQ0FBbEQsRUFBcUQ7QUFDakRULGVBQU9RLFFBQVFDLFlBQWY7QUFDQSxhQUFLbkQsR0FBTCxJQUFZMEMsSUFBWixFQUFrQjtBQUNkaUIsb0JBQVFqQixLQUFLMUMsR0FBTCxDQUFSO0FBQ0FtRCx5QkFBYW5ELEdBQWIsSUFBb0IyRCxLQUFwQjtBQUNIO0FBQ0o7QUFDRFAsZUFBVyxDQUFDRixXQUFXLElBQVgsR0FBa0JBLFFBQVFFLFFBQTFCLEdBQXFDLEtBQUssQ0FBM0MsS0FBaUQsRUFBNUQsQ0F6TXNDLENBeU0wQjtBQUNoRVEsZ0JBQVlWLFFBQVFVLFNBQXBCO0FBQ0FYLFdBQU9BLEtBQUtnQyxJQUFMLEVBQVA7QUFDQTtBQUNBdkIsYUFBU0QsT0FBVDtBQUNBLFdBQU87QUFDSEMsZ0JBQVFBLE1BREw7QUFFSEwsZ0JBQVFBO0FBRkwsS0FBUDtBQUlILENBbE5EOztxQkFxTmVMLFMiLCJmaWxlIjoic21pcGFyc2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtnZXRCcm93c2VyTGFuZ3VhZ2V9IGZyb20gXCJ1dGlscy9icm93c2VyXCI7XHJcbi8qXHJcbiAqICBzYW1pLXBhcnNlclxyXG4gKiAgVGhlIE1JVCBMaWNlbnNlIChNSVQpXHJcbiAqXHJcbiAqICBDb3B5cmlnaHQgKGMpIDIwMTMgQ29uc3RhbnRpbmUgS2ltIDxlbGVnYW50Y29kZXJAZ21haWwuY29tPlxyXG4gKiAgaHR0cHM6Ly9naXRodWIuY29tL2VsZWdhbnRjb2Rlci9zYW1pLXBhcnNlclxyXG4gKlxyXG4gKi9cclxuXHJcbmNvbnN0IGxhbmdDb2RlcyA9IFtcImFiXCIsXCJhYVwiLFwiYWZcIiwgXCJha1wiLCBcInNxXCIsIFwiYW1cIiwgXCJhclwiLCBcImFuXCIsIFwiaHlcIiwgXCJhc1wiLCBcImF2XCIsIFwiYWVcIiwgXCJheVwiLCBcImF6XCIsIFwiYm1cIiwgXCJiYVwiLCBcImV1XCIsIFwiYmVcIiwgXCJiblwiLCBcImJoXCIsIFwiYmlcIiwgXCJuYlwiLFwiYnNcIixcImJyXCIsXCJiZ1wiLFwibXlcIixcImVzXCIsXCJjYVwiLFwia21cIixcImNoXCIsXCJjZVwiLFwibnlcIixcIm55XCIsXCJ6aFwiLFwiemFcIixcImN1XCIsXCJjdVwiLFwiY3ZcIixcImt3XCIsXHJcbiAgICBcImNvXCIsXCJjclwiLFwiaHJcIixcImNzXCIsXCJkYVwiLFwiZHZcIixcImR2XCIsXCJubFwiLFwiZHpcIixcImVuXCIsXCJlb1wiLFwiZXRcIixcImVlXCIsXCJmb1wiLFwiZmpcIixcImZpXCIsXCJubFwiLFwiZnJcIixcImZmXCIsXCJnZFwiLFwiZ2xcIixcImxnXCIsXCJrYVwiLFwiZGVcIixcImtpXCIsXCJlbFwiLFwia2xcIixcImduXCIsXCJndVwiLFwiaHRcIixcImh0XCIsXCJoYVwiLFwiaGVcIixcImh6XCIsXCJoaVwiLFwiaG9cIixcImh1XCIsXCJpc1wiLFwiaW9cIixcImlnXCIsXCJpZFwiLFwiaWFcIixcImllXCIsXCJpdVwiLFwiaWtcIixcImdhXCIsXHJcbiAgICBcIml0XCIsXCJqYVwiLFwianZcIixcImtsXCIsXCJrblwiLFwia3JcIixcImtzXCIsXCJra1wiLFwia2lcIixcInJ3XCIsXCJreVwiLFwia3ZcIixcImtnXCIsXCJrb1wiLFwia2pcIixcImt1XCIsXCJralwiLFwia3lcIixcImxvXCIsXCJsYVwiLFwibHZcIixcImxiXCIsXCJsaVwiLFwibGlcIixcImxpXCIsXCJsblwiLFwibHRcIixcImx1XCIsXCJsYlwiLFwibWtcIixcIm1nXCIsXCJtc1wiLFwibWxcIixcImR2XCIsXCJtdFwiLFwiZ3ZcIixcIm1pXCIsXCJtclwiLFwibWhcIixcInJvXCIsXCJyb1wiLFwibW5cIixcIm5hXCIsXCJudlwiLFwibnZcIixcIm5kXCIsXHJcbiAgICBcIm5yXCIsXCJuZ1wiLFwibmVcIixcIm5kXCIsXCJzZVwiLFwibm9cIixcIm5iXCIsXCJublwiLFwiaWlcIixcIm55XCIsXCJublwiLFwiaWVcIixcIm9jXCIsXCJvalwiLFwiY3VcIixcImN1XCIsXCJjdVwiLFwib3JcIixcIm9tXCIsXCJvc1wiLFwib3NcIixcInBpXCIsXCJwYVwiLFwicHNcIixcImZhXCIsXCJwbFwiLFwicHRcIixcInBhXCIsXCJwc1wiLFwicXVcIixcInJvXCIsXCJybVwiLFwicm5cIixcInJ1XCIsXCJzbVwiLFwic2dcIixcInNhXCIsXCJzY1wiLFwiZ2RcIixcInNyXCIsXCJzblwiLFwiaWlcIixcInNkXCIsXCJzaVwiLFwic2lcIixcInNrXCIsXHJcbiAgICBcInNsXCIsXCJzb1wiLFwic3RcIixcIm5yXCIsXCJlc1wiLFwic3VcIixcInN3XCIsXCJzc1wiLFwic3ZcIixcInRsXCIsXCJ0eVwiLFwidGdcIixcInRhXCIsXCJ0dFwiLFwidGVcIixcInRoXCIsXCJib1wiLFwidGlcIixcInRvXCIsXCJ0c1wiLFwidG5cIixcInRyXCIsXCJ0a1wiLFwidHdcIixcInVnXCIsXCJ1a1wiLFwidXJcIixcInVnXCIsXCJ1elwiLFwiY2FcIixcInZlXCIsXCJ2aVwiLFwidm9cIixcIndhXCIsXCJjeVwiLFwiZnlcIixcIndvXCIsXCJ4aFwiLFwieWlcIixcInlvXCIsXCJ6YVwiLFwienVcIl07XHJcblxyXG5jb25zdCByZU9wZW5TeW5jID0gLzxzeW5jL2k7XHJcblxyXG5jb25zdCByZUNsb3NlU3luYyA9IC88c3luY3w8XFwvYm9keXw8XFwvc2FtaS9pO1xyXG5cclxuY29uc3QgcmVMaW5lRW5kaW5nID0gL1xcclxcbj98XFxuL2c7XHJcblxyXG5jb25zdCByZUJyb2tlblRhZyA9IC88W2Etel0qW14+XSo8W2Etel0qL2c7XHJcblxyXG5jb25zdCByZVN0YXJ0VGltZSA9IC88c3luY1tePl0rP3N0YXJ0W149XSo9W14wLTldKihbMC05XSopW1wiXjAtOVwiXSovaTtcclxuXHJcbmNvbnN0IHJlQnIgPSAvPGJyW14+XSo+L2lnO1xyXG5cclxuY29uc3QgcmVTdHlsZSA9IC88c3R5bGVbXj5dKj4oW1xcc1xcU10qPyk8XFwvc3R5bGVbXj5dKj4vaTtcclxuXHJcbmNvbnN0IHJlQ29tbWVudCA9IC8oPCEtLXwtLT4pL2c7XHJcblxyXG5jb25zdCBjbG9uZSA9IGZ1bmN0aW9uKG9iaikge1xyXG4gICAgdmFyIGZsYWdzLCBrZXksIG5ld0luc3RhbmNlO1xyXG4gICAgaWYgKChvYmogPT0gbnVsbCkgfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfVxyXG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mIERhdGUpIHtcclxuICAgICAgICByZXR1cm4gbmV3IERhdGUob2JqLmdldFRpbWUoKSk7XHJcbiAgICB9XHJcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgUmVnRXhwKSB7XHJcbiAgICAgICAgZmxhZ3MgPSAnJztcclxuICAgICAgICBpZiAob2JqLmdsb2JhbCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGZsYWdzICs9ICdnJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9iai5pZ25vcmVDYXNlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgZmxhZ3MgKz0gJ2knO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob2JqLm11bHRpbGluZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGZsYWdzICs9ICdtJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9iai5zdGlja3kgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBmbGFncyArPSAneSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKG9iai5zb3VyY2UsIGZsYWdzKTtcclxuICAgIH1cclxuICAgIG5ld0luc3RhbmNlID0gbmV3IG9iai5jb25zdHJ1Y3RvcigpO1xyXG4gICAgZm9yIChrZXkgaW4gb2JqKSB7XHJcbiAgICAgICAgbmV3SW5zdGFuY2Vba2V5XSA9IGNsb25lKG9ialtrZXldKTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXdJbnN0YW5jZTtcclxufTtcclxuXHJcbmNvbnN0IHN0cmlwX3RhZ3MgPSBmdW5jdGlvbiAoaW5wdXQsIGFsbG93ZWQpIHtcclxuICAgIC8vIGh0dHA6Ly9rZXZpbi52YW56b25uZXZlbGQubmV0XHJcbiAgICAvLyArICAgb3JpZ2luYWwgYnk6IEtldmluIHZhbiBab25uZXZlbGQgKGh0dHA6Ly9rZXZpbi52YW56b25uZXZlbGQubmV0KVxyXG4gICAgLy8gKyAgIGltcHJvdmVkIGJ5OiBMdWtlIEdvZGZyZXlcclxuICAgIC8vICsgICAgICBpbnB1dCBieTogUHVsXHJcbiAgICAvLyArICAgYnVnZml4ZWQgYnk6IEtldmluIHZhbiBab25uZXZlbGQgKGh0dHA6Ly9rZXZpbi52YW56b25uZXZlbGQubmV0KVxyXG4gICAgLy8gKyAgIGJ1Z2ZpeGVkIGJ5OiBPbm5vIE1hcnNtYW5cclxuICAgIC8vICsgICAgICBpbnB1dCBieTogQWxleFxyXG4gICAgLy8gKyAgIGJ1Z2ZpeGVkIGJ5OiBLZXZpbiB2YW4gWm9ubmV2ZWxkIChodHRwOi8va2V2aW4udmFuem9ubmV2ZWxkLm5ldClcclxuICAgIC8vICsgICAgICBpbnB1dCBieTogTWFyYyBQYWxhdVxyXG4gICAgLy8gKyAgIGltcHJvdmVkIGJ5OiBLZXZpbiB2YW4gWm9ubmV2ZWxkIChodHRwOi8va2V2aW4udmFuem9ubmV2ZWxkLm5ldClcclxuICAgIC8vICsgICAgICBpbnB1dCBieTogQnJldHQgWmFtaXIgKGh0dHA6Ly9icmV0dC16YW1pci5tZSlcclxuICAgIC8vICsgICBidWdmaXhlZCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cDovL2tldmluLnZhbnpvbm5ldmVsZC5uZXQpXHJcbiAgICAvLyArICAgYnVnZml4ZWQgYnk6IEVyaWMgTmFnZWxcclxuICAgIC8vICsgICAgICBpbnB1dCBieTogQm9iYnkgRHJha2VcclxuICAgIC8vICsgICBidWdmaXhlZCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cDovL2tldmluLnZhbnpvbm5ldmVsZC5uZXQpXHJcbiAgICAvLyArICAgYnVnZml4ZWQgYnk6IFRvbWFzeiBXZXNvbG93c2tpXHJcbiAgICAvLyArICAgICAgaW5wdXQgYnk6IEV2ZXJ0amFuIEdhcnJldHNlblxyXG4gICAgLy8gKyAgICByZXZpc2VkIGJ5OiBSYWZhxYIgS3VrYXdza2kgKGh0dHA6Ly9ibG9nLmt1a2F3c2tpLnBsLylcclxuICAgIC8vICogICAgIGV4YW1wbGUgMTogc3RyaXBfdGFncygnPHA+S2V2aW48L3A+IDxiciAvPjxiPnZhbjwvYj4gPGk+Wm9ubmV2ZWxkPC9pPicsICc8aT48Yj4nKTtcclxuICAgIC8vICogICAgIHJldHVybnMgMTogJ0tldmluIDxiPnZhbjwvYj4gPGk+Wm9ubmV2ZWxkPC9pPidcclxuICAgIC8vICogICAgIGV4YW1wbGUgMjogc3RyaXBfdGFncygnPHA+S2V2aW4gPGltZyBzcmM9XCJzb21laW1hZ2UucG5nXCIgb25tb3VzZW92ZXI9XCJzb21lRnVuY3Rpb24oKVwiPnZhbiA8aT5ab25uZXZlbGQ8L2k+PC9wPicsICc8cD4nKTtcclxuICAgIC8vICogICAgIHJldHVybnMgMjogJzxwPktldmluIHZhbiBab25uZXZlbGQ8L3A+J1xyXG4gICAgLy8gKiAgICAgZXhhbXBsZSAzOiBzdHJpcF90YWdzKFwiPGEgaHJlZj0naHR0cDovL2tldmluLnZhbnpvbm5ldmVsZC5uZXQnPktldmluIHZhbiBab25uZXZlbGQ8L2E+XCIsIFwiPGE+XCIpO1xyXG4gICAgLy8gKiAgICAgcmV0dXJucyAzOiAnPGEgaHJlZj0naHR0cDovL2tldmluLnZhbnpvbm5ldmVsZC5uZXQnPktldmluIHZhbiBab25uZXZlbGQ8L2E+J1xyXG4gICAgLy8gKiAgICAgZXhhbXBsZSA0OiBzdHJpcF90YWdzKCcxIDwgNSA1ID4gMScpO1xyXG4gICAgLy8gKiAgICAgcmV0dXJucyA0OiAnMSA8IDUgNSA+IDEnXHJcbiAgICAvLyAqICAgICBleGFtcGxlIDU6IHN0cmlwX3RhZ3MoJzEgPGJyLz4gMScpO1xyXG4gICAgLy8gKiAgICAgcmV0dXJucyA1OiAnMSAgMSdcclxuICAgIC8vICogICAgIGV4YW1wbGUgNjogc3RyaXBfdGFncygnMSA8YnIvPiAxJywgJzxicj4nKTtcclxuICAgIC8vICogICAgIHJldHVybnMgNjogJzEgIDEnXHJcbiAgICAvLyAqICAgICBleGFtcGxlIDc6IHN0cmlwX3RhZ3MoJzEgPGJyLz4gMScsICc8YnI+PGJyLz4nKTtcclxuICAgIC8vICogICAgIHJldHVybnMgNzogJzEgPGJyLz4gMSdcclxuICAgIGFsbG93ZWQgPSAoKChhbGxvd2VkIHx8IFwiXCIpICsgXCJcIikudG9Mb3dlckNhc2UoKS5tYXRjaCgvPFthLXpdW2EtejAtOV0qPi9nKSB8fCBbXSkuam9pbignJyk7IC8vIG1ha2luZyBzdXJlIHRoZSBhbGxvd2VkIGFyZyBpcyBhIHN0cmluZyBjb250YWluaW5nIG9ubHkgdGFncyBpbiBsb3dlcmNhc2UgKDxhPjxiPjxjPilcclxuICAgIHZhciB0YWdzID0gLzxcXC8/KFthLXpdW2EtejAtOV0qKVxcYltePl0qPi9naSxcclxuICAgICAgICBjb21tZW50c0FuZFBocFRhZ3MgPSAvPCEtLVtcXHNcXFNdKj8tLT58PFxcPyg/OnBocCk/W1xcc1xcU10qP1xcPz4vZ2k7XHJcbiAgICByZXR1cm4gaW5wdXQucmVwbGFjZShjb21tZW50c0FuZFBocFRhZ3MsICcnKS5yZXBsYWNlKHRhZ3MsIGZ1bmN0aW9uKCQwLCAkMSkge1xyXG4gICAgICAgIHJldHVybiBhbGxvd2VkLmluZGV4T2YoJzwnICsgJDEudG9Mb3dlckNhc2UoKSArICc+JykgPiAtMSA/ICQwIDogJyc7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbmNvbnN0IF9zb3J0ID0gZnVuY3Rpb24obGFuZ0l0ZW0pIHtcclxuICAgIHJldHVybiBsYW5nSXRlbS5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcclxuICAgICAgICB2YXIgcmVzO1xyXG4gICAgICAgIGlmICgocmVzID0gYS5zdGFydCAtIGIuc3RhcnQpID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhLmVuZCAtIGIuZW5kO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG5jb25zdCBfbWVyZ2VNdWx0aUxhbmd1YWdlcyA9IGZ1bmN0aW9uKGFycikge1xyXG4gICAgdmFyIGNvbnRlbnQsIGRpY3QsIGksIGlkeCwga2V5LCBsYW5nLCByZXQsIHZhbCwgX2ksIF9sZW4sIF9yZWY7XHJcbiAgICBkaWN0ID0ge307XHJcbiAgICBpID0gYXJyLmxlbmd0aDtcclxuICAgIHJldCA9IFtdO1xyXG4gICAgZm9yIChpID0gX2kgPSAwLCBfbGVuID0gYXJyLmxlbmd0aDsgX2kgPCBfbGVuOyBpID0gKytfaSkge1xyXG4gICAgICAgIHZhbCA9IGFycltpXTtcclxuICAgICAgICBrZXkgPSB2YWwuc3RhcnRUaW1lICsgJywnICsgdmFsLmVuZFRpbWU7XHJcbiAgICAgICAgaWYgKChpZHggPSBkaWN0W2tleV0pICE9PSB2b2lkIDApIHtcclxuICAgICAgICAgICAgX3JlZiA9IHZhbC5sYW5ndWFnZXM7XHJcbiAgICAgICAgICAgIGZvciAobGFuZyBpbiBfcmVmKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gX3JlZltsYW5nXTtcclxuICAgICAgICAgICAgICAgIHJldFtpZHhdLmxhbmd1YWdlc1tsYW5nXSA9IGNvbnRlbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXQucHVzaCh2YWwpO1xyXG4gICAgICAgICAgICBkaWN0W2tleV0gPSByZXQubGVuZ3RoIC0gMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmV0O1xyXG59O1xyXG5cclxuY29uc3QgU21pUGFyc2VyID0gZnVuY3Rpb24oc2FtaSwgb3B0aW9ucykge1xyXG4gICAgdmFyIGRlZmluZWRMYW5ncywgZHVyYXRpb24sIGVycm9ycywgZ2V0RGVmaW5lZExhbmdzLCBnZXRMYW5ndWFnZSwga2V5LCBtYWtlRW5kVGltZSwgcGFyc2UsIHJlc3VsdCwgdmFsdWUsIF9yZWYsIGZpeGVkTGFuZztcclxuICAgIHBhcnNlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQsIGVycm9yLCBpbm5lclRleHQsIGlzQnJva2VuLCBpdGVtLCBsYW5nLCBsYW5nSXRlbSwgbGluZU51bSwgbmV4dFN0YXJ0VGFnSWR4LCByZXQsIHN0YXJ0VGFnSWR4LCBzdGFydFRpbWUsIHN0ciwgdGVtcFJldCwgX3JlZiwgX3JlZjEsIF9yZWYyO1xyXG4gICAgICAgIGVycm9yID0gZnVuY3Rpb24oZXJyb3IpIHtcclxuICAgICAgICAgICAgdmFyIGU7XHJcbiAgICAgICAgICAgIGUgPSBuZXcgRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICBlLmxpbmUgPSBsaW5lTnVtO1xyXG4gICAgICAgICAgICBlLmNvbnRleHQgPSBlbGVtZW50O1xyXG4gICAgICAgICAgICByZXR1cm4gZXJyb3JzLnB1c2goZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsaW5lTnVtID0gMTtcclxuICAgICAgICByZXQgPSBbXTtcclxuICAgICAgICB0ZW1wUmV0ID0ge307XHJcbiAgICAgICAgc3RyID0gc2FtaTtcclxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgICAgICBzdGFydFRhZ0lkeCA9IHN0ci5zZWFyY2goKTtcclxuICAgICAgICAgICAgaWYgKG5leHRTdGFydFRhZ0lkeCA8PSAwIHx8IHN0YXJ0VGFnSWR4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV4dFN0YXJ0VGFnSWR4ID0gc3RyLnNsaWNlKHN0YXJ0VGFnSWR4ICsgMSkuc2VhcmNoKHJlQ2xvc2VTeW5jKSArIDE7XHJcbiAgICAgICAgICAgIGlmIChuZXh0U3RhcnRUYWdJZHggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gc3RyLnNsaWNlKHN0YXJ0VGFnSWR4LCBzdGFydFRhZ0lkeCArIG5leHRTdGFydFRhZ0lkeCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gc3RyLnNsaWNlKHN0YXJ0VGFnSWR4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsaW5lTnVtICs9ICgoX3JlZiA9IHN0ci5zbGljZSgwLCBzdGFydFRhZ0lkeCkubWF0Y2gocmVMaW5lRW5kaW5nKSkgIT0gbnVsbCA/IF9yZWYubGVuZ3RoIDogdm9pZCAwKSB8fCAwO1xyXG4gICAgICAgICAgICBpZiAoaXNCcm9rZW4gPSByZUJyb2tlblRhZy50ZXN0KGVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICBlcnJvcignRVJST1JfQlJPS0VOX1RBR1MnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdHIgPSBzdHIuc2xpY2Uoc3RhcnRUYWdJZHggKyBuZXh0U3RhcnRUYWdJZHgpO1xyXG4gICAgICAgICAgICBzdGFydFRpbWUgPSArKChfcmVmMSA9IGVsZW1lbnQubWF0Y2gocmVTdGFydFRpbWUpKSAhPSBudWxsID8gcGFyc2VGbG9hdChfcmVmMVsxXS8xMDAwKSA6IHZvaWQgMCk7ICAvL0hTTEVFIG1zIC0+IHMg66GcIOuzgOqyvVxyXG4gICAgICAgICAgICBpZiAoc3RhcnRUaW1lID09PSBudWxsIHx8IHN0YXJ0VGltZSA8IDApIHtcclxuICAgICAgICAgICAgICAgIGVycm9yKCdFUlJPUl9JTlZBTElEX1RJTUUnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gV2UgZG9uJ3QgbmVlZCBjb21wbGV4IGxhbmd1YWdlLiBjdXMgU01JIGRvZW5zJ3Qgb2JleSB0aGUgcnVsZXMuLi5cclxuICAgICAgICAgICAgbGFuZyA9IGdldExhbmd1YWdlKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAvL2xhbmcgPSBcImtvXCI7XHJcbiAgICAgICAgICAgIGlmICghbGFuZykge1xyXG4gICAgICAgICAgICAgICAvLyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGVycm9yKCdFUlJPUl9JTlZBTElEX0xBTkdVQUdFJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGluZU51bSArPSAoKF9yZWYyID0gZWxlbWVudC5tYXRjaChyZUxpbmVFbmRpbmcpKSAhPSBudWxsID8gX3JlZjIubGVuZ3RoIDogdm9pZCAwKSB8fCAwO1xyXG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5yZXBsYWNlKHJlTGluZUVuZGluZywgJycpO1xyXG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5yZXBsYWNlKHJlQnIsIFwiXFxuXCIpO1xyXG4gICAgICAgICAgICBpbm5lclRleHQgPSBzdHJpcF90YWdzKGVsZW1lbnQpLnRyaW0oKTtcclxuXHJcbiAgICAgICAgICAgIC8vSFNMRUUgOiAyMDE4MDUzMCAtIOyasOumsCDrnq3quLDsp4Ag6rWs67aE7J20IO2VhOyalCDsl4bri6QuIOyeiOuKlOqxsCDqt7jrjIDroZwg67O07Jes7KSE67+QXHJcbiAgICAgICAgICAgIGl0ZW0gPSB7XHJcbiAgICAgICAgICAgICAgICBzdGFydDogc3RhcnRUaW1lLFxyXG4gICAgICAgICAgICAgICAgLy9sYW5ndWFnZXM6IHt9LFxyXG4gICAgICAgICAgICAgICAgdGV4dDogXCJcIixcclxuICAgICAgICAgICAgICAgIGNvbnRlbnRzOiBpbm5lclRleHRcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaWYgKGxhbmcpIHtcclxuICAgICAgICAgICAgICAgIC8vaXRlbS5sYW5ndWFnZXNbbGFuZ10gPSBpbm5lclRleHQ7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnRleHQgPSBpbm5lclRleHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGVtcFJldFtsYW5nXSB8fCAodGVtcFJldFtsYW5nXSA9IFtdKTtcclxuICAgICAgICAgICAgLy90ZW1wUmV0W2xhbmddLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgIGlmKGl0ZW0uc3RhcnQpe1xyXG4gICAgICAgICAgICAgICAgdGVtcFJldFtsYW5nXS5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9maXhlZCBieSBoc2xlZSAxOTAxMzBcclxuICAgICAgICAvL1NNSSB3YXMgZGVzaWduZWQgZm9yIG11bHRpIGxhbmd1YWdlLiBCdXQgZ2xvYmFsIHN0YW5kYXJkIChteSBndWVzcykgU1JULCBWVFQgZG9lc24ndCBzdXBwb3J0IG11bHRpIGxhbmd1YWdlLlxyXG4gICAgICAgIC8vVGhpcyB1cGRhdGUgaXMgaGFuZGxpbmcgaWYgU01JIGhhcyBtdWx0aXBsZSBsYW5ndWFnZXMuXHJcbiAgICAgICAgZml4ZWRMYW5nID0gZml4ZWRMYW5nIHx8IGdldEJyb3dzZXJMYW5ndWFnZSgpO1xyXG4gICAgICAgIGxldCBjb252ZXJ0ZWRMYW5ndWFnZU5hbWVzID0gT2JqZWN0LmtleXModGVtcFJldCk7XHJcblxyXG4gICAgICAgIGlmKGNvbnZlcnRlZExhbmd1YWdlTmFtZXMgJiYgY29udmVydGVkTGFuZ3VhZ2VOYW1lcy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgaWYoY29udmVydGVkTGFuZ3VhZ2VOYW1lcy5pbmRleE9mKGZpeGVkTGFuZykgPiAtMSl7XHJcbiAgICAgICAgICAgICAgICBsYW5nSXRlbSA9IHRlbXBSZXRbZml4ZWRMYW5nXTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBsYW5nSXRlbSA9IHRlbXBSZXRbY29udmVydGVkTGFuZ3VhZ2VOYW1lcy5maWx0ZXIoZnVuY3Rpb24obmFtZSl7cmV0dXJuIG5hbWUgIT09IFwidW5kZWZpbmVkXCJ9KVswXV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGFuZ0l0ZW0gPSBfc29ydChsYW5nSXRlbSk7XHJcbiAgICAgICAgICAgIGxhbmdJdGVtID0gbWFrZUVuZFRpbWUobGFuZ0l0ZW0pO1xyXG4gICAgICAgICAgICByZXQgPSByZXQuY29uY2F0KGxhbmdJdGVtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vcmV0ID0gX21lcmdlTXVsdGlMYW5ndWFnZXMocmV0KTtcclxuICAgICAgICByZXQgPSBfc29ydChyZXQpO1xyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9O1xyXG4gICAgZ2V0TGFuZ3VhZ2UgPSBmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICAgICAgdmFyIGNsYXNzTmFtZSwgbGFuZztcclxuICAgICAgICBpZighZWxlbWVudCl7cmV0dXJuIDt9XHJcbiAgICAgICAgZm9yIChjbGFzc05hbWUgaW4gZGVmaW5lZExhbmdzKSB7XHJcbiAgICAgICAgICAgIGxhbmcgPSBkZWZpbmVkTGFuZ3NbY2xhc3NOYW1lXTtcclxuICAgICAgICAgICAgaWYgKGxhbmcucmVDbGFzc05hbWUudGVzdChlbGVtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxhbmcubGFuZztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBnZXREZWZpbmVkTGFuZ3MgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgY2xhc3NOYW1lLCBkZWNsYXJhdGlvbiwgZSwgZXJyb3IsIGxhbmcsIG1hdGNoZWQsIHBhcnNlZCwgcnVsZSwgc2VsZWN0b3IsIF9pLCBfbGVuLCBfcmVmLCBfcmVmMSwgX3Jlc3VsdHM7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbWF0Y2hlZCA9ICgoX3JlZiA9IHNhbWkubWF0Y2gocmVTdHlsZSkpICE9IG51bGwgPyBfcmVmWzFdIDogdm9pZCAwKSB8fCAnJztcclxuICAgICAgICAgICAgbWF0Y2hlZCA9IG1hdGNoZWQucmVwbGFjZShyZUNvbW1lbnQsICcnKTtcclxuICAgICAgICAgICAgcGFyc2VkID0gY3NzUGFyc2UobWF0Y2hlZCk7XHJcbiAgICAgICAgICAgIF9yZWYxID0gcGFyc2VkLnN0eWxlc2hlZXQucnVsZXM7XHJcbiAgICAgICAgICAgIF9yZXN1bHRzID0gW107XHJcbiAgICAgICAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gX3JlZjEubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcclxuICAgICAgICAgICAgICAgIHJ1bGUgPSBfcmVmMVtfaV07XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RvciA9IHJ1bGUuc2VsZWN0b3JzWzBdO1xyXG4gICAgICAgICAgICAgICAgaWYgKChzZWxlY3RvciAhPSBudWxsID8gc2VsZWN0b3JbMF0gOiB2b2lkIDApID09PSAnLicpIHtcclxuICAgICAgICAgICAgICAgICAgICBfcmVzdWx0cy5wdXNoKChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9qLCBfbGVuMSwgX3JlZjIsIF9yZXN1bHRzMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3JlZjIgPSBydWxlLmRlY2xhcmF0aW9ucztcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3Jlc3VsdHMxID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoX2ogPSAwLCBfbGVuMSA9IF9yZWYyLmxlbmd0aDsgX2ogPCBfbGVuMTsgX2orKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVjbGFyYXRpb24gPSBfcmVmMltfal07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVjbGFyYXRpb24ucHJvcGVydHkudG9Mb3dlckNhc2UoKSA9PT0gJ2xhbmcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gc2VsZWN0b3Iuc2xpY2UoMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFuZyA9IGRlY2xhcmF0aW9uLnZhbHVlLnNsaWNlKDAsIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh+bGFuZ0NvZGVzLmluZGV4T2YobGFuZykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3Jlc3VsdHMxLnB1c2goZGVmaW5lZExhbmdzW2NsYXNzTmFtZV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYW5nOiBsYW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVDbGFzc05hbWU6IG5ldyBSZWdFeHAoXCJjbGFzc1tePV0qPz1bXFxcIidcXFNdKihcIiArIGNsYXNzTmFtZSArIFwiKVsnXFxcIlxcU10/XCIsICdpJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZXN1bHRzMS5wdXNoKHZvaWQgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZXN1bHRzMTtcclxuICAgICAgICAgICAgICAgICAgICB9KSgpKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3Jlc3VsdHMucHVzaCh2b2lkIDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBfcmVzdWx0cztcclxuICAgICAgICB9IGNhdGNoIChfZXJyb3IpIHtcclxuICAgICAgICAgICAgZSA9IF9lcnJvcjtcclxuICAgICAgICAgICAgZXJyb3JzLnB1c2goZXJyb3IgPSBuZXcgRXJyb3IoJ0VSUk9SX0lOVkFMSURfTEFOR1VBR0VfREVGSU5JVElPTicpKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgbWFrZUVuZFRpbWUgPSBmdW5jdGlvbihsYW5nSXRlbSkge1xyXG4gICAgICAgIHZhciBpLCBpdGVtLCBfcmVmO1xyXG4gICAgICAgIGkgPSBsYW5nSXRlbS5sZW5ndGg7XHJcbiAgICAgICAgd2hpbGUgKGktLSkge1xyXG4gICAgICAgICAgICBpdGVtID0gbGFuZ0l0ZW1baV07XHJcbiAgICAgICAgICAgIGlmICgoX3JlZiA9IGxhbmdJdGVtW2kgLSAxXSkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgLy9IU0xFRSA6IOydtOyZleydtOuptCBTUlQg7YyM7ISc7JmAIO2PrOunt+ydhCDrp57stpTsnpBcclxuICAgICAgICAgICAgICAgIF9yZWYuZW5kID0gaXRlbS5zdGFydDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIWl0ZW0uY29udGVudHMgfHwgaXRlbS5jb250ZW50cyA9PT0gJyZuYnNwOycpIHtcclxuICAgICAgICAgICAgICAgIGxhbmdJdGVtLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBsYW5nSXRlbVtpXS5jb250ZW50cztcclxuICAgICAgICAgICAgICAgIGlmICghaXRlbS5lbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmVuZCA9IGl0ZW0uc3RhcnQgKyBkdXJhdGlvbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbGFuZ0l0ZW07XHJcbiAgICB9O1xyXG4gICAgZXJyb3JzID0gW107XHJcbiAgICBkZWZpbmVkTGFuZ3MgPSB7XHJcbiAgICAgICAgS1JDQzoge1xyXG4gICAgICAgICAgICBsYW5nOiAna28nLFxyXG4gICAgICAgICAgICByZUNsYXNzTmFtZTogbmV3IFJlZ0V4cChcImNsYXNzW149XSo/PVtcXFwiJ1xcU10qKEtSQ0MpWydcXFwiXFxTXT9cIiwgJ2knKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgS09DQzoge1xyXG4gICAgICAgICAgICBsYW5nOiAna28nLFxyXG4gICAgICAgICAgICByZUNsYXNzTmFtZTogbmV3IFJlZ0V4cChcImNsYXNzW149XSo/PVtcXFwiJ1xcU10qKEtPQ0MpWydcXFwiXFxTXT9cIiwgJ2knKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgS1I6IHtcclxuICAgICAgICAgICAgbGFuZzogJ2tvJyxcclxuICAgICAgICAgICAgcmVDbGFzc05hbWU6IG5ldyBSZWdFeHAoXCJjbGFzc1tePV0qPz1bXFxcIidcXFNdKihLUilbJ1xcXCJcXFNdP1wiLCAnaScpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBFTkNDOiB7XHJcbiAgICAgICAgICAgIGxhbmc6ICdlbicsXHJcbiAgICAgICAgICAgIHJlQ2xhc3NOYW1lOiBuZXcgUmVnRXhwKFwiY2xhc3NbXj1dKj89W1xcXCInXFxTXSooRU5DQylbJ1xcXCJcXFNdP1wiLCAnaScpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBFR0NDOiB7XHJcbiAgICAgICAgICAgIGxhbmc6ICdlbicsXHJcbiAgICAgICAgICAgIHJlQ2xhc3NOYW1lOiBuZXcgUmVnRXhwKFwiY2xhc3NbXj1dKj89W1xcXCInXFxTXSooRUdDQylbJ1xcXCJcXFNdP1wiLCAnaScpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBFTjoge1xyXG4gICAgICAgICAgICBsYW5nOiAnZW4nLFxyXG4gICAgICAgICAgICByZUNsYXNzTmFtZTogbmV3IFJlZ0V4cChcImNsYXNzW149XSo/PVtcXFwiJ1xcU10qKEVOKVsnXFxcIlxcU10/XCIsICdpJylcclxuICAgICAgICB9LFxyXG4gICAgICAgIEpQQ0M6IHtcclxuICAgICAgICAgICAgbGFuZzogJ2phJyxcclxuICAgICAgICAgICAgcmVDbGFzc05hbWU6IG5ldyBSZWdFeHAoXCJjbGFzc1tePV0qPz1bXFxcIidcXFNdKihKUENDKVsnXFxcIlxcU10/XCIsICdpJylcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgaWYgKG9wdGlvbnMgIT0gbnVsbCA/IG9wdGlvbnMuZGVmaW5lZExhbmdzIDogdm9pZCAwKSB7XHJcbiAgICAgICAgX3JlZiA9IG9wdGlvbnMuZGVmaW5lZExhbmdzO1xyXG4gICAgICAgIGZvciAoa2V5IGluIF9yZWYpIHtcclxuICAgICAgICAgICAgdmFsdWUgPSBfcmVmW2tleV07XHJcbiAgICAgICAgICAgIGRlZmluZWRMYW5nc1trZXldID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZHVyYXRpb24gPSAob3B0aW9ucyAhPSBudWxsID8gb3B0aW9ucy5kdXJhdGlvbiA6IHZvaWQgMCkgfHwgMTA7IC8vSFNMRUUgbXMgLT4gcyDroZwg67OA6rK9XHJcbiAgICBmaXhlZExhbmcgPSBvcHRpb25zLmZpeGVkTGFuZztcclxuICAgIHNhbWkgPSBzYW1pLnRyaW0oKTtcclxuICAgIC8vZ2V0RGVmaW5lZExhbmdzKCk7XHJcbiAgICByZXN1bHQgPSBwYXJzZSgpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZXN1bHQ6IHJlc3VsdCxcclxuICAgICAgICBlcnJvcnM6IGVycm9yc1xyXG4gICAgfTtcclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBTbWlQYXJzZXI7Il0sInNvdXJjZVJvb3QiOiIifQ==