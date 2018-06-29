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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* vtt.js가 (function(){...}))(this); 이런 패턴이라 오븐 플레이어의 import export 구조에 맞지 않는다.
* */
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

            /*2018-05-25 HSLEE 오리지날 vtt.js에는 없는 부분. jwplayer의 vttparser.js 부분을 참고 하였다. 아마 얘네도 임의로 넣은 것으로 추정.*/
            if (!flushing) {
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
                self.parse();
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

exports.default = WebVTT;

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
 * Created by hoho on 2018. 5. 25..
 */
/*  VTT.JS를 현 프로젝트에서 인식할 수 있게 반으로 가른다.  */
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

exports.default = VTTRegion;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvYXBpL2NhcHRpb24vcGFyc2VyL1Z0dFBhcnNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMvY2FwdGlvbnMvdnR0UmVnaW9uLmpzIl0sIm5hbWVzIjpbIldlYlZUVCIsIm1ha2VDb2xvclNldCIsImNvbG9yIiwib3BhY2l0eSIsInVuZGVmaW5lZCIsInBhcnNlSW50Iiwic3Vic3RyaW5nIiwiam9pbiIsIldlYlZUVFByZWZzIiwiZm9udFNjYWxlIiwib2JzZXJ2ZSIsInN1YmplY3QiLCJ0b3BpYyIsImRhdGEiLCJmb250Q29sb3IiLCJTZXJ2aWNlcyIsInByZWZzIiwiZ2V0Q2hhclByZWYiLCJmb250T3BhY2l0eSIsImdldEludFByZWYiLCJXZWJWVFRTZXQiLCJmb250U2V0IiwiYmFja2dyb3VuZENvbG9yIiwiYmFja2dyb3VuZE9wYWNpdHkiLCJiYWNrZ3JvdW5kU2V0IiwiZWRnZVR5cGVMaXN0IiwiZWRnZVR5cGUiLCJlZGdlQ29sb3IiLCJlZGdlU2V0IiwiZm9yRWFjaCIsInByZWYiLCJhZGRPYnNlcnZlciIsIl9vYmpDcmVhdGUiLCJPYmplY3QiLCJjcmVhdGUiLCJGIiwibyIsImFyZ3VtZW50cyIsImxlbmd0aCIsIkVycm9yIiwicHJvdG90eXBlIiwiUGFyc2luZ0Vycm9yIiwiZXJyb3JEYXRhIiwibWVzc2FnZSIsIm5hbWUiLCJjb2RlIiwiY29uc3RydWN0b3IiLCJFcnJvcnMiLCJCYWRTaWduYXR1cmUiLCJCYWRUaW1lU3RhbXAiLCJwYXJzZVRpbWVTdGFtcCIsImlucHV0IiwiY29tcHV0ZVNlY29uZHMiLCJoIiwibSIsInMiLCJmIiwibWF0Y2giLCJyZXBsYWNlIiwiU2V0dGluZ3MiLCJ2YWx1ZXMiLCJzZXQiLCJrIiwidiIsImdldCIsImRmbHQiLCJkZWZhdWx0S2V5IiwiaGFzIiwiYWx0IiwiYSIsIm4iLCJpbnRlZ2VyIiwidGVzdCIsInBlcmNlbnQiLCJwYXJzZUZsb2F0IiwicGFyc2VPcHRpb25zIiwiY2FsbGJhY2siLCJrZXlWYWx1ZURlbGltIiwiZ3JvdXBEZWxpbSIsImdyb3VwcyIsInNwbGl0IiwiaSIsImt2IiwicGFyc2VDdWUiLCJjdWUiLCJyZWdpb25MaXN0Iiwib0lucHV0IiwiY29uc3VtZVRpbWVTdGFtcCIsInRzIiwiY29uc3VtZUN1ZVNldHRpbmdzIiwic2V0dGluZ3MiLCJpZCIsInJlZ2lvbiIsInZhbHMiLCJ2YWxzMCIsInZlcnRpY2FsIiwibGluZSIsImxpbmVBbGlnbiIsInNuYXBUb0xpbmVzIiwic2l6ZSIsInBvc2l0aW9uIiwicG9zaXRpb25BbGlnbiIsInN0YXJ0IiwibGVmdCIsIm1pZGRsZSIsImVuZCIsInJpZ2h0IiwiYWxpZ24iLCJza2lwV2hpdGVzcGFjZSIsInN0YXJ0VGltZSIsInN1YnN0ciIsImVuZFRpbWUiLCJFU0NBUEUiLCJUQUdfTkFNRSIsImMiLCJiIiwidSIsInJ1YnkiLCJydCIsImxhbmciLCJUQUdfQU5OT1RBVElPTiIsIk5FRURTX1BBUkVOVCIsInBhcnNlQ29udGVudCIsIndpbmRvdyIsIm5leHRUb2tlbiIsImNvbnN1bWUiLCJyZXN1bHQiLCJ1bmVzY2FwZTEiLCJlIiwidW5lc2NhcGUiLCJzaG91bGRBZGQiLCJjdXJyZW50IiwiZWxlbWVudCIsImxvY2FsTmFtZSIsImNyZWF0ZUVsZW1lbnQiLCJ0eXBlIiwiYW5ub3RhdGlvbiIsInRhZ05hbWUiLCJkb2N1bWVudCIsInRyaW0iLCJyb290RGl2IiwidCIsInRhZ1N0YWNrIiwicG9wIiwicGFyZW50Tm9kZSIsIm5vZGUiLCJjcmVhdGVQcm9jZXNzaW5nSW5zdHJ1Y3Rpb24iLCJhcHBlbmRDaGlsZCIsImNsYXNzTmFtZSIsInB1c2giLCJjcmVhdGVUZXh0Tm9kZSIsInN0cm9uZ1JUTENoYXJzIiwiZGV0ZXJtaW5lQmlkaSIsImN1ZURpdiIsIm5vZGVTdGFjayIsInRleHQiLCJjaGFyQ29kZSIsImNoaWxkTm9kZXMiLCJwdXNoTm9kZXMiLCJuZXh0VGV4dE5vZGUiLCJ0ZXh0Q29udGVudCIsImlubmVyVGV4dCIsImNoYXJDb2RlQXQiLCJqIiwiY29tcHV0ZUxpbmVQb3MiLCJ0cmFjayIsInRleHRUcmFja0xpc3QiLCJtZWRpYUVsZW1lbnQiLCJ0cmFja0xpc3QiLCJjb3VudCIsIm1vZGUiLCJTdHlsZUJveCIsImFwcGx5U3R5bGVzIiwic3R5bGVzIiwiZGl2IiwicHJvcCIsImhhc093blByb3BlcnR5Iiwic3R5bGUiLCJmb3JtYXRTdHlsZSIsInZhbCIsInVuaXQiLCJDdWVTdHlsZUJveCIsInN0eWxlT3B0aW9ucyIsImlzSUU4IiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwidGV4dFNoYWRvdyIsImNhbGwiLCJ0b3AiLCJib3R0b20iLCJkaXNwbGF5Iiwid3JpdGluZ01vZGUiLCJ1bmljb2RlQmlkaSIsInRleHRBbGlnbiIsImZvbnQiLCJ3aGl0ZVNwYWNlIiwiZGlyZWN0aW9uIiwic3R5bGVzdW5pY29kZUJpZGkiLCJ0ZXh0UG9zIiwid2lkdGgiLCJoZWlnaHQiLCJtb3ZlIiwiYm94IiwiQm94UG9zaXRpb24iLCJvYmoiLCJsaCIsIm9mZnNldEhlaWdodCIsIm9mZnNldFdpZHRoIiwib2Zmc2V0VG9wIiwicmVjdHMiLCJnZXRDbGllbnRSZWN0cyIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIk1hdGgiLCJtYXgiLCJsaW5lSGVpZ2h0IiwiYXhpcyIsInRvTW92ZSIsIm92ZXJsYXBzIiwiYjIiLCJvdmVybGFwc0FueSIsImJveGVzIiwid2l0aGluIiwiY29udGFpbmVyIiwib3ZlcmxhcHNPcHBvc2l0ZUF4aXMiLCJpbnRlcnNlY3RQZXJjZW50YWdlIiwieCIsIm1pbiIsInkiLCJpbnRlcnNlY3RBcmVhIiwidG9DU1NDb21wYXRWYWx1ZXMiLCJyZWZlcmVuY2UiLCJnZXRTaW1wbGVCb3hQb3NpdGlvbiIsInJldCIsIm1vdmVCb3hUb0xpbmVQb3NpdGlvbiIsInN0eWxlQm94IiwiY29udGFpbmVyQm94IiwiYm94UG9zaXRpb25zIiwiZmluZEJlc3RQb3NpdGlvbiIsImJlc3RQb3NpdGlvbiIsInNwZWNpZmllZFBvc2l0aW9uIiwicGVyY2VudGFnZSIsInAiLCJib3hQb3NpdGlvbiIsImxpbmVQb3MiLCJzdGVwIiwicm91bmQiLCJtYXhQb3NpdGlvbiIsImluaXRpYWxBeGlzIiwiYWJzIiwiY2VpbCIsInJldmVyc2UiLCJjYWxjdWxhdGVkUGVyY2VudGFnZSIsIlN0cmluZ0RlY29kZXIiLCJkZWNvZGUiLCJkZWNvZGVVUklDb21wb25lbnQiLCJlbmNvZGVVUklDb21wb25lbnQiLCJjb252ZXJ0Q3VlVG9ET01UcmVlIiwiY3VldGV4dCIsIkZPTlRfU0laRV9QRVJDRU5UIiwiRk9OVF9TVFlMRSIsIkNVRV9CQUNLR1JPVU5EX1BBRERJTkciLCJwcm9jZXNzQ3VlcyIsImN1ZXMiLCJvdmVybGF5IiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwicGFkZGVkT3ZlcmxheSIsIm1hcmdpbiIsInNob3VsZENvbXB1dGUiLCJoYXNCZWVuUmVzZXQiLCJkaXNwbGF5U3RhdGUiLCJmb250U2l6ZSIsIlBhcnNlciIsImRlY29kZXIiLCJzdGF0ZSIsImJ1ZmZlciIsIlRleHREZWNvZGVyIiwicmVwb3J0T3JUaHJvd0Vycm9yIiwib25wYXJzaW5nZXJyb3IiLCJwYXJzZSIsImZsdXNoaW5nIiwic2VsZiIsInN0cmVhbSIsImNvbGxlY3ROZXh0TGluZSIsInBvcyIsInBhcnNlUmVnaW9uIiwieHkiLCJhbmNob3IiLCJWVFRSZWdpb24iLCJsaW5lcyIsInJlZ2lvbkFuY2hvclgiLCJyZWdpb25BbmNob3JZIiwidmlld3BvcnRBbmNob3JYIiwidmlld3BvcnRBbmNob3JZIiwic2Nyb2xsIiwib25yZWdpb24iLCJwYXJzZUhlYWRlciIsImFscmVhZHlDb2xsZWN0ZWRMaW5lIiwiVlRUQ3VlIiwiaW5kZXhPZiIsImhhc1N1YnN0cmluZyIsIm9uY3VlIiwiZmx1c2giLCJvbmZsdXNoIiwic2Nyb2xsU2V0dGluZyIsImZpbmRTY3JvbGxTZXR0aW5nIiwidmFsdWUiLCJ0b0xvd2VyQ2FzZSIsImlzVmFsaWRQZXJjZW50VmFsdWUiLCJfd2lkdGgiLCJfbGluZXMiLCJfcmVnaW9uQW5jaG9yWCIsIl9yZWdpb25BbmNob3JZIiwiX3ZpZXdwb3J0QW5jaG9yWCIsIl92aWV3cG9ydEFuY2hvclkiLCJfc2Nyb2xsIiwiZGVmaW5lUHJvcGVydGllcyIsImVudW1lcmFibGUiLCJUeXBlRXJyb3IiLCJzZXR0aW5nIiwiU3ludGF4RXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTs7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkE7QUFDQTs7QUF4QkE7QUEwQkEsSUFBSUEsU0FBUyxTQUFUQSxNQUFTLEdBQVUsQ0FBRSxDQUF6QjtBQUNBLFNBQVNDLFlBQVQsQ0FBc0JDLEtBQXRCLEVBQTZCQyxPQUE3QixFQUFzQztBQUNsQyxRQUFHQSxZQUFZQyxTQUFmLEVBQTBCO0FBQ3RCRCxrQkFBVSxDQUFWO0FBQ0g7QUFDRCxXQUFPLFVBQVUsQ0FBQ0UsU0FBU0gsTUFBTUksU0FBTixDQUFnQixDQUFoQixFQUFtQixDQUFuQixDQUFULEVBQWdDLEVBQWhDLENBQUQsRUFDVEQsU0FBU0gsTUFBTUksU0FBTixDQUFnQixDQUFoQixFQUFtQixDQUFuQixDQUFULEVBQWdDLEVBQWhDLENBRFMsRUFFVEQsU0FBU0gsTUFBTUksU0FBTixDQUFnQixDQUFoQixFQUFtQixDQUFuQixDQUFULEVBQWdDLEVBQWhDLENBRlMsRUFHVEgsT0FIUyxFQUdBSSxJQUhBLENBR0ssR0FITCxDQUFWLEdBR3NCLEdBSDdCO0FBSUg7O0FBRUQsSUFBSUMsY0FBYyxDQUFDLG1CQUFELEVBQXNCLHFCQUF0QixFQUE2QyxtQkFBN0MsRUFDZCxpQkFEYyxFQUNLLG1CQURMLEVBRWQsbUJBRmMsRUFFTyxrQkFGUCxDQUFsQjs7QUFJQSxJQUFJQyxZQUFZLENBQWhCOztBQUVBLFNBQVNDLE9BQVQsQ0FBaUJDLE9BQWpCLEVBQTBCQyxLQUExQixFQUFpQ0MsSUFBakMsRUFBdUM7QUFDbkMsWUFBUUEsSUFBUjtBQUNJLGFBQUssbUJBQUw7QUFDQSxhQUFLLHFCQUFMO0FBQ0ksZ0JBQUlDLFlBQVlDLFNBQVNDLEtBQVQsQ0FBZUMsV0FBZixDQUEyQixtQkFBM0IsQ0FBaEI7QUFDQSxnQkFBSUMsY0FBY0gsU0FBU0MsS0FBVCxDQUFlRyxVQUFmLENBQTBCLHFCQUExQixJQUFtRCxHQUFyRTtBQUNBQyxzQkFBVUMsT0FBVixHQUFvQnBCLGFBQWFhLFNBQWIsRUFBd0JJLFdBQXhCLENBQXBCO0FBQ0E7QUFDSixhQUFLLG1CQUFMO0FBQ0lULHdCQUFZTSxTQUFTQyxLQUFULENBQWVHLFVBQWYsQ0FBMEIsbUJBQTFCLElBQWlELEdBQTdEO0FBQ0E7QUFDSixhQUFLLGlCQUFMO0FBQ0EsYUFBSyxtQkFBTDtBQUNJLGdCQUFJRyxrQkFBa0JQLFNBQVNDLEtBQVQsQ0FBZUMsV0FBZixDQUEyQixpQkFBM0IsQ0FBdEI7QUFDQSxnQkFBSU0sb0JBQW9CUixTQUFTQyxLQUFULENBQWVHLFVBQWYsQ0FBMEIsbUJBQTFCLElBQWlELEdBQXpFO0FBQ0FDLHNCQUFVSSxhQUFWLEdBQTBCdkIsYUFBYXFCLGVBQWIsRUFBOEJDLGlCQUE5QixDQUExQjtBQUNBO0FBQ0osYUFBSyxtQkFBTDtBQUNBLGFBQUssa0JBQUw7QUFDSSxnQkFBSUUsZUFBZSxDQUFDLEVBQUQsRUFBSyxVQUFMLEVBQWlCLGNBQWpCLEVBQWlDLFlBQWpDLEVBQStDLFVBQS9DLENBQW5CO0FBQ0EsZ0JBQUlDLFdBQVdYLFNBQVNDLEtBQVQsQ0FBZUcsVUFBZixDQUEwQixrQkFBMUIsQ0FBZjtBQUNBLGdCQUFJUSxZQUFZWixTQUFTQyxLQUFULENBQWVDLFdBQWYsQ0FBMkIsbUJBQTNCLENBQWhCO0FBQ0FHLHNCQUFVUSxPQUFWLEdBQW9CSCxhQUFhQyxRQUFiLElBQXlCekIsYUFBYTBCLFNBQWIsQ0FBN0M7QUFDQTtBQXRCUjtBQXdCSDs7QUFFRCxJQUFHLE9BQU9aLFFBQVAsS0FBb0IsV0FBdkIsRUFBb0M7QUFDaEMsUUFBSUssWUFBWSxFQUFoQjtBQUNBWixnQkFBWXFCLE9BQVosQ0FBb0IsVUFBVUMsSUFBVixFQUFnQjtBQUNoQ3BCLGdCQUFRTixTQUFSLEVBQW1CQSxTQUFuQixFQUE4QjBCLElBQTlCO0FBQ0FmLGlCQUFTQyxLQUFULENBQWVlLFdBQWYsQ0FBMkJELElBQTNCLEVBQWlDcEIsT0FBakMsRUFBMEMsS0FBMUM7QUFDSCxLQUhEO0FBSUg7O0FBRUQsSUFBSXNCLGFBQWFDLE9BQU9DLE1BQVAsSUFBa0IsWUFBVztBQUN0QyxhQUFTQyxDQUFULEdBQWEsQ0FBRTtBQUNmLFdBQU8sVUFBU0MsQ0FBVCxFQUFZO0FBQ2YsWUFBSUMsVUFBVUMsTUFBVixLQUFxQixDQUF6QixFQUE0QjtBQUN4QixrQkFBTSxJQUFJQyxLQUFKLENBQVUsZ0RBQVYsQ0FBTjtBQUNIO0FBQ0RKLFVBQUVLLFNBQUYsR0FBY0osQ0FBZDtBQUNBLGVBQU8sSUFBSUQsQ0FBSixFQUFQO0FBQ0gsS0FORDtBQU9ILENBVDZCLEVBQWxDOztBQVdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBU00sWUFBVCxDQUFzQkMsU0FBdEIsRUFBaUNDLE9BQWpDLEVBQTBDO0FBQ3RDLFNBQUtDLElBQUwsR0FBWSxjQUFaO0FBQ0EsU0FBS0MsSUFBTCxHQUFZSCxVQUFVRyxJQUF0QjtBQUNBLFNBQUtGLE9BQUwsR0FBZUEsV0FBV0QsVUFBVUMsT0FBcEM7QUFDSDtBQUNERixhQUFhRCxTQUFiLEdBQXlCUixXQUFXTyxNQUFNQyxTQUFqQixDQUF6QjtBQUNBQyxhQUFhRCxTQUFiLENBQXVCTSxXQUF2QixHQUFxQ0wsWUFBckM7O0FBRUE7QUFDQUEsYUFBYU0sTUFBYixHQUFzQjtBQUNsQkMsa0JBQWM7QUFDVkgsY0FBTSxDQURJO0FBRVZGLGlCQUFTO0FBRkMsS0FESTtBQUtsQk0sa0JBQWM7QUFDVkosY0FBTSxDQURJO0FBRVZGLGlCQUFTO0FBRkM7QUFMSSxDQUF0Qjs7QUFXQTtBQUNBLFNBQVNPLGNBQVQsQ0FBd0JDLEtBQXhCLEVBQStCOztBQUUzQixhQUFTQyxjQUFULENBQXdCQyxDQUF4QixFQUEyQkMsQ0FBM0IsRUFBOEJDLENBQTlCLEVBQWlDQyxDQUFqQyxFQUFvQztBQUNoQyxlQUFPLENBQUNILElBQUksQ0FBTCxJQUFVLElBQVYsR0FBaUIsQ0FBQ0MsSUFBSSxDQUFMLElBQVUsRUFBM0IsSUFBaUNDLElBQUksQ0FBckMsSUFBMEMsQ0FBQ0MsSUFBSSxDQUFMLElBQVUsSUFBM0Q7QUFDSDs7QUFFRCxRQUFJRixJQUFJSCxNQUFNTSxLQUFOLENBQVksa0NBQVosQ0FBUjtBQUNBLFFBQUksQ0FBQ0gsQ0FBTCxFQUFRO0FBQ0osZUFBTyxJQUFQO0FBQ0g7O0FBRUQsUUFBSUEsRUFBRSxDQUFGLENBQUosRUFBVTtBQUNOO0FBQ0EsZUFBT0YsZUFBZUUsRUFBRSxDQUFGLENBQWYsRUFBcUJBLEVBQUUsQ0FBRixDQUFyQixFQUEyQkEsRUFBRSxDQUFGLEVBQUtJLE9BQUwsQ0FBYSxHQUFiLEVBQWtCLEVBQWxCLENBQTNCLEVBQWtESixFQUFFLENBQUYsQ0FBbEQsQ0FBUDtBQUNILEtBSEQsTUFHTyxJQUFJQSxFQUFFLENBQUYsSUFBTyxFQUFYLEVBQWU7QUFDbEI7QUFDQTtBQUNBLGVBQU9GLGVBQWVFLEVBQUUsQ0FBRixDQUFmLEVBQXFCQSxFQUFFLENBQUYsQ0FBckIsRUFBMkIsQ0FBM0IsRUFBK0JBLEVBQUUsQ0FBRixDQUEvQixDQUFQO0FBQ0gsS0FKTSxNQUlBO0FBQ0g7QUFDQSxlQUFPRixlQUFlLENBQWYsRUFBa0JFLEVBQUUsQ0FBRixDQUFsQixFQUF3QkEsRUFBRSxDQUFGLENBQXhCLEVBQThCQSxFQUFFLENBQUYsQ0FBOUIsQ0FBUDtBQUNIO0FBQ0o7O0FBRUQ7QUFDQTtBQUNBLFNBQVNLLFFBQVQsR0FBb0I7QUFDaEIsU0FBS0MsTUFBTCxHQUFjNUIsV0FBVyxJQUFYLENBQWQ7QUFDSDs7QUFFRDJCLFNBQVNuQixTQUFULEdBQXFCO0FBQ2pCO0FBQ0FxQixTQUFLLGFBQVNDLENBQVQsRUFBWUMsQ0FBWixFQUFlO0FBQ2hCLFlBQUksQ0FBQyxLQUFLQyxHQUFMLENBQVNGLENBQVQsQ0FBRCxJQUFnQkMsTUFBTSxFQUExQixFQUE4QjtBQUMxQixpQkFBS0gsTUFBTCxDQUFZRSxDQUFaLElBQWlCQyxDQUFqQjtBQUNIO0FBQ0osS0FOZ0I7QUFPakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBQyxTQUFLLGFBQVNGLENBQVQsRUFBWUcsSUFBWixFQUFrQkMsVUFBbEIsRUFBOEI7QUFDL0IsWUFBSUEsVUFBSixFQUFnQjtBQUNaLG1CQUFPLEtBQUtDLEdBQUwsQ0FBU0wsQ0FBVCxJQUFjLEtBQUtGLE1BQUwsQ0FBWUUsQ0FBWixDQUFkLEdBQStCRyxLQUFLQyxVQUFMLENBQXRDO0FBQ0g7QUFDRCxlQUFPLEtBQUtDLEdBQUwsQ0FBU0wsQ0FBVCxJQUFjLEtBQUtGLE1BQUwsQ0FBWUUsQ0FBWixDQUFkLEdBQStCRyxJQUF0QztBQUNILEtBakJnQjtBQWtCakI7QUFDQUUsU0FBSyxhQUFTTCxDQUFULEVBQVk7QUFDYixlQUFPQSxLQUFLLEtBQUtGLE1BQWpCO0FBQ0gsS0FyQmdCO0FBc0JqQjtBQUNBUSxTQUFLLGFBQVNOLENBQVQsRUFBWUMsQ0FBWixFQUFlTSxDQUFmLEVBQWtCO0FBQ25CLGFBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJRCxFQUFFL0IsTUFBdEIsRUFBOEIsRUFBRWdDLENBQWhDLEVBQW1DO0FBQy9CLGdCQUFJUCxNQUFNTSxFQUFFQyxDQUFGLENBQVYsRUFBZ0I7QUFDWixxQkFBS1QsR0FBTCxDQUFTQyxDQUFULEVBQVlDLENBQVo7QUFDQTtBQUNIO0FBQ0o7QUFDSixLQTlCZ0I7QUErQmpCO0FBQ0FRLGFBQVMsaUJBQVNULENBQVQsRUFBWUMsQ0FBWixFQUFlO0FBQ3BCLFlBQUksVUFBVVMsSUFBVixDQUFlVCxDQUFmLENBQUosRUFBdUI7QUFBRTtBQUNyQixpQkFBS0YsR0FBTCxDQUFTQyxDQUFULEVBQVl6RCxTQUFTMEQsQ0FBVCxFQUFZLEVBQVosQ0FBWjtBQUNIO0FBQ0osS0FwQ2dCO0FBcUNqQjtBQUNBVSxhQUFTLGlCQUFTWCxDQUFULEVBQVlDLENBQVosRUFBZTtBQUNwQixZQUFJVCxDQUFKO0FBQ0EsWUFBS0EsSUFBSVMsRUFBRU4sS0FBRixDQUFRLDBCQUFSLENBQVQsRUFBK0M7QUFDM0NNLGdCQUFJVyxXQUFXWCxDQUFYLENBQUo7QUFDQSxnQkFBSUEsS0FBSyxDQUFMLElBQVVBLEtBQUssR0FBbkIsRUFBd0I7QUFDcEIscUJBQUtGLEdBQUwsQ0FBU0MsQ0FBVCxFQUFZQyxDQUFaO0FBQ0EsdUJBQU8sSUFBUDtBQUNIO0FBQ0o7QUFDRCxlQUFPLEtBQVA7QUFDSDtBQWhEZ0IsQ0FBckI7O0FBbURBO0FBQ0E7QUFDQSxTQUFTWSxZQUFULENBQXNCeEIsS0FBdEIsRUFBNkJ5QixRQUE3QixFQUF1Q0MsYUFBdkMsRUFBc0RDLFVBQXRELEVBQWtFO0FBQzlELFFBQUlDLFNBQVNELGFBQWEzQixNQUFNNkIsS0FBTixDQUFZRixVQUFaLENBQWIsR0FBdUMsQ0FBQzNCLEtBQUQsQ0FBcEQ7QUFDQSxTQUFLLElBQUk4QixDQUFULElBQWNGLE1BQWQsRUFBc0I7QUFDbEIsWUFBSSxPQUFPQSxPQUFPRSxDQUFQLENBQVAsS0FBcUIsUUFBekIsRUFBbUM7QUFDL0I7QUFDSDtBQUNELFlBQUlDLEtBQUtILE9BQU9FLENBQVAsRUFBVUQsS0FBVixDQUFnQkgsYUFBaEIsQ0FBVDtBQUNBLFlBQUlLLEdBQUc1QyxNQUFILEtBQWMsQ0FBbEIsRUFBcUI7QUFDakI7QUFDSDtBQUNELFlBQUl3QixJQUFJb0IsR0FBRyxDQUFILENBQVI7QUFDQSxZQUFJbkIsSUFBSW1CLEdBQUcsQ0FBSCxDQUFSO0FBQ0FOLGlCQUFTZCxDQUFULEVBQVlDLENBQVo7QUFDSDtBQUNKOztBQUVELFNBQVNvQixRQUFULENBQWtCaEMsS0FBbEIsRUFBeUJpQyxHQUF6QixFQUE4QkMsVUFBOUIsRUFBMEM7QUFDdEM7QUFDQSxRQUFJQyxTQUFTbkMsS0FBYjtBQUNBO0FBQ0EsYUFBU29DLGdCQUFULEdBQTRCO0FBQ3hCLFlBQUlDLEtBQUt0QyxlQUFlQyxLQUFmLENBQVQ7QUFDQSxZQUFJcUMsT0FBTyxJQUFYLEVBQWlCO0FBQ2Isa0JBQU0sSUFBSS9DLFlBQUosQ0FBaUJBLGFBQWFNLE1BQWIsQ0FBb0JFLFlBQXJDLEVBQ0YsMEJBQTBCcUMsTUFEeEIsQ0FBTjtBQUVIO0FBQ0Q7QUFDQW5DLGdCQUFRQSxNQUFNTyxPQUFOLENBQWMsZ0JBQWQsRUFBZ0MsRUFBaEMsQ0FBUjtBQUNBLGVBQU84QixFQUFQO0FBQ0g7O0FBRUQ7QUFDQSxhQUFTQyxrQkFBVCxDQUE0QnRDLEtBQTVCLEVBQW1DaUMsR0FBbkMsRUFBd0M7QUFDcEMsWUFBSU0sV0FBVyxJQUFJL0IsUUFBSixFQUFmOztBQUVBZ0IscUJBQWF4QixLQUFiLEVBQW9CLFVBQVVXLENBQVYsRUFBYUMsQ0FBYixFQUFnQjtBQUNoQyxvQkFBUUQsQ0FBUjtBQUNJLHFCQUFLLFFBQUw7QUFDSTtBQUNBLHlCQUFLLElBQUltQixJQUFJSSxXQUFXL0MsTUFBWCxHQUFvQixDQUFqQyxFQUFvQzJDLEtBQUssQ0FBekMsRUFBNENBLEdBQTVDLEVBQWlEO0FBQzdDLDRCQUFJSSxXQUFXSixDQUFYLEVBQWNVLEVBQWQsS0FBcUI1QixDQUF6QixFQUE0QjtBQUN4QjJCLHFDQUFTN0IsR0FBVCxDQUFhQyxDQUFiLEVBQWdCdUIsV0FBV0osQ0FBWCxFQUFjVyxNQUE5QjtBQUNBO0FBQ0g7QUFDSjtBQUNEO0FBQ0oscUJBQUssVUFBTDtBQUNJRiw2QkFBU3RCLEdBQVQsQ0FBYU4sQ0FBYixFQUFnQkMsQ0FBaEIsRUFBbUIsQ0FBQyxJQUFELEVBQU8sSUFBUCxDQUFuQjtBQUNBO0FBQ0oscUJBQUssTUFBTDtBQUNJLHdCQUFJOEIsT0FBTzlCLEVBQUVpQixLQUFGLENBQVEsR0FBUixDQUFYO0FBQUEsd0JBQ0ljLFFBQVFELEtBQUssQ0FBTCxDQURaO0FBRUFILDZCQUFTbkIsT0FBVCxDQUFpQlQsQ0FBakIsRUFBb0JnQyxLQUFwQjtBQUNBSiw2QkFBU2pCLE9BQVQsQ0FBaUJYLENBQWpCLEVBQW9CZ0MsS0FBcEIsSUFBNkJKLFNBQVM3QixHQUFULENBQWEsYUFBYixFQUE0QixLQUE1QixDQUE3QixHQUFrRSxJQUFsRTtBQUNBNkIsNkJBQVN0QixHQUFULENBQWFOLENBQWIsRUFBZ0JnQyxLQUFoQixFQUF1QixDQUFDLE1BQUQsQ0FBdkI7QUFDQSx3QkFBSUQsS0FBS3ZELE1BQUwsS0FBZ0IsQ0FBcEIsRUFBdUI7QUFDbkJvRCxpQ0FBU3RCLEdBQVQsQ0FBYSxXQUFiLEVBQTBCeUIsS0FBSyxDQUFMLENBQTFCLEVBQW1DLENBQUMsT0FBRCxFQUFVLFFBQVYsRUFBb0IsS0FBcEIsQ0FBbkM7QUFDSDtBQUNEO0FBQ0oscUJBQUssVUFBTDtBQUNJQSwyQkFBTzlCLEVBQUVpQixLQUFGLENBQVEsR0FBUixDQUFQO0FBQ0FVLDZCQUFTakIsT0FBVCxDQUFpQlgsQ0FBakIsRUFBb0IrQixLQUFLLENBQUwsQ0FBcEI7QUFDQSx3QkFBSUEsS0FBS3ZELE1BQUwsS0FBZ0IsQ0FBcEIsRUFBdUI7QUFDbkJvRCxpQ0FBU3RCLEdBQVQsQ0FBYSxlQUFiLEVBQThCeUIsS0FBSyxDQUFMLENBQTlCLEVBQXVDLENBQUMsT0FBRCxFQUFVLFFBQVYsRUFBb0IsS0FBcEIsQ0FBdkM7QUFDSDtBQUNEO0FBQ0oscUJBQUssTUFBTDtBQUNJSCw2QkFBU2pCLE9BQVQsQ0FBaUJYLENBQWpCLEVBQW9CQyxDQUFwQjtBQUNBO0FBQ0oscUJBQUssT0FBTDtBQUNJMkIsNkJBQVN0QixHQUFULENBQWFOLENBQWIsRUFBZ0JDLENBQWhCLEVBQW1CLENBQUMsT0FBRCxFQUFVLFFBQVYsRUFBb0IsS0FBcEIsRUFBMkIsTUFBM0IsRUFBbUMsT0FBbkMsQ0FBbkI7QUFDQTtBQW5DUjtBQXFDSCxTQXRDRCxFQXNDRyxHQXRDSCxFQXNDUSxJQXRDUjs7QUF3Q0E7QUFDQXFCLFlBQUlRLE1BQUosR0FBYUYsU0FBUzFCLEdBQVQsQ0FBYSxRQUFiLEVBQXVCLElBQXZCLENBQWI7QUFDQW9CLFlBQUlXLFFBQUosR0FBZUwsU0FBUzFCLEdBQVQsQ0FBYSxVQUFiLEVBQXlCLEVBQXpCLENBQWY7QUFDQW9CLFlBQUlZLElBQUosR0FBV04sU0FBUzFCLEdBQVQsQ0FBYSxNQUFiLEVBQXFCLE1BQXJCLENBQVg7QUFDQW9CLFlBQUlhLFNBQUosR0FBZ0JQLFNBQVMxQixHQUFULENBQWEsV0FBYixFQUEwQixPQUExQixDQUFoQjtBQUNBb0IsWUFBSWMsV0FBSixHQUFrQlIsU0FBUzFCLEdBQVQsQ0FBYSxhQUFiLEVBQTRCLElBQTVCLENBQWxCO0FBQ0FvQixZQUFJZSxJQUFKLEdBQVdULFNBQVMxQixHQUFULENBQWEsTUFBYixFQUFxQixHQUFyQixDQUFYO0FBQ0E7QUFDQW9CLFlBQUlnQixRQUFKLEdBQWVWLFNBQVMxQixHQUFULENBQWEsVUFBYixFQUF5QixNQUF6QixDQUFmO0FBQ0FvQixZQUFJaUIsYUFBSixHQUFvQlgsU0FBUzFCLEdBQVQsQ0FBYSxlQUFiLEVBQThCO0FBQzlDc0MsbUJBQU8sT0FEdUM7QUFFOUNDLGtCQUFNLE9BRndDO0FBRzlDQyxvQkFBUSxRQUhzQztBQUk5Q0MsaUJBQUssS0FKeUM7QUFLOUNDLG1CQUFPO0FBTHVDLFNBQTlCLEVBTWpCdEIsSUFBSXVCLEtBTmEsQ0FBcEI7QUFPSDs7QUFFRCxhQUFTQyxjQUFULEdBQTBCO0FBQ3RCekQsZ0JBQVFBLE1BQU1PLE9BQU4sQ0FBYyxNQUFkLEVBQXNCLEVBQXRCLENBQVI7QUFDSDs7QUFFRDtBQUNBa0Q7QUFDQXhCLFFBQUl5QixTQUFKLEdBQWdCdEIsa0JBQWhCLENBbkZzQyxDQW1GQTtBQUN0Q3FCO0FBQ0EsUUFBSXpELE1BQU0yRCxNQUFOLENBQWEsQ0FBYixFQUFnQixDQUFoQixNQUF1QixLQUEzQixFQUFrQztBQUFNO0FBQ3BDLGNBQU0sSUFBSXJFLFlBQUosQ0FBaUJBLGFBQWFNLE1BQWIsQ0FBb0JFLFlBQXJDLEVBQ0Ysb0VBQ0FxQyxNQUZFLENBQU47QUFHSDtBQUNEbkMsWUFBUUEsTUFBTTJELE1BQU4sQ0FBYSxDQUFiLENBQVI7QUFDQUY7QUFDQXhCLFFBQUkyQixPQUFKLEdBQWN4QixrQkFBZCxDQTVGc0MsQ0E0RkE7O0FBRXRDO0FBQ0FxQjtBQUNBbkIsdUJBQW1CdEMsS0FBbkIsRUFBMEJpQyxHQUExQjtBQUNIOztBQUVELElBQUk0QixTQUFTO0FBQ1QsYUFBUyxHQURBO0FBRVQsWUFBUSxHQUZDO0FBR1QsWUFBUSxHQUhDO0FBSVQsYUFBUyxRQUpBO0FBS1QsYUFBUyxRQUxBO0FBTVQsY0FBVTtBQU5ELENBQWI7O0FBU0EsSUFBSUMsV0FBVztBQUNYQyxPQUFHLE1BRFE7QUFFWGpDLE9BQUcsR0FGUTtBQUdYa0MsT0FBRyxHQUhRO0FBSVhDLE9BQUcsR0FKUTtBQUtYQyxVQUFNLE1BTEs7QUFNWEMsUUFBSSxJQU5PO0FBT1h2RCxPQUFHLE1BUFE7QUFRWHdELFVBQU07QUFSSyxDQUFmOztBQVdBLElBQUlDLGlCQUFpQjtBQUNqQnpELE9BQUcsT0FEYztBQUVqQndELFVBQU07QUFGVyxDQUFyQjs7QUFLQSxJQUFJRSxlQUFlO0FBQ2ZILFFBQUk7QUFEVyxDQUFuQjs7QUFJQTtBQUNBLFNBQVNJLFlBQVQsQ0FBc0JDLE1BQXRCLEVBQThCeEUsS0FBOUIsRUFBcUM7QUFDakMsYUFBU3lFLFNBQVQsR0FBcUI7QUFDakI7QUFDQSxZQUFJLENBQUN6RSxLQUFMLEVBQVk7QUFDUixtQkFBTyxJQUFQO0FBQ0g7O0FBRUQ7QUFDQSxpQkFBUzBFLE9BQVQsQ0FBaUJDLE1BQWpCLEVBQXlCO0FBQ3JCM0Usb0JBQVFBLE1BQU0yRCxNQUFOLENBQWFnQixPQUFPeEYsTUFBcEIsQ0FBUjtBQUNBLG1CQUFPd0YsTUFBUDtBQUNIOztBQUVELFlBQUl4RSxJQUFJSCxNQUFNTSxLQUFOLENBQVkscUJBQVosQ0FBUjtBQUNBO0FBQ0E7QUFDQSxlQUFPb0UsUUFBUXZFLEVBQUUsQ0FBRixJQUFPQSxFQUFFLENBQUYsQ0FBUCxHQUFjQSxFQUFFLENBQUYsQ0FBdEIsQ0FBUDtBQUNIOztBQUVEO0FBQ0EsYUFBU3lFLFNBQVQsQ0FBbUJDLENBQW5CLEVBQXNCO0FBQ2xCLGVBQU9oQixPQUFPZ0IsQ0FBUCxDQUFQO0FBQ0g7QUFDRCxhQUFTQyxRQUFULENBQWtCMUUsQ0FBbEIsRUFBcUI7QUFDakIsZUFBUUQsSUFBSUMsRUFBRUUsS0FBRixDQUFRLDRCQUFSLENBQVosRUFBb0Q7QUFDaERGLGdCQUFJQSxFQUFFRyxPQUFGLENBQVVKLEVBQUUsQ0FBRixDQUFWLEVBQWdCeUUsU0FBaEIsQ0FBSjtBQUNIO0FBQ0QsZUFBT3hFLENBQVA7QUFDSDs7QUFFRCxhQUFTMkUsU0FBVCxDQUFtQkMsT0FBbkIsRUFBNEJDLE9BQTVCLEVBQXFDO0FBQ2pDLGVBQU8sQ0FBQ1gsYUFBYVcsUUFBUUMsU0FBckIsQ0FBRCxJQUNIWixhQUFhVyxRQUFRQyxTQUFyQixNQUFvQ0YsUUFBUUUsU0FEaEQ7QUFFSDs7QUFFRDtBQUNBLGFBQVNDLGFBQVQsQ0FBdUJDLElBQXZCLEVBQTZCQyxVQUE3QixFQUF5QztBQUNyQyxZQUFJQyxVQUFVeEIsU0FBU3NCLElBQVQsQ0FBZDtBQUNBLFlBQUksQ0FBQ0UsT0FBTCxFQUFjO0FBQ1YsbUJBQU8sSUFBUDtBQUNIO0FBQ0QsWUFBSUwsVUFBVVQsT0FBT2UsUUFBUCxDQUFnQkosYUFBaEIsQ0FBOEJHLE9BQTlCLENBQWQ7QUFDQUwsZ0JBQVFDLFNBQVIsR0FBb0JJLE9BQXBCO0FBQ0EsWUFBSTdGLE9BQU80RSxlQUFlZSxJQUFmLENBQVg7QUFDQSxZQUFJM0YsUUFBUTRGLFVBQVosRUFBd0I7QUFDcEJKLG9CQUFReEYsSUFBUixJQUFnQjRGLFdBQVdHLElBQVgsRUFBaEI7QUFDSDtBQUNELGVBQU9QLE9BQVA7QUFDSDs7QUFFRCxRQUFJUSxVQUFVakIsT0FBT2UsUUFBUCxDQUFnQkosYUFBaEIsQ0FBOEIsS0FBOUIsQ0FBZDtBQUFBLFFBQ0lILFVBQVVTLE9BRGQ7QUFBQSxRQUVJQyxDQUZKO0FBQUEsUUFHSUMsV0FBVyxFQUhmOztBQUtBLFdBQU8sQ0FBQ0QsSUFBSWpCLFdBQUwsTUFBc0IsSUFBN0IsRUFBbUM7QUFDL0IsWUFBSWlCLEVBQUUsQ0FBRixNQUFTLEdBQWIsRUFBa0I7QUFDZCxnQkFBSUEsRUFBRSxDQUFGLE1BQVMsR0FBYixFQUFrQjtBQUNkO0FBQ0Esb0JBQUlDLFNBQVN4RyxNQUFULElBQ0F3RyxTQUFTQSxTQUFTeEcsTUFBVCxHQUFrQixDQUEzQixNQUFrQ3VHLEVBQUUvQixNQUFGLENBQVMsQ0FBVCxFQUFZcEQsT0FBWixDQUFvQixHQUFwQixFQUF5QixFQUF6QixDQUR0QyxFQUNvRTtBQUNoRW9GLDZCQUFTQyxHQUFUO0FBQ0FaLDhCQUFVQSxRQUFRYSxVQUFsQjtBQUNIO0FBQ0Q7QUFDQTtBQUNIO0FBQ0QsZ0JBQUl4RCxLQUFLdEMsZUFBZTJGLEVBQUUvQixNQUFGLENBQVMsQ0FBVCxFQUFZK0IsRUFBRXZHLE1BQUYsR0FBVyxDQUF2QixDQUFmLENBQVQ7QUFDQSxnQkFBSTJHLElBQUo7QUFDQSxnQkFBSXpELEVBQUosRUFBUTtBQUNKO0FBQ0F5RCx1QkFBT3RCLE9BQU9lLFFBQVAsQ0FBZ0JRLDJCQUFoQixDQUE0QyxXQUE1QyxFQUF5RDFELEVBQXpELENBQVA7QUFDQTJDLHdCQUFRZ0IsV0FBUixDQUFvQkYsSUFBcEI7QUFDQTtBQUNIO0FBQ0QsZ0JBQUkzRixJQUFJdUYsRUFBRXBGLEtBQUYsQ0FBUSxrREFBUixDQUFSO0FBQ0E7QUFDQSxnQkFBSSxDQUFDSCxDQUFMLEVBQVE7QUFDSjtBQUNIO0FBQ0Q7QUFDQTJGLG1CQUFPWCxjQUFjaEYsRUFBRSxDQUFGLENBQWQsRUFBb0JBLEVBQUUsQ0FBRixDQUFwQixDQUFQO0FBQ0EsZ0JBQUksQ0FBQzJGLElBQUwsRUFBVztBQUNQO0FBQ0g7QUFDRDtBQUNBO0FBQ0EsZ0JBQUksQ0FBQ2YsVUFBVUMsT0FBVixFQUFtQmMsSUFBbkIsQ0FBTCxFQUErQjtBQUMzQjtBQUNIO0FBQ0Q7QUFDQSxnQkFBSTNGLEVBQUUsQ0FBRixDQUFKLEVBQVU7QUFDTjJGLHFCQUFLRyxTQUFMLEdBQWlCOUYsRUFBRSxDQUFGLEVBQUt3RCxNQUFMLENBQVksQ0FBWixFQUFlcEQsT0FBZixDQUF1QixHQUF2QixFQUE0QixHQUE1QixDQUFqQjtBQUNIO0FBQ0Q7QUFDQTtBQUNBb0YscUJBQVNPLElBQVQsQ0FBYy9GLEVBQUUsQ0FBRixDQUFkO0FBQ0E2RSxvQkFBUWdCLFdBQVIsQ0FBb0JGLElBQXBCO0FBQ0FkLHNCQUFVYyxJQUFWO0FBQ0E7QUFDSDs7QUFFRDtBQUNBZCxnQkFBUWdCLFdBQVIsQ0FBb0J4QixPQUFPZSxRQUFQLENBQWdCWSxjQUFoQixDQUErQnJCLFNBQVNZLENBQVQsQ0FBL0IsQ0FBcEI7QUFDSDs7QUFFRCxXQUFPRCxPQUFQO0FBQ0g7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUlXLGlCQUFpQixDQUFDLE1BQUQsRUFBUyxNQUFULEVBQWlCLE1BQWpCLEVBQXlCLE1BQXpCLEVBQWlDLE1BQWpDLEVBQXlDLE1BQXpDLEVBQ2pCLE1BRGlCLEVBQ1QsTUFEUyxFQUNELE1BREMsRUFDTyxNQURQLEVBQ2UsTUFEZixFQUN1QixNQUR2QixFQUMrQixNQUQvQixFQUN1QyxNQUR2QyxFQUMrQyxNQUQvQyxFQUVqQixNQUZpQixFQUVULE1BRlMsRUFFRCxNQUZDLEVBRU8sTUFGUCxFQUVlLE1BRmYsRUFFdUIsTUFGdkIsRUFFK0IsTUFGL0IsRUFFdUMsTUFGdkMsRUFFK0MsTUFGL0MsRUFHakIsTUFIaUIsRUFHVCxNQUhTLEVBR0QsTUFIQyxFQUdPLE1BSFAsRUFHZSxNQUhmLEVBR3VCLE1BSHZCLEVBRytCLE1BSC9CLEVBR3VDLE1BSHZDLEVBRytDLE1BSC9DLEVBSWpCLE1BSmlCLEVBSVQsTUFKUyxFQUlELE1BSkMsRUFJTyxNQUpQLEVBSWUsTUFKZixFQUl1QixNQUp2QixFQUkrQixNQUovQixFQUl1QyxNQUp2QyxFQUkrQyxNQUovQyxFQUtqQixNQUxpQixFQUtULE1BTFMsRUFLRCxNQUxDLEVBS08sTUFMUCxFQUtlLE1BTGYsRUFLdUIsTUFMdkIsRUFLK0IsTUFML0IsRUFLdUMsTUFMdkMsRUFLK0MsTUFML0MsRUFNakIsTUFOaUIsRUFNVCxNQU5TLEVBTUQsTUFOQyxFQU1PLE1BTlAsRUFNZSxNQU5mLEVBTXVCLE1BTnZCLEVBTStCLE1BTi9CLEVBTXVDLE1BTnZDLEVBTStDLE1BTi9DLEVBT2pCLE1BUGlCLEVBT1QsTUFQUyxFQU9ELE1BUEMsRUFPTyxNQVBQLEVBT2UsTUFQZixFQU91QixNQVB2QixFQU8rQixNQVAvQixFQU91QyxNQVB2QyxFQU8rQyxNQVAvQyxFQVFqQixNQVJpQixFQVFULE1BUlMsRUFRRCxNQVJDLEVBUU8sTUFSUCxFQVFlLE1BUmYsRUFRdUIsTUFSdkIsRUFRK0IsTUFSL0IsRUFRdUMsTUFSdkMsRUFRK0MsTUFSL0MsRUFTakIsTUFUaUIsRUFTVCxNQVRTLEVBU0QsTUFUQyxFQVNPLE1BVFAsRUFTZSxNQVRmLEVBU3VCLE1BVHZCLEVBUytCLE1BVC9CLEVBU3VDLE1BVHZDLEVBUytDLE1BVC9DLEVBVWpCLE1BVmlCLEVBVVQsTUFWUyxFQVVELE1BVkMsRUFVTyxNQVZQLEVBVWUsTUFWZixFQVV1QixNQVZ2QixFQVUrQixNQVYvQixFQVV1QyxNQVZ2QyxFQVUrQyxNQVYvQyxFQVdqQixNQVhpQixFQVdULE1BWFMsRUFXRCxNQVhDLEVBV08sTUFYUCxFQVdlLE1BWGYsRUFXdUIsTUFYdkIsRUFXK0IsTUFYL0IsRUFXdUMsTUFYdkMsRUFXK0MsTUFYL0MsRUFZakIsTUFaaUIsRUFZVCxNQVpTLEVBWUQsTUFaQyxFQVlPLE1BWlAsRUFZZSxNQVpmLEVBWXVCLE1BWnZCLEVBWStCLE1BWi9CLEVBWXVDLE1BWnZDLEVBWStDLE1BWi9DLEVBYWpCLE1BYmlCLEVBYVQsTUFiUyxFQWFELE1BYkMsRUFhTyxNQWJQLEVBYWUsTUFiZixFQWF1QixNQWJ2QixFQWErQixNQWIvQixFQWF1QyxNQWJ2QyxFQWErQyxNQWIvQyxFQWNqQixNQWRpQixFQWNULE1BZFMsRUFjRCxNQWRDLEVBY08sTUFkUCxFQWNlLE1BZGYsRUFjdUIsTUFkdkIsRUFjK0IsTUFkL0IsRUFjdUMsTUFkdkMsRUFjK0MsTUFkL0MsRUFlakIsTUFmaUIsRUFlVCxNQWZTLEVBZUQsTUFmQyxFQWVPLE1BZlAsRUFlZSxNQWZmLEVBZXVCLE1BZnZCLEVBZStCLE1BZi9CLEVBZXVDLE1BZnZDLEVBZStDLE1BZi9DLEVBZ0JqQixNQWhCaUIsRUFnQlQsTUFoQlMsRUFnQkQsTUFoQkMsRUFnQk8sTUFoQlAsRUFnQmUsTUFoQmYsRUFnQnVCLE1BaEJ2QixFQWdCK0IsTUFoQi9CLEVBZ0J1QyxNQWhCdkMsRUFnQitDLE1BaEIvQyxFQWlCakIsTUFqQmlCLEVBaUJULE1BakJTLEVBaUJELE1BakJDLEVBaUJPLE1BakJQLEVBaUJlLE1BakJmLEVBaUJ1QixNQWpCdkIsRUFpQitCLE1BakIvQixFQWlCdUMsTUFqQnZDLEVBaUIrQyxNQWpCL0MsRUFrQmpCLE1BbEJpQixFQWtCVCxNQWxCUyxFQWtCRCxNQWxCQyxFQWtCTyxNQWxCUCxFQWtCZSxNQWxCZixFQWtCdUIsTUFsQnZCLEVBa0IrQixNQWxCL0IsRUFrQnVDLE1BbEJ2QyxFQWtCK0MsTUFsQi9DLEVBbUJqQixNQW5CaUIsRUFtQlQsTUFuQlMsRUFtQkQsTUFuQkMsRUFtQk8sTUFuQlAsRUFtQmUsTUFuQmYsRUFtQnVCLE1BbkJ2QixFQW1CK0IsTUFuQi9CLEVBbUJ1QyxNQW5CdkMsRUFtQitDLE1BbkIvQyxFQW9CakIsTUFwQmlCLEVBb0JULE1BcEJTLEVBb0JELE1BcEJDLEVBb0JPLE1BcEJQLEVBb0JlLE1BcEJmLEVBb0J1QixNQXBCdkIsRUFvQitCLE1BcEIvQixFQW9CdUMsTUFwQnZDLEVBb0IrQyxNQXBCL0MsRUFxQmpCLE1BckJpQixFQXFCVCxNQXJCUyxFQXFCRCxNQXJCQyxFQXFCTyxNQXJCUCxFQXFCZSxNQXJCZixFQXFCdUIsTUFyQnZCLEVBcUIrQixNQXJCL0IsRUFxQnVDLE1BckJ2QyxFQXFCK0MsTUFyQi9DLEVBc0JqQixNQXRCaUIsRUFzQlQsTUF0QlMsRUFzQkQsTUF0QkMsRUFzQk8sTUF0QlAsRUFzQmUsTUF0QmYsRUFzQnVCLE1BdEJ2QixFQXNCK0IsTUF0Qi9CLEVBc0J1QyxNQXRCdkMsRUFzQitDLE1BdEIvQyxFQXVCakIsTUF2QmlCLEVBdUJULE1BdkJTLEVBdUJELE1BdkJDLEVBdUJPLE1BdkJQLEVBdUJlLE1BdkJmLEVBdUJ1QixNQXZCdkIsRUF1QitCLE1BdkIvQixFQXVCdUMsTUF2QnZDLEVBdUIrQyxNQXZCL0MsRUF3QmpCLE1BeEJpQixFQXdCVCxNQXhCUyxFQXdCRCxNQXhCQyxFQXdCTyxNQXhCUCxFQXdCZSxNQXhCZixFQXdCdUIsTUF4QnZCLEVBd0IrQixNQXhCL0IsRUF3QnVDLE1BeEJ2QyxFQXdCK0MsTUF4Qi9DLEVBeUJqQixNQXpCaUIsRUF5QlQsTUF6QlMsRUF5QkQsTUF6QkMsRUF5Qk8sTUF6QlAsRUF5QmUsTUF6QmYsRUF5QnVCLE1BekJ2QixFQXlCK0IsTUF6Qi9CLEVBeUJ1QyxNQXpCdkMsRUF5QitDLE1BekIvQyxFQTBCakIsTUExQmlCLEVBMEJULE1BMUJTLEVBMEJELE1BMUJDLEVBMEJPLE1BMUJQLEVBMEJlLE1BMUJmLEVBMEJ1QixNQTFCdkIsRUEwQitCLE1BMUIvQixFQTBCdUMsTUExQnZDLEVBMEIrQyxNQTFCL0MsRUEyQmpCLE1BM0JpQixFQTJCVCxNQTNCUyxFQTJCRCxNQTNCQyxFQTJCTyxNQTNCUCxFQTJCZSxNQTNCZixFQTJCdUIsTUEzQnZCLEVBMkIrQixNQTNCL0IsRUEyQnVDLE1BM0J2QyxFQTJCK0MsTUEzQi9DLEVBNEJqQixNQTVCaUIsRUE0QlQsTUE1QlMsRUE0QkQsTUE1QkMsRUE0Qk8sTUE1QlAsRUE0QmUsTUE1QmYsRUE0QnVCLE1BNUJ2QixFQTRCK0IsTUE1Qi9CLEVBNEJ1QyxNQTVCdkMsRUE0QitDLE1BNUIvQyxFQTZCakIsTUE3QmlCLEVBNkJULE1BN0JTLEVBNkJELE1BN0JDLEVBNkJPLE1BN0JQLEVBNkJlLE1BN0JmLEVBNkJ1QixNQTdCdkIsRUE2QitCLE1BN0IvQixFQTZCdUMsTUE3QnZDLEVBNkIrQyxNQTdCL0MsRUE4QmpCLE1BOUJpQixFQThCVCxNQTlCUyxFQThCRCxNQTlCQyxFQThCTyxNQTlCUCxFQThCZSxNQTlCZixFQThCdUIsTUE5QnZCLEVBOEIrQixNQTlCL0IsRUE4QnVDLE1BOUJ2QyxFQThCK0MsTUE5Qi9DLEVBK0JqQixNQS9CaUIsRUErQlQsTUEvQlMsRUErQkQsTUEvQkMsRUErQk8sTUEvQlAsRUErQmUsTUEvQmYsRUErQnVCLE1BL0J2QixFQStCK0IsTUEvQi9CLEVBK0J1QyxNQS9CdkMsRUErQitDLE1BL0IvQyxFQWdDakIsTUFoQ2lCLEVBZ0NULE1BaENTLEVBZ0NELE1BaENDLEVBZ0NPLE1BaENQLEVBZ0NlLE1BaENmLEVBZ0N1QixNQWhDdkIsRUFnQytCLE1BaEMvQixFQWdDdUMsTUFoQ3ZDLEVBZ0MrQyxNQWhDL0MsRUFpQ2pCLE1BakNpQixFQWlDVCxNQWpDUyxFQWlDRCxNQWpDQyxFQWlDTyxNQWpDUCxFQWlDZSxNQWpDZixFQWlDdUIsTUFqQ3ZCLEVBaUMrQixNQWpDL0IsRUFpQ3VDLE1BakN2QyxFQWlDK0MsTUFqQy9DLEVBa0NqQixNQWxDaUIsRUFrQ1QsTUFsQ1MsRUFrQ0QsTUFsQ0MsRUFrQ08sTUFsQ1AsRUFrQ2UsTUFsQ2YsRUFrQ3VCLE1BbEN2QixFQWtDK0IsTUFsQy9CLEVBa0N1QyxNQWxDdkMsRUFrQytDLE1BbEMvQyxFQW1DakIsTUFuQ2lCLEVBbUNULE1BbkNTLEVBbUNELE1BbkNDLEVBbUNPLE1BbkNQLEVBbUNlLE1BbkNmLEVBbUN1QixNQW5DdkIsRUFtQytCLE1BbkMvQixFQW1DdUMsTUFuQ3ZDLEVBbUMrQyxNQW5DL0MsRUFvQ2pCLE1BcENpQixFQW9DVCxNQXBDUyxFQW9DRCxNQXBDQyxFQW9DTyxNQXBDUCxFQW9DZSxNQXBDZixFQW9DdUIsTUFwQ3ZCLEVBb0MrQixNQXBDL0IsRUFvQ3VDLE1BcEN2QyxFQW9DK0MsTUFwQy9DLEVBcUNqQixNQXJDaUIsRUFxQ1QsTUFyQ1MsRUFxQ0QsTUFyQ0MsRUFxQ08sTUFyQ1AsRUFxQ2UsTUFyQ2YsRUFxQ3VCLE1BckN2QixFQXFDK0IsTUFyQy9CLEVBcUN1QyxNQXJDdkMsRUFxQytDLE1BckMvQyxFQXNDakIsTUF0Q2lCLEVBc0NULE1BdENTLEVBc0NELE1BdENDLEVBc0NPLE1BdENQLEVBc0NlLE1BdENmLEVBc0N1QixNQXRDdkIsRUFzQytCLE1BdEMvQixFQXNDdUMsTUF0Q3ZDLEVBc0MrQyxNQXRDL0MsRUF1Q2pCLE1BdkNpQixFQXVDVCxNQXZDUyxFQXVDRCxNQXZDQyxFQXVDTyxNQXZDUCxFQXVDZSxNQXZDZixFQXVDdUIsTUF2Q3ZCLEVBdUMrQixNQXZDL0IsRUF1Q3VDLE1BdkN2QyxFQXVDK0MsTUF2Qy9DLEVBd0NqQixNQXhDaUIsRUF3Q1QsTUF4Q1MsRUF3Q0QsTUF4Q0MsRUF3Q08sTUF4Q1AsRUF3Q2UsTUF4Q2YsRUF3Q3VCLE1BeEN2QixFQXdDK0IsTUF4Qy9CLEVBd0N1QyxNQXhDdkMsRUF3QytDLE1BeEMvQyxFQXlDakIsTUF6Q2lCLEVBeUNULE1BekNTLEVBeUNELE1BekNDLEVBeUNPLE1BekNQLEVBeUNlLE1BekNmLEVBeUN1QixNQXpDdkIsRUF5QytCLE1BekMvQixFQXlDdUMsTUF6Q3ZDLEVBeUMrQyxNQXpDL0MsRUEwQ2pCLE1BMUNpQixFQTBDVCxNQTFDUyxFQTBDRCxNQTFDQyxFQTBDTyxNQTFDUCxFQTBDZSxNQTFDZixFQTBDdUIsTUExQ3ZCLEVBMEMrQixNQTFDL0IsRUEwQ3VDLE1BMUN2QyxFQTBDK0MsTUExQy9DLEVBMkNqQixNQTNDaUIsRUEyQ1QsTUEzQ1MsRUEyQ0QsTUEzQ0MsRUEyQ08sTUEzQ1AsRUEyQ2UsTUEzQ2YsRUEyQ3VCLE1BM0N2QixFQTJDK0IsTUEzQy9CLEVBMkN1QyxNQTNDdkMsRUEyQytDLE1BM0MvQyxFQTRDakIsTUE1Q2lCLEVBNENULE1BNUNTLEVBNENELE1BNUNDLEVBNENPLE1BNUNQLEVBNENlLE1BNUNmLEVBNEN1QixNQTVDdkIsRUE0QytCLE1BNUMvQixFQTRDdUMsTUE1Q3ZDLEVBNEMrQyxNQTVDL0MsRUE2Q2pCLE1BN0NpQixFQTZDVCxNQTdDUyxFQTZDRCxNQTdDQyxFQTZDTyxNQTdDUCxFQTZDZSxNQTdDZixFQTZDdUIsTUE3Q3ZCLEVBNkMrQixNQTdDL0IsRUE2Q3VDLE1BN0N2QyxFQTZDK0MsTUE3Qy9DLEVBOENqQixNQTlDaUIsRUE4Q1QsTUE5Q1MsRUE4Q0QsTUE5Q0MsRUE4Q08sTUE5Q1AsRUE4Q2UsTUE5Q2YsRUE4Q3VCLE1BOUN2QixFQThDK0IsTUE5Qy9CLEVBOEN1QyxNQTlDdkMsRUE4QytDLE1BOUMvQyxFQStDakIsTUEvQ2lCLEVBK0NULE1BL0NTLEVBK0NELE1BL0NDLEVBK0NPLE1BL0NQLEVBK0NlLE1BL0NmLEVBK0N1QixNQS9DdkIsRUErQytCLE1BL0MvQixFQStDdUMsTUEvQ3ZDLEVBK0MrQyxNQS9DL0MsRUFnRGpCLE1BaERpQixFQWdEVCxNQWhEUyxFQWdERCxNQWhEQyxFQWdETyxNQWhEUCxFQWdEZSxNQWhEZixFQWdEdUIsTUFoRHZCLEVBZ0QrQixNQWhEL0IsRUFnRHVDLE1BaER2QyxFQWdEK0MsTUFoRC9DLEVBaURqQixNQWpEaUIsRUFpRFQsTUFqRFMsRUFpREQsTUFqREMsRUFpRE8sTUFqRFAsRUFpRGUsTUFqRGYsRUFpRHVCLE1BakR2QixFQWlEK0IsTUFqRC9CLEVBaUR1QyxNQWpEdkMsRUFpRCtDLE1BakQvQyxFQWtEakIsTUFsRGlCLEVBa0RULE1BbERTLEVBa0RELE1BbERDLEVBa0RPLE1BbERQLEVBa0RlLE1BbERmLEVBa0R1QixNQWxEdkIsRUFrRCtCLE1BbEQvQixFQWtEdUMsTUFsRHZDLEVBa0QrQyxNQWxEL0MsRUFtRGpCLE1BbkRpQixFQW1EVCxNQW5EUyxFQW1ERCxNQW5EQyxFQW1ETyxNQW5EUCxFQW1EZSxNQW5EZixFQW1EdUIsTUFuRHZCLEVBbUQrQixNQW5EL0IsRUFtRHVDLE1BbkR2QyxFQW1EK0MsTUFuRC9DLEVBb0RqQixNQXBEaUIsRUFvRFQsTUFwRFMsRUFvREQsTUFwREMsRUFvRE8sTUFwRFAsRUFvRGUsTUFwRGYsRUFvRHVCLE1BcER2QixFQW9EK0IsTUFwRC9CLEVBb0R1QyxNQXBEdkMsRUFvRCtDLE1BcEQvQyxFQXFEakIsTUFyRGlCLEVBcURULE1BckRTLEVBcURELE1BckRDLEVBcURPLE1BckRQLEVBcURlLE1BckRmLEVBcUR1QixNQXJEdkIsRUFxRCtCLE1BckQvQixFQXFEdUMsTUFyRHZDLEVBcUQrQyxNQXJEL0MsRUFzRGpCLE1BdERpQixFQXNEVCxNQXREUyxFQXNERCxNQXREQyxFQXNETyxNQXREUCxFQXNEZSxNQXREZixFQXNEdUIsTUF0RHZCLEVBc0QrQixNQXREL0IsRUFzRHVDLE1BdER2QyxFQXNEK0MsTUF0RC9DLEVBdURqQixNQXZEaUIsRUF1RFQsTUF2RFMsRUF1REQsTUF2REMsRUF1RE8sTUF2RFAsRUF1RGUsTUF2RGYsRUF1RHVCLE1BdkR2QixFQXVEK0IsTUF2RC9CLEVBdUR1QyxNQXZEdkMsRUF1RCtDLE1BdkQvQyxFQXdEakIsTUF4RGlCLEVBd0RULE1BeERTLEVBd0RELE1BeERDLEVBd0RPLE1BeERQLEVBd0RlLE1BeERmLEVBd0R1QixNQXhEdkIsRUF3RCtCLE1BeEQvQixFQXdEdUMsTUF4RHZDLEVBd0QrQyxNQXhEL0MsRUF5RGpCLE1BekRpQixFQXlEVCxNQXpEUyxFQXlERCxNQXpEQyxFQXlETyxNQXpEUCxFQXlEZSxNQXpEZixFQXlEdUIsTUF6RHZCLEVBeUQrQixNQXpEL0IsRUF5RHVDLE1BekR2QyxFQXlEK0MsTUF6RC9DLEVBMERqQixNQTFEaUIsRUEwRFQsTUExRFMsRUEwREQsTUExREMsRUEwRE8sTUExRFAsRUEwRGUsTUExRGYsRUEwRHVCLE1BMUR2QixFQTBEK0IsTUExRC9CLEVBMER1QyxNQTFEdkMsRUEwRCtDLE1BMUQvQyxFQTJEakIsTUEzRGlCLEVBMkRULE1BM0RTLEVBMkRELE1BM0RDLEVBMkRPLE1BM0RQLEVBMkRlLE1BM0RmLEVBMkR1QixNQTNEdkIsRUEyRCtCLE1BM0QvQixFQTJEdUMsTUEzRHZDLEVBMkQrQyxNQTNEL0MsRUE0RGpCLE1BNURpQixFQTREVCxNQTVEUyxFQTRERCxNQTVEQyxFQTRETyxNQTVEUCxFQTREZSxNQTVEZixFQTREdUIsTUE1RHZCLEVBNEQrQixNQTVEL0IsRUE0RHVDLE1BNUR2QyxFQTREK0MsTUE1RC9DLEVBNkRqQixNQTdEaUIsRUE2RFQsTUE3RFMsRUE2REQsTUE3REMsRUE2RE8sTUE3RFAsRUE2RGUsTUE3RGYsRUE2RHVCLE1BN0R2QixFQTZEK0IsTUE3RC9CLEVBNkR1QyxNQTdEdkMsRUE2RCtDLE1BN0QvQyxFQThEakIsTUE5RGlCLEVBOERULE1BOURTLEVBOERELE1BOURDLEVBOERPLE1BOURQLEVBOERlLE1BOURmLEVBOER1QixNQTlEdkIsRUE4RCtCLE1BOUQvQixFQThEdUMsTUE5RHZDLEVBOEQrQyxNQTlEL0MsRUErRGpCLE1BL0RpQixFQStEVCxNQS9EUyxFQStERCxNQS9EQyxFQStETyxNQS9EUCxFQStEZSxNQS9EZixFQStEdUIsTUEvRHZCLEVBK0QrQixNQS9EL0IsRUErRHVDLE1BL0R2QyxFQStEK0MsTUEvRC9DLEVBZ0VqQixNQWhFaUIsRUFnRVQsTUFoRVMsRUFnRUQsTUFoRUMsRUFnRU8sTUFoRVAsRUFnRWUsTUFoRWYsRUFnRXVCLE1BaEV2QixFQWdFK0IsTUFoRS9CLEVBZ0V1QyxNQWhFdkMsRUFnRStDLE1BaEUvQyxFQWlFakIsTUFqRWlCLEVBaUVULE1BakVTLEVBaUVELE1BakVDLEVBaUVPLE1BakVQLEVBaUVlLE1BakVmLEVBaUV1QixNQWpFdkIsRUFpRStCLE1BakUvQixFQWlFdUMsTUFqRXZDLEVBaUUrQyxNQWpFL0MsRUFrRWpCLE1BbEVpQixFQWtFVCxNQWxFUyxFQWtFRCxNQWxFQyxFQWtFTyxNQWxFUCxFQWtFZSxNQWxFZixFQWtFdUIsTUFsRXZCLEVBa0UrQixNQWxFL0IsRUFrRXVDLE1BbEV2QyxFQWtFK0MsTUFsRS9DLEVBbUVqQixNQW5FaUIsRUFtRVQsTUFuRVMsRUFtRUQsTUFuRUMsRUFtRU8sTUFuRVAsRUFtRWUsTUFuRWYsRUFtRXVCLE1BbkV2QixFQW1FK0IsTUFuRS9CLEVBbUV1QyxNQW5FdkMsRUFtRStDLE1BbkUvQyxFQW9FakIsTUFwRWlCLEVBb0VULE1BcEVTLEVBb0VELE1BcEVDLEVBb0VPLE1BcEVQLEVBb0VlLE1BcEVmLEVBb0V1QixNQXBFdkIsRUFvRStCLE1BcEUvQixFQW9FdUMsTUFwRXZDLEVBb0UrQyxNQXBFL0MsRUFxRWpCLE1BckVpQixFQXFFVCxNQXJFUyxFQXFFRCxNQXJFQyxFQXFFTyxNQXJFUCxFQXFFZSxNQXJFZixFQXFFdUIsTUFyRXZCLEVBcUUrQixNQXJFL0IsRUFxRXVDLE1BckV2QyxFQXFFK0MsTUFyRS9DLEVBc0VqQixNQXRFaUIsRUFzRVQsTUF0RVMsRUFzRUQsTUF0RUMsRUFzRU8sTUF0RVAsRUFzRWUsTUF0RWYsRUFzRXVCLE1BdEV2QixFQXNFK0IsTUF0RS9CLEVBc0V1QyxNQXRFdkMsRUFzRStDLE1BdEUvQyxFQXVFakIsTUF2RWlCLEVBdUVULE1BdkVTLEVBdUVELE1BdkVDLEVBdUVPLE1BdkVQLEVBdUVlLE1BdkVmLEVBdUV1QixNQXZFdkIsRUF1RStCLE1BdkUvQixFQXVFdUMsTUF2RXZDLEVBdUUrQyxNQXZFL0MsRUF3RWpCLE1BeEVpQixFQXdFVCxNQXhFUyxFQXdFRCxNQXhFQyxFQXdFTyxNQXhFUCxFQXdFZSxNQXhFZixFQXdFdUIsTUF4RXZCLEVBd0UrQixNQXhFL0IsRUF3RXVDLE1BeEV2QyxFQXdFK0MsTUF4RS9DLEVBeUVqQixNQXpFaUIsRUF5RVQsTUF6RVMsRUF5RUQsTUF6RUMsRUF5RU8sTUF6RVAsRUF5RWUsTUF6RWYsRUF5RXVCLE1BekV2QixFQXlFK0IsTUF6RS9CLEVBeUV1QyxNQXpFdkMsRUF5RStDLE1BekUvQyxFQTBFakIsTUExRWlCLEVBMEVULE1BMUVTLEVBMEVELE1BMUVDLEVBMEVPLE1BMUVQLEVBMEVlLE1BMUVmLEVBMEV1QixNQTFFdkIsRUEwRStCLE1BMUUvQixFQTBFdUMsTUExRXZDLEVBMEUrQyxNQTFFL0MsRUEyRWpCLE1BM0VpQixFQTJFVCxNQTNFUyxFQTJFRCxNQTNFQyxFQTJFTyxNQTNFUCxFQTJFZSxNQTNFZixFQTJFdUIsTUEzRXZCLEVBMkUrQixNQTNFL0IsRUEyRXVDLE1BM0V2QyxFQTJFK0MsTUEzRS9DLEVBNEVqQixNQTVFaUIsRUE0RVQsTUE1RVMsRUE0RUQsTUE1RUMsRUE0RU8sTUE1RVAsRUE0RWUsTUE1RWYsRUE0RXVCLE1BNUV2QixFQTRFK0IsTUE1RS9CLEVBNEV1QyxNQTVFdkMsRUE0RStDLE1BNUUvQyxFQTZFakIsTUE3RWlCLEVBNkVULE1BN0VTLEVBNkVELE1BN0VDLEVBNkVPLE1BN0VQLEVBNkVlLE1BN0VmLEVBNkV1QixNQTdFdkIsRUE2RStCLE1BN0UvQixFQTZFdUMsTUE3RXZDLEVBNkUrQyxNQTdFL0MsRUE4RWpCLE1BOUVpQixFQThFVCxNQTlFUyxFQThFRCxNQTlFQyxFQThFTyxNQTlFUCxFQThFZSxNQTlFZixFQThFdUIsTUE5RXZCLEVBOEUrQixNQTlFL0IsRUE4RXVDLE1BOUV2QyxFQThFK0MsTUE5RS9DLEVBK0VqQixNQS9FaUIsRUErRVQsTUEvRVMsRUErRUQsTUEvRUMsRUErRU8sTUEvRVAsRUErRWUsTUEvRWYsRUErRXVCLE1BL0V2QixFQStFK0IsTUEvRS9CLEVBK0V1QyxNQS9FdkMsRUErRStDLE1BL0UvQyxFQWdGakIsTUFoRmlCLEVBZ0ZULE1BaEZTLEVBZ0ZELE1BaEZDLEVBZ0ZPLE1BaEZQLEVBZ0ZlLE1BaEZmLEVBZ0Z1QixNQWhGdkIsRUFnRitCLE1BaEYvQixFQWdGdUMsTUFoRnZDLEVBZ0YrQyxNQWhGL0MsRUFpRmpCLE1BakZpQixFQWlGVCxNQWpGUyxFQWlGRCxNQWpGQyxFQWlGTyxNQWpGUCxFQWlGZSxNQWpGZixFQWlGdUIsTUFqRnZCLEVBaUYrQixNQWpGL0IsRUFpRnVDLE1BakZ2QyxFQWlGK0MsTUFqRi9DLEVBa0ZqQixNQWxGaUIsRUFrRlQsTUFsRlMsRUFrRkQsTUFsRkMsRUFrRk8sTUFsRlAsRUFrRmUsTUFsRmYsRUFrRnVCLE1BbEZ2QixFQWtGK0IsTUFsRi9CLEVBa0Z1QyxNQWxGdkMsRUFrRitDLE1BbEYvQyxFQW1GakIsTUFuRmlCLEVBbUZULE1BbkZTLEVBbUZELE1BbkZDLEVBbUZPLE1BbkZQLEVBbUZlLE1BbkZmLEVBbUZ1QixNQW5GdkIsRUFtRitCLE1BbkYvQixFQW1GdUMsTUFuRnZDLEVBbUYrQyxNQW5GL0MsRUFvRmpCLE1BcEZpQixFQW9GVCxNQXBGUyxFQW9GRCxNQXBGQyxFQW9GTyxNQXBGUCxFQW9GZSxNQXBGZixFQW9GdUIsTUFwRnZCLEVBb0YrQixNQXBGL0IsRUFvRnVDLE1BcEZ2QyxFQW9GK0MsTUFwRi9DLEVBcUZqQixNQXJGaUIsRUFxRlQsTUFyRlMsRUFxRkQsTUFyRkMsRUFxRk8sTUFyRlAsRUFxRmUsTUFyRmYsRUFxRnVCLE1BckZ2QixFQXFGK0IsTUFyRi9CLEVBcUZ1QyxNQXJGdkMsRUFxRitDLE1BckYvQyxFQXNGakIsTUF0RmlCLEVBc0ZULE1BdEZTLEVBc0ZELE1BdEZDLEVBc0ZPLE1BdEZQLEVBc0ZlLE1BdEZmLEVBc0Z1QixNQXRGdkIsRUFzRitCLE1BdEYvQixFQXNGdUMsTUF0RnZDLEVBc0YrQyxNQXRGL0MsRUF1RmpCLE1BdkZpQixFQXVGVCxNQXZGUyxFQXVGRCxNQXZGQyxFQXVGTyxNQXZGUCxFQXVGZSxNQXZGZixFQXVGdUIsTUF2RnZCLEVBdUYrQixNQXZGL0IsRUF1RnVDLE1BdkZ2QyxFQXVGK0MsTUF2Ri9DLEVBd0ZqQixNQXhGaUIsRUF3RlQsTUF4RlMsRUF3RkQsTUF4RkMsRUF3Rk8sTUF4RlAsRUF3RmUsTUF4RmYsRUF3RnVCLE1BeEZ2QixFQXdGK0IsTUF4Ri9CLEVBd0Z1QyxNQXhGdkMsRUF3RitDLE1BeEYvQyxFQXlGakIsTUF6RmlCLEVBeUZULE1BekZTLEVBeUZELE1BekZDLEVBeUZPLE1BekZQLEVBeUZlLE1BekZmLEVBeUZ1QixNQXpGdkIsRUF5RitCLE1BekYvQixFQXlGdUMsTUF6RnZDLEVBeUYrQyxNQXpGL0MsRUEwRmpCLE1BMUZpQixFQTBGVCxNQTFGUyxFQTBGRCxNQTFGQyxFQTBGTyxNQTFGUCxFQTBGZSxNQTFGZixFQTBGdUIsTUExRnZCLEVBMEYrQixNQTFGL0IsRUEwRnVDLE1BMUZ2QyxFQTBGK0MsTUExRi9DLEVBMkZqQixNQTNGaUIsRUEyRlQsTUEzRlMsRUEyRkQsTUEzRkMsRUEyRk8sTUEzRlAsRUEyRmUsTUEzRmYsRUEyRnVCLE1BM0Z2QixFQTJGK0IsTUEzRi9CLEVBMkZ1QyxNQTNGdkMsRUEyRitDLE1BM0YvQyxFQTRGakIsTUE1RmlCLEVBNEZULE1BNUZTLEVBNEZELE1BNUZDLEVBNEZPLE1BNUZQLEVBNEZlLE1BNUZmLEVBNEZ1QixNQTVGdkIsRUE0RitCLE1BNUYvQixFQTRGdUMsTUE1RnZDLEVBNEYrQyxNQTVGL0MsRUE2RmpCLE1BN0ZpQixFQTZGVCxNQTdGUyxFQTZGRCxNQTdGQyxFQTZGTyxNQTdGUCxFQTZGZSxNQTdGZixFQTZGdUIsTUE3RnZCLEVBNkYrQixNQTdGL0IsRUE2RnVDLE1BN0Z2QyxFQTZGK0MsTUE3Ri9DLEVBOEZqQixNQTlGaUIsRUE4RlQsTUE5RlMsRUE4RkQsTUE5RkMsRUE4Rk8sTUE5RlAsRUE4RmUsTUE5RmYsRUE4RnVCLE1BOUZ2QixFQThGK0IsTUE5Ri9CLEVBOEZ1QyxNQTlGdkMsRUE4RitDLE1BOUYvQyxFQStGakIsTUEvRmlCLEVBK0ZULE1BL0ZTLEVBK0ZELE1BL0ZDLEVBK0ZPLE1BL0ZQLEVBK0ZlLE1BL0ZmLEVBK0Z1QixNQS9GdkIsRUErRitCLE1BL0YvQixFQStGdUMsTUEvRnZDLEVBK0YrQyxNQS9GL0MsRUFnR2pCLE1BaEdpQixFQWdHVCxNQWhHUyxFQWdHRCxNQWhHQyxFQWdHTyxNQWhHUCxFQWdHZSxNQWhHZixFQWdHdUIsTUFoR3ZCLEVBZ0crQixNQWhHL0IsRUFnR3VDLE1BaEd2QyxFQWdHK0MsTUFoRy9DLEVBaUdqQixNQWpHaUIsRUFpR1QsTUFqR1MsRUFpR0QsTUFqR0MsRUFpR08sTUFqR1AsRUFpR2UsTUFqR2YsRUFpR3VCLE1Bakd2QixFQWlHK0IsTUFqRy9CLEVBaUd1QyxNQWpHdkMsRUFpRytDLE1BakcvQyxFQWtHakIsTUFsR2lCLEVBa0dULE1BbEdTLEVBa0dELE1BbEdDLEVBa0dPLE1BbEdQLEVBa0dlLE1BbEdmLEVBa0d1QixNQWxHdkIsRUFrRytCLE1BbEcvQixFQWtHdUMsTUFsR3ZDLEVBa0crQyxNQWxHL0MsRUFtR2pCLE1BbkdpQixFQW1HVCxNQW5HUyxFQW1HRCxNQW5HQyxFQW1HTyxNQW5HUCxFQW1HZSxNQW5HZixFQW1HdUIsTUFuR3ZCLEVBbUcrQixNQW5HL0IsRUFtR3VDLE1Bbkd2QyxFQW1HK0MsTUFuRy9DLEVBb0dqQixNQXBHaUIsRUFvR1QsTUFwR1MsRUFvR0QsTUFwR0MsRUFvR08sTUFwR1AsRUFvR2UsTUFwR2YsRUFvR3VCLE1BcEd2QixFQW9HK0IsTUFwRy9CLEVBb0d1QyxNQXBHdkMsRUFvRytDLE1BcEcvQyxFQXFHakIsTUFyR2lCLEVBcUdULE1BckdTLEVBcUdELE1BckdDLEVBcUdPLE1BckdQLEVBcUdlLE1BckdmLEVBcUd1QixNQXJHdkIsRUFxRytCLE1BckcvQixFQXFHdUMsTUFyR3ZDLEVBcUcrQyxNQXJHL0MsRUFzR2pCLE1BdEdpQixFQXNHVCxNQXRHUyxFQXNHRCxNQXRHQyxFQXNHTyxNQXRHUCxFQXNHZSxNQXRHZixFQXNHdUIsTUF0R3ZCLEVBc0crQixNQXRHL0IsRUFzR3VDLE1BdEd2QyxFQXNHK0MsTUF0Ry9DLEVBdUdqQixNQXZHaUIsRUF1R1QsTUF2R1MsRUF1R0QsTUF2R0MsRUF1R08sTUF2R1AsRUF1R2UsTUF2R2YsRUF1R3VCLE1Bdkd2QixFQXVHK0IsTUF2Ry9CLEVBdUd1QyxNQXZHdkMsRUF1RytDLE1BdkcvQyxFQXdHakIsTUF4R2lCLEVBd0dULE1BeEdTLEVBd0dELE1BeEdDLEVBd0dPLE1BeEdQLEVBd0dlLE1BeEdmLEVBd0d1QixNQXhHdkIsRUF3RytCLE1BeEcvQixFQXdHdUMsTUF4R3ZDLEVBd0crQyxNQXhHL0MsRUF5R2pCLE1BekdpQixFQXlHVCxNQXpHUyxFQXlHRCxNQXpHQyxFQXlHTyxNQXpHUCxFQXlHZSxNQXpHZixFQXlHdUIsTUF6R3ZCLEVBeUcrQixNQXpHL0IsRUF5R3VDLE1Bekd2QyxFQXlHK0MsTUF6Ry9DLEVBMEdqQixNQTFHaUIsRUEwR1QsTUExR1MsRUEwR0QsTUExR0MsRUEwR08sTUExR1AsRUEwR2UsTUExR2YsRUEwR3VCLE1BMUd2QixFQTBHK0IsTUExRy9CLEVBMEd1QyxNQTFHdkMsRUEwRytDLE1BMUcvQyxFQTJHakIsTUEzR2lCLEVBMkdULE1BM0dTLEVBMkdELE1BM0dDLEVBMkdPLE1BM0dQLEVBMkdlLE1BM0dmLEVBMkd1QixNQTNHdkIsRUEyRytCLE1BM0cvQixFQTJHdUMsTUEzR3ZDLEVBMkcrQyxNQTNHL0MsRUE0R2pCLE1BNUdpQixFQTRHVCxNQTVHUyxFQTRHRCxNQTVHQyxFQTRHTyxNQTVHUCxFQTRHZSxNQTVHZixFQTRHdUIsTUE1R3ZCLEVBNEcrQixNQTVHL0IsRUE0R3VDLE1BNUd2QyxFQTRHK0MsTUE1Ry9DLEVBNkdqQixNQTdHaUIsRUE2R1QsTUE3R1MsRUE2R0QsTUE3R0MsRUE2R08sTUE3R1AsRUE2R2UsTUE3R2YsRUE2R3VCLE1BN0d2QixFQTZHK0IsTUE3Ry9CLEVBNkd1QyxNQTdHdkMsRUE2RytDLE1BN0cvQyxFQThHakIsTUE5R2lCLEVBOEdULE1BOUdTLEVBOEdELE1BOUdDLEVBOEdPLE1BOUdQLEVBOEdlLE1BOUdmLEVBOEd1QixNQTlHdkIsRUE4RytCLE1BOUcvQixFQThHdUMsTUE5R3ZDLEVBOEcrQyxNQTlHL0MsRUErR2pCLE1BL0dpQixFQStHVCxNQS9HUyxFQStHRCxNQS9HQyxFQStHTyxNQS9HUCxFQStHZSxNQS9HZixFQStHdUIsTUEvR3ZCLEVBK0crQixNQS9HL0IsRUErR3VDLE1BL0d2QyxFQStHK0MsTUEvRy9DLEVBZ0hqQixNQWhIaUIsRUFnSFQsTUFoSFMsRUFnSEQsTUFoSEMsRUFnSE8sTUFoSFAsRUFnSGUsTUFoSGYsRUFnSHVCLE1BaEh2QixFQWdIK0IsTUFoSC9CLEVBZ0h1QyxNQWhIdkMsRUFnSCtDLE1BaEgvQyxFQWlIakIsTUFqSGlCLEVBaUhULE1BakhTLEVBaUhELE1BakhDLEVBaUhPLE1BakhQLEVBaUhlLE1BakhmLEVBaUh1QixNQWpIdkIsRUFpSCtCLE1BakgvQixFQWlIdUMsTUFqSHZDLEVBaUgrQyxNQWpIL0MsRUFrSGpCLE1BbEhpQixFQWtIVCxNQWxIUyxFQWtIRCxNQWxIQyxFQWtITyxNQWxIUCxFQWtIZSxNQWxIZixFQWtIdUIsTUFsSHZCLEVBa0grQixNQWxIL0IsRUFrSHVDLE1BbEh2QyxFQWtIK0MsTUFsSC9DLEVBbUhqQixNQW5IaUIsRUFtSFQsTUFuSFMsRUFtSEQsTUFuSEMsRUFtSE8sTUFuSFAsRUFtSGUsTUFuSGYsRUFtSHVCLE1Bbkh2QixFQW1IK0IsTUFuSC9CLEVBbUh1QyxNQW5IdkMsRUFtSCtDLE1BbkgvQyxFQW9IakIsTUFwSGlCLEVBb0hULE1BcEhTLEVBb0hELE1BcEhDLEVBb0hPLE1BcEhQLEVBb0hlLE1BcEhmLEVBb0h1QixNQXBIdkIsRUFvSCtCLE1BcEgvQixFQW9IdUMsTUFwSHZDLEVBb0grQyxNQXBIL0MsRUFxSGpCLE1BckhpQixFQXFIVCxNQXJIUyxFQXFIRCxNQXJIQyxFQXFITyxNQXJIUCxFQXFIZSxNQXJIZixFQXFIdUIsTUFySHZCLEVBcUgrQixNQXJIL0IsRUFxSHVDLE1Bckh2QyxFQXFIK0MsTUFySC9DLEVBc0hqQixNQXRIaUIsRUFzSFQsTUF0SFMsRUFzSEQsTUF0SEMsRUFzSE8sTUF0SFAsRUFzSGUsTUF0SGYsRUFzSHVCLE1BdEh2QixFQXNIK0IsTUF0SC9CLEVBc0h1QyxNQXRIdkMsRUFzSCtDLE1BdEgvQyxFQXVIakIsTUF2SGlCLEVBdUhULE1BdkhTLEVBdUhELE1BdkhDLEVBdUhPLE1BdkhQLEVBdUhlLE1BdkhmLEVBdUh1QixNQXZIdkIsRUF1SCtCLE1BdkgvQixFQXVIdUMsTUF2SHZDLEVBdUgrQyxNQXZIL0MsRUF3SGpCLE1BeEhpQixFQXdIVCxNQXhIUyxFQXdIRCxNQXhIQyxFQXdITyxNQXhIUCxFQXdIZSxNQXhIZixFQXdIdUIsTUF4SHZCLEVBd0grQixNQXhIL0IsRUF3SHVDLE1BeEh2QyxFQXdIK0MsTUF4SC9DLEVBeUhqQixNQXpIaUIsRUF5SFQsTUF6SFMsRUF5SEQsTUF6SEMsRUF5SE8sTUF6SFAsRUF5SGUsTUF6SGYsRUF5SHVCLE1Bekh2QixFQXlIK0IsTUF6SC9CLEVBeUh1QyxNQXpIdkMsRUF5SCtDLE1BekgvQyxFQTBIakIsTUExSGlCLEVBMEhULE1BMUhTLEVBMEhELE1BMUhDLEVBMEhPLE1BMUhQLEVBMEhlLE1BMUhmLEVBMEh1QixNQTFIdkIsRUEwSCtCLE1BMUgvQixFQTBIdUMsTUExSHZDLEVBMEgrQyxNQTFIL0MsRUEySGpCLE1BM0hpQixFQTJIVCxNQTNIUyxFQTJIRCxNQTNIQyxFQTJITyxNQTNIUCxFQTJIZSxNQTNIZixFQTJIdUIsTUEzSHZCLEVBMkgrQixNQTNIL0IsRUEySHVDLE1BM0h2QyxFQTJIK0MsTUEzSC9DLEVBNEhqQixNQTVIaUIsRUE0SFQsTUE1SFMsRUE0SEQsTUE1SEMsRUE0SE8sTUE1SFAsRUE0SGUsTUE1SGYsRUE0SHVCLE1BNUh2QixFQTRIK0IsTUE1SC9CLEVBNEh1QyxNQTVIdkMsRUE0SCtDLE1BNUgvQyxFQTZIakIsTUE3SGlCLEVBNkhULE1BN0hTLEVBNkhELE1BN0hDLEVBNkhPLE1BN0hQLEVBNkhlLE1BN0hmLEVBNkh1QixNQTdIdkIsRUE2SCtCLE1BN0gvQixFQTZIdUMsTUE3SHZDLEVBNkgrQyxNQTdIL0MsRUE4SGpCLE1BOUhpQixFQThIVCxNQTlIUyxFQThIRCxNQTlIQyxFQThITyxNQTlIUCxFQThIZSxNQTlIZixFQThIdUIsTUE5SHZCLEVBOEgrQixNQTlIL0IsRUE4SHVDLE1BOUh2QyxFQThIK0MsTUE5SC9DLEVBK0hqQixNQS9IaUIsRUErSFQsTUEvSFMsRUErSEQsTUEvSEMsRUErSE8sTUEvSFAsRUErSGUsTUEvSGYsRUErSHVCLE1BL0h2QixFQStIK0IsTUEvSC9CLEVBK0h1QyxNQS9IdkMsRUErSCtDLE1BL0gvQyxFQWdJakIsTUFoSWlCLEVBZ0lULE1BaElTLEVBZ0lELE1BaElDLEVBZ0lPLE1BaElQLEVBZ0llLE1BaElmLEVBZ0l1QixNQWhJdkIsRUFnSStCLE1BaEkvQixFQWdJdUMsTUFoSXZDLEVBZ0krQyxNQWhJL0MsRUFpSWpCLE1BaklpQixFQWlJVCxNQWpJUyxFQWlJRCxNQWpJQyxFQWlJTyxNQWpJUCxFQWlJZSxNQWpJZixFQWlJdUIsTUFqSXZCLEVBaUkrQixNQWpJL0IsRUFpSXVDLE1Bakl2QyxFQWlJK0MsTUFqSS9DLEVBa0lqQixNQWxJaUIsRUFrSVQsTUFsSVMsRUFrSUQsTUFsSUMsRUFrSU8sTUFsSVAsRUFrSWUsTUFsSWYsRUFrSXVCLE1BbEl2QixFQWtJK0IsTUFsSS9CLEVBa0l1QyxNQWxJdkMsRUFrSStDLE1BbEkvQyxFQW1JakIsTUFuSWlCLEVBbUlULE1BbklTLEVBbUlELE1BbklDLEVBbUlPLE1BbklQLEVBbUllLE1BbklmLEVBbUl1QixNQW5JdkIsRUFtSStCLE1BbkkvQixFQW1JdUMsTUFuSXZDLEVBbUkrQyxNQW5JL0MsRUFvSWpCLE1BcElpQixFQW9JVCxNQXBJUyxFQW9JRCxNQXBJQyxFQW9JTyxNQXBJUCxFQW9JZSxNQXBJZixFQW9JdUIsTUFwSXZCLEVBb0krQixNQXBJL0IsRUFvSXVDLE1BcEl2QyxFQW9JK0MsTUFwSS9DLEVBcUlqQixNQXJJaUIsRUFxSVQsTUFySVMsRUFxSUQsTUFySUMsRUFxSU8sTUFySVAsRUFxSWUsTUFySWYsRUFxSXVCLE1Bckl2QixFQXFJK0IsTUFySS9CLEVBcUl1QyxNQXJJdkMsRUFxSStDLE1BckkvQyxFQXNJakIsTUF0SWlCLEVBc0lULE1BdElTLEVBc0lELE1BdElDLEVBc0lPLE1BdElQLEVBc0llLE1BdElmLEVBc0l1QixNQXRJdkIsRUFzSStCLE1BdEkvQixFQXNJdUMsTUF0SXZDLEVBc0krQyxNQXRJL0MsRUF1SWpCLE1BdklpQixFQXVJVCxNQXZJUyxFQXVJRCxNQXZJQyxFQXVJTyxNQXZJUCxFQXVJZSxNQXZJZixFQXVJdUIsTUF2SXZCLEVBdUkrQixNQXZJL0IsRUF1SXVDLE1Bdkl2QyxFQXVJK0MsTUF2SS9DLEVBd0lqQixNQXhJaUIsRUF3SVQsTUF4SVMsRUF3SUQsTUF4SUMsRUF3SU8sTUF4SVAsRUF3SWUsTUF4SWYsRUF3SXVCLE1BeEl2QixFQXdJK0IsTUF4SS9CLEVBd0l1QyxNQXhJdkMsRUF3SStDLE1BeEkvQyxFQXlJakIsTUF6SWlCLEVBeUlULE1BeklTLEVBeUlELE1BeklDLEVBeUlPLE1BeklQLEVBeUllLE1BeklmLEVBeUl1QixNQXpJdkIsRUF5SStCLE1BekkvQixFQXlJdUMsTUF6SXZDLEVBeUkrQyxNQXpJL0MsRUEwSWpCLE1BMUlpQixFQTBJVCxNQTFJUyxFQTBJRCxNQTFJQyxFQTBJTyxNQTFJUCxFQTBJZSxNQTFJZixFQTBJdUIsTUExSXZCLEVBMEkrQixNQTFJL0IsRUEwSXVDLE1BMUl2QyxFQTBJK0MsTUExSS9DLEVBMklqQixNQTNJaUIsRUEySVQsTUEzSVMsRUEySUQsTUEzSUMsRUEySU8sTUEzSVAsRUEySWUsT0EzSWYsRUEySXdCLE9BM0l4QixFQTJJaUMsT0EzSWpDLEVBMkkwQyxPQTNJMUMsRUE0SWpCLE9BNUlpQixFQTRJUixPQTVJUSxFQTRJQyxPQTVJRCxFQTRJVSxPQTVJVixFQTRJbUIsT0E1SW5CLEVBNEk0QixPQTVJNUIsRUE0SXFDLE9BNUlyQyxFQTRJOEMsT0E1STlDLEVBNklqQixPQTdJaUIsRUE2SVIsT0E3SVEsRUE2SUMsT0E3SUQsRUE2SVUsT0E3SVYsRUE2SW1CLE9BN0luQixFQTZJNEIsT0E3STVCLEVBNklxQyxPQTdJckMsRUE2SThDLE9BN0k5QyxFQThJakIsT0E5SWlCLEVBOElSLE9BOUlRLEVBOElDLE9BOUlELEVBOElVLE9BOUlWLEVBOEltQixPQTlJbkIsRUE4STRCLE9BOUk1QixFQThJcUMsT0E5SXJDLEVBOEk4QyxPQTlJOUMsRUErSWpCLE9BL0lpQixFQStJUixPQS9JUSxFQStJQyxPQS9JRCxFQStJVSxPQS9JVixFQStJbUIsT0EvSW5CLEVBK0k0QixPQS9JNUIsRUErSXFDLE9BL0lyQyxFQStJOEMsT0EvSTlDLEVBZ0pqQixPQWhKaUIsRUFnSlIsT0FoSlEsRUFnSkMsT0FoSkQsRUFnSlUsT0FoSlYsRUFnSm1CLE9BaEpuQixFQWdKNEIsT0FoSjVCLEVBZ0pxQyxPQWhKckMsRUFnSjhDLE9BaEo5QyxFQWlKakIsT0FqSmlCLEVBaUpSLE9BakpRLEVBaUpDLE9BakpELEVBaUpVLE9BakpWLEVBaUptQixPQWpKbkIsRUFpSjRCLE9Bako1QixFQWlKcUMsT0FqSnJDLEVBaUo4QyxPQWpKOUMsRUFrSmpCLE9BbEppQixFQWtKUixPQWxKUSxFQWtKQyxPQWxKRCxFQWtKVSxPQWxKVixFQWtKbUIsT0FsSm5CLEVBa0o0QixPQWxKNUIsRUFrSnFDLE9BbEpyQyxFQWtKOEMsT0FsSjlDLEVBbUpqQixPQW5KaUIsRUFtSlIsT0FuSlEsRUFtSkMsT0FuSkQsRUFtSlUsT0FuSlYsRUFtSm1CLE9BbkpuQixFQW1KNEIsT0FuSjVCLEVBbUpxQyxPQW5KckMsRUFtSjhDLE9Bbko5QyxFQW9KakIsT0FwSmlCLEVBb0pSLE9BcEpRLEVBb0pDLE9BcEpELEVBb0pVLE9BcEpWLEVBb0ptQixPQXBKbkIsRUFvSjRCLE9BcEo1QixFQW9KcUMsT0FwSnJDLEVBb0o4QyxPQXBKOUMsRUFxSmpCLE9BckppQixFQXFKUixPQXJKUSxFQXFKQyxPQXJKRCxFQXFKVSxPQXJKVixFQXFKbUIsT0FySm5CLEVBcUo0QixPQXJKNUIsRUFxSnFDLE9BckpyQyxFQXFKOEMsT0FySjlDLEVBc0pqQixPQXRKaUIsRUFzSlIsT0F0SlEsRUFzSkMsT0F0SkQsRUFzSlUsT0F0SlYsRUFzSm1CLE9BdEpuQixFQXNKNEIsT0F0SjVCLEVBc0pxQyxPQXRKckMsRUFzSjhDLE9BdEo5QyxFQXVKakIsT0F2SmlCLEVBdUpSLE9BdkpRLEVBdUpDLE9BdkpELEVBdUpVLE9BdkpWLEVBdUptQixPQXZKbkIsRUF1SjRCLE9Bdko1QixFQXVKcUMsT0F2SnJDLEVBdUo4QyxPQXZKOUMsRUF3SmpCLE9BeEppQixFQXdKUixPQXhKUSxFQXdKQyxPQXhKRCxFQXdKVSxPQXhKVixFQXdKbUIsT0F4Sm5CLEVBd0o0QixPQXhKNUIsRUF3SnFDLE9BeEpyQyxFQXdKOEMsT0F4SjlDLEVBeUpqQixPQXpKaUIsRUF5SlIsT0F6SlEsRUF5SkMsT0F6SkQsRUF5SlUsT0F6SlYsRUF5Sm1CLE9BekpuQixFQXlKNEIsT0F6SjVCLEVBeUpxQyxPQXpKckMsRUF5SjhDLE9Beko5QyxFQTBKakIsT0ExSmlCLEVBMEpSLE9BMUpRLEVBMEpDLE9BMUpELEVBMEpVLE9BMUpWLEVBMEptQixPQTFKbkIsRUEwSjRCLE9BMUo1QixFQTBKcUMsT0ExSnJDLEVBMEo4QyxPQTFKOUMsRUEySmpCLE9BM0ppQixFQTJKUixPQTNKUSxFQTJKQyxPQTNKRCxFQTJKVSxPQTNKVixFQTJKbUIsT0EzSm5CLEVBMko0QixPQTNKNUIsRUEySnFDLE9BM0pyQyxFQTJKOEMsT0EzSjlDLEVBNEpqQixPQTVKaUIsRUE0SlIsT0E1SlEsRUE0SkMsT0E1SkQsRUE0SlUsT0E1SlYsRUE0Sm1CLE9BNUpuQixFQTRKNEIsT0E1SjVCLEVBNEpxQyxPQTVKckMsRUE0SjhDLE9BNUo5QyxFQTZKakIsT0E3SmlCLEVBNkpSLE9BN0pRLEVBNkpDLE9BN0pELEVBNkpVLE9BN0pWLEVBNkptQixPQTdKbkIsRUE2SjRCLE9BN0o1QixFQTZKcUMsT0E3SnJDLEVBNko4QyxPQTdKOUMsRUE4SmpCLE9BOUppQixFQThKUixPQTlKUSxFQThKQyxPQTlKRCxFQThKVSxPQTlKVixFQThKbUIsT0E5Sm5CLEVBOEo0QixPQTlKNUIsRUE4SnFDLE9BOUpyQyxFQThKOEMsT0E5SjlDLEVBK0pqQixPQS9KaUIsRUErSlIsT0EvSlEsRUErSkMsT0EvSkQsRUErSlUsT0EvSlYsRUErSm1CLE9BL0puQixFQStKNEIsT0EvSjVCLEVBK0pxQyxPQS9KckMsRUErSjhDLE9BL0o5QyxFQWdLakIsT0FoS2lCLEVBZ0tSLE9BaEtRLEVBZ0tDLE9BaEtELEVBZ0tVLE9BaEtWLEVBZ0ttQixPQWhLbkIsRUFnSzRCLE9BaEs1QixFQWdLcUMsT0FoS3JDLEVBZ0s4QyxPQWhLOUMsRUFpS2pCLE9BaktpQixFQWlLUixPQWpLUSxFQWlLQyxPQWpLRCxFQWlLVSxPQWpLVixFQWlLbUIsT0FqS25CLEVBaUs0QixPQWpLNUIsRUFpS3FDLE9BaktyQyxFQWlLOEMsT0FqSzlDLEVBa0tqQixPQWxLaUIsRUFrS1IsT0FsS1EsRUFrS0MsT0FsS0QsRUFrS1UsT0FsS1YsRUFrS21CLE9BbEtuQixFQWtLNEIsT0FsSzVCLEVBa0txQyxPQWxLckMsRUFrSzhDLE9BbEs5QyxFQW1LakIsT0FuS2lCLEVBbUtSLE9BbktRLEVBbUtDLE9BbktELEVBbUtVLE9BbktWLEVBbUttQixPQW5LbkIsRUFtSzRCLE9Bbks1QixFQW1LcUMsT0FuS3JDLEVBbUs4QyxPQW5LOUMsRUFvS2pCLE9BcEtpQixFQW9LUixPQXBLUSxFQW9LQyxPQXBLRCxFQW9LVSxPQXBLVixFQW9LbUIsT0FwS25CLEVBb0s0QixPQXBLNUIsRUFvS3FDLE9BcEtyQyxFQW9LOEMsT0FwSzlDLEVBcUtqQixPQXJLaUIsRUFxS1IsT0FyS1EsRUFxS0MsT0FyS0QsRUFxS1UsT0FyS1YsRUFxS21CLE9BcktuQixFQXFLNEIsT0FySzVCLEVBcUtxQyxPQXJLckMsRUFxSzhDLE9Bcks5QyxFQXNLakIsT0F0S2lCLEVBc0tSLE9BdEtRLEVBc0tDLE9BdEtELEVBc0tVLE9BdEtWLEVBc0ttQixPQXRLbkIsRUFzSzRCLE9BdEs1QixFQXNLcUMsT0F0S3JDLEVBc0s4QyxPQXRLOUMsRUF1S2pCLE9BdktpQixFQXVLUixPQXZLUSxFQXVLQyxPQXZLRCxFQXVLVSxPQXZLVixFQXVLbUIsT0F2S25CLEVBdUs0QixPQXZLNUIsRUF1S3FDLE9BdktyQyxFQXVLOEMsT0F2SzlDLEVBd0tqQixPQXhLaUIsRUF3S1IsT0F4S1EsRUF3S0MsT0F4S0QsRUF3S1UsT0F4S1YsRUF3S21CLE9BeEtuQixFQXdLNEIsT0F4SzVCLEVBd0txQyxPQXhLckMsRUF3SzhDLE9BeEs5QyxFQXlLakIsT0F6S2lCLEVBeUtSLE9BektRLEVBeUtDLE9BektELEVBeUtVLE9BektWLEVBeUttQixPQXpLbkIsRUF5SzRCLE9Beks1QixFQXlLcUMsT0F6S3JDLEVBeUs4QyxPQXpLOUMsRUEwS2pCLE9BMUtpQixFQTBLUixPQTFLUSxFQTBLQyxPQTFLRCxFQTBLVSxPQTFLVixFQTBLbUIsT0ExS25CLEVBMEs0QixPQTFLNUIsRUEwS3FDLE9BMUtyQyxFQTBLOEMsT0ExSzlDLEVBMktqQixPQTNLaUIsRUEyS1IsT0EzS1EsRUEyS0MsT0EzS0QsRUEyS1UsT0EzS1YsRUEyS21CLE9BM0tuQixFQTJLNEIsT0EzSzVCLEVBMktxQyxPQTNLckMsRUEySzhDLE9BM0s5QyxFQTRLakIsT0E1S2lCLEVBNEtSLE9BNUtRLEVBNEtDLE9BNUtELEVBNEtVLE9BNUtWLEVBNEttQixPQTVLbkIsRUE0SzRCLE9BNUs1QixFQTRLcUMsT0E1S3JDLEVBNEs4QyxPQTVLOUMsRUE2S2pCLE9BN0tpQixFQTZLUixPQTdLUSxFQTZLQyxPQTdLRCxFQTZLVSxPQTdLVixFQTZLbUIsT0E3S25CLEVBNks0QixPQTdLNUIsRUE2S3FDLE9BN0tyQyxFQTZLOEMsT0E3SzlDLEVBOEtqQixPQTlLaUIsRUE4S1IsT0E5S1EsRUE4S0MsT0E5S0QsRUE4S1UsT0E5S1YsRUE4S21CLE9BOUtuQixFQThLNEIsT0E5SzVCLEVBOEtxQyxPQTlLckMsRUE4SzhDLE9BOUs5QyxFQStLakIsT0EvS2lCLEVBK0tSLE9BL0tRLEVBK0tDLE9BL0tELEVBK0tVLE9BL0tWLEVBK0ttQixPQS9LbkIsRUErSzRCLE9BL0s1QixFQStLcUMsT0EvS3JDLEVBK0s4QyxPQS9LOUMsRUFnTGpCLE9BaExpQixFQWdMUixPQWhMUSxFQWdMQyxPQWhMRCxFQWdMVSxPQWhMVixFQWdMbUIsT0FoTG5CLEVBZ0w0QixPQWhMNUIsRUFnTHFDLE9BaExyQyxFQWdMOEMsT0FoTDlDLEVBaUxqQixPQWpMaUIsRUFpTFIsT0FqTFEsRUFpTEMsT0FqTEQsRUFpTFUsT0FqTFYsRUFpTG1CLE9BakxuQixFQWlMNEIsT0FqTDVCLEVBaUxxQyxPQWpMckMsRUFpTDhDLE9Bakw5QyxFQWtMakIsT0FsTGlCLEVBa0xSLE9BbExRLEVBa0xDLE9BbExELEVBa0xVLE9BbExWLEVBa0xtQixPQWxMbkIsRUFrTDRCLE9BbEw1QixFQWtMcUMsT0FsTHJDLEVBa0w4QyxPQWxMOUMsRUFtTGpCLE9BbkxpQixFQW1MUixPQW5MUSxFQW1MQyxPQW5MRCxFQW1MVSxPQW5MVixFQW1MbUIsT0FuTG5CLEVBbUw0QixPQW5MNUIsRUFtTHFDLE9BbkxyQyxFQW1MOEMsT0FuTDlDLEVBb0xqQixPQXBMaUIsRUFvTFIsT0FwTFEsRUFvTEMsT0FwTEQsRUFvTFUsT0FwTFYsRUFvTG1CLE9BcExuQixFQW9MNEIsT0FwTDVCLEVBb0xxQyxPQXBMckMsRUFvTDhDLE9BcEw5QyxFQXFMakIsT0FyTGlCLEVBcUxSLE9BckxRLEVBcUxDLE9BckxELEVBcUxVLE9BckxWLEVBcUxtQixPQXJMbkIsRUFxTDRCLE9Bckw1QixFQXFMcUMsT0FyTHJDLEVBcUw4QyxPQXJMOUMsRUFzTGpCLE9BdExpQixFQXNMUixPQXRMUSxFQXNMQyxPQXRMRCxFQXNMVSxPQXRMVixFQXNMbUIsT0F0TG5CLEVBc0w0QixPQXRMNUIsRUFzTHFDLE9BdExyQyxFQXNMOEMsT0F0TDlDLEVBdUxqQixPQXZMaUIsRUF1TFIsT0F2TFEsRUF1TEMsT0F2TEQsRUF1TFUsT0F2TFYsRUF1TG1CLE9BdkxuQixFQXVMNEIsT0F2TDVCLEVBdUxxQyxPQXZMckMsRUF1TDhDLE9Bdkw5QyxFQXdMakIsT0F4TGlCLEVBd0xSLE9BeExRLEVBd0xDLE9BeExELEVBd0xVLE9BeExWLEVBd0xtQixPQXhMbkIsRUF3TDRCLE9BeEw1QixFQXdMcUMsT0F4THJDLEVBd0w4QyxPQXhMOUMsRUF5TGpCLE9BekxpQixFQXlMUixPQXpMUSxFQXlMQyxPQXpMRCxFQXlMVSxPQXpMVixFQXlMbUIsT0F6TG5CLEVBeUw0QixPQXpMNUIsRUF5THFDLE9BekxyQyxFQXlMOEMsT0F6TDlDLEVBMExqQixPQTFMaUIsRUEwTFIsT0ExTFEsRUEwTEMsT0ExTEQsRUEwTFUsT0ExTFYsRUEwTG1CLE9BMUxuQixFQTBMNEIsT0ExTDVCLEVBMExxQyxPQTFMckMsRUEwTDhDLE9BMUw5QyxFQTJMakIsT0EzTGlCLEVBMkxSLE9BM0xRLEVBMkxDLE9BM0xELEVBMkxVLE9BM0xWLEVBMkxtQixPQTNMbkIsRUEyTDRCLE9BM0w1QixFQTJMcUMsT0EzTHJDLEVBMkw4QyxPQTNMOUMsRUE0TGpCLE9BNUxpQixFQTRMUixPQTVMUSxFQTRMQyxPQTVMRCxFQTRMVSxPQTVMVixFQTRMbUIsT0E1TG5CLEVBNEw0QixPQTVMNUIsRUE0THFDLE9BNUxyQyxFQTRMOEMsT0E1TDlDLEVBNkxqQixPQTdMaUIsRUE2TFIsT0E3TFEsRUE2TEMsT0E3TEQsRUE2TFUsT0E3TFYsRUE2TG1CLE9BN0xuQixFQTZMNEIsT0E3TDVCLEVBNkxxQyxPQTdMckMsRUE2TDhDLE9BN0w5QyxFQThMakIsT0E5TGlCLEVBOExSLE9BOUxRLEVBOExDLE9BOUxELEVBOExVLE9BOUxWLEVBOExtQixPQTlMbkIsRUE4TDRCLE9BOUw1QixFQThMcUMsT0E5THJDLEVBOEw4QyxPQTlMOUMsRUErTGpCLE9BL0xpQixFQStMUixPQS9MUSxFQStMQyxPQS9MRCxFQStMVSxPQS9MVixFQStMbUIsT0EvTG5CLEVBK0w0QixPQS9MNUIsRUErTHFDLE9BL0xyQyxFQStMOEMsT0EvTDlDLEVBZ01qQixPQWhNaUIsRUFnTVIsT0FoTVEsRUFnTUMsT0FoTUQsRUFnTVUsT0FoTVYsRUFnTW1CLE9BaE1uQixFQWdNNEIsT0FoTTVCLEVBZ01xQyxPQWhNckMsRUFnTThDLE9BaE05QyxFQWlNakIsT0FqTWlCLEVBaU1SLE9Bak1RLEVBaU1DLE9Bak1ELEVBaU1VLE9Bak1WLEVBaU1tQixPQWpNbkIsRUFpTTRCLE9Bak01QixFQWlNcUMsT0FqTXJDLEVBaU04QyxPQWpNOUMsRUFrTWpCLE9BbE1pQixFQWtNUixPQWxNUSxFQWtNQyxPQWxNRCxFQWtNVSxPQWxNVixFQWtNbUIsT0FsTW5CLEVBa000QixPQWxNNUIsRUFrTXFDLE9BbE1yQyxFQWtNOEMsT0FsTTlDLEVBbU1qQixPQW5NaUIsRUFtTVIsT0FuTVEsRUFtTUMsT0FuTUQsRUFtTVUsT0FuTVYsRUFtTW1CLE9Bbk1uQixFQW1NNEIsT0FuTTVCLEVBbU1xQyxPQW5NckMsRUFtTThDLE9Bbk05QyxFQW9NakIsT0FwTWlCLEVBb01SLE9BcE1RLEVBb01DLE9BcE1ELEVBb01VLE9BcE1WLEVBb01tQixPQXBNbkIsRUFvTTRCLE9BcE01QixFQW9NcUMsT0FwTXJDLEVBb004QyxPQXBNOUMsRUFxTWpCLE9Bck1pQixFQXFNUixPQXJNUSxFQXFNQyxPQXJNRCxFQXFNVSxPQXJNVixFQXFNbUIsT0FyTW5CLEVBcU00QixPQXJNNUIsRUFxTXFDLE9Bck1yQyxFQXFNOEMsT0FyTTlDLEVBc01qQixPQXRNaUIsRUFzTVIsT0F0TVEsRUFzTUMsT0F0TUQsRUFzTVUsT0F0TVYsRUFzTW1CLE9BdE1uQixFQXNNNEIsT0F0TTVCLEVBc01xQyxPQXRNckMsRUFzTThDLE9BdE05QyxFQXVNakIsT0F2TWlCLEVBdU1SLE9Bdk1RLEVBdU1DLE9Bdk1ELEVBdU1VLE9Bdk1WLEVBdU1tQixPQXZNbkIsRUF1TTRCLE9Bdk01QixFQXVNcUMsT0F2TXJDLEVBdU04QyxPQXZNOUMsRUF3TWpCLE9BeE1pQixFQXdNUixPQXhNUSxFQXdNQyxPQXhNRCxFQXdNVSxPQXhNVixFQXdNbUIsT0F4TW5CLEVBd000QixPQXhNNUIsRUF3TXFDLE9BeE1yQyxFQXdNOEMsT0F4TTlDLEVBeU1qQixPQXpNaUIsRUF5TVIsT0F6TVEsRUF5TUMsT0F6TUQsRUF5TVUsT0F6TVYsRUF5TW1CLE9Bek1uQixFQXlNNEIsT0F6TTVCLEVBeU1xQyxPQXpNckMsRUF5TThDLE9Bek05QyxFQTBNakIsT0ExTWlCLEVBME1SLE9BMU1RLEVBME1DLE9BMU1ELEVBME1VLE9BMU1WLEVBME1tQixPQTFNbkIsRUEwTTRCLE9BMU01QixFQTBNcUMsT0ExTXJDLEVBME04QyxPQTFNOUMsRUEyTWpCLE9BM01pQixFQTJNUixPQTNNUSxFQTJNQyxPQTNNRCxFQTJNVSxPQTNNVixFQTJNbUIsT0EzTW5CLEVBMk00QixPQTNNNUIsRUEyTXFDLE9BM01yQyxFQTJNOEMsT0EzTTlDLEVBNE1qQixPQTVNaUIsRUE0TVIsT0E1TVEsRUE0TUMsT0E1TUQsRUE0TVUsT0E1TVYsRUE0TW1CLE9BNU1uQixFQTRNNEIsT0E1TTVCLEVBNE1xQyxPQTVNckMsRUE0TThDLE9BNU05QyxFQTZNakIsT0E3TWlCLEVBNk1SLE9BN01RLEVBNk1DLE9BN01ELEVBNk1VLE9BN01WLEVBNk1tQixPQTdNbkIsRUE2TTRCLE9BN001QixFQTZNcUMsT0E3TXJDLEVBNk04QyxPQTdNOUMsRUE4TWpCLE9BOU1pQixFQThNUixPQTlNUSxFQThNQyxPQTlNRCxFQThNVSxPQTlNVixFQThNbUIsT0E5TW5CLEVBOE00QixPQTlNNUIsRUE4TXFDLE9BOU1yQyxFQThNOEMsT0E5TTlDLEVBK01qQixPQS9NaUIsRUErTVIsT0EvTVEsRUErTUMsT0EvTUQsRUErTVUsT0EvTVYsRUErTW1CLE9BL01uQixFQStNNEIsT0EvTTVCLEVBK01xQyxPQS9NckMsRUErTThDLE9BL005QyxFQWdOakIsT0FoTmlCLEVBZ05SLE9BaE5RLEVBZ05DLE9BaE5ELEVBZ05VLE9BaE5WLEVBZ05tQixPQWhObkIsRUFnTjRCLE9BaE41QixFQWdOcUMsT0FoTnJDLEVBZ044QyxPQWhOOUMsRUFpTmpCLE9Bak5pQixFQWlOUixPQWpOUSxFQWlOQyxPQWpORCxFQWlOVSxPQWpOVixFQWlObUIsT0FqTm5CLEVBaU40QixPQWpONUIsRUFpTnFDLE9Bak5yQyxFQWlOOEMsT0FqTjlDLEVBa05qQixPQWxOaUIsRUFrTlIsT0FsTlEsRUFrTkMsT0FsTkQsRUFrTlUsT0FsTlYsRUFrTm1CLE9BbE5uQixFQWtONEIsT0FsTjVCLEVBa05xQyxPQWxOckMsRUFrTjhDLE9BbE45QyxFQW1OakIsT0FuTmlCLEVBbU5SLE9Bbk5RLEVBbU5DLE9Bbk5ELEVBbU5VLE9Bbk5WLEVBbU5tQixPQW5ObkIsRUFtTjRCLE9Bbk41QixFQW1OcUMsT0FuTnJDLEVBbU44QyxPQW5OOUMsRUFvTmpCLE9BcE5pQixFQW9OUixPQXBOUSxFQW9OQyxPQXBORCxFQW9OVSxPQXBOVixFQW9ObUIsT0FwTm5CLEVBb040QixPQXBONUIsRUFvTnFDLE9BcE5yQyxFQW9OOEMsT0FwTjlDLEVBcU5qQixPQXJOaUIsRUFxTlIsT0FyTlEsRUFxTkMsT0FyTkQsRUFxTlUsT0FyTlYsRUFxTm1CLE9Bck5uQixFQXFONEIsT0FyTjVCLEVBcU5xQyxPQXJOckMsRUFxTjhDLE9Bck45QyxFQXNOakIsT0F0TmlCLEVBc05SLE9BdE5RLEVBc05DLE9BdE5ELEVBc05VLE9BdE5WLEVBc05tQixPQXRObkIsRUFzTjRCLE9BdE41QixFQXNOcUMsT0F0TnJDLEVBc044QyxPQXROOUMsRUF1TmpCLE9Bdk5pQixFQXVOUixPQXZOUSxFQXVOQyxPQXZORCxFQXVOVSxPQXZOVixFQXVObUIsUUF2Tm5CLENBQXJCOztBQXlOQSxTQUFTQyxhQUFULENBQXVCQyxNQUF2QixFQUErQjtBQUMzQixRQUFJQyxZQUFZLEVBQWhCO0FBQUEsUUFDSUMsT0FBTyxFQURYO0FBQUEsUUFFSUMsUUFGSjs7QUFJQSxRQUFJLENBQUNILE1BQUQsSUFBVyxDQUFDQSxPQUFPSSxVQUF2QixFQUFtQztBQUMvQixlQUFPLEtBQVA7QUFDSDs7QUFFRCxhQUFTQyxTQUFULENBQW1CSixTQUFuQixFQUE4QlQsSUFBOUIsRUFBb0M7QUFDaEMsYUFBSyxJQUFJaEUsSUFBSWdFLEtBQUtZLFVBQUwsQ0FBZ0J2SCxNQUFoQixHQUF5QixDQUF0QyxFQUF5QzJDLEtBQUssQ0FBOUMsRUFBaURBLEdBQWpELEVBQXNEO0FBQ2xEeUUsc0JBQVVMLElBQVYsQ0FBZUosS0FBS1ksVUFBTCxDQUFnQjVFLENBQWhCLENBQWY7QUFDSDtBQUNKOztBQUVELGFBQVM4RSxZQUFULENBQXNCTCxTQUF0QixFQUFpQztBQUM3QixZQUFJLENBQUNBLFNBQUQsSUFBYyxDQUFDQSxVQUFVcEgsTUFBN0IsRUFBcUM7QUFDakMsbUJBQU8sSUFBUDtBQUNIOztBQUVELFlBQUkyRyxPQUFPUyxVQUFVWCxHQUFWLEVBQVg7QUFBQSxZQUNJWSxPQUFPVixLQUFLZSxXQUFMLElBQW9CZixLQUFLZ0IsU0FEcEM7QUFFQSxZQUFJTixJQUFKLEVBQVU7QUFDTjtBQUNBO0FBQ0EsZ0JBQUlyRyxJQUFJcUcsS0FBS2xHLEtBQUwsQ0FBVyxZQUFYLENBQVI7QUFDQSxnQkFBSUgsQ0FBSixFQUFPO0FBQ0hvRywwQkFBVXBILE1BQVYsR0FBbUIsQ0FBbkI7QUFDQSx1QkFBT2dCLEVBQUUsQ0FBRixDQUFQO0FBQ0g7QUFDRCxtQkFBT3FHLElBQVA7QUFDSDtBQUNELFlBQUlWLEtBQUtSLE9BQUwsS0FBaUIsTUFBckIsRUFBNkI7QUFDekIsbUJBQU9zQixhQUFhTCxTQUFiLENBQVA7QUFDSDtBQUNELFlBQUlULEtBQUtZLFVBQVQsRUFBcUI7QUFDakJDLHNCQUFVSixTQUFWLEVBQXFCVCxJQUFyQjtBQUNBLG1CQUFPYyxhQUFhTCxTQUFiLENBQVA7QUFDSDtBQUNKOztBQUVESSxjQUFVSixTQUFWLEVBQXFCRCxNQUFyQjtBQUNBLFdBQVFFLE9BQU9JLGFBQWFMLFNBQWIsQ0FBZixFQUF5QztBQUNyQyxhQUFLLElBQUl6RSxJQUFJLENBQWIsRUFBZ0JBLElBQUkwRSxLQUFLckgsTUFBekIsRUFBaUMyQyxHQUFqQyxFQUFzQztBQUNsQzJFLHVCQUFXRCxLQUFLTyxVQUFMLENBQWdCakYsQ0FBaEIsQ0FBWDtBQUNBLGlCQUFLLElBQUlrRixJQUFJLENBQWIsRUFBZ0JBLElBQUlaLGVBQWVqSCxNQUFuQyxFQUEyQzZILEdBQTNDLEVBQWdEO0FBQzVDLG9CQUFJWixlQUFlWSxDQUFmLE1BQXNCUCxRQUExQixFQUFvQztBQUNoQywyQkFBTyxLQUFQO0FBQ0g7QUFDSjtBQUNKO0FBQ0o7QUFDRCxXQUFPLEtBQVA7QUFDSDs7QUFFRCxTQUFTUSxjQUFULENBQXdCaEYsR0FBeEIsRUFBNkI7QUFDekIsUUFBSSxPQUFPQSxJQUFJWSxJQUFYLEtBQW9CLFFBQXBCLEtBQ0NaLElBQUljLFdBQUosSUFBb0JkLElBQUlZLElBQUosSUFBWSxDQUFaLElBQWlCWixJQUFJWSxJQUFKLElBQVksR0FEbEQsQ0FBSixFQUM2RDtBQUN6RCxlQUFPWixJQUFJWSxJQUFYO0FBQ0g7QUFDRCxRQUFJLENBQUNaLElBQUlpRixLQUFMLElBQWMsQ0FBQ2pGLElBQUlpRixLQUFKLENBQVVDLGFBQXpCLElBQ0EsQ0FBQ2xGLElBQUlpRixLQUFKLENBQVVDLGFBQVYsQ0FBd0JDLFlBRDdCLEVBQzJDO0FBQ3ZDLGVBQU8sQ0FBQyxDQUFSO0FBQ0g7QUFDRCxRQUFJRixRQUFRakYsSUFBSWlGLEtBQWhCO0FBQUEsUUFDSUcsWUFBWUgsTUFBTUMsYUFEdEI7QUFBQSxRQUVJRyxRQUFRLENBRlo7QUFHQSxTQUFLLElBQUl4RixJQUFJLENBQWIsRUFBZ0JBLElBQUl1RixVQUFVbEksTUFBZCxJQUF3QmtJLFVBQVV2RixDQUFWLE1BQWlCb0YsS0FBekQsRUFBZ0VwRixHQUFoRSxFQUFxRTtBQUNqRSxZQUFJdUYsVUFBVXZGLENBQVYsRUFBYXlGLElBQWIsS0FBc0IsU0FBMUIsRUFBcUM7QUFDakNEO0FBQ0g7QUFDSjtBQUNELFdBQU8sRUFBRUEsS0FBRixHQUFVLENBQUMsQ0FBbEI7QUFDSDs7QUFFRCxTQUFTRSxRQUFULEdBQW9CLENBQ25COztBQUVEO0FBQ0E7QUFDQUEsU0FBU25JLFNBQVQsQ0FBbUJvSSxXQUFuQixHQUFpQyxVQUFTQyxNQUFULEVBQWlCQyxHQUFqQixFQUFzQjtBQUNuREEsVUFBTUEsT0FBTyxLQUFLQSxHQUFsQjtBQUNBLFNBQUssSUFBSUMsSUFBVCxJQUFpQkYsTUFBakIsRUFBeUI7QUFDckIsWUFBSUEsT0FBT0csY0FBUCxDQUFzQkQsSUFBdEIsQ0FBSixFQUFpQztBQUM3QkQsZ0JBQUlHLEtBQUosQ0FBVUYsSUFBVixJQUFrQkYsT0FBT0UsSUFBUCxDQUFsQjtBQUNIO0FBQ0o7QUFDSixDQVBEOztBQVNBSixTQUFTbkksU0FBVCxDQUFtQjBJLFdBQW5CLEdBQWlDLFVBQVNDLEdBQVQsRUFBY0MsSUFBZCxFQUFvQjtBQUNqRCxXQUFPRCxRQUFRLENBQVIsR0FBWSxDQUFaLEdBQWdCQSxNQUFNQyxJQUE3QjtBQUNILENBRkQ7O0FBSUE7QUFDQTtBQUNBLFNBQVNDLFdBQVQsQ0FBcUIxRCxNQUFyQixFQUE2QnZDLEdBQTdCLEVBQWtDa0csWUFBbEMsRUFBZ0Q7QUFDNUMsUUFBSUMsUUFBUyxPQUFPQyxTQUFQLEtBQXFCLFdBQXRCLElBQ1AsWUFBRCxDQUFlaEgsSUFBZixDQUFvQmdILFVBQVVDLFNBQTlCLENBREo7QUFFQSxRQUFJdkwsUUFBUSx3QkFBWjtBQUNBLFFBQUlvQixrQkFBa0Isb0JBQXRCO0FBQ0EsUUFBSW9LLGFBQWEsRUFBakI7O0FBRUEsUUFBRyxPQUFPdEssU0FBUCxLQUFxQixXQUF4QixFQUFxQztBQUNqQ2xCLGdCQUFRa0IsVUFBVUMsT0FBbEI7QUFDQUMsMEJBQWtCRixVQUFVSSxhQUE1QjtBQUNBa0sscUJBQWF0SyxVQUFVUSxPQUF2QjtBQUNIOztBQUVELFFBQUkySixLQUFKLEVBQVc7QUFDUHJMLGdCQUFRLG9CQUFSO0FBQ0FvQiwwQkFBa0IsY0FBbEI7QUFDSDs7QUFFRHFKLGFBQVNnQixJQUFULENBQWMsSUFBZDtBQUNBLFNBQUt2RyxHQUFMLEdBQVdBLEdBQVg7O0FBRUE7QUFDQTtBQUNBLFNBQUtxRSxNQUFMLEdBQWMvQixhQUFhQyxNQUFiLEVBQXFCdkMsSUFBSXVFLElBQXpCLENBQWQ7QUFDQSxRQUFJa0IsU0FBUztBQUNUM0ssZUFBT0EsS0FERTtBQUVUb0IseUJBQWlCQSxlQUZSO0FBR1RvSyxvQkFBWUEsVUFISDtBQUlUdEYsa0JBQVUsVUFKRDtBQUtURyxjQUFNLENBTEc7QUFNVEcsZUFBTyxDQU5FO0FBT1RrRixhQUFLLENBUEk7QUFRVEMsZ0JBQVEsQ0FSQztBQVNUQyxpQkFBUztBQVRBLEtBQWI7O0FBWUEsUUFBSSxDQUFDUCxLQUFMLEVBQVk7QUFDUlYsZUFBT2tCLFdBQVAsR0FBcUIzRyxJQUFJVyxRQUFKLEtBQWlCLEVBQWpCLEdBQXNCLGVBQXRCLEdBQ2ZYLElBQUlXLFFBQUosS0FBaUIsSUFBakIsR0FBd0IsYUFBeEIsR0FDQSxhQUZOO0FBR0E4RSxlQUFPbUIsV0FBUCxHQUFxQixXQUFyQjtBQUNIO0FBQ0QsU0FBS3BCLFdBQUwsQ0FBaUJDLE1BQWpCLEVBQXlCLEtBQUtwQixNQUE5Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFLcUIsR0FBTCxHQUFXbkQsT0FBT2UsUUFBUCxDQUFnQkosYUFBaEIsQ0FBOEIsS0FBOUIsQ0FBWDtBQUNBdUMsYUFBUztBQUNMb0IsbUJBQVc3RyxJQUFJdUIsS0FBSixLQUFjLFFBQWQsR0FBeUIsUUFBekIsR0FBb0N2QixJQUFJdUIsS0FEOUM7QUFFTHVGLGNBQU1aLGFBQWFZLElBRmQ7QUFHTEMsb0JBQVksVUFIUDtBQUlML0Ysa0JBQVU7QUFKTCxLQUFUOztBQU9BLFFBQUksQ0FBQ21GLEtBQUwsRUFBWTtBQUNSVixlQUFPdUIsU0FBUCxHQUFtQjVDLGNBQWMsS0FBS0MsTUFBbkIsQ0FBbkI7QUFDQW9CLGVBQU9rQixXQUFQLEdBQXFCM0csSUFBSVcsUUFBSixLQUFpQixFQUFqQixHQUFzQixlQUF0QixHQUNmWCxJQUFJVyxRQUFKLEtBQWlCLElBQWpCLEdBQXdCLGFBQXhCLEdBQ0EsY0FDRnNHLGlCQURFLEdBQ21CLFdBSHpCO0FBSUg7O0FBRUQsU0FBS3pCLFdBQUwsQ0FBaUJDLE1BQWpCOztBQUVBLFNBQUtDLEdBQUwsQ0FBUzNCLFdBQVQsQ0FBcUIsS0FBS00sTUFBMUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBSTZDLFVBQVUsQ0FBZDtBQUNBLFlBQVFsSCxJQUFJaUIsYUFBWjtBQUNJLGFBQUssT0FBTDtBQUNJaUcsc0JBQVVsSCxJQUFJZ0IsUUFBZDtBQUNBO0FBQ0osYUFBSyxRQUFMO0FBQ0lrRyxzQkFBVWxILElBQUlnQixRQUFKLEdBQWdCaEIsSUFBSWUsSUFBSixHQUFXLENBQXJDO0FBQ0E7QUFDSixhQUFLLEtBQUw7QUFDSW1HLHNCQUFVbEgsSUFBSWdCLFFBQUosR0FBZWhCLElBQUllLElBQTdCO0FBQ0E7QUFUUjs7QUFZQTtBQUNBO0FBQ0E7QUFDQSxRQUFJZixJQUFJVyxRQUFKLEtBQWlCLEVBQXJCLEVBQXlCO0FBQ3JCLGFBQUs2RSxXQUFMLENBQWlCO0FBQ2JyRSxrQkFBTyxLQUFLMkUsV0FBTCxDQUFpQm9CLE9BQWpCLEVBQTBCLEdBQTFCLENBRE07QUFFYkMsbUJBQU8sS0FBS3JCLFdBQUwsQ0FBaUI5RixJQUFJZSxJQUFyQixFQUEyQixHQUEzQjtBQUZNLFNBQWpCO0FBSUE7QUFDQTtBQUNBO0FBQ0gsS0FSRCxNQVFPO0FBQ0gsYUFBS3lFLFdBQUwsQ0FBaUI7QUFDYmdCLGlCQUFLLEtBQUtWLFdBQUwsQ0FBaUJvQixPQUFqQixFQUEwQixHQUExQixDQURRO0FBRWJFLG9CQUFRLEtBQUt0QixXQUFMLENBQWlCOUYsSUFBSWUsSUFBckIsRUFBMkIsR0FBM0I7QUFGSyxTQUFqQjtBQUlIOztBQUVELFNBQUtzRyxJQUFMLEdBQVksVUFBU0MsR0FBVCxFQUFjO0FBQ3RCLGFBQUs5QixXQUFMLENBQWlCO0FBQ2JnQixpQkFBSyxLQUFLVixXQUFMLENBQWlCd0IsSUFBSWQsR0FBckIsRUFBMEIsSUFBMUIsQ0FEUTtBQUViQyxvQkFBUSxLQUFLWCxXQUFMLENBQWlCd0IsSUFBSWIsTUFBckIsRUFBNkIsSUFBN0IsQ0FGSztBQUdidEYsa0JBQU0sS0FBSzJFLFdBQUwsQ0FBaUJ3QixJQUFJbkcsSUFBckIsRUFBMkIsSUFBM0IsQ0FITztBQUliRyxtQkFBTyxLQUFLd0UsV0FBTCxDQUFpQndCLElBQUloRyxLQUFyQixFQUE0QixJQUE1QixDQUpNO0FBS2I4RixvQkFBUSxLQUFLdEIsV0FBTCxDQUFpQndCLElBQUlGLE1BQXJCLEVBQTZCLElBQTdCLENBTEs7QUFNYkQsbUJBQU8sS0FBS3JCLFdBQUwsQ0FBaUJ3QixJQUFJSCxLQUFyQixFQUE0QixJQUE1QjtBQU5NLFNBQWpCO0FBUUgsS0FURDtBQVVIO0FBQ0RsQixZQUFZN0ksU0FBWixHQUF3QlIsV0FBVzJJLFNBQVNuSSxTQUFwQixDQUF4QjtBQUNBNkksWUFBWTdJLFNBQVosQ0FBc0JNLFdBQXRCLEdBQW9DdUksV0FBcEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBU3NCLFdBQVQsQ0FBcUJDLEdBQXJCLEVBQTBCO0FBQ3RCLFFBQUlyQixRQUFTLE9BQU9DLFNBQVAsS0FBcUIsV0FBdEIsSUFDUCxZQUFELENBQWVoSCxJQUFmLENBQW9CZ0gsVUFBVUMsU0FBOUIsQ0FESjs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQUlvQixFQUFKLEVBQVFMLE1BQVIsRUFBZ0JELEtBQWhCLEVBQXVCWCxHQUF2QjtBQUNBLFFBQUlnQixJQUFJOUIsR0FBUixFQUFhO0FBQ1QwQixpQkFBU0ksSUFBSTlCLEdBQUosQ0FBUWdDLFlBQWpCO0FBQ0FQLGdCQUFRSyxJQUFJOUIsR0FBSixDQUFRaUMsV0FBaEI7QUFDQW5CLGNBQU1nQixJQUFJOUIsR0FBSixDQUFRa0MsU0FBZDs7QUFFQSxZQUFJQyxRQUFRLENBQUNBLFFBQVFMLElBQUk5QixHQUFKLENBQVFqQixVQUFqQixNQUFpQ29ELFFBQVFBLE1BQU0sQ0FBTixDQUF6QyxLQUNSQSxNQUFNQyxjQURFLElBQ2dCRCxNQUFNQyxjQUFOLEVBRDVCO0FBRUFOLGNBQU1BLElBQUk5QixHQUFKLENBQVFxQyxxQkFBUixFQUFOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQU4sYUFBS0ksUUFBUUcsS0FBS0MsR0FBTCxDQUFVSixNQUFNLENBQU4sS0FBWUEsTUFBTSxDQUFOLEVBQVNULE1BQXRCLElBQWlDLENBQTFDLEVBQTZDSSxJQUFJSixNQUFKLEdBQWFTLE1BQU0zSyxNQUFoRSxDQUFSLEdBQ0MsQ0FETjtBQUdIO0FBQ0QsU0FBS2lFLElBQUwsR0FBWXFHLElBQUlyRyxJQUFoQjtBQUNBLFNBQUtHLEtBQUwsR0FBYWtHLElBQUlsRyxLQUFqQjtBQUNBLFNBQUtrRixHQUFMLEdBQVdnQixJQUFJaEIsR0FBSixJQUFXQSxHQUF0QjtBQUNBLFNBQUtZLE1BQUwsR0FBY0ksSUFBSUosTUFBSixJQUFjQSxNQUE1QjtBQUNBLFNBQUtYLE1BQUwsR0FBY2UsSUFBSWYsTUFBSixJQUFlRCxPQUFPZ0IsSUFBSUosTUFBSixJQUFjQSxNQUFyQixDQUE3QjtBQUNBLFNBQUtELEtBQUwsR0FBYUssSUFBSUwsS0FBSixJQUFhQSxLQUExQjtBQUNBLFNBQUtlLFVBQUwsR0FBa0JULE9BQU96TSxTQUFQLEdBQW1CeU0sRUFBbkIsR0FBd0JELElBQUlVLFVBQTlDOztBQUVBLFFBQUkvQixTQUFTLENBQUMsS0FBSytCLFVBQW5CLEVBQStCO0FBQzNCLGFBQUtBLFVBQUwsR0FBa0IsRUFBbEI7QUFDSDtBQUNKOztBQUVEO0FBQ0E7QUFDQTtBQUNBWCxZQUFZbkssU0FBWixDQUFzQmlLLElBQXRCLEdBQTZCLFVBQVNjLElBQVQsRUFBZUMsTUFBZixFQUF1QjtBQUNoREEsYUFBU0EsV0FBV3BOLFNBQVgsR0FBdUJvTixNQUF2QixHQUFnQyxLQUFLRixVQUE5QztBQUNBLFlBQVFDLElBQVI7QUFDSSxhQUFLLElBQUw7QUFDSSxpQkFBS2hILElBQUwsSUFBYWlILE1BQWI7QUFDQSxpQkFBSzlHLEtBQUwsSUFBYzhHLE1BQWQ7QUFDQTtBQUNKLGFBQUssSUFBTDtBQUNJLGlCQUFLakgsSUFBTCxJQUFhaUgsTUFBYjtBQUNBLGlCQUFLOUcsS0FBTCxJQUFjOEcsTUFBZDtBQUNBO0FBQ0osYUFBSyxJQUFMO0FBQ0ksaUJBQUs1QixHQUFMLElBQVk0QixNQUFaO0FBQ0EsaUJBQUszQixNQUFMLElBQWUyQixNQUFmO0FBQ0E7QUFDSixhQUFLLElBQUw7QUFDSSxpQkFBSzVCLEdBQUwsSUFBWTRCLE1BQVo7QUFDQSxpQkFBSzNCLE1BQUwsSUFBZTJCLE1BQWY7QUFDQTtBQWhCUjtBQWtCSCxDQXBCRDs7QUFzQkE7QUFDQWIsWUFBWW5LLFNBQVosQ0FBc0JpTCxRQUF0QixHQUFpQyxVQUFTQyxFQUFULEVBQWE7QUFDMUMsV0FBTyxLQUFLbkgsSUFBTCxHQUFZbUgsR0FBR2hILEtBQWYsSUFDSCxLQUFLQSxLQUFMLEdBQWFnSCxHQUFHbkgsSUFEYixJQUVILEtBQUtxRixHQUFMLEdBQVc4QixHQUFHN0IsTUFGWCxJQUdILEtBQUtBLE1BQUwsR0FBYzZCLEdBQUc5QixHQUhyQjtBQUlILENBTEQ7O0FBT0E7QUFDQWUsWUFBWW5LLFNBQVosQ0FBc0JtTCxXQUF0QixHQUFvQyxVQUFTQyxLQUFULEVBQWdCO0FBQ2hELFNBQUssSUFBSTNJLElBQUksQ0FBYixFQUFnQkEsSUFBSTJJLE1BQU10TCxNQUExQixFQUFrQzJDLEdBQWxDLEVBQXVDO0FBQ25DLFlBQUksS0FBS3dJLFFBQUwsQ0FBY0csTUFBTTNJLENBQU4sQ0FBZCxDQUFKLEVBQTZCO0FBQ3pCLG1CQUFPLElBQVA7QUFDSDtBQUNKO0FBQ0QsV0FBTyxLQUFQO0FBQ0gsQ0FQRDs7QUFTQTtBQUNBMEgsWUFBWW5LLFNBQVosQ0FBc0JxTCxNQUF0QixHQUErQixVQUFTQyxTQUFULEVBQW9CO0FBQy9DLFdBQU8sS0FBS2xDLEdBQUwsSUFBWWtDLFVBQVVsQyxHQUF0QixJQUNILEtBQUtDLE1BQUwsSUFBZWlDLFVBQVVqQyxNQUR0QixJQUVILEtBQUt0RixJQUFMLElBQWF1SCxVQUFVdkgsSUFGcEIsSUFHSCxLQUFLRyxLQUFMLElBQWNvSCxVQUFVcEgsS0FINUI7QUFJSCxDQUxEOztBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0FpRyxZQUFZbkssU0FBWixDQUFzQnVMLG9CQUF0QixHQUE2QyxVQUFTRCxTQUFULEVBQW9CUCxJQUFwQixFQUEwQjtBQUNuRSxZQUFRQSxJQUFSO0FBQ0ksYUFBSyxJQUFMO0FBQ0ksbUJBQU8sS0FBS2hILElBQUwsR0FBWXVILFVBQVV2SCxJQUE3QjtBQUNKLGFBQUssSUFBTDtBQUNJLG1CQUFPLEtBQUtHLEtBQUwsR0FBYW9ILFVBQVVwSCxLQUE5QjtBQUNKLGFBQUssSUFBTDtBQUNJLG1CQUFPLEtBQUtrRixHQUFMLEdBQVdrQyxVQUFVbEMsR0FBNUI7QUFDSixhQUFLLElBQUw7QUFDSSxtQkFBTyxLQUFLQyxNQUFMLEdBQWNpQyxVQUFVakMsTUFBL0I7QUFSUjtBQVVILENBWEQ7O0FBYUE7QUFDQTtBQUNBYyxZQUFZbkssU0FBWixDQUFzQndMLG1CQUF0QixHQUE0QyxVQUFTTixFQUFULEVBQWE7QUFDckQsUUFBSU8sSUFBSWIsS0FBS0MsR0FBTCxDQUFTLENBQVQsRUFBWUQsS0FBS2MsR0FBTCxDQUFTLEtBQUt4SCxLQUFkLEVBQXFCZ0gsR0FBR2hILEtBQXhCLElBQWlDMEcsS0FBS0MsR0FBTCxDQUFTLEtBQUs5RyxJQUFkLEVBQW9CbUgsR0FBR25ILElBQXZCLENBQTdDLENBQVI7QUFBQSxRQUNJNEgsSUFBSWYsS0FBS0MsR0FBTCxDQUFTLENBQVQsRUFBWUQsS0FBS2MsR0FBTCxDQUFTLEtBQUtyQyxNQUFkLEVBQXNCNkIsR0FBRzdCLE1BQXpCLElBQW1DdUIsS0FBS0MsR0FBTCxDQUFTLEtBQUt6QixHQUFkLEVBQW1COEIsR0FBRzlCLEdBQXRCLENBQS9DLENBRFI7QUFBQSxRQUVJd0MsZ0JBQWdCSCxJQUFJRSxDQUZ4QjtBQUdBLFdBQU9DLGlCQUFpQixLQUFLNUIsTUFBTCxHQUFjLEtBQUtELEtBQXBDLENBQVA7QUFDSCxDQUxEOztBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0FJLFlBQVluSyxTQUFaLENBQXNCNkwsaUJBQXRCLEdBQTBDLFVBQVNDLFNBQVQsRUFBb0I7QUFDMUQsV0FBTztBQUNIMUMsYUFBSyxLQUFLQSxHQUFMLEdBQVcwQyxVQUFVMUMsR0FEdkI7QUFFSEMsZ0JBQVF5QyxVQUFVekMsTUFBVixHQUFtQixLQUFLQSxNQUY3QjtBQUdIdEYsY0FBTSxLQUFLQSxJQUFMLEdBQVkrSCxVQUFVL0gsSUFIekI7QUFJSEcsZUFBTzRILFVBQVU1SCxLQUFWLEdBQWtCLEtBQUtBLEtBSjNCO0FBS0g4RixnQkFBUSxLQUFLQSxNQUxWO0FBTUhELGVBQU8sS0FBS0E7QUFOVCxLQUFQO0FBUUgsQ0FURDs7QUFXQTtBQUNBO0FBQ0FJLFlBQVk0QixvQkFBWixHQUFtQyxVQUFTM0IsR0FBVCxFQUFjO0FBQzdDLFFBQUlKLFNBQVNJLElBQUk5QixHQUFKLEdBQVU4QixJQUFJOUIsR0FBSixDQUFRZ0MsWUFBbEIsR0FBaUNGLElBQUluRSxPQUFKLEdBQWNtRSxJQUFJRSxZQUFsQixHQUFpQyxDQUEvRTtBQUNBLFFBQUlQLFFBQVFLLElBQUk5QixHQUFKLEdBQVU4QixJQUFJOUIsR0FBSixDQUFRaUMsV0FBbEIsR0FBZ0NILElBQUluRSxPQUFKLEdBQWNtRSxJQUFJRyxXQUFsQixHQUFnQyxDQUE1RTtBQUNBLFFBQUluQixNQUFNZ0IsSUFBSTlCLEdBQUosR0FBVThCLElBQUk5QixHQUFKLENBQVFrQyxTQUFsQixHQUE4QkosSUFBSW5FLE9BQUosR0FBY21FLElBQUlJLFNBQWxCLEdBQThCLENBQXRFOztBQUVBSixVQUFNQSxJQUFJOUIsR0FBSixHQUFVOEIsSUFBSTlCLEdBQUosQ0FBUXFDLHFCQUFSLEVBQVYsR0FDRlAsSUFBSW5FLE9BQUosR0FBY21FLElBQUlPLHFCQUFKLEVBQWQsR0FBNENQLEdBRGhEO0FBRUEsUUFBSTRCLE1BQU07QUFDTmpJLGNBQU1xRyxJQUFJckcsSUFESjtBQUVORyxlQUFPa0csSUFBSWxHLEtBRkw7QUFHTmtGLGFBQUtnQixJQUFJaEIsR0FBSixJQUFXQSxHQUhWO0FBSU5ZLGdCQUFRSSxJQUFJSixNQUFKLElBQWNBLE1BSmhCO0FBS05YLGdCQUFRZSxJQUFJZixNQUFKLElBQWVELE9BQU9nQixJQUFJSixNQUFKLElBQWNBLE1BQXJCLENBTGpCO0FBTU5ELGVBQU9LLElBQUlMLEtBQUosSUFBYUE7QUFOZCxLQUFWO0FBUUEsV0FBT2lDLEdBQVA7QUFDSCxDQWhCRDs7QUFrQkE7QUFDQTtBQUNBO0FBQ0EsU0FBU0MscUJBQVQsQ0FBK0I5RyxNQUEvQixFQUF1QytHLFFBQXZDLEVBQWlEQyxZQUFqRCxFQUErREMsWUFBL0QsRUFBNkU7O0FBRXpFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFTQyxnQkFBVCxDQUEwQjFILENBQTFCLEVBQTZCb0csSUFBN0IsRUFBbUM7QUFDL0IsWUFBSXVCLFlBQUo7QUFBQSxZQUNJQyxvQkFBb0IsSUFBSXBDLFdBQUosQ0FBZ0J4RixDQUFoQixDQUR4QjtBQUFBLFlBRUk2SCxhQUFhLENBRmpCLENBRCtCLENBR1g7O0FBRXBCLGFBQUssSUFBSS9KLElBQUksQ0FBYixFQUFnQkEsSUFBSXNJLEtBQUtqTCxNQUF6QixFQUFpQzJDLEdBQWpDLEVBQXNDO0FBQ2xDLG1CQUFPa0MsRUFBRTRHLG9CQUFGLENBQXVCWSxZQUF2QixFQUFxQ3BCLEtBQUt0SSxDQUFMLENBQXJDLEtBQ05rQyxFQUFFMEcsTUFBRixDQUFTYyxZQUFULEtBQTBCeEgsRUFBRXdHLFdBQUYsQ0FBY2lCLFlBQWQsQ0FEM0IsRUFDeUQ7QUFDckR6SCxrQkFBRXNGLElBQUYsQ0FBT2MsS0FBS3RJLENBQUwsQ0FBUDtBQUNIO0FBQ0Q7QUFDQTtBQUNBLGdCQUFJa0MsRUFBRTBHLE1BQUYsQ0FBU2MsWUFBVCxDQUFKLEVBQTRCO0FBQ3hCLHVCQUFPeEgsQ0FBUDtBQUNIO0FBQ0QsZ0JBQUk4SCxJQUFJOUgsRUFBRTZHLG1CQUFGLENBQXNCVyxZQUF0QixDQUFSO0FBQ0E7QUFDQTtBQUNBLGdCQUFJSyxhQUFhQyxDQUFqQixFQUFvQjtBQUNoQkgsK0JBQWUsSUFBSW5DLFdBQUosQ0FBZ0J4RixDQUFoQixDQUFmO0FBQ0E2SCw2QkFBYUMsQ0FBYjtBQUNIO0FBQ0Q7QUFDQTlILGdCQUFJLElBQUl3RixXQUFKLENBQWdCb0MsaUJBQWhCLENBQUo7QUFDSDtBQUNELGVBQU9ELGdCQUFnQkMsaUJBQXZCO0FBQ0g7O0FBRUQsUUFBSUcsY0FBYyxJQUFJdkMsV0FBSixDQUFnQitCLFFBQWhCLENBQWxCO0FBQUEsUUFDSXRKLE1BQU1zSixTQUFTdEosR0FEbkI7QUFBQSxRQUVJK0osVUFBVS9FLGVBQWVoRixHQUFmLENBRmQ7QUFBQSxRQUdJbUksT0FBTyxFQUhYOztBQUtBO0FBQ0EsUUFBSW5JLElBQUljLFdBQVIsRUFBcUI7QUFDakIsWUFBSUMsSUFBSjtBQUNBLGdCQUFRZixJQUFJVyxRQUFaO0FBQ0ksaUJBQUssRUFBTDtBQUNJd0gsdUJBQU8sQ0FBRSxJQUFGLEVBQVEsSUFBUixDQUFQO0FBQ0FwSCx1QkFBTyxRQUFQO0FBQ0E7QUFDSixpQkFBSyxJQUFMO0FBQ0lvSCx1QkFBTyxDQUFFLElBQUYsRUFBUSxJQUFSLENBQVA7QUFDQXBILHVCQUFPLE9BQVA7QUFDQTtBQUNKLGlCQUFLLElBQUw7QUFDSW9ILHVCQUFPLENBQUUsSUFBRixFQUFRLElBQVIsQ0FBUDtBQUNBcEgsdUJBQU8sT0FBUDtBQUNBO0FBWlI7O0FBZUEsWUFBSWlKLE9BQU9GLFlBQVk1QixVQUF2QjtBQUFBLFlBQ0lsSCxXQUFXZ0osT0FBT2hDLEtBQUtpQyxLQUFMLENBQVdGLE9BQVgsQ0FEdEI7QUFBQSxZQUVJRyxjQUFjWCxhQUFheEksSUFBYixJQUFxQmlKLElBRnZDO0FBQUEsWUFHSUcsY0FBY2hDLEtBQUssQ0FBTCxDQUhsQjs7QUFLQTtBQUNBO0FBQ0E7QUFDQSxZQUFJSCxLQUFLb0MsR0FBTCxDQUFTcEosUUFBVCxJQUFxQmtKLFdBQXpCLEVBQXNDO0FBQ2xDbEosdUJBQVdBLFdBQVcsQ0FBWCxHQUFlLENBQUMsQ0FBaEIsR0FBb0IsQ0FBL0I7QUFDQUEsd0JBQVlnSCxLQUFLcUMsSUFBTCxDQUFVSCxjQUFjRixJQUF4QixJQUFnQ0EsSUFBNUM7QUFDSDs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUlELFVBQVUsQ0FBZCxFQUFpQjtBQUNiL0ksd0JBQVloQixJQUFJVyxRQUFKLEtBQWlCLEVBQWpCLEdBQXNCNEksYUFBYW5DLE1BQW5DLEdBQTRDbUMsYUFBYXBDLEtBQXJFO0FBQ0FnQixtQkFBT0EsS0FBS21DLE9BQUwsRUFBUDtBQUNIOztBQUVEO0FBQ0E7QUFDQVIsb0JBQVl6QyxJQUFaLENBQWlCOEMsV0FBakIsRUFBOEJuSixRQUE5QjtBQUVILEtBM0NELE1BMkNPO0FBQ0g7QUFDQSxZQUFJdUosdUJBQXdCVCxZQUFZNUIsVUFBWixHQUF5QnFCLGFBQWFuQyxNQUF2QyxHQUFpRCxHQUE1RTs7QUFFQSxnQkFBUXBILElBQUlhLFNBQVo7QUFDSSxpQkFBSyxRQUFMO0FBQ0lrSiwyQkFBWVEsdUJBQXVCLENBQW5DO0FBQ0E7QUFDSixpQkFBSyxLQUFMO0FBQ0lSLDJCQUFXUSxvQkFBWDtBQUNBO0FBTlI7O0FBU0E7QUFDQSxnQkFBUXZLLElBQUlXLFFBQVo7QUFDSSxpQkFBSyxFQUFMO0FBQ0kySSx5QkFBUzlELFdBQVQsQ0FBcUI7QUFDakJnQix5QkFBSzhDLFNBQVN4RCxXQUFULENBQXFCaUUsT0FBckIsRUFBOEIsR0FBOUI7QUFEWSxpQkFBckI7QUFHQTtBQUNKLGlCQUFLLElBQUw7QUFDSVQseUJBQVM5RCxXQUFULENBQXFCO0FBQ2pCckUsMEJBQU1tSSxTQUFTeEQsV0FBVCxDQUFxQmlFLE9BQXJCLEVBQThCLEdBQTlCO0FBRFcsaUJBQXJCO0FBR0E7QUFDSixpQkFBSyxJQUFMO0FBQ0lULHlCQUFTOUQsV0FBVCxDQUFxQjtBQUNqQmxFLDJCQUFPZ0ksU0FBU3hELFdBQVQsQ0FBcUJpRSxPQUFyQixFQUE4QixHQUE5QjtBQURVLGlCQUFyQjtBQUdBO0FBZlI7O0FBa0JBNUIsZUFBTyxDQUFFLElBQUYsRUFBUSxJQUFSLEVBQWMsSUFBZCxFQUFvQixJQUFwQixDQUFQOztBQUVBO0FBQ0E7QUFDQTJCLHNCQUFjLElBQUl2QyxXQUFKLENBQWdCK0IsUUFBaEIsQ0FBZDtBQUNIOztBQUVELFFBQUlJLGVBQWVELGlCQUFpQkssV0FBakIsRUFBOEIzQixJQUE5QixDQUFuQjtBQUNBbUIsYUFBU2pDLElBQVQsQ0FBY3FDLGFBQWFULGlCQUFiLENBQStCTSxZQUEvQixDQUFkO0FBQ0g7O0FBRUQ7Ozs7QUFJQTtBQUNBM08sT0FBTzRQLGFBQVAsR0FBdUIsWUFBVztBQUM5QixXQUFPO0FBQ0hDLGdCQUFRLGdCQUFTaFAsSUFBVCxFQUFlO0FBQ25CLGdCQUFJLENBQUNBLElBQUwsRUFBVztBQUNQLHVCQUFPLEVBQVA7QUFDSDtBQUNELGdCQUFJLE9BQU9BLElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7QUFDMUIsc0JBQU0sSUFBSTBCLEtBQUosQ0FBVSwrQkFBVixDQUFOO0FBQ0g7QUFDRCxtQkFBT3VOLG1CQUFtQkMsbUJBQW1CbFAsSUFBbkIsQ0FBbkIsQ0FBUDtBQUNIO0FBVEUsS0FBUDtBQVdILENBWkQ7O0FBY0FiLE9BQU9nUSxtQkFBUCxHQUE2QixVQUFTckksTUFBVCxFQUFpQnNJLE9BQWpCLEVBQTBCO0FBQ25ELFFBQUksQ0FBQ3RJLE1BQUQsSUFBVyxDQUFDc0ksT0FBaEIsRUFBeUI7QUFDckIsZUFBTyxJQUFQO0FBQ0g7QUFDRCxXQUFPdkksYUFBYUMsTUFBYixFQUFxQnNJLE9BQXJCLENBQVA7QUFDSCxDQUxEOztBQU9BLElBQUlDLG9CQUFvQixJQUF4QjtBQUNBLElBQUlDLGFBQWEsWUFBakI7QUFDQSxJQUFJQyx5QkFBeUIsTUFBN0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0FwUSxPQUFPcVEsV0FBUCxHQUFxQixVQUFTMUksTUFBVCxFQUFpQjJJLElBQWpCLEVBQXVCQyxPQUF2QixFQUFnQztBQUNqRCxRQUFJLENBQUM1SSxNQUFELElBQVcsQ0FBQzJJLElBQVosSUFBb0IsQ0FBQ0MsT0FBekIsRUFBa0M7QUFDOUIsZUFBTyxJQUFQO0FBQ0g7O0FBRUQ7QUFDQSxXQUFPQSxRQUFRQyxVQUFmLEVBQTJCO0FBQ3ZCRCxnQkFBUUUsV0FBUixDQUFvQkYsUUFBUUMsVUFBNUI7QUFDSDs7QUFFRCxRQUFJRSxnQkFBZ0IvSSxPQUFPZSxRQUFQLENBQWdCSixhQUFoQixDQUE4QixLQUE5QixDQUFwQjtBQUNBb0ksa0JBQWN6RixLQUFkLENBQW9CN0UsUUFBcEIsR0FBK0IsVUFBL0I7QUFDQXNLLGtCQUFjekYsS0FBZCxDQUFvQjFFLElBQXBCLEdBQTJCLEdBQTNCO0FBQ0FtSyxrQkFBY3pGLEtBQWQsQ0FBb0J2RSxLQUFwQixHQUE0QixHQUE1QjtBQUNBZ0ssa0JBQWN6RixLQUFkLENBQW9CVyxHQUFwQixHQUEwQixHQUExQjtBQUNBOEUsa0JBQWN6RixLQUFkLENBQW9CWSxNQUFwQixHQUE2QixHQUE3QjtBQUNBNkUsa0JBQWN6RixLQUFkLENBQW9CMEYsTUFBcEIsR0FBNkJQLHNCQUE3QjtBQUNBRyxZQUFRcEgsV0FBUixDQUFvQnVILGFBQXBCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQVNFLGFBQVQsQ0FBdUJOLElBQXZCLEVBQTZCO0FBQ3pCLGFBQUssSUFBSXJMLElBQUksQ0FBYixFQUFnQkEsSUFBSXFMLEtBQUtoTyxNQUF6QixFQUFpQzJDLEdBQWpDLEVBQXNDO0FBQ2xDLGdCQUFJcUwsS0FBS3JMLENBQUwsRUFBUTRMLFlBQVIsSUFBd0IsQ0FBQ1AsS0FBS3JMLENBQUwsRUFBUTZMLFlBQXJDLEVBQW1EO0FBQy9DLHVCQUFPLElBQVA7QUFDSDtBQUNKO0FBQ0QsZUFBTyxLQUFQO0FBQ0g7O0FBRUQ7QUFDQSxRQUFJLENBQUNGLGNBQWNOLElBQWQsQ0FBTCxFQUEwQjtBQUN0QixhQUFLLElBQUlyTCxJQUFJLENBQWIsRUFBZ0JBLElBQUlxTCxLQUFLaE8sTUFBekIsRUFBaUMyQyxHQUFqQyxFQUFzQztBQUNsQ3lMLDBCQUFjdkgsV0FBZCxDQUEwQm1ILEtBQUtyTCxDQUFMLEVBQVE2TCxZQUFsQztBQUNIO0FBQ0Q7QUFDSDs7QUFFRCxRQUFJbEMsZUFBZSxFQUFuQjtBQUFBLFFBQ0lELGVBQWVoQyxZQUFZNEIsb0JBQVosQ0FBaUNtQyxhQUFqQyxDQURuQjtBQUFBLFFBRUlLLFdBQVczRCxLQUFLaUMsS0FBTCxDQUFXVixhQUFhbkMsTUFBYixHQUFzQjBELGlCQUF0QixHQUEwQyxHQUFyRCxJQUE0RCxHQUYzRTtBQUdBLFFBQUk1RSxlQUFlO0FBQ2ZZLGNBQU82RSxXQUFXdFEsU0FBWixHQUF5QixLQUF6QixHQUFpQzBQO0FBRHhCLEtBQW5COztBQUlBLEtBQUMsWUFBVztBQUNSLFlBQUl6QixRQUFKLEVBQWN0SixHQUFkOztBQUVBLGFBQUssSUFBSUgsSUFBSSxDQUFiLEVBQWdCQSxJQUFJcUwsS0FBS2hPLE1BQXpCLEVBQWlDMkMsR0FBakMsRUFBc0M7QUFDbENHLGtCQUFNa0wsS0FBS3JMLENBQUwsQ0FBTjs7QUFFQTtBQUNBeUosdUJBQVcsSUFBSXJELFdBQUosQ0FBZ0IxRCxNQUFoQixFQUF3QnZDLEdBQXhCLEVBQTZCa0csWUFBN0IsQ0FBWDtBQUNBb0YsMEJBQWN2SCxXQUFkLENBQTBCdUYsU0FBUzVELEdBQW5DOztBQUVBO0FBQ0EyRCxrQ0FBc0I5RyxNQUF0QixFQUE4QitHLFFBQTlCLEVBQXdDQyxZQUF4QyxFQUFzREMsWUFBdEQ7O0FBRUE7QUFDQTtBQUNBeEosZ0JBQUkwTCxZQUFKLEdBQW1CcEMsU0FBUzVELEdBQTVCOztBQUVBOEQseUJBQWF2RixJQUFiLENBQWtCc0QsWUFBWTRCLG9CQUFaLENBQWlDRyxRQUFqQyxDQUFsQjtBQUNIO0FBQ0osS0FuQkQ7QUFvQkgsQ0FsRUQ7O0FBb0VBMU8sT0FBT2dSLE1BQVAsR0FBZ0IsVUFBU3JKLE1BQVQsRUFBaUJzSixPQUFqQixFQUEwQjtBQUN0QyxTQUFLdEosTUFBTCxHQUFjQSxNQUFkO0FBQ0EsU0FBS3VKLEtBQUwsR0FBYSxTQUFiO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDQSxTQUFLRixPQUFMLEdBQWVBLFdBQVcsSUFBSUcsV0FBSixDQUFnQixNQUFoQixDQUExQjtBQUNBLFNBQUsvTCxVQUFMLEdBQWtCLEVBQWxCO0FBQ0gsQ0FORDs7QUFRQXJGLE9BQU9nUixNQUFQLENBQWN4TyxTQUFkLEdBQTBCO0FBQ3RCO0FBQ0E7QUFDQTZPLHdCQUFvQiw0QkFBU3JKLENBQVQsRUFBWTtBQUM1QixZQUFJQSxhQUFhdkYsWUFBakIsRUFBK0I7QUFDM0IsaUJBQUs2TyxjQUFMLElBQXVCLEtBQUtBLGNBQUwsQ0FBb0J0SixDQUFwQixDQUF2QjtBQUNILFNBRkQsTUFFTztBQUNILGtCQUFNQSxDQUFOO0FBQ0g7QUFDSixLQVRxQjtBQVV0QnVKLFdBQU8sZUFBVTFRLElBQVYsRUFBZ0IyUSxRQUFoQixFQUEwQjtBQUM3QixZQUFJQyxPQUFPLElBQVg7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBSTVRLElBQUosRUFBVTtBQUNOO0FBQ0E0USxpQkFBS04sTUFBTCxJQUFlTSxLQUFLUixPQUFMLENBQWFwQixNQUFiLENBQW9CaFAsSUFBcEIsRUFBMEIsRUFBQzZRLFFBQVEsSUFBVCxFQUExQixDQUFmO0FBQ0g7O0FBRUQsaUJBQVNDLGVBQVQsR0FBMkI7QUFDdkIsZ0JBQUlSLFNBQVNNLEtBQUtOLE1BQWxCO0FBQ0EsZ0JBQUlTLE1BQU0sQ0FBVjtBQUNBLG1CQUFPQSxNQUFNVCxPQUFPN08sTUFBYixJQUF1QjZPLE9BQU9TLEdBQVAsTUFBZ0IsSUFBdkMsSUFBK0NULE9BQU9TLEdBQVAsTUFBZ0IsSUFBdEUsRUFBNEU7QUFDeEUsa0JBQUVBLEdBQUY7QUFDSDtBQUNELGdCQUFJNUwsT0FBT21MLE9BQU9ySyxNQUFQLENBQWMsQ0FBZCxFQUFpQjhLLEdBQWpCLENBQVg7QUFDQTtBQUNBLGdCQUFJVCxPQUFPUyxHQUFQLE1BQWdCLElBQXBCLEVBQTBCO0FBQ3RCLGtCQUFFQSxHQUFGO0FBQ0g7QUFDRCxnQkFBSVQsT0FBT1MsR0FBUCxNQUFnQixJQUFwQixFQUEwQjtBQUN0QixrQkFBRUEsR0FBRjtBQUNIO0FBQ0RILGlCQUFLTixNQUFMLEdBQWNBLE9BQU9ySyxNQUFQLENBQWM4SyxHQUFkLENBQWQ7QUFDQSxtQkFBTzVMLElBQVA7QUFDSDs7QUFFRDtBQUNBLGlCQUFTNkwsV0FBVCxDQUFxQjFPLEtBQXJCLEVBQTRCO0FBQ3hCLGdCQUFJdUMsV0FBVyxJQUFJL0IsUUFBSixFQUFmOztBQUVBZ0IseUJBQWF4QixLQUFiLEVBQW9CLFVBQVVXLENBQVYsRUFBYUMsQ0FBYixFQUFnQjtBQUNoQyx3QkFBUUQsQ0FBUjtBQUNJLHlCQUFLLElBQUw7QUFDSTRCLGlDQUFTN0IsR0FBVCxDQUFhQyxDQUFiLEVBQWdCQyxDQUFoQjtBQUNBO0FBQ0oseUJBQUssT0FBTDtBQUNJMkIsaUNBQVNqQixPQUFULENBQWlCWCxDQUFqQixFQUFvQkMsQ0FBcEI7QUFDQTtBQUNKLHlCQUFLLE9BQUw7QUFDSTJCLGlDQUFTbkIsT0FBVCxDQUFpQlQsQ0FBakIsRUFBb0JDLENBQXBCO0FBQ0E7QUFDSix5QkFBSyxjQUFMO0FBQ0EseUJBQUssZ0JBQUw7QUFDSSw0QkFBSStOLEtBQUsvTixFQUFFaUIsS0FBRixDQUFRLEdBQVIsQ0FBVDtBQUNBLDRCQUFJOE0sR0FBR3hQLE1BQUgsS0FBYyxDQUFsQixFQUFxQjtBQUNqQjtBQUNIO0FBQ0Q7QUFDQTtBQUNBLDRCQUFJeVAsU0FBUyxJQUFJcE8sUUFBSixFQUFiO0FBQ0FvTywrQkFBT3ROLE9BQVAsQ0FBZSxHQUFmLEVBQW9CcU4sR0FBRyxDQUFILENBQXBCO0FBQ0FDLCtCQUFPdE4sT0FBUCxDQUFlLEdBQWYsRUFBb0JxTixHQUFHLENBQUgsQ0FBcEI7QUFDQSw0QkFBSSxDQUFDQyxPQUFPNU4sR0FBUCxDQUFXLEdBQVgsQ0FBRCxJQUFvQixDQUFDNE4sT0FBTzVOLEdBQVAsQ0FBVyxHQUFYLENBQXpCLEVBQTBDO0FBQ3RDO0FBQ0g7QUFDRHVCLGlDQUFTN0IsR0FBVCxDQUFhQyxJQUFJLEdBQWpCLEVBQXNCaU8sT0FBTy9OLEdBQVAsQ0FBVyxHQUFYLENBQXRCO0FBQ0EwQixpQ0FBUzdCLEdBQVQsQ0FBYUMsSUFBSSxHQUFqQixFQUFzQmlPLE9BQU8vTixHQUFQLENBQVcsR0FBWCxDQUF0QjtBQUNBO0FBQ0oseUJBQUssUUFBTDtBQUNJMEIsaUNBQVN0QixHQUFULENBQWFOLENBQWIsRUFBZ0JDLENBQWhCLEVBQW1CLENBQUMsSUFBRCxDQUFuQjtBQUNBO0FBN0JSO0FBK0JILGFBaENELEVBZ0NHLEdBaENILEVBZ0NRLElBaENSOztBQWtDQTtBQUNBO0FBQ0EsZ0JBQUkyQixTQUFTdkIsR0FBVCxDQUFhLElBQWIsQ0FBSixFQUF3QjtBQUNwQixvQkFBSXlCLFNBQVMsSUFBSTZMLEtBQUs5SixNQUFMLENBQVlxSyxTQUFoQixFQUFiO0FBQ0FwTSx1QkFBTzJHLEtBQVAsR0FBZTdHLFNBQVMxQixHQUFULENBQWEsT0FBYixFQUFzQixHQUF0QixDQUFmO0FBQ0E0Qix1QkFBT3FNLEtBQVAsR0FBZXZNLFNBQVMxQixHQUFULENBQWEsT0FBYixFQUFzQixDQUF0QixDQUFmO0FBQ0E0Qix1QkFBT3NNLGFBQVAsR0FBdUJ4TSxTQUFTMUIsR0FBVCxDQUFhLGVBQWIsRUFBOEIsQ0FBOUIsQ0FBdkI7QUFDQTRCLHVCQUFPdU0sYUFBUCxHQUF1QnpNLFNBQVMxQixHQUFULENBQWEsZUFBYixFQUE4QixHQUE5QixDQUF2QjtBQUNBNEIsdUJBQU93TSxlQUFQLEdBQXlCMU0sU0FBUzFCLEdBQVQsQ0FBYSxpQkFBYixFQUFnQyxDQUFoQyxDQUF6QjtBQUNBNEIsdUJBQU95TSxlQUFQLEdBQXlCM00sU0FBUzFCLEdBQVQsQ0FBYSxpQkFBYixFQUFnQyxHQUFoQyxDQUF6QjtBQUNBNEIsdUJBQU8wTSxNQUFQLEdBQWdCNU0sU0FBUzFCLEdBQVQsQ0FBYSxRQUFiLEVBQXVCLEVBQXZCLENBQWhCO0FBQ0E7QUFDQXlOLHFCQUFLYyxRQUFMLElBQWlCZCxLQUFLYyxRQUFMLENBQWMzTSxNQUFkLENBQWpCO0FBQ0E7QUFDQTtBQUNBNkwscUJBQUtwTSxVQUFMLENBQWdCZ0UsSUFBaEIsQ0FBcUI7QUFDakIxRCx3QkFBSUQsU0FBUzFCLEdBQVQsQ0FBYSxJQUFiLENBRGE7QUFFakI0Qiw0QkFBUUE7QUFGUyxpQkFBckI7QUFJSDtBQUNKOztBQUVEO0FBQ0EsaUJBQVM0TSxXQUFULENBQXFCclAsS0FBckIsRUFBNEI7QUFDeEJ3Qix5QkFBYXhCLEtBQWIsRUFBb0IsVUFBVVcsQ0FBVixFQUFhQyxDQUFiLEVBQWdCO0FBQ2hDLHdCQUFRRCxDQUFSO0FBQ0kseUJBQUssUUFBTDtBQUNJO0FBQ0ErTixvQ0FBWTlOLENBQVo7QUFDQTtBQUpSO0FBTUgsYUFQRCxFQU9HLEdBUEg7QUFRSDs7QUFFRDtBQUNBLFlBQUk7QUFDQSxnQkFBSWlDLElBQUo7QUFDQSxnQkFBSXlMLEtBQUtQLEtBQUwsS0FBZSxTQUFuQixFQUE4QjtBQUMxQjtBQUNBLG9CQUFJLENBQUMsVUFBVTFNLElBQVYsQ0FBZWlOLEtBQUtOLE1BQXBCLENBQUwsRUFBa0M7QUFDOUIsMkJBQU8sSUFBUDtBQUNIOztBQUVEbkwsdUJBQU8yTCxpQkFBUDs7QUFFQSxvQkFBSXJPLElBQUkwQyxLQUFLdkMsS0FBTCxDQUFXLG9CQUFYLENBQVI7QUFDQSxvQkFBSSxDQUFDSCxDQUFELElBQU0sQ0FBQ0EsRUFBRSxDQUFGLENBQVgsRUFBaUI7QUFDYiwwQkFBTSxJQUFJYixZQUFKLENBQWlCQSxhQUFhTSxNQUFiLENBQW9CQyxZQUFyQyxDQUFOO0FBQ0g7O0FBRUR5TyxxQkFBS1AsS0FBTCxHQUFhLFFBQWI7QUFDSDs7QUFFRCxnQkFBSXVCLHVCQUF1QixLQUEzQjtBQUNBLG1CQUFPaEIsS0FBS04sTUFBWixFQUFvQjtBQUNoQjtBQUNBLG9CQUFJLENBQUMsVUFBVTNNLElBQVYsQ0FBZWlOLEtBQUtOLE1BQXBCLENBQUwsRUFBa0M7QUFDOUIsMkJBQU8sSUFBUDtBQUNIOztBQUVELG9CQUFJLENBQUNzQixvQkFBTCxFQUEyQjtBQUN2QnpNLDJCQUFPMkwsaUJBQVA7QUFDSCxpQkFGRCxNQUVPO0FBQ0hjLDJDQUF1QixLQUF2QjtBQUNIOztBQUVELHdCQUFRaEIsS0FBS1AsS0FBYjtBQUNJLHlCQUFLLFFBQUw7QUFDSTtBQUNBLDRCQUFJLElBQUkxTSxJQUFKLENBQVN3QixJQUFULENBQUosRUFBb0I7QUFDaEJ3TSx3Q0FBWXhNLElBQVo7QUFDSCx5QkFGRCxNQUVPLElBQUksQ0FBQ0EsSUFBTCxFQUFXO0FBQ2Q7QUFDQXlMLGlDQUFLUCxLQUFMLEdBQWEsSUFBYjtBQUNIO0FBQ0Q7QUFDSix5QkFBSyxNQUFMO0FBQ0k7QUFDQSw0QkFBSSxDQUFDbEwsSUFBTCxFQUFXO0FBQ1B5TCxpQ0FBS1AsS0FBTCxHQUFhLElBQWI7QUFDSDtBQUNEO0FBQ0oseUJBQUssSUFBTDtBQUNJO0FBQ0EsNEJBQUksaUJBQWlCMU0sSUFBakIsQ0FBc0J3QixJQUF0QixDQUFKLEVBQWlDO0FBQzdCeUwsaUNBQUtQLEtBQUwsR0FBYSxNQUFiO0FBQ0E7QUFDSDtBQUNEO0FBQ0EsNEJBQUksQ0FBQ2xMLElBQUwsRUFBVztBQUNQO0FBQ0g7QUFDRHlMLDZCQUFLck0sR0FBTCxHQUFXLElBQUlxTSxLQUFLOUosTUFBTCxDQUFZK0ssTUFBaEIsQ0FBdUIsQ0FBdkIsRUFBMEIsQ0FBMUIsRUFBNkIsRUFBN0IsQ0FBWDtBQUNBakIsNkJBQUtQLEtBQUwsR0FBYSxLQUFiO0FBQ0E7QUFDQSw0QkFBSWxMLEtBQUsyTSxPQUFMLENBQWEsS0FBYixNQUF3QixDQUFDLENBQTdCLEVBQWdDO0FBQzVCbEIsaUNBQUtyTSxHQUFMLENBQVNPLEVBQVQsR0FBY0ssSUFBZDtBQUNBO0FBQ0g7QUFDTDtBQUNBO0FBQ0EseUJBQUssS0FBTDtBQUNJO0FBQ0EsNEJBQUk7QUFDQWIscUNBQVNhLElBQVQsRUFBZXlMLEtBQUtyTSxHQUFwQixFQUF5QnFNLEtBQUtwTSxVQUE5QjtBQUNILHlCQUZELENBRUUsT0FBTzJDLENBQVAsRUFBVTtBQUNSeUosaUNBQUtKLGtCQUFMLENBQXdCckosQ0FBeEI7QUFDQTtBQUNBeUosaUNBQUtyTSxHQUFMLEdBQVcsSUFBWDtBQUNBcU0saUNBQUtQLEtBQUwsR0FBYSxRQUFiO0FBQ0E7QUFDSDtBQUNETyw2QkFBS1AsS0FBTCxHQUFhLFNBQWI7QUFDQTtBQUNKLHlCQUFLLFNBQUw7QUFDSSw0QkFBSTBCLGVBQWU1TSxLQUFLMk0sT0FBTCxDQUFhLEtBQWIsTUFBd0IsQ0FBQyxDQUE1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQUksQ0FBQzNNLElBQUQsSUFBUzRNLGlCQUFpQkgsdUJBQXVCLElBQXhDLENBQWIsRUFBNEQ7QUFDeEQ7QUFDQWhCLGlDQUFLb0IsS0FBTCxJQUFjcEIsS0FBS29CLEtBQUwsQ0FBV3BCLEtBQUtyTSxHQUFoQixDQUFkO0FBQ0FxTSxpQ0FBS3JNLEdBQUwsR0FBVyxJQUFYO0FBQ0FxTSxpQ0FBS1AsS0FBTCxHQUFhLElBQWI7QUFDQTtBQUNIO0FBQ0QsNEJBQUlPLEtBQUtyTSxHQUFMLENBQVN1RSxJQUFiLEVBQW1CO0FBQ2Y4SCxpQ0FBS3JNLEdBQUwsQ0FBU3VFLElBQVQsSUFBaUIsSUFBakI7QUFDSDtBQUNEOEgsNkJBQUtyTSxHQUFMLENBQVN1RSxJQUFULElBQWlCM0QsSUFBakI7QUFDQTtBQUNKLHlCQUFLLFFBQUw7QUFBZTtBQUNYO0FBQ0EsNEJBQUksQ0FBQ0EsSUFBTCxFQUFXO0FBQ1B5TCxpQ0FBS1AsS0FBTCxHQUFhLElBQWI7QUFDSDtBQUNEO0FBdkVSO0FBeUVIOztBQUVEO0FBQ0EsZ0JBQUksQ0FBQ00sUUFBTCxFQUFlO0FBQ1hDLHFCQUFLcUIsS0FBTDtBQUNBLHVCQUFPLElBQVA7QUFDSDtBQUNKLFNBL0dELENBK0dFLE9BQU85SyxDQUFQLEVBQVU7QUFDUnlKLGlCQUFLSixrQkFBTCxDQUF3QnJKLENBQXhCOztBQUVBO0FBQ0EsZ0JBQUl5SixLQUFLUCxLQUFMLEtBQWUsU0FBZixJQUE0Qk8sS0FBS3JNLEdBQWpDLElBQXdDcU0sS0FBS29CLEtBQWpELEVBQXdEO0FBQ3BEcEIscUJBQUtvQixLQUFMLENBQVdwQixLQUFLck0sR0FBaEI7QUFDSDtBQUNEcU0saUJBQUtyTSxHQUFMLEdBQVcsSUFBWDtBQUNBO0FBQ0E7QUFDQXFNLGlCQUFLUCxLQUFMLEdBQWFPLEtBQUtQLEtBQUwsS0FBZSxTQUFmLEdBQTJCLFdBQTNCLEdBQXlDLFFBQXREO0FBQ0g7QUFDRCxlQUFPLElBQVA7QUFDSCxLQTVPcUI7QUE2T3RCNEIsV0FBTyxpQkFBWTtBQUNmLFlBQUlyQixPQUFPLElBQVg7QUFDQSxZQUFJO0FBQ0E7QUFDQUEsaUJBQUtOLE1BQUwsSUFBZU0sS0FBS1IsT0FBTCxDQUFhcEIsTUFBYixFQUFmO0FBQ0E7QUFDQSxnQkFBSTRCLEtBQUtyTSxHQUFMLElBQVlxTSxLQUFLUCxLQUFMLEtBQWUsUUFBL0IsRUFBeUM7QUFDckNPLHFCQUFLTixNQUFMLElBQWUsTUFBZjtBQUNBTSxxQkFBS0YsS0FBTDtBQUNIO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsZ0JBQUlFLEtBQUtQLEtBQUwsS0FBZSxTQUFuQixFQUE4QjtBQUMxQixzQkFBTSxJQUFJek8sWUFBSixDQUFpQkEsYUFBYU0sTUFBYixDQUFvQkMsWUFBckMsQ0FBTjtBQUNIO0FBQ0osU0FkRCxDQWNFLE9BQU1nRixDQUFOLEVBQVM7QUFDUHlKLGlCQUFLSixrQkFBTCxDQUF3QnJKLENBQXhCO0FBQ0g7QUFDRHlKLGFBQUtzQixPQUFMLElBQWdCdEIsS0FBS3NCLE9BQUwsRUFBaEI7QUFDQSxlQUFPLElBQVA7QUFDSDtBQWxRcUIsQ0FBMUI7O2tCQXdRZS9TLE07Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbmdEZjs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQWdCQSxJQUFJZ1MsWUFBWSxFQUFoQjs7QUFFQSxJQUFJZ0IsZ0JBQWdCO0FBQ2hCLFFBQUksSUFEWTtBQUVoQixVQUFNO0FBRlUsQ0FBcEI7O0FBS0EsU0FBU0MsaUJBQVQsQ0FBMkJDLEtBQTNCLEVBQWtDO0FBQzlCLFFBQUksT0FBT0EsS0FBUCxLQUFpQixRQUFyQixFQUErQjtBQUMzQixlQUFPLEtBQVA7QUFDSDtBQUNELFFBQUlaLFNBQVNVLGNBQWNFLE1BQU1DLFdBQU4sRUFBZCxDQUFiO0FBQ0EsV0FBT2IsU0FBU1ksTUFBTUMsV0FBTixFQUFULEdBQStCLEtBQXRDO0FBQ0g7O0FBRUQsU0FBU0MsbUJBQVQsQ0FBNkJGLEtBQTdCLEVBQW9DO0FBQ2hDLFdBQU8sT0FBT0EsS0FBUCxLQUFpQixRQUFqQixJQUE4QkEsU0FBUyxDQUFULElBQWNBLFNBQVMsR0FBNUQ7QUFDSDs7QUFFRDtBQUNBbEIsWUFBWSxxQkFBVztBQUNuQixRQUFJcUIsU0FBUyxHQUFiO0FBQ0EsUUFBSUMsU0FBUyxDQUFiO0FBQ0EsUUFBSUMsaUJBQWlCLENBQXJCO0FBQ0EsUUFBSUMsaUJBQWlCLEdBQXJCO0FBQ0EsUUFBSUMsbUJBQW1CLENBQXZCO0FBQ0EsUUFBSUMsbUJBQW1CLEdBQXZCO0FBQ0EsUUFBSUMsVUFBVSxFQUFkOztBQUVBMVIsV0FBTzJSLGdCQUFQLENBQXdCLElBQXhCLEVBQThCO0FBQzFCLGlCQUFTO0FBQ0xDLHdCQUFZLElBRFA7QUFFTDdQLGlCQUFLLGVBQVc7QUFDWix1QkFBT3FQLE1BQVA7QUFDSCxhQUpJO0FBS0x4UCxpQkFBSyxhQUFTcVAsS0FBVCxFQUFnQjtBQUNqQixvQkFBSSxDQUFDRSxvQkFBb0JGLEtBQXBCLENBQUwsRUFBaUM7QUFDN0IsMEJBQU0sSUFBSTNRLEtBQUosQ0FBVSxrQ0FBVixDQUFOO0FBQ0g7QUFDRDhRLHlCQUFTSCxLQUFUO0FBQ0g7QUFWSSxTQURpQjtBQWExQixpQkFBUztBQUNMVyx3QkFBWSxJQURQO0FBRUw3UCxpQkFBSyxlQUFXO0FBQ1osdUJBQU9zUCxNQUFQO0FBQ0gsYUFKSTtBQUtMelAsaUJBQUssYUFBU3FQLEtBQVQsRUFBZ0I7QUFDakIsb0JBQUksT0FBT0EsS0FBUCxLQUFpQixRQUFyQixFQUErQjtBQUMzQiwwQkFBTSxJQUFJWSxTQUFKLENBQWMsZ0NBQWQsQ0FBTjtBQUNIO0FBQ0RSLHlCQUFTSixLQUFUO0FBQ0g7QUFWSSxTQWJpQjtBQXlCMUIseUJBQWlCO0FBQ2JXLHdCQUFZLElBREM7QUFFYjdQLGlCQUFLLGVBQVc7QUFDWix1QkFBT3dQLGNBQVA7QUFDSCxhQUpZO0FBS2IzUCxpQkFBSyxhQUFTcVAsS0FBVCxFQUFnQjtBQUNqQixvQkFBSSxDQUFDRSxvQkFBb0JGLEtBQXBCLENBQUwsRUFBaUM7QUFDN0IsMEJBQU0sSUFBSTNRLEtBQUosQ0FBVSwwQ0FBVixDQUFOO0FBQ0g7QUFDRGlSLGlDQUFpQk4sS0FBakI7QUFDSDtBQVZZLFNBekJTO0FBcUMxQix5QkFBaUI7QUFDYlcsd0JBQVksSUFEQztBQUViN1AsaUJBQUssZUFBVztBQUNaLHVCQUFPdVAsY0FBUDtBQUNILGFBSlk7QUFLYjFQLGlCQUFLLGFBQVNxUCxLQUFULEVBQWdCO0FBQ2pCLG9CQUFHLENBQUNFLG9CQUFvQkYsS0FBcEIsQ0FBSixFQUFnQztBQUM1QiwwQkFBTSxJQUFJM1EsS0FBSixDQUFVLDBDQUFWLENBQU47QUFDSDtBQUNEZ1IsaUNBQWlCTCxLQUFqQjtBQUNIO0FBVlksU0FyQ1M7QUFpRDFCLDJCQUFtQjtBQUNmVyx3QkFBWSxJQURHO0FBRWY3UCxpQkFBSyxlQUFXO0FBQ1osdUJBQU8wUCxnQkFBUDtBQUNILGFBSmM7QUFLZjdQLGlCQUFLLGFBQVNxUCxLQUFULEVBQWdCO0FBQ2pCLG9CQUFJLENBQUNFLG9CQUFvQkYsS0FBcEIsQ0FBTCxFQUFpQztBQUM3QiwwQkFBTSxJQUFJM1EsS0FBSixDQUFVLDRDQUFWLENBQU47QUFDSDtBQUNEbVIsbUNBQW1CUixLQUFuQjtBQUNIO0FBVmMsU0FqRE87QUE2RDFCLDJCQUFtQjtBQUNmVyx3QkFBWSxJQURHO0FBRWY3UCxpQkFBSyxlQUFXO0FBQ1osdUJBQU95UCxnQkFBUDtBQUNILGFBSmM7QUFLZjVQLGlCQUFLLGFBQVNxUCxLQUFULEVBQWdCO0FBQ2pCLG9CQUFJLENBQUNFLG9CQUFvQkYsS0FBcEIsQ0FBTCxFQUFpQztBQUM3QiwwQkFBTSxJQUFJM1EsS0FBSixDQUFVLDRDQUFWLENBQU47QUFDSDtBQUNEa1IsbUNBQW1CUCxLQUFuQjtBQUNIO0FBVmMsU0E3RE87QUF5RTFCLGtCQUFVO0FBQ05XLHdCQUFZLElBRE47QUFFTjdQLGlCQUFLLGVBQVc7QUFDWix1QkFBTzJQLE9BQVA7QUFDSCxhQUpLO0FBS045UCxpQkFBSyxhQUFTcVAsS0FBVCxFQUFnQjtBQUNqQixvQkFBSWEsVUFBVWQsa0JBQWtCQyxLQUFsQixDQUFkO0FBQ0E7QUFDQSxvQkFBSWEsWUFBWSxLQUFoQixFQUF1QjtBQUNuQiwwQkFBTSxJQUFJQyxXQUFKLENBQWdCLDZDQUFoQixDQUFOO0FBQ0g7QUFDREwsMEJBQVVJLE9BQVY7QUFDSDtBQVpLO0FBekVnQixLQUE5QjtBQXdGSCxDQWpHRDs7a0JBbUdlL0IsUyIsImZpbGUiOiJ2dHRwYXJzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB2dHQuanMgLSB2MC4xMi4xIChodHRwczovL2dpdGh1Yi5jb20vbW96aWxsYS92dHQuanMpIGJ1aWx0IG9uIDAzLTEyLTIwMTUgKi9cbmltcG9ydCBWVFRDdWUgZnJvbSAndXRpbHMvY2FwdGlvbnMvdnR0Q3VlJztcbmltcG9ydCBWVFRSZWdpb24gZnJvbSAndXRpbHMvY2FwdGlvbnMvdnR0UmVnaW9uJztcblxuLypcbiogdnR0Lmpz6rCAIChmdW5jdGlvbigpey4uLn0pKSh0aGlzKTsg7J2065+wIO2MqO2EtOydtOudvCDsmKTruJAg7ZSM66CI7J207Ja07J2YIGltcG9ydCBleHBvcnQg6rWs7KGw7JeQIOunnuyngCDslYrripTri6QuXG4qICovXG4vKipcbiAqIENvcHlyaWdodCAyMDEzIHZ0dC5qcyBDb250cmlidXRvcnNcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qIC0qLSBNb2RlOiBKYXZhOyB0YWItd2lkdGg6IDI7IGluZGVudC10YWJzLW1vZGU6IG5pbDsgYy1iYXNpYy1vZmZzZXQ6IDIgLSotICovXG4vKiB2aW06IHNldCBzaGlmdHdpZHRoPTIgdGFic3RvcD0yIGF1dG9pbmRlbnQgY2luZGVudCBleHBhbmR0YWI6ICovXG5cbmxldCBXZWJWVFQgPSBmdW5jdGlvbigpe307XG5mdW5jdGlvbiBtYWtlQ29sb3JTZXQoY29sb3IsIG9wYWNpdHkpIHtcbiAgICBpZihvcGFjaXR5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgb3BhY2l0eSA9IDE7XG4gICAgfVxuICAgIHJldHVybiBcInJnYmEoXCIgKyBbcGFyc2VJbnQoY29sb3Iuc3Vic3RyaW5nKDAsIDIpLCAxNiksXG4gICAgICAgICAgICBwYXJzZUludChjb2xvci5zdWJzdHJpbmcoMiwgNCksIDE2KSxcbiAgICAgICAgICAgIHBhcnNlSW50KGNvbG9yLnN1YnN0cmluZyg0LCA2KSwgMTYpLFxuICAgICAgICAgICAgb3BhY2l0eV0uam9pbihcIixcIikgKyBcIilcIjtcbn1cblxudmFyIFdlYlZUVFByZWZzID0gWyd3ZWJ2dHQuZm9udC5jb2xvcicsICd3ZWJ2dHQuZm9udC5vcGFjaXR5JywgJ3dlYnZ0dC5mb250LnNjYWxlJyxcbiAgICAnd2VidnR0LmJnLmNvbG9yJywgJ3dlYnZ0dC5iZy5vcGFjaXR5JyxcbiAgICAnd2VidnR0LmVkZ2UuY29sb3InLCAnd2VidnR0LmVkZ2UudHlwZSddO1xuXG52YXIgZm9udFNjYWxlID0gMTtcblxuZnVuY3Rpb24gb2JzZXJ2ZShzdWJqZWN0LCB0b3BpYywgZGF0YSkge1xuICAgIHN3aXRjaCAoZGF0YSkge1xuICAgICAgICBjYXNlIFwid2VidnR0LmZvbnQuY29sb3JcIjpcbiAgICAgICAgY2FzZSBcIndlYnZ0dC5mb250Lm9wYWNpdHlcIjpcbiAgICAgICAgICAgIHZhciBmb250Q29sb3IgPSBTZXJ2aWNlcy5wcmVmcy5nZXRDaGFyUHJlZihcIndlYnZ0dC5mb250LmNvbG9yXCIpO1xuICAgICAgICAgICAgdmFyIGZvbnRPcGFjaXR5ID0gU2VydmljZXMucHJlZnMuZ2V0SW50UHJlZihcIndlYnZ0dC5mb250Lm9wYWNpdHlcIikgLyAxMDA7XG4gICAgICAgICAgICBXZWJWVFRTZXQuZm9udFNldCA9IG1ha2VDb2xvclNldChmb250Q29sb3IsIGZvbnRPcGFjaXR5KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwid2VidnR0LmZvbnQuc2NhbGVcIjpcbiAgICAgICAgICAgIGZvbnRTY2FsZSA9IFNlcnZpY2VzLnByZWZzLmdldEludFByZWYoXCJ3ZWJ2dHQuZm9udC5zY2FsZVwiKSAvIDEwMDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwid2VidnR0LmJnLmNvbG9yXCI6XG4gICAgICAgIGNhc2UgXCJ3ZWJ2dHQuYmcub3BhY2l0eVwiOlxuICAgICAgICAgICAgdmFyIGJhY2tncm91bmRDb2xvciA9IFNlcnZpY2VzLnByZWZzLmdldENoYXJQcmVmKFwid2VidnR0LmJnLmNvbG9yXCIpO1xuICAgICAgICAgICAgdmFyIGJhY2tncm91bmRPcGFjaXR5ID0gU2VydmljZXMucHJlZnMuZ2V0SW50UHJlZihcIndlYnZ0dC5iZy5vcGFjaXR5XCIpIC8gMTAwO1xuICAgICAgICAgICAgV2ViVlRUU2V0LmJhY2tncm91bmRTZXQgPSBtYWtlQ29sb3JTZXQoYmFja2dyb3VuZENvbG9yLCBiYWNrZ3JvdW5kT3BhY2l0eSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIndlYnZ0dC5lZGdlLmNvbG9yXCI6XG4gICAgICAgIGNhc2UgXCJ3ZWJ2dHQuZWRnZS50eXBlXCI6XG4gICAgICAgICAgICB2YXIgZWRnZVR5cGVMaXN0ID0gW1wiXCIsIFwiMHB4IDBweCBcIiwgXCI0cHggNHB4IDRweCBcIiwgXCItMnB4IC0ycHggXCIsIFwiMnB4IDJweCBcIl07XG4gICAgICAgICAgICB2YXIgZWRnZVR5cGUgPSBTZXJ2aWNlcy5wcmVmcy5nZXRJbnRQcmVmKFwid2VidnR0LmVkZ2UudHlwZVwiKTtcbiAgICAgICAgICAgIHZhciBlZGdlQ29sb3IgPSBTZXJ2aWNlcy5wcmVmcy5nZXRDaGFyUHJlZihcIndlYnZ0dC5lZGdlLmNvbG9yXCIpO1xuICAgICAgICAgICAgV2ViVlRUU2V0LmVkZ2VTZXQgPSBlZGdlVHlwZUxpc3RbZWRnZVR5cGVdICsgbWFrZUNvbG9yU2V0KGVkZ2VDb2xvcik7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG59XG5cbmlmKHR5cGVvZiBTZXJ2aWNlcyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBXZWJWVFRTZXQgPSB7fTtcbiAgICBXZWJWVFRQcmVmcy5mb3JFYWNoKGZ1bmN0aW9uIChwcmVmKSB7XG4gICAgICAgIG9ic2VydmUodW5kZWZpbmVkLCB1bmRlZmluZWQsIHByZWYpO1xuICAgICAgICBTZXJ2aWNlcy5wcmVmcy5hZGRPYnNlcnZlcihwcmVmLCBvYnNlcnZlLCBmYWxzZSk7XG4gICAgfSk7XG59XG5cbnZhciBfb2JqQ3JlYXRlID0gT2JqZWN0LmNyZWF0ZSB8fCAoZnVuY3Rpb24oKSB7XG4gICAgICAgIGZ1bmN0aW9uIEYoKSB7fVxuICAgICAgICByZXR1cm4gZnVuY3Rpb24obykge1xuICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggIT09IDEpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ09iamVjdC5jcmVhdGUgc2hpbSBvbmx5IGFjY2VwdHMgb25lIHBhcmFtZXRlci4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIEYucHJvdG90eXBlID0gbztcbiAgICAgICAgICAgIHJldHVybiBuZXcgRigpO1xuICAgICAgICB9O1xuICAgIH0pKCk7XG5cbi8vIENyZWF0ZXMgYSBuZXcgUGFyc2VyRXJyb3Igb2JqZWN0IGZyb20gYW4gZXJyb3JEYXRhIG9iamVjdC4gVGhlIGVycm9yRGF0YVxuLy8gb2JqZWN0IHNob3VsZCBoYXZlIGRlZmF1bHQgY29kZSBhbmQgbWVzc2FnZSBwcm9wZXJ0aWVzLiBUaGUgZGVmYXVsdCBtZXNzYWdlXG4vLyBwcm9wZXJ0eSBjYW4gYmUgb3ZlcnJpZGVuIGJ5IHBhc3NpbmcgaW4gYSBtZXNzYWdlIHBhcmFtZXRlci5cbi8vIFNlZSBQYXJzaW5nRXJyb3IuRXJyb3JzIGJlbG93IGZvciBhY2NlcHRhYmxlIGVycm9ycy5cbmZ1bmN0aW9uIFBhcnNpbmdFcnJvcihlcnJvckRhdGEsIG1lc3NhZ2UpIHtcbiAgICB0aGlzLm5hbWUgPSBcIlBhcnNpbmdFcnJvclwiO1xuICAgIHRoaXMuY29kZSA9IGVycm9yRGF0YS5jb2RlO1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2UgfHwgZXJyb3JEYXRhLm1lc3NhZ2U7XG59XG5QYXJzaW5nRXJyb3IucHJvdG90eXBlID0gX29iakNyZWF0ZShFcnJvci5wcm90b3R5cGUpO1xuUGFyc2luZ0Vycm9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFBhcnNpbmdFcnJvcjtcblxuLy8gUGFyc2luZ0Vycm9yIG1ldGFkYXRhIGZvciBhY2NlcHRhYmxlIFBhcnNpbmdFcnJvcnMuXG5QYXJzaW5nRXJyb3IuRXJyb3JzID0ge1xuICAgIEJhZFNpZ25hdHVyZToge1xuICAgICAgICBjb2RlOiAwLFxuICAgICAgICBtZXNzYWdlOiBcIk1hbGZvcm1lZCBXZWJWVFQgc2lnbmF0dXJlLlwiXG4gICAgfSxcbiAgICBCYWRUaW1lU3RhbXA6IHtcbiAgICAgICAgY29kZTogMSxcbiAgICAgICAgbWVzc2FnZTogXCJNYWxmb3JtZWQgdGltZSBzdGFtcC5cIlxuICAgIH1cbn07XG5cbi8vIFRyeSB0byBwYXJzZSBpbnB1dCBhcyBhIHRpbWUgc3RhbXAuXG5mdW5jdGlvbiBwYXJzZVRpbWVTdGFtcChpbnB1dCkge1xuXG4gICAgZnVuY3Rpb24gY29tcHV0ZVNlY29uZHMoaCwgbSwgcywgZikge1xuICAgICAgICByZXR1cm4gKGggfCAwKSAqIDM2MDAgKyAobSB8IDApICogNjAgKyAocyB8IDApICsgKGYgfCAwKSAvIDEwMDA7XG4gICAgfVxuXG4gICAgdmFyIG0gPSBpbnB1dC5tYXRjaCgvXihcXGQrKTooXFxkezJ9KSg6XFxkezJ9KT9cXC4oXFxkezN9KS8pO1xuICAgIGlmICghbSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAobVszXSkge1xuICAgICAgICAvLyBUaW1lc3RhbXAgdGFrZXMgdGhlIGZvcm0gb2YgW2hvdXJzXTpbbWludXRlc106W3NlY29uZHNdLlttaWxsaXNlY29uZHNdXG4gICAgICAgIHJldHVybiBjb21wdXRlU2Vjb25kcyhtWzFdLCBtWzJdLCBtWzNdLnJlcGxhY2UoXCI6XCIsIFwiXCIpLCBtWzRdKTtcbiAgICB9IGVsc2UgaWYgKG1bMV0gPiA1OSkge1xuICAgICAgICAvLyBUaW1lc3RhbXAgdGFrZXMgdGhlIGZvcm0gb2YgW2hvdXJzXTpbbWludXRlc10uW21pbGxpc2Vjb25kc11cbiAgICAgICAgLy8gRmlyc3QgcG9zaXRpb24gaXMgaG91cnMgYXMgaXQncyBvdmVyIDU5LlxuICAgICAgICByZXR1cm4gY29tcHV0ZVNlY29uZHMobVsxXSwgbVsyXSwgMCwgIG1bNF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFRpbWVzdGFtcCB0YWtlcyB0aGUgZm9ybSBvZiBbbWludXRlc106W3NlY29uZHNdLlttaWxsaXNlY29uZHNdXG4gICAgICAgIHJldHVybiBjb21wdXRlU2Vjb25kcygwLCBtWzFdLCBtWzJdLCBtWzRdKTtcbiAgICB9XG59XG5cbi8vIEEgc2V0dGluZ3Mgb2JqZWN0IGhvbGRzIGtleS92YWx1ZSBwYWlycyBhbmQgd2lsbCBpZ25vcmUgYW55dGhpbmcgYnV0IHRoZSBmaXJzdFxuLy8gYXNzaWdubWVudCB0byBhIHNwZWNpZmljIGtleS5cbmZ1bmN0aW9uIFNldHRpbmdzKCkge1xuICAgIHRoaXMudmFsdWVzID0gX29iakNyZWF0ZShudWxsKTtcbn1cblxuU2V0dGluZ3MucHJvdG90eXBlID0ge1xuICAgIC8vIE9ubHkgYWNjZXB0IHRoZSBmaXJzdCBhc3NpZ25tZW50IHRvIGFueSBrZXkuXG4gICAgc2V0OiBmdW5jdGlvbihrLCB2KSB7XG4gICAgICAgIGlmICghdGhpcy5nZXQoaykgJiYgdiAhPT0gXCJcIikge1xuICAgICAgICAgICAgdGhpcy52YWx1ZXNba10gPSB2O1xuICAgICAgICB9XG4gICAgfSxcbiAgICAvLyBSZXR1cm4gdGhlIHZhbHVlIGZvciBhIGtleSwgb3IgYSBkZWZhdWx0IHZhbHVlLlxuICAgIC8vIElmICdkZWZhdWx0S2V5JyBpcyBwYXNzZWQgdGhlbiAnZGZsdCcgaXMgYXNzdW1lZCB0byBiZSBhbiBvYmplY3Qgd2l0aFxuICAgIC8vIGEgbnVtYmVyIG9mIHBvc3NpYmxlIGRlZmF1bHQgdmFsdWVzIGFzIHByb3BlcnRpZXMgd2hlcmUgJ2RlZmF1bHRLZXknIGlzXG4gICAgLy8gdGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdGhhdCB3aWxsIGJlIGNob3Nlbjsgb3RoZXJ3aXNlIGl0J3MgYXNzdW1lZCB0byBiZVxuICAgIC8vIGEgc2luZ2xlIHZhbHVlLlxuICAgIGdldDogZnVuY3Rpb24oaywgZGZsdCwgZGVmYXVsdEtleSkge1xuICAgICAgICBpZiAoZGVmYXVsdEtleSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFzKGspID8gdGhpcy52YWx1ZXNba10gOiBkZmx0W2RlZmF1bHRLZXldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmhhcyhrKSA/IHRoaXMudmFsdWVzW2tdIDogZGZsdDtcbiAgICB9LFxuICAgIC8vIENoZWNrIHdoZXRoZXIgd2UgaGF2ZSBhIHZhbHVlIGZvciBhIGtleS5cbiAgICBoYXM6IGZ1bmN0aW9uKGspIHtcbiAgICAgICAgcmV0dXJuIGsgaW4gdGhpcy52YWx1ZXM7XG4gICAgfSxcbiAgICAvLyBBY2NlcHQgYSBzZXR0aW5nIGlmIGl0cyBvbmUgb2YgdGhlIGdpdmVuIGFsdGVybmF0aXZlcy5cbiAgICBhbHQ6IGZ1bmN0aW9uKGssIHYsIGEpIHtcbiAgICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCBhLmxlbmd0aDsgKytuKSB7XG4gICAgICAgICAgICBpZiAodiA9PT0gYVtuXSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0KGssIHYpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICAvLyBBY2NlcHQgYSBzZXR0aW5nIGlmIGl0cyBhIHZhbGlkIChzaWduZWQpIGludGVnZXIuXG4gICAgaW50ZWdlcjogZnVuY3Rpb24oaywgdikge1xuICAgICAgICBpZiAoL14tP1xcZCskLy50ZXN0KHYpKSB7IC8vIGludGVnZXJcbiAgICAgICAgICAgIHRoaXMuc2V0KGssIHBhcnNlSW50KHYsIDEwKSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8vIEFjY2VwdCBhIHNldHRpbmcgaWYgaXRzIGEgdmFsaWQgcGVyY2VudGFnZS5cbiAgICBwZXJjZW50OiBmdW5jdGlvbihrLCB2KSB7XG4gICAgICAgIHZhciBtO1xuICAgICAgICBpZiAoKG0gPSB2Lm1hdGNoKC9eKFtcXGRdezEsM30pKFxcLltcXGRdKik/JSQvKSkpIHtcbiAgICAgICAgICAgIHYgPSBwYXJzZUZsb2F0KHYpO1xuICAgICAgICAgICAgaWYgKHYgPj0gMCAmJiB2IDw9IDEwMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0KGssIHYpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59O1xuXG4vLyBIZWxwZXIgZnVuY3Rpb24gdG8gcGFyc2UgaW5wdXQgaW50byBncm91cHMgc2VwYXJhdGVkIGJ5ICdncm91cERlbGltJywgYW5kXG4vLyBpbnRlcnByZXRlIGVhY2ggZ3JvdXAgYXMgYSBrZXkvdmFsdWUgcGFpciBzZXBhcmF0ZWQgYnkgJ2tleVZhbHVlRGVsaW0nLlxuZnVuY3Rpb24gcGFyc2VPcHRpb25zKGlucHV0LCBjYWxsYmFjaywga2V5VmFsdWVEZWxpbSwgZ3JvdXBEZWxpbSkge1xuICAgIHZhciBncm91cHMgPSBncm91cERlbGltID8gaW5wdXQuc3BsaXQoZ3JvdXBEZWxpbSkgOiBbaW5wdXRdO1xuICAgIGZvciAodmFyIGkgaW4gZ3JvdXBzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZ3JvdXBzW2ldICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIga3YgPSBncm91cHNbaV0uc3BsaXQoa2V5VmFsdWVEZWxpbSk7XG4gICAgICAgIGlmIChrdi5sZW5ndGggIT09IDIpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBrID0ga3ZbMF07XG4gICAgICAgIHZhciB2ID0ga3ZbMV07XG4gICAgICAgIGNhbGxiYWNrKGssIHYpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VDdWUoaW5wdXQsIGN1ZSwgcmVnaW9uTGlzdCkge1xuICAgIC8vIFJlbWVtYmVyIHRoZSBvcmlnaW5hbCBpbnB1dCBpZiB3ZSBuZWVkIHRvIHRocm93IGFuIGVycm9yLlxuICAgIHZhciBvSW5wdXQgPSBpbnB1dDtcbiAgICAvLyA0LjEgV2ViVlRUIHRpbWVzdGFtcFxuICAgIGZ1bmN0aW9uIGNvbnN1bWVUaW1lU3RhbXAoKSB7XG4gICAgICAgIHZhciB0cyA9IHBhcnNlVGltZVN0YW1wKGlucHV0KTtcbiAgICAgICAgaWYgKHRzID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2luZ0Vycm9yKFBhcnNpbmdFcnJvci5FcnJvcnMuQmFkVGltZVN0YW1wLFxuICAgICAgICAgICAgICAgIFwiTWFsZm9ybWVkIHRpbWVzdGFtcDogXCIgKyBvSW5wdXQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFJlbW92ZSB0aW1lIHN0YW1wIGZyb20gaW5wdXQuXG4gICAgICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZSgvXlteXFxzYS16QS1aLV0rLywgXCJcIik7XG4gICAgICAgIHJldHVybiB0cztcbiAgICB9XG5cbiAgICAvLyA0LjQuMiBXZWJWVFQgY3VlIHNldHRpbmdzXG4gICAgZnVuY3Rpb24gY29uc3VtZUN1ZVNldHRpbmdzKGlucHV0LCBjdWUpIHtcbiAgICAgICAgdmFyIHNldHRpbmdzID0gbmV3IFNldHRpbmdzKCk7XG5cbiAgICAgICAgcGFyc2VPcHRpb25zKGlucHV0LCBmdW5jdGlvbiAoaywgdikge1xuICAgICAgICAgICAgc3dpdGNoIChrKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcInJlZ2lvblwiOlxuICAgICAgICAgICAgICAgICAgICAvLyBGaW5kIHRoZSBsYXN0IHJlZ2lvbiB3ZSBwYXJzZWQgd2l0aCB0aGUgc2FtZSByZWdpb24gaWQuXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSByZWdpb25MaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVnaW9uTGlzdFtpXS5pZCA9PT0gdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLnNldChrLCByZWdpb25MaXN0W2ldLnJlZ2lvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInZlcnRpY2FsXCI6XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLmFsdChrLCB2LCBbXCJybFwiLCBcImxyXCJdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImxpbmVcIjpcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHMgPSB2LnNwbGl0KFwiLFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHMwID0gdmFsc1swXTtcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuaW50ZWdlcihrLCB2YWxzMCk7XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLnBlcmNlbnQoaywgdmFsczApID8gc2V0dGluZ3Muc2V0KFwic25hcFRvTGluZXNcIiwgZmFsc2UpIDogbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuYWx0KGssIHZhbHMwLCBbXCJhdXRvXCJdKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5hbHQoXCJsaW5lQWxpZ25cIiwgdmFsc1sxXSwgW1wic3RhcnRcIiwgXCJtaWRkbGVcIiwgXCJlbmRcIl0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJwb3NpdGlvblwiOlxuICAgICAgICAgICAgICAgICAgICB2YWxzID0gdi5zcGxpdChcIixcIik7XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLnBlcmNlbnQoaywgdmFsc1swXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWxzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuYWx0KFwicG9zaXRpb25BbGlnblwiLCB2YWxzWzFdLCBbXCJzdGFydFwiLCBcIm1pZGRsZVwiLCBcImVuZFwiXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInNpemVcIjpcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MucGVyY2VudChrLCB2KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImFsaWduXCI6XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLmFsdChrLCB2LCBbXCJzdGFydFwiLCBcIm1pZGRsZVwiLCBcImVuZFwiLCBcImxlZnRcIiwgXCJyaWdodFwiXSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAvOi8sIC9cXHMvKTtcblxuICAgICAgICAvLyBBcHBseSBkZWZhdWx0IHZhbHVlcyBmb3IgYW55IG1pc3NpbmcgZmllbGRzLlxuICAgICAgICBjdWUucmVnaW9uID0gc2V0dGluZ3MuZ2V0KFwicmVnaW9uXCIsIG51bGwpO1xuICAgICAgICBjdWUudmVydGljYWwgPSBzZXR0aW5ncy5nZXQoXCJ2ZXJ0aWNhbFwiLCBcIlwiKTtcbiAgICAgICAgY3VlLmxpbmUgPSBzZXR0aW5ncy5nZXQoXCJsaW5lXCIsIFwiYXV0b1wiKTtcbiAgICAgICAgY3VlLmxpbmVBbGlnbiA9IHNldHRpbmdzLmdldChcImxpbmVBbGlnblwiLCBcInN0YXJ0XCIpO1xuICAgICAgICBjdWUuc25hcFRvTGluZXMgPSBzZXR0aW5ncy5nZXQoXCJzbmFwVG9MaW5lc1wiLCB0cnVlKTtcbiAgICAgICAgY3VlLnNpemUgPSBzZXR0aW5ncy5nZXQoXCJzaXplXCIsIDEwMCk7XG4gICAgICAgIC8vY3VlLmFsaWduID0gc2V0dGluZ3MuZ2V0KFwiYWxpZ25cIiwgXCJtaWRkbGVcIik7XG4gICAgICAgIGN1ZS5wb3NpdGlvbiA9IHNldHRpbmdzLmdldChcInBvc2l0aW9uXCIsIFwiYXV0b1wiKTtcbiAgICAgICAgY3VlLnBvc2l0aW9uQWxpZ24gPSBzZXR0aW5ncy5nZXQoXCJwb3NpdGlvbkFsaWduXCIsIHtcbiAgICAgICAgICAgIHN0YXJ0OiBcInN0YXJ0XCIsXG4gICAgICAgICAgICBsZWZ0OiBcInN0YXJ0XCIsXG4gICAgICAgICAgICBtaWRkbGU6IFwibWlkZGxlXCIsXG4gICAgICAgICAgICBlbmQ6IFwiZW5kXCIsXG4gICAgICAgICAgICByaWdodDogXCJlbmRcIlxuICAgICAgICB9LCBjdWUuYWxpZ24pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNraXBXaGl0ZXNwYWNlKCkge1xuICAgICAgICBpbnB1dCA9IGlucHV0LnJlcGxhY2UoL15cXHMrLywgXCJcIik7XG4gICAgfVxuXG4gICAgLy8gNC4xIFdlYlZUVCBjdWUgdGltaW5ncy5cbiAgICBza2lwV2hpdGVzcGFjZSgpO1xuICAgIGN1ZS5zdGFydFRpbWUgPSBjb25zdW1lVGltZVN0YW1wKCk7ICAgLy8gKDEpIGNvbGxlY3QgY3VlIHN0YXJ0IHRpbWVcbiAgICBza2lwV2hpdGVzcGFjZSgpO1xuICAgIGlmIChpbnB1dC5zdWJzdHIoMCwgMykgIT09IFwiLS0+XCIpIHsgICAgIC8vICgzKSBuZXh0IGNoYXJhY3RlcnMgbXVzdCBtYXRjaCBcIi0tPlwiXG4gICAgICAgIHRocm93IG5ldyBQYXJzaW5nRXJyb3IoUGFyc2luZ0Vycm9yLkVycm9ycy5CYWRUaW1lU3RhbXAsXG4gICAgICAgICAgICBcIk1hbGZvcm1lZCB0aW1lIHN0YW1wICh0aW1lIHN0YW1wcyBtdXN0IGJlIHNlcGFyYXRlZCBieSAnLS0+Jyk6IFwiICtcbiAgICAgICAgICAgIG9JbnB1dCk7XG4gICAgfVxuICAgIGlucHV0ID0gaW5wdXQuc3Vic3RyKDMpO1xuICAgIHNraXBXaGl0ZXNwYWNlKCk7XG4gICAgY3VlLmVuZFRpbWUgPSBjb25zdW1lVGltZVN0YW1wKCk7ICAgICAvLyAoNSkgY29sbGVjdCBjdWUgZW5kIHRpbWVcblxuICAgIC8vIDQuMSBXZWJWVFQgY3VlIHNldHRpbmdzIGxpc3QuXG4gICAgc2tpcFdoaXRlc3BhY2UoKTtcbiAgICBjb25zdW1lQ3VlU2V0dGluZ3MoaW5wdXQsIGN1ZSk7XG59XG5cbnZhciBFU0NBUEUgPSB7XG4gICAgXCImYW1wO1wiOiBcIiZcIixcbiAgICBcIiZsdDtcIjogXCI8XCIsXG4gICAgXCImZ3Q7XCI6IFwiPlwiLFxuICAgIFwiJmxybTtcIjogXCJcXHUyMDBlXCIsXG4gICAgXCImcmxtO1wiOiBcIlxcdTIwMGZcIixcbiAgICBcIiZuYnNwO1wiOiBcIlxcdTAwYTBcIlxufTtcblxudmFyIFRBR19OQU1FID0ge1xuICAgIGM6IFwic3BhblwiLFxuICAgIGk6IFwiaVwiLFxuICAgIGI6IFwiYlwiLFxuICAgIHU6IFwidVwiLFxuICAgIHJ1Ynk6IFwicnVieVwiLFxuICAgIHJ0OiBcInJ0XCIsXG4gICAgdjogXCJzcGFuXCIsXG4gICAgbGFuZzogXCJzcGFuXCJcbn07XG5cbnZhciBUQUdfQU5OT1RBVElPTiA9IHtcbiAgICB2OiBcInRpdGxlXCIsXG4gICAgbGFuZzogXCJsYW5nXCJcbn07XG5cbnZhciBORUVEU19QQVJFTlQgPSB7XG4gICAgcnQ6IFwicnVieVwiXG59O1xuXG4vLyBQYXJzZSBjb250ZW50IGludG8gYSBkb2N1bWVudCBmcmFnbWVudC5cbmZ1bmN0aW9uIHBhcnNlQ29udGVudCh3aW5kb3csIGlucHV0KSB7XG4gICAgZnVuY3Rpb24gbmV4dFRva2VuKCkge1xuICAgICAgICAvLyBDaGVjayBmb3IgZW5kLW9mLXN0cmluZy5cbiAgICAgICAgaWYgKCFpbnB1dCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDb25zdW1lICduJyBjaGFyYWN0ZXJzIGZyb20gdGhlIGlucHV0LlxuICAgICAgICBmdW5jdGlvbiBjb25zdW1lKHJlc3VsdCkge1xuICAgICAgICAgICAgaW5wdXQgPSBpbnB1dC5zdWJzdHIocmVzdWx0Lmxlbmd0aCk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG0gPSBpbnB1dC5tYXRjaCgvXihbXjxdKikoPFtePl0rPj8pPy8pO1xuICAgICAgICAvLyBJZiB0aGVyZSBpcyBzb21lIHRleHQgYmVmb3JlIHRoZSBuZXh0IHRhZywgcmV0dXJuIGl0LCBvdGhlcndpc2UgcmV0dXJuXG4gICAgICAgIC8vIHRoZSB0YWcuXG4gICAgICAgIHJldHVybiBjb25zdW1lKG1bMV0gPyBtWzFdIDogbVsyXSk7XG4gICAgfVxuXG4gICAgLy8gVW5lc2NhcGUgYSBzdHJpbmcgJ3MnLlxuICAgIGZ1bmN0aW9uIHVuZXNjYXBlMShlKSB7XG4gICAgICAgIHJldHVybiBFU0NBUEVbZV07XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVuZXNjYXBlKHMpIHtcbiAgICAgICAgd2hpbGUgKChtID0gcy5tYXRjaCgvJihhbXB8bHR8Z3R8bHJtfHJsbXxuYnNwKTsvKSkpIHtcbiAgICAgICAgICAgIHMgPSBzLnJlcGxhY2UobVswXSwgdW5lc2NhcGUxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzaG91bGRBZGQoY3VycmVudCwgZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gIU5FRURTX1BBUkVOVFtlbGVtZW50LmxvY2FsTmFtZV0gfHxcbiAgICAgICAgICAgIE5FRURTX1BBUkVOVFtlbGVtZW50LmxvY2FsTmFtZV0gPT09IGN1cnJlbnQubG9jYWxOYW1lO1xuICAgIH1cblxuICAgIC8vIENyZWF0ZSBhbiBlbGVtZW50IGZvciB0aGlzIHRhZy5cbiAgICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KHR5cGUsIGFubm90YXRpb24pIHtcbiAgICAgICAgdmFyIHRhZ05hbWUgPSBUQUdfTkFNRVt0eXBlXTtcbiAgICAgICAgaWYgKCF0YWdOYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZWxlbWVudCA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuICAgICAgICBlbGVtZW50LmxvY2FsTmFtZSA9IHRhZ05hbWU7XG4gICAgICAgIHZhciBuYW1lID0gVEFHX0FOTk9UQVRJT05bdHlwZV07XG4gICAgICAgIGlmIChuYW1lICYmIGFubm90YXRpb24pIHtcbiAgICAgICAgICAgIGVsZW1lbnRbbmFtZV0gPSBhbm5vdGF0aW9uLnRyaW0oKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG5cbiAgICB2YXIgcm9vdERpdiA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLFxuICAgICAgICBjdXJyZW50ID0gcm9vdERpdixcbiAgICAgICAgdCxcbiAgICAgICAgdGFnU3RhY2sgPSBbXTtcblxuICAgIHdoaWxlICgodCA9IG5leHRUb2tlbigpKSAhPT0gbnVsbCkge1xuICAgICAgICBpZiAodFswXSA9PT0gJzwnKSB7XG4gICAgICAgICAgICBpZiAodFsxXSA9PT0gXCIvXCIpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgY2xvc2luZyB0YWcgbWF0Y2hlcywgbW92ZSBiYWNrIHVwIHRvIHRoZSBwYXJlbnQgbm9kZS5cbiAgICAgICAgICAgICAgICBpZiAodGFnU3RhY2subGVuZ3RoICYmXG4gICAgICAgICAgICAgICAgICAgIHRhZ1N0YWNrW3RhZ1N0YWNrLmxlbmd0aCAtIDFdID09PSB0LnN1YnN0cigyKS5yZXBsYWNlKFwiPlwiLCBcIlwiKSkge1xuICAgICAgICAgICAgICAgICAgICB0YWdTdGFjay5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQucGFyZW50Tm9kZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIGp1c3QgaWdub3JlIHRoZSBlbmQgdGFnLlxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHRzID0gcGFyc2VUaW1lU3RhbXAodC5zdWJzdHIoMSwgdC5sZW5ndGggLSAyKSk7XG4gICAgICAgICAgICB2YXIgbm9kZTtcbiAgICAgICAgICAgIGlmICh0cykge1xuICAgICAgICAgICAgICAgIC8vIFRpbWVzdGFtcHMgYXJlIGxlYWQgbm9kZXMgYXMgd2VsbC5cbiAgICAgICAgICAgICAgICBub2RlID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZVByb2Nlc3NpbmdJbnN0cnVjdGlvbihcInRpbWVzdGFtcFwiLCB0cyk7XG4gICAgICAgICAgICAgICAgY3VycmVudC5hcHBlbmRDaGlsZChub2RlKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBtID0gdC5tYXRjaCgvXjwoW14uXFxzLzAtOT5dKykoXFwuW15cXHNcXFxcPl0rKT8oW14+XFxcXF0rKT8oXFxcXD8pPj8kLyk7XG4gICAgICAgICAgICAvLyBJZiB3ZSBjYW4ndCBwYXJzZSB0aGUgdGFnLCBza2lwIHRvIHRoZSBuZXh0IHRhZy5cbiAgICAgICAgICAgIGlmICghbSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVHJ5IHRvIGNvbnN0cnVjdCBhbiBlbGVtZW50LCBhbmQgaWdub3JlIHRoZSB0YWcgaWYgd2UgY291bGRuJ3QuXG4gICAgICAgICAgICBub2RlID0gY3JlYXRlRWxlbWVudChtWzFdLCBtWzNdKTtcbiAgICAgICAgICAgIGlmICghbm9kZSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRGV0ZXJtaW5lIGlmIHRoZSB0YWcgc2hvdWxkIGJlIGFkZGVkIGJhc2VkIG9uIHRoZSBjb250ZXh0IG9mIHdoZXJlIGl0XG4gICAgICAgICAgICAvLyBpcyBwbGFjZWQgaW4gdGhlIGN1ZXRleHQuXG4gICAgICAgICAgICBpZiAoIXNob3VsZEFkZChjdXJyZW50LCBub2RlKSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gU2V0IHRoZSBjbGFzcyBsaXN0IChhcyBhIGxpc3Qgb2YgY2xhc3Nlcywgc2VwYXJhdGVkIGJ5IHNwYWNlKS5cbiAgICAgICAgICAgIGlmIChtWzJdKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5jbGFzc05hbWUgPSBtWzJdLnN1YnN0cigxKS5yZXBsYWNlKCcuJywgJyAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEFwcGVuZCB0aGUgbm9kZSB0byB0aGUgY3VycmVudCBub2RlLCBhbmQgZW50ZXIgdGhlIHNjb3BlIG9mIHRoZSBuZXdcbiAgICAgICAgICAgIC8vIG5vZGUuXG4gICAgICAgICAgICB0YWdTdGFjay5wdXNoKG1bMV0pO1xuICAgICAgICAgICAgY3VycmVudC5hcHBlbmRDaGlsZChub2RlKTtcbiAgICAgICAgICAgIGN1cnJlbnQgPSBub2RlO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUZXh0IG5vZGVzIGFyZSBsZWFmIG5vZGVzLlxuICAgICAgICBjdXJyZW50LmFwcGVuZENoaWxkKHdpbmRvdy5kb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh1bmVzY2FwZSh0KSkpO1xuICAgIH1cblxuICAgIHJldHVybiByb290RGl2O1xufVxuXG4vLyBUaGlzIGlzIGEgbGlzdCBvZiBhbGwgdGhlIFVuaWNvZGUgY2hhcmFjdGVycyB0aGF0IGhhdmUgYSBzdHJvbmdcbi8vIHJpZ2h0LXRvLWxlZnQgY2F0ZWdvcnkuIFdoYXQgdGhpcyBtZWFucyBpcyB0aGF0IHRoZXNlIGNoYXJhY3RlcnMgYXJlXG4vLyB3cml0dGVuIHJpZ2h0LXRvLWxlZnQgZm9yIHN1cmUuIEl0IHdhcyBnZW5lcmF0ZWQgYnkgcHVsbGluZyBhbGwgdGhlIHN0cm9uZ1xuLy8gcmlnaHQtdG8tbGVmdCBjaGFyYWN0ZXJzIG91dCBvZiB0aGUgVW5pY29kZSBkYXRhIHRhYmxlLiBUaGF0IHRhYmxlIGNhblxuLy8gZm91bmQgYXQ6IGh0dHA6Ly93d3cudW5pY29kZS5vcmcvUHVibGljL1VOSURBVEEvVW5pY29kZURhdGEudHh0XG52YXIgc3Ryb25nUlRMQ2hhcnMgPSBbMHgwNUJFLCAweDA1QzAsIDB4MDVDMywgMHgwNUM2LCAweDA1RDAsIDB4MDVEMSxcbiAgICAweDA1RDIsIDB4MDVEMywgMHgwNUQ0LCAweDA1RDUsIDB4MDVENiwgMHgwNUQ3LCAweDA1RDgsIDB4MDVEOSwgMHgwNURBLFxuICAgIDB4MDVEQiwgMHgwNURDLCAweDA1REQsIDB4MDVERSwgMHgwNURGLCAweDA1RTAsIDB4MDVFMSwgMHgwNUUyLCAweDA1RTMsXG4gICAgMHgwNUU0LCAweDA1RTUsIDB4MDVFNiwgMHgwNUU3LCAweDA1RTgsIDB4MDVFOSwgMHgwNUVBLCAweDA1RjAsIDB4MDVGMSxcbiAgICAweDA1RjIsIDB4MDVGMywgMHgwNUY0LCAweDA2MDgsIDB4MDYwQiwgMHgwNjBELCAweDA2MUIsIDB4MDYxRSwgMHgwNjFGLFxuICAgIDB4MDYyMCwgMHgwNjIxLCAweDA2MjIsIDB4MDYyMywgMHgwNjI0LCAweDA2MjUsIDB4MDYyNiwgMHgwNjI3LCAweDA2MjgsXG4gICAgMHgwNjI5LCAweDA2MkEsIDB4MDYyQiwgMHgwNjJDLCAweDA2MkQsIDB4MDYyRSwgMHgwNjJGLCAweDA2MzAsIDB4MDYzMSxcbiAgICAweDA2MzIsIDB4MDYzMywgMHgwNjM0LCAweDA2MzUsIDB4MDYzNiwgMHgwNjM3LCAweDA2MzgsIDB4MDYzOSwgMHgwNjNBLFxuICAgIDB4MDYzQiwgMHgwNjNDLCAweDA2M0QsIDB4MDYzRSwgMHgwNjNGLCAweDA2NDAsIDB4MDY0MSwgMHgwNjQyLCAweDA2NDMsXG4gICAgMHgwNjQ0LCAweDA2NDUsIDB4MDY0NiwgMHgwNjQ3LCAweDA2NDgsIDB4MDY0OSwgMHgwNjRBLCAweDA2NkQsIDB4MDY2RSxcbiAgICAweDA2NkYsIDB4MDY3MSwgMHgwNjcyLCAweDA2NzMsIDB4MDY3NCwgMHgwNjc1LCAweDA2NzYsIDB4MDY3NywgMHgwNjc4LFxuICAgIDB4MDY3OSwgMHgwNjdBLCAweDA2N0IsIDB4MDY3QywgMHgwNjdELCAweDA2N0UsIDB4MDY3RiwgMHgwNjgwLCAweDA2ODEsXG4gICAgMHgwNjgyLCAweDA2ODMsIDB4MDY4NCwgMHgwNjg1LCAweDA2ODYsIDB4MDY4NywgMHgwNjg4LCAweDA2ODksIDB4MDY4QSxcbiAgICAweDA2OEIsIDB4MDY4QywgMHgwNjhELCAweDA2OEUsIDB4MDY4RiwgMHgwNjkwLCAweDA2OTEsIDB4MDY5MiwgMHgwNjkzLFxuICAgIDB4MDY5NCwgMHgwNjk1LCAweDA2OTYsIDB4MDY5NywgMHgwNjk4LCAweDA2OTksIDB4MDY5QSwgMHgwNjlCLCAweDA2OUMsXG4gICAgMHgwNjlELCAweDA2OUUsIDB4MDY5RiwgMHgwNkEwLCAweDA2QTEsIDB4MDZBMiwgMHgwNkEzLCAweDA2QTQsIDB4MDZBNSxcbiAgICAweDA2QTYsIDB4MDZBNywgMHgwNkE4LCAweDA2QTksIDB4MDZBQSwgMHgwNkFCLCAweDA2QUMsIDB4MDZBRCwgMHgwNkFFLFxuICAgIDB4MDZBRiwgMHgwNkIwLCAweDA2QjEsIDB4MDZCMiwgMHgwNkIzLCAweDA2QjQsIDB4MDZCNSwgMHgwNkI2LCAweDA2QjcsXG4gICAgMHgwNkI4LCAweDA2QjksIDB4MDZCQSwgMHgwNkJCLCAweDA2QkMsIDB4MDZCRCwgMHgwNkJFLCAweDA2QkYsIDB4MDZDMCxcbiAgICAweDA2QzEsIDB4MDZDMiwgMHgwNkMzLCAweDA2QzQsIDB4MDZDNSwgMHgwNkM2LCAweDA2QzcsIDB4MDZDOCwgMHgwNkM5LFxuICAgIDB4MDZDQSwgMHgwNkNCLCAweDA2Q0MsIDB4MDZDRCwgMHgwNkNFLCAweDA2Q0YsIDB4MDZEMCwgMHgwNkQxLCAweDA2RDIsXG4gICAgMHgwNkQzLCAweDA2RDQsIDB4MDZENSwgMHgwNkU1LCAweDA2RTYsIDB4MDZFRSwgMHgwNkVGLCAweDA2RkEsIDB4MDZGQixcbiAgICAweDA2RkMsIDB4MDZGRCwgMHgwNkZFLCAweDA2RkYsIDB4MDcwMCwgMHgwNzAxLCAweDA3MDIsIDB4MDcwMywgMHgwNzA0LFxuICAgIDB4MDcwNSwgMHgwNzA2LCAweDA3MDcsIDB4MDcwOCwgMHgwNzA5LCAweDA3MEEsIDB4MDcwQiwgMHgwNzBDLCAweDA3MEQsXG4gICAgMHgwNzBGLCAweDA3MTAsIDB4MDcxMiwgMHgwNzEzLCAweDA3MTQsIDB4MDcxNSwgMHgwNzE2LCAweDA3MTcsIDB4MDcxOCxcbiAgICAweDA3MTksIDB4MDcxQSwgMHgwNzFCLCAweDA3MUMsIDB4MDcxRCwgMHgwNzFFLCAweDA3MUYsIDB4MDcyMCwgMHgwNzIxLFxuICAgIDB4MDcyMiwgMHgwNzIzLCAweDA3MjQsIDB4MDcyNSwgMHgwNzI2LCAweDA3MjcsIDB4MDcyOCwgMHgwNzI5LCAweDA3MkEsXG4gICAgMHgwNzJCLCAweDA3MkMsIDB4MDcyRCwgMHgwNzJFLCAweDA3MkYsIDB4MDc0RCwgMHgwNzRFLCAweDA3NEYsIDB4MDc1MCxcbiAgICAweDA3NTEsIDB4MDc1MiwgMHgwNzUzLCAweDA3NTQsIDB4MDc1NSwgMHgwNzU2LCAweDA3NTcsIDB4MDc1OCwgMHgwNzU5LFxuICAgIDB4MDc1QSwgMHgwNzVCLCAweDA3NUMsIDB4MDc1RCwgMHgwNzVFLCAweDA3NUYsIDB4MDc2MCwgMHgwNzYxLCAweDA3NjIsXG4gICAgMHgwNzYzLCAweDA3NjQsIDB4MDc2NSwgMHgwNzY2LCAweDA3NjcsIDB4MDc2OCwgMHgwNzY5LCAweDA3NkEsIDB4MDc2QixcbiAgICAweDA3NkMsIDB4MDc2RCwgMHgwNzZFLCAweDA3NkYsIDB4MDc3MCwgMHgwNzcxLCAweDA3NzIsIDB4MDc3MywgMHgwNzc0LFxuICAgIDB4MDc3NSwgMHgwNzc2LCAweDA3NzcsIDB4MDc3OCwgMHgwNzc5LCAweDA3N0EsIDB4MDc3QiwgMHgwNzdDLCAweDA3N0QsXG4gICAgMHgwNzdFLCAweDA3N0YsIDB4MDc4MCwgMHgwNzgxLCAweDA3ODIsIDB4MDc4MywgMHgwNzg0LCAweDA3ODUsIDB4MDc4NixcbiAgICAweDA3ODcsIDB4MDc4OCwgMHgwNzg5LCAweDA3OEEsIDB4MDc4QiwgMHgwNzhDLCAweDA3OEQsIDB4MDc4RSwgMHgwNzhGLFxuICAgIDB4MDc5MCwgMHgwNzkxLCAweDA3OTIsIDB4MDc5MywgMHgwNzk0LCAweDA3OTUsIDB4MDc5NiwgMHgwNzk3LCAweDA3OTgsXG4gICAgMHgwNzk5LCAweDA3OUEsIDB4MDc5QiwgMHgwNzlDLCAweDA3OUQsIDB4MDc5RSwgMHgwNzlGLCAweDA3QTAsIDB4MDdBMSxcbiAgICAweDA3QTIsIDB4MDdBMywgMHgwN0E0LCAweDA3QTUsIDB4MDdCMSwgMHgwN0MwLCAweDA3QzEsIDB4MDdDMiwgMHgwN0MzLFxuICAgIDB4MDdDNCwgMHgwN0M1LCAweDA3QzYsIDB4MDdDNywgMHgwN0M4LCAweDA3QzksIDB4MDdDQSwgMHgwN0NCLCAweDA3Q0MsXG4gICAgMHgwN0NELCAweDA3Q0UsIDB4MDdDRiwgMHgwN0QwLCAweDA3RDEsIDB4MDdEMiwgMHgwN0QzLCAweDA3RDQsIDB4MDdENSxcbiAgICAweDA3RDYsIDB4MDdENywgMHgwN0Q4LCAweDA3RDksIDB4MDdEQSwgMHgwN0RCLCAweDA3REMsIDB4MDdERCwgMHgwN0RFLFxuICAgIDB4MDdERiwgMHgwN0UwLCAweDA3RTEsIDB4MDdFMiwgMHgwN0UzLCAweDA3RTQsIDB4MDdFNSwgMHgwN0U2LCAweDA3RTcsXG4gICAgMHgwN0U4LCAweDA3RTksIDB4MDdFQSwgMHgwN0Y0LCAweDA3RjUsIDB4MDdGQSwgMHgwODAwLCAweDA4MDEsIDB4MDgwMixcbiAgICAweDA4MDMsIDB4MDgwNCwgMHgwODA1LCAweDA4MDYsIDB4MDgwNywgMHgwODA4LCAweDA4MDksIDB4MDgwQSwgMHgwODBCLFxuICAgIDB4MDgwQywgMHgwODBELCAweDA4MEUsIDB4MDgwRiwgMHgwODEwLCAweDA4MTEsIDB4MDgxMiwgMHgwODEzLCAweDA4MTQsXG4gICAgMHgwODE1LCAweDA4MUEsIDB4MDgyNCwgMHgwODI4LCAweDA4MzAsIDB4MDgzMSwgMHgwODMyLCAweDA4MzMsIDB4MDgzNCxcbiAgICAweDA4MzUsIDB4MDgzNiwgMHgwODM3LCAweDA4MzgsIDB4MDgzOSwgMHgwODNBLCAweDA4M0IsIDB4MDgzQywgMHgwODNELFxuICAgIDB4MDgzRSwgMHgwODQwLCAweDA4NDEsIDB4MDg0MiwgMHgwODQzLCAweDA4NDQsIDB4MDg0NSwgMHgwODQ2LCAweDA4NDcsXG4gICAgMHgwODQ4LCAweDA4NDksIDB4MDg0QSwgMHgwODRCLCAweDA4NEMsIDB4MDg0RCwgMHgwODRFLCAweDA4NEYsIDB4MDg1MCxcbiAgICAweDA4NTEsIDB4MDg1MiwgMHgwODUzLCAweDA4NTQsIDB4MDg1NSwgMHgwODU2LCAweDA4NTcsIDB4MDg1OCwgMHgwODVFLFxuICAgIDB4MDhBMCwgMHgwOEEyLCAweDA4QTMsIDB4MDhBNCwgMHgwOEE1LCAweDA4QTYsIDB4MDhBNywgMHgwOEE4LCAweDA4QTksXG4gICAgMHgwOEFBLCAweDA4QUIsIDB4MDhBQywgMHgyMDBGLCAweEZCMUQsIDB4RkIxRiwgMHhGQjIwLCAweEZCMjEsIDB4RkIyMixcbiAgICAweEZCMjMsIDB4RkIyNCwgMHhGQjI1LCAweEZCMjYsIDB4RkIyNywgMHhGQjI4LCAweEZCMkEsIDB4RkIyQiwgMHhGQjJDLFxuICAgIDB4RkIyRCwgMHhGQjJFLCAweEZCMkYsIDB4RkIzMCwgMHhGQjMxLCAweEZCMzIsIDB4RkIzMywgMHhGQjM0LCAweEZCMzUsXG4gICAgMHhGQjM2LCAweEZCMzgsIDB4RkIzOSwgMHhGQjNBLCAweEZCM0IsIDB4RkIzQywgMHhGQjNFLCAweEZCNDAsIDB4RkI0MSxcbiAgICAweEZCNDMsIDB4RkI0NCwgMHhGQjQ2LCAweEZCNDcsIDB4RkI0OCwgMHhGQjQ5LCAweEZCNEEsIDB4RkI0QiwgMHhGQjRDLFxuICAgIDB4RkI0RCwgMHhGQjRFLCAweEZCNEYsIDB4RkI1MCwgMHhGQjUxLCAweEZCNTIsIDB4RkI1MywgMHhGQjU0LCAweEZCNTUsXG4gICAgMHhGQjU2LCAweEZCNTcsIDB4RkI1OCwgMHhGQjU5LCAweEZCNUEsIDB4RkI1QiwgMHhGQjVDLCAweEZCNUQsIDB4RkI1RSxcbiAgICAweEZCNUYsIDB4RkI2MCwgMHhGQjYxLCAweEZCNjIsIDB4RkI2MywgMHhGQjY0LCAweEZCNjUsIDB4RkI2NiwgMHhGQjY3LFxuICAgIDB4RkI2OCwgMHhGQjY5LCAweEZCNkEsIDB4RkI2QiwgMHhGQjZDLCAweEZCNkQsIDB4RkI2RSwgMHhGQjZGLCAweEZCNzAsXG4gICAgMHhGQjcxLCAweEZCNzIsIDB4RkI3MywgMHhGQjc0LCAweEZCNzUsIDB4RkI3NiwgMHhGQjc3LCAweEZCNzgsIDB4RkI3OSxcbiAgICAweEZCN0EsIDB4RkI3QiwgMHhGQjdDLCAweEZCN0QsIDB4RkI3RSwgMHhGQjdGLCAweEZCODAsIDB4RkI4MSwgMHhGQjgyLFxuICAgIDB4RkI4MywgMHhGQjg0LCAweEZCODUsIDB4RkI4NiwgMHhGQjg3LCAweEZCODgsIDB4RkI4OSwgMHhGQjhBLCAweEZCOEIsXG4gICAgMHhGQjhDLCAweEZCOEQsIDB4RkI4RSwgMHhGQjhGLCAweEZCOTAsIDB4RkI5MSwgMHhGQjkyLCAweEZCOTMsIDB4RkI5NCxcbiAgICAweEZCOTUsIDB4RkI5NiwgMHhGQjk3LCAweEZCOTgsIDB4RkI5OSwgMHhGQjlBLCAweEZCOUIsIDB4RkI5QywgMHhGQjlELFxuICAgIDB4RkI5RSwgMHhGQjlGLCAweEZCQTAsIDB4RkJBMSwgMHhGQkEyLCAweEZCQTMsIDB4RkJBNCwgMHhGQkE1LCAweEZCQTYsXG4gICAgMHhGQkE3LCAweEZCQTgsIDB4RkJBOSwgMHhGQkFBLCAweEZCQUIsIDB4RkJBQywgMHhGQkFELCAweEZCQUUsIDB4RkJBRixcbiAgICAweEZCQjAsIDB4RkJCMSwgMHhGQkIyLCAweEZCQjMsIDB4RkJCNCwgMHhGQkI1LCAweEZCQjYsIDB4RkJCNywgMHhGQkI4LFxuICAgIDB4RkJCOSwgMHhGQkJBLCAweEZCQkIsIDB4RkJCQywgMHhGQkJELCAweEZCQkUsIDB4RkJCRiwgMHhGQkMwLCAweEZCQzEsXG4gICAgMHhGQkQzLCAweEZCRDQsIDB4RkJENSwgMHhGQkQ2LCAweEZCRDcsIDB4RkJEOCwgMHhGQkQ5LCAweEZCREEsIDB4RkJEQixcbiAgICAweEZCREMsIDB4RkJERCwgMHhGQkRFLCAweEZCREYsIDB4RkJFMCwgMHhGQkUxLCAweEZCRTIsIDB4RkJFMywgMHhGQkU0LFxuICAgIDB4RkJFNSwgMHhGQkU2LCAweEZCRTcsIDB4RkJFOCwgMHhGQkU5LCAweEZCRUEsIDB4RkJFQiwgMHhGQkVDLCAweEZCRUQsXG4gICAgMHhGQkVFLCAweEZCRUYsIDB4RkJGMCwgMHhGQkYxLCAweEZCRjIsIDB4RkJGMywgMHhGQkY0LCAweEZCRjUsIDB4RkJGNixcbiAgICAweEZCRjcsIDB4RkJGOCwgMHhGQkY5LCAweEZCRkEsIDB4RkJGQiwgMHhGQkZDLCAweEZCRkQsIDB4RkJGRSwgMHhGQkZGLFxuICAgIDB4RkMwMCwgMHhGQzAxLCAweEZDMDIsIDB4RkMwMywgMHhGQzA0LCAweEZDMDUsIDB4RkMwNiwgMHhGQzA3LCAweEZDMDgsXG4gICAgMHhGQzA5LCAweEZDMEEsIDB4RkMwQiwgMHhGQzBDLCAweEZDMEQsIDB4RkMwRSwgMHhGQzBGLCAweEZDMTAsIDB4RkMxMSxcbiAgICAweEZDMTIsIDB4RkMxMywgMHhGQzE0LCAweEZDMTUsIDB4RkMxNiwgMHhGQzE3LCAweEZDMTgsIDB4RkMxOSwgMHhGQzFBLFxuICAgIDB4RkMxQiwgMHhGQzFDLCAweEZDMUQsIDB4RkMxRSwgMHhGQzFGLCAweEZDMjAsIDB4RkMyMSwgMHhGQzIyLCAweEZDMjMsXG4gICAgMHhGQzI0LCAweEZDMjUsIDB4RkMyNiwgMHhGQzI3LCAweEZDMjgsIDB4RkMyOSwgMHhGQzJBLCAweEZDMkIsIDB4RkMyQyxcbiAgICAweEZDMkQsIDB4RkMyRSwgMHhGQzJGLCAweEZDMzAsIDB4RkMzMSwgMHhGQzMyLCAweEZDMzMsIDB4RkMzNCwgMHhGQzM1LFxuICAgIDB4RkMzNiwgMHhGQzM3LCAweEZDMzgsIDB4RkMzOSwgMHhGQzNBLCAweEZDM0IsIDB4RkMzQywgMHhGQzNELCAweEZDM0UsXG4gICAgMHhGQzNGLCAweEZDNDAsIDB4RkM0MSwgMHhGQzQyLCAweEZDNDMsIDB4RkM0NCwgMHhGQzQ1LCAweEZDNDYsIDB4RkM0NyxcbiAgICAweEZDNDgsIDB4RkM0OSwgMHhGQzRBLCAweEZDNEIsIDB4RkM0QywgMHhGQzRELCAweEZDNEUsIDB4RkM0RiwgMHhGQzUwLFxuICAgIDB4RkM1MSwgMHhGQzUyLCAweEZDNTMsIDB4RkM1NCwgMHhGQzU1LCAweEZDNTYsIDB4RkM1NywgMHhGQzU4LCAweEZDNTksXG4gICAgMHhGQzVBLCAweEZDNUIsIDB4RkM1QywgMHhGQzVELCAweEZDNUUsIDB4RkM1RiwgMHhGQzYwLCAweEZDNjEsIDB4RkM2MixcbiAgICAweEZDNjMsIDB4RkM2NCwgMHhGQzY1LCAweEZDNjYsIDB4RkM2NywgMHhGQzY4LCAweEZDNjksIDB4RkM2QSwgMHhGQzZCLFxuICAgIDB4RkM2QywgMHhGQzZELCAweEZDNkUsIDB4RkM2RiwgMHhGQzcwLCAweEZDNzEsIDB4RkM3MiwgMHhGQzczLCAweEZDNzQsXG4gICAgMHhGQzc1LCAweEZDNzYsIDB4RkM3NywgMHhGQzc4LCAweEZDNzksIDB4RkM3QSwgMHhGQzdCLCAweEZDN0MsIDB4RkM3RCxcbiAgICAweEZDN0UsIDB4RkM3RiwgMHhGQzgwLCAweEZDODEsIDB4RkM4MiwgMHhGQzgzLCAweEZDODQsIDB4RkM4NSwgMHhGQzg2LFxuICAgIDB4RkM4NywgMHhGQzg4LCAweEZDODksIDB4RkM4QSwgMHhGQzhCLCAweEZDOEMsIDB4RkM4RCwgMHhGQzhFLCAweEZDOEYsXG4gICAgMHhGQzkwLCAweEZDOTEsIDB4RkM5MiwgMHhGQzkzLCAweEZDOTQsIDB4RkM5NSwgMHhGQzk2LCAweEZDOTcsIDB4RkM5OCxcbiAgICAweEZDOTksIDB4RkM5QSwgMHhGQzlCLCAweEZDOUMsIDB4RkM5RCwgMHhGQzlFLCAweEZDOUYsIDB4RkNBMCwgMHhGQ0ExLFxuICAgIDB4RkNBMiwgMHhGQ0EzLCAweEZDQTQsIDB4RkNBNSwgMHhGQ0E2LCAweEZDQTcsIDB4RkNBOCwgMHhGQ0E5LCAweEZDQUEsXG4gICAgMHhGQ0FCLCAweEZDQUMsIDB4RkNBRCwgMHhGQ0FFLCAweEZDQUYsIDB4RkNCMCwgMHhGQ0IxLCAweEZDQjIsIDB4RkNCMyxcbiAgICAweEZDQjQsIDB4RkNCNSwgMHhGQ0I2LCAweEZDQjcsIDB4RkNCOCwgMHhGQ0I5LCAweEZDQkEsIDB4RkNCQiwgMHhGQ0JDLFxuICAgIDB4RkNCRCwgMHhGQ0JFLCAweEZDQkYsIDB4RkNDMCwgMHhGQ0MxLCAweEZDQzIsIDB4RkNDMywgMHhGQ0M0LCAweEZDQzUsXG4gICAgMHhGQ0M2LCAweEZDQzcsIDB4RkNDOCwgMHhGQ0M5LCAweEZDQ0EsIDB4RkNDQiwgMHhGQ0NDLCAweEZDQ0QsIDB4RkNDRSxcbiAgICAweEZDQ0YsIDB4RkNEMCwgMHhGQ0QxLCAweEZDRDIsIDB4RkNEMywgMHhGQ0Q0LCAweEZDRDUsIDB4RkNENiwgMHhGQ0Q3LFxuICAgIDB4RkNEOCwgMHhGQ0Q5LCAweEZDREEsIDB4RkNEQiwgMHhGQ0RDLCAweEZDREQsIDB4RkNERSwgMHhGQ0RGLCAweEZDRTAsXG4gICAgMHhGQ0UxLCAweEZDRTIsIDB4RkNFMywgMHhGQ0U0LCAweEZDRTUsIDB4RkNFNiwgMHhGQ0U3LCAweEZDRTgsIDB4RkNFOSxcbiAgICAweEZDRUEsIDB4RkNFQiwgMHhGQ0VDLCAweEZDRUQsIDB4RkNFRSwgMHhGQ0VGLCAweEZDRjAsIDB4RkNGMSwgMHhGQ0YyLFxuICAgIDB4RkNGMywgMHhGQ0Y0LCAweEZDRjUsIDB4RkNGNiwgMHhGQ0Y3LCAweEZDRjgsIDB4RkNGOSwgMHhGQ0ZBLCAweEZDRkIsXG4gICAgMHhGQ0ZDLCAweEZDRkQsIDB4RkNGRSwgMHhGQ0ZGLCAweEZEMDAsIDB4RkQwMSwgMHhGRDAyLCAweEZEMDMsIDB4RkQwNCxcbiAgICAweEZEMDUsIDB4RkQwNiwgMHhGRDA3LCAweEZEMDgsIDB4RkQwOSwgMHhGRDBBLCAweEZEMEIsIDB4RkQwQywgMHhGRDBELFxuICAgIDB4RkQwRSwgMHhGRDBGLCAweEZEMTAsIDB4RkQxMSwgMHhGRDEyLCAweEZEMTMsIDB4RkQxNCwgMHhGRDE1LCAweEZEMTYsXG4gICAgMHhGRDE3LCAweEZEMTgsIDB4RkQxOSwgMHhGRDFBLCAweEZEMUIsIDB4RkQxQywgMHhGRDFELCAweEZEMUUsIDB4RkQxRixcbiAgICAweEZEMjAsIDB4RkQyMSwgMHhGRDIyLCAweEZEMjMsIDB4RkQyNCwgMHhGRDI1LCAweEZEMjYsIDB4RkQyNywgMHhGRDI4LFxuICAgIDB4RkQyOSwgMHhGRDJBLCAweEZEMkIsIDB4RkQyQywgMHhGRDJELCAweEZEMkUsIDB4RkQyRiwgMHhGRDMwLCAweEZEMzEsXG4gICAgMHhGRDMyLCAweEZEMzMsIDB4RkQzNCwgMHhGRDM1LCAweEZEMzYsIDB4RkQzNywgMHhGRDM4LCAweEZEMzksIDB4RkQzQSxcbiAgICAweEZEM0IsIDB4RkQzQywgMHhGRDNELCAweEZENTAsIDB4RkQ1MSwgMHhGRDUyLCAweEZENTMsIDB4RkQ1NCwgMHhGRDU1LFxuICAgIDB4RkQ1NiwgMHhGRDU3LCAweEZENTgsIDB4RkQ1OSwgMHhGRDVBLCAweEZENUIsIDB4RkQ1QywgMHhGRDVELCAweEZENUUsXG4gICAgMHhGRDVGLCAweEZENjAsIDB4RkQ2MSwgMHhGRDYyLCAweEZENjMsIDB4RkQ2NCwgMHhGRDY1LCAweEZENjYsIDB4RkQ2NyxcbiAgICAweEZENjgsIDB4RkQ2OSwgMHhGRDZBLCAweEZENkIsIDB4RkQ2QywgMHhGRDZELCAweEZENkUsIDB4RkQ2RiwgMHhGRDcwLFxuICAgIDB4RkQ3MSwgMHhGRDcyLCAweEZENzMsIDB4RkQ3NCwgMHhGRDc1LCAweEZENzYsIDB4RkQ3NywgMHhGRDc4LCAweEZENzksXG4gICAgMHhGRDdBLCAweEZEN0IsIDB4RkQ3QywgMHhGRDdELCAweEZEN0UsIDB4RkQ3RiwgMHhGRDgwLCAweEZEODEsIDB4RkQ4MixcbiAgICAweEZEODMsIDB4RkQ4NCwgMHhGRDg1LCAweEZEODYsIDB4RkQ4NywgMHhGRDg4LCAweEZEODksIDB4RkQ4QSwgMHhGRDhCLFxuICAgIDB4RkQ4QywgMHhGRDhELCAweEZEOEUsIDB4RkQ4RiwgMHhGRDkyLCAweEZEOTMsIDB4RkQ5NCwgMHhGRDk1LCAweEZEOTYsXG4gICAgMHhGRDk3LCAweEZEOTgsIDB4RkQ5OSwgMHhGRDlBLCAweEZEOUIsIDB4RkQ5QywgMHhGRDlELCAweEZEOUUsIDB4RkQ5RixcbiAgICAweEZEQTAsIDB4RkRBMSwgMHhGREEyLCAweEZEQTMsIDB4RkRBNCwgMHhGREE1LCAweEZEQTYsIDB4RkRBNywgMHhGREE4LFxuICAgIDB4RkRBOSwgMHhGREFBLCAweEZEQUIsIDB4RkRBQywgMHhGREFELCAweEZEQUUsIDB4RkRBRiwgMHhGREIwLCAweEZEQjEsXG4gICAgMHhGREIyLCAweEZEQjMsIDB4RkRCNCwgMHhGREI1LCAweEZEQjYsIDB4RkRCNywgMHhGREI4LCAweEZEQjksIDB4RkRCQSxcbiAgICAweEZEQkIsIDB4RkRCQywgMHhGREJELCAweEZEQkUsIDB4RkRCRiwgMHhGREMwLCAweEZEQzEsIDB4RkRDMiwgMHhGREMzLFxuICAgIDB4RkRDNCwgMHhGREM1LCAweEZEQzYsIDB4RkRDNywgMHhGREYwLCAweEZERjEsIDB4RkRGMiwgMHhGREYzLCAweEZERjQsXG4gICAgMHhGREY1LCAweEZERjYsIDB4RkRGNywgMHhGREY4LCAweEZERjksIDB4RkRGQSwgMHhGREZCLCAweEZERkMsIDB4RkU3MCxcbiAgICAweEZFNzEsIDB4RkU3MiwgMHhGRTczLCAweEZFNzQsIDB4RkU3NiwgMHhGRTc3LCAweEZFNzgsIDB4RkU3OSwgMHhGRTdBLFxuICAgIDB4RkU3QiwgMHhGRTdDLCAweEZFN0QsIDB4RkU3RSwgMHhGRTdGLCAweEZFODAsIDB4RkU4MSwgMHhGRTgyLCAweEZFODMsXG4gICAgMHhGRTg0LCAweEZFODUsIDB4RkU4NiwgMHhGRTg3LCAweEZFODgsIDB4RkU4OSwgMHhGRThBLCAweEZFOEIsIDB4RkU4QyxcbiAgICAweEZFOEQsIDB4RkU4RSwgMHhGRThGLCAweEZFOTAsIDB4RkU5MSwgMHhGRTkyLCAweEZFOTMsIDB4RkU5NCwgMHhGRTk1LFxuICAgIDB4RkU5NiwgMHhGRTk3LCAweEZFOTgsIDB4RkU5OSwgMHhGRTlBLCAweEZFOUIsIDB4RkU5QywgMHhGRTlELCAweEZFOUUsXG4gICAgMHhGRTlGLCAweEZFQTAsIDB4RkVBMSwgMHhGRUEyLCAweEZFQTMsIDB4RkVBNCwgMHhGRUE1LCAweEZFQTYsIDB4RkVBNyxcbiAgICAweEZFQTgsIDB4RkVBOSwgMHhGRUFBLCAweEZFQUIsIDB4RkVBQywgMHhGRUFELCAweEZFQUUsIDB4RkVBRiwgMHhGRUIwLFxuICAgIDB4RkVCMSwgMHhGRUIyLCAweEZFQjMsIDB4RkVCNCwgMHhGRUI1LCAweEZFQjYsIDB4RkVCNywgMHhGRUI4LCAweEZFQjksXG4gICAgMHhGRUJBLCAweEZFQkIsIDB4RkVCQywgMHhGRUJELCAweEZFQkUsIDB4RkVCRiwgMHhGRUMwLCAweEZFQzEsIDB4RkVDMixcbiAgICAweEZFQzMsIDB4RkVDNCwgMHhGRUM1LCAweEZFQzYsIDB4RkVDNywgMHhGRUM4LCAweEZFQzksIDB4RkVDQSwgMHhGRUNCLFxuICAgIDB4RkVDQywgMHhGRUNELCAweEZFQ0UsIDB4RkVDRiwgMHhGRUQwLCAweEZFRDEsIDB4RkVEMiwgMHhGRUQzLCAweEZFRDQsXG4gICAgMHhGRUQ1LCAweEZFRDYsIDB4RkVENywgMHhGRUQ4LCAweEZFRDksIDB4RkVEQSwgMHhGRURCLCAweEZFREMsIDB4RkVERCxcbiAgICAweEZFREUsIDB4RkVERiwgMHhGRUUwLCAweEZFRTEsIDB4RkVFMiwgMHhGRUUzLCAweEZFRTQsIDB4RkVFNSwgMHhGRUU2LFxuICAgIDB4RkVFNywgMHhGRUU4LCAweEZFRTksIDB4RkVFQSwgMHhGRUVCLCAweEZFRUMsIDB4RkVFRCwgMHhGRUVFLCAweEZFRUYsXG4gICAgMHhGRUYwLCAweEZFRjEsIDB4RkVGMiwgMHhGRUYzLCAweEZFRjQsIDB4RkVGNSwgMHhGRUY2LCAweEZFRjcsIDB4RkVGOCxcbiAgICAweEZFRjksIDB4RkVGQSwgMHhGRUZCLCAweEZFRkMsIDB4MTA4MDAsIDB4MTA4MDEsIDB4MTA4MDIsIDB4MTA4MDMsXG4gICAgMHgxMDgwNCwgMHgxMDgwNSwgMHgxMDgwOCwgMHgxMDgwQSwgMHgxMDgwQiwgMHgxMDgwQywgMHgxMDgwRCwgMHgxMDgwRSxcbiAgICAweDEwODBGLCAweDEwODEwLCAweDEwODExLCAweDEwODEyLCAweDEwODEzLCAweDEwODE0LCAweDEwODE1LCAweDEwODE2LFxuICAgIDB4MTA4MTcsIDB4MTA4MTgsIDB4MTA4MTksIDB4MTA4MUEsIDB4MTA4MUIsIDB4MTA4MUMsIDB4MTA4MUQsIDB4MTA4MUUsXG4gICAgMHgxMDgxRiwgMHgxMDgyMCwgMHgxMDgyMSwgMHgxMDgyMiwgMHgxMDgyMywgMHgxMDgyNCwgMHgxMDgyNSwgMHgxMDgyNixcbiAgICAweDEwODI3LCAweDEwODI4LCAweDEwODI5LCAweDEwODJBLCAweDEwODJCLCAweDEwODJDLCAweDEwODJELCAweDEwODJFLFxuICAgIDB4MTA4MkYsIDB4MTA4MzAsIDB4MTA4MzEsIDB4MTA4MzIsIDB4MTA4MzMsIDB4MTA4MzQsIDB4MTA4MzUsIDB4MTA4MzcsXG4gICAgMHgxMDgzOCwgMHgxMDgzQywgMHgxMDgzRiwgMHgxMDg0MCwgMHgxMDg0MSwgMHgxMDg0MiwgMHgxMDg0MywgMHgxMDg0NCxcbiAgICAweDEwODQ1LCAweDEwODQ2LCAweDEwODQ3LCAweDEwODQ4LCAweDEwODQ5LCAweDEwODRBLCAweDEwODRCLCAweDEwODRDLFxuICAgIDB4MTA4NEQsIDB4MTA4NEUsIDB4MTA4NEYsIDB4MTA4NTAsIDB4MTA4NTEsIDB4MTA4NTIsIDB4MTA4NTMsIDB4MTA4NTQsXG4gICAgMHgxMDg1NSwgMHgxMDg1NywgMHgxMDg1OCwgMHgxMDg1OSwgMHgxMDg1QSwgMHgxMDg1QiwgMHgxMDg1QywgMHgxMDg1RCxcbiAgICAweDEwODVFLCAweDEwODVGLCAweDEwOTAwLCAweDEwOTAxLCAweDEwOTAyLCAweDEwOTAzLCAweDEwOTA0LCAweDEwOTA1LFxuICAgIDB4MTA5MDYsIDB4MTA5MDcsIDB4MTA5MDgsIDB4MTA5MDksIDB4MTA5MEEsIDB4MTA5MEIsIDB4MTA5MEMsIDB4MTA5MEQsXG4gICAgMHgxMDkwRSwgMHgxMDkwRiwgMHgxMDkxMCwgMHgxMDkxMSwgMHgxMDkxMiwgMHgxMDkxMywgMHgxMDkxNCwgMHgxMDkxNSxcbiAgICAweDEwOTE2LCAweDEwOTE3LCAweDEwOTE4LCAweDEwOTE5LCAweDEwOTFBLCAweDEwOTFCLCAweDEwOTIwLCAweDEwOTIxLFxuICAgIDB4MTA5MjIsIDB4MTA5MjMsIDB4MTA5MjQsIDB4MTA5MjUsIDB4MTA5MjYsIDB4MTA5MjcsIDB4MTA5MjgsIDB4MTA5MjksXG4gICAgMHgxMDkyQSwgMHgxMDkyQiwgMHgxMDkyQywgMHgxMDkyRCwgMHgxMDkyRSwgMHgxMDkyRiwgMHgxMDkzMCwgMHgxMDkzMSxcbiAgICAweDEwOTMyLCAweDEwOTMzLCAweDEwOTM0LCAweDEwOTM1LCAweDEwOTM2LCAweDEwOTM3LCAweDEwOTM4LCAweDEwOTM5LFxuICAgIDB4MTA5M0YsIDB4MTA5ODAsIDB4MTA5ODEsIDB4MTA5ODIsIDB4MTA5ODMsIDB4MTA5ODQsIDB4MTA5ODUsIDB4MTA5ODYsXG4gICAgMHgxMDk4NywgMHgxMDk4OCwgMHgxMDk4OSwgMHgxMDk4QSwgMHgxMDk4QiwgMHgxMDk4QywgMHgxMDk4RCwgMHgxMDk4RSxcbiAgICAweDEwOThGLCAweDEwOTkwLCAweDEwOTkxLCAweDEwOTkyLCAweDEwOTkzLCAweDEwOTk0LCAweDEwOTk1LCAweDEwOTk2LFxuICAgIDB4MTA5OTcsIDB4MTA5OTgsIDB4MTA5OTksIDB4MTA5OUEsIDB4MTA5OUIsIDB4MTA5OUMsIDB4MTA5OUQsIDB4MTA5OUUsXG4gICAgMHgxMDk5RiwgMHgxMDlBMCwgMHgxMDlBMSwgMHgxMDlBMiwgMHgxMDlBMywgMHgxMDlBNCwgMHgxMDlBNSwgMHgxMDlBNixcbiAgICAweDEwOUE3LCAweDEwOUE4LCAweDEwOUE5LCAweDEwOUFBLCAweDEwOUFCLCAweDEwOUFDLCAweDEwOUFELCAweDEwOUFFLFxuICAgIDB4MTA5QUYsIDB4MTA5QjAsIDB4MTA5QjEsIDB4MTA5QjIsIDB4MTA5QjMsIDB4MTA5QjQsIDB4MTA5QjUsIDB4MTA5QjYsXG4gICAgMHgxMDlCNywgMHgxMDlCRSwgMHgxMDlCRiwgMHgxMEEwMCwgMHgxMEExMCwgMHgxMEExMSwgMHgxMEExMiwgMHgxMEExMyxcbiAgICAweDEwQTE1LCAweDEwQTE2LCAweDEwQTE3LCAweDEwQTE5LCAweDEwQTFBLCAweDEwQTFCLCAweDEwQTFDLCAweDEwQTFELFxuICAgIDB4MTBBMUUsIDB4MTBBMUYsIDB4MTBBMjAsIDB4MTBBMjEsIDB4MTBBMjIsIDB4MTBBMjMsIDB4MTBBMjQsIDB4MTBBMjUsXG4gICAgMHgxMEEyNiwgMHgxMEEyNywgMHgxMEEyOCwgMHgxMEEyOSwgMHgxMEEyQSwgMHgxMEEyQiwgMHgxMEEyQywgMHgxMEEyRCxcbiAgICAweDEwQTJFLCAweDEwQTJGLCAweDEwQTMwLCAweDEwQTMxLCAweDEwQTMyLCAweDEwQTMzLCAweDEwQTQwLCAweDEwQTQxLFxuICAgIDB4MTBBNDIsIDB4MTBBNDMsIDB4MTBBNDQsIDB4MTBBNDUsIDB4MTBBNDYsIDB4MTBBNDcsIDB4MTBBNTAsIDB4MTBBNTEsXG4gICAgMHgxMEE1MiwgMHgxMEE1MywgMHgxMEE1NCwgMHgxMEE1NSwgMHgxMEE1NiwgMHgxMEE1NywgMHgxMEE1OCwgMHgxMEE2MCxcbiAgICAweDEwQTYxLCAweDEwQTYyLCAweDEwQTYzLCAweDEwQTY0LCAweDEwQTY1LCAweDEwQTY2LCAweDEwQTY3LCAweDEwQTY4LFxuICAgIDB4MTBBNjksIDB4MTBBNkEsIDB4MTBBNkIsIDB4MTBBNkMsIDB4MTBBNkQsIDB4MTBBNkUsIDB4MTBBNkYsIDB4MTBBNzAsXG4gICAgMHgxMEE3MSwgMHgxMEE3MiwgMHgxMEE3MywgMHgxMEE3NCwgMHgxMEE3NSwgMHgxMEE3NiwgMHgxMEE3NywgMHgxMEE3OCxcbiAgICAweDEwQTc5LCAweDEwQTdBLCAweDEwQTdCLCAweDEwQTdDLCAweDEwQTdELCAweDEwQTdFLCAweDEwQTdGLCAweDEwQjAwLFxuICAgIDB4MTBCMDEsIDB4MTBCMDIsIDB4MTBCMDMsIDB4MTBCMDQsIDB4MTBCMDUsIDB4MTBCMDYsIDB4MTBCMDcsIDB4MTBCMDgsXG4gICAgMHgxMEIwOSwgMHgxMEIwQSwgMHgxMEIwQiwgMHgxMEIwQywgMHgxMEIwRCwgMHgxMEIwRSwgMHgxMEIwRiwgMHgxMEIxMCxcbiAgICAweDEwQjExLCAweDEwQjEyLCAweDEwQjEzLCAweDEwQjE0LCAweDEwQjE1LCAweDEwQjE2LCAweDEwQjE3LCAweDEwQjE4LFxuICAgIDB4MTBCMTksIDB4MTBCMUEsIDB4MTBCMUIsIDB4MTBCMUMsIDB4MTBCMUQsIDB4MTBCMUUsIDB4MTBCMUYsIDB4MTBCMjAsXG4gICAgMHgxMEIyMSwgMHgxMEIyMiwgMHgxMEIyMywgMHgxMEIyNCwgMHgxMEIyNSwgMHgxMEIyNiwgMHgxMEIyNywgMHgxMEIyOCxcbiAgICAweDEwQjI5LCAweDEwQjJBLCAweDEwQjJCLCAweDEwQjJDLCAweDEwQjJELCAweDEwQjJFLCAweDEwQjJGLCAweDEwQjMwLFxuICAgIDB4MTBCMzEsIDB4MTBCMzIsIDB4MTBCMzMsIDB4MTBCMzQsIDB4MTBCMzUsIDB4MTBCNDAsIDB4MTBCNDEsIDB4MTBCNDIsXG4gICAgMHgxMEI0MywgMHgxMEI0NCwgMHgxMEI0NSwgMHgxMEI0NiwgMHgxMEI0NywgMHgxMEI0OCwgMHgxMEI0OSwgMHgxMEI0QSxcbiAgICAweDEwQjRCLCAweDEwQjRDLCAweDEwQjRELCAweDEwQjRFLCAweDEwQjRGLCAweDEwQjUwLCAweDEwQjUxLCAweDEwQjUyLFxuICAgIDB4MTBCNTMsIDB4MTBCNTQsIDB4MTBCNTUsIDB4MTBCNTgsIDB4MTBCNTksIDB4MTBCNUEsIDB4MTBCNUIsIDB4MTBCNUMsXG4gICAgMHgxMEI1RCwgMHgxMEI1RSwgMHgxMEI1RiwgMHgxMEI2MCwgMHgxMEI2MSwgMHgxMEI2MiwgMHgxMEI2MywgMHgxMEI2NCxcbiAgICAweDEwQjY1LCAweDEwQjY2LCAweDEwQjY3LCAweDEwQjY4LCAweDEwQjY5LCAweDEwQjZBLCAweDEwQjZCLCAweDEwQjZDLFxuICAgIDB4MTBCNkQsIDB4MTBCNkUsIDB4MTBCNkYsIDB4MTBCNzAsIDB4MTBCNzEsIDB4MTBCNzIsIDB4MTBCNzgsIDB4MTBCNzksXG4gICAgMHgxMEI3QSwgMHgxMEI3QiwgMHgxMEI3QywgMHgxMEI3RCwgMHgxMEI3RSwgMHgxMEI3RiwgMHgxMEMwMCwgMHgxMEMwMSxcbiAgICAweDEwQzAyLCAweDEwQzAzLCAweDEwQzA0LCAweDEwQzA1LCAweDEwQzA2LCAweDEwQzA3LCAweDEwQzA4LCAweDEwQzA5LFxuICAgIDB4MTBDMEEsIDB4MTBDMEIsIDB4MTBDMEMsIDB4MTBDMEQsIDB4MTBDMEUsIDB4MTBDMEYsIDB4MTBDMTAsIDB4MTBDMTEsXG4gICAgMHgxMEMxMiwgMHgxMEMxMywgMHgxMEMxNCwgMHgxMEMxNSwgMHgxMEMxNiwgMHgxMEMxNywgMHgxMEMxOCwgMHgxMEMxOSxcbiAgICAweDEwQzFBLCAweDEwQzFCLCAweDEwQzFDLCAweDEwQzFELCAweDEwQzFFLCAweDEwQzFGLCAweDEwQzIwLCAweDEwQzIxLFxuICAgIDB4MTBDMjIsIDB4MTBDMjMsIDB4MTBDMjQsIDB4MTBDMjUsIDB4MTBDMjYsIDB4MTBDMjcsIDB4MTBDMjgsIDB4MTBDMjksXG4gICAgMHgxMEMyQSwgMHgxMEMyQiwgMHgxMEMyQywgMHgxMEMyRCwgMHgxMEMyRSwgMHgxMEMyRiwgMHgxMEMzMCwgMHgxMEMzMSxcbiAgICAweDEwQzMyLCAweDEwQzMzLCAweDEwQzM0LCAweDEwQzM1LCAweDEwQzM2LCAweDEwQzM3LCAweDEwQzM4LCAweDEwQzM5LFxuICAgIDB4MTBDM0EsIDB4MTBDM0IsIDB4MTBDM0MsIDB4MTBDM0QsIDB4MTBDM0UsIDB4MTBDM0YsIDB4MTBDNDAsIDB4MTBDNDEsXG4gICAgMHgxMEM0MiwgMHgxMEM0MywgMHgxMEM0NCwgMHgxMEM0NSwgMHgxMEM0NiwgMHgxMEM0NywgMHgxMEM0OCwgMHgxRUUwMCxcbiAgICAweDFFRTAxLCAweDFFRTAyLCAweDFFRTAzLCAweDFFRTA1LCAweDFFRTA2LCAweDFFRTA3LCAweDFFRTA4LCAweDFFRTA5LFxuICAgIDB4MUVFMEEsIDB4MUVFMEIsIDB4MUVFMEMsIDB4MUVFMEQsIDB4MUVFMEUsIDB4MUVFMEYsIDB4MUVFMTAsIDB4MUVFMTEsXG4gICAgMHgxRUUxMiwgMHgxRUUxMywgMHgxRUUxNCwgMHgxRUUxNSwgMHgxRUUxNiwgMHgxRUUxNywgMHgxRUUxOCwgMHgxRUUxOSxcbiAgICAweDFFRTFBLCAweDFFRTFCLCAweDFFRTFDLCAweDFFRTFELCAweDFFRTFFLCAweDFFRTFGLCAweDFFRTIxLCAweDFFRTIyLFxuICAgIDB4MUVFMjQsIDB4MUVFMjcsIDB4MUVFMjksIDB4MUVFMkEsIDB4MUVFMkIsIDB4MUVFMkMsIDB4MUVFMkQsIDB4MUVFMkUsXG4gICAgMHgxRUUyRiwgMHgxRUUzMCwgMHgxRUUzMSwgMHgxRUUzMiwgMHgxRUUzNCwgMHgxRUUzNSwgMHgxRUUzNiwgMHgxRUUzNyxcbiAgICAweDFFRTM5LCAweDFFRTNCLCAweDFFRTQyLCAweDFFRTQ3LCAweDFFRTQ5LCAweDFFRTRCLCAweDFFRTRELCAweDFFRTRFLFxuICAgIDB4MUVFNEYsIDB4MUVFNTEsIDB4MUVFNTIsIDB4MUVFNTQsIDB4MUVFNTcsIDB4MUVFNTksIDB4MUVFNUIsIDB4MUVFNUQsXG4gICAgMHgxRUU1RiwgMHgxRUU2MSwgMHgxRUU2MiwgMHgxRUU2NCwgMHgxRUU2NywgMHgxRUU2OCwgMHgxRUU2OSwgMHgxRUU2QSxcbiAgICAweDFFRTZDLCAweDFFRTZELCAweDFFRTZFLCAweDFFRTZGLCAweDFFRTcwLCAweDFFRTcxLCAweDFFRTcyLCAweDFFRTc0LFxuICAgIDB4MUVFNzUsIDB4MUVFNzYsIDB4MUVFNzcsIDB4MUVFNzksIDB4MUVFN0EsIDB4MUVFN0IsIDB4MUVFN0MsIDB4MUVFN0UsXG4gICAgMHgxRUU4MCwgMHgxRUU4MSwgMHgxRUU4MiwgMHgxRUU4MywgMHgxRUU4NCwgMHgxRUU4NSwgMHgxRUU4NiwgMHgxRUU4NyxcbiAgICAweDFFRTg4LCAweDFFRTg5LCAweDFFRThCLCAweDFFRThDLCAweDFFRThELCAweDFFRThFLCAweDFFRThGLCAweDFFRTkwLFxuICAgIDB4MUVFOTEsIDB4MUVFOTIsIDB4MUVFOTMsIDB4MUVFOTQsIDB4MUVFOTUsIDB4MUVFOTYsIDB4MUVFOTcsIDB4MUVFOTgsXG4gICAgMHgxRUU5OSwgMHgxRUU5QSwgMHgxRUU5QiwgMHgxRUVBMSwgMHgxRUVBMiwgMHgxRUVBMywgMHgxRUVBNSwgMHgxRUVBNixcbiAgICAweDFFRUE3LCAweDFFRUE4LCAweDFFRUE5LCAweDFFRUFCLCAweDFFRUFDLCAweDFFRUFELCAweDFFRUFFLCAweDFFRUFGLFxuICAgIDB4MUVFQjAsIDB4MUVFQjEsIDB4MUVFQjIsIDB4MUVFQjMsIDB4MUVFQjQsIDB4MUVFQjUsIDB4MUVFQjYsIDB4MUVFQjcsXG4gICAgMHgxRUVCOCwgMHgxRUVCOSwgMHgxRUVCQSwgMHgxRUVCQiwgMHgxMEZGRkRdO1xuXG5mdW5jdGlvbiBkZXRlcm1pbmVCaWRpKGN1ZURpdikge1xuICAgIHZhciBub2RlU3RhY2sgPSBbXSxcbiAgICAgICAgdGV4dCA9IFwiXCIsXG4gICAgICAgIGNoYXJDb2RlO1xuXG4gICAgaWYgKCFjdWVEaXYgfHwgIWN1ZURpdi5jaGlsZE5vZGVzKSB7XG4gICAgICAgIHJldHVybiBcImx0clwiO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHB1c2hOb2Rlcyhub2RlU3RhY2ssIG5vZGUpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IG5vZGUuY2hpbGROb2Rlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgbm9kZVN0YWNrLnB1c2gobm9kZS5jaGlsZE5vZGVzW2ldKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG5leHRUZXh0Tm9kZShub2RlU3RhY2spIHtcbiAgICAgICAgaWYgKCFub2RlU3RhY2sgfHwgIW5vZGVTdGFjay5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG5vZGUgPSBub2RlU3RhY2sucG9wKCksXG4gICAgICAgICAgICB0ZXh0ID0gbm9kZS50ZXh0Q29udGVudCB8fCBub2RlLmlubmVyVGV4dDtcbiAgICAgICAgaWYgKHRleHQpIHtcbiAgICAgICAgICAgIC8vIFRPRE86IFRoaXMgc2hvdWxkIG1hdGNoIGFsbCB1bmljb2RlIHR5cGUgQiBjaGFyYWN0ZXJzIChwYXJhZ3JhcGhcbiAgICAgICAgICAgIC8vIHNlcGFyYXRvciBjaGFyYWN0ZXJzKS4gU2VlIGlzc3VlICMxMTUuXG4gICAgICAgICAgICB2YXIgbSA9IHRleHQubWF0Y2goL14uKihcXG58XFxyKS8pO1xuICAgICAgICAgICAgaWYgKG0pIHtcbiAgICAgICAgICAgICAgICBub2RlU3RhY2subGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICByZXR1cm4gbVswXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0ZXh0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChub2RlLnRhZ05hbWUgPT09IFwicnVieVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV4dFRleHROb2RlKG5vZGVTdGFjayk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vZGUuY2hpbGROb2Rlcykge1xuICAgICAgICAgICAgcHVzaE5vZGVzKG5vZGVTdGFjaywgbm9kZSk7XG4gICAgICAgICAgICByZXR1cm4gbmV4dFRleHROb2RlKG5vZGVTdGFjayk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdXNoTm9kZXMobm9kZVN0YWNrLCBjdWVEaXYpO1xuICAgIHdoaWxlICgodGV4dCA9IG5leHRUZXh0Tm9kZShub2RlU3RhY2spKSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRleHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNoYXJDb2RlID0gdGV4dC5jaGFyQ29kZUF0KGkpO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzdHJvbmdSVExDaGFycy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGlmIChzdHJvbmdSVExDaGFyc1tqXSA9PT0gY2hhckNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwicnRsXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBcImx0clwiO1xufVxuXG5mdW5jdGlvbiBjb21wdXRlTGluZVBvcyhjdWUpIHtcbiAgICBpZiAodHlwZW9mIGN1ZS5saW5lID09PSBcIm51bWJlclwiICYmXG4gICAgICAgIChjdWUuc25hcFRvTGluZXMgfHwgKGN1ZS5saW5lID49IDAgJiYgY3VlLmxpbmUgPD0gMTAwKSkpIHtcbiAgICAgICAgcmV0dXJuIGN1ZS5saW5lO1xuICAgIH1cbiAgICBpZiAoIWN1ZS50cmFjayB8fCAhY3VlLnRyYWNrLnRleHRUcmFja0xpc3QgfHxcbiAgICAgICAgIWN1ZS50cmFjay50ZXh0VHJhY2tMaXN0Lm1lZGlhRWxlbWVudCkge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIHZhciB0cmFjayA9IGN1ZS50cmFjayxcbiAgICAgICAgdHJhY2tMaXN0ID0gdHJhY2sudGV4dFRyYWNrTGlzdCxcbiAgICAgICAgY291bnQgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHJhY2tMaXN0Lmxlbmd0aCAmJiB0cmFja0xpc3RbaV0gIT09IHRyYWNrOyBpKyspIHtcbiAgICAgICAgaWYgKHRyYWNrTGlzdFtpXS5tb2RlID09PSBcInNob3dpbmdcIikge1xuICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gKytjb3VudCAqIC0xO1xufVxuXG5mdW5jdGlvbiBTdHlsZUJveCgpIHtcbn1cblxuLy8gQXBwbHkgc3R5bGVzIHRvIGEgZGl2LiBJZiB0aGVyZSBpcyBubyBkaXYgcGFzc2VkIHRoZW4gaXQgZGVmYXVsdHMgdG8gdGhlXG4vLyBkaXYgb24gJ3RoaXMnLlxuU3R5bGVCb3gucHJvdG90eXBlLmFwcGx5U3R5bGVzID0gZnVuY3Rpb24oc3R5bGVzLCBkaXYpIHtcbiAgICBkaXYgPSBkaXYgfHwgdGhpcy5kaXY7XG4gICAgZm9yICh2YXIgcHJvcCBpbiBzdHlsZXMpIHtcbiAgICAgICAgaWYgKHN0eWxlcy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgICAgZGl2LnN0eWxlW3Byb3BdID0gc3R5bGVzW3Byb3BdO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuU3R5bGVCb3gucHJvdG90eXBlLmZvcm1hdFN0eWxlID0gZnVuY3Rpb24odmFsLCB1bml0KSB7XG4gICAgcmV0dXJuIHZhbCA9PT0gMCA/IDAgOiB2YWwgKyB1bml0O1xufTtcblxuLy8gQ29uc3RydWN0cyB0aGUgY29tcHV0ZWQgZGlzcGxheSBzdGF0ZSBvZiB0aGUgY3VlIChhIGRpdikuIFBsYWNlcyB0aGUgZGl2XG4vLyBpbnRvIHRoZSBvdmVybGF5IHdoaWNoIHNob3VsZCBiZSBhIGJsb2NrIGxldmVsIGVsZW1lbnQgKHVzdWFsbHkgYSBkaXYpLlxuZnVuY3Rpb24gQ3VlU3R5bGVCb3god2luZG93LCBjdWUsIHN0eWxlT3B0aW9ucykge1xuICAgIHZhciBpc0lFOCA9ICh0eXBlb2YgbmF2aWdhdG9yICE9PSBcInVuZGVmaW5lZFwiKSAmJlxuICAgICAgICAoL01TSUVcXHM4XFwuMC8pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgdmFyIGNvbG9yID0gXCJyZ2JhKDI1NSwgMjU1LCAyNTUsIDEpXCI7XG4gICAgdmFyIGJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLCAwLCAwLCAwLjgpXCI7XG4gICAgdmFyIHRleHRTaGFkb3cgPSBcIlwiO1xuXG4gICAgaWYodHlwZW9mIFdlYlZUVFNldCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBjb2xvciA9IFdlYlZUVFNldC5mb250U2V0O1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3IgPSBXZWJWVFRTZXQuYmFja2dyb3VuZFNldDtcbiAgICAgICAgdGV4dFNoYWRvdyA9IFdlYlZUVFNldC5lZGdlU2V0O1xuICAgIH1cblxuICAgIGlmIChpc0lFOCkge1xuICAgICAgICBjb2xvciA9IFwicmdiKDI1NSwgMjU1LCAyNTUpXCI7XG4gICAgICAgIGJhY2tncm91bmRDb2xvciA9IFwicmdiKDAsIDAsIDApXCI7XG4gICAgfVxuXG4gICAgU3R5bGVCb3guY2FsbCh0aGlzKTtcbiAgICB0aGlzLmN1ZSA9IGN1ZTtcblxuICAgIC8vIFBhcnNlIG91ciBjdWUncyB0ZXh0IGludG8gYSBET00gdHJlZSByb290ZWQgYXQgJ2N1ZURpdicuIFRoaXMgZGl2IHdpbGxcbiAgICAvLyBoYXZlIGlubGluZSBwb3NpdGlvbmluZyBhbmQgd2lsbCBmdW5jdGlvbiBhcyB0aGUgY3VlIGJhY2tncm91bmQgYm94LlxuICAgIHRoaXMuY3VlRGl2ID0gcGFyc2VDb250ZW50KHdpbmRvdywgY3VlLnRleHQpO1xuICAgIHZhciBzdHlsZXMgPSB7XG4gICAgICAgIGNvbG9yOiBjb2xvcixcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBiYWNrZ3JvdW5kQ29sb3IsXG4gICAgICAgIHRleHRTaGFkb3c6IHRleHRTaGFkb3csXG4gICAgICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsXG4gICAgICAgIGxlZnQ6IDAsXG4gICAgICAgIHJpZ2h0OiAwLFxuICAgICAgICB0b3A6IDAsXG4gICAgICAgIGJvdHRvbTogMCxcbiAgICAgICAgZGlzcGxheTogXCJpbmxpbmVcIlxuICAgIH07XG5cbiAgICBpZiAoIWlzSUU4KSB7XG4gICAgICAgIHN0eWxlcy53cml0aW5nTW9kZSA9IGN1ZS52ZXJ0aWNhbCA9PT0gXCJcIiA/IFwiaG9yaXpvbnRhbC10YlwiXG4gICAgICAgICAgICA6IGN1ZS52ZXJ0aWNhbCA9PT0gXCJsclwiID8gXCJ2ZXJ0aWNhbC1sclwiXG4gICAgICAgICAgICA6IFwidmVydGljYWwtcmxcIjtcbiAgICAgICAgc3R5bGVzLnVuaWNvZGVCaWRpID0gXCJwbGFpbnRleHRcIjtcbiAgICB9XG4gICAgdGhpcy5hcHBseVN0eWxlcyhzdHlsZXMsIHRoaXMuY3VlRGl2KTtcblxuICAgIC8vIENyZWF0ZSBhbiBhYnNvbHV0ZWx5IHBvc2l0aW9uZWQgZGl2IHRoYXQgd2lsbCBiZSB1c2VkIHRvIHBvc2l0aW9uIHRoZSBjdWVcbiAgICAvLyBkaXYuIE5vdGUsIGFsbCBXZWJWVFQgY3VlLXNldHRpbmcgYWxpZ25tZW50cyBhcmUgZXF1aXZhbGVudCB0byB0aGUgQ1NTXG4gICAgLy8gbWlycm9ycyBvZiB0aGVtIGV4Y2VwdCBcIm1pZGRsZVwiIHdoaWNoIGlzIFwiY2VudGVyXCIgaW4gQ1NTLlxuICAgIHRoaXMuZGl2ID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc3R5bGVzID0ge1xuICAgICAgICB0ZXh0QWxpZ246IGN1ZS5hbGlnbiA9PT0gXCJtaWRkbGVcIiA/IFwiY2VudGVyXCIgOiBjdWUuYWxpZ24sXG4gICAgICAgIGZvbnQ6IHN0eWxlT3B0aW9ucy5mb250LFxuICAgICAgICB3aGl0ZVNwYWNlOiBcInByZS1saW5lXCIsXG4gICAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCJcbiAgICB9O1xuXG4gICAgaWYgKCFpc0lFOCkge1xuICAgICAgICBzdHlsZXMuZGlyZWN0aW9uID0gZGV0ZXJtaW5lQmlkaSh0aGlzLmN1ZURpdik7XG4gICAgICAgIHN0eWxlcy53cml0aW5nTW9kZSA9IGN1ZS52ZXJ0aWNhbCA9PT0gXCJcIiA/IFwiaG9yaXpvbnRhbC10YlwiXG4gICAgICAgICAgICA6IGN1ZS52ZXJ0aWNhbCA9PT0gXCJsclwiID8gXCJ2ZXJ0aWNhbC1sclwiXG4gICAgICAgICAgICA6IFwidmVydGljYWwtcmxcIi5cbiAgICAgICAgICAgIHN0eWxlc3VuaWNvZGVCaWRpID0gIFwicGxhaW50ZXh0XCI7XG4gICAgfVxuXG4gICAgdGhpcy5hcHBseVN0eWxlcyhzdHlsZXMpO1xuXG4gICAgdGhpcy5kaXYuYXBwZW5kQ2hpbGQodGhpcy5jdWVEaXYpO1xuXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBkaXN0YW5jZSBmcm9tIHRoZSByZWZlcmVuY2UgZWRnZSBvZiB0aGUgdmlld3BvcnQgdG8gdGhlIHRleHRcbiAgICAvLyBwb3NpdGlvbiBvZiB0aGUgY3VlIGJveC4gVGhlIHJlZmVyZW5jZSBlZGdlIHdpbGwgYmUgcmVzb2x2ZWQgbGF0ZXIgd2hlblxuICAgIC8vIHRoZSBib3ggb3JpZW50YXRpb24gc3R5bGVzIGFyZSBhcHBsaWVkLlxuICAgIHZhciB0ZXh0UG9zID0gMDtcbiAgICBzd2l0Y2ggKGN1ZS5wb3NpdGlvbkFsaWduKSB7XG4gICAgICAgIGNhc2UgXCJzdGFydFwiOlxuICAgICAgICAgICAgdGV4dFBvcyA9IGN1ZS5wb3NpdGlvbjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwibWlkZGxlXCI6XG4gICAgICAgICAgICB0ZXh0UG9zID0gY3VlLnBvc2l0aW9uIC0gKGN1ZS5zaXplIC8gMik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgdGV4dFBvcyA9IGN1ZS5wb3NpdGlvbiAtIGN1ZS5zaXplO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgLy8gSG9yaXpvbnRhbCBib3ggb3JpZW50YXRpb247IHRleHRQb3MgaXMgdGhlIGRpc3RhbmNlIGZyb20gdGhlIGxlZnQgZWRnZSBvZiB0aGVcbiAgICAvLyBhcmVhIHRvIHRoZSBsZWZ0IGVkZ2Ugb2YgdGhlIGJveCBhbmQgY3VlLnNpemUgaXMgdGhlIGRpc3RhbmNlIGV4dGVuZGluZyB0b1xuICAgIC8vIHRoZSByaWdodCBmcm9tIHRoZXJlLlxuICAgIGlmIChjdWUudmVydGljYWwgPT09IFwiXCIpIHtcbiAgICAgICAgdGhpcy5hcHBseVN0eWxlcyh7XG4gICAgICAgICAgICBsZWZ0OiAgdGhpcy5mb3JtYXRTdHlsZSh0ZXh0UG9zLCBcIiVcIiksXG4gICAgICAgICAgICB3aWR0aDogdGhpcy5mb3JtYXRTdHlsZShjdWUuc2l6ZSwgXCIlXCIpXG4gICAgICAgIH0pO1xuICAgICAgICAvLyBWZXJ0aWNhbCBib3ggb3JpZW50YXRpb247IHRleHRQb3MgaXMgdGhlIGRpc3RhbmNlIGZyb20gdGhlIHRvcCBlZGdlIG9mIHRoZVxuICAgICAgICAvLyBhcmVhIHRvIHRoZSB0b3AgZWRnZSBvZiB0aGUgYm94IGFuZCBjdWUuc2l6ZSBpcyB0aGUgaGVpZ2h0IGV4dGVuZGluZ1xuICAgICAgICAvLyBkb3dud2FyZHMgZnJvbSB0aGVyZS5cbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFwcGx5U3R5bGVzKHtcbiAgICAgICAgICAgIHRvcDogdGhpcy5mb3JtYXRTdHlsZSh0ZXh0UG9zLCBcIiVcIiksXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMuZm9ybWF0U3R5bGUoY3VlLnNpemUsIFwiJVwiKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLm1vdmUgPSBmdW5jdGlvbihib3gpIHtcbiAgICAgICAgdGhpcy5hcHBseVN0eWxlcyh7XG4gICAgICAgICAgICB0b3A6IHRoaXMuZm9ybWF0U3R5bGUoYm94LnRvcCwgXCJweFwiKSxcbiAgICAgICAgICAgIGJvdHRvbTogdGhpcy5mb3JtYXRTdHlsZShib3guYm90dG9tLCBcInB4XCIpLFxuICAgICAgICAgICAgbGVmdDogdGhpcy5mb3JtYXRTdHlsZShib3gubGVmdCwgXCJweFwiKSxcbiAgICAgICAgICAgIHJpZ2h0OiB0aGlzLmZvcm1hdFN0eWxlKGJveC5yaWdodCwgXCJweFwiKSxcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5mb3JtYXRTdHlsZShib3guaGVpZ2h0LCBcInB4XCIpLFxuICAgICAgICAgICAgd2lkdGg6IHRoaXMuZm9ybWF0U3R5bGUoYm94LndpZHRoLCBcInB4XCIpXG4gICAgICAgIH0pO1xuICAgIH07XG59XG5DdWVTdHlsZUJveC5wcm90b3R5cGUgPSBfb2JqQ3JlYXRlKFN0eWxlQm94LnByb3RvdHlwZSk7XG5DdWVTdHlsZUJveC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDdWVTdHlsZUJveDtcblxuLy8gUmVwcmVzZW50cyB0aGUgY28tb3JkaW5hdGVzIG9mIGFuIEVsZW1lbnQgaW4gYSB3YXkgdGhhdCB3ZSBjYW4gZWFzaWx5XG4vLyBjb21wdXRlIHRoaW5ncyB3aXRoIHN1Y2ggYXMgaWYgaXQgb3ZlcmxhcHMgb3IgaW50ZXJzZWN0cyB3aXRoIGFub3RoZXIgRWxlbWVudC5cbi8vIENhbiBpbml0aWFsaXplIGl0IHdpdGggZWl0aGVyIGEgU3R5bGVCb3ggb3IgYW5vdGhlciBCb3hQb3NpdGlvbi5cbmZ1bmN0aW9uIEJveFBvc2l0aW9uKG9iaikge1xuICAgIHZhciBpc0lFOCA9ICh0eXBlb2YgbmF2aWdhdG9yICE9PSBcInVuZGVmaW5lZFwiKSAmJlxuICAgICAgICAoL01TSUVcXHM4XFwuMC8pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5cbiAgICAvLyBFaXRoZXIgYSBCb3hQb3NpdGlvbiB3YXMgcGFzc2VkIGluIGFuZCB3ZSBuZWVkIHRvIGNvcHkgaXQsIG9yIGEgU3R5bGVCb3hcbiAgICAvLyB3YXMgcGFzc2VkIGluIGFuZCB3ZSBuZWVkIHRvIGNvcHkgdGhlIHJlc3VsdHMgb2YgJ2dldEJvdW5kaW5nQ2xpZW50UmVjdCdcbiAgICAvLyBhcyB0aGUgb2JqZWN0IHJldHVybmVkIGlzIHJlYWRvbmx5LiBBbGwgY28tb3JkaW5hdGUgdmFsdWVzIGFyZSBpbiByZWZlcmVuY2VcbiAgICAvLyB0byB0aGUgdmlld3BvcnQgb3JpZ2luICh0b3AgbGVmdCkuXG4gICAgdmFyIGxoLCBoZWlnaHQsIHdpZHRoLCB0b3A7XG4gICAgaWYgKG9iai5kaXYpIHtcbiAgICAgICAgaGVpZ2h0ID0gb2JqLmRpdi5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIHdpZHRoID0gb2JqLmRpdi5vZmZzZXRXaWR0aDtcbiAgICAgICAgdG9wID0gb2JqLmRpdi5vZmZzZXRUb3A7XG5cbiAgICAgICAgdmFyIHJlY3RzID0gKHJlY3RzID0gb2JqLmRpdi5jaGlsZE5vZGVzKSAmJiAocmVjdHMgPSByZWN0c1swXSkgJiZcbiAgICAgICAgICAgIHJlY3RzLmdldENsaWVudFJlY3RzICYmIHJlY3RzLmdldENsaWVudFJlY3RzKCk7XG4gICAgICAgIG9iaiA9IG9iai5kaXYuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIC8vIEluIGNlcnRhaW4gY2FzZXMgdGhlIG91dHRlciBkaXYgd2lsbCBiZSBzbGlnaHRseSBsYXJnZXIgdGhlbiB0aGUgc3VtIG9mXG4gICAgICAgIC8vIHRoZSBpbm5lciBkaXYncyBsaW5lcy4gVGhpcyBjb3VsZCBiZSBkdWUgdG8gYm9sZCB0ZXh0LCBldGMsIG9uIHNvbWUgcGxhdGZvcm1zLlxuICAgICAgICAvLyBJbiB0aGlzIGNhc2Ugd2Ugc2hvdWxkIGdldCB0aGUgYXZlcmFnZSBsaW5lIGhlaWdodCBhbmQgdXNlIHRoYXQuIFRoaXMgd2lsbFxuICAgICAgICAvLyByZXN1bHQgaW4gdGhlIGRlc2lyZWQgYmVoYXZpb3VyLlxuICAgICAgICBsaCA9IHJlY3RzID8gTWF0aC5tYXgoKHJlY3RzWzBdICYmIHJlY3RzWzBdLmhlaWdodCkgfHwgMCwgb2JqLmhlaWdodCAvIHJlY3RzLmxlbmd0aClcbiAgICAgICAgICAgIDogMDtcblxuICAgIH1cbiAgICB0aGlzLmxlZnQgPSBvYmoubGVmdDtcbiAgICB0aGlzLnJpZ2h0ID0gb2JqLnJpZ2h0O1xuICAgIHRoaXMudG9wID0gb2JqLnRvcCB8fCB0b3A7XG4gICAgdGhpcy5oZWlnaHQgPSBvYmouaGVpZ2h0IHx8IGhlaWdodDtcbiAgICB0aGlzLmJvdHRvbSA9IG9iai5ib3R0b20gfHwgKHRvcCArIChvYmouaGVpZ2h0IHx8IGhlaWdodCkpO1xuICAgIHRoaXMud2lkdGggPSBvYmoud2lkdGggfHwgd2lkdGg7XG4gICAgdGhpcy5saW5lSGVpZ2h0ID0gbGggIT09IHVuZGVmaW5lZCA/IGxoIDogb2JqLmxpbmVIZWlnaHQ7XG5cbiAgICBpZiAoaXNJRTggJiYgIXRoaXMubGluZUhlaWdodCkge1xuICAgICAgICB0aGlzLmxpbmVIZWlnaHQgPSAxMztcbiAgICB9XG59XG5cbi8vIE1vdmUgdGhlIGJveCBhbG9uZyBhIHBhcnRpY3VsYXIgYXhpcy4gT3B0aW9uYWxseSBwYXNzIGluIGFuIGFtb3VudCB0byBtb3ZlXG4vLyB0aGUgYm94LiBJZiBubyBhbW91bnQgaXMgcGFzc2VkIHRoZW4gdGhlIGRlZmF1bHQgaXMgdGhlIGxpbmUgaGVpZ2h0IG9mIHRoZVxuLy8gYm94LlxuQm94UG9zaXRpb24ucHJvdG90eXBlLm1vdmUgPSBmdW5jdGlvbihheGlzLCB0b01vdmUpIHtcbiAgICB0b01vdmUgPSB0b01vdmUgIT09IHVuZGVmaW5lZCA/IHRvTW92ZSA6IHRoaXMubGluZUhlaWdodDtcbiAgICBzd2l0Y2ggKGF4aXMpIHtcbiAgICAgICAgY2FzZSBcIit4XCI6XG4gICAgICAgICAgICB0aGlzLmxlZnQgKz0gdG9Nb3ZlO1xuICAgICAgICAgICAgdGhpcy5yaWdodCArPSB0b01vdmU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIi14XCI6XG4gICAgICAgICAgICB0aGlzLmxlZnQgLT0gdG9Nb3ZlO1xuICAgICAgICAgICAgdGhpcy5yaWdodCAtPSB0b01vdmU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIit5XCI6XG4gICAgICAgICAgICB0aGlzLnRvcCArPSB0b01vdmU7XG4gICAgICAgICAgICB0aGlzLmJvdHRvbSArPSB0b01vdmU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIi15XCI6XG4gICAgICAgICAgICB0aGlzLnRvcCAtPSB0b01vdmU7XG4gICAgICAgICAgICB0aGlzLmJvdHRvbSAtPSB0b01vdmU7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG59O1xuXG4vLyBDaGVjayBpZiB0aGlzIGJveCBvdmVybGFwcyBhbm90aGVyIGJveCwgYjIuXG5Cb3hQb3NpdGlvbi5wcm90b3R5cGUub3ZlcmxhcHMgPSBmdW5jdGlvbihiMikge1xuICAgIHJldHVybiB0aGlzLmxlZnQgPCBiMi5yaWdodCAmJlxuICAgICAgICB0aGlzLnJpZ2h0ID4gYjIubGVmdCAmJlxuICAgICAgICB0aGlzLnRvcCA8IGIyLmJvdHRvbSAmJlxuICAgICAgICB0aGlzLmJvdHRvbSA+IGIyLnRvcDtcbn07XG5cbi8vIENoZWNrIGlmIHRoaXMgYm94IG92ZXJsYXBzIGFueSBvdGhlciBib3hlcyBpbiBib3hlcy5cbkJveFBvc2l0aW9uLnByb3RvdHlwZS5vdmVybGFwc0FueSA9IGZ1bmN0aW9uKGJveGVzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBib3hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5vdmVybGFwcyhib3hlc1tpXSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG5cbi8vIENoZWNrIGlmIHRoaXMgYm94IGlzIHdpdGhpbiBhbm90aGVyIGJveC5cbkJveFBvc2l0aW9uLnByb3RvdHlwZS53aXRoaW4gPSBmdW5jdGlvbihjb250YWluZXIpIHtcbiAgICByZXR1cm4gdGhpcy50b3AgPj0gY29udGFpbmVyLnRvcCAmJlxuICAgICAgICB0aGlzLmJvdHRvbSA8PSBjb250YWluZXIuYm90dG9tICYmXG4gICAgICAgIHRoaXMubGVmdCA+PSBjb250YWluZXIubGVmdCAmJlxuICAgICAgICB0aGlzLnJpZ2h0IDw9IGNvbnRhaW5lci5yaWdodDtcbn07XG5cbi8vIENoZWNrIGlmIHRoaXMgYm94IGlzIGVudGlyZWx5IHdpdGhpbiB0aGUgY29udGFpbmVyIG9yIGl0IGlzIG92ZXJsYXBwaW5nXG4vLyBvbiB0aGUgZWRnZSBvcHBvc2l0ZSBvZiB0aGUgYXhpcyBkaXJlY3Rpb24gcGFzc2VkLiBGb3IgZXhhbXBsZSwgaWYgXCIreFwiIGlzXG4vLyBwYXNzZWQgYW5kIHRoZSBib3ggaXMgb3ZlcmxhcHBpbmcgb24gdGhlIGxlZnQgZWRnZSBvZiB0aGUgY29udGFpbmVyLCB0aGVuXG4vLyByZXR1cm4gdHJ1ZS5cbkJveFBvc2l0aW9uLnByb3RvdHlwZS5vdmVybGFwc09wcG9zaXRlQXhpcyA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgYXhpcykge1xuICAgIHN3aXRjaCAoYXhpcykge1xuICAgICAgICBjYXNlIFwiK3hcIjpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxlZnQgPCBjb250YWluZXIubGVmdDtcbiAgICAgICAgY2FzZSBcIi14XCI6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yaWdodCA+IGNvbnRhaW5lci5yaWdodDtcbiAgICAgICAgY2FzZSBcIit5XCI6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b3AgPCBjb250YWluZXIudG9wO1xuICAgICAgICBjYXNlIFwiLXlcIjpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJvdHRvbSA+IGNvbnRhaW5lci5ib3R0b207XG4gICAgfVxufTtcblxuLy8gRmluZCB0aGUgcGVyY2VudGFnZSBvZiB0aGUgYXJlYSB0aGF0IHRoaXMgYm94IGlzIG92ZXJsYXBwaW5nIHdpdGggYW5vdGhlclxuLy8gYm94LlxuQm94UG9zaXRpb24ucHJvdG90eXBlLmludGVyc2VjdFBlcmNlbnRhZ2UgPSBmdW5jdGlvbihiMikge1xuICAgIHZhciB4ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4odGhpcy5yaWdodCwgYjIucmlnaHQpIC0gTWF0aC5tYXgodGhpcy5sZWZ0LCBiMi5sZWZ0KSksXG4gICAgICAgIHkgPSBNYXRoLm1heCgwLCBNYXRoLm1pbih0aGlzLmJvdHRvbSwgYjIuYm90dG9tKSAtIE1hdGgubWF4KHRoaXMudG9wLCBiMi50b3ApKSxcbiAgICAgICAgaW50ZXJzZWN0QXJlYSA9IHggKiB5O1xuICAgIHJldHVybiBpbnRlcnNlY3RBcmVhIC8gKHRoaXMuaGVpZ2h0ICogdGhpcy53aWR0aCk7XG59O1xuXG4vLyBDb252ZXJ0IHRoZSBwb3NpdGlvbnMgZnJvbSB0aGlzIGJveCB0byBDU1MgY29tcGF0aWJsZSBwb3NpdGlvbnMgdXNpbmdcbi8vIHRoZSByZWZlcmVuY2UgY29udGFpbmVyJ3MgcG9zaXRpb25zLiBUaGlzIGhhcyB0byBiZSBkb25lIGJlY2F1c2UgdGhpc1xuLy8gYm94J3MgcG9zaXRpb25zIGFyZSBpbiByZWZlcmVuY2UgdG8gdGhlIHZpZXdwb3J0IG9yaWdpbiwgd2hlcmVhcywgQ1NTXG4vLyB2YWx1ZXMgYXJlIGluIHJlZmVyZWNuZSB0byB0aGVpciByZXNwZWN0aXZlIGVkZ2VzLlxuQm94UG9zaXRpb24ucHJvdG90eXBlLnRvQ1NTQ29tcGF0VmFsdWVzID0gZnVuY3Rpb24ocmVmZXJlbmNlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9wOiB0aGlzLnRvcCAtIHJlZmVyZW5jZS50b3AsXG4gICAgICAgIGJvdHRvbTogcmVmZXJlbmNlLmJvdHRvbSAtIHRoaXMuYm90dG9tLFxuICAgICAgICBsZWZ0OiB0aGlzLmxlZnQgLSByZWZlcmVuY2UubGVmdCxcbiAgICAgICAgcmlnaHQ6IHJlZmVyZW5jZS5yaWdodCAtIHRoaXMucmlnaHQsXG4gICAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQsXG4gICAgICAgIHdpZHRoOiB0aGlzLndpZHRoXG4gICAgfTtcbn07XG5cbi8vIEdldCBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHRoZSBib3gncyBwb3NpdGlvbiB3aXRob3V0IGFueXRoaW5nIGV4dHJhLlxuLy8gQ2FuIHBhc3MgYSBTdHlsZUJveCwgSFRNTEVsZW1lbnQsIG9yIGFub3RoZXIgQm94UG9zaXRvbi5cbkJveFBvc2l0aW9uLmdldFNpbXBsZUJveFBvc2l0aW9uID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIGhlaWdodCA9IG9iai5kaXYgPyBvYmouZGl2Lm9mZnNldEhlaWdodCA6IG9iai50YWdOYW1lID8gb2JqLm9mZnNldEhlaWdodCA6IDA7XG4gICAgdmFyIHdpZHRoID0gb2JqLmRpdiA/IG9iai5kaXYub2Zmc2V0V2lkdGggOiBvYmoudGFnTmFtZSA/IG9iai5vZmZzZXRXaWR0aCA6IDA7XG4gICAgdmFyIHRvcCA9IG9iai5kaXYgPyBvYmouZGl2Lm9mZnNldFRvcCA6IG9iai50YWdOYW1lID8gb2JqLm9mZnNldFRvcCA6IDA7XG5cbiAgICBvYmogPSBvYmouZGl2ID8gb2JqLmRpdi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSA6XG4gICAgICAgIG9iai50YWdOYW1lID8gb2JqLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpIDogb2JqO1xuICAgIHZhciByZXQgPSB7XG4gICAgICAgIGxlZnQ6IG9iai5sZWZ0LFxuICAgICAgICByaWdodDogb2JqLnJpZ2h0LFxuICAgICAgICB0b3A6IG9iai50b3AgfHwgdG9wLFxuICAgICAgICBoZWlnaHQ6IG9iai5oZWlnaHQgfHwgaGVpZ2h0LFxuICAgICAgICBib3R0b206IG9iai5ib3R0b20gfHwgKHRvcCArIChvYmouaGVpZ2h0IHx8IGhlaWdodCkpLFxuICAgICAgICB3aWR0aDogb2JqLndpZHRoIHx8IHdpZHRoXG4gICAgfTtcbiAgICByZXR1cm4gcmV0O1xufTtcblxuLy8gTW92ZSBhIFN0eWxlQm94IHRvIGl0cyBzcGVjaWZpZWQsIG9yIG5leHQgYmVzdCwgcG9zaXRpb24uIFRoZSBjb250YWluZXJCb3hcbi8vIGlzIHRoZSBib3ggdGhhdCBjb250YWlucyB0aGUgU3R5bGVCb3gsIHN1Y2ggYXMgYSBkaXYuIGJveFBvc2l0aW9ucyBhcmVcbi8vIGEgbGlzdCBvZiBvdGhlciBib3hlcyB0aGF0IHRoZSBzdHlsZUJveCBjYW4ndCBvdmVybGFwIHdpdGguXG5mdW5jdGlvbiBtb3ZlQm94VG9MaW5lUG9zaXRpb24od2luZG93LCBzdHlsZUJveCwgY29udGFpbmVyQm94LCBib3hQb3NpdGlvbnMpIHtcblxuICAgIC8vIEZpbmQgdGhlIGJlc3QgcG9zaXRpb24gZm9yIGEgY3VlIGJveCwgYiwgb24gdGhlIHZpZGVvLiBUaGUgYXhpcyBwYXJhbWV0ZXJcbiAgICAvLyBpcyBhIGxpc3Qgb2YgYXhpcywgdGhlIG9yZGVyIG9mIHdoaWNoLCBpdCB3aWxsIG1vdmUgdGhlIGJveCBhbG9uZy4gRm9yIGV4YW1wbGU6XG4gICAgLy8gUGFzc2luZyBbXCIreFwiLCBcIi14XCJdIHdpbGwgbW92ZSB0aGUgYm94IGZpcnN0IGFsb25nIHRoZSB4IGF4aXMgaW4gdGhlIHBvc2l0aXZlXG4gICAgLy8gZGlyZWN0aW9uLiBJZiBpdCBkb2Vzbid0IGZpbmQgYSBnb29kIHBvc2l0aW9uIGZvciBpdCB0aGVyZSBpdCB3aWxsIHRoZW4gbW92ZVxuICAgIC8vIGl0IGFsb25nIHRoZSB4IGF4aXMgaW4gdGhlIG5lZ2F0aXZlIGRpcmVjdGlvbi5cbiAgICBmdW5jdGlvbiBmaW5kQmVzdFBvc2l0aW9uKGIsIGF4aXMpIHtcbiAgICAgICAgdmFyIGJlc3RQb3NpdGlvbixcbiAgICAgICAgICAgIHNwZWNpZmllZFBvc2l0aW9uID0gbmV3IEJveFBvc2l0aW9uKGIpLFxuICAgICAgICAgICAgcGVyY2VudGFnZSA9IDE7IC8vIEhpZ2hlc3QgcG9zc2libGUgc28gdGhlIGZpcnN0IHRoaW5nIHdlIGdldCBpcyBiZXR0ZXIuXG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBheGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB3aGlsZSAoYi5vdmVybGFwc09wcG9zaXRlQXhpcyhjb250YWluZXJCb3gsIGF4aXNbaV0pIHx8XG4gICAgICAgICAgICAoYi53aXRoaW4oY29udGFpbmVyQm94KSAmJiBiLm92ZXJsYXBzQW55KGJveFBvc2l0aW9ucykpKSB7XG4gICAgICAgICAgICAgICAgYi5tb3ZlKGF4aXNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gV2UgZm91bmQgYSBzcG90IHdoZXJlIHdlIGFyZW4ndCBvdmVybGFwcGluZyBhbnl0aGluZy4gVGhpcyBpcyBvdXJcbiAgICAgICAgICAgIC8vIGJlc3QgcG9zaXRpb24uXG4gICAgICAgICAgICBpZiAoYi53aXRoaW4oY29udGFpbmVyQm94KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHAgPSBiLmludGVyc2VjdFBlcmNlbnRhZ2UoY29udGFpbmVyQm94KTtcbiAgICAgICAgICAgIC8vIElmIHdlJ3JlIG91dHNpZGUgdGhlIGNvbnRhaW5lciBib3ggbGVzcyB0aGVuIHdlIHdlcmUgb24gb3VyIGxhc3QgdHJ5XG4gICAgICAgICAgICAvLyB0aGVuIHJlbWVtYmVyIHRoaXMgcG9zaXRpb24gYXMgdGhlIGJlc3QgcG9zaXRpb24uXG4gICAgICAgICAgICBpZiAocGVyY2VudGFnZSA+IHApIHtcbiAgICAgICAgICAgICAgICBiZXN0UG9zaXRpb24gPSBuZXcgQm94UG9zaXRpb24oYik7XG4gICAgICAgICAgICAgICAgcGVyY2VudGFnZSA9IHA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBSZXNldCB0aGUgYm94IHBvc2l0aW9uIHRvIHRoZSBzcGVjaWZpZWQgcG9zaXRpb24uXG4gICAgICAgICAgICBiID0gbmV3IEJveFBvc2l0aW9uKHNwZWNpZmllZFBvc2l0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYmVzdFBvc2l0aW9uIHx8IHNwZWNpZmllZFBvc2l0aW9uO1xuICAgIH1cblxuICAgIHZhciBib3hQb3NpdGlvbiA9IG5ldyBCb3hQb3NpdGlvbihzdHlsZUJveCksXG4gICAgICAgIGN1ZSA9IHN0eWxlQm94LmN1ZSxcbiAgICAgICAgbGluZVBvcyA9IGNvbXB1dGVMaW5lUG9zKGN1ZSksXG4gICAgICAgIGF4aXMgPSBbXTtcblxuICAgIC8vIElmIHdlIGhhdmUgYSBsaW5lIG51bWJlciB0byBhbGlnbiB0aGUgY3VlIHRvLlxuICAgIGlmIChjdWUuc25hcFRvTGluZXMpIHtcbiAgICAgICAgdmFyIHNpemU7XG4gICAgICAgIHN3aXRjaCAoY3VlLnZlcnRpY2FsKSB7XG4gICAgICAgICAgICBjYXNlIFwiXCI6XG4gICAgICAgICAgICAgICAgYXhpcyA9IFsgXCIreVwiLCBcIi15XCIgXTtcbiAgICAgICAgICAgICAgICBzaXplID0gXCJoZWlnaHRcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJybFwiOlxuICAgICAgICAgICAgICAgIGF4aXMgPSBbIFwiK3hcIiwgXCIteFwiIF07XG4gICAgICAgICAgICAgICAgc2l6ZSA9IFwid2lkdGhcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJsclwiOlxuICAgICAgICAgICAgICAgIGF4aXMgPSBbIFwiLXhcIiwgXCIreFwiIF07XG4gICAgICAgICAgICAgICAgc2l6ZSA9IFwid2lkdGhcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzdGVwID0gYm94UG9zaXRpb24ubGluZUhlaWdodCxcbiAgICAgICAgICAgIHBvc2l0aW9uID0gc3RlcCAqIE1hdGgucm91bmQobGluZVBvcyksXG4gICAgICAgICAgICBtYXhQb3NpdGlvbiA9IGNvbnRhaW5lckJveFtzaXplXSArIHN0ZXAsXG4gICAgICAgICAgICBpbml0aWFsQXhpcyA9IGF4aXNbMF07XG5cbiAgICAgICAgLy8gSWYgdGhlIHNwZWNpZmllZCBpbnRpYWwgcG9zaXRpb24gaXMgZ3JlYXRlciB0aGVuIHRoZSBtYXggcG9zaXRpb24gdGhlblxuICAgICAgICAvLyBjbGFtcCB0aGUgYm94IHRvIHRoZSBhbW91bnQgb2Ygc3RlcHMgaXQgd291bGQgdGFrZSBmb3IgdGhlIGJveCB0b1xuICAgICAgICAvLyByZWFjaCB0aGUgbWF4IHBvc2l0aW9uLlxuICAgICAgICBpZiAoTWF0aC5hYnMocG9zaXRpb24pID4gbWF4UG9zaXRpb24pIHtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gcG9zaXRpb24gPCAwID8gLTEgOiAxO1xuICAgICAgICAgICAgcG9zaXRpb24gKj0gTWF0aC5jZWlsKG1heFBvc2l0aW9uIC8gc3RlcCkgKiBzdGVwO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgY29tcHV0ZWQgbGluZSBwb3NpdGlvbiByZXR1cm5zIG5lZ2F0aXZlIHRoZW4gbGluZSBudW1iZXJzIGFyZVxuICAgICAgICAvLyByZWxhdGl2ZSB0byB0aGUgYm90dG9tIG9mIHRoZSB2aWRlbyBpbnN0ZWFkIG9mIHRoZSB0b3AuIFRoZXJlZm9yZSwgd2VcbiAgICAgICAgLy8gbmVlZCB0byBpbmNyZWFzZSBvdXIgaW5pdGlhbCBwb3NpdGlvbiBieSB0aGUgbGVuZ3RoIG9yIHdpZHRoIG9mIHRoZVxuICAgICAgICAvLyB2aWRlbywgZGVwZW5kaW5nIG9uIHRoZSB3cml0aW5nIGRpcmVjdGlvbiwgYW5kIHJldmVyc2Ugb3VyIGF4aXMgZGlyZWN0aW9ucy5cbiAgICAgICAgaWYgKGxpbmVQb3MgPCAwKSB7XG4gICAgICAgICAgICBwb3NpdGlvbiArPSBjdWUudmVydGljYWwgPT09IFwiXCIgPyBjb250YWluZXJCb3guaGVpZ2h0IDogY29udGFpbmVyQm94LndpZHRoO1xuICAgICAgICAgICAgYXhpcyA9IGF4aXMucmV2ZXJzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTW92ZSB0aGUgYm94IHRvIHRoZSBzcGVjaWZpZWQgcG9zaXRpb24uIFRoaXMgbWF5IG5vdCBiZSBpdHMgYmVzdFxuICAgICAgICAvLyBwb3NpdGlvbi5cbiAgICAgICAgYm94UG9zaXRpb24ubW92ZShpbml0aWFsQXhpcywgcG9zaXRpb24pO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gSWYgd2UgaGF2ZSBhIHBlcmNlbnRhZ2UgbGluZSB2YWx1ZSBmb3IgdGhlIGN1ZS5cbiAgICAgICAgdmFyIGNhbGN1bGF0ZWRQZXJjZW50YWdlID0gKGJveFBvc2l0aW9uLmxpbmVIZWlnaHQgLyBjb250YWluZXJCb3guaGVpZ2h0KSAqIDEwMDtcblxuICAgICAgICBzd2l0Y2ggKGN1ZS5saW5lQWxpZ24pIHtcbiAgICAgICAgICAgIGNhc2UgXCJtaWRkbGVcIjpcbiAgICAgICAgICAgICAgICBsaW5lUG9zIC09IChjYWxjdWxhdGVkUGVyY2VudGFnZSAvIDIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIGxpbmVQb3MgLT0gY2FsY3VsYXRlZFBlcmNlbnRhZ2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBcHBseSBpbml0aWFsIGxpbmUgcG9zaXRpb24gdG8gdGhlIGN1ZSBib3guXG4gICAgICAgIHN3aXRjaCAoY3VlLnZlcnRpY2FsKSB7XG4gICAgICAgICAgICBjYXNlIFwiXCI6XG4gICAgICAgICAgICAgICAgc3R5bGVCb3guYXBwbHlTdHlsZXMoe1xuICAgICAgICAgICAgICAgICAgICB0b3A6IHN0eWxlQm94LmZvcm1hdFN0eWxlKGxpbmVQb3MsIFwiJVwiKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInJsXCI6XG4gICAgICAgICAgICAgICAgc3R5bGVCb3guYXBwbHlTdHlsZXMoe1xuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBzdHlsZUJveC5mb3JtYXRTdHlsZShsaW5lUG9zLCBcIiVcIilcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJsclwiOlxuICAgICAgICAgICAgICAgIHN0eWxlQm94LmFwcGx5U3R5bGVzKHtcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IHN0eWxlQm94LmZvcm1hdFN0eWxlKGxpbmVQb3MsIFwiJVwiKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgYXhpcyA9IFsgXCIreVwiLCBcIi14XCIsIFwiK3hcIiwgXCIteVwiIF07XG5cbiAgICAgICAgLy8gR2V0IHRoZSBib3ggcG9zaXRpb24gYWdhaW4gYWZ0ZXIgd2UndmUgYXBwbGllZCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uaW5nXG4gICAgICAgIC8vIHRvIGl0LlxuICAgICAgICBib3hQb3NpdGlvbiA9IG5ldyBCb3hQb3NpdGlvbihzdHlsZUJveCk7XG4gICAgfVxuXG4gICAgdmFyIGJlc3RQb3NpdGlvbiA9IGZpbmRCZXN0UG9zaXRpb24oYm94UG9zaXRpb24sIGF4aXMpO1xuICAgIHN0eWxlQm94Lm1vdmUoYmVzdFBvc2l0aW9uLnRvQ1NTQ29tcGF0VmFsdWVzKGNvbnRhaW5lckJveCkpO1xufVxuXG4vKmZ1bmN0aW9uIFdlYlZUVCgpIHtcbiAvLyBOb3RoaW5nXG4gfSovXG5cbi8vIEhlbHBlciB0byBhbGxvdyBzdHJpbmdzIHRvIGJlIGRlY29kZWQgaW5zdGVhZCBvZiB0aGUgZGVmYXVsdCBiaW5hcnkgdXRmOCBkYXRhLlxuV2ViVlRULlN0cmluZ0RlY29kZXIgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBkZWNvZGU6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGlmICghZGF0YSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3IgLSBleHBlY3RlZCBzdHJpbmcgZGF0YS5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGVuY29kZVVSSUNvbXBvbmVudChkYXRhKSk7XG4gICAgICAgIH1cbiAgICB9O1xufTtcblxuV2ViVlRULmNvbnZlcnRDdWVUb0RPTVRyZWUgPSBmdW5jdGlvbih3aW5kb3csIGN1ZXRleHQpIHtcbiAgICBpZiAoIXdpbmRvdyB8fCAhY3VldGV4dCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHBhcnNlQ29udGVudCh3aW5kb3csIGN1ZXRleHQpO1xufTtcblxudmFyIEZPTlRfU0laRV9QRVJDRU5UID0gMC4wNTtcbnZhciBGT05UX1NUWUxFID0gXCJzYW5zLXNlcmlmXCI7XG52YXIgQ1VFX0JBQ0tHUk9VTkRfUEFERElORyA9IFwiMS41JVwiO1xuXG4vLyBSdW5zIHRoZSBwcm9jZXNzaW5nIG1vZGVsIG92ZXIgdGhlIGN1ZXMgYW5kIHJlZ2lvbnMgcGFzc2VkIHRvIGl0LlxuLy8gQHBhcmFtIG92ZXJsYXkgQSBibG9jayBsZXZlbCBlbGVtZW50ICh1c3VhbGx5IGEgZGl2KSB0aGF0IHRoZSBjb21wdXRlZCBjdWVzXG4vLyAgICAgICAgICAgICAgICBhbmQgcmVnaW9ucyB3aWxsIGJlIHBsYWNlZCBpbnRvLlxuV2ViVlRULnByb2Nlc3NDdWVzID0gZnVuY3Rpb24od2luZG93LCBjdWVzLCBvdmVybGF5KSB7XG4gICAgaWYgKCF3aW5kb3cgfHwgIWN1ZXMgfHwgIW92ZXJsYXkpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIGFsbCBwcmV2aW91cyBjaGlsZHJlbi5cbiAgICB3aGlsZSAob3ZlcmxheS5maXJzdENoaWxkKSB7XG4gICAgICAgIG92ZXJsYXkucmVtb3ZlQ2hpbGQob3ZlcmxheS5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICB2YXIgcGFkZGVkT3ZlcmxheSA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHBhZGRlZE92ZXJsYXkuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgcGFkZGVkT3ZlcmxheS5zdHlsZS5sZWZ0ID0gXCIwXCI7XG4gICAgcGFkZGVkT3ZlcmxheS5zdHlsZS5yaWdodCA9IFwiMFwiO1xuICAgIHBhZGRlZE92ZXJsYXkuc3R5bGUudG9wID0gXCIwXCI7XG4gICAgcGFkZGVkT3ZlcmxheS5zdHlsZS5ib3R0b20gPSBcIjBcIjtcbiAgICBwYWRkZWRPdmVybGF5LnN0eWxlLm1hcmdpbiA9IENVRV9CQUNLR1JPVU5EX1BBRERJTkc7XG4gICAgb3ZlcmxheS5hcHBlbmRDaGlsZChwYWRkZWRPdmVybGF5KTtcblxuICAgIC8vIERldGVybWluZSBpZiB3ZSBuZWVkIHRvIGNvbXB1dGUgdGhlIGRpc3BsYXkgc3RhdGVzIG9mIHRoZSBjdWVzLiBUaGlzIGNvdWxkXG4gICAgLy8gYmUgdGhlIGNhc2UgaWYgYSBjdWUncyBzdGF0ZSBoYXMgYmVlbiBjaGFuZ2VkIHNpbmNlIHRoZSBsYXN0IGNvbXB1dGF0aW9uIG9yXG4gICAgLy8gaWYgaXQgaGFzIG5vdCBiZWVuIGNvbXB1dGVkIHlldC5cbiAgICBmdW5jdGlvbiBzaG91bGRDb21wdXRlKGN1ZXMpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoY3Vlc1tpXS5oYXNCZWVuUmVzZXQgfHwgIWN1ZXNbaV0uZGlzcGxheVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIFdlIGRvbid0IG5lZWQgdG8gcmVjb21wdXRlIHRoZSBjdWVzJyBkaXNwbGF5IHN0YXRlcy4gSnVzdCByZXVzZSB0aGVtLlxuICAgIGlmICghc2hvdWxkQ29tcHV0ZShjdWVzKSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGN1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHBhZGRlZE92ZXJsYXkuYXBwZW5kQ2hpbGQoY3Vlc1tpXS5kaXNwbGF5U3RhdGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgYm94UG9zaXRpb25zID0gW10sXG4gICAgICAgIGNvbnRhaW5lckJveCA9IEJveFBvc2l0aW9uLmdldFNpbXBsZUJveFBvc2l0aW9uKHBhZGRlZE92ZXJsYXkpLFxuICAgICAgICBmb250U2l6ZSA9IE1hdGgucm91bmQoY29udGFpbmVyQm94LmhlaWdodCAqIEZPTlRfU0laRV9QRVJDRU5UICogMTAwKSAvIDEwMDtcbiAgICB2YXIgc3R5bGVPcHRpb25zID0ge1xuICAgICAgICBmb250OiAoZm9udFNpemUgKiBmb250U2NhbGUpICsgXCJweCBcIiArIEZPTlRfU1RZTEVcbiAgICB9O1xuXG4gICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc3R5bGVCb3gsIGN1ZTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGN1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGN1ZSA9IGN1ZXNbaV07XG5cbiAgICAgICAgICAgIC8vIENvbXB1dGUgdGhlIGludGlhbCBwb3NpdGlvbiBhbmQgc3R5bGVzIG9mIHRoZSBjdWUgZGl2LlxuICAgICAgICAgICAgc3R5bGVCb3ggPSBuZXcgQ3VlU3R5bGVCb3god2luZG93LCBjdWUsIHN0eWxlT3B0aW9ucyk7XG4gICAgICAgICAgICBwYWRkZWRPdmVybGF5LmFwcGVuZENoaWxkKHN0eWxlQm94LmRpdik7XG5cbiAgICAgICAgICAgIC8vIE1vdmUgdGhlIGN1ZSBkaXYgdG8gaXQncyBjb3JyZWN0IGxpbmUgcG9zaXRpb24uXG4gICAgICAgICAgICBtb3ZlQm94VG9MaW5lUG9zaXRpb24od2luZG93LCBzdHlsZUJveCwgY29udGFpbmVyQm94LCBib3hQb3NpdGlvbnMpO1xuXG4gICAgICAgICAgICAvLyBSZW1lbWJlciB0aGUgY29tcHV0ZWQgZGl2IHNvIHRoYXQgd2UgZG9uJ3QgaGF2ZSB0byByZWNvbXB1dGUgaXQgbGF0ZXJcbiAgICAgICAgICAgIC8vIGlmIHdlIGRvbid0IGhhdmUgdG9vLlxuICAgICAgICAgICAgY3VlLmRpc3BsYXlTdGF0ZSA9IHN0eWxlQm94LmRpdjtcblxuICAgICAgICAgICAgYm94UG9zaXRpb25zLnB1c2goQm94UG9zaXRpb24uZ2V0U2ltcGxlQm94UG9zaXRpb24oc3R5bGVCb3gpKTtcbiAgICAgICAgfVxuICAgIH0pKCk7XG59O1xuXG5XZWJWVFQuUGFyc2VyID0gZnVuY3Rpb24od2luZG93LCBkZWNvZGVyKSB7XG4gICAgdGhpcy53aW5kb3cgPSB3aW5kb3c7XG4gICAgdGhpcy5zdGF0ZSA9IFwiSU5JVElBTFwiO1xuICAgIHRoaXMuYnVmZmVyID0gXCJcIjtcbiAgICB0aGlzLmRlY29kZXIgPSBkZWNvZGVyIHx8IG5ldyBUZXh0RGVjb2RlcihcInV0ZjhcIik7XG4gICAgdGhpcy5yZWdpb25MaXN0ID0gW107XG59O1xuXG5XZWJWVFQuUGFyc2VyLnByb3RvdHlwZSA9IHtcbiAgICAvLyBJZiB0aGUgZXJyb3IgaXMgYSBQYXJzaW5nRXJyb3IgdGhlbiByZXBvcnQgaXQgdG8gdGhlIGNvbnN1bWVyIGlmXG4gICAgLy8gcG9zc2libGUuIElmIGl0J3Mgbm90IGEgUGFyc2luZ0Vycm9yIHRoZW4gdGhyb3cgaXQgbGlrZSBub3JtYWwuXG4gICAgcmVwb3J0T3JUaHJvd0Vycm9yOiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChlIGluc3RhbmNlb2YgUGFyc2luZ0Vycm9yKSB7XG4gICAgICAgICAgICB0aGlzLm9ucGFyc2luZ2Vycm9yICYmIHRoaXMub25wYXJzaW5nZXJyb3IoZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBwYXJzZTogZnVuY3Rpb24gKGRhdGEsIGZsdXNoaW5nKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAvLyBJZiB0aGVyZSBpcyBubyBkYXRhIHRoZW4gd2Ugd29uJ3QgZGVjb2RlIGl0LCBidXQgd2lsbCBqdXN0IHRyeSB0byBwYXJzZVxuICAgICAgICAvLyB3aGF0ZXZlciBpcyBpbiBidWZmZXIgYWxyZWFkeS4gVGhpcyBtYXkgb2NjdXIgaW4gY2lyY3Vtc3RhbmNlcywgZm9yXG4gICAgICAgIC8vIGV4YW1wbGUgd2hlbiBmbHVzaCgpIGlzIGNhbGxlZC5cbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIC8vIFRyeSB0byBkZWNvZGUgdGhlIGRhdGEgdGhhdCB3ZSByZWNlaXZlZC5cbiAgICAgICAgICAgIHNlbGYuYnVmZmVyICs9IHNlbGYuZGVjb2Rlci5kZWNvZGUoZGF0YSwge3N0cmVhbTogdHJ1ZX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY29sbGVjdE5leHRMaW5lKCkge1xuICAgICAgICAgICAgdmFyIGJ1ZmZlciA9IHNlbGYuYnVmZmVyO1xuICAgICAgICAgICAgdmFyIHBvcyA9IDA7XG4gICAgICAgICAgICB3aGlsZSAocG9zIDwgYnVmZmVyLmxlbmd0aCAmJiBidWZmZXJbcG9zXSAhPT0gJ1xccicgJiYgYnVmZmVyW3Bvc10gIT09ICdcXG4nKSB7XG4gICAgICAgICAgICAgICAgKytwb3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbGluZSA9IGJ1ZmZlci5zdWJzdHIoMCwgcG9zKTtcbiAgICAgICAgICAgIC8vIEFkdmFuY2UgdGhlIGJ1ZmZlciBlYXJseSBpbiBjYXNlIHdlIGZhaWwgYmVsb3cuXG4gICAgICAgICAgICBpZiAoYnVmZmVyW3Bvc10gPT09ICdcXHInKSB7XG4gICAgICAgICAgICAgICAgKytwb3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYnVmZmVyW3Bvc10gPT09ICdcXG4nKSB7XG4gICAgICAgICAgICAgICAgKytwb3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmJ1ZmZlciA9IGJ1ZmZlci5zdWJzdHIocG9zKTtcbiAgICAgICAgICAgIHJldHVybiBsaW5lO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gMy40IFdlYlZUVCByZWdpb24gYW5kIFdlYlZUVCByZWdpb24gc2V0dGluZ3Mgc3ludGF4XG4gICAgICAgIGZ1bmN0aW9uIHBhcnNlUmVnaW9uKGlucHV0KSB7XG4gICAgICAgICAgICB2YXIgc2V0dGluZ3MgPSBuZXcgU2V0dGluZ3MoKTtcblxuICAgICAgICAgICAgcGFyc2VPcHRpb25zKGlucHV0LCBmdW5jdGlvbiAoaywgdikge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoaykge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaWRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLnNldChrLCB2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwid2lkdGhcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLnBlcmNlbnQoaywgdik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImxpbmVzXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5pbnRlZ2VyKGssIHYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJyZWdpb25hbmNob3JcIjpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInZpZXdwb3J0YW5jaG9yXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgeHkgPSB2LnNwbGl0KCcsJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoeHkubGVuZ3RoICE9PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBoYXZlIHRvIG1ha2Ugc3VyZSBib3RoIHggYW5kIHkgcGFyc2UsIHNvIHVzZSBhIHRlbXBvcmFyeVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2V0dGluZ3Mgb2JqZWN0IGhlcmUuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYW5jaG9yID0gbmV3IFNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmNob3IucGVyY2VudChcInhcIiwgeHlbMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5jaG9yLnBlcmNlbnQoXCJ5XCIsIHh5WzFdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYW5jaG9yLmhhcyhcInhcIikgfHwgIWFuY2hvci5oYXMoXCJ5XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5zZXQoayArIFwiWFwiLCBhbmNob3IuZ2V0KFwieFwiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5zZXQoayArIFwiWVwiLCBhbmNob3IuZ2V0KFwieVwiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInNjcm9sbFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuYWx0KGssIHYsIFtcInVwXCJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIC89LywgL1xccy8pO1xuXG4gICAgICAgICAgICAvLyBDcmVhdGUgdGhlIHJlZ2lvbiwgdXNpbmcgZGVmYXVsdCB2YWx1ZXMgZm9yIGFueSB2YWx1ZXMgdGhhdCB3ZXJlIG5vdFxuICAgICAgICAgICAgLy8gc3BlY2lmaWVkLlxuICAgICAgICAgICAgaWYgKHNldHRpbmdzLmhhcyhcImlkXCIpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlZ2lvbiA9IG5ldyBzZWxmLndpbmRvdy5WVFRSZWdpb24oKTtcbiAgICAgICAgICAgICAgICByZWdpb24ud2lkdGggPSBzZXR0aW5ncy5nZXQoXCJ3aWR0aFwiLCAxMDApO1xuICAgICAgICAgICAgICAgIHJlZ2lvbi5saW5lcyA9IHNldHRpbmdzLmdldChcImxpbmVzXCIsIDMpO1xuICAgICAgICAgICAgICAgIHJlZ2lvbi5yZWdpb25BbmNob3JYID0gc2V0dGluZ3MuZ2V0KFwicmVnaW9uYW5jaG9yWFwiLCAwKTtcbiAgICAgICAgICAgICAgICByZWdpb24ucmVnaW9uQW5jaG9yWSA9IHNldHRpbmdzLmdldChcInJlZ2lvbmFuY2hvcllcIiwgMTAwKTtcbiAgICAgICAgICAgICAgICByZWdpb24udmlld3BvcnRBbmNob3JYID0gc2V0dGluZ3MuZ2V0KFwidmlld3BvcnRhbmNob3JYXCIsIDApO1xuICAgICAgICAgICAgICAgIHJlZ2lvbi52aWV3cG9ydEFuY2hvclkgPSBzZXR0aW5ncy5nZXQoXCJ2aWV3cG9ydGFuY2hvcllcIiwgMTAwKTtcbiAgICAgICAgICAgICAgICByZWdpb24uc2Nyb2xsID0gc2V0dGluZ3MuZ2V0KFwic2Nyb2xsXCIsIFwiXCIpO1xuICAgICAgICAgICAgICAgIC8vIFJlZ2lzdGVyIHRoZSByZWdpb24uXG4gICAgICAgICAgICAgICAgc2VsZi5vbnJlZ2lvbiAmJiBzZWxmLm9ucmVnaW9uKHJlZ2lvbik7XG4gICAgICAgICAgICAgICAgLy8gUmVtZW1iZXIgdGhlIFZUVFJlZ2lvbiBmb3IgbGF0ZXIgaW4gY2FzZSB3ZSBwYXJzZSBhbnkgVlRUQ3VlcyB0aGF0XG4gICAgICAgICAgICAgICAgLy8gcmVmZXJlbmNlIGl0LlxuICAgICAgICAgICAgICAgIHNlbGYucmVnaW9uTGlzdC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IHNldHRpbmdzLmdldChcImlkXCIpLFxuICAgICAgICAgICAgICAgICAgICByZWdpb246IHJlZ2lvblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gMy4yIFdlYlZUVCBtZXRhZGF0YSBoZWFkZXIgc3ludGF4XG4gICAgICAgIGZ1bmN0aW9uIHBhcnNlSGVhZGVyKGlucHV0KSB7XG4gICAgICAgICAgICBwYXJzZU9wdGlvbnMoaW5wdXQsIGZ1bmN0aW9uIChrLCB2KSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJSZWdpb25cIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIDMuMyBXZWJWVFQgcmVnaW9uIG1ldGFkYXRhIGhlYWRlciBzeW50YXhcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlUmVnaW9uKHYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgLzovKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIDUuMSBXZWJWVFQgZmlsZSBwYXJzaW5nLlxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIGxpbmU7XG4gICAgICAgICAgICBpZiAoc2VsZi5zdGF0ZSA9PT0gXCJJTklUSUFMXCIpIHtcbiAgICAgICAgICAgICAgICAvLyBXZSBjYW4ndCBzdGFydCBwYXJzaW5nIHVudGlsIHdlIGhhdmUgdGhlIGZpcnN0IGxpbmUuXG4gICAgICAgICAgICAgICAgaWYgKCEvXFxyXFxufFxcbi8udGVzdChzZWxmLmJ1ZmZlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGluZSA9IGNvbGxlY3ROZXh0TGluZSgpO1xuXG4gICAgICAgICAgICAgICAgdmFyIG0gPSBsaW5lLm1hdGNoKC9eV0VCVlRUKFsgXFx0XS4qKT8kLyk7XG4gICAgICAgICAgICAgICAgaWYgKCFtIHx8ICFtWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBQYXJzaW5nRXJyb3IoUGFyc2luZ0Vycm9yLkVycm9ycy5CYWRTaWduYXR1cmUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHNlbGYuc3RhdGUgPSBcIkhFQURFUlwiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgYWxyZWFkeUNvbGxlY3RlZExpbmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHdoaWxlIChzZWxmLmJ1ZmZlcikge1xuICAgICAgICAgICAgICAgIC8vIFdlIGNhbid0IHBhcnNlIGEgbGluZSB1bnRpbCB3ZSBoYXZlIHRoZSBmdWxsIGxpbmUuXG4gICAgICAgICAgICAgICAgaWYgKCEvXFxyXFxufFxcbi8udGVzdChzZWxmLmJ1ZmZlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFhbHJlYWR5Q29sbGVjdGVkTGluZSkge1xuICAgICAgICAgICAgICAgICAgICBsaW5lID0gY29sbGVjdE5leHRMaW5lKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYWxyZWFkeUNvbGxlY3RlZExpbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHNlbGYuc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIkhFQURFUlwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gMTMtMTggLSBBbGxvdyBhIGhlYWRlciAobWV0YWRhdGEpIHVuZGVyIHRoZSBXRUJWVFQgbGluZS5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgvOi8udGVzdChsaW5lKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlSGVhZGVyKGxpbmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICghbGluZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFuIGVtcHR5IGxpbmUgdGVybWluYXRlcyB0aGUgaGVhZGVyIGFuZCBzdGFydHMgdGhlIGJvZHkgKGN1ZXMpLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc3RhdGUgPSBcIklEXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIk5PVEVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElnbm9yZSBOT1RFIGJsb2Nrcy5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbGluZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc3RhdGUgPSBcIklEXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIklEXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayBmb3IgdGhlIHN0YXJ0IG9mIE5PVEUgYmxvY2tzLlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKC9eTk9URSgkfFsgXFx0XSkvLnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnN0YXRlID0gXCJOT1RFXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAxOS0yOSAtIEFsbG93IGFueSBudW1iZXIgb2YgbGluZSB0ZXJtaW5hdG9ycywgdGhlbiBpbml0aWFsaXplIG5ldyBjdWUgdmFsdWVzLlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmN1ZSA9IG5ldyBzZWxmLndpbmRvdy5WVFRDdWUoMCwgMCwgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnN0YXRlID0gXCJDVUVcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIDMwLTM5IC0gQ2hlY2sgaWYgc2VsZiBsaW5lIGNvbnRhaW5zIGFuIG9wdGlvbmFsIGlkZW50aWZpZXIgb3IgdGltaW5nIGRhdGEuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGluZS5pbmRleE9mKFwiLS0+XCIpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY3VlLmlkID0gbGluZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gUHJvY2VzcyBsaW5lIGFzIHN0YXJ0IG9mIGEgY3VlLlxuICAgICAgICAgICAgICAgICAgICAvKmZhbGxzIHRocm91Z2gqL1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiQ1VFXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyA0MCAtIENvbGxlY3QgY3VlIHRpbWluZ3MgYW5kIHNldHRpbmdzLlxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZUN1ZShsaW5lLCBzZWxmLmN1ZSwgc2VsZi5yZWdpb25MaXN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJlcG9ydE9yVGhyb3dFcnJvcihlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJbiBjYXNlIG9mIGFuIGVycm9yIGlnbm9yZSByZXN0IG9mIHRoZSBjdWUuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jdWUgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc3RhdGUgPSBcIkJBRENVRVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zdGF0ZSA9IFwiQ1VFVEVYVFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJDVUVURVhUXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaGFzU3Vic3RyaW5nID0gbGluZS5pbmRleE9mKFwiLS0+XCIpICE9PSAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIDM0IC0gSWYgd2UgaGF2ZSBhbiBlbXB0eSBsaW5lIHRoZW4gcmVwb3J0IHRoZSBjdWUuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAzNSAtIElmIHdlIGhhdmUgdGhlIHNwZWNpYWwgc3Vic3RyaW5nICctLT4nIHRoZW4gcmVwb3J0IHRoZSBjdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBidXQgZG8gbm90IGNvbGxlY3QgdGhlIGxpbmUgYXMgd2UgbmVlZCB0byBwcm9jZXNzIHRoZSBjdXJyZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvbmUgYXMgYSBuZXcgY3VlLlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFsaW5lIHx8IGhhc1N1YnN0cmluZyAmJiAoYWxyZWFkeUNvbGxlY3RlZExpbmUgPSB0cnVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIGFyZSBkb25lIHBhcnNpbmcgc2VsZiBjdWUuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5vbmN1ZSAmJiBzZWxmLm9uY3VlKHNlbGYuY3VlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmN1ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zdGF0ZSA9IFwiSURcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLmN1ZS50ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jdWUudGV4dCArPSBcIlxcblwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jdWUudGV4dCArPSBsaW5lO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJCQURDVUVcIjogLy8gQkFEQ1VFXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyA1NC02MiAtIENvbGxlY3QgYW5kIGRpc2NhcmQgdGhlIHJlbWFpbmluZyBjdWUuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnN0YXRlID0gXCJJRFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKjIwMTgtMDUtMjUgSFNMRUUg7Jik66as7KeA64KgIHZ0dC5qc+yXkOuKlCDsl4bripQg67aA67aELiBqd3BsYXllcuydmCB2dHRwYXJzZXIuanMg67aA67aE7J2EIOywuOqzoCDtlZjsmIDri6QuIOyVhOuniCDslpjrhKTrj4Qg7J6E7J2Y66GcIOuEo+ydgCDqsoPsnLzroZwg7LaU7KCVLiovXG4gICAgICAgICAgICBpZiAoIWZsdXNoaW5nKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5mbHVzaCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBzZWxmLnJlcG9ydE9yVGhyb3dFcnJvcihlKTtcblxuICAgICAgICAgICAgLy8gSWYgd2UgYXJlIGN1cnJlbnRseSBwYXJzaW5nIGEgY3VlLCByZXBvcnQgd2hhdCB3ZSBoYXZlLlxuICAgICAgICAgICAgaWYgKHNlbGYuc3RhdGUgPT09IFwiQ1VFVEVYVFwiICYmIHNlbGYuY3VlICYmIHNlbGYub25jdWUpIHtcbiAgICAgICAgICAgICAgICBzZWxmLm9uY3VlKHNlbGYuY3VlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuY3VlID0gbnVsbDtcbiAgICAgICAgICAgIC8vIEVudGVyIEJBRFdFQlZUVCBzdGF0ZSBpZiBoZWFkZXIgd2FzIG5vdCBwYXJzZWQgY29ycmVjdGx5IG90aGVyd2lzZVxuICAgICAgICAgICAgLy8gYW5vdGhlciBleGNlcHRpb24gb2NjdXJyZWQgc28gZW50ZXIgQkFEQ1VFIHN0YXRlLlxuICAgICAgICAgICAgc2VsZi5zdGF0ZSA9IHNlbGYuc3RhdGUgPT09IFwiSU5JVElBTFwiID8gXCJCQURXRUJWVFRcIiA6IFwiQkFEQ1VFXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICBmbHVzaDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBGaW5pc2ggZGVjb2RpbmcgdGhlIHN0cmVhbS5cbiAgICAgICAgICAgIHNlbGYuYnVmZmVyICs9IHNlbGYuZGVjb2Rlci5kZWNvZGUoKTtcbiAgICAgICAgICAgIC8vIFN5bnRoZXNpemUgdGhlIGVuZCBvZiB0aGUgY3VycmVudCBjdWUgb3IgcmVnaW9uLlxuICAgICAgICAgICAgaWYgKHNlbGYuY3VlIHx8IHNlbGYuc3RhdGUgPT09IFwiSEVBREVSXCIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmJ1ZmZlciArPSBcIlxcblxcblwiO1xuICAgICAgICAgICAgICAgIHNlbGYucGFyc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIElmIHdlJ3ZlIGZsdXNoZWQsIHBhcnNlZCwgYW5kIHdlJ3JlIHN0aWxsIG9uIHRoZSBJTklUSUFMIHN0YXRlIHRoZW5cbiAgICAgICAgICAgIC8vIHRoYXQgbWVhbnMgd2UgZG9uJ3QgaGF2ZSBlbm91Z2ggb2YgdGhlIHN0cmVhbSB0byBwYXJzZSB0aGUgZmlyc3RcbiAgICAgICAgICAgIC8vIGxpbmUuXG4gICAgICAgICAgICBpZiAoc2VsZi5zdGF0ZSA9PT0gXCJJTklUSUFMXCIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUGFyc2luZ0Vycm9yKFBhcnNpbmdFcnJvci5FcnJvcnMuQmFkU2lnbmF0dXJlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICBzZWxmLnJlcG9ydE9yVGhyb3dFcnJvcihlKTtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLm9uZmx1c2ggJiYgc2VsZi5vbmZsdXNoKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn07XG5cblxuXG5cbmV4cG9ydCBkZWZhdWx0IFdlYlZUVDsiLCIvKipcbiAqIENyZWF0ZWQgYnkgaG9obyBvbiAyMDE4LiA1LiAyNS4uXG4gKi9cbi8qICBWVFQuSlPrpbwg7ZiEIO2UhOuhnOygne2KuOyXkOyEnCDsnbjsi53tlaAg7IiYIOyeiOqyjCDrsJjsnLzroZwg6rCA66W464ukLiAgKi9cbi8qKlxuICogQ29weXJpZ2h0IDIwMTMgdnR0LmpzIENvbnRyaWJ1dG9yc1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxubGV0IFZUVFJlZ2lvbiA9IFwiXCI7XG5cbnZhciBzY3JvbGxTZXR0aW5nID0ge1xuICAgIFwiXCI6IHRydWUsXG4gICAgXCJ1cFwiOiB0cnVlXG59O1xuXG5mdW5jdGlvbiBmaW5kU2Nyb2xsU2V0dGluZyh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgc2Nyb2xsID0gc2Nyb2xsU2V0dGluZ1t2YWx1ZS50b0xvd2VyQ2FzZSgpXTtcbiAgICByZXR1cm4gc2Nyb2xsID8gdmFsdWUudG9Mb3dlckNhc2UoKSA6IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBpc1ZhbGlkUGVyY2VudFZhbHVlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiAmJiAodmFsdWUgPj0gMCAmJiB2YWx1ZSA8PSAxMDApO1xufVxuXG4vLyBWVFRSZWdpb24gc2hpbSBodHRwOi8vZGV2LnczLm9yZy9odG1sNS93ZWJ2dHQvI3Z0dHJlZ2lvbi1pbnRlcmZhY2VcblZUVFJlZ2lvbiA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBfd2lkdGggPSAxMDA7XG4gICAgdmFyIF9saW5lcyA9IDM7XG4gICAgdmFyIF9yZWdpb25BbmNob3JYID0gMDtcbiAgICB2YXIgX3JlZ2lvbkFuY2hvclkgPSAxMDA7XG4gICAgdmFyIF92aWV3cG9ydEFuY2hvclggPSAwO1xuICAgIHZhciBfdmlld3BvcnRBbmNob3JZID0gMTAwO1xuICAgIHZhciBfc2Nyb2xsID0gXCJcIjtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcbiAgICAgICAgXCJ3aWR0aFwiOiB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3dpZHRoO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzVmFsaWRQZXJjZW50VmFsdWUodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIldpZHRoIG11c3QgYmUgYmV0d2VlbiAwIGFuZCAxMDAuXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfd2lkdGggPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJsaW5lc1wiOiB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2xpbmVzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJMaW5lcyBtdXN0IGJlIHNldCB0byBhIG51bWJlci5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF9saW5lcyA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInJlZ2lvbkFuY2hvcllcIjoge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9yZWdpb25BbmNob3JZO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzVmFsaWRQZXJjZW50VmFsdWUodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlJlZ2lvbkFuY2hvclggbXVzdCBiZSBiZXR3ZWVuIDAgYW5kIDEwMC5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF9yZWdpb25BbmNob3JZID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwicmVnaW9uQW5jaG9yWFwiOiB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3JlZ2lvbkFuY2hvclg7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmKCFpc1ZhbGlkUGVyY2VudFZhbHVlKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJSZWdpb25BbmNob3JZIG11c3QgYmUgYmV0d2VlbiAwIGFuZCAxMDAuXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfcmVnaW9uQW5jaG9yWCA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInZpZXdwb3J0QW5jaG9yWVwiOiB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3ZpZXdwb3J0QW5jaG9yWTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpc1ZhbGlkUGVyY2VudFZhbHVlKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJWaWV3cG9ydEFuY2hvclkgbXVzdCBiZSBiZXR3ZWVuIDAgYW5kIDEwMC5cIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF92aWV3cG9ydEFuY2hvclkgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJ2aWV3cG9ydEFuY2hvclhcIjoge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF92aWV3cG9ydEFuY2hvclg7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICghaXNWYWxpZFBlcmNlbnRWYWx1ZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVmlld3BvcnRBbmNob3JYIG11c3QgYmUgYmV0d2VlbiAwIGFuZCAxMDAuXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfdmlld3BvcnRBbmNob3JYID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwic2Nyb2xsXCI6IHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfc2Nyb2xsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2V0dGluZyA9IGZpbmRTY3JvbGxTZXR0aW5nKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAvLyBIYXZlIHRvIGNoZWNrIGZvciBmYWxzZSBhcyBhbiBlbXB0eSBzdHJpbmcgaXMgYSBsZWdhbCB2YWx1ZS5cbiAgICAgICAgICAgICAgICBpZiAoc2V0dGluZyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKFwiQW4gaW52YWxpZCBvciBpbGxlZ2FsIHN0cmluZyB3YXMgc3BlY2lmaWVkLlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3Njcm9sbCA9IHNldHRpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgVlRUUmVnaW9uOyJdLCJzb3VyY2VSb290IjoiIn0=