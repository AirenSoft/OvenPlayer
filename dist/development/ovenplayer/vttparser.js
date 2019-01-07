/*! OvenPlayerv0.8.0 | (c)2019 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2NhcHRpb24vcGFyc2VyL1Z0dFBhcnNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvY2FwdGlvbnMvdnR0UmVnaW9uLmpzIl0sIm5hbWVzIjpbIldlYlZUVCIsIm1ha2VDb2xvclNldCIsImNvbG9yIiwib3BhY2l0eSIsInVuZGVmaW5lZCIsInBhcnNlSW50Iiwic3Vic3RyaW5nIiwiam9pbiIsIldlYlZUVFByZWZzIiwiZm9udFNjYWxlIiwib2JzZXJ2ZSIsInN1YmplY3QiLCJ0b3BpYyIsImRhdGEiLCJmb250Q29sb3IiLCJTZXJ2aWNlcyIsInByZWZzIiwiZ2V0Q2hhclByZWYiLCJmb250T3BhY2l0eSIsImdldEludFByZWYiLCJXZWJWVFRTZXQiLCJmb250U2V0IiwiYmFja2dyb3VuZENvbG9yIiwiYmFja2dyb3VuZE9wYWNpdHkiLCJiYWNrZ3JvdW5kU2V0IiwiZWRnZVR5cGVMaXN0IiwiZWRnZVR5cGUiLCJlZGdlQ29sb3IiLCJlZGdlU2V0IiwiZm9yRWFjaCIsInByZWYiLCJhZGRPYnNlcnZlciIsIl9vYmpDcmVhdGUiLCJPYmplY3QiLCJjcmVhdGUiLCJGIiwibyIsImFyZ3VtZW50cyIsImxlbmd0aCIsIkVycm9yIiwicHJvdG90eXBlIiwiUGFyc2luZ0Vycm9yIiwiZXJyb3JEYXRhIiwibWVzc2FnZSIsIm5hbWUiLCJjb2RlIiwiY29uc3RydWN0b3IiLCJFcnJvcnMiLCJCYWRTaWduYXR1cmUiLCJCYWRUaW1lU3RhbXAiLCJwYXJzZVRpbWVTdGFtcCIsImlucHV0IiwiY29tcHV0ZVNlY29uZHMiLCJoIiwibSIsInMiLCJmIiwibWF0Y2giLCJyZXBsYWNlIiwiU2V0dGluZ3MiLCJ2YWx1ZXMiLCJzZXQiLCJrIiwidiIsImdldCIsImRmbHQiLCJkZWZhdWx0S2V5IiwiaGFzIiwiYWx0IiwiYSIsIm4iLCJpbnRlZ2VyIiwidGVzdCIsInBlcmNlbnQiLCJwYXJzZUZsb2F0IiwicGFyc2VPcHRpb25zIiwiY2FsbGJhY2siLCJrZXlWYWx1ZURlbGltIiwiZ3JvdXBEZWxpbSIsImdyb3VwcyIsInNwbGl0IiwiaSIsImt2IiwicGFyc2VDdWUiLCJjdWUiLCJyZWdpb25MaXN0Iiwib0lucHV0IiwiY29uc3VtZVRpbWVTdGFtcCIsInRzIiwiY29uc3VtZUN1ZVNldHRpbmdzIiwic2V0dGluZ3MiLCJpZCIsInJlZ2lvbiIsInZhbHMiLCJ2YWxzMCIsInZlcnRpY2FsIiwibGluZSIsImxpbmVBbGlnbiIsInNuYXBUb0xpbmVzIiwic2l6ZSIsInBvc2l0aW9uIiwicG9zaXRpb25BbGlnbiIsInN0YXJ0IiwibGVmdCIsIm1pZGRsZSIsImVuZCIsInJpZ2h0IiwiYWxpZ24iLCJza2lwV2hpdGVzcGFjZSIsInN0YXJ0VGltZSIsInN1YnN0ciIsImVuZFRpbWUiLCJFU0NBUEUiLCJUQUdfTkFNRSIsImMiLCJiIiwidSIsInJ1YnkiLCJydCIsImxhbmciLCJUQUdfQU5OT1RBVElPTiIsIk5FRURTX1BBUkVOVCIsInBhcnNlQ29udGVudCIsIndpbmRvdyIsIm5leHRUb2tlbiIsImNvbnN1bWUiLCJyZXN1bHQiLCJ1bmVzY2FwZTEiLCJlIiwidW5lc2NhcGUiLCJzaG91bGRBZGQiLCJjdXJyZW50IiwiZWxlbWVudCIsImxvY2FsTmFtZSIsImNyZWF0ZUVsZW1lbnQiLCJ0eXBlIiwiYW5ub3RhdGlvbiIsInRhZ05hbWUiLCJkb2N1bWVudCIsInRyaW0iLCJyb290RGl2IiwidCIsInRhZ1N0YWNrIiwicG9wIiwicGFyZW50Tm9kZSIsIm5vZGUiLCJjcmVhdGVQcm9jZXNzaW5nSW5zdHJ1Y3Rpb24iLCJhcHBlbmRDaGlsZCIsImNsYXNzTmFtZSIsInB1c2giLCJjcmVhdGVUZXh0Tm9kZSIsInN0cm9uZ1JUTENoYXJzIiwiZGV0ZXJtaW5lQmlkaSIsImN1ZURpdiIsIm5vZGVTdGFjayIsInRleHQiLCJjaGFyQ29kZSIsImNoaWxkTm9kZXMiLCJwdXNoTm9kZXMiLCJuZXh0VGV4dE5vZGUiLCJ0ZXh0Q29udGVudCIsImlubmVyVGV4dCIsImNoYXJDb2RlQXQiLCJqIiwiY29tcHV0ZUxpbmVQb3MiLCJ0cmFjayIsInRleHRUcmFja0xpc3QiLCJtZWRpYUVsZW1lbnQiLCJ0cmFja0xpc3QiLCJjb3VudCIsIm1vZGUiLCJTdHlsZUJveCIsImFwcGx5U3R5bGVzIiwic3R5bGVzIiwiZGl2IiwicHJvcCIsImhhc093blByb3BlcnR5Iiwic3R5bGUiLCJmb3JtYXRTdHlsZSIsInZhbCIsInVuaXQiLCJDdWVTdHlsZUJveCIsInN0eWxlT3B0aW9ucyIsImlzSUU4IiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwidGV4dFNoYWRvdyIsImNhbGwiLCJ0b3AiLCJib3R0b20iLCJkaXNwbGF5Iiwid3JpdGluZ01vZGUiLCJ1bmljb2RlQmlkaSIsInRleHRBbGlnbiIsImZvbnQiLCJ3aGl0ZVNwYWNlIiwiZGlyZWN0aW9uIiwic3R5bGVzdW5pY29kZUJpZGkiLCJ0ZXh0UG9zIiwid2lkdGgiLCJoZWlnaHQiLCJtb3ZlIiwiYm94IiwiQm94UG9zaXRpb24iLCJvYmoiLCJsaCIsIm9mZnNldEhlaWdodCIsIm9mZnNldFdpZHRoIiwib2Zmc2V0VG9wIiwicmVjdHMiLCJnZXRDbGllbnRSZWN0cyIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIk1hdGgiLCJtYXgiLCJsaW5lSGVpZ2h0IiwiYXhpcyIsInRvTW92ZSIsIm92ZXJsYXBzIiwiYjIiLCJvdmVybGFwc0FueSIsImJveGVzIiwid2l0aGluIiwiY29udGFpbmVyIiwib3ZlcmxhcHNPcHBvc2l0ZUF4aXMiLCJpbnRlcnNlY3RQZXJjZW50YWdlIiwieCIsIm1pbiIsInkiLCJpbnRlcnNlY3RBcmVhIiwidG9DU1NDb21wYXRWYWx1ZXMiLCJyZWZlcmVuY2UiLCJnZXRTaW1wbGVCb3hQb3NpdGlvbiIsInJldCIsIm1vdmVCb3hUb0xpbmVQb3NpdGlvbiIsInN0eWxlQm94IiwiY29udGFpbmVyQm94IiwiYm94UG9zaXRpb25zIiwiZmluZEJlc3RQb3NpdGlvbiIsImJlc3RQb3NpdGlvbiIsInNwZWNpZmllZFBvc2l0aW9uIiwicGVyY2VudGFnZSIsInAiLCJib3hQb3NpdGlvbiIsImxpbmVQb3MiLCJzdGVwIiwicm91bmQiLCJtYXhQb3NpdGlvbiIsImluaXRpYWxBeGlzIiwiYWJzIiwiY2VpbCIsInJldmVyc2UiLCJjYWxjdWxhdGVkUGVyY2VudGFnZSIsIlN0cmluZ0RlY29kZXIiLCJkZWNvZGUiLCJkZWNvZGVVUklDb21wb25lbnQiLCJlbmNvZGVVUklDb21wb25lbnQiLCJjb252ZXJ0Q3VlVG9ET01UcmVlIiwiY3VldGV4dCIsIkZPTlRfU0laRV9QRVJDRU5UIiwiRk9OVF9TVFlMRSIsIkNVRV9CQUNLR1JPVU5EX1BBRERJTkciLCJwcm9jZXNzQ3VlcyIsImN1ZXMiLCJvdmVybGF5IiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwicGFkZGVkT3ZlcmxheSIsIm1hcmdpbiIsInNob3VsZENvbXB1dGUiLCJoYXNCZWVuUmVzZXQiLCJkaXNwbGF5U3RhdGUiLCJmb250U2l6ZSIsIlBhcnNlciIsImRlY29kZXIiLCJzdGF0ZSIsImJ1ZmZlciIsIlRleHREZWNvZGVyIiwicmVwb3J0T3JUaHJvd0Vycm9yIiwib25wYXJzaW5nZXJyb3IiLCJwYXJzZSIsImZsdXNoaW5nIiwic2VsZiIsInN0cmVhbSIsImNvbGxlY3ROZXh0TGluZSIsInBvcyIsInBhcnNlUmVnaW9uIiwieHkiLCJhbmNob3IiLCJWVFRSZWdpb24iLCJsaW5lcyIsInJlZ2lvbkFuY2hvclgiLCJyZWdpb25BbmNob3JZIiwidmlld3BvcnRBbmNob3JYIiwidmlld3BvcnRBbmNob3JZIiwic2Nyb2xsIiwib25yZWdpb24iLCJwYXJzZUhlYWRlciIsImFscmVhZHlDb2xsZWN0ZWRMaW5lIiwiVlRUQ3VlIiwiaW5kZXhPZiIsImhhc1N1YnN0cmluZyIsIm9uY3VlIiwiZmx1c2giLCJvbmZsdXNoIiwic2Nyb2xsU2V0dGluZyIsImZpbmRTY3JvbGxTZXR0aW5nIiwidmFsdWUiLCJ0b0xvd2VyQ2FzZSIsImlzVmFsaWRQZXJjZW50VmFsdWUiLCJfd2lkdGgiLCJfbGluZXMiLCJfcmVnaW9uQW5jaG9yWCIsIl9yZWdpb25BbmNob3JZIiwiX3ZpZXdwb3J0QW5jaG9yWCIsIl92aWV3cG9ydEFuY2hvclkiLCJfc2Nyb2xsIiwiZGVmaW5lUHJvcGVydGllcyIsImVudW1lcmFibGUiLCJUeXBlRXJyb3IiLCJzZXR0aW5nIiwiU3ludGF4RXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkE7QUFDQTs7QUFyQkE7QUF1QkEsSUFBSUEsU0FBUyxTQUFUQSxNQUFTLEdBQVUsQ0FBRSxDQUF6QjtBQUNBLFNBQVNDLFlBQVQsQ0FBc0JDLEtBQXRCLEVBQTZCQyxPQUE3QixFQUFzQztBQUNsQyxRQUFHQSxZQUFZQyxTQUFmLEVBQTBCO0FBQ3RCRCxrQkFBVSxDQUFWO0FBQ0g7QUFDRCxXQUFPLFVBQVUsQ0FBQ0UsU0FBU0gsTUFBTUksU0FBTixDQUFnQixDQUFoQixFQUFtQixDQUFuQixDQUFULEVBQWdDLEVBQWhDLENBQUQsRUFDVEQsU0FBU0gsTUFBTUksU0FBTixDQUFnQixDQUFoQixFQUFtQixDQUFuQixDQUFULEVBQWdDLEVBQWhDLENBRFMsRUFFVEQsU0FBU0gsTUFBTUksU0FBTixDQUFnQixDQUFoQixFQUFtQixDQUFuQixDQUFULEVBQWdDLEVBQWhDLENBRlMsRUFHVEgsT0FIUyxFQUdBSSxJQUhBLENBR0ssR0FITCxDQUFWLEdBR3NCLEdBSDdCO0FBSUg7O0FBRUQsSUFBSUMsY0FBYyxDQUFDLG1CQUFELEVBQXNCLHFCQUF0QixFQUE2QyxtQkFBN0MsRUFDZCxpQkFEYyxFQUNLLG1CQURMLEVBRWQsbUJBRmMsRUFFTyxrQkFGUCxDQUFsQjs7QUFJQSxJQUFJQyxZQUFZLENBQWhCOztBQUVBLFNBQVNDLE9BQVQsQ0FBaUJDLE9BQWpCLEVBQTBCQyxLQUExQixFQUFpQ0MsSUFBakMsRUFBdUM7QUFDbkMsWUFBUUEsSUFBUjtBQUNJLGFBQUssbUJBQUw7QUFDQSxhQUFLLHFCQUFMO0FBQ0ksZ0JBQUlDLFlBQVlDLFNBQVNDLEtBQVQsQ0FBZUMsV0FBZixDQUEyQixtQkFBM0IsQ0FBaEI7QUFDQSxnQkFBSUMsY0FBY0gsU0FBU0MsS0FBVCxDQUFlRyxVQUFmLENBQTBCLHFCQUExQixJQUFtRCxHQUFyRTtBQUNBQyxzQkFBVUMsT0FBVixHQUFvQnBCLGFBQWFhLFNBQWIsRUFBd0JJLFdBQXhCLENBQXBCO0FBQ0E7QUFDSixhQUFLLG1CQUFMO0FBQ0lULHdCQUFZTSxTQUFTQyxLQUFULENBQWVHLFVBQWYsQ0FBMEIsbUJBQTFCLElBQWlELEdBQTdEO0FBQ0E7QUFDSixhQUFLLGlCQUFMO0FBQ0EsYUFBSyxtQkFBTDtBQUNJLGdCQUFJRyxrQkFBa0JQLFNBQVNDLEtBQVQsQ0FBZUMsV0FBZixDQUEyQixpQkFBM0IsQ0FBdEI7QUFDQSxnQkFBSU0sb0JBQW9CUixTQUFTQyxLQUFULENBQWVHLFVBQWYsQ0FBMEIsbUJBQTFCLElBQWlELEdBQXpFO0FBQ0FDLHNCQUFVSSxhQUFWLEdBQTBCdkIsYUFBYXFCLGVBQWIsRUFBOEJDLGlCQUE5QixDQUExQjtBQUNBO0FBQ0osYUFBSyxtQkFBTDtBQUNBLGFBQUssa0JBQUw7QUFDSSxnQkFBSUUsZUFBZSxDQUFDLEVBQUQsRUFBSyxVQUFMLEVBQWlCLGNBQWpCLEVBQWlDLFlBQWpDLEVBQStDLFVBQS9DLENBQW5CO0FBQ0EsZ0JBQUlDLFdBQVdYLFNBQVNDLEtBQVQsQ0FBZUcsVUFBZixDQUEwQixrQkFBMUIsQ0FBZjtBQUNBLGdCQUFJUSxZQUFZWixTQUFTQyxLQUFULENBQWVDLFdBQWYsQ0FBMkIsbUJBQTNCLENBQWhCO0FBQ0FHLHNCQUFVUSxPQUFWLEdBQW9CSCxhQUFhQyxRQUFiLElBQXlCekIsYUFBYTBCLFNBQWIsQ0FBN0M7QUFDQTtBQXRCUjtBQXdCSDs7QUFFRCxJQUFHLE9BQU9aLFFBQVAsS0FBb0IsV0FBdkIsRUFBb0M7QUFDaEMsUUFBSUssWUFBWSxFQUFoQjtBQUNBWixnQkFBWXFCLE9BQVosQ0FBb0IsVUFBVUMsSUFBVixFQUFnQjtBQUNoQ3BCLGdCQUFRTixTQUFSLEVBQW1CQSxTQUFuQixFQUE4QjBCLElBQTlCO0FBQ0FmLGlCQUFTQyxLQUFULENBQWVlLFdBQWYsQ0FBMkJELElBQTNCLEVBQWlDcEIsT0FBakMsRUFBMEMsS0FBMUM7QUFDSCxLQUhEO0FBSUg7O0FBRUQsSUFBSXNCLGFBQWFDLE9BQU9DLE1BQVAsSUFBa0IsWUFBVztBQUN0QyxhQUFTQyxDQUFULEdBQWEsQ0FBRTtBQUNmLFdBQU8sVUFBU0MsQ0FBVCxFQUFZO0FBQ2YsWUFBSUMsVUFBVUMsTUFBVixLQUFxQixDQUF6QixFQUE0QjtBQUN4QixrQkFBTSxJQUFJQyxLQUFKLENBQVUsZ0RBQVYsQ0FBTjtBQUNIO0FBQ0RKLFVBQUVLLFNBQUYsR0FBY0osQ0FBZDtBQUNBLGVBQU8sSUFBSUQsQ0FBSixFQUFQO0FBQ0gsS0FORDtBQU9ILENBVDZCLEVBQWxDOztBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBU00sWUFBVCxDQUFzQkMsU0FBdEIsRUFBaUNDLE9BQWpDLEVBQTBDO0FBQ3RDLFNBQUtDLElBQUwsR0FBWSxjQUFaO0FBQ0EsU0FBS0MsSUFBTCxHQUFZSCxVQUFVRyxJQUF0QjtBQUNBLFNBQUtGLE9BQUwsR0FBZUEsV0FBV0QsVUFBVUMsT0FBcEM7QUFDSDtBQUNERixhQUFhRCxTQUFiLEdBQXlCUixXQUFXTyxNQUFNQyxTQUFqQixDQUF6QjtBQUNBQyxhQUFhRCxTQUFiLENBQXVCTSxXQUF2QixHQUFxQ0wsWUFBckM7O0FBRUE7QUFDQUEsYUFBYU0sTUFBYixHQUFzQjtBQUNsQkMsa0JBQWM7QUFDVkgsY0FBTSxDQURJO0FBRVZGLGlCQUFTO0FBRkMsS0FESTtBQUtsQk0sa0JBQWM7QUFDVkosY0FBTSxDQURJO0FBRVZGLGlCQUFTO0FBRkM7QUFMSSxDQUF0Qjs7QUFXQTtBQUNBLFNBQVNPLGNBQVQsQ0FBd0JDLEtBQXhCLEVBQStCOztBQUUzQixhQUFTQyxjQUFULENBQXdCQyxDQUF4QixFQUEyQkMsQ0FBM0IsRUFBOEJDLENBQTlCLEVBQWlDQyxDQUFqQyxFQUFvQztBQUNoQyxlQUFPLENBQUNILElBQUksQ0FBTCxJQUFVLElBQVYsR0FBaUIsQ0FBQ0MsSUFBSSxDQUFMLElBQVUsRUFBM0IsSUFBaUNDLElBQUksQ0FBckMsSUFBMEMsQ0FBQ0MsSUFBSSxDQUFMLElBQVUsSUFBM0Q7QUFDSDs7QUFFRCxRQUFJRixJQUFJSCxNQUFNTSxLQUFOLENBQVksa0NBQVosQ0FBUjtBQUNBLFFBQUksQ0FBQ0gsQ0FBTCxFQUFRO0FBQ0osZUFBTyxJQUFQO0FBQ0g7O0FBRUQsUUFBSUEsRUFBRSxDQUFGLENBQUosRUFBVTtBQUNOO0FBQ0EsZUFBT0YsZUFBZUUsRUFBRSxDQUFGLENBQWYsRUFBcUJBLEVBQUUsQ0FBRixDQUFyQixFQUEyQkEsRUFBRSxDQUFGLEVBQUtJLE9BQUwsQ0FBYSxHQUFiLEVBQWtCLEVBQWxCLENBQTNCLEVBQWtESixFQUFFLENBQUYsQ0FBbEQsQ0FBUDtBQUNILEtBSEQsTUFHTyxJQUFJQSxFQUFFLENBQUYsSUFBTyxFQUFYLEVBQWU7QUFDbEI7QUFDQTtBQUNBLGVBQU9GLGVBQWVFLEVBQUUsQ0FBRixDQUFmLEVBQXFCQSxFQUFFLENBQUYsQ0FBckIsRUFBMkIsQ0FBM0IsRUFBK0JBLEVBQUUsQ0FBRixDQUEvQixDQUFQO0FBQ0gsS0FKTSxNQUlBO0FBQ0g7QUFDQSxlQUFPRixlQUFlLENBQWYsRUFBa0JFLEVBQUUsQ0FBRixDQUFsQixFQUF3QkEsRUFBRSxDQUFGLENBQXhCLEVBQThCQSxFQUFFLENBQUYsQ0FBOUIsQ0FBUDtBQUNIO0FBQ0o7O0FBRUQ7QUFDQTtBQUNBLFNBQVNLLFFBQVQsR0FBb0I7QUFDaEIsU0FBS0MsTUFBTCxHQUFjNUIsV0FBVyxJQUFYLENBQWQ7QUFDSDs7QUFFRDJCLFNBQVNuQixTQUFULEdBQXFCO0FBQ2pCO0FBQ0FxQixTQUFLLGFBQVNDLENBQVQsRUFBWUMsQ0FBWixFQUFlO0FBQ2hCLFlBQUksQ0FBQyxLQUFLQyxHQUFMLENBQVNGLENBQVQsQ0FBRCxJQUFnQkMsTUFBTSxFQUExQixFQUE4QjtBQUMxQixpQkFBS0gsTUFBTCxDQUFZRSxDQUFaLElBQWlCQyxDQUFqQjtBQUNIO0FBQ0osS0FOZ0I7QUFPakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBQyxTQUFLLGFBQVNGLENBQVQsRUFBWUcsSUFBWixFQUFrQkMsVUFBbEIsRUFBOEI7QUFDL0IsWUFBSUEsVUFBSixFQUFnQjtBQUNaLG1CQUFPLEtBQUtDLEdBQUwsQ0FBU0wsQ0FBVCxJQUFjLEtBQUtGLE1BQUwsQ0FBWUUsQ0FBWixDQUFkLEdBQStCRyxLQUFLQyxVQUFMLENBQXRDO0FBQ0g7QUFDRCxlQUFPLEtBQUtDLEdBQUwsQ0FBU0wsQ0FBVCxJQUFjLEtBQUtGLE1BQUwsQ0FBWUUsQ0FBWixDQUFkLEdBQStCRyxJQUF0QztBQUNILEtBakJnQjtBQWtCakI7QUFDQUUsU0FBSyxhQUFTTCxDQUFULEVBQVk7QUFDYixlQUFPQSxLQUFLLEtBQUtGLE1BQWpCO0FBQ0gsS0FyQmdCO0FBc0JqQjtBQUNBUSxTQUFLLGFBQVNOLENBQVQsRUFBWUMsQ0FBWixFQUFlTSxDQUFmLEVBQWtCO0FBQ25CLGFBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJRCxFQUFFL0IsTUFBdEIsRUFBOEIsRUFBRWdDLENBQWhDLEVBQW1DO0FBQy9CLGdCQUFJUCxNQUFNTSxFQUFFQyxDQUFGLENBQVYsRUFBZ0I7QUFDWixxQkFBS1QsR0FBTCxDQUFTQyxDQUFULEVBQVlDLENBQVo7QUFDQTtBQUNIO0FBQ0o7QUFDSixLQTlCZ0I7QUErQmpCO0FBQ0FRLGFBQVMsaUJBQVNULENBQVQsRUFBWUMsQ0FBWixFQUFlO0FBQ3BCLFlBQUksVUFBVVMsSUFBVixDQUFlVCxDQUFmLENBQUosRUFBdUI7QUFBRTtBQUNyQixpQkFBS0YsR0FBTCxDQUFTQyxDQUFULEVBQVl6RCxTQUFTMEQsQ0FBVCxFQUFZLEVBQVosQ0FBWjtBQUNIO0FBQ0osS0FwQ2dCO0FBcUNqQjtBQUNBVSxhQUFTLGlCQUFTWCxDQUFULEVBQVlDLENBQVosRUFBZTtBQUNwQixZQUFJVCxDQUFKO0FBQ0EsWUFBS0EsSUFBSVMsRUFBRU4sS0FBRixDQUFRLDBCQUFSLENBQVQsRUFBK0M7QUFDM0NNLGdCQUFJVyxXQUFXWCxDQUFYLENBQUo7QUFDQSxnQkFBSUEsS0FBSyxDQUFMLElBQVVBLEtBQUssR0FBbkIsRUFBd0I7QUFDcEIscUJBQUtGLEdBQUwsQ0FBU0MsQ0FBVCxFQUFZQyxDQUFaO0FBQ0EsdUJBQU8sSUFBUDtBQUNIO0FBQ0o7QUFDRCxlQUFPLEtBQVA7QUFDSDtBQWhEZ0IsQ0FBckI7O0FBbURBO0FBQ0E7QUFDQSxTQUFTWSxZQUFULENBQXNCeEIsS0FBdEIsRUFBNkJ5QixRQUE3QixFQUF1Q0MsYUFBdkMsRUFBc0RDLFVBQXRELEVBQWtFO0FBQzlELFFBQUlDLFNBQVNELGFBQWEzQixNQUFNNkIsS0FBTixDQUFZRixVQUFaLENBQWIsR0FBdUMsQ0FBQzNCLEtBQUQsQ0FBcEQ7QUFDQSxTQUFLLElBQUk4QixDQUFULElBQWNGLE1BQWQsRUFBc0I7QUFDbEIsWUFBSSxPQUFPQSxPQUFPRSxDQUFQLENBQVAsS0FBcUIsUUFBekIsRUFBbUM7QUFDL0I7QUFDSDtBQUNELFlBQUlDLEtBQUtILE9BQU9FLENBQVAsRUFBVUQsS0FBVixDQUFnQkgsYUFBaEIsQ0FBVDtBQUNBLFlBQUlLLEdBQUc1QyxNQUFILEtBQWMsQ0FBbEIsRUFBcUI7QUFDakI7QUFDSDtBQUNELFlBQUl3QixJQUFJb0IsR0FBRyxDQUFILENBQVI7QUFDQSxZQUFJbkIsSUFBSW1CLEdBQUcsQ0FBSCxDQUFSO0FBQ0FOLGlCQUFTZCxDQUFULEVBQVlDLENBQVo7QUFDSDtBQUNKOztBQUVELFNBQVNvQixRQUFULENBQWtCaEMsS0FBbEIsRUFBeUJpQyxHQUF6QixFQUE4QkMsVUFBOUIsRUFBMEM7QUFDdEM7QUFDQSxRQUFJQyxTQUFTbkMsS0FBYjtBQUNBO0FBQ0EsYUFBU29DLGdCQUFULEdBQTRCO0FBQ3hCLFlBQUlDLEtBQUt0QyxlQUFlQyxLQUFmLENBQVQ7QUFDQSxZQUFJcUMsT0FBTyxJQUFYLEVBQWlCO0FBQ2Isa0JBQU0sSUFBSS9DLFlBQUosQ0FBaUJBLGFBQWFNLE1BQWIsQ0FBb0JFLFlBQXJDLEVBQ0YsMEJBQTBCcUMsTUFEeEIsQ0FBTjtBQUVIO0FBQ0Q7QUFDQW5DLGdCQUFRQSxNQUFNTyxPQUFOLENBQWMsZ0JBQWQsRUFBZ0MsRUFBaEMsQ0FBUjtBQUNBLGVBQU84QixFQUFQO0FBQ0g7O0FBRUQ7QUFDQSxhQUFTQyxrQkFBVCxDQUE0QnRDLEtBQTVCLEVBQW1DaUMsR0FBbkMsRUFBd0M7QUFDcEMsWUFBSU0sV0FBVyxJQUFJL0IsUUFBSixFQUFmOztBQUVBZ0IscUJBQWF4QixLQUFiLEVBQW9CLFVBQVVXLENBQVYsRUFBYUMsQ0FBYixFQUFnQjtBQUNoQyxvQkFBUUQsQ0FBUjtBQUNJLHFCQUFLLFFBQUw7QUFDSTtBQUNBLHlCQUFLLElBQUltQixJQUFJSSxXQUFXL0MsTUFBWCxHQUFvQixDQUFqQyxFQUFvQzJDLEtBQUssQ0FBekMsRUFBNENBLEdBQTVDLEVBQWlEO0FBQzdDLDRCQUFJSSxXQUFXSixDQUFYLEVBQWNVLEVBQWQsS0FBcUI1QixDQUF6QixFQUE0QjtBQUN4QjJCLHFDQUFTN0IsR0FBVCxDQUFhQyxDQUFiLEVBQWdCdUIsV0FBV0osQ0FBWCxFQUFjVyxNQUE5QjtBQUNBO0FBQ0g7QUFDSjtBQUNEO0FBQ0oscUJBQUssVUFBTDtBQUNJRiw2QkFBU3RCLEdBQVQsQ0FBYU4sQ0FBYixFQUFnQkMsQ0FBaEIsRUFBbUIsQ0FBQyxJQUFELEVBQU8sSUFBUCxDQUFuQjtBQUNBO0FBQ0oscUJBQUssTUFBTDtBQUNJLHdCQUFJOEIsT0FBTzlCLEVBQUVpQixLQUFGLENBQVEsR0FBUixDQUFYO0FBQUEsd0JBQ0ljLFFBQVFELEtBQUssQ0FBTCxDQURaO0FBRUFILDZCQUFTbkIsT0FBVCxDQUFpQlQsQ0FBakIsRUFBb0JnQyxLQUFwQjtBQUNBSiw2QkFBU2pCLE9BQVQsQ0FBaUJYLENBQWpCLEVBQW9CZ0MsS0FBcEIsSUFBNkJKLFNBQVM3QixHQUFULENBQWEsYUFBYixFQUE0QixLQUE1QixDQUE3QixHQUFrRSxJQUFsRTtBQUNBNkIsNkJBQVN0QixHQUFULENBQWFOLENBQWIsRUFBZ0JnQyxLQUFoQixFQUF1QixDQUFDLE1BQUQsQ0FBdkI7QUFDQSx3QkFBSUQsS0FBS3ZELE1BQUwsS0FBZ0IsQ0FBcEIsRUFBdUI7QUFDbkJvRCxpQ0FBU3RCLEdBQVQsQ0FBYSxXQUFiLEVBQTBCeUIsS0FBSyxDQUFMLENBQTFCLEVBQW1DLENBQUMsT0FBRCxFQUFVLFFBQVYsRUFBb0IsS0FBcEIsQ0FBbkM7QUFDSDtBQUNEO0FBQ0oscUJBQUssVUFBTDtBQUNJQSwyQkFBTzlCLEVBQUVpQixLQUFGLENBQVEsR0FBUixDQUFQO0FBQ0FVLDZCQUFTakIsT0FBVCxDQUFpQlgsQ0FBakIsRUFBb0IrQixLQUFLLENBQUwsQ0FBcEI7QUFDQSx3QkFBSUEsS0FBS3ZELE1BQUwsS0FBZ0IsQ0FBcEIsRUFBdUI7QUFDbkJvRCxpQ0FBU3RCLEdBQVQsQ0FBYSxlQUFiLEVBQThCeUIsS0FBSyxDQUFMLENBQTlCLEVBQXVDLENBQUMsT0FBRCxFQUFVLFFBQVYsRUFBb0IsS0FBcEIsQ0FBdkM7QUFDSDtBQUNEO0FBQ0oscUJBQUssTUFBTDtBQUNJSCw2QkFBU2pCLE9BQVQsQ0FBaUJYLENBQWpCLEVBQW9CQyxDQUFwQjtBQUNBO0FBQ0oscUJBQUssT0FBTDtBQUNJMkIsNkJBQVN0QixHQUFULENBQWFOLENBQWIsRUFBZ0JDLENBQWhCLEVBQW1CLENBQUMsT0FBRCxFQUFVLFFBQVYsRUFBb0IsS0FBcEIsRUFBMkIsTUFBM0IsRUFBbUMsT0FBbkMsQ0FBbkI7QUFDQTtBQW5DUjtBQXFDSCxTQXRDRCxFQXNDRyxHQXRDSCxFQXNDUSxJQXRDUjs7QUF3Q0E7QUFDQXFCLFlBQUlRLE1BQUosR0FBYUYsU0FBUzFCLEdBQVQsQ0FBYSxRQUFiLEVBQXVCLElBQXZCLENBQWI7QUFDQW9CLFlBQUlXLFFBQUosR0FBZUwsU0FBUzFCLEdBQVQsQ0FBYSxVQUFiLEVBQXlCLEVBQXpCLENBQWY7QUFDQW9CLFlBQUlZLElBQUosR0FBV04sU0FBUzFCLEdBQVQsQ0FBYSxNQUFiLEVBQXFCLE1BQXJCLENBQVg7QUFDQW9CLFlBQUlhLFNBQUosR0FBZ0JQLFNBQVMxQixHQUFULENBQWEsV0FBYixFQUEwQixPQUExQixDQUFoQjtBQUNBb0IsWUFBSWMsV0FBSixHQUFrQlIsU0FBUzFCLEdBQVQsQ0FBYSxhQUFiLEVBQTRCLElBQTVCLENBQWxCO0FBQ0FvQixZQUFJZSxJQUFKLEdBQVdULFNBQVMxQixHQUFULENBQWEsTUFBYixFQUFxQixHQUFyQixDQUFYO0FBQ0E7QUFDQW9CLFlBQUlnQixRQUFKLEdBQWVWLFNBQVMxQixHQUFULENBQWEsVUFBYixFQUF5QixNQUF6QixDQUFmO0FBQ0FvQixZQUFJaUIsYUFBSixHQUFvQlgsU0FBUzFCLEdBQVQsQ0FBYSxlQUFiLEVBQThCO0FBQzlDc0MsbUJBQU8sT0FEdUM7QUFFOUNDLGtCQUFNLE9BRndDO0FBRzlDQyxvQkFBUSxRQUhzQztBQUk5Q0MsaUJBQUssS0FKeUM7QUFLOUNDLG1CQUFPO0FBTHVDLFNBQTlCLEVBTWpCdEIsSUFBSXVCLEtBTmEsQ0FBcEI7QUFPSDs7QUFFRCxhQUFTQyxjQUFULEdBQTBCO0FBQ3RCekQsZ0JBQVFBLE1BQU1PLE9BQU4sQ0FBYyxNQUFkLEVBQXNCLEVBQXRCLENBQVI7QUFDSDs7QUFFRDtBQUNBa0Q7QUFDQXhCLFFBQUl5QixTQUFKLEdBQWdCdEIsa0JBQWhCLENBbkZzQyxDQW1GQTtBQUN0Q3FCO0FBQ0EsUUFBSXpELE1BQU0yRCxNQUFOLENBQWEsQ0FBYixFQUFnQixDQUFoQixNQUF1QixLQUEzQixFQUFrQztBQUFNO0FBQ3BDLGNBQU0sSUFBSXJFLFlBQUosQ0FBaUJBLGFBQWFNLE1BQWIsQ0FBb0JFLFlBQXJDLEVBQ0Ysb0VBQ0FxQyxNQUZFLENBQU47QUFHSDtBQUNEbkMsWUFBUUEsTUFBTTJELE1BQU4sQ0FBYSxDQUFiLENBQVI7QUFDQUY7QUFDQXhCLFFBQUkyQixPQUFKLEdBQWN4QixrQkFBZCxDQTVGc0MsQ0E0RkE7O0FBRXRDO0FBQ0FxQjtBQUNBbkIsdUJBQW1CdEMsS0FBbkIsRUFBMEJpQyxHQUExQjtBQUNIOztBQUVELElBQUk0QixTQUFTO0FBQ1QsYUFBUyxHQURBO0FBRVQsWUFBUSxHQUZDO0FBR1QsWUFBUSxHQUhDO0FBSVQsYUFBUyxRQUpBO0FBS1QsYUFBUyxRQUxBO0FBTVQsY0FBVTtBQU5ELENBQWI7O0FBU0EsSUFBSUMsV0FBVztBQUNYQyxPQUFHLE1BRFE7QUFFWGpDLE9BQUcsR0FGUTtBQUdYa0MsT0FBRyxHQUhRO0FBSVhDLE9BQUcsR0FKUTtBQUtYQyxVQUFNLE1BTEs7QUFNWEMsUUFBSSxJQU5PO0FBT1h2RCxPQUFHLE1BUFE7QUFRWHdELFVBQU07QUFSSyxDQUFmOztBQVdBLElBQUlDLGlCQUFpQjtBQUNqQnpELE9BQUcsT0FEYztBQUVqQndELFVBQU07QUFGVyxDQUFyQjs7QUFLQSxJQUFJRSxlQUFlO0FBQ2ZILFFBQUk7QUFEVyxDQUFuQjs7QUFJQTtBQUNBLFNBQVNJLFlBQVQsQ0FBc0JDLE1BQXRCLEVBQThCeEUsS0FBOUIsRUFBcUM7QUFDakMsYUFBU3lFLFNBQVQsR0FBcUI7QUFDakI7QUFDQSxZQUFJLENBQUN6RSxLQUFMLEVBQVk7QUFDUixtQkFBTyxJQUFQO0FBQ0g7O0FBRUQ7QUFDQSxpQkFBUzBFLE9BQVQsQ0FBaUJDLE1BQWpCLEVBQXlCO0FBQ3JCM0Usb0JBQVFBLE1BQU0yRCxNQUFOLENBQWFnQixPQUFPeEYsTUFBcEIsQ0FBUjtBQUNBLG1CQUFPd0YsTUFBUDtBQUNIOztBQUVELFlBQUl4RSxJQUFJSCxNQUFNTSxLQUFOLENBQVkscUJBQVosQ0FBUjtBQUNBO0FBQ0E7QUFDQSxlQUFPb0UsUUFBUXZFLEVBQUUsQ0FBRixJQUFPQSxFQUFFLENBQUYsQ0FBUCxHQUFjQSxFQUFFLENBQUYsQ0FBdEIsQ0FBUDtBQUNIOztBQUVEO0FBQ0EsYUFBU3lFLFNBQVQsQ0FBbUJDLENBQW5CLEVBQXNCO0FBQ2xCLGVBQU9oQixPQUFPZ0IsQ0FBUCxDQUFQO0FBQ0g7QUFDRCxhQUFTQyxRQUFULENBQWtCMUUsQ0FBbEIsRUFBcUI7QUFDakIsZUFBUUQsSUFBSUMsRUFBRUUsS0FBRixDQUFRLDRCQUFSLENBQVosRUFBb0Q7QUFDaERGLGdCQUFJQSxFQUFFRyxPQUFGLENBQVVKLEVBQUUsQ0FBRixDQUFWLEVBQWdCeUUsU0FBaEIsQ0FBSjtBQUNIO0FBQ0QsZUFBT3hFLENBQVA7QUFDSDs7QUFFRCxhQUFTMkUsU0FBVCxDQUFtQkMsT0FBbkIsRUFBNEJDLE9BQTVCLEVBQXFDO0FBQ2pDLGVBQU8sQ0FBQ1gsYUFBYVcsUUFBUUMsU0FBckIsQ0FBRCxJQUNIWixhQUFhVyxRQUFRQyxTQUFyQixNQUFvQ0YsUUFBUUUsU0FEaEQ7QUFFSDs7QUFFRDtBQUNBLGFBQVNDLGFBQVQsQ0FBdUJDLElBQXZCLEVBQTZCQyxVQUE3QixFQUF5QztBQUNyQyxZQUFJQyxVQUFVeEIsU0FBU3NCLElBQVQsQ0FBZDtBQUNBLFlBQUksQ0FBQ0UsT0FBTCxFQUFjO0FBQ1YsbUJBQU8sSUFBUDtBQUNIO0FBQ0QsWUFBSUwsVUFBVVQsT0FBT2UsUUFBUCxDQUFnQkosYUFBaEIsQ0FBOEJHLE9BQTlCLENBQWQ7QUFDQUwsZ0JBQVFDLFNBQVIsR0FBb0JJLE9BQXBCO0FBQ0EsWUFBSTdGLE9BQU80RSxlQUFlZSxJQUFmLENBQVg7QUFDQSxZQUFJM0YsUUFBUTRGLFVBQVosRUFBd0I7QUFDcEJKLG9CQUFReEYsSUFBUixJQUFnQjRGLFdBQVdHLElBQVgsRUFBaEI7QUFDSDtBQUNELGVBQU9QLE9BQVA7QUFDSDs7QUFFRCxRQUFJUSxVQUFVakIsT0FBT2UsUUFBUCxDQUFnQkosYUFBaEIsQ0FBOEIsS0FBOUIsQ0FBZDtBQUFBLFFBQ0lILFVBQVVTLE9BRGQ7QUFBQSxRQUVJQyxDQUZKO0FBQUEsUUFHSUMsV0FBVyxFQUhmOztBQUtBLFdBQU8sQ0FBQ0QsSUFBSWpCLFdBQUwsTUFBc0IsSUFBN0IsRUFBbUM7QUFDL0IsWUFBSWlCLEVBQUUsQ0FBRixNQUFTLEdBQWIsRUFBa0I7QUFDZCxnQkFBSUEsRUFBRSxDQUFGLE1BQVMsR0FBYixFQUFrQjtBQUNkO0FBQ0Esb0JBQUlDLFNBQVN4RyxNQUFULElBQ0F3RyxTQUFTQSxTQUFTeEcsTUFBVCxHQUFrQixDQUEzQixNQUFrQ3VHLEVBQUUvQixNQUFGLENBQVMsQ0FBVCxFQUFZcEQsT0FBWixDQUFvQixHQUFwQixFQUF5QixFQUF6QixDQUR0QyxFQUNvRTtBQUNoRW9GLDZCQUFTQyxHQUFUO0FBQ0FaLDhCQUFVQSxRQUFRYSxVQUFsQjtBQUNIO0FBQ0Q7QUFDQTtBQUNIO0FBQ0QsZ0JBQUl4RCxLQUFLdEMsZUFBZTJGLEVBQUUvQixNQUFGLENBQVMsQ0FBVCxFQUFZK0IsRUFBRXZHLE1BQUYsR0FBVyxDQUF2QixDQUFmLENBQVQ7QUFDQSxnQkFBSTJHLElBQUo7QUFDQSxnQkFBSXpELEVBQUosRUFBUTtBQUNKO0FBQ0F5RCx1QkFBT3RCLE9BQU9lLFFBQVAsQ0FBZ0JRLDJCQUFoQixDQUE0QyxXQUE1QyxFQUF5RDFELEVBQXpELENBQVA7QUFDQTJDLHdCQUFRZ0IsV0FBUixDQUFvQkYsSUFBcEI7QUFDQTtBQUNIO0FBQ0QsZ0JBQUkzRixJQUFJdUYsRUFBRXBGLEtBQUYsQ0FBUSxrREFBUixDQUFSO0FBQ0E7QUFDQSxnQkFBSSxDQUFDSCxDQUFMLEVBQVE7QUFDSjtBQUNIO0FBQ0Q7QUFDQTJGLG1CQUFPWCxjQUFjaEYsRUFBRSxDQUFGLENBQWQsRUFBb0JBLEVBQUUsQ0FBRixDQUFwQixDQUFQO0FBQ0EsZ0JBQUksQ0FBQzJGLElBQUwsRUFBVztBQUNQO0FBQ0g7QUFDRDtBQUNBO0FBQ0EsZ0JBQUksQ0FBQ2YsVUFBVUMsT0FBVixFQUFtQmMsSUFBbkIsQ0FBTCxFQUErQjtBQUMzQjtBQUNIO0FBQ0Q7QUFDQSxnQkFBSTNGLEVBQUUsQ0FBRixDQUFKLEVBQVU7QUFDTjJGLHFCQUFLRyxTQUFMLEdBQWlCOUYsRUFBRSxDQUFGLEVBQUt3RCxNQUFMLENBQVksQ0FBWixFQUFlcEQsT0FBZixDQUF1QixHQUF2QixFQUE0QixHQUE1QixDQUFqQjtBQUNIO0FBQ0Q7QUFDQTtBQUNBb0YscUJBQVNPLElBQVQsQ0FBYy9GLEVBQUUsQ0FBRixDQUFkO0FBQ0E2RSxvQkFBUWdCLFdBQVIsQ0FBb0JGLElBQXBCO0FBQ0FkLHNCQUFVYyxJQUFWO0FBQ0E7QUFDSDs7QUFFRDtBQUNBZCxnQkFBUWdCLFdBQVIsQ0FBb0J4QixPQUFPZSxRQUFQLENBQWdCWSxjQUFoQixDQUErQnJCLFNBQVNZLENBQVQsQ0FBL0IsQ0FBcEI7QUFDSDs7QUFFRCxXQUFPRCxPQUFQO0FBQ0g7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUlXLGlCQUFpQixDQUFDLE1BQUQsRUFBUyxNQUFULEVBQWlCLE1BQWpCLEVBQXlCLE1BQXpCLEVBQWlDLE1BQWpDLEVBQXlDLE1BQXpDLEVBQ2pCLE1BRGlCLEVBQ1QsTUFEUyxFQUNELE1BREMsRUFDTyxNQURQLEVBQ2UsTUFEZixFQUN1QixNQUR2QixFQUMrQixNQUQvQixFQUN1QyxNQUR2QyxFQUMrQyxNQUQvQyxFQUVqQixNQUZpQixFQUVULE1BRlMsRUFFRCxNQUZDLEVBRU8sTUFGUCxFQUVlLE1BRmYsRUFFdUIsTUFGdkIsRUFFK0IsTUFGL0IsRUFFdUMsTUFGdkMsRUFFK0MsTUFGL0MsRUFHakIsTUFIaUIsRUFHVCxNQUhTLEVBR0QsTUFIQyxFQUdPLE1BSFAsRUFHZSxNQUhmLEVBR3VCLE1BSHZCLEVBRytCLE1BSC9CLEVBR3VDLE1BSHZDLEVBRytDLE1BSC9DLEVBSWpCLE1BSmlCLEVBSVQsTUFKUyxFQUlELE1BSkMsRUFJTyxNQUpQLEVBSWUsTUFKZixFQUl1QixNQUp2QixFQUkrQixNQUovQixFQUl1QyxNQUp2QyxFQUkrQyxNQUovQyxFQUtqQixNQUxpQixFQUtULE1BTFMsRUFLRCxNQUxDLEVBS08sTUFMUCxFQUtlLE1BTGYsRUFLdUIsTUFMdkIsRUFLK0IsTUFML0IsRUFLdUMsTUFMdkMsRUFLK0MsTUFML0MsRUFNakIsTUFOaUIsRUFNVCxNQU5TLEVBTUQsTUFOQyxFQU1PLE1BTlAsRUFNZSxNQU5mLEVBTXVCLE1BTnZCLEVBTStCLE1BTi9CLEVBTXVDLE1BTnZDLEVBTStDLE1BTi9DLEVBT2pCLE1BUGlCLEVBT1QsTUFQUyxFQU9ELE1BUEMsRUFPTyxNQVBQLEVBT2UsTUFQZixFQU91QixNQVB2QixFQU8rQixNQVAvQixFQU91QyxNQVB2QyxFQU8rQyxNQVAvQyxFQVFqQixNQVJpQixFQVFULE1BUlMsRUFRRCxNQVJDLEVBUU8sTUFSUCxFQVFlLE1BUmYsRUFRdUIsTUFSdkIsRUFRK0IsTUFSL0IsRUFRdUMsTUFSdkMsRUFRK0MsTUFSL0MsRUFTakIsTUFUaUIsRUFTVCxNQVRTLEVBU0QsTUFUQyxFQVNPLE1BVFAsRUFTZSxNQVRmLEVBU3VCLE1BVHZCLEVBUytCLE1BVC9CLEVBU3VDLE1BVHZDLEVBUytDLE1BVC9DLEVBVWpCLE1BVmlCLEVBVVQsTUFWUyxFQVVELE1BVkMsRUFVTyxNQVZQLEVBVWUsTUFWZixFQVV1QixNQVZ2QixFQVUrQixNQVYvQixFQVV1QyxNQVZ2QyxFQVUrQyxNQVYvQyxFQVdqQixNQVhpQixFQVdULE1BWFMsRUFXRCxNQVhDLEVBV08sTUFYUCxFQVdlLE1BWGYsRUFXdUIsTUFYdkIsRUFXK0IsTUFYL0IsRUFXdUMsTUFYdkMsRUFXK0MsTUFYL0MsRUFZakIsTUFaaUIsRUFZVCxNQVpTLEVBWUQsTUFaQyxFQVlPLE1BWlAsRUFZZSxNQVpmLEVBWXVCLE1BWnZCLEVBWStCLE1BWi9CLEVBWXVDLE1BWnZDLEVBWStDLE1BWi9DLEVBYWpCLE1BYmlCLEVBYVQsTUFiUyxFQWFELE1BYkMsRUFhTyxNQWJQLEVBYWUsTUFiZixFQWF1QixNQWJ2QixFQWErQixNQWIvQixFQWF1QyxNQWJ2QyxFQWErQyxNQWIvQyxFQWNqQixNQWRpQixFQWNULE1BZFMsRUFjRCxNQWRDLEVBY08sTUFkUCxFQWNlLE1BZGYsRUFjdUIsTUFkdkIsRUFjK0IsTUFkL0IsRUFjdUMsTUFkdkMsRUFjK0MsTUFkL0MsRUFlakIsTUFmaUIsRUFlVCxNQWZTLEVBZUQsTUFmQyxFQWVPLE1BZlAsRUFlZSxNQWZmLEVBZXVCLE1BZnZCLEVBZStCLE1BZi9CLEVBZXVDLE1BZnZDLEVBZStDLE1BZi9DLEVBZ0JqQixNQWhCaUIsRUFnQlQsTUFoQlMsRUFnQkQsTUFoQkMsRUFnQk8sTUFoQlAsRUFnQmUsTUFoQmYsRUFnQnVCLE1BaEJ2QixFQWdCK0IsTUFoQi9CLEVBZ0J1QyxNQWhCdkMsRUFnQitDLE1BaEIvQyxFQWlCakIsTUFqQmlCLEVBaUJULE1BakJTLEVBaUJELE1BakJDLEVBaUJPLE1BakJQLEVBaUJlLE1BakJmLEVBaUJ1QixNQWpCdkIsRUFpQitCLE1BakIvQixFQWlCdUMsTUFqQnZDLEVBaUIrQyxNQWpCL0MsRUFrQmpCLE1BbEJpQixFQWtCVCxNQWxCUyxFQWtCRCxNQWxCQyxFQWtCTyxNQWxCUCxFQWtCZSxNQWxCZixFQWtCdUIsTUFsQnZCLEVBa0IrQixNQWxCL0IsRUFrQnVDLE1BbEJ2QyxFQWtCK0MsTUFsQi9DLEVBbUJqQixNQW5CaUIsRUFtQlQsTUFuQlMsRUFtQkQsTUFuQkMsRUFtQk8sTUFuQlAsRUFtQmUsTUFuQmYsRUFtQnVCLE1BbkJ2QixFQW1CK0IsTUFuQi9CLEVBbUJ1QyxNQW5CdkMsRUFtQitDLE1BbkIvQyxFQW9CakIsTUFwQmlCLEVBb0JULE1BcEJTLEVBb0JELE1BcEJDLEVBb0JPLE1BcEJQLEVBb0JlLE1BcEJmLEVBb0J1QixNQXBCdkIsRUFvQitCLE1BcEIvQixFQW9CdUMsTUFwQnZDLEVBb0IrQyxNQXBCL0MsRUFxQmpCLE1BckJpQixFQXFCVCxNQXJCUyxFQXFCRCxNQXJCQyxFQXFCTyxNQXJCUCxFQXFCZSxNQXJCZixFQXFCdUIsTUFyQnZCLEVBcUIrQixNQXJCL0IsRUFxQnVDLE1BckJ2QyxFQXFCK0MsTUFyQi9DLEVBc0JqQixNQXRCaUIsRUFzQlQsTUF0QlMsRUFzQkQsTUF0QkMsRUFzQk8sTUF0QlAsRUFzQmUsTUF0QmYsRUFzQnVCLE1BdEJ2QixFQXNCK0IsTUF0Qi9CLEVBc0J1QyxNQXRCdkMsRUFzQitDLE1BdEIvQyxFQXVCakIsTUF2QmlCLEVBdUJULE1BdkJTLEVBdUJELE1BdkJDLEVBdUJPLE1BdkJQLEVBdUJlLE1BdkJmLEVBdUJ1QixNQXZCdkIsRUF1QitCLE1BdkIvQixFQXVCdUMsTUF2QnZDLEVBdUIrQyxNQXZCL0MsRUF3QmpCLE1BeEJpQixFQXdCVCxNQXhCUyxFQXdCRCxNQXhCQyxFQXdCTyxNQXhCUCxFQXdCZSxNQXhCZixFQXdCdUIsTUF4QnZCLEVBd0IrQixNQXhCL0IsRUF3QnVDLE1BeEJ2QyxFQXdCK0MsTUF4Qi9DLEVBeUJqQixNQXpCaUIsRUF5QlQsTUF6QlMsRUF5QkQsTUF6QkMsRUF5Qk8sTUF6QlAsRUF5QmUsTUF6QmYsRUF5QnVCLE1BekJ2QixFQXlCK0IsTUF6Qi9CLEVBeUJ1QyxNQXpCdkMsRUF5QitDLE1BekIvQyxFQTBCakIsTUExQmlCLEVBMEJULE1BMUJTLEVBMEJELE1BMUJDLEVBMEJPLE1BMUJQLEVBMEJlLE1BMUJmLEVBMEJ1QixNQTFCdkIsRUEwQitCLE1BMUIvQixFQTBCdUMsTUExQnZDLEVBMEIrQyxNQTFCL0MsRUEyQmpCLE1BM0JpQixFQTJCVCxNQTNCUyxFQTJCRCxNQTNCQyxFQTJCTyxNQTNCUCxFQTJCZSxNQTNCZixFQTJCdUIsTUEzQnZCLEVBMkIrQixNQTNCL0IsRUEyQnVDLE1BM0J2QyxFQTJCK0MsTUEzQi9DLEVBNEJqQixNQTVCaUIsRUE0QlQsTUE1QlMsRUE0QkQsTUE1QkMsRUE0Qk8sTUE1QlAsRUE0QmUsTUE1QmYsRUE0QnVCLE1BNUJ2QixFQTRCK0IsTUE1Qi9CLEVBNEJ1QyxNQTVCdkMsRUE0QitDLE1BNUIvQyxFQTZCakIsTUE3QmlCLEVBNkJULE1BN0JTLEVBNkJELE1BN0JDLEVBNkJPLE1BN0JQLEVBNkJlLE1BN0JmLEVBNkJ1QixNQTdCdkIsRUE2QitCLE1BN0IvQixFQTZCdUMsTUE3QnZDLEVBNkIrQyxNQTdCL0MsRUE4QmpCLE1BOUJpQixFQThCVCxNQTlCUyxFQThCRCxNQTlCQyxFQThCTyxNQTlCUCxFQThCZSxNQTlCZixFQThCdUIsTUE5QnZCLEVBOEIrQixNQTlCL0IsRUE4QnVDLE1BOUJ2QyxFQThCK0MsTUE5Qi9DLEVBK0JqQixNQS9CaUIsRUErQlQsTUEvQlMsRUErQkQsTUEvQkMsRUErQk8sTUEvQlAsRUErQmUsTUEvQmYsRUErQnVCLE1BL0J2QixFQStCK0IsTUEvQi9CLEVBK0J1QyxNQS9CdkMsRUErQitDLE1BL0IvQyxFQWdDakIsTUFoQ2lCLEVBZ0NULE1BaENTLEVBZ0NELE1BaENDLEVBZ0NPLE1BaENQLEVBZ0NlLE1BaENmLEVBZ0N1QixNQWhDdkIsRUFnQytCLE1BaEMvQixFQWdDdUMsTUFoQ3ZDLEVBZ0MrQyxNQWhDL0MsRUFpQ2pCLE1BakNpQixFQWlDVCxNQWpDUyxFQWlDRCxNQWpDQyxFQWlDTyxNQWpDUCxFQWlDZSxNQWpDZixFQWlDdUIsTUFqQ3ZCLEVBaUMrQixNQWpDL0IsRUFpQ3VDLE1BakN2QyxFQWlDK0MsTUFqQy9DLEVBa0NqQixNQWxDaUIsRUFrQ1QsTUFsQ1MsRUFrQ0QsTUFsQ0MsRUFrQ08sTUFsQ1AsRUFrQ2UsTUFsQ2YsRUFrQ3VCLE1BbEN2QixFQWtDK0IsTUFsQy9CLEVBa0N1QyxNQWxDdkMsRUFrQytDLE1BbEMvQyxFQW1DakIsTUFuQ2lCLEVBbUNULE1BbkNTLEVBbUNELE1BbkNDLEVBbUNPLE1BbkNQLEVBbUNlLE1BbkNmLEVBbUN1QixNQW5DdkIsRUFtQytCLE1BbkMvQixFQW1DdUMsTUFuQ3ZDLEVBbUMrQyxNQW5DL0MsRUFvQ2pCLE1BcENpQixFQW9DVCxNQXBDUyxFQW9DRCxNQXBDQyxFQW9DTyxNQXBDUCxFQW9DZSxNQXBDZixFQW9DdUIsTUFwQ3ZCLEVBb0MrQixNQXBDL0IsRUFvQ3VDLE1BcEN2QyxFQW9DK0MsTUFwQy9DLEVBcUNqQixNQXJDaUIsRUFxQ1QsTUFyQ1MsRUFxQ0QsTUFyQ0MsRUFxQ08sTUFyQ1AsRUFxQ2UsTUFyQ2YsRUFxQ3VCLE1BckN2QixFQXFDK0IsTUFyQy9CLEVBcUN1QyxNQXJDdkMsRUFxQytDLE1BckMvQyxFQXNDakIsTUF0Q2lCLEVBc0NULE1BdENTLEVBc0NELE1BdENDLEVBc0NPLE1BdENQLEVBc0NlLE1BdENmLEVBc0N1QixNQXRDdkIsRUFzQytCLE1BdEMvQixFQXNDdUMsTUF0Q3ZDLEVBc0MrQyxNQXRDL0MsRUF1Q2pCLE1BdkNpQixFQXVDVCxNQXZDUyxFQXVDRCxNQXZDQyxFQXVDTyxNQXZDUCxFQXVDZSxNQXZDZixFQXVDdUIsTUF2Q3ZCLEVBdUMrQixNQXZDL0IsRUF1Q3VDLE1BdkN2QyxFQXVDK0MsTUF2Qy9DLEVBd0NqQixNQXhDaUIsRUF3Q1QsTUF4Q1MsRUF3Q0QsTUF4Q0MsRUF3Q08sTUF4Q1AsRUF3Q2UsTUF4Q2YsRUF3Q3VCLE1BeEN2QixFQXdDK0IsTUF4Qy9CLEVBd0N1QyxNQXhDdkMsRUF3QytDLE1BeEMvQyxFQXlDakIsTUF6Q2lCLEVBeUNULE1BekNTLEVBeUNELE1BekNDLEVBeUNPLE1BekNQLEVBeUNlLE1BekNmLEVBeUN1QixNQXpDdkIsRUF5QytCLE1BekMvQixFQXlDdUMsTUF6Q3ZDLEVBeUMrQyxNQXpDL0MsRUEwQ2pCLE1BMUNpQixFQTBDVCxNQTFDUyxFQTBDRCxNQTFDQyxFQTBDTyxNQTFDUCxFQTBDZSxNQTFDZixFQTBDdUIsTUExQ3ZCLEVBMEMrQixNQTFDL0IsRUEwQ3VDLE1BMUN2QyxFQTBDK0MsTUExQy9DLEVBMkNqQixNQTNDaUIsRUEyQ1QsTUEzQ1MsRUEyQ0QsTUEzQ0MsRUEyQ08sTUEzQ1AsRUEyQ2UsTUEzQ2YsRUEyQ3VCLE1BM0N2QixFQTJDK0IsTUEzQy9CLEVBMkN1QyxNQTNDdkMsRUEyQytDLE1BM0MvQyxFQTRDakIsTUE1Q2lCLEVBNENULE1BNUNTLEVBNENELE1BNUNDLEVBNENPLE1BNUNQLEVBNENlLE1BNUNmLEVBNEN1QixNQTVDdkIsRUE0QytCLE1BNUMvQixFQTRDdUMsTUE1Q3ZDLEVBNEMrQyxNQTVDL0MsRUE2Q2pCLE1BN0NpQixFQTZDVCxNQTdDUyxFQTZDRCxNQTdDQyxFQTZDTyxNQTdDUCxFQTZDZSxNQTdDZixFQTZDdUIsTUE3Q3ZCLEVBNkMrQixNQTdDL0IsRUE2Q3VDLE1BN0N2QyxFQTZDK0MsTUE3Qy9DLEVBOENqQixNQTlDaUIsRUE4Q1QsTUE5Q1MsRUE4Q0QsTUE5Q0MsRUE4Q08sTUE5Q1AsRUE4Q2UsTUE5Q2YsRUE4Q3VCLE1BOUN2QixFQThDK0IsTUE5Qy9CLEVBOEN1QyxNQTlDdkMsRUE4QytDLE1BOUMvQyxFQStDakIsTUEvQ2lCLEVBK0NULE1BL0NTLEVBK0NELE1BL0NDLEVBK0NPLE1BL0NQLEVBK0NlLE1BL0NmLEVBK0N1QixNQS9DdkIsRUErQytCLE1BL0MvQixFQStDdUMsTUEvQ3ZDLEVBK0MrQyxNQS9DL0MsRUFnRGpCLE1BaERpQixFQWdEVCxNQWhEUyxFQWdERCxNQWhEQyxFQWdETyxNQWhEUCxFQWdEZSxNQWhEZixFQWdEdUIsTUFoRHZCLEVBZ0QrQixNQWhEL0IsRUFnRHVDLE1BaER2QyxFQWdEK0MsTUFoRC9DLEVBaURqQixNQWpEaUIsRUFpRFQsTUFqRFMsRUFpREQsTUFqREMsRUFpRE8sTUFqRFAsRUFpRGUsTUFqRGYsRUFpRHVCLE1BakR2QixFQWlEK0IsTUFqRC9CLEVBaUR1QyxNQWpEdkMsRUFpRCtDLE1BakQvQyxFQWtEakIsTUFsRGlCLEVBa0RULE1BbERTLEVBa0RELE1BbERDLEVBa0RPLE1BbERQLEVBa0RlLE1BbERmLEVBa0R1QixNQWxEdkIsRUFrRCtCLE1BbEQvQixFQWtEdUMsTUFsRHZDLEVBa0QrQyxNQWxEL0MsRUFtRGpCLE1BbkRpQixFQW1EVCxNQW5EUyxFQW1ERCxNQW5EQyxFQW1ETyxNQW5EUCxFQW1EZSxNQW5EZixFQW1EdUIsTUFuRHZCLEVBbUQrQixNQW5EL0IsRUFtRHVDLE1BbkR2QyxFQW1EK0MsTUFuRC9DLEVBb0RqQixNQXBEaUIsRUFvRFQsTUFwRFMsRUFvREQsTUFwREMsRUFvRE8sTUFwRFAsRUFvRGUsTUFwRGYsRUFvRHVCLE1BcER2QixFQW9EK0IsTUFwRC9CLEVBb0R1QyxNQXBEdkMsRUFvRCtDLE1BcEQvQyxFQXFEakIsTUFyRGlCLEVBcURULE1BckRTLEVBcURELE1BckRDLEVBcURPLE1BckRQLEVBcURlLE1BckRmLEVBcUR1QixNQXJEdkIsRUFxRCtCLE1BckQvQixFQXFEdUMsTUFyRHZDLEVBcUQrQyxNQXJEL0MsRUFzRGpCLE1BdERpQixFQXNEVCxNQXREUyxFQXNERCxNQXREQyxFQXNETyxNQXREUCxFQXNEZSxNQXREZixFQXNEdUIsTUF0RHZCLEVBc0QrQixNQXREL0IsRUFzRHVDLE1BdER2QyxFQXNEK0MsTUF0RC9DLEVBdURqQixNQXZEaUIsRUF1RFQsTUF2RFMsRUF1REQsTUF2REMsRUF1RE8sTUF2RFAsRUF1RGUsTUF2RGYsRUF1RHVCLE1BdkR2QixFQXVEK0IsTUF2RC9CLEVBdUR1QyxNQXZEdkMsRUF1RCtDLE1BdkQvQyxFQXdEakIsTUF4RGlCLEVBd0RULE1BeERTLEVBd0RELE1BeERDLEVBd0RPLE1BeERQLEVBd0RlLE1BeERmLEVBd0R1QixNQXhEdkIsRUF3RCtCLE1BeEQvQixFQXdEdUMsTUF4RHZDLEVBd0QrQyxNQXhEL0MsRUF5RGpCLE1BekRpQixFQXlEVCxNQXpEUyxFQXlERCxNQXpEQyxFQXlETyxNQXpEUCxFQXlEZSxNQXpEZixFQXlEdUIsTUF6RHZCLEVBeUQrQixNQXpEL0IsRUF5RHVDLE1BekR2QyxFQXlEK0MsTUF6RC9DLEVBMERqQixNQTFEaUIsRUEwRFQsTUExRFMsRUEwREQsTUExREMsRUEwRE8sTUExRFAsRUEwRGUsTUExRGYsRUEwRHVCLE1BMUR2QixFQTBEK0IsTUExRC9CLEVBMER1QyxNQTFEdkMsRUEwRCtDLE1BMUQvQyxFQTJEakIsTUEzRGlCLEVBMkRULE1BM0RTLEVBMkRELE1BM0RDLEVBMkRPLE1BM0RQLEVBMkRlLE1BM0RmLEVBMkR1QixNQTNEdkIsRUEyRCtCLE1BM0QvQixFQTJEdUMsTUEzRHZDLEVBMkQrQyxNQTNEL0MsRUE0RGpCLE1BNURpQixFQTREVCxNQTVEUyxFQTRERCxNQTVEQyxFQTRETyxNQTVEUCxFQTREZSxNQTVEZixFQTREdUIsTUE1RHZCLEVBNEQrQixNQTVEL0IsRUE0RHVDLE1BNUR2QyxFQTREK0MsTUE1RC9DLEVBNkRqQixNQTdEaUIsRUE2RFQsTUE3RFMsRUE2REQsTUE3REMsRUE2RE8sTUE3RFAsRUE2RGUsTUE3RGYsRUE2RHVCLE1BN0R2QixFQTZEK0IsTUE3RC9CLEVBNkR1QyxNQTdEdkMsRUE2RCtDLE1BN0QvQyxFQThEakIsTUE5RGlCLEVBOERULE1BOURTLEVBOERELE1BOURDLEVBOERPLE1BOURQLEVBOERlLE1BOURmLEVBOER1QixNQTlEdkIsRUE4RCtCLE1BOUQvQixFQThEdUMsTUE5RHZDLEVBOEQrQyxNQTlEL0MsRUErRGpCLE1BL0RpQixFQStEVCxNQS9EUyxFQStERCxNQS9EQyxFQStETyxNQS9EUCxFQStEZSxNQS9EZixFQStEdUIsTUEvRHZCLEVBK0QrQixNQS9EL0IsRUErRHVDLE1BL0R2QyxFQStEK0MsTUEvRC9DLEVBZ0VqQixNQWhFaUIsRUFnRVQsTUFoRVMsRUFnRUQsTUFoRUMsRUFnRU8sTUFoRVAsRUFnRWUsTUFoRWYsRUFnRXVCLE1BaEV2QixFQWdFK0IsTUFoRS9CLEVBZ0V1QyxNQWhFdkMsRUFnRStDLE1BaEUvQyxFQWlFakIsTUFqRWlCLEVBaUVULE1BakVTLEVBaUVELE1BakVDLEVBaUVPLE1BakVQLEVBaUVlLE1BakVmLEVBaUV1QixNQWpFdkIsRUFpRStCLE1BakUvQixFQWlFdUMsTUFqRXZDLEVBaUUrQyxNQWpFL0MsRUFrRWpCLE1BbEVpQixFQWtFVCxNQWxFUyxFQWtFRCxNQWxFQyxFQWtFTyxNQWxFUCxFQWtFZSxNQWxFZixFQWtFdUIsTUFsRXZCLEVBa0UrQixNQWxFL0IsRUFrRXVDLE1BbEV2QyxFQWtFK0MsTUFsRS9DLEVBbUVqQixNQW5FaUIsRUFtRVQsTUFuRVMsRUFtRUQsTUFuRUMsRUFtRU8sTUFuRVAsRUFtRWUsTUFuRWYsRUFtRXVCLE1BbkV2QixFQW1FK0IsTUFuRS9CLEVBbUV1QyxNQW5FdkMsRUFtRStDLE1BbkUvQyxFQW9FakIsTUFwRWlCLEVBb0VULE1BcEVTLEVBb0VELE1BcEVDLEVBb0VPLE1BcEVQLEVBb0VlLE1BcEVmLEVBb0V1QixNQXBFdkIsRUFvRStCLE1BcEUvQixFQW9FdUMsTUFwRXZDLEVBb0UrQyxNQXBFL0MsRUFxRWpCLE1BckVpQixFQXFFVCxNQXJFUyxFQXFFRCxNQXJFQyxFQXFFTyxNQXJFUCxFQXFFZSxNQXJFZixFQXFFdUIsTUFyRXZCLEVBcUUrQixNQXJFL0IsRUFxRXVDLE1BckV2QyxFQXFFK0MsTUFyRS9DLEVBc0VqQixNQXRFaUIsRUFzRVQsTUF0RVMsRUFzRUQsTUF0RUMsRUFzRU8sTUF0RVAsRUFzRWUsTUF0RWYsRUFzRXVCLE1BdEV2QixFQXNFK0IsTUF0RS9CLEVBc0V1QyxNQXRFdkMsRUFzRStDLE1BdEUvQyxFQXVFakIsTUF2RWlCLEVBdUVULE1BdkVTLEVBdUVELE1BdkVDLEVBdUVPLE1BdkVQLEVBdUVlLE1BdkVmLEVBdUV1QixNQXZFdkIsRUF1RStCLE1BdkUvQixFQXVFdUMsTUF2RXZDLEVBdUUrQyxNQXZFL0MsRUF3RWpCLE1BeEVpQixFQXdFVCxNQXhFUyxFQXdFRCxNQXhFQyxFQXdFTyxNQXhFUCxFQXdFZSxNQXhFZixFQXdFdUIsTUF4RXZCLEVBd0UrQixNQXhFL0IsRUF3RXVDLE1BeEV2QyxFQXdFK0MsTUF4RS9DLEVBeUVqQixNQXpFaUIsRUF5RVQsTUF6RVMsRUF5RUQsTUF6RUMsRUF5RU8sTUF6RVAsRUF5RWUsTUF6RWYsRUF5RXVCLE1BekV2QixFQXlFK0IsTUF6RS9CLEVBeUV1QyxNQXpFdkMsRUF5RStDLE1BekUvQyxFQTBFakIsTUExRWlCLEVBMEVULE1BMUVTLEVBMEVELE1BMUVDLEVBMEVPLE1BMUVQLEVBMEVlLE1BMUVmLEVBMEV1QixNQTFFdkIsRUEwRStCLE1BMUUvQixFQTBFdUMsTUExRXZDLEVBMEUrQyxNQTFFL0MsRUEyRWpCLE1BM0VpQixFQTJFVCxNQTNFUyxFQTJFRCxNQTNFQyxFQTJFTyxNQTNFUCxFQTJFZSxNQTNFZixFQTJFdUIsTUEzRXZCLEVBMkUrQixNQTNFL0IsRUEyRXVDLE1BM0V2QyxFQTJFK0MsTUEzRS9DLEVBNEVqQixNQTVFaUIsRUE0RVQsTUE1RVMsRUE0RUQsTUE1RUMsRUE0RU8sTUE1RVAsRUE0RWUsTUE1RWYsRUE0RXVCLE1BNUV2QixFQTRFK0IsTUE1RS9CLEVBNEV1QyxNQTVFdkMsRUE0RStDLE1BNUUvQyxFQTZFakIsTUE3RWlCLEVBNkVULE1BN0VTLEVBNkVELE1BN0VDLEVBNkVPLE1BN0VQLEVBNkVlLE1BN0VmLEVBNkV1QixNQTdFdkIsRUE2RStCLE1BN0UvQixFQTZFdUMsTUE3RXZDLEVBNkUrQyxNQTdFL0MsRUE4RWpCLE1BOUVpQixFQThFVCxNQTlFUyxFQThFRCxNQTlFQyxFQThFTyxNQTlFUCxFQThFZSxNQTlFZixFQThFdUIsTUE5RXZCLEVBOEUrQixNQTlFL0IsRUE4RXVDLE1BOUV2QyxFQThFK0MsTUE5RS9DLEVBK0VqQixNQS9FaUIsRUErRVQsTUEvRVMsRUErRUQsTUEvRUMsRUErRU8sTUEvRVAsRUErRWUsTUEvRWYsRUErRXVCLE1BL0V2QixFQStFK0IsTUEvRS9CLEVBK0V1QyxNQS9FdkMsRUErRStDLE1BL0UvQyxFQWdGakIsTUFoRmlCLEVBZ0ZULE1BaEZTLEVBZ0ZELE1BaEZDLEVBZ0ZPLE1BaEZQLEVBZ0ZlLE1BaEZmLEVBZ0Z1QixNQWhGdkIsRUFnRitCLE1BaEYvQixFQWdGdUMsTUFoRnZDLEVBZ0YrQyxNQWhGL0MsRUFpRmpCLE1BakZpQixFQWlGVCxNQWpGUyxFQWlGRCxNQWpGQyxFQWlGTyxNQWpGUCxFQWlGZSxNQWpGZixFQWlGdUIsTUFqRnZCLEVBaUYrQixNQWpGL0IsRUFpRnVDLE1BakZ2QyxFQWlGK0MsTUFqRi9DLEVBa0ZqQixNQWxGaUIsRUFrRlQsTUFsRlMsRUFrRkQsTUFsRkMsRUFrRk8sTUFsRlAsRUFrRmUsTUFsRmYsRUFrRnVCLE1BbEZ2QixFQWtGK0IsTUFsRi9CLEVBa0Z1QyxNQWxGdkMsRUFrRitDLE1BbEYvQyxFQW1GakIsTUFuRmlCLEVBbUZULE1BbkZTLEVBbUZELE1BbkZDLEVBbUZPLE1BbkZQLEVBbUZlLE1BbkZmLEVBbUZ1QixNQW5GdkIsRUFtRitCLE1BbkYvQixFQW1GdUMsTUFuRnZDLEVBbUYrQyxNQW5GL0MsRUFvRmpCLE1BcEZpQixFQW9GVCxNQXBGUyxFQW9GRCxNQXBGQyxFQW9GTyxNQXBGUCxFQW9GZSxNQXBGZixFQW9GdUIsTUFwRnZCLEVBb0YrQixNQXBGL0IsRUFvRnVDLE1BcEZ2QyxFQW9GK0MsTUFwRi9DLEVBcUZqQixNQXJGaUIsRUFxRlQsTUFyRlMsRUFxRkQsTUFyRkMsRUFxRk8sTUFyRlAsRUFxRmUsTUFyRmYsRUFxRnVCLE1BckZ2QixFQXFGK0IsTUFyRi9CLEVBcUZ1QyxNQXJGdkMsRUFxRitDLE1BckYvQyxFQXNGakIsTUF0RmlCLEVBc0ZULE1BdEZTLEVBc0ZELE1BdEZDLEVBc0ZPLE1BdEZQLEVBc0ZlLE1BdEZmLEVBc0Z1QixNQXRGdkIsRUFzRitCLE1BdEYvQixFQXNGdUMsTUF0RnZDLEVBc0YrQyxNQXRGL0MsRUF1RmpCLE1BdkZpQixFQXVGVCxNQXZGUyxFQXVGRCxNQXZGQyxFQXVGTyxNQXZGUCxFQXVGZSxNQXZGZixFQXVGdUIsTUF2RnZCLEVBdUYrQixNQXZGL0IsRUF1RnVDLE1BdkZ2QyxFQXVGK0MsTUF2Ri9DLEVBd0ZqQixNQXhGaUIsRUF3RlQsTUF4RlMsRUF3RkQsTUF4RkMsRUF3Rk8sTUF4RlAsRUF3RmUsTUF4RmYsRUF3RnVCLE1BeEZ2QixFQXdGK0IsTUF4Ri9CLEVBd0Z1QyxNQXhGdkMsRUF3RitDLE1BeEYvQyxFQXlGakIsTUF6RmlCLEVBeUZULE1BekZTLEVBeUZELE1BekZDLEVBeUZPLE1BekZQLEVBeUZlLE1BekZmLEVBeUZ1QixNQXpGdkIsRUF5RitCLE1BekYvQixFQXlGdUMsTUF6RnZDLEVBeUYrQyxNQXpGL0MsRUEwRmpCLE1BMUZpQixFQTBGVCxNQTFGUyxFQTBGRCxNQTFGQyxFQTBGTyxNQTFGUCxFQTBGZSxNQTFGZixFQTBGdUIsTUExRnZCLEVBMEYrQixNQTFGL0IsRUEwRnVDLE1BMUZ2QyxFQTBGK0MsTUExRi9DLEVBMkZqQixNQTNGaUIsRUEyRlQsTUEzRlMsRUEyRkQsTUEzRkMsRUEyRk8sTUEzRlAsRUEyRmUsTUEzRmYsRUEyRnVCLE1BM0Z2QixFQTJGK0IsTUEzRi9CLEVBMkZ1QyxNQTNGdkMsRUEyRitDLE1BM0YvQyxFQTRGakIsTUE1RmlCLEVBNEZULE1BNUZTLEVBNEZELE1BNUZDLEVBNEZPLE1BNUZQLEVBNEZlLE1BNUZmLEVBNEZ1QixNQTVGdkIsRUE0RitCLE1BNUYvQixFQTRGdUMsTUE1RnZDLEVBNEYrQyxNQTVGL0MsRUE2RmpCLE1BN0ZpQixFQTZGVCxNQTdGUyxFQTZGRCxNQTdGQyxFQTZGTyxNQTdGUCxFQTZGZSxNQTdGZixFQTZGdUIsTUE3RnZCLEVBNkYrQixNQTdGL0IsRUE2RnVDLE1BN0Z2QyxFQTZGK0MsTUE3Ri9DLEVBOEZqQixNQTlGaUIsRUE4RlQsTUE5RlMsRUE4RkQsTUE5RkMsRUE4Rk8sTUE5RlAsRUE4RmUsTUE5RmYsRUE4RnVCLE1BOUZ2QixFQThGK0IsTUE5Ri9CLEVBOEZ1QyxNQTlGdkMsRUE4RitDLE1BOUYvQyxFQStGakIsTUEvRmlCLEVBK0ZULE1BL0ZTLEVBK0ZELE1BL0ZDLEVBK0ZPLE1BL0ZQLEVBK0ZlLE1BL0ZmLEVBK0Z1QixNQS9GdkIsRUErRitCLE1BL0YvQixFQStGdUMsTUEvRnZDLEVBK0YrQyxNQS9GL0MsRUFnR2pCLE1BaEdpQixFQWdHVCxNQWhHUyxFQWdHRCxNQWhHQyxFQWdHTyxNQWhHUCxFQWdHZSxNQWhHZixFQWdHdUIsTUFoR3ZCLEVBZ0crQixNQWhHL0IsRUFnR3VDLE1BaEd2QyxFQWdHK0MsTUFoRy9DLEVBaUdqQixNQWpHaUIsRUFpR1QsTUFqR1MsRUFpR0QsTUFqR0MsRUFpR08sTUFqR1AsRUFpR2UsTUFqR2YsRUFpR3VCLE1Bakd2QixFQWlHK0IsTUFqRy9CLEVBaUd1QyxNQWpHdkMsRUFpRytDLE1BakcvQyxFQWtHakIsTUFsR2lCLEVBa0dULE1BbEdTLEVBa0dELE1BbEdDLEVBa0dPLE1BbEdQLEVBa0dlLE1BbEdmLEVBa0d1QixNQWxHdkIsRUFrRytCLE1BbEcvQixFQWtHdUMsTUFsR3ZDLEVBa0crQyxNQWxHL0MsRUFtR2pCLE1BbkdpQixFQW1HVCxNQW5HUyxFQW1HRCxNQW5HQyxFQW1HTyxNQW5HUCxFQW1HZSxNQW5HZixFQW1HdUIsTUFuR3ZCLEVBbUcrQixNQW5HL0IsRUFtR3VDLE1Bbkd2QyxFQW1HK0MsTUFuRy9DLEVBb0dqQixNQXBHaUIsRUFvR1QsTUFwR1MsRUFvR0QsTUFwR0MsRUFvR08sTUFwR1AsRUFvR2UsTUFwR2YsRUFvR3VCLE1BcEd2QixFQW9HK0IsTUFwRy9CLEVBb0d1QyxNQXBHdkMsRUFvRytDLE1BcEcvQyxFQXFHakIsTUFyR2lCLEVBcUdULE1BckdTLEVBcUdELE1BckdDLEVBcUdPLE1BckdQLEVBcUdlLE1BckdmLEVBcUd1QixNQXJHdkIsRUFxRytCLE1BckcvQixFQXFHdUMsTUFyR3ZDLEVBcUcrQyxNQXJHL0MsRUFzR2pCLE1BdEdpQixFQXNHVCxNQXRHUyxFQXNHRCxNQXRHQyxFQXNHTyxNQXRHUCxFQXNHZSxNQXRHZixFQXNHdUIsTUF0R3ZCLEVBc0crQixNQXRHL0IsRUFzR3VDLE1BdEd2QyxFQXNHK0MsTUF0Ry9DLEVBdUdqQixNQXZHaUIsRUF1R1QsTUF2R1MsRUF1R0QsTUF2R0MsRUF1R08sTUF2R1AsRUF1R2UsTUF2R2YsRUF1R3VCLE1Bdkd2QixFQXVHK0IsTUF2Ry9CLEVBdUd1QyxNQXZHdkMsRUF1RytDLE1BdkcvQyxFQXdHakIsTUF4R2lCLEVBd0dULE1BeEdTLEVBd0dELE1BeEdDLEVBd0dPLE1BeEdQLEVBd0dlLE1BeEdmLEVBd0d1QixNQXhHdkIsRUF3RytCLE1BeEcvQixFQXdHdUMsTUF4R3ZDLEVBd0crQyxNQXhHL0MsRUF5R2pCLE1BekdpQixFQXlHVCxNQXpHUyxFQXlHRCxNQXpHQyxFQXlHTyxNQXpHUCxFQXlHZSxNQXpHZixFQXlHdUIsTUF6R3ZCLEVBeUcrQixNQXpHL0IsRUF5R3VDLE1Bekd2QyxFQXlHK0MsTUF6Ry9DLEVBMEdqQixNQTFHaUIsRUEwR1QsTUExR1MsRUEwR0QsTUExR0MsRUEwR08sTUExR1AsRUEwR2UsTUExR2YsRUEwR3VCLE1BMUd2QixFQTBHK0IsTUExRy9CLEVBMEd1QyxNQTFHdkMsRUEwRytDLE1BMUcvQyxFQTJHakIsTUEzR2lCLEVBMkdULE1BM0dTLEVBMkdELE1BM0dDLEVBMkdPLE1BM0dQLEVBMkdlLE1BM0dmLEVBMkd1QixNQTNHdkIsRUEyRytCLE1BM0cvQixFQTJHdUMsTUEzR3ZDLEVBMkcrQyxNQTNHL0MsRUE0R2pCLE1BNUdpQixFQTRHVCxNQTVHUyxFQTRHRCxNQTVHQyxFQTRHTyxNQTVHUCxFQTRHZSxNQTVHZixFQTRHdUIsTUE1R3ZCLEVBNEcrQixNQTVHL0IsRUE0R3VDLE1BNUd2QyxFQTRHK0MsTUE1Ry9DLEVBNkdqQixNQTdHaUIsRUE2R1QsTUE3R1MsRUE2R0QsTUE3R0MsRUE2R08sTUE3R1AsRUE2R2UsTUE3R2YsRUE2R3VCLE1BN0d2QixFQTZHK0IsTUE3Ry9CLEVBNkd1QyxNQTdHdkMsRUE2RytDLE1BN0cvQyxFQThHakIsTUE5R2lCLEVBOEdULE1BOUdTLEVBOEdELE1BOUdDLEVBOEdPLE1BOUdQLEVBOEdlLE1BOUdmLEVBOEd1QixNQTlHdkIsRUE4RytCLE1BOUcvQixFQThHdUMsTUE5R3ZDLEVBOEcrQyxNQTlHL0MsRUErR2pCLE1BL0dpQixFQStHVCxNQS9HUyxFQStHRCxNQS9HQyxFQStHTyxNQS9HUCxFQStHZSxNQS9HZixFQStHdUIsTUEvR3ZCLEVBK0crQixNQS9HL0IsRUErR3VDLE1BL0d2QyxFQStHK0MsTUEvRy9DLEVBZ0hqQixNQWhIaUIsRUFnSFQsTUFoSFMsRUFnSEQsTUFoSEMsRUFnSE8sTUFoSFAsRUFnSGUsTUFoSGYsRUFnSHVCLE1BaEh2QixFQWdIK0IsTUFoSC9CLEVBZ0h1QyxNQWhIdkMsRUFnSCtDLE1BaEgvQyxFQWlIakIsTUFqSGlCLEVBaUhULE1BakhTLEVBaUhELE1BakhDLEVBaUhPLE1BakhQLEVBaUhlLE1BakhmLEVBaUh1QixNQWpIdkIsRUFpSCtCLE1BakgvQixFQWlIdUMsTUFqSHZDLEVBaUgrQyxNQWpIL0MsRUFrSGpCLE1BbEhpQixFQWtIVCxNQWxIUyxFQWtIRCxNQWxIQyxFQWtITyxNQWxIUCxFQWtIZSxNQWxIZixFQWtIdUIsTUFsSHZCLEVBa0grQixNQWxIL0IsRUFrSHVDLE1BbEh2QyxFQWtIK0MsTUFsSC9DLEVBbUhqQixNQW5IaUIsRUFtSFQsTUFuSFMsRUFtSEQsTUFuSEMsRUFtSE8sTUFuSFAsRUFtSGUsTUFuSGYsRUFtSHVCLE1Bbkh2QixFQW1IK0IsTUFuSC9CLEVBbUh1QyxNQW5IdkMsRUFtSCtDLE1BbkgvQyxFQW9IakIsTUFwSGlCLEVBb0hULE1BcEhTLEVBb0hELE1BcEhDLEVBb0hPLE1BcEhQLEVBb0hlLE1BcEhmLEVBb0h1QixNQXBIdkIsRUFvSCtCLE1BcEgvQixFQW9IdUMsTUFwSHZDLEVBb0grQyxNQXBIL0MsRUFxSGpCLE1BckhpQixFQXFIVCxNQXJIUyxFQXFIRCxNQXJIQyxFQXFITyxNQXJIUCxFQXFIZSxNQXJIZixFQXFIdUIsTUFySHZCLEVBcUgrQixNQXJIL0IsRUFxSHVDLE1Bckh2QyxFQXFIK0MsTUFySC9DLEVBc0hqQixNQXRIaUIsRUFzSFQsTUF0SFMsRUFzSEQsTUF0SEMsRUFzSE8sTUF0SFAsRUFzSGUsTUF0SGYsRUFzSHVCLE1BdEh2QixFQXNIK0IsTUF0SC9CLEVBc0h1QyxNQXRIdkMsRUFzSCtDLE1BdEgvQyxFQXVIakIsTUF2SGlCLEVBdUhULE1BdkhTLEVBdUhELE1BdkhDLEVBdUhPLE1BdkhQLEVBdUhlLE1BdkhmLEVBdUh1QixNQXZIdkIsRUF1SCtCLE1BdkgvQixFQXVIdUMsTUF2SHZDLEVBdUgrQyxNQXZIL0MsRUF3SGpCLE1BeEhpQixFQXdIVCxNQXhIUyxFQXdIRCxNQXhIQyxFQXdITyxNQXhIUCxFQXdIZSxNQXhIZixFQXdIdUIsTUF4SHZCLEVBd0grQixNQXhIL0IsRUF3SHVDLE1BeEh2QyxFQXdIK0MsTUF4SC9DLEVBeUhqQixNQXpIaUIsRUF5SFQsTUF6SFMsRUF5SEQsTUF6SEMsRUF5SE8sTUF6SFAsRUF5SGUsTUF6SGYsRUF5SHVCLE1Bekh2QixFQXlIK0IsTUF6SC9CLEVBeUh1QyxNQXpIdkMsRUF5SCtDLE1BekgvQyxFQTBIakIsTUExSGlCLEVBMEhULE1BMUhTLEVBMEhELE1BMUhDLEVBMEhPLE1BMUhQLEVBMEhlLE1BMUhmLEVBMEh1QixNQTFIdkIsRUEwSCtCLE1BMUgvQixFQTBIdUMsTUExSHZDLEVBMEgrQyxNQTFIL0MsRUEySGpCLE1BM0hpQixFQTJIVCxNQTNIUyxFQTJIRCxNQTNIQyxFQTJITyxNQTNIUCxFQTJIZSxNQTNIZixFQTJIdUIsTUEzSHZCLEVBMkgrQixNQTNIL0IsRUEySHVDLE1BM0h2QyxFQTJIK0MsTUEzSC9DLEVBNEhqQixNQTVIaUIsRUE0SFQsTUE1SFMsRUE0SEQsTUE1SEMsRUE0SE8sTUE1SFAsRUE0SGUsTUE1SGYsRUE0SHVCLE1BNUh2QixFQTRIK0IsTUE1SC9CLEVBNEh1QyxNQTVIdkMsRUE0SCtDLE1BNUgvQyxFQTZIakIsTUE3SGlCLEVBNkhULE1BN0hTLEVBNkhELE1BN0hDLEVBNkhPLE1BN0hQLEVBNkhlLE1BN0hmLEVBNkh1QixNQTdIdkIsRUE2SCtCLE1BN0gvQixFQTZIdUMsTUE3SHZDLEVBNkgrQyxNQTdIL0MsRUE4SGpCLE1BOUhpQixFQThIVCxNQTlIUyxFQThIRCxNQTlIQyxFQThITyxNQTlIUCxFQThIZSxNQTlIZixFQThIdUIsTUE5SHZCLEVBOEgrQixNQTlIL0IsRUE4SHVDLE1BOUh2QyxFQThIK0MsTUE5SC9DLEVBK0hqQixNQS9IaUIsRUErSFQsTUEvSFMsRUErSEQsTUEvSEMsRUErSE8sTUEvSFAsRUErSGUsTUEvSGYsRUErSHVCLE1BL0h2QixFQStIK0IsTUEvSC9CLEVBK0h1QyxNQS9IdkMsRUErSCtDLE1BL0gvQyxFQWdJakIsTUFoSWlCLEVBZ0lULE1BaElTLEVBZ0lELE1BaElDLEVBZ0lPLE1BaElQLEVBZ0llLE1BaElmLEVBZ0l1QixNQWhJdkIsRUFnSStCLE1BaEkvQixFQWdJdUMsTUFoSXZDLEVBZ0krQyxNQWhJL0MsRUFpSWpCLE1BaklpQixFQWlJVCxNQWpJUyxFQWlJRCxNQWpJQyxFQWlJTyxNQWpJUCxFQWlJZSxNQWpJZixFQWlJdUIsTUFqSXZCLEVBaUkrQixNQWpJL0IsRUFpSXVDLE1Bakl2QyxFQWlJK0MsTUFqSS9DLEVBa0lqQixNQWxJaUIsRUFrSVQsTUFsSVMsRUFrSUQsTUFsSUMsRUFrSU8sTUFsSVAsRUFrSWUsTUFsSWYsRUFrSXVCLE1BbEl2QixFQWtJK0IsTUFsSS9CLEVBa0l1QyxNQWxJdkMsRUFrSStDLE1BbEkvQyxFQW1JakIsTUFuSWlCLEVBbUlULE1BbklTLEVBbUlELE1BbklDLEVBbUlPLE1BbklQLEVBbUllLE1BbklmLEVBbUl1QixNQW5JdkIsRUFtSStCLE1BbkkvQixFQW1JdUMsTUFuSXZDLEVBbUkrQyxNQW5JL0MsRUFvSWpCLE1BcElpQixFQW9JVCxNQXBJUyxFQW9JRCxNQXBJQyxFQW9JTyxNQXBJUCxFQW9JZSxNQXBJZixFQW9JdUIsTUFwSXZCLEVBb0krQixNQXBJL0IsRUFvSXVDLE1BcEl2QyxFQW9JK0MsTUFwSS9DLEVBcUlqQixNQXJJaUIsRUFxSVQsTUFySVMsRUFxSUQsTUFySUMsRUFxSU8sTUFySVAsRUFxSWUsTUFySWYsRUFxSXVCLE1Bckl2QixFQXFJK0IsTUFySS9CLEVBcUl1QyxNQXJJdkMsRUFxSStDLE1BckkvQyxFQXNJakIsTUF0SWlCLEVBc0lULE1BdElTLEVBc0lELE1BdElDLEVBc0lPLE1BdElQLEVBc0llLE1BdElmLEVBc0l1QixNQXRJdkIsRUFzSStCLE1BdEkvQixFQXNJdUMsTUF0SXZDLEVBc0krQyxNQXRJL0MsRUF1SWpCLE1BdklpQixFQXVJVCxNQXZJUyxFQXVJRCxNQXZJQyxFQXVJTyxNQXZJUCxFQXVJZSxNQXZJZixFQXVJdUIsTUF2SXZCLEVBdUkrQixNQXZJL0IsRUF1SXVDLE1Bdkl2QyxFQXVJK0MsTUF2SS9DLEVBd0lqQixNQXhJaUIsRUF3SVQsTUF4SVMsRUF3SUQsTUF4SUMsRUF3SU8sTUF4SVAsRUF3SWUsTUF4SWYsRUF3SXVCLE1BeEl2QixFQXdJK0IsTUF4SS9CLEVBd0l1QyxNQXhJdkMsRUF3SStDLE1BeEkvQyxFQXlJakIsTUF6SWlCLEVBeUlULE1BeklTLEVBeUlELE1BeklDLEVBeUlPLE1BeklQLEVBeUllLE1BeklmLEVBeUl1QixNQXpJdkIsRUF5SStCLE1BekkvQixFQXlJdUMsTUF6SXZDLEVBeUkrQyxNQXpJL0MsRUEwSWpCLE1BMUlpQixFQTBJVCxNQTFJUyxFQTBJRCxNQTFJQyxFQTBJTyxNQTFJUCxFQTBJZSxNQTFJZixFQTBJdUIsTUExSXZCLEVBMEkrQixNQTFJL0IsRUEwSXVDLE1BMUl2QyxFQTBJK0MsTUExSS9DLEVBMklqQixNQTNJaUIsRUEySVQsTUEzSVMsRUEySUQsTUEzSUMsRUEySU8sTUEzSVAsRUEySWUsT0EzSWYsRUEySXdCLE9BM0l4QixFQTJJaUMsT0EzSWpDLEVBMkkwQyxPQTNJMUMsRUE0SWpCLE9BNUlpQixFQTRJUixPQTVJUSxFQTRJQyxPQTVJRCxFQTRJVSxPQTVJVixFQTRJbUIsT0E1SW5CLEVBNEk0QixPQTVJNUIsRUE0SXFDLE9BNUlyQyxFQTRJOEMsT0E1STlDLEVBNklqQixPQTdJaUIsRUE2SVIsT0E3SVEsRUE2SUMsT0E3SUQsRUE2SVUsT0E3SVYsRUE2SW1CLE9BN0luQixFQTZJNEIsT0E3STVCLEVBNklxQyxPQTdJckMsRUE2SThDLE9BN0k5QyxFQThJakIsT0E5SWlCLEVBOElSLE9BOUlRLEVBOElDLE9BOUlELEVBOElVLE9BOUlWLEVBOEltQixPQTlJbkIsRUE4STRCLE9BOUk1QixFQThJcUMsT0E5SXJDLEVBOEk4QyxPQTlJOUMsRUErSWpCLE9BL0lpQixFQStJUixPQS9JUSxFQStJQyxPQS9JRCxFQStJVSxPQS9JVixFQStJbUIsT0EvSW5CLEVBK0k0QixPQS9JNUIsRUErSXFDLE9BL0lyQyxFQStJOEMsT0EvSTlDLEVBZ0pqQixPQWhKaUIsRUFnSlIsT0FoSlEsRUFnSkMsT0FoSkQsRUFnSlUsT0FoSlYsRUFnSm1CLE9BaEpuQixFQWdKNEIsT0FoSjVCLEVBZ0pxQyxPQWhKckMsRUFnSjhDLE9BaEo5QyxFQWlKakIsT0FqSmlCLEVBaUpSLE9BakpRLEVBaUpDLE9BakpELEVBaUpVLE9BakpWLEVBaUptQixPQWpKbkIsRUFpSjRCLE9Bako1QixFQWlKcUMsT0FqSnJDLEVBaUo4QyxPQWpKOUMsRUFrSmpCLE9BbEppQixFQWtKUixPQWxKUSxFQWtKQyxPQWxKRCxFQWtKVSxPQWxKVixFQWtKbUIsT0FsSm5CLEVBa0o0QixPQWxKNUIsRUFrSnFDLE9BbEpyQyxFQWtKOEMsT0FsSjlDLEVBbUpqQixPQW5KaUIsRUFtSlIsT0FuSlEsRUFtSkMsT0FuSkQsRUFtSlUsT0FuSlYsRUFtSm1CLE9BbkpuQixFQW1KNEIsT0FuSjVCLEVBbUpxQyxPQW5KckMsRUFtSjhDLE9Bbko5QyxFQW9KakIsT0FwSmlCLEVBb0pSLE9BcEpRLEVBb0pDLE9BcEpELEVBb0pVLE9BcEpWLEVBb0ptQixPQXBKbkIsRUFvSjRCLE9BcEo1QixFQW9KcUMsT0FwSnJDLEVBb0o4QyxPQXBKOUMsRUFxSmpCLE9BckppQixFQXFKUixPQXJKUSxFQXFKQyxPQXJKRCxFQXFKVSxPQXJKVixFQXFKbUIsT0FySm5CLEVBcUo0QixPQXJKNUIsRUFxSnFDLE9BckpyQyxFQXFKOEMsT0FySjlDLEVBc0pqQixPQXRKaUIsRUFzSlIsT0F0SlEsRUFzSkMsT0F0SkQsRUFzSlUsT0F0SlYsRUFzSm1CLE9BdEpuQixFQXNKNEIsT0F0SjVCLEVBc0pxQyxPQXRKckMsRUFzSjhDLE9BdEo5QyxFQXVKakIsT0F2SmlCLEVBdUpSLE9BdkpRLEVBdUpDLE9BdkpELEVBdUpVLE9BdkpWLEVBdUptQixPQXZKbkIsRUF1SjRCLE9Bdko1QixFQXVKcUMsT0F2SnJDLEVBdUo4QyxPQXZKOUMsRUF3SmpCLE9BeEppQixFQXdKUixPQXhKUSxFQXdKQyxPQXhKRCxFQXdKVSxPQXhKVixFQXdKbUIsT0F4Sm5CLEVBd0o0QixPQXhKNUIsRUF3SnFDLE9BeEpyQyxFQXdKOEMsT0F4SjlDLEVBeUpqQixPQXpKaUIsRUF5SlIsT0F6SlEsRUF5SkMsT0F6SkQsRUF5SlUsT0F6SlYsRUF5Sm1CLE9BekpuQixFQXlKNEIsT0F6SjVCLEVBeUpxQyxPQXpKckMsRUF5SjhDLE9Beko5QyxFQTBKakIsT0ExSmlCLEVBMEpSLE9BMUpRLEVBMEpDLE9BMUpELEVBMEpVLE9BMUpWLEVBMEptQixPQTFKbkIsRUEwSjRCLE9BMUo1QixFQTBKcUMsT0ExSnJDLEVBMEo4QyxPQTFKOUMsRUEySmpCLE9BM0ppQixFQTJKUixPQTNKUSxFQTJKQyxPQTNKRCxFQTJKVSxPQTNKVixFQTJKbUIsT0EzSm5CLEVBMko0QixPQTNKNUIsRUEySnFDLE9BM0pyQyxFQTJKOEMsT0EzSjlDLEVBNEpqQixPQTVKaUIsRUE0SlIsT0E1SlEsRUE0SkMsT0E1SkQsRUE0SlUsT0E1SlYsRUE0Sm1CLE9BNUpuQixFQTRKNEIsT0E1SjVCLEVBNEpxQyxPQTVKckMsRUE0SjhDLE9BNUo5QyxFQTZKakIsT0E3SmlCLEVBNkpSLE9BN0pRLEVBNkpDLE9BN0pELEVBNkpVLE9BN0pWLEVBNkptQixPQTdKbkIsRUE2SjRCLE9BN0o1QixFQTZKcUMsT0E3SnJDLEVBNko4QyxPQTdKOUMsRUE4SmpCLE9BOUppQixFQThKUixPQTlKUSxFQThKQyxPQTlKRCxFQThKVSxPQTlKVixFQThKbUIsT0E5Sm5CLEVBOEo0QixPQTlKNUIsRUE4SnFDLE9BOUpyQyxFQThKOEMsT0E5SjlDLEVBK0pqQixPQS9KaUIsRUErSlIsT0EvSlEsRUErSkMsT0EvSkQsRUErSlUsT0EvSlYsRUErSm1CLE9BL0puQixFQStKNEIsT0EvSjVCLEVBK0pxQyxPQS9KckMsRUErSjhDLE9BL0o5QyxFQWdLakIsT0FoS2lCLEVBZ0tSLE9BaEtRLEVBZ0tDLE9BaEtELEVBZ0tVLE9BaEtWLEVBZ0ttQixPQWhLbkIsRUFnSzRCLE9BaEs1QixFQWdLcUMsT0FoS3JDLEVBZ0s4QyxPQWhLOUMsRUFpS2pCLE9BaktpQixFQWlLUixPQWpLUSxFQWlLQyxPQWpLRCxFQWlLVSxPQWpLVixFQWlLbUIsT0FqS25CLEVBaUs0QixPQWpLNUIsRUFpS3FDLE9BaktyQyxFQWlLOEMsT0FqSzlDLEVBa0tqQixPQWxLaUIsRUFrS1IsT0FsS1EsRUFrS0MsT0FsS0QsRUFrS1UsT0FsS1YsRUFrS21CLE9BbEtuQixFQWtLNEIsT0FsSzVCLEVBa0txQyxPQWxLckMsRUFrSzhDLE9BbEs5QyxFQW1LakIsT0FuS2lCLEVBbUtSLE9BbktRLEVBbUtDLE9BbktELEVBbUtVLE9BbktWLEVBbUttQixPQW5LbkIsRUFtSzRCLE9Bbks1QixFQW1LcUMsT0FuS3JDLEVBbUs4QyxPQW5LOUMsRUFvS2pCLE9BcEtpQixFQW9LUixPQXBLUSxFQW9LQyxPQXBLRCxFQW9LVSxPQXBLVixFQW9LbUIsT0FwS25CLEVBb0s0QixPQXBLNUIsRUFvS3FDLE9BcEtyQyxFQW9LOEMsT0FwSzlDLEVBcUtqQixPQXJLaUIsRUFxS1IsT0FyS1EsRUFxS0MsT0FyS0QsRUFxS1UsT0FyS1YsRUFxS21CLE9BcktuQixFQXFLNEIsT0FySzVCLEVBcUtxQyxPQXJLckMsRUFxSzhDLE9Bcks5QyxFQXNLakIsT0F0S2lCLEVBc0tSLE9BdEtRLEVBc0tDLE9BdEtELEVBc0tVLE9BdEtWLEVBc0ttQixPQXRLbkIsRUFzSzRCLE9BdEs1QixFQXNLcUMsT0F0S3JDLEVBc0s4QyxPQXRLOUMsRUF1S2pCLE9BdktpQixFQXVLUixPQXZLUSxFQXVLQyxPQXZLRCxFQXVLVSxPQXZLVixFQXVLbUIsT0F2S25CLEVBdUs0QixPQXZLNUIsRUF1S3FDLE9BdktyQyxFQXVLOEMsT0F2SzlDLEVBd0tqQixPQXhLaUIsRUF3S1IsT0F4S1EsRUF3S0MsT0F4S0QsRUF3S1UsT0F4S1YsRUF3S21CLE9BeEtuQixFQXdLNEIsT0F4SzVCLEVBd0txQyxPQXhLckMsRUF3SzhDLE9BeEs5QyxFQXlLakIsT0F6S2lCLEVBeUtSLE9BektRLEVBeUtDLE9BektELEVBeUtVLE9BektWLEVBeUttQixPQXpLbkIsRUF5SzRCLE9Beks1QixFQXlLcUMsT0F6S3JDLEVBeUs4QyxPQXpLOUMsRUEwS2pCLE9BMUtpQixFQTBLUixPQTFLUSxFQTBLQyxPQTFLRCxFQTBLVSxPQTFLVixFQTBLbUIsT0ExS25CLEVBMEs0QixPQTFLNUIsRUEwS3FDLE9BMUtyQyxFQTBLOEMsT0ExSzlDLEVBMktqQixPQTNLaUIsRUEyS1IsT0EzS1EsRUEyS0MsT0EzS0QsRUEyS1UsT0EzS1YsRUEyS21CLE9BM0tuQixFQTJLNEIsT0EzSzVCLEVBMktxQyxPQTNLckMsRUEySzhDLE9BM0s5QyxFQTRLakIsT0E1S2lCLEVBNEtSLE9BNUtRLEVBNEtDLE9BNUtELEVBNEtVLE9BNUtWLEVBNEttQixPQTVLbkIsRUE0SzRCLE9BNUs1QixFQTRLcUMsT0E1S3JDLEVBNEs4QyxPQTVLOUMsRUE2S2pCLE9BN0tpQixFQTZLUixPQTdLUSxFQTZLQyxPQTdLRCxFQTZLVSxPQTdLVixFQTZLbUIsT0E3S25CLEVBNks0QixPQTdLNUIsRUE2S3FDLE9BN0tyQyxFQTZLOEMsT0E3SzlDLEVBOEtqQixPQTlLaUIsRUE4S1IsT0E5S1EsRUE4S0MsT0E5S0QsRUE4S1UsT0E5S1YsRUE4S21CLE9BOUtuQixFQThLNEIsT0E5SzVCLEVBOEtxQyxPQTlLckMsRUE4SzhDLE9BOUs5QyxFQStLakIsT0EvS2lCLEVBK0tSLE9BL0tRLEVBK0tDLE9BL0tELEVBK0tVLE9BL0tWLEVBK0ttQixPQS9LbkIsRUErSzRCLE9BL0s1QixFQStLcUMsT0EvS3JDLEVBK0s4QyxPQS9LOUMsRUFnTGpCLE9BaExpQixFQWdMUixPQWhMUSxFQWdMQyxPQWhMRCxFQWdMVSxPQWhMVixFQWdMbUIsT0FoTG5CLEVBZ0w0QixPQWhMNUIsRUFnTHFDLE9BaExyQyxFQWdMOEMsT0FoTDlDLEVBaUxqQixPQWpMaUIsRUFpTFIsT0FqTFEsRUFpTEMsT0FqTEQsRUFpTFUsT0FqTFYsRUFpTG1CLE9BakxuQixFQWlMNEIsT0FqTDVCLEVBaUxxQyxPQWpMckMsRUFpTDhDLE9Bakw5QyxFQWtMakIsT0FsTGlCLEVBa0xSLE9BbExRLEVBa0xDLE9BbExELEVBa0xVLE9BbExWLEVBa0xtQixPQWxMbkIsRUFrTDRCLE9BbEw1QixFQWtMcUMsT0FsTHJDLEVBa0w4QyxPQWxMOUMsRUFtTGpCLE9BbkxpQixFQW1MUixPQW5MUSxFQW1MQyxPQW5MRCxFQW1MVSxPQW5MVixFQW1MbUIsT0FuTG5CLEVBbUw0QixPQW5MNUIsRUFtTHFDLE9BbkxyQyxFQW1MOEMsT0FuTDlDLEVBb0xqQixPQXBMaUIsRUFvTFIsT0FwTFEsRUFvTEMsT0FwTEQsRUFvTFUsT0FwTFYsRUFvTG1CLE9BcExuQixFQW9MNEIsT0FwTDVCLEVBb0xxQyxPQXBMckMsRUFvTDhDLE9BcEw5QyxFQXFMakIsT0FyTGlCLEVBcUxSLE9BckxRLEVBcUxDLE9BckxELEVBcUxVLE9BckxWLEVBcUxtQixPQXJMbkIsRUFxTDRCLE9Bckw1QixFQXFMcUMsT0FyTHJDLEVBcUw4QyxPQXJMOUMsRUFzTGpCLE9BdExpQixFQXNMUixPQXRMUSxFQXNMQyxPQXRMRCxFQXNMVSxPQXRMVixFQXNMbUIsT0F0TG5CLEVBc0w0QixPQXRMNUIsRUFzTHFDLE9BdExyQyxFQXNMOEMsT0F0TDlDLEVBdUxqQixPQXZMaUIsRUF1TFIsT0F2TFEsRUF1TEMsT0F2TEQsRUF1TFUsT0F2TFYsRUF1TG1CLE9BdkxuQixFQXVMNEIsT0F2TDVCLEVBdUxxQyxPQXZMckMsRUF1TDhDLE9Bdkw5QyxFQXdMakIsT0F4TGlCLEVBd0xSLE9BeExRLEVBd0xDLE9BeExELEVBd0xVLE9BeExWLEVBd0xtQixPQXhMbkIsRUF3TDRCLE9BeEw1QixFQXdMcUMsT0F4THJDLEVBd0w4QyxPQXhMOUMsRUF5TGpCLE9BekxpQixFQXlMUixPQXpMUSxFQXlMQyxPQXpMRCxFQXlMVSxPQXpMVixFQXlMbUIsT0F6TG5CLEVBeUw0QixPQXpMNUIsRUF5THFDLE9BekxyQyxFQXlMOEMsT0F6TDlDLEVBMExqQixPQTFMaUIsRUEwTFIsT0ExTFEsRUEwTEMsT0ExTEQsRUEwTFUsT0ExTFYsRUEwTG1CLE9BMUxuQixFQTBMNEIsT0ExTDVCLEVBMExxQyxPQTFMckMsRUEwTDhDLE9BMUw5QyxFQTJMakIsT0EzTGlCLEVBMkxSLE9BM0xRLEVBMkxDLE9BM0xELEVBMkxVLE9BM0xWLEVBMkxtQixPQTNMbkIsRUEyTDRCLE9BM0w1QixFQTJMcUMsT0EzTHJDLEVBMkw4QyxPQTNMOUMsRUE0TGpCLE9BNUxpQixFQTRMUixPQTVMUSxFQTRMQyxPQTVMRCxFQTRMVSxPQTVMVixFQTRMbUIsT0E1TG5CLEVBNEw0QixPQTVMNUIsRUE0THFDLE9BNUxyQyxFQTRMOEMsT0E1TDlDLEVBNkxqQixPQTdMaUIsRUE2TFIsT0E3TFEsRUE2TEMsT0E3TEQsRUE2TFUsT0E3TFYsRUE2TG1CLE9BN0xuQixFQTZMNEIsT0E3TDVCLEVBNkxxQyxPQTdMckMsRUE2TDhDLE9BN0w5QyxFQThMakIsT0E5TGlCLEVBOExSLE9BOUxRLEVBOExDLE9BOUxELEVBOExVLE9BOUxWLEVBOExtQixPQTlMbkIsRUE4TDRCLE9BOUw1QixFQThMcUMsT0E5THJDLEVBOEw4QyxPQTlMOUMsRUErTGpCLE9BL0xpQixFQStMUixPQS9MUSxFQStMQyxPQS9MRCxFQStMVSxPQS9MVixFQStMbUIsT0EvTG5CLEVBK0w0QixPQS9MNUIsRUErTHFDLE9BL0xyQyxFQStMOEMsT0EvTDlDLEVBZ01qQixPQWhNaUIsRUFnTVIsT0FoTVEsRUFnTUMsT0FoTUQsRUFnTVUsT0FoTVYsRUFnTW1CLE9BaE1uQixFQWdNNEIsT0FoTTVCLEVBZ01xQyxPQWhNckMsRUFnTThDLE9BaE05QyxFQWlNakIsT0FqTWlCLEVBaU1SLE9Bak1RLEVBaU1DLE9Bak1ELEVBaU1VLE9Bak1WLEVBaU1tQixPQWpNbkIsRUFpTTRCLE9Bak01QixFQWlNcUMsT0FqTXJDLEVBaU04QyxPQWpNOUMsRUFrTWpCLE9BbE1pQixFQWtNUixPQWxNUSxFQWtNQyxPQWxNRCxFQWtNVSxPQWxNVixFQWtNbUIsT0FsTW5CLEVBa000QixPQWxNNUIsRUFrTXFDLE9BbE1yQyxFQWtNOEMsT0FsTTlDLEVBbU1qQixPQW5NaUIsRUFtTVIsT0FuTVEsRUFtTUMsT0FuTUQsRUFtTVUsT0FuTVYsRUFtTW1CLE9Bbk1uQixFQW1NNEIsT0FuTTVCLEVBbU1xQyxPQW5NckMsRUFtTThDLE9Bbk05QyxFQW9NakIsT0FwTWlCLEVBb01SLE9BcE1RLEVBb01DLE9BcE1ELEVBb01VLE9BcE1WLEVBb01tQixPQXBNbkIsRUFvTTRCLE9BcE01QixFQW9NcUMsT0FwTXJDLEVBb004QyxPQXBNOUMsRUFxTWpCLE9Bck1pQixFQXFNUixPQXJNUSxFQXFNQyxPQXJNRCxFQXFNVSxPQXJNVixFQXFNbUIsT0FyTW5CLEVBcU00QixPQXJNNUIsRUFxTXFDLE9Bck1yQyxFQXFNOEMsT0FyTTlDLEVBc01qQixPQXRNaUIsRUFzTVIsT0F0TVEsRUFzTUMsT0F0TUQsRUFzTVUsT0F0TVYsRUFzTW1CLE9BdE1uQixFQXNNNEIsT0F0TTVCLEVBc01xQyxPQXRNckMsRUFzTThDLE9BdE05QyxFQXVNakIsT0F2TWlCLEVBdU1SLE9Bdk1RLEVBdU1DLE9Bdk1ELEVBdU1VLE9Bdk1WLEVBdU1tQixPQXZNbkIsRUF1TTRCLE9Bdk01QixFQXVNcUMsT0F2TXJDLEVBdU04QyxPQXZNOUMsRUF3TWpCLE9BeE1pQixFQXdNUixPQXhNUSxFQXdNQyxPQXhNRCxFQXdNVSxPQXhNVixFQXdNbUIsT0F4TW5CLEVBd000QixPQXhNNUIsRUF3TXFDLE9BeE1yQyxFQXdNOEMsT0F4TTlDLEVBeU1qQixPQXpNaUIsRUF5TVIsT0F6TVEsRUF5TUMsT0F6TUQsRUF5TVUsT0F6TVYsRUF5TW1CLE9Bek1uQixFQXlNNEIsT0F6TTVCLEVBeU1xQyxPQXpNckMsRUF5TThDLE9Bek05QyxFQTBNakIsT0ExTWlCLEVBME1SLE9BMU1RLEVBME1DLE9BMU1ELEVBME1VLE9BMU1WLEVBME1tQixPQTFNbkIsRUEwTTRCLE9BMU01QixFQTBNcUMsT0ExTXJDLEVBME04QyxPQTFNOUMsRUEyTWpCLE9BM01pQixFQTJNUixPQTNNUSxFQTJNQyxPQTNNRCxFQTJNVSxPQTNNVixFQTJNbUIsT0EzTW5CLEVBMk00QixPQTNNNUIsRUEyTXFDLE9BM01yQyxFQTJNOEMsT0EzTTlDLEVBNE1qQixPQTVNaUIsRUE0TVIsT0E1TVEsRUE0TUMsT0E1TUQsRUE0TVUsT0E1TVYsRUE0TW1CLE9BNU1uQixFQTRNNEIsT0E1TTVCLEVBNE1xQyxPQTVNckMsRUE0TThDLE9BNU05QyxFQTZNakIsT0E3TWlCLEVBNk1SLE9BN01RLEVBNk1DLE9BN01ELEVBNk1VLE9BN01WLEVBNk1tQixPQTdNbkIsRUE2TTRCLE9BN001QixFQTZNcUMsT0E3TXJDLEVBNk04QyxPQTdNOUMsRUE4TWpCLE9BOU1pQixFQThNUixPQTlNUSxFQThNQyxPQTlNRCxFQThNVSxPQTlNVixFQThNbUIsT0E5TW5CLEVBOE00QixPQTlNNUIsRUE4TXFDLE9BOU1yQyxFQThNOEMsT0E5TTlDLEVBK01qQixPQS9NaUIsRUErTVIsT0EvTVEsRUErTUMsT0EvTUQsRUErTVUsT0EvTVYsRUErTW1CLE9BL01uQixFQStNNEIsT0EvTTVCLEVBK01xQyxPQS9NckMsRUErTThDLE9BL005QyxFQWdOakIsT0FoTmlCLEVBZ05SLE9BaE5RLEVBZ05DLE9BaE5ELEVBZ05VLE9BaE5WLEVBZ05tQixPQWhObkIsRUFnTjRCLE9BaE41QixFQWdOcUMsT0FoTnJDLEVBZ044QyxPQWhOOUMsRUFpTmpCLE9Bak5pQixFQWlOUixPQWpOUSxFQWlOQyxPQWpORCxFQWlOVSxPQWpOVixFQWlObUIsT0FqTm5CLEVBaU40QixPQWpONUIsRUFpTnFDLE9Bak5yQyxFQWlOOEMsT0FqTjlDLEVBa05qQixPQWxOaUIsRUFrTlIsT0FsTlEsRUFrTkMsT0FsTkQsRUFrTlUsT0FsTlYsRUFrTm1CLE9BbE5uQixFQWtONEIsT0FsTjVCLEVBa05xQyxPQWxOckMsRUFrTjhDLE9BbE45QyxFQW1OakIsT0FuTmlCLEVBbU5SLE9Bbk5RLEVBbU5DLE9Bbk5ELEVBbU5VLE9Bbk5WLEVBbU5tQixPQW5ObkIsRUFtTjRCLE9Bbk41QixFQW1OcUMsT0FuTnJDLEVBbU44QyxPQW5OOUMsRUFvTmpCLE9BcE5pQixFQW9OUixPQXBOUSxFQW9OQyxPQXBORCxFQW9OVSxPQXBOVixFQW9ObUIsT0FwTm5CLEVBb040QixPQXBONUIsRUFvTnFDLE9BcE5yQyxFQW9OOEMsT0FwTjlDLEVBcU5qQixPQXJOaUIsRUFxTlIsT0FyTlEsRUFxTkMsT0FyTkQsRUFxTlUsT0FyTlYsRUFxTm1CLE9Bck5uQixFQXFONEIsT0FyTjVCLEVBcU5xQyxPQXJOckMsRUFxTjhDLE9Bck45QyxFQXNOakIsT0F0TmlCLEVBc05SLE9BdE5RLEVBc05DLE9BdE5ELEVBc05VLE9BdE5WLEVBc05tQixPQXRObkIsRUFzTjRCLE9BdE41QixFQXNOcUMsT0F0TnJDLEVBc044QyxPQXROOUMsRUF1TmpCLE9Bdk5pQixFQXVOUixPQXZOUSxFQXVOQyxPQXZORCxFQXVOVSxPQXZOVixFQXVObUIsUUF2Tm5CLENBQXJCOztBQXlOQSxTQUFTQyxhQUFULENBQXVCQyxNQUF2QixFQUErQjtBQUMzQixRQUFJQyxZQUFZLEVBQWhCO0FBQUEsUUFDSUMsT0FBTyxFQURYO0FBQUEsUUFFSUMsUUFGSjs7QUFJQSxRQUFJLENBQUNILE1BQUQsSUFBVyxDQUFDQSxPQUFPSSxVQUF2QixFQUFtQztBQUMvQixlQUFPLEtBQVA7QUFDSDs7QUFFRCxhQUFTQyxTQUFULENBQW1CSixTQUFuQixFQUE4QlQsSUFBOUIsRUFBb0M7QUFDaEMsYUFBSyxJQUFJaEUsSUFBSWdFLEtBQUtZLFVBQUwsQ0FBZ0J2SCxNQUFoQixHQUF5QixDQUF0QyxFQUF5QzJDLEtBQUssQ0FBOUMsRUFBaURBLEdBQWpELEVBQXNEO0FBQ2xEeUUsc0JBQVVMLElBQVYsQ0FBZUosS0FBS1ksVUFBTCxDQUFnQjVFLENBQWhCLENBQWY7QUFDSDtBQUNKOztBQUVELGFBQVM4RSxZQUFULENBQXNCTCxTQUF0QixFQUFpQztBQUM3QixZQUFJLENBQUNBLFNBQUQsSUFBYyxDQUFDQSxVQUFVcEgsTUFBN0IsRUFBcUM7QUFDakMsbUJBQU8sSUFBUDtBQUNIOztBQUVELFlBQUkyRyxPQUFPUyxVQUFVWCxHQUFWLEVBQVg7QUFBQSxZQUNJWSxPQUFPVixLQUFLZSxXQUFMLElBQW9CZixLQUFLZ0IsU0FEcEM7QUFFQSxZQUFJTixJQUFKLEVBQVU7QUFDTjtBQUNBO0FBQ0EsZ0JBQUlyRyxJQUFJcUcsS0FBS2xHLEtBQUwsQ0FBVyxZQUFYLENBQVI7QUFDQSxnQkFBSUgsQ0FBSixFQUFPO0FBQ0hvRywwQkFBVXBILE1BQVYsR0FBbUIsQ0FBbkI7QUFDQSx1QkFBT2dCLEVBQUUsQ0FBRixDQUFQO0FBQ0g7QUFDRCxtQkFBT3FHLElBQVA7QUFDSDtBQUNELFlBQUlWLEtBQUtSLE9BQUwsS0FBaUIsTUFBckIsRUFBNkI7QUFDekIsbUJBQU9zQixhQUFhTCxTQUFiLENBQVA7QUFDSDtBQUNELFlBQUlULEtBQUtZLFVBQVQsRUFBcUI7QUFDakJDLHNCQUFVSixTQUFWLEVBQXFCVCxJQUFyQjtBQUNBLG1CQUFPYyxhQUFhTCxTQUFiLENBQVA7QUFDSDtBQUNKOztBQUVESSxjQUFVSixTQUFWLEVBQXFCRCxNQUFyQjtBQUNBLFdBQVFFLE9BQU9JLGFBQWFMLFNBQWIsQ0FBZixFQUF5QztBQUNyQyxhQUFLLElBQUl6RSxJQUFJLENBQWIsRUFBZ0JBLElBQUkwRSxLQUFLckgsTUFBekIsRUFBaUMyQyxHQUFqQyxFQUFzQztBQUNsQzJFLHVCQUFXRCxLQUFLTyxVQUFMLENBQWdCakYsQ0FBaEIsQ0FBWDtBQUNBLGlCQUFLLElBQUlrRixJQUFJLENBQWIsRUFBZ0JBLElBQUlaLGVBQWVqSCxNQUFuQyxFQUEyQzZILEdBQTNDLEVBQWdEO0FBQzVDLG9CQUFJWixlQUFlWSxDQUFmLE1BQXNCUCxRQUExQixFQUFvQztBQUNoQywyQkFBTyxLQUFQO0FBQ0g7QUFDSjtBQUNKO0FBQ0o7QUFDRCxXQUFPLEtBQVA7QUFDSDs7QUFFRCxTQUFTUSxjQUFULENBQXdCaEYsR0FBeEIsRUFBNkI7QUFDekIsUUFBSSxPQUFPQSxJQUFJWSxJQUFYLEtBQW9CLFFBQXBCLEtBQ0NaLElBQUljLFdBQUosSUFBb0JkLElBQUlZLElBQUosSUFBWSxDQUFaLElBQWlCWixJQUFJWSxJQUFKLElBQVksR0FEbEQsQ0FBSixFQUM2RDtBQUN6RCxlQUFPWixJQUFJWSxJQUFYO0FBQ0g7QUFDRCxRQUFJLENBQUNaLElBQUlpRixLQUFMLElBQWMsQ0FBQ2pGLElBQUlpRixLQUFKLENBQVVDLGFBQXpCLElBQ0EsQ0FBQ2xGLElBQUlpRixLQUFKLENBQVVDLGFBQVYsQ0FBd0JDLFlBRDdCLEVBQzJDO0FBQ3ZDLGVBQU8sQ0FBQyxDQUFSO0FBQ0g7QUFDRCxRQUFJRixRQUFRakYsSUFBSWlGLEtBQWhCO0FBQUEsUUFDSUcsWUFBWUgsTUFBTUMsYUFEdEI7QUFBQSxRQUVJRyxRQUFRLENBRlo7QUFHQSxTQUFLLElBQUl4RixJQUFJLENBQWIsRUFBZ0JBLElBQUl1RixVQUFVbEksTUFBZCxJQUF3QmtJLFVBQVV2RixDQUFWLE1BQWlCb0YsS0FBekQsRUFBZ0VwRixHQUFoRSxFQUFxRTtBQUNqRSxZQUFJdUYsVUFBVXZGLENBQVYsRUFBYXlGLElBQWIsS0FBc0IsU0FBMUIsRUFBcUM7QUFDakNEO0FBQ0g7QUFDSjtBQUNELFdBQU8sRUFBRUEsS0FBRixHQUFVLENBQUMsQ0FBbEI7QUFDSDs7QUFFRCxTQUFTRSxRQUFULEdBQW9CLENBQ25COztBQUVEO0FBQ0E7QUFDQUEsU0FBU25JLFNBQVQsQ0FBbUJvSSxXQUFuQixHQUFpQyxVQUFTQyxNQUFULEVBQWlCQyxHQUFqQixFQUFzQjtBQUNuREEsVUFBTUEsT0FBTyxLQUFLQSxHQUFsQjtBQUNBLFNBQUssSUFBSUMsSUFBVCxJQUFpQkYsTUFBakIsRUFBeUI7QUFDckIsWUFBSUEsT0FBT0csY0FBUCxDQUFzQkQsSUFBdEIsQ0FBSixFQUFpQztBQUM3QkQsZ0JBQUlHLEtBQUosQ0FBVUYsSUFBVixJQUFrQkYsT0FBT0UsSUFBUCxDQUFsQjtBQUNIO0FBQ0o7QUFDSixDQVBEOztBQVNBSixTQUFTbkksU0FBVCxDQUFtQjBJLFdBQW5CLEdBQWlDLFVBQVNDLEdBQVQsRUFBY0MsSUFBZCxFQUFvQjtBQUNqRCxXQUFPRCxRQUFRLENBQVIsR0FBWSxDQUFaLEdBQWdCQSxNQUFNQyxJQUE3QjtBQUNILENBRkQ7O0FBSUE7QUFDQTtBQUNBLFNBQVNDLFdBQVQsQ0FBcUIxRCxNQUFyQixFQUE2QnZDLEdBQTdCLEVBQWtDa0csWUFBbEMsRUFBZ0Q7QUFDNUMsUUFBSUMsUUFBUyxPQUFPQyxTQUFQLEtBQXFCLFdBQXRCLElBQ1AsWUFBRCxDQUFlaEgsSUFBZixDQUFvQmdILFVBQVVDLFNBQTlCLENBREo7QUFFQSxRQUFJdkwsUUFBUSx3QkFBWjtBQUNBLFFBQUlvQixrQkFBa0Isb0JBQXRCO0FBQ0EsUUFBSW9LLGFBQWEsRUFBakI7O0FBRUEsUUFBRyxPQUFPdEssU0FBUCxLQUFxQixXQUF4QixFQUFxQztBQUNqQ2xCLGdCQUFRa0IsVUFBVUMsT0FBbEI7QUFDQUMsMEJBQWtCRixVQUFVSSxhQUE1QjtBQUNBa0sscUJBQWF0SyxVQUFVUSxPQUF2QjtBQUNIOztBQUVELFFBQUkySixLQUFKLEVBQVc7QUFDUHJMLGdCQUFRLG9CQUFSO0FBQ0FvQiwwQkFBa0IsY0FBbEI7QUFDSDs7QUFFRHFKLGFBQVNnQixJQUFULENBQWMsSUFBZDtBQUNBLFNBQUt2RyxHQUFMLEdBQVdBLEdBQVg7O0FBRUE7QUFDQTtBQUNBLFNBQUtxRSxNQUFMLEdBQWMvQixhQUFhQyxNQUFiLEVBQXFCdkMsSUFBSXVFLElBQXpCLENBQWQ7QUFDQSxRQUFJa0IsU0FBUztBQUNUM0ssZUFBT0EsS0FERTtBQUVUb0IseUJBQWlCQSxlQUZSO0FBR1RvSyxvQkFBWUEsVUFISDtBQUlUdEYsa0JBQVUsVUFKRDtBQUtURyxjQUFNLENBTEc7QUFNVEcsZUFBTyxDQU5FO0FBT1RrRixhQUFLLENBUEk7QUFRVEMsZ0JBQVEsQ0FSQztBQVNUQyxpQkFBUztBQVRBLEtBQWI7O0FBWUEsUUFBSSxDQUFDUCxLQUFMLEVBQVk7QUFDUlYsZUFBT2tCLFdBQVAsR0FBcUIzRyxJQUFJVyxRQUFKLEtBQWlCLEVBQWpCLEdBQXNCLGVBQXRCLEdBQ2ZYLElBQUlXLFFBQUosS0FBaUIsSUFBakIsR0FBd0IsYUFBeEIsR0FDQSxhQUZOO0FBR0E4RSxlQUFPbUIsV0FBUCxHQUFxQixXQUFyQjtBQUNIO0FBQ0QsU0FBS3BCLFdBQUwsQ0FBaUJDLE1BQWpCLEVBQXlCLEtBQUtwQixNQUE5Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFLcUIsR0FBTCxHQUFXbkQsT0FBT2UsUUFBUCxDQUFnQkosYUFBaEIsQ0FBOEIsS0FBOUIsQ0FBWDtBQUNBdUMsYUFBUztBQUNMb0IsbUJBQVc3RyxJQUFJdUIsS0FBSixLQUFjLFFBQWQsR0FBeUIsUUFBekIsR0FBb0N2QixJQUFJdUIsS0FEOUM7QUFFTHVGLGNBQU1aLGFBQWFZLElBRmQ7QUFHTEMsb0JBQVksVUFIUDtBQUlML0Ysa0JBQVU7QUFKTCxLQUFUOztBQU9BLFFBQUksQ0FBQ21GLEtBQUwsRUFBWTtBQUNSVixlQUFPdUIsU0FBUCxHQUFtQjVDLGNBQWMsS0FBS0MsTUFBbkIsQ0FBbkI7QUFDQW9CLGVBQU9rQixXQUFQLEdBQXFCM0csSUFBSVcsUUFBSixLQUFpQixFQUFqQixHQUFzQixlQUF0QixHQUNmWCxJQUFJVyxRQUFKLEtBQWlCLElBQWpCLEdBQXdCLGFBQXhCLEdBQ0EsY0FDRnNHLGlCQURFLEdBQ21CLFdBSHpCO0FBSUg7O0FBRUQsU0FBS3pCLFdBQUwsQ0FBaUJDLE1BQWpCOztBQUVBLFNBQUtDLEdBQUwsQ0FBUzNCLFdBQVQsQ0FBcUIsS0FBS00sTUFBMUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBSTZDLFVBQVUsQ0FBZDtBQUNBLFlBQVFsSCxJQUFJaUIsYUFBWjtBQUNJLGFBQUssT0FBTDtBQUNJaUcsc0JBQVVsSCxJQUFJZ0IsUUFBZDtBQUNBO0FBQ0osYUFBSyxRQUFMO0FBQ0lrRyxzQkFBVWxILElBQUlnQixRQUFKLEdBQWdCaEIsSUFBSWUsSUFBSixHQUFXLENBQXJDO0FBQ0E7QUFDSixhQUFLLEtBQUw7QUFDSW1HLHNCQUFVbEgsSUFBSWdCLFFBQUosR0FBZWhCLElBQUllLElBQTdCO0FBQ0E7QUFUUjs7QUFZQTtBQUNBO0FBQ0E7QUFDQSxRQUFJZixJQUFJVyxRQUFKLEtBQWlCLEVBQXJCLEVBQXlCO0FBQ3JCLGFBQUs2RSxXQUFMLENBQWlCO0FBQ2JyRSxrQkFBTyxLQUFLMkUsV0FBTCxDQUFpQm9CLE9BQWpCLEVBQTBCLEdBQTFCLENBRE07QUFFYkMsbUJBQU8sS0FBS3JCLFdBQUwsQ0FBaUI5RixJQUFJZSxJQUFyQixFQUEyQixHQUEzQjtBQUZNLFNBQWpCO0FBSUE7QUFDQTtBQUNBO0FBQ0gsS0FSRCxNQVFPO0FBQ0gsYUFBS3lFLFdBQUwsQ0FBaUI7QUFDYmdCLGlCQUFLLEtBQUtWLFdBQUwsQ0FBaUJvQixPQUFqQixFQUEwQixHQUExQixDQURRO0FBRWJFLG9CQUFRLEtBQUt0QixXQUFMLENBQWlCOUYsSUFBSWUsSUFBckIsRUFBMkIsR0FBM0I7QUFGSyxTQUFqQjtBQUlIOztBQUVELFNBQUtzRyxJQUFMLEdBQVksVUFBU0MsR0FBVCxFQUFjO0FBQ3RCLGFBQUs5QixXQUFMLENBQWlCO0FBQ2JnQixpQkFBSyxLQUFLVixXQUFMLENBQWlCd0IsSUFBSWQsR0FBckIsRUFBMEIsSUFBMUIsQ0FEUTtBQUViQyxvQkFBUSxLQUFLWCxXQUFMLENBQWlCd0IsSUFBSWIsTUFBckIsRUFBNkIsSUFBN0IsQ0FGSztBQUdidEYsa0JBQU0sS0FBSzJFLFdBQUwsQ0FBaUJ3QixJQUFJbkcsSUFBckIsRUFBMkIsSUFBM0IsQ0FITztBQUliRyxtQkFBTyxLQUFLd0UsV0FBTCxDQUFpQndCLElBQUloRyxLQUFyQixFQUE0QixJQUE1QixDQUpNO0FBS2I4RixvQkFBUSxLQUFLdEIsV0FBTCxDQUFpQndCLElBQUlGLE1BQXJCLEVBQTZCLElBQTdCLENBTEs7QUFNYkQsbUJBQU8sS0FBS3JCLFdBQUwsQ0FBaUJ3QixJQUFJSCxLQUFyQixFQUE0QixJQUE1QjtBQU5NLFNBQWpCO0FBUUgsS0FURDtBQVVIO0FBQ0RsQixZQUFZN0ksU0FBWixHQUF3QlIsV0FBVzJJLFNBQVNuSSxTQUFwQixDQUF4QjtBQUNBNkksWUFBWTdJLFNBQVosQ0FBc0JNLFdBQXRCLEdBQW9DdUksV0FBcEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBU3NCLFdBQVQsQ0FBcUJDLEdBQXJCLEVBQTBCO0FBQ3RCLFFBQUlyQixRQUFTLE9BQU9DLFNBQVAsS0FBcUIsV0FBdEIsSUFDUCxZQUFELENBQWVoSCxJQUFmLENBQW9CZ0gsVUFBVUMsU0FBOUIsQ0FESjs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQUlvQixFQUFKLEVBQVFMLE1BQVIsRUFBZ0JELEtBQWhCLEVBQXVCWCxHQUF2QjtBQUNBLFFBQUlnQixJQUFJOUIsR0FBUixFQUFhO0FBQ1QwQixpQkFBU0ksSUFBSTlCLEdBQUosQ0FBUWdDLFlBQWpCO0FBQ0FQLGdCQUFRSyxJQUFJOUIsR0FBSixDQUFRaUMsV0FBaEI7QUFDQW5CLGNBQU1nQixJQUFJOUIsR0FBSixDQUFRa0MsU0FBZDs7QUFFQSxZQUFJQyxRQUFRLENBQUNBLFFBQVFMLElBQUk5QixHQUFKLENBQVFqQixVQUFqQixNQUFpQ29ELFFBQVFBLE1BQU0sQ0FBTixDQUF6QyxLQUNSQSxNQUFNQyxjQURFLElBQ2dCRCxNQUFNQyxjQUFOLEVBRDVCO0FBRUFOLGNBQU1BLElBQUk5QixHQUFKLENBQVFxQyxxQkFBUixFQUFOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQU4sYUFBS0ksUUFBUUcsS0FBS0MsR0FBTCxDQUFVSixNQUFNLENBQU4sS0FBWUEsTUFBTSxDQUFOLEVBQVNULE1BQXRCLElBQWlDLENBQTFDLEVBQTZDSSxJQUFJSixNQUFKLEdBQWFTLE1BQU0zSyxNQUFoRSxDQUFSLEdBQ0MsQ0FETjtBQUdIO0FBQ0QsU0FBS2lFLElBQUwsR0FBWXFHLElBQUlyRyxJQUFoQjtBQUNBLFNBQUtHLEtBQUwsR0FBYWtHLElBQUlsRyxLQUFqQjtBQUNBLFNBQUtrRixHQUFMLEdBQVdnQixJQUFJaEIsR0FBSixJQUFXQSxHQUF0QjtBQUNBLFNBQUtZLE1BQUwsR0FBY0ksSUFBSUosTUFBSixJQUFjQSxNQUE1QjtBQUNBLFNBQUtYLE1BQUwsR0FBY2UsSUFBSWYsTUFBSixJQUFlRCxPQUFPZ0IsSUFBSUosTUFBSixJQUFjQSxNQUFyQixDQUE3QjtBQUNBLFNBQUtELEtBQUwsR0FBYUssSUFBSUwsS0FBSixJQUFhQSxLQUExQjtBQUNBLFNBQUtlLFVBQUwsR0FBa0JULE9BQU96TSxTQUFQLEdBQW1CeU0sRUFBbkIsR0FBd0JELElBQUlVLFVBQTlDOztBQUVBLFFBQUkvQixTQUFTLENBQUMsS0FBSytCLFVBQW5CLEVBQStCO0FBQzNCLGFBQUtBLFVBQUwsR0FBa0IsRUFBbEI7QUFDSDtBQUNKOztBQUVEO0FBQ0E7QUFDQTtBQUNBWCxZQUFZbkssU0FBWixDQUFzQmlLLElBQXRCLEdBQTZCLFVBQVNjLElBQVQsRUFBZUMsTUFBZixFQUF1QjtBQUNoREEsYUFBU0EsV0FBV3BOLFNBQVgsR0FBdUJvTixNQUF2QixHQUFnQyxLQUFLRixVQUE5QztBQUNBLFlBQVFDLElBQVI7QUFDSSxhQUFLLElBQUw7QUFDSSxpQkFBS2hILElBQUwsSUFBYWlILE1BQWI7QUFDQSxpQkFBSzlHLEtBQUwsSUFBYzhHLE1BQWQ7QUFDQTtBQUNKLGFBQUssSUFBTDtBQUNJLGlCQUFLakgsSUFBTCxJQUFhaUgsTUFBYjtBQUNBLGlCQUFLOUcsS0FBTCxJQUFjOEcsTUFBZDtBQUNBO0FBQ0osYUFBSyxJQUFMO0FBQ0ksaUJBQUs1QixHQUFMLElBQVk0QixNQUFaO0FBQ0EsaUJBQUszQixNQUFMLElBQWUyQixNQUFmO0FBQ0E7QUFDSixhQUFLLElBQUw7QUFDSSxpQkFBSzVCLEdBQUwsSUFBWTRCLE1BQVo7QUFDQSxpQkFBSzNCLE1BQUwsSUFBZTJCLE1BQWY7QUFDQTtBQWhCUjtBQWtCSCxDQXBCRDs7QUFzQkE7QUFDQWIsWUFBWW5LLFNBQVosQ0FBc0JpTCxRQUF0QixHQUFpQyxVQUFTQyxFQUFULEVBQWE7QUFDMUMsV0FBTyxLQUFLbkgsSUFBTCxHQUFZbUgsR0FBR2hILEtBQWYsSUFDSCxLQUFLQSxLQUFMLEdBQWFnSCxHQUFHbkgsSUFEYixJQUVILEtBQUtxRixHQUFMLEdBQVc4QixHQUFHN0IsTUFGWCxJQUdILEtBQUtBLE1BQUwsR0FBYzZCLEdBQUc5QixHQUhyQjtBQUlILENBTEQ7O0FBT0E7QUFDQWUsWUFBWW5LLFNBQVosQ0FBc0JtTCxXQUF0QixHQUFvQyxVQUFTQyxLQUFULEVBQWdCO0FBQ2hELFNBQUssSUFBSTNJLElBQUksQ0FBYixFQUFnQkEsSUFBSTJJLE1BQU10TCxNQUExQixFQUFrQzJDLEdBQWxDLEVBQXVDO0FBQ25DLFlBQUksS0FBS3dJLFFBQUwsQ0FBY0csTUFBTTNJLENBQU4sQ0FBZCxDQUFKLEVBQTZCO0FBQ3pCLG1CQUFPLElBQVA7QUFDSDtBQUNKO0FBQ0QsV0FBTyxLQUFQO0FBQ0gsQ0FQRDs7QUFTQTtBQUNBMEgsWUFBWW5LLFNBQVosQ0FBc0JxTCxNQUF0QixHQUErQixVQUFTQyxTQUFULEVBQW9CO0FBQy9DLFdBQU8sS0FBS2xDLEdBQUwsSUFBWWtDLFVBQVVsQyxHQUF0QixJQUNILEtBQUtDLE1BQUwsSUFBZWlDLFVBQVVqQyxNQUR0QixJQUVILEtBQUt0RixJQUFMLElBQWF1SCxVQUFVdkgsSUFGcEIsSUFHSCxLQUFLRyxLQUFMLElBQWNvSCxVQUFVcEgsS0FINUI7QUFJSCxDQUxEOztBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0FpRyxZQUFZbkssU0FBWixDQUFzQnVMLG9CQUF0QixHQUE2QyxVQUFTRCxTQUFULEVBQW9CUCxJQUFwQixFQUEwQjtBQUNuRSxZQUFRQSxJQUFSO0FBQ0ksYUFBSyxJQUFMO0FBQ0ksbUJBQU8sS0FBS2hILElBQUwsR0FBWXVILFVBQVV2SCxJQUE3QjtBQUNKLGFBQUssSUFBTDtBQUNJLG1CQUFPLEtBQUtHLEtBQUwsR0FBYW9ILFVBQVVwSCxLQUE5QjtBQUNKLGFBQUssSUFBTDtBQUNJLG1CQUFPLEtBQUtrRixHQUFMLEdBQVdrQyxVQUFVbEMsR0FBNUI7QUFDSixhQUFLLElBQUw7QUFDSSxtQkFBTyxLQUFLQyxNQUFMLEdBQWNpQyxVQUFVakMsTUFBL0I7QUFSUjtBQVVILENBWEQ7O0FBYUE7QUFDQTtBQUNBYyxZQUFZbkssU0FBWixDQUFzQndMLG1CQUF0QixHQUE0QyxVQUFTTixFQUFULEVBQWE7QUFDckQsUUFBSU8sSUFBSWIsS0FBS0MsR0FBTCxDQUFTLENBQVQsRUFBWUQsS0FBS2MsR0FBTCxDQUFTLEtBQUt4SCxLQUFkLEVBQXFCZ0gsR0FBR2hILEtBQXhCLElBQWlDMEcsS0FBS0MsR0FBTCxDQUFTLEtBQUs5RyxJQUFkLEVBQW9CbUgsR0FBR25ILElBQXZCLENBQTdDLENBQVI7QUFBQSxRQUNJNEgsSUFBSWYsS0FBS0MsR0FBTCxDQUFTLENBQVQsRUFBWUQsS0FBS2MsR0FBTCxDQUFTLEtBQUtyQyxNQUFkLEVBQXNCNkIsR0FBRzdCLE1BQXpCLElBQW1DdUIsS0FBS0MsR0FBTCxDQUFTLEtBQUt6QixHQUFkLEVBQW1COEIsR0FBRzlCLEdBQXRCLENBQS9DLENBRFI7QUFBQSxRQUVJd0MsZ0JBQWdCSCxJQUFJRSxDQUZ4QjtBQUdBLFdBQU9DLGlCQUFpQixLQUFLNUIsTUFBTCxHQUFjLEtBQUtELEtBQXBDLENBQVA7QUFDSCxDQUxEOztBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0FJLFlBQVluSyxTQUFaLENBQXNCNkwsaUJBQXRCLEdBQTBDLFVBQVNDLFNBQVQsRUFBb0I7QUFDMUQsV0FBTztBQUNIMUMsYUFBSyxLQUFLQSxHQUFMLEdBQVcwQyxVQUFVMUMsR0FEdkI7QUFFSEMsZ0JBQVF5QyxVQUFVekMsTUFBVixHQUFtQixLQUFLQSxNQUY3QjtBQUdIdEYsY0FBTSxLQUFLQSxJQUFMLEdBQVkrSCxVQUFVL0gsSUFIekI7QUFJSEcsZUFBTzRILFVBQVU1SCxLQUFWLEdBQWtCLEtBQUtBLEtBSjNCO0FBS0g4RixnQkFBUSxLQUFLQSxNQUxWO0FBTUhELGVBQU8sS0FBS0E7QUFOVCxLQUFQO0FBUUgsQ0FURDs7QUFXQTtBQUNBO0FBQ0FJLFlBQVk0QixvQkFBWixHQUFtQyxVQUFTM0IsR0FBVCxFQUFjO0FBQzdDLFFBQUlKLFNBQVNJLElBQUk5QixHQUFKLEdBQVU4QixJQUFJOUIsR0FBSixDQUFRZ0MsWUFBbEIsR0FBaUNGLElBQUluRSxPQUFKLEdBQWNtRSxJQUFJRSxZQUFsQixHQUFpQyxDQUEvRTtBQUNBLFFBQUlQLFFBQVFLLElBQUk5QixHQUFKLEdBQVU4QixJQUFJOUIsR0FBSixDQUFRaUMsV0FBbEIsR0FBZ0NILElBQUluRSxPQUFKLEdBQWNtRSxJQUFJRyxXQUFsQixHQUFnQyxDQUE1RTtBQUNBLFFBQUluQixNQUFNZ0IsSUFBSTlCLEdBQUosR0FBVThCLElBQUk5QixHQUFKLENBQVFrQyxTQUFsQixHQUE4QkosSUFBSW5FLE9BQUosR0FBY21FLElBQUlJLFNBQWxCLEdBQThCLENBQXRFOztBQUVBSixVQUFNQSxJQUFJOUIsR0FBSixHQUFVOEIsSUFBSTlCLEdBQUosQ0FBUXFDLHFCQUFSLEVBQVYsR0FDRlAsSUFBSW5FLE9BQUosR0FBY21FLElBQUlPLHFCQUFKLEVBQWQsR0FBNENQLEdBRGhEO0FBRUEsUUFBSTRCLE1BQU07QUFDTmpJLGNBQU1xRyxJQUFJckcsSUFESjtBQUVORyxlQUFPa0csSUFBSWxHLEtBRkw7QUFHTmtGLGFBQUtnQixJQUFJaEIsR0FBSixJQUFXQSxHQUhWO0FBSU5ZLGdCQUFRSSxJQUFJSixNQUFKLElBQWNBLE1BSmhCO0FBS05YLGdCQUFRZSxJQUFJZixNQUFKLElBQWVELE9BQU9nQixJQUFJSixNQUFKLElBQWNBLE1BQXJCLENBTGpCO0FBTU5ELGVBQU9LLElBQUlMLEtBQUosSUFBYUE7QUFOZCxLQUFWO0FBUUEsV0FBT2lDLEdBQVA7QUFDSCxDQWhCRDs7QUFrQkE7QUFDQTtBQUNBO0FBQ0EsU0FBU0MscUJBQVQsQ0FBK0I5RyxNQUEvQixFQUF1QytHLFFBQXZDLEVBQWlEQyxZQUFqRCxFQUErREMsWUFBL0QsRUFBNkU7O0FBRXpFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFTQyxnQkFBVCxDQUEwQjFILENBQTFCLEVBQTZCb0csSUFBN0IsRUFBbUM7QUFDL0IsWUFBSXVCLFlBQUo7QUFBQSxZQUNJQyxvQkFBb0IsSUFBSXBDLFdBQUosQ0FBZ0J4RixDQUFoQixDQUR4QjtBQUFBLFlBRUk2SCxhQUFhLENBRmpCLENBRCtCLENBR1g7O0FBRXBCLGFBQUssSUFBSS9KLElBQUksQ0FBYixFQUFnQkEsSUFBSXNJLEtBQUtqTCxNQUF6QixFQUFpQzJDLEdBQWpDLEVBQXNDO0FBQ2xDLG1CQUFPa0MsRUFBRTRHLG9CQUFGLENBQXVCWSxZQUF2QixFQUFxQ3BCLEtBQUt0SSxDQUFMLENBQXJDLEtBQ05rQyxFQUFFMEcsTUFBRixDQUFTYyxZQUFULEtBQTBCeEgsRUFBRXdHLFdBQUYsQ0FBY2lCLFlBQWQsQ0FEM0IsRUFDeUQ7QUFDckR6SCxrQkFBRXNGLElBQUYsQ0FBT2MsS0FBS3RJLENBQUwsQ0FBUDtBQUNIO0FBQ0Q7QUFDQTtBQUNBLGdCQUFJa0MsRUFBRTBHLE1BQUYsQ0FBU2MsWUFBVCxDQUFKLEVBQTRCO0FBQ3hCLHVCQUFPeEgsQ0FBUDtBQUNIO0FBQ0QsZ0JBQUk4SCxJQUFJOUgsRUFBRTZHLG1CQUFGLENBQXNCVyxZQUF0QixDQUFSO0FBQ0E7QUFDQTtBQUNBLGdCQUFJSyxhQUFhQyxDQUFqQixFQUFvQjtBQUNoQkgsK0JBQWUsSUFBSW5DLFdBQUosQ0FBZ0J4RixDQUFoQixDQUFmO0FBQ0E2SCw2QkFBYUMsQ0FBYjtBQUNIO0FBQ0Q7QUFDQTlILGdCQUFJLElBQUl3RixXQUFKLENBQWdCb0MsaUJBQWhCLENBQUo7QUFDSDtBQUNELGVBQU9ELGdCQUFnQkMsaUJBQXZCO0FBQ0g7O0FBRUQsUUFBSUcsY0FBYyxJQUFJdkMsV0FBSixDQUFnQitCLFFBQWhCLENBQWxCO0FBQUEsUUFDSXRKLE1BQU1zSixTQUFTdEosR0FEbkI7QUFBQSxRQUVJK0osVUFBVS9FLGVBQWVoRixHQUFmLENBRmQ7QUFBQSxRQUdJbUksT0FBTyxFQUhYOztBQUtBO0FBQ0EsUUFBSW5JLElBQUljLFdBQVIsRUFBcUI7QUFDakIsWUFBSUMsSUFBSjtBQUNBLGdCQUFRZixJQUFJVyxRQUFaO0FBQ0ksaUJBQUssRUFBTDtBQUNJd0gsdUJBQU8sQ0FBRSxJQUFGLEVBQVEsSUFBUixDQUFQO0FBQ0FwSCx1QkFBTyxRQUFQO0FBQ0E7QUFDSixpQkFBSyxJQUFMO0FBQ0lvSCx1QkFBTyxDQUFFLElBQUYsRUFBUSxJQUFSLENBQVA7QUFDQXBILHVCQUFPLE9BQVA7QUFDQTtBQUNKLGlCQUFLLElBQUw7QUFDSW9ILHVCQUFPLENBQUUsSUFBRixFQUFRLElBQVIsQ0FBUDtBQUNBcEgsdUJBQU8sT0FBUDtBQUNBO0FBWlI7O0FBZUEsWUFBSWlKLE9BQU9GLFlBQVk1QixVQUF2QjtBQUFBLFlBQ0lsSCxXQUFXZ0osT0FBT2hDLEtBQUtpQyxLQUFMLENBQVdGLE9BQVgsQ0FEdEI7QUFBQSxZQUVJRyxjQUFjWCxhQUFheEksSUFBYixJQUFxQmlKLElBRnZDO0FBQUEsWUFHSUcsY0FBY2hDLEtBQUssQ0FBTCxDQUhsQjs7QUFLQTtBQUNBO0FBQ0E7QUFDQSxZQUFJSCxLQUFLb0MsR0FBTCxDQUFTcEosUUFBVCxJQUFxQmtKLFdBQXpCLEVBQXNDO0FBQ2xDbEosdUJBQVdBLFdBQVcsQ0FBWCxHQUFlLENBQUMsQ0FBaEIsR0FBb0IsQ0FBL0I7QUFDQUEsd0JBQVlnSCxLQUFLcUMsSUFBTCxDQUFVSCxjQUFjRixJQUF4QixJQUFnQ0EsSUFBNUM7QUFDSDs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUlELFVBQVUsQ0FBZCxFQUFpQjtBQUNiL0ksd0JBQVloQixJQUFJVyxRQUFKLEtBQWlCLEVBQWpCLEdBQXNCNEksYUFBYW5DLE1BQW5DLEdBQTRDbUMsYUFBYXBDLEtBQXJFO0FBQ0FnQixtQkFBT0EsS0FBS21DLE9BQUwsRUFBUDtBQUNIOztBQUVEO0FBQ0E7QUFDQVIsb0JBQVl6QyxJQUFaLENBQWlCOEMsV0FBakIsRUFBOEJuSixRQUE5QjtBQUVILEtBM0NELE1BMkNPO0FBQ0g7QUFDQSxZQUFJdUosdUJBQXdCVCxZQUFZNUIsVUFBWixHQUF5QnFCLGFBQWFuQyxNQUF2QyxHQUFpRCxHQUE1RTs7QUFFQSxnQkFBUXBILElBQUlhLFNBQVo7QUFDSSxpQkFBSyxRQUFMO0FBQ0lrSiwyQkFBWVEsdUJBQXVCLENBQW5DO0FBQ0E7QUFDSixpQkFBSyxLQUFMO0FBQ0lSLDJCQUFXUSxvQkFBWDtBQUNBO0FBTlI7O0FBU0E7QUFDQSxnQkFBUXZLLElBQUlXLFFBQVo7QUFDSSxpQkFBSyxFQUFMO0FBQ0kySSx5QkFBUzlELFdBQVQsQ0FBcUI7QUFDakJnQix5QkFBSzhDLFNBQVN4RCxXQUFULENBQXFCaUUsT0FBckIsRUFBOEIsR0FBOUI7QUFEWSxpQkFBckI7QUFHQTtBQUNKLGlCQUFLLElBQUw7QUFDSVQseUJBQVM5RCxXQUFULENBQXFCO0FBQ2pCckUsMEJBQU1tSSxTQUFTeEQsV0FBVCxDQUFxQmlFLE9BQXJCLEVBQThCLEdBQTlCO0FBRFcsaUJBQXJCO0FBR0E7QUFDSixpQkFBSyxJQUFMO0FBQ0lULHlCQUFTOUQsV0FBVCxDQUFxQjtBQUNqQmxFLDJCQUFPZ0ksU0FBU3hELFdBQVQsQ0FBcUJpRSxPQUFyQixFQUE4QixHQUE5QjtBQURVLGlCQUFyQjtBQUdBO0FBZlI7O0FBa0JBNUIsZUFBTyxDQUFFLElBQUYsRUFBUSxJQUFSLEVBQWMsSUFBZCxFQUFvQixJQUFwQixDQUFQOztBQUVBO0FBQ0E7QUFDQTJCLHNCQUFjLElBQUl2QyxXQUFKLENBQWdCK0IsUUFBaEIsQ0FBZDtBQUNIOztBQUVELFFBQUlJLGVBQWVELGlCQUFpQkssV0FBakIsRUFBOEIzQixJQUE5QixDQUFuQjtBQUNBbUIsYUFBU2pDLElBQVQsQ0FBY3FDLGFBQWFULGlCQUFiLENBQStCTSxZQUEvQixDQUFkO0FBQ0g7O0FBRUQ7Ozs7QUFJQTtBQUNBM08sT0FBTzRQLGFBQVAsR0FBdUIsWUFBVztBQUM5QixXQUFPO0FBQ0hDLGdCQUFRLGdCQUFTaFAsSUFBVCxFQUFlO0FBQ25CLGdCQUFJLENBQUNBLElBQUwsRUFBVztBQUNQLHVCQUFPLEVBQVA7QUFDSDtBQUNELGdCQUFJLE9BQU9BLElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7QUFDMUIsc0JBQU0sSUFBSTBCLEtBQUosQ0FBVSwrQkFBVixDQUFOO0FBQ0g7QUFDRCxtQkFBT3VOLG1CQUFtQkMsbUJBQW1CbFAsSUFBbkIsQ0FBbkIsQ0FBUDtBQUNIO0FBVEUsS0FBUDtBQVdILENBWkQ7O0FBY0FiLE9BQU9nUSxtQkFBUCxHQUE2QixVQUFTckksTUFBVCxFQUFpQnNJLE9BQWpCLEVBQTBCO0FBQ25ELFFBQUksQ0FBQ3RJLE1BQUQsSUFBVyxDQUFDc0ksT0FBaEIsRUFBeUI7QUFDckIsZUFBTyxJQUFQO0FBQ0g7QUFDRCxXQUFPdkksYUFBYUMsTUFBYixFQUFxQnNJLE9BQXJCLENBQVA7QUFDSCxDQUxEOztBQU9BLElBQUlDLG9CQUFvQixJQUF4QjtBQUNBLElBQUlDLGFBQWEsWUFBakI7QUFDQSxJQUFJQyx5QkFBeUIsTUFBN0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0FwUSxPQUFPcVEsV0FBUCxHQUFxQixVQUFTMUksTUFBVCxFQUFpQjJJLElBQWpCLEVBQXVCQyxPQUF2QixFQUFnQztBQUNqRCxRQUFJLENBQUM1SSxNQUFELElBQVcsQ0FBQzJJLElBQVosSUFBb0IsQ0FBQ0MsT0FBekIsRUFBa0M7QUFDOUIsZUFBTyxJQUFQO0FBQ0g7O0FBRUQ7QUFDQSxXQUFPQSxRQUFRQyxVQUFmLEVBQTJCO0FBQ3ZCRCxnQkFBUUUsV0FBUixDQUFvQkYsUUFBUUMsVUFBNUI7QUFDSDs7QUFFRCxRQUFJRSxnQkFBZ0IvSSxPQUFPZSxRQUFQLENBQWdCSixhQUFoQixDQUE4QixLQUE5QixDQUFwQjtBQUNBb0ksa0JBQWN6RixLQUFkLENBQW9CN0UsUUFBcEIsR0FBK0IsVUFBL0I7QUFDQXNLLGtCQUFjekYsS0FBZCxDQUFvQjFFLElBQXBCLEdBQTJCLEdBQTNCO0FBQ0FtSyxrQkFBY3pGLEtBQWQsQ0FBb0J2RSxLQUFwQixHQUE0QixHQUE1QjtBQUNBZ0ssa0JBQWN6RixLQUFkLENBQW9CVyxHQUFwQixHQUEwQixHQUExQjtBQUNBOEUsa0JBQWN6RixLQUFkLENBQW9CWSxNQUFwQixHQUE2QixHQUE3QjtBQUNBNkUsa0JBQWN6RixLQUFkLENBQW9CMEYsTUFBcEIsR0FBNkJQLHNCQUE3QjtBQUNBRyxZQUFRcEgsV0FBUixDQUFvQnVILGFBQXBCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQVNFLGFBQVQsQ0FBdUJOLElBQXZCLEVBQTZCO0FBQ3pCLGFBQUssSUFBSXJMLElBQUksQ0FBYixFQUFnQkEsSUFBSXFMLEtBQUtoTyxNQUF6QixFQUFpQzJDLEdBQWpDLEVBQXNDO0FBQ2xDLGdCQUFJcUwsS0FBS3JMLENBQUwsRUFBUTRMLFlBQVIsSUFBd0IsQ0FBQ1AsS0FBS3JMLENBQUwsRUFBUTZMLFlBQXJDLEVBQW1EO0FBQy9DLHVCQUFPLElBQVA7QUFDSDtBQUNKO0FBQ0QsZUFBTyxLQUFQO0FBQ0g7O0FBRUQ7QUFDQSxRQUFJLENBQUNGLGNBQWNOLElBQWQsQ0FBTCxFQUEwQjtBQUN0QixhQUFLLElBQUlyTCxJQUFJLENBQWIsRUFBZ0JBLElBQUlxTCxLQUFLaE8sTUFBekIsRUFBaUMyQyxHQUFqQyxFQUFzQztBQUNsQ3lMLDBCQUFjdkgsV0FBZCxDQUEwQm1ILEtBQUtyTCxDQUFMLEVBQVE2TCxZQUFsQztBQUNIO0FBQ0Q7QUFDSDs7QUFFRCxRQUFJbEMsZUFBZSxFQUFuQjtBQUFBLFFBQ0lELGVBQWVoQyxZQUFZNEIsb0JBQVosQ0FBaUNtQyxhQUFqQyxDQURuQjtBQUFBLFFBRUlLLFdBQVczRCxLQUFLaUMsS0FBTCxDQUFXVixhQUFhbkMsTUFBYixHQUFzQjBELGlCQUF0QixHQUEwQyxHQUFyRCxJQUE0RCxHQUYzRTtBQUdBLFFBQUk1RSxlQUFlO0FBQ2ZZLGNBQU82RSxXQUFXdFEsU0FBWixHQUF5QixLQUF6QixHQUFpQzBQO0FBRHhCLEtBQW5COztBQUlBLEtBQUMsWUFBVztBQUNSLFlBQUl6QixRQUFKLEVBQWN0SixHQUFkOztBQUVBLGFBQUssSUFBSUgsSUFBSSxDQUFiLEVBQWdCQSxJQUFJcUwsS0FBS2hPLE1BQXpCLEVBQWlDMkMsR0FBakMsRUFBc0M7QUFDbENHLGtCQUFNa0wsS0FBS3JMLENBQUwsQ0FBTjs7QUFFQTtBQUNBeUosdUJBQVcsSUFBSXJELFdBQUosQ0FBZ0IxRCxNQUFoQixFQUF3QnZDLEdBQXhCLEVBQTZCa0csWUFBN0IsQ0FBWDtBQUNBb0YsMEJBQWN2SCxXQUFkLENBQTBCdUYsU0FBUzVELEdBQW5DOztBQUVBO0FBQ0EyRCxrQ0FBc0I5RyxNQUF0QixFQUE4QitHLFFBQTlCLEVBQXdDQyxZQUF4QyxFQUFzREMsWUFBdEQ7O0FBRUE7QUFDQTtBQUNBeEosZ0JBQUkwTCxZQUFKLEdBQW1CcEMsU0FBUzVELEdBQTVCOztBQUVBOEQseUJBQWF2RixJQUFiLENBQWtCc0QsWUFBWTRCLG9CQUFaLENBQWlDRyxRQUFqQyxDQUFsQjtBQUNIO0FBQ0osS0FuQkQ7QUFvQkgsQ0FsRUQ7O0FBb0VBMU8sT0FBT2dSLE1BQVAsR0FBZ0IsVUFBU3JKLE1BQVQsRUFBaUJzSixPQUFqQixFQUEwQjtBQUN0QyxTQUFLdEosTUFBTCxHQUFjQSxNQUFkO0FBQ0EsU0FBS3VKLEtBQUwsR0FBYSxTQUFiO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDQSxTQUFLRixPQUFMLEdBQWVBLFdBQVcsSUFBSUcsV0FBSixDQUFnQixNQUFoQixDQUExQjtBQUNBLFNBQUsvTCxVQUFMLEdBQWtCLEVBQWxCO0FBQ0gsQ0FORDs7QUFRQXJGLE9BQU9nUixNQUFQLENBQWN4TyxTQUFkLEdBQTBCO0FBQ3RCO0FBQ0E7QUFDQTZPLHdCQUFvQiw0QkFBU3JKLENBQVQsRUFBWTtBQUM1QixZQUFJQSxhQUFhdkYsWUFBakIsRUFBK0I7QUFDM0IsaUJBQUs2TyxjQUFMLElBQXVCLEtBQUtBLGNBQUwsQ0FBb0J0SixDQUFwQixDQUF2QjtBQUNILFNBRkQsTUFFTztBQUNILGtCQUFNQSxDQUFOO0FBQ0g7QUFDSixLQVRxQjtBQVV0QnVKLFdBQU8sZUFBVTFRLElBQVYsRUFBZ0IyUSxRQUFoQixFQUEwQjtBQUM3QixZQUFJQyxPQUFPLElBQVg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJNVEsSUFBSixFQUFVO0FBQ047QUFDQTRRLGlCQUFLTixNQUFMLElBQWVNLEtBQUtSLE9BQUwsQ0FBYXBCLE1BQWIsQ0FBb0JoUCxJQUFwQixFQUEwQixFQUFDNlEsUUFBUSxJQUFULEVBQTFCLENBQWY7QUFDSDtBQUNELGlCQUFTQyxlQUFULEdBQTJCO0FBQ3ZCLGdCQUFJUixTQUFTTSxLQUFLTixNQUFsQjtBQUNBLGdCQUFJUyxNQUFNLENBQVY7QUFDQSxtQkFBT0EsTUFBTVQsT0FBTzdPLE1BQWIsSUFBdUI2TyxPQUFPUyxHQUFQLE1BQWdCLElBQXZDLElBQStDVCxPQUFPUyxHQUFQLE1BQWdCLElBQXRFLEVBQTRFO0FBQ3hFLGtCQUFFQSxHQUFGO0FBQ0g7QUFDRCxnQkFBSTVMLE9BQU9tTCxPQUFPckssTUFBUCxDQUFjLENBQWQsRUFBaUI4SyxHQUFqQixDQUFYO0FBQ0E7QUFDQSxnQkFBSVQsT0FBT1MsR0FBUCxNQUFnQixJQUFwQixFQUEwQjtBQUN0QixrQkFBRUEsR0FBRjtBQUNIO0FBQ0QsZ0JBQUlULE9BQU9TLEdBQVAsTUFBZ0IsSUFBcEIsRUFBMEI7QUFDdEIsa0JBQUVBLEdBQUY7QUFDSDtBQUNESCxpQkFBS04sTUFBTCxHQUFjQSxPQUFPckssTUFBUCxDQUFjOEssR0FBZCxDQUFkO0FBQ0EsbUJBQU81TCxJQUFQO0FBQ0g7O0FBRUQ7QUFDQSxpQkFBUzZMLFdBQVQsQ0FBcUIxTyxLQUFyQixFQUE0QjtBQUN4QixnQkFBSXVDLFdBQVcsSUFBSS9CLFFBQUosRUFBZjs7QUFFQWdCLHlCQUFheEIsS0FBYixFQUFvQixVQUFVVyxDQUFWLEVBQWFDLENBQWIsRUFBZ0I7QUFDaEMsd0JBQVFELENBQVI7QUFDSSx5QkFBSyxJQUFMO0FBQ0k0QixpQ0FBUzdCLEdBQVQsQ0FBYUMsQ0FBYixFQUFnQkMsQ0FBaEI7QUFDQTtBQUNKLHlCQUFLLE9BQUw7QUFDSTJCLGlDQUFTakIsT0FBVCxDQUFpQlgsQ0FBakIsRUFBb0JDLENBQXBCO0FBQ0E7QUFDSix5QkFBSyxPQUFMO0FBQ0kyQixpQ0FBU25CLE9BQVQsQ0FBaUJULENBQWpCLEVBQW9CQyxDQUFwQjtBQUNBO0FBQ0oseUJBQUssY0FBTDtBQUNBLHlCQUFLLGdCQUFMO0FBQ0ksNEJBQUkrTixLQUFLL04sRUFBRWlCLEtBQUYsQ0FBUSxHQUFSLENBQVQ7QUFDQSw0QkFBSThNLEdBQUd4UCxNQUFILEtBQWMsQ0FBbEIsRUFBcUI7QUFDakI7QUFDSDtBQUNEO0FBQ0E7QUFDQSw0QkFBSXlQLFNBQVMsSUFBSXBPLFFBQUosRUFBYjtBQUNBb08sK0JBQU90TixPQUFQLENBQWUsR0FBZixFQUFvQnFOLEdBQUcsQ0FBSCxDQUFwQjtBQUNBQywrQkFBT3ROLE9BQVAsQ0FBZSxHQUFmLEVBQW9CcU4sR0FBRyxDQUFILENBQXBCO0FBQ0EsNEJBQUksQ0FBQ0MsT0FBTzVOLEdBQVAsQ0FBVyxHQUFYLENBQUQsSUFBb0IsQ0FBQzROLE9BQU81TixHQUFQLENBQVcsR0FBWCxDQUF6QixFQUEwQztBQUN0QztBQUNIO0FBQ0R1QixpQ0FBUzdCLEdBQVQsQ0FBYUMsSUFBSSxHQUFqQixFQUFzQmlPLE9BQU8vTixHQUFQLENBQVcsR0FBWCxDQUF0QjtBQUNBMEIsaUNBQVM3QixHQUFULENBQWFDLElBQUksR0FBakIsRUFBc0JpTyxPQUFPL04sR0FBUCxDQUFXLEdBQVgsQ0FBdEI7QUFDQTtBQUNKLHlCQUFLLFFBQUw7QUFDSTBCLGlDQUFTdEIsR0FBVCxDQUFhTixDQUFiLEVBQWdCQyxDQUFoQixFQUFtQixDQUFDLElBQUQsQ0FBbkI7QUFDQTtBQTdCUjtBQStCSCxhQWhDRCxFQWdDRyxHQWhDSCxFQWdDUSxJQWhDUjs7QUFrQ0E7QUFDQTtBQUNBLGdCQUFJMkIsU0FBU3ZCLEdBQVQsQ0FBYSxJQUFiLENBQUosRUFBd0I7QUFDcEIsb0JBQUl5QixTQUFTLElBQUk2TCxLQUFLOUosTUFBTCxDQUFZcUssU0FBaEIsRUFBYjtBQUNBcE0sdUJBQU8yRyxLQUFQLEdBQWU3RyxTQUFTMUIsR0FBVCxDQUFhLE9BQWIsRUFBc0IsR0FBdEIsQ0FBZjtBQUNBNEIsdUJBQU9xTSxLQUFQLEdBQWV2TSxTQUFTMUIsR0FBVCxDQUFhLE9BQWIsRUFBc0IsQ0FBdEIsQ0FBZjtBQUNBNEIsdUJBQU9zTSxhQUFQLEdBQXVCeE0sU0FBUzFCLEdBQVQsQ0FBYSxlQUFiLEVBQThCLENBQTlCLENBQXZCO0FBQ0E0Qix1QkFBT3VNLGFBQVAsR0FBdUJ6TSxTQUFTMUIsR0FBVCxDQUFhLGVBQWIsRUFBOEIsR0FBOUIsQ0FBdkI7QUFDQTRCLHVCQUFPd00sZUFBUCxHQUF5QjFNLFNBQVMxQixHQUFULENBQWEsaUJBQWIsRUFBZ0MsQ0FBaEMsQ0FBekI7QUFDQTRCLHVCQUFPeU0sZUFBUCxHQUF5QjNNLFNBQVMxQixHQUFULENBQWEsaUJBQWIsRUFBZ0MsR0FBaEMsQ0FBekI7QUFDQTRCLHVCQUFPME0sTUFBUCxHQUFnQjVNLFNBQVMxQixHQUFULENBQWEsUUFBYixFQUF1QixFQUF2QixDQUFoQjtBQUNBO0FBQ0F5TixxQkFBS2MsUUFBTCxJQUFpQmQsS0FBS2MsUUFBTCxDQUFjM00sTUFBZCxDQUFqQjtBQUNBO0FBQ0E7QUFDQTZMLHFCQUFLcE0sVUFBTCxDQUFnQmdFLElBQWhCLENBQXFCO0FBQ2pCMUQsd0JBQUlELFNBQVMxQixHQUFULENBQWEsSUFBYixDQURhO0FBRWpCNEIsNEJBQVFBO0FBRlMsaUJBQXJCO0FBSUg7QUFDSjs7QUFFRDtBQUNBLGlCQUFTNE0sV0FBVCxDQUFxQnJQLEtBQXJCLEVBQTRCO0FBQ3hCd0IseUJBQWF4QixLQUFiLEVBQW9CLFVBQVVXLENBQVYsRUFBYUMsQ0FBYixFQUFnQjtBQUNoQyx3QkFBUUQsQ0FBUjtBQUNJLHlCQUFLLFFBQUw7QUFDSTtBQUNBK04sb0NBQVk5TixDQUFaO0FBQ0E7QUFKUjtBQU1ILGFBUEQsRUFPRyxHQVBIO0FBUUg7O0FBRUQ7QUFDQSxZQUFJO0FBQ0EsZ0JBQUlpQyxJQUFKO0FBQ0EsZ0JBQUl5TCxLQUFLUCxLQUFMLEtBQWUsU0FBbkIsRUFBOEI7QUFDMUI7QUFDQSxvQkFBSSxDQUFDLFVBQVUxTSxJQUFWLENBQWVpTixLQUFLTixNQUFwQixDQUFMLEVBQWtDO0FBQzlCLDJCQUFPLElBQVA7QUFDSDs7QUFFRG5MLHVCQUFPMkwsaUJBQVA7O0FBRUEsb0JBQUlyTyxJQUFJMEMsS0FBS3ZDLEtBQUwsQ0FBVyxvQkFBWCxDQUFSO0FBQ0Esb0JBQUksQ0FBQ0gsQ0FBRCxJQUFNLENBQUNBLEVBQUUsQ0FBRixDQUFYLEVBQWlCO0FBQ2IsMEJBQU0sSUFBSWIsWUFBSixDQUFpQkEsYUFBYU0sTUFBYixDQUFvQkMsWUFBckMsQ0FBTjtBQUNIOztBQUVEeU8scUJBQUtQLEtBQUwsR0FBYSxRQUFiO0FBQ0g7O0FBRUQsZ0JBQUl1Qix1QkFBdUIsS0FBM0I7QUFDQSxtQkFBT2hCLEtBQUtOLE1BQVosRUFBb0I7QUFDaEI7QUFDQSxvQkFBSSxDQUFDLFVBQVUzTSxJQUFWLENBQWVpTixLQUFLTixNQUFwQixDQUFMLEVBQWtDO0FBQzlCLDJCQUFPLElBQVA7QUFDSDs7QUFFRCxvQkFBSSxDQUFDc0Isb0JBQUwsRUFBMkI7QUFDdkJ6TSwyQkFBTzJMLGlCQUFQO0FBQ0gsaUJBRkQsTUFFTztBQUNIYywyQ0FBdUIsS0FBdkI7QUFDSDtBQUNELHdCQUFRaEIsS0FBS1AsS0FBYjtBQUNJLHlCQUFLLFFBQUw7QUFDSTtBQUNBLDRCQUFJLElBQUkxTSxJQUFKLENBQVN3QixJQUFULENBQUosRUFBb0I7QUFDaEJ3TSx3Q0FBWXhNLElBQVo7QUFDSCx5QkFGRCxNQUVPLElBQUksQ0FBQ0EsSUFBTCxFQUFXO0FBQ2Q7QUFDQXlMLGlDQUFLUCxLQUFMLEdBQWEsSUFBYjtBQUNIO0FBQ0Q7QUFDSix5QkFBSyxNQUFMO0FBQ0k7QUFDQSw0QkFBSSxDQUFDbEwsSUFBTCxFQUFXO0FBQ1B5TCxpQ0FBS1AsS0FBTCxHQUFhLElBQWI7QUFDSDtBQUNEO0FBQ0oseUJBQUssSUFBTDtBQUNJO0FBQ0EsNEJBQUksaUJBQWlCMU0sSUFBakIsQ0FBc0J3QixJQUF0QixDQUFKLEVBQWlDO0FBQzdCeUwsaUNBQUtQLEtBQUwsR0FBYSxNQUFiO0FBQ0E7QUFDSDtBQUNEO0FBQ0EsNEJBQUksQ0FBQ2xMLElBQUwsRUFBVztBQUNQO0FBQ0g7QUFDRHlMLDZCQUFLck0sR0FBTCxHQUFXLElBQUlxTSxLQUFLOUosTUFBTCxDQUFZK0ssTUFBaEIsQ0FBdUIsQ0FBdkIsRUFBMEIsQ0FBMUIsRUFBNkIsRUFBN0IsQ0FBWDtBQUNBakIsNkJBQUtQLEtBQUwsR0FBYSxLQUFiO0FBQ0E7QUFDQSw0QkFBSWxMLEtBQUsyTSxPQUFMLENBQWEsS0FBYixNQUF3QixDQUFDLENBQTdCLEVBQWdDO0FBQzVCbEIsaUNBQUtyTSxHQUFMLENBQVNPLEVBQVQsR0FBY0ssSUFBZDtBQUNBO0FBQ0g7QUFDTDtBQUNBO0FBQ0EseUJBQUssS0FBTDtBQUNJO0FBQ0EsNEJBQUk7QUFDQWIscUNBQVNhLElBQVQsRUFBZXlMLEtBQUtyTSxHQUFwQixFQUF5QnFNLEtBQUtwTSxVQUE5QjtBQUNILHlCQUZELENBRUUsT0FBTzJDLENBQVAsRUFBVTtBQUNSeUosaUNBQUtKLGtCQUFMLENBQXdCckosQ0FBeEI7QUFDQTtBQUNBeUosaUNBQUtyTSxHQUFMLEdBQVcsSUFBWDtBQUNBcU0saUNBQUtQLEtBQUwsR0FBYSxRQUFiO0FBQ0E7QUFDSDtBQUNETyw2QkFBS1AsS0FBTCxHQUFhLFNBQWI7QUFDQTtBQUNKLHlCQUFLLFNBQUw7QUFDSSw0QkFBSTBCLGVBQWU1TSxLQUFLMk0sT0FBTCxDQUFhLEtBQWIsTUFBd0IsQ0FBQyxDQUE1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQUksQ0FBQzNNLElBQUQsSUFBUzRNLGlCQUFpQkgsdUJBQXVCLElBQXhDLENBQWIsRUFBNEQ7QUFDeEQ7QUFDQWhCLGlDQUFLb0IsS0FBTCxJQUFjcEIsS0FBS29CLEtBQUwsQ0FBV3BCLEtBQUtyTSxHQUFoQixDQUFkO0FBQ0FxTSxpQ0FBS3JNLEdBQUwsR0FBVyxJQUFYO0FBQ0FxTSxpQ0FBS1AsS0FBTCxHQUFhLElBQWI7QUFDQTtBQUNIO0FBQ0QsNEJBQUlPLEtBQUtyTSxHQUFMLENBQVN1RSxJQUFiLEVBQW1CO0FBQ2Y4SCxpQ0FBS3JNLEdBQUwsQ0FBU3VFLElBQVQsSUFBaUIsSUFBakI7QUFDSDtBQUNEOEgsNkJBQUtyTSxHQUFMLENBQVN1RSxJQUFULElBQWlCM0QsSUFBakI7QUFDQTtBQUNKLHlCQUFLLFFBQUw7QUFBZTtBQUNYO0FBQ0EsNEJBQUksQ0FBQ0EsSUFBTCxFQUFXO0FBQ1B5TCxpQ0FBS1AsS0FBTCxHQUFhLElBQWI7QUFDSDtBQUNEO0FBdkVSO0FBeUVIOztBQUdELGdCQUFJLENBQUNNLFFBQUwsRUFBZTtBQUNYO0FBQ0E7QUFDQSxvQkFBSUMsS0FBS1AsS0FBTCxLQUFlLFNBQWYsSUFBNEJPLEtBQUtyTSxHQUFqQyxJQUF3Q3FNLEtBQUtvQixLQUFqRCxFQUF3RDtBQUNwRHBCLHlCQUFLb0IsS0FBTCxDQUFXcEIsS0FBS3JNLEdBQWhCO0FBQ0g7QUFDRHFNLHFCQUFLcUIsS0FBTDtBQUNBLHVCQUFPLElBQVA7QUFDSDtBQUNKLFNBbkhELENBbUhFLE9BQU85SyxDQUFQLEVBQVU7QUFDUnlKLGlCQUFLSixrQkFBTCxDQUF3QnJKLENBQXhCO0FBQ0E7QUFDQSxnQkFBSXlKLEtBQUtQLEtBQUwsS0FBZSxTQUFmLElBQTRCTyxLQUFLck0sR0FBakMsSUFBd0NxTSxLQUFLb0IsS0FBakQsRUFBd0Q7QUFDcERwQixxQkFBS29CLEtBQUwsQ0FBV3BCLEtBQUtyTSxHQUFoQjtBQUNIO0FBQ0RxTSxpQkFBS3JNLEdBQUwsR0FBVyxJQUFYO0FBQ0E7QUFDQTtBQUNBcU0saUJBQUtQLEtBQUwsR0FBYU8sS0FBS1AsS0FBTCxLQUFlLFNBQWYsR0FBMkIsV0FBM0IsR0FBeUMsUUFBdEQ7QUFDSDtBQUNELGVBQU8sSUFBUDtBQUNILEtBN09xQjtBQThPdEI0QixXQUFPLGlCQUFZO0FBQ2YsWUFBSXJCLE9BQU8sSUFBWDs7QUFFQSxZQUFJO0FBQ0E7QUFDQUEsaUJBQUtOLE1BQUwsSUFBZU0sS0FBS1IsT0FBTCxDQUFhcEIsTUFBYixFQUFmO0FBQ0E7QUFDQSxnQkFBSTRCLEtBQUtyTSxHQUFMLElBQVlxTSxLQUFLUCxLQUFMLEtBQWUsUUFBL0IsRUFBeUM7QUFDckNPLHFCQUFLTixNQUFMLElBQWUsTUFBZjtBQUNBTSxxQkFBS0YsS0FBTCxDQUFXLElBQVgsRUFBaUIsSUFBakI7QUFDSDtBQUNEO0FBQ0E7QUFDQTtBQUNBLGdCQUFJRSxLQUFLUCxLQUFMLEtBQWUsU0FBbkIsRUFBOEI7QUFDMUIsc0JBQU0sSUFBSXpPLFlBQUosQ0FBaUJBLGFBQWFNLE1BQWIsQ0FBb0JDLFlBQXJDLENBQU47QUFDSDtBQUNKLFNBZEQsQ0FjRSxPQUFNZ0YsQ0FBTixFQUFTO0FBQ1B5SixpQkFBS0osa0JBQUwsQ0FBd0JySixDQUF4QjtBQUNIO0FBQ0R5SixhQUFLc0IsT0FBTCxJQUFnQnRCLEtBQUtzQixPQUFMLEVBQWhCO0FBQ0EsZUFBTyxJQUFQO0FBQ0g7QUFwUXFCLENBQTFCOztxQkEwUWUvUyxNOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2xnRGY7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkEsSUFBSWdTLFlBQVksRUFBaEI7O0FBRUEsSUFBSWdCLGdCQUFnQjtBQUNoQixRQUFJLElBRFk7QUFFaEIsVUFBTTtBQUZVLENBQXBCOztBQUtBLFNBQVNDLGlCQUFULENBQTJCQyxLQUEzQixFQUFrQztBQUM5QixRQUFJLE9BQU9BLEtBQVAsS0FBaUIsUUFBckIsRUFBK0I7QUFDM0IsZUFBTyxLQUFQO0FBQ0g7QUFDRCxRQUFJWixTQUFTVSxjQUFjRSxNQUFNQyxXQUFOLEVBQWQsQ0FBYjtBQUNBLFdBQU9iLFNBQVNZLE1BQU1DLFdBQU4sRUFBVCxHQUErQixLQUF0QztBQUNIOztBQUVELFNBQVNDLG1CQUFULENBQTZCRixLQUE3QixFQUFvQztBQUNoQyxXQUFPLE9BQU9BLEtBQVAsS0FBaUIsUUFBakIsSUFBOEJBLFNBQVMsQ0FBVCxJQUFjQSxTQUFTLEdBQTVEO0FBQ0g7O0FBRUQ7QUFDQWxCLFlBQVkscUJBQVc7QUFDbkIsUUFBSXFCLFNBQVMsR0FBYjtBQUNBLFFBQUlDLFNBQVMsQ0FBYjtBQUNBLFFBQUlDLGlCQUFpQixDQUFyQjtBQUNBLFFBQUlDLGlCQUFpQixHQUFyQjtBQUNBLFFBQUlDLG1CQUFtQixDQUF2QjtBQUNBLFFBQUlDLG1CQUFtQixHQUF2QjtBQUNBLFFBQUlDLFVBQVUsRUFBZDs7QUFFQTFSLFdBQU8yUixnQkFBUCxDQUF3QixJQUF4QixFQUE4QjtBQUMxQixpQkFBUztBQUNMQyx3QkFBWSxJQURQO0FBRUw3UCxpQkFBSyxlQUFXO0FBQ1osdUJBQU9xUCxNQUFQO0FBQ0gsYUFKSTtBQUtMeFAsaUJBQUssYUFBU3FQLEtBQVQsRUFBZ0I7QUFDakIsb0JBQUksQ0FBQ0Usb0JBQW9CRixLQUFwQixDQUFMLEVBQWlDO0FBQzdCLDBCQUFNLElBQUkzUSxLQUFKLENBQVUsa0NBQVYsQ0FBTjtBQUNIO0FBQ0Q4USx5QkFBU0gsS0FBVDtBQUNIO0FBVkksU0FEaUI7QUFhMUIsaUJBQVM7QUFDTFcsd0JBQVksSUFEUDtBQUVMN1AsaUJBQUssZUFBVztBQUNaLHVCQUFPc1AsTUFBUDtBQUNILGFBSkk7QUFLTHpQLGlCQUFLLGFBQVNxUCxLQUFULEVBQWdCO0FBQ2pCLG9CQUFJLE9BQU9BLEtBQVAsS0FBaUIsUUFBckIsRUFBK0I7QUFDM0IsMEJBQU0sSUFBSVksU0FBSixDQUFjLGdDQUFkLENBQU47QUFDSDtBQUNEUix5QkFBU0osS0FBVDtBQUNIO0FBVkksU0FiaUI7QUF5QjFCLHlCQUFpQjtBQUNiVyx3QkFBWSxJQURDO0FBRWI3UCxpQkFBSyxlQUFXO0FBQ1osdUJBQU93UCxjQUFQO0FBQ0gsYUFKWTtBQUtiM1AsaUJBQUssYUFBU3FQLEtBQVQsRUFBZ0I7QUFDakIsb0JBQUksQ0FBQ0Usb0JBQW9CRixLQUFwQixDQUFMLEVBQWlDO0FBQzdCLDBCQUFNLElBQUkzUSxLQUFKLENBQVUsMENBQVYsQ0FBTjtBQUNIO0FBQ0RpUixpQ0FBaUJOLEtBQWpCO0FBQ0g7QUFWWSxTQXpCUztBQXFDMUIseUJBQWlCO0FBQ2JXLHdCQUFZLElBREM7QUFFYjdQLGlCQUFLLGVBQVc7QUFDWix1QkFBT3VQLGNBQVA7QUFDSCxhQUpZO0FBS2IxUCxpQkFBSyxhQUFTcVAsS0FBVCxFQUFnQjtBQUNqQixvQkFBRyxDQUFDRSxvQkFBb0JGLEtBQXBCLENBQUosRUFBZ0M7QUFDNUIsMEJBQU0sSUFBSTNRLEtBQUosQ0FBVSwwQ0FBVixDQUFOO0FBQ0g7QUFDRGdSLGlDQUFpQkwsS0FBakI7QUFDSDtBQVZZLFNBckNTO0FBaUQxQiwyQkFBbUI7QUFDZlcsd0JBQVksSUFERztBQUVmN1AsaUJBQUssZUFBVztBQUNaLHVCQUFPMFAsZ0JBQVA7QUFDSCxhQUpjO0FBS2Y3UCxpQkFBSyxhQUFTcVAsS0FBVCxFQUFnQjtBQUNqQixvQkFBSSxDQUFDRSxvQkFBb0JGLEtBQXBCLENBQUwsRUFBaUM7QUFDN0IsMEJBQU0sSUFBSTNRLEtBQUosQ0FBVSw0Q0FBVixDQUFOO0FBQ0g7QUFDRG1SLG1DQUFtQlIsS0FBbkI7QUFDSDtBQVZjLFNBakRPO0FBNkQxQiwyQkFBbUI7QUFDZlcsd0JBQVksSUFERztBQUVmN1AsaUJBQUssZUFBVztBQUNaLHVCQUFPeVAsZ0JBQVA7QUFDSCxhQUpjO0FBS2Y1UCxpQkFBSyxhQUFTcVAsS0FBVCxFQUFnQjtBQUNqQixvQkFBSSxDQUFDRSxvQkFBb0JGLEtBQXBCLENBQUwsRUFBaUM7QUFDN0IsMEJBQU0sSUFBSTNRLEtBQUosQ0FBVSw0Q0FBVixDQUFOO0FBQ0g7QUFDRGtSLG1DQUFtQlAsS0FBbkI7QUFDSDtBQVZjLFNBN0RPO0FBeUUxQixrQkFBVTtBQUNOVyx3QkFBWSxJQUROO0FBRU43UCxpQkFBSyxlQUFXO0FBQ1osdUJBQU8yUCxPQUFQO0FBQ0gsYUFKSztBQUtOOVAsaUJBQUssYUFBU3FQLEtBQVQsRUFBZ0I7QUFDakIsb0JBQUlhLFVBQVVkLGtCQUFrQkMsS0FBbEIsQ0FBZDtBQUNBO0FBQ0Esb0JBQUlhLFlBQVksS0FBaEIsRUFBdUI7QUFDbkIsMEJBQU0sSUFBSUMsV0FBSixDQUFnQiw2Q0FBaEIsQ0FBTjtBQUNIO0FBQ0RMLDBCQUFVSSxPQUFWO0FBQ0g7QUFaSztBQXpFZ0IsS0FBOUI7QUF3RkgsQ0FqR0Q7O3FCQW1HZS9CLFMiLCJmaWxlIjoidnR0cGFyc2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogdnR0LmpzIC0gdjAuMTIuMSAoaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvdnR0LmpzKSBidWlsdCBvbiAwMy0xMi0yMDE1ICovXHJcbmltcG9ydCBWVFRDdWUgZnJvbSAndXRpbHMvY2FwdGlvbnMvdnR0Q3VlJztcclxuaW1wb3J0IFZUVFJlZ2lvbiBmcm9tICd1dGlscy9jYXB0aW9ucy92dHRSZWdpb24nO1xyXG5cclxuLyoqXHJcbiAqIENvcHlyaWdodCAyMDEzIHZ0dC5qcyBDb250cmlidXRvcnNcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbi8qIC0qLSBNb2RlOiBKYXZhOyB0YWItd2lkdGg6IDI7IGluZGVudC10YWJzLW1vZGU6IG5pbDsgYy1iYXNpYy1vZmZzZXQ6IDIgLSotICovXHJcbi8qIHZpbTogc2V0IHNoaWZ0d2lkdGg9MiB0YWJzdG9wPTIgYXV0b2luZGVudCBjaW5kZW50IGV4cGFuZHRhYjogKi9cclxuXHJcbmxldCBXZWJWVFQgPSBmdW5jdGlvbigpe307XHJcbmZ1bmN0aW9uIG1ha2VDb2xvclNldChjb2xvciwgb3BhY2l0eSkge1xyXG4gICAgaWYob3BhY2l0eSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgb3BhY2l0eSA9IDE7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gXCJyZ2JhKFwiICsgW3BhcnNlSW50KGNvbG9yLnN1YnN0cmluZygwLCAyKSwgMTYpLFxyXG4gICAgICAgICAgICBwYXJzZUludChjb2xvci5zdWJzdHJpbmcoMiwgNCksIDE2KSxcclxuICAgICAgICAgICAgcGFyc2VJbnQoY29sb3Iuc3Vic3RyaW5nKDQsIDYpLCAxNiksXHJcbiAgICAgICAgICAgIG9wYWNpdHldLmpvaW4oXCIsXCIpICsgXCIpXCI7XHJcbn1cclxuXHJcbnZhciBXZWJWVFRQcmVmcyA9IFsnd2VidnR0LmZvbnQuY29sb3InLCAnd2VidnR0LmZvbnQub3BhY2l0eScsICd3ZWJ2dHQuZm9udC5zY2FsZScsXHJcbiAgICAnd2VidnR0LmJnLmNvbG9yJywgJ3dlYnZ0dC5iZy5vcGFjaXR5JyxcclxuICAgICd3ZWJ2dHQuZWRnZS5jb2xvcicsICd3ZWJ2dHQuZWRnZS50eXBlJ107XHJcblxyXG52YXIgZm9udFNjYWxlID0gMTtcclxuXHJcbmZ1bmN0aW9uIG9ic2VydmUoc3ViamVjdCwgdG9waWMsIGRhdGEpIHtcclxuICAgIHN3aXRjaCAoZGF0YSkge1xyXG4gICAgICAgIGNhc2UgXCJ3ZWJ2dHQuZm9udC5jb2xvclwiOlxyXG4gICAgICAgIGNhc2UgXCJ3ZWJ2dHQuZm9udC5vcGFjaXR5XCI6XHJcbiAgICAgICAgICAgIHZhciBmb250Q29sb3IgPSBTZXJ2aWNlcy5wcmVmcy5nZXRDaGFyUHJlZihcIndlYnZ0dC5mb250LmNvbG9yXCIpO1xyXG4gICAgICAgICAgICB2YXIgZm9udE9wYWNpdHkgPSBTZXJ2aWNlcy5wcmVmcy5nZXRJbnRQcmVmKFwid2VidnR0LmZvbnQub3BhY2l0eVwiKSAvIDEwMDtcclxuICAgICAgICAgICAgV2ViVlRUU2V0LmZvbnRTZXQgPSBtYWtlQ29sb3JTZXQoZm9udENvbG9yLCBmb250T3BhY2l0eSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJ3ZWJ2dHQuZm9udC5zY2FsZVwiOlxyXG4gICAgICAgICAgICBmb250U2NhbGUgPSBTZXJ2aWNlcy5wcmVmcy5nZXRJbnRQcmVmKFwid2VidnR0LmZvbnQuc2NhbGVcIikgLyAxMDA7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJ3ZWJ2dHQuYmcuY29sb3JcIjpcclxuICAgICAgICBjYXNlIFwid2VidnR0LmJnLm9wYWNpdHlcIjpcclxuICAgICAgICAgICAgdmFyIGJhY2tncm91bmRDb2xvciA9IFNlcnZpY2VzLnByZWZzLmdldENoYXJQcmVmKFwid2VidnR0LmJnLmNvbG9yXCIpO1xyXG4gICAgICAgICAgICB2YXIgYmFja2dyb3VuZE9wYWNpdHkgPSBTZXJ2aWNlcy5wcmVmcy5nZXRJbnRQcmVmKFwid2VidnR0LmJnLm9wYWNpdHlcIikgLyAxMDA7XHJcbiAgICAgICAgICAgIFdlYlZUVFNldC5iYWNrZ3JvdW5kU2V0ID0gbWFrZUNvbG9yU2V0KGJhY2tncm91bmRDb2xvciwgYmFja2dyb3VuZE9wYWNpdHkpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwid2VidnR0LmVkZ2UuY29sb3JcIjpcclxuICAgICAgICBjYXNlIFwid2VidnR0LmVkZ2UudHlwZVwiOlxyXG4gICAgICAgICAgICB2YXIgZWRnZVR5cGVMaXN0ID0gW1wiXCIsIFwiMHB4IDBweCBcIiwgXCI0cHggNHB4IDRweCBcIiwgXCItMnB4IC0ycHggXCIsIFwiMnB4IDJweCBcIl07XHJcbiAgICAgICAgICAgIHZhciBlZGdlVHlwZSA9IFNlcnZpY2VzLnByZWZzLmdldEludFByZWYoXCJ3ZWJ2dHQuZWRnZS50eXBlXCIpO1xyXG4gICAgICAgICAgICB2YXIgZWRnZUNvbG9yID0gU2VydmljZXMucHJlZnMuZ2V0Q2hhclByZWYoXCJ3ZWJ2dHQuZWRnZS5jb2xvclwiKTtcclxuICAgICAgICAgICAgV2ViVlRUU2V0LmVkZ2VTZXQgPSBlZGdlVHlwZUxpc3RbZWRnZVR5cGVdICsgbWFrZUNvbG9yU2V0KGVkZ2VDb2xvcik7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG59XHJcblxyXG5pZih0eXBlb2YgU2VydmljZXMgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIHZhciBXZWJWVFRTZXQgPSB7fTtcclxuICAgIFdlYlZUVFByZWZzLmZvckVhY2goZnVuY3Rpb24gKHByZWYpIHtcclxuICAgICAgICBvYnNlcnZlKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBwcmVmKTtcclxuICAgICAgICBTZXJ2aWNlcy5wcmVmcy5hZGRPYnNlcnZlcihwcmVmLCBvYnNlcnZlLCBmYWxzZSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxudmFyIF9vYmpDcmVhdGUgPSBPYmplY3QuY3JlYXRlIHx8IChmdW5jdGlvbigpIHtcclxuICAgICAgICBmdW5jdGlvbiBGKCkge31cclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24obykge1xyXG4gICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCAhPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdPYmplY3QuY3JlYXRlIHNoaW0gb25seSBhY2NlcHRzIG9uZSBwYXJhbWV0ZXIuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgRi5wcm90b3R5cGUgPSBvO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEYoKTtcclxuICAgICAgICB9O1xyXG4gICAgfSkoKTtcclxuXHJcbi8vIENyZWF0ZXMgYSBuZXcgUGFyc2VyRXJyb3Igb2JqZWN0IGZyb20gYW4gZXJyb3JEYXRhIG9iamVjdC4gVGhlIGVycm9yRGF0YVxyXG4vLyBvYmplY3Qgc2hvdWxkIGhhdmUgZGVmYXVsdCBjb2RlIGFuZCBtZXNzYWdlIHByb3BlcnRpZXMuIFRoZSBkZWZhdWx0IG1lc3NhZ2VcclxuLy8gcHJvcGVydHkgY2FuIGJlIG92ZXJyaWRlbiBieSBwYXNzaW5nIGluIGEgbWVzc2FnZSBwYXJhbWV0ZXIuXHJcbi8vIFNlZSBQYXJzaW5nRXJyb3IuRXJyb3JzIGJlbG93IGZvciBhY2NlcHRhYmxlIGVycm9ycy5cclxuZnVuY3Rpb24gUGFyc2luZ0Vycm9yKGVycm9yRGF0YSwgbWVzc2FnZSkge1xyXG4gICAgdGhpcy5uYW1lID0gXCJQYXJzaW5nRXJyb3JcIjtcclxuICAgIHRoaXMuY29kZSA9IGVycm9yRGF0YS5jb2RlO1xyXG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZSB8fCBlcnJvckRhdGEubWVzc2FnZTtcclxufVxyXG5QYXJzaW5nRXJyb3IucHJvdG90eXBlID0gX29iakNyZWF0ZShFcnJvci5wcm90b3R5cGUpO1xyXG5QYXJzaW5nRXJyb3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUGFyc2luZ0Vycm9yO1xyXG5cclxuLy8gUGFyc2luZ0Vycm9yIG1ldGFkYXRhIGZvciBhY2NlcHRhYmxlIFBhcnNpbmdFcnJvcnMuXHJcblBhcnNpbmdFcnJvci5FcnJvcnMgPSB7XHJcbiAgICBCYWRTaWduYXR1cmU6IHtcclxuICAgICAgICBjb2RlOiAwLFxyXG4gICAgICAgIG1lc3NhZ2U6IFwiTWFsZm9ybWVkIFdlYlZUVCBzaWduYXR1cmUuXCJcclxuICAgIH0sXHJcbiAgICBCYWRUaW1lU3RhbXA6IHtcclxuICAgICAgICBjb2RlOiAxLFxyXG4gICAgICAgIG1lc3NhZ2U6IFwiTWFsZm9ybWVkIHRpbWUgc3RhbXAuXCJcclxuICAgIH1cclxufTtcclxuXHJcbi8vIFRyeSB0byBwYXJzZSBpbnB1dCBhcyBhIHRpbWUgc3RhbXAuXHJcbmZ1bmN0aW9uIHBhcnNlVGltZVN0YW1wKGlucHV0KSB7XHJcblxyXG4gICAgZnVuY3Rpb24gY29tcHV0ZVNlY29uZHMoaCwgbSwgcywgZikge1xyXG4gICAgICAgIHJldHVybiAoaCB8IDApICogMzYwMCArIChtIHwgMCkgKiA2MCArIChzIHwgMCkgKyAoZiB8IDApIC8gMTAwMDtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgbSA9IGlucHV0Lm1hdGNoKC9eKFxcZCspOihcXGR7Mn0pKDpcXGR7Mn0pP1xcLihcXGR7M30pLyk7XHJcbiAgICBpZiAoIW0pIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobVszXSkge1xyXG4gICAgICAgIC8vIFRpbWVzdGFtcCB0YWtlcyB0aGUgZm9ybSBvZiBbaG91cnNdOlttaW51dGVzXTpbc2Vjb25kc10uW21pbGxpc2Vjb25kc11cclxuICAgICAgICByZXR1cm4gY29tcHV0ZVNlY29uZHMobVsxXSwgbVsyXSwgbVszXS5yZXBsYWNlKFwiOlwiLCBcIlwiKSwgbVs0XSk7XHJcbiAgICB9IGVsc2UgaWYgKG1bMV0gPiA1OSkge1xyXG4gICAgICAgIC8vIFRpbWVzdGFtcCB0YWtlcyB0aGUgZm9ybSBvZiBbaG91cnNdOlttaW51dGVzXS5bbWlsbGlzZWNvbmRzXVxyXG4gICAgICAgIC8vIEZpcnN0IHBvc2l0aW9uIGlzIGhvdXJzIGFzIGl0J3Mgb3ZlciA1OS5cclxuICAgICAgICByZXR1cm4gY29tcHV0ZVNlY29uZHMobVsxXSwgbVsyXSwgMCwgIG1bNF0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBUaW1lc3RhbXAgdGFrZXMgdGhlIGZvcm0gb2YgW21pbnV0ZXNdOltzZWNvbmRzXS5bbWlsbGlzZWNvbmRzXVxyXG4gICAgICAgIHJldHVybiBjb21wdXRlU2Vjb25kcygwLCBtWzFdLCBtWzJdLCBtWzRdKTtcclxuICAgIH1cclxufVxyXG5cclxuLy8gQSBzZXR0aW5ncyBvYmplY3QgaG9sZHMga2V5L3ZhbHVlIHBhaXJzIGFuZCB3aWxsIGlnbm9yZSBhbnl0aGluZyBidXQgdGhlIGZpcnN0XHJcbi8vIGFzc2lnbm1lbnQgdG8gYSBzcGVjaWZpYyBrZXkuXHJcbmZ1bmN0aW9uIFNldHRpbmdzKCkge1xyXG4gICAgdGhpcy52YWx1ZXMgPSBfb2JqQ3JlYXRlKG51bGwpO1xyXG59XHJcblxyXG5TZXR0aW5ncy5wcm90b3R5cGUgPSB7XHJcbiAgICAvLyBPbmx5IGFjY2VwdCB0aGUgZmlyc3QgYXNzaWdubWVudCB0byBhbnkga2V5LlxyXG4gICAgc2V0OiBmdW5jdGlvbihrLCB2KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmdldChrKSAmJiB2ICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWVzW2tdID0gdjtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8gUmV0dXJuIHRoZSB2YWx1ZSBmb3IgYSBrZXksIG9yIGEgZGVmYXVsdCB2YWx1ZS5cclxuICAgIC8vIElmICdkZWZhdWx0S2V5JyBpcyBwYXNzZWQgdGhlbiAnZGZsdCcgaXMgYXNzdW1lZCB0byBiZSBhbiBvYmplY3Qgd2l0aFxyXG4gICAgLy8gYSBudW1iZXIgb2YgcG9zc2libGUgZGVmYXVsdCB2YWx1ZXMgYXMgcHJvcGVydGllcyB3aGVyZSAnZGVmYXVsdEtleScgaXNcclxuICAgIC8vIHRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRoYXQgd2lsbCBiZSBjaG9zZW47IG90aGVyd2lzZSBpdCdzIGFzc3VtZWQgdG8gYmVcclxuICAgIC8vIGEgc2luZ2xlIHZhbHVlLlxyXG4gICAgZ2V0OiBmdW5jdGlvbihrLCBkZmx0LCBkZWZhdWx0S2V5KSB7XHJcbiAgICAgICAgaWYgKGRlZmF1bHRLZXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFzKGspID8gdGhpcy52YWx1ZXNba10gOiBkZmx0W2RlZmF1bHRLZXldO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5oYXMoaykgPyB0aGlzLnZhbHVlc1trXSA6IGRmbHQ7XHJcbiAgICB9LFxyXG4gICAgLy8gQ2hlY2sgd2hldGhlciB3ZSBoYXZlIGEgdmFsdWUgZm9yIGEga2V5LlxyXG4gICAgaGFzOiBmdW5jdGlvbihrKSB7XHJcbiAgICAgICAgcmV0dXJuIGsgaW4gdGhpcy52YWx1ZXM7XHJcbiAgICB9LFxyXG4gICAgLy8gQWNjZXB0IGEgc2V0dGluZyBpZiBpdHMgb25lIG9mIHRoZSBnaXZlbiBhbHRlcm5hdGl2ZXMuXHJcbiAgICBhbHQ6IGZ1bmN0aW9uKGssIHYsIGEpIHtcclxuICAgICAgICBmb3IgKHZhciBuID0gMDsgbiA8IGEubGVuZ3RoOyArK24pIHtcclxuICAgICAgICAgICAgaWYgKHYgPT09IGFbbl0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0KGssIHYpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8gQWNjZXB0IGEgc2V0dGluZyBpZiBpdHMgYSB2YWxpZCAoc2lnbmVkKSBpbnRlZ2VyLlxyXG4gICAgaW50ZWdlcjogZnVuY3Rpb24oaywgdikge1xyXG4gICAgICAgIGlmICgvXi0/XFxkKyQvLnRlc3QodikpIHsgLy8gaW50ZWdlclxyXG4gICAgICAgICAgICB0aGlzLnNldChrLCBwYXJzZUludCh2LCAxMCkpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvLyBBY2NlcHQgYSBzZXR0aW5nIGlmIGl0cyBhIHZhbGlkIHBlcmNlbnRhZ2UuXHJcbiAgICBwZXJjZW50OiBmdW5jdGlvbihrLCB2KSB7XHJcbiAgICAgICAgdmFyIG07XHJcbiAgICAgICAgaWYgKChtID0gdi5tYXRjaCgvXihbXFxkXXsxLDN9KShcXC5bXFxkXSopPyUkLykpKSB7XHJcbiAgICAgICAgICAgIHYgPSBwYXJzZUZsb2F0KHYpO1xyXG4gICAgICAgICAgICBpZiAodiA+PSAwICYmIHYgPD0gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldChrLCB2KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufTtcclxuXHJcbi8vIEhlbHBlciBmdW5jdGlvbiB0byBwYXJzZSBpbnB1dCBpbnRvIGdyb3VwcyBzZXBhcmF0ZWQgYnkgJ2dyb3VwRGVsaW0nLCBhbmRcclxuLy8gaW50ZXJwcmV0ZSBlYWNoIGdyb3VwIGFzIGEga2V5L3ZhbHVlIHBhaXIgc2VwYXJhdGVkIGJ5ICdrZXlWYWx1ZURlbGltJy5cclxuZnVuY3Rpb24gcGFyc2VPcHRpb25zKGlucHV0LCBjYWxsYmFjaywga2V5VmFsdWVEZWxpbSwgZ3JvdXBEZWxpbSkge1xyXG4gICAgdmFyIGdyb3VwcyA9IGdyb3VwRGVsaW0gPyBpbnB1dC5zcGxpdChncm91cERlbGltKSA6IFtpbnB1dF07XHJcbiAgICBmb3IgKHZhciBpIGluIGdyb3Vwcykge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZ3JvdXBzW2ldICE9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIga3YgPSBncm91cHNbaV0uc3BsaXQoa2V5VmFsdWVEZWxpbSk7XHJcbiAgICAgICAgaWYgKGt2Lmxlbmd0aCAhPT0gMikge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGsgPSBrdlswXTtcclxuICAgICAgICB2YXIgdiA9IGt2WzFdO1xyXG4gICAgICAgIGNhbGxiYWNrKGssIHYpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBwYXJzZUN1ZShpbnB1dCwgY3VlLCByZWdpb25MaXN0KSB7XHJcbiAgICAvLyBSZW1lbWJlciB0aGUgb3JpZ2luYWwgaW5wdXQgaWYgd2UgbmVlZCB0byB0aHJvdyBhbiBlcnJvci5cclxuICAgIHZhciBvSW5wdXQgPSBpbnB1dDtcclxuICAgIC8vIDQuMSBXZWJWVFQgdGltZXN0YW1wXHJcbiAgICBmdW5jdGlvbiBjb25zdW1lVGltZVN0YW1wKCkge1xyXG4gICAgICAgIHZhciB0cyA9IHBhcnNlVGltZVN0YW1wKGlucHV0KTtcclxuICAgICAgICBpZiAodHMgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNpbmdFcnJvcihQYXJzaW5nRXJyb3IuRXJyb3JzLkJhZFRpbWVTdGFtcCxcclxuICAgICAgICAgICAgICAgIFwiTWFsZm9ybWVkIHRpbWVzdGFtcDogXCIgKyBvSW5wdXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBSZW1vdmUgdGltZSBzdGFtcCBmcm9tIGlucHV0LlxyXG4gICAgICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZSgvXlteXFxzYS16QS1aLV0rLywgXCJcIik7XHJcbiAgICAgICAgcmV0dXJuIHRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIDQuNC4yIFdlYlZUVCBjdWUgc2V0dGluZ3NcclxuICAgIGZ1bmN0aW9uIGNvbnN1bWVDdWVTZXR0aW5ncyhpbnB1dCwgY3VlKSB7XHJcbiAgICAgICAgdmFyIHNldHRpbmdzID0gbmV3IFNldHRpbmdzKCk7XHJcblxyXG4gICAgICAgIHBhcnNlT3B0aW9ucyhpbnB1dCwgZnVuY3Rpb24gKGssIHYpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChrKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwicmVnaW9uXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRmluZCB0aGUgbGFzdCByZWdpb24gd2UgcGFyc2VkIHdpdGggdGhlIHNhbWUgcmVnaW9uIGlkLlxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSByZWdpb25MaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWdpb25MaXN0W2ldLmlkID09PSB2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5zZXQoaywgcmVnaW9uTGlzdFtpXS5yZWdpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwidmVydGljYWxcIjpcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5hbHQoaywgdiwgW1wicmxcIiwgXCJsclwiXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwibGluZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWxzID0gdi5zcGxpdChcIixcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHMwID0gdmFsc1swXTtcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5pbnRlZ2VyKGssIHZhbHMwKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5wZXJjZW50KGssIHZhbHMwKSA/IHNldHRpbmdzLnNldChcInNuYXBUb0xpbmVzXCIsIGZhbHNlKSA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuYWx0KGssIHZhbHMwLCBbXCJhdXRvXCJdKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFscy5sZW5ndGggPT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuYWx0KFwibGluZUFsaWduXCIsIHZhbHNbMV0sIFtcInN0YXJ0XCIsIFwibWlkZGxlXCIsIFwiZW5kXCJdKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwicG9zaXRpb25cIjpcclxuICAgICAgICAgICAgICAgICAgICB2YWxzID0gdi5zcGxpdChcIixcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MucGVyY2VudChrLCB2YWxzWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFscy5sZW5ndGggPT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuYWx0KFwicG9zaXRpb25BbGlnblwiLCB2YWxzWzFdLCBbXCJzdGFydFwiLCBcIm1pZGRsZVwiLCBcImVuZFwiXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInNpemVcIjpcclxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5wZXJjZW50KGssIHYpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImFsaWduXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuYWx0KGssIHYsIFtcInN0YXJ0XCIsIFwibWlkZGxlXCIsIFwiZW5kXCIsIFwibGVmdFwiLCBcInJpZ2h0XCJdKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIC86LywgL1xccy8pO1xyXG5cclxuICAgICAgICAvLyBBcHBseSBkZWZhdWx0IHZhbHVlcyBmb3IgYW55IG1pc3NpbmcgZmllbGRzLlxyXG4gICAgICAgIGN1ZS5yZWdpb24gPSBzZXR0aW5ncy5nZXQoXCJyZWdpb25cIiwgbnVsbCk7XHJcbiAgICAgICAgY3VlLnZlcnRpY2FsID0gc2V0dGluZ3MuZ2V0KFwidmVydGljYWxcIiwgXCJcIik7XHJcbiAgICAgICAgY3VlLmxpbmUgPSBzZXR0aW5ncy5nZXQoXCJsaW5lXCIsIFwiYXV0b1wiKTtcclxuICAgICAgICBjdWUubGluZUFsaWduID0gc2V0dGluZ3MuZ2V0KFwibGluZUFsaWduXCIsIFwic3RhcnRcIik7XHJcbiAgICAgICAgY3VlLnNuYXBUb0xpbmVzID0gc2V0dGluZ3MuZ2V0KFwic25hcFRvTGluZXNcIiwgdHJ1ZSk7XHJcbiAgICAgICAgY3VlLnNpemUgPSBzZXR0aW5ncy5nZXQoXCJzaXplXCIsIDEwMCk7XHJcbiAgICAgICAgLy9jdWUuYWxpZ24gPSBzZXR0aW5ncy5nZXQoXCJhbGlnblwiLCBcIm1pZGRsZVwiKTtcclxuICAgICAgICBjdWUucG9zaXRpb24gPSBzZXR0aW5ncy5nZXQoXCJwb3NpdGlvblwiLCBcImF1dG9cIik7XHJcbiAgICAgICAgY3VlLnBvc2l0aW9uQWxpZ24gPSBzZXR0aW5ncy5nZXQoXCJwb3NpdGlvbkFsaWduXCIsIHtcclxuICAgICAgICAgICAgc3RhcnQ6IFwic3RhcnRcIixcclxuICAgICAgICAgICAgbGVmdDogXCJzdGFydFwiLFxyXG4gICAgICAgICAgICBtaWRkbGU6IFwibWlkZGxlXCIsXHJcbiAgICAgICAgICAgIGVuZDogXCJlbmRcIixcclxuICAgICAgICAgICAgcmlnaHQ6IFwiZW5kXCJcclxuICAgICAgICB9LCBjdWUuYWxpZ24pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNraXBXaGl0ZXNwYWNlKCkge1xyXG4gICAgICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZSgvXlxccysvLCBcIlwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA0LjEgV2ViVlRUIGN1ZSB0aW1pbmdzLlxyXG4gICAgc2tpcFdoaXRlc3BhY2UoKTtcclxuICAgIGN1ZS5zdGFydFRpbWUgPSBjb25zdW1lVGltZVN0YW1wKCk7ICAgLy8gKDEpIGNvbGxlY3QgY3VlIHN0YXJ0IHRpbWVcclxuICAgIHNraXBXaGl0ZXNwYWNlKCk7XHJcbiAgICBpZiAoaW5wdXQuc3Vic3RyKDAsIDMpICE9PSBcIi0tPlwiKSB7ICAgICAvLyAoMykgbmV4dCBjaGFyYWN0ZXJzIG11c3QgbWF0Y2ggXCItLT5cIlxyXG4gICAgICAgIHRocm93IG5ldyBQYXJzaW5nRXJyb3IoUGFyc2luZ0Vycm9yLkVycm9ycy5CYWRUaW1lU3RhbXAsXHJcbiAgICAgICAgICAgIFwiTWFsZm9ybWVkIHRpbWUgc3RhbXAgKHRpbWUgc3RhbXBzIG11c3QgYmUgc2VwYXJhdGVkIGJ5ICctLT4nKTogXCIgK1xyXG4gICAgICAgICAgICBvSW5wdXQpO1xyXG4gICAgfVxyXG4gICAgaW5wdXQgPSBpbnB1dC5zdWJzdHIoMyk7XHJcbiAgICBza2lwV2hpdGVzcGFjZSgpO1xyXG4gICAgY3VlLmVuZFRpbWUgPSBjb25zdW1lVGltZVN0YW1wKCk7ICAgICAvLyAoNSkgY29sbGVjdCBjdWUgZW5kIHRpbWVcclxuXHJcbiAgICAvLyA0LjEgV2ViVlRUIGN1ZSBzZXR0aW5ncyBsaXN0LlxyXG4gICAgc2tpcFdoaXRlc3BhY2UoKTtcclxuICAgIGNvbnN1bWVDdWVTZXR0aW5ncyhpbnB1dCwgY3VlKTtcclxufVxyXG5cclxudmFyIEVTQ0FQRSA9IHtcclxuICAgIFwiJmFtcDtcIjogXCImXCIsXHJcbiAgICBcIiZsdDtcIjogXCI8XCIsXHJcbiAgICBcIiZndDtcIjogXCI+XCIsXHJcbiAgICBcIiZscm07XCI6IFwiXFx1MjAwZVwiLFxyXG4gICAgXCImcmxtO1wiOiBcIlxcdTIwMGZcIixcclxuICAgIFwiJm5ic3A7XCI6IFwiXFx1MDBhMFwiXHJcbn07XHJcblxyXG52YXIgVEFHX05BTUUgPSB7XHJcbiAgICBjOiBcInNwYW5cIixcclxuICAgIGk6IFwiaVwiLFxyXG4gICAgYjogXCJiXCIsXHJcbiAgICB1OiBcInVcIixcclxuICAgIHJ1Ynk6IFwicnVieVwiLFxyXG4gICAgcnQ6IFwicnRcIixcclxuICAgIHY6IFwic3BhblwiLFxyXG4gICAgbGFuZzogXCJzcGFuXCJcclxufTtcclxuXHJcbnZhciBUQUdfQU5OT1RBVElPTiA9IHtcclxuICAgIHY6IFwidGl0bGVcIixcclxuICAgIGxhbmc6IFwibGFuZ1wiXHJcbn07XHJcblxyXG52YXIgTkVFRFNfUEFSRU5UID0ge1xyXG4gICAgcnQ6IFwicnVieVwiXHJcbn07XHJcblxyXG4vLyBQYXJzZSBjb250ZW50IGludG8gYSBkb2N1bWVudCBmcmFnbWVudC5cclxuZnVuY3Rpb24gcGFyc2VDb250ZW50KHdpbmRvdywgaW5wdXQpIHtcclxuICAgIGZ1bmN0aW9uIG5leHRUb2tlbigpIHtcclxuICAgICAgICAvLyBDaGVjayBmb3IgZW5kLW9mLXN0cmluZy5cclxuICAgICAgICBpZiAoIWlucHV0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ29uc3VtZSAnbicgY2hhcmFjdGVycyBmcm9tIHRoZSBpbnB1dC5cclxuICAgICAgICBmdW5jdGlvbiBjb25zdW1lKHJlc3VsdCkge1xyXG4gICAgICAgICAgICBpbnB1dCA9IGlucHV0LnN1YnN0cihyZXN1bHQubGVuZ3RoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBtID0gaW5wdXQubWF0Y2goL14oW148XSopKDxbXj5dKz4/KT8vKTtcclxuICAgICAgICAvLyBJZiB0aGVyZSBpcyBzb21lIHRleHQgYmVmb3JlIHRoZSBuZXh0IHRhZywgcmV0dXJuIGl0LCBvdGhlcndpc2UgcmV0dXJuXHJcbiAgICAgICAgLy8gdGhlIHRhZy5cclxuICAgICAgICByZXR1cm4gY29uc3VtZShtWzFdID8gbVsxXSA6IG1bMl0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFVuZXNjYXBlIGEgc3RyaW5nICdzJy5cclxuICAgIGZ1bmN0aW9uIHVuZXNjYXBlMShlKSB7XHJcbiAgICAgICAgcmV0dXJuIEVTQ0FQRVtlXTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHVuZXNjYXBlKHMpIHtcclxuICAgICAgICB3aGlsZSAoKG0gPSBzLm1hdGNoKC8mKGFtcHxsdHxndHxscm18cmxtfG5ic3ApOy8pKSkge1xyXG4gICAgICAgICAgICBzID0gcy5yZXBsYWNlKG1bMF0sIHVuZXNjYXBlMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNob3VsZEFkZChjdXJyZW50LCBlbGVtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuICFORUVEU19QQVJFTlRbZWxlbWVudC5sb2NhbE5hbWVdIHx8XHJcbiAgICAgICAgICAgIE5FRURTX1BBUkVOVFtlbGVtZW50LmxvY2FsTmFtZV0gPT09IGN1cnJlbnQubG9jYWxOYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENyZWF0ZSBhbiBlbGVtZW50IGZvciB0aGlzIHRhZy5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodHlwZSwgYW5ub3RhdGlvbikge1xyXG4gICAgICAgIHZhciB0YWdOYW1lID0gVEFHX05BTUVbdHlwZV07XHJcbiAgICAgICAgaWYgKCF0YWdOYW1lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZWxlbWVudCA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xyXG4gICAgICAgIGVsZW1lbnQubG9jYWxOYW1lID0gdGFnTmFtZTtcclxuICAgICAgICB2YXIgbmFtZSA9IFRBR19BTk5PVEFUSU9OW3R5cGVdO1xyXG4gICAgICAgIGlmIChuYW1lICYmIGFubm90YXRpb24pIHtcclxuICAgICAgICAgICAgZWxlbWVudFtuYW1lXSA9IGFubm90YXRpb24udHJpbSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgcm9vdERpdiA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLFxyXG4gICAgICAgIGN1cnJlbnQgPSByb290RGl2LFxyXG4gICAgICAgIHQsXHJcbiAgICAgICAgdGFnU3RhY2sgPSBbXTtcclxuXHJcbiAgICB3aGlsZSAoKHQgPSBuZXh0VG9rZW4oKSkgIT09IG51bGwpIHtcclxuICAgICAgICBpZiAodFswXSA9PT0gJzwnKSB7XHJcbiAgICAgICAgICAgIGlmICh0WzFdID09PSBcIi9cIikge1xyXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIGNsb3NpbmcgdGFnIG1hdGNoZXMsIG1vdmUgYmFjayB1cCB0byB0aGUgcGFyZW50IG5vZGUuXHJcbiAgICAgICAgICAgICAgICBpZiAodGFnU3RhY2subGVuZ3RoICYmXHJcbiAgICAgICAgICAgICAgICAgICAgdGFnU3RhY2tbdGFnU3RhY2subGVuZ3RoIC0gMV0gPT09IHQuc3Vic3RyKDIpLnJlcGxhY2UoXCI+XCIsIFwiXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFnU3RhY2sucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQucGFyZW50Tm9kZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSBqdXN0IGlnbm9yZSB0aGUgZW5kIHRhZy5cclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciB0cyA9IHBhcnNlVGltZVN0YW1wKHQuc3Vic3RyKDEsIHQubGVuZ3RoIC0gMikpO1xyXG4gICAgICAgICAgICB2YXIgbm9kZTtcclxuICAgICAgICAgICAgaWYgKHRzKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUaW1lc3RhbXBzIGFyZSBsZWFkIG5vZGVzIGFzIHdlbGwuXHJcbiAgICAgICAgICAgICAgICBub2RlID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZVByb2Nlc3NpbmdJbnN0cnVjdGlvbihcInRpbWVzdGFtcFwiLCB0cyk7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50LmFwcGVuZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIG0gPSB0Lm1hdGNoKC9ePChbXi5cXHMvMC05Pl0rKShcXC5bXlxcc1xcXFw+XSspPyhbXj5cXFxcXSspPyhcXFxcPyk+PyQvKTtcclxuICAgICAgICAgICAgLy8gSWYgd2UgY2FuJ3QgcGFyc2UgdGhlIHRhZywgc2tpcCB0byB0aGUgbmV4dCB0YWcuXHJcbiAgICAgICAgICAgIGlmICghbSkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gVHJ5IHRvIGNvbnN0cnVjdCBhbiBlbGVtZW50LCBhbmQgaWdub3JlIHRoZSB0YWcgaWYgd2UgY291bGRuJ3QuXHJcbiAgICAgICAgICAgIG5vZGUgPSBjcmVhdGVFbGVtZW50KG1bMV0sIG1bM10pO1xyXG4gICAgICAgICAgICBpZiAoIW5vZGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIERldGVybWluZSBpZiB0aGUgdGFnIHNob3VsZCBiZSBhZGRlZCBiYXNlZCBvbiB0aGUgY29udGV4dCBvZiB3aGVyZSBpdFxyXG4gICAgICAgICAgICAvLyBpcyBwbGFjZWQgaW4gdGhlIGN1ZXRleHQuXHJcbiAgICAgICAgICAgIGlmICghc2hvdWxkQWRkKGN1cnJlbnQsIG5vZGUpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBTZXQgdGhlIGNsYXNzIGxpc3QgKGFzIGEgbGlzdCBvZiBjbGFzc2VzLCBzZXBhcmF0ZWQgYnkgc3BhY2UpLlxyXG4gICAgICAgICAgICBpZiAobVsyXSkge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5jbGFzc05hbWUgPSBtWzJdLnN1YnN0cigxKS5yZXBsYWNlKCcuJywgJyAnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBBcHBlbmQgdGhlIG5vZGUgdG8gdGhlIGN1cnJlbnQgbm9kZSwgYW5kIGVudGVyIHRoZSBzY29wZSBvZiB0aGUgbmV3XHJcbiAgICAgICAgICAgIC8vIG5vZGUuXHJcbiAgICAgICAgICAgIHRhZ1N0YWNrLnB1c2gobVsxXSk7XHJcbiAgICAgICAgICAgIGN1cnJlbnQuYXBwZW5kQ2hpbGQobm9kZSk7XHJcbiAgICAgICAgICAgIGN1cnJlbnQgPSBub2RlO1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRleHQgbm9kZXMgYXJlIGxlYWYgbm9kZXMuXHJcbiAgICAgICAgY3VycmVudC5hcHBlbmRDaGlsZCh3aW5kb3cuZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodW5lc2NhcGUodCkpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcm9vdERpdjtcclxufVxyXG5cclxuLy8gVGhpcyBpcyBhIGxpc3Qgb2YgYWxsIHRoZSBVbmljb2RlIGNoYXJhY3RlcnMgdGhhdCBoYXZlIGEgc3Ryb25nXHJcbi8vIHJpZ2h0LXRvLWxlZnQgY2F0ZWdvcnkuIFdoYXQgdGhpcyBtZWFucyBpcyB0aGF0IHRoZXNlIGNoYXJhY3RlcnMgYXJlXHJcbi8vIHdyaXR0ZW4gcmlnaHQtdG8tbGVmdCBmb3Igc3VyZS4gSXQgd2FzIGdlbmVyYXRlZCBieSBwdWxsaW5nIGFsbCB0aGUgc3Ryb25nXHJcbi8vIHJpZ2h0LXRvLWxlZnQgY2hhcmFjdGVycyBvdXQgb2YgdGhlIFVuaWNvZGUgZGF0YSB0YWJsZS4gVGhhdCB0YWJsZSBjYW5cclxuLy8gZm91bmQgYXQ6IGh0dHA6Ly93d3cudW5pY29kZS5vcmcvUHVibGljL1VOSURBVEEvVW5pY29kZURhdGEudHh0XHJcbnZhciBzdHJvbmdSVExDaGFycyA9IFsweDA1QkUsIDB4MDVDMCwgMHgwNUMzLCAweDA1QzYsIDB4MDVEMCwgMHgwNUQxLFxyXG4gICAgMHgwNUQyLCAweDA1RDMsIDB4MDVENCwgMHgwNUQ1LCAweDA1RDYsIDB4MDVENywgMHgwNUQ4LCAweDA1RDksIDB4MDVEQSxcclxuICAgIDB4MDVEQiwgMHgwNURDLCAweDA1REQsIDB4MDVERSwgMHgwNURGLCAweDA1RTAsIDB4MDVFMSwgMHgwNUUyLCAweDA1RTMsXHJcbiAgICAweDA1RTQsIDB4MDVFNSwgMHgwNUU2LCAweDA1RTcsIDB4MDVFOCwgMHgwNUU5LCAweDA1RUEsIDB4MDVGMCwgMHgwNUYxLFxyXG4gICAgMHgwNUYyLCAweDA1RjMsIDB4MDVGNCwgMHgwNjA4LCAweDA2MEIsIDB4MDYwRCwgMHgwNjFCLCAweDA2MUUsIDB4MDYxRixcclxuICAgIDB4MDYyMCwgMHgwNjIxLCAweDA2MjIsIDB4MDYyMywgMHgwNjI0LCAweDA2MjUsIDB4MDYyNiwgMHgwNjI3LCAweDA2MjgsXHJcbiAgICAweDA2MjksIDB4MDYyQSwgMHgwNjJCLCAweDA2MkMsIDB4MDYyRCwgMHgwNjJFLCAweDA2MkYsIDB4MDYzMCwgMHgwNjMxLFxyXG4gICAgMHgwNjMyLCAweDA2MzMsIDB4MDYzNCwgMHgwNjM1LCAweDA2MzYsIDB4MDYzNywgMHgwNjM4LCAweDA2MzksIDB4MDYzQSxcclxuICAgIDB4MDYzQiwgMHgwNjNDLCAweDA2M0QsIDB4MDYzRSwgMHgwNjNGLCAweDA2NDAsIDB4MDY0MSwgMHgwNjQyLCAweDA2NDMsXHJcbiAgICAweDA2NDQsIDB4MDY0NSwgMHgwNjQ2LCAweDA2NDcsIDB4MDY0OCwgMHgwNjQ5LCAweDA2NEEsIDB4MDY2RCwgMHgwNjZFLFxyXG4gICAgMHgwNjZGLCAweDA2NzEsIDB4MDY3MiwgMHgwNjczLCAweDA2NzQsIDB4MDY3NSwgMHgwNjc2LCAweDA2NzcsIDB4MDY3OCxcclxuICAgIDB4MDY3OSwgMHgwNjdBLCAweDA2N0IsIDB4MDY3QywgMHgwNjdELCAweDA2N0UsIDB4MDY3RiwgMHgwNjgwLCAweDA2ODEsXHJcbiAgICAweDA2ODIsIDB4MDY4MywgMHgwNjg0LCAweDA2ODUsIDB4MDY4NiwgMHgwNjg3LCAweDA2ODgsIDB4MDY4OSwgMHgwNjhBLFxyXG4gICAgMHgwNjhCLCAweDA2OEMsIDB4MDY4RCwgMHgwNjhFLCAweDA2OEYsIDB4MDY5MCwgMHgwNjkxLCAweDA2OTIsIDB4MDY5MyxcclxuICAgIDB4MDY5NCwgMHgwNjk1LCAweDA2OTYsIDB4MDY5NywgMHgwNjk4LCAweDA2OTksIDB4MDY5QSwgMHgwNjlCLCAweDA2OUMsXHJcbiAgICAweDA2OUQsIDB4MDY5RSwgMHgwNjlGLCAweDA2QTAsIDB4MDZBMSwgMHgwNkEyLCAweDA2QTMsIDB4MDZBNCwgMHgwNkE1LFxyXG4gICAgMHgwNkE2LCAweDA2QTcsIDB4MDZBOCwgMHgwNkE5LCAweDA2QUEsIDB4MDZBQiwgMHgwNkFDLCAweDA2QUQsIDB4MDZBRSxcclxuICAgIDB4MDZBRiwgMHgwNkIwLCAweDA2QjEsIDB4MDZCMiwgMHgwNkIzLCAweDA2QjQsIDB4MDZCNSwgMHgwNkI2LCAweDA2QjcsXHJcbiAgICAweDA2QjgsIDB4MDZCOSwgMHgwNkJBLCAweDA2QkIsIDB4MDZCQywgMHgwNkJELCAweDA2QkUsIDB4MDZCRiwgMHgwNkMwLFxyXG4gICAgMHgwNkMxLCAweDA2QzIsIDB4MDZDMywgMHgwNkM0LCAweDA2QzUsIDB4MDZDNiwgMHgwNkM3LCAweDA2QzgsIDB4MDZDOSxcclxuICAgIDB4MDZDQSwgMHgwNkNCLCAweDA2Q0MsIDB4MDZDRCwgMHgwNkNFLCAweDA2Q0YsIDB4MDZEMCwgMHgwNkQxLCAweDA2RDIsXHJcbiAgICAweDA2RDMsIDB4MDZENCwgMHgwNkQ1LCAweDA2RTUsIDB4MDZFNiwgMHgwNkVFLCAweDA2RUYsIDB4MDZGQSwgMHgwNkZCLFxyXG4gICAgMHgwNkZDLCAweDA2RkQsIDB4MDZGRSwgMHgwNkZGLCAweDA3MDAsIDB4MDcwMSwgMHgwNzAyLCAweDA3MDMsIDB4MDcwNCxcclxuICAgIDB4MDcwNSwgMHgwNzA2LCAweDA3MDcsIDB4MDcwOCwgMHgwNzA5LCAweDA3MEEsIDB4MDcwQiwgMHgwNzBDLCAweDA3MEQsXHJcbiAgICAweDA3MEYsIDB4MDcxMCwgMHgwNzEyLCAweDA3MTMsIDB4MDcxNCwgMHgwNzE1LCAweDA3MTYsIDB4MDcxNywgMHgwNzE4LFxyXG4gICAgMHgwNzE5LCAweDA3MUEsIDB4MDcxQiwgMHgwNzFDLCAweDA3MUQsIDB4MDcxRSwgMHgwNzFGLCAweDA3MjAsIDB4MDcyMSxcclxuICAgIDB4MDcyMiwgMHgwNzIzLCAweDA3MjQsIDB4MDcyNSwgMHgwNzI2LCAweDA3MjcsIDB4MDcyOCwgMHgwNzI5LCAweDA3MkEsXHJcbiAgICAweDA3MkIsIDB4MDcyQywgMHgwNzJELCAweDA3MkUsIDB4MDcyRiwgMHgwNzRELCAweDA3NEUsIDB4MDc0RiwgMHgwNzUwLFxyXG4gICAgMHgwNzUxLCAweDA3NTIsIDB4MDc1MywgMHgwNzU0LCAweDA3NTUsIDB4MDc1NiwgMHgwNzU3LCAweDA3NTgsIDB4MDc1OSxcclxuICAgIDB4MDc1QSwgMHgwNzVCLCAweDA3NUMsIDB4MDc1RCwgMHgwNzVFLCAweDA3NUYsIDB4MDc2MCwgMHgwNzYxLCAweDA3NjIsXHJcbiAgICAweDA3NjMsIDB4MDc2NCwgMHgwNzY1LCAweDA3NjYsIDB4MDc2NywgMHgwNzY4LCAweDA3NjksIDB4MDc2QSwgMHgwNzZCLFxyXG4gICAgMHgwNzZDLCAweDA3NkQsIDB4MDc2RSwgMHgwNzZGLCAweDA3NzAsIDB4MDc3MSwgMHgwNzcyLCAweDA3NzMsIDB4MDc3NCxcclxuICAgIDB4MDc3NSwgMHgwNzc2LCAweDA3NzcsIDB4MDc3OCwgMHgwNzc5LCAweDA3N0EsIDB4MDc3QiwgMHgwNzdDLCAweDA3N0QsXHJcbiAgICAweDA3N0UsIDB4MDc3RiwgMHgwNzgwLCAweDA3ODEsIDB4MDc4MiwgMHgwNzgzLCAweDA3ODQsIDB4MDc4NSwgMHgwNzg2LFxyXG4gICAgMHgwNzg3LCAweDA3ODgsIDB4MDc4OSwgMHgwNzhBLCAweDA3OEIsIDB4MDc4QywgMHgwNzhELCAweDA3OEUsIDB4MDc4RixcclxuICAgIDB4MDc5MCwgMHgwNzkxLCAweDA3OTIsIDB4MDc5MywgMHgwNzk0LCAweDA3OTUsIDB4MDc5NiwgMHgwNzk3LCAweDA3OTgsXHJcbiAgICAweDA3OTksIDB4MDc5QSwgMHgwNzlCLCAweDA3OUMsIDB4MDc5RCwgMHgwNzlFLCAweDA3OUYsIDB4MDdBMCwgMHgwN0ExLFxyXG4gICAgMHgwN0EyLCAweDA3QTMsIDB4MDdBNCwgMHgwN0E1LCAweDA3QjEsIDB4MDdDMCwgMHgwN0MxLCAweDA3QzIsIDB4MDdDMyxcclxuICAgIDB4MDdDNCwgMHgwN0M1LCAweDA3QzYsIDB4MDdDNywgMHgwN0M4LCAweDA3QzksIDB4MDdDQSwgMHgwN0NCLCAweDA3Q0MsXHJcbiAgICAweDA3Q0QsIDB4MDdDRSwgMHgwN0NGLCAweDA3RDAsIDB4MDdEMSwgMHgwN0QyLCAweDA3RDMsIDB4MDdENCwgMHgwN0Q1LFxyXG4gICAgMHgwN0Q2LCAweDA3RDcsIDB4MDdEOCwgMHgwN0Q5LCAweDA3REEsIDB4MDdEQiwgMHgwN0RDLCAweDA3REQsIDB4MDdERSxcclxuICAgIDB4MDdERiwgMHgwN0UwLCAweDA3RTEsIDB4MDdFMiwgMHgwN0UzLCAweDA3RTQsIDB4MDdFNSwgMHgwN0U2LCAweDA3RTcsXHJcbiAgICAweDA3RTgsIDB4MDdFOSwgMHgwN0VBLCAweDA3RjQsIDB4MDdGNSwgMHgwN0ZBLCAweDA4MDAsIDB4MDgwMSwgMHgwODAyLFxyXG4gICAgMHgwODAzLCAweDA4MDQsIDB4MDgwNSwgMHgwODA2LCAweDA4MDcsIDB4MDgwOCwgMHgwODA5LCAweDA4MEEsIDB4MDgwQixcclxuICAgIDB4MDgwQywgMHgwODBELCAweDA4MEUsIDB4MDgwRiwgMHgwODEwLCAweDA4MTEsIDB4MDgxMiwgMHgwODEzLCAweDA4MTQsXHJcbiAgICAweDA4MTUsIDB4MDgxQSwgMHgwODI0LCAweDA4MjgsIDB4MDgzMCwgMHgwODMxLCAweDA4MzIsIDB4MDgzMywgMHgwODM0LFxyXG4gICAgMHgwODM1LCAweDA4MzYsIDB4MDgzNywgMHgwODM4LCAweDA4MzksIDB4MDgzQSwgMHgwODNCLCAweDA4M0MsIDB4MDgzRCxcclxuICAgIDB4MDgzRSwgMHgwODQwLCAweDA4NDEsIDB4MDg0MiwgMHgwODQzLCAweDA4NDQsIDB4MDg0NSwgMHgwODQ2LCAweDA4NDcsXHJcbiAgICAweDA4NDgsIDB4MDg0OSwgMHgwODRBLCAweDA4NEIsIDB4MDg0QywgMHgwODRELCAweDA4NEUsIDB4MDg0RiwgMHgwODUwLFxyXG4gICAgMHgwODUxLCAweDA4NTIsIDB4MDg1MywgMHgwODU0LCAweDA4NTUsIDB4MDg1NiwgMHgwODU3LCAweDA4NTgsIDB4MDg1RSxcclxuICAgIDB4MDhBMCwgMHgwOEEyLCAweDA4QTMsIDB4MDhBNCwgMHgwOEE1LCAweDA4QTYsIDB4MDhBNywgMHgwOEE4LCAweDA4QTksXHJcbiAgICAweDA4QUEsIDB4MDhBQiwgMHgwOEFDLCAweDIwMEYsIDB4RkIxRCwgMHhGQjFGLCAweEZCMjAsIDB4RkIyMSwgMHhGQjIyLFxyXG4gICAgMHhGQjIzLCAweEZCMjQsIDB4RkIyNSwgMHhGQjI2LCAweEZCMjcsIDB4RkIyOCwgMHhGQjJBLCAweEZCMkIsIDB4RkIyQyxcclxuICAgIDB4RkIyRCwgMHhGQjJFLCAweEZCMkYsIDB4RkIzMCwgMHhGQjMxLCAweEZCMzIsIDB4RkIzMywgMHhGQjM0LCAweEZCMzUsXHJcbiAgICAweEZCMzYsIDB4RkIzOCwgMHhGQjM5LCAweEZCM0EsIDB4RkIzQiwgMHhGQjNDLCAweEZCM0UsIDB4RkI0MCwgMHhGQjQxLFxyXG4gICAgMHhGQjQzLCAweEZCNDQsIDB4RkI0NiwgMHhGQjQ3LCAweEZCNDgsIDB4RkI0OSwgMHhGQjRBLCAweEZCNEIsIDB4RkI0QyxcclxuICAgIDB4RkI0RCwgMHhGQjRFLCAweEZCNEYsIDB4RkI1MCwgMHhGQjUxLCAweEZCNTIsIDB4RkI1MywgMHhGQjU0LCAweEZCNTUsXHJcbiAgICAweEZCNTYsIDB4RkI1NywgMHhGQjU4LCAweEZCNTksIDB4RkI1QSwgMHhGQjVCLCAweEZCNUMsIDB4RkI1RCwgMHhGQjVFLFxyXG4gICAgMHhGQjVGLCAweEZCNjAsIDB4RkI2MSwgMHhGQjYyLCAweEZCNjMsIDB4RkI2NCwgMHhGQjY1LCAweEZCNjYsIDB4RkI2NyxcclxuICAgIDB4RkI2OCwgMHhGQjY5LCAweEZCNkEsIDB4RkI2QiwgMHhGQjZDLCAweEZCNkQsIDB4RkI2RSwgMHhGQjZGLCAweEZCNzAsXHJcbiAgICAweEZCNzEsIDB4RkI3MiwgMHhGQjczLCAweEZCNzQsIDB4RkI3NSwgMHhGQjc2LCAweEZCNzcsIDB4RkI3OCwgMHhGQjc5LFxyXG4gICAgMHhGQjdBLCAweEZCN0IsIDB4RkI3QywgMHhGQjdELCAweEZCN0UsIDB4RkI3RiwgMHhGQjgwLCAweEZCODEsIDB4RkI4MixcclxuICAgIDB4RkI4MywgMHhGQjg0LCAweEZCODUsIDB4RkI4NiwgMHhGQjg3LCAweEZCODgsIDB4RkI4OSwgMHhGQjhBLCAweEZCOEIsXHJcbiAgICAweEZCOEMsIDB4RkI4RCwgMHhGQjhFLCAweEZCOEYsIDB4RkI5MCwgMHhGQjkxLCAweEZCOTIsIDB4RkI5MywgMHhGQjk0LFxyXG4gICAgMHhGQjk1LCAweEZCOTYsIDB4RkI5NywgMHhGQjk4LCAweEZCOTksIDB4RkI5QSwgMHhGQjlCLCAweEZCOUMsIDB4RkI5RCxcclxuICAgIDB4RkI5RSwgMHhGQjlGLCAweEZCQTAsIDB4RkJBMSwgMHhGQkEyLCAweEZCQTMsIDB4RkJBNCwgMHhGQkE1LCAweEZCQTYsXHJcbiAgICAweEZCQTcsIDB4RkJBOCwgMHhGQkE5LCAweEZCQUEsIDB4RkJBQiwgMHhGQkFDLCAweEZCQUQsIDB4RkJBRSwgMHhGQkFGLFxyXG4gICAgMHhGQkIwLCAweEZCQjEsIDB4RkJCMiwgMHhGQkIzLCAweEZCQjQsIDB4RkJCNSwgMHhGQkI2LCAweEZCQjcsIDB4RkJCOCxcclxuICAgIDB4RkJCOSwgMHhGQkJBLCAweEZCQkIsIDB4RkJCQywgMHhGQkJELCAweEZCQkUsIDB4RkJCRiwgMHhGQkMwLCAweEZCQzEsXHJcbiAgICAweEZCRDMsIDB4RkJENCwgMHhGQkQ1LCAweEZCRDYsIDB4RkJENywgMHhGQkQ4LCAweEZCRDksIDB4RkJEQSwgMHhGQkRCLFxyXG4gICAgMHhGQkRDLCAweEZCREQsIDB4RkJERSwgMHhGQkRGLCAweEZCRTAsIDB4RkJFMSwgMHhGQkUyLCAweEZCRTMsIDB4RkJFNCxcclxuICAgIDB4RkJFNSwgMHhGQkU2LCAweEZCRTcsIDB4RkJFOCwgMHhGQkU5LCAweEZCRUEsIDB4RkJFQiwgMHhGQkVDLCAweEZCRUQsXHJcbiAgICAweEZCRUUsIDB4RkJFRiwgMHhGQkYwLCAweEZCRjEsIDB4RkJGMiwgMHhGQkYzLCAweEZCRjQsIDB4RkJGNSwgMHhGQkY2LFxyXG4gICAgMHhGQkY3LCAweEZCRjgsIDB4RkJGOSwgMHhGQkZBLCAweEZCRkIsIDB4RkJGQywgMHhGQkZELCAweEZCRkUsIDB4RkJGRixcclxuICAgIDB4RkMwMCwgMHhGQzAxLCAweEZDMDIsIDB4RkMwMywgMHhGQzA0LCAweEZDMDUsIDB4RkMwNiwgMHhGQzA3LCAweEZDMDgsXHJcbiAgICAweEZDMDksIDB4RkMwQSwgMHhGQzBCLCAweEZDMEMsIDB4RkMwRCwgMHhGQzBFLCAweEZDMEYsIDB4RkMxMCwgMHhGQzExLFxyXG4gICAgMHhGQzEyLCAweEZDMTMsIDB4RkMxNCwgMHhGQzE1LCAweEZDMTYsIDB4RkMxNywgMHhGQzE4LCAweEZDMTksIDB4RkMxQSxcclxuICAgIDB4RkMxQiwgMHhGQzFDLCAweEZDMUQsIDB4RkMxRSwgMHhGQzFGLCAweEZDMjAsIDB4RkMyMSwgMHhGQzIyLCAweEZDMjMsXHJcbiAgICAweEZDMjQsIDB4RkMyNSwgMHhGQzI2LCAweEZDMjcsIDB4RkMyOCwgMHhGQzI5LCAweEZDMkEsIDB4RkMyQiwgMHhGQzJDLFxyXG4gICAgMHhGQzJELCAweEZDMkUsIDB4RkMyRiwgMHhGQzMwLCAweEZDMzEsIDB4RkMzMiwgMHhGQzMzLCAweEZDMzQsIDB4RkMzNSxcclxuICAgIDB4RkMzNiwgMHhGQzM3LCAweEZDMzgsIDB4RkMzOSwgMHhGQzNBLCAweEZDM0IsIDB4RkMzQywgMHhGQzNELCAweEZDM0UsXHJcbiAgICAweEZDM0YsIDB4RkM0MCwgMHhGQzQxLCAweEZDNDIsIDB4RkM0MywgMHhGQzQ0LCAweEZDNDUsIDB4RkM0NiwgMHhGQzQ3LFxyXG4gICAgMHhGQzQ4LCAweEZDNDksIDB4RkM0QSwgMHhGQzRCLCAweEZDNEMsIDB4RkM0RCwgMHhGQzRFLCAweEZDNEYsIDB4RkM1MCxcclxuICAgIDB4RkM1MSwgMHhGQzUyLCAweEZDNTMsIDB4RkM1NCwgMHhGQzU1LCAweEZDNTYsIDB4RkM1NywgMHhGQzU4LCAweEZDNTksXHJcbiAgICAweEZDNUEsIDB4RkM1QiwgMHhGQzVDLCAweEZDNUQsIDB4RkM1RSwgMHhGQzVGLCAweEZDNjAsIDB4RkM2MSwgMHhGQzYyLFxyXG4gICAgMHhGQzYzLCAweEZDNjQsIDB4RkM2NSwgMHhGQzY2LCAweEZDNjcsIDB4RkM2OCwgMHhGQzY5LCAweEZDNkEsIDB4RkM2QixcclxuICAgIDB4RkM2QywgMHhGQzZELCAweEZDNkUsIDB4RkM2RiwgMHhGQzcwLCAweEZDNzEsIDB4RkM3MiwgMHhGQzczLCAweEZDNzQsXHJcbiAgICAweEZDNzUsIDB4RkM3NiwgMHhGQzc3LCAweEZDNzgsIDB4RkM3OSwgMHhGQzdBLCAweEZDN0IsIDB4RkM3QywgMHhGQzdELFxyXG4gICAgMHhGQzdFLCAweEZDN0YsIDB4RkM4MCwgMHhGQzgxLCAweEZDODIsIDB4RkM4MywgMHhGQzg0LCAweEZDODUsIDB4RkM4NixcclxuICAgIDB4RkM4NywgMHhGQzg4LCAweEZDODksIDB4RkM4QSwgMHhGQzhCLCAweEZDOEMsIDB4RkM4RCwgMHhGQzhFLCAweEZDOEYsXHJcbiAgICAweEZDOTAsIDB4RkM5MSwgMHhGQzkyLCAweEZDOTMsIDB4RkM5NCwgMHhGQzk1LCAweEZDOTYsIDB4RkM5NywgMHhGQzk4LFxyXG4gICAgMHhGQzk5LCAweEZDOUEsIDB4RkM5QiwgMHhGQzlDLCAweEZDOUQsIDB4RkM5RSwgMHhGQzlGLCAweEZDQTAsIDB4RkNBMSxcclxuICAgIDB4RkNBMiwgMHhGQ0EzLCAweEZDQTQsIDB4RkNBNSwgMHhGQ0E2LCAweEZDQTcsIDB4RkNBOCwgMHhGQ0E5LCAweEZDQUEsXHJcbiAgICAweEZDQUIsIDB4RkNBQywgMHhGQ0FELCAweEZDQUUsIDB4RkNBRiwgMHhGQ0IwLCAweEZDQjEsIDB4RkNCMiwgMHhGQ0IzLFxyXG4gICAgMHhGQ0I0LCAweEZDQjUsIDB4RkNCNiwgMHhGQ0I3LCAweEZDQjgsIDB4RkNCOSwgMHhGQ0JBLCAweEZDQkIsIDB4RkNCQyxcclxuICAgIDB4RkNCRCwgMHhGQ0JFLCAweEZDQkYsIDB4RkNDMCwgMHhGQ0MxLCAweEZDQzIsIDB4RkNDMywgMHhGQ0M0LCAweEZDQzUsXHJcbiAgICAweEZDQzYsIDB4RkNDNywgMHhGQ0M4LCAweEZDQzksIDB4RkNDQSwgMHhGQ0NCLCAweEZDQ0MsIDB4RkNDRCwgMHhGQ0NFLFxyXG4gICAgMHhGQ0NGLCAweEZDRDAsIDB4RkNEMSwgMHhGQ0QyLCAweEZDRDMsIDB4RkNENCwgMHhGQ0Q1LCAweEZDRDYsIDB4RkNENyxcclxuICAgIDB4RkNEOCwgMHhGQ0Q5LCAweEZDREEsIDB4RkNEQiwgMHhGQ0RDLCAweEZDREQsIDB4RkNERSwgMHhGQ0RGLCAweEZDRTAsXHJcbiAgICAweEZDRTEsIDB4RkNFMiwgMHhGQ0UzLCAweEZDRTQsIDB4RkNFNSwgMHhGQ0U2LCAweEZDRTcsIDB4RkNFOCwgMHhGQ0U5LFxyXG4gICAgMHhGQ0VBLCAweEZDRUIsIDB4RkNFQywgMHhGQ0VELCAweEZDRUUsIDB4RkNFRiwgMHhGQ0YwLCAweEZDRjEsIDB4RkNGMixcclxuICAgIDB4RkNGMywgMHhGQ0Y0LCAweEZDRjUsIDB4RkNGNiwgMHhGQ0Y3LCAweEZDRjgsIDB4RkNGOSwgMHhGQ0ZBLCAweEZDRkIsXHJcbiAgICAweEZDRkMsIDB4RkNGRCwgMHhGQ0ZFLCAweEZDRkYsIDB4RkQwMCwgMHhGRDAxLCAweEZEMDIsIDB4RkQwMywgMHhGRDA0LFxyXG4gICAgMHhGRDA1LCAweEZEMDYsIDB4RkQwNywgMHhGRDA4LCAweEZEMDksIDB4RkQwQSwgMHhGRDBCLCAweEZEMEMsIDB4RkQwRCxcclxuICAgIDB4RkQwRSwgMHhGRDBGLCAweEZEMTAsIDB4RkQxMSwgMHhGRDEyLCAweEZEMTMsIDB4RkQxNCwgMHhGRDE1LCAweEZEMTYsXHJcbiAgICAweEZEMTcsIDB4RkQxOCwgMHhGRDE5LCAweEZEMUEsIDB4RkQxQiwgMHhGRDFDLCAweEZEMUQsIDB4RkQxRSwgMHhGRDFGLFxyXG4gICAgMHhGRDIwLCAweEZEMjEsIDB4RkQyMiwgMHhGRDIzLCAweEZEMjQsIDB4RkQyNSwgMHhGRDI2LCAweEZEMjcsIDB4RkQyOCxcclxuICAgIDB4RkQyOSwgMHhGRDJBLCAweEZEMkIsIDB4RkQyQywgMHhGRDJELCAweEZEMkUsIDB4RkQyRiwgMHhGRDMwLCAweEZEMzEsXHJcbiAgICAweEZEMzIsIDB4RkQzMywgMHhGRDM0LCAweEZEMzUsIDB4RkQzNiwgMHhGRDM3LCAweEZEMzgsIDB4RkQzOSwgMHhGRDNBLFxyXG4gICAgMHhGRDNCLCAweEZEM0MsIDB4RkQzRCwgMHhGRDUwLCAweEZENTEsIDB4RkQ1MiwgMHhGRDUzLCAweEZENTQsIDB4RkQ1NSxcclxuICAgIDB4RkQ1NiwgMHhGRDU3LCAweEZENTgsIDB4RkQ1OSwgMHhGRDVBLCAweEZENUIsIDB4RkQ1QywgMHhGRDVELCAweEZENUUsXHJcbiAgICAweEZENUYsIDB4RkQ2MCwgMHhGRDYxLCAweEZENjIsIDB4RkQ2MywgMHhGRDY0LCAweEZENjUsIDB4RkQ2NiwgMHhGRDY3LFxyXG4gICAgMHhGRDY4LCAweEZENjksIDB4RkQ2QSwgMHhGRDZCLCAweEZENkMsIDB4RkQ2RCwgMHhGRDZFLCAweEZENkYsIDB4RkQ3MCxcclxuICAgIDB4RkQ3MSwgMHhGRDcyLCAweEZENzMsIDB4RkQ3NCwgMHhGRDc1LCAweEZENzYsIDB4RkQ3NywgMHhGRDc4LCAweEZENzksXHJcbiAgICAweEZEN0EsIDB4RkQ3QiwgMHhGRDdDLCAweEZEN0QsIDB4RkQ3RSwgMHhGRDdGLCAweEZEODAsIDB4RkQ4MSwgMHhGRDgyLFxyXG4gICAgMHhGRDgzLCAweEZEODQsIDB4RkQ4NSwgMHhGRDg2LCAweEZEODcsIDB4RkQ4OCwgMHhGRDg5LCAweEZEOEEsIDB4RkQ4QixcclxuICAgIDB4RkQ4QywgMHhGRDhELCAweEZEOEUsIDB4RkQ4RiwgMHhGRDkyLCAweEZEOTMsIDB4RkQ5NCwgMHhGRDk1LCAweEZEOTYsXHJcbiAgICAweEZEOTcsIDB4RkQ5OCwgMHhGRDk5LCAweEZEOUEsIDB4RkQ5QiwgMHhGRDlDLCAweEZEOUQsIDB4RkQ5RSwgMHhGRDlGLFxyXG4gICAgMHhGREEwLCAweEZEQTEsIDB4RkRBMiwgMHhGREEzLCAweEZEQTQsIDB4RkRBNSwgMHhGREE2LCAweEZEQTcsIDB4RkRBOCxcclxuICAgIDB4RkRBOSwgMHhGREFBLCAweEZEQUIsIDB4RkRBQywgMHhGREFELCAweEZEQUUsIDB4RkRBRiwgMHhGREIwLCAweEZEQjEsXHJcbiAgICAweEZEQjIsIDB4RkRCMywgMHhGREI0LCAweEZEQjUsIDB4RkRCNiwgMHhGREI3LCAweEZEQjgsIDB4RkRCOSwgMHhGREJBLFxyXG4gICAgMHhGREJCLCAweEZEQkMsIDB4RkRCRCwgMHhGREJFLCAweEZEQkYsIDB4RkRDMCwgMHhGREMxLCAweEZEQzIsIDB4RkRDMyxcclxuICAgIDB4RkRDNCwgMHhGREM1LCAweEZEQzYsIDB4RkRDNywgMHhGREYwLCAweEZERjEsIDB4RkRGMiwgMHhGREYzLCAweEZERjQsXHJcbiAgICAweEZERjUsIDB4RkRGNiwgMHhGREY3LCAweEZERjgsIDB4RkRGOSwgMHhGREZBLCAweEZERkIsIDB4RkRGQywgMHhGRTcwLFxyXG4gICAgMHhGRTcxLCAweEZFNzIsIDB4RkU3MywgMHhGRTc0LCAweEZFNzYsIDB4RkU3NywgMHhGRTc4LCAweEZFNzksIDB4RkU3QSxcclxuICAgIDB4RkU3QiwgMHhGRTdDLCAweEZFN0QsIDB4RkU3RSwgMHhGRTdGLCAweEZFODAsIDB4RkU4MSwgMHhGRTgyLCAweEZFODMsXHJcbiAgICAweEZFODQsIDB4RkU4NSwgMHhGRTg2LCAweEZFODcsIDB4RkU4OCwgMHhGRTg5LCAweEZFOEEsIDB4RkU4QiwgMHhGRThDLFxyXG4gICAgMHhGRThELCAweEZFOEUsIDB4RkU4RiwgMHhGRTkwLCAweEZFOTEsIDB4RkU5MiwgMHhGRTkzLCAweEZFOTQsIDB4RkU5NSxcclxuICAgIDB4RkU5NiwgMHhGRTk3LCAweEZFOTgsIDB4RkU5OSwgMHhGRTlBLCAweEZFOUIsIDB4RkU5QywgMHhGRTlELCAweEZFOUUsXHJcbiAgICAweEZFOUYsIDB4RkVBMCwgMHhGRUExLCAweEZFQTIsIDB4RkVBMywgMHhGRUE0LCAweEZFQTUsIDB4RkVBNiwgMHhGRUE3LFxyXG4gICAgMHhGRUE4LCAweEZFQTksIDB4RkVBQSwgMHhGRUFCLCAweEZFQUMsIDB4RkVBRCwgMHhGRUFFLCAweEZFQUYsIDB4RkVCMCxcclxuICAgIDB4RkVCMSwgMHhGRUIyLCAweEZFQjMsIDB4RkVCNCwgMHhGRUI1LCAweEZFQjYsIDB4RkVCNywgMHhGRUI4LCAweEZFQjksXHJcbiAgICAweEZFQkEsIDB4RkVCQiwgMHhGRUJDLCAweEZFQkQsIDB4RkVCRSwgMHhGRUJGLCAweEZFQzAsIDB4RkVDMSwgMHhGRUMyLFxyXG4gICAgMHhGRUMzLCAweEZFQzQsIDB4RkVDNSwgMHhGRUM2LCAweEZFQzcsIDB4RkVDOCwgMHhGRUM5LCAweEZFQ0EsIDB4RkVDQixcclxuICAgIDB4RkVDQywgMHhGRUNELCAweEZFQ0UsIDB4RkVDRiwgMHhGRUQwLCAweEZFRDEsIDB4RkVEMiwgMHhGRUQzLCAweEZFRDQsXHJcbiAgICAweEZFRDUsIDB4RkVENiwgMHhGRUQ3LCAweEZFRDgsIDB4RkVEOSwgMHhGRURBLCAweEZFREIsIDB4RkVEQywgMHhGRURELFxyXG4gICAgMHhGRURFLCAweEZFREYsIDB4RkVFMCwgMHhGRUUxLCAweEZFRTIsIDB4RkVFMywgMHhGRUU0LCAweEZFRTUsIDB4RkVFNixcclxuICAgIDB4RkVFNywgMHhGRUU4LCAweEZFRTksIDB4RkVFQSwgMHhGRUVCLCAweEZFRUMsIDB4RkVFRCwgMHhGRUVFLCAweEZFRUYsXHJcbiAgICAweEZFRjAsIDB4RkVGMSwgMHhGRUYyLCAweEZFRjMsIDB4RkVGNCwgMHhGRUY1LCAweEZFRjYsIDB4RkVGNywgMHhGRUY4LFxyXG4gICAgMHhGRUY5LCAweEZFRkEsIDB4RkVGQiwgMHhGRUZDLCAweDEwODAwLCAweDEwODAxLCAweDEwODAyLCAweDEwODAzLFxyXG4gICAgMHgxMDgwNCwgMHgxMDgwNSwgMHgxMDgwOCwgMHgxMDgwQSwgMHgxMDgwQiwgMHgxMDgwQywgMHgxMDgwRCwgMHgxMDgwRSxcclxuICAgIDB4MTA4MEYsIDB4MTA4MTAsIDB4MTA4MTEsIDB4MTA4MTIsIDB4MTA4MTMsIDB4MTA4MTQsIDB4MTA4MTUsIDB4MTA4MTYsXHJcbiAgICAweDEwODE3LCAweDEwODE4LCAweDEwODE5LCAweDEwODFBLCAweDEwODFCLCAweDEwODFDLCAweDEwODFELCAweDEwODFFLFxyXG4gICAgMHgxMDgxRiwgMHgxMDgyMCwgMHgxMDgyMSwgMHgxMDgyMiwgMHgxMDgyMywgMHgxMDgyNCwgMHgxMDgyNSwgMHgxMDgyNixcclxuICAgIDB4MTA4MjcsIDB4MTA4MjgsIDB4MTA4MjksIDB4MTA4MkEsIDB4MTA4MkIsIDB4MTA4MkMsIDB4MTA4MkQsIDB4MTA4MkUsXHJcbiAgICAweDEwODJGLCAweDEwODMwLCAweDEwODMxLCAweDEwODMyLCAweDEwODMzLCAweDEwODM0LCAweDEwODM1LCAweDEwODM3LFxyXG4gICAgMHgxMDgzOCwgMHgxMDgzQywgMHgxMDgzRiwgMHgxMDg0MCwgMHgxMDg0MSwgMHgxMDg0MiwgMHgxMDg0MywgMHgxMDg0NCxcclxuICAgIDB4MTA4NDUsIDB4MTA4NDYsIDB4MTA4NDcsIDB4MTA4NDgsIDB4MTA4NDksIDB4MTA4NEEsIDB4MTA4NEIsIDB4MTA4NEMsXHJcbiAgICAweDEwODRELCAweDEwODRFLCAweDEwODRGLCAweDEwODUwLCAweDEwODUxLCAweDEwODUyLCAweDEwODUzLCAweDEwODU0LFxyXG4gICAgMHgxMDg1NSwgMHgxMDg1NywgMHgxMDg1OCwgMHgxMDg1OSwgMHgxMDg1QSwgMHgxMDg1QiwgMHgxMDg1QywgMHgxMDg1RCxcclxuICAgIDB4MTA4NUUsIDB4MTA4NUYsIDB4MTA5MDAsIDB4MTA5MDEsIDB4MTA5MDIsIDB4MTA5MDMsIDB4MTA5MDQsIDB4MTA5MDUsXHJcbiAgICAweDEwOTA2LCAweDEwOTA3LCAweDEwOTA4LCAweDEwOTA5LCAweDEwOTBBLCAweDEwOTBCLCAweDEwOTBDLCAweDEwOTBELFxyXG4gICAgMHgxMDkwRSwgMHgxMDkwRiwgMHgxMDkxMCwgMHgxMDkxMSwgMHgxMDkxMiwgMHgxMDkxMywgMHgxMDkxNCwgMHgxMDkxNSxcclxuICAgIDB4MTA5MTYsIDB4MTA5MTcsIDB4MTA5MTgsIDB4MTA5MTksIDB4MTA5MUEsIDB4MTA5MUIsIDB4MTA5MjAsIDB4MTA5MjEsXHJcbiAgICAweDEwOTIyLCAweDEwOTIzLCAweDEwOTI0LCAweDEwOTI1LCAweDEwOTI2LCAweDEwOTI3LCAweDEwOTI4LCAweDEwOTI5LFxyXG4gICAgMHgxMDkyQSwgMHgxMDkyQiwgMHgxMDkyQywgMHgxMDkyRCwgMHgxMDkyRSwgMHgxMDkyRiwgMHgxMDkzMCwgMHgxMDkzMSxcclxuICAgIDB4MTA5MzIsIDB4MTA5MzMsIDB4MTA5MzQsIDB4MTA5MzUsIDB4MTA5MzYsIDB4MTA5MzcsIDB4MTA5MzgsIDB4MTA5MzksXHJcbiAgICAweDEwOTNGLCAweDEwOTgwLCAweDEwOTgxLCAweDEwOTgyLCAweDEwOTgzLCAweDEwOTg0LCAweDEwOTg1LCAweDEwOTg2LFxyXG4gICAgMHgxMDk4NywgMHgxMDk4OCwgMHgxMDk4OSwgMHgxMDk4QSwgMHgxMDk4QiwgMHgxMDk4QywgMHgxMDk4RCwgMHgxMDk4RSxcclxuICAgIDB4MTA5OEYsIDB4MTA5OTAsIDB4MTA5OTEsIDB4MTA5OTIsIDB4MTA5OTMsIDB4MTA5OTQsIDB4MTA5OTUsIDB4MTA5OTYsXHJcbiAgICAweDEwOTk3LCAweDEwOTk4LCAweDEwOTk5LCAweDEwOTlBLCAweDEwOTlCLCAweDEwOTlDLCAweDEwOTlELCAweDEwOTlFLFxyXG4gICAgMHgxMDk5RiwgMHgxMDlBMCwgMHgxMDlBMSwgMHgxMDlBMiwgMHgxMDlBMywgMHgxMDlBNCwgMHgxMDlBNSwgMHgxMDlBNixcclxuICAgIDB4MTA5QTcsIDB4MTA5QTgsIDB4MTA5QTksIDB4MTA5QUEsIDB4MTA5QUIsIDB4MTA5QUMsIDB4MTA5QUQsIDB4MTA5QUUsXHJcbiAgICAweDEwOUFGLCAweDEwOUIwLCAweDEwOUIxLCAweDEwOUIyLCAweDEwOUIzLCAweDEwOUI0LCAweDEwOUI1LCAweDEwOUI2LFxyXG4gICAgMHgxMDlCNywgMHgxMDlCRSwgMHgxMDlCRiwgMHgxMEEwMCwgMHgxMEExMCwgMHgxMEExMSwgMHgxMEExMiwgMHgxMEExMyxcclxuICAgIDB4MTBBMTUsIDB4MTBBMTYsIDB4MTBBMTcsIDB4MTBBMTksIDB4MTBBMUEsIDB4MTBBMUIsIDB4MTBBMUMsIDB4MTBBMUQsXHJcbiAgICAweDEwQTFFLCAweDEwQTFGLCAweDEwQTIwLCAweDEwQTIxLCAweDEwQTIyLCAweDEwQTIzLCAweDEwQTI0LCAweDEwQTI1LFxyXG4gICAgMHgxMEEyNiwgMHgxMEEyNywgMHgxMEEyOCwgMHgxMEEyOSwgMHgxMEEyQSwgMHgxMEEyQiwgMHgxMEEyQywgMHgxMEEyRCxcclxuICAgIDB4MTBBMkUsIDB4MTBBMkYsIDB4MTBBMzAsIDB4MTBBMzEsIDB4MTBBMzIsIDB4MTBBMzMsIDB4MTBBNDAsIDB4MTBBNDEsXHJcbiAgICAweDEwQTQyLCAweDEwQTQzLCAweDEwQTQ0LCAweDEwQTQ1LCAweDEwQTQ2LCAweDEwQTQ3LCAweDEwQTUwLCAweDEwQTUxLFxyXG4gICAgMHgxMEE1MiwgMHgxMEE1MywgMHgxMEE1NCwgMHgxMEE1NSwgMHgxMEE1NiwgMHgxMEE1NywgMHgxMEE1OCwgMHgxMEE2MCxcclxuICAgIDB4MTBBNjEsIDB4MTBBNjIsIDB4MTBBNjMsIDB4MTBBNjQsIDB4MTBBNjUsIDB4MTBBNjYsIDB4MTBBNjcsIDB4MTBBNjgsXHJcbiAgICAweDEwQTY5LCAweDEwQTZBLCAweDEwQTZCLCAweDEwQTZDLCAweDEwQTZELCAweDEwQTZFLCAweDEwQTZGLCAweDEwQTcwLFxyXG4gICAgMHgxMEE3MSwgMHgxMEE3MiwgMHgxMEE3MywgMHgxMEE3NCwgMHgxMEE3NSwgMHgxMEE3NiwgMHgxMEE3NywgMHgxMEE3OCxcclxuICAgIDB4MTBBNzksIDB4MTBBN0EsIDB4MTBBN0IsIDB4MTBBN0MsIDB4MTBBN0QsIDB4MTBBN0UsIDB4MTBBN0YsIDB4MTBCMDAsXHJcbiAgICAweDEwQjAxLCAweDEwQjAyLCAweDEwQjAzLCAweDEwQjA0LCAweDEwQjA1LCAweDEwQjA2LCAweDEwQjA3LCAweDEwQjA4LFxyXG4gICAgMHgxMEIwOSwgMHgxMEIwQSwgMHgxMEIwQiwgMHgxMEIwQywgMHgxMEIwRCwgMHgxMEIwRSwgMHgxMEIwRiwgMHgxMEIxMCxcclxuICAgIDB4MTBCMTEsIDB4MTBCMTIsIDB4MTBCMTMsIDB4MTBCMTQsIDB4MTBCMTUsIDB4MTBCMTYsIDB4MTBCMTcsIDB4MTBCMTgsXHJcbiAgICAweDEwQjE5LCAweDEwQjFBLCAweDEwQjFCLCAweDEwQjFDLCAweDEwQjFELCAweDEwQjFFLCAweDEwQjFGLCAweDEwQjIwLFxyXG4gICAgMHgxMEIyMSwgMHgxMEIyMiwgMHgxMEIyMywgMHgxMEIyNCwgMHgxMEIyNSwgMHgxMEIyNiwgMHgxMEIyNywgMHgxMEIyOCxcclxuICAgIDB4MTBCMjksIDB4MTBCMkEsIDB4MTBCMkIsIDB4MTBCMkMsIDB4MTBCMkQsIDB4MTBCMkUsIDB4MTBCMkYsIDB4MTBCMzAsXHJcbiAgICAweDEwQjMxLCAweDEwQjMyLCAweDEwQjMzLCAweDEwQjM0LCAweDEwQjM1LCAweDEwQjQwLCAweDEwQjQxLCAweDEwQjQyLFxyXG4gICAgMHgxMEI0MywgMHgxMEI0NCwgMHgxMEI0NSwgMHgxMEI0NiwgMHgxMEI0NywgMHgxMEI0OCwgMHgxMEI0OSwgMHgxMEI0QSxcclxuICAgIDB4MTBCNEIsIDB4MTBCNEMsIDB4MTBCNEQsIDB4MTBCNEUsIDB4MTBCNEYsIDB4MTBCNTAsIDB4MTBCNTEsIDB4MTBCNTIsXHJcbiAgICAweDEwQjUzLCAweDEwQjU0LCAweDEwQjU1LCAweDEwQjU4LCAweDEwQjU5LCAweDEwQjVBLCAweDEwQjVCLCAweDEwQjVDLFxyXG4gICAgMHgxMEI1RCwgMHgxMEI1RSwgMHgxMEI1RiwgMHgxMEI2MCwgMHgxMEI2MSwgMHgxMEI2MiwgMHgxMEI2MywgMHgxMEI2NCxcclxuICAgIDB4MTBCNjUsIDB4MTBCNjYsIDB4MTBCNjcsIDB4MTBCNjgsIDB4MTBCNjksIDB4MTBCNkEsIDB4MTBCNkIsIDB4MTBCNkMsXHJcbiAgICAweDEwQjZELCAweDEwQjZFLCAweDEwQjZGLCAweDEwQjcwLCAweDEwQjcxLCAweDEwQjcyLCAweDEwQjc4LCAweDEwQjc5LFxyXG4gICAgMHgxMEI3QSwgMHgxMEI3QiwgMHgxMEI3QywgMHgxMEI3RCwgMHgxMEI3RSwgMHgxMEI3RiwgMHgxMEMwMCwgMHgxMEMwMSxcclxuICAgIDB4MTBDMDIsIDB4MTBDMDMsIDB4MTBDMDQsIDB4MTBDMDUsIDB4MTBDMDYsIDB4MTBDMDcsIDB4MTBDMDgsIDB4MTBDMDksXHJcbiAgICAweDEwQzBBLCAweDEwQzBCLCAweDEwQzBDLCAweDEwQzBELCAweDEwQzBFLCAweDEwQzBGLCAweDEwQzEwLCAweDEwQzExLFxyXG4gICAgMHgxMEMxMiwgMHgxMEMxMywgMHgxMEMxNCwgMHgxMEMxNSwgMHgxMEMxNiwgMHgxMEMxNywgMHgxMEMxOCwgMHgxMEMxOSxcclxuICAgIDB4MTBDMUEsIDB4MTBDMUIsIDB4MTBDMUMsIDB4MTBDMUQsIDB4MTBDMUUsIDB4MTBDMUYsIDB4MTBDMjAsIDB4MTBDMjEsXHJcbiAgICAweDEwQzIyLCAweDEwQzIzLCAweDEwQzI0LCAweDEwQzI1LCAweDEwQzI2LCAweDEwQzI3LCAweDEwQzI4LCAweDEwQzI5LFxyXG4gICAgMHgxMEMyQSwgMHgxMEMyQiwgMHgxMEMyQywgMHgxMEMyRCwgMHgxMEMyRSwgMHgxMEMyRiwgMHgxMEMzMCwgMHgxMEMzMSxcclxuICAgIDB4MTBDMzIsIDB4MTBDMzMsIDB4MTBDMzQsIDB4MTBDMzUsIDB4MTBDMzYsIDB4MTBDMzcsIDB4MTBDMzgsIDB4MTBDMzksXHJcbiAgICAweDEwQzNBLCAweDEwQzNCLCAweDEwQzNDLCAweDEwQzNELCAweDEwQzNFLCAweDEwQzNGLCAweDEwQzQwLCAweDEwQzQxLFxyXG4gICAgMHgxMEM0MiwgMHgxMEM0MywgMHgxMEM0NCwgMHgxMEM0NSwgMHgxMEM0NiwgMHgxMEM0NywgMHgxMEM0OCwgMHgxRUUwMCxcclxuICAgIDB4MUVFMDEsIDB4MUVFMDIsIDB4MUVFMDMsIDB4MUVFMDUsIDB4MUVFMDYsIDB4MUVFMDcsIDB4MUVFMDgsIDB4MUVFMDksXHJcbiAgICAweDFFRTBBLCAweDFFRTBCLCAweDFFRTBDLCAweDFFRTBELCAweDFFRTBFLCAweDFFRTBGLCAweDFFRTEwLCAweDFFRTExLFxyXG4gICAgMHgxRUUxMiwgMHgxRUUxMywgMHgxRUUxNCwgMHgxRUUxNSwgMHgxRUUxNiwgMHgxRUUxNywgMHgxRUUxOCwgMHgxRUUxOSxcclxuICAgIDB4MUVFMUEsIDB4MUVFMUIsIDB4MUVFMUMsIDB4MUVFMUQsIDB4MUVFMUUsIDB4MUVFMUYsIDB4MUVFMjEsIDB4MUVFMjIsXHJcbiAgICAweDFFRTI0LCAweDFFRTI3LCAweDFFRTI5LCAweDFFRTJBLCAweDFFRTJCLCAweDFFRTJDLCAweDFFRTJELCAweDFFRTJFLFxyXG4gICAgMHgxRUUyRiwgMHgxRUUzMCwgMHgxRUUzMSwgMHgxRUUzMiwgMHgxRUUzNCwgMHgxRUUzNSwgMHgxRUUzNiwgMHgxRUUzNyxcclxuICAgIDB4MUVFMzksIDB4MUVFM0IsIDB4MUVFNDIsIDB4MUVFNDcsIDB4MUVFNDksIDB4MUVFNEIsIDB4MUVFNEQsIDB4MUVFNEUsXHJcbiAgICAweDFFRTRGLCAweDFFRTUxLCAweDFFRTUyLCAweDFFRTU0LCAweDFFRTU3LCAweDFFRTU5LCAweDFFRTVCLCAweDFFRTVELFxyXG4gICAgMHgxRUU1RiwgMHgxRUU2MSwgMHgxRUU2MiwgMHgxRUU2NCwgMHgxRUU2NywgMHgxRUU2OCwgMHgxRUU2OSwgMHgxRUU2QSxcclxuICAgIDB4MUVFNkMsIDB4MUVFNkQsIDB4MUVFNkUsIDB4MUVFNkYsIDB4MUVFNzAsIDB4MUVFNzEsIDB4MUVFNzIsIDB4MUVFNzQsXHJcbiAgICAweDFFRTc1LCAweDFFRTc2LCAweDFFRTc3LCAweDFFRTc5LCAweDFFRTdBLCAweDFFRTdCLCAweDFFRTdDLCAweDFFRTdFLFxyXG4gICAgMHgxRUU4MCwgMHgxRUU4MSwgMHgxRUU4MiwgMHgxRUU4MywgMHgxRUU4NCwgMHgxRUU4NSwgMHgxRUU4NiwgMHgxRUU4NyxcclxuICAgIDB4MUVFODgsIDB4MUVFODksIDB4MUVFOEIsIDB4MUVFOEMsIDB4MUVFOEQsIDB4MUVFOEUsIDB4MUVFOEYsIDB4MUVFOTAsXHJcbiAgICAweDFFRTkxLCAweDFFRTkyLCAweDFFRTkzLCAweDFFRTk0LCAweDFFRTk1LCAweDFFRTk2LCAweDFFRTk3LCAweDFFRTk4LFxyXG4gICAgMHgxRUU5OSwgMHgxRUU5QSwgMHgxRUU5QiwgMHgxRUVBMSwgMHgxRUVBMiwgMHgxRUVBMywgMHgxRUVBNSwgMHgxRUVBNixcclxuICAgIDB4MUVFQTcsIDB4MUVFQTgsIDB4MUVFQTksIDB4MUVFQUIsIDB4MUVFQUMsIDB4MUVFQUQsIDB4MUVFQUUsIDB4MUVFQUYsXHJcbiAgICAweDFFRUIwLCAweDFFRUIxLCAweDFFRUIyLCAweDFFRUIzLCAweDFFRUI0LCAweDFFRUI1LCAweDFFRUI2LCAweDFFRUI3LFxyXG4gICAgMHgxRUVCOCwgMHgxRUVCOSwgMHgxRUVCQSwgMHgxRUVCQiwgMHgxMEZGRkRdO1xyXG5cclxuZnVuY3Rpb24gZGV0ZXJtaW5lQmlkaShjdWVEaXYpIHtcclxuICAgIHZhciBub2RlU3RhY2sgPSBbXSxcclxuICAgICAgICB0ZXh0ID0gXCJcIixcclxuICAgICAgICBjaGFyQ29kZTtcclxuXHJcbiAgICBpZiAoIWN1ZURpdiB8fCAhY3VlRGl2LmNoaWxkTm9kZXMpIHtcclxuICAgICAgICByZXR1cm4gXCJsdHJcIjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwdXNoTm9kZXMobm9kZVN0YWNrLCBub2RlKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IG5vZGUuY2hpbGROb2Rlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBub2RlU3RhY2sucHVzaChub2RlLmNoaWxkTm9kZXNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBuZXh0VGV4dE5vZGUobm9kZVN0YWNrKSB7XHJcbiAgICAgICAgaWYgKCFub2RlU3RhY2sgfHwgIW5vZGVTdGFjay5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgbm9kZSA9IG5vZGVTdGFjay5wb3AoKSxcclxuICAgICAgICAgICAgdGV4dCA9IG5vZGUudGV4dENvbnRlbnQgfHwgbm9kZS5pbm5lclRleHQ7XHJcbiAgICAgICAgaWYgKHRleHQpIHtcclxuICAgICAgICAgICAgLy8gVE9ETzogVGhpcyBzaG91bGQgbWF0Y2ggYWxsIHVuaWNvZGUgdHlwZSBCIGNoYXJhY3RlcnMgKHBhcmFncmFwaFxyXG4gICAgICAgICAgICAvLyBzZXBhcmF0b3IgY2hhcmFjdGVycykuIFNlZSBpc3N1ZSAjMTE1LlxyXG4gICAgICAgICAgICB2YXIgbSA9IHRleHQubWF0Y2goL14uKihcXG58XFxyKS8pO1xyXG4gICAgICAgICAgICBpZiAobSkge1xyXG4gICAgICAgICAgICAgICAgbm9kZVN0YWNrLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbVswXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5vZGUudGFnTmFtZSA9PT0gXCJydWJ5XCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5leHRUZXh0Tm9kZShub2RlU3RhY2spO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobm9kZS5jaGlsZE5vZGVzKSB7XHJcbiAgICAgICAgICAgIHB1c2hOb2Rlcyhub2RlU3RhY2ssIG5vZGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV4dFRleHROb2RlKG5vZGVTdGFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1c2hOb2Rlcyhub2RlU3RhY2ssIGN1ZURpdik7XHJcbiAgICB3aGlsZSAoKHRleHQgPSBuZXh0VGV4dE5vZGUobm9kZVN0YWNrKSkpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRleHQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY2hhckNvZGUgPSB0ZXh0LmNoYXJDb2RlQXQoaSk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc3Ryb25nUlRMQ2hhcnMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdHJvbmdSVExDaGFyc1tqXSA9PT0gY2hhckNvZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJydGxcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBcImx0clwiO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjb21wdXRlTGluZVBvcyhjdWUpIHtcclxuICAgIGlmICh0eXBlb2YgY3VlLmxpbmUgPT09IFwibnVtYmVyXCIgJiZcclxuICAgICAgICAoY3VlLnNuYXBUb0xpbmVzIHx8IChjdWUubGluZSA+PSAwICYmIGN1ZS5saW5lIDw9IDEwMCkpKSB7XHJcbiAgICAgICAgcmV0dXJuIGN1ZS5saW5lO1xyXG4gICAgfVxyXG4gICAgaWYgKCFjdWUudHJhY2sgfHwgIWN1ZS50cmFjay50ZXh0VHJhY2tMaXN0IHx8XHJcbiAgICAgICAgIWN1ZS50cmFjay50ZXh0VHJhY2tMaXN0Lm1lZGlhRWxlbWVudCkge1xyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuICAgIHZhciB0cmFjayA9IGN1ZS50cmFjayxcclxuICAgICAgICB0cmFja0xpc3QgPSB0cmFjay50ZXh0VHJhY2tMaXN0LFxyXG4gICAgICAgIGNvdW50ID0gMDtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHJhY2tMaXN0Lmxlbmd0aCAmJiB0cmFja0xpc3RbaV0gIT09IHRyYWNrOyBpKyspIHtcclxuICAgICAgICBpZiAodHJhY2tMaXN0W2ldLm1vZGUgPT09IFwic2hvd2luZ1wiKSB7XHJcbiAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuICsrY291bnQgKiAtMTtcclxufVxyXG5cclxuZnVuY3Rpb24gU3R5bGVCb3goKSB7XHJcbn1cclxuXHJcbi8vIEFwcGx5IHN0eWxlcyB0byBhIGRpdi4gSWYgdGhlcmUgaXMgbm8gZGl2IHBhc3NlZCB0aGVuIGl0IGRlZmF1bHRzIHRvIHRoZVxyXG4vLyBkaXYgb24gJ3RoaXMnLlxyXG5TdHlsZUJveC5wcm90b3R5cGUuYXBwbHlTdHlsZXMgPSBmdW5jdGlvbihzdHlsZXMsIGRpdikge1xyXG4gICAgZGl2ID0gZGl2IHx8IHRoaXMuZGl2O1xyXG4gICAgZm9yICh2YXIgcHJvcCBpbiBzdHlsZXMpIHtcclxuICAgICAgICBpZiAoc3R5bGVzLmhhc093blByb3BlcnR5KHByb3ApKSB7XHJcbiAgICAgICAgICAgIGRpdi5zdHlsZVtwcm9wXSA9IHN0eWxlc1twcm9wXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5TdHlsZUJveC5wcm90b3R5cGUuZm9ybWF0U3R5bGUgPSBmdW5jdGlvbih2YWwsIHVuaXQpIHtcclxuICAgIHJldHVybiB2YWwgPT09IDAgPyAwIDogdmFsICsgdW5pdDtcclxufTtcclxuXHJcbi8vIENvbnN0cnVjdHMgdGhlIGNvbXB1dGVkIGRpc3BsYXkgc3RhdGUgb2YgdGhlIGN1ZSAoYSBkaXYpLiBQbGFjZXMgdGhlIGRpdlxyXG4vLyBpbnRvIHRoZSBvdmVybGF5IHdoaWNoIHNob3VsZCBiZSBhIGJsb2NrIGxldmVsIGVsZW1lbnQgKHVzdWFsbHkgYSBkaXYpLlxyXG5mdW5jdGlvbiBDdWVTdHlsZUJveCh3aW5kb3csIGN1ZSwgc3R5bGVPcHRpb25zKSB7XHJcbiAgICB2YXIgaXNJRTggPSAodHlwZW9mIG5hdmlnYXRvciAhPT0gXCJ1bmRlZmluZWRcIikgJiZcclxuICAgICAgICAoL01TSUVcXHM4XFwuMC8pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XHJcbiAgICB2YXIgY29sb3IgPSBcInJnYmEoMjU1LCAyNTUsIDI1NSwgMSlcIjtcclxuICAgIHZhciBiYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwgMCwgMCwgMC44KVwiO1xyXG4gICAgdmFyIHRleHRTaGFkb3cgPSBcIlwiO1xyXG5cclxuICAgIGlmKHR5cGVvZiBXZWJWVFRTZXQgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICBjb2xvciA9IFdlYlZUVFNldC5mb250U2V0O1xyXG4gICAgICAgIGJhY2tncm91bmRDb2xvciA9IFdlYlZUVFNldC5iYWNrZ3JvdW5kU2V0O1xyXG4gICAgICAgIHRleHRTaGFkb3cgPSBXZWJWVFRTZXQuZWRnZVNldDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXNJRTgpIHtcclxuICAgICAgICBjb2xvciA9IFwicmdiKDI1NSwgMjU1LCAyNTUpXCI7XHJcbiAgICAgICAgYmFja2dyb3VuZENvbG9yID0gXCJyZ2IoMCwgMCwgMClcIjtcclxuICAgIH1cclxuXHJcbiAgICBTdHlsZUJveC5jYWxsKHRoaXMpO1xyXG4gICAgdGhpcy5jdWUgPSBjdWU7XHJcblxyXG4gICAgLy8gUGFyc2Ugb3VyIGN1ZSdzIHRleHQgaW50byBhIERPTSB0cmVlIHJvb3RlZCBhdCAnY3VlRGl2Jy4gVGhpcyBkaXYgd2lsbFxyXG4gICAgLy8gaGF2ZSBpbmxpbmUgcG9zaXRpb25pbmcgYW5kIHdpbGwgZnVuY3Rpb24gYXMgdGhlIGN1ZSBiYWNrZ3JvdW5kIGJveC5cclxuICAgIHRoaXMuY3VlRGl2ID0gcGFyc2VDb250ZW50KHdpbmRvdywgY3VlLnRleHQpO1xyXG4gICAgdmFyIHN0eWxlcyA9IHtcclxuICAgICAgICBjb2xvcjogY29sb3IsXHJcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBiYWNrZ3JvdW5kQ29sb3IsXHJcbiAgICAgICAgdGV4dFNoYWRvdzogdGV4dFNoYWRvdyxcclxuICAgICAgICBwb3NpdGlvbjogXCJyZWxhdGl2ZVwiLFxyXG4gICAgICAgIGxlZnQ6IDAsXHJcbiAgICAgICAgcmlnaHQ6IDAsXHJcbiAgICAgICAgdG9wOiAwLFxyXG4gICAgICAgIGJvdHRvbTogMCxcclxuICAgICAgICBkaXNwbGF5OiBcImlubGluZVwiXHJcbiAgICB9O1xyXG5cclxuICAgIGlmICghaXNJRTgpIHtcclxuICAgICAgICBzdHlsZXMud3JpdGluZ01vZGUgPSBjdWUudmVydGljYWwgPT09IFwiXCIgPyBcImhvcml6b250YWwtdGJcIlxyXG4gICAgICAgICAgICA6IGN1ZS52ZXJ0aWNhbCA9PT0gXCJsclwiID8gXCJ2ZXJ0aWNhbC1sclwiXHJcbiAgICAgICAgICAgIDogXCJ2ZXJ0aWNhbC1ybFwiO1xyXG4gICAgICAgIHN0eWxlcy51bmljb2RlQmlkaSA9IFwicGxhaW50ZXh0XCI7XHJcbiAgICB9XHJcbiAgICB0aGlzLmFwcGx5U3R5bGVzKHN0eWxlcywgdGhpcy5jdWVEaXYpO1xyXG5cclxuICAgIC8vIENyZWF0ZSBhbiBhYnNvbHV0ZWx5IHBvc2l0aW9uZWQgZGl2IHRoYXQgd2lsbCBiZSB1c2VkIHRvIHBvc2l0aW9uIHRoZSBjdWVcclxuICAgIC8vIGRpdi4gTm90ZSwgYWxsIFdlYlZUVCBjdWUtc2V0dGluZyBhbGlnbm1lbnRzIGFyZSBlcXVpdmFsZW50IHRvIHRoZSBDU1NcclxuICAgIC8vIG1pcnJvcnMgb2YgdGhlbSBleGNlcHQgXCJtaWRkbGVcIiB3aGljaCBpcyBcImNlbnRlclwiIGluIENTUy5cclxuICAgIHRoaXMuZGl2ID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBzdHlsZXMgPSB7XHJcbiAgICAgICAgdGV4dEFsaWduOiBjdWUuYWxpZ24gPT09IFwibWlkZGxlXCIgPyBcImNlbnRlclwiIDogY3VlLmFsaWduLFxyXG4gICAgICAgIGZvbnQ6IHN0eWxlT3B0aW9ucy5mb250LFxyXG4gICAgICAgIHdoaXRlU3BhY2U6IFwicHJlLWxpbmVcIixcclxuICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiXHJcbiAgICB9O1xyXG5cclxuICAgIGlmICghaXNJRTgpIHtcclxuICAgICAgICBzdHlsZXMuZGlyZWN0aW9uID0gZGV0ZXJtaW5lQmlkaSh0aGlzLmN1ZURpdik7XHJcbiAgICAgICAgc3R5bGVzLndyaXRpbmdNb2RlID0gY3VlLnZlcnRpY2FsID09PSBcIlwiID8gXCJob3Jpem9udGFsLXRiXCJcclxuICAgICAgICAgICAgOiBjdWUudmVydGljYWwgPT09IFwibHJcIiA/IFwidmVydGljYWwtbHJcIlxyXG4gICAgICAgICAgICA6IFwidmVydGljYWwtcmxcIi5cclxuICAgICAgICAgICAgc3R5bGVzdW5pY29kZUJpZGkgPSAgXCJwbGFpbnRleHRcIjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmFwcGx5U3R5bGVzKHN0eWxlcyk7XHJcblxyXG4gICAgdGhpcy5kaXYuYXBwZW5kQ2hpbGQodGhpcy5jdWVEaXYpO1xyXG5cclxuICAgIC8vIENhbGN1bGF0ZSB0aGUgZGlzdGFuY2UgZnJvbSB0aGUgcmVmZXJlbmNlIGVkZ2Ugb2YgdGhlIHZpZXdwb3J0IHRvIHRoZSB0ZXh0XHJcbiAgICAvLyBwb3NpdGlvbiBvZiB0aGUgY3VlIGJveC4gVGhlIHJlZmVyZW5jZSBlZGdlIHdpbGwgYmUgcmVzb2x2ZWQgbGF0ZXIgd2hlblxyXG4gICAgLy8gdGhlIGJveCBvcmllbnRhdGlvbiBzdHlsZXMgYXJlIGFwcGxpZWQuXHJcbiAgICB2YXIgdGV4dFBvcyA9IDA7XHJcbiAgICBzd2l0Y2ggKGN1ZS5wb3NpdGlvbkFsaWduKSB7XHJcbiAgICAgICAgY2FzZSBcInN0YXJ0XCI6XHJcbiAgICAgICAgICAgIHRleHRQb3MgPSBjdWUucG9zaXRpb247XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJtaWRkbGVcIjpcclxuICAgICAgICAgICAgdGV4dFBvcyA9IGN1ZS5wb3NpdGlvbiAtIChjdWUuc2l6ZSAvIDIpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiZW5kXCI6XHJcbiAgICAgICAgICAgIHRleHRQb3MgPSBjdWUucG9zaXRpb24gLSBjdWUuc2l6ZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSG9yaXpvbnRhbCBib3ggb3JpZW50YXRpb247IHRleHRQb3MgaXMgdGhlIGRpc3RhbmNlIGZyb20gdGhlIGxlZnQgZWRnZSBvZiB0aGVcclxuICAgIC8vIGFyZWEgdG8gdGhlIGxlZnQgZWRnZSBvZiB0aGUgYm94IGFuZCBjdWUuc2l6ZSBpcyB0aGUgZGlzdGFuY2UgZXh0ZW5kaW5nIHRvXHJcbiAgICAvLyB0aGUgcmlnaHQgZnJvbSB0aGVyZS5cclxuICAgIGlmIChjdWUudmVydGljYWwgPT09IFwiXCIpIHtcclxuICAgICAgICB0aGlzLmFwcGx5U3R5bGVzKHtcclxuICAgICAgICAgICAgbGVmdDogIHRoaXMuZm9ybWF0U3R5bGUodGV4dFBvcywgXCIlXCIpLFxyXG4gICAgICAgICAgICB3aWR0aDogdGhpcy5mb3JtYXRTdHlsZShjdWUuc2l6ZSwgXCIlXCIpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gVmVydGljYWwgYm94IG9yaWVudGF0aW9uOyB0ZXh0UG9zIGlzIHRoZSBkaXN0YW5jZSBmcm9tIHRoZSB0b3AgZWRnZSBvZiB0aGVcclxuICAgICAgICAvLyBhcmVhIHRvIHRoZSB0b3AgZWRnZSBvZiB0aGUgYm94IGFuZCBjdWUuc2l6ZSBpcyB0aGUgaGVpZ2h0IGV4dGVuZGluZ1xyXG4gICAgICAgIC8vIGRvd253YXJkcyBmcm9tIHRoZXJlLlxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmFwcGx5U3R5bGVzKHtcclxuICAgICAgICAgICAgdG9wOiB0aGlzLmZvcm1hdFN0eWxlKHRleHRQb3MsIFwiJVwiKSxcclxuICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLmZvcm1hdFN0eWxlKGN1ZS5zaXplLCBcIiVcIilcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm1vdmUgPSBmdW5jdGlvbihib3gpIHtcclxuICAgICAgICB0aGlzLmFwcGx5U3R5bGVzKHtcclxuICAgICAgICAgICAgdG9wOiB0aGlzLmZvcm1hdFN0eWxlKGJveC50b3AsIFwicHhcIiksXHJcbiAgICAgICAgICAgIGJvdHRvbTogdGhpcy5mb3JtYXRTdHlsZShib3guYm90dG9tLCBcInB4XCIpLFxyXG4gICAgICAgICAgICBsZWZ0OiB0aGlzLmZvcm1hdFN0eWxlKGJveC5sZWZ0LCBcInB4XCIpLFxyXG4gICAgICAgICAgICByaWdodDogdGhpcy5mb3JtYXRTdHlsZShib3gucmlnaHQsIFwicHhcIiksXHJcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5mb3JtYXRTdHlsZShib3guaGVpZ2h0LCBcInB4XCIpLFxyXG4gICAgICAgICAgICB3aWR0aDogdGhpcy5mb3JtYXRTdHlsZShib3gud2lkdGgsIFwicHhcIilcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbn1cclxuQ3VlU3R5bGVCb3gucHJvdG90eXBlID0gX29iakNyZWF0ZShTdHlsZUJveC5wcm90b3R5cGUpO1xyXG5DdWVTdHlsZUJveC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDdWVTdHlsZUJveDtcclxuXHJcbi8vIFJlcHJlc2VudHMgdGhlIGNvLW9yZGluYXRlcyBvZiBhbiBFbGVtZW50IGluIGEgd2F5IHRoYXQgd2UgY2FuIGVhc2lseVxyXG4vLyBjb21wdXRlIHRoaW5ncyB3aXRoIHN1Y2ggYXMgaWYgaXQgb3ZlcmxhcHMgb3IgaW50ZXJzZWN0cyB3aXRoIGFub3RoZXIgRWxlbWVudC5cclxuLy8gQ2FuIGluaXRpYWxpemUgaXQgd2l0aCBlaXRoZXIgYSBTdHlsZUJveCBvciBhbm90aGVyIEJveFBvc2l0aW9uLlxyXG5mdW5jdGlvbiBCb3hQb3NpdGlvbihvYmopIHtcclxuICAgIHZhciBpc0lFOCA9ICh0eXBlb2YgbmF2aWdhdG9yICE9PSBcInVuZGVmaW5lZFwiKSAmJlxyXG4gICAgICAgICgvTVNJRVxcczhcXC4wLykudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcclxuXHJcbiAgICAvLyBFaXRoZXIgYSBCb3hQb3NpdGlvbiB3YXMgcGFzc2VkIGluIGFuZCB3ZSBuZWVkIHRvIGNvcHkgaXQsIG9yIGEgU3R5bGVCb3hcclxuICAgIC8vIHdhcyBwYXNzZWQgaW4gYW5kIHdlIG5lZWQgdG8gY29weSB0aGUgcmVzdWx0cyBvZiAnZ2V0Qm91bmRpbmdDbGllbnRSZWN0J1xyXG4gICAgLy8gYXMgdGhlIG9iamVjdCByZXR1cm5lZCBpcyByZWFkb25seS4gQWxsIGNvLW9yZGluYXRlIHZhbHVlcyBhcmUgaW4gcmVmZXJlbmNlXHJcbiAgICAvLyB0byB0aGUgdmlld3BvcnQgb3JpZ2luICh0b3AgbGVmdCkuXHJcbiAgICB2YXIgbGgsIGhlaWdodCwgd2lkdGgsIHRvcDtcclxuICAgIGlmIChvYmouZGl2KSB7XHJcbiAgICAgICAgaGVpZ2h0ID0gb2JqLmRpdi5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgd2lkdGggPSBvYmouZGl2Lm9mZnNldFdpZHRoO1xyXG4gICAgICAgIHRvcCA9IG9iai5kaXYub2Zmc2V0VG9wO1xyXG5cclxuICAgICAgICB2YXIgcmVjdHMgPSAocmVjdHMgPSBvYmouZGl2LmNoaWxkTm9kZXMpICYmIChyZWN0cyA9IHJlY3RzWzBdKSAmJlxyXG4gICAgICAgICAgICByZWN0cy5nZXRDbGllbnRSZWN0cyAmJiByZWN0cy5nZXRDbGllbnRSZWN0cygpO1xyXG4gICAgICAgIG9iaiA9IG9iai5kaXYuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgLy8gSW4gY2VydGFpbiBjYXNlcyB0aGUgb3V0dGVyIGRpdiB3aWxsIGJlIHNsaWdodGx5IGxhcmdlciB0aGVuIHRoZSBzdW0gb2ZcclxuICAgICAgICAvLyB0aGUgaW5uZXIgZGl2J3MgbGluZXMuIFRoaXMgY291bGQgYmUgZHVlIHRvIGJvbGQgdGV4dCwgZXRjLCBvbiBzb21lIHBsYXRmb3Jtcy5cclxuICAgICAgICAvLyBJbiB0aGlzIGNhc2Ugd2Ugc2hvdWxkIGdldCB0aGUgYXZlcmFnZSBsaW5lIGhlaWdodCBhbmQgdXNlIHRoYXQuIFRoaXMgd2lsbFxyXG4gICAgICAgIC8vIHJlc3VsdCBpbiB0aGUgZGVzaXJlZCBiZWhhdmlvdXIuXHJcbiAgICAgICAgbGggPSByZWN0cyA/IE1hdGgubWF4KChyZWN0c1swXSAmJiByZWN0c1swXS5oZWlnaHQpIHx8IDAsIG9iai5oZWlnaHQgLyByZWN0cy5sZW5ndGgpXHJcbiAgICAgICAgICAgIDogMDtcclxuXHJcbiAgICB9XHJcbiAgICB0aGlzLmxlZnQgPSBvYmoubGVmdDtcclxuICAgIHRoaXMucmlnaHQgPSBvYmoucmlnaHQ7XHJcbiAgICB0aGlzLnRvcCA9IG9iai50b3AgfHwgdG9wO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBvYmouaGVpZ2h0IHx8IGhlaWdodDtcclxuICAgIHRoaXMuYm90dG9tID0gb2JqLmJvdHRvbSB8fCAodG9wICsgKG9iai5oZWlnaHQgfHwgaGVpZ2h0KSk7XHJcbiAgICB0aGlzLndpZHRoID0gb2JqLndpZHRoIHx8IHdpZHRoO1xyXG4gICAgdGhpcy5saW5lSGVpZ2h0ID0gbGggIT09IHVuZGVmaW5lZCA/IGxoIDogb2JqLmxpbmVIZWlnaHQ7XHJcblxyXG4gICAgaWYgKGlzSUU4ICYmICF0aGlzLmxpbmVIZWlnaHQpIHtcclxuICAgICAgICB0aGlzLmxpbmVIZWlnaHQgPSAxMztcclxuICAgIH1cclxufVxyXG5cclxuLy8gTW92ZSB0aGUgYm94IGFsb25nIGEgcGFydGljdWxhciBheGlzLiBPcHRpb25hbGx5IHBhc3MgaW4gYW4gYW1vdW50IHRvIG1vdmVcclxuLy8gdGhlIGJveC4gSWYgbm8gYW1vdW50IGlzIHBhc3NlZCB0aGVuIHRoZSBkZWZhdWx0IGlzIHRoZSBsaW5lIGhlaWdodCBvZiB0aGVcclxuLy8gYm94LlxyXG5Cb3hQb3NpdGlvbi5wcm90b3R5cGUubW92ZSA9IGZ1bmN0aW9uKGF4aXMsIHRvTW92ZSkge1xyXG4gICAgdG9Nb3ZlID0gdG9Nb3ZlICE9PSB1bmRlZmluZWQgPyB0b01vdmUgOiB0aGlzLmxpbmVIZWlnaHQ7XHJcbiAgICBzd2l0Y2ggKGF4aXMpIHtcclxuICAgICAgICBjYXNlIFwiK3hcIjpcclxuICAgICAgICAgICAgdGhpcy5sZWZ0ICs9IHRvTW92ZTtcclxuICAgICAgICAgICAgdGhpcy5yaWdodCArPSB0b01vdmU7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCIteFwiOlxyXG4gICAgICAgICAgICB0aGlzLmxlZnQgLT0gdG9Nb3ZlO1xyXG4gICAgICAgICAgICB0aGlzLnJpZ2h0IC09IHRvTW92ZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcIit5XCI6XHJcbiAgICAgICAgICAgIHRoaXMudG9wICs9IHRvTW92ZTtcclxuICAgICAgICAgICAgdGhpcy5ib3R0b20gKz0gdG9Nb3ZlO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiLXlcIjpcclxuICAgICAgICAgICAgdGhpcy50b3AgLT0gdG9Nb3ZlO1xyXG4gICAgICAgICAgICB0aGlzLmJvdHRvbSAtPSB0b01vdmU7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLy8gQ2hlY2sgaWYgdGhpcyBib3ggb3ZlcmxhcHMgYW5vdGhlciBib3gsIGIyLlxyXG5Cb3hQb3NpdGlvbi5wcm90b3R5cGUub3ZlcmxhcHMgPSBmdW5jdGlvbihiMikge1xyXG4gICAgcmV0dXJuIHRoaXMubGVmdCA8IGIyLnJpZ2h0ICYmXHJcbiAgICAgICAgdGhpcy5yaWdodCA+IGIyLmxlZnQgJiZcclxuICAgICAgICB0aGlzLnRvcCA8IGIyLmJvdHRvbSAmJlxyXG4gICAgICAgIHRoaXMuYm90dG9tID4gYjIudG9wO1xyXG59O1xyXG5cclxuLy8gQ2hlY2sgaWYgdGhpcyBib3ggb3ZlcmxhcHMgYW55IG90aGVyIGJveGVzIGluIGJveGVzLlxyXG5Cb3hQb3NpdGlvbi5wcm90b3R5cGUub3ZlcmxhcHNBbnkgPSBmdW5jdGlvbihib3hlcykge1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBib3hlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXBzKGJveGVzW2ldKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn07XHJcblxyXG4vLyBDaGVjayBpZiB0aGlzIGJveCBpcyB3aXRoaW4gYW5vdGhlciBib3guXHJcbkJveFBvc2l0aW9uLnByb3RvdHlwZS53aXRoaW4gPSBmdW5jdGlvbihjb250YWluZXIpIHtcclxuICAgIHJldHVybiB0aGlzLnRvcCA+PSBjb250YWluZXIudG9wICYmXHJcbiAgICAgICAgdGhpcy5ib3R0b20gPD0gY29udGFpbmVyLmJvdHRvbSAmJlxyXG4gICAgICAgIHRoaXMubGVmdCA+PSBjb250YWluZXIubGVmdCAmJlxyXG4gICAgICAgIHRoaXMucmlnaHQgPD0gY29udGFpbmVyLnJpZ2h0O1xyXG59O1xyXG5cclxuLy8gQ2hlY2sgaWYgdGhpcyBib3ggaXMgZW50aXJlbHkgd2l0aGluIHRoZSBjb250YWluZXIgb3IgaXQgaXMgb3ZlcmxhcHBpbmdcclxuLy8gb24gdGhlIGVkZ2Ugb3Bwb3NpdGUgb2YgdGhlIGF4aXMgZGlyZWN0aW9uIHBhc3NlZC4gRm9yIGV4YW1wbGUsIGlmIFwiK3hcIiBpc1xyXG4vLyBwYXNzZWQgYW5kIHRoZSBib3ggaXMgb3ZlcmxhcHBpbmcgb24gdGhlIGxlZnQgZWRnZSBvZiB0aGUgY29udGFpbmVyLCB0aGVuXHJcbi8vIHJldHVybiB0cnVlLlxyXG5Cb3hQb3NpdGlvbi5wcm90b3R5cGUub3ZlcmxhcHNPcHBvc2l0ZUF4aXMgPSBmdW5jdGlvbihjb250YWluZXIsIGF4aXMpIHtcclxuICAgIHN3aXRjaCAoYXhpcykge1xyXG4gICAgICAgIGNhc2UgXCIreFwiOlxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sZWZ0IDwgY29udGFpbmVyLmxlZnQ7XHJcbiAgICAgICAgY2FzZSBcIi14XCI6XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJpZ2h0ID4gY29udGFpbmVyLnJpZ2h0O1xyXG4gICAgICAgIGNhc2UgXCIreVwiOlxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b3AgPCBjb250YWluZXIudG9wO1xyXG4gICAgICAgIGNhc2UgXCIteVwiOlxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ib3R0b20gPiBjb250YWluZXIuYm90dG9tO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLy8gRmluZCB0aGUgcGVyY2VudGFnZSBvZiB0aGUgYXJlYSB0aGF0IHRoaXMgYm94IGlzIG92ZXJsYXBwaW5nIHdpdGggYW5vdGhlclxyXG4vLyBib3guXHJcbkJveFBvc2l0aW9uLnByb3RvdHlwZS5pbnRlcnNlY3RQZXJjZW50YWdlID0gZnVuY3Rpb24oYjIpIHtcclxuICAgIHZhciB4ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4odGhpcy5yaWdodCwgYjIucmlnaHQpIC0gTWF0aC5tYXgodGhpcy5sZWZ0LCBiMi5sZWZ0KSksXHJcbiAgICAgICAgeSA9IE1hdGgubWF4KDAsIE1hdGgubWluKHRoaXMuYm90dG9tLCBiMi5ib3R0b20pIC0gTWF0aC5tYXgodGhpcy50b3AsIGIyLnRvcCkpLFxyXG4gICAgICAgIGludGVyc2VjdEFyZWEgPSB4ICogeTtcclxuICAgIHJldHVybiBpbnRlcnNlY3RBcmVhIC8gKHRoaXMuaGVpZ2h0ICogdGhpcy53aWR0aCk7XHJcbn07XHJcblxyXG4vLyBDb252ZXJ0IHRoZSBwb3NpdGlvbnMgZnJvbSB0aGlzIGJveCB0byBDU1MgY29tcGF0aWJsZSBwb3NpdGlvbnMgdXNpbmdcclxuLy8gdGhlIHJlZmVyZW5jZSBjb250YWluZXIncyBwb3NpdGlvbnMuIFRoaXMgaGFzIHRvIGJlIGRvbmUgYmVjYXVzZSB0aGlzXHJcbi8vIGJveCdzIHBvc2l0aW9ucyBhcmUgaW4gcmVmZXJlbmNlIHRvIHRoZSB2aWV3cG9ydCBvcmlnaW4sIHdoZXJlYXMsIENTU1xyXG4vLyB2YWx1ZXMgYXJlIGluIHJlZmVyZWNuZSB0byB0aGVpciByZXNwZWN0aXZlIGVkZ2VzLlxyXG5Cb3hQb3NpdGlvbi5wcm90b3R5cGUudG9DU1NDb21wYXRWYWx1ZXMgPSBmdW5jdGlvbihyZWZlcmVuY2UpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdG9wOiB0aGlzLnRvcCAtIHJlZmVyZW5jZS50b3AsXHJcbiAgICAgICAgYm90dG9tOiByZWZlcmVuY2UuYm90dG9tIC0gdGhpcy5ib3R0b20sXHJcbiAgICAgICAgbGVmdDogdGhpcy5sZWZ0IC0gcmVmZXJlbmNlLmxlZnQsXHJcbiAgICAgICAgcmlnaHQ6IHJlZmVyZW5jZS5yaWdodCAtIHRoaXMucmlnaHQsXHJcbiAgICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCxcclxuICAgICAgICB3aWR0aDogdGhpcy53aWR0aFxyXG4gICAgfTtcclxufTtcclxuXHJcbi8vIEdldCBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHRoZSBib3gncyBwb3NpdGlvbiB3aXRob3V0IGFueXRoaW5nIGV4dHJhLlxyXG4vLyBDYW4gcGFzcyBhIFN0eWxlQm94LCBIVE1MRWxlbWVudCwgb3IgYW5vdGhlciBCb3hQb3NpdG9uLlxyXG5Cb3hQb3NpdGlvbi5nZXRTaW1wbGVCb3hQb3NpdGlvbiA9IGZ1bmN0aW9uKG9iaikge1xyXG4gICAgdmFyIGhlaWdodCA9IG9iai5kaXYgPyBvYmouZGl2Lm9mZnNldEhlaWdodCA6IG9iai50YWdOYW1lID8gb2JqLm9mZnNldEhlaWdodCA6IDA7XHJcbiAgICB2YXIgd2lkdGggPSBvYmouZGl2ID8gb2JqLmRpdi5vZmZzZXRXaWR0aCA6IG9iai50YWdOYW1lID8gb2JqLm9mZnNldFdpZHRoIDogMDtcclxuICAgIHZhciB0b3AgPSBvYmouZGl2ID8gb2JqLmRpdi5vZmZzZXRUb3AgOiBvYmoudGFnTmFtZSA/IG9iai5vZmZzZXRUb3AgOiAwO1xyXG5cclxuICAgIG9iaiA9IG9iai5kaXYgPyBvYmouZGl2LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpIDpcclxuICAgICAgICBvYmoudGFnTmFtZSA/IG9iai5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSA6IG9iajtcclxuICAgIHZhciByZXQgPSB7XHJcbiAgICAgICAgbGVmdDogb2JqLmxlZnQsXHJcbiAgICAgICAgcmlnaHQ6IG9iai5yaWdodCxcclxuICAgICAgICB0b3A6IG9iai50b3AgfHwgdG9wLFxyXG4gICAgICAgIGhlaWdodDogb2JqLmhlaWdodCB8fCBoZWlnaHQsXHJcbiAgICAgICAgYm90dG9tOiBvYmouYm90dG9tIHx8ICh0b3AgKyAob2JqLmhlaWdodCB8fCBoZWlnaHQpKSxcclxuICAgICAgICB3aWR0aDogb2JqLndpZHRoIHx8IHdpZHRoXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHJldDtcclxufTtcclxuXHJcbi8vIE1vdmUgYSBTdHlsZUJveCB0byBpdHMgc3BlY2lmaWVkLCBvciBuZXh0IGJlc3QsIHBvc2l0aW9uLiBUaGUgY29udGFpbmVyQm94XHJcbi8vIGlzIHRoZSBib3ggdGhhdCBjb250YWlucyB0aGUgU3R5bGVCb3gsIHN1Y2ggYXMgYSBkaXYuIGJveFBvc2l0aW9ucyBhcmVcclxuLy8gYSBsaXN0IG9mIG90aGVyIGJveGVzIHRoYXQgdGhlIHN0eWxlQm94IGNhbid0IG92ZXJsYXAgd2l0aC5cclxuZnVuY3Rpb24gbW92ZUJveFRvTGluZVBvc2l0aW9uKHdpbmRvdywgc3R5bGVCb3gsIGNvbnRhaW5lckJveCwgYm94UG9zaXRpb25zKSB7XHJcblxyXG4gICAgLy8gRmluZCB0aGUgYmVzdCBwb3NpdGlvbiBmb3IgYSBjdWUgYm94LCBiLCBvbiB0aGUgdmlkZW8uIFRoZSBheGlzIHBhcmFtZXRlclxyXG4gICAgLy8gaXMgYSBsaXN0IG9mIGF4aXMsIHRoZSBvcmRlciBvZiB3aGljaCwgaXQgd2lsbCBtb3ZlIHRoZSBib3ggYWxvbmcuIEZvciBleGFtcGxlOlxyXG4gICAgLy8gUGFzc2luZyBbXCIreFwiLCBcIi14XCJdIHdpbGwgbW92ZSB0aGUgYm94IGZpcnN0IGFsb25nIHRoZSB4IGF4aXMgaW4gdGhlIHBvc2l0aXZlXHJcbiAgICAvLyBkaXJlY3Rpb24uIElmIGl0IGRvZXNuJ3QgZmluZCBhIGdvb2QgcG9zaXRpb24gZm9yIGl0IHRoZXJlIGl0IHdpbGwgdGhlbiBtb3ZlXHJcbiAgICAvLyBpdCBhbG9uZyB0aGUgeCBheGlzIGluIHRoZSBuZWdhdGl2ZSBkaXJlY3Rpb24uXHJcbiAgICBmdW5jdGlvbiBmaW5kQmVzdFBvc2l0aW9uKGIsIGF4aXMpIHtcclxuICAgICAgICB2YXIgYmVzdFBvc2l0aW9uLFxyXG4gICAgICAgICAgICBzcGVjaWZpZWRQb3NpdGlvbiA9IG5ldyBCb3hQb3NpdGlvbihiKSxcclxuICAgICAgICAgICAgcGVyY2VudGFnZSA9IDE7IC8vIEhpZ2hlc3QgcG9zc2libGUgc28gdGhlIGZpcnN0IHRoaW5nIHdlIGdldCBpcyBiZXR0ZXIuXHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXhpcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB3aGlsZSAoYi5vdmVybGFwc09wcG9zaXRlQXhpcyhjb250YWluZXJCb3gsIGF4aXNbaV0pIHx8XHJcbiAgICAgICAgICAgIChiLndpdGhpbihjb250YWluZXJCb3gpICYmIGIub3ZlcmxhcHNBbnkoYm94UG9zaXRpb25zKSkpIHtcclxuICAgICAgICAgICAgICAgIGIubW92ZShheGlzW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBXZSBmb3VuZCBhIHNwb3Qgd2hlcmUgd2UgYXJlbid0IG92ZXJsYXBwaW5nIGFueXRoaW5nLiBUaGlzIGlzIG91clxyXG4gICAgICAgICAgICAvLyBiZXN0IHBvc2l0aW9uLlxyXG4gICAgICAgICAgICBpZiAoYi53aXRoaW4oY29udGFpbmVyQm94KSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHAgPSBiLmludGVyc2VjdFBlcmNlbnRhZ2UoY29udGFpbmVyQm94KTtcclxuICAgICAgICAgICAgLy8gSWYgd2UncmUgb3V0c2lkZSB0aGUgY29udGFpbmVyIGJveCBsZXNzIHRoZW4gd2Ugd2VyZSBvbiBvdXIgbGFzdCB0cnlcclxuICAgICAgICAgICAgLy8gdGhlbiByZW1lbWJlciB0aGlzIHBvc2l0aW9uIGFzIHRoZSBiZXN0IHBvc2l0aW9uLlxyXG4gICAgICAgICAgICBpZiAocGVyY2VudGFnZSA+IHApIHtcclxuICAgICAgICAgICAgICAgIGJlc3RQb3NpdGlvbiA9IG5ldyBCb3hQb3NpdGlvbihiKTtcclxuICAgICAgICAgICAgICAgIHBlcmNlbnRhZ2UgPSBwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFJlc2V0IHRoZSBib3ggcG9zaXRpb24gdG8gdGhlIHNwZWNpZmllZCBwb3NpdGlvbi5cclxuICAgICAgICAgICAgYiA9IG5ldyBCb3hQb3NpdGlvbihzcGVjaWZpZWRQb3NpdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBiZXN0UG9zaXRpb24gfHwgc3BlY2lmaWVkUG9zaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGJveFBvc2l0aW9uID0gbmV3IEJveFBvc2l0aW9uKHN0eWxlQm94KSxcclxuICAgICAgICBjdWUgPSBzdHlsZUJveC5jdWUsXHJcbiAgICAgICAgbGluZVBvcyA9IGNvbXB1dGVMaW5lUG9zKGN1ZSksXHJcbiAgICAgICAgYXhpcyA9IFtdO1xyXG5cclxuICAgIC8vIElmIHdlIGhhdmUgYSBsaW5lIG51bWJlciB0byBhbGlnbiB0aGUgY3VlIHRvLlxyXG4gICAgaWYgKGN1ZS5zbmFwVG9MaW5lcykge1xyXG4gICAgICAgIHZhciBzaXplO1xyXG4gICAgICAgIHN3aXRjaCAoY3VlLnZlcnRpY2FsKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJcIjpcclxuICAgICAgICAgICAgICAgIGF4aXMgPSBbIFwiK3lcIiwgXCIteVwiIF07XHJcbiAgICAgICAgICAgICAgICBzaXplID0gXCJoZWlnaHRcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwicmxcIjpcclxuICAgICAgICAgICAgICAgIGF4aXMgPSBbIFwiK3hcIiwgXCIteFwiIF07XHJcbiAgICAgICAgICAgICAgICBzaXplID0gXCJ3aWR0aFwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJsclwiOlxyXG4gICAgICAgICAgICAgICAgYXhpcyA9IFsgXCIteFwiLCBcIit4XCIgXTtcclxuICAgICAgICAgICAgICAgIHNpemUgPSBcIndpZHRoXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBzdGVwID0gYm94UG9zaXRpb24ubGluZUhlaWdodCxcclxuICAgICAgICAgICAgcG9zaXRpb24gPSBzdGVwICogTWF0aC5yb3VuZChsaW5lUG9zKSxcclxuICAgICAgICAgICAgbWF4UG9zaXRpb24gPSBjb250YWluZXJCb3hbc2l6ZV0gKyBzdGVwLFxyXG4gICAgICAgICAgICBpbml0aWFsQXhpcyA9IGF4aXNbMF07XHJcblxyXG4gICAgICAgIC8vIElmIHRoZSBzcGVjaWZpZWQgaW50aWFsIHBvc2l0aW9uIGlzIGdyZWF0ZXIgdGhlbiB0aGUgbWF4IHBvc2l0aW9uIHRoZW5cclxuICAgICAgICAvLyBjbGFtcCB0aGUgYm94IHRvIHRoZSBhbW91bnQgb2Ygc3RlcHMgaXQgd291bGQgdGFrZSBmb3IgdGhlIGJveCB0b1xyXG4gICAgICAgIC8vIHJlYWNoIHRoZSBtYXggcG9zaXRpb24uXHJcbiAgICAgICAgaWYgKE1hdGguYWJzKHBvc2l0aW9uKSA+IG1heFBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uID0gcG9zaXRpb24gPCAwID8gLTEgOiAxO1xyXG4gICAgICAgICAgICBwb3NpdGlvbiAqPSBNYXRoLmNlaWwobWF4UG9zaXRpb24gLyBzdGVwKSAqIHN0ZXA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBJZiBjb21wdXRlZCBsaW5lIHBvc2l0aW9uIHJldHVybnMgbmVnYXRpdmUgdGhlbiBsaW5lIG51bWJlcnMgYXJlXHJcbiAgICAgICAgLy8gcmVsYXRpdmUgdG8gdGhlIGJvdHRvbSBvZiB0aGUgdmlkZW8gaW5zdGVhZCBvZiB0aGUgdG9wLiBUaGVyZWZvcmUsIHdlXHJcbiAgICAgICAgLy8gbmVlZCB0byBpbmNyZWFzZSBvdXIgaW5pdGlhbCBwb3NpdGlvbiBieSB0aGUgbGVuZ3RoIG9yIHdpZHRoIG9mIHRoZVxyXG4gICAgICAgIC8vIHZpZGVvLCBkZXBlbmRpbmcgb24gdGhlIHdyaXRpbmcgZGlyZWN0aW9uLCBhbmQgcmV2ZXJzZSBvdXIgYXhpcyBkaXJlY3Rpb25zLlxyXG4gICAgICAgIGlmIChsaW5lUG9zIDwgMCkge1xyXG4gICAgICAgICAgICBwb3NpdGlvbiArPSBjdWUudmVydGljYWwgPT09IFwiXCIgPyBjb250YWluZXJCb3guaGVpZ2h0IDogY29udGFpbmVyQm94LndpZHRoO1xyXG4gICAgICAgICAgICBheGlzID0gYXhpcy5yZXZlcnNlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBNb3ZlIHRoZSBib3ggdG8gdGhlIHNwZWNpZmllZCBwb3NpdGlvbi4gVGhpcyBtYXkgbm90IGJlIGl0cyBiZXN0XHJcbiAgICAgICAgLy8gcG9zaXRpb24uXHJcbiAgICAgICAgYm94UG9zaXRpb24ubW92ZShpbml0aWFsQXhpcywgcG9zaXRpb24pO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gSWYgd2UgaGF2ZSBhIHBlcmNlbnRhZ2UgbGluZSB2YWx1ZSBmb3IgdGhlIGN1ZS5cclxuICAgICAgICB2YXIgY2FsY3VsYXRlZFBlcmNlbnRhZ2UgPSAoYm94UG9zaXRpb24ubGluZUhlaWdodCAvIGNvbnRhaW5lckJveC5oZWlnaHQpICogMTAwO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKGN1ZS5saW5lQWxpZ24pIHtcclxuICAgICAgICAgICAgY2FzZSBcIm1pZGRsZVwiOlxyXG4gICAgICAgICAgICAgICAgbGluZVBvcyAtPSAoY2FsY3VsYXRlZFBlcmNlbnRhZ2UgLyAyKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZW5kXCI6XHJcbiAgICAgICAgICAgICAgICBsaW5lUG9zIC09IGNhbGN1bGF0ZWRQZXJjZW50YWdlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBcHBseSBpbml0aWFsIGxpbmUgcG9zaXRpb24gdG8gdGhlIGN1ZSBib3guXHJcbiAgICAgICAgc3dpdGNoIChjdWUudmVydGljYWwpIHtcclxuICAgICAgICAgICAgY2FzZSBcIlwiOlxyXG4gICAgICAgICAgICAgICAgc3R5bGVCb3guYXBwbHlTdHlsZXMoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRvcDogc3R5bGVCb3guZm9ybWF0U3R5bGUobGluZVBvcywgXCIlXCIpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwicmxcIjpcclxuICAgICAgICAgICAgICAgIHN0eWxlQm94LmFwcGx5U3R5bGVzKHtcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBzdHlsZUJveC5mb3JtYXRTdHlsZShsaW5lUG9zLCBcIiVcIilcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJsclwiOlxyXG4gICAgICAgICAgICAgICAgc3R5bGVCb3guYXBwbHlTdHlsZXMoe1xyXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiBzdHlsZUJveC5mb3JtYXRTdHlsZShsaW5lUG9zLCBcIiVcIilcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBheGlzID0gWyBcIit5XCIsIFwiLXhcIiwgXCIreFwiLCBcIi15XCIgXTtcclxuXHJcbiAgICAgICAgLy8gR2V0IHRoZSBib3ggcG9zaXRpb24gYWdhaW4gYWZ0ZXIgd2UndmUgYXBwbGllZCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uaW5nXHJcbiAgICAgICAgLy8gdG8gaXQuXHJcbiAgICAgICAgYm94UG9zaXRpb24gPSBuZXcgQm94UG9zaXRpb24oc3R5bGVCb3gpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBiZXN0UG9zaXRpb24gPSBmaW5kQmVzdFBvc2l0aW9uKGJveFBvc2l0aW9uLCBheGlzKTtcclxuICAgIHN0eWxlQm94Lm1vdmUoYmVzdFBvc2l0aW9uLnRvQ1NTQ29tcGF0VmFsdWVzKGNvbnRhaW5lckJveCkpO1xyXG59XHJcblxyXG4vKmZ1bmN0aW9uIFdlYlZUVCgpIHtcclxuIC8vIE5vdGhpbmdcclxuIH0qL1xyXG5cclxuLy8gSGVscGVyIHRvIGFsbG93IHN0cmluZ3MgdG8gYmUgZGVjb2RlZCBpbnN0ZWFkIG9mIHRoZSBkZWZhdWx0IGJpbmFyeSB1dGY4IGRhdGEuXHJcbldlYlZUVC5TdHJpbmdEZWNvZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGRlY29kZTogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoIWRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YSAhPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3IgLSBleHBlY3RlZCBzdHJpbmcgZGF0YS5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChlbmNvZGVVUklDb21wb25lbnQoZGF0YSkpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn07XHJcblxyXG5XZWJWVFQuY29udmVydEN1ZVRvRE9NVHJlZSA9IGZ1bmN0aW9uKHdpbmRvdywgY3VldGV4dCkge1xyXG4gICAgaWYgKCF3aW5kb3cgfHwgIWN1ZXRleHQpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHJldHVybiBwYXJzZUNvbnRlbnQod2luZG93LCBjdWV0ZXh0KTtcclxufTtcclxuXHJcbnZhciBGT05UX1NJWkVfUEVSQ0VOVCA9IDAuMDU7XHJcbnZhciBGT05UX1NUWUxFID0gXCJzYW5zLXNlcmlmXCI7XHJcbnZhciBDVUVfQkFDS0dST1VORF9QQURESU5HID0gXCIxLjUlXCI7XHJcblxyXG4vLyBSdW5zIHRoZSBwcm9jZXNzaW5nIG1vZGVsIG92ZXIgdGhlIGN1ZXMgYW5kIHJlZ2lvbnMgcGFzc2VkIHRvIGl0LlxyXG4vLyBAcGFyYW0gb3ZlcmxheSBBIGJsb2NrIGxldmVsIGVsZW1lbnQgKHVzdWFsbHkgYSBkaXYpIHRoYXQgdGhlIGNvbXB1dGVkIGN1ZXNcclxuLy8gICAgICAgICAgICAgICAgYW5kIHJlZ2lvbnMgd2lsbCBiZSBwbGFjZWQgaW50by5cclxuV2ViVlRULnByb2Nlc3NDdWVzID0gZnVuY3Rpb24od2luZG93LCBjdWVzLCBvdmVybGF5KSB7XHJcbiAgICBpZiAoIXdpbmRvdyB8fCAhY3VlcyB8fCAhb3ZlcmxheSkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlbW92ZSBhbGwgcHJldmlvdXMgY2hpbGRyZW4uXHJcbiAgICB3aGlsZSAob3ZlcmxheS5maXJzdENoaWxkKSB7XHJcbiAgICAgICAgb3ZlcmxheS5yZW1vdmVDaGlsZChvdmVybGF5LmZpcnN0Q2hpbGQpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBwYWRkZWRPdmVybGF5ID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBwYWRkZWRPdmVybGF5LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xyXG4gICAgcGFkZGVkT3ZlcmxheS5zdHlsZS5sZWZ0ID0gXCIwXCI7XHJcbiAgICBwYWRkZWRPdmVybGF5LnN0eWxlLnJpZ2h0ID0gXCIwXCI7XHJcbiAgICBwYWRkZWRPdmVybGF5LnN0eWxlLnRvcCA9IFwiMFwiO1xyXG4gICAgcGFkZGVkT3ZlcmxheS5zdHlsZS5ib3R0b20gPSBcIjBcIjtcclxuICAgIHBhZGRlZE92ZXJsYXkuc3R5bGUubWFyZ2luID0gQ1VFX0JBQ0tHUk9VTkRfUEFERElORztcclxuICAgIG92ZXJsYXkuYXBwZW5kQ2hpbGQocGFkZGVkT3ZlcmxheSk7XHJcblxyXG4gICAgLy8gRGV0ZXJtaW5lIGlmIHdlIG5lZWQgdG8gY29tcHV0ZSB0aGUgZGlzcGxheSBzdGF0ZXMgb2YgdGhlIGN1ZXMuIFRoaXMgY291bGRcclxuICAgIC8vIGJlIHRoZSBjYXNlIGlmIGEgY3VlJ3Mgc3RhdGUgaGFzIGJlZW4gY2hhbmdlZCBzaW5jZSB0aGUgbGFzdCBjb21wdXRhdGlvbiBvclxyXG4gICAgLy8gaWYgaXQgaGFzIG5vdCBiZWVuIGNvbXB1dGVkIHlldC5cclxuICAgIGZ1bmN0aW9uIHNob3VsZENvbXB1dGUoY3Vlcykge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY3Vlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoY3Vlc1tpXS5oYXNCZWVuUmVzZXQgfHwgIWN1ZXNbaV0uZGlzcGxheVN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gV2UgZG9uJ3QgbmVlZCB0byByZWNvbXB1dGUgdGhlIGN1ZXMnIGRpc3BsYXkgc3RhdGVzLiBKdXN0IHJldXNlIHRoZW0uXHJcbiAgICBpZiAoIXNob3VsZENvbXB1dGUoY3VlcykpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGN1ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgcGFkZGVkT3ZlcmxheS5hcHBlbmRDaGlsZChjdWVzW2ldLmRpc3BsYXlTdGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgYm94UG9zaXRpb25zID0gW10sXHJcbiAgICAgICAgY29udGFpbmVyQm94ID0gQm94UG9zaXRpb24uZ2V0U2ltcGxlQm94UG9zaXRpb24ocGFkZGVkT3ZlcmxheSksXHJcbiAgICAgICAgZm9udFNpemUgPSBNYXRoLnJvdW5kKGNvbnRhaW5lckJveC5oZWlnaHQgKiBGT05UX1NJWkVfUEVSQ0VOVCAqIDEwMCkgLyAxMDA7XHJcbiAgICB2YXIgc3R5bGVPcHRpb25zID0ge1xyXG4gICAgICAgIGZvbnQ6IChmb250U2l6ZSAqIGZvbnRTY2FsZSkgKyBcInB4IFwiICsgRk9OVF9TVFlMRVxyXG4gICAgfTtcclxuXHJcbiAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHN0eWxlQm94LCBjdWU7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY3Vlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjdWUgPSBjdWVzW2ldO1xyXG5cclxuICAgICAgICAgICAgLy8gQ29tcHV0ZSB0aGUgaW50aWFsIHBvc2l0aW9uIGFuZCBzdHlsZXMgb2YgdGhlIGN1ZSBkaXYuXHJcbiAgICAgICAgICAgIHN0eWxlQm94ID0gbmV3IEN1ZVN0eWxlQm94KHdpbmRvdywgY3VlLCBzdHlsZU9wdGlvbnMpO1xyXG4gICAgICAgICAgICBwYWRkZWRPdmVybGF5LmFwcGVuZENoaWxkKHN0eWxlQm94LmRpdik7XHJcblxyXG4gICAgICAgICAgICAvLyBNb3ZlIHRoZSBjdWUgZGl2IHRvIGl0J3MgY29ycmVjdCBsaW5lIHBvc2l0aW9uLlxyXG4gICAgICAgICAgICBtb3ZlQm94VG9MaW5lUG9zaXRpb24od2luZG93LCBzdHlsZUJveCwgY29udGFpbmVyQm94LCBib3hQb3NpdGlvbnMpO1xyXG5cclxuICAgICAgICAgICAgLy8gUmVtZW1iZXIgdGhlIGNvbXB1dGVkIGRpdiBzbyB0aGF0IHdlIGRvbid0IGhhdmUgdG8gcmVjb21wdXRlIGl0IGxhdGVyXHJcbiAgICAgICAgICAgIC8vIGlmIHdlIGRvbid0IGhhdmUgdG9vLlxyXG4gICAgICAgICAgICBjdWUuZGlzcGxheVN0YXRlID0gc3R5bGVCb3guZGl2O1xyXG5cclxuICAgICAgICAgICAgYm94UG9zaXRpb25zLnB1c2goQm94UG9zaXRpb24uZ2V0U2ltcGxlQm94UG9zaXRpb24oc3R5bGVCb3gpKTtcclxuICAgICAgICB9XHJcbiAgICB9KSgpO1xyXG59O1xyXG5cclxuV2ViVlRULlBhcnNlciA9IGZ1bmN0aW9uKHdpbmRvdywgZGVjb2Rlcikge1xyXG4gICAgdGhpcy53aW5kb3cgPSB3aW5kb3c7XHJcbiAgICB0aGlzLnN0YXRlID0gXCJJTklUSUFMXCI7XHJcbiAgICB0aGlzLmJ1ZmZlciA9IFwiXCI7XHJcbiAgICB0aGlzLmRlY29kZXIgPSBkZWNvZGVyIHx8IG5ldyBUZXh0RGVjb2RlcihcInV0ZjhcIik7XHJcbiAgICB0aGlzLnJlZ2lvbkxpc3QgPSBbXTtcclxufTtcclxuXHJcbldlYlZUVC5QYXJzZXIucHJvdG90eXBlID0ge1xyXG4gICAgLy8gSWYgdGhlIGVycm9yIGlzIGEgUGFyc2luZ0Vycm9yIHRoZW4gcmVwb3J0IGl0IHRvIHRoZSBjb25zdW1lciBpZlxyXG4gICAgLy8gcG9zc2libGUuIElmIGl0J3Mgbm90IGEgUGFyc2luZ0Vycm9yIHRoZW4gdGhyb3cgaXQgbGlrZSBub3JtYWwuXHJcbiAgICByZXBvcnRPclRocm93RXJyb3I6IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIFBhcnNpbmdFcnJvcikge1xyXG4gICAgICAgICAgICB0aGlzLm9ucGFyc2luZ2Vycm9yICYmIHRoaXMub25wYXJzaW5nZXJyb3IoZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcGFyc2U6IGZ1bmN0aW9uIChkYXRhLCBmbHVzaGluZykge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICAvLyBJZiB0aGVyZSBpcyBubyBkYXRhIHRoZW4gd2Ugd29uJ3QgZGVjb2RlIGl0LCBidXQgd2lsbCBqdXN0IHRyeSB0byBwYXJzZVxyXG4gICAgICAgIC8vIHdoYXRldmVyIGlzIGluIGJ1ZmZlciBhbHJlYWR5LiBUaGlzIG1heSBvY2N1ciBpbiBjaXJjdW1zdGFuY2VzLCBmb3JcclxuICAgICAgICAvLyBleGFtcGxlIHdoZW4gZmx1c2goKSBpcyBjYWxsZWQuXHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgLy8gVHJ5IHRvIGRlY29kZSB0aGUgZGF0YSB0aGF0IHdlIHJlY2VpdmVkLlxyXG4gICAgICAgICAgICBzZWxmLmJ1ZmZlciArPSBzZWxmLmRlY29kZXIuZGVjb2RlKGRhdGEsIHtzdHJlYW06IHRydWV9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gY29sbGVjdE5leHRMaW5lKCkge1xyXG4gICAgICAgICAgICB2YXIgYnVmZmVyID0gc2VsZi5idWZmZXI7XHJcbiAgICAgICAgICAgIHZhciBwb3MgPSAwO1xyXG4gICAgICAgICAgICB3aGlsZSAocG9zIDwgYnVmZmVyLmxlbmd0aCAmJiBidWZmZXJbcG9zXSAhPT0gJ1xccicgJiYgYnVmZmVyW3Bvc10gIT09ICdcXG4nKSB7XHJcbiAgICAgICAgICAgICAgICArK3BvcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgbGluZSA9IGJ1ZmZlci5zdWJzdHIoMCwgcG9zKTtcclxuICAgICAgICAgICAgLy8gQWR2YW5jZSB0aGUgYnVmZmVyIGVhcmx5IGluIGNhc2Ugd2UgZmFpbCBiZWxvdy5cclxuICAgICAgICAgICAgaWYgKGJ1ZmZlcltwb3NdID09PSAnXFxyJykge1xyXG4gICAgICAgICAgICAgICAgKytwb3M7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGJ1ZmZlcltwb3NdID09PSAnXFxuJykge1xyXG4gICAgICAgICAgICAgICAgKytwb3M7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi5idWZmZXIgPSBidWZmZXIuc3Vic3RyKHBvcyk7XHJcbiAgICAgICAgICAgIHJldHVybiBsaW5lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gMy40IFdlYlZUVCByZWdpb24gYW5kIFdlYlZUVCByZWdpb24gc2V0dGluZ3Mgc3ludGF4XHJcbiAgICAgICAgZnVuY3Rpb24gcGFyc2VSZWdpb24oaW5wdXQpIHtcclxuICAgICAgICAgICAgdmFyIHNldHRpbmdzID0gbmV3IFNldHRpbmdzKCk7XHJcblxyXG4gICAgICAgICAgICBwYXJzZU9wdGlvbnMoaW5wdXQsIGZ1bmN0aW9uIChrLCB2KSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGspIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaWRcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3Muc2V0KGssIHYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwid2lkdGhcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MucGVyY2VudChrLCB2KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImxpbmVzXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLmludGVnZXIoaywgdik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJyZWdpb25hbmNob3JcIjpcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwidmlld3BvcnRhbmNob3JcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHh5ID0gdi5zcGxpdCgnLCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoeHkubGVuZ3RoICE9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBoYXZlIHRvIG1ha2Ugc3VyZSBib3RoIHggYW5kIHkgcGFyc2UsIHNvIHVzZSBhIHRlbXBvcmFyeVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzZXR0aW5ncyBvYmplY3QgaGVyZS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFuY2hvciA9IG5ldyBTZXR0aW5ncygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmNob3IucGVyY2VudChcInhcIiwgeHlbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmNob3IucGVyY2VudChcInlcIiwgeHlbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWFuY2hvci5oYXMoXCJ4XCIpIHx8ICFhbmNob3IuaGFzKFwieVwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3Muc2V0KGsgKyBcIlhcIiwgYW5jaG9yLmdldChcInhcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5zZXQoayArIFwiWVwiLCBhbmNob3IuZ2V0KFwieVwiKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJzY3JvbGxcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuYWx0KGssIHYsIFtcInVwXCJdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIC89LywgL1xccy8pO1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIHRoZSByZWdpb24sIHVzaW5nIGRlZmF1bHQgdmFsdWVzIGZvciBhbnkgdmFsdWVzIHRoYXQgd2VyZSBub3RcclxuICAgICAgICAgICAgLy8gc3BlY2lmaWVkLlxyXG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MuaGFzKFwiaWRcIikpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZWdpb24gPSBuZXcgc2VsZi53aW5kb3cuVlRUUmVnaW9uKCk7XHJcbiAgICAgICAgICAgICAgICByZWdpb24ud2lkdGggPSBzZXR0aW5ncy5nZXQoXCJ3aWR0aFwiLCAxMDApO1xyXG4gICAgICAgICAgICAgICAgcmVnaW9uLmxpbmVzID0gc2V0dGluZ3MuZ2V0KFwibGluZXNcIiwgMyk7XHJcbiAgICAgICAgICAgICAgICByZWdpb24ucmVnaW9uQW5jaG9yWCA9IHNldHRpbmdzLmdldChcInJlZ2lvbmFuY2hvclhcIiwgMCk7XHJcbiAgICAgICAgICAgICAgICByZWdpb24ucmVnaW9uQW5jaG9yWSA9IHNldHRpbmdzLmdldChcInJlZ2lvbmFuY2hvcllcIiwgMTAwKTtcclxuICAgICAgICAgICAgICAgIHJlZ2lvbi52aWV3cG9ydEFuY2hvclggPSBzZXR0aW5ncy5nZXQoXCJ2aWV3cG9ydGFuY2hvclhcIiwgMCk7XHJcbiAgICAgICAgICAgICAgICByZWdpb24udmlld3BvcnRBbmNob3JZID0gc2V0dGluZ3MuZ2V0KFwidmlld3BvcnRhbmNob3JZXCIsIDEwMCk7XHJcbiAgICAgICAgICAgICAgICByZWdpb24uc2Nyb2xsID0gc2V0dGluZ3MuZ2V0KFwic2Nyb2xsXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gUmVnaXN0ZXIgdGhlIHJlZ2lvbi5cclxuICAgICAgICAgICAgICAgIHNlbGYub25yZWdpb24gJiYgc2VsZi5vbnJlZ2lvbihyZWdpb24pO1xyXG4gICAgICAgICAgICAgICAgLy8gUmVtZW1iZXIgdGhlIFZUVFJlZ2lvbiBmb3IgbGF0ZXIgaW4gY2FzZSB3ZSBwYXJzZSBhbnkgVlRUQ3VlcyB0aGF0XHJcbiAgICAgICAgICAgICAgICAvLyByZWZlcmVuY2UgaXQuXHJcbiAgICAgICAgICAgICAgICBzZWxmLnJlZ2lvbkxpc3QucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHNldHRpbmdzLmdldChcImlkXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2lvbjogcmVnaW9uXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gMy4yIFdlYlZUVCBtZXRhZGF0YSBoZWFkZXIgc3ludGF4XHJcbiAgICAgICAgZnVuY3Rpb24gcGFyc2VIZWFkZXIoaW5wdXQpIHtcclxuICAgICAgICAgICAgcGFyc2VPcHRpb25zKGlucHV0LCBmdW5jdGlvbiAoaywgdikge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIlJlZ2lvblwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAzLjMgV2ViVlRUIHJlZ2lvbiBtZXRhZGF0YSBoZWFkZXIgc3ludGF4XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlUmVnaW9uKHYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgLzovKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIDUuMSBXZWJWVFQgZmlsZSBwYXJzaW5nLlxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHZhciBsaW5lO1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5zdGF0ZSA9PT0gXCJJTklUSUFMXCIpIHtcclxuICAgICAgICAgICAgICAgIC8vIFdlIGNhbid0IHN0YXJ0IHBhcnNpbmcgdW50aWwgd2UgaGF2ZSB0aGUgZmlyc3QgbGluZS5cclxuICAgICAgICAgICAgICAgIGlmICghL1xcclxcbnxcXG4vLnRlc3Qoc2VsZi5idWZmZXIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGluZSA9IGNvbGxlY3ROZXh0TGluZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBtID0gbGluZS5tYXRjaCgvXldFQlZUVChbIFxcdF0uKik/JC8pO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFtIHx8ICFtWzBdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNpbmdFcnJvcihQYXJzaW5nRXJyb3IuRXJyb3JzLkJhZFNpZ25hdHVyZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5zdGF0ZSA9IFwiSEVBREVSXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBhbHJlYWR5Q29sbGVjdGVkTGluZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB3aGlsZSAoc2VsZi5idWZmZXIpIHtcclxuICAgICAgICAgICAgICAgIC8vIFdlIGNhbid0IHBhcnNlIGEgbGluZSB1bnRpbCB3ZSBoYXZlIHRoZSBmdWxsIGxpbmUuXHJcbiAgICAgICAgICAgICAgICBpZiAoIS9cXHJcXG58XFxuLy50ZXN0KHNlbGYuYnVmZmVyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghYWxyZWFkeUNvbGxlY3RlZExpbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBsaW5lID0gY29sbGVjdE5leHRMaW5lKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFscmVhZHlDb2xsZWN0ZWRMaW5lID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHNlbGYuc3RhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiSEVBREVSXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIDEzLTE4IC0gQWxsb3cgYSBoZWFkZXIgKG1ldGFkYXRhKSB1bmRlciB0aGUgV0VCVlRUIGxpbmUuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgvOi8udGVzdChsaW5lKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VIZWFkZXIobGluZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIWxpbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFuIGVtcHR5IGxpbmUgdGVybWluYXRlcyB0aGUgaGVhZGVyIGFuZCBzdGFydHMgdGhlIGJvZHkgKGN1ZXMpLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zdGF0ZSA9IFwiSURcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiTk9URVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJZ25vcmUgTk9URSBibG9ja3MuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbGluZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zdGF0ZSA9IFwiSURcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiSURcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIHRoZSBzdGFydCBvZiBOT1RFIGJsb2Nrcy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKC9eTk9URSgkfFsgXFx0XSkvLnRlc3QobGluZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc3RhdGUgPSBcIk5PVEVcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIDE5LTI5IC0gQWxsb3cgYW55IG51bWJlciBvZiBsaW5lIHRlcm1pbmF0b3JzLCB0aGVuIGluaXRpYWxpemUgbmV3IGN1ZSB2YWx1ZXMuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbGluZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jdWUgPSBuZXcgc2VsZi53aW5kb3cuVlRUQ3VlKDAsIDAsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnN0YXRlID0gXCJDVUVcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gMzAtMzkgLSBDaGVjayBpZiBzZWxmIGxpbmUgY29udGFpbnMgYW4gb3B0aW9uYWwgaWRlbnRpZmllciBvciB0aW1pbmcgZGF0YS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxpbmUuaW5kZXhPZihcIi0tPlwiKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY3VlLmlkID0gbGluZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUHJvY2VzcyBsaW5lIGFzIHN0YXJ0IG9mIGEgY3VlLlxyXG4gICAgICAgICAgICAgICAgICAgIC8qZmFsbHMgdGhyb3VnaCovXHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIkNVRVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyA0MCAtIENvbGxlY3QgY3VlIHRpbWluZ3MgYW5kIHNldHRpbmdzLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VDdWUobGluZSwgc2VsZi5jdWUsIHNlbGYucmVnaW9uTGlzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYucmVwb3J0T3JUaHJvd0Vycm9yKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSW4gY2FzZSBvZiBhbiBlcnJvciBpZ25vcmUgcmVzdCBvZiB0aGUgY3VlLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jdWUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zdGF0ZSA9IFwiQkFEQ1VFXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnN0YXRlID0gXCJDVUVURVhUXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJDVUVURVhUXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBoYXNTdWJzdHJpbmcgPSBsaW5lLmluZGV4T2YoXCItLT5cIikgIT09IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAzNCAtIElmIHdlIGhhdmUgYW4gZW1wdHkgbGluZSB0aGVuIHJlcG9ydCB0aGUgY3VlLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAzNSAtIElmIHdlIGhhdmUgdGhlIHNwZWNpYWwgc3Vic3RyaW5nICctLT4nIHRoZW4gcmVwb3J0IHRoZSBjdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJ1dCBkbyBub3QgY29sbGVjdCB0aGUgbGluZSBhcyB3ZSBuZWVkIHRvIHByb2Nlc3MgdGhlIGN1cnJlbnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb25lIGFzIGEgbmV3IGN1ZS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFsaW5lIHx8IGhhc1N1YnN0cmluZyAmJiAoYWxyZWFkeUNvbGxlY3RlZExpbmUgPSB0cnVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UgYXJlIGRvbmUgcGFyc2luZyBzZWxmIGN1ZS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYub25jdWUgJiYgc2VsZi5vbmN1ZShzZWxmLmN1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmN1ZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnN0YXRlID0gXCJJRFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuY3VlLnRleHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY3VlLnRleHQgKz0gXCJcXG5cIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmN1ZS50ZXh0ICs9IGxpbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJCQURDVUVcIjogLy8gQkFEQ1VFXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIDU0LTYyIC0gQ29sbGVjdCBhbmQgZGlzY2FyZCB0aGUgcmVtYWluaW5nIGN1ZS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFsaW5lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnN0YXRlID0gXCJJRFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKCFmbHVzaGluZykge1xyXG4gICAgICAgICAgICAgICAgLy/rlYzrlYzroZwgKO2VnOq4hyB2dHTroZwg7LaU7KCVKSBjdWXqsIAg64Ko7JWEIOyeiOuKlOyxhOuhnCBzZWxmLmZsdXNoKCnrpbwg7Zi47Lac7ZW07IScIGN1ZeqwgCDsnojquLAg65WM66y47JeQIOuLpOyLnCBzZWxmLnBhcnNlKCnrpbwg7YOA64qUIOqyveyasOqwgCDsg53quYAuXHJcbiAgICAgICAgICAgICAgICAvL+yZnCDsnbTroIfqsowg7Kec7JesIOyeiOuKlOyngCDrqqjrpbTqsqDqs6Ag7J2864uoIOyVhOuemOyZgCDqsJnsnYAg7L2U65Oc66GcIOychOq4sOulvCDqt7nrs7XtlZzri6QuXHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5zdGF0ZSA9PT0gXCJDVUVURVhUXCIgJiYgc2VsZi5jdWUgJiYgc2VsZi5vbmN1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYub25jdWUoc2VsZi5jdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2VsZi5mbHVzaCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHNlbGYucmVwb3J0T3JUaHJvd0Vycm9yKGUpO1xyXG4gICAgICAgICAgICAvLyBJZiB3ZSBhcmUgY3VycmVudGx5IHBhcnNpbmcgYSBjdWUsIHJlcG9ydCB3aGF0IHdlIGhhdmUuXHJcbiAgICAgICAgICAgIGlmIChzZWxmLnN0YXRlID09PSBcIkNVRVRFWFRcIiAmJiBzZWxmLmN1ZSAmJiBzZWxmLm9uY3VlKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLm9uY3VlKHNlbGYuY3VlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLmN1ZSA9IG51bGw7XHJcbiAgICAgICAgICAgIC8vIEVudGVyIEJBRFdFQlZUVCBzdGF0ZSBpZiBoZWFkZXIgd2FzIG5vdCBwYXJzZWQgY29ycmVjdGx5IG90aGVyd2lzZVxyXG4gICAgICAgICAgICAvLyBhbm90aGVyIGV4Y2VwdGlvbiBvY2N1cnJlZCBzbyBlbnRlciBCQURDVUUgc3RhdGUuXHJcbiAgICAgICAgICAgIHNlbGYuc3RhdGUgPSBzZWxmLnN0YXRlID09PSBcIklOSVRJQUxcIiA/IFwiQkFEV0VCVlRUXCIgOiBcIkJBRENVRVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcbiAgICBmbHVzaDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gRmluaXNoIGRlY29kaW5nIHRoZSBzdHJlYW0uXHJcbiAgICAgICAgICAgIHNlbGYuYnVmZmVyICs9IHNlbGYuZGVjb2Rlci5kZWNvZGUoKTtcclxuICAgICAgICAgICAgLy8gU3ludGhlc2l6ZSB0aGUgZW5kIG9mIHRoZSBjdXJyZW50IGN1ZSBvciByZWdpb24uXHJcbiAgICAgICAgICAgIGlmIChzZWxmLmN1ZSB8fCBzZWxmLnN0YXRlID09PSBcIkhFQURFUlwiKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmJ1ZmZlciArPSBcIlxcblxcblwiO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5wYXJzZShudWxsLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBJZiB3ZSd2ZSBmbHVzaGVkLCBwYXJzZWQsIGFuZCB3ZSdyZSBzdGlsbCBvbiB0aGUgSU5JVElBTCBzdGF0ZSB0aGVuXHJcbiAgICAgICAgICAgIC8vIHRoYXQgbWVhbnMgd2UgZG9uJ3QgaGF2ZSBlbm91Z2ggb2YgdGhlIHN0cmVhbSB0byBwYXJzZSB0aGUgZmlyc3RcclxuICAgICAgICAgICAgLy8gbGluZS5cclxuICAgICAgICAgICAgaWYgKHNlbGYuc3RhdGUgPT09IFwiSU5JVElBTFwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2luZ0Vycm9yKFBhcnNpbmdFcnJvci5FcnJvcnMuQmFkU2lnbmF0dXJlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2goZSkge1xyXG4gICAgICAgICAgICBzZWxmLnJlcG9ydE9yVGhyb3dFcnJvcihlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VsZi5vbmZsdXNoICYmIHNlbGYub25mbHVzaCgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgV2ViVlRUOyIsIi8qKlxyXG4gKiBDb3B5cmlnaHQgMjAxMyB2dHQuanMgQ29udHJpYnV0b3JzXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5sZXQgVlRUUmVnaW9uID0gXCJcIjtcclxuXHJcbnZhciBzY3JvbGxTZXR0aW5nID0ge1xyXG4gICAgXCJcIjogdHJ1ZSxcclxuICAgIFwidXBcIjogdHJ1ZVxyXG59O1xyXG5cclxuZnVuY3Rpb24gZmluZFNjcm9sbFNldHRpbmcodmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB2YXIgc2Nyb2xsID0gc2Nyb2xsU2V0dGluZ1t2YWx1ZS50b0xvd2VyQ2FzZSgpXTtcclxuICAgIHJldHVybiBzY3JvbGwgPyB2YWx1ZS50b0xvd2VyQ2FzZSgpIDogZmFsc2U7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzVmFsaWRQZXJjZW50VmFsdWUodmFsdWUpIHtcclxuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIgJiYgKHZhbHVlID49IDAgJiYgdmFsdWUgPD0gMTAwKTtcclxufVxyXG5cclxuLy8gVlRUUmVnaW9uIHNoaW0gaHR0cDovL2Rldi53My5vcmcvaHRtbDUvd2VidnR0LyN2dHRyZWdpb24taW50ZXJmYWNlXHJcblZUVFJlZ2lvbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIF93aWR0aCA9IDEwMDtcclxuICAgIHZhciBfbGluZXMgPSAzO1xyXG4gICAgdmFyIF9yZWdpb25BbmNob3JYID0gMDtcclxuICAgIHZhciBfcmVnaW9uQW5jaG9yWSA9IDEwMDtcclxuICAgIHZhciBfdmlld3BvcnRBbmNob3JYID0gMDtcclxuICAgIHZhciBfdmlld3BvcnRBbmNob3JZID0gMTAwO1xyXG4gICAgdmFyIF9zY3JvbGwgPSBcIlwiO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcclxuICAgICAgICBcIndpZHRoXCI6IHtcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfd2lkdGg7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICghaXNWYWxpZFBlcmNlbnRWYWx1ZSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJXaWR0aCBtdXN0IGJlIGJldHdlZW4gMCBhbmQgMTAwLlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF93aWR0aCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImxpbmVzXCI6IHtcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfbGluZXM7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiTGluZXMgbXVzdCBiZSBzZXQgdG8gYSBudW1iZXIuXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgX2xpbmVzID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicmVnaW9uQW5jaG9yWVwiOiB7XHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3JlZ2lvbkFuY2hvclk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICghaXNWYWxpZFBlcmNlbnRWYWx1ZSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJSZWdpb25BbmNob3JYIG11c3QgYmUgYmV0d2VlbiAwIGFuZCAxMDAuXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgX3JlZ2lvbkFuY2hvclkgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJyZWdpb25BbmNob3JYXCI6IHtcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfcmVnaW9uQW5jaG9yWDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYoIWlzVmFsaWRQZXJjZW50VmFsdWUodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUmVnaW9uQW5jaG9yWSBtdXN0IGJlIGJldHdlZW4gMCBhbmQgMTAwLlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF9yZWdpb25BbmNob3JYID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidmlld3BvcnRBbmNob3JZXCI6IHtcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfdmlld3BvcnRBbmNob3JZO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzVmFsaWRQZXJjZW50VmFsdWUodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVmlld3BvcnRBbmNob3JZIG11c3QgYmUgYmV0d2VlbiAwIGFuZCAxMDAuXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgX3ZpZXdwb3J0QW5jaG9yWSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInZpZXdwb3J0QW5jaG9yWFwiOiB7XHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3ZpZXdwb3J0QW5jaG9yWDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc1ZhbGlkUGVyY2VudFZhbHVlKHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlZpZXdwb3J0QW5jaG9yWCBtdXN0IGJlIGJldHdlZW4gMCBhbmQgMTAwLlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF92aWV3cG9ydEFuY2hvclggPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJzY3JvbGxcIjoge1xyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9zY3JvbGw7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzZXR0aW5nID0gZmluZFNjcm9sbFNldHRpbmcodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgLy8gSGF2ZSB0byBjaGVjayBmb3IgZmFsc2UgYXMgYW4gZW1wdHkgc3RyaW5nIGlzIGEgbGVnYWwgdmFsdWUuXHJcbiAgICAgICAgICAgICAgICBpZiAoc2V0dGluZyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJBbiBpbnZhbGlkIG9yIGlsbGVnYWwgc3RyaW5nIHdhcyBzcGVjaWZpZWQuXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgX3Njcm9sbCA9IHNldHRpbmc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgVlRUUmVnaW9uOyJdLCJzb3VyY2VSb290IjoiIn0=