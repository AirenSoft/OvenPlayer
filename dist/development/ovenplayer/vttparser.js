/*! OvenPlayerv0.9.741 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vttparser"],{

/***/ "./src/js/api/caption/parser/VttParser.js":
/*!************************************************!*\
  !*** ./src/js/api/caption/parser/VttParser.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vttCue = __webpack_require__(/*! utils/captions/vttCue */ "./src/js/utils/captions/vttCue.js");

var _vttCue2 = _interopRequireDefault(_vttCue);

var _vttRegion = __webpack_require__(/*! utils/captions/vttRegion */ "./src/js/utils/captions/vttRegion.js");

var _vttRegion2 = _interopRequireDefault(_vttRegion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Copyright 2013 vtt.js Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */

/* vtt.js - v0.12.1 (https://github.com/mozilla/vtt.js) built on 03-12-2015 */
var WebVTT = function WebVTT() {};
function makeColorSet(color, opacity) {
    if (opacity === undefined) {
        opacity = 1;
    }
    return "rgba(" + [parseInt(color.substring(0, 2), 16), parseInt(color.substring(2, 4), 16), parseInt(color.substring(4, 6), 16), opacity].join(",") + ")";
}

var WebVTTPrefs = ['webvtt.font.color', 'webvtt.font.opacity', 'webvtt.font.scale', 'webvtt.bg.color', 'webvtt.bg.opacity', 'webvtt.edge.color', 'webvtt.edge.type'];

var fontScale = 1;

function observe(subject, topic, data) {
    switch (data) {
        case "webvtt.font.color":
        case "webvtt.font.opacity":
            var fontColor = Services.prefs.getCharPref("webvtt.font.color");
            var fontOpacity = Services.prefs.getIntPref("webvtt.font.opacity") / 100;
            WebVTTSet.fontSet = makeColorSet(fontColor, fontOpacity);
            break;
        case "webvtt.font.scale":
            fontScale = Services.prefs.getIntPref("webvtt.font.scale") / 100;
            break;
        case "webvtt.bg.color":
        case "webvtt.bg.opacity":
            var backgroundColor = Services.prefs.getCharPref("webvtt.bg.color");
            var backgroundOpacity = Services.prefs.getIntPref("webvtt.bg.opacity") / 100;
            WebVTTSet.backgroundSet = makeColorSet(backgroundColor, backgroundOpacity);
            break;
        case "webvtt.edge.color":
        case "webvtt.edge.type":
            var edgeTypeList = ["", "0px 0px ", "4px 4px 4px ", "-2px -2px ", "2px 2px "];
            var edgeType = Services.prefs.getIntPref("webvtt.edge.type");
            var edgeColor = Services.prefs.getCharPref("webvtt.edge.color");
            WebVTTSet.edgeSet = edgeTypeList[edgeType] + makeColorSet(edgeColor);
            break;
    }
}

if (typeof Services !== "undefined") {
    var WebVTTSet = {};
    WebVTTPrefs.forEach(function (pref) {
        observe(undefined, undefined, pref);
        Services.prefs.addObserver(pref, observe, false);
    });
}

var _objCreate = Object.create || function () {
    function F() {}
    return function (o) {
        if (arguments.length !== 1) {
            throw new Error('Object.create shim only accepts one parameter.');
        }
        F.prototype = o;
        return new F();
    };
}();

// Creates a new ParserError object from an errorData object. The errorData
// object should have default code and message properties. The default message
// property can be overriden by passing in a message parameter.
// See ParsingError.Errors below for acceptable errors.
function ParsingError(errorData, message) {
    this.name = "ParsingError";
    this.code = errorData.code;
    this.message = message || errorData.message;
}
ParsingError.prototype = _objCreate(Error.prototype);
ParsingError.prototype.constructor = ParsingError;

// ParsingError metadata for acceptable ParsingErrors.
ParsingError.Errors = {
    BadSignature: {
        code: 0,
        message: "Malformed WebVTT signature."
    },
    BadTimeStamp: {
        code: 1,
        message: "Malformed time stamp."
    }
};

// Try to parse input as a time stamp.
function parseTimeStamp(input) {

    function computeSeconds(h, m, s, f) {
        return (h | 0) * 3600 + (m | 0) * 60 + (s | 0) + (f | 0) / 1000;
    }

    var m = input.match(/^(\d+):(\d{2})(:\d{2})?\.(\d{3})/);
    if (!m) {
        return null;
    }

    if (m[3]) {
        // Timestamp takes the form of [hours]:[minutes]:[seconds].[milliseconds]
        return computeSeconds(m[1], m[2], m[3].replace(":", ""), m[4]);
    } else if (m[1] > 59) {
        // Timestamp takes the form of [hours]:[minutes].[milliseconds]
        // First position is hours as it's over 59.
        return computeSeconds(m[1], m[2], 0, m[4]);
    } else {
        // Timestamp takes the form of [minutes]:[seconds].[milliseconds]
        return computeSeconds(0, m[1], m[2], m[4]);
    }
}

// A settings object holds key/value pairs and will ignore anything but the first
// assignment to a specific key.
function Settings() {
    this.values = _objCreate(null);
}

Settings.prototype = {
    // Only accept the first assignment to any key.
    set: function set(k, v) {
        if (!this.get(k) && v !== "") {
            this.values[k] = v;
        }
    },
    // Return the value for a key, or a default value.
    // If 'defaultKey' is passed then 'dflt' is assumed to be an object with
    // a number of possible default values as properties where 'defaultKey' is
    // the key of the property that will be chosen; otherwise it's assumed to be
    // a single value.
    get: function get(k, dflt, defaultKey) {
        if (defaultKey) {
            return this.has(k) ? this.values[k] : dflt[defaultKey];
        }
        return this.has(k) ? this.values[k] : dflt;
    },
    // Check whether we have a value for a key.
    has: function has(k) {
        return k in this.values;
    },
    // Accept a setting if its one of the given alternatives.
    alt: function alt(k, v, a) {
        for (var n = 0; n < a.length; ++n) {
            if (v === a[n]) {
                this.set(k, v);
                break;
            }
        }
    },
    // Accept a setting if its a valid (signed) integer.
    integer: function integer(k, v) {
        if (/^-?\d+$/.test(v)) {
            // integer
            this.set(k, parseInt(v, 10));
        }
    },
    // Accept a setting if its a valid percentage.
    percent: function percent(k, v) {
        var m;
        if (m = v.match(/^([\d]{1,3})(\.[\d]*)?%$/)) {
            v = parseFloat(v);
            if (v >= 0 && v <= 100) {
                this.set(k, v);
                return true;
            }
        }
        return false;
    }
};

// Helper function to parse input into groups separated by 'groupDelim', and
// interprete each group as a key/value pair separated by 'keyValueDelim'.
function parseOptions(input, callback, keyValueDelim, groupDelim) {
    var groups = groupDelim ? input.split(groupDelim) : [input];
    for (var i in groups) {
        if (typeof groups[i] !== "string") {
            continue;
        }
        var kv = groups[i].split(keyValueDelim);
        if (kv.length !== 2) {
            continue;
        }
        var k = kv[0];
        var v = kv[1];
        callback(k, v);
    }
}

function parseCue(input, cue, regionList) {
    // Remember the original input if we need to throw an error.
    var oInput = input;
    // 4.1 WebVTT timestamp
    function consumeTimeStamp() {
        var ts = parseTimeStamp(input);
        if (ts === null) {
            throw new ParsingError(ParsingError.Errors.BadTimeStamp, "Malformed timestamp: " + oInput);
        }
        // Remove time stamp from input.
        input = input.replace(/^[^\sa-zA-Z-]+/, "");
        return ts;
    }

    // 4.4.2 WebVTT cue settings
    function consumeCueSettings(input, cue) {
        var settings = new Settings();

        parseOptions(input, function (k, v) {
            switch (k) {
                case "region":
                    // Find the last region we parsed with the same region id.
                    for (var i = regionList.length - 1; i >= 0; i--) {
                        if (regionList[i].id === v) {
                            settings.set(k, regionList[i].region);
                            break;
                        }
                    }
                    break;
                case "vertical":
                    settings.alt(k, v, ["rl", "lr"]);
                    break;
                case "line":
                    var vals = v.split(","),
                        vals0 = vals[0];
                    settings.integer(k, vals0);
                    settings.percent(k, vals0) ? settings.set("snapToLines", false) : null;
                    settings.alt(k, vals0, ["auto"]);
                    if (vals.length === 2) {
                        settings.alt("lineAlign", vals[1], ["start", "middle", "end"]);
                    }
                    break;
                case "position":
                    vals = v.split(",");
                    settings.percent(k, vals[0]);
                    if (vals.length === 2) {
                        settings.alt("positionAlign", vals[1], ["start", "middle", "end"]);
                    }
                    break;
                case "size":
                    settings.percent(k, v);
                    break;
                case "align":
                    settings.alt(k, v, ["start", "middle", "end", "left", "right"]);
                    break;
            }
        }, /:/, /\s/);

        //hslee remove these fields.
        //Because safari dies here always. And Player doen't use style fields.
        // Apply default values for any missing fields.
        /*cue.region = settings.get("region", null);
        cue.vertical = settings.get("vertical", "");
        cue.line = settings.get("line", "auto");
        cue.lineAlign = settings.get("lineAlign", "start");
        cue.snapToLines = settings.get("snapToLines", true);
        cue.size = settings.get("size", 100);
        //cue.align = settings.get("align", "middle");
        cue.position = settings.get("position", "auto");
        cue.positionAlign = settings.get("positionAlign", {
            start: "start",
            left: "start",
            middle: "middle",
            end: "end",
            right: "end"
        }, cue.align
        );*/
    }

    function skipWhitespace() {
        input = input.replace(/^\s+/, "");
    }

    // 4.1 WebVTT cue timings.
    skipWhitespace();
    cue.startTime = consumeTimeStamp(); // (1) collect cue start time
    skipWhitespace();
    if (input.substr(0, 3) !== "-->") {
        // (3) next characters must match "-->"
        throw new ParsingError(ParsingError.Errors.BadTimeStamp, "Malformed time stamp (time stamps must be separated by '-->'): " + oInput);
    }
    input = input.substr(3);
    skipWhitespace();
    cue.endTime = consumeTimeStamp(); // (5) collect cue end time

    // 4.1 WebVTT cue settings list.
    skipWhitespace();
    consumeCueSettings(input, cue);
}

var ESCAPE = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&lrm;": '\u200E',
    "&rlm;": '\u200F',
    "&nbsp;": '\xA0'
};

var TAG_NAME = {
    c: "span",
    i: "i",
    b: "b",
    u: "u",
    ruby: "ruby",
    rt: "rt",
    v: "span",
    lang: "span"
};

var TAG_ANNOTATION = {
    v: "title",
    lang: "lang"
};

var NEEDS_PARENT = {
    rt: "ruby"
};

// Parse content into a document fragment.
function parseContent(window, input) {
    function nextToken() {
        // Check for end-of-string.
        if (!input) {
            return null;
        }

        // Consume 'n' characters from the input.
        function consume(result) {
            input = input.substr(result.length);
            return result;
        }

        var m = input.match(/^([^<]*)(<[^>]+>?)?/);
        // If there is some text before the next tag, return it, otherwise return
        // the tag.
        return consume(m[1] ? m[1] : m[2]);
    }

    // Unescape a string 's'.
    function unescape1(e) {
        return ESCAPE[e];
    }
    function unescape(s) {
        while (m = s.match(/&(amp|lt|gt|lrm|rlm|nbsp);/)) {
            s = s.replace(m[0], unescape1);
        }
        return s;
    }

    function shouldAdd(current, element) {
        return !NEEDS_PARENT[element.localName] || NEEDS_PARENT[element.localName] === current.localName;
    }

    // Create an element for this tag.
    function createElement(type, annotation) {
        var tagName = TAG_NAME[type];
        if (!tagName) {
            return null;
        }
        var element = window.document.createElement(tagName);
        element.localName = tagName;
        var name = TAG_ANNOTATION[type];
        if (name && annotation) {
            element[name] = annotation.trim();
        }
        return element;
    }

    var rootDiv = window.document.createElement("div"),
        current = rootDiv,
        t,
        tagStack = [];

    while ((t = nextToken()) !== null) {
        if (t[0] === '<') {
            if (t[1] === "/") {
                // If the closing tag matches, move back up to the parent node.
                if (tagStack.length && tagStack[tagStack.length - 1] === t.substr(2).replace(">", "")) {
                    tagStack.pop();
                    current = current.parentNode;
                }
                // Otherwise just ignore the end tag.
                continue;
            }
            var ts = parseTimeStamp(t.substr(1, t.length - 2));
            var node;
            if (ts) {
                // Timestamps are lead nodes as well.
                node = window.document.createProcessingInstruction("timestamp", ts);
                current.appendChild(node);
                continue;
            }
            var m = t.match(/^<([^.\s/0-9>]+)(\.[^\s\\>]+)?([^>\\]+)?(\\?)>?$/);
            // If we can't parse the tag, skip to the next tag.
            if (!m) {
                continue;
            }
            // Try to construct an element, and ignore the tag if we couldn't.
            node = createElement(m[1], m[3]);
            if (!node) {
                continue;
            }
            // Determine if the tag should be added based on the context of where it
            // is placed in the cuetext.
            if (!shouldAdd(current, node)) {
                continue;
            }
            // Set the class list (as a list of classes, separated by space).
            if (m[2]) {
                node.className = m[2].substr(1).replace('.', ' ');
            }
            // Append the node to the current node, and enter the scope of the new
            // node.
            tagStack.push(m[1]);
            current.appendChild(node);
            current = node;
            continue;
        }

        // Text nodes are leaf nodes.
        current.appendChild(window.document.createTextNode(unescape(t)));
    }

    return rootDiv;
}

// This is a list of all the Unicode characters that have a strong
// right-to-left category. What this means is that these characters are
// written right-to-left for sure. It was generated by pulling all the strong
// right-to-left characters out of the Unicode data table. That table can
// found at: http://www.unicode.org/Public/UNIDATA/UnicodeData.txt
var strongRTLChars = [0x05BE, 0x05C0, 0x05C3, 0x05C6, 0x05D0, 0x05D1, 0x05D2, 0x05D3, 0x05D4, 0x05D5, 0x05D6, 0x05D7, 0x05D8, 0x05D9, 0x05DA, 0x05DB, 0x05DC, 0x05DD, 0x05DE, 0x05DF, 0x05E0, 0x05E1, 0x05E2, 0x05E3, 0x05E4, 0x05E5, 0x05E6, 0x05E7, 0x05E8, 0x05E9, 0x05EA, 0x05F0, 0x05F1, 0x05F2, 0x05F3, 0x05F4, 0x0608, 0x060B, 0x060D, 0x061B, 0x061E, 0x061F, 0x0620, 0x0621, 0x0622, 0x0623, 0x0624, 0x0625, 0x0626, 0x0627, 0x0628, 0x0629, 0x062A, 0x062B, 0x062C, 0x062D, 0x062E, 0x062F, 0x0630, 0x0631, 0x0632, 0x0633, 0x0634, 0x0635, 0x0636, 0x0637, 0x0638, 0x0639, 0x063A, 0x063B, 0x063C, 0x063D, 0x063E, 0x063F, 0x0640, 0x0641, 0x0642, 0x0643, 0x0644, 0x0645, 0x0646, 0x0647, 0x0648, 0x0649, 0x064A, 0x066D, 0x066E, 0x066F, 0x0671, 0x0672, 0x0673, 0x0674, 0x0675, 0x0676, 0x0677, 0x0678, 0x0679, 0x067A, 0x067B, 0x067C, 0x067D, 0x067E, 0x067F, 0x0680, 0x0681, 0x0682, 0x0683, 0x0684, 0x0685, 0x0686, 0x0687, 0x0688, 0x0689, 0x068A, 0x068B, 0x068C, 0x068D, 0x068E, 0x068F, 0x0690, 0x0691, 0x0692, 0x0693, 0x0694, 0x0695, 0x0696, 0x0697, 0x0698, 0x0699, 0x069A, 0x069B, 0x069C, 0x069D, 0x069E, 0x069F, 0x06A0, 0x06A1, 0x06A2, 0x06A3, 0x06A4, 0x06A5, 0x06A6, 0x06A7, 0x06A8, 0x06A9, 0x06AA, 0x06AB, 0x06AC, 0x06AD, 0x06AE, 0x06AF, 0x06B0, 0x06B1, 0x06B2, 0x06B3, 0x06B4, 0x06B5, 0x06B6, 0x06B7, 0x06B8, 0x06B9, 0x06BA, 0x06BB, 0x06BC, 0x06BD, 0x06BE, 0x06BF, 0x06C0, 0x06C1, 0x06C2, 0x06C3, 0x06C4, 0x06C5, 0x06C6, 0x06C7, 0x06C8, 0x06C9, 0x06CA, 0x06CB, 0x06CC, 0x06CD, 0x06CE, 0x06CF, 0x06D0, 0x06D1, 0x06D2, 0x06D3, 0x06D4, 0x06D5, 0x06E5, 0x06E6, 0x06EE, 0x06EF, 0x06FA, 0x06FB, 0x06FC, 0x06FD, 0x06FE, 0x06FF, 0x0700, 0x0701, 0x0702, 0x0703, 0x0704, 0x0705, 0x0706, 0x0707, 0x0708, 0x0709, 0x070A, 0x070B, 0x070C, 0x070D, 0x070F, 0x0710, 0x0712, 0x0713, 0x0714, 0x0715, 0x0716, 0x0717, 0x0718, 0x0719, 0x071A, 0x071B, 0x071C, 0x071D, 0x071E, 0x071F, 0x0720, 0x0721, 0x0722, 0x0723, 0x0724, 0x0725, 0x0726, 0x0727, 0x0728, 0x0729, 0x072A, 0x072B, 0x072C, 0x072D, 0x072E, 0x072F, 0x074D, 0x074E, 0x074F, 0x0750, 0x0751, 0x0752, 0x0753, 0x0754, 0x0755, 0x0756, 0x0757, 0x0758, 0x0759, 0x075A, 0x075B, 0x075C, 0x075D, 0x075E, 0x075F, 0x0760, 0x0761, 0x0762, 0x0763, 0x0764, 0x0765, 0x0766, 0x0767, 0x0768, 0x0769, 0x076A, 0x076B, 0x076C, 0x076D, 0x076E, 0x076F, 0x0770, 0x0771, 0x0772, 0x0773, 0x0774, 0x0775, 0x0776, 0x0777, 0x0778, 0x0779, 0x077A, 0x077B, 0x077C, 0x077D, 0x077E, 0x077F, 0x0780, 0x0781, 0x0782, 0x0783, 0x0784, 0x0785, 0x0786, 0x0787, 0x0788, 0x0789, 0x078A, 0x078B, 0x078C, 0x078D, 0x078E, 0x078F, 0x0790, 0x0791, 0x0792, 0x0793, 0x0794, 0x0795, 0x0796, 0x0797, 0x0798, 0x0799, 0x079A, 0x079B, 0x079C, 0x079D, 0x079E, 0x079F, 0x07A0, 0x07A1, 0x07A2, 0x07A3, 0x07A4, 0x07A5, 0x07B1, 0x07C0, 0x07C1, 0x07C2, 0x07C3, 0x07C4, 0x07C5, 0x07C6, 0x07C7, 0x07C8, 0x07C9, 0x07CA, 0x07CB, 0x07CC, 0x07CD, 0x07CE, 0x07CF, 0x07D0, 0x07D1, 0x07D2, 0x07D3, 0x07D4, 0x07D5, 0x07D6, 0x07D7, 0x07D8, 0x07D9, 0x07DA, 0x07DB, 0x07DC, 0x07DD, 0x07DE, 0x07DF, 0x07E0, 0x07E1, 0x07E2, 0x07E3, 0x07E4, 0x07E5, 0x07E6, 0x07E7, 0x07E8, 0x07E9, 0x07EA, 0x07F4, 0x07F5, 0x07FA, 0x0800, 0x0801, 0x0802, 0x0803, 0x0804, 0x0805, 0x0806, 0x0807, 0x0808, 0x0809, 0x080A, 0x080B, 0x080C, 0x080D, 0x080E, 0x080F, 0x0810, 0x0811, 0x0812, 0x0813, 0x0814, 0x0815, 0x081A, 0x0824, 0x0828, 0x0830, 0x0831, 0x0832, 0x0833, 0x0834, 0x0835, 0x0836, 0x0837, 0x0838, 0x0839, 0x083A, 0x083B, 0x083C, 0x083D, 0x083E, 0x0840, 0x0841, 0x0842, 0x0843, 0x0844, 0x0845, 0x0846, 0x0847, 0x0848, 0x0849, 0x084A, 0x084B, 0x084C, 0x084D, 0x084E, 0x084F, 0x0850, 0x0851, 0x0852, 0x0853, 0x0854, 0x0855, 0x0856, 0x0857, 0x0858, 0x085E, 0x08A0, 0x08A2, 0x08A3, 0x08A4, 0x08A5, 0x08A6, 0x08A7, 0x08A8, 0x08A9, 0x08AA, 0x08AB, 0x08AC, 0x200F, 0xFB1D, 0xFB1F, 0xFB20, 0xFB21, 0xFB22, 0xFB23, 0xFB24, 0xFB25, 0xFB26, 0xFB27, 0xFB28, 0xFB2A, 0xFB2B, 0xFB2C, 0xFB2D, 0xFB2E, 0xFB2F, 0xFB30, 0xFB31, 0xFB32, 0xFB33, 0xFB34, 0xFB35, 0xFB36, 0xFB38, 0xFB39, 0xFB3A, 0xFB3B, 0xFB3C, 0xFB3E, 0xFB40, 0xFB41, 0xFB43, 0xFB44, 0xFB46, 0xFB47, 0xFB48, 0xFB49, 0xFB4A, 0xFB4B, 0xFB4C, 0xFB4D, 0xFB4E, 0xFB4F, 0xFB50, 0xFB51, 0xFB52, 0xFB53, 0xFB54, 0xFB55, 0xFB56, 0xFB57, 0xFB58, 0xFB59, 0xFB5A, 0xFB5B, 0xFB5C, 0xFB5D, 0xFB5E, 0xFB5F, 0xFB60, 0xFB61, 0xFB62, 0xFB63, 0xFB64, 0xFB65, 0xFB66, 0xFB67, 0xFB68, 0xFB69, 0xFB6A, 0xFB6B, 0xFB6C, 0xFB6D, 0xFB6E, 0xFB6F, 0xFB70, 0xFB71, 0xFB72, 0xFB73, 0xFB74, 0xFB75, 0xFB76, 0xFB77, 0xFB78, 0xFB79, 0xFB7A, 0xFB7B, 0xFB7C, 0xFB7D, 0xFB7E, 0xFB7F, 0xFB80, 0xFB81, 0xFB82, 0xFB83, 0xFB84, 0xFB85, 0xFB86, 0xFB87, 0xFB88, 0xFB89, 0xFB8A, 0xFB8B, 0xFB8C, 0xFB8D, 0xFB8E, 0xFB8F, 0xFB90, 0xFB91, 0xFB92, 0xFB93, 0xFB94, 0xFB95, 0xFB96, 0xFB97, 0xFB98, 0xFB99, 0xFB9A, 0xFB9B, 0xFB9C, 0xFB9D, 0xFB9E, 0xFB9F, 0xFBA0, 0xFBA1, 0xFBA2, 0xFBA3, 0xFBA4, 0xFBA5, 0xFBA6, 0xFBA7, 0xFBA8, 0xFBA9, 0xFBAA, 0xFBAB, 0xFBAC, 0xFBAD, 0xFBAE, 0xFBAF, 0xFBB0, 0xFBB1, 0xFBB2, 0xFBB3, 0xFBB4, 0xFBB5, 0xFBB6, 0xFBB7, 0xFBB8, 0xFBB9, 0xFBBA, 0xFBBB, 0xFBBC, 0xFBBD, 0xFBBE, 0xFBBF, 0xFBC0, 0xFBC1, 0xFBD3, 0xFBD4, 0xFBD5, 0xFBD6, 0xFBD7, 0xFBD8, 0xFBD9, 0xFBDA, 0xFBDB, 0xFBDC, 0xFBDD, 0xFBDE, 0xFBDF, 0xFBE0, 0xFBE1, 0xFBE2, 0xFBE3, 0xFBE4, 0xFBE5, 0xFBE6, 0xFBE7, 0xFBE8, 0xFBE9, 0xFBEA, 0xFBEB, 0xFBEC, 0xFBED, 0xFBEE, 0xFBEF, 0xFBF0, 0xFBF1, 0xFBF2, 0xFBF3, 0xFBF4, 0xFBF5, 0xFBF6, 0xFBF7, 0xFBF8, 0xFBF9, 0xFBFA, 0xFBFB, 0xFBFC, 0xFBFD, 0xFBFE, 0xFBFF, 0xFC00, 0xFC01, 0xFC02, 0xFC03, 0xFC04, 0xFC05, 0xFC06, 0xFC07, 0xFC08, 0xFC09, 0xFC0A, 0xFC0B, 0xFC0C, 0xFC0D, 0xFC0E, 0xFC0F, 0xFC10, 0xFC11, 0xFC12, 0xFC13, 0xFC14, 0xFC15, 0xFC16, 0xFC17, 0xFC18, 0xFC19, 0xFC1A, 0xFC1B, 0xFC1C, 0xFC1D, 0xFC1E, 0xFC1F, 0xFC20, 0xFC21, 0xFC22, 0xFC23, 0xFC24, 0xFC25, 0xFC26, 0xFC27, 0xFC28, 0xFC29, 0xFC2A, 0xFC2B, 0xFC2C, 0xFC2D, 0xFC2E, 0xFC2F, 0xFC30, 0xFC31, 0xFC32, 0xFC33, 0xFC34, 0xFC35, 0xFC36, 0xFC37, 0xFC38, 0xFC39, 0xFC3A, 0xFC3B, 0xFC3C, 0xFC3D, 0xFC3E, 0xFC3F, 0xFC40, 0xFC41, 0xFC42, 0xFC43, 0xFC44, 0xFC45, 0xFC46, 0xFC47, 0xFC48, 0xFC49, 0xFC4A, 0xFC4B, 0xFC4C, 0xFC4D, 0xFC4E, 0xFC4F, 0xFC50, 0xFC51, 0xFC52, 0xFC53, 0xFC54, 0xFC55, 0xFC56, 0xFC57, 0xFC58, 0xFC59, 0xFC5A, 0xFC5B, 0xFC5C, 0xFC5D, 0xFC5E, 0xFC5F, 0xFC60, 0xFC61, 0xFC62, 0xFC63, 0xFC64, 0xFC65, 0xFC66, 0xFC67, 0xFC68, 0xFC69, 0xFC6A, 0xFC6B, 0xFC6C, 0xFC6D, 0xFC6E, 0xFC6F, 0xFC70, 0xFC71, 0xFC72, 0xFC73, 0xFC74, 0xFC75, 0xFC76, 0xFC77, 0xFC78, 0xFC79, 0xFC7A, 0xFC7B, 0xFC7C, 0xFC7D, 0xFC7E, 0xFC7F, 0xFC80, 0xFC81, 0xFC82, 0xFC83, 0xFC84, 0xFC85, 0xFC86, 0xFC87, 0xFC88, 0xFC89, 0xFC8A, 0xFC8B, 0xFC8C, 0xFC8D, 0xFC8E, 0xFC8F, 0xFC90, 0xFC91, 0xFC92, 0xFC93, 0xFC94, 0xFC95, 0xFC96, 0xFC97, 0xFC98, 0xFC99, 0xFC9A, 0xFC9B, 0xFC9C, 0xFC9D, 0xFC9E, 0xFC9F, 0xFCA0, 0xFCA1, 0xFCA2, 0xFCA3, 0xFCA4, 0xFCA5, 0xFCA6, 0xFCA7, 0xFCA8, 0xFCA9, 0xFCAA, 0xFCAB, 0xFCAC, 0xFCAD, 0xFCAE, 0xFCAF, 0xFCB0, 0xFCB1, 0xFCB2, 0xFCB3, 0xFCB4, 0xFCB5, 0xFCB6, 0xFCB7, 0xFCB8, 0xFCB9, 0xFCBA, 0xFCBB, 0xFCBC, 0xFCBD, 0xFCBE, 0xFCBF, 0xFCC0, 0xFCC1, 0xFCC2, 0xFCC3, 0xFCC4, 0xFCC5, 0xFCC6, 0xFCC7, 0xFCC8, 0xFCC9, 0xFCCA, 0xFCCB, 0xFCCC, 0xFCCD, 0xFCCE, 0xFCCF, 0xFCD0, 0xFCD1, 0xFCD2, 0xFCD3, 0xFCD4, 0xFCD5, 0xFCD6, 0xFCD7, 0xFCD8, 0xFCD9, 0xFCDA, 0xFCDB, 0xFCDC, 0xFCDD, 0xFCDE, 0xFCDF, 0xFCE0, 0xFCE1, 0xFCE2, 0xFCE3, 0xFCE4, 0xFCE5, 0xFCE6, 0xFCE7, 0xFCE8, 0xFCE9, 0xFCEA, 0xFCEB, 0xFCEC, 0xFCED, 0xFCEE, 0xFCEF, 0xFCF0, 0xFCF1, 0xFCF2, 0xFCF3, 0xFCF4, 0xFCF5, 0xFCF6, 0xFCF7, 0xFCF8, 0xFCF9, 0xFCFA, 0xFCFB, 0xFCFC, 0xFCFD, 0xFCFE, 0xFCFF, 0xFD00, 0xFD01, 0xFD02, 0xFD03, 0xFD04, 0xFD05, 0xFD06, 0xFD07, 0xFD08, 0xFD09, 0xFD0A, 0xFD0B, 0xFD0C, 0xFD0D, 0xFD0E, 0xFD0F, 0xFD10, 0xFD11, 0xFD12, 0xFD13, 0xFD14, 0xFD15, 0xFD16, 0xFD17, 0xFD18, 0xFD19, 0xFD1A, 0xFD1B, 0xFD1C, 0xFD1D, 0xFD1E, 0xFD1F, 0xFD20, 0xFD21, 0xFD22, 0xFD23, 0xFD24, 0xFD25, 0xFD26, 0xFD27, 0xFD28, 0xFD29, 0xFD2A, 0xFD2B, 0xFD2C, 0xFD2D, 0xFD2E, 0xFD2F, 0xFD30, 0xFD31, 0xFD32, 0xFD33, 0xFD34, 0xFD35, 0xFD36, 0xFD37, 0xFD38, 0xFD39, 0xFD3A, 0xFD3B, 0xFD3C, 0xFD3D, 0xFD50, 0xFD51, 0xFD52, 0xFD53, 0xFD54, 0xFD55, 0xFD56, 0xFD57, 0xFD58, 0xFD59, 0xFD5A, 0xFD5B, 0xFD5C, 0xFD5D, 0xFD5E, 0xFD5F, 0xFD60, 0xFD61, 0xFD62, 0xFD63, 0xFD64, 0xFD65, 0xFD66, 0xFD67, 0xFD68, 0xFD69, 0xFD6A, 0xFD6B, 0xFD6C, 0xFD6D, 0xFD6E, 0xFD6F, 0xFD70, 0xFD71, 0xFD72, 0xFD73, 0xFD74, 0xFD75, 0xFD76, 0xFD77, 0xFD78, 0xFD79, 0xFD7A, 0xFD7B, 0xFD7C, 0xFD7D, 0xFD7E, 0xFD7F, 0xFD80, 0xFD81, 0xFD82, 0xFD83, 0xFD84, 0xFD85, 0xFD86, 0xFD87, 0xFD88, 0xFD89, 0xFD8A, 0xFD8B, 0xFD8C, 0xFD8D, 0xFD8E, 0xFD8F, 0xFD92, 0xFD93, 0xFD94, 0xFD95, 0xFD96, 0xFD97, 0xFD98, 0xFD99, 0xFD9A, 0xFD9B, 0xFD9C, 0xFD9D, 0xFD9E, 0xFD9F, 0xFDA0, 0xFDA1, 0xFDA2, 0xFDA3, 0xFDA4, 0xFDA5, 0xFDA6, 0xFDA7, 0xFDA8, 0xFDA9, 0xFDAA, 0xFDAB, 0xFDAC, 0xFDAD, 0xFDAE, 0xFDAF, 0xFDB0, 0xFDB1, 0xFDB2, 0xFDB3, 0xFDB4, 0xFDB5, 0xFDB6, 0xFDB7, 0xFDB8, 0xFDB9, 0xFDBA, 0xFDBB, 0xFDBC, 0xFDBD, 0xFDBE, 0xFDBF, 0xFDC0, 0xFDC1, 0xFDC2, 0xFDC3, 0xFDC4, 0xFDC5, 0xFDC6, 0xFDC7, 0xFDF0, 0xFDF1, 0xFDF2, 0xFDF3, 0xFDF4, 0xFDF5, 0xFDF6, 0xFDF7, 0xFDF8, 0xFDF9, 0xFDFA, 0xFDFB, 0xFDFC, 0xFE70, 0xFE71, 0xFE72, 0xFE73, 0xFE74, 0xFE76, 0xFE77, 0xFE78, 0xFE79, 0xFE7A, 0xFE7B, 0xFE7C, 0xFE7D, 0xFE7E, 0xFE7F, 0xFE80, 0xFE81, 0xFE82, 0xFE83, 0xFE84, 0xFE85, 0xFE86, 0xFE87, 0xFE88, 0xFE89, 0xFE8A, 0xFE8B, 0xFE8C, 0xFE8D, 0xFE8E, 0xFE8F, 0xFE90, 0xFE91, 0xFE92, 0xFE93, 0xFE94, 0xFE95, 0xFE96, 0xFE97, 0xFE98, 0xFE99, 0xFE9A, 0xFE9B, 0xFE9C, 0xFE9D, 0xFE9E, 0xFE9F, 0xFEA0, 0xFEA1, 0xFEA2, 0xFEA3, 0xFEA4, 0xFEA5, 0xFEA6, 0xFEA7, 0xFEA8, 0xFEA9, 0xFEAA, 0xFEAB, 0xFEAC, 0xFEAD, 0xFEAE, 0xFEAF, 0xFEB0, 0xFEB1, 0xFEB2, 0xFEB3, 0xFEB4, 0xFEB5, 0xFEB6, 0xFEB7, 0xFEB8, 0xFEB9, 0xFEBA, 0xFEBB, 0xFEBC, 0xFEBD, 0xFEBE, 0xFEBF, 0xFEC0, 0xFEC1, 0xFEC2, 0xFEC3, 0xFEC4, 0xFEC5, 0xFEC6, 0xFEC7, 0xFEC8, 0xFEC9, 0xFECA, 0xFECB, 0xFECC, 0xFECD, 0xFECE, 0xFECF, 0xFED0, 0xFED1, 0xFED2, 0xFED3, 0xFED4, 0xFED5, 0xFED6, 0xFED7, 0xFED8, 0xFED9, 0xFEDA, 0xFEDB, 0xFEDC, 0xFEDD, 0xFEDE, 0xFEDF, 0xFEE0, 0xFEE1, 0xFEE2, 0xFEE3, 0xFEE4, 0xFEE5, 0xFEE6, 0xFEE7, 0xFEE8, 0xFEE9, 0xFEEA, 0xFEEB, 0xFEEC, 0xFEED, 0xFEEE, 0xFEEF, 0xFEF0, 0xFEF1, 0xFEF2, 0xFEF3, 0xFEF4, 0xFEF5, 0xFEF6, 0xFEF7, 0xFEF8, 0xFEF9, 0xFEFA, 0xFEFB, 0xFEFC, 0x10800, 0x10801, 0x10802, 0x10803, 0x10804, 0x10805, 0x10808, 0x1080A, 0x1080B, 0x1080C, 0x1080D, 0x1080E, 0x1080F, 0x10810, 0x10811, 0x10812, 0x10813, 0x10814, 0x10815, 0x10816, 0x10817, 0x10818, 0x10819, 0x1081A, 0x1081B, 0x1081C, 0x1081D, 0x1081E, 0x1081F, 0x10820, 0x10821, 0x10822, 0x10823, 0x10824, 0x10825, 0x10826, 0x10827, 0x10828, 0x10829, 0x1082A, 0x1082B, 0x1082C, 0x1082D, 0x1082E, 0x1082F, 0x10830, 0x10831, 0x10832, 0x10833, 0x10834, 0x10835, 0x10837, 0x10838, 0x1083C, 0x1083F, 0x10840, 0x10841, 0x10842, 0x10843, 0x10844, 0x10845, 0x10846, 0x10847, 0x10848, 0x10849, 0x1084A, 0x1084B, 0x1084C, 0x1084D, 0x1084E, 0x1084F, 0x10850, 0x10851, 0x10852, 0x10853, 0x10854, 0x10855, 0x10857, 0x10858, 0x10859, 0x1085A, 0x1085B, 0x1085C, 0x1085D, 0x1085E, 0x1085F, 0x10900, 0x10901, 0x10902, 0x10903, 0x10904, 0x10905, 0x10906, 0x10907, 0x10908, 0x10909, 0x1090A, 0x1090B, 0x1090C, 0x1090D, 0x1090E, 0x1090F, 0x10910, 0x10911, 0x10912, 0x10913, 0x10914, 0x10915, 0x10916, 0x10917, 0x10918, 0x10919, 0x1091A, 0x1091B, 0x10920, 0x10921, 0x10922, 0x10923, 0x10924, 0x10925, 0x10926, 0x10927, 0x10928, 0x10929, 0x1092A, 0x1092B, 0x1092C, 0x1092D, 0x1092E, 0x1092F, 0x10930, 0x10931, 0x10932, 0x10933, 0x10934, 0x10935, 0x10936, 0x10937, 0x10938, 0x10939, 0x1093F, 0x10980, 0x10981, 0x10982, 0x10983, 0x10984, 0x10985, 0x10986, 0x10987, 0x10988, 0x10989, 0x1098A, 0x1098B, 0x1098C, 0x1098D, 0x1098E, 0x1098F, 0x10990, 0x10991, 0x10992, 0x10993, 0x10994, 0x10995, 0x10996, 0x10997, 0x10998, 0x10999, 0x1099A, 0x1099B, 0x1099C, 0x1099D, 0x1099E, 0x1099F, 0x109A0, 0x109A1, 0x109A2, 0x109A3, 0x109A4, 0x109A5, 0x109A6, 0x109A7, 0x109A8, 0x109A9, 0x109AA, 0x109AB, 0x109AC, 0x109AD, 0x109AE, 0x109AF, 0x109B0, 0x109B1, 0x109B2, 0x109B3, 0x109B4, 0x109B5, 0x109B6, 0x109B7, 0x109BE, 0x109BF, 0x10A00, 0x10A10, 0x10A11, 0x10A12, 0x10A13, 0x10A15, 0x10A16, 0x10A17, 0x10A19, 0x10A1A, 0x10A1B, 0x10A1C, 0x10A1D, 0x10A1E, 0x10A1F, 0x10A20, 0x10A21, 0x10A22, 0x10A23, 0x10A24, 0x10A25, 0x10A26, 0x10A27, 0x10A28, 0x10A29, 0x10A2A, 0x10A2B, 0x10A2C, 0x10A2D, 0x10A2E, 0x10A2F, 0x10A30, 0x10A31, 0x10A32, 0x10A33, 0x10A40, 0x10A41, 0x10A42, 0x10A43, 0x10A44, 0x10A45, 0x10A46, 0x10A47, 0x10A50, 0x10A51, 0x10A52, 0x10A53, 0x10A54, 0x10A55, 0x10A56, 0x10A57, 0x10A58, 0x10A60, 0x10A61, 0x10A62, 0x10A63, 0x10A64, 0x10A65, 0x10A66, 0x10A67, 0x10A68, 0x10A69, 0x10A6A, 0x10A6B, 0x10A6C, 0x10A6D, 0x10A6E, 0x10A6F, 0x10A70, 0x10A71, 0x10A72, 0x10A73, 0x10A74, 0x10A75, 0x10A76, 0x10A77, 0x10A78, 0x10A79, 0x10A7A, 0x10A7B, 0x10A7C, 0x10A7D, 0x10A7E, 0x10A7F, 0x10B00, 0x10B01, 0x10B02, 0x10B03, 0x10B04, 0x10B05, 0x10B06, 0x10B07, 0x10B08, 0x10B09, 0x10B0A, 0x10B0B, 0x10B0C, 0x10B0D, 0x10B0E, 0x10B0F, 0x10B10, 0x10B11, 0x10B12, 0x10B13, 0x10B14, 0x10B15, 0x10B16, 0x10B17, 0x10B18, 0x10B19, 0x10B1A, 0x10B1B, 0x10B1C, 0x10B1D, 0x10B1E, 0x10B1F, 0x10B20, 0x10B21, 0x10B22, 0x10B23, 0x10B24, 0x10B25, 0x10B26, 0x10B27, 0x10B28, 0x10B29, 0x10B2A, 0x10B2B, 0x10B2C, 0x10B2D, 0x10B2E, 0x10B2F, 0x10B30, 0x10B31, 0x10B32, 0x10B33, 0x10B34, 0x10B35, 0x10B40, 0x10B41, 0x10B42, 0x10B43, 0x10B44, 0x10B45, 0x10B46, 0x10B47, 0x10B48, 0x10B49, 0x10B4A, 0x10B4B, 0x10B4C, 0x10B4D, 0x10B4E, 0x10B4F, 0x10B50, 0x10B51, 0x10B52, 0x10B53, 0x10B54, 0x10B55, 0x10B58, 0x10B59, 0x10B5A, 0x10B5B, 0x10B5C, 0x10B5D, 0x10B5E, 0x10B5F, 0x10B60, 0x10B61, 0x10B62, 0x10B63, 0x10B64, 0x10B65, 0x10B66, 0x10B67, 0x10B68, 0x10B69, 0x10B6A, 0x10B6B, 0x10B6C, 0x10B6D, 0x10B6E, 0x10B6F, 0x10B70, 0x10B71, 0x10B72, 0x10B78, 0x10B79, 0x10B7A, 0x10B7B, 0x10B7C, 0x10B7D, 0x10B7E, 0x10B7F, 0x10C00, 0x10C01, 0x10C02, 0x10C03, 0x10C04, 0x10C05, 0x10C06, 0x10C07, 0x10C08, 0x10C09, 0x10C0A, 0x10C0B, 0x10C0C, 0x10C0D, 0x10C0E, 0x10C0F, 0x10C10, 0x10C11, 0x10C12, 0x10C13, 0x10C14, 0x10C15, 0x10C16, 0x10C17, 0x10C18, 0x10C19, 0x10C1A, 0x10C1B, 0x10C1C, 0x10C1D, 0x10C1E, 0x10C1F, 0x10C20, 0x10C21, 0x10C22, 0x10C23, 0x10C24, 0x10C25, 0x10C26, 0x10C27, 0x10C28, 0x10C29, 0x10C2A, 0x10C2B, 0x10C2C, 0x10C2D, 0x10C2E, 0x10C2F, 0x10C30, 0x10C31, 0x10C32, 0x10C33, 0x10C34, 0x10C35, 0x10C36, 0x10C37, 0x10C38, 0x10C39, 0x10C3A, 0x10C3B, 0x10C3C, 0x10C3D, 0x10C3E, 0x10C3F, 0x10C40, 0x10C41, 0x10C42, 0x10C43, 0x10C44, 0x10C45, 0x10C46, 0x10C47, 0x10C48, 0x1EE00, 0x1EE01, 0x1EE02, 0x1EE03, 0x1EE05, 0x1EE06, 0x1EE07, 0x1EE08, 0x1EE09, 0x1EE0A, 0x1EE0B, 0x1EE0C, 0x1EE0D, 0x1EE0E, 0x1EE0F, 0x1EE10, 0x1EE11, 0x1EE12, 0x1EE13, 0x1EE14, 0x1EE15, 0x1EE16, 0x1EE17, 0x1EE18, 0x1EE19, 0x1EE1A, 0x1EE1B, 0x1EE1C, 0x1EE1D, 0x1EE1E, 0x1EE1F, 0x1EE21, 0x1EE22, 0x1EE24, 0x1EE27, 0x1EE29, 0x1EE2A, 0x1EE2B, 0x1EE2C, 0x1EE2D, 0x1EE2E, 0x1EE2F, 0x1EE30, 0x1EE31, 0x1EE32, 0x1EE34, 0x1EE35, 0x1EE36, 0x1EE37, 0x1EE39, 0x1EE3B, 0x1EE42, 0x1EE47, 0x1EE49, 0x1EE4B, 0x1EE4D, 0x1EE4E, 0x1EE4F, 0x1EE51, 0x1EE52, 0x1EE54, 0x1EE57, 0x1EE59, 0x1EE5B, 0x1EE5D, 0x1EE5F, 0x1EE61, 0x1EE62, 0x1EE64, 0x1EE67, 0x1EE68, 0x1EE69, 0x1EE6A, 0x1EE6C, 0x1EE6D, 0x1EE6E, 0x1EE6F, 0x1EE70, 0x1EE71, 0x1EE72, 0x1EE74, 0x1EE75, 0x1EE76, 0x1EE77, 0x1EE79, 0x1EE7A, 0x1EE7B, 0x1EE7C, 0x1EE7E, 0x1EE80, 0x1EE81, 0x1EE82, 0x1EE83, 0x1EE84, 0x1EE85, 0x1EE86, 0x1EE87, 0x1EE88, 0x1EE89, 0x1EE8B, 0x1EE8C, 0x1EE8D, 0x1EE8E, 0x1EE8F, 0x1EE90, 0x1EE91, 0x1EE92, 0x1EE93, 0x1EE94, 0x1EE95, 0x1EE96, 0x1EE97, 0x1EE98, 0x1EE99, 0x1EE9A, 0x1EE9B, 0x1EEA1, 0x1EEA2, 0x1EEA3, 0x1EEA5, 0x1EEA6, 0x1EEA7, 0x1EEA8, 0x1EEA9, 0x1EEAB, 0x1EEAC, 0x1EEAD, 0x1EEAE, 0x1EEAF, 0x1EEB0, 0x1EEB1, 0x1EEB2, 0x1EEB3, 0x1EEB4, 0x1EEB5, 0x1EEB6, 0x1EEB7, 0x1EEB8, 0x1EEB9, 0x1EEBA, 0x1EEBB, 0x10FFFD];

