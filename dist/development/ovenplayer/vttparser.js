/*! OvenPlayer | (c) 2021 AirenSoft Co., Ltd. | MIT license (https://github.com/AirenSoft/OvenPlayerPrivate/blob/master/LICENSE) | Github : https://github.com/AirenSoft/OvenPlayer */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2NhcHRpb24vcGFyc2VyL1Z0dFBhcnNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvY2FwdGlvbnMvdnR0UmVnaW9uLmpzIl0sIm5hbWVzIjpbIldlYlZUVCIsIm1ha2VDb2xvclNldCIsImNvbG9yIiwib3BhY2l0eSIsInVuZGVmaW5lZCIsInBhcnNlSW50Iiwic3Vic3RyaW5nIiwiam9pbiIsIldlYlZUVFByZWZzIiwiZm9udFNjYWxlIiwib2JzZXJ2ZSIsInN1YmplY3QiLCJ0b3BpYyIsImRhdGEiLCJmb250Q29sb3IiLCJTZXJ2aWNlcyIsInByZWZzIiwiZ2V0Q2hhclByZWYiLCJmb250T3BhY2l0eSIsImdldEludFByZWYiLCJXZWJWVFRTZXQiLCJmb250U2V0IiwiYmFja2dyb3VuZENvbG9yIiwiYmFja2dyb3VuZE9wYWNpdHkiLCJiYWNrZ3JvdW5kU2V0IiwiZWRnZVR5cGVMaXN0IiwiZWRnZVR5cGUiLCJlZGdlQ29sb3IiLCJlZGdlU2V0IiwiZm9yRWFjaCIsInByZWYiLCJhZGRPYnNlcnZlciIsIl9vYmpDcmVhdGUiLCJPYmplY3QiLCJjcmVhdGUiLCJGIiwibyIsImFyZ3VtZW50cyIsImxlbmd0aCIsIkVycm9yIiwicHJvdG90eXBlIiwiUGFyc2luZ0Vycm9yIiwiZXJyb3JEYXRhIiwibWVzc2FnZSIsIm5hbWUiLCJjb2RlIiwiY29uc3RydWN0b3IiLCJFcnJvcnMiLCJCYWRTaWduYXR1cmUiLCJCYWRUaW1lU3RhbXAiLCJwYXJzZVRpbWVTdGFtcCIsImlucHV0IiwiY29tcHV0ZVNlY29uZHMiLCJoIiwibSIsInMiLCJmIiwibWF0Y2giLCJyZXBsYWNlIiwiU2V0dGluZ3MiLCJ2YWx1ZXMiLCJzZXQiLCJrIiwidiIsImdldCIsImRmbHQiLCJkZWZhdWx0S2V5IiwiaGFzIiwiYWx0IiwiYSIsIm4iLCJpbnRlZ2VyIiwidGVzdCIsInBlcmNlbnQiLCJwYXJzZUZsb2F0IiwicGFyc2VPcHRpb25zIiwiY2FsbGJhY2siLCJrZXlWYWx1ZURlbGltIiwiZ3JvdXBEZWxpbSIsImdyb3VwcyIsInNwbGl0IiwiaSIsImt2IiwicGFyc2VDdWUiLCJjdWUiLCJyZWdpb25MaXN0Iiwib0lucHV0IiwiY29uc3VtZVRpbWVTdGFtcCIsInRzIiwiY29uc3VtZUN1ZVNldHRpbmdzIiwic2V0dGluZ3MiLCJpZCIsInJlZ2lvbiIsInZhbHMiLCJ2YWxzMCIsInNraXBXaGl0ZXNwYWNlIiwic3RhcnRUaW1lIiwic3Vic3RyIiwiZW5kVGltZSIsIkVTQ0FQRSIsIlRBR19OQU1FIiwiYyIsImIiLCJ1IiwicnVieSIsInJ0IiwibGFuZyIsIlRBR19BTk5PVEFUSU9OIiwiTkVFRFNfUEFSRU5UIiwicGFyc2VDb250ZW50Iiwid2luZG93IiwibmV4dFRva2VuIiwiY29uc3VtZSIsInJlc3VsdCIsInVuZXNjYXBlMSIsImUiLCJ1bmVzY2FwZSIsInNob3VsZEFkZCIsImN1cnJlbnQiLCJlbGVtZW50IiwibG9jYWxOYW1lIiwiY3JlYXRlRWxlbWVudCIsInR5cGUiLCJhbm5vdGF0aW9uIiwidGFnTmFtZSIsImRvY3VtZW50IiwidHJpbSIsInJvb3REaXYiLCJ0IiwidGFnU3RhY2siLCJwb3AiLCJwYXJlbnROb2RlIiwibm9kZSIsImNyZWF0ZVByb2Nlc3NpbmdJbnN0cnVjdGlvbiIsImFwcGVuZENoaWxkIiwiY2xhc3NOYW1lIiwicHVzaCIsImNyZWF0ZVRleHROb2RlIiwic3Ryb25nUlRMQ2hhcnMiLCJkZXRlcm1pbmVCaWRpIiwiY3VlRGl2Iiwibm9kZVN0YWNrIiwidGV4dCIsImNoYXJDb2RlIiwiY2hpbGROb2RlcyIsInB1c2hOb2RlcyIsIm5leHRUZXh0Tm9kZSIsInRleHRDb250ZW50IiwiaW5uZXJUZXh0IiwiY2hhckNvZGVBdCIsImoiLCJjb21wdXRlTGluZVBvcyIsImxpbmUiLCJzbmFwVG9MaW5lcyIsInRyYWNrIiwidGV4dFRyYWNrTGlzdCIsIm1lZGlhRWxlbWVudCIsInRyYWNrTGlzdCIsImNvdW50IiwibW9kZSIsIlN0eWxlQm94IiwiYXBwbHlTdHlsZXMiLCJzdHlsZXMiLCJkaXYiLCJwcm9wIiwiaGFzT3duUHJvcGVydHkiLCJzdHlsZSIsImZvcm1hdFN0eWxlIiwidmFsIiwidW5pdCIsIkN1ZVN0eWxlQm94Iiwic3R5bGVPcHRpb25zIiwiaXNJRTgiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJ0ZXh0U2hhZG93IiwiY2FsbCIsInBvc2l0aW9uIiwibGVmdCIsInJpZ2h0IiwidG9wIiwiYm90dG9tIiwiZGlzcGxheSIsIndyaXRpbmdNb2RlIiwidmVydGljYWwiLCJ1bmljb2RlQmlkaSIsInRleHRBbGlnbiIsImFsaWduIiwiZm9udCIsIndoaXRlU3BhY2UiLCJkaXJlY3Rpb24iLCJzdHlsZXN1bmljb2RlQmlkaSIsInRleHRQb3MiLCJwb3NpdGlvbkFsaWduIiwic2l6ZSIsIndpZHRoIiwiaGVpZ2h0IiwibW92ZSIsImJveCIsIkJveFBvc2l0aW9uIiwib2JqIiwibGgiLCJvZmZzZXRIZWlnaHQiLCJvZmZzZXRXaWR0aCIsIm9mZnNldFRvcCIsInJlY3RzIiwiZ2V0Q2xpZW50UmVjdHMiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJNYXRoIiwibWF4IiwibGluZUhlaWdodCIsImF4aXMiLCJ0b01vdmUiLCJvdmVybGFwcyIsImIyIiwib3ZlcmxhcHNBbnkiLCJib3hlcyIsIndpdGhpbiIsImNvbnRhaW5lciIsIm92ZXJsYXBzT3Bwb3NpdGVBeGlzIiwiaW50ZXJzZWN0UGVyY2VudGFnZSIsIngiLCJtaW4iLCJ5IiwiaW50ZXJzZWN0QXJlYSIsInRvQ1NTQ29tcGF0VmFsdWVzIiwicmVmZXJlbmNlIiwiZ2V0U2ltcGxlQm94UG9zaXRpb24iLCJyZXQiLCJtb3ZlQm94VG9MaW5lUG9zaXRpb24iLCJzdHlsZUJveCIsImNvbnRhaW5lckJveCIsImJveFBvc2l0aW9ucyIsImZpbmRCZXN0UG9zaXRpb24iLCJiZXN0UG9zaXRpb24iLCJzcGVjaWZpZWRQb3NpdGlvbiIsInBlcmNlbnRhZ2UiLCJwIiwiYm94UG9zaXRpb24iLCJsaW5lUG9zIiwic3RlcCIsInJvdW5kIiwibWF4UG9zaXRpb24iLCJpbml0aWFsQXhpcyIsImFicyIsImNlaWwiLCJyZXZlcnNlIiwiY2FsY3VsYXRlZFBlcmNlbnRhZ2UiLCJsaW5lQWxpZ24iLCJTdHJpbmdEZWNvZGVyIiwiZGVjb2RlIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiY29udmVydEN1ZVRvRE9NVHJlZSIsImN1ZXRleHQiLCJGT05UX1NJWkVfUEVSQ0VOVCIsIkZPTlRfU1RZTEUiLCJDVUVfQkFDS0dST1VORF9QQURESU5HIiwicHJvY2Vzc0N1ZXMiLCJjdWVzIiwib3ZlcmxheSIsImZpcnN0Q2hpbGQiLCJyZW1vdmVDaGlsZCIsInBhZGRlZE92ZXJsYXkiLCJtYXJnaW4iLCJzaG91bGRDb21wdXRlIiwiaGFzQmVlblJlc2V0IiwiZGlzcGxheVN0YXRlIiwiZm9udFNpemUiLCJQYXJzZXIiLCJkZWNvZGVyIiwic3RhdGUiLCJidWZmZXIiLCJUZXh0RGVjb2RlciIsInJlcG9ydE9yVGhyb3dFcnJvciIsIm9ucGFyc2luZ2Vycm9yIiwicGFyc2UiLCJmbHVzaGluZyIsInNlbGYiLCJzdHJlYW0iLCJjb2xsZWN0TmV4dExpbmUiLCJwb3MiLCJwYXJzZVJlZ2lvbiIsInh5IiwiYW5jaG9yIiwiVlRUUmVnaW9uIiwibGluZXMiLCJyZWdpb25BbmNob3JYIiwicmVnaW9uQW5jaG9yWSIsInZpZXdwb3J0QW5jaG9yWCIsInZpZXdwb3J0QW5jaG9yWSIsInNjcm9sbCIsIm9ucmVnaW9uIiwicGFyc2VIZWFkZXIiLCJhbHJlYWR5Q29sbGVjdGVkTGluZSIsIlZUVEN1ZSIsImluZGV4T2YiLCJoYXNTdWJzdHJpbmciLCJvbmN1ZSIsImZsdXNoIiwib25mbHVzaCIsInNjcm9sbFNldHRpbmciLCJmaW5kU2Nyb2xsU2V0dGluZyIsInZhbHVlIiwidG9Mb3dlckNhc2UiLCJpc1ZhbGlkUGVyY2VudFZhbHVlIiwiX3dpZHRoIiwiX2xpbmVzIiwiX3JlZ2lvbkFuY2hvclgiLCJfcmVnaW9uQW5jaG9yWSIsIl92aWV3cG9ydEFuY2hvclgiLCJfdmlld3BvcnRBbmNob3JZIiwiX3Njcm9sbCIsImRlZmluZVByb3BlcnRpZXMiLCJlbnVtZXJhYmxlIiwiVHlwZUVycm9yIiwic2V0dGluZyIsIlN5bnRheEVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBO0FBQ0E7O0FBckJBO0FBdUJBLElBQUlBLFNBQVMsU0FBVEEsTUFBUyxHQUFVLENBQUUsQ0FBekI7QUFDQSxTQUFTQyxZQUFULENBQXNCQyxLQUF0QixFQUE2QkMsT0FBN0IsRUFBc0M7QUFDbEMsUUFBR0EsWUFBWUMsU0FBZixFQUEwQjtBQUN0QkQsa0JBQVUsQ0FBVjtBQUNIO0FBQ0QsV0FBTyxVQUFVLENBQUNFLFNBQVNILE1BQU1JLFNBQU4sQ0FBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsQ0FBVCxFQUFnQyxFQUFoQyxDQUFELEVBQ1RELFNBQVNILE1BQU1JLFNBQU4sQ0FBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsQ0FBVCxFQUFnQyxFQUFoQyxDQURTLEVBRVRELFNBQVNILE1BQU1JLFNBQU4sQ0FBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsQ0FBVCxFQUFnQyxFQUFoQyxDQUZTLEVBR1RILE9BSFMsRUFHQUksSUFIQSxDQUdLLEdBSEwsQ0FBVixHQUdzQixHQUg3QjtBQUlIOztBQUVELElBQUlDLGNBQWMsQ0FBQyxtQkFBRCxFQUFzQixxQkFBdEIsRUFBNkMsbUJBQTdDLEVBQ2QsaUJBRGMsRUFDSyxtQkFETCxFQUVkLG1CQUZjLEVBRU8sa0JBRlAsQ0FBbEI7O0FBSUEsSUFBSUMsWUFBWSxDQUFoQjs7QUFFQSxTQUFTQyxPQUFULENBQWlCQyxPQUFqQixFQUEwQkMsS0FBMUIsRUFBaUNDLElBQWpDLEVBQXVDO0FBQ25DLFlBQVFBLElBQVI7QUFDSSxhQUFLLG1CQUFMO0FBQ0EsYUFBSyxxQkFBTDtBQUNJLGdC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cyAtIHYwLjEyLjEgKGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL3Z0dC5qcykgYnVpbHQgb24gMDMtMTItMjAxNSAqL1xyXG5pbXBvcnQgVlRUQ3VlIGZyb20gJ3V0aWxzL2NhcHRpb25zL3Z0dEN1ZSc7XHJcbmltcG9ydCBWVFRSZWdpb24gZnJvbSAndXRpbHMvY2FwdGlvbnMvdnR0UmVnaW9uJztcclxuXHJcbi8qKlxyXG4gKiBDb3B5cmlnaHQgMjAxMyB2dHQuanMgQ29udHJpYnV0b3JzXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG4vKiAtKi0gTW9kZTogSmF2YTsgdGFiLXdpZHRoOiAyOyBpbmRlbnQtdGFicy1tb2RlOiBuaWw7IGMtYmFzaWMtb2Zmc2V0OiAyIC0qLSAqL1xyXG4vKiB2aW06IHNldCBzaGlmdHdpZHRoPTIgdGFic3RvcD0yIGF1dG9pbmRlbnQgY2luZGVudCBleHBhbmR0YWI6ICovXHJcblxyXG5sZXQgV2ViVlRUID0gZnVuY3Rpb24oKXt9O1xyXG5mdW5jdGlvbiBtYWtlQ29sb3JTZXQoY29sb3IsIG9wYWNpdHkpIHtcclxuICAgIGlmKG9wYWNpdHkgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIG9wYWNpdHkgPSAxO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFwicmdiYShcIiArIFtwYXJzZUludChjb2xvci5zdWJzdHJpbmcoMCwgMiksIDE2KSxcclxuICAgICAgICAgICAgcGFyc2VJbnQoY29sb3Iuc3Vic3RyaW5nKDIsIDQpLCAxNiksXHJcbiAgICAgICAgICAgIHBhcnNlSW50KGNvbG9yLnN1YnN0cmluZyg0LCA2KSwgMTYpLFxyXG4gICAgICAgICAgICBvcGFjaXR5XS5qb2luKFwiLFwiKSArIFwiKVwiO1xyXG59XHJcblxyXG52YXIgV2ViVlRUUHJlZnMgPSBbJ3dlYnZ0dC5mb250LmNvbG9yJywgJ3dlYnZ0dC5mb250Lm9wYWNpdHknLCAnd2VidnR0LmZvbnQuc2NhbGUnLFxyXG4gICAgJ3dlYnZ0dC5iZy5jb2xvcicsICd3ZWJ2dHQuYmcub3BhY2l0eScsXHJcbiAgICAnd2VidnR0LmVkZ2UuY29sb3InLCAnd2VidnR0LmVkZ2UudHlwZSddO1xyXG5cclxudmFyIGZvbnRTY2FsZSA9IDE7XHJcblxyXG5mdW5jdGlvbiBvYnNlcnZlKHN1YmplY3QsIHRvcGljLCBkYXRhKSB7XHJcbiAgICBzd2l0Y2ggKGRhdGEpIHtcclxuICAgICAgICBjYXNlIFwid2VidnR0LmZvbnQuY29sb3JcIjpcclxuICAgICAgICBjYXNlIFwid2VidnR0LmZvbnQub3BhY2l0eVwiOlxyXG4gICAgICAgICAgICB2YXIgZm9udENvbG9yID0gU2VydmljZXMucHJlZnMuZ2V0Q2hhclByZWYoXCJ3ZWJ2dHQuZm9udC5jb2xvclwiKTtcclxuICAgICAgICAgICAgdmFyIGZvbnRPcGFjaXR5ID0gU2VydmljZXMucHJlZnMuZ2V0SW50UHJlZihcIndlYnZ0dC5mb250Lm9wYWNpdHlcIikgLyAxMDA7XHJcbiAgICAgICAgICAgIFdlYlZUVFNldC5mb250U2V0ID0gbWFrZUNvbG9yU2V0KGZvbnRDb2xvciwgZm9udE9wYWNpdHkpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwid2VidnR0LmZvbnQuc2NhbGVcIjpcclxuICAgICAgICAgICAgZm9udFNjYWxlID0gU2VydmljZXMucHJlZnMuZ2V0SW50UHJlZihcIndlYnZ0dC5mb250LnNjYWxlXCIpIC8gMTAwO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwid2VidnR0LmJnLmNvbG9yXCI6XHJcbiAgICAgICAgY2FzZSBcIndlYnZ0dC5iZy5vcGFjaXR5XCI6XHJcbiAgICAgICAgICAgIHZhciBiYWNrZ3JvdW5kQ29sb3IgPSBTZXJ2aWNlcy5wcmVmcy5nZXRDaGFyUHJlZihcIndlYnZ0dC5iZy5jb2xvclwiKTtcclxuICAgICAgICAgICAgdmFyIGJhY2tncm91bmRPcGFjaXR5ID0gU2VydmljZXMucHJlZnMuZ2V0SW50UHJlZihcIndlYnZ0dC5iZy5vcGFjaXR5XCIpIC8gMTAwO1xyXG4gICAgICAgICAgICBXZWJWVFRTZXQuYmFja2dyb3VuZFNldCA9IG1ha2VDb2xvclNldChiYWNrZ3JvdW5kQ29sb3IsIGJhY2tncm91bmRPcGFjaXR5KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcIndlYnZ0dC5lZGdlLmNvbG9yXCI6XHJcbiAgICAgICAgY2FzZSBcIndlYnZ0dC5lZGdlLnR5cGVcIjpcclxuICAgICAgICAgICAgdmFyIGVkZ2VUeXBlTGlzdCA9IFtcIlwiLCBcIjBweCAwcHggXCIsIFwiNHB4IDRweCA0cHggXCIsIFwiLTJweCAtMnB4IFwiLCBcIjJweCAycHggXCJdO1xyXG4gICAgICAgICAgICB2YXIgZWRnZVR5cGUgPSBTZXJ2aWNlcy5wcmVmcy5nZXRJbnRQcmVmKFwid2VidnR0LmVkZ2UudHlwZVwiKTtcclxuICAgICAgICAgICAgdmFyIGVkZ2VDb2xvciA9IFNlcnZpY2VzLnByZWZzLmdldENoYXJQcmVmKFwid2VidnR0LmVkZ2UuY29sb3JcIik7XHJcbiAgICAgICAgICAgIFdlYlZUVFNldC5lZGdlU2V0ID0gZWRnZVR5cGVMaXN0W2VkZ2VUeXBlXSArIG1ha2VDb2xvclNldChlZGdlQ29sb3IpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxufVxyXG5cclxuaWYodHlwZW9mIFNlcnZpY2VzICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICB2YXIgV2ViVlRUU2V0ID0ge307XHJcbiAgICBXZWJWVFRQcmVmcy5mb3JFYWNoKGZ1bmN0aW9uIChwcmVmKSB7XHJcbiAgICAgICAgb2JzZXJ2ZSh1bmRlZmluZWQsIHVuZGVmaW5lZCwgcHJlZik7XHJcbiAgICAgICAgU2VydmljZXMucHJlZnMuYWRkT2JzZXJ2ZXIocHJlZiwgb2JzZXJ2ZSwgZmFsc2UpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbnZhciBfb2JqQ3JlYXRlID0gT2JqZWN0LmNyZWF0ZSB8fCAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gRigpIHt9XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKG8pIHtcclxuICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggIT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignT2JqZWN0LmNyZWF0ZSBzaGltIG9ubHkgYWNjZXB0cyBvbmUgcGFyYW1ldGVyLicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEYucHJvdG90eXBlID0gbztcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBGKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH0pKCk7XHJcblxyXG4vLyBDcmVhdGVzIGEgbmV3IFBhcnNlckVycm9yIG9iamVjdCBmcm9tIGFuIGVycm9yRGF0YSBvYmplY3QuIFRoZSBlcnJvckRhdGFcclxuLy8gb2JqZWN0IHNob3VsZCBoYXZlIGRlZmF1bHQgY29kZSBhbmQgbWVzc2FnZSBwcm9wZXJ0aWVzLiBUaGUgZGVmYXVsdCBtZXNzYWdlXHJcbi8vIHByb3BlcnR5IGNhbiBiZSBvdmVycmlkZW4gYnkgcGFzc2luZyBpbiBhIG1lc3NhZ2UgcGFyYW1ldGVyLlxyXG4vLyBTZWUgUGFyc2luZ0Vycm9yLkVycm9ycyBiZWxvdyBmb3IgYWNjZXB0YWJsZSBlcnJvcnMuXHJcbmZ1bmN0aW9uIFBhcnNpbmdFcnJvcihlcnJvckRhdGEsIG1lc3NhZ2UpIHtcclxuICAgIHRoaXMubmFtZSA9IFwiUGFyc2luZ0Vycm9yXCI7XHJcbiAgICB0aGlzLmNvZGUgPSBlcnJvckRhdGEuY29kZTtcclxuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2UgfHwgZXJyb3JEYXRhLm1lc3NhZ2U7XHJcbn1cclxuUGFyc2luZ0Vycm9yLnByb3RvdHlwZSA9IF9vYmpDcmVhdGUoRXJyb3IucHJvdG90eXBlKTtcclxuUGFyc2luZ0Vycm9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFBhcnNpbmdFcnJvcjtcclxuXHJcbi8vIFBhcnNpbmdFcnJvciBtZXRhZGF0YSBmb3IgYWNjZXB0YWJsZSBQYXJzaW5nRXJyb3JzLlxyXG5QYXJzaW5nRXJyb3IuRXJyb3JzID0ge1xyXG4gICAgQmFkU2lnbmF0dXJlOiB7XHJcbiAgICAgICAgY29kZTogMCxcclxuICAgICAgICBtZXNzYWdlOiBcIk1hbGZvcm1lZCBXZWJWVFQgc2lnbmF0dXJlLlwiXHJcbiAgICB9LFxyXG4gICAgQmFkVGltZVN0YW1wOiB7XHJcbiAgICAgICAgY29kZTogMSxcclxuICAgICAgICBtZXNzYWdlOiBcIk1hbGZvcm1lZCB0aW1lIHN0YW1wLlwiXHJcbiAgICB9XHJcbn07XHJcblxyXG4vLyBUcnkgdG8gcGFyc2UgaW5wdXQgYXMgYSB0aW1lIHN0YW1wLlxyXG5mdW5jdGlvbiBwYXJzZVRpbWVTdGFtcChpbnB1dCkge1xyXG5cclxuICAgIGZ1bmN0aW9uIGNvbXB1dGVTZWNvbmRzKGgsIG0sIHMsIGYpIHtcclxuICAgICAgICByZXR1cm4gKGggfCAwKSAqIDM2MDAgKyAobSB8IDApICogNjAgKyAocyB8IDApICsgKGYgfCAwKSAvIDEwMDA7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG0gPSBpbnB1dC5tYXRjaCgvXihcXGQrKTooXFxkezJ9KSg6XFxkezJ9KT9cXC4oXFxkezN9KS8pO1xyXG4gICAgaWYgKCFtKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG1bM10pIHtcclxuICAgICAgICAvLyBUaW1lc3RhbXAgdGFrZXMgdGhlIGZvcm0gb2YgW2hvdXJzXTpbbWludXRlc106W3NlY29uZHNdLlttaWxsaXNlY29uZHNdXHJcbiAgICAgICAgcmV0dXJuIGNvbXB1dGVTZWNvbmRzKG1bMV0sIG1bMl0sIG1bM10ucmVwbGFjZShcIjpcIiwgXCJcIiksIG1bNF0pO1xyXG4gICAgfSBlbHNlIGlmIChtWzFdID4gNTkpIHtcclxuICAgICAgICAvLyBUaW1lc3RhbXAgdGFrZXMgdGhlIGZvcm0gb2YgW2hvdXJzXTpbbWludXRlc10uW21pbGxpc2Vjb25kc11cclxuICAgICAgICAvLyBGaXJzdCBwb3NpdGlvbiBpcyBob3VycyBhcyBpdCdzIG92ZXIgNTkuXHJcbiAgICAgICAgcmV0dXJuIGNvbXB1dGVTZWNvbmRzKG1bMV0sIG1bMl0sIDAsICBtWzRdKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gVGltZXN0YW1wIHRha2VzIHRoZSBmb3JtIG9mIFttaW51dGVzXTpbc2Vjb25kc10uW21pbGxpc2Vjb25kc11cclxuICAgICAgICByZXR1cm4gY29tcHV0ZVNlY29uZHMoMCwgbVsxXSwgbVsyXSwgbVs0XSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIEEgc2V0dGluZ3Mgb2JqZWN0IGhvbGRzIGtleS92YWx1ZSBwYWlycyBhbmQgd2lsbCBpZ25vcmUgYW55dGhpbmcgYnV0IHRoZSBmaXJzdFxyXG4vLyBhc3NpZ25tZW50IHRvIGEgc3BlY2lmaWMga2V5LlxyXG5mdW5jdGlvbiBTZXR0aW5ncygpIHtcclxuICAgIHRoaXMudmFsdWVzID0gX29iakNyZWF0ZShudWxsKTtcclxufVxyXG5cclxuU2V0dGluZ3MucHJvdG90eXBlID0ge1xyXG4gICAgLy8gT25seSBhY2NlcHQgdGhlIGZpcnN0IGFzc2lnbm1lbnQgdG8gYW55IGtleS5cclxuICAgIHNldDogZnVuY3Rpb24oaywgdikge1xyXG4gICAgICAgIGlmICghdGhpcy5nZXQoaykgJiYgdiAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlc1trXSA9IHY7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vIFJldHVybiB0aGUgdmFsdWUgZm9yIGEga2V5LCBvciBhIGRlZmF1bHQgdmFsdWUuXHJcbiAgICAvLyBJZiAnZGVmYXVsdEtleScgaXMgcGFzc2VkIHRoZW4gJ2RmbHQnIGlzIGFzc3VtZWQgdG8gYmUgYW4gb2JqZWN0IHdpdGhcclxuICAgIC8vIGEgbnVtYmVyIG9mIHBvc3NpYmxlIGRlZmF1bHQgdmFsdWVzIGFzIHByb3BlcnRpZXMgd2hlcmUgJ2RlZmF1bHRLZXknIGlzXHJcbiAgICAvLyB0aGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0aGF0IHdpbGwgYmUgY2hvc2VuOyBvdGhlcndpc2UgaXQncyBhc3N1bWVkIHRvIGJlXHJcbiAgICAvLyBhIHNpbmdsZSB2YWx1ZS5cclxuICAgIGdldDogZnVuY3Rpb24oaywgZGZsdCwgZGVmYXVsdEtleSkge1xyXG4gICAgICAgIGlmIChkZWZhdWx0S2V5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhhcyhrKSA/IHRoaXMudmFsdWVzW2tdIDogZGZsdFtkZWZhdWx0S2V5XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzKGspID8gdGhpcy52YWx1ZXNba10gOiBkZmx0O1xyXG4gICAgfSxcclxuICAgIC8vIENoZWNrIHdoZXRoZXIgd2UgaGF2ZSBhIHZhbHVlIGZvciBhIGtleS5cclxuICAgIGhhczogZnVuY3Rpb24oaykge1xyXG4gICAgICAgIHJldHVybiBrIGluIHRoaXMudmFsdWVzO1xyXG4gICAgfSxcclxuICAgIC8vIEFjY2VwdCBhIHNldHRpbmcgaWYgaXRzIG9uZSBvZiB0aGUgZ2l2ZW4gYWx0ZXJuYXRpdmVzLlxyXG4gICAgYWx0OiBmdW5jdGlvbihrLCB2LCBhKSB7XHJcbiAgICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCBhLmxlbmd0aDsgKytuKSB7XHJcbiAgICAgICAgICAgIGlmICh2ID09PSBhW25dKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldChrLCB2KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vIEFjY2VwdCBhIHNldHRpbmcgaWYgaXRzIGEgdmFsaWQgKHNpZ25lZCkgaW50ZWdlci5cclxuICAgIGludGVnZXI6IGZ1bmN0aW9uKGssIHYpIHtcclxuICAgICAgICBpZiAoL14tP1xcZCskLy50ZXN0KHYpKSB7IC8vIGludGVnZXJcclxuICAgICAgICAgICAgdGhpcy5zZXQoaywgcGFyc2VJbnQodiwgMTApKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy8gQWNjZXB0IGEgc2V0dGluZyBpZiBpdHMgYSB2YWxpZCBwZXJjZW50YWdlLlxyXG4gICAgcGVyY2VudDogZnVuY3Rpb24oaywgdikge1xyXG4gICAgICAgIHZhciBtO1xyXG4gICAgICAgIGlmICgobSA9IHYubWF0Y2goL14oW1xcZF17MSwzfSkoXFwuW1xcZF0qKT8lJC8pKSkge1xyXG4gICAgICAgICAgICB2ID0gcGFyc2VGbG9hdCh2KTtcclxuICAgICAgICAgICAgaWYgKHYgPj0gMCAmJiB2IDw9IDEwMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXQoaywgdik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vLyBIZWxwZXIgZnVuY3Rpb24gdG8gcGFyc2UgaW5wdXQgaW50byBncm91cHMgc2VwYXJhdGVkIGJ5ICdncm91cERlbGltJywgYW5kXHJcbi8vIGludGVycHJldGUgZWFjaCBncm91cCBhcyBhIGtleS92YWx1ZSBwYWlyIHNlcGFyYXRlZCBieSAna2V5VmFsdWVEZWxpbScuXHJcbmZ1bmN0aW9uIHBhcnNlT3B0aW9ucyhpbnB1dCwgY2FsbGJhY2ssIGtleVZhbHVlRGVsaW0sIGdyb3VwRGVsaW0pIHtcclxuICAgIHZhciBncm91cHMgPSBncm91cERlbGltID8gaW5wdXQuc3BsaXQoZ3JvdXBEZWxpbSkgOiBbaW5wdXRdO1xyXG4gICAgZm9yICh2YXIgaSBpbiBncm91cHMpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGdyb3Vwc1tpXSAhPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGt2ID0gZ3JvdXBzW2ldLnNwbGl0KGtleVZhbHVlRGVsaW0pO1xyXG4gICAgICAgIGlmIChrdi5sZW5ndGggIT09IDIpIHtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBrID0ga3ZbMF07XHJcbiAgICAgICAgdmFyIHYgPSBrdlsxXTtcclxuICAgICAgICBjYWxsYmFjayhrLCB2KTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcGFyc2VDdWUoaW5wdXQsIGN1ZSwgcmVnaW9uTGlzdCkge1xyXG4gICAgLy8gUmVtZW1iZXIgdGhlIG9yaWdpbmFsIGlucHV0IGlmIHdlIG5lZWQgdG8gdGhyb3cgYW4gZXJyb3IuXHJcbiAgICB2YXIgb0lucHV0ID0gaW5wdXQ7XHJcbiAgICAvLyA0LjEgV2ViVlRUIHRpbWVzdGFtcFxyXG4gICAgZnVuY3Rpb24gY29uc3VtZVRpbWVTdGFtcCgpIHtcclxuICAgICAgICB2YXIgdHMgPSBwYXJzZVRpbWVTdGFtcChpbnB1dCk7XHJcbiAgICAgICAgaWYgKHRzID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBQYXJzaW5nRXJyb3IoUGFyc2luZ0Vycm9yLkVycm9ycy5CYWRUaW1lU3RhbXAsXHJcbiAgICAgICAgICAgICAgICBcIk1hbGZvcm1lZCB0aW1lc3RhbXA6IFwiICsgb0lucHV0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gUmVtb3ZlIHRpbWUgc3RhbXAgZnJvbSBpbnB1dC5cclxuICAgICAgICBpbnB1dCA9IGlucHV0LnJlcGxhY2UoL15bXlxcc2EtekEtWi1dKy8sIFwiXCIpO1xyXG4gICAgICAgIHJldHVybiB0cztcclxuICAgIH1cclxuXHJcbiAgICAvLyA0LjQuMiBXZWJWVFQgY3VlIHNldHRpbmdzXHJcbiAgICBmdW5jdGlvbiBjb25zdW1lQ3VlU2V0dGluZ3MoaW5wdXQsIGN1ZSkge1xyXG4gICAgICAgIHZhciBzZXR0aW5ncyA9IG5ldyBTZXR0aW5ncygpO1xyXG5cclxuICAgICAgICBwYXJzZU9wdGlvbnMoaW5wdXQsIGZ1bmN0aW9uIChrLCB2KSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoaykge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInJlZ2lvblwiOlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEZpbmQgdGhlIGxhc3QgcmVnaW9uIHdlIHBhcnNlZCB3aXRoIHRoZSBzYW1lIHJlZ2lvbiBpZC5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gcmVnaW9uTGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVnaW9uTGlzdFtpXS5pZCA9PT0gdikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3Muc2V0KGssIHJlZ2lvbkxpc3RbaV0ucmVnaW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInZlcnRpY2FsXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuYWx0KGssIHYsIFtcInJsXCIsIFwibHJcIl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImxpbmVcIjpcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFscyA9IHYuc3BsaXQoXCIsXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxzMCA9IHZhbHNbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuaW50ZWdlcihrLCB2YWxzMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MucGVyY2VudChrLCB2YWxzMCkgPyBzZXR0aW5ncy5zZXQoXCJzbmFwVG9MaW5lc1wiLCBmYWxzZSkgOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLmFsdChrLCB2YWxzMCwgW1wiYXV0b1wiXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHMubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLmFsdChcImxpbmVBbGlnblwiLCB2YWxzWzFdLCBbXCJzdGFydFwiLCBcIm1pZGRsZVwiLCBcImVuZFwiXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInBvc2l0aW9uXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgdmFscyA9IHYuc3BsaXQoXCIsXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLnBlcmNlbnQoaywgdmFsc1swXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHMubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLmFsdChcInBvc2l0aW9uQWxpZ25cIiwgdmFsc1sxXSwgW1wic3RhcnRcIiwgXCJtaWRkbGVcIiwgXCJlbmRcIl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJzaXplXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MucGVyY2VudChrLCB2KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJhbGlnblwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLmFsdChrLCB2LCBbXCJzdGFydFwiLCBcIm1pZGRsZVwiLCBcImVuZFwiLCBcImxlZnRcIiwgXCJyaWdodFwiXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAvOi8sIC9cXHMvKTtcclxuXHJcbiAgICAgICAgLy9oc2xlZSByZW1vdmUgdGhlc2UgZmllbGRzLlxyXG4gICAgICAgIC8vQmVjYXVzZSBzYWZhcmkgZGllcyBoZXJlIGFsd2F5cy4gQW5kIFBsYXllciBkb2VuJ3QgdXNlIHN0eWxlIGZpZWxkcy5cclxuICAgICAgICAvLyBBcHBseSBkZWZhdWx0IHZhbHVlcyBmb3IgYW55IG1pc3NpbmcgZmllbGRzLlxyXG4gICAgICAgIC8qY3VlLnJlZ2lvbiA9IHNldHRpbmdzLmdldChcInJlZ2lvblwiLCBudWxsKTtcclxuICAgICAgICBjdWUudmVydGljYWwgPSBzZXR0aW5ncy5nZXQoXCJ2ZXJ0aWNhbFwiLCBcIlwiKTtcclxuICAgICAgICBjdWUubGluZSA9IHNldHRpbmdzLmdldChcImxpbmVcIiwgXCJhdXRvXCIpO1xyXG4gICAgICAgIGN1ZS5saW5lQWxpZ24gPSBzZXR0aW5ncy5nZXQoXCJsaW5lQWxpZ25cIiwgXCJzdGFydFwiKTtcclxuICAgICAgICBjdWUuc25hcFRvTGluZXMgPSBzZXR0aW5ncy5nZXQoXCJzbmFwVG9MaW5lc1wiLCB0cnVlKTtcclxuICAgICAgICBjdWUuc2l6ZSA9IHNldHRpbmdzLmdldChcInNpemVcIiwgMTAwKTtcclxuICAgICAgICAvL2N1ZS5hbGlnbiA9IHNldHRpbmdzLmdldChcImFsaWduXCIsIFwibWlkZGxlXCIpO1xyXG4gICAgICAgIGN1ZS5wb3NpdGlvbiA9IHNldHRpbmdzLmdldChcInBvc2l0aW9uXCIsIFwiYXV0b1wiKTtcclxuICAgICAgICBjdWUucG9zaXRpb25BbGlnbiA9IHNldHRpbmdzLmdldChcInBvc2l0aW9uQWxpZ25cIiwge1xyXG4gICAgICAgICAgICBzdGFydDogXCJzdGFydFwiLFxyXG4gICAgICAgICAgICBsZWZ0OiBcInN0YXJ0XCIsXHJcbiAgICAgICAgICAgIG1pZGRsZTogXCJtaWRkbGVcIixcclxuICAgICAgICAgICAgZW5kOiBcImVuZFwiLFxyXG4gICAgICAgICAgICByaWdodDogXCJlbmRcIlxyXG4gICAgICAgIH0sIGN1ZS5hbGlnblxyXG4gICAgICAgICk7Ki9cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBza2lwV2hpdGVzcGFjZSgpIHtcclxuICAgICAgICBpbnB1dCA9IGlucHV0LnJlcGxhY2UoL15cXHMrLywgXCJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gNC4xIFdlYlZUVCBjdWUgdGltaW5ncy5cclxuICAgIHNraXBXaGl0ZXNwYWNlKCk7XHJcbiAgICBjdWUuc3RhcnRUaW1lID0gY29uc3VtZVRpbWVTdGFtcCgpOyAgIC8vICgxKSBjb2xsZWN0IGN1ZSBzdGFydCB0aW1lXHJcbiAgICBza2lwV2hpdGVzcGFjZSgpO1xyXG4gICAgaWYgKGlucHV0LnN1YnN0cigwLCAzKSAhPT0gXCItLT5cIikgeyAgICAgLy8gKDMpIG5leHQgY2hhcmFjdGVycyBtdXN0IG1hdGNoIFwiLS0+XCJcclxuICAgICAgICB0aHJvdyBuZXcgUGFyc2luZ0Vycm9yKFBhcnNpbmdFcnJvci5FcnJvcnMuQmFkVGltZVN0YW1wLFxyXG4gICAgICAgICAgICBcIk1hbGZvcm1lZCB0aW1lIHN0YW1wICh0aW1lIHN0YW1wcyBtdXN0IGJlIHNlcGFyYXRlZCBieSAnLS0+Jyk6IFwiICtcclxuICAgICAgICAgICAgb0lucHV0KTtcclxuICAgIH1cclxuICAgIGlucHV0ID0gaW5wdXQuc3Vic3RyKDMpO1xyXG4gICAgc2tpcFdoaXRlc3BhY2UoKTtcclxuICAgIGN1ZS5lbmRUaW1lID0gY29uc3VtZVRpbWVTdGFtcCgpOyAgICAgLy8gKDUpIGNvbGxlY3QgY3VlIGVuZCB0aW1lXHJcblxyXG4gICAgLy8gNC4xIFdlYlZUVCBjdWUgc2V0dGluZ3MgbGlzdC5cclxuICAgIHNraXBXaGl0ZXNwYWNlKCk7XHJcbiAgICBjb25zdW1lQ3VlU2V0dGluZ3MoaW5wdXQsIGN1ZSk7XHJcbn1cclxuXHJcbnZhciBFU0NBUEUgPSB7XHJcbiAgICBcIiZhbXA7XCI6IFwiJlwiLFxyXG4gICAgXCImbHQ7XCI6IFwiPFwiLFxyXG4gICAgXCImZ3Q7XCI6IFwiPlwiLFxyXG4gICAgXCImbHJtO1wiOiBcIlxcdTIwMGVcIixcclxuICAgIFwiJnJsbTtcIjogXCJcXHUyMDBmXCIsXHJcbiAgICBcIiZuYnNwO1wiOiBcIlxcdTAwYTBcIlxyXG59O1xyXG5cclxudmFyIFRBR19OQU1FID0ge1xyXG4gICAgYzogXCJzcGFuXCIsXHJcbiAgICBpOiBcImlcIixcclxuICAgIGI6IFwiYlwiLFxyXG4gICAgdTogXCJ1XCIsXHJcbiAgICBydWJ5OiBcInJ1YnlcIixcclxuICAgIHJ0OiBcInJ0XCIsXHJcbiAgICB2OiBcInNwYW5cIixcclxuICAgIGxhbmc6IFwic3BhblwiXHJcbn07XHJcblxyXG52YXIgVEFHX0FOTk9UQVRJT04gPSB7XHJcbiAgICB2OiBcInRpdGxlXCIsXHJcbiAgICBsYW5nOiBcImxhbmdcIlxyXG59O1xyXG5cclxudmFyIE5FRURTX1BBUkVOVCA9IHtcclxuICAgIHJ0OiBcInJ1YnlcIlxyXG59O1xyXG5cclxuLy8gUGFyc2UgY29udGVudCBpbnRvIGEgZG9jdW1lbnQgZnJhZ21lbnQuXHJcbmZ1bmN0aW9uIHBhcnNlQ29udGVudCh3aW5kb3csIGlucHV0KSB7XHJcbiAgICBmdW5jdGlvbiBuZXh0VG9rZW4oKSB7XHJcbiAgICAgICAgLy8gQ2hlY2sgZm9yIGVuZC1vZi1zdHJpbmcuXHJcbiAgICAgICAgaWYgKCFpbnB1dCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENvbnN1bWUgJ24nIGNoYXJhY3RlcnMgZnJvbSB0aGUgaW5wdXQuXHJcbiAgICAgICAgZnVuY3Rpb24gY29uc3VtZShyZXN1bHQpIHtcclxuICAgICAgICAgICAgaW5wdXQgPSBpbnB1dC5zdWJzdHIocmVzdWx0Lmxlbmd0aCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgbSA9IGlucHV0Lm1hdGNoKC9eKFtePF0qKSg8W14+XSs+Pyk/Lyk7XHJcbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgc29tZSB0ZXh0IGJlZm9yZSB0aGUgbmV4dCB0YWcsIHJldHVybiBpdCwgb3RoZXJ3aXNlIHJldHVyblxyXG4gICAgICAgIC8vIHRoZSB0YWcuXHJcbiAgICAgICAgcmV0dXJuIGNvbnN1bWUobVsxXSA/IG1bMV0gOiBtWzJdKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBVbmVzY2FwZSBhIHN0cmluZyAncycuXHJcbiAgICBmdW5jdGlvbiB1bmVzY2FwZTEoZSkge1xyXG4gICAgICAgIHJldHVybiBFU0NBUEVbZV07XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiB1bmVzY2FwZShzKSB7XHJcbiAgICAgICAgd2hpbGUgKChtID0gcy5tYXRjaCgvJihhbXB8bHR8Z3R8bHJtfHJsbXxuYnNwKTsvKSkpIHtcclxuICAgICAgICAgICAgcyA9IHMucmVwbGFjZShtWzBdLCB1bmVzY2FwZTEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzaG91bGRBZGQoY3VycmVudCwgZWxlbWVudCkge1xyXG4gICAgICAgIHJldHVybiAhTkVFRFNfUEFSRU5UW2VsZW1lbnQubG9jYWxOYW1lXSB8fFxyXG4gICAgICAgICAgICBORUVEU19QQVJFTlRbZWxlbWVudC5sb2NhbE5hbWVdID09PSBjdXJyZW50LmxvY2FsTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDcmVhdGUgYW4gZWxlbWVudCBmb3IgdGhpcyB0YWcuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KHR5cGUsIGFubm90YXRpb24pIHtcclxuICAgICAgICB2YXIgdGFnTmFtZSA9IFRBR19OQU1FW3R5cGVdO1xyXG4gICAgICAgIGlmICghdGFnTmFtZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcclxuICAgICAgICBlbGVtZW50LmxvY2FsTmFtZSA9IHRhZ05hbWU7XHJcbiAgICAgICAgdmFyIG5hbWUgPSBUQUdfQU5OT1RBVElPTlt0eXBlXTtcclxuICAgICAgICBpZiAobmFtZSAmJiBhbm5vdGF0aW9uKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnRbbmFtZV0gPSBhbm5vdGF0aW9uLnRyaW0oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHJvb3REaXYgPSB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSxcclxuICAgICAgICBjdXJyZW50ID0gcm9vdERpdixcclxuICAgICAgICB0LFxyXG4gICAgICAgIHRhZ1N0YWNrID0gW107XHJcblxyXG4gICAgd2hpbGUgKCh0ID0gbmV4dFRva2VuKCkpICE9PSBudWxsKSB7XHJcbiAgICAgICAgaWYgKHRbMF0gPT09ICc8Jykge1xyXG4gICAgICAgICAgICBpZiAodFsxXSA9PT0gXCIvXCIpIHtcclxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBjbG9zaW5nIHRhZyBtYXRjaGVzLCBtb3ZlIGJhY2sgdXAgdG8gdGhlIHBhcmVudCBub2RlLlxyXG4gICAgICAgICAgICAgICAgaWYgKHRhZ1N0YWNrLmxlbmd0aCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHRhZ1N0YWNrW3RhZ1N0YWNrLmxlbmd0aCAtIDFdID09PSB0LnN1YnN0cigyKS5yZXBsYWNlKFwiPlwiLCBcIlwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhZ1N0YWNrLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudE5vZGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UganVzdCBpZ25vcmUgdGhlIGVuZCB0YWcuXHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgdHMgPSBwYXJzZVRpbWVTdGFtcCh0LnN1YnN0cigxLCB0Lmxlbmd0aCAtIDIpKTtcclxuICAgICAgICAgICAgdmFyIG5vZGU7XHJcbiAgICAgICAgICAgIGlmICh0cykge1xyXG4gICAgICAgICAgICAgICAgLy8gVGltZXN0YW1wcyBhcmUgbGVhZCBub2RlcyBhcyB3ZWxsLlxyXG4gICAgICAgICAgICAgICAgbm9kZSA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVQcm9jZXNzaW5nSW5zdHJ1Y3Rpb24oXCJ0aW1lc3RhbXBcIiwgdHMpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudC5hcHBlbmRDaGlsZChub2RlKTtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBtID0gdC5tYXRjaCgvXjwoW14uXFxzLzAtOT5dKykoXFwuW15cXHNcXFxcPl0rKT8oW14+XFxcXF0rKT8oXFxcXD8pPj8kLyk7XHJcbiAgICAgICAgICAgIC8vIElmIHdlIGNhbid0IHBhcnNlIHRoZSB0YWcsIHNraXAgdG8gdGhlIG5leHQgdGFnLlxyXG4gICAgICAgICAgICBpZiAoIW0pIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFRyeSB0byBjb25zdHJ1Y3QgYW4gZWxlbWVudCwgYW5kIGlnbm9yZSB0aGUgdGFnIGlmIHdlIGNvdWxkbid0LlxyXG4gICAgICAgICAgICBub2RlID0gY3JlYXRlRWxlbWVudChtWzFdLCBtWzNdKTtcclxuICAgICAgICAgICAgaWYgKCFub2RlKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBEZXRlcm1pbmUgaWYgdGhlIHRhZyBzaG91bGQgYmUgYWRkZWQgYmFzZWQgb24gdGhlIGNvbnRleHQgb2Ygd2hlcmUgaXRcclxuICAgICAgICAgICAgLy8gaXMgcGxhY2VkIGluIHRoZSBjdWV0ZXh0LlxyXG4gICAgICAgICAgICBpZiAoIXNob3VsZEFkZChjdXJyZW50LCBub2RlKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gU2V0IHRoZSBjbGFzcyBsaXN0IChhcyBhIGxpc3Qgb2YgY2xhc3Nlcywgc2VwYXJhdGVkIGJ5IHNwYWNlKS5cclxuICAgICAgICAgICAgaWYgKG1bMl0pIHtcclxuICAgICAgICAgICAgICAgIG5vZGUuY2xhc3NOYW1lID0gbVsyXS5zdWJzdHIoMSkucmVwbGFjZSgnLicsICcgJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gQXBwZW5kIHRoZSBub2RlIHRvIHRoZSBjdXJyZW50IG5vZGUsIGFuZCBlbnRlciB0aGUgc2NvcGUgb2YgdGhlIG5ld1xyXG4gICAgICAgICAgICAvLyBub2RlLlxyXG4gICAgICAgICAgICB0YWdTdGFjay5wdXNoKG1bMV0pO1xyXG4gICAgICAgICAgICBjdXJyZW50LmFwcGVuZENoaWxkKG5vZGUpO1xyXG4gICAgICAgICAgICBjdXJyZW50ID0gbm9kZTtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUZXh0IG5vZGVzIGFyZSBsZWFmIG5vZGVzLlxyXG4gICAgICAgIGN1cnJlbnQuYXBwZW5kQ2hpbGQod2luZG93LmRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHVuZXNjYXBlKHQpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJvb3REaXY7XHJcbn1cclxuXHJcbi8vIFRoaXMgaXMgYSBsaXN0IG9mIGFsbCB0aGUgVW5pY29kZSBjaGFyYWN0ZXJzIHRoYXQgaGF2ZSBhIHN0cm9uZ1xyXG4vLyByaWdodC10by1sZWZ0IGNhdGVnb3J5LiBXaGF0IHRoaXMgbWVhbnMgaXMgdGhhdCB0aGVzZSBjaGFyYWN0ZXJzIGFyZVxyXG4vLyB3cml0dGVuIHJpZ2h0LXRvLWxlZnQgZm9yIHN1cmUuIEl0IHdhcyBnZW5lcmF0ZWQgYnkgcHVsbGluZyBhbGwgdGhlIHN0cm9uZ1xyXG4vLyByaWdodC10by1sZWZ0IGNoYXJhY3RlcnMgb3V0IG9mIHRoZSBVbmljb2RlIGRhdGEgdGFibGUuIFRoYXQgdGFibGUgY2FuXHJcbi8vIGZvdW5kIGF0OiBodHRwOi8vd3d3LnVuaWNvZGUub3JnL1B1YmxpYy9VTklEQVRBL1VuaWNvZGVEYXRhLnR4dFxyXG52YXIgc3Ryb25nUlRMQ2hhcnMgPSBbMHgwNUJFLCAweDA1QzAsIDB4MDVDMywgMHgwNUM2LCAweDA1RDAsIDB4MDVEMSxcclxuICAgIDB4MDVEMiwgMHgwNUQzLCAweDA1RDQsIDB4MDVENSwgMHgwNUQ2LCAweDA1RDcsIDB4MDVEOCwgMHgwNUQ5LCAweDA1REEsXHJcbiAgICAweDA1REIsIDB4MDVEQywgMHgwNURELCAweDA1REUsIDB4MDVERiwgMHgwNUUwLCAweDA1RTEsIDB4MDVFMiwgMHgwNUUzLFxyXG4gICAgMHgwNUU0LCAweDA1RTUsIDB4MDVFNiwgMHgwNUU3LCAweDA1RTgsIDB4MDVFOSwgMHgwNUVBLCAweDA1RjAsIDB4MDVGMSxcclxuICAgIDB4MDVGMiwgMHgwNUYzLCAweDA1RjQsIDB4MDYwOCwgMHgwNjBCLCAweDA2MEQsIDB4MDYxQiwgMHgwNjFFLCAweDA2MUYsXHJcbiAgICAweDA2MjAsIDB4MDYyMSwgMHgwNjIyLCAweDA2MjMsIDB4MDYyNCwgMHgwNjI1LCAweDA2MjYsIDB4MDYyNywgMHgwNjI4LFxyXG4gICAgMHgwNjI5LCAweDA2MkEsIDB4MDYyQiwgMHgwNjJDLCAweDA2MkQsIDB4MDYyRSwgMHgwNjJGLCAweDA2MzAsIDB4MDYzMSxcclxuICAgIDB4MDYzMiwgMHgwNjMzLCAweDA2MzQsIDB4MDYzNSwgMHgwNjM2LCAweDA2MzcsIDB4MDYzOCwgMHgwNjM5LCAweDA2M0EsXHJcbiAgICAweDA2M0IsIDB4MDYzQywgMHgwNjNELCAweDA2M0UsIDB4MDYzRiwgMHgwNjQwLCAweDA2NDEsIDB4MDY0MiwgMHgwNjQzLFxyXG4gICAgMHgwNjQ0LCAweDA2NDUsIDB4MDY0NiwgMHgwNjQ3LCAweDA2NDgsIDB4MDY0OSwgMHgwNjRBLCAweDA2NkQsIDB4MDY2RSxcclxuICAgIDB4MDY2RiwgMHgwNjcxLCAweDA2NzIsIDB4MDY3MywgMHgwNjc0LCAweDA2NzUsIDB4MDY3NiwgMHgwNjc3LCAweDA2NzgsXHJcbiAgICAweDA2NzksIDB4MDY3QSwgMHgwNjdCLCAweDA2N0MsIDB4MDY3RCwgMHgwNjdFLCAweDA2N0YsIDB4MDY4MCwgMHgwNjgxLFxyXG4gICAgMHgwNjgyLCAweDA2ODMsIDB4MDY4NCwgMHgwNjg1LCAweDA2ODYsIDB4MDY4NywgMHgwNjg4LCAweDA2ODksIDB4MDY4QSxcclxuICAgIDB4MDY4QiwgMHgwNjhDLCAweDA2OEQsIDB4MDY4RSwgMHgwNjhGLCAweDA2OTAsIDB4MDY5MSwgMHgwNjkyLCAweDA2OTMsXHJcbiAgICAweDA2OTQsIDB4MDY5NSwgMHgwNjk2LCAweDA2OTcsIDB4MDY5OCwgMHgwNjk5LCAweDA2OUEsIDB4MDY5QiwgMHgwNjlDLFxyXG4gICAgMHgwNjlELCAweDA2OUUsIDB4MDY5RiwgMHgwNkEwLCAweDA2QTEsIDB4MDZBMiwgMHgwNkEzLCAweDA2QTQsIDB4MDZBNSxcclxuICAgIDB4MDZBNiwgMHgwNkE3LCAweDA2QTgsIDB4MDZBOSwgMHgwNkFBLCAweDA2QUIsIDB4MDZBQywgMHgwNkFELCAweDA2QUUsXHJcbiAgICAweDA2QUYsIDB4MDZCMCwgMHgwNkIxLCAweDA2QjIsIDB4MDZCMywgMHgwNkI0LCAweDA2QjUsIDB4MDZCNiwgMHgwNkI3LFxyXG4gICAgMHgwNkI4LCAweDA2QjksIDB4MDZCQSwgMHgwNkJCLCAweDA2QkMsIDB4MDZCRCwgMHgwNkJFLCAweDA2QkYsIDB4MDZDMCxcclxuICAgIDB4MDZDMSwgMHgwNkMyLCAweDA2QzMsIDB4MDZDNCwgMHgwNkM1LCAweDA2QzYsIDB4MDZDNywgMHgwNkM4LCAweDA2QzksXHJcbiAgICAweDA2Q0EsIDB4MDZDQiwgMHgwNkNDLCAweDA2Q0QsIDB4MDZDRSwgMHgwNkNGLCAweDA2RDAsIDB4MDZEMSwgMHgwNkQyLFxyXG4gICAgMHgwNkQzLCAweDA2RDQsIDB4MDZENSwgMHgwNkU1LCAweDA2RTYsIDB4MDZFRSwgMHgwNkVGLCAweDA2RkEsIDB4MDZGQixcclxuICAgIDB4MDZGQywgMHgwNkZELCAweDA2RkUsIDB4MDZGRiwgMHgwNzAwLCAweDA3MDEsIDB4MDcwMiwgMHgwNzAzLCAweDA3MDQsXHJcbiAgICAweDA3MDUsIDB4MDcwNiwgMHgwNzA3LCAweDA3MDgsIDB4MDcwOSwgMHgwNzBBLCAweDA3MEIsIDB4MDcwQywgMHgwNzBELFxyXG4gICAgMHgwNzBGLCAweDA3MTAsIDB4MDcxMiwgMHgwNzEzLCAweDA3MTQsIDB4MDcxNSwgMHgwNzE2LCAweDA3MTcsIDB4MDcxOCxcclxuICAgIDB4MDcxOSwgMHgwNzFBLCAweDA3MUIsIDB4MDcxQywgMHgwNzFELCAweDA3MUUsIDB4MDcxRiwgMHgwNzIwLCAweDA3MjEsXHJcbiAgICAweDA3MjIsIDB4MDcyMywgMHgwNzI0LCAweDA3MjUsIDB4MDcyNiwgMHgwNzI3LCAweDA3MjgsIDB4MDcyOSwgMHgwNzJBLFxyXG4gICAgMHgwNzJCLCAweDA3MkMsIDB4MDcyRCwgMHgwNzJFLCAweDA3MkYsIDB4MDc0RCwgMHgwNzRFLCAweDA3NEYsIDB4MDc1MCxcclxuICAgIDB4MDc1MSwgMHgwNzUyLCAweDA3NTMsIDB4MDc1NCwgMHgwNzU1LCAweDA3NTYsIDB4MDc1NywgMHgwNzU4LCAweDA3NTksXHJcbiAgICAweDA3NUEsIDB4MDc1QiwgMHgwNzVDLCAweDA3NUQsIDB4MDc1RSwgMHgwNzVGLCAweDA3NjAsIDB4MDc2MSwgMHgwNzYyLFxyXG4gICAgMHgwNzYzLCAweDA3NjQsIDB4MDc2NSwgMHgwNzY2LCAweDA3NjcsIDB4MDc2OCwgMHgwNzY5LCAweDA3NkEsIDB4MDc2QixcclxuICAgIDB4MDc2QywgMHgwNzZELCAweDA3NkUsIDB4MDc2RiwgMHgwNzcwLCAweDA3NzEsIDB4MDc3MiwgMHgwNzczLCAweDA3NzQsXHJcbiAgICAweDA3NzUsIDB4MDc3NiwgMHgwNzc3LCAweDA3NzgsIDB4MDc3OSwgMHgwNzdBLCAweDA3N0IsIDB4MDc3QywgMHgwNzdELFxyXG4gICAgMHgwNzdFLCAweDA3N0YsIDB4MDc4MCwgMHgwNzgxLCAweDA3ODIsIDB4MDc4MywgMHgwNzg0LCAweDA3ODUsIDB4MDc4NixcclxuICAgIDB4MDc4NywgMHgwNzg4LCAweDA3ODksIDB4MDc4QSwgMHgwNzhCLCAweDA3OEMsIDB4MDc4RCwgMHgwNzhFLCAweDA3OEYsXHJcbiAgICAweDA3OTAsIDB4MDc5MSwgMHgwNzkyLCAweDA3OTMsIDB4MDc5NCwgMHgwNzk1LCAweDA3OTYsIDB4MDc5NywgMHgwNzk4LFxyXG4gICAgMHgwNzk5LCAweDA3OUEsIDB4MDc5QiwgMHgwNzlDLCAweDA3OUQsIDB4MDc5RSwgMHgwNzlGLCAweDA3QTAsIDB4MDdBMSxcclxuICAgIDB4MDdBMiwgMHgwN0EzLCAweDA3QTQsIDB4MDdBNSwgMHgwN0IxLCAweDA3QzAsIDB4MDdDMSwgMHgwN0MyLCAweDA3QzMsXHJcbiAgICAweDA3QzQsIDB4MDdDNSwgMHgwN0M2LCAweDA3QzcsIDB4MDdDOCwgMHgwN0M5LCAweDA3Q0EsIDB4MDdDQiwgMHgwN0NDLFxyXG4gICAgMHgwN0NELCAweDA3Q0UsIDB4MDdDRiwgMHgwN0QwLCAweDA3RDEsIDB4MDdEMiwgMHgwN0QzLCAweDA3RDQsIDB4MDdENSxcclxuICAgIDB4MDdENiwgMHgwN0Q3LCAweDA3RDgsIDB4MDdEOSwgMHgwN0RBLCAweDA3REIsIDB4MDdEQywgMHgwN0RELCAweDA3REUsXHJcbiAgICAweDA3REYsIDB4MDdFMCwgMHgwN0UxLCAweDA3RTIsIDB4MDdFMywgMHgwN0U0LCAweDA3RTUsIDB4MDdFNiwgMHgwN0U3LFxyXG4gICAgMHgwN0U4LCAweDA3RTksIDB4MDdFQSwgMHgwN0Y0LCAweDA3RjUsIDB4MDdGQSwgMHgwODAwLCAweDA4MDEsIDB4MDgwMixcclxuICAgIDB4MDgwMywgMHgwODA0LCAweDA4MDUsIDB4MDgwNiwgMHgwODA3LCAweDA4MDgsIDB4MDgwOSwgMHgwODBBLCAweDA4MEIsXHJcbiAgICAweDA4MEMsIDB4MDgwRCwgMHgwODBFLCAweDA4MEYsIDB4MDgxMCwgMHgwODExLCAweDA4MTIsIDB4MDgxMywgMHgwODE0LFxyXG4gICAgMHgwODE1LCAweDA4MUEsIDB4MDgyNCwgMHgwODI4LCAweDA4MzAsIDB4MDgzMSwgMHgwODMyLCAweDA4MzMsIDB4MDgzNCxcclxuICAgIDB4MDgzNSwgMHgwODM2LCAweDA4MzcsIDB4MDgzOCwgMHgwODM5LCAweDA4M0EsIDB4MDgzQiwgMHgwODNDLCAweDA4M0QsXHJcbiAgICAweDA4M0UsIDB4MDg0MCwgMHgwODQxLCAweDA4NDIsIDB4MDg0MywgMHgwODQ0LCAweDA4NDUsIDB4MDg0NiwgMHgwODQ3LFxyXG4gICAgMHgwODQ4LCAweDA4NDksIDB4MDg0QSwgMHgwODRCLCAweDA4NEMsIDB4MDg0RCwgMHgwODRFLCAweDA4NEYsIDB4MDg1MCxcclxuICAgIDB4MDg1MSwgMHgwODUyLCAweDA4NTMsIDB4MDg1NCwgMHgwODU1LCAweDA4NTYsIDB4MDg1NywgMHgwODU4LCAweDA4NUUsXHJcbiAgICAweDA4QTAsIDB4MDhBMiwgMHgwOEEzLCAweDA4QTQsIDB4MDhBNSwgMHgwOEE2LCAweDA4QTcsIDB4MDhBOCwgMHgwOEE5LFxyXG4gICAgMHgwOEFBLCAweDA4QUIsIDB4MDhBQywgMHgyMDBGLCAweEZCMUQsIDB4RkIxRiwgMHhGQjIwLCAweEZCMjEsIDB4RkIyMixcclxuICAgIDB4RkIyMywgMHhGQjI0LCAweEZCMjUsIDB4RkIyNiwgMHhGQjI3LCAweEZCMjgsIDB4RkIyQSwgMHhGQjJCLCAweEZCMkMsXHJcbiAgICAweEZCMkQsIDB4RkIyRSwgMHhGQjJGLCAweEZCMzAsIDB4RkIzMSwgMHhGQjMyLCAweEZCMzMsIDB4RkIzNCwgMHhGQjM1LFxyXG4gICAgMHhGQjM2LCAweEZCMzgsIDB4RkIzOSwgMHhGQjNBLCAweEZCM0IsIDB4RkIzQywgMHhGQjNFLCAweEZCNDAsIDB4RkI0MSxcclxuICAgIDB4RkI0MywgMHhGQjQ0LCAweEZCNDYsIDB4RkI0NywgMHhGQjQ4LCAweEZCNDksIDB4RkI0QSwgMHhGQjRCLCAweEZCNEMsXHJcbiAgICAweEZCNEQsIDB4RkI0RSwgMHhGQjRGLCAweEZCNTAsIDB4RkI1MSwgMHhGQjUyLCAweEZCNTMsIDB4RkI1NCwgMHhGQjU1LFxyXG4gICAgMHhGQjU2LCAweEZCNTcsIDB4RkI1OCwgMHhGQjU5LCAweEZCNUEsIDB4RkI1QiwgMHhGQjVDLCAweEZCNUQsIDB4RkI1RSxcclxuICAgIDB4RkI1RiwgMHhGQjYwLCAweEZCNjEsIDB4RkI2MiwgMHhGQjYzLCAweEZCNjQsIDB4RkI2NSwgMHhGQjY2LCAweEZCNjcsXHJcbiAgICAweEZCNjgsIDB4RkI2OSwgMHhGQjZBLCAweEZCNkIsIDB4RkI2QywgMHhGQjZELCAweEZCNkUsIDB4RkI2RiwgMHhGQjcwLFxyXG4gICAgMHhGQjcxLCAweEZCNzIsIDB4RkI3MywgMHhGQjc0LCAweEZCNzUsIDB4RkI3NiwgMHhGQjc3LCAweEZCNzgsIDB4RkI3OSxcclxuICAgIDB4RkI3QSwgMHhGQjdCLCAweEZCN0MsIDB4RkI3RCwgMHhGQjdFLCAweEZCN0YsIDB4RkI4MCwgMHhGQjgxLCAweEZCODIsXHJcbiAgICAweEZCODMsIDB4RkI4NCwgMHhGQjg1LCAweEZCODYsIDB4RkI4NywgMHhGQjg4LCAweEZCODksIDB4RkI4QSwgMHhGQjhCLFxyXG4gICAgMHhGQjhDLCAweEZCOEQsIDB4RkI4RSwgMHhGQjhGLCAweEZCOTAsIDB4RkI5MSwgMHhGQjkyLCAweEZCOTMsIDB4RkI5NCxcclxuICAgIDB4RkI5NSwgMHhGQjk2LCAweEZCOTcsIDB4RkI5OCwgMHhGQjk5LCAweEZCOUEsIDB4RkI5QiwgMHhGQjlDLCAweEZCOUQsXHJcbiAgICAweEZCOUUsIDB4RkI5RiwgMHhGQkEwLCAweEZCQTEsIDB4RkJBMiwgMHhGQkEzLCAweEZCQTQsIDB4RkJBNSwgMHhGQkE2LFxyXG4gICAgMHhGQkE3LCAweEZCQTgsIDB4RkJBOSwgMHhGQkFBLCAweEZCQUIsIDB4RkJBQywgMHhGQkFELCAweEZCQUUsIDB4RkJBRixcclxuICAgIDB4RkJCMCwgMHhGQkIxLCAweEZCQjIsIDB4RkJCMywgMHhGQkI0LCAweEZCQjUsIDB4RkJCNiwgMHhGQkI3LCAweEZCQjgsXHJcbiAgICAweEZCQjksIDB4RkJCQSwgMHhGQkJCLCAweEZCQkMsIDB4RkJCRCwgMHhGQkJFLCAweEZCQkYsIDB4RkJDMCwgMHhGQkMxLFxyXG4gICAgMHhGQkQzLCAweEZCRDQsIDB4RkJENSwgMHhGQkQ2LCAweEZCRDcsIDB4RkJEOCwgMHhGQkQ5LCAweEZCREEsIDB4RkJEQixcclxuICAgIDB4RkJEQywgMHhGQkRELCAweEZCREUsIDB4RkJERiwgMHhGQkUwLCAweEZCRTEsIDB4RkJFMiwgMHhGQkUzLCAweEZCRTQsXHJcbiAgICAweEZCRTUsIDB4RkJFNiwgMHhGQkU3LCAweEZCRTgsIDB4RkJFOSwgMHhGQkVBLCAweEZCRUIsIDB4RkJFQywgMHhGQkVELFxyXG4gICAgMHhGQkVFLCAweEZCRUYsIDB4RkJGMCwgMHhGQkYxLCAweEZCRjIsIDB4RkJGMywgMHhGQkY0LCAweEZCRjUsIDB4RkJGNixcclxuICAgIDB4RkJGNywgMHhGQkY4LCAweEZCRjksIDB4RkJGQSwgMHhGQkZCLCAweEZCRkMsIDB4RkJGRCwgMHhGQkZFLCAweEZCRkYsXHJcbiAgICAweEZDMDAsIDB4RkMwMSwgMHhGQzAyLCAweEZDMDMsIDB4RkMwNCwgMHhGQzA1LCAweEZDMDYsIDB4RkMwNywgMHhGQzA4LFxyXG4gICAgMHhGQzA5LCAweEZDMEEsIDB4RkMwQiwgMHhGQzBDLCAweEZDMEQsIDB4RkMwRSwgMHhGQzBGLCAweEZDMTAsIDB4RkMxMSxcclxuICAgIDB4RkMxMiwgMHhGQzEzLCAweEZDMTQsIDB4RkMxNSwgMHhGQzE2LCAweEZDMTcsIDB4RkMxOCwgMHhGQzE5LCAweEZDMUEsXHJcbiAgICAweEZDMUIsIDB4RkMxQywgMHhGQzFELCAweEZDMUUsIDB4RkMxRiwgMHhGQzIwLCAweEZDMjEsIDB4RkMyMiwgMHhGQzIzLFxyXG4gICAgMHhGQzI0LCAweEZDMjUsIDB4RkMyNiwgMHhGQzI3LCAweEZDMjgsIDB4RkMyOSwgMHhGQzJBLCAweEZDMkIsIDB4RkMyQyxcclxuICAgIDB4RkMyRCwgMHhGQzJFLCAweEZDMkYsIDB4RkMzMCwgMHhGQzMxLCAweEZDMzIsIDB4RkMzMywgMHhGQzM0LCAweEZDMzUsXHJcbiAgICAweEZDMzYsIDB4RkMzNywgMHhGQzM4LCAweEZDMzksIDB4RkMzQSwgMHhGQzNCLCAweEZDM0MsIDB4RkMzRCwgMHhGQzNFLFxyXG4gICAgMHhGQzNGLCAweEZDNDAsIDB4RkM0MSwgMHhGQzQyLCAweEZDNDMsIDB4RkM0NCwgMHhGQzQ1LCAweEZDNDYsIDB4RkM0NyxcclxuICAgIDB4RkM0OCwgMHhGQzQ5LCAweEZDNEEsIDB4RkM0QiwgMHhGQzRDLCAweEZDNEQsIDB4RkM0RSwgMHhGQzRGLCAweEZDNTAsXHJcbiAgICAweEZDNTEsIDB4RkM1MiwgMHhGQzUzLCAweEZDNTQsIDB4RkM1NSwgMHhGQzU2LCAweEZDNTcsIDB4RkM1OCwgMHhGQzU5LFxyXG4gICAgMHhGQzVBLCAweEZDNUIsIDB4RkM1QywgMHhGQzVELCAweEZDNUUsIDB4RkM1RiwgMHhGQzYwLCAweEZDNjEsIDB4RkM2MixcclxuICAgIDB4RkM2MywgMHhGQzY0LCAweEZDNjUsIDB4RkM2NiwgMHhGQzY3LCAweEZDNjgsIDB4RkM2OSwgMHhGQzZBLCAweEZDNkIsXHJcbiAgICAweEZDNkMsIDB4RkM2RCwgMHhGQzZFLCAweEZDNkYsIDB4RkM3MCwgMHhGQzcxLCAweEZDNzIsIDB4RkM3MywgMHhGQzc0LFxyXG4gICAgMHhGQzc1LCAweEZDNzYsIDB4RkM3NywgMHhGQzc4LCAweEZDNzksIDB4RkM3QSwgMHhGQzdCLCAweEZDN0MsIDB4RkM3RCxcclxuICAgIDB4RkM3RSwgMHhGQzdGLCAweEZDODAsIDB4RkM4MSwgMHhGQzgyLCAweEZDODMsIDB4RkM4NCwgMHhGQzg1LCAweEZDODYsXHJcbiAgICAweEZDODcsIDB4RkM4OCwgMHhGQzg5LCAweEZDOEEsIDB4RkM4QiwgMHhGQzhDLCAweEZDOEQsIDB4RkM4RSwgMHhGQzhGLFxyXG4gICAgMHhGQzkwLCAweEZDOTEsIDB4RkM5MiwgMHhGQzkzLCAweEZDOTQsIDB4RkM5NSwgMHhGQzk2LCAweEZDOTcsIDB4RkM5OCxcclxuICAgIDB4RkM5OSwgMHhGQzlBLCAweEZDOUIsIDB4RkM5QywgMHhGQzlELCAweEZDOUUsIDB4RkM5RiwgMHhGQ0EwLCAweEZDQTEsXHJcbiAgICAweEZDQTIsIDB4RkNBMywgMHhGQ0E0LCAweEZDQTUsIDB4RkNBNiwgMHhGQ0E3LCAweEZDQTgsIDB4RkNBOSwgMHhGQ0FBLFxyXG4gICAgMHhGQ0FCLCAweEZDQUMsIDB4RkNBRCwgMHhGQ0FFLCAweEZDQUYsIDB4RkNCMCwgMHhGQ0IxLCAweEZDQjIsIDB4RkNCMyxcclxuICAgIDB4RkNCNCwgMHhGQ0I1LCAweEZDQjYsIDB4RkNCNywgMHhGQ0I4LCAweEZDQjksIDB4RkNCQSwgMHhGQ0JCLCAweEZDQkMsXHJcbiAgICAweEZDQkQsIDB4RkNCRSwgMHhGQ0JGLCAweEZDQzAsIDB4RkNDMSwgMHhGQ0MyLCAweEZDQzMsIDB4RkNDNCwgMHhGQ0M1LFxyXG4gICAgMHhGQ0M2LCAweEZDQzcsIDB4RkNDOCwgMHhGQ0M5LCAweEZDQ0EsIDB4RkNDQiwgMHhGQ0NDLCAweEZDQ0QsIDB4RkNDRSxcclxuICAgIDB4RkNDRiwgMHhGQ0QwLCAweEZDRDEsIDB4RkNEMiwgMHhGQ0QzLCAweEZDRDQsIDB4RkNENSwgMHhGQ0Q2LCAweEZDRDcsXHJcbiAgICAweEZDRDgsIDB4RkNEOSwgMHhGQ0RBLCAweEZDREIsIDB4RkNEQywgMHhGQ0RELCAweEZDREUsIDB4RkNERiwgMHhGQ0UwLFxyXG4gICAgMHhGQ0UxLCAweEZDRTIsIDB4RkNFMywgMHhGQ0U0LCAweEZDRTUsIDB4RkNFNiwgMHhGQ0U3LCAweEZDRTgsIDB4RkNFOSxcclxuICAgIDB4RkNFQSwgMHhGQ0VCLCAweEZDRUMsIDB4RkNFRCwgMHhGQ0VFLCAweEZDRUYsIDB4RkNGMCwgMHhGQ0YxLCAweEZDRjIsXHJcbiAgICAweEZDRjMsIDB4RkNGNCwgMHhGQ0Y1LCAweEZDRjYsIDB4RkNGNywgMHhGQ0Y4LCAweEZDRjksIDB4RkNGQSwgMHhGQ0ZCLFxyXG4gICAgMHhGQ0ZDLCAweEZDRkQsIDB4RkNGRSwgMHhGQ0ZGLCAweEZEMDAsIDB4RkQwMSwgMHhGRDAyLCAweEZEMDMsIDB4RkQwNCxcclxuICAgIDB4RkQwNSwgMHhGRDA2LCAweEZEMDcsIDB4RkQwOCwgMHhGRDA5LCAweEZEMEEsIDB4RkQwQiwgMHhGRDBDLCAweEZEMEQsXHJcbiAgICAweEZEMEUsIDB4RkQwRiwgMHhGRDEwLCAweEZEMTEsIDB4RkQxMiwgMHhGRDEzLCAweEZEMTQsIDB4RkQxNSwgMHhGRDE2LFxyXG4gICAgMHhGRDE3LCAweEZEMTgsIDB4RkQxOSwgMHhGRDFBLCAweEZEMUIsIDB4RkQxQywgMHhGRDFELCAweEZEMUUsIDB4RkQxRixcclxuICAgIDB4RkQyMCwgMHhGRDIxLCAweEZEMjIsIDB4RkQyMywgMHhGRDI0LCAweEZEMjUsIDB4RkQyNiwgMHhGRDI3LCAweEZEMjgsXHJcbiAgICAweEZEMjksIDB4RkQyQSwgMHhGRDJCLCAweEZEMkMsIDB4RkQyRCwgMHhGRDJFLCAweEZEMkYsIDB4RkQzMCwgMHhGRDMxLFxyXG4gICAgMHhGRDMyLCAweEZEMzMsIDB4RkQzNCwgMHhGRDM1LCAweEZEMzYsIDB4RkQzNywgMHhGRDM4LCAweEZEMzksIDB4RkQzQSxcclxuICAgIDB4RkQzQiwgMHhGRDNDLCAweEZEM0QsIDB4RkQ1MCwgMHhGRDUxLCAweEZENTIsIDB4RkQ1MywgMHhGRDU0LCAweEZENTUsXHJcbiAgICAweEZENTYsIDB4RkQ1NywgMHhGRDU4LCAweEZENTksIDB4RkQ1QSwgMHhGRDVCLCAweEZENUMsIDB4RkQ1RCwgMHhGRDVFLFxyXG4gICAgMHhGRDVGLCAweEZENjAsIDB4RkQ2MSwgMHhGRDYyLCAweEZENjMsIDB4RkQ2NCwgMHhGRDY1LCAweEZENjYsIDB4RkQ2NyxcclxuICAgIDB4RkQ2OCwgMHhGRDY5LCAweEZENkEsIDB4RkQ2QiwgMHhGRDZDLCAweEZENkQsIDB4RkQ2RSwgMHhGRDZGLCAweEZENzAsXHJcbiAgICAweEZENzEsIDB4RkQ3MiwgMHhGRDczLCAweEZENzQsIDB4RkQ3NSwgMHhGRDc2LCAweEZENzcsIDB4RkQ3OCwgMHhGRDc5LFxyXG4gICAgMHhGRDdBLCAweEZEN0IsIDB4RkQ3QywgMHhGRDdELCAweEZEN0UsIDB4RkQ3RiwgMHhGRDgwLCAweEZEODEsIDB4RkQ4MixcclxuICAgIDB4RkQ4MywgMHhGRDg0LCAweEZEODUsIDB4RkQ4NiwgMHhGRDg3LCAweEZEODgsIDB4RkQ4OSwgMHhGRDhBLCAweEZEOEIsXHJcbiAgICAweEZEOEMsIDB4RkQ4RCwgMHhGRDhFLCAweEZEOEYsIDB4RkQ5MiwgMHhGRDkzLCAweEZEOTQsIDB4RkQ5NSwgMHhGRDk2LFxyXG4gICAgMHhGRDk3LCAweEZEOTgsIDB4RkQ5OSwgMHhGRDlBLCAweEZEOUIsIDB4RkQ5QywgMHhGRDlELCAweEZEOUUsIDB4RkQ5RixcclxuICAgIDB4RkRBMCwgMHhGREExLCAweEZEQTIsIDB4RkRBMywgMHhGREE0LCAweEZEQTUsIDB4RkRBNiwgMHhGREE3LCAweEZEQTgsXHJcbiAgICAweEZEQTksIDB4RkRBQSwgMHhGREFCLCAweEZEQUMsIDB4RkRBRCwgMHhGREFFLCAweEZEQUYsIDB4RkRCMCwgMHhGREIxLFxyXG4gICAgMHhGREIyLCAweEZEQjMsIDB4RkRCNCwgMHhGREI1LCAweEZEQjYsIDB4RkRCNywgMHhGREI4LCAweEZEQjksIDB4RkRCQSxcclxuICAgIDB4RkRCQiwgMHhGREJDLCAweEZEQkQsIDB4RkRCRSwgMHhGREJGLCAweEZEQzAsIDB4RkRDMSwgMHhGREMyLCAweEZEQzMsXHJcbiAgICAweEZEQzQsIDB4RkRDNSwgMHhGREM2LCAweEZEQzcsIDB4RkRGMCwgMHhGREYxLCAweEZERjIsIDB4RkRGMywgMHhGREY0LFxyXG4gICAgMHhGREY1LCAweEZERjYsIDB4RkRGNywgMHhGREY4LCAweEZERjksIDB4RkRGQSwgMHhGREZCLCAweEZERkMsIDB4RkU3MCxcclxuICAgIDB4RkU3MSwgMHhGRTcyLCAweEZFNzMsIDB4RkU3NCwgMHhGRTc2LCAweEZFNzcsIDB4RkU3OCwgMHhGRTc5LCAweEZFN0EsXHJcbiAgICAweEZFN0IsIDB4RkU3QywgMHhGRTdELCAweEZFN0UsIDB4RkU3RiwgMHhGRTgwLCAweEZFODEsIDB4RkU4MiwgMHhGRTgzLFxyXG4gICAgMHhGRTg0LCAweEZFODUsIDB4RkU4NiwgMHhGRTg3LCAweEZFODgsIDB4RkU4OSwgMHhGRThBLCAweEZFOEIsIDB4RkU4QyxcclxuICAgIDB4RkU4RCwgMHhGRThFLCAweEZFOEYsIDB4RkU5MCwgMHhGRTkxLCAweEZFOTIsIDB4RkU5MywgMHhGRTk0LCAweEZFOTUsXHJcbiAgICAweEZFOTYsIDB4RkU5NywgMHhGRTk4LCAweEZFOTksIDB4RkU5QSwgMHhGRTlCLCAweEZFOUMsIDB4RkU5RCwgMHhGRTlFLFxyXG4gICAgMHhGRTlGLCAweEZFQTAsIDB4RkVBMSwgMHhGRUEyLCAweEZFQTMsIDB4RkVBNCwgMHhGRUE1LCAweEZFQTYsIDB4RkVBNyxcclxuICAgIDB4RkVBOCwgMHhGRUE5LCAweEZFQUEsIDB4RkVBQiwgMHhGRUFDLCAweEZFQUQsIDB4RkVBRSwgMHhGRUFGLCAweEZFQjAsXHJcbiAgICAweEZFQjEsIDB4RkVCMiwgMHhGRUIzLCAweEZFQjQsIDB4RkVCNSwgMHhGRUI2LCAweEZFQjcsIDB4RkVCOCwgMHhGRUI5LFxyXG4gICAgMHhGRUJBLCAweEZFQkIsIDB4RkVCQywgMHhGRUJELCAweEZFQkUsIDB4RkVCRiwgMHhGRUMwLCAweEZFQzEsIDB4RkVDMixcclxuICAgIDB4RkVDMywgMHhGRUM0LCAweEZFQzUsIDB4RkVDNiwgMHhGRUM3LCAweEZFQzgsIDB4RkVDOSwgMHhGRUNBLCAweEZFQ0IsXHJcbiAgICAweEZFQ0MsIDB4RkVDRCwgMHhGRUNFLCAweEZFQ0YsIDB4RkVEMCwgMHhGRUQxLCAweEZFRDIsIDB4RkVEMywgMHhGRUQ0LFxyXG4gICAgMHhGRUQ1LCAweEZFRDYsIDB4RkVENywgMHhGRUQ4LCAweEZFRDksIDB4RkVEQSwgMHhGRURCLCAweEZFREMsIDB4RkVERCxcclxuICAgIDB4RkVERSwgMHhGRURGLCAweEZFRTAsIDB4RkVFMSwgMHhGRUUyLCAweEZFRTMsIDB4RkVFNCwgMHhGRUU1LCAweEZFRTYsXHJcbiAgICAweEZFRTcsIDB4RkVFOCwgMHhGRUU5LCAweEZFRUEsIDB4RkVFQiwgMHhGRUVDLCAweEZFRUQsIDB4RkVFRSwgMHhGRUVGLFxyXG4gICAgMHhGRUYwLCAweEZFRjEsIDB4RkVGMiwgMHhGRUYzLCAweEZFRjQsIDB4RkVGNSwgMHhGRUY2LCAweEZFRjcsIDB4RkVGOCxcclxuICAgIDB4RkVGOSwgMHhGRUZBLCAweEZFRkIsIDB4RkVGQywgMHgxMDgwMCwgMHgxMDgwMSwgMHgxMDgwMiwgMHgxMDgwMyxcclxuICAgIDB4MTA4MDQsIDB4MTA4MDUsIDB4MTA4MDgsIDB4MTA4MEEsIDB4MTA4MEIsIDB4MTA4MEMsIDB4MTA4MEQsIDB4MTA4MEUsXHJcbiAgICAweDEwODBGLCAweDEwODEwLCAweDEwODExLCAweDEwODEyLCAweDEwODEzLCAweDEwODE0LCAweDEwODE1LCAweDEwODE2LFxyXG4gICAgMHgxMDgxNywgMHgxMDgxOCwgMHgxMDgxOSwgMHgxMDgxQSwgMHgxMDgxQiwgMHgxMDgxQywgMHgxMDgxRCwgMHgxMDgxRSxcclxuICAgIDB4MTA4MUYsIDB4MTA4MjAsIDB4MTA4MjEsIDB4MTA4MjIsIDB4MTA4MjMsIDB4MTA4MjQsIDB4MTA4MjUsIDB4MTA4MjYsXHJcbiAgICAweDEwODI3LCAweDEwODI4LCAweDEwODI5LCAweDEwODJBLCAweDEwODJCLCAweDEwODJDLCAweDEwODJELCAweDEwODJFLFxyXG4gICAgMHgxMDgyRiwgMHgxMDgzMCwgMHgxMDgzMSwgMHgxMDgzMiwgMHgxMDgzMywgMHgxMDgzNCwgMHgxMDgzNSwgMHgxMDgzNyxcclxuICAgIDB4MTA4MzgsIDB4MTA4M0MsIDB4MTA4M0YsIDB4MTA4NDAsIDB4MTA4NDEsIDB4MTA4NDIsIDB4MTA4NDMsIDB4MTA4NDQsXHJcbiAgICAweDEwODQ1LCAweDEwODQ2LCAweDEwODQ3LCAweDEwODQ4LCAweDEwODQ5LCAweDEwODRBLCAweDEwODRCLCAweDEwODRDLFxyXG4gICAgMHgxMDg0RCwgMHgxMDg0RSwgMHgxMDg0RiwgMHgxMDg1MCwgMHgxMDg1MSwgMHgxMDg1MiwgMHgxMDg1MywgMHgxMDg1NCxcclxuICAgIDB4MTA4NTUsIDB4MTA4NTcsIDB4MTA4NTgsIDB4MTA4NTksIDB4MTA4NUEsIDB4MTA4NUIsIDB4MTA4NUMsIDB4MTA4NUQsXHJcbiAgICAweDEwODVFLCAweDEwODVGLCAweDEwOTAwLCAweDEwOTAxLCAweDEwOTAyLCAweDEwOTAzLCAweDEwOTA0LCAweDEwOTA1LFxyXG4gICAgMHgxMDkwNiwgMHgxMDkwNywgMHgxMDkwOCwgMHgxMDkwOSwgMHgxMDkwQSwgMHgxMDkwQiwgMHgxMDkwQywgMHgxMDkwRCxcclxuICAgIDB4MTA5MEUsIDB4MTA5MEYsIDB4MTA5MTAsIDB4MTA5MTEsIDB4MTA5MTIsIDB4MTA5MTMsIDB4MTA5MTQsIDB4MTA5MTUsXHJcbiAgICAweDEwOTE2LCAweDEwOTE3LCAweDEwOTE4LCAweDEwOTE5LCAweDEwOTFBLCAweDEwOTFCLCAweDEwOTIwLCAweDEwOTIxLFxyXG4gICAgMHgxMDkyMiwgMHgxMDkyMywgMHgxMDkyNCwgMHgxMDkyNSwgMHgxMDkyNiwgMHgxMDkyNywgMHgxMDkyOCwgMHgxMDkyOSxcclxuICAgIDB4MTA5MkEsIDB4MTA5MkIsIDB4MTA5MkMsIDB4MTA5MkQsIDB4MTA5MkUsIDB4MTA5MkYsIDB4MTA5MzAsIDB4MTA5MzEsXHJcbiAgICAweDEwOTMyLCAweDEwOTMzLCAweDEwOTM0LCAweDEwOTM1LCAweDEwOTM2LCAweDEwOTM3LCAweDEwOTM4LCAweDEwOTM5LFxyXG4gICAgMHgxMDkzRiwgMHgxMDk4MCwgMHgxMDk4MSwgMHgxMDk4MiwgMHgxMDk4MywgMHgxMDk4NCwgMHgxMDk4NSwgMHgxMDk4NixcclxuICAgIDB4MTA5ODcsIDB4MTA5ODgsIDB4MTA5ODksIDB4MTA5OEEsIDB4MTA5OEIsIDB4MTA5OEMsIDB4MTA5OEQsIDB4MTA5OEUsXHJcbiAgICAweDEwOThGLCAweDEwOTkwLCAweDEwOTkxLCAweDEwOTkyLCAweDEwOTkzLCAweDEwOTk0LCAweDEwOTk1LCAweDEwOTk2LFxyXG4gICAgMHgxMDk5NywgMHgxMDk5OCwgMHgxMDk5OSwgMHgxMDk5QSwgMHgxMDk5QiwgMHgxMDk5QywgMHgxMDk5RCwgMHgxMDk5RSxcclxuICAgIDB4MTA5OUYsIDB4MTA5QTAsIDB4MTA5QTEsIDB4MTA5QTIsIDB4MTA5QTMsIDB4MTA5QTQsIDB4MTA5QTUsIDB4MTA5QTYsXHJcbiAgICAweDEwOUE3LCAweDEwOUE4LCAweDEwOUE5LCAweDEwOUFBLCAweDEwOUFCLCAweDEwOUFDLCAweDEwOUFELCAweDEwOUFFLFxyXG4gICAgMHgxMDlBRiwgMHgxMDlCMCwgMHgxMDlCMSwgMHgxMDlCMiwgMHgxMDlCMywgMHgxMDlCNCwgMHgxMDlCNSwgMHgxMDlCNixcclxuICAgIDB4MTA5QjcsIDB4MTA5QkUsIDB4MTA5QkYsIDB4MTBBMDAsIDB4MTBBMTAsIDB4MTBBMTEsIDB4MTBBMTIsIDB4MTBBMTMsXHJcbiAgICAweDEwQTE1LCAweDEwQTE2LCAweDEwQTE3LCAweDEwQTE5LCAweDEwQTFBLCAweDEwQTFCLCAweDEwQTFDLCAweDEwQTFELFxyXG4gICAgMHgxMEExRSwgMHgxMEExRiwgMHgxMEEyMCwgMHgxMEEyMSwgMHgxMEEyMiwgMHgxMEEyMywgMHgxMEEyNCwgMHgxMEEyNSxcclxuICAgIDB4MTBBMjYsIDB4MTBBMjcsIDB4MTBBMjgsIDB4MTBBMjksIDB4MTBBMkEsIDB4MTBBMkIsIDB4MTBBMkMsIDB4MTBBMkQsXHJcbiAgICAweDEwQTJFLCAweDEwQTJGLCAweDEwQTMwLCAweDEwQTMxLCAweDEwQTMyLCAweDEwQTMzLCAweDEwQTQwLCAweDEwQTQxLFxyXG4gICAgMHgxMEE0MiwgMHgxMEE0MywgMHgxMEE0NCwgMHgxMEE0NSwgMHgxMEE0NiwgMHgxMEE0NywgMHgxMEE1MCwgMHgxMEE1MSxcclxuICAgIDB4MTBBNTIsIDB4MTBBNTMsIDB4MTBBNTQsIDB4MTBBNTUsIDB4MTBBNTYsIDB4MTBBNTcsIDB4MTBBNTgsIDB4MTBBNjAsXHJcbiAgICAweDEwQTYxLCAweDEwQTYyLCAweDEwQTYzLCAweDEwQTY0LCAweDEwQTY1LCAweDEwQTY2LCAweDEwQTY3LCAweDEwQTY4LFxyXG4gICAgMHgxMEE2OSwgMHgxMEE2QSwgMHgxMEE2QiwgMHgxMEE2QywgMHgxMEE2RCwgMHgxMEE2RSwgMHgxMEE2RiwgMHgxMEE3MCxcclxuICAgIDB4MTBBNzEsIDB4MTBBNzIsIDB4MTBBNzMsIDB4MTBBNzQsIDB4MTBBNzUsIDB4MTBBNzYsIDB4MTBBNzcsIDB4MTBBNzgsXHJcbiAgICAweDEwQTc5LCAweDEwQTdBLCAweDEwQTdCLCAweDEwQTdDLCAweDEwQTdELCAweDEwQTdFLCAweDEwQTdGLCAweDEwQjAwLFxyXG4gICAgMHgxMEIwMSwgMHgxMEIwMiwgMHgxMEIwMywgMHgxMEIwNCwgMHgxMEIwNSwgMHgxMEIwNiwgMHgxMEIwNywgMHgxMEIwOCxcclxuICAgIDB4MTBCMDksIDB4MTBCMEEsIDB4MTBCMEIsIDB4MTBCMEMsIDB4MTBCMEQsIDB4MTBCMEUsIDB4MTBCMEYsIDB4MTBCMTAsXHJcbiAgICAweDEwQjExLCAweDEwQjEyLCAweDEwQjEzLCAweDEwQjE0LCAweDEwQjE1LCAweDEwQjE2LCAweDEwQjE3LCAweDEwQjE4LFxyXG4gICAgMHgxMEIxOSwgMHgxMEIxQSwgMHgxMEIxQiwgMHgxMEIxQywgMHgxMEIxRCwgMHgxMEIxRSwgMHgxMEIxRiwgMHgxMEIyMCxcclxuICAgIDB4MTBCMjEsIDB4MTBCMjIsIDB4MTBCMjMsIDB4MTBCMjQsIDB4MTBCMjUsIDB4MTBCMjYsIDB4MTBCMjcsIDB4MTBCMjgsXHJcbiAgICAweDEwQjI5LCAweDEwQjJBLCAweDEwQjJCLCAweDEwQjJDLCAweDEwQjJELCAweDEwQjJFLCAweDEwQjJGLCAweDEwQjMwLFxyXG4gICAgMHgxMEIzMSwgMHgxMEIzMiwgMHgxMEIzMywgMHgxMEIzNCwgMHgxMEIzNSwgMHgxMEI0MCwgMHgxMEI0MSwgMHgxMEI0MixcclxuICAgIDB4MTBCNDMsIDB4MTBCNDQsIDB4MTBCNDUsIDB4MTBCNDYsIDB4MTBCNDcsIDB4MTBCNDgsIDB4MTBCNDksIDB4MTBCNEEsXHJcbiAgICAweDEwQjRCLCAweDEwQjRDLCAweDEwQjRELCAweDEwQjRFLCAweDEwQjRGLCAweDEwQjUwLCAweDEwQjUxLCAweDEwQjUyLFxyXG4gICAgMHgxMEI1MywgMHgxMEI1NCwgMHgxMEI1NSwgMHgxMEI1OCwgMHgxMEI1OSwgMHgxMEI1QSwgMHgxMEI1QiwgMHgxMEI1QyxcclxuICAgIDB4MTBCNUQsIDB4MTBCNUUsIDB4MTBCNUYsIDB4MTBCNjAsIDB4MTBCNjEsIDB4MTBCNjIsIDB4MTBCNjMsIDB4MTBCNjQsXHJcbiAgICAweDEwQjY1LCAweDEwQjY2LCAweDEwQjY3LCAweDEwQjY4LCAweDEwQjY5LCAweDEwQjZBLCAweDEwQjZCLCAweDEwQjZDLFxyXG4gICAgMHgxMEI2RCwgMHgxMEI2RSwgMHgxMEI2RiwgMHgxMEI3MCwgMHgxMEI3MSwgMHgxMEI3MiwgMHgxMEI3OCwgMHgxMEI3OSxcclxuICAgIDB4MTBCN0EsIDB4MTBCN0IsIDB4MTBCN0MsIDB4MTBCN0QsIDB4MTBCN0UsIDB4MTBCN0YsIDB4MTBDMDAsIDB4MTBDMDEsXHJcbiAgICAweDEwQzAyLCAweDEwQzAzLCAweDEwQzA0LCAweDEwQzA1LCAweDEwQzA2LCAweDEwQzA3LCAweDEwQzA4LCAweDEwQzA5LFxyXG4gICAgMHgxMEMwQSwgMHgxMEMwQiwgMHgxMEMwQywgMHgxMEMwRCwgMHgxMEMwRSwgMHgxMEMwRiwgMHgxMEMxMCwgMHgxMEMxMSxcclxuICAgIDB4MTBDMTIsIDB4MTBDMTMsIDB4MTBDMTQsIDB4MTBDMTUsIDB4MTBDMTYsIDB4MTBDMTcsIDB4MTBDMTgsIDB4MTBDMTksXHJcbiAgICAweDEwQzFBLCAweDEwQzFCLCAweDEwQzFDLCAweDEwQzFELCAweDEwQzFFLCAweDEwQzFGLCAweDEwQzIwLCAweDEwQzIxLFxyXG4gICAgMHgxMEMyMiwgMHgxMEMyMywgMHgxMEMyNCwgMHgxMEMyNSwgMHgxMEMyNiwgMHgxMEMyNywgMHgxMEMyOCwgMHgxMEMyOSxcclxuICAgIDB4MTBDMkEsIDB4MTBDMkIsIDB4MTBDMkMsIDB4MTBDMkQsIDB4MTBDMkUsIDB4MTBDMkYsIDB4MTBDMzAsIDB4MTBDMzEsXHJcbiAgICAweDEwQzMyLCAweDEwQzMzLCAweDEwQzM0LCAweDEwQzM1LCAweDEwQzM2LCAweDEwQzM3LCAweDEwQzM4LCAweDEwQzM5LFxyXG4gICAgMHgxMEMzQSwgMHgxMEMzQiwgMHgxMEMzQywgMHgxMEMzRCwgMHgxMEMzRSwgMHgxMEMzRiwgMHgxMEM0MCwgMHgxMEM0MSxcclxuICAgIDB4MTBDNDIsIDB4MTBDNDMsIDB4MTBDNDQsIDB4MTBDNDUsIDB4MTBDNDYsIDB4MTBDNDcsIDB4MTBDNDgsIDB4MUVFMDAsXHJcbiAgICAweDFFRTAxLCAweDFFRTAyLCAweDFFRTAzLCAweDFFRTA1LCAweDFFRTA2LCAweDFFRTA3LCAweDFFRTA4LCAweDFFRTA5LFxyXG4gICAgMHgxRUUwQSwgMHgxRUUwQiwgMHgxRUUwQywgMHgxRUUwRCwgMHgxRUUwRSwgMHgxRUUwRiwgMHgxRUUxMCwgMHgxRUUxMSxcclxuICAgIDB4MUVFMTIsIDB4MUVFMTMsIDB4MUVFMTQsIDB4MUVFMTUsIDB4MUVFMTYsIDB4MUVFMTcsIDB4MUVFMTgsIDB4MUVFMTksXHJcbiAgICAweDFFRTFBLCAweDFFRTFCLCAweDFFRTFDLCAweDFFRTFELCAweDFFRTFFLCAweDFFRTFGLCAweDFFRTIxLCAweDFFRTIyLFxyXG4gICAgMHgxRUUyNCwgMHgxRUUyNywgMHgxRUUyOSwgMHgxRUUyQSwgMHgxRUUyQiwgMHgxRUUyQywgMHgxRUUyRCwgMHgxRUUyRSxcclxuICAgIDB4MUVFMkYsIDB4MUVFMzAsIDB4MUVFMzEsIDB4MUVFMzIsIDB4MUVFMzQsIDB4MUVFMzUsIDB4MUVFMzYsIDB4MUVFMzcsXHJcbiAgICAweDFFRTM5LCAweDFFRTNCLCAweDFFRTQyLCAweDFFRTQ3LCAweDFFRTQ5LCAweDFFRTRCLCAweDFFRTRELCAweDFFRTRFLFxyXG4gICAgMHgxRUU0RiwgMHgxRUU1MSwgMHgxRUU1MiwgMHgxRUU1NCwgMHgxRUU1NywgMHgxRUU1OSwgMHgxRUU1QiwgMHgxRUU1RCxcclxuICAgIDB4MUVFNUYsIDB4MUVFNjEsIDB4MUVFNjIsIDB4MUVFNjQsIDB4MUVFNjcsIDB4MUVFNjgsIDB4MUVFNjksIDB4MUVFNkEsXHJcbiAgICAweDFFRTZDLCAweDFFRTZELCAweDFFRTZFLCAweDFFRTZGLCAweDFFRTcwLCAweDFFRTcxLCAweDFFRTcyLCAweDFFRTc0LFxyXG4gICAgMHgxRUU3NSwgMHgxRUU3NiwgMHgxRUU3NywgMHgxRUU3OSwgMHgxRUU3QSwgMHgxRUU3QiwgMHgxRUU3QywgMHgxRUU3RSxcclxuICAgIDB4MUVFODAsIDB4MUVFODEsIDB4MUVFODIsIDB4MUVFODMsIDB4MUVFODQsIDB4MUVFODUsIDB4MUVFODYsIDB4MUVFODcsXHJcbiAgICAweDFFRTg4LCAweDFFRTg5LCAweDFFRThCLCAweDFFRThDLCAweDFFRThELCAweDFFRThFLCAweDFFRThGLCAweDFFRTkwLFxyXG4gICAgMHgxRUU5MSwgMHgxRUU5MiwgMHgxRUU5MywgMHgxRUU5NCwgMHgxRUU5NSwgMHgxRUU5NiwgMHgxRUU5NywgMHgxRUU5OCxcclxuICAgIDB4MUVFOTksIDB4MUVFOUEsIDB4MUVFOUIsIDB4MUVFQTEsIDB4MUVFQTIsIDB4MUVFQTMsIDB4MUVFQTUsIDB4MUVFQTYsXHJcbiAgICAweDFFRUE3LCAweDFFRUE4LCAweDFFRUE5LCAweDFFRUFCLCAweDFFRUFDLCAweDFFRUFELCAweDFFRUFFLCAweDFFRUFGLFxyXG4gICAgMHgxRUVCMCwgMHgxRUVCMSwgMHgxRUVCMiwgMHgxRUVCMywgMHgxRUVCNCwgMHgxRUVCNSwgMHgxRUVCNiwgMHgxRUVCNyxcclxuICAgIDB4MUVFQjgsIDB4MUVFQjksIDB4MUVFQkEsIDB4MUVFQkIsIDB4MTBGRkZEXTtcclxuXHJcbmZ1bmN0aW9uIGRldGVybWluZUJpZGkoY3VlRGl2KSB7XHJcbiAgICB2YXIgbm9kZVN0YWNrID0gW10sXHJcbiAgICAgICAgdGV4dCA9IFwiXCIsXHJcbiAgICAgICAgY2hhckNvZGU7XHJcblxyXG4gICAgaWYgKCFjdWVEaXYgfHwgIWN1ZURpdi5jaGlsZE5vZGVzKSB7XHJcbiAgICAgICAgcmV0dXJuIFwibHRyXCI7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcHVzaE5vZGVzKG5vZGVTdGFjaywgbm9kZSkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSBub2RlLmNoaWxkTm9kZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgbm9kZVN0YWNrLnB1c2gobm9kZS5jaGlsZE5vZGVzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbmV4dFRleHROb2RlKG5vZGVTdGFjaykge1xyXG4gICAgICAgIGlmICghbm9kZVN0YWNrIHx8ICFub2RlU3RhY2subGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIG5vZGUgPSBub2RlU3RhY2sucG9wKCksXHJcbiAgICAgICAgICAgIHRleHQgPSBub2RlLnRleHRDb250ZW50IHx8IG5vZGUuaW5uZXJUZXh0O1xyXG4gICAgICAgIGlmICh0ZXh0KSB7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IFRoaXMgc2hvdWxkIG1hdGNoIGFsbCB1bmljb2RlIHR5cGUgQiBjaGFyYWN0ZXJzIChwYXJhZ3JhcGhcclxuICAgICAgICAgICAgLy8gc2VwYXJhdG9yIGNoYXJhY3RlcnMpLiBTZWUgaXNzdWUgIzExNS5cclxuICAgICAgICAgICAgdmFyIG0gPSB0ZXh0Lm1hdGNoKC9eLiooXFxufFxccikvKTtcclxuICAgICAgICAgICAgaWYgKG0pIHtcclxuICAgICAgICAgICAgICAgIG5vZGVTdGFjay5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1bMF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRleHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChub2RlLnRhZ05hbWUgPT09IFwicnVieVwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXh0VGV4dE5vZGUobm9kZVN0YWNrKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5vZGUuY2hpbGROb2Rlcykge1xyXG4gICAgICAgICAgICBwdXNoTm9kZXMobm9kZVN0YWNrLCBub2RlKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5leHRUZXh0Tm9kZShub2RlU3RhY2spO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdXNoTm9kZXMobm9kZVN0YWNrLCBjdWVEaXYpO1xyXG4gICAgd2hpbGUgKCh0ZXh0ID0gbmV4dFRleHROb2RlKG5vZGVTdGFjaykpKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZXh0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNoYXJDb2RlID0gdGV4dC5jaGFyQ29kZUF0KGkpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHN0cm9uZ1JUTENoYXJzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3Ryb25nUlRMQ2hhcnNbal0gPT09IGNoYXJDb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwicnRsXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gXCJsdHJcIjtcclxufVxyXG5cclxuZnVuY3Rpb24gY29tcHV0ZUxpbmVQb3MoY3VlKSB7XHJcbiAgICBpZiAodHlwZW9mIGN1ZS5saW5lID09PSBcIm51bWJlclwiICYmXHJcbiAgICAgICAgKGN1ZS5zbmFwVG9MaW5lcyB8fCAoY3VlLmxpbmUgPj0gMCAmJiBjdWUubGluZSA8PSAxMDApKSkge1xyXG4gICAgICAgIHJldHVybiBjdWUubGluZTtcclxuICAgIH1cclxuICAgIGlmICghY3VlLnRyYWNrIHx8ICFjdWUudHJhY2sudGV4dFRyYWNrTGlzdCB8fFxyXG4gICAgICAgICFjdWUudHJhY2sudGV4dFRyYWNrTGlzdC5tZWRpYUVsZW1lbnQpIHtcclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcbiAgICB2YXIgdHJhY2sgPSBjdWUudHJhY2ssXHJcbiAgICAgICAgdHJhY2tMaXN0ID0gdHJhY2sudGV4dFRyYWNrTGlzdCxcclxuICAgICAgICBjb3VudCA9IDA7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRyYWNrTGlzdC5sZW5ndGggJiYgdHJhY2tMaXN0W2ldICE9PSB0cmFjazsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHRyYWNrTGlzdFtpXS5tb2RlID09PSBcInNob3dpbmdcIikge1xyXG4gICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiArK2NvdW50ICogLTE7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIFN0eWxlQm94KCkge1xyXG59XHJcblxyXG4vLyBBcHBseSBzdHlsZXMgdG8gYSBkaXYuIElmIHRoZXJlIGlzIG5vIGRpdiBwYXNzZWQgdGhlbiBpdCBkZWZhdWx0cyB0byB0aGVcclxuLy8gZGl2IG9uICd0aGlzJy5cclxuU3R5bGVCb3gucHJvdG90eXBlLmFwcGx5U3R5bGVzID0gZnVuY3Rpb24oc3R5bGVzLCBkaXYpIHtcclxuICAgIGRpdiA9IGRpdiB8fCB0aGlzLmRpdjtcclxuICAgIGZvciAodmFyIHByb3AgaW4gc3R5bGVzKSB7XHJcbiAgICAgICAgaWYgKHN0eWxlcy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xyXG4gICAgICAgICAgICBkaXYuc3R5bGVbcHJvcF0gPSBzdHlsZXNbcHJvcF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuU3R5bGVCb3gucHJvdG90eXBlLmZvcm1hdFN0eWxlID0gZnVuY3Rpb24odmFsLCB1bml0KSB7XHJcbiAgICByZXR1cm4gdmFsID09PSAwID8gMCA6IHZhbCArIHVuaXQ7XHJcbn07XHJcblxyXG4vLyBDb25zdHJ1Y3RzIHRoZSBjb21wdXRlZCBkaXNwbGF5IHN0YXRlIG9mIHRoZSBjdWUgKGEgZGl2KS4gUGxhY2VzIHRoZSBkaXZcclxuLy8gaW50byB0aGUgb3ZlcmxheSB3aGljaCBzaG91bGQgYmUgYSBibG9jayBsZXZlbCBlbGVtZW50ICh1c3VhbGx5IGEgZGl2KS5cclxuZnVuY3Rpb24gQ3VlU3R5bGVCb3god2luZG93LCBjdWUsIHN0eWxlT3B0aW9ucykge1xyXG4gICAgdmFyIGlzSUU4ID0gKHR5cGVvZiBuYXZpZ2F0b3IgIT09IFwidW5kZWZpbmVkXCIpICYmXHJcbiAgICAgICAgKC9NU0lFXFxzOFxcLjAvKS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xyXG4gICAgdmFyIGNvbG9yID0gXCJyZ2JhKDI1NSwgMjU1LCAyNTUsIDEpXCI7XHJcbiAgICB2YXIgYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsIDAsIDAsIDAuOClcIjtcclxuICAgIHZhciB0ZXh0U2hhZG93ID0gXCJcIjtcclxuXHJcbiAgICBpZih0eXBlb2YgV2ViVlRUU2V0ICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgY29sb3IgPSBXZWJWVFRTZXQuZm9udFNldDtcclxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3IgPSBXZWJWVFRTZXQuYmFja2dyb3VuZFNldDtcclxuICAgICAgICB0ZXh0U2hhZG93ID0gV2ViVlRUU2V0LmVkZ2VTZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzSUU4KSB7XHJcbiAgICAgICAgY29sb3IgPSBcInJnYigyNTUsIDI1NSwgMjU1KVwiO1xyXG4gICAgICAgIGJhY2tncm91bmRDb2xvciA9IFwicmdiKDAsIDAsIDApXCI7XHJcbiAgICB9XHJcblxyXG4gICAgU3R5bGVCb3guY2FsbCh0aGlzKTtcclxuICAgIHRoaXMuY3VlID0gY3VlO1xyXG5cclxuICAgIC8vIFBhcnNlIG91ciBjdWUncyB0ZXh0IGludG8gYSBET00gdHJlZSByb290ZWQgYXQgJ2N1ZURpdicuIFRoaXMgZGl2IHdpbGxcclxuICAgIC8vIGhhdmUgaW5saW5lIHBvc2l0aW9uaW5nIGFuZCB3aWxsIGZ1bmN0aW9uIGFzIHRoZSBjdWUgYmFja2dyb3VuZCBib3guXHJcbiAgICB0aGlzLmN1ZURpdiA9IHBhcnNlQ29udGVudCh3aW5kb3csIGN1ZS50ZXh0KTtcclxuICAgIHZhciBzdHlsZXMgPSB7XHJcbiAgICAgICAgY29sb3I6IGNvbG9yLFxyXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogYmFja2dyb3VuZENvbG9yLFxyXG4gICAgICAgIHRleHRTaGFkb3c6IHRleHRTaGFkb3csXHJcbiAgICAgICAgcG9zaXRpb246IFwicmVsYXRpdmVcIixcclxuICAgICAgICBsZWZ0OiAwLFxyXG4gICAgICAgIHJpZ2h0OiAwLFxyXG4gICAgICAgIHRvcDogMCxcclxuICAgICAgICBib3R0b206IDAsXHJcbiAgICAgICAgZGlzcGxheTogXCJpbmxpbmVcIlxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoIWlzSUU4KSB7XHJcbiAgICAgICAgc3R5bGVzLndyaXRpbmdNb2RlID0gY3VlLnZlcnRpY2FsID09PSBcIlwiID8gXCJob3Jpem9udGFsLXRiXCJcclxuICAgICAgICAgICAgOiBjdWUudmVydGljYWwgPT09IFwibHJcIiA/IFwidmVydGljYWwtbHJcIlxyXG4gICAgICAgICAgICA6IFwidmVydGljYWwtcmxcIjtcclxuICAgICAgICBzdHlsZXMudW5pY29kZUJpZGkgPSBcInBsYWludGV4dFwiO1xyXG4gICAgfVxyXG4gICAgdGhpcy5hcHBseVN0eWxlcyhzdHlsZXMsIHRoaXMuY3VlRGl2KTtcclxuXHJcbiAgICAvLyBDcmVhdGUgYW4gYWJzb2x1dGVseSBwb3NpdGlvbmVkIGRpdiB0aGF0IHdpbGwgYmUgdXNlZCB0byBwb3NpdGlvbiB0aGUgY3VlXHJcbiAgICAvLyBkaXYuIE5vdGUsIGFsbCBXZWJWVFQgY3VlLXNldHRpbmcgYWxpZ25tZW50cyBhcmUgZXF1aXZhbGVudCB0byB0aGUgQ1NTXHJcbiAgICAvLyBtaXJyb3JzIG9mIHRoZW0gZXhjZXB0IFwibWlkZGxlXCIgd2hpY2ggaXMgXCJjZW50ZXJcIiBpbiBDU1MuXHJcbiAgICB0aGlzLmRpdiA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgc3R5bGVzID0ge1xyXG4gICAgICAgIHRleHRBbGlnbjogY3VlLmFsaWduID09PSBcIm1pZGRsZVwiID8gXCJjZW50ZXJcIiA6IGN1ZS5hbGlnbixcclxuICAgICAgICBmb250OiBzdHlsZU9wdGlvbnMuZm9udCxcclxuICAgICAgICB3aGl0ZVNwYWNlOiBcInByZS1saW5lXCIsXHJcbiAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIlxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoIWlzSUU4KSB7XHJcbiAgICAgICAgc3R5bGVzLmRpcmVjdGlvbiA9IGRldGVybWluZUJpZGkodGhpcy5jdWVEaXYpO1xyXG4gICAgICAgIHN0eWxlcy53cml0aW5nTW9kZSA9IGN1ZS52ZXJ0aWNhbCA9PT0gXCJcIiA/IFwiaG9yaXpvbnRhbC10YlwiXHJcbiAgICAgICAgICAgIDogY3VlLnZlcnRpY2FsID09PSBcImxyXCIgPyBcInZlcnRpY2FsLWxyXCJcclxuICAgICAgICAgICAgOiBcInZlcnRpY2FsLXJsXCIuXHJcbiAgICAgICAgICAgIHN0eWxlc3VuaWNvZGVCaWRpID0gIFwicGxhaW50ZXh0XCI7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hcHBseVN0eWxlcyhzdHlsZXMpO1xyXG5cclxuICAgIHRoaXMuZGl2LmFwcGVuZENoaWxkKHRoaXMuY3VlRGl2KTtcclxuXHJcbiAgICAvLyBDYWxjdWxhdGUgdGhlIGRpc3RhbmNlIGZyb20gdGhlIHJlZmVyZW5jZSBlZGdlIG9mIHRoZSB2aWV3cG9ydCB0byB0aGUgdGV4dFxyXG4gICAgLy8gcG9zaXRpb24gb2YgdGhlIGN1ZSBib3guIFRoZSByZWZlcmVuY2UgZWRnZSB3aWxsIGJlIHJlc29sdmVkIGxhdGVyIHdoZW5cclxuICAgIC8vIHRoZSBib3ggb3JpZW50YXRpb24gc3R5bGVzIGFyZSBhcHBsaWVkLlxyXG4gICAgdmFyIHRleHRQb3MgPSAwO1xyXG4gICAgc3dpdGNoIChjdWUucG9zaXRpb25BbGlnbikge1xyXG4gICAgICAgIGNhc2UgXCJzdGFydFwiOlxyXG4gICAgICAgICAgICB0ZXh0UG9zID0gY3VlLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwibWlkZGxlXCI6XHJcbiAgICAgICAgICAgIHRleHRQb3MgPSBjdWUucG9zaXRpb24gLSAoY3VlLnNpemUgLyAyKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImVuZFwiOlxyXG4gICAgICAgICAgICB0ZXh0UG9zID0gY3VlLnBvc2l0aW9uIC0gY3VlLnNpemU7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEhvcml6b250YWwgYm94IG9yaWVudGF0aW9uOyB0ZXh0UG9zIGlzIHRoZSBkaXN0YW5jZSBmcm9tIHRoZSBsZWZ0IGVkZ2Ugb2YgdGhlXHJcbiAgICAvLyBhcmVhIHRvIHRoZSBsZWZ0IGVkZ2Ugb2YgdGhlIGJveCBhbmQgY3VlLnNpemUgaXMgdGhlIGRpc3RhbmNlIGV4dGVuZGluZyB0b1xyXG4gICAgLy8gdGhlIHJpZ2h0IGZyb20gdGhlcmUuXHJcbiAgICBpZiAoY3VlLnZlcnRpY2FsID09PSBcIlwiKSB7XHJcbiAgICAgICAgdGhpcy5hcHBseVN0eWxlcyh7XHJcbiAgICAgICAgICAgIGxlZnQ6ICB0aGlzLmZvcm1hdFN0eWxlKHRleHRQb3MsIFwiJVwiKSxcclxuICAgICAgICAgICAgd2lkdGg6IHRoaXMuZm9ybWF0U3R5bGUoY3VlLnNpemUsIFwiJVwiKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIFZlcnRpY2FsIGJveCBvcmllbnRhdGlvbjsgdGV4dFBvcyBpcyB0aGUgZGlzdGFuY2UgZnJvbSB0aGUgdG9wIGVkZ2Ugb2YgdGhlXHJcbiAgICAgICAgLy8gYXJlYSB0byB0aGUgdG9wIGVkZ2Ugb2YgdGhlIGJveCBhbmQgY3VlLnNpemUgaXMgdGhlIGhlaWdodCBleHRlbmRpbmdcclxuICAgICAgICAvLyBkb3dud2FyZHMgZnJvbSB0aGVyZS5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5hcHBseVN0eWxlcyh7XHJcbiAgICAgICAgICAgIHRvcDogdGhpcy5mb3JtYXRTdHlsZSh0ZXh0UG9zLCBcIiVcIiksXHJcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5mb3JtYXRTdHlsZShjdWUuc2l6ZSwgXCIlXCIpXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5tb3ZlID0gZnVuY3Rpb24oYm94KSB7XHJcbiAgICAgICAgdGhpcy5hcHBseVN0eWxlcyh7XHJcbiAgICAgICAgICAgIHRvcDogdGhpcy5mb3JtYXRTdHlsZShib3gudG9wLCBcInB4XCIpLFxyXG4gICAgICAgICAgICBib3R0b206IHRoaXMuZm9ybWF0U3R5bGUoYm94LmJvdHRvbSwgXCJweFwiKSxcclxuICAgICAgICAgICAgbGVmdDogdGhpcy5mb3JtYXRTdHlsZShib3gubGVmdCwgXCJweFwiKSxcclxuICAgICAgICAgICAgcmlnaHQ6IHRoaXMuZm9ybWF0U3R5bGUoYm94LnJpZ2h0LCBcInB4XCIpLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMuZm9ybWF0U3R5bGUoYm94LmhlaWdodCwgXCJweFwiKSxcclxuICAgICAgICAgICAgd2lkdGg6IHRoaXMuZm9ybWF0U3R5bGUoYm94LndpZHRoLCBcInB4XCIpXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG59XHJcbkN1ZVN0eWxlQm94LnByb3RvdHlwZSA9IF9vYmpDcmVhdGUoU3R5bGVCb3gucHJvdG90eXBlKTtcclxuQ3VlU3R5bGVCb3gucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ3VlU3R5bGVCb3g7XHJcblxyXG4vLyBSZXByZXNlbnRzIHRoZSBjby1vcmRpbmF0ZXMgb2YgYW4gRWxlbWVudCBpbiBhIHdheSB0aGF0IHdlIGNhbiBlYXNpbHlcclxuLy8gY29tcHV0ZSB0aGluZ3Mgd2l0aCBzdWNoIGFzIGlmIGl0IG92ZXJsYXBzIG9yIGludGVyc2VjdHMgd2l0aCBhbm90aGVyIEVsZW1lbnQuXHJcbi8vIENhbiBpbml0aWFsaXplIGl0IHdpdGggZWl0aGVyIGEgU3R5bGVCb3ggb3IgYW5vdGhlciBCb3hQb3NpdGlvbi5cclxuZnVuY3Rpb24gQm94UG9zaXRpb24ob2JqKSB7XHJcbiAgICB2YXIgaXNJRTggPSAodHlwZW9mIG5hdmlnYXRvciAhPT0gXCJ1bmRlZmluZWRcIikgJiZcclxuICAgICAgICAoL01TSUVcXHM4XFwuMC8pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XHJcblxyXG4gICAgLy8gRWl0aGVyIGEgQm94UG9zaXRpb24gd2FzIHBhc3NlZCBpbiBhbmQgd2UgbmVlZCB0byBjb3B5IGl0LCBvciBhIFN0eWxlQm94XHJcbiAgICAvLyB3YXMgcGFzc2VkIGluIGFuZCB3ZSBuZWVkIHRvIGNvcHkgdGhlIHJlc3VsdHMgb2YgJ2dldEJvdW5kaW5nQ2xpZW50UmVjdCdcclxuICAgIC8vIGFzIHRoZSBvYmplY3QgcmV0dXJuZWQgaXMgcmVhZG9ubHkuIEFsbCBjby1vcmRpbmF0ZSB2YWx1ZXMgYXJlIGluIHJlZmVyZW5jZVxyXG4gICAgLy8gdG8gdGhlIHZpZXdwb3J0IG9yaWdpbiAodG9wIGxlZnQpLlxyXG4gICAgdmFyIGxoLCBoZWlnaHQsIHdpZHRoLCB0b3A7XHJcbiAgICBpZiAob2JqLmRpdikge1xyXG4gICAgICAgIGhlaWdodCA9IG9iai5kaXYub2Zmc2V0SGVpZ2h0O1xyXG4gICAgICAgIHdpZHRoID0gb2JqLmRpdi5vZmZzZXRXaWR0aDtcclxuICAgICAgICB0b3AgPSBvYmouZGl2Lm9mZnNldFRvcDtcclxuXHJcbiAgICAgICAgdmFyIHJlY3RzID0gKHJlY3RzID0gb2JqLmRpdi5jaGlsZE5vZGVzKSAmJiAocmVjdHMgPSByZWN0c1swXSkgJiZcclxuICAgICAgICAgICAgcmVjdHMuZ2V0Q2xpZW50UmVjdHMgJiYgcmVjdHMuZ2V0Q2xpZW50UmVjdHMoKTtcclxuICAgICAgICBvYmogPSBvYmouZGl2LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIC8vIEluIGNlcnRhaW4gY2FzZXMgdGhlIG91dHRlciBkaXYgd2lsbCBiZSBzbGlnaHRseSBsYXJnZXIgdGhlbiB0aGUgc3VtIG9mXHJcbiAgICAgICAgLy8gdGhlIGlubmVyIGRpdidzIGxpbmVzLiBUaGlzIGNvdWxkIGJlIGR1ZSB0byBib2xkIHRleHQsIGV0Yywgb24gc29tZSBwbGF0Zm9ybXMuXHJcbiAgICAgICAgLy8gSW4gdGhpcyBjYXNlIHdlIHNob3VsZCBnZXQgdGhlIGF2ZXJhZ2UgbGluZSBoZWlnaHQgYW5kIHVzZSB0aGF0LiBUaGlzIHdpbGxcclxuICAgICAgICAvLyByZXN1bHQgaW4gdGhlIGRlc2lyZWQgYmVoYXZpb3VyLlxyXG4gICAgICAgIGxoID0gcmVjdHMgPyBNYXRoLm1heCgocmVjdHNbMF0gJiYgcmVjdHNbMF0uaGVpZ2h0KSB8fCAwLCBvYmouaGVpZ2h0IC8gcmVjdHMubGVuZ3RoKVxyXG4gICAgICAgICAgICA6IDA7XHJcblxyXG4gICAgfVxyXG4gICAgdGhpcy5sZWZ0ID0gb2JqLmxlZnQ7XHJcbiAgICB0aGlzLnJpZ2h0ID0gb2JqLnJpZ2h0O1xyXG4gICAgdGhpcy50b3AgPSBvYmoudG9wIHx8IHRvcDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gb2JqLmhlaWdodCB8fCBoZWlnaHQ7XHJcbiAgICB0aGlzLmJvdHRvbSA9IG9iai5ib3R0b20gfHwgKHRvcCArIChvYmouaGVpZ2h0IHx8IGhlaWdodCkpO1xyXG4gICAgdGhpcy53aWR0aCA9IG9iai53aWR0aCB8fCB3aWR0aDtcclxuICAgIHRoaXMubGluZUhlaWdodCA9IGxoICE9PSB1bmRlZmluZWQgPyBsaCA6IG9iai5saW5lSGVpZ2h0O1xyXG5cclxuICAgIGlmIChpc0lFOCAmJiAhdGhpcy5saW5lSGVpZ2h0KSB7XHJcbiAgICAgICAgdGhpcy5saW5lSGVpZ2h0ID0gMTM7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIE1vdmUgdGhlIGJveCBhbG9uZyBhIHBhcnRpY3VsYXIgYXhpcy4gT3B0aW9uYWxseSBwYXNzIGluIGFuIGFtb3VudCB0byBtb3ZlXHJcbi8vIHRoZSBib3guIElmIG5vIGFtb3VudCBpcyBwYXNzZWQgdGhlbiB0aGUgZGVmYXVsdCBpcyB0aGUgbGluZSBoZWlnaHQgb2YgdGhlXHJcbi8vIGJveC5cclxuQm94UG9zaXRpb24ucHJvdG90eXBlLm1vdmUgPSBmdW5jdGlvbihheGlzLCB0b01vdmUpIHtcclxuICAgIHRvTW92ZSA9IHRvTW92ZSAhPT0gdW5kZWZpbmVkID8gdG9Nb3ZlIDogdGhpcy5saW5lSGVpZ2h0O1xyXG4gICAgc3dpdGNoIChheGlzKSB7XHJcbiAgICAgICAgY2FzZSBcIit4XCI6XHJcbiAgICAgICAgICAgIHRoaXMubGVmdCArPSB0b01vdmU7XHJcbiAgICAgICAgICAgIHRoaXMucmlnaHQgKz0gdG9Nb3ZlO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiLXhcIjpcclxuICAgICAgICAgICAgdGhpcy5sZWZ0IC09IHRvTW92ZTtcclxuICAgICAgICAgICAgdGhpcy5yaWdodCAtPSB0b01vdmU7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCIreVwiOlxyXG4gICAgICAgICAgICB0aGlzLnRvcCArPSB0b01vdmU7XHJcbiAgICAgICAgICAgIHRoaXMuYm90dG9tICs9IHRvTW92ZTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcIi15XCI6XHJcbiAgICAgICAgICAgIHRoaXMudG9wIC09IHRvTW92ZTtcclxuICAgICAgICAgICAgdGhpcy5ib3R0b20gLT0gdG9Nb3ZlO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxufTtcclxuXHJcbi8vIENoZWNrIGlmIHRoaXMgYm94IG92ZXJsYXBzIGFub3RoZXIgYm94LCBiMi5cclxuQm94UG9zaXRpb24ucHJvdG90eXBlLm92ZXJsYXBzID0gZnVuY3Rpb24oYjIpIHtcclxuICAgIHJldHVybiB0aGlzLmxlZnQgPCBiMi5yaWdodCAmJlxyXG4gICAgICAgIHRoaXMucmlnaHQgPiBiMi5sZWZ0ICYmXHJcbiAgICAgICAgdGhpcy50b3AgPCBiMi5ib3R0b20gJiZcclxuICAgICAgICB0aGlzLmJvdHRvbSA+IGIyLnRvcDtcclxufTtcclxuXHJcbi8vIENoZWNrIGlmIHRoaXMgYm94IG92ZXJsYXBzIGFueSBvdGhlciBib3hlcyBpbiBib3hlcy5cclxuQm94UG9zaXRpb24ucHJvdG90eXBlLm92ZXJsYXBzQW55ID0gZnVuY3Rpb24oYm94ZXMpIHtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYm94ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAodGhpcy5vdmVybGFwcyhib3hlc1tpXSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuLy8gQ2hlY2sgaWYgdGhpcyBib3ggaXMgd2l0aGluIGFub3RoZXIgYm94LlxyXG5Cb3hQb3NpdGlvbi5wcm90b3R5cGUud2l0aGluID0gZnVuY3Rpb24oY29udGFpbmVyKSB7XHJcbiAgICByZXR1cm4gdGhpcy50b3AgPj0gY29udGFpbmVyLnRvcCAmJlxyXG4gICAgICAgIHRoaXMuYm90dG9tIDw9IGNvbnRhaW5lci5ib3R0b20gJiZcclxuICAgICAgICB0aGlzLmxlZnQgPj0gY29udGFpbmVyLmxlZnQgJiZcclxuICAgICAgICB0aGlzLnJpZ2h0IDw9IGNvbnRhaW5lci5yaWdodDtcclxufTtcclxuXHJcbi8vIENoZWNrIGlmIHRoaXMgYm94IGlzIGVudGlyZWx5IHdpdGhpbiB0aGUgY29udGFpbmVyIG9yIGl0IGlzIG92ZXJsYXBwaW5nXHJcbi8vIG9uIHRoZSBlZGdlIG9wcG9zaXRlIG9mIHRoZSBheGlzIGRpcmVjdGlvbiBwYXNzZWQuIEZvciBleGFtcGxlLCBpZiBcIit4XCIgaXNcclxuLy8gcGFzc2VkIGFuZCB0aGUgYm94IGlzIG92ZXJsYXBwaW5nIG9uIHRoZSBsZWZ0IGVkZ2Ugb2YgdGhlIGNvbnRhaW5lciwgdGhlblxyXG4vLyByZXR1cm4gdHJ1ZS5cclxuQm94UG9zaXRpb24ucHJvdG90eXBlLm92ZXJsYXBzT3Bwb3NpdGVBeGlzID0gZnVuY3Rpb24oY29udGFpbmVyLCBheGlzKSB7XHJcbiAgICBzd2l0Y2ggKGF4aXMpIHtcclxuICAgICAgICBjYXNlIFwiK3hcIjpcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGVmdCA8IGNvbnRhaW5lci5sZWZ0O1xyXG4gICAgICAgIGNhc2UgXCIteFwiOlxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yaWdodCA+IGNvbnRhaW5lci5yaWdodDtcclxuICAgICAgICBjYXNlIFwiK3lcIjpcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9wIDwgY29udGFpbmVyLnRvcDtcclxuICAgICAgICBjYXNlIFwiLXlcIjpcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYm90dG9tID4gY29udGFpbmVyLmJvdHRvbTtcclxuICAgIH1cclxufTtcclxuXHJcbi8vIEZpbmQgdGhlIHBlcmNlbnRhZ2Ugb2YgdGhlIGFyZWEgdGhhdCB0aGlzIGJveCBpcyBvdmVybGFwcGluZyB3aXRoIGFub3RoZXJcclxuLy8gYm94LlxyXG5Cb3hQb3NpdGlvbi5wcm90b3R5cGUuaW50ZXJzZWN0UGVyY2VudGFnZSA9IGZ1bmN0aW9uKGIyKSB7XHJcbiAgICB2YXIgeCA9IE1hdGgubWF4KDAsIE1hdGgubWluKHRoaXMucmlnaHQsIGIyLnJpZ2h0KSAtIE1hdGgubWF4KHRoaXMubGVmdCwgYjIubGVmdCkpLFxyXG4gICAgICAgIHkgPSBNYXRoLm1heCgwLCBNYXRoLm1pbih0aGlzLmJvdHRvbSwgYjIuYm90dG9tKSAtIE1hdGgubWF4KHRoaXMudG9wLCBiMi50b3ApKSxcclxuICAgICAgICBpbnRlcnNlY3RBcmVhID0geCAqIHk7XHJcbiAgICByZXR1cm4gaW50ZXJzZWN0QXJlYSAvICh0aGlzLmhlaWdodCAqIHRoaXMud2lkdGgpO1xyXG59O1xyXG5cclxuLy8gQ29udmVydCB0aGUgcG9zaXRpb25zIGZyb20gdGhpcyBib3ggdG8gQ1NTIGNvbXBhdGlibGUgcG9zaXRpb25zIHVzaW5nXHJcbi8vIHRoZSByZWZlcmVuY2UgY29udGFpbmVyJ3MgcG9zaXRpb25zLiBUaGlzIGhhcyB0byBiZSBkb25lIGJlY2F1c2UgdGhpc1xyXG4vLyBib3gncyBwb3NpdGlvbnMgYXJlIGluIHJlZmVyZW5jZSB0byB0aGUgdmlld3BvcnQgb3JpZ2luLCB3aGVyZWFzLCBDU1NcclxuLy8gdmFsdWVzIGFyZSBpbiByZWZlcmVjbmUgdG8gdGhlaXIgcmVzcGVjdGl2ZSBlZGdlcy5cclxuQm94UG9zaXRpb24ucHJvdG90eXBlLnRvQ1NTQ29tcGF0VmFsdWVzID0gZnVuY3Rpb24ocmVmZXJlbmNlKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHRvcDogdGhpcy50b3AgLSByZWZlcmVuY2UudG9wLFxyXG4gICAgICAgIGJvdHRvbTogcmVmZXJlbmNlLmJvdHRvbSAtIHRoaXMuYm90dG9tLFxyXG4gICAgICAgIGxlZnQ6IHRoaXMubGVmdCAtIHJlZmVyZW5jZS5sZWZ0LFxyXG4gICAgICAgIHJpZ2h0OiByZWZlcmVuY2UucmlnaHQgLSB0aGlzLnJpZ2h0LFxyXG4gICAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQsXHJcbiAgICAgICAgd2lkdGg6IHRoaXMud2lkdGhcclxuICAgIH07XHJcbn07XHJcblxyXG4vLyBHZXQgYW4gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyB0aGUgYm94J3MgcG9zaXRpb24gd2l0aG91dCBhbnl0aGluZyBleHRyYS5cclxuLy8gQ2FuIHBhc3MgYSBTdHlsZUJveCwgSFRNTEVsZW1lbnQsIG9yIGFub3RoZXIgQm94UG9zaXRvbi5cclxuQm94UG9zaXRpb24uZ2V0U2ltcGxlQm94UG9zaXRpb24gPSBmdW5jdGlvbihvYmopIHtcclxuICAgIHZhciBoZWlnaHQgPSBvYmouZGl2ID8gb2JqLmRpdi5vZmZzZXRIZWlnaHQgOiBvYmoudGFnTmFtZSA/IG9iai5vZmZzZXRIZWlnaHQgOiAwO1xyXG4gICAgdmFyIHdpZHRoID0gb2JqLmRpdiA/IG9iai5kaXYub2Zmc2V0V2lkdGggOiBvYmoudGFnTmFtZSA/IG9iai5vZmZzZXRXaWR0aCA6IDA7XHJcbiAgICB2YXIgdG9wID0gb2JqLmRpdiA/IG9iai5kaXYub2Zmc2V0VG9wIDogb2JqLnRhZ05hbWUgPyBvYmoub2Zmc2V0VG9wIDogMDtcclxuXHJcbiAgICBvYmogPSBvYmouZGl2ID8gb2JqLmRpdi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSA6XHJcbiAgICAgICAgb2JqLnRhZ05hbWUgPyBvYmouZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkgOiBvYmo7XHJcbiAgICB2YXIgcmV0ID0ge1xyXG4gICAgICAgIGxlZnQ6IG9iai5sZWZ0LFxyXG4gICAgICAgIHJpZ2h0OiBvYmoucmlnaHQsXHJcbiAgICAgICAgdG9wOiBvYmoudG9wIHx8IHRvcCxcclxuICAgICAgICBoZWlnaHQ6IG9iai5oZWlnaHQgfHwgaGVpZ2h0LFxyXG4gICAgICAgIGJvdHRvbTogb2JqLmJvdHRvbSB8fCAodG9wICsgKG9iai5oZWlnaHQgfHwgaGVpZ2h0KSksXHJcbiAgICAgICAgd2lkdGg6IG9iai53aWR0aCB8fCB3aWR0aFxyXG4gICAgfTtcclxuICAgIHJldHVybiByZXQ7XHJcbn07XHJcblxyXG4vLyBNb3ZlIGEgU3R5bGVCb3ggdG8gaXRzIHNwZWNpZmllZCwgb3IgbmV4dCBiZXN0LCBwb3NpdGlvbi4gVGhlIGNvbnRhaW5lckJveFxyXG4vLyBpcyB0aGUgYm94IHRoYXQgY29udGFpbnMgdGhlIFN0eWxlQm94LCBzdWNoIGFzIGEgZGl2LiBib3hQb3NpdGlvbnMgYXJlXHJcbi8vIGEgbGlzdCBvZiBvdGhlciBib3hlcyB0aGF0IHRoZSBzdHlsZUJveCBjYW4ndCBvdmVybGFwIHdpdGguXHJcbmZ1bmN0aW9uIG1vdmVCb3hUb0xpbmVQb3NpdGlvbih3aW5kb3csIHN0eWxlQm94LCBjb250YWluZXJCb3gsIGJveFBvc2l0aW9ucykge1xyXG5cclxuICAgIC8vIEZpbmQgdGhlIGJlc3QgcG9zaXRpb24gZm9yIGEgY3VlIGJveCwgYiwgb24gdGhlIHZpZGVvLiBUaGUgYXhpcyBwYXJhbWV0ZXJcclxuICAgIC8vIGlzIGEgbGlzdCBvZiBheGlzLCB0aGUgb3JkZXIgb2Ygd2hpY2gsIGl0IHdpbGwgbW92ZSB0aGUgYm94IGFsb25nLiBGb3IgZXhhbXBsZTpcclxuICAgIC8vIFBhc3NpbmcgW1wiK3hcIiwgXCIteFwiXSB3aWxsIG1vdmUgdGhlIGJveCBmaXJzdCBhbG9uZyB0aGUgeCBheGlzIGluIHRoZSBwb3NpdGl2ZVxyXG4gICAgLy8gZGlyZWN0aW9uLiBJZiBpdCBkb2Vzbid0IGZpbmQgYSBnb29kIHBvc2l0aW9uIGZvciBpdCB0aGVyZSBpdCB3aWxsIHRoZW4gbW92ZVxyXG4gICAgLy8gaXQgYWxvbmcgdGhlIHggYXhpcyBpbiB0aGUgbmVnYXRpdmUgZGlyZWN0aW9uLlxyXG4gICAgZnVuY3Rpb24gZmluZEJlc3RQb3NpdGlvbihiLCBheGlzKSB7XHJcbiAgICAgICAgdmFyIGJlc3RQb3NpdGlvbixcclxuICAgICAgICAgICAgc3BlY2lmaWVkUG9zaXRpb24gPSBuZXcgQm94UG9zaXRpb24oYiksXHJcbiAgICAgICAgICAgIHBlcmNlbnRhZ2UgPSAxOyAvLyBIaWdoZXN0IHBvc3NpYmxlIHNvIHRoZSBmaXJzdCB0aGluZyB3ZSBnZXQgaXMgYmV0dGVyLlxyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGF4aXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgd2hpbGUgKGIub3ZlcmxhcHNPcHBvc2l0ZUF4aXMoY29udGFpbmVyQm94LCBheGlzW2ldKSB8fFxyXG4gICAgICAgICAgICAoYi53aXRoaW4oY29udGFpbmVyQm94KSAmJiBiLm92ZXJsYXBzQW55KGJveFBvc2l0aW9ucykpKSB7XHJcbiAgICAgICAgICAgICAgICBiLm1vdmUoYXhpc1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gV2UgZm91bmQgYSBzcG90IHdoZXJlIHdlIGFyZW4ndCBvdmVybGFwcGluZyBhbnl0aGluZy4gVGhpcyBpcyBvdXJcclxuICAgICAgICAgICAgLy8gYmVzdCBwb3NpdGlvbi5cclxuICAgICAgICAgICAgaWYgKGIud2l0aGluKGNvbnRhaW5lckJveCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBwID0gYi5pbnRlcnNlY3RQZXJjZW50YWdlKGNvbnRhaW5lckJveCk7XHJcbiAgICAgICAgICAgIC8vIElmIHdlJ3JlIG91dHNpZGUgdGhlIGNvbnRhaW5lciBib3ggbGVzcyB0aGVuIHdlIHdlcmUgb24gb3VyIGxhc3QgdHJ5XHJcbiAgICAgICAgICAgIC8vIHRoZW4gcmVtZW1iZXIgdGhpcyBwb3NpdGlvbiBhcyB0aGUgYmVzdCBwb3NpdGlvbi5cclxuICAgICAgICAgICAgaWYgKHBlcmNlbnRhZ2UgPiBwKSB7XHJcbiAgICAgICAgICAgICAgICBiZXN0UG9zaXRpb24gPSBuZXcgQm94UG9zaXRpb24oYik7XHJcbiAgICAgICAgICAgICAgICBwZXJjZW50YWdlID0gcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBSZXNldCB0aGUgYm94IHBvc2l0aW9uIHRvIHRoZSBzcGVjaWZpZWQgcG9zaXRpb24uXHJcbiAgICAgICAgICAgIGIgPSBuZXcgQm94UG9zaXRpb24oc3BlY2lmaWVkUG9zaXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYmVzdFBvc2l0aW9uIHx8IHNwZWNpZmllZFBvc2l0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBib3hQb3NpdGlvbiA9IG5ldyBCb3hQb3NpdGlvbihzdHlsZUJveCksXHJcbiAgICAgICAgY3VlID0gc3R5bGVCb3guY3VlLFxyXG4gICAgICAgIGxpbmVQb3MgPSBjb21wdXRlTGluZVBvcyhjdWUpLFxyXG4gICAgICAgIGF4aXMgPSBbXTtcclxuXHJcbiAgICAvLyBJZiB3ZSBoYXZlIGEgbGluZSBudW1iZXIgdG8gYWxpZ24gdGhlIGN1ZSB0by5cclxuICAgIGlmIChjdWUuc25hcFRvTGluZXMpIHtcclxuICAgICAgICB2YXIgc2l6ZTtcclxuICAgICAgICBzd2l0Y2ggKGN1ZS52ZXJ0aWNhbCkge1xyXG4gICAgICAgICAgICBjYXNlIFwiXCI6XHJcbiAgICAgICAgICAgICAgICBheGlzID0gWyBcIit5XCIsIFwiLXlcIiBdO1xyXG4gICAgICAgICAgICAgICAgc2l6ZSA9IFwiaGVpZ2h0XCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInJsXCI6XHJcbiAgICAgICAgICAgICAgICBheGlzID0gWyBcIit4XCIsIFwiLXhcIiBdO1xyXG4gICAgICAgICAgICAgICAgc2l6ZSA9IFwid2lkdGhcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwibHJcIjpcclxuICAgICAgICAgICAgICAgIGF4aXMgPSBbIFwiLXhcIiwgXCIreFwiIF07XHJcbiAgICAgICAgICAgICAgICBzaXplID0gXCJ3aWR0aFwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgc3RlcCA9IGJveFBvc2l0aW9uLmxpbmVIZWlnaHQsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uID0gc3RlcCAqIE1hdGgucm91bmQobGluZVBvcyksXHJcbiAgICAgICAgICAgIG1heFBvc2l0aW9uID0gY29udGFpbmVyQm94W3NpemVdICsgc3RlcCxcclxuICAgICAgICAgICAgaW5pdGlhbEF4aXMgPSBheGlzWzBdO1xyXG5cclxuICAgICAgICAvLyBJZiB0aGUgc3BlY2lmaWVkIGludGlhbCBwb3NpdGlvbiBpcyBncmVhdGVyIHRoZW4gdGhlIG1heCBwb3NpdGlvbiB0aGVuXHJcbiAgICAgICAgLy8gY2xhbXAgdGhlIGJveCB0byB0aGUgYW1vdW50IG9mIHN0ZXBzIGl0IHdvdWxkIHRha2UgZm9yIHRoZSBib3ggdG9cclxuICAgICAgICAvLyByZWFjaCB0aGUgbWF4IHBvc2l0aW9uLlxyXG4gICAgICAgIGlmIChNYXRoLmFicyhwb3NpdGlvbikgPiBtYXhQb3NpdGlvbikge1xyXG4gICAgICAgICAgICBwb3NpdGlvbiA9IHBvc2l0aW9uIDwgMCA/IC0xIDogMTtcclxuICAgICAgICAgICAgcG9zaXRpb24gKj0gTWF0aC5jZWlsKG1heFBvc2l0aW9uIC8gc3RlcCkgKiBzdGVwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSWYgY29tcHV0ZWQgbGluZSBwb3NpdGlvbiByZXR1cm5zIG5lZ2F0aXZlIHRoZW4gbGluZSBudW1iZXJzIGFyZVxyXG4gICAgICAgIC8vIHJlbGF0aXZlIHRvIHRoZSBib3R0b20gb2YgdGhlIHZpZGVvIGluc3RlYWQgb2YgdGhlIHRvcC4gVGhlcmVmb3JlLCB3ZVxyXG4gICAgICAgIC8vIG5lZWQgdG8gaW5jcmVhc2Ugb3VyIGluaXRpYWwgcG9zaXRpb24gYnkgdGhlIGxlbmd0aCBvciB3aWR0aCBvZiB0aGVcclxuICAgICAgICAvLyB2aWRlbywgZGVwZW5kaW5nIG9uIHRoZSB3cml0aW5nIGRpcmVjdGlvbiwgYW5kIHJldmVyc2Ugb3VyIGF4aXMgZGlyZWN0aW9ucy5cclxuICAgICAgICBpZiAobGluZVBvcyA8IDApIHtcclxuICAgICAgICAgICAgcG9zaXRpb24gKz0gY3VlLnZlcnRpY2FsID09PSBcIlwiID8gY29udGFpbmVyQm94LmhlaWdodCA6IGNvbnRhaW5lckJveC53aWR0aDtcclxuICAgICAgICAgICAgYXhpcyA9IGF4aXMucmV2ZXJzZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTW92ZSB0aGUgYm94IHRvIHRoZSBzcGVjaWZpZWQgcG9zaXRpb24uIFRoaXMgbWF5IG5vdCBiZSBpdHMgYmVzdFxyXG4gICAgICAgIC8vIHBvc2l0aW9uLlxyXG4gICAgICAgIGJveFBvc2l0aW9uLm1vdmUoaW5pdGlhbEF4aXMsIHBvc2l0aW9uKTtcclxuXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIElmIHdlIGhhdmUgYSBwZXJjZW50YWdlIGxpbmUgdmFsdWUgZm9yIHRoZSBjdWUuXHJcbiAgICAgICAgdmFyIGNhbGN1bGF0ZWRQZXJjZW50YWdlID0gKGJveFBvc2l0aW9uLmxpbmVIZWlnaHQgLyBjb250YWluZXJCb3guaGVpZ2h0KSAqIDEwMDtcclxuXHJcbiAgICAgICAgc3dpdGNoIChjdWUubGluZUFsaWduKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJtaWRkbGVcIjpcclxuICAgICAgICAgICAgICAgIGxpbmVQb3MgLT0gKGNhbGN1bGF0ZWRQZXJjZW50YWdlIC8gMik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxyXG4gICAgICAgICAgICAgICAgbGluZVBvcyAtPSBjYWxjdWxhdGVkUGVyY2VudGFnZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQXBwbHkgaW5pdGlhbCBsaW5lIHBvc2l0aW9uIHRvIHRoZSBjdWUgYm94LlxyXG4gICAgICAgIHN3aXRjaCAoY3VlLnZlcnRpY2FsKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJcIjpcclxuICAgICAgICAgICAgICAgIHN0eWxlQm94LmFwcGx5U3R5bGVzKHtcclxuICAgICAgICAgICAgICAgICAgICB0b3A6IHN0eWxlQm94LmZvcm1hdFN0eWxlKGxpbmVQb3MsIFwiJVwiKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInJsXCI6XHJcbiAgICAgICAgICAgICAgICBzdHlsZUJveC5hcHBseVN0eWxlcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogc3R5bGVCb3guZm9ybWF0U3R5bGUobGluZVBvcywgXCIlXCIpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwibHJcIjpcclxuICAgICAgICAgICAgICAgIHN0eWxlQm94LmFwcGx5U3R5bGVzKHtcclxuICAgICAgICAgICAgICAgICAgICByaWdodDogc3R5bGVCb3guZm9ybWF0U3R5bGUobGluZVBvcywgXCIlXCIpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYXhpcyA9IFsgXCIreVwiLCBcIi14XCIsIFwiK3hcIiwgXCIteVwiIF07XHJcblxyXG4gICAgICAgIC8vIEdldCB0aGUgYm94IHBvc2l0aW9uIGFnYWluIGFmdGVyIHdlJ3ZlIGFwcGxpZWQgdGhlIHNwZWNpZmllZCBwb3NpdGlvbmluZ1xyXG4gICAgICAgIC8vIHRvIGl0LlxyXG4gICAgICAgIGJveFBvc2l0aW9uID0gbmV3IEJveFBvc2l0aW9uKHN0eWxlQm94KTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgYmVzdFBvc2l0aW9uID0gZmluZEJlc3RQb3NpdGlvbihib3hQb3NpdGlvbiwgYXhpcyk7XHJcbiAgICBzdHlsZUJveC5tb3ZlKGJlc3RQb3NpdGlvbi50b0NTU0NvbXBhdFZhbHVlcyhjb250YWluZXJCb3gpKTtcclxufVxyXG5cclxuLypmdW5jdGlvbiBXZWJWVFQoKSB7XHJcbiAvLyBOb3RoaW5nXHJcbiB9Ki9cclxuXHJcbi8vIEhlbHBlciB0byBhbGxvdyBzdHJpbmdzIHRvIGJlIGRlY29kZWQgaW5zdGVhZCBvZiB0aGUgZGVmYXVsdCBiaW5hcnkgdXRmOCBkYXRhLlxyXG5XZWJWVFQuU3RyaW5nRGVjb2RlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBkZWNvZGU6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgaWYgKCFkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEgIT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVycm9yIC0gZXhwZWN0ZWQgc3RyaW5nIGRhdGEuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoZW5jb2RlVVJJQ29tcG9uZW50KGRhdGEpKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuV2ViVlRULmNvbnZlcnRDdWVUb0RPTVRyZWUgPSBmdW5jdGlvbih3aW5kb3csIGN1ZXRleHQpIHtcclxuICAgIGlmICghd2luZG93IHx8ICFjdWV0ZXh0KSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGFyc2VDb250ZW50KHdpbmRvdywgY3VldGV4dCk7XHJcbn07XHJcblxyXG52YXIgRk9OVF9TSVpFX1BFUkNFTlQgPSAwLjA1O1xyXG52YXIgRk9OVF9TVFlMRSA9IFwic2Fucy1zZXJpZlwiO1xyXG52YXIgQ1VFX0JBQ0tHUk9VTkRfUEFERElORyA9IFwiMS41JVwiO1xyXG5cclxuLy8gUnVucyB0aGUgcHJvY2Vzc2luZyBtb2RlbCBvdmVyIHRoZSBjdWVzIGFuZCByZWdpb25zIHBhc3NlZCB0byBpdC5cclxuLy8gQHBhcmFtIG92ZXJsYXkgQSBibG9jayBsZXZlbCBlbGVtZW50ICh1c3VhbGx5IGEgZGl2KSB0aGF0IHRoZSBjb21wdXRlZCBjdWVzXHJcbi8vICAgICAgICAgICAgICAgIGFuZCByZWdpb25zIHdpbGwgYmUgcGxhY2VkIGludG8uXHJcbldlYlZUVC5wcm9jZXNzQ3VlcyA9IGZ1bmN0aW9uKHdpbmRvdywgY3Vlcywgb3ZlcmxheSkge1xyXG4gICAgaWYgKCF3aW5kb3cgfHwgIWN1ZXMgfHwgIW92ZXJsYXkpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZW1vdmUgYWxsIHByZXZpb3VzIGNoaWxkcmVuLlxyXG4gICAgd2hpbGUgKG92ZXJsYXkuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgIG92ZXJsYXkucmVtb3ZlQ2hpbGQob3ZlcmxheS5maXJzdENoaWxkKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgcGFkZGVkT3ZlcmxheSA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgcGFkZGVkT3ZlcmxheS5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcclxuICAgIHBhZGRlZE92ZXJsYXkuc3R5bGUubGVmdCA9IFwiMFwiO1xyXG4gICAgcGFkZGVkT3ZlcmxheS5zdHlsZS5yaWdodCA9IFwiMFwiO1xyXG4gICAgcGFkZGVkT3ZlcmxheS5zdHlsZS50b3AgPSBcIjBcIjtcclxuICAgIHBhZGRlZE92ZXJsYXkuc3R5bGUuYm90dG9tID0gXCIwXCI7XHJcbiAgICBwYWRkZWRPdmVybGF5LnN0eWxlLm1hcmdpbiA9IENVRV9CQUNLR1JPVU5EX1BBRERJTkc7XHJcbiAgICBvdmVybGF5LmFwcGVuZENoaWxkKHBhZGRlZE92ZXJsYXkpO1xyXG5cclxuICAgIC8vIERldGVybWluZSBpZiB3ZSBuZWVkIHRvIGNvbXB1dGUgdGhlIGRpc3BsYXkgc3RhdGVzIG9mIHRoZSBjdWVzLiBUaGlzIGNvdWxkXHJcbiAgICAvLyBiZSB0aGUgY2FzZSBpZiBhIGN1ZSdzIHN0YXRlIGhhcyBiZWVuIGNoYW5nZWQgc2luY2UgdGhlIGxhc3QgY29tcHV0YXRpb24gb3JcclxuICAgIC8vIGlmIGl0IGhhcyBub3QgYmVlbiBjb21wdXRlZCB5ZXQuXHJcbiAgICBmdW5jdGlvbiBzaG91bGRDb21wdXRlKGN1ZXMpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGN1ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGN1ZXNbaV0uaGFzQmVlblJlc2V0IHx8ICFjdWVzW2ldLmRpc3BsYXlTdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFdlIGRvbid0IG5lZWQgdG8gcmVjb21wdXRlIHRoZSBjdWVzJyBkaXNwbGF5IHN0YXRlcy4gSnVzdCByZXVzZSB0aGVtLlxyXG4gICAgaWYgKCFzaG91bGRDb21wdXRlKGN1ZXMpKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjdWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHBhZGRlZE92ZXJsYXkuYXBwZW5kQ2hpbGQoY3Vlc1tpXS5kaXNwbGF5U3RhdGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGJveFBvc2l0aW9ucyA9IFtdLFxyXG4gICAgICAgIGNvbnRhaW5lckJveCA9IEJveFBvc2l0aW9uLmdldFNpbXBsZUJveFBvc2l0aW9uKHBhZGRlZE92ZXJsYXkpLFxyXG4gICAgICAgIGZvbnRTaXplID0gTWF0aC5yb3VuZChjb250YWluZXJCb3guaGVpZ2h0ICogRk9OVF9TSVpFX1BFUkNFTlQgKiAxMDApIC8gMTAwO1xyXG4gICAgdmFyIHN0eWxlT3B0aW9ucyA9IHtcclxuICAgICAgICBmb250OiAoZm9udFNpemUgKiBmb250U2NhbGUpICsgXCJweCBcIiArIEZPTlRfU1RZTEVcclxuICAgIH07XHJcblxyXG4gICAgKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBzdHlsZUJveCwgY3VlO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGN1ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY3VlID0gY3Vlc1tpXTtcclxuXHJcbiAgICAgICAgICAgIC8vIENvbXB1dGUgdGhlIGludGlhbCBwb3NpdGlvbiBhbmQgc3R5bGVzIG9mIHRoZSBjdWUgZGl2LlxyXG4gICAgICAgICAgICBzdHlsZUJveCA9IG5ldyBDdWVTdHlsZUJveCh3aW5kb3csIGN1ZSwgc3R5bGVPcHRpb25zKTtcclxuICAgICAgICAgICAgcGFkZGVkT3ZlcmxheS5hcHBlbmRDaGlsZChzdHlsZUJveC5kaXYpO1xyXG5cclxuICAgICAgICAgICAgLy8gTW92ZSB0aGUgY3VlIGRpdiB0byBpdCdzIGNvcnJlY3QgbGluZSBwb3NpdGlvbi5cclxuICAgICAgICAgICAgbW92ZUJveFRvTGluZVBvc2l0aW9uKHdpbmRvdywgc3R5bGVCb3gsIGNvbnRhaW5lckJveCwgYm94UG9zaXRpb25zKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlbWVtYmVyIHRoZSBjb21wdXRlZCBkaXYgc28gdGhhdCB3ZSBkb24ndCBoYXZlIHRvIHJlY29tcHV0ZSBpdCBsYXRlclxyXG4gICAgICAgICAgICAvLyBpZiB3ZSBkb24ndCBoYXZlIHRvby5cclxuICAgICAgICAgICAgY3VlLmRpc3BsYXlTdGF0ZSA9IHN0eWxlQm94LmRpdjtcclxuXHJcbiAgICAgICAgICAgIGJveFBvc2l0aW9ucy5wdXNoKEJveFBvc2l0aW9uLmdldFNpbXBsZUJveFBvc2l0aW9uKHN0eWxlQm94KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSkoKTtcclxufTtcclxuXHJcbldlYlZUVC5QYXJzZXIgPSBmdW5jdGlvbih3aW5kb3csIGRlY29kZXIpIHtcclxuICAgIHRoaXMud2luZG93ID0gd2luZG93O1xyXG4gICAgdGhpcy5zdGF0ZSA9IFwiSU5JVElBTFwiO1xyXG4gICAgdGhpcy5idWZmZXIgPSBcIlwiO1xyXG4gICAgdGhpcy5kZWNvZGVyID0gZGVjb2RlciB8fCBuZXcgVGV4dERlY29kZXIoXCJ1dGY4XCIpO1xyXG4gICAgdGhpcy5yZWdpb25MaXN0ID0gW107XHJcbn07XHJcblxyXG5XZWJWVFQuUGFyc2VyLnByb3RvdHlwZSA9IHtcclxuICAgIC8vIElmIHRoZSBlcnJvciBpcyBhIFBhcnNpbmdFcnJvciB0aGVuIHJlcG9ydCBpdCB0byB0aGUgY29uc3VtZXIgaWZcclxuICAgIC8vIHBvc3NpYmxlLiBJZiBpdCdzIG5vdCBhIFBhcnNpbmdFcnJvciB0aGVuIHRocm93IGl0IGxpa2Ugbm9ybWFsLlxyXG4gICAgcmVwb3J0T3JUaHJvd0Vycm9yOiBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBQYXJzaW5nRXJyb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5vbnBhcnNpbmdlcnJvciAmJiB0aGlzLm9ucGFyc2luZ2Vycm9yKGUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHBhcnNlOiBmdW5jdGlvbiAoZGF0YSwgZmx1c2hpbmcpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gZGF0YSB0aGVuIHdlIHdvbid0IGRlY29kZSBpdCwgYnV0IHdpbGwganVzdCB0cnkgdG8gcGFyc2VcclxuICAgICAgICAvLyB3aGF0ZXZlciBpcyBpbiBidWZmZXIgYWxyZWFkeS4gVGhpcyBtYXkgb2NjdXIgaW4gY2lyY3Vtc3RhbmNlcywgZm9yXHJcbiAgICAgICAgLy8gZXhhbXBsZSB3aGVuIGZsdXNoKCkgaXMgY2FsbGVkLlxyXG4gICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgIC8vIFRyeSB0byBkZWNvZGUgdGhlIGRhdGEgdGhhdCB3ZSByZWNlaXZlZC5cclxuICAgICAgICAgICAgc2VsZi5idWZmZXIgKz0gc2VsZi5kZWNvZGVyLmRlY29kZShkYXRhLCB7c3RyZWFtOiB0cnVlfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIGNvbGxlY3ROZXh0TGluZSgpIHtcclxuICAgICAgICAgICAgdmFyIGJ1ZmZlciA9IHNlbGYuYnVmZmVyO1xyXG4gICAgICAgICAgICB2YXIgcG9zID0gMDtcclxuICAgICAgICAgICAgd2hpbGUgKHBvcyA8IGJ1ZmZlci5sZW5ndGggJiYgYnVmZmVyW3Bvc10gIT09ICdcXHInICYmIGJ1ZmZlcltwb3NdICE9PSAnXFxuJykge1xyXG4gICAgICAgICAgICAgICAgKytwb3M7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGxpbmUgPSBidWZmZXIuc3Vic3RyKDAsIHBvcyk7XHJcbiAgICAgICAgICAgIC8vIEFkdmFuY2UgdGhlIGJ1ZmZlciBlYXJseSBpbiBjYXNlIHdlIGZhaWwgYmVsb3cuXHJcbiAgICAgICAgICAgIGlmIChidWZmZXJbcG9zXSA9PT0gJ1xccicpIHtcclxuICAgICAgICAgICAgICAgICsrcG9zO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChidWZmZXJbcG9zXSA9PT0gJ1xcbicpIHtcclxuICAgICAgICAgICAgICAgICsrcG9zO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlbGYuYnVmZmVyID0gYnVmZmVyLnN1YnN0cihwb3MpO1xyXG4gICAgICAgICAgICByZXR1cm4gbGluZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIDMuNCBXZWJWVFQgcmVnaW9uIGFuZCBXZWJWVFQgcmVnaW9uIHNldHRpbmdzIHN5bnRheFxyXG4gICAgICAgIGZ1bmN0aW9uIHBhcnNlUmVnaW9uKGlucHV0KSB7XHJcbiAgICAgICAgICAgIHZhciBzZXR0aW5ncyA9IG5ldyBTZXR0aW5ncygpO1xyXG5cclxuICAgICAgICAgICAgcGFyc2VPcHRpb25zKGlucHV0LCBmdW5jdGlvbiAoaywgdikge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImlkXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLnNldChrLCB2KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIndpZHRoXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLnBlcmNlbnQoaywgdik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJsaW5lc1wiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5pbnRlZ2VyKGssIHYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwicmVnaW9uYW5jaG9yXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInZpZXdwb3J0YW5jaG9yXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB4eSA9IHYuc3BsaXQoJywnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHh5Lmxlbmd0aCAhPT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UgaGF2ZSB0byBtYWtlIHN1cmUgYm90aCB4IGFuZCB5IHBhcnNlLCBzbyB1c2UgYSB0ZW1wb3JhcnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2V0dGluZ3Mgb2JqZWN0IGhlcmUuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhbmNob3IgPSBuZXcgU2V0dGluZ3MoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5jaG9yLnBlcmNlbnQoXCJ4XCIsIHh5WzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5jaG9yLnBlcmNlbnQoXCJ5XCIsIHh5WzFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhbmNob3IuaGFzKFwieFwiKSB8fCAhYW5jaG9yLmhhcyhcInlcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLnNldChrICsgXCJYXCIsIGFuY2hvci5nZXQoXCJ4XCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3Muc2V0KGsgKyBcIllcIiwgYW5jaG9yLmdldChcInlcIikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwic2Nyb2xsXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLmFsdChrLCB2LCBbXCJ1cFwiXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAvPS8sIC9cXHMvKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSB0aGUgcmVnaW9uLCB1c2luZyBkZWZhdWx0IHZhbHVlcyBmb3IgYW55IHZhbHVlcyB0aGF0IHdlcmUgbm90XHJcbiAgICAgICAgICAgIC8vIHNwZWNpZmllZC5cclxuICAgICAgICAgICAgaWYgKHNldHRpbmdzLmhhcyhcImlkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVnaW9uID0gbmV3IHNlbGYud2luZG93LlZUVFJlZ2lvbigpO1xyXG4gICAgICAgICAgICAgICAgcmVnaW9uLndpZHRoID0gc2V0dGluZ3MuZ2V0KFwid2lkdGhcIiwgMTAwKTtcclxuICAgICAgICAgICAgICAgIHJlZ2lvbi5saW5lcyA9IHNldHRpbmdzLmdldChcImxpbmVzXCIsIDMpO1xyXG4gICAgICAgICAgICAgICAgcmVnaW9uLnJlZ2lvbkFuY2hvclggPSBzZXR0aW5ncy5nZXQoXCJyZWdpb25hbmNob3JYXCIsIDApO1xyXG4gICAgICAgICAgICAgICAgcmVnaW9uLnJlZ2lvbkFuY2hvclkgPSBzZXR0aW5ncy5nZXQoXCJyZWdpb25hbmNob3JZXCIsIDEwMCk7XHJcbiAgICAgICAgICAgICAgICByZWdpb24udmlld3BvcnRBbmNob3JYID0gc2V0dGluZ3MuZ2V0KFwidmlld3BvcnRhbmNob3JYXCIsIDApO1xyXG4gICAgICAgICAgICAgICAgcmVnaW9uLnZpZXdwb3J0QW5jaG9yWSA9IHNldHRpbmdzLmdldChcInZpZXdwb3J0YW5jaG9yWVwiLCAxMDApO1xyXG4gICAgICAgICAgICAgICAgcmVnaW9uLnNjcm9sbCA9IHNldHRpbmdzLmdldChcInNjcm9sbFwiLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgIC8vIFJlZ2lzdGVyIHRoZSByZWdpb24uXHJcbiAgICAgICAgICAgICAgICBzZWxmLm9ucmVnaW9uICYmIHNlbGYub25yZWdpb24ocmVnaW9uKTtcclxuICAgICAgICAgICAgICAgIC8vIFJlbWVtYmVyIHRoZSBWVFRSZWdpb24gZm9yIGxhdGVyIGluIGNhc2Ugd2UgcGFyc2UgYW55IFZUVEN1ZXMgdGhhdFxyXG4gICAgICAgICAgICAgICAgLy8gcmVmZXJlbmNlIGl0LlxyXG4gICAgICAgICAgICAgICAgc2VsZi5yZWdpb25MaXN0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBzZXR0aW5ncy5nZXQoXCJpZFwiKSxcclxuICAgICAgICAgICAgICAgICAgICByZWdpb246IHJlZ2lvblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIDMuMiBXZWJWVFQgbWV0YWRhdGEgaGVhZGVyIHN5bnRheFxyXG4gICAgICAgIGZ1bmN0aW9uIHBhcnNlSGVhZGVyKGlucHV0KSB7XHJcbiAgICAgICAgICAgIHBhcnNlT3B0aW9ucyhpbnB1dCwgZnVuY3Rpb24gKGssIHYpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoaykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJSZWdpb25cIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gMy4zIFdlYlZUVCByZWdpb24gbWV0YWRhdGEgaGVhZGVyIHN5bnRheFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZVJlZ2lvbih2KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIC86Lyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyA1LjEgV2ViVlRUIGZpbGUgcGFyc2luZy5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YXIgbGluZTtcclxuICAgICAgICAgICAgaWYgKHNlbGYuc3RhdGUgPT09IFwiSU5JVElBTFwiKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBXZSBjYW4ndCBzdGFydCBwYXJzaW5nIHVudGlsIHdlIGhhdmUgdGhlIGZpcnN0IGxpbmUuXHJcbiAgICAgICAgICAgICAgICBpZiAoIS9cXHJcXG58XFxuLy50ZXN0KHNlbGYuYnVmZmVyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxpbmUgPSBjb2xsZWN0TmV4dExpbmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgbSA9IGxpbmUubWF0Y2goL15XRUJWVFQoWyBcXHRdLiopPyQvKTtcclxuICAgICAgICAgICAgICAgIGlmICghbSB8fCAhbVswXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBQYXJzaW5nRXJyb3IoUGFyc2luZ0Vycm9yLkVycm9ycy5CYWRTaWduYXR1cmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHNlbGYuc3RhdGUgPSBcIkhFQURFUlwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgYWxyZWFkeUNvbGxlY3RlZExpbmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgd2hpbGUgKHNlbGYuYnVmZmVyKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBXZSBjYW4ndCBwYXJzZSBhIGxpbmUgdW50aWwgd2UgaGF2ZSB0aGUgZnVsbCBsaW5lLlxyXG4gICAgICAgICAgICAgICAgaWYgKCEvXFxyXFxufFxcbi8udGVzdChzZWxmLmJ1ZmZlcikpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWFscmVhZHlDb2xsZWN0ZWRMaW5lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IGNvbGxlY3ROZXh0TGluZSgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhbHJlYWR5Q29sbGVjdGVkTGluZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChzZWxmLnN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIkhFQURFUlwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAxMy0xOCAtIEFsbG93IGEgaGVhZGVyIChtZXRhZGF0YSkgdW5kZXIgdGhlIFdFQlZUVCBsaW5lLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoLzovLnRlc3QobGluZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlSGVhZGVyKGxpbmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFsaW5lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBbiBlbXB0eSBsaW5lIHRlcm1pbmF0ZXMgdGhlIGhlYWRlciBhbmQgc3RhcnRzIHRoZSBib2R5IChjdWVzKS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc3RhdGUgPSBcIklEXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIk5PVEVcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWdub3JlIE5PVEUgYmxvY2tzLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWxpbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc3RhdGUgPSBcIklEXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIklEXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGZvciB0aGUgc3RhcnQgb2YgTk9URSBibG9ja3MuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgvXk5PVEUoJHxbIFxcdF0pLy50ZXN0KGxpbmUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnN0YXRlID0gXCJOT1RFXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAxOS0yOSAtIEFsbG93IGFueSBudW1iZXIgb2YgbGluZSB0ZXJtaW5hdG9ycywgdGhlbiBpbml0aWFsaXplIG5ldyBjdWUgdmFsdWVzLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWxpbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY3VlID0gbmV3IHNlbGYud2luZG93LlZUVEN1ZSgwLCAwLCBcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zdGF0ZSA9IFwiQ1VFXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIDMwLTM5IC0gQ2hlY2sgaWYgc2VsZiBsaW5lIGNvbnRhaW5zIGFuIG9wdGlvbmFsIGlkZW50aWZpZXIgb3IgdGltaW5nIGRhdGEuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsaW5lLmluZGV4T2YoXCItLT5cIikgPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmN1ZS5pZCA9IGxpbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFByb2Nlc3MgbGluZSBhcyBzdGFydCBvZiBhIGN1ZS5cclxuICAgICAgICAgICAgICAgICAgICAvKmZhbGxzIHRocm91Z2gqL1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJDVUVcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gNDAgLSBDb2xsZWN0IGN1ZSB0aW1pbmdzIGFuZCBzZXR0aW5ncy5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlQ3VlKGxpbmUsIHNlbGYuY3VlLCBzZWxmLnJlZ2lvbkxpc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJlcG9ydE9yVGhyb3dFcnJvcihlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEluIGNhc2Ugb2YgYW4gZXJyb3IgaWdub3JlIHJlc3Qgb2YgdGhlIGN1ZS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY3VlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc3RhdGUgPSBcIkJBRENVRVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zdGF0ZSA9IFwiQ1VFVEVYVFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiQ1VFVEVYVFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaGFzU3Vic3RyaW5nID0gbGluZS5pbmRleE9mKFwiLS0+XCIpICE9PSAtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gMzQgLSBJZiB3ZSBoYXZlIGFuIGVtcHR5IGxpbmUgdGhlbiByZXBvcnQgdGhlIGN1ZS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gMzUgLSBJZiB3ZSBoYXZlIHRoZSBzcGVjaWFsIHN1YnN0cmluZyAnLS0+JyB0aGVuIHJlcG9ydCB0aGUgY3VlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBidXQgZG8gbm90IGNvbGxlY3QgdGhlIGxpbmUgYXMgd2UgbmVlZCB0byBwcm9jZXNzIHRoZSBjdXJyZW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9uZSBhcyBhIG5ldyBjdWUuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbGluZSB8fCBoYXNTdWJzdHJpbmcgJiYgKGFscmVhZHlDb2xsZWN0ZWRMaW5lID0gdHJ1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIGFyZSBkb25lIHBhcnNpbmcgc2VsZiBjdWUuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm9uY3VlICYmIHNlbGYub25jdWUoc2VsZi5jdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jdWUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zdGF0ZSA9IFwiSURcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLmN1ZS50ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmN1ZS50ZXh0ICs9IFwiXFxuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jdWUudGV4dCArPSBsaW5lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiQkFEQ1VFXCI6IC8vIEJBRENVRVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyA1NC02MiAtIENvbGxlY3QgYW5kIGRpc2NhcmQgdGhlIHJlbWFpbmluZyBjdWUuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbGluZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zdGF0ZSA9IFwiSURcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICghZmx1c2hpbmcpIHtcclxuICAgICAgICAgICAgICAgIC8v65WM65WM66GcICjtlZzquIcgdnR066GcIOy2lOyglSkgY3Vl6rCAIOuCqOyVhCDsnojripTssYTroZwgc2VsZi5mbHVzaCgp66W8IO2YuOy2nO2VtOyEnCBjdWXqsIAg7J6I6riwIOuVjOusuOyXkCDri6Tsi5wgc2VsZi5wYXJzZSgp66W8IO2DgOuKlCDqsr3smrDqsIAg7IOd6rmALlxyXG4gICAgICAgICAgICAgICAgLy/smZwg7J2066CH6rKMIOynnOyXrCDsnojripTsp4Ag66qo66W06rKg6rOgIOydvOuLqCDslYTrnpjsmYAg6rCZ7J2AIOy9lOuTnOuhnCDsnITquLDrpbwg6re567O17ZWc64ukLlxyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuc3RhdGUgPT09IFwiQ1VFVEVYVFwiICYmIHNlbGYuY3VlICYmIHNlbGYub25jdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLm9uY3VlKHNlbGYuY3VlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNlbGYuZmx1c2goKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBzZWxmLnJlcG9ydE9yVGhyb3dFcnJvcihlKTtcclxuICAgICAgICAgICAgLy8gSWYgd2UgYXJlIGN1cnJlbnRseSBwYXJzaW5nIGEgY3VlLCByZXBvcnQgd2hhdCB3ZSBoYXZlLlxyXG4gICAgICAgICAgICBpZiAoc2VsZi5zdGF0ZSA9PT0gXCJDVUVURVhUXCIgJiYgc2VsZi5jdWUgJiYgc2VsZi5vbmN1ZSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5vbmN1ZShzZWxmLmN1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi5jdWUgPSBudWxsO1xyXG4gICAgICAgICAgICAvLyBFbnRlciBCQURXRUJWVFQgc3RhdGUgaWYgaGVhZGVyIHdhcyBub3QgcGFyc2VkIGNvcnJlY3RseSBvdGhlcndpc2VcclxuICAgICAgICAgICAgLy8gYW5vdGhlciBleGNlcHRpb24gb2NjdXJyZWQgc28gZW50ZXIgQkFEQ1VFIHN0YXRlLlxyXG4gICAgICAgICAgICBzZWxmLnN0YXRlID0gc2VsZi5zdGF0ZSA9PT0gXCJJTklUSUFMXCIgPyBcIkJBRFdFQlZUVFwiIDogXCJCQURDVUVcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG4gICAgZmx1c2g6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIEZpbmlzaCBkZWNvZGluZyB0aGUgc3RyZWFtLlxyXG4gICAgICAgICAgICBzZWxmLmJ1ZmZlciArPSBzZWxmLmRlY29kZXIuZGVjb2RlKCk7XHJcbiAgICAgICAgICAgIC8vIFN5bnRoZXNpemUgdGhlIGVuZCBvZiB0aGUgY3VycmVudCBjdWUgb3IgcmVnaW9uLlxyXG4gICAgICAgICAgICBpZiAoc2VsZi5jdWUgfHwgc2VsZi5zdGF0ZSA9PT0gXCJIRUFERVJcIikge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5idWZmZXIgKz0gXCJcXG5cXG5cIjtcclxuICAgICAgICAgICAgICAgIHNlbGYucGFyc2UobnVsbCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gSWYgd2UndmUgZmx1c2hlZCwgcGFyc2VkLCBhbmQgd2UncmUgc3RpbGwgb24gdGhlIElOSVRJQUwgc3RhdGUgdGhlblxyXG4gICAgICAgICAgICAvLyB0aGF0IG1lYW5zIHdlIGRvbid0IGhhdmUgZW5vdWdoIG9mIHRoZSBzdHJlYW0gdG8gcGFyc2UgdGhlIGZpcnN0XHJcbiAgICAgICAgICAgIC8vIGxpbmUuXHJcbiAgICAgICAgICAgIGlmIChzZWxmLnN0YXRlID09PSBcIklOSVRJQUxcIikge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFBhcnNpbmdFcnJvcihQYXJzaW5nRXJyb3IuRXJyb3JzLkJhZFNpZ25hdHVyZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoKGUpIHtcclxuICAgICAgICAgICAgc2VsZi5yZXBvcnRPclRocm93RXJyb3IoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbGYub25mbHVzaCAmJiBzZWxmLm9uZmx1c2goKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufTtcclxuXHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFdlYlZUVDsiLCIvKipcclxuICogQ29weXJpZ2h0IDIwMTMgdnR0LmpzIENvbnRyaWJ1dG9yc1xyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxubGV0IFZUVFJlZ2lvbiA9IFwiXCI7XHJcblxyXG52YXIgc2Nyb2xsU2V0dGluZyA9IHtcclxuICAgIFwiXCI6IHRydWUsXHJcbiAgICBcInVwXCI6IHRydWVcclxufTtcclxuXHJcbmZ1bmN0aW9uIGZpbmRTY3JvbGxTZXR0aW5nKHZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdmFyIHNjcm9sbCA9IHNjcm9sbFNldHRpbmdbdmFsdWUudG9Mb3dlckNhc2UoKV07XHJcbiAgICByZXR1cm4gc2Nyb2xsID8gdmFsdWUudG9Mb3dlckNhc2UoKSA6IGZhbHNlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc1ZhbGlkUGVyY2VudFZhbHVlKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiICYmICh2YWx1ZSA+PSAwICYmIHZhbHVlIDw9IDEwMCk7XHJcbn1cclxuXHJcbi8vIFZUVFJlZ2lvbiBzaGltIGh0dHA6Ly9kZXYudzMub3JnL2h0bWw1L3dlYnZ0dC8jdnR0cmVnaW9uLWludGVyZmFjZVxyXG5WVFRSZWdpb24gPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBfd2lkdGggPSAxMDA7XHJcbiAgICB2YXIgX2xpbmVzID0gMztcclxuICAgIHZhciBfcmVnaW9uQW5jaG9yWCA9IDA7XHJcbiAgICB2YXIgX3JlZ2lvbkFuY2hvclkgPSAxMDA7XHJcbiAgICB2YXIgX3ZpZXdwb3J0QW5jaG9yWCA9IDA7XHJcbiAgICB2YXIgX3ZpZXdwb3J0QW5jaG9yWSA9IDEwMDtcclxuICAgIHZhciBfc2Nyb2xsID0gXCJcIjtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLCB7XHJcbiAgICAgICAgXCJ3aWR0aFwiOiB7XHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3dpZHRoO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzVmFsaWRQZXJjZW50VmFsdWUodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiV2lkdGggbXVzdCBiZSBiZXR3ZWVuIDAgYW5kIDEwMC5cIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBfd2lkdGggPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJsaW5lc1wiOiB7XHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX2xpbmVzO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkxpbmVzIG11c3QgYmUgc2V0IHRvIGEgbnVtYmVyLlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF9saW5lcyA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInJlZ2lvbkFuY2hvcllcIjoge1xyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9yZWdpb25BbmNob3JZO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzVmFsaWRQZXJjZW50VmFsdWUodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUmVnaW9uQW5jaG9yWCBtdXN0IGJlIGJldHdlZW4gMCBhbmQgMTAwLlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF9yZWdpb25BbmNob3JZID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicmVnaW9uQW5jaG9yWFwiOiB7XHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3JlZ2lvbkFuY2hvclg7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmKCFpc1ZhbGlkUGVyY2VudFZhbHVlKHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlJlZ2lvbkFuY2hvclkgbXVzdCBiZSBiZXR3ZWVuIDAgYW5kIDEwMC5cIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBfcmVnaW9uQW5jaG9yWCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInZpZXdwb3J0QW5jaG9yWVwiOiB7XHJcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3ZpZXdwb3J0QW5jaG9yWTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc1ZhbGlkUGVyY2VudFZhbHVlKHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlZpZXdwb3J0QW5jaG9yWSBtdXN0IGJlIGJldHdlZW4gMCBhbmQgMTAwLlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF92aWV3cG9ydEFuY2hvclkgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJ2aWV3cG9ydEFuY2hvclhcIjoge1xyXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF92aWV3cG9ydEFuY2hvclg7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICghaXNWYWxpZFBlcmNlbnRWYWx1ZSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJWaWV3cG9ydEFuY2hvclggbXVzdCBiZSBiZXR3ZWVuIDAgYW5kIDEwMC5cIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBfdmlld3BvcnRBbmNob3JYID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwic2Nyb2xsXCI6IHtcclxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfc2Nyb2xsO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2V0dGluZyA9IGZpbmRTY3JvbGxTZXR0aW5nKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIC8vIEhhdmUgdG8gY2hlY2sgZm9yIGZhbHNlIGFzIGFuIGVtcHR5IHN0cmluZyBpcyBhIGxlZ2FsIHZhbHVlLlxyXG4gICAgICAgICAgICAgICAgaWYgKHNldHRpbmcgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKFwiQW4gaW52YWxpZCBvciBpbGxlZ2FsIHN0cmluZyB3YXMgc3BlY2lmaWVkLlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF9zY3JvbGwgPSBzZXR0aW5nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZUVFJlZ2lvbjsiXSwic291cmNlUm9vdCI6IiJ9