/*! OvenPlayerv0.7.78 | (c)2018 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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

        // Apply default values for any missing fields.
        cue.region = settings.get("region", null);
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
        }, cue.align);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2NhcHRpb24vcGFyc2VyL1Z0dFBhcnNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvY2FwdGlvbnMvdnR0UmVnaW9uLmpzIl0sIm5hbWVzIjpbIldlYlZUVCIsIm1ha2VDb2xvclNldCIsImNvbG9yIiwib3BhY2l0eSIsInVuZGVmaW5lZCIsInBhcnNlSW50Iiwic3Vic3RyaW5nIiwiam9pbiIsIldlYlZUVFByZWZzIiwiZm9udFNjYWxlIiwib2JzZXJ2ZSIsInN1YmplY3QiLCJ0b3BpYyIsImRhdGEiLCJmb250Q29sb3IiLCJTZXJ2aWNlcyIsInByZWZzIiwiZ2V0Q2hhclByZWYiLCJmb250T3BhY2l0eSIsImdldEludFByZWYiLCJXZWJWVFRTZXQiLCJmb250U2V0IiwiYmFja2dyb3VuZENvbG9yIiwiYmFja2dyb3VuZE9wYWNpdHkiLCJiYWNrZ3JvdW5kU2V0IiwiZWRnZVR5cGVMaXN0IiwiZWRnZVR5cGUiLCJlZGdlQ29sb3IiLCJlZGdlU2V0IiwiZm9yRWFjaCIsInByZWYiLCJhZGRPYnNlcnZlciIsIl9vYmpDcmVhdGUiLCJPYmplY3QiLCJjcmVhdGUiLCJGIiwibyIsImFyZ3VtZW50cyIsImxlbmd0aCIsIkVycm9yIiwicHJvdG90eXBlIiwiUGFyc2luZ0Vycm9yIiwiZXJyb3JEYXRhIiwibWVzc2FnZSIsIm5hbWUiLCJjb2RlIiwiY29uc3RydWN0b3IiLCJFcnJvcnMiLCJCYWRTaWduYXR1cmUiLCJCYWRUaW1lU3RhbXAiLCJwYXJzZVRpbWVTdGFtcCIsImlucHV0IiwiY29tcHV0ZVNlY29uZHMiLCJoIiwibSIsInMiLCJmIiwibWF0Y2giLCJyZXBsYWNlIiwiU2V0dGluZ3MiLCJ2YWx1ZXMiLCJzZXQiLCJrIiwidiIsImdldCIsImRmbHQiLCJkZWZhdWx0S2V5IiwiaGFzIiwiYWx0IiwiYSIsIm4iLCJpbnRlZ2VyIiwidGVzdCIsInBlcmNlbnQiLCJwYXJzZUZsb2F0IiwicGFyc2VPcHRpb25zIiwiY2FsbGJhY2siLCJrZXlWYWx1ZURlbGltIiwiZ3JvdXBEZWxpbSIsImdyb3VwcyIsInNwbGl0IiwiaSIsImt2IiwicGFyc2VDdWUiLCJjdWUiLCJyZWdpb25MaXN0Iiwib0lucHV0IiwiY29uc3VtZVRpbWVTdGFtcCIsInRzIiwiY29uc3VtZUN1ZVNldHRpbmdzIiwic2V0dGluZ3MiLCJpZCIsInJlZ2lvbiIsInZhbHMiLCJ2YWxzMCIsInZlcnRpY2FsIiwibGluZSIsImxpbmVBbGlnbiIsInNuYXBUb0xpbmVzIiwic2l6ZSIsInBvc2l0aW9uIiwicG9zaXRpb25BbGlnbiIsInN0YXJ0IiwibGVmdCIsIm1pZGRsZSIsImVuZCIsInJpZ2h0IiwiYWxpZ24iLCJza2lwV2hpdGVzcGFjZSIsInN0YXJ0VGltZSIsInN1YnN0ciIsImVuZFRpbWUiLCJFU0NBUEUiLCJUQUdfTkFNRSIsImMiLCJiIiwidSIsInJ1YnkiLCJydCIsImxhbmciLCJUQUdfQU5OT1RBVElPTiIsIk5FRURTX1BBUkVOVCIsInBhcnNlQ29udGVudCIsIndpbmRvdyIsIm5leHRUb2tlbiIsImNvbnN1bWUiLCJyZXN1bHQiLCJ1bmVzY2FwZTEiLCJlIiwidW5lc2NhcGUiLCJzaG91bGRBZGQiLCJjdXJyZW50IiwiZWxlbWVudCIsImxvY2FsTmFtZSIsImNyZWF0ZUVsZW1lbnQiLCJ0eXBlIiwiYW5ub3RhdGlvbiIsInRhZ05hbWUiLCJkb2N1bWVudCIsInRyaW0iLCJyb290RGl2IiwidCIsInRhZ1N0YWNrIiwicG9wIiwicGFyZW50Tm9kZSIsIm5vZGUiLCJjcmVhdGVQcm9jZXNzaW5nSW5zdHJ1Y3Rpb24iLCJhcHBlbmRDaGlsZCIsImNsYXNzTmFtZSIsInB1c2giLCJjcmVhdGVUZXh0Tm9kZSIsInN0cm9uZ1JUTENoYXJzIiwiZGV0ZXJtaW5lQmlkaSIsImN1ZURpdiIsIm5vZGVTdGFjayIsInRleHQiLCJjaGFyQ29kZSIsImNoaWxkTm9kZXMiLCJwdXNoTm9kZXMiLCJuZXh0VGV4dE5vZGUiLCJ0ZXh0Q29udGVudCIsImlubmVyVGV4dCIsImNoYXJDb2RlQXQiLCJqIiwiY29tcHV0ZUxpbmVQb3MiLCJ0cmFjayIsInRleHRUcmFja0xpc3QiLCJtZWRpYUVsZW1lbnQiLCJ0cmFja0xpc3QiLCJjb3VudCIsIm1vZGUiLCJTdHlsZUJveCIsImFwcGx5U3R5bGVzIiwic3R5bGVzIiwiZGl2IiwicHJvcCIsImhhc093blByb3BlcnR5Iiwic3R5bGUiLCJmb3JtYXRTdHlsZSIsInZhbCIsInVuaXQiLCJDdWVTdHlsZUJveCIsInN0eWxlT3B0aW9ucyIsImlzSUU4IiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwidGV4dFNoYWRvdyIsImNhbGwiLCJ0b3AiLCJib3R0b20iLCJkaXNwbGF5Iiwid3JpdGluZ01vZGUiLCJ1bmljb2RlQmlkaSIsInRleHRBbGlnbiIsImZvbnQiLCJ3aGl0ZVNwYWNlIiwiZGlyZWN0aW9uIiwic3R5bGVzdW5pY29kZUJpZGkiLCJ0ZXh0UG9zIiwid2lkdGgiLCJoZWlnaHQiLCJtb3ZlIiwiYm94IiwiQm94UG9zaXRpb24iLCJvYmoiLCJsaCIsIm9mZnNldEhlaWdodCIsIm9mZnNldFdpZHRoIiwib2Zmc2V0VG9wIiwicmVjdHMiLCJnZXRDbGllbnRSZWN0cyIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIk1hdGgiLCJtYXgiLCJsaW5lSGVpZ2h0IiwiYXhpcyIsInRvTW92ZSIsIm92ZXJsYXBzIiwiYjIiLCJvdmVybGFwc0FueSIsImJveGVzIiwid2l0aGluIiwiY29udGFpbmVyIiwib3ZlcmxhcHNPcHBvc2l0ZUF4aXMiLCJpbnRlcnNlY3RQZXJjZW50YWdlIiwieCIsIm1pbiIsInkiLCJpbnRlcnNlY3RBcmVhIiwidG9DU1NDb21wYXRWYWx1ZXMiLCJyZWZlcmVuY2UiLCJnZXRTaW1wbGVCb3hQb3NpdGlvbiIsInJldCIsIm1vdmVCb3hUb0xpbmVQb3NpdGlvbiIsInN0eWxlQm94IiwiY29udGFpbmVyQm94IiwiYm94UG9zaXRpb25zIiwiZmluZEJlc3RQb3NpdGlvbiIsImJlc3RQb3NpdGlvbiIsInNwZWNpZmllZFBvc2l0aW9uIiwicGVyY2VudGFnZSIsInAiLCJib3hQb3NpdGlvbiIsImxpbmVQb3MiLCJzdGVwIiwicm91bmQiLCJtYXhQb3NpdGlvbiIsImluaXRpYWxBeGlzIiwiYWJzIiwiY2VpbCIsInJldmVyc2UiLCJjYWxjdWxhdGVkUGVyY2VudGFnZSIsIlN0cmluZ0RlY29kZXIiLCJkZWNvZGUiLCJkZWNvZGVVUklDb21wb25lbnQiLCJlbmNvZGVVUklDb21wb25lbnQiLCJjb252ZXJ0Q3VlVG9ET01UcmVlIiwiY3VldGV4dCIsIkZPTlRfU0laRV9QRVJDRU5UIiwiRk9OVF9TVFlMRSIsIkNVRV9CQUNLR1JPVU5EX1BBRERJTkciLCJwcm9jZXNzQ3VlcyIsImN1ZXMiLCJvdmVybGF5IiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwicGFkZGVkT3ZlcmxheSIsIm1hcmdpbiIsInNob3VsZENvbXB1dGUiLCJoYXNCZWVuUmVzZXQiLCJkaXNwbGF5U3RhdGUiLCJmb250U2l6ZSIsIlBhcnNlciIsImRlY29kZXIiLCJzdGF0ZSIsImJ1ZmZlciIsIlRleHREZWNvZGVyIiwicmVwb3J0T3JUaHJvd0Vycm9yIiwib25wYXJzaW5nZXJyb3IiLCJwYXJzZSIsImZsdXNoaW5nIiwic2VsZiIsInN0cmVhbSIsImNvbGxlY3ROZXh0TGluZSIsInBvcyIsInBhcnNlUmVnaW9uIiwieHkiLCJhbmNob3IiLCJWVFRSZWdpb24iLCJsaW5lcyIsInJlZ2lvbkFuY2hvclgiLCJyZWdpb25BbmNob3JZIiwidmlld3BvcnRBbmNob3JYIiwidmlld3BvcnRBbmNob3JZIiwic2Nyb2xsIiwib25yZWdpb24iLCJwYXJzZUhlYWRlciIsImFscmVhZHlDb2xsZWN0ZWRMaW5lIiwiVlRUQ3VlIiwiaW5kZXhPZiIsImhhc1N1YnN0cmluZyIsIm9uY3VlIiwiZmx1c2giLCJvbmZsdXNoIiwic2Nyb2xsU2V0dGluZyIsImZpbmRTY3JvbGxTZXR0aW5nIiwidmFsdWUiLCJ0b0xvd2VyQ2FzZSIsImlzVmFsaWRQZXJjZW50VmFsdWUiLCJfd2lkdGgiLCJfbGluZXMiLCJfcmVnaW9uQW5jaG9yWCIsIl9yZWdpb25BbmNob3JZIiwiX3ZpZXdwb3J0QW5jaG9yWCIsIl92aWV3cG9ydEFuY2hvclkiLCJfc2Nyb2xsIiwiZGVmaW5lUHJvcGVydGllcyIsImVudW1lcmFibGUiLCJUeXBlRXJyb3IiLCJzZXR0aW5nIiwiU3ludGF4RXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkE7QUFDQTs7QUFyQkE7QUF1QkEsSUFBSUEsU0FBUyxTQUFUQSxNQUFTLEdBQVUsQ0FBRSxDQUF6QjtBQUNBLFNBQVNDLFlBQVQsQ0FBc0JDLEtBQXRCLEVBQTZCQyxPQUE3QixFQUFzQztBQUNsQyxRQUFHQSxZQUFZQyxTQUFmLEVBQTBCO0FBQ3RCRCxrQkFBVSxDQUFWO0FBQ0g7QUFDRCxXQUFPLFVBQVUsQ0FBQ0UsU0FBU0gsTUFBTUksU0FBTixDQUFnQixDQUFoQixFQUFtQixDQUFuQixDQUFULEVBQWdDLEVBQWhDLENBQUQsRUFDVEQsU0FBU0gsTUFBTUksU0FBTixDQUFnQixDQUFoQixFQUFtQixDQUFuQixDQUFULEVBQWdDLEVBQWhDLENBRFMsRUFFVEQsU0FBU0gsTUFBTUksU0FBTixDQUFnQixDQUFoQixFQUFtQixDQUFuQixDQUFULEVBQWdDLEVBQWhDLENBRlMsRUFHVEgsT0FIUyxFQUdBSSxJQUhBLENBR0ssR0FITCxDQUFWLEdBR3NCLEdBSDdCO0FBSUg7O0FBRUQsSUFBSUMsY0FBYyxDQUFDLG1CQUFELEVBQXNCLHFCQUF0QixFQUE2QyxtQkFBN0MsRUFDZCxpQkFEYyxFQUNLLG1CQURMLEVBRWQsbUJBRmMsRUFFTyxrQkFGUCxDQUFsQjs7QUFJQSxJQUFJQyxZQUFZLENBQWhCOztBQUVBLFNBQVNDLE9BQVQsQ0FBaUJDLE9BQWpCLEVBQTBCQyxLQUExQixFQUFpQ0MsSUFBakMsRUFBdUM7QUFDbkMsWUFBUUEsSUFBUjtBQUNJLGFBQUssbUJBQUw7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Q0g7QUFDRG1SLG1DQUFtQlIsS0FBbkI7QUFDSDtBQVZjLFNBakRPO0FBNkQxQiwyQkFBbUI7QUFDZlcsd0JBQVksSUFERztBQUVmN1AsaUJBQUssZUFBVztBQUNaLHVCQUFPeVAsZ0JBQVA7QUFDSCxhQUpjO0FBS2Y1UCxpQkFBSyxhQUFTcVAsS0FBVCxFQUFnQjtBQUNqQixvQkFBSSxDQUFDRSxvQkFBb0JGLEtBQXBCLENBQUwsRUFBaUM7QUFDN0IsMEJBQU0sSUFBSTNRLEtBQUosQ0FBVSw0Q0FBVixDQUFOO0FBQ0g7QUFDRGtSLG1DQUFtQlAsS0FBbkI7QUFDSDtBQVZjLFNBN0RPO0FBeUUxQixrQkFBVTtBQUNOVyx3QkFBWSxJQUROO0FBRU43UCxpQkFBSyxlQUFXO0FBQ1osdUJBQU8yUCxPQUFQO0FBQ0gsYUFKSztBQUtOOVAsaUJBQUssYUFBU3FQLEtBQVQsRUFBZ0I7QUFDakIsb0JBQUlhLFVBQVVkLGtCQUFrQkMsS0FBbEIsQ0FBZDtBQUNBO0FBQ0Esb0JBQUlhLFlBQVksS0FBaEIsRUFBdUI7QUFDbkIsMEJBQU0sSUFBSUMsV0FBSixDQUFnQiw2Q0FBaEIsQ0FBTjtBQUNIO0FBQ0RMLDBCQUFVSSxPQUFWO0FBQ0g7QUFaSztBQXpFZ0IsS0FBOUI7QUF3RkgsQ0FqR0Q7O3FCQW1HZS9CLFMiLCJmaWxlIjoidnR0cGFyc2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogdnR0LmpzIC0gdjAuMTIuMSAoaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvdnR0LmpzKSBidWlsdCBvbiAwMy0xMi0yMDE1ICovXG5pbXBvcnQgVlRUQ3VlIGZyb20gJ3V0aWxzL2NhcHRpb25zL3Z0dEN1ZSc7XG5pbXBvcnQgVlRUUmVnaW9uIGZyb20gJ3V0aWxzL2NhcHRpb25zL3Z0dFJlZ2lvbic7XG5cbi8qKlxuICogQ29weXJpZ2h0IDIwMTMgdnR0LmpzIENvbnRyaWJ1dG9yc1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyogLSotIE1vZGU6IEphdmE7IHRhYi13aWR0aDogMjsgaW5kZW50LXRhYnMtbW9kZTogbmlsOyBjLWJhc2ljLW9mZnNldDogMiAtKi0gKi9cbi8qIHZpbTogc2V0IHNoaWZ0d2lkdGg9MiB0YWJzdG9wPTIgYXV0b2luZGVudCBjaW5kZW50IGV4cGFuZHRhYjogKi9cblxubGV0IFdlYlZUVCA9IGZ1bmN0aW9uKCl7fTtcbmZ1bmN0aW9uIG1ha2VDb2xvclNldChjb2xvciwgb3BhY2l0eSkge1xuICAgIGlmKG9wYWNpdHkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBvcGFjaXR5ID0gMTtcbiAgICB9XG4gICAgcmV0dXJuIFwicmdiYShcIiArIFtwYXJzZUludChjb2xvci5zdWJzdHJpbmcoMCwgMiksIDE2KSxcbiAgICAgICAgICAgIHBhcnNlSW50KGNvbG9yLnN1YnN0cmluZygyLCA0KSwgMTYpLFxuICAgICAgICAgICAgcGFyc2VJbnQoY29sb3Iuc3Vic3RyaW5nKDQsIDYpLCAxNiksXG4gICAgICAgICAgICBvcGFjaXR5XS5qb2luKFwiLFwiKSArIFwiKVwiO1xufVxuXG52YXIgV2ViVlRUUHJlZnMgPSBbJ3dlYnZ0dC5mb250LmNvbG9yJywgJ3dlYnZ0dC5mb250Lm9wYWNpdHknLCAnd2VidnR0LmZvbnQuc2NhbGUnLFxuICAgICd3ZWJ2dHQuYmcuY29sb3InLCAnd2VidnR0LmJnLm9wYWNpdHknLFxuICAgICd3ZWJ2dHQuZWRnZS5jb2xvcicsICd3ZWJ2dHQuZWRnZS50eXBlJ107XG5cbnZhciBmb250U2NhbGUgPSAxO1xuXG5mdW5jdGlvbiBvYnNlcnZlKHN1YmplY3QsIHRvcGljLCBkYXRhKSB7XG4gICAgc3dpdGNoIChkYXRhKSB7XG4gICAgICAgIGNhc2UgXCJ3ZWJ2dHQuZm9udC5jb2xvclwiOlxuICAgICAgICBjYXNlIFwid2VidnR0LmZvbnQub3BhY2l0eVwiOlxuICAgICAgICAgICAgdmFyIGZvbnRDb2xvciA9IFNlcnZpY2VzLnByZWZzLmdldENoYXJQcmVmKFwid2VidnR0LmZvbnQuY29sb3JcIik7XG4gICAgICAgICAgICB2YXIgZm9udE9wYWNpdHkgPSBTZXJ2aWNlcy5wcmVmcy5nZXRJbnRQcmVmKFwid2VidnR0LmZvbnQub3BhY2l0eVwiKSAvIDEwMDtcbiAgICAgICAgICAgIFdlYlZUVFNldC5mb250U2V0ID0gbWFrZUNvbG9yU2V0KGZvbnRDb2xvciwgZm9udE9wYWNpdHkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJ3ZWJ2dHQuZm9udC5zY2FsZVwiOlxuICAgICAgICAgICAgZm9udFNjYWxlID0gU2VydmljZXMucHJlZnMuZ2V0SW50UHJlZihcIndlYnZ0dC5mb250LnNjYWxlXCIpIC8gMTAwO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJ3ZWJ2dHQuYmcuY29sb3JcIjpcbiAgICAgICAgY2FzZSBcIndlYnZ0dC5iZy5vcGFjaXR5XCI6XG4gICAgICAgICAgICB2YXIgYmFja2dyb3VuZENvbG9yID0gU2VydmljZXMucHJlZnMuZ2V0Q2hhclByZWYoXCJ3ZWJ2dHQuYmcuY29sb3JcIik7XG4gICAgICAgICAgICB2YXIgYmFja2dyb3VuZE9wYWNpdHkgPSBTZXJ2aWNlcy5wcmVmcy5nZXRJbnRQcmVmKFwid2VidnR0LmJnLm9wYWNpdHlcIikgLyAxMDA7XG4gICAgICAgICAgICBXZWJWVFRTZXQuYmFja2dyb3VuZFNldCA9IG1ha2VDb2xvclNldChiYWNrZ3JvdW5kQ29sb3IsIGJhY2tncm91bmRPcGFjaXR5KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwid2VidnR0LmVkZ2UuY29sb3JcIjpcbiAgICAgICAgY2FzZSBcIndlYnZ0dC5lZGdlLnR5cGVcIjpcbiAgICAgICAgICAgIHZhciBlZGdlVHlwZUxpc3QgPSBbXCJcIiwgXCIwcHggMHB4IFwiLCBcIjRweCA0cHggNHB4IFwiLCBcIi0ycHggLTJweCBcIiwgXCIycHggMnB4IFwiXTtcbiAgICAgICAgICAgIHZhciBlZGdlVHlwZSA9IFNlcnZpY2VzLnByZWZzLmdldEludFByZWYoXCJ3ZWJ2dHQuZWRnZS50eXBlXCIpO1xuICAgICAgICAgICAgdmFyIGVkZ2VDb2xvciA9IFNlcnZpY2VzLnByZWZzLmdldENoYXJQcmVmKFwid2VidnR0LmVkZ2UuY29sb3JcIik7XG4gICAgICAgICAgICBXZWJWVFRTZXQuZWRnZVNldCA9IGVkZ2VUeXBlTGlzdFtlZGdlVHlwZV0gKyBtYWtlQ29sb3JTZXQoZWRnZUNvbG9yKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbn1cblxuaWYodHlwZW9mIFNlcnZpY2VzICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIFdlYlZUVFNldCA9IHt9O1xuICAgIFdlYlZUVFByZWZzLmZvckVhY2goZnVuY3Rpb24gKHByZWYpIHtcbiAgICAgICAgb2JzZXJ2ZSh1bmRlZmluZWQsIHVuZGVmaW5lZCwgcHJlZik7XG4gICAgICAgIFNlcnZpY2VzLnByZWZzLmFkZE9ic2VydmVyKHByZWYsIG9ic2VydmUsIGZhbHNlKTtcbiAgICB9KTtcbn1cblxudmFyIF9vYmpDcmVhdGUgPSBPYmplY3QuY3JlYXRlIHx8IChmdW5jdGlvbigpIHtcbiAgICAgICAgZnVuY3Rpb24gRigpIHt9XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihvKSB7XG4gICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignT2JqZWN0LmNyZWF0ZSBzaGltIG9ubHkgYWNjZXB0cyBvbmUgcGFyYW1ldGVyLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgRi5wcm90b3R5cGUgPSBvO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBGKCk7XG4gICAgICAgIH07XG4gICAgfSkoKTtcblxuLy8gQ3JlYXRlcyBhIG5ldyBQYXJzZXJFcnJvciBvYmplY3QgZnJvbSBhbiBlcnJvckRhdGEgb2JqZWN0LiBUaGUgZXJyb3JEYXRhXG4vLyBvYmplY3Qgc2hvdWxkIGhhdmUgZGVmYXVsdCBjb2RlIGFuZCBtZXNzYWdlIHByb3BlcnRpZXMuIFRoZSBkZWZhdWx0IG1lc3NhZ2Vcbi8vIHByb3BlcnR5IGNhbiBiZSBvdmVycmlkZW4gYnkgcGFzc2luZyBpbiBhIG1lc3NhZ2UgcGFyYW1ldGVyLlxuLy8gU2VlIFBhcnNpbmdFcnJvci5FcnJvcnMgYmVsb3cgZm9yIGFjY2VwdGFibGUgZXJyb3JzLlxuZnVuY3Rpb24gUGFyc2luZ0Vycm9yKGVycm9yRGF0YSwgbWVzc2FnZSkge1xuICAgIHRoaXMubmFtZSA9IFwiUGFyc2luZ0Vycm9yXCI7XG4gICAgdGhpcy5jb2RlID0gZXJyb3JEYXRhLmNvZGU7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZSB8fCBlcnJvckRhdGEubWVzc2FnZTtcbn1cblBhcnNpbmdFcnJvci5wcm90b3R5cGUgPSBfb2JqQ3JlYXRlKEVycm9yLnByb3RvdHlwZSk7XG5QYXJzaW5nRXJyb3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUGFyc2luZ0Vycm9yO1xuXG4vLyBQYXJzaW5nRXJyb3IgbWV0YWRhdGEgZm9yIGFjY2VwdGFibGUgUGFyc2luZ0Vycm9ycy5cblBhcnNpbmdFcnJvci5FcnJvcnMgPSB7XG4gICAgQmFkU2lnbmF0dXJlOiB7XG4gICAgICAgIGNvZGU6IDAsXG4gICAgICAgIG1lc3NhZ2U6IFwiTWFsZm9ybWVkIFdlYlZUVCBzaWduYXR1cmUuXCJcbiAgICB9LFxuICAgIEJhZFRpbWVTdGFtcDoge1xuICAgICAgICBjb2RlOiAxLFxuICAgICAgICBtZXNzYWdlOiBcIk1hbGZvcm1lZCB0aW1lIHN0YW1wLlwiXG4gICAgfVxufTtcblxuLy8gVHJ5IHRvIHBhcnNlIGlucHV0IGFzIGEgdGltZSBzdGFtcC5cbmZ1bmN0aW9uIHBhcnNlVGltZVN0YW1wKGlucHV0KSB7XG5cbiAgICBmdW5jdGlvbiBjb21wdXRlU2Vjb25kcyhoLCBtLCBzLCBmKSB7XG4gICAgICAgIHJldHVybiAoaCB8IDApICogMzYwMCArIChtIHwgMCkgKiA2MCArIChzIHwgMCkgKyAoZiB8IDApIC8gMTAwMDtcbiAgICB9XG5cbiAgICB2YXIgbSA9IGlucHV0Lm1hdGNoKC9eKFxcZCspOihcXGR7Mn0pKDpcXGR7Mn0pP1xcLihcXGR7M30pLyk7XG4gICAgaWYgKCFtKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmIChtWzNdKSB7XG4gICAgICAgIC8vIFRpbWVzdGFtcCB0YWtlcyB0aGUgZm9ybSBvZiBbaG91cnNdOlttaW51dGVzXTpbc2Vjb25kc10uW21pbGxpc2Vjb25kc11cbiAgICAgICAgcmV0dXJuIGNvbXB1dGVTZWNvbmRzKG1bMV0sIG1bMl0sIG1bM10ucmVwbGFjZShcIjpcIiwgXCJcIiksIG1bNF0pO1xuICAgIH0gZWxzZSBpZiAobVsxXSA+IDU5KSB7XG4gICAgICAgIC8vIFRpbWVzdGFtcCB0YWtlcyB0aGUgZm9ybSBvZiBbaG91cnNdOlttaW51dGVzXS5bbWlsbGlzZWNvbmRzXVxuICAgICAgICAvLyBGaXJzdCBwb3NpdGlvbiBpcyBob3VycyBhcyBpdCdzIG92ZXIgNTkuXG4gICAgICAgIHJldHVybiBjb21wdXRlU2Vjb25kcyhtWzFdLCBtWzJdLCAwLCAgbVs0XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVGltZXN0YW1wIHRha2VzIHRoZSBmb3JtIG9mIFttaW51dGVzXTpbc2Vjb25kc10uW21pbGxpc2Vjb25kc11cbiAgICAgICAgcmV0dXJuIGNvbXB1dGVTZWNvbmRzKDAsIG1bMV0sIG1bMl0sIG1bNF0pO1xuICAgIH1cbn1cblxuLy8gQSBzZXR0aW5ncyBvYmplY3QgaG9sZHMga2V5L3ZhbHVlIHBhaXJzIGFuZCB3aWxsIGlnbm9yZSBhbnl0aGluZyBidXQgdGhlIGZpcnN0XG4vLyBhc3NpZ25tZW50IHRvIGEgc3BlY2lmaWMga2V5LlxuZnVuY3Rpb24gU2V0dGluZ3MoKSB7XG4gICAgdGhpcy52YWx1ZXMgPSBfb2JqQ3JlYXRlKG51bGwpO1xufVxuXG5TZXR0aW5ncy5wcm90b3R5cGUgPSB7XG4gICAgLy8gT25seSBhY2NlcHQgdGhlIGZpcnN0IGFzc2lnbm1lbnQgdG8gYW55IGtleS5cbiAgICBzZXQ6IGZ1bmN0aW9uKGssIHYpIHtcbiAgICAgICAgaWYgKCF0aGlzLmdldChrKSAmJiB2ICE9PSBcIlwiKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlc1trXSA9IHY7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8vIFJldHVybiB0aGUgdmFsdWUgZm9yIGEga2V5LCBvciBhIGRlZmF1bHQgdmFsdWUuXG4gICAgLy8gSWYgJ2RlZmF1bHRLZXknIGlzIHBhc3NlZCB0aGVuICdkZmx0JyBpcyBhc3N1bWVkIHRvIGJlIGFuIG9iamVjdCB3aXRoXG4gICAgLy8gYSBudW1iZXIgb2YgcG9zc2libGUgZGVmYXVsdCB2YWx1ZXMgYXMgcHJvcGVydGllcyB3aGVyZSAnZGVmYXVsdEtleScgaXNcbiAgICAvLyB0aGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0aGF0IHdpbGwgYmUgY2hvc2VuOyBvdGhlcndpc2UgaXQncyBhc3N1bWVkIHRvIGJlXG4gICAgLy8gYSBzaW5nbGUgdmFsdWUuXG4gICAgZ2V0OiBmdW5jdGlvbihrLCBkZmx0LCBkZWZhdWx0S2V5KSB7XG4gICAgICAgIGlmIChkZWZhdWx0S2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oYXMoaykgPyB0aGlzLnZhbHVlc1trXSA6IGRmbHRbZGVmYXVsdEtleV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzKGspID8gdGhpcy52YWx1ZXNba10gOiBkZmx0O1xuICAgIH0sXG4gICAgLy8gQ2hlY2sgd2hldGhlciB3ZSBoYXZlIGEgdmFsdWUgZm9yIGEga2V5LlxuICAgIGhhczogZnVuY3Rpb24oaykge1xuICAgICAgICByZXR1cm4gayBpbiB0aGlzLnZhbHVlcztcbiAgICB9LFxuICAgIC8vIEFjY2VwdCBhIHNldHRpbmcgaWYgaXRzIG9uZSBvZiB0aGUgZ2l2ZW4gYWx0ZXJuYXRpdmVzLlxuICAgIGFsdDogZnVuY3Rpb24oaywgdiwgYSkge1xuICAgICAgICBmb3IgKHZhciBuID0gMDsgbiA8IGEubGVuZ3RoOyArK24pIHtcbiAgICAgICAgICAgIGlmICh2ID09PSBhW25dKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXQoaywgdik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8vIEFjY2VwdCBhIHNldHRpbmcgaWYgaXRzIGEgdmFsaWQgKHNpZ25lZCkgaW50ZWdlci5cbiAgICBpbnRlZ2VyOiBmdW5jdGlvbihrLCB2KSB7XG4gICAgICAgIGlmICgvXi0/XFxkKyQvLnRlc3QodikpIHsgLy8gaW50ZWdlclxuICAgICAgICAgICAgdGhpcy5zZXQoaywgcGFyc2VJbnQodiwgMTApKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLy8gQWNjZXB0IGEgc2V0dGluZyBpZiBpdHMgYSB2YWxpZCBwZXJjZW50YWdlLlxuICAgIHBlcmNlbnQ6IGZ1bmN0aW9uKGssIHYpIHtcbiAgICAgICAgdmFyIG07XG4gICAgICAgIGlmICgobSA9IHYubWF0Y2goL14oW1xcZF17MSwzfSkoXFwuW1xcZF0qKT8lJC8pKSkge1xuICAgICAgICAgICAgdiA9IHBhcnNlRmxvYXQodik7XG4gICAgICAgICAgICBpZiAodiA+PSAwICYmIHYgPD0gMTAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXQoaywgdik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn07XG5cbi8vIEhlbHBlciBmdW5jdGlvbiB0byBwYXJzZSBpbnB1dCBpbnRvIGdyb3VwcyBzZXBhcmF0ZWQgYnkgJ2dyb3VwRGVsaW0nLCBhbmRcbi8vIGludGVycHJldGUgZWFjaCBncm91cCBhcyBhIGtleS92YWx1ZSBwYWlyIHNlcGFyYXRlZCBieSAna2V5VmFsdWVEZWxpbScuXG5mdW5jdGlvbiBwYXJzZU9wdGlvbnMoaW5wdXQsIGNhbGxiYWNrLCBrZXlWYWx1ZURlbGltLCBncm91cERlbGltKSB7XG4gICAgdmFyIGdyb3VwcyA9IGdyb3VwRGVsaW0gPyBpbnB1dC5zcGxpdChncm91cERlbGltKSA6IFtpbnB1dF07XG4gICAgZm9yICh2YXIgaSBpbiBncm91cHMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBncm91cHNbaV0gIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBrdiA9IGdyb3Vwc1tpXS5zcGxpdChrZXlWYWx1ZURlbGltKTtcbiAgICAgICAgaWYgKGt2Lmxlbmd0aCAhPT0gMikge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGsgPSBrdlswXTtcbiAgICAgICAgdmFyIHYgPSBrdlsxXTtcbiAgICAgICAgY2FsbGJhY2soaywgdik7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZUN1ZShpbnB1dCwgY3VlLCByZWdpb25MaXN0KSB7XG4gICAgLy8gUmVtZW1iZXIgdGhlIG9yaWdpbmFsIGlucHV0IGlmIHdlIG5lZWQgdG8gdGhyb3cgYW4gZXJyb3IuXG4gICAgdmFyIG9JbnB1dCA9IGlucHV0O1xuICAgIC8vIDQuMSBXZWJWVFQgdGltZXN0YW1wXG4gICAgZnVuY3Rpb24gY29uc3VtZVRpbWVTdGFtcCgpIHtcbiAgICAgICAgdmFyIHRzID0gcGFyc2VUaW1lU3RhbXAoaW5wdXQpO1xuICAgICAgICBpZiAodHMgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBQYXJzaW5nRXJyb3IoUGFyc2luZ0Vycm9yLkVycm9ycy5CYWRUaW1lU3RhbXAsXG4gICAgICAgICAgICAgICAgXCJNYWxmb3JtZWQgdGltZXN0YW1wOiBcIiArIG9JbnB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUmVtb3ZlIHRpbWUgc3RhbXAgZnJvbSBpbnB1dC5cbiAgICAgICAgaW5wdXQgPSBpbnB1dC5yZXBsYWNlKC9eW15cXHNhLXpBLVotXSsvLCBcIlwiKTtcbiAgICAgICAgcmV0dXJuIHRzO1xuICAgIH1cblxuICAgIC8vIDQuNC4yIFdlYlZUVCBjdWUgc2V0dGluZ3NcbiAgICBmdW5jdGlvbiBjb25zdW1lQ3VlU2V0dGluZ3MoaW5wdXQsIGN1ZSkge1xuICAgICAgICB2YXIgc2V0dGluZ3MgPSBuZXcgU2V0dGluZ3MoKTtcblxuICAgICAgICBwYXJzZU9wdGlvbnMoaW5wdXQsIGZ1bmN0aW9uIChrLCB2KSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGspIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwicmVnaW9uXCI6XG4gICAgICAgICAgICAgICAgICAgIC8vIEZpbmQgdGhlIGxhc3QgcmVnaW9uIHdlIHBhcnNlZCB3aXRoIHRoZSBzYW1lIHJlZ2lvbiBpZC5cbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IHJlZ2lvbkxpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWdpb25MaXN0W2ldLmlkID09PSB2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3Muc2V0KGssIHJlZ2lvbkxpc3RbaV0ucmVnaW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwidmVydGljYWxcIjpcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuYWx0KGssIHYsIFtcInJsXCIsIFwibHJcIl0pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwibGluZVwiOlxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFscyA9IHYuc3BsaXQoXCIsXCIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsczAgPSB2YWxzWzBdO1xuICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5pbnRlZ2VyKGssIHZhbHMwKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MucGVyY2VudChrLCB2YWxzMCkgPyBzZXR0aW5ncy5zZXQoXCJzbmFwVG9MaW5lc1wiLCBmYWxzZSkgOiBudWxsO1xuICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5hbHQoaywgdmFsczAsIFtcImF1dG9cIl0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFscy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLmFsdChcImxpbmVBbGlnblwiLCB2YWxzWzFdLCBbXCJzdGFydFwiLCBcIm1pZGRsZVwiLCBcImVuZFwiXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInBvc2l0aW9uXCI6XG4gICAgICAgICAgICAgICAgICAgIHZhbHMgPSB2LnNwbGl0KFwiLFwiKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MucGVyY2VudChrLCB2YWxzWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5hbHQoXCJwb3NpdGlvbkFsaWduXCIsIHZhbHNbMV0sIFtcInN0YXJ0XCIsIFwibWlkZGxlXCIsIFwiZW5kXCJdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwic2l6ZVwiOlxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5wZXJjZW50KGssIHYpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiYWxpZ25cIjpcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuYWx0KGssIHYsIFtcInN0YXJ0XCIsIFwibWlkZGxlXCIsIFwiZW5kXCIsIFwibGVmdFwiLCBcInJpZ2h0XCJdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIC86LywgL1xccy8pO1xuXG4gICAgICAgIC8vIEFwcGx5IGRlZmF1bHQgdmFsdWVzIGZvciBhbnkgbWlzc2luZyBmaWVsZHMuXG4gICAgICAgIGN1ZS5yZWdpb24gPSBzZXR0aW5ncy5nZXQoXCJyZWdpb25cIiwgbnVsbCk7XG4gICAgICAgIGN1ZS52ZXJ0aWNhbCA9IHNldHRpbmdzLmdldChcInZlcnRpY2FsXCIsIFwiXCIpO1xuICAgICAgICBjdWUubGluZSA9IHNldHRpbmdzLmdldChcImxpbmVcIiwgXCJhdXRvXCIpO1xuICAgICAgICBjdWUubGluZUFsaWduID0gc2V0dGluZ3MuZ2V0KFwibGluZUFsaWduXCIsIFwic3RhcnRcIik7XG4gICAgICAgIGN1ZS5zbmFwVG9MaW5lcyA9IHNldHRpbmdzLmdldChcInNuYXBUb0xpbmVzXCIsIHRydWUpO1xuICAgICAgICBjdWUuc2l6ZSA9IHNldHRpbmdzLmdldChcInNpemVcIiwgMTAwKTtcbiAgICAgICAgLy9jdWUuYWxpZ24gPSBzZXR0aW5ncy5nZXQoXCJhbGlnblwiLCBcIm1pZGRsZVwiKTtcbiAgICAgICAgY3VlLnBvc2l0aW9uID0gc2V0dGluZ3MuZ2V0KFwicG9zaXRpb25cIiwgXCJhdXRvXCIpO1xuICAgICAgICBjdWUucG9zaXRpb25BbGlnbiA9IHNldHRpbmdzLmdldChcInBvc2l0aW9uQWxpZ25cIiwge1xuICAgICAgICAgICAgc3RhcnQ6IFwic3RhcnRcIixcbiAgICAgICAgICAgIGxlZnQ6IFwic3RhcnRcIixcbiAgICAgICAgICAgIG1pZGRsZTogXCJtaWRkbGVcIixcbiAgICAgICAgICAgIGVuZDogXCJlbmRcIixcbiAgICAgICAgICAgIHJpZ2h0OiBcImVuZFwiXG4gICAgICAgIH0sIGN1ZS5hbGlnbik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2tpcFdoaXRlc3BhY2UoKSB7XG4gICAgICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZSgvXlxccysvLCBcIlwiKTtcbiAgICB9XG5cbiAgICAvLyA0LjEgV2ViVlRUIGN1ZSB0aW1pbmdzLlxuICAgIHNraXBXaGl0ZXNwYWNlKCk7XG4gICAgY3VlLnN0YXJ0VGltZSA9IGNvbnN1bWVUaW1lU3RhbXAoKTsgICAvLyAoMSkgY29sbGVjdCBjdWUgc3RhcnQgdGltZVxuICAgIHNraXBXaGl0ZXNwYWNlKCk7XG4gICAgaWYgKGlucHV0LnN1YnN0cigwLCAzKSAhPT0gXCItLT5cIikgeyAgICAgLy8gKDMpIG5leHQgY2hhcmFjdGVycyBtdXN0IG1hdGNoIFwiLS0+XCJcbiAgICAgICAgdGhyb3cgbmV3IFBhcnNpbmdFcnJvcihQYXJzaW5nRXJyb3IuRXJyb3JzLkJhZFRpbWVTdGFtcCxcbiAgICAgICAgICAgIFwiTWFsZm9ybWVkIHRpbWUgc3RhbXAgKHRpbWUgc3RhbXBzIG11c3QgYmUgc2VwYXJhdGVkIGJ5ICctLT4nKTogXCIgK1xuICAgICAgICAgICAgb0lucHV0KTtcbiAgICB9XG4gICAgaW5wdXQgPSBpbnB1dC5zdWJzdHIoMyk7XG4gICAgc2tpcFdoaXRlc3BhY2UoKTtcbiAgICBjdWUuZW5kVGltZSA9IGNvbnN1bWVUaW1lU3RhbXAoKTsgICAgIC8vICg1KSBjb2xsZWN0IGN1ZSBlbmQgdGltZVxuXG4gICAgLy8gNC4xIFdlYlZUVCBjdWUgc2V0dGluZ3MgbGlzdC5cbiAgICBza2lwV2hpdGVzcGFjZSgpO1xuICAgIGNvbnN1bWVDdWVTZXR0aW5ncyhpbnB1dCwgY3VlKTtcbn1cblxudmFyIEVTQ0FQRSA9IHtcbiAgICBcIiZhbXA7XCI6IFwiJlwiLFxuICAgIFwiJmx0O1wiOiBcIjxcIixcbiAgICBcIiZndDtcIjogXCI+XCIsXG4gICAgXCImbHJtO1wiOiBcIlxcdTIwMGVcIixcbiAgICBcIiZybG07XCI6IFwiXFx1MjAwZlwiLFxuICAgIFwiJm5ic3A7XCI6IFwiXFx1MDBhMFwiXG59O1xuXG52YXIgVEFHX05BTUUgPSB7XG4gICAgYzogXCJzcGFuXCIsXG4gICAgaTogXCJpXCIsXG4gICAgYjogXCJiXCIsXG4gICAgdTogXCJ1XCIsXG4gICAgcnVieTogXCJydWJ5XCIsXG4gICAgcnQ6IFwicnRcIixcbiAgICB2OiBcInNwYW5cIixcbiAgICBsYW5nOiBcInNwYW5cIlxufTtcblxudmFyIFRBR19BTk5PVEFUSU9OID0ge1xuICAgIHY6IFwidGl0bGVcIixcbiAgICBsYW5nOiBcImxhbmdcIlxufTtcblxudmFyIE5FRURTX1BBUkVOVCA9IHtcbiAgICBydDogXCJydWJ5XCJcbn07XG5cbi8vIFBhcnNlIGNvbnRlbnQgaW50byBhIGRvY3VtZW50IGZyYWdtZW50LlxuZnVuY3Rpb24gcGFyc2VDb250ZW50KHdpbmRvdywgaW5wdXQpIHtcbiAgICBmdW5jdGlvbiBuZXh0VG9rZW4oKSB7XG4gICAgICAgIC8vIENoZWNrIGZvciBlbmQtb2Ytc3RyaW5nLlxuICAgICAgICBpZiAoIWlucHV0KSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENvbnN1bWUgJ24nIGNoYXJhY3RlcnMgZnJvbSB0aGUgaW5wdXQuXG4gICAgICAgIGZ1bmN0aW9uIGNvbnN1bWUocmVzdWx0KSB7XG4gICAgICAgICAgICBpbnB1dCA9IGlucHV0LnN1YnN0cihyZXN1bHQubGVuZ3RoKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbSA9IGlucHV0Lm1hdGNoKC9eKFtePF0qKSg8W14+XSs+Pyk/Lyk7XG4gICAgICAgIC8vIElmIHRoZXJlIGlzIHNvbWUgdGV4dCBiZWZvcmUgdGhlIG5leHQgdGFnLCByZXR1cm4gaXQsIG90aGVyd2lzZSByZXR1cm5cbiAgICAgICAgLy8gdGhlIHRhZy5cbiAgICAgICAgcmV0dXJuIGNvbnN1bWUobVsxXSA/IG1bMV0gOiBtWzJdKTtcbiAgICB9XG5cbiAgICAvLyBVbmVzY2FwZSBhIHN0cmluZyAncycuXG4gICAgZnVuY3Rpb24gdW5lc2NhcGUxKGUpIHtcbiAgICAgICAgcmV0dXJuIEVTQ0FQRVtlXTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdW5lc2NhcGUocykge1xuICAgICAgICB3aGlsZSAoKG0gPSBzLm1hdGNoKC8mKGFtcHxsdHxndHxscm18cmxtfG5ic3ApOy8pKSkge1xuICAgICAgICAgICAgcyA9IHMucmVwbGFjZShtWzBdLCB1bmVzY2FwZTEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNob3VsZEFkZChjdXJyZW50LCBlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiAhTkVFRFNfUEFSRU5UW2VsZW1lbnQubG9jYWxOYW1lXSB8fFxuICAgICAgICAgICAgTkVFRFNfUEFSRU5UW2VsZW1lbnQubG9jYWxOYW1lXSA9PT0gY3VycmVudC5sb2NhbE5hbWU7XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIGFuIGVsZW1lbnQgZm9yIHRoaXMgdGFnLlxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodHlwZSwgYW5ub3RhdGlvbikge1xuICAgICAgICB2YXIgdGFnTmFtZSA9IFRBR19OQU1FW3R5cGVdO1xuICAgICAgICBpZiAoIXRhZ05hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlbGVtZW50ID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG4gICAgICAgIGVsZW1lbnQubG9jYWxOYW1lID0gdGFnTmFtZTtcbiAgICAgICAgdmFyIG5hbWUgPSBUQUdfQU5OT1RBVElPTlt0eXBlXTtcbiAgICAgICAgaWYgKG5hbWUgJiYgYW5ub3RhdGlvbikge1xuICAgICAgICAgICAgZWxlbWVudFtuYW1lXSA9IGFubm90YXRpb24udHJpbSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIHZhciByb290RGl2ID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksXG4gICAgICAgIGN1cnJlbnQgPSByb290RGl2LFxuICAgICAgICB0LFxuICAgICAgICB0YWdTdGFjayA9IFtdO1xuXG4gICAgd2hpbGUgKCh0ID0gbmV4dFRva2VuKCkpICE9PSBudWxsKSB7XG4gICAgICAgIGlmICh0WzBdID09PSAnPCcpIHtcbiAgICAgICAgICAgIGlmICh0WzFdID09PSBcIi9cIikge1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBjbG9zaW5nIHRhZyBtYXRjaGVzLCBtb3ZlIGJhY2sgdXAgdG8gdGhlIHBhcmVudCBub2RlLlxuICAgICAgICAgICAgICAgIGlmICh0YWdTdGFjay5sZW5ndGggJiZcbiAgICAgICAgICAgICAgICAgICAgdGFnU3RhY2tbdGFnU3RhY2subGVuZ3RoIC0gMV0gPT09IHQuc3Vic3RyKDIpLnJlcGxhY2UoXCI+XCIsIFwiXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhZ1N0YWNrLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudC5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UganVzdCBpZ25vcmUgdGhlIGVuZCB0YWcuXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdHMgPSBwYXJzZVRpbWVTdGFtcCh0LnN1YnN0cigxLCB0Lmxlbmd0aCAtIDIpKTtcbiAgICAgICAgICAgIHZhciBub2RlO1xuICAgICAgICAgICAgaWYgKHRzKSB7XG4gICAgICAgICAgICAgICAgLy8gVGltZXN0YW1wcyBhcmUgbGVhZCBub2RlcyBhcyB3ZWxsLlxuICAgICAgICAgICAgICAgIG5vZGUgPSB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlUHJvY2Vzc2luZ0luc3RydWN0aW9uKFwidGltZXN0YW1wXCIsIHRzKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50LmFwcGVuZENoaWxkKG5vZGUpO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG0gPSB0Lm1hdGNoKC9ePChbXi5cXHMvMC05Pl0rKShcXC5bXlxcc1xcXFw+XSspPyhbXj5cXFxcXSspPyhcXFxcPyk+PyQvKTtcbiAgICAgICAgICAgIC8vIElmIHdlIGNhbid0IHBhcnNlIHRoZSB0YWcsIHNraXAgdG8gdGhlIG5leHQgdGFnLlxuICAgICAgICAgICAgaWYgKCFtKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBUcnkgdG8gY29uc3RydWN0IGFuIGVsZW1lbnQsIGFuZCBpZ25vcmUgdGhlIHRhZyBpZiB3ZSBjb3VsZG4ndC5cbiAgICAgICAgICAgIG5vZGUgPSBjcmVhdGVFbGVtZW50KG1bMV0sIG1bM10pO1xuICAgICAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBEZXRlcm1pbmUgaWYgdGhlIHRhZyBzaG91bGQgYmUgYWRkZWQgYmFzZWQgb24gdGhlIGNvbnRleHQgb2Ygd2hlcmUgaXRcbiAgICAgICAgICAgIC8vIGlzIHBsYWNlZCBpbiB0aGUgY3VldGV4dC5cbiAgICAgICAgICAgIGlmICghc2hvdWxkQWRkKGN1cnJlbnQsIG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBTZXQgdGhlIGNsYXNzIGxpc3QgKGFzIGEgbGlzdCBvZiBjbGFzc2VzLCBzZXBhcmF0ZWQgYnkgc3BhY2UpLlxuICAgICAgICAgICAgaWYgKG1bMl0pIHtcbiAgICAgICAgICAgICAgICBub2RlLmNsYXNzTmFtZSA9IG1bMl0uc3Vic3RyKDEpLnJlcGxhY2UoJy4nLCAnICcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQXBwZW5kIHRoZSBub2RlIHRvIHRoZSBjdXJyZW50IG5vZGUsIGFuZCBlbnRlciB0aGUgc2NvcGUgb2YgdGhlIG5ld1xuICAgICAgICAgICAgLy8gbm9kZS5cbiAgICAgICAgICAgIHRhZ1N0YWNrLnB1c2gobVsxXSk7XG4gICAgICAgICAgICBjdXJyZW50LmFwcGVuZENoaWxkKG5vZGUpO1xuICAgICAgICAgICAgY3VycmVudCA9IG5vZGU7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRleHQgbm9kZXMgYXJlIGxlYWYgbm9kZXMuXG4gICAgICAgIGN1cnJlbnQuYXBwZW5kQ2hpbGQod2luZG93LmRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHVuZXNjYXBlKHQpKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJvb3REaXY7XG59XG5cbi8vIFRoaXMgaXMgYSBsaXN0IG9mIGFsbCB0aGUgVW5pY29kZSBjaGFyYWN0ZXJzIHRoYXQgaGF2ZSBhIHN0cm9uZ1xuLy8gcmlnaHQtdG8tbGVmdCBjYXRlZ29yeS4gV2hhdCB0aGlzIG1lYW5zIGlzIHRoYXQgdGhlc2UgY2hhcmFjdGVycyBhcmVcbi8vIHdyaXR0ZW4gcmlnaHQtdG8tbGVmdCBmb3Igc3VyZS4gSXQgd2FzIGdlbmVyYXRlZCBieSBwdWxsaW5nIGFsbCB0aGUgc3Ryb25nXG4vLyByaWdodC10by1sZWZ0IGNoYXJhY3RlcnMgb3V0IG9mIHRoZSBVbmljb2RlIGRhdGEgdGFibGUuIFRoYXQgdGFibGUgY2FuXG4vLyBmb3VuZCBhdDogaHR0cDovL3d3dy51bmljb2RlLm9yZy9QdWJsaWMvVU5JREFUQS9Vbmljb2RlRGF0YS50eHRcbnZhciBzdHJvbmdSVExDaGFycyA9IFsweDA1QkUsIDB4MDVDMCwgMHgwNUMzLCAweDA1QzYsIDB4MDVEMCwgMHgwNUQxLFxuICAgIDB4MDVEMiwgMHgwNUQzLCAweDA1RDQsIDB4MDVENSwgMHgwNUQ2LCAweDA1RDcsIDB4MDVEOCwgMHgwNUQ5LCAweDA1REEsXG4gICAgMHgwNURCLCAweDA1REMsIDB4MDVERCwgMHgwNURFLCAweDA1REYsIDB4MDVFMCwgMHgwNUUxLCAweDA1RTIsIDB4MDVFMyxcbiAgICAweDA1RTQsIDB4MDVFNSwgMHgwNUU2LCAweDA1RTcsIDB4MDVFOCwgMHgwNUU5LCAweDA1RUEsIDB4MDVGMCwgMHgwNUYxLFxuICAgIDB4MDVGMiwgMHgwNUYzLCAweDA1RjQsIDB4MDYwOCwgMHgwNjBCLCAweDA2MEQsIDB4MDYxQiwgMHgwNjFFLCAweDA2MUYsXG4gICAgMHgwNjIwLCAweDA2MjEsIDB4MDYyMiwgMHgwNjIzLCAweDA2MjQsIDB4MDYyNSwgMHgwNjI2LCAweDA2MjcsIDB4MDYyOCxcbiAgICAweDA2MjksIDB4MDYyQSwgMHgwNjJCLCAweDA2MkMsIDB4MDYyRCwgMHgwNjJFLCAweDA2MkYsIDB4MDYzMCwgMHgwNjMxLFxuICAgIDB4MDYzMiwgMHgwNjMzLCAweDA2MzQsIDB4MDYzNSwgMHgwNjM2LCAweDA2MzcsIDB4MDYzOCwgMHgwNjM5LCAweDA2M0EsXG4gICAgMHgwNjNCLCAweDA2M0MsIDB4MDYzRCwgMHgwNjNFLCAweDA2M0YsIDB4MDY0MCwgMHgwNjQxLCAweDA2NDIsIDB4MDY0MyxcbiAgICAweDA2NDQsIDB4MDY0NSwgMHgwNjQ2LCAweDA2NDcsIDB4MDY0OCwgMHgwNjQ5LCAweDA2NEEsIDB4MDY2RCwgMHgwNjZFLFxuICAgIDB4MDY2RiwgMHgwNjcxLCAweDA2NzIsIDB4MDY3MywgMHgwNjc0LCAweDA2NzUsIDB4MDY3NiwgMHgwNjc3LCAweDA2NzgsXG4gICAgMHgwNjc5LCAweDA2N0EsIDB4MDY3QiwgMHgwNjdDLCAweDA2N0QsIDB4MDY3RSwgMHgwNjdGLCAweDA2ODAsIDB4MDY4MSxcbiAgICAweDA2ODIsIDB4MDY4MywgMHgwNjg0LCAweDA2ODUsIDB4MDY4NiwgMHgwNjg3LCAweDA2ODgsIDB4MDY4OSwgMHgwNjhBLFxuICAgIDB4MDY4QiwgMHgwNjhDLCAweDA2OEQsIDB4MDY4RSwgMHgwNjhGLCAweDA2OTAsIDB4MDY5MSwgMHgwNjkyLCAweDA2OTMsXG4gICAgMHgwNjk0LCAweDA2OTUsIDB4MDY5NiwgMHgwNjk3LCAweDA2OTgsIDB4MDY5OSwgMHgwNjlBLCAweDA2OUIsIDB4MDY5QyxcbiAgICAweDA2OUQsIDB4MDY5RSwgMHgwNjlGLCAweDA2QTAsIDB4MDZBMSwgMHgwNkEyLCAweDA2QTMsIDB4MDZBNCwgMHgwNkE1LFxuICAgIDB4MDZBNiwgMHgwNkE3LCAweDA2QTgsIDB4MDZBOSwgMHgwNkFBLCAweDA2QUIsIDB4MDZBQywgMHgwNkFELCAweDA2QUUsXG4gICAgMHgwNkFGLCAweDA2QjAsIDB4MDZCMSwgMHgwNkIyLCAweDA2QjMsIDB4MDZCNCwgMHgwNkI1LCAweDA2QjYsIDB4MDZCNyxcbiAgICAweDA2QjgsIDB4MDZCOSwgMHgwNkJBLCAweDA2QkIsIDB4MDZCQywgMHgwNkJELCAweDA2QkUsIDB4MDZCRiwgMHgwNkMwLFxuICAgIDB4MDZDMSwgMHgwNkMyLCAweDA2QzMsIDB4MDZDNCwgMHgwNkM1LCAweDA2QzYsIDB4MDZDNywgMHgwNkM4LCAweDA2QzksXG4gICAgMHgwNkNBLCAweDA2Q0IsIDB4MDZDQywgMHgwNkNELCAweDA2Q0UsIDB4MDZDRiwgMHgwNkQwLCAweDA2RDEsIDB4MDZEMixcbiAgICAweDA2RDMsIDB4MDZENCwgMHgwNkQ1LCAweDA2RTUsIDB4MDZFNiwgMHgwNkVFLCAweDA2RUYsIDB4MDZGQSwgMHgwNkZCLFxuICAgIDB4MDZGQywgMHgwNkZELCAweDA2RkUsIDB4MDZGRiwgMHgwNzAwLCAweDA3MDEsIDB4MDcwMiwgMHgwNzAzLCAweDA3MDQsXG4gICAgMHgwNzA1LCAweDA3MDYsIDB4MDcwNywgMHgwNzA4LCAweDA3MDksIDB4MDcwQSwgMHgwNzBCLCAweDA3MEMsIDB4MDcwRCxcbiAgICAweDA3MEYsIDB4MDcxMCwgMHgwNzEyLCAweDA3MTMsIDB4MDcxNCwgMHgwNzE1LCAweDA3MTYsIDB4MDcxNywgMHgwNzE4LFxuICAgIDB4MDcxOSwgMHgwNzFBLCAweDA3MUIsIDB4MDcxQywgMHgwNzFELCAweDA3MUUsIDB4MDcxRiwgMHgwNzIwLCAweDA3MjEsXG4gICAgMHgwNzIyLCAweDA3MjMsIDB4MDcyNCwgMHgwNzI1LCAweDA3MjYsIDB4MDcyNywgMHgwNzI4LCAweDA3MjksIDB4MDcyQSxcbiAgICAweDA3MkIsIDB4MDcyQywgMHgwNzJELCAweDA3MkUsIDB4MDcyRiwgMHgwNzRELCAweDA3NEUsIDB4MDc0RiwgMHgwNzUwLFxuICAgIDB4MDc1MSwgMHgwNzUyLCAweDA3NTMsIDB4MDc1NCwgMHgwNzU1LCAweDA3NTYsIDB4MDc1NywgMHgwNzU4LCAweDA3NTksXG4gICAgMHgwNzVBLCAweDA3NUIsIDB4MDc1QywgMHgwNzVELCAweDA3NUUsIDB4MDc1RiwgMHgwNzYwLCAweDA3NjEsIDB4MDc2MixcbiAgICAweDA3NjMsIDB4MDc2NCwgMHgwNzY1LCAweDA3NjYsIDB4MDc2NywgMHgwNzY4LCAweDA3NjksIDB4MDc2QSwgMHgwNzZCLFxuICAgIDB4MDc2QywgMHgwNzZELCAweDA3NkUsIDB4MDc2RiwgMHgwNzcwLCAweDA3NzEsIDB4MDc3MiwgMHgwNzczLCAweDA3NzQsXG4gICAgMHgwNzc1LCAweDA3NzYsIDB4MDc3NywgMHgwNzc4LCAweDA3NzksIDB4MDc3QSwgMHgwNzdCLCAweDA3N0MsIDB4MDc3RCxcbiAgICAweDA3N0UsIDB4MDc3RiwgMHgwNzgwLCAweDA3ODEsIDB4MDc4MiwgMHgwNzgzLCAweDA3ODQsIDB4MDc4NSwgMHgwNzg2LFxuICAgIDB4MDc4NywgMHgwNzg4LCAweDA3ODksIDB4MDc4QSwgMHgwNzhCLCAweDA3OEMsIDB4MDc4RCwgMHgwNzhFLCAweDA3OEYsXG4gICAgMHgwNzkwLCAweDA3OTEsIDB4MDc5MiwgMHgwNzkzLCAweDA3OTQsIDB4MDc5NSwgMHgwNzk2LCAweDA3OTcsIDB4MDc5OCxcbiAgICAweDA3OTksIDB4MDc5QSwgMHgwNzlCLCAweDA3OUMsIDB4MDc5RCwgMHgwNzlFLCAweDA3OUYsIDB4MDdBMCwgMHgwN0ExLFxuICAgIDB4MDdBMiwgMHgwN0EzLCAweDA3QTQsIDB4MDdBNSwgMHgwN0IxLCAweDA3QzAsIDB4MDdDMSwgMHgwN0MyLCAweDA3QzMsXG4gICAgMHgwN0M0LCAweDA3QzUsIDB4MDdDNiwgMHgwN0M3LCAweDA3QzgsIDB4MDdDOSwgMHgwN0NBLCAweDA3Q0IsIDB4MDdDQyxcbiAgICAweDA3Q0QsIDB4MDdDRSwgMHgwN0NGLCAweDA3RDAsIDB4MDdEMSwgMHgwN0QyLCAweDA3RDMsIDB4MDdENCwgMHgwN0Q1LFxuICAgIDB4MDdENiwgMHgwN0Q3LCAweDA3RDgsIDB4MDdEOSwgMHgwN0RBLCAweDA3REIsIDB4MDdEQywgMHgwN0RELCAweDA3REUsXG4gICAgMHgwN0RGLCAweDA3RTAsIDB4MDdFMSwgMHgwN0UyLCAweDA3RTMsIDB4MDdFNCwgMHgwN0U1LCAweDA3RTYsIDB4MDdFNyxcbiAgICAweDA3RTgsIDB4MDdFOSwgMHgwN0VBLCAweDA3RjQsIDB4MDdGNSwgMHgwN0ZBLCAweDA4MDAsIDB4MDgwMSwgMHgwODAyLFxuICAgIDB4MDgwMywgMHgwODA0LCAweDA4MDUsIDB4MDgwNiwgMHgwODA3LCAweDA4MDgsIDB4MDgwOSwgMHgwODBBLCAweDA4MEIsXG4gICAgMHgwODBDLCAweDA4MEQsIDB4MDgwRSwgMHgwODBGLCAweDA4MTAsIDB4MDgxMSwgMHgwODEyLCAweDA4MTMsIDB4MDgxNCxcbiAgICAweDA4MTUsIDB4MDgxQSwgMHgwODI0LCAweDA4MjgsIDB4MDgzMCwgMHgwODMxLCAweDA4MzIsIDB4MDgzMywgMHgwODM0LFxuICAgIDB4MDgzNSwgMHgwODM2LCAweDA4MzcsIDB4MDgzOCwgMHgwODM5LCAweDA4M0EsIDB4MDgzQiwgMHgwODNDLCAweDA4M0QsXG4gICAgMHgwODNFLCAweDA4NDAsIDB4MDg0MSwgMHgwODQyLCAweDA4NDMsIDB4MDg0NCwgMHgwODQ1LCAweDA4NDYsIDB4MDg0NyxcbiAgICAweDA4NDgsIDB4MDg0OSwgMHgwODRBLCAweDA4NEIsIDB4MDg0QywgMHgwODRELCAweDA4NEUsIDB4MDg0RiwgMHgwODUwLFxuICAgIDB4MDg1MSwgMHgwODUyLCAweDA4NTMsIDB4MDg1NCwgMHgwODU1LCAweDA4NTYsIDB4MDg1NywgMHgwODU4LCAweDA4NUUsXG4gICAgMHgwOEEwLCAweDA4QTIsIDB4MDhBMywgMHgwOEE0LCAweDA4QTUsIDB4MDhBNiwgMHgwOEE3LCAweDA4QTgsIDB4MDhBOSxcbiAgICAweDA4QUEsIDB4MDhBQiwgMHgwOEFDLCAweDIwMEYsIDB4RkIxRCwgMHhGQjFGLCAweEZCMjAsIDB4RkIyMSwgMHhGQjIyLFxuICAgIDB4RkIyMywgMHhGQjI0LCAweEZCMjUsIDB4RkIyNiwgMHhGQjI3LCAweEZCMjgsIDB4RkIyQSwgMHhGQjJCLCAweEZCMkMsXG4gICAgMHhGQjJELCAweEZCMkUsIDB4RkIyRiwgMHhGQjMwLCAweEZCMzEsIDB4RkIzMiwgMHhGQjMzLCAweEZCMzQsIDB4RkIzNSxcbiAgICAweEZCMzYsIDB4RkIzOCwgMHhGQjM5LCAweEZCM0EsIDB4RkIzQiwgMHhGQjNDLCAweEZCM0UsIDB4RkI0MCwgMHhGQjQxLFxuICAgIDB4RkI0MywgMHhGQjQ0LCAweEZCNDYsIDB4RkI0NywgMHhGQjQ4LCAweEZCNDksIDB4RkI0QSwgMHhGQjRCLCAweEZCNEMsXG4gICAgMHhGQjRELCAweEZCNEUsIDB4RkI0RiwgMHhGQjUwLCAweEZCNTEsIDB4RkI1MiwgMHhGQjUzLCAweEZCNTQsIDB4RkI1NSxcbiAgICAweEZCNTYsIDB4RkI1NywgMHhGQjU4LCAweEZCNTksIDB4RkI1QSwgMHhGQjVCLCAweEZCNUMsIDB4RkI1RCwgMHhGQjVFLFxuICAgIDB4RkI1RiwgMHhGQjYwLCAweEZCNjEsIDB4RkI2MiwgMHhGQjYzLCAweEZCNjQsIDB4RkI2NSwgMHhGQjY2LCAweEZCNjcsXG4gICAgMHhGQjY4LCAweEZCNjksIDB4RkI2QSwgMHhGQjZCLCAweEZCNkMsIDB4RkI2RCwgMHhGQjZFLCAweEZCNkYsIDB4RkI3MCxcbiAgICAweEZCNzEsIDB4RkI3MiwgMHhGQjczLCAweEZCNzQsIDB4RkI3NSwgMHhGQjc2LCAweEZCNzcsIDB4RkI3OCwgMHhGQjc5LFxuICAgIDB4RkI3QSwgMHhGQjdCLCAweEZCN0MsIDB4RkI3RCwgMHhGQjdFLCAweEZCN0YsIDB4RkI4MCwgMHhGQjgxLCAweEZCODIsXG4gICAgMHhGQjgzLCAweEZCODQsIDB4RkI4NSwgMHhGQjg2LCAweEZCODcsIDB4RkI4OCwgMHhGQjg5LCAweEZCOEEsIDB4RkI4QixcbiAgICAweEZCOEMsIDB4RkI4RCwgMHhGQjhFLCAweEZCOEYsIDB4RkI5MCwgMHhGQjkxLCAweEZCOTIsIDB4RkI5MywgMHhGQjk0LFxuICAgIDB4RkI5NSwgMHhGQjk2LCAweEZCOTcsIDB4RkI5OCwgMHhGQjk5LCAweEZCOUEsIDB4RkI5QiwgMHhGQjlDLCAweEZCOUQsXG4gICAgMHhGQjlFLCAweEZCOUYsIDB4RkJBMCwgMHhGQkExLCAweEZCQTIsIDB4RkJBMywgMHhGQkE0LCAweEZCQTUsIDB4RkJBNixcbiAgICAweEZCQTcsIDB4RkJBOCwgMHhGQkE5LCAweEZCQUEsIDB4RkJBQiwgMHhGQkFDLCAweEZCQUQsIDB4RkJBRSwgMHhGQkFGLFxuICAgIDB4RkJCMCwgMHhGQkIxLCAweEZCQjIsIDB4RkJCMywgMHhGQkI0LCAweEZCQjUsIDB4RkJCNiwgMHhGQkI3LCAweEZCQjgsXG4gICAgMHhGQkI5LCAweEZCQkEsIDB4RkJCQiwgMHhGQkJDLCAweEZCQkQsIDB4RkJCRSwgMHhGQkJGLCAweEZCQzAsIDB4RkJDMSxcbiAgICAweEZCRDMsIDB4RkJENCwgMHhGQkQ1LCAweEZCRDYsIDB4RkJENywgMHhGQkQ4LCAweEZCRDksIDB4RkJEQSwgMHhGQkRCLFxuICAgIDB4RkJEQywgMHhGQkRELCAweEZCREUsIDB4RkJERiwgMHhGQkUwLCAweEZCRTEsIDB4RkJFMiwgMHhGQkUzLCAweEZCRTQsXG4gICAgMHhGQkU1LCAweEZCRTYsIDB4RkJFNywgMHhGQkU4LCAweEZCRTksIDB4RkJFQSwgMHhGQkVCLCAweEZCRUMsIDB4RkJFRCxcbiAgICAweEZCRUUsIDB4RkJFRiwgMHhGQkYwLCAweEZCRjEsIDB4RkJGMiwgMHhGQkYzLCAweEZCRjQsIDB4RkJGNSwgMHhGQkY2LFxuICAgIDB4RkJGNywgMHhGQkY4LCAweEZCRjksIDB4RkJGQSwgMHhGQkZCLCAweEZCRkMsIDB4RkJGRCwgMHhGQkZFLCAweEZCRkYsXG4gICAgMHhGQzAwLCAweEZDMDEsIDB4RkMwMiwgMHhGQzAzLCAweEZDMDQsIDB4RkMwNSwgMHhGQzA2LCAweEZDMDcsIDB4RkMwOCxcbiAgICAweEZDMDksIDB4RkMwQSwgMHhGQzBCLCAweEZDMEMsIDB4RkMwRCwgMHhGQzBFLCAweEZDMEYsIDB4RkMxMCwgMHhGQzExLFxuICAgIDB4RkMxMiwgMHhGQzEzLCAweEZDMTQsIDB4RkMxNSwgMHhGQzE2LCAweEZDMTcsIDB4RkMxOCwgMHhGQzE5LCAweEZDMUEsXG4gICAgMHhGQzFCLCAweEZDMUMsIDB4RkMxRCwgMHhGQzFFLCAweEZDMUYsIDB4RkMyMCwgMHhGQzIxLCAweEZDMjIsIDB4RkMyMyxcbiAgICAweEZDMjQsIDB4RkMyNSwgMHhGQzI2LCAweEZDMjcsIDB4RkMyOCwgMHhGQzI5LCAweEZDMkEsIDB4RkMyQiwgMHhGQzJDLFxuICAgIDB4RkMyRCwgMHhGQzJFLCAweEZDMkYsIDB4RkMzMCwgMHhGQzMxLCAweEZDMzIsIDB4RkMzMywgMHhGQzM0LCAweEZDMzUsXG4gICAgMHhGQzM2LCAweEZDMzcsIDB4RkMzOCwgMHhGQzM5LCAweEZDM0EsIDB4RkMzQiwgMHhGQzNDLCAweEZDM0QsIDB4RkMzRSxcbiAgICAweEZDM0YsIDB4RkM0MCwgMHhGQzQxLCAweEZDNDIsIDB4RkM0MywgMHhGQzQ0LCAweEZDNDUsIDB4RkM0NiwgMHhGQzQ3LFxuICAgIDB4RkM0OCwgMHhGQzQ5LCAweEZDNEEsIDB4RkM0QiwgMHhGQzRDLCAweEZDNEQsIDB4RkM0RSwgMHhGQzRGLCAweEZDNTAsXG4gICAgMHhGQzUxLCAweEZDNTIsIDB4RkM1MywgMHhGQzU0LCAweEZDNTUsIDB4RkM1NiwgMHhGQzU3LCAweEZDNTgsIDB4RkM1OSxcbiAgICAweEZDNUEsIDB4RkM1QiwgMHhGQzVDLCAweEZDNUQsIDB4RkM1RSwgMHhGQzVGLCAweEZDNjAsIDB4RkM2MSwgMHhGQzYyLFxuICAgIDB4RkM2MywgMHhGQzY0LCAweEZDNjUsIDB4RkM2NiwgMHhGQzY3LCAweEZDNjgsIDB4RkM2OSwgMHhGQzZBLCAweEZDNkIsXG4gICAgMHhGQzZDLCAweEZDNkQsIDB4RkM2RSwgMHhGQzZGLCAweEZDNzAsIDB4RkM3MSwgMHhGQzcyLCAweEZDNzMsIDB4RkM3NCxcbiAgICAweEZDNzUsIDB4RkM3NiwgMHhGQzc3LCAweEZDNzgsIDB4RkM3OSwgMHhGQzdBLCAweEZDN0IsIDB4RkM3QywgMHhGQzdELFxuICAgIDB4RkM3RSwgMHhGQzdGLCAweEZDODAsIDB4RkM4MSwgMHhGQzgyLCAweEZDODMsIDB4RkM4NCwgMHhGQzg1LCAweEZDODYsXG4gICAgMHhGQzg3LCAweEZDODgsIDB4RkM4OSwgMHhGQzhBLCAweEZDOEIsIDB4RkM4QywgMHhGQzhELCAweEZDOEUsIDB4RkM4RixcbiAgICAweEZDOTAsIDB4RkM5MSwgMHhGQzkyLCAweEZDOTMsIDB4RkM5NCwgMHhGQzk1LCAweEZDOTYsIDB4RkM5NywgMHhGQzk4LFxuICAgIDB4RkM5OSwgMHhGQzlBLCAweEZDOUIsIDB4RkM5QywgMHhGQzlELCAweEZDOUUsIDB4RkM5RiwgMHhGQ0EwLCAweEZDQTEsXG4gICAgMHhGQ0EyLCAweEZDQTMsIDB4RkNBNCwgMHhGQ0E1LCAweEZDQTYsIDB4RkNBNywgMHhGQ0E4LCAweEZDQTksIDB4RkNBQSxcbiAgICAweEZDQUIsIDB4RkNBQywgMHhGQ0FELCAweEZDQUUsIDB4RkNBRiwgMHhGQ0IwLCAweEZDQjEsIDB4RkNCMiwgMHhGQ0IzLFxuICAgIDB4RkNCNCwgMHhGQ0I1LCAweEZDQjYsIDB4RkNCNywgMHhGQ0I4LCAweEZDQjksIDB4RkNCQSwgMHhGQ0JCLCAweEZDQkMsXG4gICAgMHhGQ0JELCAweEZDQkUsIDB4RkNCRiwgMHhGQ0MwLCAweEZDQzEsIDB4RkNDMiwgMHhGQ0MzLCAweEZDQzQsIDB4RkNDNSxcbiAgICAweEZDQzYsIDB4RkNDNywgMHhGQ0M4LCAweEZDQzksIDB4RkNDQSwgMHhGQ0NCLCAweEZDQ0MsIDB4RkNDRCwgMHhGQ0NFLFxuICAgIDB4RkNDRiwgMHhGQ0QwLCAweEZDRDEsIDB4RkNEMiwgMHhGQ0QzLCAweEZDRDQsIDB4RkNENSwgMHhGQ0Q2LCAweEZDRDcsXG4gICAgMHhGQ0Q4LCAweEZDRDksIDB4RkNEQSwgMHhGQ0RCLCAweEZDREMsIDB4RkNERCwgMHhGQ0RFLCAweEZDREYsIDB4RkNFMCxcbiAgICAweEZDRTEsIDB4RkNFMiwgMHhGQ0UzLCAweEZDRTQsIDB4RkNFNSwgMHhGQ0U2LCAweEZDRTcsIDB4RkNFOCwgMHhGQ0U5LFxuICAgIDB4RkNFQSwgMHhGQ0VCLCAweEZDRUMsIDB4RkNFRCwgMHhGQ0VFLCAweEZDRUYsIDB4RkNGMCwgMHhGQ0YxLCAweEZDRjIsXG4gICAgMHhGQ0YzLCAweEZDRjQsIDB4RkNGNSwgMHhGQ0Y2LCAweEZDRjcsIDB4RkNGOCwgMHhGQ0Y5LCAweEZDRkEsIDB4RkNGQixcbiAgICAweEZDRkMsIDB4RkNGRCwgMHhGQ0ZFLCAweEZDRkYsIDB4RkQwMCwgMHhGRDAxLCAweEZEMDIsIDB4RkQwMywgMHhGRDA0LFxuICAgIDB4RkQwNSwgMHhGRDA2LCAweEZEMDcsIDB4RkQwOCwgMHhGRDA5LCAweEZEMEEsIDB4RkQwQiwgMHhGRDBDLCAweEZEMEQsXG4gICAgMHhGRDBFLCAweEZEMEYsIDB4RkQxMCwgMHhGRDExLCAweEZEMTIsIDB4RkQxMywgMHhGRDE0LCAweEZEMTUsIDB4RkQxNixcbiAgICAweEZEMTcsIDB4RkQxOCwgMHhGRDE5LCAweEZEMUEsIDB4RkQxQiwgMHhGRDFDLCAweEZEMUQsIDB4RkQxRSwgMHhGRDFGLFxuICAgIDB4RkQyMCwgMHhGRDIxLCAweEZEMjIsIDB4RkQyMywgMHhGRDI0LCAweEZEMjUsIDB4RkQyNiwgMHhGRDI3LCAweEZEMjgsXG4gICAgMHhGRDI5LCAweEZEMkEsIDB4RkQyQiwgMHhGRDJDLCAweEZEMkQsIDB4RkQyRSwgMHhGRDJGLCAweEZEMzAsIDB4RkQzMSxcbiAgICAweEZEMzIsIDB4RkQzMywgMHhGRDM0LCAweEZEMzUsIDB4RkQzNiwgMHhGRDM3LCAweEZEMzgsIDB4RkQzOSwgMHhGRDNBLFxuICAgIDB4RkQzQiwgMHhGRDNDLCAweEZEM0QsIDB4RkQ1MCwgMHhGRDUxLCAweEZENTIsIDB4RkQ1MywgMHhGRDU0LCAweEZENTUsXG4gICAgMHhGRDU2LCAweEZENTcsIDB4RkQ1OCwgMHhGRDU5LCAweEZENUEsIDB4RkQ1QiwgMHhGRDVDLCAweEZENUQsIDB4RkQ1RSxcbiAgICAweEZENUYsIDB4RkQ2MCwgMHhGRDYxLCAweEZENjIsIDB4RkQ2MywgMHhGRDY0LCAweEZENjUsIDB4RkQ2NiwgMHhGRDY3LFxuICAgIDB4RkQ2OCwgMHhGRDY5LCAweEZENkEsIDB4RkQ2QiwgMHhGRDZDLCAweEZENkQsIDB4RkQ2RSwgMHhGRDZGLCAweEZENzAsXG4gICAgMHhGRDcxLCAweEZENzIsIDB4RkQ3MywgMHhGRDc0LCAweEZENzUsIDB4RkQ3NiwgMHhGRDc3LCAweEZENzgsIDB4RkQ3OSxcbiAgICAweEZEN0EsIDB4RkQ3QiwgMHhGRDdDLCAweEZEN0QsIDB4RkQ3RSwgMHhGRDdGLCAweEZEODAsIDB4RkQ4MSwgMHhGRDgyLFxuICAgIDB4RkQ4MywgMHhGRDg0LCAweEZEODUsIDB4RkQ4NiwgMHhGRDg3LCAweEZEODgsIDB4RkQ4OSwgMHhGRDhBLCAweEZEOEIsXG4gICAgMHhGRDhDLCAweEZEOEQsIDB4RkQ4RSwgMHhGRDhGLCAweEZEOTIsIDB4RkQ5MywgMHhGRDk0LCAweEZEOTUsIDB4RkQ5NixcbiAgICAweEZEOTcsIDB4RkQ5OCwgMHhGRDk5LCAweEZEOUEsIDB4RkQ5QiwgMHhGRDlDLCAweEZEOUQsIDB4RkQ5RSwgMHhGRDlGLFxuICAgIDB4RkRBMCwgMHhGREExLCAweEZEQTIsIDB4RkRBMywgMHhGREE0LCAweEZEQTUsIDB4RkRBNiwgMHhGREE3LCAweEZEQTgsXG4gICAgMHhGREE5LCAweEZEQUEsIDB4RkRBQiwgMHhGREFDLCAweEZEQUQsIDB4RkRBRSwgMHhGREFGLCAweEZEQjAsIDB4RkRCMSxcbiAgICAweEZEQjIsIDB4RkRCMywgMHhGREI0LCAweEZEQjUsIDB4RkRCNiwgMHhGREI3LCAweEZEQjgsIDB4RkRCOSwgMHhGREJBLFxuICAgIDB4RkRCQiwgMHhGREJDLCAweEZEQkQsIDB4RkRCRSwgMHhGREJGLCAweEZEQzAsIDB4RkRDMSwgMHhGREMyLCAweEZEQzMsXG4gICAgMHhGREM0LCAweEZEQzUsIDB4RkRDNiwgMHhGREM3LCAweEZERjAsIDB4RkRGMSwgMHhGREYyLCAweEZERjMsIDB4RkRGNCxcbiAgICAweEZERjUsIDB4RkRGNiwgMHhGREY3LCAweEZERjgsIDB4RkRGOSwgMHhGREZBLCAweEZERkIsIDB4RkRGQywgMHhGRTcwLFxuICAgIDB4RkU3MSwgMHhGRTcyLCAweEZFNzMsIDB4RkU3NCwgMHhGRTc2LCAweEZFNzcsIDB4RkU3OCwgMHhGRTc5LCAweEZFN0EsXG4gICAgMHhGRTdCLCAweEZFN0MsIDB4RkU3RCwgMHhGRTdFLCAweEZFN0YsIDB4RkU4MCwgMHhGRTgxLCAweEZFODIsIDB4RkU4MyxcbiAgICAweEZFODQsIDB4RkU4NSwgMHhGRTg2LCAweEZFODcsIDB4RkU4OCwgMHhGRTg5LCAweEZFOEEsIDB4RkU4QiwgMHhGRThDLFxuICAgIDB4RkU4RCwgMHhGRThFLCAweEZFOEYsIDB4RkU5MCwgMHhGRTkxLCAweEZFOTIsIDB4RkU5MywgMHhGRTk0LCAweEZFOTUsXG4gICAgMHhGRTk2LCAweEZFOTcsIDB4RkU5OCwgMHhGRTk5LCAweEZFOUEsIDB4RkU5QiwgMHhGRTlDLCAweEZFOUQsIDB4RkU5RSxcbiAgICAweEZFOUYsIDB4RkVBMCwgMHhGRUExLCAweEZFQTIsIDB4RkVBMywgMHhGRUE0LCAweEZFQTUsIDB4RkVBNiwgMHhGRUE3LFxuICAgIDB4RkVBOCwgMHhGRUE5LCAweEZFQUEsIDB4RkVBQiwgMHhGRUFDLCAweEZFQUQsIDB4RkVBRSwgMHhGRUFGLCAweEZFQjAsXG4gICAgMHhGRUIxLCAweEZFQjIsIDB4RkVCMywgMHhGRUI0LCAweEZFQjUsIDB4RkVCNiwgMHhGRUI3LCAweEZFQjgsIDB4RkVCOSxcbiAgICAweEZFQkEsIDB4RkVCQiwgMHhGRUJDLCAweEZFQkQsIDB4RkVCRSwgMHhGRUJGLCAweEZFQzAsIDB4RkVDMSwgMHhGRUMyLFxuICAgIDB4RkVDMywgMHhGRUM0LCAweEZFQzUsIDB4RkVDNiwgMHhGRUM3LCAweEZFQzgsIDB4RkVDOSwgMHhGRUNBLCAweEZFQ0IsXG4gICAgMHhGRUNDLCAweEZFQ0QsIDB4RkVDRSwgMHhGRUNGLCAweEZFRDAsIDB4RkVEMSwgMHhGRUQyLCAweEZFRDMsIDB4RkVENCxcbiAgICAweEZFRDUsIDB4RkVENiwgMHhGRUQ3LCAweEZFRDgsIDB4RkVEOSwgMHhGRURBLCAweEZFREIsIDB4RkVEQywgMHhGRURELFxuICAgIDB4RkVERSwgMHhGRURGLCAweEZFRTAsIDB4RkVFMSwgMHhGRUUyLCAweEZFRTMsIDB4RkVFNCwgMHhGRUU1LCAweEZFRTYsXG4gICAgMHhGRUU3LCAweEZFRTgsIDB4RkVFOSwgMHhGRUVBLCAweEZFRUIsIDB4RkVFQywgMHhGRUVELCAweEZFRUUsIDB4RkVFRixcbiAgICAweEZFRjAsIDB4RkVGMSwgMHhGRUYyLCAweEZFRjMsIDB4RkVGNCwgMHhGRUY1LCAweEZFRjYsIDB4RkVGNywgMHhGRUY4LFxuICAgIDB4RkVGOSwgMHhGRUZBLCAweEZFRkIsIDB4RkVGQywgMHgxMDgwMCwgMHgxMDgwMSwgMHgxMDgwMiwgMHgxMDgwMyxcbiAgICAweDEwODA0LCAweDEwODA1LCAweDEwODA4LCAweDEwODBBLCAweDEwODBCLCAweDEwODBDLCAweDEwODBELCAweDEwODBFLFxuICAgIDB4MTA4MEYsIDB4MTA4MTAsIDB4MTA4MTEsIDB4MTA4MTIsIDB4MTA4MTMsIDB4MTA4MTQsIDB4MTA4MTUsIDB4MTA4MTYsXG4gICAgMHgxMDgxNywgMHgxMDgxOCwgMHgxMDgxOSwgMHgxMDgxQSwgMHgxMDgxQiwgMHgxMDgxQywgMHgxMDgxRCwgMHgxMDgxRSxcbiAgICAweDEwODFGLCAweDEwODIwLCAweDEwODIxLCAweDEwODIyLCAweDEwODIzLCAweDEwODI0LCAweDEwODI1LCAweDEwODI2LFxuICAgIDB4MTA4MjcsIDB4MTA4MjgsIDB4MTA4MjksIDB4MTA4MkEsIDB4MTA4MkIsIDB4MTA4MkMsIDB4MTA4MkQsIDB4MTA4MkUsXG4gICAgMHgxMDgyRiwgMHgxMDgzMCwgMHgxMDgzMSwgMHgxMDgzMiwgMHgxMDgzMywgMHgxMDgzNCwgMHgxMDgzNSwgMHgxMDgzNyxcbiAgICAweDEwODM4LCAweDEwODNDLCAweDEwODNGLCAweDEwODQwLCAweDEwODQxLCAweDEwODQyLCAweDEwODQzLCAweDEwODQ0LFxuICAgIDB4MTA4NDUsIDB4MTA4NDYsIDB4MTA4NDcsIDB4MTA4NDgsIDB4MTA4NDksIDB4MTA4NEEsIDB4MTA4NEIsIDB4MTA4NEMsXG4gICAgMHgxMDg0RCwgMHgxMDg0RSwgMHgxMDg0RiwgMHgxMDg1MCwgMHgxMDg1MSwgMHgxMDg1MiwgMHgxMDg1MywgMHgxMDg1NCxcbiAgICAweDEwODU1LCAweDEwODU3LCAweDEwODU4LCAweDEwODU5LCAweDEwODVBLCAweDEwODVCLCAweDEwODVDLCAweDEwODVELFxuICAgIDB4MTA4NUUsIDB4MTA4NUYsIDB4MTA5MDAsIDB4MTA5MDEsIDB4MTA5MDIsIDB4MTA5MDMsIDB4MTA5MDQsIDB4MTA5MDUsXG4gICAgMHgxMDkwNiwgMHgxMDkwNywgMHgxMDkwOCwgMHgxMDkwOSwgMHgxMDkwQSwgMHgxMDkwQiwgMHgxMDkwQywgMHgxMDkwRCxcbiAgICAweDEwOTBFLCAweDEwOTBGLCAweDEwOTEwLCAweDEwOTExLCAweDEwOTEyLCAweDEwOTEzLCAweDEwOTE0LCAweDEwOTE1LFxuICAgIDB4MTA5MTYsIDB4MTA5MTcsIDB4MTA5MTgsIDB4MTA5MTksIDB4MTA5MUEsIDB4MTA5MUIsIDB4MTA5MjAsIDB4MTA5MjEsXG4gICAgMHgxMDkyMiwgMHgxMDkyMywgMHgxMDkyNCwgMHgxMDkyNSwgMHgxMDkyNiwgMHgxMDkyNywgMHgxMDkyOCwgMHgxMDkyOSxcbiAgICAweDEwOTJBLCAweDEwOTJCLCAweDEwOTJDLCAweDEwOTJELCAweDEwOTJFLCAweDEwOTJGLCAweDEwOTMwLCAweDEwOTMxLFxuICAgIDB4MTA5MzIsIDB4MTA5MzMsIDB4MTA5MzQsIDB4MTA5MzUsIDB4MTA5MzYsIDB4MTA5MzcsIDB4MTA5MzgsIDB4MTA5MzksXG4gICAgMHgxMDkzRiwgMHgxMDk4MCwgMHgxMDk4MSwgMHgxMDk4MiwgMHgxMDk4MywgMHgxMDk4NCwgMHgxMDk4NSwgMHgxMDk4NixcbiAgICAweDEwOTg3LCAweDEwOTg4LCAweDEwOTg5LCAweDEwOThBLCAweDEwOThCLCAweDEwOThDLCAweDEwOThELCAweDEwOThFLFxuICAgIDB4MTA5OEYsIDB4MTA5OTAsIDB4MTA5OTEsIDB4MTA5OTIsIDB4MTA5OTMsIDB4MTA5OTQsIDB4MTA5OTUsIDB4MTA5OTYsXG4gICAgMHgxMDk5NywgMHgxMDk5OCwgMHgxMDk5OSwgMHgxMDk5QSwgMHgxMDk5QiwgMHgxMDk5QywgMHgxMDk5RCwgMHgxMDk5RSxcbiAgICAweDEwOTlGLCAweDEwOUEwLCAweDEwOUExLCAweDEwOUEyLCAweDEwOUEzLCAweDEwOUE0LCAweDEwOUE1LCAweDEwOUE2LFxuICAgIDB4MTA5QTcsIDB4MTA5QTgsIDB4MTA5QTksIDB4MTA5QUEsIDB4MTA5QUIsIDB4MTA5QUMsIDB4MTA5QUQsIDB4MTA5QUUsXG4gICAgMHgxMDlBRiwgMHgxMDlCMCwgMHgxMDlCMSwgMHgxMDlCMiwgMHgxMDlCMywgMHgxMDlCNCwgMHgxMDlCNSwgMHgxMDlCNixcbiAgICAweDEwOUI3LCAweDEwOUJFLCAweDEwOUJGLCAweDEwQTAwLCAweDEwQTEwLCAweDEwQTExLCAweDEwQTEyLCAweDEwQTEzLFxuICAgIDB4MTBBMTUsIDB4MTBBMTYsIDB4MTBBMTcsIDB4MTBBMTksIDB4MTBBMUEsIDB4MTBBMUIsIDB4MTBBMUMsIDB4MTBBMUQsXG4gICAgMHgxMEExRSwgMHgxMEExRiwgMHgxMEEyMCwgMHgxMEEyMSwgMHgxMEEyMiwgMHgxMEEyMywgMHgxMEEyNCwgMHgxMEEyNSxcbiAgICAweDEwQTI2LCAweDEwQTI3LCAweDEwQTI4LCAweDEwQTI5LCAweDEwQTJBLCAweDEwQTJCLCAweDEwQTJDLCAweDEwQTJELFxuICAgIDB4MTBBMkUsIDB4MTBBMkYsIDB4MTBBMzAsIDB4MTBBMzEsIDB4MTBBMzIsIDB4MTBBMzMsIDB4MTBBNDAsIDB4MTBBNDEsXG4gICAgMHgxMEE0MiwgMHgxMEE0MywgMHgxMEE0NCwgMHgxMEE0NSwgMHgxMEE0NiwgMHgxMEE0NywgMHgxMEE1MCwgMHgxMEE1MSxcbiAgICAweDEwQTUyLCAweDEwQTUzLCAweDEwQTU0LCAweDEwQTU1LCAweDEwQTU2LCAweDEwQTU3LCAweDEwQTU4LCAweDEwQTYwLFxuICAgIDB4MTBBNjEsIDB4MTBBNjIsIDB4MTBBNjMsIDB4MTBBNjQsIDB4MTBBNjUsIDB4MTBBNjYsIDB4MTBBNjcsIDB4MTBBNjgsXG4gICAgMHgxMEE2OSwgMHgxMEE2QSwgMHgxMEE2QiwgMHgxMEE2QywgMHgxMEE2RCwgMHgxMEE2RSwgMHgxMEE2RiwgMHgxMEE3MCxcbiAgICAweDEwQTcxLCAweDEwQTcyLCAweDEwQTczLCAweDEwQTc0LCAweDEwQTc1LCAweDEwQTc2LCAweDEwQTc3LCAweDEwQTc4LFxuICAgIDB4MTBBNzksIDB4MTBBN0EsIDB4MTBBN0IsIDB4MTBBN0MsIDB4MTBBN0QsIDB4MTBBN0UsIDB4MTBBN0YsIDB4MTBCMDAsXG4gICAgMHgxMEIwMSwgMHgxMEIwMiwgMHgxMEIwMywgMHgxMEIwNCwgMHgxMEIwNSwgMHgxMEIwNiwgMHgxMEIwNywgMHgxMEIwOCxcbiAgICAweDEwQjA5LCAweDEwQjBBLCAweDEwQjBCLCAweDEwQjBDLCAweDEwQjBELCAweDEwQjBFLCAweDEwQjBGLCAweDEwQjEwLFxuICAgIDB4MTBCMTEsIDB4MTBCMTIsIDB4MTBCMTMsIDB4MTBCMTQsIDB4MTBCMTUsIDB4MTBCMTYsIDB4MTBCMTcsIDB4MTBCMTgsXG4gICAgMHgxMEIxOSwgMHgxMEIxQSwgMHgxMEIxQiwgMHgxMEIxQywgMHgxMEIxRCwgMHgxMEIxRSwgMHgxMEIxRiwgMHgxMEIyMCxcbiAgICAweDEwQjIxLCAweDEwQjIyLCAweDEwQjIzLCAweDEwQjI0LCAweDEwQjI1LCAweDEwQjI2LCAweDEwQjI3LCAweDEwQjI4LFxuICAgIDB4MTBCMjksIDB4MTBCMkEsIDB4MTBCMkIsIDB4MTBCMkMsIDB4MTBCMkQsIDB4MTBCMkUsIDB4MTBCMkYsIDB4MTBCMzAsXG4gICAgMHgxMEIzMSwgMHgxMEIzMiwgMHgxMEIzMywgMHgxMEIzNCwgMHgxMEIzNSwgMHgxMEI0MCwgMHgxMEI0MSwgMHgxMEI0MixcbiAgICAweDEwQjQzLCAweDEwQjQ0LCAweDEwQjQ1LCAweDEwQjQ2LCAweDEwQjQ3LCAweDEwQjQ4LCAweDEwQjQ5LCAweDEwQjRBLFxuICAgIDB4MTBCNEIsIDB4MTBCNEMsIDB4MTBCNEQsIDB4MTBCNEUsIDB4MTBCNEYsIDB4MTBCNTAsIDB4MTBCNTEsIDB4MTBCNTIsXG4gICAgMHgxMEI1MywgMHgxMEI1NCwgMHgxMEI1NSwgMHgxMEI1OCwgMHgxMEI1OSwgMHgxMEI1QSwgMHgxMEI1QiwgMHgxMEI1QyxcbiAgICAweDEwQjVELCAweDEwQjVFLCAweDEwQjVGLCAweDEwQjYwLCAweDEwQjYxLCAweDEwQjYyLCAweDEwQjYzLCAweDEwQjY0LFxuICAgIDB4MTBCNjUsIDB4MTBCNjYsIDB4MTBCNjcsIDB4MTBCNjgsIDB4MTBCNjksIDB4MTBCNkEsIDB4MTBCNkIsIDB4MTBCNkMsXG4gICAgMHgxMEI2RCwgMHgxMEI2RSwgMHgxMEI2RiwgMHgxMEI3MCwgMHgxMEI3MSwgMHgxMEI3MiwgMHgxMEI3OCwgMHgxMEI3OSxcbiAgICAweDEwQjdBLCAweDEwQjdCLCAweDEwQjdDLCAweDEwQjdELCAweDEwQjdFLCAweDEwQjdGLCAweDEwQzAwLCAweDEwQzAxLFxuICAgIDB4MTBDMDIsIDB4MTBDMDMsIDB4MTBDMDQsIDB4MTBDMDUsIDB4MTBDMDYsIDB4MTBDMDcsIDB4MTBDMDgsIDB4MTBDMDksXG4gICAgMHgxMEMwQSwgMHgxMEMwQiwgMHgxMEMwQywgMHgxMEMwRCwgMHgxMEMwRSwgMHgxMEMwRiwgMHgxMEMxMCwgMHgxMEMxMSxcbiAgICAweDEwQzEyLCAweDEwQzEzLCAweDEwQzE0LCAweDEwQzE1LCAweDEwQzE2LCAweDEwQzE3LCAweDEwQzE4LCAweDEwQzE5LFxuICAgIDB4MTBDMUEsIDB4MTBDMUIsIDB4MTBDMUMsIDB4MTBDMUQsIDB4MTBDMUUsIDB4MTBDMUYsIDB4MTBDMjAsIDB4MTBDMjEsXG4gICAgMHgxMEMyMiwgMHgxMEMyMywgMHgxMEMyNCwgMHgxMEMyNSwgMHgxMEMyNiwgMHgxMEMyNywgMHgxMEMyOCwgMHgxMEMyOSxcbiAgICAweDEwQzJBLCAweDEwQzJCLCAweDEwQzJDLCAweDEwQzJELCAweDEwQzJFLCAweDEwQzJGLCAweDEwQzMwLCAweDEwQzMxLFxuICAgIDB4MTBDMzIsIDB4MTBDMzMsIDB4MTBDMzQsIDB4MTBDMzUsIDB4MTBDMzYsIDB4MTBDMzcsIDB4MTBDMzgsIDB4MTBDMzksXG4gICAgMHgxMEMzQSwgMHgxMEMzQiwgMHgxMEMzQywgMHgxMEMzRCwgMHgxMEMzRSwgMHgxMEMzRiwgMHgxMEM0MCwgMHgxMEM0MSxcbiAgICAweDEwQzQyLCAweDEwQzQzLCAweDEwQzQ0LCAweDEwQzQ1LCAweDEwQzQ2LCAweDEwQzQ3LCAweDEwQzQ4LCAweDFFRTAwLFxuICAgIDB4MUVFMDEsIDB4MUVFMDIsIDB4MUVFMDMsIDB4MUVFMDUsIDB4MUVFMDYsIDB4MUVFMDcsIDB4MUVFMDgsIDB4MUVFMDksXG4gICAgMHgxRUUwQSwgMHgxRUUwQiwgMHgxRUUwQywgMHgxRUUwRCwgMHgxRUUwRSwgMHgxRUUwRiwgMHgxRUUxMCwgMHgxRUUxMSxcbiAgICAweDFFRTEyLCAweDFFRTEzLCAweDFFRTE0LCAweDFFRTE1LCAweDFFRTE2LCAweDFFRTE3LCAweDFFRTE4LCAweDFFRTE5LFxuICAgIDB4MUVFMUEsIDB4MUVFMUIsIDB4MUVFMUMsIDB4MUVFMUQsIDB4MUVFMUUsIDB4MUVFMUYsIDB4MUVFMjEsIDB4MUVFMjIsXG4gICAgMHgxRUUyNCwgMHgxRUUyNywgMHgxRUUyOSwgMHgxRUUyQSwgMHgxRUUyQiwgMHgxRUUyQywgMHgxRUUyRCwgMHgxRUUyRSxcbiAgICAweDFFRTJGLCAweDFFRTMwLCAweDFFRTMxLCAweDFFRTMyLCAweDFFRTM0LCAweDFFRTM1LCAweDFFRTM2LCAweDFFRTM3LFxuICAgIDB4MUVFMzksIDB4MUVFM0IsIDB4MUVFNDIsIDB4MUVFNDcsIDB4MUVFNDksIDB4MUVFNEIsIDB4MUVFNEQsIDB4MUVFNEUsXG4gICAgMHgxRUU0RiwgMHgxRUU1MSwgMHgxRUU1MiwgMHgxRUU1NCwgMHgxRUU1NywgMHgxRUU1OSwgMHgxRUU1QiwgMHgxRUU1RCxcbiAgICAweDFFRTVGLCAweDFFRTYxLCAweDFFRTYyLCAweDFFRTY0LCAweDFFRTY3LCAweDFFRTY4LCAweDFFRTY5LCAweDFFRTZBLFxuICAgIDB4MUVFNkMsIDB4MUVFNkQsIDB4MUVFNkUsIDB4MUVFNkYsIDB4MUVFNzAsIDB4MUVFNzEsIDB4MUVFNzIsIDB4MUVFNzQsXG4gICAgMHgxRUU3NSwgMHgxRUU3NiwgMHgxRUU3NywgMHgxRUU3OSwgMHgxRUU3QSwgMHgxRUU3QiwgMHgxRUU3QywgMHgxRUU3RSxcbiAgICAweDFFRTgwLCAweDFFRTgxLCAweDFFRTgyLCAweDFFRTgzLCAweDFFRTg0LCAweDFFRTg1LCAweDFFRTg2LCAweDFFRTg3LFxuICAgIDB4MUVFODgsIDB4MUVFODksIDB4MUVFOEIsIDB4MUVFOEMsIDB4MUVFOEQsIDB4MUVFOEUsIDB4MUVFOEYsIDB4MUVFOTAsXG4gICAgMHgxRUU5MSwgMHgxRUU5MiwgMHgxRUU5MywgMHgxRUU5NCwgMHgxRUU5NSwgMHgxRUU5NiwgMHgxRUU5NywgMHgxRUU5OCxcbiAgICAweDFFRTk5LCAweDFFRTlBLCAweDFFRTlCLCAweDFFRUExLCAweDFFRUEyLCAweDFFRUEzLCAweDFFRUE1LCAweDFFRUE2LFxuICAgIDB4MUVFQTcsIDB4MUVFQTgsIDB4MUVFQTksIDB4MUVFQUIsIDB4MUVFQUMsIDB4MUVFQUQsIDB4MUVFQUUsIDB4MUVFQUYsXG4gICAgMHgxRUVCMCwgMHgxRUVCMSwgMHgxRUVCMiwgMHgxRUVCMywgMHgxRUVCNCwgMHgxRUVCNSwgMHgxRUVCNiwgMHgxRUVCNyxcbiAgICAweDFFRUI4LCAweDFFRUI5LCAweDFFRUJBLCAweDFFRUJCLCAweDEwRkZGRF07XG5cbmZ1bmN0aW9uIGRldGVybWluZUJpZGkoY3VlRGl2KSB7XG4gICAgdmFyIG5vZGVTdGFjayA9IFtdLFxuICAgICAgICB0ZXh0ID0gXCJcIixcbiAgICAgICAgY2hhckNvZGU7XG5cbiAgICBpZiAoIWN1ZURpdiB8fCAhY3VlRGl2LmNoaWxkTm9kZXMpIHtcbiAgICAgICAgcmV0dXJuIFwibHRyXCI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHVzaE5vZGVzKG5vZGVTdGFjaywgbm9kZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gbm9kZS5jaGlsZE5vZGVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBub2RlU3RhY2sucHVzaChub2RlLmNoaWxkTm9kZXNbaV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbmV4dFRleHROb2RlKG5vZGVTdGFjaykge1xuICAgICAgICBpZiAoIW5vZGVTdGFjayB8fCAhbm9kZVN0YWNrLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbm9kZSA9IG5vZGVTdGFjay5wb3AoKSxcbiAgICAgICAgICAgIHRleHQgPSBub2RlLnRleHRDb250ZW50IHx8IG5vZGUuaW5uZXJUZXh0O1xuICAgICAgICBpZiAodGV4dCkge1xuICAgICAgICAgICAgLy8gVE9ETzogVGhpcyBzaG91bGQgbWF0Y2ggYWxsIHVuaWNvZGUgdHlwZSBCIGNoYXJhY3RlcnMgKHBhcmFncmFwaFxuICAgICAgICAgICAgLy8gc2VwYXJhdG9yIGNoYXJhY3RlcnMpLiBTZWUgaXNzdWUgIzExNS5cbiAgICAgICAgICAgIHZhciBtID0gdGV4dC5tYXRjaCgvXi4qKFxcbnxcXHIpLyk7XG4gICAgICAgICAgICBpZiAobSkge1xuICAgICAgICAgICAgICAgIG5vZGVTdGFjay5sZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgIHJldHVybiBtWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vZGUudGFnTmFtZSA9PT0gXCJydWJ5XCIpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXh0VGV4dE5vZGUobm9kZVN0YWNrKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm9kZS5jaGlsZE5vZGVzKSB7XG4gICAgICAgICAgICBwdXNoTm9kZXMobm9kZVN0YWNrLCBub2RlKTtcbiAgICAgICAgICAgIHJldHVybiBuZXh0VGV4dE5vZGUobm9kZVN0YWNrKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1c2hOb2Rlcyhub2RlU3RhY2ssIGN1ZURpdik7XG4gICAgd2hpbGUgKCh0ZXh0ID0gbmV4dFRleHROb2RlKG5vZGVTdGFjaykpKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGV4dC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY2hhckNvZGUgPSB0ZXh0LmNoYXJDb2RlQXQoaSk7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHN0cm9uZ1JUTENoYXJzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0cm9uZ1JUTENoYXJzW2pdID09PSBjaGFyQ29kZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJydGxcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFwibHRyXCI7XG59XG5cbmZ1bmN0aW9uIGNvbXB1dGVMaW5lUG9zKGN1ZSkge1xuICAgIGlmICh0eXBlb2YgY3VlLmxpbmUgPT09IFwibnVtYmVyXCIgJiZcbiAgICAgICAgKGN1ZS5zbmFwVG9MaW5lcyB8fCAoY3VlLmxpbmUgPj0gMCAmJiBjdWUubGluZSA8PSAxMDApKSkge1xuICAgICAgICByZXR1cm4gY3VlLmxpbmU7XG4gICAgfVxuICAgIGlmICghY3VlLnRyYWNrIHx8ICFjdWUudHJhY2sudGV4dFRyYWNrTGlzdCB8fFxuICAgICAgICAhY3VlLnRyYWNrLnRleHRUcmFja0xpc3QubWVkaWFFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gICAgdmFyIHRyYWNrID0gY3VlLnRyYWNrLFxuICAgICAgICB0cmFja0xpc3QgPSB0cmFjay50ZXh0VHJhY2tMaXN0LFxuICAgICAgICBjb3VudCA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0cmFja0xpc3QubGVuZ3RoICYmIHRyYWNrTGlzdFtpXSAhPT0gdHJhY2s7IGkrKykge1xuICAgICAgICBpZiAodHJhY2tMaXN0W2ldLm1vZGUgPT09IFwic2hvd2luZ1wiKSB7XG4gICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiArK2NvdW50ICogLTE7XG59XG5cbmZ1bmN0aW9uIFN0eWxlQm94KCkge1xufVxuXG4vLyBBcHBseSBzdHlsZXMgdG8gYSBkaXYuIElmIHRoZXJlIGlzIG5vIGRpdiBwYXNzZWQgdGhlbiBpdCBkZWZhdWx0cyB0byB0aGVcbi8vIGRpdiBvbiAndGhpcycuXG5TdHlsZUJveC5wcm90b3R5cGUuYXBwbHlTdHlsZXMgPSBmdW5jdGlvbihzdHlsZXMsIGRpdikge1xuICAgIGRpdiA9IGRpdiB8fCB0aGlzLmRpdjtcbiAgICBmb3IgKHZhciBwcm9wIGluIHN0eWxlcykge1xuICAgICAgICBpZiAoc3R5bGVzLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgICBkaXYuc3R5bGVbcHJvcF0gPSBzdHlsZXNbcHJvcF07XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5TdHlsZUJveC5wcm90b3R5cGUuZm9ybWF0U3R5bGUgPSBmdW5jdGlvbih2YWwsIHVuaXQpIHtcbiAgICByZXR1cm4gdmFsID09PSAwID8gMCA6IHZhbCArIHVuaXQ7XG59O1xuXG4vLyBDb25zdHJ1Y3RzIHRoZSBjb21wdXRlZCBkaXNwbGF5IHN0YXRlIG9mIHRoZSBjdWUgKGEgZGl2KS4gUGxhY2VzIHRoZSBkaXZcbi8vIGludG8gdGhlIG92ZXJsYXkgd2hpY2ggc2hvdWxkIGJlIGEgYmxvY2sgbGV2ZWwgZWxlbWVudCAodXN1YWxseSBhIGRpdikuXG5mdW5jdGlvbiBDdWVTdHlsZUJveCh3aW5kb3csIGN1ZSwgc3R5bGVPcHRpb25zKSB7XG4gICAgdmFyIGlzSUU4ID0gKHR5cGVvZiBuYXZpZ2F0b3IgIT09IFwidW5kZWZpbmVkXCIpICYmXG4gICAgICAgICgvTVNJRVxcczhcXC4wLykudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICB2YXIgY29sb3IgPSBcInJnYmEoMjU1LCAyNTUsIDI1NSwgMSlcIjtcbiAgICB2YXIgYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsIDAsIDAsIDAuOClcIjtcbiAgICB2YXIgdGV4dFNoYWRvdyA9IFwiXCI7XG5cbiAgICBpZih0eXBlb2YgV2ViVlRUU2V0ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGNvbG9yID0gV2ViVlRUU2V0LmZvbnRTZXQ7XG4gICAgICAgIGJhY2tncm91bmRDb2xvciA9IFdlYlZUVFNldC5iYWNrZ3JvdW5kU2V0O1xuICAgICAgICB0ZXh0U2hhZG93ID0gV2ViVlRUU2V0LmVkZ2VTZXQ7XG4gICAgfVxuXG4gICAgaWYgKGlzSUU4KSB7XG4gICAgICAgIGNvbG9yID0gXCJyZ2IoMjU1LCAyNTUsIDI1NSlcIjtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yID0gXCJyZ2IoMCwgMCwgMClcIjtcbiAgICB9XG5cbiAgICBTdHlsZUJveC5jYWxsKHRoaXMpO1xuICAgIHRoaXMuY3VlID0gY3VlO1xuXG4gICAgLy8gUGFyc2Ugb3VyIGN1ZSdzIHRleHQgaW50byBhIERPTSB0cmVlIHJvb3RlZCBhdCAnY3VlRGl2Jy4gVGhpcyBkaXYgd2lsbFxuICAgIC8vIGhhdmUgaW5saW5lIHBvc2l0aW9uaW5nIGFuZCB3aWxsIGZ1bmN0aW9uIGFzIHRoZSBjdWUgYmFja2dyb3VuZCBib3guXG4gICAgdGhpcy5jdWVEaXYgPSBwYXJzZUNvbnRlbnQod2luZG93LCBjdWUudGV4dCk7XG4gICAgdmFyIHN0eWxlcyA9IHtcbiAgICAgICAgY29sb3I6IGNvbG9yLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGJhY2tncm91bmRDb2xvcixcbiAgICAgICAgdGV4dFNoYWRvdzogdGV4dFNoYWRvdyxcbiAgICAgICAgcG9zaXRpb246IFwicmVsYXRpdmVcIixcbiAgICAgICAgbGVmdDogMCxcbiAgICAgICAgcmlnaHQ6IDAsXG4gICAgICAgIHRvcDogMCxcbiAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICBkaXNwbGF5OiBcImlubGluZVwiXG4gICAgfTtcblxuICAgIGlmICghaXNJRTgpIHtcbiAgICAgICAgc3R5bGVzLndyaXRpbmdNb2RlID0gY3VlLnZlcnRpY2FsID09PSBcIlwiID8gXCJob3Jpem9udGFsLXRiXCJcbiAgICAgICAgICAgIDogY3VlLnZlcnRpY2FsID09PSBcImxyXCIgPyBcInZlcnRpY2FsLWxyXCJcbiAgICAgICAgICAgIDogXCJ2ZXJ0aWNhbC1ybFwiO1xuICAgICAgICBzdHlsZXMudW5pY29kZUJpZGkgPSBcInBsYWludGV4dFwiO1xuICAgIH1cbiAgICB0aGlzLmFwcGx5U3R5bGVzKHN0eWxlcywgdGhpcy5jdWVEaXYpO1xuXG4gICAgLy8gQ3JlYXRlIGFuIGFic29sdXRlbHkgcG9zaXRpb25lZCBkaXYgdGhhdCB3aWxsIGJlIHVzZWQgdG8gcG9zaXRpb24gdGhlIGN1ZVxuICAgIC8vIGRpdi4gTm90ZSwgYWxsIFdlYlZUVCBjdWUtc2V0dGluZyBhbGlnbm1lbnRzIGFyZSBlcXVpdmFsZW50IHRvIHRoZSBDU1NcbiAgICAvLyBtaXJyb3JzIG9mIHRoZW0gZXhjZXB0IFwibWlkZGxlXCIgd2hpY2ggaXMgXCJjZW50ZXJcIiBpbiBDU1MuXG4gICAgdGhpcy5kaXYgPSB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzdHlsZXMgPSB7XG4gICAgICAgIHRleHRBbGlnbjogY3VlLmFsaWduID09PSBcIm1pZGRsZVwiID8gXCJjZW50ZXJcIiA6IGN1ZS5hbGlnbixcbiAgICAgICAgZm9udDogc3R5bGVPcHRpb25zLmZvbnQsXG4gICAgICAgIHdoaXRlU3BhY2U6IFwicHJlLWxpbmVcIixcbiAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIlxuICAgIH07XG5cbiAgICBpZiAoIWlzSUU4KSB7XG4gICAgICAgIHN0eWxlcy5kaXJlY3Rpb24gPSBkZXRlcm1pbmVCaWRpKHRoaXMuY3VlRGl2KTtcbiAgICAgICAgc3R5bGVzLndyaXRpbmdNb2RlID0gY3VlLnZlcnRpY2FsID09PSBcIlwiID8gXCJob3Jpem9udGFsLXRiXCJcbiAgICAgICAgICAgIDogY3VlLnZlcnRpY2FsID09PSBcImxyXCIgPyBcInZlcnRpY2FsLWxyXCJcbiAgICAgICAgICAgIDogXCJ2ZXJ0aWNhbC1ybFwiLlxuICAgICAgICAgICAgc3R5bGVzdW5pY29kZUJpZGkgPSAgXCJwbGFpbnRleHRcIjtcbiAgICB9XG5cbiAgICB0aGlzLmFwcGx5U3R5bGVzKHN0eWxlcyk7XG5cbiAgICB0aGlzLmRpdi5hcHBlbmRDaGlsZCh0aGlzLmN1ZURpdik7XG5cbiAgICAvLyBDYWxjdWxhdGUgdGhlIGRpc3RhbmNlIGZyb20gdGhlIHJlZmVyZW5jZSBlZGdlIG9mIHRoZSB2aWV3cG9ydCB0byB0aGUgdGV4dFxuICAgIC8vIHBvc2l0aW9uIG9mIHRoZSBjdWUgYm94LiBUaGUgcmVmZXJlbmNlIGVkZ2Ugd2lsbCBiZSByZXNvbHZlZCBsYXRlciB3aGVuXG4gICAgLy8gdGhlIGJveCBvcmllbnRhdGlvbiBzdHlsZXMgYXJlIGFwcGxpZWQuXG4gICAgdmFyIHRleHRQb3MgPSAwO1xuICAgIHN3aXRjaCAoY3VlLnBvc2l0aW9uQWxpZ24pIHtcbiAgICAgICAgY2FzZSBcInN0YXJ0XCI6XG4gICAgICAgICAgICB0ZXh0UG9zID0gY3VlLnBvc2l0aW9uO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJtaWRkbGVcIjpcbiAgICAgICAgICAgIHRleHRQb3MgPSBjdWUucG9zaXRpb24gLSAoY3VlLnNpemUgLyAyKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICB0ZXh0UG9zID0gY3VlLnBvc2l0aW9uIC0gY3VlLnNpemU7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICAvLyBIb3Jpem9udGFsIGJveCBvcmllbnRhdGlvbjsgdGV4dFBvcyBpcyB0aGUgZGlzdGFuY2UgZnJvbSB0aGUgbGVmdCBlZGdlIG9mIHRoZVxuICAgIC8vIGFyZWEgdG8gdGhlIGxlZnQgZWRnZSBvZiB0aGUgYm94IGFuZCBjdWUuc2l6ZSBpcyB0aGUgZGlzdGFuY2UgZXh0ZW5kaW5nIHRvXG4gICAgLy8gdGhlIHJpZ2h0IGZyb20gdGhlcmUuXG4gICAgaWYgKGN1ZS52ZXJ0aWNhbCA9PT0gXCJcIikge1xuICAgICAgICB0aGlzLmFwcGx5U3R5bGVzKHtcbiAgICAgICAgICAgIGxlZnQ6ICB0aGlzLmZvcm1hdFN0eWxlKHRleHRQb3MsIFwiJVwiKSxcbiAgICAgICAgICAgIHdpZHRoOiB0aGlzLmZvcm1hdFN0eWxlKGN1ZS5zaXplLCBcIiVcIilcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIFZlcnRpY2FsIGJveCBvcmllbnRhdGlvbjsgdGV4dFBvcyBpcyB0aGUgZGlzdGFuY2UgZnJvbSB0aGUgdG9wIGVkZ2Ugb2YgdGhlXG4gICAgICAgIC8vIGFyZWEgdG8gdGhlIHRvcCBlZGdlIG9mIHRoZSBib3ggYW5kIGN1ZS5zaXplIGlzIHRoZSBoZWlnaHQgZXh0ZW5kaW5nXG4gICAgICAgIC8vIGRvd253YXJkcyBmcm9tIHRoZXJlLlxuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYXBwbHlTdHlsZXMoe1xuICAgICAgICAgICAgdG9wOiB0aGlzLmZvcm1hdFN0eWxlKHRleHRQb3MsIFwiJVwiKSxcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5mb3JtYXRTdHlsZShjdWUuc2l6ZSwgXCIlXCIpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMubW92ZSA9IGZ1bmN0aW9uKGJveCkge1xuICAgICAgICB0aGlzLmFwcGx5U3R5bGVzKHtcbiAgICAgICAgICAgIHRvcDogdGhpcy5mb3JtYXRTdHlsZShib3gudG9wLCBcInB4XCIpLFxuICAgICAgICAgICAgYm90dG9tOiB0aGlzLmZvcm1hdFN0eWxlKGJveC5ib3R0b20sIFwicHhcIiksXG4gICAgICAgICAgICBsZWZ0OiB0aGlzLmZvcm1hdFN0eWxlKGJveC5sZWZ0LCBcInB4XCIpLFxuICAgICAgICAgICAgcmlnaHQ6IHRoaXMuZm9ybWF0U3R5bGUoYm94LnJpZ2h0LCBcInB4XCIpLFxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLmZvcm1hdFN0eWxlKGJveC5oZWlnaHQsIFwicHhcIiksXG4gICAgICAgICAgICB3aWR0aDogdGhpcy5mb3JtYXRTdHlsZShib3gud2lkdGgsIFwicHhcIilcbiAgICAgICAgfSk7XG4gICAgfTtcbn1cbkN1ZVN0eWxlQm94LnByb3RvdHlwZSA9IF9vYmpDcmVhdGUoU3R5bGVCb3gucHJvdG90eXBlKTtcbkN1ZVN0eWxlQm94LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEN1ZVN0eWxlQm94O1xuXG4vLyBSZXByZXNlbnRzIHRoZSBjby1vcmRpbmF0ZXMgb2YgYW4gRWxlbWVudCBpbiBhIHdheSB0aGF0IHdlIGNhbiBlYXNpbHlcbi8vIGNvbXB1dGUgdGhpbmdzIHdpdGggc3VjaCBhcyBpZiBpdCBvdmVybGFwcyBvciBpbnRlcnNlY3RzIHdpdGggYW5vdGhlciBFbGVtZW50LlxuLy8gQ2FuIGluaXRpYWxpemUgaXQgd2l0aCBlaXRoZXIgYSBTdHlsZUJveCBvciBhbm90aGVyIEJveFBvc2l0aW9uLlxuZnVuY3Rpb24gQm94UG9zaXRpb24ob2JqKSB7XG4gICAgdmFyIGlzSUU4ID0gKHR5cGVvZiBuYXZpZ2F0b3IgIT09IFwidW5kZWZpbmVkXCIpICYmXG4gICAgICAgICgvTVNJRVxcczhcXC4wLykudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxuICAgIC8vIEVpdGhlciBhIEJveFBvc2l0aW9uIHdhcyBwYXNzZWQgaW4gYW5kIHdlIG5lZWQgdG8gY29weSBpdCwgb3IgYSBTdHlsZUJveFxuICAgIC8vIHdhcyBwYXNzZWQgaW4gYW5kIHdlIG5lZWQgdG8gY29weSB0aGUgcmVzdWx0cyBvZiAnZ2V0Qm91bmRpbmdDbGllbnRSZWN0J1xuICAgIC8vIGFzIHRoZSBvYmplY3QgcmV0dXJuZWQgaXMgcmVhZG9ubHkuIEFsbCBjby1vcmRpbmF0ZSB2YWx1ZXMgYXJlIGluIHJlZmVyZW5jZVxuICAgIC8vIHRvIHRoZSB2aWV3cG9ydCBvcmlnaW4gKHRvcCBsZWZ0KS5cbiAgICB2YXIgbGgsIGhlaWdodCwgd2lkdGgsIHRvcDtcbiAgICBpZiAob2JqLmRpdikge1xuICAgICAgICBoZWlnaHQgPSBvYmouZGl2Lm9mZnNldEhlaWdodDtcbiAgICAgICAgd2lkdGggPSBvYmouZGl2Lm9mZnNldFdpZHRoO1xuICAgICAgICB0b3AgPSBvYmouZGl2Lm9mZnNldFRvcDtcblxuICAgICAgICB2YXIgcmVjdHMgPSAocmVjdHMgPSBvYmouZGl2LmNoaWxkTm9kZXMpICYmIChyZWN0cyA9IHJlY3RzWzBdKSAmJlxuICAgICAgICAgICAgcmVjdHMuZ2V0Q2xpZW50UmVjdHMgJiYgcmVjdHMuZ2V0Q2xpZW50UmVjdHMoKTtcbiAgICAgICAgb2JqID0gb2JqLmRpdi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgLy8gSW4gY2VydGFpbiBjYXNlcyB0aGUgb3V0dGVyIGRpdiB3aWxsIGJlIHNsaWdodGx5IGxhcmdlciB0aGVuIHRoZSBzdW0gb2ZcbiAgICAgICAgLy8gdGhlIGlubmVyIGRpdidzIGxpbmVzLiBUaGlzIGNvdWxkIGJlIGR1ZSB0byBib2xkIHRleHQsIGV0Yywgb24gc29tZSBwbGF0Zm9ybXMuXG4gICAgICAgIC8vIEluIHRoaXMgY2FzZSB3ZSBzaG91bGQgZ2V0IHRoZSBhdmVyYWdlIGxpbmUgaGVpZ2h0IGFuZCB1c2UgdGhhdC4gVGhpcyB3aWxsXG4gICAgICAgIC8vIHJlc3VsdCBpbiB0aGUgZGVzaXJlZCBiZWhhdmlvdXIuXG4gICAgICAgIGxoID0gcmVjdHMgPyBNYXRoLm1heCgocmVjdHNbMF0gJiYgcmVjdHNbMF0uaGVpZ2h0KSB8fCAwLCBvYmouaGVpZ2h0IC8gcmVjdHMubGVuZ3RoKVxuICAgICAgICAgICAgOiAwO1xuXG4gICAgfVxuICAgIHRoaXMubGVmdCA9IG9iai5sZWZ0O1xuICAgIHRoaXMucmlnaHQgPSBvYmoucmlnaHQ7XG4gICAgdGhpcy50b3AgPSBvYmoudG9wIHx8IHRvcDtcbiAgICB0aGlzLmhlaWdodCA9IG9iai5oZWlnaHQgfHwgaGVpZ2h0O1xuICAgIHRoaXMuYm90dG9tID0gb2JqLmJvdHRvbSB8fCAodG9wICsgKG9iai5oZWlnaHQgfHwgaGVpZ2h0KSk7XG4gICAgdGhpcy53aWR0aCA9IG9iai53aWR0aCB8fCB3aWR0aDtcbiAgICB0aGlzLmxpbmVIZWlnaHQgPSBsaCAhPT0gdW5kZWZpbmVkID8gbGggOiBvYmoubGluZUhlaWdodDtcblxuICAgIGlmIChpc0lFOCAmJiAhdGhpcy5saW5lSGVpZ2h0KSB7XG4gICAgICAgIHRoaXMubGluZUhlaWdodCA9IDEzO1xuICAgIH1cbn1cblxuLy8gTW92ZSB0aGUgYm94IGFsb25nIGEgcGFydGljdWxhciBheGlzLiBPcHRpb25hbGx5IHBhc3MgaW4gYW4gYW1vdW50IHRvIG1vdmVcbi8vIHRoZSBib3guIElmIG5vIGFtb3VudCBpcyBwYXNzZWQgdGhlbiB0aGUgZGVmYXVsdCBpcyB0aGUgbGluZSBoZWlnaHQgb2YgdGhlXG4vLyBib3guXG5Cb3hQb3NpdGlvbi5wcm90b3R5cGUubW92ZSA9IGZ1bmN0aW9uKGF4aXMsIHRvTW92ZSkge1xuICAgIHRvTW92ZSA9IHRvTW92ZSAhPT0gdW5kZWZpbmVkID8gdG9Nb3ZlIDogdGhpcy5saW5lSGVpZ2h0O1xuICAgIHN3aXRjaCAoYXhpcykge1xuICAgICAgICBjYXNlIFwiK3hcIjpcbiAgICAgICAgICAgIHRoaXMubGVmdCArPSB0b01vdmU7XG4gICAgICAgICAgICB0aGlzLnJpZ2h0ICs9IHRvTW92ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiLXhcIjpcbiAgICAgICAgICAgIHRoaXMubGVmdCAtPSB0b01vdmU7XG4gICAgICAgICAgICB0aGlzLnJpZ2h0IC09IHRvTW92ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiK3lcIjpcbiAgICAgICAgICAgIHRoaXMudG9wICs9IHRvTW92ZTtcbiAgICAgICAgICAgIHRoaXMuYm90dG9tICs9IHRvTW92ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiLXlcIjpcbiAgICAgICAgICAgIHRoaXMudG9wIC09IHRvTW92ZTtcbiAgICAgICAgICAgIHRoaXMuYm90dG9tIC09IHRvTW92ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbn07XG5cbi8vIENoZWNrIGlmIHRoaXMgYm94IG92ZXJsYXBzIGFub3RoZXIgYm94LCBiMi5cbkJveFBvc2l0aW9uLnByb3RvdHlwZS5vdmVybGFwcyA9IGZ1bmN0aW9uKGIyKSB7XG4gICAgcmV0dXJuIHRoaXMubGVmdCA8IGIyLnJpZ2h0ICYmXG4gICAgICAgIHRoaXMucmlnaHQgPiBiMi5sZWZ0ICYmXG4gICAgICAgIHRoaXMudG9wIDwgYjIuYm90dG9tICYmXG4gICAgICAgIHRoaXMuYm90dG9tID4gYjIudG9wO1xufTtcblxuLy8gQ2hlY2sgaWYgdGhpcyBib3ggb3ZlcmxhcHMgYW55IG90aGVyIGJveGVzIGluIGJveGVzLlxuQm94UG9zaXRpb24ucHJvdG90eXBlLm92ZXJsYXBzQW55ID0gZnVuY3Rpb24oYm94ZXMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJveGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXBzKGJveGVzW2ldKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcblxuLy8gQ2hlY2sgaWYgdGhpcyBib3ggaXMgd2l0aGluIGFub3RoZXIgYm94LlxuQm94UG9zaXRpb24ucHJvdG90eXBlLndpdGhpbiA9IGZ1bmN0aW9uKGNvbnRhaW5lcikge1xuICAgIHJldHVybiB0aGlzLnRvcCA+PSBjb250YWluZXIudG9wICYmXG4gICAgICAgIHRoaXMuYm90dG9tIDw9IGNvbnRhaW5lci5ib3R0b20gJiZcbiAgICAgICAgdGhpcy5sZWZ0ID49IGNvbnRhaW5lci5sZWZ0ICYmXG4gICAgICAgIHRoaXMucmlnaHQgPD0gY29udGFpbmVyLnJpZ2h0O1xufTtcblxuLy8gQ2hlY2sgaWYgdGhpcyBib3ggaXMgZW50aXJlbHkgd2l0aGluIHRoZSBjb250YWluZXIgb3IgaXQgaXMgb3ZlcmxhcHBpbmdcbi8vIG9uIHRoZSBlZGdlIG9wcG9zaXRlIG9mIHRoZSBheGlzIGRpcmVjdGlvbiBwYXNzZWQuIEZvciBleGFtcGxlLCBpZiBcIit4XCIgaXNcbi8vIHBhc3NlZCBhbmQgdGhlIGJveCBpcyBvdmVybGFwcGluZyBvbiB0aGUgbGVmdCBlZGdlIG9mIHRoZSBjb250YWluZXIsIHRoZW5cbi8vIHJldHVybiB0cnVlLlxuQm94UG9zaXRpb24ucHJvdG90eXBlLm92ZXJsYXBzT3Bwb3NpdGVBeGlzID0gZnVuY3Rpb24oY29udGFpbmVyLCBheGlzKSB7XG4gICAgc3dpdGNoIChheGlzKSB7XG4gICAgICAgIGNhc2UgXCIreFwiOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGVmdCA8IGNvbnRhaW5lci5sZWZ0O1xuICAgICAgICBjYXNlIFwiLXhcIjpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJpZ2h0ID4gY29udGFpbmVyLnJpZ2h0O1xuICAgICAgICBjYXNlIFwiK3lcIjpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRvcCA8IGNvbnRhaW5lci50b3A7XG4gICAgICAgIGNhc2UgXCIteVwiOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYm90dG9tID4gY29udGFpbmVyLmJvdHRvbTtcbiAgICB9XG59O1xuXG4vLyBGaW5kIHRoZSBwZXJjZW50YWdlIG9mIHRoZSBhcmVhIHRoYXQgdGhpcyBib3ggaXMgb3ZlcmxhcHBpbmcgd2l0aCBhbm90aGVyXG4vLyBib3guXG5Cb3hQb3NpdGlvbi5wcm90b3R5cGUuaW50ZXJzZWN0UGVyY2VudGFnZSA9IGZ1bmN0aW9uKGIyKSB7XG4gICAgdmFyIHggPSBNYXRoLm1heCgwLCBNYXRoLm1pbih0aGlzLnJpZ2h0LCBiMi5yaWdodCkgLSBNYXRoLm1heCh0aGlzLmxlZnQsIGIyLmxlZnQpKSxcbiAgICAgICAgeSA9IE1hdGgubWF4KDAsIE1hdGgubWluKHRoaXMuYm90dG9tLCBiMi5ib3R0b20pIC0gTWF0aC5tYXgodGhpcy50b3AsIGIyLnRvcCkpLFxuICAgICAgICBpbnRlcnNlY3RBcmVhID0geCAqIHk7XG4gICAgcmV0dXJuIGludGVyc2VjdEFyZWEgLyAodGhpcy5oZWlnaHQgKiB0aGlzLndpZHRoKTtcbn07XG5cbi8vIENvbnZlcnQgdGhlIHBvc2l0aW9ucyBmcm9tIHRoaXMgYm94IHRvIENTUyBjb21wYXRpYmxlIHBvc2l0aW9ucyB1c2luZ1xuLy8gdGhlIHJlZmVyZW5jZSBjb250YWluZXIncyBwb3NpdGlvbnMuIFRoaXMgaGFzIHRvIGJlIGRvbmUgYmVjYXVzZSB0aGlzXG4vLyBib3gncyBwb3NpdGlvbnMgYXJlIGluIHJlZmVyZW5jZSB0byB0aGUgdmlld3BvcnQgb3JpZ2luLCB3aGVyZWFzLCBDU1Ncbi8vIHZhbHVlcyBhcmUgaW4gcmVmZXJlY25lIHRvIHRoZWlyIHJlc3BlY3RpdmUgZWRnZXMuXG5Cb3hQb3NpdGlvbi5wcm90b3R5cGUudG9DU1NDb21wYXRWYWx1ZXMgPSBmdW5jdGlvbihyZWZlcmVuY2UpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0b3A6IHRoaXMudG9wIC0gcmVmZXJlbmNlLnRvcCxcbiAgICAgICAgYm90dG9tOiByZWZlcmVuY2UuYm90dG9tIC0gdGhpcy5ib3R0b20sXG4gICAgICAgIGxlZnQ6IHRoaXMubGVmdCAtIHJlZmVyZW5jZS5sZWZ0LFxuICAgICAgICByaWdodDogcmVmZXJlbmNlLnJpZ2h0IC0gdGhpcy5yaWdodCxcbiAgICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCxcbiAgICAgICAgd2lkdGg6IHRoaXMud2lkdGhcbiAgICB9O1xufTtcblxuLy8gR2V0IGFuIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgdGhlIGJveCdzIHBvc2l0aW9uIHdpdGhvdXQgYW55dGhpbmcgZXh0cmEuXG4vLyBDYW4gcGFzcyBhIFN0eWxlQm94LCBIVE1MRWxlbWVudCwgb3IgYW5vdGhlciBCb3hQb3NpdG9uLlxuQm94UG9zaXRpb24uZ2V0U2ltcGxlQm94UG9zaXRpb24gPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIgaGVpZ2h0ID0gb2JqLmRpdiA/IG9iai5kaXYub2Zmc2V0SGVpZ2h0IDogb2JqLnRhZ05hbWUgPyBvYmoub2Zmc2V0SGVpZ2h0IDogMDtcbiAgICB2YXIgd2lkdGggPSBvYmouZGl2ID8gb2JqLmRpdi5vZmZzZXRXaWR0aCA6IG9iai50YWdOYW1lID8gb2JqLm9mZnNldFdpZHRoIDogMDtcbiAgICB2YXIgdG9wID0gb2JqLmRpdiA/IG9iai5kaXYub2Zmc2V0VG9wIDogb2JqLnRhZ05hbWUgPyBvYmoub2Zmc2V0VG9wIDogMDtcblxuICAgIG9iaiA9IG9iai5kaXYgPyBvYmouZGl2LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpIDpcbiAgICAgICAgb2JqLnRhZ05hbWUgPyBvYmouZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkgOiBvYmo7XG4gICAgdmFyIHJldCA9IHtcbiAgICAgICAgbGVmdDogb2JqLmxlZnQsXG4gICAgICAgIHJpZ2h0OiBvYmoucmlnaHQsXG4gICAgICAgIHRvcDogb2JqLnRvcCB8fCB0b3AsXG4gICAgICAgIGhlaWdodDogb2JqLmhlaWdodCB8fCBoZWlnaHQsXG4gICAgICAgIGJvdHRvbTogb2JqLmJvdHRvbSB8fCAodG9wICsgKG9iai5oZWlnaHQgfHwgaGVpZ2h0KSksXG4gICAgICAgIHdpZHRoOiBvYmoud2lkdGggfHwgd2lkdGhcbiAgICB9O1xuICAgIHJldHVybiByZXQ7XG59O1xuXG4vLyBNb3ZlIGEgU3R5bGVCb3ggdG8gaXRzIHNwZWNpZmllZCwgb3IgbmV4dCBiZXN0LCBwb3NpdGlvbi4gVGhlIGNvbnRhaW5lckJveFxuLy8gaXMgdGhlIGJveCB0aGF0IGNvbnRhaW5zIHRoZSBTdHlsZUJveCwgc3VjaCBhcyBhIGRpdi4gYm94UG9zaXRpb25zIGFyZVxuLy8gYSBsaXN0IG9mIG90aGVyIGJveGVzIHRoYXQgdGhlIHN0eWxlQm94IGNhbid0IG92ZXJsYXAgd2l0aC5cbmZ1bmN0aW9uIG1vdmVCb3hUb0xpbmVQb3NpdGlvbih3aW5kb3csIHN0eWxlQm94LCBjb250YWluZXJCb3gsIGJveFBvc2l0aW9ucykge1xuXG4gICAgLy8gRmluZCB0aGUgYmVzdCBwb3NpdGlvbiBmb3IgYSBjdWUgYm94LCBiLCBvbiB0aGUgdmlkZW8uIFRoZSBheGlzIHBhcmFtZXRlclxuICAgIC8vIGlzIGEgbGlzdCBvZiBheGlzLCB0aGUgb3JkZXIgb2Ygd2hpY2gsIGl0IHdpbGwgbW92ZSB0aGUgYm94IGFsb25nLiBGb3IgZXhhbXBsZTpcbiAgICAvLyBQYXNzaW5nIFtcIit4XCIsIFwiLXhcIl0gd2lsbCBtb3ZlIHRoZSBib3ggZmlyc3QgYWxvbmcgdGhlIHggYXhpcyBpbiB0aGUgcG9zaXRpdmVcbiAgICAvLyBkaXJlY3Rpb24uIElmIGl0IGRvZXNuJ3QgZmluZCBhIGdvb2QgcG9zaXRpb24gZm9yIGl0IHRoZXJlIGl0IHdpbGwgdGhlbiBtb3ZlXG4gICAgLy8gaXQgYWxvbmcgdGhlIHggYXhpcyBpbiB0aGUgbmVnYXRpdmUgZGlyZWN0aW9uLlxuICAgIGZ1bmN0aW9uIGZpbmRCZXN0UG9zaXRpb24oYiwgYXhpcykge1xuICAgICAgICB2YXIgYmVzdFBvc2l0aW9uLFxuICAgICAgICAgICAgc3BlY2lmaWVkUG9zaXRpb24gPSBuZXcgQm94UG9zaXRpb24oYiksXG4gICAgICAgICAgICBwZXJjZW50YWdlID0gMTsgLy8gSGlnaGVzdCBwb3NzaWJsZSBzbyB0aGUgZmlyc3QgdGhpbmcgd2UgZ2V0IGlzIGJldHRlci5cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGF4aXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHdoaWxlIChiLm92ZXJsYXBzT3Bwb3NpdGVBeGlzKGNvbnRhaW5lckJveCwgYXhpc1tpXSkgfHxcbiAgICAgICAgICAgIChiLndpdGhpbihjb250YWluZXJCb3gpICYmIGIub3ZlcmxhcHNBbnkoYm94UG9zaXRpb25zKSkpIHtcbiAgICAgICAgICAgICAgICBiLm1vdmUoYXhpc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBXZSBmb3VuZCBhIHNwb3Qgd2hlcmUgd2UgYXJlbid0IG92ZXJsYXBwaW5nIGFueXRoaW5nLiBUaGlzIGlzIG91clxuICAgICAgICAgICAgLy8gYmVzdCBwb3NpdGlvbi5cbiAgICAgICAgICAgIGlmIChiLndpdGhpbihjb250YWluZXJCb3gpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgcCA9IGIuaW50ZXJzZWN0UGVyY2VudGFnZShjb250YWluZXJCb3gpO1xuICAgICAgICAgICAgLy8gSWYgd2UncmUgb3V0c2lkZSB0aGUgY29udGFpbmVyIGJveCBsZXNzIHRoZW4gd2Ugd2VyZSBvbiBvdXIgbGFzdCB0cnlcbiAgICAgICAgICAgIC8vIHRoZW4gcmVtZW1iZXIgdGhpcyBwb3NpdGlvbiBhcyB0aGUgYmVzdCBwb3NpdGlvbi5cbiAgICAgICAgICAgIGlmIChwZXJjZW50YWdlID4gcCkge1xuICAgICAgICAgICAgICAgIGJlc3RQb3NpdGlvbiA9IG5ldyBCb3hQb3NpdGlvbihiKTtcbiAgICAgICAgICAgICAgICBwZXJjZW50YWdlID0gcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFJlc2V0IHRoZSBib3ggcG9zaXRpb24gdG8gdGhlIHNwZWNpZmllZCBwb3NpdGlvbi5cbiAgICAgICAgICAgIGIgPSBuZXcgQm94UG9zaXRpb24oc3BlY2lmaWVkUG9zaXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBiZXN0UG9zaXRpb24gfHwgc3BlY2lmaWVkUG9zaXRpb247XG4gICAgfVxuXG4gICAgdmFyIGJveFBvc2l0aW9uID0gbmV3IEJveFBvc2l0aW9uKHN0eWxlQm94KSxcbiAgICAgICAgY3VlID0gc3R5bGVCb3guY3VlLFxuICAgICAgICBsaW5lUG9zID0gY29tcHV0ZUxpbmVQb3MoY3VlKSxcbiAgICAgICAgYXhpcyA9IFtdO1xuXG4gICAgLy8gSWYgd2UgaGF2ZSBhIGxpbmUgbnVtYmVyIHRvIGFsaWduIHRoZSBjdWUgdG8uXG4gICAgaWYgKGN1ZS5zbmFwVG9MaW5lcykge1xuICAgICAgICB2YXIgc2l6ZTtcbiAgICAgICAgc3dpdGNoIChjdWUudmVydGljYWwpIHtcbiAgICAgICAgICAgIGNhc2UgXCJcIjpcbiAgICAgICAgICAgICAgICBheGlzID0gWyBcIit5XCIsIFwiLXlcIiBdO1xuICAgICAgICAgICAgICAgIHNpemUgPSBcImhlaWdodFwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInJsXCI6XG4gICAgICAgICAgICAgICAgYXhpcyA9IFsgXCIreFwiLCBcIi14XCIgXTtcbiAgICAgICAgICAgICAgICBzaXplID0gXCJ3aWR0aFwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImxyXCI6XG4gICAgICAgICAgICAgICAgYXhpcyA9IFsgXCIteFwiLCBcIit4XCIgXTtcbiAgICAgICAgICAgICAgICBzaXplID0gXCJ3aWR0aFwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHN0ZXAgPSBib3hQb3NpdGlvbi5saW5lSGVpZ2h0LFxuICAgICAgICAgICAgcG9zaXRpb24gPSBzdGVwICogTWF0aC5yb3VuZChsaW5lUG9zKSxcbiAgICAgICAgICAgIG1heFBvc2l0aW9uID0gY29udGFpbmVyQm94W3NpemVdICsgc3RlcCxcbiAgICAgICAgICAgIGluaXRpYWxBeGlzID0gYXhpc1swXTtcblxuICAgICAgICAvLyBJZiB0aGUgc3BlY2lmaWVkIGludGlhbCBwb3NpdGlvbiBpcyBncmVhdGVyIHRoZW4gdGhlIG1heCBwb3NpdGlvbiB0aGVuXG4gICAgICAgIC8vIGNsYW1wIHRoZSBib3ggdG8gdGhlIGFtb3VudCBvZiBzdGVwcyBpdCB3b3VsZCB0YWtlIGZvciB0aGUgYm94IHRvXG4gICAgICAgIC8vIHJlYWNoIHRoZSBtYXggcG9zaXRpb24uXG4gICAgICAgIGlmIChNYXRoLmFicyhwb3NpdGlvbikgPiBtYXhQb3NpdGlvbikge1xuICAgICAgICAgICAgcG9zaXRpb24gPSBwb3NpdGlvbiA8IDAgPyAtMSA6IDE7XG4gICAgICAgICAgICBwb3NpdGlvbiAqPSBNYXRoLmNlaWwobWF4UG9zaXRpb24gLyBzdGVwKSAqIHN0ZXA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBjb21wdXRlZCBsaW5lIHBvc2l0aW9uIHJldHVybnMgbmVnYXRpdmUgdGhlbiBsaW5lIG51bWJlcnMgYXJlXG4gICAgICAgIC8vIHJlbGF0aXZlIHRvIHRoZSBib3R0b20gb2YgdGhlIHZpZGVvIGluc3RlYWQgb2YgdGhlIHRvcC4gVGhlcmVmb3JlLCB3ZVxuICAgICAgICAvLyBuZWVkIHRvIGluY3JlYXNlIG91ciBpbml0aWFsIHBvc2l0aW9uIGJ5IHRoZSBsZW5ndGggb3Igd2lkdGggb2YgdGhlXG4gICAgICAgIC8vIHZpZGVvLCBkZXBlbmRpbmcgb24gdGhlIHdyaXRpbmcgZGlyZWN0aW9uLCBhbmQgcmV2ZXJzZSBvdXIgYXhpcyBkaXJlY3Rpb25zLlxuICAgICAgICBpZiAobGluZVBvcyA8IDApIHtcbiAgICAgICAgICAgIHBvc2l0aW9uICs9IGN1ZS52ZXJ0aWNhbCA9PT0gXCJcIiA/IGNvbnRhaW5lckJveC5oZWlnaHQgOiBjb250YWluZXJCb3gud2lkdGg7XG4gICAgICAgICAgICBheGlzID0gYXhpcy5yZXZlcnNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBNb3ZlIHRoZSBib3ggdG8gdGhlIHNwZWNpZmllZCBwb3NpdGlvbi4gVGhpcyBtYXkgbm90IGJlIGl0cyBiZXN0XG4gICAgICAgIC8vIHBvc2l0aW9uLlxuICAgICAgICBib3hQb3NpdGlvbi5tb3ZlKGluaXRpYWxBeGlzLCBwb3NpdGlvbik7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBJZiB3ZSBoYXZlIGEgcGVyY2VudGFnZSBsaW5lIHZhbHVlIGZvciB0aGUgY3VlLlxuICAgICAgICB2YXIgY2FsY3VsYXRlZFBlcmNlbnRhZ2UgPSAoYm94UG9zaXRpb24ubGluZUhlaWdodCAvIGNvbnRhaW5lckJveC5oZWlnaHQpICogMTAwO1xuXG4gICAgICAgIHN3aXRjaCAoY3VlLmxpbmVBbGlnbikge1xuICAgICAgICAgICAgY2FzZSBcIm1pZGRsZVwiOlxuICAgICAgICAgICAgICAgIGxpbmVQb3MgLT0gKGNhbGN1bGF0ZWRQZXJjZW50YWdlIC8gMik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgbGluZVBvcyAtPSBjYWxjdWxhdGVkUGVyY2VudGFnZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFwcGx5IGluaXRpYWwgbGluZSBwb3NpdGlvbiB0byB0aGUgY3VlIGJveC5cbiAgICAgICAgc3dpdGNoIChjdWUudmVydGljYWwpIHtcbiAgICAgICAgICAgIGNhc2UgXCJcIjpcbiAgICAgICAgICAgICAgICBzdHlsZUJveC5hcHBseVN0eWxlcyh7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogc3R5bGVCb3guZm9ybWF0U3R5bGUobGluZVBvcywgXCIlXCIpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwicmxcIjpcbiAgICAgICAgICAgICAgICBzdHlsZUJveC5hcHBseVN0eWxlcyh7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IHN0eWxlQm94LmZvcm1hdFN0eWxlKGxpbmVQb3MsIFwiJVwiKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImxyXCI6XG4gICAgICAgICAgICAgICAgc3R5bGVCb3guYXBwbHlTdHlsZXMoe1xuICAgICAgICAgICAgICAgICAgICByaWdodDogc3R5bGVCb3guZm9ybWF0U3R5bGUobGluZVBvcywgXCIlXCIpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBheGlzID0gWyBcIit5XCIsIFwiLXhcIiwgXCIreFwiLCBcIi15XCIgXTtcblxuICAgICAgICAvLyBHZXQgdGhlIGJveCBwb3NpdGlvbiBhZ2FpbiBhZnRlciB3ZSd2ZSBhcHBsaWVkIHRoZSBzcGVjaWZpZWQgcG9zaXRpb25pbmdcbiAgICAgICAgLy8gdG8gaXQuXG4gICAgICAgIGJveFBvc2l0aW9uID0gbmV3IEJveFBvc2l0aW9uKHN0eWxlQm94KTtcbiAgICB9XG5cbiAgICB2YXIgYmVzdFBvc2l0aW9uID0gZmluZEJlc3RQb3NpdGlvbihib3hQb3NpdGlvbiwgYXhpcyk7XG4gICAgc3R5bGVCb3gubW92ZShiZXN0UG9zaXRpb24udG9DU1NDb21wYXRWYWx1ZXMoY29udGFpbmVyQm94KSk7XG59XG5cbi8qZnVuY3Rpb24gV2ViVlRUKCkge1xuIC8vIE5vdGhpbmdcbiB9Ki9cblxuLy8gSGVscGVyIHRvIGFsbG93IHN0cmluZ3MgdG8gYmUgZGVjb2RlZCBpbnN0ZWFkIG9mIHRoZSBkZWZhdWx0IGJpbmFyeSB1dGY4IGRhdGEuXG5XZWJWVFQuU3RyaW5nRGVjb2RlciA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGRlY29kZTogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFcnJvciAtIGV4cGVjdGVkIHN0cmluZyBkYXRhLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoZW5jb2RlVVJJQ29tcG9uZW50KGRhdGEpKTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuXG5XZWJWVFQuY29udmVydEN1ZVRvRE9NVHJlZSA9IGZ1bmN0aW9uKHdpbmRvdywgY3VldGV4dCkge1xuICAgIGlmICghd2luZG93IHx8ICFjdWV0ZXh0KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gcGFyc2VDb250ZW50KHdpbmRvdywgY3VldGV4dCk7XG59O1xuXG52YXIgRk9OVF9TSVpFX1BFUkNFTlQgPSAwLjA1O1xudmFyIEZPTlRfU1RZTEUgPSBcInNhbnMtc2VyaWZcIjtcbnZhciBDVUVfQkFDS0dST1VORF9QQURESU5HID0gXCIxLjUlXCI7XG5cbi8vIFJ1bnMgdGhlIHByb2Nlc3NpbmcgbW9kZWwgb3ZlciB0aGUgY3VlcyBhbmQgcmVnaW9ucyBwYXNzZWQgdG8gaXQuXG4vLyBAcGFyYW0gb3ZlcmxheSBBIGJsb2NrIGxldmVsIGVsZW1lbnQgKHVzdWFsbHkgYSBkaXYpIHRoYXQgdGhlIGNvbXB1dGVkIGN1ZXNcbi8vICAgICAgICAgICAgICAgIGFuZCByZWdpb25zIHdpbGwgYmUgcGxhY2VkIGludG8uXG5XZWJWVFQucHJvY2Vzc0N1ZXMgPSBmdW5jdGlvbih3aW5kb3csIGN1ZXMsIG92ZXJsYXkpIHtcbiAgICBpZiAoIXdpbmRvdyB8fCAhY3VlcyB8fCAhb3ZlcmxheSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBSZW1vdmUgYWxsIHByZXZpb3VzIGNoaWxkcmVuLlxuICAgIHdoaWxlIChvdmVybGF5LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgb3ZlcmxheS5yZW1vdmVDaGlsZChvdmVybGF5LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHZhciBwYWRkZWRPdmVybGF5ID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcGFkZGVkT3ZlcmxheS5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICBwYWRkZWRPdmVybGF5LnN0eWxlLmxlZnQgPSBcIjBcIjtcbiAgICBwYWRkZWRPdmVybGF5LnN0eWxlLnJpZ2h0ID0gXCIwXCI7XG4gICAgcGFkZGVkT3ZlcmxheS5zdHlsZS50b3AgPSBcIjBcIjtcbiAgICBwYWRkZWRPdmVybGF5LnN0eWxlLmJvdHRvbSA9IFwiMFwiO1xuICAgIHBhZGRlZE92ZXJsYXkuc3R5bGUubWFyZ2luID0gQ1VFX0JBQ0tHUk9VTkRfUEFERElORztcbiAgICBvdmVybGF5LmFwcGVuZENoaWxkKHBhZGRlZE92ZXJsYXkpO1xuXG4gICAgLy8gRGV0ZXJtaW5lIGlmIHdlIG5lZWQgdG8gY29tcHV0ZSB0aGUgZGlzcGxheSBzdGF0ZXMgb2YgdGhlIGN1ZXMuIFRoaXMgY291bGRcbiAgICAvLyBiZSB0aGUgY2FzZSBpZiBhIGN1ZSdzIHN0YXRlIGhhcyBiZWVuIGNoYW5nZWQgc2luY2UgdGhlIGxhc3QgY29tcHV0YXRpb24gb3JcbiAgICAvLyBpZiBpdCBoYXMgbm90IGJlZW4gY29tcHV0ZWQgeWV0LlxuICAgIGZ1bmN0aW9uIHNob3VsZENvbXB1dGUoY3Vlcykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGN1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChjdWVzW2ldLmhhc0JlZW5SZXNldCB8fCAhY3Vlc1tpXS5kaXNwbGF5U3RhdGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gV2UgZG9uJ3QgbmVlZCB0byByZWNvbXB1dGUgdGhlIGN1ZXMnIGRpc3BsYXkgc3RhdGVzLiBKdXN0IHJldXNlIHRoZW0uXG4gICAgaWYgKCFzaG91bGRDb21wdXRlKGN1ZXMpKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY3Vlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcGFkZGVkT3ZlcmxheS5hcHBlbmRDaGlsZChjdWVzW2ldLmRpc3BsYXlTdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBib3hQb3NpdGlvbnMgPSBbXSxcbiAgICAgICAgY29udGFpbmVyQm94ID0gQm94UG9zaXRpb24uZ2V0U2ltcGxlQm94UG9zaXRpb24ocGFkZGVkT3ZlcmxheSksXG4gICAgICAgIGZvbnRTaXplID0gTWF0aC5yb3VuZChjb250YWluZXJCb3guaGVpZ2h0ICogRk9OVF9TSVpFX1BFUkNFTlQgKiAxMDApIC8gMTAwO1xuICAgIHZhciBzdHlsZU9wdGlvbnMgPSB7XG4gICAgICAgIGZvbnQ6IChmb250U2l6ZSAqIGZvbnRTY2FsZSkgKyBcInB4IFwiICsgRk9OVF9TVFlMRVxuICAgIH07XG5cbiAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzdHlsZUJveCwgY3VlO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY3Vlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY3VlID0gY3Vlc1tpXTtcblxuICAgICAgICAgICAgLy8gQ29tcHV0ZSB0aGUgaW50aWFsIHBvc2l0aW9uIGFuZCBzdHlsZXMgb2YgdGhlIGN1ZSBkaXYuXG4gICAgICAgICAgICBzdHlsZUJveCA9IG5ldyBDdWVTdHlsZUJveCh3aW5kb3csIGN1ZSwgc3R5bGVPcHRpb25zKTtcbiAgICAgICAgICAgIHBhZGRlZE92ZXJsYXkuYXBwZW5kQ2hpbGQoc3R5bGVCb3guZGl2KTtcblxuICAgICAgICAgICAgLy8gTW92ZSB0aGUgY3VlIGRpdiB0byBpdCdzIGNvcnJlY3QgbGluZSBwb3NpdGlvbi5cbiAgICAgICAgICAgIG1vdmVCb3hUb0xpbmVQb3NpdGlvbih3aW5kb3csIHN0eWxlQm94LCBjb250YWluZXJCb3gsIGJveFBvc2l0aW9ucyk7XG5cbiAgICAgICAgICAgIC8vIFJlbWVtYmVyIHRoZSBjb21wdXRlZCBkaXYgc28gdGhhdCB3ZSBkb24ndCBoYXZlIHRvIHJlY29tcHV0ZSBpdCBsYXRlclxuICAgICAgICAgICAgLy8gaWYgd2UgZG9uJ3QgaGF2ZSB0b28uXG4gICAgICAgICAgICBjdWUuZGlzcGxheVN0YXRlID0gc3R5bGVCb3guZGl2O1xuXG4gICAgICAgICAgICBib3hQb3NpdGlvbnMucHVzaChCb3hQb3NpdGlvbi5nZXRTaW1wbGVCb3hQb3NpdGlvbihzdHlsZUJveCkpO1xuICAgICAgICB9XG4gICAgfSkoKTtcbn07XG5cbldlYlZUVC5QYXJzZXIgPSBmdW5jdGlvbih3aW5kb3csIGRlY29kZXIpIHtcbiAgICB0aGlzLndpbmRvdyA9IHdpbmRvdztcbiAgICB0aGlzLnN0YXRlID0gXCJJTklUSUFMXCI7XG4gICAgdGhpcy5idWZmZXIgPSBcIlwiO1xuICAgIHRoaXMuZGVjb2RlciA9IGRlY29kZXIgfHwgbmV3IFRleHREZWNvZGVyKFwidXRmOFwiKTtcbiAgICB0aGlzLnJlZ2lvbkxpc3QgPSBbXTtcbn07XG5cbldlYlZUVC5QYXJzZXIucHJvdG90eXBlID0ge1xuICAgIC8vIElmIHRoZSBlcnJvciBpcyBhIFBhcnNpbmdFcnJvciB0aGVuIHJlcG9ydCBpdCB0byB0aGUgY29uc3VtZXIgaWZcbiAgICAvLyBwb3NzaWJsZS4gSWYgaXQncyBub3QgYSBQYXJzaW5nRXJyb3IgdGhlbiB0aHJvdyBpdCBsaWtlIG5vcm1hbC5cbiAgICByZXBvcnRPclRocm93RXJyb3I6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBQYXJzaW5nRXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMub25wYXJzaW5nZXJyb3IgJiYgdGhpcy5vbnBhcnNpbmdlcnJvcihlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHBhcnNlOiBmdW5jdGlvbiAoZGF0YSwgZmx1c2hpbmcpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAvLyBJZiB0aGVyZSBpcyBubyBkYXRhIHRoZW4gd2Ugd29uJ3QgZGVjb2RlIGl0LCBidXQgd2lsbCBqdXN0IHRyeSB0byBwYXJzZVxuICAgICAgICAvLyB3aGF0ZXZlciBpcyBpbiBidWZmZXIgYWxyZWFkeS4gVGhpcyBtYXkgb2NjdXIgaW4gY2lyY3Vtc3RhbmNlcywgZm9yXG4gICAgICAgIC8vIGV4YW1wbGUgd2hlbiBmbHVzaCgpIGlzIGNhbGxlZC5cbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIC8vIFRyeSB0byBkZWNvZGUgdGhlIGRhdGEgdGhhdCB3ZSByZWNlaXZlZC5cbiAgICAgICAgICAgIHNlbGYuYnVmZmVyICs9IHNlbGYuZGVjb2Rlci5kZWNvZGUoZGF0YSwge3N0cmVhbTogdHJ1ZX0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGNvbGxlY3ROZXh0TGluZSgpIHtcbiAgICAgICAgICAgIHZhciBidWZmZXIgPSBzZWxmLmJ1ZmZlcjtcbiAgICAgICAgICAgIHZhciBwb3MgPSAwO1xuICAgICAgICAgICAgd2hpbGUgKHBvcyA8IGJ1ZmZlci5sZW5ndGggJiYgYnVmZmVyW3Bvc10gIT09ICdcXHInICYmIGJ1ZmZlcltwb3NdICE9PSAnXFxuJykge1xuICAgICAgICAgICAgICAgICsrcG9zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGxpbmUgPSBidWZmZXIuc3Vic3RyKDAsIHBvcyk7XG4gICAgICAgICAgICAvLyBBZHZhbmNlIHRoZSBidWZmZXIgZWFybHkgaW4gY2FzZSB3ZSBmYWlsIGJlbG93LlxuICAgICAgICAgICAgaWYgKGJ1ZmZlcltwb3NdID09PSAnXFxyJykge1xuICAgICAgICAgICAgICAgICsrcG9zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGJ1ZmZlcltwb3NdID09PSAnXFxuJykge1xuICAgICAgICAgICAgICAgICsrcG9zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5idWZmZXIgPSBidWZmZXIuc3Vic3RyKHBvcyk7XG4gICAgICAgICAgICByZXR1cm4gbGluZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIDMuNCBXZWJWVFQgcmVnaW9uIGFuZCBXZWJWVFQgcmVnaW9uIHNldHRpbmdzIHN5bnRheFxuICAgICAgICBmdW5jdGlvbiBwYXJzZVJlZ2lvbihpbnB1dCkge1xuICAgICAgICAgICAgdmFyIHNldHRpbmdzID0gbmV3IFNldHRpbmdzKCk7XG5cbiAgICAgICAgICAgIHBhcnNlT3B0aW9ucyhpbnB1dCwgZnVuY3Rpb24gKGssIHYpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGspIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImlkXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5zZXQoaywgdik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIndpZHRoXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5wZXJjZW50KGssIHYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJsaW5lc1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuaW50ZWdlcihrLCB2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwicmVnaW9uYW5jaG9yXCI6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ2aWV3cG9ydGFuY2hvclwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHh5ID0gdi5zcGxpdCgnLCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHh5Lmxlbmd0aCAhPT0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UgaGF2ZSB0byBtYWtlIHN1cmUgYm90aCB4IGFuZCB5IHBhcnNlLCBzbyB1c2UgYSB0ZW1wb3JhcnlcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNldHRpbmdzIG9iamVjdCBoZXJlLlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFuY2hvciA9IG5ldyBTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5jaG9yLnBlcmNlbnQoXCJ4XCIsIHh5WzBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuY2hvci5wZXJjZW50KFwieVwiLCB4eVsxXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWFuY2hvci5oYXMoXCJ4XCIpIHx8ICFhbmNob3IuaGFzKFwieVwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3Muc2V0KGsgKyBcIlhcIiwgYW5jaG9yLmdldChcInhcIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3Muc2V0KGsgKyBcIllcIiwgYW5jaG9yLmdldChcInlcIikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJzY3JvbGxcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLmFsdChrLCB2LCBbXCJ1cFwiXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAvPS8sIC9cXHMvKTtcblxuICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSByZWdpb24sIHVzaW5nIGRlZmF1bHQgdmFsdWVzIGZvciBhbnkgdmFsdWVzIHRoYXQgd2VyZSBub3RcbiAgICAgICAgICAgIC8vIHNwZWNpZmllZC5cbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy5oYXMoXCJpZFwiKSkge1xuICAgICAgICAgICAgICAgIHZhciByZWdpb24gPSBuZXcgc2VsZi53aW5kb3cuVlRUUmVnaW9uKCk7XG4gICAgICAgICAgICAgICAgcmVnaW9uLndpZHRoID0gc2V0dGluZ3MuZ2V0KFwid2lkdGhcIiwgMTAwKTtcbiAgICAgICAgICAgICAgICByZWdpb24ubGluZXMgPSBzZXR0aW5ncy5nZXQoXCJsaW5lc1wiLCAzKTtcbiAgICAgICAgICAgICAgICByZWdpb24ucmVnaW9uQW5jaG9yWCA9IHNldHRpbmdzLmdldChcInJlZ2lvbmFuY2hvclhcIiwgMCk7XG4gICAgICAgICAgICAgICAgcmVnaW9uLnJlZ2lvbkFuY2hvclkgPSBzZXR0aW5ncy5nZXQoXCJyZWdpb25hbmNob3JZXCIsIDEwMCk7XG4gICAgICAgICAgICAgICAgcmVnaW9uLnZpZXdwb3J0QW5jaG9yWCA9IHNldHRpbmdzLmdldChcInZpZXdwb3J0YW5jaG9yWFwiLCAwKTtcbiAgICAgICAgICAgICAgICByZWdpb24udmlld3BvcnRBbmNob3JZID0gc2V0dGluZ3MuZ2V0KFwidmlld3BvcnRhbmNob3JZXCIsIDEwMCk7XG4gICAgICAgICAgICAgICAgcmVnaW9uLnNjcm9sbCA9IHNldHRpbmdzLmdldChcInNjcm9sbFwiLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAvLyBSZWdpc3RlciB0aGUgcmVnaW9uLlxuICAgICAgICAgICAgICAgIHNlbGYub25yZWdpb24gJiYgc2VsZi5vbnJlZ2lvbihyZWdpb24pO1xuICAgICAgICAgICAgICAgIC8vIFJlbWVtYmVyIHRoZSBWVFRSZWdpb24gZm9yIGxhdGVyIGluIGNhc2Ugd2UgcGFyc2UgYW55IFZUVEN1ZXMgdGhhdFxuICAgICAgICAgICAgICAgIC8vIHJlZmVyZW5jZSBpdC5cbiAgICAgICAgICAgICAgICBzZWxmLnJlZ2lvbkxpc3QucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBzZXR0aW5ncy5nZXQoXCJpZFwiKSxcbiAgICAgICAgICAgICAgICAgICAgcmVnaW9uOiByZWdpb25cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIDMuMiBXZWJWVFQgbWV0YWRhdGEgaGVhZGVyIHN5bnRheFxuICAgICAgICBmdW5jdGlvbiBwYXJzZUhlYWRlcihpbnB1dCkge1xuICAgICAgICAgICAgcGFyc2VPcHRpb25zKGlucHV0LCBmdW5jdGlvbiAoaywgdikge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoaykge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiUmVnaW9uXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAzLjMgV2ViVlRUIHJlZ2lvbiBtZXRhZGF0YSBoZWFkZXIgc3ludGF4XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZVJlZ2lvbih2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIC86Lyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyA1LjEgV2ViVlRUIGZpbGUgcGFyc2luZy5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciBsaW5lO1xuICAgICAgICAgICAgaWYgKHNlbGYuc3RhdGUgPT09IFwiSU5JVElBTFwiKSB7XG4gICAgICAgICAgICAgICAgLy8gV2UgY2FuJ3Qgc3RhcnQgcGFyc2luZyB1bnRpbCB3ZSBoYXZlIHRoZSBmaXJzdCBsaW5lLlxuICAgICAgICAgICAgICAgIGlmICghL1xcclxcbnxcXG4vLnRlc3Qoc2VsZi5idWZmZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxpbmUgPSBjb2xsZWN0TmV4dExpbmUoKTtcblxuICAgICAgICAgICAgICAgIHZhciBtID0gbGluZS5tYXRjaCgvXldFQlZUVChbIFxcdF0uKik/JC8pO1xuICAgICAgICAgICAgICAgIGlmICghbSB8fCAhbVswXSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2luZ0Vycm9yKFBhcnNpbmdFcnJvci5FcnJvcnMuQmFkU2lnbmF0dXJlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzZWxmLnN0YXRlID0gXCJIRUFERVJcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGFscmVhZHlDb2xsZWN0ZWRMaW5lID0gZmFsc2U7XG4gICAgICAgICAgICB3aGlsZSAoc2VsZi5idWZmZXIpIHtcbiAgICAgICAgICAgICAgICAvLyBXZSBjYW4ndCBwYXJzZSBhIGxpbmUgdW50aWwgd2UgaGF2ZSB0aGUgZnVsbCBsaW5lLlxuICAgICAgICAgICAgICAgIGlmICghL1xcclxcbnxcXG4vLnRlc3Qoc2VsZi5idWZmZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghYWxyZWFkeUNvbGxlY3RlZExpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IGNvbGxlY3ROZXh0TGluZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFscmVhZHlDb2xsZWN0ZWRMaW5lID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN3aXRjaCAoc2VsZi5zdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiSEVBREVSXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAxMy0xOCAtIEFsbG93IGEgaGVhZGVyIChtZXRhZGF0YSkgdW5kZXIgdGhlIFdFQlZUVCBsaW5lLlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKC86Ly50ZXN0KGxpbmUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VIZWFkZXIobGluZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQW4gZW1wdHkgbGluZSB0ZXJtaW5hdGVzIHRoZSBoZWFkZXIgYW5kIHN0YXJ0cyB0aGUgYm9keSAoY3VlcykuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zdGF0ZSA9IFwiSURcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiTk9URVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWdub3JlIE5PVEUgYmxvY2tzLlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zdGF0ZSA9IFwiSURcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiSURcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGZvciB0aGUgc3RhcnQgb2YgTk9URSBibG9ja3MuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoL15OT1RFKCR8WyBcXHRdKS8udGVzdChsaW5lKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc3RhdGUgPSBcIk5PVEVcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIDE5LTI5IC0gQWxsb3cgYW55IG51bWJlciBvZiBsaW5lIHRlcm1pbmF0b3JzLCB0aGVuIGluaXRpYWxpemUgbmV3IGN1ZSB2YWx1ZXMuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY3VlID0gbmV3IHNlbGYud2luZG93LlZUVEN1ZSgwLCAwLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc3RhdGUgPSBcIkNVRVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gMzAtMzkgLSBDaGVjayBpZiBzZWxmIGxpbmUgY29udGFpbnMgYW4gb3B0aW9uYWwgaWRlbnRpZmllciBvciB0aW1pbmcgZGF0YS5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsaW5lLmluZGV4T2YoXCItLT5cIikgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jdWUuaWQgPSBsaW5lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBQcm9jZXNzIGxpbmUgYXMgc3RhcnQgb2YgYSBjdWUuXG4gICAgICAgICAgICAgICAgICAgIC8qZmFsbHMgdGhyb3VnaCovXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJDVUVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIDQwIC0gQ29sbGVjdCBjdWUgdGltaW5ncyBhbmQgc2V0dGluZ3MuXG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlQ3VlKGxpbmUsIHNlbGYuY3VlLCBzZWxmLnJlZ2lvbkxpc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucmVwb3J0T3JUaHJvd0Vycm9yKGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEluIGNhc2Ugb2YgYW4gZXJyb3IgaWdub3JlIHJlc3Qgb2YgdGhlIGN1ZS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmN1ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zdGF0ZSA9IFwiQkFEQ1VFXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnN0YXRlID0gXCJDVUVURVhUXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIkNVRVRFWFRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBoYXNTdWJzdHJpbmcgPSBsaW5lLmluZGV4T2YoXCItLT5cIikgIT09IC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gMzQgLSBJZiB3ZSBoYXZlIGFuIGVtcHR5IGxpbmUgdGhlbiByZXBvcnQgdGhlIGN1ZS5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIDM1IC0gSWYgd2UgaGF2ZSB0aGUgc3BlY2lhbCBzdWJzdHJpbmcgJy0tPicgdGhlbiByZXBvcnQgdGhlIGN1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJ1dCBkbyBub3QgY29sbGVjdCB0aGUgbGluZSBhcyB3ZSBuZWVkIHRvIHByb2Nlc3MgdGhlIGN1cnJlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9uZSBhcyBhIG5ldyBjdWUuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWxpbmUgfHwgaGFzU3Vic3RyaW5nICYmIChhbHJlYWR5Q29sbGVjdGVkTGluZSA9IHRydWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UgYXJlIGRvbmUgcGFyc2luZyBzZWxmIGN1ZS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm9uY3VlICYmIHNlbGYub25jdWUoc2VsZi5jdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY3VlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnN0YXRlID0gXCJJRFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuY3VlLnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmN1ZS50ZXh0ICs9IFwiXFxuXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmN1ZS50ZXh0ICs9IGxpbmU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIkJBRENVRVwiOiAvLyBCQURDVUVcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIDU0LTYyIC0gQ29sbGVjdCBhbmQgZGlzY2FyZCB0aGUgcmVtYWluaW5nIGN1ZS5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbGluZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc3RhdGUgPSBcIklEXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgaWYgKCFmbHVzaGluZykge1xuICAgICAgICAgICAgICAgIC8v65WM65WM66GcICjtlZzquIcgdnR066GcIOy2lOyglSkgY3Vl6rCAIOuCqOyVhCDsnojripTssYTroZwgc2VsZi5mbHVzaCgp66W8IO2YuOy2nO2VtOyEnCBjdWXqsIAg7J6I6riwIOuVjOusuOyXkCDri6Tsi5wgc2VsZi5wYXJzZSgp66W8IO2DgOuKlCDqsr3smrDqsIAg7IOd6rmALlxuICAgICAgICAgICAgICAgIC8v7JmcIOydtOugh+qyjCDsp5zsl6wg7J6I64qU7KeAIOuqqOultOqyoOqzoCDsnbzri6gg7JWE656Y7JmAIOqwmeydgCDsvZTrk5zroZwg7JyE6riw66W8IOq3ueuzte2VnOuLpC5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5zdGF0ZSA9PT0gXCJDVUVURVhUXCIgJiYgc2VsZi5jdWUgJiYgc2VsZi5vbmN1ZSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm9uY3VlKHNlbGYuY3VlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VsZi5mbHVzaCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBzZWxmLnJlcG9ydE9yVGhyb3dFcnJvcihlKTtcbiAgICAgICAgICAgIC8vIElmIHdlIGFyZSBjdXJyZW50bHkgcGFyc2luZyBhIGN1ZSwgcmVwb3J0IHdoYXQgd2UgaGF2ZS5cbiAgICAgICAgICAgIGlmIChzZWxmLnN0YXRlID09PSBcIkNVRVRFWFRcIiAmJiBzZWxmLmN1ZSAmJiBzZWxmLm9uY3VlKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5vbmN1ZShzZWxmLmN1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmN1ZSA9IG51bGw7XG4gICAgICAgICAgICAvLyBFbnRlciBCQURXRUJWVFQgc3RhdGUgaWYgaGVhZGVyIHdhcyBub3QgcGFyc2VkIGNvcnJlY3RseSBvdGhlcndpc2VcbiAgICAgICAgICAgIC8vIGFub3RoZXIgZXhjZXB0aW9uIG9jY3VycmVkIHNvIGVudGVyIEJBRENVRSBzdGF0ZS5cbiAgICAgICAgICAgIHNlbGYuc3RhdGUgPSBzZWxmLnN0YXRlID09PSBcIklOSVRJQUxcIiA/IFwiQkFEV0VCVlRUXCIgOiBcIkJBRENVRVwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgZmx1c2g6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBGaW5pc2ggZGVjb2RpbmcgdGhlIHN0cmVhbS5cbiAgICAgICAgICAgIHNlbGYuYnVmZmVyICs9IHNlbGYuZGVjb2Rlci5kZWNvZGUoKTtcbiAgICAgICAgICAgIC8vIFN5bnRoZXNpemUgdGhlIGVuZCBvZiB0aGUgY3VycmVudCBjdWUgb3IgcmVnaW9uLlxuICAgICAgICAgICAgaWYgKHNlbGYuY3VlIHx8IHNlbGYuc3RhdGUgPT09IFwiSEVBREVSXCIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmJ1ZmZlciArPSBcIlxcblxcblwiO1xuICAgICAgICAgICAgICAgIHNlbGYucGFyc2UobnVsbCwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJZiB3ZSd2ZSBmbHVzaGVkLCBwYXJzZWQsIGFuZCB3ZSdyZSBzdGlsbCBvbiB0aGUgSU5JVElBTCBzdGF0ZSB0aGVuXG4gICAgICAgICAgICAvLyB0aGF0IG1lYW5zIHdlIGRvbid0IGhhdmUgZW5vdWdoIG9mIHRoZSBzdHJlYW0gdG8gcGFyc2UgdGhlIGZpcnN0XG4gICAgICAgICAgICAvLyBsaW5lLlxuICAgICAgICAgICAgaWYgKHNlbGYuc3RhdGUgPT09IFwiSU5JVElBTFwiKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNpbmdFcnJvcihQYXJzaW5nRXJyb3IuRXJyb3JzLkJhZFNpZ25hdHVyZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgICAgc2VsZi5yZXBvcnRPclRocm93RXJyb3IoZSk7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5vbmZsdXNoICYmIHNlbGYub25mbHVzaCgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59O1xuXG5cblxuXG5leHBvcnQgZGVmYXVsdCBXZWJWVFQ7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMyB2dHQuanMgQ29udHJpYnV0b3JzXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5sZXQgVlRUUmVnaW9uID0gXCJcIjtcblxudmFyIHNjcm9sbFNldHRpbmcgPSB7XG4gICAgXCJcIjogdHJ1ZSxcbiAgICBcInVwXCI6IHRydWVcbn07XG5cbmZ1bmN0aW9uIGZpbmRTY3JvbGxTZXR0aW5nKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciBzY3JvbGwgPSBzY3JvbGxTZXR0aW5nW3ZhbHVlLnRvTG93ZXJDYXNlKCldO1xuICAgIHJldHVybiBzY3JvbGwgPyB2YWx1ZS50b0xvd2VyQ2FzZSgpIDogZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGlzVmFsaWRQZXJjZW50VmFsdWUodmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiICYmICh2YWx1ZSA+PSAwICYmIHZhbHVlIDw9IDEwMCk7XG59XG5cbi8vIFZUVFJlZ2lvbiBzaGltIGh0dHA6Ly9kZXYudzMub3JnL2h0bWw1L3dlYnZ0dC8jdnR0cmVnaW9uLWludGVyZmFjZVxuVlRUUmVnaW9uID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIF93aWR0aCA9IDEwMDtcbiAgICB2YXIgX2xpbmVzID0gMztcbiAgICB2YXIgX3JlZ2lvbkFuY2hvclggPSAwO1xuICAgIHZhciBfcmVnaW9uQW5jaG9yWSA9IDEwMDtcbiAgICB2YXIgX3ZpZXdwb3J0QW5jaG9yWCA9IDA7XG4gICAgdmFyIF92aWV3cG9ydEFuY2hvclkgPSAxMDA7XG4gICAgdmFyIF9zY3JvbGwgPSBcIlwiO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcywge1xuICAgICAgICBcIndpZHRoXCI6IHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfd2lkdGg7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICghaXNWYWxpZFBlcmNlbnRWYWx1ZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiV2lkdGggbXVzdCBiZSBiZXR3ZWVuIDAgYW5kIDEwMC5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF93aWR0aCA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImxpbmVzXCI6IHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfbGluZXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkxpbmVzIG11c3QgYmUgc2V0IHRvIGEgbnVtYmVyLlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX2xpbmVzID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwicmVnaW9uQW5jaG9yWVwiOiB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3JlZ2lvbkFuY2hvclk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICghaXNWYWxpZFBlcmNlbnRWYWx1ZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUmVnaW9uQW5jaG9yWCBtdXN0IGJlIGJldHdlZW4gMCBhbmQgMTAwLlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3JlZ2lvbkFuY2hvclkgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJyZWdpb25BbmNob3JYXCI6IHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfcmVnaW9uQW5jaG9yWDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYoIWlzVmFsaWRQZXJjZW50VmFsdWUodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlJlZ2lvbkFuY2hvclkgbXVzdCBiZSBiZXR3ZWVuIDAgYW5kIDEwMC5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF9yZWdpb25BbmNob3JYID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwidmlld3BvcnRBbmNob3JZXCI6IHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdmlld3BvcnRBbmNob3JZO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzVmFsaWRQZXJjZW50VmFsdWUodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlZpZXdwb3J0QW5jaG9yWSBtdXN0IGJlIGJldHdlZW4gMCBhbmQgMTAwLlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3ZpZXdwb3J0QW5jaG9yWSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInZpZXdwb3J0QW5jaG9yWFwiOiB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3ZpZXdwb3J0QW5jaG9yWDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpc1ZhbGlkUGVyY2VudFZhbHVlKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJWaWV3cG9ydEFuY2hvclggbXVzdCBiZSBiZXR3ZWVuIDAgYW5kIDEwMC5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF92aWV3cG9ydEFuY2hvclggPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJzY3JvbGxcIjoge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9zY3JvbGw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHZhciBzZXR0aW5nID0gZmluZFNjcm9sbFNldHRpbmcodmFsdWUpO1xuICAgICAgICAgICAgICAgIC8vIEhhdmUgdG8gY2hlY2sgZm9yIGZhbHNlIGFzIGFuIGVtcHR5IHN0cmluZyBpcyBhIGxlZ2FsIHZhbHVlLlxuICAgICAgICAgICAgICAgIGlmIChzZXR0aW5nID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJBbiBpbnZhbGlkIG9yIGlsbGVnYWwgc3RyaW5nIHdhcyBzcGVjaWZpZWQuXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfc2Nyb2xsID0gc2V0dGluZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBWVFRSZWdpb247Il0sInNvdXJjZVJvb3QiOiIifQ==