function determineBidi(cueDiv) {
    var nodeStack = [],
        text = "",
        charCode;

    if (!cueDiv || !cueDiv.childNodes) {
        return "ltr";
    }

    function pushNodes(nodeStack, node) {
        for (var i = node.childNodes.length - 1; i >= 0; i--) {
            nodeStack.push(node.childNodes[i]);
        }
    }

    function nextTextNode(nodeStack) {
        if (!nodeStack || !nodeStack.length) {
            return null;
        }

        var node = nodeStack.pop(),
            text = node.textContent || node.innerText;
        if (text) {
            // TODO: This should match all unicode type B characters (paragraph
            // separator characters). See issue #115.
            var m = text.match(/^.*(\n|\r)/);
            if (m) {
                nodeStack.length = 0;
                return m[0];
            }
            return text;
        }
        if (node.tagName === "ruby") {
            return nextTextNode(nodeStack);
        }
        if (node.childNodes) {
            pushNodes(nodeStack, node);
            return nextTextNode(nodeStack);
        }
    }

    pushNodes(nodeStack, cueDiv);
    while (text = nextTextNode(nodeStack)) {
        for (var i = 0; i < text.length; i++) {
            charCode = text.charCodeAt(i);
            for (var j = 0; j < strongRTLChars.length; j++) {
                if (strongRTLChars[j] === charCode) {
                    return "rtl";
                }
            }
        }
    }
    return "ltr";
}

function computeLinePos(cue) {
    if (typeof cue.line === "number" && (cue.snapToLines || cue.line >= 0 && cue.line <= 100)) {
        return cue.line;
    }
    if (!cue.track || !cue.track.textTrackList || !cue.track.textTrackList.mediaElement) {
        return -1;
    }
    var track = cue.track,
        trackList = track.textTrackList,
        count = 0;
    for (var i = 0; i < trackList.length && trackList[i] !== track; i++) {
        if (trackList[i].mode === "showing") {
            count++;
        }
    }
    return ++count * -1;
}

function StyleBox() {}

// Apply styles to a div. If there is no div passed then it defaults to the
// div on 'this'.
StyleBox.prototype.applyStyles = function (styles, div) {
    div = div || this.div;
    for (var prop in styles) {
        if (styles.hasOwnProperty(prop)) {
            div.style[prop] = styles[prop];
        }
    }
};

StyleBox.prototype.formatStyle = function (val, unit) {
    return val === 0 ? 0 : val + unit;
};

// Constructs the computed display state of the cue (a div). Places the div
// into the overlay which should be a block level element (usually a div).
function CueStyleBox(window, cue, styleOptions) {
    var isIE8 = typeof navigator !== "undefined" && /MSIE\s8\.0/.test(navigator.userAgent);
    var color = "rgba(255, 255, 255, 1)";
    var backgroundColor = "rgba(0, 0, 0, 0.8)";
    var textShadow = "";

    if (typeof WebVTTSet !== "undefined") {
        color = WebVTTSet.fontSet;
        backgroundColor = WebVTTSet.backgroundSet;
        textShadow = WebVTTSet.edgeSet;
    }

    if (isIE8) {
        color = "rgb(255, 255, 255)";
        backgroundColor = "rgb(0, 0, 0)";
    }

    StyleBox.call(this);
    this.cue = cue;

    // Parse our cue's text into a DOM tree rooted at 'cueDiv'. This div will
    // have inline positioning and will function as the cue background box.
    this.cueDiv = parseContent(window, cue.text);
    var styles = {
        color: color,
        backgroundColor: backgroundColor,
        textShadow: textShadow,
        position: "relative",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: "inline"
    };

    if (!isIE8) {
        styles.writingMode = cue.vertical === "" ? "horizontal-tb" : cue.vertical === "lr" ? "vertical-lr" : "vertical-rl";
        styles.unicodeBidi = "plaintext";
    }
    this.applyStyles(styles, this.cueDiv);

    // Create an absolutely positioned div that will be used to position the cue
    // div. Note, all WebVTT cue-setting alignments are equivalent to the CSS
    // mirrors of them except "middle" which is "center" in CSS.
    this.div = window.document.createElement("div");
    styles = {
        textAlign: cue.align === "middle" ? "center" : cue.align,
        font: styleOptions.font,
        whiteSpace: "pre-line",
        position: "absolute"
    };

    if (!isIE8) {
        styles.direction = determineBidi(this.cueDiv);
        styles.writingMode = cue.vertical === "" ? "horizontal-tb" : cue.vertical === "lr" ? "vertical-lr" : "vertical-rl".stylesunicodeBidi = "plaintext";
    }

    this.applyStyles(styles);

    this.div.appendChild(this.cueDiv);

    // Calculate the distance from the reference edge of the viewport to the text
    // position of the cue box. The reference edge will be resolved later when
    // the box orientation styles are applied.
    var textPos = 0;
    switch (cue.positionAlign) {
        case "start":
            textPos = cue.position;
            break;
        case "middle":
            textPos = cue.position - cue.size / 2;
            break;
        case "end":
            textPos = cue.position - cue.size;
            break;
    }

    // Horizontal box orientation; textPos is the distance from the left edge of the
    // area to the left edge of the box and cue.size is the distance extending to
    // the right from there.
    if (cue.vertical === "") {
        this.applyStyles({
            left: this.formatStyle(textPos, "%"),
            width: this.formatStyle(cue.size, "%")
        });
        // Vertical box orientation; textPos is the distance from the top edge of the
        // area to the top edge of the box and cue.size is the height extending
        // downwards from there.
    } else {
        this.applyStyles({
            top: this.formatStyle(textPos, "%"),
            height: this.formatStyle(cue.size, "%")
        });
    }

    this.move = function (box) {
        this.applyStyles({
            top: this.formatStyle(box.top, "px"),
            bottom: this.formatStyle(box.bottom, "px"),
            left: this.formatStyle(box.left, "px"),
            right: this.formatStyle(box.right, "px"),
            height: this.formatStyle(box.height, "px"),
            width: this.formatStyle(box.width, "px")
        });
    };
}
CueStyleBox.prototype = _objCreate(StyleBox.prototype);
CueStyleBox.prototype.constructor = CueStyleBox;

// Represents the co-ordinates of an Element in a way that we can easily
// compute things with such as if it overlaps or intersects with another Element.
// Can initialize it with either a StyleBox or another BoxPosition.
function BoxPosition(obj) {
    var isIE8 = typeof navigator !== "undefined" && /MSIE\s8\.0/.test(navigator.userAgent);

    // Either a BoxPosition was passed in and we need to copy it, or a StyleBox
    // was passed in and we need to copy the results of 'getBoundingClientRect'
    // as the object returned is readonly. All co-ordinate values are in reference
    // to the viewport origin (top left).
    var lh, height, width, top;
    if (obj.div) {
        height = obj.div.offsetHeight;
        width = obj.div.offsetWidth;
        top = obj.div.offsetTop;

        var rects = (rects = obj.div.childNodes) && (rects = rects[0]) && rects.getClientRects && rects.getClientRects();
        obj = obj.div.getBoundingClientRect();
        // In certain cases the outter div will be slightly larger then the sum of
        // the inner div's lines. This could be due to bold text, etc, on some platforms.
        // In this case we should get the average line height and use that. This will
        // result in the desired behaviour.
        lh = rects ? Math.max(rects[0] && rects[0].height || 0, obj.height / rects.length) : 0;
    }
    this.left = obj.left;
    this.right = obj.right;
    this.top = obj.top || top;
    this.height = obj.height || height;
    this.bottom = obj.bottom || top + (obj.height || height);
    this.width = obj.width || width;
    this.lineHeight = lh !== undefined ? lh : obj.lineHeight;

    if (isIE8 && !this.lineHeight) {
        this.lineHeight = 13;
    }
}

// Move the box along a particular axis. Optionally pass in an amount to move
// the box. If no amount is passed then the default is the line height of the
// box.
BoxPosition.prototype.move = function (axis, toMove) {
    toMove = toMove !== undefined ? toMove : this.lineHeight;
    switch (axis) {
        case "+x":
            this.left += toMove;
            this.right += toMove;
            break;
        case "-x":
            this.left -= toMove;
            this.right -= toMove;
            break;
        case "+y":
            this.top += toMove;
            this.bottom += toMove;
            break;
        case "-y":
            this.top -= toMove;
            this.bottom -= toMove;
            break;
    }
};

// Check if this box overlaps another box, b2.
BoxPosition.prototype.overlaps = function (b2) {
    return this.left < b2.right && this.right > b2.left && this.top < b2.bottom && this.bottom > b2.top;
};

// Check if this box overlaps any other boxes in boxes.
BoxPosition.prototype.overlapsAny = function (boxes) {
    for (var i = 0; i < boxes.length; i++) {
        if (this.overlaps(boxes[i])) {
            return true;
        }
    }
    return false;
};

// Check if this box is within another box.
BoxPosition.prototype.within = function (container) {
    return this.top >= container.top && this.bottom <= container.bottom && this.left >= container.left && this.right <= container.right;
};

// Check if this box is entirely within the container or it is overlapping
// on the edge opposite of the axis direction passed. For example, if "+x" is
// passed and the box is overlapping on the left edge of the container, then
// return true.
BoxPosition.prototype.overlapsOppositeAxis = function (container, axis) {
    switch (axis) {
        case "+x":
            return this.left < container.left;
        case "-x":
            return this.right > container.right;
        case "+y":
            return this.top < container.top;
        case "-y":
            return this.bottom > container.bottom;
    }
};

// Find the percentage of the area that this box is overlapping with another
// box.
BoxPosition.prototype.intersectPercentage = function (b2) {
    var x = Math.max(0, Math.min(this.right, b2.right) - Math.max(this.left, b2.left)),
        y = Math.max(0, Math.min(this.bottom, b2.bottom) - Math.max(this.top, b2.top)),
        intersectArea = x * y;
    return intersectArea / (this.height * this.width);
};

// Convert the positions from this box to CSS compatible positions using
// the reference container's positions. This has to be done because this
// box's positions are in reference to the viewport origin, whereas, CSS
// values are in referecne to their respective edges.
BoxPosition.prototype.toCSSCompatValues = function (reference) {
    return {
        top: this.top - reference.top,
        bottom: reference.bottom - this.bottom,
        left: this.left - reference.left,
        right: reference.right - this.right,
        height: this.height,
        width: this.width
    };
};

// Get an object that represents the box's position without anything extra.
// Can pass a StyleBox, HTMLElement, or another BoxPositon.
BoxPosition.getSimpleBoxPosition = function (obj) {
    var height = obj.div ? obj.div.offsetHeight : obj.tagName ? obj.offsetHeight : 0;
    var width = obj.div ? obj.div.offsetWidth : obj.tagName ? obj.offsetWidth : 0;
    var top = obj.div ? obj.div.offsetTop : obj.tagName ? obj.offsetTop : 0;

    obj = obj.div ? obj.div.getBoundingClientRect() : obj.tagName ? obj.getBoundingClientRect() : obj;
    var ret = {
        left: obj.left,
        right: obj.right,
        top: obj.top || top,
        height: obj.height || height,
        bottom: obj.bottom || top + (obj.height || height),
        width: obj.width || width
    };
    return ret;
};

// Move a StyleBox to its specified, or next best, position. The containerBox
// is the box that contains the StyleBox, such as a div. boxPositions are
// a list of other boxes that the styleBox can't overlap with.
function moveBoxToLinePosition(window, styleBox, containerBox, boxPositions) {

    // Find the best position for a cue box, b, on the video. The axis parameter
    // is a list of axis, the order of which, it will move the box along. For example:
    // Passing ["+x", "-x"] will move the box first along the x axis in the positive
    // direction. If it doesn't find a good position for it there it will then move
    // it along the x axis in the negative direction.
    function findBestPosition(b, axis) {
        var bestPosition,
            specifiedPosition = new BoxPosition(b),
            percentage = 1; // Highest possible so the first thing we get is better.

        for (var i = 0; i < axis.length; i++) {
            while (b.overlapsOppositeAxis(containerBox, axis[i]) || b.within(containerBox) && b.overlapsAny(boxPositions)) {
                b.move(axis[i]);
            }
            // We found a spot where we aren't overlapping anything. This is our
            // best position.
            if (b.within(containerBox)) {
                return b;
            }
            var p = b.intersectPercentage(containerBox);
            // If we're outside the container box less then we were on our last try
            // then remember this position as the best position.
            if (percentage > p) {
                bestPosition = new BoxPosition(b);
                percentage = p;
            }
            // Reset the box position to the specified position.
            b = new BoxPosition(specifiedPosition);
        }
        return bestPosition || specifiedPosition;
    }

    var boxPosition = new BoxPosition(styleBox),
        cue = styleBox.cue,
        linePos = computeLinePos(cue),
        axis = [];

    // If we have a line number to align the cue to.
    if (cue.snapToLines) {
        var size;
        switch (cue.vertical) {
            case "":
                axis = ["+y", "-y"];
                size = "height";
                break;
            case "rl":
                axis = ["+x", "-x"];
                size = "width";
                break;
            case "lr":
                axis = ["-x", "+x"];
                size = "width";
                break;
        }

        var step = boxPosition.lineHeight,
            position = step * Math.round(linePos),
            maxPosition = containerBox[size] + step,
            initialAxis = axis[0];

        // If the specified intial position is greater then the max position then
        // clamp the box to the amount of steps it would take for the box to
        // reach the max position.
        if (Math.abs(position) > maxPosition) {
            position = position < 0 ? -1 : 1;
            position *= Math.ceil(maxPosition / step) * step;
        }

        // If computed line position returns negative then line numbers are
        // relative to the bottom of the video instead of the top. Therefore, we
        // need to increase our initial position by the length or width of the
        // video, depending on the writing direction, and reverse our axis directions.
        if (linePos < 0) {
            position += cue.vertical === "" ? containerBox.height : containerBox.width;
            axis = axis.reverse();
        }

        // Move the box to the specified position. This may not be its best
        // position.
        boxPosition.move(initialAxis, position);
    } else {
        // If we have a percentage line value for the cue.
        var calculatedPercentage = boxPosition.lineHeight / containerBox.height * 100;

        switch (cue.lineAlign) {
            case "middle":
                linePos -= calculatedPercentage / 2;
                break;
            case "end":
                linePos -= calculatedPercentage;
                break;
        }

        // Apply initial line position to the cue box.
        switch (cue.vertical) {
            case "":
                styleBox.applyStyles({
                    top: styleBox.formatStyle(linePos, "%")
                });
                break;
            case "rl":
                styleBox.applyStyles({
                    left: styleBox.formatStyle(linePos, "%")
                });
                break;
            case "lr":
                styleBox.applyStyles({
                    right: styleBox.formatStyle(linePos, "%")
                });
                break;
        }

        axis = ["+y", "-x", "+x", "-y"];

        // Get the box position again after we've applied the specified positioning
        // to it.
        boxPosition = new BoxPosition(styleBox);
    }

    var bestPosition = findBestPosition(boxPosition, axis);
    styleBox.move(bestPosition.toCSSCompatValues(containerBox));
}

/*function WebVTT() {
 // Nothing
 }*/

// Helper to allow strings to be decoded instead of the default binary utf8 data.
WebVTT.StringDecoder = function () {
    return {
        decode: function decode(data) {
            if (!data) {
                return "";
            }
            if (typeof data !== "string") {
                throw new Error("Error - expected string data.");
            }
            return decodeURIComponent(encodeURIComponent(data));
        }
    };
};

WebVTT.convertCueToDOMTree = function (window, cuetext) {
    if (!window || !cuetext) {
        return null;
    }
    return parseContent(window, cuetext);
};

var FONT_SIZE_PERCENT = 0.05;
var FONT_STYLE = "sans-serif";
var CUE_BACKGROUND_PADDING = "1.5%";

// Runs the processing model over the cues and regions passed to it.
// @param overlay A block level element (usually a div) that the computed cues
//                and regions will be placed into.
WebVTT.processCues = function (window, cues, overlay) {
    if (!window || !cues || !overlay) {
        return null;
    }

    // Remove all previous children.
    while (overlay.firstChild) {
        overlay.removeChild(overlay.firstChild);
    }

    var paddedOverlay = window.document.createElement("div");
    paddedOverlay.style.position = "absolute";
    paddedOverlay.style.left = "0";
    paddedOverlay.style.right = "0";
    paddedOverlay.style.top = "0";
    paddedOverlay.style.bottom = "0";
    paddedOverlay.style.margin = CUE_BACKGROUND_PADDING;
    overlay.appendChild(paddedOverlay);

    // Determine if we need to compute the display states of the cues. This could
    // be the case if a cue's state has been changed since the last computation or
    // if it has not been computed yet.
    function shouldCompute(cues) {
        for (var i = 0; i < cues.length; i++) {
            if (cues[i].hasBeenReset || !cues[i].displayState) {
                return true;
            }
        }
        return false;
    }

    // We don't need to recompute the cues' display states. Just reuse them.
    if (!shouldCompute(cues)) {
        for (var i = 0; i < cues.length; i++) {
            paddedOverlay.appendChild(cues[i].displayState);
        }
        return;
    }

    var boxPositions = [],
        containerBox = BoxPosition.getSimpleBoxPosition(paddedOverlay),
        fontSize = Math.round(containerBox.height * FONT_SIZE_PERCENT * 100) / 100;
    var styleOptions = {
        font: fontSize * fontScale + "px " + FONT_STYLE
    };

    (function () {
        var styleBox, cue;

        for (var i = 0; i < cues.length; i++) {
            cue = cues[i];

            // Compute the intial position and styles of the cue div.
            styleBox = new CueStyleBox(window, cue, styleOptions);
            paddedOverlay.appendChild(styleBox.div);

            // Move the cue div to it's correct line position.
            moveBoxToLinePosition(window, styleBox, containerBox, boxPositions);

            // Remember the computed div so that we don't have to recompute it later
            // if we don't have too.
            cue.displayState = styleBox.div;

            boxPositions.push(BoxPosition.getSimpleBoxPosition(styleBox));
        }
    })();
};

