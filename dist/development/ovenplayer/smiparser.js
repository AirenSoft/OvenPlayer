/*! OvenPlayerv0.9.741 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2NhcHRpb24vcGFyc2VyL1NtaVBhcnNlci5qcyJdLCJuYW1lcyI6WyJsYW5nQ29kZXMiLCJyZU9wZW5TeW5jIiwicmVDbG9zZVN5bmMiLCJyZUxpbmVFbmRpbmciLCJyZUJyb2tlblRhZyIsInJlU3RhcnRUaW1lIiwicmVCciIsInJlU3R5bGUiLCJyZUNvbW1lbnQiLCJjbG9uZSIsIm9iaiIsImZsYWdzIiwia2V5IiwibmV3SW5zdGFuY2UiLCJEYXRlIiwiZ2V0VGltZSIsIlJlZ0V4cCIsImdsb2JhbCIsImlnbm9yZUNhc2UiLCJtdWx0aWxpbmUiLCJzdGlja3kiLCJzb3VyY2UiLCJjb25zdHJ1Y3RvciIsInN0cmlwX3RhZ3MiLCJpbnB1dCIsImFsbG93ZWQiLCJ0b0xvd2VyQ2FzZSIsIm1hdGNoIiwiam9pbiIsInRhZ3MiLCJjb21tZW50c0FuZFBocFRhZ3MiLCJyZXBsYWNlIiwiJDAiLCIkMSIsImluZGV4T2YiLCJfc29ydCIsImxhbmdJdGVtIiwic29ydCIsImEiLCJiIiwicmVzIiwic3RhcnQiLCJlbmQiLCJfbWVyZ2VNdWx0aUxhbmd1YWdlcyIsImFyciIsImNvbnRlbnQiLCJkaWN0IiwiaSIsImlkeCIsImxhbmciLCJyZXQiLCJ2YWwiLCJfaSIsIl9sZW4iLCJfcmVmIiwibGVuZ3RoIiwic3RhcnRUaW1lIiwiZW5kVGltZSIsImxhbmd1YWdlcyIsInB1c2giLCJTbWlQYXJzZXIiLCJzYW1pIiwib3B0aW9ucyIsImRlZmluZWRMYW5ncyIsImR1cmF0aW9uIiwiZXJyb3JzIiwiZ2V0RGVmaW5lZExhbmdzIiwiZ2V0TGFuZ3VhZ2UiLCJtYWtlRW5kVGltZSIsInBhcnNlIiwicmVzdWx0IiwidmFsdWUiLCJmaXhlZExhbmciLCJlbGVtZW50IiwiZXJyb3IiLCJpbm5lclRleHQiLCJpc0Jyb2tlbiIsIml0ZW0iLCJsaW5lTnVtIiwibmV4dFN0YXJ0VGFnSWR4Iiwic3RhcnRUYWdJZHgiLCJzdHIiLCJ0ZW1wUmV0IiwiX3JlZjEiLCJfcmVmMiIsImUiLCJFcnJvciIsImxpbmUiLCJjb250ZXh0Iiwic2VhcmNoIiwic2xpY2UiLCJ0ZXN0IiwicGFyc2VGbG9hdCIsInRyaW0iLCJ0ZXh0IiwiY29udGVudHMiLCJjb252ZXJ0ZWRMYW5ndWFnZU5hbWVzIiwiT2JqZWN0Iiwia2V5cyIsImZpbHRlciIsIm5hbWUiLCJjb25jYXQiLCJjbGFzc05hbWUiLCJyZUNsYXNzTmFtZSIsImRlY2xhcmF0aW9uIiwibWF0Y2hlZCIsInBhcnNlZCIsInJ1bGUiLCJzZWxlY3RvciIsIl9yZXN1bHRzIiwiY3NzUGFyc2UiLCJzdHlsZXNoZWV0IiwicnVsZXMiLCJzZWxlY3RvcnMiLCJfaiIsIl9sZW4xIiwiX3Jlc3VsdHMxIiwiZGVjbGFyYXRpb25zIiwicHJvcGVydHkiLCJfZXJyb3IiLCJzcGxpY2UiLCJLUkNDIiwiS09DQyIsIktSIiwiRU5DQyIsIkVHQ0MiLCJFTiIsIkpQQ0MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7O0FBU0EsSUFBTUEsWUFBWSxDQUFDLElBQUQsRUFBTSxJQUFOLEVBQVcsSUFBWCxFQUFpQixJQUFqQixFQUF1QixJQUF2QixFQUE2QixJQUE3QixFQUFtQyxJQUFuQyxFQUF5QyxJQUF6QyxFQUErQyxJQUEvQyxFQUFxRCxJQUFyRCxFQUEyRCxJQUEzRCxFQUFpRSxJQUFqRSxFQUF1RSxJQUF2RSxFQUE2RSxJQUE3RSxFQUFtRixJQUFuRixFQUF5RixJQUF6RixFQUErRixJQUEvRixFQUFxRyxJQUFyRyxFQUEyRyxJQUEzRyxFQUFpSCxJQUFqSCxFQUF1SCxJQUF2SCxFQUE2SCxJQUE3SCxFQUFrSSxJQUFsSSxFQUF1SSxJQUF2SSxFQUE0SSxJQUE1SSxFQUFpSixJQUFqSixFQUFzSixJQUF0SixFQUEySixJQUEzSixFQUFnSyxJQUFoSyxFQUFxSyxJQUFySyxFQUEwSyxJQUExSyxFQUErSyxJQUEvSyxFQUFvTCxJQUFwTCxFQUF5TCxJQUF6TCxFQUE4TCxJQUE5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akQ7QUFGWDtBQXpCSyxLQUFmO0FBOEJBLFFBQUk4QyxXQUFXLElBQVgsR0FBa0JBLFFBQVFDLFlBQTFCLEdBQXlDLEtBQUssQ0FBbEQsRUFBcUQ7QUFDakRULGVBQU9RLFFBQVFDLFlBQWY7QUFDQSxhQUFLbkQsR0FBTCxJQUFZMEMsSUFBWixFQUFrQjtBQUNkaUIsb0JBQVFqQixLQUFLMUMsR0FBTCxDQUFSO0FBQ0FtRCx5QkFBYW5ELEdBQWIsSUFBb0IyRCxLQUFwQjtBQUNIO0FBQ0o7QUFDRFAsZUFBVyxDQUFDRixXQUFXLElBQVgsR0FBa0JBLFFBQVFFLFFBQTFCLEdBQXFDLEtBQUssQ0FBM0MsS0FBaUQsRUFBNUQsQ0F6TXNDLENBeU0wQjtBQUNoRVEsZ0JBQVlWLFFBQVFVLFNBQXBCO0FBQ0FYLFdBQU9BLEtBQUtnQyxJQUFMLEVBQVA7QUFDQTtBQUNBdkIsYUFBU0QsT0FBVDtBQUNBLFdBQU87QUFDSEMsZ0JBQVFBLE1BREw7QUFFSEwsZ0JBQVFBO0FBRkwsS0FBUDtBQUlILENBbE5EOztxQkFxTmVMLFMiLCJmaWxlIjoic21pcGFyc2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtnZXRCcm93c2VyTGFuZ3VhZ2V9IGZyb20gXCJ1dGlscy9icm93c2VyXCI7XG4vKlxuICogIHNhbWktcGFyc2VyXG4gKiAgVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4gKlxuICogIENvcHlyaWdodCAoYykgMjAxMyBDb25zdGFudGluZSBLaW0gPGVsZWdhbnRjb2RlckBnbWFpbC5jb20+XG4gKiAgaHR0cHM6Ly9naXRodWIuY29tL2VsZWdhbnRjb2Rlci9zYW1pLXBhcnNlclxuICpcbiAqL1xuXG5jb25zdCBsYW5nQ29kZXMgPSBbXCJhYlwiLFwiYWFcIixcImFmXCIsIFwiYWtcIiwgXCJzcVwiLCBcImFtXCIsIFwiYXJcIiwgXCJhblwiLCBcImh5XCIsIFwiYXNcIiwgXCJhdlwiLCBcImFlXCIsIFwiYXlcIiwgXCJhelwiLCBcImJtXCIsIFwiYmFcIiwgXCJldVwiLCBcImJlXCIsIFwiYm5cIiwgXCJiaFwiLCBcImJpXCIsIFwibmJcIixcImJzXCIsXCJiclwiLFwiYmdcIixcIm15XCIsXCJlc1wiLFwiY2FcIixcImttXCIsXCJjaFwiLFwiY2VcIixcIm55XCIsXCJueVwiLFwiemhcIixcInphXCIsXCJjdVwiLFwiY3VcIixcImN2XCIsXCJrd1wiLFxuICAgIFwiY29cIixcImNyXCIsXCJoclwiLFwiY3NcIixcImRhXCIsXCJkdlwiLFwiZHZcIixcIm5sXCIsXCJkelwiLFwiZW5cIixcImVvXCIsXCJldFwiLFwiZWVcIixcImZvXCIsXCJmalwiLFwiZmlcIixcIm5sXCIsXCJmclwiLFwiZmZcIixcImdkXCIsXCJnbFwiLFwibGdcIixcImthXCIsXCJkZVwiLFwia2lcIixcImVsXCIsXCJrbFwiLFwiZ25cIixcImd1XCIsXCJodFwiLFwiaHRcIixcImhhXCIsXCJoZVwiLFwiaHpcIixcImhpXCIsXCJob1wiLFwiaHVcIixcImlzXCIsXCJpb1wiLFwiaWdcIixcImlkXCIsXCJpYVwiLFwiaWVcIixcIml1XCIsXCJpa1wiLFwiZ2FcIixcbiAgICBcIml0XCIsXCJqYVwiLFwianZcIixcImtsXCIsXCJrblwiLFwia3JcIixcImtzXCIsXCJra1wiLFwia2lcIixcInJ3XCIsXCJreVwiLFwia3ZcIixcImtnXCIsXCJrb1wiLFwia2pcIixcImt1XCIsXCJralwiLFwia3lcIixcImxvXCIsXCJsYVwiLFwibHZcIixcImxiXCIsXCJsaVwiLFwibGlcIixcImxpXCIsXCJsblwiLFwibHRcIixcImx1XCIsXCJsYlwiLFwibWtcIixcIm1nXCIsXCJtc1wiLFwibWxcIixcImR2XCIsXCJtdFwiLFwiZ3ZcIixcIm1pXCIsXCJtclwiLFwibWhcIixcInJvXCIsXCJyb1wiLFwibW5cIixcIm5hXCIsXCJudlwiLFwibnZcIixcIm5kXCIsXG4gICAgXCJuclwiLFwibmdcIixcIm5lXCIsXCJuZFwiLFwic2VcIixcIm5vXCIsXCJuYlwiLFwibm5cIixcImlpXCIsXCJueVwiLFwibm5cIixcImllXCIsXCJvY1wiLFwib2pcIixcImN1XCIsXCJjdVwiLFwiY3VcIixcIm9yXCIsXCJvbVwiLFwib3NcIixcIm9zXCIsXCJwaVwiLFwicGFcIixcInBzXCIsXCJmYVwiLFwicGxcIixcInB0XCIsXCJwYVwiLFwicHNcIixcInF1XCIsXCJyb1wiLFwicm1cIixcInJuXCIsXCJydVwiLFwic21cIixcInNnXCIsXCJzYVwiLFwic2NcIixcImdkXCIsXCJzclwiLFwic25cIixcImlpXCIsXCJzZFwiLFwic2lcIixcInNpXCIsXCJza1wiLFxuICAgIFwic2xcIixcInNvXCIsXCJzdFwiLFwibnJcIixcImVzXCIsXCJzdVwiLFwic3dcIixcInNzXCIsXCJzdlwiLFwidGxcIixcInR5XCIsXCJ0Z1wiLFwidGFcIixcInR0XCIsXCJ0ZVwiLFwidGhcIixcImJvXCIsXCJ0aVwiLFwidG9cIixcInRzXCIsXCJ0blwiLFwidHJcIixcInRrXCIsXCJ0d1wiLFwidWdcIixcInVrXCIsXCJ1clwiLFwidWdcIixcInV6XCIsXCJjYVwiLFwidmVcIixcInZpXCIsXCJ2b1wiLFwid2FcIixcImN5XCIsXCJmeVwiLFwid29cIixcInhoXCIsXCJ5aVwiLFwieW9cIixcInphXCIsXCJ6dVwiXTtcblxuY29uc3QgcmVPcGVuU3luYyA9IC88c3luYy9pO1xuXG5jb25zdCByZUNsb3NlU3luYyA9IC88c3luY3w8XFwvYm9keXw8XFwvc2FtaS9pO1xuXG5jb25zdCByZUxpbmVFbmRpbmcgPSAvXFxyXFxuP3xcXG4vZztcblxuY29uc3QgcmVCcm9rZW5UYWcgPSAvPFthLXpdKltePl0qPFthLXpdKi9nO1xuXG5jb25zdCByZVN0YXJ0VGltZSA9IC88c3luY1tePl0rP3N0YXJ0W149XSo9W14wLTldKihbMC05XSopW1wiXjAtOVwiXSovaTtcblxuY29uc3QgcmVCciA9IC88YnJbXj5dKj4vaWc7XG5cbmNvbnN0IHJlU3R5bGUgPSAvPHN0eWxlW14+XSo+KFtcXHNcXFNdKj8pPFxcL3N0eWxlW14+XSo+L2k7XG5cbmNvbnN0IHJlQ29tbWVudCA9IC8oPCEtLXwtLT4pL2c7XG5cbmNvbnN0IGNsb25lID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIGZsYWdzLCBrZXksIG5ld0luc3RhbmNlO1xuICAgIGlmICgob2JqID09IG51bGwpIHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICAgIGlmIChvYmogaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZShvYmouZ2V0VGltZSgpKTtcbiAgICB9XG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICBmbGFncyA9ICcnO1xuICAgICAgICBpZiAob2JqLmdsb2JhbCAhPSBudWxsKSB7XG4gICAgICAgICAgICBmbGFncyArPSAnZyc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9iai5pZ25vcmVDYXNlICE9IG51bGwpIHtcbiAgICAgICAgICAgIGZsYWdzICs9ICdpJztcbiAgICAgICAgfVxuICAgICAgICBpZiAob2JqLm11bHRpbGluZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBmbGFncyArPSAnbSc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9iai5zdGlja3kgIT0gbnVsbCkge1xuICAgICAgICAgICAgZmxhZ3MgKz0gJ3knO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKG9iai5zb3VyY2UsIGZsYWdzKTtcbiAgICB9XG4gICAgbmV3SW5zdGFuY2UgPSBuZXcgb2JqLmNvbnN0cnVjdG9yKCk7XG4gICAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgICAgIG5ld0luc3RhbmNlW2tleV0gPSBjbG9uZShvYmpba2V5XSk7XG4gICAgfVxuICAgIHJldHVybiBuZXdJbnN0YW5jZTtcbn07XG5cbmNvbnN0IHN0cmlwX3RhZ3MgPSBmdW5jdGlvbiAoaW5wdXQsIGFsbG93ZWQpIHtcbiAgICAvLyBodHRwOi8va2V2aW4udmFuem9ubmV2ZWxkLm5ldFxuICAgIC8vICsgICBvcmlnaW5hbCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cDovL2tldmluLnZhbnpvbm5ldmVsZC5uZXQpXG4gICAgLy8gKyAgIGltcHJvdmVkIGJ5OiBMdWtlIEdvZGZyZXlcbiAgICAvLyArICAgICAgaW5wdXQgYnk6IFB1bFxuICAgIC8vICsgICBidWdmaXhlZCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cDovL2tldmluLnZhbnpvbm5ldmVsZC5uZXQpXG4gICAgLy8gKyAgIGJ1Z2ZpeGVkIGJ5OiBPbm5vIE1hcnNtYW5cbiAgICAvLyArICAgICAgaW5wdXQgYnk6IEFsZXhcbiAgICAvLyArICAgYnVnZml4ZWQgYnk6IEtldmluIHZhbiBab25uZXZlbGQgKGh0dHA6Ly9rZXZpbi52YW56b25uZXZlbGQubmV0KVxuICAgIC8vICsgICAgICBpbnB1dCBieTogTWFyYyBQYWxhdVxuICAgIC8vICsgICBpbXByb3ZlZCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cDovL2tldmluLnZhbnpvbm5ldmVsZC5uZXQpXG4gICAgLy8gKyAgICAgIGlucHV0IGJ5OiBCcmV0dCBaYW1pciAoaHR0cDovL2JyZXR0LXphbWlyLm1lKVxuICAgIC8vICsgICBidWdmaXhlZCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cDovL2tldmluLnZhbnpvbm5ldmVsZC5uZXQpXG4gICAgLy8gKyAgIGJ1Z2ZpeGVkIGJ5OiBFcmljIE5hZ2VsXG4gICAgLy8gKyAgICAgIGlucHV0IGJ5OiBCb2JieSBEcmFrZVxuICAgIC8vICsgICBidWdmaXhlZCBieTogS2V2aW4gdmFuIFpvbm5ldmVsZCAoaHR0cDovL2tldmluLnZhbnpvbm5ldmVsZC5uZXQpXG4gICAgLy8gKyAgIGJ1Z2ZpeGVkIGJ5OiBUb21hc3ogV2Vzb2xvd3NraVxuICAgIC8vICsgICAgICBpbnB1dCBieTogRXZlcnRqYW4gR2FycmV0c2VuXG4gICAgLy8gKyAgICByZXZpc2VkIGJ5OiBSYWZhxYIgS3VrYXdza2kgKGh0dHA6Ly9ibG9nLmt1a2F3c2tpLnBsLylcbiAgICAvLyAqICAgICBleGFtcGxlIDE6IHN0cmlwX3RhZ3MoJzxwPktldmluPC9wPiA8YnIgLz48Yj52YW48L2I+IDxpPlpvbm5ldmVsZDwvaT4nLCAnPGk+PGI+Jyk7XG4gICAgLy8gKiAgICAgcmV0dXJucyAxOiAnS2V2aW4gPGI+dmFuPC9iPiA8aT5ab25uZXZlbGQ8L2k+J1xuICAgIC8vICogICAgIGV4YW1wbGUgMjogc3RyaXBfdGFncygnPHA+S2V2aW4gPGltZyBzcmM9XCJzb21laW1hZ2UucG5nXCIgb25tb3VzZW92ZXI9XCJzb21lRnVuY3Rpb24oKVwiPnZhbiA8aT5ab25uZXZlbGQ8L2k+PC9wPicsICc8cD4nKTtcbiAgICAvLyAqICAgICByZXR1cm5zIDI6ICc8cD5LZXZpbiB2YW4gWm9ubmV2ZWxkPC9wPidcbiAgICAvLyAqICAgICBleGFtcGxlIDM6IHN0cmlwX3RhZ3MoXCI8YSBocmVmPSdodHRwOi8va2V2aW4udmFuem9ubmV2ZWxkLm5ldCc+S2V2aW4gdmFuIFpvbm5ldmVsZDwvYT5cIiwgXCI8YT5cIik7XG4gICAgLy8gKiAgICAgcmV0dXJucyAzOiAnPGEgaHJlZj0naHR0cDovL2tldmluLnZhbnpvbm5ldmVsZC5uZXQnPktldmluIHZhbiBab25uZXZlbGQ8L2E+J1xuICAgIC8vICogICAgIGV4YW1wbGUgNDogc3RyaXBfdGFncygnMSA8IDUgNSA+IDEnKTtcbiAgICAvLyAqICAgICByZXR1cm5zIDQ6ICcxIDwgNSA1ID4gMSdcbiAgICAvLyAqICAgICBleGFtcGxlIDU6IHN0cmlwX3RhZ3MoJzEgPGJyLz4gMScpO1xuICAgIC8vICogICAgIHJldHVybnMgNTogJzEgIDEnXG4gICAgLy8gKiAgICAgZXhhbXBsZSA2OiBzdHJpcF90YWdzKCcxIDxici8+IDEnLCAnPGJyPicpO1xuICAgIC8vICogICAgIHJldHVybnMgNjogJzEgIDEnXG4gICAgLy8gKiAgICAgZXhhbXBsZSA3OiBzdHJpcF90YWdzKCcxIDxici8+IDEnLCAnPGJyPjxici8+Jyk7XG4gICAgLy8gKiAgICAgcmV0dXJucyA3OiAnMSA8YnIvPiAxJ1xuICAgIGFsbG93ZWQgPSAoKChhbGxvd2VkIHx8IFwiXCIpICsgXCJcIikudG9Mb3dlckNhc2UoKS5tYXRjaCgvPFthLXpdW2EtejAtOV0qPi9nKSB8fCBbXSkuam9pbignJyk7IC8vIG1ha2luZyBzdXJlIHRoZSBhbGxvd2VkIGFyZyBpcyBhIHN0cmluZyBjb250YWluaW5nIG9ubHkgdGFncyBpbiBsb3dlcmNhc2UgKDxhPjxiPjxjPilcbiAgICB2YXIgdGFncyA9IC88XFwvPyhbYS16XVthLXowLTldKilcXGJbXj5dKj4vZ2ksXG4gICAgICAgIGNvbW1lbnRzQW5kUGhwVGFncyA9IC88IS0tW1xcc1xcU10qPy0tPnw8XFw/KD86cGhwKT9bXFxzXFxTXSo/XFw/Pi9naTtcbiAgICByZXR1cm4gaW5wdXQucmVwbGFjZShjb21tZW50c0FuZFBocFRhZ3MsICcnKS5yZXBsYWNlKHRhZ3MsIGZ1bmN0aW9uKCQwLCAkMSkge1xuICAgICAgICByZXR1cm4gYWxsb3dlZC5pbmRleE9mKCc8JyArICQxLnRvTG93ZXJDYXNlKCkgKyAnPicpID4gLTEgPyAkMCA6ICcnO1xuICAgIH0pO1xufTtcblxuY29uc3QgX3NvcnQgPSBmdW5jdGlvbihsYW5nSXRlbSkge1xuICAgIHJldHVybiBsYW5nSXRlbS5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgdmFyIHJlcztcbiAgICAgICAgaWYgKChyZXMgPSBhLnN0YXJ0IC0gYi5zdGFydCkgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBhLmVuZCAtIGIuZW5kO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuY29uc3QgX21lcmdlTXVsdGlMYW5ndWFnZXMgPSBmdW5jdGlvbihhcnIpIHtcbiAgICB2YXIgY29udGVudCwgZGljdCwgaSwgaWR4LCBrZXksIGxhbmcsIHJldCwgdmFsLCBfaSwgX2xlbiwgX3JlZjtcbiAgICBkaWN0ID0ge307XG4gICAgaSA9IGFyci5sZW5ndGg7XG4gICAgcmV0ID0gW107XG4gICAgZm9yIChpID0gX2kgPSAwLCBfbGVuID0gYXJyLmxlbmd0aDsgX2kgPCBfbGVuOyBpID0gKytfaSkge1xuICAgICAgICB2YWwgPSBhcnJbaV07XG4gICAgICAgIGtleSA9IHZhbC5zdGFydFRpbWUgKyAnLCcgKyB2YWwuZW5kVGltZTtcbiAgICAgICAgaWYgKChpZHggPSBkaWN0W2tleV0pICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgIF9yZWYgPSB2YWwubGFuZ3VhZ2VzO1xuICAgICAgICAgICAgZm9yIChsYW5nIGluIF9yZWYpIHtcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gX3JlZltsYW5nXTtcbiAgICAgICAgICAgICAgICByZXRbaWR4XS5sYW5ndWFnZXNbbGFuZ10gPSBjb250ZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0LnB1c2godmFsKTtcbiAgICAgICAgICAgIGRpY3Rba2V5XSA9IHJldC5sZW5ndGggLSAxO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG59O1xuXG5jb25zdCBTbWlQYXJzZXIgPSBmdW5jdGlvbihzYW1pLCBvcHRpb25zKSB7XG4gICAgdmFyIGRlZmluZWRMYW5ncywgZHVyYXRpb24sIGVycm9ycywgZ2V0RGVmaW5lZExhbmdzLCBnZXRMYW5ndWFnZSwga2V5LCBtYWtlRW5kVGltZSwgcGFyc2UsIHJlc3VsdCwgdmFsdWUsIF9yZWYsIGZpeGVkTGFuZztcbiAgICBwYXJzZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZWxlbWVudCwgZXJyb3IsIGlubmVyVGV4dCwgaXNCcm9rZW4sIGl0ZW0sIGxhbmcsIGxhbmdJdGVtLCBsaW5lTnVtLCBuZXh0U3RhcnRUYWdJZHgsIHJldCwgc3RhcnRUYWdJZHgsIHN0YXJ0VGltZSwgc3RyLCB0ZW1wUmV0LCBfcmVmLCBfcmVmMSwgX3JlZjI7XG4gICAgICAgIGVycm9yID0gZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgIHZhciBlO1xuICAgICAgICAgICAgZSA9IG5ldyBFcnJvcihlcnJvcik7XG4gICAgICAgICAgICBlLmxpbmUgPSBsaW5lTnVtO1xuICAgICAgICAgICAgZS5jb250ZXh0ID0gZWxlbWVudDtcbiAgICAgICAgICAgIHJldHVybiBlcnJvcnMucHVzaChlKTtcbiAgICAgICAgfTtcbiAgICAgICAgbGluZU51bSA9IDE7XG4gICAgICAgIHJldCA9IFtdO1xuICAgICAgICB0ZW1wUmV0ID0ge307XG4gICAgICAgIHN0ciA9IHNhbWk7XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICBzdGFydFRhZ0lkeCA9IHN0ci5zZWFyY2goKTtcbiAgICAgICAgICAgIGlmIChuZXh0U3RhcnRUYWdJZHggPD0gMCB8fCBzdGFydFRhZ0lkeCA8IDApIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5leHRTdGFydFRhZ0lkeCA9IHN0ci5zbGljZShzdGFydFRhZ0lkeCArIDEpLnNlYXJjaChyZUNsb3NlU3luYykgKyAxO1xuICAgICAgICAgICAgaWYgKG5leHRTdGFydFRhZ0lkeCA+IDApIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gc3RyLnNsaWNlKHN0YXJ0VGFnSWR4LCBzdGFydFRhZ0lkeCArIG5leHRTdGFydFRhZ0lkeCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBzdHIuc2xpY2Uoc3RhcnRUYWdJZHgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGluZU51bSArPSAoKF9yZWYgPSBzdHIuc2xpY2UoMCwgc3RhcnRUYWdJZHgpLm1hdGNoKHJlTGluZUVuZGluZykpICE9IG51bGwgPyBfcmVmLmxlbmd0aCA6IHZvaWQgMCkgfHwgMDtcbiAgICAgICAgICAgIGlmIChpc0Jyb2tlbiA9IHJlQnJva2VuVGFnLnRlc3QoZWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICBlcnJvcignRVJST1JfQlJPS0VOX1RBR1MnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0ciA9IHN0ci5zbGljZShzdGFydFRhZ0lkeCArIG5leHRTdGFydFRhZ0lkeCk7XG4gICAgICAgICAgICBzdGFydFRpbWUgPSArKChfcmVmMSA9IGVsZW1lbnQubWF0Y2gocmVTdGFydFRpbWUpKSAhPSBudWxsID8gcGFyc2VGbG9hdChfcmVmMVsxXS8xMDAwKSA6IHZvaWQgMCk7ICAvL0hTTEVFIG1zIC0+IHMg66GcIOuzgOqyvVxuICAgICAgICAgICAgaWYgKHN0YXJ0VGltZSA9PT0gbnVsbCB8fCBzdGFydFRpbWUgPCAwKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IoJ0VSUk9SX0lOVkFMSURfVElNRScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBXZSBkb24ndCBuZWVkIGNvbXBsZXggbGFuZ3VhZ2UuIGN1cyBTTUkgZG9lbnMndCBvYmV5IHRoZSBydWxlcy4uLlxuICAgICAgICAgICAgbGFuZyA9IGdldExhbmd1YWdlKGVsZW1lbnQpO1xuICAgICAgICAgICAgLy9sYW5nID0gXCJrb1wiO1xuICAgICAgICAgICAgaWYgKCFsYW5nKSB7XG4gICAgICAgICAgICAgICAvLyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBlcnJvcignRVJST1JfSU5WQUxJRF9MQU5HVUFHRScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGluZU51bSArPSAoKF9yZWYyID0gZWxlbWVudC5tYXRjaChyZUxpbmVFbmRpbmcpKSAhPSBudWxsID8gX3JlZjIubGVuZ3RoIDogdm9pZCAwKSB8fCAwO1xuICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucmVwbGFjZShyZUxpbmVFbmRpbmcsICcnKTtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LnJlcGxhY2UocmVCciwgXCJcXG5cIik7XG4gICAgICAgICAgICBpbm5lclRleHQgPSBzdHJpcF90YWdzKGVsZW1lbnQpLnRyaW0oKTtcblxuICAgICAgICAgICAgLy9IU0xFRSA6IDIwMTgwNTMwIC0g7Jqw66awIOuereq4sOyngCDqtazrtoTsnbQg7ZWE7JqUIOyXhuuLpC4g7J6I64qU6rGwIOq3uOuMgOuhnCDrs7Tsl6zspITrv5BcbiAgICAgICAgICAgIGl0ZW0gPSB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0VGltZSxcbiAgICAgICAgICAgICAgICAvL2xhbmd1YWdlczoge30sXG4gICAgICAgICAgICAgICAgdGV4dDogXCJcIixcbiAgICAgICAgICAgICAgICBjb250ZW50czogaW5uZXJUZXh0XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKGxhbmcpIHtcbiAgICAgICAgICAgICAgICAvL2l0ZW0ubGFuZ3VhZ2VzW2xhbmddID0gaW5uZXJUZXh0O1xuICAgICAgICAgICAgICAgIGl0ZW0udGV4dCA9IGlubmVyVGV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRlbXBSZXRbbGFuZ10gfHwgKHRlbXBSZXRbbGFuZ10gPSBbXSk7XG4gICAgICAgICAgICAvL3RlbXBSZXRbbGFuZ10ucHVzaChpdGVtKTtcbiAgICAgICAgICAgIGlmKGl0ZW0uc3RhcnQpe1xuICAgICAgICAgICAgICAgIHRlbXBSZXRbbGFuZ10ucHVzaChpdGVtKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgLy9maXhlZCBieSBoc2xlZSAxOTAxMzBcbiAgICAgICAgLy9TTUkgd2FzIGRlc2lnbmVkIGZvciBtdWx0aSBsYW5ndWFnZS4gQnV0IGdsb2JhbCBzdGFuZGFyZCAobXkgZ3Vlc3MpIFNSVCwgVlRUIGRvZXNuJ3Qgc3VwcG9ydCBtdWx0aSBsYW5ndWFnZS5cbiAgICAgICAgLy9UaGlzIHVwZGF0ZSBpcyBoYW5kbGluZyBpZiBTTUkgaGFzIG11bHRpcGxlIGxhbmd1YWdlcy5cbiAgICAgICAgZml4ZWRMYW5nID0gZml4ZWRMYW5nIHx8IGdldEJyb3dzZXJMYW5ndWFnZSgpO1xuICAgICAgICBsZXQgY29udmVydGVkTGFuZ3VhZ2VOYW1lcyA9IE9iamVjdC5rZXlzKHRlbXBSZXQpO1xuXG4gICAgICAgIGlmKGNvbnZlcnRlZExhbmd1YWdlTmFtZXMgJiYgY29udmVydGVkTGFuZ3VhZ2VOYW1lcy5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIGlmKGNvbnZlcnRlZExhbmd1YWdlTmFtZXMuaW5kZXhPZihmaXhlZExhbmcpID4gLTEpe1xuICAgICAgICAgICAgICAgIGxhbmdJdGVtID0gdGVtcFJldFtmaXhlZExhbmddO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgbGFuZ0l0ZW0gPSB0ZW1wUmV0W2NvbnZlcnRlZExhbmd1YWdlTmFtZXMuZmlsdGVyKGZ1bmN0aW9uKG5hbWUpe3JldHVybiBuYW1lICE9PSBcInVuZGVmaW5lZFwifSlbMF1dO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGFuZ0l0ZW0gPSBfc29ydChsYW5nSXRlbSk7XG4gICAgICAgICAgICBsYW5nSXRlbSA9IG1ha2VFbmRUaW1lKGxhbmdJdGVtKTtcbiAgICAgICAgICAgIHJldCA9IHJldC5jb25jYXQobGFuZ0l0ZW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9yZXQgPSBfbWVyZ2VNdWx0aUxhbmd1YWdlcyhyZXQpO1xuICAgICAgICByZXQgPSBfc29ydChyZXQpO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH07XG4gICAgZ2V0TGFuZ3VhZ2UgPSBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgIHZhciBjbGFzc05hbWUsIGxhbmc7XG4gICAgICAgIGlmKCFlbGVtZW50KXtyZXR1cm4gO31cbiAgICAgICAgZm9yIChjbGFzc05hbWUgaW4gZGVmaW5lZExhbmdzKSB7XG4gICAgICAgICAgICBsYW5nID0gZGVmaW5lZExhbmdzW2NsYXNzTmFtZV07XG4gICAgICAgICAgICBpZiAobGFuZy5yZUNsYXNzTmFtZS50ZXN0KGVsZW1lbnQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxhbmcubGFuZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgZ2V0RGVmaW5lZExhbmdzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjbGFzc05hbWUsIGRlY2xhcmF0aW9uLCBlLCBlcnJvciwgbGFuZywgbWF0Y2hlZCwgcGFyc2VkLCBydWxlLCBzZWxlY3RvciwgX2ksIF9sZW4sIF9yZWYsIF9yZWYxLCBfcmVzdWx0cztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG1hdGNoZWQgPSAoKF9yZWYgPSBzYW1pLm1hdGNoKHJlU3R5bGUpKSAhPSBudWxsID8gX3JlZlsxXSA6IHZvaWQgMCkgfHwgJyc7XG4gICAgICAgICAgICBtYXRjaGVkID0gbWF0Y2hlZC5yZXBsYWNlKHJlQ29tbWVudCwgJycpO1xuICAgICAgICAgICAgcGFyc2VkID0gY3NzUGFyc2UobWF0Y2hlZCk7XG4gICAgICAgICAgICBfcmVmMSA9IHBhcnNlZC5zdHlsZXNoZWV0LnJ1bGVzO1xuICAgICAgICAgICAgX3Jlc3VsdHMgPSBbXTtcbiAgICAgICAgICAgIGZvciAoX2kgPSAwLCBfbGVuID0gX3JlZjEubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgICAgICAgICBydWxlID0gX3JlZjFbX2ldO1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yID0gcnVsZS5zZWxlY3RvcnNbMF07XG4gICAgICAgICAgICAgICAgaWYgKChzZWxlY3RvciAhPSBudWxsID8gc2VsZWN0b3JbMF0gOiB2b2lkIDApID09PSAnLicpIHtcbiAgICAgICAgICAgICAgICAgICAgX3Jlc3VsdHMucHVzaCgoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2osIF9sZW4xLCBfcmVmMiwgX3Jlc3VsdHMxO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3JlZjIgPSBydWxlLmRlY2xhcmF0aW9ucztcbiAgICAgICAgICAgICAgICAgICAgICAgIF9yZXN1bHRzMSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChfaiA9IDAsIF9sZW4xID0gX3JlZjIubGVuZ3RoOyBfaiA8IF9sZW4xOyBfaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVjbGFyYXRpb24gPSBfcmVmMltfal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlY2xhcmF0aW9uLnByb3BlcnR5LnRvTG93ZXJDYXNlKCkgPT09ICdsYW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSBzZWxlY3Rvci5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFuZyA9IGRlY2xhcmF0aW9uLnZhbHVlLnNsaWNlKDAsIDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAofmxhbmdDb2Rlcy5pbmRleE9mKGxhbmcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVzdWx0czEucHVzaChkZWZpbmVkTGFuZ3NbY2xhc3NOYW1lXSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYW5nOiBsYW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlQ2xhc3NOYW1lOiBuZXcgUmVnRXhwKFwiY2xhc3NbXj1dKj89W1xcXCInXFxTXSooXCIgKyBjbGFzc05hbWUgKyBcIilbJ1xcXCJcXFNdP1wiLCAnaScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IEVycm9yKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVzdWx0czEucHVzaCh2b2lkIDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfcmVzdWx0czE7XG4gICAgICAgICAgICAgICAgICAgIH0pKCkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIF9yZXN1bHRzLnB1c2godm9pZCAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gX3Jlc3VsdHM7XG4gICAgICAgIH0gY2F0Y2ggKF9lcnJvcikge1xuICAgICAgICAgICAgZSA9IF9lcnJvcjtcbiAgICAgICAgICAgIGVycm9ycy5wdXNoKGVycm9yID0gbmV3IEVycm9yKCdFUlJPUl9JTlZBTElEX0xBTkdVQUdFX0RFRklOSVRJT04nKSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIG1ha2VFbmRUaW1lID0gZnVuY3Rpb24obGFuZ0l0ZW0pIHtcbiAgICAgICAgdmFyIGksIGl0ZW0sIF9yZWY7XG4gICAgICAgIGkgPSBsYW5nSXRlbS5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgIGl0ZW0gPSBsYW5nSXRlbVtpXTtcbiAgICAgICAgICAgIGlmICgoX3JlZiA9IGxhbmdJdGVtW2kgLSAxXSkgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIC8vSFNMRUUgOiDsnbTsmZXsnbTrqbQgU1JUIO2MjOyEnOyZgCDtj6zrp7fsnYQg66ee7LaU7J6QXG4gICAgICAgICAgICAgICAgX3JlZi5lbmQgPSBpdGVtLnN0YXJ0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFpdGVtLmNvbnRlbnRzIHx8IGl0ZW0uY29udGVudHMgPT09ICcmbmJzcDsnKSB7XG4gICAgICAgICAgICAgICAgbGFuZ0l0ZW0uc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgbGFuZ0l0ZW1baV0uY29udGVudHM7XG4gICAgICAgICAgICAgICAgaWYgKCFpdGVtLmVuZCkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmVuZCA9IGl0ZW0uc3RhcnQgKyBkdXJhdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxhbmdJdGVtO1xuICAgIH07XG4gICAgZXJyb3JzID0gW107XG4gICAgZGVmaW5lZExhbmdzID0ge1xuICAgICAgICBLUkNDOiB7XG4gICAgICAgICAgICBsYW5nOiAna28nLFxuICAgICAgICAgICAgcmVDbGFzc05hbWU6IG5ldyBSZWdFeHAoXCJjbGFzc1tePV0qPz1bXFxcIidcXFNdKihLUkNDKVsnXFxcIlxcU10/XCIsICdpJylcbiAgICAgICAgfSxcbiAgICAgICAgS09DQzoge1xuICAgICAgICAgICAgbGFuZzogJ2tvJyxcbiAgICAgICAgICAgIHJlQ2xhc3NOYW1lOiBuZXcgUmVnRXhwKFwiY2xhc3NbXj1dKj89W1xcXCInXFxTXSooS09DQylbJ1xcXCJcXFNdP1wiLCAnaScpXG4gICAgICAgIH0sXG4gICAgICAgIEtSOiB7XG4gICAgICAgICAgICBsYW5nOiAna28nLFxuICAgICAgICAgICAgcmVDbGFzc05hbWU6IG5ldyBSZWdFeHAoXCJjbGFzc1tePV0qPz1bXFxcIidcXFNdKihLUilbJ1xcXCJcXFNdP1wiLCAnaScpXG4gICAgICAgIH0sXG4gICAgICAgIEVOQ0M6IHtcbiAgICAgICAgICAgIGxhbmc6ICdlbicsXG4gICAgICAgICAgICByZUNsYXNzTmFtZTogbmV3IFJlZ0V4cChcImNsYXNzW149XSo/PVtcXFwiJ1xcU10qKEVOQ0MpWydcXFwiXFxTXT9cIiwgJ2knKVxuICAgICAgICB9LFxuICAgICAgICBFR0NDOiB7XG4gICAgICAgICAgICBsYW5nOiAnZW4nLFxuICAgICAgICAgICAgcmVDbGFzc05hbWU6IG5ldyBSZWdFeHAoXCJjbGFzc1tePV0qPz1bXFxcIidcXFNdKihFR0NDKVsnXFxcIlxcU10/XCIsICdpJylcbiAgICAgICAgfSxcbiAgICAgICAgRU46IHtcbiAgICAgICAgICAgIGxhbmc6ICdlbicsXG4gICAgICAgICAgICByZUNsYXNzTmFtZTogbmV3IFJlZ0V4cChcImNsYXNzW149XSo/PVtcXFwiJ1xcU10qKEVOKVsnXFxcIlxcU10/XCIsICdpJylcbiAgICAgICAgfSxcbiAgICAgICAgSlBDQzoge1xuICAgICAgICAgICAgbGFuZzogJ2phJyxcbiAgICAgICAgICAgIHJlQ2xhc3NOYW1lOiBuZXcgUmVnRXhwKFwiY2xhc3NbXj1dKj89W1xcXCInXFxTXSooSlBDQylbJ1xcXCJcXFNdP1wiLCAnaScpXG4gICAgICAgIH1cbiAgICB9O1xuICAgIGlmIChvcHRpb25zICE9IG51bGwgPyBvcHRpb25zLmRlZmluZWRMYW5ncyA6IHZvaWQgMCkge1xuICAgICAgICBfcmVmID0gb3B0aW9ucy5kZWZpbmVkTGFuZ3M7XG4gICAgICAgIGZvciAoa2V5IGluIF9yZWYpIHtcbiAgICAgICAgICAgIHZhbHVlID0gX3JlZltrZXldO1xuICAgICAgICAgICAgZGVmaW5lZExhbmdzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkdXJhdGlvbiA9IChvcHRpb25zICE9IG51bGwgPyBvcHRpb25zLmR1cmF0aW9uIDogdm9pZCAwKSB8fCAxMDsgLy9IU0xFRSBtcyAtPiBzIOuhnCDrs4Dqsr1cbiAgICBmaXhlZExhbmcgPSBvcHRpb25zLmZpeGVkTGFuZztcbiAgICBzYW1pID0gc2FtaS50cmltKCk7XG4gICAgLy9nZXREZWZpbmVkTGFuZ3MoKTtcbiAgICByZXN1bHQgPSBwYXJzZSgpO1xuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3VsdDogcmVzdWx0LFxuICAgICAgICBlcnJvcnM6IGVycm9yc1xuICAgIH07XG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0IFNtaVBhcnNlcjsiXSwic291cmNlUm9vdCI6IiJ9