WebVTT.Parser = function (window, decoder) {
    this.window = window;
    this.state = "INITIAL";
    this.buffer = "";
    this.decoder = decoder || new TextDecoder("utf8");
    this.regionList = [];
};

WebVTT.Parser.prototype = {
    // If the error is a ParsingError then report it to the consumer if
    // possible. If it's not a ParsingError then throw it like normal.
    reportOrThrowError: function reportOrThrowError(e) {
        if (e instanceof ParsingError) {
            this.onparsingerror && this.onparsingerror(e);
        } else {
            throw e;
        }
    },
    parse: function parse(data, flushing) {
        var self = this;
        // If there is no data then we won't decode it, but will just try to parse
        // whatever is in buffer already. This may occur in circumstances, for
        // example when flush() is called.
        if (data) {
            // Try to decode the data that we received.
            self.buffer += self.decoder.decode(data, { stream: true });
        }
        function collectNextLine() {
            var buffer = self.buffer;
            var pos = 0;
            while (pos < buffer.length && buffer[pos] !== '\r' && buffer[pos] !== '\n') {
                ++pos;
            }
            var line = buffer.substr(0, pos);
            // Advance the buffer early in case we fail below.
            if (buffer[pos] === '\r') {
                ++pos;
            }
            if (buffer[pos] === '\n') {
                ++pos;
            }
            self.buffer = buffer.substr(pos);
            return line;
        }

        // 3.4 WebVTT region and WebVTT region settings syntax
        function parseRegion(input) {
            var settings = new Settings();

            parseOptions(input, function (k, v) {
                switch (k) {
                    case "id":
                        settings.set(k, v);
                        break;
                    case "width":
                        settings.percent(k, v);
                        break;
                    case "lines":
                        settings.integer(k, v);
                        break;
                    case "regionanchor":
                    case "viewportanchor":
                        var xy = v.split(',');
                        if (xy.length !== 2) {
                            break;
                        }
                        // We have to make sure both x and y parse, so use a temporary
                        // settings object here.
                        var anchor = new Settings();
                        anchor.percent("x", xy[0]);
                        anchor.percent("y", xy[1]);
                        if (!anchor.has("x") || !anchor.has("y")) {
                            break;
                        }
                        settings.set(k + "X", anchor.get("x"));
                        settings.set(k + "Y", anchor.get("y"));
                        break;
                    case "scroll":
                        settings.alt(k, v, ["up"]);
                        break;
                }
            }, /=/, /\s/);

            // Create the region, using default values for any values that were not
            // specified.
            if (settings.has("id")) {
                var region = new self.window.VTTRegion();
                region.width = settings.get("width", 100);
                region.lines = settings.get("lines", 3);
                region.regionAnchorX = settings.get("regionanchorX", 0);
                region.regionAnchorY = settings.get("regionanchorY", 100);
                region.viewportAnchorX = settings.get("viewportanchorX", 0);
                region.viewportAnchorY = settings.get("viewportanchorY", 100);
                region.scroll = settings.get("scroll", "");
                // Register the region.
                self.onregion && self.onregion(region);
                // Remember the VTTRegion for later in case we parse any VTTCues that
                // reference it.
                self.regionList.push({
                    id: settings.get("id"),
                    region: region
                });
            }
        }

        // 3.2 WebVTT metadata header syntax
        function parseHeader(input) {
            parseOptions(input, function (k, v) {
                switch (k) {
                    case "Region":
                        // 3.3 WebVTT region metadata header syntax
                        parseRegion(v);
                        break;
                }
            }, /:/);
        }

        // 5.1 WebVTT file parsing.
        try {
            var line;
            if (self.state === "INITIAL") {
                // We can't start parsing until we have the first line.
                if (!/\r\n|\n/.test(self.buffer)) {
                    return this;
                }

                line = collectNextLine();

                var m = line.match(/^WEBVTT([ \t].*)?$/);
                if (!m || !m[0]) {
                    throw new ParsingError(ParsingError.Errors.BadSignature);
                }

                self.state = "HEADER";
            }

            var alreadyCollectedLine = false;
            while (self.buffer) {
                // We can't parse a line until we have the full line.
                if (!/\r\n|\n/.test(self.buffer)) {
                    return this;
                }

                if (!alreadyCollectedLine) {
                    line = collectNextLine();
                } else {
                    alreadyCollectedLine = false;
                }
                switch (self.state) {
                    case "HEADER":
                        // 13-18 - Allow a header (metadata) under the WEBVTT line.
                        if (/:/.test(line)) {
                            parseHeader(line);
                        } else if (!line) {
                            // An empty line terminates the header and starts the body (cues).
                            self.state = "ID";
                        }
                        continue;
                    case "NOTE":
                        // Ignore NOTE blocks.
                        if (!line) {
                            self.state = "ID";
                        }
                        continue;
                    case "ID":
                        // Check for the start of NOTE blocks.
                        if (/^NOTE($|[ \t])/.test(line)) {
                            self.state = "NOTE";
                            break;
                        }
                        // 19-29 - Allow any number of line terminators, then initialize new cue values.
                        if (!line) {
                            continue;
                        }
                        self.cue = new self.window.VTTCue(0, 0, "");
                        self.state = "CUE";
                        // 30-39 - Check if self line contains an optional identifier or timing data.
                        if (line.indexOf("-->") === -1) {
                            self.cue.id = line;
                            continue;
                        }
                    // Process line as start of a cue.
                    /*falls through*/
                    case "CUE":
                        // 40 - Collect cue timings and settings.
                        try {
                            parseCue(line, self.cue, self.regionList);
                        } catch (e) {
                            self.reportOrThrowError(e);
                            // In case of an error ignore rest of the cue.
                            self.cue = null;
                            self.state = "BADCUE";
                            continue;
                        }
                        self.state = "CUETEXT";
                        continue;
                    case "CUETEXT":
                        var hasSubstring = line.indexOf("-->") !== -1;
                        // 34 - If we have an empty line then report the cue.
                        // 35 - If we have the special substring '-->' then report the cue,
                        // but do not collect the line as we need to process the current
                        // one as a new cue.
                        if (!line || hasSubstring && (alreadyCollectedLine = true)) {
                            // We are done parsing self cue.
                            self.oncue && self.oncue(self.cue);
                            self.cue = null;
                            self.state = "ID";
                            continue;
                        }
                        if (self.cue.text) {
                            self.cue.text += "\n";
                        }
                        self.cue.text += line;
                        continue;
                    case "BADCUE":
                        // BADCUE
                        // 54-62 - Collect and discard the remaining cue.
                        if (!line) {
                            self.state = "ID";
                        }
                        continue;
                }
            }

            if (!flushing) {
                //때때로 (한긇 vtt로 추정) cue가 남아 있는채로 self.flush()를 호출해서 cue가 있기 때문에 다시 self.parse()를 타는 경우가 생김.
                //왜 이렇게 짜여 있는지 모르겠고 일단 아래와 같은 코드로 위기를 극복한다.
                if (self.state === "CUETEXT" && self.cue && self.oncue) {
                    self.oncue(self.cue);
                }
                self.flush();
                return this;
            }
        } catch (e) {
            self.reportOrThrowError(e);
            // If we are currently parsing a cue, report what we have.
            if (self.state === "CUETEXT" && self.cue && self.oncue) {
                self.oncue(self.cue);
            }
            self.cue = null;
            // Enter BADWEBVTT state if header was not parsed correctly otherwise
            // another exception occurred so enter BADCUE state.
            self.state = self.state === "INITIAL" ? "BADWEBVTT" : "BADCUE";
        }
        return this;
    },
    flush: function flush() {
        var self = this;

        try {
            // Finish decoding the stream.
            self.buffer += self.decoder.decode();
            // Synthesize the end of the current cue or region.
            if (self.cue || self.state === "HEADER") {
                self.buffer += "\n\n";
                self.parse(null, true);
            }
            // If we've flushed, parsed, and we're still on the INITIAL state then
            // that means we don't have enough of the stream to parse the first
            // line.
            if (self.state === "INITIAL") {
                throw new ParsingError(ParsingError.Errors.BadSignature);
            }
        } catch (e) {
            self.reportOrThrowError(e);
        }
        self.onflush && self.onflush();
        return this;
    }
};

exports['default'] = WebVTT;

/***/ }),

/***/ "./src/js/utils/captions/vttRegion.js":
/*!********************************************!*\
  !*** ./src/js/utils/captions/vttRegion.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Copyright 2013 vtt.js Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var VTTRegion = "";

var scrollSetting = {
    "": true,
    "up": true
};

function findScrollSetting(value) {
    if (typeof value !== "string") {
        return false;
    }
    var scroll = scrollSetting[value.toLowerCase()];
    return scroll ? value.toLowerCase() : false;
}

function isValidPercentValue(value) {
    return typeof value === "number" && value >= 0 && value <= 100;
}

// VTTRegion shim http://dev.w3.org/html5/webvtt/#vttregion-interface
VTTRegion = function VTTRegion() {
    var _width = 100;
    var _lines = 3;
    var _regionAnchorX = 0;
    var _regionAnchorY = 100;
    var _viewportAnchorX = 0;
    var _viewportAnchorY = 100;
    var _scroll = "";

    Object.defineProperties(this, {
        "width": {
            enumerable: true,
            get: function get() {
                return _width;
            },
            set: function set(value) {
                if (!isValidPercentValue(value)) {
                    throw new Error("Width must be between 0 and 100.");
                }
                _width = value;
            }
        },
        "lines": {
            enumerable: true,
            get: function get() {
                return _lines;
            },
            set: function set(value) {
                if (typeof value !== "number") {
                    throw new TypeError("Lines must be set to a number.");
                }
                _lines = value;
            }
        },
        "regionAnchorY": {
            enumerable: true,
            get: function get() {
                return _regionAnchorY;
            },
            set: function set(value) {
                if (!isValidPercentValue(value)) {
                    throw new Error("RegionAnchorX must be between 0 and 100.");
                }
                _regionAnchorY = value;
            }
        },
        "regionAnchorX": {
            enumerable: true,
            get: function get() {
                return _regionAnchorX;
            },
            set: function set(value) {
                if (!isValidPercentValue(value)) {
                    throw new Error("RegionAnchorY must be between 0 and 100.");
                }
                _regionAnchorX = value;
            }
        },
        "viewportAnchorY": {
            enumerable: true,
            get: function get() {
                return _viewportAnchorY;
            },
            set: function set(value) {
                if (!isValidPercentValue(value)) {
                    throw new Error("ViewportAnchorY must be between 0 and 100.");
                }
                _viewportAnchorY = value;
            }
        },
        "viewportAnchorX": {
            enumerable: true,
            get: function get() {
                return _viewportAnchorX;
            },
            set: function set(value) {
                if (!isValidPercentValue(value)) {
                    throw new Error("ViewportAnchorX must be between 0 and 100.");
                }
                _viewportAnchorX = value;
            }
        },
        "scroll": {
            enumerable: true,
            get: function get() {
                return _scroll;
            },
            set: function set(value) {
                var setting = findScrollSetting(value);
                // Have to check for false as an empty string is a legal value.
                if (setting === false) {
                    throw new SyntaxError("An invalid or illegal string was specified.");
                }
                _scroll = setting;
            }
        }
    });
};

exports["default"] = VTTRegion;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2NhcHRpb24vcGFyc2VyL1Z0dFBhcnNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvY2FwdGlvbnMvdnR0UmVnaW9uLmpzIl0sIm5hbWVzIjpbIldlYlZUVCIsIm1ha2VDb2xvclNldCIsImNvbG9yIiwib3BhY2l0eSIsInVuZGVmaW5lZCIsInBhcnNlSW50Iiwic3Vic3RyaW5nIiwiam9pbiIsIldlYlZUVFByZWZzIiwiZm9udFNjYWxlIiwib2JzZXJ2ZSIsInN1YmplY3QiLCJ0b3BpYyIsImRhdGEiLCJmb250Q29sb3IiLCJTZXJ2aWNlcyIsInByZWZzIiwiZ2V0Q2hhclByZWYiLCJmb250T3BhY2l0eSIsImdldEludFByZWYiLCJXZWJWVFRTZXQiLCJmb250U2V0IiwiYmFja2dyb3VuZENvbG9yIiwiYmFja2dyb3VuZE9wYWNpdHkiLCJiYWNrZ3JvdW5kU2V0IiwiZWRnZVR5cGVMaXN0IiwiZWRnZVR5cGUiLCJlZGdlQ29sb3IiLCJlZGdlU2V0IiwiZm9yRWFjaCIsInByZWYiLCJhZGRPYnNlcnZlciIsIl9vYmpDcmVhdGUiLCJPYmplY3QiLCJjcmVhdGUiLCJGIiwibyIsImFyZ3VtZW50cyIsImxlbmd0aCIsIkVycm9yIiwicHJvdG90eXBlIiwiUGFyc2luZ0Vycm9yIiwiZXJyb3JEYXRhIiwibWVzc2FnZSIsIm5hbWUiLCJjb2RlIiwiY29uc3RydWN0b3IiLCJFcnJvcnMiLCJCYWRTaWduYXR1cmUiLCJCYWRUaW1lU3RhbXAiLCJwYXJzZVRpbWVTdGFtcCIsImlucHV0IiwiY29tcHV0ZVNlY29uZHMiLCJoIiwibSIsInMiLCJmIiwibWF0Y2giLCJyZXBsYWNlIiwiU2V0dGluZ3MiLCJ2YWx1ZXMiLCJzZXQiLCJrIiwidiIsImdldCIsImRmbHQiLCJkZWZhdWx0S2V5IiwiaGFzIiwiYWx0IiwiYSIsIm4iLCJpbnRlZ2VyIiwidGVzdCIsInBlcmNlbnQiLCJwYXJzZUZsb2F0IiwicGFyc2VPcHRpb25zIiwiY2FsbGJhY2siLCJrZXlWYWx1ZURlbGltIiwiZ3JvdXBEZWxpbSIsImdyb3VwcyIsInNwbGl0IiwiaSIsImt2IiwicGFyc2VDdWUiLCJjdWUiLCJyZWdpb25MaXN0Iiwib0lucHV0IiwiY29uc3VtZVRpbWVTdGFtcCIsInRzIiwiY29uc3VtZUN1ZVNldHRpbmdzIiwic2V0dGluZ3MiLCJpZCIsInJlZ2lvbiIsInZhbHMiLCJ2YWxzMCIsInNraXBXaGl0ZXNwYWNlIiwic3RhcnRUaW1lIiwic3Vic3RyIiwiZW5kVGltZSIsIkVTQ0FQRSIsIlRBR19OQU1FIiwiYyIsImIiLCJ1IiwicnVieSIsInJ0IiwibGFuZyIsIlRBR19BTk5PVEFUSU9OIiwiTkVFRFNfUEFSRU5UIiwicGFyc2VDb250ZW50Iiwid2luZG93IiwibmV4dFRva2VuIiwiY29uc3VtZSIsInJlc3VsdCIsInVuZXNjYXBlMSIsImUiLCJ1bmVzY2FwZSIsInNob3VsZEFkZCIsImN1cnJlbnQiLCJlbGVtZW50IiwibG9jYWxOYW1lIiwiY3JlYXRlRWxlbWVudCIsInR5cGUiLCJhbm5vdGF0aW9uIiwidGFnTmFtZSIsImRvY3VtZW50IiwidHJpbSIsInJvb3REaXYiLCJ0IiwidGFnU3RhY2siLCJwb3AiLCJwYXJlbnROb2RlIiwibm9kZSIsImNyZWF0ZVByb2Nlc3NpbmdJbnN0cnVjdGlvbiIsImFwcGVuZENoaWxkIiwiY2xhc3NOYW1lIiwicHVzaCIsImNyZWF0ZVRleHROb2RlIiwic3Ryb25nUlRMQ2hhcnMiLCJkZXRlcm1pbmVCaWRpIiwiY3VlRGl2Iiwibm9kZVN0YWNrIiwidGV4dCIsImNoYXJDb2RlIiwiY2hpbGROb2RlcyIsInB1c2hOb2RlcyIsIm5leHRUZXh0Tm9kZSIsInRleHRDb250ZW50IiwiaW5uZXJUZXh0IiwiY2hhckNvZGVBdCIsImoiLCJjb21wdXRlTGluZVBvcyIsImxpbmUiLCJzbmFwVG9MaW5lcyIsInRyYWNrIiwidGV4dFRyYWNrTGlzdCIsIm1lZGlhRWxlbWVudCIsInRyYWNrTGlzdCIsImNvdW50IiwibW9kZSIsIlN0eWxlQm94IiwiYXBwbHlTdHlsZXMiLCJzdHlsZXMiLCJkaXYiLCJwcm9wIiwiaGFzT3duUHJvcGVydHkiLCJzdHlsZSIsImZvcm1hdFN0eWxlIiwidmFsIiwidW5pdCIsIkN1ZVN0eWxlQm94Iiwic3R5bGVPcHRpb25zIiwiaXNJRTgiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJ0ZXh0U2hhZG93IiwiY2FsbCIsInBvc2l0aW9uIiwibGVmdCIsInJpZ2h0IiwidG9wIiwiYm90dG9tIiwiZGlzcGxheSIsIndyaXRpbmdNb2RlIiwidmVydGljYWwiLCJ1bmljb2RlQmlkaSIsInRleHRBbGlnbiIsImFsaWduIiwiZm9udCIsIndoaXRlU3BhY2UiLCJkaXJlY3Rpb24iLCJzdHlsZXN1bmljb2RlQmlkaSIsInRleHRQb3MiLCJwb3NpdGlvbkFsaWduIiwic2l6ZSIsIndpZHRoIiwiaGVpZ2h0IiwibW92ZSIsImJveCIsIkJveFBvc2l0aW9uIiwib2JqIiwibGgiLCJvZmZzZXRIZWlnaHQiLCJvZmZzZXRXaWR0aCIsIm9mZnNldFRvcCIsInJlY3RzIiwiZ2V0Q2xpZW50UmVjdHMiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJNYXRoIiwibWF4IiwibGluZUhlaWdodCIsImF4aXMiLCJ0b01vdmUiLCJvdmVybGFwcyIsImIyIiwib3ZlcmxhcHNBbnkiLCJib3hlcyIsIndpdGhpbiIsImNvbnRhaW5lciIsIm92ZXJsYXBzT3Bwb3NpdGVBeGlzIiwiaW50ZXJzZWN0UGVyY2VudGFnZSIsIngiLCJtaW4iLCJ5IiwiaW50ZXJzZWN0QXJlYSIsInRvQ1NTQ29tcGF0VmFsdWVzIiwicmVmZXJlbmNlIiwiZ2V0U2ltcGxlQm94UG9zaXRpb24iLCJyZXQiLCJtb3ZlQm94VG9MaW5lUG9zaXRpb24iLCJzdHlsZUJveCIsImNvbnRhaW5lckJveCIsImJveFBvc2l0aW9ucyIsImZpbmRCZXN0UG9zaXRpb24iLCJiZXN0UG9zaXRpb24iLCJzcGVjaWZpZWRQb3NpdGlvbiIsInBlcmNlbnRhZ2UiLCJwIiwiYm94UG9zaXRpb24iLCJsaW5lUG9zIiwic3RlcCIsInJvdW5kIiwibWF4UG9zaXRpb24iLCJpbml0aWFsQXhpcyIsImFicyIsImNlaWwiLCJyZXZlcnNlIiwiY2FsY3VsYXRlZFBlcmNlbnRhZ2UiLCJsaW5lQWxpZ24iLCJTdHJpbmdEZWNvZGVyIiwiZGVjb2RlIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiY29udmVydEN1ZVRvRE9NVHJlZSIsImN1ZXRleHQiLCJGT05UX1NJWkVfUEVSQ0VOVCIsIkZPTlRfU1RZTEUiLCJDVUVfQkFDS0dST1VORF9QQURESU5HIiwicHJvY2Vzc0N1ZXMiLCJjdWVzIiwib3ZlcmxheSIsImZpcnN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsInBhZGRlZE92ZXJsYXkiLCJtYXJnaW4iLCJzaG91bGRDb21wdXRlIiwiaGFzQmVlblJlc2V0IiwiZGlzcGxheVN0YXRlIiwiZm9udFNpemUiLCJQYXJzZXIiLCJkZWNvZGVyIiwic3RhdGUiLCJidWZmZXIiLCJUZXh0RGVjb2RlciIsInJlcG9ydE9yVGhyb3dFcnJvciIsIm9ucGFyc2luZ2Vycm9yIiwicGFyc2UiLCJmbHVzaGluZyIsInNlbGYiLCJzdHJlYW0iLCJjb2xsZWN0TmV4dExpbmUiLCJwb3MiLCJwYXJzZVJlZ2lvbiIsInh5IiwiYW5jaG9yIiwiVlRUUmVnaW9uIiwibGluZXMiLCJyZWdpb25BbmNob3JYIiwicmVnaW9uQW5jaG9yWSIsInZpZXdwb3J0QW5jaG9yWCIsInZpZXdwb3J0QW5jaG9yWSIsInNjcm9sbCIsIm9ucmVnaW9uIiwicGFyc2VIZWFkZXIiLCJhbHJlYWR5Q29sbGVjdGVkTGluZSIsIlZUVEN1ZSIsImluZGV4T2YiLCJoYXNTdWJzdHJpbmciLCJvbmN1ZSIsImZsdXNoIiwib25mbHVzaCIsInNjcm9sbFNldHRpbmciLCJmaW5kU2Nyb2xsU2V0dGluZyIsInZhbHVlIiwidG9Mb3dlckNhc2UiLCJpc1ZhbGlkUGVyY2VudFZhbHVlIiwiX3dpZHRoIiwiX2xpbmVzIiwiX3JlZ2lvbkFuY2hvclgiLCJfcmVnaW9uQW5jaG9yWSIsIl92aWV3cG9ydEFuY2hvclgiLCJfdmlld3BvcnRBbmNob3JZIiwiX3Njcm9sbCIsImRlZmluZVByb3BlcnRpZXMiLCJlbnVtZXJhYmxlIiwiVHlwZUVycm9yIiwic2V0dGluZyIsIlN5bnRheEVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBO0FBQ0E7O0FBckJBO0FBdUJBLElBQUlBLFNBQVMsU0FBVEEsTUFBUyxHQUFVLENBQUUsQ0FBekI7QUFDQSxTQUFTQyxZQUFULENBQXNCQyxLQUF0QixFQUE2QkMsT0FBN0IsRUFBc0M7QUFDbEMsUUFBR0EsWUFBWUMsU0FBZixFQUEwQjtBQUN0QkQsa0JBQVUsQ0FBVjtBQUNIO0FBQ0QsV0FBTyxVQUFVLENBQUNFLFNBQVNILE1BQU1JLFNBQU4sQ0FBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsQ0FBVCxFQUFnQyxFQUFoQyxDQUFELEVBQ1RELFNBQVNILE1BQU1JLFNBQU4sQ0FBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsQ0FBVCxFQUFnQyxFQUFoQyxDQURTLEVBRVRELFNBQVNILE1BQU1JLFNBQU4sQ0FBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsQ0FBVCxFQUFnQyxFQUFoQyxDQUZTLEVBR1RILE9BSFMsRUFHQUksSUFIQSxDQUdLLEdBSEwsQ0FBVixHQUdzQixHQUg3QjtBQUlIOztBQUVELElBQUlDLGNBQWMsQ0FBQyxtQkFBRCxFQUFzQixxQkFBdEIsRUFBNkMsbUJBQTdDLEVBQ2QsaUJBRGMsRUFDSyxtQkFETCxFQUVkLG1CQUZjLEVBRU8sa0JBRlAsQ0FBbEI7O0FBSUEsSUFBSUMsWUFBWSxDQUFoQjs7QUFFQSxTQUFTQyxPQUFULENBQWlCQyxPQUFqQixFQUEwQkMsS0FBMUIsRUFBaUNDLElBQWpDLEVBQXVDO0FBQ25DLFlBQVFBLElBQVI7QUFDSSxhQUFLLG1CQUFMO0FBQ0EsYUFBSyxxQkFBTDtBQUNJLGdC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cyAtIHYwLjEyLjEgKGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL3Z0dC5qcykgYnVpbHQgb24gMDMtMTItMjAxNSAqL1xuaW1wb3J0IFZUVEN1ZSBmcm9tICd1dGlscy9jYXB0aW9ucy92dHRDdWUnO1xuaW1wb3J0IFZUVFJlZ2lvbiBmcm9tICd1dGlscy9jYXB0aW9ucy92dHRSZWdpb24nO1xuXG4vKipcbiAqIENvcHlyaWdodCAyMDEzIHZ0dC5qcyBDb250cmlidXRvcnNcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qIC0qLSBNb2RlOiBKYXZhOyB0YWItd2lkdGg6IDI7IGluZGVudC10YWJzLW1vZGU6IG5pbDsgYy1iYXNpYy1vZmZzZXQ6IDIgLSotICovXG4vKiB2aW06IHNldCBzaGlmdHdpZHRoPTIgdGFic3RvcD0yIGF1dG9pbmRlbnQgY2luZGVudCBleHBhbmR0YWI6ICovXG5cbmxldCBXZWJWVFQgPSBmdW5jdGlvbigpe307XG5mdW5jdGlvbiBtYWtlQ29sb3JTZXQoY29sb3IsIG9wYWNpdHkpIHtcbiAgICBpZihvcGFjaXR5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgb3BhY2l0eSA9IDE7XG4gICAgfVxuICAgIHJldHVybiBcInJnYmEoXCIgKyBbcGFyc2VJbnQoY29sb3Iuc3Vic3RyaW5nKDAsIDIpLCAxNiksXG4gICAgICAgICAgICBwYXJzZUludChjb2xvci5zdWJzdHJpbmcoMiwgNCksIDE2KSxcbiAgICAgICAgICAgIHBhcnNlSW50KGNvbG9yLnN1YnN0cmluZyg0LCA2KSwgMTYpLFxuICAgICAgICAgICAgb3BhY2l0eV0uam9pbihcIixcIikgKyBcIilcIjtcbn1cblxudmFyIFdlYlZUVFByZWZzID0gWyd3ZWJ2dHQuZm9udC5jb2xvcicsICd3ZWJ2dHQuZm9udC5vcGFjaXR5JywgJ3dlYnZ0dC5mb250LnNjYWxlJyxcbiAgICAnd2VidnR0LmJnLmNvbG9yJywgJ3dlYnZ0dC5iZy5vcGFjaXR5JyxcbiAgICAnd2VidnR0LmVkZ2UuY29sb3InLCAnd2VidnR0LmVkZ2UudHlwZSddO1xuXG52YXIgZm9udFNjYWxlID0gMTtcblxuZnVuY3Rpb24gb2JzZXJ2ZShzdWJqZWN0LCB0b3BpYywgZGF0YSkge1xuICAgIHN3aXRjaCAoZGF0YSkge1xuICAgICAgICBjYXNlIFwid2VidnR0LmZvbnQuY29sb3JcIjpcbiAgICAgICAgY2FzZSBcIndlYnZ0dC5mb250Lm9wYWNpdHlcIjpcbiAgICAgICAgICAgIHZhciBmb250Q29sb3IgPSBTZXJ2aWNlcy5wcmVmcy5nZXRDaGFyUHJlZihcIndlYnZ0dC5mb250LmNvbG9yXCIpO1xuICAgICAgICAgICAgdmFyIGZvbnRPcGFjaXR5ID0gU2VydmljZXMucHJlZnMuZ2V0SW50UHJlZihcIndlYnZ0dC5mb250Lm9wYWNpdHlcIikgLyAxMDA7XG4gICAgICAgICAgICBXZWJWVFRTZXQuZm9udFNldCA9IG1ha2VDb2xvclNldChmb250Q29sb3IsIGZvbnRPcGFjaXR5KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwid2VidnR0LmZvbnQuc2NhbGVcIjpcbiAgICAgICAgICAgIGZvbnRTY2FsZSA9IFNlcnZpY2VzLnByZWZzLmdldEludFByZWYoXCJ3ZWJ2dHQuZm9udC5zY2FsZVwiKSAvIDEwMDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwid2VidnR0LmJnLmNvbG9yXCI6XG4gICAgICAgIGNhc2UgXCJ3ZWJ2dHQuYmcub3BhY2l0eVwiOlxuICAgICAgICAgICAgdmFyIGJhY2tncm91bmRDb2xvciA9IFNlcnZpY2VzLnByZWZzLmdldENoYXJQcmVmKFwid2VidnR0LmJnLmNvbG9yXCIpO1xuICAgICAgICAgICAgdmFyIGJhY2tncm91bmRPcGFjaXR5ID0gU2VydmljZXMucHJlZnMuZ2V0SW50UHJlZihcIndlYnZ0dC5iZy5vcGFjaXR5XCIpIC8gMTAwO1xuICAgICAgICAgICAgV2ViVlRUU2V0LmJhY2tncm91bmRTZXQgPSBtYWtlQ29sb3JTZXQoYmFja2dyb3VuZENvbG9yLCBiYWNrZ3JvdW5kT3BhY2l0eSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIndlYnZ0dC5lZGdlLmNvbG9yXCI6XG4gICAgICAgIGNhc2UgXCJ3ZWJ2dHQuZWRnZS50eXBlXCI6XG4gICAgICAgICAgICB2YXIgZWRnZVR5cGVMaXN0ID0gW1wiXCIsIFwiMHB4IDBweCBcIiwgXCI0cHggNHB4IDRweCBcIiwgXCItMnB4IC0ycHggXCIsIFwiMnB4IDJweCBcIl07XG4gICAgICAgICAgICB2YXIgZWRnZVR5cGUgPSBTZXJ2aWNlcy5wcmVmcy5nZXRJbnRQcmVmKFwid2VidnR0LmVkZ2UudHlwZVwiKTtcbiAgICAgICAgICAgIHZhciBlZGdlQ29sb3IgPSBTZXJ2aWNlcy5wcmVmcy5nZXRDaGFyUHJlZihcIndlYnZ0dC5lZGdlLmNvbG9yXCIpO1xuICAgICAgICAgICAgV2ViVlRUU2V0LmVkZ2VTZXQgPSBlZGdlVHlwZUxpc3RbZWRnZVR5cGVdICsgbWFrZUNvbG9yU2V0KGVkZ2VDb2xvcik7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG59XG5cbmlmKHR5cGVvZiBTZXJ2aWNlcyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBXZWJWVFRTZXQgPSB7fTtcbiAgICBXZWJWVFRQcmVmcy5mb3JFYWNoKGZ1bmN0aW9uIChwcmVmKSB7XG4gICAgICAgIG9ic2VydmUodW5kZWZpbmVkLCB1bmRlZmluZWQsIHByZWYpO1xuICAgICAgICBTZXJ2aWNlcy5wcmVmcy5hZGRPYnNlcnZlcihwcmVmLCBvYnNlcnZlLCBmYWxzZSk7XG4gICAgfSk7XG59XG5cbnZhciBfb2JqQ3JlYXRlID0gT2JqZWN0LmNyZWF0ZSB8fCAoZnVuY3Rpb24oKSB7XG4gICAgICAgIGZ1bmN0aW9uIEYoKSB7fVxuICAgICAgICByZXR1cm4gZnVuY3Rpb24obykge1xuICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggIT09IDEpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ09iamVjdC5jcmVhdGUgc2hpbSBvbmx5IGFjY2VwdHMgb25lIHBhcmFtZXRlci4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIEYucHJvdG90eXBlID0gbztcbiAgICAgICAgICAgIHJldHVybiBuZXcgRigpO1xuICAgICAgICB9O1xuICAgIH0pKCk7XG5cbi8vIENyZWF0ZXMgYSBuZXcgUGFyc2VyRXJyb3Igb2JqZWN0IGZyb20gYW4gZXJyb3JEYXRhIG9iamVjdC4gVGhlIGVycm9yRGF0YVxuLy8gb2JqZWN0IHNob3VsZCBoYXZlIGRlZmF1bHQgY29kZSBhbmQgbWVzc2FnZSBwcm9wZXJ0aWVzLiBUaGUgZGVmYXVsdCBtZXNzYWdlXG4vLyBwcm9wZXJ0eSBjYW4gYmUgb3ZlcnJpZGVuIGJ5IHBhc3NpbmcgaW4gYSBtZXNzYWdlIHBhcmFtZXRlci5cbi8vIFNlZSBQYXJzaW5nRXJyb3IuRXJyb3JzIGJlbG93IGZvciBhY2NlcHRhYmxlIGVycm9ycy5cbmZ1bmN0aW9uIFBhcnNpbmdFcnJvcihlcnJvckRhdGEsIG1lc3NhZ2UpIHtcbiAgICB0aGlzLm5hbWUgPSBcIlBhcnNpbmdFcnJvclwiO1xuICAgIHRoaXMuY29kZSA9IGVycm9yRGF0YS5jb2RlO1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2UgfHwgZXJyb3JEYXRhLm1lc3NhZ2U7XG59XG5QYXJzaW5nRXJyb3IucHJvdG90eXBlID0gX29iakNyZWF0ZShFcnJvci5wcm90b3R5cGUpO1xuUGFyc2luZ0Vycm9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFBhcnNpbmdFcnJvcjtcblxuLy8gUGFyc2luZ0Vycm9yIG1ldGFkYXRhIGZvciBhY2NlcHRhYmxlIFBhcnNpbmdFcnJvcnMuXG5QYXJzaW5nRXJyb3IuRXJyb3JzID0ge1xuICAgIEJhZFNpZ25hdHVyZToge1xuICAgICAgICBjb2RlOiAwLFxuICAgICAgICBtZXNzYWdlOiBcIk1hbGZvcm1lZCBXZWJWVFQgc2lnbmF0dXJlLlwiXG4gICAgfSxcbiAgICBCYWRUaW1lU3RhbXA6IHtcbiAgICAgICAgY29kZTogMSxcbiAgICAgICAgbWVzc2FnZTogXCJNYWxmb3JtZWQgdGltZSBzdGFtcC5cIlxuICAgIH1cbn07XG5cbi8vIFRyeSB0byBwYXJzZSBpbnB1dCBhcyBhIHRpbWUgc3RhbXAuXG5mdW5jdGlvbiBwYXJzZVRpbWVTdGFtcChpbnB1dCkge1xuXG4gICAgZnVuY3Rpb24gY29tcHV0ZVNlY29uZHMoaCwgbSwgcywgZikge1xuICAgICAgICByZXR1cm4gKGggfCAwKSAqIDM2MDAgKyAobSB8IDApICogNjAgKyAocyB8IDApICsgKGYgfCAwKSAvIDEwMDA7XG4gICAgfVxuXG4gICAgdmFyIG0gPSBpbnB1dC5tYXRjaCgvXihcXGQrKTooXFxkezJ9KSg6XFxkezJ9KT9cXC4oXFxkezN9KS8pO1xuICAgIGlmICghbSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAobVszXSkge1xuICAgICAgICAvLyBUaW1lc3RhbXAgdGFrZXMgdGhlIGZvcm0gb2YgW2hvdXJzXTpbbWludXRlc106W3NlY29uZHNdLlttaWxsaXNlY29uZHNdXG4gICAgICAgIHJldHVybiBjb21wdXRlU2Vjb25kcyhtWzFdLCBtWzJdLCBtWzNdLnJlcGxhY2UoXCI6XCIsIFwiXCIpLCBtWzRdKTtcbiAgICB9IGVsc2UgaWYgKG1bMV0gPiA1OSkge1xuICAgICAgICAvLyBUaW1lc3RhbXAgdGFrZXMgdGhlIGZvcm0gb2YgW2hvdXJzXTpbbWludXRlc10uW21pbGxpc2Vjb25kc11cbiAgICAgICAgLy8gRmlyc3QgcG9zaXRpb24gaXMgaG91cnMgYXMgaXQncyBvdmVyIDU5LlxuICAgICAgICByZXR1cm4gY29tcHV0ZVNlY29uZHMobVsxXSwgbVsyXSwgMCwgIG1bNF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFRpbWVzdGFtcCB0YWtlcyB0aGUgZm9ybSBvZiBbbWludXRlc106W3NlY29uZHNdLlttaWxsaXNlY29uZHNdXG4gICAgICAgIHJldHVybiBjb21wdXRlU2Vjb25kcygwLCBtWzFdLCBtWzJdLCBtWzRdKTtcbiAgICB9XG59XG5cbi8vIEEgc2V0dGluZ3Mgb2JqZWN0IGhvbGRzIGtleS92YWx1ZSBwYWlycyBhbmQgd2lsbCBpZ25vcmUgYW55dGhpbmcgYnV0IHRoZSBmaXJzdFxuLy8gYXNzaWdubWVudCB0byBhIHNwZWNpZmljIGtleS5cbmZ1bmN0aW9uIFNldHRpbmdzKCkge1xuICAgIHRoaXMudmFsdWVzID0gX29iakNyZWF0ZShudWxsKTtcbn1cblxuU2V0dGluZ3MucHJvdG90eXBlID0ge1xuICAgIC8vIE9ubHkgYWNjZXB0IHRoZSBmaXJzdCBhc3NpZ25tZW50IHRvIGFueSBrZXkuXG4gICAgc2V0OiBmdW5jdGlvbihrLCB2KSB7XG4gICAgICAgIGlmICghdGhpcy5nZXQoaykgJiYgdiAhPT0gXCJcIikge1xuICAgICAgICAgICAgdGhpcy52YWx1ZXNba10gPSB2O1xuICAgICAgICB9XG4gICAgfSxcbiAgICAvLyBSZXR1cm4gdGhlIHZhbHVlIGZvciBhIGtleSwgb3IgYSBkZWZhdWx0IHZhbHVlLlxuICAgIC8vIElmICdkZWZhdWx0S2V5JyBpcyBwYXNzZWQgdGhlbiAnZGZsdCcgaXMgYXNzdW1lZCB0byBiZSBhbiBvYmplY3Qgd2l0aFxuICAgIC8vIGEgbnVtYmVyIG9mIHBvc3NpYmxlIGRlZmF1bHQgdmFsdWVzIGFzIHByb3BlcnRpZXMgd2hlcmUgJ2RlZmF1bHRLZXknIGlzXG4gICAgLy8gdGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdGhhdCB3aWxsIGJlIGNob3Nlbjsgb3RoZXJ3aXNlIGl0J3MgYXNzdW1lZCB0byBiZVxuICAgIC8vIGEgc2luZ2xlIHZhbHVlLlxuICAgIGdldDogZnVuY3Rpb24oaywgZGZsdCwgZGVmYXVsdEtleSkge1xuICAgICAgICBpZiAoZGVmYXVsdEtleSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFzKGspID8gdGhpcy52YWx1ZXNba10gOiBkZmx0W2RlZmF1bHRLZXldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmhhcyhrKSA/IHRoaXMudmFsdWVzW2tdIDogZGZsdDtcbiAgICB9LFxuICAgIC8vIENoZWNrIHdoZXRoZXIgd2UgaGF2ZSBhIHZhbHVlIGZvciBhIGtleS5cbiAgICBoYXM6IGZ1bmN0aW9uKGspIHtcbiAgICAgICAgcmV0dXJuIGsgaW4gdGhpcy52YWx1ZXM7XG4gICAgfSxcbiAgICAvLyBBY2NlcHQgYSBzZXR0aW5nIGlmIGl0cyBvbmUgb2YgdGhlIGdpdmVuIGFsdGVybmF0aXZlcy5cbiAgICBhbHQ6IGZ1bmN0aW9uKGssIHYsIGEpIHtcbiAgICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCBhLmxlbmd0aDsgKytuKSB7XG4gICAgICAgICAgICBpZiAodiA9PT0gYVtuXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0KGssIHYpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICAvLyBBY2NlcHQgYSBzZXR0aW5nIGlmIGl0cyBhIHZhbGlkIChzaWduZWQpIGludGVnZXIuXG4gICAgaW50ZWdlcjogZnVuY3Rpb24oaywgdikge1xuICAgICAgICBpZiAoL14tP1xcZCskLy50ZXN0KHYpKSB7IC8vIGludGVnZXJcbiAgICAgICAgICAgIHRoaXMuc2V0KGssIHBhcnNlSW50KHYsIDEwKSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8vIEFjY2VwdCBhIHNldHRpbmcgaWYgaXRzIGEgdmFsaWQgcGVyY2VudGFnZS5cbiAgICBwZXJjZW50OiBmdW5jdGlvbihrLCB2KSB7XG4gICAgICAgIHZhciBtO1xuICAgICAgICBpZiAoKG0gPSB2Lm1hdGNoKC9eKFtcXGRdezEsM30pKFxcLltcXGRdKik/JSQvKSkpIHtcbiAgICAgICAgICAgIHYgPSBwYXJzZUZsb2F0KHYpO1xuICAgICAgICAgICAgaWYgKHYgPj0gMCAmJiB2IDw9IDEwMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0KGssIHYpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59O1xuXG4vLyBIZWxwZXIgZnVuY3Rpb24gdG8gcGFyc2UgaW5wdXQgaW50byBncm91cHMgc2VwYXJhdGVkIGJ5ICdncm91cERlbGltJywgYW5kXG4vLyBpbnRlcnByZXRlIGVhY2ggZ3JvdXAgYXMgYSBrZXkvdmFsdWUgcGFpciBzZXBhcmF0ZWQgYnkgJ2tleVZhbHVlRGVsaW0nLlxuZnVuY3Rpb24gcGFyc2VPcHRpb25zKGlucHV0LCBjYWxsYmFjaywga2V5VmFsdWVEZWxpbSwgZ3JvdXBEZWxpbSkge1xuICAgIHZhciBncm91cHMgPSBncm91cERlbGltID8gaW5wdXQuc3BsaXQoZ3JvdXBEZWxpbSkgOiBbaW5wdXRdO1xuICAgIGZvciAodmFyIGkgaW4gZ3JvdXBzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZ3JvdXBzW2ldICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIga3YgPSBncm91cHNbaV0uc3BsaXQoa2V5VmFsdWVEZWxpbSk7XG4gICAgICAgIGlmIChrdi5sZW5ndGggIT09IDIpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBrID0ga3ZbMF07XG4gICAgICAgIHZhciB2ID0ga3ZbMV07XG4gICAgICAgIGNhbGxiYWNrKGssIHYpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VDdWUoaW5wdXQsIGN1ZSwgcmVnaW9uTGlzdCkge1xuICAgIC8vIFJlbWVtYmVyIHRoZSBvcmlnaW5hbCBpbnB1dCBpZiB3ZSBuZWVkIHRvIHRocm93IGFuIGVycm9yLlxuICAgIHZhciBvSW5wdXQgPSBpbnB1dDtcbiAgICAvLyA0LjEgV2ViVlRUIHRpbWVzdGFtcFxuICAgIGZ1bmN0aW9uIGNvbnN1bWVUaW1lU3RhbXAoKSB7XG4gICAgICAgIHZhciB0cyA9IHBhcnNlVGltZVN0YW1wKGlucHV0KTtcbiAgICAgICAgaWYgKHRzID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2luZ0Vycm9yKFBhcnNpbmdFcnJvci5FcnJvcnMuQmFkVGltZVN0YW1wLFxuICAgICAgICAgICAgICAgIFwiTWFsZm9ybWVkIHRpbWVzdGFtcDogXCIgKyBvSW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFJlbW92ZSB0aW1lIHN0YW1wIGZyb20gaW5wdXQuXG4gICAgICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZSgvXlteXFxzYS16QS1aLV0rLywgXCJcIik7XG4gICAgICAgIHJldHVybiB0cztcbiAgICB9XG5cbiAgICAvLyA0LjQuMiBXZWJWVFQgY3VlIHNldHRpbmdzXG4gICAgZnVuY3Rpb24gY29uc3VtZUN1ZVNldHRpbmdzKGlucHV0LCBjdWUpIHtcbiAgICAgICAgdmFyIHNldHRpbmdzID0gbmV3IFNldHRpbmdzKCk7XG5cbiAgICAgICAgcGFyc2VPcHRpb25zKGlucHV0LCBmdW5jdGlvbiAoaywgdikge1xuICAgICAgICAgICAgc3dpdGNoIChrKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcInJlZ2lvblwiOlxuICAgICAgICAgICAgICAgICAgICAvLyBGaW5kIHRoZSBsYXN0IHJlZ2lvbiB3ZSBwYXJzZWQgd2l0aCB0aGUgc2FtZSByZWdpb24gaWQuXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSByZWdpb25MaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVnaW9uTGlzdFtpXS5pZCA9PT0gdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLnNldChrLCByZWdpb25MaXN0W2ldLnJlZ2lvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInZlcnRpY2FsXCI6XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLmFsdChrLCB2LCBbXCJybFwiLCBcImxyXCJdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImxpbmVcIjpcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHMgPSB2LnNwbGl0KFwiLFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHMwID0gdmFsc1swXTtcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuaW50ZWdlcihrLCB2YWxzMCk7XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLnBlcmNlbnQoaywgdmFsczApID8gc2V0dGluZ3Muc2V0KFwic25hcFRvTGluZXNcIiwgZmFsc2UpIDogbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuYWx0KGssIHZhbHMwLCBbXCJhdXRvXCJdKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5hbHQoXCJsaW5lQWxpZ25cIiwgdmFsc1sxXSwgW1wic3RhcnRcIiwgXCJtaWRkbGVcIiwgXCJlbmRcIl0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJwb3NpdGlvblwiOlxuICAgICAgICAgICAgICAgICAgICB2YWxzID0gdi5zcGxpdChcIixcIik7XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLnBlcmNlbnQoaywgdmFsc1swXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWxzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuYWx0KFwicG9zaXRpb25BbGlnblwiLCB2YWxzWzFdLCBbXCJzdGFydFwiLCBcIm1pZGRsZVwiLCBcImVuZFwiXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInNpemVcIjpcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MucGVyY2VudChrLCB2KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImFsaWduXCI6XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLmFsdChrLCB2LCBbXCJzdGFydFwiLCBcIm1pZGRsZVwiLCBcImVuZFwiLCBcImxlZnRcIiwgXCJyaWdodFwiXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAvOi8sIC9cXHMvKTtcblxuICAgICAgICAvL2hzbGVlIHJlbW92ZSB0aGVzZSBmaWVsZHMuXG4gICAgICAgIC8vQmVjYXVzZSBzYWZhcmkgZGllcyBoZXJlIGFsd2F5cy4gQW5kIFBsYXllciBkb2VuJ3QgdXNlIHN0eWxlIGZpZWxkcy5cbiAgICAgICAgLy8gQXBwbHkgZGVmYXVsdCB2YWx1ZXMgZm9yIGFueSBtaXNzaW5nIGZpZWxkcy5cbiAgICAgICAgLypjdWUucmVnaW9uID0gc2V0dGluZ3MuZ2V0KFwicmVnaW9uXCIsIG51bGwpO1xuICAgICAgICBjdWUudmVydGljYWwgPSBzZXR0aW5ncy5nZXQoXCJ2ZXJ0aWNhbFwiLCBcIlwiKTtcbiAgICAgICAgY3VlLmxpbmUgPSBzZXR0aW5ncy5nZXQoXCJsaW5lXCIsIFwiYXV0b1wiKTtcbiAgICAgICAgY3VlLmxpbmVBbGlnbiA9IHNldHRpbmdzLmdldChcImxpbmVBbGlnblwiLCBcInN0YXJ0XCIpO1xuICAgICAgICBjdWUuc25hcFRvTGluZXMgPSBzZXR0aW5ncy5nZXQoXCJzbmFwVG9MaW5lc1wiLCB0cnVlKTtcbiAgICAgICAgY3VlLnNpemUgPSBzZXR0aW5ncy5nZXQoXCJzaXplXCIsIDEwMCk7XG4gICAgICAgIC8vY3VlLmFsaWduID0gc2V0dGluZ3MuZ2V0KFwiYWxpZ25cIiwgXCJtaWRkbGVcIik7XG4gICAgICAgIGN1ZS5wb3NpdGlvbiA9IHNldHRpbmdzLmdldChcInBvc2l0aW9uXCIsIFwiYXV0b1wiKTtcbiAgICAgICAgY3VlLnBvc2l0aW9uQWxpZ24gPSBzZXR0aW5ncy5nZXQoXCJwb3NpdGlvbkFsaWduXCIsIHtcbiAgICAgICAgICAgIHN0YXJ0OiBcInN0YXJ0XCIsXG4gICAgICAgICAgICBsZWZ0OiBcInN0YXJ0XCIsXG4gICAgICAgICAgICBtaWRkbGU6IFwibWlkZGxlXCIsXG4gICAgICAgICAgICBlbmQ6IFwiZW5kXCIsXG4gICAgICAgICAgICByaWdodDogXCJlbmRcIlxuICAgICAgICB9LCBjdWUuYWxpZ25cbiAgICAgICAgKTsqL1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNraXBXaGl0ZXNwYWNlKCkge1xuICAgICAgICBpbnB1dCA9IGlucHV0LnJlcGxhY2UoL15cXHMrLywgXCJcIik7XG4gICAgfVxuXG4gICAgLy8gNC4xIFdlYlZUVCBjdWUgdGltaW5ncy5cbiAgICBza2lwV2hpdGVzcGFjZSgpO1xuICAgIGN1ZS5zdGFydFRpbWUgPSBjb25zdW1lVGltZVN0YW1wKCk7ICAgLy8gKDEpIGNvbGxlY3QgY3VlIHN0YXJ0IHRpbWVcbiAgICBza2lwV2hpdGVzcGFjZSgpO1xuICAgIGlmIChpbnB1dC5zdWJzdHIoMCwgMykgIT09IFwiLS0+XCIpIHsgICAgIC8vICgzKSBuZXh0IGNoYXJhY3RlcnMgbXVzdCBtYXRjaCBcIi0tPlwiXG4gICAgICAgIHRocm93IG5ldyBQYXJzaW5nRXJyb3IoUGFyc2luZ0Vycm9yLkVycm9ycy5CYWRUaW1lU3RhbXAsXG4gICAgICAgICAgICBcIk1hbGZvcm1lZCB0aW1lIHN0YW1wICh0aW1lIHN0YW1wcyBtdXN0IGJlIHNlcGFyYXRlZCBieSAnLS0+Jyk6IFwiICtcbiAgICAgICAgICAgIG9JbnB1dCk7XG4gICAgfVxuICAgIGlucHV0ID0gaW5wdXQuc3Vic3RyKDMpO1xuICAgIHNraXBXaGl0ZXNwYWNlKCk7XG4gICAgY3VlLmVuZFRpbWUgPSBjb25zdW1lVGltZVN0YW1wKCk7ICAgICAvLyAoNSkgY29sbGVjdCBjdWUgZW5kIHRpbWVcblxuICAgIC8vIDQuMSBXZWJWVFQgY3VlIHNldHRpbmdzIGxpc3QuXG4gICAgc2tpcFdoaXRlc3BhY2UoKTtcbiAgICBjb25zdW1lQ3VlU2V0dGluZ3MoaW5wdXQsIGN1ZSk7XG59XG5cbnZhciBFU0NBUEUgPSB7XG4gICAgXCImYW1wO1wiOiBcIiZcIixcbiAgICBcIiZsdDtcIjogXCI8XCIsXG4gICAgXCImZ3Q7XCI6IFwiPlwiLFxuICAgIFwiJmxybTtcIjogXCJcXHUyMDBlXCIsXG4gICAgXCImcmxtO1wiOiBcIlxcdTIwMGZcIixcbiAgICBcIiZuYnNwO1wiOiBcIlxcdTAwYTBcIlxufTtcblxudmFyIFRBR19OQU1FID0ge1xuICAgIGM6IFwic3BhblwiLFxuICAgIGk6IFwiaVwiLFxuICAgIGI6IFwiYlwiLFxuICAgIHU6IFwidVwiLFxuICAgIHJ1Ynk6IFwicnVieVwiLFxuICAgIHJ0OiBcInJ0XCIsXG4gICAgdjogXCJzcGFuXCIsXG4gICAgbGFuZzogXCJzcGFuXCJcbn07XG5cbnZhciBUQUdfQU5OT1RBVElPTiA9IHtcbiAgICB2OiBcInRpdGxlXCIsXG4gICAgbGFuZzogXCJsYW5nXCJcbn07XG5cbnZhciBORUVEU19QQVJFTlQgPSB7XG4gICAgcnQ6IFwicnVieVwiXG59O1xuXG4vLyBQYXJzZSBjb250ZW50IGludG8gYSBkb2N1bWVudCBmcmFnbWVudC5cbmZ1bmN0aW9uIHBhcnNlQ29udGVudCh3aW5kb3csIGlucHV0KSB7XG4gICAgZnVuY3Rpb24gbmV4dFRva2VuKCkge1xuICAgICAgICAvLyBDaGVjayBmb3IgZW5kLW9mLXN0cmluZy5cbiAgICAgICAgaWYgKCFpbnB1dCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDb25zdW1lICduJyBjaGFyYWN0ZXJzIGZyb20gdGhlIGlucHV0LlxuICAgICAgICBmdW5jdGlvbiBjb25zdW1lKHJlc3VsdCkge1xuICAgICAgICAgICAgaW5wdXQgPSBpbnB1dC5zdWJzdHIocmVzdWx0Lmxlbmd0aCk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG0gPSBpbnB1dC5tYXRjaCgvXihbXjxdKikoPFtePl0rPj8pPy8pO1xuICAgICAgICAvLyBJZiB0aGVyZSBpcyBzb21lIHRleHQgYmVmb3JlIHRoZSBuZXh0IHRhZywgcmV0dXJuIGl0LCBvdGhlcndpc2UgcmV0dXJuXG4gICAgICAgIC8vIHRoZSB0YWcuXG4gICAgICAgIHJldHVybiBjb25zdW1lKG1bMV0gPyBtWzFdIDogbVsyXSk7XG4gICAgfVxuXG4gICAgLy8gVW5lc2NhcGUgYSBzdHJpbmcgJ3MnLlxuICAgIGZ1bmN0aW9uIHVuZXNjYXBlMShlKSB7XG4gICAgICAgIHJldHVybiBFU0NBUEVbZV07XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVuZXNjYXBlKHMpIHtcbiAgICAgICAgd2hpbGUgKChtID0gcy5tYXRjaCgvJihhbXB8bHR8Z3R8bHJtfHJsbXxuYnNwKTsvKSkpIHtcbiAgICAgICAgICAgIHMgPSBzLnJlcGxhY2UobVswXSwgdW5lc2NhcGUxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzaG91bGRBZGQoY3VycmVudCwgZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gIU5FRURTX1BBUkVOVFtlbGVtZW50LmxvY2FsTmFtZV0gfHxcbiAgICAgICAgICAgIE5FRURTX1BBUkVOVFtlbGVtZW50LmxvY2FsTmFtZV0gPT09IGN1cnJlbnQubG9jYWxOYW1lO1xuICAgIH1cblxuICAgIC8vIENyZWF0ZSBhbiBlbGVtZW50IGZvciB0aGlzIHRhZy5cbiAgICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KHR5cGUsIGFubm90YXRpb24pIHtcbiAgICAgICAgdmFyIHRhZ05hbWUgPSBUQUdfTkFNRVt0eXBlXTtcbiAgICAgICAgaWYgKCF0YWdOYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZWxlbWVudCA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuICAgICAgICBlbGVtZW50LmxvY2FsTmFtZSA9IHRhZ05hbWU7XG4gICAgICAgIHZhciBuYW1lID0gVEFHX0FOTk9UQVRJT05bdHlwZV07XG4gICAgICAgIGlmIChuYW1lICYmIGFubm90YXRpb24pIHtcbiAgICAgICAgICAgIGVsZW1lbnRbbmFtZV0gPSBhbm5vdGF0aW9uLnRyaW0oKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG5cbiAgICB2YXIgcm9vdERpdiA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLFxuICAgICAgICBjdXJyZW50ID0gcm9vdERpdixcbiAgICAgICAgdCxcbiAgICAgICAgdGFnU3RhY2sgPSBbXTtcblxuICAgIHdoaWxlICgodCA9IG5leHRUb2tlbigpKSAhPT0gbnVsbCkge1xuICAgICAgICBpZiAodFswXSA9PT0gJzwnKSB7XG4gICAgICAgICAgICBpZiAodFsxXSA9PT0gXCIvXCIpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgY2xvc2luZyB0YWcgbWF0Y2hlcywgbW92ZSBiYWNrIHVwIHRvIHRoZSBwYXJlbnQgbm9kZS5cbiAgICAgICAgICAgICAgICBpZiAodGFnU3RhY2subGVuZ3RoICYmXG4gICAgICAgICAgICAgICAgICAgIHRhZ1N0YWNrW3RhZ1N0YWNrLmxlbmd0aCAtIDFdID09PSB0LnN1YnN0cigyKS5yZXBsYWNlKFwiPlwiLCBcIlwiKSkge1xuICAgICAgICAgICAgICAgICAgICB0YWdTdGFjay5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQucGFyZW50Tm9kZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIGp1c3QgaWdub3JlIHRoZSBlbmQgdGFnLlxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHRzID0gcGFyc2VUaW1lU3RhbXAodC5zdWJzdHIoMSwgdC5sZW5ndGggLSAyKSk7XG4gICAgICAgICAgICB2YXIgbm9kZTtcbiAgICAgICAgICAgIGlmICh0cykge1xuICAgICAgICAgICAgICAgIC8vIFRpbWVzdGFtcHMgYXJlIGxlYWQgbm9kZXMgYXMgd2VsbC5cbiAgICAgICAgICAgICAgICBub2RlID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZVByb2Nlc3NpbmdJbnN0cnVjdGlvbihcInRpbWVzdGFtcFwiLCB0cyk7XG4gICAgICAgICAgICAgICAgY3VycmVudC5hcHBlbmRDaGlsZChub2RlKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBtID0gdC5tYXRjaCgvXjwoW14uXFxzLzAtOT5dKykoXFwuW15cXHNcXFxcPl0rKT8oW14+XFxcXF0rKT8oXFxcXD8pPj8kLyk7XG4gICAgICAgICAgICAvLyBJZiB3ZSBjYW4ndCBwYXJzZSB0aGUgdGFnLCBza2lwIHRvIHRoZSBuZXh0IHRhZy5cbiAgICAgICAgICAgIGlmICghbSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVHJ5IHRvIGNvbnN0cnVjdCBhbiBlbGVtZW50LCBhbmQgaWdub3JlIHRoZSB0YWcgaWYgd2UgY291bGRuJ3QuXG4gICAgICAgICAgICBub2RlID0gY3JlYXRlRWxlbWVudChtWzFdLCBtWzNdKTtcbiAgICAgICAgICAgIGlmICghbm9kZSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRGV0ZXJtaW5lIGlmIHRoZSB0YWcgc2hvdWxkIGJlIGFkZGVkIGJhc2VkIG9uIHRoZSBjb250ZXh0IG9mIHdoZXJlIGl0XG4gICAgICAgICAgICAvLyBpcyBwbGFjZWQgaW4gdGhlIGN1ZXRleHQuXG4gICAgICAgICAgICBpZiAoIXNob3VsZEFkZChjdXJyZW50LCBub2RlKSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gU2V0IHRoZSBjbGFzcyBsaXN0IChhcyBhIGxpc3Qgb2YgY2xhc3Nlcywgc2VwYXJhdGVkIGJ5IHNwYWNlKS5cbiAgICAgICAgICAgIGlmIChtWzJdKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5jbGFzc05hbWUgPSBtWzJdLnN1YnN0cigxKS5yZXBsYWNlKCcuJywgJyAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEFwcGVuZCB0aGUgbm9kZSB0byB0aGUgY3VycmVudCBub2RlLCBhbmQgZW50ZXIgdGhlIHNjb3BlIG9mIHRoZSBuZXdcbiAgICAgICAgICAgIC8vIG5vZGUuXG4gICAgICAgICAgICB0YWdTdGFjay5wdXNoKG1bMV0pO1xuICAgICAgICAgICAgY3VycmVudC5hcHBlbmRDaGlsZChub2RlKTtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBub2RlO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUZXh0IG5vZGVzIGFyZSBsZWFmIG5vZGVzLlxuICAgICAgICBjdXJyZW50LmFwcGVuZENoaWxkKHdpbmRvdy5kb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh1bmVzY2FwZSh0KSkpO1xuICAgIH1cblxuICAgIHJldHVybiByb290RGl2O1xufVxuXG4vLyBUaGlzIGlzIGEgbGlzdCBvZiBhbGwgdGhlIFVuaWNvZGUgY2hhcmFjdGVycyB0aGF0IGhhdmUgYSBzdHJvbmdcbi8vIHJpZ2h0LXRvLWxlZnQgY2F0ZWdvcnkuIFdoYXQgdGhpcyBtZWFucyBpcyB0aGF0IHRoZXNlIGNoYXJhY3RlcnMgYXJlXG4vLyB3cml0dGVuIHJpZ2h0LXRvLWxlZnQgZm9yIHN1cmUuIEl0IHdhcyBnZW5lcmF0ZWQgYnkgcHVsbGluZyBhbGwgdGhlIHN0cm9uZ1xuLy8gcmlnaHQtdG8tbGVmdCBjaGFyYWN0ZXJzIG91dCBvZiB0aGUgVW5pY29kZSBkYXRhIHRhYmxlLiBUaGF0IHRhYmxlIGNhblxuLy8gZm91bmQgYXQ6IGh0dHA6Ly93d3cudW5pY29kZS5vcmcvUHVibGljL1VOSURBVEEvVW5pY29kZURhdGEudHh0XG52YXIgc3Ryb25nUlRMQ2hhcnMgPSBbMHgwNUJFLCAweDA1QzAsIDB4MDVDMywgMHgwNUM2LCAweDA1RDAsIDB4MDVEMSxcbiAgICAweDA1RDIsIDB4MDVEMywgMHgwNUQ0LCAweDA1RDUsIDB4MDVENiwgMHgwNUQ3LCAweDA1RDgsIDB4MDVEOSwgMHgwNURBLFxuICAgIDB4MDVEQiwgMHgwNURDLCAweDA1REQsIDB4MDVERSwgMHgwNURGLCAweDA1RTAsIDB4MDVFMSwgMHgwNUUyLCAweDA1RTMsXG4gICAgMHgwNUU0LCAweDA1RTUsIDB4MDVFNiwgMHgwNUU3LCAweDA1RTgsIDB4MDVFOSwgMHgwNUVBLCAweDA1RjAsIDB4MDVGMSxcbiAgICAweDA1RjIsIDB4MDVGMywgMHgwNUY0LCAweDA2MDgsIDB4MDYwQiwgMHgwNjBELCAweDA2MUIsIDB4MDYxRSwgMHgwNjFGLFxuICAgIDB4MDYyMCwgMHgwNjIxLCAweDA2MjIsIDB4MDYyMywgMHgwNjI0LCAweDA2MjUsIDB4MDYyNiwgMHgwNjI3LCAweDA2MjgsXG4gICAgMHgwNjI5LCAweDA2MkEsIDB4MDYyQiwgMHgwNjJDLCAweDA2MkQsIDB4MDYyRSwgMHgwNjJGLCAweDA2MzAsIDB4MDYzMSxcbiAgICAweDA2MzIsIDB4MDYzMywgMHgwNjM0LCAweDA2MzUsIDB4MDYzNiwgMHgwNjM3LCAweDA2MzgsIDB4MDYzOSwgMHgwNjNBLFxuICAgIDB4MDYzQiwgMHgwNjNDLCAweDA2M0QsIDB4MDYzRSwgMHgwNjNGLCAweDA2NDAsIDB4MDY0MSwgMHgwNjQyLCAweDA2NDMsXG4gICAgMHgwNjQ0LCAweDA2NDUsIDB4MDY0NiwgMHgwNjQ3LCAweDA2NDgsIDB4MDY0OSwgMHgwNjRBLCAweDA2NkQsIDB4MDY2RSxcbiAgICAweDA2NkYsIDB4MDY3MSwgMHgwNjcyLCAweDA2NzMsIDB4MDY3NCwgMHgwNjc1LCAweDA2NzYsIDB4MDY3NywgMHgwNjc4LFxuICAgIDB4MDY3OSwgMHgwNjdBLCAweDA2N0IsIDB4MDY3QywgMHgwNjdELCAweDA2N0UsIDB4MDY3RiwgMHgwNjgwLCAweDA2ODEsXG4gICAgMHgwNjgyLCAweDA2ODMsIDB4MDY4NCwgMHgwNjg1LCAweDA2ODYsIDB4MDY4NywgMHgwNjg4LCAweDA2ODksIDB4MDY4QSxcbiAgICAweDA2OEIsIDB4MDY4QywgMHgwNjhELCAweDA2OEUsIDB4MDY4RiwgMHgwNjkwLCAweDA2OTEsIDB4MDY5MiwgMHgwNjkzLFxuICAgIDB4MDY5NCwgMHgwNjk1LCAweDA2OTYsIDB4MDY5NywgMHgwNjk4LCAweDA2OTksIDB4MDY5QSwgMHgwNjlCLCAweDA2OUMsXG4gICAgMHgwNjlELCAweDA2OUUsIDB4MDY5RiwgMHgwNkEwLCAweDA2QTEsIDB4MDZBMiwgMHgwNkEzLCAweDA2QTQsIDB4MDZBNSxcbiAgICAweDA2QTYsIDB4MDZBNywgMHgwNkE4LCAweDA2QTksIDB4MDZBQSwgMHgwNkFCLCAweDA2QUMsIDB4MDZBRCwgMHgwNkFFLFxuICAgIDB4MDZBRiwgMHgwNkIwLCAweDA2QjEsIDB4MDZCMiwgMHgwNkIzLCAweDA2QjQsIDB4MDZCNSwgMHgwNkI2LCAweDA2QjcsXG4gICAgMHgwNkI4LCAweDA2QjksIDB4MDZCQSwgMHgwNkJCLCAweDA2QkMsIDB4MDZCRCwgMHgwNkJFLCAweDA2QkYsIDB4MDZDMCxcbiAgICAweDA2QzEsIDB4MDZDMiwgMHgwNkMzLCAweDA2QzQsIDB4MDZDNSwgMHgwNkM2LCAweDA2QzcsIDB4MDZDOCwgMHgwNkM5LFxuICAgIDB4MDZDQSwgMHgwNkNCLCAweDA2Q0MsIDB4MDZDRCwgMHgwNkNFLCAweDA2Q0YsIDB4MDZEMCwgMHgwNkQxLCAweDA2RDIsXG4gICAgMHgwNkQzLCAweDA2RDQsIDB4MDZENSwgMHgwNkU1LCAweDA2RTYsIDB4MDZFRSwgMHgwNkVGLCAweDA2RkEsIDB4MDZGQixcbiAgICAweDA2RkMsIDB4MDZGRCwgMHgwNkZFLCAweDA2RkYsIDB4MDcwMCwgMHgwNzAxLCAweDA3MDIsIDB4MDcwMywgMHgwNzA0LFxuICAgIDB4MDcwNSwgMHgwNzA2LCAweDA3MDcsIDB4MDcwOCwgMHgwNzA5LCAweDA3MEEsIDB4MDcwQiwgMHgwNzBDLCAweDA3MEQsXG4gICAgMHgwNzBGLCAweDA3MTAsIDB4MDcxMiwgMHgwNzEzLCAweDA3MTQsIDB4MDcxNSwgMHgwNzE2LCAweDA3MTcsIDB4MDcxOCxcbiAgICAweDA3MTksIDB4MDcxQSwgMHgwNzFCLCAweDA3MUMsIDB4MDcxRCwgMHgwNzFFLCAweDA3MUYsIDB4MDcyMCwgMHgwNzIxLFxuICAgIDB4MDcyMiwgMHgwNzIzLCAweDA3MjQsIDB4MDcyNSwgMHgwNzI2LCAweDA3MjcsIDB4MDcyOCwgMHgwNzI5LCAweDA3MkEsXG4gICAgMHgwNzJCLCAweDA3MkMsIDB4MDcyRCwgMHgwNzJFLCAweDA3MkYsIDB4MDc0RCwgMHgwNzRFLCAweDA3NEYsIDB4MDc1MCxcbiAgICAweDA3NTEsIDB4MDc1MiwgMHgwNzUzLCAweDA3NTQsIDB4MDc1NSwgMHgwNzU2LCAweDA3NTcsIDB4MDc1OCwgMHgwNzU5LFxuICAgIDB4MDc1QSwgMHgwNzVCLCAweDA3NUMsIDB4MDc1RCwgMHgwNzVFLCAweDA3NUYsIDB4MDc2MCwgMHgwNzYxLCAweDA3NjIsXG4gICAgMHgwNzYzLCAweDA3NjQsIDB4MDc2NSwgMHgwNzY2LCAweDA3NjcsIDB4MDc2OCwgMHgwNzY5LCAweDA3NkEsIDB4MDc2QixcbiAgICAweDA3NkMsIDB4MDc2RCwgMHgwNzZFLCAweDA3NkYsIDB4MDc3MCwgMHgwNzcxLCAweDA3NzIsIDB4MDc3MywgMHgwNzc0LFxuICAgIDB4MDc3NSwgMHgwNzc2LCAweDA3NzcsIDB4MDc3OCwgMHgwNzc5LCAweDA3N0EsIDB4MDc3QiwgMHgwNzdDLCAweDA3N0QsXG4gICAgMHgwNzdFLCAweDA3N0YsIDB4MDc4MCwgMHgwNzgxLCAweDA3ODIsIDB4MDc4MywgMHgwNzg0LCAweDA3ODUsIDB4MDc4NixcbiAgICAweDA3ODcsIDB4MDc4OCwgMHgwNzg5LCAweDA3OEEsIDB4MDc4QiwgMHgwNzhDLCAweDA3OEQsIDB4MDc4RSwgMHgwNzhGLFxuICAgIDB4MDc5MCwgMHgwNzkxLCAweDA3OTIsIDB4MDc5MywgMHgwNzk0LCAweDA3OTUsIDB4MDc5NiwgMHgwNzk3LCAweDA3OTgsXG4gICAgMHgwNzk5LCAweDA3OUEsIDB4MDc5QiwgMHgwNzlDLCAweDA3OUQsIDB4MDc5RSwgMHgwNzlGLCAweDA3QTAsIDB4MDdBMSxcbiAgICAweDA3QTIsIDB4MDdBMywgMHgwN0E0LCAweDA3QTUsIDB4MDdCMSwgMHgwN0MwLCAweDA3QzEsIDB4MDdDMiwgMHgwN0MzLFxuICAgIDB4MDdDNCwgMHgwN0M1LCAweDA3QzYsIDB4MDdDNywgMHgwN0M4LCAweDA3QzksIDB4MDdDQSwgMHgwN0NCLCAweDA3Q0MsXG4gICAgMHgwN0NELCAweDA3Q0UsIDB4MDdDRiwgMHgwN0QwLCAweDA3RDEsIDB4MDdEMiwgMHgwN0QzLCAweDA3RDQsIDB4MDdENSxcbiAgICAweDA3RDYsIDB4MDdENywgMHgwN0Q4LCAweDA3RDksIDB4MDdEQSwgMHgwN0RCLCAweDA3REMsIDB4MDdERCwgMHgwN0RFLFxuICAgIDB4MDdERiwgMHgwN0UwLCAweDA3RTEsIDB4MDdFMiwgMHgwN0UzLCAweDA3RTQsIDB4MDdFNSwgMHgwN0U2LCAweDA3RTcsXG4gICAgMHgwN0U4LCAweDA3RTksIDB4MDdFQSwgMHgwN0Y0LCAweDA3RjUsIDB4MDdGQSwgMHgwODAwLCAweDA4MDEsIDB4MDgwMixcbiAgICAweDA4MDMsIDB4MDgwNCwgMHgwODA1LCAweDA4MDYsIDB4MDgwNywgMHgwODA4LCAweDA4MDksIDB4MDgwQSwgMHgwODBCLFxuICAgIDB4MDgwQywgMHgwODBELCAweDA4MEUsIDB4MDgwRiwgMHgwODEwLCAweDA4MTEsIDB4MDgxMiwgMHgwODEzLCAweDA4MTQsXG4gICAgMHgwODE1LCAweDA4MUEsIDB4MDgyNCwgMHgwODI4LCAweDA4MzAsIDB4MDgzMSwgMHgwODMyLCAweDA4MzMsIDB4MDgzNCxcbiAgICAweDA4MzUsIDB4MDgzNiwgMHgwODM3LCAweDA4MzgsIDB4MDgzOSwgMHgwODNBLCAweDA4M0IsIDB4MDgzQywgMHgwODNELFxuICAgIDB4MDgzRSwgMHgwODQwLCAweDA4NDEsIDB4MDg0MiwgMHgwODQzLCAweDA4NDQsIDB4MDg0NSwgMHgwODQ2LCAweDA4NDcsXG4gICAgMHgwODQ4LCAweDA4NDksIDB4MDg0QSwgMHgwODRCLCAweDA4NEMsIDB4MDg0RCwgMHgwODRFLCAweDA4NEYsIDB4MDg1MCxcbiAgICAweDA4NTEsIDB4MDg1MiwgMHgwODUzLCAweDA4NTQsIDB4MDg1NSwgMHgwODU2LCAweDA4NTcsIDB4MDg1OCwgMHgwODVFLFxuICAgIDB4MDhBMCwgMHgwOEEyLCAweDA4QTMsIDB4MDhBNCwgMHgwOEE1LCAweDA4QTYsIDB4MDhBNywgMHgwOEE4LCAweDA4QTksXG4gICAgMHgwOEFBLCAweDA4QUIsIDB4MDhBQywgMHgyMDBGLCAweEZCMUQsIDB4RkIxRiwgMHhGQjIwLCAweEZCMjEsIDB4RkIyMixcbiAgICAweEZCMjMsIDB4RkIyNCwgMHhGQjI1LCAweEZCMjYsIDB4RkIyNywgMHhGQjI4LCAweEZCMkEsIDB4RkIyQiwgMHhGQjJDLFxuICAgIDB4RkIyRCwgMHhGQjJFLCAweEZCMkYsIDB4RkIzMCwgMHhGQjMxLCAweEZCMzIsIDB4RkIzMywgMHhGQjM0LCAweEZCMzUsXG4gICAgMHhGQjM2LCAweEZCMzgsIDB4RkIzOSwgMHhGQjNBLCAweEZCM0IsIDB4RkIzQywgMHhGQjNFLCAweEZCNDAsIDB4RkI0MSxcbiAgICAweEZCNDMsIDB4RkI0NCwgMHhGQjQ2LCAweEZCNDcsIDB4RkI0OCwgMHhGQjQ5LCAweEZCNEEsIDB4RkI0QiwgMHhGQjRDLFxuICAgIDB4RkI0RCwgMHhGQjRFLCAweEZCNEYsIDB4RkI1MCwgMHhGQjUxLCAweEZCNTIsIDB4RkI1MywgMHhGQjU0LCAweEZCNTUsXG4gICAgMHhGQjU2LCAweEZCNTcsIDB4RkI1OCwgMHhGQjU5LCAweEZCNUEsIDB4RkI1QiwgMHhGQjVDLCAweEZCNUQsIDB4RkI1RSxcbiAgICAweEZCNUYsIDB4RkI2MCwgMHhGQjYxLCAweEZCNjIsIDB4RkI2MywgMHhGQjY0LCAweEZCNjUsIDB4RkI2NiwgMHhGQjY3LFxuICAgIDB4RkI2OCwgMHhGQjY5LCAweEZCNkEsIDB4RkI2QiwgMHhGQjZDLCAweEZCNkQsIDB4RkI2RSwgMHhGQjZGLCAweEZCNzAsXG4gICAgMHhGQjcxLCAweEZCNzIsIDB4RkI3MywgMHhGQjc0LCAweEZCNzUsIDB4RkI3NiwgMHhGQjc3LCAweEZCNzgsIDB4RkI3OSxcbiAgICAweEZCN0EsIDB4RkI3QiwgMHhGQjdDLCAweEZCN0QsIDB4RkI3RSwgMHhGQjdGLCAweEZCODAsIDB4RkI4MSwgMHhGQjgyLFxuICAgIDB4RkI4MywgMHhGQjg0LCAweEZCODUsIDB4RkI4NiwgMHhGQjg3LCAweEZCODgsIDB4RkI4OSwgMHhGQjhBLCAweEZCOEIsXG4gICAgMHhGQjhDLCAweEZCOEQsIDB4RkI4RSwgMHhGQjhGLCAweEZCOTAsIDB4RkI5MSwgMHhGQjkyLCAweEZCOTMsIDB4RkI5NCxcbiAgICAweEZCOTUsIDB4RkI5NiwgMHhGQjk3LCAweEZCOTgsIDB4RkI5OSwgMHhGQjlBLCAweEZCOUIsIDB4RkI5QywgMHhGQjlELFxuICAgIDB4RkI5RSwgMHhGQjlGLCAweEZCQTAsIDB4RkJBMSwgMHhGQkEyLCAweEZCQTMsIDB4RkJBNCwgMHhGQkE1LCAweEZCQTYsXG4gICAgMHhGQkE3LCAweEZCQTgsIDB4RkJBOSwgMHhGQkFBLCAweEZCQUIsIDB4RkJBQywgMHhGQkFELCAweEZCQUUsIDB4RkJBRixcbiAgICAweEZCQjAsIDB4RkJCMSwgMHhGQkIyLCAweEZCQjMsIDB4RkJCNCwgMHhGQkI1LCAweEZCQjYsIDB4RkJCNywgMHhGQkI4LFxuICAgIDB4RkJCOSwgMHhGQkJBLCAweEZCQkIsIDB4RkJCQywgMHhGQkJELCAweEZCQkUsIDB4RkJCRiwgMHhGQkMwLCAweEZCQzEsXG4gICAgMHhGQkQzLCAweEZCRDQsIDB4RkJENSwgMHhGQkQ2LCAweEZCRDcsIDB4RkJEOCwgMHhGQkQ5LCAweEZCREEsIDB4RkJEQixcbiAgICAweEZCREMsIDB4RkJERCwgMHhGQkRFLCAweEZCREYsIDB4RkJFMCwgMHhGQkUxLCAweEZCRTIsIDB4RkJFMywgMHhGQkU0LFxuICAgIDB4RkJFNSwgMHhGQkU2LCAweEZCRTcsIDB4RkJFOCwgMHhGQkU5LCAweEZCRUEsIDB4RkJFQiwgMHhGQkVDLCAweEZCRUQsXG4gICAgMHhGQkVFLCAweEZCRUYsIDB4RkJGMCwgMHhGQkYxLCAweEZCRjIsIDB4RkJGMywgMHhGQkY0LCAweEZCRjUsIDB4RkJGNixcbiAgICAweEZCRjcsIDB4RkJGOCwgMHhGQkY5LCAweEZCRkEsIDB4RkJGQiwgMHhGQkZDLCAweEZCRkQsIDB4RkJGRSwgMHhGQkZGLFxuICAgIDB4RkMwMCwgMHhGQzAxLCAweEZDMDIsIDB4RkMwMywgMHhGQzA0LCAweEZDMDUsIDB4RkMwNiwgMHhGQzA3LCAweEZDMDgsXG4gICAgMHhGQzA5LCAweEZDMEEsIDB4RkMwQiwgMHhGQzBDLCAweEZDMEQsIDB4RkMwRSwgMHhGQzBGLCAweEZDMTAsIDB4RkMxMSxcbiAgICAweEZDMTIsIDB4RkMxMywgMHhGQzE0LCAweEZDMTUsIDB4RkMxNiwgMHhGQzE3LCAweEZDMTgsIDB4RkMxOSwgMHhGQzFBLFxuICAgIDB4RkMxQiwgMHhGQzFDLCAweEZDMUQsIDB4RkMxRSwgMHhGQzFGLCAweEZDMjAsIDB4RkMyMSwgMHhGQzIyLCAweEZDMjMsXG4gICAgMHhGQzI0LCAweEZDMjUsIDB4RkMyNiwgMHhGQzI3LCAweEZDMjgsIDB4RkMyOSwgMHhGQzJBLCAweEZDMkIsIDB4RkMyQyxcbiAgICAweEZDMkQsIDB4RkMyRSwgMHhGQzJGLCAweEZDMzAsIDB4RkMzMSwgMHhGQzMyLCAweEZDMzMsIDB4RkMzNCwgMHhGQzM1LFxuICAgIDB4RkMzNiwgMHhGQzM3LCAweEZDMzgsIDB4RkMzOSwgMHhGQzNBLCAweEZDM0IsIDB4RkMzQywgMHhGQzNELCAweEZDM0UsXG4gICAgMHhGQzNGLCAweEZDNDAsIDB4RkM0MSwgMHhGQzQyLCAweEZDNDMsIDB4RkM0NCwgMHhGQzQ1LCAweEZDNDYsIDB4RkM0NyxcbiAgICAweEZDNDgsIDB4RkM0OSwgMHhGQzRBLCAweEZDNEIsIDB4RkM0QywgMHhGQzRELCAweEZDNEUsIDB4RkM0RiwgMHhGQzUwLFxuICAgIDB4RkM1MSwgMHhGQzUyLCAweEZDNTMsIDB4RkM1NCwgMHhGQzU1LCAweEZDNTYsIDB4RkM1NywgMHhGQzU4LCAweEZDNTksXG4gICAgMHhGQzVBLCAweEZDNUIsIDB4RkM1QywgMHhGQzVELCAweEZDNUUsIDB4RkM1RiwgMHhGQzYwLCAweEZDNjEsIDB4RkM2MixcbiAgICAweEZDNjMsIDB4RkM2NCwgMHhGQzY1LCAweEZDNjYsIDB4RkM2NywgMHhGQzY4LCAweEZDNjksIDB4RkM2QSwgMHhGQzZCLFxuICAgIDB4RkM2QywgMHhGQzZELCAweEZDNkUsIDB4RkM2RiwgMHhGQzcwLCAweEZDNzEsIDB4RkM3MiwgMHhGQzczLCAweEZDNzQsXG4gICAgMHhGQzc1LCAweEZDNzYsIDB4RkM3NywgMHhGQzc4LCAweEZDNzksIDB4RkM3QSwgMHhGQzdCLCAweEZDN0MsIDB4RkM3RCxcbiAgICAweEZDN0UsIDB4RkM3RiwgMHhGQzgwLCAweEZDODEsIDB4RkM4MiwgMHhGQzgzLCAweEZDODQsIDB4RkM4NSwgMHhGQzg2LFxuICAgIDB4RkM4NywgMHhGQzg4LCAweEZDODksIDB4RkM4QSwgMHhGQzhCLCAweEZDOEMsIDB4RkM4RCwgMHhGQzhFLCAweEZDOEYsXG4gICAgMHhGQzkwLCAweEZDOTEsIDB4RkM5MiwgMHhGQzkzLCAweEZDOTQsIDB4RkM5NSwgMHhGQzk2LCAweEZDOTcsIDB4RkM5OCxcbiAgICAweEZDOTksIDB4RkM5QSwgMHhGQzlCLCAweEZDOUMsIDB4RkM5RCwgMHhGQzlFLCAweEZDOUYsIDB4RkNBMCwgMHhGQ0ExLFxuICAgIDB4RkNBMiwgMHhGQ0EzLCAweEZDQTQsIDB4RkNBNSwgMHhGQ0E2LCAweEZDQTcsIDB4RkNBOCwgMHhGQ0E5LCAweEZDQUEsXG4gICAgMHhGQ0FCLCAweEZDQUMsIDB4RkNBRCwgMHhGQ0FFLCAweEZDQUYsIDB4RkNCMCwgMHhGQ0IxLCAweEZDQjIsIDB4RkNCMyxcbiAgICAweEZDQjQsIDB4RkNCNSwgMHhGQ0I2LCAweEZDQjcsIDB4RkNCOCwgMHhGQ0I5LCAweEZDQkEsIDB4RkNCQiwgMHhGQ0JDLFxuICAgIDB4RkNCRCwgMHhGQ0JFLCAweEZDQkYsIDB4RkNDMCwgMHhGQ0MxLCAweEZDQzIsIDB4RkNDMywgMHhGQ0M0LCAweEZDQzUsXG4gICAgMHhGQ0M2LCAweEZDQzcsIDB4RkNDOCwgMHhGQ0M5LCAweEZDQ0EsIDB4RkNDQiwgMHhGQ0NDLCAweEZDQ0QsIDB4RkNDRSxcbiAgICAweEZDQ0YsIDB4RkNEMCwgMHhGQ0QxLCAweEZDRDIsIDB4RkNEMywgMHhGQ0Q0LCAweEZDRDUsIDB4RkNENiwgMHhGQ0Q3LFxuICAgIDB4RkNEOCwgMHhGQ0Q5LCAweEZDREEsIDB4RkNEQiwgMHhGQ0RDLCAweEZDREQsIDB4RkNERSwgMHhGQ0RGLCAweEZDRTAsXG4gICAgMHhGQ0UxLCAweEZDRTIsIDB4RkNFMywgMHhGQ0U0LCAweEZDRTUsIDB4RkNFNiwgMHhGQ0U3LCAweEZDRTgsIDB4RkNFOSxcbiAgICAweEZDRUEsIDB4RkNFQiwgMHhGQ0VDLCAweEZDRUQsIDB4RkNFRSwgMHhGQ0VGLCAweEZDRjAsIDB4RkNGMSwgMHhGQ0YyLFxuICAgIDB4RkNGMywgMHhGQ0Y0LCAweEZDRjUsIDB4RkNGNiwgMHhGQ0Y3LCAweEZDRjgsIDB4RkNGOSwgMHhGQ0ZBLCAweEZDRkIsXG4gICAgMHhGQ0ZDLCAweEZDRkQsIDB4RkNGRSwgMHhGQ0ZGLCAweEZEMDAsIDB4RkQwMSwgMHhGRDAyLCAweEZEMDMsIDB4RkQwNCxcbiAgICAweEZEMDUsIDB4RkQwNiwgMHhGRDA3LCAweEZEMDgsIDB4RkQwOSwgMHhGRDBBLCAweEZEMEIsIDB4RkQwQywgMHhGRDBELFxuICAgIDB4RkQwRSwgMHhGRDBGLCAweEZEMTAsIDB4RkQxMSwgMHhGRDEyLCAweEZEMTMsIDB4RkQxNCwgMHhGRDE1LCAweEZEMTYsXG4gICAgMHhGRDE3LCAweEZEMTgsIDB4RkQxOSwgMHhGRDFBLCAweEZEMUIsIDB4RkQxQywgMHhGRDFELCAweEZEMUUsIDB4RkQxRixcbiAgICAweEZEMjAsIDB4RkQyMSwgMHhGRDIyLCAweEZEMjMsIDB4RkQyNCwgMHhGRDI1LCAweEZEMjYsIDB4RkQyNywgMHhGRDI4LFxuICAgIDB4RkQyOSwgMHhGRDJBLCAweEZEMkIsIDB4RkQyQywgMHhGRDJELCAweEZEMkUsIDB4RkQyRiwgMHhGRDMwLCAweEZEMzEsXG4gICAgMHhGRDMyLCAweEZEMzMsIDB4RkQzNCwgMHhGRDM1LCAweEZEMzYsIDB4RkQzNywgMHhGRDM4LCAweEZEMzksIDB4RkQzQSxcbiAgICAweEZEM0IsIDB4RkQzQywgMHhGRDNELCAweEZENTAsIDB4RkQ1MSwgMHhGRDUyLCAweEZENTMsIDB4RkQ1NCwgMHhGRDU1LFxuICAgIDB4RkQ1NiwgMHhGRDU3LCAweEZENTgsIDB4RkQ1OSwgMHhGRDVBLCAweEZENUIsIDB4RkQ1QywgMHhGRDVELCAweEZENUUsXG4gICAgMHhGRDVGLCAweEZENjAsIDB4RkQ2MSwgMHhGRDYyLCAweEZENjMsIDB4RkQ2NCwgMHhGRDY1LCAweEZENjYsIDB4RkQ2NyxcbiAgICAweEZENjgsIDB4RkQ2OSwgMHhGRDZBLCAweEZENkIsIDB4RkQ2QywgMHhGRDZELCAweEZENkUsIDB4RkQ2RiwgMHhGRDcwLFxuICAgIDB4RkQ3MSwgMHhGRDcyLCAweEZENzMsIDB4RkQ3NCwgMHhGRDc1LCAweEZENzYsIDB4RkQ3NywgMHhGRDc4LCAweEZENzksXG4gICAgMHhGRDdBLCAweEZEN0IsIDB4RkQ3QywgMHhGRDdELCAweEZEN0UsIDB4RkQ3RiwgMHhGRDgwLCAweEZEODEsIDB4RkQ4MixcbiAgICAweEZEODMsIDB4RkQ4NCwgMHhGRDg1LCAweEZEODYsIDB4RkQ4NywgMHhGRDg4LCAweEZEODksIDB4RkQ4QSwgMHhGRDhCLFxuICAgIDB4RkQ4QywgMHhGRDhELCAweEZEOEUsIDB4RkQ4RiwgMHhGRDkyLCAweEZEOTMsIDB4RkQ5NCwgMHhGRDk1LCAweEZEOTYsXG4gICAgMHhGRDk3LCAweEZEOTgsIDB4RkQ5OSwgMHhGRDlBLCAweEZEOUIsIDB4RkQ5QywgMHhGRDlELCAweEZEOUUsIDB4RkQ5RixcbiAgICAweEZEQTAsIDB4RkRBMSwgMHhGREEyLCAweEZEQTMsIDB4RkRBNCwgMHhGREE1LCAweEZEQTYsIDB4RkRBNywgMHhGREE4LFxuICAgIDB4RkRBOSwgMHhGREFBLCAweEZEQUIsIDB4RkRBQywgMHhGREFELCAweEZEQUUsIDB4RkRBRiwgMHhGREIwLCAweEZEQjEsXG4gICAgMHhGREIyLCAweEZEQjMsIDB4RkRCNCwgMHhGREI1LCAweEZEQjYsIDB4RkRCNywgMHhGREI4LCAweEZEQjksIDB4RkRCQSxcbiAgICAweEZEQkIsIDB4RkRCQywgMHhGREJELCAweEZEQkUsIDB4RkRCRiwgMHhGREMwLCAweEZEQzEsIDB4RkRDMiwgMHhGREMzLFxuICAgIDB4RkRDNCwgMHhGREM1LCAweEZEQzYsIDB4RkRDNywgMHhGREYwLCAweEZERjEsIDB4RkRGMiwgMHhGREYzLCAweEZERjQsXG4gICAgMHhGREY1LCAweEZERjYsIDB4RkRGNywgMHhGREY4LCAweEZERjksIDB4RkRGQSwgMHhGREZCLCAweEZERkMsIDB4RkU3MCxcbiAgICAweEZFNzEsIDB4RkU3MiwgMHhGRTczLCAweEZFNzQsIDB4RkU3NiwgMHhGRTc3LCAweEZFNzgsIDB4RkU3OSwgMHhGRTdBLFxuICAgIDB4RkU3QiwgMHhGRTdDLCAweEZFN0QsIDB4RkU3RSwgMHhGRTdGLCAweEZFODAsIDB4RkU4MSwgMHhGRTgyLCAweEZFODMsXG4gICAgMHhGRTg0LCAweEZFODUsIDB4RkU4NiwgMHhGRTg3LCAweEZFODgsIDB4RkU4OSwgMHhGRThBLCAweEZFOEIsIDB4RkU4QyxcbiAgICAweEZFOEQsIDB4RkU4RSwgMHhGRThGLCAweEZFOTAsIDB4RkU5MSwgMHhGRTkyLCAweEZFOTMsIDB4RkU5NCwgMHhGRTk1LFxuICAgIDB4RkU5NiwgMHhGRTk3LCAweEZFOTgsIDB4RkU5OSwgMHhGRTlBLCAweEZFOUIsIDB4RkU5QywgMHhGRTlELCAweEZFOUUsXG4gICAgMHhGRTlGLCAweEZFQTAsIDB4RkVBMSwgMHhGRUEyLCAweEZFQTMsIDB4RkVBNCwgMHhGRUE1LCAweEZFQTYsIDB4RkVBNyxcbiAgICAweEZFQTgsIDB4RkVBOSwgMHhGRUFBLCAweEZFQUIsIDB4RkVBQywgMHhGRUFELCAweEZFQUUsIDB4RkVBRiwgMHhGRUIwLFxuICAgIDB4RkVCMSwgMHhGRUIyLCAweEZFQjMsIDB4RkVCNCwgMHhGRUI1LCAweEZFQjYsIDB4RkVCNywgMHhGRUI4LCAweEZFQjksXG4gICAgMHhGRUJBLCAweEZFQkIsIDB4RkVCQywgMHhGRUJELCAweEZFQkUsIDB4RkVCRiwgMHhGRUMwLCAweEZFQzEsIDB4RkVDMixcbiAgICAweEZFQzMsIDB4RkVDNCwgMHhGRUM1LCAweEZFQzYsIDB4RkVDNywgMHhGRUM4LCAweEZFQzksIDB4RkVDQSwgMHhGRUNCLFxuICAgIDB4RkVDQywgMHhGRUNELCAweEZFQ0UsIDB4RkVDRiwgMHhGRUQwLCAweEZFRDEsIDB4RkVEMiwgMHhGRUQzLCAweEZFRDQsXG4gICAgMHhGRUQ1LCAweEZFRDYsIDB4RkVENywgMHhGRUQ4LCAweEZFRDksIDB4RkVEQSwgMHhGRURCLCAweEZFREMsIDB4RkVERCxcbiAgICAweEZFREUsIDB4RkVERiwgMHhGRUUwLCAweEZFRTEsIDB4RkVFMiwgMHhGRUUzLCAweEZFRTQsIDB4RkVFNSwgMHhGRUU2LFxuICAgIDB4RkVFNywgMHhGRUU4LCAweEZFRTksIDB4RkVFQSwgMHhGRUVCLCAweEZFRUMsIDB4RkVFRCwgMHhGRUVFLCAweEZFRUYsXG4gICAgMHhGRUYwLCAweEZFRjEsIDB4RkVGMiwgMHhGRUYzLCAweEZFRjQsIDB4RkVGNSwgMHhGRUY2LCAweEZFRjcsIDB4RkVGOCxcbiAgICAweEZFRjksIDB4RkVGQSwgMHhGRUZCLCAweEZFRkMsIDB4MTA4MDAsIDB4MTA4MDEsIDB4MTA4MDIsIDB4MTA4MDMsXG4gICAgMHgxMDgwNCwgMHgxMDgwNSwgMHgxMDgwOCwgMHgxMDgwQSwgMHgxMDgwQiwgMHgxMDgwQywgMHgxMDgwRCwgMHgxMDgwRSxcbiAgICAweDEwODBGLCAweDEwODEwLCAweDEwODExLCAweDEwODEyLCAweDEwODEzLCAweDEwODE0LCAweDEwODE1LCAweDEwODE2LFxuICAgIDB4MTA4MTcsIDB4MTA4MTgsIDB4MTA4MTksIDB4MTA4MUEsIDB4MTA4MUIsIDB4MTA4MUMsIDB4MTA4MUQsIDB4MTA4MUUsXG4gICAgMHgxMDgxRiwgMHgxMDgyMCwgMHgxMDgyMSwgMHgxMDgyMiwgMHgxMDgyMywgMHgxMDgyNCwgMHgxMDgyNSwgMHgxMDgyNixcbiAgICAweDEwODI3LCAweDEwODI4LCAweDEwODI5LCAweDEwODJBLCAweDEwODJCLCAweDEwODJDLCAweDEwODJELCAweDEwODJFLFxuICAgIDB4MTA4MkYsIDB4MTA4MzAsIDB4MTA4MzEsIDB4MTA4MzIsIDB4MTA4MzMsIDB4MTA4MzQsIDB4MTA4MzUsIDB4MTA4MzcsXG4gICAgMHgxMDgzOCwgMHgxMDgzQywgMHgxMDgzRiwgMHgxMDg0MCwgMHgxMDg0MSwgMHgxMDg0MiwgMHgxMDg0MywgMHgxMDg0NCxcbiAgICAweDEwODQ1LCAweDEwODQ2LCAweDEwODQ3LCAweDEwODQ4LCAweDEwODQ5LCAweDEwODRBLCAweDEwODRCLCAweDEwODRDLFxuICAgIDB4MTA4NEQsIDB4MTA4NEUsIDB4MTA4NEYsIDB4MTA4NTAsIDB4MTA4NTEsIDB4MTA4NTIsIDB4MTA4NTMsIDB4MTA4NTQsXG4gICAgMHgxMDg1NSwgMHgxMDg1NywgMHgxMDg1OCwgMHgxMDg1OSwgMHgxMDg1QSwgMHgxMDg1QiwgMHgxMDg1QywgMHgxMDg1RCxcbiAgICAweDEwODVFLCAweDEwODVGLCAweDEwOTAwLCAweDEwOTAxLCAweDEwOTAyLCAweDEwOTAzLCAweDEwOTA0LCAweDEwOTA1LFxuICAgIDB4MTA5MDYsIDB4MTA5MDcsIDB4MTA5MDgsIDB4MTA5MDksIDB4MTA5MEEsIDB4MTA5MEIsIDB4MTA5MEMsIDB4MTA5MEQsXG4gICAgMHgxMDkwRSwgMHgxMDkwRiwgMHgxMDkxMCwgMHgxMDkxMSwgMHgxMDkxMiwgMHgxMDkxMywgMHgxMDkxNCwgMHgxMDkxNSxcbiAgICAweDEwOTE2LCAweDEwOTE3LCAweDEwOTE4LCAweDEwOTE5LCAweDEwOTFBLCAweDEwOTFCLCAweDEwOTIwLCAweDEwOTIxLFxuICAgIDB4MTA5MjIsIDB4MTA5MjMsIDB4MTA5MjQsIDB4MTA5MjUsIDB4MTA5MjYsIDB4MTA5MjcsIDB4MTA5MjgsIDB4MTA5MjksXG4gICAgMHgxMDkyQSwgMHgxMDkyQiwgMHgxMDkyQywgMHgxMDkyRCwgMHgxMDkyRSwgMHgxMDkyRiwgMHgxMDkzMCwgMHgxMDkzMSxcbiAgICAweDEwOTMyLCAweDEwOTMzLCAweDEwOTM0LCAweDEwOTM1LCAweDEwOTM2LCAweDEwOTM3LCAweDEwOTM4LCAweDEwOTM5LFxuICAgIDB4MTA5M0YsIDB4MTA5ODAsIDB4MTA5ODEsIDB4MTA5ODIsIDB4MTA5ODMsIDB4MTA5ODQsIDB4MTA5ODUsIDB4MTA5ODYsXG4gICAgMHgxMDk4NywgMHgxMDk4OCwgMHgxMDk4OSwgMHgxMDk4QSwgMHgxMDk4QiwgMHgxMDk4QywgMHgxMDk4RCwgMHgxMDk4RSxcbiAgICAweDEwOThGLCAweDEwOTkwLCAweDEwOTkxLCAweDEwOTkyLCAweDEwOTkzLCAweDEwOTk0LCAweDEwOTk1LCAweDEwOTk2LFxuICAgIDB4MTA5OTcsIDB4MTA5OTgsIDB4MTA5OTksIDB4MTA5OUEsIDB4MTA5OUIsIDB4MTA5OUMsIDB4MTA5OUQsIDB4MTA5OUUsXG4gICAgMHgxMDk5RiwgMHgxMDlBMCwgMHgxMDlBMSwgMHgxMDlBMiwgMHgxMDlBMywgMHgxMDlBNCwgMHgxMDlBNSwgMHgxMDlBNixcbiAgICAweDEwOUE3LCAweDEwOUE4LCAweDEwOUE5LCAweDEwOUFBLCAweDEwOUFCLCAweDEwOUFDLCAweDEwOUFELCAweDEwOUFFLFxuICAgIDB4MTA5QUYsIDB4MTA5QjAsIDB4MTA5QjEsIDB4MTA5QjIsIDB4MTA5QjMsIDB4MTA5QjQsIDB4MTA5QjUsIDB4MTA5QjYsXG4gICAgMHgxMDlCNywgMHgxMDlCRSwgMHgxMDlCRiwgMHgxMEEwMCwgMHgxMEExMCwgMHgxMEExMSwgMHgxMEExMiwgMHgxMEExMyxcbiAgICAweDEwQTE1LCAweDEwQTE2LCAweDEwQTE3LCAweDEwQTE5LCAweDEwQTFBLCAweDEwQTFCLCAweDEwQTFDLCAweDEwQTFELFxuICAgIDB4MTBBMUUsIDB4MTBBMUYsIDB4MTBBMjAsIDB4MTBBMjEsIDB4MTBBMjIsIDB4MTBBMjMsIDB4MTBBMjQsIDB4MTBBMjUsXG4gICAgMHgxMEEyNiwgMHgxMEEyNywgMHgxMEEyOCwgMHgxMEEyOSwgMHgxMEEyQSwgMHgxMEEyQiwgMHgxMEEyQywgMHgxMEEyRCxcbiAgICAweDEwQTJFLCAweDEwQTJGLCAweDEwQTMwLCAweDEwQTMxLCAweDEwQTMyLCAweDEwQTMzLCAweDEwQTQwLCAweDEwQTQxLFxuICAgIDB4MTBBNDIsIDB4MTBBNDMsIDB4MTBBNDQsIDB4MTBBNDUsIDB4MTBBNDYsIDB4MTBBNDcsIDB4MTBBNTAsIDB4MTBBNTEsXG4gICAgMHgxMEE1MiwgMHgxMEE1MywgMHgxMEE1NCwgMHgxMEE1NSwgMHgxMEE1NiwgMHgxMEE1NywgMHgxMEE1OCwgMHgxMEE2MCxcbiAgICAweDEwQTYxLCAweDEwQTYyLCAweDEwQTYzLCAweDEwQTY0LCAweDEwQTY1LCAweDEwQTY2LCAweDEwQTY3LCAweDEwQTY4LFxuICAgIDB4MTBBNjksIDB4MTBBNkEsIDB4MTBBNkIsIDB4MTBBNkMsIDB4MTBBNkQsIDB4MTBBNkUsIDB4MTBBNkYsIDB4MTBBNzAsXG4gICAgMHgxMEE3MSwgMHgxMEE3MiwgMHgxMEE3MywgMHgxMEE3NCwgMHgxMEE3NSwgMHgxMEE3NiwgMHgxMEE3NywgMHgxMEE3OCxcbiAgICAweDEwQTc5LCAweDEwQTdBLCAweDEwQTdCLCAweDEwQTdDLCAweDEwQTdELCAweDEwQTdFLCAweDEwQTdGLCAweDEwQjAwLFxuICAgIDB4MTBCMDEsIDB4MTBCMDIsIDB4MTBCMDMsIDB4MTBCMDQsIDB4MTBCMDUsIDB4MTBCMDYsIDB4MTBCMDcsIDB4MTBCMDgsXG4gICAgMHgxMEIwOSwgMHgxMEIwQSwgMHgxMEIwQiwgMHgxMEIwQywgMHgxMEIwRCwgMHgxMEIwRSwgMHgxMEIwRiwgMHgxMEIxMCxcbiAgICAweDEwQjExLCAweDEwQjEyLCAweDEwQjEzLCAweDEwQjE0LCAweDEwQjE1LCAweDEwQjE2LCAweDEwQjE3LCAweDEwQjE4LFxuICAgIDB4MTBCMTksIDB4MTBCMUEsIDB4MTBCMUIsIDB4MTBCMUMsIDB4MTBCMUQsIDB4MTBCMUUsIDB4MTBCMUYsIDB4MTBCMjAsXG4gICAgMHgxMEIyMSwgMHgxMEIyMiwgMHgxMEIyMywgMHgxMEIyNCwgMHgxMEIyNSwgMHgxMEIyNiwgMHgxMEIyNywgMHgxMEIyOCxcbiAgICAweDEwQjI5LCAweDEwQjJBLCAweDEwQjJCLCAweDEwQjJDLCAweDEwQjJELCAweDEwQjJFLCAweDEwQjJGLCAweDEwQjMwLFxuICAgIDB4MTBCMzEsIDB4MTBCMzIsIDB4MTBCMzMsIDB4MTBCMzQsIDB4MTBCMzUsIDB4MTBCNDAsIDB4MTBCNDEsIDB4MTBCNDIsXG4gICAgMHgxMEI0MywgMHgxMEI0NCwgMHgxMEI0NSwgMHgxMEI0NiwgMHgxMEI0NywgMHgxMEI0OCwgMHgxMEI0OSwgMHgxMEI0QSxcbiAgICAweDEwQjRCLCAweDEwQjRDLCAweDEwQjRELCAweDEwQjRFLCAweDEwQjRGLCAweDEwQjUwLCAweDEwQjUxLCAweDEwQjUyLFxuICAgIDB4MTBCNTMsIDB4MTBCNTQsIDB4MTBCNTUsIDB4MTBCNTgsIDB4MTBCNTksIDB4MTBCNUEsIDB4MTBCNUIsIDB4MTBCNUMsXG4gICAgMHgxMEI1RCwgMHgxMEI1RSwgMHgxMEI1RiwgMHgxMEI2MCwgMHgxMEI2MSwgMHgxMEI2MiwgMHgxMEI2MywgMHgxMEI2NCxcbiAgICAweDEwQjY1LCAweDEwQjY2LCAweDEwQjY3LCAweDEwQjY4LCAweDEwQjY5LCAweDEwQjZBLCAweDEwQjZCLCAweDEwQjZDLFxuICAgIDB4MTBCNkQsIDB4MTBCNkUsIDB4MTBCNkYsIDB4MTBCNzAsIDB4MTBCNzEsIDB4MTBCNzIsIDB4MTBCNzgsIDB4MTBCNzksXG4gICAgMHgxMEI3QSwgMHgxMEI3QiwgMHgxMEI3QywgMHgxMEI3RCwgMHgxMEI3RSwgMHgxMEI3RiwgMHgxMEMwMCwgMHgxMEMwMSxcbiAgICAweDEwQzAyLCAweDEwQzAzLCAweDEwQzA0LCAweDEwQzA1LCAweDEwQzA2LCAweDEwQzA3LCAweDEwQzA4LCAweDEwQzA5LFxuICAgIDB4MTBDMEEsIDB4MTBDMEIsIDB4MTBDMEMsIDB4MTBDMEQsIDB4MTBDMEUsIDB4MTBDMEYsIDB4MTBDMTAsIDB4MTBDMTEsXG4gICAgMHgxMEMxMiwgMHgxMEMxMywgMHgxMEMxNCwgMHgxMEMxNSwgMHgxMEMxNiwgMHgxMEMxNywgMHgxMEMxOCwgMHgxMEMxOSxcbiAgICAweDEwQzFBLCAweDEwQzFCLCAweDEwQzFDLCAweDEwQzFELCAweDEwQzFFLCAweDEwQzFGLCAweDEwQzIwLCAweDEwQzIxLFxuICAgIDB4MTBDMjIsIDB4MTBDMjMsIDB4MTBDMjQsIDB4MTBDMjUsIDB4MTBDMjYsIDB4MTBDMjcsIDB4MTBDMjgsIDB4MTBDMjksXG4gICAgMHgxMEMyQSwgMHgxMEMyQiwgMHgxMEMyQywgMHgxMEMyRCwgMHgxMEMyRSwgMHgxMEMyRiwgMHgxMEMzMCwgMHgxMEMzMSxcbiAgICAweDEwQzMyLCAweDEwQzMzLCAweDEwQzM0LCAweDEwQzM1LCAweDEwQzM2LCAweDEwQzM3LCAweDEwQzM4LCAweDEwQzM5LFxuICAgIDB4MTBDM0EsIDB4MTBDM0IsIDB4MTBDM0MsIDB4MTBDM0QsIDB4MTBDM0UsIDB4MTBDM0YsIDB4MTBDNDAsIDB4MTBDNDEsXG4gICAgMHgxMEM0MiwgMHgxMEM0MywgMHgxMEM0NCwgMHgxMEM0NSwgMHgxMEM0NiwgMHgxMEM0NywgMHgxMEM0OCwgMHgxRUUwMCxcbiAgICAweDFFRTAxLCAweDFFRTAyLCAweDFFRTAzLCAweDFFRTA1LCAweDFFRTA2LCAweDFFRTA3LCAweDFFRTA4LCAweDFFRTA5LFxuICAgIDB4MUVFMEEsIDB4MUVFMEIsIDB4MUVFMEMsIDB4MUVFMEQsIDB4MUVFMEUsIDB4MUVFMEYsIDB4MUVFMTAsIDB4MUVFMTEsXG4gICAgMHgxRUUxMiwgMHgxRUUxMywgMHgxRUUxNCwgMHgxRUUxNSwgMHgxRUUxNiwgMHgxRUUxNywgMHgxRUUxOCwgMHgxRUUxOSxcbiAgICAweDFFRTFBLCAweDFFRTFCLCAweDFFRTFDLCAweDFFRTFELCAweDFFRTFFLCAweDFFRTFGLCAweDFFRTIxLCAweDFFRTIyLFxuICAgIDB4MUVFMjQsIDB4MUVFMjcsIDB4MUVFMjksIDB4MUVFMkEsIDB4MUVFMkIsIDB4MUVFMkMsIDB4MUVFMkQsIDB4MUVFMkUsXG4gICAgMHgxRUUyRiwgMHgxRUUzMCwgMHgxRUUzMSwgMHgxRUUzMiwgMHgxRUUzNCwgMHgxRUUzNSwgMHgxRUUzNiwgMHgxRUUzNyxcbiAgICAweDFFRTM5LCAweDFFRTNCLCAweDFFRTQyLCAweDFFRTQ3LCAweDFFRTQ5LCAweDFFRTRCLCAweDFFRTRELCAweDFFRTRFLFxuICAgIDB4MUVFNEYsIDB4MUVFNTEsIDB4MUVFNTIsIDB4MUVFNTQsIDB4MUVFNTcsIDB4MUVFNTksIDB4MUVFNUIsIDB4MUVFNUQsXG4gICAgMHgxRUU1RiwgMHgxRUU2MSwgMHgxRUU2MiwgMHgxRUU2NCwgMHgxRUU2NywgMHgxRUU2OCwgMHgxRUU2OSwgMHgxRUU2QSxcbiAgICAweDFFRTZDLCAweDFFRTZELCAweDFFRTZFLCAweDFFRTZGLCAweDFFRTcwLCAweDFFRTcxLCAweDFFRTcyLCAweDFFRTc0LFxuICAgIDB4MUVFNzUsIDB4MUVFNzYsIDB4MUVFNzcsIDB4MUVFNzksIDB4MUVFN0EsIDB4MUVFN0IsIDB4MUVFN0MsIDB4MUVFN0UsXG4gICAgMHgxRUU4MCwgMHgxRUU4MSwgMHgxRUU4MiwgMHgxRUU4MywgMHgxRUU4NCwgMHgxRUU4NSwgMHgxRUU4NiwgMHgxRUU4NyxcbiAgICAweDFFRTg4LCAweDFFRTg5LCAweDFFRThCLCAweDFFRThDLCAweDFFRThELCAweDFFRThFLCAweDFFRThGLCAweDFFRTkwLFxuICAgIDB4MUVFOTEsIDB4MUVFOTIsIDB4MUVFOTMsIDB4MUVFOTQsIDB4MUVFOTUsIDB4MUVFOTYsIDB4MUVFOTcsIDB4MUVFOTgsXG4gICAgMHgxRUU5OSwgMHgxRUU5QSwgMHgxRUU5QiwgMHgxRUVBMSwgMHgxRUVBMiwgMHgxRUVBMywgMHgxRUVBNSwgMHgxRUVBNixcbiAgICAweDFFRUE3LCAweDFFRUE4LCAweDFFRUE5LCAweDFFRUFCLCAweDFFRUFDLCAweDFFRUFELCAweDFFRUFFLCAweDFFRUFGLFxuICAgIDB4MUVFQjAsIDB4MUVFQjEsIDB4MUVFQjIsIDB4MUVFQjMsIDB4MUVFQjQsIDB4MUVFQjUsIDB4MUVFQjYsIDB4MUVFQjcsXG4gICAgMHgxRUVCOCwgMHgxRUVCOSwgMHgxRUVCQSwgMHgxRUVCQiwgMHgxMEZGRkRdO1xuXG5mdW5jdGlvbiBkZXRlcm1pbmVCaWRpKGN1ZURpdikge1xuICAgIHZhciBub2RlU3RhY2sgPSBbXSxcbiAgICAgICAgdGV4dCA9IFwiXCIsXG4gICAgICAgIGNoYXJDb2RlO1xuXG4gICAgaWYgKCFjdWVEaXYgfHwgIWN1ZURpdi5jaGlsZE5vZGVzKSB7XG4gICAgICAgIHJldHVybiBcImx0clwiO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHB1c2hOb2Rlcyhub2RlU3RhY2ssIG5vZGUpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IG5vZGUuY2hpbGROb2Rlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgbm9kZVN0YWNrLnB1c2gobm9kZS5jaGlsZE5vZGVzW2ldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG5leHRUZXh0Tm9kZShub2RlU3RhY2spIHtcbiAgICAgICAgaWYgKCFub2RlU3RhY2sgfHwgIW5vZGVTdGFjay5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG5vZGUgPSBub2RlU3RhY2sucG9wKCksXG4gICAgICAgICAgICB0ZXh0ID0gbm9kZS50ZXh0Q29udGVudCB8fCBub2RlLmlubmVyVGV4dDtcbiAgICAgICAgaWYgKHRleHQpIHtcbiAgICAgICAgICAgIC8vIFRPRE86IFRoaXMgc2hvdWxkIG1hdGNoIGFsbCB1bmljb2RlIHR5cGUgQiBjaGFyYWN0ZXJzIChwYXJhZ3JhcGhcbiAgICAgICAgICAgIC8vIHNlcGFyYXRvciBjaGFyYWN0ZXJzKS4gU2VlIGlzc3VlICMxMTUuXG4gICAgICAgICAgICB2YXIgbSA9IHRleHQubWF0Y2goL14uKihcXG58XFxyKS8pO1xuICAgICAgICAgICAgaWYgKG0pIHtcbiAgICAgICAgICAgICAgICBub2RlU3RhY2subGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICByZXR1cm4gbVswXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0ZXh0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChub2RlLnRhZ05hbWUgPT09IFwicnVieVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV4dFRleHROb2RlKG5vZGVTdGFjayk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vZGUuY2hpbGROb2Rlcykge1xuICAgICAgICAgICAgcHVzaE5vZGVzKG5vZGVTdGFjaywgbm9kZSk7XG4gICAgICAgICAgICByZXR1cm4gbmV4dFRleHROb2RlKG5vZGVTdGFjayk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdXNoTm9kZXMobm9kZVN0YWNrLCBjdWVEaXYpO1xuICAgIHdoaWxlICgodGV4dCA9IG5leHRUZXh0Tm9kZShub2RlU3RhY2spKSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRleHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNoYXJDb2RlID0gdGV4dC5jaGFyQ29kZUF0KGkpO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzdHJvbmdSVExDaGFycy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGlmIChzdHJvbmdSVExDaGFyc1tqXSA9PT0gY2hhckNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwicnRsXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBcImx0clwiO1xufVxuXG5mdW5jdGlvbiBjb21wdXRlTGluZVBvcyhjdWUpIHtcbiAgICBpZiAodHlwZW9mIGN1ZS5saW5lID09PSBcIm51bWJlclwiICYmXG4gICAgICAgIChjdWUuc25hcFRvTGluZXMgfHwgKGN1ZS5saW5lID49IDAgJiYgY3VlLmxpbmUgPD0gMTAwKSkpIHtcbiAgICAgICAgcmV0dXJuIGN1ZS5saW5lO1xuICAgIH1cbiAgICBpZiAoIWN1ZS50cmFjayB8fCAhY3VlLnRyYWNrLnRleHRUcmFja0xpc3QgfHxcbiAgICAgICAgIWN1ZS50cmFjay50ZXh0VHJhY2tMaXN0Lm1lZGlhRWxlbWVudCkge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIHZhciB0cmFjayA9IGN1ZS50cmFjayxcbiAgICAgICAgdHJhY2tMaXN0ID0gdHJhY2sudGV4dFRyYWNrTGlzdCxcbiAgICAgICAgY291bnQgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHJhY2tMaXN0Lmxlbmd0aCAmJiB0cmFja0xpc3RbaV0gIT09IHRyYWNrOyBpKyspIHtcbiAgICAgICAgaWYgKHRyYWNrTGlzdFtpXS5tb2RlID09PSBcInNob3dpbmdcIikge1xuICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gKytjb3VudCAqIC0xO1xufVxuXG5mdW5jdGlvbiBTdHlsZUJveCgpIHtcbn1cblxuLy8gQXBwbHkgc3R5bGVzIHRvIGEgZGl2LiBJZiB0aGVyZSBpcyBubyBkaXYgcGFzc2VkIHRoZW4gaXQgZGVmYXVsdHMgdG8gdGhlXG4vLyBkaXYgb24gJ3RoaXMnLlxuU3R5bGVCb3gucHJvdG90eXBlLmFwcGx5U3R5bGVzID0gZnVuY3Rpb24oc3R5bGVzLCBkaXYpIHtcbiAgICBkaXYgPSBkaXYgfHwgdGhpcy5kaXY7XG4gICAgZm9yICh2YXIgcHJvcCBpbiBzdHlsZXMpIHtcbiAgICAgICAgaWYgKHN0eWxlcy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgICAgZGl2LnN0eWxlW3Byb3BdID0gc3R5bGVzW3Byb3BdO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuU3R5bGVCb3gucHJvdG90eXBlLmZvcm1hdFN0eWxlID0gZnVuY3Rpb24odmFsLCB1bml0KSB7XG4gICAgcmV0dXJuIHZhbCA9PT0gMCA/IDAgOiB2YWwgKyB1bml0O1xufTtcblxuLy8gQ29uc3RydWN0cyB0aGUgY29tcHV0ZWQgZGlzcGxheSBzdGF0ZSBvZiB0aGUgY3VlIChhIGRpdikuIFBsYWNlcyB0aGUgZGl2XG4vLyBpbnRvIHRoZSBvdmVybGF5IHdoaWNoIHNob3VsZCBiZSBhIGJsb2NrIGxldmVsIGVsZW1lbnQgKHVzdWFsbHkgYSBkaXYpLlxuZnVuY3Rpb24gQ3VlU3R5bGVCb3god2luZG93LCBjdWUsIHN0eWxlT3B0aW9ucykge1xuICAgIHZhciBpc0lFOCA9ICh0eXBlb2YgbmF2aWdhdG9yICE9PSBcInVuZGVmaW5lZFwiKSAmJlxuICAgICAgICAoL01TSUVcXHM4XFwuMC8pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgdmFyIGNvbG9yID0gXCJyZ2JhKDI1NSwgMjU1LCAyNTUsIDEpXCI7XG4gICAgdmFyIGJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLCAwLCAwLCAwLjgpXCI7XG4gICAgdmFyIHRleHRTaGFkb3cgPSBcIlwiO1xuXG4gICAgaWYodHlwZW9mIFdlYlZUVFNldCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBjb2xvciA9IFdlYlZUVFNldC5mb250U2V0O1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3IgPSBXZWJWVFRTZXQuYmFja2dyb3VuZFNldDtcbiAgICAgICAgdGV4dFNoYWRvdyA9IFdlYlZUVFNldC5lZGdlU2V0O1xuICAgIH1cblxuICAgIGlmIChpc0lFOCkge1xuICAgICAgICBjb2xvciA9IFwicmdiKDI1NSwgMjU1LCAyNTUpXCI7XG4gICAgICAgIGJhY2tncm91bmRDb2xvciA9IFwicmdiKDAsIDAsIDApXCI7XG4gICAgfVxuXG4gICAgU3R5bGVCb3guY2FsbCh0aGlzKTtcbiAgICB0aGlzLmN1ZSA9IGN1ZTtcblxuICAgIC8vIFBhcnNlIG91ciBjdWUncyB0ZXh0IGludG8gYSBET00gdHJlZSByb290ZWQgYXQgJ2N1ZURpdicuIFRoaXMgZGl2IHdpbGxcbiAgICAvLyBoYXZlIGlubGluZSBwb3NpdGlvbmluZyBhbmQgd2lsbCBmdW5jdGlvbiBhcyB0aGUgY3VlIGJhY2tncm91bmQgYm94LlxuICAgIHRoaXMuY3VlRGl2ID0gcGFyc2VDb250ZW50KHdpbmRvdywgY3VlLnRleHQpO1xuICAgIHZhciBzdHlsZXMgPSB7XG4gICAgICAgIGNvbG9yOiBjb2xvcixcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBiYWNrZ3JvdW5kQ29sb3IsXG4gICAgICAgIHRleHRTaGFkb3c6IHRleHRTaGFkb3csXG4gICAgICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsXG4gICAgICAgIGxlZnQ6IDAsXG4gICAgICAgIHJpZ2h0OiAwLFxuICAgICAgICB0b3A6IDAsXG4gICAgICAgIGJvdHRvbTogMCxcbiAgICAgICAgZGlzcGxheTogXCJpbmxpbmVcIlxuICAgIH07XG5cbiAgICBpZiAoIWlzSUU4KSB7XG4gICAgICAgIHN0eWxlcy53cml0aW5nTW9kZSA9IGN1ZS52ZXJ0aWNhbCA9PT0gXCJcIiA/IFwiaG9yaXpvbnRhbC10YlwiXG4gICAgICAgICAgICA6IGN1ZS52ZXJ0aWNhbCA9PT0gXCJsclwiID8gXCJ2ZXJ0aWNhbC1sclwiXG4gICAgICAgICAgICA6IFwidmVydGljYWwtcmxcIjtcbiAgICAgICAgc3R5bGVzLnVuaWNvZGVCaWRpID0gXCJwbGFpbnRleHRcIjtcbiAgICB9XG4gICAgdGhpcy5hcHBseVN0eWxlcyhzdHlsZXMsIHRoaXMuY3VlRGl2KTtcblxuICAgIC8vIENyZWF0ZSBhbiBhYnNvbHV0ZWx5IHBvc2l0aW9uZWQgZGl2IHRoYXQgd2lsbCBiZSB1c2VkIHRvIHBvc2l0aW9uIHRoZSBjdWVcbiAgICAvLyBkaXYuIE5vdGUsIGFsbCBXZWJWVFQgY3VlLXNldHRpbmcgYWxpZ25tZW50cyBhcmUgZXF1aXZhbGVudCB0byB0aGUgQ1NTXG4gICAgLy8gbWlycm9ycyBvZiB0aGVtIGV4Y2VwdCBcIm1pZGRsZVwiIHdoaWNoIGlzIFwiY2VudGVyXCIgaW4gQ1NTLlxuICAgIHRoaXMuZGl2ID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc3R5bGVzID0ge1xuICAgICAgICB0ZXh0QWxpZ246IGN1ZS5hbGlnbiA9PT0gXCJtaWRkbGVcIiA/IFwiY2VudGVyXCIgOiBjdWUuYWxpZ24sXG4gICAgICAgIGZvbnQ6IHN0eWxlT3B0aW9ucy5mb250LFxuICAgICAgICB3aGl0ZVNwYWNlOiBcInByZS1saW5lXCIsXG4gICAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCJcbiAgICB9O1xuXG4gICAgaWYgKCFpc0lFOCkge1xuICAgICAgICBzdHlsZXMuZGlyZWN0aW9uID0gZGV0ZXJtaW5lQmlkaSh0aGlzLmN1ZURpdik7XG4gICAgICAgIHN0eWxlcy53cml0aW5nTW9kZSA9IGN1ZS52ZXJ0aWNhbCA9PT0gXCJcIiA/IFwiaG9yaXpvbnRhbC10YlwiXG4gICAgICAgICAgICA6IGN1ZS52ZXJ0aWNhbCA9PT0gXCJsclwiID8gXCJ2ZXJ0aWNhbC1sclwiXG4gICAgICAgICAgICA6IFwidmVydGljYWwtcmxcIi5cbiAgICAgICAgICAgIHN0eWxlc3VuaWNvZGVCaWRpID0gIFwicGxhaW50ZXh0XCI7XG4gICAgfVxuXG4gICAgdGhpcy5hcHBseVN0eWxlcyhzdHlsZXMpO1xuXG4gICAgdGhpcy5kaXYuYXBwZW5kQ2hpbGQodGhpcy5jdWVEaXYpO1xuXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBkaXN0YW5jZSBmcm9tIHRoZSByZWZlcmVuY2UgZWRnZSBvZiB0aGUgdmlld3BvcnQgdG8gdGhlIHRleHRcbiAgICAvLyBwb3NpdGlvbiBvZiB0aGUgY3VlIGJveC4gVGhlIHJlZmVyZW5jZSBlZGdlIHdpbGwgYmUgcmVzb2x2ZWQgbGF0ZXIgd2hlblxuICAgIC8vIHRoZSBib3ggb3JpZW50YXRpb24gc3R5bGVzIGFyZSBhcHBsaWVkLlxuICAgIHZhciB0ZXh0UG9zID0gMDtcbiAgICBzd2l0Y2ggKGN1ZS5wb3NpdGlvbkFsaWduKSB7XG4gICAgICAgIGNhc2UgXCJzdGFydFwiOlxuICAgICAgICAgICAgdGV4dFBvcyA9IGN1ZS5wb3NpdGlvbjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibWlkZGxlXCI6XG4gICAgICAgICAgICB0ZXh0UG9zID0gY3VlLnBvc2l0aW9uIC0gKGN1ZS5zaXplIC8gMik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgdGV4dFBvcyA9IGN1ZS5wb3NpdGlvbiAtIGN1ZS5zaXplO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgLy8gSG9yaXpvbnRhbCBib3ggb3JpZW50YXRpb247IHRleHRQb3MgaXMgdGhlIGRpc3RhbmNlIGZyb20gdGhlIGxlZnQgZWRnZSBvZiB0aGVcbiAgICAvLyBhcmVhIHRvIHRoZSBsZWZ0IGVkZ2Ugb2YgdGhlIGJveCBhbmQgY3VlLnNpemUgaXMgdGhlIGRpc3RhbmNlIGV4dGVuZGluZyB0b1xuICAgIC8vIHRoZSByaWdodCBmcm9tIHRoZXJlLlxuICAgIGlmIChjdWUudmVydGljYWwgPT09IFwiXCIpIHtcbiAgICAgICAgdGhpcy5hcHBseVN0eWxlcyh7XG4gICAgICAgICAgICBsZWZ0OiAgdGhpcy5mb3JtYXRTdHlsZSh0ZXh0UG9zLCBcIiVcIiksXG4gICAgICAgICAgICB3aWR0aDogdGhpcy5mb3JtYXRTdHlsZShjdWUuc2l6ZSwgXCIlXCIpXG4gICAgICAgIH0pO1xuICAgICAgICAvLyBWZXJ0aWNhbCBib3ggb3JpZW50YXRpb247IHRleHRQb3MgaXMgdGhlIGRpc3RhbmNlIGZyb20gdGhlIHRvcCBlZGdlIG9mIHRoZVxuICAgICAgICAvLyBhcmVhIHRvIHRoZSB0b3AgZWRnZSBvZiB0aGUgYm94IGFuZCBjdWUuc2l6ZSBpcyB0aGUgaGVpZ2h0IGV4dGVuZGluZ1xuICAgICAgICAvLyBkb3dud2FyZHMgZnJvbSB0aGVyZS5cbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFwcGx5U3R5bGVzKHtcbiAgICAgICAgICAgIHRvcDogdGhpcy5mb3JtYXRTdHlsZSh0ZXh0UG9zLCBcIiVcIiksXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMuZm9ybWF0U3R5bGUoY3VlLnNpemUsIFwiJVwiKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLm1vdmUgPSBmdW5jdGlvbihib3gpIHtcbiAgICAgICAgdGhpcy5hcHBseVN0eWxlcyh7XG4gICAgICAgICAgICB0b3A6IHRoaXMuZm9ybWF0U3R5bGUoYm94LnRvcCwgXCJweFwiKSxcbiAgICAgICAgICAgIGJvdHRvbTogdGhpcy5mb3JtYXRTdHlsZShib3guYm90dG9tLCBcInB4XCIpLFxuICAgICAgICAgICAgbGVmdDogdGhpcy5mb3JtYXRTdHlsZShib3gubGVmdCwgXCJweFwiKSxcbiAgICAgICAgICAgIHJpZ2h0OiB0aGlzLmZvcm1hdFN0eWxlKGJveC5yaWdodCwgXCJweFwiKSxcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5mb3JtYXRTdHlsZShib3guaGVpZ2h0LCBcInB4XCIpLFxuICAgICAgICAgICAgd2lkdGg6IHRoaXMuZm9ybWF0U3R5bGUoYm94LndpZHRoLCBcInB4XCIpXG4gICAgICAgIH0pO1xuICAgIH07XG59XG5DdWVTdHlsZUJveC5wcm90b3R5cGUgPSBfb2JqQ3JlYXRlKFN0eWxlQm94LnByb3RvdHlwZSk7XG5DdWVTdHlsZUJveC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDdWVTdHlsZUJveDtcblxuLy8gUmVwcmVzZW50cyB0aGUgY28tb3JkaW5hdGVzIG9mIGFuIEVsZW1lbnQgaW4gYSB3YXkgdGhhdCB3ZSBjYW4gZWFzaWx5XG4vLyBjb21wdXRlIHRoaW5ncyB3aXRoIHN1Y2ggYXMgaWYgaXQgb3ZlcmxhcHMgb3IgaW50ZXJzZWN0cyB3aXRoIGFub3RoZXIgRWxlbWVudC5cbi8vIENhbiBpbml0aWFsaXplIGl0IHdpdGggZWl0aGVyIGEgU3R5bGVCb3ggb3IgYW5vdGhlciBCb3hQb3NpdGlvbi5cbmZ1bmN0aW9uIEJveFBvc2l0aW9uKG9iaikge1xuICAgIHZhciBpc0lFOCA9ICh0eXBlb2YgbmF2aWdhdG9yICE9PSBcInVuZGVmaW5lZFwiKSAmJlxuICAgICAgICAoL01TSUVcXHM4XFwuMC8pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5cbiAgICAvLyBFaXRoZXIgYSBCb3hQb3NpdGlvbiB3YXMgcGFzc2VkIGluIGFuZCB3ZSBuZWVkIHRvIGNvcHkgaXQsIG9yIGEgU3R5bGVCb3hcbiAgICAvLyB3YXMgcGFzc2VkIGluIGFuZCB3ZSBuZWVkIHRvIGNvcHkgdGhlIHJlc3VsdHMgb2YgJ2dldEJvdW5kaW5nQ2xpZW50UmVjdCdcbiAgICAvLyBhcyB0aGUgb2JqZWN0IHJldHVybmVkIGlzIHJlYWRvbmx5LiBBbGwgY28tb3JkaW5hdGUgdmFsdWVzIGFyZSBpbiByZWZlcmVuY2VcbiAgICAvLyB0byB0aGUgdmlld3BvcnQgb3JpZ2luICh0b3AgbGVmdCkuXG4gICAgdmFyIGxoLCBoZWlnaHQsIHdpZHRoLCB0b3A7XG4gICAgaWYgKG9iai5kaXYpIHtcbiAgICAgICAgaGVpZ2h0ID0gb2JqLmRpdi5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIHdpZHRoID0gb2JqLmRpdi5vZmZzZXRXaWR0aDtcbiAgICAgICAgdG9wID0gb2JqLmRpdi5vZmZzZXRUb3A7XG5cbiAgICAgICAgdmFyIHJlY3RzID0gKHJlY3RzID0gb2JqLmRpdi5jaGlsZE5vZGVzKSAmJiAocmVjdHMgPSByZWN0c1swXSkgJiZcbiAgICAgICAgICAgIHJlY3RzLmdldENsaWVudFJlY3RzICYmIHJlY3RzLmdldENsaWVudFJlY3RzKCk7XG4gICAgICAgIG9iaiA9IG9iai5kaXYuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIC8vIEluIGNlcnRhaW4gY2FzZXMgdGhlIG91dHRlciBkaXYgd2lsbCBiZSBzbGlnaHRseSBsYXJnZXIgdGhlbiB0aGUgc3VtIG9mXG4gICAgICAgIC8vIHRoZSBpbm5lciBkaXYncyBsaW5lcy4gVGhpcyBjb3VsZCBiZSBkdWUgdG8gYm9sZCB0ZXh0LCBldGMsIG9uIHNvbWUgcGxhdGZvcm1zLlxuICAgICAgICAvLyBJbiB0aGlzIGNhc2Ugd2Ugc2hvdWxkIGdldCB0aGUgYXZlcmFnZSBsaW5lIGhlaWdodCBhbmQgdXNlIHRoYXQuIFRoaXMgd2lsbFxuICAgICAgICAvLyByZXN1bHQgaW4gdGhlIGRlc2lyZWQgYmVoYXZpb3VyLlxuICAgICAgICBsaCA9IHJlY3RzID8gTWF0aC5tYXgoKHJlY3RzWzBdICYmIHJlY3RzWzBdLmhlaWdodCkgfHwgMCwgb2JqLmhlaWdodCAvIHJlY3RzLmxlbmd0aClcbiAgICAgICAgICAgIDogMDtcblxuICAgIH1cbiAgICB0aGlzLmxlZnQgPSBvYmoubGVmdDtcbiAgICB0aGlzLnJpZ2h0ID0gb2JqLnJpZ2h0O1xuICAgIHRoaXMudG9wID0gb2JqLnRvcCB8fCB0b3A7XG4gICAgdGhpcy5oZWlnaHQgPSBvYmouaGVpZ2h0IHx8IGhlaWdodDtcbiAgICB0aGlzLmJvdHRvbSA9IG9iai5ib3R0b20gfHwgKHRvcCArIChvYmouaGVpZ2h0IHx8IGhlaWdodCkpO1xuICAgIHRoaXMud2lkdGggPSBvYmoud2lkdGggfHwgd2lkdGg7XG4gICAgdGhpcy5saW5lSGVpZ2h0ID0gbGggIT09IHVuZGVmaW5lZCA/IGxoIDogb2JqLmxpbmVIZWlnaHQ7XG5cbiAgICBpZiAoaXNJRTggJiYgIXRoaXMubGluZUhlaWdodCkge1xuICAgICAgICB0aGlzLmxpbmVIZWlnaHQgPSAxMztcbiAgICB9XG59XG5cbi8vIE1vdmUgdGhlIGJveCBhbG9uZyBhIHBhcnRpY3VsYXIgYXhpcy4gT3B0aW9uYWxseSBwYXNzIGluIGFuIGFtb3VudCB0byBtb3ZlXG4vLyB0aGUgYm94LiBJZiBubyBhbW91bnQgaXMgcGFzc2VkIHRoZW4gdGhlIGRlZmF1bHQgaXMgdGhlIGxpbmUgaGVpZ2h0IG9mIHRoZVxuLy8gYm94LlxuQm94UG9zaXRpb24ucHJvdG90eXBlLm1vdmUgPSBmdW5jdGlvbihheGlzLCB0b01vdmUpIHtcbiAgICB0b01vdmUgPSB0b01vdmUgIT09IHVuZGVmaW5lZCA/IHRvTW92ZSA6IHRoaXMubGluZUhlaWdodDtcbiAgICBzd2l0Y2ggKGF4aXMpIHtcbiAgICAgICAgY2FzZSBcIit4XCI6XG4gICAgICAgICAgICB0aGlzLmxlZnQgKz0gdG9Nb3ZlO1xuICAgICAgICAgICAgdGhpcy5yaWdodCArPSB0b01vdmU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIi14XCI6XG4gICAgICAgICAgICB0aGlzLmxlZnQgLT0gdG9Nb3ZlO1xuICAgICAgICAgICAgdGhpcy5yaWdodCAtPSB0b01vdmU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIit5XCI6XG4gICAgICAgICAgICB0aGlzLnRvcCArPSB0b01vdmU7XG4gICAgICAgICAgICB0aGlzLmJvdHRvbSArPSB0b01vdmU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIi15XCI6XG4gICAgICAgICAgICB0aGlzLnRvcCAtPSB0b01vdmU7XG4gICAgICAgICAgICB0aGlzLmJvdHRvbSAtPSB0b01vdmU7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG59O1xuXG4vLyBDaGVjayBpZiB0aGlzIGJveCBvdmVybGFwcyBhbm90aGVyIGJveCwgYjIuXG5Cb3hQb3NpdGlvbi5wcm90b3R5cGUub3ZlcmxhcHMgPSBmdW5jdGlvbihiMikge1xuICAgIHJldHVybiB0aGlzLmxlZnQgPCBiMi5yaWdodCAmJlxuICAgICAgICB0aGlzLnJpZ2h0ID4gYjIubGVmdCAmJlxuICAgICAgICB0aGlzLnRvcCA8IGIyLmJvdHRvbSAmJlxuICAgICAgICB0aGlzLmJvdHRvbSA+IGIyLnRvcDtcbn07XG5cbi8vIENoZWNrIGlmIHRoaXMgYm94IG92ZXJsYXBzIGFueSBvdGhlciBib3hlcyBpbiBib3hlcy5cbkJveFBvc2l0aW9uLnByb3RvdHlwZS5vdmVybGFwc0FueSA9IGZ1bmN0aW9uKGJveGVzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBib3hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5vdmVybGFwcyhib3hlc1tpXSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG5cbi8vIENoZWNrIGlmIHRoaXMgYm94IGlzIHdpdGhpbiBhbm90aGVyIGJveC5cbkJveFBvc2l0aW9uLnByb3RvdHlwZS53aXRoaW4gPSBmdW5jdGlvbihjb250YWluZXIpIHtcbiAgICByZXR1cm4gdGhpcy50b3AgPj0gY29udGFpbmVyLnRvcCAmJlxuICAgICAgICB0aGlzLmJvdHRvbSA8PSBjb250YWluZXIuYm90dG9tICYmXG4gICAgICAgIHRoaXMubGVmdCA+PSBjb250YWluZXIubGVmdCAmJlxuICAgICAgICB0aGlzLnJpZ2h0IDw9IGNvbnRhaW5lci5yaWdodDtcbn07XG5cbi8vIENoZWNrIGlmIHRoaXMgYm94IGlzIGVudGlyZWx5IHdpdGhpbiB0aGUgY29udGFpbmVyIG9yIGl0IGlzIG92ZXJsYXBwaW5nXG4vLyBvbiB0aGUgZWRnZSBvcHBvc2l0ZSBvZiB0aGUgYXhpcyBkaXJlY3Rpb24gcGFzc2VkLiBGb3IgZXhhbXBsZSwgaWYgXCIreFwiIGlzXG4vLyBwYXNzZWQgYW5kIHRoZSBib3ggaXMgb3ZlcmxhcHBpbmcgb24gdGhlIGxlZnQgZWRnZSBvZiB0aGUgY29udGFpbmVyLCB0aGVuXG4vLyByZXR1cm4gdHJ1ZS5cbkJveFBvc2l0aW9uLnByb3RvdHlwZS5vdmVybGFwc09wcG9zaXRlQXhpcyA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgYXhpcykge1xuICAgIHN3aXRjaCAoYXhpcykge1xuICAgICAgICBjYXNlIFwiK3hcIjpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxlZnQgPCBjb250YWluZXIubGVmdDtcbiAgICAgICAgY2FzZSBcIi14XCI6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yaWdodCA+IGNvbnRhaW5lci5yaWdodDtcbiAgICAgICAgY2FzZSBcIit5XCI6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b3AgPCBjb250YWluZXIudG9wO1xuICAgICAgICBjYXNlIFwiLXlcIjpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJvdHRvbSA+IGNvbnRhaW5lci5ib3R0b207XG4gICAgfVxufTtcblxuLy8gRmluZCB0aGUgcGVyY2VudGFnZSBvZiB0aGUgYXJlYSB0aGF0IHRoaXMgYm94IGlzIG92ZXJsYXBwaW5nIHdpdGggYW5vdGhlclxuLy8gYm94LlxuQm94UG9zaXRpb24ucHJvdG90eXBlLmludGVyc2VjdFBlcmNlbnRhZ2UgPSBmdW5jdGlvbihiMikge1xuICAgIHZhciB4ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4odGhpcy5yaWdodCwgYjIucmlnaHQpIC0gTWF0aC5tYXgodGhpcy5sZWZ0LCBiMi5sZWZ0KSksXG4gICAgICAgIHkgPSBNYXRoLm1heCgwLCBNYXRoLm1pbih0aGlzLmJvdHRvbSwgYjIuYm90dG9tKSAtIE1hdGgubWF4KHRoaXMudG9wLCBiMi50b3ApKSxcbiAgICAgICAgaW50ZXJzZWN0QXJlYSA9IHggKiB5O1xuICAgIHJldHVybiBpbnRlcnNlY3RBcmVhIC8gKHRoaXMuaGVpZ2h0ICogdGhpcy53aWR0aCk7XG59O1xuXG4vLyBDb252ZXJ0IHRoZSBwb3NpdGlvbnMgZnJvbSB0aGlzIGJveCB0byBDU1MgY29tcGF0aWJsZSBwb3NpdGlvbnMgdXNpbmdcbi8vIHRoZSByZWZlcmVuY2UgY29udGFpbmVyJ3MgcG9zaXRpb25zLiBUaGlzIGhhcyB0byBiZSBkb25lIGJlY2F1c2UgdGhpc1xuLy8gYm94J3MgcG9zaXRpb25zIGFyZSBpbiByZWZlcmVuY2UgdG8gdGhlIHZpZXdwb3J0IG9yaWdpbiwgd2hlcmVhcywgQ1NTXG4vLyB2YWx1ZXMgYXJlIGluIHJlZmVyZWNuZSB0byB0aGVpciByZXNwZWN0aXZlIGVkZ2VzLlxuQm94UG9zaXRpb24ucHJvdG90eXBlLnRvQ1NTQ29tcGF0VmFsdWVzID0gZnVuY3Rpb24ocmVmZXJlbmNlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9wOiB0aGlzLnRvcCAtIHJlZmVyZW5jZS50b3AsXG4gICAgICAgIGJvdHRvbTogcmVmZXJlbmNlLmJvdHRvbSAtIHRoaXMuYm90dG9tLFxuICAgICAgICBsZWZ0OiB0aGlzLmxlZnQgLSByZWZlcmVuY2UubGVmdCxcbiAgICAgICAgcmlnaHQ6IHJlZmVyZW5jZS5yaWdodCAtIHRoaXMucmlnaHQsXG4gICAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQsXG4gICAgICAgIHdpZHRoOiB0aGlzLndpZHRoXG4gICAgfTtcbn07XG5cbi8vIEdldCBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHRoZSBib3gncyBwb3NpdGlvbiB3aXRob3V0IGFueXRoaW5nIGV4dHJhLlxuLy8gQ2FuIHBhc3MgYSBTdHlsZUJveCwgSFRNTEVsZW1lbnQsIG9yIGFub3RoZXIgQm94UG9zaXRvbi5cbkJveFBvc2l0aW9uLmdldFNpbXBsZUJveFBvc2l0aW9uID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIGhlaWdodCA9IG9iai5kaXYgPyBvYmouZGl2Lm9mZnNldEhlaWdodCA6IG9iai50YWdOYW1lID8gb2JqLm9mZnNldEhlaWdodCA6IDA7XG4gICAgdmFyIHdpZHRoID0gb2JqLmRpdiA/IG9iai5kaXYub2Zmc2V0V2lkdGggOiBvYmoudGFnTmFtZSA/IG9iai5vZmZzZXRXaWR0aCA6IDA7XG4gICAgdmFyIHRvcCA9IG9iai5kaXYgPyBvYmouZGl2Lm9mZnNldFRvcCA6IG9iai50YWdOYW1lID8gb2JqLm9mZnNldFRvcCA6IDA7XG5cbiAgICBvYmogPSBvYmouZGl2ID8gb2JqLmRpdi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSA6XG4gICAgICAgIG9iai50YWdOYW1lID8gb2JqLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpIDogb2JqO1xuICAgIHZhciByZXQgPSB7XG4gICAgICAgIGxlZnQ6IG9iai5sZWZ0LFxuICAgICAgICByaWdodDogb2JqLnJpZ2h0LFxuICAgICAgICB0b3A6IG9iai50b3AgfHwgdG9wLFxuICAgICAgICBoZWlnaHQ6IG9iai5oZWlnaHQgfHwgaGVpZ2h0LFxuICAgICAgICBib3R0b206IG9iai5ib3R0b20gfHwgKHRvcCArIChvYmouaGVpZ2h0IHx8IGhlaWdodCkpLFxuICAgICAgICB3aWR0aDogb2JqLndpZHRoIHx8IHdpZHRoXG4gICAgfTtcbiAgICByZXR1cm4gcmV0O1xufTtcblxuLy8gTW92ZSBhIFN0eWxlQm94IHRvIGl0cyBzcGVjaWZpZWQsIG9yIG5leHQgYmVzdCwgcG9zaXRpb24uIFRoZSBjb250YWluZXJCb3hcbi8vIGlzIHRoZSBib3ggdGhhdCBjb250YWlucyB0aGUgU3R5bGVCb3gsIHN1Y2ggYXMgYSBkaXYuIGJveFBvc2l0aW9ucyBhcmVcbi8vIGEgbGlzdCBvZiBvdGhlciBib3hlcyB0aGF0IHRoZSBzdHlsZUJveCBjYW4ndCBvdmVybGFwIHdpdGguXG5mdW5jdGlvbiBtb3ZlQm94VG9MaW5lUG9zaXRpb24od2luZG93LCBzdHlsZUJveCwgY29udGFpbmVyQm94LCBib3hQb3NpdGlvbnMpIHtcblxuICAgIC8vIEZpbmQgdGhlIGJlc3QgcG9zaXRpb24gZm9yIGEgY3VlIGJveCwgYiwgb24gdGhlIHZpZGVvLiBUaGUgYXhpcyBwYXJhbWV0ZXJcbiAgICAvLyBpcyBhIGxpc3Qgb2YgYXhpcywgdGhlIG9yZGVyIG9mIHdoaWNoLCBpdCB3aWxsIG1vdmUgdGhlIGJveCBhbG9uZy4gRm9yIGV4YW1wbGU6XG4gICAgLy8gUGFzc2luZyBbXCIreFwiLCBcIi14XCJdIHdpbGwgbW92ZSB0aGUgYm94IGZpcnN0IGFsb25nIHRoZSB4IGF4aXMgaW4gdGhlIHBvc2l0aXZlXG4gICAgLy8gZGlyZWN0aW9uLiBJZiBpdCBkb2Vzbid0IGZpbmQgYSBnb29kIHBvc2l0aW9uIGZvciBpdCB0aGVyZSBpdCB3aWxsIHRoZW4gbW92ZVxuICAgIC8vIGl0IGFsb25nIHRoZSB4IGF4aXMgaW4gdGhlIG5lZ2F0aXZlIGRpcmVjdGlvbi5cbiAgICBmdW5jdGlvbiBmaW5kQmVzdFBvc2l0aW9uKGIsIGF4aXMpIHtcbiAgICAgICAgdmFyIGJlc3RQb3NpdGlvbixcbiAgICAgICAgICAgIHNwZWNpZmllZFBvc2l0aW9uID0gbmV3IEJveFBvc2l0aW9uKGIpLFxuICAgICAgICAgICAgcGVyY2VudGFnZSA9IDE7IC8vIEhpZ2hlc3QgcG9zc2libGUgc28gdGhlIGZpcnN0IHRoaW5nIHdlIGdldCBpcyBiZXR0ZXIuXG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBheGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB3aGlsZSAoYi5vdmVybGFwc09wcG9zaXRlQXhpcyhjb250YWluZXJCb3gsIGF4aXNbaV0pIHx8XG4gICAgICAgICAgICAoYi53aXRoaW4oY29udGFpbmVyQm94KSAmJiBiLm92ZXJsYXBzQW55KGJveFBvc2l0aW9ucykpKSB7XG4gICAgICAgICAgICAgICAgYi5tb3ZlKGF4aXNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gV2UgZm91bmQgYSBzcG90IHdoZXJlIHdlIGFyZW4ndCBvdmVybGFwcGluZyBhbnl0aGluZy4gVGhpcyBpcyBvdXJcbiAgICAgICAgICAgIC8vIGJlc3QgcG9zaXRpb24uXG4gICAgICAgICAgICBpZiAoYi53aXRoaW4oY29udGFpbmVyQm94KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHAgPSBiLmludGVyc2VjdFBlcmNlbnRhZ2UoY29udGFpbmVyQm94KTtcbiAgICAgICAgICAgIC8vIElmIHdlJ3JlIG91dHNpZGUgdGhlIGNvbnRhaW5lciBib3ggbGVzcyB0aGVuIHdlIHdlcmUgb24gb3VyIGxhc3QgdHJ5XG4gICAgICAgICAgICAvLyB0aGVuIHJlbWVtYmVyIHRoaXMgcG9zaXRpb24gYXMgdGhlIGJlc3QgcG9zaXRpb24uXG4gICAgICAgICAgICBpZiAocGVyY2VudGFnZSA+IHApIHtcbiAgICAgICAgICAgICAgICBiZXN0UG9zaXRpb24gPSBuZXcgQm94UG9zaXRpb24oYik7XG4gICAgICAgICAgICAgICAgcGVyY2VudGFnZSA9IHA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBSZXNldCB0aGUgYm94IHBvc2l0aW9uIHRvIHRoZSBzcGVjaWZpZWQgcG9zaXRpb24uXG4gICAgICAgICAgICBiID0gbmV3IEJveFBvc2l0aW9uKHNwZWNpZmllZFBvc2l0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYmVzdFBvc2l0aW9uIHx8IHNwZWNpZmllZFBvc2l0aW9uO1xuICAgIH1cblxuICAgIHZhciBib3hQb3NpdGlvbiA9IG5ldyBCb3hQb3NpdGlvbihzdHlsZUJveCksXG4gICAgICAgIGN1ZSA9IHN0eWxlQm94LmN1ZSxcbiAgICAgICAgbGluZVBvcyA9IGNvbXB1dGVMaW5lUG9zKGN1ZSksXG4gICAgICAgIGF4aXMgPSBbXTtcblxuICAgIC8vIElmIHdlIGhhdmUgYSBsaW5lIG51bWJlciB0byBhbGlnbiB0aGUgY3VlIHRvLlxuICAgIGlmIChjdWUuc25hcFRvTGluZXMpIHtcbiAgICAgICAgdmFyIHNpemU7XG4gICAgICAgIHN3aXRjaCAoY3VlLnZlcnRpY2FsKSB7XG4gICAgICAgICAgICBjYXNlIFwiXCI6XG4gICAgICAgICAgICAgICAgYXhpcyA9IFsgXCIreVwiLCBcIi15XCIgXTtcbiAgICAgICAgICAgICAgICBzaXplID0gXCJoZWlnaHRcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJybFwiOlxuICAgICAgICAgICAgICAgIGF4aXMgPSBbIFwiK3hcIiwgXCIteFwiIF07XG4gICAgICAgICAgICAgICAgc2l6ZSA9IFwid2lkdGhcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJsclwiOlxuICAgICAgICAgICAgICAgIGF4aXMgPSBbIFwiLXhcIiwgXCIreFwiIF07XG4gICAgICAgICAgICAgICAgc2l6ZSA9IFwid2lkdGhcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzdGVwID0gYm94UG9zaXRpb24ubGluZUhlaWdodCxcbiAgICAgICAgICAgIHBvc2l0aW9uID0gc3RlcCAqIE1hdGgucm91bmQobGluZVBvcyksXG4gICAgICAgICAgICBtYXhQb3NpdGlvbiA9IGNvbnRhaW5lckJveFtzaXplXSArIHN0ZXAsXG4gICAgICAgICAgICBpbml0aWFsQXhpcyA9IGF4aXNbMF07XG5cbiAgICAgICAgLy8gSWYgdGhlIHNwZWNpZmllZCBpbnRpYWwgcG9zaXRpb24gaXMgZ3JlYXRlciB0aGVuIHRoZSBtYXggcG9zaXRpb24gdGhlblxuICAgICAgICAvLyBjbGFtcCB0aGUgYm94IHRvIHRoZSBhbW91bnQgb2Ygc3RlcHMgaXQgd291bGQgdGFrZSBmb3IgdGhlIGJveCB0b1xuICAgICAgICAvLyByZWFjaCB0aGUgbWF4IHBvc2l0aW9uLlxuICAgICAgICBpZiAoTWF0aC5hYnMocG9zaXRpb24pID4gbWF4UG9zaXRpb24pIHtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gcG9zaXRpb24gPCAwID8gLTEgOiAxO1xuICAgICAgICAgICAgcG9zaXRpb24gKj0gTWF0aC5jZWlsKG1heFBvc2l0aW9uIC8gc3RlcCkgKiBzdGVwO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgY29tcHV0ZWQgbGluZSBwb3NpdGlvbiByZXR1cm5zIG5lZ2F0aXZlIHRoZW4gbGluZSBudW1iZXJzIGFyZVxuICAgICAgICAvLyByZWxhdGl2ZSB0byB0aGUgYm90dG9tIG9mIHRoZSB2aWRlbyBpbnN0ZWFkIG9mIHRoZSB0b3AuIFRoZXJlZm9yZSwgd2VcbiAgICAgICAgLy8gbmVlZCB0byBpbmNyZWFzZSBvdXIgaW5pdGlhbCBwb3NpdGlvbiBieSB0aGUgbGVuZ3RoIG9yIHdpZHRoIG9mIHRoZVxuICAgICAgICAvLyB2aWRlbywgZGVwZW5kaW5nIG9uIHRoZSB3cml0aW5nIGRpcmVjdGlvbiwgYW5kIHJldmVyc2Ugb3VyIGF4aXMgZGlyZWN0aW9ucy5cbiAgICAgICAgaWYgKGxpbmVQb3MgPCAwKSB7XG4gICAgICAgICAgICBwb3NpdGlvbiArPSBjdWUudmVydGljYWwgPT09IFwiXCIgPyBjb250YWluZXJCb3guaGVpZ2h0IDogY29udGFpbmVyQm94LndpZHRoO1xuICAgICAgICAgICAgYXhpcyA9IGF4aXMucmV2ZXJzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTW92ZSB0aGUgYm94IHRvIHRoZSBzcGVjaWZpZWQgcG9zaXRpb24uIFRoaXMgbWF5IG5vdCBiZSBpdHMgYmVzdFxuICAgICAgICAvLyBwb3NpdGlvbi5cbiAgICAgICAgYm94UG9zaXRpb24ubW92ZShpbml0aWFsQXhpcywgcG9zaXRpb24pO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gSWYgd2UgaGF2ZSBhIHBlcmNlbnRhZ2UgbGluZSB2YWx1ZSBmb3IgdGhlIGN1ZS5cbiAgICAgICAgdmFyIGNhbGN1bGF0ZWRQZXJjZW50YWdlID0gKGJveFBvc2l0aW9uLmxpbmVIZWlnaHQgLyBjb250YWluZXJCb3guaGVpZ2h0KSAqIDEwMDtcblxuICAgICAgICBzd2l0Y2ggKGN1ZS5saW5lQWxpZ24pIHtcbiAgICAgICAgICAgIGNhc2UgXCJtaWRkbGVcIjpcbiAgICAgICAgICAgICAgICBsaW5lUG9zIC09IChjYWxjdWxhdGVkUGVyY2VudGFnZSAvIDIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIGxpbmVQb3MgLT0gY2FsY3VsYXRlZFBlcmNlbnRhZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBcHBseSBpbml0aWFsIGxpbmUgcG9zaXRpb24gdG8gdGhlIGN1ZSBib3guXG4gICAgICAgIHN3aXRjaCAoY3VlLnZlcnRpY2FsKSB7XG4gICAgICAgICAgICBjYXNlIFwiXCI6XG4gICAgICAgICAgICAgICAgc3R5bGVCb3guYXBwbHlTdHlsZXMoe1xuICAgICAgICAgICAgICAgICAgICB0b3A6IHN0eWxlQm94LmZvcm1hdFN0eWxlKGxpbmVQb3MsIFwiJVwiKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInJsXCI6XG4gICAgICAgICAgICAgICAgc3R5bGVCb3guYXBwbHlTdHlsZXMoe1xuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBzdHlsZUJveC5mb3JtYXRTdHlsZShsaW5lUG9zLCBcIiVcIilcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJsclwiOlxuICAgICAgICAgICAgICAgIHN0eWxlQm94LmFwcGx5U3R5bGVzKHtcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IHN0eWxlQm94LmZvcm1hdFN0eWxlKGxpbmVQb3MsIFwiJVwiKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgYXhpcyA9IFsgXCIreVwiLCBcIi14XCIsIFwiK3hcIiwgXCIteVwiIF07XG5cbiAgICAgICAgLy8gR2V0IHRoZSBib3ggcG9zaXRpb24gYWdhaW4gYWZ0ZXIgd2UndmUgYXBwbGllZCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uaW5nXG4gICAgICAgIC8vIHRvIGl0LlxuICAgICAgICBib3hQb3NpdGlvbiA9IG5ldyBCb3hQb3NpdGlvbihzdHlsZUJveCk7XG4gICAgfVxuXG4gICAgdmFyIGJlc3RQb3NpdGlvbiA9IGZpbmRCZXN0UG9zaXRpb24oYm94UG9zaXRpb24sIGF4aXMpO1xuICAgIHN0eWxlQm94Lm1vdmUoYmVzdFBvc2l0aW9uLnRvQ1NTQ29tcGF0VmFsdWVzKGNvbnRhaW5lckJveCkpO1xufVxuXG4vKmZ1bmN0aW9uIFdlYlZUVCgpIHtcbiAvLyBOb3RoaW5nXG4gfSovXG5cbi8vIEhlbHBlciB0byBhbGxvdyBzdHJpbmdzIHRvIGJlIGRlY29kZWQgaW5zdGVhZCBvZiB0aGUgZGVmYXVsdCBiaW5hcnkgdXRmOCBkYXRhLlxuV2ViVlRULlN0cmluZ0RlY29kZXIgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBkZWNvZGU6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3IgLSBleHBlY3RlZCBzdHJpbmcgZGF0YS5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGVuY29kZVVSSUNvbXBvbmVudChkYXRhKSk7XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuV2ViVlRULmNvbnZlcnRDdWVUb0RPTVRyZWUgPSBmdW5jdGlvbih3aW5kb3csIGN1ZXRleHQpIHtcbiAgICBpZiAoIXdpbmRvdyB8fCAhY3VldGV4dCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHBhcnNlQ29udGVudCh3aW5kb3csIGN1ZXRleHQpO1xufTtcblxudmFyIEZPTlRfU0laRV9QRVJDRU5UID0gMC4wNTtcbnZhciBGT05UX1NUWUxFID0gXCJzYW5zLXNlcmlmXCI7XG52YXIgQ1VFX0JBQ0tHUk9VTkRfUEFERElORyA9IFwiMS41JVwiO1xuXG4vLyBSdW5zIHRoZSBwcm9jZXNzaW5nIG1vZGVsIG92ZXIgdGhlIGN1ZXMgYW5kIHJlZ2lvbnMgcGFzc2VkIHRvIGl0LlxuLy8gQHBhcmFtIG92ZXJsYXkgQSBibG9jayBsZXZlbCBlbGVtZW50ICh1c3VhbGx5IGEgZGl2KSB0aGF0IHRoZSBjb21wdXRlZCBjdWVzXG4vLyAgICAgICAgICAgICAgICBhbmQgcmVnaW9ucyB3aWxsIGJlIHBsYWNlZCBpbnRvLlxuV2ViVlRULnByb2Nlc3NDdWVzID0gZnVuY3Rpb24od2luZG93LCBjdWVzLCBvdmVybGF5KSB7XG4gICAgaWYgKCF3aW5kb3cgfHwgIWN1ZXMgfHwgIW92ZXJsYXkpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIGFsbCBwcmV2aW91cyBjaGlsZHJlbi5cbiAgICB3aGlsZSAob3ZlcmxheS5maXJzdENoaWxkKSB7XG4gICAgICAgIG92ZXJsYXkucmVtb3ZlQ2hpbGQob3ZlcmxheS5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICB2YXIgcGFkZGVkT3ZlcmxheSA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHBhZGRlZE92ZXJsYXkuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgcGFkZGVkT3ZlcmxheS5zdHlsZS5sZWZ0ID0gXCIwXCI7XG4gICAgcGFkZGVkT3ZlcmxheS5zdHlsZS5yaWdodCA9IFwiMFwiO1xuICAgIHBhZGRlZE92ZXJsYXkuc3R5bGUudG9wID0gXCIwXCI7XG4gICAgcGFkZGVkT3ZlcmxheS5zdHlsZS5ib3R0b20gPSBcIjBcIjtcbiAgICBwYWRkZWRPdmVybGF5LnN0eWxlLm1hcmdpbiA9IENVRV9CQUNLR1JPVU5EX1BBRERJTkc7XG4gICAgb3ZlcmxheS5hcHBlbmRDaGlsZChwYWRkZWRPdmVybGF5KTtcblxuICAgIC8vIERldGVybWluZSBpZiB3ZSBuZWVkIHRvIGNvbXB1dGUgdGhlIGRpc3BsYXkgc3RhdGVzIG9mIHRoZSBjdWVzLiBUaGlzIGNvdWxkXG4gICAgLy8gYmUgdGhlIGNhc2UgaWYgYSBjdWUncyBzdGF0ZSBoYXMgYmVlbiBjaGFuZ2VkIHNpbmNlIHRoZSBsYXN0IGNvbXB1dGF0aW9uIG9yXG4gICAgLy8gaWYgaXQgaGFzIG5vdCBiZWVuIGNvbXB1dGVkIHlldC5cbiAgICBmdW5jdGlvbiBzaG91bGRDb21wdXRlKGN1ZXMpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoY3Vlc1tpXS5oYXNCZWVuUmVzZXQgfHwgIWN1ZXNbaV0uZGlzcGxheVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIFdlIGRvbid0IG5lZWQgdG8gcmVjb21wdXRlIHRoZSBjdWVzJyBkaXNwbGF5IHN0YXRlcy4gSnVzdCByZXVzZSB0aGVtLlxuICAgIGlmICghc2hvdWxkQ29tcHV0ZShjdWVzKSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGN1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHBhZGRlZE92ZXJsYXkuYXBwZW5kQ2hpbGQoY3Vlc1tpXS5kaXNwbGF5U3RhdGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgYm94UG9zaXRpb25zID0gW10sXG4gICAgICAgIGNvbnRhaW5lckJveCA9IEJveFBvc2l0aW9uLmdldFNpbXBsZUJveFBvc2l0aW9uKHBhZGRlZE92ZXJsYXkpLFxuICAgICAgICBmb250U2l6ZSA9IE1hdGgucm91bmQoY29udGFpbmVyQm94LmhlaWdodCAqIEZPTlRfU0laRV9QRVJDRU5UICogMTAwKSAvIDEwMDtcbiAgICB2YXIgc3R5bGVPcHRpb25zID0ge1xuICAgICAgICBmb250OiAoZm9udFNpemUgKiBmb250U2NhbGUpICsgXCJweCBcIiArIEZPTlRfU1RZTEVcbiAgICB9O1xuXG4gICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc3R5bGVCb3gsIGN1ZTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGN1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGN1ZSA9IGN1ZXNbaV07XG5cbiAgICAgICAgICAgIC8vIENvbXB1dGUgdGhlIGludGlhbCBwb3NpdGlvbiBhbmQgc3R5bGVzIG9mIHRoZSBjdWUgZGl2LlxuICAgICAgICAgICAgc3R5bGVCb3ggPSBuZXcgQ3VlU3R5bGVCb3god2luZG93LCBjdWUsIHN0eWxlT3B0aW9ucyk7XG4gICAgICAgICAgICBwYWRkZWRPdmVybGF5LmFwcGVuZENoaWxkKHN0eWxlQm94LmRpdik7XG5cbiAgICAgICAgICAgIC8vIE1vdmUgdGhlIGN1ZSBkaXYgdG8gaXQncyBjb3JyZWN0IGxpbmUgcG9zaXRpb24uXG4gICAgICAgICAgICBtb3ZlQm94VG9MaW5lUG9zaXRpb24od2luZG93LCBzdHlsZUJveCwgY29udGFpbmVyQm94LCBib3hQb3NpdGlvbnMpO1xuXG4gICAgICAgICAgICAvLyBSZW1lbWJlciB0aGUgY29tcHV0ZWQgZGl2IHNvIHRoYXQgd2UgZG9uJ3QgaGF2ZSB0byByZWNvbXB1dGUgaXQgbGF0ZXJcbiAgICAgICAgICAgIC8vIGlmIHdlIGRvbid0IGhhdmUgdG9vLlxuICAgICAgICAgICAgY3VlLmRpc3BsYXlTdGF0ZSA9IHN0eWxlQm94LmRpdjtcblxuICAgICAgICAgICAgYm94UG9zaXRpb25zLnB1c2goQm94UG9zaXRpb24uZ2V0U2ltcGxlQm94UG9zaXRpb24oc3R5bGVCb3gpKTtcbiAgICAgICAgfVxuICAgIH0pKCk7XG59O1xuXG5XZWJWVFQuUGFyc2VyID0gZnVuY3Rpb24od2luZG93LCBkZWNvZGVyKSB7XG4gICAgdGhpcy53aW5kb3cgPSB3aW5kb3c7XG4gICAgdGhpcy5zdGF0ZSA9IFwiSU5JVElBTFwiO1xuICAgIHRoaXMuYnVmZmVyID0gXCJcIjtcbiAgICB0aGlzLmRlY29kZXIgPSBkZWNvZGVyIHx8IG5ldyBUZXh0RGVjb2RlcihcInV0ZjhcIik7XG4gICAgdGhpcy5yZWdpb25MaXN0ID0gW107XG59O1xuXG5XZWJWVFQuUGFyc2VyLnByb3RvdHlwZSA9IHtcbiAgICAvLyBJZiB0aGUgZXJyb3IgaXMgYSBQYXJzaW5nRXJyb3IgdGhlbiByZXBvcnQgaXQgdG8gdGhlIGNvbnN1bWVyIGlmXG4gICAgLy8gcG9zc2libGUuIElmIGl0J3Mgbm90IGEgUGFyc2luZ0Vycm9yIHRoZW4gdGhyb3cgaXQgbGlrZSBub3JtYWwuXG4gICAgcmVwb3J0T3JUaHJvd0Vycm9yOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChlIGluc3RhbmNlb2YgUGFyc2luZ0Vycm9yKSB7XG4gICAgICAgICAgICB0aGlzLm9ucGFyc2luZ2Vycm9yICYmIHRoaXMub25wYXJzaW5nZXJyb3IoZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBwYXJzZTogZnVuY3Rpb24gKGRhdGEsIGZsdXNoaW5nKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gZGF0YSB0aGVuIHdlIHdvbid0IGRlY29kZSBpdCwgYnV0IHdpbGwganVzdCB0cnkgdG8gcGFyc2VcbiAgICAgICAgLy8gd2hhdGV2ZXIgaXMgaW4gYnVmZmVyIGFscmVhZHkuIFRoaXMgbWF5IG9jY3VyIGluIGNpcmN1bXN0YW5jZXMsIGZvclxuICAgICAgICAvLyBleGFtcGxlIHdoZW4gZmx1c2goKSBpcyBjYWxsZWQuXG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAvLyBUcnkgdG8gZGVjb2RlIHRoZSBkYXRhIHRoYXQgd2UgcmVjZWl2ZWQuXG4gICAgICAgICAgICBzZWxmLmJ1ZmZlciArPSBzZWxmLmRlY29kZXIuZGVjb2RlKGRhdGEsIHtzdHJlYW06IHRydWV9KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBjb2xsZWN0TmV4dExpbmUoKSB7XG4gICAgICAgICAgICB2YXIgYnVmZmVyID0gc2VsZi5idWZmZXI7XG4gICAgICAgICAgICB2YXIgcG9zID0gMDtcbiAgICAgICAgICAgIHdoaWxlIChwb3MgPCBidWZmZXIubGVuZ3RoICYmIGJ1ZmZlcltwb3NdICE9PSAnXFxyJyAmJiBidWZmZXJbcG9zXSAhPT0gJ1xcbicpIHtcbiAgICAgICAgICAgICAgICArK3BvcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBsaW5lID0gYnVmZmVyLnN1YnN0cigwLCBwb3MpO1xuICAgICAgICAgICAgLy8gQWR2YW5jZSB0aGUgYnVmZmVyIGVhcmx5IGluIGNhc2Ugd2UgZmFpbCBiZWxvdy5cbiAgICAgICAgICAgIGlmIChidWZmZXJbcG9zXSA9PT0gJ1xccicpIHtcbiAgICAgICAgICAgICAgICArK3BvcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChidWZmZXJbcG9zXSA9PT0gJ1xcbicpIHtcbiAgICAgICAgICAgICAgICArK3BvcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuYnVmZmVyID0gYnVmZmVyLnN1YnN0cihwb3MpO1xuICAgICAgICAgICAgcmV0dXJuIGxpbmU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAzLjQgV2ViVlRUIHJlZ2lvbiBhbmQgV2ViVlRUIHJlZ2lvbiBzZXR0aW5ncyBzeW50YXhcbiAgICAgICAgZnVuY3Rpb24gcGFyc2VSZWdpb24oaW5wdXQpIHtcbiAgICAgICAgICAgIHZhciBzZXR0aW5ncyA9IG5ldyBTZXR0aW5ncygpO1xuXG4gICAgICAgICAgICBwYXJzZU9wdGlvbnMoaW5wdXQsIGZ1bmN0aW9uIChrLCB2KSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJpZFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3Muc2V0KGssIHYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ3aWR0aFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MucGVyY2VudChrLCB2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwibGluZXNcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLmludGVnZXIoaywgdik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInJlZ2lvbmFuY2hvclwiOlxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwidmlld3BvcnRhbmNob3JcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB4eSA9IHYuc3BsaXQoJywnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh4eS5sZW5ndGggIT09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIGhhdmUgdG8gbWFrZSBzdXJlIGJvdGggeCBhbmQgeSBwYXJzZSwgc28gdXNlIGEgdGVtcG9yYXJ5XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzZXR0aW5ncyBvYmplY3QgaGVyZS5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhbmNob3IgPSBuZXcgU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuY2hvci5wZXJjZW50KFwieFwiLCB4eVswXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmNob3IucGVyY2VudChcInlcIiwgeHlbMV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhbmNob3IuaGFzKFwieFwiKSB8fCAhYW5jaG9yLmhhcyhcInlcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLnNldChrICsgXCJYXCIsIGFuY2hvci5nZXQoXCJ4XCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLnNldChrICsgXCJZXCIsIGFuY2hvci5nZXQoXCJ5XCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwic2Nyb2xsXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5hbHQoaywgdiwgW1widXBcIl0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgLz0vLCAvXFxzLyk7XG5cbiAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgcmVnaW9uLCB1c2luZyBkZWZhdWx0IHZhbHVlcyBmb3IgYW55IHZhbHVlcyB0aGF0IHdlcmUgbm90XG4gICAgICAgICAgICAvLyBzcGVjaWZpZWQuXG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MuaGFzKFwiaWRcIikpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVnaW9uID0gbmV3IHNlbGYud2luZG93LlZUVFJlZ2lvbigpO1xuICAgICAgICAgICAgICAgIHJlZ2lvbi53aWR0aCA9IHNldHRpbmdzLmdldChcIndpZHRoXCIsIDEwMCk7XG4gICAgICAgICAgICAgICAgcmVnaW9uLmxpbmVzID0gc2V0dGluZ3MuZ2V0KFwibGluZXNcIiwgMyk7XG4gICAgICAgICAgICAgICAgcmVnaW9uLnJlZ2lvbkFuY2hvclggPSBzZXR0aW5ncy5nZXQoXCJyZWdpb25hbmNob3JYXCIsIDApO1xuICAgICAgICAgICAgICAgIHJlZ2lvbi5yZWdpb25BbmNob3JZID0gc2V0dGluZ3MuZ2V0KFwicmVnaW9uYW5jaG9yWVwiLCAxMDApO1xuICAgICAgICAgICAgICAgIHJlZ2lvbi52aWV3cG9ydEFuY2hvclggPSBzZXR0aW5ncy5nZXQoXCJ2aWV3cG9ydGFuY2hvclhcIiwgMCk7XG4gICAgICAgICAgICAgICAgcmVnaW9uLnZpZXdwb3J0QW5jaG9yWSA9IHNldHRpbmdzLmdldChcInZpZXdwb3J0YW5jaG9yWVwiLCAxMDApO1xuICAgICAgICAgICAgICAgIHJlZ2lvbi5zY3JvbGwgPSBzZXR0aW5ncy5nZXQoXCJzY3JvbGxcIiwgXCJcIik7XG4gICAgICAgICAgICAgICAgLy8gUmVnaXN0ZXIgdGhlIHJlZ2lvbi5cbiAgICAgICAgICAgICAgICBzZWxmLm9ucmVnaW9uICYmIHNlbGYub25yZWdpb24ocmVnaW9uKTtcbiAgICAgICAgICAgICAgICAvLyBSZW1lbWJlciB0aGUgVlRUUmVnaW9uIGZvciBsYXRlciBpbiBjYXNlIHdlIHBhcnNlIGFueSBWVFRDdWVzIHRoYXRcbiAgICAgICAgICAgICAgICAvLyByZWZlcmVuY2UgaXQuXG4gICAgICAgICAgICAgICAgc2VsZi5yZWdpb25MaXN0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBpZDogc2V0dGluZ3MuZ2V0KFwiaWRcIiksXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lvbjogcmVnaW9uXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyAzLjIgV2ViVlRUIG1ldGFkYXRhIGhlYWRlciBzeW50YXhcbiAgICAgICAgZnVuY3Rpb24gcGFyc2VIZWFkZXIoaW5wdXQpIHtcbiAgICAgICAgICAgIHBhcnNlT3B0aW9ucyhpbnB1dCwgZnVuY3Rpb24gKGssIHYpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGspIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlJlZ2lvblwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gMy4zIFdlYlZUVCByZWdpb24gbWV0YWRhdGEgaGVhZGVyIHN5bnRheFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VSZWdpb24odik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAvOi8pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gNS4xIFdlYlZUVCBmaWxlIHBhcnNpbmcuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgbGluZTtcbiAgICAgICAgICAgIGlmIChzZWxmLnN0YXRlID09PSBcIklOSVRJQUxcIikge1xuICAgICAgICAgICAgICAgIC8vIFdlIGNhbid0IHN0YXJ0IHBhcnNpbmcgdW50aWwgd2UgaGF2ZSB0aGUgZmlyc3QgbGluZS5cbiAgICAgICAgICAgICAgICBpZiAoIS9cXHJcXG58XFxuLy50ZXN0KHNlbGYuYnVmZmVyKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsaW5lID0gY29sbGVjdE5leHRMaW5lKCk7XG5cbiAgICAgICAgICAgICAgICB2YXIgbSA9IGxpbmUubWF0Y2goL15XRUJWVFQoWyBcXHRdLiopPyQvKTtcbiAgICAgICAgICAgICAgICBpZiAoIW0gfHwgIW1bMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNpbmdFcnJvcihQYXJzaW5nRXJyb3IuRXJyb3JzLkJhZFNpZ25hdHVyZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc2VsZi5zdGF0ZSA9IFwiSEVBREVSXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBhbHJlYWR5Q29sbGVjdGVkTGluZSA9IGZhbHNlO1xuICAgICAgICAgICAgd2hpbGUgKHNlbGYuYnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgLy8gV2UgY2FuJ3QgcGFyc2UgYSBsaW5lIHVudGlsIHdlIGhhdmUgdGhlIGZ1bGwgbGluZS5cbiAgICAgICAgICAgICAgICBpZiAoIS9cXHJcXG58XFxuLy50ZXN0KHNlbGYuYnVmZmVyKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIWFscmVhZHlDb2xsZWN0ZWRMaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUgPSBjb2xsZWN0TmV4dExpbmUoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhbHJlYWR5Q29sbGVjdGVkTGluZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHNlbGYuc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIkhFQURFUlwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gMTMtMTggLSBBbGxvdyBhIGhlYWRlciAobWV0YWRhdGEpIHVuZGVyIHRoZSBXRUJWVFQgbGluZS5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgvOi8udGVzdChsaW5lKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlSGVhZGVyKGxpbmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghbGluZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFuIGVtcHR5IGxpbmUgdGVybWluYXRlcyB0aGUgaGVhZGVyIGFuZCBzdGFydHMgdGhlIGJvZHkgKGN1ZXMpLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc3RhdGUgPSBcIklEXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIk5PVEVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElnbm9yZSBOT1RFIGJsb2Nrcy5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbGluZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc3RhdGUgPSBcIklEXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIklEXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBmb3IgdGhlIHN0YXJ0IG9mIE5PVEUgYmxvY2tzLlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKC9eTk9URSgkfFsgXFx0XSkvLnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnN0YXRlID0gXCJOT1RFXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAxOS0yOSAtIEFsbG93IGFueSBudW1iZXIgb2YgbGluZSB0ZXJtaW5hdG9ycywgdGhlbiBpbml0aWFsaXplIG5ldyBjdWUgdmFsdWVzLlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmN1ZSA9IG5ldyBzZWxmLndpbmRvdy5WVFRDdWUoMCwgMCwgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnN0YXRlID0gXCJDVUVcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIDMwLTM5IC0gQ2hlY2sgaWYgc2VsZiBsaW5lIGNvbnRhaW5zIGFuIG9wdGlvbmFsIGlkZW50aWZpZXIgb3IgdGltaW5nIGRhdGEuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGluZS5pbmRleE9mKFwiLS0+XCIpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY3VlLmlkID0gbGluZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gUHJvY2VzcyBsaW5lIGFzIHN0YXJ0IG9mIGEgY3VlLlxuICAgICAgICAgICAgICAgICAgICAvKmZhbGxzIHRocm91Z2gqL1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiQ1VFXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyA0MCAtIENvbGxlY3QgY3VlIHRpbWluZ3MgYW5kIHNldHRpbmdzLlxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZUN1ZShsaW5lLCBzZWxmLmN1ZSwgc2VsZi5yZWdpb25MaXN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJlcG9ydE9yVGhyb3dFcnJvcihlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJbiBjYXNlIG9mIGFuIGVycm9yIGlnbm9yZSByZXN0IG9mIHRoZSBjdWUuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jdWUgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc3RhdGUgPSBcIkJBRENVRVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zdGF0ZSA9IFwiQ1VFVEVYVFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJDVUVURVhUXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaGFzU3Vic3RyaW5nID0gbGluZS5pbmRleE9mKFwiLS0+XCIpICE9PSAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIDM0IC0gSWYgd2UgaGF2ZSBhbiBlbXB0eSBsaW5lIHRoZW4gcmVwb3J0IHRoZSBjdWUuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAzNSAtIElmIHdlIGhhdmUgdGhlIHNwZWNpYWwgc3Vic3RyaW5nICctLT4nIHRoZW4gcmVwb3J0IHRoZSBjdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBidXQgZG8gbm90IGNvbGxlY3QgdGhlIGxpbmUgYXMgd2UgbmVlZCB0byBwcm9jZXNzIHRoZSBjdXJyZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvbmUgYXMgYSBuZXcgY3VlLlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFsaW5lIHx8IGhhc1N1YnN0cmluZyAmJiAoYWxyZWFkeUNvbGxlY3RlZExpbmUgPSB0cnVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIGFyZSBkb25lIHBhcnNpbmcgc2VsZiBjdWUuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5vbmN1ZSAmJiBzZWxmLm9uY3VlKHNlbGYuY3VlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmN1ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zdGF0ZSA9IFwiSURcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLmN1ZS50ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jdWUudGV4dCArPSBcIlxcblwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jdWUudGV4dCArPSBsaW5lO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJCQURDVUVcIjogLy8gQkFEQ1VFXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyA1NC02MiAtIENvbGxlY3QgYW5kIGRpc2NhcmQgdGhlIHJlbWFpbmluZyBjdWUuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnN0YXRlID0gXCJJRFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGlmICghZmx1c2hpbmcpIHtcbiAgICAgICAgICAgICAgICAvL+uVjOuVjOuhnCAo7ZWc6riHIHZ0dOuhnCDstpTsoJUpIGN1ZeqwgCDrgqjslYQg7J6I64qU7LGE66GcIHNlbGYuZmx1c2goKeulvCDtmLjstpztlbTshJwgY3Vl6rCAIOyeiOq4sCDrlYzrrLjsl5Ag64uk7IucIHNlbGYucGFyc2UoKeulvCDtg4DripQg6rK97Jqw6rCAIOyDneq5gC5cbiAgICAgICAgICAgICAgICAvL+yZnCDsnbTroIfqsowg7Kec7JesIOyeiOuKlOyngCDrqqjrpbTqsqDqs6Ag7J2864uoIOyVhOuemOyZgCDqsJnsnYAg7L2U65Oc66GcIOychOq4sOulvCDqt7nrs7XtlZzri6QuXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuc3RhdGUgPT09IFwiQ1VFVEVYVFwiICYmIHNlbGYuY3VlICYmIHNlbGYub25jdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5vbmN1ZShzZWxmLmN1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGYuZmx1c2goKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgc2VsZi5yZXBvcnRPclRocm93RXJyb3IoZSk7XG4gICAgICAgICAgICAvLyBJZiB3ZSBhcmUgY3VycmVudGx5IHBhcnNpbmcgYSBjdWUsIHJlcG9ydCB3aGF0IHdlIGhhdmUuXG4gICAgICAgICAgICBpZiAoc2VsZi5zdGF0ZSA9PT0gXCJDVUVURVhUXCIgJiYgc2VsZi5jdWUgJiYgc2VsZi5vbmN1ZSkge1xuICAgICAgICAgICAgICAgIHNlbGYub25jdWUoc2VsZi5jdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5jdWUgPSBudWxsO1xuICAgICAgICAgICAgLy8gRW50ZXIgQkFEV0VCVlRUIHN0YXRlIGlmIGhlYWRlciB3YXMgbm90IHBhcnNlZCBjb3JyZWN0bHkgb3RoZXJ3aXNlXG4gICAgICAgICAgICAvLyBhbm90aGVyIGV4Y2VwdGlvbiBvY2N1cnJlZCBzbyBlbnRlciBCQURDVUUgc3RhdGUuXG4gICAgICAgICAgICBzZWxmLnN0YXRlID0gc2VsZi5zdGF0ZSA9PT0gXCJJTklUSUFMXCIgPyBcIkJBRFdFQlZUVFwiIDogXCJCQURDVUVcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIGZsdXNoOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gRmluaXNoIGRlY29kaW5nIHRoZSBzdHJlYW0uXG4gICAgICAgICAgICBzZWxmLmJ1ZmZlciArPSBzZWxmLmRlY29kZXIuZGVjb2RlKCk7XG4gICAgICAgICAgICAvLyBTeW50aGVzaXplIHRoZSBlbmQgb2YgdGhlIGN1cnJlbnQgY3VlIG9yIHJlZ2lvbi5cbiAgICAgICAgICAgIGlmIChzZWxmLmN1ZSB8fCBzZWxmLnN0YXRlID09PSBcIkhFQURFUlwiKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5idWZmZXIgKz0gXCJcXG5cXG5cIjtcbiAgICAgICAgICAgICAgICBzZWxmLnBhcnNlKG51bGwsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSWYgd2UndmUgZmx1c2hlZCwgcGFyc2VkLCBhbmQgd2UncmUgc3RpbGwgb24gdGhlIElOSVRJQUwgc3RhdGUgdGhlblxuICAgICAgICAgICAgLy8gdGhhdCBtZWFucyB3ZSBkb24ndCBoYXZlIGVub3VnaCBvZiB0aGUgc3RyZWFtIHRvIHBhcnNlIHRoZSBmaXJzdFxuICAgICAgICAgICAgLy8gbGluZS5cbiAgICAgICAgICAgIGlmIChzZWxmLnN0YXRlID09PSBcIklOSVRJQUxcIikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBQYXJzaW5nRXJyb3IoUGFyc2luZ0Vycm9yLkVycm9ycy5CYWRTaWduYXR1cmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICAgIHNlbGYucmVwb3J0T3JUaHJvd0Vycm9yKGUpO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYub25mbHVzaCAmJiBzZWxmLm9uZmx1c2goKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufTtcblxuXG5cblxuZXhwb3J0IGRlZmF1bHQgV2ViVlRUOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMgdnR0LmpzIENvbnRyaWJ1dG9yc1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxubGV0IFZUVFJlZ2lvbiA9IFwiXCI7XG5cbnZhciBzY3JvbGxTZXR0aW5nID0ge1xuICAgIFwiXCI6IHRydWUsXG4gICAgXCJ1cFwiOiB0cnVlXG59O1xuXG5mdW5jdGlvbiBmaW5kU2Nyb2xsU2V0dGluZyh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgc2Nyb2xsID0gc2Nyb2xsU2V0dGluZ1t2YWx1ZS50b0xvd2VyQ2FzZSgpXTtcbiAgICByZXR1cm4gc2Nyb2xsID8gdmFsdWUudG9Mb3dlckNhc2UoKSA6IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBpc1ZhbGlkUGVyY2VudFZhbHVlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiAmJiAodmFsdWUgPj0gMCAmJiB2YWx1ZSA8PSAxMDApO1xufVxuXG4vLyBWVFRSZWdpb24gc2hpbSBodHRwOi8vZGV2LnczLm9yZy9odG1sNS93ZWJ2dHQvI3Z0dHJlZ2lvbi1pbnRlcmZhY2VcblZUVFJlZ2lvbiA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBfd2lkdGggPSAxMDA7XG4gICAgdmFyIF9saW5lcyA9IDM7XG4gICAgdmFyIF9yZWdpb25BbmNob3JYID0gMDtcbiAgICB2YXIgX3JlZ2lvbkFuY2hvclkgPSAxMDA7XG4gICAgdmFyIF92aWV3cG9ydEFuY2hvclggPSAwO1xuICAgIHZhciBfdmlld3BvcnRBbmNob3JZID0gMTAwO1xuICAgIHZhciBfc2Nyb2xsID0gXCJcIjtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcbiAgICAgICAgXCJ3aWR0aFwiOiB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3dpZHRoO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzVmFsaWRQZXJjZW50VmFsdWUodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIldpZHRoIG11c3QgYmUgYmV0d2VlbiAwIGFuZCAxMDAuXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfd2lkdGggPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJsaW5lc1wiOiB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2xpbmVzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJMaW5lcyBtdXN0IGJlIHNldCB0byBhIG51bWJlci5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF9saW5lcyA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInJlZ2lvbkFuY2hvcllcIjoge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9yZWdpb25BbmNob3JZO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzVmFsaWRQZXJjZW50VmFsdWUodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlJlZ2lvbkFuY2hvclggbXVzdCBiZSBiZXR3ZWVuIDAgYW5kIDEwMC5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF9yZWdpb25BbmNob3JZID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwicmVnaW9uQW5jaG9yWFwiOiB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3JlZ2lvbkFuY2hvclg7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmKCFpc1ZhbGlkUGVyY2VudFZhbHVlKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJSZWdpb25BbmNob3JZIG11c3QgYmUgYmV0d2VlbiAwIGFuZCAxMDAuXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfcmVnaW9uQW5jaG9yWCA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInZpZXdwb3J0QW5jaG9yWVwiOiB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3ZpZXdwb3J0QW5jaG9yWTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpc1ZhbGlkUGVyY2VudFZhbHVlKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJWaWV3cG9ydEFuY2hvclkgbXVzdCBiZSBiZXR3ZWVuIDAgYW5kIDEwMC5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF92aWV3cG9ydEFuY2hvclkgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJ2aWV3cG9ydEFuY2hvclhcIjoge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF92aWV3cG9ydEFuY2hvclg7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICghaXNWYWxpZFBlcmNlbnRWYWx1ZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVmlld3BvcnRBbmNob3JYIG11c3QgYmUgYmV0d2VlbiAwIGFuZCAxMDAuXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfdmlld3BvcnRBbmNob3JYID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwic2Nyb2xsXCI6IHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfc2Nyb2xsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2V0dGluZyA9IGZpbmRTY3JvbGxTZXR0aW5nKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAvLyBIYXZlIHRvIGNoZWNrIGZvciBmYWxzZSBhcyBhbiBlbXB0eSBzdHJpbmcgaXMgYSBsZWdhbCB2YWx1ZS5cbiAgICAgICAgICAgICAgICBpZiAoc2V0dGluZyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKFwiQW4gaW52YWxpZCBvciBpbGxlZ2FsIHN0cmluZyB3YXMgc3BlY2lmaWVkLlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3Njcm9sbCA9IHNldHRpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgVlRUUmVnaW9uOyJdLCJzb3VyY2VSb290IjoiIn0=